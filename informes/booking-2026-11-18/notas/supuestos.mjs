// Supuestos numéricos (Booking Holdings, corte 2026-11-18). Base: 2025 (26.917 M USD de ingresos; EBITDA ajustado 9.937 M, 36,9 %).
// 2026e fijo: nueve meses publicados (ingresos ajustados 22.677 M, +10,3 %) y guía del 4T26 de 0-2 %: 4T26 ≈ 6.412 M (+1 %)
// → 29.090 M de ingresos ajustados (+8,1 %; sin la rebaja de 900 M de la FTC). 2027e +7,0 % (antes +8,0 %) y 2028e +7,0 % (antes +7,5 %):
// el 4T26 entra en 2027 con noches de +1-3 % y la inversión sube; el resto de la proyección no cambia.
const crec = [8.1, 7.0, 7.0, 7.0, 6.5, 6.0, 5.5, 5.0, 4.5, 4.0];
// Margen EBITDA (base del motor = publicado + no recurrentes: pagos en acciones como gasto; en 2025 fue 37,3 % frente al 36,9 % ajustado).
// 2026e: EBITDA ajustado de 9M26 8.545 M + 4T26 plano (≈ 2.195 M) = 10.740 M (36,9 % ajustado ≈ 37,2 % en la base del motor).
// 2027e se queda en 37,2 % (más inversión en vuelos, atracciones, IA y tecnología: el 4T26 sale plano) y el ahorro de transformación
// (≈ 650 M anuales en 2027) lleva el margen al 37,6 % en 2028e y al 38 % desde 2029e (antes 37,5 % en 2027 y 38 % desde 2028).
const margen = [37.2, 37.2, 37.6, 38.0, 38.0, 38.0, 38.0, 38.0, 38.0, 38.0];
const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: i < 5 ? 2.2 : 2.0,
  capex_pct_ventas: i < 5 ? 1.5 : 2.0,
  nwc_pct_ventas: -4.5,
  tasa_impositiva_pct: 21,
  fijo: i === 0,
}));

export default {
  anios,
  // Tasa libre: Tesoro a 10 años, 17-nov-2026, 5,10 % [D11]. Beta 1,09 (mensual 5 años ajustada) [D9]. Kd 5,4 % (bono 2036). Peso deuda 14,8 %.
  wacc: { tasa_libre_pct: 5.10, beta: 1.09, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.4, tasa_impositiva_pct: 21, peso_deuda_pct: 14.8 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 14 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 5.0, precio_pct: 2.0, otros_pct: 1.1 },
    { periodo: '2027e', volumen_pct: 4.5, precio_pct: 1.5, otros_pct: 1.0 },
    { periodo: '2028e', volumen_pct: 4.5, precio_pct: 1.5, otros_pct: 1.0 },
    { periodo: '2029e', volumen_pct: 4.5, precio_pct: 1.5, otros_pct: 1.0 },
    { periodo: '2030e', volumen_pct: 4.5, precio_pct: 1.5, otros_pct: 0.5 },
  ],
  // Mercado en ingresos equivalentes: viaje en línea de Phocuswright (≈1,2 billones USD en 2026 [B]) creciendo un 7 % anual hasta 2030
  // (≈1,57 billones) × comisión media de Booking (≈14,5 % de las reservas brutas [A1]) ≈ 228.000 M USD.
  mercado_final: { periodo: '2030e', tamano: 228000 },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.5, ajuste_margen_pp: -3.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.0, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 0.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 15, transacciones: 0, suma_partes: 0, escenarios: 35 },
};
