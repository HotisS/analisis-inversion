// Supuestos del DCF, escenarios, pesos y BPA a 12 meses de Waste Connections (corte 2026-10-26, tras el 3T26). Ejercicio natural, USD.
// Margen del DCF = EBITDA contable (EBIT + amortizaciones) sin deterioros, menos 0,8 puntos por los deterioros y ajustes de cierre de
// vertederos que se repiten (191 M de media en 2017-2025). Margen ajustado de la empresa ≈ margen del DCF + 1,35 puntos
// (0,8 de esos cargos + ≈0,55 de actualización de provisiones y costes de compras que suma el EBITDA ajustado).
// 2026e (fijo): guía del 21-oct (ingresos ≈10.090 M = +6,6 %; EBITDA ajustado ≈3.345 M = 33,15 % → 31,8 % en la base del DCF).
// Capex 2026 = 1.250 M de guía + 56 M de terrenos + ≈400 M de compras del año (369 M pagados en 9M26), porque el crecimiento de 2026
// las incluye. Desde 2027, crecimiento orgánico más el arrastre de compras ya pagadas y de las plantas de gas renovable (≈1 punto en 2027)
// y capex sin compras nuevas.
const a = (periodo, g, m, am, cx, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: cx, nwc_pct_ventas: -1.5, tasa_impositiva_pct: 24, fijo });
const anios = [
  a('2026e', 6.6, 31.8, 13.0, 16.9, true),
  a('2027e', 5.5, 32.1, 12.9, 12.3),
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

// BPA ajustado (base de la empresa, del consenso y de la historia del PER: sin amortización de intangibles comprados ni deterioros).
// BPA = (ventas × margen ajustado − depreciación 11,1 % − actualización de provisiones 0,4 % − intereses netos) × (1 − 23 %) ÷ 250,1 M acciones
// (250,25 M a 30-sep − 0,64 M recompradas en octubre + 0,53 M de dilución; sin recompras futuras ni compras nuevas).
// Cuadre con el último ejercicio real: 2025 = 9.466,9 × 33,0 % − 1.031 − ≈48 − ≈322 → × 0,77 ÷ 258,0 = 5,14 USD frente a 5,15 publicado.
// 2026e con la guía: 5,55 USD sin los 40 M de otros ingresos de 9M26 (no recurrentes) frente a 5,69 de consenso.
const R2026 = 10090;
const bpa = (g27, g28, mAdj28, int28) => {
  const r = R2026 * (1 + g27 / 100) * (1 + g28 / 100);
  const ebita = r * mAdj28 / 100 - r * 0.111 - r * 0.004;
  return { ventas: Math.round(r), ebita: Math.round(ebita), bpa: Math.round(((ebita - int28) * 0.77 / 250.1) * 100) / 100 };
};
const bpa12m = {
  Bajista: bpa(4.0, 3.5, 32.3, 385),
  Base: bpa(5.5, 5.0, 33.8, 375),
  Alcista: bpa(6.5, 6.0, 34.5, 375),
  base2027: bpa(5.5, 0, 33.45, 375),
};

export default {
  anios,
  // Beta: desapalancada de WM, RSG, GFL y CWST (ajustadas mensuales de 5 años 0,59 / 0,55 / 0,79 / 0,81 con su deuda/capitalización de Yahoo:
  // 0,50 / 0,48 / 0,54 / 0,69; mediana 0,52) y reapalancada con la deuda de WCN (9.435 / 46.670 = 0,202; impuesto 24 %): 0,52 × 1,154 = 0,60.
  wacc: { tasa_libre_pct: 5.0, beta: 0.60, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 4.8, tasa_impositiva_pct: 24, peso_deuda_pct: 16.8 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 15 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos,
  pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: -1.3, precio_pct: 4.7, otros_pct: 3.2 },
    { periodo: '2027e', volumen_pct: 0.0, precio_pct: 4.5, otros_pct: 1.0 },
    { periodo: '2028e', volumen_pct: 0.5, precio_pct: 4.5, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 0.5, precio_pct: 4.1, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 0.5, precio_pct: 3.7, otros_pct: 0 },
  ],
  mercado_final: { periodo: '2030e', tamano: 141000 },
  bpa12m,
};
