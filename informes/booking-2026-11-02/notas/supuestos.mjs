// Supuestos numéricos (Booking Holdings, corte 2026-11-02). Base: 2025 (26.917 M USD de ingresos; EBITDA ajustado 9.937 M, 36,9 %).
// 2026e fijo: dos trimestres publicados (1S26 +11,5 %) y guía del 3T26 de +4-6 % en ingresos: 3T26 ≈ 9.458 M (+5 %),
// 4T26 ≈ 6.793 M (+7 %) → 29.135 M (+8,2 %; consenso 29.256 M, +8,7 %). Margen 37,0 % (guía de EBITDA de un dígito alto).
const crec = [8.2, 8.0, 7.5, 7.0, 6.5, 6.0, 5.5, 5.0, 4.5, 4.0];
// Margen EBITDA (base del motor = publicado + no recurrentes: pagos en acciones como gasto). Ahorro de transformación de ≈650 M
// anuales a final de 2027 → 38 % en 2028 y se queda ahí (no suponemos más apalancamiento operativo).
const margen = [37.0, 37.5, 38.0, 38.0, 38.0, 38.0, 38.0, 38.0, 38.0, 38.0];
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
  // Tasa libre: Tesoro a 10 años, 30-oct-2026, 4,94 % [D11]. Beta 1,11 (mensual 5 años ajustada) [D9]. Kd 5,4 % (bono 2036) [D1].
  wacc: { tasa_libre_pct: 4.94, beta: 1.11, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.4, tasa_impositiva_pct: 21, peso_deuda_pct: 15.4 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 14 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 4.5, precio_pct: 1.0, otros_pct: 2.7 },
    { periodo: '2027e', volumen_pct: 5.0, precio_pct: 1.5, otros_pct: 1.5 },
    { periodo: '2028e', volumen_pct: 5.0, precio_pct: 1.5, otros_pct: 1.0 },
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
