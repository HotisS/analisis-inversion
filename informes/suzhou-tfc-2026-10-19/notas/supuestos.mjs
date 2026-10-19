// Supuestos del DCF, escenarios y pesos de Suzhou TFC Optical (corte 2026-10-19). Ejercicio a 31 de diciembre. Millones de CNY.
// Punto de partida: 2025 real (ventas 5.163,4; EBITDA 2.481,5 = 48,1 %) y 1S26 (ventas 2.827,9, +15,2 %; EBITDA ≈ 53,6 %) [A1, A2].
// 2026e FIJO: 7.000 M (2S26 de 4.172 M, +54 % interanual y +48 % sobre el 1S26): pasivos al ritmo del 1S26 (+70-77 %) y
// motores activos que se recuperan al mejorar la oferta de chips EML desde el 3T-4T, según la empresa [A2, B4]. Por debajo del
// consenso (8.664 M), que exige un 2S26 de 5.836 M (×2,06 sobre el 1S26) [D3].
// Después: +50 % en 2027e (1,6T y CPO), +30 % en 2028e, +10 % en 2029e y una MESETA en 2030e (0 %: digestión de la inversión
// en IA tras tres años de crecimiento fuerte), luego +2 %. Ventas de 2030e: 14.515 M = 9,5 % del mercado de componentes ópticos
// previsto para 2030 (152.730 M CNY), por debajo de la cuota de 2025 (11,7 %) [B1].
// Margen EBITDA (incluye subvenciones y otros ingresos de explotación, ≈ 1 % de las ventas): del 51 % (2026e, mezcla con más
// motores activos de menor margen que en el 1S26) al 40 % a largo plazo, el nivel de 2019-2022 antes de la IA [A1].
const g = [35.6, 50, 30, 10, 0, 2, 2, 2];
const m = [51, 50, 48, 45, 42, 40, 40, 40];
// Amortizaciones: 3,4 % de las ventas en 2025 y ≈ 3,7 % en el 1S26, subiendo con la fábrica de Tailandia y Jiangxi [A1, A2].
const am = [3.7, 3.9, 4.1, 4.3, 4.4, 4.4, 4.4, 4.4];
// Capex: 8,1 % de las ventas en 2025 (417,5 M) y 10,9 % en el 1S26 (308,3 M) [A4]; baja al 4,5 % de mantenimiento.
const cx = [10, 9, 7, 6, 5, 4.5, 4.5, 4.5];
const t = [14, 14, 14.5, 15, 15, 15, 15, 15];
const anios = g.map((x, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: x, margen_ebitda_pct: m[i], amortizacion_pct_ventas: am[i], capex_pct_ventas: cx[i],
  nwc_pct_ventas: 19, tasa_impositiva_pct: t[i], fijo: i === 0,
}));
export default {
  anios,
  // Sin deuda financiera: WACC = coste del capital. Tasa libre del bono chino a 10 años (1,65 %, ChinaBond 16-oct [D5]),
  // beta de 1,5 (mensual a 5 años ajustada; la semanal de 2 años es 3,4 [D1]), prima del 5,5 % y un punto adicional por la
  // concentración en un cliente (64 % de las ventas) y el riesgo de controles de exportación.
  wacc: { tasa_libre_pct: 1.65, beta: 1.5, prima_mercado_pct: 5.5, prima_adicional_pct: 1.0, coste_deuda_pct: 3.0, tasa_impositiva_pct: 15, peso_deuda_pct: 0 },
  terminal: { metodo: 'gordon', crecimiento_pct: 1.0, multiplo_salida: 12.0 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    // Bajista: ciclo de digestión. 2027e +35 % (−15 puntos), 2028e −10 % (−40 puntos) con 8 puntos menos de margen, 2029e +15 %
    // (+5 puntos) y margen 5-6 puntos menor el resto (competencia de Innolight y Eoptolink integrando componentes, precios).
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: 0, ajuste_margen_pp: -5, ajuste_wacc_pp: 1.0, crecimiento_terminal_pct: 0.5, multiplo_salida: null,
      perfil: [{ periodo: '2027e', crecimiento_pp: -15, margen_pp: -5 }, { periodo: '2028e', crecimiento_pp: -40, margen_pp: -8 }, { periodo: '2029e', crecimiento_pp: 5, margen_pp: -6 }] },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    // Alcista: 1,6T y CPO más rápidos (consenso): 2027e +60 % y 2028e +45 %, 2 puntos más de margen.
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 2, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null,
      perfil: [{ periodo: '2027e', crecimiento_pp: 10, margen_pp: 2 }, { periodo: '2028e', crecimiento_pp: 15, margen_pp: 2 }] },
  ],
  pesos: { dcf: 50, comparables: 15, transacciones: 0, suma_partes: 0, escenarios: 35 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 40.0, precio_pct: -6.0, otros_pct: 1.6 },
    { periodo: '2027e', volumen_pct: 55.0, precio_pct: -8.0, otros_pct: 3.0 },
    { periodo: '2028e', volumen_pct: 38.0, precio_pct: -8.0, otros_pct: 0.0 },
    { periodo: '2029e', volumen_pct: 18.0, precio_pct: -8.0, otros_pct: 0.0 },
    { periodo: '2030e', volumen_pct: 8.0, precio_pct: -8.0, otros_pct: 0.0 },
  ],
  mercado_final: { periodo: '2030e', tamano: 152730 },
};
