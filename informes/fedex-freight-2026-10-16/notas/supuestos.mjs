// Supuestos del DCF, escenarios y pesos de FedEx Freight (corte 2026-10-16). Ejercicios a mayo (FY2027e = jun-26 a may-27), USD, US GAAP.
// EBITDA contable: FY2027e lleva ≈280 M de costes de la separación (guía del periodo de transición y ≈150 M de ene-may 2027).
// FY2027e fijo: siete de sus doce meses tienen guía (ingresos +4-6 %, EBIT 475-515 M).
const a = (periodo, g, m, fijo = false, capex = 5.5) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: 5.6, capex_pct_ventas: capex, nwc_pct_ventas: 12.0, tasa_impositiva_pct: 26, fijo });
export default {
  anios: [
    a('FY2027e', 4.5, 14.8, true),
    a('FY2028e', 5.5, 18.5),
    a('FY2029e', 5.0, 19.5),
    a('FY2030e', 4.5, 20.0),
    a('FY2031e', 4.0, 20.5),
    a('FY2032e', 3.8, 20.5),
    a('FY2033e', 3.5, 20.5, false, 5.7),
    a('FY2034e', 3.3, 20.5, false, 5.8),
    a('FY2035e', 3.0, 20.5, false, 5.8),
    a('FY2036e', 3.0, 20.5, false, 5.8),
  ],
  wacc: { tasa_libre_pct: 5.10, beta: 1.25, prima_mercado_pct: 5.0, prima_adicional_pct: 0, coste_deuda_pct: 5.8, tasa_impositiva_pct: 26, peso_deuda_pct: 21.5 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 10 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -2.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
  puente_ingresos: [
    { periodo: 'FY2027e', volumen_pct: -0.5, precio_pct: 3.5, otros_pct: 1.5 },
    { periodo: 'FY2028e', volumen_pct: 2.5, precio_pct: 3.0, otros_pct: 0 },
    { periodo: 'FY2029e', volumen_pct: 2.0, precio_pct: 3.0, otros_pct: 0 },
    { periodo: 'FY2030e', volumen_pct: 1.5, precio_pct: 3.0, otros_pct: 0 },
    { periodo: 'FY2031e', volumen_pct: 1.0, precio_pct: 3.0, otros_pct: 0 },
  ],
  mercado_final: { periodo: 'FY2036e', tamano: 76000 },
};
