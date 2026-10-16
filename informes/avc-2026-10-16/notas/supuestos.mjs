// Supuestos del DCF, escenarios y pesos de AVC (corte 2026-10-16). Ejercicio natural, TWD, NIIF de Taiwán.
// Base: 2026e casi publicado (1S real 98.159 M + ventas de julio-septiembre 59.089 M + 4T ≈65.000 M), «fijo»;
// 2027e +38 % (consenso +42 %), 2028e +15 %; después, crecimiento que baja al 2,5 % y margen EBITDA que converge al 21 %
// (entre el 18,5 % de 2024 y el 22,1 % de 2025: se supone que parte de la mejora de mezcla líquida es permanente).
const a = (periodo, g, m, amort, capex, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: amort, capex_pct_ventas: capex, nwc_pct_ventas: 9, tasa_impositiva_pct: 26.5, fijo });
export default {
  anios: [
    a('2026e', 59.2, 28.8, 2.2, 9.0, true),
    a('2027e', 38.0, 28.8, 2.4, 8.0),
    a('2028e', 15.0, 27.5, 2.7, 5.5),
    a('2029e', 8.0, 25.5, 3.0, 5.0),
    a('2030e', 6.0, 24.0, 3.3, 4.8),
    a('2031e', 5.0, 23.0, 3.5, 4.6),
    a('2032e', 4.5, 22.0, 3.7, 4.5),
    a('2033e', 4.0, 21.5, 3.8, 4.4),
    a('2034e', 3.0, 21.0, 3.9, 4.3),
    a('2035e', 2.5, 21.0, 4.0, 4.2),
  ],
  wacc: { tasa_libre_pct: 2.03, beta: 1.2, prima_mercado_pct: 5.5, prima_adicional_pct: 1.5, coste_deuda_pct: 3.0, tasa_impositiva_pct: 20, peso_deuda_pct: 2 },
  terminal: { metodo: 'gordon', crecimiento_pct: 1.5, multiplo_salida: 12 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -4.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 1.0, multiplo_salida: null, perfil: [{ periodo: '2027e', crecimiento_pp: -25, margen_pp: -3 }, { periodo: '2028e', crecimiento_pp: -28, margen_pp: -6.5 }] },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [{ periodo: '2027e', crecimiento_pp: 5, margen_pp: 1.5 }, { periodo: '2028e', crecimiento_pp: 5, margen_pp: 1.5 }] },
  ],
  pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 45.0, precio_pct: 12.0, otros_pct: 2.2 },
    { periodo: '2027e', volumen_pct: 30.0, precio_pct: 8.0, otros_pct: 0 },
    { periodo: '2028e', volumen_pct: 13.0, precio_pct: 2.0, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 9.0, precio_pct: -1.0, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 6.5, precio_pct: -0.5, otros_pct: 0 },
  ],
  mercado_final: null,
};
