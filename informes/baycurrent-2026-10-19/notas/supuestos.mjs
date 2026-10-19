// Supuestos del DCF, escenarios y pesos de BayCurrent (corte 2026-10-19). Ejercicio de marzo a febrero, etiquetado por el
// año en que EMPIEZA (FY2026 = mar-2026 a feb-2027, en curso desde hace 7,6 meses). Millones de JPY.
// Margen EBITDA del DCF = resultado operativo + TODA la amortización (con la de derechos de uso de oficinas): 36,0 % en
// FY2025 (53.456 M) y 34,3 % en el 1S FY2026; el de la empresa (sin derechos de uso) es ≈ 1 punto menor.
// FY2026e (fijo): ingresos de 196.000 M (+32,1 %): 1S de 92.913 M (+35,7 %) y 2S de ≈ 103.100 M (+29 % sobre los 79.870 del
// 2S FY2025), con el 2T creciendo un 41,5 %; por encima de la guía (190.000, que la empresa dice que superará) y del consenso
// (194.233). Resultado operativo ≈ 64.900 M (2S al 34 %, como el 2S FY2025) + amortización ≈ 4.100 → EBITDA del 35,2 %.
const g = [32.1, 22.0, 18.0, 15.0, 12.0, 10.0, 8.0, 6.0];
const m = [35.2, 35.5, 36.0, 36.5, 37.0, 37.0, 37.0, 37.0];
// Amortización total ≈ 2,1 % de las ventas (2.016 M en el 1S FY2026 sobre 92.913: 2,2 %; 1,7 % en FY2025 antes de las
// oficinas nuevas). Capex = inmovilizado (≈ 0,8 %) + altas de derechos de uso de oficinas (≈ 1,3 %, lo que cuestan los
// alquileres de la plantilla que crece: los arrendamientos futuros no están en el puente) = 2,1 %.
const am = [2.1, 2.1, 2.1, 2.1, 2.1, 2.1, 2.1, 2.1];
const cx = [2.1, 2.1, 2.1, 2.1, 2.1, 2.1, 2.1, 2.1];
const anios = g.map((x, i) => ({
  periodo: `FY${2026 + i}e`, crecimiento_pct: x, margen_ebitda_pct: m[i], amortizacion_pct_ventas: am[i], capex_pct_ventas: cx[i],
  // Circulante: clientes + existencias − otros pasivos corrientes = 11,5 % de las ventas en FY2025 y ≈ 10 % del LTM en ago-26.
  nwc_pct_ventas: 11.0, tasa_impositiva_pct: 26.0, fijo: i === 0,
}));
export default {
  anios,
  // Tasa libre: bono japonés a 10 años (2,958 %, 16-oct-2026). Beta 1,0 (la semanal a 5 años es 0,77 y la de Damodaran para
  // servicios empresariales ≈ 1,0) + 1 punto de prima adicional por el riesgo de la IA sobre un negocio que vende horas.
  wacc: { tasa_libre_pct: 2.958, beta: 1.0, prima_mercado_pct: 5.5, prima_adicional_pct: 1.0, coste_deuda_pct: 1.5, tasa_impositiva_pct: 30.6, peso_deuda_pct: 1 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.0, multiplo_salida: 18.0 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -8.0, ajuste_margen_pp: -4.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 1.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 4.0, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 10, transacciones: 0, suma_partes: 0, escenarios: 40 },
  // Puente de ingresos: volumen = consultores medios; precio = ingreso por consultor; otros = ocupación y días.
  puente_ingresos: [
    { periodo: 'FY2026e', volumen_pct: 26.0, precio_pct: 6.0, otros_pct: 0.1 },
    { periodo: 'FY2027e', volumen_pct: 17.0, precio_pct: 5.0, otros_pct: 0.0 },
    { periodo: 'FY2028e', volumen_pct: 14.0, precio_pct: 4.0, otros_pct: 0.0 },
    { periodo: 'FY2029e', volumen_pct: 11.0, precio_pct: 4.0, otros_pct: 0.0 },
    { periodo: 'FY2030e', volumen_pct: 9.0, precio_pct: 3.0, otros_pct: 0.0 },
  ],
  // Mercado de consultoría de Japón ≈ 2 billones de JPY en 2024 con TCAC ≈ 10 % hasta 2029 [B1] (≈ 3,2 billones) y ≈ 7,5 %
  // después (estimación propia) → ≈ 4,3 billones en el año a feb-2034.
  mercado_final: { periodo: 'FY2033e', tamano: 4300000 },
};
