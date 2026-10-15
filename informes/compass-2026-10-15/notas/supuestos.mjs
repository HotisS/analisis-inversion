// Supuestos del DCF, escenarios y pesos de Compass (corte 2026-10-15). Ejercicio a septiembre (FY2026e = oct-25 a sep-26, ya cerrado
// pero sin publicar: fijo). USD. EBITDA subyacente (sin cargos de compras). Capex = inmovilizado + intangibles + activos de contratos +
// anticipos a clientes (≈ 3,3-3,7 % de las ventas) + altas de derechos de uso (≈ 0,6 %); los arrendamientos van en el puente.
const a = (periodo, g, m, am, cx, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: cx, nwc_pct_ventas: -3.0, tasa_impositiva_pct: 25.5, fijo });
export default {
  anios: [
    a('FY2026e', 9.8, 10.2, 2.88, 4.2, true),
    a('FY2027e', 7.5, 10.3, 2.9, 4.1),
    a('FY2028e', 7.0, 10.4, 2.9, 4.0),
    a('FY2029e', 6.5, 10.5, 2.9, 3.9),
    a('FY2030e', 6.0, 10.55, 2.9, 3.8),
    a('FY2031e', 5.5, 10.6, 2.9, 3.7),
    a('FY2032e', 5.0, 10.6, 2.9, 3.6),
    a('FY2033e', 4.5, 10.6, 2.9, 3.5),
    a('FY2034e', 4.0, 10.6, 2.9, 3.4),
    a('FY2035e', 3.5, 10.6, 2.9, 3.3),
  ],
  wacc: { tasa_libre_pct: 5.19, beta: 0.85, prima_mercado_pct: 5.0, prima_adicional_pct: 0, coste_deuda_pct: 5.0, tasa_impositiva_pct: 25.5, peso_deuda_pct: 14 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 13 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -0.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.0, ajuste_margen_pp: 0.3, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 10, transacciones: 0, suma_partes: 0, escenarios: 40 },
  puente_ingresos: [
    { periodo: 'FY2026e', volumen_pct: 4.5, precio_pct: 2.7, otros_pct: 2.6 },
    { periodo: 'FY2027e', volumen_pct: 4.9, precio_pct: 2.3, otros_pct: 0.3 },
    { periodo: 'FY2028e', volumen_pct: 4.8, precio_pct: 2.2, otros_pct: 0 },
    { periodo: 'FY2029e', volumen_pct: 4.5, precio_pct: 2.0, otros_pct: 0 },
    { periodo: 'FY2030e', volumen_pct: 4.0, precio_pct: 2.0, otros_pct: 0 },
  ],
  mercado_final: { periodo: 'FY2030e', tamano: 448600 },
};
