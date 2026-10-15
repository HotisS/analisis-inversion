// Supuestos del DCF, escenarios y pesos de Neurocrine (corte 2026-10-15). USD, ejercicio natural.
// Hoja de producto (estimación propia, M USD):
//          INGREZZA  CRENESSITY  VYKAT  Cartera nueva  Otros   Total
// 2026e     2.850      800        255        0          20     3.925
// 2027e     2.960     1.100       400        0          20     4.480
// 2028e     3.050     1.330       470        0          20     4.870
// 2029e     2.760     1.480       520        0          20     4.780   (precio negociado de Medicare para INGREZZA desde el 1-ene-2029)
// 2030e     2.820     1.580       560      100          20     5.080
// 2031e-2035e: +5,5 %, +4,5 %, +3,5 %, +3,0 %, +2,5 % (CRENESSITY y VYKAT maduran; cartera ponderada por probabilidad)
// Genéricos de INGREZZA desde el 1-mar-2038: fuera de la proyección explícita, recogidos en el terminal (crecimiento 1 % y múltiplo de 8x EBITDA).
const a = (periodo, g, m, am, cx, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: cx, nwc_pct_ventas: 3.5, tasa_impositiva_pct: 23, fijo });
export default {
  anios: [
    a('2026e', 37.2, 27.0, 3.1, 1.0, true),
    a('2027e', 14.1, 30.6, 3.9, 1.0),
    a('2028e', 8.7, 34.1, 3.7, 1.0),
    a('2029e', -1.8, 32.3, 3.8, 1.0),
    a('2030e', 6.3, 34.3, 3.5, 1.2),
    a('2031e', 5.5, 35.0, 3.3, 1.5),
    a('2032e', 4.5, 35.5, 3.1, 1.8),
    a('2033e', 3.5, 36.0, 3.0, 2.2),
    a('2034e', 3.0, 36.0, 2.9, 2.5),
    a('2035e', 2.5, 36.0, 2.8, 2.8),
  ],
  wacc: { tasa_libre_pct: 5.21, beta: 0.8, prima_mercado_pct: 5.5, prima_adicional_pct: 1.0, coste_deuda_pct: 4.9, tasa_impositiva_pct: 23, peso_deuda_pct: 0 },
  terminal: { metodo: 'media', crecimiento_pct: 1.0, multiplo_salida: 8.0 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -2.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 30.0, precio_pct: -2.0, otros_pct: 9.2 },
    { periodo: '2027e', volumen_pct: 12.9, precio_pct: -2.5, otros_pct: 3.7 },
    { periodo: '2028e', volumen_pct: 10.2, precio_pct: -1.5, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 6.5, precio_pct: -8.3, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 6.8, precio_pct: -0.5, otros_pct: 0 },
  ],
  mercado_final: null,
};
