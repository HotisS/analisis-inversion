// Cierres de Yahoo a 2026-10-09 para los comparables (uso: node D_precios.mjs)
const tickers = process.argv.slice(2).length ? process.argv.slice(2) : ['002252.SZ','CSL.AX','4502.T','ADMA','002007.SZ','600161.SS','KMDA','BIO3.DE','GRF-P.MC','GRFS','GRF.MC','BIO.DE'];
for (const t of tickers) {
  try {
    const r = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(t)}?period1=1790812800&period2=1791676800&interval=1d`, { headers: { 'User-Agent': 'Mozilla/5.0 analisis-inversion' } });
    const j = await r.json();
    const res = j.chart.result[0];
    const ts = res.timestamp || [];
    const c = res.indicators.quote[0].close;
    const out = ts.map((x, i) => [new Date(x * 1000).toISOString().slice(0, 10), c[i] && +c[i].toFixed(3)]).slice(-4);
    console.log(t, res.meta.currency, JSON.stringify(out));
  } catch (e) { console.log(t, 'ERROR', e.message); }
}
