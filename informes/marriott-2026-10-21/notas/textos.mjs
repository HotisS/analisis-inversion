// Textos del analista (Marriott International, corte 2026-10-21). Citas con la letra de la nota ([A3] = fuente 3 de A.json; [P1] propia).
export default {
  limitaciones: 'Cifras en millones de USD, ejercicio natural. El último ejercicio real es 2025; el 1S26 está en el 10-Q del 2T26 y el 3T26 se publica el 2-nov-2026 [D6]. INGRESOS = ingresos ajustados de la empresa (sin los ingresos de costes reembolsados, 19.204 M en 2025, que no dejan margen): con las ventas GAAP los márgenes no dicen nada [A2]. El EBIT que usa el motor es el resultado operativo ajustado (GAAP + diferencia neta de costes reembolsados, reestructuración y deterioros). Precio: cierre del 20-oct-2026 (397,31 USD); la sesión del 21-oct estaba abierta (405,44 USD a las 15:55 UTC [D2]) y la decisión se comprueba con ese precio en las pruebas de robustez. El BPA de la regla a 12 meses y su historia están en la base AJUSTADA de la empresa. Sin ficha sectorial de hoteles en el repositorio: el sector se apoya en el análisis de IHG del 20-oct [B2].',
  controles_explicados: [
    { control: 'Tipo impositivo efectivo razonable (2023)', explicacion: 'El tipo de 2023 (8,7 %) lleva dos beneficios fiscales que no se repiten: 228 M USD de una reestructuración internacional de la propiedad intelectual y 223 M de la liberación de una provisión de activos fiscales (0,77 y 0,75 USD por acción) [A11]. Sin ellos el tipo sería del ≈ 22 %. El DCF usa un 26 % (guía de 2026: 26-26,5 % [A4]) y la historia del PER usa el BPA de 2023 normalizado (8,47 USD).' },
    { control: 'ROE y Altman con patrimonio negativo', explicacion: 'El ROE del motor (−77 % en 2025) no es informativo: el patrimonio es negativo (−3.771 M USD) por 27.900 M de autocartera acumulada [A1]. El ROIC sí lo es porque el capital invertido (patrimonio + deuda − caja ≈ 11.600 M) es positivo; ver «Rentabilidad».' },
    { control: 'Crecimiento de los ingresos históricos (19,6 % anual)', explicacion: 'La tasa histórica que da el motor parte de 2021, todavía en la pandemia (ingresos ajustados de 3.415 M USD). Desde 2023, el crecimiento es del 5-6 % anual; la proyección (6,5 % de media) está ahí [A2].' },
  ],
  huecos: [],
  secciones: {
    historia: {
      resumen: 'J. Willard y Alice Marriott abrieron en 1927 un puesto de cerveza de raíz en Washington que creció hasta una cadena de restaurantes (Hot Shoppes); en 1957 abrieron su primer hotel en Arlington (Virginia) [A1]. En los años ochenta y noventa Marriott separó los inmuebles (Host Marriott, 1993) del negocio de gestión y marcas: el origen del modelo «ligero en activos» de hoy. En 1995 compró parte de Ritz-Carlton. La compra de Starwood (2016, ≈ 13.200 M USD) la convirtió en el mayor grupo hotelero del mundo y trajo Sheraton, Westin, St. Regis y W; en 2018 se descubrió la fuga de datos de los huéspedes de Starwood y en 2019 nació Marriott Bonvoy al unir los programas de fidelidad [A1]. La pandemia hundió el RevPAR un 60 % en 2020; Arne Sorenson murió en 2021 y le sucedió Anthony Capuano. Desde 2022 la empresa devuelve más de lo que gana con recompras financiadas con deuda [A1, A7].',
      hitos: [
        { anio: '1927', hito: 'J. Willard y Alice Marriott abren un puesto de bebidas en Washington, origen de Hot Shoppes.' },
        { anio: '1957', hito: 'Primer hotel, en Arlington (Virginia).' },
        { anio: '1993', hito: 'Separación de los inmuebles (Host Marriott) y del negocio de gestión y marcas.' },
        { anio: '2016', hito: 'Compra de Starwood (≈ 13.200 M USD): el mayor grupo hotelero del mundo.' },
        { anio: '2018-2019', hito: 'Fuga de datos de Starwood; nace Marriott Bonvoy.' },
        { anio: '2020-2021', hito: 'Pandemia (RevPAR −60 %); Capuano consejero delegado tras la muerte de Sorenson.' },
        { anio: '2023-2025', hito: 'Compra de City Express y citizenM; más de 3.000 M USD de recompras cada año [A1].' },
        { anio: '2026', hito: 'Contratos nuevos de tarjetas con JPMorgan Chase y American Express; Ask Bonvoy (IA); 1,78 M de habitaciones [A4].' },
      ],
      confianza: 'Media',
    },
    rentabilidad: {
      comentario: 'El ROE no sirve: el patrimonio es negativo (−3.771 M USD) por las recompras [A1]. El ROIC del motor (29,7 % en 2025) usa el capital invertido de financiación (patrimonio + deuda − caja ≈ 11.600 M), que equivale al capital invertido operativo neto de los pasivos de explotación, incluido el pasivo de fidelidad (7.992 M), que Marriott cobra antes de dar las noches. La medida exigente, sin restar ese pasivo (inmovilizado 1.954 + marcas 6.207 + contratos 4.129 + fondo de comercio 8.907 − circulante 466 ≈ 20.700 M) y con el resultado operativo ajustado después de un 26 % de impuestos (4.476 × 0,74 = 3.312 M), da un 16,0 %: ROIC − WACC de +5,8 puntos con nuestro WACC del 10,2 % y de +19,5 con la medida del motor [A1, A2]. Sin el fondo de comercio de Starwood el ROIC pasa del 100 %: el negocio de comisiones casi no necesita capital; lo caro fue comprar Starwood. Calidad: pasa (≥ 5 puntos en las dos medidas).',
      confianza: 'Media',
    },
    esg: {
      calificaciones: [],
      materialidad: 'Lo material para Marriott es la protección de datos de los huéspedes (fuga de Starwood de 2018, multas en Reino Unido y acuerdos en EE. UU.), las condiciones laborales de los 414.000 empleados que gestiona (148.000 propios) y la trata de personas en hoteles (formación obligatoria), y la energía y el agua de 9.805 hoteles que en su mayoría son de terceros [A1]. Las emisiones están casi todas en el alcance 3 (hoteles franquiciados).',
      controversias: 'Fuga de datos de Starwood (≈ 339 M de registros): multas de reguladores y la acción colectiva de EE. UU., cuya certificación anuló la apelación en junio de 2025 [A1]. Retribución del consejero delegado de 22,97 M USD (474 veces el empleado mediano) con un 92,7 % de apoyo [C1, C2]. Tensión con propietarios por el reparto del dinero de las tarjetas Bonvoy [B8]. Calificaciones de MSCI, Sustainalytics o CDP no comprobadas en fuente primaria.',
      confianza: 'Baja',
    },
  },
  parches: [],
  huecos_resueltos: [],
  dcf_justificacion: {
    crecimiento: 'Ingresos ajustados: 2026e +10 % (fijo), con el 1S26 a +11,8 % y la guía de comisiones brutas +11 % por los contratos nuevos de tarjetas [A4]. Después, +7,5 % en 2027e y bajada gradual al 4,5 % en 2033e: habitaciones netas del 4-4,5 % (guía y cartera de 629.000 habitaciones [A4]) más un RevPAR del 2,5 % (inflación más algo de precio real). Es algo más que el 5-6 % de 2023-2025, por las tarjetas, y menos que lo que pide el precio (19,7 % anual según el DCF inverso).',
    margenes: 'Margen EBITDA (sobre ingresos ajustados, con los pagos en acciones como coste) del 70,5 % en 2026e, calibrado con la guía de BPA ajustado (11,64-11,81 USD) y de EBITDA ajustado (5.965-6.025 M) [A4], subiendo al 71,5 % en 2028e por apalancamiento operativo (gastos generales casi planos: 895-875 M guiados). En 2025 fue del 68,9 %.',
    inversion: 'Inversión del 14 % de los ingresos ajustados en 2026e-2027e (inmovilizado y tecnología, 604 M, más inversión en contratos, 434 M, en 2025 [A1]) que baja al 11 % en 2033e al frenar el crecimiento de habitaciones; amortización del 5,0-5,7 %. Circulante del −6,5 % de los ingresos (sin el pasivo de fidelidad). No se proyectan compras.',
    wacc: 'Tasa libre del 5,12 % (bono del Tesoro a 10 años, 20-oct-2026 [D3]); beta de 1,11, la ajustada mensual a cinco años [D1] (Hilton e IHG usaron 1,05 [P1]); prima del 5,5 %; coste de la deuda del 5,5 % antes de impuestos (bonos a 10 años de agosto al 5,65 % [A9]); peso de la deuda del 14 % a valor de mercado. WACC del 10,22 %. Con la prima implícita del mercado (4,2 % [D4]) el WACC baja al 8,98 % y el DCF sube a 201,58 USD.',
    terminal: 'Crecimiento a perpetuidad del 3,0 %, algo por encima del 2,5 % de Hilton e IHG [P1] porque Marriott sigue sumando habitaciones de marca y la industria crece con el PIB nominal (4,2 % anual de 2000 a 2025 [B2]). El valor terminal pesa un 63 %.',
  },
  puente_comentarios: {
    '2026e': 'Habitaciones netas +4,5 % (guía en la parte baja del 4,5-5 %), RevPAR +3 % (guía 3-3,5 %) y 2,5 puntos de las tarjetas nuevas de JPMorgan y American Express [A4].',
    '2027e': 'Habitaciones +4,5 %, RevPAR +2,5 % y medio punto de tarjetas y mezcla de lujo.',
    '2028e': 'Habitaciones +4,5 % y RevPAR +2,5 %.',
    '2029e': 'Habitaciones +4 % (la cartera de 629.000 habitaciones da para cinco o seis años) y RevPAR +2,5 %.',
    '2030e': 'Habitaciones +3,5 % y RevPAR +2,5 %.',
  },
  veredicto: 'Sí',
  sostenibilidad_justificacion: 'El crecimiento proyectado (6,5 % medio en 2026e-2033e) es el que da el sistema sin comprar nada: la cartera de proyectos (629.000 habitaciones, 35 % del sistema, 44 % ya en construcción) asegura cinco años de habitaciones netas al 4-4,5 %, y el RevPAR se ha movido con la inflación en todo ciclo salvo recesiones [A4, B4]. No necesita capital: la reinversión acumulada es el 14 % del NOPAT y el capital lo ponen los propietarios. Prueba de cuota (sin mercado final en el motor): con habitaciones al +4,5 % en una industria que suma ≈ 1,5-2 % al año, la cuota mundial pasa del ≈ 9 % al ≈ 11 % en 2033, menos de 1,5 veces la actual [B2, B3]. El motor da «Sí».',
  dcf_lectura: 'El DCF da 155,82 USD por acción, un 60,8 % bajo el precio, con un WACC del 10,22 % y un valor terminal que pesa un 63 %. El DCF inverso dice que el precio descuenta un crecimiento del 19,7 % anual en 2027e-2033e con nuestros márgenes, frente al 6,0 % de nuestro base en el mismo periodo: tres veces lo que el negocio ha hecho fuera del rebote de la pandemia. Con la prima del mercado (4,2 %) vale 201,58 USD (−49 %): ni con la tasa del mercado se acerca. Si el pasivo de fidelidad (8.444 M) se tratara como deuda, restaría ≈ 32 USD más por acción; aquí se trata como financiación de clientes [A6]. El precio de hoy solo cuadra con un múltiplo terminal de ≈ 30 veces el EBITDA o con un crecimiento de dos dígitos durante una década.',
  narrativas: {
    Bajista: 'Recesión en EE. UU. o nueva caída del viajero internacional: el RevPAR cae un 2-5 % en lugar de subir, las comisiones de incentivo (sobre el beneficio del hotel) caen el doble y la apertura de habitaciones se frena porque los propietarios no consiguen financiación. Tres puntos menos de crecimiento y dos menos de margen cada año, y un WACC medio punto mayor.',
    Base: 'RevPAR del 2,5-3 %, habitaciones netas del 4-4,5 % y el salto de las tarjetas en 2026; margen que sube al 71,5 % con gastos generales casi planos.',
    Alcista: 'El ciclo de EE. UU. sigue fuerte (poca oferta nueva, Mundial de 2026, lujo), China y Oriente Medio se recuperan y Bonvoy gana peso con la IA: 1,5 puntos más de crecimiento y un punto más de margen.',
  },
  escenarios_comentario: 'Los tres escenarios del DCF quedan muy por debajo del precio: bajista 98,05 USD (−75 %), base 155,82 (−61 %) y alcista 178,88 (−55 %). Con estos pesos el valor ponderado de los escenarios queda un 57 % bajo el precio. La asimetría es negativa (−0,73): ningún caso razonable de crecimiento justifica el precio con nuestra tasa; lo justifica un múltiplo que el mercado paga a los negocios de marca y fidelidad (25-37 veces el beneficio).',
  casos_12m: {
    Bajista: 'Recesión en 2027-2028: ingresos ajustados +1 % en 2028e (RevPAR ≈ −2 %) y margen 2,5 puntos menor por la caída de las comisiones de incentivo: BPA ajustado de 12,63 USD en 2028e (−11 % frente al base) y el PER vuelve al mínimo de cinco años (17,6 veces, el de diciembre de 2022, con miedo a la recesión).',
    Base: 'Ingresos ajustados +10 % en 2026e, +7,5 % en 2027e y +7 % en 2028e; margen del 71,5 %; 920 M de intereses; tipo del 26,25 % y 259 M de acciones sin recompras nuevas: BPA ajustado de 14,17 USD (+12,3 % anual desde 10,02 en 2025).',
    Alcista: 'Dos puntos más de crecimiento y uno más de margen en 2028e (RevPAR fuerte, tarjetas, lujo): BPA de 14,73 USD; la regla no da más PER que el base porque la historia (mediana de 24,7 veces) y los comparables (21,5) están por debajo.',
  },
  diferencia_consenso: 'Nuestro BPA ajustado de 2026e (11,74 USD) coincide con el consenso y con la guía [D2, A4]; el de 2027e (13,03) queda un 0,9 % por debajo del consenso (13,15) porque no incluye recompras no anunciadas (Marriott recompra ≈ 3.500 M al año, ≈ 3 % de las acciones; la regla común no las supone) [A4]. La distancia con el objetivo medio de los analistas (385,38 USD, 26 analistas; nuestro base 392,51) es pequeña: ellos y nosotros vemos el precio cerca del valor a 12 meses. La diferencia está en el bajista: la regla lleva el PER al mínimo de 17,6 veces.',
  objetivo_comentario: 'El objetivo a 12 meses (353,83 USD, ponderado) queda un 10,9 % bajo el precio (−10,3 % con dividendo) y el valor intrínseco (170,93) un 57 %. El base (392,51 USD, −0,5 % con dividendo) supone que el BPA ajustado crece un 12,3 % anual y que el PER baja de 30,5 a 27,7 veces (tope de ÷1,1); el alcista apenas sube (408,02) y el bajista (222,29) es el PER de diciembre de 2022 sobre un BPA un 11 % menor. La rentabilidad ponderada queda justo en el umbral de Vender (−10 %): un precio un 1 % menor la deja en Mantener, y el de la sesión del 21-oct (405,44) la empeora.',
  valoracion_comentario: 'Pesos: DCF 50 %, escenarios 35 % y comparables 15 %. El DCF es el método natural para un negocio de comisiones estable con poca inversión, pero el resultado depende de la tasa: con la prima del mercado sube un 29 %. Los escenarios recogen el ciclo. Los comparables pesan poco porque su mediana mezcla a los grandes de lujo (Hilton, Hyatt, 35-37 veces) con la franquicia económica (Wyndham, Choice, 15). Las transacciones no pesan (compras de marcas sin EBITDA). La dispersión es enorme: del DCF (156 USD) al PER de los comparables (277-418): el precio solo se sostiene con múltiplos de mercado, no con flujos descontados.',
  catalizadores: {
    items: [
      { fecha: '2026-11-02', evento: 'Resultados del 3T26', efecto: 'RevPAR del 3T (guía +3,5-4 %), BPA (guía 2,74-2,82; consenso 2,84) y primera idea de 2027', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2026-10-27', evento: 'Resultados de Hilton del 3T26', efecto: 'Lectura del RevPAR de EE. UU. y de la demanda del 4T', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2027-02', evento: 'Resultados de 2026 y guía de 2027', efecto: 'Guía de BPA frente a los 13,15 USD del consenso; plan de recompras', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2026-2027', evento: 'Negociación con los propietarios del reparto de las tarjetas Bonvoy', efecto: 'Riesgo para el crecimiento de las comisiones de tarjetas (≈ 1.000 M en 2026)', probabilidad: 'Media', sentido: '−' },
      { fecha: '2027', evento: 'Agentes de IA de reserva (ChatGPT, Gemini) y el programa de Marriott para ellos', efecto: 'Coste de distribución y poder de la marca', probabilidad: 'Media', sentido: '+/−' },
      { fecha: 'Continuo', evento: 'Recompras (≈ 3.500 M USD al año)', efecto: '+3 % de BPA al año, financiado en parte con deuda', probabilidad: 'Alta', sentido: '+' },
    ],
    confianza: 'Media',
  },
  riesgos: {
    items: [
      { riesgo: 'Múltiplo: 30,5 veces nuestro BPA de 2027 frente a una mediana adelantada de cinco años de 24,7 y un mínimo de 17,6', tipo: 'Valoración', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−20 % si el PER vuelve a 24-25; −40 % al mínimo', mitigante: 'BPA ajustado +12 % anual con recompras', senal: 'Guía de 2027 por debajo de 13 USD o subida de tipos' },
      { riesgo: 'Ciclo de viajes y RevPAR (recesión en EE. UU., caída del viajero internacional, China)', tipo: 'Cíclico', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−25 a −40 % en una recesión (2009: RevPAR −17 %)', mitigante: 'Comisiones sobre ingresos (no sobre beneficio) en el 85 % del total; crecimiento de habitaciones', senal: 'RevPAR de EE. UU. negativo dos trimestres o caída de las reservas de grupos' },
      { riesgo: 'Deuda creciente para recompras (16.915 M USD, ≈ 2,9 veces el EBITDA; patrimonio −4.525 M)', tipo: 'Financiero', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−5 a −10 % si hay que parar recompras', mitigante: 'Grado de inversión (Baa2/BBB); vencimientos repartidos; línea de 5.000 M hasta 2031 [A8, A9]', senal: 'Deuda sobre EBITDA por encima de 3,5 veces o rebaja de calificación' },
      { riesgo: 'Competencia de Hilton (más habitaciones netas), IHG, Hyatt y Airbnb por propietarios y viajeros', tipo: 'Competencia', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 %', mitigante: 'Mayor sistema y programa de fidelidad del mundo; lujo', senal: 'Habitaciones netas por debajo del 4 % o «key money» al alza' },
      { riesgo: 'Propietarios que exigen más parte de las tarjetas y la fidelidad', tipo: 'Clientes', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−3 a −5 %', mitigante: 'Contratos largos; el programa trae reservas más baratas que las agencias [B8]', senal: 'Cambios en el reembolso de noches con puntos o conflictos con asociaciones de propietarios' },
      { riesgo: 'Ventas de directivos (66,4 M USD, ninguna compra) y relevo de la dirección financiera y regional', tipo: 'Gobierno', probabilidad: 'Baja', impacto: 'Bajo', efecto_valor: 'Señal, no valor', mitigante: 'Ventas de acciones de retribución; familia con el 17,6 %', senal: 'Ventas de la familia fuera de lo habitual' },
      { riesgo: 'Riesgo de IA en la distribución (agentes de reserva)', tipo: 'Tecnología', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−10 % a +5 % a 3-5 años', mitigante: 'Bonvoy, Ask Bonvoy, acuerdos con Google y OpenAI [B6, B7]', senal: 'Caída de la cuota de reservas directas (70 %) o pago a plataformas de IA' },
    ],
    premortem: 'Octubre de 2028: la acción ha perdido un 40 %. No hizo falta una pandemia: una recesión suave en EE. UU. en 2027 bajó el RevPAR un 4 % y las comisiones de incentivo un 15 %, mientras el viajero internacional seguía sin volver por los visados y los aranceles. A la vez, los propietarios consiguieron más parte del dinero de las tarjetas y los agentes de IA empezaron a cobrar por reservar, como antes las agencias en línea. Marriott frenó las recompras para no pasar de 3,5 veces de deuda y el BPA dejó de crecer; el mercado dejó de pagar 30 veces y volvió a las 18 de 2022.',
    ia: {
      exposicion: 'Media', sentido: 'Mixto', efecto_valor: '−10 % a +5 % a 3-5 años',
      comentario: 'La IA no sustituye una habitación ni una marca, pero puede cambiar quién elige el hotel. Hoy el 70 % de las reservas llega por canales propios, más baratos que las agencias en línea [B6]; si los agentes de reserva (ChatGPT, Gemini, Perplexity) se convierten en la puerta de entrada del viajero, el poder pasa al algoritmo y Marriott tendría que pagar por aparecer, como paga a Expedia y Booking. El propio 10-K lo avisa: más costes de distribución y menos lealtad a la marca [B1]. La otra cara: un viajero que delega en un agente valora un programa con 295 M de socios, puntos y estatus que el agente puede usar; Marriott lanzó Ask Bonvoy en junio de 2026, trabaja con Google y OpenAI y prepara un programa para agentes [B6, B7]. Señal: la cuota de reservas directas.',
    },
    confianza: 'Media',
  },
  preguntas: {
    items: [
      { tema: 'Tarjetas', pregunta: '¿Cuánto suman en 2026 las comisiones de las tarjetas Bonvoy, cuánto crecen desde 2027 sin el salto de los contratos nuevos y qué parte quieren los propietarios?', por_que: 'Son el motor del +11 % de 2026 y el punto de fricción con los propietarios.' },
      { tema: 'IA', pregunta: '¿Qué porcentaje de reservas llegará por agentes de IA en 2028, quién paga la comisión y cómo se integra Bonvoy en ellos?', por_que: 'Decide si el coste de distribución sube o baja; es el riesgo de largo plazo más grande.' },
      { tema: 'Costes reembolsados', pregunta: '¿Por qué los gastos reembolsados superan a los ingresos desde 2024 (−299 M en 2025) y cuándo se compensan?', por_que: 'Si no se compensan, el resultado ajustado sobrestima el beneficio un 6 %.' },
      { tema: 'Deuda', pregunta: '¿Hasta qué apalancamiento seguirá recomprando con deuda si el RevPAR cae?', por_que: 'Las recompras son ≈ 3 puntos de crecimiento del BPA al año.' },
      { tema: 'Habitaciones', pregunta: '¿Cuánto «key money» por habitación se paga hoy frente a 2023, y cuántas habitaciones de la cartera son conversiones?', por_que: 'Mide si el crecimiento cuesta más capital.' },
      { tema: 'Internacional', pregunta: '¿Qué parte de la caída de Oriente Medio es temporal (guerra de Irán) y cómo evoluciona la demanda de China hacia fuera?', por_que: 'Dos tercios de las comisiones de incentivo vienen de fuera de EE. UU.' },
    ],
    confianza: 'Media',
  },
  resumen: {
    recomendacion: 'Vender', conviccion: 'Baja', justificacion_recomendacion: null, horizonte: '12 meses',
    sintesis: `**La recomendación y por qué.** Vender, con convicción baja. El objetivo a 12 meses es de 353,83 USD (nuestro BPA ajustado de 2028e × el PER de la regla común), una rentabilidad ponderada del −10,3 % con el dividendo y del −0,5 % en el caso base, frente a un precio de 397,31 USD (cierre del 20-oct-2026; 405,44 en la sesión del 21-oct a las 15:55 UTC). La ponderada está justo en el umbral de Vender: un 1 % menos de precio la dejaría en Mantener; por eso la convicción es baja. El valor intrínseco (170,93 USD) queda un 57 % bajo el precio y el objetivo medio de los analistas (385,38) un 3 % bajo. La razón: Marriott es un negocio excelente que el mercado ya paga a 30,5 veces el BPA de 2027, frente a una mediana de 24,7 en cinco años.

**El negocio.** El mayor grupo hotelero del mundo (1,78 M de habitaciones, 9 % del total) cobra comisiones de franquicia, gestión y tarjetas sin tener hoteles [A1, B3]. Sobre los ingresos ajustados (sin costes reembolsados) gana un 64 % de margen operativo. El ROIC es del 29,7 % con el capital de financiación y del 16,0 % sin restar el pasivo de fidelidad: entre 5,8 y 19,5 puntos sobre el WACC del 10,2 %. Calidad: pasa. Sostenibilidad del crecimiento: «Sí», con una cartera de 629.000 habitaciones.

**Finanzas.** El BPA ajustado pasó de 3,19 USD (2021) a 10,02 (2025) y la guía de 2026 es de 11,64-11,81, con el salto de las tarjetas [A2, A4]. El patrimonio es negativo (−4.525 M) por las recompras; la deuda (16.915 M) es ≈ 2,9 veces el EBITDA, en grado de inversión (Baa2/BBB) [A6, A9]. El pasivo de fidelidad (8.444 M) es financiación de clientes, no deuda.

**Equipo y gobierno.** Capuano cumple la guía cada año. Familia con el 17,6 %, presidente de la familia y consejero coordinador independiente. En contra: 66,4 M USD de ventas de directivos sin ninguna compra y relevo de la directora financiera [C5, C4].

**Valoración.** El DCF da 155,82 USD (201,58 con la prima del mercado): el precio descuenta un crecimiento del 19,7 % anual frente al 6,0 % de nuestro base en el mismo periodo. La regla a 12 meses lleva el PER de 30,5 a 27,7 veces (tope de ÷1,1) y el bajista al mínimo de 17,6 (diciembre de 2022).

**Riesgos y catalizadores.** El mayor riesgo es el múltiplo; después, el ciclo de viajes (RevPAR de EE. UU. +5 % en el 2T26 pero viajero internacional −4,7 % y Oriente Medio −43 %), la deuda para recompras, la competencia de Hilton y Airbnb, los propietarios que quieren parte de las tarjetas y la IA (exposición media: agentes de reserva que pueden quitar poder a la marca o reforzar Bonvoy; −10 % a +5 %). Catalizador: resultados del 3T26 el 2-nov. La subida del último mes (+16,5 %) es de todo el sector y no cambia la decisión (regla 13).

**Qué cambiaría la decisión.** Mantener por debajo de ≈ 396 USD; Comprar exigiría a la vez rentabilidad ponderada ≥ 15 % y valor intrínseco ≥ precio, que con nuestro DCF no se da por encima de 171 USD. Una guía de 2027 por encima de 14 USD o un RevPAR de EE. UU. que acelere mejorarían la lectura; una recesión o una caída del RevPAR la empeorarían.`,
    tesis: 'Marriott es el mayor sistema hotelero del mundo y su negocio es casi una franquicia de marcas: cobra el 4-7 % de los ingresos por habitación de hoteles que pagan otros, más las tarjetas de crédito y la gestión. Con 295 M de socios de Bonvoy y una cartera de 629.000 habitaciones, puede crecer un 6-7 % al año en ingresos y más del 10 % en BPA con recompras, sin capital propio [A1, A4].\n\nEl problema es el precio: 30,5 veces el BPA de 2027 deja poco margen a un negocio cíclico. El DCF solo cuadra con un crecimiento del 19,7 % anual, y la historia adelantada (mediana de 24,7 veces, mínimo de 17,6) dice que el múltiplo actual está en la parte alta. La IA es la incógnita de largo plazo: puede reforzar Bonvoy o cobrar peaje por cada reserva.',
    vision_diferencial: {
      mercado_descuenta: 'Que el BPA ajustado crece un 12-14 % al año durante años (habitaciones, RevPAR, tarjetas, recompras) y que el PER de ≈ 30 veces es el nuevo normal de los negocios de marca y fidelidad.',
      nuestra_vision: 'Coincidimos en el BPA (11,74 en 2026e, 13,03 en 2027e frente a 11,74 y 13,15) y discrepamos en el múltiplo: el negocio es mejor que en 2022, pero un PER de 30 en máximos de ciclo de RevPAR, con deuda creciente y la IA cambiando la distribución, no deja margen.',
      por_que: 'La historia adelantada muestra 17-28 veces desde 2017; el precio actual exige 19,7 % de crecimiento anual en el DCF inverso.',
    },
    a_favor: [
      '**Mayor sistema del mundo**: 1,78 M de habitaciones y una cartera de 629.000.',
      '**Bonvoy y tarjetas**: 295 M de socios; comisiones de tarjetas ≈ 1.000 M USD en 2026.',
      '**Ligero en capital**: ROIC del 16-30 %; el capital lo ponen los propietarios.',
      '**Guía cumplida**: cuatro años en guía; 2026 subida dos veces.',
      '**Recompras**: ≈ 3 % de las acciones al año.',
    ],
    en_contra: [
      '**Caro**: 30,5 veces el BPA de 2027 frente a una mediana de 24,7; DCF un 61 % por debajo.',
      '**Cíclico**: el RevPAR cae con las recesiones y la guía del 3T26 decepcionó.',
      '**Deuda para recompras**: patrimonio −4.525 M USD; 1.250 M de bonos en agosto.',
      '**IA en la distribución**: puede convertir la marca en un proveedor más.',
      '**Directivos vendedores**: 66,4 M USD en 12 meses, ninguna compra.',
    ],
    que_vigilar: 'La tesis depende de que el RevPAR siga creciendo al ritmo de la inflación, las habitaciones netas se mantengan en el 4-4,5 % y las tarjetas sigan creciendo después del salto de 2026. La señal en contra sería un RevPAR de EE. UU. negativo, una guía de 2027 por debajo de 13 USD o una caída de las reservas directas.',
    cambiaria_recomendacion: [
      'Precio por debajo de ≈ 396 USD: Mantener (rentabilidad ponderada por encima de −10 %).',
      'Comprar: exigiría un valor intrínseco por encima del precio (≈ 171 USD con nuestro DCF) y una rentabilidad ponderada ≥ 15 %.',
      'Guía de BPA ajustado de 2027 por encima de 14 USD sin recompras nuevas: revisar al alza.',
      'RevPAR de EE. UU. negativo dos trimestres: reforzar Vender.',
      'Acuerdo con los propietarios que recorte las comisiones de tarjetas: reforzar Vender.',
    ],
    kpis_seguimiento: [
      { kpi: 'RevPAR mundial', nivel_actual: '+3,4 % (2T26); guía 2026 +3-3,5 %', umbral_alerta: '< 0 %', por_que: 'Las comisiones lo siguen casi uno a uno.' },
      { kpi: 'Habitaciones netas', nivel_actual: '+4,5 % interanual', umbral_alerta: '< 4 %', por_que: 'El otro motor del crecimiento.' },
      { kpi: 'BPA ajustado', nivel_actual: 'Guía 2026 11,64-11,81 USD', umbral_alerta: '< 11,64 USD', por_que: 'Base de nuestro objetivo.' },
      { kpi: 'Deuda sobre EBITDA ajustado', nivel_actual: '≈ 2,9 veces', umbral_alerta: '> 3,5 veces', por_que: 'Límite de las recompras.' },
      { kpi: 'Reservas por canales propios', nivel_actual: '≈ 70 %', umbral_alerta: '< 65 %', por_que: 'Mide el poder de la marca frente a agencias y agentes de IA.' },
    ],
  },
};
