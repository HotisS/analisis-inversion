// Supuestos del DCF, escenarios y pesos de Almawarid (corte 2026-10-19). SAR, ejercicio natural, NIIF (SOCPA). Millones de SAR.
// 2026e con el 1S26 publicado (ventas de 1.541,7 M, +27 %) y un 2S26 que crece ≈ 17 % sobre el 2S25 (1.398 M): los trimestres
// crecen ≈ 3-4 % sobre el anterior (758 M en el 1T26 y 783 M en el 2T26) → +21 % en el año (≈ 3.159 M) [A1, A5].
// 2027e +13 % y después del 10 % al 5 % en 2032e: la plantilla cedida crece por encima del mercado (cuota de las cotizadas al alza),
// pero el segmento de empresas depende de la construcción (46 % de las ventas del 1S26), que ya está plana [A1, B1].
// Margen EBITDA (con NIIF 16) del 8,3 % en 2026e (8,5 % en el 1S26, 7,2 % en 2025, 7,9 % en doce meses) que baja poco a poco al
// 7,6 % en 2032e por la competencia en particulares (721 oficinas en Musaned) y el peso creciente de empresas, de margen fino [A1, B2].
// Amortización del 1,1 % (derechos de uso de alojamientos y sucursales: 16,6 M en el 1S26) y capex del 1,2 % con las altas de
// derechos de uso (20,3 M en el 1S26; inmovilizado propio < 0,1 % de las ventas): con los arrendamientos en la deuda, el capex debe
// pagar los alquileres [A1]. Circulante (clientes + activos de contrato − proveedores − pasivos de contrato) del 7,5 % de las ventas:
// 6,4 % a dic-2025 y 8,9 % a jun-2026 (estacional, cobros de fin de año) [A1, A7]. Zakat del 7 % (7,2 % en 2025, 6,6 % en el 1S26) [A6, A1].
const a = (periodo, g, m, am, cx, tx, nwc, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: cx, nwc_pct_ventas: nwc, tasa_impositiva_pct: tx, fijo });
export default {
  anios: [
    a('2026e', 21.0, 8.3, 1.1, 1.2, 7.0, 7.5, true),
    a('2027e', 13.0, 8.2, 1.1, 1.2, 7.0, 7.5),
    a('2028e', 10.0, 8.0, 1.1, 1.2, 7.0, 7.5),
    a('2029e', 8.0, 7.9, 1.1, 1.2, 7.0, 7.5),
    a('2030e', 7.0, 7.8, 1.1, 1.2, 7.0, 7.5),
    a('2031e', 6.0, 7.7, 1.1, 1.15, 7.0, 7.5),
    a('2032e', 5.0, 7.6, 1.1, 1.15, 7.0, 7.5),
  ],
  // Tasa libre en USD (SAR anclado a 3,75): Treasury a 10 años 5,10 % (FRED, 15-oct-2026) + diferencial soberano 0,51 % = 5,61 % [D4, D6].
  // Beta 0,95: la medida contra el ETF KSA es 0,94 (diaria, 2 años), 0,85 semanal y 0,96 ajustada [D1]; la del sector de trabajo
  // temporal en mercados desarrollados es ≈ 1,0-1,2, pero aquí el ciclo es el gasto público saudí, que ya recoge el mercado local.
  // Prima adicional = país 0,78 % (Damodaran) + 1,0 % por tamaño y liquidez (≈ 470 M USD; ≈ 7 M SAR al día) [D6, D1].
  // Sin deuda financiera: peso de la deuda del 4 % (arrendamientos de 66 M sobre 1.756 M de capitalización) al 6 %.
  wacc: { tasa_libre_pct: 5.61, beta: 0.95, prima_mercado_pct: 5.5, prima_adicional_pct: 1.78, coste_deuda_pct: 6.0, tasa_impositiva_pct: 7.0, peso_deuda_pct: 4 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 8 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -5.0, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 3.0, ajuste_margen_pp: 0.7, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 40, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 40 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 17.0, precio_pct: 2.0, otros_pct: 2.0 },
    { periodo: '2027e', volumen_pct: 10.0, precio_pct: 2.0, otros_pct: 1.0 },
    { periodo: '2028e', volumen_pct: 8.0, precio_pct: 2.0, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 6.0, precio_pct: 2.0, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 5.0, precio_pct: 2.0, otros_pct: 0 },
  ],
  // Mercado final: sin cifra fiable (los estudios miden comisiones, no la facturación con sueldos) [B1]: la prueba de cuota se hace a
  // mano con las cotizadas (≈ 30 % de lo que facturan las cuatro, 9.700 M SAR) en la justificación de la sostenibilidad.
  mercado_final: null,
};
