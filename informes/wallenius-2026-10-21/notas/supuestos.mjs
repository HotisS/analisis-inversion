// Supuestos del DCF, escenarios y pesos de Wallenius Wilhelmsen (corte 2026-10-21). Ejercicio a 31-dic. Millones de USD.
// Margen EBITDA = EBITDA ajustado (sin plusvalías ni reestructuración), con los arrendamientos NIIF 16 fuera del EBITDA.
// El ciclo se modela de forma explícita: 2026e en la guía (≈ 1.600 M), 2027e algo mejor por las renovaciones de contratos
// del segundo semestre de 2026 a tarifas más altas, y bajada a un margen de MITAD DE CICLO del 25 % desde 2030 (historia:
// 16 % en 2020, 21-22 % en 2019 y 2021, 30-35 % en 2022-2025; media 2019-2025 ≈ 28 %), con la flota mundial creciendo
// ≈ 30 % entre 2025 y 2027.
const g = [1.1, 3.0, -1.0, -3.0, 0.0, 2.0, 2.5, 2.5];
const m = [30.0, 30.5, 28.0, 26.0, 25.0, 25.0, 25.0, 25.0];
// Amortización (barcos propios + derechos de uso): 12,4 % de las ventas en 2025 y ≈ 13 % en los últimos doce meses; sube con
// los 14 Shaper (≈ 1.400 M) y los 4 LNG grandes, y converge a ≈ 13 % (flota repuesta a precios de hoy).
const am = [12.8, 13.2, 13.8, 14.0, 13.8, 13.5, 13.2, 13.0];
// Inversión = inmovilizado propio (barcos nuevos, dique seco, terminales) + altas de derechos de uso (fletamentos nuevos o
// renovados: 467 M en 2024 y 505 M en 2025). 2025: 245 + 505 = 750 M (14,3 % de las ventas). 2026-2028 con los Shaper
// (1.400 M pendientes) y los pagos a astillero de los 4 LNG; después, reposición de flota ≈ 13,5 % (algo por encima de la
// amortización: crecimiento nominal del 2-2,5 %).
const cx = [19.0, 21.0, 18.0, 15.5, 14.5, 14.0, 13.5, 13.5];
const anios = g.map((x, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: x, margen_ebitda_pct: m[i], amortizacion_pct_ventas: am[i], capex_pct_ventas: cx[i],
  nwc_pct_ventas: 10.5, tasa_impositiva_pct: 5.0, fijo: i === 0,
}));
export default {
  anios,
  wacc: { tasa_libre_pct: 5.12, beta: 1.2, prima_mercado_pct: 4.2, prima_adicional_pct: 1.0, coste_deuda_pct: 6.0, tasa_impositiva_pct: 5.0, peso_deuda_pct: 24 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.0, multiplo_salida: 5.5 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 30, ajuste_crecimiento_pp: -4.0, ajuste_margen_pp: -5.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 1.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 20, ajuste_crecimiento_pp: 3.0, ajuste_margen_pp: 4.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 45, comparables: 15, transacciones: 0, suma_partes: 0, escenarios: 40 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 0.0, precio_pct: 1.1, otros_pct: 0.0 },
    { periodo: '2027e', volumen_pct: 1.0, precio_pct: 2.0, otros_pct: 0.0 },
    { periodo: '2028e', volumen_pct: 1.5, precio_pct: -2.5, otros_pct: 0.0 },
    { periodo: '2029e', volumen_pct: 1.5, precio_pct: -4.5, otros_pct: 0.0 },
    { periodo: '2030e', volumen_pct: 1.5, precio_pct: -1.5, otros_pct: 0.0 },
  ],
  // Mercado final: ingresos mundiales del ro-ro de alta mar y su logística, estimación propia (≈ 28.000 M USD hoy: los
  // 4.298 M de transporte de WAWI son ≈ 15 % de la capacidad) creciendo ≈ 2 % nominal hasta 2033 con tarifas a la baja.
  mercado_final: { periodo: "2033e", tamano: 33000 },
};
