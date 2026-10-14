// Supuestos numéricos (Meta Platforms, corte 2026-10-14). Base: 2025 real (200.966 M USD de ingresos).
// 2026e casi cerrado: dos trimestres publicados y guía de gastos (165.000-169.000 M) y de ingresos del 3T26.
const crec   = [24.5, 17.0, 14.0, 12.0, 10.0, 9.0, 8.0, 7.0, 6.0, 5.0];
const margen = [45.8, 46.0, 48.0, 50.0, 51.0, 52.0, 52.0, 52.0, 52.0, 52.0];
// Amortización al alza por la inversión en IA (capex de 72.220 M en 2025 y 130.000-145.000 M en 2026).
const amort  = [12.5, 16.5, 18.0, 19.0, 19.0, 19.0, 18.5, 18.0, 17.5, 17.0];
// Capex: 55 % de las ventas en 2026 (guía) y pico en 2027; después se normaliza hacia el 18 % (por encima de la amortización).
const capex  = [55.0, 60.0, 50.0, 38.0, 30.0, 25.0, 22.0, 20.0, 19.0, 18.0];
const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: 5.0,
  tasa_impositiva_pct: 15.0,
  fijo: i === 0,
}));

export default {
  anios,
  wacc: { tasa_libre_pct: 5.21, beta: 1.23, prima_mercado_pct: 5.0, prima_adicional_pct: 0, coste_deuda_pct: 5.25, tasa_impositiva_pct: 15.0, peso_deuda_pct: 4.3 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 15 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 17.0, precio_pct: 8.0, otros_pct: -0.5 },
    { periodo: '2027e', volumen_pct: 11.0, precio_pct: 6.0, otros_pct: 0 },
    { periodo: '2028e', volumen_pct: 9.0, precio_pct: 5.0, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 8.0, precio_pct: 4.0, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 6.0, precio_pct: 4.0, otros_pct: 0 },
  ],
  // Publicidad digital mundial: ≈908.000 M en 2026 (eMarketer, implícito) creciendo al 9 % anual hasta 2035 (estimación propia).
  mercado_final: { periodo: '2035e', tamano: 1970000 },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -4.0, ajuste_margen_pp: -4.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 3.0, ajuste_margen_pp: 2.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 40, comparables: 30, transacciones: 0, suma_partes: 0, escenarios: 30 },
};
