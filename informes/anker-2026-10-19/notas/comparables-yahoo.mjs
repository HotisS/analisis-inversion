// Comparables de Anker Innovations con datos de Yahoo (fichas de herramientas/yahoo.mjs + earningsTrend), pasados a CNY.
// Uso: NODE_USE_ENV_PROXY=1 node informes/anker-2026-10-19/notas/comparables-yahoo.mjs
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ficha, json } from '../../../herramientas/yahoo.mjs';
const DIR = dirname(fileURLToPath(import.meta.url));
const LISTA = [
  ['Anker (control)', '300866.SZ', 'CN'], ['Anker H (control)', '0668.HK', 'CN'],
  ['Ugreen Group', '301606.SZ', 'CN'], ['Ecovacs Robotics', '603486.SS', 'CN'], ['Roborock', '688169.SS', 'CN'], ['Xiaomi', '1810.HK', 'CN'],
  ['Edifier', '002351.SZ', 'CN'], ['Logitech', 'LOGI', 'CH'], ['Garmin', 'GRMN', 'CH'], ['SharkNinja', 'SN', 'US'], ['Sonos', 'SONO', 'US'], ['Arlo Technologies', 'ARLO', 'US'],
];
const fx = {};
async function aCny(d) {
  if (!d || d === 'CNY') return 1;
  if (fx[d]) return fx[d];
  const r = await json(`https://query1.finance.yahoo.com/v8/finance/chart/${d}CNY=X?range=5d&interval=1d`);
  fx[d] = r?.chart?.result?.[0]?.meta?.regularMarketPrice;
  return fx[d];
}
const r1 = (x, n = 1) => (Number.isFinite(x) ? Math.round(x * 10 ** n) / 10 ** n : null);
const out = [];
for (const [nombre, t, pais] of LISTA) {
  try {
    const f = await ficha(t, { diasCache: 0 });
    const k = await aCny(f.divisa_cuentas || f.divisa);
    const kc = await aCny(f.divisa);
    const anios = Object.keys(f.anual).sort();
    const u = f.anual[anios.at(-1)] || {};
    const cap = f.capitalizacion * kc / 1e6;
    const dn = (u.NetDebt ?? ((u.TotalDebt ?? 0) - (u.CashAndCashEquivalents ?? 0) - (u.OtherShortTermInvestments ?? 0))) * k / 1e6;
    const ev = cap + dn;
    const ebitda = (f.ultimos12.EBITDA ?? u.EBITDA) * k / 1e6;
    const ventas = (f.ultimos12.TotalRevenue ?? u.TotalRevenue) * k / 1e6;
    const ebit = (u.EBIT ?? 0) * k / 1e6, tasa = u.TaxRateForCalcs ?? 0.25, ic = (u.InvestedCapital ?? 0) * k / 1e6;
    // earningsTrend: BPA y ventas de este ejercicio y el siguiente; NTM = ponderación por meses que quedan
    const et = await json(`https://query2.finance.yahoo.com/v10/finance/quoteSummary/${encodeURIComponent(t)}?modules=earningsTrend`);
    const tr = et?.quoteSummary?.result?.[0]?.earningsTrend?.trend || [];
    const v = (o) => (o && typeof o === 'object' ? o.raw ?? null : o ?? null);
    const y0 = tr.find((x) => x.period === '0y'), y1 = tr.find((x) => x.period === '+1y');
    const fin0 = y0?.endDate ? new Date(y0.endDate) : null;
    const hoy = new Date('2026-10-19');
    const w0 = fin0 ? Math.max(0, Math.min(1, (fin0 - hoy) / (365 * 864e5))) : 0;
    const eps0 = v(y0?.earningsEstimate?.avg), eps1 = v(y1?.earningsEstimate?.avg);
    const rev0 = v(y0?.revenueEstimate?.avg), rev1 = v(y1?.revenueEstimate?.avg);
    const epsNtm = eps0 != null && eps1 != null ? w0 * eps0 + (1 - w0) * eps1 : null;
    const revNtm = rev0 != null && rev1 != null ? w0 * rev0 + (1 - w0) * rev1 : null;
    const precioEnCuentas = f.precio * kc / k; // precio en la divisa de las cuentas (BPA de Yahoo va en la de las cuentas)
    const perNtm = epsNtm > 0 ? precioEnCuentas / epsNtm : null;
    const ventasLtmLocal = (f.ultimos12.TotalRevenue ?? u.TotalRevenue);
    const crec = revNtm && ventasLtmLocal ? (revNtm / ventasLtmLocal - 1) * 100 : null;
    out.push({ nombre, ticker: t, pais, capitalizacion: Math.round(cap), ev_ventas: r1(ev / ventas, 2), ev_ebitda_ltm: r1(ev / ebitda), ev_ebitda_ntm: null,
      per_ntm: r1(perNtm ?? f.per_adelantado), crecimiento_pct: r1(crec), margen_ebitda_pct: r1((u.EBITDA / u.TotalRevenue) * 100), roic_pct: ic > 0 ? r1(ebit * (1 - tasa) / ic * 100) : null,
      dn_ebitda: r1(dn / ebitda, 2), fcf_yield_pct: r1(((f.ultimos12.FreeCashFlow ?? u.FreeCashFlow) * k / 1e6) / cap * 100),
      _precio: f.precio, _divisa: f.divisa, _cuentas: f.divisa_cuentas, _eps0y: eps0, _eps1y: eps1, _fin0y: y0?.endDate, _rev0y: rev0, _rev1y: rev1,
      _n0y: v(y0?.earningsEstimate?.numberOfAnalysts), _eps0y_hace90: v(y0?.epsTrend?.['90daysAgo']), _eps1y_hace90: v(y1?.epsTrend?.['90daysAgo']),
      _ventas_ltm_m: r1(ventas, 0), _ebitda_ltm_m: r1(ebitda, 0), _dn_m: r1(dn, 0), _anio_balance: anios.at(-1),
      _objetivo: f.objetivo_medio, _n: f.n_analistas, _rec: f.recomendacion, _beta: f.beta, _fecha: f.fecha });
  } catch (e) { console.error(t, e.message); }
}
writeFileSync(join(DIR, 'comparables-yahoo.json'), JSON.stringify({ fecha: new Date().toISOString(), fx_cny: fx, empresas: out }, null, 1));
console.table(out.map(({ nombre, capitalizacion, ev_ventas, ev_ebitda_ltm, per_ntm, crecimiento_pct, margen_ebitda_pct, roic_pct, dn_ebitda, _eps0y, _eps1y, _objetivo, _n }) => ({ nombre, capitalizacion, ev_ventas, ev_ebitda_ltm, per_ntm, crecimiento_pct, margen_ebitda_pct, roic_pct, dn_ebitda, _eps0y, _eps1y, _objetivo, _n })));
console.log(fx);
