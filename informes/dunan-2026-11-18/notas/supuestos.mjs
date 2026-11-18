// Supuestos del DCF, escenarios y pesos de DunAn (corte 2026-11-18). CNY, ejercicio natural, base CAS 2025.
// 2026e casi cerrado: 9M26 publicado (10.767 M de ventas, +10,7 %; EBIT 863 M). 4T26 supuesto +10 % en ventas y +8 % en EBIT sobre el 4T25.
// Margen EBITDA 2025: 10,85 %. Circulante comercial (con efectos y activos/pasivos de contrato) ≈ 19 % de las ventas.
const a = (periodo, g, m, am, cx, tx, nwc, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: cx, nwc_pct_ventas: nwc, tasa_impositiva_pct: tx, fijo });
export default {
  anios: [
    a('2026e', 10.5, 9.9, 1.7, 3.8, 13.9, 19.0, true),
    a('2027e', 7.5, 10.2, 2.0, 3.4, 13.5, 19.0),
    a('2028e', 6.5, 10.5, 2.1, 3.0, 13.5, 19.0),
    a('2029e', 5.5, 10.6, 2.2, 2.6, 14.0, 19.0),
    a('2030e', 4.5, 10.6, 2.2, 2.4, 14.0, 19.0),
    a('2031e', 3.5, 10.6, 2.2, 2.3, 14.0, 19.0),
  ],
  wacc: { tasa_libre_pct: 1.5892, beta: 1.05, prima_mercado_pct: 5.5, prima_adicional_pct: 1.5, coste_deuda_pct: 3.0, tasa_impositiva_pct: 13.5, peso_deuda_pct: 6 },
  terminal: { metodo: 'gordon', crecimiento_pct: 1.0, multiplo_salida: 7 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -2.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [{ periodo: '2027e', crecimiento_pp: -12.0, margen_pp: -3.0 }] },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 3.0, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 60, comparables: 10, transacciones: 0, suma_partes: 0, escenarios: 30 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 6.0, precio_pct: 2.0, otros_pct: 2.5 },
    { periodo: '2027e', volumen_pct: 5.5, precio_pct: 0.5, otros_pct: 1.5 },
    { periodo: '2028e', volumen_pct: 4.5, precio_pct: 0.5, otros_pct: 1.5 },
    { periodo: '2029e', volumen_pct: 4.0, precio_pct: 0.5, otros_pct: 1.0 },
    { periodo: '2030e', volumen_pct: 3.5, precio_pct: 0.5, otros_pct: 0.5 },
  ],
  mercado_final: null,
};
