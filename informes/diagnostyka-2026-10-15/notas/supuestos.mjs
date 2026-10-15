// Supuestos del DCF, escenarios y pesos de Diagnostyka (corte 2026-10-15). Ejercicio natural, PLN, NIIF 16.
// Capex = inversión en inmovilizado (guía 2026: 170-220 M, ≈ 7 %) + principal de arrendamientos (≈ 5,3 % de ventas, por las altas
// de derechos de uso) + compras pequeñas (≈ 1,5-2 %), que explican el punto de «otros» del puente de ingresos.
const a = (periodo, g, m, am, cx, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: cx, nwc_pct_ventas: 8.0, tasa_impositiva_pct: 21, fijo });
export default {
  anios: [
    a('2026e', 13.9, 23.3, 8.6, 14.5, true),
    a('2027e', 11.0, 24.0, 8.6, 13.5),
    a('2028e', 10.0, 24.3, 8.6, 13.0),
    a('2029e', 9.0, 24.5, 8.7, 12.5),
    a('2030e', 8.0, 24.5, 8.7, 12.0),
    a('2031e', 7.0, 24.5, 8.8, 11.5),
    a('2032e', 6.0, 24.5, 8.8, 11.0),
  ],
  wacc: { tasa_libre_pct: 6.23, beta: 0.85, prima_mercado_pct: 5.5, prima_adicional_pct: 0.4, coste_deuda_pct: 6.6, tasa_impositiva_pct: 19, peso_deuda_pct: 18 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.5, multiplo_salida: 10 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -2.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 3.0, precio_pct: 9.0, otros_pct: 1.9 },
    { periodo: '2027e', volumen_pct: 4.0, precio_pct: 6.0, otros_pct: 1.0 },
    { periodo: '2028e', volumen_pct: 4.0, precio_pct: 5.0, otros_pct: 1.0 },
    { periodo: '2029e', volumen_pct: 4.0, precio_pct: 4.5, otros_pct: 0.5 },
    { periodo: '2030e', volumen_pct: 3.5, precio_pct: 4.0, otros_pct: 0.5 },
  ],
  // Bain: 1,4 mil millones de EUR en 2030 × 4,3658 PLN/EUR (BCE, 14-oct-2026)
  mercado_final: { periodo: '2030e', tamano: 6112 },
};
