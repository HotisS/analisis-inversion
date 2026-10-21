// Supuestos numéricos del analista (Yutong Bus, 600066.SS, corte 2026-10-21). Cuentas en millones de CNY (normas chinas CAS).
// Base: 2025 (41.426 M de ventas; EBIT de explotación 5.920 M, 14,3 %) [A1]. 9M26 publicado: ventas 25.816 M (−2,1 %), beneficio atribuido
// 3.184 M (−3,3 %; 扣非 +18,5 %), EBIT ≈ 3.821 M (14,8 %); volumen −7,8 % y −12,6 % en septiembre [A7, A11].
// 2026e fijo: 9M26 real + 4T26 un 5 % por debajo del 4T25 (15.060 → 14.300 M) con el margen EBIT del 4T25 (16,0 %) → 40.116 M (−3,2 %),
// EBIT ≈ 6.110 M (15,2 %) y EBITDA ≈ 17,1 %.
const crec = [-3.2, 3.0, 4.0, 3.5, 3.0, 3.0, 2.5, 2.0, 2.0, 1.5];
const margen = [17.1, 17.0, 16.7, 16.4, 16.1, 15.8, 15.5, 15.3, 15.1, 15.0];
const amort = [1.85, 1.85, 1.85, 1.85, 1.85, 1.85, 1.85, 1.85, 1.85, 1.85];
const capex = [1.8, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0];
const nwc = [7.0, 6.0, 6.0, 6.0, 6.0, 6.0, 6.0, 6.0, 6.0, 6.0];
const tasa = [11.5, 13.5, 14.0, 14.0, 14.0, 14.0, 14.0, 14.0, 14.0, 14.0];
export const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: nwc[i],
  tasa_impositiva_pct: tasa[i],
  fijo: i === 0,
}));

const S = {
  anios,
  // Tasa libre: bono chino a 10 años del 20-oct-2026 (1,6354 %, ChinaBond [D7]; el 21-oct la página salió vacía). Beta 0,9: la mensual de
  // 5 años es 0,63 (ajustada 0,75) y la semanal de 2 años sale negativa (−0,23) [D1]; se toma 0,9 por ser una cíclica de bienes de equipo
  // con más de la mitad de las ventas fuera de China. Prima adicional de 2,0 puntos (China, exportación expuesta a aranceles y a la
  // seguridad de los autobuses conectados, accionista de control). Sin deuda financiera relevante.
  wacc: { tasa_libre_pct: 1.64, beta: 0.9, prima_mercado_pct: 5.5, prima_adicional_pct: 2.0, coste_deuda_pct: 2.5, tasa_impositiva_pct: 14, peso_deuda_pct: 0 },
  terminal: { metodo: 'gordon', crecimiento_pct: 1.0, multiplo_salida: 9 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  // Volumen de Yutong 2025 49.518 unidades; 9M26 30.929 (−7,8 %) [A11, A12]; el precio medio sube con la exportación (1,23 M CNY por
  // autobús exportado frente a 0,48 M en China en 2025 [A1]).
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: -8.0, precio_pct: 5.2, otros_pct: 0 },
    { periodo: '2027e', volumen_pct: 0.5, precio_pct: 2.5, otros_pct: 0 },
    { periodo: '2028e', volumen_pct: 1.5, precio_pct: 2.5, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 1.5, precio_pct: 2.0, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 1.0, precio_pct: 2.0, otros_pct: 0 },
  ],
  // La cuota publicada es en unidades del mercado chino de autobuses grandes y medianos (con exportación): la prueba de cuota se hace a mano.
  mercado_final: null,
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -5.0, ajuste_margen_pp: -3.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 0.5, multiplo_salida: null,
      perfil: [{ periodo: '2027e', crecimiento_pp: -12.0, margen_pp: -3.0 }, { periodo: '2028e', crecimiento_pp: -6.0, margen_pp: -3.0 }] },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 3.0, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
  // BPA propio. Resultado financiero recurrente: 2026e −200 M (9M26 real −233 M: pérdidas de cambio con el yuan al alza y de valor razonable
  // de la cartera de tesorería [A7]); desde 2027e +150 M (≈ 14.400 M de tesorería al 1-1,3 %, sin plusvalías). Minoritarios ≈ 35-40 M
  // (70,7 M en 2025, 24,5 M en 9M26). 2.213,94 M de acciones, sin recompras ni ampliaciones [A1, A7].
  bpa: { fin_recurrente: { '2026e': -200, '2027e': 150, '2028e': 150 }, minoritarios: 38, acciones: { '2026e': 2213.94, '2027e': 2213.94, '2028e': 2213.94 } },
};
export default S;

const VENTAS_2025 = 41426.17;
export function bpa(caso = 'Base', hasta = 3) {
  const c = S.casos.find((x) => x.escenario === caso);
  let v = VENTAS_2025; let r = null;
  for (let i = 0; i < hasta; i++) {
    const a = S.anios[i];
    const k = a.fijo ? 0 : 1;
    const p = (c.perfil || []).find((x) => x.periodo === a.periodo);
    const dg = k * (p ? p.crecimiento_pp : c.ajuste_crecimiento_pp);
    const dm = k * (p ? p.margen_pp : c.ajuste_margen_pp);
    v = v * (1 + (a.crecimiento_pct + dg) / 100);
    const ebitda = v * (a.margen_ebitda_pct + dm) / 100;
    const am = v * a.amortizacion_pct_ventas / 100;
    const ebit = ebitda - am;
    const bai = ebit + S.bpa.fin_recurrente[a.periodo];
    const neto = bai * (1 - a.tasa_impositiva_pct / 100) - S.bpa.minoritarios;
    const acc = S.bpa.acciones[a.periodo];
    r = { periodo: a.periodo, ventas: v, ebitda, ebit, bai, neto, acciones: acc, bpa: neto / acc };
  }
  return r;
}
