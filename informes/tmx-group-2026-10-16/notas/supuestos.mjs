// Supuestos del DCF, escenarios y pesos de TMX Group (corte 2026-10-16). CAD, ejercicio natural.
// Ingresos publicados (incluyen el ingreso neto de tesorería de las cámaras CDCC y CDS).
// Margen EBITDA: el ajustado de la empresa menos ≈ 1 punto de costes de compras e integración que se repiten.
// Amortización sin la de intangibles de compras (≈ 114 M en 2025: no es caja); capex = software, equipos y altas de derechos de uso.
// RAFI (cerrada el 18-ago-2026) y Cboe Australia/Canadá entran en 2026e-2027e (puente: «otros»); MEMX queda fuera del caso base.
const a = (periodo, g, m, fijo = false, am = 3.6, cx = 5.0) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: cx, nwc_pct_ventas: 0.5, tasa_impositiva_pct: 25.5, fijo });
export default {
  anios: [
    a('2026e', 14.2, 59.5, true),
    a('2027e', 13.0, 59.5),
    a('2028e', 8.0, 60.0),
    a('2029e', 7.5, 60.5, false, 3.6, 4.8),
    a('2030e', 7.0, 60.5, false, 3.6, 4.8),
    a('2031e', 6.0, 60.5, false, 3.6, 4.8),
    a('2032e', 5.0, 60.5, false, 3.6, 4.8),
  ],
  wacc: { tasa_libre_pct: 3.85, beta: 0.8, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 4.5, tasa_impositiva_pct: 25.5, peso_deuda_pct: 15 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.75, multiplo_salida: 15 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -2.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 40, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 40 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 9.0, precio_pct: 1.0, otros_pct: 4.2 },
    { periodo: '2027e', volumen_pct: 6.0, precio_pct: 1.5, otros_pct: 5.5 },
    { periodo: '2028e', volumen_pct: 6.0, precio_pct: 2.0, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 5.5, precio_pct: 2.0, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 5.0, precio_pct: 2.0, otros_pct: 0 },
  ],
  mercado_final: null,
};
