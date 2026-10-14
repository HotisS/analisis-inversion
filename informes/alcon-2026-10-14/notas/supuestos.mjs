// Supuestos numéricos del analista (Alcon, corte 2026-10-14). Base: 2025 (10.401 M USD de ingresos, EBITDA 2.677 M = 25,7 %).
// EBITDA NIIF = resultado operativo publicado + toda la amortización; el EBIT core = EBITDA − 6,1 % de las ventas
// (depreciación y software, 638 M en 2025); la amortización de intangibles de compras (696 M) solo afecta a impuestos.
const crec = [7.0, 6.0, 6.0, 5.5, 5.0, 4.5, 4.0, 3.5, 3.0, 3.0];
const margen = [26.7, 27.3, 27.8, 28.2, 28.5, 28.5, 28.5, 28.5, 28.5, 28.5];
const amort = [6.5, 6.5, 6.4, 6.3, 6.2, 6.0, 5.9, 5.8, 5.7, 5.6];
const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: i < 9 ? 5.5 : 5.6,
  nwc_pct_ventas: 33,
  tasa_impositiva_pct: 19,
  fijo: i === 0,
}));

export default {
  anios,
  wacc: { tasa_libre_pct: 5.22, beta: 0.85, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 4.5, tasa_impositiva_pct: 19, peso_deuda_pct: 13 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 14 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 4.0, precio_pct: 2.0, otros_pct: 1.0 },
    { periodo: '2027e', volumen_pct: 4.0, precio_pct: 2.0, otros_pct: 0 },
    { periodo: '2028e', volumen_pct: 4.0, precio_pct: 2.0, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 3.5, precio_pct: 2.0, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 3.0, precio_pct: 2.0, otros_pct: 0 },
  ],
  // Mercado oftalmológico de Alcon (37.000 M USD en 2025) creciendo al 5 % anual hasta 2035.
  mercado_final: { periodo: '2035e', tamano: 60300 },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -1.5, ajuste_margen_pp: -1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.0, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.0, ajuste_margen_pp: 0.8, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 40, comparables: 30, transacciones: 0, suma_partes: 0, escenarios: 30 },
};
