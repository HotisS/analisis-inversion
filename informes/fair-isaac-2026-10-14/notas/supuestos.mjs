// Supuestos numéricos (FICO, corte 2026-10-14). Base: FY2025 real (1.990,9 M USD). FY2026e cerrado el 30-sep, sin publicar: guía de jul-2026 (fijo).
const crec = [27.1, -4.0, 4.0, 7.0, 7.0, 6.0, 5.5, 5.0, 4.5, 4.0];
const margen = [52.0, 50.0, 51.0, 52.0, 52.0, 52.0, 52.0, 52.0, 52.0, 52.0];
const anios = crec.map((g, i) => ({
  periodo: `FY${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: 0.8,
  capex_pct_ventas: i === 0 ? 1.5 : 1.2,
  nwc_pct_ventas: 26,
  tasa_impositiva_pct: 22,
  fijo: i === 0,
}));
export default {
  anios,
  wacc: { tasa_libre_pct: 5.22, beta: 1.2, prima_mercado_pct: 5.5, prima_adicional_pct: 0.5, coste_deuda_pct: 5.4, tasa_impositiva_pct: 22, peso_deuda_pct: 25 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 14 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: 'FY2026e', volumen_pct: 2.0, precio_pct: 24.0, otros_pct: 1.1 },
    { periodo: 'FY2027e', volumen_pct: 1.0, precio_pct: -6.0, otros_pct: 1.0 },
    { periodo: 'FY2028e', volumen_pct: 2.0, precio_pct: 1.0, otros_pct: 1.0 },
    { periodo: 'FY2029e', volumen_pct: 3.0, precio_pct: 3.0, otros_pct: 1.0 },
    { periodo: 'FY2030e', volumen_pct: 3.0, precio_pct: 3.0, otros_pct: 1.0 },
  ],
  mercado_final: null,
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 30, ajuste_crecimiento_pp: -1.0, ajuste_margen_pp: -4.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.5, multiplo_salida: null,
      perfil: [{ periodo: 'FY2027e', crecimiento_pp: -12.0, margen_pp: -6.0 }] },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 20, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 2.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null,
      perfil: [{ periodo: 'FY2027e', crecimiento_pp: 6.0, margen_pp: 2.0 }] },
  ],
  pesos: { dcf: 50, comparables: 25, transacciones: 0, suma_partes: 0, escenarios: 25 },
};
