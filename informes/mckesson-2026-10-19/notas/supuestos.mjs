// Supuestos del DCF, escenarios y pesos de McKesson (corte 2026-10-19). Ejercicio a 31 de marzo, etiquetado por el año en
// que termina (FY2027 = abr-26 a mar-27, en curso). Millones de USD.
// Margen EBITDA del DCF = EBITDA ajustado de la empresa (resultado operativo ajustado + depreciación, sin amortización de
// intangibles comprados; 1,656 % de las ventas en FY2026) MENOS 0,05 puntos de ventas por reestructuración, litigios
// ordinarios y costes de separación que se repiten y la empresa excluye de su ajustado (≈ 150-250 M al año).
const g = [7.0, 6.5, 6.0, 5.5, 5.0, 4.5, 4.0, 3.5];
const m = [1.67, 1.71, 1.75, 1.77, 1.78, 1.79, 1.79, 1.79];
// Amortización total (depreciación ≈ 0,11 % + intangibles comprados ≈ 0,07 %): 0,18 % de las ventas en FY2026 (729 M).
const am = [0.18, 0.18, 0.18, 0.18, 0.18, 0.18, 0.18, 0.18];
// Capex: inmovilizado + software capitalizado ≈ 0,19 % de las ventas en FY2024-FY2026.
const cx = [0.19, 0.19, 0.19, 0.19, 0.19, 0.19, 0.19, 0.19];
const anios = g.map((x, i) => ({
  periodo: `FY${2027 + i}e`, crecimiento_pct: x, margen_ebitda_pct: m[i], amortizacion_pct_ventas: am[i], capex_pct_ventas: cx[i],
  nwc_pct_ventas: -1.9, tasa_impositiva_pct: 19.0, fijo: i === 0,
}));
export default {
  anios,
  wacc: { tasa_libre_pct: 5.09, beta: 0.70, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.3, tasa_impositiva_pct: 19.0, peso_deuda_pct: 11 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 14.0 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -0.12, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.0, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.0, ajuste_margen_pp: 0.06, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 45, comparables: 15, transacciones: 0, suma_partes: 0, escenarios: 40 },
  puente_ingresos: [
    { periodo: 'FY2027e', volumen_pct: 6.0, precio_pct: 1.0, otros_pct: 0.0 },
    { periodo: 'FY2028e', volumen_pct: 5.0, precio_pct: 1.5, otros_pct: 0.0 },
    { periodo: 'FY2029e', volumen_pct: 4.5, precio_pct: 1.5, otros_pct: 0.0 },
    { periodo: 'FY2030e', volumen_pct: 4.0, precio_pct: 1.5, otros_pct: 0.0 },
    { periodo: 'FY2031e', volumen_pct: 3.5, precio_pct: 1.5, otros_pct: 0.0 },
  ],
  mercado_final: null,
};
