// Supuestos numéricos del analista (DCF, escenarios, pesos). Los textos van en propio.mjs.
// Margen EBITDA en base GAAP (EBIT reportado + D&A): el del consenso es ajustado (+0,4 pp de ventas).
const crec = [36.9, 28.0, 20.0, 12.0, 9.0, 7.0, 6.0, 5.0, 4.5, 4.0];
const margen = [24.2, 25.8, 26.6, 26.5, 26.0, 26.0, 26.0, 26.0, 26.0, 26.0];
const amort = [3.2, 2.9, 2.8, 2.8, 2.9, 3.0, 3.0, 3.1, 3.2, 3.3];
const capex = [4.0, 4.0, 3.8, 3.6, 3.5, 3.5, 3.4, 3.4, 3.4, 3.4];
const nwc = [5.5, 8.0, 9.5, 10.5, 11.0, 11.0, 11.0, 11.0, 11.0, 11.0];
export const anios = crec.map((c, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: c, margen_ebitda_pct: margen[i], amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i], nwc_pct_ventas: nwc[i], tasa_impositiva_pct: 23.0, fijo: i === 0,
}));
export const wacc = { tasa_libre_pct: 5.31, beta: 1.5, prima_mercado_pct: 4.2, prima_adicional_pct: 0, coste_deuda_pct: 5.4, tasa_impositiva_pct: 23, peso_deuda_pct: 3 };
export const terminal = { metodo: 'media', crecimiento_pct: 3.0, multiplo_salida: 12 };
export const casos = [
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -1.5, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.5, multiplo_salida: 12,
    perfil: [{ periodo: '2028e', crecimiento_pp: -35, margen_pp: -5 }, { periodo: '2029e', crecimiento_pp: -10, margen_pp: -3 }] },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 5.0, ajuste_margen_pp: 2.0, ajuste_wacc_pp: -0.5, crecimiento_terminal_pct: 3.5, multiplo_salida: 18, perfil: [] },
];
export const pesos = { dcf: 45, comparables: 30, transacciones: 0, suma_partes: 0, escenarios: 25 };
