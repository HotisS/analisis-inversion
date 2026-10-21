// Bloques nuevos de la iteración del 19-oct-2026, puestos al día el 21-oct con el 3T26 (DSV): sostenibilidad (metodología del 10-oct, antes en
// actualizacion-v2.mjs del informe anterior), objetivo a 12 meses con la regla v3 y su historia adelantada,
// precio y noticias (regla 13, sección 16) y riesgo de IA (obligatorio desde el 15-oct).
// Citas con la letra de la nota: [A2] = fuente 2 de A.json; [E10] = fuente 10 de E.json.

export const sostenibilidad = {
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: -1.0, precio_pct: 6.0, otros_pct: 19.6, comentario: 'Crecimiento comprado: Schenker consolida doce meses frente a ocho en 2025; con los ingresos proforma de 2025 (293.368 M) el crecimiento es de un 5 % [A1, A15]. En el 3T26 los ingresos crecen un 10,5 % a tipo constante con volúmenes del −3 % en mar y en aire: es precio, fletes más caros por Oriente Medio y el combustible que se repercuten sin margen (el margen bruto solo sube un 2,3 %) [A15, B17]. Reparto: estimación propia.' },
    { periodo: '2027e', volumen_pct: 0.5, precio_pct: -3.1, otros_pct: 0, comentario: 'Volumen por debajo del mercado (Ti: +2,9 % marítimo y +1,6 % aéreo al año hasta 2030) [B12], porque DSV pierde cuota en el 3T26 (−3 % en TEU y en toneladas con el mercado al alza) [A15, B17]; los fletes se normalizan tras Oriente Medio (WCI de 4.485 USD por contenedor de 40 pies el 15-oct) y bajan los ingresos repercutidos; el margen bruto crece un 1,5 % [B18].' },
    { periodo: '2028e', volumen_pct: 2.5, precio_pct: 1.5, otros_pct: 0, comentario: 'Volumen de 2-3 % y precio en línea con la inflación; sin compras nuevas en el DCF. Ingresos a +0,7 % del consenso del 19-oct [D4].' },
    { periodo: '2029e', volumen_pct: 2.5, precio_pct: 1.5, otros_pct: 0, comentario: 'Mercado al +2,3 % anual hasta 2030 [B12]: el caso base supone una ganancia de cuota pequeña, como tras Panalpina y GIL [A1].' },
  ],
  mercado_final: null,
  veredicto: 'Sí',
  justificacion: 'Sí: el crecimiento orgánico proyectado (3,2 % anual en 2027e-2035e) apenas supera al del mercado (2,3 % según Ti) [B12] y no hay crecimiento comprado gratis: Schenker ya está en el balance y no se proyectan compras. El foso es estrecho y de costes (escala en compras de transporte y una conversión de margen bruto en EBIT superior a la de Kuehne+Nagel y DHL) [A1, B5, B6]; el poder de precios es escaso (el margen bruto por TEU cayó de 4.752 a 3.964 DKK) [A1, A2], así que crece por volumen. La cuota en volumen (5,4 % en TEU, 8,0 % aérea) pasaría a ≈ 5,6 % en 2035: verosímil. La apuesta del caso base no es el crecimiento sino la conversión, y la prueba de cuota se hace a mano porque la cuota publicada (6 %) no tiene el perímetro del mercado de Ti.',
};

