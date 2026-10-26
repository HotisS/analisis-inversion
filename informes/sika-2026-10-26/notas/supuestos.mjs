// Supuestos numéricos del analista (Sika, corte 2026-10-26). Base: 2025 real (11.201,3 M CHF; EBITDA 2.064,7 M con 86,2 M de Fast Forward).
// 2026e casi cerrado (9M26 publicado, guía reiterada): 4T26 ≈ 2.754 M (+5 % en CHF sobre 2.623 M del 4T25) → 11.466 M (+2,4 %);
// EBITDA 4T ≈ 19,0 % → 2.199 M (19,2 %).
// Crecimiento en CHF = orgánico en moneda local (3,5-4 %) − arrastre del franco (≈1 punto al año, diferencial de inflación)
// + compras ya cerradas (Akkim en 2027). No se proyectan compras futuras (su precio no está en el puente).
// Circulante al nivel real de 2025: (1.237,5 + 2.012,3 − 1.176,4) / 11.201,3 = 18,5 % (aviso del hilo: nunca 0 %).
// Capex con las altas de arrendamientos (NIIF 16): 375 M de capex + ≈140 M de arrendamientos en 2025 = 4,6 % de las ventas.
const crec = [2.4, 4.0, 3.5, 3.5, 3.0, 3.0, 2.5, 2.0, 1.5, 1.0];
const margen = [19.2, 19.8, 20.3, 20.6, 20.8, 21.0, 21.0, 21.0, 21.0, 21.0];
const amort = [4.8, 4.7, 4.6, 4.5, 4.4, 4.3, 4.2, 4.1, 4.0, 4.0];
const capex = [4.5, 4.6, 4.6, 4.5, 4.5, 4.4, 4.3, 4.2, 4.1, 4.1];
const IMPUESTO = 23.5; // 2023 20,5 %; 2024 20,2 %; 2025 22,9 %; 9M26 24,3 %
const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: g, margen_ebitda_pct: margen[i], amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i], nwc_pct_ventas: 18.5, tasa_impositiva_pct: IMPUESTO, fijo: i === 0,
}));

// BPA propio (misma base que la historia del PER: sin no recurrentes). Ventas × (margen EBITDA − amortización) − resultado
// financiero − impuestos − minoritarios (1 M) ÷ 160,48 M de acciones. Cuadre con 2026e: 7,27 CHF (9M26 5,52 + 4T ≈ 1,75).
const VENTAS_2025 = 11201.3, ACCIONES = 160.48;
const FIN = { '2026e': -125, '2027e': -115, '2028e': -105 };
export function bpa(periodo, dg = 0, dm = 0) {
  let v = VENTAS_2025, out = null;
  for (const a of anios) {
    const fijo = a.fijo; v *= 1 + (a.crecimiento_pct + (fijo ? 0 : dg)) / 100;
    if (a.periodo === periodo) {
      const ebit = v * (a.margen_ebitda_pct + (fijo ? 0 : dm) - a.amortizacion_pct_ventas) / 100;
      out = ((ebit + FIN[periodo]) * (1 - IMPUESTO / 100) - 1) / ACCIONES;
      break;
    }
  }
  return Math.round(out * 100) / 100;
}

const casos = [
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 0.5, multiplo_salida: null },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 0.8, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
];

export default {
  anios,
  // Beta: desapalancada y corregida por caja de Damodaran (química de especialidades, Europa) 1,013, reapalancada con la deuda
  // propia a valor de mercado: D/E = (5.622 + 455 + 166) / 28.919 = 0,216 → 1,013 × (1 + 0,765 × 0,216) = 1,18.
  // Peso de la deuda 6.243 / (6.243 + 28.919) = 17,8 %. Coste de la deuda 2,8 % (bonos en CHF y EUR y el híbrido).
  wacc: { tasa_libre_pct: 0.59, beta: 1.18, prima_mercado_pct: 5.5, prima_adicional_pct: 1.0, coste_deuda_pct: 2.8, tasa_impositiva_pct: IMPUESTO, peso_deuda_pct: 17.8 },
  terminal: { metodo: 'gordon', crecimiento_pct: 0.8, multiplo_salida: 13 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 1.5, precio_pct: 2.0, otros_pct: -1.1 },
    { periodo: '2027e', volumen_pct: 2.0, precio_pct: 1.5, otros_pct: 0.5 },
    { periodo: '2028e', volumen_pct: 2.5, precio_pct: 2.0, otros_pct: -1.0 },
    { periodo: '2029e', volumen_pct: 2.5, precio_pct: 2.0, otros_pct: -1.0 },
    { periodo: '2030e', volumen_pct: 2.0, precio_pct: 2.0, otros_pct: -1.0 },
  ],
  // Mercado de Sika (100.000 M CHF en 2026 según la empresa), al 4,3 % anual de ResearchAndMarkets menos 1 punto de divisa → 2030e.
  mercado_final: { periodo: '2030e', tamano: Math.round(100000 * 1.033 ** 4) },
  casos,
  pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
};
