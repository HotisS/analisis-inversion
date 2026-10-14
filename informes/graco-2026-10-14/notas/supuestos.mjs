// Supuestos del DCF, escenarios, pesos y BPA propio de Graco (corte 2026-10-14). USD, ejercicio natural (cierra el último viernes de diciembre), US GAAP.
// 2026e casi cerrado: 1S26 1.130,7 M + guía del 3T26 (580-600 M sin Valco) + Valco Melton desde el 31-ago (≈145 M/año) + 4T con +3 %.
// 2027e: año completo de Valco (+≈4,4 puntos) + orgánico ≈2 %. Desde 2028e, crecimiento casi orgánico; las compras pequeñas
// (≈0,4 puntos de crecimiento) se pagan dentro del capex (+0,8 % de las ventas), como pide la lección de compradores en serie.
const a = (periodo, g, m, da, cx, nwc, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: da, capex_pct_ventas: cx, nwc_pct_ventas: nwc, tasa_impositiva_pct: 20.5, fijo });
const anios = [
  a('2026e', 6.4, 32.0, 4.6, 4.2, 28.0, true),
  a('2027e', 6.5, 32.3, 4.5, 4.0, 28.0),
  a('2028e', 4.0, 32.5, 4.4, 4.8, 28.0),
  a('2029e', 4.0, 32.5, 4.3, 4.8, 28.0),
  a('2030e', 3.5, 32.5, 4.2, 4.8, 28.0),
  a('2031e', 3.5, 32.5, 4.1, 4.8, 28.0),
  a('2032e', 3.0, 32.5, 4.0, 4.8, 28.0),
  a('2033e', 3.0, 32.5, 4.0, 4.8, 28.0),
];
const casos = [
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -1.0, ajuste_margen_pp: -0.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: null, multiplo_salida: null,
    perfil: [{ periodo: '2027e', crecimiento_pp: -12.0, margen_pp: -2.5 }, { periodo: '2028e', crecimiento_pp: -3.0, margen_pp: -1.5 }] },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 0.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
];
// BPA propio: ventas × (margen EBITDA − D&A) + resultado financiero (intereses de la caja que se acumula sin recompras no anunciadas),
// × (1 − 20,5 % de impuesto normalizado, sin ventajas fiscales por opciones), ÷ 164,0 M acciones (161,95 en circulación a 8-jul-26 + ≈2,0 de opciones).
// Cuadre con 2025: 2.236,6 × (32,1 % normalizado − 4,8 %) = 610,7 (EBIT ajustado publicado 610,7) + 16,4 = 627,1 × 0,795 = 498,5 → 2,95 con 169,2 M (BPA ajustado publicado 2,95).
const VENTAS_2025 = 2236.6, ACC = 164.0;
const FIN = { '2026e': 12, '2027e': 15, '2028e': 25 };
export function bpa(caso, hasta = '2028e') {
  let v = VENTAS_2025; const out = {};
  for (const y of anios) {
    const p = (caso.perfil || []).find((q) => q.periodo === y.periodo);
    const dg = y.fijo ? 0 : p ? p.crecimiento_pp : caso.ajuste_crecimiento_pp;
    const dm = y.fijo ? 0 : p ? p.margen_pp : caso.ajuste_margen_pp;
    v *= 1 + (y.crecimiento_pct + dg) / 100;
    const ebit = v * (y.margen_ebitda_pct + dm - y.amortizacion_pct_ventas) / 100;
    if (FIN[y.periodo] != null) out[y.periodo] = { ventas: Math.round(v), ebit: Math.round(ebit), bpa: Math.round(((ebit + FIN[y.periodo]) * 0.795) / ACC * 100) / 100 };
    if (y.periodo === hasta) break;
  }
  return out;
}
export default {
  anios,
  wacc: { tasa_libre_pct: 5.21, beta: 0.95, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.5, tasa_impositiva_pct: 21, peso_deuda_pct: 1 },
  terminal: { metodo: 'media', crecimiento_pct: 3.0, multiplo_salida: 17 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos,
  pesos: { dcf: 40, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 40 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: -1.5, precio_pct: 2.0, otros_pct: 5.9 },
    { periodo: '2027e', volumen_pct: 0.5, precio_pct: 1.5, otros_pct: 4.5 },
    { periodo: '2028e', volumen_pct: 1.5, precio_pct: 2.0, otros_pct: 0.5 },
    { periodo: '2029e', volumen_pct: 1.5, precio_pct: 2.0, otros_pct: 0.5 },
    { periodo: '2030e', volumen_pct: 1.0, precio_pct: 2.0, otros_pct: 0.5 },
  ],
  mercado_final: null,
};

if (process.argv[1] && process.argv[1].endsWith('supuestos.mjs')) {
  for (const c of casos) console.log(c.escenario, JSON.stringify(bpa(c)));
}
