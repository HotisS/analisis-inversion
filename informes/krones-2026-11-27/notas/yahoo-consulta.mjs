// Consulta quoteSummary de Yahoo para Krones y comparables (temporal, tanda 1127).
import { json } from '../../../herramientas/yahoo.mjs';
import { writeFileSync } from 'node:fs';
const sims = process.argv.slice(2);
const mods = 'price,summaryDetail,defaultKeyStatistics,financialData,earningsTrend,recommendationTrend,upgradeDowngradeHistory';
const out = {};
for (const s of sims) {
  try {
    const d = await json(`https://query2.finance.yahoo.com/v10/finance/quoteSummary/${encodeURIComponent(s)}?modules=${mods}`);
    out[s] = d?.quoteSummary?.result?.[0] ?? d;
  } catch (e) { out[s] = { error: e.message }; }
}
writeFileSync('./docs/yahoo-quotesummary-2026-11-27.json', JSON.stringify(out, null, 1));
const r = (x) => (x && typeof x === 'object' && 'raw' in x ? x.raw : x);
for (const [s, d] of Object.entries(out)) {
  if (d.error) { console.log(s, 'ERROR', d.error); continue; }
  const p = d.price || {}, sd = d.summaryDetail || {}, ks = d.defaultKeyStatistics || {}, fd = d.financialData || {};
  console.log(s, p.currency, 'precio', r(p.regularMarketPrice), 'prevClose', r(sd.previousClose), 'cap', r(p.marketCap), 'EV', r(ks.enterpriseValue),
    'EV/EBITDA', r(ks.enterpriseToEbitda), 'EBITDA', r(fd.ebitda), 'ingresos', r(fd.totalRevenue), 'PERfwd', r(sd.forwardPE), 'PERttm', r(sd.trailingPE),
    'obj', r(fd.targetMeanPrice), r(fd.targetLowPrice), r(fd.targetHighPrice), 'n', r(fd.numberOfAnalystOpinions), 'rec', fd.recommendationKey);
  for (const t of d.earningsTrend?.trend ?? []) {
    console.log('   ', t.period, t.endDate, 'BPA', r(t.earningsEstimate?.avg), 'n', r(t.earningsEstimate?.numberOfAnalysts), 'ventas', r(t.revenueEstimate?.avg), 'crec', r(t.revenueEstimate?.growth),
      'hace90d', r(t.epsTrend?.['90daysAgo']), 'hace30d', r(t.epsTrend?.['30daysAgo']));
  }
}
