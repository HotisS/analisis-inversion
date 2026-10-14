#!/usr/bin/env node
// Prueba de la candidata v14 (verticales/growth/backtest/resultados-v14.md). No escribe nada.
// Compara v13 con v13 + cada mejora por separado (y con v14, si existe) sobre casos/ (fase 1), casos2/ (51 neutrales)
// y casos3/ (industriales), con entrenamiento (fase 1 + 2019 + 2021) y validación (2023 + industriales) separados;
// y sobre los informes de informes-growth/ con los campos nuevos leídos de cada informe (en memoria; los datos.json no se tocan).
//   node herramientas/growth-backtest-v14.mjs
//   GROWTH_MOTOR=/ruta/a/growth.mjs node herramientas/growth-backtest-v14.mjs   (para probar otra copia del motor)
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const raiz = process.env.GROWTH_RAIZ ?? path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const { calcular, VERSIONES } = await import(process.env.GROWTH_MOTOR ? pathToFileURL(process.env.GROWTH_MOTOR).href : '../motor/growth.mjs');
const B = path.join(raiz, 'verticales/growth/backtest');
const uni = JSON.parse(fs.readFileSync(path.join(B, 'universo.json'), 'utf8'));
const leer = d => fs.readdirSync(d).filter(f => f.endsWith('.json')).sort().map(f => ({ f, d: JSON.parse(fs.readFileSync(path.join(d, f), 'utf8')) }));

// ── Campos nuevos en los casos (fijados antes de calcular; resultados-v14.md §1) ──
// Mejora 1: peso del mayor producto (% de las ventas de 12 m) y decisión regulatoria abierta (% de las ventas)
const PROD = { '2021/exas.json': 59, '2023/exas.json': 69 }; // Cologuard (cribado): 878/1.491 M en 2020; 1.436/2.084 M en 2022
const DEC = { '2023/coin.json': 74 }; // aviso Wells de la SEC (22-mar-2023): ingresos por transacciones 2.356/3.194 M en 2022
// Mejora 2: casos cuya nota dice que la dilución pasada vino de ampliaciones por caja ya cobradas (en caja_m y en acciones)
const DIL = ['2019/nvta.json', '2021/roku.json', '2021/pacb.json', '2019/crsp.json', '2019/edit.json', '2019/ntla.json', '2021/ntla.json',
  '2023/ntla.json', '2023/beam.json', '2023/rxrx.json', '2023/pacb.json', '2021/tsla.json', '2019/z.json', '2019/twou.json', '2021/shop.json'];
const DIL_OPV = ['casos/rivian-2021-12.json', 'casos/beyond-meat-2019-07.json', 'casos/snowflake-2021-11.json']; // sensibilidad: salidas a bolsa sin nota
const ESPERADA = Number(process.env.DIL_ESPERADA ?? 3);

const conCampos = (k, d, dilSet = DIL, esp = ESPERADA) => {
  const x = structuredClone(d);
  if (PROD[k] != null) x.mercado = { ...x.mercado, peso_primer_producto_pct: PROD[k] };
  if (DEC[k] != null) x.riesgos = { ...x.riesgos, decision_pendiente_pct: DEC[k] };
  if (dilSet.includes(k)) x.finanzas = { ...x.finanzas, dilucion_esperada_pct: Math.min(esp, x.finanzas.dilucion_anual_pct ?? 0) };
  return x;
};
const crudos = [
  ...leer(path.join(B, 'casos')).map(({ f, d }) => ({ k: 'casos/' + f, d0: d, g: 'fase1', r12: d.resultado?.rent_12m_pct })),
  ...['2019', '2021', '2023'].flatMap(c => leer(path.join(B, 'casos2', c)).map(({ f, d }) => ({ k: c + '/' + f, d0: d, g: c,
    r12: d.resultado?.rent_12m_pct, r24: d.resultado?.rent_24m_pct, q24: d.resultado?.qqq_24m_pct ?? uni.qqq[c].r24 }))),
  ...leer(path.join(B, 'casos3')).map(({ f, d }) => ({ k: 'casos3/' + f, d0: d, g: 'casos3', r12: d.resultado.rent_12m_pct, r24: d.resultado.rent_24m_pct, q24: d.resultado.qqq_24m_pct })),
];
for (const k of [...Object.keys(PROD), ...Object.keys(DEC), ...DIL, ...DIL_OPV]) if (!crudos.some(x => x.k === k)) throw new Error('No existe el caso ' + k);
const casos = crudos.map(x => ({ ...x, d: conCampos(x.k, x.d0) }));
const ENT = ['fase1', '2019', '2021'], VAL = ['2023', 'casos3'];
const bate = x => (x.g === 'fase1' ? x.d.caso.tipo === 'ganadora' : x.r24 > x.q24);

