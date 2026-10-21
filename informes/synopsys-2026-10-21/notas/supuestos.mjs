// Supuestos del DCF, escenarios y pesos de Synopsys (corte 2026-10-21). Ejercicio a 31 de octubre, etiquetado por el año en
// que termina (FY2026 = nov-25 a oct-26, a 10 días de cerrar: fijo). Millones de USD.
// Margen EBITDA del DCF = margen operativo no GAAP de la empresa − remuneración en acciones (coste real) + depreciación
// (2,2 % de las ventas; SIN la amortización de intangibles comprados). Excluye la reestructuración (380-410 M en FY2026) y los
// costes de compras, que se tratan como no recurrentes. FY2026e: 41,5 − 9,8 + 2,2 = 33,9 %; FY2027e: 44,0 − 8,7 + 2,2 = 37,5 %.
const g = [37.7, 14.8, 12.0, 11.0, 10.0, 9.0, 8.0, 7.0, 6.0, 5.0];
const m = [33.9, 37.5, 39.2, 40.4, 41.5, 42.0, 42.0, 42.0, 42.0, 42.0];
// Amortización = solo depreciación de inmovilizado (≈ 200 M en FY2026): la de intangibles de Ansys no es deducible en caja
// en su mayor parte (compra de acciones) y el tipo del 18 % es el no GAAP de la empresa, que ya la excluye.
const am = [2.2, 2.2, 2.2, 2.2, 2.2, 2.2, 2.2, 2.2, 2.2, 2.2];
// Capex: guía ≈ 225 M en FY2026 (2,3 %) y ≈ 500 M en FY2027 (4,5 %, nuevas instalaciones); después baja al 2,6 %.
const cx = [2.3, 4.5, 3.0, 2.6, 2.6, 2.6, 2.6, 2.6, 2.6, 2.6];
const anios = g.map((x, i) => ({
  periodo: `FY${2026 + i}e`, crecimiento_pct: x, margen_ebitda_pct: m[i], amortizacion_pct_ventas: am[i], capex_pct_ventas: cx[i],
  nwc_pct_ventas: -7.5, tasa_impositiva_pct: 18.0, fijo: i === 0,
}));
export default {
  anios,
  wacc: { tasa_libre_pct: 5.12, beta: 1.15, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.1, tasa_impositiva_pct: 18.0, peso_deuda_pct: 10.5 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 18.0 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -4.0, ajuste_margen_pp: -2.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 45, comparables: 15, transacciones: 0, suma_partes: 0, escenarios: 40 },
  puente_ingresos: [
    { periodo: 'FY2026e', volumen_pct: 6.7, precio_pct: 2.0, otros_pct: 29.0 },
    { periodo: 'FY2027e', volumen_pct: 11.8, precio_pct: 3.0, otros_pct: 0.0 },
    { periodo: 'FY2028e', volumen_pct: 9.0, precio_pct: 3.0, otros_pct: 0.0 },
    { periodo: 'FY2029e', volumen_pct: 8.0, precio_pct: 3.0, otros_pct: 0.0 },
    { periodo: 'FY2030e', volumen_pct: 7.0, precio_pct: 3.0, otros_pct: 0.0 },
  ],
  // Mercado de la ESD Alliance (≈ 22.490 M en los 12 meses a junio de 2026) al 9 % anual hasta 2035 [B1, B2].
  mercado_final: { periodo: '2035e', tamano: 50000 },
};
