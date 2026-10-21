// Datos de Yahoo Finance (quoteSummary) para Otis y sus comparables, corte 2026-10-21 (cierre del 20-oct-2026; sesión del 21 abierta).
// Guarda notas/yahoo-datos.json. Ejecutar: NODE_USE_ENV_PROXY=1 node informes/otis-2026-10-21/notas/yahoo-datos.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { json } from '../../../herramientas/yahoo.mjs';

const dir = path.dirname(fileURLToPath(import.meta.url));
const tickers = ['OTIS', 'KNEBV.HE', 'SCHP.SW', '017800.KS', 'ASSA-B.ST', 'ATCO-A.ST', 'KCR.HE', '6503.T', 'LR.PA', 'CARR', 'JCI',
  'EURUSD=X', 'CHFUSD=X', 'SEKUSD=X', 'KRWUSD=X', 'JPYUSD=X'];
const mods = 'price,summaryDetail,financialData,defaultKeyStatistics,earningsTrend,recommendationTrend,upgradeDowngradeHistory';
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
    const ud = (q.upgradeDowngradeHistory?.history || []).slice(0, 25).map((h) => ({ fecha: new Date(h.epochGradeDate * 1000).toISOString().slice(0, 10), firma: h.firm, de: h.fromGrade, a: h.toGrade, accion: h.action, po: h.currentPriceTarget ?? null, po_previo: h.priorPriceTarget ?? null }));
    out.datos[t] = {
      nombre: q.price?.longName, divisa: q.price?.currency, precio: v(q.price?.regularMarketPrice), hora: v(q.price?.regularMarketTime),
      cierre_previo: v(q.summaryDetail?.previousClose), cap: v(q.price?.marketCap), ev: v(q.defaultKeyStatistics?.enterpriseValue),
      ev_ebitda: v(q.defaultKeyStatistics?.enterpriseToEbitda), ev_ventas: v(q.defaultKeyStatistics?.enterpriseToRevenue), ebitda: v(q.financialData?.ebitda), ventas: v(q.financialData?.totalRevenue),
      deuda: v(q.financialData?.totalDebt), caja: v(q.financialData?.totalCash), fcf: v(q.financialData?.freeCashflow), margen_ebitda: v(q.financialData?.ebitdaMargins),
      per_adelantado: v(q.summaryDetail?.forwardPE), bpa_adelantado: v(q.defaultKeyStatistics?.forwardEps), beta: v(q.summaryDetail?.beta),
      acciones: v(q.defaultKeyStatistics?.sharesOutstanding), corto_pct: v(q.defaultKeyStatistics?.shortPercentOfFloat),
      insiders_pct: v(q.defaultKeyStatistics?.heldPercentInsiders), instituciones_pct: v(q.defaultKeyStatistics?.heldPercentInstitutions),
      po_medio: v(q.financialData?.targetMeanPrice), po_min: v(q.financialData?.targetLowPrice), po_max: v(q.financialData?.targetHighPrice),
      n_analistas: v(q.financialData?.numberOfAnalystOpinions), recomendacion: q.financialData?.recommendationKey,
      reco: q.recommendationTrend?.trend ?? null, trend: tr, cambios: ud,
    };
    console.log(t, out.datos[t].precio, out.datos[t].divisa, out.datos[t].per_adelantado);
  } catch (e) { console.log(t, 'ERROR', e.message); }
}
fs.writeFileSync(path.join(dir, 'yahoo-datos.json'), JSON.stringify(out, null, 1));
