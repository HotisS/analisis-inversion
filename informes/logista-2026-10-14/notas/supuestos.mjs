// Supuestos numéricos del analista (Logista, corte 2026-10-14). Base: FY2025 (oct-24 a sep-25): ingresos 13.535 M, EBITDA ≈488 M (3,6 %).
// Los ingresos brutos incluyen impuestos especiales y producto repercutidos: el margen sobre ingresos es bajo por construcción.
// Capex incluye los pagos de arrendamientos (54 + 76 = 130 M ≈ 1,0 % de los ingresos), por eso el puente no resta pasivos por arrendamiento.
// FY2026e fijo: 9M publicados (ingresos +2,3 %, EBIT plano) [A5].
const crec = [2.5, 2.5, 2.5, 2.5, 2.0, 2.0, 2.0, 1.5, 1.5, 1.5];
const margen = [3.6, 3.6, 3.6, 3.6, 3.6, 3.6, 3.6, 3.6, 3.6, 3.6];
const anios = crec.map((g, i) => ({
  periodo: `FY${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: 1.25,
  capex_pct_ventas: 1.0,
  nwc_pct_ventas: 0,
  tasa_impositiva_pct: 25,
  fijo: i === 0,
}));

export default {
  anios,
  wacc: { tasa_libre_pct: 3.53, beta: 0.6, prima_mercado_pct: 5.5, prima_adicional_pct: 0.5, coste_deuda_pct: 4.0, tasa_impositiva_pct: 25, peso_deuda_pct: 0 },
  terminal: { metodo: 'gordon', crecimiento_pct: 1.0, multiplo_salida: 10 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: 'FY2026e', volumen_pct: -1.5, precio_pct: 4.0, otros_pct: 0 },
    { periodo: 'FY2027e', volumen_pct: -1.5, precio_pct: 3.5, otros_pct: 0.5 },
    { periodo: 'FY2028e', volumen_pct: -1.5, precio_pct: 3.5, otros_pct: 0.5 },
    { periodo: 'FY2029e', volumen_pct: -1.5, precio_pct: 3.5, otros_pct: 0.5 },
    { periodo: 'FY2030e', volumen_pct: -1.5, precio_pct: 3.0, otros_pct: 0.5 },
  ],
  mercado_final: null,
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -1.5, ajuste_margen_pp: -0.4, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 0, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.0, ajuste_margen_pp: 0.3, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 1.5, multiplo_salida: null },
  ],
  pesos: { dcf: 70, comparables: 0, transacciones: 0, suma_partes: 0, escenarios: 30 },
};
