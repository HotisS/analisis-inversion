// Supuestos del DCF, escenarios y pesos de Sieyuan Electric (corte 2026-10-26, tras el 3T26). CNY, ejercicio natural, base CAS 2025.
// 2026e casi cerrado: 9M26 publicados (ventas 17.762 M, +28,5 %); objetivo de la empresa +25 % (27.000 M). Ventas 2026e ≈ 27.247 M (+26,5 %):
// el 4T26 crece un 19,8 % (9.485 M), por debajo del 3T (+30,7 %), como pide el objetivo.
// Margen EBITDA: 18,3 % en 2025; ≈ 19,2 % en 9M26 (EBIT 3.124 M + amortización estimada de 287 M) frente al ≈ 20,1 % de 9M25; el 3T26 cayó
// 2,7 puntos por la mezcla. El 4T es el trimestre de menor margen (≈ 15 % en 2025): 2026e en el 17,6 % y bajada suave hasta el 17,0 % en 2031e.
// Circulante comercial (motor: existencias + clientes − proveedores + activos − pasivos por contrato): 17,5 % en 2025 y ≈ 18,1 % de las ventas
// LTM a sep-26: se proyecta en el 18 %, su nivel real, sin mejoras (aviso del hilo: no liberar caja que no existe).
// Capex: 3,8 % de las ventas en 2025 y 3,9 % en 9M26.
const a = (periodo, g, m, am, cx, tx, nwc, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: cx, nwc_pct_ventas: nwc, tasa_impositiva_pct: tx, fijo });
export default {
  anios: [
    a('2026e', 26.5, 17.6, 1.5, 4.0, 13.5, 18.0, true),
    a('2027e', 20.0, 17.6, 1.6, 3.8, 13.5, 18.0),
    a('2028e', 15.0, 17.5, 1.7, 3.5, 14.0, 18.0),
    a('2029e', 10.0, 17.3, 1.8, 3.0, 14.0, 18.0),
    a('2030e', 7.0, 17.2, 1.9, 2.8, 14.5, 18.0),
    a('2031e', 5.0, 17.0, 2.0, 2.5, 15.0, 18.0),
  ],
  // Beta: mensual 5 años 0,73, semanal 2 años 1,14, ajustada 0,82 (bolsa.mjs, frente al CSI 300). Desapalancada con la deuda de Sieyuan
  // (907 M de deuda frente a 84.034 M de capitalización, D/E 1,1 %) y reapalancada con la misma estructura: la diferencia es < 0,01.
  // Se usa 1,0 (≈ media de la semanal de 2 años y la ajustada mensual, 0,98).
  wacc: { tasa_libre_pct: 1.6376, beta: 1.0, prima_mercado_pct: 5.5, prima_adicional_pct: 1.0, coste_deuda_pct: 2.5, tasa_impositiva_pct: 15.0, peso_deuda_pct: 1 },
  terminal: { metodo: 'gordon', crecimiento_pct: 1.0, multiplo_salida: 10 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -6.0, ajuste_margen_pp: -2.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 5.0, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 28.5, precio_pct: -1.0, otros_pct: -1.0 },
    { periodo: '2027e', volumen_pct: 22.0, precio_pct: -2.0, otros_pct: 0 },
    { periodo: '2028e', volumen_pct: 16.5, precio_pct: -1.5, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 11.0, precio_pct: -1.0, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 8.0, precio_pct: -1.0, otros_pct: 0 },
  ],
  // Mercado final 2031e: inversión mundial en redes (IEA, ≈ 536.000 M USD en 2031e [B1]) × 6,6676 CNY/USD (26-oct-2026).
  mercado_final: { periodo: '2031e', tamano: 3573800 },
};
