// Supuestos numéricos (Schindler, corte 2026-10-14). Base: 2025 (10.947 M CHF; EBIT 1.384 M; amortización estimada 320 M).
// 2026e: ventas −1 % en francos (≈+2 % en moneda local y ≈−3 % de divisa, como el 1S26) y margen EBIT ≈13,2 % (guía ≈13 %).
const crec = [-1.0, 3.0, 3.5, 3.5, 3.0, 3.0, 2.5, 2.0, 1.5, 1.0];
// Margen EBITDA = EBIT + amortización del 2,9 %: 16,1 % en 2026e (EBIT 13,2 %) hasta 17,2 % (EBIT 14,3 %, algo por encima del
// 14,1 % que el consenso da para 2028e).
const margen = [16.1, 16.6, 17.0, 17.2, 17.2, 17.2, 17.2, 17.2, 17.2, 17.2];
const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: 2.9,
  // Capex del estado de flujos (≈1,0 % de ventas) + pagos de arrendamiento (≈1,5 %): 2,5 %; al final, igual a la amortización.
  capex_pct_ventas: i < 7 ? 2.5 : 2.9,
  // Circulante neto de anticipos ≈ 0 (los anticipos del equipo nuevo financian existencias y clientes; desglose no disponible).
  nwc_pct_ventas: 0,
  tasa_impositiva_pct: 21,
  fijo: i === 0,
}));

export default {
  anios,
  wacc: { tasa_libre_pct: 0.54, beta: 0.85, prima_mercado_pct: 5.5, prima_adicional_pct: 1.0, coste_deuda_pct: 2.0, tasa_impositiva_pct: 21, peso_deuda_pct: 3 },
  terminal: { metodo: 'gordon', crecimiento_pct: 1.0, multiplo_salida: 14 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  mitad_de_anio: true,
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 0.0, precio_pct: 2.0, otros_pct: -3.0 },
    { periodo: '2027e', volumen_pct: 1.0, precio_pct: 2.0, otros_pct: 0 },
    { periodo: '2028e', volumen_pct: 1.5, precio_pct: 2.0, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 1.5, precio_pct: 2.0, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 1.0, precio_pct: 2.0, otros_pct: 0 },
  ],
  mercado_final: null,
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -1.5, ajuste_margen_pp: -1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 0.75, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.0, ajuste_margen_pp: 0.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
};
