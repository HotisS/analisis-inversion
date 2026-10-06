// Supuestos numéricos del analista (DCF, escenarios, pesos). Los textos van en propio.mjs.
// Caso base con ciclo: subida 2026-2028 (pedidos del 2T26 con book-to-bill 1,7x y WFE de SEMI +23 %/+22 %/+14 %),
// corrección en 2029 calibrada con 2019 (−18 %) y 2023 (−23 %), recuperación y convergencia al terminal.
const crec = [23.6, 38.0, 12.0, -15.0, 5.0, 8.0, 7.0, 6.0, 4.0, 2.5];
const margen = [33.0, 36.0, 37.0, 31.5, 33.0, 34.0, 34.5, 34.5, 34.5, 34.5];
const amort = [4.5, 4.0, 4.0, 4.8, 4.8, 4.7, 4.6, 4.6, 4.6, 4.6];
const capex = [6.0, 6.5, 6.0, 4.5, 5.0, 5.5, 5.5, 5.0, 5.0, 5.0];
const nwc = [24.0, 24.0, 24.0, 24.5, 24.5, 24.0, 24.0, 24.0, 24.0, 24.0];
export const anios = crec.map((c, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: c, margen_ebitda_pct: margen[i], amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i], nwc_pct_ventas: nwc[i], tasa_impositiva_pct: 17.0, fijo: i === 0,
}));
export const wacc = { tasa_libre_pct: 0.51, beta: 1.41, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 1.4, tasa_impositiva_pct: 17, peso_deuda_pct: 2 };
export const terminal = { metodo: 'gordon', crecimiento_pct: 1.5, multiplo_salida: 16 };
export const casos = [
  { escenario: 'Bajista', probabilidad_pct: 30, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -3.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 1.0, multiplo_salida: null },
  { escenario: 'Base', probabilidad_pct: 45, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 3.0, ajuste_margen_pp: 2.5, ajuste_wacc_pp: -0.5, crecimiento_terminal_pct: 2.0, multiplo_salida: null },
];
export const pesos = { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 };
