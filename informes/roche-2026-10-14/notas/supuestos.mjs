// Supuestos numéricos del analista (Roche, corte 2026-10-14). Base: 2025, ingresos totales 63.356 M CHF (ventas 61.516 + royalties y otros).
// EBITDA en base NIIF (incluye reestructuraciones y deterioros recurrentes de la cartera); el margen core es ≈2 puntos más alto.
const crec = [1.5, 4.0, 4.0, 3.0, 3.0, 2.5, 2.0, 1.5, 1.0, 1.0];
const margen = [36.0, 36.5, 36.5, 36.5, 36.5, 36.0, 36.0, 36.0, 36.0, 36.0];
const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: 5.3,
  capex_pct_ventas: i < 5 ? 9.0 : 8.5,
  nwc_pct_ventas: 21,
  tasa_impositiva_pct: 18.5,
  fijo: i === 0,
}));

export default {
  anios,
  wacc: { tasa_libre_pct: 0.54, beta: 0.7, prima_mercado_pct: 5.5, prima_adicional_pct: 1.0, coste_deuda_pct: 3.5, tasa_impositiva_pct: 18.5, peso_deuda_pct: 10 },
  terminal: { metodo: 'gordon', crecimiento_pct: 0.5, multiplo_salida: 12 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 5.5, precio_pct: 0.0, otros_pct: -4.0 },
    { periodo: '2027e', volumen_pct: 5.0, precio_pct: -0.5, otros_pct: -0.5 },
    { periodo: '2028e', volumen_pct: 5.0, precio_pct: -0.5, otros_pct: -0.5 },
    { periodo: '2029e', volumen_pct: 4.0, precio_pct: -0.5, otros_pct: -0.5 },
    { periodo: '2030e', volumen_pct: 4.0, precio_pct: -0.5, otros_pct: -0.5 },
  ],
  mercado_final: null,
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -1.5, ajuste_margen_pp: -2.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 0.0, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.0, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  // BPA core de 2028e por escenario (ver revision-12m): ventas × margen core de EBIT (margen EBITDA del DCF + 2 puntos de partidas que
  // Roche excluye del core − amortización sin la de intangibles, 3,8 %) − resultado financiero (−1.000) − impuestos (18 %) − minoritarios
  // (Chugai), ÷ 803 M de acciones diluidas.
  bpa2028: { Bajista: 19.95, Base: 22.25, Alcista: 23.39 },
  bpa2027: 21.37,
};
