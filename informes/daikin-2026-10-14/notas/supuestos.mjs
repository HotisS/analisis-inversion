// Supuestos numéricos del analista (Daikin, corte 2026-10-14). Base: FY2026 (5.015.036 M JPY de ventas, margen EBITDA 13,8 % con la amortización del fondo de comercio dentro).
const crec = [6.0, 4.5, 4.0, 4.0, 3.5, 3.5, 3.0, 2.5];
const margen = [13.6, 13.8, 13.9, 13.9, 13.9, 13.9, 13.9, 13.9];
const capex = [7.2, 7.2, 7.1, 7.0, 6.8, 6.7, 6.6, 6.5];
const anios = crec.map((g, i) => ({
  periodo: `FY${2027 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: 5.4,
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: 34,
  tasa_impositiva_pct: 29,
  fijo: false,
}));

export default {
  anios,
  wacc: { tasa_libre_pct: 3.019, beta: 0.85, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 3.5, tasa_impositiva_pct: 29, peso_deuda_pct: 19 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.0, multiplo_salida: 10 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: 'FY2027e', volumen_pct: 2.5, precio_pct: 2.0, otros_pct: 1.5 },
    { periodo: 'FY2028e', volumen_pct: 2.5, precio_pct: 2.0, otros_pct: 0 },
    { periodo: 'FY2029e', volumen_pct: 2.5, precio_pct: 1.5, otros_pct: 0 },
    { periodo: 'FY2030e', volumen_pct: 2.5, precio_pct: 1.5, otros_pct: 0 },
    { periodo: 'FY2031e', volumen_pct: 2.0, precio_pct: 1.5, otros_pct: 0 },
  ],
  // Mercado mundial de climatización (MarketsandMarkets: 299,28 mil M USD en 2025, 6,4 % anual hasta 2030 [B]), llevado a mar-2031 y a 158,4 JPY/USD.
  mercado_final: { periodo: 'FY2031e', tamano: 65617000 },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 1.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 0.8, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
  // Para el objetivo a 12 meses (BPA FY2028e): resultado financiero recurrente (intereses netos, dividendos de participaciones, diferencias de cambio), minoritarios y acciones.
  bpa: { fin_recurrente: -15000, minoritarios: 12000, minoritarios_fy2028: 12500, acciones_fy2027: 278.34, acciones_fy2028: 278.34 },
};
