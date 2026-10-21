// Supuestos numéricos (Moncler, corte 2026-10-14). Base: 2025 (3.132,1 M EUR de ventas, EBITDA con NIIF 16 de 1.250 M).
// Capex = inversión neta (≈6-7 % de las ventas) + altas de derechos de uso de tiendas (≈6-7 %): con NIIF 16 el EBITDA no lleva
// alquileres, así que el capex del DCF incluye las tiendas arrendadas (pagos de arrendamiento de ≈235 M en 2025).
const crec = [3.0, 5.0, 6.0, 6.0, 5.5, 5.0, 4.5, 4.0, 3.5, 3.0];
const margen = [39.8, 40.0, 40.3, 40.5, 40.5, 40.5, 40.5, 40.5, 40.5, 40.5];
const capex = [13.0, 13.0, 13.0, 12.5, 12.5, 12.0, 12.0, 12.0, 12.0, 12.0];
const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: 10.8,
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: 9.8,
  tasa_impositiva_pct: 28.5,
  fijo: i === 0,
}));

export default {
  anios,
  wacc: { tasa_libre_pct: 3.53, beta: 1.2, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 3.5, tasa_impositiva_pct: 28.5, peso_deuda_pct: 8 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 12 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 3.0, precio_pct: 3.0, otros_pct: -3.0 },
    { periodo: '2027e', volumen_pct: 2.0, precio_pct: 3.0, otros_pct: 0 },
    { periodo: '2028e', volumen_pct: 3.0, precio_pct: 3.0, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 3.0, precio_pct: 3.0, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 2.5, precio_pct: 3.0, otros_pct: 0 },
  ],
  mercado_final: { periodo: '2035e', tamano: 505000 },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3, ajuste_margen_pp: -3, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.0, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 40, comparables: 30, transacciones: 0, suma_partes: 0, escenarios: 30 },
};
