// Supuestos del DCF, escenarios y pesos de solutions by stc (corte 2026-10-20). SAR, ejercicio natural, NIIF (SOCPA).
// 2026e con el 1S26 publicado (ventas +9 %, margen EBITDA del 17,4 % con 63 M de regalías revertidas) y la guía (+6-8 %, margen 14-16 %):
// +7,5 % y margen del 15,5 % (el 4T es estacionalmente flojo: 12-13 % en 2024-2025) [A2, A3, A11].
// Después el crecimiento baja del 7 % al 4,5 % (mercado de servicios de TI saudí al 6,9 % según IMARC; gasto público a la baja)
// y el margen EBITDA del 15,5 % al 15,0 % por la presión de la IA sobre la externalización y los proyectos.
const a = (periodo, g, m, am, cx, tx, nwc, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: cx, nwc_pct_ventas: nwc, tasa_impositiva_pct: tx, fijo });
export default {
  anios: [
    a('2026e', 7.5, 15.5, 2.9, 2.8, 8.5, 11.0, true),
    a('2027e', 7.0, 15.5, 2.9, 2.8, 8.5, 11.0),
    a('2028e', 6.5, 15.4, 2.9, 2.8, 8.5, 11.0),
    a('2029e', 6.0, 15.3, 2.9, 2.8, 8.5, 11.0),
    a('2030e', 5.5, 15.2, 2.9, 2.8, 8.5, 11.0),
    a('2031e', 5.0, 15.1, 2.9, 2.8, 8.5, 11.0),
    a('2032e', 4.5, 15.0, 2.9, 2.8, 8.5, 11.0),
  ],
  // Tasa libre en USD (SAR anclado a 3,75): Treasury a 10 años 5,09 % (FRED, 16-oct-2026) + diferencial soberano de Arabia Saudí 0,51 %
  // (Damodaran, Aa3) = 5,60 %. Prima de país 0,78 % como prima adicional. Deuda de 873 M frente a 22.200 M de capitalización: peso del 5 %.
  wacc: { tasa_libre_pct: 5.6, beta: 1.05, prima_mercado_pct: 5.5, prima_adicional_pct: 0.78, coste_deuda_pct: 7.0, tasa_impositiva_pct: 8.5, peso_deuda_pct: 5 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 10 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -2.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 40, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 40 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 6.5, precio_pct: 1.0, otros_pct: 0 },
    { periodo: '2027e', volumen_pct: 6.0, precio_pct: 1.0, otros_pct: 0 },
    { periodo: '2028e', volumen_pct: 5.5, precio_pct: 1.0, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 5.0, precio_pct: 1.0, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 4.5, precio_pct: 1.0, otros_pct: 0 },
  ],
  // Mercado final: servicios de TI de Arabia Saudí según IMARC (12.090 M USD = 45.338 M SAR en 2025, +6,91 % anual), llevado a 2032e [B1].
  // Perímetro aproximado: no incluye todo el hardware revendido en proyectos de infraestructura (Core ICT), por lo que la cuota sale alta.
  mercado_final: { periodo: '2032e', tamano: 72300 },
};
