// Supuestos del DCF, escenarios y pesos (Wolters Kluwer, corte 2026-10-08).
// Base: último ejercicio real 2025 (ingresos 6.125 M; EBITDA sin la plusvalía de FRR, 32,8 %).
// amortizacion_pct_ventas: solo inmovilizado, software propio y derechos de uso (no los intangibles adquiridos).
// capex_pct_ventas: capex de la empresa + altas de derechos de uso (~0,9 % de las ventas), por NIIF 16.
export const anios = [
  { periodo: '2026e', crecimiento_pct: 2.5, margen_ebitda_pct: 33.1, amortizacion_pct_ventas: 4.9, capex_pct_ventas: 6.2, nwc_pct_ventas: -16.0, tasa_impositiva_pct: 24.0, fijo: true },
  { periodo: '2027e', crecimiento_pct: 4.5, margen_ebitda_pct: 33.4, amortizacion_pct_ventas: 5.1, capex_pct_ventas: 6.3, nwc_pct_ventas: -16.0, tasa_impositiva_pct: 24.0, fijo: false },
  { periodo: '2028e', crecimiento_pct: 4.5, margen_ebitda_pct: 33.7, amortizacion_pct_ventas: 5.3, capex_pct_ventas: 6.3, nwc_pct_ventas: -16.0, tasa_impositiva_pct: 24.0, fijo: false },
  { periodo: '2029e', crecimiento_pct: 4.0, margen_ebitda_pct: 34.0, amortizacion_pct_ventas: 5.5, capex_pct_ventas: 6.3, nwc_pct_ventas: -16.0, tasa_impositiva_pct: 24.0, fijo: false },
  { periodo: '2030e', crecimiento_pct: 4.0, margen_ebitda_pct: 34.2, amortizacion_pct_ventas: 5.6, capex_pct_ventas: 6.3, nwc_pct_ventas: -16.0, tasa_impositiva_pct: 24.0, fijo: false },
];

export const wacc = { tasa_libre_pct: 3.57, beta: 0.80, prima_mercado_pct: 5.5, prima_adicional_pct: 0.0, coste_deuda_pct: 3.75, tasa_impositiva_pct: 24.0, peso_deuda_pct: 22.0 };

export const terminal = { metodo: 'gordon', crecimiento_pct: 2.0, multiplo_salida: 11.0 };

export const etapa2 = { usar: true, anios: 5, margen_final_pct: null };

export const casos = [
  { escenario: 'Bajista', probabilidad_pct: 35, ajuste_crecimiento_pp: -4.0, ajuste_margen_pp: -4.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 1.0, multiplo_salida: null },
  { escenario: 'Base', probabilidad_pct: 45, ajuste_crecimiento_pp: 0.0, ajuste_margen_pp: 0.0, ajuste_wacc_pp: 0.0, crecimiento_terminal_pct: null, multiplo_salida: null },
  { escenario: 'Alcista', probabilidad_pct: 20, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0.0, crecimiento_terminal_pct: 2.5, multiplo_salida: null },
];

export const pesos = { dcf: 40, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 40 };
