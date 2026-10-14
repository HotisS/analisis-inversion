// Supuestos numéricos del analista (Garmin, corte 2026-10-14). Base: 2025 (7.245,5 M USD).
// 2026e fijo con la guía de julio (≈8.050 M, margen operativo 27,0 % + amortización ≈2,6 % de ventas).
const crec = [11.1, 7.0, 6.5, 6.0, 5.5, 5.0, 4.5, 4.0, 3.5, 3.0];
const margen = [29.6, 29.0, 29.0, 28.8, 28.5, 28.5, 28.5, 28.5, 28.5, 28.5];
const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: 2.6,
  capex_pct_ventas: i < 3 ? 3.5 : 3.2,
  nwc_pct_ventas: 36,
  tasa_impositiva_pct: i === 0 ? 16.5 : 17.0,
  fijo: i === 0,
}));

export default {
  anios,
  wacc: { tasa_libre_pct: 5.22, beta: 0.99, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.5, tasa_impositiva_pct: 17, peso_deuda_pct: 0 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 18 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 8.0, precio_pct: 2.0, otros_pct: 1.1 },
    { periodo: '2027e', volumen_pct: 4.0, precio_pct: 2.0, otros_pct: 1.0 },
    { periodo: '2028e', volumen_pct: 4.5, precio_pct: 2.0, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 4.0, precio_pct: 2.0, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 3.5, precio_pct: 2.0, otros_pct: 0 },
  ],
  mercado_final: null,
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -2.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.0, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
};
