// Supuestos del DCF, escenarios y pesos de Reply (corte 2026-10-21). Ejercicio a 31 de diciembre. Millones de EUR.
// Ingresos = cuenta NIIF (sin las subvenciones que la empresa suma a sus ingresos de gestión). 2026e está fijo (lleva 9,7 meses
// y el primer semestre publicado: ingresos NIIF +7,1 %; el segundo semestre a +9,5 % con FedTec, Cyberis y Movar).
// Margen EBITDA = EBITDA de la empresa sobre ingresos NIIF (subyacente 17,9 % en 2025, 18,0 % en el 1S26), plano en el 18,3 %:
// sin expansión, porque las tarifas bajan y la productividad de la IA se devuelve al cliente para ganar cuota (dirección, 2026).
const g = [8.3, 7.5, 7.0, 6.5, 6.0, 5.0, 4.0, 3.0];
const m = [18.3, 18.3, 18.3, 18.3, 18.3, 18.3, 18.3, 18.3];
// Amortización: 2,75 % de las ventas (2,74 % en el 1S26; 2,87 % en 2025 sin los 19 M de deterioro de Francia), con la de
// los derechos de uso.
const am = [2.75, 2.75, 2.75, 2.75, 2.75, 2.75, 2.75, 2.75];
// «Capex» = inversión fija (1,9 % en 2025) + altas de derechos de uso (≈ 1,4 %: los pagos de arrendamientos, NIIF 16) + compras
// pequeñas que forman parte del crecimiento (≈ 1 % de las ventas los primeros años; 2,8 % de media en 2020-2025), que bajan
// cuando el crecimiento converge al 3 %.
const cx = [4.3, 4.3, 4.2, 4.0, 3.8, 3.6, 3.4, 3.3];
const anios = g.map((x, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: x, margen_ebitda_pct: m[i], amortizacion_pct_ventas: am[i], capex_pct_ventas: cx[i],
  nwc_pct_ventas: 28.0, tasa_impositiva_pct: 31.5, fijo: i === 0,
}));
export default {
  anios,
  wacc: { tasa_libre_pct: 3.44, beta: 0.90, prima_mercado_pct: 5.5, prima_adicional_pct: 0.5, coste_deuda_pct: 4.0, tasa_impositiva_pct: 31.5, peso_deuda_pct: 4 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.0, multiplo_salida: 9.0 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -4.0, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 1.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 0.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 10, transacciones: 0, suma_partes: 0, escenarios: 40 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 7.0, precio_pct: -1.0, otros_pct: 2.3 },
    { periodo: '2027e', volumen_pct: 7.0, precio_pct: -1.0, otros_pct: 1.5 },
    { periodo: '2028e', volumen_pct: 6.5, precio_pct: -0.5, otros_pct: 1.0 },
    { periodo: '2029e', volumen_pct: 6.0, precio_pct: 0.0, otros_pct: 0.5 },
    { periodo: '2030e', volumen_pct: 5.5, precio_pct: 0.0, otros_pct: 0.5 },
  ],
  mercado_final: null,
};
