// Supuestos numéricos del analista (Silicon2, corte 2026-10-20). Cuentas consolidadas K-IFRS en millones de KRW.
// Base: 2025 (1.116.287 M de ventas; EBITDA 214.213 M, 19,2 %; beneficio operativo 205.362 M, 18,4 %) [A1].
// 2026e fijo: 1S26 publicado (749.153 M de ventas, beneficio operativo 147.510 M, 19,7 %) [A3] y un 2S de ≈ 845.000 M
// (3T26 ≈ 425.000 M, consenso 434.200 M; 4T26 ≈ 420.000 M, consenso 421.900 M) con beneficio operativo de ≈ 75.000 M en el 3T
// (Hana 78.100, Kiwoom 67.900) y ≈ 60.000 M en el 4T (consenso 60.000): ventas de 1.594.153 M (+42,8 %; consenso 1.605.300 M)
// y beneficio operativo de ≈ 282.500 M (17,7 %; consenso 292.300 M). EBITDA del 18,6 % con amortización del 0,95 %.
const crec = [42.8, 24.0, 16.0, 11.0, 8.0, 6.0, 5.0, 4.0];
const margen = [18.6, 18.0, 17.5, 17.0, 16.5, 16.0, 16.0, 16.0];
export const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: i === 0 ? 0.95 : 1.0,
  // 2026e: 1S26 de 36.450 M (inmovilizado e intangibles) + almacén de Yongin (55.034 M, pagado el 7-oct) ≈ 5,8 % de las ventas.
  capex_pct_ventas: i === 0 ? 5.8 : 1.8,
  // Circulante comercial: 35,0 % de las ventas en 2025 y ≈ 32 % de las ventas anualizadas del 2T26 (existencias compradas por
  // adelantado) [A1, A3]; baja de forma gradual al 30 % (2023-2024: 29 % y 27 %).
  nwc_pct_ventas: [33, 32, 31, 30, 30, 30, 30, 30][i],
  tasa_impositiva_pct: 22.5,
  fijo: i === 0,
}));

const S = {
  anios,
  wacc: { tasa_libre_pct: 4.45, beta: 1.0, prima_mercado_pct: 5.5, prima_adicional_pct: 2.0, coste_deuda_pct: 4.5, tasa_impositiva_pct: 22.5, peso_deuda_pct: 0 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 9 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 40.0, precio_pct: 1.0, otros_pct: 1.8 },
    { periodo: '2027e', volumen_pct: 22.0, precio_pct: 1.0, otros_pct: 1.0 },
    { periodo: '2028e', volumen_pct: 14.5, precio_pct: 1.0, otros_pct: 0.5 },
    { periodo: '2029e', volumen_pct: 10.0, precio_pct: 1.0, otros_pct: 0.0 },
    { periodo: '2030e', volumen_pct: 7.0, precio_pct: 1.0, otros_pct: 0.0 },
  ],
  // Mercado final: exportaciones coreanas de cosmética (11.420 M USD en 2025 [B9]; +31 % en enero-agosto de 2026 [B3]) con un
  // 2030e de ≈ 20.000 M USD × 1.328,46 KRW/USD (Yahoo, 20-oct-2026) ≈ 26.569.200 M KRW.
  mercado_final: { periodo: '2030e', tamano: 26569200 },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -12.0, ajuste_margen_pp: -5.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.0, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 5.0, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
  // BPA propio: resultado financiero recurrente de +5.000 M (intereses de la caja de CVC menos los de la deuda a corto; sin las
  // diferencias de cambio, que en 2024-2026 sumaron 11.000-16.000 M al año), sin minoritarios. Acciones en base convertida:
  // 65.453.052 con voto + 6.666.666 RCPS de CVC = 72,12 M desde 2027e; 2026e ≈ 67,0 M (RCPS desde el 15-sep) [A3, A9].
  bpa: { fin_recurrente: 5000, minoritarios: 0, acciones: { '2026e': 67.0, '2027e': 72.12, '2028e': 72.12 } },
};
export default S;

const VENTAS_2025 = 1116287;
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
