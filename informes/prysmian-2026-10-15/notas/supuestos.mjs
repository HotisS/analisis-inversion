// Supuestos del DCF, escenarios y pesos de Prysmian (corte 2026-10-15). EUR, NIIF-UE, ejercicio natural.
// EBITDA «recurrente» = EBIT + amortizaciones + no recurrentes = EBITDA ajustado − pagos en acciones − derivados de metal
// (2025: 2.284 M, 11,6 % de las ventas a precios corrientes del metal). Los arrendamientos van dentro de la deuda
// financiera (NIIF 16): el capex lleva ≈0,6 pp de altas de derechos de uso.
// Atkore (cierre previsto el 19-oct-2026; EV 3.800 M USD = 3.390 M EUR) entra en la proyección desde 2027e
// (≈2.540 M EUR de ventas y ≈345 M de EBITDA) y su precio va como inversión de 2027e (capex), para que la prueba de
// reinversión vea lo que cuesta ese crecimiento; en el puente solo quedan el híbrido (1.000 M) menos la ampliación cobrada (850 M).
const a = (periodo, g, m, capex, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: 3.2, capex_pct_ventas: capex, nwc_pct_ventas: 6.0, tasa_impositiva_pct: 24, fijo });
export default {
  anios: [
    a('2026e', 13.5, 12.4, 4.6, true),
    a('2027e', 17.5, 12.9, 17.5), // 4,6 % + la compra de Atkore (3.390 M = 12,9 % de las ventas de 2027e)
    a('2028e', 7.0, 13.2, 4.6),
    a('2029e', 6.0, 13.4, 4.3),
    a('2030e', 5.0, 13.4, 4.3),
    a('2031e', 4.5, 13.2, 4.0),
    a('2032e', 4.0, 13.0, 4.0),
    a('2033e', 3.5, 13.0, 4.0),
  ],
  wacc: { tasa_libre_pct: 3.45, beta: 1.0, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 4.0, tasa_impositiva_pct: 24, peso_deuda_pct: 20 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 11 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.0, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 15, transacciones: 0, suma_partes: 0, escenarios: 35 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 7.0, precio_pct: 1.0, otros_pct: 5.5 },
    { periodo: '2027e', volumen_pct: 5.0, precio_pct: 1.0, otros_pct: 11.5 },
    { periodo: '2028e', volumen_pct: 5.0, precio_pct: 1.5, otros_pct: 0.5 },
    { periodo: '2029e', volumen_pct: 4.5, precio_pct: 1.5, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 3.5, precio_pct: 1.5, otros_pct: 0 },
  ],
  mercado_final: { periodo: '2033e', tamano: 339000 },
};
