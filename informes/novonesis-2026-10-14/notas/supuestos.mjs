// Supuestos del DCF, escenarios y pesos de Novonesis (corte 2026-10-14). Ejercicio natural, EUR.
// Margen EBITDA del DCF = margen ajustado (guía y plan 2030) menos los «special items» que se repiten cada año (integraciones, ERP, compras).
// Amortización SIN la de intangibles de compras (PPA): no es caja y no desgrava como tal; así el impuesto del DCF no se infla con ella.
const a = (periodo, g, m, am, cx, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: cx, nwc_pct_ventas: 26, tasa_impositiva_pct: 22.5, fijo });
export default {
  anios: [
    a('2026e', 7.0, 36.8, 6.8, 13.0, true), // guía: orgánico 7-8 %, EUR ~0,5 p.p. menos; margen ajustado 37,9 % − special items ~50 M (1,1 %)
    a('2027e', 7.0, 37.8, 7.2, 12.0),
    a('2028e', 7.0, 38.3, 7.6, 10.5),
    a('2029e', 6.5, 38.5, 7.8, 9.5),
    a('2030e', 6.0, 38.7, 8.0, 9.0),
    a('2031e', 5.0, 38.7, 8.0, 8.6),
    a('2032e', 4.0, 38.7, 8.0, 8.3),
    a('2033e', 3.0, 38.7, 8.0, 8.2),
  ],
  wacc: { tasa_libre_pct: 3.51, beta: 0.86, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 3.8, tasa_impositiva_pct: 22.5, peso_deuda_pct: 10 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 18 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.5, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 0.8, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 40, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 40 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 5.5, precio_pct: 2.0, otros_pct: -0.5 },
    { periodo: '2027e', volumen_pct: 5.0, precio_pct: 1.5, otros_pct: 0.5 },
    { periodo: '2028e', volumen_pct: 5.0, precio_pct: 1.5, otros_pct: 0.5 },
    { periodo: '2029e', volumen_pct: 5.0, precio_pct: 1.5, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 4.5, precio_pct: 1.5, otros_pct: 0 },
  ],
  mercado_final: null,
  // BPA ajustado sin PPA del ejercicio objetivo (2028e) por escenario y su cuadre (ver revision-12m).
  bpa12m: { Bajista: 2.27, Base: 2.52, Alcista: 2.66 },
};
