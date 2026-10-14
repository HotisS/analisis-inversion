// Supuestos numéricos (Nestlé, corte 2026-10-14). Base: 2025 (89.885 M CHF de ingresos totales, Stock Analysis).
// Crecimiento en CHF = orgánico (3-4 %) − divisa (el franco resta 2-3 puntos al año desde 2019) − perímetro
// (helados y aguas salen en 2026-27). EBITDA publicado, con la reestructuración recurrente (≈0,8 % de ventas) dentro.
const crec = [-1.0, -2.0, 2.0, 2.0, 1.8, 1.5, 1.3, 1.0, 0.8, 0.7];
const margen = [19.3, 19.6, 20.0, 20.2, 20.2, 20.2, 20.2, 20.2, 20.2, 20.2];
const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: 4.0,
  capex_pct_ventas: i < 2 ? 4.8 : 4.6,
  nwc_pct_ventas: 0,
  tasa_impositiva_pct: 22,
  fijo: i === 0,
}));

export default {
  anios,
  wacc: { tasa_libre_pct: 0.6, beta: 0.65, prima_mercado_pct: 5.5, prima_adicional_pct: 1.0, coste_deuda_pct: 2.6, tasa_impositiva_pct: 22, peso_deuda_pct: 22 },
  terminal: { metodo: 'gordon', crecimiento_pct: 0.5, multiplo_salida: 13 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 1.5, precio_pct: 2.0, otros_pct: -4.5 },
    { periodo: '2027e', volumen_pct: 1.8, precio_pct: 1.7, otros_pct: -5.5 },
    { periodo: '2028e', volumen_pct: 1.5, precio_pct: 1.5, otros_pct: -1.0 },
    { periodo: '2029e', volumen_pct: 1.5, precio_pct: 1.5, otros_pct: -1.0 },
    { periodo: '2030e', volumen_pct: 1.5, precio_pct: 1.3, otros_pct: -1.0 },
  ],
  mercado_final: null,
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -1.0, ajuste_margen_pp: -1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 0.0, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 0.7, ajuste_margen_pp: 0.6, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 45, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 35 },
};
