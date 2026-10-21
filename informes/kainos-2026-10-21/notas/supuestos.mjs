// Supuestos del DCF, escenarios y pesos de Kainos Group (corte 2026-10-21). Ejercicio a 31 de marzo, etiquetado por el año en
// que termina (FY2027 = abr-26 a mar-27, en curso desde hace 6,7 meses). Millones de GBP.
// Margen EBITDA del DCF = EBITDA CONTABLE (EBIT + toda la amortización, incluida la de derechos de uso): lleva la remuneración
// en acciones (5,4 M en FY2026) y la ligada a compras (2,1 M) como coste. En FY2026 fue del 14,1 % (15,8 % el ajustado de la
// empresa); mediana de FY2022-FY2026, 15,7 %; FY2024, 18,0 %.
// FY2027e (+24 %, fijo): cartera contratada de 433,9 M (+18 %), pedidos +32 %, Davis Pier un año entero y el avance del
// 18-ago-2026 («cómodamente por encima» de 509 M; consenso de hoy 541 M) [A2, A9, D2]. Después, convergencia del 9 % al 3,5 %.
const g = [24.0, 9.0, 8.0, 7.0, 6.0, 5.0, 4.0, 3.5];
const m = [14.5, 15.5, 16.0, 16.0, 16.0, 16.0, 16.0, 16.0];
// Amortización total ≈ 1,4 % de las ventas (5,9 M en FY2026: inmovilizado 3,3, derechos de uso 1,3, intangibles 1,3).
const am = [1.4, 1.4, 1.4, 1.4, 1.4, 1.4, 1.4, 1.4];
// Capex: 2,5 % en FY2027e por la sede de Belfast (≈ 5,9 M ya gastados en FY2026); ≈ 1,5 % después (1,5-5,8 M en FY2021-FY2025).
const cx = [2.5, 1.6, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5];
const anios = g.map((x, i) => ({
  periodo: `FY${2027 + i}e`, crecimiento_pct: x, margen_ebitda_pct: m[i], amortizacion_pct_ventas: am[i], capex_pct_ventas: cx[i],
  // Circulante comercial negativo (−9,8 % de las ventas en FY2026: cobros anticipados de suscripciones y proyectos).
  nwc_pct_ventas: -9.0, tasa_impositiva_pct: 26.5, fijo: i === 0,
}));
// Recuperación de márgenes y crecimiento de la proyección, para el BPA de cada escenario.
export const FIN = [2.0, 2.5, 3.0]; // intereses netos de la caja (FY2027e-FY2029e): 3,3 M en FY2026 con más caja
export const ACC = 116.6; // 116,26 M en circulación (1-oct-2026) + ≈ 0,3 M de dilución de planes; sin recompras no anunciadas
export default {
  anios,
  wacc: { tasa_libre_pct: 5.30, beta: 1.10, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 6.0, tasa_impositiva_pct: 25.0, peso_deuda_pct: 0 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 12.0 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -4.0, ajuste_margen_pp: -2.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 1.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 45, comparables: 15, transacciones: 0, suma_partes: 0, escenarios: 40 },
  puente_ingresos: [
    { periodo: 'FY2027e', volumen_pct: 18.0, precio_pct: 2.0, otros_pct: 4.0 },
    { periodo: 'FY2028e', volumen_pct: 6.5, precio_pct: 2.5, otros_pct: 0.0 },
    { periodo: 'FY2029e', volumen_pct: 5.5, precio_pct: 2.5, otros_pct: 0.0 },
    { periodo: 'FY2030e', volumen_pct: 4.5, precio_pct: 2.5, otros_pct: 0.0 },
    { periodo: 'FY2031e', volumen_pct: 3.5, precio_pct: 2.5, otros_pct: 0.0 },
  ],
  mercado_final: null,
};
