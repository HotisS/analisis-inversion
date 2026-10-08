// Supuestos numéricos del analista (DCF, escenarios, pesos). Ejercicio natural (diciembre).
const crec = [-2.6, 2.5, 4.0, 4.0, 3.5, 3.5, 3.0, 3.5, 3.5, 3.0];
const margen = [40.0, 40.3, 40.8, 41.0, 41.0, 41.0, 41.0, 41.0, 41.0, 41.0];
const amort = [5.3, 5.4, 5.4, 5.5, 5.5, 5.5, 5.5, 5.5, 5.5, 5.5];
const capex = [6.3, 6.3, 6.2, 6.1, 6.0, 5.9, 5.8, 5.7, 5.6, 5.6];
const nwc = [37.0, 36.5, 36.0, 35.5, 35.0, 35.0, 35.0, 35.0, 35.0, 35.0];
const tasa = [20.5, 20.5, 21.0, 21.0, 21.0, 21.0, 21.0, 21.0, 21.0, 21.0];
export const anios = crec.map((c, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: c, margen_ebitda_pct: margen[i], amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i], nwc_pct_ventas: nwc[i], tasa_impositiva_pct: tasa[i], fijo: i === 0,
}));
export const wacc = { tasa_libre_pct: 5.31, beta: 0.85, prima_mercado_pct: 5.0, prima_adicional_pct: 0, coste_deuda_pct: 6.2, tasa_impositiva_pct: 20.4, peso_deuda_pct: 22.2 };
export const terminal = { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 11.0 };
export const etapa2 = { usar: false, anios: 10, margen_final_pct: null };
export const casos = [
  { escenario: 'Bajista', probabilidad_pct: 30, ajuste_crecimiento_pp: -2.5, ajuste_margen_pp: -3.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.5, multiplo_salida: null,
    perfil: [{ periodo: '2027e', crecimiento_pp: -5.0, margen_pp: -2.5 }] },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
  { escenario: 'Alcista', probabilidad_pct: 20, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 3.25, multiplo_salida: null, perfil: [] },
];
export const pesos = { dcf: 50, comparables: 15, transacciones: 0, suma_partes: 0, escenarios: 35 };
