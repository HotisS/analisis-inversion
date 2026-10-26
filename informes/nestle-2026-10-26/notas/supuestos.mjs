// Supuestos numéricos (Nestlé, corte 2026-10-26). Base: 2025 (89.490 M CHF de ventas, cuentas consolidadas [A1]).
// Crecimiento en CHF = orgánico (3,8 %: volumen ≈2,0 % + precio ≈1,8 %) − divisa (≈ −2 % en 2026 y −1,5 % después)
// − perímetro (Rusia desconsolidada desde el 3T26, aguas a la sociedad conjunta en el 1S27, vitaminas en el 1S27, helados).
// EBITDA con la reestructuración dentro (se repite cada año) y sin deterioros ni resultados de ventas de negocios.
const crec = [1.0, -2.0, -0.2, 2.0, 2.0, 1.8, 1.5, 1.2, 0.9, 0.6];
const margen = [18.8, 19.7, 20.2, 20.5, 20.5, 20.5, 20.5, 20.5, 20.5, 20.5];
// Capex con las altas de derechos de uso (≈1 punto), porque los arrendamientos van como deuda en el puente.
const capex = [5.6, 5.5, 5.5, 5.5, 5.5, 5.5, 5.5, 5.5, 5.5, 5.5];
const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: 4.0,
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: 3.7, // circulante comercial a su nivel real de 2025 (3,7 % de las ventas)
  tasa_impositiva_pct: 23,
  fijo: i === 0,
}));

export default {
  anios,
  // Beta: media de 0,71 (mensual) y 0,54 (semanal) frente al STOXX 600 = 0,625 con D/E medio de ≈19 % en 2021-2025 →
  // desapalancada 0,545 → reapalancada con la deuda neta propia de hoy (56.344 M ÷ 215.360 M = 26 %): 0,655 ≈ 0,66.
  wacc: { tasa_libre_pct: 0.59, beta: 0.66, prima_mercado_pct: 5.5, prima_adicional_pct: 1.0, coste_deuda_pct: 2.5, tasa_impositiva_pct: 23, peso_deuda_pct: 21 },
  terminal: { metodo: 'gordon', crecimiento_pct: 0.5, multiplo_salida: 13 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 1.9, precio_pct: 1.9, otros_pct: -2.8 },
    { periodo: '2027e', volumen_pct: 2.0, precio_pct: 1.8, otros_pct: -5.8 },
    { periodo: '2028e', volumen_pct: 2.0, precio_pct: 1.8, otros_pct: -4.0 },
    { periodo: '2029e', volumen_pct: 2.0, precio_pct: 1.5, otros_pct: -1.5 },
    { periodo: '2030e', volumen_pct: 1.8, precio_pct: 1.5, otros_pct: -1.3 },
  ],
  // Alimentación envasada mundial en 2030e: 4.475 miles de millones USD (TBRC [B10]) × 0,8244 CHF/USD (BCE, 23-oct [D27]).
  mercado_final: { periodo: '2030e', tamano: 3689000, fuente: 'The Business Research Company, Packaged Food Global Market Report (2026), 4.475 miles de millones USD en 2030 al cambio del 23-oct-2026 [B10, D27]' },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -1.0, ajuste_margen_pp: -1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 0.0, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 0.7, ajuste_margen_pp: 0.6, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 45, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 35 },
  // BPA SUBYACENTE (la misma base que la historia del PER): ventas × margen UTOP − 1.400 M de gastos financieros,
  // × (1 − 22,3 %), + 1.600 M de participadas (L'Oréal y Froneri), − 230 M de minoritarios, ÷ 2.573 M de acciones.
  // Calibrado con 2025: la misma fórmula da 4,42 CHF, el BPA subyacente publicado [A1].
  bpa: { '2026e': 4.52, '2027e': 4.56, '2028e': { Bajista: 4.30, Base: 4.65, Alcista: 4.87 } },
};
