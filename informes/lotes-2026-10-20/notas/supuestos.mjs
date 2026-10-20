// Supuestos numéricos (Lotes, corte 2026-10-20). Base: 2025 real (33.783,4 M TWD de ventas) [A1].
// 2026e fijo: enero-septiembre 28.835 M TWD (ventas mensuales oficiales, TWSE) + 4T26 ≈ 10.350 M (≈ 3.450 M al mes,
// septiembre 3.357 M y arranque pequeño de Venice/Oak Stream) = 39.185 M (+16,0 %).
// 2027e +20 % (plataformas nuevas de Intel y AMD a volumen, QD y SO-CAMM; consenso +26 %); 2028e +10 %;
// 2029e −8 % (digestión del ciclo de servidores, como 2023: −9,7 %); después 5, 5, 4,5, 4, 3,5 y 3 %.
const crec = [16.0, 20, 10, -8, 5, 5, 4.5, 4, 3.5, 3];
// Margen EBITDA: 1S26 34,4 % (2T26 31,8 % con 279 M de pagos en acciones); 3T26 igual que el 2T26 según la empresa;
// 2026e 34,0 %. Sube a 36-37 % con plataformas nuevas a precio de las materias primas de hoy y Venice (precio ≥ 15 % mayor);
// cae a 34 % en la digestión de 2029 y se queda en 35 % (2021-2025: 27,6-41,6 %; media 36,3 %).
const margen = [34.0, 36, 37, 34, 35, 35, 35, 35, 35, 35];
// Amortización: 7,7 % de las ventas en 2025 y 9,0 % en el 1S26 (Vietnam); baja hacia el 8 %.
const amort = [8.9, 9.0, 8.8, 9.5, 9.0, 8.7, 8.5, 8.3, 8.1, 8.0];
// Capex: guía de 5.000-6.000 M en 2026 (1S26: 3.131 M) → 14 %; 12 % y 10 % en 2027-2028 (Vietnam, sockets de más de 10.000 contactos);
// 8 % en la digestión; 8,5 % después (por encima de la amortización del último año).
const capex = [14.0, 12.0, 10.0, 8.0, 8.5, 8.5, 8.5, 8.5, 8.5, 8.5];
const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: 44,
  tasa_impositiva_pct: 22,
  fijo: i === 0,
}));

export default {
  anios,
  wacc: { tasa_libre_pct: 2.03, beta: 1.1, prima_mercado_pct: 5.5, prima_adicional_pct: 1.5, coste_deuda_pct: 2.0, tasa_impositiva_pct: 22, peso_deuda_pct: 0 },
  terminal: { metodo: 'gordon', crecimiento_pct: 1.5, multiplo_salida: 10 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 10, precio_pct: 3, otros_pct: 3 },
    { periodo: '2027e', volumen_pct: 12, precio_pct: 8, otros_pct: 0 },
    { periodo: '2028e', volumen_pct: 7, precio_pct: 3, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: -6, precio_pct: -2, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 4, precio_pct: 1, otros_pct: 0 },
  ],
  mercado_final: null,
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2, ajuste_margen_pp: -3, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null,
      perfil: [{ periodo: '2027e', crecimiento_pp: -14, margen_pp: -4 }, { periodo: '2028e', crecimiento_pp: -12, margen_pp: -5 }] },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1, ajuste_margen_pp: 2, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null,
      perfil: [{ periodo: '2027e', crecimiento_pp: 8, margen_pp: 2 }, { periodo: '2028e', crecimiento_pp: 6, margen_pp: 2 }] },
  ],
  pesos: { dcf: 40, comparables: 30, transacciones: 0, suma_partes: 0, escenarios: 30 },
};
