// Supuestos numéricos (ASPEED, corte 2026-10-20). Base: 2025 real (9.084,9 M TWD de ventas) [A1].
// 2026e fijo: enero-septiembre 11.804,4 M (ventas mensuales oficiales [A9]) + 4T26 de 6.700 M (centro de la guía de 6.600-6.800 M [D9]) ≈ 18.500 M (+103,6 %).
// 2027e +55 % (el 4T26 anualizado ya da 26.800 M, más la subida de precios de dos dígitos del 1-dic y el AST2700; consenso +65,5 %);
// 2028e +20 % (BMC de IA +35 % según la empresa, servidores generales +5 %); 2029e −10 % (digestión del ciclo; 2023 fue −40 %);
// después 6, 10, 8, 6, 4 y 3 %.
const crec = [103.6, 55, 20, -10, 6, 10, 8, 6, 4, 3];
// Margen EBITDA: 1S26 56,3 %; 4T26 con margen bruto del 67-68 % → 56,5 % en 2026e; 57 % en 2027e-2028e (apalancamiento operativo
// con más I+D); 52 % desde 2029e (2025: 54,9 %; 2023, año de bache: 44,3 %).
const margen = [56.5, 57, 57, 52, 52, 53, 53, 52, 52, 52];
// Amortización: 3,6 % de las ventas en 2025 y 2,9 % en el 1S26; baja en % al doblarse las ventas.
const amort = [2.4, 2.2, 2.2, 2.5, 2.6, 2.6, 2.6, 2.6, 2.6, 2.6];
// Capex: 3,8 % en 2025 (341,7 M), 2,4-4,4 % en 2020-2025 (licencias de diseño, máscaras y equipos de prueba).
const capex = [3.0, 2.8, 2.6, 2.6, 2.8, 2.8, 2.8, 2.8, 2.8, 2.8];
const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: 14,
  tasa_impositiva_pct: 19.5,
  fijo: i === 0,
}));

export default {
  anios,
  wacc: { tasa_libre_pct: 2.03, beta: 1.2, prima_mercado_pct: 5.5, prima_adicional_pct: 1.5, coste_deuda_pct: 2.0, tasa_impositiva_pct: 20, peso_deuda_pct: 0 },
  terminal: { metodo: 'gordon', crecimiento_pct: 1.5, multiplo_salida: 15 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 81, precio_pct: 20, otros_pct: 2.6 },
    { periodo: '2027e', volumen_pct: 40, precio_pct: 15, otros_pct: 0 },
    { periodo: '2028e', volumen_pct: 15, precio_pct: 5, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: -8, precio_pct: -2, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 5, precio_pct: 1, otros_pct: 0 },
  ],
  mercado_final: null,
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2, ajuste_margen_pp: -5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null,
      perfil: [{ periodo: '2027e', crecimiento_pp: -25, margen_pp: -5 }, { periodo: '2028e', crecimiento_pp: -35, margen_pp: -5 }] },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1, ajuste_margen_pp: 2, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null,
      perfil: [{ periodo: '2027e', crecimiento_pp: 20, margen_pp: 2 }, { periodo: '2028e', crecimiento_pp: 15, margen_pp: 2 }] },
  ],
  pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
};
