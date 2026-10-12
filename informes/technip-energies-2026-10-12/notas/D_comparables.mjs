// Subagente D: comparables de Technip Energies a partir de MarketScreener (12-oct-2026) y BCE (9-oct-2026).
// LTM ≈ oct-25 a sep-26 y NTM ≈ oct-26 a sep-27, ponderando los ejercicios del mismo proveedor (estimación propia).
const fx = { EUR: 1, USD: 1.1206, JPY: 177.34, KRW: 1503.27, AUD: 1.6052, NOK: 10.7155 };
// a = último ejercicio cerrado, b = siguiente, c = el otro; wL = peso de a en LTM (resto b); wN = peso de b en NTM (resto c)
const C = [
  { nombre: 'Saipem', ticker: 'SPM', pais: 'IT', div: 'EUR', precio: 4.57, acc: 1940.283, wL: 0.25, wN: 0.25,
    v: [15497, 15632, 15933], e: [1716, 1798, 2084], ni: [310, 313.7, 608.9], fcf: [1241, 1275, 1279], dn: 498 },
  { nombre: 'Técnicas Reunidas', ticker: 'TRE', pais: 'ES', div: 'EUR', precio: 26.64, acc: 78.1, wL: 0.25, wN: 0.25,
    v: [6466, 6603, 6766], e: [329.7, 358.1, 447.7], ni: [156.7, 177.2, 254], fcf: [125.6, 194.4, 238.2], dn: -332 },
  { nombre: 'KBR', ticker: 'KBR', pais: 'US', div: 'USD', precio: 35.34, acc: 126.068, wL: 0.25, wN: 0.25,
    v: [7786, 8048, 8507], e: [968, 1003, 1001], ni: [415, 448.3, 479.1], fcf: [515, 346.8, 422.1], dn: 2096 },
  { nombre: 'Fluor', ticker: 'FLR', pais: 'US', div: 'USD', precio: 50.68, acc: 133.741, wL: 0.25, wN: 0.25,
    v: [15503, 16672, 18327], e: [-299, 517.6, 612.7], ni: [-51, 507.2, 434.2], fcf: [-437, 148, 345.2], dn: -1124, sinLTM: true },
  { nombre: 'JGC Holdings', ticker: '1963', pais: 'JP', div: 'JPY', precio: 2159.5, acc: 241.85, wL: 0.5, wN: 0.5,
    v: [745280, 721000, 775580], e: [46720, 57587, 60018], ni: [41842, 44777, 41862], fcf: [62309, 46507, 32618], dn: -365294 },
  { nombre: 'Samsung E&A', ticker: '028050', pais: 'KR', div: 'KRW', precio: 48250, acc: 196.0, wL: 0.25, wN: 0.25,
    v: [9029000, 10702000, 12773000], e: [874200, 1056000, 1252000], ni: [617500, 751600, 938400], fcf: [200941, 828680, 1071140], dn: -2872000 },
  { nombre: 'Worley', ticker: 'WOR', pais: 'AU', div: 'AUD', precio: 9.44, acc: 487.537, wL: 0.75, wN: 0.75,
    v: [12023, 12453, 13093], e: [920, 948.8, 1034], ni: [238, 342.8, 418.9], fcf: [338, 465, 472], dn: 1746 },
  { nombre: 'Aker Solutions', ticker: 'AKSO', pais: 'NO', div: 'NOK', precio: 41.26, acc: 486.053, wL: 0.25, wN: 0.25,
    v: [63202, 53870, 40837], e: [5284, 4798, 3503], ni: [2547, 2975, 1698], fcf: [2116, 2985, 2128], dn: -580 },
];
const r1 = (x) => (x == null || !isFinite(x) ? null : Math.round(x * 10) / 10);
const r2 = (x) => (x == null || !isFinite(x) ? null : Math.round(x * 100) / 100);
const out = C.map((c) => {
  const ltm = (k) => c.wL * c[k][0] + (1 - c.wL) * c[k][1];
  const ntm = (k) => c.wN * c[k][1] + (1 - c.wN) * c[k][2];
  const cap = c.precio * c.acc; // millones de divisa local
  const ev = cap + c.dn;
  const eL = ltm('e'), eN = ntm('e');
  return {
    nombre: c.nombre, ticker: c.ticker, pais: c.pais,
    capitalizacion: Math.round(cap / fx[c.div]),
    ev_ventas: r2(ev / ltm('v')),
    ev_ebitda_ltm: c.sinLTM ? null : r1(ev / eL),
    ev_ebitda_ntm: r1(ev / eN),
    per_ntm: r1(cap / ntm('ni')),
    crecimiento_pct: r1((ntm('v') / ltm('v') - 1) * 100),
    margen_ebitda_pct: c.e[0] > 0 ? r1((c.e[0] / c.v[0]) * 100) : null,
    roic_pct: null,
    dn_ebitda: c.sinLTM ? null : r1(c.dn / eL),
    fcf_yield_pct: r1(((c.div === 'KRW' ? ntm('fcf') / 1000 * 1000 : ntm('fcf')) / cap) * 100),
    _ev_eur: Math.round(ev / fx[c.div]),
  };
});
console.log(JSON.stringify(out, null, 1));
const med = (a) => { const s = a.filter((x) => x != null).sort((x, y) => x - y); const m = s.length >> 1; return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };
for (const k of ['ev_ventas', 'ev_ebitda_ltm', 'ev_ebitda_ntm', 'per_ntm', 'crecimiento_pct', 'margen_ebitda_pct', 'fcf_yield_pct']) console.log(k, 'mediana', med(out.map((o) => o[k])));
