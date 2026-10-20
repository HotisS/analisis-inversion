// BPA propio (base NRIgs: recurrente, tras cupones de híbridos) de 2026e-2028e por escenario, desde los supuestos del DCF.
// Cuadre con 2025 real: 71.944 × 19,08 % = 13.725 de EBITDA sin asociadas − 5.262 de amortización = 8.463; + 1.008 de asociadas
// = 9.471 de EBIT recurrente; − 2.000 de financiero recurrente; impuestos 1.600; minoritarios y otros 900 → 4.900 M (4.896 publicado).
// Financiero recurrente: guía de −2.300/−2.500 M en 2026 y −2.600/−2.900 M en 2028 [A3, A6]: −2.400, −2.600 y −2.750 (bajista −2.900 en 2028).
// Impuestos 22 % sobre (EBIT sin asociadas + financiero) (guía 18-22 %, con la sobretasa francesa). Asociadas 1.050/1.100/1.150 M.
// Minoritarios 1.000/1.100/1.100 M. Cupones de híbridos ≈290 M (6.693 M al ≈4,3 %). Acciones: ≈2.540 M (2.542,4 M emitidas + LINK − autocartera).
import S from './supuestos.mjs';
const base = 71944, acciones = 2540, cupones = 290;
const asoc = { '2026e': 1050, '2027e': 1100, '2028e': 1150 };
const mino = { '2026e': 1000, '2027e': 1100, '2028e': 1100 };
const casos = { Bajista: S.casos[0], Base: S.casos[1], Alcista: S.casos[2] };
const fin = { Bajista: { '2026e': -2400, '2027e': -2700, '2028e': -2900 }, Base: { '2026e': -2400, '2027e': -2600, '2028e': -2750 }, Alcista: { '2026e': -2400, '2027e': -2600, '2028e': -2750 } };
export const tabla = {};
for (const [n, c] of Object.entries(casos)) {
  let v = base; tabla[n] = {};
  for (const a of S.anios.slice(0, 3)) {
    const g = a.fijo ? a.crecimiento_pct : a.crecimiento_pct + c.ajuste_crecimiento_pp;
    const m = a.fijo ? a.margen_ebitda_pct : a.margen_ebitda_pct + c.ajuste_margen_pp;
    v = v * (1 + g / 100);
    const p = a.periodo;
    const ebitda = v * m / 100, am = v * a.amortizacion_pct_ventas / 100, ebitSin = ebitda - am, ebit = ebitSin + asoc[p];
    const imp = (ebitSin + fin[n][p]) * 0.22, bn = ebit + fin[n][p] - imp - mino[p];
    tabla[n][p] = { ventas: Math.round(v), margen: m, ebitda_con_asoc: Math.round(ebitda + asoc[p]), amort: Math.round(am), ebit: Math.round(ebit), fin: fin[n][p], imp: Math.round(imp), nrigs: Math.round(bn), bpa: +((bn - cupones) / acciones).toFixed(3) };
  }
}
if (process.argv[1]?.endsWith('bpa.mjs')) console.log(JSON.stringify(tabla, null, 1));
