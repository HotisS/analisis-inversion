// Supuestos numéricos del analista (ANYCOLOR, corte 2026-10-14). Base: FY2026 (55.681 M JPY de ventas, margen EBITDA ≈ 37,0 %).
const crec = [6.0, 9.0, 8.0, 7.0, 6.0, 5.0, 4.5, 4.0, 3.0, 2.5];
const margen = [33.6, 34.0, 34.0, 33.5, 33.0, 32.5, 32.0, 32.0, 32.0, 32.0];
const anios = crec.map((g, i) => ({
  periodo: `FY${2027 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: 0.9,
  capex_pct_ventas: 1.2,
  nwc_pct_ventas: 0,
  tasa_impositiva_pct: 31,
  fijo: false,
}));

export default {
  anios,
  wacc: { tasa_libre_pct: 3.089, beta: 1.1, prima_mercado_pct: 5.5, prima_adicional_pct: 1.0, coste_deuda_pct: 1.5, tasa_impositiva_pct: 31, peso_deuda_pct: 0 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.0, multiplo_salida: 10 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: 'FY2027e', volumen_pct: 4.5, precio_pct: 1.5, otros_pct: 0 },
    { periodo: 'FY2028e', volumen_pct: 7.0, precio_pct: 2.0, otros_pct: 0 },
    { periodo: 'FY2029e', volumen_pct: 6.0, precio_pct: 2.0, otros_pct: 0 },
    { periodo: 'FY2030e', volumen_pct: 5.0, precio_pct: 2.0, otros_pct: 0 },
    { periodo: 'FY2031e', volumen_pct: 4.0, precio_pct: 2.0, otros_pct: 0 },
  ],
  mercado_final: null,
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -6.0, ajuste_margen_pp: -4.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 1.0, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 4.0, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
  // Para el objetivo a 12 meses (BPA FY2028e): ingresos de la caja (≈ 22.000 M JPY al 0,5 %), sin recompras no anunciadas.
  bpa: { fin_recurrente: 100, minoritarios: 0, acciones_fy2027: 60.3, acciones_fy2028: 60.3 },
};
