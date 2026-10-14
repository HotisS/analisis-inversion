// Supuestos numéricos (Sectra, corte 2026-10-14). Base: FY2026 (may-2025 a abr-2026), ventas de 3.541,7 M SEK.
// Margen EBITDA con amortizaciones estimadas al 2,7 % de las ventas (FY2026: 22,8 %).
const crec = [17, 13, 10, 8, 7, 6, 5, 4.5, 4, 3.5]; // rebajado para pasar la prueba de cuota (ver justificación)
const margen = [24.5, 25.5, 26.5, 27.5, 28, 28.5, 29, 29, 29, 29];
const anios = crec.map((g, i) => ({
  periodo: `FY${2027 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: 2.7,
  capex_pct_ventas: i < 7 ? 2.5 : 2.7,
  nwc_pct_ventas: 0,
  tasa_impositiva_pct: 21.5,
  fijo: false,
}));

export default {
  anios,
  wacc: { tasa_libre_pct: 3.0, beta: 1.0, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 4.0, tasa_impositiva_pct: 21.5, peso_deuda_pct: 0 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 30 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  mitad_de_anio: true,
  puente_ingresos: [
    { periodo: 'FY2027e', volumen_pct: 9, precio_pct: 3, otros_pct: 5 },
    { periodo: 'FY2028e', volumen_pct: 7, precio_pct: 3, otros_pct: 3 },
    { periodo: 'FY2029e', volumen_pct: 6, precio_pct: 3, otros_pct: 1 },
    { periodo: 'FY2030e', volumen_pct: 5, precio_pct: 3, otros_pct: 0 },
    { periodo: 'FY2031e', volumen_pct: 4, precio_pct: 3, otros_pct: 0 },
  ],
  // La cuota publicada no existe: mercado_final en null y la prueba de cuota a mano (ver justificación).
  mercado_final: null,
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -5, ajuste_margen_pp: -3, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 3, ajuste_margen_pp: 2, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 25, transacciones: 0, suma_partes: 0, escenarios: 25 },
};
