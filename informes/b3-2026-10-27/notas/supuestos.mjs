// Supuestos del DCF, escenarios y pesos de B3 (corte 2026-10-27). BRL, ejercicio natural. Ingresos = receita líquida consolidada (CVM).
// Margen = EBITDA recurrente (sin la plusvalía de Dimensa ni partidas no recurrentes). Amortización = la del inmovilizado propio y software;
// la de los intangibles de Cetip terminó en 2024-2025. Impuesto efectivo del 29 %: tipo nominal del 37 % desde el 2T26 (LC 224/2025) menos el escudo de los JCP.
const a = (periodo, g, m, am, cx, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: cx, nwc_pct_ventas: 2, tasa_impositiva_pct: 29, fijo });
export default {
  anios: [
    a('2026e', 12.0, 69.5, 3.4, 2.8, true),
    a('2027e', 6.0, 69.0, 3.4, 2.9),
    a('2028e', 7.0, 69.5, 3.3, 3.0),
    a('2029e', 6.5, 70.0, 3.2, 3.0),
    a('2030e', 6.0, 70.0, 3.0, 3.0),
    a('2031e', 5.5, 70.0, 3.0, 3.0),
    a('2032e', 5.5, 70.0, 3.0, 3.0),
  ],
  // Tasa libre: bono a 10 años de Brasil el 26-oct-2026 (15,435 %, Trading Economics). Sin prima país adicional (ya está en la tasa en BRL).
  wacc: { tasa_libre_pct: 15.435, beta: 1.10, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 15.5, tasa_impositiva_pct: 29, peso_deuda_pct: 16.6 },
  terminal: { metodo: 'gordon', crecimiento_pct: 5.5, multiplo_salida: 10 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -3.0, ajuste_wacc_pp: 1.0, crecimiento_terminal_pct: 4.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 10, transacciones: 0, suma_partes: 0, escenarios: 40 },
  // Volumen = volúmenes negociados y registrados (contado, derivados, renta fija, OTC); precio = tarifas y mezcla; otros = perímetro (Dimensa vendida, Neoway).
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 11.0, precio_pct: 1.5, otros_pct: -0.5 },
    { periodo: '2027e', volumen_pct: 4.0, precio_pct: 2.0, otros_pct: 0 },
    { periodo: '2028e', volumen_pct: 4.5, precio_pct: 2.5, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 4.0, precio_pct: 2.5, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 3.5, precio_pct: 2.5, otros_pct: 0 },
  ],
  mercado_final: null,
};
