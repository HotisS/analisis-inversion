// BPA propio por escenario (FY2027e y FY2028e) con la proyección del DCF: ventas × margen − amortización − resultado financiero − impuestos, ÷ acciones de hoy.
import { anios, casos } from './supuestos.mjs';
const V0 = 21947.4, ACC = 398.2, T = 0.23, FIN = { 'FY2027e': -90, 'FY2028e': -95 };
// Cuadre FY2026: (EBIT 5.818,6 + no recurrentes 96,2 − 88,3) × 0,77 ÷ 403,3 = 11,12 (BPA ajustado publicado 11,12).
console.log('Cuadre FY2026:', ((5818.6 + 96.2 - 88.3) * (1 - T) / 403.3).toFixed(2));
export const bpa = {};
for (const c of casos) {
  let v = V0; const fila = {};
  for (const a of anios.slice(0, 2)) {
    v *= 1 + (a.crecimiento_pct + c.ajuste_crecimiento_pp) / 100;
    const ebitda = v * (a.margen_ebitda_pct + c.ajuste_margen_pp) / 100;
    const ebit = ebitda - v * a.amortizacion_pct_ventas / 100;
    const bn = (ebit + FIN[a.periodo]) * (1 - T);
    fila[a.periodo] = { ventas: Math.round(v), ebit: Math.round(ebit), bn: Math.round(bn), bpa: Math.round(bn / ACC * 100) / 100 };
  }
  bpa[c.escenario] = fila;
}
console.log(JSON.stringify(bpa, null, 1));
