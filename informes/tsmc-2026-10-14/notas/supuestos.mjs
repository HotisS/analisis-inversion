// Supuestos numéricos (TSMC, corte 2026-10-14). Base: 2025 real (3.809.054 M TWD).
const crec = [43, 28, 18, 13, 10, 8, 7, 5.5, 4.5, 3.5];
const margen = [73.5, 73.0, 72.0, 71.0, 70.0, 69.5, 69.0, 68.5, 68.0, 68.0];
const amort = [15.0, 16.0, 17.5, 18.5, 19.5, 20.0, 20.5, 20.5, 20.5, 20.5];
const capex = [37, 40, 39, 35, 32, 30, 28, 26, 24, 22.5];
const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: 8,
  tasa_impositiva_pct: i === 0 ? 16 : 17,
  fijo: i === 0,
}));

export default {
  anios,
  wacc: { tasa_libre_pct: 1.88, beta: 1.15, prima_mercado_pct: 5.5, prima_adicional_pct: 1.5, coste_deuda_pct: 2.0, tasa_impositiva_pct: 17, peso_deuda_pct: 1.5 },
  terminal: { metodo: 'gordon', crecimiento_pct: 1.5, multiplo_salida: 14 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 30, precio_pct: 10, otros_pct: 3 },
    { periodo: '2027e', volumen_pct: 20, precio_pct: 8, otros_pct: 0 },
    { periodo: '2028e', volumen_pct: 13, precio_pct: 5, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 9, precio_pct: 4, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 7, precio_pct: 3, otros_pct: 0 },
  ],
  // Mercado de fabricación por encargo (diez mayores): ≈6,9 billones TWD anualizados en el 2T26, creciendo al 12 % anual hasta 2035 (estimación propia).
  mercado_final: { periodo: '2035e', tamano: 19100000 },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -6, ajuste_margen_pp: -4, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 4, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
};
