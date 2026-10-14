// Supuestos numéricos del analista (Lonza, corte 2026-10-14). Base: 2025 del negocio continuado (6.531 M CHF de ventas, margen CORE EBITDA del 31,6 %).
// 2026e fijo: ventas +8,5 % en francos (guía +11-12 % a tipos constantes; 1S26 +16,0 % a tipos constantes y +11,2 % en francos) y margen del 33,5 % (guía 33-34 %).
// Caso base tras la prueba de sostenibilidad: 2027-2028 al 9,5 % en francos (plan 2024-2028 del 11-13 % a tipos constantes menos ≈2 puntos de divisa; rebajado medio punto), luego baja hasta el 4 % en 2035 y etapa 2 de cinco años hasta el terminal del 1 %.
const crec = [8.5, 9.0, 8.5, 8.0, 7.0, 6.0, 5.0, 4.0, 3.0, 2.0];
const margen = [33.5, 34.5, 35.5, 36.0, 36.0, 36.0, 36.0, 36.0, 36.0, 36.0];
const capex = [17.0, 19.0, 19.0, 18.0, 17.0, 16.0, 15.0, 14.5, 14.0, 13.5];
const amort = [11.0, 11.2, 11.4, 11.6, 11.8, 12.0, 12.2, 12.4, 12.5, 12.5];
const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: 0,
  tasa_impositiva_pct: 16,
  fijo: i === 0,
}));

export default {
  anios,
  wacc: { tasa_libre_pct: 0.54, beta: 1.0, prima_mercado_pct: 5.5, prima_adicional_pct: 1.0, coste_deuda_pct: 2.0, tasa_impositiva_pct: 16, peso_deuda_pct: 8 },
  terminal: { metodo: 'gordon', crecimiento_pct: 1.0, multiplo_salida: 16 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 9.5, precio_pct: 2.0, otros_pct: -3.0 },
    { periodo: '2027e', volumen_pct: 9.0, precio_pct: 2.0, otros_pct: -2.0 },
    { periodo: '2028e', volumen_pct: 8.5, precio_pct: 2.0, otros_pct: -2.0 },
    { periodo: '2029e', volumen_pct: 8.0, precio_pct: 2.0, otros_pct: -2.0 },
    { periodo: '2030e', volumen_pct: 7.0, precio_pct: 2.0, otros_pct: -2.0 },
  ],
  mercado_final: null,
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -4.0, ajuste_margen_pp: -2.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 0.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 3.0, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
  // BPA CORE de 2028e por escenario (ver revision-12m): ventas × (margen − amortización) − 110 M de intereses, impuesto del 16 %, 69,3 M de acciones (70,2 M menos la recompra anunciada de 500 M a ≈570 CHF).
  bpa: { Bajista: 19.0, Base: 23.1, Alcista: 26.1 },
  per_historico: {
    actual: 27.8, mediana_5a: 33.2, minimo_5a: 28.5, media_larga: 33.9,
    excluidos: 'PER al cierre de cada año sobre el CORE EPS publicado (precio de cierre del informe anual ÷ CORE EPS básico) [D6, D7, A1, A12]: 2022 30,7x (453,1 ÷ 14,74); 2023 28,5x (353,7 ÷ 12,40); 2024 40,8x (535,8 ÷ 13,12, negocio continuado); 2025 35,7x (537,8 ÷ 15,08). Excluimos 2021 (60,1x: 761,6 ÷ 12,67, burbuja de los CDMO con el contrato de Moderna y tipos cero). No tenemos 2018-2020, así que la media larga es la de los cuatro años válidos. Actual = 570,20 ÷ 20,5 (nuestro CORE EPS de 2027e).',
  },
};
