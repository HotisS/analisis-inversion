// Supuestos numéricos (Deutsche Börse, corte 2026-10-21, tras el 3T26). Base: 2025 (6.026 M EUR de ingresos netos con tesorería).
// 21-oct: 2026e fijo con nueve meses (4.888 M) y la guía subida (más de 6.500 M; EBITDA ≈ 3.900 M) [A]; la tesorería ya no baja:
// el BCE subió el depósito al 2,25 % en junio y al 2,5 % en septiembre [B] y la guía de tesorería pasa a más de 800 M; se supone
// ≈ 800 M estables desde 2027 (antes ≈ 650 M). Bund del 20-oct (3,48 %), coste y peso de la deuda de D. Sin Allfunds (cierre en el 1S27).
// Decisión: el DCF incluye el resultado de tesorería (intereses de los saldos de efectivo de clientes en Clearstream y Eurex),
// porque es recurrente mientras haya saldos y tipos positivos, pero lo proyecta a la baja: ≈ 837 M en 2025, > 700 M en 2026 (guía)
// y ≈ 650 M desde 2027 con el depósito del BCE en torno al 2 %. Por eso el crecimiento total va por debajo del de la parte sin tesorería.
const crec = [8.7, 5.0, 7.0, 6.0, 5.5, 5.0, 4.0];
const margen = [59.6, 60.5, 61.5, 61.8, 61.8, 61.5, 61.5];
const amort = [8.0, 7.8, 7.5, 7.2, 7.0, 6.8, 6.5];
const capex = [6.0, 6.0, 6.0, 6.2, 6.3, 6.4, 6.5];
const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: g, margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: amort[i], capex_pct_ventas: capex[i], nwc_pct_ventas: 6.9,
  tasa_impositiva_pct: 26, fijo: i === 0,
}));

export default {
  anios,
  wacc: { tasa_libre_pct: 3.48, beta: 0.85, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 3.9, tasa_impositiva_pct: 26, peso_deuda_pct: 9 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.3, multiplo_salida: 17 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 6.5, precio_pct: 2.0, otros_pct: 0.2 },
    { periodo: '2027e', volumen_pct: 4.0, precio_pct: 1.5, otros_pct: -0.5 },
    { periodo: '2028e', volumen_pct: 5.0, precio_pct: 2.0, otros_pct: 0.0 },
  ],
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.5, ajuste_margen_pp: -2.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.0, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
};
