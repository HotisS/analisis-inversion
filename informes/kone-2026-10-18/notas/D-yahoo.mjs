// D: datos de Yahoo (quoteSummary) de KONE y comparables, para contraste del consenso y tabla de comparables.
import { json } from '../../../herramientas/yahoo.mjs';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const dir = dirname(fileURLToPath(import.meta.url));
const simbolos = process.argv.slice(2);
const mods = 'price,summaryDetail,defaultKeyStatistics,financialData,earningsTrend,recommendationTrend,incomeStatementHistory';
const out = {};
for (const s of simbolos) {
  try {
    const j = await json(`https://query2.finance.yahoo.com/v10/finance/quoteSummary/${encodeURIComponent(s)}?modules=${mods}`);
    const r = j?.quoteSummary?.result?.[0];
    if (!r) { out[s] = { error: JSON.stringify(j).slice(0, 200) }; continue; }
    const v = (x) => (x && typeof x === 'object' && 'raw' in x ? x.raw : x ?? null);
    const fd = r.financialData || {}, ks = r.defaultKeyStatistics || {}, sd = r.summaryDetail || {}, p = r.price || {};
    out[s] = {
      nombre: p.longName, divisa: p.currency, divisa_financiera: fd.financialCurrency, precio: v(p.regularMarketPrice), hora: v(p.regularMarketTime),
      capitalizacion: v(p.marketCap), ev: v(ks.enterpriseValue), ev_ventas: v(ks.enterpriseToRevenue), ev_ebitda: v(ks.enterpriseToEbitda),
      per_adelantado: v(sd.forwardPE) ?? v(ks.forwardPE), per_ltm: v(sd.trailingPE), bpa_adelantado: v(ks.forwardEps), bpa_ltm: v(ks.trailingEps),
      ventas_ltm: v(fd.totalRevenue), ebitda_ltm: v(fd.ebitda), margen_ebitda: v(fd.ebitdaMargins), deuda: v(fd.totalDebt), caja: v(fd.totalCash),
      fcf: v(fd.freeCashflow), objetivo_medio: v(fd.targetMeanPrice), objetivo_max: v(fd.targetHighPrice), objetivo_min: v(fd.targetLowPrice),
      n_analistas: v(fd.numberOfAnalystOpinions), recomendacion: fd.recommendationKey, beta: v(sd.beta),
      tendencia: (r.earningsTrend?.trend || []).map((t) => ({ periodo: t.period, fin: t.endDate, bpa: v(t.earningsEstimate?.avg), n: v(t.earningsEstimate?.numberOfAnalysts), ventas: v(t.revenueEstimate?.avg), bpa_hace90d: v(t.epsTrend?.['90daysAgo']), bpa_hace30d: v(t.epsTrend?.['30daysAgo']), crec_ventas: v(t.revenueEstimate?.growth) })),
      recomendaciones: r.recommendationTrend?.trend?.[0] || null,
    };
  } catch (e) { out[s] = { error: String(e) }; }
}
writeFileSync(join(dir, 'D-yahoo.json'), JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));
