// Supuestos del DCF, escenarios y pesos (RELX, corte 2026-10-14). Divisa: GBP.
// Base: último ejercicio real 2025 (ingresos 9.590 M; EBITDA publicado 3.779 M, 39,4 %).
// amortizacion_pct_ventas: solo activos propios (504 M en 2025 = 5,3 %), no los intangibles comprados: así el BPA del DCF es el ajustado.
// capex_pct_ventas: capex de la empresa (525 M) + principal de arrendamientos (38 M) = 5,9 % (NIIF 16).
export const anios = [
  { periodo: '2026e', crecimiento_pct: 4.0, margen_ebitda_pct: 40.0, amortizacion_pct_ventas: 5.3, capex_pct_ventas: 5.9, nwc_pct_ventas: 0.0, tasa_impositiva_pct: 24.5, fijo: true },
  { periodo: '2027e', crecimiento_pct: 6.5, margen_ebitda_pct: 40.5, amortizacion_pct_ventas: 5.3, capex_pct_ventas: 5.9, nwc_pct_ventas: 0.0, tasa_impositiva_pct: 24.5, fijo: false },
  { periodo: '2028e', crecimiento_pct: 6.5, margen_ebitda_pct: 41.0, amortizacion_pct_ventas: 5.3, capex_pct_ventas: 5.9, nwc_pct_ventas: 0.0, tasa_impositiva_pct: 24.5, fijo: false },
  { periodo: '2029e', crecimiento_pct: 6.0, margen_ebitda_pct: 41.3, amortizacion_pct_ventas: 5.3, capex_pct_ventas: 5.9, nwc_pct_ventas: 0.0, tasa_impositiva_pct: 24.5, fijo: false },
  { periodo: '2030e', crecimiento_pct: 5.5, margen_ebitda_pct: 41.5, amortizacion_pct_ventas: 5.3, capex_pct_ventas: 5.9, nwc_pct_ventas: 0.0, tasa_impositiva_pct: 24.5, fijo: false },
  { periodo: '2031e', crecimiento_pct: 4.5, margen_ebitda_pct: 41.5, amortizacion_pct_ventas: 5.3, capex_pct_ventas: 5.8, nwc_pct_ventas: 0.0, tasa_impositiva_pct: 24.5, fijo: false },
  { periodo: '2032e', crecimiento_pct: 3.5, margen_ebitda_pct: 41.5, amortizacion_pct_ventas: 5.3, capex_pct_ventas: 5.6, nwc_pct_ventas: 0.0, tasa_impositiva_pct: 24.5, fijo: false },
];

export const wacc = { tasa_libre_pct: 5.15, beta: 0.85, prima_mercado_pct: 5.5, prima_adicional_pct: 0.0, coste_deuda_pct: 4.5, tasa_impositiva_pct: 24.5, peso_deuda_pct: 16.0 };

export const terminal = { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 14.0 };

export const etapa2 = { usar: false, anios: 5, margen_final_pct: null };

export const casos = [
  { escenario: 'Bajista', probabilidad_pct: 30, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -3.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 1.5, multiplo_salida: null },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0.0, ajuste_margen_pp: 0.0, ajuste_wacc_pp: 0.0, crecimiento_terminal_pct: null, multiplo_salida: null },
  { escenario: 'Alcista', probabilidad_pct: 20, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0.0, crecimiento_terminal_pct: 3.0, multiplo_salida: null },
];

// Puente de crecimiento (sostenibilidad): volumen + precio + otros = crecimiento publicado.
export const puente_ingresos = [
  { periodo: '2026e', volumen_pct: 3.5, precio_pct: 3.5, otros_pct: -3.0 },
  { periodo: '2027e', volumen_pct: 3.0, precio_pct: 3.5, otros_pct: 0.0 },
  { periodo: '2028e', volumen_pct: 3.0, precio_pct: 3.5, otros_pct: 0.0 },
  { periodo: '2029e', volumen_pct: 2.5, precio_pct: 3.5, otros_pct: 0.0 },
];

export const pesos = { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 };
