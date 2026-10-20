// Datos de Yahoo Finance (quoteSummary y series anuales) para TeamViewer y sus comparables, corte 2026-10-20.
// Guarda notas/yahoo-datos.json. Ejecutar: NODE_USE_ENV_PROXY=1 node informes/teamviewer-2026-10-20/notas/yahoo-datos.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { json } from '../../../herramientas/yahoo.mjs';

const dir = path.dirname(fileURLToPath(import.meta.url));
const tickers = ['TMV.DE', 'NABL', 'DBX', 'BOX', 'DOCU', 'QLYS', 'RPD', 'TENB', 'FRSH', 'NEM.DE'];
const mods = 'price,summaryDetail,financialData,defaultKeyStatistics,earningsTrend,recommendationTrend,incomeStatementHistory,balanceSheetHistory,cashflowStatementHistory';
const out = { fecha: new Date().toISOString(), fuente: 'Yahoo Finance quoteSummary', datos: {} };
const v = (o) => (o && typeof o === 'object' ? o.raw ?? null : o ?? null);
for (const t of tickers) {
  try {
    const r = await json(`https://query2.finance.yahoo.com/v10/finance/quoteSummary/${encodeURIComponent(t)}?modules=${mods}`);
    const q = r.quoteSummary.result[0];
    const tr = (q.earningsTrend?.trend || []).map((x) => ({
      periodo: x.period, fin: x.endDate, bpa: v(x.earningsEstimate?.avg), bpa_min: v(x.earningsEstimate?.low), bpa_max: v(x.earningsEstimate?.high),
      n: v(x.earningsEstimate?.numberOfAnalysts), ventas: v(x.revenueEstimate?.avg), crec_ventas: v(x.revenueEstimate?.growth),
      bpa_hace90: v(x.epsTrend?.['90daysAgo']), bpa_hace30: v(x.epsTrend?.['30daysAgo']),
    }));
    const is0 = q.incomeStatementHistory?.incomeStatementHistory?.[0] || {};
    const bs0 = q.balanceSheetHistory?.balanceSheetStatements?.[0] || {};
    out.datos[t] = {
      nombre: q.price?.longName, divisa: q.price?.currency, precio: v(q.price?.regularMarketPrice), hora: v(q.price?.regularMarketTime),
      cierre_previo: v(q.summaryDetail?.previousClose), cap: v(q.price?.marketCap), ev: v(q.defaultKeyStatistics?.enterpriseValue),
      ev_ebitda: v(q.defaultKeyStatistics?.enterpriseToEbitda), ev_ventas: v(q.defaultKeyStatistics?.enterpriseToRevenue),
      ebitda: v(q.financialData?.ebitda), ventas: v(q.financialData?.totalRevenue), fcf: v(q.financialData?.freeCashflow),
      deuda: v(q.financialData?.totalDebt), caja: v(q.financialData?.totalCash), margen_ebitda: v(q.financialData?.ebitdaMargins),
      roe: v(q.financialData?.returnOnEquity), roa: v(q.financialData?.returnOnAssets), crec_ventas_ltm: v(q.financialData?.revenueGrowth),
      per_adelantado: v(q.summaryDetail?.forwardPE), bpa_adelantado: v(q.defaultKeyStatistics?.forwardEps), beta: v(q.summaryDetail?.beta),
      acciones: v(q.defaultKeyStatistics?.sharesOutstanding), corto_pct: v(q.defaultKeyStatistics?.shortPercentOfFloat),
      insiders_pct: v(q.defaultKeyStatistics?.heldPercentInsiders), instituciones_pct: v(q.defaultKeyStatistics?.heldPercentInstitutions),
      po_medio: v(q.financialData?.targetMeanPrice), po_min: v(q.financialData?.targetLowPrice), po_max: v(q.financialData?.targetHighPrice),
      n_analistas: v(q.financialData?.numberOfAnalystOpinions), recomendacion: q.financialData?.recommendationKey,
      reco: q.recommendationTrend?.trend?.[0] ?? null, trend: tr,
      ebit_ultimo: v(is0.ebit) ?? v(is0.operatingIncome), impuestos_ultimo: v(is0.incomeTaxExpense), bai_ultimo: v(is0.incomeBeforeTax), fecha_ultimo: is0.endDate?.fmt ?? null,
      patrimonio_ultimo: v(bs0.totalStockholderEquity),
    };
    console.log(t, out.datos[t].precio, out.datos[t].divisa, out.datos[t].per_adelantado, out.datos[t].ev_ebitda);
  } catch (e) { console.log(t, 'ERROR', e.message); }
}
// Tipo de cambio EUR/USD (Yahoo EURUSD=X)
try {
  const r = await json('https://query2.finance.yahoo.com/v10/finance/quoteSummary/EURUSD%3DX?modules=price');
  out.eurusd = v(r.quoteSummary.result[0].price.regularMarketPrice);
} catch (e) { out.eurusd = null; }
fs.writeFileSync(path.join(dir, 'yahoo-datos.json'), JSON.stringify(out, null, 1));
console.log('EURUSD', out.eurusd);
