// Textos del analista (Linde plc, corte 2026-10-14). Citas con la letra de la nota.
export default {
  limitaciones: 'Análisis hecho desde la nube con la red limitada a la búsqueda web: sec.gov, la web de inversores de Linde y los proveedores de datos no se pudieron abrir, así que las cifras salen de los extractos de búsqueda de los comunicados de resultados, del 10-K y del informe anual, y de agregadores (Stock Analysis, Macrotrends, Stockopedia, Barchart), cruzadas cuando fue posible; lo que no cuadró está en null y en los huecos. Confianza de los datos de núcleo: media en la cuenta de resultados y los flujos (cifras de la empresa), baja en balance (2021-2023 incompleto, de agregadores), comparables (solo PER, de fechas distintas) y bolsa (sin beta ni serie diaria). Cotiza solo en Nasdaq (LIN), en USD; cuentas en US GAAP, ejercicio natural. Precio: cierre del 13-oct-26 (492,11 USD), porque el 14-oct la sesión no había cerrado. Acciones diluidas: 464,6 M (beneficio neto del 2T26 ÷ BPA diluido). Minoritarios del puente estimados (160 M de beneficio × 15). El BPA del objetivo a 12 meses y el PER histórico están en base ajustada de la empresa (sin la amortización de la compra de Linde AG ni los cargos de reestructuración).',

  controles_explicados: [
    { control: 'Rendimiento del capital nuevo', explicacion: 'El ROIC del motor (11,6 %) incluye ≈27.900 M de fondo de comercio de la fusión de 2018 por canje de acciones, que no se repone, y el ROIC incremental histórico (4,9 %) compara un EBIT de 2021 hundido por la amortización de la compra con el de 2025. Sin ese fondo de comercio, el capital invertido es ≈33.700 M y el NOPAT ajustado de 2025 ≈7.760 M: ≈23 %, y 1,25 veces eso (≈29 %) queda por encima del 21,6 % que supone la proyección. Además, 2,5 de los ≈4,5 puntos de crecimiento son precio, que no consume capital. Aun así se rebajó el caso base (crecimiento de 2027-2028 del 6 % al 5,5 % y margen plano en ≈38 % en vez de subir al 39 %) y el veredicto es «En parte».' },
    { control: 'Al menos 5 comparables', explicacion: 'Solo hay cuatro cotizadas con PER adelantado obtenible desde la nube (Air Liquide, Air Products, Nippon Sanso y Atlas Copco); el sector cotizado de gases tiene tres grandes y no hay más comparables puros. El peso de comparables en la síntesis es del 25 %.' },
  ],

  parches: [],
  huecos_resueltos: [],

  secciones: {
    multiplos_historicos: {
      comentario: 'Con el BPA publicado (US GAAP) el PER parece caro (≈34x el de 2025), pero está inflado por la amortización de la compra de Linde AG. En base ajustada, el PER adelantado (cierre del año ÷ BPA ajustado del año siguiente) ha ido de 23,0x (2022) a 27,5x (2021), con una mediana de 25,4x en 2020-2024 [D8, D9, A1, A15]. Hoy cotiza a 26,7x nuestro BPA de 2027e: ligeramente por encima de su historia, sin descuento que recuperar. Lo estructural no ha cambiado (contratos, poder de precios), pero la tasa libre ha subido del ≈1,5 % de 2020-2021 al 5,2 %, lo que debería pesar sobre el múltiplo.',
    },
    comparables: {
      comentario: 'Linde cotiza a ≈26-27x el BPA de los próximos 12 meses, con prima frente a Air Liquide (23x), Air Products (20,6x, con deterioros por los proyectos de hidrógeno) y Nippon Sanso (16,2x), y por debajo de un industrial de calidad como Atlas Copco (28,3x) [D13, D14, D15, D16]. La prima frente a los otros gases (≈15-30 %) la justifican el margen más alto del sector (29,8 % ajustado), el historial de cumplimiento de la guía y la disciplina de no invertir sin contrato. Los datos de los comparables son de fechas distintas y solo PER; el valor implícito por comparables (mediana ≈21,8x) queda muy por debajo del precio y se pondera un 25 %.',
    },
  },

  rentabilidad_comentario: 'El ROIC que calcula el motor (11,6 % en 2025) está a ≈2 puntos del WACC (9,54 %), pero mide sobre un capital con ≈27.900 M de fondo de comercio de la fusión de 2018, hecha por canje de acciones. Sin ese fondo de comercio, el rendimiento del capital operativo es ≈23 % (NOPAT ajustado de ≈7.760 M sobre ≈33.700 M; estimación propia), muy por encima de los competidores: Air Products tiene pérdidas contables por los deterioros de hidrógeno [D14]. Lo mueve el margen (subidas de precio y productividad: margen ajustado del ≈24 % al 29,8 % desde la fusión), no la rotación. El ROIC incremental del motor (4,9 %) no es interpretable porque compara un EBIT de 2021 hundido por la amortización de la compra. Para el accionista que compra hoy, el ROIC relevante es el de la primera medida: ≈2 puntos sobre el WACC, menos de los 5 que pide la regla de compra.',

  dcf_justificacion: {
    crecimiento: 'Las ventas crecieron un 2,5 % anual de 2021 a 2025, con el volumen plano y la energía repercutida a la baja [A1, A2]. En 2026 crecen un 8-9 % (2 puntos de divisa y 1 de compras) y se fija un 7,5 % [A5, A6]. Después, 5,5 % en 2027-2028 (3 puntos de volumen apoyados en la cartera de ≈11.000 M de proyectos con contrato y 2,5 de precio, en línea con la historia), bajando al 3 % en 2034-2035. Es más que la historia reciente porque la cartera ha crecido un 39 % en seis meses y entra en producción en 2027-2029 [A16].',
    margenes: 'Margen EBITDA publicado de 37,3 % en 2025 (38,6 % ajustado, sin cargos de reestructuración) [A3, A4]. Se proyecta 37,6 % en 2026 y ≈38 % desde 2030, es decir, con los cargos recurrentes dentro y sin más expansión: el 2T26 mostró la primera caída del margen ajustado en años (−60 pb) [A6]. Se rebajó desde un primer supuesto del 39 % para cumplir la prueba de sostenibilidad.',
    inversion: 'Capex del 15 % de las ventas en 2026 (5.261 M y 15,5 % en 2025) y del 16 % en 2027-2030 por la cartera de proyectos, bajando al 13,5 % en 2035 [A9]. La amortización se toma con la de la compra de Linde AG (10,9 % de las ventas en 2026, 11,1 % en 2025), bajando al 10,3 %, coherente con la base contable del último ejercicio. Circulante sin variación (no se obtuvieron sus partidas).',
    wacc: 'Tasa libre: bono de EE. UU. a 10 años, 5,22 % el 13-oct-26 [D17]. Beta 0,9 (estimación: negocio defensivo con contratos; sin serie diaria para calcularla). Prima de mercado 5,5 %. Coste de la deuda antes de impuestos 5 % (marginal; el contable, ≈1 %, está rebajado por deuda en euros antigua e intereses capitalizados) y peso de la deuda del 10 % a valor de mercado. WACC del 9,54 %. Con la prima implícita del mercado (4,20 %) [D18], el coste de los fondos propios baja a ≈9,0 %.',
    terminal: 'Gordon con un 3 % de crecimiento en USD (1 % real más ≈2 % de inflación), por debajo de la tasa libre menos medio punto. El múltiplo de salida de referencia es 16x el EBITDA, entre las transacciones del sector (10-13x) y el múltiplo actual (≈18-20x).',
  },

  puente_comentarios: {
    '2026e': 'Guía y 1S26: +8-9 % de ventas con ≈2 puntos de divisa, ≈1 de compras (nexAir y distribuidores) y ≈4 de subyacente (precio y volumen) [A5, A6].',
    '2027e': 'Arranque de proyectos de la cartera (electrónica en Phoenix, química y energía en EE. UU.) y precio en línea con la inflación [A16].',
    '2028e': 'Igual que 2027: volumen de la cartera y precio.',
    '2029e': 'Menos aportación de la cartera; precio en línea con la historia.',
    '2030e': 'Volumen industrial normal (≈2,5 %) y precio.',
  },
  veredicto: 'En parte',
  sostenibilidad_justificacion: 'El crecimiento proyectado (≈4,2 % de media) se apoya en un foso amplio: contratos *on-site* a 15-20 años, densidad local y subidas de precio por encima de la inflación durante siete años [B6]. La prueba de cuota pasa (31,7 % hoy, 30,2 % en 2035). La de reinversión falla con las cifras del motor (el capital nuevo rendiría un 21,6 % frente a un ROIC de 11,6 %), pero ese ROIC incluye ≈27.900 M de fondo de comercio de la fusión; sin él, el rendimiento del capital operativo es ≈23 % y la proyección quedaría dentro de 1,25 veces ese nivel. Aun así se rebajó el base (crecimiento de 2027-2028 de 6 % a 5,5 % y margen plano en ≈38 %). Veredicto: en parte.',

  dcf_lectura: `El DCF da 181,26 USD por acción, un 63,2 % por debajo del precio, con un WACC del 9,54 % y el 59 % del valor en el terminal. Con la prima implícita del mercado (4,20 %) el valor sube a 227,63 USD: sigue un 54 % por debajo. El DCF inverso es la lectura central: para justificar 492,11 USD con nuestro margen, el precio pide un crecimiento de las ventas del 16,4 % anual en 2027-2035, casi cuatro veces el 4,2 % de nuestro caso base y seis veces el 2,5 % de 2021-2025; o, con nuestro crecimiento, una rentabilidad implícita del 5,9 %, por debajo de la tasa libre (5,22 %) más cualquier prima razonable. Es exigente frente a la historia. El matiz: el FCF de hoy (≈2,2 % de rentabilidad) está deprimido por un capex del 15-16 % de las ventas que crea volumen contratado a 15-20 años; aun con capex del 10 %, el DCF no llega a la mitad del precio. El mercado paga a Linde como un bono de crecimiento seguro, no por su caja.`,
  narrativas: {
    Bajista: 'La industria de Europa y China sigue débil, se cancelan o retrasan proyectos de hidrógeno y el margen sigue cediendo por costes y por las terapias a domicilio: crecimiento 2 puntos menor y margen 1,5 puntos más bajo, como en el 2T26 prolongado.',
    Base: 'La cartera de ≈11.000 M entra en producción en 2027-2029, el precio sigue a la inflación y el margen se mantiene en ≈38 % de EBITDA: el BPA ajustado crece ≈5-6 % al año sin recompras.',
    Alcista: 'La electrónica (fábricas de chips en EE. UU.) acelera el volumen, el negocio de terapias a domicilio se vende y el margen vuelve a subir: crecimiento 1,5 puntos mayor y margen 0,8 puntos más alto.',
  },
  escenarios_comentario: 'En valor intrínseco, los tres escenarios quedan muy por debajo del precio (128,93, 181,26 y 216,28 USD), así que la asimetría del DCF no aporta. La asimetría que importa es la del objetivo a 12 meses: el bajista pierde un 25,7 % (PER de 20,8x sobre 17,29 USD de BPA) y el alcista gana un 9,7 % (26,0x sobre 20,54 USD), porque la regla no paga en el alcista más múltiplo que el base (la historia y los comparables no lo justifican). Asimetría de 0,32x: no compensa.',
  suma_partes_comentario: 'No aplica: los segmentos regionales de gases tienen el mismo perfil y no hay comparables puros de la ingeniería que muevan el valor (≈7 % de las ventas).',

  objetivo_12m: {
    ejercicio: '2028e',
    casos: [
      { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: 17.29, multiplo: null, precio: null, justificacion: 'Ventas de 38.286 M (−2 puntos de crecimiento en 2027-2028) y margen EBITDA ajustado del 37,2 %: EBIT ajustado de 10.796 M, 500 M de intereses, 370 M de otros ingresos recurrentes (pensiones y participadas), impuesto del 23 %, 180 M de minoritarios y 464,6 M de acciones.' },
      { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: 19.41, multiplo: null, precio: null, justificacion: 'Ventas de 40.665 M (+7,5 %, +5,5 % y +5,5 %) y margen EBITDA ajustado del 38,7 % (el de 2025 sin expansión): EBIT ajustado de 12.077 M, 500 M de intereses, 370 M de otros ingresos, impuesto del 23 %, 180 M de minoritarios y 464,6 M de acciones, sin recompras.' },
      { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: 20.54, multiplo: null, precio: null, justificacion: 'Ventas de 41.830 M (+1,5 puntos de crecimiento por la electrónica) y margen EBITDA ajustado del 39,5 %: EBIT ajustado de 12.758 M y el resto igual que el base.' },
    ],
    per_historico: {
      base: 'adelantado',
      actual: 26.7, mediana_5a: 25.4, minimo_5a: 23.0, media_larga: 25.4,
      excluidos: 'PER adelantado = cierre del año ÷ BPA ajustado del año siguiente (misma base que los escenarios): 2020 24,6x (263,51 ÷ 10,69); 2021 27,5x (346,43 ÷ 12,59); 2022 23,0x (326,18 ÷ 14,20); 2023 26,5x (410,71 ÷ 15,51); 2024 25,4x (418,67 ÷ 16,46) [D8, D9, A1, A15]. 2025 no tiene aún el BPA real de 2026. No se excluye ningún año; antes de 2020 no hay BPA ajustado comparable (fusión de 2018). Media larga = media de 2020-2024. Actual = 492,11 ÷ 18,40 (nuestro BPA ajustado de 2027e).',
    },
    comparables_per: { mediana: 21.8 },
    consenso: { bpa_ano1: 17.88, bpa_ano2: 19.62, objetivo_medio: 545.14, objetivo_min: null, objetivo_max: 600, analistas: 14, tendencia_3m: 'estables', fuente: 'Barchart, MarketBeat y Yahoo Finance [D4, D5, D7]' },
    diferencia_consenso: 'Nuestro BPA de 2027e (18,40 USD) queda un 6 % por debajo del consenso (19,62) y el de 2028e (19,41) un 11 % por debajo del de KeyCorp (21,75), la única casa con 2028e. La diferencia sale sobre todo de las recompras (el método no cuenta las no anunciadas; Linde recompra ≈1,5 % del capital al año, ≈4 % hasta 2028) y de no suponer expansión del margen tras el 2T26. El precio base (≈505 USD) queda un 7 % por debajo del objetivo medio de los analistas (545 USD): ellos ponen ≈26-28x sobre un BPA mayor; nosotros, el PER a mitad de camino hacia la mediana histórica.',
    media: null,
    comentario: 'El valor intrínseco (239,77 USD de síntesis; 181,26 del DCF) queda un 51 % por debajo del precio y del objetivo a 12 meses (475,75 USD). No hay catalizador que cierre esa distancia en un año: el mercado lleva años pagando a Linde 25-27x su BPA adelantado y lo seguirá haciendo mientras el BPA crezca al 8-10 %. La tesis bajista (convergencia hacia el valor intrínseco) necesitaría un cambio de régimen del múltiplo, como el que ya sufrieron Air Products y Air Liquide (20-23x). Por eso la recomendación sigue al objetivo a 12 meses (Mantener), con el valor intrínseco como aviso de que no hay margen de seguridad.',
  },
  valoracion_comentario: 'Pesos: DCF 50 %, comparables 25 % y escenarios 25 %; transacciones y suma de partes, 0 (las compras del sector son antiguas y Linde no es objetivo de compra verosímil). El DCF es el método más fiable para un negocio de contratos largos, pero con la tasa libre al 5,22 % da un valor muy inferior a lo que el mercado paga; los comparables (PER de 21,8x de mediana, 419,62 USD) se acercan más al precio porque todo el sector cotiza caro frente a su caja. La dispersión entre métodos es grande (181-420 USD frente a 492 USD de precio) y todos quedan por debajo de la cotización: el precio descuenta una calidad que ninguna de las medidas de valor paga.',
  catalizadores: {
    items: [
      { fecha: '29-oct-2026', evento: 'Resultados del 3T26', efecto: 'Prueba de si el margen ajustado vuelve a ≥29,5 % y de si se cumple la guía de 4,45-4,55 USD', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: 'Febrero de 2027', evento: 'Resultados de 2026 y guía de 2027', efecto: 'La guía de BPA de 2027 marcará si el crecimiento vuelve a ≥8 %', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2026-2027', evento: 'Decisión sobre el negocio de terapias respiratorias a domicilio de EE. UU.', efecto: 'Una venta quitaría el principal lastre del margen [A6]', probabilidad: 'Media', sentido: '+' },
      { fecha: '2027-2028', evento: 'Arranque de proyectos de la cartera (Phoenix, química y energía en EE. UU.)', efecto: 'Volumen contratado que sostiene el crecimiento [A16]', probabilidad: 'Alta', sentido: '+' },
    ],
    confianza: 'Media',
  },
  riesgos: {
    items: [
      { riesgo: 'Múltiplo alto con tipos altos', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−20 % si el PER adelantado vuelve a su mínimo de cinco años (23x)', mitigante: 'Historial de crecimiento del BPA ajustado del 11 % anual en 2021-2025', senal: 'PER adelantado por debajo de 24x sin cambio en el BPA' },
      { riesgo: 'Fin de la expansión del margen', tipo: 'Operativo', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−8 % por cada punto de margen EBITDA', mitigante: 'Precio por encima de la inflación y productividad', senal: 'Margen operativo ajustado por debajo del 29 % dos trimestres seguidos' },
      { riesgo: 'Volumen industrial débil en Europa y China', tipo: 'Cíclico', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'Escenario bajista del objetivo a 12 meses (−22 % de precio)', mitigante: 'Contratos con pagos mínimos; electrónica y sanidad', senal: 'Volumen subyacente negativo en EMEA o APAC' },
      { riesgo: 'Proyectos de hidrógeno y energía limpia que se retrasan', tipo: 'Estratégico', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 % (menor crecimiento de 2028-2030)', mitigante: 'Linde solo invierte con contrato firmado', senal: 'Caída de la cartera de proyectos por debajo de 8.000 M' },
      { riesgo: 'Recompras con deuda', tipo: 'Financiero', probabilidad: 'Baja', impacto: 'Bajo', efecto_valor: 'Limitado: deuda neta de ≈1,8x el EBITDA', mitigante: 'Flujo de caja estable', senal: 'Deuda neta por encima de 2,5x el EBITDA' },
      { riesgo: 'Litigios de Rusia (Amur)', tipo: 'Legal', probabilidad: 'Baja', impacto: 'Bajo', efecto_valor: 'n.d.', mitigante: 'Activos ya deteriorados', senal: 'Nuevas sentencias o embargos' },
    ],
    premortem: 'Octubre de 2029: la acción ha perdido un 40 %. La historia más probable no es un desastre operativo sino un cambio de múltiplo. El BPA ajustado siguió creciendo, pero al 5-6 % y no al 8-10 % que el mercado daba por hecho: la industria química europea cerró plantas, el volumen de granel y botellas cayó, y el margen dejó de subir porque los costes de personal y energía crecieron más que el precio. Los proyectos de hidrógeno azul en EE. UU. se retrasaron al cambiar los créditos fiscales y la cartera bajó. Con el bono de EE. UU. por encima del 5 %, el mercado dejó de pagar 27x a una empresa que crecía al 5 %, y el PER bajó a ≈18x, el de Air Liquide y Air Products. El indicador que lo habría anticipado: el margen ajustado del 2T26, el primer retroceso en años, y una guía de 2027 por debajo del 8 % de crecimiento del BPA.',
    confianza: 'Media',
  },
  preguntas: {
    items: [
      { tema: 'Margen', pregunta: '¿Cuánto restó al margen ajustado del 2T26 el negocio de terapias a domicilio de EE. UU., y qué margen tendría el grupo sin él?', por_que: 'Es la explicación de la dirección para el primer retroceso del margen en años.' },
      { tema: 'Cartera', pregunta: '¿Qué parte de la cartera de ≈11.000 M es electrónica, química y energía limpia, y qué calendario de arranque tiene cada bloque?', por_que: 'Sostiene el crecimiento de volumen de 2027-2029 de nuestro caso base.' },
      { tema: 'Capital', pregunta: '¿Por qué recomprar ≈4.500 M al año con deuda mientras el capex sube al 15-16 % de las ventas?', por_que: 'La deuda neta pasó de ≈16.800 M a ≈23.100 M en 18 meses.' },
      { tema: 'Rendimiento', pregunta: '¿Qué rendimiento sobre el capital esperan de los proyectos nuevos frente al ≈23 % del capital operativo actual?', por_que: 'Decide si el crecimiento crea valor (prueba de sostenibilidad).' },
      { tema: 'Precio', pregunta: '¿Cuánto del crecimiento subyacente de 2026 es precio y cuánto volumen, por región?', por_que: 'El precio ha sido el motor del margen; si se agota, el modelo cambia.' },
      { tema: 'Gobierno', pregunta: '¿Por qué unir presidencia y dirección en 2026 y con qué plazo se revisará?', por_que: 'Resta contrapeso en una empresa sin accionista de referencia.' },
    ],
    confianza: 'Media',
  },
  fuentes: [],
  huecos: [
    { seccion: 'bolsa', campo: 'beta de la acción para el WACC', tipo: 'Complemento', intentos: '1) bolsa.mjs: sin red; 2) búsqueda de la beta en Yahoo y Stock Analysis: sin cifra en los extractos; 3) beta sectorial de Damodaran: no accesible', decision: 'Calculado y marcado como estimación' },
  ],
};
