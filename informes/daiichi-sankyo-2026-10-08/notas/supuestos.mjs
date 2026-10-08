// Supuestos del DCF, escenarios y pesos (Daiichi Sankyo, corte 2026-10-08).
// Años con la etiqueta de la empresa: FY2026e = abr-26 a mar-27. Margen EBITDA SIN la amortización no monetaria
// de los pagos iniciales de AstraZeneca y Merck (la caja ya está en el puente).
const fila = (periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas, nwc_pct_ventas, fijo = false) =>
  ({ periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas, nwc_pct_ventas, tasa_impositiva_pct: 25, fijo });

export const anios = [
  fila('FY2026e', 10.5, 15.0, 3.6, 8.5, 39.0),
  fila('FY2027e', 2.5, 14.5, 3.6, 5.2, 37.0),
  fila('FY2028e', 9.5, 15.5, 3.6, 4.7, 35.0),
  fila('FY2029e', 6.5, 17.0, 3.6, 4.5, 33.0),
  fila('FY2030e', 5.5, 18.5, 3.6, 4.2, 32.0),
  fila('FY2031e', 4.0, 19.0, 3.6, 4.0, 31.0),
  fila('FY2032e', 2.0, 19.0, 3.6, 3.9, 30.0),
  fila('FY2033e', 0.0, 18.5, 3.6, 3.8, 30.0),
  fila('FY2034e', -1.0, 18.0, 3.6, 3.8, 30.0),
  fila('FY2035e', 1.5, 18.0, 3.6, 3.8, 30.0),
];

export const wacc = { tasa_libre_pct: 3.111, beta: 0.92, prima_mercado_pct: 4.23, prima_adicional_pct: 0.91, coste_deuda_pct: 1.5, tasa_impositiva_pct: 25, peso_deuda_pct: 9.0 };
export const terminal = { metodo: 'gordon', crecimiento_pct: 2.0, multiplo_salida: 10.0 };

export const casos = [
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -3.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 1.0, multiplo_salida: null, perfil: [] },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.5, ajuste_margen_pp: 2.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.5, multiplo_salida: null, perfil: [] },
];

export const pesos = { dcf: 45, comparables: 35, transacciones: 0, suma_partes: 0, escenarios: 20 };
