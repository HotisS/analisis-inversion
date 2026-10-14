// Pruebas de robustez para los informes growth (versión corta de herramientas/robustez.mjs; 14-oct-2026).
// Recalcula cada informe con el MISMO motor (`motor/growth.mjs`) bajo variantes razonables y marca lo que puede chirriar.
// Procedimiento y significado: `verticales/empresa/robustez.md` (sección growth). Paso obligatorio de `/analiza-growth`.
//
//   node herramientas/robustez-growth.mjs [<carpeta> …]          (sin carpetas: todas las de informes-growth/)
//   NODE_USE_ENV_PROXY=1 node herramientas/robustez-growth.mjs --precios   con el último precio de Yahoo (objetivo fijo)
//   … --escribir   guarda informes-growth/robustez.json
//   … --json       imprime el JSON en vez del texto (escáner diario)
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { calcular, VERSIONES, VIGENTE } from '../motor/growth.mjs';
import { ultimoCierre, simboloDe } from './precios.mjs';

const args = process.argv.slice(2);
const bandera = (k) => { const i = args.indexOf(k); if (i >= 0) args.splice(i, 1); return i >= 0; };
const conPrecios = bandera('--precios'), escribir = bandera('--escribir'), comoJson = bandera('--json');
const f = (x, d = 1) => (x === null || x === undefined || !Number.isFinite(x) ? 'n.d.' : x.toLocaleString('es-ES', { minimumFractionDigits: d, maximumFractionDigits: d }));
const r = (x, d = 1) => (x === null || x === undefined || !Number.isFinite(x) ? null : Math.round(x * 10 ** d) / 10 ** d);
const RAIZ = 'informes-growth';
const carpetas = args.length ? args.map((a) => a.replace(/\/$/, '').replace(/^informes-growth\//, ''))
  : readdirSync(RAIZ, { withFileTypes: true }).filter((e) => e.isDirectory() && existsSync(`${RAIZ}/${e.name}/datos.json`)).map((e) => e.name).sort();
const V = VERSIONES[VIGENTE];
// Símbolo de Yahoo: `simbolo_yahoo` del datos.json si lo trae; si no, ticker + sufijo de la bolsa con la tabla común de
// precios.mjs (SIX → .SW, Copenhague → .CO, París → .PA…). Hasta el 14-oct por la noche faltaban SIX, Copenhague y París
// y Medacta/Ypsomed/ALK-Abelló/Exosens se buscaban en EE. UU. (fallo visto en la tanda growth 17).

// Variante «ventas del analista»: cada caso con las ventas que estima el propio informe en vez de la proyección mecánica
// (precio del caso × ventas del analista ÷ ventas mecánicas; vale para múltiplos de ventas y de beneficio), con los mismos listones.
const comparable = (a, m) => a > 0 && m > 0 && m / a <= 1.6 && m / a >= 0.6;
function conVentasAnalista(d, vig) {
  const a = d.valoracion.ventas_objetivo_m, div = d.valoracion.dividendo_pct ?? 0, p = vig.probabilidades;
  const precio = (k) => vig.casos[k].precio * (a[k] ?? a.base) / vig.casos[k].ventas_m;
  const obj = (precio('bajista') * p.bajista + precio('base') * p.base + precio('alcista') * p.alcista) / 100;
  const pond = (obj / d.precio - 1) * 100 + div, base = (precio('base') / d.precio - 1) * 100 + div, baj = (precio('bajista') / d.precio - 1) * 100 + div;
  const k = V.compra;
  const senal = pond <= V.venta.ponderada ? 'Vender' : vig.senal === 'Comprar' && pond >= k.ponderada && base >= k.base && baj >= k.bajista ? 'Comprar' : 'Mantener';
  return { rent_ponderada_pct: r(pond), rent_base_pct: r(base), senal, objetivo_12m: r(obj) };
}
const res = [];
for (const c of carpetas) {
  const d = JSON.parse(readFileSync(`${RAIZ}/${c}/datos.json`, 'utf8'));
  const v = d.valoracion || {}, cr = d.crecimiento || {};
  const marcas = [];
  const marca = (codigo, tratamiento, texto) => marcas.push({ codigo, tratamiento, texto });
  const vig = calcular(d, V);
  const conProb = (p) => calcular({ ...d, valoracion: { ...v, probabilidades: p } }, V);
  const variantes = [
    ['vigente ' + VIGENTE, vig],
    ['v7', calcular(d, VERSIONES.v7)],
    // Solo si las ventas del analista están en la misma unidad (entre 0,6 y 1,6 veces la proyección mecánica).
    ...(comparable(v.ventas_objetivo_m?.base, vig.casos.base.ventas_m) ? [['ventas del analista', conVentasAnalista(d, vig)]] : []),
    ['pesos 25/50/25', conProb({ bajista: 25, base: 50, alcista: 25 })],
    ['pesos 35/50/15', conProb({ bajista: 35, base: 50, alcista: 15 })],
  ].map(([n, x]) => ({ variante: n, ponderada: x.rent_ponderada_pct, base: x.rent_base_pct, senal: x.senal, objetivo: x.objetivo_12m }));

  // G1 precio de hoy frente al del informe; la rentabilidad se recalcula con el OBJETIVO FIJO (regla del 14-oct, caso Nu).
  let precioHoy = null, fechaHoy = null, simbolo = null, divisaHoy = null;
  if (conPrecios) {
    simbolo = d.simbolo_yahoo || simboloDe({ ticker: d.ticker, mercado: d.bolsa });
    const q = await ultimoCierre(simbolo);
    divisaHoy = q.divisa || null;
    if (!q.error) { precioHoy = q.en_curso?.precio ?? q.precio; fechaHoy = q.en_curso?.fecha ?? q.fecha; }
    if (q.divisa && d.moneda && q.divisa.toUpperCase() !== String(d.moneda).toUpperCase()) marca('G1', 'CORREGIR', `Yahoo cotiza en ${q.divisa} y el informe en ${d.moneda}.`);
  }
  if (precioHoy) {
    const k = precioHoy / d.precio;
    if (k < 0.8 || k > 1.25) marca('G1', 'CORREGIR', `Precio del informe ${f(d.precio, 2)} frente a ${f(precioHoy, 2)} hoy (${f((k - 1) * 100, 0)} %): comprobar el dato o revisar la tesis.`);
    const div = v.dividendo_pct ?? 0;
    const pond = (vig.objetivo_12m / precioHoy - 1) * 100 + div, base = (vig.casos.base.precio / precioHoy - 1) * 100 + div;
    variantes.push({ variante: `precio de hoy (${f(precioHoy, 2)}, objetivo fijo)`, ponderada: r(pond), base: r(base), senal: pond >= V.compra.ponderada && base >= V.compra.base && precioHoy <= vig.precio_max_compra ? vig.senal : vig.senal === 'Comprar' ? 'Mantener' : vig.senal });
  }
  // G2 objetivo atado al precio: el múltiplo base es el de hoy (objetivo «actual»), así que recalcular a otro precio mueve el objetivo.
  const otro = calcular({ ...d, precio: d.precio * 1.1, valoracion: { ...v, multiplo_actual: v.multiplo_actual ? v.multiplo_actual * 1.1 : v.multiplo_actual } }, V);
  const elast = (otro.objetivo_12m / vig.objetivo_12m - 1) / 0.1;
  if (elast > 0.5) marca('G2', 'AVISO', `El objetivo se mueve con el precio (elasticidad ${f(elast, 2)}): al revisar el precio se deja FIJO el objetivo del informe y el límite es el «precio máximo de compra» del informe (${f(vig.precio_max_compra, 2)}), nunca uno recalculado.`);
  // G3 la proyección mecánica supera a la del analista.
  const mec = vig.casos.base.ventas_m, ana = v.ventas_objetivo_m?.base;
  if (ana && !comparable(ana, mec)) marca('G3', 'AVISO', `Las ventas objetivo del analista (${f(ana, 0)} M) no están en la misma unidad que la proyección (${f(mec, 0)} M): ¿beneficio en vez de ventas? Corregir el campo; no cambia la señal del motor (usa la mecánica).`);
  else if (ana && mec > 1.1 * ana) marca('G3', 'VARIANTE', `La proyección mecánica de ventas (${f(mec, 0)} M) va un ${f((mec / ana - 1) * 100, 0)} % por encima de la del propio analista (${f(ana, 0)} M): decide la variante «ventas del analista».`);
  else if (ana && mec < 0.85 * ana) marca('G3', 'AVISO', `La proyección mecánica (${f(mec, 0)} M) queda un ${f((1 - mec / ana) * 100, 0)} % bajo la del analista (${f(ana, 0)} M): la señal es prudente.`);
  const cons = v.consenso_ventas_obj_m?.base ?? (typeof v.consenso_ventas_obj_m === 'number' ? v.consenso_ventas_obj_m : null);
  if (cons && mec > 1.1 * cons) marca('G3', 'VARIANTE', `Nuestras ventas base (${f(mec, 0)} M) superan al consenso (${f(cons, 0)} M) en un ${f((mec / cons - 1) * 100, 0)} %: la señal debe aguantar con las del consenso.`);
  // G4 sin guía: la mejora v9 no se aplica.
  if (cr.guia_12m_pct == null) marca('G4', 'AVISO', 'Sin guía de la empresa: v9 = v7 (no se recorta el crecimiento de partida).');
  // G5 euforia y subida.
  if ((d.tendencia?.subida_12m_pct ?? 0) >= 100) marca('G5', 'CONFIANZA', `Sube un ${f(d.tendencia.subida_12m_pct, 0)} % en 12 meses: parte del crecimiento ya está en el precio. Comprar en dos tramos.`);
  // G6 bajista profundo.
  if (vig.casos.bajista.rent_pct < -40) marca('G6', 'AVISO', `Bajista del ${f(vig.casos.bajista.rent_pct, 0)} %: posición pequeña (peso de la regla) y en tramos.`);
  // G7 margen bruto del 100 % (banco, aseguradora): el filtro EV/beneficio bruto no mide nada.
  if ((d.economia?.margen_bruto_pct ?? 0) >= 99) marca('G7', 'AVISO', 'Margen bruto del 100 % (financiera): el filtro de EV/beneficio bruto no aplica; el control de valoración es el P/beneficio.');
  // G8 lo que descuenta el precio frente a lo que proyectamos.
  if (v.dcf_inverso_crecimiento_10a_pct != null && v.crecimiento_obj_pct != null && v.dcf_inverso_crecimiento_10a_pct > v.crecimiento_obj_pct) marca('G8', 'CONFIANZA', `El precio ya descuenta crecer un ${f(v.dcf_inverso_crecimiento_10a_pct, 0)} % anual 10 años, más que nuestro crecimiento al final del periodo (${f(v.crecimiento_obj_pct, 0)} %).`);
  // G9 convicción baja.
  if (vig.senal === 'Comprar' && vig.conviccion === 'baja') marca('G9', 'AVISO', 'Comprar con convicción baja: peso 3,5 % y en tramos.');

  const defendibles = variantes.filter((x) => !/^precio de hoy/.test(x.variante) && !/35\/50\/15/.test(x.variante));
  const senales = [...new Set(defendibles.map((x) => x.senal))];
  const bloq = marcas.some((m) => m.tratamiento === 'CORREGIR');
  const peor = ['Vender', 'Mantener', 'Comprar'].find((s) => senales.includes(s));
  let robusta = bloq ? 'Sin señal (corregir dato)' : peor;
  if (!bloq && robusta === 'Comprar' && marcas.some((m) => m.tratamiento === 'CONFIANZA' && m.codigo !== 'G5')) robusta = 'Comprar con cautela (tramos)';
  res.push({ carpeta: c, empresa: d.empresa, ticker: d.ticker, precio_informe: d.precio, precio_hoy: precioHoy, fecha_hoy: fechaHoy,
    senal: vig.senal, ponderada: vig.rent_ponderada_pct, base: vig.rent_base_pct, conviccion: vig.conviccion, precio_max_compra: vig.precio_max_compra,
    veredicto: bloq ? 'BLOQUEADA' : senales.length === 1 ? 'SÓLIDA' : 'FRÁGIL', senal_robusta: robusta,
    // Para el escáner diario: objetivo fijo del informe y rentabilidad al precio de hoy.
    simbolo, divisa: divisaHoy || d.moneda, objetivo_12m: vig.objetivo_12m, objetivo_base: vig.casos.base.precio, puntuacion: vig.puntuacion,
    ponderada_hoy: precioHoy ? r((vig.objetivo_12m / precioHoy - 1) * 100 + (v.dividendo_pct ?? 0)) : null,
    base_hoy: precioHoy ? r((vig.casos.base.precio / precioHoy - 1) * 100 + (v.dividendo_pct ?? 0)) : null,
    listones: { ponderada: V.compra.ponderada, base: V.compra.base, vender: V.venta.ponderada },
    frente: defendibles.filter((x) => x.senal !== vig.senal).map((x) => `${x.variante}: ${x.senal} (${f(x.ponderada)} %)`), marcas, variantes });
}
if (comoJson) console.log(JSON.stringify(res, null, 1));
else for (const x of res) {
  console.log(`\n${x.empresa} (${x.carpeta}) · ${VIGENTE} ${f(x.ponderada)} % / base ${f(x.base)} % → ${x.senal}${x.conviccion ? ` (${x.conviccion})` : ''} · precio informe ${f(x.precio_informe, 2)}${x.precio_hoy ? `, hoy ${f(x.precio_hoy, 2)} (${x.fecha_hoy})` : ''} · máx. compra ${f(x.precio_max_compra, 2)}`);
  console.log(`  Veredicto: ${x.veredicto}. Señal robusta: ${x.senal_robusta}.${x.frente.length ? ` Cambia con: ${x.frente.join('; ')}.` : ''}`);
  for (const m of x.marcas) console.log(`  [${m.codigo} ${m.tratamiento}] ${m.texto}`);
  console.log(`  Variantes: ${x.variantes.map((t) => `${t.variante} ${f(t.ponderada)}/${f(t.base)} ${t.senal}`).join(' · ')}`);
}
if (escribir) writeFileSync(`${RAIZ}/robustez.json`, JSON.stringify({ fecha: new Date().toISOString(), resultados: res }, null, 1) + '\n');
