// Textos de mercado, sostenibilidad y objetivo a 12 meses (Olympus, corte 2026-10-19).
export const mercado = {
  sostenibilidad: {
    puente_ingresos: [
      { periodo: 'FY2027e', volumen_pct: 2.5, precio_pct: 0.5, otros_pct: 3,
        comentario: 'La aspiración de la empresa a tipo constante es del 3 % en FY2027 [A10]; el resto es divisa: la guía (+4,4 % a +6,5 %) usa 155 JPY/USD y el 1T creció un 16,4 % publicado frente a un 5 % a tipo constante [A11, A9]. Reparto entre volumen (vuelta de los productos retenidos, EVIS X1) y precio (China a la baja), estimación propia. La carta de la FDA del 7-oct no limita ventas [D36].' },
      { periodo: 'FY2028e', volumen_pct: 3, precio_pct: 1, otros_pct: 0,
        comentario: 'Aspiración del 4 % a tipo constante [A10]: renovación de la base instalada con EVIS X1 [B7]; precio positivo fuera de China (estimación propia).' },
      { periodo: 'FY2029e', volumen_pct: 3.5, precio_pct: 1, otros_pct: 0,
        comentario: 'Aspiración del 5 % a tipo constante [A10]; dejamos un 4,5 % por la presión de la compra centralizada en China [B5] y por si la remediación de la FDA retrasa lanzamientos.' },
    ],
    mercado_final: null,
    veredicto: 'En parte',
    justificacion: 'En parte. El foso sostiene el crecimiento: en torno al 70 % de los endoscopios GI del mundo, con costes de cambio altos (procesador, endoscopios, reprocesado y servicio forman un sistema) [B7], y un 3,7 % anual de media, apenas por encima del 3,4 % del mercado [B26], así que la cuota casi no se mueve (prueba a mano: la cuota publicada es de un segmento y el mercado final va en blanco). Con el ROIC de FY2025 (15,1 %), la reinversión financia un 3,3 % anual y el precio aporta el resto; con el de FY2026 (7,9 %), solo un 1,7 %: el crecimiento depende de que el margen vuelva. La carta de la FDA del 7-oct a seis plantas añade riesgo a esa vuelta [D36]: por eso el margen final se queda en el 22,7 % de FY2025 y la subida se retrasa medio año.',
  },

  j12: {
    Bajista: 'Crecimiento 1,5 puntos menor y margen 3 puntos menor que el base en todos los años: la FDA convierte la carta del 7-oct en un decreto de consentimiento o en nuevas alertas, y China sigue sustituyendo importaciones. Ventas de 1.115.037 M y EBIT de 141.610 M en FY2029e: BPA de 89,0 JPY.',
    Base: 'La proyección del DCF: ventas de 1.164.307 M en FY2029e (+4,5 % anual desde FY2026) y margen EBITDA del 22,2 %, medio año más tarde que en el informe del 9-oct por la remediación de la FDA. EBIT de 182.796 M, resultado financiero de −6.500 M y −3.700 M de Swan: BPA de 116,9 JPY.',
    Alcista: 'Un punto más de crecimiento y dos de margen: la FDA acepta la respuesta, vuelven los productos retenidos y SIS deja de perder dinero. Ventas de 1.197.947 M y EBIT de 212.037 M en FY2029e: BPA de 136,7 JPY.',
  },

  per_excluidos: 'Historia ADELANTADA (precio de cierre de marzo de cada año ÷ BPA real del ejercicio siguiente, la misma base que el PER actual, 1.685 ÷ 106,3 = 15,9x): FY2021 2.291 ÷ 90,17 = 25,4x; FY2022 2.339 ÷ 113,08 = 20,7x; FY2024 2.215,5 ÷ 102,80 = 21,6x; FY2026 1.488,5 ÷ 94,0 (nuestro BPA de FY2027e) = 15,8x. Se excluyen FY2023 (2.318,5 ÷ BPA de FY2024: 199,44 con la plusvalía de Evident, 27,14 normalizado tras la retirada de Veran; ninguno mide el negocio) y FY2025 (1.947,5 ÷ 61,20 = 31,8x: BPA de FY2026 hundido por el programa de plantilla, los aranceles y las retenciones de la FDA). Mediana y mínimo de los cierres de FY2022-FY2026 (20,7x y 15,8x) y media de los cuatro años (20,9x). Historia al cierre (v2, precio ÷ BPA del mismo año, sin FY2024 ni FY2026): 25,9x, 20,5x y 18,9x [D5, A1].',

  bolsa_comentario: 'Olympus ha rentado un −7,0 % anual en cinco años frente al +17,7 % del TOPIX y el −2,9 % del ETF de tecnología médica de EE. UU. (IHI) [D5]: el castigo es de la empresa y, en parte, del sector, pero en Tokio el diferencial es de casi 25 puntos al año. La caída máxima, del 57,7 %, va del 12-sep-2022 al 13-mar-2026 (mínimo de 52 semanas, 1.302,5 JPY) [D5], con las cartas de advertencia de 2022-2023, la alerta de importación de junio de 2025 y los aranceles. Desde marzo subió hasta 2.210,5 JPY el 20-ago, tras un primer trimestre con ventas +16,4 % [A11], y en octubre devolvió buena parte: −13,5 % el 14-oct por la nueva carta de la FDA, la mayor caída diaria desde 2011 [D36, D37], hasta 1.685 JPY el 19-oct. La beta mensual de cinco años frente al TOPIX (0,57) es baja, pero la volatilidad de un año (44,4 %) es la de un valor con riesgo propio, no la de un defensivo [D5].',

  contexto: {
    movimiento: { fecha: '2026-10-16', var_1m_pct: -14.2, var_3m_pct: -4.8, var_6m_pct: 6.4, var_12m_pct: -8.6, dist_max_52s_pct: -22.7, dist_min_52s_pct: 29.0, dist_max_historico_pct: -46.8, tendencia: 'lateral', volatilidad_60d_pct: 44, avisos: [] },
    movimientos_fuertes: [
      { periodo: 'oct-2026', var_pct: -16.4, causa: 'Del cierre de septiembre (2.014,5 JPY) al 19-oct (1.685): carta de advertencia de la FDA del 7-oct a seis plantas, publicada el 13-oct tras el cierre, −13,5 % el 14-oct con 13,4 M de acciones (tres veces el volumen medio), y rebaja de Nomura de Comprar a Neutral (objetivo 2.700 → 1.900 JPY) el 15-oct [D36, D37, D34, D5].', veredicto: 'no cambia', condicion: null },
      { periodo: 'ago-2026', var_pct: 15.7, causa: 'Resultados del 1T FY2027 (7-ago): ventas +16,4 % y beneficio operativo ajustado de 30.676 M, más del doble; Jefferies sube el objetivo de 2.300 a 3.300 JPY el 27-ago [A11, D7].', veredicto: 'no cambia', condicion: null },
      { periodo: 'may-2026', var_pct: 15.5, causa: 'Resultados de FY2026 y guía de recuperación de FY2027 (12-may) y recompra de 60.000 M JPY por ToSTNeT-3 el 13-may [A10, D3].', veredicto: 'no cambia', condicion: null },
      { periodo: 'feb-2026', var_pct: -17.0, causa: 'Rebaja de la guía de beneficio operativo de FY2026 por las retenciones de la FDA y los aranceles en los resultados del 3T (13-feb): −5,2 % el 13-feb y −12,9 % el 16-feb [A13, D5].', veredicto: 'no cambia', condicion: null },
      { periodo: 'nov-2025', var_pct: 10.6, causa: 'Coincide con los resultados del 2T FY2026 (7-nov-2025) [A14, D5]; no hay otro hecho relevante publicado ese mes.', veredicto: 'no cambia', condicion: null },
    ],
    noticias: [
      { fecha: '2026-10-15', tipo: 'recomendación', hecho: 'Nomura rebaja Olympus de Comprar a Neutral y el objetivo de 2.700 a 1.900 JPY; el objetivo medio de 14 analistas baja de 2.184,62 a 2.123,08 JPY (4 comprar, 9 mantener, 1 vender) [D34, D7, D8].', veredicto: 'no cambia', condicion: null },
      { fecha: '2026-10-13', tipo: 'demanda o regulador', hecho: 'Carta de advertencia de la FDA (7-oct) a Olympus Medical Systems (Hachioji e Hinode), Aomori, Shirakawa, Olympus Winter & Ibe (Hamburgo) y Gyrus ACMI (Brooklyn Park): respuestas insuficientes a los formularios 483 de finales de 2025. No limita producción ni ventas ni las solicitudes 510(k); respuesta en 15 días hábiles (hacia el 4-nov); sin impacto previsto en resultados. Jefferies: los problemas son sistémicos y su resolución llevará años [D36, D37, D41].', veredicto: 'no cambia', condicion: 'La recogemos en el bajista (30 %) y en el margen; pasaría a «descarta» si la FDA anuncia un decreto de consentimiento, nuevas alertas de importación o una restricción de ventas.' },
      { fecha: '2026-10-07', tipo: 'accionista de referencia', hecho: 'Sin colocaciones ni accionistas de control: el último informe mensual de recompra en EDINET confirma que la de mayo (38.948.300 acciones, 59.999,85 M JPY) terminó; no hay recompra nueva en marcha [D39, D3].', veredicto: 'no cambia', condicion: null },
      { fecha: '2026-09-29', tipo: 'directivos', hecho: 'Dimisión por salud del consejero independiente Hiroshi Ishino; el consejo queda con 9 independientes de 10 [C7]. Japón no tiene registro público de operaciones de directivos.', veredicto: 'no cambia', condicion: null },
      { fecha: '2026-09-03', tipo: 'demanda o regulador', hecho: 'Nuevas demandas en EE. UU. por infecciones tras CPRE con duodenoscopios reutilizables (julio y septiembre) y retiradas de agujas de endoscopia (enero) y de ShockPulse (marzo) [D42].', veredicto: 'no cambia', condicion: null },
      { fecha: '2026-05-26', tipo: 'fusión u oferta', hecho: 'Compra de BioProtect (espaciador de balón para radioterapia de próstata) por unos 270 M USD, cerrada el 2-jun [A12, A17].', veredicto: 'no cambia', condicion: null },
      { fecha: '2026-11-10', tipo: 'resultados', hecho: 'Resultados del 2T FY2027 (abril-septiembre) el 10-nov-2026 [D35].', veredicto: 'no cambia', condicion: null },
    ],
    proximos_resultados: '2026-11-10',
    veredicto: 'no cambia',
    condicion: null,
    comentario: 'La acción cae un 16,4 % desde el cierre de septiembre por un hecho regulatorio concreto (la carta de la FDA del 7-oct) y una rebaja de Nomura, no por un deterioro de ventas: el 1T creció un 16,4 % y la guía sigue en pie. La carta no es un hecho pendiente con fecha que pueda mover más de un 5 % en contra por sí solo: su efecto ya está en el precio (−13,5 % en un día) y el informe la recoge en el margen y en la probabilidad del bajista. Los resultados del 10-nov no retrasan (regla 11). El veredicto global es «no cambia»; pasaría a «descarta» con un decreto de consentimiento o una restricción de ventas. Tendencia lateral (5,3 % por debajo de la media de 200 sesiones), sin avisos P1-P5 [P5].',
  },

  diferencia_consenso: 'Nuestro BPA base de FY2029e (116,9 JPY) queda un 6,3 % por debajo del consenso (124,8 JPY, 14 analistas, sin cambios desde el 9-oct) por tres motivos: el resultado financiero tras la recompra con deuda (−6.500 M), las pérdidas de Swan EndoSurgical (−3.700 M) y medio año más de remediación de la FDA en el margen, que el consenso aún no ha incorporado. El precio base a 12 meses queda cerca del objetivo medio de los analistas (2.123,08 JPY, con recortes tras la carta: Nomura a 1.900). No acercamos la cifra.',


};
