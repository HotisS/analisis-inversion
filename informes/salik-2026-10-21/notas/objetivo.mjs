// Objetivo a 12 meses de Salik (regla común; el motor pone los múltiplos). Ejercicio 2028e (el primero que cierra más de 18 meses
// después del corte de oct-2026). BPA propio = ventas × margen EBITDA − amortización − resultado financiero − impuesto del 9 %, ÷ 7.500 M.
// Cuadre con el real: 2025 = (3.096,9 × 69,2 % − 144,8 − 292,1) × 0,91 ≈ 1.553 M → 0,2071 (publicado 0,2071).
// Base 2028e: ventas 3.408,5 (2025 × 0,975 × 1,07 × 1,055); EBITDA 68,8 % = 2.345,0; amortización 146,6; financiero −230
// (4.000 M refinanciados al ≈ 5 % + ≈ 45 M de coste del pasivo de las puertas − ≈ 15 M de intereses cobrados); BAI 1.968,5; impuesto 9 %
// → 1.791,3 M → 0,2388. 2027e: 3.230,8 × 68,5 % − 145,4 − 250 → 1.654,1 M → 0,2205. 2026e: 3.019,5 × 68,0 % − 145 − 254 → 1.505,4 M → 0,2007.
// Bajista 2028e: ventas 3.250,0 (−2,5 p.p. en 2027-2028), margen 66,8 %, financiero −235 → 1.629 M → 0,2172.
// Alcista 2028e: ventas 3.505,5 (+1,5 p.p.), margen 69,3 %, financiero −228 → 1.870 M → 0,2493.
// Historia adelantada (cierre ÷ BPA real del año siguiente): 2022 2,58/0,1464 = 17,6; 2023 3,11/0,1553 = 20,0; 2024 5,40/0,2071 = 26,1;
// 2025 6,35/0,2007 (mi 2026e) = 31,6. Mediana 23,05; mínimo 17,6; media 23,8. Actual: 5,14/0,2205 = 23,3.
// Historia v2 (cierre ÷ BPA del mismo año; 2022 fuera: concesión solo desde julio y sin impuesto): 2023 3,11/0,1464 = 21,2;
// 2024 5,40/0,1553 = 34,8; 2025 6,35/0,2071 = 30,7. Mediana 30,7; mínimo 21,2; media 28,9.
export default {
  ejercicio: '2028e',
  casos: [
    { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: 0.2172, multiplo: null, precio: null, justificacion: 'Crecimiento 2,5 puntos menor en 2027-2028e (el tráfico no vuelve del todo tras la guerra con Irán, más metro y teletrabajo, ninguna puerta nueva) y margen EBITDA 2 puntos menor (66,8 %: el contrato de TransCore cuesta un 5-5,5 % de las ventas y los costes fijos pesan más), con la refinanciación de los 4.000 M algo más cara: ventas de 3.250 M y beneficio de 1.629 M en 2028e.' },
    { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: 0.2388, multiplo: null, precio: null, justificacion: 'Ventas −2,5 % en 2026e (guía rebajada: −3 % a 0 %), rebote del tráfico del +7 % en 2027e (base de comparación del 2T26 con −17 % de viajes de pago) y +5,5 % en 2028e con la población, sin subida de tarifas ni puertas nuevas; margen EBITDA del 68,8 %, financiero de −230 M (préstamo refinanciado al ≈ 5 % y coste del pasivo de las puertas) e impuesto del 9 %: ventas de 3.409 M y beneficio de 1.791 M.' },
    { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: 0.2493, multiplo: null, precio: null, justificacion: 'Tráfico de vuelta al nivel previo a la guerra ya en 2027e y alguna mejora de la tarifa variable (más horas punta o puertas nuevas aprobadas por el Consejo Ejecutivo): +1,5 puntos de crecimiento y +0,5 de margen. Ventas de 3.506 M y beneficio de 1.870 M.' },
  ],
  per_historico: {
    base: 'adelantado', actual: 23.3, mediana_5a: 23.05, minimo_5a: 17.6, media_larga: 23.8, anios: 4,
    excluidos: 'Ninguno. Cuatro cierres desde la salida a bolsa (sep-2022), cada uno dividido por el BPA real del año siguiente: 2022 (2,58 ÷ 0,1464 = 17,6x), 2023 (3,11 ÷ 0,1553 = 20,0x), 2024 (5,40 ÷ 0,2071 = 26,1x) y 2025 (6,35 ÷ nuestro BPA de 2026e, 0,2007 = 31,6x). El de 2025 está inflado por el salto de 2025 (tarifa variable y puertas nuevas) y el de 2022 recoge el primer año como cotizada.',
    v2: { base: 'cierre', mediana_5a: 30.7, minimo_5a: 21.2, media_larga: 28.9, anios: 3 },
  },
  comparables_per: { mediana: 17.2 },
  consenso: { bpa_ano1: 0.199, bpa_ano2: 0.2292, objetivo_medio: 6.19, objetivo_min: 5.10, objetivo_max: 6.90, analistas: 12, tendencia_3m: 'estables', fuente: 'MarketScreener (BPA y objetivo medio de 12 analistas) y Yahoo Finance (horquilla: 6 comprar y 6 mantener), 21-oct-2026 [D2, D3]' },
  diferencia_consenso: 'Nuestro BPA de 2026e (0,2007) coincide con el consenso (0,199); el de 2027e (0,2205) queda un 4 % por debajo (0,2292) y el de 2028e (0,2388), un 6 % por debajo (0,2542) [D2]. La diferencia está en las ventas: el consenso espera 3.229 M en 2027e y 3.426 M en 2028e (+8 % y +6 %), casi lo mismo que nosotros (3.231 y 3.409 M), pero un margen neto del 53-55 % frente a nuestro 51-53 %: suponemos que la refinanciación de los 4.000 M (vence en jun-2027) sale al ≈ 5 % y que el pasivo de las puertas nuevas sigue costando intereses, y no descontamos ninguna subida de tarifa. El objetivo medio (6,19 AED) equivale a 27 veces el BPA de 2027e del consenso.',
  media: null,
};
