// Supuestos numéricos del analista (Endesa, corte 2026-10-14). Base: 2025 real (ingresos 21.424 M, EBITDA 5.756 M).
// Ingresos casi planos (el consenso da 21.903 / 21.722 / 21.909 M en 2026-2028): las ventas siguen al precio de la energía.
// El margen sube con las redes (tasa del 6,58 % y más base de activos) hasta 2028, en el rango bajo de la guía de EBITDA
// de 2028 (6.200-6.500 M), y baja después con el cierre de Almaraz (junio de 2030) y la presión de la solar en precios.
// Inversión: plan de 10.600 M en 2026-2028 (≈3.500 M/año, ≈16 % de ventas) y después hacia el mantenimiento + red.
const crec = [2.2, -0.8, 1.0, 2.0, 1.5, 1.5, 2.0, 2.0, 2.0, 2.0];
const margen = [27.6, 28.0, 28.6, 28.6, 28.0, 27.6, 27.5, 27.5, 27.5, 27.5];
const amort = [11.4, 11.5, 11.6, 11.8, 12.0, 12.0, 12.0, 12.0, 12.0, 12.0];
const capex = [16.0, 16.0, 16.0, 14.5, 13.5, 13.0, 12.5, 12.5, 12.5, 12.5];
const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: 0,
  tasa_impositiva_pct: 25,
  fijo: i === 0,
}));

export default {
  anios,
  // Bund 3,53 % (12-oct); beta 0,65 (0,52-0,66 según la línea; utilities); prima 5,5 %; coste de la deuda 3,3 %;
  // peso de la deuda: 10.305 M de deuda neta frente a ≈43.300 M de capitalización (≈19 %).
  wacc: { tasa_libre_pct: 3.53, beta: 0.65, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 3.3, tasa_impositiva_pct: 25, peso_deuda_pct: 20 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.0, multiplo_salida: 8.5 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  mitad_de_anio: true,
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 1.0, precio_pct: 1.2, otros_pct: 0 },
    { periodo: '2027e', volumen_pct: 0.5, precio_pct: -1.3, otros_pct: 0 },
    { periodo: '2028e', volumen_pct: 0.5, precio_pct: 0.5, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 1.0, precio_pct: 1.0, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 1.0, precio_pct: 0.5, otros_pct: 0 },
  ],
  mercado_final: null,
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -1.0, ajuste_margen_pp: -2.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 1.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 0.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
};
