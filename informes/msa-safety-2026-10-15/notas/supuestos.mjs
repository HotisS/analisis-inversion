// Supuestos del DCF, escenarios y pesos de MSA Safety (corte 2026-10-15). USD, ejercicio natural, US GAAP.
// 2026e fijo: dos trimestres publicados (967 M de ventas en el 1S26) y guía de ventas totales de «dos cifras bajas»
// (orgánico de un dígito medio + compras de un dígito medio + divisa 1-2 puntos), con Autronica desde el 9-jul-2026.
// Margen EBITDA publicado (US GAAP, después de diferencias de cambio, reestructuración y costes de compras): 2025 23,7 %;
// LTM jun-26 25,1 %; EBITDA ajustado de la empresa 25,2 % (2025) y 26,1 % (1S26). Usamos 25,0 % en 2026 (Autronica a ≈20 %,
// costes de integración y la devolución de aranceles que no se repite) y 25,6-26,0 % después.
// Amortización: 3,8 % en 2025 (71,6 M, con 12,6 M de intangibles comprados); sube al 4,1-4,2 % con los intangibles de Autronica.
// Capex: 3,6 % en 2025, 2,4 % en el 1S26; 3,2 % en 2026 subiendo al 3,8 % (igual a la amortización al final).
// Circulante comercial: 28,7 % de las ventas en 2025 (existencias 343 + clientes 307 − proveedores 111); 28 %.
const a = (periodo, g, m, am, cx, fijo = false, tax = 24) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: cx, nwc_pct_ventas: 28, tasa_impositiva_pct: tax, fijo });
export default {
  anios: [
    a('2026e', 11.3, 25.0, 4.1, 3.2, true, 23.5),
    a('2027e', 8.5, 25.6, 4.2, 3.5),
    a('2028e', 5.5, 26.0, 4.0, 3.6),
    a('2029e', 5.0, 26.0, 3.9, 3.7),
    a('2030e', 4.5, 26.0, 3.8, 3.8),
    a('2031e', 4.0, 26.0, 3.8, 3.8),
    a('2032e', 3.5, 26.0, 3.8, 3.8),
  ],
  wacc: { tasa_libre_pct: 5.21, beta: 0.92, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.0, tasa_impositiva_pct: 24, peso_deuda_pct: 12 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 14 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -2.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 40, comparables: 30, transacciones: 0, suma_partes: 0, escenarios: 30 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 2.0, precio_pct: 3.0, otros_pct: 6.3 },
    { periodo: '2027e', volumen_pct: 2.5, precio_pct: 2.5, otros_pct: 3.5 },
    { periodo: '2028e', volumen_pct: 2.5, precio_pct: 3.0, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 2.0, precio_pct: 3.0, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 1.5, precio_pct: 3.0, otros_pct: 0 },
  ],
  mercado_final: null,
};
