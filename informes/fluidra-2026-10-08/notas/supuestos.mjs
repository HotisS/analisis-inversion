// Supuestos del DCF de Fluidra (corte 2026-10-08), en millones de EUR.
// Base: EBITDA reportado NIIF de 2025 (472 M; 21,6 %). Los costes de reestructuración, M&A e integración y la
// remuneración en acciones se repiten todos los años (56 M en 2024, 29 M en 2025, 50-55 M previstos en 2026):
// el margen del DCF los descuenta (≈ 2,4 puntos en 2026, 1,5 en 2027, 1,2 en 2028 y 1,0 después).
// Capex con las altas de derechos de uso (pagos de arrendamientos ≈ 2,2 % de ventas) porque los arrendamientos van en la deuda.
const fila = (periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas, fijo = false) => ({
  periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas,
  nwc_pct_ventas: 21.5, tasa_impositiva_pct: 25.5, fijo,
});

export const anios = [
  fila('2026e', 3.5, 21.2, 7.4, 5.5, true),
  fila('2027e', 4.5, 22.3, 7.2, 5.5),
  fila('2028e', 5.0, 23.0, 7.0, 5.5),
  fila('2029e', 5.0, 23.4, 6.6, 5.5),
  fila('2030e', 4.5, 23.5, 6.2, 5.5),
  fila('2031e', 4.0, 23.5, 5.8, 5.5),
  fila('2032e', 3.5, 23.5, 5.6, 5.5),
  fila('2033e', 3.0, 23.5, 5.4, 5.5),
];

export const wacc = {
  tasa_libre_pct: 3.57, beta: 1.10, prima_mercado_pct: 5.5, prima_adicional_pct: 0,
  coste_deuda_pct: 5.7, tasa_impositiva_pct: 25.5, peso_deuda_pct: 27,
};

export const terminal = { metodo: 'gordon', crecimiento_pct: 2.25, multiplo_salida: 9.5 };

export const pesos = { dcf: 50, comparables: 25, transacciones: 0, suma_partes: 0, escenarios: 25 };

export const supuestos = {
  dcf: {
    anios, wacc, terminal,
    etapa2: { usar: false, anios: 8, margen_final_pct: null, justificacion: null },
    mitad_de_anio: true,
  },
  valoracion: { pesos },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [] },
  escenarios: {
    casos: [
      { escenario: 'Bajista', probabilidad_pct: 30, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -2.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.0, multiplo_salida: null,
        perfil: [{ periodo: '2027e', crecimiento_pp: -10, margen_pp: -2.5 }], narrativa: null },
      { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [], narrativa: null },
      { escenario: 'Alcista', probabilidad_pct: 20, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.5, multiplo_salida: null, perfil: [], narrativa: null },
    ],
  },
};
