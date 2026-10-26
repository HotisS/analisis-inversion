// Supuestos numéricos del analista (CME Group, corte 2026-10-26). Base: 2025 (6.520,6 M USD de ingresos, EBITDA 4.560,4 M, 69,9 %).
// 2026e casi cerrado: 9M26 publicado (5.323,6 M, +9,4 %) y 4T26 con volumen del trimestre +17 % a la fecha (conferencia): fijo.
const crec = [8.8, 4.0, 5.5, 5.0, 5.0, 4.5, 4.0, 3.5];
const margen = [70.7, 71.0, 71.5, 71.5, 71.5, 71.5, 71.5, 71.5];
// Amortización total (depreciación ≈ 1,5-1,6 % + intangibles comprados, ≈ 223 M al año hasta 2030 y el resto después); el último año, igual al capex.
const amort = [4.7, 4.55, 4.4, 4.2, 4.1, 3.95, 3.8, 2.0];
const capex = [1.2, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0];
const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i],
  // Circulante a su nivel real: clientes 639,2 − proveedores 71,8 = 567 M en 2025, el 8,7 % de las ventas [A6]; se mantiene al 9 %.
  nwc_pct_ventas: 9.0,
  tasa_impositiva_pct: 24,
  fijo: i === 0,
}));

export default {
  anios,
  // Beta reapalancada con la deuda de CME: mediana de betas desapalancadas de ICE (0,77), Deutsche Börse (0,79), LSEG (0,70) y
  // la ajustada semanal de CME (0,57 → 0,56 desapalancada) = 0,735; D/E de CME = 3.425 / 109.600 = 3,1 %;
  // 0,735 × (1 + 0,76 × 0,031) = 0,752 → 0,75.
  wacc: { tasa_libre_pct: 5.0, beta: 0.75, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.3, tasa_impositiva_pct: 24, peso_deuda_pct: 3 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 16 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  mitad_de_anio: true,
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 7.5, precio_pct: 1.0, otros_pct: 0.3 },
    { periodo: '2027e', volumen_pct: 2.0, precio_pct: 1.0, otros_pct: 1.0 },
    { periodo: '2028e', volumen_pct: 3.0, precio_pct: 1.5, otros_pct: 1.0 },
    { periodo: '2029e', volumen_pct: 2.5, precio_pct: 1.5, otros_pct: 1.0 },
    { periodo: '2030e', volumen_pct: 2.5, precio_pct: 1.5, otros_pct: 1.0 },
  ],
  mercado_final: null,
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -2.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 40, comparables: 35, transacciones: 0, suma_partes: 0, escenarios: 25 },
  // Puente a 30-sep-2026 [A1, A2]: bonos 3.425,1 M; caja 2.198,5 M + 225 M depositados en la FICC.
  // Asociadas = valor de lo que el EBITDA no recoge (estimación propia sobre el 3T26 anualizado):
  // S&P DJI (27 %) y FanDuel (51 %): ≈ 410 M de resultado antes de impuestos × (1 − 23,5 %) × 18 ≈ 5.650 M;
  // diferencial neto de las garantías de los miembros (1.391,7 − 1.269,0 = 122,7 M en el 3T26) más intereses de la caja propia:
  // ≈ 485 M al año × 0,765 × 10 ≈ 3.700 M. Total ≈ 9.400 M.
  puente: { fecha: '2026-09-30', deuda_financiera: 3425, arrendamientos: 0, caja: 2424, minoritarios: 0, pensiones: 0, asociadas: 9400, otros_ajustes: 0 },
};
