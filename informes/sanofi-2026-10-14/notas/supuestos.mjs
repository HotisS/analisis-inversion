// Supuestos numéricos del analista (Sanofi, corte 2026-10-14). Base: 2025, ventas netas 43.626 M EUR, base business.
// Margen EBITDA del DCF = margen business (resultado operativo business + amortización del inmovilizado) − 2,5 puntos de
// reestructuración y otras partidas que Sanofi excluye del «business» pero que se repiten cada año (salen de caja).
// Dupixent pierde la exclusividad principal en EE. UU. en marzo de 2031: caídas de ventas en 2031e-2032e.
const crec = [8.0, 6.0, 5.0, 4.0, 2.0, -6.0, -8.0, -2.0, 2.0, 2.0];
const margen = [30.0, 30.5, 31.0, 31.0, 30.5, 28.5, 26.5, 26.5, 27.0, 27.0];
const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: 4.0,
  capex_pct_ventas: 7.5,
  nwc_pct_ventas: 48,
  tasa_impositiva_pct: 21,
  fijo: i === 0,
}));

export default {
  anios,
  wacc: { tasa_libre_pct: 3.53, beta: 0.7, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 3.5, tasa_impositiva_pct: 21, peso_deuda_pct: 15 },
  terminal: { metodo: 'gordon', crecimiento_pct: 1.5, multiplo_salida: 8 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 12.0, precio_pct: -1.5, otros_pct: -2.5 },
    { periodo: '2027e', volumen_pct: 8.0, precio_pct: -1.5, otros_pct: -0.5 },
    { periodo: '2028e', volumen_pct: 7.0, precio_pct: -1.5, otros_pct: -0.5 },
    { periodo: '2029e', volumen_pct: 6.0, precio_pct: -1.5, otros_pct: -0.5 },
    { periodo: '2030e', volumen_pct: 4.0, precio_pct: -1.5, otros_pct: -0.5 },
  ],
  mercado_final: null,
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 1.0, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  // BPA business 2028e por escenario (ver revision-12m): ventas × margen operativo business (EBITDA del DCF + 2,5 pp − 4,0 % de
  // amortización) − resultado financiero (−500) − impuestos (21 %) − minoritarios (−50), ÷ 1.203 M de acciones (sin recompras nuevas).
  bpa2028: { Bajista: 8.91, Base: 9.79, Alcista: 10.43 },
  bpa2027: 9.14,
};
