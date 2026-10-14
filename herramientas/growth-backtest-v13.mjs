#!/usr/bin/env node
// Prueba de la candidata v13 (verticales/growth/backtest/resultados-v13.md). No escribe nada.
// Compara v12 con v12 + cada mejora por separado (y con v13, si existe) sobre casos/ (fase 1), casos2/ (51 neutrales)
// y casos3/ (industriales), con entrenamiento (fase 1 + 2019 + 2021) y validación (2023 + industriales) separados;
// y sobre los informes de informes-growth/ con los campos nuevos leídos de cada informe (en memoria; los datos.json no se tocan).
//   node herramientas/growth-backtest-v13.mjs
import fs from 'node:fs';
import path from 'node:path';
import { calcular, VERSIONES } from '../motor/growth.mjs';

const raiz = process.env.GROWTH_RAIZ ?? path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const B = path.join(raiz, 'verticales/growth/backtest');
const uni = JSON.parse(fs.readFileSync(path.join(B, 'universo.json'), 'utf8'));
const leer = d => fs.readdirSync(d).filter(f => f.endsWith('.json')).sort().map(f => ({ f, d: JSON.parse(fs.readFileSync(path.join(d, f), 'utf8')) }));

// Subida a 6 meses (%) de cada caso, tal como la da la evidencia de su señal 3 («fuerza_relativa_6m»), escrita con los precios
// de la fecha. null = la evidencia no da una cifra de 6 meses (sin prueba, o menos de 6 meses cotizando: Beyond Meat 2019,
// Palantir 2021 y Rivian 2021 dan la subida desde la salida a bolsa, no a 6 meses; GE Vernova 2024, escisión).
const SUB6 = {
  'casos/applovin-2024-02.json': 45, 'casos/axon-2023-03.json': 75, 'casos/beyond-meat-2019-07.json': null, 'casos/celestica-2024-02.json': 37.5,
  'casos/crowdstrike-2020-06.json': 86, 'casos/duolingo-2023-03.json': 10, 'casos/meta-2023-02.json': 11, 'casos/netflix-2013-01.json': 110,
  'casos/nvidia-2016-11.json': 100, 'casos/nvidia-2023-03.json': 65, 'casos/palantir-2021-02.json': null, 'casos/palantir-2023-05.json': 40,
  'casos/peloton-2021-01.json': 160, 'casos/rheinmetall-2022-03.json': 85, 'casos/rivian-2021-12.json': null, 'casos/shopify-2017-02.json': 36,
  'casos/snowflake-2021-11.json': 95, 'casos/teladoc-2021-02.json': 37, 'casos/tesla-2019-10.json': 33, 'casos/zoom-2020-10.json': 260,
  'casos3/array-2023-03.json': 32, 'casos3/celestica-2023-03.json': 53.4, 'casos3/comfort-systems-2023-03.json': 50, 'casos3/eaton-2022-03.json': 0.7,
  'casos3/enphase-2023-03.json': -24.2, 'casos3/ge-vernova-2024-04.json': null, 'casos3/generac-2022-03.json': -26.6, 'casos3/jabil-2023-03.json': 52.8,
  'casos3/rheinmetall-2022-03.json': 85, 'casos3/siemens-energy-2023-03.json': 77.8, 'casos3/solaredge-2023-03.json': 31.3,
  'casos3/vertiv-2023-03.json': 47.2, 'casos3/vestas-2022-03.json': -19.5,
  '2019/amzn.json': -11, '2019/bidu.json': null, '2019/crsp.json': null, '2019/edit.json': null, '2019/ilmn.json': -15, '2019/nflx.json': -5,
  '2019/ntla.json': null, '2019/nvda.json': -36, '2019/nvta.json': 40, '2019/prlb.json': null, '2019/roku.json': -12, '2019/sq.json': -24,
  '2019/ssys.json': -10, '2019/tsla.json': 6, '2019/twou.json': -6, '2019/twtr.json': 16, '2019/z.json': null,
  '2021/bidu.json': 72, '2021/crsp.json': 46, '2021/exas.json': 29, '2021/ntla.json': 300, '2021/nvta.json': -11, '2021/pacb.json': 236,
  '2021/prlb.json': -6, '2021/roku.json': 73, '2021/shop.json': 8, '2021/spot.json': 10, '2021/sq.json': 40, '2021/tcehy.json': 19,
  '2021/tdoc.json': -17, '2021/tsla.json': 56, '2021/twlo.json': 38, '2021/u.json': 15, '2021/z.json': 28,
  '2023/beam.json': -36, '2023/coin.json': 5, '2023/crsp.json': -31, '2023/exas.json': 109, '2023/ntla.json': -33, '2023/pacb.json': 100,
  '2023/path.json': 39, '2023/rblx.json': 26, '2023/roku.json': 17, '2023/rxrx.json': -37, '2023/shop.json': 78, '2023/sq.json': 25,
  '2023/tdoc.json': 0, '2023/tsla.json': -22, '2023/twlo.json': -4, '2023/u.json': 1, '2023/zm.json': 0,
};
// Sensibilidad (no decide): subida desde la salida a bolsa en los que llevaban < 6 meses cotizando
const SUB6_OPV = { 'casos/beyond-meat-2019-07.json': 840, 'casos/palantir-2021-02.json': 250, 'casos/rivian-2021-12.json': 53 };

