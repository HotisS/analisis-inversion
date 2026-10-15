// Radar de estudio (15-oct-2026, hilo Mejoras): valores que aún no son candidatas y que conviene estudiar si bajan de un
// precio o cuando publican resultados. No son señales de compra (regla dura: nada de órdenes). Lista en
// escaner/radar.json; lo que ya se avisó, en escaner/radar-estado.json (para no repetir). Lo usan las pasadas de 9:25 y
// 15:45: si sale algún aviso, va al coordinador del proyecto, que decide si pide el análisis.
//
//   NODE_USE_ENV_PROXY=1 node herramientas/radar.mjs           avisos nuevos (o «radar: nada nuevo»)
//   … --json                                                   lo mismo en JSON
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { ultimoCierre } from './precios.mjs';

const RAIZ = fileURLToPath(new URL('..', import.meta.url));
const LISTA = `${RAIZ}escaner/radar.json`, ESTADO = `${RAIZ}escaner/radar-estado.json`;
const leer = (p, d) => (existsSync(p) ? JSON.parse(readFileSync(p, 'utf8')) : d);
const hoy = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Madrid' }).format(new Date());
const fmt = (n) => n.toLocaleString('es-ES', { maximumFractionDigits: 2 });

const { valores } = leer(LISTA, { valores: [] });
const estado = leer(ESTADO, { nota: 'Avisos del radar ya dados (herramientas/radar.mjs). Lo escribe la herramienta.', avisados: {} });
const avisos = [];
for (const v of valores) {
  const e = (estado.avisados[v.clave] ??= {});
  if (v.tipo === 'precio' && v.umbral) {
    const p = await ultimoCierre(v.simbolo);
    const precio = p.en_curso?.precio ?? p.precio;
    if (p.error) console.error(`radar: sin precio de ${v.nombre} (${p.error})`);
    // Un aviso de precio por cada vez que cruza el umbral hacia abajo; se rearma cuando vuelve a estar por encima.
    else if (precio <= v.umbral && !e.precio) { avisos.push({ clave: v.clave, tipo: 'precio', texto: `${v.nombre} cotiza a ${fmt(precio)} ${v.divisa}, por debajo de ${fmt(v.umbral)}: toca estudiarla (no es señal de compra).` }); e.precio = hoy; }
    else if (precio > v.umbral && e.precio) delete e.precio;
  }
  if (v.resultados && v.resultados <= hoy && e.resultados !== v.resultados) {
    avisos.push({ clave: v.clave, tipo: 'resultados', texto: v.tipo === 'crecimiento'
      ? `${v.nombre} publicó resultados (${v.resultados}): mirar si vuelve el crecimiento.`
      : `${v.nombre} publicó resultados (${v.resultados}): toca estudiarla tras los resultados (no es señal de compra).` });
    e.resultados = v.resultados;
  }
}
writeFileSync(ESTADO, JSON.stringify(estado, null, 1) + '\n');
if (process.argv.includes('--json')) console.log(JSON.stringify({ fecha: hoy, avisos }, null, 1));
else console.log(avisos.length ? avisos.map((a) => `- ${a.texto}`).join('\n') : 'radar: nada nuevo');
