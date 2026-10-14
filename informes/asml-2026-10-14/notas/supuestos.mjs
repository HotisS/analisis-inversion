// Supuestos numéricos del analista (ASML, corte 2026-10-14). Base: 2025 real (32.667 M EUR).
// 2026e fijo: guía de 44.000-45.000 M tras el 3T26 (punto medio, +36,2 %).
const crec = [36.2, 25.0, 15.0, 5.0, 7.0, 7.0, 6.0, 5.0, 4.5, 4.0];
const margen = [43.2, 46.0, 47.0, 46.0, 46.0, 46.0, 46.0, 46.0, 46.0, 46.0];
const capex = [5.0, 5.0, 4.5, 4.0, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5];
const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: 2.5,
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: 0,
  tasa_impositiva_pct: 17,
  fijo: i === 0,
}));

export default {
  anios,
  wacc: { tasa_libre_pct: 3.53, beta: 1.2, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 2.0, tasa_impositiva_pct: 17, peso_deuda_pct: 0.5 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 22 },
  etapa2: { usar: true, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 28.0, precio_pct: 5.0, otros_pct: 3.2 },
    { periodo: '2027e', volumen_pct: 19.0, precio_pct: 4.0, otros_pct: 2.0 },
    { periodo: '2028e', volumen_pct: 10.0, precio_pct: 3.0, otros_pct: 2.0 },
    { periodo: '2029e', volumen_pct: 1.0, precio_pct: 3.0, otros_pct: 1.0 },
    { periodo: '2030e', volumen_pct: 3.0, precio_pct: 3.0, otros_pct: 1.0 },
  ],
  // WFE de SEMI: 177.500 M EUR en 2028e; +5 % anual hasta 2035 ≈ 250.000 M EUR (mismo perímetro que la cuota del 31,5 %).
  mercado_final: { periodo: '2035e', tamano: 250000 },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 30, ajuste_crecimiento_pp: -6.0, ajuste_margen_pp: -3.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.0, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 20, ajuste_crecimiento_pp: 4.0, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 25, transacciones: 0, suma_partes: 0, escenarios: 25 },
};
