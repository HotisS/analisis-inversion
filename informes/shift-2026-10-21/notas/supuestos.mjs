// Supuestos del DCF, escenarios y pesos de SHIFT (corte 2026-10-21). Ejercicio de septiembre a agosto, etiquetado por el
// año en que TERMINA (FY2027 = sep-2026 a ago-2027, en curso desde hace 1,7 meses). Millones de JPY, J-GAAP.
// Margen EBITDA del DCF = resultado operativo + amortización + amortización del fondo de comercio (= EBITDA de la empresa):
// 13,4 % en FY2026 (21.603 M), 14,5 % en FY2025, 12,1 % en FY2024, 15,1 % en FY2023 y 12,9 % en FY2022.
// FY2027e (fijo): ventas de 188.000 M (+16,3 %), algo por debajo de la guía (190.000, +17,6 %, sin compras nuevas, con
// Nisseicom todo el año: ≈ +6 puntos de efecto arrastre) y por encima del consenso (183.037). El 4T FY2026 (45.752 M) por
// cuatro ya da 183.000 M. Margen EBITDA del 14,2 %: resultado operativo ≈ 21.600 M (11,5 %, el de la guía: 25.000 M ajustado
// − 3.040 M de amortización de fondo de comercio e intangibles de clientes − costes de compras) + amortización ≈ 2,7 %.
// Después: orgánico ≈ 8-10 % (el plan SHIFT3000 da ≈ 20.000 M orgánicos al año) + compras pequeñas (≈ 2 puntos hasta FY2031).
const g = [16.3, 12.0, 10.0, 9.0, 8.0, 7.0, 6.0, 5.0];
const m = [14.2, 14.8, 15.2, 15.5, 15.5, 15.5, 15.5, 15.5];
// Amortización = inmovilizado e intangibles (≈ 1,3-1,5 %, con los de clientes de Nisseicom) + fondo de comercio (≈ 1,1-1,2 %,
// baja con las ventas porque las compras nuevas van al fondo con Tokyo Gas). Capex = inmovilizado (≈ 1,0-1,2 %) + compras
// de empresas que dan los ≈ 2 puntos de crecimiento comprado (≈ 1 vez ventas, como Nisseicom): 3,2 % hasta FY2031.
const am = [2.7, 2.7, 2.6, 2.5, 2.4, 2.3, 2.2, 2.2];
const cx = [1.2, 3.2, 3.2, 3.2, 3.2, 2.6, 2.2, 2.2];
// Impuestos: 37 % mientras pesa la amortización del fondo de comercio (no deducible en Japón; 34,1 % efectivo en FY2025,
// 42,7 % en FY2026 con la pérdida de Rise) y 35 % después.
const tx = [37, 37, 36, 36, 35, 35, 35, 35];
const anios = g.map((x, i) => ({
  periodo: `FY${2027 + i}e`, crecimiento_pct: x, margen_ebitda_pct: m[i], amortizacion_pct_ventas: am[i], capex_pct_ventas: cx[i],
  // Circulante operativo (clientes + activos de contrato + existencias − pasivos corrientes de explotación): 2,2 % de las
  // ventas en FY2026, −1,0 % en FY2025 y 0 % en FY2024.
  nwc_pct_ventas: 2.0, tasa_impositiva_pct: tx[i], fijo: i === 0,
}));
export default {
  anios,
  // Tasa libre: bono japonés a 10 años (2,927 %, 20-oct-2026). Beta 1,1 (semanal a 5 años frente al TOPIX 1,11; la mensual,
  // 0,55, sale baja por cierres anómalos del ETF) + 1 punto de prima adicional por el riesgo de que la IA reduzca las horas.
  // Deuda: 34.713 M frente a ≈ 270.000 M de capitalización → 11 %.
  wacc: { tasa_libre_pct: 2.927, beta: 1.1, prima_mercado_pct: 5.5, prima_adicional_pct: 1.0, coste_deuda_pct: 1.5, tasa_impositiva_pct: 30.6, peso_deuda_pct: 11 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.0, multiplo_salida: 12.0 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  // Probabilidades 30/50/20: el bajista (la IA reduce las horas de prueba que compran los clientes) pesa más que el alcista
  // porque ya se ve: las pruebas tradicionales bajaron del 42 % al 19 % de las ventas en un año y la empresa dejó de contratar
  // ingenieros jóvenes porque da por hecho que la IA los sustituye.
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 30, ajuste_crecimiento_pp: -6.0, ajuste_margen_pp: -2.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 1.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 20, ajuste_crecimiento_pp: 3.0, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 10, transacciones: 0, suma_partes: 0, escenarios: 40 },
  // Puente de ingresos: volumen = proyectos y personas facturables; precio = precio por proyecto; otros = crecimiento comprado
  // (arrastre de Nisseicom en FY2027e, compras pequeñas después).
  puente_ingresos: [
    { periodo: 'FY2027e', volumen_pct: 5.5, precio_pct: 4.5, otros_pct: 6.3 },
    { periodo: 'FY2028e', volumen_pct: 5.0, precio_pct: 4.0, otros_pct: 3.0 },
    { periodo: 'FY2029e', volumen_pct: 4.5, precio_pct: 3.5, otros_pct: 2.0 },
    { periodo: 'FY2030e', volumen_pct: 4.0, precio_pct: 3.0, otros_pct: 2.0 },
    { periodo: 'FY2031e', volumen_pct: 3.5, precio_pct: 3.0, otros_pct: 1.5 },
  ],
  // Servicios de TI de Japón: 10,25 billones de JPY en 2030 (IDC Japan [B1]) y ≈ 5 % anual después (estimación propia)
  // → ≈ 12,46 billones en 2034 (el año a ago-2034).
  mercado_final: { periodo: 'FY2034e', tamano: 12460000 },
};
