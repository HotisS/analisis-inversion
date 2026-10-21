// Datos de mercado de los comparables de Philip Morris (Yahoo quoteSummary) y tipos de cambio, 20-oct-2026.
// Ejecutar: NODE_USE_ENV_PROXY=1 node informes/philip-morris-2026-10-20/notas/comparables-yahoo.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { json } from '../../../herramientas/yahoo.mjs';
const dir = path.dirname(fileURLToPath(import.meta.url));
const v = (o) => (o && typeof o === 'object' ? o.raw ?? null : o ?? null);
const out = { fecha: new Date().toISOString(), fx: {}, datos: {} };
for (const p of ['GBPUSD=X', 'JPY=X', 'KRW=X', 'INR=X', 'DKK=X']) {
  const r = await json(`https://query2.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(p)}?range=5d&interval=1d`);
  const q = r.chart.result[0]; const c = q.indicators.quote[0].close; const t = q.timestamp;
  out.fx[p] = t.map((x, i) => [new Date(x * 1000).toISOString().slice(0, 10), c[i]]);
}
for (const t of ['PM', 'MO', 'BATS.L', 'IMB.L', '2914.T', '033780.KS', 'ITC.NS', 'TPB', 'STG.CO']) {
  const r = await json(`https://query2.finance.yahoo.com/v10/finance/quoteSummary/${encodeURIComponent(t)}?modules=financialData,defaultKeyStatistics,price,summaryDetail`);
  const q = r.quoteSummary.result[0];
  out.datos[t] = { divisa: q.price?.currency, divisa_fin: q.financialData?.financialCurrency, cap: v(q.price?.marketCap), ev: v(q.defaultKeyStatistics?.enterpriseValue), ebitda: v(q.financialData?.ebitda), ventas: v(q.financialData?.totalRevenue),
    fcf: v(q.financialData?.freeCashflow), deuda: v(q.financialData?.totalDebt), caja: v(q.financialData?.totalCash), margen_ebitda: v(q.financialData?.ebitdaMargins), roa: v(q.financialData?.returnOnAssets), roe: v(q.financialData?.returnOnEquity), per_ltm: v(q.summaryDetail?.trailingPE), per_fwd: v(q.summaryDetail?.forwardPE), rent_div: v(q.summaryDetail?.dividendYield) };
  console.log(t, JSON.stringify(out.datos[t]));
}
console.log(JSON.stringify(out.fx));
fs.writeFileSync(path.join(dir, 'comparables-yahoo.json'), JSON.stringify(out, null, 1));