const conSub6 = (k, d) => ({ ...d, tendencia: { ...d.tendencia, subida_6m_pct: SUB6[k] ?? null } });
const casos = [
  ...leer(path.join(B, 'casos')).map(({ f, d }) => ({ k: 'casos/' + f, d: conSub6('casos/' + f, d), g: 'fase1', r12: d.resultado?.rent_12m_pct })),
  ...['2019', '2021', '2023'].flatMap(c => leer(path.join(B, 'casos2', c)).map(({ f, d }) => ({ k: c + '/' + f, d: conSub6(c + '/' + f, d), g: c,
    r12: d.resultado?.rent_12m_pct, r24: d.resultado?.rent_24m_pct, q24: d.resultado?.qqq_24m_pct ?? uni.qqq[c].r24 }))),
  ...leer(path.join(B, 'casos3')).map(({ f, d }) => ({ k: 'casos3/' + f, d: conSub6('casos3/' + f, d), g: 'casos3', r12: d.resultado.rent_12m_pct, r24: d.resultado.rent_24m_pct, q24: d.resultado.qqq_24m_pct })),
];
for (const x of casos) if (!(x.k in SUB6)) throw new Error('Falta la subida a 6 meses de ' + x.k);
const ENT = ['fase1', '2019', '2021'], VAL = ['2023', 'casos3'];
const bate = x => (x.g === 'fase1' ? x.d.caso.tipo === 'ganadora' : x.r24 > x.q24);

