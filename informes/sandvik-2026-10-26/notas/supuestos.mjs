// Supuestos del DCF, escenarios y pesos de Sandvik (corte 2026-10-26, tras el 3T26). Ejercicio natural, SEK.
// Capex = inmovilizado + intangibles (guía 4.000-4.500 M en 2026 ≈ 3,0 %) + inversión neta en equipos de alquiler (≈0,4 %)
// + altas de derechos de uso (≈1,0 %) ≈ 4,6 %; desde 2027 se suma ≈1,5 % de las ventas en compras de empresas (1 punto de crecimiento al año).
// Circulante en la definición del motor (existencias + clientes − proveedores): 34,8 % en 2025, 40,6 % de las ventas de 12 meses a sep-26
// (55.835 M: existencias encarecidas por el tungsteno). Se proyecta al nivel real: 38 % en 2026, 37 % en 2027 y 36 % desde 2028
// (media 2023-2025: 35,1 %); no se supone que el tungsteno devuelva caja por debajo de la historia.
// Margen EBITDA publicado = EBITA ajustado + amortización sin excedentes (≈4,5 %) − partidas extraordinarias recurrentes (≈0,3 %).
const a = (periodo, g, m, cx, nwc, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: 5.6, capex_pct_ventas: cx, nwc_pct_ventas: nwc, tasa_impositiva_pct: 24, fijo });
export default {
  anios: [
    a('2026e', 19.0, 25.2, 4.6, 38, true),
    a('2027e', 7.0, 25.6, 6.1, 37),
    a('2028e', 4.5, 25.5, 6.1, 36),
    a('2029e', 4.0, 25.2, 6.0, 36),
    a('2030e', 3.5, 25.0, 5.8, 36),
    a('2031e', 3.0, 24.8, 5.6, 36),
    a('2032e', 3.0, 24.6, 5.6, 36),
  ],
  wacc: { tasa_libre_pct: 3.11, beta: 1.30, prima_mercado_pct: 5.5, prima_adicional_pct: 0.5, coste_deuda_pct: 3.9, tasa_impositiva_pct: 24, peso_deuda_pct: 9 },
  terminal: { metodo: 'media', crecimiento_pct: 2.5, multiplo_salida: 12 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    // Bajista: recesión industrial, reversión del tungsteno y caída de la inversión minera a la vez (2019-2020: ingresos −11 % orgánico, EBITA ajustado del 17 %).
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -1.0, ajuste_margen_pp: -1.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: null, multiplo_salida: null,
      perfil: [{ periodo: '2027e', crecimiento_pp: -4, margen_pp: -1.5 }, { periodo: '2028e', crecimiento_pp: -13.5, margen_pp: -2.5 }, { periodo: '2029e', crecimiento_pp: 2, margen_pp: -2.0 }] },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 0.6, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 40, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 40 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 12.0, precio_pct: 8.0, otros_pct: -1.0 },
    { periodo: '2027e', volumen_pct: 3.0, precio_pct: 2.5, otros_pct: 1.5 },
    { periodo: '2028e', volumen_pct: 1.0, precio_pct: 2.5, otros_pct: 1.0 },
    { periodo: '2029e', volumen_pct: 0.5, precio_pct: 2.5, otros_pct: 1.0 },
    { periodo: '2030e', volumen_pct: 0.0, precio_pct: 2.5, otros_pct: 1.0 },
  ],
  mercado_final: null,
};
