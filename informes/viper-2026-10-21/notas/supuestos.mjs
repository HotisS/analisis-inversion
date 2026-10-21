// Supuestos del DCF, escenarios y pesos de Viper Energy (corte 2026-10-21). Ejercicio natural; millones de USD.
// VALOR POR UNIDAD ECONÓMICA: el DCF valora OpCo entera (100 % de los flujos, con impuesto completo) y divide entre las
// 369,7 M de unidades (acciones A + OpCo Units con acción B + opción de TWR IV): una acción A vale una OpCo Unit después de
// impuestos [A4, D7]. Minoritarios del puente = 0 por eso.
//
// PETRÓLEO (lo que manda): caso base = curva de futuros del WTI del 21-oct-2026 [D4]: dic-26 97,75; ene-27 96,13;
// jun-27 88,19; dic-27 81,62; dic-28 74,53; dic-29 69,76 USD/bbl. Precio realizado de Viper ≈ WTI − 1 a 2 USD
// (98,28 en el 2T26 con WTI ≈ 99,5 [A5]). Medias que usamos: 2026 ≈ 88 (real 1T 72,7 → realizado 73,16; 2T 98,28;
// 3T ≈ 87,3 de Diamondback [B5]; 4T con la curva ≈ 95), 2027 ≈ 88, 2028 ≈ 77, 2029 ≈ 71, 2030 ≈ 69 y +2 % al año después.
// La EIA (STEO de octubre) da 88 USD en 2026 y 80 en 2027 para el WTI [B2]: nuestro 2027 está algo por encima de la EIA y
// en la curva; 2028-2030 convergen a 69-71, el precio de equilibrio de largo plazo de la curva.
// Gas: Waha casi a cero (0,05 USD/Mcf en el 2T26 [A5]) → el gas pesa ≈ 1-3 % de los ingresos; los líquidos ≈ 11 %.
// Ingresos 2026e ≈ 2.523 M: 1T 511 + 2T 677 [A5, A6] + 3T ≈ 637 (68 kbo/d × 87,3 + líquidos y gas) + 4T ≈ 698 (69 kbo/d × 95).
const g = [80.9, 3.0, -11.6, -7.8, -2.8, 1.0, 1.0, 1.0, 1.0, 1.0];
// Margen EBITDA: impuestos de producción (≈ 7 %), gastos generales (0,70-0,90 USD/boe) y poco más [D13]: 92 % con petróleo
// caro, algo menos cuando baja el precio (los gastos fijos por boe pesan más).
const m = [92.0, 91.5, 91.0, 90.5, 90.5, 90.5, 90.5, 90.5, 90.5, 90.5];
// Agotamiento: ≈ 16 USD/boe (guía 14,75-17,25 [D13]) × ≈ 49 MMboe ≈ 785 M en 2026 (31,9 % de los ingresos). En USD es casi
// fijo con el volumen, así que su peso sube cuando baja el precio; después converge al 16 % (lo que cuesta reponer las
// reservas: el capex del terminal).
const am = [31.9, 30.5, 34.4, 36.8, 37.0, 33.0, 28.0, 24.0, 20.0, 16.0];
// «Capex» = compras de derechos para mantener el volumen. Una regalía no paga la perforación: la pagan los operadores
// (106 equipos en sus tierras, 1.798 pozos brutos en desarrollo y 1.589 «a la vista» [P2]). Hasta 2029 ese inventario
// sostiene la producción sin comprar; desde 2030 Viper tiene que comprar derechos (3 % de los ingresos, subiendo al 16 % en
// 2035, igual que la amortización) para que el volumen caiga solo ≈ 1 % al año en el terminal (+2 % de precio).
const cx = [0, 0, 0, 0, 3, 6, 9, 12, 14, 16];
const anios = g.map((x, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: x, margen_ebitda_pct: m[i], amortizacion_pct_ventas: am[i], capex_pct_ventas: cx[i],
  nwc_pct_ventas: 19.5, tasa_impositiva_pct: 28.0, fijo: i === 0,
}));
export default {
  anios,
  wacc: { tasa_libre_pct: 5.12, beta: 0.85, prima_mercado_pct: 5.5, prima_adicional_pct: 0.5, coste_deuda_pct: 5.6, tasa_impositiva_pct: 21.0, peso_deuda_pct: 9 },
  terminal: { metodo: 'gordon', crecimiento_pct: 1.0, multiplo_salida: 8.0 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    // Bajista: paz con Irán y Ormuz abierto, la OPEP+ devuelve su producción y el WTI cae a ≈ 68 USD en 2027, 60 en
    // 2028-2029 y 62 en 2030 (−23 %, −22 %, −15 % y −10 % frente a la curva); el nivel queda un 10 % bajo el base después.
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: 0, ajuste_margen_pp: -1.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 0.5, multiplo_salida: null,
      perfil: [
        { periodo: '2027e', crecimiento_pp: -23.4, margen_pp: -1.0 },
        { periodo: '2028e', crecimiento_pp: 0.0, margen_pp: -1.0 },
        { periodo: '2029e', crecimiento_pp: 7.8, margen_pp: -1.0 },
        { periodo: '2030e', crecimiento_pp: 6.1, margen_pp: -1.0 },
      ] },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    // Alcista: Ormuz sigue cortado buena parte de 2027 y la reposición de inventarios mantiene el WTI en 95 USD en 2027,
    // 90 en 2028, 85 en 2029 y 80 en 2030 (+8 %, +17 %, +20 % y +16 % frente a la curva); después converge al base.
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0.3, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null,
      perfil: [
        { periodo: '2027e', crecimiento_pp: 8.2, margen_pp: 0.3 },
        { periodo: '2028e', crecimiento_pp: 7.3, margen_pp: 0.3 },
        { periodo: '2029e', crecimiento_pp: 2.2, margen_pp: 0.3 },
        { periodo: '2030e', crecimiento_pp: -3.1, margen_pp: 0.3 },
        { periodo: '2031e', crecimiento_pp: -4.0, margen_pp: 0 },
        { periodo: '2032e', crecimiento_pp: -4.0, margen_pp: 0 },
        { periodo: '2033e', crecimiento_pp: -3.6, margen_pp: 0 },
      ] },
  ],
  pesos: { dcf: 45, comparables: 10, transacciones: 0, suma_partes: 0, escenarios: 45 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 41.0, precio_pct: 39.9, otros_pct: 0.0 },
    { periodo: '2027e', volumen_pct: 2.0, precio_pct: 1.0, otros_pct: 0.0 },
    { periodo: '2028e', volumen_pct: 1.5, precio_pct: -13.1, otros_pct: 0.0 },
    { periodo: '2029e', volumen_pct: 0.5, precio_pct: -8.3, otros_pct: 0.0 },
    { periodo: '2030e', volumen_pct: -0.5, precio_pct: -2.3, otros_pct: 0.0 },
  ],
  // Mercado = regalías y derechos mineros de petróleo, gas y líquidos de la cuenca Pérmica (estimación propia [B1, B2]:
  // ≈ 43.000 M USD en 2026 con ≈ 6,6 Mb/d de petróleo, regalía media ≈ 18-20 % y el precio del caso base). En 2030, con
  // el WTI de la curva (69 USD) y +5 % de volumen: ≈ 35.400 M.
  mercado_final: { periodo: '2030e', tamano: 35400 },
};
