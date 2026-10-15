// Supuestos del DCF, escenarios y pesos de EMCOR (corte 2026-10-15). Ejercicio natural, USD, US GAAP.
// EBITDA = EBIT + depreciación + amortización de intangibles comprados (≈1,0 % de las ventas en 2026 por Miller y las compras de 2026).
// Capex = inmovilizado (0,7 % de las ventas en 2025) más una parte de las compras recurrentes de pequeños instaladores (la amortización de intangibles converge al capex).
// Circulante: clientes + activos de contrato + existencias − proveedores − pasivos de contrato (6,0-7,5 % de las ventas en 2023-2025).
const a = (periodo, g, m, am, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: 0.9, nwc_pct_ventas: 7.0, tasa_impositiva_pct: 26.5, fijo });
export default {
  anios: [
    a('2026e', 19.5, 10.7, 1.05, true),
    a('2027e', 11.5, 10.7, 1.05),
    a('2028e', 8.0, 10.7, 1.0),
    a('2029e', 7.0, 10.4, 0.95),
    a('2030e', 6.0, 10.1, 0.9),
    a('2031e', 5.0, 9.8, 0.9),
    a('2032e', 4.5, 9.5, 0.9),
    a('2033e', 4.0, 9.2, 0.9),
  ],
  wacc: { tasa_libre_pct: 5.21, beta: 1.1, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.5, tasa_impositiva_pct: 26.5, peso_deuda_pct: 0 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 12 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -4.0, ajuste_margen_pp: -2.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.5, ajuste_margen_pp: 0.8, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 15.0, precio_pct: 3.0, otros_pct: 1.5 },
    { periodo: '2027e', volumen_pct: 6.5, precio_pct: 3.0, otros_pct: 2.0 },
    { periodo: '2028e', volumen_pct: 5.0, precio_pct: 3.0, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 4.0, precio_pct: 3.0, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 3.0, precio_pct: 3.0, otros_pct: 0 },
  ],
  mercado_final: { periodo: '2033e', tamano: 600000 },
};
