// Supuestos numéricos del analista (Thermo Fisher, corte 2026-10-14). Base: 2025 (44.556 M USD), EBITDA GAAP (EBIT + amortizaciones).
// 2026e fijo: guía de julio (47.400-48.100 M) sin la microbiología vendida en agosto (≈200 M del año).
const crec = [7.1, 6.0, 6.0, 5.5, 5.0, 4.5, 4.0, 3.5, 3.0, 3.0];
const margen = [24.2, 24.6, 25.0, 25.3, 25.5, 25.5, 25.5, 25.5, 25.5, 25.5];
// Amortización: 6,2 % en 2025 (2.780 M, dos tercios de intangibles de compras) que baja hacia la depreciación + intangibles
// futuros; capex: guía 2026 de 1.800-2.000 M (≈4 %), después 3,5 %; en el último año capex = amortización.
const amort = [6.3, 6.0, 5.6, 5.2, 4.8, 4.5, 4.2, 4.0, 3.8, 3.6];
const capex = [4.0, 3.8, 3.6, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.6];
const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: 24,
  tasa_impositiva_pct: 12,
  fijo: i === 0,
}));

export default {
  anios,
  wacc: { tasa_libre_pct: 5.22, beta: 0.85, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.2, tasa_impositiva_pct: 12, peso_deuda_pct: 15 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 20 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  mitad_de_anio: true,
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 2.5, precio_pct: 1.5, otros_pct: 3.1 },
    { periodo: '2027e', volumen_pct: 3.0, precio_pct: 1.5, otros_pct: 1.5 },
    { periodo: '2028e', volumen_pct: 3.5, precio_pct: 1.5, otros_pct: 1.0 },
    { periodo: '2029e', volumen_pct: 3.0, precio_pct: 1.5, otros_pct: 1.0 },
    { periodo: '2030e', volumen_pct: 2.5, precio_pct: 1.5, otros_pct: 1.0 },
  ],
  mercado_final: null,
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 0.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 40, comparables: 40, transacciones: 0, suma_partes: 0, escenarios: 20 },
};
