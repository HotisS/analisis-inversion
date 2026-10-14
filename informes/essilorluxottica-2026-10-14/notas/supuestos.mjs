// Supuestos numéricos del analista principal (EssilorLuxottica, corte 2026-10-14). Base: 2025 (28.491 M EUR, cuentas NIIF).
// EBITDA publicado (NIIF 16: sin alquileres). La amortización incluye la de los intangibles de la fusión de 2018 y de GrandVision
// (no caja, ≈2,5-3 % de las ventas, que baja con los años); por eso puede superar al capex en los años intermedios.
// El capex incluye las altas de derechos de uso (≈3,3 % de las ventas, igual a los pagos de arrendamientos de 2025).
const crec = [6.0, 7.5, 7.0, 6.0, 5.5, 5.0, 4.5, 4.0, 3.5, 3.0];
const margen = [23.8, 24.2, 24.6, 24.8, 25.0, 25.0, 25.0, 25.0, 25.0, 25.0];
const amort = [10.8, 10.5, 10.2, 9.8, 9.5, 9.0, 8.5, 8.0, 7.5, 7.0];
const capex = [8.7, 8.6, 8.5, 8.4, 8.3, 8.2, 8.0, 7.8, 7.6, 7.5];
const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: 25.5,
  tasa_impositiva_pct: 25,
  fijo: i === 0,
}));

export default {
  anios,
  wacc: { tasa_libre_pct: 3.2, beta: 0.9, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 3.5, tasa_impositiva_pct: 25, peso_deuda_pct: 15 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 12 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  mitad_de_anio: true,
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 6.0, precio_pct: 3.0, otros_pct: -3.0 },
    { periodo: '2027e', volumen_pct: 4.5, precio_pct: 2.5, otros_pct: 0.5 },
    { periodo: '2028e', volumen_pct: 4.5, precio_pct: 2.5, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 3.5, precio_pct: 2.5, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 3.0, precio_pct: 2.5, otros_pct: 0 },
  ],
  mercado_final: null,
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 30, ajuste_crecimiento_pp: -2.5, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.0, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 20, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 0.7, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 40, comparables: 30, transacciones: 0, suma_partes: 0, escenarios: 30 },
};
