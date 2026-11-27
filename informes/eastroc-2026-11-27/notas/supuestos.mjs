// Supuestos numéricos del analista (Eastroc, línea H 9980.HK, corte 2026-11-27). Cuentas en millones de CNY (normas chinas CAS).
// Base: 2025 (20.875 M CNY de ventas, margen EBITDA del 27,1 %, EBIT del 24,8 %) [A1]; 9M26: ventas 18.596 M (+10,4 %), EBIT 5.100 M [A17].
const crec = [9.0, 8.0, 7.0, 6.0, 5.0, 4.5, 4.0, 3.5, 3.0, 3.0];
const margen = [28.5, 27.5, 27.2, 27.0, 27.0, 27.0, 27.0, 27.0, 27.0, 27.0];
const amort = [2.7, 3.0, 3.2, 3.4, 3.5, 3.6, 3.6, 3.6, 3.6, 3.6];
const capex = [8.3, 7.0, 6.0, 5.0, 4.5, 4.2, 4.0, 3.9, 3.8, 3.8];
export const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: -2.5,
  tasa_impositiva_pct: 21.5,
  fijo: i === 0,
}));

const S = {
  anios,
  wacc: { tasa_libre_pct: 1.591, beta: 0.85, prima_mercado_pct: 5.5, prima_adicional_pct: 2.5, coste_deuda_pct: 2.0, tasa_impositiva_pct: 21.5, peso_deuda_pct: 8 },
  terminal: { metodo: 'gordon', crecimiento_pct: 1.0, multiplo_salida: 10 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 9.0, precio_pct: -1.0, otros_pct: 1.0 },
    { periodo: '2027e', volumen_pct: 7.0, precio_pct: 0.0, otros_pct: 1.0 },
    { periodo: '2028e', volumen_pct: 6.0, precio_pct: 0.0, otros_pct: 1.0 },
    { periodo: '2029e', volumen_pct: 5.0, precio_pct: 0.0, otros_pct: 1.0 },
    { periodo: '2030e', volumen_pct: 4.0, precio_pct: 0.0, otros_pct: 1.0 },
  ],
  // Bebidas funcionales en China a precio de venta al público (Frost & Sullivan [B1]): 281.000 M en 2029e, +10,9 % anual;
  // 2030e = 281.000 × 1,109 = 311.629 M. Pasado a precio de fábrica con el cociente de 2024 (15.839 M de ventas ÷ 23,0 % de 166.500 M = 0,4136),
  // para que la cuota implícita compare lo mismo que el 23,0 % de hoy: 311.629 × 0,4136 = 128.890 M.
  mercado_final: { periodo: '2030e', tamano: 128890 },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -4.0, ajuste_margen_pp: -2.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 0.6, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 3.0, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 60, comparables: 15, transacciones: 0, suma_partes: 0, escenarios: 25 },
  // BPA propio: resultado financiero de 2026e = el publicado de 9M26 (203 M, con ≈ 355 M de pérdidas de cambio y 263 M de valor razonable [A17])
  // más ≈ 50 M del 4T; 2027e-2028e sin cambio ni valor razonable: intereses de ≈ 23.000 M de tesorería al 1,3-1,5 % más productos de tesorería
  // (≈ 110 M al año) menos ≈ 90 M de intereses de 6.273 M de deuda. Impuesto del 21,5 % (21,8 % en 9M26) y 727,08 M de acciones con voto
  // (sin compras de A en jul-oct [A19]; sin suponer más recompras). 2026e: 9M26 publicado + un 4T como el de 2025 (ventas +3 %).
  bpa: { fin_recurrente: { '2026e': 250, '2027e': 330, '2028e': 320 }, minoritarios: 2, acciones: { '2026e': 727.08, '2027e': 727.08, '2028e': 727.08 } },
};
export default S;

const VENTAS_2025 = 20875.27;
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
    const neto = bai * (1 - a.tasa_impositiva_pct / 100) - S.bpa.minoritarios;
    const acc = S.bpa.acciones[a.periodo];
    r = { periodo: a.periodo, ventas: v, ebitda, ebit, bai, neto, acciones: acc, bpa: neto / acc };
  }
  return r;
}