const V12 = VERSIONES.v12;
const VARIANTES = {
  v12: V12,
  '1 múltiplo caro: bajista a la mediana': { ...V12, multiplo_caro: { ratio: 2, modo: 'bajista' }, v13: true },
  '1 control: múltiplo caro veta': { ...V12, multiplo_caro: { ratio: 2, modo: 'veto' }, v13: true },
  '2 regla del 40 − SBC, T=10': { ...V12, sbc_regla40: 10, v13: true },
  '2 regla del 40 − SBC, T=15': { ...V12, sbc_regla40: 15, v13: true },
  '3 euforia 6 m, veto U=80': { ...V12, euforia_6m: { subida: 80, evbb: 20, modo: 'veto' }, v13: true },
  '3 euforia 6 m, veto U=100': { ...V12, euforia_6m: { subida: 100, evbb: 20, modo: 'veto' }, v13: true },
  '4 guía recortada: exceso 0': { ...V12, guia_recortada: true, v13: true },
  ...(VERSIONES.v13 ? { v13: VERSIONES.v13 } : {}),
};
const wilson = (k, n) => {
  if (!n) return '—';
  const z = 1.96, p = k / n, den = 1 + z * z / n, cen = (p + z * z / (2 * n)) / den, mar = (z * Math.sqrt(p * (1 - p) / n + z * z / (4 * n * n))) / den;
  return `${Math.round((cen - mar) * 100)}-${Math.round((cen + mar) * 100)}`;
};
const pct = (k, n) => (n ? Math.round(k / n * 100) + ' %' : '—');
const fmt = n => (n == null ? '—' : (n > 0 ? '+' : '') + String(Math.round(n * 10) / 10).replace('.', ','));
const res = Object.fromEntries(Object.entries(VARIANTES).map(([k, cfg]) => [k, casos.map(x => ({ ...x, c: calcular(structuredClone(x.d), cfg) }))]));
const grupo = (R, gs) => {
  const F = R.filter(x => gs.includes(x.g) && x.r24 != null), C = F.filter(x => x.c.senal === 'Comprar'), bt = C.filter(x => x.r24 > x.q24).length;
  const ex = C.length ? C.reduce((s, x) => s + x.r24 - x.q24, 0) / C.length : null;
  return `${C.length}/${F.length}, ${bt} baten (${pct(bt, C.length)}; ${wilson(bt, C.length)}; exceso ${fmt(ex)} pp)`;
};
console.log('## Resultados por variante (v12 + una mejora)\n');
console.log('| Variante | Fase 1: ganadoras / fracasos con Comprar | Entrenamiento 2019-21 | Validación 2023 | Las 51 | Industriales (casos3) | Señales que cambian frente a v12 |\n|---|---|---|---|---|---|---|');
for (const [k, R] of Object.entries(res)) {
  const f1 = R.filter(x => x.g === 'fase1'), tipo = t => f1.filter(x => x.d.caso.tipo === t);
  const cambian = R.filter((x, i) => x.c.senal !== res.v12[i].c.senal).length;
  console.log(`| ${k} | ${tipo('ganadora').filter(x => x.c.senal === 'Comprar').length}/${tipo('ganadora').length} y ${tipo('fracaso').filter(x => x.c.senal === 'Comprar').length}/${tipo('fracaso').length} | ${grupo(R, ['2019', '2021'])} | ${grupo(R, ['2023'])} | ${grupo(R, ['2019', '2021', '2023'])} | ${grupo(R, ['casos3'])} | ${k === 'v12' ? '—' : cambian} |`);
}
const despues = x => (x.r24 != null ? `${fmt(x.r24)} % a 24 m (QQQ ${fmt(x.q24)} %)` : `${x.d.caso?.tipo}, ${fmt(x.d.resultado?.rent_36m_pct)} % a 36 m`);
console.log('\nCasos con señal distinta de v12, o ponderada que se mueve > 0,05 puntos:');
for (const k of Object.keys(VARIANTES).filter(k => k !== 'v12'))
  for (const [i, x] of res[k].entries()) {
    const a = res.v12[i].c, b = x.c;
    if (a.senal !== b.senal || Math.abs(a.rent_ponderada_pct - b.rent_ponderada_pct) > 0.05 || a.puntuacion !== b.puntuacion)
      console.log(`- [${k}] ${x.g} ${x.d.empresa}: ${a.senal} ${fmt(a.rent_ponderada_pct)} % (punt. ${a.puntuacion}, bajista ${fmt(a.casos.bajista.rent_pct)} %) → ${b.senal} ${fmt(b.rent_ponderada_pct)} % (punt. ${b.puntuacion}, bajista ${fmt(b.casos.bajista.rent_pct)} %)${a.senal !== b.senal ? ' ←' : ''}; después: ${despues(x)}`);
  }

