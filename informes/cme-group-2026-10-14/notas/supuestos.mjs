// Supuestos numéricos del analista (CME Group, corte 2026-10-14). Base: 2025 (6.521 M USD de ingresos, EBITDA 4.560 M, 69,9 %).
// 2026e casi cerrado: 1S26 publicado (ingresos ≈ 3.579 M) y volumen del 3T26 conocido (+16 %): fijo.
const crec = [7.9, 5.5, 5.0, 5.0, 4.5, 4.0, 3.5, 3.0];
const margen = [72.0, 71.5, 71.5, 71.5, 71.5, 71.0, 71.0, 71.0];
const amort = [4.6, 4.2, 3.8, 3.4, 3.0, 2.6, 2.2, 2.0];
const capex = [1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0];
const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: 0,
  tasa_impositiva_pct: 24,
  fijo: i === 0,
}));

export default {
  anios,
  wacc: { tasa_libre_pct: 5.22, beta: 0.7, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.3, tasa_impositiva_pct: 24, peso_deuda_pct: 3 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 16 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  mitad_de_anio: true,
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 7.0, precio_pct: 1.0, otros_pct: -0.1 },
    { periodo: '2027e', volumen_pct: 3.0, precio_pct: 1.5, otros_pct: 1.0 },
    { periodo: '2028e', volumen_pct: 2.5, precio_pct: 1.5, otros_pct: 1.0 },
    { periodo: '2029e', volumen_pct: 2.5, precio_pct: 1.5, otros_pct: 1.0 },
    { periodo: '2030e', volumen_pct: 2.0, precio_pct: 1.5, otros_pct: 1.0 },
  ],
  mercado_final: null,
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -2.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 40, comparables: 35, transacciones: 0, suma_partes: 0, escenarios: 25 },
  // Puente a 30-jun-2026 [A3]. Asociadas = valor de lo que el EBITDA no recoge (estimación propia):
  // S&P DJI (27 %): ≈ 380 M de resultado antes de impuestos × (1 − 24 %) × 16 ≈ 4.600 M;
  // diferencial neto de las garantías de los miembros: ≈ 630 M antes de impuestos (resultado no operativo recurrente
  // de ≈ 1.000 M anualizado en el 2T26, menos S&P DJI y los intereses de la caja propia) × 0,76 × 10 ≈ 4.800 M.
  puente: { fecha: '2026-06-30', deuda_financiera: 3400, arrendamientos: 0, caja: 2300, minoritarios: 0, pensiones: 0, asociadas: 9400, otros_ajustes: 0 },
};
