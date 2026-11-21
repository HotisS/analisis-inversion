// Nota D: cierres de los comparables el 27-oct y el 20-nov-2026 (Yahoo Finance, históricos diarios).
const tick = ['HRB', 'PAYX', 'PAYC', 'BILL', 'XYZ', 'TOST', 'SHOP', 'FRSH', 'ADBE', 'INTU'];
const p1 = Math.floor(Date.parse('2026-10-20T00:00:00Z') / 1000), p2 = Math.floor(Date.parse('2026-11-22T00:00:00Z') / 1000);
const out = {};
for (const t of tick) {
  const r = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${t}?period1=${p1}&period2=${p2}&interval=1d`, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } });
  const j = await r.json(); const x = j.chart.result[0];
  const filas = x.timestamp.map((s, i) => [new Date((s + x.meta.gmtoffset) * 1000).toISOString().slice(0, 10), x.indicators.quote[0].close[i]]);
  const f = (d) => filas.find((r) => r[0] === d)?.[1];
  out[t] = { c27oct: f('2026-10-27'), c20nov: f('2026-11-20'), ultima: filas.at(-1), var_pct: +((f('2026-11-20') / f('2026-10-27') - 1) * 100).toFixed(1) };
}
console.log(JSON.stringify(out, null, 1));
