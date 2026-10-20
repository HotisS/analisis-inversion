// Supuestos del DCF, escenarios y pesos de Paylocity (corte 2026-10-20). Ejercicio a 30 de junio, etiquetado por el año en
// que termina (FY2027 = jul-26 a jun-27, en curso desde hace 3,7 meses; sin trimestres publicados: ningún año fijo).
// Millones de USD. Margen EBITDA del DCF = EBITDA GAAP (con los pagos en acciones como coste real, y con la amortización de
// los costes de contratos activados ya restada, porque la empresa la lleva a gastos operativos y no a amortizaciones).
// FY2027e: guía de EBITDA ajustado 690-700 M − pagos en acciones con cotizaciones ≈ 145 M − otros ≈ 5 M ≈ 545 M = 28,9 %
// de 1.888 M (centro de la guía de ingresos). Incluye ≈ 103 M de intereses de fondos de clientes (≈ 120 M en FY2026).
const g = [6.6, 8.0, 8.0, 7.5, 7.0, 6.0, 5.0, 4.0];
const m = [28.9, 30.5, 32.0, 33.3, 34.3, 35.0, 35.5, 35.5];
// Amortización (inmovilizado + software activado + intangibles comprados): 6,3 % de las ventas en FY2026 (111,8 M).
const am = [6.3, 6.3, 6.2, 6.2, 6.1, 6.1, 6.0, 6.0];
// «Capex» del DCF = inmovilizado (≈ 2 %) + software activado (≈ 3,9 %) + aumento neto de los costes de contratos activados
// (2,7 % en FY2026; ≈ 4 % en FY2027e por el paso de 7 a 8 años de vida, que baja la amortización sin cambiar la caja).
const cx = [10.0, 9.5, 9.2, 8.8, 8.5, 8.0, 7.6, 7.4];
const anios = g.map((x, i) => ({
  periodo: `FY${2027 + i}e`, crecimiento_pct: x, margen_ebitda_pct: m[i], amortizacion_pct_ventas: am[i], capex_pct_ventas: cx[i],
  nwc_pct_ventas: -1.0, tasa_impositiva_pct: 27.0, fijo: false,
}));
export default {
  anios,
  wacc: { tasa_libre_pct: 5.15, beta: 0.9, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 6.0, tasa_impositiva_pct: 27.0, peso_deuda_pct: 1 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 15.0 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -3.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 45, comparables: 20, transacciones: 5, suma_partes: 0, escenarios: 30 },
  puente_ingresos: [
    { periodo: 'FY2027e', volumen_pct: 5.6, precio_pct: 2.0, otros_pct: -1.0 },
    { periodo: 'FY2028e', volumen_pct: 5.5, precio_pct: 2.5, otros_pct: 0.0 },
    { periodo: 'FY2029e', volumen_pct: 5.5, precio_pct: 2.5, otros_pct: 0.0 },
    { periodo: 'FY2030e', volumen_pct: 5.0, precio_pct: 2.5, otros_pct: 0.0 },
    { periodo: 'FY2031e', volumen_pct: 4.5, precio_pct: 2.5, otros_pct: 0.0 },
  ],
  // Mercado direccionable realizado de 22.500 M USD en 2026 [B1] creciendo al 4,7 % del Census [B2] → ≈ 28.300 M en 2031.
  mercado_final: { periodo: 'FY2031e', tamano: 28300 },
};
