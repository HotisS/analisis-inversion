// Supuestos del DCF, escenarios y pesos de Neurocrine (corte 2026-11-09, tras el 3T26). USD, ejercicio natural.
// Hoja de producto (estimación propia, M USD):
//          INGREZZA  CRENESSITY  VYKAT  Cartera nueva  Otros   Total
// 2026e     2.912      785        271        0          17     3.985   (guía de INGREZZA 2.900-2.925; nueve meses: 2.174 / 548 / 161 / 13)
// 2027e     3.030     1.100       460        0          20     4.610   (INGREZZA: volumen de dos dígitos y precio neto −6 %, «mid- to high single-digit»)
// 2028e     3.120     1.330       530        0          20     5.000
// 2029e     2.825     1.480       580        0          20     4.905   (precio negociado de Medicare para INGREZZA desde el 1-ene-2029)
// 2030e     2.885     1.580       610      100          20     5.195
// 2031e-2035e: +5,5 %, +4,5 %, +3,5 %, +3,0 %, +2,5 % (CRENESSITY y VYKAT maduran; cartera ponderada por probabilidad)
// Genéricos de INGREZZA desde el 1-mar-2038: fuera de la proyección explícita, recogidos en el terminal (crecimiento 1 % y múltiplo de 8x EBITDA).
const a = (periodo, g, m, am, cx, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: cx, nwc_pct_ventas: 3.5, tasa_impositiva_pct: 23, fijo });
export default {
  anios: [
    a('2026e', 39.3, 26.9, 3.0, 0.8, true),
    a('2027e', 15.7, 30.0, 3.8, 1.0),
    a('2028e', 8.5, 34.0, 3.6, 1.0),
    a('2029e', -1.9, 32.3, 3.7, 1.0),
    a('2030e', 5.9, 34.3, 3.5, 1.2),
    a('2031e', 5.5, 35.0, 3.3, 1.5),
    a('2032e', 4.5, 35.5, 3.1, 1.8),
    a('2033e', 3.5, 36.0, 3.0, 2.2),
    a('2034e', 3.0, 36.0, 2.9, 2.5),
    a('2035e', 2.5, 36.0, 2.8, 2.8),
  ],
  wacc: { tasa_libre_pct: 4.86, beta: 0.8, prima_mercado_pct: 5.5, prima_adicional_pct: 1.0, coste_deuda_pct: 4.9, tasa_impositiva_pct: 23, peso_deuda_pct: 0 },
  terminal: { metodo: 'media', crecimiento_pct: 1.0, multiplo_salida: 8.0 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -2.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 31.8, precio_pct: -2.0, otros_pct: 9.5 },
    { periodo: '2027e', volumen_pct: 15.7, precio_pct: -4.4, otros_pct: 4.4 },
    { periodo: '2028e', volumen_pct: 10.0, precio_pct: -1.5, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 6.8, precio_pct: -8.7, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 6.4, precio_pct: -0.5, otros_pct: 0 },
  ],
  mercado_final: null,
};
