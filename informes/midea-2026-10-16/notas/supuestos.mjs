// Supuestos numéricos del analista (Midea, línea H, corte 2026-10-16). Base: 2025 (458.502 M RMB de ventas, margen EBITDA 11,8 %, EBIT limpio de intereses y ganancias financieras).
const crec = [3.5, 5.5, 5.5, 5.0, 4.5, 4.0, 3.5, 3.0, 2.5, 2.0];
const margen = [12.0, 12.2, 12.3, 12.3, 12.3, 12.3, 12.3, 12.3, 12.3, 12.3];
const capex = [2.6, 2.6, 2.5, 2.5, 2.4, 2.4, 2.3, 2.3, 2.3, 2.3];
export const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: 2.1,
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: -10,
  tasa_impositiva_pct: 16.5,
  fijo: i === 0,
}));

const S = {
  anios,
  wacc: { tasa_libre_pct: 1.67, beta: 0.85, prima_mercado_pct: 5.5, prima_adicional_pct: 2.0, coste_deuda_pct: 2.75, tasa_impositiva_pct: 16.5, peso_deuda_pct: 10 },
  terminal: { metodo: 'gordon', crecimiento_pct: 1.1, multiplo_salida: 8 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 1.5, precio_pct: -0.5, otros_pct: 2.5 },
    { periodo: '2027e', volumen_pct: 4.0, precio_pct: 0.5, otros_pct: 1.0 },
    { periodo: '2028e', volumen_pct: 4.5, precio_pct: 1.0, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 4.0, precio_pct: 1.0, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 3.5, precio_pct: 1.0, otros_pct: 0 },
  ],
  // Electrodomésticos + climatización mundial (Ken Research 529.000 M USD + Arizton 215.000 M USD en 2025, +5,2 % anual [B3, B4]): 960.000 M USD en 2030 × 6,686 RMB/USD = 6.418.560 M RMB,
  // dividido por la parte de las ventas que juega en ese mercado (hogar y edificios: 335.718 / 458.502 = 73,2 %), para que la cuota implícita compare lo mismo que la de hoy (6,7 %).
  mercado_final: { periodo: '2030e', tamano: 8766130 },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 0.6, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 0.7, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 60, comparables: 10, transacciones: 0, suma_partes: 0, escenarios: 30 },
  // Para el BPA propio: resultado financiero recurrente (intereses de una tesorería que baja por dividendos y recompras, ganancias de instrumentos), minoritarios y acciones.
  bpa: { fin_recurrente: 6500, minoritarios: 500, acciones: { '2026e': 7497, '2027e': 7460, '2028e': 7460 } },
};
export default S;

const VENTAS_2025 = 458502;
// BPA propio con la fórmula del método: ventas × margen EBITDA − amortización + resultado financiero, impuesto, minoritarios, ÷ acciones.
export function bpa(caso = 'Base', hasta = 3) {
  const c = S.casos.find((x) => x.escenario === caso);
  let v = VENTAS_2025; let r = null;
  for (let i = 0; i < hasta; i++) {
    const a = S.anios[i];
    const k = a.fijo ? 0 : 1; // 2026e es año fijo (el 1S26 ya está publicado): los ajustes de escenario empiezan en 2027e
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
