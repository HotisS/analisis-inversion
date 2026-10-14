// Supuestos del DCF, escenarios y pesos de Epiroc (corte 2026-10-14). Ejercicio natural, SEK.
// Capex 2027-2031 incluye ≈1,7 % de las ventas en compras de empresas (1 punto de crecimiento al año a 1,7 veces ventas, como Stanley).
// Capex = inmovilizado + intangibles + altas de derechos de uso + inversión neta en equipos de alquiler (5,9 % de las ventas en 2025, 6,2 % en 2024).
// Circulante (existencias + clientes − proveedores) = 38 % de las ventas en 2025.
const a = (periodo, g, m, cx, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: 4.8, capex_pct_ventas: cx, nwc_pct_ventas: 38, tasa_impositiva_pct: 23.5, fijo });
export default {
  anios: [
    a('2026e', 6.0, 24.6, 5.8, true),
    a('2027e', 8.0, 24.9, 7.5),
    a('2028e', 6.0, 25.0, 7.4),
    a('2029e', 4.5, 24.8, 7.2),
    a('2030e', 4.0, 24.6, 7.0),
    a('2031e', 3.5, 24.4, 6.5),
    a('2032e', 3.0, 24.2, 6.0),
  ],
  wacc: { tasa_libre_pct: 3.17, beta: 1.19, prima_mercado_pct: 5.5, prima_adicional_pct: 0.5, coste_deuda_pct: 4.1, tasa_impositiva_pct: 23.5, peso_deuda_pct: 6 },
  terminal: { metodo: 'media', crecimiento_pct: 2.5, multiplo_salida: 13 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    // Bajista: caída de la inversión minera como en 2015-2016 o 2020 (equipos −30 %, posventa estable): ingresos −10 % y −3 pp de margen en 2028, recuperación después.
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -1.0, ajuste_margen_pp: -1.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: null, multiplo_salida: null,
      perfil: [{ periodo: '2027e', crecimiento_pp: -6, margen_pp: -1.5 }, { periodo: '2028e', crecimiento_pp: -16, margen_pp: -3.0 }, { periodo: '2029e', crecimiento_pp: 2, margen_pp: -2.0 }] },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 0.8, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 40, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 40 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 7.0, precio_pct: 2.5, otros_pct: -3.5 },
    { periodo: '2027e', volumen_pct: 4.5, precio_pct: 2.5, otros_pct: 1.0 },
    { periodo: '2028e', volumen_pct: 2.5, precio_pct: 2.5, otros_pct: 1.0 },
    { periodo: '2029e', volumen_pct: 1.0, precio_pct: 2.5, otros_pct: 1.0 },
    { periodo: '2030e', volumen_pct: 0.5, precio_pct: 2.5, otros_pct: 1.0 },
  ],
  mercado_final: { periodo: '2032e', tamano: Math.round(133090 * 1.056 ** 7 * 9.86) },
};
