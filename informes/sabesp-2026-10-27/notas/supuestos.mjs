// Supuestos del DCF, escenarios y pesos de Sabesp (corte 2026-10-27). Ejercicio natural; millones de BRL.
// Base de ingresos: ingresos de saneamiento AJUSTADOS (sin construcción, sin actualización del activo financiero), 22.213 M en 2025.
// Retribución regulada (contrato URAE-1, ARSESP): ingresos requeridos ≈ costes reconocidos + amortización regulatoria + WACC
// regulatorio (7,86 % real) × base de activos (BAR 88.000 M en 2024, actualizada cada año en 2024-2034 con el capex reconocido
// y el IPCA). Estimación propia de la BAR: 2025 ≈ 104.000; 2026 ≈ 124.000; 2027 ≈ 142.000; 2028 ≈ 156.000; 2029 ≈ 168.000;
// 2030 ≈ 179.000 M (capex de 20.000, 17.000, 13.000, 11.000 y 9.000 M; amortización regulatoria ≈ 3,5 % e IPCA ≈ 4,5 %).
// Con un rendimiento nominal ≈ 12,2 % (7,86 % real + IPCA) sobre la BAR media, los ingresos requeridos serían ≈ 24.900 M en 2026
// (cifra de ARSESP), ≈ 30.900 en 2027, ≈ 34.000 en 2028, ≈ 36.500 en 2029 y ≈ 39.000 en 2030. El DCF se queda algo por debajo
// (retraso de un año en el reconocimiento, tarifa social, consumo por persona).
const g = [12.0, 19.0, 10.0, 7.5, 7.0, 6.0, 5.5, 5.0, 5.0, 4.5];
// Margen EBITDA ajustado: 59,5 % en 2025, 60,6 % en el 1S26. Sube con la retribución de la base nueva frente a costes que crecen
// con el IPCA: el margen regulado (ingresos − costes reconocidos) pasaría del 62 % al 70 %; tomamos 64-67 % por prudencia.
const m = [60.0, 64.0, 66.0, 67.0, 67.0, 67.0, 67.0, 67.0, 67.0, 67.0];
// Amortización: 9,9 % en 2025 y 11,9 % en el 1S26; sube con la base de activos de la concesión.
const am = [12.0, 12.5, 13.0, 13.5, 14.0, 14.5, 15.0, 15.0, 15.0, 15.0];
// Capex (todo el de la concesión): ≈ 20.000 M en 2026 (guía), 17.000 en 2027, 13.000 en 2028, 11.000 en 2029 (≈ 70.000 M entre
// jul-2024 y 2029), 9.000 en 2030 y después, del orden de 1,2 veces la amortización (la BAR se actualiza por IPCA sin capex).
const cx = [80.4, 57.4, 39.9, 31.4, 24.0, 21.0, 20.0, 19.0, 18.5, 18.0];
const anios = g.map((x, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: x, margen_ebitda_pct: m[i], amortizacion_pct_ventas: am[i], capex_pct_ventas: cx[i],
  // Circulante comercial (clientes + existencias − proveedores): 9,2 % de las ventas en 2025; 7 % con los proveedores del capex.
  nwc_pct_ventas: 7.0, tasa_impositiva_pct: 27.0, fijo: i === 0,
}));
export default {
  anios,
  // Tasa libre: bono del Tesoro brasileño a 10 años en reales, 15,435 % el 26-oct-2026 [D3]. Riesgo país dentro del bono: prima
  // adicional 0. Beta 0,80: mensual de 5 años frente al Ibovespa 0,95, semanal de 5 años 1,07 y de 2 años 1,35 [D1]; una
  // regulada con tarifa ligada al IPCA debería estar por debajo del mercado (las reguladas brasileñas tienen betas de Yahoo
  // de 0,0-0,2 y las de agua de EE. UU. y Reino Unido de 0,5-0,6 [D2]). Coste de la deuda 13,5 % (CDI ≈ Selic 13,75 % menos
  // la parte en IPCA y en divisa cubierta; 11,1 % devengado en el 2T26). Peso de la deuda 38 % (deuda bruta y PPP 54.980 M
  // frente a capitalización de 89.144 M).
  wacc: { tasa_libre_pct: 15.435, beta: 0.80, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 13.5, tasa_impositiva_pct: 34.0, peso_deuda_pct: 38.0 },
  // Terminal en BRL: inflación del Focus para 2029-2030 3,5 % [D7] + 1 punto real = 4,5 % (entre la inflación y la tasa libre).
  terminal: { metodo: 'gordon', crecimiento_pct: 4.5, multiplo_salida: 8.0 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.5, ajuste_margen_pp: -3.0, ajuste_wacc_pp: 1.0, crecimiento_terminal_pct: 4.0, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.5, ajuste_wacc_pp: -1.0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 1.5, precio_pct: 8.0, otros_pct: 2.5 },
    { periodo: '2027e', volumen_pct: 2.0, precio_pct: 17.0, otros_pct: 0.0 },
    { periodo: '2028e', volumen_pct: 2.0, precio_pct: 8.0, otros_pct: 0.0 },
    { periodo: '2029e', volumen_pct: 2.0, precio_pct: 5.5, otros_pct: 0.0 },
    { periodo: '2030e', volumen_pct: 1.5, precio_pct: 5.5, otros_pct: 0.0 },
  ],
  mercado_final: null,
};
