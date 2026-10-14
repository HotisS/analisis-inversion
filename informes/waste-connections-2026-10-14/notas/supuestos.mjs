// Supuestos del DCF, escenarios, pesos y BPA a 12 meses de Waste Connections (corte 2026-10-14). Ejercicio natural, USD.
// Margen del DCF = EBITDA contable (EBIT + amortizaciones) sin deterioros, menos 0,8 puntos por los deterioros y ajustes de cierre de
// vertederos que se repiten (191 M de media en 2017-2025). Margen ajustado de la empresa ≈ margen del DCF + 1,25 puntos
// (0,8 de esos cargos + ≈0,45 de actualización de provisiones y costes de compras que suma el EBITDA ajustado).
// Capex 2026 = 1.250 M de guía + ≈400 M de compras del año (el crecimiento de 2026 las incluye). Desde 2027, crecimiento orgánico
// (precio + volumen + arrastre de compras ya pagadas) y capex sin compras nuevas.
const a = (periodo, g, m, am, cx, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: cx, nwc_pct_ventas: -1.5, tasa_impositiva_pct: 24, fijo });
const anios = [
  a('2026e', 6.0, 31.7, 13.0, 16.4, true),
  a('2027e', 5.3, 32.1, 12.9, 12.3),
  a('2028e', 5.0, 32.4, 12.8, 12.2),
  a('2029e', 4.6, 32.6, 12.6, 12.1),
  a('2030e', 4.2, 32.8, 12.4, 12.0),
  a('2031e', 3.8, 32.9, 12.2, 12.0),
  a('2032e', 3.5, 32.9, 12.0, 12.0),
];
const casos = [
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -1.5, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.5, multiplo_salida: null },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.0, ajuste_margen_pp: 0.7, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
];

// BPA ajustado (base de la empresa y del consenso: sin amortización de intangibles comprados ni deterioros) por escenario.
// BPA = (ventas × margen ajustado − depreciación 11,1 % − actualización de provisiones 0,4 % − intereses netos) × (1 − 23,5 %) ÷ 251,5 M acciones
// (251,57 M a 31-jul-2026, sin recompras futuras). Cuadre: 2026e da 5,61 USD frente a 5,65 de consenso y 5,15 real de 2025.
const R2026 = 10035;
const bpa = (g27, g28, mAdj28, int28) => {
  const r = R2026 * (1 + g27 / 100) * (1 + g28 / 100);
  const ebita = r * mAdj28 / 100 - r * 0.111 - r * 0.004;
  return { ventas: Math.round(r), ebita: Math.round(ebita), bpa: Math.round(((ebita - int28) * 0.765 / 251.5) * 100) / 100 };
};
const bpa12m = {
  Bajista: bpa(3.8, 3.5, 32.15, 395),
  Base: bpa(5.3, 5.0, 33.65, 390),
  Alcista: bpa(6.3, 6.0, 34.35, 390),
  base2027: bpa(5.3, 0, 33.35, 375),
};

export default {
  anios,
  wacc: { tasa_libre_pct: 5.24, beta: 0.65, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 4.8, tasa_impositiva_pct: 24, peso_deuda_pct: 19.5 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 15 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos,
  pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: -1.2, precio_pct: 5.0, otros_pct: 2.2 },
    { periodo: '2027e', volumen_pct: 0.3, precio_pct: 4.5, otros_pct: 0.5 },
    { periodo: '2028e', volumen_pct: 0.5, precio_pct: 4.5, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 0.5, precio_pct: 4.1, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 0.5, precio_pct: 3.7, otros_pct: 0 },
  ],
  mercado_final: { periodo: '2030e', tamano: 141000 },
  bpa12m,
};
