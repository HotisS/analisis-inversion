// Supuestos del DCF, escenarios, pesos y BPA propio de Interpump (corte 2026-10-14). EUR, ejercicio natural, NIIF.
// Capex = inversión propia en inmovilizado e intangibles (guía: ≈4 % de las ventas) + altas de derechos de uso (≈0,7 %)
// + compras pequeñas (≈2 % de las ventas: la guía de 2.500 M en 2028 incluye compras y el grupo compra cada año).
// Circulante comercial ≈40 % de las ventas en 2025 (existencias + clientes − proveedores = 842 M); objetivo 35-36 %: se baja poco a poco.
const a = (periodo, g, m, cx, nwc, fijo = false, da = 6.0) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: da, capex_pct_ventas: cx, nwc_pct_ventas: nwc, tasa_impositiva_pct: 29, fijo });
const anios = [
  a('2026e', 3.0, 22.3, 7.0, 40.0, true, 6.1),
  a('2027e', 5.0, 22.5, 7.2, 39.5),
  a('2028e', 5.0, 22.6, 7.0, 39.0),
  a('2029e', 4.5, 22.6, 6.9, 38.5),
  a('2030e', 4.0, 22.6, 6.7, 38.0),
  a('2031e', 3.5, 22.6, 6.5, 38.0),
  a('2032e', 3.0, 22.6, 6.3, 38.0),
  a('2033e', 2.5, 22.6, 6.0, 38.0),
];
const casos = [
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -1.0, ajuste_margen_pp: -0.6, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: null, multiplo_salida: null,
    perfil: [{ periodo: '2027e', crecimiento_pp: -11.0, margen_pp: -2.5 }, { periodo: '2028e', crecimiento_pp: -3.0, margen_pp: -1.5 }] },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 0.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
];
// BPA propio: ventas × (margen EBITDA − amortización) + resultado financiero recurrente, × (1 − 29 %), − minoritarios, ÷ 105,35 M acciones (105,09 en circulación a 30-jun-26 + 0,26 de opciones).
// Cuadre con 2025: 2.070,7 × (22,31 % − 6,06 %) = 336,6; − 37,8 = 298,8; × 0,702 (impuesto real 29,8 %) − 1,6 = 208,1 → 1,955 EUR con 106,4 M de acciones medias.
const VENTAS_2025 = 2070.7, ACC = 105.35;
const FIN = { '2026e': -20, '2027e': -16, '2028e': -12 };
const MIN = { '2026e': 1.6, '2027e': 1.7, '2028e': 1.8 };
export function bpa(caso, hasta = '2028e') {
  let v = VENTAS_2025; const out = {};
  for (const y of anios) {
    const p = (caso.perfil || []).find((q) => q.periodo === y.periodo);
    const dg = y.fijo ? 0 : p ? p.crecimiento_pp : caso.ajuste_crecimiento_pp;
    const dm = y.fijo ? 0 : p ? p.margen_pp : caso.ajuste_margen_pp;
    v *= 1 + (y.crecimiento_pct + dg) / 100;
    const ebit = v * (y.margen_ebitda_pct + dm - y.amortizacion_pct_ventas) / 100;
    if (FIN[y.periodo] != null) out[y.periodo] = { ventas: Math.round(v), ebit: Math.round(ebit), bpa: Math.round(((ebit + FIN[y.periodo]) * 0.71 - MIN[y.periodo]) / ACC * 100) / 100 };
    if (y.periodo === hasta) break;
  }
  return out;
}
export default {
  anios,
  wacc: { tasa_libre_pct: 3.51, beta: 1.10, prima_mercado_pct: 5.5, prima_adicional_pct: 0.25, coste_deuda_pct: 3.6, tasa_impositiva_pct: 28, peso_deuda_pct: 12 },
  terminal: { metodo: 'media', crecimiento_pct: 2.25, multiplo_salida: 11 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos,
  pesos: { dcf: 40, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 40 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 0.0, precio_pct: 2.0, otros_pct: 1.0 },
    { periodo: '2027e', volumen_pct: 1.0, precio_pct: 2.0, otros_pct: 2.0 },
    { periodo: '2028e', volumen_pct: 1.0, precio_pct: 2.0, otros_pct: 2.0 },
    { periodo: '2029e', volumen_pct: 0.5, precio_pct: 2.0, otros_pct: 2.0 },
    { periodo: '2030e', volumen_pct: 0.5, precio_pct: 2.0, otros_pct: 1.5 },
  ],
  mercado_final: null,
};

if (process.argv[1] && process.argv[1].endsWith('supuestos.mjs')) {
  for (const c of casos) console.log(c.escenario, JSON.stringify(bpa(c)));
}
