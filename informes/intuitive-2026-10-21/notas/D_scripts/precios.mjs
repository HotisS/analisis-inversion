// Cierres del 6-oct y del 20-oct-2026 de los comparables (Yahoo, chart API) y preapertura/fuera de horas de ISRG.
// NODE_USE_ENV_PROXY=1 node informes/intuitive-2026-10-21/notas/D_scripts/precios.mjs
import { writeFileSync } from 'node:fs';
const UA = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36' };
const T = ['SYK', 'BSX', 'MDT', 'ABT', 'EW', 'DXCM', 'PODD', 'IDXX', 'RMD', 'ZBH', 'ISRG', 'SPY', 'IHI'];
const out = {};
const dia = (ts) => new Date(ts * 1000).toISOString().slice(0, 10);
for (const t of T) {
  const u = `https://query1.finance.yahoo.com/v8/finance/chart/${t}?period1=${Date.parse('2026-09-25') / 1000}&period2=${Date.parse('2026-10-22') / 1000}&interval=1d`;
  const r = await fetch(u, { headers: UA });
  const j = await r.json();
  const res = j.chart.result[0];
  const c = res.indicators.quote[0].close;
  const serie = Object.fromEntries(res.timestamp.map((ts, i) => [dia(ts), c[i] == null ? null : Math.round(c[i] * 100) / 100]));
  out[t] = { serie, meta: { regularMarketPrice: res.meta.regularMarketPrice, regularMarketTime: res.meta.regularMarketTime && new Date(res.meta.regularMarketTime * 1000).toISOString() } };
}
// ISRG intradía con pre y post mercado (20 y 21-oct)
const u2 = `https://query1.finance.yahoo.com/v8/finance/chart/ISRG?period1=${Date.parse('2026-10-20T19:00:00Z') / 1000}&period2=${Math.floor(Date.now() / 1000)}&interval=5m&includePrePost=true`;
const r2 = await fetch(u2, { headers: UA });
const j2 = await r2.json();
const R = j2.chart.result[0];
const q = R.indicators.quote[0];
out.ISRG_intradia = R.timestamp.map((ts, i) => [new Date(ts * 1000).toISOString().slice(0, 16), q.close[i] == null ? null : Math.round(q.close[i] * 100) / 100, q.volume[i]]).filter((x) => x[1] != null);
out.ISRG_meta = R.meta;
writeFileSync('informes/intuitive-2026-10-21/notas/D_scripts/precios.json', JSON.stringify(out, null, 1));
for (const t of T) console.log(t, out[t].serie['2026-10-06'], out[t].serie['2026-10-20'], out[t].serie['2026-10-21'] ?? '', out[t].meta.regularMarketPrice, out[t].meta.regularMarketTime);
console.log('intradía ISRG (cada 6.º punto):');
out.ISRG_intradia.filter((_, i) => i % 6 === 0).forEach((x) => console.log(x.join(' ')));
console.log(JSON.stringify(R.meta.currentTradingPeriod));
