// Supuestos numéricos del analista (Alphabet, corte 2026-10-08). Ejercicio natural; base: 2025 real.
// Margen EBITDA con la remuneración en acciones como gasto (criterio de las cuentas) y sin multas.
// Capex = compras de inmovilizado del estado de flujos (los arrendamientos financieros son irrelevantes: 2.590 M).
const crec = [23.5, 20.0, 16.0, 14.0, 12.0, 11.0, 10.0, 9.0, 8.0, 7.0];
const margen = [40.5, 42.0, 44.5, 45.5, 46.0, 46.0, 46.0, 46.0, 46.0, 46.0];
const amort = [6.3, 8.0, 10.0, 11.5, 12.5, 13.0, 13.5, 13.5, 13.5, 13.5];
const capex = [40.5, 47.0, 40.0, 32.0, 26.0, 22.0, 19.0, 17.0, 16.0, 15.0];
const nwc = Array(10).fill(13.0);
const tasa = Array(10).fill(17.5);
export const anios = crec.map((c, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: c, margen_ebitda_pct: margen[i], amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i], nwc_pct_ventas: nwc[i], tasa_impositiva_pct: tasa[i], fijo: i === 0,
}));
export const wacc = { tasa_libre_pct: 5.27, beta: 1.13, prima_mercado_pct: 5.0, prima_adicional_pct: 0, coste_deuda_pct: 5.45, tasa_impositiva_pct: 17.5, peso_deuda_pct: 2.8 };
export const terminal = { metodo: 'gordon', crecimiento_pct: 3.5, multiplo_salida: 14.0 };
export const etapa2 = { usar: true, anios: 5, margen_final_pct: null };
export const casos = [
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.5, ajuste_margen_pp: -3.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 3.0, multiplo_salida: null, perfil: [] },
  { escenario: 'Base', probabilidad_pct: 55, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
  { escenario: 'Alcista', probabilidad_pct: 20, ajuste_crecimiento_pp: 4.0, ajuste_margen_pp: 2.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 3.75, multiplo_salida: null, perfil: [] },
];
export const pesos = { dcf: 40, comparables: 15, transacciones: 0, suma_partes: 15, escenarios: 30 };
