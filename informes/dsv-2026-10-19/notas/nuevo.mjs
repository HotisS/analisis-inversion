// Bloques nuevos de la iteración del 19-oct-2026 (DSV): sostenibilidad (metodología del 10-oct, antes en
// actualizacion-v2.mjs del informe anterior), objetivo a 12 meses con la regla v3 y su historia adelantada,
// precio y noticias (regla 13, sección 16) y riesgo de IA (obligatorio desde el 15-oct).
// Citas con la letra de la nota: [A2] = fuente 2 de A.json; [E10] = fuente 10 de E.json.

export const sostenibilidad = {
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 0.5, precio_pct: 1.0, otros_pct: 18.9, comentario: 'Crecimiento comprado: Schenker consolida doce meses frente a ocho en 2025; con los ingresos proforma de 2025 (293.368 M) el crecimiento es del 1,5 % [A1, A2]. Ese 1,5 % se reparte entre algo de volumen (salida deliberada de negocio de bajo margen y clientes perdidos en Road) y fletes más caros por Oriente Medio que se repercuten (reparto, estimación propia) [A2, B12].' },
    { periodo: '2027e', volumen_pct: 2.5, precio_pct: -1.1, otros_pct: 0, comentario: 'Volumen como el mercado y algo más (Ti: +2,9 % marítimo y +1,6 % aéreo al año hasta 2030) [B12]; los fletes se normalizan tras Oriente Medio (WCI de 4.485 USD por contenedor de 40 pies el 15-oct, frente a 1.420 de media en 2019) y bajan los ingresos repercutidos; el margen bruto crece un 2,5 % [A2, B14, B16].' },
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
    { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: 51.0, multiplo: null, precio: null, justificacion: 'Proyección del bajista del informe: sinergias de unos 6.000 M, conversión estancada en torno al 35 % y en 2028e una caída de fletes como la de 2023 (−6 puntos de crecimiento y −3 de margen). Ventas 291.398 M, EBIT 19.582 M, intereses 3.419 M (deuda neta de jun-26 al 4 %), impuesto del 24 %, minoritarios 77 M, 239,178 M de acciones: 51,0 DKK.' },
    { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: 88.5, multiplo: null, precio: null, justificacion: 'Caso base del DCF: ventas 313.884 M, conversión del 37 % del margen bruto, EBIT 31.357 M; menos 3.419 M de intereses sin contar el desapalancamiento, impuesto del 24 % y 77 M de minoritarios, entre 239,178 M de acciones sin recompras (suspendidas hasta bajar de 2,0x de deuda): 88,5 DKK. La fórmula cuadra con el BPA publicado de 2025 (34,3 DKK).' },
    { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: 100.6, multiplo: null, precio: null, justificacion: 'Integración cerrada en 2026, sinergias completas y la productividad por IA y red adelantada: un punto más de crecimiento y de margen sobre el base; ventas 320.028 M y EBIT 35.171 M: 100,6 DKK.' },
  ],
  per_historico: {
    base: 'adelantado', actual: 15.7, mediana_5a: 21.2, minimo_5a: 19.2, media_larga: 21.6, anios: 5,
    excluidos: 'Historia ADELANTADA: precio de cierre de cada año ÷ BPA publicado del año siguiente. 2016 19,9x; 2017 22,6x; 2018 23,0x; 2020 21,2x; 2021 20,0x; 2022 19,2x; 2023 25,2x. Fuera por BPA atípico del año siguiente, hundido por partidas especiales de integración: 2019 (41,7x, Panalpina: 2.164 M en 2020), 2024 (44,6x, Schenker: 4.527 M de partidas especiales y la deuda de la compra en 2025) y 2025 (≈ 40x sobre el BPA contable de 2026e, con ≈ 6.500 M de partidas especiales guiadas). Mediana y mínimo de los cinco últimos años válidos (2018, 2020-2023); media de los siete válidos. Actual: 1.211,5 DKK ÷ 77,07 DKK, nuestro BPA de 2027e (EBIT 28.099 M − 3.419 M de intereses, impuesto del 25 %, 77 M de minoritarios). El informe del 7-oct dejaba 2019 y 2024 dentro (mediana 21,2x, media larga 27,2x).',
    v2: { actual: 15.7, mediana_5a: 30.7, minimo_5a: 20.7, media_larga: 25.9, base: 'cierre' },
  },
  comparables_per: { mediana: 20.1 },
  consenso: { bpa_ano1: 40.67, bpa_ano2: 79.42, objetivo_medio: 1824.95, objetivo_min: 1250, objetivo_max: 2300, analistas: 21, tendencia_3m: 'recortes', fuente: 'MarketScreener y Stock Analysis, 19-oct-2026 [D4, D5, D6]' },
  diferencia_consenso: 'Nuestro BPA de 2028e (88,5 DKK) queda un 7,3 % por debajo del consenso (95,46) aunque el EBIT casi coincide (31.357 frente a 31.610 M, −0,8 %): la diferencia está en los intereses, que mantenemos en los de hoy sin el desapalancamiento, y en no suponer recompras. Nuestro BPA de 2027e (77,07) está un 3,0 % por debajo del consenso (79,42). El precio base de la regla queda muy por debajo del objetivo medio de los analistas (1.824,95 DKK), porque la regla parte del PER de hoy (15,7x) y solo lo deja subir un 10 %, mientras los analistas suponen la vuelta al PER histórico de DSV (20-25x). No se acerca la cifra al consenso.',
  media: null,
  comentario: 'El objetivo a 12 meses y el valor intrínseco están cerca, y los dos por encima del precio; la distancia entre ellos es menor del 25 %. Lo que tiene que pasar en el año para cerrar el resto es que el 3T26 (21-oct) y el 4T26 enseñen la conversión de Road al alza y que la guía de 2027 (febrero) recoja las sinergias completas: con eso el PER de hoy (15,7x sobre 2027e) puede subir hacia su historia. El BPA base de 2028e (88,50) supone un 37,2 % anual desde el publicado de 2025 (34,30), pero esa base está hundida por 4.527 M de partidas especiales, ocho meses de Schenker y los intereses de su deuda: desde el BPA diluido ajustado de los últimos 12 meses (52,0 DKK) [A2] es un 19 % anual, con las sinergias y sin costes de integración en 2028.',
};

