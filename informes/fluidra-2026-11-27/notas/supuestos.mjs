// Supuestos del DCF de Fluidra (corte 2026-11-27, tras los nueve meses de 2026), en millones de EUR.
// Base: EBITDA reportado NIIF de 2025 (472 M; 21,6 %). Los costes de reestructuración, M&A e integración y la
// remuneración en acciones se repiten todos los años (56 M en 2024, 29 M en 2025, 50-55 M previstos en 2026):
// el margen del DCF los descuenta (≈ 2,4 puntos en 2026, 1,5 en 2027, 1,2 en 2028 y 1,0 después).
// Capex con las altas de derechos de uso (pagos de arrendamientos ≈ 2,2 % de ventas) porque los arrendamientos van en la deuda.
const fila = (periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas, fijo = false) => ({
  periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas,
  nwc_pct_ventas: 21.5, tasa_impositiva_pct: 25.5, fijo,
});

export const anios = [
  fila('2026e', 3.5, 21.0, 7.4, 5.5, true),
  fila('2027e', 4.5, 22.0, 7.2, 5.5),
  fila('2028e', 5.0, 22.7, 7.0, 5.5),
  fila('2029e', 5.0, 23.2, 6.6, 5.5),
  fila('2030e', 4.5, 23.5, 6.2, 5.5),
  fila('2031e', 4.0, 23.5, 5.8, 5.5),
  fila('2032e', 3.5, 23.5, 5.6, 5.5),
  fila('2033e', 3.0, 23.5, 5.4, 5.5),
];

export const wacc = {
  tasa_libre_pct: 3.30, beta: 1.10, prima_mercado_pct: 5.5, prima_adicional_pct: 0,
  coste_deuda_pct: 5.7, tasa_impositiva_pct: 25.5, peso_deuda_pct: 25,
};

export const terminal = { metodo: 'gordon', crecimiento_pct: 2.25, multiplo_salida: 9.5 };

export const pesos = { dcf: 60, comparables: 15, transacciones: 0, suma_partes: 0, escenarios: 25 };

export const supuestos = {
  dcf: {
    anios, wacc, terminal,
    etapa2: { usar: false, anios: 8, margen_final_pct: null, justificacion: null },
    mitad_de_anio: true,
  },
  valoracion: { pesos },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [] },
  escenarios: {
    casos: [
      { escenario: 'Bajista', probabilidad_pct: 30, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -2.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.0, multiplo_salida: null,
        perfil: [{ periodo: '2027e', crecimiento_pp: -10, margen_pp: -2.5 }], narrativa: null },
      { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [], narrativa: null },
      { escenario: 'Alcista', probabilidad_pct: 20, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.5, multiplo_salida: null, perfil: [], narrativa: null },
    ],
  },
};

// Prueba de sostenibilidad (metodología del 10-oct; misma proyección que la v2 del 8-oct: no hay datos nuevos que la muevan).
supuestos.dcf.sostenibilidad = {
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 1.5, precio_pct: 2, otros_pct: 0,
      comentario: 'Lo publicado en nueve meses: precio +2 %, volumen +1 %, compras +1 % y divisa −1 % (ventas +3,3 % publicadas y +4,3 % a tipo constante); la guía estrechada es del +3,5 % al +5,5 % a tipo constante y el cuarto trimestre suma algo más de volumen y la subida de precios de pretemporada [A13, A14].' },
    { periodo: '2027e', volumen_pct: 2, precio_pct: 2.5, otros_pct: 0,
      comentario: 'Precio: subidas ya anunciadas del 3,5-5 % en EE. UU. (41 % de las ventas) y del 2 % en Europa para la temporada de 2027 [A14]; el 2,5 % supone que parte se pierde en mezcla y descuentos. Volumen de reposición (65 % de las ventas) sobre una base instalada que crece y Hydrapro desde el 1T27; la obra nueva solo deja de caer [A1, A14]. Reparto propio.' },
    { periodo: '2028e', volumen_pct: 3, precio_pct: 2, otros_pct: 0,
      comentario: 'Algo de recuperación de la obra nueva desde mínimos y subidas de precio ordinarias; el consenso da +4,9 % [D7]. Reparto propio.' },
    { periodo: '2029e', volumen_pct: 3, precio_pct: 2, otros_pct: 0,
      comentario: 'En línea con el mercado: +4-6 % según Fluidra y +4,6-4,7 % según dos estudios [B2, B24, B25]. Reparto propio.' },
    { periodo: '2030e', volumen_pct: 2.5, precio_pct: 2, otros_pct: 0,
      comentario: 'Empieza la convergencia hacia el 3 % de 2033e: menos volumen, precio en línea con la inflación y el cambio a equipos de más valor (bombas de velocidad variable, automatización) [A1]. Reparto propio.' },
  ],
  mercado_final: { periodo: '2033e', tamano: 25700 },
  veredicto: 'Sí',
  justificacion: 'Sí: la proyección (4,1 % anual en 2026e-2033e) pide menos que el mercado (4-6 % según Fluidra y 4,6-4,7 % según dos estudios [B2, B24, B25]) y menos que el objetivo de la empresa (6-8 % [A3]); la cuota baja del 12,6 % al 11,7 % en 2033e (mercado final de 25.700 M = 17.400 M de 2025 al 5 % anual [B1]). El poder de precios está demostrado (+5 % en Norteamérica en 2025, +3 % en el 1S26 [A3, A6]) y suponemos solo un 2 %. La reinversión neta sale casi nula porque la amortización incluye 57 M de intangibles de Zodiac, que no hay que reponer; el capex bruto (5,5 % con arrendamientos) mantiene el de 2021-2025. El ciclo (−14 % en 2023) va en el bajista. El histórico plano que mide el motor (0,0 % anual en 2021-2025) arranca en el pico pospandemia; desde 2020 los ingresos crecieron un 9 % anual hasta 2024 [A12].',
};