// Prueba del sesgo, mejora 1: ¿el resultado real a 12 m cae por debajo del bajista de v12 más a menudo cuando el múltiplo es > 2 × mediana?
console.log('\n## Mejora 1: prueba del sesgo (resultado real a 12 m frente al bajista)\n');
const R1 = res['1 múltiplo caro: bajista a la mediana'];
const m1 = R1.map((x, i) => ({ ...x, a: res.v12[i].c })).filter(x => x.r12 != null);
for (const [nombre, F] of [['Marcados (múltiplo > 2 × mediana)', m1.filter(x => x.c.multiplo_caro)], ['No marcados', m1.filter(x => !x.c.multiplo_caro)]]) {
  const bajo12 = F.filter(x => x.r12 < x.a.casos.bajista.rent_pct).length, bajo13 = F.filter(x => x.r12 < x.c.casos.bajista.rent_pct).length;
  console.log(`- ${nombre}: ${F.length} casos; resultado a 12 m por debajo del bajista de v12 en ${bajo12} (${pct(bajo12, F.length)}); por debajo del bajista acotado en ${bajo13} (${pct(bajo13, F.length)}); baten al QQQ a 24 m o ganadoras: ${F.filter(x => x.g === 'fase1' || x.r24 != null).filter(bate).length} de ${F.filter(x => x.g === 'fase1' || x.r24 != null).length}`);
}
console.log('\n| Caso marcado | Grupo | Múltiplo hoy / mediana | Bajista v12 → acotado | Real a 12 m | Señal v12 | Después |\n|---|---|---|---|---|---|---|');
for (const x of m1.filter(x => x.c.multiplo_caro)) {
  const v = x.d.valoracion, mult = /ebitda/i.test(v.metrica || '') ? (x.c.multiplo_ebitda ?? v.multiplo_actual) : x.c.ev_ventas_ntm;
  console.log(`| ${x.d.empresa} ${x.d.fecha.slice(0, 7)} | ${x.g} | ${fmt(mult)} / ${fmt(v.mediana_3a)} | ${fmt(x.a.casos.bajista.rent_pct)} % → ${fmt(x.c.casos.bajista.rent_pct)} % | ${fmt(x.r12)} % | ${x.a.senal} | ${despues(x)} |`);
}

// Prueba del sesgo, mejora 2: ¿baten menos las de SBC > T?
console.log('\n## Mejora 2: prueba del sesgo (baten al QQQ a 24 m, o ganadoras de la fase 1)\n');
const conRes = res.v12.filter(x => x.g === 'fase1' || x.r24 != null);
for (const T of [10, 15])
  for (const [nombre, gs] of [['entrenamiento', ENT], ['validación', VAL]]) {
    const F = conRes.filter(x => gs.includes(x.g)), s = F.filter(x => x.d.finanzas.sbc_sobre_ventas_pct > T), r = F.filter(x => !(x.d.finanzas.sbc_sobre_ventas_pct > T));
    console.log(`- T=${T}, ${nombre}: SBC > T ${s.filter(bate).length} de ${s.length} (${pct(s.filter(bate).length, s.length)}); resto ${r.filter(bate).length} de ${r.length} (${pct(r.filter(bate).length, r.length)}); compras de v12 con SBC > T: ${s.filter(x => x.c.senal === 'Comprar').map(x => x.d.empresa + ' ' + x.d.fecha.slice(0, 4) + (bate(x) ? ' (bate)' : ' (no bate)')).join(', ') || 'ninguna'}`);
  }

// Prueba del sesgo, mejora 3: casos marcados por la euforia a 6 meses
console.log('\n## Mejora 3: casos marcados (subida a 6 m ≥ U y EV/beneficio bruto > 20)\n');
for (const U of [80, 100])
  for (const [nombre, gs] of [['entrenamiento', ENT], ['validación', VAL]]) {
    const F = conRes.filter(x => gs.includes(x.g)), m = F.filter(x => x.d.tendencia.subida_6m_pct >= U && x.c.ev_bb_ntm > 20), r = F.filter(x => !m.includes(x));
    console.log(`- U=${U}, ${nombre}: marcados ${m.length} de ${F.length}, baten ${m.filter(bate).length} (${pct(m.filter(bate).length, m.length)}) frente a ${pct(r.filter(bate).length, r.length)} de los demás; ` +
      `ya con euforia de 12 m: ${m.filter(x => x.c.euforia).length}; Comprar con v12: ${m.filter(x => x.c.senal === 'Comprar').map(x => x.d.empresa + ' ' + x.d.fecha.slice(0, 4) + (bate(x) ? ' (bate)' : ' (no bate)')).join(', ') || 'ninguna'}. ` +
      `Marcados: ${m.map(x => `${x.d.empresa} ${x.d.fecha.slice(0, 4)} (+${x.d.tendencia.subida_6m_pct} %, EV/BB ${x.c.ev_bb_ntm}, ${bate(x) ? 'bate' : 'no bate'})`).join('; ')}`);
  }
