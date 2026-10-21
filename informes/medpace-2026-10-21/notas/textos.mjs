// Textos del analista (Medpace, corte 2026-10-21). Citas: [A1] = fuente 1 de A.json; [P1] = fuente propia de propio.mjs.

export const limitaciones = `Precio de cierre del 21-oct-2026 (662,48 USD), anterior a los resultados del 3T26, que se publicaron tras el cierre; fuera de hora la acción se movió entre 622 y 666 USD sin volumen apreciable [D1, D14]. Acciones diluidas de 28,40 M: 27,97 M en circulación a 30-sep-2026 más la dilución del 3T26; el 10-Q del 3T26 aún no está presentado [D14]. Los ingresos son los totales publicados, con los gastos reembolsados a coste (40 % en el 3T26); los ingresos netos de servicio son estimación propia (totales menos reembolsados) [A1, A18]. El EBITDA del informe es EBIT más amortizaciones; el de la empresa y el del consenso de MarketScreener difieren en menos de un 1 % y no excluyen los pagos en acciones [A9, D7]. El consenso es del 21-oct, todavía sin los resultados [D7]. Los comparables son los del análisis de ICON del 9-oct (cifras de MarketScreener, Yahoo Finance y Stock Analysis a 8-oct), llevados al cierre del 21-oct con la variación de precio de cada acción [P1-P5]; su EBITDA es el ajustado del consenso (sin pagos en acciones), mientras que el de Medpace los incluye. Ejercicios 2016-2017 omitidos: anteriores a la norma de ingresos ASC 606 y no comparables [A2].`;

export const controles_explicados = [
  { control: 'Regresión múltiplo-crecimiento', explicacion: 'Con seis comparables y crecimientos del 0,9 % al 5,9 %, el crecimiento no explica los múltiplos (R² 0,04): el valor de la regresión no se usa; la valoración por comparables usa las medianas.' },
];

export const huecos_resueltos = [{ seccion: 'rentabilidad', campo: 'comentario' }];

export const secciones = {
  rentabilidad: {
    comentario: `Medpace crea valor con holgura desde hace años, pero su ROIC de 2025 (752,7 %) no es una medida útil: el capital invertido es casi nulo (59 M USD) porque los anticipos de clientes (854,4 M) financian todo el circulante y las recompras (2.240 M en 2018-2025) han dejado el patrimonio neto en 459,1 M con reservas negativas [A1, A2]. La serie limpia es la de los años con capital positivo apreciable: un ROIC del 11,6 % en 2018, cerca del WACC (11,22 %), que sube al 35,1 % en 2021 y al 78,6 % en 2023 a medida que crece el margen EBITDA (del 19,8 % al 22,3 %) y los anticipos sustituyen al capital propio. El ROE de 2025 (70,2 %) también está inflado por el patrimonio reducido. Lo relevante es que el crecimiento no consume capital: la reinversión neta de la proyección es negativa (−225 M), así que el valor depende del margen y del crecimiento, no de cuánto invierta. Frente a sus rivales, el ROIC de IQVIA (9,8 %), Thermo Fisher (8,8 %) y Charles River (8,6 %) está por debajo del WACC, lastrado por el fondo de comercio de sus compras, y el de ICON (0,7 %) por el deterioro de 2025 [P3]. El ROIC incremental del motor no se puede calcular con un capital invertido que se acerca a cero.`,
    confianza: 'Media',
  },
};

export const comparables_criterio = `Quedan pocas CRO cotizadas: Syneos, PPD, PRA y Parexel ya no cotizan [B19, P9, P10, P11]. Se usan IQVIA (la mayor CRO), ICON (CRO de servicio completo y funcional, el comparable más directo), Charles River (preclínica), Labcorp (laboratorio central de ensayos), Fortrea (CRO escindida de Labcorp, en reestructuración) y Thermo Fisher (dueña de PPD, conglomerado) [P1-P4]. Ninguna se parece del todo: Medpace es la única centrada en biotecnológicas pequeñas, sin deuda y sin compras. Se excluyen WuXi AppTec y Tigermed (China, riesgo geopolítico y beneficios con plusvalías de inversiones) [P4].`;

export const comparables_comentario = `Medpace cotiza a 27,2 veces el EBITDA de los próximos 12 meses y a 35,1 veces el beneficio, frente a una mediana de 13,9 y 21,0 veces de sus comparables, que han subido con el sector en octubre [P1, P2, D16]. A los múltiplos medianos valdría 351,05 USD por EV/EBITDA y 396,29 USD por PER, 373,67 USD de media. Parte de la prima está justificada: su margen EBITDA del 22,4 % está entre los altos del grupo, no tiene deuda (−1,1 veces el EBITDA frente a 3,2 veces de mediana) y su ROIC es incomparable, mientras que el de IQVIA, Charles River y Labcorp no llega al 10 % [P3]. Lo que no justifica la prima es el crecimiento de los próximos 12 meses: un 5,3 %, parecido al de IQVIA (5,8 %), que cotiza a 14,1 veces. La regresión no explica nada (R² 0,04) y la base de EBITDA de los comparables es ajustada, unos 1,4 puntos de margen por encima de la de Medpace: pesan un 15 %.`;

