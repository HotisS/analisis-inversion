// Supuestos del DCF y de los escenarios (Diageo, corte 2026-10-12). Millones de USD; ejercicio a 30 de junio, nombrado por el año en que termina.
// Base: FY2026 real (ventas 19.643 M; EBITDA antes de excepcionales y sin asociadas 6.432 M = 32,7 %; amortización 749 M = 3,8 %).
// FY2027e: guía del CMD: ventas orgánicas planas, beneficio operativo orgánico +bajo-medio dígito; EABL sale del perímetro hacia dic-2026
// (EV 4.800 M a 4,82x ventas → ≈ 1.000 M de ventas, ≈ 5 % del grupo): medio año fuera en FY2027e y el otro medio en FY2028e.
// Consenso (MarketScreener): ventas 19.152 / 19.384 / 19.880; EBITDA sin asociadas ≈ 32,6 % / 33,7 % / 34,1 %.
// Capex: guía de ≈ 1.250 M al año FY27-FY29 (≈ 6,5 % de las ventas) más las altas de derechos de uso (≈ 0,6 %, NIIF 16).
// Circulante: 37,6 % de las ventas en FY2026 (24,4 % en FY2022); se mantiene en importe al salir EABL (su circulante va en el precio de venta) y luego en el 38,6 %, por las existencias en envejecimiento (8.510 M): cada dólar de ventas nuevas inmoviliza ≈ 37 céntimos.

export const modelo = [
  //  periodo     crec   margen  amort  capex  nwc   tasa
  ['FY2027e', -2.5, 32.8, 3.9, 7.0, 38.5, 24.0],
  ['FY2028e', -0.5, 33.5, 3.9, 7.0, 38.6, 24.0],
  ['FY2029e', 2.5, 34.0, 4.0, 6.8, 38.6, 24.0],
  ['FY2030e', 3.0, 34.3, 4.0, 6.5, 38.6, 24.0],
  ['FY2031e', 3.5, 34.5, 4.0, 6.2, 38.6, 24.0],
  ['FY2032e', 3.5, 34.5, 4.1, 6.0, 38.6, 24.0],
  ['FY2033e', 3.5, 34.5, 4.1, 5.8, 38.6, 24.0],
  ['FY2034e', 3.0, 34.5, 4.2, 5.6, 38.6, 24.0],
  ['FY2035e', 3.0, 34.5, 4.2, 5.5, 38.6, 24.0],
  ['FY2036e', 2.75, 34.5, 4.2, 5.4, 38.6, 24.0],
];

export const anios = modelo.map(([periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas, nwc_pct_ventas, tasa_impositiva_pct]) => ({
  periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas, nwc_pct_ventas, tasa_impositiva_pct, fijo: false,
}));

// Tasa libre: Tesoro de EE. UU. a 10 años (FRED DGS10, 8-oct-2026: 5,22 %), porque los flujos van en USD.
// Beta ajustada (Blume) 0,77 del ADR DEO frente al MSCI ACWI, mensual a 5 años (bruta 0,65; DGE.L × GBPUSD 0,61-0,70).
// Coste de la deuda: el marginal en USD (Tesoro + ≈ 0,7 puntos de diferencial de un A-), no el 3,9 % medio histórico.
// Peso de la deuda: deuda neta ≈ 20.500 M frente a ≈ 49.400 M de capitalización → ≈ 29 %.
export const wacc = { tasa_libre_pct: 5.22, beta: 0.77, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.9, tasa_impositiva_pct: 24.0, peso_deuda_pct: 29.0 };
export const terminal = { metodo: 'media', crecimiento_pct: 2.5, multiplo_salida: 11.0 };
export const etapa2 = { usar: false, anios: 10, margen_final_pct: null, justificacion: null };

export const dcf = { anios, wacc, terminal, etapa2, mitad_de_anio: true };

export const sostenibilidad = {
  puente_ingresos: [
    { periodo: 'FY2027e', volumen_pct: -0.5, precio_pct: 0.5, otros_pct: -2.5, comentario: 'Guía de ventas orgánicas planas (Norteamérica −medio dígito, mercado de EE. UU. −3 %) [A13]; medio año sin EABL (≈ −2,5 puntos) [D25].' },
    { periodo: 'FY2028e', volumen_pct: 0.5, precio_pct: 1.5, otros_pct: -2.5, comentario: 'Algoritmo del CMD: ventas orgánicas +1,5 % [A13]; el otro medio año sin EABL (−2,5 puntos).' },
    { periodo: 'FY2029e', volumen_pct: 1.0, precio_pct: 1.5, otros_pct: 0.0, comentario: 'Salida del plan en +2,5-3 % orgánico [A13]; precio/mezcla en la mitad de lo que dio entre FY2022 y FY2025 por la premiumización más lenta [A1, A3].' },
    { periodo: 'FY2030e', volumen_pct: 1.0, precio_pct: 2.0, otros_pct: 0.0, comentario: 'Volumen como el mercado de espirituosos (IWSR, 1-3 % en valor a largo plazo) [B20] y precio en línea con la inflación del dólar.' },
  ],
  // Cuota implícita (estimación propia): la cuota del 4,7 % de IWSR [B7] es sobre el valor de venta al público; para compararla con las ventas netas,
  // el mercado equivalente en FY2026 es 19.643 / 4,7 % ≈ 418.000 M, que crece al 2,0 % anual previsto para el sector hasta FY2036e ≈ 509.500 M.
  mercado_final: { periodo: 'FY2036e', tamano: 509500 },
};

export const casos = [
  // Bajista: la caída del consumo de destilados en EE. UU. (−9 % de volumen en FY2026) se hace estructural (GLP-1, moderación, cannabis)
  // y el precio/mezcla sigue negativo; los ahorros se reinvierten para defender cuota y el margen vuelve al 31-32 % de FY2025.
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -2.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.0, multiplo_salida: 9.0, perfil: [] },
  { escenario: 'Base', probabilidad_pct: 55, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
  // Alcista: Norteamérica vuelve a crecer en FY2029, el tequila se estabiliza y el ahorro de ≈ 1.000 M cae en parte al margen (35-36 %, como FY2021-FY2022).
  { escenario: 'Alcista', probabilidad_pct: 20, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: 13.0, perfil: [] },
];

// Puente a 30-jun-2026 (D5). Cambios sobre la nota D:
// minoritarios: United Spirits a valor de mercado (42,79 % de 10.006 M = 4.282 M) + el resto a valor contable (1.328 M, incluye EABL, Shui Jing Fang y Ketel One) [D31, A2].
// otros_ajustes: + c.800 M de caja de reestructuración pendiente después de impuestos (≈ 850 M en FY2027, fuera del EBITDA antes de excepcionales)
//                − 2.300 M de producto neto de EABL − c.665 M de RCB (el desapalancamiento de c.0,1x que da la empresa) = −2.165 M.
// asociadas: valor contable (5.284 M, de ellos Moët Hennessy 5.107 M): entre el múltiplo de beneficio normalizado (≈ 4.700 M) y la opción de venta (cota ≈ 7.300 M).
export const puente = { minoritarios: 5610, otros_ajustes: -2165 };

export const referencia_mercado = { mercado: 'S&P 500 (prima implícita de Damodaran, aplicable a mercados desarrollados)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx, ERP (T12m with sustainable payout) [D14]' };

export const suma_partes = { aplica: false, descuento_holding_pct: 0, partes: [] };

export const pesos = { dcf: 50, comparables: 25, transacciones: 5, suma_partes: 0, escenarios: 20 };
