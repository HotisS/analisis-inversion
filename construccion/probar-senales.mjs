// Pruebas de las señales (27-oct-2026): reglas que no se pueden romper sin que salte un fallo. Se calculan sobre todos los
// informes con herramientas/robustez.mjs y no tocan nada.
//
//   node construccion/probar-senales.mjs        (también: npm run comprobar)
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const RAIZ = fileURLToPath(new URL('..', import.meta.url));
const rob = JSON.parse(execFileSync(process.execPath, ['herramientas/robustez.mjs', '--todas', '--json'], { cwd: RAIZ, encoding: 'utf8', maxBuffer: 1 << 28 })).filter((x) => !x.error);
let fallos = 0;
const falla = (txt) => { fallos++; console.log(`FALLO ${txt}`); };
const ORDEN = ['A', 'B1', 'B2', 'C'];

for (const x of rob) {
  const n = `${x.nombre} (${x.carpeta})`;
  // 1. La acción robusta responde «¿se compra?»: nunca puede leerse como mantener o vender (caso Aon, 27-oct).
  if (/mantener|vender/i.test(x.accion_robusta || '')) falla(`${n}: accion_robusta «${x.accion_robusta}» habla de mantener o vender.`);
  if (x.compra_robusta !== (x.accion_robusta === 'Comprar')) falla(`${n}: compra_robusta y accion_robusta no dicen lo mismo.`);
  // 2. La señal de cartera sale de la regla vigente: si la vigente no pasa mantener, nunca «Mantener».
  if (x.senal_cartera !== null && !/^(Mantener|Vender \()/.test(x.senal_cartera)) falla(`${n}: senal_cartera rara «${x.senal_cartera}».`);
  if (x.senal_cartera === 'Mantener' && x.accion_vigente === 'No pasa mantener') falla(`${n}: Mantener con la vigente sin pasar mantener.`);
  if (x.accion_vigente !== 'No pasa mantener' && /no pasa el filtro/.test(x.senal_cartera || '')) falla(`${n}: Vender por filtro con la vigente pasando.`);
  // 3. El nivel depende del precio: es el mejor nivel cuyo límite está en el precio o por encima.
  if (x.nivel) {
    const lim = x.limites_nivel_cot?.[x.nivel];
    if (!(lim >= x.precio_cot - 0.011)) falla(`${n}: nivel ${x.nivel} con precio ${x.precio_cot} por encima de su límite ${lim}.`);
    for (const mejor of ORDEN.slice(0, ORDEN.indexOf(x.nivel))) if (x.limites_nivel_cot?.[mejor] >= x.precio_cot + 0.011) falla(`${n}: da nivel ${x.nivel} pero a ${x.precio_cot} ya cumple ${mejor} (límite ${x.limites_nivel_cot[mejor]}).`);
    // 4. Nivel A o B1 exige calidad completa (o excepción); B2 y C, al menos ROIC − WACC ≥ 4,5. Nunca por debajo de 4,5.
    if (x.calidad_roic_wacc !== null && x.calidad_roic_wacc < 4.5 && !['A', 'B1'].includes(x.nivel)) falla(`${n}: nivel ${x.nivel} con ROIC − WACC ${x.calidad_roic_wacc}.`);
  }
  if (x.compra_robusta && x.calidad_roic_wacc !== null && x.calidad_roic_wacc < 5 && x.nivel !== 'A') falla(`${n}: compra robusta con ROIC − WACC ${x.calidad_roic_wacc}.`);
  // 5. Excluidas: nunca compra.
  if (x.marcas.some((m) => m.codigo === 'X1') && (x.compra_robusta || x.nivel)) falla(`${n}: excluida con compra o nivel.`);
}
// 6. Una sola fila vigente por empresa (informes viejos fuera: CR Sanjiu, Moncler).
const vistos = new Map();
for (const x of rob.filter((y) => !y.obsoleto)) { if (vistos.has(x.clave)) falla(`${x.clave}: dos informes vigentes (${vistos.get(x.clave)} y ${x.carpeta}).`); vistos.set(x.clave, x.carpeta); }

console.log(`${rob.length} informes probados; ${fallos ? `${fallos} fallos` : 'sin fallos'}.`);
process.exitCode = fallos ? 1 : 0;
