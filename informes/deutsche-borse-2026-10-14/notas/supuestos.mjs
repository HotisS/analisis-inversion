// Supuestos numéricos (Deutsche Börse, corte 2026-10-14). Base: 2025 (6.026 M EUR de ingresos netos con tesorería).
// Decisión: el DCF incluye el resultado de tesorería (intereses de los saldos de efectivo de clientes en Clearstream y Eurex),
// porque es recurrente mientras haya saldos y tipos positivos, pero lo proyecta a la baja: ≈ 837 M en 2025, > 700 M en 2026 (guía)
// y ≈ 650 M desde 2027 con el depósito del BCE en torno al 2 %. Por eso el crecimiento total va por debajo del de la parte sin tesorería.
const crec = [7.0, 4.7, 6.4, 6.0, 5.5, 5.0, 4.0];
const margen = [59.7, 60.8, 61.8, 61.8, 61.8, 61.5, 61.5];
const amort = [8.0, 7.8, 7.5, 7.2, 7.0, 6.8, 6.5];
const capex = [6.0, 6.0, 6.0, 6.2, 6.3, 6.4, 6.5];
const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: g, margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: amort[i], capex_pct_ventas: capex[i], nwc_pct_ventas: 0,
  tasa_impositiva_pct: 26, fijo: i === 0,
}));

export default {
  anios,
  wacc: { tasa_libre_pct: 2.95, beta: 0.85, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 3.0, tasa_impositiva_pct: 26, peso_deuda_pct: 10 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.3, multiplo_salida: 17 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 6.0, precio_pct: 2.0, otros_pct: -1.0 },
    { periodo: '2027e', volumen_pct: 5.0, precio_pct: 1.7, otros_pct: -2.0 },
    { periodo: '2028e', volumen_pct: 4.5, precio_pct: 1.9, otros_pct: 0.0 },
  ],
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.5, ajuste_margen_pp: -2.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.0, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
};
