// Márgenes, deuda, caja y FCF de Yahoo (financialData) para comparables de SHIFT, 21-oct-2026.
import fs from 'node:fs'; import path from 'node:path'; import { fileURLToPath } from 'node:url';
import { json } from '../../../herramientas/yahoo.mjs';
const dir = path.dirname(fileURLToPath(import.meta.url));
const tickers = ['3697.T','4307.T','3626.T','9719.T','2317.T','3676.T','3657.T','4442.T','6532.T','EPAM','GLOB','2327.T'];
const out = {};
const v = (o) => (o && typeof o === 'object' ? o.raw ?? null : o ?? null);
for (const t of tickers) {
  try {
    const r = await json(`https://query2.finance.yahoo.com/v10/finance/quoteSummary/${encodeURIComponent(t)}?modules=financialData,price,defaultKeyStatistics,summaryDetail`);
    const q = r.quoteSummary.result[0]; const f = q.financialData || {};
    out[t] = { nombre: q.price?.shortName, precio: v(q.price?.regularMarketPrice), cap: v(q.price?.marketCap), ev: v(q.defaultKeyStatistics?.enterpriseValue), margen_op: v(f.operatingMargins), margen_ebitda: v(f.ebitdaMargins), roe: v(f.returnOnEquity), roa: v(f.returnOnAssets), crec_ventas: v(f.revenueGrowth), deuda: v(f.totalDebt), caja: v(f.totalCash), fcf: v(f.freeCashflow), ebitda: v(f.ebitda), ventas: v(f.totalRevenue), per_ttm: v(q.summaryDetail?.trailingPE) };
    console.log(t, JSON.stringify(out[t]));
  } catch (e) { console.log(t, 'ERROR', e.message); }
}
fs.writeFileSync(path.join(dir, 'yahoo-extra.json'), JSON.stringify({ fecha: new Date().toISOString(), datos: out }, null, 1));
