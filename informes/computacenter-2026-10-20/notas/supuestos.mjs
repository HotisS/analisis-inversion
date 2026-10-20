// Supuestos del DCF, escenarios y pesos de Computacenter (corte 2026-10-20). Ejercicio a 31 de diciembre. Millones de GBP.
// Ventas NIIF (software y servicios de terceros revendidos solo por su margen, criterio de agente desde 2022) [A1, A4].
// 2026e FIJO: ventas de 13.850 M (+50,6 %): 6.845 M en el 1S26 (+71,6 %) [A5] y un segundo semestre de ≈ 7.000 M (+25 % frente
// a los 5.570 M del 2S25) con la cartera de pedidos de producto de 9.300 M a junio [A5]; consenso 13.827 M [D3].
// Margen EBITDA = EBITDA AJUSTADO de la empresa (resultado operativo ajustado + depreciación de inmovilizado, derechos de uso y
// software propio; sin amortización de intangibles comprados ni excepcionales): 3,39 % en 2026e, calibrado con la guía de
// beneficio ajustado antes de impuestos ≥ 380 M [A5, D4] (≈ 381 M de resultado operativo ajustado + ≈ 85 M de depreciación sobre
// 13.850 M = 3,37 %; el consenso de EBITDA ajustado es 482,9 M, un 3,49 % [D3]). Baja a 3,30 % desde 2027e porque la mezcla gira
// hacia hardware de hiperescala de margen bruto bajo (9,6 % en el 1S26 frente al 14,9 % de 2024) [A5].
const g = [50.6, 9.0, 4.0, 3.0, 3.0, 3.0, 2.5, 2.5];
const m = [3.39, 3.30, 3.30, 3.30, 3.30, 3.30, 3.30, 3.30];
// Amortización total (depreciación + derechos de uso + software + intangibles comprados): 87,6 M en 2025 (0,95 % de 9.194 M) y
// ≈ 92 M en los doce meses a junio de 2026 (0,76 % de 12.050 M) [A1, A5]: 0,69 % sobre las ventas de 2026e (≈ 96 M) y siguientes.
const am = [0.69, 0.69, 0.69, 0.69, 0.69, 0.69, 0.69, 0.69];
// Capex = inversión en inmovilizado y software (70-75 M guiados para 2026 [D4]) + altas de derechos de uso (≈ 45 M al año,
// NIIF 16: los arrendamientos van al puente y su reposición, aquí): ≈ 120 M = 0,87 % de las ventas de 2026e.
const cx = [0.87, 0.87, 0.87, 0.87, 0.87, 0.87, 0.87, 0.87];
const anios = g.map((x, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: x, margen_ebitda_pct: m[i], amortizacion_pct_ventas: am[i], capex_pct_ventas: cx[i],
  // Circulante comercial (clientes + existencias + activos de contrato − proveedores − pasivos de contrato) de −1,5 % de las
  // ventas: −5,6 % a diciembre de 2025 (cobros anticipados de fin de año) y ≈ +2 % a junio de 2026; media de cierre y semestre [A1, A5].
  nwc_pct_ventas: -1.5, tasa_impositiva_pct: 29.5, fijo: i === 0,
}));
export default {
  anios,
  // Gilt a 10 años 5,31 % (15-oct-2026, BoE IUDMNPY [D6]); beta 1,0 (mensual a 5 años frente al FTSE [D1]); prima de mercado 5,0 %;
  // prima adicional de 0,5 puntos por la concentración (un cliente de EE. UU. = 30 % de las ventas [A1]); deuda financiera
  // casi nula: peso ≈ 4 % con los arrendamientos; coste 6,5 % (tipo de las líneas de crédito y del «invoice financing»).
  wacc: { tasa_libre_pct: 5.31, beta: 1.0, prima_mercado_pct: 5.0, prima_adicional_pct: 0.5, coste_deuda_pct: 6.5, tasa_impositiva_pct: 25.0, peso_deuda_pct: 4 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 10.0 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    // Bajista: el gran cliente de hiperescala frena la construcción de centros de datos (2027e −6 %: −15 puntos ese año, como la caída
    // de la acción de 2022 tras el exceso de pedidos) y el resto del plan crece un punto menos; margen 0,2 puntos menor.
    { escenario: 'Bajista', probabilidad_pct: 30, ajuste_crecimiento_pp: -1.0, ajuste_margen_pp: -0.2, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.0, multiplo_salida: null,
      perfil: [{ periodo: '2027e', crecimiento_pp: -15.0, margen_pp: -0.3 }] },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 20, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 0.1, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null,
      perfil: [{ periodo: '2027e', crecimiento_pp: 4.0, margen_pp: 0.1 }] },
  ],
  pesos: { dcf: 45, comparables: 15, transacciones: 0, suma_partes: 0, escenarios: 40 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 46.3, precio_pct: 0.0, otros_pct: 4.3 },
    { periodo: '2027e', volumen_pct: 6.5, precio_pct: 1.0, otros_pct: 1.5 },
    { periodo: '2028e', volumen_pct: 3.0, precio_pct: 1.0, otros_pct: 0.0 },
    { periodo: '2029e', volumen_pct: 2.0, precio_pct: 1.0, otros_pct: 0.0 },
    { periodo: '2030e', volumen_pct: 2.0, precio_pct: 1.0, otros_pct: 0.0 },
  ],
  // Mercado final: gasto mundial en sistemas de centros de datos y dispositivos (Gartner, abril de 2026 [B1]): ≈ 1.231.000 M GBP en
  // 2026 que suponemos crece un 3 % anual después del salto de 2025-2026 (sin previsión publicada): ≈ 1.514.000 M GBP en 2033e.
  mercado_final: { periodo: '2033e', tamano: 1514000 },
};
