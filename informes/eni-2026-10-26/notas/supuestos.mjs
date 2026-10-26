// Supuestos del DCF, escenarios y pesos de Eni (corte 2026-10-26). Ejercicio natural, EUR, NIIF-UE.
// EBITDA normalizado = el ajustado de la empresa (sin efecto inventario ni partidas especiales), sin participadas (van en el
// puente a su valor contable de 30-sep-2026: 25.791 M, con Plenitude al 65 % y Searah al 50 %).
// Perímetro: 2026e con Plenitude consolidada nueve meses (como publicará Eni); desde 2027e sin Plenitude (participada).
// Precio del crudo: curva de futuros del Brent del 23-oct-2026 (116,7 USD contado, 86,7 dic-27, 78,8 dic-28), guía con 95 USD.
const a = (periodo, g, m, am, capex, nwc, tax, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: capex, nwc_pct_ventas: nwc, tasa_impositiva_pct: tax, fijo });
export default {
  anios: [
    a('2026e', 24.5, 19.4, 6.3, 7.5, 0.5, 44, true),
    a('2027e', -7.5, 20.5, 6.8, 7.9, 0.5, 45),
    a('2028e', -11.0, 20.0, 7.7, 8.9, 0.5, 46),
    a('2029e', 2.5, 20.0, 7.7, 8.9, 0.5, 46),
    a('2030e', 2.5, 20.0, 7.7, 8.9, 0.5, 46),
    a('2031e', 2.0, 20.0, 7.7, 8.8, 0.5, 46),
    a('2032e', 1.5, 20.0, 7.7, 8.6, 0.5, 46),
    a('2033e', 1.5, 20.0, 7.7, 8.6, 0.5, 46),
  ],
  wacc: { tasa_libre_pct: 3.36, beta: 0.86, prima_mercado_pct: 5.5, prima_adicional_pct: 1.0, coste_deuda_pct: 4.3, tasa_impositiva_pct: 24, peso_deuda_pct: 20 },
  terminal: { metodo: 'gordon', crecimiento_pct: 1.0, multiplo_salida: 4.5 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -3.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 0.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 2.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 1.5, multiplo_salida: null },
  ],
  pesos: { dcf: 60, comparables: 0, transacciones: 0, suma_partes: 0, escenarios: 40 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 6.5, precio_pct: 18.0, otros_pct: 0 },
    { periodo: '2027e', volumen_pct: 4.0, precio_pct: -4.0, otros_pct: -7.5 },
    { periodo: '2028e', volumen_pct: 3.0, precio_pct: -14.0, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 3.0, precio_pct: -0.5, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 2.5, precio_pct: 0, otros_pct: 0 },
  ],
  mercado_final: null,
};
