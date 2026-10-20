// Supuestos numéricos del analista (China Resources Sanjiu, 000999.SZ, corte 2026-10-20). Cuentas en millones de CNY (CAS).
// Base: 2025 (31.602,58 M de ventas con nueve meses de Tasly; margen EBITDA del 19,2 %) [A1]. 1S26 publicado: ventas 15.014 M (+1,4 %),
// EBITDA ≈ 3.350 M (22,3 %), beneficio atribuido 1.671 M [A6].
// 2026e fijo: 1S26 real + 2S26 un 8 % por debajo del 2S25 (16.792 M → 15.450 M), entre el 2T26 (−13,5 % con Tasly en las dos bases) y
// un 4T con gripe normal; margen EBITDA del 2S del 17,5 % (16,8 % en el 2S25) → 30.465 M de ventas (−3,6 %) y 19,9 % de margen.
const crec = [-3.6, 4.0, 4.5, 4.5, 4.0, 3.5, 3.0, 3.0, 2.5, 2.0];
const margen = [19.9, 20.5, 21.0, 21.0, 21.0, 21.0, 21.0, 21.0, 21.0, 21.0];
const amort = [5.1, 4.9, 4.8, 4.7, 4.6, 4.5, 4.4, 4.3, 4.3, 4.3];
const capex = [5.5, 5.0, 4.8, 4.7, 4.6, 4.5, 4.5, 4.5, 4.5, 4.5];
const nwc = [40, 40, 40, 40, 40, 40, 40, 40, 40, 40];
export const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: nwc[i],
  tasa_impositiva_pct: i === 0 ? 17.5 : 17,
  fijo: i === 0,
}));

const S = {
  anios,
  // Tasa libre: bono chino a 10 años del 19-oct-2026 (1,6497 %, ChinaBond [D7]). Beta 0,8: la semanal de 5 años ajustada es 0,64 y la
  // mensual frente al CSI 300 sale negativa (no sirve) [D1]; subimos a 0,8 por la deuda de la compra y la mitad del beneficio en receta.
  // Prima adicional de 2,0 puntos: China, control estatal y riesgo de precios regulados (compras centralizadas). Deuda al 2,6 % (gasto 117,6 M en 2025 [A1]).
  wacc: { tasa_libre_pct: 1.65, beta: 0.8, prima_mercado_pct: 5.5, prima_adicional_pct: 2.0, coste_deuda_pct: 2.6, tasa_impositiva_pct: 17, peso_deuda_pct: 8 },
  terminal: { metodo: 'gordon', crecimiento_pct: 1.0, multiplo_salida: 9 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: -9.2, precio_pct: -1.0, otros_pct: 6.6 },
    { periodo: '2027e', volumen_pct: 3.5, precio_pct: 0.5, otros_pct: 0 },
    { periodo: '2028e', volumen_pct: 4.0, precio_pct: 0.5, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 4.0, precio_pct: 0.5, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 3.5, precio_pct: 0.5, otros_pct: 0 },
  ],
  // Mercado chino de medicamentos (todos los canales): ≈ 1.680.000 M en 2025 (9M25 de Menet anualizado [B1]) y 1,7 % anual de IQVIA [B2]
  // tras −1,3 % en 2026: 1.774.000 M en 2030e (estimación propia).
  mercado_final: { periodo: '2030e', tamano: 1774000 },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 0.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
  // BPA propio: resultado financiero recurrente (intereses de ≈ 4.300 M de deuda al 2,6 % menos intereses cobrados y asociadas en pérdidas:
  // −32 M en el 1S26 [A6]); impuesto del 17-17,5 % (14,4 % en 2025, 21,0 % en el 1S26 [A1, A6]); minoritarios como parte del beneficio
  // consolidado (17,9 % en 2025 y 16,5 % en el 1S26, con KPC en pérdidas absorbiendo el 72 % de su pérdida [A1, A6]): 16,5 % en 2026e,
  // 18 % en 2027e y 19 % en 2028e al volver KPC a beneficio; 1.664,22 M de acciones, sin recompras ni ampliaciones en efectivo [A12].
  bpa: { fin_recurrente: { '2026e': -65, '2027e': -50, '2028e': -30 }, minoritarios_pct: { '2026e': 16.5, '2027e': 18, '2028e': 19 }, acciones: 1664.22 },
};
export default S;

const VENTAS_2025 = 31602.58;
export function bpa(caso = 'Base', hasta = 3) {
  const c = S.casos.find((x) => x.escenario === caso);
  let v = VENTAS_2025; let r = null;
  for (let i = 0; i < hasta; i++) {
    const a = S.anios[i];
    const k = a.fijo ? 0 : 1; // 2026e fijo: el 1S26 está publicado; los ajustes empiezan en 2027e
    v = v * (1 + (a.crecimiento_pct + k * c.ajuste_crecimiento_pp) / 100);
    const ebitda = v * (a.margen_ebitda_pct + k * c.ajuste_margen_pp) / 100;
    const am = v * a.amortizacion_pct_ventas / 100;
    const ebit = ebitda - am;
    const bai = ebit + S.bpa.fin_recurrente[a.periodo];
    const consolidado = bai * (1 - a.tasa_impositiva_pct / 100);
    const neto = consolidado * (1 - S.bpa.minoritarios_pct[a.periodo] / 100);
    r = { periodo: a.periodo, ventas: v, ebitda, ebit, bai, neto, acciones: S.bpa.acciones, bpa: neto / S.bpa.acciones };
  }
  return r;
}
