// Supuestos del DCF, escenarios y pesos de ABB (corte 2026-10-15). USD, US GAAP, ejercicio natural.
// Perímetro: actividades continuadas (sin Robotics, que se vende a SoftBank) y sin Rotork (oferta pendiente; su precio
// y su aportación se dejan fuera a la vez). EBITDA contable (después de reestructuraciones y partidas no operativas).
// Arrendamientos operativos dentro del EBITDA (US GAAP), fuera de la deuda.
const a = (periodo, g, m, capex, nwc, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: 2.4, capex_pct_ventas: capex, nwc_pct_ventas: nwc, tasa_impositiva_pct: 25, fijo });
export default {
  anios: [
    a('2026e', 14.5, 21.0, 3.0, 17.0, true),
    a('2027e', 9.0, 21.4, 3.1, 17.0),
    a('2028e', 8.0, 21.8, 3.1, 17.0),
    a('2029e', 7.0, 22.0, 3.0, 17.0),
    a('2030e', 6.0, 22.0, 3.0, 17.0),
    a('2031e', 5.0, 22.0, 2.9, 17.0),
    a('2032e', 4.0, 22.0, 2.8, 17.0),
    a('2033e', 3.5, 22.0, 2.8, 17.0),
  ],
  wacc: { tasa_libre_pct: 5.21, beta: 1.05, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.5, tasa_impositiva_pct: 25, peso_deuda_pct: 5 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 18 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -4.0, ajuste_margen_pp: -2.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 9.5, precio_pct: 2.0, otros_pct: 3.0 },
    { periodo: '2027e', volumen_pct: 6.5, precio_pct: 2.0, otros_pct: 0.5 },
    { periodo: '2028e', volumen_pct: 5.5, precio_pct: 2.0, otros_pct: 0.5 },
    { periodo: '2029e', volumen_pct: 4.5, precio_pct: 2.0, otros_pct: 0.5 },
    { periodo: '2030e', volumen_pct: 3.5, precio_pct: 2.0, otros_pct: 0.5 },
  ],
  mercado_final: null,
};
