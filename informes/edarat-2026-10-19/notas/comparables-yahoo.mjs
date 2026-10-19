// Comparables de Edarat desde Yahoo (quoteSummary: precio, capitalización, valor empresa, márgenes, estimaciones).
// Uso: NODE_USE_ENV_PROXY=1 node informes/edarat-2026-10-19/notas/comparables-yahoo.mjs > comparables-yahoo-raw.json
import { json } from '../../../herramientas/yahoo.mjs';
const SIMBOLOS = ['7200.SR', '7202.SR', '7203.SR', '7204.SR', '7201.SR', '9557.SR', 'EQIX', 'DLR', 'NXT.AX', 'IREN', 'APLD', 'WSP.TO', 'J'];
const BASE = 'https://query2.finance.yahoo.com';
const v = (o, k) => (o?.[k] && typeof o[k] === 'object' ? o[k].raw ?? null : o?.[k] ?? null);
const out = [];
for (const s of SIMBOLOS) {
  try {
    const r = (await json(`${BASE}/v10/finance/quoteSummary/${encodeURIComponent(s)}?modules=price,financialData,defaultKeyStatistics,summaryDetail,earningsTrend`))?.quoteSummary?.result?.[0] || {};
    const pr = r.price, fd = r.financialData, ks = r.defaultKeyStatistics, sd = r.summaryDetail;
    out.push({
      s, name: pr?.shortName, cur: pr?.currency, fcur: fd?.financialCurrency, price: v(pr, 'regularMarketPrice'), mcap: v(pr, 'marketCap'),
      ev: v(ks, 'enterpriseValue'), evRev: v(ks, 'enterpriseToRevenue'), evEbitda: v(ks, 'enterpriseToEbitda'), fpe: v(ks, 'forwardPE'), tpe: v(sd, 'trailingPE'),
      rev: v(fd, 'totalRevenue'), ebitda: v(fd, 'ebitda'), ebitdaM: v(fd, 'ebitdaMargins'), opM: v(fd, 'operatingMargins'), revG: v(fd, 'revenueGrowth'),
      cash: v(fd, 'totalCash'), debt: v(fd, 'totalDebt'), fcf: v(fd, 'freeCashflow'), roe: v(fd, 'returnOnEquity'), tgt: v(fd, 'targetMeanPrice'), nA: v(fd, 'numberOfAnalystOpinions'),
      rec: fd?.recommendationKey, beta: v(ks, 'beta'),
      et: (r.earningsTrend?.trend || []).map((t) => ({ p: t.period, end: t.endDate, eps: v(t.earningsEstimate, 'avg'), rev: v(t.revenueEstimate, 'avg'), n: v(t.earningsEstimate, 'numberOfAnalysts') })),
    });
  } catch (e) { out.push({ s, error: e.message }); }
}
console.log(JSON.stringify(out, null, 1));
