// Supuestos numéricos (Heijmans, corte 2026-10-19). Base: 2025 (2.772,2 M EUR de ventas, EBITDA publicado 223,9 M,
// sin la parte de los negocios conjuntos, que va por puesta en equivalencia debajo del EBIT).
const crec = [11.8, 7.0, 6.0, 5.0, 4.5, 3.5, 3.0, 2.5, 2.5, 2.0];
// Margen EBITDA publicado: 2026e con la guía (EBIT subyacente hacia el 7,3 % ≈ 8,7 % de EBITDA publicado);
// sube con la mezcla (redes, mantenimiento, Hegeman) hasta 2030e y luego converge a un nivel de ciclo medio.
const margen = [8.7, 9.0, 9.3, 9.5, 9.6, 9.4, 9.2, 9.0, 8.9, 8.8];
const capex = [3.3, 3.1, 3.0, 2.9, 2.8, 2.7, 2.6, 2.6, 2.6, 2.6]; // incluye altas de derechos de uso (NIIF 16)
const nwc = [-3.5, -3.3, -3.1, -3.0, -2.9, -2.8, -2.7, -2.6, -2.5, -2.5];
const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: g, margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: i < 3 ? 2.2 : 2.3,
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: nwc[i],
  tasa_impositiva_pct: 25.8, fijo: i === 0,
}));
export default {
  anios,
  wacc: { tasa_libre_pct: 3.45, beta: 1.24, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 4.5, tasa_impositiva_pct: 25.8, peso_deuda_pct: 6 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.0, multiplo_salida: 6.5 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 3.5, precio_pct: 2.3, otros_pct: 6.0 },
    { periodo: '2027e', volumen_pct: 4.5, precio_pct: 2.5, otros_pct: 0 },
    { periodo: '2028e', volumen_pct: 3.5, precio_pct: 2.5, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 2.5, precio_pct: 2.5, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 2.0, precio_pct: 2.5, otros_pct: 0 },
  ],
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -4.0, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 0.8, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 25, transacciones: 0, suma_partes: 0, escenarios: 25 },
};
