#!/usr/bin/env node
// Backtest del mínimo de «rentabilidad frente a caída» en growth (verticales/growth/backtest/protocolo-caida.md).
//   NODE_USE_ENV_PROXY=1 node herramientas/growth-backtest-caida.mjs --descargar   → baja de Yahoo las caídas (históricas y sufridas)
//                                                                                     y las guarda en backtest/caida-datos.json
//   node herramientas/growth-backtest-caida.mjs                                     → tablas del protocolo (no escribe nada)
import fs from 'node:fs';
import path from 'node:path';
import { calcular, VERSIONES, VIGENTE } from '../motor/growth.mjs';

const raiz = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const B = path.join(raiz, 'verticales/growth/backtest');
const DATOS = path.join(B, 'caida-datos.json');
const uni = JSON.parse(fs.readFileSync(path.join(B, 'universo.json'), 'utf8'));
const leer = d => fs.readdirSync(d).filter(f => f.endsWith('.json') && !f.startsWith('caida')).sort().map(f => ({ f, d: JSON.parse(fs.readFileSync(path.join(d, f), 'utf8')) }));
const casos = [
  ...leer(path.join(B, 'casos')).map(({ f, d }) => ({ k: 'casos/' + f, d, g: 'fase1' })),
  ...['2019', '2021', '2023'].flatMap(c => leer(path.join(B, 'casos2', c)).map(({ f, d }) => ({ k: c + '/' + f, d, g: c,
    r24: d.resultado?.rent_24m_pct, q24: d.resultado?.qqq_24m_pct ?? uni.qqq[c].r24 }))),
  ...leer(path.join(B, 'casos3')).map(({ f, d }) => ({ k: 'casos3/' + f, d, g: 'casos3', r24: d.resultado.rent_24m_pct, q24: d.resultado.qqq_24m_pct })),
];
// Símbolos de Yahoo que no son el ticker del caso (cambios de nombre)
const SIMB = { SQ: 'XYZ', TCEHY: '0700.HK', TWOU: 'TWOUQ', NVTA: 'NVTAQ' };

