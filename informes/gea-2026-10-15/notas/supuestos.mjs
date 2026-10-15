// Supuestos del DCF, escenarios, pesos y BPA propio de GEA (corte 2026-10-15). EUR, ejercicio natural, NIIF-UE.
// Margen EBITDA PUBLICADO (después de reestructuración, ≈0,8-0,9 puntos por debajo del «antes de reestructuración» que guía la empresa).
// Capex = inversión en inmovilizado (4,6 % de las ventas en 2025; 2,7 % en el 1S26) + altas de derechos de uso (≈1,2 % de ventas).
const a = (periodo, g, m, cx, fijo = false, da = 4.0) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: da, capex_pct_ventas: cx, nwc_pct_ventas: 3.5, tasa_impositiva_pct: 28, fijo });
const anios = [
  a('2026e', 5.0, 16.4, 4.6, true),
  a('2027e', 6.0, 16.9, 5.0),
  a('2028e', 5.5, 17.2, 4.9),
  a('2029e', 5.0, 17.4, 4.8),
  a('2030e', 4.5, 17.5, 4.7),
  a('2031e', 4.0, 17.5, 4.6),
  a('2032e', 3.5, 17.5, 4.5),
  a('2033e', 3.0, 17.5, 4.4),
];
const casos = [
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.5, ajuste_margen_pp: -1.2, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: null, multiplo_salida: null,
    perfil: [{ periodo: '2027e', crecimiento_pp: -9.0, margen_pp: -2.0 }, { periodo: '2028e', crecimiento_pp: -4.0, margen_pp: -1.5 }] },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 0.7, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
];
// BPA propio: ventas × (margen EBITDA − amortización) + resultado financiero recurrente, × (1 − 28 %), ÷ acciones medias
// (162,8 M en junio de 2026 menos la recompra anunciada de 500 M EUR hasta finales de 2027 a ≈68 EUR: ≈7,4 M de acciones).
// Cuadre con 2025: 5.495,4 × (15,63 % − 4,17 %) = 629,8; − 35,4 = 594,4; × 0,69 (impuesto real del 31 %) = 410,1 → 2,51 EUR (BPA de operaciones continuadas publicado: 2,51).
const VENTAS_2025 = 5495.4;
const FIN = { '2026e': -34, '2027e': -38, '2028e': -40 };
const ACC = { '2026e': 162.3, '2027e': 158.8, '2028e': 155.6 };
export function bpa(caso, hasta = '2028e') {
  let v = VENTAS_2025; const out = {};
  for (const y of anios) {
    const p = (caso.perfil || []).find((q) => q.periodo === y.periodo);
    const dg = y.fijo ? 0 : p ? p.crecimiento_pp : caso.ajuste_crecimiento_pp;
    const dm = y.fijo ? 0 : p ? p.margen_pp : caso.ajuste_margen_pp;
    v *= 1 + (y.crecimiento_pct + dg) / 100;
    const ebit = v * (y.margen_ebitda_pct + dm - y.amortizacion_pct_ventas) / 100;
    if (FIN[y.periodo] != null) out[y.periodo] = { ventas: Math.round(v), ebit: Math.round(ebit), bpa: Math.round(((ebit + FIN[y.periodo]) * 0.72) / ACC[y.periodo] * 100) / 100 };
    if (y.periodo === hasta) break;
  }
  return out;
}
export default {
  anios,
  wacc: { tasa_libre_pct: 3.45, beta: 0.95, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 3.5, tasa_impositiva_pct: 28, peso_deuda_pct: 3 },
  terminal: { metodo: 'media', crecimiento_pct: 2.5, multiplo_salida: 13 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos,
  pesos: { dcf: 40, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 40 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 4.5, precio_pct: 2.5, otros_pct: -2.0 },
    { periodo: '2027e', volumen_pct: 3.5, precio_pct: 2.0, otros_pct: 0.5 },
    { periodo: '2028e', volumen_pct: 3.5, precio_pct: 2.0, otros_pct: 0.0 },
    { periodo: '2029e', volumen_pct: 3.0, precio_pct: 2.0, otros_pct: 0.0 },
    { periodo: '2030e', volumen_pct: 2.5, precio_pct: 2.0, otros_pct: 0.0 },
  ],
  mercado_final: { periodo: '2030e', tamano: 64333 },
};
if (process.argv[1]?.endsWith('supuestos.mjs')) for (const c of casos) console.log(c.escenario, JSON.stringify(bpa(c)));
