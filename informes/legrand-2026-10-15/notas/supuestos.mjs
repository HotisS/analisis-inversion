// Supuestos del DCF y de los escenarios de Legrand (corte 2026-10-15). Crecimiento de 2027e con el efecto de arrastre
// de las compras ya anunciadas en 2026 (+3 puntos); desde 2028e, solo orgánico (sin compras no anunciadas).
const g = [15.5, 10.0, 7.0, 6.5, 6.0, 5.5, 5.0, 4.5, 4.0, 3.5];
const m = [23.3, 23.5, 23.6, 23.7, 23.8, 23.8, 23.8, 23.8, 23.8, 23.8];
const da = [4.4, 4.3, 4.2, 4.1, 4.0, 3.9, 3.8, 3.7, 3.6, 3.6];
const cx = [3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.6, 3.6];
export default {
  anios: g.map((x, i) => ({ periodo: `${2026 + i}e`, crecimiento_pct: x, margen_ebitda_pct: m[i], amortizacion_pct_ventas: da[i], capex_pct_ventas: cx[i], nwc_pct_ventas: 17.5, tasa_impositiva_pct: i === 0 ? 26.5 : 26.0, fijo: i === 0 })),
  wacc: { tasa_libre_pct: 3.45, beta: 1.1, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 3.0, tasa_impositiva_pct: 26, peso_deuda_pct: 14 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 14 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 6.0, precio_pct: 3.0, otros_pct: 6.5 },
    { periodo: '2027e', volumen_pct: 4.5, precio_pct: 2.5, otros_pct: 3.0 },
    { periodo: '2028e', volumen_pct: 4.5, precio_pct: 2.5, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 4.0, precio_pct: 2.5, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 3.5, precio_pct: 2.5, otros_pct: 0 },
  ],
  mercado_final: null,
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3, ajuste_margen_pp: -2, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.0, multiplo_salida: null, perfil: [] },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2, ajuste_margen_pp: 1, ajuste_wacc_pp: -0.25, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
  ],
  pesos: { dcf: 50, comparables: 25, transacciones: 0, suma_partes: 0, escenarios: 25 },
};
