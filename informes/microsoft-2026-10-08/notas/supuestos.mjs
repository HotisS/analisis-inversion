// Supuestos numéricos del analista (DCF, escenarios, pesos). Ejercicio a 30 de junio, etiqueta «fin»: FY2027e = jul-26 a jun-27.
// Capex = adiciones de inmovilizado del estado de flujos + altas de activos por arrendamiento financiero (centros de datos),
// porque los pasivos por arrendamiento financiero van al puente como deuda: los futuros hay que pagarlos en la proyección.
const crec = [17.5, 18.0, 17.0, 15.0, 13.0, 11.5, 10.0, 8.5, 7.5, 6.5];
const margen = [61.0, 62.5, 63.0, 63.0, 63.0, 63.0, 63.0, 63.0, 63.0, 63.0];
const amort = [14.5, 17.0, 19.0, 20.0, 20.5, 20.5, 20.0, 19.5, 19.0, 18.5];
const capex = [52.0, 42.0, 34.0, 28.0, 25.0, 23.0, 22.0, 21.0, 20.5, 20.0];
const nwc = [12.0, 12.0, 12.0, 12.0, 12.0, 12.0, 12.0, 12.0, 12.0, 12.0];
const tasa = [20.0, 20.0, 20.0, 20.0, 20.0, 20.0, 20.0, 20.0, 20.0, 20.0];
export const anios = crec.map((c, i) => ({
  periodo: `FY${2027 + i}e`, crecimiento_pct: c, margen_ebitda_pct: margen[i], amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i], nwc_pct_ventas: nwc[i], tasa_impositiva_pct: tasa[i], fijo: false,
}));
export const wacc = { tasa_libre_pct: 5.27, beta: 1.05, prima_mercado_pct: 5.0, prima_adicional_pct: 0, coste_deuda_pct: 4.5, tasa_impositiva_pct: 20.0, peso_deuda_pct: 2.6 };
export const terminal = { metodo: 'gordon', crecimiento_pct: 3.5, multiplo_salida: 14.0 };
export const etapa2 = { usar: true, anios: 5, margen_final_pct: null };
export const casos = [
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -3.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 3.0, multiplo_salida: null, perfil: [] },
  { escenario: 'Base', probabilidad_pct: 55, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
  { escenario: 'Alcista', probabilidad_pct: 20, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 3.75, multiplo_salida: null, perfil: [] },
];
export const pesos = { dcf: 45, comparables: 15, transacciones: 0, suma_partes: 0, escenarios: 40 };
