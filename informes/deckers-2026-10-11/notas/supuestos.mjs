// Supuestos del DCF y de los escenarios (Deckers, corte 2026-10-11). Millones de USD; ejercicio a 31 de marzo, etiqueta «fin».
// Base: FY2026 real (ventas 5.472 M; EBITDA 1.338,7 M, margen 24,5 %; EBIT 1.262,9 M, 23,1 %).
// FY2027e: guía del 23-jul-2026: ventas 5.860-5.910 M (+7,1-8,0 %), margen operativo algo mejor que 21,5 % (aranceles a año completo),
// tipo del 23 %. Consenso (MarketScreener): 5.881 M y EBITDA 1.364 M (23,2 %). Solo hay un trimestre publicado: no es año fijo.
// FY2028e-FY2029e: consenso +7,3 % y +7,3 %, margen EBITDA 23,2 %; marco de la empresa FY2028-FY2030: un dígito alto, margen
// operativo «en la zona baja del 20 %». Base algo por debajo del consenso desde FY2029e por el frenazo de HOKA (+7,7 % en 1T27).
// Capex: guía FY2027 145-155 M (incluye implantación en la nube); consenso 146-155 M. Amortización 1,4 % de las ventas, converge al 1,9 %.
// Circulante comercial (existencias + clientes − proveedores) a marzo: 7,7 % de las ventas en FY2026.

export const modelo = [
  //  periodo     crec  margen amort capex  nwc  tasa  fijo
  ['FY2027e', 7.5, 23.1, 1.4, 2.5, 8.0, 23.0, false],
  ['FY2028e', 7.0, 23.2, 1.5, 2.4, 8.0, 23.0, false],
  ['FY2029e', 6.5, 23.2, 1.6, 2.3, 8.0, 23.0, false],
  ['FY2030e', 6.0, 23.0, 1.7, 2.2, 8.0, 23.0, false],
  ['FY2031e', 5.0, 23.0, 1.8, 2.1, 8.0, 23.0, false],
  ['FY2032e', 4.5, 23.0, 1.9, 2.0, 8.0, 23.0, false],
  ['FY2033e', 4.0, 23.0, 1.9, 2.0, 8.0, 23.0, false],
  ['FY2034e', 3.5, 23.0, 1.9, 2.0, 8.0, 23.0, false],
];

export const anios = modelo.map(([periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas, nwc_pct_ventas, tasa_impositiva_pct, fijo]) => ({
  periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas, nwc_pct_ventas, tasa_impositiva_pct, fijo,
}));

// Tasa libre: Tesoro de EE. UU. a 10 años del 9-oct-2026, 5,24 % [D11]. Beta ajustada (Blume) mensual a 5 años frente al SPY, 1,07 [D10];
// Damodaran (calzado) 1,00 desapalancada corregida por caja [D14]. Sin deuda financiera: peso de la deuda 0.
export const wacc = { tasa_libre_pct: 5.24, beta: 1.07, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 6.0, tasa_impositiva_pct: 23.0, peso_deuda_pct: 0 };
export const terminal = { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 10.0 };
export const etapa2 = { usar: false, anios: 10, margen_final_pct: null };

export const casos = [
  // Bajista: HOKA deja de crecer como le pasó a Crocs con HEYDUDE o a Nike en FY2025, UGG pasa de moda y los aranceles quedan:
  // ventas planas siete años y cuatro puntos menos de margen (el EBIT volvería al 16-18 % de FY2019-FY2022).
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -5.5, ajuste_margen_pp: -4.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.5, multiplo_salida: null, perfil: [] },
  { escenario: 'Base', probabilidad_pct: 55, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
  // Alcista: HOKA vuelve al +15 % internacional, se cobran los aranceles y el margen recupera el 24,5 % de FY2026.
  { escenario: 'Alcista', probabilidad_pct: 20, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
];

export const pesos = { dcf: 55, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 25 };

export const referencia_mercado = { mercado: 'S&P 500 (prima implícita mensual de Damodaran, T12m con payout sostenible)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx, octubre de 2026 [D13]' };
