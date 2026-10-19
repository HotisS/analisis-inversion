// Supuestos del DCF, escenarios y pesos de Electrical Industries Company (EIC, corte 2026-10-19). SAR, ejercicio natural, NIIF (SOCPA).
// 2026e con el 1S26 publicado (ventas de 1.370 M, +32 %; margen bruto del 37,8 %) y una cartera de 3.300 M SAR a fin de 2025:
// ventas 2026e ≈ 2.870 M (+25 %, el consenso de un analista da 2.872 M). Después el crecimiento frena con la cartera
// (que apenas creció en 2025, +3 %) y el margen EBITDA vuelve poco a poco desde el máximo del ciclo de escasez de
// transformadores (32 % en los últimos doce meses; 13 % en 2021 y 19 % en 2023) hacia el 24,5 % en 2031e.
// Capex alto en 2026-2027 (ampliación de 380 kV de 192 M SAR, producción comercial en el 3T27).
const a = (periodo, g, m, am, cx, tx, nwc, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: cx, nwc_pct_ventas: nwc, tasa_impositiva_pct: tx, fijo });
export default {
  anios: [
    a('2026e', 25.0, 32.0, 1.5, 6.5, 6.0, 38.0, true),
    a('2027e', 13.0, 30.5, 1.8, 5.0, 6.0, 38.0),
    a('2028e', 10.0, 29.0, 2.0, 3.5, 6.0, 38.0),
    a('2029e', 6.0, 27.5, 2.2, 3.0, 6.0, 38.0),
    a('2030e', 4.5, 26.0, 2.4, 2.8, 6.0, 38.0),
    a('2031e', 3.5, 24.5, 2.5, 2.8, 6.0, 38.0),
  ],
  // Tasa libre en USD (el SAR está anclado a 3,75 por USD): Treasury a 10 años 5,10 % (FRED, 15-oct-2026) + diferencial soberano
  // de Arabia Saudí 0,51 % (Damodaran, Aa3) = 5,61 %. Prima de país 0,78 % (Damodaran) como prima adicional.
  wacc: { tasa_libre_pct: 5.61, beta: 1.1, prima_mercado_pct: 5.5, prima_adicional_pct: 0.78, coste_deuda_pct: 5.5, tasa_impositiva_pct: 6.0, peso_deuda_pct: 1 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 9 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -5.0, ajuste_margen_pp: -5.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [{ periodo: '2027e', crecimiento_pp: -15.0, margen_pp: -3.0 }] },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 5.0, ajuste_margen_pp: 2.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 40, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 40 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 19.0, precio_pct: 6.0, otros_pct: 0 },
    { periodo: '2027e', volumen_pct: 10.0, precio_pct: 3.0, otros_pct: 0 },
    { periodo: '2028e', volumen_pct: 9.0, precio_pct: 1.0, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 6.0, precio_pct: 0, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 5.0, precio_pct: -0.5, otros_pct: 0 },
  ],
  // Mercado final: sin tamaño fiable. Mordor da 1.000 M USD (3.750 M SAR) de transformadores en Arabia Saudí en 2025, menos que
  // dos veces lo que factura EIC solo en transformadores y subestaciones (1.811 M SAR): la cuota saldría absurda. Prueba manual.
  mercado_final: null,
};
