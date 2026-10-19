// Supuestos del DCF, escenarios y pesos de Saudi Azm (corte 2026-10-19). SAR, ejercicio a 30 de junio, NIIF (SOCPA). Millones de SAR.
// Base: FY2026 real (ventas 307,36 M; EBITDA 52,9 M, 17,2 %). FY2027e +22 %: el 4T26 facturó 87,0 M (348 M anualizado, +13 % sobre
// FY2026 sin crecer más), la cartera supera los 300 M y entran el contrato del Ministerio de Recursos Humanos (> 12,7 M) y la alianza
// con Elm [A9, D9, B6, B5]. Después, del 18 % al 8 % en FY2032e: el mercado crece ≈ 7 % (IMARC) y Azm gana cuota desde ≈ 0,7 % [B1].
// Margen EBITDA (después de pagos en acciones, ≈ 5 % de las ventas) del 19 % en FY2027e-FY2028e (17,2 % en FY2026; 21 % en el 4T26)
// que baja al 17 % en FY2032e: la IA y la competencia de las grandes estatales aprietan precios al renovar contratos [B1, B5].
// Amortización del 2,5 % al 3,5 %: empiezan a amortizarse las plataformas capitalizadas (29,1 M de intangibles en FY2026) [A10].
// Capex (inmovilizado + intangibles + altas de derechos de uso) del 7 % en FY2027e (10,2 % en FY2026, 4,8 % en FY2025) al 4,5 % [A10, A1].
// Circulante (clientes + activos de contrato − proveedores y devengos − anticipos) del −7,8 % de las ventas en FY2026 (−15,6 % en FY2025,
// +7,3 % en FY2024): los anticipos de clientes no son permanentes, así que converge a 0 en FY2030e (consume caja) [A10, A1, A2].
// Zakat del 6,5 % (6,1 % en FY2026, 4,3 % en FY2025, 9,2 % en FY2024) [A9, A1, A2].
const a = (periodo, g, m, am, cx, tx, nwc, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: cx, nwc_pct_ventas: nwc, tasa_impositiva_pct: tx, fijo });
export default {
  anios: [
    a('FY2027e', 22.0, 19.0, 2.5, 7.0, 6.5, -5.0),
    a('FY2028e', 18.0, 19.0, 3.0, 6.0, 6.5, -3.0),
    a('FY2029e', 15.0, 18.5, 3.5, 5.0, 6.5, -1.5),
    a('FY2030e', 12.0, 18.0, 3.5, 4.5, 6.5, 0),
    a('FY2031e', 10.0, 17.5, 3.5, 4.5, 6.5, 0),
    a('FY2032e', 8.0, 17.0, 3.5, 4.5, 6.5, 0),
  ],
  // Tasa libre en USD (SAR anclado a 3,75): Treasury a 10 años 5,10 % (FRED, 15-oct-2026) + diferencial soberano 0,51 % = 5,61 % [D4, D5].
  // Beta 0,90: la medida contra el ETF KSA es 0,52 (mensual, 5 años) y 0,71 (semanal, 2 años); Argaam da 0,89 [D1, D2]. La del sector de
  // servicios informáticos es ≈ 1,0-1,1; el ETF KSA tiene poco peso tecnológico y la acción poca liquidez, que baja la beta medida.
  // Prima adicional = país 0,78 % (Damodaran) + 1,5 % por tamaño y liquidez (≈ 460 M USD; ≈ 1,4 M USD al día) [D5, D1].
  // Deuda: 28 M (préstamos y arrendamientos) sobre 1.771 M de capitalización: peso del 2 % al 6,5 %.
  wacc: { tasa_libre_pct: 5.61, beta: 0.9, prima_mercado_pct: 5.5, prima_adicional_pct: 2.28, coste_deuda_pct: 6.5, tasa_impositiva_pct: 6.5, peso_deuda_pct: 2 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 11 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -8.0, ajuste_margen_pp: -3.0, ajuste_wacc_pp: 1.0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 5.0, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 40, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 40 },
  puente_ingresos: [
    { periodo: 'FY2027e', volumen_pct: 20.0, precio_pct: 0, otros_pct: 2.0 },
    { periodo: 'FY2028e', volumen_pct: 17.0, precio_pct: 0, otros_pct: 1.0 },
    { periodo: 'FY2029e', volumen_pct: 15.0, precio_pct: 0, otros_pct: 0 },
    { periodo: 'FY2030e', volumen_pct: 12.0, precio_pct: 0, otros_pct: 0 },
    { periodo: 'FY2031e', volumen_pct: 10.0, precio_pct: 0, otros_pct: 0 },
  ],
  // Mercado final: servicios informáticos de Arabia Saudí (IMARC) 12.091,5 M USD en 2025 × 3,75 = 45.343 M SAR, al 6,91 % anual hasta
  // FY2032e (≈ 2032): 45.343 × 1,0691^7 ≈ 72.400 M SAR [B1].
  mercado_final: { periodo: 'FY2032e', tamano: 72400 },
};
