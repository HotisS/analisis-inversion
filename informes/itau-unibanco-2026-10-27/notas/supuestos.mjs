// Supuestos del «DCF» adaptado, escenarios y pesos de Itaú Unibanco (corte 2026-10-27). Ejercicio natural; millones de BRL.
//
// ES UN BANCO. El motor no tiene modelo de bancos: su DCF de EBITDA, ROIC, valor empresa y circulante no tienen sentido para
// una entidad cuya deuda (depósitos, emisiones) es materia prima. Se adapta así, solo como CONTRASTE (peso 0):
//  · «ingresos» = ingresos operativos NIIF netos de pérdidas esperadas (138.947 M en 2025); crecen como el patrimonio y la
//    cartera (los mismos 8 % → 5 % del modelo de exceso de rentabilidad, valoracion-banco.mjs).
//  · «margen EBITDA» = beneficio antes de impuestos sobre ingresos, calibrado para que el beneficio después de impuestos sea
//    ROE recurrente × patrimonio inicial: margen = ROE × (patrimonio / ingresos = 1,47) ÷ (1 + g) ÷ (1 − tipo).
//  · tipo del 9 %: el efectivo NIIF de 2025 fue del 8,8 % (4.401 / 50.250 M) por la deducción de los intereses sobre el capital
//    propio (JCP) y los créditos fiscales; la guía gerencial (29,5-32,5 %) es antes de esos efectos.
//  · «capex» = retención: el beneficio que el banco debe guardar para que el patrimonio crezca como los activos ponderados por
//    riesgo y el CET1 se quede en el objetivo del 11,5 %: capex = g × 1,47 ÷ (1 + g) de los ingresos. Amortización y
//    circulante 0. Así el «flujo libre» = beneficio − retención = lo que puede repartir (dividendos, JCP y recompras): un FCFE.
//  · WACC = Ke (peso de la deuda 0) y deuda neta 0 en el puente.
// El valor que manda es el del modelo de exceso de rentabilidad (residual income), que entra por la suma de partes.
import { RESULTADO, DATOS } from './valoracion-banco.mjs';

const ROE = [24.5, 24.0, 23.5, 23.0, 22.5, 22.3, 22.1, 21.9, 21.7, 21.5];
const G = [8.0, 8.0, 7.5, 7.0, 6.5, 6.2, 5.9, 5.6, 5.3, 5.0];
const PV_ING = 204501 / 138947; // patrimonio NIIF / ingresos NIIF de 2025 = 1,47
const TAX = 9.0;
const r1 = (x) => Math.round(x * 10) / 10;
const anios = G.map((g, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: g,
  margen_ebitda_pct: r1(ROE[i] * PV_ING / (1 + g / 100) / (1 - TAX / 100)),
  amortizacion_pct_ventas: 0, capex_pct_ventas: r1(g * PV_ING / (1 + g / 100)),
  nwc_pct_ventas: 0, tasa_impositiva_pct: TAX, fijo: false,
}));

export default {
  anios,
  // Ke en BRL: bono de Brasil a 10 años del 15,44 % (26-oct-2026, +2,46 puntos el día de la caída) + beta 1,10 × 5,5 % = 21,49 %.
  // Sin prima adicional por riesgo país: ya está dentro de la tasa libre en reales (sumar +3 puntos, como hacía el escáner, sería
  // contarlo dos veces). Peso de la deuda 0: la deuda de un banco no es financiación del accionista sino materia prima.
  wacc: { tasa_libre_pct: DATOS.tasa_libre, beta: DATOS.beta, prima_mercado_pct: DATOS.prima, prima_adicional_pct: 0, coste_deuda_pct: 0, tasa_impositiva_pct: 34.0, peso_deuda_pct: 0 },
  // Terminal: IPCA a largo plazo del Focus (3,5 %) + 1,5 de crecimiento real = 5,0 % nominal en reales.
  terminal: { metodo: 'gordon', crecimiento_pct: DATOS.g_terminal, multiplo_salida: null },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -4.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.0, ajuste_margen_pp: 2.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  // El valor intrínseco es el del modelo de exceso de rentabilidad (100 %), que entra como una «parte» con valor directo.
  pesos: { dcf: 0, comparables: 0, transacciones: 0, suma_partes: 100, escenarios: 0 },
  ri: RESULTADO,
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 7.5, precio_pct: 0.5, otros_pct: 0.0 },
    { periodo: '2027e', volumen_pct: 7.5, precio_pct: 0.5, otros_pct: 0.0 },
    { periodo: '2028e', volumen_pct: 7.0, precio_pct: 0.5, otros_pct: 0.0 },
    { periodo: '2029e', volumen_pct: 6.5, precio_pct: 0.5, otros_pct: 0.0 },
    { periodo: '2030e', volumen_pct: 6.0, precio_pct: 0.5, otros_pct: 0.0 },
  ],
  mercado_final: null,
};