export const objetivo_12m = {
  ejercicio: '2028e',
  casos: [
    { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: 52.32, multiplo: null, precio: null, justificacion: 'Bajista del informe: sinergias por debajo de lo previsto y cuota perdida (−1,5 puntos de crecimiento y de margen desde 2027e) y en 2028e una caída de fletes como la de 2023 (−6 puntos de crecimiento y −3 de margen). Ventas 289.445 M, EBIT 19.856 M, intereses 3.315 M (deuda neta de sep-26 al 4 %), impuesto del 24 %, minoritarios 100 M, 238,353 M de acciones: 52,32 DKK.' },
    { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: 87.09, multiplo: null, precio: null, justificacion: 'Caso base del DCF tras el 3T26: margen bruto +1,5 % en 2027e y +4 % en 2028e, conversión del 33,5 % y del 36,5 % (medio punto menos que antes por las sinergias de Road retrasadas y la inflación que se las come); ventas 311.973 M y EBIT 30.761 M; menos 3.315 M de intereses sin desapalancamiento, impuesto del 24 % y 100 M de minoritarios, entre 238,353 M de acciones (la recompra anunciada cubre planes de incentivos): 87,09 DKK. La fórmula cuadra con el BPA publicado de 2025 (34,3 DKK).' },
    { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: 99.2, multiplo: null, precio: null, justificacion: 'Road se recupera en 2027 y las sinergias llegan completas: un punto más de crecimiento y de margen sobre el base; ventas 318.208 M y EBIT 34.557 M: 99,20 DKK.' },
  ],
  per_historico: {
    base: 'adelantado', actual: 16.1, mediana_5a: 21.2, minimo_5a: 19.2, media_larga: 21.6, anios: 5,
    excluidos: 'Historia ADELANTADA: precio de cierre de cada año ÷ BPA publicado del año siguiente. 2016 19,9x; 2017 22,6x; 2018 23,0x; 2020 21,2x; 2021 20,0x; 2022 19,2x; 2023 25,2x. Fuera por BPA atípico del año siguiente, hundido por partidas especiales de integración: 2019 (41,7x, Panalpina: 2.164 M en 2020), 2024 (44,6x, Schenker: 4.527 M de partidas especiales y la deuda de la compra en 2025) y 2025 (≈ 40x sobre el BPA contable de 2026e, con ≈ 5.500 M de partidas especiales guiadas). Mediana y mínimo de los cinco últimos años válidos (2018, 2020-2023); media de los siete válidos. Actual: 1.200,0 DKK (cierre del 20-oct) ÷ 74,57 DKK, nuestro BPA de 2027e (EBIT 27.148 M − 3.315 M de intereses, impuesto del 25 %, 100 M de minoritarios).',
    v2: { actual: 16.1, mediana_5a: 30.7, minimo_5a: 20.7, media_larga: 25.9, base: 'cierre' },
  },
  comparables_per: { mediana: 20.3 },
  consenso: { bpa_ano1: 40.67, bpa_ano2: 79.42, objetivo_medio: 1824.95, objetivo_min: 1250, objetivo_max: 2300, analistas: 21, tendencia_3m: 'recortes', fuente: 'MarketScreener y Stock Analysis, 21-oct-2026, aún sin revisar tras el 3T26 [D4, D5, D6]' },
  diferencia_consenso: 'Nuestro BPA de 2028e (87,09 DKK) queda un 8,8 % por debajo del consenso (95,46), que aún no recoge el 3T26: el EBIT queda un 2,7 % por debajo (30.761 frente a 31.610 M) porque retrasamos medio punto de conversión por Road, y el resto son los intereses, que mantenemos sin desapalancamiento, y las recompras, que no suponemos. Nuestro BPA de 2027e (74,57) está un 6,1 % por debajo del consenso (79,42), en la línea de los recortes de 2027 que anticipaba J.P. Morgan [D35]. El precio base de la regla queda muy por debajo del objetivo medio (1.824,95 DKK): la regla parte del PER de hoy (16,1x) y solo lo deja subir un 10 %, y los analistas suponen la vuelta al PER histórico (20-25x). No se acerca la cifra al consenso.',
  media: null,
  comentario: 'El objetivo a 12 meses queda cerca del valor intrínseco y los dos por encima del precio. Para cerrar la distancia en el año tiene que pasar que Road deje de restar en el 4T26 y que la guía de 2027 (2-feb-2027) recoja las sinergias retrasadas: con eso el PER de hoy (16,1x sobre 2027e) puede subir hacia su historia. El BPA base de 2028e (87,09) supone un 15,9 % anual desde el BPA diluido ajustado de los últimos 12 meses (56,1 DKK) [A15], con las sinergias y sin costes de integración en 2028. El riesgo del 3T26 es la calidad: 300 M de plusvalías inmobiliarias en el EBIT del trimestre y 3.189 M en el flujo libre ajustado de nueve meses [A15].',
};

export const ia = {
  exposicion: 'Media',
  sentido: 'Mixto',
  efecto_valor: '−10 % a +5 % a 3-5 años; neutral en el caso base',
  comentario: 'La IA toca a DSV por dos lados. Como amenaza, un transitario vende coordinación: buscar capacidad, documentar aduanas y seguir envíos, que es trabajo de oficina automatizable; si los cargadores o las navieras lo hacen ellos mismos con herramientas digitales, la comisión (el margen bruto por TEU, ya en 3.964 DKK frente a 4.752 en 2024) baja. El mercado lo cotizó el 12-feb (−10,5 % en un día por una plataforma de IA de una empresa minúscula) [D28, D29]. Como oportunidad, la plantilla es su mayor coste y la IA es parte de los 9.000 M de mejoras de productividad hasta 2030 del plan de mayo [B3]; con la red y los datos de volumen más grandes del sector, DSV es de los que mejor pueden aprovecharla. El riesgo real es que la ganancia de productividad se reparta con los clientes: −10 % si un punto de margen EBITDA se va en precio, en la línea de la sensibilidad del motor. Señal: margen bruto por unidad y plantilla de oficina por envío en cada trimestre.',
};
