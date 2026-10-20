// Supuestos del DCF, escenarios y pesos de Lundin Gold (corte 2026-10-20). Año natural; millones de USD.
// Ingresos = onzas de oro vendidas × precio realizado (la plata es de LunR por el stream desde abril de 2026 y queda fuera,
// igual que el pasivo del stream en el puente). Oro del caso base: 4.150 USD/oz PLANO (cierre del 19-oct ≈ 4.160) [D, B].
// 2026e (fijo): 9 meses reales (374.019 oz vendidas a 4.518 USD) + 4T ≈ 150.000 oz a ≈ 4.150 → ≈ 2.330 M (+30,7 %) [A].
// Producción: guía 2026-2028 de 475.000-525.000 oz al año [D12]; después baja con la ley del plan de mina (informe técnico
// de 2023, vida hasta 2034) amortiguada por FDNS y las conversiones de recursos: 470, 450, 440, 430, 420, 410, 400 koz.
// Margen EBITDA: coste por onza ≈ 1.180 USD a 4.150 de oro (coste en efectivo 900-960 de la guía + regalías del 6 % y
// participación de trabajadores, que suben con el precio) → 71,5 %; baja un punto al año por la ley y la inflación minera.
const g = [30.7, -10.9, 0.0, -6.0, -4.3, -2.2, -2.3, -2.4, -2.4, -2.4];
const m = [73.1, 71.5, 71.5, 70.5, 69.5, 68.5, 67.5, 66.5, 65.5, 64.5];
// Amortización por unidades de producción: 101,7 M en 2025 (5,7 %) y ≈ 137 M al año con FDNS → 6,6-6,8 % de las ventas.
const am = [5.7, 6.6, 6.6, 6.8, 6.8, 6.8, 6.8, 6.8, 6.8, 6.8];
// Capex: mantenimiento de 75-90 M (2026), 80-95 M (2027) y 50-85 M (2028) más desarrollo de FDNS y FDN East y la
// exploración capitalizada [D12] → 120-190 M; desde 2029 ≈ 6 % de las ventas (≈ 110-125 M), algo más al final de la vida.
const cx = [5.2, 9.0, 8.5, 6.5, 6.0, 6.0, 6.0, 6.0, 6.5, 6.8];
const anios = g.map((x, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: x, margen_ebitda_pct: m[i], amortizacion_pct_ventas: am[i], capex_pct_ventas: cx[i],
  nwc_pct_ventas: 9.0, tasa_impositiva_pct: 31.0, fijo: i === 0,
}));
export default {
  anios,
  // Coste del capital: 5,15 % (bono de EE. UU. a 10 años, 19-oct) + 1,10 × 5,5 % + 3,5 % de prima de Ecuador (Caa3; prima de
  // riesgo país de 12,9 % de Damodaran × ≈ 0,27: la mina está entera en Ecuador pero vende en dólares y fuera del país, en
  // un país dolarizado) = 14,7 %. Sin deuda financiera.
  wacc: { tasa_libre_pct: 5.15, beta: 1.10, prima_mercado_pct: 5.5, prima_adicional_pct: 3.5, coste_deuda_pct: 7.0, tasa_impositiva_pct: 31.0, peso_deuda_pct: 0 },
  // Terminal con crecimiento NEGATIVO: una mina se agota. −3 % anual tras 2035 alarga la vida con los recursos medidos e
  // inferidos (7,48 + 2,03 Moz) y la exploración, pero con ley y producción menguantes.
  terminal: { metodo: 'gordon', crecimiento_pct: -3.0, multiplo_salida: 5.0 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    // Bajista: oro a 3.300 USD desde 2027 (−20 %; nivel de mediados de 2025) → ingresos de 2027 de ≈ 1.650 M (−29 %): el perfil
    // de 2027 resta 18,3 puntos al crecimiento; los años siguientes conservan el precio bajo (sin ajuste de crecimiento) y el
    // margen baja 5,5 puntos (costes por onza casi fijos). WACC +0,5 por el riesgo de Ecuador (reclamaciones fiscales).
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: 0, ajuste_margen_pp: -5.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: -4.0, multiplo_salida: null,
      perfil: [{ periodo: '2027e', crecimiento_pp: -18.3, margen_pp: -5.5 }] },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
    // Alcista: oro a 4.900 USD desde 2027 (≈ media de 2026 hasta hoy y +18 % sobre el actual) → ingresos de 2027 de ≈ 2.450 M
    // (+5 %): perfil de +16,1 puntos; margen +3 puntos.
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 3.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null,
      perfil: [{ periodo: '2027e', crecimiento_pp: 16.1, margen_pp: 3.0 }] },
  ],
  pesos: { dcf: 45, comparables: 15, transacciones: 0, suma_partes: 0, escenarios: 40 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 5.0, precio_pct: 22.8, otros_pct: 2.9 },
    { periodo: '2027e', volumen_pct: -4.6, precio_pct: -6.0, otros_pct: -0.3 },
    { periodo: '2028e', volumen_pct: 0.0, precio_pct: 0.0, otros_pct: 0.0 },
    { periodo: '2029e', volumen_pct: -6.0, precio_pct: 0.0, otros_pct: 0.0 },
    { periodo: '2030e', volumen_pct: -4.3, precio_pct: 0.0, otros_pct: 0.0 },
  ],
  mercado_final: null,
};
