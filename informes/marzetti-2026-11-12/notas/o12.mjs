// Objetivo a 12 meses: BPA propio FY2028e (proyección del DCF con los desplazamientos de los escenarios) y PER adelantado.
// Base de BPA: publicado (GAAP, con la amortización de los intangibles de Bachan's y sin no recurrentes).
// Cuadre: con esta fórmula (EBITDA sin no recurrentes − amortización + resultado financiero, impuestos del 23 %) el BPA de FY2026 sería 6,76 USD frente a 6,98 publicado (tipo efectivo del 20,8 %).
export const objetivo_12m = {
  ejercicio: 'FY2028e', base_bpa: 'publicado',
  casos: [
    { escenario: 'Bajista', metrica: 'PER FY2028e', beneficio_por_accion: 5.63, multiplo: null, precio: null, justificacion: 'Ventas de 1.978 M (+1,0 % y +1,5 %: el volumen de Retail sigue cayendo como en FY2026 y Bachan\'s crece menos), margen EBITDA del 14,8 % (1,5 puntos menos: aceite de soja, fletes y precios sin trasladar), amortización del 4,3 % de las ventas, gasto financiero de 8 M, impuestos del 23 % y 27,29 M de acciones.' },
    { escenario: 'Base', metrica: 'PER FY2028e', beneficio_por_accion: 6.77, multiplo: null, precio: null, justificacion: 'Ventas de 2.057 M (+3,0 % en FY2027e con Bachan\'s y +3,5 % en FY2028e), margen EBITDA del 16,3 % (vuelve al nivel de FY2026 cuando pasa el brote), amortización del 4,3 % (88,5 M con los intangibles de Bachan\'s), EBIT de 246,9 M, gasto financiero de 7 M, impuestos del 23 % y 27,29 M de acciones.' },
    { escenario: 'Alcista', metrica: 'PER FY2028e', beneficio_por_accion: 7.52, multiplo: null, precio: null, justificacion: 'Ventas de 2.097 M (+4,0 % y +4,5 %: Bachan\'s supera los 100 M y vuelve el volumen de las licencias), margen EBITDA del 17,3 % (máximo de la década, con la capacidad de Atlanta ya absorbida), EBIT de 272,6 M y gasto financiero de 6 M.' },
  ],
  per_historico: {
    base: 'adelantado', base_bpa: 'publicado', actual: 18.9, mediana_5a: 31.1, minimo_5a: 19.3, media_larga: 28.4, anios: 5,
    excluidos: 'Historia adelantada: precio de cierre de cada ejercicio (30 de junio) ÷ BPA publicado del ejercicio siguiente y, para el cierre de FY2026, nuestro BPA de FY2027e (5,91 USD): FY2017 24,9x; FY2018 25,4x; FY2019 29,9x; FY2020 30,0x; FY2021 excluido (59,5x: el BPA de FY2022, 3,25 USD, se hundió un 37 % por la inflación de costes y 35,2 M de deterioros); FY2022 31,9x; FY2023 34,9x; FY2024 31,1x; FY2025 24,8x; FY2026 19,3x. Mediana y mínimo de FY2022-FY2026; media larga de FY2018-FY2026 sin FY2021 (ocho cierres).',
    v2: { base: 'cierre', actual: 18.9, mediana_5a: 30.65, minimo_5a: 16.4, media_larga: 31.4, excluidos: 'Historia al cierre (precio de cierre ÷ BPA publicado del mismo ejercicio): FY2018 28,1x; FY2019 27,2x; FY2020 31,2x; FY2021 37,5x; FY2022 excluido (39,6x con el BPA atípico de 3,25 USD); FY2023 49,8x; FY2024 32,8x; FY2025 28,5x; FY2026 16,4x. Mediana y mínimo de FY2022-FY2026 sin FY2022; media larga de FY2018-FY2026 sin FY2022.' },
  },
  comparables_per: { mediana: 11.6 },
};