export const transacciones_comentario = `La mediana de siete operaciones del sector, 15,5 veces el EBITDA ajustado, daría 369,96 USD por acción; no pesa en el valor objetivo [P9]. Las dos más caras, PRA (24,4 veces) y PPD (23,4 veces), se pagaron en 2021 en pleno auge de la financiación biotecnológica; Syneos, en 2023, se vendió a 9,7 veces el EBITDA previsto con una prima del 24 % [P9, P10, P11]. Ni siquiera el múltiplo de PRA, con prima de control, alcanza el EV/EBITDA actual de Medpace (28,5 veces el de los últimos 12 meses). Una OPA es improbable: el fundador controla el 19,1 % y dirige la compañía, y a 18.100 M USD de valor empresa solo Thermo Fisher o un gran fondo podrían pagarla [C10].`;

export const dcf_justificacion = {
  crecimiento: `2026e queda fijado en 2.845 M USD (+12,4 %), el punto medio de la guía del 21-oct (2.835-2.855 M), que estrecha la de julio sin moverla [A18, D14]. La guía implica un 4T26 casi plano (unos 715 M, +0,9 % interanual), porque los reembolsos crecen poco. 2027e crece un 7,0 %, algo por encima del consenso (+6,3 %): la cartera crece un 5,6 % interanual a septiembre, pero la contratación del 3T26 fue récord (873,4 M, book-to-bill de 1,22) [A18, D7]. 2028e-2031e, entre el 9,5 % y el 8,0 %, en línea con el consenso de 2028 (+9,8 %) y con el 11,9 % al que crecieron en el 3T26 los ingresos netos de servicio [D7, A18]. Después converge al 4,5 % en 2035e. Es la mitad del 20 % anual de 2018-2025, que se apoyó en el auge de la financiación biotecnológica de 2020-2021 y en la obesidad [A1, B21].`,
  margenes: `El margen EBITDA sobre ingresos totales parte del 22,7 % de la guía de 2026 (EBITDA de 638-652 M USD, subida desde 618-642 M), frente al 22,3 % de 2025 [A18, A1]. Con ese margen, 22,9 M de intereses y un 19,25 % de impuestos, el BPA de 2026e sale en 18,12 USD, dentro de la guía (17,97-18,32) [A18]. En 2027e baja a 22,2 % y luego sube 0,2 puntos al año hasta el 23,0 % en 2031e por apalancamiento operativo, como entre 2018 (19,8 %) y 2024 [A1]. No supone más: el margen del 3T26 (24,0 % de EBITDA) se apoya en que los reembolsos a margen cero solo crecen un 3,8 % y en una remuneración en acciones que en 9M26 es de 16,9 M frente a 29,2 M; ninguna de las dos cosas tiene por qué repetirse [A18, A5]. Sobre ingresos netos de servicio, el 23,0 % equivale a un 38-39 %, frente al 37,7 % de 2025 (estimación propia).`,
  inversion: `Capex del 1,8 % de las ventas en 2026e, por las obras de la sede (30,7 M en el 1S26, casi el doble que en el 1S25), y del 1,5 % después, frente al 1,2 % de 2025; amortización del 1,1 % al 1,4 % [A1, A5]. El circulante comercial incluye los anticipos de clientes: fue de −19,0 % de las ventas en 2025 y −21,2 % en 2024 [A1]. Proyectamos que su peso baje poco a poco hasta −16,0 %, porque los anticipos crecieron más deprisa que las ventas (del 21 % al 34 % entre 2018 y 2025) y no pueden hacerlo siempre: con la ratio constante, cada dólar de ventas nuevas traería 19 céntimos de caja sin coste. No se incluyen los gastos devengados (408,4 M a dic-25), cuyo crecimiento sumaría unos 30 M de caja al año (estimación propia) [A1].`,
  wacc: `Medpace no tiene deuda, así que el WACC es el coste de los fondos propios: 11,13 %. Tasa libre: el bono del Tesoro de EE. UU. a 10 años al 5,13 % (21-oct-2026) [D15]. Beta de 1,09, la ajustada mensual a cinco años frente al S&P 500; la mensual sin ajustar es 1,13, la semanal a dos años 0,98 y Stock Analysis da 1,18 [D1, D10]. Prima de mercado del 5,5 % y sin prima adicional: el riesgo del fundador y de la concentración en biotecnológicas va en los escenarios. Con la prima implícita del S&P 500 de Damodaran (4,20 % en octubre de 2026), el coste baja al 9,7 % [D13]; esa es la referencia relativa.`,
  terminal: `Gordon con un crecimiento del 3,0 % a perpetuidad: 1-1,5 % real más una inflación del 2-2,5 %, por debajo de la tasa libre menos medio punto (4,63 %). Equivale a 9,7 veces el EBITDA de salida, por debajo de la mediana actual de los comparables (12,9 veces el de los próximos 12 meses) y del mínimo histórico de Medpace (14,5 veces) [P1]. Es la consecuencia de un WACC del 11,13 %: un negocio sin necesidad de inversión vale en torno a 1 / (WACC − g) veces su beneficio operativo después de impuestos. No usamos el múltiplo de salida porque los 16-25 veces que el mercado paga hoy por las CRO de calidad presuponen tasas más bajas. El valor terminal pesa un 52 % del valor empresa.`,
};

