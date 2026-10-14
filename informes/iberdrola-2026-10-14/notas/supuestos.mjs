// Supuestos numéricos del analista (Iberdrola, corte 2026-10-14). Base: 2025 real con la definición de Stock Analysis
// (ingresos 44.076 M, EBITDA = EBIT + amortización = 15.558 M, 35,3 %).
// Ingresos: +3,5 % en 2026 (1S26 +4,2 % ajustado; consenso 45.710 M) y +4,5 % en 2027-2028 con la base de activos de redes
// creciendo con el plan de 58.000 M; después converge al 2,5 %.
// Margen: sube por la mezcla (Redes, 51 % del EBITDA, crece ≈+9-21 %; Producción y Clientes cae) hasta el 38,8 % en 2028,
// lo que da un EBITDA de ≈19.300 M en 2028 (+7,5 % anual), coherente con el beneficio ajustado de ≈7.600 M del plan.
// Inversión: 14.000-15.000 M al año en 2026-2028 (≈29-30 % de las ventas) y bajada gradual hasta el 17 % (≥ amortización).
const crec = [3.5, 4.0, 4.0, 3.5, 3.0, 2.5, 2.5, 2.5, 2.0, 2.0];
const margen = [36.5, 37.5, 38.3, 38.5, 38.5, 38.5, 38.5, 38.5, 38.5, 38.5];
const amort = [13.6, 14.0, 14.4, 14.6, 14.8, 15.0, 15.0, 15.0, 15.0, 15.0];
const capex = [30.0, 29.0, 28.0, 26.0, 24.0, 22.0, 20.0, 19.0, 18.0, 17.0];
const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: 0,
  tasa_impositiva_pct: 22,
  fijo: i === 0,
}));

export default {
  anios,
  // Bund 3,53 % (12-oct); beta 0,65 (eléctricas reguladas; la misma que Endesa); prima 5,5 %; +0,5 puntos por Brasil
  // (≈10 % del negocio); coste de la deuda 4,8 % (4,81 % en 2024); peso de la deuda: 54.000 M frente a ≈144.700 M de capitalización (27 %).
  wacc: { tasa_libre_pct: 3.53, beta: 0.65, prima_mercado_pct: 5.5, prima_adicional_pct: 0.5, coste_deuda_pct: 4.8, tasa_impositiva_pct: 22, peso_deuda_pct: 27 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.0, multiplo_salida: 11.0 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  mitad_de_anio: true,
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 2.5, precio_pct: 1.0, otros_pct: 0 },
    { periodo: '2027e', volumen_pct: 3.5, precio_pct: 0.5, otros_pct: 0 },
    { periodo: '2028e', volumen_pct: 3.5, precio_pct: 0.5, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 3.0, precio_pct: 0.5, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 2.5, precio_pct: 0.5, otros_pct: 0 },
  ],
  mercado_final: null,
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -1.0, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 1.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 0.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 60, comparables: 0, transacciones: 0, suma_partes: 0, escenarios: 40 },
};
