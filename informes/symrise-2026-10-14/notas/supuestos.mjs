// Supuestos del DCF, escenarios y pesos de Symrise (corte 2026-10-14). Ejercicio natural, EUR.
// Margen EBITDA sin el resultado de participadas (el motor las saca del EBITDA y las valora en el puente).
// Capex = inversión en inmovilizado (≈4,3-5 % de las ventas) + altas de derechos de uso (≈0,7 %); amortización con derechos de uso.
const a = (periodo, g, m, am, cx, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: cx, nwc_pct_ventas: 33, tasa_impositiva_pct: 25.5, fijo });
export default {
  anios: [
    a('2026e', 1.0, 21.6, 6.0, 5.0, true),
    a('2027e', 4.8, 22.0, 5.9, 5.2),
    a('2028e', 5.0, 22.3, 5.8, 5.3),
    a('2029e', 5.0, 22.5, 5.7, 5.4),
    a('2030e', 4.5, 22.5, 5.6, 5.5),
    a('2031e', 3.5, 22.5, 5.5, 5.5),
    a('2032e', 3.0, 22.5, 5.5, 5.6),
  ],
  wacc: { tasa_libre_pct: 3.51, beta: 0.75, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 3.5, tasa_impositiva_pct: 25.5, peso_deuda_pct: 13 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.25, multiplo_salida: 15 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -1.5, ajuste_margen_pp: -1.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.0, ajuste_margen_pp: 0.7, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 40, comparables: 25, transacciones: 0, suma_partes: 0, escenarios: 35 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 1.5, precio_pct: 1.5, otros_pct: -2.0 },
    { periodo: '2027e', volumen_pct: 3.0, precio_pct: 1.5, otros_pct: 0.3 },
    { periodo: '2028e', volumen_pct: 3.0, precio_pct: 1.5, otros_pct: 0.5 },
    { periodo: '2029e', volumen_pct: 3.5, precio_pct: 1.5, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 3.0, precio_pct: 1.5, otros_pct: 0 },
  ],
  mercado_final: { periodo: '2032e', tamano: 71900 },
  puente: { fecha: '2026-06-30', deuda_financiera: 2095.8, arrendamientos: 180.9, caja: 451.1, minoritarios: 22.4, pensiones: 334.2, asociadas: 273, otros_ajustes: 119 },
  // BPA 2028e propio por escenario (cálculo en revision-12m): ventas × margen − amortización + participadas − financiero − impuestos − minoritarios, ÷ 134,9 M acciones tras la recompra
  bpa_2028: { Bajista: 4.07, Base: 4.51, Alcista: 4.82 },
};