export const contexto = {
  movimiento: {
    fecha: '2026-10-19', var_1m_pct: -4.9, var_3m_pct: -15.5, var_6m_pct: -28.9, var_12m_pct: -5.4,
    dist_max_52s_pct: -36.3, dist_min_52s_pct: 6.5, dist_max_historico_pct: -36.3, tendencia: 'bajista', volatilidad_60d_pct: 31,
    avisos: ['P5 Un 21 % por debajo de la media de 200 sesiones (tendencia bajista)'],
  },
  movimientos_fuertes: [
    { periodo: 'feb-2026', var_pct: -10.5, causa: 'El 12-feb cayó un 10,5 % en la sesión (−11 % según la prensa), con Kuehne+Nagel (−13 %) y C.H. Robinson (−15 %), por el comunicado de una pequeña empresa de EE. UU. (Algorhythm, antes de karaokes) que decía mover un 300-400 % más de carga con su plataforma de IA sin más plantilla. No fue un hecho de DSV, pero muestra que el mercado ya cotiza el riesgo de la IA en los intermediarios de transporte [D2, D28, D29].', veredicto: 'no cambia', condicion: null },
    { periodo: 'abr-2026', var_pct: 11.4, causa: 'Subida del 11,4 % en el mes hasta el 28-abr, la víspera del 1T26 (29-abr) y en plena subida de fletes por el conflicto de Oriente Medio; no hay anuncio de la empresa en esas fechas [D2, D30].', veredicto: 'no cambia', condicion: null },
    { periodo: 'may-2026', var_pct: -7.6, causa: 'Caída del 7,6 % el 4-may sin causa propia localizada: la lista de anuncios no tiene hechos entre el 1T26 (29-abr) y el día del inversor (12-may) y la prensa danesa y alemana consultada no da motivo [D2, D30].', veredicto: 'no cambia', condicion: null },
    { periodo: 'jul-ago 2026', var_pct: -19.7, causa: 'El 22-jul cayó un 14,2 % con el 1S26: EBIT del 2T dentro de lo esperado pero problemas de productividad y de red en Road en Alemania, Francia y Países Bajos, y guía estrechada por arriba; en el mes hasta el 11-ago perdió un 19,7 % [A2, D2]. Es el riesgo central del informe.', veredicto: 'no cambia', condicion: null },
    { periodo: 'sep-2026', var_pct: -5.6, causa: 'El 21-sep cayó un 5,6 % el día en que Kuehne+Nagel anunció el contrato de logística de AWS con Amazon; nadie ha confirmado que DSV compitiera por él [B15, D2].', veredicto: 'no cambia', condicion: null },
    { periodo: 'oct-2026', var_pct: 6.5, causa: 'Mínimo de 52 semanas el 9-oct (1.130,5 DKK) y rebote de un 6,5 % hasta el 19-oct, con +3,4 % el 15-oct y +3,1 % el 16-oct, el día en que DHL adelantó un 3T con el EBIT de Global Forwarding en ≈ 260 M EUR frente a 195 M; DSV no publicó nada [D2, D30, E10].', veredicto: 'no cambia', condicion: null },
  ],
  noticias: [
    { fecha: '2026-10-21', tipo: 'resultados', hecho: 'Resultados del 3T26 el 21-oct antes de la apertura, con conferencia a las 11:00 [D30]. Es la primera prueba de si Road ha tocado fondo.', veredicto: 'no cambia', condicion: 'Sin aplazar por resultados (reglas 11 y 13); el informe se revisa con ellos.' },
    { fecha: '2026-10-15', tipo: 'recomendación', hecho: 'Ola de recortes antes del 3T: Barclays 1.900 → 1.800 (8-oct), JPMorgan rebaja a neutral con 1.400 (9-oct), Nordea 1.840 → 1.670 (13-oct), Jyske 2.100 → 1.600 y UBS 1.945 → 1.805 (14-oct), Deutsche Bank 1.823 → 1.425 (15-oct) y RBC inicia en «sector perform» con 1.250 (15-oct). Jyske admite haber subestimado la pérdida de clientes y de volumen de Road por la integración [D5, D9, D27]. El consenso de EBIT apenas baja (−0,4 % en 2026e y −1,5 % en 2027e) [D4].', veredicto: 'no cambia', condicion: 'Es la tesis bajista ya recogida (Road), no un hecho nuevo confirmado por la empresa; si el 3T26 confirma pérdida de clientes que baje la guía, se rehace el informe.' },
    { fecha: '2026-07-28', tipo: 'directivos', hecho: 'Ventas de directivos tras ejercer opciones (anuncios 1171 y 1172, julio) dentro de 265 M DKK en doce meses; ninguna operación nueva comunicada hasta el 19-oct [C20, C21, D30].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-10-19', tipo: 'accionista de referencia', hecho: 'Ernst Göhner Stiftung (9,7 %) y Agility (8,03 %) no han anunciado ventas ni hay colocación en estudio publicada; último aviso de participación significativa, BlackRock en oct-2025 [C22, C23, D30].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-09-21', tipo: 'rumor', hecho: 'Contrato de AWS de Amazon con Kuehne+Nagel: la prensa danesa lo ligó a DSV sin confirmación [B15].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-07-31', tipo: 'demanda o regulador', hecho: 'Posición corta agregada del 2,10 % del capital (julio, último dato publicado por la Finanstilsynet a 19-oct), desde el 1,62 % de oct-2025; sin demandas ni expedientes de reguladores contra DSV en los anuncios [C27, D30].', veredicto: 'no cambia', condicion: null },
  ],
  proximos_resultados: '2026-10-21',
  veredicto: 'no cambia',
  condicion: null,
  comentario: 'La acción baja un 28,9 % en seis meses y cotiza un 21 % por debajo de su media de 200 sesiones (aviso P5), pero cada caída fuerte tiene una causa que el informe ya recoge: Road en julio, el miedo a la IA en febrero y el contrato de Amazon con Kuehne+Nagel en septiembre. No hay hecho pendiente ajeno al análisis que pueda mover el precio más de un 5 % en contra (ni colocaciones, ni ampliaciones, ni decisiones de reguladores con fecha). Lo único con fecha son los resultados del 21-oct, que por las reglas 11 y 13 no retrasan la decisión. La ola de recortes de objetivos de la semana pasada es la misma tesis bajista de Road; si el 3T la confirma con una guía más baja, el informe se rehace. Veredicto global: no cambia.',
};

export const ia = {
  exposicion: 'Media',
  sentido: 'Mixto',
  efecto_valor: '−10 % a +5 % a 3-5 años; neutral en el caso base',
  comentario: 'La IA toca a DSV por dos lados. Como amenaza, un transitario vende coordinación: buscar capacidad, documentar aduanas y seguir envíos, que es trabajo de oficina automatizable; si los cargadores o las navieras lo hacen ellos mismos con herramientas digitales, la comisión (el margen bruto por TEU, ya en 3.964 DKK frente a 4.752 en 2024) baja. El mercado lo cotizó el 12-feb (−10,5 % en un día por una plataforma de IA de una empresa minúscula) [D28, D29]. Como oportunidad, la plantilla es su mayor coste y la IA es parte de los 9.000 M de mejoras de productividad hasta 2030 del plan de mayo [B3]; con la red y los datos de volumen más grandes del sector, DSV es de los que mejor pueden aprovecharla. El riesgo real es que la ganancia de productividad se reparta con los clientes: −10 % si un punto de margen EBITDA se va en precio, en la línea de la sensibilidad del motor. Señal: margen bruto por unidad y plantilla de oficina por envío en cada trimestre.',
};
