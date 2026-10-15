// Supuestos del DCF, escenarios y pesos de Cheniere (corte 2026-10-15). Ejercicio natural, USD, US GAAP.
// EBITDA normalizado: sin los derivados de los contratos IPM (no recurrentes) y DESPUÉS de los pagos en acciones (≈0,15 bn).
// DCF consolidado (100 % de Sabine Pass y Corpus Christi); en el puente se resta el 51,4 % de CQP en manos de terceros a mercado.
// Incluye los trenes 8-9 de Corpus Christi (en construcción) y la primera fase de la ampliación de Sabine Pass (tren 7, >6 Mtpa:
// EPC firmado y obras previas en marcha; decisión de inversión pendiente). No incluye el resto de las ampliaciones (≈34 Mtpa).
const a = (periodo, g, m, capex, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: 6.8, capex_pct_ventas: capex, nwc_pct_ventas: 7, tasa_impositiva_pct: 16, fijo });
export default {
  anios: [
    a('2026e', 15.0, 34.8, 15.0, true),
    a('2027e', 2.0, 32.0, 10.0),
    a('2028e', 1.0, 31.0, 12.0),
    a('2029e', 7.0, 31.5, 9.0),
    a('2030e', 6.0, 32.0, 4.0),
    a('2031e', 5.0, 32.5, 3.5),
    a('2032e', 2.5, 32.5, 3.5),
    a('2033e', 2.0, 32.5, 3.5),
  ],
  wacc: { tasa_libre_pct: 5.21, beta: 0.9, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.5, tasa_impositiva_pct: 21, peso_deuda_pct: 26 },
  terminal: { metodo: 'gordon', crecimiento_pct: 1.5, multiplo_salida: 11 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -3.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 1.0, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 2.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.0, multiplo_salida: null },
  ],
  pesos: { dcf: 60, comparables: 0, transacciones: 0, suma_partes: 0, escenarios: 40 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 9.0, precio_pct: 6.0, otros_pct: 0 },
    { periodo: '2027e', volumen_pct: 5.0, precio_pct: -3.0, otros_pct: 0 },
    { periodo: '2028e', volumen_pct: 3.0, precio_pct: -2.0, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 7.0, precio_pct: 0, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 5.0, precio_pct: 1.0, otros_pct: 0 },
  ],
  mercado_final: { periodo: '2033e', tamano: 240000 },
};
