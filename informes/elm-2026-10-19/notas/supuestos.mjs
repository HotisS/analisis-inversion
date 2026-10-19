// Supuestos del DCF, escenarios y pesos de Elm Company (corte 2026-10-19). SAR, ejercicio natural, NIIF (SOCPA).
// 2026e con el 1S26 publicado (ingresos de 4.997 M, +21 %, con cuatro meses más de Thiqah que el 1S25) y la guía de la
// empresa (+17-19 %): +15 %, por debajo de la guía porque el segundo semestre ya compara con Thiqah consolidada y el
// crecimiento orgánico del 2T26 fue de ≈ 7 % con adjudicaciones de proyectos más lentas [A5, A9, D14].
// Después el crecimiento orgánico baja del 9 % al 4,5 % en 2032e (mercado de servicios de TI saudí al 6,9 % según IMARC).
// Margen EBITDA del 24,5 % en 2026e (24,1 % en 2025, 26,1 % en el 1S26 con la plusvalía de Sahel) que baja poco a poco
// al 23,8 % por la mezcla (Thiqah y proyectos, de menos margen) y la presión de la IA sobre la externalización.
const a = (periodo, g, m, am, cx, tx, nwc, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: cx, nwc_pct_ventas: nwc, tasa_impositiva_pct: tx, fijo });
export default {
  anios: [
    a('2026e', 15.0, 24.5, 3.2, 3.5, 6.0, 9.0, true),
    a('2027e', 9.0, 24.4, 3.2, 3.5, 6.0, 9.0),
    a('2028e', 8.5, 24.3, 3.2, 3.4, 6.0, 9.0),
    a('2029e', 7.5, 24.2, 3.2, 3.4, 6.0, 9.0),
    a('2030e', 6.5, 24.0, 3.2, 3.3, 6.0, 9.0),
    a('2031e', 5.5, 23.9, 3.2, 3.3, 6.0, 9.0),
    a('2032e', 4.5, 23.8, 3.2, 3.3, 6.0, 9.0),
  ],
  // Tasa libre en USD (el SAR está anclado a 3,75 por USD): Treasury a 10 años 5,10 % (FRED, 15-oct-2026) + diferencial soberano
  // de Arabia Saudí 0,51 % (Damodaran, Aa3) = 5,61 %. Prima de país 0,78 % (Damodaran) como prima adicional.
  // Deuda: préstamo de SNB para Thiqah (1.535,7 M a jun-26) frente a una capitalización de ≈ 42.700 M: peso del 5 %.
  wacc: { tasa_libre_pct: 5.61, beta: 1.05, prima_mercado_pct: 5.5, prima_adicional_pct: 0.78, coste_deuda_pct: 5.8, tasa_impositiva_pct: 6.0, peso_deuda_pct: 5 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 14 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -4.0, ajuste_margen_pp: -3.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 3.0, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 40, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 40 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 9.5, precio_pct: 0, otros_pct: 5.5 },
    { periodo: '2027e', volumen_pct: 8.0, precio_pct: 1.0, otros_pct: 0 },
    { periodo: '2028e', volumen_pct: 7.5, precio_pct: 1.0, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 6.5, precio_pct: 1.0, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 5.5, precio_pct: 1.0, otros_pct: 0 },
  ],
  // Mercado final: servicios de TI de Arabia Saudí según IMARC (12.090 M USD = 45.338 M SAR en 2025, +6,91 % anual), llevado a 2032e
  // al mismo ritmo [B2]. Perímetro aproximado: incluye proyectos, externalización y servicios gestionados; las tasas de las plataformas
  // de Elm (Absher, Muqeem) no tienen un mercado medido aparte.
  mercado_final: { periodo: '2032e', tamano: 72300 },
};
