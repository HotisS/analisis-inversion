// Supuestos del DCF y de los escenarios (Evolution AB, corte 2026-10-08). Cifras en millones de EUR.
// Base: 2025 real, ingresos netos 2.066,5 M y EBITDA ajustado (sin la reducción de earn-outs) del 66,1 % [A].
// 2026e: 1S26 real 1.030,8 M; 2S26 = 2S25 (1.021,3 M) +2,7 % (más que el −1,2 % del 2T26 por el dólar más fuerte frente al 2S25).
//   2.080 M → +0,65 %. Margen 65,8 %: la guía es «en línea con 2025» (66,1 %) y el 1S26 dio 65,6 %.
//   El acuerdo con la UK Gambling Commission y la indemnización de Galaxy (≈10 M) van en el puente, no en el margen.
// Capex con los pagos de arrendamiento (NIIF 16): 7,5 % en 2025 (134,8 + 19,5 M) y ≈7,7 % en el 1S26.
// Amortización: 8,3 % de las ventas en el 1S26 (85,9 M), con ≈45 M al año de intangibles de compras (estimación de A) que se agotan.

export const anios = [
  { periodo: '2026e', crecimiento_pct: 0.65, margen_ebitda_pct: 65.8, amortizacion_pct_ventas: 8.3, capex_pct_ventas: 7.7, nwc_pct_ventas: 21.0, tasa_impositiva_pct: 16.5, fijo: true },
  { periodo: '2027e', crecimiento_pct: 4.5, margen_ebitda_pct: 65.5, amortizacion_pct_ventas: 8.2, capex_pct_ventas: 7.7, nwc_pct_ventas: 21.0, tasa_impositiva_pct: 16.5, fijo: false },
  { periodo: '2028e', crecimiento_pct: 5.0, margen_ebitda_pct: 65.5, amortizacion_pct_ventas: 8.0, capex_pct_ventas: 7.6, nwc_pct_ventas: 21.0, tasa_impositiva_pct: 16.5, fijo: false },
  { periodo: '2029e', crecimiento_pct: 5.0, margen_ebitda_pct: 65.5, amortizacion_pct_ventas: 7.8, capex_pct_ventas: 7.5, nwc_pct_ventas: 21.0, tasa_impositiva_pct: 16.5, fijo: false },
  { periodo: '2030e', crecimiento_pct: 4.5, margen_ebitda_pct: 65.3, amortizacion_pct_ventas: 7.6, capex_pct_ventas: 7.4, nwc_pct_ventas: 21.0, tasa_impositiva_pct: 16.5, fijo: false },
  { periodo: '2031e', crecimiento_pct: 4.0, margen_ebitda_pct: 65.0, amortizacion_pct_ventas: 7.4, capex_pct_ventas: 7.3, nwc_pct_ventas: 21.0, tasa_impositiva_pct: 16.5, fijo: false },
  { periodo: '2032e', crecimiento_pct: 3.5, margen_ebitda_pct: 65.0, amortizacion_pct_ventas: 7.2, capex_pct_ventas: 7.2, nwc_pct_ventas: 21.0, tasa_impositiva_pct: 16.5, fijo: false },
  { periodo: '2033e', crecimiento_pct: 3.0, margen_ebitda_pct: 65.0, amortizacion_pct_ventas: 7.0, capex_pct_ventas: 7.1, nwc_pct_ventas: 21.0, tasa_impositiva_pct: 16.5, fijo: false },
  { periodo: '2034e', crecimiento_pct: 3.0, margen_ebitda_pct: 65.0, amortizacion_pct_ventas: 7.0, capex_pct_ventas: 7.0, nwc_pct_ventas: 21.0, tasa_impositiva_pct: 16.5, fijo: false },
  { periodo: '2035e', crecimiento_pct: 2.5, margen_ebitda_pct: 65.0, amortizacion_pct_ventas: 7.0, capex_pct_ventas: 7.0, nwc_pct_ventas: 21.0, tasa_impositiva_pct: 16.5, fijo: false },
];

// Tasa libre: Bund a 10 años del 8-oct-2026 (Bundesbank) [D]. Beta ajustada mensual de 5 años frente al STOXX Europe 600 [D].
// Prima adicional de 1 punto: la mitad de los ingresos viene de jugadores en mercados sin regulación local (51 % en el 2T26).
export const wacc = { tasa_libre_pct: 3.57, beta: 1.03, prima_mercado_pct: 5.5, prima_adicional_pct: 1.0, coste_deuda_pct: 4.5, tasa_impositiva_pct: 16.5, peso_deuda_pct: 0.7 };
export const terminal = { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 10.0 };
export const etapa2 = { usar: false, anios: 10, margen_final_pct: null };

export const casos = [
  // Bajista: Asia (38 % de los ingresos por IP del jugador) pierde un 40 % en un año por bloqueos o por una retirada forzosa
  // (≈−15 % del grupo en 2027e) y Europa sigue perdiendo canalización; margen hacia el 61 %, como en 2019-2020 con menos escala.
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -1.5, ajuste_margen_pp: -3.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.0, multiplo_salida: null, perfil: [{ periodo: '2027e', crecimiento_pp: -19.5, margen_pp: -4.5 }] },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
  // Alcista: Norteamérica y Latinoamérica siguen al +10-25 %, Asia se estabiliza y el contenido de Hasbro devuelve a Europa al crecimiento.
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 3.0, multiplo_salida: null, perfil: [] },
];

export const pesos = { dcf: 40, comparables: 15, transacciones: 0, suma_partes: 0, escenarios: 45 };
