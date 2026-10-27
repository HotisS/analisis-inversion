// Supuestos del «DCF» adaptado, escenarios y pesos de Santander Brasil (corte 2026-10-27). Ejercicio natural; millones de BRL.
//
// ES UN BANCO. El motor no tiene modelo de bancos; se adapta como en Itaú y BTG, solo como CONTRASTE (peso 0):
//  · «ingresos» = ingresos operativos NIIF netos de pérdidas por deterioro de activos financieros (39.835 M en 2025, CVM);
//    crecen como el patrimonio y la cartera (la senda del modelo de exceso de rentabilidad, valoracion-banco.mjs).
//  · «margen EBITDA» = beneficio antes de impuestos sobre ingresos, calibrado para que el beneficio después de impuestos sea
//    ROE recurrente BR GAAP × patrimonio BR GAAP: margen = ROE × (98.210 / 39.835 = 2,47) ÷ (1 + g) ÷ (1 − tipo).
//  · tipo del 20 %: el efectivo NIIF de 2025 fue del 22,5 % (3.764 / 16.729 M) con el JCP deducible; en el 2T26 gerencial,
//    crédito fiscal (+584 M).
//  · «capex» = retención: g × 2,47 ÷ (1 + g) de los ingresos, para que el patrimonio crezca con los activos ponderados por
//    riesgo y el CET1 no baje del 11 %. Amortización y circulante 0. WACC = Ke (peso de la deuda 0), puente 0.
import { RESULTADO, DATOS } from './valoracion-banco.mjs';

const ROE = [13.5, 14.5, 15.5, 16.0, 16.5, 16.5, 16.8, 17.0, 17.0, 17.0];
const G = [6.0, 6.5, 6.5, 6.5, 6.0, 6.0, 5.5, 5.5, 5.0, 5.0];
const PV_ING = 98210 / 39835;
const TAX = 20.0;
const r1 = (x) => Math.round(x * 10) / 10;
const anios = G.map((g, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: g,
  margen_ebitda_pct: r1(ROE[i] * PV_ING / (1 + g / 100) / (1 - TAX / 100)),
  amortizacion_pct_ventas: 0, capex_pct_ventas: r1(g * PV_ING / (1 + g / 100)),
  nwc_pct_ventas: 0, tasa_impositiva_pct: TAX, fijo: false,
}));

export default {
  anios,
  // Ke en BRL: bono de Brasil a 10 años del 15,435 % (26-oct-2026, el mismo que Itaú y BTG) + beta 1,0 × 5,5 % = 20,94 %.
  // Sin prima país: ya está dentro de la tasa libre en reales. Peso de la deuda 0.
  wacc: { tasa_libre_pct: DATOS.tasa_libre, beta: DATOS.beta, prima_mercado_pct: DATOS.prima, prima_adicional_pct: 0, coste_deuda_pct: 0, tasa_impositiva_pct: 34.0, peso_deuda_pct: 0 },
  terminal: { metodo: 'gordon', crecimiento_pct: DATOS.g_terminal, multiplo_salida: null },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -1.5, ajuste_margen_pp: -8.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.0, ajuste_margen_pp: 5.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 0, comparables: 0, transacciones: 0, suma_partes: 100, escenarios: 0 },
  ri: RESULTADO,
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 5.5, precio_pct: 0.5, otros_pct: 0.0 },
    { periodo: '2027e', volumen_pct: 6.0, precio_pct: 0.5, otros_pct: 0.0 },
    { periodo: '2028e', volumen_pct: 6.0, precio_pct: 0.5, otros_pct: 0.0 },
    { periodo: '2029e', volumen_pct: 6.0, precio_pct: 0.5, otros_pct: 0.0 },
    { periodo: '2030e', volumen_pct: 5.5, precio_pct: 0.5, otros_pct: 0.0 },
  ],
  mercado_final: null,
};
