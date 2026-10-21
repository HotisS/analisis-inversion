// Supuestos del DCF, escenarios y pesos de Gamma Communications (corte 2026-10-21). Ejercicio a 31 de diciembre. Millones de GBP.
// Margen EBITDA del DCF = EBITDA ajustado de la empresa (21,9 % de las ventas en 2025) MENOS 0,4 puntos por los extraordinarios
// que se repiten (reestructuraciones y costes de compras: 2022, 2023 y 2025) y que la empresa excluye de su ajustado.
// Amortización = la de los activos propios (inmovilizado, derechos de uso y desarrollo capitalizado: 3,3 % de las ventas en 2025);
// la amortización de intangibles de compras (18,6 M en 2025) no es caja y en compras de acciones no desgrava en el Reino Unido.
// Inversión = capex + pagos de arrendamientos (4,6 % de las ventas en 2025; guía de capex ≈ 27-28 M).
const g = [2.6, 3.0, 4.0, 4.5, 4.0, 3.5, 3.0, 2.5];
const m = [20.9, 21.0, 21.5, 21.8, 22.0, 22.0, 22.0, 22.0];
const am = [3.6, 3.7, 3.8, 3.9, 4.0, 4.0, 4.0, 4.0];
const cx = [5.0, 4.9, 4.8, 4.7, 4.6, 4.5, 4.5, 4.5];
const anios = g.map((x, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: x, margen_ebitda_pct: m[i], amortizacion_pct_ventas: am[i], capex_pct_ventas: cx[i],
  nwc_pct_ventas: 5.8, tasa_impositiva_pct: 25.5, fijo: i === 0,
}));
// Mercado: ≈ 4.600 M GBP en 2025 (ventas de Gamma ÷ ≈ 14 % de cuota en puestos), +7 % anual hasta 2028 (usuarios de nube
// de Cavell: Reino Unido +7 %, Alemania +16 %) y +4 % después (estimación propia).
const mercado2033 = Math.round(5600 * Math.pow(1.04, 5));
export default {
  anios,
  wacc: { tasa_libre_pct: 5.30, beta: 0.90, prima_mercado_pct: 5.5, prima_adicional_pct: 0.5, coste_deuda_pct: 6.0, tasa_impositiva_pct: 25.5, peso_deuda_pct: 4 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.0, multiplo_salida: 8.0 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 1.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.0, ajuste_margen_pp: 0.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 45, comparables: 10, transacciones: 15, suma_partes: 0, escenarios: 30 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 1.5, precio_pct: 0.0, otros_pct: 1.1 },
    { periodo: '2027e', volumen_pct: 2.5, precio_pct: 0.5, otros_pct: 0.0 },
    { periodo: '2028e', volumen_pct: 3.0, precio_pct: 1.0, otros_pct: 0.0 },
    { periodo: '2029e', volumen_pct: 3.5, precio_pct: 1.0, otros_pct: 0.0 },
    { periodo: '2030e', volumen_pct: 3.0, precio_pct: 1.0, otros_pct: 0.0 },
  ],
  mercado_final: { periodo: '2033e', tamano: mercado2033 },
};
