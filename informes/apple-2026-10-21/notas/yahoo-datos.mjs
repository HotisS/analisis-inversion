// Datos de Yahoo Finance (quoteSummary) para Apple y sus comparables, corte 2026-10-21 (cierre del 20-oct-2026).
// Guarda notas/yahoo-datos.json. Ejecutar: NODE_USE_ENV_PROXY=1 node informes/apple-2026-10-21/notas/yahoo-datos.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { json } from '../../../herramientas/yahoo.mjs';

const dir = path.dirname(fileURLToPath(import.meta.url));
const tickers = ['AAPL', 'MSFT', 'GOOGL', 'META', 'AMZN', '005930.KS', '1810.HK', 'SONY', 'DELL', 'HPQ', 'LOGI', 'QCOM', 'KRW=X', 'HKD=X', 'JPY=X'];
const mods = 'price,summaryDetail,financialData,defaultKeyStatistics,earningsTrend,recommendationTrend,upgradeDowngradeHistory';
const out = { fecha: new Date().toISOString(), fuente: 'Yahoo Finance quoteSummary', datos: {} };
for (const t of tickers) {
  try {
    const r = await json(`https://query2.finance.yahoo.com/v10/finance/quoteSummary/${encodeURIComponent(t)}?modules=${mods}`);
    const q = r.quoteSummary.result[0];
    const v = (o) => (o && typeof o === 'object' ? o.raw ?? null : o ?? null);
    const tr = (q.earningsTrend?.trend || []).map((x) => ({
      periodo: x.period, fin: x.endDate, bpa: v(x.earningsEstimate?.avg), bpa_min: v(x.earningsEstimate?.low), bpa_max: v(x.earningsEstimate?.high),
      n: v(x.earningsEstimate?.numberOfAnalysts), ventas: v(x.revenueEstimate?.avg), crec_ventas: v(x.revenueEstimate?.growth), n_ventas: v(x.revenueEstimate?.numberOfAnalysts),
      bpa_hace90: v(x.epsTrend?.['90daysAgo']), bpa_hace30: v(x.epsTrend?.['30daysAgo']), bpa_hace7: v(x.epsTrend?.['7daysAgo']),
    }));
    const ud = (q.upgradeDowngradeHistory?.history || []).filter((h) => h.epochGradeDate * 1000 > Date.now() - 365 * 864e5)
      .map((h) => ({ fecha: new Date(h.epochGradeDate * 1000).toISOString().slice(0, 10), firma: h.firm, de: h.fromGrade, a: h.toGrade, accion: h.action, po_previo: h.priorPriceTarget ?? null, po: h.currentPriceTarget ?? null }));
    out.datos[t] = {
      nombre: q.price?.longName, divisa: q.price?.currency, precio: v(q.price?.regularMarketPrice), hora: v(q.price?.regularMarketTime),
      cierre_previo: v(q.summaryDetail?.previousClose), cap: v(q.price?.marketCap), ev: v(q.defaultKeyStatistics?.enterpriseValue),
      ev_ebitda: v(q.defaultKeyStatistics?.enterpriseToEbitda), ev_ventas: v(q.defaultKeyStatistics?.enterpriseToRevenue), ebitda: v(q.financialData?.ebitda), ventas: v(q.financialData?.totalRevenue),
      margen_ebitda: v(q.financialData?.ebitdaMargins), margen_op: v(q.financialData?.operatingMargins), fcf: v(q.financialData?.freeCashflow), deuda: v(q.financialData?.totalDebt), caja: v(q.financialData?.totalCash),
      per_adelantado: v(q.summaryDetail?.forwardPE), per_ltm: v(q.summaryDetail?.trailingPE), bpa_adelantado: v(q.defaultKeyStatistics?.forwardEps), beta: v(q.summaryDetail?.beta),
      acciones: v(q.defaultKeyStatistics?.sharesOutstanding), corto_pct: v(q.defaultKeyStatistics?.shortPercentOfFloat), corto_acc: v(q.defaultKeyStatistics?.sharesShort),
      insiders_pct: v(q.defaultKeyStatistics?.heldPercentInsiders), instituciones_pct: v(q.defaultKeyStatistics?.heldPercentInstitutions),
      po_medio: v(q.financialData?.targetMeanPrice), po_min: v(q.financialData?.targetLowPrice), po_max: v(q.financialData?.targetHighPrice),
      n_analistas: v(q.financialData?.numberOfAnalystOpinions), recomendacion: q.financialData?.recommendationKey,
      roe: v(q.financialData?.returnOnEquity), crec_ventas_ttm: v(q.financialData?.revenueGrowth),
      reco: q.recommendationTrend?.trend ?? null, trend: tr, cambios_12m: ud,
    };
    console.log(t, out.datos[t].precio, out.datos[t].divisa, out.datos[t].per_adelantado, out.datos[t].ev_ebitda);
  } catch (e) { console.log(t, 'ERROR', e.message); }
}
fs.writeFileSync(path.join(dir, 'yahoo-datos.json'), JSON.stringify(out, null, 1));
