// Comparables de Munters con datos de Yahoo (fichas de herramientas/yahoo.mjs) pasados a SEK. Uso: NODE_USE_ENV_PROXY=1 node comparables-yahoo.mjs
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ficha, json } from '../../../herramientas/yahoo.mjs';
const DIR = dirname(fileURLToPath(import.meta.url));
const LISTA = [
  ['Vertiv', 'VRT', 'US'], ['Trane Technologies', 'TT', 'IE'], ['Carrier Global', 'CARR', 'US'], ['Johnson Controls', 'JCI', 'IE'],
  ['Modine Manufacturing', 'MOD', 'US'], ['AAON', 'AAON', 'US'], ['Systemair', 'SYSR.ST', 'SE'], ['Nibe Industrier', 'NIBE-B.ST', 'SE'],
  ['Alfa Laval', 'ALFA.ST', 'SE'], ['Lennox International', 'LII', 'US'], ['Munters', 'MTRS.ST', 'SE'],
];
const fx = {};
async function aSek(d) {
  if (d === 'SEK') return 1;
  if (fx[d]) return fx[d];
  const r = await json(`https://query1.finance.yahoo.com/v8/finance/chart/${d}SEK=X?range=5d&interval=1d`);
  fx[d] = r?.chart?.result?.[0]?.meta?.regularMarketPrice;
  return fx[d];
}
const out = [];
for (const [nombre, t, pais] of LISTA) {
  try {
    const f = await ficha(t, { diasCache: 0 });
    const k = await aSek(f.divisa_cuentas || f.divisa);
    const kc = await aSek(f.divisa);
    const anios = Object.keys(f.anual).sort();
    const u = f.anual[anios.at(-1)] || {};
    const cap = f.capitalizacion * kc / 1e6;
    const dn = (u.NetDebt ?? ((u.TotalDebt ?? 0) - (u.CashAndCashEquivalents ?? 0))) * k / 1e6;
    const ev = cap + dn;
    const ebitda = (f.ultimos12.EBITDA ?? u.EBITDA) * k / 1e6;
    const ventas = (f.ultimos12.TotalRevenue ?? u.TotalRevenue) * k / 1e6;
    const ebit = (u.EBIT ?? 0) * k / 1e6, tasa = u.TaxRateForCalcs ?? 0.25, ic = (u.InvestedCapital ?? 0) * k / 1e6;
    const r1 = (x, n = 1) => (Number.isFinite(x) ? Math.round(x * 10 ** n) / 10 ** n : null);
    out.push({ nombre, ticker: t.replace(/\.ST$/, ''), pais, capitalizacion: Math.round(cap), ev_ventas: r1(ev / ventas, 2), ev_ebitda_ltm: r1(ev / ebitda), ev_ebitda_ntm: null,
      per_ntm: r1(f.per_adelantado), crecimiento_pct: null, margen_ebitda_pct: r1((u.EBITDA / u.TotalRevenue) * 100), roic_pct: ic > 0 ? r1(ebit * (1 - tasa) / ic * 100) : null,
      dn_ebitda: r1(dn / ebitda, 2), fcf_yield_pct: r1(((f.ultimos12.FreeCashFlow ?? u.FreeCashFlow) * k / 1e6) / cap * 100),
      _precio: f.precio, _divisa: f.divisa, _objetivo: f.objetivo_medio, _n: f.n_analistas, _rec: f.recomendacion, _beta: f.beta });
  } catch (e) { console.error(t, e.message); }
}
writeFileSync(join(DIR, 'comparables-yahoo.json'), JSON.stringify({ fecha: new Date().toISOString().slice(0, 10), fx, empresas: out }, null, 1));
console.table(out.map(({ nombre, capitalizacion, ev_ebitda_ltm, per_ntm, margen_ebitda_pct, roic_pct, dn_ebitda, _objetivo, _n }) => ({ nombre, capitalizacion, ev_ebitda_ltm, per_ntm, margen_ebitda_pct, roic_pct, dn_ebitda, _objetivo, _n })));
console.log(fx);
