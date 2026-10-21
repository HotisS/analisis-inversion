// Supuestos del DCF, escenarios y pesos de Monster Beverage (corte 2026-10-21). Ejercicio a 31 de diciembre. Millones de USD.
// 2026e está en curso (1S26 real: ventas 4.890,8, +23,3 %; resultado operativo 1.470,4) y se fija.
// Margen EBITDA = resultado operativo GAAP + amortizaciones, SIN los deterioros del alcohol (no recurrentes) pero CON sus
// pérdidas de explotación (−127 M de resultado de segmento en 2025, 77 sin deterioros) y con los pagos en acciones.
// 2025: (2.419,4 + 114,4 + 50,4) / 8.294,3 = 31,2 %; 1S26: (1.470,4 + 58,2) / 4.890,8 = 31,3 %. 2S26 con más coste de aluminio.
const g = [17.5, 10.0, 9.0, 8.5, 8.0, 7.0, 6.0, 5.0];
const m = [30.6, 31.0, 31.2, 31.4, 31.5, 31.5, 31.5, 31.5];
// Amortizaciones: 1,38 % de las ventas en 2025 (114,4 M) y 1,19 % en el 1S26.
const am = [1.25, 1.25, 1.25, 1.25, 1.25, 1.25, 1.25, 1.25];
// Inversión: 1,6 % en 2025 (132 M), 2,9-3,5 % en 2023-2024 (Phoenix); guía < 250 M hasta jun-2027.
const cx = [1.6, 2.3, 2.3, 2.3, 2.3, 2.3, 2.3, 2.3];
const anios = g.map((x, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: x, margen_ebitda_pct: m[i], amortizacion_pct_ventas: am[i], capex_pct_ventas: cx[i],
  // Circulante: existencias + clientes − proveedores = 22,3 % de las ventas en 2025; − descuentos promocionales devengados (384 M)
  // = 17,7 %. Se usa el 20 %.
  nwc_pct_ventas: 20.0, tasa_impositiva_pct: 23.5, fijo: i === 0,
}));
export default {
  anios,
  wacc: { tasa_libre_pct: 5.12, beta: 0.70, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.5, tasa_impositiva_pct: 23.5, peso_deuda_pct: 0 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 20.0 },
  etapa2: { usar: true, anios: 10, margen_final_pct: 31.5 },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -4.0, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 0.8, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 10, transacciones: 0, suma_partes: 0, escenarios: 40 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 13.0, precio_pct: 2.5, otros_pct: 2.0 },
    { periodo: '2027e', volumen_pct: 7.0, precio_pct: 2.5, otros_pct: 0.5 },
    { periodo: '2028e', volumen_pct: 6.5, precio_pct: 2.5, otros_pct: 0.0 },
    { periodo: '2029e', volumen_pct: 6.0, precio_pct: 2.5, otros_pct: 0.0 },
    { periodo: '2030e', volumen_pct: 5.5, precio_pct: 2.5, otros_pct: 0.0 },
  ],
  mercado_final: { periodo: '2030e', tamano: 75576 },
};
