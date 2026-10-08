// Supuestos numéricos del analista (DCF, escenarios, pesos). Ejercicio natural (diciembre). Base: 2025 publicado (309.064 M DKK).
// 2026e = ventas ajustadas (sin la reversión 340B del 1T26, no monetaria) en el punto medio de la guía en DKK.
const crec = [-4.0, 0.0, 4.0, 4.0, 4.0, 0.0, -7.0, -6.0, 0.0, 2.0];
const margen = [48.0, 46.5, 47.0, 47.0, 47.0, 46.5, 44.5, 43.0, 43.0, 43.0];
const amort = [7.5, 8.0, 8.3, 8.5, 8.5, 8.3, 8.2, 8.0, 7.8, 7.5];
const capex = [18.7, 15.0, 12.0, 10.0, 9.0, 8.5, 8.0, 8.0, 8.0, 8.0];
const nwc = Array(10).fill(32.5);
const tasa = Array(10).fill(22.0);
export const anios = crec.map((c, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: c, margen_ebitda_pct: margen[i], amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i], nwc_pct_ventas: nwc[i], tasa_impositiva_pct: tasa[i], fijo: i === 0,
}));
export const wacc = { tasa_libre_pct: 3.1, beta: 0.85, prima_mercado_pct: 5.0, prima_adicional_pct: 0, coste_deuda_pct: 3.7, tasa_impositiva_pct: 22.0, peso_deuda_pct: 11.3 };
export const terminal = { metodo: 'gordon', crecimiento_pct: 2.0, multiplo_salida: 9.0 };
export const etapa2 = { usar: false, anios: 10, margen_final_pct: null };
export const casos = [
  { escenario: 'Bajista', probabilidad_pct: 30, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -4.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 1.0, multiplo_salida: null, perfil: [] },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
  { escenario: 'Alcista', probabilidad_pct: 20, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.5, multiplo_salida: null, perfil: [] },
];
export const pesos = { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 };
