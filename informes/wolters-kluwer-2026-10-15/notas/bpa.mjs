// BPA propio 2026e-2028e de los tres escenarios, desde la proyección del DCF (supuestos.mjs) con los desplazamientos
// de los escenarios en los años no fijos. BPA NIIF: resta la amortización de intangibles adquiridos (76 M en el 1S26,
// ~155 M al año con Libra y Marosa) y no lleva plusvalías de desinversiones. Resultado financiero: 110 M (guía 2026 de
// coste financiero ajustado ~105 M en divisa constante; 56 M en el 1S26), sin bajar la deuda: la caja sobrante no se
// cuenta ni en intereses ni en acciones. Acciones: 223,1 M hoy menos la recompra ANUNCIADA que falta (≈236 M EUR del
// mandato de 256 M hasta el 28-dic-2026, a 78 EUR ≈ 3,0 M): 220,1 M desde 2027; 224 M de media en 2026 (225,3 M en el 1S).
// Impuesto del 24 % (guía 23,5-24,5 %). Uso: node bpa.mjs
import { anios, casos } from './supuestos.mjs';
const base = 6125, amortAdq = 155, fin = 110, t = 0.24;
const acciones = { '2026e': 224.0, '2027e': 220.1, '2028e': 220.1 };
const out = {};
for (const c of casos) {
  let v = base; out[c.escenario] = {};
  for (const a of anios.slice(0, 3)) {
    const g = a.crecimiento_pct + (a.fijo ? 0 : c.ajuste_crecimiento_pp);
    const m = a.margen_ebitda_pct + (a.fijo ? 0 : c.ajuste_margen_pp);
    v = v * (1 + g / 100);
    const ebitda = v * m / 100, ebitAj = ebitda - v * a.amortizacion_pct_ventas / 100;
    const bn = (ebitAj - amortAdq - fin) * (1 - t);
    out[c.escenario][a.periodo] = { ventas: Math.round(v), margen_aj_pct: +(ebitAj / v * 100).toFixed(1), ebit_niif: Math.round(ebitAj - amortAdq), beneficio: Math.round(bn), bpa: +(bn / acciones[a.periodo]).toFixed(2) };
  }
}
if (process.argv[1] && process.argv[1].endsWith("bpa.mjs")) console.log(JSON.stringify(out, null, 1));
// Cuadre con 2025: ventas 6.125, EBITDA sin FRR 2.007 (32,8 %), amortización propia 320 (5,2 %), intangibles adquiridos
// 157, financiero 86, impuesto 23,6 % → (2.007 − 320 − 157 − 86) × 0,764 / 231,8 = 4,76 EUR frente a 4,65 publicado sin
// la plusvalía de FRR (1.308 − 231 = 1.077 M / 231,8): la diferencia son otros no recurrentes (costes de adquisición 25 M).
export default out;
