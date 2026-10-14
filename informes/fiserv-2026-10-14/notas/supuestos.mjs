// Supuestos numéricos del analista (Fiserv, corte 2026-10-14). Base: 2025 real (ingresos GAAP 21.193 M USD, EBITDA 9.025 M = 42,6 %).
// Ingresos GAAP (incluyen reembolsos de franqueo, ≈1.400 M sin margen). Amortización alta por los intangibles de First Data,
// que no se deducen fiscalmente en su mayoría: el DCF usa la amortización sin intangibles comprados (≈1.400 M/año), ≈ capex.
const crec = [-3.0, 1.5, 2.5, 3.0, 3.0, 2.5, 2.5, 2.5, 2.5, 2.5];
const margen = [39.0, 39.0, 39.5, 40.0, 40.0, 40.0, 40.0, 40.0, 40.0, 40.0];
const amort = [8.7, 8.0, 8.0, 8.0, 8.0, 8.0, 8.0, 8.0, 8.0, 8.0];
const capex = [8.5, 8.0, 8.0, 8.0, 8.0, 8.0, 8.0, 8.0, 8.0, 8.0];
const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: 3,
  tasa_impositiva_pct: 21.5,
  fijo: i === 0,
}));

export default {
  anios,
  wacc: { tasa_libre_pct: 5.22, beta: 1.15, prima_mercado_pct: 5.5, prima_adicional_pct: 1.5, coste_deuda_pct: 5.5, tasa_impositiva_pct: 21.5, peso_deuda_pct: 53 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 8 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  mitad_de_anio: true,
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: -1.5, precio_pct: 0, otros_pct: -1.5 },
    { periodo: '2027e', volumen_pct: 2.0, precio_pct: 0, otros_pct: -0.5 },
    { periodo: '2028e', volumen_pct: 2.0, precio_pct: 0.5, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 2.5, precio_pct: 0.5, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 2.5, precio_pct: 0.5, otros_pct: 0 },
  ],
  mercado_final: null,
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 30, ajuste_crecimiento_pp: -2.5, ajuste_margen_pp: -2.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 1.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 20, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 40, comparables: 30, transacciones: 0, suma_partes: 0, escenarios: 30 },
};
