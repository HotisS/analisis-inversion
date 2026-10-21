// Subagente D (Moody's, 21-oct-2026): BPA ajustado de consenso (earningsTrend de Yahoo, años 0y y +1y),
// precio de cierre y datos clave de los comparables. Uso: NODE_USE_ENV_PROXY=1 node D-yahoo-comparables.mjs
import { json } from '../../../herramientas/yahoo.mjs';
import { writeFileSync } from 'node:fs';

const simbolos = ['MCO', 'SPGI', 'MSCI', 'ICE', 'CME', 'NDAQ', 'VRSK', 'TRI', 'LSEG.L', 'FDS', 'MORN'];
const salida = {};
for (const s of simbolos) {
  try {
    const r = await json(`https://query1.finance.yahoo.com/v10/finance/quoteSummary/${encodeURIComponent(s)}?modules=earningsTrend,price,defaultKeyStatistics,financialData`);
    const q = r.quoteSummary.result[0];
    const t = (q.earningsTrend?.trend || []).filter((x) => x.period === '0y' || x.period === '+1y').map((x) => ({
      periodo: x.period, fin: x.endDate, bpa: x.earningsEstimate?.avg?.raw, n: x.earningsEstimate?.numberOfAnalysts?.raw,
      bpa_hace_90d: x.epsTrend?.['90daysAgo']?.raw, ventas: x.revenueEstimate?.avg?.raw, ventas_ano_anterior: x.revenueEstimate?.yearAgoRevenue?.raw,
    }));
    salida[s] = {
      precio: q.price?.regularMarketPrice?.raw, previo: q.price?.regularMarketPreviousClose?.raw, hora: q.price?.regularMarketTime,
      divisa: q.price?.currency, cap: q.price?.marketCap?.raw, ev: q.defaultKeyStatistics?.enterpriseValue?.raw,
      ebitda: q.financialData?.ebitda?.raw, ventas_ltm: q.financialData?.totalRevenue?.raw, fcf: q.financialData?.freeCashflow?.raw,
      corto_pct_float: q.defaultKeyStatistics?.shortPercentOfFloat?.raw, corto_fecha: q.defaultKeyStatistics?.dateShortInterest?.raw,
      objetivo_medio: q.financialData?.targetMeanPrice?.raw, objetivo_min: q.financialData?.targetLowPrice?.raw, objetivo_max: q.financialData?.targetHighPrice?.raw,
      n_analistas: q.financialData?.numberOfAnalystOpinions?.raw, trend: t,
    };
  } catch (e) { salida[s] = { error: e.message }; }
}
writeFileSync(new URL('./docs/D-yahoo-comparables.json', import.meta.url), JSON.stringify(salida, null, 1));
for (const [s, v] of Object.entries(salida)) console.log(s, JSON.stringify(v));
