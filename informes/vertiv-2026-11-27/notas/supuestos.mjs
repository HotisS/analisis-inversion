// Supuestos numéricos del analista (DCF, escenarios, pesos), corte 27-nov-2026. Los textos van en textos.mjs.
// Margen EBITDA en base GAAP (EBIT reportado + D&A, con la contraprestación contingente dentro): el del consenso
// es ajustado (≈ +0,8 pp de ventas en 2026 por la contingente y los costes de compras).
// 2026e fijo: guía del 28-oct (14.650 M de ventas en el punto medio, +43,2 %), con tres trimestres publicados.
// 2027e +30 % (19.045 M, un 2,8 % por debajo del consenso de 19.590 M, que ya incluye UIG); 2028e +18 %.
const crec = [43.2, 30.0, 18.0, 12.0, 9.0, 7.0, 6.0, 5.0, 4.5, 4.0];
const margen = [24.2, 26.0, 26.6, 26.5, 26.0, 26.0, 26.0, 26.0, 26.0, 26.0];
const amort = [3.1, 2.9, 2.8, 2.8, 2.9, 3.0, 3.0, 3.1, 3.2, 3.3];
const capex = [4.0, 4.0, 3.8, 3.6, 3.5, 3.5, 3.4, 3.4, 3.4, 3.4];
const nwc = [4.0, 7.0, 9.0, 10.0, 11.0, 11.0, 11.0, 11.0, 11.0, 11.0];
export const anios = crec.map((c, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: c, margen_ebitda_pct: margen[i], amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i], nwc_pct_ventas: nwc[i], tasa_impositiva_pct: 23.0, fijo: i === 0,
}));
export const wacc = { tasa_libre_pct: 4.85, beta: 1.5, prima_mercado_pct: 4.41, prima_adicional_pct: 0, coste_deuda_pct: 5.3, tasa_impositiva_pct: 23, peso_deuda_pct: 4.5 };
export const terminal = { metodo: 'media', crecimiento_pct: 3.0, multiplo_salida: 12 };
export const casos = [
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -1.5, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.5, multiplo_salida: 12,
    perfil: [{ periodo: '2028e', crecimiento_pp: -35, margen_pp: -5 }, { periodo: '2029e', crecimiento_pp: -10, margen_pp: -3 }] },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 5.0, ajuste_margen_pp: 2.0, ajuste_wacc_pp: -0.5, crecimiento_terminal_pct: 3.5, multiplo_salida: 18, perfil: [] },
];
export const pesos = { dcf: 45, comparables: 30, transacciones: 0, suma_partes: 0, escenarios: 25 };
