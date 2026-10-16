// Supuestos del DCF, escenarios y pesos de Honeywell Aerospace (corte 2026-10-16). Ejercicio natural, USD, US GAAP.
// EBITDA propio = EBIT contable + amortizaciones, DESPUÉS de pagos en acciones, gastos medioambientales recurrentes y la licencia
// de marca a Honeywell (225 M/año hasta mediados de 2031) y ANTES de los costes de la escisión (no recurrentes) y del ingreso de pensiones.
const a = (periodo, g, m, am, cx, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: cx, nwc_pct_ventas: 13.5, tasa_impositiva_pct: 21.5, fijo });
export default {
  anios: [
    a('2026e', 5.7, 23.7, 2.55, 3.45, true),
    a('2027e', 7.0, 23.8, 2.55, 3.3),
    a('2028e', 7.0, 24.5, 2.55, 3.3),
    a('2029e', 6.5, 25.2, 2.6, 3.1),
    a('2030e', 6.0, 25.6, 2.6, 3.0),
    a('2031e', 5.5, 26.0, 2.6, 3.0),
    a('2032e', 5.0, 26.5, 2.6, 3.0),
    a('2033e', 4.5, 26.5, 2.6, 3.0),
  ],
  wacc: { tasa_libre_pct: 5.19, beta: 1.15, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.1, tasa_impositiva_pct: 21.5, peso_deuda_pct: 23.6 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 16 },
  etapa2: { usar: true, anios: 5, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.5, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.5, multiplo_salida: null, perfil: [{ periodo: '2028e', crecimiento_pp: -8.0, margen_pp: -2.5 }] },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 1.5, precio_pct: 3.0, otros_pct: 1.2 },
    { periodo: '2027e', volumen_pct: 4.0, precio_pct: 3.0, otros_pct: 0 },
    { periodo: '2028e', volumen_pct: 4.0, precio_pct: 3.0, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 3.5, precio_pct: 3.0, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 3.0, precio_pct: 3.0, otros_pct: 0 },
  ],
  mercado_final: null,
};
