// Supuestos del DCF, escenarios y pesos de Marathon Petroleum (corte 2026-10-15). USD, US GAAP, consolidado con MPLX.
// EBITDA contable (después de paradas programadas). Cíclica: 2026e es el pico (fijo, con dos trimestres publicados);
// 2027e normaliza a medias; 2028e en adelante, margen de ciclo medio (R&M ≈9,5 USD/barril de EBITDA ajustado,
// midstream ≈8.200 M, paradas ≈1.500 M, corporativo ≈−850 M).
const a = (periodo, g, m, da, capex, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: da, capex_pct_ventas: capex, nwc_pct_ventas: 5.0, tasa_impositiva_pct: 18, fijo });
export default {
  anios: [
    a('2026e', 35.6, 15.5, 1.9, 2.6, true),
    a('2027e', -11.1, 13.75, 2.15, 2.9),
    a('2028e', -9.4, 11.35, 2.4, 2.9),
    a('2029e', 2.0, 11.4, 2.4, 2.8),
    a('2030e', 2.0, 11.4, 2.4, 2.7),
    a('2031e', 2.0, 11.4, 2.45, 2.6),
    a('2032e', 2.0, 11.4, 2.45, 2.5),
  ],
  wacc: { tasa_libre_pct: 5.21, beta: 1.0, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.5, tasa_impositiva_pct: 21, peso_deuda_pct: 19.5 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.0, multiplo_salida: 7.5 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -1.0, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 1.5, multiplo_salida: null, perfil: [{ periodo: '2027e', crecimiento_pp: -4.0, margen_pp: -3.0 }] },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 0.5, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [{ periodo: '2027e', crecimiento_pp: 4.0, margen_pp: 3.0 }, { periodo: '2028e', crecimiento_pp: 2.0, margen_pp: 3.0 }] },
  ],
  pesos: { dcf: 50, comparables: 0, transacciones: 0, suma_partes: 30, escenarios: 20 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 0.5, precio_pct: 35.1, otros_pct: 0 },
    { periodo: '2027e', volumen_pct: 1.0, precio_pct: -12.1, otros_pct: 0 },
    { periodo: '2028e', volumen_pct: 1.0, precio_pct: -10.4, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 0.5, precio_pct: 1.5, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 0.5, precio_pct: 1.5, otros_pct: 0 },
  ],
  mercado_final: null,
};
