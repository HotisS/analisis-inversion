// Supuestos del DCF, escenarios y pesos de Hollywood Bowl Group (corte 2026-10-20). Ejercicio a 30 de septiembre, etiquetado
// por el año en que termina (FY2027 = oct-26 a sep-27, en curso desde hace 20 días). Millones de GBP, NIIF 16.
// FY2026e (cerrado el 30-sep-2026, sin publicar) es «fijo»: ventas del avance (261,6 M, +4,3 %) [A4]; el motor no le da valor
// porque ya terminó (su caja está en el puente: caja neta de 13,5 M a 30-sep-2026).
// Margen EBITDA = EBITDA ajustado NIIF 16 de la empresa (sin alquiler de los centros, que va a amortización e intereses):
// 36,4 % en FY2025 y 38,4 % en el 1S26 [A2, A3]. FY2026e 36,4 % (2S con comparables del −4,5 %); FY2027e 35,8 % (costes de
// las 8 aperturas, salario mínimo de abril de 2026 todo el año y el de abril de 2027); después 36,0 %, por debajo del 38-40 %
// de FY2022-FY2024: no damos por recuperado el margen perdido con los salarios.
const g = [4.3, 8.0, 8.0, 6.0, 5.5, 5.0, 4.5, 4.0];
const m = [36.4, 35.8, 36.0, 36.0, 36.0, 36.0, 36.0, 36.0];
// Amortización total = depreciación de inmovilizado y de derechos de uso + intangibles + deterioros de centros (se repiten
// cada año): 13,6 % de las ventas en FY2025 y 14,5 % en los 12 meses a marzo de 2026 [A2, A3].
const am = [14.2, 14.2, 14.2, 14.2, 14.2, 14.2, 14.2, 14.2];
// Inversión = compras de inmovilizado + altas de derechos de uso (alquileres nuevos de los centros que se abren y renovaciones):
// 70,2 M en FY2025 (36,5 + 33,7), el 28 % de las ventas [A2]. FY2026e: guía de 25-30 M en caja + ≈ 22 M de altas (4 aperturas)
// → 18,9 %; FY2027e: 8 aperturas → ≈ 40 M + ≈ 33 M = 26 %; después baja con el ritmo de aperturas hacia el mantenimiento y las
// renovaciones de alquileres (15 % frente a una amortización del 14,2 %).
const cx = [18.9, 26.0, 19.5, 18.0, 17.0, 16.0, 15.5, 15.0];
const anios = g.map((x, i) => ({
  periodo: `FY${2026 + i}e`, crecimiento_pct: x, margen_ebitda_pct: m[i], amortizacion_pct_ventas: am[i], capex_pct_ventas: cx[i],
  nwc_pct_ventas: -8.5, tasa_impositiva_pct: 25.5, fijo: i === 0,
}));
export default {
  anios,
  wacc: { tasa_libre_pct: 5.31, beta: 0.85, prima_mercado_pct: 5.0, prima_adicional_pct: 0.5, coste_deuda_pct: 6.0, tasa_impositiva_pct: 25.5, peso_deuda_pct: 34 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 8.5 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.0, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 0.8, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 45, comparables: 15, transacciones: 0, suma_partes: 0, escenarios: 40 },
  // Volumen = aperturas netas y partidas en los centros comparables; precio = gasto por partida (precios y mezcla).
  puente_ingresos: [
    { periodo: 'FY2027e', volumen_pct: 6.0, precio_pct: 2.0, otros_pct: 0.0 },
    { periodo: 'FY2028e', volumen_pct: 5.5, precio_pct: 2.5, otros_pct: 0.0 },
    { periodo: 'FY2029e', volumen_pct: 3.5, precio_pct: 2.5, otros_pct: 0.0 },
    { periodo: 'FY2030e', volumen_pct: 3.0, precio_pct: 2.5, otros_pct: 0.0 },
    { periodo: 'FY2031e', volumen_pct: 2.5, precio_pct: 2.5, otros_pct: 0.0 },
  ],
  mercado_final: null,
};
