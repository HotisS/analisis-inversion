// valoracion.objetivo_12m (regla v3). BPA de bpa-fanuc.mjs; historia adelantada con BPA publicado (misma base: la
// fórmula del BPA propio reproduce el de FY2025, 178,46 frente a 178,47 publicado).
const just = (e) => `BPA propio de FY2028e (${e}): proyección del informe con los desplazamientos de sus escenarios; resultado no operativo, impuestos (29,5 % sin participadas), minoritarios (1,8 %) y 924,914 M de acciones con las reglas que cuadran FY2025. Detalle en revision-12m-2026-10-26.md.`;
export const objetivo_12m = {
  ejercicio: 'FY2028e',
  casos: [
    { escenario: 'Bajista', metrica: 'PER FY2028e', beneficio_por_accion: 161.25, multiplo: null, precio: null, justificacion: just('bajista; resultado no operativo de FY2023, 39.836 M') },
    { escenario: 'Base', metrica: 'PER FY2028e', beneficio_por_accion: 250.9, multiplo: null, precio: null, justificacion: just('base; resultado no operativo de los últimos 12 meses, ≈54.000 M') },
    { escenario: 'Alcista', metrica: 'PER FY2028e', beneficio_por_accion: 284.37, multiplo: null, precio: null, justificacion: just('alcista; mismo resultado no operativo que el base') },
  ],
  per_historico: {
    base: 'adelantado', actual: 22.8, mediana_5a: 26.6, minimo_5a: 22.7, media_larga: 31.6, anios: 5,
    excluidos: 'Historia ADELANTADA (precio de cierre de marzo de cada ejercicio ÷ BPA publicado del ejercicio siguiente, como el PER actual = 5.639 ÷ BPA propio de FY2027e, 247,53): FY2015 26,5x (3.497 ÷ 131,73); FY2016 24,3x; FY2017 33,9x; FY2018 49,4x; FY2019 29,9x; FY2020 32,3x; FY2021 24,2x; FY2022 33,9x; FY2023 26,6x; FY2024 22,7x (4.060 ÷ 178,47). El cierre de marzo de 2026 (5.302) no entra: su BPA del año siguiente (FY2026) aún no es real. Sin años de pérdidas, PER ≥ 150x ni atípicos; mediana y mínimo de FY2020-FY2024, media larga de FY2017-FY2024 (8 años). Misma base: el BPA propio sale de la fórmula que reproduce el BPA publicado de FY2025 (178,46 frente a 178,47), sin ajustes ni partidas excluidas; crecimiento implícito de FY2025 a FY2027e del 17,8 % anual, dentro del rango de control. Historia al cierre (v2): precio de cierre ÷ BPA del mismo ejercicio, FY2016-FY2025, sin FY2019 (38,4x, BPA de suelo) ni FY2020 (53,4x, BPA deprimido y rebote con tipos a cero).',
    v2: { actual: 22.8, mediana_5a: 26.7, minimo_5a: 25.8, media_larga: 27.1, base: 'cierre' },
  },
  comparables_per: { mediana: 20.1 },
  consenso: { bpa_ano1: 237.9, bpa_ano2: 255.8, objetivo_medio: 7256.7, objetivo_min: 4900, objetivo_max: 8700, analistas: 19, tendencia_3m: 'recortes', fuente: 'MarketScreener (estimaciones sin actualizar tras los resultados del 23-oct) e Investing (objetivo medio, 19 analistas), consultados el 26-oct-2026 [D4, D5]' },
  diferencia_consenso: 'Nuestro BPA base de FY2028e (250,90) queda un 1,9 % por debajo del consenso (255,80), y el de FY2027e (247,53) un 4,0 % por encima (237,9): el consenso es anterior a la guía del 23-oct y no la recoge. La diferencia está en el múltiplo: nuestro precio base (6.172,14) queda un 14,9 % por debajo del objetivo medio de los analistas (7.256,7), que equivale a 28,4x su BPA de FY2028e frente a nuestros 24,6x. Detalle en revision-12m-2026-10-26.md.',
  comentario: 'Valor intrínseco 4.085,99 (−27,5 %) frente al objetivo a 12 meses ponderado 6.126,75 (+10,9 % con dividendo; base +11,7 %). La distancia pasa del 25 %: a un año manda la vuelta del PER (22,8x) hacia su mediana adelantada (26,6x); la tesis del valor intrínseco, que cobra la tasa y la inversión de todo el ciclo, es a más de un año.',
};
