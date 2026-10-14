// Supuestos numéricos del analista (Novartis, corte 2026-10-14). Base: 2025, ingresos totales 56.674 M USD (ventas netas 54.500 + otros).
// EBITDA NIIF (incluye reestructuraciones y deterioros recurrentes); el margen operativo core ≈ EBITDA − 1,8 puntos (2025: 40,4 % → 38,6 % de los ingresos).
// 2026e: guía de ventas +un dígito bajo a tipo constante + dólar débil; 2027e-2030e: guía a medio plazo (+5-6 % anual 2025-2030) recortada medio punto
// tras pelacarsen y del-desiran; 2031e-2033e: vencimientos de Cosentyx, Kisqali y Kesimpta.
const crec = [3.5, 5.5, 5.5, 5.0, 4.5, 0.0, -2.0, 1.0, 2.0, 2.0];
const margen = [38.8, 40.0, 41.0, 41.5, 41.5, 40.0, 38.5, 38.0, 38.0, 38.0];
const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: 9.5,
  capex_pct_ventas: i < 5 ? 10.0 : 9.5,
  nwc_pct_ventas: 15.5,
  tasa_impositiva_pct: 16.5,
  fijo: i === 0,
}));

export default {
  anios,
  wacc: { tasa_libre_pct: 5.22, beta: 0.65, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 4.5, tasa_impositiva_pct: 16.5, peso_deuda_pct: 13 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.0, multiplo_salida: 12 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 7.0, precio_pct: -1.0, otros_pct: -2.5 },
    { periodo: '2027e', volumen_pct: 9.0, precio_pct: -1.0, otros_pct: -2.5 },
    { periodo: '2028e', volumen_pct: 8.5, precio_pct: -1.0, otros_pct: -2.0 },
    { periodo: '2029e', volumen_pct: 8.0, precio_pct: -1.0, otros_pct: -2.0 },
    { periodo: '2030e', volumen_pct: 7.5, precio_pct: -1.0, otros_pct: -2.0 },
  ],
  mercado_final: null,
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -2.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 1.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  // BPA core de 2028e (ver revision-12m): ingresos × (margen EBITDA − 1,8) − 1.600 M de resultado financiero (deuda neta de 39.400 M) − impuesto
  // del 16,5 % ÷ 1.895 M de acciones (1.923 M menos ≈43 M de la recompra anunciada que queda, 5.600 M a ≈130 USD).
  bpa2028: { Bajista: 9.59, Base: 10.57, Alcista: 11.19 },
  bpa2027: 9.66,
};
