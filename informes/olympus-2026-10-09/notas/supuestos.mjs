// Supuestos del DCF, escenarios y pesos (Olympus, corte 2026-10-09). Ejercicios con la etiqueta de Olympus (FY2027 = abr-2026 a mar-2027).
const fila = (periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas) => ({
  periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas, nwc_pct_ventas: 35, tasa_impositiva_pct: 28, fijo: false,
});

export const anios = [
  fila('FY2027e', 6.0, 20.4, 6.4, 8.9),
  fila('FY2028e', 4.0, 21.8, 6.5, 8.7),
  fila('FY2029e', 4.5, 22.6, 6.5, 8.5),
  fila('FY2030e', 4.5, 23.0, 6.5, 8.3),
  fila('FY2031e', 4.0, 23.0, 6.5, 8.1),
  fila('FY2032e', 3.5, 23.0, 6.6, 7.9),
  fila('FY2033e', 3.0, 23.0, 6.6, 7.7),
  fila('FY2034e', 2.5, 23.0, 6.6, 7.5),
  fila('FY2035e', 2.5, 23.0, 6.6, 7.3),
  fila('FY2036e', 2.0, 23.0, 6.6, 7.2),
];

export const wacc = {
  tasa_libre_pct: 3.089, beta: 0.99, prima_mercado_pct: 4.23, prima_adicional_pct: 0.75,
  coste_deuda_pct: 3.3, tasa_impositiva_pct: 28, peso_deuda_pct: 15,
};

export const terminal = { metodo: 'gordon', crecimiento_pct: 2.0, multiplo_salida: 10.5 };

export const casos = [
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -1.5, ajuste_margen_pp: -3.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: null, multiplo_salida: null },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.0, ajuste_margen_pp: 2.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
];

export const pesos = { dcf: 50, comparables: 30, transacciones: 0, suma_partes: 0, escenarios: 20 };
