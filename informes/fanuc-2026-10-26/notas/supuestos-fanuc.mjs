// Supuestos del DCF y de los escenarios (iteración del 26-oct-2026). FY2026e = abr-26 a mar-27 (etiqueta de inicio).
// FY2026e fijo: dos trimestres publicados y guía subida dos veces (ventas 1.013.700 M, BE 240.700 M).
export const anios = [
  { periodo: 'FY2026e', crecimiento_pct: 19.0, margen_ebitda_pct: 28.8, amortizacion_pct_ventas: 4.7, capex_pct_ventas: 4.0, nwc_pct_ventas: 44.0, tasa_impositiva_pct: 28, fijo: true },
  { periodo: 'FY2027e', crecimiento_pct: 5.0, margen_ebitda_pct: 29.2, amortizacion_pct_ventas: 4.9, capex_pct_ventas: 9.0, nwc_pct_ventas: 44.5, tasa_impositiva_pct: 28, fijo: false },
  { periodo: 'FY2028e', crecimiento_pct: 3.0, margen_ebitda_pct: 29.0, amortizacion_pct_ventas: 5.0, capex_pct_ventas: 9.0, nwc_pct_ventas: 45.0, tasa_impositiva_pct: 28, fijo: false },
  { periodo: 'FY2029e', crecimiento_pct: -7.0, margen_ebitda_pct: 26.5, amortizacion_pct_ventas: 5.3, capex_pct_ventas: 9.0, nwc_pct_ventas: 46.5, tasa_impositiva_pct: 28, fijo: false },
  { periodo: 'FY2030e', crecimiento_pct: 6.5, margen_ebitda_pct: 28.0, amortizacion_pct_ventas: 5.1, capex_pct_ventas: 9.0, nwc_pct_ventas: 45.5, tasa_impositiva_pct: 28, fijo: false },
  { periodo: 'FY2031e', crecimiento_pct: 5.0, margen_ebitda_pct: 28.5, amortizacion_pct_ventas: 5.1, capex_pct_ventas: 9.0, nwc_pct_ventas: 45.0, tasa_impositiva_pct: 28, fijo: false },
  { periodo: 'FY2032e', crecimiento_pct: 4.0, margen_ebitda_pct: 28.5, amortizacion_pct_ventas: 5.1, capex_pct_ventas: 9.0, nwc_pct_ventas: 45.0, tasa_impositiva_pct: 28, fijo: false },
  { periodo: 'FY2033e', crecimiento_pct: 3.5, margen_ebitda_pct: 28.5, amortizacion_pct_ventas: 5.1, capex_pct_ventas: 9.0, nwc_pct_ventas: 45.0, tasa_impositiva_pct: 28, fijo: false },
  { periodo: 'FY2034e', crecimiento_pct: 3.0, margen_ebitda_pct: 28.5, amortizacion_pct_ventas: 5.1, capex_pct_ventas: 9.0, nwc_pct_ventas: 45.0, tasa_impositiva_pct: 28, fijo: false },
  { periodo: 'FY2035e', crecimiento_pct: 2.5, margen_ebitda_pct: 28.5, amortizacion_pct_ventas: 5.1, capex_pct_ventas: 9.0, nwc_pct_ventas: 45.0, tasa_impositiva_pct: 28, fijo: false },
];
export const wacc = { tasa_libre_pct: 2.837, beta: 1.21, prima_mercado_pct: 5.14, prima_adicional_pct: 0, coste_deuda_pct: 3.6, tasa_impositiva_pct: 28, peso_deuda_pct: 0 };
export const terminal = { metodo: 'gordon', crecimiento_pct: 2.0, multiplo_salida: 13.0 };
export const casos = [
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -1.5, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 1.5, multiplo_salida: null,
    perfil: [{ periodo: 'FY2027e', crecimiento_pp: -22, margen_pp: -6 }, { periodo: 'FY2028e', crecimiento_pp: 6, margen_pp: -3 }] },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 3, ajuste_margen_pp: 2.5, ajuste_wacc_pp: -0.5, crecimiento_terminal_pct: 2.5, multiplo_salida: null, perfil: [] },
];
export const pesos = { dcf: 40, comparables: 45, transacciones: 0, suma_partes: 0, escenarios: 15 };
// Puente a 30-sep-2026: caja 787.085; pensiones 19.386 × (1 − 30 %); participadas a 10x el resultado LTM
// (38.783 M); otras inversiones a largo (cruzadas y bonos) ≈ 72.100 M (estimación propia, ver comentario).
export const puente = { fecha: '2026-09-30', deuda_financiera: 0, arrendamientos: 0, caja: 787085, minoritarios: 18676, pensiones: 13570, asociadas: 387830, otros_ajustes: -72100 };
