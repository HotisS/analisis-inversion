// Supuestos del DCF, escenarios y pesos de Sonova (corte 2026-10-14). Ejercicio de abril a marzo, etiqueta «fin» (FY2027 = abr-26 a mar-27), CHF.
// Base FY2026 de actividades continuadas (sin Consumer Hearing). FY2027e no fijo: el primer semestre se publica el 17-nov-2026.
// Capex = inmovilizado e intangibles (≈ 2,8 % de las ventas) + altas de derechos de uso de las clínicas (≈ 1,9 %) + compras pequeñas de clínicas
// (≈ 1,3 %), porque el crecimiento proyectado incluye ≈ 1 punto de compras. Amortización (incluida la de derechos de uso y la de intangibles de compras).
const a = (periodo, g, m, am, cx) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: cx, nwc_pct_ventas: 20, tasa_impositiva_pct: 16, fijo: false });
export default {
  anios: [
    a('FY2027e', 5.0, 27.4, 6.2, 6.0),
    a('FY2028e', 6.5, 28.0, 6.1, 6.0),
    a('FY2029e', 6.5, 28.5, 6.0, 6.0),
    a('FY2030e', 6.0, 28.8, 6.0, 6.0),
    a('FY2031e', 5.5, 29.0, 5.9, 6.0),
    a('FY2032e', 5.0, 29.0, 5.9, 6.0),
    a('FY2033e', 4.0, 29.0, 5.8, 6.0),
  ],
  wacc: { tasa_libre_pct: 0.54, beta: 1.0, prima_mercado_pct: 5.5, prima_adicional_pct: 1.0, coste_deuda_pct: 1.5, tasa_impositiva_pct: 16, peso_deuda_pct: 10 },
  terminal: { metodo: 'gordon', crecimiento_pct: 1.0, multiplo_salida: 14 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.5, ajuste_margen_pp: -2.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 40, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 40 },
  puente_ingresos: [
    { periodo: 'FY2027e', volumen_pct: 4.0, precio_pct: 1.5, otros_pct: -0.5 },
    { periodo: 'FY2028e', volumen_pct: 4.0, precio_pct: 1.5, otros_pct: 1.0 },
    { periodo: 'FY2029e', volumen_pct: 4.0, precio_pct: 1.5, otros_pct: 1.0 },
    { periodo: 'FY2030e', volumen_pct: 3.5, precio_pct: 1.5, otros_pct: 1.0 },
    { periodo: 'FY2031e', volumen_pct: 3.5, precio_pct: 1.0, otros_pct: 1.0 },
  ],
  mercado_final: null,
};
