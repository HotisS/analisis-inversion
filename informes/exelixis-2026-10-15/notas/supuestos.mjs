// Supuestos del DCF, escenarios y pesos de Exelixis (corte 2026-10-15). USD, ejercicio de 52/53 semanas (natural a efectos prácticos).
// Hoja de producto (estimación propia, M USD; zanzalintinib ponderado por probabilidad):
//          Cabozantinib EE. UU.  Royalties (Ipsen, Takeda)  Zanzalintinib  Otros (neto)   Total
// 2026e        2.330                  210                      0            −20         2.520  (guía 2.500-2.550)
// 2027e        2.520                  225                     80            −20         2.805
// 2028e        2.650                  235                    250            −20         3.115
// 2029e        2.700                  220                    500            −20         3.400
// 2030e        1.800                  150                    900              0         2.850  (genérico de MSN desde el 15-ene-2030 con una probabilidad del 55 %: media ponderada)
// 2031e          350                   70                  1.300              0         1.720  (genéricos con licencia desde el 1-ene-2031)
// 2032e          200                   40                  1.700              0         1.940
// 2033e          150                   30                  2.000              0         2.180
// 2034e          130                   20                  2.200              0         2.350
// 2035e          120                   20                  2.350              0         2.490
// Gastos: I+D 850 (2026) → 920 (2028-2029) → 650 (2032-2033); comercial y administración 600 → 700 → 540-560; coste de ventas ≈ 4 % de las ventas de producto.
const a = (periodo, g, m, am, cx, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: cx, nwc_pct_ventas: 12.0, tasa_impositiva_pct: 22, fijo });
export default {
  anios: [
    a('2026e', 8.6, 39.9, 1.1, 0.8, true),
    a('2027e', 11.3, 42.1, 1.2, 1.0),
    a('2028e', 11.1, 45.7, 1.2, 1.0),
    a('2029e', 9.1, 49.4, 1.2, 1.0),
    a('2030e', -16.2, 43.5, 1.3, 1.0),
    a('2031e', -39.6, 24.4, 1.7, 1.2),
    a('2032e', 12.8, 36.1, 1.5, 1.2),
    a('2033e', 12.4, 41.7, 1.4, 1.3),
    a('2034e', 7.8, 44.0, 1.3, 1.3),
    a('2035e', 6.0, 45.0, 1.3, 1.3),
  ],
  wacc: { tasa_libre_pct: 5.21, beta: 0.8, prima_mercado_pct: 5.5, prima_adicional_pct: 1.5, coste_deuda_pct: 5.5, tasa_impositiva_pct: 22, peso_deuda_pct: 0 },
  terminal: { metodo: 'media', crecimiento_pct: 1.0, multiplo_salida: 8.0 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -3.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 2.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 5.0, precio_pct: 2.5, otros_pct: 1.1 },
    { periodo: '2027e', volumen_pct: 6.0, precio_pct: 2.0, otros_pct: 3.3 },
    { periodo: '2028e', volumen_pct: 2.5, precio_pct: 1.5, otros_pct: 7.1 },
    { periodo: '2029e', volumen_pct: 0.5, precio_pct: 1.0, otros_pct: 7.6 },
    { periodo: '2030e', volumen_pct: -10.0, precio_pct: -12.0, otros_pct: 5.8 },
  ],
  mercado_final: null,
};