// Objetivo a 12 meses (regla común del motor). BPA propio de 2028e = el de la proyección del informe (calc.dcf.proyeccion) con los
// desplazamientos de los escenarios: EBIT − 63 M de financiero, 25,5 % de impuestos, 3 M de minoritarios, ÷ 187,8 M de acciones.
// Detalle en revision-12m-2026-11-27.md. Base del BPA: PUBLICADO (contable) en historia y en casos.
supuestos.valoracion.objetivo_12m = {
  ejercicio: '2028e',
  base_bpa: 'publicado',
  casos: [
    { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: 0.89, multiplo: null, precio: null,
      justificacion: 'Desestocaje de 2023 repetido en 2027e: ventas −5,5 % ese año y +3 % en 2028e (2.200 M), margen EBITDA reportado del 19,5 % y del 20,7 %; amortización que no baja de los 163 M de 2025; EBIT de 292 M, financiero −63 M, impuestos del 25,5 % y 3 M de minoritarios: 168 M ÷ 187,8 M de acciones.' },
    { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: 1.28, multiplo: null, precio: null,
      justificacion: 'Ventas de 2.480 M (+3,5 %, +4,5 % y +5 % en 2026e-2028e) y margen EBITDA reportado del 22,7 % (tres décimas menos que en octubre por la guía recortada y la reestructuración que sigue alta); EBIT de 389 M, financiero −63 M, impuestos del 25,5 % y 3 M de minoritarios: 240 M ÷ 187,8 M de acciones.' },
    { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: 1.42, multiplo: null, precio: null,
      justificacion: 'Ventas de 2.551 M (1,5 puntos más de crecimiento al año desde 2027e, con la obra nueva de EE. UU. volviendo desde mínimos) y un punto más de margen (23,7 % reportado); EBIT de 426 M y beneficio de 267 M ÷ 187,8 M de acciones.' },
  ],
  per_historico: {
    base: 'adelantado', base_bpa: 'publicado', actual: 16.7, mediana_5a: 24.9, minimo_5a: 15.9, media_larga: 23.2,
    excluidos: 'Historia ADELANTADA en BPA publicado (precio de cierre de cada año ÷ BPA real del año siguiente; para el cierre de 2025, nuestro BPA de 2026e, 0,93): 2020 15,9x (20,95/1,32); 2022 24,2x (14,52/0,60); 2023 25,8x (18,85/0,73); 2024 25,3x (23,52/0,93); 2025 24,9x (23,16/0,93). Se excluye 2021 (41,4x = 35,20/0,85): cierre de la burbuja pospandemia, con el precio en máximos históricos y el BPA siguiente hundido por el desestocaje. Sin BPA anterior a 2021 en el informe. Actual = 18,70 ÷ 1,12 (BPA propio de 2027e).',
    v2: { actual: 16.7, mediana_5a: 26.7, minimo_5a: 17.1, media_larga: 21.0, base: 'cierre' },
  },
  comparables_per: { mediana: 18.4 },
  consenso: { bpa_ano1: 1.28, bpa_ano2: 1.51, objetivo_medio: 25.93, objetivo_min: 19, objetivo_max: 31, analistas: 15, tendencia_3m: 'estables', fuente: 'MarketScreener (BPA contable de 2027e y 2028e, 27-nov-2026) y Yahoo Finance (objetivo medio, mínimo y máximo, 15 analistas, 27-nov-2026) [D7, D8]' },
  diferencia_consenso: 'Nuestro BPA base de 2028e (1,28 EUR) queda un 15 % por debajo del consenso contable de MarketScreener (1,51 EUR) [D7]. Las ventas coinciden (2.480 frente a 2.516 M, −1 %); la diferencia es el margen: el consenso pone un EBIT de 457,5 M (18,2 % de las ventas) y nosotros 389 M (15,7 %), porque proyectamos el EBITDA reportado con la reestructuración recurrente (45 M en nueve meses de 2026) y la amortización de la compra de Zodiac, que el consenso trata como no recurrentes. No lo acercamos: estos costes se repiten cada año desde 2023 y en 2026 se han más que doblado. El objetivo medio de los analistas (25,93 EUR, sin cambios desde octubre) queda entre nuestro base y nuestro alcista [D8].',
  media: 23.95,
  comentario: 'Valor intrínseco de 24,59 EUR (+31,5 %) frente a un objetivo a 12 meses ponderado de 22,74 EUR (+25,1 % con el dividendo; base +29,4 %): la distancia es del 8 %, menor del 25 %, así que la tesis cabe en 12 meses. El cierre depende de la guía de 2027 (finales de febrero): que confirme menos reestructuración y la subida de precios ya anunciada, y que el mercado reduzca el descuento frente a los rivales de EE. UU., que se ha ensanchado tras su revalorización de octubre-noviembre.',
};
