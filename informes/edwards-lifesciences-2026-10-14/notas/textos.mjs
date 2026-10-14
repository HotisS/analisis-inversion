// Textos del analista principal (Edwards Lifesciences, corte 2026-10-14). Citas con la letra de la nota.
export default {
  limitaciones: 'Análisis hecho desde la nube con la red limitada a la búsqueda web: sec.gov, la web de la empresa y los proveedores de datos no se pudieron abrir, así que las cifras salen de extractos de búsqueda de los 10-K, de los comunicados 8-K y de agregadores (Stock Analysis, EDGAR Tools, Fintel), cruzadas cuando fue posible; la confianza es menor que en un análisis normal y lo que no cuadró está en null y en los huecos. Cuentas en USD con US GAAP; ejercicio natural. La cuenta es de operaciones continuadas (sin Critical Care, vendida en 2024) y solo cubre 2023-2025: los años anteriores mezclan perímetros. Las amortizaciones son estimación propia (≈2,6 % de las ventas). El precio (85,76 USD) es el cierre del 13-oct-2026 citado por la prensa [D2]. Comparables y transacciones reutilizados del informe de Intuitive del repo (6-oct-2026) [D9]. El BPA del objetivo a 12 meses es el nuestro, cercano al ajustado de la empresa (≈3 % por debajo porque contamos parte de los cargos recurrentes); el PER histórico usa el BPA ajustado publicado.',

  controles_explicados: [
    { control: 'Tipo impositivo efectivo razonable (2023)', explicacion: 'Tipo del 11,1 %: créditos fiscales de I+D y beneficios de fabricación en Singapur, Irlanda y Puerto Rico con tipos bajos. No se proyecta: el DCF usa el 17 %, dentro de la guía de 2026 (16-19 %) [A5].' },
    { control: 'Tipo impositivo efectivo razonable (2024)', explicacion: 'Tipo del 9,8 % por regularizaciones fiscales y la mezcla de países; el DCF usa el 17 % [A5].' },
  ],

  parches: [],

  secciones: {
    comparables: {
      comentario: 'Edwards cotiza a 26,0x el BPA de los próximos 12 meses frente a una mediana de 17,5x de los grandes de tecnología médica, con un crecimiento parecido (11,7 % frente a 11,5 % de mediana) y un margen EBITDA similar [D9]. La prima (≈50 %) no la explican el crecimiento ni el margen: es la duración del crecimiento de TAVR y la caja neta. Solo Intuitive (39,2x), IDEXX (31,6x) y Dexcom (27,7x) cotizan más caros. Los comparables (57,56 USD por acción en la mediana del PER) dicen cuánto valdría Edwards como un líder maduro; por eso pesan solo un 10 % en la síntesis. Las cifras son del 6-oct (informe de Intuitive) y no se han actualizado al 13-oct.',
    },
    financieros: {
      comentario: 'Ventas de operaciones continuadas de 5.010 M en 2023, 5.439,5 M en 2024 (+8,6 %) y 6.067,6 M en 2025 (+11,5 %; +10,7 % a divisa constante), todo orgánico [A2, A3, A4, A7]. TAVR crece un 8,6 % a divisa constante en 2025 y TMTT más de un 40 % [A3]. El margen operativo contable cae del 26,1 % en 2023 al 20,8 % en 2025 por cargos que la empresa excluye de su cifra ajustada (litigios, I+D en curso comprada, valor de participaciones, JenaValve) [A1, A17]; en ajustado, el BPA pasa de 2,43 USD a 2,56 (+5,3 %), por debajo de las ventas por más gasto comercial y de I+D [A4, A7]. En el 1S26 las ventas crecen ≈15 % y el BPA ajustado es de 0,78 USD en cada trimestre (frente a 0,64-0,67 en 2025) [A5, A6].',
    },
    multiplos_historicos: {
      comentario: 'El PER adelantado (cierre del año ÷ BPA ajustado del siguiente) pasó de 41x en 2020 y 52x en 2021 a 28,5-29,7x en 2022-2025 [D7, D8, D15]: el mercado dejó de pagar la prima de crecimiento cuando TAVR se frenó en 2023-24 (un dígito medio) y no la ha devuelto con la aceleración de 2025-26. Hoy cotiza a 26,5x nuestro BPA de 2027e, un 9 % por debajo de su mediana de cinco años (29,1x): es la primera vez desde 2019 que está por debajo de su rango reciente. Los PER de los últimos 12 meses que calcula el motor sobre el BPA contable (con cargos) no son comparables y no se usan.',
    },
    sentimiento: {
      lectura: 'El inversor particular ha pasado de negativo (2023-24) a dividido: la aceleración de TAVR y la cobertura de Medicare han mejorado el tono, pero los foros debaten si el catalizador ya está en el precio [E1, E2, E3]. No hay euforia ni capitulación. El sentimiento no contradice a los analistas (mayoría Comprar, objetivo medio de 101,59 USD) ni añade un riesgo que el informe no recoja. El punto de alerta es que algunas narrativas leen la cobertura de los asintomáticos como inmediata, cuando el Colegio Americano de Cardiología dice que hoy no hay estudios aprobados que la activen [B3].',
    },
  },

  dcf_justificacion: {
    crecimiento: '2026e +12,0 % (fijo): 1S26 +15 % y guía de +10-11 % a divisa constante con la divisa a favor [A5, A6]. 2027-28e +9,5 % anual: TAVR +7-8 % (nueva cobertura de Medicare sin requisitos de volumen de los hospitales, más el efecto de EARLY TAVR) y TMTT +30-40 % sobre una base de ≈770 M [B3, A5]. El consenso da 7.320 M en 2027e (+8 %); nosotros 7.441 M (+1,7 %) [D5]. Después baja de forma lineal hasta el 3,5 % en 2035e, cerca del terminal: TAVR madura y TMTT pasa a crecer al ritmo del mercado.',
    margenes: 'Margen EBITDA contable (con remuneración en acciones y con parte de los cargos de litigios y de I+D comprada, que se repiten): 23,4 % en 2025 con los cargos de JenaValve y litigios y 30,7 % en los 12 meses a junio de 2026 [A3, D9]. Proyectamos el 31 % en 2026e (BPA de 2,92 USD frente a la guía ajustada de 2,95-3,05) y una subida hasta el 33 % en 2030e por la escala de TMTT, hoy con margen bajo. El margen operativo ajustado del 4T25 fue del 23,7 % y el de la guía de 2026, mayor [A3].',
    inversion: 'Capex del 4,3 % de las ventas hasta 2028e (260 M en 2025, ampliación de fábricas) y 3,8 % después; amortización del 2,6 % (estimación). Circulante del 29 % de las ventas: existencias (1.126 M) y clientes (660 M) a cierre de 2025 sobre ventas de 6.068 M [A8]. El I+D (≈17 % de las ventas) va dentro del margen como gasto.',
    wacc: 'Tasa libre del 5,22 % (bono del Tesoro a 10 años del 13-oct) [D14], beta de 1,0 (ninguna beta de fuente primaria disponible; la de los grandes de tecnología médica ronda 0,8-1,1), prima de mercado del 5,0 % y sin prima adicional. Deuda testimonial (598,7 M frente a 49.432 M de capitalización): coste del 4,3 % y peso del 1 %. WACC del 10,15 %. Con la prima implícita del mercado (4,20 %) [D13], el WACC baja al 9,4 %. La recomendación depende poco de la beta porque la manda la regla a 12 meses.',
    terminal: 'Crecimiento a perpetuidad del 3,0 %: inflación en USD (≈2,5 %) y algo de volumen por envejecimiento; por debajo de la tasa libre menos medio punto. El valor terminal pesa un 57 % del valor. El múltiplo de salida de contraste (18x EBITDA) es el de los grandes de tecnología médica con crecimiento parecido.',
  },
  puente_comentarios: {
    '2026e': 'Volumen: procedimientos de TAVR (+8-9 % a divisa constante en la guía) y TMTT (+40 %); precio medio estable según la dirección; 1,5 puntos de divisa a favor en el 1S26 [A5, A6].',
    '2027e': 'Volumen: primer año completo de la nueva cobertura de Medicare (sin requisitos de volumen de hospital ni registro obligatorio en sintomáticos) y de la indicación en asintomáticos [B3, B4]; TMTT +30-35 %.',
    '2028e': 'Volumen: TAVR +7 % y TMTT +30 %; sin subidas de precio (el reembolso de Medicare limita el precio).',
    '2029e': 'Volumen: estenosis moderada si PROGRESS es positivo (resultados el 3-nov-2026), que no está en el caso base más allá de un punto.',
    '2030e': 'Volumen: TAVR madura hacia el crecimiento del mercado (≈7-8 %) y TMTT hacia el 20 %.',
  },
  veredicto: 'Sí',
  sostenibilidad_justificacion: 'La proyección no necesita capital nuevo relevante: la reinversión neta es el 13 % del NOPAT (circulante y algo de capacidad) y el motor no puede hacer la prueba de financiación, así que la hacemos con la cuota. TAVR crece en nuestro base un 7-8 % al año en 2027-30, por debajo del 9,9 % previsto para el mercado [B2]: la cuota de Edwards (más del 55 %) [B1] se mantiene o baja ligeramente. El precio no aporta crecimiento (estable), así que todo depende del volumen, que tiene tres palancas con fecha y evidencia: cobertura de Medicare finalizada el 10-sep-2026 [B3], indicación en asintomáticos [B7] y TMTT con crecimientos del 45-60 % [A5, A6]. El crecimiento lo financia el I+D, que ya va en gastos. Veredicto: Sí, sin rebajar el base.',
  dcf_lectura: 'El DCF da 58,18 USD por acción, un 32,2 % por debajo del precio, con un valor terminal del 57 %. El DCF inverso dice que el precio de 85,76 USD descuenta un crecimiento medio del 14,8 % anual en 2027-35, el doble de nuestro 7,1 %, o una rentabilidad implícita del 7,7 % frente a nuestro WACC del 10,15 %. Es exigente: Edwards no crece al 15 % desde antes de 2020. La diferencia es sobre todo de tasa: con la prima implícita del mercado el valor sube, pero tampoco llega al precio. El mercado paga a Edwards como empresa de crecimiento largo (TAVR en nuevas indicaciones y TMTT), con un descuento implícito del 7-8 %, típico de los grandes de tecnología médica de calidad. Por eso el valor intrínseco queda por debajo del precio y del objetivo a 12 meses: la acción no está barata en términos absolutos, aunque sí frente a su propia historia de múltiplos.',
  narrativas: {
    Bajista: 'Medtronic y Abbott ganan cuota en los hospitales nuevos que abre la cobertura de Medicare y la indicación en asintomáticos tarda en llegar al reembolso: TAVR crece un 4-5 % y el margen se queda en el 30 %, como en 2023-24 cuando TAVR se frenó por capacidad.',
    Base: 'TAVR crece un 7-8 % con la nueva cobertura y TMTT un 30-40 %; el margen sube un punto por año hasta el 33 % con la escala de TMTT.',
    Alcista: 'PROGRESS sale positivo en TCT y los asintomáticos se cubren pronto: TAVR crece a dos dígitos y TMTT llega a rentabilidad antes, con el margen un punto por encima del base.',
  },
  escenarios_comentario: 'En el DCF los tres escenarios quedan por debajo del precio (45,58, 58,18 y 66,46 USD): con una tasa del 10,15 % ni el alcista justifica la cotización. A 12 meses, con nuestro BPA y la regla de múltiplos v3, la asimetría es favorable (2,32x): el bajista pierde un 17,7 % y el alcista gana un 41 %. Las dos lecturas no se contradicen: el mercado aplica a Edwards una tasa más baja que la nuestra, y mientras la mantenga, el beneficio que crece al 11-12 % anual empuja el precio.',
  suma_partes_comentario: 'No aplica: TAVR, TMTT y Surgical comparten clientes, canal y fábricas, y la empresa no publica el resultado de cada línea.',
  valoracion_comentario: 'Pesos: DCF 50 %, escenarios 40 % y comparables 10 %. El DCF es el método que mejor recoge un crecimiento de diez años, pero a nuestra tasa (10,15 %) castiga a una empresa que el mercado descuenta al 7,7 %. Los comparables (PER de 17,5x) valoran a Edwards como un líder maduro y quedan lejos; las transacciones (105,94 USD de mediana) incluyen prima de control y una compra de Edwards es poco probable por la competencia, así que pesan cero. La dispersión entre métodos (de 57,56 a 105,94 USD) muestra que el valor depende de la tasa de descuento más que de las cifras: el valor objetivo de la síntesis (57,69 USD) es el de una empresa de calidad a precio exigente.',
  rentabilidad_comentario: 'El ROIC (NOPAT contable sobre capital invertido sin la caja) fue del 20,5 % en 2023, del 20,1 % en 2024 y del 15,7 % en 2025, por encima del WACC del 10,15 % en 5,6 puntos en el último año. La caída de 2025 es contable: cargos de litigios y de JenaValve que la empresa excluye de su cifra ajustada; con el beneficio ajustado el ROIC ronda el 22 %. El ROIC incremental de 2025 sale negativo y no se interpreta: el capital invertido cambió con la venta de Critical Care. El I+D (≈17 % de las ventas) va a gastos, lo que infravalora el capital y sobrevalora el ROIC frente a una empresa que lo capitaliza. Frente a los comparables (mediana de ROIC del 16,9 %), Edwards está en la media con el beneficio contable y por encima con el ajustado [D9].',
  diferencia_consenso: 'Nuestro BPA de 2027e (3,24 USD) queda un 4 % por debajo del consenso (3,38) [D11] porque contamos como recurrentes parte de los cargos que la empresa excluye (≈0,10 USD por acción). En 2028e no hay consenso fiable gratis. Nuestro precio base (99,44 USD) queda un 2,1 % por debajo del objetivo medio de los analistas (101,59 USD; 81-110) [D2, D4]: el múltiplo que aplica la regla (27,7x) es parecido al que implican los objetivos (≈28-30x el BPA de 2027e).',
  objetivo12m_comentario: 'El objetivo a 12 meses (97,61 USD ponderado) queda un 69 % por encima del valor intrínseco del DCF (57,69 USD de la síntesis). La distancia es de tasa de descuento: el mercado lleva cuatro años pagando 28-30 veces el BPA del año siguiente por Edwards, que equivale a una rentabilidad implícita del 7-8 %, y nuestra regla supone que eso sigue un año más (con el PER subiendo a mitad de camino de su mediana). Para cerrar la distancia con el DCF haría falta que el mercado exigiera nuestra rentabilidad del 10 % (caída del múltiplo a ≈17-18x, el de los comparables) o que el crecimiento durara mucho más que en nuestro base. La tesis a 12 meses es de beneficio y de múltiplo, no de valor intrínseco.',
  catalizadores: {
    items: [
      { fecha: '2026-11-02/03', evento: 'TCT: resultados del ensayo PROGRESS (TAVR en estenosis moderada) y acto con inversores', efecto: 'Positivo abriría un mercado nuevo a varios años; negativo quitaría parte de la prima', probabilidad: 'Media', sentido: '+/−' },
      { fecha: '2026-11-04', evento: 'Resultados del 3T26', efecto: 'Primer trimestre tras la cobertura de Medicare; la guía de 2026 (BPA 2,95-3,05) podría subir', probabilidad: 'Alta', sentido: '+' },
      { fecha: '2026-12', evento: 'Conferencia anual de inversores: guía de 2027', efecto: 'Si la guía de ventas de 2027 es ≥10 %, confirma nuestro base', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2027-1S', evento: 'Aprobación de estudios CED para asintomáticos (Medicare)', efecto: 'Activa la cobertura de los asintomáticos', probabilidad: 'Media', sentido: '+' },
      { fecha: '2027-02', evento: 'Resultados del 4T26 y del año', efecto: 'Prueba del margen con TMTT a escala', probabilidad: 'Alta', sentido: '+/−' },
    ],
    confianza: 'Media',
  },
  riesgos: {
    items: [
      { riesgo: 'Pérdida de cuota en TAVR frente a Medtronic y Abbott en los hospitales nuevos', tipo: 'Competencia', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−18 % (bajista a 12 meses)', mitigante: 'Evidencia clínica de durabilidad y salida de Boston Scientific', senal: 'Crecimiento de TAVR a divisa constante por debajo del 6 % dos trimestres seguidos' },
      { riesgo: 'Retraso de la cobertura de los asintomáticos (no hay estudios CED aprobados)', tipo: 'Regulación', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 a −10 %', mitigante: 'La cobertura de sintomáticos sin requisitos ya está en vigor', senal: 'Sin estudios CED aprobados a mediados de 2027' },
      { riesgo: 'PROGRESS negativo o ambiguo en TCT', tipo: 'Clínico', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 a −10 % (la prima de opción)', mitigante: 'No está en nuestro caso base', senal: 'Objetivo primario no alcanzado el 3-nov-2026' },
      { riesgo: 'Compresión del múltiplo hacia los comparables (17-18x)', tipo: 'Mercado', probabilidad: 'Baja', impacto: 'Alto', efecto_valor: '−35 % (el DCF está en 58 USD)', mitigante: 'Crecimiento de dos dígitos del BPA', senal: 'PER adelantado por debajo de 22x' },
      { riesgo: 'Litigios de patentes y cargos recurrentes', tipo: 'Legal', probabilidad: 'Alta', impacto: 'Bajo', efecto_valor: '−2 a −4 %', mitigante: 'Historial de acuerdos', senal: 'Cargos fuera del BPA ajustado por encima de 0,15 USD por acción al año' },
      { riesgo: 'TMTT no llega a rentabilidad', tipo: 'Operativo', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−8 % (margen 2 puntos por debajo)', mitigante: 'Crecimiento del 45-60 % que diluye costes fijos', senal: 'Margen operativo ajustado del grupo sin mejora en 2027' },
    ],
    premortem: 'Octubre de 2029: la acción ha caído un 40 %, a ≈52 USD. Lo que pasó: la nueva cobertura de Medicare abrió decenas de hospitales pequeños en 2027, y Medtronic y Abbott, con precios más bajos y su válvula autoexpandible, se llevaron la mayoría. TAVR de Edwards creció un 4 % en 2027 y un 3 % en 2028 mientras el mercado crecía al 9 %. PROGRESS dio un resultado ambiguo y los asintomáticos tardaron dos años en entrar en un estudio CED. TMTT siguió creciendo, pero su margen no compensó el frenazo de TAVR. Con el BPA creciendo al 5 %, el mercado dejó de pagar 28x y pasó a 18x, el múltiplo de los comparables. La señal temprana habría sido el crecimiento de TAVR a divisa constante por debajo del 6 % en el 2T27, con la dirección hablando de «presión competitiva en cuentas nuevas».',
    confianza: 'Media',
  },
  preguntas: {
    items: [
      { tema: 'Cobertura de Medicare', pregunta: '¿Cuántos hospitales nuevos esperan que abran programas de TAVR en 2027 y qué cuota esperan en ellos?', por_que: 'Es la palanca del crecimiento de 2027-28 y el riesgo de cuota del bajista.' },
      { tema: 'Asintomáticos', pregunta: '¿Qué estudios CED están en preparación y cuándo esperan la aprobación de CMS?', por_que: 'Sin ellos la cobertura de asintomáticos no se activa.' },
      { tema: 'Margen de TMTT', pregunta: '¿En qué año alcanza TMTT el margen operativo del grupo?', por_que: 'Sube el margen del caso base del 31 % al 33 %.' },
      { tema: 'Cargos recurrentes', pregunta: '¿Por qué los litigios y la I+D comprada se excluyen del BPA ajustado si se repiten cada año?', por_que: 'Distancia de ≈0,75 USD por acción entre contable y ajustado en 2025.' },
      { tema: 'Caja', pregunta: '¿Qué uso darán a los ≈3.650 M de caja neta tras el bloqueo de JenaValve?', por_que: 'Recompras al precio actual crearían poco valor según el DCF.' },
      { tema: 'Director financiero', pregunta: '¿Está confirmado el relevo del director financiero y quién lo sucede?', por_que: 'Cambio de la cúpula financiera en un año de guía nueva.' },
    ],
    confianza: 'Media',
  },
  fuentes: [],
  huecos: [
    { seccion: 'bolsa', campo: 'Beta de la acción', tipo: 'Complemento', intentos: '1) bolsa.mjs sin red; 2) Yahoo y Stock Analysis vía búsqueda; 3) Damodaran sectorial sin acceso', decision: 'Calculado y marcado como estimación' },
  ],
};
