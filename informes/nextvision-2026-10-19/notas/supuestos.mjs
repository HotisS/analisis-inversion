// Supuestos del DCF, escenarios y pesos de NextVision (corte 2026-10-19). Ejercicio natural; millones de USD.
// 2026e fijo: dos trimestres publicados (155,5 M) y objetivo del consejo de 355 M (9-ago-2026); margen EBITDA del 1S26 58,7 %.
// Después, el crecimiento cae deprisa (ciclo de defensa en máximos, cartera a la baja en el 2T26, competencia) y el margen
// baja del 58 % al 40 % (margen bruto del 72 % de 2024 al ≈ 65 % del 2T26 y objetivo de 65-72 %).
const ventas26 = 355, base25 = 168.354;
const g = [r(ventas26 / base25 * 100 - 100), 38.0, 15.0, 10.0, 7.0, 6.0, 5.0, 4.0];
function r(x) { return Math.round(x * 10) / 10; }
const m = [58, 54, 50, 47, 45, 43, 41, 40];
// Circulante comercial: 33,9 % de las ventas en 2025 y 35,9 % en junio de 2026 (con 34 M de anticipos de clientes fuera);
// baja de forma gradual al 30 % cuando la compra anticipada de componentes se normalice.
const nwc = [33, 32, 31, 30, 30, 30, 30, 30];
// Amortización 1,2 % (≈ 1,4 % en el 1S26 con derechos de uso) y capex 2,0 % (1,7 % de inmovilizado y desarrollo en 2025 +
// ≈ 0,3 % de altas de derechos de uso por la nave nueva y la planta europea, NIIF 16).
const anios = g.map((x, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: x, margen_ebitda_pct: m[i], amortizacion_pct_ventas: 1.2, capex_pct_ventas: 2.0,
  nwc_pct_ventas: nwc[i], tasa_impositiva_pct: 13.0, fijo: i === 0,
}));
export default {
  anios,
  wacc: { tasa_libre_pct: 5.09, beta: 1.15, prima_mercado_pct: 5.5, prima_adicional_pct: 2.0, coste_deuda_pct: 6.0, tasa_impositiva_pct: 13.0, peso_deuda_pct: 0 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 12.0 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -8.0, ajuste_wacc_pp: 1.0, crecimiento_terminal_pct: 2.0, multiplo_salida: null, perfil: [{ periodo: '2027e', crecimiento_pp: -30, margen_pp: -8 }, { periodo: '2028e', crecimiento_pp: -12, margen_pp: -8 }] },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 4.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [{ periodo: '2027e', crecimiento_pp: 15, margen_pp: 4 }, { periodo: '2028e', crecimiento_pp: 5, margen_pp: 4 }] },
  ],
  pesos: { dcf: 45, comparables: 15, transacciones: 0, suma_partes: 0, escenarios: 40 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: g[0] + 4, precio_pct: -4.0, otros_pct: 0 },
    { periodo: '2027e', volumen_pct: 41.0, precio_pct: -3.0, otros_pct: 0 },
    { periodo: '2028e', volumen_pct: 18.0, precio_pct: -3.0, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 12.0, precio_pct: -2.0, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 9.0, precio_pct: -2.0, otros_pct: 0 },
  ],
  // Mercado de cámaras para drones de Fortune Business Insights [B2]: 14.870 M USD en 2026 al +17,6 % anual hasta 2033e
  // (el estudio llega a 54.380 M en 2034). Mismo perímetro que competencia.cuota_pct (1,3 % en 2025).
  mercado_final: { periodo: '2033e', tamano: Math.round(14870 * 1.176 ** 7) },
};
