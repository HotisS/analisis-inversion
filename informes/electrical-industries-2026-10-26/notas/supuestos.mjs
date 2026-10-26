// Supuestos del DCF, escenarios y pesos de Electrical Industries Company (EIC, corte 2026-10-26). SAR, ejercicio natural, NIIF (SOCPA).
// 2026e con los 9M26 publicados (ventas de 2.000,5 M, +25,2 %; resultado operativo de 591,8 M; margen bruto del 36,6 %) y un 4T26
// de ≈ 700 M (como el 4T25, 698 M: parte de las entregas retrasadas del 3T26 pasa al 4T, pero la guerra y Ormuz siguen):
// ventas 2026e ≈ 2.700 M (+17,6 %) frente a 2.870 M (+25 %) del informe del 19-oct. Margen EBITDA 2026e del 30,8 % (31,0 % en los 9M26:
// resultado operativo + ≈ 29 M de amortización; 4T al 30 %). El 3T26 (margen bruto del 33,9 % frente al 39,9 % del 3T25) adelanta
// la vuelta del margen desde el máximo del ciclo: 29,5 % en 2027e y 24,5 % en 2031e (igual punto final que el 19-oct, un año antes
// en la senda). Capex: ampliación de 380 kV (192 M, hasta el 3T27) y fábrica de cubas y radiadores (150 M, 1T27-1T29) [B12].
const a = (periodo, g, m, am, cx, tx, nwc, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: cx, nwc_pct_ventas: nwc, tasa_impositiva_pct: tx, fijo });
export default {
  anios: [
    a('2026e', 17.6, 30.8, 1.5, 6.5, 6.0, 38.0, true),
    a('2027e', 10.0, 29.5, 1.8, 6.5, 6.0, 38.0),
    a('2028e', 8.0, 28.0, 2.1, 5.0, 6.0, 38.0),
    a('2029e', 6.0, 26.5, 2.3, 4.0, 6.0, 38.0),
    a('2030e', 4.5, 25.5, 2.5, 2.8, 6.0, 38.0),
    a('2031e', 3.5, 24.5, 2.6, 2.8, 6.0, 38.0),
  ],
  // Tasa libre en USD (el SAR está anclado a 3,75 por USD): Treasury a 10 años 4,96 % (FRED, 22-oct-2026) + diferencial soberano
  // de Arabia Saudí 0,51 % (Damodaran, Aa3) = 5,47 %. Prima de país 0,78 % (Damodaran) como prima adicional.
  // Beta 1,1: la ajustada mensual de 5 años frente al KSA es 1,11 (bruta 1,16); desapalancada con la deuda de EIC (D/E ≈ 1,2 %,
  // tipo efectivo del 6 %) da 1,10 y reapalancada con la misma estructura vuelve a 1,11: con caja neta la deuda casi no la mueve.
  wacc: { tasa_libre_pct: 5.47, beta: 1.1, prima_mercado_pct: 5.5, prima_adicional_pct: 0.78, coste_deuda_pct: 5.5, tasa_impositiva_pct: 6.0, peso_deuda_pct: 1 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 9 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -5.0, ajuste_margen_pp: -5.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [{ periodo: '2027e', crecimiento_pp: -15.0, margen_pp: -3.0 }] },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 5.0, ajuste_margen_pp: 2.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 40, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 40 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 13.6, precio_pct: 4.0, otros_pct: 0 },
    { periodo: '2027e', volumen_pct: 8.0, precio_pct: 2.0, otros_pct: 0 },
    { periodo: '2028e', volumen_pct: 7.0, precio_pct: 1.0, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 6.0, precio_pct: 0, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 5.0, precio_pct: -0.5, otros_pct: 0 },
  ],
  // Mercado final: sin tamaño fiable (Mordor da 1.000 M USD de transformadores en Arabia Saudí en 2025, menos de lo que factura EIC en
  // transformadores y subestaciones). Prueba manual con el plan de inversión de SEC.
  mercado_final: null,
};
