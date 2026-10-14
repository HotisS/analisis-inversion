// Supuestos numéricos (Cadence, corte 2026-10-14). Base: 2025 real (5.297 M USD). Ejercicio natural.
// Margen EBITDA «limpio»: margen operativo non-GAAP − remuneración en acciones (~8 % de ventas) + depreciación (~2,4 %).
// 2025: 44,6 % − 8,6 % + 2,4 % ≈ 38,4 %. Los costes de adquisición e integración quedan fuera (no recurrentes, estimación propia).
// 2026e casi cerrado por la guía (6.260-6.340 M, +19 %; dos trimestres publicados).
const crec = [19.0, 13.0, 12.0, 11.0, 10.0, 9.0, 8.0, 7.0, 6.0, 5.0];
const margen = [38.5, 39.0, 39.5, 40.0, 40.5, 40.5, 40.5, 40.5, 40.5, 40.5];
const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: i < 4 ? 5.0 : 4.0, // depreciación + amortización de intangibles comprados (Hexagon D&E)
  capex_pct_ventas: i < 9 ? 3.0 : 4.0,
  nwc_pct_ventas: 2.0,
  tasa_impositiva_pct: 18.0,
  fijo: i === 0,
}));

export default {
  anios,
  wacc: { tasa_libre_pct: 5.22, beta: 1.1, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 4.5, tasa_impositiva_pct: 18.0, peso_deuda_pct: 3 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 25 },
  etapa2: { usar: true, anios: 10, margen_final_pct: null },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 10.0, precio_pct: 3.0, otros_pct: 6.0 },
    { periodo: '2027e', volumen_pct: 9.0, precio_pct: 3.0, otros_pct: 1.0 },
    { periodo: '2028e', volumen_pct: 9.0, precio_pct: 3.0, otros_pct: 0.0 },
    { periodo: '2029e', volumen_pct: 8.0, precio_pct: 3.0, otros_pct: 0.0 },
    { periodo: '2030e', volumen_pct: 7.5, precio_pct: 2.5, otros_pct: 0.0 },
  ],
  mercado_final: { periodo: '2035e', tamano: 50200 },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -4.0, ajuste_margen_pp: -2.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 3.0, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 10, transacciones: 0, suma_partes: 0, escenarios: 40 },
};