if (process.argv.includes('--descargar')) {
  const salida = {};
  const dia = s => Math.floor(Date.parse(s + 'T00:00:00Z') / 1000);
  for (const x of casos) {
    const sim = x.d.simbolo_yahoo ?? SIMB[x.d.ticker] ?? x.d.ticker;
    const t0 = dia(x.d.fecha), ini = t0 - 3 * 365.25 * 86400, fin = t0 + 365.25 * 86400 + 86400 * 3;
    try {
      const r = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(sim)}?period1=${Math.round(ini)}&period2=${Math.round(fin)}&interval=1d&events=split`,
        { headers: { 'User-Agent': 'Mozilla/5.0' } });
      const j = await r.json(), res = j.chart?.result?.[0];
      if (!res?.timestamp) throw new Error(j.chart?.error?.description || 'sin datos');
      const ts = res.timestamp, c = res.indicators.adjclose?.[0]?.adjclose ?? res.indicators.quote[0].close;
      const serie = ts.map((t, i) => [t, c[i]]).filter(([, v]) => v > 0);
      const antes = serie.filter(([t]) => t <= t0 + 86400), despues = serie.filter(([t]) => t > t0 + 86400 && t <= t0 + 365.25 * 86400 + 86400);
      if (!antes.length) throw new Error('sin precio a la fecha');
      const entrada = antes.at(-1)[1];
      // caída máxima histórica: cierres semanales (uno de cada 5 sesiones, desde el final) de los 3 años anteriores
      const sem = antes.filter((_, i) => (antes.length - 1 - i) % 5 === 0);
      const anios = (antes.at(-1)[0] - antes[0][0]) / (365.25 * 86400);
      let pico = 0, mdd = 0;
      for (const [, v] of sem) { pico = Math.max(pico, v); mdd = Math.min(mdd, v / pico - 1); }
      const peor = despues.length ? Math.min(...despues.map(([, v]) => v)) : null;
      const completo = despues.length && (despues.at(-1)[0] - t0) > 330 * 86400;
      salida[x.k] = { simbolo: sim, fecha_entrada_yahoo: new Date(antes.at(-1)[0] * 1000).toISOString().slice(0, 10), anios_historia: Math.round(anios * 10) / 10,
        caida_hist_3a_pct: anios >= 1 ? Math.round(mdd * 1000) / 10 : null,
        caida_sufrida_12m_pct: peor != null ? Math.round(Math.min(0, peor / entrada - 1) * 1000) / 10 : null, ventana_12m_completa: !!completo };
    } catch (e) { salida[x.k] = { simbolo: sim, error: String(e.message || e) }; }
    console.log(x.k, JSON.stringify(salida[x.k]));
    await new Promise(r => setTimeout(r, 400));
  }
  fs.writeFileSync(DATOS, JSON.stringify({ fecha: new Date().toISOString(), fuente: 'Yahoo chart v8, cierres diarios ajustados', casos: salida }, null, 1) + '\n');
  process.exit(0);
}

// ── Análisis (protocolo-caida.md §4-§6) ──
const Y = JSON.parse(fs.readFileSync(DATOS, 'utf8')).casos;
const V = VERSIONES[VIGENTE];
const filas = casos.map(x => {
  const c = calcular(structuredClone(x.d), V), y = Y[x.k] ?? {};
  const pond = c.rent_ponderada_pct, baj = -c.casos.bajista.rent_pct, hist = y.caida_hist_3a_pct != null ? -y.caida_hist_3a_pct : null;
  const div = (a, b) => (b > 0 ? a / b : null);
  return { ...x, c, pond, senal: c.senal, baj, hist, peor: hist != null ? Math.max(baj, hist) : null,
    R: { bajista: div(pond, baj), historica: div(pond, hist), peor: hist != null ? div(pond, Math.max(baj, hist)) : null },
    sufrida: y.caida_sufrida_12m_pct != null ? -y.caida_sufrida_12m_pct : null, exceso: x.r24 != null ? x.r24 - x.q24 : null, y };
});
const MED = ['bajista', 'historica', 'peor'];
const rangos = a => { const o = a.map((v, i) => [v, i]).sort((p, q) => p[0] - q[0]), r = Array(a.length); for (let i = 0; i < o.length;) { let j = i; while (j + 1 < o.length && o[j + 1][0] === o[i][0]) j++; for (let k = i; k <= j; k++) r[o[k][1]] = (i + j) / 2 + 1; i = j + 1; } return r; };
const spearman = (a, b) => { const n = a.length; if (n < 4) return null; const ra = rangos(a), rb = rangos(b), ma = (n + 1) / 2; let s = 0, sa = 0, sb = 0; for (let i = 0; i < n; i++) { s += (ra[i] - ma) * (rb[i] - ma); sa += (ra[i] - ma) ** 2; sb += (rb[i] - ma) ** 2; } return s / Math.sqrt(sa * sb); };
const wilson = (k, n) => { if (!n) return '—'; const z = 1.96, p = k / n, den = 1 + z * z / n, cen = (p + z * z / (2 * n)) / den, mar = (z * Math.sqrt(p * (1 - p) / n + z * z / (4 * n * n))) / den; return `${Math.round((cen - mar) * 100)}-${Math.round((cen + mar) * 100)}`; };
const f = (n, d = 1) => (n == null || !Number.isFinite(n) ? '—' : n.toLocaleString('es-ES', { minimumFractionDigits: d, maximumFractionDigits: d }));
const med = a => { if (!a.length) return null; const s = [...a].sort((p, q) => p - q), m = s.length >> 1; return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };
const media = a => (a.length ? a.reduce((s, v) => s + v, 0) / a.length : null);
const GR = { entrenamiento: ['2019', '2021'], 'validación': ['2023', 'casos3'], 'las 64 neutrales': ['2019', '2021', '2023', 'casos3'], 'fase 1 (información)': ['fase1'] };
const sel = gs => filas.filter(x => gs.includes(x.g));

console.log(`Método ${VIGENTE}. Casos sin datos de Yahoo: ${filas.filter(x => x.y.error || x.hist == null).map(x => `${x.k} (${x.y.error ?? `historia ${x.y.anios_historia} años`})`).join('; ') || 'ninguno'}.\n`);
console.log('## 1. Elección de la medida (Spearman)\n\n| Grupo | Medida | n | R frente a exceso 24 m | R frente a caída sufrida (− = más R, menos caída) | Caída candidata frente a caída sufrida |\n|---|---|---|---|---|---|');
for (const [n, gs] of Object.entries(GR)) for (const m of MED) {
  const F = sel(gs).filter(x => x.R[m] != null && x.exceso != null), G = sel(gs).filter(x => x.R[m] != null && x.sufrida != null);
  const cand = { bajista: 'baj', historica: 'hist', peor: 'peor' }[m];
  console.log(`| ${n} | ${m} | ${F.length} | ${f(spearman(F.map(x => x.R[m]), F.map(x => x.exceso)), 2)} | ${f(spearman(G.map(x => x.R[m]), G.map(x => x.sufrida)), 2)} | ${f(spearman(G.map(x => x[cand]), G.map(x => x.sufrida)), 2)} |`);
}
// También la rentabilidad sola (contraste: ¿añade algo dividir por la caída?)
for (const [n, gs] of Object.entries(GR)) { const F = sel(gs).filter(x => x.exceso != null); console.log(`| ${n} | (solo la rentabilidad ponderada) | ${F.length} | ${f(spearman(F.map(x => x.pond), F.map(x => x.exceso)), 2)} | | |`); }

const REJ = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2];
const tablaMin = (m, gs, extra = () => true) => {
  const T = sel(gs).filter(x => x.R[m] != null && extra(x));
  const linea = (C, nom) => { const cx = C.filter(x => x.exceso != null), bt = cx.filter(x => x.exceso > 0).length; const cs = C.filter(x => x.sufrida != null).map(x => x.sufrida);
    return `${nom}: ${C.length} casos, baten ${bt}/${cx.length} (${cx.length ? Math.round(bt / cx.length * 100) : '—'} %; ${wilson(bt, cx.length)}), exceso medio ${f(media(cx.map(x => x.exceso)), 0)} pp, caída sufrida media ${f(media(cs), 0)} % (mediana ${f(med(cs), 0)} %)`; };
  console.log(`| todos | ${linea(T, 'todos')} |`);
  for (const u of REJ) console.log(`| R ≥ ${f(u, 2)} | ${linea(T.filter(x => x.R[m] >= u), 'pasan')} · ${linea(T.filter(x => x.R[m] < u), 'no pasan')} |`);
};
for (const m of MED) for (const [n, gs] of Object.entries(GR)) {
  console.log(`\n## Mínimo, medida «${m}», ${n}\n\n| Mínimo | Resultado |\n|---|---|`);
  tablaMin(m, gs);
}
console.log('\n## Casos (las 64 neutrales y la fase 1)\n\n| Caso | Señal v11 | Ponderada | Bajista | Caída hist. 3 a | R bajista | R hist. | R peor | Caída sufrida 12 m | Exceso 24 m |\n|---|---|---|---|---|---|---|---|---|---|');
for (const x of [...filas].sort((p, q) => (q.R.bajista ?? -99) - (p.R.bajista ?? -99)))
  console.log(`| ${x.k} | ${x.senal} | ${f(x.pond)} | −${f(x.baj)} | ${x.hist != null ? '−' + f(x.hist) : '—'} | ${f(x.R.bajista, 2)} | ${f(x.R.historica, 2)} | ${f(x.R.peor, 2)} | ${x.sufrida != null ? '−' + f(x.sufrida) : '—'} | ${x.exceso != null ? f(x.exceso, 0) : x.d.caso?.tipo} |`);