console.log('- Sensibilidad (no decide): con la subida desde la salida a bolsa de ' + Object.keys(SUB6_OPV).map(k => k.split('/')[1]).join(', ') + ': ' +
  Object.entries(SUB6_OPV).map(([k, s]) => { const x = conRes.find(y => y.k === k); return `${x.d.empresa} +${s} %, EV/BB ${x.c.ev_bb_ntm}, ${x.c.senal} con v12, ${x.d.caso.tipo}`; }).join('; '));

// Informes actuales
// Campos leídos de cada informe (cifra y línea en resultados-v13.md §3). Orgánico: el de v12 si el datos.json aún no lo tiene.
const ORGANICO_V12 = { 'howmet-2026-10-14': 15, 'quanta-services-2026-10-14': 21, 'ge-vernova-2026-10-14': 13, 'comfort-systems-2026-10-14': 30.2, 'doordash-2026-10-14': 21, 'zscaler-2026-10-14': 17 };
const GUIA_RECORTADA = { 'alnylam-2026-10-14': true, 'hubspot-2026-10-14': true, 'insulet-2026-10-14': true };
const SUB6_INF = {
  'aerovironment-2026-10-14': -34.6, 'alnylam-2026-10-14': -32.8, 'argenx-2026-10-14': null, 'arista-2026-10-14': 34.5, 'axon-2026-10-14': 5, 'besi-2026-10-14': -25,
  'boston-scientific-2026-10-14': -31.4, 'celestica-2026-10-14': -2.2, 'celsius-2026-10-14': -17, 'cloudflare-2026-10-14': 70, 'comfort-systems-2026-10-14': -0.1,
  'crowdstrike-2026-10-14': null, 'datadog-2026-10-14': 156, 'dexcom-2026-10-14': 34.8, 'dlocal-2026-10-14': 10, 'doordash-2026-10-14': 21, 'duolingo-2026-10-14': 49.8,
  'eli-lilly-2026-10-14': 25.5, 'ge-vernova-2026-10-14': 1.3, 'howmet-2026-10-14': -15.3, 'hubspot-2026-10-14': 7.8, 'insmed-2026-10-14': -36, 'insulet-2026-10-14': -30.2,
  'kinsale-2026-10-14': -4.9, 'mongodb-2026-10-14': 58, 'monolithic-power-2026-10-14': -3.8, 'natera-2026-10-14': 96, 'nu-holdings-2026-10-14': 5, 'palantir-2026-10-14': 60,
  'quanta-services-2026-10-14': 15.6, 'rheinmetall-2026-10-14': -17.5, 'rocket-lab-2026-10-14': null, 'rolls-royce-2026-10-14': 6, 'saab-2026-10-14': -3.5,
  'samsara-2026-10-14': 55.2, 'shopify-2026-10-14': 49, 'siemens-energy-2026-10-14': -22.5, 'snowflake-2026-10-14': 166.5, 'spotify-2026-10-14': null,
  'toast-2026-10-14': 13.8, 'transmedics-2026-10-14': -30.2, 'vertex-2026-10-14': 10.3, 'wise-2026-10-14': -12, 'zscaler-2026-10-14': 86.4,
};
// Informes nuevos (no en la tabla): la cifra «±N % en 6 meses» de la evidencia de su señal 3, si la hay
const sub6De = (e, d) => {
  if (e in SUB6_INF) return SUB6_INF[e];
  if (d.tendencia?.subida_6m_pct != null) return d.tendencia.subida_6m_pct;
  const m = (d.tendencia?.senales?.fuerza_relativa_6m?.evidencia ?? '').match(/([+−-]\s?\d+(?:,\d+)?)\s?% en (?:6|seis) meses/);
  return m ? Number(m[1].replace('−', '-').replace(/\s/g, '').replace(',', '.')) : null;
};
const CARTERA = ['nu-holdings', 'axon', 'shopify', 'snowflake', 'samsara'];
const SUPLENTES = ['mongodb', 'toast', 'zscaler', 'dlocal', 'dexcom', 'datadog', 'argenx', 'natera', 'saab'];
const papel = e => (CARTERA.some(y => e.startsWith(y + '-')) ? 'cartera' : SUPLENTES.some(y => e.startsWith(y + '-')) ? 'suplente' : '');
console.log('\n## Informes actuales (v12 frente a cada variante; solo los que cambian de señal, puntuación, ponderada, «compra hasta» o con alerta nueva)\n');
const dir = path.join(raiz, 'informes-growth');
const filasInf = [];
for (const e of fs.readdirSync(dir).filter(y => fs.existsSync(path.join(dir, y, 'datos.json'))).sort()) {
  const d0 = JSON.parse(fs.readFileSync(path.join(dir, e, 'datos.json'), 'utf8'));
  const crec = { ...d0.crecimiento };
  if (crec.crecimiento_actual_organico_pct == null && ORGANICO_V12[e] != null) crec.crecimiento_actual_organico_pct = ORGANICO_V12[e];
  if (GUIA_RECORTADA[e] != null) crec.guia_recortada = GUIA_RECORTADA[e];
  const d = { ...d0, crecimiento: crec, tendencia: { ...d0.tendencia, subida_6m_pct: sub6De(e, d0) } };
  const a = calcular(structuredClone(d), V12);
  const fila = { e, papel: papel(e), d, a, b: {} };
  for (const k of Object.keys(VARIANTES).filter(k => k !== 'v12')) {
    const b = calcular(structuredClone(d), VARIANTES[k]);
    fila.b[k] = b;
    const nuevas = (b.alertas ?? []).filter(y => !(a.alertas ?? []).includes(y));
    if (a.senal !== b.senal || Math.abs(a.rent_ponderada_pct - b.rent_ponderada_pct) > 0.05 || a.precio_max_compra !== b.precio_max_compra || a.puntuacion !== b.puntuacion || nuevas.length)
      console.log(`- [${k}] ${d.empresa}${fila.papel ? ' (' + fila.papel + ')' : ''}: ${a.senal} ${fmt(a.rent_ponderada_pct)} % (punt. ${a.puntuacion}, bajista ${fmt(a.casos.bajista.rent_pct)} %, compra hasta ${a.precio_max_compra}) → ${b.senal} ${fmt(b.rent_ponderada_pct)} % (punt. ${b.puntuacion}, bajista ${fmt(b.casos.bajista.rent_pct)} %, compra hasta ${b.precio_max_compra})${a.senal !== b.senal ? ' ←' : ''}${nuevas.length ? ' · alerta: ' + nuevas.join(' / ') : ''}`);
  }
  filasInf.push(fila);
}
if (VERSIONES.v13) {
  console.log('\n## Cartera y suplentes: v12 → v13\n\n| Empresa | Papel | v12: señal, ponderada, compra hasta | v13: señal, ponderada, compra hasta | Alertas nuevas de v13 |\n|---|---|---|---|---|');
  for (const x of filasInf.filter(x => x.papel)) {
    const b = x.b.v13, nuevas = (b.alertas ?? []).filter(y => !(x.a.alertas ?? []).includes(y));
    console.log(`| ${x.d.empresa} | ${x.papel} | ${x.a.senal}, ${fmt(x.a.rent_ponderada_pct)} %, ${x.a.precio_max_compra} | ${b.senal}, ${fmt(b.rent_ponderada_pct)} %, ${b.precio_max_compra} | ${nuevas.join(' / ') || '—'} |`);
  }
}
