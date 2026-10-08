// Supuestos numéricos del analista (ICE, corte 2026-10-08). Ejercicio natural. Ingresos = netos de gastos por transacción.
// Amortización = solo la de inmovilizado y software propio (sin la de intangibles adquiridos, que no da escudo fiscal en caja).
const crec = [11.0, 5.0, 6.0, 6.0, 5.5, 5.0, 4.5, 4.0, 3.5, 3.0];
const margen = [66.5, 66.5, 66.8, 67.0, 67.0, 67.0, 67.0, 67.0, 67.0, 67.0];
const amort = [5.5, 5.5, 5.5, 5.5, 5.5, 5.5, 5.5, 5.5, 5.5, 5.5];
const capex = [7.7, 7.5, 7.3, 7.0, 6.8, 6.6, 6.4, 6.2, 6.0, 6.0];
const nwc = [4.8, 4.8, 4.8, 4.8, 4.8, 4.8, 4.8, 4.8, 4.8, 4.8];
export const anios = crec.map((c, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: c, margen_ebitda_pct: margen[i], amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i], nwc_pct_ventas: nwc[i], tasa_impositiva_pct: 23.5, fijo: i === 0,
}));
export const wacc = { tasa_libre_pct: 5.27, beta: 0.91, prima_mercado_pct: 5.0, prima_adicional_pct: 0, coste_deuda_pct: 6.1, tasa_impositiva_pct: 23.5, peso_deuda_pct: 19 };
export const terminal = { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 15 };
export const etapa2 = { usar: false, anios: 10, margen_final_pct: null };
export const casos = [
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -1.5, ajuste_margen_pp: -2.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.5, multiplo_salida: null,
    perfil: [{ periodo: '2027e', crecimiento_pp: -7.0, margen_pp: -2.0 }] },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: -0.25, crecimiento_terminal_pct: 3.25, multiplo_salida: null, perfil: [] },
];
export const pesos = { dcf: 40, comparables: 20, transacciones: 0, suma_partes: 15, escenarios: 25 };
