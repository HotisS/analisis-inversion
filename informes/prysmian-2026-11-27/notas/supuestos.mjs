// Supuestos del DCF, escenarios y pesos de Prysmian (corte 2026-11-27). EUR, NIIF-UE, ejercicio natural.
// EBITDA «recurrente» = EBIT + amortizaciones + no recurrentes = EBITDA ajustado − pagos en acciones − derivados de metal
// (2025: 2.284 M, 11,6 % de las ventas a precios corrientes del metal). Los arrendamientos van dentro de la deuda
// financiera (NIIF 16): el capex lleva ≈0,6 pp de altas de derechos de uso.
// Atkore se cerró el 19-oct-2026 (después del balance del 30-sep). Sus ventas y EBITDA van en la proyección (2 meses
// en 2026e, año entero desde 2027e: ≈2.600 M EUR de ventas y ≈350 M de EBITDA ajustado) y su valor empresa (3.800 M
// USD = 3.462 M EUR al cambio del BCE del 26-nov) va como inversión de 2027e (capex), como en el informe del 15-oct,
// para que la prueba de reinversión vea lo que cuesta ese crecimiento. Como se pagó el 19-oct y no a mitad de 2027,
// el puente suma la diferencia de descuento (3.462 − 3.462 / 1,0755^0,59 ≈ 145 M) a otros_ajustes: el valor por
// acción es el mismo que con la compra entera en el puente. otros_ajustes = híbrido 1.000 + Xtera 52 (80 % de 65 M
// USD) + 145 = 1.197.
const a = (periodo, g, m, capex, amort = 3.3, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: amort, capex_pct_ventas: capex, nwc_pct_ventas: 6.0, tasa_impositiva_pct: 24.5, fijo });
export default {
  anios: [
    a('2026e', 21.6, 12.6, 4.6, 3.1, true), // 23.900 M de ventas; EBITDA ajustado 3.100 M (punto medio de la guía) − 75 M de pagos en acciones
    a('2027e', 18.0, 13.3, 17.1), // 4,8 % + Atkore (3.462 M = 12,3 % de las ventas de 2027e, ver cabecera); plan de >700 M en Encore Wire
    a('2028e', 6.5, 13.6, 4.6),
    a('2029e', 5.5, 13.6, 4.3),
    a('2030e', 5.0, 13.5, 4.3),
    a('2031e', 4.5, 13.3, 4.0),
    a('2032e', 4.0, 13.1, 3.8),
    a('2033e', 3.5, 13.0, 3.6),
  ],
  wacc: { tasa_libre_pct: 3.32, beta: 1.0, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 4.0, tasa_impositiva_pct: 24, peso_deuda_pct: 22 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 11 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.0, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 15, transacciones: 0, suma_partes: 0, escenarios: 35 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 6.5, precio_pct: 2.6, otros_pct: 12.5 },
    { periodo: '2027e', volumen_pct: 4.0, precio_pct: 1.0, otros_pct: 13.0 },
    { periodo: '2028e', volumen_pct: 5.0, precio_pct: 1.5, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 4.0, precio_pct: 1.5, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 3.5, precio_pct: 1.5, otros_pct: 0 },
  ],
  mercado_final: { periodo: '2033e', tamano: 339000 },
};
