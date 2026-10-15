// Supuestos del DCF, escenarios y pesos (ADP, corte 2026-10-15). Ejercicio a 30 de junio; FY2027e = jul-2026 a jun-2027.
const fila = (periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas, fijo = false) => ({
  periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas,
  nwc_pct_ventas: 15.0, tasa_impositiva_pct: 23, fijo,
});

// Margen EBITDA = EBIT (BAI + gastos por intereses − ingresos por intereses corporativos) + amortizaciones, sin partidas únicas.
// Capex = inmovilizado + software e intangibles + aumento neto de costes de contrato activados (≈3,5 % de las ventas en FY2026).
export const anios = [
  fila('FY2027e', 5.5, 30.2, 2.7, 3.5),
  fila('FY2028e', 5.5, 30.8, 2.7, 3.5),
  fila('FY2029e', 5.5, 31.3, 2.7, 3.5),
  fila('FY2030e', 5.0, 31.7, 2.7, 3.5),
  fila('FY2031e', 5.0, 32.0, 2.7, 3.5),
  fila('FY2032e', 4.5, 32.2, 2.7, 3.5),
  fila('FY2033e', 4.0, 32.3, 2.7, 3.4),
  fila('FY2034e', 3.5, 32.3, 2.7, 3.3),
];

export const wacc = {
  tasa_libre_pct: 5.21, beta: 0.85, prima_mercado_pct: 5.5, prima_adicional_pct: 0,
  coste_deuda_pct: 4.75, tasa_impositiva_pct: 23, peso_deuda_pct: 4.3,
};

export const terminal = { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 18 };
export const etapa2 = { usar: false, anios: 10, margen_final_pct: null };

export const casos = [
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.5, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.5, multiplo_salida: null },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: -0.25, crecimiento_terminal_pct: 3.25, multiplo_salida: null },
];

export const pesos = { dcf: 45, comparables: 20, transacciones: 5, suma_partes: 0, escenarios: 30 };
