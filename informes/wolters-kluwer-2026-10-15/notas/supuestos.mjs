// Supuestos del DCF, escenarios y pesos (Wolters Kluwer, corte 2026-10-15).
// Base: último ejercicio real 2025 (ingresos 6.125 M; EBITDA sin la plusvalía de FRR, 32,8 %).
// Cambios frente al 8-oct: crecimiento 2027e-2028e del 4,5 % al 5,0 % (el orgánico del 1S26 y la guía por división,
// sin la aceleración que espera la empresa en el 2S26); margen EBITDA 2027e-2028e al del consenso (33,5 % y 33,8 %);
// tasa libre del Bund del 14-oct (3,51 %). Escenarios y probabilidades, los mismos del 8-oct (no hay hechos nuevos).
// amortizacion_pct_ventas: solo inmovilizado, software propio y derechos de uso (no los intangibles adquiridos).
// capex_pct_ventas: capex de la empresa (guía 5-6 %) + altas de derechos de uso (~0,9 % de las ventas), por NIIF 16.
export const anios = [
  { periodo: '2026e', crecimiento_pct: 2.5, margen_ebitda_pct: 33.2, amortizacion_pct_ventas: 5.1, capex_pct_ventas: 6.2, nwc_pct_ventas: -16.0, tasa_impositiva_pct: 24.0, fijo: true },
  { periodo: '2027e', crecimiento_pct: 5.0, margen_ebitda_pct: 33.5, amortizacion_pct_ventas: 5.3, capex_pct_ventas: 6.3, nwc_pct_ventas: -16.0, tasa_impositiva_pct: 24.0, fijo: false },
  { periodo: '2028e', crecimiento_pct: 5.0, margen_ebitda_pct: 33.8, amortizacion_pct_ventas: 5.4, capex_pct_ventas: 6.4, nwc_pct_ventas: -16.0, tasa_impositiva_pct: 24.0, fijo: false },
  { periodo: '2029e', crecimiento_pct: 4.5, margen_ebitda_pct: 34.0, amortizacion_pct_ventas: 5.5, capex_pct_ventas: 6.4, nwc_pct_ventas: -16.0, tasa_impositiva_pct: 24.0, fijo: false },
  { periodo: '2030e', crecimiento_pct: 4.0, margen_ebitda_pct: 34.2, amortizacion_pct_ventas: 5.6, capex_pct_ventas: 6.4, nwc_pct_ventas: -16.0, tasa_impositiva_pct: 24.0, fijo: false },
];

export const wacc = { tasa_libre_pct: 3.51, beta: 0.80, prima_mercado_pct: 5.5, prima_adicional_pct: 0.0, coste_deuda_pct: 3.75, tasa_impositiva_pct: 24.0, peso_deuda_pct: 22.0 };

export const terminal = { metodo: 'gordon', crecimiento_pct: 2.0, multiplo_salida: 11.0 };

export const etapa2 = { usar: true, anios: 5, margen_final_pct: null };

export const casos = [
  { escenario: 'Bajista', probabilidad_pct: 35, ajuste_crecimiento_pp: -4.0, ajuste_margen_pp: -4.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 1.0, multiplo_salida: null },
  { escenario: 'Base', probabilidad_pct: 45, ajuste_crecimiento_pp: 0.0, ajuste_margen_pp: 0.0, ajuste_wacc_pp: 0.0, crecimiento_terminal_pct: null, multiplo_salida: null },
  { escenario: 'Alcista', probabilidad_pct: 20, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0.0, crecimiento_terminal_pct: 2.5, multiplo_salida: null },
];

export const pesos = { dcf: 40, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 40 };
