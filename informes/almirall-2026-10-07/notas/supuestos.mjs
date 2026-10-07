// Supuestos del DCF, escenarios y pesos (Almirall, corte 2026-10-07).
// Crecimiento y margen: 2026e en la guía (ventas +9-12 %, EBITDA 270-290 M de la empresa, que excluye ~0,8 % de las
// ventas de reestructuración y otros que nuestro EBITDA sí resta); 2027-2028e por debajo del consenso en ventas
// (Ebglyss se aplanó en el 2T26 y el cobro de Actithiol de 2026 no se repite); convergencia a 2,0 % en 2033e.
export const anios = [
  { periodo: '2026e', crecimiento_pct: 10.5, margen_ebitda_pct: 22.1, amortizacion_pct_ventas: 12.5, capex_pct_ventas: 11.5, nwc_pct_ventas: 13.0, tasa_impositiva_pct: 30, fijo: true },
  { periodo: '2027e', crecimiento_pct: 8.0, margen_ebitda_pct: 23, amortizacion_pct_ventas: 12.5, capex_pct_ventas: 11.0, nwc_pct_ventas: 13.0, tasa_impositiva_pct: 26, fijo: false },
  { periodo: '2028e', crecimiento_pct: 7.5, margen_ebitda_pct: 23.8, amortizacion_pct_ventas: 12.0, capex_pct_ventas: 11.0, nwc_pct_ventas: 13.0, tasa_impositiva_pct: 25, fijo: false },
  { periodo: '2029e', crecimiento_pct: 6.0, margen_ebitda_pct: 24.3, amortizacion_pct_ventas: 11.5, capex_pct_ventas: 10.5, nwc_pct_ventas: 13.0, tasa_impositiva_pct: 25, fijo: false },
  { periodo: '2030e', crecimiento_pct: 4.5, margen_ebitda_pct: 24.5, amortizacion_pct_ventas: 11.0, capex_pct_ventas: 10.5, nwc_pct_ventas: 13.0, tasa_impositiva_pct: 25, fijo: false },
  { periodo: '2031e', crecimiento_pct: 3.5, margen_ebitda_pct: 24.5, amortizacion_pct_ventas: 10.5, capex_pct_ventas: 10.5, nwc_pct_ventas: 13.0, tasa_impositiva_pct: 25, fijo: false },
  { periodo: '2032e', crecimiento_pct: 2.5, margen_ebitda_pct: 24, amortizacion_pct_ventas: 10.0, capex_pct_ventas: 10.0, nwc_pct_ventas: 13.0, tasa_impositiva_pct: 25, fijo: false },
  { periodo: '2033e', crecimiento_pct: 2.0, margen_ebitda_pct: 24, amortizacion_pct_ventas: 10.0, capex_pct_ventas: 10.0, nwc_pct_ventas: 13.0, tasa_impositiva_pct: 25, fijo: false },
];
// WACC: bono español a 10 años 4,13 % (7-oct-26); beta 0,96 = beta desapalancada de farmacéuticas de Damodaran (0,89, ene-26)
// reapalancada con D/E de mercado ≈ 11 %; prima de mercado 5,5 %; +0,5 pp por liquidez (1,4 M EUR/día) y tamaño;
// coste de la deuda 4,2 % (TIR efectiva del bono 2031); peso de la deuda 12 %.
export const wacc = { tasa_libre_pct: 4.13, beta: 0.96, prima_mercado_pct: 5.5, prima_adicional_pct: 0.5, coste_deuda_pct: 4.2, tasa_impositiva_pct: 25, peso_deuda_pct: 12 };
export const terminal = { metodo: 'gordon', crecimiento_pct: 1.5, multiplo_salida: 9.0 };
export const casos = [
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -2.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 1.0, multiplo_salida: null, perfil: null },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: null },
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 1.5, ajuste_wacc_pp: -0.3, crecimiento_terminal_pct: 2.0, multiplo_salida: null, perfil: null },
];
export const pesos = { dcf: 30, comparables: 15, transacciones: 0, suma_partes: 35, escenarios: 20 };
