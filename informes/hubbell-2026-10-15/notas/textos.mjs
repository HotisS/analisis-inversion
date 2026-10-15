// Textos del analista (Hubbell, corte 2026-10-15). Las cifras del motor se copian de calc tras el último cálculo.
// Citas: [A3] = fuente 3 de A.json, [B2] de B.json, [C1], [D2], [E1].
export default {
  fuentes: [],
  limitaciones: 'Línea cotizada: acciones ordinarias en la Bolsa de Nueva York (HUBB), única clase. Precio: cierre del 14-oct-2026 (473,37 USD), porque la sesión del 15-oct no había cerrado a la hora del análisis (a mediodía cotizaba a 462,63, −2,3 %) [D1, D12]. Cuentas 2019-2025 del XBRL de la SEC, comprobadas con los 10-K de 2023 y 2025 [A1, A2, A8]; 2019-2022 con el beneficio y el BPA de operaciones continuadas (el alumbrado comercial e industrial vendido en 2022 va en discontinuadas) y 2016-2018 fuera por no estar reexpresados. Todo en GAAP: el BPA ajustado de la empresa y del consenso excluye la amortización de intangibles de compras (≈2,50 USD por acción en 2026). US GAAP: los arrendamientos operativos (161,9 M) quedan dentro del EBITDA y fuera de la deuda. Puente a 30-jun-2026, después de la compra de NSI (9-jun). Comparables tomados de la nota D del informe de Eaton del mismo día (cifras de MarketScreener y Stock Analysis llevadas al 14-oct) [D6]; sus PER son mayoritariamente ajustados. Consenso de una sola fuente gratuita con estimaciones (Stock Analysis) [D2].',
  controles_explicados: [
    { control: 'Fuentes sin citar', explicacion: 'Fuentes de contexto (prensa sectorial y notas de resultados antiguas) leídas para contrastar; el motor tolera hasta un 15 %.' },
  ],
  huecos: [
    { seccion: 'balance', campo: 'rating (agencia y nota)', tipo: 'Complemento', intentos: '1) 10-K 2025 (solo habla de «mantener nuestras calificaciones»); 2) 8-K de la emisión de junio de 2026 (folleto no leído entero); 3) prensa', decision: 'Omitido' },
    { seccion: 'sector', campo: 'mercado_final para la prueba de cuota', tipo: 'Complemento', intentos: '1) 10-K (no publica cuota); 2) EEI (solo inversión total de las eléctricas); 3) informes de mercado de pago', decision: 'Omitido: prueba de cuota a mano con la inversión de las eléctricas' },
  ],
  per_historico: {
    base: 'adelantado', actual: 23.8, mediana_5a: 22.9, minimo_5a: 16.9, media_larga: 22.0,
    excluidos: 'Historia adelantada (cierre de cada año ÷ BPA GAAP de operaciones continuadas del año siguiente): 2018 15,1x; 2019 24,5x; 2020 23,5x; 2021 22,1x; 2022 16,9x; 2023 22,9x; 2024 25,3x; 2025 25,4x (con nuestro BPA de 2026e, 17,49). Sin años excluidos: ninguno con pérdidas ni BPA atípico. Actual: 473,37 ÷ 19,90 (nuestro BPA de 2027e) = 23,8x.',
    v2: { mediana_5a: 26.9, minimo_5a: 23.7, media_larga: 26.3, excluidos: 'Historia al cierre (precio ÷ BPA continuado del mismo año): 2019 22,4x; 2020 26,0x; 2021 31,3x; 2022 24,9x; 2023 23,7x; 2024 29,1x; 2025 26,9x.' },
  },
  casos_12m: [
    { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: 19.2, multiplo: null, precio: null, justificacion: 'Las eléctricas y los centros de datos frenan la inversión en 2027-2028 (como en 2024, cuando el orgánico fue 0 %): ventas 2028e de ≈7.640 M y margen EBITDA del 23,8 %. BPA 19,2 con el mismo coste financiero; el múltiplo vuelve a su mínimo de cinco años.' },
    { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: 22.4, multiplo: null, precio: null, justificacion: 'Orgánico del 5-7 % más NSI completa en 2027: ventas 2028e de 8.100 M, margen EBITDA del 25,3 % (NSI deja ≈34 %), amortización del 4 % de ventas, gastos financieros de ≈195 M, impuesto del 22 % y 53,0 M de acciones: BPA GAAP de 22,4.' },
    { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: 24.6, multiplo: null, precio: null, justificacion: 'Transmisión, subestaciones y centros de datos siguen a dos cifras: ventas 2028e de ≈8.400 M y margen EBITDA del 26,3 % por apalancamiento operativo: BPA 24,6.' },
  ],
  diferencia_consenso: 'Nuestro BPA de 2027e (19,90) es GAAP; el del consenso (22,96) es ajustado y excluye ≈2,9 USD de amortización de intangibles de compras: en la misma base, la diferencia es de un 1-2 % [D2]. En ventas coincidimos: 6.850 M en 2026 y 7.535 M en 2027 frente a 6.870 y 7.570 del consenso [D2]. Nuestro precio base a 12 meses (521,92) queda un 6,9 % por debajo del objetivo medio de los analistas (560,58): la diferencia es de múltiplo, no de beneficio; los analistas aplican un PER de ≈24x sobre el BPA ajustado, unos 28x sobre el GAAP.',
  media_12m: 514.19,
  objetivo_comentario: 'El objetivo a 12 meses (516,13) y el valor intrínseco (346,00) están a un 49 % de distancia: el mercado paga a Hubbell un PER adelantado de 23,8x, en su media de cinco años, mientras el DCF con un WACC del 9,48 % (bono al 5,21 %) da 317,82. Para cerrar la distancia haría falta que el crecimiento se mantuviera muy por encima de lo proyectado (el DCF inverso pide un 14,0 % anual frente al 6,4 % de nuestro base) o que bajaran los tipos. Es una tesis de varios años que no depende de un catalizador con fecha.',
  valoracion_comentario: 'El DCF pesa un 60 %, los escenarios un 30 % y los comparables un 10 %: Hubbell es un negocio estable y previsible, en el que el descuento de flujos es el método más fiable; los comparables llevan PER y EBITDA mayoritariamente ajustados y cotizan en pleno entusiasmo por la electrificación, por eso pesan poco; las transacciones (mediana ≈13x EBITDA) llevan prima de control y no pesan. La dispersión es grande: los múltiplos de los comparables dan 540-650 USD y el DCF 318: el precio actual se explica por los múltiplos del sector, no por los flujos descontados a un 9,5 %. Con la prima implícita del mercado (4,2 %, WACC 8,4 %) el valor sube a 418,73, todavía un 11 % por debajo del precio.',
  dcf_justificacion: {
    crecimiento: 'Ventas +17,2 % en 2026e: guía de +16-18 % con orgánico de +9-11 % y NSI desde el 9-jun [D14]. 2027e +10 % (orgánico ≈7 % y NSI completa: ≈240 M más), en línea con el +10,3 % del consenso [D2]. Después baja del 7,5 % al 3,5 % en 2033e: la inversión de las eléctricas crece a dos cifras [B2], pero el orgánico de Hubbell fue de 0-3 % en 2024-2025 y su crecimiento compuesto 2019-2025 del 6,8 % incluye compras [A1, A2].',
    margenes: 'Margen EBITDA GAAP del 24,2 % en 2026e (1S26: 22,9 %, con costes de transacción de NSI) y del 25,0-25,3 % desde 2027e: el 24,2 % de 2025 más la mezcla de NSI (≈194 M de EBITDA sobre ≈570 M de ventas, un 34 %) [A9, A3]. Es el máximo de su historia; no suponemos más apalancamiento operativo, porque los aranceles y la inflación ya restaron 50 pb al margen ajustado en el 2T26 [A3].',
    inversion: 'Capex del 2,6-3,2 % de las ventas (2,7 % en 2025, 3,2 % en 2024) y amortización del 4,0-4,1 % en 2026-2027 por los intangibles de NSI y DMC Power (≈170-200 M al año), que baja hacia el 3,2 % con las ventas; en el último año el capex iguala la amortización [A1, A3]. Circulante comercial del 23 % de las ventas, como en 2025 [A1].',
    wacc: 'Tasa libre: bono a 10 años de EE. UU. al 5,21 % (13-oct-2026) [D4]. Beta 1,0: entre la mensual de cinco años (0,83) y las semanales de cinco y dos años (0,97 y 1,08) [D1]. Prima de mercado del 5,5 %; coste de la deuda antes de impuestos del 5,0 % (bonos de junio de 2026 al 4,65-5,15 %) [A4]; peso de la deuda del 18 % (5.373 M frente a ≈25.100 M de capitalización). WACC 9,48 %. Con la beta mensual (0,83) el WACC baja a ≈8,7 % y el valor sube ≈15 %: la conclusión no cambia.',
    terminal: 'Gordon con un crecimiento del 3,0 %, entre la inflación esperada en dólares (≈2,5 %) y la tasa libre menos medio punto. El valor terminal es el 66 % del valor. El múltiplo implícito es ≈13x el EBITDA terminal, por debajo de las transacciones del sector (12-16x) y de los comparables (≈18x).',
  },
  puente_comentarios: {
    '2026e': 'Guía: orgánico +9-11 % (≈6 de volumen y ≈4 de precio, que la empresa cita para compensar aranceles e inflación) y ≈7 puntos de compras (NSI desde junio y DMC Power) [D14, A3].',
    '2027e': 'Volumen +4,5 % con la cartera de pedidos (+13,8 % a dic-25) y el ciclo de transmisión; precio +2,5 %; NSI completa añade ≈3 puntos [A1, A9].',
    '2028e': 'Volumen +5 % y precio +2,5 %: la inversión de las eléctricas de EE. UU. crece a dos cifras en 2025-2029 [B2].',
    '2029e': 'Volumen +4,5 % y precio +2,5 %.',
    '2030e': 'Volumen +4 % y precio +2,5 %, por encima de la historia orgánica de 2019-2025 (≈4 %).',
  },
  veredicto: 'Sí',
  sostenibilidad_justificacion: 'Sí. El crecimiento orgánico proyectado (5-7 % a partir de 2028) está por debajo del que hoy da la empresa (+10 % en el 2T26) y apenas por encima de su media de 2019-2025 [A3, A2]; se apoya en precio, que Hubbell ha demostrado poder subir por encima de la inflación (margen operativo del 12,7 % al 20,7 % en 2021-2025) [A1], y en volumen de un ciclo de inversión de las eléctricas que se proyecta a cinco años [B2]. El motor da «Sí»: la reinversión bruta financia un 5,1 % al ROIC de 2025 y el rendimiento que supone la proyección (25,9 %) queda por debajo del ROIC incremental histórico (30,1 %). La cuota no se puede medir (Hubbell no la publica); con la inversión de las eléctricas creciendo a dos cifras, crecer al 7 % no exige ganar cuota. Matiz: parte del crecimiento de 2026-2027 es comprado (NSI a 15,5x EBITDA), y ese no rinde el ROIC histórico.',
  dcf_lectura: 'El DCF da 317,82 USD por acción, un 32,9 % por debajo del precio, con el valor terminal como el 66 % del valor. El DCF inverso dice que para justificar 473,37 USD con nuestro WACC del 9,48 % las ventas tendrían que crecer un 14,0 % anual en 2027-2033 (frente al 6,4 % de nuestro base y al 6,8 % de los últimos seis años con compras), o el margen subir al 33,3 % frente al 25,3 %; la rentabilidad implícita en el precio es del 7,7 % anual, por debajo del WACC y del 8,4 % que pide hoy el mercado. Es una exigencia alta frente a la historia: el mercado paga a Hubbell como una empresa de crecimiento a dos cifras sostenido, cuando su orgánico fue de 0 % en 2024 y 3,3 % en 2025. La lectura depende de la tasa libre al 5,21 %: con la prima del mercado el valor sube a 418,73, aún por debajo del precio.',
  narrativas: {
    Bajista: 'Se repite 2024: los distribuidores reducen inventarios, las eléctricas retrasan proyectos por tipos o por los reguladores y los centros de datos frenan; el orgánico vuelve a 0-3 % y los aranceles comen 150 pb de margen.',
    Base: 'Ciclo de inversión en transmisión y subestaciones durante cinco años, NSI integrada sin sorpresas y margen EBITDA estable en el 25 %.',
    Alcista: 'La carga de los centros de datos y la reindustrialización mantienen el orgánico cerca del 10 % hasta 2028 y el margen sube al 26 % por apalancamiento operativo.',
  },
  escenarios_comentario: 'La asimetría es negativa: el alcista vale 376,08 (−20,6 %) y el bajista 227,23 (−52,0 %). Incluso con crecimiento y margen mejores, el DCF queda por debajo del precio, porque la tasa de descuento con el bono al 5,21 % pesa más que dos puntos de crecimiento. A 12 meses, con la regla de múltiplos, la asimetría sí es positiva (bajista −30,3 %, alcista +48,3 %): la diferencia entre las dos lecturas es la tesis del informe.',
  secciones: {
    rentabilidad: { comentario: 'Hubbell crea valor: el ROIC del motor pasó del 12,3 % en 2019 al 18,6 % en 2025, frente a un WACC del 9,48 %. Lo movió el margen (margen neto del 9,2 % al 15,2 %) más que la rotación. Sin fondo de comercio, el ROIC pasa del 40 %: el negocio de base es excelente y lo que baja el retorno son las compras. Ese es el punto débil: con NSI (3.008 M) el capital invertido sube más de un 50 % y el ROIC de 2026-2027 bajará al 12-13 % (estimación propia: NOPAT ≈1.080 M de 2026e sobre ≈8.700 M de capital), solo 3 puntos sobre el WACC. Stock Analysis da un ROIC de los últimos 12 meses del 13,6 % [D3].', confianza: 'Media' },
    capital: {
      politica: 'Dividendo trimestral de 1,42 USD (5,68 al año, ≈1,2 % de rentabilidad), subido cada año desde hace más de una década (2,59 en 2016, 5,38 en 2025) [A2, D9]. Recompras dentro del programa de 500 M de 2025 (quedan 298,2 M a jun-26), 225 M en 2025 y 203,5 M en el 1S26 [A4]. Prioridad declarada: inversión en capacidad, compras en el «núcleo» de red y eléctrico, dividendo y recompras oportunistas [A3].',
      adquisiciones: [
        { anio: '2026', objetivo: 'NSI Industries (racores, conectores, temporizadores; ≈570 M de ventas)', importe: 3008, ev_ebitda: 15.5, financiacion: 'Deuda: préstamo de 900 M, bonos por 1.900 M y papel comercial', resultado: 'Cerrada el 9-jun-2026; demasiado pronto [A4, A9].' },
        { anio: '2025', objetivo: 'DMC Power (conexiones a compresión para subestaciones y transmisión)', importe: 827, ev_ebitda: null, financiacion: 'Préstamo de 600 M y papel comercial', resultado: 'Integrada en Utility; Grid Infrastructure +12-18 % desde entonces [A1, A3].' },
        { anio: '2023', objetivo: 'Systems Control (paneles de control de subestaciones)', importe: 1100, ev_ebitda: null, financiacion: 'Caja y deuda', resultado: 'Sin deterioros; el margen de Utility subió del 21,4 % al 21,5 % [A1].' },
        { anio: '2018', objetivo: 'Aclara (contadores e infraestructura de medición)', importe: 1100, ev_ebitda: null, financiacion: 'Deuda', resultado: 'Mixto: Grid Automation cayó en 2024-2025 (−18 % en el 3T25) [A7].' },
      ],
      comentario: 'Buena asignación hasta 2025: compras medianas en red eléctrica, venta de alumbrado de poco margen, dividendo creciente y deuda baja (1,2x EBITDA en 2025); el ROIC subió del 12,3 % al 18,6 %. NSI cambia el perfil: es la mayor compra de su historia, pagada a 15,5x EBITDA (≈5,3 veces ventas) con deuda, que lleva la deuda neta a ≈3,1x EBITDA, y un rendimiento antes de sinergias de ≈5 % después de impuestos sobre lo pagado. La retribución de la dirección, con BPA ajustado sin amortización de compras y sin métrica de ROIC, no castiga pagar caro [C1].',
    },
    catalizadores: {
      items: [
        { fecha: '27-oct-2026', evento: 'Resultados del 3T26', efecto: 'Primer trimestre con NSI completa; confirmación de la guía 2026 (BPA GAAP 17,25-17,55)', probabilidad: 'Alta', sentido: '+/−' },
        { fecha: 'Feb-2027', evento: 'Resultados 2026 y guía 2027', efecto: 'Primera guía con NSI todo el año; el consenso espera BPA ajustado de 22,96', probabilidad: 'Alta', sentido: '+/−' },
        { fecha: '2026-2027', evento: 'Reducción de deuda tras NSI', efecto: 'Bajar de ≈3,1x a ≈2x EBITDA libera recompras', probabilidad: 'Media', sentido: '+' },
        { fecha: '2027', evento: 'Planes de inversión de las eléctricas (EEI) y de los centros de datos', efecto: 'Revisión al alza o a la baja del ciclo', probabilidad: 'Media', sentido: '+/−' },
        { fecha: 'Oct-2026', evento: 'Subida anual del dividendo', efecto: 'Señal de confianza; efecto pequeño', probabilidad: 'Alta', sentido: '+' },
      ],
      confianza: 'Media',
    },
    riesgos: {
      items: [
        { riesgo: 'Frenazo de la inversión en centros de datos («AI slowdown»)', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−20 a −30 % en precio (múltiplo)', mitigante: 'La mayor parte de las ventas es red eléctrica y mantenimiento', senal: 'Orgánico de Electrical Solutions por debajo del 5 %' },
        { riesgo: 'Compra de NSI cara (15,5x EBITDA) y con deuda', tipo: 'Asignación de capital', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 a −10 %', mitigante: 'Margen de NSI por encima del grupo', senal: 'Deterioro de fondo de comercio o margen de Electrical por debajo del 20 % ajustado' },
        { riesgo: 'Ciclo de inventarios de los distribuidores y de las eléctricas (como en 2024)', tipo: 'Cíclico', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−52 % en el escenario bajista del DCF; −30 % a 12 meses', mitigante: 'Cartera de pedidos de 2.159 M', senal: 'Cartera de pedidos que cae interanualmente' },
        { riesgo: 'Aranceles e inflación de materias primas', tipo: 'Costes', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: '−5 % por cada punto de margen EBITDA', mitigante: 'Poder de precios demostrado', senal: 'Margen operativo ajustado por debajo del 22 %' },
        { riesgo: 'Tipos de interés altos', tipo: 'Financiero', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'Con el WACC +1 punto, ≈−15 %', mitigante: 'Deuda a tipo fijo en su mayoría', senal: 'Bono a 10 años por encima del 5,5 %' },
        { riesgo: 'Pérdida de ventas de contadores (Aclara) frente a Itron y Landis+Gyr', tipo: 'Competencia', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−3 %', mitigante: 'Es una parte pequeña de Utility', senal: 'Grid Automation negativo dos trimestres seguidos' },
      ],
      premortem: 'Octubre de 2029: la acción ha perdido un 40 %. En 2027 los grandes de la nube recortaron la inversión en centros de datos tras dos años sin rentabilizar la IA, y las eléctricas, con tipos al 5 % y reguladores que no aceptaban más subidas de tarifa, aplazaron proyectos de transmisión. Los distribuidores redujeron inventarios como en 2024: el orgánico pasó del +10 % al −2 %. Al mismo tiempo, NSI, comprada a 15,5x EBITDA con deuda, perdió margen con la caída de la construcción no residencial, y Hubbell tuvo que dedicar la caja a bajar deuda en lugar de recomprar. El PER, que en 2026 estaba en 24x, volvió a 17x, su mínimo de 2022, sobre un BPA un 15 % menor que el esperado. La señal temprana habría sido la cartera de pedidos cayendo interanualmente y el orgánico de Electrical Solutions por debajo del 5 %.',
      ia: { exposicion: 'Baja', sentido: 'Oportunidad', efecto_valor: '+5 % (más demanda de red); el riesgo es de ciclo, no de sustitución', comentario: 'La IA no sustituye lo que vende Hubbell: conectores, herrajes, aisladores y material eléctrico son físicos y no hay modelo que los reemplace. Al contrario, los centros de datos para IA son una fuente de demanda (Electrical Solutions orgánico +18 % en el 2T26) y la razón por la que las eléctricas invierten más en transmisión [A3, B2]. La IA puede abaratar algo el diseño y la gestión interna, pero eso no cambia el foso. El riesgo real es indirecto: si la inversión en centros de datos de IA se frena, el múltiplo que el mercado paga por la «exposición a la IA» se desinfla (como el 14-sep-2026 con todo el sector) [D13]. Riesgo de IA para el negocio: bajo. Señal: el orgánico de Electrical Solutions y los comentarios sobre centros de datos en las conferencias.' },
      confianza: 'Media',
    },
    preguntas: {
      items: [
        { tema: 'NSI', pregunta: '¿Qué ROIC esperan de NSI en el tercer año y qué sinergias de coste y de ventas cruzadas suponen?', por_que: 'Se pagaron 3.000 M (15,5x EBITDA) con deuda; a ese precio rinde ≈5 % después de impuestos sin sinergias.' },
        { tema: 'Centros de datos', pregunta: '¿Qué porcentaje de las ventas va hoy a centros de datos, directa e indirectamente?', por_que: 'Es el motor del orgánico de Electrical (+18 %) y el principal riesgo del múltiplo.' },
        { tema: 'Margen', pregunta: '¿Cuándo recuperan el margen ajustado perdido por aranceles y cuánto precio queda por aplicar?', por_que: 'El margen ajustado cayó 50 pb en el 2T26.' },
        { tema: 'Deuda', pregunta: '¿Qué apalancamiento objetivo tienen y cuándo vuelven las recompras?', por_que: 'La deuda neta pasó a ≈3,1x EBITDA.' },
        { tema: 'Retribución', pregunta: '¿Por qué no hay una métrica de rendimiento del capital en el incentivo a largo plazo?', por_que: 'El BPA ajustado excluye la amortización de las compras.' },
        { tema: 'Grid Automation', pregunta: '¿Se ha tocado fondo en contadores o hay pérdida de cuota frente a Itron y Landis+Gyr?', por_que: 'Cayó un 18 % en el 3T25 y apenas creció en el 2T26.' },
      ],
      confianza: 'Media',
    },
    multiplos_historicos: { comentario: 'Hubbell cotizaba a 15-24x el beneficio del año siguiente antes de 2023 y desde entonces a 23-25x: el mercado reclasificó a la empresa de «material eléctrico cíclico» a «beneficiaria de la electrificación y los centros de datos». Hoy, a 23,8x nuestro BPA GAAP de 2027e, está en su media de cinco años (22,9x) y lejos del mínimo de 2022 (16,9x). El cambio estructural es real (orgánico del 10 %, margen en máximos), pero el múltiplo ya lo recoge.', confianza: 'Alta' },
    comparables: { comentario: 'Hubbell cotiza a 20,1x el EBITDA de los últimos 12 meses y 21,1x el PER de los próximos 12 meses, por debajo de la mayoría de comparables (Eaton ≈29x, ABB 27x, nVent 30x) aunque con el mayor margen del grupo (24 % de EBITDA) [D6]. El descuento se explica por el tamaño, por la menor exposición directa a centros de datos y porque nuestros PER son GAAP y los de los comparables, ajustados. Los múltiplos de los comparables dan 540-650 USD, pero reflejan el entusiasmo del sector por la electrificación: por eso pesan solo un 10 %.', confianza: 'Media' },
    transacciones: { comentario: 'Las compras del sector en 2024-2026 se pagaron a 10-16x EBITDA (mediana ≈13x) [D7]; NSI a 15,5x está en la parte alta [D8]. Aplicadas a Hubbell dan ≈264 USD por acción, por debajo del precio: la bolsa paga hoy más por Hubbell (20x EBITDA) que lo que pagan los compradores por negocios parecidos. Hubbell no es objeto probable de una oferta: sin accionista de control, pero con 25.000 M de capitalización y deuda tras NSI.', confianza: 'Media' },
    consenso: { confianza: 'Media' },
    bolsa: {
      comentario: 'Hubbell ha rentado un 22,2 % anual en cinco años frente al 13,2 % del S&P 500, gracias a la subida del margen y del múltiplo en 2022-2024 [D1]. En 2025-2026 se quedó atrás (+7,5 % en el año frente al +13,7 % del índice): la compra de NSI con deuda, un primer trimestre con guía algo por debajo del consenso y, desde septiembre, el miedo a un frenazo de la inversión en centros de datos [D9, D10, D13]. Caída máxima de cinco años: −32,6 % (nov-24 a abr-25) [D1].',
      contexto: {
        movimiento: { fecha: '2026-10-15', var_1m_pct: 5.4, var_3m_pct: -5.3, var_6m_pct: -11.3, var_12m_pct: 8.2, dist_max_52s_pct: -17.1, dist_min_52s_pct: 13.6, dist_max_historico_pct: -17.1, tendencia: 'bajista', volatilidad_60d_pct: 29.9, avisos: [] },
        movimientos_fuertes: [
          { periodo: 'abr-may 2026', var_pct: -16.1, causa: 'Del máximo de 565,5 USD (23-abr) a ≈453 en un mes: el 30-abr cayó un 6,9 % porque el punto medio de la guía de BPA ajustado (19,30-19,85) quedó algo por debajo del consenso pese a batir el trimestre [D10]; el 4-may anunció la compra de NSI por 3.000 M a 15,5x EBITDA con deuda [D8]. Hecho conocido y recogido en este informe.', veredicto: 'no cambia', condicion: null },
          { periodo: 'jun-2026', var_pct: 16.4, causa: 'Rebote hasta ≈539 USD (22-jun) con el cierre de NSI y la emisión de bonos, y el apetito del mercado por la electrificación [D9]; después cayó un 5,5 % el 23-jun y un 6,3 % el 1-jul sin noticia propia (rotación sectorial) [D1].', veredicto: 'no cambia', condicion: null },
          { periodo: 'jul-sep 2026', var_pct: -5.3, causa: 'El 29-jul cayó un 4,7 % tras el 2T26: batió el BPA ajustado, pero el margen ajustado bajó 50 pb [D9]; el 14-sep el sector cayó por el miedo a un frenazo de la inversión en centros de datos [D13].', veredicto: 'no cambia', condicion: null },
        ],
        noticias: [
          { fecha: '2026-10-27', tipo: 'resultados', hecho: 'Resultados del 3T26 el 27-oct, antes de la apertura [D3].', veredicto: 'no cambia', condicion: null },
          { fecha: '2026-06-09', tipo: 'fusión u oferta', hecho: 'Cierre de la compra de NSI (3.000 M), financiada con 900 M de préstamo, 1.900 M de bonos y papel comercial; ninguna ampliación de capital [A4].', veredicto: 'no cambia', condicion: null },
          { fecha: '2026-02-06', tipo: 'directivos', hecho: 'El consejero delegado vendió 25.233 acciones (12,6 M USD) a ≈499 USD; en 12 meses los directivos vendieron 20,4 M y un consejero compró 0,19 M [C3]. Ventas tras ejercer derechos de revalorización, sin plan 10b5-1; no indican nada nuevo sobre el negocio.', veredicto: 'no cambia', condicion: null },
          { fecha: '2026-10-15', tipo: 'recomendación', hecho: 'Dos subidas de recomendación y ninguna bajada en el último mes; objetivo medio 560,58 USD (14 analistas) [D11, D2].', veredicto: 'no cambia', condicion: null },
          { fecha: '2026-09-14', tipo: 'rumor', hecho: 'Venta en todo el sector de electrificación por el temor a un frenazo de la inversión en centros de datos de IA [D13].', veredicto: 'no cambia', condicion: null },
        ],
        proximos_resultados: '2026-10-27',
        veredicto: 'no cambia',
        condicion: null,
        comentario: 'La caída de un 17 % desde el máximo de abril se explica por hechos conocidos: una guía del 1T26 que no entusiasmó, la compra de NSI con deuda, la presión sobre el margen y el miedo sectorial a los centros de datos. No hay ningún hecho pendiente ajeno al análisis (colocación, ampliación, litigio, oferta) que pueda mover el precio más de un 5 %: el veredicto es «no cambia». Los resultados del 27-oct no aplazan la decisión (regla 11). La decisión la marca la valoración, no el movimiento del precio.',
      },
    },
  },
  resumen: {
    recomendacion: 'Mantener', conviccion: 'Media', justificacion_recomendacion: null, horizonte: '12 meses',
    sintesis: `**La recomendación y por qué.** Mantener, convicción media. El objetivo a 12 meses es de 516,13 USD frente a un precio de 473,37: una rentabilidad ponderada del 10,2 % y del 11,5 % en el caso base, con dividendo, por debajo del 15 % que pide una compra. El valor intrínseco es de 346,00 USD, un 26,9 % por debajo del precio, y el objetivo medio de los analistas (560,58) queda por encima de nuestro caso base. Es una gran empresa a un precio que ya descuenta el ciclo de la red eléctrica. La convicción es media porque las dos reglas coinciden y la rentabilidad está lejos de los umbrales; subiría si el precio bajara de 346,00 o si el orgánico se mantuviera por encima del 10 % en 2027.

**El negocio.** Hubbell vende componentes pequeños y críticos para la red eléctrica de EE. UU. (63 % de las ventas) y material eléctrico para edificios, industria y centros de datos (37 %) [A1]. El ROIC del 18,6 % en 2025 supera en 9 puntos al WACC del 9,48 %, con un margen operativo que subió del 12,7 % al 20,7 % en cuatro años gracias al poder de precios [A1]. La calidad de la empresa sostiene el crecimiento que proyectamos (sostenibilidad «Sí»): un 7,7 % medio, con orgánico del 5-7 % desde 2028, por debajo del 10 % actual.

**Sector y ciclo.** Las eléctricas privadas de EE. UU. invirtieron ≈208.000 M en 2025 y prevén más de 1,1 billones en 2025-2029 [B2]. Es la fase alta de un ciclo que en 2024 dejó el orgánico de Hubbell en el 0 %.

**Finanzas.** La compra de NSI (3.008 M, 15,5x EBITDA) llevó la deuda neta a ≈3,1x EBITDA y el fondo de comercio e intangibles a 1,9 veces el patrimonio [A4]. Con ella, el ROIC bajará al 12-13 % en 2026-2027: solo 3 puntos por encima del WACC. El flujo de caja es sólido: 875 M de FCF en 2025.

**Equipo y gobierno.** Equipo estable que cumple la guía y la ha subido dos veces en 2026 [C4]. Resta que el incentivo use BPA ajustado sin amortización de compras ni métrica de ROIC, y que los directivos vendieran 20,4 M en 12 meses [C1, C3].

**Valoración.** El DCF da 317,82 USD. El DCF inverso pide un crecimiento del 14,0 % anual frente al 6,4 % de nuestro base, y la rentabilidad implícita en el precio es del 7,7 %, por debajo del WACC y del 8,4 % que pide el mercado. Con la prima del mercado, el valor sube a 418,73: todavía por debajo del precio. Los comparables (540-650 USD) explican el precio: el mercado paga por Hubbell lo mismo que por el sector de la electrificación, no lo que valen sus flujos. A 12 meses el PER adelantado (23,8x) está en su media de cinco años (22,9x), de ahí el 10,2 %.

**Riesgos y catalizadores.** Los dos riesgos mayores son un frenazo de los centros de datos o de las eléctricas (bajista a 12 meses −30,3 %) y que NSI no rinda lo pagado. Catalizador: resultados del 3T26 el 27-oct. Riesgo de IA para el negocio: bajo; es más bien fuente de demanda. Los foros están más entusiasmados que los datos.

**Qué cambiaría la decisión.** Comprar por debajo de 346,00 USD (ponderada ≥ 15 %, base ≥ 12 % y precio bajo el valor intrínseco); vender o reducir por encima de 579,78. Una guía de 2027 con orgánico de dos cifras y margen ajustado al alza subiría el BPA y el objetivo; una cartera de pedidos que caiga interanualmente nos llevaría al bajista.`,
    tesis: 'Hubbell es un fabricante de componentes críticos para la red eléctrica y el material eléctrico de EE. UU., con un margen operativo del 20,7 %, un ROIC del 18,6 % y un orgánico que se ha acelerado al 10 % por la inversión en transmisión, subestaciones y centros de datos [A1, A3].\n\nEl precio descuenta mucho: el DCF inverso pide un 14,0 % de crecimiento anual durante siete años, el doble de nuestro base y de su historia, y la acción cotiza a 20,1x el EBITDA de los últimos 12 meses, por encima de lo que pagan los compradores en el sector (≈13x) [D7]. El PER adelantado de 23,8x está en su media de cinco años.\n\nEl mercado acierta en la calidad y en el ciclo, pero paga como si el ciclo fuera permanente. Para invertir hay que creer que la red de EE. UU. crecerá a dos cifras durante años sin el bache de inventarios que hubo en 2024 y que NSI rendirá lo pagado. Con la regla de múltiplos el objetivo a 12 meses da un 10,2 %: suficiente para mantener, no para comprar.',
    vision_diferencial: {
      mercado_descuenta: 'Que Hubbell es una beneficiaria duradera de la electrificación y de los centros de datos, con crecimiento de dos cifras durante muchos años: por eso la paga a 20x EBITDA y los analistas esperan 560 USD.',
      nuestra_vision: 'Coincidimos en el negocio y en el ciclo de 2026-2027, pero creemos que el crecimiento orgánico volverá al 5-7 % y que NSI baja el ROIC. A 12 meses el precio puede subir un 10 %; a largo plazo, los flujos valen unos 320-420 USD.',
      por_que: 'La historia de Hubbell es cíclica (orgánico 0 % en 2024) y la inversión de las eléctricas depende de tipos y reguladores. Con el bono al 5,21 %, pagar un 7,7 % de rentabilidad implícita no compensa.',
    },
    a_favor: [
      '**Ciclo de inversión en la red**: las eléctricas de EE. UU. prevén más de 1,1 billones de USD en 2025-2029 [B2].',
      '**Orgánico acelerado**: +10,2 % en el 2T26 y guía de +9-11 % para 2026 [A3].',
      '**Calidad**: ROIC del 18,6 % y margen operativo del 20,7 % en 2025, máximo de su historia [A1].',
      '**Caja**: 875 M de FCF en 2025 y conversión de ≈90 % del beneficio ajustado [A1, A3].',
      '**Gobierno limpio**: una acción un voto, 10 de 11 consejeros independientes [C1].',
    ],
    en_contra: [
      '**Valoración**: valor intrínseco de 346,00 USD, un 26,9 % por debajo del precio; el DCF inverso pide un 14,0 % de crecimiento anual.',
      '**NSI cara y con deuda**: 3.008 M a 15,5x EBITDA; deuda neta a ≈3,1x EBITDA [A4, A9].',
      '**ROIC a la baja**: tras NSI, ≈12-13 %, solo 3 puntos sobre el WACC (estimación propia).',
      '**Margen presionado**: margen ajustado −50 pb en el 2T26 por aranceles e inflación [A3].',
      '**Ventas de directivos**: 20,4 M USD en 12 meses, 12,6 M del consejero delegado [C3].',
    ],
    que_vigilar: 'La tesis depende de que la inversión en transmisión, subestaciones y centros de datos se mantenga dos o tres años más. La señal de que no se cumple sería una cartera de pedidos que cae interanualmente o un orgánico de Electrical Solutions por debajo del 5 %. En NSI, que el margen de Electrical Solutions se mantenga por encima del 20 % ajustado.',
    cambiaria_recomendacion: [
      'Si el precio baja de 346,00 USD, pasaríamos a Comprar (ponderada ≥ 15 %, base ≥ 12 % y precio bajo el valor intrínseco).',
      'Si sube por encima de 579,78 USD, Vender o reducir (ponderada ≤ −10 %).',
      'Si la guía de 2027 (feb-2027) supone un BPA GAAP por encima de 21 USD, subiríamos el objetivo un 5 %.',
      'Si el orgánico del grupo baja del 3 % en dos trimestres seguidos, pasaríamos al escenario bajista.',
    ],
    kpis_seguimiento: [
      { kpi: 'Crecimiento orgánico del grupo', nivel_actual: '+10,2 % (2T26)', umbral_alerta: '< 3 %', por_que: 'Separa el ciclo de la tesis estructural.' },
      { kpi: 'Cartera de pedidos', nivel_actual: '2.159 M (dic-25, +13,8 %)', umbral_alerta: 'Caída interanual', por_que: 'Anticipa el ciclo de inventarios.' },
      { kpi: 'Margen operativo ajustado', nivel_actual: '23,9 % (2T26)', umbral_alerta: '< 22 %', por_que: 'Poder de precios frente a aranceles.' },
      { kpi: 'Deuda neta / EBITDA', nivel_actual: '≈3,1x (jun-26)', umbral_alerta: '> 3,0x a dic-27', por_que: 'Capacidad de recompras y riesgo financiero.' },
      { kpi: 'Orgánico de Electrical Solutions', nivel_actual: '+18,3 % (2T26)', umbral_alerta: '< 5 %', por_que: 'Exposición a centros de datos.' },
    ],
  },
};
