// Supuestos del DCF, escenarios y pesos de H&R Block (corte 2026-10-19). Ejercicio a 30 de junio, etiquetado por el año en
// que termina (FY2027 = jul-26 a jun-27; aún sin ningún trimestre publicado, por eso no es «fijo»). Millones de USD.
// Margen EBITDA del DCF = EBIT + amortizaciones, SIN los otros ingresos (26,8 M en FY2026), que el EBITDA de la empresa sí
// incluye: FY2026 26,1 % (1.030,1 / 3.945,4). FY2027e = guía de EBITDA ajustado (1.110-1.140 M) menos otros ingresos ≈ 27 M
// sobre ingresos de 4.135 M → 26,6 %. Después, el margen se erosiona 0,2 puntos al año desde FY2030e por la presión de
// precios de Intuit y de la IA en la declaración sencilla (juicio propio).
const g = [4.8, 3.5, 3.0, 2.5, 2.5, 2.0, 2.0, 2.0];
const m = [26.6, 26.8, 26.8, 26.6, 26.4, 26.2, 26.0, 26.0];
// Amortización total (depreciación 1,9 % + intangibles comprados 1,2 %): 3,1 % de las ventas en FY2026 (122,4 M).
// Capex 2,1 % de las ventas (82,6 M) MÁS compras de franquicias y competidores (57,6 M, 1,5 %), que son la inversión
// recurrente de crecimiento: 3,4 % (≥ amortización en el último año).
const anios = g.map((x, i) => ({
  periodo: `FY${2027 + i}e`, crecimiento_pct: x, margen_ebitda_pct: m[i], amortizacion_pct_ventas: 3.1, capex_pct_ventas: 3.4,
  nwc_pct_ventas: -2.5, tasa_impositiva_pct: 23.5, fijo: false,
}));
export default {
  anios,
  // Tasa libre: bono a 10 años del Tesoro, 5,09 % el 16-oct-2026. Beta 0,80 (no la medida de 0,42: subestima un riesgo
  // propio, el de sustitución por IA, que no se mueve con el S&P) más 1,0 punto de prima específica por ese riesgo.
  wacc: { tasa_libre_pct: 5.09, beta: 0.80, prima_mercado_pct: 5.5, prima_adicional_pct: 1.0, coste_deuda_pct: 5.4, tasa_impositiva_pct: 23.5, peso_deuda_pct: 20 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.0, multiplo_salida: 8.0 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 30, ajuste_crecimiento_pp: -4.0, ajuste_margen_pp: -3.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 0.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 20, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 40, comparables: 10, transacciones: 0, suma_partes: 0, escenarios: 50 },
  // Puente de ingresos: volumen = declaraciones (asistidas, DIY de pago, internacional, clientes de Wave); precio = NAC;
  // otros = compras de franquicias (pasan de royalties del 30 % a ingresos propios) y divisa.
  puente_ingresos: [
    { periodo: 'FY2027e', volumen_pct: 0.5, precio_pct: 3.3, otros_pct: 1.0 },
    { periodo: 'FY2028e', volumen_pct: 0.0, precio_pct: 3.0, otros_pct: 0.5 },
    { periodo: 'FY2029e', volumen_pct: 0.0, precio_pct: 2.5, otros_pct: 0.5 },
    { periodo: 'FY2030e', volumen_pct: -0.5, precio_pct: 2.5, otros_pct: 0.5 },
    { periodo: 'FY2031e', volumen_pct: -0.5, precio_pct: 2.5, otros_pct: 0.5 },
  ],
  mercado_final: null,
};
