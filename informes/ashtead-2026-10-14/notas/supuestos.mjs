// Supuestos numéricos (Sunbelt Rentals / Ashtead, corte 2026-10-14). Base: FY2026 en US GAAP (ingresos 11.154 M USD;
// EBITDA contable 4.497 M + 134 M no recurrentes = 4.631 M, 41,5 %). Ejercicio a 30 de abril, etiquetado por el año en que termina.
const crec = [7.5, 4.0, 3.5, 3.5, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0];
const margen = [41.9, 42.5, 43.0, 43.0, 43.0, 43.0, 42.8, 42.6, 42.5, 42.5];
// Capex: inversión neta de ventas de flota usada + compras complementarias (FY2027e: guía bruta 2.950 M − ≈500 M de ventas + 669 M de compras).
const capex = [28.5, 27.0, 26.5, 26.0, 26.0, 25.5, 25.0, 25.0, 24.5, 24.5];
const anios = crec.map((g, i) => ({
  periodo: `FY${2027 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: 20.5,
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: 0,
  tasa_impositiva_pct: 25.5,
  fijo: false,
}));

export default {
  anios,
  wacc: { tasa_libre_pct: 5.22, beta: 1.31, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.5, tasa_impositiva_pct: 25.5, peso_deuda_pct: 22 },
  terminal: { metodo: 'media', crecimiento_pct: 3.0, multiplo_salida: 8.5 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: 'FY2027e', volumen_pct: 3.0, precio_pct: 1.5, otros_pct: 3.0 },
    { periodo: 'FY2028e', volumen_pct: 1.5, precio_pct: 1.5, otros_pct: 1.0 },
    { periodo: 'FY2029e', volumen_pct: 1.5, precio_pct: 1.5, otros_pct: 0.5 },
    { periodo: 'FY2030e', volumen_pct: 1.5, precio_pct: 1.5, otros_pct: 0.5 },
    { periodo: 'FY2031e', volumen_pct: 1.0, precio_pct: 1.5, otros_pct: 0.5 },
  ],
  mercado_final: { periodo: 'FY2036e', tamano: 110000 },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: 7.5, perfil: [{ periodo: 'FY2028e', crecimiento_pp: -8, margen_pp: -3.5 }] },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: 9.5 },
  ],
  pesos: { dcf: 50, comparables: 0, transacciones: 0, suma_partes: 0, escenarios: 50 },
};
