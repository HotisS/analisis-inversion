// Supuestos del DCF, escenarios y pesos de Advantest (corte 2026-10-15). Ejercicio de abril a marzo («FY2026» = abr-26 a mar-27), JPY, NIIF.
// Base: FY2026 en la guía de julio (ventas +52 %, margen operativo ≈49 %); FY2027-FY2028 por debajo del consenso;
// FY2029 con una corrección cíclica (ventas −10 %, como FY2023 −13 %); después, convergencia a un margen EBITDA del 40 %.
const a = (periodo, g, m, capex = 3.2, amort = 2.3) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: amort, capex_pct_ventas: capex, nwc_pct_ventas: 28, tasa_impositiva_pct: 27.5, fijo: false });
export default {
  anios: [
    a('FY2026e', 52.0, 51.0, 3.5, 1.8),
    a('FY2027e', 22.0, 50.5, 3.5, 2.0),
    a('FY2028e', 10.0, 49.5, 3.2, 2.2),
    a('FY2029e', -10.0, 44.0, 3.0, 2.5),
    a('FY2030e', 8.0, 43.0, 3.0, 2.5),
    a('FY2031e', 6.0, 42.0, 3.0, 2.5),
    a('FY2032e', 5.0, 41.0, 3.0, 2.6),
    a('FY2033e', 4.0, 40.5, 3.0, 2.7),
    a('FY2034e', 3.0, 40.0, 3.0, 2.8),
    a('FY2035e', 2.5, 40.0, 3.0, 2.9),
  ],
  wacc: { tasa_libre_pct: 3.015, beta: 1.5, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 1.0, tasa_impositiva_pct: 27.5, peso_deuda_pct: 0.4 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.0, multiplo_salida: 18 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -6.0, ajuste_margen_pp: -7.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 1.5, multiplo_salida: null, perfil: [{ periodo: 'FY2026e', crecimiento_pp: -3, margen_pp: -3 }, { periodo: 'FY2027e', crecimiento_pp: -12, margen_pp: -5 }, { periodo: 'FY2028e', crecimiento_pp: -10, margen_pp: -7.5 }] },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 4.0, ajuste_margen_pp: 2.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
  puente_ingresos: [
    { periodo: 'FY2026e', volumen_pct: 42.0, precio_pct: 5.0, otros_pct: 5.0 },
    { periodo: 'FY2027e', volumen_pct: 18.0, precio_pct: 3.0, otros_pct: 1.0 },
    { periodo: 'FY2028e', volumen_pct: 8.0, precio_pct: 2.0, otros_pct: 0 },
    { periodo: 'FY2029e', volumen_pct: -11.0, precio_pct: 1.0, otros_pct: 0 },
    { periodo: 'FY2030e', volumen_pct: 6.5, precio_pct: 1.5, otros_pct: 0 },
  ],
  mercado_final: null,
};
