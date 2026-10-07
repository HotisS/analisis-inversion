// Supuestos numéricos del analista (DCF, escenarios, pesos). Los textos van en propio.mjs.
// Ejercicio de Keyence: FY2026e = 21-mar-2026 a 20-mar-2027 (etiqueta por año de inicio).
// Base: subida cíclica FY2026-FY2028 (1T FY2026 +32,8 %, consenso +24 %/+12 %/+10 %), corrección en FY2029e
// calibrada con FY2019 (−6,0 % y −3,4 puntos de margen EBITDA) y convergencia a un crecimiento de largo plazo en JPY.
const crec = [22.0, 11.0, 9.0, -5.0, 10.0, 9.0, 8.0, 6.5, 5.0, 3.5];
const margen = [54.5, 54.5, 54.0, 51.0, 52.5, 53.0, 53.0, 53.0, 53.0, 53.0];
const amort = [1.5, 1.7, 1.8, 1.9, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8];
const capex = [3.0, 2.5, 2.2, 1.8, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0];
const nwc = [38.5, 38.0, 38.0, 38.5, 38.0, 37.5, 37.5, 37.5, 37.5, 37.5];
export const anios = crec.map((c, i) => ({
  periodo: `FY${2026 + i}e`, crecimiento_pct: c, margen_ebitda_pct: margen[i], amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i], nwc_pct_ventas: nwc[i], tasa_impositiva_pct: 30.0, fijo: false,
}));
export const wacc = { tasa_libre_pct: 3.103, beta: 1.05, prima_mercado_pct: 5.14, prima_adicional_pct: 0, coste_deuda_pct: 3.5, tasa_impositiva_pct: 30, peso_deuda_pct: 0 };
export const terminal = { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 20 };
export const casos = [
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -2.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.0, multiplo_salida: null,
    perfil: [{ periodo: 'FY2027e', crecimiento_pp: -19.0, margen_pp: -5.0 }] },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 3.0, ajuste_margen_pp: 1.0, ajuste_wacc_pp: -0.5, crecimiento_terminal_pct: 3.0, multiplo_salida: null },
];
export const pesos = { dcf: 50, comparables: 25, transacciones: 0, suma_partes: 0, escenarios: 25 };
