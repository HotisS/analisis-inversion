// Supuestos numéricos del analista (Halma, corte 2026-10-14). Base: FY2026 real (ingresos 2.582,3 M GBP; EBITDA 656,8 M, 25,4 %).
// Comprador en serie: el crecimiento comprado (otros_pct) se paga en el capex del DCF a ≈ 4,0 veces las ventas compradas
// (E2S 5,2x, Dreampath 4,7x). FY2027e: 515 M de compras hasta septiembre menos 83 M de ventas → ≈ 480 M netos (≈ 16 % de las ventas).
// Amortización: la propia (≈ 2,4 % de las ventas) más la de intangibles comprados y partidas de compras (≈ 2,9 %), que converge al
// capex cuando las compras se frenan.
const crec = [14.0, 7.5, 7.0, 6.5, 6.0, 5.5, 5.0, 4.5, 4.0, 3.5];
const comprado = [3.0, 2.5, 2.5, 2.5, 2.5, 2.0, 1.5, 1.0, 0.5, 0.5]; // puntos de crecimiento por compras (netos de ventas)
const margen = [26.0, 26.3, 26.5, 26.5, 26.5, 26.5, 26.5, 26.5, 26.5, 26.5];
const amort = [5.2, 5.2, 5.2, 5.2, 5.2, 5.0, 4.8, 4.6, 4.4, 4.2];
// + inversión en circulante (17 % de las ventas nuevas) metida en el capex porque el balance no trae el circulante: 2,1-0,6 puntos.
// FY2027e: 3,0 propio + 16,3 compras netas + 2,1 circulante. Desde FY2028e: 3,0 propio + compras a 6,0 veces (Dreampath con pago aplazado: ≈ 8,4 veces) las ventas compradas + circulante.
const capex = crec.map((g, i) => i === 0 ? 21.4 : Math.round((3.0 + comprado[i] * 6.0 / (1 + g / 100) + 17 * g / (100 + g)) * 10) / 10);
export const anios = crec.map((g, i) => ({
  periodo: `FY${2027 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: 0,
  tasa_impositiva_pct: 24.5,
  fijo: false,
}));
export const compradoPct = comprado;

export default {
  anios,
  wacc: { tasa_libre_pct: 5.35, beta: 0.85, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.5, tasa_impositiva_pct: 25, peso_deuda_pct: 7 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 20 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  mitad_de_anio: true,
  puente_ingresos: [
    { periodo: 'FY2027e', volumen_pct: 8.5, precio_pct: 2.5, otros_pct: 3.0 },
    { periodo: 'FY2028e', volumen_pct: 3.0, precio_pct: 2.5, otros_pct: 2.5 },
    { periodo: 'FY2029e', volumen_pct: 2.5, precio_pct: 2.5, otros_pct: 2.5 },
    { periodo: 'FY2030e', volumen_pct: 2.0, precio_pct: 2.5, otros_pct: 2.5 },
    { periodo: 'FY2031e', volumen_pct: 1.5, precio_pct: 2.5, otros_pct: 2.5 },
  ],
  mercado_final: null,
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 30, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -2.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 20, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 40, comparables: 30, transacciones: 0, suma_partes: 0, escenarios: 30 },
};
