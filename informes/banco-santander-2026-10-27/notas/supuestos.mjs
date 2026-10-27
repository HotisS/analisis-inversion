// Supuestos del «DCF» adaptado, escenarios y pesos de Banco Santander (corte 2026-10-27). Ejercicio natural; millones de EUR.
//
// ES UN BANCO. El motor no tiene modelo de bancos; se adapta como en Itaú, BTG y Santander Brasil, solo como CONTRASTE (peso 0):
//  · «ingresos» = margen bruto NIIF menos pérdidas por deterioro, provisiones y otros resultados (BAI − participadas + gastos de
//    administración + amortización: 42.727 M en 2025, ESEF); crecen como el patrimonio tangible y el balance.
//  · «margen EBITDA» = beneficio antes de impuestos sobre ingresos, calibrado para que el beneficio después de impuestos sea
//    RoTE ordinario × patrimonio tangible: margen = RoTE × (84.600 / 42.727 = 1,98) ÷ (1 + g) ÷ (1 − tipo).
//    Patrimonio tangible de dic-2025 = 5,76 € × 14.689 M de acciones = 84.600 M [A1].
//  · tipo del 27 %: efectivo NIIF de 2025 del 25,3 % (4.723 / 18.681 M) más la fuga de minoritarios (1.399 M).
//  · «capex» = retención: g × 1,98 ÷ (1 + g) de los ingresos, para que el capital crezca con el balance y el CET1 se quede en
//    el 12,8-13 %. Amortización y circulante 0. WACC = Ke (peso de la deuda 0), puente 0.
import { RESULTADO, DATOS, CRP } from './valoracion-banco.mjs';

const ROE = [16.0, 16.8, 17.5, 18.0, 18.0, 17.5, 17.0, 17.0, 16.5, 16.5];
const G = [7.0, 7.0, 6.5, 6.0, 5.5, 5.0, 4.5, 4.0, 3.5, 3.0];
const PV_ING = 84600 / 42727;
const TAX = 27.0;
const r1 = (x) => Math.round(x * 10) / 10;
const anios = G.map((g, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: g,
  margen_ebitda_pct: r1(ROE[i] * PV_ING / (1 + g / 100) / (1 - TAX / 100)),
  amortizacion_pct_ventas: 0, capex_pct_ventas: r1(g * PV_ING / (1 + g / 100)),
  nwc_pct_ventas: 0, tasa_impositiva_pct: TAX, fijo: false,
}));

export default {
  anios,
  // Ke en EUR: Bund 3,43 % (Bundesbank, 26-oct-2026) + beta 1,24 × 5,5 % + prima país ponderada por beneficio (1,81) = 12,06 %.
  wacc: { tasa_libre_pct: DATOS.tasa_libre, beta: DATOS.beta, prima_mercado_pct: DATOS.prima, prima_adicional_pct: CRP, coste_deuda_pct: 0, tasa_impositiva_pct: 25.0, peso_deuda_pct: 0 },
  terminal: { metodo: 'gordon', crecimiento_pct: DATOS.g_terminal, multiplo_salida: null },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -1.5, ajuste_margen_pp: -10.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.0, ajuste_margen_pp: 6.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 0, comparables: 0, transacciones: 0, suma_partes: 100, escenarios: 0 },
  ri: RESULTADO,
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 6.0, precio_pct: 1.0, otros_pct: 0.0 },
    { periodo: '2027e', volumen_pct: 6.0, precio_pct: 1.0, otros_pct: 0.0 },
    { periodo: '2028e', volumen_pct: 5.5, precio_pct: 1.0, otros_pct: 0.0 },
    { periodo: '2029e', volumen_pct: 5.0, precio_pct: 1.0, otros_pct: 0.0 },
    { periodo: '2030e', volumen_pct: 4.5, precio_pct: 1.0, otros_pct: 0.0 },
  ],
  mercado_final: null,
};
