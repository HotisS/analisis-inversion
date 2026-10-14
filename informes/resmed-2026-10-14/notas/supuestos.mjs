// Supuestos del DCF, escenarios y pesos de ResMed (corte 2026-10-14). Ejercicio a 30 de junio, etiqueta «fin», USD.
// FY2027e incluye la salida de MatrixCare (≈220 M de ingresos en FY2026) y la suspensión del Astral (−75 M): +2,6 % publicado,
// ≈ +6-7 % comparable (guía 5.750-5.850 M). Margen EBITDA «limpio» (sin no recurrentes): 38,3 % en FY2026.
const a = (periodo, g, m, am, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: 3.3, nwc_pct_ventas: 29.5, tasa_impositiva_pct: 21.5, fijo });
export default {
  anios: [
    a('2027e', 2.6, 38.7, 3.4),
    a('2028e', 5.5, 39.2, 3.3),
    a('2029e', 5.5, 39.4, 3.3),
    a('2030e', 5.0, 39.5, 3.3),
    a('2031e', 4.5, 39.5, 3.3),
    a('2032e', 4.0, 39.5, 3.3),
    a('2033e', 3.5, 39.5, 3.3),
  ],
  wacc: { tasa_libre_pct: 5.24, beta: 0.85, prima_mercado_pct: 5.0, prima_adicional_pct: 0, coste_deuda_pct: 4.6, tasa_impositiva_pct: 21.5, peso_deuda_pct: 2 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 15 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -2.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.0, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 60, comparables: 10, transacciones: 0, suma_partes: 0, escenarios: 30 },
  puente_ingresos: [
    { periodo: '2027e', volumen_pct: 5.0, precio_pct: 1.5, otros_pct: -3.9 },
    { periodo: '2028e', volumen_pct: 4.0, precio_pct: 1.0, otros_pct: 0.5 },
    { periodo: '2029e', volumen_pct: 4.0, precio_pct: 1.0, otros_pct: 0.5 },
    { periodo: '2030e', volumen_pct: 4.0, precio_pct: 1.0, otros_pct: 0 },
    { periodo: '2031e', volumen_pct: 3.5, precio_pct: 1.0, otros_pct: 0 },
  ],
  mercado_final: null,
};
