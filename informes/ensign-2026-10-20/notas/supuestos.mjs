// Supuestos del DCF, escenarios y pesos de The Ensign Group (corte 2026-10-20). Millones de USD, US GAAP.
// EBITDA = EBIT GAAP + amortizaciones (después del alquiler de los centros arrendados y de la remuneración en acciones).
// Crecimiento: 2026e = guía (5.870-5.920 M, punto medio 5.895, +16,6 %), con dos trimestres publicados (fijo).
// 2027e = consenso de ventas (+11,2 %): ≈ 6 puntos orgánicos (ocupación, mezcla y tarifas) + ≈ 5 de compras.
// Después, las compras se van apagando y el orgánico converge a ≈ 4 %.
const g = [16.6, 11.2, 9.5, 8.0, 7.0, 6.0, 5.0, 4.0];
// Margen EBITDA: 10,5 % en 2025, 10,6 % LTM, 10,9 % en el 1S26; sube despacio al madurar los centros comprados en 2025-2026
// y se queda en 11,2 % (por debajo del 11,6-12,0 % de 2020-2022, años con ayudas COVID).
const m = [10.9, 11.0, 11.1, 11.2, 11.2, 11.2, 11.2, 11.2];
const am = [2.15, 2.2, 2.2, 2.2, 2.2, 2.2, 2.2, 2.2];
// Capex = inmovilizado (≈ 3,4 % de las ventas, LTM) + compras de centros e inmuebles: 0,6 USD por cada USD de ventas
// compradas (2025: 323 M de compras para ≈ 490 M de ventas de centros nuevos; muchos se alquilan y no se compran).
// 2026e: 376 M ya gastados en el 1S + ≈ 150 M en el 2S → ≈ 525 M (8,9 %) + 3,4 % = 12,3 %.
const cx = [12.3, 6.1, 5.6, 5.1, 4.8, 4.5, 4.2, 3.9];
const anios = g.map((x, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: x, margen_ebitda_pct: m[i], amortizacion_pct_ventas: am[i], capex_pct_ventas: cx[i],
  nwc_pct_ventas: 10.5, tasa_impositiva_pct: 25.0, fijo: i === 0,
}));
export default {
  anios,
  // Tasa libre: Tesoro a 10 años, 5,15 % el 19-oct-2026. Beta ajustada mensual a 5 años 0,77. Prima adicional 0,5 puntos
  // por el riesgo regulatorio y legal concreto (CID del DOJ, informes bajistas, demanda colectiva).
  wacc: { tasa_libre_pct: 5.15, beta: 0.77, prima_mercado_pct: 5.5, prima_adicional_pct: 0.5, coste_deuda_pct: 5.6, tasa_impositiva_pct: 25.0, peso_deuda_pct: 2 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 14.0 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 0.4, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 3.0, precio_pct: 4.0, otros_pct: 9.6 },
    { periodo: '2027e', volumen_pct: 2.5, precio_pct: 3.2, otros_pct: 5.5 },
    { periodo: '2028e', volumen_pct: 2.5, precio_pct: 3.0, otros_pct: 4.0 },
    { periodo: '2029e', volumen_pct: 2.0, precio_pct: 3.0, otros_pct: 3.0 },
    { periodo: '2030e', volumen_pct: 1.5, precio_pct: 3.0, otros_pct: 2.5 },
  ],
  // Gasto nacional en residencias y comunidades de jubilación de CMS: 219.900 M en 2024, con las tasas del actuario de CMS
  // (8 % en 2025, 6,2 % en 2026-2027, 5,6 % en 2028-2033) → ≈ 315.400 M en 2030 (estimación propia).
  mercado_final: { periodo: '2030e', tamano: 315400 },
};
