// Supuestos del DCF, escenarios y pesos de Vistra (corte 2026-10-15). Ejercicio natural, USD, US GAAP.
// EBITDA = EBITDA ajustado consolidado de la empresa (sin coberturas no realizadas ni partidas de desmantelamiento),
// con las amortizaciones del combustible nuclear dentro de «amortizaciones», como en sus conciliaciones.
// Ingresos publicados (llevan la valoración de coberturas: 2025 con −1.811 M no realizados), de ahí el salto de 2026e.
// 2026e: guía reafirmada (6.800-7.600 M; consolidado 6.720-7.520). 2027e: «oportunidad» 7.400-7.800 M + Cogentrix
// (≈550 M: 4.000 M / 7,25x) + parte de Meta − Asset Closure. Cogentrix se paga en el puente (otros_ajustes) y 5 M de acciones.
const a = (periodo, g, m, am, capex, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: capex, nwc_pct_ventas: 9.0, tasa_impositiva_pct: 23.0, fijo });
export default {
  anios: [
    a('2026e', 25.0, 32.0, 9.7, 15.0, true),
    a('2027e', 12.0, 33.5, 10.0, 12.0),
    a('2028e', 5.0, 34.0, 10.0, 11.5),
    a('2029e', 4.0, 34.0, 10.0, 11.0),
    a('2030e', 3.5, 33.5, 10.0, 10.5),
    a('2031e', 3.0, 33.0, 10.0, 10.3),
    a('2032e', 2.5, 33.0, 10.0, 10.2),
    a('2033e', 2.5, 33.0, 10.0, 10.2),
  ],
  wacc: { tasa_libre_pct: 5.21, beta: 1.25, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 6.3, tasa_impositiva_pct: 23.0, peso_deuda_pct: 30 },
  terminal: { metodo: 'media', crecimiento_pct: 2.5, multiplo_salida: 9.5 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -3.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.0, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 2.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 15, transacciones: 5, suma_partes: 0, escenarios: 30 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 8.0, precio_pct: 6.0, otros_pct: 11.0 },
    { periodo: '2027e', volumen_pct: 9.0, precio_pct: 3.0, otros_pct: 0 },
    { periodo: '2028e', volumen_pct: 2.5, precio_pct: 2.5, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 1.5, precio_pct: 2.5, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 1.0, precio_pct: 2.5, otros_pct: 0 },
  ],
  mercado_final: { periodo: '2033e', tamano: 798000 },
  // BPA propio, base ajustada (sin coberturas no realizadas), descontado el dividendo preferente (≈190 M):
  // (EBITDA − amortizaciones − intereses) × (1 − 23 %) − preferentes, entre acciones (339 M en 2026, 338 M en 2027 y 335,5 M en 2028:
  // 336 M de hoy + 5 M de Cogentrix − 7,5 M de la recompra autorizada pendiente de 1.200 M + 1 M de dilución anual).
  // Intereses: 1.200 M en 2026 (guía) y 1.450 M desde 2027 (Cogentrix y bonos subordinados de 1.500 M).
  bpa: { '2026e': 7.95, '2027e': 9.43, '2028e': { Bajista: 8.21, Base: 10.47, Alcista: 12.10 } },
};
