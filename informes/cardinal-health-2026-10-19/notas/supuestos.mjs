// Supuestos del DCF, escenarios y pesos de Cardinal Health (corte 2026-10-19). Ejercicio a 30 de junio, etiquetado por el
// año en que termina (FY2027 = jul-26 a jun-27, en curso desde hace 3,6 meses). Millones de USD.
// Margen EBITDA del DCF = EBITDA ajustado de la empresa (resultado operativo no GAAP + depreciación, sin amortización de
// intangibles comprados; 1,66 % de las ventas en FY2026, 1,62 % sin los 100 M del reembolso IEEPA) MENOS 0,10 puntos de
// ventas por la reestructuración y la remuneración en caja y acciones ligada a las compras de consultas (106 + 287 M en
// FY2026, con 407 M aún por reconocer a ≈ 4 años) que se repiten y la empresa excluye de su ajustado.
const g = [4.5, 6.0, 5.5, 5.0, 4.5, 4.0, 3.5, 3.0];
const m = [1.60, 1.64, 1.67, 1.69, 1.71, 1.72, 1.73, 1.73];
// Amortización total (depreciación ≈ 0,23 % + intangibles comprados ≈ 0,14 %): 0,37 % de las ventas en FY2026 (956 M).
const am = [0.37, 0.37, 0.37, 0.37, 0.37, 0.37, 0.37, 0.37];
// Capex: inmovilizado y software ≈ 0,26 % de las ventas (649 M en FY2026; guía ≈ 700 M en FY2027).
const cx = [0.27, 0.27, 0.27, 0.27, 0.27, 0.27, 0.27, 0.27];
const anios = g.map((x, i) => ({
  periodo: `FY${2027 + i}e`, crecimiento_pct: x, margen_ebitda_pct: m[i], amortizacion_pct_ventas: am[i], capex_pct_ventas: cx[i],
  nwc_pct_ventas: -2.8, tasa_impositiva_pct: 20.0, fijo: i === 0,
}));
export default {
  anios,
  wacc: { tasa_libre_pct: 5.09, beta: 0.70, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.3, tasa_impositiva_pct: 20.0, peso_deuda_pct: 18 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 14.0 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -0.12, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.0, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.0, ajuste_margen_pp: 0.06, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 45, comparables: 15, transacciones: 0, suma_partes: 0, escenarios: 40 },
  puente_ingresos: [
    { periodo: 'FY2027e', volumen_pct: 3.5, precio_pct: 0.0, otros_pct: 1.0 },
    { periodo: 'FY2028e', volumen_pct: 4.5, precio_pct: 1.5, otros_pct: 0.0 },
    { periodo: 'FY2029e', volumen_pct: 4.0, precio_pct: 1.5, otros_pct: 0.0 },
    { periodo: 'FY2030e', volumen_pct: 3.5, precio_pct: 1.5, otros_pct: 0.0 },
    { periodo: 'FY2031e', volumen_pct: 3.0, precio_pct: 1.5, otros_pct: 0.0 },
  ],
  mercado_final: null,
};
