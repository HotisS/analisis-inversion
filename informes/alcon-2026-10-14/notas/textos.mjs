// Textos del analista (Alcon, corte 2026-10-14). Citas con la letra de la nota.
export default {
  limitaciones: 'Análisis hecho desde la nube con la red limitada a la búsqueda web: sec.gov, la web de la empresa, SIX y los proveedores de datos no se pudieron abrir, y las herramientas descargar.mjs y bolsa.mjs no funcionan aquí. Las cifras salen de los extractos de búsqueda de los comunicados 6-K, del 20-F y de agregadores (Stock Analysis, MarketScreener, Macrotrends), con la URL como fuente; lo que no cuadró está en null y en los huecos. La confianza de los datos de núcleo es baja. Cuentas en USD con NIIF; ejercicio natural. La acción cotiza en CHF en SIX (línea principal) y en USD en NYSE: el precio del informe es el último cierre fechado encontrado en NYSE (64,75 USD el 30-sep-2026) [D1], convertido a CHF con 1,237 USD por franco (OFX, 4-sep-2026) [D2]; la capitalización de Stock Analysis del 8-oct (30.517 M USD) implica unos 62 USD [D3]. Las acciones (491 M) son estimación propia: 495 M diluidas de 2025 menos las recompras del primer semestre de 2026. El EBITDA histórico es el de MarketScreener (resultado operativo publicado más amortizaciones), que cuadra con las cuentas en 2021 (EBIT 580 M + amortizaciones 1.219 M) [A7, A12]. El BPA del objetivo a 12 meses, el PER histórico y los comparables están en base core (sin amortización de intangibles de compras, deterioros ni integración). Los arrendamientos NIIF 16 no se han podido separar de la deuda financiera publicada.',

  controles_explicados: [
    { control: 'Tipo impositivo efectivo razonable (2023)', explicacion: 'Beneficio fiscal de 2023 (impuestos de −142 M) por la reorganización fiscal suiza; no se proyecta: el DCF usa el 19 %, el tipo core implícito de 2025 [A11].' },
    { control: 'Circulante del primer año', explicacion: 'El 41,7 % real de 2025 no resta proveedores (no encontrados para 2025); con los de 2024 (773 M) el circulante es de unos 34 %, cerca del 33 % del supuesto.' },
    { control: 'Precio del cierre de la fecha de corte', explicacion: 'Sin acceso a cotizaciones: el último cierre fechado es el del 30-sep-2026 (64,75 USD) [D1]. La capitalización del 8-oct implica unos 62 USD [D3]: a ese precio la rentabilidad a 12 meses sería unos 4 puntos mayor. Por eso, y por la confianza baja, la recomendación queda en Mantener hasta confirmar el cierre.' },
    { control: 'Comprar pendiente de confirmar', explicacion: 'Decisión del usuario: con confianza baja no se compra. Hay que confirmar con fuente primaria el cierre de octubre, las acciones en circulación y la deuda a 30-sep-2026 (20-F e informe del 3T26); la síntesis lo dice.' },
    { control: 'Capitalización calculada', explicacion: 'La publicada (30.517 M, 8-oct) es posterior al precio usado (30-sep) y la acción siguió cayendo; las acciones (491 M) son estimación propia.' },
  ],

  huecos_resueltos: [],


  parches: [],

  financieros: {
    comentario: 'Los ingresos crecieron de 8.291 M USD en 2021 a 10.401 M en 2025, todo orgánico salvo compras pequeñas (Ivantis, Aerie) [A2, A11]. El EBITDA pasó de 1.799 a 2.677 M y el margen del 21,7 % al 25,7 %, por mezcla (lentes intraoculares avanzadas, lentes de contacto prémium), subidas de precio y apalancamiento operativo [A12]. 2025 fue un año de pausa: ventas +5 %, BPA core plano (3,07 USD) y margen operativo core del 19,8 % (−90 pb) por aranceles, costes de lanzamiento y un mercado de cataratas flojo [A2, A14]. En el primer semestre de 2026 el BPA core subió un 13 % (1,69 USD) y la guía del año se elevó dos veces [A1].',
    ajustes: 'Alcon gestiona con cifras core, que excluyen la amortización de intangibles de compras (696 M en 2025, 667 M en 2024), deterioros, costes de adquisición e integración y otras partidas; en 2025 el resultado operativo core fue de 2.039 M frente a 1.360 M publicado, y el BPA core de 3,07 USD frente a 1,98 [A2]. Las partidas de integración y reestructuración se repiten casi cada año (58 M en 2025; programa de eficiencia de 150 M de coste en 2026), así que tratamos parte de ellas como recurrentes en el DCF, que parte del EBITDA publicado [A14]. El cargo de PowerVision (≈287 M después de impuestos en el 2T26) es no recurrente y no está en el EBITDA de 2025 [A1].',
  },

  rentabilidad_comentario: 'Con el balance publicado, Alcon no crea valor: el ROIC es del 4,6 % en 2025 frente a un WACC del 9,08 %, porque el capital invertido (≈24.900 M) lleva unos 17.500 M de fondo de comercio e intangibles revalorizados en la escisión de Novartis y en compras [A10]. Con el beneficio core (EBIT core de 2.039 M y un 19 % de impuestos, ≈1.650 M de NOPAT) el ROIC sube a ≈6,6 %, todavía por debajo del WACC (estimación propia). Lo que mueve el ROIC es la rotación (0,34 veces), no el margen. El ROIC incremental histórico es alto (22,1 %), porque el crecimiento reciente apenas ha necesitado capital: es la medida más fiel de la economía del negocio, pero el accionista paga por el capital ya invertido. Frente a los comparables, el ROIC de Alcon está a la par de EssilorLuxottica (5,4 %) y Cooper (4,6 %), que tienen el mismo problema de fondo de comercio [D14].',

  capital: {
    comentario: 'La dirección ha sido buena gestora del capital de explotación (el capex bajó del 8 % al 5 % de las ventas y el flujo libre se triplicó entre 2022 y 2025) y mala en las compras grandes: PowerVision (2019) acabó en un deterioro de unos 402 M antes de impuestos en 2026, la compra de STAAR se abandonó tras la oposición de su primer accionista y la de LENSAR la frustró la FTC [A1, A17, B4, B5]. La recompra de 1.500 M en tres años (≈5 % del capital al precio actual) es la mejor señal: devuelve el flujo libre en vez de pagar primas por compras [A17].',
  },

  multiplos_comentario: 'Con nuestro BPA core, Alcon cotiza a 16,7 veces el beneficio de 2027e, frente a una mediana de 25,6 veces en los cierres de 2020-2025 medidos igual (precio ÷ BPA core del año siguiente, sin 2019 ni 2021). Es el múltiplo más bajo desde la escisión. Ha cambiado el tipo de interés (el bono de EE. UU. al 5,2 %) y la percepción de crecimiento: los implantables se estancaron en 2025, PowerVision fracasó y la empresa no ha logrado comprar crecimiento en refractiva. El crecimiento del BPA (+12-15 % en 2026) no se ha frenado, así que la caída es de múltiplo, no de beneficio [A1, D9, D10].',

  comparables_comentario: 'Alcon cotiza a 17,1 veces el beneficio de los próximos 12 meses y 13,1 veces el EBITDA de los últimos 12, frente a una mediana de 21,3 y unas 12,3 veces en los comparables [D3, D14, D15]. El PER está por debajo de EssilorLuxottica (23,5x), Sonova (22,8x) y Demant (21,3x), con un crecimiento parecido (6-7 %) y un margen EBITDA similar (25,7 %), y al nivel de Cooper, Smith & Nephew y Align (15-15,3x), que crecen menos. El descuento se explica en parte por el ROIC contable bajo y por las dudas en lentes intraoculares, pero no por el crecimiento. Con el PER de los comparables el valor sale entre 57,94 y 88,99 USD (mediana 80,66); con el EV/EBITDA, entre 50,90 y 81,98 (mediana 60,17), porque Alcon tiene más amortización que la media. Usamos el PER como múltiplo de referencia.',

  balance: {
    otros_pasivos: 'No hemos podido leer las notas de provisiones, litigios y pensiones del 20-F 2025. Alcon tiene planes de pensiones de prestación definida en Suiza y EE. UU. (no cuantificados aquí) y litigios de producto habituales en el sector. Los arrendamientos NIIF 16 están, hasta donde sabemos, dentro de la deuda financiera publicada (4.737 M a cierre de 2025) [A3].',
    comentario: 'La deuda financiera bruta se mantiene estable en unos 4.600-4.700 M desde 2022 y la caja oscila entre 1.000 y 1.700 M; la deuda neta (3.382 M a junio de 2026 con la deuda de cierre de 2025) es de 1,3 veces el EBITDA [A3, A9]. El circulante pesa: existencias de 2.391 M y clientes de 1.942 M en 2025, unos 42 % de las ventas antes de proveedores, por los equipos y los consumibles en consigna. La holgura permite la recompra de 1.500 M sin subir el apalancamiento.',
  },

  dcf_justificacion: {
    crecimiento: 'Ventas +7 % en 2026e (guía de +5 % a +7 % a tipo constante más un punto de divisa) y +6 % en 2027-28, en línea con el mercado oftalmológico que Alcon estima en un dígito medio y con el crecimiento de 2021-2025 (5,8 % anual), para bajar al 3 % en 2034-35 [A1, B1]. El BPA del consenso de 2027 (3,87 USD) es el mismo que el nuestro [D4].',
    margenes: 'Margen EBITDA del 26,7 % en 2026e (25,7 % en 2025), con la guía de +90 a +190 pb en el margen operativo core, y hasta el 28,5 % en 2030e (margen operativo core del 22,4 %), por mezcla, el programa de eficiencia de 100 M y el apalancamiento operativo [A1, A14]. Es más alto que el máximo histórico (25,7 %), pero menos que Sonova (26 %) o Cooper (29 %) [D14].',
    inversion: 'Capex del 5,5 % de las ventas (5,2 % en 2025, 7-8 % en 2021-2023) y amortización del 6,5 % al 5,6 %, que incluye la de intangibles de compras (696 M en 2025) que se va agotando [A2, A12]. Circulante del 33 % de las ventas.',
    wacc: 'Flujos en USD: tasa libre del bono de EE. UU. a 10 años (5,22 %) [D12]. Beta de 0,85, estimación propia (no hemos podido calcularla; la de Cooper es de 0,89), prima de mercado del 5,5 %: coste de los recursos propios del 9,9 %. Deuda al 4,5 % antes de impuestos (coste medio ≈4,1 %) con un peso del 13 %. WACC del 9,08 %.',
    terminal: 'Gordon al 2,5 % (inflación de EE. UU. más un crecimiento real bajo), por debajo de la tasa libre menos medio punto. El valor terminal es el 57 % del valor, poco para una empresa de este perfil por el WACC alto.',
  },

  puente_comentarios: {
    '2026e': 'Volumen por Unity VCS, Tryptyr y lentes de contacto; precio por las subidas anuales en lentes; un punto de divisa (dólar débil frente al primer semestre de 2025) [A1, A2].',
    '2027e': 'Mercado de un dígito medio, más la base instalada de Unity que arrastra consumibles [B1, A15].',
    '2028e': 'Igual que 2027e; supone cuota estable en lentes intraoculares.',
    '2029e': 'Crecimiento convergente al del mercado.',
    '2030e': 'Crecimiento convergente al del mercado.',
  },

  veredicto: 'En parte',
  sostenibilidad_justificacion: 'Las pruebas cuantitativas pasan: el crecimiento apenas necesita inversión neta (reinversión del 1 % del NOPAT), la cuota implícita en 2035e (27,4 %) es la de hoy (28,0 %) y el ROIC incremental histórico (22,1 %) muestra que crecer cuesta poco capital. La prueba que queda es el poder de precios y la cuota, y ahí el veredicto es «En parte»: lentes de contacto y consumibles lo demuestran (+6 % en 2025), pero los implantables se estancaron (+0,4 %) por la competencia y Alcon ha perdido varias palancas de crecimiento en refractiva (PowerVision, STAAR, LENSAR) [A2, A1, B4, B5]. No hay prueba fallida, así que el caso base no se rebaja.',

  dcf_lectura: 'El DCF da 65,37 USD por acción, un 1 % por encima del precio, con un WACC del 9,08 % y el valor terminal en el 57 % del total. El DCF inverso dice que el precio descuenta un crecimiento del 4,3 % en los años no fijos, frente al 4,5 % de nuestro caso base, con nuestros márgenes: el mercado pide algo menos de lo que esperamos, y la rentabilidad implícita es del 9,1 %, igual que nuestro WACC. No es exigente: es lo que Alcon ha hecho en 2021-2025 sin las compras. La lectura cambia con la tasa de descuento: con la prima implícita del mercado (4,2 %) el valor sube bastante, y con un WACC un punto mayor baja más de un 10 %. El DCF dice que Alcon está bien valorada a largo plazo con una tasa de descuento del 9 %; el atractivo está en el múltiplo, que está en mínimos desde 2019, y por eso el objetivo a 12 meses queda muy por encima del valor intrínseco.',

  narrativas: {
    Bajista: 'El mercado de cataratas sigue flojo y J&J y RxSight ganan cuota en lentes avanzadas: el crecimiento queda 1,5 puntos por debajo del base y el margen un punto por debajo, como en 2025, cuando el BPA core no creció. Ya le ha pasado: implantables +0,4 % en 2025.',
    Base: 'Ventas +6-7 % con la guía y el mercado, margen EBITDA hasta el 28,5 % y recompras de 1.500 M: el BPA core crece un 11-12 % anual hasta 2028.',
    Alcista: 'Unity VCS arrastra consumibles y lentes avanzadas y Tryptyr se convierte en un éxito en ojo seco: un punto más de crecimiento y 0,8 puntos más de margen.',
  },
  escenarios_comentario: 'En el DCF la asimetría es mala (bajista −16 %, alcista +11 %): el valor intrínseco apenas deja margen. A 12 meses es al revés: el bajista (64,85 USD con un PER de 16,5 veces) deja la acción casi donde está y el base (88,18) supone +36,7 %, porque el múltiplo está en mínimos. Compensa a 12 meses si el BPA cumple; a largo plazo, el precio ya paga lo que vale.',

  suma_partes_comentario: 'No aplica: Cirugía y Visión tienen márgenes y crecimientos parecidos y comparten clientes y tecnología; no hay cifras de resultado por segmento en las fuentes consultadas.',

  valoracion_comentario: 'Pesamos el DCF un 40 %, los comparables un 30 % y los escenarios un 30 %; las transacciones, nada, porque Alcon no es objetivo probable. El valor objetivo de la síntesis es de 69,63 USD (+7,5 %). La dispersión es grande: el DCF (65,37) y el EV/EBITDA (60,17 de mediana) quedan cerca del precio, el PER de los comparables (80,66) y las transacciones (87,59) muy por encima. La diferencia sale de la tasa de descuento (9,08 %, alta por el bono de EE. UU. al 5,2 %) frente a los múltiplos de mercado, que implícitamente descuentan menos.',

  diferencia_consenso: 'Nuestro BPA core es el del consenso en 2027e (3,87 USD frente a 3,87) y algo mayor en 2026e (3,49 frente a 3,48) [D4]. Nuestro precio base a 12 meses (88,18 USD) está un 3,4 % por encima del objetivo medio de los analistas (85,24, 26 analistas; rango 62-107,4) [D5, D6]: la diferencia es pequeña y sale del múltiplo (20,7 veces el BPA de 2028e) y de que miramos un año más adelante.',
  objetivo12m_comentario: 'El objetivo a 12 meses (89,84 USD ponderado) queda un 29 % por encima del valor intrínseco de la síntesis (69,63). La distancia es la tesis: el precio está en el PER más bajo desde la escisión (16,7 veces el beneficio de 2027e) y la regla supone que recupera la mitad de la distancia hasta su mediana (25,6). Para que ocurra hace falta un catalizador: los resultados del 3T26 (10-nov) con la guía cumplida, la recompra y señales de que los implantables vuelven a crecer. Si el múltiplo no se mueve, la rentabilidad es la del BPA (+11-12 % anual). Como el valor intrínseco apenas supera el precio, la tesis es de múltiplo a 12 meses, no de valor a largo plazo.',

  catalizadores: {
    items: [
      { fecha: '2026-11-10', evento: 'Resultados del 3T26', efecto: 'Confirmar la guía de BPA core (+12-15 %) y el reembolso de aranceles de ≈60 M', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2027-02', evento: 'Resultados de 2026 y guía de 2027', efecto: 'Guía de margen y de ventas; el consenso espera BPA de 3,87 USD', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2026-2029', evento: 'Recompra de hasta 1.500 M USD', efecto: '≈5 % del capital al precio actual', probabilidad: 'Alta', sentido: '+' },
      { fecha: '2027', evento: 'Datos de cuota en lentes intraoculares avanzadas (J&J, RxSight)', efecto: 'Riesgo principal de la tesis', probabilidad: 'Media', sentido: '−' },
      { fecha: '2027', evento: 'Despliegue de Unity VCS y Tryptyr', efecto: 'Consumibles y salud ocular', probabilidad: 'Media', sentido: '+' },
    ],
    confianza: 'Baja',
  },

  riesgos: {
    items: [
      { riesgo: 'Pérdida de cuota en lentes intraoculares avanzadas', tipo: 'Competencia', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−16 % (escenario bajista)', mitigante: 'Unity VCS y base instalada', senal: 'Implantables por debajo del 2 % de crecimiento dos trimestres seguidos' },
      { riesgo: 'Mercado de cataratas de EE. UU. débil', tipo: 'Demanda', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−6 % por punto de crecimiento', mitigante: 'Demografía', senal: 'Volumen de cirugías en las conferencias' },
      { riesgo: 'Aranceles y coste de fabricación', tipo: 'Márgenes', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 % por punto de margen', mitigante: 'Reembolsos y programa de eficiencia', senal: 'Margen bruto core' },
      { riesgo: 'Compras caras o deterioros (PowerVision)', tipo: 'Asignación de capital', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'n. c.', mitigante: 'Recompra como prioridad', senal: 'Anuncio de una compra grande' },
      { riesgo: 'Tipos de interés altos', tipo: 'Valoración', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '>−10 % con un punto más de WACC', mitigante: 'Flujo estable', senal: 'Bono de EE. UU. por encima del 5,5 %' },
      { riesgo: 'Datos del informe con confianza baja', tipo: 'Análisis', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'n. c.', mitigante: 'Cruce con el consenso', senal: 'Diferencias al leer el 20-F completo' },
    ],
    premortem: 'Octubre de 2029: la acción ha perdido un 40 %. Lo más probable es que la pérdida de cuota en lentes intraoculares avanzadas, visible ya en 2025 con los implantables planos, se aceleró cuando la lente ajustable de RxSight y la gama de J&J ganaron a los cirujanos de EE. UU.; Alcon, sin PowerVision y sin STAAR, no tuvo producto para responder. El margen operativo core no pasó del 20 %, el BPA creció un 4-5 % y el mercado, que ya pagaba solo 17 veces el beneficio, bajó a 13-14 veces. Para recuperar crecimiento la dirección pagó una compra cara que acabó en otro deterioro. El indicador que lo habría anticipado: los implantables por debajo del 2 % de crecimiento varios trimestres y la cuota de lentes avanzadas que publica la empresa.',
    confianza: 'Baja',
  },

  preguntas: {
    items: [
      { tema: 'Lentes intraoculares', pregunta: '¿Cuál es la cuota en lentes avanzadas en EE. UU. y cuánto se ha perdido frente a RxSight y J&J desde 2024?', por_que: 'Es el riesgo principal y no se publica.' },
      { tema: 'Margen', pregunta: '¿Qué parte de la mejora de margen de 2026 es el reembolso de aranceles y qué parte es estructural?', por_que: 'Mueve el BPA base de 2028e.' },
      { tema: 'Compras', pregunta: 'Tras STAAR y LENSAR, ¿qué tamaño de compra se plantea y a qué múltiplo?', por_que: 'La asignación de capital es el punto débil del equipo.' },
      { tema: 'Unity VCS', pregunta: '¿Cuántos equipos instalados y qué arrastre de consumibles por equipo?', por_que: 'Sostiene el escenario alcista.' },
      { tema: 'Impuestos', pregunta: '¿Qué tipo core se espera con el impuesto mínimo global?', por_que: 'Cada punto mueve el BPA un 1,2 %.' },
      { tema: 'Datos', pregunta: '¿Cuál es el número de acciones y la deuda a 30-sep-2026?', por_que: 'Confirmar los datos de núcleo con fuente primaria para poder pasar a Comprar.' },
    ],
    confianza: 'Baja',
  },

  fuentes: [],
  huecos: [
    { seccion: 'valoracion', campo: 'acciones a la fecha de corte', tipo: 'Núcleo', intentos: '1) informe intermedio del 2T26 por búsqueda: no devolvió el número de acciones; 2) Stock Analysis: solo capitalización; 3) estimación propia: 495 M de 2025 menos las recompras del primer semestre', decision: 'Calculado y marcado como estimación' },
  ],
};
