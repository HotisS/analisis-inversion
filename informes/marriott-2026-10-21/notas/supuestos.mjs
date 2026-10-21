// Supuestos del DCF, escenarios y pesos de Marriott International (corte 2026-10-21). Ejercicio natural; 2026e en curso
// (quedan el 3T y el 4T). Millones de USD.
// BASE: ingresos AJUSTADOS de la empresa (sin ingresos de costes reembolsados): 6.997 M en 2025.
// Margen EBITDA del DCF = (resultado operativo ajustado + depreciación + amortización de la inversión en contratos) ÷ ingresos
// ajustados = (4.476 + 213 + 135) ÷ 6.997 = 68,9 % en 2025. NO suma los pagos en acciones (236 M), que el EBITDA ajustado
// de la empresa (5.383 M) sí suma: aquí son coste.
// 2026e: ingresos +10 % (1S26 +11,8 %; comisiones brutas guiadas +11 %) y margen del 70,5 %, calibrado con la guía de BPA
// ajustado (11,64-11,81 USD) y de EBITDA ajustado (5.965-6.025 M, +11 %).
const g = [10.0, 7.5, 7.0, 6.5, 6.0, 5.5, 5.0, 4.5];
const m = [70.5, 71.0, 71.5, 71.5, 71.5, 71.5, 71.5, 71.5];
// Amortización (depreciación + amortización de contratos): 5,0 % de los ingresos ajustados en 2025 (348 M), subiendo porque
// la inversión en contratos («key money») se amortiza a 20-30 años y crece.
const am = [5.0, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7];
// Inversión = inmovilizado y tecnología (604 M en 2025) + inversión en contratos (434 M, dentro del flujo operativo en las
// cuentas): 14,8 % de los ingresos ajustados en 2025. Baja hacia el 11 % al frenar el crecimiento de habitaciones.
const cx = [14.0, 14.0, 13.5, 13.0, 12.5, 12.0, 11.5, 11.0];
const anios = g.map((x, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: x, margen_ebitda_pct: m[i], amortizacion_pct_ventas: am[i], capex_pct_ventas: cx[i],
  // Circulante sin el pasivo de fidelidad ni los ingresos diferidos (clientes + anticipos − proveedores − nóminas y gastos
  // devengados = −466 M en 2025, −6,7 % de los ingresos ajustados).
  nwc_pct_ventas: -6.5, tasa_impositiva_pct: 26.0, fijo: i === 0,
}));
export default {
  anios,
  wacc: { tasa_libre_pct: 5.12, beta: 1.11, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.5, tasa_impositiva_pct: 26.0, peso_deuda_pct: 14 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 18.0 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -2.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 15, transacciones: 0, suma_partes: 0, escenarios: 35 },
  // Crecimiento de los ingresos ajustados = habitaciones netas (volumen) + RevPAR (precio) + otros (tarjetas, mezcla de
  // lujo, incentivos). Las comisiones siguen al RevPAR y a las habitaciones casi uno a uno.
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 4.5, precio_pct: 3.0, otros_pct: 2.5 },
    { periodo: '2027e', volumen_pct: 4.5, precio_pct: 2.5, otros_pct: 0.5 },
    { periodo: '2028e', volumen_pct: 4.5, precio_pct: 2.5, otros_pct: 0.0 },
    { periodo: '2029e', volumen_pct: 4.0, precio_pct: 2.5, otros_pct: 0.0 },
    { periodo: '2030e', volumen_pct: 3.5, precio_pct: 2.5, otros_pct: 0.0 },
  ],
  mercado_final: null,
};
