// Supuestos numéricos (Alibaba, corte 2026-10-27). Millones de RMB; base FY2026 (ingresos 1.023.670 M; EBITDA 90.192 M
// + 10.007 M de deterioros = 100.199 M recurrente, 9,8 %). EBITDA después de pagos en acciones (≈ 1,1 % de las ventas).
// Capex: 126.937 M en FY2026 (12,4 %) y 67.678 M solo en el 1T FY2027 (25 % de las ventas del trimestre) [A].
// Crecimiento rebajado 1 punto en FY2027-31 porque la prueba de sostenibilidad falla (capital nuevo; ver textos).
const crec = [8, 9, 9, 7, 6, 5, 4, 3.5];
// Circulante negativo (cobros de clientes antes de pagar a comercios): −29,8 % de las ventas en FY2026 [A]; converge a −25 %.
const nwc = [-29.8, -29, -28, -27, -26, -25, -25, -25];
// Margen EBITDA: vuelve hacia el de FY2024-25 (16,8-18,4 % con no recurrentes fuera) y se queda en el 19 %: la nube tiene
// menos margen que Taobao/Tmall y el comercio rápido no gana dinero hasta FY2029 según la empresa.
const margen = [15, 17, 18, 18.5, 19, 19, 19, 19];
const amort = [5.2, 6.5, 7.2, 7.5, 7.5, 7.3, 7.0, 6.8];
const capex = [22, 16, 12, 10, 8.5, 7.5, 7.0, 7.0];
const anios = crec.map((g, i) => ({
  periodo: `FY${2027 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: nwc[i],
  tasa_impositiva_pct: 20,
  fijo: false,
}));

export default {
  anios,
  // Bono chino a 10 años 1,63 % [D6]; beta semanal 0,94-1,00 [D1]; prima adicional 2,0 = ≈ ⅓ de la prima país de China (0,3)
  // + 1,7 de riesgo propio del ADS (estructura VIE y lista 1260H del Pentágono) que el bono local no recoge.
  wacc: { tasa_libre_pct: 1.63, beta: 1.0, prima_mercado_pct: 5.5, prima_adicional_pct: 2.0, coste_deuda_pct: 3.0, tasa_impositiva_pct: 20, peso_deuda_pct: 12 },
  terminal: { metodo: 'gordon', crecimiento_pct: 1.1, multiplo_salida: 10 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: 'FY2027e', volumen_pct: 6, precio_pct: 2, otros_pct: 0 },
    { periodo: 'FY2028e', volumen_pct: 7, precio_pct: 2, otros_pct: 0 },
    { periodo: 'FY2029e', volumen_pct: 7, precio_pct: 2, otros_pct: 0 },
    { periodo: 'FY2030e', volumen_pct: 5, precio_pct: 2, otros_pct: 0 },
    { periodo: 'FY2031e', volumen_pct: 4, precio_pct: 2, otros_pct: 0 },
  ],
  mercado_final: null,
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 30, ajuste_crecimiento_pp: -3, ajuste_margen_pp: -3, ajuste_wacc_pp: 1, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 20, ajuste_crecimiento_pp: 2, ajuste_margen_pp: 2, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
  // BPA no GAAP por ADS (misma base que la historia del PER, [D] y [A]): BPA = 0,8 × (EBITDA − amortización + ≈ 16.000-17.000 M
  // de pagos en acciones y amortización de intangibles = EBITA ajustado) ÷ ADS diluidos (2.440-2.450 M). Calibrado con el 1T FY2027
  // (beneficio no GAAP ≈ 0,75 del EBITA ajustado) y FY2026 (0,84).
  bpa: { FY2027e: 40.7, FY2028e: 46.8, Bajista: 36.0, Base: 51.9, Alcista: 63.6 },
};
