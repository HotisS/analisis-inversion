// Supuestos del DCF, escenarios y pesos de FactSet (corte 2026-10-15). Ejercicio a 31 de agosto, etiqueta «fin». USD.
// EBITDA normalizado (sin reestructuración, premios de entrada del CEO ni deterioros), con los pagos en acciones como gasto.
// Amortización = la del inmovilizado y software (≈ 4,3 % de ventas) + la de intangibles comprados (≈ 76 M/año, CUSIP sobre todo),
// que converge al capex en el último año. Arrendamientos operativos (US GAAP): el alquiler ya está en el EBITDA; fuera del puente.
const a = (periodo, g, m, am, cx) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: cx, nwc_pct_ventas: -1.0, tasa_impositiva_pct: periodo === 'FY2027e' ? 19 : 20, fijo: false });
export default {
  anios: [
    a('FY2027e', 5.5, 39.3, 7.4, 4.8),
    a('FY2028e', 5.5, 39.8, 7.2, 4.9),
    a('FY2029e', 5.0, 40.2, 7.0, 5.0),
    a('FY2030e', 5.0, 40.5, 6.6, 5.1),
    a('FY2031e', 4.5, 40.5, 6.2, 5.2),
    a('FY2032e', 4.0, 40.5, 5.8, 5.4),
    a('FY2033e', 3.5, 40.5, 5.5, 5.5),
  ],
  wacc: { tasa_libre_pct: 5.21, beta: 0.9, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.5, tasa_impositiva_pct: 21, peso_deuda_pct: 12 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 13 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -2.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 1.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 45, comparables: 10, transacciones: 0, suma_partes: 0, escenarios: 45 },
  puente_ingresos: [
    { periodo: 'FY2027e', volumen_pct: 2.5, precio_pct: 3.0, otros_pct: 0 },
    { periodo: 'FY2028e', volumen_pct: 2.5, precio_pct: 3.0, otros_pct: 0 },
    { periodo: 'FY2029e', volumen_pct: 2.0, precio_pct: 3.0, otros_pct: 0 },
    { periodo: 'FY2030e', volumen_pct: 2.0, precio_pct: 3.0, otros_pct: 0 },
    { periodo: 'FY2031e', volumen_pct: 2.0, precio_pct: 2.5, otros_pct: 0 },
  ],
  mercado_final: { periodo: 'FY2033e', tamano: 78400 },
  // BPA normalizado FY2028e (ventas × margen − amortización − 60 M de intereses netos − 20 % de impuestos) ÷ 35,4 M de acciones
  bpa_12m: { Bajista: 16.05, Base: 18.95, Alcista: 20.17 },
  bpa_fy2027e_base: 17.70,
};
