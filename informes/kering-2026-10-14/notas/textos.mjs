// Textos del analista (Kering, corte 2026-10-14). Cifras del motor tal cual; hechos con cita de la nota ([A1] = fuente 1 de A.json).

const sintesis = `**La recomendación y por qué.** Mantener, con convicción baja. El objetivo a 12 meses es de 239,96 € (nuestro BPA recurrente de 2028e por el PER de la regla v3, que lleva el múltiplo adelantado de 20,8 veces a mitad de camino hacia su mediana de 21,1), una rentabilidad ponderada del 16,2 % con el dividendo y del 24,7 % en el caso base, con una asimetría de 1,77; el valor intrínseco es de 221,29 € (+5,8 %) y el objetivo medio de los analistas, 282,46 € [D7]. La regla a 12 meses da Comprar por poco, pero se queda en Mantener por dos motivos: la confianza en los datos de núcleo es baja (precio de media sesión del 7-oct, 209,10 €, sin cierre posterior; balance y flujos de agregadores, sin el principal de los arrendamientos) [D6, A7, A8], y la calidad no llega: el ROIC del 3,5 % está 4 puntos por debajo del WACC del 7,59 %. La convicción subiría con unas ventas del 3T (22-oct) con Gucci en positivo comparable y un cierre verificado por debajo de 211,27 €; bajaría si Gucci vuelve a caer más de un 5 %.

**El negocio.** Kering es Gucci (41 % de las ventas de 2025) más Saint Laurent, Bottega Veneta, joyería y gafas [A12]. Las ventas cayeron de 20.351 M en 2022 a 14.675 M en 2025 y el apalancamiento operativo llevó el margen recurrente del 27,5 % al 11,1 % [A2, A5]. Hoy no crea valor: ROIC del 3,5 % frente a un WACC del 7,59 %. Sostenibilidad del crecimiento: **En parte**. El 3,9 % anual que proyectamos no necesita capital nuevo (la reinversión es el 2 % del NOPAT) y deja la cuota casi igual (del 4,1 % al 4,2 % del mercado en 2033e), pero depende de que Gucci recupere volumen, algo que aún no se ve en las cifras (−5 % comparable en el semestre) [A1].

**Finanzas.** La deuda neta bajó de 8.000 M a 3.300 M en seis meses con la venta de Kering Beauté a L'Oréal por 4.000 M e inmuebles [A1]. La caja libre operativa sin inmobiliario fue de 1.800 M en el 1S26, pero no resta unos 1.100-1.200 M anuales de arrendamientos [A1].

**Equipo y gobierno.** Resta: Artémis controla el 59,3 % de los votos con el 42,3 % del capital, y la compra del 70 % de Valentino (3.400-4.000 M en 2028-2029) volverá a subir la deuda [C1, C8]. Luca de Meo ha cumplido lo que depende de él (deuda, tiendas) [C2, A1].

**Valoración.** El DCF da 245,33 € con un WACC del 7,59 %; el precio descuenta un crecimiento del 1,9 % anual en 2027-2033 frente al 4,8 % de nuestro base y una rentabilidad implícita del 8,3 %: no es exigente si el margen se recupera. Los comparables por PER (166,55 €) restan porque el BPA de Kering está en el suelo del ciclo. Nuestro BPA de 2028e (12,33 €) coincide con el consenso (12,56 €) [D1]: la diferencia con los analistas está en el múltiplo, no en las cifras.

**Riesgos y catalizadores.** El riesgo principal es que Gucci no vuelva a crecer: el bajista (130,53 € en el DCF, 146,16 € a 12 meses) supone ventas planas y margen 3 puntos por debajo. Catalizadores: ventas del 3T el 22-oct y resultados anuales en febrero de 2027. El sentimiento es negativo y empeora (−14,7 % en el mes, recortes de objetivos de Morgan Stanley y Citi) [D2, E1]: las expectativas están bajas.

**Qué cambiaría la decisión.** Compraríamos por debajo de 211,27 € con los datos confirmados (cierre oficial, informe semestral con arrendamientos) y Gucci en crecimiento comparable; venderíamos por encima de 269,95 €. Aun así, no pasaría el requisito de calidad de la cartera (ROIC − WACC ≥ 5) hasta que el margen operativo supere el 18-20 %.`;

