// Supuestos numéricos del analista (DCF, escenarios, pesos). FY = ejercicio a 31 de julio («fin»).
const crec = [3.5, 5.0, 4.5, 5.0, 5.0, 5.0, 4.5, 4.5, 4.0, 4.0];
const margen = [39.0, 39.5, 40.0, 40.0, 40.0, 40.0, 40.0, 40.0, 40.0, 40.0];
const amort = [5.0, 5.1, 5.1, 5.2, 5.2, 5.3, 5.3, 5.3, 5.3, 5.3];
const capex = [8.5, 9.0, 9.0, 9.0, 8.5, 8.0, 7.5, 7.0, 6.5, 6.5];
const nwc = [5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0];
export const anios = crec.map((c, i) => ({
  periodo: `FY${2027 + i}e`, crecimiento_pct: c, margen_ebitda_pct: margen[i], amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i], nwc_pct_ventas: nwc[i], tasa_impositiva_pct: 20.5, fijo: false,
}));
export const wacc = { tasa_libre_pct: 5.31, beta: 1.02, prima_mercado_pct: 5.0, prima_adicional_pct: 0, coste_deuda_pct: 5.8, tasa_impositiva_pct: 20.5, peso_deuda_pct: 0 };
export const terminal = { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 14 };
export const etapa2 = { usar: true, anios: 10, margen_final_pct: null };
export const casos = [
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -3.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.5, multiplo_salida: null,
    perfil: [{ periodo: 'FY2027e', crecimiento_pp: -6.0, margen_pp: -3.0 }, { periodo: 'FY2028e', crecimiento_pp: -5.0, margen_pp: -3.0 }] },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 1.5, ajuste_wacc_pp: -0.3, crecimiento_terminal_pct: 3.25, multiplo_salida: null, perfil: [] },
];
export const pesos = { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 };
