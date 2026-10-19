// Supuestos numéricos del analista (CLASSYS, corte 2026-10-19). Cuentas consolidadas K-IFRS en millones de KRW.
// Base: 2025 (336.820 M de ventas, margen EBITDA del 55,0 %; EBIT 170.601 M, 50,7 %) [A1].
// 2026e fijo: 1S26 publicado (192.700 M de ventas, beneficio operativo 81.100 M, 42,1 %) y un 2S como el de Daol (3T26 97.100 M / 37.500 M) [A, D3].
const crec = [21.5, 15.0, 12.0, 10.0, 8.0, 7.0, 5.5, 4.0];
const margen = [44.0, 45.0, 45.5, 45.5, 45.5, 45.0, 44.5, 44.0];
const nwc = [36, 34, 32, 31, 30, 30, 30, 30];
export const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: i === 0 ? 4.0 : 3.9,
  capex_pct_ventas: i === 0 ? 4.5 : i === 1 ? 4.2 : 4.0,
  nwc_pct_ventas: nwc[i],
  tasa_impositiva_pct: i === 0 ? 24 : 23,
  fijo: i === 0,
}));

const S = {
  anios,
  wacc: { tasa_libre_pct: 4.45, beta: 0.9, prima_mercado_pct: 5.5, prima_adicional_pct: 1.5, coste_deuda_pct: 4.5, tasa_impositiva_pct: 23, peso_deuda_pct: 7 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 10 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 6.0, precio_pct: 0.0, otros_pct: 15.5 },
    { periodo: '2027e', volumen_pct: 12.0, precio_pct: 1.0, otros_pct: 2.0 },
    { periodo: '2028e', volumen_pct: 10.0, precio_pct: 1.0, otros_pct: 1.0 },
    { periodo: '2029e', volumen_pct: 8.5, precio_pct: 1.0, otros_pct: 0.5 },
    { periodo: '2030e', volumen_pct: 7.0, precio_pct: 1.0, otros_pct: 0.0 },
  ],
  // Mercado mundial de equipos de estética basados en energía (HIFU, RF, láser, microagujas): 6.955 M USD en 2024 y +13 % anual (Precedence) [B];
  // 2030e ≈ 6.955 × 1,13^6 = 14.480 M USD × 1.380 KRW/USD ≈ 19.980.000 M KRW. Prudente: usamos la media de Precedence y GMI (≈ 9.840 M USD → 13.580.000 M KRW).
  mercado_final: { periodo: '2030e', tamano: 13580000 },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -5.0, ajuste_margen_pp: -6.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.0, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 3.0, ajuste_margen_pp: 2.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
  // BPA propio: resultado financiero recurrente (deuda bruta de 146.660 M al 4-5 % y caja de 136.101 M al 2-2,5 %, más diferencias de cambio del real y el yen; 2025: −1.970 M),
  // minoritarios (22,5 % de MedSystems en Brasil) y 65,15 M de acciones en circulación (65.235.659 emitidas − 82.170 en autocartera) [A].
  bpa: { fin_recurrente: -2500, minoritarios: 600, acciones: { '2026e': 65.15, '2027e': 65.15, '2028e': 65.15 } },
};
export default S;

const VENTAS_2025 = 336820;
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
