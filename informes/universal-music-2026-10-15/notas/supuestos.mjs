// Supuestos del DCF, escenarios y pesos de Universal Music Group (corte 2026-10-15). Ejercicio natural, EUR, NIIF-UE.
// EBITDA del informe = EBIT + amortizaciones (con la de catálogos y derechos de uso), con los pagos en acciones dentro
// y la reestructuración fuera: 20,7 % en 2025 (el ajustado de la empresa, sin pagos en acciones, 22,5 %).
// Capex = inmovilizado + software + inversión en catálogos + altas de derechos de uso (≈ 4,9 % de las ventas).
// Circulante = existencias + clientes + anticipos de regalías − regalías y cuentas a pagar: −1,8 % de las ventas en 2025.
const a = (periodo, g, m, am, cx, nwc, t = 26, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: cx, nwc_pct_ventas: nwc, tasa_impositiva_pct: t, fijo });
export default {
  anios: [
    a('2026e', 7.0, 19.6, 3.7, 4.9, -1.8, 26, true),
    a('2027e', 6.5, 20.6, 3.7, 4.8, -1.8),
    a('2028e', 6.5, 21.3, 3.8, 4.7, -1.8),
    a('2029e', 6.0, 21.7, 3.8, 4.6, -1.8),
    a('2030e', 5.5, 21.9, 3.9, 4.5, -1.8),
    a('2031e', 4.5, 22.0, 3.9, 4.4, -1.8),
    a('2032e', 3.5, 22.0, 4.0, 4.3, -1.8),
  ],
  wacc: { tasa_libre_pct: 3.51, beta: 1.0, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 3.6, tasa_impositiva_pct: 25.8, peso_deuda_pct: 15 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 12 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.5, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 0.7, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 3.0, precio_pct: 3.0, otros_pct: 1.0 },
    { periodo: '2027e', volumen_pct: 3.5, precio_pct: 3.0, otros_pct: 0 },
    { periodo: '2028e', volumen_pct: 3.5, precio_pct: 3.0, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 3.0, precio_pct: 3.0, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 2.5, precio_pct: 3.0, otros_pct: 0 },
  ],
  mercado_final: null,
  // BPA ajustado 2028e (cálculo en revision-12m): ventas × margen EBITDA ajustado (sin pagos en acciones)
  // − amortización sin catálogos − intereses − impuestos (25,5 %) − minoritarios, ÷ 1.818 M acciones (1.798 + dilución del plan).
  bpa_12m: { Bajista: 1.07, Base: 1.23, Alcista: 1.31 },
  bpa_2026e: 0.99, bpa_2027e: 1.11,
};
