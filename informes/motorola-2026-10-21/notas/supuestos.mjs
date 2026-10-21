// Supuestos del DCF, escenarios y pesos de Motorola Solutions (corte 2026-10-21). Ejercicio a 31 de diciembre. Millones de USD.
// Margen EBITDA del DCF = EBITDA GAAP recurrente: resta los pagos en acciones (≈ 3,2 % de las ventas en 2026: ≈ 410 M) y la
// reestructuración recurrente (≈ 0,45 %), que la empresa excluye de su resultado no GAAP; solo quedan fuera las ganancias de
// Hytera, el deterioro de ESN y el earnout de Silvus. Relación con el margen operativo no GAAP de la empresa:
//   margen operativo no GAAP ≈ margen del DCF + 3,2 (acciones) + 0,45 (reestructuración) − 1,7 (depreciación) = DCF + 1,95.
// 2026e calibrado con la guía (ventas 12.975 M, BPA no GAAP 17,62-17,72 USD) [A3, D14].
// D-Fend (cerrada el 20-ago-2026, ≈ 1.500 M USD) y Bell Canada (pendiente, ≈ 500 M USD) NO están en la proyección ni en el
// puente: se tratan como neutras (precio pagado ≈ valor). Ver limitaciones.
const g = [11.1, 7.0, 6.0, 5.5, 5.0, 4.5, 4.0, 3.5];
const m = [30.1, 30.6, 31.0, 31.3, 31.5, 31.5, 31.5, 31.5];
// Amortización total: depreciación ≈ 1,6-1,7 % + intangibles comprados (≈ 234 M en 2025, más con Silvus en 2026), que se
// van agotando: 4,5 % en 2026e hasta 2,4 % (≈ capex) al final.
const am = [4.5, 4.2, 3.8, 3.4, 3.0, 2.7, 2.5, 2.4];
// Capex ≈ 2,2-2,5 % de las ventas (256 M en 2025 [A1]).
const cx = [2.4, 2.4, 2.4, 2.4, 2.4, 2.4, 2.4, 2.4];
const anios = g.map((x, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: x, margen_ebitda_pct: m[i], amortizacion_pct_ventas: am[i], capex_pct_ventas: cx[i],
  nwc_pct_ventas: 12, tasa_impositiva_pct: 23.0, fijo: i === 0,
}));
export default {
  anios,
  wacc: { tasa_libre_pct: 5.12, beta: 0.90, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.3, tasa_impositiva_pct: 23.0, peso_deuda_pct: 12 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 16.0 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 0.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 15, transacciones: 0, suma_partes: 0, escenarios: 35 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 3.0, precio_pct: 2.4, otros_pct: 5.7 },
    { periodo: '2027e', volumen_pct: 5.0, precio_pct: 2.0, otros_pct: 0.0 },
    { periodo: '2028e', volumen_pct: 4.0, precio_pct: 2.0, otros_pct: 0.0 },
    { periodo: '2029e', volumen_pct: 3.5, precio_pct: 2.0, otros_pct: 0.0 },
    { periodo: '2030e', volumen_pct: 3.0, precio_pct: 2.0, otros_pct: 0.0 },
  ],
  mercado_final: null,
};
