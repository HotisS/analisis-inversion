// Supuestos del DCF de bioMérieux (corte 2026-10-08), en millones de EUR.
// Base: 2025 real con el EBITDA antes de no recurrentes (972 M; 23,9 %).
// Capex con los pagos de arrendamientos (NIIF 16: ~0,7 % de las ventas) y la nueva planta de La Balme (>250 M en 2026-2029).
const fila = (periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas, fijo = false) => ({
  periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas,
  nwc_pct_ventas: 35.5, tasa_impositiva_pct: 24.5, fijo,
});

export const anios = [
  fila('2026e', 0.5, 23.3, 6.9, 8.6, true),
  fila('2027e', 4.5, 23.9, 7.0, 9.4),
  fila('2028e', 4.5, 24.4, 7.1, 9.4),
  fila('2029e', 5.0, 24.8, 7.2, 8.9),
  fila('2030e', 5.0, 25.1, 7.3, 8.5),
  fila('2031e', 4.5, 25.3, 7.4, 8.2),
  fila('2032e', 4.0, 25.4, 7.5, 8.0),
  fila('2033e', 3.5, 25.5, 7.6, 7.8),
];

export const wacc = {
  tasa_libre_pct: 3.55, beta: 0.87, prima_mercado_pct: 5.5, prima_adicional_pct: 0.5,
  coste_deuda_pct: 3.5, tasa_impositiva_pct: 24.5, peso_deuda_pct: 4.2,
};

export const terminal = { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 11.0 };

export const pesos = { dcf: 45, comparables: 25, transacciones: 0, suma_partes: 0, escenarios: 30 };

export const supuestos = {
  dcf: {
    anios, wacc, terminal,
    etapa2: { usar: false, anios: 8, margen_final_pct: null, justificacion: null },
    mitad_de_anio: true,
  },
  valoracion: { pesos },
  escenarios: {
    casos: [
      { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0.25, crecimiento_terminal_pct: 2.0, multiplo_salida: null, perfil: [], narrativa: null },
      { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [], narrativa: null },
      { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.75, multiplo_salida: null, perfil: [], narrativa: null },
    ],
  },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: null, confianza: 'Media' },
};
