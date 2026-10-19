// Supuestos del DCF, escenarios y pesos de Booz Allen (corte 2026-10-19). Ejercicio a 31 de marzo (FY2027 = abr-26 a mar-27), USD, US GAAP.
// EBITDA publicado (= EBIT + amortizaciones, con la de intangibles comprados). Capex FY2027 con 105 M de la nueva sede (guía: 220 M).
// Amortización sube en FY2027-28 por los intangibles de Defy y Ultra y luego baja hacia el capex.
const a = (periodo, g, m, am, cx) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: cx, nwc_pct_ventas: 10.3, tasa_impositiva_pct: 22.0, fijo: false });
export default {
  anios: [
    a('FY2027e', 1.5, 11.0, 1.8, 1.9),
    a('FY2028e', 3.0, 11.2, 1.8, 1.2),
    a('FY2029e', 4.0, 11.3, 1.6, 1.1),
    a('FY2030e', 4.0, 11.4, 1.5, 1.1),
    a('FY2031e', 3.5, 11.4, 1.4, 1.1),
    a('FY2032e', 3.0, 11.4, 1.3, 1.2),
    a('FY2033e', 3.0, 11.4, 1.2, 1.2),
  ],
  wacc: { tasa_libre_pct: 5.09, beta: 0.85, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.6, tasa_impositiva_pct: 23.0, peso_deuda_pct: 33.0 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 10 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -1.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.0, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 0.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
  puente_ingresos: [
    { periodo: 'FY2027e', volumen_pct: -2.0, precio_pct: 0.5, otros_pct: 3.0 },
    { periodo: 'FY2028e', volumen_pct: 1.5, precio_pct: 0.5, otros_pct: 1.0 },
    { periodo: 'FY2029e', volumen_pct: 3.5, precio_pct: 0.5, otros_pct: 0.0 },
    { periodo: 'FY2030e', volumen_pct: 3.5, precio_pct: 0.5, otros_pct: 0.0 },
    { periodo: 'FY2031e', volumen_pct: 3.0, precio_pct: 0.5, otros_pct: 0.0 },
  ],
  mercado_final: null,
  // BPA FY2029e normalizado (US GAAP, tipo fiscal 22 %, sin plusvalías de inversiones): ventas × margen EBITDA − amortización − intereses netos (≈200 M) − impuesto, ÷ 119,5 M acciones.
  bpa_12m: { Bajista: 5.03, Base: 6.42, Alcista: 7.17 },
};
