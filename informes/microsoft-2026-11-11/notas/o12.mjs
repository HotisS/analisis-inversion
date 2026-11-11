// Objetivo a 12 meses: BPA propio FY2028e (proyección del DCF con los desplazamientos de los escenarios) y PER adelantado.
export const objetivo_12m = {
  ejercicio: 'FY2028e', base_bpa: 'ajustado',
  casos: [
    { escenario: 'Bajista', metrica: 'PER FY2028e', beneficio_por_accion: 19.70, multiplo: null, precio: null, justificacion: 'Ventas de 440.765 M (+15,5 % y +15 %: Azure frena con la capacidad y OpenAI recorta compras), margen EBITDA del 59,5 % y la misma amortización que el base (78.882 M: capex ya hecho y arrendamientos firmados). Impuestos del 20 %, resultado financiero nulo, 7.446,2 M de acciones.' },
    { escenario: 'Base', metrica: 'PER FY2028e', beneficio_por_accion: 22.68, multiplo: null, precio: null, justificacion: 'Ventas de 464.010 M (+18,5 % y +18 %), margen EBITDA del 62,5 %, amortización del 17 % de las ventas (78.882 M), EBIT de 211.125 M, impuestos del 20 %, sin resultado financiero ni OpenAI, 7.446,2 M de acciones. Cuadre: con este criterio el BPA de FY2026 sería 16,68 frente a 17,28 ajustado por la empresa.' },
    { escenario: 'Alcista', metrica: 'PER FY2028e', beneficio_por_accion: 24.23, multiplo: null, precio: null, justificacion: 'Ventas de 479.839 M (+20,5 % y +20 %: Azure sigue por encima del 45 % y Copilot se generaliza), margen EBITDA del 64 % y amortización del 17 % de las ventas. EBIT de 225.524 M.' },
  ],
  per_historico: {
    base: 'adelantado', base_bpa: 'ajustado', actual: 26.3, mediana_5a: 28.5, minimo_5a: 18.4, media_larga: 26.3, anios: 5,
    excluidos: 'Historia adelantada: precio de cierre de cada ejercicio (30 de junio) ÷ BPA del ejercicio siguiente, ajustado sin OpenAI en FY2024-FY2026 (11,95, 14,13 y 17,28 USD, los de la empresa) y, para el cierre de FY2026, nuestro BPA de FY2027e (20,28): FY2017 32,4x; FY2018 19,5x; FY2019 23,3x; FY2020 25,3x; FY2021 28,1x; FY2022 26,5x; FY2023 28,5x; FY2024 31,6x; FY2025 28,8x; FY2026 18,4x (cierre de 373,02, cerca del mínimo de junio). Ninguno excluido. Mediana y mínimo de FY2022-FY2026; media larga de FY2019-FY2026.',
  },
  comparables_per: { mediana: 19.25 },
};
