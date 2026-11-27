// Objetivo a 12 meses (regla v3 con selector): BPA propio 2028e de los tres escenarios y PER histórico adelantado.
// Base del BPA: PUBLICADO (GAAP diluido) en la historia y en los casos.
// BPA 2028e = (EBIT de la proyección − resultado financiero recurrente) × (1 − 23 %) ÷ 393 M de acciones
// (392,8 M diluidas de hoy, sin recompras no anunciadas). Resultado financiero 2028e: −60 M (intereses de
// 2.955 M de bonos al ~5 % menos rendimiento de la caja tras pagar UIG). Se cuadra con 2025: EBIT 1.829,7 −
// 87,8 de financiero, impuestos 409,1 → 1.332,8 M y 3,41 USD [A1].
export const objetivo_12m = {
  ejercicio: '2028e',
  base_bpa: 'publicado',
  casos: [
    { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: 5.08, multiplo: null, precio: null,
      justificacion: 'Pausa de un año en la inversión de los hiperescaladores en 2028 (−35 puntos de crecimiento y −5 de margen sobre el base, además del −1,5 uniforme): ventas de 2028e de ≈ 15.340 M y margen EBITDA del 20,1 %, como el bache de 2022 en margen y el de 2009 en ventas.' },
    { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: 10.36, multiplo: null, precio: null,
      justificacion: 'Ventas de 22.473 M en 2028e (+30 % en 2027 y +18 % en 2028, un 6 % por debajo del consenso) y margen EBITDA GAAP del 26,6 %: EBIT de ≈ 5.350 M, impuestos del 23 % y 393 M de acciones.' },
    { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: 12.18, multiplo: null, precio: null,
      justificacion: 'El ciclo sigue sin pausa: +35 % en 2027 y +23 % en 2028 (24.330 M, por encima del consenso) y margen EBITDA del 28,6 % por escala y precio; EBIT de ≈ 6.276 M.' },
  ],
  per_historico: {
    base: 'adelantado', base_bpa: 'publicado', actual: 20.4, mediana_5a: 33.3, minimo_5a: 25.8, media_larga: 38.3, anios: 4,
    excluidos: 'Historia adelantada con BPA GAAP diluido (cierre de cada año ÷ BPA real del año siguiente; para el cierre de 2025, el BPA GAAP de 2026e de la guía, 6,29, con tres trimestres publicados): 2020 56,6x (18,67 ÷ 0,33); 2021 fuera, pérdidas en 2022 (−0,04); 2022 11,5x (13,66 ÷ 1,19) fuera por atípico (menos de un tercio de la mediana del resto, 35,4x, con cinco años válidos); 2023 37,5x (48,03 ÷ 1,28); 2024 33,3x (113,61 ÷ 3,41); 2025 25,8x (162,01 ÷ 6,29). Mediana y mínimo de los últimos cinco años (2021-2025 sin 2021 ni 2022: 2023-2025) y media larga de 2020 y 2023-2025. 2018 y 2019, pérdidas (SPAC).',
    v2: { base: 'cierre', actual: 20.4, mediana_5a: 61.6, minimo_5a: 40.4, media_larga: 63.1 },
  },
  comparables_per: { mediana: 18.5 },
  consenso: { bpa_ano1: 7.19, bpa_ano2: 9.91, objetivo_medio: 326.89, objetivo_min: 200, objetivo_max: 416, analistas: 32, tendencia_3m: 'estables', fuente: 'Yahoo Finance, quoteSummary del 27-nov-2026 (BPA ajustado) [D42]; MarketScreener 2028e 11,95 [D43]' },
  diferencia_consenso: 'Nuestro BPA base de 2028e (10,36 USD, GAAP) queda un 13,3 % por debajo del de MarketScreener (11,95, base mixta) [D43], y nuestro precio base (232,06) un 29,0 % por debajo del objetivo medio de los analistas (326,89) [D42]. La diferencia de BPA tiene tres partes: base (el GAAP lleva ≈ 0,55-0,60 USD por acción de amortización de intangibles y la contraprestación contingente que el ajustado excluye), ventas (22.472 M frente a 23.911 M, −6 %) y margen (26,6 % frente al 27,4 % ajustado). La del precio es sobre todo de múltiplo: la regla da 22,4x, el PER de hoy con el tope de ×1,1, y los objetivos de los analistas suponen ≈ 30x. No acercamos la cifra.',
  media: null,
  comentario: 'El objetivo a 12 meses (231,15 USD, +33,5 %) queda un 44 % por encima del valor intrínseco (160,48): la regla de múltiplos parte del PER de hoy (≈ 20x nuestro BPA de 2027e) y deja que el BPA crezca, mientras el DCF descuenta al 11,13 % una desaceleración hasta el 4 % en 2035. Para que el precio converja al objetivo basta con que el BPA de 2028e se cumpla y el múltiplo no siga bajando; para que el valor intrínseco suba hacia el precio haría falta que la inversión en IA dure más (el alcista vale 287,60). El BPA base crece un 45 % anual desde 2025 (3,41) porque 2026 ya está casi cerrado en ≈ 6,29 USD GAAP con tres trimestres publicados [A28]; desde 2026e el crecimiento es del 28 % anual. Señal de la regla: Mantener, porque el valor intrínseco queda por debajo del precio aunque la rentabilidad a 12 meses pase del 15 %.',
};
