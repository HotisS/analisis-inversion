// Supuestos del DCF, escenarios y pesos de Lasertec (corte 2026-10-19). Ejercicio de julio a junio con la etiqueta del cierre
// («FY2026» = jul-25 a jun-26), JPY, J-GAAP. Base: FY2027e en la guía de agosto (ventas 290.000 M, +25,8 %); FY2028e por debajo
// del consenso (pedidos FY2027 en el punto medio de la guía, 350.000 M); FY2030e con una corrección cíclica (−10 %); después,
// convergencia a un margen EBITDA del 42,5 %. Circulante: del 59,8 % de FY2026 al 57 % y al 52 %, y al 48 % (media FY2022-FY2026) cuando los anticipos se recuperan con los pedidos.
const a = (periodo, g, m, capex = 2.0, amort = 1.5, nwc = 48) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: amort, capex_pct_ventas: capex, nwc_pct_ventas: nwc, tasa_impositiva_pct: 28.5, fijo: false });
export default {
  anios: [
    a('FY2027e', 25.8, 44.3, 2.0, 1.25, 57),
    a('FY2028e', 22.0, 46.0, 2.0, 1.5, 52),
    a('FY2029e', 12.0, 46.5),
    a('FY2030e', -10.0, 42.0),
    a('FY2031e', 14.0, 44.0),
    a('FY2032e', 10.0, 44.5),
    a('FY2033e', 8.0, 44.0),
    a('FY2034e', 6.0, 43.5),
    a('FY2035e', 4.0, 43.0),
    a('FY2036e', 3.0, 42.5),
  ],
  wacc: { tasa_libre_pct: 2.958, beta: 1.55, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 1.0, tasa_impositiva_pct: 28.5, peso_deuda_pct: 0 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.4, multiplo_salida: 18 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -5.0, ajuste_margen_pp: -6.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 1.8, multiplo_salida: null, perfil: [{ periodo: 'FY2027e', crecimiento_pp: -6, margen_pp: -3 }, { periodo: 'FY2028e', crecimiento_pp: -22, margen_pp: -6 }, { periodo: 'FY2029e', crecimiento_pp: -12, margen_pp: -6 }] },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 3.0, ajuste_margen_pp: 2.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [{ periodo: 'FY2028e', crecimiento_pp: 10, margen_pp: 2 }] },
  ],
  pesos: { dcf: 50, comparables: 25, transacciones: 0, suma_partes: 0, escenarios: 25 },
  puente_ingresos: [
    { periodo: 'FY2027e', volumen_pct: 20.0, precio_pct: 3.0, otros_pct: 2.8 },
    { periodo: 'FY2028e', volumen_pct: 18.0, precio_pct: 4.0, otros_pct: 0 },
    { periodo: 'FY2029e', volumen_pct: 9.0, precio_pct: 3.0, otros_pct: 0 },
    { periodo: 'FY2030e', volumen_pct: -12.0, precio_pct: 2.0, otros_pct: 0 },
    { periodo: 'FY2031e', volumen_pct: 11.0, precio_pct: 3.0, otros_pct: 0 },
  ],
  mercado_final: null,
};
