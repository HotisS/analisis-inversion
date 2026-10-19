// Descarga de Yahoo Finance (quoteSummary) las fichas de APR y de sus comparables a la fecha de corte
// (19-oct-2026) y las guarda en comparables-yahoo-raw.json. Ejecutar: NODE_USE_ENV_PROXY=1 node informes/apr-2026-10-19/notas/comparables-yahoo.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { json } from '../../../herramientas/yahoo.mjs';

const dir = path.dirname(fileURLToPath(import.meta.url));
const SIMBOLOS = ['278470.KS', '483650.KS', '090430.KS', '051900.KS', '257720.KQ', '018290.KQ', '237880.KQ', '161890.KS', '192820.KS', '214150.KQ', 'ELF', 'OR.PA', '4911.T', 'KRW=X', 'JPYKRW=X', 'EURKRW=X'];
const MOD = 'price,summaryDetail,financialData,defaultKeyStatistics,earningsTrend';
const v = (x) => (x && typeof x === 'object' ? (x.raw ?? null) : x ?? null);
const out = [];
for (const s of SIMBOLOS) {
  try {
    const r = await json(`https://query2.finance.yahoo.com/v10/finance/quoteSummary/${encodeURIComponent(s)}?modules=${MOD}`);
    const q = r?.quoteSummary?.result?.[0] ?? {};
    const p = q.price ?? {}, sd = q.summaryDetail ?? {}, fd = q.financialData ?? {}, ks = q.defaultKeyStatistics ?? {};
    out.push({
      s, name: p.shortName ?? p.longName ?? null, cur: p.currency ?? null, fcur: fd.financialCurrency ?? null,
      price: v(p.regularMarketPrice), time: v(p.regularMarketTime), mcap: v(p.marketCap), ev: v(ks.enterpriseValue),
      evRev: v(ks.enterpriseToRevenue), evEbitda: v(ks.enterpriseToEbitda), fpe: v(sd.forwardPE), tpe: v(sd.trailingPE),
      rev: v(fd.totalRevenue), ebitda: v(fd.ebitda), ebitdaM: v(fd.ebitdaMargins), opM: v(fd.operatingMargins), revG: v(fd.revenueGrowth),
      cash: v(fd.totalCash), debt: v(fd.totalDebt), fcf: v(fd.freeCashflow), roe: v(fd.returnOnEquity), tgt: v(fd.targetMeanPrice),
      nA: v(fd.numberOfAnalystOpinions), rec: fd.recommendationKey ?? null, beta: v(ks.beta), shares: v(ks.sharesOutstanding),
      et: (q.earningsTrend?.trend ?? []).map((t) => ({ p: t.period, end: t.endDate, eps: v(t.earningsEstimate?.avg), rev: v(t.revenueEstimate?.avg), n: v(t.earningsEstimate?.numberOfAnalysts), g: v(t.growth) })),
    });
    console.log('ok', s, p.shortName);
  } catch (e) { console.log('fallo', s, e.message); out.push({ s, error: e.message }); }
}
fs.writeFileSync(path.join(dir, 'comparables-yahoo-raw.json'), JSON.stringify(out, null, 1) + '\n');
