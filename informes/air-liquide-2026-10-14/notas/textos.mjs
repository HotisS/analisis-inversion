// Textos del analista (Air Liquide, corte 2026-10-14). Citas con la letra de la nota.
export default {
  limitaciones: 'Análisis hecho desde la nube. Esta vez la red sí dejó descargar documentos: las cuentas de 2020-2024 salen del XBRL ESEF del regulador (filings.xbrl.org), las de 2025 del comunicado de resultados con estados completos y las del 1S26 del informe semestral, leídos enteros; el precio, los cierres anuales y la beta, de Yahoo Finance (bolsa.mjs); el consenso y los comparables, de Stock Analysis (14-oct-26). No se pudo abrir el documento de registro de 2025 (vencimientos de deuda, rating, derechos de voto, plan a largo plazo) ni MarketScreener. Cotiza solo en Euronext París, en EUR; NIIF-UE, cuenta por naturaleza (coste_ventas = compras). Precio: cierre del 14-oct-26 (170,34 EUR). BPA, DPA y acciones en acciones de hoy: los publicados se dividen entre 1,1 por cada atribución gratuita de 1 acción por 10 (jun-2022, jun-2024 y jun-2026). Segmentos solo de 2024-2025 (la empresa fusionó GM&T e Ingeniería en 2025). El BPA del objetivo a 12 meses y el PER histórico están en base recurrente de la empresa (sin partidas no recurrentes). Ficha sectorial de gases en notas/ficha-sector-gases-industriales.md.',

  controles_explicados: [
    { control: 'Circulante del primer año', explicacion: 'El salto del 7,4 % al 11 % de las ventas es real: en el 1S26 Air Liquide terminó sus programas de factoring y los clientes subieron 1.042 M [A2]. El factoring era financiación fuera de balance; al acabar, la caja de 2026 lo devuelve y la deuda neta lo recoge. Por eso el circulante se fija en el 11 % desde 2026 en vez de converger.' },
  ],

  parches: [],
  huecos_resueltos: [],

  secciones: {
    multiplos_historicos: {
      comentario: 'Con el BPA recurrente en acciones de hoy, el PER adelantado (cierre del año ÷ BPA recurrente del año siguiente) ha ido de 20,9x (2022, con la energía cara y Rusia) a 26,7x (2023), con una mediana de 23,4x en 2021-2025 [D8, A1]. Hoy cotiza a 24,8x nuestro BPA de 2027e: algo por encima de su historia, sin descuento que recuperar. El múltiplo ya recoge parte del plan BEYOND y de la recompra anunciada el 5-oct [D2]. La tasa libre en euros ha pasado de ≈0 % en 2020-2021 al 3,5 % [D15]: eso debería pesar sobre el PER y no lo ha hecho.',
    },
    comparables: {
      comentario: 'Air Liquide cotiza a ≈24-25x el BPA de los próximos 12 meses, por debajo de Linde (26,3x), SOL (27,8x) y Atlas Copco (29,4x) y por encima de Air Products (20,3x) y Nippon Sanso (16,1x) [D9-D13]. El descuento frente a Linde se explica por el margen: EBITDA del 30 % frente al 39 % y ROIC del 11 % frente al 12 % [D9]. El plan BEYOND busca cerrar esa distancia (+400-600 pb de margen operativo hasta 2030) [D2]; si lo consigue, el múltiplo podría acercarse al de Linde, y ese es el escenario alcista. Por EV/EBITDA de los últimos 12 meses (15,0x) está en la mediana del grupo.',
    },
    bolsa: {
      comentario: 'La acción sube un 16,9 % en el año frente al −3,4 % del CAC 40 (rentabilidades de precio, sin dividendos), y un 9,7 % anual en cinco años frente al 3,3 % del índice [D8]. La subida de 2026 llega con la mejora del margen, la compra de DIG Airgas y, desde finales de agosto, la entrada de Elliott y la expectativa de recompras, que se confirmaron el 5-oct con el plan BEYOND [D2]. Tras el día del inversor la acción cayó desde ≈175 a 167 EUR en tres sesiones con el mercado francés débil. Beta de 0,83 frente al CAC 40 (mensual, cinco años) y volatilidad del 17,7 %: un valor defensivo, con una caída máxima del 23 % en 2022.',
    },
    capital: {
      comentario: 'Buena asignadora de capital con un cambio de rumbo. En 2020-2025 el grupo generó ≈36.000 M de flujo operativo y los usó en capex (≈19.600 M), dividendos (≈9.300 M) y compras pequeñas, con recompras casi simbólicas y dilución nula: las acciones solo crecen por las atribuciones gratuitas, que no diluyen [A1, A3]. El ROIC subió del 9,7 % al 11,2 % y el ROIC incremental histórico es del 18 %: el capital nuevo ha rendido. En 2026 cambian dos cosas: la compra de DIG Airgas (≈3.000 M con deuda, la mayor desde Airgas) y la primera recompra grande (4.000 M hasta 2028), que con Elliott en el capital desplaza la prioridad hacia el accionista [A2, A6]. La deuda neta pasará de ≈1,1 veces el EBITDA (2025) a ≈2 veces: aún holgada.',
    },
    calidad: {
      comentario: 'Cuentas auditadas por PwC y KPMG sin salvedades; la revisión limitada del 1S26 tampoco tiene salvedades [A2]. Los tres indicadores del motor son sanos: Altman Z de 3,98 (lejos de la zona de riesgo), Piotroski F de 7 sobre 9 y Beneish M de −2,83 (por debajo del umbral de manipulación de −1,78). Lo que hay que vigilar es la frontera entre recurrente y no recurrente: la empresa saca de su beneficio recurrente entre 140 M y 570 M al año de deterioros y reestructuraciones, y en 2025 también el recargo fiscal francés (49,9 M) [A1]. Como se repiten, el DCF los trata en parte como gasto normal. Los intereses se capitalizan en las obras en curso (norma habitual) y el fin del factoring en 2026 cambia la comparabilidad de la caja operativa [A2]. Los pagos en acciones son pequeños (≈40-67 M al año) [A3].',
    },
    financieros: {},
  },

  rentabilidad_comentario: 'El ROIC que calcula el motor sube del 9,7 % (2020) al 11,2 % (2025), por encima del WACC (7,51 %) en 3,7 puntos: crea valor, pero menos de los 5 puntos que pide la regla de compra. La propia empresa da un ROCE recurrente después de impuestos del 11,2 % en 2025 y del 11,0 % en el 1S26 [A1, A2]. Lo mueve el margen (operativo recurrente del 18,5 % al 20,7 %), no la rotación (0,49-0,62 veces), y el capital incluye ≈13.800 M de fondo de comercio, sobre todo de Airgas. El ROIC incremental histórico (18 %) muestra que el crecimiento reciente ha sido rentable. Frente a Linde (≈12 % con un fondo de comercio mucho mayor) el rendimiento es parecido; frente a Air Products y Nippon Sanso (7-9 %), mejor [D9-D11]. La compra de DIG Airgas (≈3.000 M) rebajará el ROIC de 2026 unas décimas.',

  dcf_justificacion: {
    crecimiento: 'Las ventas comparables crecieron un 2,0 % en 2025 y un 2,6 % en el 1S26, con el 2T26 en +3,5 % [A1, A2]. En 2026 se fija un 3,0 % publicado (perímetro de DIG Airgas +1,7 %, divisa negativa y +3-4 % comparable; la empresa espera un segundo semestre similar o algo mejor) [A2]. Después, 5 % en 2027-2028, el centro del objetivo de BEYOND (5 % ±1) [D2], con la cartera de 6.000 M que arranca en el 4T26-2028 [A2], bajando al 3 % en 2034-2035. El consenso de 2026 (28.200 M) está un 1,6 % por encima del nuestro (27.748 M) [D3].',
    margenes: 'Margen EBITDA recurrente del 30,2 % en 2025 (8.145 M) [A1]. El DCF usa ese margen menos 0,8 puntos, porque Air Liquide registra cada año entre 140 M y 570 M de gastos «no recurrentes» [A1, A3]. Se proyecta 30,4 % en 2026 (guía: +100 pb de margen operativo), 31,2 % en 2027 (+100 pb de guía, de los que tomamos 80) y 32,4 % desde 2030. Eso supone ≈+270 pb de margen operativo entre 2025 y 2030, por debajo de los +400-600 pb del plan BEYOND [D2]: no damos el plan por hecho.',
    inversion: 'Capex industrial del 14,3 % de las ventas en 2025 (3.843 M) [A1]; se proyecta 14,0-14,5 % en 2026-2029 por la cartera de 6.000 M y baja al 11,5 % en 2035, por encima de la amortización (10 %). La amortización sube del 9,5 % al 9,7 % por la de los intangibles de DIG Airgas [A2]. Circulante del 11 % de las ventas desde 2026 por el fin del factoring (7,4 % en 2025). Tipo impositivo del 26 % (26,4 % en el 1S26) [A2]. La compra de DIG Airgas ya está pagada y en la deuda del puente.',
    wacc: 'Tasa libre: Bund a 10 años, 3,51 % el 14-oct-26 [D15]; los flujos van en EUR. Beta de 0,85: entre la mensual de cinco años frente al CAC 40 (0,83) y la ajustada (0,89) [D8]. Prima de mercado del 5,5 %, sin prima adicional (el 80 % de las ventas está fuera de Francia). Coste de la deuda antes de impuestos del 3,5 % (coste medio de la deuda neta del 3,0 % en el 1S26 y emisiones recientes al 2,9-3,5 %) [A2]. Peso de la deuda del 12 % a valor de mercado. WACC del 7,51 %. Con la prima implícita del mercado (4,20 %) [D16], el coste de los fondos propios baja a ≈7,1 %.',
    terminal: 'Gordon con un 2,5 % de crecimiento en EUR (≈2 % de inflación y ≈0,5 % real), por debajo de la tasa libre menos medio punto (3,0 %). El múltiplo de salida de referencia es 14x el EBITDA, entre las compras del sector (10-13x) y el múltiplo actual (15,0x) [D5, D6].',
  },

  puente_comentarios: {
    '2026e': 'Guía y 1S26: +2,6 % comparable con +4,2 % de precio en Industrial Merchant, +1,7 % de perímetro (DIG Airgas menos el biogás) y divisa negativa [A2].',
    '2027e': 'Año completo de DIG Airgas, arranques de la cartera (transición energética en Europa y electrónica en Asia) y precio en línea con la historia [A2].',
    '2028e': 'Arranques de la cartera de 6.000 M y electrónica; precio ≈2 %.',
    '2029e': 'Volumen industrial normal y electrónica; precio ≈2 %.',
    '2030e': 'Igual que 2029, en el centro del objetivo de BEYOND (5 % ±1) [D2].',
  },
  veredicto: 'Sí',
  sostenibilidad_justificacion: 'El crecimiento proyectado (3,9 % de media) es financiable: la reinversión (25 % del NOPAT) al ROIC actual (11,2 %) financia un 2,8 % anual, y de nuestro crecimiento ≈2 puntos son precio, que no consume capital; el volumen medio (≈2,3 %) queda por debajo. El capital nuevo rendiría un 17,1 %, por debajo del ROIC incremental histórico (18 %), y la cuota bajaría del 28,1 % al 25,3 %: la proyección es conservadora frente al mercado. El foso (contratos de 15-20 años, densidad local) y el poder de precios demostrado (+4 % en Industrial Merchant en 2025-2026) lo sostienen [A1, A2]. Veredicto: sí.',

  dcf_lectura: 'El DCF da 114,10 EUR por acción, un 33 % por debajo del precio, con un WACC del 7,51 % y el 69 % del valor en el terminal. El DCF inverso es la lectura central: para justificar 170,34 EUR con nuestro margen, el precio pide un crecimiento de las ventas del 9,1 % anual en 2027-2035, más del doble de nuestro caso base (4,0 %) y casi el doble del objetivo de BEYOND (5 % ±1); o, con nuestro crecimiento, aceptar una rentabilidad del 6,1 %, por debajo de nuestro WACC. Hay dos matices. El margen: si se cumple BEYOND (+400-600 pb hasta 2030), el margen EBITDA llegaría al 34-36 % y el valor subiría ≈15-25 % (estimación propia), aún por debajo del precio. Y la caja: el capex del 14 % de las ventas deprime el flujo libre de hoy (rentabilidad del 1,1 %) para volumen contratado a 15-20 años. El mercado paga a Air Liquide, como a Linde, como un bono de crecimiento seguro, no por su caja.',
  narrativas: {
    Bajista: 'La industria europea y china sigue débil, el helio y la electrónica se frenan y el plan de eficiencias no basta: crecimiento 2 puntos menor y margen 1 punto más bajo, como en 2023-2024 con el volumen plano.',
    Base: 'La cartera de 6.000 M arranca en 2026-2028, el precio sigue a la inflación y el margen operativo sube ≈+100 pb en 2026 y +80 pb en 2027; la recompra de 4.000 M reduce las acciones ≈2,5 % de media en 2028.',
    Alcista: 'Se cumple el ritmo de BEYOND: electrónica para IA y transición energética empujan el volumen y el margen sube más: crecimiento 1 punto mayor y margen 0,6 puntos más alto.',
  },
  escenarios_comentario: 'En valor intrínseco los tres escenarios quedan por debajo del precio (82,75, 114,10 y 128,56 EUR), así que la asimetría del DCF no aporta. La que importa es la del objetivo a 12 meses: el bajista pierde un 20,8 % (PER de 19,3x, el base × 0,80, sobre 6,82 EUR de BPA) y el alcista gana un 23,2 % (26,3x, la mediana de los comparables, sobre 7,85 EUR); asimetría de 0,93x. Con las probabilidades 25/50/25, la ponderada queda por debajo del 15 % que pide la regla de compra.',
  suma_partes_comentario: 'No aplica: las regiones de Gases y Servicios tienen el mismo perfil, y Sanidad y Electrónica no se publican con resultado propio; Ingeniería pesa el 3 % de las ventas.',

  objetivo_12m: {
    ejercicio: '2028e',
    casos: [
      { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: 6.82, multiplo: null, precio: null, justificacion: 'Ventas de 29.438 M (+3 % en 2026 y +3 % en 2027-2028) y margen operativo recurrente del 21,8 % (+110 pb sobre 2025): 6.418 M; 520 M de resultado financiero (más deuda por la recompra), impuesto del 26 %, 130 M de minoritarios y 621 M de acciones (recompra anunciada de 4.000 M a ≈185 EUR, media de 2028).' },
      { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: 7.47, multiplo: null, precio: null, justificacion: 'Ventas de 30.593 M (+3 %, +5 % y +5 %) y margen operativo recurrente del 22,8 % (+210 pb sobre 2025, la mitad del plan BEYOND a 2030): 6.975 M; 520 M de resultado financiero, impuesto del 26 %, 135 M de minoritarios y 621 M de acciones con la recompra anunciada.' },
      { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: 7.85, multiplo: null, precio: null, justificacion: 'Ventas de 31.178 M (+6 % en 2027-2028 por electrónica y arranques) y margen operativo recurrente del 23,4 %: 7.296 M; el resto igual que el base (140 M de minoritarios).' },
    ],
    per_historico: {
      base: 'adelantado',
      actual: 24.8, mediana_5a: 23.4, minimo_5a: 20.9, media_larga: 23.9,
      excluidos: 'PER adelantado = cierre del año ÷ BPA recurrente del año siguiente en acciones de hoy (misma base que los escenarios): 2020 24,8x (100,86 ÷ 4,07, BPA publicado de 2021 porque no se obtuvo el recurrente); 2021 23,1x (115,19 ÷ 4,99); 2022 20,9x (109,42 ÷ 5,23); 2023 26,7x (145,55 ÷ 5,45); 2024 24,6x (142,65 ÷ 5,80); 2025 23,4x (145,69 ÷ 6,23, nuestro BPA de 2026e) [D8, A1]. Sin excluidos. Mediana y mínimo de 2021-2025; media larga de 2020-2025 (seis años). Actual = 170,34 ÷ 6,86 (nuestro BPA recurrente de 2027e).',
    },
    comparables_per: { mediana: 26.3 },
    consenso: { bpa_ano1: 6.40, bpa_ano2: 7.18, objetivo_medio: 197.83, objetivo_min: 162, objetivo_max: 216, analistas: 20, tendencia_3m: 'estables', fuente: 'Stock Analysis (S&P Global) y MarketScreener [D3, D4]' },
    diferencia_consenso: 'Nuestro BPA de 2026e (6,23 EUR) queda un 2,7 % por debajo del consenso (6,40) y el de 2027e (6,86) un 4,5 % por debajo (7,18) [D3]. La diferencia sale del margen: tomamos 80 de los 100 pb de mejora prometidos para 2027 y no damos por hecho el plan BEYOND; sí contamos la recompra anunciada. El precio base (≈180 EUR) queda un 9 % por debajo del objetivo medio de los analistas (197,83 EUR): ellos aplican ≈26-27x a un BPA mayor; nosotros, el PER a mitad de camino hacia la mediana histórica (≈24x).',
    media: null,
    comentario: 'El valor intrínseco queda muy por debajo del precio y del objetivo a 12 meses: el sector entero cotiza por encima de su DCF con tipos al 3,5 %. No hay catalizador que cierre esa distancia en un año; al contrario, la recompra, Elliott y el plan BEYOND sostienen el múltiplo. Por eso la recomendación sigue al objetivo a 12 meses, con el valor intrínseco como aviso de que no hay margen de seguridad. La tesis de valor es a varios años y depende de que el margen operativo llegue al 25-27 % en 2030.',
  },
  valoracion_comentario: 'Pesos: DCF 50 %, comparables 25 % y escenarios 25 %; transacciones y suma de partes, 0 (las compras con múltiplo son antiguas y Air Liquide no es objetivo de compra verosímil). El DCF es el método más fiable para un negocio de contratos largos, pero con la tasa libre al 3,5 % y el capex del 14 % da un valor muy inferior al precio; los comparables por PER (mediana de 26,3x) y por EV/EBITDA se acercan más porque todo el sector cotiza caro frente a su caja. La dispersión entre métodos es grande y casi todos quedan por debajo de la cotización: el precio descuenta una mejora de margen que el DCF solo recoge en parte.',
  catalizadores: {
    items: [
      { fecha: '23-oct-2026 (estimada)', evento: 'Ventas del 3T26', efecto: 'Prueba de si el crecimiento comparable se mantiene en ≥3 % y de la recuperación del helio', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '4T26-2027', evento: 'Inicio de la recompra de 4.000 M', efecto: 'Reduce ≈3,6 % las acciones hasta 2028; Elliott pide empezar ya [D2]', probabilidad: 'Alta', sentido: '+' },
      { fecha: 'Febrero de 2027', evento: 'Resultados de 2026 y guía de 2027', efecto: 'Confirmación de +100 pb de margen en 2026 y del objetivo de 2027 [A2]', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '4T26-2028', evento: 'Arranques de la cartera de 6.000 M (electrónica en Asia, transición energética en Europa)', efecto: 'Volumen contratado que sostiene el 5 % de crecimiento [A2]', probabilidad: 'Alta', sentido: '+' },
      { fecha: 'Primavera de 2027', evento: 'Elecciones presidenciales en Francia', efecto: 'Riesgo fiscal (el recargo de 2025 costó 49,9 M) y de prima de riesgo francesa [A1]', probabilidad: 'Media', sentido: '−' },
    ],
    confianza: 'Media',
  },
  riesgos: {
    items: [
      { riesgo: 'Múltiplo alto con tipos al 3,5 %', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−15 % si el PER adelantado vuelve a su mínimo de cinco años (20,9x)', mitigante: 'BPA recurrente que crece ≈8-10 % al año y recompra', senal: 'PER adelantado por debajo de 22x sin cambio en el BPA' },
      { riesgo: 'Plan BEYOND sin el margen prometido', tipo: 'Operativo', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '≈−6 % por cada punto de margen EBITDA', mitigante: 'Eficiencias récord (631 M en 2025, 299 M en el 1S26) [A1, A2]', senal: 'Margen operativo de 2026 por debajo del 21,5 %' },
      { riesgo: 'Volumen industrial débil en Europa y China', tipo: 'Cíclico', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'Escenario bajista del objetivo a 12 meses (−20,8 %)', mitigante: 'Contratos con pagos mínimos; sanidad y electrónica', senal: 'Grandes Industrias negativa en EMEA dos trimestres más' },
      { riesgo: 'Deuda y recompra', tipo: 'Financiero', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: 'Limitado: deuda neta de ≈1,7x el EBITDA, ≈2,2x con la recompra', mitigante: 'Coste medio de la deuda del 3 % [A2]', senal: 'Deuda neta por encima de 2,5x el EBITDA' },
      { riesgo: 'Fiscalidad y política francesa', tipo: 'Regulatorio', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '≈−1 % por cada recargo como el de 2025 (49,9 M)', mitigante: 'Más del 80 % de las ventas fuera de Francia', senal: 'Nuevos recargos sobre grandes empresas en el presupuesto de 2027' },
      { riesgo: 'Electrónica cíclica y concentrada', tipo: 'Negocio', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−3 % si Electrónica cae un 10 %', mitigante: 'Contratos largos de gases portadores', senal: 'Recortes de inversión de SK hynix, TSMC o Samsung' },
    ],
    premortem: 'Octubre de 2029: la acción ha perdido un 40 %. La historia más probable no es un desastre operativo sino un cambio de múltiplo combinado con un plan que se queda corto. El margen operativo subió hasta el 22 % en 2027 y se paró: los costes de energía y personal en Europa crecieron más que el precio, y el cierre de plantas químicas restó volumen de Grandes Industrias. El BPA recurrente creció al 6 % y no al 10 % de BEYOND, y parte del crecimiento vino de la recompra con deuda. Elliott vendió tras la recompra. Con el Bund en el 3,5-4 % y la prima francesa al alza tras las elecciones, el mercado dejó de pagar 25x por un 6 % de crecimiento y el PER bajó a ≈17x, el de Nippon Sanso. Los indicadores que lo habrían anticipado: un margen de 2026 por debajo de +100 pb y una guía de 2027 sin la mejora prometida.',
    confianza: 'Media',
  },
  preguntas: {
    items: [
      { tema: 'Margen', pregunta: '¿Desde qué base se miden los +400-600 pb de BEYOND y cuánto viene de eficiencias, de precio y de mezcla (electrónica)?', por_que: 'Es la diferencia entre nuestro BPA y el del consenso.' },
      { tema: 'Recompra', pregunta: '¿Calendario de la recompra de 4.000 M y nivel máximo de deuda neta / EBITDA que aceptan?', por_que: 'Decide el BPA de 2027-2028 y el riesgo financiero.' },
      { tema: 'DIG Airgas', pregunta: '¿Qué EBITDA y qué rendimiento sobre el capital esperan de DIG Airgas en 2027?', por_que: 'Son ≈3.000 M, el 8 % del capital invertido.' },
      { tema: 'No recurrentes', pregunta: '¿Por qué hay gastos no recurrentes todos los años (140-570 M) y cuándo terminan las reestructuraciones europeas?', por_que: 'El BPA recurrente los excluye; el accionista los paga.' },
      { tema: 'Elliott', pregunta: '¿Qué participación tiene Elliott y qué ha pedido además de la recompra?', por_que: 'Puede forzar cambios de cartera (venta de Sanidad u otros negocios).' },
      { tema: 'Helio', pregunta: '¿Cuándo vuelve la fuente de helio cortada por el conflicto de Oriente Medio y cuánto restó al volumen del 1S26?', por_que: 'Explica parte del volumen débil de Industrial Merchant.' },
    ],
    confianza: 'Media',
  },
  fuentes: [],
  huecos: [],
};