export const puente_comentarios = {
  '2026e': `Volumen: guía del 21-oct, 2.835-2.855 M USD, con el 4T26 casi plano [A18]. Precio: estimación propia de 2,5 puntos; Medpace no publica tarifas. Otros: los reembolsos pesan el 40-42 % de los ingresos [A18].`,
  '2027e': `Año débil: la cartera crece un 5,6 % interanual a septiembre, aunque la contratación del 3T26 fue récord (book-to-bill de 1,22) [A18]; el consenso espera un +6,3 % [D7].`,
  '2028e': `Volumen apoyado en la recuperación de la contratación del 2T26 (adjudicaciones récord de 795,7 M; book-to-bill de 1,13) y en el consenso (+9,8 %) [A7, D7].`,
  '2029e': `Crecimiento del mercado (4,5 % anual) más ganancia de cuota en biotecnológicas, como en 2018-2025 [B9].`,
  '2030e': `Igual que 2029e; la cuota implícita pasa del 3,4 % al 4,2 % del desarrollo clínico externalizado [B9].`,
};

export const sost_veredicto = 'Sí';
export const sost_justificacion = `La calidad de Medpace sostiene el 7,8 % anual que proyectamos para 2026e-2035e: es la mitad de su crecimiento de 2018-2025 (20 % anual), la cuota implícita sube del 3,4 % al 4,2 % del desarrollo clínico externalizado en 2030e (1,24 veces la actual, dentro del límite de 1,5) y el crecimiento no exige capital, porque los anticipos financian el circulante y el capex es del 1,5 % de las ventas [A1, B9]. Su foso es estrecho pero real: margen operativo del 21,1 % frente al 5,4-14,0 % de sus rivales [B1, B9, B16, B17]. Lo que no sostiene es el 17,4 % anual durante nueve años que descuenta el precio: exigiría casi cuadruplicar la cuota, con una cartera que solo crece un 5,6 % y un poder de precios que la empresa no publica [A7].`;

export const dcf_lectura = `El DCF da 334,21 USD por acción, un 49,6 % por debajo del precio, con un WACC del 11,13 %; el valor terminal pesa un 52 % y el rango de sensibilidad (WACC y crecimiento ± 0,5 puntos) va de 307,14 a 368,59 USD. Con la prima implícita del mercado (WACC del 9,7 %) sube a 401,51 USD, todavía un 39,4 % por debajo. **El DCF inverso es el centro del informe**: a 662,48 USD el mercado pide que los ingresos crezcan un 17,4 % anual entre 2027e y 2035e con nuestro margen, frente al 7,3 % de nuestro caso base, o un margen EBITDA del 46,9 % con nuestro crecimiento, frente al 23,0 %. Con nuestros flujos el precio solo rinde un 7,0 % anual, por debajo del 11,13 % de su coste de capital y del 9,7 % que pide el mercado. Nuestra proyección coincide con el consenso de 2026-2028 con diferencias de menos del 3 %: la discrepancia con el precio no está en las cifras de los próximos tres años, sino en cuánto dura el crecimiento alto después. El 3T26 no lo cambia: la guía de beneficio sube, pero la de ingresos se queda donde estaba [A18].`;

