// Supuestos numéricos del analista (Linde, corte 2026-10-14). Base: 2025 (33.986 M USD).
// Margen EBITDA en base publicada (con los cargos de reestructuración recurrentes): 37,3 % en 2025 (38,6 % ajustado).
// Amortización publicada, con la de la compra de Linde AG (11,1 % en 2025), coherente con la base del último ejercicio.
// Caso base rebajado por la prueba de sostenibilidad: 2027-28 del 6 % al 5,5 % y margen plano en ≈38 %.
const crec = [7.5, 5.5, 5.5, 5.0, 4.5, 4.0, 3.5, 3.5, 3.0, 3.0];
const margen = [37.6, 37.7, 37.8, 37.9, 38.0, 38.0, 38.0, 38.0, 38.0, 38.0];
const capex = [15.0, 16.0, 16.0, 16.0, 16.0, 15.5, 15.0, 14.5, 14.0, 13.5];
const amort = [10.9, 10.8, 10.7, 10.6, 10.5, 10.4, 10.3, 10.3, 10.3, 10.3];
const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: 0,
  tasa_impositiva_pct: 23.5,
  fijo: i === 0,
}));

export default {
  anios,
  wacc: { tasa_libre_pct: 5.22, beta: 0.9, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.0, tasa_impositiva_pct: 23.5, peso_deuda_pct: 10 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 16 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 1.5, precio_pct: 2.5, otros_pct: 3.5 },
    { periodo: '2027e', volumen_pct: 3.0, precio_pct: 2.5, otros_pct: 0 },
    { periodo: '2028e', volumen_pct: 3.0, precio_pct: 2.5, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 2.5, precio_pct: 2.5, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 2.0, precio_pct: 2.5, otros_pct: 0 },
  ],
  // Mercado mundial de gases industriales (≈107.200 M USD en 2025, Vyansa) creciendo al 5 % hasta 2035.
  mercado_final: { periodo: '2035e', tamano: 174600 },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 0.8, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 25, transacciones: 0, suma_partes: 0, escenarios: 25 },
};
