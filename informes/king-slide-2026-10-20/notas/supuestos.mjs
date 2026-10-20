// Supuestos numéricos (King Slide, corte 2026-10-20). Base: 2025 real (17.501 M TWD de ventas).
// 2026e fijo: enero-septiembre 33.618 M TWD (ventas mensuales oficiales de la TWSE) + 4T26 ≈ 15.000 M
// (septiembre 4.464 M → octubre-diciembre ≈ 5.000 M al mes con el arranque de Vera Rubin): 48.618 M (+177,8 %).
// 2027e +25 % (la empresa: «doble dígito»; consenso +44 %); 2028e +8 %; 2029e −10 % (digestión del ciclo, como 2023: −26 %);
// 2030e 0 %; después 4, 4, 3, 3 y 2,5 %.
const crec = [177.8, 25, 8, -10, 0, 4, 4, 3, 3, 2.5];
// Margen EBITDA: 1S26 78,2 % y 3T26 algo mayor → 79,5 % en 2026e; baja con el segundo proveedor y la normalización de precios
// hacia el 60 % (2024: 63,1 %; 2025: 71,1 %), todavía por encima del 46-54 % de 2021-2023.
const margen = [79.5, 76, 73, 66, 64, 62, 61, 60, 60, 60];
// Amortización: 2,1 % de las ventas en 2025; sube con la planta de Houston y las fases 3 y 5 (≈ 10.000 M de inversión).
const amort = [0.9, 1.0, 1.4, 1.8, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0];
// Capex: 2026e 3 % (1.460 M; doce meses a jun-26: 1.156 M); 2027e-2028e ≈ 4.000 M al año por las ampliaciones; después 2,2-3 %.
const capex = [3.0, 7.0, 6.0, 3.0, 2.5, 2.2, 2.2, 2.2, 2.2, 2.2];
const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: 28,
  tasa_impositiva_pct: 21,
  fijo: i === 0,
}));

export default {
  anios,
  wacc: { tasa_libre_pct: 2.03, beta: 1.2, prima_mercado_pct: 5.5, prima_adicional_pct: 1.5, coste_deuda_pct: 2.0, tasa_impositiva_pct: 20, peso_deuda_pct: 0 },
  terminal: { metodo: 'gordon', crecimiento_pct: 1.5, multiplo_salida: 12 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 120, precio_pct: 50, otros_pct: 7.8 },
    { periodo: '2027e', volumen_pct: 18, precio_pct: 7, otros_pct: 0 },
    { periodo: '2028e', volumen_pct: 6, precio_pct: 2, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: -8, precio_pct: -2, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 1, precio_pct: -1, otros_pct: 0 },
  ],
  mercado_final: null,
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2, ajuste_margen_pp: -6, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null,
      perfil: [{ periodo: '2027e', crecimiento_pp: -25, margen_pp: -6 }, { periodo: '2028e', crecimiento_pp: -15, margen_pp: -8 }] },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1, ajuste_margen_pp: 2, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null,
      perfil: [{ periodo: '2027e', crecimiento_pp: 20, margen_pp: 2 }, { periodo: '2028e', crecimiento_pp: 10, margen_pp: 1 }] },
  ],
  pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
};
