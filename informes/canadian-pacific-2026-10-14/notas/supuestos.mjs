// Supuestos del DCF, escenarios, pesos y BPA propio de CPKC (corte 2026-10-14). CAD, ejercicio natural, US GAAP.
// Amortización = la publicada (incluye ≈ 2,3 % de ventas de amortización de la compra de KCS); capex = guía 2026 (2.650 M) y después ≈ 16 % de ventas.
const a = (periodo, g, m, am, cx, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: cx, nwc_pct_ventas: -1.5, tasa_impositiva_pct: 24.75, fijo });
const anios = [
  a('2026e', 7.5, 50.0, 12.8, 16.4, true),
  a('2027e', 6.0, 51.5, 13.0, 16.5),
  a('2028e', 6.0, 52.5, 12.8, 16.5),
  a('2029e', 5.5, 53.0, 12.8, 16.5),
  a('2030e', 5.0, 53.0, 12.8, 16.5),
  a('2031e', 4.5, 53.0, 12.8, 16.0),
  a('2032e', 4.0, 53.0, 12.8, 15.5),
  a('2033e', 3.5, 53.0, 12.8, 15.0),
  a('2034e', 3.0, 53.0, 12.8, 14.5),
  a('2035e', 3.0, 53.0, 12.8, 14.0),
];
const casos = [
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.5, ajuste_margen_pp: -2.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.5, multiplo_salida: 11, perfil: [] },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
];
// BPA propio de 2026e-2028e por escenario, con la misma proyección del DCF:
// ventas × margen EBITDA − amortización − resultado financiero recurrente (intereses ≈ −950/−980 M + pensiones +441 M ≈ −500/−540 M) − impuestos (24,75 %), ÷ 879,8 M de acciones (28-jul-2026, sin más recompras).
const ACC = 879.8;
const FIN = { '2026e': -500, '2027e': -530, '2028e': -540 };
function bpa(caso) {
  let v = 15078; const out = {};
  for (const y of anios.slice(0, 3)) {
    const g = y.crecimiento_pct + (y.fijo ? 0 : caso.ajuste_crecimiento_pp);
    const m = y.margen_ebitda_pct + (y.fijo ? 0 : caso.ajuste_margen_pp);
    v *= 1 + g / 100;
    const ebit = v * m / 100 - v * y.amortizacion_pct_ventas / 100;
    const bai = ebit + FIN[y.periodo];
    const acc = y.periodo === '2026e' ? 886.0 : ACC; // 2026: media ponderada (892 en el 1S y ≈ 879 en el 2S)
    out[y.periodo] = { ventas: Math.round(v), ebit: Math.round(ebit), bn: Math.round(bai * (1 - 0.2475)), bpa: Math.round(bai * (1 - 0.2475) / acc * 100) / 100 };
  }
  return out;
}
export const BPA = Object.fromEntries(casos.map((c) => [c.escenario, bpa(c)]));
export default {
  anios,
  wacc: { tasa_libre_pct: 3.87, beta: 0.95, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 4.6, tasa_impositiva_pct: 24.75, peso_deuda_pct: 19 },
  terminal: { metodo: 'media', crecimiento_pct: 3.0, multiplo_salida: 13 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos,
  pesos: { dcf: 40, comparables: 30, transacciones: 0, suma_partes: 0, escenarios: 30 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 4.0, precio_pct: 3.0, otros_pct: 0.5 },
    { periodo: '2027e', volumen_pct: 3.5, precio_pct: 3.0, otros_pct: -0.5 },
    { periodo: '2028e', volumen_pct: 3.0, precio_pct: 3.0, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 3.0, precio_pct: 2.5, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 2.5, precio_pct: 2.5, otros_pct: 0 },
  ],
  mercado_final: { periodo: '2030e', tamano: 169500 },
};
