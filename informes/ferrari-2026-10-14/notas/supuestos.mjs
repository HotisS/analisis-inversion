// Supuestos numéricos (Ferrari, corte 2026-10-14). Base: 2025 (7.146 M EUR de ventas, EBITDA de 2.772 M, 38,8 %).
// 2026e fijo con la guía elevada en julio (≈7.600 M, EBITDA ≥ 39 %). 2027-2030 hacia el plan de 2030 (≈9.000 M, EBITDA ≥ 40 %).
// Capex: plan de ≈4.700 M en 2026-2030 (≈940 M al año, ≈11-12 % de las ventas) y ≈13 % en 2025.
const crec = [6.4, 5.5, 5.0, 4.0, 4.0, 4.0, 3.5, 3.5, 3.0, 3.0];
const margen = [39.1, 39.3, 39.5, 39.7, 40.0, 40.0, 40.0, 40.0, 40.0, 40.0];
const amort = [9.5, 9.7, 9.8, 9.8, 9.8, 9.8, 9.8, 9.8, 9.8, 9.8];
const capex = [12.5, 12.0, 11.5, 11.0, 11.0, 10.5, 10.5, 10.0, 10.0, 10.0];
const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: 3.0,
  tasa_impositiva_pct: 22,
  fijo: i === 0,
}));

export default {
  anios,
  wacc: { tasa_libre_pct: 3.53, beta: 1.0, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 3.5, tasa_impositiva_pct: 22, peso_deuda_pct: 2 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 20 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: -3.0, precio_pct: 11.4, otros_pct: -2.0 },
    { periodo: '2027e', volumen_pct: 1.0, precio_pct: 4.5, otros_pct: 0 },
    { periodo: '2028e', volumen_pct: 1.0, precio_pct: 4.0, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 0.5, precio_pct: 3.5, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 0.5, precio_pct: 3.5, otros_pct: 0 },
  ],
  mercado_final: null,
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3, ajuste_margen_pp: -2, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.0, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
};
