// Supuestos del DCF, escenarios y pesos de Mycronic (corte 2026-10-20). Ejercicio natural; millones de SEK.
// 2026e fijo: dos trimestres publicados (ventas 4.919 M, EBITDA 1.827 M) y previsión de ventas «al nivel de 9.250 M»
// (14-jul-2026); 17,2 % → 9.303 M, entre la previsión y el consenso (9.377 M). Margen 30,5 % (consenso EBITDA 2.840 M = 30,3 %).
// 2027e: +5 % (cartera de máscaras de 2027 corta: tres Prexision 8 Evo y un SLX; SB1 −21,5 % de EBIT frente al consenso);
// después, vuelta al 10 % y descenso hasta el 4 % en 2035e. Margen 28-29 %: el objetivo de la empresa es EBIT ≈ 25 % (EBITDA ≈ 29 %).
const g = [17.2, 5.0, 10.0, 10.0, 9.0, 8.0, 7.0, 6.0, 5.0, 4.0];
const m = [30.5, 28.5, 29.0, 29.0, 28.5, 28.5, 28.0, 28.0, 28.0, 28.0];
// Amortización total (inmovilizado, derechos de uso e intangibles comprados): 4,2 % en 2025 (330 M), 4,0 % en la proyección,
// bajando al 3,8 %. Capex = inmovilizado e intangibles (165 M en 2025) + pagos de arrendamiento (109 M) ≈ 3,5 % de las ventas,
// subiendo al 3,8 % para igualar la amortización en el último año.
const am = [4.0, 4.0, 4.0, 4.0, 3.9, 3.9, 3.9, 3.8, 3.8, 3.8];
const cx = [3.5, 3.5, 3.6, 3.6, 3.7, 3.7, 3.7, 3.8, 3.8, 3.8];
const anios = g.map((x, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: x, margen_ebitda_pct: m[i], amortizacion_pct_ventas: am[i], capex_pct_ventas: cx[i],
  nwc_pct_ventas: 25.0, tasa_impositiva_pct: 21.0, fijo: i === 0,
}));
export default {
  anios,
  wacc: { tasa_libre_pct: 3.22, beta: 1.0, prima_mercado_pct: 5.5, prima_adicional_pct: 0.5, coste_deuda_pct: 4.0, tasa_impositiva_pct: 20.6, peso_deuda_pct: 1 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 14.0 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -3.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.0, multiplo_salida: null,
      perfil: [{ periodo: '2027e', crecimiento_pp: -12.0, margen_pp: -6.0 }, { periodo: '2028e', crecimiento_pp: -4.0, margen_pp: -4.0 }] },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 3.0, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 30, transacciones: 0, suma_partes: 0, escenarios: 20 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 22.0, precio_pct: 1.0, otros_pct: -5.8 },
    { periodo: '2027e', volumen_pct: 4.0, precio_pct: 1.0, otros_pct: 0.0 },
    { periodo: '2028e', volumen_pct: 8.5, precio_pct: 1.5, otros_pct: 0.0 },
    { periodo: '2029e', volumen_pct: 8.5, precio_pct: 1.5, otros_pct: 0.0 },
    { periodo: '2030e', volumen_pct: 7.5, precio_pct: 1.5, otros_pct: 0.0 },
  ],
  mercado_final: null,
};
