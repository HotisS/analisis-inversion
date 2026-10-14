// Supuestos numéricos (Heineken, corte 2026-10-14). Base: ingresos netos de 2025 (28.753 M EUR).
// EBITDA en base beia (sin excepcionales): 2025 ≈ 6.594 M (deuda neta 14.506 M ÷ 2,2x), 22,9 % de las ventas.
// Rebajado tras la prueba de sostenibilidad: en euros el grupo no creció entre 2022 y 2025 (28.719 → 28.753 M) por la divisa.
const crec = [5.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0];
const margen = [23.0, 23.2, 23.4, 23.5, 23.5, 23.5, 23.5, 23.5, 23.5, 23.5];
const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: 7.7,
  capex_pct_ventas: 8.0,
  nwc_pct_ventas: 0,
  tasa_impositiva_pct: 26.5,
  fijo: i === 0,
}));

export default {
  anios,
  wacc: { tasa_libre_pct: 3.53, beta: 0.8, prima_mercado_pct: 5.5, prima_adicional_pct: 1.0, coste_deuda_pct: 4.0, tasa_impositiva_pct: 26.5, peso_deuda_pct: 30 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.0, multiplo_salida: 9 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 0.5, precio_pct: 2.5, otros_pct: 2.0 },
    { periodo: '2027e', volumen_pct: 0.5, precio_pct: 3.0, otros_pct: -1.5 },
    { periodo: '2028e', volumen_pct: 0.5, precio_pct: 3.0, otros_pct: -1.5 },
    { periodo: '2029e', volumen_pct: 0.5, precio_pct: 3.0, otros_pct: -1.5 },
    { periodo: '2030e', volumen_pct: 0.5, precio_pct: 3.0, otros_pct: -1.5 },
  ],
  mercado_final: null,
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 1.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 55, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 20, ajuste_crecimiento_pp: 1.0, ajuste_margen_pp: 0.7, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 30, transacciones: 0, suma_partes: 0, escenarios: 20 },
};
