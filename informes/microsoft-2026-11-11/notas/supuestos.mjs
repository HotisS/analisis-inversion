// Supuestos numéricos del analista (DCF, escenarios, pesos). Microsoft, corte 2026-11-11.
// Ejercicio a 30 de junio, etiqueta «fin»: FY2027e = jul-26 a jun-27 (1T27 publicado: +19 %, margen EBITDA 62,5 %).
// Capex = adiciones de inmovilizado del estado de flujos + altas de arrendamientos financieros (centros de datos),
// porque los pasivos por arrendamiento financiero van al puente como deuda. Cola de capex como la v2 del 8-oct
// (prueba de sostenibilidad: rotación del capital en torno a la de FY2026).
const crec = [18.5, 18.0, 17.0, 15.0, 13.0, 11.5, 10.0, 8.5, 7.5, 6.5];
const margen = [62.0, 62.5, 63.0, 63.0, 63.0, 63.0, 63.0, 63.0, 63.0, 63.0];
const amort = [14.0, 17.0, 19.0, 20.0, 20.5, 20.5, 20.0, 19.5, 19.0, 18.5];
const capex = [51.0, 42.0, 34.0, 32.5, 29.5, 28.0, 27.0, 25.5, 25.0, 24.5];
const nwc = [12.0, 12.0, 12.0, 12.0, 12.0, 12.0, 12.0, 12.0, 12.0, 12.0];
const tasa = [20.0, 20.0, 20.0, 20.0, 20.0, 20.0, 20.0, 20.0, 20.0, 20.0];
export const anios = crec.map((c, i) => ({
  periodo: `FY${2027 + i}e`, crecimiento_pct: c, margen_ebitda_pct: margen[i], amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i], nwc_pct_ventas: nwc[i], tasa_impositiva_pct: tasa[i], fijo: false,
}));
export const wacc = { tasa_libre_pct: 4.98, beta: 1.05, prima_mercado_pct: 5.0, prima_adicional_pct: 0, coste_deuda_pct: 5.0, tasa_impositiva_pct: 20.0, peso_deuda_pct: 3.2 };
export const terminal = { metodo: 'gordon', crecimiento_pct: 3.5, multiplo_salida: 14.0 };
export const etapa2 = { usar: true, anios: 5, margen_final_pct: null };
export const casos = [
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -3.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 3.0, multiplo_salida: null, perfil: [] },
  { escenario: 'Base', probabilidad_pct: 55, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
  { escenario: 'Alcista', probabilidad_pct: 20, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 3.75, multiplo_salida: null, perfil: [] },
];
export const pesos = { dcf: 45, comparables: 15, transacciones: 0, suma_partes: 0, escenarios: 40 };
