// Textos de juicio del orquestador (S&P Global, corte 2026-10-12)
export default {
  meta: {
    fecha_corte: '2026-10-12', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1.0, unidades: 'millones', cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin',
    normas_contables: 'US GAAP', formato_cuenta: 'funcion',
    limitaciones: 'Precio de cierre del viernes 9-oct-2026: el lunes 12-oct, fecha de corte, la sesión de Nueva York no había cerrado. El análisis es de S&P Global sin Mobility, escindida el 1-jul-2026 como Mobility Global (NYSE: MBGL) [A9]. La cuenta de 2023-2025 es el pro forma del artículo 11 sin Mobility que publicó la empresa [A1]; la de 2019-2022 es la publicada (2022 incluye IHS Markit desde el 28-feb-2022 y Mobility). El balance y los flujos de 2022-2025 son los publicados, con Mobility, porque no hay balances anuales pro forma; por eso el ROIC y los ratios de balance de esos años no son del todo comparables con la cuenta. Los segmentos vigentes (cuatro divisiones) solo están reexpresados para 2025 [A2]. El puente de valor es a 30-jun-2026 sin la deuda que se llevó Mobility; la caja de Mobility a esa fecha se estima con el pro forma a 31-mar-2026 [D4]. Los precios de cierre de los ejercicios anteriores a 2026 incluyen el valor de Mobility, de modo que los múltiplos históricos quedan algo inflados frente a los actuales. El consenso (MarketScreener) ya excluye Mobility [D7].',
    controles_explicados: [
      { control: 'Crecimiento a perpetuidad', explicacion: 'El 3,5 % es nominal en USD con el bono a 10 años al 5,24 %: queda entre la inflación esperada (≈ 2,5 %) y la tasa libre menos medio punto (4,7 %), que es la regla del prompt. Un negocio con foso amplio y precios indexados a la inflación sostiene un crecimiento nominal así; con el 3,0 % el DCF bajaría a 306,24 USD y la recomendación no cambia.' },
      { control: 'Regresión múltiplo-crecimiento', explicacion: 'Con nueve comparables de modelos distintos (bolsas, datos, calificaciones), el crecimiento no explica los múltiplos (R² 0,15): no usamos el valor de la regresión, solo las medianas.' },
    ],
  },

  identificacion: { fundacion: "1888", web: "www.spglobal.com" },

  financieros: {
    ajustes: 'Usamos cifras publicadas (GAAP) y, para 2023-2025, 1T26 y 2T26, el pro forma GAAP del artículo 11 sin Mobility; no usamos las ajustadas de la empresa, que excluyen además unos 800 M anuales de amortización de intangibles de adquisiciones [A2]. Como partidas no recurrentes dentro del EBITDA solo tratamos las ganancias o pérdidas por ventas de negocios (2019 −49 M, 2020 −16 M, 2021 −11 M, 2022 −1.898 M, 2023 +70 M, 2024 −59 M, 2025 −273 M y −456 M en los últimos doce meses), los costes de la fusión con IHS Markit (24 M en 2020, 249 M en 2021, 619 M en 2022, 236 M en 2023 y 133 M en 2024), la donación de 200 M a la S&P Global Foundation en 2022 y los deterioros de arrendamientos y tecnología de 2020 (132 M) [A4, A5]. Las indemnizaciones por despido (157-289 M al año) se repiten todos los años y quedan dentro del EBITDA. Los costes de fusión de 2023-2024 son los publicados con Mobility, que no se desglosa. La participación del 50 % en OSTTRA, vendida en el 4T25, se trata como participada fuera del EBITDA [A4]. Ojo: hay ganancias por ventas casi todos los años y la guía GAAP de 2026 incluye unos 1,20 USD por acción de esas ganancias [A3].',
  },

  rentabilidad: {
    comentario: 'El ROIC contable se hundió con la fusión de IHS Markit: del 107,4 % de 2021 (capital invertido de 3.254 M) al 6,4 % de 2023, porque la compra se pagó en acciones a 43.536 M y casi todo quedó como fondo de comercio e intangibles [A5]. Desde entonces se recupera (8,6 % en 2024 y 9,5 % en 2025) con el beneficio, no con la rotación, que sigue en 0,22 veces. Con un WACC del 10,38 % el grupo aún no cubre su coste de capital sobre el precio pagado, aunque el negocio orgánico, con un capex del 1,4 % de las ventas y un circulante negativo, rinde muy por encima: la reinversión que necesita es casi nula. El ROIC incremental de 2019-2025 es del 4,6 %, lastrado por la fusión. Frente a los competidores, S&P queda lejos de Moody\'s (32 %) y MSCI (39,9 %), que no hicieron una compra de ese tamaño, y al nivel de ICE (8,6 %), que sí la hizo con Black Knight [D14, D15, D16]. El capital invertido de 2022-2025 incluye Mobility, que se fue con unos 1.981 M de deuda [A7].',
    confianza: 'Media',
  },

  dcf: {
    justificacion: {
      crecimiento: '2026e (+7,5 %) queda fijo: con dos trimestres publicados (+10,7 % y +10,9 % pro forma) y una guía de +5,9-7,9 %, el segundo semestre solo necesita crecer en torno al 4,5 % pese a la emisión floja del 3T [A3, E8]. Para 2027-2030 proyectamos 7,0-7,5 %, en línea con el consenso (+0,4 % en 2027 y +0,3 % en 2028 frente a MarketScreener) y con el 7-8 % orgánico que la empresa logró de media fuera de 2022 [D7, A6]. Desde 2031 baja medio punto al año hasta el 4,5 % de 2035, porque Ratings depende del ciclo de crédito y Market Intelligence crece al 5,5-7 % [A3]. El crecimiento medio de la proyección es del 6,4 %, por debajo del 7,4 % anual del mercado de datos financieros en 2019-2025 [B6, B7].',
      margenes: 'El margen EBITDA pasa del 51,5 % de 2026e al 55,0 % en 2033e. Partimos del 51,1 % de los últimos doce meses sin no recurrentes y la guía de +35-60 pb de margen ajustado en 2026 (+75-100 pb sin OSTTRA) [A3]. La empresa ha subido el margen operativo ajustado del 52,3 % al 54,3 % en un año [A3]; el plan es ganar 50-100 pb anuales, y Ratings (65 %) e Indices (70 %) tienen márgenes muy superiores a Energy (46 %) y MI (33 %) [A2]. El 55 % final queda por debajo de MSCI (60,8 %) y CME (71 %) y por encima de Moody\'s (51,1 %) [D14, D15, D17]. Coincide con el consenso de 2027-2028 una vez restado el 1,1 % de las ventas que el consenso deja fuera.',
      inversion: 'El capex sube del 1,4 % de las ventas (guía de 190-210 M en 2026) al 2,0 % [A3]. La amortización baja del 6,0 % al 2,0 %: hoy es sobre todo la de intangibles de IHS Markit (≈ 785 M en 2026), que se agota, y al final converge al capex, como pide el estado estacionario [A3]. El circulante se queda en el −10 % de las ventas (media de −9,3 a −11,0 % en 2019-2025): los clientes pagan las suscripciones por adelantado. No metemos compras en la proyección: la guía orgánica ya da el 6-8 % y las compras pequeñas (With Intelligence, 1.800 M) se financian aparte [D34].',
      wacc: 'Tasa libre: el bono del Tesoro a 10 años al 5,24 % del 9-oct-2026 [D11]. Beta ajustada de 1,05 (1,07 mensual a cinco años frente al SPY) [D1]. Prima de mercado del 5,5 %, el centro del rango del método; la prima implícita de Damodaran de octubre de 2026 (4,20 %) se usa en la regla relativa [D12]. Sin prima adicional: vende en todo el mundo, pero cotiza y factura sobre todo en USD. Coste de la deuda del 5,9 % antes de impuestos, el de una emisión nueva a diez años con su calificación de grado de inversión (los cupones vivos rondan el 2,4 %) [A7]. Peso de la deuda del 9,9 % a valor de mercado. Resultado: coste del capital del 11,02 % y WACC del 10,38 %.',
      terminal: 'Gordon con un 3,5 % nominal en USD: inflación esperada de ≈ 2,5 % más un punto real, por debajo de la tasa libre menos medio punto (4,7 %). Los ingresos de calificaciones, índices y suscripciones están indexados al volumen nominal de deuda, de activos y de precios, y el foso es amplio. El valor terminal pesa el 56 % del valor empresa y supone 11,4 veces el EBITDA de salida, por debajo de la mediana actual de los comparables (15,3 veces) y de las transacciones, de modo que la salida es prudente.',
    },
    sostenibilidad: {
      puente_ingresos: [
        { periodo: '2026e', volumen_pct: 3.0, precio_pct: 3.5, otros_pct: 1.0, comentario: 'Guía de +6-8 % orgánico: Ratings +5-8 % por emisión facturada, Indices +12-14 % por patrimonio en ETF, MI +5,5-7 % y Energy +4,5-6 % con subidas de tarifa de 3-4 % [A3]. «Otros», la compra de With Intelligence (cerrada a finales de 2025) [D34].' },
        { periodo: '2027e', volumen_pct: 3.5, precio_pct: 3.5, otros_pct: 0.0, comentario: 'Volumen: más emisión por el muro de vencimientos de 2027-2029 y la deuda de los hiperescaladores; precio: subidas anuales de suscripciones y tarifas de calificación [A10].' },
        { periodo: '2028e', volumen_pct: 4.0, precio_pct: 3.5, otros_pct: 0.0, comentario: 'Crecen los activos indexados (5,48 billones USD en ETF ligados a S&P en 2025, +25 %) y los productos de IA de Kensho [A3, A10].' },
        { periodo: '2029e', volumen_pct: 4.0, precio_pct: 3.5, otros_pct: 0.0, comentario: 'Mismo ritmo que el mercado de datos financieros (7,4 % anual en 2019-2025) [B6].' },
        { periodo: '2030e', volumen_pct: 3.5, precio_pct: 3.5, otros_pct: 0.0, comentario: 'Empieza a moderarse el volumen; el precio se apoya en contratos plurianuales con subidas pactadas.' },
      ],
      justificacion: 'Sí. El crecimiento medio del 6,4 % no pide capital: la reinversión neta acumulada es negativa (−5.054 M), porque el capex es del 1,7 % de las ventas y el circulante es negativo. La prueba es el poder de precios y la cuota, y las dos se sostienen. S&P tiene el 49,6 % de las calificaciones vigentes y las tres grandes suman el 92,4 % de los ingresos del sector, sin perder cuota en años [B4]. Sube tarifas por encima de la inflación (la mitad del crecimiento proyectado es precio) y los ingresos han crecido en todos los años salvo 2022, el del frenazo de emisiones. La proyección (6,4 %) queda por debajo del 7,4 % anual del mercado de datos en 2019-2025 [B6]. El riesgo no es de capacidad sino de ciclo y de IA en Market Intelligence.',
    },
    lectura: 'El DCF da 321,80 USD por acción, un 21,1 % por debajo del precio de 407,82 USD, con un WACC del 10,38 % y un valor terminal que pesa el 56 %. La diferencia no está en las cuentas: nuestra proyección coincide con el consenso de 2027-2028 casi al céntimo. Está en la tasa de descuento. El DCF inverso dice que, a 407,82 USD, el precio descuenta un crecimiento anual del 9,2 % en 2027-2035 frente al 6,3 % de nuestro caso base, o un margen EBITDA del 67,2 % en vez del 55 %; dicho de otro modo, el precio rinde un 9,1 % anual con nuestros flujos. Eso queda por debajo de nuestro coste de capital (10,38 %) y apenas por debajo del que pide hoy el mercado a una acción de beta 1,05 (9,15 % con la prima implícita del 4,20 %). Con la prima del mercado el DCF sube a 405,64 USD, el precio de hoy. Es exigente frente a la historia de crecimiento (7-8 % orgánico), aunque el múltiplo esté en mínimos de siete años: el bono al 5,24 % explica más la caída del múltiplo que cualquier deterioro del negocio.',
  },

  escenarios: {
    casos: [
      { escenario: 'Bajista', narrativa: 'Un frenazo de emisiones como el de 2022, cuando los ingresos de Ratings cayeron con fuerza al subir los tipos, se repite en 2027: crecimiento 9 puntos menor y margen 3,5 puntos más bajo ese año. Además, la IA generativa abarata la búsqueda de datos y Market Intelligence crece por debajo del 4 %, con un crecimiento medio del 3 % y un WACC medio punto más alto.' },
      { escenario: 'Base', narrativa: 'Se cumple la guía de 2026, Ratings acompaña al muro de vencimientos de 2027-2029, Indices crece con los activos indexados y el margen sube 50 pb al año hasta el 55 %, en línea con el consenso.' },
      { escenario: 'Alcista', narrativa: 'La IA se convierte en una fuente de ingresos (API de Kensho, datos para modelos de lenguaje) y el crédito privado añade una línea nueva a Ratings: el crecimiento sube 1,5 puntos, el margen 1,5 puntos y el mercado paga menos riesgo (WACC −0,5 puntos, terminal del 3,75 %).' },
    ],
    comentario: 'Con nuestro coste de capital, la asimetría es desfavorable: el alcista vale 422,42 USD (+3,6 %) y el bajista 211,29 USD (−48,2 %). Ni el escenario bueno da un recorrido apreciable desde 407,82 USD. Con la prima implícita del mercado (4,20 %) el cuadro mejora: alcista de 546,85 USD, bajista de 260,63 USD y asimetría de 0,94 veces. Es decir, el precio ya descuenta un caso entre el base y el alcista. El bajista es verosímil: en 2022 el grupo creció a pulso solo por la fusión y su BPA ajustado quedó un 16 % por debajo de la guía inicial [C21, C22]. No compensa comprar a este precio.',
  },

  suma_partes: {
    partes: [
      { segmento: 'Ratings', justificacion: 'Moody\'s cotiza a 20,7 veces el EBITDA de los últimos doce meses y 18,4 el de los próximos [D14]; Ratings tiene un margen mayor (65 %) y una cuota del 49,6 %, pero es más cíclico que Moody\'s Analytics, de ahí 22 veces el beneficio operativo ajustado.' },
      { segmento: 'Indices', justificacion: 'MSCI cotiza a 23,2 veces el EBITDA de los últimos doce meses [D15]; S&P DJI tiene un margen del 70 % y comisiones ligadas a activos, de ahí 24 veces.' },
      { segmento: 'Energy', justificacion: 'Platts es un índice de referencia de precios y CERA, datos de suscripción: 18 veces, entre Verisk (15,3) y las bolsas con datos (ICE 15,3, CME 20,5) [D16, D17, D21].' },
      { segmento: 'Market Intelligence', justificacion: 'Datos y plataformas como FactSet (13,0 veces), Thomson Reuters (15,3) y LSEG (10,8) [D19, D20, D22]: 15 veces.' },
      { segmento: 'Corporativo y eliminaciones', justificacion: 'Costes centrales no asignados (−110 M) al múltiplo medio de los negocios (19,5 veces), como pide la lección de CSL.' },
    ],
    comentario: 'La suma de partes da 417,40 USD por acción (+2,3 %), con 140.848 M de valor empresa: Ratings aporta casi la mitad. Usa el beneficio operativo ajustado de 2025 reexpresado, que excluye la amortización de adquisiciones y por eso compara con múltiplos de EBITDA [A2]. Restamos los minoritarios a valor de mercado (el 27 % de CME en S&P DJI y los de Crisil), 8.900 M [D4]. Es el método que mejor recoge que Indices y Ratings valen más que Market Intelligence. Sin descuento de conglomerado: la escisión de Mobility y el rumor sobre Capital IQ Pro muestran que la dirección está dispuesta a separar negocios [E6].',
  },

  comparables: {
    comentario: 'S&P Global cotiza a 18,9 veces el EBITDA de los últimos doce meses y 17,1 veces el de los próximos, frente a una mediana de 15,3 y 14,2 veces de los nueve comparables, y a 23,4 veces el beneficio de los próximos doce meses, en línea con la mediana (23,7). La prima en EV/EBITDA se explica por la mezcla: Ratings e Indices valen como Moody\'s (18,4 veces) y MSCI (20,3 veces), y Market Intelligence como FactSet (11,4 veces). El crecimiento no explica los múltiplos de este grupo (R² 0,15), de modo que no usamos la regresión. Usamos la mediana de EV/EBITDA y de PER de los próximos doce meses, que dan 370,37 USD de media. El PER (413,03 USD a la mediana) sale más alto que el EV/EBITDA (327,71 USD) porque los minoritarios a mercado y la deuda pesan en el valor empresa, no en el beneficio por acción.',
  },

  multiplos_historicos: {
    comentario: 'El EV/EBITDA de los últimos doce meses (18,9 veces) está un 24 % por debajo de la mediana de 2019-2025 (24,9 veces) y por debajo del mínimo de la serie (20,8 veces), y el PER (25,8 veces) un 32 % por debajo. Dos cosas lo explican. La primera, el tipo a 10 años, hoy en el 5,24 % [D11], muy por encima del de 2019-2021, y el múltiplo de un negocio de crecimiento constante es muy sensible a él. La segunda, el miedo a la IA en datos: la acción cae un 16,9 % en el año, con caídas del 11,3 % y el 9,7 % en dos días de febrero [D1]. Los precios anteriores a 2026 incluyen Mobility, lo que infla algo la historia. No vemos un cambio estructural en la calidad del negocio, pero tampoco una anomalía: el múltiplo de 2019-2021 se pagó con tipos casi nulos.',
  },

  transacciones: {
    comentario: 'Las cinco operaciones con múltiplo dan una mediana de 399,79 USD por acción, con un rango de 264,02 a 576,48 USD: es valor de control. La propia fusión con IHS Markit se cerró a 24,0 veces el EBITDA y Adenza a 30,7 veces, con tipos más bajos; MarketAxess (13,0 veces, 2026) y Refinitiv (13,1 veces) marcan el suelo [D35, D37, D38, D32]. Con 120.266 M de capitalización y sin accionista de control, S&P Global no es objetivo de compra realista: por eso pesan solo un 5 %. Sirven para ver que el mercado privado paga por los activos de datos más que la bolsa hoy, y que una escisión de Capital IQ Pro podría cristalizar valor [E6].',
  },

  valoracion: {
    comentario: 'Pesamos el DCF un 35 % y los escenarios un 20 % porque son los que recogen el coste del capital, que es lo que hoy decide. Los comparables (25 %) y la suma de partes (15 %) recogen lo que paga el mercado por cada negocio. Las transacciones, un 5 %, porque llevan prima de control. La dispersión es grande: de 319,33 USD (escenarios) a 417,40 USD (suma de partes). Los métodos de mercado quedan cerca del precio y los de flujos, un 21 % por debajo, que es la misma lectura del DCF inverso: el mercado valora S&P Global con una rentabilidad exigida del 9,1 %, por debajo de nuestro 10,38 %. El valor objetivo es de 351,69 USD (−13,8 %); con la prima implícita del mercado, de 398,10 USD (−2,4 %). Restamos los minoritarios a valor de mercado (8.900 M, frente a 5.139 M contables, unos 12,8 USD por acción) [D4]. La caja de Mobility a 30-jun se estima.',
  },

  catalizadores: {
    items: [
      { fecha: '27-oct-2026', evento: 'Resultados del 3T26, los primeros sin Mobility', efecto: 'Prueba de la emisión floja del trimestre en Ratings y del crecimiento de MI; posible anuncio de una recompra acelerada (ASR) para llegar a los más de 7.000 M del año [D6, A3].', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '4T26', evento: 'Recompras del segundo semestre (≈ 5.500 M pendientes)', efecto: 'Retiran cerca del 4,6 % del capital a 407,82 USD, financiadas con la distribución de Mobility y unos 2.000 M de deuda nueva [A10].', probabilidad: 'Alta', sentido: '+' },
      { fecha: 'Feb-2027', evento: 'Resultados de 2026 y guía de 2027', efecto: 'Primera guía anual completa sin Mobility; el consenso espera +5,5 % de ingresos en 2027 [D7].', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2027', evento: 'Muro de vencimientos de deuda corporativa y emisiones de los hiperescaladores', efecto: 'Más emisión facturada en Ratings (250.000-300.000 M USD de deuda de hiperescaladores previstos en 2026) [A10].', probabilidad: 'Media', sentido: '+' },
      { fecha: '12-18 meses', evento: 'Posible escisión o venta de Capital IQ Pro (informaciones de prensa del 1-sep-2026, sin confirmar)', efecto: 'Cristalizaría el valor de Market Intelligence y dejaría un grupo de referencias con más margen [E6].', probabilidad: 'Baja', sentido: '+' },
      { fecha: '31-dic-2026', evento: 'Relevo del jefe de los servicios jurídicos y sucesor en Market Intelligence', efecto: 'Dos puestos clave por cubrir en plena reorganización de MI [C13, C14].', probabilidad: 'Alta', sentido: '+/−' },
    ],
    confianza: 'Media',
  },

  riesgos: {
    items: [
      { riesgo: 'Frenazo de emisiones de deuda (Ratings, 34 % de los ingresos y 43 % del beneficio)', tipo: 'Cíclico', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−34 % (escenario bajista, 211,29 USD, frente al base)', mitigante: 'El 78 % de los ingresos del grupo no depende de la emisión; la parte no transaccional de Ratings (vigilancia) es recurrente [B3].', senal: 'Ingresos por transacción de Ratings por debajo del −10 % interanual en un trimestre.' },
      { riesgo: 'IA generativa que abarata los datos y las plataformas de Market Intelligence', tipo: 'Tecnológico y competitivo', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−10 % a −15 % (MI al múltiplo de LSEG, 10,8 veces, en vez de 15)', mitigante: 'Datos propietarios (Capital IQ, Visible Alpha) y venta por API a los propios modelos: el volumen de llamadas se multiplicó por cinco en el 2T26 [A10].', senal: 'Suscripciones de MI por debajo del +4 % o caída de la retención.' },
      { riesgo: 'Tipos de interés altos de forma persistente', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−8 % por cada medio punto más de WACC (tabla de sensibilidad)', mitigante: 'Sube los precios con la inflación; poca deuda (1,3 veces el EBITDA).', senal: 'Bono a 10 años por encima del 5,5 %.' },
      { riesgo: 'Apalancamiento para recompras por encima del objetivo', tipo: 'Financiero', probabilidad: 'Alta', impacto: 'Bajo', efecto_valor: '−2 % (más gasto financiero)', mitigante: 'Objetivo de volver a 2,0-2,5 veces a finales de 2027 [A10].', senal: 'Deuda bruta sobre EBITDA por encima de 3 veces.' },
      { riesgo: 'Regulación y litigios de las agencias de calificación (SEC, ESMA, demandas colectivas)', tipo: 'Regulatorio', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−3 % a −5 %', mitigante: 'Historial: el acuerdo de 1.375 M de 2015 se pagó sin dañar el negocio [B10].', senal: 'Nuevas investigaciones de la SEC o del Departamento de Justicia.' },
      { riesgo: 'Pérdida de licencias o de cuota en índices (renovaciones con Cboe y CME)', tipo: 'Comercial', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−5 %', mitigante: 'Cboe amplió 25 años su licencia exclusiva sobre el S&P 500 en sep-2026 [E8, E9].', senal: 'Caída de cuota de los ETF ligados a índices S&P en las entradas.' },
      { riesgo: 'Ejecución tras la escisión: reorganización de MI sin responsable y costes varados', tipo: 'Ejecución', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−2 %', mitigante: 'Contrato de servicios transitorios cobrado a Mobility Global hasta 18 meses [A9].', senal: 'Margen de MI por debajo del 33 % o costes no asignados por encima de 215 M.' },
    ],
    premortem: 'Es octubre de 2029 y la acción vale un 40 % menos. Lo que pasó: en 2027 el bono a 10 años siguió por encima del 5 % y los diferenciales se abrieron con la primera recesión desde 2020. La emisión de deuda corporativa cayó un 25 % y los ingresos transaccionales de Ratings, que habían crecido un 25 % en el 2T26, cayeron en la misma proporción, como en 2022. Al mismo tiempo, los grandes bancos y gestoras sustituyeron parte de sus licencias de Capital IQ por asistentes de IA que leen directamente los documentos de EDGAR, y Market Intelligence pasó a crecer un 2 %. El margen no subió: la dirección había financiado más de 7.000 M de recompras con deuda en 2026 y el apalancamiento de 2,8 veces le quitó margen para comprar barato. El mercado dejó de pagar 18,9 veces el EBITDA por un grupo que crecía al 3 % y el múltiplo bajó a 13-14 veces, como FactSet o LSEG. Los indicadores que lo habrían anticipado: la emisión facturada de Ratings en negativo dos trimestres seguidos, las suscripciones de MI por debajo del +4 % y una guía de 2027 por debajo del 5 %.',
    confianza: 'Media',
  },

  preguntas: {
    items: [
      { tema: 'Recompras', pregunta: '¿Cómo se ejecutarán los ≈ 5.500 M pendientes del año y a qué apalancamiento se quiere llegar en 2027?', por_que: 'Retiran cerca del 4,6 % del capital y dejan la deuda en 2,7-2,8 veces, por encima del objetivo [A10].' },
      { tema: 'IA en Market Intelligence', pregunta: '¿Cuántos ingresos generan ya las API para modelos de lenguaje y qué parte de las suscripciones de MI está en riesgo de sustitución?', por_que: 'Es el principal temor del mercado y la dirección no lo cuantificó en la conferencia del 2T26 [A10, E8].' },
      { tema: 'Capital IQ Pro', pregunta: '¿Se estudia separar o vender Capital IQ Pro?', por_que: 'Cristalizaría el valor de MI; hoy solo hay informaciones de prensa sin confirmar [E6].' },
      { tema: 'Ratings', pregunta: '¿Qué emisión facturada se espera en el 3T26 y en 2027, y cuánto pesa ya el crédito privado?', por_que: 'Ratings aporta el 43 % del beneficio y la emisión del 3T fue floja [E8].' },
      { tema: 'Minoritarios en Indices', pregunta: '¿Hay planes de comprar el 27 % de CME en S&P DJI y a qué precio de referencia?', por_que: 'Valorado a mercado son unos 12,8 USD por acción más de deuda que a valor contable [D4].' },
      { tema: 'Ganancias por ventas', pregunta: '¿Qué ventas de negocios explican los 1,20 USD por acción de ganancias incluidos en la guía GAAP de 2026?', por_que: 'Hay ganancias por ventas casi todos los años y el BPA GAAP las incluye [A3].' },
      { tema: 'Remuneración', pregunta: '¿Por qué las PSU dependen solo del BPA ajustado, sin ROIC ni TSR?', por_que: 'Premian recompras y compras más que el rendimiento del capital; el voto en contra llegó al 31 % en 2025 [C1, C3].' },
    ],
    confianza: 'Media',
  },

  resumen: {
    recomendacion: 'Mantener', conviccion: 'Baja', justificacion_recomendacion: null, horizonte: '12 meses',
    sintesis: `**La recomendación y por qué.** Mantener, con convicción baja. El valor objetivo es de 351,69 USD frente a un precio de 407,82 USD (cierre del 9-oct-2026), un −13,8 %; con el dividendo, la rentabilidad total esperada a 12 meses es del −12,8 %. Con la prima de riesgo que hoy pide el mercado (4,20 %), el objetivo sube a 398,10 USD y la rentabilidad total a −1,4 %. Manda esa regla relativa, que da Mantener; la absoluta, con nuestro WACC del 10,38 %, da Vender. La convicción es baja precisamente porque las dos reglas discrepan y porque nuestras cifras coinciden con el consenso: lo que nos separa del precio es la tasa de descuento, no el negocio. La subiría un bono a 10 años por debajo del 4,5 % o un precio por debajo de 338,33 USD.

**El negocio.** S&P Global, ya sin Mobility (escindida el 1-jul-2026) [A9], es un grupo de referencias de mercado con foso amplio: el 49,6 % de las calificaciones vigentes de las agencias registradas en la SEC [B4], los índices S&P 500 y Dow Jones (margen del 70 %), Platts en energía y los datos de Market Intelligence [A2]. Ratings e Indices aportan el 61 % del beneficio operativo ajustado; el margen EBITDA es del 51,1 % y el capex, del 1,4 % de las ventas. El ROIC contable (9,5 %) aún no cubre el WACC por el fondo de comercio de IHS Markit, pagado en acciones. La calidad sí sostiene el crecimiento que proyectamos (veredicto «Sí»): el 6,4 % medio no pide capital y la mitad sale de subidas de precio que el foso permite.

**Finanzas.** Los ingresos sin Mobility crecieron un 10,9 % en el 2T26 y el BPA ajustado un 23 % [A3]. La guía de 2026 es de +5,9-7,9 % de ingresos y más de 7.000 M de recompras, que llevarán el apalancamiento bruto a 2,7-2,8 veces, por encima del objetivo [A10]. La deuda neta ajustada es de 9.470 M (1,3 veces el EBITDA).

**Equipo y gobierno.** Suma, con matices: presidente independiente, 90 % de consejeros independientes, compras en mercado de la consejera delegada y de dos consejeros en 2026 y guía cumplida o superada cada año salvo 2022 [C1, C5]. Restan las PSU ligadas solo al BPA ajustado, el 31 % de voto en contra de la remuneración en 2025 y un auditor con 57 años en el cargo [C3].

**Valoración.** El DCF da 321,80 USD y el DCF inverso dice que el precio descuenta un crecimiento anual del 9,2 % en 2027-2035 frente al 6,3 % de nuestro caso base: rinde un 9,1 % anual con nuestros flujos, por debajo de nuestro coste de capital y casi en el que pide el mercado (9,15 %). Comparables (370,37 USD) y suma de partes (417,40 USD) quedan más cerca del precio. Cotiza a 18,9 veces el EBITDA, un 24 % por debajo de su mediana de 2019-2025, pero con el bono al 5,24 % [D11], muy por encima del de entonces. Los analistas (23 de 24 compran, objetivo medio de 516,86 USD) descuentan a una tasa menor [D8].

**Riesgos y catalizadores.** El mayor riesgo es un frenazo de emisiones como el de 2022: el bajista vale 211,29 USD (−48,2 %). El segundo, la IA en Market Intelligence, el tema que domina los foros, donde el tono está dividido y mejora tras la caída del año [E2, E5]. Los resultados del 27-oct-2026 dirán si la emisión floja del 3T pesa en Ratings y si llega una recompra acelerada [D6].

**Qué cambiaría la decisión.** Compraríamos por debajo de 338,33 USD y venderíamos por encima de 446,65 USD. Pasaríamos a Vender si los ingresos por transacción de Ratings caen más de un 10 % interanual, y a Comprar si el bono baja del 4,5 % con una guía de 2027 por encima del 7 %.`,
    tesis: 'S&P Global es, tras escindir Mobility el 1-jul-2026, un grupo de cuatro negocios de referencia: calificaciones de crédito con el 49,6 % de las vigentes [B4], los índices S&P 500 y Dow Jones, los precios de referencia de Platts y los datos de Market Intelligence [A2]. Gana con márgenes EBITDA del 51,1 %, capex del 1,4 % de las ventas y circulante negativo; sus ingresos crecieron cada año salvo 2022, y la guía de 2026 es de +5,9-7,9 % [A3].\n\nEl precio de 407,82 USD descuenta, según el DCF inverso, un crecimiento anual del 9,2 % durante nueve años, frente al 6,3 % de nuestro caso base y al consenso, con el que coincidimos. Es decir, el mercado acepta una rentabilidad del 9,1 % anual por tener la acción. Los múltiplos (18,9 veces el EBITDA de los últimos doce meses) están en mínimos de siete años, pero el bono a 10 años está en el 5,24 % [D11], muy por encima del de 2019-2021.\n\nEl mercado acierta en la calidad y quizá se equivoca en el precio del riesgo: con nuestro coste de capital (10,38 %) la acción vale 321,80 USD; con la prima implícita del mercado, 405,64 USD. Para invertir hay que creer que el foso justifica una rentabilidad exigida por debajo de la del mercado o que el crecimiento volverá al 9 %: ni una cosa ni otra está en las cifras de hoy. Por eso es un Mantener, no un Comprar.',
    vision_diferencial: {
      mercado_descuenta: 'Un crecimiento del 9,2 % anual en 2027-2035, o una rentabilidad exigida del 9,1 %, para un negocio que los analistas recomiendan casi por unanimidad (23 de 24 comprar, precio objetivo de 516,86 USD) [D8]. El mercado ya castigó el miedo a la IA y al ciclo de emisión con una caída del 16,9 % en el año, y ve el múltiplo en mínimos de siete años como una oportunidad [D1, E5].',
      nuestra_vision: 'Compartimos las cifras del consenso (diferencias de −1,1 % a +0,4 % en ingresos de 2026-2028), pero no su precio objetivo: con un bono al 5,24 %, un negocio que crece al 6-7 % no vale más de 18-19 veces el EBITDA salvo que se acepte una prima de riesgo inferior a la del mercado. El múltiplo bajo es el precio de los tipos, no una anomalía.',
      por_que: 'El DCF inverso lo muestra: el precio exige un 9,2 % de crecimiento, casi tres puntos más que la guía. Los analistas trabajan con costes de capital del 8-9 %; con la prima de Damodaran del 4,20 % llegamos al mismo valor que el precio (405,64 USD), lo que confirma que la diferencia es de tasa, no de negocio. Si los tipos bajan, tendrán razón ellos.',
    },
    a_favor: [
      '**Foso amplio en calificaciones**: el 49,6 % de las vigentes y las tres grandes con el 92,4 % de los ingresos del sector [B4].',
      '**Crecimiento sin capital**: capex del 1,4 % de las ventas y circulante del −9,3 %; la reinversión neta de la proyección es negativa.',
      '**Momento operativo**: ingresos sin Mobility +10,9 % y BPA ajustado +23 % en el 2T26; guía de Ratings e Indices al alza [A3].',
      '**Retorno al accionista**: más de 7.000 M de recompras en 2026, cerca del 6 % de la capitalización [A3].',
      '**Múltiplo en mínimos**: 18,9 veces el EBITDA, un 24 % por debajo de su mediana de 2019-2025.',
    ],
    en_contra: [
      '**El precio pide más de lo que da la guía**: crecimiento implícito del 9,2 % frente al 6,3 % del caso base.',
      '**Ciclo de emisión**: Ratings es el 43 % del beneficio y el bajista, como en 2022, vale 211,29 USD (−48,2 %).',
      '**IA en Market Intelligence**: el 34 % de los ingresos crece a 5,5-7 % y es el negocio con menos margen (33 %) [A2].',
      '**Apalancamiento al alza**: 2,7-2,8 veces la deuda bruta sobre EBITDA a finales de 2026, para recomprar acciones [A10].',
      '**ROIC por debajo del WACC**: 9,5 % frente a 10,38 %, por los 43.536 M pagados por IHS Markit [A5].',
    ],
    que_vigilar: 'La tesis depende de que la rentabilidad que exige el mercado no suba: con nuestros flujos el precio rinde un 9,1 % anual, y cada medio punto más de WACC quita un 8 % al valor. La señal de que se rompe sería un bono a 10 años por encima del 5,5 % o un frenazo de la emisión facturada en Ratings (ingresos por transacción por debajo del −10 % interanual), que es lo que más mueve el beneficio a corto plazo.',
    cambiaria_recomendacion: [
      'Si el precio baja de 338,33 USD, pasaríamos a Comprar.',
      'Si el precio sube por encima de 446,65 USD, pasaríamos a Vender.',
      'Si los ingresos por transacción de Ratings caen más de un 10 % interanual en el 3T26 o el 4T26, pasaríamos a Vender.',
      'Si el bono a 10 años baja del 4,5 % y la guía de 2027 supera el 7 % de crecimiento, pasaríamos a Comprar.',
      'Si las suscripciones de Market Intelligence crecen menos de un 4 % interanual, revisaríamos el escenario base a la baja.',
    ],
    kpis_seguimiento: [
      { kpi: 'Ingresos por transacción de Ratings (trimestre)', nivel_actual: '746 M en el 2T26 (+25 %)', umbral_alerta: 'Caída de más del 10 % interanual', por_que: 'Es lo que más mueve el beneficio a corto plazo [A3].' },
      { kpi: 'Suscripciones de Market Intelligence', nivel_actual: '1.025 M en el 2T26 (+5,8 %)', umbral_alerta: 'Menos del +4 %', por_que: 'Mide el efecto real de la IA en datos [A3].' },
      { kpi: 'Bono del Tesoro a 10 años', nivel_actual: '5,24 %', umbral_alerta: 'Por encima del 5,5 % o por debajo del 4,5 %', por_que: 'Decide el coste del capital y la recomendación [D11].' },
      { kpi: 'Margen operativo ajustado', nivel_actual: '54,3 % en el 2T26', umbral_alerta: 'Por debajo del 52 %', por_que: 'El caso base supone +50 pb al año [A3].' },
      { kpi: 'Deuda bruta / EBITDA', nivel_actual: '2,7-2,8 veces previsto a cierre de 2026', umbral_alerta: 'Más de 3 veces', por_que: 'Limita las recompras y la capacidad de comprar [A10].' },
    ],
    confianza: 'Media',
  },

  _parches: [
    { ruta: 'sentimiento.temas[0].contraste', valor: 'Los columnistas la ven exagerada (datos propietarios difíciles de replicar) y la acción cae en bloque con el sector ante cada lanzamiento de IA generalista [E2, E5]. Los datos les dan algo de razón: las suscripciones de MI crecieron de 969 M a 1.025 M en el 2T26 (+5,8 %) y la guía de MI se mantuvo en +5,5-7 % [A3]; el riesgo está en el múltiplo, no aún en las cifras.' },
    { ruta: 'sentimiento.temas[1].contraste', valor: 'Es el riesgo que admiten hasta los alcistas; en octubre domina la emisión floja del 3T [E8, E9]. Los ingresos por transacción de Ratings subieron de 597 M a 746 M en el 2T26 y la guía de Ratings subió a +5-8 % [A3]: la base de comparación del 2S26 es exigente.' },
    { ruta: 'sentimiento.temas[2].contraste', valor: 'La mayoría ve el PER cerca de mínimos de varios años [E5, E10]. Es cierto (EV/EBITDA de 18,9 veces frente a una mediana de 24,9 en 2019-2025), pero con el bono al 5,24 % el DCF no da más de 321,80 USD; solo con la prima implícita del mercado llega a 405,64 USD.' },
    { ruta: 'sentimiento.temas[3].contraste', valor: 'Coincide con los datos: ingresos sin Mobility +11 % y BPA ajustado +23 % en el 2T26 [A3]. La «guía rebajada» que cita un columnista es un efecto de perímetro: la guía de BPA ajustado sin Mobility (17,50-17,75 USD) no compara con la anterior con Mobility (19,40-19,65 USD) [C25, C26].' },
    { ruta: 'sentimiento.temas[4].contraste', valor: 'Energy y MI crecen menos: guía de +4,5-6 % y +5,5-7 % en 2026, frente a +5-8 % de Ratings y +12-14 % de Indices [A10]. Es la mitad del negocio y la parte con menos margen (46 % y 33 %) [A2].' },
  ],
};