const V13 = VERSIONES.v13;
const PROB = { producto: 70, decision: 30, probs: { bajista: 35, base: 50, alcista: 15 } };
const VARIANTES = {
  v13: V13,
  '1 probabilidades 35/50/15 automáticas': { ...V13, prob_auto: PROB, v14: true },
  '2 dilución esperada': { ...V13, dil_esperada: true, v14: true },
  '3 partida negativa': { ...V13, esc_neg: true, v14: true },
  '4 pagos: alerta': { ...V13, alerta_pagos: { caida: 10 }, v14: true },
  ...(VERSIONES.v14 ? { v14: VERSIONES.v14 } : {}),
};
const wilson = (k, n) => {
  if (!n) return '—';
  const z = 1.96, p = k / n, den = 1 + z * z / n, cen = (p + z * z / (2 * n)) / den, mar = (z * Math.sqrt(p * (1 - p) / n + z * z / (4 * n * n))) / den;
  return `${Math.round((cen - mar) * 100)}-${Math.round((cen + mar) * 100)}`;
};
const pct = (k, n) => (n ? Math.round(k / n * 100) + ' %' : '—');
const fmt = n => (n == null ? '—' : (n > 0 ? '+' : '') + String(Math.round(n * 10) / 10).replace('.', ','));
const correr = (cs, cfg) => cs.map(x => ({ ...x, c: calcular(structuredClone(x.d), cfg) }));
const res = Object.fromEntries(Object.entries(VARIANTES).map(([k, cfg]) => [k, correr(casos, cfg)]));
const grupo = (R, gs) => {
  const F = R.filter(x => gs.includes(x.g) && x.r24 != null), C = F.filter(x => x.c.senal === 'Comprar'), bt = C.filter(x => x.r24 > x.q24).length;
  const ex = C.length ? C.reduce((s, x) => s + x.r24 - x.q24, 0) / C.length : null;
  return `${C.length}/${F.length}, ${bt} baten (${pct(bt, C.length)}; ${wilson(bt, C.length)}; exceso ${fmt(ex)} pp)`;
};
const tabla = (R0, Rs) => {
  console.log('| Variante | Fase 1: ganadoras / fracasos con Comprar | Entrenamiento 2019-21 | Validación 2023 | Las 51 | Industriales (casos3) | Señales que cambian frente a v13 |\n|---|---|---|---|---|---|---|');
  for (const [k, R] of Object.entries(Rs)) {
    const f1 = R.filter(x => x.g === 'fase1'), tipo = t => f1.filter(x => x.d.caso.tipo === t);
    const cambian = R.filter((x, i) => x.c.senal !== R0[i].c.senal).length;
    console.log(`| ${k} | ${tipo('ganadora').filter(x => x.c.senal === 'Comprar').length}/${tipo('ganadora').length} y ${tipo('fracaso').filter(x => x.c.senal === 'Comprar').length}/${tipo('fracaso').length} | ${grupo(R, ['2019', '2021'])} | ${grupo(R, ['2023'])} | ${grupo(R, ['2019', '2021', '2023'])} | ${grupo(R, ['casos3'])} | ${R === R0 ? '—' : cambian} |`);
  }
};
const despues = x => (x.r24 != null ? `${fmt(x.r24)} % a 24 m (QQQ ${fmt(x.q24)} %)` : `${x.d.caso?.tipo}, ${fmt(x.d.resultado?.rent_36m_pct)} % a 36 m`);
const difs = (R0, R, k) => {
  for (const [i, x] of R.entries()) {
    const a = R0[i].c, b = x.c;
    if (a.senal !== b.senal || Math.abs(a.rent_ponderada_pct - b.rent_ponderada_pct) > 0.05 || a.puntuacion !== b.puntuacion || a.precio_max_compra !== b.precio_max_compra)
      console.log(`- [${k}] ${x.g} ${x.d.empresa}: ${a.senal} ${fmt(a.rent_ponderada_pct)} % (bajista ${fmt(a.casos.bajista.rent_pct)} %, ventas baj./alc. ${a.casos.bajista.ventas_m}/${a.casos.alcista.ventas_m}) → ${b.senal} ${fmt(b.rent_ponderada_pct)} % (bajista ${fmt(b.casos.bajista.rent_pct)} %, ventas baj./alc. ${b.casos.bajista.ventas_m}/${b.casos.alcista.ventas_m})${a.senal !== b.senal ? ' ←' : ''}; después: ${despues(x)}`);
  }
};

