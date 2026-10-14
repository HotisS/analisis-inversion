#!/usr/bin/env node
// Prueba de la candidata v12 (verticales/growth/backtest/resultados-v12.md). No escribe nada.
// Compara v11 con v11 + cada mejora por separado (y con v12) sobre casos/ (fase 1), casos2/ (51 neutrales) y casos3/ (industriales),
// y sobre los informes de informes-growth/ con los campos nuevos leídos de cada informe (en memoria; los datos.json no se tocan).
//   node herramientas/growth-backtest-v12.mjs
import fs from 'node:fs';
import path from 'node:path';
import { calcular, VERSIONES } from '../motor/growth.mjs';

const raiz = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const B = path.join(raiz, 'verticales/growth/backtest');
const uni = JSON.parse(fs.readFileSync(path.join(B, 'universo.json'), 'utf8'));
const leer = d => fs.readdirSync(d).filter(f => f.endsWith('.json')).sort().map(f => JSON.parse(fs.readFileSync(path.join(d, f), 'utf8')));
const casos = [
  ...leer(path.join(B, 'casos')).map(d => ({ d, g: 'fase1' })),
  ...['2019', '2021', '2023'].flatMap(c => leer(path.join(B, 'casos2', c)).map(d => ({ d, g: c, r24: d.resultado?.rent_24m_pct, q24: d.resultado?.qqq_24m_pct ?? uni.qqq[c].r24 }))),
  ...leer(path.join(B, 'casos3')).map(d => ({ d, g: 'casos3', r24: d.resultado.rent_24m_pct, q24: d.resultado.qqq_24m_pct })),
];
const V11 = VERSIONES.v11;
const VARIANTES = {
  v11: V11,
  '1 orgánico': { ...V11, organico: true, proforma: true, v12: true },
  '2 euforia EBITDA, veto U=60': { ...V11, euforia_ebitda: { ratio: 1.5, subida: 60, modo: 'veto' }, v12: true },
  '2 euforia EBITDA, veto U=80': { ...V11, euforia_ebitda: { ratio: 1.5, subida: 80, modo: 'veto' }, v12: true },
  '2 euforia EBITDA, veto U=100': { ...V11, euforia_ebitda: { ratio: 1.5, subida: 100, modo: 'veto' }, v12: true },
  '3 desaceleración desde la partida topada': { ...V11, desac_desde_partida: true, alerta_mecanica_corta: true, v12: true },
  '4 tipo de guía y exceso del año en curso': { ...V11, guia_tipo: true, v12: true },
  v12: VERSIONES.v12,
};
const wilson = (k, n) => {
  if (!n) return '—';
  const z = 1.96, p = k / n, den = 1 + z * z / n, cen = (p + z * z / (2 * n)) / den, mar = (z * Math.sqrt(p * (1 - p) / n + z * z / (4 * n * n))) / den;
  return `${Math.round((cen - mar) * 100)}-${Math.round((cen + mar) * 100)}`;
};
const res = Object.fromEntries(Object.entries(VARIANTES).map(([k, cfg]) => [k, casos.map(x => ({ ...x, c: calcular(structuredClone(x.d), cfg) }))]));
const grupo = (R, gs) => {
  const F = R.filter(x => gs.includes(x.g) && x.r24 != null), C = F.filter(x => x.c.senal === 'Comprar'), bt = C.filter(x => x.r24 > x.q24).length;
  return `${C.length}/${F.length}, ${bt} baten (${C.length ? Math.round(bt / C.length * 100) + ' %' : '—'}; ${wilson(bt, C.length)})`;
};
console.log('| Variante | Fase 1: ganadoras / fracasos con Comprar | Ajuste 2019-21: compras, baten al QQQ (margen 95 %) | Validación 2023 | Las 51 | Industriales (casos3) | Señales que cambian frente a v11 |\n|---|---|---|---|---|---|---|');
for (const [k, R] of Object.entries(res)) {
  const f1 = R.filter(x => x.g === 'fase1'), tipo = t => f1.filter(x => x.d.caso.tipo === t);
  const cambian = R.filter((x, i) => x.c.senal !== res.v11[i].c.senal).length;
  console.log(`| ${k} | ${tipo('ganadora').filter(x => x.c.senal === 'Comprar').length}/${tipo('ganadora').length} y ${tipo('fracaso').filter(x => x.c.senal === 'Comprar').length}/${tipo('fracaso').length} | ${grupo(R, ['2019', '2021'])} | ${grupo(R, ['2023'])} | ${grupo(R, ['2019', '2021', '2023'])} | ${grupo(R, ['casos3'])} | ${k === 'v11' ? '—' : cambian} |`);
}
console.log('\nCasos con cifras distintas de v11:');
for (const k of Object.keys(VARIANTES).filter(k => k !== 'v11'))
  for (const [i, x] of res[k].entries()) {
    const a = res.v11[i].c, b = x.c;
    if (a.senal !== b.senal || Math.abs(a.rent_ponderada_pct - b.rent_ponderada_pct) > 0.05)
      console.log(`- [${k}] ${x.g} ${x.d.empresa}: ${a.senal} ${a.rent_ponderada_pct} % → ${b.senal} ${b.rent_ponderada_pct} % (factor ${a.factor_desaceleracion} → ${b.factor_desaceleracion}); después: ${x.r24 != null ? x.r24 + ' % a 24 m (QQQ ' + x.q24 + ' %)' : x.d.caso?.tipo + ', ' + x.d.resultado?.rent_36m_pct + ' % a 36 m'}`);
  }

