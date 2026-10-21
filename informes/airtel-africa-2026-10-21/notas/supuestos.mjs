// Supuestos del DCF, escenarios y pesos de Airtel Africa (corte 2026-10-21). Ejercicio a 31 de marzo, etiquetado por el año
// en que termina (FY2027 = abr-26 a mar-27, en curso desde hace 6,7 meses). Millones de USD. NIIF 16: arrendamientos en la deuda,
// EBITDA antes de alquileres, amortización total (incluye derechos de uso) y capex = capex de caja + altas de derechos de uso
// (697 M en FY2026; 1.867 M en FY2025 por la renovación de contratos de torres) para que la inversión en torres no desaparezca.
// Crecimiento en DÓLARES: moneda constante ≈ +18-20 % en FY2027 (1T +21,1 %) con monedas estables o algo más fuertes en 2026;
// a partir de FY2029 se descuenta una pérdida media de ≈ 4-5 puntos al año por devaluación frente al dólar (media histórica).
const g = [22.0, 14.0, 12.0, 10.0, 9.0, 8.0, 6.0, 5.0];
// Margen EBITDA: 49,3 % en FY2026 y 50,1 % en el 1T FY2027; el gasóleo resta 2,5-3 puntos en ritmo anual en el 1S FY2027.
const m = [49.0, 49.5, 50.0, 50.0, 50.0, 50.0, 50.0, 50.0];
// Amortización total: 16,3 % de las ventas en FY2026 (1.047 M).
const am = [16.3, 16.4, 16.5, 16.5, 16.5, 16.5, 16.5, 16.5];
// Capex de caja (guía ≈ 1.100 M en FY2027, ≈ 14 % de las ventas) + altas de derechos de uso (≈ 9 %). Terminal ≥ amortización + 1,5.
const cx = [23.0, 21.5, 20.5, 20.0, 19.5, 19.0, 18.5, 18.0];
const t = [40, 39, 38, 38, 38, 38, 38, 38];
const anios = g.map((x, i) => ({
  periodo: `FY${2027 + i}e`, crecimiento_pct: x, margen_ebitda_pct: m[i], amortizacion_pct_ventas: am[i], capex_pct_ventas: cx[i],
  nwc_pct_ventas: -6.0, tasa_impositiva_pct: t[i], fijo: false,
}));
export default {
  anios,
  // Tasa libre: bono de EE. UU. a 10 años (5,12 % el 20-oct). Beta 1,0 (semanal de 2 años; mensual de 5 años 1,6, inflada por
  // la naira). Prima adicional de 6,0 puntos: riesgo país ponderado por EBITDA (Nigeria ≈ 1/3 del EBITDA; Damodaran: 8,4 % por
  // rating y 5,7 % por CDS en Nigeria, Kenia, Uganda y RD del Congo; Tanzania 5,8 %; Zambia y Gabón 11,7 %), rebajada porque
  // parte del riesgo ya va en el crecimiento en dólares. Coste de la deuda: 11 % (bonos en dólares ≈ 7-9 %, deuda local en
  // naira y francos CFA ≈ 15-25 %).
  wacc: { tasa_libre_pct: 5.12, beta: 1.0, prima_mercado_pct: 5.5, prima_adicional_pct: 6.0, coste_deuda_pct: 11.0, tasa_impositiva_pct: 38.0, peso_deuda_pct: 30 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 5.5 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 1.0, crecimiento_terminal_pct: 2.5, multiplo_salida: null, perfil: [{ periodo: 'FY2028e', crecimiento_pp: -12.0, margen_pp: -3.0 }] },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 40, comparables: 20, transacciones: 0, suma_partes: 20, escenarios: 20 },
  // Puente en dólares: volumen (clientes de datos y de dinero móvil, uso por cliente), precio (tarifas y mezcla; en moneda
  // local la inflación sube los precios) y otros (efecto de las monedas: negativo a partir de FY2028).
  puente_ingresos: [
    { periodo: 'FY2027e', volumen_pct: 10.0, precio_pct: 9.0, otros_pct: 3.0 },
    { periodo: 'FY2028e', volumen_pct: 9.0, precio_pct: 7.0, otros_pct: -2.0 },
    { periodo: 'FY2029e', volumen_pct: 8.0, precio_pct: 6.0, otros_pct: -2.0 },
    { periodo: 'FY2030e', volumen_pct: 7.0, precio_pct: 5.0, otros_pct: -2.0 },
    { periodo: 'FY2031e', volumen_pct: 6.0, precio_pct: 5.0, otros_pct: -2.0 },
  ],
  // Mercado final (perímetro de competencia.cuota_pct: ingresos de los operadores móviles de África según GSMA, 60.500 M USD en
  // 2025 y 90.300 M en 2030 [B1]); 2033 (≈ FY2034e) prolongado al 6 % anual: ≈ 107.500 M.
  mercado_final: { periodo: 'FY2034e', tamano: 107500 },
};
