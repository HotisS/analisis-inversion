// Supuestos del DCF y de los escenarios (Burkhalter, corte 2026-10-11). Millones de CHF; ejercicio natural; Swiss GAAP FER (sin NIIF 16).
// Base: 2025 real (ventas 1.207,5 M; EBITDA 83,0 M, 6,9 %; amortizaciones 0,8 % de las ventas; capex 0,8 %).
// 2026e: 1S26 publicado (ventas 587,3 M, +0,1 %; EBITDA 35,5 M, 6,0 % frente a 5,8 %) y guía de BPA «moderadamente» al alza.
//   Seis compras pequeñas en 2026 (≈ 20 M de ventas anuales): el crecimiento publicado será ≈ +0,5-1 %. Año fijo.
// Proyección SIN compras (crecimiento orgánico): así no hace falta meter el coste de las compras en el capex (lección Constellation).
// 2027e-2029e: orgánico +2,0-2,5 % (precio ≈ 1-1,5 % + volumen ≈ 1 %: renovación energética, electrificación). El consenso (+8,1 % en
//   2027e) incluye compras y parte de un 2026e anómalo (1.192 M).
// Margen EBITDA: del 6,9 % de 2025 al 7,4 % en 2028e (consenso 7,6 % en 2028e); máximo histórico 6,9-7,9 % en segundos semestres.
// Circulante comercial con activos y pasivos por contrato ≈ 11 % de las ventas (2025: 10,9 %).

export const modelo = [
  //  periodo   crec  margen amort capex  nwc   tasa  fijo
  ['2026e', 0.8, 7.2, 0.8, 0.9, 11.0, 16.5, true],
  ['2027e', 2.5, 7.3, 0.8, 0.9, 11.0, 16.5, false],
  ['2028e', 2.5, 7.4, 0.8, 0.9, 11.0, 16.5, false],
  ['2029e', 2.0, 7.4, 0.8, 0.9, 11.0, 16.5, false],
  ['2030e', 2.0, 7.4, 0.8, 0.9, 11.0, 16.5, false],
  ['2031e', 1.5, 7.4, 0.8, 0.9, 11.0, 16.5, false],
  ['2032e', 1.0, 7.4, 0.8, 0.9, 11.0, 16.5, false],
];

export const anios = modelo.map(([periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas, nwc_pct_ventas, tasa_impositiva_pct, fijo]) => ({
  periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas, nwc_pct_ventas, tasa_impositiva_pct, fijo,
}));

// Tasa libre: bono de la Confederación a 10 años, 0,586 % (SNB, 30-sep-2026) [D19]. Beta 0,90: entre la ajustada de la acción frente al
// SPI (0,72 mensual, 0,79 semanal) [D1] y la sectorial desapalancada de Damodaran (1,09-1,14) [D21], porque el SPI es un índice
// defensivo y la acción tiene poca liquidez (beta medida a la baja). Prima de mercado 5,5 %. Prima adicional 1,0 punto por tamaño
// (1.328 M CHF) y liquidez (≈ 2,7 M CHF diarios). Coste de la deuda 2,0 % (hipotecas al 0,8-2,21 %), peso de la deuda 3 %.
export const wacc = { tasa_libre_pct: 0.59, beta: 0.9, prima_mercado_pct: 5.5, prima_adicional_pct: 1.0, coste_deuda_pct: 2.0, tasa_impositiva_pct: 16.5, peso_deuda_pct: 3 };
export const terminal = { metodo: 'gordon', crecimiento_pct: 1.0, multiplo_salida: 11.0 };
export const etapa2 = { usar: false, anios: 10, margen_final_pct: null };

export const casos = [
  // Bajista: recesión de la construcción suiza como la de los noventa, más suave: ventas −6 % en 2027 y −3 % en 2028 y margen
  // EBITDA 1,5 puntos menor esos años (vuelta al 5,8 % de 2020-2021 sin poenina y al margen de los primeros semestres); luego un
  // punto menos de margen para siempre por precios de licitación y salarios; +0,5 de WACC.
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -0.5, ajuste_margen_pp: -1.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 0.75, multiplo_salida: null,
    perfil: [ { periodo: '2027e', crecimiento_pp: -8.5, margen_pp: -1.5 }, { periodo: '2028e', crecimiento_pp: -5.5, margen_pp: -1.5 } ] },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
  // Alcista: la electrificación (bombas de calor, solar, cargadores) y el Gebäudeprogramm dan un orgánico del 3,5-4 % y el margen sube al
  // 7,9 % de los segundos semestres de 2024-2025.
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 0.7, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
];

export const pesos = { dcf: 55, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 25 };

export const referencia_mercado = { mercado: 'S&P 500 (prima implícita mensual de Damodaran; vale para los mercados desarrollados)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx, octubre de 2026 [D20]' };
