// Supuestos del DCF y de los escenarios (Grifols, corte 2026-10-11). Millones de EUR; ejercicio natural.
// Base: 2025 real (ingresos 7.524 M; EBITDA reportado 1.693 M, 22,5 %; con 132 M de no recurrentes devueltos, 1.825 M, 24,3 %).
// Los «no recurrentes» se repiten todos los años (149 M en 2024, 132 M en 2025, 159 M en el LTM): el margen del DCF
// se fija por debajo del ajustado de la guía y del consenso para recoger ~1-1,5 puntos de costes de reestructuración recurrentes.
// NIIF 16: capex = capex de caja (5,6 % en 2025) + pagos de arrendamientos (1,6 %), como proxy de las altas de derechos de uso.

export const modelo = [
  //  periodo   crec   margen  amort  capex  nwc    tasa
  ['2026e', -1.0, 23.0, 6.0, 7.0, 41.0, 22.0],
  ['2027e', 5.5, 24.0, 6.0, 7.0, 41.0, 22.0],
  ['2028e', 5.5, 24.5, 6.0, 6.8, 41.0, 22.0],
  ['2029e', 5.0, 25.0, 6.0, 6.6, 41.0, 22.0],
  ['2030e', 4.5, 25.5, 6.0, 6.5, 41.0, 22.0],
  ['2031e', 4.0, 25.5, 6.0, 6.5, 41.0, 22.0],
  ['2032e', 3.5, 25.5, 6.0, 6.5, 41.0, 22.0],
  ['2033e', 3.0, 25.5, 6.0, 6.5, 41.0, 22.0],
];

export const anios = modelo.map(([periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas, nwc_pct_ventas, tasa_impositiva_pct]) => ({
  periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas, nwc_pct_ventas, tasa_impositiva_pct, fijo: false,
}));

export const wacc = { tasa_libre_pct: 3.53, beta: 1.42, prima_mercado_pct: 5.5, prima_adicional_pct: 1.0, coste_deuda_pct: 6.5, tasa_impositiva_pct: 25.0, peso_deuda_pct: 55.0 };
export const terminal = { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 9.0 };
export const etapa2 = { usar: false, anios: 10, margen_final_pct: null };

export const casos = [
  { escenario: 'Bajista', probabilidad_pct: 30, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -4.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.0, multiplo_salida: null, perfil: [] },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
  { escenario: 'Alcista', probabilidad_pct: 20, ajuste_crecimiento_pp: 1.0, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
];

export const pesos = { dcf: 55, comparables: 15, transacciones: 0, suma_partes: 0, escenarios: 30 };
