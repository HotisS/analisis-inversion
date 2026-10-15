// Supuestos del DCF, escenarios y pesos de Sweco (corte 2026-10-15). SEK, NIIF-UE, ejercicio natural.
// EBITDA con NIIF 16 (= EBIT + toda la amortización, incluida la de derechos de uso y la de intangibles de compras); arrendamientos en la deuda.
// Capex del DCF = inversión en inmovilizado (≈1,3 % de las ventas) + reposición de derechos de uso (≈3,1 %), para que el DCF pague las oficinas.
// Crecimiento: 2026e con las compras ya cerradas (Projektengagemang, Fimpec, assar, Platom, CONIX, STEIN, Sitowise Sverige); desde 2027e SOLO orgánico
// (no se proyectan compras futuras ni su coste).
const a = (periodo, g, m, am, cx, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: cx, nwc_pct_ventas: 17.5, tasa_impositiva_pct: 25.0, fijo });
export default {
  anios: [
    a('2026e', 6.5, 15.0, 4.8, 4.4, true),
    a('2027e', 3.5, 15.2, 4.6, 4.4),
    a('2028e', 3.5, 15.3, 4.5, 4.4),
    a('2029e', 3.5, 15.4, 4.45, 4.4),
    a('2030e', 3.0, 15.4, 4.4, 4.4),
    a('2031e', 3.0, 15.4, 4.4, 4.4),
    a('2032e', 2.5, 15.4, 4.4, 4.4),
  ],
  wacc: { tasa_libre_pct: 3.2, beta: 1.05, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 4.0, tasa_impositiva_pct: 23.0, peso_deuda_pct: 13.0 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 11 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -1.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.0, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 0.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 15, transacciones: 0, suma_partes: 0, escenarios: 35 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 0.5, precio_pct: 2.5, otros_pct: 3.5 },
    { periodo: '2027e', volumen_pct: 1.0, precio_pct: 2.5, otros_pct: 0.0 },
    { periodo: '2028e', volumen_pct: 1.0, precio_pct: 2.5, otros_pct: 0.0 },
    { periodo: '2029e', volumen_pct: 1.0, precio_pct: 2.5, otros_pct: 0.0 },
    { periodo: '2030e', volumen_pct: 0.5, precio_pct: 2.5, otros_pct: 0.0 },
  ],
  // Mercado europeo de consultoría de ingeniería y arquitectura: ≈110.000 M EUR (≈1,23 billones de SEK) en 2025, +3 % anual → 2030e.
  mercado_final: { periodo: '2030e', tamano: 1426000 },
  // BPA 2028e: ventas × margen EBITDA − amortización − resultado financiero (≈215 M) − impuesto del 25 %, ÷ 362,4 M acciones diluidas.
  bpa_12m: { Bajista: 6.45, Base: 7.61, Alcista: 8.23 },
};
