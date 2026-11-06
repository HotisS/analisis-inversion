// Supuestos numéricos (GigaCloud Technology, corte 2026-11-06). Base: 2025 (1.289,9 M USD de ingresos; EBITDA EBIT+amort. 153,3 M, 11,9 %).
// 2026e fijo: 9M26 publicados (1.194,7 M) + punto medio de la guía del 4T26 (425-450 M) = 1.632 M (+26,5 %; consenso 1.566 M, desfasado).
// Margen 2026e 13,0 %: 9M26 155,7 M de EBITDA (13,0 %) y 4T26 al mismo margen.
const crec = [26.5, 12.0, 10.0, 9.0, 8.0, 7.0, 6.0, 5.0, 4.0, 3.5];
// Margen EBITDA publicado (pagos en acciones como gasto). 13 % en 2027 y vuelta al 12,5 %: aranceles de la sección 232 desde ene-2027,
// fletes y competencia; la media 2023-2025 fue del 13,2 % (16,0 / 12,0 / 11,9).
const margen = [13.0, 13.0, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5];
const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: 0.6,
  capex_pct_ventas: i < 3 ? 1.0 : 0.8,
  nwc_pct_ventas: 11.0,
  tasa_impositiva_pct: 17,
  fijo: i === 0,
}));

export default {
  anios,
  // Tasa libre: Tesoro a 10 años, 5-nov-2026, 4,84 % [D8]. Beta 1,23 (semanal 5 años frente al Russell 2000, ajustada) [D3].
  // Prima adicional 1,5 puntos: tamaño (≈ 2.250 M de capitalización), cadena de suministro china y aranceles, doble clase de acciones.
  wacc: { tasa_libre_pct: 4.84, beta: 1.23, prima_mercado_pct: 5.5, prima_adicional_pct: 1.5, coste_deuda_pct: 6.0, tasa_impositiva_pct: 17, peso_deuda_pct: 0 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 8 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 22.0, precio_pct: 0.0, otros_pct: 4.5 },
    { periodo: '2027e', volumen_pct: 11.0, precio_pct: 1.0, otros_pct: 0.0 },
    { periodo: '2028e', volumen_pct: 9.0, precio_pct: 1.0, otros_pct: 0.0 },
    { periodo: '2029e', volumen_pct: 8.0, precio_pct: 1.0, otros_pct: 0.0 },
    { periodo: '2030e', volumen_pct: 7.0, precio_pct: 1.0, otros_pct: 0.0 },
  ],
  // Mercado: tiendas de muebles y hogar de EE. UU. (Census NAICS 442, 127.347 M USD en 2025 [B]) + muebles en Europa (CSIL, 165.000 M EUR
  // ≈ 190.000 M USD [B]) ≈ 317.000 M USD, creciendo un 2 % anual hasta 2030 ≈ 343.000 M USD.
  mercado_final: { periodo: '2030e', tamano: 343000 },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 30, ajuste_crecimiento_pp: -6.0, ajuste_margen_pp: -3.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 1.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 20, ajuste_crecimiento_pp: 3.0, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 45, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 35 },
};
