// Datos de Yahoo Finance (quoteSummary) para Viper Energy y sus comparables, y curva de futuros de WTI y Henry Hub. Corte 2026-10-21 (cierre del 20-oct-2026).
// Guarda notas/yahoo-datos.json. Ejecutar: NODE_USE_ENV_PROXY=1 node informes/viper-2026-10-21/notas/yahoo-datos.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { json } from '../../../herramientas/yahoo.mjs';

const dir = path.dirname(fileURLToPath(import.meta.url));
const tickers = ['VNOM', 'FANG', 'TPL', 'BSM', 'KRP', 'DMLP', 'PSK.TO', 'FRU.TO', 'NOG', 'SBR', 'PBT', 'EOG'];
const futuros = ['CL=F', 'CLZ26.NYM', 'CLF27.NYM', 'CLM27.NYM', 'CLZ27.NYM', 'CLZ28.NYM', 'CLZ29.NYM', 'NG=F', 'NGZ27.NYM', 'NGZ28.NYM', 'BZ=F'];
const mods = 'price,summaryDetail,financialData,defaultKeyStatistics,earningsTrend,recommendationTrend';
const out = { fecha: new Date().toISOString(), fuente: 'Yahoo Finance quoteSummary', datos: {}, futuros: {} };
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
    out.datos[t] = {
      nombre: q.price?.longName, divisa: q.price?.currency, precio: v(q.price?.regularMarketPrice), hora: v(q.price?.regularMarketTime),
      cierre_previo: v(q.summaryDetail?.previousClose), cap: v(q.price?.marketCap), ev: v(q.defaultKeyStatistics?.enterpriseValue),
      ev_ebitda: v(q.defaultKeyStatistics?.enterpriseToEbitda), ebitda: v(q.financialData?.ebitda), ventas: v(q.financialData?.totalRevenue),
      crec_ventas: v(q.financialData?.revenueGrowth), margen_ebitda: v(q.financialData?.ebitdaMargins), fcf: v(q.financialData?.freeCashflow),
      deuda: v(q.financialData?.totalDebt), caja: v(q.financialData?.totalCash), roe: v(q.financialData?.returnOnEquity),
      per_ltm: v(q.summaryDetail?.trailingPE), per_adelantado: v(q.summaryDetail?.forwardPE), bpa_adelantado: v(q.defaultKeyStatistics?.forwardEps), beta: v(q.summaryDetail?.beta),
      rent_div: v(q.summaryDetail?.dividendYield), acciones: v(q.defaultKeyStatistics?.sharesOutstanding), corto_pct: v(q.defaultKeyStatistics?.shortPercentOfFloat),
      insiders_pct: v(q.defaultKeyStatistics?.heldPercentInsiders), instituciones_pct: v(q.defaultKeyStatistics?.heldPercentInstitutions),
      po_medio: v(q.financialData?.targetMeanPrice), po_min: v(q.financialData?.targetLowPrice), po_max: v(q.financialData?.targetHighPrice),
      n_analistas: v(q.financialData?.numberOfAnalystOpinions), recomendacion: q.financialData?.recommendationKey,
      reco: q.recommendationTrend?.trend?.[0] ?? null, reco_3m: q.recommendationTrend?.trend?.[3] ?? null, trend: tr,
    };
    console.log(t, out.datos[t].precio, out.datos[t].divisa, 'PER adel.', out.datos[t].per_adelantado, 'EV/EBITDA', out.datos[t].ev_ebitda);
  } catch (e) { console.log(t, 'ERROR', e.message); }
}
for (const t of futuros) {
  try {
    const r = await json(`https://query2.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(t)}?range=5d&interval=1d`);
    const m = r.chart.result[0];
    const c = m.indicators.quote[0].close;
    const ts = m.timestamp.map((x) => new Date(x * 1000).toISOString().slice(0, 10));
    out.futuros[t] = { ultimo: m.meta.regularMarketPrice, hora: new Date(m.meta.regularMarketTime * 1000).toISOString(), cierres: ts.map((d, i) => [d, c[i]]) };
    console.log(t, m.meta.regularMarketPrice, ts.map((d, i) => `${d}:${c[i]?.toFixed(2)}`).join(' '));
  } catch (e) { console.log(t, 'ERROR', e.message); }
}
fs.writeFileSync(path.join(dir, 'yahoo-datos.json'), JSON.stringify(out, null, 1));
