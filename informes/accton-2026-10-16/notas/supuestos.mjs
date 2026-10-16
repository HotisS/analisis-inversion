// Supuestos numéricos (Accton, corte 2026-10-16). Base: 2025 real (248.320 M TWD).
// 2026e fijo: 9M26 = 286.402 M TWD (ventas mensuales oficiales) + 4T26 ≈ 118.400 M (−2 % sobre el 3T26 por la consigna y la transición a Trainium 3).
const crec = [63, 33, 22, 10, 7, 5, 4, 3.5, 3, 2.5];
const margen = [15.0, 15.0, 15.0, 14.5, 14.0, 13.5, 13.0, 13.0, 13.0, 13.0];
const amort = [0.8, 0.9, 1.0, 1.1, 1.2, 1.2, 1.3, 1.3, 1.3, 1.3];
const capex = [3.2, 3.0, 2.5, 2.0, 1.8, 1.7, 1.6, 1.6, 1.5, 1.5];
const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: 11,
  tasa_impositiva_pct: 20.5,
  fijo: i === 0,
}));

export default {
  anios,
  wacc: { tasa_libre_pct: 2.03, beta: 1.2, prima_mercado_pct: 5.5, prima_adicional_pct: 1.0, coste_deuda_pct: 2.5, tasa_impositiva_pct: 20, peso_deuda_pct: 1 },
  terminal: { metodo: 'gordon', crecimiento_pct: 1.5, multiplo_salida: 12 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 58, precio_pct: 10, otros_pct: -5 },
    { periodo: '2027e', volumen_pct: 23, precio_pct: 10, otros_pct: 0 },
    { periodo: '2028e', volumen_pct: 15, precio_pct: 7, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 7, precio_pct: 3, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 5, precio_pct: 2, otros_pct: 0 },
  ],
  mercado_final: null,
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2, ajuste_margen_pp: -2, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null,
      perfil: [{ periodo: '2027e', crecimiento_pp: -33, margen_pp: -2.5 }, { periodo: '2028e', crecimiento_pp: -17, margen_pp: -2.5 }] },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 4, ajuste_margen_pp: 1, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null,
      perfil: [{ periodo: '2027e', crecimiento_pp: 6, margen_pp: 1 }, { periodo: '2028e', crecimiento_pp: 6, margen_pp: 1 }] },
  ],
  pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
};
