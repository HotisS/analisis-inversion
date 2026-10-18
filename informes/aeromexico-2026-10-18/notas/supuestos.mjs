// Supuestos del DCF, escenarios y pesos de Grupo Aeroméxico (corte 2026-10-18). USD, ejercicio natural, NIIF 16.
// EBITDA del informe = resultado de explotación + amortizaciones (NIIF 16: sin alquiler de aviones, que va a deuda).
// Capex = inversión en inmovilizado e intangibles + altas de derecho de uso (aviones arrendados): como el puente resta
// los arrendamientos, los aviones nuevos arrendados se tratan como inversión financiada con deuda.
// Impuestos: 20 % en 2026-2028 (pérdidas fiscales sin reconocer de 1.918 M brutos [A1]; tipo efectivo 5-15 % en 2023-2025),
// 25 % en 2029-2030 y 30 % (tipo legal) desde 2031.
const a = (periodo, g, m, am, cx, tax, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: cx, nwc_pct_ventas: -15.0, tasa_impositiva_pct: tax, fijo });
export default {
  anios: [
    a('2026e', 13.5, 24.7, 13.3, 19.0, 20, true),
    a('2027e', 6.0, 27.0, 13.2, 18.0, 20),
    a('2028e', 6.0, 27.0, 13.2, 17.5, 20),
    a('2029e', 5.5, 26.5, 13.2, 17.0, 25),
    a('2030e', 5.0, 26.5, 13.2, 16.5, 25),
    a('2031e', 4.5, 25.5, 13.2, 16.0, 30),
    a('2032e', 4.0, 25.5, 13.2, 16.0, 30),
    a('2033e', 4.0, 25.5, 13.2, 15.5, 30),
    a('2034e', 3.5, 25.5, 13.2, 15.5, 30),
    a('2035e', 3.5, 25.5, 13.2, 15.5, 30),
  ],
  // Beta desapalancada de Damodaran (Air Transport, corregida de caja) 0,76, reapalancada con deuda+arrendamientos/capitalización 1,75 → 1,69; se usa 1,7 con peso de la deuda del 60 % (objetivo a medio plazo).
  wacc: { tasa_libre_pct: 5.10, beta: 1.7, prima_mercado_pct: 5.0, prima_adicional_pct: 2.46, coste_deuda_pct: 8.0, tasa_impositiva_pct: 30, peso_deuda_pct: 60 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 5 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -2.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.0, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 3.0, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 25, transacciones: 0, suma_partes: 0, escenarios: 25 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 4.5, precio_pct: 9.0, otros_pct: 0 },
    { periodo: '2027e', volumen_pct: 4.0, precio_pct: 2.0, otros_pct: 0 },
    { periodo: '2028e', volumen_pct: 4.0, precio_pct: 2.0, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 3.5, precio_pct: 2.0, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 3.0, precio_pct: 2.0, otros_pct: 0 },
  ],
  mercado_final: null,
  // BPA propio por ADS (145,9 M ADS), con el EBIT del DCF del motor: EBIT − resultado financiero recurrente − 20 % de impuestos.
  // 2026e: 694 − 510 = 184 × 0,8 = 147 → 1,01. 2027e: 890 − 480 = 410 × 0,8 = 328 → 2,25.
  // Base 2028e: 6.836 × (27,0 % − 13,2 %) = 943 − 470 = 473 × 0,8 = 378 → 2,59.
  // Bajista 2028e: crecimiento −2 pp y margen −2,5 pp: 6.574 × 11,3 % = 743 − 480 = 263 × 0,8 → 1,44.
  // Alcista 2028e: +1,5 pp y +1,5 pp: 7.031 × 15,3 % = 1.076 − 450 = 626 × 0,8 → 3,43.
  bpa_2028: { Bajista: 1.44, Base: 2.59, Alcista: 3.43 },
  bpa_2026: 1.01, bpa_2027: 2.25,
};
