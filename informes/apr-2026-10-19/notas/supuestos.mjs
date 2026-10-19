// Supuestos numéricos del analista (APR, corte 2026-10-19). Cuentas consolidadas K-IFRS en millones de KRW.
// Base: 2025 (1.527.345 M de ventas; EBITDA 395.799 M, 25,9 %; beneficio operativo 365.521 M, 23,9 %) [A1].
// 2026e fijo: 1S26 publicado (1.360.889 M de ventas, beneficio operativo 342.825 M, 25,2 %, con NIIF 18) [A3] y un 2S de
// ≈ 1.709.000 M (3T26 ≈ 780.000 M, consenso 784.640 M; 4T26 ≈ 930.000 M) con margen operativo del 21,5 % en el 3T (guía de la
// llamada del 12-oct) y del 23 % en el 4T: ventas de 3.070.000 M (+101 %; consenso 3.082.740 M) y beneficio operativo de
// ≈ 724.500 M (23,6 %; consenso 742.940 M). EBITDA del 24,8 % con una amortización del 1,2 % de las ventas.
const crec = [101.0, 35.0, 18.0, 12.0, 9.0, 7.0, 5.0, 4.0];
const margen = [24.8, 24.0, 23.5, 23.0, 22.5, 22.0, 21.5, 21.0];
export const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: 1.2,
  capex_pct_ventas: 1.8,
  nwc_pct_ventas: 10,
  tasa_impositiva_pct: 25.5,
  fijo: i === 0,
}));

const S = {
  anios,
  wacc: { tasa_libre_pct: 4.45, beta: 1.0, prima_mercado_pct: 5.5, prima_adicional_pct: 1.5, coste_deuda_pct: 4.5, tasa_impositiva_pct: 25.5, peso_deuda_pct: 0 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 12 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 93.0, precio_pct: 2.0, otros_pct: 6.0 },
    { periodo: '2027e', volumen_pct: 30.0, precio_pct: 2.0, otros_pct: 3.0 },
    { periodo: '2028e', volumen_pct: 15.0, precio_pct: 2.0, otros_pct: 1.0 },
    { periodo: '2029e', volumen_pct: 10.0, precio_pct: 1.5, otros_pct: 0.5 },
    { periodo: '2030e', volumen_pct: 7.5, precio_pct: 1.5, otros_pct: 0.0 },
  ],
  // Mercado mundial de belleza a precio neto de fabricante (L'Oréal, ficha sectorial del repositorio [B5]): ≈ 300.000 M EUR en 2025,
  // ≈ 4 % anual → 2030e ≈ 365.000 M EUR × 1.492,4 KRW/EUR (Yahoo, 19-oct-2026) ≈ 544.726.000 M KRW.
  mercado_final: { periodo: '2030e', tamano: 544726000 },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -10.0, ajuste_margen_pp: -6.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.0, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 5.0, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
  // BPA propio: resultado financiero recurrente de +10.000 M (intereses de ≈ 290.000 M de caja e inversiones; 1S26: +5.019 M),
  // sin minoritarios y 37,45 M de acciones (37.438.155 emitidas sin autocartera más opciones; promedio del 1S26: 37,44 M) sin
  // recompras no anunciadas [A3].
  bpa: { fin_recurrente: 10000, minoritarios: 0, acciones: { '2026e': 37.45, '2027e': 37.45, '2028e': 37.45 } },
};
export default S;

const VENTAS_2025 = 1527345;
export function bpa(caso = 'Base', hasta = 3) {
  const c = S.casos.find((x) => x.escenario === caso);
  let v = VENTAS_2025; let r = null;
  for (let i = 0; i < hasta; i++) {
    const a = S.anios[i];
    const k = a.fijo ? 0 : 1; // 2026e fijo: el 1S está publicado; los ajustes empiezan en 2027e
    v = v * (1 + (a.crecimiento_pct + k * c.ajuste_crecimiento_pp) / 100);
    const ebitda = (v * (a.margen_ebitda_pct + k * c.ajuste_margen_pp)) / 100;
    const amort = (v * a.amortizacion_pct_ventas) / 100;
    const ebit = ebitda - amort;
    const bai = ebit + S.bpa.fin_recurrente;
    const neto = bai * (1 - a.tasa_impositiva_pct / 100) - S.bpa.minoritarios;
    const acc = S.bpa.acciones[a.periodo];
    r = { periodo: a.periodo, ventas: v, ebitda, ebit, bai, neto, acciones: acc, bpa: neto / acc };
  }
  return r;
}
