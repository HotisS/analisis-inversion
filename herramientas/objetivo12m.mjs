// Objetivo realista a 12 meses (método del 12/13-oct-2026; ver verticales/empresa/objetivo-12m.md).
// Los informes toman el valor intrínseco (DCF y síntesis) como objetivo a 12 meses; eso supone que el mercado
// cierra todo el descuento en un año. Este método supone que cierra solo una parte y lo contrasta con el consenso:
//
//   objetivo_12m = precio + k × (valor_intrínseco − precio), recortado al po_max del consenso si lo supera
//   k = 0,5 por defecto; 0,25 con convicción Baja o con un evento binario cercano (lista EVENTOS)
//   rentabilidad_12m = objetivo_12m / precio − 1 + dividendo
//   señal_12m: Comprar ≥ 15 %, Vender ≤ −10 %, Mantener en medio (umbrales del motor)
//
// Las revisiones hechas a mano en el hilo del proyecto «PROYECTOS GH - INV» (12-oct) mandan sobre la regla:
// verticales/empresa/objetivo12m-revisados.json.
//
//   node herramientas/objetivo12m.mjs            → tabla de todos los informes (última versión de cada carpeta)
//   import { objetivo12m } from './objetivo12m.mjs'

import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const n = (v) => (v === null || v === undefined || v === '' || Number.isNaN(+v) ? null : +v);
const r2 = (v) => (v === null ? null : Math.round(v * 100) / 100);
const r1 = (v) => (v === null ? null : Math.round(v * 10) / 10);

// Eventos binarios en los próximos ~3 meses que justifican cerrar solo un 25 % del descuento.
export const EVENTOS = {
  EDEN: 'Ley francesa del título restaurante (tope de comisión por decreto posible)',
  PLX: 'Ley francesa del título restaurante (tope de comisión por decreto posible)',
  COLO: 'Resultados 2025/26 el 3-nov y plan del nuevo consejero delegado',
  'COLO-B': 'Resultados 2025/26 el 3-nov y plan del nuevo consejero delegado',
  TE: 'Resultados del 29-oct y cierre de los sobrecostes de Oriente Medio',
};

const RUTA_REV = new URL('../verticales/empresa/objetivo12m-revisados.json', import.meta.url);
const revisados = existsSync(RUTA_REV) ? JSON.parse(readFileSync(RUTA_REV, 'utf8')).revisados : {};

export function senal12m(rte) { return rte === null ? null : rte >= 15 ? 'Comprar' : rte <= -10 ? 'Vender' : 'Mantener'; }

export function objetivo12m(d) {
  const id = d.identificacion || {}, R = d.calc?.recomendacion || {}, co = d.consenso?.recomendaciones || {};
  const ticker = String(id.ticker || '').trim().toUpperCase().replace(/\s+/g, '-');
  const precio = n(id.precio), V = n(d.calc?.sintesis?.valor_objetivo), div = n(R.dividendo_pct) ?? 0;
  const rev = revisados[ticker];
  if (rev) return { ticker, precio, valor: V, k: null, objetivo: n(rev.objetivo_12m), rte: n(rev.rentabilidad_12m_pct), senal: rev.senal, origen: `Revisión manual (${rev.fecha}): ${rev.nota}` };
  if (precio === null || V === null) return { ticker, precio, valor: V, k: null, objetivo: null, rte: null, senal: null, origen: 'Sin precio o sin valor' };
  const evento = EVENTOS[ticker];
  const k = evento || /baja/i.test(d.resumen?.conviccion || '') ? 0.25 : 0.5;
  let T = precio + k * (V - precio), acotado = '';
  // El consenso solo recorta (prima el valor real del activo: los analistas no suben nuestro objetivo) y solo si está
  // en la misma unidad que el precio (objetivo medio entre 0,4 y 2,5 veces el precio; si no, GBp frente a GBP o ADS).
  const hi = n(co.po_max), med = n(co.po_medio);
  const comparable = med !== null && med / precio > 0.4 && med / precio < 2.5;
  if (comparable && hi !== null && T > hi) { T = hi; acotado = ' · recortado al máximo del consenso'; }
  if (!comparable && med !== null) acotado = ' · consenso en otra unidad: no se usa';
  const rte = (T / precio - 1) * 100 + div;
  return { ticker, precio, valor: V, k, objetivo: r2(T), rte: r1(rte), senal: senal12m(r1(rte)), origen: `Regla (k = ${k}${evento ? `, evento: ${evento}` : ''}${acotado})` };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const { readdirSync } = await import('node:fs');
  const filas = [];
  for (const dir of readdirSync('informes', { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name)) {
    const arch = readdirSync(`informes/${dir}`);
    const vs = arch.map((f) => f.match(/^datos-v(\d+)\.json$/)).filter(Boolean).sort((a, b) => b[1] - a[1]);
    const f = vs.length ? vs[0][0] : arch.includes('datos.json') ? 'datos.json' : null;
    if (!f) continue;
    const d = JSON.parse(readFileSync(`informes/${dir}/${f}`, 'utf8'));
    if (!d.calc?.recomendacion) continue;
    const o = objetivo12m(d);
    filas.push({ dir, senalDcf: d.calc.recomendacion.recomendacion, rteDcf: n(d.calc.recomendacion.rentabilidad_total_pct), ...o });
  }
  filas.sort((a, b) => (b.rte ?? -999) - (a.rte ?? -999));
  console.log('Informe'.padEnd(32), 'Señal DCF', '  RT DCF', '  Obj 12 m', ' RT 12 m', 'Señal 12 m', ' Origen');
  for (const f of filas) console.log(f.dir.padEnd(32), String(f.senalDcf).padEnd(9), String(f.rteDcf).padStart(8), String(f.objetivo).padStart(10), String(f.rte).padStart(8), String(f.senal).padEnd(10), f.origen);
}
