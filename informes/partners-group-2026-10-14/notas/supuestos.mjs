// Supuestos numéricos del analista (Partners Group, corte 2026-10-14). Base: 2025 (2.563 M CHF de ingresos, EBITDA 1.611 M = 62,9 %).
// Ingresos = comisiones de gestión (crecen con los activos medios en CHF) + comisiones de rendimiento (20-25 % en 2026; 25-27 % en 2027-28).
const crec = [-7.5, 9.0, 9.0, 8.0, 7.0, 6.0, 5.0, 4.0, 3.0, 2.0];
const margen = [61.5, 61.5, 61.5, 61.0, 61.0, 60.5, 60.5, 60.0, 60.0, 60.0];
const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: 2.8,
  capex_pct_ventas: i < 3 ? 4.0 : i < 7 ? 3.5 : 3.0,
  nwc_pct_ventas: 0,
  tasa_impositiva_pct: 17.5,
  fijo: i === 0,
}));

export default {
  anios,
  wacc: { tasa_libre_pct: 0.54, beta: 1.25, prima_mercado_pct: 5.5, prima_adicional_pct: 2.0, coste_deuda_pct: 1.5, tasa_impositiva_pct: 17.5, peso_deuda_pct: 13 },
  terminal: { metodo: 'gordon', crecimiento_pct: 1.0, multiplo_salida: 12 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 3.0, precio_pct: 0, otros_pct: -10.5 },
    { periodo: '2027e', volumen_pct: 5.0, precio_pct: 0, otros_pct: 4.0 },
    { periodo: '2028e', volumen_pct: 6.0, precio_pct: 0, otros_pct: 3.0 },
    { periodo: '2029e', volumen_pct: 6.5, precio_pct: 0, otros_pct: 1.5 },
    { periodo: '2030e', volumen_pct: 6.5, precio_pct: 0, otros_pct: 0.5 },
  ],
  mercado_final: null,
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -4.0, ajuste_margen_pp: -2.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 0.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 60, comparables: 0, transacciones: 0, suma_partes: 0, escenarios: 40 },
};
