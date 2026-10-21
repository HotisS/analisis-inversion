// Supuestos del DCF y de los escenarios (Medpace, corte 2026-10-12).
// Base: ingresos totales (con los gastos reembolsados a margen cero, el 41 % en 2025) y EBITDA = EBIT + amortizaciones [A].
// 2026e fijado con la guía de julio (2.805-2.885 M; EBITDA 618-642 M) y el consenso (2.852 M; 627,6 M) [D]: 2.850 M, +12,6 %.
// 2027e-2028e: consenso 3.033 M (+6,3 %) y 3.329 M (+9,8 %) [D]; la cartera solo creció un 4,3 % en 2025 y 4,9 % a jun-26 [A].
const G = [12.6, 7.0, 9.5, 9.0, 8.5, 8.0, 7.5, 6.5, 5.5, 4.5];
// Margen sobre ingresos totales: 22,3 % en 2025 (22,6 % en 2024); consenso 22,0 % en 2026e, 22,3 % en 2027e y 22,1 % en 2028e [A, D].
const M = [22.0, 22.2, 22.4, 22.6, 22.8, 23.0, 23.0, 23.0, 23.0, 23.0];
// Amortización 1,1 % de las ventas en 2025; capex 1,2 % en 2025 y 2,2 % en el 1S26 por obras en la sede [A].
const AMORT = [1.1, 1.1, 1.2, 1.2, 1.3, 1.3, 1.3, 1.4, 1.4, 1.4];
const CAPEX = [1.8, 1.6, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5];
// Circulante comercial con los anticipos de clientes: −19,0 % de las ventas en 2025 (clientes 376,8 + activos por contrato 25,4
// − proveedores 28,1 − anticipos 854,4) [A]. Se proyecta que el peso de los anticipos baje poco a poco (−16 % al final): devuelve
// parte del flotante en vez de suponer que cada dólar de ventas nuevas trae 19 céntimos de caja gratis.
const NWC = [-18.5, -18.0, -17.6, -17.3, -17.0, -16.7, -16.5, -16.3, -16.1, -16.0];
// Tipo efectivo: guía 2026 del 19,0-19,5 % [D]; 16,8 % en 2025 por los pagos en acciones; 20 % normalizado.
const TAX = [19.5, 20, 20, 20, 20, 20, 20, 20, 20, 20];

export const anios = G.map((g, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: g, margen_ebitda_pct: M[i], amortizacion_pct_ventas: AMORT[i],
  capex_pct_ventas: CAPEX[i], nwc_pct_ventas: NWC[i], tasa_impositiva_pct: TAX[i], fijo: i === 0,
}));

// WACC: Tesoro a 10 años 5,22 % (8-oct-2026, FRED) [D12]; beta 1,09 ajustada mensual a 5 años frente al S&P 500 [D1]
// (mensual sin ajustar 1,13; semanal a 2 años 0,98; Stock Analysis 1,18 [D10]); prima de mercado 5,5 %; sin deuda.
// Prima adicional 0,5 puntos: dependencia del fundador de 69 años sin sucesor, 95 % de clientes biotecnológicos pequeños
// y medianos y 29 % de los ingresos en una sola área (metabolismo) [A, B, C].
export const wacc = { tasa_libre_pct: 5.22, beta: 1.09, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 6.0, tasa_impositiva_pct: 20, peso_deuda_pct: 0 };
export const terminal = { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 16.0 };
export const etapa2 = { usar: false, anios: 10, margen_final_pct: null };

// Sostenibilidad: puente de ingresos (estimación propia) y mercado final (desarrollo clínico externalizado, 75.000 M USD en 2025
// según IQVIA [B9], con el 4,5 % anual que usa la nota B: ≈ 93.500 M en 2030).
export const puente_ingresos = [
  { periodo: '2026e', volumen_pct: 7.5, precio_pct: 2.5, otros_pct: 2.6 },
  { periodo: '2027e', volumen_pct: 4.0, precio_pct: 2.5, otros_pct: 0.5 },
  { periodo: '2028e', volumen_pct: 6.5, precio_pct: 2.5, otros_pct: 0.5 },
  { periodo: '2029e', volumen_pct: 6.0, precio_pct: 2.5, otros_pct: 0.5 },
  { periodo: '2030e', volumen_pct: 6.0, precio_pct: 2.5, otros_pct: 0.0 },
];
export const mercado_final = { periodo: '2030e', tamano: 93500 };

export const casos = [
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -2.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.5, multiplo_salida: null, perfil: [{ periodo: '2027e', crecimiento_pp: -12.0, margen_pp: -3.0 }] },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 4.0, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
];

export const pesos = { dcf: 45, comparables: 15, transacciones: 0, suma_partes: 0, escenarios: 40 };

export const referencia_mercado = { mercado: 'S&P 500 (prima implícita con reparto sostenible de los últimos 12 meses)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx, fila de octubre de 2026 [D13]' };

if (process.argv[1] && process.argv[1].endsWith('supuestos.mjs')) console.table(anios);
