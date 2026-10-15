// Textos del analista para Johnson Controls (corte 2026-10-15). Las cifras del motor salen de calc tal cual.
// Citas: [A3] = fuente 3 de A.json, [B2] de B.json, [P1] fuente propia.
export default {
  fuentes: [
    { id: 1, titulo: 'Tipos de cambio de referencia del euro (14-oct-2026)', editor: 'Banco Central Europeo', tipo: 'Primaria', fecha: '2026-10-14', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml' },
  ],
  limitaciones: 'Línea cotizada: acciones ordinarias en la Bolsa de Nueva York (JCI), en USD, la misma divisa de las cuentas. Precio: cierre del 14-oct-2026 (152,44 USD); la sesión del 15-oct no había cerrado al hacer el informe (a media sesión, 144,16 USD, −5,4 %, con la caída de los valores de frío para centros de datos) [D1, D13]. Ejercicio a 30 de septiembre («2025» = octubre de 2024 a septiembre de 2025). Cuentas 2022-2025 de operaciones continuadas del XBRL de la SEC, sin el negocio residencial vendido a Bosch en julio de 2025 [A2, A6]; los años anteriores tienen otro perímetro y no se usan. US GAAP: los arrendamientos operativos quedan dentro del EBITDA y fuera de la deuda. El BPA de la regla a 12 meses es el ajustado de la empresa (excluye reestructuraciones, costes de transformación, AFFF y ajustes a mercado de pensiones), el mismo del consenso y de la historia de PER; el DCF, en cambio, resta una reestructuración normalizada.',
  huecos: [
    { seccion: 'transacciones', campo: 'tercera transacción con múltiplo publicado', tipo: 'Complemento', intentos: '1) Bosch-JCI residencial: múltiplo no publicado; 2) Trane-Stellar y Trane-LiquidStack: sin múltiplo; 3) Schneider-Motivair: sin múltiplo', decision: 'Peso 0' },
  ],
  controles_explicados: [
    { control: 'Tipo impositivo efectivo razonable (2023)', explicacion: 'Beneficio fiscal extraordinario en 2023 (ingreso por impuestos de 468 M por partidas fiscales discretas, que la empresa excluye de su beneficio ajustado) [A7]. El DCF usa un 17 %, el tipo ajustado normal de un grupo con sede en Irlanda.' },
    { control: 'Tipo impositivo efectivo razonable (2024)', explicacion: 'Tipo bajo en 2024 por partidas fiscales discretas y el efecto fiscal del acuerdo AFFF [A6]. El DCF usa un 17 %.' },
    { control: 'Caja proyectada coherente con la histórica', explicacion: 'La caja libre real de 2022-2024 está deprimida por el pago del acuerdo AFFF (750 M), el fin del programa de factoring y la reestructuración; en los últimos doce meses a junio de 2026 fue de 3.167 M con una conversión de ≈100 % que guía la empresa [A3]. Los 3.570 M medios de 2026e-2028e están en línea con ese nivel más el crecimiento.' },
    { control: 'Crecimiento del BPA base ≤ 25 % anual desde el último real', explicacion: 'El último BPA real es el contable (2,63 USD), con 546 M de reestructuración y deterioros; el BPA de la regla es el ajustado, que fue de 3,76 USD en 2025 y la empresa guía ≈5,05 para 2026. Desde el ajustado de 2025, el base de 2028e (6,68) supone un 21 % anual, la mitad por el salto ya casi cerrado de 2026.' },
  ],
  per_historico: {
    base: 'adelantado', actual: 25.4, mediana_5a: 20.6, minimo_5a: 14.1, media_larga: 18.3,
    excluidos: 'Historia adelantada en BPA ajustado (precio al cierre del ejercicio, 30-sep, ÷ BPA ajustado real del ejercicio siguiente, tal como se publicó): 2018 17,9x (35,00 ÷ 1,96); 2019 19,6x (43,89 ÷ 2,24); 2020 15,4x (40,85 ÷ 2,65); 2021 22,7x (68,08 ÷ 3,00); 2022 14,1x (49,22 ÷ 3,50); 2023 14,3x (53,21 ÷ 3,71); 2024 20,6x (77,61 ÷ 3,76); 2025 21,8x (109,95 ÷ 5,05, nuestro BPA de 2026e). Ningún año excluido: no hubo pérdidas ni burbuja en el BPA ajustado. Actual: 152,44 ÷ 6,00 (nuestro BPA de 2027e) = 25,4x.',
    v2: { mediana_5a: 20.9, minimo_5a: 15.2, media_larga: 21.1, excluidos: 'Historia al cierre (precio ÷ BPA ajustado del mismo ejercicio): 2019 22,4x; 2020 18,2x; 2021 25,7x; 2022 16,4x; 2023 15,2x; 2024 20,9x; 2025 29,2x. Media larga 2019-2025.' },
  },
  casos_12m: [
    { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: 5.72, multiplo: null, precio: null, justificacion: 'Los hiperescaladores frenan el gasto o los chips nuevos necesitan menos enfriadoras: las ventas crecen un 4,5 % y un 4 % en 2027-2028 (27.800 M en 2028e) y el margen EBIT ajustado se queda en el 16,1 %, por la mezcla de sistemas y la presión de precios. BPA ajustado 5,72 con 606 M de acciones.' },
    { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: 6.68, multiplo: null, precio: null, justificacion: 'La cartera récord (21.000 M) sostiene un 7,5 % y un 7 % de crecimiento en 2027-2028 (29.420 M en 2028e) y el apalancamiento operativo lleva el margen EBIT ajustado al 17,6 %; cargos financieros de ≈290 M, impuesto del 17 % y 606 M de acciones (sin recompras no anunciadas). BPA ajustado 6,68.' },
    { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: 7.36, multiplo: null, precio: null, justificacion: 'Los centros de datos llegan a un tercio de las ventas antes de lo previsto (CDU, Alloy, enfriadoras de absorción): crecimiento del 9,5 % y del 9 % (30.530 M en 2028e) y margen EBIT ajustado del 18,6 %. BPA ajustado 7,36.' },
  ],
  media_12m: 134.99,
  diferencia_consenso: 'Nuestro BPA ajustado de 2026e (5,05, la guía) coincide con el consenso (5,07) y el de 2027e (6,00) queda un 1,8 % por debajo (6,11) [D2]: no contamos recompras no anunciadas y el consenso sí. La diferencia de precio es de múltiplo: nuestro precio base (154,31 USD) queda un 8,0 % por debajo del objetivo medio de 20 analistas (167,75), porque la regla baja el PER de 25,4x hacia la mediana de cinco años (20,6x) con el tope ×1,1 (23,1x), mientras los analistas mantienen el múltiplo actual sobre un BPA que crece al 20 %.',
  objetivo_comentario: 'El valor intrínseco (87,35 USD) queda un 37,5 % por debajo del objetivo a 12 meses (139,82): el mercado paga 25,4 veces el BPA ajustado del año que viene, un múltiplo que el DCF solo justifica con un crecimiento del 17,6 % anual en 2027-2033 (proyectamos un 5,4 %) o con un margen EBITDA del 33,4 % (proyectamos un 19,6 %). Para cerrar la distancia haría falta que los centros de datos llegaran a un tercio de las ventas sin bajar márgenes y que el ciclo durara toda la década, o que la acción corrigiera. La tesis de valor es a más de un año y hoy no se cumple. El BPA base de 2028e (6,68) crece un 21 % anual desde el ajustado de 2025 (3,76), no desde el contable (2,63): la mitad es el salto de 2026, ya casi cerrado con nueve meses publicados.',
  veredicto: 'Sí',
  dcf_justificacion: {
    crecimiento: 'Partimos de la guía de 2026 (≈8 % orgánico; ventas de ≈25.580 M, +8,4 % con las divisas y las ventas de negocios, consenso 25.572 M) [A3, D2]. Después, 7,5 % en 2027 (consenso +8,2 %) y 7 % en 2028, apoyados en la cartera récord de 21.000 M (+32 %), y bajada hasta el 3,5 % en 2033 [A3]. Es más que el 4,6 % anual de 2022-2025, pero menos que los pedidos (+27 % en el 3T26): suponemos que el ciclo de centros de datos se normaliza a partir de 2029. El mercado de climatización crece un 6,4 % anual [B2].',
    margenes: 'Margen EBITDA del DCF del 15,7 % en 2026 (EBITDA ajustado de ≈18 % menos ≈2,4 puntos de reestructuración y transformación), subiendo al 18,0 % en 2027 y al 19,6 % en 2031-2033 por el apalancamiento operativo (más del 30 % según el marco de la empresa) y por bajar la reestructuración al 0,8 % de las ventas [A3, A6]. JCI reestructura todos los años (701, 1.049, 510 y 546 M en 2022-2025) y no la tratamos como extraordinaria [A2]. El 19,6 % final queda por debajo del 19,5-22 % de Trane y Lennox, con una mezcla con más incendios y seguridad [B4].',
    inversion: 'Capex del 1,5 % de las ventas en 2026 (≈350 M; 1,8 % en 2025) subiendo al 2,0 % para igualar la amortización al final; la amortización baja del 2,6 % al 2,0 % porque la de intangibles comprados (≈1 % de las ventas) se va agotando [A3, A6]. Circulante del 8 % de las ventas (8,3 % a junio de 2026, con los ingresos diferidos restados) [A3]. Impuesto del 17 %, el ajustado de un grupo con sede en Irlanda; los tipos contables de 2023-2024 tienen extraordinarios.',
    wacc: 'Tasa libre del 5,21 % (bono de EE. UU. a 10 años del 13-oct-2026) [D5], prima de mercado del 5,5 % y beta de 1,15, entre la mensual de cinco años (1,28) y las semanales (0,99-1,01) [D1]. Coste de la deuda del 5,0 % antes de impuestos y peso de la deuda del 9,3 % a valor de mercado (9.475 M frente a 92.339 M de capitalización): WACC del 10,85 %. Con la prima implícita del mercado (4,20 %) el WACC baja al 9,49 % [D4]. Cada décima de beta mueve el valor ≈8 %.',
    terminal: 'Gordon con un 3,0 % de crecimiento a perpetuidad (inflación del 2-2,5 % más algo de volumen), por debajo de la tasa libre menos medio punto. El valor terminal es el 60 % del total. El múltiplo de salida de referencia (16 veces el EBITDA, entre Carrier y Trane) daría más valor, pero suponerlo sería pagar hoy el múltiplo de un ciclo alto.',
  },
  puente_comentarios: {
    '2026e': 'Guía: ≈8 % orgánico; el volumen sale de la climatización aplicada (crece a ritmo de «high teens») y el precio del 2-3 % que repercute aranceles e inflación; las divisas suman y las ventas de negocios restan [A3, A8].',
    '2027e': 'Conversión de la cartera de 21.000 M (+32 %) y CDU con certificación de Nvidia; precio en línea con la inflación [A3, A8].',
    '2028e': 'Volumen del 4,5 % (centros de datos aún creciendo a dos dígitos, resto del negocio al 3-4 %) y precio del 2,5 %.',
    '2029e': 'Normalización del ciclo de centros de datos; el volumen baja al ritmo del mercado.',
    '2030e': 'Crecimiento de mercado (+5 %): mitad volumen, mitad precio.',
  },
  sostenibilidad_justificacion: 'Sí: el crecimiento proyectado (5,7 % de media en 2026-2033) es algo mayor que el histórico (4,6 % en 2022-2025) pero menor que el del mercado de climatización más la ola de centros de datos (6,4 % anual del mercado, pedidos +27 %) y está respaldado por una cartera de 21.000 M que cubre casi diez meses de ventas [A3, B2]. El negocio apenas necesita capital (capex del 1,5-2 % de las ventas y circulante del 8 %), así que la prueba es el poder de precios: la empresa sube precios por encima de los costes (margen EBITA de los segmentos del 17,6 % al 19,8 % en un año) [A3]. El motor llega al mismo veredicto. La calidad que falla no es la del crecimiento sino la del capital: el ROIC del 8,2 % no cubre el WACC por el fondo de comercio de Tyco.',
  dcf_lectura: 'El DCF da 77,65 USD por acción, un 49,1 % por debajo del precio, con un 60 % del valor en el terminal. El DCF inverso es la clave: para justificar 152,44 USD, JCI tendría que crecer un 17,6 % anual en 2027-2033 con nuestros márgenes (frente al 5,4 % de nuestro base y al 4,6 % de su historia reciente), o llegar a un margen EBITDA del 33,4 % con nuestro crecimiento, más que ninguna empresa del sector; la rentabilidad implícita en el precio es del 7,3 % anual, por debajo del WACC (10,85 %) y del 9,49 % que pide el mercado. Es muy exigente: el precio supone que el ciclo de centros de datos dura toda la década con márgenes de especialista. Con la prima del mercado el valor sube a 102,45 USD, todavía un 32,8 % por debajo. Aquí falla el filtro de valor real.',
  narrativas: {
    Bajista: 'Los hiperescaladores frenan su gasto en 2027 o los chips nuevos (como dijo Nvidia en enero) reducen la necesidad de enfriadoras; los pedidos caen y la cartera se convierte más despacio, como le pasó al sector en 2009 y a la propia JCI en 2020. El margen se estanca.',
    Base: 'La cartera récord se convierte en ventas en 2027-2028, el sistema de gestión de Weidemanis sigue subiendo márgenes y el crecimiento vuelve al ritmo del mercado a partir de 2029.',
    Alcista: 'Los centros de datos llegan a un tercio de las ventas antes de cinco años (CDU, Alloy, enfriadoras de absorción York) y la mejora de márgenes acerca a JCI a Trane.',
  },
  escenarios_comentario: 'La asimetría a largo plazo es muy desfavorable: ni el escenario alcista (93,24 USD) se acerca al precio, y el bajista (51,44) pierde un 66,3 %. A 12 meses la cuenta es otra (alcista +11,5 %, bajista −47,1 % sobre el precio, con el objetivo ponderado en 139,82) porque la regla toma el múltiplo de hoy acercándolo a su historia y no el que justifica el DCF: la rentabilidad a un año depende de que el mercado siga pagando 23 veces, no de lo que vale el negocio a su coste de capital.',
  valoracion_comentario: 'El valor intrínseco (87,35 USD) sale del DCF (50 %), de los escenarios (30 %) y de los comparables (20 %, por PER adelantado en la misma base ajustada que nuestro BPA; mediana de 21,3x, con Daikin sin dato). Las transacciones no pesan: solo dos tienen múltiplo publicado y no suponemos una operación. La dispersión es grande: el DCF da 77,65; con la prima del mercado, 102,45; los comparables por PER, 106,62-142,67. El método más fiable aquí es el DCF con la prima del mercado como contraste: lo que dice el conjunto es que el precio de hoy solo se sostiene con un múltiplo de ciclo alto.',
  rentabilidad_comentario: 'El ROIC es del 8,2 % en 2025 (8,1 % en 2024), por debajo del WACC (10,85 %): la creación de valor es negativa. La causa es el fondo de comercio de la fusión con Tyco (16.633 M, el 68 % del capital invertido): sin él, el ROIC sería del 26,1 %, el de un buen negocio industrial. Con el beneficio ajustado de 2026 (EBIT de ≈3.950 M) el ROIC subiría a ≈13 %, todavía 2 puntos sobre el WACC, lejos de los 5 que pide el método para comprar [A2, A3]. ROE del 11,9 %.',
  resumen: {
    recomendacion: 'Mantener', conviccion: 'Media', justificacion_recomendacion: null, horizonte: '12 meses',
    tesis: 'Johnson Controls fabrica e instala la maquinaria que climatiza y protege edificios grandes: enfriadoras York para naves, hospitales y centros de datos, unidades de aire Silent-Aire, controles Metasys y sistemas de incendios y seguridad Tyco, con un 30 % de ventas de servicio [A1, A3]. Tras vender el residencial a Bosch y con un nuevo consejero delegado de Danaher, crece al 10 % orgánico con una cartera récord de 21.000 M (+32 %) por los centros de datos, que ya son casi una quinta parte de las ventas [A3, A8].\n\nEl precio, 152,44 USD, descuenta mucho: 25,4 veces nuestro BPA ajustado de 2027e y, en el DCF inverso, un crecimiento del 17,6 % anual durante siete años.\n\nEl negocio tiene un punto débil que el entusiasmo tapa: el ROIC (8,2 %) no cubre el coste de capital por el fondo de comercio de Tyco. Para invertir hay que creer en un ciclo de centros de datos de diez años; nosotros proyectamos que se normaliza en 2029.',
    vision_diferencial: {
      mercado_descuenta: 'Que JCI será durante muchos años un ganador de la IA, con crecimientos de dos dígitos y márgenes de especialista.',
      nuestra_vision: 'Dos años muy buenos por la cartera, normalización después al ritmo del mercado y un múltiplo que vuelve hacia su mediana de 20 veces.',
      por_que: 'Los centros de datos son el 17-19 % de las ventas; el resto (incendios, seguridad, servicio en EMEA) crece al 1-5 % [A3, A8].',
    },
    a_favor: [
      '**Pedidos récord**: +27 % orgánico en el 3T26 (Américas +37 %) y cartera de 21.000 M, +32 % [A3].',
      '**Guía subida tres veces**: BPA ajustado de 2026 de ≈4,55 a ≈5,05 USD (+34 %) [A3, A6].',
      '**Exposición directa al frío de los centros de datos**: enfriadoras York, Silent-Aire, CDU certificadas por Nvidia y la compra de Alloy [A8, B6].',
      '**Márgenes al alza**: margen EBITA ajustado de los segmentos del 19,8 % en el 3T26, +220 pb [A3].',
      '**Retorno al accionista**: recompra acelerada de 5.000 M en 2025 y dividendo de 1,60 USD [A6].',
    ],
    en_contra: [
      '**Calidad del capital**: ROIC del 8,2 % frente a un WACC del 10,85 %, por el fondo de comercio de Tyco.',
      '**Precio exigente**: 25,4x el BPA ajustado de 2027e y un DCF inverso del 17,6 % de crecimiento anual.',
      '**Rentabilidad a 12 meses negativa**: −7,2 % ponderada y +2,3 % en el base.',
      '**Beneficio ajustado frente al contable**: la empresa excluye cada año 500-1.000 M de reestructuración [A2].',
      '**Cúpula en cambio**: salen dos presidentas de división en 2026 y la directiva saliente vendió 21,0 M USD [C2, C4].',
    ],
    que_vigilar: 'La tesis del mercado depende de que los pedidos de centros de datos duren. La señal está en los pedidos orgánicos de Américas y la cartera: si en el 4T26 (27-oct) y el 1T27 los pedidos siguen creciendo por encima del 15 % y la guía de 2027 supera los 6,1 USD de BPA ajustado, el ciclo sigue; si los pedidos caen por debajo del +5 % o la relación pedidos/ventas baja de 1, el múltiplo de 25 veces no se sostiene.',
    cambiaria_recomendacion: [
      'Precio por debajo de 87,35 USD (valor intrínseco): pasaríamos a Comprar solo si además la calidad mejorara (ROIC − WACC ≥ 5).',
      'Precio por encima de 157,10 USD: pasaríamos a Vender.',
      'Guía de BPA ajustado de 2027 por debajo de 5,7 USD el 27-oct: revisión a la baja.',
      'Pedidos orgánicos negativos en Américas dos trimestres seguidos.',
    ],
    kpis_seguimiento: [
      { kpi: 'Pedidos orgánicos (sistemas y servicios)', nivel_actual: '+27 % (3T26)', umbral_alerta: '< +5 %', por_que: 'Adelantan las ventas de 2027-2028.' },
      { kpi: 'Cartera de pedidos', nivel_actual: '21.000 M (jun-26)', umbral_alerta: '< 18.000 M', por_que: 'Visibilidad del crecimiento.' },
      { kpi: 'Margen EBITA ajustado de los segmentos', nivel_actual: '19,8 % (3T26)', umbral_alerta: '< 18 % en el año', por_que: 'Apalancamiento operativo prometido.' },
      { kpi: 'Reestructuración y transformación', nivel_actual: '≈600 M (2026e)', umbral_alerta: '> 2 % de las ventas en 2027', por_que: 'Distancia entre beneficio ajustado y contable.' },
    ],
    sintesis: '**La recomendación y por qué.** Mantener, con convicción media. El objetivo a 12 meses es de 139,82 USD (rentabilidad ponderada del −7,2 % y del 2,3 % en el base, con dividendo), por debajo del precio de 152,44 USD (cierre del 14-oct) y del objetivo medio de 20 analistas (167,75). El valor intrínseco es de 87,35 USD, un 42,7 % por debajo del precio. La regla no da Comprar por tres filtros a la vez: la rentabilidad a 12 meses no llega al 15 %, el valor intrínseco queda muy lejos y la calidad no pasa (ROIC − WACC negativo). Tampoco pasaría el filtro de mantener en cartera. La convicción es media porque las dos reglas (absoluta y relativa) coinciden y estamos lejos de los umbrales; subiría si la acción cayera hacia el valor intrínseco con la calidad mejorando, y bajaría si la guía de 2027 del 27-oct confirmara un crecimiento de dos dígitos sostenido.\n\n**El negocio.** Johnson Controls fabrica, instala y mantiene la climatización y la seguridad de edificios grandes: enfriadoras York, unidades de aire Silent-Aire para centros de datos, controles Metasys e incendios y seguridad Tyco [A1]. Crece al 10 % orgánico con una cartera récord de 21.000 M (+32 %) y los centros de datos ya son casi una quinta parte de las ventas, con el objetivo de llegar a un tercio en 3-5 años [A3, A8]. Pero su ROIC es del 8,2 % frente a un WACC del 10,85 %, por el fondo de comercio de Tyco: es un buen negocio comprado caro. La calidad sí sostiene el crecimiento que proyectamos (sostenibilidad Sí): un 5,7 % anual, respaldado por la cartera y sin necesidad de capital.\n\n**Finanzas y equipo.** El nuevo consejero delegado, Joakim Weidemanis (ex-Danaher), ha subido tres veces la guía de 2026, hasta un BPA ajustado de ≈5,05 USD (+34 %) [A3]. Usamos ese BPA, el del consenso y el de la historia; el contable es un 20-30 % menor porque la empresa excluye cada año 500-1.000 M de reestructuración [A2]. Deuda neta de 8.834 M, 1,9 veces el EBITDA ajustado.\n\n**Valoración.** El DCF da 77,65 USD; para justificar el precio, JCI tendría que crecer un 17,6 % anual siete años, tres veces lo que proyectamos. A 25,4 veces nuestro BPA de 2027e cotiza muy por encima de su mediana histórica adelantada (20,6 veces), así que la regla a 12 meses baja el múltiplo a 23,1 veces y deja un recorrido casi nulo.\n\n**Riesgos y catalizadores.** El riesgo de IA es medio y sobre todo de demanda: la IA es la que llena la cartera, y la amenaza es que los chips nuevos necesiten menos enfriadoras (Nvidia, enero: −6,2 % en un día) o que el ciclo de inversión de los hiperescaladores se frene. Catalizadores: resultados del 4T26 y guía de 2027 el 27-oct.\n\n**Qué cambiaría la decisión.** Compraríamos por debajo de 87,35 USD solo si la calidad mejorara; venderíamos por encima de 157,10. Revisaríamos al alza si la guía de 2027 superara 6,5 USD con pedidos todavía al +20 %; a la baja si los pedidos de Américas bajaran del +5 %.',
  },
  secciones: {
    historia: {
      resumen: 'Johnson Controls nació en 1885 en Milwaukee con el termostato eléctrico de Warren Johnson y durante un siglo combinó control de edificios con baterías y asientos de coche [B1]. En 2016 se fusionó con Tyco (incendios y seguridad) y trasladó la sede a Cork; desde entonces ha ido vendiendo lo que no era edificios: Power Solutions en 2019 (13.200 M) y el residencial a Bosch en 2025 [B1, B9]. En 2021 compró Silent-Aire, base de su negocio de centros de datos. En marzo de 2025 llegó Joakim Weidemanis desde Danaher, que ha simplificado la estructura, implantado un sistema de gestión propio y orientado el grupo a los edificios críticos [A6, B8].',
      confianza: 'Media',
    },
    negocio: {
      descripcion: 'Johnson Controls diseña, fabrica, instala y mantiene sistemas para edificios comerciales e industriales: climatización aplicada (enfriadoras York, unidades de tratamiento de aire, bombas de calor, frío industrial), unidades de aire y de distribución de refrigerante para centros de datos (Silent-Aire, CDU, Alloy), controles y gestión de edificios (Metasys, OpenBlue), y sistemas de incendios y seguridad (Tyco, Simplex, Grinnell) [A1]. Vende en tres segmentos geográficos: Américas (67 % de las ventas), EMEA (21 %) y Asia-Pacífico (12 %) [A3].',
      como_gana_dinero: 'Dos fuentes: «productos y sistemas» (68 % de las ventas en 2025, equipos e instalación por proyecto, con margen bruto del 35 %) y «servicios» (32 %, mantenimiento, reparaciones y contratos sobre la base instalada, con margen bruto del 40 %) [A6]. El servicio es recurrente y defensivo; los sistemas siguen la inversión en edificios y ahora la ola de centros de datos. El margen EBITA ajustado de los segmentos fue del 19,8 % en el 3T26 [A3].',
      clientes: 'Promotores, contratistas, propietarios de edificios, hospitales, universidades, administraciones, fábricas y, cada vez más, hiperescaladores y operadores de centros de datos [A1]. Ningún cliente supera el 10 % de las ventas. La cartera de sistemas y servicios suma 21.000 M (jun-26), de la que Américas 15.900 M [A3].',
      confianza: 'Alta',
    },
    sector: {
      definicion: 'El mercado relevante es el de climatización (equipos y servicio) para edificios, más el control de edificios y los sistemas de incendios y seguridad. Medimos el de climatización con MarketsandMarkets (≈299.000 M USD en 2025, +6,4 % anual hasta 2030) [B2] y lo contrastamos con Grand View (≈259.000 M) [B3]. JCI vende ≈25.000 M, pero repartidos entre tres mercados distintos, así que no damos una cuota única. La parte que más crece es la refrigeración de centros de datos (aire y líquida) [B4].',
      drivers: [
        { driver: 'Centros de datos e IA', efecto: '+', horizonte: 'Estructural', evidencia: 'Pedidos de Américas +37 % en el 3T26; los centros de datos pasan de ≈10 % a «high teens» de las ventas [B7, B8].' },
        { driver: 'Eficiencia energética y descarbonización de edificios', efecto: '+', horizonte: 'Estructural', evidencia: 'Bombas de calor y renovación de enfriadoras; enfriadoras de absorción que reducen un 40 % el consumo de frío [B7].' },
        { driver: 'Tecnología de los chips', efecto: '+/−', horizonte: 'Estructural', evidencia: 'Nvidia dijo en enero que Vera Rubin se refrigerará con agua templada sin enfriadoras: −6,2 % en un día [B5].' },
        { driver: 'Obra nueva no residencial y tipos', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Bono a 10 años del 5,2 %; el mercado vende el sector cuando suben los tipos (18-ago) [B4].' },
        { driver: 'Conflictos en Oriente Medio', efecto: '−', horizonte: 'Cíclico', evidencia: 'EMEA crece solo un 1 % orgánico en el 3T26; Oriente Medio es ≈10 % de EMEA [B7, B8].' },
      ],
      porter: [
        { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Trane, Carrier, Daikin, Vertiv en frío; Siemens, Honeywell y Schneider en controles y seguridad; en aplicados se compite por especificación y plazo [B1, B4].' },
        { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Hiperescaladores con pedidos enormes y diseños propios; promotores que licitan por precio [B7].' },
        { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Compresores, acero, cobre y electrónica; la empresa integra cinco subsistemas de las enfriadoras [B7].' },
        { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Capacidad de fabricación de enfriadoras grandes y red de servicio difíciles de replicar; en refrigeración líquida entran especialistas [B4].' },
        { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'Refrigeración líquida directa al chip y agua templada sin enfriadora [B5].' },
      ],
      ciclo: { posicion: 'Expansión', comentario: 'La parte de centros de datos está en pleno auge (pedidos +27 %, cartera +32 %), mientras el resto del negocio está a mitad de ciclo: incendios y seguridad planos y EMEA casi sin crecer [B8]. La obra no residencial es cíclica (caídas del 10-20 % en 2009) y el servicio, defensivo.' },
      regulacion: 'Normas de refrigerantes (AIM Act en EE. UU., gases fluorados en la UE), eficiencia energética de edificios (directiva europea refundida en 2024) y aranceles de EE. UU., repercutidos en precio [B1, B4]. En incendios, normas de seguridad y el litigio por las espumas AFFF de su filial Tyco Fire Products [A1].',
      tendencias: 'La tendencia que manda es la IA, por el lado de la demanda: más centros de datos necesitan más frío, y JCI ha pasado de vender unidades de aire a ofrecer el sistema térmico completo (enfriadoras, aire, CDU, refrigeración líquida) [B7]. La segunda es el cambio de tecnología: chips más densos que se refrigeran con líquido y, quizá, sin enfriadoras. La tercera, la descarbonización y la electrificación del calor (bombas de calor), que favorecen la renovación de equipos.',
      confianza: 'Media',
    },
    competencia: {
      posicion: 'Uno de los cinco grandes de la climatización aplicada mundial y líder en control de edificios e incendios con Siemens y Honeywell; en centros de datos compite con Trane y Vertiv por el sistema térmico completo [B1, B4].',
      foso: {
        veredicto: 'Estrecho', tendencia: 'Estable',
        fuentes: [
          { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'Red de servicio que se refuerza con la base instalada; no es un efecto de red en sentido estricto [B1].' },
          { fuente: 'Costes de cambio', puntuacion: 3, evidencia: 'Controles y sistemas de incendios instalados durante décadas; servicio del 32 % de las ventas [A6].' },
          { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'Marcas York, Tyco, Metasys, Simplex; certificación de Nvidia para sus CDU [B1, B7].' },
          { fuente: 'Ventaja en costes', puntuacion: 2, evidencia: 'Margen EBITDA del 14-15 % contable frente al 19,5 % de Trane [B4].' },
          { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'Pocos fabricantes con enfriadoras grandes y servicio mundial [B1].' },
        ],
      },
      amenazas: 'De mayor a menor probabilidad: (1) que el ciclo de centros de datos se frene o cambie de tecnología (chips sin enfriadoras, refrigeración líquida en manos de Vertiv o Schneider); (2) la competencia de Trane, que es más rentable y gana cuota en enfriadoras; (3) la entrada de fabricantes asiáticos en equipos de menor gama [B4, B5].',
      confianza: 'Media',
    },
    financieros: {
      comentario: 'Con el perímetro actual, las ventas crecieron un 4,6 % anual en 2022-2025 y se aceleran en 2026 (+8 % en nueve meses, +10 % orgánico en el 3T) [A2, A3]. El margen EBITDA contable subió del 10,0 % de 2022 al 13,4 % de 2025 y al 15,1 % en los últimos doce meses, por precios, apalancamiento operativo y menos cargos extraordinarios. El beneficio contable de operaciones continuadas fue de 1.721 M en 2025 (BPA 2,63) frente a un ajustado de 2.462 M (BPA 3,76) [A6].',
      ajustes: 'Usamos dos bases. En el DCF, el EBITDA resta una reestructuración normalizada (2,4 % de las ventas en 2026 bajando al 0,8 %), porque JCI reestructura todos los años (701, 1.049, 510 y 546 M en 2022-2025) [A2]. En la regla a 12 meses, el BPA ajustado de la empresa (excluye reestructuración, transformación, AFFF, ajustes a mercado y extraordinarios fiscales) porque es la base del consenso y de la historia de PER; el ajustado incluye la amortización de intangibles comprados [A3]. En 2024 dejamos 383 M de AFFF neto como no recurrente (acuerdo de 750 M menos 367 M de seguros) y en los últimos doce meses −244 M (recuperaciones de seguros y plusvalía de ventas) [A6, A3].',
      confianza: 'Media',
    },
    trimestres: {
      ultima_presentacion: 'En la conferencia del 3T26 (29-jul) la dirección presentó a JCI como «el sistema térmico de los centros de datos»: climatización aplicada creciendo a ritmo de «high teens», cartera de unidades de distribución de refrigerante (CDU) de ≈1.000 M con certificación de Nvidia, enfriadoras de absorción York que reducen un 40 % el consumo de frío, y el objetivo de que los centros de datos pasen a un tercio de las ventas en 3-5 años [A8]. Riesgos citados por los analistas: cuellos de botella de suministro, mezcla de sistemas que presiona el margen, durabilidad de la inversión de los hiperescaladores y caída de la cartera de servicio en seguridad. La guía de 2027 llegará con el 4T26 [A8].',
      confianza: 'Media',
    },
    balance: {
      otros_pasivos: 'Arrendamientos operativos de ≈1.300 M, dentro del EBITDA en US GAAP y fuera del puente [A2]. Pensiones netas de 177 M (142 M después de impuestos en el puente) [A3]. Pasivos por amianto y por las espumas AFFF de Tyco Fire Products, en parte cubiertos por seguros: el acuerdo de 750 M con los sistemas públicos de agua ya se pagó en 2024-2025 y quedan las demandas de lesiones personales, sin provisión cuantificada en los documentos leídos [A1]. Ingresos diferidos de 2.943 M, que restamos del circulante [A3].',
      comentario: 'Deuda neta de 8.834 M a 30-jun-2026 (deuda bruta de 9.475 M, caja de 641 M), 1,9 veces el EBITDA ajustado según la empresa, por debajo de su objetivo [A3, A8]. La venta del residencial (≈8.100 M) se destinó a la recompra acelerada de 5.000 M y a reducir deuda [A6]. El patrimonio bajó de 16.098 a 12.927 M en 2025 por la recompra. El fondo de comercio (16.612 M) supera al patrimonio: es la herencia de Tyco [A3].',
      confianza: 'Alta',
    },
    flujos: {
      comentario: 'La caja libre de operaciones continuadas fue de 2.120 M en 2025 (123 % del beneficio contable) y de 2.329 M en nueve meses de 2026, con una conversión ajustada del 98 % [A3, A6]. En 2022-2024 fue menor (750-1.410 M) por el pago del acuerdo AFFF, el fin del programa de factoring y las reestructuraciones [A6]. El capex es bajo (1,8 % de las ventas en 2025). En 2025 devolvió 6.967 M a los accionistas (976 M de dividendos y 5.991 M de recompras), financiados con la venta del residencial [A2].',
      confianza: 'Alta',
    },
    calidad: {
      comentario: 'Cuentas auditadas por PwC con opinión favorable sobre las cuentas y el control interno de 2025 [A1]. El riesgo contable es la distancia entre beneficio ajustado y contable: reestructuraciones de 500-1.000 M todos los años, costes de «transformación» excluidos desde 2025 y cargos por litigios (AFFF, amianto) [A2, A6]. Altman Z de 3,01, Piotroski de 7 y Beneish de −2,62: sin señales de manipulación.',
      senales: [
        { senal: 'Reestructuración recurrente excluida del beneficio ajustado (546 M en 2025, 701-1.049 M en 2022-2023)', nivel: 'Media', comentario: 'La tratamos como coste en el DCF [A2].' },
        { senal: 'Costes de transformación excluidos desde 2025 (180 M en 2025, 197 M en 9M26)', nivel: 'Media', comentario: 'Nueva categoría de ajuste con el nuevo consejero delegado [A3, A6].' },
        { senal: 'Litigios AFFF y amianto', nivel: 'Baja', comentario: 'Acuerdo de 750 M ya pagado; recuperaciones de seguros que suman al beneficio contable [A6].' },
      ],
      confianza: 'Media',
    },
    capital: {
      politica: 'Dividendo trimestral de 0,40 USD (1,60 anual, ≈1 % de rentabilidad) y recompras: la recompra acelerada de 5.000 M de 2025 terminó en el 2T26 y en el 3T26 recompró otros 635 M [A3, A6]. La dirección dice que tiene margen para invertir en el negocio manteniendo la flexibilidad del balance (deuda neta de 1,9 veces el EBITDA ajustado) [A8].',
      adquisiciones: [
        { anio: '2026', objetivo: 'Alloy Enterprises (refrigeración líquida directa al chip)', importe: null, ev_ebitda: null, financiacion: 'Caja', resultado: 'Primeros pilotos y pedidos [A8].' },
        { anio: '2021', objetivo: 'Silent-Aire (unidades de aire para centros de datos)', importe: null, ev_ebitda: null, financiacion: 'Caja', resultado: 'Base del negocio de centros de datos, que hoy es ≈18 % de las ventas [A8].' },
        { anio: '2016', objetivo: 'Fusión con Tyco International', importe: null, ev_ebitda: null, financiacion: 'Acciones', resultado: 'Deja 16.600 M de fondo de comercio y un ROIC que no cubre el coste de capital [A2].' },
      ],
      comentario: 'La asignación de capital de la última década ha destruido valor: la fusión con Tyco dejó un ROIC del 5-8 %, por debajo del coste de capital, y las ventas de negocios (Power Solutions, residencial) se usaron sobre todo en recompras a múltiplos altos [A2]. Desde 2025 la dirección vende lo no estratégico y compra tecnología pequeña de centros de datos (Alloy), una disciplina mejor; el programa de opciones de 2026 premia crecer en ventas y capitalización, lo que puede empujar a compras caras [C3].',
      confianza: 'Media',
    },
    directivos: {
      comentario: 'Equipo nuevo: Weidemanis llegó en marzo de 2025 desde Danaher y ha subido la guía de 2026 tres veces; la directiva saliente de productos vendió 21,0 M USD en acciones y en 2026 se han ido dos presidentas de división por el cambio de modelo operativo [C2, C4, C6]. El historial de guías es mixto: 2022 incumplió (3,00 frente a ≈3,25) y desde 2024 cumple o supera [C7].',
      confianza: 'Media',
    },
    gobierno: {
      remuneracion: 'El consejero delegado cobró 19,96 M USD en 2025 (16,60 M en acciones) [C1]. En mayo de 2026 el consejo creó un programa de opciones para 2026-2030 que solo vale si las ventas y la capitalización suben mucho (10,5 M de valor objetivo para Weidemanis) [C3]. Aprobación de la remuneración del 92 % en la junta de 2025 [C1].',
      control_y_defensas: 'Sin accionista de control: Vanguard (11,2 %), Dodge & Cox (10,0 %) y BlackRock (7,1 %) son los mayores [C1]. Una clase de acciones y un voto por acción; presidente independiente (Mark Vergnano) separado del consejero delegado; 11 de 12 consejeros independientes.',
      confianza: 'Alta',
    },
    multiplos_historicos: {
      comentario: 'Con el beneficio contable, JCI cotiza a 42,9 veces el BPA de los últimos 12 meses frente a 32,1 de media (2022-2025) y a 28,8 veces el EBITDA frente a 20,9: en el máximo de la serie. En la base adelantada y ajustada que usa la regla, 25,4 veces frente a una mediana de cinco años de 20,6 y un mínimo de 14,1 (2022-2023). El múltiplo ha subido por un cambio real (más centros de datos, más margen, menos residencial) pero también por el entusiasmo por la IA.',
      confianza: 'Media',
    },
    comparables: {
      criterio: 'Fabricantes de climatización (Trane, Carrier, Daikin, Lennox), el especialista en frío y potencia de centros de datos (Vertiv) y dos grupos de control de edificios y electrificación (Schneider, Siemens), que compiten en controles, incendios y centros de datos. Cifras de Yahoo Finance del 14-oct-2026, mismo día que nuestro precio, pasadas a USD [D6]. PER adelantado de consenso (ajustado), en la misma base que nuestro BPA. Fuera Honeywell (en plena escisión) y Belimo (componentes).',
      comentario: 'JCI cotiza con prima sobre los fabricantes de climatización (PER adelantado de 24,9x frente a 13-16x de Carrier y Lennox) y casi al nivel de Trane (26,5x) y Vertiv (24,0x), los otros expuestos a centros de datos [D6]. La prima frente a Trane no se justifica por calidad: JCI tiene un margen EBITDA del 14,1 % y un ROIC del 8,2 % frente al 19,5 % y al 24,2 % de Trane. La mediana de PER del grupo (21,3x) da un valor de 106,62-142,67 USD por acción, por debajo del precio.',
      confianza: 'Media',
    },
    transacciones: {
      comentario: 'Las compras de refrigeración para centros de datos se pagan muy caras (Boyd Thermal a 22,5 veces el EBITDA) y las de climatización tradicional, a 15-18 veces (Viessmann) [D7, D8, D9]. JCI cotiza a 28,8 veces su EBITDA contable de los últimos doce meses, por encima de ese rango: no hay prima de control que ganar. Con 92.000 M de capitalización, no es un objetivo realista.',
      confianza: 'Baja',
    },
    catalizadores: {
      items: [
        { fecha: '2026-10-27', evento: 'Resultados del 4T26 y guía de 2027', efecto: 'La guía de BPA ajustado de 2027 (consenso 6,11) y los pedidos deciden si el mercado mantiene 25 veces el beneficio', probabilidad: 'Alta', sentido: '+/−' },
        { fecha: '2027-02 (primera semana)', evento: 'Resultados del 1T27', efecto: 'Conversión de la cartera y margen con más sistemas', probabilidad: 'Alta', sentido: '+/−' },
        { fecha: '2026-2027', evento: 'Primeros envíos grandes de CDU y pedidos de Alloy', efecto: 'Prueba de que JCI gana en refrigeración líquida, no solo en enfriadoras', probabilidad: 'Media', sentido: '+' },
        { fecha: '2026-2027', evento: 'Resultados de los hiperescaladores (gasto en centros de datos)', efecto: 'Cada señal de freno ha bajado la acción un 5-6 % en un día', probabilidad: 'Alta', sentido: '+/−' },
        { fecha: 'Sin fecha', evento: 'Revisión estratégica y ventas de negocios (residencial de seguridad)', efecto: 'Simplificación; caja para recompras', probabilidad: 'Media', sentido: '+' },
      ],
      confianza: 'Media',
    },
    riesgos: {
      items: [
        { riesgo: 'Fin o pausa del ciclo de inversión en centros de datos', tipo: 'Demanda', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−34 % (escenario bajista: 51,44 USD frente a 77,65)', mitigante: 'Cartera de 21.000 M; servicio recurrente del 32 % de las ventas', senal: 'Pedidos orgánicos de Américas por debajo del +5 %' },
        { riesgo: 'Cambio de tecnología: chips que se refrigeran sin enfriadoras (agua templada, líquido directo)', tipo: 'Tecnológico', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−10 %', mitigante: 'CDU, Alloy y enfriadoras de absorción; la dirección ve el riesgo «nominal»', senal: 'Diseños de referencia de Nvidia sin enfriadora en 2027' },
        { riesgo: 'Expectativas: el precio descuenta un 17,6 % de crecimiento anual en 2027-2033', tipo: 'Valoración', probabilidad: 'Alta', impacto: 'Alto', efecto_valor: '−47 % (bajista a 12 meses: 80,65 USD)', mitigante: 'Guía subida tres veces y consenso al alza', senal: 'Guía de BPA ajustado de 2027 por debajo de 6 USD' },
        { riesgo: 'Calidad del beneficio: reestructuraciones y transformación excluidas cada año', tipo: 'Contable', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: '−10 % (cada punto de ventas en cargos ≈ 6 % del valor)', mitigante: 'Los tratamos como coste en el DCF', senal: 'Cargos por encima del 2 % de las ventas en 2027' },
        { riesgo: 'Ejecución del cambio de modelo operativo y salida de directivos', tipo: 'Ejecución', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−8 %', mitigante: 'Consejero delegado con historial en Danaher', senal: 'Cartera de servicio a la baja (ya cae en seguridad)' },
        { riesgo: 'Litigios AFFF (lesiones personales) y amianto', tipo: 'Legal', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−3 %', mitigante: 'Seguros y acuerdo de 750 M ya pagado', senal: 'Nuevas provisiones en el 10-K' },
        { riesgo: 'EMEA y Oriente Medio', tipo: 'Macroeconómico', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−3 %', mitigante: 'EMEA es el 21 % de las ventas', senal: 'EMEA con crecimiento orgánico negativo' },
      ],
      premortem: 'Octubre de 2029: la acción vale 91 USD, un 40 % menos. Lo que pasó: en 2027 dos hiperescaladores recortaron su inversión tras unos años sin rentabilizar la IA, y los diseños de Nvidia para la generación siguiente se refrigeraron con agua templada sin enfriadoras. Los pedidos de Américas pasaron del +37 % al −10 % en tres trimestres; la cartera se convirtió, pero sin pedidos nuevos las ventas de 2028 se estancaron. El margen, que había subido por el volumen, retrocedió dos puntos, y la empresa volvió a anunciar una reestructuración «extraordinaria». El mercado dejó de pagar 25 veces un beneficio ajustado que no se convertía en ROIC y la acción volvió a su mediana de 20 veces sobre un BPA un 15 % menor. Lo habría anticipado la relación pedidos/ventas de Américas por debajo de 1 y la caída del crecimiento de la cartera.',
      ia: {
        exposicion: 'Media', sentido: 'Mixto', efecto_valor: '−10 % a +15 % a 3-5 años (bajista: −34 % sobre el DCF base si el ciclo se corta; alcista: +20 %)',
        comentario: 'La IA toca a JCI sobre todo por la demanda: los centros de datos son ya el 17-19 % de las ventas y el motor de la cartera récord, y la empresa quiere llevarlos a un tercio en 3-5 años [A8]. La amenaza no es que la IA sustituya su producto (las máquinas que enfrían y protegen edificios no se automatizan), sino dos riesgos de demanda: que el ciclo de inversión de los hiperescaladores se frene y que la tecnología de los chips reduzca la necesidad de enfriadoras (Nvidia, enero: −6,2 % en un día) [D11]. En el software de edificios (OpenBlue) la IA es una oportunidad y una amenaza moderada: nuevos entrantes pueden quitar margen a los controles propietarios. Señal: pedidos de Américas y diseños de referencia de Nvidia.',
      },
      confianza: 'Media',
    },
    esg: {
      materialidad: 'Lo material para JCI es la eficiencia energética de sus equipos (sus enfriadoras y bombas de calor son una palanca de descarbonización), los refrigerantes de bajo potencial de calentamiento que exige la regulación y la responsabilidad por productos peligrosos del pasado: espumas AFFF con PFAS de Tyco Fire Products y amianto [A1, B1]. Tiene un bono vinculado a la sostenibilidad con vencimiento en 2031 [C4].',
      controversias: 'Espumas AFFF: acuerdo de 750 M USD con los sistemas públicos de agua de EE. UU. en 2024, con demandas de lesiones personales pendientes [A6, A1]. Ciberataque con robo de datos en 2023 (27 M de costes en 2024) [A6]. Litigios por amianto heredados, cubiertos en parte por seguros [A1].',
      confianza: 'Media',
    },
    preguntas: {
      items: [
        { tema: 'Centros de datos', pregunta: '¿Qué parte de la cartera de 21.000 M es de centros de datos y con qué calendario de entrega?', por_que: 'Decide cuánto dura el crecimiento de dos dígitos.' },
        { tema: 'Tecnología', pregunta: '¿Qué contenido por megavatio tiene JCI en un centro de datos con refrigeración líquida sin enfriadora frente a uno con enfriadora?', por_que: 'Es el riesgo de Vera Rubin.' },
        { tema: 'Beneficio ajustado', pregunta: '¿Cuándo dejarán de existir los costes de transformación y la reestructuración por encima de 300 M al año?', por_que: 'Explican la distancia de un 25 % entre BPA ajustado y contable.' },
        { tema: 'Rentabilidad del capital', pregunta: '¿Qué objetivo de ROIC tiene la dirección y cuándo cubrirá el coste de capital con el fondo de comercio de Tyco?', por_que: 'El ROIC del 8,2 % está por debajo del WACC.' },
        { tema: 'Asignación de capital', pregunta: '¿Seguirán recomprando a 25 veces el beneficio o preferirán compras en refrigeración líquida?', por_que: 'El programa de opciones premia crecer en ventas.' },
        { tema: 'Servicio', pregunta: '¿Por qué cae la cartera de servicio en seguridad y qué parte del negocio de seguridad está en revisión?', por_que: 'El servicio es la parte defensiva.' },
      ],
      confianza: 'Media',
    },
    sentimiento: {
      temas: [
        { tema: 'JCI como ganador del frío de los centros de datos', postura: 'Alcista', peso: 'Alto', contraste: 'Coincide con los pedidos (+27 %), pero el precio ya descuenta un ciclo de diez años [E1, A3].' },
        { tema: 'Momento técnico y máximos de 52 semanas', postura: 'Alcista', peso: 'Medio', contraste: 'Sin contenido fundamental; refleja la entrada de inversores de impulso [E2].' },
        { tema: 'Valoración y dudas técnicas', postura: 'Dividida', peso: 'Medio', contraste: 'Los autores prudentes de Seeking Alpha coinciden con nuestro DCF: buena empresa a precio lleno [E1].' },
      ],
      lectura: 'El sentimiento es positivo y mejora: los foros celebran los máximos y la entrada en la lista de convicción de Goldman, y los autores de Seeking Alpha han pasado de «Mantener por las dudas técnicas» (julio) a «ser dueño de las partes difíciles del frío da fruto» (octubre) [E1, E2]. Va por delante de las cifras de calidad: nadie habla del ROIC ni de la reestructuración recurrente. Señal de prudencia.',
      confianza: 'Media',
    },
    valoracion: {},
  },
};
