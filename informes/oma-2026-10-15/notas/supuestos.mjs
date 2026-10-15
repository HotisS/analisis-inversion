// Supuestos del DCF, escenarios y pesos de OMA (corte 2026-10-15). MXN, ejercicio natural.
// Ingresos sin construcción (CINIIF 12). EBITDA después de la provisión de mantenimiento mayor (no es el «ajustado» de la empresa).
// Capex = mejoras en activos concesionados + inmovilizado (Plan Maestro 2026-2030: 20.417 M previstos en pesos de dic-2025, más lo pendiente del plan anterior).
// Amortización: los activos de la concesión se amortizan hasta 2048, así que sube con la inversión del Plan Maestro.
const a = (periodo, g, m, am, cx, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: cx, nwc_pct_ventas: 9.0, tasa_impositiva_pct: 30, fijo });
export default {
  anios: [
    a('2026e', 5.5, 70.5, 6.6, 24.0, true),
    a('2027e', 8.0, 71.5, 7.1, 25.0),
    a('2028e', 8.0, 72.5, 7.9, 26.0),
    a('2029e', 7.0, 72.5, 8.7, 27.0),
    a('2030e', 6.5, 72.5, 9.6, 26.0),
    a('2031e', 6.0, 72.5, 10.1, 20.0),
    a('2032e', 5.5, 72.5, 10.6, 18.0),
    a('2033e', 5.0, 72.5, 11.0, 16.0),
    a('2034e', 5.0, 72.5, 11.4, 15.0),
    a('2035e', 4.5, 72.5, 11.7, 14.0),
  ],
  wacc: { tasa_libre_pct: 9.16, beta: 1.07, prima_mercado_pct: 5.0, prima_adicional_pct: 0, coste_deuda_pct: 9.5, tasa_impositiva_pct: 30, peso_deuda_pct: 15 },
  // Concesión hasta 2048: el valor terminal de 2036-2048 (13 años) equivale a un Gordon con crecimiento ≈ 0 %; +0,5 pp por la opción de prórroga.
  terminal: { metodo: 'gordon', crecimiento_pct: 0.5, multiplo_salida: 9 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.5, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 0, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 1.0, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 2.0, precio_pct: 3.5, otros_pct: 0 },
    { periodo: '2027e', volumen_pct: 3.0, precio_pct: 5.0, otros_pct: 0 },
    { periodo: '2028e', volumen_pct: 3.5, precio_pct: 4.5, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 3.5, precio_pct: 3.5, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 3.0, precio_pct: 3.5, otros_pct: 0 },
  ],
  mercado_final: null,
  // BPA propio de 2028e (ejercicio del objetivo a 12 meses): ventas × (margen − amortización) − resultado financiero (−1.550 base) − 30 % impuestos − 30 M minoritarios, ÷ 386,17 M acciones
  bpa_2028: { Bajista: 15.36, Base: 16.78, Alcista: 17.74 },
  bpa_2026: 14.16, bpa_2027: 15.45,
};
