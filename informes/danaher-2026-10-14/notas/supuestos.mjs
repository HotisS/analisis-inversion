// Supuestos numéricos del analista (Danaher, corte 2026-10-14). Base: 2025 (24.568 M USD), EBITDA GAAP estimado (EBIT ≈4.690 + amortizaciones ≈2.400).
// 2026e fijo: orgánico del 3-4 % de la guía y Masimo desde el 2T26 (≈+4 puntos).
const crec = [8.0, 7.0, 6.0, 5.5, 5.0, 4.5, 4.0, 3.5, 3.0, 3.0];
const margen = [29.0, 29.5, 30.0, 30.5, 31.0, 31.0, 31.0, 31.0, 31.0, 31.0];
// Amortización 9,8 % en 2025 (dos tercios intangibles comprados) que baja hacia la depreciación; capex 4,7 % en 2025.
const amort = [10.0, 9.5, 9.0, 8.5, 8.0, 7.5, 7.0, 6.0, 5.0, 4.5];
const capex = [4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5];
const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: g, margen_ebitda_pct: margen[i], amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i], nwc_pct_ventas: 15, tasa_impositiva_pct: 18, fijo: i === 0,
}));
export default {
  anios,
  wacc: { tasa_libre_pct: 5.22, beta: 0.85, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.0, tasa_impositiva_pct: 18, peso_deuda_pct: 12 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 20 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  mitad_de_anio: true,
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 2.5, precio_pct: 1.0, otros_pct: 4.5 },
    { periodo: '2027e', volumen_pct: 4.0, precio_pct: 1.0, otros_pct: 2.0 },
    { periodo: '2028e', volumen_pct: 4.5, precio_pct: 1.5, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 4.0, precio_pct: 1.5, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 3.5, precio_pct: 1.5, otros_pct: 0 },
  ],
  mercado_final: null,
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 0.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 40, comparables: 40, transacciones: 0, suma_partes: 0, escenarios: 20 },
};
