// Datos de Yahoo Finance (quoteSummary + fundamentals-timeseries) para Commvault y sus comparables, corte 2026-10-21
// (cierre del 20-oct-2026; la sesión del 21-oct está abierta). Guarda notas/yahoo-datos.json.
// Ejecutar: NODE_USE_ENV_PROXY=1 node informes/commvault-2026-10-21/notas/yahoo-datos.mjs
// Además del consenso (BPA ajustado de los analistas, que EXCLUYE la remuneración en acciones en casi todo el software),
// baja la remuneración en acciones (SBC), el BPA GAAP y las acciones diluidas del último ejercicio y de los últimos
// 12 meses para poner los PER de los comparables en la base del informe (BPA con la remuneración en acciones como gasto).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { json } from '../../../herramientas/yahoo.mjs';

const dir = path.dirname(fileURLToPath(import.meta.url));
const tickers = ['CVLT', 'RBRK', 'NTAP', 'NTNX', 'CHKP', 'QLYS', 'FFIV', 'OTEX', 'BOX', 'DBX', 'TENB', 'GEN', 'NABL', 'VRNS', 'PSTG', 'AKAM'];
const mods = 'price,summaryDetail,financialData,defaultKeyStatistics,earningsTrend,recommendationTrend,calendarEvents';
const tipos = ['trailingStockBasedCompensation', 'annualStockBasedCompensation', 'trailingDilutedEPS', 'annualDilutedEPS', 'trailingDilutedAverageShares', 'annualDilutedAverageShares', 'trailingTaxRateForCalcs', 'trailingTotalRevenue', 'trailingEBITDA', 'trailingNormalizedEBITDA'].join(',');
const out = { fecha: new Date().toISOString(), fuente: 'Yahoo Finance quoteSummary y fundamentals-timeseries', datos: {} };
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
    const p2 = Math.floor(Date.now() / 1000), p1 = p2 - 3 * 365 * 86400;
    let fund = {};
    try {
      const ts = await json(`https://query2.finance.yahoo.com/ws/fundamentals-timeseries/v1/finance/timeseries/${encodeURIComponent(t)}?symbol=${encodeURIComponent(t)}&type=${tipos}&period1=${p1}&period2=${p2}`);
      for (const s of ts?.timeseries?.result || []) {
        const k = s.meta?.type?.[0]; const serie = (s[k] || []).filter(Boolean);
        const u = serie[serie.length - 1];
        if (u) fund[k] = { fecha: u.asOfDate, valor: u.reportedValue?.raw ?? null };
      }
    } catch (e) { fund = { error: e.message }; }
    out.datos[t] = {
      nombre: q.price?.longName, divisa: q.price?.currency, precio: v(q.price?.regularMarketPrice), hora: v(q.price?.regularMarketTime),
      cierre_previo: v(q.summaryDetail?.previousClose), cap: v(q.price?.marketCap), ev: v(q.defaultKeyStatistics?.enterpriseValue),
      ev_ebitda: v(q.defaultKeyStatistics?.enterpriseToEbitda), ev_ventas: v(q.defaultKeyStatistics?.enterpriseToRevenue), ebitda: v(q.financialData?.ebitda), ventas: v(q.financialData?.totalRevenue),
      fcf: v(q.financialData?.freeCashflow), caja: v(q.financialData?.totalCash), deuda: v(q.financialData?.totalDebt), margen_ebitda: v(q.financialData?.ebitdaMargins),
      crec_ventas: v(q.financialData?.revenueGrowth), roe: v(q.financialData?.returnOnEquity),
      per_trailing: v(q.summaryDetail?.trailingPE), per_adelantado: v(q.summaryDetail?.forwardPE), bpa_adelantado: v(q.defaultKeyStatistics?.forwardEps), bpa_trailing: v(q.defaultKeyStatistics?.trailingEps), beta: v(q.summaryDetail?.beta),
      acciones: v(q.defaultKeyStatistics?.sharesOutstanding), corto_pct: v(q.defaultKeyStatistics?.shortPercentOfFloat),
      insiders_pct: v(q.defaultKeyStatistics?.heldPercentInsiders), instituciones_pct: v(q.defaultKeyStatistics?.heldPercentInstitutions),
      po_medio: v(q.financialData?.targetMeanPrice), po_min: v(q.financialData?.targetLowPrice), po_max: v(q.financialData?.targetHighPrice),
      n_analistas: v(q.financialData?.numberOfAnalystOpinions), recomendacion: q.financialData?.recommendationKey,
      reco: q.recommendationTrend?.trend?.[0] ?? null, reco_3m: q.recommendationTrend?.trend?.[3] ?? null, trend: tr,
      proximos_resultados: (q.calendarEvents?.earnings?.earningsDate || []).map((x) => x.fmt),
      fund,
    };
    console.log(t, out.datos[t].precio, out.datos[t].divisa, 'PER adel', out.datos[t].per_adelantado, 'SBC ttm', fund.trailingStockBasedCompensation?.valor);
  } catch (e) { console.log(t, 'ERROR', e.message); }
}
fs.writeFileSync(path.join(dir, 'yahoo-datos.json'), JSON.stringify(out, null, 1));
