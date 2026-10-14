// BPA propio de 2027e y 2028e por escenario, desde los supuestos del DCF (estimación propia), en base «ajustada» (la del PER
// histórico): BPA contable + amortización de intangibles de compras y efectos de cambio después de impuestos (≈85 M al año,
// la diferencia de 2025 entre el beneficio ajustado de 1.420,2 M y el contable de 1.335,6 M).
// Cuadre con 2025 real: 6.517 × 38,46 % − 748,2 = 1.758,4 de EBIT; − 67,8 de financiero (estimado) = 1.690,6; − 21 % de
// impuestos = 1.335,6 M (el publicado); + 84,6 = 1.420,2 ajustado ÷ 439,7 M de acciones diluidas = 3,23 € (el publicado).
// Resultado financiero: deuda neta de ≈2.600-3.000 M al ≈3 %: −75 M al año. Sin IDEMIA (ni su EBITDA ni su deuda).
// Acciones: 431,6 M (capital tras la amortización de junio de 2026), sin recompras no anunciadas.
import S from './supuestos.mjs';
const base = 6517, acciones = 431.6, minoritarios = 2, ajuste = 85, fin = -75;
const casos = { Bajista: S.casos[0], Base: S.casos[1], Alcista: S.casos[2] };
export const tabla = {};
for (const [n, c] of Object.entries(casos)) {
  let v = base; tabla[n] = {};
  for (const a of S.anios.slice(0, 3)) {
    const g = a.fijo ? a.crecimiento_pct : a.crecimiento_pct + c.ajuste_crecimiento_pp;
    const m = a.fijo ? a.margen_ebitda_pct : a.margen_ebitda_pct + c.ajuste_margen_pp;
    v = v * (1 + g / 100);
    const ebitda = v * m / 100, am = v * a.amortizacion_pct_ventas / 100, ebit = ebitda - am;
    const bai = ebit + fin, imp = bai * a.tasa_impositiva_pct / 100, bn = bai - imp - minoritarios;
    tabla[n][a.periodo] = { ventas: Math.round(v), margen: m, ebitda: Math.round(ebitda), amort: Math.round(am), ebit: Math.round(ebit), fin, bai: Math.round(bai), imp: Math.round(imp), bn: Math.round(bn), bpa_contable: +(bn / acciones).toFixed(2), bpa: +((bn + ajuste) / acciones).toFixed(2) };
  }
}
if (process.argv[1]?.endsWith('bpa.mjs')) console.log(JSON.stringify(tabla, null, 1));
