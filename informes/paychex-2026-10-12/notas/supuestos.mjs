// Supuestos del DCF, escenarios y pesos (Paychex, corte 2026-10-12)
const fila = (periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas) => ({
  periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas,
  nwc_pct_ventas: 20.8, tasa_impositiva_pct: 24, fijo: false,
});

export const anios = [
  // capex = inmovilizado y otros activos (~4,3 %) + exceso de comisiones activadas sobre su amortización (~1,4 % en FY2026, baja a ~0,5 %)
  fila('FY2027e', 5.5, 47.0, 6.3, 5.3),
  fila('FY2028e', 5.5, 47.5, 5.8, 5.2),
  fila('FY2029e', 5.0, 47.5, 5.3, 5.2),
  fila('FY2030e', 4.8, 47.5, 4.9, 5.1),
  fila('FY2031e', 4.5, 47.5, 4.6, 5.1),
  fila('FY2032e', 4.0, 47.5, 4.5, 5.0),
  fila('FY2033e', 3.5, 47.5, 4.5, 5.0),
  fila('FY2034e', 3.5, 47.5, 4.5, 5.0),
];

export const wacc = {
  tasa_libre_pct: 5.22, beta: 0.90, prima_mercado_pct: 5.5, prima_adicional_pct: 0,
  coste_deuda_pct: 5.24, tasa_impositiva_pct: 24, peso_deuda_pct: 10.9,
};

export const terminal = { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 13 };

export const etapa2 = { usar: false, anios: 10, margen_final_pct: null };

export const casos = [
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.5, multiplo_salida: null,
    perfil: [{ periodo: 'FY2028e', crecimiento_pp: -5.0, margen_pp: -2.5 }] },
  { escenario: 'Base', probabilidad_pct: 55, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  { escenario: 'Alcista', probabilidad_pct: 20, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: -0.25, crecimiento_terminal_pct: 3.25, multiplo_salida: null },
];

export const pesos = { dcf: 45, comparables: 20, transacciones: 5, suma_partes: 0, escenarios: 30 };
