// Supuestos del DCF, escenarios y pesos de Lockheed Martin (corte 2026-10-15). USD, US GAAP, ejercicio natural.
// EBITDA = beneficio operativo consolidado (con el ajuste FAS/CAS de pensiones, que es caja que paga el Gobierno) + amortizaciones.
// 2026e fijo: guía de julio (ventas 79.750-81.750; beneficio operativo 9.495-9.695; capex 2.000-2.400).
// Sin Ultra Maritime (no cerrada; 3.450 M): ni sus ventas ni su deuda.
const a = (periodo, g, m, am, cx, t, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: cx, nwc_pct_ventas: 7.5, tasa_impositiva_pct: t, fijo });
export default {
  anios: [
    a('2026e', 7.6, 13.9, 2.1, 2.7, 16.5, true),
    a('2027e', 5.5, 13.9, 2.1, 3.0, 17.0),
    a('2028e', 5.5, 13.9, 2.2, 3.0, 17.0),
    a('2029e', 5.0, 13.8, 2.3, 2.8, 17.5),
    a('2030e', 4.5, 13.8, 2.4, 2.7, 18.0),
    a('2031e', 4.0, 13.8, 2.5, 2.6, 18.0),
    a('2032e', 3.5, 13.7, 2.5, 2.6, 18.0),
    a('2033e', 3.0, 13.7, 2.5, 2.6, 18.0),
  ],
  // Beta 0,80: entre la sectorial de Damodaran reapalancada (0,87 desapalancada corregida por caja → ≈ 1,0 con D/E del 20 %) y la
  // semanal ajustada de 5 años (0,55); la regresión mensual (0,11) no sirve. Deuda = bonos + pensiones (24.469 M) sobre 145.156 M.
  wacc: { tasa_libre_pct: 5.21, beta: 0.8, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.0, tasa_impositiva_pct: 21.0, peso_deuda_pct: 17.0 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 12 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -1.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.0, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 0.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 6.6, precio_pct: 1.0, otros_pct: 0.0 },
    { periodo: '2027e', volumen_pct: 4.5, precio_pct: 1.0, otros_pct: 0.0 },
    { periodo: '2028e', volumen_pct: 4.5, precio_pct: 1.0, otros_pct: 0.0 },
    { periodo: '2029e', volumen_pct: 4.0, precio_pct: 1.0, otros_pct: 0.0 },
    { periodo: '2030e', volumen_pct: 3.5, precio_pct: 1.0, otros_pct: 0.0 },
  ],
  mercado_final: null,
  // BPA 2028e (US GAAP, sin pérdidas extraordinarias de programas ni liquidaciones de pensiones, sin recompras):
  // ventas × margen EBITDA − amortización − resultado financiero (−1.250 M: intereses ≈ 1.070, pensiones no operativas ≈ −300,
  // otros +120) − impuesto del 17 %, ÷ 231,5 M acciones (231,1 hoy + dilución por pagos en acciones).
  // Base: 89.876 × 13,9 % − 1.977 − 1.250 = 9.266 → 7.691 → 33,22. Bajista: 86.504 × 12,9 % − 1.903 − 1.250 → 28,70. Alcista: 92.451 × 14,4 % − 2.034 − 1.250 → 35,96.
  // 2027e (para el PER actual): 85.191 × 13,9 % − 1.789 − 1.250 = 8.803 → 7.306 / 231,3 = 31,59 → 522,23 / 31,59 = 16,5x.
  bpa_12m: { Bajista: 28.7, Base: 33.22, Alcista: 35.96 },
};
