// Supuestos del DCF, escenarios y BPA a 12 meses de Genmab (corte 2026-10-15). Cifras en millones de USD.
const anios = [
  // 2026e: guía revisada de agosto (punto medio 4.425 M); EBITDA NIIF = beneficio operativo ajustado 1.225 − integración 90 − amortización de compras 47 + amortizaciones ≈112
  { periodo: '2026e', crecimiento_pct: 18.95, margen_ebitda_pct: 27.1, amortizacion_pct_ventas: 2.5, capex_pct_ventas: 1.2, nwc_pct_ventas: 26, tasa_impositiva_pct: 8, fijo: true },
  { periodo: '2027e', crecimiento_pct: 18.6, margen_ebitda_pct: 31, amortizacion_pct_ventas: 2.3, capex_pct_ventas: 1.3, nwc_pct_ventas: 26, tasa_impositiva_pct: 15, fijo: false },
  { periodo: '2028e', crecimiento_pct: 17.0, margen_ebitda_pct: 35, amortizacion_pct_ventas: 2.1, capex_pct_ventas: 1.3, nwc_pct_ventas: 26, tasa_impositiva_pct: 20, fijo: false },
  // 2029e: caduca la patente de daratumumab en EE. UU. (≈60 % de las ventas de DARZALEX)
  { periodo: '2029e', crecimiento_pct: -13.0, margen_ebitda_pct: 24, amortizacion_pct_ventas: 2.3, capex_pct_ventas: 1.4, nwc_pct_ventas: 26, tasa_impositiva_pct: 20, fijo: false },
  { periodo: '2030e', crecimiento_pct: 15.0, margen_ebitda_pct: 27, amortizacion_pct_ventas: 2.1, capex_pct_ventas: 1.4, nwc_pct_ventas: 26, tasa_impositiva_pct: 20, fijo: false },
  // 2031e: caduca Europa (daratumumab) y la patente de EE. UU. de ofatumumab (Kesimpta)
  { periodo: '2031e', crecimiento_pct: -2.0, margen_ebitda_pct: 26, amortizacion_pct_ventas: 2.2, capex_pct_ventas: 1.5, nwc_pct_ventas: 26, tasa_impositiva_pct: 20, fijo: false },
  { periodo: '2032e', crecimiento_pct: 12.0, margen_ebitda_pct: 29, amortizacion_pct_ventas: 1.9, capex_pct_ventas: 1.5, nwc_pct_ventas: 26, tasa_impositiva_pct: 20, fijo: false },
  { periodo: '2033e', crecimiento_pct: 9.0, margen_ebitda_pct: 31, amortizacion_pct_ventas: 1.8, capex_pct_ventas: 1.5, nwc_pct_ventas: 26, tasa_impositiva_pct: 20, fijo: false },
  { periodo: '2034e', crecimiento_pct: 6.0, margen_ebitda_pct: 32, amortizacion_pct_ventas: 1.7, capex_pct_ventas: 1.6, nwc_pct_ventas: 26, tasa_impositiva_pct: 20, fijo: false },
  { periodo: '2035e', crecimiento_pct: 4.0, margen_ebitda_pct: 33, amortizacion_pct_ventas: 1.6, capex_pct_ventas: 1.6, nwc_pct_ventas: 26, tasa_impositiva_pct: 20, fijo: false },
];

const wacc = { tasa_libre_pct: 5.21, beta: 1.0, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 6.4, tasa_impositiva_pct: 22, peso_deuda_pct: 18 };
const terminal = { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 11 };
const etapa2 = { usar: false, anios: 10, margen_final_pct: null };

const puente_ingresos = [
  { periodo: '2026e', volumen_pct: 15.0, precio_pct: 1.0, otros_pct: 2.95 },
  { periodo: '2027e', volumen_pct: 16.0, precio_pct: 1.0, otros_pct: 1.6 },
  { periodo: '2028e', volumen_pct: 15.0, precio_pct: 1.0, otros_pct: 1.0 },
  { periodo: '2029e', volumen_pct: -14.0, precio_pct: 1.0, otros_pct: 0.0 },
  { periodo: '2030e', volumen_pct: 14.0, precio_pct: 1.0, otros_pct: 0.0 },
];

const casos = [
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -4, ajuste_margen_pp: -5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 3, ajuste_margen_pp: 3, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
];

// BPA propio (USD) con la fórmula del método: ventas × margen − amortización − financiero − impuestos, ÷ 61,9 M de acciones.
// Resultado financiero: deuda nominal 5.375 M a jun-26 amortizada con la caja libre (≈ −300 M en 2027, −230 en 2028, −180 en 2029, −150 en 2030; peor en el bajista, mejor en el alcista).
const ACC = 61.9;
const ventas0 = 4425;
function bpa(dg, dm, fin) {
  let v = ventas0; const out = {};
  for (const a of anios.slice(1, 5)) {
    v = v * (1 + (a.crecimiento_pct + dg) / 100);
    const ebit = v * (a.margen_ebitda_pct + dm) / 100 - v * a.amortizacion_pct_ventas / 100;
    const bai = ebit + fin[a.periodo];
    out[a.periodo] = Math.round((bai * (1 - a.tasa_impositiva_pct / 100) / ACC) * 100) / 100;
  }
  return out;
}
const BPA = {
  Bajista: bpa(-4, -5, { '2027e': -300, '2028e': -240, '2029e': -200, '2030e': -180 }),
  Base: bpa(0, 0, { '2027e': -300, '2028e': -230, '2029e': -180, '2030e': -150 }),
  Alcista: bpa(3, 3, { '2027e': -300, '2028e': -220, '2029e': -160, '2030e': -120 }),
};
// BPA normalizado del ejercicio objetivo: media de 2028e-2030e (cruza la caída de las regalías de DARZALEX en EE. UU.)
const norm = (b) => Math.round(((b['2028e'] + b['2029e'] + b['2030e']) / 3) * 100) / 100;
const BPA_NORM = { Bajista: norm(BPA.Bajista), Base: norm(BPA.Base), Alcista: norm(BPA.Alcista) };

const pesos = { dcf: 50, comparables: 10, transacciones: 0, suma_partes: 0, escenarios: 40 };

export default { anios, wacc, terminal, etapa2, puente_ingresos, casos, BPA, BPA_NORM, pesos, ACC };
