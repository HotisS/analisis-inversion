// D: consenso de PM tras los resultados del 3T26 y reacción del precio (premercado o sesión), 21-oct-2026.
// Ejecutar: NODE_USE_ENV_PROXY=1 node informes/philip-morris-2026-10-21/notas/D-yahoo-hoy.mjs [sufijo]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { json } from '../../../herramientas/yahoo.mjs';

const dir = path.dirname(fileURLToPath(import.meta.url));
const suf = process.argv[2] || 'hoy';
const v = (o) => (o && typeof o === 'object' ? o.raw ?? null : o ?? null);
const out = { fecha: new Date().toISOString(), fuente: 'Yahoo Finance quoteSummary', datos: {} };
for (const t of ['PM', 'MO', 'BTI']) {
  const r = await json(`https://query2.finance.yahoo.com/v10/finance/quoteSummary/${t}?modules=price,summaryDetail,financialData,defaultKeyStatistics,earningsTrend,recommendationTrend,upgradeDowngradeHistory,earningsHistory`);
  const q = r.quoteSummary.result[0];
  const p = q.price || {};
  out.datos[t] = {
    estado_mercado: p.marketState,
    precio: v(p.regularMarketPrice), hora: v(p.regularMarketTime) ? new Date(v(p.regularMarketTime) * 1000).toISOString() : null,
    var_pct: v(p.regularMarketChangePercent), cierre_previo: v(q.summaryDetail?.previousClose),
    premercado: v(p.preMarketPrice), premercado_var_pct: v(p.preMarketChangePercent),
    premercado_hora: v(p.preMarketTime) ? new Date(v(p.preMarketTime) * 1000).toISOString() : null,
    volumen: v(p.regularMarketVolume),
    po_medio: v(q.financialData?.targetMeanPrice), po_min: v(q.financialData?.targetLowPrice), po_max: v(q.financialData?.targetHighPrice),
    n_analistas: v(q.financialData?.numberOfAnalystOpinions), reco: q.recommendationTrend?.trend?.[0] ?? null,
    trend: (q.earningsTrend?.trend || []).map((x) => ({
      periodo: x.period, fin: x.endDate, bpa: v(x.earningsEstimate?.avg), bpa_min: v(x.earningsEstimate?.low), bpa_max: v(x.earningsEstimate?.high),
      n: v(x.earningsEstimate?.numberOfAnalysts), ventas: v(x.revenueEstimate?.avg), bpa_hoy: v(x.epsTrend?.current), bpa_hace7: v(x.epsTrend?.['7daysAgo']),
      bpa_hace30: v(x.epsTrend?.['30daysAgo']), bpa_hace90: v(x.epsTrend?.['90daysAgo']),
    })),
    historia_bpa: (q.earningsHistory?.history || []).map((x) => ({ fecha: v(x.quarter), real: v(x.epsActual), estimado: v(x.epsEstimate), sorpresa_pct: v(x.surprisePercent) })),
    cambios_reco: (q.upgradeDowngradeHistory?.history || []).slice(0, 12).map((x) => ({ fecha: new Date(x.epochGradeDate * 1000).toISOString().slice(0, 10), firma: x.firm, de: x.fromGrade, a: x.toGrade, accion: x.action, po: x.currentPriceTarget ?? null, po_previo: x.priorPriceTarget ?? null })),
  };
}
fs.writeFileSync(path.join(dir, `D-yahoo-${suf}.json`), JSON.stringify(out, null, 1));
console.log(JSON.stringify(out.datos.PM, null, 1));
for (const t of ['MO', 'BTI']) console.log(t, out.datos[t].premercado, out.datos[t].premercado_var_pct, out.datos[t].precio, out.datos[t].var_pct);