console.log('## Resultados por variante (v13 + una mejora)\n');
tabla(res.v13, res);
console.log('\nCasos con señal distinta de v13, o ponderada que se mueve > 0,05 puntos:');
for (const k of Object.keys(VARIANTES).filter(k => k !== 'v13')) difs(res.v13, res[k], k);

// Sensibilidad de la mejora 2 (no decide): esperada 5 % y salidas a bolsa sin nota
console.log('\n## Mejora 2: sensibilidad (no decide)\n');
for (const [nombre, dilSet, esp] of [['esperada 5 %', DIL, 5], ['más salidas a bolsa sin nota (3 %)', [...DIL, ...DIL_OPV], 3]]) {
  const cs = crudos.map(x => ({ ...x, d: conCampos(x.k, x.d0, dilSet, esp) }));
  const R0 = correr(cs, V13), R = correr(cs, VARIANTES['2 dilución esperada']);
  console.log(`### ${nombre}\n`); tabla(R0, { v13: R0, [nombre]: R }); difs(R0, R, nombre); console.log('');
}

// Pruebas del sesgo
console.log('## Pruebas del sesgo\n');
const incoh = R => R.filter(x => x.c.casos.bajista.ventas_m > x.c.casos.alcista.ventas_m);
console.log(`- Mejora 3: casos con ventas del bajista > alcista: v13 ${incoh(res.v13).length} (${incoh(res.v13).map(x => x.d.empresa + ' ' + x.d.fecha.slice(0, 7)).join(', ') || '—'}); con la mejora ${incoh(res['3 partida negativa']).length}. ` +
  `Casos con partida < 0: ${res.v13.filter(x => x.c.g1_pct < 0).map(x => `${x.d.empresa} ${x.d.fecha.slice(0, 7)} (${fmt(x.c.g1_pct)} %, ${x.c.senal}, ${bate(x) ? 'bate' : 'no bate'})`).join('; ') || '—'}`);
const m1 = res['1 probabilidades 35/50/15 automáticas'];
console.log(`- Mejora 1: casos marcados: ${m1.filter(x => x.c.prob_auto).map(x => `${x.d.empresa} ${x.d.fecha.slice(0, 7)} (${x.c.prob_auto}; ${res.v13[m1.indexOf(x)].c.senal} → ${x.c.senal}; ${bate(x) ? 'bate' : 'no bate'})`).join('; ') || 'ninguno'}. ` +
  `Por debajo del umbral (sensibilidad): ${Object.entries(PROD).filter(([, v]) => v <= 70).map(([k, v]) => { const x = res.v13.find(y => y.k === k); return `${x.d.empresa} ${x.d.fecha.slice(0, 4)} (${v} %; ${x.c.senal} con v13; ${bate(x) ? 'bate' : 'no bate'})`; }).join(', ')}`);
const m2 = res['2 dilución esperada'];
console.log(`- Mejora 2: casos con dilución esperada: ${m2.filter(x => x.d.finanzas.dilucion_esperada_pct != null).map(x => `${x.d.empresa} ${x.d.fecha.slice(0, 4)} (pasada ${x.d.finanzas.dilucion_anual_pct} → usada ${x.c.dilucion_usada_pct}; pista ${x.c.pista_meses}; ${res.v13[m2.indexOf(x)].c.senal} → ${x.c.senal}; ${bate(x) ? 'bate' : 'no bate'})`).join('; ')}`);

