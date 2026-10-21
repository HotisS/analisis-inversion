// Datos de Yahoo para Salik (SALIK.AE): comparables (quoteSummary), tipos de cambio y serie anual de la propia empresa.
// Uso: NODE_USE_ENV_PROXY=1 node informes/salik-2026-10-21/notas/yahoo.mjs > informes/salik-2026-10-21/notas/yahoo-raw.json
import { json } from '../../../herramientas/yahoo.mjs';
const SIMBOLOS = ['SALIK.AE', 'PARKIN.AE', 'TCL.AX', 'ALX.AX', 'DG.PA', 'FER.MC', 'GET.PA', 'FGR.PA', 'PINFRA.MX', '0177.HK', '0576.HK'];
const FX = ['USDAED=X', 'EURAED=X', 'AUDAED=X', 'MXNAED=X', 'HKDAED=X'];
const BASE = 'https://query2.finance.yahoo.com';
const v = (o, k) => (o?.[k] && typeof o[k] === 'object' ? o[k].raw ?? null : o?.[k] ?? null);
const out = { comps: [], fx: {}, serie: null };
for (const s of SIMBOLOS) {
  try {
    const r = (await json(`${BASE}/v10/finance/quoteSummary/${encodeURIComponent(s)}?modules=price,financialData,defaultKeyStatistics,summaryDetail,earningsTrend,recommendationTrend`))?.quoteSummary?.result?.[0] || {};
    const pr = r.price, fd = r.financialData, ks = r.defaultKeyStatistics, sd = r.summaryDetail;
    out.comps.push({
      s, name: pr?.shortName, cur: pr?.currency, fcur: fd?.financialCurrency, price: v(pr, 'regularMarketPrice'), t: v(pr, 'regularMarketTime'), mcap: v(pr, 'marketCap'),
      ev: v(ks, 'enterpriseValue'), evRev: v(ks, 'enterpriseToRevenue'), evEbitda: v(ks, 'enterpriseToEbitda'), fpe: v(ks, 'forwardPE'), tpe: v(sd, 'trailingPE'),
      rev: v(fd, 'totalRevenue'), ebitda: v(fd, 'ebitda'), ebitdaM: v(fd, 'ebitdaMargins'), opM: v(fd, 'operatingMargins'), revG: v(fd, 'revenueGrowth'),
      cash: v(fd, 'totalCash'), debt: v(fd, 'totalDebt'), fcf: v(fd, 'freeCashflow'), roe: v(fd, 'returnOnEquity'), roa: v(fd, 'returnOnAssets'), tgt: v(fd, 'targetMeanPrice'), tgtLo: v(fd, 'targetLowPrice'), tgtHi: v(fd, 'targetHighPrice'), nA: v(fd, 'numberOfAnalystOpinions'),
      rec: fd?.recommendationKey, recT: r.recommendationTrend?.trend?.[0] ?? null, beta: v(ks, 'beta'), eps: v(ks, 'trailingEps'), feps: v(ks, 'forwardEps'), dy: v(sd, 'dividendYield'),
      floatSh: v(ks, 'floatShares'), sh: v(ks, 'sharesOutstanding'), avgVol3m: v(sd, 'averageVolume'), avgVol10d: v(sd, 'averageVolume10days'),
      et: (r.earningsTrend?.trend || []).map((t) => ({ p: t.period, end: t.endDate, eps: v(t.earningsEstimate, 'avg'), epsLo: v(t.earningsEstimate, 'low'), epsHi: v(t.earningsEstimate, 'high'), rev: v(t.revenueEstimate, 'avg'), n: v(t.earningsEstimate, 'numberOfAnalysts'), g: v(t.revenueEstimate, 'growth'), e90: t.epsTrend?.['90daysAgo']?.raw ?? null })),
    });
  } catch (e) { out.comps.push({ s, error: e.message }); }
}
for (const f of FX) { try { const r = await json(`${BASE}/v8/finance/chart/${encodeURIComponent(f)}?range=5d&interval=1d`); out.fx[f] = r.chart.result[0].meta.regularMarketPrice; } catch (e) { out.fx[f] = null; } }
const tipos = ['EBITDA', 'PretaxIncome', 'TaxProvision', 'InterestExpense', 'ReconciledDepreciation', 'OperatingIncome', 'NetIncome', 'TotalRevenue', 'DilutedEPS', 'DilutedAverageShares', 'CashDividendsPaid', 'CapitalExpenditure', 'OperatingCashFlow', 'TotalAssets', 'StockholdersEquity', 'TotalDebt', 'CashAndCashEquivalents'].map((t) => 'annual' + t);
try {
  const p1 = Math.floor(Date.UTC(2018, 0, 1) / 1000), p2 = Math.floor(Date.now() / 1000);
  const r = await json(`${BASE}/ws/fundamentals-timeseries/v1/finance/timeseries/SALIK.AE?type=${tipos.join(',')}&period1=${p1}&period2=${p2}`);
  out.serie = {};
  for (const x of r.timeseries.result) { const k = x.meta.type[0]; out.serie[k] = (x[k] || []).filter(Boolean).map((d) => [d.asOfDate, d.reportedValue?.raw]); }
} catch (e) { out.serie = { error: e.message }; }
console.log(JSON.stringify(out, null, 1));
