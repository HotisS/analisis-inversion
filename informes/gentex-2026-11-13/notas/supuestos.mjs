// Supuestos del DCF, escenarios y pesos de Gentex (corte 2026-11-13). USD, ejercicio natural, US GAAP.
// 2026e fijo: nueve meses publicados (1.974,5 M) y guía de ventas de ≈2.650 M; margen bruto 34,0-34,5 %, gastos 395-410 M sin indemnizaciones ni deterioros, amortización 100-105 M -> EBITDA ≈22,6 % (incluye los 18 M de devolución IEEPA del 2T).
// 2027e: parte baja de la guía (2.800 M) y margen bruto del 33 % (la dirección habla de 33-34 %, «quizá menos») -> EBITDA 22,0 %; desde 2028, 22,5 % con la recuperación parcial de costes.
// Capex 4,1 % en 2026 (guía 100-115 M) y 4,3 % bajando al 4,0 %. Circulante comercial 25 % de ventas.
const a = (periodo, g, m, cx, fijo = false, tax = 16.5) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: 3.9, capex_pct_ventas: cx, nwc_pct_ventas: 25, tasa_impositiva_pct: tax, fijo });
export default {
  anios: [
    a('2026e', 4.6, 22.6, 4.1, true, 16.3),
    a('2027e', 5.7, 22.0, 4.3),
    a('2028e', 4.0, 22.5, 4.2),
    a('2029e', 4.0, 22.5, 4.1),
    a('2030e', 3.0, 22.5, 4.0),
    a('2031e', 2.5, 22.5, 4.0),
    a('2032e', 2.5, 22.5, 4.0),
  ],
  wacc: { tasa_libre_pct: 5.1, beta: 1.0, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.5, tasa_impositiva_pct: 16.5, peso_deuda_pct: 0 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 7 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -2.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [{ periodo: '2028e', crecimiento_pp: -8.0, margen_pp: -2.0 }] },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 25, transacciones: 0, suma_partes: 0, escenarios: 25 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: -2.0, precio_pct: 3.1, otros_pct: 3.5 },
    { periodo: '2027e', volumen_pct: -1.0, precio_pct: 5.2, otros_pct: 1.5 },
    { periodo: '2028e', volumen_pct: 1.0, precio_pct: 3.0, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 1.0, precio_pct: 2.0, otros_pct: 1.0 },
    { periodo: '2030e', volumen_pct: 1.0, precio_pct: 2.0, otros_pct: 0 },
  ],
  mercado_final: null,
};
