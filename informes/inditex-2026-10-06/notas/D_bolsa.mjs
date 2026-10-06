// Estadísticas de bolsa de Inditex (ITX.MC) a partir de los históricos diarios de Yahoo (docs/D_yahoo_*.json, descargados el 6-oct-2026 tras el cierre).
// Corte: último cierre <= 2026-10-06. Precio = 'close' (ajustado a splits, sin dividendos); total = 'adjclose' (reinvierte dividendos).
import { readFileSync, writeFileSync } from 'node:fs';
const CORTE = '2026-10-06';
const load = s => { const r = JSON.parse(readFileSync(new URL(`./docs/D_yahoo_${s}.json`, import.meta.url))).chart.result[0];
  const q = r.indicators.quote[0], adj = r.indicators.adjclose?.[0]?.adjclose || q.close;
  return r.timestamp.map((t, i) => ({ d: new Date((t + r.meta.gmtoffset) * 1000).toISOString().slice(0, 10), c: q.close[i], a: adj[i], h: q.high[i], l: q.low[i], v: q.volume[i] })).filter(x => x.c != null && x.d <= CORTE); };
const S = { ITX: load('ITX_MC'), IBEX: load('IBEX'), SX5E: load('STOXX50E'), RETAIL: load('EXH8_DE'), IBEXETF: load('LYXIB_MC') };
const at = (arr, d) => { let o = null; for (const x of arr) { if (x.d <= d) o = x; else break; } return o; };
const f = (x, d = 1) => Math.round(x * 10 ** d) / 10 ** d;
const last = s => S[s][S[s].length - 1];
const out = { ultimo: Object.fromEntries(Object.keys(S).map(k => [k, last(k).d + ' ' + last(k).c])) };
const per = { 'En el año': ['2025-12-31', 0], '1 año': ['2025-10-06', 1], '3 años (anual.)': ['2023-10-06', 3], '5 años (anual.)': ['2021-10-06', 5], '10 años (anual.)': ['2016-10-06', 10] };
out.rentabilidades = {};
for (const k of ['c', 'a']) for (const [n, [d, y]] of Object.entries(per)) {
  const row = {}; for (const s in S) { const a = at(S[s], d), b = last(s); let r = b[k] / a[k] - 1; if (y > 1) r = Math.pow(1 + r, 1 / y) - 1; row[s] = f(r * 100); row[s + '_desde'] = a.d; }
  out.rentabilidades[(k === 'c' ? 'precio ' : 'total ') + n] = row;
}
out.anual = {};
for (let y = 2016; y <= 2025; y++) { const row = {}; for (const s in S) for (const k of ['c', 'a']) { const a = at(S[s], `${y - 1}-12-31`), b = at(S[s], `${y}-12-31`); row[s + '_' + k] = f((b[k] / a[k] - 1) * 100); } out.anual[y] = row; }
// beta mensual 5 años (oct-2021 a sep-2026, 60 meses; cierres de fin de mes)
const monthly = arr => { const m = {}; for (const x of arr) m[x.d.slice(0, 7)] = x; return Object.entries(m).sort(); };
function beta(stock, idx, from, to, k = 'c') { const ms = monthly(S[stock]), mi = Object.fromEntries(monthly(S[idx])); const xs = [], ys = [];
  for (let i = 1; i < ms.length; i++) { const [m, v] = ms[i], [m0, v0] = ms[i - 1]; if (m <= from || m > to) continue; if (!mi[m] || !mi[m0]) continue; ys.push(v[k] / v0[k] - 1); xs.push(mi[m][k] / mi[m0][k] - 1); }
  const n = xs.length, mx = xs.reduce((s, x) => s + x, 0) / n, my = ys.reduce((s, x) => s + x, 0) / n;
  let cov = 0, vx = 0, vy = 0; for (let i = 0; i < n; i++) { cov += (xs[i] - mx) * (ys[i] - my); vx += (xs[i] - mx) ** 2; vy += (ys[i] - my) ** 2; }
  return { beta: f(cov / vx, 2), r2: f(cov * cov / vx / vy, 2), meses: n, ajustada_blume: f(0.67 * cov / vx + 0.33, 2) }; }
out.beta = { ibex_precio_5a: beta('ITX', 'IBEX', '2021-09', '2026-09'), ibex_total_etf_5a: beta('ITX', 'IBEXETF', '2021-09', '2026-09', 'a'), sx5e_precio_5a: beta('ITX', 'SX5E', '2021-09', '2026-09'), retail_5a: beta('ITX', 'RETAIL', '2021-09', '2026-09'), ibex_precio_2a: beta('ITX', 'IBEX', '2024-09', '2026-09') };
// volatilidad 1 año (diaria, log, x raiz 252)
const o = S.ITX, i0 = o.findIndex(x => x.d > '2025-10-06'); const rs = []; for (let i = i0; i < o.length; i++) rs.push(Math.log(o[i].c / o[i - 1].c));
const m = rs.reduce((s, x) => s + x, 0) / rs.length; const sd = Math.sqrt(rs.reduce((s, x) => s + (x - m) ** 2, 0) / (rs.length - 1));
out.volatilidad_1a = { pct: f(sd * Math.sqrt(252) * 100), sesiones: rs.length };
// caída máxima 5 años (cierres de precio y total)
for (const k of ['c', 'a']) { const w = o.filter(x => x.d >= '2021-10-06'); let pk = w[0], dd = 0, p = null; for (const x of w) { if (x[k] > pk[k]) pk = x; const d = x[k] / pk[k] - 1; if (d < dd) { dd = d; p = [pk.d, f(pk[k], 2), x.d, f(x[k], 2)]; } } out['max_drawdown_5a_' + k] = { pct: f(dd * 100), tramo: p }; }
// 52 semanas
const w = o.filter(x => x.d > '2025-10-06'); const hi = w.reduce((a, x) => x.h > a.h ? x : a), lo = w.reduce((a, x) => x.l < a.l ? x : a);
const wc = w.reduce((a, x) => x.c > a.c ? x : a), lc = w.reduce((a, x) => x.c < a.c ? x : a);
out.s52 = { intradia_max: [hi.d, f(hi.h, 2)], intradia_min: [lo.d, f(lo.l, 2)], cierre_max: [wc.d, f(wc.c, 2)], cierre_min: [lc.d, f(lc.c, 2)] };
// volumen medio 3 meses (Bolsa de Madrid/SIBE según Yahoo; no incluye otras plataformas)
const t3 = o.filter(x => x.d > '2026-07-06'); out.volumen_3m = { acciones_dia: Math.round(t3.reduce((s, x) => s + x.v, 0) / t3.length), meur_dia: f(t3.reduce((s, x) => s + x.v * x.c, 0) / t3.length / 1e6), sesiones: t3.length, desde: t3[0].d };
// precio de cierre de cada ejercicio (31-ene del año siguiente, o último hábil anterior)
out.cierres_ejercicio = {}; for (let y = 2015; y <= 2025; y++) { const x = at(o, `${y + 1}-01-31`); out.cierres_ejercicio['FY' + y] = [x.d, f(x.c, 2)]; }
writeFileSync(new URL('./D_bolsa.json', import.meta.url), JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));
