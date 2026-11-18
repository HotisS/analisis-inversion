// Objetivo a 12 meses (regla v3 común; corte 2026-11-18). BPA propio de 2028e de la proyección del DCF con los desplazamientos
// de los escenarios: ventas × margen EBITDA − amortización (2,4 %) + resultado financiero recurrente (≈ 2,5 M: intereses de la
// caja menos los de los arrendamientos; 2,2 M en los últimos doce meses) − impuestos (32,5 %), entre 15,906 M acciones (sin
// recompras ni dilución relevante). Cuadre con 2025: (68,1 + 3,8) × 0,675 / 15,906 = 3,05 frente a 3,04 publicado.
// Base de BPA: publicado (ATOSS no publica BPA ajustado; sin no recurrentes) en los casos y en la historia del PER.
export const objetivo_12m = {
  ejercicio: '2028e',
  base_bpa: 'publicado',
  casos: [
    { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: 3.62, multiplo: null, precio: null,
      justificacion: 'Crecimiento 4 puntos menor en 2027e-2028e (7,5 % y 7 %: altas planas y más bajas por la IA de las suites) y margen EBITDA 3 puntos menor (36,5 % en 2028e, el de 2025 menos dos puntos) por precio y gasto comercial: ventas de 242 M EUR y BPA de 3,62 EUR.' },
    { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: 4.21, multiplo: null, precio: null,
      justificacion: 'La guía de 2027 en su parte baja (235 M EUR) y un 11 % en 2028e (261 M), con margen EBITDA del 39,5 % (EBIT ≈ 37 %, el guiado para 2026): beneficio neto de 67 M EUR y BPA de 4,21 EUR, un 3,6 % por debajo del consenso de MarketScreener anterior al 3T.' },
    { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: 4.57, multiplo: null, precio: null,
      justificacion: 'La nube mantiene el 25 % y el New ACV se acelera: 2,5 puntos más de crecimiento (14 % y 13,5 %, 273 M EUR en 2028e) y margen EBITDA del 41 % (EBIT ≈ 38,6 %, camino del más del 40 % que apunta el CFO): BPA de 4,57 EUR.' },
  ],
  per_historico: {
    base: 'adelantado', base_bpa: 'publicado', actual: 22.1, mediana_5a: 36.5, minimo_5a: 30.9, media_larga: 43.5, anios: 5,
    excluidos: 'Historia ADELANTADA (precio de cierre de cada año ÷ BPA publicado del año siguiente): 2016 22,3x; 2017 26,3x; 2018 23,1x; 2019 32,2x; 2020 65,0x; 2021 88,9x; 2022 30,9x; 2023 36,5x; 2024 37,6x; 2025 33,9x (115,40 EUR ÷ 3,40, nuestro BPA de 2026e, ejercicio en curso). Sin años de pérdidas, PER ≥ 150x ni atípicos (ninguno pasa de 3 veces la mediana del resto). Mediana y mínimo de 2021-2025; media larga de 2018-2025. Actual: 82,90 EUR ÷ 3,75 (nuestro BPA de 2027e).',
    v2: { actual: 22.1, mediana_5a: 46.4, minimo_5a: 38.0, media_larga: 38.1, base: 'cierre' },
  },
  comparables_per: { mediana: 19.3 },
  consenso: { bpa_ano1: 3.82, bpa_ano2: 4.37, objetivo_medio: 120.33, objetivo_min: 96.0, objetivo_max: 153.0, analistas: 9, tendencia_3m: 'estables', fuente: 'Yahoo Finance, 18-nov-2026 (BPA 2027e y objetivos, 9 analistas) [D35]; BPA 2028e de MarketScreener, 16-oct-2026 [D1]' },
  diferencia_consenso: 'Nuestro BPA base de 2028e (4,21 EUR) queda un 3,7 % por debajo del de MarketScreener (4,37, anterior al 3T) y nuestro precio base (102,30 EUR) un 15,0 % por debajo del objetivo medio de los analistas (120,33). La diferencia de BPA viene de las ventas: suponemos la parte baja de la guía de 2027 (235 M frente a 243 M del consenso previo) y un 11 % en 2028e; el margen es algo mayor que el del consenso tras la subida de la guía. La del precio, del múltiplo: la regla aplica 24,3 veces, el PER de hoy con el tope de ×1,1, mientras los analistas valoran por DCF con primas de riesgo más bajas [D35, D39].',
  media: 107.48,
  comentario: 'El valor intrínseco (82,29 EUR) queda un 22,5 % por debajo del objetivo ponderado a 12 meses (106,18 EUR). La distancia la explica el múltiplo: el objetivo supone que el mercado paga en un año 24,3 veces el BPA de 2028e, con el PER adelantado de hoy (22,1x) muy por debajo de su mediana de cinco años (36,5x), mientras el DCF con nuestro WACC del 9,70 % equivale a unas 19-20 veces. Para cerrarla hace falta que el miedo a la IA ceda (resultados de 2026 y guía del nuevo CEO a finales de enero) o que el mercado acepte una prima de riesgo como la de hoy (con ella, el valor intrínseco sería 93,50 EUR).',
};
