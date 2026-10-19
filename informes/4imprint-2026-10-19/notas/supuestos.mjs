// Supuestos del DCF, escenarios y pesos de 4imprint (corte 2026-10-19). Ejercicio a finales de diciembre (52/53 semanas),
// etiquetado por el año en que termina. Millones de USD.
// 2026e fijo: semestre publicado y guía de agosto (ventas algo por encima de 1.350 M; beneficio antes de impuestos ajustado
// ≈ 130 M → resultado operativo ajustado ≈ 125,6 M con ≈ 4,6 M de ingresos financieros: margen operativo 9,25 %, EBITDA 9,8 %).
// Margen EBITDA = margen operativo + amortizaciones (0,55 % de las ventas: 6,9 M en 2025 + el traslado de Oshkosh).
const g = [0.8, 2.5, 4.5, 5.0, 5.0, 4.5, 4.0, 3.5];
const m = [9.8, 10.15, 10.35, 10.55, 10.75, 10.75, 10.75, 10.75];
const am = [0.55, 0.55, 0.55, 0.55, 0.55, 0.55, 0.55, 0.55];
// Capex: ≈ 13 M en 2026 (traslado de oficinas, 7,4 M en el 1S) y luego ≈ 0,6 % de las ventas (media 2021-2025: 0,8 % con la
// ampliación del centro de distribución de 2024; 0,3 % en 2025).
const cx = [1.0, 0.65, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6];
const anios = g.map((x, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: x, margen_ebitda_pct: m[i], amortizacion_pct_ventas: am[i], capex_pct_ventas: cx[i],
  nwc_pct_ventas: -1.6, tasa_impositiva_pct: 25.0, fijo: i === 0,
}));
export default {
  anios,
  wacc: { tasa_libre_pct: 5.09, beta: 1.0, prima_mercado_pct: 5.5, prima_adicional_pct: 0.5, coste_deuda_pct: 6.0, tasa_impositiva_pct: 25.0, peso_deuda_pct: 0 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 10.0 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -1.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 0.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 40, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 40 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: -1.5, precio_pct: 2.5, otros_pct: -0.2 },
    { periodo: '2027e', volumen_pct: 0.5, precio_pct: 2.0, otros_pct: 0.0 },
    { periodo: '2028e', volumen_pct: 2.5, precio_pct: 2.0, otros_pct: 0.0 },
    { periodo: '2029e', volumen_pct: 3.0, precio_pct: 2.0, otros_pct: 0.0 },
    { periodo: '2030e', volumen_pct: 3.0, precio_pct: 2.0, otros_pct: 0.0 },
  ],
  // Norteamérica + Reino Unido e Irlanda (27.700 + 1.700 M USD en 2025) al 3,5 % anual hasta 2033 (estimación propia).
  mercado_final: { periodo: '2033e', tamano: Math.round(29400 * Math.pow(1.035, 8)) },
};
