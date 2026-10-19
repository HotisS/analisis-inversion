// Supuestos del DCF, escenarios y pesos de Edarat (corte 2026-10-19). SAR, ejercicio natural, NIIF (SOCPA). Millones de SAR.
// 2026e con el 1S26 publicado (ventas de 91,6 M, +22 %) y un segundo semestre que compara con un 2S25 muy fuerte (117,2 M, +99 %):
// +20 % (230,8 M), con el contrato de MIS de marzo (72,45 M), la incorporación a colocation de MIS (19,84 M, pago único) y la
// colocation de Mobily y Edge Network [A6, D12, D19, D22, D20].
// 2027e salta un 36 %: el negocio actual crece ≈ 15 % (diseño y supervisión del centro de IA de 200 MW de MIS, 197,8 M con IVA en
// varios años; Rackspace desde el 2T27) y se suman ≈ 50 M de alquiler de GPU (plan de 150 M SAR; pedido de 127,5 M en sep-2026)
// [D10, D11, D18]. Después, del 14 % al 6 % en 2032e, por debajo del mercado de centros de datos (13 % anual, Mordor) [B1].
// Margen EBITDA del 25 % en 2026e (24,9 % en los últimos doce meses) que sube al 31 % con las GPU (≈ 65 % de margen EBITDA en
// alquiler de capacidad) y baja poco a poco al 29,5 %. La amortización salta al 13 % de las ventas en 2027e: 150 M de GPU a cinco
// años son 30 M al año, seis veces la amortización de 2025 (5,1 M) [A3, D11]. Capex del 30-32 % en 2026-2027e (GPU) y del 10-11 %
// después: las GPU hay que reponerlas cada cinco años. Circulante del 32 % de las ventas: MIS paga tarde (56,5 M a cobrar a jun-26) [A2].
const a = (periodo, g, m, am, cx, tx, nwc, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: cx, nwc_pct_ventas: nwc, tasa_impositiva_pct: tx, fijo });
export default {
  anios: [
    a('2026e', 20.0, 25.0, 4.5, 30.0, 8.5, 32.0, true),
    a('2027e', 36.0, 31.0, 13.0, 32.0, 8.5, 32.0),
    a('2028e', 14.0, 31.5, 11.5, 11.0, 8.5, 32.0),
    a('2029e', 12.0, 31.0, 11.0, 11.0, 8.5, 32.0),
    a('2030e', 10.0, 30.5, 10.5, 10.5, 8.5, 32.0),
    a('2031e', 8.0, 30.0, 10.0, 10.0, 8.5, 32.0),
    a('2032e', 6.0, 29.5, 9.5, 10.0, 8.5, 32.0),
  ],
  // Tasa libre en USD (SAR anclado a 3,75): Treasury a 10 años 5,10 % (FRED, 15-oct-2026) + diferencial soberano 0,51 % = 5,61 % [D4, D5].
  // Beta 1,10 de sector (servicios de TI y centros de datos): la medida (0,34 mensual a cinco años) no sirve con 3.600 acciones al día [D1].
  // Prima adicional = país 0,78 % (Damodaran) + 1,5 % por tamaño e iliquidez (Nomu, ≈ 1 M SAR al día) [D5, D1].
  // Deuda: préstamo de 5,3 M a SAIBOR + 4 % (≈ 9 %), más la financiación del pedido de GPU; peso del 3 % sobre una capitalización de 2.079 M.
  wacc: { tasa_libre_pct: 5.61, beta: 1.1, prima_mercado_pct: 5.5, prima_adicional_pct: 2.28, coste_deuda_pct: 9.0, tasa_impositiva_pct: 8.5, peso_deuda_pct: 3 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 15 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -6.0, ajuste_margen_pp: -5.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 6.0, ajuste_margen_pp: 3.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 40, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 40 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 11.0, precio_pct: 0, otros_pct: 9.0 },
    { periodo: '2027e', volumen_pct: 15.0, precio_pct: 0, otros_pct: 21.0 },
    { periodo: '2028e', volumen_pct: 10.0, precio_pct: 0, otros_pct: 4.0 },
    { periodo: '2029e', volumen_pct: 11.0, precio_pct: 1.0, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 9.0, precio_pct: 1.0, otros_pct: 0 },
  ],
  // Mercado final: centros de datos de Arabia Saudí según Mordor Intelligence (2.110 M USD en 2025, 3.900 M en 2030, +13,07 % anual),
  // llevado a 2032e al mismo ritmo: ≈ 18.700 M SAR [B1]. Perímetro aproximado: Mordor mide sobre todo el gasto en construcción y
  // capacidad; la ingeniería y la nube de Edarat son una parte. Cuota del 2,4 % en 2025 al ≈ 2,7 % en 2032e.
  mercado_final: { periodo: '2032e', tamano: 18700 },
};
