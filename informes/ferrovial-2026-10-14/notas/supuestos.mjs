// Supuestos numéricos del analista (Ferrovial, corte 2026-10-14). Base: 2025 (9.630 M EUR de ingresos, EBITDA ajustado ≈1.500 M).
// El DCF valora el perímetro CONSOLIDADO (construcción + Managed Lanes al 100 % + energía + corporación). El 407 ETR (48,29 %,
// puesta en equivalencia) no está en el EBITDA: entra en el puente como asociada al precio de la compra de 2025, y los
// minoritarios de las Managed Lanes, a una estimación de valor de mercado.
// 2026e fijo: 1S26 publicado (ingresos 4.700 M, EBITDA 746 M, margen 15,9 %).
const crec = [5.0, 6.0, 6.0, 5.5, 5.0, 4.5, 4.0, 3.5, 3.0, 2.5];
const margen = [16.5, 17.0, 17.5, 18.0, 18.5, 18.5, 18.5, 18.5, 18.5, 18.5];
const capex = [5.0, 6.0, 6.5, 6.5, 6.0, 6.0, 6.0, 6.0, 6.0, 6.0];
const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: 5.5,
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: 0,
  tasa_impositiva_pct: 25,
  fijo: i === 0,
}));

export default {
  anios,
  wacc: { tasa_libre_pct: 3.53, beta: 0.9, prima_mercado_pct: 5.5, prima_adicional_pct: 0.5, coste_deuda_pct: 5.0, tasa_impositiva_pct: 25, peso_deuda_pct: 20 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.0, multiplo_salida: 20 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 3.0, precio_pct: 3.5, otros_pct: -1.5 },
    { periodo: '2027e', volumen_pct: 3.0, precio_pct: 3.0, otros_pct: 0 },
    { periodo: '2028e', volumen_pct: 3.0, precio_pct: 3.0, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 2.5, precio_pct: 3.0, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 2.0, precio_pct: 3.0, otros_pct: 0 },
  ],
  mercado_final: null,
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 1.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 70, comparables: 0, transacciones: 0, suma_partes: 0, escenarios: 30 },
};
