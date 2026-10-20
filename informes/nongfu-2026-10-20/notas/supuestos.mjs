// Supuestos numéricos del analista (Nongfu Spring, corte 2026-10-20). Cuentas consolidadas NIIF en millones de RMB.
// Base: 2025 (ventas 52.552,9 M, +22,5 %; EBITDA 23.824,7 M, 45,3 %; beneficio 15.868,3 M, BPA 1,41) [A1].
// 1S26 publicado: ventas 29.718,1 M (+16,0 %), EBITDA 13.372,7 M (45,0 %), BPA 0,79 [A3].
// 2026e fijo: 1S publicado y un 2S26 de ≈ 29.930 M (+11 % frente al 2S25: el té se modera desde una base alta y el agua
// sigue plana en un mercado que cae) con margen EBITDA del 45 %: ventas de 59.647 M (+13,5 %; consenso 60.138 M).
const crec = [13.5, 10.0, 9.0, 7.5, 6.0, 5.0, 4.0, 3.0];
const margen = [45.0, 45.0, 45.0, 45.0, 44.8, 44.5, 44.5, 44.5];
const amort = [6.4, 6.6, 6.8, 7.0, 7.2, 7.3, 7.4, 7.4];
const capex = [12.0, 11.0, 10.0, 9.5, 9.0, 8.5, 8.0, 7.5];
export const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: 9.0,
  tasa_impositiva_pct: 24.3,
  fijo: i === 0,
}));

const S = {
  anios,
  // Todo en RMB: bono chino a 10 años del 1,6354 % (ChinaBond, 20-oct-2026) [D4]; beta 0,75 (medidas de 0,48-0,65 frente al
  // Tracker Fund [D1], ajustadas 0,65-0,77; un consumo básico); prima de mercado del 5,5 % y 2 puntos adicionales (China,
  // un solo país, fundador con el 84 %). Deuda bancaria pequeña (≈ 1,3 % del valor) al 2,5 %. WACC ≈ 7,7 %.
  wacc: { tasa_libre_pct: 1.6354, beta: 0.75, prima_mercado_pct: 5.5, prima_adicional_pct: 2.0, coste_deuda_pct: 2.5, tasa_impositiva_pct: 24.3, peso_deuda_pct: 1.3 },
  terminal: { metodo: 'gordon', crecimiento_pct: 1.0, multiplo_salida: 12 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 10.5, precio_pct: 0.5, otros_pct: 2.5 },
    { periodo: '2027e', volumen_pct: 7.5, precio_pct: 0.5, otros_pct: 2.0 },
    { periodo: '2028e', volumen_pct: 7.0, precio_pct: 0.5, otros_pct: 1.5 },
    { periodo: '2029e', volumen_pct: 6.0, precio_pct: 0.5, otros_pct: 1.0 },
    { periodo: '2030e', volumen_pct: 5.0, precio_pct: 0.5, otros_pct: 0.5 },
  ],
  // Bebidas sin alcohol en China: 1,2502 billones de RMB en 2024 [B1]; al 5 % anual, 2030e ≈ 1.675.400 M RMB.
  mercado_final: { periodo: '2030e', tamano: 1675400 },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -3.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 0.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
  // BPA propio: resultado financiero recurrente (intereses de ≈ 26.000 M de caja neta tras el dividendo de agosto, al 1,5-2 %,
  // más diferencias de cambio pequeñas; 485,5 M en 2025 [A1]): 500 M en 2026e, 600 M en 2027e y 650 M en 2028e (la caja crece).
  // Sin minoritarios. Acciones: 11.246,5 M (sin cambios desde la salida a bolsa; el plan de acciones compra en el mercado) [D7].
  bpa: { fin_recurrente: { '2026e': 500, '2027e': 600, '2028e': 650 }, minoritarios: 0, acciones: { '2026e': 11246.5, '2027e': 11246.5, '2028e': 11246.5 } },
};
export default S;

const VENTAS_2025 = 52552.9;
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
