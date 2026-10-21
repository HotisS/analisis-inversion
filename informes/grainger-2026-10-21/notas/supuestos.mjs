// Supuestos del DCF, escenarios y pesos de Grainger (corte 2026-10-21). Ejercicio natural. Millones de USD.
// 2026e fijo: dos trimestres publicados (9.763 M, +10,2 %) y la guía subida el 4-ago (19.400-19.700 M; consenso 19.669):
// 19.650 M (+9,5 % publicado; ≈ +11,5 % sin los 324 M del Reino Unido vendido en 2025). Margen operativo guiado del
// 15,8-16,2 % (incluye 43 M de devoluciones IEEPA del 2T26) → 16,0 % + amortización 1,35 % = EBITDA 17,35 %.
// 2027e en adelante: margen EBITDA 17,1-17,3 % (sin IEEPA; el 2025 ajustado fue el 16,4 %, el 2023 el 17,2 %).
// Amortización del estado de flujos (sin el gasto no monetario de arrendamientos que mete el XBRL): 1,42 % en 2025, sube
// con los centros de distribución nuevos. Capex guiado 575-650 M en 2026 (3,1 %) que baja al 2,4 %.
// Circulante comercial (existencias + clientes − proveedores): 20,8 % de las ventas en 2025 y ≈ 22 % a jun-26 → 21 %.
const g = [9.5, 6.5, 6.0, 5.5, 5.0, 4.5, 4.0, 3.5, 3.0];
const m = [17.35, 17.1, 17.2, 17.3, 17.3, 17.3, 17.3, 17.3, 17.3];
const am = [1.35, 1.40, 1.45, 1.50, 1.55, 1.60, 1.60, 1.60, 1.60];
const cx = [3.1, 3.0, 2.9, 2.8, 2.7, 2.6, 2.5, 2.4, 2.4];
const anios = g.map((x, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: x, margen_ebitda_pct: m[i], amortizacion_pct_ventas: am[i], capex_pct_ventas: cx[i],
  nwc_pct_ventas: 21.0, tasa_impositiva_pct: 25.0, fijo: i === 0,
}));
export default {
  anios,
  wacc: { tasa_libre_pct: 5.12, beta: 0.90, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.3, tasa_impositiva_pct: 25.0, peso_deuda_pct: 4.0 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 15.0 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    // Bajista: recesión industrial en 2027 (como 2009 o 2015-16 en pequeño) y fin del precio arancelario: ventas −2 % en vez
    // de +6,5 % y margen −2 pp; después crecimiento 2,5 pp menor y margen 1,5 pp menor.
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.5, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.0, multiplo_salida: null, perfil: [{ periodo: '2027e', crecimiento_pp: -8.5, margen_pp: -2.0 }] },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 0.6, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
  puente_ingresos: [
    { periodo: '2027e', volumen_pct: 4.0, precio_pct: 2.5, otros_pct: 0.0 },
    { periodo: '2028e', volumen_pct: 4.0, precio_pct: 2.0, otros_pct: 0.0 },
    { periodo: '2029e', volumen_pct: 3.5, precio_pct: 2.0, otros_pct: 0.0 },
    { periodo: '2030e', volumen_pct: 3.0, precio_pct: 2.0, otros_pct: 0.0 },
    { periodo: '2031e', volumen_pct: 2.5, precio_pct: 2.0, otros_pct: 0.0 },
  ],
  mercado_final: null,
};
