// Supuestos del DCF, escenarios y pesos de IHG (corte 2026-10-20). Ejercicio natural; millones de USD.
// Base de la cuenta: «segmentos reportables» de IHG (sin Fondo del Sistema, costes reembolsados ni excepcionales), la de la
// guía y el consenso. Margen EBITDA = resultado de segmentos + amortización sobre los ingresos de segmentos (54,0 % en 2025).
const g = [7.0, 6.0, 5.3, 5.0, 4.5, 4.0, 3.5, 3.0];
const m = [55.7, 57.1, 58.5, 59.5, 60.0, 60.5, 60.5, 60.5];
// Amortización: 67 M en 2025 (2,7 % de los ingresos de segmentos).
const am = [2.7, 2.7, 2.7, 2.7, 2.7, 2.7, 2.7, 2.7];
// Capex: inmovilizado y software + dinero clave (contract acquisition costs, que en NIIF va en el flujo operativo) +
// pagos de arrendamientos. Guía de dinero clave y mantenimiento 200-250 M al año; neto de 185 M en 2025 (7,5 % de los ingresos).
const cx = [7.5, 7.5, 7.5, 7.0, 7.0, 7.0, 7.0, 7.0];
const anios = g.map((x, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: x, margen_ebitda_pct: m[i], amortizacion_pct_ventas: am[i], capex_pct_ventas: cx[i],
  nwc_pct_ventas: 6.5, tasa_impositiva_pct: 27.0, fijo: i === 0,
}));
export default {
  anios,
  wacc: { tasa_libre_pct: 5.15, beta: 1.05, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.6, tasa_impositiva_pct: 27.0, peso_deuda_pct: 16 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 18.0 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -1.5, ajuste_margen_pp: -2.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.0, multiplo_salida: null,
      perfil: [{ periodo: '2027e', crecimiento_pp: -14.0, margen_pp: -4.0 }] },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 45, comparables: 10, transacciones: 0, suma_partes: 0, escenarios: 45 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 4.5, precio_pct: 2.5, otros_pct: 0.0 },
    { periodo: '2027e', volumen_pct: 4.5, precio_pct: 1.5, otros_pct: 0.0 },
    { periodo: '2028e', volumen_pct: 4.0, precio_pct: 1.3, otros_pct: 0.0 },
    { periodo: '2029e', volumen_pct: 3.8, precio_pct: 1.2, otros_pct: 0.0 },
    { periodo: '2030e', volumen_pct: 3.5, precio_pct: 1.0, otros_pct: 0.0 },
  ],
  mercado_final: null,
};
