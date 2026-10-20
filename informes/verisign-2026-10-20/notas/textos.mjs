// Textos de juicio de VeriSign (corte 2026-10-20). Las cifras de valoración salen de calc tal cual (segundo cálculo).
export default {
  limitaciones: 'Cifras en millones de USD (US GAAP), ejercicio natural. Último ejercicio real: 2025; LTM a 30-jun-2026 (los resultados del 3T26 se publican el 22-oct-2026, dos días después del corte). Precio: cierre del 19-oct-2026 (306,48 USD); la sesión del 20-oct estaba abierta (307,06 USD a las 10:15 de Nueva York [D2]) y la decisión se comprueba con el precio del día en las pruebas de robustez. Serie de cuentas de 2018 a 2025: en 2016-2017 había obligaciones convertibles que cambian deuda y acciones. Caja = efectivo + letras del Tesoro (valores negociables). El circulante incluye los ingresos diferidos (cobros anticipados de registros), por eso es −101 % de las ventas. El ROIC del motor no se calcula (capital invertido negativo por recompras): se usa el ROIC sobre el capital operativo fijo. Consenso de solo 4-5 analistas (Yahoo); sin estimaciones de 2028 ni de EBITDA. Comparables de «peaje» (agencias de calificación, datos, bolsas) porque no hay otro registro cotizado de tamaño parecido; su PER es en parte ajustado. Precio en EUR: ≈ 263 EUR por acción (a ≈ 1,165 USD por EUR, estimación), un 0,9 % de una cartera de 30.000 EUR.',
  controles_explicados: [
    { control: 'Sección de núcleo con datos: rentabilidad', explicacion: 'Rellenada en propio; el ROIC del motor no aplica (capital invertido negativo).' },
    { control: 'Tipo impositivo efectivo razonable', explicacion: '2020 y 2021 con impuesto negativo por la reorganización fiscal internacional (beneficios fiscales no recurrentes); 2023 al 16 %. El DCF usa el 23 %.' },
    { control: 'ROIC', explicacion: 'Capital invertido negativo por el patrimonio negativo (recompras) y los ingresos diferidos: el ROIC sobre el capital operativo fijo (inmovilizado, fondo de comercio y depósito de .web, ≈ 411 M) es del ≈ 211 % en 2025 y el del motor sobre el capital fijo sin el depósito, del 319 %.' },
    { control: 'Transacciones', explicacion: 'No hay compras de registros con múltiplo publicado; sección omitida y registrada en huecos.' },
  ],
  huecos: [
    { seccion: 'esg', campo: 'calificaciones ESG publicadas', tipo: 'Complemento', intentos: '1) 10-K y proxy (no citan calificaciones); 2) web de responsabilidad de Verisign (sin calificaciones de agencias); 3) MSCI y Sustainalytics (requieren registro)', decision: 'Omitido' },
  ],
  secciones: {
    historia: {
      resumen: 'VeriSign nació en 1995 como escisión de RSA Security para vender certificados digitales. En 2000 compró Network Solutions por ≈ 21.000 M USD en acciones, y con ella el registro de .com y .net. En la década siguiente vendió todo lo demás (certificados a Symantec en 2010, el registrador Network Solutions, servicios de pagos y de seguridad) hasta quedar como puro operador de registros desde 2011, con el fundador D. James Bidzos como consejero delegado [A1, C12]. Desde 2018 la Amendment 35 con el Departamento de Comercio volvió a permitir subidas de precio de .com, y en 2024-2025 se renovaron los contratos de .com hasta 2030 [B1, B2]. En 2019 Berkshire Hathaway llegó al 14 % y en julio de 2025 vendió un tercio [C6, D11].',
      hitos: [
        { anio: '1995', hito: 'Fundación como escisión de RSA Security (certificados digitales) [C12].' },
        { anio: '2000', hito: 'Compra de Network Solutions y del registro de .com y .net [A1].' },
        { anio: '2010', hito: 'Venta del negocio de certificados a Symantec; empieza la etapa de puro registro [A1].' },
        { anio: '2012', hito: 'Comercio congela el precio de .com en 7,85 USD (Amendment 32) [B1].' },
        { anio: '2016', hito: 'Subasta de .web: depósito de 145 M USD y nueve años de litigios con Altanovo [A1].' },
        { anio: '2018', hito: 'Amendment 35: permite subidas del 7 % en cuatro de cada seis años [B1].' },
        { anio: '2021-2024', hito: 'Cuatro subidas de .com: de 7,85 a 10,26 USD [A1].' },
        { anio: '2024', hito: 'Renovación del .com Registry Agreement hasta el 30-nov-2030 [B2].' },
        { anio: '2025', hito: 'Primer dividendo (0,77 USD trimestrales) y venta de un tercio de la participación de Berkshire [A5, D11].' },
        { anio: '2026', hito: 'Delegación de .web; subida de .com a 10,97 USD (1-nov) y de .net a 12,00 (1-mar-2027) [A3, A4, B5].' },
      ],
      confianza: 'Media',
    },
    rentabilidad: {
      comentario: 'VeriSign crea valor de forma extrema: el NOPAT de 2025 (≈ 866 M USD) rinde ≈ 211 % sobre su capital operativo fijo (inmovilizado 214 M, fondo de comercio 53 M y depósito de .web 145 M), y el motor da el 319 % sobre el capital fijo sin el depósito, frente a un WACC del 9,21 %: ROIC − WACC de más de 200 puntos [A1]. El ROIC convencional no tiene sentido: el capital invertido es negativo porque los clientes pagan por adelantado (ingresos diferidos de 1.385 M) y las recompras han dejado el patrimonio en −2.154 M [A1]. El ROIC sube por margen (margen operativo del 63,2 % en 2018 al 67,7 % en 2025) y no por capital. No hay ROIC incremental que medir: el capital apenas cambia. Frente a los comparables de peaje (Moody\'s, MSCI, CME, con ROIC del 20-40 %), VeriSign necesita menos capital que ninguno [D2].',
      confianza: 'Alta',
    },
    esg: {
      calificaciones: [],
      materialidad: 'Los asuntos que mueven las cifras son de gobierno y de seguridad, no ambientales: (1) la disponibilidad y la seguridad del DNS (29 años con el 100 % de disponibilidad de .com y .net; un fallo grave pondría en riesgo los contratos) [A3]; (2) la relación con ICANN y Comercio, que fija el precio y la renovación [B1]; (3) la concentración de poder en el fundador (presidente ejecutivo y consejero delegado a los 71 años) [C1]. El consumo eléctrico de los centros de datos es pequeño frente a los ingresos (928 empleados, inversión del 1,4 % de las ventas) [A1].',
      controversias: 'Sin sanciones ni multas en los últimos tres años. Hay controversia pública sobre los precios de .com: asociaciones de titulares (Internet Commerce Association) y la NTIA pidieron en 2024 bajar o fijar el precio según el coste, sin cambio en los contratos [B8]. En octubre de 2025 un inversor bajista presentó la tesis de que el fin de AdSense for Domains hundiría la base; la empresa lo negó (< 2 % de la base) [B7].',
      confianza: 'Media',
    },
  },
  parches: [],
  huecos_resueltos: [],
  dcf_justificacion: {
    crecimiento: 'Los ingresos crecieron un 4,5 % anual en 2018-2025 con dos años de base de dominios a la baja [A1]. Proyectamos 5,8 % en 2026e (centro de la guía de 1.745-1.755 M [D7]), 9,0 % en 2027e y 2028e, 8,5 % en 2029e y 8,0 % en 2030e: volumen del 2-3,5 % (la base crece hoy al 5,1 % [A3]) más precio de ≈ 5,5-6 puntos (subida de .com del 6,9 % en noviembre de 2026 y de hasta el 7 % en 2027, 2028 y 2029, como hizo en 2021-2024 [A4, P1]). En 2031e-2032e el periodo de precios se reinicia sin subidas (5,0 % y 3,0 %), y luego 4,5 % y 3,5 %. El consenso de 2027 es +9,9 % [D2].',
    margenes: 'El margen EBITDA fue del 69,6 % en 2025 y del 69,8 % en el primer semestre de 2026 [A1, A3]. Las subidas de precio van casi enteras al resultado (costes que crecen ≈ 4-5 % al año), así que proyectamos 71,3 % en 2027e, 72,6 % en 2028e y 74,4-74,8 % desde 2030e. El margen operativo pasó del 63,2 % al 67,7 % en 2018-2025 con cuatro subidas de precio [A1].',
    inversion: 'La inversión fue del 1,4 % de las ventas en 2025 y la amortización del 1,9 % [A1]; proyectamos 2,5-2,3 % de inversión (el 10-K avisa de que el hardware se encarece por la demanda de la IA [A1]) y una amortización que sube al 2,2 %, por debajo de la inversión en el último año. El circulante se mantiene en el −100 % de las ventas (ingresos diferidos): crecer genera caja, como en la historia (−101 % en 2025 [A1]).',
    wacc: 'Tasa libre del 5,15 % (bono de EE. UU. a 10 años, 19-oct-2026 [D3]); beta de 0,80, entre la mensual de cinco años (0,67), su ajustada (0,78) y la semanal de cinco años (0,83) [D1]; prima de mercado del 5,5 %; coste de la deuda del 5,1 % antes de impuestos (cupón de los bonos de 2031 emitidos en junio [A8]) y peso del 6 % a valor de mercado (1.800 M frente a ≈ 27.800 M de capitalización). WACC del 9,21 %. Con la prima implícita del mercado (4,2 %), el WACC baja al 8,24 %.',
    terminal: 'Gordon con un crecimiento del 2,5 % en USD (inflación ≈ 2-2,5 % y volumen ≈ 0-0,5 %), por debajo de la tasa libre menos medio punto. Suponemos que los contratos se renuevan en 2030 con el mismo régimen de precios, como pasó en 2012, 2018 y 2024 [B1, B2]. El valor terminal pesa el 57 %.',
  },
  puente_comentarios: {
    '2026e': 'Base de dominios +5,2-6,0 % según la guía y dos meses de la subida de .com del 1-nov [D7, A4].',
    '2027e': 'Base +3-4 % (altas récord, riesgo de bajas tras la subida) y el efecto de la subida de .com (+6,9 %) que se reconoce durante el año, más .net (+10 % en marzo) [A4, B5].',
    '2028e': 'Base +3 % y subida de .com de noviembre de 2027 (hasta el 7 %) más el resto de la de 2026 [P1].',
    '2029e': 'Base +2,5 %; subida de noviembre de 2028 [P1].',
    '2030e': 'Base +2 %; última subida del periodo (noviembre de 2029) [P1].',
  },
  veredicto: 'Sí',
  sostenibilidad_justificacion: 'Sí. El crecimiento medio proyectado (6,1 %) está algo por encima del histórico (4,5 % en 2018-2025, con dos años de base de dominios a la baja) y no necesita capital: la reinversión neta es negativa (los cobros anticipados financian el crecimiento). La prueba es el poder de precios y la cuota: el precio sube por contrato (tope del 7 % en cuatro de cada seis años, usado al máximo en 2021-2024 y otra vez en 2026 [A1, A4]) y la cuota de .com y .net (44,6 % de todos los dominios) se mantiene con la base creciendo al 5,1 % [B3, A3]. El riesgo no es de calidad sino de contrato (renovación de 2030) y de uso (IA): lo recoge el bajista.',
  dcf_lectura: 'El DCF da 219,10 USD por acción, un 28,5 % por debajo del precio (306,48), con un WACC del 9,21 % y un valor terminal que pesa el 57 %. El DCF inverso dice que el precio descuenta un crecimiento anual del 10,0 % en 2027e-2035e con nuestro margen, frente al 6,1 % de nuestro caso base, y una rentabilidad implícita del 7,4 % anual, por debajo del WACC (9,2 %) y de lo que hoy pide el mercado (8,2 %). Es exigente: supone subidas de precio del 7 % casi todos los años y una base que crece al 3 % durante una década, o un régimen de precios sin tope tras 2030. Con la prima de riesgo del mercado (4,2 %) el DCF vale 259,02 USD (−15 %): ni con la tasa del mercado se llega al precio. La sensibilidad (WACC 8,2 % y crecimiento terminal del 3,5 %) llega a 297,95: hace falta el supuesto más generoso de las dos tablas para justificar la cotización.',
  narrativas: {
    Bajista: 'Comercio o ICANN frenan las subidas de .com (como la NTIA intentó en 2024) y la IA reduce las altas y la renovación: crecimiento 3 puntos menor cada año, margen 1,5 puntos menor y WACC +0,5. Ya pasó en 2012-2018 (precio congelado) y en 2023-2024 (base −2 %).',
    Base: 'Subidas de .com cercanas al 7 % en noviembre de 2026-2029, base de dominios +2-3,5 % al año, margen EBITDA hasta el 74,8 % y renovación de los contratos en 2030 con el mismo régimen.',
    Alcista: 'La IA multiplica la creación de webs y agentes con dominio propio: la base crece al 4-5 % y las subidas se mantienen al máximo; crecimiento 1,5 puntos mayor y margen 0,7 puntos mayor.',
  },
  escenarios_comentario: 'La asimetría es desfavorable al precio de hoy: el alcista vale 251,80 USD (−17,8 %) y el bajista 141,42 (−53,9 %); incluso el mejor caso del DCF queda por debajo de la cotización. El valor ponderado de los escenarios es de 207,86 USD. El bajista es verosímil: el precio de .com estuvo congelado de 2012 a 2018 y la base de dominios cayó un 2 % en 2024 [A1].',
  casos_12m: {
    Bajista: 'BPA 2028e de 11,53 USD: crecimiento 3 puntos menor (subidas recortadas, base estancada) y margen 1,5 puntos menor; el PER baja a 21,6 veces (base × 0,8), cerca del de 2024 (23,5).',
    Base: 'BPA 2028e de 12,50 USD (+12,4 % anual desde 8,81): ingresos +9 % en 2027e y 2028e, margen del 72,6 % y 86,5 M de acciones tras el programa de recompras de 1.500 M; PER de 27,0 veces.',
    Alcista: 'BPA 2028e de 13,00 USD: base de dominios al 4-5 % por la IA y subidas al máximo; PER de 27,7 veces (media larga).',
  },
  diferencia_consenso: 'Nuestro BPA de 2026e (9,63 USD) coincide con el consenso (9,58) y el de 2027e (11,09) queda un 1,9 % por encima (10,88): contamos las recompras ya autorizadas (1.500 M USD) y un margen algo mayor por la subida de .com [D2]. Nuestro precio base a 12 meses (337,50 USD) queda un 3,4 % por encima del objetivo medio de los analistas (326,40; 285-355): coincidimos en beneficios y en múltiplo. La diferencia grande no es con el consenso sino con nuestro propio DCF.',
  objetivo_comentario: 'El objetivo a 12 meses (321,04 USD ponderado; base 337,50) da una rentabilidad del 5,8 % con dividendo (11,2 % el base): Mantener. El valor intrínseco (218,86 USD) queda un 28,6 % bajo el precio y el objetivo un 4,7 % encima: la distancia entre los dos es del 47 %, porque el mercado paga ≈ 27-28 veces beneficios por un crecimiento del BPA del 12 % que nuestro DCF, con una tasa libre del 5,15 %, no valora tanto. La tesis no es a 12 meses ni a largo plazo: a este precio, el múltiplo ya recoge las subidas de precio de 2026-2029. Para comprar con la regla haría falta un precio de 218,86 USD (−29 %), donde también se cumple el valor real.',
  valoracion_comentario: 'Pesos: DCF 50 %, escenarios 30 % y comparables 20 %. El DCF es el método más fiable para un negocio con ingresos contractuales, sin capital y con precios fijados por contrato; su punto débil es la tasa (con la prima del mercado vale 259,02). Los escenarios recogen el riesgo de contrato y de IA. Los comparables pesan poco porque no hay otro registro cotizado: la mediana de los negocios de peaje (22,1 veces el beneficio) da 234,78 USD. Las transacciones no pesan (sin múltiplos publicados). El valor objetivo de la síntesis es de 218,86 USD (−28,6 %); todos los métodos quedan por debajo del precio y solo el rango de los analistas (285-355) lo contiene.',
  catalizadores: {
    items: [
      { fecha: '22-oct-2026', evento: 'Resultados del 3T26', efecto: 'Base de dominios, altas y renovación antes de la subida de .com; posible adelanto de renovaciones', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '1-nov-2026', evento: 'Subida de .com de 10,26 a 10,97 USD', efecto: '+≈ 5 puntos de crecimiento de ingresos en 2027 si no frena las altas', probabilidad: 'Alta', sentido: '+' },
      { fecha: 'nov-2026 a feb-2027', evento: 'Lanzamiento de .web por los registradores', efecto: 'Ingresos sin tope de precio; pequeño en 2027', probabilidad: 'Media', sentido: '+' },
      { fecha: 'feb-2027', evento: 'Resultados de 2026 y guía de 2027 (base de dominios tras la subida)', efecto: 'Una guía de base negativa confirmaría el bajista', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '1-mar-2027', evento: 'Subida de .net a 12,00 USD (+10 %)', efecto: '≈ +0,6 puntos de ingresos', probabilidad: 'Alta', sentido: '+' },
      { fecha: 'desde jul-2026', evento: 'Posible nueva venta de Berkshire (9,9 %, bloqueo vencido)', efecto: 'Colocación con descuento de ≈ 5-7 % como en julio de 2025', probabilidad: 'Baja', sentido: '−' },
      { fecha: '2026-2027', evento: 'Anuncio de la subida de .com de noviembre de 2027 (aviso de seis meses)', efecto: 'Confirma el supuesto de precio del caso base', probabilidad: 'Media', sentido: '+' },
    ],
    confianza: 'Media',
  },
  riesgos: {
    items: [
      { riesgo: 'Cambio del régimen de precios de .com (Comercio, ICANN o un tribunal limitan las subidas, sobre todo en la renovación de 2030)', tipo: 'Regulatorio', probabilidad: 'Baja', impacto: 'Alto', efecto_valor: '−35 % (bajista: 141,42 USD)', mitigante: 'Renovación presuntiva; cambiar el precio exige el acuerdo de VeriSign y de Comercio [A1]', senal: 'Declaraciones de la NTIA o de ICANN; no anunciar la subida de noviembre de 2027' },
      { riesgo: 'La IA resta valor a tener un dominio: los usuarios llegan a los negocios por asistentes y agentes, no tecleando la dirección', tipo: 'Tecnológico', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−15 % a 3-5 años', mitigante: 'Los agentes siguen usando el DNS; hoy la IA aumenta las altas [B6]', senal: 'Renovación por debajo del 73 % o base de dominios a la baja dos trimestres' },
      { riesgo: 'La subida de .com frena las altas y adelanta bajas (dominios especulativos y aparcados)', tipo: 'Negocio', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−10 %', mitigante: 'El precio es ≈ 1 USD al mes; 2021-2024 subió con la base estable [A1]', senal: 'Altas del 4T26 y 1T27 por debajo de 10 M' },
      { riesgo: 'Valoración: el precio descuenta un 10 % anual de crecimiento', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−29 % hasta el valor intrínseco', mitigante: 'Recompras del 4-5 % del capital al año', senal: 'PER adelantado por encima de 30 veces' },
      { riesgo: 'Colocación del resto de Berkshire Hathaway (9,9 %)', tipo: 'Accionarial', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−5-7 % temporal', mitigante: 'Recompras de 1.500 M absorben el 60 % de esa participación', senal: 'Nuevo S-3 o 8-K de colocación' },
      { riesgo: 'Sucesión del fundador (Bidzos, 71 años, tres cargos)', tipo: 'Gobierno', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 %', mitigante: 'Equipo con más de diez años en la empresa [C12]', senal: 'Salida o problemas de salud sin sucesor' },
      { riesgo: 'China y regulación local de registros', tipo: 'Regulatorio', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−2 %', mitigante: 'APAC es el 11 % de los ingresos [A1]', senal: 'Caída de la base de APAC' },
      { riesgo: 'Ciberataque o fallo de la resolución de .com', tipo: 'Operativo', probabilidad: 'Baja', impacto: 'Alto', efecto_valor: '−20 %', mitigante: '29 años con el 100 % de disponibilidad [A3]', senal: 'Incidente de seguridad declarado' },
    ],
    premortem: 'Octubre de 2029: la acción ha perdido un 40 % y cotiza a ≈ 185 USD. La historia más probable empieza con la subida de .com de noviembre de 2026: las altas, que eran récord por la moda de crear webs con IA, se normalizan en 2027 y las renovaciones de los registros especulativos de 2025-2026 fallan; la base de dominios baja un 1 % en 2027. A la vez, los buscadores y asistentes de IA responden sin enviar tráfico y las pequeñas empresas dejan de renovar dominios secundarios: la renovación cae del 75 % al 71 %. Con la base a la baja, la NTIA y varios congresistas cuestionan las subidas de 2027 y 2028 y VeriSign decide no aplicar la de 2028 para no poner en riesgo la renovación de 2030. El crecimiento del BPA baja del 12 % al 5 %, que solo dan las recompras, y el mercado deja de pagar 28 veces: el PER vuelve a 20, como una empresa madura. Berkshire aprovecha para vender el resto. Las señales que lo habrían anticipado: altas trimestrales por debajo de 10 M, renovación por debajo del 73 % y la ausencia de anuncio de la subida de 2027 en la primavera.',
    ia: { exposicion: 'Media', sentido: 'Mixto', efecto_valor: '−10 % a 3-5 años (entre el bajista y el base)', comentario: 'La IA toca el 100 % de los ingresos, que dependen de que la gente y las empresas quieran un dominio propio. Hoy empuja: la empresa atribuye parte de las altas récord (12,7 M en el 2T26, +22 %) a herramientas de IA que crean webs y contenido, y el uso de su resolución DNS sube [B6, A3]. A medio plazo puede restar: si los asistentes y agentes de IA se convierten en la puerta de entrada a internet, un dominio memorable vale menos y los dominios secundarios o especulativos no se renuevan; en los foros ya se cita el uso de .ai en vez de .com [B9, E1]. Los agentes siguen necesitando el DNS para llegar a los servicios, así que el riesgo es de volumen y de precio, no de sustitución del registro. Señal: renovación por debajo del 73 % o caída de la base dos trimestres seguidos. Veredicto: presiona a largo plazo, impulsa hoy.' },
    confianza: 'Media',
  },
  preguntas: {
    items: [
      { tema: 'Precio', pregunta: '¿Aplicarán la subida de .com de hasta el 7 % en noviembre de 2027, 2028 y 2029, o hay un acuerdo implícito con Comercio para moderarlas antes de la renovación de 2030?', por_que: 'El caso base supone ≈ 6 puntos de precio al año; sin ellos el valor cae ≈ 35 %.' },
      { tema: 'Base de dominios', pregunta: '¿Qué parte de las altas récord de 2026 viene de herramientas de IA y de registros especulativos, y cuál es su tasa de renovación al primer año?', por_que: 'Las altas de 2026 se renuevan en 2027, ya con el precio nuevo.' },
      { tema: 'IA', pregunta: '¿Qué datos tienen de consultas DNS de agentes de IA y de dominios creados por agentes?', por_que: 'Distingue si la IA es un motor estructural o una moda.' },
      { tema: 'Renovación 2030', pregunta: '¿Qué condiciones esperan en la renovación del Cooperative Agreement y del .com Registry Agreement en 2030?', por_que: 'El valor terminal (57 %) supone el mismo régimen.' },
      { tema: 'Capital', pregunta: '¿Por qué recomprar a 28 veces beneficios en vez de subir más el dividendo?', por_que: 'Las recompras a precios altos destruyen valor si el múltiplo vuelve a 20-25.' },
      { tema: '.web', pregunta: '¿Qué precio y qué volumen esperan para .web, que no tiene tope de precio?', por_que: 'Es la única extensión nueva con poder de precio libre.' },
      { tema: 'Sucesión', pregunta: '¿Hay plan de sucesión para el consejero delegado y presidente?', por_que: 'Bidzos tiene 71 años y concentra los tres cargos.' },
    ],
    confianza: 'Media',
  },
  resumen: {
    recomendacion: 'Mantener', conviccion: 'Media', justificacion_recomendacion: null, horizonte: '12 meses',
    sintesis: `**La recomendación y por qué.** Mantener con convicción media. El objetivo a 12 meses es de 321,04 USD (ponderado) y 337,50 en el caso base, una rentabilidad con dividendo del 5,8 % y del 11,2 %, por debajo del 15 % y del 12 % que pide la compra; con la regla v2 de control, 13,7 %. El valor intrínseco (218,86 USD) queda un 28,6 % bajo el precio (306,48), y el objetivo medio de los analistas (326,40) dentro de nuestro rango. La razón principal: VeriSign es uno de los mejores negocios cotizados, pero a ≈ 28 veces beneficios el precio ya recoge las subidas de .com de 2026-2029. La convicción es media porque las dos reglas coinciden y la ponderada está lejos de los umbrales; subiría si la acción bajara hacia 219 USD o si la empresa confirmara en febrero una base de dominios al alza tras la subida de precio.

**El negocio.** Opera en monopolio los dominios .com y .net (179,1 M, el 44,6 % de todos los dominios del mundo) con un margen operativo del 67,7 % y una inversión del 1,4 % de las ventas [B3, A1]. Los registradores pagan por adelantado: el capital invertido es negativo y el ROIC sobre el capital operativo pasa del 200 %, frente a un WACC del 9,21 %. La calidad sostiene el crecimiento que proyectamos (veredicto «Sí»): un 6,1 % anual que sale del precio contractual (hasta +7 % en cuatro de cada seis años) y de una base de dominios que crece al 5,1 % [A1, A3].

**Sector y regulación.** El precio lo fija el contrato con ICANN y el Departamento de Comercio, renovado hasta 2030 [B1, B2]. La subida a 10,97 USD entra el 1-nov-2026 y la de .net a 12,00 en marzo de 2027 [A4, B5]. La IA hoy empuja las altas (12,7 M en el 2T26, +22 %), pero a largo plazo puede restar valor a tener un dominio si los asistentes se convierten en la puerta de entrada a internet: el informe lo valora en −10 % a 3-5 años [A3, B9].

**Finanzas.** Ingresos de 1.707,9 M en los últimos 12 meses, beneficio de 850 M y flujo libre de 1.066 M, todo devuelto con recompras y dividendo (1.097 M en 2025) [A1, A3]. Deuda neta de ≈ 1.300 M (1,1 veces el EBITDA) y patrimonio negativo por recompras.

**Equipo y gobierno.** El fundador, Bidzos, acumula presidencia y dirección a los 71 años, sin sucesor anunciado; vende acciones con un plan programado (32,1 M USD en 12 meses) [C1, C11]. Berkshire conserva el 9,9 % y su bloqueo venció en julio [D12].

**Valoración.** El DCF da 219,10 USD (−28,5 %) y descuenta en el precio un crecimiento del 10,0 % anual frente al 6,1 % de nuestro caso base; con la prima del mercado, 259,02 (−15 %). La mediana de PER de los comparables de peaje (22,1 veces) da 234,78. Coincidimos con el consenso en el beneficio (2027e: 11,09 frente a 10,88 USD) y en el múltiplo a 12 meses; discrepamos en el largo plazo: el precio exige un régimen de precios sin freno después de 2030.

**Riesgos y catalizadores.** Un cambio del régimen de precios de .com (bajista 141,42 USD, −53,9 %) y la IA restando renovaciones son los dos riesgos de mayor impacto. Catalizadores: resultados del 22-oct, subida del 1-nov, guía de 2027 en febrero y lanzamiento de .web. Los foros están divididos entre «peaje de internet» y «demasiado cara».

**Qué cambiaría la decisión.** Compraríamos por debajo de 218,86 USD (ponderada ≥ 15 %, base ≥ 12 % y valor real cubierto) y venderíamos por encima de 360,22. Una base de dominios a la baja en dos trimestres, una renovación por debajo del 73 % o la ausencia de la subida de .com de 2027 bajarían el objetivo.`,
    tesis: 'VeriSign cobra un peaje por cada dominio .com y .net del mundo: 179,1 M de registros, el 44,6 % del total, con un precio que el contrato le deja subir un 7 % en cuatro de cada seis años, un margen operativo del 67,7 % y casi sin inversión [B3, A1]. Toda la caja vuelve al accionista: 6.978 M de recompras en 2018-2025 [A1].\n\nEl precio (306,48 USD, ≈ 28 veces el beneficio de los próximos 12 meses) descuenta un crecimiento anual del 10,0 % durante una década, frente al 6,1 % de nuestro caso base, y una rentabilidad implícita del 7,4 %, por debajo del WACC (9,2 %) y de lo que pide el mercado (8,2 %). Los comparables de peaje cotizan a 22,1 veces [D2].\n\nEl mercado acierta en la calidad y en el beneficio a dos años (coincidimos con el consenso), pero paga por adelantado todas las subidas posibles hasta 2030 y supone que el régimen de precios seguirá después, sin descontar el riesgo de que la IA reste valor a los dominios. Para invertir hay que creer que la base de dominios crecerá al 3 % y el precio al 6-7 % durante diez años.',
    vision_diferencial: {
      mercado_descuenta: 'Un peaje perpetuo: subidas de .com al máximo hasta 2030 y después, una base de dominios que crece con la IA y recompras del 4-5 % anual; ≈ 28 veces beneficios y un crecimiento implícito del 10 % anual.',
      nuestra_vision: 'Mismo beneficio a dos años que el consenso, pero un crecimiento medio del 6,1 % en diez años: las subidas tienen tope y pausas (2031-2032), la base crece al 2-3,5 % y la IA es un riesgo de renovación a largo plazo. Con una tasa libre del 5,15 %, eso vale 219 USD.',
      por_que: 'Porque el precio de .com depende de un contrato que la administración ya quiso bajar en 2024 y porque las altas récord de 2026 aún no han pasado por su primera renovación con el precio nuevo. Si las dos cosas salen bien, el consenso tiene razón a 12 meses (nuestro base también da +11 %), pero sin margen de seguridad.',
    },
    a_favor: [
      '**Monopolio contractual**: 179,1 M de dominios .com y .net, el 44,6 % del total [B3].',
      '**Poder de precio**: .com +6,9 % el 1-nov-2026 y .net +10 % en marzo de 2027 [A4, B5].',
      '**Margen y caja**: margen operativo del 67,7 % y flujo libre de 1.066 M en 12 meses [A1, A3].',
      '**La base vuelve a crecer**: +5,1 % interanual y guía del 5,2-6,0 % para 2026 [A3].',
      '**Recompras constantes**: acciones −3,8 % al año en 2018-2025; 1.500 M autorizados [A10].',
    ],
    en_contra: [
      '**Precio exigente**: el DCF vale 219,10 USD (−28,5 %) y el precio descuenta un 10 % de crecimiento anual.',
      '**Riesgo de contrato**: un cambio del régimen de precios dejaría el valor en 141,42 USD (−53,9 %).',
      '**IA**: puede restar renovaciones si los asistentes sustituyen la navegación por dominios [B9].',
      '**Altas récord sin probar**: 12,7 M en el 2T26 que se renuevan en 2027 al precio nuevo [A3].',
      '**Fundador sin sucesor**: Bidzos, 71 años, tres cargos y ventas programadas de 32,1 M USD [C1, C11].',
    ],
    que_vigilar: 'La tesis depende de que la base de dominios siga creciendo tras la subida de .com de noviembre de 2026 y de que la empresa siga subiendo el precio en 2027-2029. La señal de que no se cumple sería una base a la baja en el 1T27 o el 2T27, una renovación por debajo del 73 % o que no anuncie en primavera de 2027 la subida de noviembre de 2027.',
    cambiaria_recomendacion: [
      'Si el precio baja de 218,86 USD con la tesis intacta, pasaríamos a Comprar (ponderada ≥ 15 %, base ≥ 12 % y valor real cubierto).',
      'Si el precio supera 360,22 USD, pasaríamos a Vender (ponderada ≤ −10 %).',
      'Si la base de dominios cae dos trimestres seguidos o la renovación baja del 73 %, rebajaríamos el BPA de 2028e ≈ 8 %.',
      'Si Comercio o ICANN anuncian límites a las subidas de .com, pasaríamos al bajista (141,42 USD).',
    ],
    kpis_seguimiento: [
      { kpi: 'Base de dominios .com y .net', nivel_actual: '179,1 M (+5,1 %)', umbral_alerta: 'Dos trimestres de caída', por_que: 'Volumen del caso base.' },
      { kpi: 'Tasa de renovación', nivel_actual: '76,3 % (1T26)', umbral_alerta: '< 73 %', por_que: 'Primer síntoma de la IA o de la subida.' },
      { kpi: 'Altas trimestrales', nivel_actual: '12,7 M (2T26)', umbral_alerta: '< 10 M', por_que: 'Efecto de la subida de precio.' },
      { kpi: 'Subidas de .com anunciadas', nivel_actual: '10,97 USD desde nov-2026', umbral_alerta: 'Sin anuncio en primavera de 2027', por_que: 'Precio del caso base.' },
      { kpi: 'PER de los próximos 12 meses', nivel_actual: '28,4x', umbral_alerta: '> 31x', por_que: 'Zona de venta.' },
    ],
    confianza: 'Media',
  },
};
