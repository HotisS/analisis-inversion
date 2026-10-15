// Supuestos del DCF, escenarios y pesos (Paycom, corte 2026-10-15)
const fila = (periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas, fijo = false) => ({
  periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas,
  nwc_pct_ventas: 2.0, tasa_impositiva_pct: 28, fijo,
});

// Margen EBITDA GAAP (con pagos en acciones como coste). Capex = inmovilizado + software capitalizado.
export const anios = [
  fila('2026e', 7.4, 43.0, 9.3, 6.5, true),
  fila('2027e', 7.0, 43.5, 8.8, 6.5),
  fila('2028e', 7.0, 44.0, 8.3, 6.5),
  fila('2029e', 6.5, 44.0, 7.8, 6.5),
  fila('2030e', 6.0, 44.0, 7.3, 6.5),
  fila('2031e', 5.5, 44.0, 7.0, 6.5),
  fila('2032e', 5.0, 44.0, 6.8, 6.6),
  fila('2033e', 4.5, 44.0, 6.6, 6.8),
];

export const wacc = {
  tasa_libre_pct: 5.21, beta: 0.90, prima_mercado_pct: 5.5, prima_adicional_pct: 0,
  coste_deuda_pct: 6.0, tasa_impositiva_pct: 28, peso_deuda_pct: 7.7,
};

export const terminal = { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 15 };

export const etapa2 = { usar: false, anios: 10, margen_final_pct: null };

export const casos = [
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -2.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.5, multiplo_salida: null },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 1.5, ajuste_wacc_pp: -0.25, crecimiento_terminal_pct: 3.25, multiplo_salida: null },
];

export const pesos = { dcf: 45, comparables: 20, transacciones: 5, suma_partes: 0, escenarios: 30 };