// Contraste de la mejora 2: múltiplo > 1,5 × su mediana de 3 años y subida a 12 m ≥ U (resultados-v12.md, §1)
console.log('\nMejora 2, casos marcados (múltiplo > 1,5 × mediana y subida ≥ U):');
const bate = x => (x.g === 'fase1' ? x.d.caso.tipo === 'ganadora' : x.r24 > x.q24);
const marc = res.v11.filter(x => x.g === 'fase1' || x.r24 != null).map(x => {
  const v = x.d.valoracion, ebitda = /ebitda/i.test(v.metrica || ''), mult = ebitda ? v.multiplo_actual : x.c.ev_ventas_ntm;
  return { ...x, ebitda, ratio: v.mediana_3a ? mult / v.mediana_3a : null, sub: x.d.tendencia.subida_12m_pct };
});
for (const [nombre, ent, val] of [['EBITDA', x => x.ebitda && (x.g === 'fase1' || x.d.fecha < '2023'), x => x.ebitda && x.g === 'casos3' && x.d.fecha >= '2023'],
  ['EV/ventas (contraste)', x => !x.ebitda && ['fase1', '2019', '2021'].includes(x.g), x => !x.ebitda && x.g === '2023']])
  for (const U of [60, 80, 100]) {
    const m = G => G.filter(x => x.ratio > 1.5 && x.sub != null && x.sub >= U);
    const e = m(marc.filter(ent)), v = m(marc.filter(val));
    console.log(`- ${nombre}, U=${U}: entrenamiento ${e.length} de ${marc.filter(ent).length} marcados (baten ${e.filter(bate).length}; Comprar con v11: ${e.filter(x => x.c.senal === 'Comprar').map(x => x.d.empresa + ' ' + x.d.fecha.slice(0, 4)).join(', ') || 'ninguno'}); validación ${v.length} de ${marc.filter(val).length}`);
  }

// Informes actuales: campos nuevos leídos de cada informe (cifra y sitio en resultados-v12.md, §3)
const LEIDO = {
  'howmet-2026-10-14': { crecimiento_actual_organico_pct: 15, exceso_guia_actual_pp: 11.8 },
  'quanta-services-2026-10-14': { crecimiento_actual_organico_pct: 21, exceso_guia_actual_pp: 21.1 },
  'ge-vernova-2026-10-14': { crecimiento_actual_organico_pct: 13 },
  'comfort-systems-2026-10-14': { crecimiento_actual_organico_pct: 30.2, exceso_guia_actual_pp: 20 },
  'doordash-2026-10-14': { crecimiento_actual_organico_pct: 21 },
  'zscaler-2026-10-14': { crecimiento_actual_organico_pct: 17 },
  'saab-2026-10-14': { tipo_guia: 'medio_plazo', exceso_guia_mp_pp: 7.6 },
  'transmedics-2026-10-14': { tipo_guia: 'anual', exceso_guia_actual_pp: 0.8 },
  'natera-2026-10-14': { tipo_guia: 'anual', exceso_guia_actual_pp: 9.6 },
  'eli-lilly-2026-10-14': { tipo_guia: 'anual', exceso_guia_actual_pp: 6.9 },
  'vertex-2026-10-14': { tipo_guia: 'anual', exceso_guia_actual_pp: 1.1 },
};
console.log('\nInformes actuales (solo los que cambian de cifras o tienen alertas nuevas):');
const dir = path.join(raiz, 'informes-growth');
for (const e of fs.readdirSync(dir).filter(y => fs.existsSync(path.join(dir, y, 'datos.json'))).sort()) {
  const d0 = JSON.parse(fs.readFileSync(path.join(dir, e, 'datos.json'), 'utf8'));
  const d = { ...d0, crecimiento: { ...d0.crecimiento, ...(LEIDO[e] ?? {}) } };
  const a = calcular(structuredClone(d), V11);
  for (const k of Object.keys(VARIANTES).filter(k => k !== 'v11' && !/veto/.test(k))) {
    const b = calcular(structuredClone(d), VARIANTES[k]);
    const nuevas = (b.alertas ?? []).filter(y => !(a.alertas ?? []).includes(y));
    if (a.senal !== b.senal || Math.abs(a.rent_ponderada_pct - b.rent_ponderada_pct) > 0.05 || nuevas.length)
      console.log(`- [${k}] ${d.empresa}: ${a.senal} ${a.rent_ponderada_pct} % (compra hasta ${a.precio_max_compra}) → ${b.senal} ${b.rent_ponderada_pct} % (compra hasta ${b.precio_max_compra})${nuevas.length ? ' · alerta: ' + nuevas.join(' / ') : ''}`);
  }
}
