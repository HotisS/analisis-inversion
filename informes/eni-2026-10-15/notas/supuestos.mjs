// Supuestos del DCF, escenarios y pesos de Eni (corte 2026-10-15). Ejercicio natural, EUR, NIIF-UE.
// EBITDA normalizado = el ajustado de la empresa (sin efecto inventario ni partidas identificadas), sin participadas
// (van en el puente a valor contable de 19.170 M a jun-26). Perímetro de junio de 2026 (Searah ya fuera; Plenitude dentro).
// Precio del crudo: curva de futuros del Brent del 15-oct-2026 (106 USD contado, 85,6 dic-27, 78,3 dic-28) y el plan de la
// empresa (70 USD reales a largo plazo).
const a = (periodo, g, m, am, capex, fijo = false, tax = 48) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: capex, nwc_pct_ventas: -3, tasa_impositiva_pct: tax, fijo });
export default {
  anios: [
    a('2026e', 12.0, 22.4, 8.0, 9.0, true, 50),
    a('2027e', -5.0, 21.5, 8.5, 9.5),
    a('2028e', -5.0, 20.5, 8.8, 9.5),
    a('2029e', 2.5, 20.0, 9.0, 9.5),
    a('2030e', 2.5, 20.0, 9.0, 9.3),
    a('2031e', 2.0, 19.5, 9.0, 9.2),
    a('2032e', 1.5, 19.5, 9.0, 9.0),
    a('2033e', 1.5, 19.5, 9.0, 9.0),
  ],
  wacc: { tasa_libre_pct: 3.42, beta: 0.9, prima_mercado_pct: 5.5, prima_adicional_pct: 1.0, coste_deuda_pct: 4.5, tasa_impositiva_pct: 24, peso_deuda_pct: 24 },
  terminal: { metodo: 'gordon', crecimiento_pct: 1.0, multiplo_salida: 4.5 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -3.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 0.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 2.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 1.5, multiplo_salida: null },
  ],
  pesos: { dcf: 60, comparables: 0, transacciones: 0, suma_partes: 0, escenarios: 40 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 5.0, precio_pct: 7.0, otros_pct: 0 },
    { periodo: '2027e', volumen_pct: 3.0, precio_pct: -8.0, otros_pct: 0 },
    { periodo: '2028e', volumen_pct: 3.0, precio_pct: -8.0, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 3.0, precio_pct: -0.5, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 2.5, precio_pct: 0, otros_pct: 0 },
  ],
  mercado_final: null,
};
