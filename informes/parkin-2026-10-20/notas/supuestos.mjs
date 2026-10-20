// Supuestos del DCF, escenarios y pesos de Parkin (corte 2026-10-20). AED, ejercicio natural, NIIF.
// 2026e con el 1S26 publicado (ingresos NIIF ≈ 739 M, +26 %) y la guía revisada de agosto (público 510-550, multas 420-460, abonos
// 280-300, promotores 130-150 M): +12,5 % (≈ 1.472 M) y margen EBITDA del 58,5 % (59,5 % en el 1S26; el 2S lleva más renta variable
// de promotores y el canon al 27,5 %) [A4, A5, A12]. Después: plazas nuevas (convertir parte de las ≈ 392k sin cobrar), promotores
// (Dubai Holding por fases, DAMAC, Emaar) y población (+5-7 % al año), sin subir tarifas ni el precio de los abonos [B1, B2].
// Margen del 58,5 % al 58,0 %: el canon ya está al máximo (27,5 %) y crece la parte de promotores, de menos margen.
// Capex con las altas de derechos de uso (rentas mínimas de promotores: 40 M en 2025): 2026e = 50 de guía + ≈ 35.
const a = (periodo, g, m, am, cx, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: cx, nwc_pct_ventas: 10.0, tasa_impositiva_pct: 9.0, fijo });
export default {
  anios: [
    a('2026e', 12.5, 58.5, 4.8, 5.8, true),
    a('2027e', 6.5, 58.4, 4.6, 4.8),
    a('2028e', 6.5, 58.3, 4.4, 4.6),
    a('2029e', 6.0, 58.2, 4.2, 4.4),
    a('2030e', 5.5, 58.1, 4.1, 4.3),
    a('2031e', 5.0, 58.0, 4.0, 4.2),
    a('2032e', 4.5, 58.0, 3.9, 4.1),
  ],
  // Tasa libre en USD (el AED está anclado a 3,6725): Treasury a 10 años 5,09 % (FRED, 16-oct-2026) + diferencial soberano
  // de Abu Dabi (Aa2) 0,42 % = 5,51 % [D6, D7]. Prima de país 0,64 % + 0,36 % por depender de una sola concesión y de un solo
  // Gobierno = 1,0 % de prima adicional. Beta 0,70 (concesión; la de Yahoo con 2,5 años de historia va de 0,53 semanal a 1,29 mensual).
  // Deuda: préstamo de 1.100 M a EIBOR + 0,80 % (5,1 % en 2025) frente a ≈ 17.300 M de capitalización: peso del 6 %.
  wacc: { tasa_libre_pct: 5.51, beta: 0.70, prima_mercado_pct: 5.5, prima_adicional_pct: 1.0, coste_deuda_pct: 5.1, tasa_impositiva_pct: 9.0, peso_deuda_pct: 6 },
  // Terminal: 2,75 % (inflación en USD + algo de población) en vez del 3 %: la concesión acaba en 2072 y los activos vuelven a la RTA
  // sin pago; una perpetuidad sobrestima ≈ 4 % el valor terminal con un WACC del 10 %, y medio punto menos de crecimiento lo compensa.
  terminal: { metodo: 'gordon', crecimiento_pct: 2.75, multiplo_salida: 18 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -3.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 40, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 40 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 8.0, precio_pct: 4.5, otros_pct: 0 },
    { periodo: '2027e', volumen_pct: 4.5, precio_pct: 2.0, otros_pct: 0 },
    { periodo: '2028e', volumen_pct: 4.5, precio_pct: 2.0, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 4.0, precio_pct: 2.0, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 3.5, precio_pct: 2.0, otros_pct: 0 },
  ],
  // Parkin es el operador exclusivo del aparcamiento público: no hay un «mercado» publicado del que medir la cuota (hueco en B).
  mercado_final: null,
};
