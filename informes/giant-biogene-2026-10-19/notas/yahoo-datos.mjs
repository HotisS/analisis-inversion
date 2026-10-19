// Datos de Yahoo Finance (quoteSummary) para Giant Biogene (2367.HK) y sus comparables, corte 2026-10-19
// (Hong Kong cerrado el 19-oct por el día siguiente a Chung Yeung: último cierre, 16-oct-2026).
// Guarda notas/yahoo-datos.json. Ejecutar: NODE_USE_ENV_PROXY=1 node informes/giant-biogene-2026-10-19/notas/yahoo-datos.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { json } from '../../../herramientas/yahoo.mjs';

const dir = path.dirname(fileURLToPath(import.meta.url));
const tickers = ['2367.HK', '688363.SS', '603605.SS', '300957.SZ', '300896.SZ', '600315.SS', '1318.HK', '2145.HK', '832982.BJ', '4911.T', 'OR.PA', 'EL', '2273.HK'];
const mods = 'price,summaryDetail,financialData,defaultKeyStatistics,earningsTrend,recommendationTrend';
const out = { fecha: new Date().toISOString(), fuente: 'Yahoo Finance quoteSummary', datos: {} };
const v = (o) => (o && typeof o === 'object' ? o.raw ?? null : o ?? null);
for (const t of tickers) {
  try {
    const r = await json(`https://query2.finance.yahoo.com/v10/finance/quoteSummary/${encodeURIComponent(t)}?modules=${mods}`);
    const q = r.quoteSummary.result[0];
    const tr = (q.earningsTrend?.trend || []).map((x) => ({
      periodo: x.period, fin: x.endDate, bpa: v(x.earningsEstimate?.avg), bpa_min: v(x.earningsEstimate?.low), bpa_max: v(x.earningsEstimate?.high),
      n: v(x.earningsEstimate?.numberOfAnalysts), ventas: v(x.revenueEstimate?.avg), crec_ventas: v(x.revenueEstimate?.growth),
      bpa_hace90: v(x.epsTrend?.['90daysAgo']), bpa_hace30: v(x.epsTrend?.['30daysAgo']), bpa_hace7: v(x.epsTrend?.['7daysAgo']),
    }));
    out.datos[t] = {
      nombre: q.price?.longName ?? q.price?.shortName, divisa: q.price?.currency, divisa_cuentas: q.financialData?.financialCurrency,
      precio: v(q.price?.regularMarketPrice), hora: v(q.price?.regularMarketTime),
      cap: v(q.price?.marketCap), ev: v(q.defaultKeyStatistics?.enterpriseValue),
      ev_ebitda: v(q.defaultKeyStatistics?.enterpriseToEbitda), ev_ventas: v(q.defaultKeyStatistics?.enterpriseToRevenue),
      ebitda: v(q.financialData?.ebitda), ventas: v(q.financialData?.totalRevenue), margen_ebitda: v(q.financialData?.ebitdaMargins),
      margen_op: v(q.financialData?.operatingMargins), crec_ventas: v(q.financialData?.revenueGrowth), caja: v(q.financialData?.totalCash),
      deuda: v(q.financialData?.totalDebt), fcf: v(q.financialData?.freeCashflow), roe: v(q.financialData?.returnOnEquity),
      per_adelantado: v(q.summaryDetail?.forwardPE), per: v(q.summaryDetail?.trailingPE), bpa_adelantado: v(q.defaultKeyStatistics?.forwardEps),
      beta: v(q.summaryDetail?.beta), acciones: v(q.defaultKeyStatistics?.sharesOutstanding), corto_pct: v(q.defaultKeyStatistics?.shortPercentOfFloat),
      insiders_pct: v(q.defaultKeyStatistics?.heldPercentInsiders), instituciones_pct: v(q.defaultKeyStatistics?.heldPercentInstitutions),
      po_medio: v(q.financialData?.targetMeanPrice), po_min: v(q.financialData?.targetLowPrice), po_max: v(q.financialData?.targetHighPrice),
      n_analistas: v(q.financialData?.numberOfAnalystOpinions), recomendacion: q.financialData?.recommendationKey,
      reco: q.recommendationTrend?.trend ?? null, trend: tr,
    };
    console.log(t, out.datos[t].nombre, out.datos[t].precio, out.datos[t].divisa, out.datos[t].per_adelantado);
  } catch (e) { console.log(t, 'ERROR', e.message); }
}
fs.writeFileSync(path.join(dir, 'yahoo-datos.json'), JSON.stringify(out, null, 1));