const T = {
  limitaciones: 'Entorno sin descargas: todas las cifras salen de resultados de búsqueda con su fuente (comunicados de Kering vía MFN, GlobeNewswire y Euronext; Stock Analysis, MarketScreener y Fintel para cuentas, balance y flujos; Traders Union para cierres anuales). Cuenta en base recurrente (la de la empresa). 2025 sin Kering Beauté (actividad interrumpida); 2021-2024 con ella. Balance incompleto: sin clientes, proveedores ni deuda bruta de 2021-2023, por eso el ROIC de esos años no es significativo. Precio de media sesión del 7-oct-2026 (209,10 €), sin cierre posterior localizado. Comparables y transacciones del análisis de Hermès del 11-oct (MarketScreener a 8-oct), sin llevar al cierre del día. Beta 1,2, estimación propia (sin históricos de precios).',
  controles_explicados: [
    { control: 'Tipo impositivo efectivo razonable (2025)', explicacion: 'El 46,8 % de 2025 es estimación por diferencia sobre el beneficio recurrente (deterioros no deducibles y pérdidas sin crédito fiscal en marcas pequeñas); no se proyecta: el DCF usa el 28 %, cerca del 27,7-28,2 % de 2021-2023.' },
    { control: 'Comprar pendiente de confirmar', explicacion: 'Confianza baja: falta un cierre oficial posterior al 7-oct, el balance y los flujos del informe semestral (deuda bruta, arrendamientos y su principal pagado) y las cuentas del documento de registro universal. Con eso confirmado y el precio por debajo de 211,27 €, la señal pasaría a Comprar.' },
  ],
  secciones: {
    financieros: {
      comentario: 'De 2021 a 2022 las ventas crecieron un 15 % hasta 20.351 M con un margen operativo recurrente del 27,5 % [A5]. Desde entonces caen tres años seguidos: −4 % en 2023, −12 % en 2024 y −13 % en 2025 (−10 % comparable), hasta 14.675 M sin la belleza [A2, A3, A4]. El margen pasó del 27,5 % al 24,3 %, al 14,9 % y al 11,1 %: con costes de tiendas, publicidad y diseño casi fijos, cada punto de ventas perdido restó más de un punto de margen [A2, A3]. Gucci explica casi toda la caída: de unos 10.500 M de ventas en 2022 a 5.992 M en 2025, con un margen del 16,1 % [A12]. En el 1S26 el margen subió 0,4 puntos hasta el 12,8 % con ventas −3 % publicadas y +1 % comparables [A1]. 2025 no es comparable con 2021-2024 por la salida de Kering Beauté (2024 reexpresado: 16.874 M) [A6].',
    },
    trimestres: {
      ultima_presentacion: 'En la presentación del semestre (29-jul) Luca de Meo habló de «vuelta al crecimiento» por el +2 % comparable del 2T, el primero en tres años, y destacó la mejora secuencial de Gucci (ventas minoristas siete puntos mejor que en el 1T) y la caída de la deuda neta a 3.300 M [A1, A11]. En abril, con el 1T plano y Gucci −8 % comparable, el mensaje había sido de paciencia: reajuste estructural hasta finales de 2026 y reconstrucción hasta 2028 [A10, A17]. Las preguntas se centran en cuándo crecerá Gucci y en el margen del 2S, que la dirección solo promete superior al del 1S (12,8 %); no da objetivo de margen para Gucci, la crítica principal de la prensa financiera al plan [A1, C5].',
    },
    calidad: {
      comentario: 'Sin acceso al documento de registro universal no se han revisado las notas ni la opinión del auditor. Dos señales en las cifras: tres años con partidas no recurrentes (el beneficio publicado de 2025, −29 M, frente a 532 M recurrentes) y una caja libre que se apoya en ventas de inmuebles y activos (2.100 M en 2025; 797 M de inmobiliario y licencias en el 1S26) [A1, A2]. El motor no calcula Altman ni Beneish por falta de balance completo; el Piotroski de 5 sobre 9 es poco fiable por la misma razón.',
    },
    capital: {
      comentario: 'La asignación de capital de 2023-2024 fue mala: Creed (3.500 M), el 30 % de Valentino (1.700 M) y edificios en Milán, París y Nueva York se pagaron con deuda cuando las ventas ya caían, y la deuda neta llegó a unos 10.500 M [A3, A14]. La nueva dirección la está deshaciendo: la belleza se vendió a L\'Oréal por 4.000 M y parte del inmobiliario se ha revendido (2.100 M en 2025) [A1, A2]. El ROIC incremental es negativo y el dividendo ha bajado de 14 € a 3 € ordinarios. El compromiso con Valentino en 2028-2029 es la próxima prueba.',
    },
    multiplos_historicos: {
      comentario: 'El PER de los últimos 12 meses (48,2 veces) no sirve: el beneficio recurrente está un 86 % por debajo del de 2022. Por EV/EBITDA, 9,6 veces frente a una media de 7,4 en los años comparables (2021-2023): el mercado paga la recuperación del margen. Con el PER adelantado (precio de cierre ÷ BPA del año siguiente), Kering cotizó a 19-23 veces en 2020-2022, y hoy a 20,8 veces nuestro BPA de 2027e [D8].',
    },
    comparables: {
      criterio: 'Grupos europeos de lujo personal con cifras de MarketScreener del 8-oct (las del análisis de Hermès del 11-oct): Hermès, LVMH, Richemont, Moncler, Prada y Brunello Cucinelli [D17]. Fuera L\'Oréal (belleza, ya no es el negocio de Kering) y las marcas de moda accesible (Tapestry, Capri). Ninguno está en una recuperación de margen como Kering: los múltiplos sobre beneficio actual la penalizan.',
      comentario: 'Kering cotiza a 9,6 veces el EBITDA de los últimos 12 meses, por encima de LVMH (9,1) y Moncler (8,0) pero con un margen EBITDA del 25 % frente al 30-46 % del grupo [D17]. Por PER de los próximos 12 meses (24,8 veces) es de las más caras, porque su beneficio está en el suelo; el valor implícito por PER (166,55 €) es el método que más resta. Por EV/EBITDA, la mediana da 289,71 €. Usamos el DCF como método principal y los comparables con un 25 % de peso.',
    },
    transacciones: {
      comentario: 'Las operaciones del sector (Tiffany a 3,8 veces ventas, Belmond y Stone Island a 17-23 veces el EBITDA) son de marcas en crecimiento y llevan prima de control [D10-D12]. Kering no es comprable: Artémis tiene el 59,3 % de los votos. La venta de la belleza a L\'Oréal por 4.000 M sí sirve de referencia del valor de sus marcas fuera de la moda [D15]. Peso cero en la síntesis.',
    },
  },
  dcf_justificacion: {
    crecimiento: '2026e fijo en −2,0 %: 7.218 M en el 1S (−3 % publicado) y un 2S similar al de 2025 con divisas en contra [A1]. Después, 5-6 % en 2027-2029 (volumen de Gucci y de Saint Laurent, más 2 % de precio), por encima del mercado (3,5 % previsto) porque parte de una base hundida: las ventas de 2028e (16.007 M) siguen un 21 % por debajo de 2022 [B1, A5]. El consenso espera 15.700 M en 2027 y 16.800 M en 2028 [D1]: nuestro base va algo por debajo. Converge al 3 % en 2033e.',
    margenes: 'Margen EBITDA (con NIIF 16) del 27,0 % en 2026e, del 30,0 % en 2028e y del 33,0 % desde 2031e, frente al 36,7 % de 2021 y el 25,0 % de 2025 [A9, A2]. Equivale a un margen operativo del 16 % en 2028e y del 19 % al final, menos que el 27,5 % de 2022 y en línea con «más que duplicar el 11 %» del plan [C5]. El EBIT de 2028e (2.577 M) queda cerca del consenso (2.890 M) [D1].',
    inversion: 'Amortización del 13,9 % de las ventas (la de 2025, con derechos de uso) y capex del 12,5-14 % que suma el operativo (5,7 % en 2025) y las altas de derechos de uso de tiendas, porque los arrendamientos están en el puente [A8]. Circulante del 24-23 % de las ventas: solo existencias (25 % en 2025) porque no hay clientes ni proveedores; el plan prevé 1.000 M menos de existencias [A7, A17].',
    wacc: 'Bund a 10 años del 3,53 % [D18], beta 1,2 (estimación propia: lujo cíclico con deuda; sin históricos de precios en este entorno), prima de mercado del 5,5 % y coste de la deuda del 4,0 % antes de impuestos con un 35 % de deuda a valor de mercado (deuda bruta y arrendamientos frente a una capitalización de 25.636 M). WACC del 7,59 %. Con la prima implícita del mercado (4,2 %) el DCF sube a 318,61 €.',
    terminal: 'Gordon con un crecimiento del 2,0 %, el de la inflación en euros, por debajo de la tasa libre menos medio punto. El valor terminal pesa un 70 %. El múltiplo implícito es coherente con las 9-16 veces EBITDA de los comparables [D17].',
  },
  puente: {
    '2026e': 'Volumen −3 % (Gucci −5 % comparable en el 1S y cierre de al menos 100 tiendas), precio +2 % y divisas −1 % [A1, A17].',
    '2027e': 'Volumen +2,5 % con las colecciones de Demna en tienda todo el año y Saint Laurent y Bottega Veneta creciendo; precio +2 %; joyería y gafas +0,5 % de mezcla [A1, A10].',
    '2028e': 'Volumen +3,5 % en la fase de «reconstrucción» del plan; precio +2 %; mezcla +0,5 % [A17].',
    '2029e': 'Igual que 2028e: recuperación del cliente aspiracional, que el mercado perdió en 2023-2025 [B1].',
  },
  veredicto: 'En parte',
  sostenibilidad_justificacion: 'La proyección apenas necesita capital nuevo (reinversión del 2 % del NOPAT) y deja la cuota casi igual, del 4,1 % al 4,2 % del mercado en 2033e, así que ninguna prueba cuantitativa falla y no hace falta rebajar el base. Pero el crecimiento no sale de un foso que funcione hoy: Gucci perdió un 43 % de ventas en tres años y su poder de precios se agotó [A12, B1]. El ROIC (3,5 %) está por debajo del WACC y el ROIC incremental es negativo. Por eso «En parte»: financiable, pero dependiente de recuperar el deseo por la marca.',
  dcf_lectura: 'El DCF da 245,33 € por acción, un 17,3 % por encima del precio, con un WACC del 7,59 % y un valor terminal que pesa el 70 %. El DCF inverso dice que el precio descuenta un crecimiento del 1,9 % anual en 2027-2033 con nuestro margen, frente al 4,8 % de nuestro base, y una rentabilidad implícita del 8,3 %. No es exigente: basta con que las ventas recuperen la mitad de lo perdido en una década. La cifra depende del margen: si se queda 3 puntos por debajo, como en el bajista, el valor cae a 130,53 €. Con la prima implícita del mercado sube a 318,61 €; la diferencia es la beta de 1,2, que es una estimación.',
  narrativas: {
    Bajista: 'Gucci no recupera al cliente con Demna, como le pasó con Sabato De Sarno en 2023-2024: ventas planas en 2027-2028 y margen EBITDA 3 puntos por debajo (operativo del 13 %). La compra de Valentino en 2028 sube la deuda.',
    Base: 'Gucci deja de caer en 2026 y crece un 3-5 % desde 2027; Saint Laurent, Bottega Veneta, joyería y gafas crecen con el mercado. El margen operativo sube al 16 % en 2028 y al 19 % en 2031.',
    Alcista: 'Las colecciones de Demna funcionan como las de Michele en 2015-2017: ventas +7-8 % al año y margen operativo del 18 % en 2028, camino de la mitad del 30 % de 2019.',
  },
  escenarios_comentario: 'El alcista gana un 50,0 % en el DCF y el bajista pierde un 37,6 %; a 12 meses, +54,7 % frente a −28,7 %, con una asimetría de 1,77. Compensa solo si se cree que Gucci ha tocado fondo; el bajista es verosímil porque ya ocurrió en 2023-2025 con otro director creativo.',
  suma_partes_comentario: 'No aplica: las marcas comparten tiendas, logística y costes centrales y la empresa solo publica ventas por marca de Gucci desde 2026 [A10]. Las gafas (unos 1.600 M de ventas y un 15,8 % de margen) serían la única parte separable [A12].',
  oj: {
    Bajista: 'Ventas de 15.110 M en 2028e (+2 % y +3 %) con un margen EBITDA del 27 %: EBIT de 1.980 M, resultado financiero de −470 M, impuestos del 28 % y 20 M de minoritarios. BPA de 8,70 € sobre 122,6 M de acciones.',
    Base: 'Ventas de 16.007 M en 2028e (+5 % y +6 %) con un margen EBITDA del 30 % y amortización del 13,9 %: EBIT de 2.577 M, resultado financiero de −450 M (deuda neta baja tras la venta de la belleza), impuestos del 28 %. BPA de 12,33 €.',
    Alcista: 'Ventas de 16.620 M (+7 % y +8 %) con un margen EBITDA del 32 %: EBIT de 3.008 M, resultado financiero de −430 M. BPA de 14,98 €.',
  },
  diferencia_consenso: 'Nuestro BPA de 2028e (12,33 €) queda un 2 % por debajo del consenso (12,56 €) y el de 2027e (10,03 €) un 8 % por encima (9,30 €), por un tipo impositivo normalizado del 28 % [D1]. El objetivo base (257,70 €) queda un 8,8 % por debajo del objetivo medio de los analistas (282,46 €), que es de julio y está bajando (Morgan Stanley 250 €, Citi 243 € el 2-oct) [D2, D7]: la diferencia está en el múltiplo, no en el beneficio.',
  objetivo12m_comentario: 'El objetivo a 12 meses ponderado (239,96 €) queda un 8,4 % por encima del valor intrínseco (221,29 €), que pesa los comparables por PER sobre un beneficio deprimido. Para que el precio llegue al objetivo, el mercado tiene que creer en el BPA de 2028e, y eso pide ver a Gucci crecer: el 3T (22-oct) y los resultados anuales de febrero son los dos datos que lo dirán.',
  valoracion_comentario: 'Pesos: DCF 50 %, comparables 25 % y escenarios 25 %. El DCF es el método más fiable para una empresa en recuperación porque recoge la vuelta del margen; los comparables por PER la castigan (166,55 €) y por EV/EBITDA la premian (289,71 €), señal de que el beneficio está en el suelo. Sin transacciones (control de Artémis) ni suma de partes. La dispersión entre métodos (130-319 €) es amplia: el valor depende de un solo supuesto, el margen. Puente a 30-jun-2026: deuda bruta de 11.800 M, caja de 8.500 M y arrendamientos de 6.212 M [A1, A7]. El 30 % de Valentino y los minoritarios no tienen cifra localizada y van a cero (prudente: la participación vale unos 1.000-1.700 M, 8-14 € por acción).',
  rentabilidad_comentario: 'Kering no crea valor hoy: el ROIC de 2025 es del 3,5 % (NOPAT de 979 M sobre 27.947 M de capital invertido con arrendamientos) frente a un WACC del 7,59 % [A2, A7]. En 2024 fue del 9,2 %. Los ROIC de 2021-2023 del motor no son significativos: falta la deuda bruta de esos años y el capital invertido sale negativo o casi cero. Con los márgenes de 2022 (27,5 % operativo) el ROIC superaba con holgura el 20 %; la caída viene del margen, no de la rotación, que apenas baja de 0,41 a 0,35. LVMH tiene un ROIC del 12,7 % y Hermès del 55,1 % [D17]. El ROIC incremental es negativo: se invirtieron 6.000-7.000 M en compras e inmuebles mientras el beneficio caía [A3, A8].',
  catalizadores: {
    items: [
      { fecha: '2026-10-22', evento: 'Ventas del 3T26', efecto: 'Primera lectura del 2S y de Gucci con las colecciones de Demna', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2027-02', evento: 'Resultados de 2026 y dividendo', efecto: 'Margen del 2S (prometido por encima del 12,8 %) y caja libre sin inmobiliario', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2027-04', evento: 'Ventas del 1T27', efecto: 'Primer trimestre con Gucci comparable frente a una base débil (−8 %)', probabilidad: 'Alta', sentido: '+' },
      { fecha: '2026-2027', evento: 'Cierre de al menos 100 tiendas y reducción de 1.000 M de existencias', efecto: 'Mejora de la caja y del margen bruto', probabilidad: 'Media', sentido: '+' },
      { fecha: '2028', evento: 'Ventana de la opción de venta de Mayhoola sobre el 70 % de Valentino', efecto: 'Hasta 3.400-4.000 M de inversión y posible emisión de hasta 3 millones de acciones', probabilidad: 'Media', sentido: '−' },
    ],
    confianza: 'Media',
  },
  riesgos: {
    items: [
      { riesgo: 'Gucci no recupera al cliente', tipo: 'Negocio', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−38 % (escenario bajista del DCF)', mitigante: 'Saint Laurent, Bottega Veneta, joyería y gafas crecen', senal: 'Gucci con ventas comparables negativas en el 3T26 o el 4T26' },
      { riesgo: 'Margen que no recupera por costes fijos', tipo: 'Operativo', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−20 % por cada 2 puntos de margen EBITDA', mitigante: 'Cierre de tiendas y recorte de existencias', senal: 'Margen operativo recurrente del 2S26 por debajo del 12,8 %' },
      { riesgo: 'Compra de Valentino en 2028-2029', tipo: 'Financiero', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5/−10 % si se paga a múltiplo alto con una marca en declive', mitigante: 'Precio ligado a los resultados de Valentino', senal: 'EBITDA de Valentino y anuncio de Mayhoola' },
      { riesgo: 'China y turismo', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−10 %', mitigante: 'EE. UU. tira en 2026', senal: 'Ventas de Asia-Pacífico del 3T' },
      { riesgo: 'Datos de núcleo poco fiables en este informe', tipo: 'Análisis', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'Desconocido', mitigante: 'Cifras clave cuadradas con los comunicados', senal: 'Diferencias con el informe semestral' },
      { riesgo: 'Control de la familia Pinault', tipo: 'Gobierno', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: 'Descuento de control', mitigante: 'Consejero delegado independiente de la familia', senal: 'Operaciones con Artémis' },
    ],
    premortem: 'Octubre de 2029: la acción vale 125 €. Las colecciones de Demna recibieron buena crítica pero no movieron las ventas: Gucci siguió perdiendo un 3-5 % al año porque el cliente aspiracional no volvió al lujo y el rico prefirió marcas de lujo silencioso. Los recortes de tiendas sostuvieron el margen operativo en el 12-13 %, no en el 16 % previsto. En 2028 Mayhoola ejerció la venta del 70 % de Valentino y Kering pagó 3.500 M con deuda y acciones, justo cuando el beneficio no crecía; la deuda neta volvió a 7.000 M y el dividendo se recortó. El indicador que lo anticipaba: las ventas comparables de Gucci, que no pasaron a positivo en los cuatro trimestres siguientes a la primera colección de Demna.',
    confianza: 'Media',
  },
  preguntas: {
    items: [
      { tema: 'Gucci', pregunta: '¿Cuál es el margen operativo objetivo de Gucci en 2028 y con qué nivel de ventas?', por_que: 'El plan no lo da y es el supuesto del que depende todo el valor.' },
      { tema: 'Valentino', pregunta: '¿Cómo se calculará el precio del 70 % en 2028 y se pagará con acciones?', por_que: 'Puede devolver la deuda neta a 7.000 M o diluir hasta un 2,4 %.' },
      { tema: 'Arrendamientos', pregunta: '¿Cuánto suman los pagos de arrendamientos y cuánto bajan con el cierre de tiendas?', por_que: 'La caja libre publicada no los resta; son unos 1.100-1.200 M al año.' },
      { tema: 'Caja libre', pregunta: '¿Cuál es la caja libre recurrente sin inmuebles ni licencias en 2026?', por_que: 'Desde 2024 la caja libre se apoya en ventas de activos.' },
      { tema: 'No recurrentes', pregunta: '¿Cuándo dejan de repetirse los deterioros y costes de reestructuración?', por_que: 'El beneficio publicado lleva tres años por debajo del recurrente.' },
      { tema: 'Dividendo', pregunta: '¿Cuál es la política de reparto con la deuda ya en 3.300 M?', por_que: 'Define la rentabilidad para el accionista mientras dura la recuperación.' },
    ],
    confianza: 'Media',
  },
  resumen: {
    recomendacion: 'Mantener', conviccion: 'Baja',
    justificacion_recomendacion: null,
    horizonte: '12 meses',
    sintesis,
    tesis: 'Kering es el cuarto grupo mundial de lujo personal (14.675 M de ventas en 2025) y tiene marcas de primer nivel, pero Gucci, el 41 % de las ventas, perdió un 43 % en tres años y el margen operativo recurrente cayó del 27,5 % al 11,1 % [A2, A5, A12]. La nueva dirección ha vendido la belleza por 4.000 M y ha bajado la deuda neta a 3.300 M, y el grupo volvió a crecer un 2 % comparable en el 2T26 [A1].\n\nA 209,10 € el precio descuenta un crecimiento del 1,9 % anual hasta 2033 con nuestro margen, y cotiza a 20,8 veces nuestro BPA de 2027e, en su rango histórico de 19-23 veces sobre beneficio adelantado. El mercado no paga una recuperación completa: nuestro BPA de 2028e (12,33 €) coincide con el consenso y el objetivo medio de los analistas (282,46 €) baja [D1, D2].\n\nPara invertir hay que creer que Gucci ha tocado fondo con Demna y que el margen operativo vuelve al 16 % en 2028. Las cifras todavía no lo muestran (Gucci −5 % comparable en el semestre), por eso la tesis es una opción sobre el 3T y el 4T, no una certeza [A1].',
    vision_diferencial: {
      mercado_descuenta: 'Un crecimiento del 1,9 % anual con un margen que se recupera parcialmente, y un múltiplo que no premia la recuperación hasta verla en Gucci. Los analistas recortan objetivos antes del 3T [D2].',
      nuestra_vision: 'Coincidimos con el consenso en el beneficio de 2028e. Vemos un valor algo mayor que el precio (DCF de 245,33 €) porque el balance ya está saneado y la caja libre sin inmuebles es positiva, pero no tenemos una visión distinta sobre Gucci.',
      por_que: 'Nuestra ventaja es solo de paciencia: si el margen vuelve al 16 %, el precio está bajo. No sabemos más que el mercado sobre la marca; por eso la convicción es baja.',
    },
    a_favor: [
      '**Balance saneado**: deuda neta de 3.300 M tras la venta de la belleza por 4.000 M [A1].',
      '**Vuelta al crecimiento**: +2 % comparable en el 2T26, el primero en tres años [A1].',
      '**Margen con mucho recorrido**: 11,1 % en 2025 frente al 27,5 % de 2022 [A2, A5].',
      '**Precio poco exigente**: descuenta un crecimiento del 1,9 % frente al 4,8 % de nuestro base.',
      '**Marcas sanas además de Gucci**: Saint Laurent y Bottega Veneta crecen; gafas +7 % comparable en el 1T26 [A10].',
    ],
    en_contra: [
      '**Gucci sigue cayendo**: −5 % comparable en el 1S26 [A1].',
      '**No crea valor**: ROIC del 3,5 % frente a un WACC del 7,59 %.',
      '**Valentino**: compra del 70 % por 3.400-4.000 M en 2028-2029 [A14].',
      '**Control familiar**: Artémis tiene el 59,3 % de los votos con el 42,3 % del capital [C1].',
      '**Caja libre apoyada en ventas de activos**: 2.100 M de inmuebles en 2025 [A2].',
    ],
    que_vigilar: 'La tesis depende de que Gucci vuelva a crecer en ventas comparables entre el 4T26 y el 2T27, cuando sus colecciones nuevas lleven un año en tienda. La señal de que no se cumple: dos trimestres seguidos de Gucci por debajo del −3 % comparable o un margen operativo del 2S26 por debajo del 12,8 % del 1S.',
    cambiaria_recomendacion: [
      'Si las ventas comparables de Gucci del 3T26 (22-oct) pasan a positivo y el precio sigue por debajo de 211,27 €, con los datos confirmados en fuente primaria, pasaríamos a Comprar.',
      'Si Gucci cae más de un 5 % comparable en el 3T26 o el 4T26, rebajaríamos el base y probablemente a Vender por encima de 230 €.',
      'Por encima de 269,95 € la regla da Vender.',
      'Si Mayhoola ejerce la venta de Valentino a un precio superior a 4.000 M, revisaríamos el valor a la baja.',
    ],
    kpis_seguimiento: [
      { kpi: 'Ventas comparables de Gucci', nivel_actual: '−5 % (1S26)', umbral_alerta: '< −3 % dos trimestres seguidos', por_que: 'Es el 41 % de las ventas y casi todo el riesgo.' },
      { kpi: 'Margen operativo recurrente del grupo', nivel_actual: '12,8 % (1S26)', umbral_alerta: '< 12,8 % en el 2S26', por_que: 'El base supone un 16 % en 2028.' },
      { kpi: 'Deuda financiera neta', nivel_actual: '3.300 M (jun-26)', umbral_alerta: '> 5.000 M antes de Valentino', por_que: 'Mide si la caja libre sin activos es real.' },
      { kpi: 'Crecimiento comparable del grupo', nivel_actual: '+2 % (2T26)', umbral_alerta: '< 0 %', por_que: 'Confirma o desmiente la vuelta al crecimiento.' },
    ],
    confianza: 'Baja',
  },
  fuentes: [],
  huecos: [
    { seccion: 'rentabilidad', campo: 'ROIC 2021-2023', tipo: 'Complemento', intentos: '1) informes anuales (no descargables); 2) Stock Analysis (sin deuda bruta de esos años); 3) cálculo propio (imposible sin deuda bruta)', decision: 'Omitido' },
  ],
};

export default T;
