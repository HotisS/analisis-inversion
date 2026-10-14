// Supuestos numéricos (Experian, corte 2026-10-14). Base: FY2026 (abril 2025-marzo 2026), 8.450 M USD de ingresos.
// EBITDA benchmark (sin amortización de intangibles adquiridos). Margen EBITDA FY26 ≈36,1 % (3.050 M, derivado de 5.180 M de deuda neta / 1,7x).
const crec = [9.5, 8.0, 8.0, 7.5, 7.0, 6.5, 6.0, 5.5, 5.0, 4.5];
const margen = [36.6, 37.1, 37.5, 37.8, 38.0, 38.0, 38.0, 38.0, 38.0, 38.0];
const anios = crec.map((g, i) => ({
  periodo: `FY${2027 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: 7.6,
  capex_pct_ventas: i < 5 ? 9.0 : 8.5,
  nwc_pct_ventas: 2,
  tasa_impositiva_pct: 25.5,
  fijo: false,
}));
export default {
  anios,
  wacc: { tasa_libre_pct: 5.22, beta: 0.9, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 4.5, tasa_impositiva_pct: 25.5, peso_deuda_pct: 15 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 14 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: 'FY2027e', volumen_pct: 4.0, precio_pct: 3.0, otros_pct: 2.5 },
    { periodo: 'FY2028e', volumen_pct: 4.5, precio_pct: 3.0, otros_pct: 0.5 },
    { periodo: 'FY2029e', volumen_pct: 4.5, precio_pct: 3.0, otros_pct: 0.5 },
    { periodo: 'FY2030e', volumen_pct: 4.0, precio_pct: 3.0, otros_pct: 0.5 },
    { periodo: 'FY2031e', volumen_pct: 3.5, precio_pct: 3.0, otros_pct: 0.5 },
  ],
  // Gasto mundial en datos y analítica de crédito, identidad, fraude y decisión (≈45.000 M USD hoy, +6 % anual): estimación propia de orden de magnitud.
  mercado_final: null,
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 0.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 25, transacciones: 0, suma_partes: 0, escenarios: 25 },
};
