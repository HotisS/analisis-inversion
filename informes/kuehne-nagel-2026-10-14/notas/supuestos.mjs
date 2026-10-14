// Supuestos del DCF, escenarios y pesos de Kuehne+Nagel (corte 2026-10-14). Ejercicio natural, CHF.
// Capex = inversión en inmovilizado (≈1 % de ventas) + altas de derechos de uso (NIIF 16, ≈2,6 % de ventas por los pagos de arrendamientos).
const a = (periodo, g, m, fijo = false, cx = 3.7) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: 3.7, capex_pct_ventas: cx, nwc_pct_ventas: 0, tasa_impositiva_pct: 24.5, fijo });
export default {
  anios: [
    a('2026e', 1.5, 9.6, true),
    a('2027e', 4.0, 9.8),
    a('2028e', 4.0, 10.0),
    a('2029e', 3.5, 10.2),
    a('2030e', 3.0, 10.3),
    a('2031e', 2.5, 10.3),
    a('2032e', 2.0, 10.3),
  ],
  wacc: { tasa_libre_pct: 0.54, beta: 1.0, prima_mercado_pct: 5.5, prima_adicional_pct: 1.0, coste_deuda_pct: 1.5, tasa_impositiva_pct: 24.5, peso_deuda_pct: 12 },
  terminal: { metodo: 'gordon', crecimiento_pct: 1.0, multiplo_salida: 11 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -1.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 0.8, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 40, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 40 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 3.5, precio_pct: 2.0, otros_pct: -4.0 },
    { periodo: '2027e', volumen_pct: 3.0, precio_pct: 1.0, otros_pct: 0 },
    { periodo: '2028e', volumen_pct: 3.0, precio_pct: 1.0, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 2.5, precio_pct: 1.0, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 2.0, precio_pct: 1.0, otros_pct: 0 },
  ],
  mercado_final: null,
};
