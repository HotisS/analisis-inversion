// Supuestos numéricos del analista (Uber, corte 2026-10-08). Ejercicio natural, US GAAP, millones de USD.
// EBITDA del DCF = EBIT GAAP + amortizaciones: lleva DENTRO la remuneración en acciones (≈3,5 % de las ventas)
// y las reservas legales y regulatorias (recurrentes). El DCF es, por tanto, después de pagos en acciones.
const crec = [11.3, 14.5, 13.5, 12.0, 10.5, 9.0, 7.5, 6.0, 5.0, 4.0];
const margen = [15.2, 16.0, 16.8, 17.3, 17.7, 18.0, 18.0, 18.0, 18.0, 18.0];
const amort = [1.4, 1.4, 1.4, 1.4, 1.45, 1.45, 1.5, 1.5, 1.5, 1.5];
const capex = [1.0, 1.6, 1.8, 1.8, 1.7, 1.6, 1.6, 1.5, 1.5, 1.5];
const nwc = [5.4, 5.4, 5.4, 5.4, 5.4, 5.4, 5.4, 5.4, 5.4, 5.4];
const tasa = [14, 16, 18, 20, 22, 23, 23, 23, 23, 23];
export const anios = crec.map((c, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: c, margen_ebitda_pct: margen[i], amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i], nwc_pct_ventas: nwc[i], tasa_impositiva_pct: tasa[i], fijo: i === 0,
}));
export const wacc = { tasa_libre_pct: 5.28, beta: 1.21, prima_mercado_pct: 5.0, prima_adicional_pct: 0, coste_deuda_pct: 6.3, tasa_impositiva_pct: 23, peso_deuda_pct: 10 };
export const terminal = { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 14 };
export const etapa2 = { usar: false, anios: 10, margen_final_pct: null };
export const casos = [
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -4.0, ajuste_margen_pp: -3.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.5, multiplo_salida: null, perfil: [] },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 1.5, ajuste_wacc_pp: -0.25, crecimiento_terminal_pct: 3.25, multiplo_salida: null, perfil: [] },
];
export const pesos = { dcf: 40, comparables: 15, transacciones: 0, suma_partes: 15, escenarios: 30 };
