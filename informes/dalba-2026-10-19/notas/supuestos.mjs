// Supuestos numéricos del analista (d'Alba Global, corte 2026-10-19). Cuentas consolidadas K-IFRS en millones de KRW.
// Base: 2025 (519.735 M de ventas; EBITDA 102.841 M, 19,8 %; beneficio operativo 101.469 M, 19,5 %) [A1].
// 2026e fijo: 1S26 publicado (358.103 M de ventas, beneficio operativo 92.331 M, 25,8 %) [A3] y un 2S de 377.000 M
// (3T26 170.000 M según la guía y 4T26 ≈ 207.000 M) con un margen operativo del 17,6 % (más marketing en el 4T, won fuerte):
// ventas de 735.000 M (+41,4 %; guía de la empresa 725.000 M, consenso 756.030 M) y EBITDA del 22,0 %.
const crec = [41.42, 24.0, 16.0, 11.0, 8.0, 6.0, 5.0, 4.0];
const margen = [22.0, 22.0, 22.0, 21.5, 21.0, 20.5, 20.0, 20.0];
export const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: 0.4,
  capex_pct_ventas: 0.5,
  nwc_pct_ventas: 15,
  tasa_impositiva_pct: 24,
  fijo: i === 0,
}));

const S = {
  anios,
  wacc: { tasa_libre_pct: 4.45, beta: 1.0, prima_mercado_pct: 5.5, prima_adicional_pct: 1.5, coste_deuda_pct: 4.5, tasa_impositiva_pct: 24, peso_deuda_pct: 0 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 12 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 37.4, precio_pct: 2.0, otros_pct: 2.0 },
    { periodo: '2027e', volumen_pct: 21.0, precio_pct: 2.0, otros_pct: 1.0 },
    { periodo: '2028e', volumen_pct: 14.0, precio_pct: 1.5, otros_pct: 0.5 },
    { periodo: '2029e', volumen_pct: 9.5, precio_pct: 1.5, otros_pct: 0.0 },
    { periodo: '2030e', volumen_pct: 6.5, precio_pct: 1.5, otros_pct: 0.0 },
  ],
  // Mercado mundial de belleza a precio neto de fabricante (L'Oréal, ficha sectorial del repositorio [B5]): ≈ 300.000 M EUR en 2025,
  // ≈ 4 % anual → 2030e ≈ 365.000 M EUR × 1.488 KRW/EUR (1.329,13 KRW/USD × 1,1195 USD/EUR) ≈ 543.120.000 M KRW.
  mercado_final: { periodo: '2030e', tamano: 543120000 },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -8.0, ajuste_margen_pp: -6.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.0, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 3.0, ajuste_margen_pp: 2.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
  // BPA propio: resultado financiero recurrente de +8.000 M (intereses de ≈ 200.000 M de caja y depósitos al 3-3,5 %; 1S26: +5.921 M),
  // sin minoritarios y acciones diluidas de 12,80 M en 2026e (BPA diluido del 1S26), 12,75 M en 2027e y 12,70 M en 2028e (recompra
  // de 15.000 M para amortizar, ≈ 82.000 acciones, menos opciones nuevas) [A3].
  bpa: { fin_recurrente: 8000, minoritarios: 0, acciones: { '2026e': 12.8, '2027e': 12.75, '2028e': 12.7 } },
};
export default S;

const VENTAS_2025 = 519735;
export function bpa(caso = 'Base', hasta = 3) {
  const c = S.casos.find((x) => x.escenario === caso);
  let v = VENTAS_2025; let r = null;
  for (let i = 0; i < hasta; i++) {
    const a = S.anios[i];
    const k = a.fijo ? 0 : 1; // 2026e fijo: el 1S está publicado; los ajustes empiezan en 2027e
    v = v * (1 + (a.crecimiento_pct + k * c.ajuste_crecimiento_pp) / 100);
    const ebitda = v * (a.margen_ebitda_pct + k * c.ajuste_margen_pp) / 100;
    const amort = v * a.amortizacion_pct_ventas / 100;
    const ebit = ebitda - amort;
    const bai = ebit + S.bpa.fin_recurrente;
    const neto = bai * (1 - a.tasa_impositiva_pct / 100) - S.bpa.minoritarios;
    const acc = S.bpa.acciones[a.periodo];
    r = { periodo: a.periodo, ventas: v, ebitda, ebit, bai, neto, acciones: acc, bpa: neto / acc };
  }
  return r;
}
