// Supuestos del DCF, escenarios y pesos (Olympus, corte 2026-10-19). Ejercicios con la etiqueta de Olympus (FY2027 = abr-2026 a mar-2027).
// Cambios frente al 9-oct (v2, con el margen final ya limitado al 22,7 % de FY2025 por la prueba de sostenibilidad):
// - Carta de advertencia de la FDA del 7-oct a seis plantas: la vuelta del margen se retrasa medio año (FY2028e 21,8 → 21,5 %;
//   FY2029e 22,6 → 22,2 %) por más gasto de calidad y remediación; FY2027e y el margen final (22,7 %) no cambian.
// - Tasa libre 3,089 → 2,958 % (JGB del 16-oct); peso de la deuda 15 → 18 % (capitalización más baja).
// - Probabilidades 25/50/25 → 30/50/20: la carta sube la probabilidad de la cola (decreto de consentimiento, más alertas).
const fila = (periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas) => ({
  periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas, nwc_pct_ventas: 35, tasa_impositiva_pct: 28, fijo: false,
});

export const anios = [
  fila('FY2027e', 6.0, 20.4, 6.4, 8.9),
  fila('FY2028e', 4.0, 21.5, 6.5, 8.7),
  fila('FY2029e', 4.5, 22.2, 6.5, 8.5),
  fila('FY2030e', 4.5, 22.7, 6.5, 8.3),
  fila('FY2031e', 4.0, 22.7, 6.5, 8.1),
  fila('FY2032e', 3.5, 22.7, 6.6, 7.9),
  fila('FY2033e', 3.0, 22.7, 6.6, 7.7),
  fila('FY2034e', 2.5, 22.7, 6.6, 7.5),
  fila('FY2035e', 2.5, 22.7, 6.6, 7.3),
  fila('FY2036e', 2.0, 22.7, 6.6, 7.2),
];

export const wacc = {
  tasa_libre_pct: 2.958, beta: 0.99, prima_mercado_pct: 4.23, prima_adicional_pct: 0.75,
  coste_deuda_pct: 3.3, tasa_impositiva_pct: 28, peso_deuda_pct: 18,
};

export const terminal = { metodo: 'gordon', crecimiento_pct: 2.0, multiplo_salida: 10.5 };

export const casos = [
  { escenario: 'Bajista', probabilidad_pct: 30, ajuste_crecimiento_pp: -1.5, ajuste_margen_pp: -3.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: null, multiplo_salida: null },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  { escenario: 'Alcista', probabilidad_pct: 20, ajuste_crecimiento_pp: 1.0, ajuste_margen_pp: 2.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
];

export const pesos = { dcf: 50, comparables: 30, transacciones: 0, suma_partes: 0, escenarios: 20 };

// Objetivo a 12 meses: BPA propio de FY2029e (primer ejercicio que cierra más de 18 meses después del 19-oct-2026).
// Ventas × margen EBITDA − amortización (6,5 % de las ventas) − resultado financiero (−6.500 M: deuda de 318.892 M y
// arrendamientos de 66.309 M al 2,1 % menos ≈ 1.700 M de ingresos) − participadas (−3.700 M, Swan EndoSurgical),
// impuestos del 28 %, ÷ 1.062,82 M de acciones (30-jun-2026, sin recompras nuevas). Cuadre con FY2026: 68.172 / 1.113,9 = 61,2.
// Base: 1.164.307 M de ventas, EBIT 182.796 M, beneficio 124.269 M → 116,9 JPY (FY2027e 94,0; FY2028e 106,3).
// Bajista (−1,5 puntos de crecimiento, −3 de margen): 1.115.037 M, EBIT 141.610 M → 89,0. Alcista (+1, +2): 1.197.947 M, EBIT 212.037 M → 136,7.
export const bpa = { Bajista: 89.0, Base: 116.9, Alcista: 136.7, base_fy2028: 106.3, base_fy2027: 94.0 };
