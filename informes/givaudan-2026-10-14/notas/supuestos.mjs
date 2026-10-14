// Supuestos numéricos del analista (Givaudan, corte 2026-10-14). Base: 2025 (7.472 M CHF de ventas, margen EBITDA publicado del 23,4 %, comparable del 24,2 %).
// 2026e fijo: ventas +2,5 % en francos (nueve meses +2,6 %), margen EBITDA recurrente del 23,8 % (1S26 ajustado 24,3 %, sin los 103 M de no recurrentes).
// Después, crecimiento en francos del 3,5 % (objetivo comparable del 4-6 % menos ≈1-1,5 puntos de divisa; caso base rebajado desde el 4,5 % por la prueba de sostenibilidad) que baja hacia el terminal del 1 %.
const crec = [2.5, 3.5, 3.5, 3.5, 3.5, 3.0, 2.5, 2.0, 1.5, 1.0];
const margen = [23.8, 24.0, 24.2, 24.4, 24.5, 24.5, 24.5, 24.5, 24.5, 24.5];
const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: 4.9,
  capex_pct_ventas: i < 2 ? 4.2 : 3.9,
  nwc_pct_ventas: 21.6,
  tasa_impositiva_pct: 15,
  fijo: i === 0,
}));

export default {
  anios,
  wacc: { tasa_libre_pct: 0.54, beta: 0.75, prima_mercado_pct: 5.5, prima_adicional_pct: 1.0, coste_deuda_pct: 2.0, tasa_impositiva_pct: 15, peso_deuda_pct: 12 },
  terminal: { metodo: 'gordon', crecimiento_pct: 1.0, multiplo_salida: 15 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  mitad_de_anio: true,
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 3.5, precio_pct: 1.5, otros_pct: -2.5 },
    { periodo: '2027e', volumen_pct: 3.0, precio_pct: 1.5, otros_pct: -1.0 },
    { periodo: '2028e', volumen_pct: 3.0, precio_pct: 1.5, otros_pct: -1.0 },
    { periodo: '2029e', volumen_pct: 3.0, precio_pct: 1.5, otros_pct: -1.0 },
    { periodo: '2030e', volumen_pct: 3.0, precio_pct: 1.5, otros_pct: -1.0 },
  ],
  // Mercado de IAL Consultants (43.070 M USD en 2025, +4,2 %) a 0,80 CHF/USD = ≈34.500 M CHF; en 2030 al 4 % anual en francos ≈ 42.000 M.
  mercado_final: { periodo: '2030e', tamano: 42000 },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 0.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
  // BPA de 2028e por escenario (ver revision-12m): ventas × (margen EBITDA − 4,9 % de amortización) − 150 M de resultado financiero, impuesto del 15 %, 9,226 M de acciones.
  bpa: { Bajista: 115.6, Base: 132.1, Alcista: 144.1 },
  per_historico: {
    actual: 29.5, mediana_5a: 32.2, minimo_5a: 27.1, media_larga: 31.9,
    excluidos: 'PER al cierre de cada año sobre el BPA publicado (MarketScreener) [D2]; el BPA publicado de Givaudan apenas difiere del recurrente que usamos en los escenarios (2025: 115,5 publicado frente a ≈114 con nuestra fórmula), así que la base es la misma. Excluimos 2020 (46,6x) y 2021 (54,2x): múltiplos de burbuja de tipos cero, cuando los defensivos de calidad cotizaban a 45-55x. Quedan 2022 30,6x; 2023 36,1x; 2024 33,7x; 2025 27,1x. No tenemos 2018-2019, así que la media larga (31,9x) es la de esos cuatro años. Actual = 3.714 ÷ 125,7 (nuestro BPA de 2027e) = 29,5x.',
  },
};
