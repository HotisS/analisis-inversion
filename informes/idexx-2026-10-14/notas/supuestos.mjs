// Supuestos del DCF, escenarios y pesos de IDEXX (corte 2026-10-14). Ejercicio natural, USD.
// Capex = inversión del estado de flujos + instrumentos cedidos en arrendamiento operativo (≈0,3 % de ventas).
const a = (periodo, g, m, fijo = false, tx = 22) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: 3.4, capex_pct_ventas: 4.0, nwc_pct_ventas: 19, tasa_impositiva_pct: tx, fijo });
export default {
  anios: [
    a('2026e', 9.7, 35.8, true, 21.3),
    a('2027e', 9.0, 36.4),
    a('2028e', 9.0, 37.0),
    a('2029e', 8.5, 37.4),
    a('2030e', 8.0, 37.7),
    a('2031e', 7.0, 37.9),
    a('2032e', 6.0, 38.0),
  ],
  wacc: { tasa_libre_pct: 5.24, beta: 1.0, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.0, tasa_impositiva_pct: 22, peso_deuda_pct: 2.5 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 22 },
  etapa2: { usar: true, anios: 5, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -2.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 10, transacciones: 0, suma_partes: 0, escenarios: 40 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 4.5, precio_pct: 4.5, otros_pct: 0.7 },
    { periodo: '2027e', volumen_pct: 5.0, precio_pct: 4.0, otros_pct: 0 },
    { periodo: '2028e', volumen_pct: 5.0, precio_pct: 4.0, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 4.5, precio_pct: 4.0, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 4.5, precio_pct: 3.5, otros_pct: 0 },
  ],
  mercado_final: null,
};