export const narrativas = {
  Bajista: `Una nueva sequía de financiación biotecnológica, como la de 2022 (−54 %), coincide con el fin del auge de los ensayos de obesidad: las cancelaciones del 1T26 se repiten, el book-to-bill se queda por debajo de 1 varios trimestres y los ingresos de 2027 caen un 5 % [B21, A8]. El margen baja 2-3 puntos por la menor utilización del personal y el crecimiento posterior se queda en el 5-6 %.`,
  Base: `Medpace cumple la guía de 2026, crece un 7 % en 2027 por una cartera que crece poco y vuelve al 8-9,5 % en 2028-2031 con la contratación récord del 3T26, en línea con el consenso [D3, D7]. El margen sube poco a poco hasta el 23,0 % y los anticipos pierden algo de peso.`,
  Alcista: `La contratación récord del 2T26 y el 3T26 se sostiene, la financiación biotecnológica se recupera con las salidas a bolsa de 2026 y Medpace vuelve a crecer al 11-13 % anual varios años, ganando cuota a ICON y Fortrea, con el margen en el 24,5 % [A7, B21]. Aun así el valor queda por debajo del precio.`,
};

export const escenarios_comentario = `La asimetría es negativa en los tres escenarios: el alcista vale 464,96 USD (−29,8 %), el base 334,21 USD (−49,6 %) y el bajista 223,06 USD (−66,3 %); ponderados, 339,11 USD. Incluso un alcista que supone volver a crecer al 11,3 % anual durante nueve años, con un margen final del 24,5 %, deja la acción un 30 % por debajo del precio. Con la prima del mercado el alcista sube a 566,56 USD, aún por debajo de 662,48 USD. El bajista no es cosmético: Medpace tuvo un book-to-bill de 0,88 en el 1T26 y de 0,90 en el 1T25, y la financiación biotecnológica cayó un 54 % en 2022 [B21, A8]. Para que el precio tenga sentido como valor hay que creer en un escenario mejor que nuestro alcista y en un coste de capital menor; a 12 meses, en cambio, el precio se sostiene si el mercado sigue pagando unas 32 veces el beneficio.`;

export const valoracion_comentario = `Pesos: 45 % DCF, 40 % escenarios y 15 % comparables; las transacciones no pesan porque llevan prima de control y no esperamos una OPA. El DCF es el método más fiable para Medpace: no tiene deuda, sus flujos son predecibles a dos años por la cartera y la clave del valor es cuánto dura el crecimiento, que solo un DCF hace explícito. Los comparables pesan poco porque ninguno crece ni gana lo que Medpace y la muestra no explica los múltiplos (R² 0,04). La dispersión entre métodos es pequeña: DCF 334,21 USD, comparables 373,67, transacciones 369,96 y escenarios 339,11 USD; todos están entre un 44 % y un 50 % por debajo del precio. El valor intrínseco es de 342,09 USD (399,86 USD con la prima del mercado). La recomendación la decide la regla a 12 meses (nuestro PER por nuestro BPA de 2028e): ponderada −8,2 %, base −0,2 %; es Mantener, ni compra ni venta [D7].`;

export const catalizadores = {
  items: [
    { fecha: '22-oct-2026', evento: 'Conferencia del 3T26 y primera sesión tras los resultados', efecto: 'Cancelaciones del trimestre y primera indicación sobre 2027; la reacción fuera de hora fue de −6 % a +0,5 % [D14].', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'Febrero de 2027', evento: 'Resultados del 4T26 y guía de 2027', efecto: 'El consenso espera +6,3 % de ingresos en 2027; una guía por debajo confirmaría la desaceleración [D7].', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'Abril de 2027', evento: 'Resultados del 1T27', efecto: 'Prueba de la estacionalidad de las cancelaciones: el 1T fue el trimestre débil en 2025 y 2026 (book-to-bill de 0,90 y 0,88) [B5, A8].', probabilidad: 'Alta', sentido: '−' },
    { fecha: 'Mayo de 2027', evento: 'Junta de accionistas: desaparece el consejo escalonado', efecto: 'Mejora de gobierno ya aprobada en 2024; posible nombramiento de un sucesor del President [C1, C5].', probabilidad: 'Media', sentido: '+' },
    { fecha: '12-18 meses', evento: 'Demanda colectiva (Durbin) y derivada por las declaraciones sobre el book-to-bill', efecto: 'Sin provisión; un acuerdo tendría coste limitado pero mantendría el foco en la calidad de la cartera [B6].', probabilidad: 'Media', sentido: '−' },
    { fecha: 'Continuo', evento: 'Ventas del fundador y nueva autorización de recompra de 1.000 M USD hasta 2028', efecto: 'Las ventas de Troendle presionan el precio; las recompras lo sostienen [C8, A5].', probabilidad: 'Alta', sentido: '+/−' },
  ],
  confianza: 'Media',
};

