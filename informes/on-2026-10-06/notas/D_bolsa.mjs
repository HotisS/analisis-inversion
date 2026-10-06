// Estadísticas de bolsa de ONON a partir de los históricos diarios de Yahoo (docs/D_yahoo_*.json). Corte: último cierre <= 2026-10-05.
import { readFileSync } from 'node:fs';
const CORTE = '2026-10-05';
const load = s => { const r = JSON.parse(readFileSync(new URL(`./docs/D_yahoo_${s}.json`, import.meta.url))).chart.result[0];
  const q = r.indicators.quote[0], adj = r.indicators.adjclose?.[0]?.adjclose || q.close;
  return r.timestamp.map((t, i) => ({ d: new Date((t + r.meta.gmtoffset) * 1000).toISOString().slice(0, 10), c: q.close[i], a: adj[i], h: q.high[i], l: q.low[i], v: q.volume[i] })).filter(x => x.c != null && x.d <= CORTE); };
const S = { ONON: load('ONON'), SPY: load('SPY'), GSPC: load('GSPC'), XLY: load('XLY'), RUI: load('RUI') };
const at = (arr, d) => { let o = null; for (const x of arr) { if (x.d <= d) o = x; else break; } return o; };
const r1 = (a, b, k = 'a') => (b[k] / a[k] - 1) * 100;
const f = x => Math.round(x * 100) / 100;
const last = s => S[s][S[s].length - 1];
console.log('Último dato', Object.fromEntries(Object.keys(S).map(k => [k, last(k).d + ' ' + last(k).c])));
const per = { 'En el año': '2025-12-31', '1 año': '2025-10-05', '3 años': '2023-10-05' };
for (const [n, d] of Object.entries(per)) {
  const row = {}; for (const s in S) { const a = at(S[s], d), b = last(s); let r = r1(a, b); if (n === '3 años') r = (Math.pow(1 + r / 100, 1 / 3) - 1) * 100; row[s] = f(r) + ` (desde ${a.d})`; }
  console.log(n, row);
}
// desde la primera cotización
for (const s in S) { const a = at(S[s], '2021-09-15'), b = last(s); const yrs = (new Date(b.d) - new Date(a.d)) / 31557600000; const r = r1(a, b); console.log('Desde OPV', s, a.d, a.c, f(r), 'anual', f((Math.pow(1 + r / 100, 1 / yrs) - 1) * 100), 'años', f(yrs)); }
// anual
for (const y of [2021, 2022, 2023, 2024, 2025]) { const row = {}; for (const s in S) { const a = y === 2021 ? at(S[s], '2021-09-15') : at(S[s], `${y - 1}-12-31`), b = at(S[s], `${y}-12-31`); row[s] = `${f(r1(a, b))} [${a.d} ${f(a.c)} -> ${b.d} ${f(b.c)}]`; } console.log(y, row); }
// beta mensual desde la OPV frente a S&P 500 (precio) y SPY (total)
const monthly = arr => { const m = {}; for (const x of arr) m[x.d.slice(0, 7)] = x; return Object.entries(m).sort(); };
function beta(stock, idx, from) { const ms = monthly(S[stock]), mi = Object.fromEntries(monthly(S[idx])); const xs = [], ys = [];
  for (let i = 1; i < ms.length; i++) { const [k, v] = ms[i], [k0, v0] = ms[i - 1]; if (k0 < from) continue; if (!mi[k] || !mi[k0]) continue; ys.push(v.a / v0.a - 1); xs.push(mi[k].a / mi[k0].a - 1); }
  const mx = xs.reduce((s, x) => s + x, 0) / xs.length, my = ys.reduce((s, x) => s + x, 0) / ys.length;
  let cov = 0, vx = 0; for (let i = 0; i < xs.length; i++) { cov += (xs[i] - mx) * (ys[i] - my); vx += (xs[i] - mx) ** 2; } return [f(cov / vx), xs.length]; }
console.log('Beta mensual desde 2021-10 vs GSPC', beta('ONON', 'GSPC', '2021-09'), 'vs SPY', beta('ONON', 'SPY', '2021-09'), '3 años vs GSPC', beta('ONON', 'GSPC', '2023-09'));
// volatilidad 1 año
const o = S.ONON, i0 = o.findIndex(x => x.d > '2025-10-05'); const rs = []; for (let i = i0; i < o.length; i++) rs.push(Math.log(o[i].c / o[i - 1].c));
const m = rs.reduce((s, x) => s + x, 0) / rs.length; const sd = Math.sqrt(rs.reduce((s, x) => s + (x - m) ** 2, 0) / (rs.length - 1)); console.log('Volatilidad 1 año', f(sd * Math.sqrt(252) * 100), 'n', rs.length);
// max drawdown desde la OPV (cierres)
let pk = o[0], dd = 0, ddp = null; for (const x of o) { if (x.c > pk.c) pk = x; const d = x.c / pk.c - 1; if (d < dd) { dd = d; ddp = [pk.d, pk.c, x.d, x.c]; } } console.log('Max drawdown', f(dd * 100), ddp);
// 52 semanas
const w = o.filter(x => x.d > '2025-10-05'); const hi = w.reduce((a, x) => x.h > a.h ? x : a), lo = w.reduce((a, x) => x.l < a.l ? x : a);
const wc = w.reduce((a, x) => x.c > a.c ? x : a), lc = w.reduce((a, x) => x.c < a.c ? x : a);
console.log('52s intradía máx', hi.d, f(hi.h), 'mín', lo.d, f(lo.l), '| cierres máx', wc.d, wc.c, 'mín', lc.d, lc.c);
// volumen medio 3 meses
const t3 = o.filter(x => x.d > '2026-07-05'); const vol = t3.reduce((s, x) => s + x.v, 0) / t3.length, usd = t3.reduce((s, x) => s + x.v * x.c, 0) / t3.length;
console.log('Volumen medio 3m', Math.round(vol), 'acciones/día;', f(usd / 1e6), 'M USD/día; sesiones', t3.length, t3[0].d);
