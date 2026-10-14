// Supuestos numéricos (KONE, corte 2026-10-14). Base: 2025 (11.245,2 M EUR). KONE sola, sin TKE (la combinación no cierra
// antes del 2T27 y depende de competencia): se trata como riesgo y opción en el texto, no en las cifras.
// EBITDA publicado con NIIF 16; el motor devuelve al EBITDA las partidas que afectan a la comparabilidad del histórico.
const crec = [2.0, 4.0, 4.5, 4.5, 4.0, 3.5, 3.0, 3.0, 2.5, 2.5];
// Margen EBITDA: 2026e con los costes de la operación con TKE (≈1S26: 58 M); después, el EBIT ajustado sube del 12,2 % de 2025
// hacia el 13,5-13,7 % por la mezcla (servicio y modernización) con 2,85 % de amortización.
const margen = [15.0, 15.6, 16.0, 16.3, 16.5, 16.5, 16.5, 16.5, 16.5, 16.5];
const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: 2.85,
  // Capex del estado de flujos (≈1,4 % de ventas) + altas de derechos de uso (≈1,3 %): 2,7 %; al final, ≥ amortización.
  capex_pct_ventas: i < 7 ? 2.7 : 2.9,
  // Circulante neto de anticipos ≈ 0 (los anticipos de clientes del equipo nuevo financian existencias y cuentas a cobrar).
  nwc_pct_ventas: 0,
  tasa_impositiva_pct: 25,
  fijo: i === 0,
}));

export default {
  anios,
  wacc: { tasa_libre_pct: 2.95, beta: 0.85, prima_mercado_pct: 5.5, prima_adicional_pct: 0.5, coste_deuda_pct: 3.5, tasa_impositiva_pct: 25, peso_deuda_pct: 5 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.3, multiplo_salida: 14 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  mitad_de_anio: true,
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 1.5, precio_pct: 2.5, otros_pct: -2.0 },
    { periodo: '2027e', volumen_pct: 1.5, precio_pct: 2.5, otros_pct: 0 },
    { periodo: '2028e', volumen_pct: 2.0, precio_pct: 2.5, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 2.0, precio_pct: 2.5, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 1.5, precio_pct: 2.5, otros_pct: 0 },
  ],
  mercado_final: null,
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 30, ajuste_crecimiento_pp: -1.5, ajuste_margen_pp: -1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.0, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 20, ajuste_crecimiento_pp: 1.0, ajuste_margen_pp: 0.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 25, transacciones: 0, suma_partes: 0, escenarios: 25 },
};
