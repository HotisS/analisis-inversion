// Supuestos del DCF de Rentokil Initial (corte 2026-10-07), en millones de USD.
// Base: el motor parte del EBITDA estatutario de 2025 + partidas «one-off» (1.399 M; 20,3 % de margen).
// Las partidas «one-off» se repiten todos los años (119, 110 y 287 M en 2023-2025): el margen del DCF las descuenta
// (2,0 puntos en 2026-2028 por la transformación de Norteamérica y las dotaciones de termitas; 1,5 puntos después).
// Capex con los pagos de arrendamientos (NIIF 16): la flota de furgonetas va en derechos de uso.
const fila = (periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas, fijo = false) => ({
  periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas,
  nwc_pct_ventas: 10.5, tasa_impositiva_pct: 25.5, fijo,
});

export const anios = [
  fila('2026e', 4.7, 18.7, 7.4, 5.6, true),
  fila('2027e', 2.5, 19.1, 7.2, 5.9),
  fila('2028e', 4.0, 19.7, 7.0, 6.1),
  fila('2029e', 4.5, 20.1, 6.8, 6.2),
  fila('2030e', 4.5, 20.4, 6.6, 6.3),
  fila('2031e', 4.0, 20.6, 6.5, 6.3),
  fila('2032e', 3.5, 20.6, 6.4, 6.3),
  fila('2033e', 3.0, 20.6, 6.3, 6.3),
];

export const wacc = {
  tasa_libre_pct: 5.31, beta: 0.91, prima_mercado_pct: 5.5, prima_adicional_pct: 0,
  coste_deuda_pct: 5.8, tasa_impositiva_pct: 25.5, peso_deuda_pct: 26.2,
};

export const terminal = { metodo: 'gordon', crecimiento_pct: 2.75, multiplo_salida: 10.5 };

export const pesos = { dcf: 50, comparables: 15, transacciones: 0, suma_partes: 0, escenarios: 35 };

export const supuestos = {
  dcf: {
    anios, wacc, terminal,
    etapa2: { usar: false, anios: 8, margen_final_pct: null, justificacion: null },
    mitad_de_anio: true,
  },
  valoracion: { pesos },
  escenarios: {
    casos: [
      { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -1.5, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0.25, crecimiento_terminal_pct: 2.25, multiplo_salida: null, perfil: [], narrativa: null },
      { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [], narrativa: null },
      { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.25, ajuste_margen_pp: 1.25, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 3.0, multiplo_salida: null, perfil: [], narrativa: null },
    ],
  },
};
