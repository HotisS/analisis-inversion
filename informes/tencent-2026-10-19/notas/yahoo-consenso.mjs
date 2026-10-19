// Consenso de Yahoo (earningsTrend, financialData, price) para Tencent y comparables. Uso: node yahoo-consenso.mjs SIMB…
import { json } from '../../../herramientas/yahoo.mjs';
const BASE = 'https://query2.finance.yahoo.com';
const v = (o) => (o && typeof o === 'object' ? o.raw ?? null : o ?? null);
const out = {};
for (const s of process.argv.slice(2)) {
  try {
    const r = await json(`${BASE}/v10/finance/quoteSummary/${encodeURIComponent(s)}?modules=earningsTrend,financialData,price,defaultKeyStatistics,summaryDetail`);
    const x = r?.quoteSummary?.result?.[0] || {};
    out[s] = {
      precio: v(x.price?.regularMarketPrice), divisa: x.price?.currency, fecha: x.price?.regularMarketTime ? new Date(v(x.price.regularMarketTime) * 1000).toISOString() : null,
      cap: v(x.price?.marketCap), divisa_cuentas: x.financialData?.financialCurrency,
      ev: v(x.defaultKeyStatistics?.enterpriseValue), ev_ebitda: v(x.defaultKeyStatistics?.enterpriseToEbitda), ev_ventas: v(x.defaultKeyStatistics?.enterpriseToRevenue),
      per_adel: v(x.defaultKeyStatistics?.forwardPE), per: v(x.summaryDetail?.trailingPE),
      objetivo: v(x.financialData?.targetMeanPrice), obj_max: v(x.financialData?.targetHighPrice), obj_min: v(x.financialData?.targetLowPrice), n: v(x.financialData?.numberOfAnalystOpinions), rec: x.financialData?.recommendationKey,
      ebitda: v(x.financialData?.ebitda), ventas: v(x.financialData?.totalRevenue), margen_ebitda: v(x.financialData?.ebitdaMargins), deuda: v(x.financialData?.totalDebt), caja: v(x.financialData?.totalCash), fcf: v(x.financialData?.freeCashflow), roe: v(x.financialData?.returnOnEquity), margen_op: v(x.financialData?.operatingMargins), crec_ventas: v(x.financialData?.revenueGrowth),
      tendencia: (x.earningsTrend?.trend || []).map((t) => ({ periodo: t.period, fin: t.endDate, bpa: v(t.earningsEstimate?.avg), n: v(t.earningsEstimate?.numberOfAnalysts), ventas: v(t.revenueEstimate?.avg), crec: v(t.revenueEstimate?.growth), bpa_90d: v(t.epsTrend?.['90daysAgo']), bpa_30d: v(t.epsTrend?.['30daysAgo']) })),
    };
  } catch (e) { out[s] = { error: e.message }; }
}
console.log(JSON.stringify(out, null, 1));
