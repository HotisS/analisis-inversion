// Supuestos numéricos del analista (CLASSYS, corte 2026-11-13). Cuentas consolidadas K-IFRS en millones de KRW.
// Base: 2025 (336.820 M de ventas, margen EBITDA del 55,0 %; EBIT 170.601 M, 50,7 %) [A1].
// 2026e fijo: 9M26 publicado (275.714 M de ventas, EBITDA 121.000 M, 43,9 %; beneficio operativo 108.144 M) [A16, A17] y un 4T26
// de ≈ 95.000 M de ventas y ≈ 34.000 M de EBITDA (analistas del 13-nov: 91.500-102.000 M de ventas y 28.300-37.100 M de beneficio
// operativo) [D17-D19]. 2026e: 370.840 M (+10,1 %), EBITDA 41,8 %.
const crec = [10.1, 15.0, 12.0, 10.0, 8.0, 7.0, 5.5, 4.0];
const margen = [41.8, 42.0, 43.0, 43.5, 43.5, 43.0, 42.5, 42.0];
const nwc = [36, 34, 32, 31, 30, 30, 30, 30];
export const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: i === 0 ? 4.8 : 4.5,
  capex_pct_ventas: i === 0 ? 4.8 : i === 1 ? 4.6 : 4.5,
  nwc_pct_ventas: nwc[i],
  tasa_impositiva_pct: i === 0 ? 26.8 : 23,
  fijo: i === 0,
}));

const S = {
  anios,
  // Bono coreano a 10 años de septiembre de 2026 (FRED/OCDE) [D7]; beta ajustada mensual de 5 años frente al KOSDAQ (0,88) [D1];
  // prima de mercado 5,5 % (Damodaran nov-2026: 4,41 % para EE. UU.; Corea es mercado desarrollado con prima país pequeña) [D9];
  // prima adicional 2,0 (antes 1,5): vendedor apalancado del 49 % con prenda, dos trimestres fallidos y guía incumplida (riesgo propio).
  wacc: { tasa_libre_pct: 4.45, beta: 0.88, prima_mercado_pct: 5.5, prima_adicional_pct: 2.0, coste_deuda_pct: 4.5, tasa_impositiva_pct: 23, peso_deuda_pct: 9 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 10 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: -5.0, precio_pct: 0.0, otros_pct: 15.1 },
    { periodo: '2027e', volumen_pct: 10.0, precio_pct: 1.0, otros_pct: 4.0 },
    { periodo: '2028e', volumen_pct: 11.0, precio_pct: 1.0, otros_pct: 0.0 },
    { periodo: '2029e', volumen_pct: 9.0, precio_pct: 1.0, otros_pct: 0.0 },
    { periodo: '2030e', volumen_pct: 7.0, precio_pct: 1.0, otros_pct: 0.0 },
  ],
  // Mercado mundial de equipos de estética basados en energía: media de Precedence y GMI (≈ 9.840 M USD en 2030) [B3, B4]
  // × 1.338 KRW/USD (13-nov) ≈ 13.170.000 M KRW.
  mercado_final: { periodo: '2030e', tamano: 13170000 },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 30, ajuste_crecimiento_pp: -5.0, ajuste_margen_pp: -5.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.0, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 20, ajuste_crecimiento_pp: 4.0, ajuste_margen_pp: 2.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
  // BPA propio por año: resultado no operativo (2026e: −19.000 M en 9M26 [A17] y −2.000 M en el 4T; después −3.000 M: intereses de
  // 146.660 M de deuda al 4-5 % menos los de la caja, sin diferencias de cambio), minoritarios (22,5 % de MedSystems, en pérdidas:
  // 9M26 −3.693 M [A16]) y 65,15 M de acciones en circulación (65.235.659 emitidas − 82.170 en autocartera) [A, C].
  bpa: {
    fin: { '2026e': -21000, '2027e': -3000, '2028e': -3000 },
    minoritarios: { '2026e': -4500, '2027e': -1000, '2028e': 0 },
    acciones: { '2026e': 65.15, '2027e': 65.15, '2028e': 65.15 },
  },
};
export default S;

const VENTAS_2025 = 336820;
export function bpa(caso = 'Base', hasta = 3) {
  const c = S.casos.find((x) => x.escenario === caso);
  let v = VENTAS_2025; let r = null;
  for (let i = 0; i < hasta; i++) {
    const a = S.anios[i];
    const k = a.fijo ? 0 : 1; // 2026e fijo: 9M publicados; los ajustes empiezan en 2027e
    v = v * (1 + (a.crecimiento_pct + k * c.ajuste_crecimiento_pp) / 100);
    const ebitda = v * (a.margen_ebitda_pct + k * c.ajuste_margen_pp) / 100;
    const amort = v * a.amortizacion_pct_ventas / 100;
    const ebit = ebitda - amort;
    const bai = ebit + S.bpa.fin[a.periodo];
    const neto = bai * (1 - a.tasa_impositiva_pct / 100) - S.bpa.minoritarios[a.periodo];
    const acc = S.bpa.acciones[a.periodo];
    r = { periodo: a.periodo, ventas: v, ebitda, ebit, bai, neto, acciones: acc, bpa: neto / acc };
  }
  return r;
}
