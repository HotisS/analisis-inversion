// Supuestos del DCF, escenarios, pesos y rentabilidad a 12 meses de MSCI (corte 2026-10-14). USD, ejercicio natural.
// Capex = inmovilizado + software activado (guía 2026: 160-170 M). Amortización = depreciación + amortización de intangibles
// (incluye los comprados, que no se reponen: por eso converge hacia el capex). Circulante negativo (ingresos diferidos).
const a = (periodo, g, m, am, cx, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: cx, nwc_pct_ventas: -8.0, tasa_impositiva_pct: 19.5, fijo });
export default {
  anios: [
    a('2026e', 12.2, 61.5, 5.7, 4.7, true),
    a('2027e', 9.0, 62.0, 5.5, 4.6),
    a('2028e', 8.5, 62.5, 5.4, 4.6),
    a('2029e', 8.0, 63.0, 5.3, 4.7),
    a('2030e', 7.5, 63.0, 5.2, 4.8),
    a('2031e', 6.5, 63.0, 5.1, 4.9),
    a('2032e', 5.5, 63.0, 5.0, 5.0),
    a('2033e', 4.5, 63.0, 5.0, 5.0),
  ],
  wacc: { tasa_libre_pct: 5.21, beta: 1.1, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.2, tasa_impositiva_pct: 19.5, peso_deuda_pct: 13.6 },
  terminal: { metodo: 'media', crecimiento_pct: 3.5, multiplo_salida: 17 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -2.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 3.0, multiplo_salida: 15 },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: 19 },
  ],
  pesos: { dcf: 40, comparables: 25, transacciones: 0, suma_partes: 0, escenarios: 35 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 6.2, precio_pct: 3.0, otros_pct: 3.0 },
    { periodo: '2027e', volumen_pct: 5.5, precio_pct: 2.5, otros_pct: 1.0 },
    { periodo: '2028e', volumen_pct: 5.0, precio_pct: 2.5, otros_pct: 1.0 },
    { periodo: '2029e', volumen_pct: 4.5, precio_pct: 2.5, otros_pct: 1.0 },
    { periodo: '2030e', volumen_pct: 4.5, precio_pct: 2.5, otros_pct: 0.5 },
  ],
  mercado_final: null,
  // Rentabilidad a 12 meses: BPA ajustado (sin amortización de intangibles comprados, ≈ 0,95-1,00 USD) de 2028e.
  bpa_12m: { Bajista: 21.35, Base: 23.86, Alcista: 25.06 },
  per_historico: { base: 'adelantado', actual: 25.9, mediana_5a: 34.6, minimo_5a: 29.3, media_larga: 31.9 },
  per_historico_v2: { mediana_5a: 40.1, minimo_5a: 33.2, media_larga: 37.1 },
  comparables_per: { mediana: 23.5 },
};
