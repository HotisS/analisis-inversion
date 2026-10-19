// Supuestos del DCF, escenarios y pesos de Sieyuan Electric (corte 2026-10-19). CNY, ejercicio natural, base CAS 2025.
// 2026e medio cerrado: 1S26 publicado (ventas 10.795 M, +27 %); 3T26 el 24-oct. Ventas 2026e ≈ 26.710 M (+24 %).
// Margen EBITDA 18,3 % en 2025 y 19,4 % en el 1S26; baja medio punto por año hasta el 17,5 % por la competencia y la mezcla.
// Capex 3,8 % de las ventas en 2025 y 6,0 % en 2024; circulante comercial ≈ 17,5 % de las ventas en 2025.
const a = (periodo, g, m, am, cx, tx, nwc, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: cx, nwc_pct_ventas: nwc, tasa_impositiva_pct: tx, fijo });
export default {
  anios: [
    a('2026e', 24.0, 18.8, 1.5, 4.5, 13.5, 17.0, true),
    a('2027e', 20.0, 18.5, 1.6, 4.0, 13.5, 17.0),
    a('2028e', 15.0, 18.2, 1.7, 3.5, 14.0, 17.0),
    a('2029e', 10.0, 18.0, 1.8, 3.0, 14.0, 17.0),
    a('2030e', 7.0, 17.8, 1.9, 2.8, 14.5, 17.0),
    a('2031e', 5.0, 17.5, 2.0, 2.5, 15.0, 17.0),
  ],
  wacc: { tasa_libre_pct: 1.6497, beta: 1.0, prima_mercado_pct: 5.5, prima_adicional_pct: 1.0, coste_deuda_pct: 2.5, tasa_impositiva_pct: 15.0, peso_deuda_pct: 1 },
  terminal: { metodo: 'gordon', crecimiento_pct: 1.0, multiplo_salida: 10 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -6.0, ajuste_margen_pp: -2.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 5.0, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 27.0, precio_pct: -2.0, otros_pct: -1.0 },
    { periodo: '2027e', volumen_pct: 22.0, precio_pct: -2.0, otros_pct: 0 },
    { periodo: '2028e', volumen_pct: 16.5, precio_pct: -1.5, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 11.0, precio_pct: -1.0, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 8.0, precio_pct: -1.0, otros_pct: 0 },
  ],
  // Mercado final 2031e: inversión mundial en redes eléctricas (serie de la nota B: 400.000 M USD en 2025 y ≈ 536.000 M en 2031e, IEA [B1])
  // × 6,6692 CNY/USD; la cuota de hoy (0,81 %) se mide igual, sobre los 400.000 M USD de 2025.
  mercado_final: { periodo: '2031e', tamano: 3573000 },
};
