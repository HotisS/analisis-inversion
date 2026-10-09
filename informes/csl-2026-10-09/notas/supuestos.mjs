// Supuestos del DCF y de los escenarios (CSL, corte 2026-10-09). Millones de USD; ejercicio a junio, nombrado por el año en que termina.
// Base: FY2026 real (ingresos totales 15.797 M; EBITDA subyacente 5.282 M = 33,4 %, sin los 844 M de reestructuración).
// FY2027e: guía de ingresos planos a tipos de FY26 y NPAT subyacente +5 % (≈ 5.370 M de EBITDA subyacente, 34 %), MENOS
// ≈ 300 M de reestructuración en caja que la empresa deja fuera del subyacente: margen del DCF ≈ 32,2 % (consenso 32,3 %).
// Capex = inmovilizado + intangibles (guía FY27 de ≈ 1.000 M de capex más pagos de desarrollo y licencias) + altas de derechos de uso
// (NIIF 16, ≈ 1 % de ventas). Amortización = toda, incluida la de IP adquirida (≈ 250 M en FY27, a la baja).

export const modelo = [
  //  periodo     crec   margen  amort  capex  nwc   tasa
  ['FY2027e', -0.3, 32.2, 5.8, 9.2, 42.0, 21.0],
  ['FY2028e',  3.8, 34.3, 5.7, 9.0, 41.8, 21.0],
  ['FY2029e',  5.0, 34.8, 5.6, 8.6, 41.5, 21.0],
  ['FY2030e',  5.0, 35.2, 5.5, 8.0, 41.2, 21.0],
  ['FY2031e',  5.0, 35.5, 5.5, 7.2, 41.0, 21.0],
  ['FY2032e',  4.5, 35.5, 5.5, 6.8, 41.0, 21.0],
  ['FY2033e',  4.0, 35.5, 5.5, 6.6, 41.0, 21.0],
  ['FY2034e',  3.5, 35.5, 5.5, 6.5, 41.0, 21.0],
  ['FY2035e',  3.0, 35.5, 5.5, 6.5, 41.0, 21.0],
  ['FY2036e',  3.0, 35.5, 5.5, 6.5, 41.0, 21.0],
];

export const anios = modelo.map(([periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas, nwc_pct_ventas, tasa_impositiva_pct]) => ({
  periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas, nwc_pct_ventas, tasa_impositiva_pct, fijo: false,
}));

// Tasa libre: Tesoro de EE. UU. a 10 años (flujos en USD). Beta ajustada (Blume) mensual a 5 años de CSL en USD frente a la sanidad mundial (IXJ).
// Deuda a valor de mercado: 9.383 + 1.513 de arrendamientos = 10.896 M frente a 61.730 M de capitalización: 15 %.
export const wacc = { tasa_libre_pct: 5.28, beta: 0.78, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 6.1, tasa_impositiva_pct: 21.0, peso_deuda_pct: 15.0 };
export const terminal = { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 12.0 };
export const etapa2 = { usar: false, anios: 10, margen_final_pct: null };

export const casos = [
  // Bajista: el margen bruto de Behring no se recupera (perdió 7,5 puntos de FY19 a FY26), los anti-FcRn quitan Ig en la CIDP
  // y los precios de nación más favorecida se extienden: 2 puntos menos de crecimiento y 3 de margen cada año.
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -3.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.5, multiplo_salida: null, perfil: [] },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
  // Alcista: Horizon 2 aprobado a tiempo y coste por litro a la baja: margen bruto de Behring hacia el 55 %, ventas +1,5 puntos (Ig y ANDEMBRY).
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 2.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
];

export const pesos = { dcf: 55, comparables: 10, transacciones: 0, suma_partes: 10, escenarios: 25 };

if (process.argv[1] && process.argv[1].endsWith('supuestos.mjs')) { console.table(anios); }
