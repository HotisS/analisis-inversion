// Supuestos del DCF, escenarios y pesos de Otis Worldwide (corte 2026-10-21). Ejercicio natural; millones de USD.
// Margen EBITDA del DCF = resultado operativo ajustado de la empresa + amortizaciones MENOS la reestructuración que se repite
// todos los años (40-77 M al año en 2019-2025 [A1]) y que la empresa excluye de su ajustado. 2025: (2.434 + 175 − 54) ÷ 14.431
// = 17,7 %; 2026e: guía de ≈ 2.400 M de resultado ajustado [A2] + ≈ 175 de amortización − ≈ 45 de reestructuración sobre
// ≈ 15.200 M de ventas = 16,7 % (cae por el margen de servicio del 2T26 −170 pb, la China y los aranceles).
const g = [5.3, 4.5, 4.0, 4.0, 3.5, 3.5, 3.0, 3.0];
const m = [16.6, 17.3, 17.8, 18.1, 18.3, 18.4, 18.4, 18.4];
const am = [1.15, 1.15, 1.15, 1.15, 1.15, 1.15, 1.15, 1.15];
const cx = [1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2];
const anios = g.map((x, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: x, margen_ebitda_pct: m[i], amortizacion_pct_ventas: am[i], capex_pct_ventas: cx[i],
  nwc_pct_ventas: 1.7, tasa_impositiva_pct: 24.5, fijo: i === 0,
}));
export default {
  anios,
  wacc: { tasa_libre_pct: 5.12, beta: 0.90, prima_mercado_pct: 5.0, prima_adicional_pct: 0, coste_deuda_pct: 5.0, tasa_impositiva_pct: 24.5, peso_deuda_pct: 23.5 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 14.0 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -1.5, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.0, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.0, ajuste_margen_pp: 0.8, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 45, comparables: 15, transacciones: 0, suma_partes: 0, escenarios: 40 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 0.5, precio_pct: 2.5, otros_pct: 2.3 },
    { periodo: '2027e', volumen_pct: 2.0, precio_pct: 2.5, otros_pct: 0.5 },
    { periodo: '2028e', volumen_pct: 2.0, precio_pct: 2.5, otros_pct: 0.0 },
    { periodo: '2029e', volumen_pct: 2.0, precio_pct: 2.5, otros_pct: 0.0 },
    { periodo: '2030e', volumen_pct: 1.5, precio_pct: 2.5, otros_pct: 0.0 },
  ],
  // Roland Berger: mercado mundial de ascensores y escaleras (equipo nuevo + servicio) de ≈ 133.000 M USD en 2030 [B]; mismo
  // perímetro que la cuota del 13,1 % de 2025 (14.431 ÷ ≈ 110.000).
  mercado_final: { periodo: '2030e', tamano: 133000 },
};
