// Textos del analista principal (Visa, corte 2026-10-14). Citas con la letra de la nota.
export default {
  limitaciones: 'Análisis hecho desde la nube con la red limitada a la búsqueda web: sec.gov, la web de inversores de Visa y los proveedores de datos no se pudieron abrir, así que las cifras salen de los extractos de búsqueda de los comunicados 8-K, de los 10-K y 10-Q y de la prensa financiera, cruzadas cuando fue posible; la confianza es menor que en un análisis normal y lo que no cuadró está en null y en los huecos. Línea cotizada: acciones de clase A en el NYSE; las acciones se cuentan como clase A equivalente (clase A más la conversión de las clases B y C y de las preferentes), que es la base del BPA diluido de Visa. Cuentas en USD con US GAAP; ejercicio a 30 de septiembre, etiquetado por el año en que termina (FY2025 = octubre de 2024 a septiembre de 2025). FY2026 ya ha cerrado pero sus resultados se publican el 27-oct-2026: se trata como estimación fija (tres trimestres publicados). El BPA del objetivo a 12 meses y el PER histórico están en base ajustada (sin provisiones de litigios cubiertos ni otros especiales), la que publica Visa. Precio: cierre del 13-oct-2026 (la sesión del corte no había cerrado). Comparables tomados del análisis de Adyen del 12-oct (cierre del 9-oct, MarketScreener y Stock Analysis) y pasados a USD al 1,1181 del BCE [D19-D23].',

  controles_explicados: [],

  parches: [],
  huecos_resueltos: [],

  secciones: {
    comparables: {
      criterio: 'Las dos redes abiertas no tienen más comparable directo que Mastercard. Añadimos los adquirentes y procesadores (Adyen, Fiserv, Global Payments, Nexi, Worldline) y las billeteras (PayPal, Block), que viven del mismo flujo de pagos con márgenes y crecimientos mucho menores. American Express queda fuera por ser emisor con riesgo de crédito; UnionPay no cotiza.',
      comentario: 'La mediana del PER de los próximos 12 meses de los ocho es de 18,8x, con un crecimiento mediano del 4,5 % y un ROIC mediano del 7,3 % [D19-D22]: Visa (26,5x, 13,5 % de crecimiento anual compuesto de las ventas y 52,3 % de ROIC) no se parece a la mediana. El único comparable útil es Mastercard, a 26,5x el PER y 20,4x el EV/EBITDA de los próximos 12 meses, casi lo mismo que Visa. La regresión múltiplo-crecimiento explica la mitad de la dispersión (R² 0,54). Por eso el peso de los comparables en el valor es solo del 10 % y el valor implícito por PER (280,87 USD con la mediana) es un suelo, no una referencia.',
    },
    multiplos_historicos: {
      comentario: 'Con el BPA contable, el PER de los últimos 12 meses está en 38,8x frente a una media de 28,1x en FY2022-FY2025, y el EV/EBITDA en 26,8x frente a 22,8x: prima del 38 % y del 18 % [D13]. Parte de la prima es contable: el BPA de FY2025 (10,20 USD) lleva las provisiones de litigios; con el ajustado (11,47 USD) el PER de cierre de FY2025 fue de 29,8x. Con el BPA ajustado de los próximos doce meses del consenso (14,94 USD) cotiza a 26,5x, en la mediana de los últimos cuatro años (26,8x). No hay datos verificados de FY2018-FY2021 (huecos).',
    },
    capital: {
      comentario: 'Visa devuelve más caja de la que genera: entre FY2021 y FY2025 la caja libre sumó 92.367 M y recompras y dividendos 86.135 M (67.566 M en recompras), sin compras relevantes. En FY2025 recompras (18.200 M) y dividendos (4.600 M) superaron a la caja libre (21.577 M) y la deuda subió de 20.836 M a 25.171 M [A1, A2]. Las acciones diluidas cayeron de 2.187 M a 1.966 M en cuatro años (−2,6 % al año), que explica unos 3 puntos del crecimiento anual del BPA. Las compras de tecnología (Tink, Featurespace, Pismo) son pequeñas frente a la caja y sin deterioros publicados [A19]. La asignación es buena, pero a 26-27 veces el beneficio cada dólar de recompra rinde menos que hace tres años.',
    },
    catalizadores: {
      items: [
        { fecha: '27-oct-2026', evento: 'Resultados del 4T y del FY2026 y guía de FY2027', efecto: 'La guía de FY2027 fija el BPA del objetivo a 12 meses; el consenso espera 14,94 USD (+14 %) [D5]', probabilidad: 'Alta', sentido: '+/−' },
        { fecha: 'FY2027 (1S)', evento: 'Normalización del transfronterizo y del valor añadido sin la Copa del Mundo', efecto: 'El 3T FY2026 llevó un transfronterizo anormalmente alto y +34 % en valor añadido: comparativas difíciles en 2027 [A3, A21]', probabilidad: 'Alta', sentido: '−' },
        { fecha: '2027', evento: 'Avance del pleito del Departamento de Justicia sobre el débito', efecto: 'Una sentencia que obligue a cambiar el enrutamiento del débito recortaría el precio por transacción en EE. UU. [B5, B7]', probabilidad: 'Media', sentido: '−' },
        { fecha: '2026-2027', evento: 'Licencia definitiva de compensación en China', efecto: 'Opción a largo plazo; sin ingresos relevantes en FY2027-28 [D10]', probabilidad: 'Media', sentido: '+' },
        { fecha: 'Congreso 2026-2027', evento: 'Credit Card Competition Act', efecto: 'Sin calendario; su aprobación es el principal riesgo de cola [B7]', probabilidad: 'Baja', sentido: '−' },
        { fecha: 'Enero de 2027', evento: 'Junta de accionistas y nuevo plan de recompras', efecto: 'Las recompras no anunciadas no están en nuestro BPA: un plan nuevo añadiría 2-3 % al año', probabilidad: 'Alta', sentido: '+' },
      ],
      confianza: 'Media',
    },
    riesgos: {
      items: [
        { riesgo: 'Regulación del enrutamiento y de las tasas en EE. UU. (CCCA, sentencia del DOJ en débito)', tipo: 'Regulatorio', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−27 % (escenario bajista: 214,21 frente a 295,26 de valor intrínseco)', mitigante: 'Precedentes (enmienda Durbin de 2010) que Visa absorbió con más volumen y servicios', senal: 'Votación de la CCCA en comisión o una sentencia de fondo del DOJ' },
        { riesgo: 'Desintermediación por pagos de cuenta a cuenta y stablecoins', tipo: 'Competitivo', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−10 % a −20 % a largo plazo (menos crecimiento terminal)', mitigante: 'Visa integra liquidación en USDC y tokeniza credenciales para agentes de IA [B10]', senal: 'Transacciones procesadas por debajo del 7 % de crecimiento dos trimestres seguidos' },
        { riesgo: 'Frenazo del transfronterizo (viajes y comercio electrónico)', tipo: 'Cíclico', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 % a −8 % en el BPA de FY2027', mitigante: 'El volumen doméstico y el procesamiento son menos cíclicos', senal: 'Volumen transfronterizo por debajo del +8 %' },
        { riesgo: 'Pleito de tasas de intercambio de los comercios (MDL)', tipo: 'Legal', probabilidad: 'Alta', impacto: 'Bajo', efecto_valor: 'Menor para la clase A: lo absorbe el escrow financiado con la clase B', mitigante: 'Plan de responsabilidad retrospectiva de 2008', senal: 'Provisiones por encima del saldo de la cuenta de garantía' },
        { riesgo: 'Incentivos crecientes a grandes emisores', tipo: 'Comercial', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−1 punto de margen ≈ −2 % de valor', mitigante: 'Contratos plurianuales', senal: 'Ingresos netos creciendo menos que el volumen de pagos' },
        { riesgo: 'Tipos de interés altos y múltiplo', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'Cada punto de WACC mueve el valor un 15-20 % (tabla de sensibilidad)', mitigante: 'Negocio sin deuda neta relevante (0,4x EBITDA)', senal: 'Bono a 10 años por encima del 5,5 %' },
      ],
      premortem: 'Octubre de 2029: Visa vale un 40 % menos. La cadena más probable empieza en 2027, cuando el comercio transfronterizo y el valor añadido se normalizan tras la Copa del Mundo y el crecimiento de los ingresos baja del 14 % al 8 %, a la vez que la guía de FY2027 decepciona. En 2028 el Congreso, con apoyo de la Casa Blanca, aprueba una versión de la Credit Card Competition Act que obliga a ofrecer una segunda red en las tarjetas de crédito, y el juez del caso de débito exige cambios de enrutamiento; los comercios desvían volumen a redes más baratas y los grandes emisores aprovechan la renegociación para pedir más incentivos. El margen EBITDA pierde 2-3 puntos y el crecimiento cae al 6 %. El mercado deja de pagar 27 veces el beneficio y lo hace a 20, como a los procesadores maduros que cotizan a 8-19 veces. El indicador que lo habría anticipado: ingresos netos creciendo al mismo ritmo que el volumen de pagos (señal de que se pierde precio) y transacciones procesadas por debajo del 7 %.',
      confianza: 'Media',
    },
    preguntas: {
      items: [
        { tema: 'Guía FY2027', pregunta: '¿Qué parte del crecimiento de FY2026 (≈14 %) se repite sin la Copa del Mundo y con el transfronterizo normalizado?', por_que: 'Nuestro BPA de FY2028 supone un 11 % de crecimiento en FY2027; cada punto menos resta un 1 % al objetivo.' },
        { tema: 'Regulación', pregunta: '¿Cuánto de los ingresos de EE. UU. está expuesto a un cambio de enrutamiento en crédito y débito?', por_que: 'Define el escenario bajista (−3,5 puntos de crecimiento y −2,5 de margen).' },
        { tema: 'Stablecoins', pregunta: '¿Qué volumen liquida ya Visa en stablecoins y con qué comisión frente a la tarjeta?', por_que: 'Saber si es canibalización o mercado nuevo.' },
        { tema: 'Incentivos', pregunta: '¿Qué renovaciones de grandes emisores vencen en FY2027-28?', por_que: 'Los incentivos son la mayor partida contra los ingresos brutos.' },
        { tema: 'Litigios', pregunta: '¿Cuánto queda en la cuenta de garantía frente a las reclamaciones del MDL?', por_que: 'Si el escrow no basta, la clase A pagaría en caja.' },
        { tema: 'China', pregunta: '¿Qué inversión y qué calendario de ingresos tiene la cámara de compensación en China?', por_que: 'El mercado ya ha subido con la noticia; nuestra proyección no la incluye.' },
      ],
      confianza: 'Media',
    },
  },

  rentabilidad_comentario: 'Visa crea valor con holgura: el ROIC pasó del 20,7 % en FY2021 al 52,3 % en FY2025 frente a un WACC del 9,98 %, más de 42 puntos de diferencia. La subida no viene del margen (el EBITDA está en el 67-70 % todos los años) sino de la rotación: el capital invertido bajó de 58.566 M a 42.669 M porque las recompras financiadas con deuda reducen el patrimonio mientras el fondo de comercio y los intangibles de Visa Europe se mantienen. El ROE (52,1 %) y el ROA (20,7 %) cuentan lo mismo. El ROIC incremental no tiene sentido aquí: el capital invertido cae mientras el beneficio sube. Frente a Mastercard (ROIC del 93,8 % según Stock Analysis) [D20], Visa es menos rentable por la mochila de intangibles de la compra de Visa Europe, no por el negocio.',

  dcf_justificacion: {
    crecimiento: 'FY2026e: 14,3 %, fijo, con tres trimestres publicados (≈33.700 M) y un 4T de ≈12.000 M en línea con la guía de «mid-teens» [A3, A13, A14]. FY2027e: 11 %, contra 10,4 % del consenso (50.440 M) [D5], porque el transfronterizo y el valor añadido se normalizan. Después bajamos medio punto al año hasta el 5 % en FY2035e. Entre FY2021 y FY2025 los ingresos crecieron un 13,5 % anual compuesto (11,3 % en FY2025), con una pandemia por medio; el volumen de pagos crece al 8-10 % y el precio y la mezcla añaden 2-4 puntos [A2, A3].',
    margenes: 'Margen EBITDA del 70,5 % desde FY2027e, igual que el de FY2025 sin las provisiones de litigios (70,3 %); FY2026e, 69,5 %, porque lleva 563 M de indemnizaciones y 237 M del MDL [A3]. No suponemos expansión: el apalancamiento operativo existe, pero los incentivos a emisores y la inversión en stablecoins, IA y China lo absorben. El margen operativo ajustado fue del 67,7 % en FY2025 [A1].',
    inversion: 'Amortización del 3,0 % de las ventas (1.220 M en FY2025) y capex del 3,6 % hasta FY2030e y del 3,3 % después (3,7 % en FY2025) [A1]. Circulante nulo: el saldo de liquidación con bancos es de tesorería, no de explotación. Tipo impositivo del 18 % (17,1 % en FY2025 y 17,4 % en FY2024) [A1, A6].',
    wacc: 'Tasa libre del 5,22 % (bono a 10 años del 13-oct-2026) [D24], beta 0,90 (estimación: la acción se mueve menos que el mercado; sin dato verificado por falta de red), prima de mercado del 5,5 % y sin prima adicional. Coste de la deuda del 4,5 % antes de impuestos y peso de la deuda del 3 % (23.858 M frente a 744.593 M de capitalización). WACC del 9,98 %. Con la prima implícita del mercado (4,20 % en octubre, Damodaran) [D25] el WACC baja al 8,84 % y el valor sube a 356,07 USD. La recomendación depende más de la tasa libre que de las cifras.',
    terminal: 'Gordon con un crecimiento del 3,0 %: inflación esperada del 2,5 % y algo de crecimiento real del pago con tarjeta, por debajo del 4,72 % que permite la tasa libre. El valor terminal pesa un 59 %. Un terminal del 3,0 % con un ROIC del 52 % equivale a unas 21 veces el EBITDA de FY2035e, por debajo del EV/EBITDA actual de 26,8x.',
  },

  puente_comentarios: {
    'FY2026e': 'Volumen: pagos +8-10 % y transacciones +9-10 % a tipo constante [A3, A13]. Precio: ingresos netos 3 puntos por encima del volumen por tarifas y valor añadido. Otros: divisa y Copa del Mundo (≈1 punto) [A20].',
    'FY2027e': 'Volumen al 8 %, como el de FY2025 [A2]; precio 2 puntos; otros 1 punto (sin la Copa del Mundo y con el transfronterizo normalizado).',
    'FY2028e': 'Volumen al 8 % por el paso del efectivo a la tarjeta (transacciones con tarjeta de red +7,1 % en 2025) [B1]; precio 2 puntos.',
    'FY2029e': 'Volumen 7,5 %, precio 2 puntos: el ritmo de FY2022-FY2025 menos un punto.',
    'FY2030e': 'Volumen 7 % y precio 1,5 puntos: empieza la convergencia hacia el gasto nominal.',
  },

  veredicto: 'Sí',
  sostenibilidad_justificacion: 'Sí. Visa no necesita capital para crecer: la reinversión neta de la proyección es de 2.918 M, el 1 % del NOPAT, así que el motor no puede hacer la prueba de financiación y la hacemos con el poder de precios y la cuota. Precios: los ingresos netos han crecido 3-5 puntos más que el volumen de pagos en FY2025 (11 % frente a 8 %) y en el 3T FY2026 (14 % frente a 10 %) [A2, A3], con un margen estable del 67-70 %. Cuota: el 40,8 % de las transacciones con tarjeta de red del mundo [B1]; nuestra proyección (8,6 % anual en FY2027-35) supone que el volumen de Visa crece al 7-8 %, en línea con las transacciones del mercado (+7,1 % en 2025), sin ganar cuota. No damos mercado final en dinero porque Nilson solo publica transacciones (hueco); la cuota implícita, a crecimiento parecido al del mercado, se mantiene.',

  dcf_lectura: 'El DCF da 295,26 USD por acción, un 25,5 % por debajo del precio, con un WACC del 9,98 % y un valor terminal que pesa el 59 %. El DCF inverso dice que, con nuestro margen del 70,5 %, el precio de 396,06 USD descuenta un crecimiento de los ingresos del 12,9 % anual en FY2027-FY2035, frente al 8,6 % de nuestro caso base, o una rentabilidad implícita del 8,3 %, por debajo de nuestro WACC (9,98 %) y del que pide el mercado para su beta (8,84 %). Un 12,9 % durante nueve años es lo que Visa hizo en FY2021-FY2025 (13,5 %), que incluye la salida de la pandemia; repetirlo exige que el volumen y el precio no se desaceleren pese a la regulación y a los pagos alternativos. Es exigente, no imposible. La lectura útil es la relativa: con la prima implícita del mercado (4,2 %) el DCF sube a 356,07 USD, aún un 10 % por debajo del precio. La diferencia con el mercado es de tasa de descuento más que de cifras: nuestro BPA de FY2028e (16,40 USD) está cerca del que implica el consenso.',

  narrativas: {
    Bajista: 'El Congreso aprueba una versión de la Credit Card Competition Act o el DOJ gana el caso de débito, los comercios enrutan por redes más baratas y los emisores exigen más incentivos: el crecimiento baja 3,5 puntos al año y el margen 2,5 puntos. Le pasó a Visa con la enmienda Durbin de 2010 en débito.',
    Base: 'Crecimiento del 11 % en FY2027e y bajando medio punto al año hasta el 5 %, con el margen del 70,5 % y recompras que no contamos. Visa mantiene cuota y precio frente a los pagos alternativos.',
    Alcista: 'El valor añadido, el dinero fuera de la tarjeta (Visa Direct, B2B), China y los pagos con agentes de IA añaden 2 puntos de crecimiento y un punto de margen por el apalancamiento operativo.',
  },
  escenarios_comentario: 'En valor intrínseco los tres escenarios quedan por debajo del precio (214,21, 295,26 y 343,66 USD): a un WACC del 9,98 % ni el alcista justifica 396 USD. La asimetría a 12 meses, que es la que decide, es de 1,47 veces: el alcista gana un 17,4 % y el bajista pierde un 10,8 %, porque el PER mínimo de los últimos años (23,7x) no está lejos del actual (26,7x). Compensa mantener, no comprar: el bajista es verosímil y la subida máxima es moderada.',

  bpa_justificacion: {
    Bajista: 'Ventas de FY2028e de 52.589 M (crecimiento de 7,5 % y 7,0 % en FY2027-28) y margen EBITDA del 68,0 %: EBIT de 34.183 M, 250 M de resultado financiero neto, impuesto del 18 % y 1.880 M de acciones: beneficio de 27.825 M.',
    Base: 'Ventas de 56.078 M (14,3 %, 11 % y 10,5 %) y margen EBITDA del 70,5 %, menos un 3 % de amortización: EBIT de 37.853 M, 250 M de financiero neto, impuesto del 18 % y 1.880 M de acciones sin recompras no anunciadas: beneficio de 30.834 M.',
    Alcista: 'Ventas de 58.122 M (13 % y 12,5 % en FY2027-28) y margen del 71,5 %: EBIT de 39.813 M y beneficio de 32.442 M con las mismas acciones.',
  },
  per_excluidos: 'PER de cierre de ejercicio (30 de septiembre) sobre el BPA ajustado de Visa, la misma base que nuestros casos: FY2022 177,65 / 7,50 = 23,7x; FY2023 230,01 / 8,77 = 26,2x; FY2024 274,95 / 10,05 = 27,4x; FY2025 341,38 / 11,47 = 29,8x [D13, A6, A7, A8, A2]. Fuera FY2018-FY2021: no hay precio de cierre verificado (FY2020-21 tendrían además el BPA hundido por la pandemia). Con solo cuatro años, la mediana (26,8x) y la media larga (26,8x) coinciden. Actual = 396,06 / 14,83 (nuestro BPA de FY2027e) = 26,7x. BPA ajustado de FY2018: 4,61 USD [A18].',
  diferencia_consenso: 'Nuestro precio base (437,88 USD) queda un 4,4 % por encima del objetivo medio de los analistas (419,36 USD; rango 330-466) [D8]. El BPA de FY2027e es casi el mismo (14,83 frente a 14,94 de Zacks) [D5]: nuestras ventas son algo más altas (50.749 M frente a 50.440 M) pero no contamos recompras. El de FY2028e (16,40 USD) no tiene contraste publicado. La diferencia de precio viene del plazo: los analistas valoran a 12 meses sobre el BPA de FY2027e y nosotros sobre el de FY2028e.',
  objetivo12m_comentario: 'El objetivo a 12 meses (422,27 USD ponderado; 437,88 USD el base) está un 45 % por encima del valor intrínseco (290,56 USD). La distancia no es de cifras sino de tasa: el mercado descuenta los flujos de Visa al 8,3 %, y nosotros al 9,98 % con un bono a 10 años del 5,22 %. Para que el precio se acercase al valor intrínseco tendría que subir la tasa libre o romperse el crecimiento (regulación); para que el valor intrínseco subiese al precio, bajar los tipos un punto. La tesis de valor es a más de un año; a 12 meses, Visa rinde lo que crece su beneficio (≈11 %).',
  valoracion_comentario: 'Pesos: DCF 50 %, escenarios 40 % y comparables 10 %. El DCF es el método más fiable para un negocio con flujos tan previsibles, pero su resultado depende de la tasa libre (5,22 %) más que de las cifras: con la prima implícita del mercado sube a 356,07 USD. Los comparables pesan poco porque solo Mastercard se parece a Visa; el resto son procesadores que crecen al 2-5 % y cotizan a 8-19 veces. Las transacciones no pesan (son control de procesadores, no de redes). La dispersión es grande: de 214 USD (bajista) a 466 USD (máximo de los analistas). El valor intrínseco (290,56 USD) y el objetivo a 12 meses (422,27 USD) dan señales distintas: manda el segundo.',

  fuentes: [],
  huecos: [
    { seccion: 'dcf', campo: 'sostenibilidad.mercado_final', tipo: 'Complemento', intentos: '1) Nilson Report: solo transacciones y la cuota de Visa en número de operaciones; 2) Nilson EE. UU. y Asia-Pacífico: volumen regional, no mundial; 3) derivarlo como volumen × comisión media no es posible sin el volumen mundial de tarjetas', decision: 'Omitido; la prueba de cuota se hace a mano en la justificación' },
  ],
};
