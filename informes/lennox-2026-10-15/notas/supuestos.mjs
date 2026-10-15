// Supuestos del DCF, escenarios y pesos de Lennox (corte 2026-10-15). Ejercicio natural, USD, US GAAP.
// 2026e fijo: dos trimestres publicados y guía de ventas +8 % (5 puntos de compras) y BPA 23-24 USD.
// Amortización ≈2,3 % de ventas (incluye ≈25 M de intangibles de las compras); capex: guía 2026 de 225 M (4,0 %) que baja al 2,5 %.
// Circulante comercial (existencias + clientes − proveedores): 24,9 % en 2025 por el inventario del cambio de refrigerante; 19-21 % en 2023-2024.
const a = (periodo, g, m, capex, nwc, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: 2.3, capex_pct_ventas: capex, nwc_pct_ventas: nwc, tasa_impositiva_pct: 20.5, fijo });
export default {
  anios: [
    a('2026e', 8.0, 21.8, 4.0, 23.0, true),
    a('2027e', 5.5, 22.3, 3.3, 22.0),
    a('2028e', 5.0, 22.6, 3.0, 21.5),
    a('2029e', 4.5, 22.8, 2.8, 21.0),
    a('2030e', 4.0, 22.8, 2.6, 21.0),
    a('2031e', 3.5, 22.8, 2.5, 21.0),
    a('2032e', 3.0, 22.8, 2.5, 21.0),
    a('2033e', 3.0, 22.8, 2.5, 21.0),
  ],
  wacc: { tasa_libre_pct: 5.21, beta: 1.05, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.3, tasa_impositiva_pct: 20.5, peso_deuda_pct: 13 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 14 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -2.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 15, transacciones: 0, suma_partes: 0, escenarios: 35 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: -1.0, precio_pct: 3.0, otros_pct: 6.0 },
    { periodo: '2027e', volumen_pct: 1.5, precio_pct: 2.5, otros_pct: 1.5 },
    { periodo: '2028e', volumen_pct: 2.5, precio_pct: 2.5, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 2.0, precio_pct: 2.5, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 1.5, precio_pct: 2.5, otros_pct: 0 },
  ],
  mercado_final: { periodo: '2033e', tamano: 69300 },
};
