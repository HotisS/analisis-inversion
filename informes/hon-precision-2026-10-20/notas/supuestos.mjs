// Supuestos numéricos (Hon. Precision, corte 2026-10-20). Base: 2025 real (30.271 M TWD).
// 2026e fijo: ventas de enero-septiembre 40.713 M TWD (ventas mensuales oficiales de la ficha de la TWSE) + 4T26 ≈ 16.800 M
// (3T26 = 16.194 M; capacidad llena hasta fin de año y planta de Dasheng/得勝 que arranca a final de 2026): 57.515 M (+90 %).
// 2027e +45 %: capacidad +50 % a final de 2027 (media del año ≈ +35 %) y precio medio +10 % por el control térmico de 10 kW.
// 2028e +15 %, 2029e +5 %, 2030e 0 % (normalización del ciclo de inversión en IA), después 2-3 %.
const crec = [90, 45, 15, 5, 0, 3, 3, 2.5, 2, 2];
const margen = [49.0, 48.0, 46.0, 44.0, 42.0, 41.0, 40.0, 40.0, 40.0, 40.0];
const amort = [0.25, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.0];
const capex = [3.0, 2.5, 2.0, 1.5, 1.2, 1.2, 1.1, 1.1, 1.0, 1.0];
const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: 28,
  tasa_impositiva_pct: 20.5,
  fijo: i === 0,
}));

export default {
  anios,
  wacc: { tasa_libre_pct: 2.02, beta: 1.3, prima_mercado_pct: 5.5, prima_adicional_pct: 1.5, coste_deuda_pct: 2.5, tasa_impositiva_pct: 20, peso_deuda_pct: 0 },
  terminal: { metodo: 'gordon', crecimiento_pct: 1.5, multiplo_salida: 15 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 45, precio_pct: 40, otros_pct: 5 },
    { periodo: '2027e', volumen_pct: 33, precio_pct: 12, otros_pct: 0 },
    { periodo: '2028e', volumen_pct: 10, precio_pct: 5, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 3, precio_pct: 2, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: -2, precio_pct: 2, otros_pct: 0 },
  ],
  // Mercado final: equipos de prueba de SEMI (20.800 M USD en 2028e) + 4 % anual hasta 2030e = 22.500 M USD × 32,6 TWD/USD.
  mercado_final: { periodo: '2030e', tamano: 733500 },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -1, ajuste_margen_pp: -3, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null,
      perfil: [{ periodo: '2027e', crecimiento_pp: -20, margen_pp: -3 }, { periodo: '2028e', crecimiento_pp: -40, margen_pp: -8 }] },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2, ajuste_margen_pp: 1, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null,
      perfil: [{ periodo: '2027e', crecimiento_pp: 20, margen_pp: 1 }, { periodo: '2028e', crecimiento_pp: 40, margen_pp: 1 }] },
  ],
  pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
};
