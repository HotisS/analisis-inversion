// Supuestos numéricos del analista principal (Teleperformance, corte 2026-10-14). Base: 2025 (10.209 M EUR).
// EBITDA PUBLICADO (con reestructuración y costes de integración dentro, porque se repiten cada año).
// Capex con los arrendamientos (NIIF 16): capex del estado de flujos (2,5 % de las ventas) + pagos de arrendamientos (3,1 %).
// La amortización incluye la de las carteras de clientes compradas (Majorel), que se va agotando: baja del 6,8 % al 5,6 %.
const crec = [-3.3, 1.0, 2.0, 1.5, 1.5, 1.0, 1.0, 1.0, 1.0, 1.0];
const margen = [16.6, 17.2, 17.5, 17.5, 17.5, 17.4, 17.3, 17.2, 17.1, 17.0];
const amort = [6.8, 6.5, 6.2, 6.0, 5.8, 5.6, 5.6, 5.6, 5.6, 5.6];
const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: 5.6,
  nwc_pct_ventas: 0,
  tasa_impositiva_pct: 32,
  fijo: i === 0,
}));

export default {
  anios,
  wacc: { tasa_libre_pct: 2.97, beta: 1.0, prima_mercado_pct: 5.5, prima_adicional_pct: 2.0, coste_deuda_pct: 4.0, tasa_impositiva_pct: 32, peso_deuda_pct: 40 },
  terminal: { metodo: 'gordon', crecimiento_pct: 1.0, multiplo_salida: 6 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  mitad_de_anio: true,
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: -1.0, precio_pct: 0, otros_pct: -2.3 },
    { periodo: '2027e', volumen_pct: 0, precio_pct: 0.5, otros_pct: 0.5 },
    { periodo: '2028e', volumen_pct: 0.5, precio_pct: 0.5, otros_pct: 1.0 },
    { periodo: '2029e', volumen_pct: 0.5, precio_pct: 0.5, otros_pct: 0.5 },
    { periodo: '2030e', volumen_pct: 0.5, precio_pct: 0.5, otros_pct: 0.5 },
  ],
  mercado_final: null,
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 30, ajuste_crecimiento_pp: -4.0, ajuste_margen_pp: -2.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: -1.0, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 20, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 0.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 45, comparables: 15, transacciones: 0, suma_partes: 0, escenarios: 40 },
};
