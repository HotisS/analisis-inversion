// Supuestos del DCF, escenarios y pesos de United Therapeutics (corte 2026-10-21). Ejercicio natural; millones de USD.
// 2026e: 1S26 real 1.564,8 + 2S ≈ 1.605 (Tyvaso DPI sube, Tyvaso nebulizado y Remodulin bajan) → 3.170 (−0,4 %, fijo).
// 2027e: Tyvaso recupera la PH-ILD sin Yutrepia (acuerdo del 14-oct-2026), FPI aprobada a finales de abril (≈ 8 meses de
// ventas), ralinepag a final de año; resta Orenitram genérico desde junio (Actavis) y diciembre (ANI), el fin de la licencia
// de Adcirca y la erosión de Remodulin. 2028e: primer año completo de FPI; genérico posible de Tyvaso nebulizado.
// Después converge al 2 %: las patentes de Tyvaso DPI vencen en 2030-2035 y la de PH-ILD en 2042.
const g = [-0.4, 11.4, 14.2, 12.9, 8.1, 4.0, 2.5, 2.0];
// Margen EBITDA (resultado operativo + amortización; con la remuneración en acciones liquidada en caja, STAP): 47,3 % LTM,
// 45,0 % en el 1S26 por la I+D de órganos y el lanzamiento de la FPI. Sube con la escala de la FPI y ralinepag.
const m = [45.5, 47.0, 48.0, 49.0, 49.5, 49.5, 49.0, 48.5];
const am = [3.2, 3.3, 3.4, 3.6, 3.8, 4.0, 4.0, 4.0];
// Capex: 16,5 % en 2025 y ≈ 13 % en 2026 (granjas de órganos de Minnesota y Texas, fábricas de Tyvaso DPI); baja al 4,5 %.
const cx = [13, 10, 7, 6, 5, 4.5, 4.5, 4.5];
const tax = [15, 21, 21, 21, 21, 21, 21, 21];
const anios = g.map((x, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: x, margen_ebitda_pct: m[i], amortizacion_pct_ventas: am[i], capex_pct_ventas: cx[i],
  nwc_pct_ventas: 16.0, tasa_impositiva_pct: tax[i], fijo: i === 0,
}));
export default {
  anios,
  wacc: { tasa_libre_pct: 5.12, beta: 0.80, prima_mercado_pct: 5.5, prima_adicional_pct: 1.0, coste_deuda_pct: 5.5, tasa_impositiva_pct: 21.0, peso_deuda_pct: 0 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 10.0 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -4.0, ajuste_margen_pp: -3.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 1.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 3.0, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 45, comparables: 15, transacciones: 0, suma_partes: 0, escenarios: 40 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 1.5, precio_pct: 1.0, otros_pct: -2.9 },
    { periodo: '2027e', volumen_pct: 9.4, precio_pct: 2.0, otros_pct: 0.0 },
    { periodo: '2028e', volumen_pct: 12.2, precio_pct: 2.0, otros_pct: 0.0 },
    { periodo: '2029e', volumen_pct: 10.9, precio_pct: 2.0, otros_pct: 0.0 },
    { periodo: '2030e', volumen_pct: 6.1, precio_pct: 2.0, otros_pct: 0.0 },
  ],
  // Mercado final 2030e: hipertensión arterial pulmonar (IMARC: 8.800 M USD en 2026 al 4,05 % → ≈ 10.300 M en 2030) +
  // FPI en los 7 grandes
  // mercados (IMARC: 4.045,7 M en 2025 al 6,34 % → ≈ 5.500 M en 2030). Total ≈ 15.750 M, el mismo perímetro que competencia.cuota_pct (25,6 % en 2025) [B].
  mercado_final: { periodo: '2030e', tamano: 15750 },
};
