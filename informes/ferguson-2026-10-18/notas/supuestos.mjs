// Supuestos del DCF, escenarios y pesos de Ferguson (corte 2026-10-18). Años naturales (2026e = ene-dic 2026), USD, US GAAP.
// 2026e fijo: seis meses reales (ventas +4,2 %, margen operativo ajustado 9,7 %) y guía elevada en agosto (un dígito medio sin FloWorks) más FloWorks desde el 31-ago (≈ 1.000 M anuales, ≈ 330 M en 2026).
// Capex desde 2027e del 2,2 %: el 1,2-1,3 % de capex más ≈ 1 % de compras pequeñas recurrentes (el crecimiento proyectado las incluye).
const a = (periodo, g, m, fijo = false, capex = 2.2) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: 1.25, capex_pct_ventas: capex, nwc_pct_ventas: 15.5, tasa_impositiva_pct: 25.5, fijo });
export default {
  anios: [
    a('2026e', 6.0, 10.4, true, 1.3),
    a('2027e', 7.0, 10.6),
    a('2028e', 5.5, 10.8),
    a('2029e', 5.0, 10.9),
    a('2030e', 5.0, 11.0),
    a('2031e', 4.5, 11.0, false, 2.0),
    a('2032e', 4.5, 11.0, false, 2.0),
    a('2033e', 4.0, 11.0, false, 2.0),
    a('2034e', 4.0, 11.0, false, 2.0),
    a('2035e', 3.5, 11.0, false, 2.0),
  ],
  wacc: { tasa_libre_pct: 5.09, beta: 1.05, prima_mercado_pct: 5.0, prima_adicional_pct: 0, coste_deuda_pct: 5.2, tasa_impositiva_pct: 25.5, peso_deuda_pct: 12.7 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 13 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -1.2, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 0.6, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 25, transacciones: 0, suma_partes: 0, escenarios: 25 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 1.5, precio_pct: 2.0, otros_pct: 2.5 },
    { periodo: '2027e', volumen_pct: 2.5, precio_pct: 2.0, otros_pct: 2.5 },
    { periodo: '2028e', volumen_pct: 2.5, precio_pct: 2.0, otros_pct: 1.0 },
    { periodo: '2029e', volumen_pct: 2.0, precio_pct: 2.0, otros_pct: 1.0 },
    { periodo: '2030e', volumen_pct: 2.0, precio_pct: 2.0, otros_pct: 1.0 },
  ],
  mercado_final: { periodo: '2035e', tamano: 569000 },
};
