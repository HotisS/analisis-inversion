// Supuestos del DCF, escenarios y pesos de Ningbo Deye (corte 2026-10-19). CNY, ejercicio natural, base NIIF 2025.
// 2026e casi cerrado: 1S26 publicado (10.641 M de ventas) y avance del beneficio de 9M26 (4.220-4.320 M).
// Ventas 2026e ≈ 23.470 M (+92 %); margen EBITDA del 1S26 31,2 % que baja en el 2S por las diferencias de cambio,
// la mezcla (más baterías) y la competencia. Capex alto en 2026-2028 (fábrica de 16 GWh en Cixi y Malasia).
const a = (periodo, g, m, am, cx, tx, nwc, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: cx, nwc_pct_ventas: nwc, tasa_impositiva_pct: tx, fijo });
export default {
  anios: [
    a('2026e', 92.0, 29.5, 1.4, 4.5, 13.5, -13.0, true),
    a('2027e', 25.0, 27.5, 1.5, 5.0, 14.0, -12.0),
    a('2028e', 12.0, 26.5, 1.8, 4.0, 14.0, -11.0),
    a('2029e', 8.0, 26.0, 2.1, 3.5, 14.5, -10.0),
    a('2030e', 6.0, 25.5, 2.3, 3.0, 15.0, -10.0),
    a('2031e', 4.0, 25.0, 2.5, 2.8, 15.0, -10.0),
  ],
  wacc: { tasa_libre_pct: 1.648, beta: 1.15, prima_mercado_pct: 5.5, prima_adicional_pct: 1.0, coste_deuda_pct: 2.5, tasa_impositiva_pct: 15.0, peso_deuda_pct: 2 },
  terminal: { metodo: 'gordon', crecimiento_pct: 1.0, multiplo_salida: 10 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -8.0, ajuste_margen_pp: -4.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [{ periodo: '2027e', crecimiento_pp: -35.0, margen_pp: -5.0 }] },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 6.0, ajuste_margen_pp: 2.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 40, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 40 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 100.0, precio_pct: -6.0, otros_pct: -2.0 },
    { periodo: '2027e', volumen_pct: 30.0, precio_pct: -5.0, otros_pct: 0 },
    { periodo: '2028e', volumen_pct: 15.0, precio_pct: -3.0, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 10.0, precio_pct: -2.0, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 7.5, precio_pct: -1.5, otros_pct: 0 },
  ],
  // Mercado final 2031e: almacenamiento residencial (290.600 M) + comercial e industrial (200.700 M), Frost & Sullivan.
  mercado_final: { periodo: '2031e', tamano: 491300 },
};
