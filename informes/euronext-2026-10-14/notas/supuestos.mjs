// Supuestos del DCF, escenarios y pesos de Euronext (corte 2026-10-14). EUR, ejercicio natural.
// Ingresos = «revenue and income» publicados (incluye el resultado de tesorería de la cámara).
// Amortización sin la de intangibles de compras (PPA, ≈ 95 M al año, no es caja y no da ahorro fiscal real);
// capex = software y equipos (4-6 % de los ingresos según el plan) + altas de derechos de uso (≈ 1 %).
const a = (periodo, g, m, fijo = false, am = 6.0, cx = 6.5) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: cx, nwc_pct_ventas: -16.0, tasa_impositiva_pct: 26.5, fijo });
export default {
  anios: [
    a('2026e', 13.3, 62.6, true),
    a('2027e', 6.0, 63.0),
    a('2028e', 6.0, 63.3),
    a('2029e', 5.5, 63.5),
    a('2030e', 5.0, 63.5),
    a('2031e', 4.0, 63.5, false, 6.0, 6.3),
    a('2032e', 3.5, 63.5, false, 6.0, 6.3),
  ],
  wacc: { tasa_libre_pct: 3.53, beta: 0.85, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 3.5, tasa_impositiva_pct: 26.5, peso_deuda_pct: 15 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 15 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.5, ajuste_margen_pp: -2.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 40, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 40 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 4.5, precio_pct: 1.5, otros_pct: 7.3 },
    { periodo: '2027e', volumen_pct: 4.0, precio_pct: 1.5, otros_pct: 0.5 },
    { periodo: '2028e', volumen_pct: 4.5, precio_pct: 1.5, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 4.0, precio_pct: 1.5, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 3.5, precio_pct: 1.5, otros_pct: 0 },
  ],
  mercado_final: null,
};
