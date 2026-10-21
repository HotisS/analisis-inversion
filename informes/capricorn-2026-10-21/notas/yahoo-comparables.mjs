// Datos de Yahoo Finance (quoteSummary) de los comparables de Capricorn Metals, cierre de Sídney del 21-oct-2026: caja, deuda, FCF, márgenes,
// divisa de las cuentas y estimaciones (para pasar todo a millones de USD). Guarda notas/yahoo-comparables.json.
// Ejecutar: NODE_USE_ENV_PROXY=1 node informes/capricorn-2026-10-21/notas/yahoo-comparables.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { json } from '../../../herramientas/yahoo.mjs';
const dir = path.dirname(fileURLToPath(import.meta.url));
const tickers = ['CMM.AX', 'NST.AX', 'EVN.AX', 'PRU.AX', 'RMS.AX', 'GMD.AX', 'RRL.AX', 'WGX.AX', 'VAU.AX', 'EMR.AX', 'GGP.AX', 'BGL.AX'];
const mods = 'price,summaryDetail,financialData,defaultKeyStatistics,earningsTrend,incomeStatementHistory';
const v = (o) => (o && typeof o === 'object' ? o.raw ?? null : o ?? null);
const out = { fecha: new Date().toISOString(), fuente: 'Yahoo Finance quoteSummary', datos: {} };
for (const t of tickers) {
  try {
    const q = (await json(`https://query2.finance.yahoo.com/v10/finance/quoteSummary/${encodeURIComponent(t)}?modules=${mods}`)).quoteSummary.result[0];
    out.datos[t] = {
      nombre: q.price?.longName, divisa: q.price?.currency, divisa_cuentas: q.financialData?.financialCurrency, precio: v(q.price?.regularMarketPrice),
      cap: v(q.price?.marketCap), caja: v(q.financialData?.totalCash), deuda: v(q.financialData?.totalDebt), ebitda: v(q.financialData?.ebitda),
      ventas: v(q.financialData?.totalRevenue), fcf: v(q.financialData?.freeCashflow), ebit_hist: (q.incomeStatementHistory?.incomeStatementHistory||[]).map((x)=>[x.endDate?.fmt, v(x.totalRevenue), v(x.ebit), v(x.netIncome)]), margen_ebitda: v(q.financialData?.ebitdaMargins),
      roe: v(q.financialData?.returnOnEquity), per_adelantado: v(q.summaryDetail?.forwardPE), bpa_adelantado: v(q.defaultKeyStatistics?.forwardEps),
      trend: (q.earningsTrend?.trend || []).filter((x) => /y$/.test(x.period)).map((x) => ({ p: x.period, fin: x.endDate, bpa: v(x.earningsEstimate?.avg), ventas: v(x.revenueEstimate?.avg), crec: v(x.revenueEstimate?.growth) })),
    };
    console.log(t, JSON.stringify(out.datos[t]).slice(0, 400));
  } catch (e) { console.log(t, 'ERROR', e.message); }
}
fs.writeFileSync(path.join(dir, 'yahoo-comparables.json'), JSON.stringify(out, null, 1));
