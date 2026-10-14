// Supuestos numéricos del analista (Amadeus, corte 2026-10-14). Base: 2025 real (ingresos 6.517 M, EBITDA 2.506,6 M, 38,5 %).
// 2026e fijo: el 1S26 creció un 2,3 % en euros (5,1 % a tipo constante) y la guía rebajada habla de un dígito medio-alto a tipo
// constante; con el dólar restando ≈2,5-3 puntos, ≈+3,5 % en euros. Margen del 1S26: 40,0 % (EBITDA 1.334 M), con el 2S
// estacionalmente más bajo: 38,8 % en el año.
// 2027e-2028e: recuperación del tráfico y del volumen de distribución (+7 %, por debajo del +8,5 % a tipo constante de 2025),
// convergencia hacia el 3,5 % en 2035e. Margen +1 punto en cuatro años (apalancamiento operativo histórico: +3 puntos en 2022-2025).
// Capex: 12,5 % de las ventas en 2025 y 9,8 % en el 1S26; 11,5-12 % con la amortización algo por debajo (11-11,5 %).
// IDEMIA Public Security (cierre a mediados de 2027) no entra ni en la proyección ni en el puente: se compra a precio de mercado
// y su efecto en el valor se supone neutro (dicho en limitaciones).
const crec = [3.5, 7.0, 7.0, 6.5, 6.0, 5.5, 5.0, 4.5, 4.0, 3.5];
const margen = [38.8, 39.2, 39.5, 39.6, 39.7, 39.7, 39.7, 39.7, 39.7, 39.7];
const amort = [11.4, 11.5, 11.5, 11.4, 11.3, 11.2, 11.1, 11.0, 11.0, 11.0];
const capex = [11.5, 12.0, 12.0, 12.0, 11.8, 11.7, 11.6, 11.5, 11.5, 11.5];
const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: 0,
  tasa_impositiva_pct: 21,
  fijo: i === 0,
}));

export default {
  anios,
  // Bund 3,53 % (12-oct); beta 1,05 (estimación: software y servicios de viaje europeos, sin acceso a la serie de cotizaciones);
  // prima 5,5 %; coste de la deuda 3,5 %; peso de la deuda ≈12 % (≈3.000 M de deuda neta con el dividendo de julio frente a
  // ≈22.700 M de capitalización).
  wacc: { tasa_libre_pct: 3.53, beta: 1.05, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 3.5, tasa_impositiva_pct: 21, peso_deuda_pct: 12 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 13 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3, ajuste_margen_pp: -2.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.0, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 1.0, precio_pct: 4.5, otros_pct: -2.0 },
    { periodo: '2027e', volumen_pct: 3.0, precio_pct: 3.5, otros_pct: 0.5 },
    { periodo: '2028e', volumen_pct: 3.0, precio_pct: 3.5, otros_pct: 0.5 },
    { periodo: '2029e', volumen_pct: 3.0, precio_pct: 3.0, otros_pct: 0.5 },
  ],
  mercado_final: null,
  pesos: { dcf: 50, comparables: 30, transacciones: 0, suma_partes: 0, escenarios: 20 },
};
