// Supuestos numéricos del analista (Applied Nutrition, corte 2026-10-19). NIIF del Reino Unido, millones de GBP; ejercicio a 31 de julio.
// Base: FY2025 (107,1 M de ventas, EBITDA 29,2 M, 27,3 %; EBIT 28,1 M) [A2].
// FY2026e fijo: ejercicio cerrado el 31-jul-2026 y avanzado por la empresa el 26-ago (ventas ≈ 160 M, EBITDA ajustado ≈ 43,3 M) [A6, D4]; cuentas el 16-nov-2026.
// FY2027e: guía del 26-ago (≈ 205 M de ventas, ≈ 49 M de EBITDA ajustado, con Nutrablend) [D4]. Después, frenada progresiva hasta el 4 %.
const crec = [49.4, 28.1, 10.0, 9.0, 8.0, 7.0, 6.0, 5.0, 4.0];
const margen = [27.1, 23.9, 24.0, 23.5, 23.0, 22.5, 22.0, 22.0, 22.0];
const nwc = [32, 33, 32, 31, 31, 31, 31, 31, 31];
const capex = [2.5, 3.5, 2.5, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0];
const amort = [1.0, 1.4, 1.6, 1.7, 1.8, 1.9, 2.0, 2.0, 2.0];
export const anios = crec.map((g, i) => ({
  periodo: `FY${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: nwc[i],
  tasa_impositiva_pct: i === 0 ? 25.7 : 26,
  fijo: i === 0,
}));

const S = {
  anios,
  wacc: { tasa_libre_pct: 5.24, beta: 1.05, prima_mercado_pct: 5.5, prima_adicional_pct: 1.0, coste_deuda_pct: 6.0, tasa_impositiva_pct: 25, peso_deuda_pct: 0 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 10 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: 'FY2026e', volumen_pct: 44.0, precio_pct: 3.0, otros_pct: 2.4 },
    { periodo: 'FY2027e', volumen_pct: 14.0, precio_pct: 3.0, otros_pct: 11.1 },
    { periodo: 'FY2028e', volumen_pct: 8.0, precio_pct: 2.0, otros_pct: 0.0 },
    { periodo: 'FY2029e', volumen_pct: 7.0, precio_pct: 2.0, otros_pct: 0.0 },
    { periodo: 'FY2030e', volumen_pct: 6.0, precio_pct: 2.0, otros_pct: 0.0 },
  ],
  // Mercado mundial de nutrición deportiva (Euromonitor, en el folleto): ≈ 35.000 M GBP en 2028e con un 8,9 % anual [B1];
  // 2030e ≈ 35.000 × 1,089² ≈ 41.500 M GBP.
  mercado_final: { periodo: 'FY2030e', tamano: 41500 },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -5.0, ajuste_margen_pp: -3.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.0, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 3.0, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
  // BPA propio: resultado financiero de la caja (≈ 16-20 M al 2-3 %; FY25 +0,4 M) [A2], sin minoritarios,
  // 250 M de acciones: el BPA básico y el diluido coinciden en el 1S FY26 (las opciones no diluyen) [A3].
  bpa: { fin_recurrente: 0.3, minoritarios: 0, acciones: { 'FY2026e': 250, 'FY2027e': 250, 'FY2028e': 250 } },
};
export default S;

const VENTAS_FY2025 = 107.1;
export function bpa(caso = 'Base', hasta = 3) {
  const c = S.casos.find((x) => x.escenario === caso);
  let v = VENTAS_FY2025; let r = null;
  for (let i = 0; i < hasta; i++) {
    const a = S.anios[i];
    const k = a.fijo ? 0 : 1; // FY2026e ya cerrado: los ajustes empiezan en FY2027e
    v = v * (1 + (a.crecimiento_pct + k * c.ajuste_crecimiento_pp) / 100);
    const ebitda = v * (a.margen_ebitda_pct + k * c.ajuste_margen_pp) / 100;
    const am = v * a.amortizacion_pct_ventas / 100;
    const ebit = ebitda - am;
    const bai = ebit + S.bpa.fin_recurrente;
    const neto = bai * (1 - a.tasa_impositiva_pct / 100) - S.bpa.minoritarios;
    const acc = S.bpa.acciones[a.periodo];
    r = { periodo: a.periodo, ventas: v, ebitda, ebit, bai, neto, acciones: acc, bpa: neto / acc };
  }
  return r;
}
