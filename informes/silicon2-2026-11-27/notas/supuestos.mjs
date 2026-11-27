// Supuestos numéricos del analista (Silicon2, corte 2026-11-27). Cuentas consolidadas K-IFRS en millones de KRW.
// Base: 2025 (1.116.287 M de ventas; EBITDA 214.213 M, 19,2 %; beneficio operativo 205.362 M, 18,4 %) [A1].
// 2026e fijo: 1S26 publicado (749.153 M de ventas, beneficio operativo 147.510 M, 19,7 %) [A3] y un 2S de ≈ 845.000 M
// (3T26 ≈ 425.000 M, consenso 434.200 M; 4T26 ≈ 420.000 M, consenso 421.900 M) con beneficio operativo de ≈ 75.000 M en el 3T
// (Hana 78.100, Kiwoom 67.900) y ≈ 60.000 M en el 4T (consenso 60.000): ventas de 1.594.153 M (+42,8 %; consenso 1.605.300 M)
// y beneficio operativo de ≈ 282.500 M (17,7 %; consenso 292.300 M). EBITDA del 18,6 % con amortización del 0,95 %.
// Corte 2026-11-27. 2026e fijo con 9M26 publicado [A19]: ventas 1.173.516 M y beneficio operativo 217.127 M (18,5 %), más un 4T26
// de ≈ 430.000 M de ventas (consenso 428.760 M) y ≈ 56.000 M de beneficio operativo (13,0 %; consenso 57.210 M, 4T25 13,9 %):
// ventas de 1.603.500 M (+43,6 %; consenso 1.600.130 M) y EBITDA de ≈ 290.200 M (18,1 %) con amortización de 17.100 M (1,07 %).
// Desde 2027e el margen EBITDA baja al 16,8 % (beneficio operativo ≈ 15,7 %) con el won de hoy (1.334 por dólar, 1.462 por euro
// frente a ≈ 1.500 y ≈ 1.700 en el 1S26) y los gastos de moida, y converge al 16 %. Crecimiento 24 / 16 / 11 / 8 / 6 / 5 / 4 %.
const crec = [43.6, 24.0, 16.0, 11.0, 8.0, 6.0, 5.0, 4.0];
const margen = [18.1, 16.8, 16.6, 16.4, 16.2, 16.0, 16.0, 16.0];
export const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  // Amortización: 4.723 M en el 3T26 (≈ 1,1 % de las ventas) con los derechos de uso de las tiendas moida y los almacenes [A19].
  amortizacion_pct_ventas: i === 0 ? 1.07 : 1.1,
  // 2026e: capex de 9M26 de 52.176 M + 45.900 M del pago final de Yongin (7-oct) + ≈ 5.000 M en el 4T ≈ 6,4 % de las ventas.
  // Después 2,2 %: el 1,8 % anterior más ≈ 0,4 puntos de altas de derechos de uso (tiendas moida; NIIF 16, arrendamientos en el puente).
  capex_pct_ventas: i === 0 ? 6.4 : 2.2,
  // Circulante comercial: 35,0 % de las ventas en 2025, ≈ 25 % de las ventas anualizadas del 3T26 (424.396 M a 30-sep) [A1, A19];
  // 27 % en 2026e y 29 % después (media de 2023-2025: 30 %).
  nwc_pct_ventas: [27, 29, 29, 29, 29, 29, 29, 29][i],
  tasa_impositiva_pct: 22.5,
  fijo: i === 0,
}));

const S = {
  anios,
  wacc: { tasa_libre_pct: 4.21, beta: 1.0, prima_mercado_pct: 5.5, prima_adicional_pct: 2.0, coste_deuda_pct: 4.5, tasa_impositiva_pct: 22.5, peso_deuda_pct: 0 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 9 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 45.6, precio_pct: 1.0, otros_pct: -3.0 },
    { periodo: '2027e', volumen_pct: 22.0, precio_pct: 1.0, otros_pct: 1.0 },
    { periodo: '2028e', volumen_pct: 14.5, precio_pct: 1.0, otros_pct: 0.5 },
    { periodo: '2029e', volumen_pct: 10.0, precio_pct: 1.0, otros_pct: 0.0 },
    { periodo: '2030e', volumen_pct: 7.0, precio_pct: 1.0, otros_pct: 0.0 },
  ],
  // Mercado final: exportaciones coreanas de cosmética (11.420 M USD en 2025 [B9]; +31 % en enero-agosto de 2026 [B3]) con un
  // 2030e de ≈ 20.000 M USD × 1.333,57 KRW/USD (Yahoo, 27-nov-2026) ≈ 26.671.400 M KRW.
  mercado_final: { periodo: '2030e', tamano: 26671400 },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -12.0, ajuste_margen_pp: -5.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.0, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 5.0, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
  // BPA propio: resultado financiero recurrente de 0 en 2027e (intereses de ≈ 420.000 M de caja al 2,5 % menos préstamos,
  // arrendamientos y ≈ 9.000 M de acreción de las RCPS hasta su conversión) y +5.000 M en 2028e (ya convertidas); sin diferencias
  // de cambio, sin minoritarios. Acciones en base convertida: 65.289.552 en circulación (65.576.252 − 286.700 de autocartera) +
  // 6.666.666 RCPS de CVC = 71,96 M [A19, A25]. 2026e publicado estimado: 9M26 135.478 M + 4T26 ≈ 38.000 M (56.000 M de beneficio
  // operativo, −2.300 M de acreción, ≈ −5.000 M de cambio con el euro un 3 % más débil que a 30-sep, 22,5 %) = 173.500 M sobre
  // ≈ 66,0 M de acciones diluidas medias ≈ 2.629 KRW (consenso 2.941).
  bpa: { fin_recurrente: { '2027e': 0, '2028e': 5000 }, minoritarios: 0, acciones: { '2026e': 66.0, '2027e': 71.96, '2028e': 71.96 }, publicado26: 173500 },
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
    const bai = ebit + (S.bpa.fin_recurrente[a.periodo] ?? 0);
    const neto = a.fijo ? S.bpa.publicado26 : bai * (1 - a.tasa_impositiva_pct / 100) - S.bpa.minoritarios;
    const acc = S.bpa.acciones[a.periodo];
    r = { periodo: a.periodo, ventas: v, ebitda, ebit, bai, neto, acciones: acc, bpa: neto / acc };
  }
  return r;
}
