// BPA propio FY2028e por escenario (GBP, publicado y diluido). Fórmula: (EBIT del DCF − resultado financiero) × (1 − 25 %) ÷ 917 M de acciones
// (905,4 M con voto a 28-ago-2026 + 12 M de dilución; sin recompras no anunciadas). Cuadre con FY2025: (530 − 46) × 0,762 ÷ 993 = 0,3716.
export default {
  per_actual: 21.4, // 10,73 ÷ 0,501 (BPA propio FY2027e: (683 − 70) × 0,75 ÷ 917)
  per_min: 25.4,
  per_media: 28.4,
  casos_12m: [
    { escenario: 'Bajista', metrica: 'PER FY2028e', beneficio_por_accion: 0.456, multiplo: null, precio: null, justificacion: 'La IA y los bancos abaratan la contabilidad de las pequeñas empresas: el crecimiento baja al 5 % en FY2027 y al 4,5 % en FY2028 y el margen EBITDA queda 2,5 puntos por debajo del base (24,1 %) porque las subidas de precio dejan de pasar. Ventas de 3.027 M, EBIT de 633 M y 75 M de gasto financiero.' },
    { escenario: 'Base', metrica: 'PER FY2028e', beneficio_por_accion: 0.568, multiplo: null, precio: null, justificacion: 'Crecimiento del 9 % y del 8,5 % en FY2027-FY2028 (ARR +11 % y guía de más del 9 %), margen EBITDA publicado del 26,6 % (+1,9 puntos sobre FY2025, la mitad de lo que pide el consenso) y 70 M de gasto financiero. Ventas de 3.263 M y EBIT de 764 M.' },
    { escenario: 'Alcista', metrica: 'PER FY2028e', beneficio_por_accion: 0.614, multiplo: null, precio: null, justificacion: 'Intacct y los agentes de IA cobrados como módulos sostienen el 10-10,5 % de crecimiento y el margen sube un punto más (27,6 %): ventas de 3.354 M, EBIT de 818 M. Es lo que ya espera el consenso (60,5 peniques).' },
  ],
  per_excluidos: 'Historia adelantada: precio de cierre de cada ejercicio (30 de septiembre) ÷ BPA diluido publicado del ejercicio siguiente [D1, A1, A5-A8]: FY2021 7,096 / 0,2517 = 28,2x; FY2022 6,972 / 0,237 (FY2023 normalizado sin 44 M de reestructuración de oficinas) = 29,4x; FY2023 9,89 / 0,3155 = 31,3x; FY2024 10,245 / 0,3716 = 27,6x; FY2025 11,00 / 0,433 (nuestro FY2026e) = 25,4x. Media larga con FY2016 (7,38 / 0,2378 = 31,0x) y FY2017 (6,985 / 0,2707 = 25,8x). Excluidos FY2018-FY2020: el BPA de FY2019 no está en los documentos leídos y los de FY2020 y FY2021 llevan plusvalías de desinversiones (141 M y 126 M). Actual = 10,73 / 0,501 (nuestro FY2027e) = 21,4x.',
};
