// Supuestos del DCF, escenarios y pesos de Lagercrantz (corte 2026-10-21). Ejercicio a 31 de marzo, etiquetado por el
// año en que termina (FY2027 = abr-26 a mar-27, en curso desde hace 6,7 meses; solo el 1T publicado). Millones de SEK.
//
// COMPRADOR EN SERIE: el crecimiento proyectado incluye compras, así que su precio va en el capex. Crecimiento =
// orgánico + comprado. Capex = inversión propia (≈ 0,5 % de las ventas: 49 M en el 1T; ≈ 2 % con el software y la
// renovación de equipos de todo el año) + altas de derechos de uso (≈ 1,8 %: NIIF 16, el EBITDA no lleva alquileres) +
// compras = 1,15 × ventas compradas (precio pagado ≈ 1,2-1,7 veces las ventas, media de cuatro años ≈ 1,35, MENOS el
// circulante comprado ≈ 0,2 veces las ventas, que el DCF ya cobra en la variación del circulante: si no, se contaría dos
// veces).
const g = [14.5, 11.0, 10.5, 10.0, 9.0, 8.0, 7.0, 6.0, 5.0, 4.0];
const org = [5.0, 5.0, 5.0, 5.0, 4.5, 4.5, 4.0, 4.0, 3.5, 3.5];
const m = [21.6, 21.8, 22.0, 22.1, 22.2, 22.2, 22.2, 22.2, 22.2, 22.2];
// Amortizaciones: depreciación (3,4 % de las ventas con derechos de uso) + amortización de intangibles comprados (2,2 %):
// 5,6 % en FY2026 (590 M). Mientras sigan las compras se mantiene; al frenarse, la de intangibles se va apagando hasta
// igualar el capex de estado estacionario (3,8 %).
const am = [5.6, 5.6, 5.6, 5.6, 5.5, 5.4, 5.2, 5.0, 4.7, 4.4];
export const MULT = 1.35;
const r1 = (x) => Math.round(x * 10) / 10;
export const COMPRADO = g.map((x, i) => r1(x - org[i]));
const cx = g.map((x, i) => r1(3.8 + MULT * (x - org[i]) / (1 + x / 100)));
const anios = g.map((x, i) => ({
  periodo: `FY${2027 + i}e`, crecimiento_pct: x, margen_ebitda_pct: m[i], amortizacion_pct_ventas: am[i], capex_pct_ventas: cx[i],
  nwc_pct_ventas: 24.5, tasa_impositiva_pct: 21.5, fijo: false,
}));
export default {
  anios, org,
  wacc: { tasa_libre_pct: 3.18, beta: 1.26, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 3.8, tasa_impositiva_pct: 20.6, peso_deuda_pct: 11 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 16.0 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.0, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 45, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 35 },
  // Puente de ingresos: volumen orgánico, precio (subidas de 2-3 % al año, «compensamos la inflación de costes» en el 1T)
  // y compras (otros).
  puente_ingresos: [0, 1, 2, 3, 4].map((i) => ({ periodo: `FY${2027 + i}e`, volumen_pct: r1(org[i] / 2), precio_pct: r1(org[i] - r1(org[i] / 2)), otros_pct: r1(g[i] - org[i]) })),
  mercado_final: null,
};
