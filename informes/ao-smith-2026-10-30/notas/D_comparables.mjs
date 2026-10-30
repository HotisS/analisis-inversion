// Nota D: comparables de A. O. Smith con Yahoo a la misma fecha (cierre del 29-oct-2026).
// Uso: NODE_USE_ENV_PROXY=1 node informes/ao-smith-2026-10-30/notas/D_comparables.mjs AOS WTS PNR ...
import { json, ficha } from '../../../herramientas/yahoo.mjs';
import { writeFileSync } from 'node:fs';
const BASE = 'https://query2.finance.yahoo.com';
const raw = (o, k) => (o?.[k] && typeof o[k] === 'object' ? o[k].raw ?? null : o?.[k] ?? null);
const fx = {};
async function aUsdTipo(div) {
  if (!div || div === 'USD') return 1;
  if (fx[div]) return fx[div];
  const r = await json(`${BASE}/v8/finance/chart/${div}USD=X?range=5d&interval=1d`);
  const m = r?.chart?.result?.[0]?.meta;
  fx[div] = m?.regularMarketPrice ?? null;
  return fx[div];
}
const salida = {};
for (const s of process.argv.slice(2)) {
  const r = (await json(`${BASE}/v10/finance/quoteSummary/${encodeURIComponent(s)}?modules=earningsTrend,financialData,price,defaultKeyStatistics,summaryDetail`))?.quoteSummary?.result?.[0] || {};
  let f = null;
  try { f = await ficha(s, { diasCache: 0 }); } catch (e) { f = null; }
  const pr = r.price, fd = r.financialData, ks = r.defaultKeyStatistics;
  const t = Object.fromEntries((r.earningsTrend?.trend || []).map((x) => [x.period, x]));
  const eps = (p) => raw(t[p]?.earningsEstimate, 'avg'), rev = (p) => raw(t[p]?.revenueEstimate, 'avg');
  salida[s] = {
    nombre: pr?.longName, divisa: pr?.currency, divisa_cuentas: fd?.financialCurrency, precio: raw(pr, 'regularMarketPrice'),
    hora: new Date((pr?.regularMarketTime || 0) * 1000).toISOString(), mcap: raw(pr, 'marketCap'),
    deuda: raw(fd, 'totalDebt'), caja: raw(fd, 'totalCash'), ventas_ltm: raw(fd, 'totalRevenue'), ebitda_ltm: raw(fd, 'ebitda'),
    fcf: raw(fd, 'freeCashflow'), fcf_operativo: raw(fd, 'operatingCashflow'),
    eps0y: eps('0y'), eps1y: eps('+1y'), fin0y: t['0y']?.endDate, fin1y: t['+1y']?.endDate, n0y: raw(t['0y']?.earningsEstimate, 'numberOfAnalysts'),
    rev0y: rev('0y'), rev1y: rev('+1y'), forwardPE: raw(ks, 'forwardPE'),
    anual: f?.anual || null, ultimos12: f?.ultimos12 || null,
    usd_por_unidad: await aUsdTipo(pr?.currency),
  };
}
writeFileSync(new URL('./docs/D_comparables_yahoo.json', import.meta.url), JSON.stringify({ fecha: new Date().toISOString(), datos: salida }, null, 1));
console.log(Object.entries(salida).map(([k, v]) => `${k} ${v.precio} ${v.divisa} ${v.hora}`).join('\n'));
