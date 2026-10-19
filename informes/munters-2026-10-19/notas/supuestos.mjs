// Supuestos del DCF, escenarios, pesos y BPA propio de Munters (corte 2026-10-19). SEK, ejercicio natural, NIIF, operaciones continuadas.
// Capex = inmovilizado + intangibles (858 M en 2025, 5,8 % de ventas) + altas de derechos de uso (≈1 % de ventas; pagos de arrendamientos 1,4 %).
// Ventas: 2026e con el 1S26 (7.385 M) y un 2S26 de ≈8.200 M; 2027e-2028e con la cartera de 24.542 M (DCT 19.185 M, entregas hasta el 1T28).
const a = (periodo, g, m, cx, nwc, da, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: da, capex_pct_ventas: cx, nwc_pct_ventas: nwc, tasa_impositiva_pct: 30, fijo });
const anios = [
  a('2026e', 6.0, 14.4, 7.2, 4.0, 5.0, true),
  a('2027e', 26.0, 16.0, 7.0, 6.0, 4.7),
  a('2028e', 10.5, 16.5, 6.5, 7.5, 4.6),
  a('2029e', 7.0, 16.5, 6.0, 9.0, 4.6),
  a('2030e', 6.0, 16.5, 5.6, 9.0, 4.6),
  a('2031e', 5.0, 16.5, 5.3, 9.0, 4.6),
  a('2032e', 4.0, 16.5, 5.0, 9.0, 4.6),
  a('2033e', 3.5, 16.5, 4.8, 9.0, 4.6),
];
const casos = [
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: null, multiplo_salida: null,
    perfil: [{ periodo: '2027e', crecimiento_pp: -12.0, margen_pp: -2.5 }, { periodo: '2028e', crecimiento_pp: -6.0, margen_pp: -2.0 }] },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null,
    perfil: [{ periodo: '2027e', crecimiento_pp: 4.0, margen_pp: 1.0 }] },
];
// BPA propio: ventas × (margen EBITDA − amortización) + resultado financiero recurrente, × (1 − 30 %), − minoritarios, ÷ 182,541 M acciones.
// Cuadre con 2025: 14.712 × (13,45 % − 5,10 %) = 1.228; − 412 = 815; − 253 de impuesto (31 %) − 12 = 550 → 3,01 SEK.
const VENTAS_2025 = 14712, ACC = 182.541;
const FIN = { '2026e': -400, '2027e': -380, '2028e': -340 };
const MIN = { '2026e': 5, '2027e': 5, '2028e': 6 };
export function bpa(caso, hasta = '2028e') {
  let v = VENTAS_2025; const out = {};
  for (const y of anios) {
    const p = (caso.perfil || []).find((q) => q.periodo === y.periodo);
    const dg = y.fijo ? 0 : p ? p.crecimiento_pp : caso.ajuste_crecimiento_pp;
    const dm = y.fijo ? 0 : p ? p.margen_pp : caso.ajuste_margen_pp;
    v *= 1 + (y.crecimiento_pct + dg) / 100;
    const ebit = v * (y.margen_ebitda_pct + dm - y.amortizacion_pct_ventas) / 100;
    if (FIN[y.periodo] != null) out[y.periodo] = { ventas: Math.round(v), ebit: Math.round(ebit), bpa: Math.round(((ebit + FIN[y.periodo]) * 0.70 - MIN[y.periodo]) / ACC * 100) / 100 };
    if (y.periodo === hasta) break;
  }
  return out;
}
export default {
  anios,
  wacc: { tasa_libre_pct: 3.2, beta: 1.25, prima_mercado_pct: 5.5, prima_adicional_pct: 0.5, coste_deuda_pct: 5.0, tasa_impositiva_pct: 30, peso_deuda_pct: 25 },
  terminal: { metodo: 'media', crecimiento_pct: 2.5, multiplo_salida: 11 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos,
  pesos: { dcf: 40, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 40 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 9.0, precio_pct: 2.5, otros_pct: -5.5 },
    { periodo: '2027e', volumen_pct: 23.0, precio_pct: 2.5, otros_pct: 0.5 },
    { periodo: '2028e', volumen_pct: 8.0, precio_pct: 2.5, otros_pct: 0.0 },
    { periodo: '2029e', volumen_pct: 4.5, precio_pct: 2.5, otros_pct: 0.0 },
    { periodo: '2030e', volumen_pct: 3.5, precio_pct: 2.5, otros_pct: 0.0 },
  ],
  mercado_final: null,
};
if (process.argv[1] && process.argv[1].endsWith('supuestos.mjs')) for (const c of casos) console.log(c.escenario, JSON.stringify(bpa(c)));
