// Supuestos del DCF, escenarios y pesos de Fastenal (corte 2026-10-21). Ejercicio natural. Millones de USD.
// 2026e fijo: tres trimestres publicados (ventas 7.051,9 M, +14,2 %) y un 4T estimado en ≈ 2.280 M (+12,5 % sobre los
// 2.027,4 M del 4T25: septiembre creció un 14,4 % y la comparación de precios se endurece con los 310-340 pb del 4T25).
// Margen EBITDA 2026: 22,9 % en nueve meses (1.615 M), 4T estacionalmente más bajo (≈ 21,3 % en 4T25) → 22,6 %.
// Amortización ≈ 180 M (1,93 %); capex bruto ≈ 330 M (guía neta 310-330 + ventas de activos ≈ 10) = 3,5 %.
// Circulante comercial (existencias + clientes − proveedores): 32,6 % de las ventas en 2025 y 32,4 % de las de 12 meses a
// sep-2026 [A2]: 32 % constante. Tipo fiscal: 24,4 % en 2026 (nueve meses 24,1 %) y 24,6 % después (guía de la empresa).
const g = [13.8, 8.0, 7.0, 6.5, 6.0, 5.5, 5.0, 4.5, 4.0];
const m = [22.6, 22.8, 22.9, 23.0, 23.0, 23.0, 23.0, 23.0, 23.0];
const am = [1.93, 2.0, 2.0, 2.0, 2.1, 2.1, 2.1, 2.1, 2.1];
const cx = [3.5, 3.0, 2.9, 2.8, 2.7, 2.6, 2.5, 2.4, 2.3];
const anios = g.map((x, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: x, margen_ebitda_pct: m[i], amortizacion_pct_ventas: am[i], capex_pct_ventas: cx[i],
  nwc_pct_ventas: 32.0, tasa_impositiva_pct: i === 0 ? 24.4 : 24.6, fijo: i === 0,
}));
export default {
  anios,
  wacc: { tasa_libre_pct: 5.12, beta: 0.80, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.0, tasa_impositiva_pct: 24.6, peso_deuda_pct: 0.5 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 18.0 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    // Bajista: recesión industrial en 2027 (como 2009 o 2015-16 en pequeño): ventas −2 % en vez de +8 % y margen −2,5 pp
    // (apalancamiento operativo a la baja, precio/coste negativo); después, crecimiento 3 pp menor y margen 1,5 pp menor.
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.5, multiplo_salida: null, perfil: [{ periodo: '2027e', crecimiento_pp: -10.0, margen_pp: -2.5 }] },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 0.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
  puente_ingresos: [
    { periodo: '2027e', volumen_pct: 6.0, precio_pct: 2.0, otros_pct: 0.0 },
    { periodo: '2028e', volumen_pct: 5.0, precio_pct: 2.0, otros_pct: 0.0 },
    { periodo: '2029e', volumen_pct: 4.5, precio_pct: 2.0, otros_pct: 0.0 },
    { periodo: '2030e', volumen_pct: 4.0, precio_pct: 2.0, otros_pct: 0.0 },
    { periodo: '2031e', volumen_pct: 3.5, precio_pct: 2.0, otros_pct: 0.0 },
  ],
  mercado_final: null,
};
