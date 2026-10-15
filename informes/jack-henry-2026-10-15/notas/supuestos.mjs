// Supuestos del DCF, escenarios, pesos y BPA a 12 meses de Jack Henry (corte 2026-10-15). Cifras en millones de USD.
const g = [6.0, 6.7, 7.0, 6.5, 6.0, 5.5, 4.5, 3.8];
const m = [33.1, 33.5, 33.8, 34.0, 34.2, 34.3, 34.4, 34.4];
const am = [8.5, 8.6, 8.6, 8.6, 8.6, 8.6, 8.6, 8.6];
// Capex = equipos + software comprado + software desarrollado (10,0 % de las ventas en FY2026) + aumento de los costes de
// contratos activados (≈ 2,3 % de las ventas en FY2026), que no pasan por el capex del estado de flujos.
const cx = [12.0, 11.8, 11.6, 11.4, 11.2, 11.0, 10.8, 10.6];
const anios = g.map((x, i) => ({ periodo: `FY${2027 + i}e`, crecimiento_pct: x, margen_ebitda_pct: m[i], amortizacion_pct_ventas: am[i], capex_pct_ventas: cx[i], nwc_pct_ventas: 0.8, tasa_impositiva_pct: 23.0, fijo: false }));
export default {
  anios,
  wacc: { tasa_libre_pct: 5.21, beta: 0.71, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.5, tasa_impositiva_pct: 23.0, peso_deuda_pct: 1.0 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 15.0 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.5, ajuste_margen_pp: -2.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 0, transacciones: 0, suma_partes: 0, escenarios: 50 },
  puente_ingresos: [
    { periodo: 'FY2027e', volumen_pct: 2.5, precio_pct: 3.5, otros_pct: 0.0 },
    { periodo: 'FY2028e', volumen_pct: 3.2, precio_pct: 3.5, otros_pct: 0.0 },
    { periodo: 'FY2029e', volumen_pct: 3.5, precio_pct: 3.5, otros_pct: 0.0 },
    { periodo: 'FY2030e', volumen_pct: 3.0, precio_pct: 3.5, otros_pct: 0.0 },
    { periodo: 'FY2031e', volumen_pct: 2.5, precio_pct: 3.5, otros_pct: 0.0 },
  ],
  mercado_final: null,
};
