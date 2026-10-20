// Cuenta anual (Yahoo quoteSummary incomeStatementHistory) y balance de los comparables de Ensign, corte 2026-10-20.
import fs from 'node:fs'; import path from 'node:path'; import { fileURLToPath } from 'node:url';
import { json } from '../../../herramientas/yahoo.mjs';
const dir = path.dirname(fileURLToPath(import.meta.url));
const t = ['ENSG','PACS','NHC','EHC','SEM','PNTG','ADUS','BKD','CTRE','OHI','OPCH'];
const out = { fecha: new Date().toISOString(), fuente: 'Yahoo Finance quoteSummary (incomeStatementHistory, balanceSheetHistory, cashflowStatementHistory, price, financialData)', datos: {} };
const v = (o) => (o && typeof o === 'object' ? o.raw ?? null : o ?? null);
for (const s of t) {
  try {
    const r = await json(`https://query2.finance.yahoo.com/v10/finance/quoteSummary/${s}?modules=incomeStatementHistory,price,financialData,defaultKeyStatistics,summaryDetail,earningsTrend`);
    const q = r.quoteSummary.result[0];
    const is = (q.incomeStatementHistory?.incomeStatementHistory || []).map(x => ({ fin: x.endDate?.fmt, ventas: v(x.totalRevenue), ebit: v(x.operatingIncome) ?? v(x.ebit), neto: v(x.netIncome) }));
    out.datos[s] = { precio: v(q.price?.regularMarketPrice), cap: v(q.price?.marketCap), ev: v(q.defaultKeyStatistics?.enterpriseValue), ebitda: v(q.financialData?.ebitda), ventas_ltm: v(q.financialData?.totalRevenue), deuda: v(q.financialData?.totalDebt), caja: v(q.financialData?.totalCash), fcf: v(q.financialData?.freeCashflow), roe: v(q.financialData?.returnOnEquity), per_ltm: v(q.summaryDetail?.trailingPE), per_adel: v(q.summaryDetail?.forwardPE), anual: is,
      trend: (q.earningsTrend?.trend || []).filter(x => /y/.test(x.period)).map(x => ({ p: x.period, fin: x.endDate, bpa: v(x.earningsEstimate?.avg), ventas: v(x.revenueEstimate?.avg) })) };
    console.log(s, JSON.stringify(out.datos[s]));
  } catch (e) { console.log(s, 'ERROR', e.message); }
}
fs.writeFileSync(path.join(dir, 'comp-anual.json'), JSON.stringify(out, null, 1));
