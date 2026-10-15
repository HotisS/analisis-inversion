// Descarga de Yahoo (quoteSummary) del consenso de Cencora y de sus comparables. Uso: NODE_USE_ENV_PROXY=1 node yahoo-comps.mjs
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const dir = path.dirname(fileURLToPath(import.meta.url));
const UA = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36' };
const r0 = await fetch('https://fc.yahoo.com', { headers: UA, redirect: 'manual' });
const cookie = (r0.headers.get('set-cookie') || '').split(';')[0];
const crumb = await (await fetch('https://query1.finance.yahoo.com/v1/test/getcrumb', { headers: { ...UA, cookie } })).text();
const get = async (u) => { const r = await fetch(u + (u.includes('?') ? '&' : '?') + 'crumb=' + encodeURIComponent(crumb), { headers: { ...UA, cookie } }); return r.ok ? r.json() : null; };
const v = (o, k) => (o?.[k] && typeof o[k] === 'object' ? o[k].raw ?? null : o?.[k] ?? null);
const tickers = process.argv.slice(2).length ? process.argv.slice(2) : ['COR', 'MCK', 'CAH', 'HSIC', 'OMI', '7459.T', '2784.T', '9987.T', 'GALE.SW', 'PDCO'];
const fx = {};
for (const d of ['JPY', 'CHF', 'EUR', 'BRL', 'AUD', 'HKD']) {
  const j = await get(`https://query1.finance.yahoo.com/v8/finance/chart/${d}USD=X?range=5d&interval=1d`);
  fx[d] = j?.chart?.result?.[0]?.meta?.regularMarketPrice ?? null;
}
fx.USD = 1;
const out = { fecha: new Date().toISOString().slice(0, 10), fx, empresas: [] };
for (const t of tickers) {
  const j = await get(`https://query1.finance.yahoo.com/v10/finance/quoteSummary/${encodeURIComponent(t)}?modules=price,financialData,defaultKeyStatistics,earningsTrend,recommendationTrend,calendarEvents,summaryDetail`);
  const r = j?.quoteSummary?.result?.[0];
  if (!r) { console.log(t, 'sin datos'); continue; }
  const pr = r.price, fd = r.financialData, ks = r.defaultKeyStatistics, sd = r.summaryDetail;
  const tr = (r.earningsTrend?.trend || []).filter((x) => /^[0+]/.test(x.period) && x.period.endsWith('y')).map((x) => ({
    periodo: x.period, fin: x.endDate, eps: v(x.earningsEstimate, 'avg'), eps_bajo: v(x.earningsEstimate, 'low'), eps_alto: v(x.earningsEstimate, 'high'), n_eps: v(x.earningsEstimate, 'numberOfAnalysts'),
    ventas: v(x.revenueEstimate, 'avg'), crec_ventas: v(x.revenueEstimate, 'growth'), eps_hace90: v(x.epsTrend, '90daysAgo'), eps_hace30: v(x.epsTrend, '30daysAgo'),
  }));
  const divisa = pr?.currency;
  const fxu = fx[divisa === 'GBp' ? 'GBP' : divisa] ?? null;
  const precio = v(pr, 'regularMarketPrice');
  // NTM: ponderar ejercicio en curso y siguiente por los meses que quedan del en curso
  let eps_ntm = null, ventas_ntm = null;
  if (tr.length >= 2 && tr[0].fin) {
    const fin0 = new Date(tr[0].fin), hoy = new Date();
    const w = Math.max(0, Math.min(1, (fin0 - hoy) / (365.25 * 86400000)));
    eps_ntm = tr[0].eps != null && tr[1].eps != null ? w * tr[0].eps + (1 - w) * tr[1].eps : null;
    ventas_ntm = tr[0].ventas != null && tr[1].ventas != null ? w * tr[0].ventas + (1 - w) * tr[1].ventas : null;
  }
  const ventas = v(fd, 'totalRevenue'), ebitda = v(fd, 'ebitda'), ev = v(ks, 'enterpriseValue'), mc = v(pr, 'marketCap');
  out.empresas.push({
    ticker: t, nombre: pr?.longName, divisa, precio, hora: v(pr, 'regularMarketTime'), capitalizacion_usd_m: mc && fxu ? mc * fxu / 1e6 : null, ev_usd_m: ev && fxu ? ev * fxu / 1e6 : null,
    ventas_ltm: ventas, ebitda_ltm: ebitda, ev_ventas: ev && ventas ? ev / ventas : null, ev_ebitda_ltm: ev && ebitda ? ev / ebitda : null,
    ev_ebitda_ntm: ev && ebitda && ventas && ventas_ntm ? ev / (ebitda / ventas * ventas_ntm) : null,
    per_ntm: precio && eps_ntm ? precio / eps_ntm : null, per_adelantado_yahoo: v(ks, 'forwardPE'), crecimiento_pct: ventas && ventas_ntm ? (ventas_ntm / ventas - 1) * 100 : null,
    margen_ebitda_pct: ebitda && ventas ? ebitda / ventas * 100 : null, deuda: v(fd, 'totalDebt'), caja: v(fd, 'totalCash'), dn_ebitda: ebitda ? (v(fd, 'totalDebt') - v(fd, 'totalCash')) / ebitda : null,
    fcf_yield_pct: mc ? v(fd, 'freeCashflow') / mc * 100 : null, roe: v(fd, 'returnOnEquity'), objetivo_medio: v(fd, 'targetMeanPrice'), objetivo_min: v(fd, 'targetLowPrice'), objetivo_max: v(fd, 'targetHighPrice'),
    n_analistas: v(fd, 'numberOfAnalystOpinions'), recomendacion: fd?.recommendationKey, recs: r.recommendationTrend?.trend?.[0], beta: v(ks, 'beta'), acciones: v(ks, 'sharesOutstanding'),
    dividendo: v(sd, 'dividendRate'), proximos_resultados: (r.calendarEvents?.earnings?.earningsDate || []).map((x) => x.fmt), tendencia: tr,
  });
  console.log(t, divisa, precio, 'PER ntm', out.empresas.at(-1).per_ntm?.toFixed(1), 'EV/EBITDA', out.empresas.at(-1).ev_ebitda_ltm?.toFixed(1));
}
writeFileSync(path.join(dir, '..', 'comparables-yahoo.json'), JSON.stringify(out, null, 1));
