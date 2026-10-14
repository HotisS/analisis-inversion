// Textos del analista (RELX, corte 2026-10-14). Citas con la letra de la nota.
export default {
  limitaciones: 'Entorno de nube con red limitada a la búsqueda web: no se han podido descargar el informe anual ni las notas de prensa completas, y las herramientas de descarga y de datos de bolsa del repositorio no funcionan. Las cifras salen de los comunicados de resultados citados en los resultados de búsqueda (RNS en Investegate, relx.com, Form 6-K) y, para lo que falta, de proveedores de datos citados; lo que no se ha podido cuadrar queda sin dato. Línea cotizada: Londres (REL, en peniques; el informe usa GBP). Precio: media ponderada de la recompra del 9-oct-26 (27,01 GBP), el último precio fiable disponible; la sesión del 13-oct no se ha podido leer. Acciones: 1.742,3 M emitidas menos 86,8 M en autocartera a 9-oct [D12]. Los cierres anuales de 2021-2025 son el ADR en USD convertido a GBP con el cambio de fin de año (estimación propia). La deuda neta es la publicada (incluye arrendamientos): la caja y la deuda bruta no se separan. Las capitalizaciones de los comparables se pasan de EUR a GBP a 0,857 (estimación). El consenso a tres años procede de una sola fuente gratuita y lleva confianza baja.',
  controles_explicados: [
    { control: 'ROIC', explicacion: 'El ROIC del motor (24-33 %) usa como capital invertido solo la deuda neta porque no se ha podido leer el patrimonio de todos los años; el ROIC ajustado que publica la empresa, con el fondo de comercio, es 15,4 % en 2025 y es el que se usa para comparar con el WACC.' },
    { control: 'Comparables estables', explicacion: 'Veeva (PER 40x) y Gartner/Wolters Kluwer (13x) estiran la mediana; la comparación se hace con el núcleo de información profesional y los comparables pesan un 20 %.' },
  ],
  huecos_resueltos: [],
  parches: [],
  secciones: {
    rentabilidad: {
      comentario: 'RELX crea valor con holgura: su ROIC ajustado, con todo el fondo de comercio de las compras, fue 15,4 % en 2025 y 14,8 % en 2024 [A9], frente a un WACC del 8,8 %, unos 6,6 puntos por encima. Los ROIC del motor (25-33 %) salen altos porque el capital invertido solo recoge la deuda neta (sin patrimonio en la mayoría de años) y no se usan. El ROIC sube porque el beneficio operativo ajustado crece un 9 % al año con un capex estable del 5,5 % de las ventas y compras pequeñas [A1, A8]: el crecimiento casi no consume capital. El margen es lo que lo mueve, no la rotación. Frente a los pares, el ROIC de RELX está por encima de Thomson Reuters (12 %) y de LSEG (6,5 %), y por debajo de Verisk (32 %) y Wolters Kluwer (25 %), que tienen menos fondo de comercio [D16].',
      confianza: 'Media',
    },
    comparables: {
      comentario: 'Con un PER de 17,8 veces los próximos 12 meses, RELX cotiza por debajo de la mediana del grupo (19,6 veces) y muy por debajo de Thomson Reuters (23,3), LSEG (24,5) y Verisk (21,8), con un crecimiento parecido (6-8 %) y el mismo modelo de suscripción [D16]. Solo Wolters Kluwer (12,9), Gartner (13,1) e Intuit (14,6) están más baratas, y las dos primeras han sufrido lo mismo con la IA. En EV/EBITDA de los últimos 12 meses (14,0 veces) está en la parte alta por su deuda de 2,3 veces el EBITDA. El descuento frente a Thomson Reuters, su rival directo en Legal, no lo explican ni el crecimiento ni el ROIC: es la prima de riesgo de la IA en Elsevier y LexisNexis. El múltiplo de referencia es el PER de los próximos 12 meses del núcleo de información profesional.',
    },
    catalizadores: {
      items: [
        { fecha: 'Finales de octubre de 2026', evento: 'Actualización de negocio de los nueve meses', efecto: 'Confirmación del crecimiento subyacente del 7 % y de la guía', probabilidad: 'Alta', sentido: '+/−' },
        { fecha: 'Febrero de 2027', evento: 'Resultados de 2026 y nueva recompra anual', efecto: 'Recompra de 1.500-2.250 M y guía de 2027', probabilidad: 'Alta', sentido: '+' },
        { fecha: '2026-2027', evento: 'Lanzamientos de IA de OpenAI, Anthropic o Thomson Reuters para juristas', efecto: 'Cada anuncio ha llegado a restar un 12 % en un día [D10]', probabilidad: 'Alta', sentido: '−' },
        { fecha: 'Julio de 2027', evento: 'Resultados del primer semestre de 2027', efecto: 'Prueba de si Legal mantiene el 10 % y STM el 6 %', probabilidad: 'Alta', sentido: '+/−' },
        { fecha: 'Abril de 2027', evento: 'Junta general', efecto: 'Votación de la remuneración; posible señal de sucesión', probabilidad: 'Media', sentido: '+/−' },
      ],
      confianza: 'Media',
    },
    riesgos: {
      items: [
        { riesgo: 'Sustitución de LexisNexis Legal por asistentes de IA generalistas', tipo: 'Tecnológico', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−20 % a −40 % (escenario bajista: −44 % sobre el valor intrínseco)', mitigante: 'Contenido propietario, integración en el flujo de trabajo y venta de la IA propia con precio superior', senal: 'Crecimiento subyacente de Legal por debajo del 6 %' },
        { riesgo: 'Erosión de Elsevier por acceso abierto y por modelos que resumen la ciencia', tipo: 'Negocio', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−10 %', mitigante: 'STM ya crece un 6 % con analítica y herramientas [A12]', senal: 'STM por debajo del 4 %' },
        { riesgo: 'Compresión adicional del múltiplo aunque las cifras aguanten', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−15 % (PER de 15 veces en vez de 17,5)', mitigante: 'Recompra del 4-5 % del capital al año', senal: 'PER por debajo de 16 veces sin cambio en las cifras' },
        { riesgo: 'Regulación de datos personales en Risk (EE. UU. y UE)', tipo: 'Regulatorio', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−5 % a −10 %', mitigante: 'Diversificación en fraude, identidad y seguros', senal: 'Leyes estatales que limiten los datos de seguros de autos' },
        { riesgo: 'Divisa: dos tercios de los ingresos en USD frente a una cotización en GBP', tipo: 'Financiero', probabilidad: 'Alta', impacto: 'Bajo', efecto_valor: '−3 % por cada 5 % de caída del dólar', mitigante: 'Costes también en dólares', senal: 'Crecimiento publicado muy por debajo del subyacente (1S26: 2,7 % frente a 7 % [A2])' },
        { riesgo: 'Deuda de 2,3 veces el EBITDA para mantener la recompra', tipo: 'Financiero', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−5 %', mitigante: 'Caja libre de 2.300 M al año [A8]', senal: 'Deuda neta por encima de 2,5 veces' },
        { riesgo: 'Sucesión del consejero delegado tras 17 años', tipo: 'Gobierno', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 %', mitigante: 'Equipo de dirección estable por división', senal: 'Anuncio de salida sin sucesor interno' },
      ],
      premortem: 'Es octubre de 2029 y la acción vale 16 GBP. Lo que pasó: en 2027 un asistente jurídico de un gran laboratorio de IA, con licencias de jurisprudencia de editoriales públicas y de un rival, se hizo estándar en los despachos medianos. LexisNexis no perdió clientes grandes, pero las renovaciones se negociaron a la baja y Legal bajó del 10 % al 3 %. Al mismo tiempo, las universidades usaron los modelos para negociar con Elsevier y STM se quedó en el 2-3 %. El crecimiento del grupo bajó al 4 % y el margen dejó de subir porque la empresa tuvo que gastar más en IA. El mercado, que ya pagaba solo 17 veces, bajó a 13 veces un beneficio que crecía al 4 %. La recompra, financiada con deuda, amplificó la pérdida. La señal temprana habría sido el crecimiento subyacente de Legal en los semestres de 2027 y el discurso de la dirección cambiando de «precio superior por la IA» a «inversión para defender la base».',
      confianza: 'Media',
    },
    preguntas: {
      items: [
        { tema: 'IA en Legal', pregunta: '¿Qué parte del crecimiento del 10 % de Legal procede de precio por los productos con IA y qué parte de clientes nuevos?', por_que: 'Si es solo precio sobre una base estancada, la aceleración es temporal.' },
        { tema: 'Renovaciones', pregunta: '¿Cuál es la tasa de renovación de Lexis+ AI y de las bases de Elsevier en 2025-2026 frente a 2023?', por_que: 'Es el indicador adelantado de sustitución que la empresa no publica.' },
        { tema: 'Licencias a modelos de IA', pregunta: '¿Licencia RELX su contenido a laboratorios de IA y con qué cláusulas de exclusividad?', por_que: 'Puede ser ingreso nuevo o la semilla del sustituto.' },
        { tema: 'Recompra y deuda', pregunta: '¿Hasta qué nivel de deuda neta sobre EBITDA mantendrá la recompra si la acción sigue barata?', por_que: 'Con 2,3 veces, la recompra de 2027 depende de esta decisión.' },
        { tema: 'Sucesión', pregunta: '¿Hay un plan de sucesión de Erik Engstrom y un candidato interno?', por_que: 'Un cambio en plena discusión sobre la IA añadiría prima de riesgo.' },
        { tema: 'Divisa', pregunta: '¿Qué cobertura hay del dólar y qué efecto prevé la empresa en 2027?', por_que: 'El 1S26 creció un 2,7 % publicado frente a un 7 % subyacente.' },
      ],
      confianza: 'Media',
    },
  },
  dcf_justificacion: {
    crecimiento: 'El crecimiento subyacente ha sido del 7 % en 2021, 2024, 2025 y el 1S26 [A1, A2, A5]. Para 2026e se fija un 4,0 % publicado (7 % subyacente menos unos 3 puntos de divisa por el dólar débil, como en el 1S26 [A2]; consenso: ventas de 10.010 M, +4,4 % [D4]). Desde 2027e se proyecta un 6,5 %, medio punto por debajo del subyacente histórico, que baja hasta el 3,5 % en 2032e para recoger el riesgo de la IA a largo plazo. No se proyectan compras (270 M en 2025 [A1]), que han añadido crecimiento publicado cada año.',
    margenes: 'El margen EBITDA publicado fue del 39,4 % en 2025 (EBITDA ajustado de la empresa: 40,1 %) [A1]. El margen operativo ajustado sube unos 90 puntos básicos al año desde 2022 (31,4 % a 34,8 %) [A1, A4] porque el beneficio crece 2 puntos más que los ingresos. Se proyecta una subida de 0,5 puntos al año hasta el 41,5 % en 2030e, la mitad del ritmo histórico, y luego estable.',
    inversion: 'El capex fue del 5,5 % de las ventas en 2025 (525 M) y el principal de arrendamientos 38 M [A8]; se proyecta un 5,9 % hasta 2030e y algo menos al final, siempre por encima de la amortización de activos propios (5,3 %). El circulante se deja en cero: RELX cobra por adelantado, pero no se ha podido leer el saldo del balance y se prefiere no contar una entrada de caja que no está comprobada.',
    wacc: 'Tasa libre: gilt británico a 10 años, 5,15 % (curva del Banco de Inglaterra del 19-ago-26 [P2]; llegó al 5,29 % el 2-sep [P3]). Beta de 0,85 (estimación propia: negocio defensivo, pero con la volatilidad de 2026 por la IA; no se ha podido calcular con históricos). Prima de mercado del 5,5 %. Coste de la deuda antes de impuestos del 4,5 % (intereses de 286 M sobre una deuda neta media de unos 6.900 M en 2025 [A1]). Peso de la deuda del 16 % (8.733 M frente a 44.715 M de capitalización). WACC del 8,8 %. La tasa libre británica, alta por la situación fiscal, pesa mucho: dos tercios de los flujos son en dólares.',
    terminal: 'Gordon con un 2,5 % de crecimiento, entre la inflación esperada en libras (en torno al 2,5-3 %) y la tasa libre menos medio punto. El valor terminal pesa el 70 %. Un múltiplo de salida de 14 veces el EBITDA (cercano al EV/EBITDA actual) se da como contraste.',
  },
  puente_comentarios: {
    '2026e': 'Subyacente del 7 % (precio unos 3,5 puntos, volumen 3,5) y unos −3 puntos de divisa por el dólar débil, como en el 1S26 [A2].',
    '2027e': 'Precio en línea con la historia de Legal y Risk; volumen por analítica y productos con IA [A12].',
    '2028e': 'Igual que 2027e; sin compras.',
    '2029e': 'Volumen algo menor por madurez de Legal y STM.',
  },
  veredicto: 'Sí',
  sostenibilidad_justificacion: 'Sí. RELX apenas necesita capital para crecer: la reinversión neta de la proyección es el 2 % del NOPAT y el motor no puede aplicar la prueba de crecimiento financiable. La prueba es el poder de precios: el crecimiento subyacente ha sido del 7 % en 2021 y de 2024 al 1S26 con un capex estable del 5,5 % de las ventas [A1, A2, A5], y Legal y STM aceleran en 2026 con productos con IA que se cobran más caros [A12]. El caso base (6,5 % en 2027-2028e bajando al 3,5 %) queda por debajo de lo logrado y sin compras. La cuota no se puede medir (sin tamaño de mercado comparable), por eso no se fija un mercado final.',
  dcf_lectura: 'El DCF da 25,28 GBP por acción, un 6,4 % por debajo del precio de 27,01, con un valor terminal que pesa el 70 %. El DCF inverso dice que, con nuestro WACC del 8,8 %, el precio descuenta un crecimiento del 6,5 % anual en 2027-2032e frente al 5,4 % de nuestro base, o un margen EBITDA del 43,5 % frente a nuestro 41,5 %; la rentabilidad implícita en el precio es del 8,5 %, algo menos que el WACC. Es decir: el mercado no descuenta el hundimiento por la IA que sugiere la caída de la acción, sino que RELX siga creciendo casi como hasta ahora (7 % subyacente). Es exigente frente a nuestro base, que ya resta medio punto al histórico y baja al 3,5 % en 2032e, pero conservador frente a la historia de 2021-2026. Con la prima implícita del mercado (4,2 %), el DCF sube a 30,63 GBP: la conclusión depende de la tasa libre británica del 5,15 %, alta para un negocio que cobra dos tercios en dólares.',
  narrativas: {
    Bajista: 'La IA generalista empieza a sustituir a Lexis en despachos medianos y las universidades negocian a la baja con Elsevier: el crecimiento cae 3 puntos (al 3-3,5 %) y el margen se queda 3 puntos por debajo por el gasto en IA, como le pasó a Gartner, cuyas ventas caen en 2026 [D16].',
    Base: 'RELX mantiene un crecimiento subyacente del 6,5-7 % hasta 2029 y el margen sube medio punto al año; la IA se vende como mejora del producto.',
    Alcista: 'La IA propia acelera Legal y STM como en el 1S26 (10 % y 6 % [A12]) y el grupo crece un 8 %, con un margen 1 punto mayor.',
  },
  escenarios_comentario: 'La asimetría del valor intrínseco es desfavorable: el alcista gana un 13,9 % (30,76 GBP) y el bajista pierde un 44,4 % (15,01 GBP), una relación de 0,31 veces. El bajista pesa un 30 % porque la sustitución por la IA es el riesgo que el mercado discute y porque ya le ha pasado a un par (Gartner). El valor ponderado es 25,58 GBP, un 5,3 % por debajo del precio. Con la regla a 12 meses, la asimetría es mejor (2,45 veces) porque el múltiplo de partida ya es bajo: 17,5 veces frente a 22-30 veces de 2021-2025.',
  suma_partes_comentario: 'No se aplica: no se han podido leer los ingresos ni el beneficio de cada división, y las cuatro comparten modelo de suscripción salvo Exhibitions (menos de una sexta parte de los ingresos).',
  objetivo_12m: {
    ejercicio: '2028e',
    casos: [
      { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: 1.435, multiplo: null, precio: null, justificacion: 'Crecimiento 3 puntos menor y margen 3 puntos menor desde 2027e: ventas de 10.684 M, EBITDA de 4.060 M, beneficio neto de 2.376 M sobre 1.655,5 M de acciones. Es el caso de sustitución parcial por la IA.' },
      { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: 1.683, multiplo: null, precio: null, justificacion: 'Ventas de 11.312 M, margen EBITDA del 41 %, amortización de activos propios del 5,3 %, intereses de 330 M, impuestos del 24,5 % y 13 M de minoritarios: beneficio de 2.787 M, sin recompras no anunciadas.' },
      { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: 1.789, multiplo: null, precio: null, justificacion: 'Crecimiento 1,5 puntos mayor y margen 1 punto mayor: ventas de 11.633 M y beneficio de 2.961 M. La IA propia acelera Legal y STM.' },
    ],
    per_historico: { actual: 17.5, mediana_5a: 27.3, minimo_5a: 22.4, media_larga: 26.2, excluidos: '2020 (BPA ajustado hundido por la cancelación de ferias). Serie limpia 2021-2025 sobre BPA ajustado: 27,5; 22,4; 27,3; 30,2; 23,4. Antes de 2020 no hay BPA ajustado leído. PER actual: 27,01 GBP entre nuestro BPA de 2027e (1,547).' },
    comparables_per: { mediana: 19.6 },
    consenso: { bpa_ano1: 1.55, bpa_ano2: 1.73, objetivo_medio: 34.07, objetivo_min: 21.0, objetivo_max: 50.7, analistas: 16, tendencia_3m: 'recortes', fuente: 'StockAlarm (BPA) [D4] e Investing (objetivos) [D5]' },
    diferencia_consenso: 'Nuestro BPA de 2028e (1,683) queda un 2,7 % por debajo del consenso (1,73 [D4]): proyectamos ventas parecidas y no contamos recompras no anunciadas, que el consenso sí suele incluir. La diferencia grande está en el precio: nuestro base de 2028e queda unos 4,6 GBP por debajo del objetivo medio de 34,07 [D5] porque la regla común usa el PER actual (17,5 veces), mientras que los analistas suponen una vuelta parcial al PER de 22-27 veces de 2021-2025. No acercamos la cifra: esa vuelta es la apuesta, no el punto de partida.',
    media: 30.54,
    comentario: 'El objetivo ponderado a 12 meses (29,30 GBP, +11,1 % con el dividendo) queda un 15 % por encima del valor intrínseco (25,58 GBP): el PER de 17,5 veces aplicado al BPA de 2028e da más que nuestro DCF, que usa un WACC del 8,8 % con el gilt al 5,15 %. Para cerrar la distancia hacia arriba haría falta que bajara la tasa libre británica o que el mercado volviera a pagar 22 veces; hacia abajo, que el crecimiento de Legal y STM se frenara. La señal es Mantener: la ponderada no llega al 15 % ni el base al 12 %.',
  },
  valoracion_comentario: 'El DCF pesa el 50 % porque RELX es un negocio estable y previsible, con caja casi igual al beneficio; los escenarios el 30 % para recoger el riesgo de la IA, y los comparables el 20 %, porque todo el grupo de información profesional está afectado por la misma prima de riesgo y su PER medio da un valor de 29,75 GBP, muy por encima del DCF. Las transacciones no pesan: solo dos tienen múltiplo y RELX no es un objetivo realista. La dispersión entre métodos es grande (15-36 GBP) y se explica por la tasa de descuento: con la prima implícita del mercado el valor objetivo sería 29,72 GBP (+10 %). El valor objetivo ponderado es 25,58 GBP.',
  huecos: [],
};
