// Objetivo a 12 meses (corte 27-nov-2026; regla v3 con tope ×1,1 y selector; historia ADELANTADA, base de BPA ajustada en historia y casos).
// BPA de los escenarios: ventas y margen operativo de supuestos.mjs (sin cambios frente al 21-oct); gastos financieros netos de −776,5 M
// (intereses de 2026e anualizados), impuesto del 15 % y 4.167 M de acciones (4.106,3 M en circulación a 30-sep según el 10-Q + 60,7 M de dilución).
export const objetivo_12m = {
  ejercicio: '2028e',
  base_bpa: 'ajustado',
  casos: [
    { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: 3.50, multiplo: null, precio: null, justificacion: 'Bajista del informe: publicidad que no despega (≈ 2.700 M en 2026, por debajo de los 3.000 M guiados en enero) y menos subidas de precio; crecimiento 4 puntos y margen 4 puntos por debajo del base desde 2027e: ventas de 2028e de 57.689 M y EBIT de 17.941 M; menos 776,5 M de intereses, impuesto del 15 %, 4.167 M de acciones: 3,50 USD.' },
    { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: 4.29, multiplo: null, precio: null, justificacion: 'Caso base del DCF: ventas de 2026e en la guía de 51.100 M y margen del 31,5 % (32,3 % de EBITDA), 2027e al +10,5 % con margen del 34,3 %; 2028e con ventas de 62.114 M y EBIT de 21.802 M; menos 776,5 M de intereses, impuesto del 15 % y 4.167 M de acciones: 4,29 USD (sin cambios frente al 21-oct). La fórmula cuadra con el BPA de 2025 sin el gasto de Brasil (2,62 ajustado; 2,53 publicado).' },
    { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: 4.94, multiplo: null, precio: null, justificacion: 'La publicidad dobla en 2027 y el apalancamiento operativo sigue: crecimiento 3 puntos y margen 3 puntos por encima del base, ventas de 2028e de 65.541 M y EBIT de 24.971 M: 4,94 USD.' },
  ],
  per_historico: {
    base: 'adelantado', base_bpa: 'ajustado', actual: 16.1, mediana_5a: 30.3, minimo_5a: 24.6, media_larga: 42.5, anios: 5,
    excluidos: 'Historia ADELANTADA en base AJUSTADA (precio de cierre de cada año ÷ BPA del año siguiente sin partidas no recurrentes, como los casos): 2018 64,8x; 2019 53,2x; 2020 48,1x; 2021 60,5x; 2022 24,6x; 2023 24,6x; 2024 34,0x (89,13 ÷ BPA de 2025 de 2,62 sin los ≈495 M del impuesto indirecto de Brasil de años anteriores, 2,53 publicado); 2025 30,3x (93,76 ÷ BPA de 2026e de 3,09 sin la comisión de ruptura de Warner de 2.800 M, estimación propia con la guía del 20-oct). Los BPA de 2019-2024 no llevan partidas no recurrentes materiales: publicado = ajustado. 2016 y 2017 fuera por PER ≥ 80x de una empresa que aún quemaba caja. Mediana y mínimo de 2021-2025; media larga de 2018-2025. Actual: 59,41 USD (cierre del 25-nov) ÷ BPA base de 2027e (3,70) = 16,1x.',
    v2: { actual: 16.1, mediana_5a: 40.6, minimo_5a: 29.6, media_larga: 38.1, base: 'cierre' },
  },
  comparables_per: { mediana: 23.4 },
  consenso: {
    bpa_ano1: 3.765, bpa_ano2: 4.487, objetivo_medio: 84.55, objetivo_min: 57, objetivo_max: 126, analistas: 43, tendencia_3m: 'recortes',
    fuente: 'Yahoo Finance (BPA 2027e y objetivos de 43 analistas, 27-nov) y MarketScreener (BPA 2028e, 28-oct) [D57, D50]; solo contraste.',
  },
  diferencia_consenso: 'Nuestro BPA base de 2027e (3,70) queda un 1,7 % por debajo del consenso de Yahoo del 27-nov (3,765, igual que el 28-oct) y el de 2028e (4,29) un 4,4 % por debajo del de MarketScreener (4,487): suponemos menos publicidad (2.700 M en 2026 y crecimiento del 40-50 % después) y un margen operativo de 2028e del 35,1 % frente al ≈ 35,0 % de EBIT que implica MarketScreener sobre más ventas (62.249 M). Nuestro precio base a 12 meses (69,07 USD con la v2 que elige el selector) queda un 18,3 % por debajo del objetivo medio de 84,55 USD de 43 analistas, que apenas se mueve desde el 28-oct (84,76): la diferencia es de múltiplo (16,1 veces frente a ≈ 19-20 veces que implican los analistas), no de beneficio.',
  comentario: 'Con el precio en 59,41 USD el PER adelantado baja a 16,1 veces y la mediana de cinco años (30,3 veces) pasa a ser 1,88 veces el actual: el selector la trata como desrateada y decide la v2, que no supone ninguna vuelta del múltiplo (base = PER de hoy). El objetivo a 12 meses es de 70,63 USD (+18,9 % ponderado, +16,3 % el base) y sale solo del crecimiento del BPA hasta 2028e. Con la v3 (tope ×1,1) serían +31,0 % y +27,8 %. El objetivo queda un 9 % por encima del valor real (64,79 USD): la distancia la cierra el crecimiento del BPA si la guía de 2027 de enero confirma un +10 %. La compra no es robusta: con un BPA un 10 % peor la ponderada baja al 7,0 %.',
};
