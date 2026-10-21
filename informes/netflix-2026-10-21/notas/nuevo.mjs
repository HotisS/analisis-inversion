// Objetivo a 12 meses tras el 3T26 (regla v3 con tope ×1,1 y selector; historia ADELANTADA). Citas: [A14] = fuente 14 de A.json; [D31] = fuente 31 de D.json.
// BPA de los escenarios: ventas y margen operativo de supuestos.mjs; gastos financieros netos de −776,5 M (intereses de 2026e anualizados), impuesto del 15 %
// y 4.170 M de acciones (estimación propia a 30-sep tras la recompra récord del 3T: 63,9 M de acciones).
export const objetivo_12m = {
  ejercicio: '2028e',
  casos: [
    { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: 3.50, multiplo: null, precio: null, justificacion: 'Bajista del informe tras el 3T26: publicidad que no despega (≈ 2.700 M en 2026, por debajo de los 3.000 M guiados en enero) y menos subidas de precio; crecimiento y margen por debajo del base desde 2027e. Menos 776,5 M de intereses, impuesto del 15 %, 4.170 M de acciones: 3,50 USD.' },
    { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: 4.29, multiplo: null, precio: null, justificacion: 'Caso base del DCF tras el 3T26: ventas de 2026e en la guía de 51.100 M y margen del 31,5 % (32,3 % sin la compra puntual de contenidos ligada a la reestructuración), 2027e al +10,5 % (antes +11,0 %) y margen del 34,3 %; 2028e con ventas de 62.112 M y EBIT de 21.801 M; menos 776,5 M de intereses, impuesto del 15 % y 4.170 M de acciones: 4,29 USD (antes 4,27). La fórmula cuadra con el BPA de 2025 sin partidas (2,53 publicado).' },
    { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: 4.93, multiplo: null, precio: null, justificacion: 'La publicidad dobla en 2027 y el apalancamiento operativo sigue (margen del 37-38 % en 2028e): 4,93 USD.' },
  ],
  per_historico: {
    base: 'adelantado', actual: 18.6, mediana_5a: 30.3, minimo_5a: 24.6, media_larga: 42.7, anios: 5,
    excluidos: 'Historia ADELANTADA (precio de cierre de cada año ÷ BPA real del año siguiente, como el PER actual): 2018 64,8x; 2019 53,2x; 2020 48,1x; 2021 60,5x; 2022 24,6x; 2023 24,6x; 2024 35,2x; 2025 30,3x (cierre de 93,76 ÷ BPA de 2026e de 3,09 sin la comisión de ruptura de Warner de 2.800 M, estimación propia con la guía del 20-oct). 2016 y 2017 fuera por PER ≥ 80x de una empresa que aún quemaba caja. Mediana y mínimo de 2021-2025; media larga de 2018-2025. Actual: 68,69 USD (cierre del 20-oct) ÷ BPA base de 2027e (3,70) = 18,6x.',
    v2: { actual: 18.6, mediana_5a: 40.6, minimo_5a: 29.6, media_larga: 38.1, base: 'cierre' },
  },
  comparables_per: { mediana: 24.1 },
  consenso: {
    bpa_ano1: 3.79, bpa_ano2: 4.544, objetivo_medio: 91.39, objetivo_min: 57, objetivo_max: 126, analistas: 52, tendencia_3m: 'recortes',
    fuente: 'Consenso de D del 21-oct (objetivo medio de 52 analistas, antes de que publiquen las revisiones tras el 3T26) [D]; solo contraste.',
  },
  diferencia_consenso: 'Nuestro BPA base de 2028e (4,29) queda un 5,6 % por debajo del consenso (4,544): suponemos menos publicidad (2.700 M en 2026 y crecimiento del 40-50 % después) y un margen de 2028e del 35,1 % frente al ≈ 36 % que implica el consenso. El objetivo medio de los analistas (91,39) todavía no recoge los recortes que vendrán tras la guía del 4T.',
  comentario: null,
};
