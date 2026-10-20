// Supuestos numéricos del analista (Engie, corte 2026-10-20). Base: 2025 real, ventas 71.944 M; EBITDA sin participadas
// = EBITDA recurrente de la empresa (14.733 M) − parte recurrente de asociadas (1.008 M) = 13.725 M (19,1 %).
// 2026e: ventas −1 % (1S26 −3,6 % por precios; UKPN suma ≈800 M en 8 meses) y EBITDA ≈14.900 M con asociadas (guía 14.300-15.300 M).
// 2027e-2028e: EBIT sin nuclear en la mitad de la guía (10.300 y 10.800 M), con el nuclear belga fuera (venta neutra en valor).
// Inversión neta de ventas de activos: (34.000-38.000 − 6.000) / 3 ≈ 10.000 M al año en 2026-2028 (≈13,5-14 % de las ventas),
// sin el precio de UKPN (ya está en la deuda de junio); después baja hacia el 10 % (por encima de la amortización del 7,6 %).
const crec = [-1.0, 3.0, 2.6, 2.5, 2.5, 2.4, 2.3, 2.2, 2.1, 2.0];
const margen = [19.4, 20.1, 20.4, 20.5, 20.5, 20.5, 20.5, 20.5, 20.5, 20.5];
const amort = [7.2, 7.3, 7.45, 7.5, 7.55, 7.6, 7.6, 7.6, 7.6, 7.6];
const capex = [14.0, 14.0, 13.5, 13.0, 12.5, 12.0, 11.5, 11.0, 10.5, 10.0];
const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: 5.0,
  tasa_impositiva_pct: 22,
  fijo: i === 0,
}));

export default {
  anios,
  // Regla del repo: Bund a 10 años (3,49 % el 19-oct, Bundesbank) + prima. Beta 0,83 (ajustada, mensual 5 años frente al STOXX 600).
  // Prima de mercado 5,5 %. Prima adicional 0,8 puntos: 0,6 por Francia (≈40 % del negocio × 1,45 puntos de diferencial OAT-Bund)
  // y 0,2 por Latinoamérica. Coste de la deuda 4,4 % (coste medio bruto del 4,0 % a cierre de 2025; la deuda nueva cuesta más).
  // Peso de la deuda 50 %: deuda neta de ≈55.000 M más 6.700 M de híbridos frente a ≈57.800 M de capitalización.
  wacc: { tasa_libre_pct: 3.49, beta: 0.83, prima_mercado_pct: 5.5, prima_adicional_pct: 0.8, coste_deuda_pct: 4.4, tasa_impositiva_pct: 22, peso_deuda_pct: 50 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.0, multiplo_salida: 9.0 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  mitad_de_anio: true,
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 1.5, precio_pct: -2.5, otros_pct: 0 },
    { periodo: '2027e', volumen_pct: 2.5, precio_pct: 0.5, otros_pct: 0 },
    { periodo: '2028e', volumen_pct: 2.0, precio_pct: 0.6, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 1.8, precio_pct: 0.7, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 1.8, precio_pct: 0.7, otros_pct: 0 },
  ],
  mercado_final: null,
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -1.0, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 1.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 0.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 60, comparables: 0, transacciones: 0, suma_partes: 0, escenarios: 40 },
};
