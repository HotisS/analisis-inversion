// Supuestos del DCF, escenarios y pesos de Commvault (corte 2026-10-21). Ejercicio a 31 de marzo, etiquetado por el año en
// que termina (FY2027 = abr-26 a mar-27, en curso desde hace 6,7 meses; solo un trimestre publicado). Millones de USD.
// Margen EBITDA del DCF = EBITDA GAAP «limpio»: resultado operativo no GAAP de la empresa (21 % guiado en FY2027) MENOS la
// remuneración en acciones (123,4 M en FY2026, 10,4 % de las ventas; 172,4 M aún por reconocer), sus cargas sociales y la
// reestructuración (todos los años desde 2019: 4,5-32,2 M), MÁS la depreciación. La remuneración en acciones es un coste:
// la empresa recompra ≈ 60 % de su flujo libre para compensar la dilución.
const g = [10.3, 11.0, 10.0, 9.0, 8.0, 7.0, 6.0, 5.0];
const m = [10.2, 11.5, 13.0, 14.5, 16.0, 17.0, 18.0, 19.0];
// Depreciación (sin amortización de intangibles comprados, que es pequeña): 0,8 % de las ventas (10,1 M en los 12 meses a jun-26).
const am = g.map(() => 0.8);
// Capex = inmovilizado (≈ 0,3 % de las ventas) + aumento neto de comisiones capitalizadas (24,6 M en FY2026), que la empresa
// lleva en el flujo operativo: 2,0 % de las ventas bajando al 1,6 % al madurar la mezcla SaaS.
const cx = [2.0, 2.0, 1.9, 1.8, 1.7, 1.6, 1.6, 1.6];
const anios = g.map((x, i) => ({
  periodo: `FY${2027 + i}e`, crecimiento_pct: x, margen_ebitda_pct: m[i], amortizacion_pct_ventas: am[i], capex_pct_ventas: cx[i],
  // Circulante comercial: clientes − ingresos diferidos (corrientes y no corrientes) ≈ −37 % de las ventas en FY2026.
  nwc_pct_ventas: -37.0, tasa_impositiva_pct: 24.0, fijo: false,
}));
export default {
  anios,
  wacc: { tasa_libre_pct: 5.12, beta: 1.15, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.5, tasa_impositiva_pct: 24.0, peso_deuda_pct: 12 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 20.0 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -3.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 2.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
  puente_ingresos: [
    { periodo: 'FY2027e', volumen_pct: 7.0, precio_pct: 2.0, otros_pct: 1.3 },
    { periodo: 'FY2028e', volumen_pct: 8.5, precio_pct: 2.5, otros_pct: 0.0 },
    { periodo: 'FY2029e', volumen_pct: 7.5, precio_pct: 2.5, otros_pct: 0.0 },
    { periodo: 'FY2030e', volumen_pct: 6.5, precio_pct: 2.5, otros_pct: 0.0 },
    { periodo: 'FY2031e', volumen_pct: 5.5, precio_pct: 2.5, otros_pct: 0.0 },
  ],
  // Mercado de copia y recuperación de datos (MRFR: 11.650 M USD en 2025, +9,69 % anual [B1]) al final de la proyección.
  mercado_final: { periodo: 'FY2034e', tamano: Math.round(11650 * Math.pow(1.0969, 9)) },
};
