// Subagente D (Moody's, 21-oct-2026): lleva la tabla de la ficha sectorial (MarketScreener + Stock Analysis,
// cierres del 13-oct EE. UU. / 14-oct Europa) al cierre del 20-oct con la variación de precio de Yahoo
// (deuda neta constante) y sustituye el PER de los próximos 12 meses por el del BPA AJUSTADO de consenso de Yahoo
// (earningsTrend), la misma base que el BPA ajustado de Moody's.
import { readFileSync, writeFileSync } from 'node:fs';

const raiz = new URL('../../../', import.meta.url);
const ficha = JSON.parse(readFileSync(new URL('sectores/bolsas-datos-financieros-2026-10-14-comparables.json', raiz), 'utf8'));
const yc = JSON.parse(readFileSync(new URL('./docs/D-yahoo-comparables.json', import.meta.url), 'utf8'));

async function cierres(s) {
  const r = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(s)}?period1=1791763200&period2=1792627200&interval=1d`, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const j = (await r.json()).chart.result[0];
  const o = {};
  j.timestamp.forEach((t, i) => { o[new Date(t * 1000).toISOString().slice(0, 10)] = j.indicators.quote[0].close[i]; });
  return o;
}
const gbp = await cierres('GBPUSD=X');
console.log('GBPUSD', gbp);
const simb = { SPGI: 'SPGI', MSCI: 'MSCI', ICE: 'ICE', CME: 'CME', NDAQ: 'NDAQ', VRSK: 'VRSK', TRI: 'TRI', LSEG: 'LSEG.L', FDS: 'FDS' };
// Peso del ejercicio en curso en los próximos 12 meses desde el 21-oct-2026.
const pesoAnio0 = { 'LSEG.L': 2.3 / 12, FDS: 10.3 / 12 };
const filas = [];
for (const e of ficha.empresas) {
  if (e.ticker === 'MCO' || !simb[e.ticker]) continue;
  const s = simb[e.ticker];
  const c = await cierres(s);
  const fOld = e.pais === 'GB' ? '2026-10-14' : '2026-10-13';
  const pOld = c[fOld], pNew = c['2026-10-20'];
  const k = pNew / pOld;
  const capOld = e.capitalizacion;
  const evOld = capOld / (1 - e.dn_ebitda / e.ev_ebitda_ltm);
  const dn = evOld - capOld;
  // LSEG: la capitalización de la ficha está en USD a 1,3154; se rehace con el GBPUSD del 20-oct.
  const fx = e.pais === 'GB' ? (gbp['2026-10-20'] / 1.3154) : 1;
  const capNew = capOld * k * fx;
  const evNew = capNew + dn * fx;
  const r = evNew / evOld;
  const y = yc[s];
  const w0 = pesoAnio0[s] ?? 2.3 / 12;
  const bpaNtm = w0 * y.trend[0].bpa + (1 - w0) * y.trend[1].bpa;
  const precioEps = s === 'LSEG.L' ? pNew / 100 : pNew;
  filas.push({
    nombre: e.nombre, ticker: e.ticker, pais: e.pais,
    capitalizacion: Math.round(capNew), ev_ventas: +(e.ev_ventas * r).toFixed(2),
    ev_ebitda_ltm: +(e.ev_ebitda_ltm * r).toFixed(1), ev_ebitda_ntm: +(e.ev_ebitda_ntm * r).toFixed(1),
    per_ntm: +(precioEps / bpaNtm).toFixed(1), crecimiento_pct: e.crecimiento_pct, margen_ebitda_pct: e.margen_ebitda_pct,
    roic_pct: e.roic_pct, dn_ebitda: e.dn_ebitda, fcf_yield_pct: +(e.fcf_yield_pct / (k * (e.pais === 'GB' ? 1 : 1))).toFixed(1),
    _calc: { pOld, pNew, var_pct: +((k - 1) * 100).toFixed(1), bpaNtm: +bpaNtm.toFixed(2), per_ficha: e.per_ntm, per_ficha_llevado: +(e.per_ntm * k).toFixed(1) },
  });
}
writeFileSync(new URL('./docs/D-comparables-calc.json', import.meta.url), JSON.stringify(filas, null, 1));
for (const f of filas) console.log(JSON.stringify(f));
