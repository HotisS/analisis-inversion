// Supuestos del DCF, escenarios y pesos de VeriSign (corte 2026-10-20). Ejercicio natural; millones de USD.
// 2026e es fijo: dos trimestres publicados y guía de ingresos de 1.745-1.755 M (centro 1.750; +5,6-5,9 %).
// Crecimiento = volumen (base de dominios) + precio (subidas de .com de hasta el 7 % en los cuatro últimos años de cada
// periodo de seis: el actual empezó el 26-oct-2024 → subidas posibles en nov-2026, 2027, 2028 y 2029; el siguiente periodo
// empieza en oct-2030 y sus dos primeros años no admiten subidas → 2031-2032 solo volumen y arrastre).
const g = [5.8, 9.0, 9.0, 8.5, 8.0, 5.0, 3.0, 4.5, 4.5, 3.5];
// Margen EBITDA (US GAAP, con la remuneración en acciones dentro): 69,6 % en 2025 y 69,8 % en el 1S26. Las subidas de precio
// van casi enteras al resultado con costes que crecen ≈ 4-5 % al año.
const m = [69.8, 71.3, 72.6, 73.6, 74.4, 74.6, 74.4, 74.6, 74.8, 74.8];
const am = [1.6, 1.7, 1.8, 1.9, 2.0, 2.0, 2.1, 2.1, 2.2, 2.2];
const cx = [2.5, 2.6, 2.5, 2.4, 2.3, 2.3, 2.3, 2.3, 2.3, 2.3];
const anios = g.map((x, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: x, margen_ebitda_pct: m[i], amortizacion_pct_ventas: am[i], capex_pct_ventas: cx[i],
  // Circulante con los ingresos diferidos (cobro anticipado): −101 % de las ventas en 2025.
  nwc_pct_ventas: -100.0, tasa_impositiva_pct: 23.0, fijo: i === 0,
}));
export default {
  anios,
  wacc: { tasa_libre_pct: 5.15, beta: 0.80, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.1, tasa_impositiva_pct: 23.0, peso_deuda_pct: 6 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 20.0 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 1.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 0.7, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 4.5, precio_pct: 1.3, otros_pct: 0.0 },
    { periodo: '2027e', volumen_pct: 3.5, precio_pct: 5.5, otros_pct: 0.0 },
    { periodo: '2028e', volumen_pct: 3.0, precio_pct: 6.0, otros_pct: 0.0 },
    { periodo: '2029e', volumen_pct: 2.5, precio_pct: 6.0, otros_pct: 0.0 },
    { periodo: '2030e', volumen_pct: 2.0, precio_pct: 6.0, otros_pct: 0.0 },
  ],
  mercado_final: null,
};
