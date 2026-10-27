// Datos de Yahoo Finance (quoteSummary) para Santander Brasil y sus comparables, corte 2026-10-27 (cierre del 26-oct-2026).
// Guarda notas/yahoo-datos.json. Ejecutar: NODE_USE_ENV_PROXY=1 node informes/santander-brasil-2026-10-27/notas/yahoo-datos.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { json } from '../../../herramientas/yahoo.mjs';

const dir = path.dirname(fileURLToPath(import.meta.url));
const tickers = ['SANB11.SA', 'SANB3.SA', 'SANB4.SA', 'BSBR', 'ITUB4.SA', 'BBDC4.SA', 'BBAS3.SA', 'BPAC11.SA', 'NU', 'INTR', 'ITSA4.SA', 'SAN.MC', 'SAN', 'BRL=X', 'EURBRL=X', 'BOVA11.SA', '^BVSP'];
const mods = 'price,summaryDetail,financialData,defaultKeyStatistics,earningsTrend,recommendationTrend';
const out = { fecha: new Date().toISOString(), fuente: 'Yahoo Finance quoteSummary', datos: {} };
for (const t of tickers) {
  try {
    const r = await json(`https://query2.finance.yahoo.com/v10/finance/quoteSummary/${encodeURIComponent(t)}?modules=${mods}`);
    const q = r.quoteSummary.result[0];
    const v = (o) => (o && typeof o === 'object' ? o.raw ?? null : o ?? null);
    const tr = (q.earningsTrend?.trend || []).map((x) => ({
      periodo: x.period, fin: x.endDate, bpa: v(x.earningsEstimate?.avg), bpa_min: v(x.earningsEstimate?.low), bpa_max: v(x.earningsEstimate?.high),
      n: v(x.earningsEstimate?.numberOfAnalysts), ventas: v(x.revenueEstimate?.avg), crec_ventas: v(x.revenueEstimate?.growth),
      bpa_hace90: v(x.epsTrend?.['90daysAgo']), bpa_hace30: v(x.epsTrend?.['30daysAgo']),
    }));
    out.datos[t] = {
      nombre: q.price?.longName, divisa: q.price?.currency, precio: v(q.price?.regularMarketPrice), hora: v(q.price?.regularMarketTime),
      cierre_previo: v(q.summaryDetail?.previousClose), cap: v(q.price?.marketCap), ev: v(q.defaultKeyStatistics?.enterpriseValue),
      ev_ebitda: v(q.defaultKeyStatistics?.enterpriseToEbitda), ebitda: v(q.financialData?.ebitda), ventas: v(q.financialData?.totalRevenue),
      per_adelantado: v(q.summaryDetail?.forwardPE), bpa_adelantado: v(q.defaultKeyStatistics?.forwardEps), beta: v(q.summaryDetail?.beta),
      acciones: v(q.defaultKeyStatistics?.sharesOutstanding), corto_pct: v(q.defaultKeyStatistics?.shortPercentOfFloat),
      insiders_pct: v(q.defaultKeyStatistics?.heldPercentInsiders), instituciones_pct: v(q.defaultKeyStatistics?.heldPercentInstitutions),
      po_medio: v(q.financialData?.targetMeanPrice), po_min: v(q.financialData?.targetLowPrice), po_max: v(q.financialData?.targetHighPrice),
      n_analistas: v(q.financialData?.numberOfAnalystOpinions), recomendacion: q.financialData?.recommendationKey,
      margen_op: v(q.financialData?.operatingMargins), fcf: v(q.financialData?.freeCashflow), deuda: v(q.financialData?.totalDebt), caja: v(q.financialData?.totalCash),
      pvc: v(q.defaultKeyStatistics?.priceToBook), vc: v(q.defaultKeyStatistics?.bookValue), roe: v(q.financialData?.returnOnEquity), rent_div: v(q.summaryDetail?.dividendYield), per_ltm: v(q.summaryDetail?.trailingPE), reco: q.recommendationTrend?.trend?.[0] ?? null, trend: tr,
    };
    console.log(t, out.datos[t].precio, out.datos[t].divisa, out.datos[t].per_adelantado);
  } catch (e) { console.log(t, 'ERROR', e.message); }
}
fs.writeFileSync(path.join(dir, 'yahoo-datos.json'), JSON.stringify(out, null, 1));
