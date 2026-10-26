// Supuestos numéricos del analista (Iberdrola, corte 2026-10-26). Base: 2025 real del XBRL con el EBITDA de la empresa
// (ingresos 44.076 M, EBITDA 15.956 M = 36,2 %, EBIT 9.755 M) [A1]. 9M26: ingresos 34.405 M (+6,2 %), EBITDA 11.891 M
// (sin partidas no recurrentes; 9M25 tenía 912 M), EBIT 7.645 M, amortizaciones 4.246 M (12,3 % de las ventas) [A2].
// Ingresos: +5 % en 2026 (9M +6,2 %; consenso 45.625 M, +3,5 %) y +5 % en 2027-2028 (base de activos +12-14 % anual,
// Caruna desde 2027, ≈+1 punto), después bajan al 2 %. Margen: sube con la mezcla (Redes, 54 % del EBITDA ajustado, crece
// un 15 %) de 35,0 % (2026e: 11.891 M en 9M + ≈4.300 M en el 4T) a 37,3 % en 2028 y 38 % estable: EBITDA de ≈19.000 M
// en 2028 (consenso 19.259 M) [D1].
// Inversión: 10.087 M en 9M26 (+13 %) → ≈14.000 M en 2026 (30 % de las ventas), 29-29,5 % en 2027-2028 (plan de
// inversión récord y día del inversor en marzo de 2027) y bajada gradual al 19,5 % en 2035: 5,5 puntos por encima de la
// amortización (14 %) para que el 2 % terminal se financie con un ROIC del ≈6,5 % (no con capital gratis).
// Circulante: a su nivel real, 14 % de las ventas (clientes 10.284 + existencias 2.364 − proveedores 6.463 = 6.185 M en
// 2025 [A1]); consume caja al crecer, no libera caja inexistente.
// Impuestos: 20 % (efectivo 20,6 % en 2025 y 18,2 % en 9M26 sin los «capital allowances») [A1, A2].
const crec = [5.0, 5.0, 5.0, 4.0, 3.5, 3.0, 2.5, 2.5, 2.0, 2.0];
const margen = [35.0, 36.3, 37.3, 37.8, 38.0, 38.0, 38.0, 38.0, 38.0, 38.0];
const amort = [12.3, 12.6, 12.9, 13.2, 13.5, 13.8, 14.0, 14.0, 14.0, 14.0];
const capex = [30.0, 29.5, 29.0, 27.0, 25.5, 24.0, 22.5, 21.0, 20.0, 19.5];
const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: 14.0,
  tasa_impositiva_pct: 20,
  fijo: i === 0,
}));

// Beta: la observada de Iberdrola frente al índice de utilities europeas (0,63 mensual a 5 años [D8]) se desapalanca con su
// deuda media del periodo (D/E ≈ 0,40 a mercado; t 20 %): βu ≈ 0,48; tomamos 0,50 (reguladas europeas 0,45-0,55) y la
// reapalancamos con la deuda propia de hoy: deuda neta de 56.983 M [A5] frente a 143.700 M de capitalización (21,90 € ×
// 6.563 M): D/E = 0,397 → β = 0,50 × (1 + 0,8 × 0,397) = 0,66. Peso de la deuda 28 %.
// Bund 3,39 % (23-oct) [D13]; prima 5,5 %; +0,5 puntos por Brasil (17 % del EBITDA); coste de la deuda 4,93 % [A2].
export default {
  anios,
  wacc: { tasa_libre_pct: 3.39, beta: 0.66, prima_mercado_pct: 5.5, prima_adicional_pct: 0.5, coste_deuda_pct: 4.93, tasa_impositiva_pct: 20, peso_deuda_pct: 28 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.0, multiplo_salida: 11.0 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  mitad_de_anio: true,
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 3.5, precio_pct: 1.5, otros_pct: 0 },
    { periodo: '2027e', volumen_pct: 3.0, precio_pct: 1.0, otros_pct: 1.0 },
    { periodo: '2028e', volumen_pct: 4.0, precio_pct: 1.0, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 3.0, precio_pct: 1.0, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 2.5, precio_pct: 1.0, otros_pct: 0 },
  ],
  mercado_final: null,
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -1.5, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 1.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.0, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 60, comparables: 0, transacciones: 0, suma_partes: 0, escenarios: 40 },
};
