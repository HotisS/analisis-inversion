// Supuestos numéricos (KONE, corte 2026-10-18). Base: 2025 (11.245,2 M EUR, EBITDA publicado 1.656,1 M). KONE sola, sin TKE
// (cierre como pronto en el 2T27, sujeto a competencia): riesgo y opción en el texto, no en las cifras.
const NWC = 6.0; // circulante comercial neto de anticipos de 2025 (calc.balance), constante
const crec = [3.0, 4.5, 4.5, 4.5, 4.0, 3.5, 3.0, 3.0, 2.5, 2.5];
// Margen EBITDA publicado (con NIIF 16): 2026e con la guía (EBIT ajustado 12,3-13,0 %) menos ≈0,6 puntos de partidas no
// comparables (costes de la operación TKE); luego mezcla hacia servicio y modernización, techo del 16,5 % (EBIT ≈13,6 %).
const margen = [14.8, 15.6, 16.2, 16.4, 16.5, 16.5, 16.5, 16.5, 16.5, 16.5];
const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: g, margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: 2.85,
  capex_pct_ventas: i < 7 ? 2.7 : 2.9,
  nwc_pct_ventas: NWC,
  tasa_impositiva_pct: 25, fijo: i === 0,
}));
export default {
  anios,
  wacc: { tasa_libre_pct: 3.45, beta: 0.89, prima_mercado_pct: 5.5, prima_adicional_pct: 0.5, coste_deuda_pct: 3.5, tasa_impositiva_pct: 25, peso_deuda_pct: 3 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.3, multiplo_salida: 14 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 1.5, precio_pct: 2.5, otros_pct: -1.0 },
    { periodo: '2027e', volumen_pct: 2.0, precio_pct: 2.5, otros_pct: 0 },
    { periodo: '2028e', volumen_pct: 2.0, precio_pct: 2.5, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 2.0, precio_pct: 2.5, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 1.5, precio_pct: 2.5, otros_pct: 0 },
  ],
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 30, ajuste_crecimiento_pp: -1.5, ajuste_margen_pp: -1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.0, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 20, ajuste_crecimiento_pp: 1.0, ajuste_margen_pp: 0.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 25, transacciones: 0, suma_partes: 0, escenarios: 25 },
};
