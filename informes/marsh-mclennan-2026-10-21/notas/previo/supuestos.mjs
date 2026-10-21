// Supuestos del DCF, escenarios y pesos de Marsh (MRSH), corte 2026-10-14. USD, ejercicio natural, US GAAP.
// Margen EBITDA en base publicada (incluye reestructuración e integración recurrentes; 2026e sin el cargo de Greensill, que va al puente).
// Amortización = inmovilizado (1,3 %) + intangibles comprados (2,0 %). Capex = capex propio (1,1 %) + compras de corretaje (≈2,5 % de ventas):
// comprador en serie, el crecimiento comprado (~1 punto al año) se paga en el capex.
const a = (periodo, g, m, fijo = false, cx = 3.6, am = 3.4) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: cx, nwc_pct_ventas: 14.9, tasa_impositiva_pct: 24.5, fijo });
export default {
  anios: [
    a('2026e', 5.5, 27.0, true),
    a('2027e', 5.0, 27.6),
    a('2028e', 5.0, 28.1),
    a('2029e', 4.5, 28.5),
    a('2030e', 4.0, 28.8),
    a('2031e', 3.5, 29.0),
    a('2032e', 3.0, 29.0),
  ],
  wacc: { tasa_libre_pct: 5.21, beta: 0.75, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.0, tasa_impositiva_pct: 24.5, peso_deuda_pct: 19.6 },
  terminal: { metodo: 'media', crecimiento_pct: 3.0, multiplo_salida: 14.0 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.5, multiplo_salida: 11.0 },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: 16.0 },
  ],
  pesos: { dcf: 40, comparables: 25, transacciones: 0, suma_partes: 0, escenarios: 35 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 3.0, precio_pct: 1.0, otros_pct: 1.5 },
    { periodo: '2027e', volumen_pct: 3.0, precio_pct: 1.0, otros_pct: 1.0 },
    { periodo: '2028e', volumen_pct: 3.0, precio_pct: 1.0, otros_pct: 1.0 },
    { periodo: '2029e', volumen_pct: 2.5, precio_pct: 1.0, otros_pct: 1.0 },
    { periodo: '2030e', volumen_pct: 2.0, precio_pct: 1.0, otros_pct: 1.0 },
  ],
  mercado_final: null,
};
