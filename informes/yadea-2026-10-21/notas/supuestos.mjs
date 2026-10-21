// Supuestos numéricos del analista (Yadea, corte 2026-10-21). Cuentas consolidadas NIIF en millones de RMB.
// Base: 2025 (ventas 37.008,2 M, +31,1 %; EBITDA 3.762,1 M, 10,2 %; beneficio 2.911,6 M, BPA 0,955) [A1].
// 1S26 publicado: ventas 18.236,1 M (−5,0 %), EBITDA 1.618,8 M (8,9 %), BPA 0,394 [A3].
// 2026e fijo: 1S publicado y un 2S26 de ≈ 17.287 M (−3 % frente al 2S25: bicicletas aún flojas tras el adelanto de compras
// de 2025, descuentos de 400-800 RMB en septiembre y certificados 3C suspendidos en octubre; motos creciendo) con margen
// EBITDA del 8,6 % (el del 2S25): ventas de 35.523 M (−4,0 %; consenso 38.613 M, atrasado) y margen anual del 8,7 %.
// 2027e: +11,5 % (≈ 7,5 puntos de Jinjian, que cierra a fin de 2026; ≈ 4 puntos orgánicos: motos y extranjero).
const crec = [-4.0, 11.5, 6.0, 5.0, 4.5, 4.0, 3.5, 3.0];
const margen = [8.7, 8.7, 8.8, 8.8, 8.7, 8.6, 8.5, 8.5];
const amort = [1.5, 1.6, 1.6, 1.7, 1.8, 1.9, 2.0, 2.0];
const capex = [3.0, 3.0, 2.8, 2.6, 2.4, 2.2, 2.1, 2.0];
const nwc = [-32, -31, -30, -29, -28, -27, -26, -25];
export const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: nwc[i],
  tasa_impositiva_pct: 19.0,
  fijo: i === 0,
}));

const S = {
  anios,
  // Todo en RMB: bono chino a 10 años del 1,6412 % (ChinaBond, 21-oct-2026) [D4]; beta 0,95 (0,95 mensual a cinco años
  // frente al Tracker Fund, 0,42 semanal a dos años [D1]; consumo discrecional cíclico); prima de mercado del 5,5 % y 2 puntos
  // adicionales (China, un solo país, fundadores con el 63 %, regulador que cambia el mercado cada pocos años). Deuda pequeña
  // (≈ 4,3 % del valor, préstamos bancarios y públicos) al 2 %. WACC ≈ 8,6 %.
  wacc: { tasa_libre_pct: 1.6412, beta: 0.95, prima_mercado_pct: 5.5, prima_adicional_pct: 2.0, coste_deuda_pct: 2.0, tasa_impositiva_pct: 19.0, peso_deuda_pct: 4.3 },
  terminal: { metodo: 'gordon', crecimiento_pct: 1.0, multiplo_salida: 8 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: -8.0, precio_pct: 4.0, otros_pct: 0.0 },
    { periodo: '2027e', volumen_pct: 2.0, precio_pct: 2.0, otros_pct: 7.5 },
    { periodo: '2028e', volumen_pct: 4.0, precio_pct: 1.5, otros_pct: 0.5 },
    { periodo: '2029e', volumen_pct: 3.5, precio_pct: 1.0, otros_pct: 0.5 },
    { periodo: '2030e', volumen_pct: 3.0, precio_pct: 1.0, otros_pct: 0.5 },
  ],
  // Mercado final: ventas de los fabricantes chinos de vehículos eléctricos de dos ruedas, en China (≈ 109.000 M en 2028e y
  // ≈ 112.000 M en 2030e al 1,5 % anual [B]) más lo que exportan (≈ 7.000 M en 2025: 2,34 M de unidades a la ASEAN [B1],
  // creciendo al 15 %: ≈ 12.000 M en 2030e). Total ≈ 124.000 M RMB.
  mercado_final: { periodo: '2030e', tamano: 124000 },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 0.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
  // BPA propio: resultado financiero recurrente (intereses y productos de tesorería de ≈ 14.900 M de caja a 30-jun-2026, al
  // ≈ 2 %; 315,9 M en 2025 [A1]): 290 M en 2026e, 260 M en 2027e (tras el dividendo de 1.408 M y los 1.020 M de Jinjian) y
  // 280 M en 2028e. Sin minoritarios. Acciones diluidas: 3.106,4 M (3.112,65 M emitidas − 57,65 M del fideicomiso + 51,4 M de
  // RSU pendientes) [A3, D7]; el plan compra en el mercado, sin dilución.
  bpa: { fin_recurrente: { '2026e': 290, '2027e': 260, '2028e': 280 }, minoritarios: 0, acciones: { '2026e': 3106.4, '2027e': 3106.4, '2028e': 3106.4 } },
};
export default S;

const VENTAS_2025 = 37008.2;
export function bpa(caso = 'Base', hasta = 3) {
  const c = S.casos.find((x) => x.escenario === caso);
  let v = VENTAS_2025; let r = null;
  for (let i = 0; i < hasta; i++) {
    const a = S.anios[i];
    const k = a.fijo ? 0 : 1; // 2026e fijo: el 1S está publicado; los ajustes empiezan en 2027e
    v = v * (1 + (a.crecimiento_pct + k * c.ajuste_crecimiento_pp) / 100);
    const ebitda = v * (a.margen_ebitda_pct + k * c.ajuste_margen_pp) / 100;
    const am = v * a.amortizacion_pct_ventas / 100;
    const ebit = ebitda - am;
    const bai = ebit + S.bpa.fin_recurrente[a.periodo];
    const neto = bai * (1 - a.tasa_impositiva_pct / 100) - S.bpa.minoritarios;
    const acc = S.bpa.acciones[a.periodo];
    r = { periodo: a.periodo, ventas: v, ebitda, ebit, bai, neto, acciones: acc, bpa: neto / acc };
  }
  return r;
}
