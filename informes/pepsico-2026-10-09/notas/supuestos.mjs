// Supuestos numéricos del analista (DCF, escenarios, pesos). Ejercicio de 52/53 semanas a finales de diciembre.
const crec = [5.8, 2.8, 3.5, 3.5, 3.25, 3.25, 3.0, 3.0, 3.0, 3.0];
const margen = [19.2, 19.2, 19.4, 19.6, 19.6, 19.6, 19.6, 19.6, 19.6, 19.6];
const amort = [3.7, 3.7, 3.7, 3.7, 3.7, 3.7, 3.7, 3.7, 3.7, 3.7];
const capex = [4.6, 4.8, 4.8, 4.8, 4.7, 4.7, 4.6, 4.6, 4.5, 4.5];
const nwc = [6.0, 6.0, 6.0, 6.0, 6.0, 6.0, 6.0, 6.0, 6.0, 6.0];
const tasa = [21.0, 21.5, 21.5, 21.5, 21.5, 21.5, 21.5, 21.5, 21.5, 21.5];
export const anios = crec.map((c, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: c, margen_ebitda_pct: margen[i], amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i], nwc_pct_ventas: nwc[i], tasa_impositiva_pct: tasa[i], fijo: i === 0,
}));
export const wacc = { tasa_libre_pct: 5.22, beta: 0.65, prima_mercado_pct: 5.0, prima_adicional_pct: 0, coste_deuda_pct: 5.8, tasa_impositiva_pct: 21.0, peso_deuda_pct: 24.0 };
export const terminal = { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 12.0 };
export const etapa2 = { usar: false, anios: 10, margen_final_pct: null };
export const casos = [
  { escenario: 'Bajista', probabilidad_pct: 30, ajuste_crecimiento_pp: -1.5, ajuste_margen_pp: -2.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.5, multiplo_salida: null, perfil: [] },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
  { escenario: 'Alcista', probabilidad_pct: 20, ajuste_crecimiento_pp: 1.0, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 3.25, multiplo_salida: null, perfil: [] },
];
export const pesos = { dcf: 40, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 40 };
