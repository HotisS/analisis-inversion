// Cálculo de la tabla de comparables (subagente D, Adyen 2026-10-12).
// Capitalización y VE de Stock Analysis (12-oct intradía) llevados al cierre del 9-oct (precio de MarketScreener «cierre anterior»).
// Ventas, EBITDA y BPA de MarketScreener. LTM = a junio de 2026; NTM = oct-2026 a sep-2027.
const USD = 1.1181; // BCE 12-oct-2026, USD por EUR
const c = [
  { n: 'Visa', t: 'V', p: 'US', fx: USD, fy: 'sep', p9: 385.45, psa: 391.42, cap: 718.49, ev: 728.56, roic: 54.82, fcfy: 2.97,
    s: { 2025: 40000, 2026: 45757, 2027: 50785, 2028: 56085 }, e: { 2025: 28314, 2026: 32198, 2027: 35881, 2028: 39759 }, eps: { 2026: 12.53, 2027: 14.86, 2028: 16.88 } },
  { n: 'Mastercard', t: 'MA', p: 'US', fx: USD, p9: 589.14, psa: 597.93, cap: 523.79, ev: 536.68, roic: 93.78, fcfy: 3.21,
    s: { 2025: 32791, 2026: 37260, 2027: 41961 }, e: { 2025: 20544, 2026: 23584, 2027: 26660 }, eps: { 2026: 19.55, 2027: 22.95 } },
  { n: 'PayPal', t: 'PYPL', p: 'US', fx: USD, p9: 55.53, psa: 55.96, cap: 47.87, ev: 50.84, roic: 22.27, fcfy: 13.86,
    s: { 2025: 33172, 2026: 34752, 2027: 36206 }, e: { 2025: 7166, 2026: 6759, 2027: 6705 }, eps: { 2026: 5.088, 2027: 5.638 } },
  { n: 'Block', t: 'XYZ', p: 'US', fx: USD, p9: 77.24, psa: 77.71, cap: 46.98, ev: 47.41, roic: 2.72, fcfy: 8.28,
    s: { 2025: 24194, 2026: 26061, 2027: 29021 }, e: { 2025: 3467, 2026: 4661, 2027: 5747 }, eps: { 2026: 1.717, 2027: 4.794 } },
  { n: 'Fiserv', t: 'FISV', p: 'US', fx: USD, p9: 45.63, psa: 46.60, cap: 24.78, ev: 52.19, roic: 6.85, fcfy: 16.25,
    s: { 2025: 19804, 2026: 19545, 2027: 20262 }, e: { 2025: 9255, 2026: 8112, 2027: 8464 }, eps: { 2026: 4.74, 2027: 5.605 } },
  { n: 'Global Payments', t: 'GPN', p: 'US', fx: USD, p9: 82.20, psa: 82.50, cap: 21.83, ev: 39.98, roic: 3.93, fcfy: 3.79, perimetro: true,
    s: { 2025: 9315, 2026: 12347, 2027: 13001 }, e: { 2025: 4535, 2026: 5778, 2027: 6235 }, eps: { 2026: -4.407, 2027: 5.523 } },
  { n: 'Nexi', t: 'NEXI', p: 'IT', fx: 1, p9: 4.204, psa: 4.291, cap: 5.04, ev: 9.07, roic: 7.55, fcfy: 15.75,
    s: { 2025: 3585, 2026: 3646, 2027: 3726 }, e: { 2025: 1904, 2026: 1894, 2027: 1916 }, eps: { 2026: 0.3247, 2027: 0.366 } },
  { n: 'Worldline', t: 'WLN', p: 'FR', fx: 1, p9: 10.56, psa: 10.67, cap: 0.60406, ev: 2.54, roic: 0.72, fcfy: 16.66,
    s: { 2025: 4030, 2026: 3730, 2027: 3714 }, e: { 2025: 737, 2026: 643.3, 2027: 665 }, eps: { 2026: -2.79, 2027: -1.725 } },
];
const r1 = (x) => Math.round(x * 10) / 10, r2 = (x) => Math.round(x * 100) / 100;
const filas = c.map((x) => {
  const k = x.p9 / x.psa;
  const cap = x.cap * 1000 * k, ev = x.ev * 1000 - x.cap * 1000 + cap; // millones de la divisa local
  const ltm = (m) => x.fy === 'sep' ? 0.25 * m[2025] + 0.75 * m[2026] : 0.5 * m[2025] + 0.5 * m[2026];
  const ntm = (m) => x.fy === 'sep' ? (11 / 12) * m[2027] + (1 / 12) * m[2028] : 0.22 * m[2026] + 0.78 * m[2027];
  const sL = ltm(x.s), sN = ntm(x.s), eL = ltm(x.e), eN = ntm(x.e), epsN = ntm(x.eps);
  const g = (Math.pow(sN / sL, 12 / 15) - 1) * 100;
  const fy = x.fy === 'sep' ? 2025 : 2025;
  return {
    nombre: x.n, ticker: x.t, pais: x.p,
    capitalizacion: Math.round(cap / x.fx),
    ev_ventas: x.perimetro ? null : r2(ev / sL),
    ev_ebitda_ltm: x.perimetro ? null : r1(ev / eL),
    ev_ebitda_ntm: r1(ev / eN),
    per_ntm: epsN > 0 ? r1(x.p9 / epsN) : null,
    crecimiento_pct: x.perimetro ? null : r1(g),
    margen_ebitda_pct: r1((x.e[fy] / x.s[fy]) * 100),
    roic_pct: x.roic,
    dn_ebitda: x.perimetro ? r2((ev - cap) / eN) : r2((ev - cap) / eL),
    fcf_yield_pct: r1(x.fcfy / k),
    _ev_millones_local: Math.round(ev),
  };
});
console.log(JSON.stringify(filas, null, 1));
const med = (a) => { a = a.filter((v) => v != null).sort((p, q) => p - q); const m = a.length >> 1; return a.length % 2 ? a[m] : (a[m - 1] + a[m]) / 2; };
for (const k of ['ev_ventas', 'ev_ebitda_ltm', 'ev_ebitda_ntm', 'per_ntm', 'crecimiento_pct']) console.log(k, 'mediana', r2(med(filas.map((f) => f[k]))));
