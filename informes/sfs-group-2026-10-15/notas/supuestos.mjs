// Supuestos del DCF, escenarios y pesos de SFS Group (corte 2026-10-15). Ejercicio natural, CHF, Swiss GAAP FER (sin arrendamientos en balance:
// el alquiler está dentro del EBITDA, así que el capex no lleva derechos de uso).
const a = (periodo, g, m, cx, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: 4.6, capex_pct_ventas: cx, nwc_pct_ventas: 28.5, tasa_impositiva_pct: 25.0, fijo });
export default {
  anios: [
    a('2026e', 2.5, 17.0, 3.8, true),
    a('2027e', 4.5, 17.3, 4.5),
    a('2028e', 4.0, 17.5, 4.8),
    a('2029e', 3.5, 17.5, 4.8),
    a('2030e', 3.0, 17.5, 4.8),
    a('2031e', 2.5, 17.5, 4.8),
    a('2032e', 2.0, 17.5, 4.8),
  ],
  wacc: { tasa_libre_pct: 0.54, beta: 1.05, prima_mercado_pct: 5.5, prima_adicional_pct: 1.0, coste_deuda_pct: 1.5, tasa_impositiva_pct: 22.0, peso_deuda_pct: 10 },
  terminal: { metodo: 'gordon', crecimiento_pct: 1.0, multiplo_salida: 11 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.5, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [{ periodo: '2027e', crecimiento_pp: -8.0, margen_pp: -2.5 }] },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 0.8, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 40, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 40 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 2.5, precio_pct: 1.0, otros_pct: -1.0 },
    { periodo: '2027e', volumen_pct: 2.5, precio_pct: 1.0, otros_pct: 1.0 },
    { periodo: '2028e', volumen_pct: 2.5, precio_pct: 1.0, otros_pct: 0.5 },
    { periodo: '2029e', volumen_pct: 2.5, precio_pct: 1.0, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 2.0, precio_pct: 1.0, otros_pct: 0 },
  ],
  mercado_final: null,
};