// ── Informes actuales ──
// Campos leídos de cada informe (cifra y línea en resultados-v14.md §3); los datos.json no se tocan.
const ORGANICO_V12 = { 'howmet-2026-10-14': 15, 'quanta-services-2026-10-14': 21, 'ge-vernova-2026-10-14': 13, 'comfort-systems-2026-10-14': 30.2, 'doordash-2026-10-14': 21, 'zscaler-2026-10-14': 17 };
const GUIA_RECORTADA = { 'alnylam-2026-10-14': true, 'hubspot-2026-10-14': true, 'insulet-2026-10-14': true };
const PROD_INF = { 'alnylam-2026-10-14': 78, 'argenx-2026-10-14': 95, 'ascendis-2026-10-14': 80, 'dexcom-2026-10-14': 100, 'insulet-2026-10-14': 100,
  'irhythm-2026-10-14': 100, 'madrigal-2026-10-14': 100, 'transmedics-2026-10-14': 100, 'vertex-2026-10-14': 75, 'eli-lilly-2026-10-14': 65, 'insmed-2026-10-14': 60, 'glaukos-2026-10-14': 40 };
const DEC_INF = { 'glaukos-2026-10-14': 40 };
const DIL_INF = { 'kratos-2026-10-14': 2, 'rocket-lab-2026-10-14': 3, 'celestica-2026-10-14': 0.5 };
const PAGOS_INF = { 'dlocal-2026-10-14': { mv: -32.7, bb12: 34.5, bbq: 29 }, 'remitly-2026-10-14': { mv: -2.1 }, 'wise-2026-10-14': { mv: -3.8 } };
const CARTERA = ['nu-holdings', 'axon', 'shopify', 'snowflake', 'samsara'];
const SUPLENTES = ['mongodb', 'toast', 'zscaler', 'dlocal', 'dexcom', 'datadog', 'argenx', 'natera', 'saab'];
const papel = e => (CARTERA.some(y => e.startsWith(y + '-')) ? 'cartera' : SUPLENTES.some(y => e.startsWith(y + '-')) ? 'suplente' : '');
const SUB6 = (() => { try { return Function('return ' + fs.readFileSync(path.join(raiz, 'herramientas/growth-backtest-v13.mjs'), 'utf8').match(/const SUB6_INF = (\{[\s\S]*?\});/)[1])(); } catch { return {}; } })();
const sub6De = (e, d) => {
  if (e in SUB6) return SUB6[e];
  if (d.tendencia?.subida_6m_pct != null) return d.tendencia.subida_6m_pct;
  const m = (d.tendencia?.senales?.fuerza_relativa_6m?.evidencia ?? '').match(/([+−-]\s?\d+(?:,\d+)?)\s?% en (?:6|seis) meses/);
  return m ? Number(m[1].replace('−', '-').replace(/\s/g, '').replace(',', '.')) : null;
};
console.log('\n## Informes actuales (v13 frente a cada variante; solo los que cambian)\n');
const dir = path.join(raiz, 'informes-growth');
const filas = [];
for (const e of fs.readdirSync(dir).filter(y => fs.existsSync(path.join(dir, y, 'datos.json'))).sort()) {
  let d0;
  try { d0 = JSON.parse(fs.readFileSync(path.join(dir, e, 'datos.json'), 'utf8')); } catch { console.log(`- ${e}: datos.json ilegible ahora (otra sesión escribiendo); se salta`); continue; }
  const crec = { ...d0.crecimiento };
  if (crec.crecimiento_actual_organico_pct == null && ORGANICO_V12[e] != null) crec.crecimiento_actual_organico_pct = ORGANICO_V12[e];
  if (GUIA_RECORTADA[e] != null && crec.guia_recortada == null) crec.guia_recortada = GUIA_RECORTADA[e];
  if (PAGOS_INF[e]?.bb12 != null) { crec.beneficio_bruto_12m_pct = PAGOS_INF[e].bb12; crec.beneficio_bruto_trimestre_pct = PAGOS_INF[e].bbq; }
  const merc = { ...d0.mercado };
  if (PROD_INF[e] != null && merc.peso_primer_producto_pct == null) merc.peso_primer_producto_pct = PROD_INF[e];
  if (PAGOS_INF[e] && merc.margen_volumen_cambio_pct == null) merc.margen_volumen_cambio_pct = PAGOS_INF[e].mv;
  const d = { ...d0, crecimiento: crec, mercado: merc, tendencia: { ...d0.tendencia, subida_6m_pct: d0.tendencia?.subida_6m_pct ?? sub6De(e, d0) } };
  if (DEC_INF[e] != null && d.riesgos?.decision_pendiente_pct == null) d.riesgos = { ...d.riesgos, decision_pendiente_pct: DEC_INF[e] };
  if (DIL_INF[e] != null && d.finanzas?.dilucion_esperada_pct == null) d.finanzas = { ...d.finanzas, dilucion_esperada_pct: DIL_INF[e] };
  const a = calcular(structuredClone(d), V13);
  const fila = { e, papel: papel(e), d, a, b: {} };
  for (const k of Object.keys(VARIANTES).filter(k => k !== 'v13')) {
    const b = calcular(structuredClone(d), VARIANTES[k]);
    fila.b[k] = b;
    const nuevas = (b.alertas ?? []).filter(y => !(a.alertas ?? []).includes(y));
    if (a.senal !== b.senal || Math.abs(a.rent_ponderada_pct - b.rent_ponderada_pct) > 0.05 || a.precio_max_compra !== b.precio_max_compra || nuevas.length)
      console.log(`- [${k}] ${d.empresa}${fila.papel ? ' (' + fila.papel + ')' : ''}: ${a.senal} ${fmt(a.rent_ponderada_pct)} % (bajista ${fmt(a.casos.bajista.rent_pct)} %, ventas baj./alc. ${a.casos.bajista.ventas_m}/${a.casos.alcista.ventas_m}, compra hasta ${a.precio_max_compra}) → ${b.senal} ${fmt(b.rent_ponderada_pct)} % (bajista ${fmt(b.casos.bajista.rent_pct)} %, ventas baj./alc. ${b.casos.bajista.ventas_m}/${b.casos.alcista.ventas_m}, compra hasta ${b.precio_max_compra})${a.senal !== b.senal ? ' ←' : ''}${nuevas.length ? ' · alerta: ' + nuevas.join(' / ') : ''}`);
  }
  filas.push(fila);
}
console.log(`\nInformes con ventas del bajista > alcista: v13 ${filas.filter(x => x.a.casos.bajista.ventas_m > x.a.casos.alcista.ventas_m).map(x => x.d.empresa).join(', ') || '—'}; con la mejora 3: ${filas.filter(x => x.b['3 partida negativa'].casos.bajista.ventas_m > x.b['3 partida negativa'].casos.alcista.ventas_m).map(x => x.d.empresa).join(', ') || '—'}`);
console.log(`Informes con la condición de la mejora 1: ${filas.filter(x => x.b['1 probabilidades 35/50/15 automáticas'].prob_auto).map(x => `${x.d.empresa} (${x.b['1 probabilidades 35/50/15 automáticas'].prob_auto}; analista ${Object.values(x.d.valoracion.probabilidades ?? { a: 25, b: 50, c: 25 }).join('/')}${x.b['1 probabilidades 35/50/15 automáticas'].prob_auto_cambia ? ', cambia' : ', ya prudente'})`).join('; ')}`);
const fin = VERSIONES.v14 ? 'v14' : null;
console.log(`\n## Cartera y suplentes: v13 → cada variante${fin ? ' y v14' : ''}\n\n| Empresa | Papel | v13 | ${Object.keys(VARIANTES).filter(k => k !== 'v13').join(' | ')} |\n|---|---|---|${Object.keys(VARIANTES).filter(k => k !== 'v13').map(() => '---').join('|')}|`);
const corto = c => `${c.senal}, ${fmt(c.rent_ponderada_pct)} %, hasta ${c.precio_max_compra}`;
for (const x of filas.filter(x => x.papel)) console.log(`| ${x.d.empresa} | ${x.papel} | ${corto(x.a)} | ${Object.keys(VARIANTES).filter(k => k !== 'v13').map(k => corto(x.b[k])).join(' | ')} |`);
