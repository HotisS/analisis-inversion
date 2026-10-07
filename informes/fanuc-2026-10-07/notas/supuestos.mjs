// Supuestos del DCF, escenarios y pesos (FANUC, corte 2026-10-07). Años con la etiqueta de Fanuc: FY2026e = abr-26 a mar-27.
const fila = (periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas, nwc_pct_ventas) =>
  ({ periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas, nwc_pct_ventas, tasa_impositiva_pct: 28, fijo: false });

export const anios = [
  fila('FY2026e', 12.0, 28.3, 5.2, 4.0, 47.0),
  fila('FY2027e', 7.0, 28.8, 5.1, 4.5, 47.0),
  fila('FY2028e', 4.0, 28.8, 5.0, 5.0, 47.0),
  fila('FY2029e', -6.0, 26.5, 5.1, 5.0, 48.0),
  fila('FY2030e', 7.0, 28.0, 5.0, 5.0, 47.0),
  fila('FY2031e', 5.5, 28.5, 4.9, 5.0, 46.5),
  fila('FY2032e', 4.5, 28.5, 4.9, 5.0, 46.5),
  fila('FY2033e', 3.5, 28.5, 4.8, 5.0, 46.0),
  fila('FY2034e', 3.0, 28.5, 4.8, 5.0, 46.0),
  fila('FY2035e', 2.5, 28.5, 4.8, 5.0, 46.0),
];

export const wacc = { tasa_libre_pct: 3.103, beta: 1.26, prima_mercado_pct: 5.14, prima_adicional_pct: 0, coste_deuda_pct: 3.6, tasa_impositiva_pct: 28, peso_deuda_pct: 0 };
export const terminal = { metodo: 'gordon', crecimiento_pct: 2.0, multiplo_salida: 15.0 };

export const casos = [
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -1.5, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 1.5, multiplo_salida: null,
    perfil: [{ periodo: 'FY2027e', crecimiento_pp: -22, margen_pp: -6 }, { periodo: 'FY2028e', crecimiento_pp: 6, margen_pp: -3 }] },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 3.0, ajuste_margen_pp: 2.5, ajuste_wacc_pp: -0.5, crecimiento_terminal_pct: 2.5, multiplo_salida: null, perfil: [] },
];

export const pesos = { dcf: 40, comparables: 45, transacciones: 0, suma_partes: 0, escenarios: 15 };
