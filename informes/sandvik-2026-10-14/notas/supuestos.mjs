// Supuestos del DCF, escenarios y pesos de Sandvik (corte 2026-10-14). Ejercicio natural, SEK.
// Capex = inmovilizado + intangibles netos de ventas (2,8 % de las ventas en 2025) + inversión neta en equipos de alquiler (0,6 %)
// + altas de derechos de uso (≈1,2 %) = ≈4,6 %; desde 2027 se suma ≈1,5 % de las ventas en compras de empresas (1 punto de crecimiento al año).
// Circulante (definición de Sandvik, existencias + clientes + otros − proveedores − otros) = 27,5 % de las ventas en jun-26 (R12).
const a = (periodo, g, m, cx, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: 5.6, capex_pct_ventas: cx, nwc_pct_ventas: 34, tasa_impositiva_pct: 24, fijo });
export default {
  anios: [
    a('2026e', 16.0, 24.6, 4.6, true),
    a('2027e', 6.0, 24.6, 6.1),
    a('2028e', 4.0, 24.6, 6.1),
    a('2029e', 4.0, 24.4, 6.0),
    a('2030e', 3.5, 24.2, 5.8),
    a('2031e', 3.0, 24.0, 5.6),
    a('2032e', 3.0, 24.0, 5.6),
  ],
  wacc: { tasa_libre_pct: 3.17, beta: 1.30, prima_mercado_pct: 5.5, prima_adicional_pct: 0.5, coste_deuda_pct: 4.0, tasa_impositiva_pct: 24, peso_deuda_pct: 8 },
  terminal: { metodo: 'media', crecimiento_pct: 2.5, multiplo_salida: 12 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    // Bajista: recesión industrial y caída de la inversión minera a la vez (2019-2020: ingresos −11 % orgánico, EBITA ajustado del 17 %).
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -1.0, ajuste_margen_pp: -1.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: null, multiplo_salida: null,
      perfil: [{ periodo: '2027e', crecimiento_pp: -4, margen_pp: -1.0 }, { periodo: '2028e', crecimiento_pp: -14, margen_pp: -3.2 }, { periodo: '2029e', crecimiento_pp: 2, margen_pp: -2.0 }] },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 0.8, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 40, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 40 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 12.0, precio_pct: 6.0, otros_pct: -2.0 },
    { periodo: '2027e', volumen_pct: 2.5, precio_pct: 2.5, otros_pct: 1.0 },
    { periodo: '2028e', volumen_pct: 0.5, precio_pct: 2.5, otros_pct: 1.0 },
    { periodo: '2029e', volumen_pct: 0.5, precio_pct: 2.5, otros_pct: 1.0 },
    { periodo: '2030e', volumen_pct: 0.0, precio_pct: 2.5, otros_pct: 1.0 },
  ],
  mercado_final: null,
};