export const riesgos = {
  items: [
    { riesgo: 'Riesgo para la tesis: el crecimiento vuelve al 15-20 % anual varios años', tipo: 'Valoración', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '+39 % sobre nuestro valor (escenario alcista, 464,96 USD)', mitigante: 'Ni el alcista alcanza el precio; habría que crecer más y con menor coste de capital.', senal: 'Book-to-bill > 1,2 tres trimestres seguidos y guía 2027 de ingresos > +12 %.' },
    { riesgo: 'Caída de la contratación y repunte de cancelaciones', tipo: 'Negocio', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−33 % sobre nuestro valor (bajista, 223,06 USD)', mitigante: 'Cartera de 3.167 M USD (1,1 veces los ingresos) y cobro del trabajo hecho al cancelar [A1, A7].', senal: 'Book-to-bill < 1 en el 4T26 o el 1T27.' },
    { riesgo: 'Compresión del múltiplo hacia los de las CRO comparables', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−44 % sobre el precio (comparables a la mediana: 373,67 USD)', mitigante: 'Medpace ha cotizado siempre con prima: PER mínimo de 26,3 veces en ocho años.', senal: 'PER de los próximos 12 meses por debajo de 25 veces.' },
    { riesgo: 'Concentración en obesidad y metabolismo (29,4 % de los ingresos)', tipo: 'Negocio', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−10 % a −15 % (estimación propia: un año sin crecer en el área)', mitigante: 'Oncología pesa lo mismo y dominó la contratación del 2T26 [A12].', senal: 'Adjudicaciones de cardiometabolismo, que ya cayeron en el 2T26 [A12].' },
    { riesgo: 'Financiación biotecnológica (95 % de los ingresos de biotecnológicas pequeñas y medianas)', tipo: 'Sector', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−20 % a −34 % (entre base y bajista)', mitigante: 'Anticipos de 904,7 M que reducen el riesgo de crédito [A5].', senal: 'Capital riesgo y salidas a bolsa biotecnológicas trimestrales (EY, Nasdaq Biotech) [B21].' },
    { riesgo: 'Sucesión del fundador (69 años, sin President desde mayo de 2026)', tipo: 'Gobierno', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 % a −10 % por mayor prima de riesgo (estimación propia)', mitigante: 'Equipo operativo con décadas en la casa (Burwig desde 1993, Hansman desde 2011) [C1, C6].', senal: 'Ausencia de un sucesor nombrado en la junta de 2027.' },
    { riesgo: 'Reversión de los anticipos de clientes', tipo: 'Financiero', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−1 % a −2 % del valor (volver al 30 % de las ventas de 2021: unos 110 M de caja)', mitigante: 'Los anticipos se compensan con trabajo, no se devuelven en efectivo salvo cancelación.', senal: 'Anticipos por debajo del 30 % de los ingresos de los últimos 12 meses.' },
    { riesgo: 'Operaciones vinculadas y litigio por el book-to-bill', tipo: 'Gobierno', probabilidad: 'Baja', impacto: 'Bajo', efecto_valor: '−1 % a −3 % (estimación propia)', mitigante: 'Se publican en el proxy y el 10-K; los ingresos vinculados son el 2,1 % [A1, C1].', senal: 'Avance de la demanda colectiva o nuevas operaciones con sociedades del fundador.' },
  ],
  premortem: `Octubre de 2029: hemos vendido Medpace y la acción ha subido un 40 %. ¿Qué pasó? La contratación récord del 2T26 no fue un rebote, sino el inicio de un nuevo ciclo: las salidas a bolsa biotecnológicas de 2026 desbloquearon una ola de ensayos de fase II y III, la obesidad pasó de los GLP-1 a una segunda generación de moléculas y Medpace, la única CRO de servicio completo sin distracciones (ICON con su reexpresión, Fortrea en reestructuración), se llevó la mayor parte [A7, B21]. Los ingresos crecieron un 15 % anual, el margen subió al 25 % y las recompras redujeron las acciones otro 3 % al año, de modo que el BPA creció un 20 % anual y el mercado mantuvo el PER de 30 veces. El tipo del Tesoro bajó al 4 % y el coste de capital de las empresas de calidad cayó con él. Nuestro error habría sido tratar el 7 % de crecimiento del consenso como un techo y no como un suelo, y descontar con un 11 % un negocio que el mercado siempre ha descontado con menos. Los indicadores que lo habrían anticipado: un book-to-bill por encima de 1,2 durante tres trimestres, una guía de 2027 por encima del 12 % y una cartera creciendo más deprisa que los ingresos.`,
  confianza: 'Media',
};

export const preguntas = {
  items: [
    { tema: 'Cartera', pregunta: '¿Qué parte de la cartera de 3.167 M USD se convertirá en ingresos en los próximos 12 meses y cómo ha cambiado esa ratio en dos años?', por_que: 'La cartera crece un 5,6 % y los ingresos un 8,5 %: el consumo acelerado de la cartera es la causa de la desaceleración que esperamos [A7].' },
    { tema: 'Cancelaciones', pregunta: '¿Cuánto sumaron las cancelaciones en importe en el 1T26 y el 2T26, y qué parte se concentró en obesidad?', por_que: 'La empresa solo publica adjudicaciones netas; sin las brutas no se sabe si el 2T26 fue recuperación o menos cancelaciones [A1].' },
    { tema: 'Precio', pregunta: '¿Cuánto han subido las tarifas por hora frente al coste salarial en 2024-2026?', por_que: 'El poder de precios es la única forma de crecer sin capital por encima del mercado, y no se publica.' },
    { tema: 'Reembolsos', pregunta: '¿Por qué los gastos reembolsados pasaron del 34 % al 43,5 % de los ingresos y qué peso esperan a medio plazo?', por_que: 'Inflan el crecimiento aparente y diluyen el margen total sin cambiar el beneficio [A1, A7].' },
    { tema: 'Sucesión', pregunta: '¿Hay un plan de sucesión del primer ejecutivo y del President, y cuándo se nombrará al sucesor de Jesse Geiger?', por_que: 'Troendle tiene 69 años, concentra presidencia, dirección y el 19,1 % del capital, y vende acciones [C1, C10].' },
    { tema: 'Recompras', pregunta: '¿Con qué criterio de valor se recompra: por qué 294,7 M a unos 418 USD en el 2T26 y nada en el 4T25 y el 1T26?', por_que: 'Las recompras absorben el 91 % del FCF y son la palanca del BPA [A1, A5].' },
    { tema: 'Remuneración en acciones', pregunta: '¿Por qué bajó de 22,8 M a 9,3 M en el 1S26 y cuánto se espera para 2026?', por_que: 'Explica 12,9 M de mejora del SG&A; si no se repite, el margen del LTM está inflado [A5].' },
    { tema: 'Vinculadas', pregunta: '¿Qué condiciones tienen los contratos con CinRx y LIB Therapeutics frente a los de clientes independientes?', por_que: 'Son 53,2 M de ingresos con sociedades en las que participa el primer ejecutivo [A1].' },
  ],
  confianza: 'Media',
};

const sintesis = `**La recomendación y por qué.** Mantener, con convicción Baja. A 12 meses, con nuestro PER y nuestro BPA de 2028e, Medpace vale 608,29 USD ponderado (−8,2 % sobre 662,48 USD) y 661,39 USD en el caso base (−0,2 %): no da para comprar (hace falta +15 % y +12 %) ni para vender (−10 %). El valor intrínseco es mucho menor, 342,09 USD (−48,4 %): el precio descuenta un crecimiento del 17,4 % anual durante nueve años, más del doble del 7,3 % de nuestro caso base, que coincide con el consenso de 2026-2028. La convicción es Baja porque la acción está en máximos tras subir un 25 % en tres meses, la venta empieza a solo un 2 % por encima del precio (675,88 USD) y la reacción a los resultados no se conocerá hasta el cierre del 22-oct.

**El negocio.** Medpace es la CRO de servicio completo de las biotecnológicas pequeñas y medianas y la más rentable del sector: margen operativo del 23,1 % en el 3T26 frente al 5,4-14,0 % de IQVIA, ICON y Thermo Fisher [A18, B1, B9]. Los anticipos de clientes (961,9 M USD) financian todo el circulante, de modo que crece sin capital [A18]. La calidad sostiene el 7,8 % anual que proyectamos (cuota del 3,4 % al 4,2 % en 2030e), pero no el 17,4 % que pide el precio.

**Finanzas.** El 3T26 fue bueno en contratación y beneficio: ingresos de 716,0 M USD (+8,5 %), contratación récord de 873,4 M (book-to-bill de 1,22), cartera de 3.167,2 M (+5,6 %) y BPA de 4,84 USD (+25 %) [A18]. La guía de 2026 sube en beneficio (BPA de 17,97-18,32 USD) pero no en ingresos (punto medio de 2.845 M), y deja un 4T26 casi plano. Sin deuda y con 705,3 M de caja; el consejo ha aprobado recompras de hasta 1.000 M USD hasta 2028 [A19].

**Equipo y gobierno.** Resta. El fundador, de 69 años, es presidente, primer ejecutivo y President interino, sin sucesor; controla el 19,1 % y ha vendido mucho en 12 meses [C1, C8, C10]. Hay operaciones vinculadas y el variable a largo plazo no lleva métricas; cumple 8 de 13 criterios de gobierno [C1]. A favor: ha subido la guía de BPA dos veces este año y la ha superado todos los años desde 2020 [C13-C19, C22].

**Valoración.** Todos los métodos de valor coinciden: DCF 334,21 USD, comparables 373,67 y transacciones 369,96. Cotiza a 27,2 veces el EBITDA de los próximos 12 meses frente a 13,9 veces de mediana de sus comparables [P1]. Con nuestros flujos el precio rinde un 7,0 % anual, frente a un coste de capital del 11,13 % y el 9,7 % que pide el mercado. A 12 meses el precio se sostiene porque la historia de Medpace es de múltiplos altos: 32,2 veces el BPA en el caso base, a mitad de camino entre su PER actual y su mediana adelantada. Los analistas, con 2 compras, 11 mantener y 1 venta y un objetivo medio de 595,92 USD, quedan por debajo del precio [D7].

**Riesgos y catalizadores.** El riesgo para la tesis de valor es que el crecimiento vuelva al 15-20 % y el mercado siga pagando más de 30 veces el beneficio. A la baja, un nuevo frenazo de la contratación como el del 1T26 (book-to-bill de 0,88), la concentración en obesidad y un 4T26 plano [A8, A1, A18]. Catalizadores: la conferencia del 22-oct y la guía de 2027 en febrero. Los foros siguen divididos [E1].

**Qué cambiaría la decisión.** Compraríamos por debajo de 342,09 USD y venderíamos por encima de 675,88 USD. Una guía de 2027 por encima del 12 % de ingresos y un book-to-bill por encima de 1,2 dos trimestres más subirían el caso base.`;

export const resumen = {
  recomendacion: 'Mantener',
  conviccion: 'Baja',
  justificacion_recomendacion: null,
  horizonte: '12 meses',
  sintesis,
  tesis: `Medpace es la CRO de servicio completo de referencia para las biotecnológicas pequeñas y medianas, con el margen operativo más alto del sector, sin deuda y con un circulante financiado por los clientes (961,9 M USD de anticipos) que le permite crecer sin capital [A18, B1, B9]. El 3T26 trajo contratación récord (book-to-bill de 1,22) y una guía de beneficio más alta [A18].

El precio, 662,48 USD, descuenta que el crecimiento de 2018-2025 siga: un 17,4 % anual entre 2027e y 2035e con nuestro margen. Cotiza a 27,2 veces el EBITDA y a 35,1 veces el beneficio de los próximos 12 meses, más del doble que sus comparables, con un crecimiento previsto parecido al de IQVIA [D7, P1].

Creemos que el mercado se equivoca en la duración del crecimiento, no en su calidad, pero a 12 meses eso no basta para vender: con el múltiplo que Medpace ha tenido siempre, el precio está en su sitio. Es una acción para mantener quien la tenga y para comprar solo muy por debajo.`,
  vision_diferencial: {
    mercado_descuenta: `Que Medpace mantenga durante casi una década un crecimiento cercano al 17 % anual y que la prima de más de 30 veces el beneficio sea permanente. La rentabilidad implícita en el precio con nuestros flujos es del 7,0 % anual, por debajo del 9,7 % que el mercado pide de media a una acción con su beta.`,
    nuestra_vision: `La calidad es real, pero el crecimiento de 2018-2025 tuvo dos impulsos irrepetibles: la financiación biotecnológica récord de 2021 y la ola de ensayos de obesidad [B21, B1]. Esperamos un 7-9,5 % anual en 2027-2031, en línea con el consenso y con una cartera que crece un 5,6 %, que vale 334,21 USD por acción.`,
    por_que: `Porque las cifras de los próximos tres años no están en disputa (nuestra proyección difiere menos de un 3 % del consenso) y aun así el precio solo cuadra con un crecimiento que la cartera no muestra. Los analistas lo reflejan con 11 recomendaciones de mantener de 14 y un objetivo medio por debajo del precio [D7].`,
  },
  a_favor: [
    '**Margen líder del sector**: 23,1 % operativo en el 3T26 frente al 5,4-14,0 % de sus grandes rivales [A18, B1].',
    '**Contratación récord**: 873,4 M USD en el 3T26, book-to-bill de 1,22 [A18].',
    '**Balance sin deuda**: 705,3 M USD de caja y recompras autorizadas de hasta 1.000 M USD [A18, A19].',
    '**Dirección que cumple**: guía de BPA subida dos veces en 2026 y superada todos los años desde 2020 [C13-C19, C22].',
    '**Crece sin capital**: anticipos de 961,9 M USD y capex en torno al 1,5-2 % de las ventas [A18].',
  ],
  en_contra: [
    '**Precio exigente**: descuenta un 17,4 % de crecimiento anual hasta 2035, frente al 7,3 % del caso base.',
    '**Múltiplo doble que el de las CRO**: 27,2 veces el EBITDA de los próximos 12 meses frente a 13,9 veces de mediana [P1].',
    '**Guía de ingresos sin cambios**: implica un 4T26 casi plano (+0,9 %) [A18].',
    '**Cartera que crece poco**: +5,6 % interanual a septiembre [A18].',
    '**Fundador que vende y sin sucesor**: President interino desde mayo [C8, C5].',
    '**En máximos**: +25 % en tres meses, a un 2 % del precio de venta de la regla [D1].',
  ],
  que_vigilar: `La tesis de valor depende de que el crecimiento se modere al 7-9 % anual a partir de 2027, como indican la cartera (+5,6 %) y el consenso [A18, D7]. La señal de que no se cumple sería una contratación sostenida muy por encima de los ingresos: un book-to-bill por encima de 1,2 dos trimestres más y una cartera creciendo a doble dígito, con una guía de 2027 por encima del 12 %. A 12 meses, lo que mueve la señal es el precio: por encima de 675,88 USD pasaría a Vender.`,
  cambiaria_recomendacion: [
    'Si la cotización sube por encima de 675,88 USD, pasaríamos a Vender; por debajo de 342,09 USD, a Comprar.',
    'Si el book-to-bill supera 1,2 dos trimestres más y la cartera crece más de un 12 % interanual, revisaríamos el caso base al alza.',
    'Si la guía de 2027 (febrero) prevé más de un 12 % de crecimiento de ingresos, revisaríamos el crecimiento de 2027-2030.',
    'Si el Tesoro a 10 años baja del 4 %, el coste de capital caería en torno a 1,1 puntos y revisaríamos el valor.',
  ],
  kpis_seguimiento: [
    { kpi: 'Book-to-bill neto trimestral', nivel_actual: '1,22x (3T26); 1,13x (2T26); 0,88x (1T26)', umbral_alerta: '> 1,2x dos trimestres más (contra la tesis de valor) o < 1,0x', por_que: 'Anticipa los ingresos de 12-24 meses [A18].' },
    { kpi: 'Cartera, crecimiento interanual', nivel_actual: '+5,6 % (sep-26)', umbral_alerta: '> 12 %', por_que: 'Un crecimiento de doble dígito contradiría la desaceleración del caso base [A18].' },
    { kpi: 'Gastos reembolsados sobre ingresos', nivel_actual: '40,1 % (3T26)', umbral_alerta: '> 45 %', por_que: 'Inflan el crecimiento y diluyen el margen total [A18].' },
    { kpi: 'Margen EBITDA sobre ingresos totales', nivel_actual: '24,0 % (3T26)', umbral_alerta: '< 21 % o > 25 %', por_que: 'Mide la utilización del personal y el poder de precios [A18].' },
    { kpi: 'Anticipos de clientes', nivel_actual: '961,9 M USD (sep-26)', umbral_alerta: '< 30 % de los ingresos LTM', por_que: 'Su caída consume caja y señala menos contratos nuevos [A18].' },
    { kpi: 'Precio frente a la regla a 12 meses', nivel_actual: '662,48 USD', umbral_alerta: '> 675,88 (Vender) o < 342,09 (Comprar)', por_que: 'Límites de la señal.' },
  ],
  confianza: 'Media',
};

export const just12m = {
  Bajista: 'BPA de 2028e con el perfil bajista del informe (2027e −5 % de ingresos y −3 puntos de margen; después −3 y −2 puntos): 16,21 USD. Múltiplo con la regla común v3.',
  Base: 'BPA de 2028e del caso base (ingresos de 3.332 M, margen EBITDA del 22,4 %, 22,9 M de intereses, 20 % de impuestos y 28,40 M de acciones): 20,54 USD. Múltiplo con la regla común v3.',
  Alcista: 'BPA de 2028e con +4 puntos de crecimiento y +1,5 de margen sobre el base desde 2027e: 23,56 USD. Múltiplo con la regla común v3.',
};

export const diferencia_consenso = 'Nuestro BPA base de 2028e (20,54 USD) queda un 4,3 % por debajo del consenso (21,47), que aún no recoge la guía del 3T26; la diferencia sale de que no contamos recompras sin calendario. Nuestro precio base a 12 meses (661,39) está un 11,0 % por encima del objetivo medio de los analistas (595,92) porque usamos un PER más alto, el de la historia de Medpace [D7].';

export const objetivo12m_comentario = 'Valor intrínseco 342,09 USD (−48,4 %) frente a un objetivo a 12 meses ponderado de 608,29 USD (−8,2 %; base −0,2 %). La distancia pasa del 25 %: la tesis del valor intrínseco es a más de un año y depende de que el mercado deje de pagar más de 30 veces el beneficio.';

export const parches = [
  { ruta: 'bolsa.contexto.veredicto', valor: 'no cambia' },
  { ruta: 'bolsa.contexto.condicion', valor: null },
  { ruta: 'bolsa.contexto.noticias.0.veredicto', valor: 'no cambia' },
  { ruta: 'bolsa.contexto.noticias.0.condicion', valor: null },
];

export const huecos = [];
