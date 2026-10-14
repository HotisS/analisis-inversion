// Supuestos del DCF, escenarios y pesos de Lotus Bakeries (corte 2026-10-14). EUR, ejercicio natural, NIIF 16.
// Margen EBITDA = (EBIT publicado + amortizaciones) / ventas: 19,8 % en 2025 (el EBITDA(u) de la empresa, 20,2 %, suma provisiones y partidas no subyacentes).
// Capex = inmovilizado e intangibles + altas de arrendamientos (~0,6 % de las ventas). Programa: >250 M en 2026-2027; ≥500 M de Biscoff en 2026-2030.
const a = (periodo, g, m, am, cx, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: cx, nwc_pct_ventas: 4.0, tasa_impositiva_pct: 23.5, fijo });
export default {
  anios: [
    a('2026e', 12.5, 20.9, 3.3, 8.5, true),
    a('2027e', 11.0, 21.1, 3.5, 8.0),
    a('2028e', 10.0, 21.3, 3.6, 7.5),
    a('2029e', 8.5, 21.4, 3.7, 7.0),
    a('2030e', 7.5, 21.5, 3.8, 6.5),
    a('2031e', 6.5, 21.5, 3.9, 6.5),
    a('2032e', 5.5, 21.5, 4.0, 6.0),
    a('2033e', 4.5, 21.5, 4.1, 6.0),
    a('2034e', 3.5, 21.5, 4.2, 5.5),
    a('2035e', 3.0, 21.5, 4.2, 5.5),
  ],
  wacc: { tasa_libre_pct: 3.51, beta: 0.85, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 2.0, tasa_impositiva_pct: 25, peso_deuda_pct: 3 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 20 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 10, transacciones: 0, suma_partes: 0, escenarios: 40 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 13.0, precio_pct: 1.5, otros_pct: -2.0 },
    { periodo: '2027e', volumen_pct: 9.5, precio_pct: 1.5, otros_pct: 0 },
    { periodo: '2028e', volumen_pct: 8.5, precio_pct: 1.5, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 7.5, precio_pct: 1.5, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 6.5, precio_pct: 1.5, otros_pct: 0 },
  ],
  mercado_final: { periodo: '2030e', tamano: 130400 },
  // BPA 2028e = ventas × (margen EBITDA − amortización) − resultado financiero (−3 M) − impuestos (23,5 %) ÷ 0,8137 M de acciones diluidas
  bpa12m: { Bajista: 265.5, Base: 306.9, Alcista: 336.4 },
};
