// Comparables de Novo Nordisk a 8-oct-2026. Stock Analysis (cotización, capitalización, valor empresa,
// últimos 12 meses, ROIC, FCF) + MarketScreener (estimaciones 2026e y 2027e). Todo a DKK con el BCE del 8-oct.
// Próximos 12 meses = 84/365 de 2026e + el resto de 2027e (quedan 84 días de 2026 a la fecha de corte).
const FX = { USD: 7.4739 / 1.1186, CHF: 7.4739 / 0.9326, GBP: 7.4739 / 0.84698, EUR: 7.4739, DKK: 1 };
const w = 84 / 365;
// sa: divisa de la cotización en Stock Analysis; cap, ev, ventas, ebitda, dn (deuda neta) en miles de millones de esa divisa.
// ms: divisa de las cuentas en MarketScreener; ventas, ebitda, bn (beneficio neto) en millones, 2026e y 2027e.
const E = [
  { nombre: 'Eli Lilly', ticker: 'LLY', pais: 'US', sa: { d: 'USD', cap: 1142.0 * 891.36 / 1000, dn: 45.16, ventas: 79.67, ebitda: 41.71, roic: 42.24, fcfy: 1.75 },
    ms: { d: 'USD', v26: 88482, v27: 102281, e26: 43822, e27: 53977, n26: 31599, n27: 40134 } },
  { nombre: 'AstraZeneca', ticker: 'AZN', pais: 'GB', sa: { d: 'USD', cap: 245.10, ev: 272.43, dn: 27.38, ventas: 61.37, ebitda: 20.25, roic: 16.05, fcfy: 4.28 },
    ms: { d: 'USD', v26: 63161, v27: 67050, e26: 22090, e27: 24352, n26: 11903, n27: 13857 } },
  { nombre: 'Roche', ticker: 'ROG', pais: 'CH', sa: { d: 'CHF', cap: 281.94, ev: 309.54, dn: 23.57, ventas: 62.96, ebitda: 23.96, roic: 28.10, fcfy: 5.47 },
    ms: { d: 'CHF', v26: 62908, v27: 65804, e26: 25319, e27: 27279, n26: 14626, n27: 16329 } },
  { nombre: 'Novartis', ticker: 'NOVN', pais: 'CH', sa: { d: 'USD', cap: 269.85, ev: 310.36, dn: 41.40, ventas: 56.69, ebitda: 23.10, roic: 18.78, fcfy: 6.13 },
    ms: { d: 'USD', v26: 57785, v27: 61488, e26: 23338, e27: 25271, n26: 14474, n27: 16096 } },
  { nombre: 'Sanofi', ticker: 'SAN', pais: 'FR', sa: { d: 'USD', cap: 94.99, ev: 114.68, dn: 19.68, ventas: 55.89, ebitda: 15.47, roic: 9.12, fcfy: 11.66 },
    ms: { d: 'EUR', v26: 47767, v27: 50756, e26: 14750, e27: 15691, n26: 7456, n27: 8875 } },
  { nombre: 'Merck & Co', ticker: 'MRK', pais: 'US', sa: { d: 'USD', cap: 344.42, ev: 391.19, dn: 46.77, ventas: 66.57, ebitda: 28.87, roic: 14.05, fcfy: 4.56 },
    ms: { d: 'USD', v26: 67095, v27: 70129, e26: 15729, e27: 33420, n26: 3267, n27: 20384 } },
  { nombre: 'GSK', ticker: 'GSK', pais: 'GB', sa: { d: 'USD', cap: 92.54, ev: 111.98, dn: 20.15, ventas: 44.05, ebitda: 14.35, roic: 26.38, fcfy: 9.63 },
    ms: { d: 'GBP', v26: 33925, v27: 35531, e26: 11638, e27: 12464, n26: 5190, n27: 6212 } },
];
const r = (x, d = 1) => Math.round(x * 10 ** d) / 10 ** d;
const out = E.map(({ nombre, ticker, pais, sa, ms }) => {
  const fs = FX[sa.d], fm = FX[ms.d];
  const cap = sa.cap * 1000 * fs, ev = (sa.ev ?? sa.cap + sa.dn) * 1000 * fs;
  const ventasLtm = sa.ventas * 1000 * fs, ebitdaLtm = sa.ebitda * 1000 * fs;
  const ntm = (a, b) => (w * a + (1 - w) * b) * fm;
  const vN = ntm(ms.v26, ms.v27), eN = ntm(ms.e26, ms.e27), nN = ntm(ms.n26, ms.n27);
  return { nombre, ticker, pais, capitalizacion: Math.round(cap), ev_ventas: r(ev / ventasLtm, 2), ev_ebitda_ltm: r(ev / ebitdaLtm), ev_ebitda_ntm: r(ev / eN),
    per_ntm: r(cap / nN), crecimiento_pct: r((vN / ventasLtm - 1) * 100), margen_ebitda_pct: r(sa.ebitda / sa.ventas * 100), roic_pct: sa.roic,
    dn_ebitda: r(sa.dn / sa.ebitda, 2), fcf_yield_pct: sa.fcfy, _ev: Math.round(ev) };
});
console.log(JSON.stringify(out, null, 1));
