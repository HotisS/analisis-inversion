// Supuestos del DCF, escenarios y pesos de Gentex (corte 2026-10-15). USD, ejercicio natural, US GAAP.
// 2026e fijo: dos trimestres publicados y guía de ventas de 2.650-2.750 M; margen con la guía de margen bruto (34,5-35,5 %) y gastos (405-415 M).
// Margen EBITDA 23,5 % (2025 sin no recurrentes: 23,5 %; LTM sin la devolución de aranceles: 22,8 %). Amortización ≈3,9 % (guía 100-110 M).
// Capex 4,5 % en 2026-2027 (guía 115-125 M y 115-145 M al año) bajando al 4,0 %. Circulante comercial 25 % de ventas (jun-26: 25,0 %).
const a = (periodo, g, m, cx, fijo = false, tax = 17) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: 3.9, capex_pct_ventas: cx, nwc_pct_ventas: 25, tasa_impositiva_pct: tax, fijo });
export default {
  anios: [
    a('2026e', 5.8, 23.5, 4.5, true, 16.5),
    a('2027e', 4.1, 23.5, 4.5),
    a('2028e', 4.0, 23.5, 4.4),
    a('2029e', 3.5, 23.5, 4.3),
    a('2030e', 3.0, 23.5, 4.2),
    a('2031e', 2.5, 23.5, 4.1),
    a('2032e', 2.5, 23.5, 4.0),
  ],
  wacc: { tasa_libre_pct: 5.2, beta: 1.0, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.5, tasa_impositiva_pct: 17, peso_deuda_pct: 0 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 7 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -2.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [{ periodo: '2028e', crecimiento_pp: -8.0, margen_pp: -2.0 }] },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 25, transacciones: 0, suma_partes: 0, escenarios: 25 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: -2.0, precio_pct: 4.3, otros_pct: 3.5 },
    { periodo: '2027e', volumen_pct: 0.0, precio_pct: 3.6, otros_pct: 0.5 },
    { periodo: '2028e', volumen_pct: 1.0, precio_pct: 3.0, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 1.0, precio_pct: 2.5, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 1.0, precio_pct: 2.0, otros_pct: 0 },
  ],
  mercado_final: null,
};
