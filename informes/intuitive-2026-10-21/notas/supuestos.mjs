// Supuestos numéricos del analista (DCF, escenarios, pesos), corte 2026-10-21 tras el 3T26. Parte de los del 6-oct con la
// versión v3 (caso base al crecimiento financiable: capex del 12 % y crecimiento de 2029e-2034e más bajo).
// Cambios del 21-oct: 2026e fijo con nueve meses publicados (8.711,8 M) y un 4T26 de ≈ 3.250 M (+13 %, algo por encima de lo
// que implicaba el consenso previo); 2027e-2028e dos y un punto y medio menos por las rebajas de precio de instrumentos
// (−3-5 % de ingreso de I&A por procedimiento desde el 1S27 y en China desde noviembre) [A29]; margen de 2026e sin el
// acuerdo antimonopolio de 450 M (va al puente) y un punto menos en 2027e por esas rebajas; Tesoro al 5,12 % [D].
const crec = [18.9, 11.0, 11.0, 10.5, 10.0, 9.0, 8.0, 7.0, 6.0, 5.0];
const margen = [39.0, 38.0, 38.5, 39.0, 39.0, 39.0, 39.0, 39.0, 39.0, 39.0];
const amort = [6.5, 6.8, 7.0, 7.2, 7.4, 7.5, 7.5, 7.5, 7.5, 7.5];
const capex = [12.0, 12.0, 12.0, 12.0, 12.0, 12.0, 12.0, 12.0, 11.5, 11.5];
const nwc = [31.0, 31.0, 30.5, 30.5, 30.0, 30.0, 29.5, 29.5, 29.0, 29.0];
export const anios = crec.map((c, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: c, margen_ebitda_pct: margen[i], amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i], nwc_pct_ventas: nwc[i], tasa_impositiva_pct: 19.0, fijo: i === 0,
}));
export const wacc = { tasa_libre_pct: 5.12, beta: 1.15, prima_mercado_pct: 4.2, prima_adicional_pct: 0, coste_deuda_pct: 4.6, tasa_impositiva_pct: 21, peso_deuda_pct: 0 };
export const terminal = { metodo: 'media', crecimiento_pct: 3.0, multiplo_salida: 13 };
export const casos = [
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -3.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.5, multiplo_salida: null },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.5, ajuste_margen_pp: 2.0, ajuste_wacc_pp: -0.5, crecimiento_terminal_pct: 3.5, multiplo_salida: null },
];
export const pesos = { dcf: 60, comparables: 15, transacciones: 0, suma_partes: 0, escenarios: 25 };
