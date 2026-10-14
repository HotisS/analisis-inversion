// Supuestos numéricos del analista (HOYA, corte 2026-10-14). Base: FY2026 (947.749 M JPY de ventas, margen EBITDA 35,2 %).
const crec = [9.5, 8.0, 7.5, 7.0, 6.5, 6.0, 5.0, 4.5, 3.5, 3.0];
const margen = [36.8, 37.0, 37.2, 37.2, 37.2, 37.0, 36.8, 36.6, 36.5, 36.5];
const capex = [7.5, 7.5, 7.0, 6.8, 6.6, 6.5, 6.5, 6.5, 6.5, 6.5];
const anios = crec.map((g, i) => ({
  periodo: `FY${2027 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: i < 2 ? 6.2 : 6.4,
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: 14,
  tasa_impositiva_pct: 23,
  fijo: false,
}));

export default {
  anios,
  wacc: { tasa_libre_pct: 3.089, beta: 0.9, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 1.5, tasa_impositiva_pct: 23, peso_deuda_pct: 0.5 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 15 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: 'FY2027e', volumen_pct: 5.0, precio_pct: 1.5, otros_pct: 3.0 },
    { periodo: 'FY2028e', volumen_pct: 6.0, precio_pct: 1.5, otros_pct: 0.5 },
    { periodo: 'FY2029e', volumen_pct: 6.0, precio_pct: 1.5, otros_pct: 0 },
    { periodo: 'FY2030e', volumen_pct: 5.5, precio_pct: 1.5, otros_pct: 0 },
    { periodo: 'FY2031e', volumen_pct: 5.0, precio_pct: 1.5, otros_pct: 0 },
  ],
  mercado_final: null,
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -2.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.0, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
  // Para el objetivo a 12 meses (BPA FY2028e)
  bpa: { fin_recurrente: 25000, minoritarios: 1000, acciones_fy2027: 330.0, acciones_fy2028: 326.9 },
};
