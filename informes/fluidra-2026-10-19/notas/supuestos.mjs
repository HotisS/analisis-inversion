// Supuestos del DCF de Fluidra (corte 2026-10-19), en millones de EUR.
// Base: EBITDA reportado NIIF de 2025 (472 M; 21,6 %). Los costes de reestructuración, M&A e integración y la
// remuneración en acciones se repiten todos los años (56 M en 2024, 29 M en 2025, 50-55 M previstos en 2026):
// el margen del DCF los descuenta (≈ 2,4 puntos en 2026, 1,5 en 2027, 1,2 en 2028 y 1,0 después).
// Capex con las altas de derechos de uso (pagos de arrendamientos ≈ 2,2 % de ventas) porque los arrendamientos van en la deuda.
const fila = (periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas, fijo = false) => ({
  periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas,
  nwc_pct_ventas: 21.5, tasa_impositiva_pct: 25.5, fijo,
});

export const anios = [
  fila('2026e', 3.5, 21.2, 7.4, 5.5, true),
  fila('2027e', 4.5, 22.3, 7.2, 5.5),
  fila('2028e', 5.0, 23.0, 7.0, 5.5),
  fila('2029e', 5.0, 23.4, 6.6, 5.5),
  fila('2030e', 4.5, 23.5, 6.2, 5.5),
  fila('2031e', 4.0, 23.5, 5.8, 5.5),
  fila('2032e', 3.5, 23.5, 5.6, 5.5),
  fila('2033e', 3.0, 23.5, 5.4, 5.5),
];

export const wacc = {
  tasa_libre_pct: 3.49, beta: 1.10, prima_mercado_pct: 5.5, prima_adicional_pct: 0,
  coste_deuda_pct: 5.7, tasa_impositiva_pct: 25.5, peso_deuda_pct: 26,
};

export const terminal = { metodo: 'gordon', crecimiento_pct: 2.25, multiplo_salida: 9.5 };

export const pesos = { dcf: 50, comparables: 25, transacciones: 0, suma_partes: 0, escenarios: 25 };

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
    { periodo: '2026e', volumen_pct: 2.5, precio_pct: 3, otros_pct: -2,
      comentario: 'Lo publicado en el semestre: volumen +2 % y precio +3 % en el 1S26, y precio +2 % y volumen +3 % en el 2T26; la guía es del +3 % al +7 % a tipo constante y la divisa resta unos dos puntos (4,9 % a tipo constante frente a 2,6 % publicado) [A2, A3, A7].' },
    { periodo: '2027e', volumen_pct: 2.5, precio_pct: 2, otros_pct: 0,
      comentario: 'Volumen de reposición y mantenimiento (65 % de las ventas) sobre una base instalada que crece; la obra nueva solo deja de caer. Precio del 2 %, por debajo del 3 % del 1S26, por la fatiga de precios tras las subidas de la pospandemia [A1, A3, A7]. Reparto propio.' },
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

// Objetivo a 12 meses (regla común del motor). BPA propio de 2028e = el de la proyección del informe con los desplazamientos de
// los escenarios (detalle en revision-12m-2026-10-19.md): sin cambios frente al 8-oct porque no cambian supuestos ni acciones (187,8 M).
supuestos.valoracion.objetivo_12m = {
  ejercicio: '2028e',
  casos: [
    { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: 0.92, multiplo: null, precio: null,
      justificacion: 'Ventas de 2.200 M con el perfil del bajista (−5,5 % en 2027e y +3 % en 2028e) y margen EBITDA del 21 %; EBIT de 299 M, financiero −63 M, impuestos del 25,5 % y 3 M de minoritarios: 173 M ÷ 187,8 M de acciones. Es una repetición de 2023 con un año de retraso.' },
    { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: 1.31, multiplo: null, precio: null,
      justificacion: 'Ventas de 2.480 M (+3,5 %, +4,5 % y +5 % en 2026e-2028e) y margen EBITDA reportado del 23 % (unos 24 % ajustados); EBIT de 397 M, financiero −63 M, impuestos del 25,5 % y 3 M de minoritarios: 246 M ÷ 187,8 M de acciones.' },
    { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: 1.45, multiplo: null, precio: null,
      justificacion: 'Ventas de 2.551 M (1,5 puntos más de crecimiento al año desde 2027e) y un punto más de margen (24 % reportado, el objetivo de más del 25 % ajustado de la empresa); beneficio de 273 M ÷ 187,8 M de acciones.' },
  ],
  per_historico: {
    base: 'adelantado', actual: 15.3, mediana_5a: 24.2, minimo_5a: 15.9, media_larga: 23.0,
    excluidos: 'Historia ADELANTADA (precio de cierre de cada año ÷ BPA real del año siguiente; para el cierre de 2025, nuestro BPA de 2026e, 0,97): 2020 15,9x (20,95/1,32); 2022 24,2x (14,52/0,60); 2023 25,8x (18,85/0,73); 2024 25,3x (23,52/0,93); 2025 23,9x (23,16/0,97). Se excluye 2021 (41,4x = 35,20/0,85): cierre de la burbuja pospandemia, con el precio en máximos históricos y el BPA siguiente hundido por el desestocaje. Sin BPA anterior a 2021 en el informe. Actual = 17,61 ÷ 1,15 (BPA propio de 2027e).',
    v2: { actual: 15.3, mediana_5a: 26.7, minimo_5a: 17.1, media_larga: 21.0, base: 'cierre' },
  },
  comparables_per: { mediana: 15.5 },
  consenso: { bpa_ano1: 1.27, bpa_ano2: 1.49, objetivo_medio: 25.93, objetivo_min: 19, objetivo_max: 31, analistas: 15, tendencia_3m: 'estables', fuente: 'MarketScreener, consenso a 19-oct-2026 (BPA contable de 2027e y 2028e) [D7, D8]' },
  diferencia_consenso: 'Nuestro BPA base de 2028e (1,31 EUR) queda un 12 % por debajo del consenso (1,49 EUR) y nuestro precio base (22,01 EUR) un 15,1 % por debajo del objetivo medio de los analistas (25,93 EUR) [D7, D8]. Las ventas casi coinciden (2.480 frente a 2.505 M, −1 %); la diferencia está en el margen: el consenso pone un EBIT de 453,8 M (18,1 % de las ventas) y nosotros 397 M (16,0 %), porque proyectamos el EBITDA reportado con la reestructuración recurrente y la amortización de la compra de Zodiac, que el consenso trata como no recurrentes. No lo acercamos: los costes se repiten cada año desde 2023. El resto de la distancia es el múltiplo: la regla limita el base a 16,8 veces.',
  media: 22.45,
  comentario: 'Valor intrínseco de 22,48 EUR (+27,7 %) frente a un objetivo a 12 meses ponderado de 21,32 EUR (+24,7 % con el dividendo; base +28,7 %): la distancia es del 5 %, menor del 25 %, así que la tesis cabe en 12 meses. El cierre depende de que el mercado deje de descontar el valle: unos resultados de nueve meses (29-oct) y una guía de 2027 (febrero) que confirmen el crecimiento del volumen en Norteamérica.',
};
