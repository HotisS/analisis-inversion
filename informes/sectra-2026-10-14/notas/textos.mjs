// Textos del analista (Sectra, corte 2026-10-14). Citas con la letra de la nota.
export default {
  limitaciones: 'Análisis hecho desde la nube con la red limitada a la búsqueda web: la web de Sectra, Cision, Nasdaq y los proveedores de datos no se pudieron abrir, así que las cifras salen de los extractos de búsqueda de los comunicados de resultados, de Stock Analysis, Investing y MarketScreener y de la prensa sueca, cruzadas cuando fue posible; la confianza es menor que en un análisis normal. Ejercicio de mayo a abril, etiquetado por el año en que termina (FY2026 = may-2025 a abr-2026). Línea cotizada: acciones B (SECT B) en Nasdaq Stockholm; las A (diez votos) no cotizan. Precio: cierre del 9-oct-2026 (310,20 SEK), el último verificable [D1, D3]. Estimaciones propias marcadas: amortizaciones (2,7 % de las ventas), resultado antes de impuestos con un tipo del 21,5 % y dividendos pagados (DPA × acciones). Sin precios de cierre de cada ejercicio: el PER histórico de la regla a 12 meses es una estimación a partir de los PER publicados por la prensa y los proveedores (ver valoración). Comparables de Pro Medicus (MarketScreener a 12-oct) pasados a SEK con el tipo del BCE del 9-oct [D14, D15].',

  controles_explicados: [],

  secciones: {
    bolsa: null,
    multiplos_historicos: null,
    comparables: {
      criterio: 'Los mismos comparables que el informe de Pro Medicus del 12-oct, con Pro Medicus dentro y Sectra fuera: software vertical de alto margen (Veeva, Doximity, Craneware en sanidad; WiseTech, Xero, TechnologyOne y Nemetschek como software «de calidad» con el que compite por el capital) y el competidor directo cotizado más puro en PACS [D7-D14]. Fuera: GE HealthCare, Philips y Fujifilm (fabricantes con márgenes del 10 %), Agfa (conglomerado con pérdidas en otras divisiones) y CompuGroup y Nexus (excluidas de bolsa).',
      comentario: 'Sectra cotiza a 74,7 veces el beneficio de los próximos 12 meses frente a una mediana de 41,9 en los comparables, y a 66,2 veces el EBITDA de los últimos 12 meses frente a 17,4, con un crecimiento esperado parecido a la mediana (14,3 %) y un margen EBITDA de 23,6 %, la mitad que el grupo (42,2 %). La prima no la justifica ni el margen ni el crecimiento: solo Pro Medicus (87 veces) cotiza más caro, con un margen tres veces mayor [D14]. Con las medianas el valor sale entre 86,53 (EV/EBITDA) y 174,08 SEK (PER). Usamos el PER como referencia principal porque el EBITDA de los comparables mezcla definiciones (Veeva y Doximity suman los pagos en acciones) [D7, D8].',
      confianza: 'Media',
    },
    catalizadores: {
      items: [
        { fecha: '25-nov-2026', evento: 'Resultados del 2T FY2027 (agosto-octubre)', efecto: 'Pedidos tras dos trimestres de −46 % y margen tras el 19,8 % del 1T [D5].', probabilidad: 'Alta', sentido: '+/−' },
        { fecha: 'Dic-2026', evento: 'Congreso RSNA (Chicago)', efecto: 'Contratos de nube en EE. UU. frente a Pro Medicus y GE-Intelerad.', probabilidad: 'Media', sentido: '+' },
        { fecha: 'Mar-2027', evento: 'Resultados del 3T FY2027', efecto: 'Ingresos recurrentes de nube por encima de 1.200 M en 12 meses confirmarían la tesis de margen.', probabilidad: 'Alta', sentido: '+/−' },
        { fecha: 'Jun-2027', evento: 'Cierre de FY2027 y propuesta de dividendo', efecto: 'Primer año completo con margen operativo por encima del 22 %, si se cumple el base.', probabilidad: 'Alta', sentido: '+' },
        { fecha: '2027-2028', evento: 'Renovaciones de grandes contratos regionales en Europa y Canadá', efecto: 'Prueba del poder de precios frente a GE-Intelerad [B4].', probabilidad: 'Media', sentido: '+/−' },
      ],
      confianza: 'Media',
    },
    riesgos: {
      items: [
        { riesgo: 'Compresión del múltiplo (PER de 97 veces el beneficio de 12 meses)', tipo: 'Valoración', probabilidad: 'Alta', impacto: 'Alto', efecto_valor: '−31 % (bajista a 12 meses, PER de 60)', mitigante: 'Crecimiento del beneficio del 20 % anual', senal: 'Caída de la acción tras unos resultados en línea' },
        { riesgo: 'Pedidos que no se recuperan (−46 % dos trimestres seguidos)', tipo: 'Negocio', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−45 % sobre el valor intrínseco (escenario bajista del DCF)', mitigante: 'Cartera contratada de 7.600 M', senal: 'Pedidos del 2T FY2027 por debajo de 1.000 M' },
        { riesgo: 'Competencia de GE HealthCare-Intelerad y Pro Medicus en la nube', tipo: 'Competencia', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−15 % (2 puntos menos de crecimiento)', mitigante: 'Satisfacción de clientes líder (KLAS) [B8]', senal: 'Concursos perdidos en EE. UU. o Canadá' },
        { riesgo: 'Margen que no se recupera por la inversión en nube y seguridad', tipo: 'Negocio', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−20 % (3 puntos menos de margen)', mitigante: 'Apalancamiento visto en el 1T', senal: 'Margen operativo trimestral por debajo del 17 %' },
        { riesgo: 'Incidente de ciberseguridad en la nube', tipo: 'Operativo', probabilidad: 'Baja', impacto: 'Alto', efecto_valor: '−25 %', mitigante: 'Experiencia en cifrado (OTAN) [B9]', senal: 'Aviso de incidente o auditoría negativa' },
        { riesgo: 'Gobierno de fundadores y sucesión', tipo: 'Gobierno', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'Prima de riesgo de 0,5-1 punto', mitigante: 'Fundadores con el 19 % del capital', senal: 'Salida del primer ejecutivo sin sucesor externo' },
      ],
      premortem: 'Octubre de 2029: la acción ha perdido un 40 %. Los pedidos de 2026 no eran ruido: GE HealthCare, con Intelerad, ganó dos concursos regionales en Canadá y Reino Unido ofreciendo la nube a menor precio junto a sus equipos, y Pro Medicus se quedó las grandes redes de EE. UU. Sectra siguió creciendo, pero al 8-10 % y no al 15-20 %, y el margen operativo se quedó en el 20-21 % porque el coste de operar la nube y la seguridad subió con los clientes. El beneficio por acción creció un 10 % anual, pero el mercado dejó de pagar 80-100 veces y pasó a pagar 50, el nivel de los comparables de software de calidad. Las señales estaban en 2026: dos trimestres de pedidos a la mitad, el flujo operativo del 1T en 3 M y un precio que ya descontaba un 22 % anual durante diez años.',
      confianza: 'Media',
    },
    preguntas: {
      items: [
        { tema: 'Pedidos', pregunta: '¿Qué parte de la caída de pedidos de 2026 es calendario de renovaciones y qué parte son concursos perdidos? ¿Cuántos concursos han perdido frente a GE-Intelerad o Pro Medicus?', por_que: 'La tesis depende de que los pedidos vuelvan a 8.000 M al año.' },
        { tema: 'Margen de la nube', pregunta: '¿Qué margen bruto tiene un cliente de Sectra One frente a uno de licencia al quinto año?', por_que: 'Decide si el margen EBITDA llega al 29 % del caso base.' },
        { tema: 'Precio', pregunta: '¿Cuánto más paga un cliente al pasar a la nube y qué subidas de tarifa han conseguido en las renovaciones?', por_que: 'Es la prueba del poder de precios que falta.' },
        { tema: 'Caja', pregunta: '¿Por qué el flujo operativo del 1T fue de 3 M y cuánto se recuperará en el año?', por_que: 'Conversión de beneficio en caja.' },
        { tema: 'Secure Communications', pregunta: '¿Qué resultado operativo tuvo en FY2026 sin el acuerdo de patentes, y hay intención de separarla?', por_que: 'Posible suma de partes.' },
        { tema: 'Sucesión', pregunta: '¿Cuál es el plan de sucesión del primer ejecutivo cofundador?', por_que: 'Riesgo de gobierno.' },
      ],
      confianza: 'Media',
    },
  },

  dcf_justificacion: {
    crecimiento: 'Base del 17 % en FY2027e, cerca del consenso (17,6 %) y por debajo del ritmo del 1T (25,8 %) [A2, D2]; después baja al 13 %, 10 % y hasta el 3,5 % en FY2036e. La TCAC de FY2022-FY2026 fue del 16,1 % [A5]. La senda se rebajó desde un 10,8 % medio al 7,8 % para pasar la prueba de cuota de mercado (sostenibilidad): con el mercado de imagen médica IT creciendo al 3,7 % [B1, B2], crecer al 10,8 % llevaba a Sectra de ~5 % a ~10 % del mercado mundial.',
    margenes: 'EBITDA del 24,5 % en FY2027e al 29 % desde FY2033e, frente al 22,8 % de FY2026 y al 22,4 % de FY2022, antes de la transición a la nube [A1]. El consenso implica un margen operativo del 22,4 % en FY2027e y del 23,5 % en FY2028e [D2]. Es por debajo del de Pro Medicus (75 %) y de la mediana de los comparables (42,2 %) y por encima del de Agfa HealthCare IT (11,2 %) [B5, B6].',
    inversion: 'Capex del 2,5 % de las ventas (FY2026: 2,4 %; FY2024: 6,0 % por centros de datos) y amortizaciones del 2,7 % (estimación) [A5]; circulante neutro: los clientes pagan por adelantado. El negocio apenas necesita capital: el ROIC de FY2026 es del 104,6 %.',
    wacc: 'Tasa libre del 3,0 %, el bono sueco a 10 años de julio de 2026 (2,98 %), el último dato fechado [D21]. Beta de 1,0 (sin serie propia: bolsa.mjs no funciona aquí; los comparables de software rondan 1,0-1,2). Prima de mercado del 5,5 %, sin deuda: WACC del 8,5 %. Con la prima implícita del mercado (4,2 %) el WACC baja al 7,2 % [D22].',
    terminal: 'Gordon con crecimiento del 2,5 % (inflación sueca del 2 % y medio punto real), medio punto por debajo de la tasa libre. El terminal pesa un 61 % del valor. Un múltiplo de salida de 30 veces el EBITDA, por encima de los comparables (15,1), daría más valor, pero supone que el mercado seguirá pagando el doble que por el software de calidad.',
  },
  etapa2_justificacion: null,
  puente_comentarios: {
    'FY2027e': 'Volumen: clientes nuevos de nube (Canadá, EE. UU., Brasil) y especialidades nuevas; precio: más ingreso por cliente al pasar a la nube; otros: conversión de licencias a suscripción e ingresos recurrentes de nube +75 % en el 1T [A2, B11].',
    'FY2028e': 'La cartera contratada de 7.600 M sostiene el volumen; la conversión a la nube se frena [A1].',
    'FY2029e': 'Crecimiento por encima del mercado (3,7 %) solo con ganancia de cuota en EE. UU.',
    'FY2030e': 'Volumen al 5 % y precio en línea con la inflación sanitaria.',
    'FY2031e': 'Cuota estabilizada; precio al 3 %.',
  },
  veredicto: 'En parte',
  sostenibilidad_justificacion: 'En parte, con el caso base ya rebajado. La calidad sostiene crecer sin capital: ROIC del 104,6 % y ROIC incremental histórico del 98,5 %, el cliente paga por adelantado y la reinversión es casi nula, así que la prueba de reinversión no aplica (activos ligeros) y la que cuenta es la de cuota y precio. Prueba de cuota a mano (estimación propia): Imaging IT vendió 3.057,4 M SEK (≈307 M USD) en FY2026, un 5,0 % de un mercado mundial de ~6.135 M USD [A13, B1, B2]. Con la senda inicial (10,8 % anual) llegaba al ~9,7 % en FY2036e, 1,9 veces la cuota actual: fallaba. Rebajada al 7,8 % anual, la cuota final queda en ~7,3 % (1,46 veces): pasa. Lo que no está probado es el precio: Sectra no publica subidas de tarifa.',
  dcf_lectura: 'El DCF da 109,32 SEK por acción, un 64,8 % por debajo del precio, con el terminal pesando un 61 % del valor; con la prima de riesgo que hoy pide el mercado (WACC del 7,2 %), 138,78. El DCF inverso es la clave: para justificar 310,20 SEK hay que crecer un 22,1 % anual durante diez años con nuestro margen final del 29 %, frente al 7,8 % de nuestro caso base y al 16,1 % de los últimos cuatro años; ningún margen por debajo del 59 % lo justifica con nuestro crecimiento. Quien compra hoy obtiene un 4,6 % anual con nuestras cifras, por debajo del WACC (8,5 %) y casi igual que la tasa libre más poco. Es exigente frente a la historia: supone que Sectra multiplica por ocho sus ventas en diez años en un mercado que crece un 3,7 %.',
  narrativas: {
    Bajista: 'Los pedidos de 2026 marcan una tendencia: GE-Intelerad y Pro Medicus ganan los concursos grandes y el crecimiento baja cinco puntos cada año; el coste de la nube deja el margen tres puntos por debajo del base.',
    Base: 'La nube madura, el crecimiento converge del 17 % al 3,5 % en diez años y el margen EBITDA sube al 29 %.',
    Alcista: 'Sectra gana cuota en EE. UU. y Brasil y el apalancamiento del 1T dura: tres puntos más de crecimiento y dos de margen cada año.',
  },
  escenarios_comentario: 'En valor intrínseco ningún escenario se acerca al precio: el alcista (145,88 SEK) queda un 53,0 % por debajo y el bajista (68,40) un 77,9 %. La asimetría es negativa en el largo plazo. A 12 meses, con la regla común de múltiplos, el cuadro cambia: el alcista gana un 55,4 % y el bajista pierde un 31,1 % (asimetría 1,74x), porque la regla supone que el mercado sigue pagando 60-95 veces el beneficio. La diferencia entre los dos horizontes es la tesis: el precio solo se sostiene si el múltiplo no se normaliza.',
  per_excluidos: 'Sin años excluidos (beneficio positivo y creciente todos los años). Estimación por falta de precios de cierre de cada ejercicio (bolsa.mjs no funciona aquí): la prensa describe un PER «de alrededor de 100 durante años» y MarketScreener daba 87,1 veces el beneficio de FY2026 en marzo de 2026 [D26, D2]; mediana de 5 años ≈ 90 y media larga ≈ 95. Mínimo de 5 años ≈ 60: el mínimo de 52 semanas (173,3 SEK, feb-mar 2026) sobre el BPA de 12 meses de entonces (~2,9) [D23, A10]. Actual = 310,20 ÷ 3,76 (nuestro BPA de FY2027e) = 82,5.',
  diferencia_consenso: 'Nuestro BPA de FY2028e (4,43) queda un 1,1 % por debajo del consenso (4,48) [D2]: coincidimos en ventas (4.683 frente a 4.840 M) y somos algo más prudentes en margen. Nuestro precio base a 12 meses (365,48 SEK) queda un 7,5 % por encima del objetivo medio de los analistas (340) porque aplicamos el PER actual (82,5), que la regla común toma por ser menor que la mediana de cinco años; los analistas suelen usar múltiplos más bajos. La diferencia no es de cifras sino de múltiplo.',
  objetivo12m_comentario: 'El objetivo a 12 meses (356,02 SEK, +15,2 %) y el valor intrínseco (125,24, −59,6 %) están a 231 SEK de distancia, la mayor del universo analizado. El primero supone que el mercado sigue pagando 82,5 veces el beneficio; el segundo, que los flujos se descuentan al 8,5 %. Cerrar esa distancia exigiría crecer un 22 % anual diez años, y no hay catalizador con fecha que la cierre: la tesis de valor es a varios años y en contra.',
  valoracion_comentario: 'Pesos: DCF 50, comparables 25 y escenarios 25; transacciones a 0 porque los fundadores controlan el 34 % de los votos y una OPA es improbable. Todos los métodos de largo plazo dan entre 68 y 218 SEK: DCF 109,32, comparables por PER 174,08, transacciones 171,70 (Intelerad a 8,5 veces las ventas) [D20]. La dispersión es pequeña frente a la distancia al precio (310,20), que ningún método cubre. El valor intrínseco ponderado es 125,24 SEK. El objetivo a 12 meses, que manda en la recomendación, sale de nuestro BPA por el PER de la regla común y queda en 356,02.',
  rentabilidad_comentario: 'Sectra crea valor de forma holgada: ROIC por encima del 55 % todos los años de la serie y del 104,6 % en FY2026, frente a un WACC del 8,5 %. Lo mueve la rotación del capital, no el margen: el capital invertido operativo es pequeño (533 M) porque los clientes pagan por adelantado y la caja (1.810 M) no cuenta [A6]. El ROIC bajó al 55-66 % en FY2024-FY2025 por el capex de centros de datos (178,5 M) y la caída del margen durante la transición a la nube, y se recupera en FY2026 [A5, A12]. El ROE (27,8 %) es menor porque la caja diluye el patrimonio [A9]. Frente a Pro Medicus (ROIC del 110,5 %) está al mismo nivel con un margen tres veces menor [D14].',
  fuentes: [],
  huecos: [],
  parches: [],
  huecos_resueltos: [],
};
