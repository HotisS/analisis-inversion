// Supuestos numéricos del analista (JYP Entertainment, corte 2026-10-19). Cuentas consolidadas K-IFRS en millones de KRW.
// Base: 2025 (821.855 M de ventas; EBITDA 176.495 M, 21,5 %; beneficio operativo 155.246 M, 18,9 %) [A1].
// 2026e fijo: 1S26 publicado (369.102 M de ventas, beneficio operativo 64.372 M) [A5] y un 2S de ≈ 403.000 M: 3T26 ≈ 225.000 M
// (Hana 221.700, Sangsangin 237.300 [D8, D9]) con ≈ 39.500 M de beneficio operativo y 4T26 ≈ 178.000 M con ≈ 25.000 M (Hana: sin
// disco de Stray Kids ni TWICE completo [D9]): ventas de ≈ 772.500 M (−6,0 %; consenso 814.840) y beneficio operativo de ≈ 128.900 M
// (16,7 %; consenso 146.610). EBITDA del 19,7 % con una amortización del 3,0 % de las ventas.
// 2027e: gira mundial de estadios de Stray Kids, TWICE con menos actividad de grupo y primeras entradas al servicio militar (2S27).
// 2028e: Stray Kids con la mayoría de los miembros coreanos en el servicio militar (seis de ocho; Bang Chan y Felix son australianos).
// 2029e-2030e: vuelta escalonada de Stray Kids y grupos nuevos (2027) creciendo.
const crec = [-6.0, 3.0, -8.0, 4.0, 10.0, 6.0, 5.0, 4.0];
const margen = [19.7, 19.0, 17.0, 17.5, 18.5, 19.0, 19.0, 19.0];
export const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: 3.0,
  capex_pct_ventas: 3.3,
  nwc_pct_ventas: 12,
  tasa_impositiva_pct: 27,
  fijo: i === 0,
}));

const S = {
  anios,
  wacc: { tasa_libre_pct: 4.45, beta: 1.0, prima_mercado_pct: 5.5, prima_adicional_pct: 1.5, coste_deuda_pct: 4.5, tasa_impositiva_pct: 27, peso_deuda_pct: 0 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 10 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: -8.0, precio_pct: 2.0, otros_pct: 0.0 },
    { periodo: '2027e', volumen_pct: 1.0, precio_pct: 2.0, otros_pct: 0.0 },
    { periodo: '2028e', volumen_pct: -10.0, precio_pct: 2.0, otros_pct: 0.0 },
    { periodo: '2029e', volumen_pct: 2.0, precio_pct: 2.0, otros_pct: 0.0 },
    { periodo: '2030e', volumen_pct: 8.0, precio_pct: 2.0, otros_pct: 0.0 },
  ],
  // Mercado mundial de música grabada (IFPI [B3]): 31.700 M USD en 2025, ≈ 5 % anual → 2030e ≈ 40.500 M USD × 1.331,86 KRW/USD
  // (Yahoo, 19-oct-2026) ≈ 53.940.330 M KRW. Mismo perímetro que competencia.cuota_pct (ventas de JYP ÷ música grabada).
  mercado_final: { periodo: '2030e', tamano: 53940330 },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -8.0, ajuste_margen_pp: -3.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 1.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 5.0, ajuste_margen_pp: 2.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
  // BPA propio: resultado no operativo recurrente de +5.000 M (intereses de ≈ 430.000 M de caja e inversiones, menos otros gastos
  // no operativos: la media de 2022-2025 sin partidas extraordinarias fue de ≈ +1.000 M) [A1-A5], minoritarios nulos y 33,13 M de
  // acciones en circulación (35.532.492 emitidas menos 2.399.433 en autocartera), sin recompras [A5].
  bpa: { fin_recurrente: 5000, minoritarios: 0, acciones: { '2026e': 33.13, '2027e': 33.13, '2028e': 33.13 } },
};
export default S;

const VENTAS_2025 = 821855;
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
