// Supuestos del DCF y de los escenarios (Rational, corte 2026-10-07).
const fila = (periodo, crecimiento_pct, margen_ebitda_pct, capex_pct_ventas = 3.6, fijo = false) => ({
  periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas: 3.0, capex_pct_ventas, nwc_pct_ventas: 23.0, tasa_impositiva_pct: 25.8, fijo,
});

export const anios = [
  fila('2026e', 6.0, 28.8, 3.8, true),
  fila('2027e', 7.0, 28.8),
  fila('2028e', 7.0, 29.0),
  fila('2029e', 7.0, 29.0),
  fila('2030e', 7.0, 29.0),
  fila('2031e', 6.5, 29.0),
  fila('2032e', 6.0, 29.0),
  fila('2033e', 5.5, 29.0),
  fila('2034e', 5.0, 29.0),
  fila('2035e', 5.0, 29.0),
];

export const wacc = { tasa_libre_pct: 3.52, beta: 1.04, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 4.0, tasa_impositiva_pct: 25.8, peso_deuda_pct: 0 };
export const terminal = { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 14.0 };
export const etapa2 = { usar: true, anios: 10, margen_final_pct: null };

export const casos = [
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -2.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.0, multiplo_salida: null,
    perfil: [{ periodo: '2027e', crecimiento_pp: -15, margen_pp: -4 }, { periodo: '2028e', crecimiento_pp: 3, margen_pp: -3 }] },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 3.0, multiplo_salida: null, perfil: [] },
];

export const pesos = { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 };
