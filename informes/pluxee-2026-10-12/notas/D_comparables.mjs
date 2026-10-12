// Comparables de Pluxee: MarketScreener (estimaciones, 12-oct-2026) + acciones de Stock Analysis + cierre del 9-oct-2026.
const fx = 1.1206; // USD por EUR, BCE 9-oct-2026
const e = [
  // div, acciones (M), cierre, ventas 25/26/27, ebitda 25/26/27, bpa 26/27, dn 25 (o dn usada), fcf25, roic
  { nombre: 'Edenred', ticker: 'EDEN.PA', pais: 'FR', usd: false, acc: 230.82, p: 28.25, v: [2961, 2962, 3145], eb: [1360, 1254, 1350], bpa: [1.833, 2.145], dn: 1241, fcf: 1111, roic: 18.48 },
  { nombre: 'Corpay', ticker: 'CPAY', pais: 'US', usd: true, acc: 65.66, p: 397.92, v: [4528, 5320, 5783], eb: [2347, 2766, 3078], bpa: [19.94, 24.65], dn: 5682, fcf: 1299, roic: 14.55 },
  { nombre: 'WEX', ticker: 'WEX', pais: 'US', usd: true, acc: 34.08, p: 172.43, v: [2661, 2896, 2940], eb: [1137, 1252, 1290], bpa: [12.09, 13.34], dn: 3953, fcf: 638, roic: null },
  { nombre: 'Nexi', ticker: 'NEXI.MI', pais: 'IT', usd: false, acc: 1170, p: 4.204, v: [3585, 3646, 3726], eb: [1904, 1894, 1916], bpa: [0.3247, 0.366], dn: 4942, fcf: 806, roic: 7.55 },
  { nombre: 'Adyen', ticker: 'ADYEN.AS', pais: 'NL', usd: false, acc: 31.57, p: 886.10, v: [2364, 2869, 3487], eb: [1246, 1491, 1862], bpa: [38.51, 46.86], dn: -10797, fcf: 1081, roic: 13.38 },
  { nombre: 'Global Payments', ticker: 'GPN', pais: 'US', usd: true, acc: 264.62, p: 82.20, v: [9315, 12347, 13001], eb: [4535, 5778, 6235], bpa: [-4.407, 5.523], dn: 17738, fcf: 2039, roic: 3.93, rota: true },
];
const r1 = x => Math.round(x * 10) / 10, r2 = x => Math.round(x * 100) / 100;
const out = e.map(c => {
  const k = c.usd ? 1 / fx : 1;
  const cap = c.acc * c.p * k, dn = c.dn * k, ev = cap + dn;
  const ltmV = (0.5 * c.v[0] + 0.5 * c.v[1]) * k, ntmV = (0.25 * c.v[1] + 0.75 * c.v[2]) * k;
  const ltmE = (0.5 * c.eb[0] + 0.5 * c.eb[1]) * k, ntmE = (0.25 * c.eb[1] + 0.75 * c.eb[2]) * k;
  const bpaN = 0.25 * c.bpa[0] + 0.75 * c.bpa[1];
  return {
    nombre: c.nombre, ticker: c.ticker, pais: c.pais, capitalizacion: Math.round(cap),
    ev_ventas: r2(ev / (c.rota ? ntmV : ltmV)),
    ev_ebitda_ltm: c.rota ? null : r1(ev / ltmE), ev_ebitda_ntm: r1(ev / ntmE),
    per_ntm: c.bpa[0] < 0 ? null : r1(c.p / bpaN),
    crecimiento_pct: c.rota ? null : r1((Math.pow(ntmV / ltmV, 12 / 15) - 1) * 100),
    margen_ebitda_pct: r1(c.eb[0] / c.v[0] * 100), roic_pct: c.roic,
    dn_ebitda: r2(c.dn / c.eb[0]), fcf_yield_pct: r1(c.fcf * k / cap * 100),
    _ev: Math.round(ev),
  };
});
console.log(JSON.stringify(out, null, 1));
