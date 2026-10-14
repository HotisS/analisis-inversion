// Supuestos numéricos del analista principal (Group 1 Automotive, corte 2026-10-14). Base: 2025 (22.571,4 M USD).
// EBITDA NETO de los intereses del floorplan (financiación del inventario): el floorplan queda fuera de la deuda del puente,
// igual que hace la empresa con su flujo operativo ajustado. Hennessy (10 concesionarios, ≈1.700 M de ventas) entra
// desde el 4T26: su precio (≈1.300 M) va al puente como deuda (otros_ajustes).
const crec = [0.1, 7.1, 2.9, 2.5, 2.5, 2.5, 2.0, 2.0, 2.0, 2.0];
// Margen: el de 2024-25 sin extraordinarios hasta 2028e y después vuelve poco a poco hacia el de antes de la pandemia (≈3,4 %),
// porque el beneficio bruto por coche sigue normalizándose: 3,7 % en el terminal.
const margen = [3.95, 4.05, 4.15, 4.05, 3.95, 3.85, 3.75, 3.7, 3.7, 3.7];
const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: 0.55,
  capex_pct_ventas: i < 3 ? 1.0 : 0.8,
  nwc_pct_ventas: 3,
  tasa_impositiva_pct: 25.5,
  fijo: i === 0,
}));

export default {
  anios,
  wacc: { tasa_libre_pct: 5.22, beta: 0.9, prima_mercado_pct: 5.5, prima_adicional_pct: 1.0, coste_deuda_pct: 6.2, tasa_impositiva_pct: 25.5, peso_deuda_pct: 55 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.0, multiplo_salida: 7 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  mitad_de_anio: true,
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: -2.5, precio_pct: 1.5, otros_pct: 1.1 },
    { periodo: '2027e', volumen_pct: 0.5, precio_pct: 1.5, otros_pct: 5.1 },
    { periodo: '2028e', volumen_pct: 0.5, precio_pct: 1.5, otros_pct: 0.9 },
    { periodo: '2029e', volumen_pct: 1.0, precio_pct: 1.5, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 1.0, precio_pct: 1.5, otros_pct: 0 },
  ],
  // Ventas de los concesionarios franquiciados de EE. UU. (>1,3 billones USD en 2025, NADA) + Reino Unido (≈0,1 billones),
  // creciendo al 2 % nominal hasta 2035.
  mercado_final: { periodo: '2035e', tamano: 1700000 },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 30, ajuste_crecimiento_pp: -2.5, ajuste_margen_pp: -0.6, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 1.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 20, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 0.3, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 40, comparables: 35, transacciones: 0, suma_partes: 0, escenarios: 25 },
};
