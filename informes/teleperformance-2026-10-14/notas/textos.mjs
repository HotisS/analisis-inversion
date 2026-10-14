// Textos del analista principal (Teleperformance, corte 2026-10-14). Citas con la letra de la nota.
export default {
  limitaciones: 'Análisis hecho desde la nube con la red limitada a la búsqueda web: la web de TP, la AMF, Yahoo y los proveedores de datos no se pudieron abrir, así que las cifras salen de los extractos de búsqueda de los comunicados (Business Wire, BALO) y de agregadores (Stock Analysis, ABC Bourse, Digrin) con la URL como fuente, cruzadas cuando fue posible. El balance es parcial (caja, deuda y arrendamientos; sin activo, circulante ni fondo de comercio), la cuenta no tiene resultado financiero ni impuestos por año y la bolsa no tiene betas ni rentabilidades calculadas con herramientas/bolsa.mjs. Precio: cierre del 13-oct-2026 (74,62 EUR, ABC Bourse), porque la sesión del 14-oct estaba abierta. Acciones: 58,4 M diluidas (216 M de beneficio ÷ 3,70 EUR de BPA del 1S26). El BPA es siempre el publicado (no el ajustado de la empresa).',

  controles_explicados: [
    { control: 'Al menos 5 comparables', explicacion: 'Solo hay tres comparables cotizados con datos accesibles (Concentrix, Genpact y EXL); Majorel y Webhelp dejaron de cotizar al ser compradas por TP y Concentrix, y Foundever no cotiza. Los comparables pesan solo un 15 % en la síntesis por eso.' },
    { control: 'Al menos 10 fuentes primarias', explicacion: 'Entorno sin acceso a la web de la empresa ni a la AMF: las primarias son los comunicados de Business Wire y el aviso del BALO; el resto son agregadores citados con su URL.' },
  ],

  parches: [],
  huecos_resueltos: [],

  per_excluidos: 'Se usa el BPA publicado (no el ajustado de TP, que excluye la amortización de carteras compradas y la reestructuración), la misma base que los escenarios. PER de cierre: 2022 20,7x (222,70 ÷ 10,77); 2023 13,2x (132,05 ÷ 10,01); 2024 9,5x (83,12 ÷ 8,71); 2025 7,4x (61,84 ÷ 8,40) [D11, A4, A6]. Se excluyen 2020 y 2021, años de burbuja del sector por la pandemia, y no se ha podido obtener el cierre de 2018-2019: la serie limpia tiene cuatro años, que valen como «cinco años» y como «media larga». Actual = 74,62 ÷ 9,16 (nuestro BPA de 2027e) = 8,15x.',

  secciones: {
    multiplos_historicos: {
      comentario: 'TP cotiza a 9,4 veces el BPA de los últimos 12 meses, en el percentil 25 de su serie limpia de cuatro años (media de 11,4x, mínimo de 7,4x al cierre de 2025, máximo de 20,7x en 2022) [D11]. La desvalorización es estructural: hasta 2021 el mercado pagaba más de 25 veces por un líder que crecía al 10 % orgánico; desde la llegada de la IA generativa (2023) paga un negocio que se teme en declive. El rebote de 2026 (de 43,65 a 74,62 EUR) solo devuelve el PER al nivel de final de 2024.',
    },
    comparables: {
      comentario: 'La mediana del PER de los próximos 12 meses de los comparables es 7,9x (Concentrix 2,0x, Genpact 7,9x, EXL 18,5x) [D14-D16], y TP cotiza a 7,7x: en línea con la mediana y muy por encima de Concentrix, su rival más parecido, que el mercado trata casi como un negocio en liquidación. EXL cotiza con prima porque se la ve como ganadora de la IA (analítica, datos), y Genpact está en medio. Los datos son de mayo-junio de 2026 y el PER de los estadounidenses es sobre BPA ajustado (no GAAP), más alto que el publicado: con la misma base, TP estaría en la parte alta del grupo. El valor implícito con la mediana es de 76,63 EUR, casi el precio. Son tres empresas: los comparables solo sirven para decir que el sector entero cotiza a múltiplos de liquidación.',
    },
    financieros: {
      ajustes: 'TP publica un EBITA recurrente (antes de amortizar los intangibles comprados y de los gastos no recurrentes) y un resultado neto ajustado: 807 M en 2024 frente a 523 M publicados, y 781 M en 2025 frente a 497 M [A9, A11]. La diferencia (≈280 M al año) es la amortización de las carteras de clientes compradas, los pagos en acciones y la reestructuración, que se repiten todos los años. El informe usa el BPA publicado (8,40 EUR en 2025) y el EBITDA publicado con esas partidas dentro, para no tratar como no recurrente lo que se repite. No se ha podido separar el resultado financiero ni los impuestos de cada año; el gasto financiero implícito en 2025 ronda los 300-330 M con un impuesto del 32 % (estimación propia).',
    },
  },

  dcf_justificacion: {
    crecimiento: '2026e −3,3 % (fijo): guía comparable del 0-2 %, primer semestre en −1,7 % y un efecto divisa de −165 M solo en el semestre [A1, A2]; ventas de ≈9.870 M. 2027e +1 % y 2028e +2 %: volúmenes de Core Services planos y algo de precio, nuevos servicios de IA y TLScontact creciendo a doble dígito [A1]. Después +1,5 % hasta 2030e y +1 % hasta 2035e. Es menos de la mitad del objetivo de la empresa (4-6 % orgánico en 2028) [D4], y por debajo del crecimiento comparable de 2024-25 (+1-3 %).',
    margenes: 'Margen EBITDA publicado (con reestructuración dentro): 17,7 % en 2024 y 17,2 % en 2025 [A4, A8]. 2026e 16,6 % por la reestructuración de 120-140 M; 17,2 % en 2027e y 17,5 % en 2028-30e con los ahorros de 150-170 M, la mitad ya en 2026 [A1, A2]. Después baja una décima al año hasta el 17,0 % por la presión de precios de la IA. Es el margen de 2024 más los ahorros anunciados, no una mejora estructural.',
    inversion: 'Capex del 5,6 % de las ventas: 2,5 % del estado de flujos (253 M en 2025) más 3,1 % de pagos de arrendamientos (315 M), porque los arrendamientos están en la deuda [A8, A13]. La amortización baja del 6,8 % al 5,6 % a medida que se agota la de las carteras de clientes compradas (Majorel). Circulante: sin dato de clientes en el balance accesible, se deja constante (0 % de variación); con un crecimiento del 1 % su efecto es de unos 10 M al año.',
    wacc: 'Tasa libre del 2,97 % (Bund a 10 años, último dato mensual de la OCDE, junio de 2026) [D17]. Beta de 1,0: la publicada para el ADR (0,59-0,66, datos de 2024-25) no recoge el riesgo actual de un negocio que ha perdido el 80 % en bolsa; con 0,7 el valor subiría un 20 %. Prima de mercado del 5,5 % y 2 puntos de prima adicional por el riesgo de sustitución por la IA y la entrega desde países emergentes. Coste de la deuda del 4,0 % antes de impuestos y peso de la deuda del 40 %. WACC del 7,37 %.',
    terminal: 'Crecimiento a perpetuidad del 1,0 %, por debajo de la inflación de la zona euro: supone una pérdida lenta de volumen real. El valor terminal pesa un 55 % del valor empresa. El múltiplo de salida de contraste (6x EBITDA) daría bastante menos; Gordon implica ≈1/(WACC − g) del NOPAT, muy por encima de lo que el mercado paga hoy por el sector, y por eso el valor objetivo pondera el DCF solo al 45 %.',
  },

  puente_comentarios: {
    '2026e': 'Volumen −1 % (comparable del 1S26 en −1,7 %, guía anual del 0-2 %) [A1]; precio 0; otros −2,3 % = divisa (−165 M en el semestre, dólar y monedas latinoamericanas) [A2].',
    '2027e': 'Volumen plano en Core Services; precio +0,5 % (contratos con indexación parcial) y otros +0,5 % (TLScontact y LanguageLine) [A1].',
    '2028e': 'Volumen +0,5 %, precio +0,5 % y +1 % de servicios de IA y datos que la empresa empieza a vender (más de 550 proyectos de IA en el 1T26) [B10].',
    '2029e': 'Volumen y precio +0,5 % cada uno, servicios especializados +0,5 %.',
    '2030e': 'Igual que 2029e.',
  },

  veredicto: 'En parte',
  sostenibilidad_justificacion: 'En parte. Las pruebas de financiación pasan con holgura: el crecimiento medio proyectado es del 0,8 % anual y apenas necesita capital (la reinversión neta es negativa porque la amortización de las carteras compradas supera al capex, que hacemos a mano: el capex bruto del 5,6 % de las ventas basta para un negocio de personas y oficinas). La duda está en el volumen, no en el dinero: el foso es estrecho y se estrecha, el poder de precios es bajo (comparable del −1,7 % en el 1S26) y la IA puede sustituir las interacciones simples [A1, B10]. El caso base ya no supone crecimiento de volumen en 2026-27 y queda por debajo del crecimiento comparable de 2024-25, así que no se rebaja; el riesgo de volumen va al bajista (−4 puntos al año).',

  dcf_lectura: 'El DCF da 149,01 EUR por acción (+99,7 % sobre 74,62), con un WACC del 7,37 % y un valor terminal del 55 %; la sensibilidad (WACC y crecimiento ± 0,5 puntos) va de 125,97 a 180,35 EUR. El DCF inverso es la clave: a 74,62 EUR el mercado descuenta que los ingresos caigan un 4,9 % al año de 2027 a 2035 con nuestro margen, o un margen EBITDA del 13 % con nuestro crecimiento, y la rentabilidad implícita para el comprador es del 10,9 %. Es una hipótesis de declive estructural por la IA, no de estancamiento. Nuestro base (1,2 % anual en esos años, margen del 17 %) es conservador frente a la historia (comparable de +1-3 % en 2024-25) pero optimista si la sustitución se acelera, y por eso el bajista (−4 puntos al año, margen −2,5 puntos, terminal del −1 %) da 45,27 EUR. El valor no depende de que TP vuelva a crecer, sino de que no se hunda: con la caja que genera (901 M en 2025) basta con que los ingresos caigan menos de un 2-3 % al año para que la acción esté barata.',

  narrativas: {
    Bajista: 'Los clientes despliegan agentes de IA más deprisa de lo previsto y los volúmenes de Core Services caen un 3-4 % al año, como hoy descuenta Concentrix a 2 veces beneficios; el precio por hora baja en las renovaciones y el margen EBITDA cae al 15 %. TP recorta el dividendo para no subir la deuda.',
    Base: 'Volúmenes planos en 2026-27 con los ahorros del programa de eficiencia (150-170 M) que devuelven el margen EBITDA al 17,5 %; TLScontact y LanguageLine crecen y los servicios de IA compensan las interacciones que se pierden. El cash flow neto se queda en 800-900 M al año y la deuda baja despacio.',
    Alcista: 'La IA resulta más complemento que sustituto: TP vende integración, supervisión y datos para modelos, vuelve a un crecimiento comparable del 2-3 % en 2027-28 y el margen sube al 18 % con los ahorros completos; el mercado vuelve a pagar 10-11 veces beneficios.',
  },
  escenarios_comentario: 'El DCF da 45,27 EUR en el bajista (−39,3 %), 149,01 en el base y 182,97 en el alcista (+145,2 %), con una asimetría a largo plazo de 3,69 veces. A 12 meses, que es lo que manda, la asimetría es mucho menor (1,57 veces): el bajista con PER de 7,4x da 47,06 EUR (−30,9 % con el dividendo) y el alcista, con el techo de 10,6x, 117,98 (+64,1 %). Le doy un 30 % al bajista porque es lo que ya descuenta parte del sector (Concentrix) y porque los ingresos comparables llevan un año en negativo; el alcista, un 20 %, porque exige que los datos de volumen giren antes de 2028.',

  suma_partes_comentario: 'No aplica en este informe: Specialized Services (14 % de los ingresos y margen EBITA del 33 % en el 1S26) merecería un múltiplo mayor que Core Services, pero la empresa no publica en las fuentes accesibles el resultado anual por actividad ni hay comparables cotizados puros de interpretación o de visados [A1].',

  valoracion_comentario: 'El DCF pesa un 45 % porque el negocio genera caja estable y conocida (≈900 M al año) y el valor depende de una sola variable, el volumen, que los escenarios (40 %) recogen mejor que los comparables. Los comparables pesan un 15 % porque solo hay tres y el sector entero cotiza a múltiplos de liquidación (Concentrix a 2x). La dispersión entre métodos es enorme: los comparables dan 48-128 EUR y el DCF 126-180, lo que dice que el precio refleja una opinión sobre la IA y no una valoración de la caja. El valor objetivo ponderado es de 128,42 EUR (+72,1 %), pero es una referencia de largo plazo: a 12 meses, el objetivo es de 79,20 EUR.',

  rentabilidad_comentario: 'Con el balance incompleto, el ROIC del motor (13,2 % en 2025) está inflado: le falta parte del capital invertido. Nuestro cálculo: NOPAT de 717 M (EBIT publicado de 1.055 M × (1 − 32 %)) sobre un capital de ≈8.080 M (patrimonio estimado de 4.107 M + deuda neta con arrendamientos de ≈3.970 M) da un ROIC del 8,9 %, 1,5 puntos por encima del WACC del 7,37 % [A10, A13]. Con el EBITA recurrente que publica la empresa (1.485 M) subiría al 12,5 %, pero esa cifra excluye costes que se repiten. El ROIC ha caído desde 2022 porque Majorel añadió ≈2.400 M de capital y casi nada de beneficio publicado: el EBIT de 2025 (1.055 M) es prácticamente el de 2022 (992 M) [A4]. Crea algo de valor, poco, y la compra de Majorel lo diluyó.',

  diferencia_consenso: 'Nuestro BPA de 2028e (10,12 EUR) queda un 6 % por debajo del de MarketScreener (10,79, anterior a los resultados del semestre) por un gasto financiero mayor (280 M) que recoge el de 2025. El de 2027e (9,16) queda un 7 % por debajo del consenso (9,89). Nuestro precio base (82,98 EUR) queda un 10,2 % por encima del objetivo medio de los analistas (75,33 EUR, ABC Bourse), que pesa más el riesgo de la IA en el múltiplo; el objetivo ponderado (79,20) queda a un 5 % del consenso. No se corrige la cifra para acercarla.',

  objetivo12m_comentario: 'Con la regla común, el objetivo ponderado es de 79,20 EUR (+12,2 % con el dividendo del 6,0 %) y el base de 82,98 (+17,2 %): la base supera el umbral del 12 % pero la ponderada no llega al 15 % porque el bajista (7,4x × 6,36 = 47,06 EUR) pesa un 30 %. El valor intrínseco (128,42 EUR) queda un 62 % por encima del objetivo a 12 meses: para cerrar esa distancia el mercado tendría que dejar de descontar un declive del 4,9 % anual, y eso solo lo harán varios trimestres de volúmenes estables (el primero, la cifra de ventas del 3T26). La tesis de valor es a más de un año.',

  catalizadores: {
    items: [
      { fecha: 'Finales de octubre o principios de noviembre de 2026', evento: 'Ingresos del 3T26 (Stock Analysis apunta al 6-nov) [D9]', efecto: 'Si el comparable mejora frente al −1,2 % del 2T26, confirma la estabilización; si vuelve a −2 % o peor, el bajista gana peso', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: 'Febrero de 2027', evento: 'Resultados de 2026 y guía de 2027', efecto: 'Cumplir el cash flow de 800-850 M y un margen del 14,6 % sostendría el dividendo de 4,50 EUR y el PER', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2027', evento: 'Primer plan estratégico de Jorge Amar (consejero delegado desde marzo de 2026) [C1]', efecto: 'Puede reformular los objetivos de 2028 (4-6 % orgánico) y la política de capital', probabilidad: 'Media', sentido: '+/−' },
      { fecha: 'Mayo de 2027', evento: 'Junta y dividendo del ejercicio 2026', efecto: 'Un dividendo mantenido o al alza confirma la confianza en la caja; un recorte sería la señal del bajista', probabilidad: 'Alta', sentido: '+/−' },
    ],
    confianza: 'Media',
  },

  riesgos: {
    items: [
      { riesgo: 'Sustitución de interacciones simples por agentes de IA', tipo: 'Tecnológico', probabilidad: 'Alta', impacto: 'Alto', efecto_valor: '−39 % (bajista del DCF); −31 % a 12 meses', mitigante: 'Más de 550 proyectos de IA con clientes, servicios especializados (14 % de ingresos, margen del 33 %) y ahorros de 150-170 M', senal: 'Crecimiento comparable de Core Services por debajo del −3 % dos trimestres seguidos' },
      { riesgo: 'Pérdida o recorte de grandes clientes tecnológicos en las renovaciones', tipo: 'Comercial', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−10 a −15 %', mitigante: 'Contratos plurianuales y base de clientes diversificada', senal: 'Avisos de no renovación como el de visados del 1S26' },
      { riesgo: 'Divisa: dólar débil y apreciación de las monedas de entrega (peso colombiano)', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 %', mitigante: 'Coberturas y entrega diversificada', senal: 'Efecto divisa superior a −3 % de los ingresos' },
      { riesgo: 'Deuda (≈4.000 M netos con arrendamientos, 2,5x EBITDA) si cae el EBITDA', tipo: 'Financiero', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−10 % (menos dividendo y recompras)', mitigante: 'Cash flow neto de 800-850 M al año; vencimientos de 2027-28 recomprados en parte', senal: 'Deuda neta sobre EBITDA por encima de 3x' },
      { riesgo: 'Gastos no recurrentes que se repiten (reestructuración de 120-140 M en 2026)', tipo: 'Contable', probabilidad: 'Alta', impacto: 'Bajo', efecto_valor: '−5 %', mitigante: 'Ahorros anuales de 150-170 M', senal: 'Nueva ampliación del programa de reestructuración en 2027' },
      { riesgo: 'Ejecución de un equipo directivo nuevo (consejero delegado y presidente en 2026)', tipo: 'Gobierno', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 %', mitigante: 'Guía de 2026 confirmada en julio', senal: 'Nuevo recorte de guía o salida de directivos clave' },
    ],
    premortem: 'Es octubre de 2029 y la acción vale 45 EUR. En 2027 los grandes clientes tecnológicos desplegaron agentes de IA en sus servicios de atención de primer nivel y los volúmenes de Core Services cayeron un 4 % al año; las renovaciones se hicieron con rebajas de precio por hora. Los ahorros del programa de eficiencia se fueron en defender el margen, que cayó al 15 %, y el cash flow neto bajó a 600 M. Para no superar 3 veces de deuda sobre EBITDA, TP recortó el dividendo y el mercado, que la valoraba por la rentabilidad del 6 %, la llevó a 6-7 veces un beneficio menguante. Los indicadores que lo habrían anticipado: el crecimiento comparable de Core Services trimestre a trimestre (por debajo del −3 %), la evolución del precio por hora en las renovaciones y el peso de los ingresos de servicios de IA, que nunca llegaron a compensar.',
    confianza: 'Media',
  },

  preguntas: {
    items: [
      { tema: 'IA y volumen', pregunta: '¿Qué parte de los ingresos de Core Services procede de interacciones de nivel 1 automatizables y a qué ritmo la están sustituyendo los clientes?', por_que: 'Es la variable que separa el bajista (−4 puntos al año) del base.' },
      { tema: 'Precio', pregunta: '¿Cómo han evolucionado los precios por hora en las renovaciones de 2025-26 y qué parte de los contratos se factura ya por resultado?', por_que: 'El poder de precios decide si los ahorros llegan al margen.' },
      { tema: 'Capital', pregunta: '¿Mantendrá el dividendo de 4,50 EUR si el cash flow baja de 800 M o priorizará la deuda?', por_que: 'El dividendo es el 6 % de la rentabilidad a 12 meses.' },
      { tema: 'Balance', pregunta: '¿Cuál es el fondo de comercio de Majorel y hay riesgo de deterioro si el plan de 2028 se revisa?', por_que: 'Un deterioro no movería la caja pero sí el patrimonio y los covenants.' },
      { tema: 'Specialized Services', pregunta: '¿Contemplaría vender o separar LanguageLine o TLScontact para cristalizar su valor?', por_que: 'Con un margen del 33 % probablemente valen un múltiplo superior al del grupo.' },
      { tema: 'Gobierno', pregunta: '¿Quiénes son hoy los principales accionistas y qué peso tienen los antiguos accionistas de Majorel en el consejo?', por_que: 'No se ha podido comprobar el accionariado en este análisis.' },
    ],
    confianza: 'Media',
  },

  fuentes: [],
  huecos: [
    { seccion: 'rentabilidad', campo: 'capital invertido completo (activo, fondo de comercio y circulante)', tipo: 'Núcleo', intentos: '1) informe semestral 2026 (no accesible); 2) Stock Analysis (solo caja y deuda); 3) ratio deuda/patrimonio para estimar el patrimonio', decision: 'Calculado y marcado como estimación' },
  ],
};
