// Textos del analista (Kering, corte 2026-10-26). Cifras del motor tal cual; hechos con la letra de la nota ([A1] = fuente 1 de A.json; [P1] = propia).

const sintesis = `**La recomendación y por qué.** Mantener, con convicción baja. El objetivo a 12 meses es de 166,41 € ponderado y 163,36 € en el caso base: una rentabilidad del −4,9 % ponderada y del −6,6 % en el base, con el dividendo. Decide la regla v2 porque la historia limpia del PER adelantado solo tiene tres años (2020-2022) y el selector toma la más baja; con la v3 sin selector la ponderada sería del 17,4 % (base 27,2 %), pero ni así daría Comprar porque el valor intrínseco, 176,07 € (−1,2 %), no llega al precio de 178,12 € (cierre del 23-oct). El objetivo medio de los analistas, 249,72 €, es anterior al 3T [P1, D5]. Las dos reglas del valor intrínseco discrepan (Mantener con nuestro WACC del 8,69 %, Comprar con la prima implícita del mercado, que no basta porque con nuestro WACC la rentabilidad total es del 0,5 %), por eso la convicción es baja. Compraríamos por debajo de 147,32 €; venderíamos por encima de 188,24 €.

**Qué ha cambiado desde el informe del 14-oct.** El 22-oct Kering publicó un 3T peor de lo esperado en lo que importa: Gucci −6 % comparable y −9 % en tiendas propias, retirada del objetivo de volver a crecer en 2026 y un margen del 2S que no superará el 12,8 % del 1S [A1, A12]. La acción cayó un 16,6 % el 23-oct. Hemos rebajado el crecimiento de 2027e del 5 % al 2,5 % y el BPA recurrente de 2028e de 12,33 € a 10,21 €. Además, el análisis se ha rehecho con fuente primaria (documento de registro universal 2025 e informe semestral) y con tres cambios de método: beta reapalancada con la deuda propia (1,44 en vez de 1,2 estimada; WACC del 8,69 % frente al 7,59 %), circulante a su nivel real (16,5 % de las ventas) y un puente completo (minoritarios, 30 % de Valentino y el sobreprecio de su opción de compra, que antes iban a cero) [A3, A5, D18]. La señal sigue en Mantener, pero ahora con rentabilidad negativa a 12 meses en lugar del +12 % de antes.

**El negocio.** Kering es Gucci más Saint Laurent, Bottega Veneta, joyería y gafas; las ventas cayeron de 20.351 M en 2022 a 14.675 M en 2025 y el margen operativo recurrente, del 27,5 % al 11,1 % [A8, A6]. Hoy no crea valor: ROIC del 3,2 % frente a un WACC del 8,69 %, cuando en 2021-2022 era del 19,8 %. Sostenibilidad del crecimiento: **En parte**: el 3,3 % anual proyectado apenas necesita capital y deja la cuota en el 4,0 % del mercado, pero depende de que Gucci recupere el deseo, y el 3T dice que aún no.

**Finanzas.** La deuda neta bajó a 3.324 M en junio con la venta de Kering Beauté; con arrendamientos es de 9.427 M, 2,6 veces el EBITDA [A3]. En 2028-2029 llega la opción de Mayhoola sobre el 70 % de Valentino, unos 4.000 M [A3].

**Valoración.** El DCF da 170,23 € (−4,4 %); el precio descuenta un crecimiento del 4,7 % anual en 2027-2033 frente al 4,1 % de nuestro base, y una rentabilidad implícita del 8,5 %: está valorada con justicia si la recuperación es la nuestra, sin margen de seguridad. Nuestro BPA de 2028e queda un 14 % por debajo del consenso (11,94 €), que aún no recoge el 3T [D5].

**Riesgos y catalizadores.** El riesgo principal es que Gucci no vuelva a crecer: el bajista (79,90 € en el DCF, 106,86 € a 12 meses) supone ventas casi planas y 3 puntos menos de margen. Catalizadores: la colección Gucci Core del 4T y los resultados anuales de febrero de 2027. El sentimiento de los particulares está cerca de la capitulación [E1, E2], y el de los analistas gira a la prudencia [D8].

**Qué cambiaría la decisión.** Un precio por debajo de 147,32 € con el base intacto, o un 4T con Gucci mejor que −3 % en tiendas propias y el margen del 2S en el 12,8 %, que subiría el BPA de 2027e y alargaría la historia. Por encima de 188,24 € la regla da Vender.`;

const T = {
  limitaciones: 'Cuenta en base recurrente (la de la empresa) en todo el informe: historia del PER y BPA de los escenarios en la misma base. 2021-2023 del XBRL del regulador (ESEF) y de los comunicados anuales; 2024-2025 del documento de registro universal 2025 (2024 reexpresado sin Kering Beauté; el ESEF de 2024-2025 no está en filings.xbrl.org). Precio: cierre del 23-oct-2026 (178,12 €); la sesión del 26-oct no había cerrado al terminar. El consenso de BPA (MarketScreener) y el objetivo medio (Stock Analysis/S&P Global) son anteriores al 3T: tras el recorte de guía, el consenso bajará. Comparables al cierre del 23-oct con estimaciones de MarketScreener del 21-oct. La participación del 30 % en Valentino y el sobreprecio de la opción sobre el 70 % restante son estimaciones propias. Reddit no es accesible desde este entorno.',
  controles_explicados: [
    { control: 'Tipo impositivo efectivo razonable (2025)', explicacion: 'El 42,1 % de 2025 recoge la contribución excepcional sobre el beneficio de las grandes empresas francesas y pérdidas sin crédito fiscal en marcas pequeñas; en el 1S26 el tipo sobre el resultado recurrente fue del 32,5 % [A3]. No se proyecta: el DCF y los BPA usan el 30 %, entre el 28 % de 2021-2023 y el del 1S26.' },
    { control: 'Caja proyectada coherente con la histórica', explicacion: 'La media real de 2023-2025 está hundida por 3.300 M de inmuebles comprados en 2023-2024 y por las compras de Creed y Valentino [A5, A7]. Sin inmuebles ni compras, 2025 dejó 1.194 M (flujo operativo de 3.100 M − capex de 830 M − arrendamientos de 1.076 M) [A5]. El DCF de 2026e (1.680 M) suma 230 M de circulante liberado, en línea con el plan de bajar 1.000 M de existencias y los 602 M liberados en el 1S26 [A3, A17].' },
    { control: 'Regresión múltiplo-crecimiento explicativa (R² ≥ 0,3)', explicacion: 'En el lujo el múltiplo lo explica la calidad de la marca (Hermès) más que el crecimiento; el valor de la regresión no se usa.' },
    { control: 'Comparables estables al quitar una empresa', explicacion: 'Hermès y Richemont cotizan a 15-16 veces el EBITDA y el resto a 7-9: la mediana depende de quién se quite. Por eso los comparables pesan un 25 % y se promedian EV/EBITDA y PER.' },
    { control: 'Comparables: EV/EBITDA y PER coherentes', explicacion: 'Kering amortiza el 13,9 % de sus ventas (con los derechos de uso de tiendas) frente a un 8 % en 2022: el EBITDA la favorece (256,63 €) y el PER sobre un beneficio en el suelo la castiga (156,60 €). Se usa la media de los dos con peso del 25 %; el DCF, que proyecta la vuelta del margen, pesa el 50 %.' },
    { control: 'Crecimiento del BPA base ≤ 25 % anual desde el último real', explicacion: 'El BPA de 2025 (4,34 €) está deprimido por un margen del 11,1 % y un tipo impositivo del 42 %; con el margen ya confirmado por encima del 11,1 % y el tipo normal, 2026e queda en torno a 6,3 € (consenso de S&P Global: 6,14 €) [P1]. De ahí a 10,21 € en 2028e es recuperación de margen (del 12,4 % al 15,8 % operativo), no volumen. Se explica en el objetivo a 12 meses.' },
  ],
  secciones: {
    comparables: {
      comentario: 'Kering cotiza a 9,1 veces el EBITDA de los últimos 12 meses, por encima de LVMH (8,4), Moncler (7,9) y Prada (6,9) y muy por debajo de Hermès (16,0) y Richemont (15,4), con un margen EBITDA del 25,3 % frente al 27-47 % del grupo [D21, D23]. Por PER de los próximos 12 meses (21,8 veces) es más cara que LVMH (16,3) o Prada (13,6) porque su beneficio está en el suelo. Ninguno de los comparables está en una recuperación de margen como la de Kering, así que los múltiplos sobre el beneficio actual la penalizan y los de EBITDA la favorecen: la media de los dos (206,62 €) pesa un 25 % en la síntesis.',
    },
  },
  per_excluidos: 'PER adelantado (regla v3), en base RECURRENTE, igual que el BPA de los escenarios: precio de cierre de cada año ÷ BPA recurrente del año siguiente. Serie: dic-2020 22,0x (594,40 ÷ 26,98); dic-2021 23,3x (706,90 ÷ 30,39); dic-2022 19,0x (475,50 ÷ 25,01). Excluidos por BPA atípico (el beneficio cayó un 61 % en 2024 y un 56 % en 2025 y el mercado pagaba la recuperación, no el beneficio): dic-2023 40,5x (399,00 ÷ 9,84) y dic-2024 54,9x (238,25 ÷ 4,34); dic-2025 aún no tiene BPA real del año siguiente [D11, A5, A6, A7, A8]. Mediana 22,0x y mínimo 19,0x de los tres años limpios; media larga 21,4x. Historia de 3 años: decide la más baja de v3 y v2 (selector). Actual = 178,12 ÷ 8,13 (nuestro BPA recurrente de 2027e) = 21,9x.',
  per_excluidos_v2: 'PER al cierre en base recurrente (precio de cierre ÷ BPA del mismo año): 2021 26,2x; 2022 15,6x; 2023 16,0x. Excluidos los años con BPA atípico, los mismos que en la serie adelantada: 2020 37,7x (BPA de la pandemia), 2024 24,2x (BPA −61 %) y 2025 69,4x (BPA −56 %). Con 2024 dentro, la mediana sería 20,1x y la ponderada rondaría el +8 %: la señal seguiría en Mantener.',
  dcf_justificacion: {
    crecimiento: '2026e fijo en −2,0 %: 10.565 M en nueve meses (1T 3.568, 2T 3.652 y 3T 3.345 M) y un 4T de unos 3.830 M (−2 % frente a 3.905 M), porque octubre va como el 3T y el mayorista de Gucci será más negativo [A1, A12]. Después, 2,5 % en 2027e (antes 5 %: el 3T retrasa la vuelta de Gucci), 4,5-5 % en 2028-2030 y convergencia al 3 % en 2033e, algo por encima del mercado (3,5 %) porque parte de una base hundida: las ventas de 2028e (15.404 M) siguen un 24 % por debajo de 2022 [B2, A8]. El consenso previo al 3T esperaba 15.493 M en 2027 y 16.488 M en 2028 [D5].',
    margenes: 'Margen EBITDA (con NIIF 16) del 26,3 % en 2026e (margen operativo del 12,4 %: mejora sobre el 11,1 % de 2025 sin superar el 12,8 % del 1S en el 2S, como dijo la empresa [A1]), 29,0 % en 2028e y 32,0 % desde 2031e. La amortización baja del 13,9 % al 11,5 % de las ventas porque las tiendas y los derechos de uso no crecen con las ventas (era el 8,2 % en 2022) [A8]: el margen operativo final es del 20,5 %, por debajo del «más del 22 %» del plan ReconKering y del 27,5 % de 2022 [D4, A8].',
    inversion: 'Capex del 12,5 % de las ventas (12,0 % desde 2031e): el operativo (5-6 % según el plan) más los pagos de arrendamientos (7,3 % en 2025), porque los arrendamientos están en el puente [A5, D4]; en 2021-2022, con más ventas, el total era del 9,5 %. Circulante del 16,5 % de las ventas, su nivel real (existencias, clientes y proveedores: 14,8-17,9 % en 2021-2025 y 16,3 % en junio de 2026) [A3, A5].',
    wacc: 'Bund a 10 años del 3,39 % (23-oct) [D32]. Beta reapalancada con la deuda propia: la ajustada de 5 años (1,32) [D11] se desapalanca con la deuda neta media con arrendamientos sobre capitalización de 2021-2025 (28 %) hasta 1,10 y se reapalanca con la de hoy (9.427 M sobre 21.846 M, 43 %): 1,44. Prima de mercado del 5,5 % y coste de los fondos propios del 11,31 %. Coste de la deuda del 3,6 % antes de impuestos (bonos BBB+) con un 30 % de deuda: WACC del 8,69 %. Con la prima implícita del mercado (4,2 %), el WACC baja al 7,38 % y el DCF sube a 236,08 €.',
    terminal: 'Gordon con un crecimiento del 2,0 %, la inflación en euros, por debajo de la tasa libre. El valor terminal pesa el 66 % y su múltiplo implícito es de 6,4 veces el EBITDA, por debajo de los comparables (7-16 veces) [D21].',
  },
  puente: {
    '2026e': 'Volumen −2,5 % (Gucci −6 % comparable en el 3T y al menos 125 cierres netos de tiendas), precio +2 % y divisas −1,5 % (el 3T publicado fue +0 % con −1 % comparable) [A1, A2].',
    '2027e': 'Volumen +0,5 %: Gucci aún en negativo el primer semestre y Saint Laurent con director creativo nuevo; precio +2 % [A1, D8].',
    '2028e': 'Volumen +2 % en la fase de «reconstrucción» del plan; precio +2 %; mezcla de joyería y gafas +0,5 % [D4].',
    '2029e': 'Volumen +2,5 %, precio +2 % y mezcla +0,5 %: recuperación de parte del cliente aspiracional perdido en 2023-2025 [B2].',
  },
  veredicto: 'En parte',
  sostenibilidad_justificacion: 'Ninguna prueba cuantitativa falla: la proyección apenas necesita inversión neta (reinversión del 1 % del NOPAT), el crecimiento medio del 3,3 % es inferior al de un mercado que crece un 3,5 % y la cuota baja del 4,1 % al 4,0 % en 2033e. Pero el crecimiento no sale de un foso que funcione hoy: Gucci perdió más del 40 % de sus ventas en tres años, el ROIC (3,2 %) está por debajo del WACC y el ROIC incremental es negativo (−9,9 %). Por eso «En parte»: financiable, pero dependiente de que la marca recupere el deseo, algo que el 3T todavía no muestra [A1].',
  dcf_lectura: 'El DCF da 170,23 € por acción, un 4,4 % por debajo del precio, con un WACC del 8,69 % y un valor terminal que pesa el 66 %. El DCF inverso dice que el precio descuenta un crecimiento del 4,7 % anual en 2027-2033 con nuestro margen, frente al 4,1 % de nuestro base, y una rentabilidad implícita del 8,5 %, algo menos que el WACC: el precio ya paga una recuperación un poco mejor que la nuestra. Con WACC y crecimiento ± 0,5 puntos el valor va de 140,62 € a 210,09 €. Con la prima implícita del mercado sube a 236,08 €: la diferencia es la beta de 1,44, reapalancada con la deuda de hoy, que incluye 6.103 M de arrendamientos.',
  narrativas: {
    Bajista: 'Gucci no recupera al cliente con Demna, como pasó con Sabato De Sarno en 2023-2024: ventas casi planas en 2027-2028 y margen EBITDA 3 puntos por debajo (operativo del 13 % en 2028). Saint Laurent pierde tracción con el cambio de director creativo y la compra de Valentino en 2028 vuelve a subir la deuda.',
    Base: 'Gucci deja de caer en 2027 y crece desde 2028; Saint Laurent, Bottega Veneta, joyería y gafas crecen con el mercado. El margen operativo sube del 12,4 % de 2026 al 15,8 % en 2028 y al 20,5 % al final, por debajo del objetivo del plan.',
    Alcista: 'La colección Gucci Core del 4T amplía la clientela y Gucci vuelve a crecer en 2027: ventas +4,5 % y +6,5 % en 2027-2028 y margen operativo del 17,8 % en 2028, camino del 22 % del plan.',
  },
  escenarios_comentario: 'En el DCF el alcista gana un 27,2 % y el bajista pierde un 55,1 %: asimetría de 0,49. A 12 meses, con la regla v2, el alcista da 243,37 € y el bajista 106,86 €, una asimetría de 0,92. El bajista es verosímil porque ya ocurrió en 2023-2025 con otro director creativo, y el 3T lo ha acercado. No compensa entrar a este precio sin ver antes la vuelta de Gucci.',
  suma_partes_comentario: 'No aplica: las marcas comparten tiendas, logística y costes centrales. Kering solo publica cuentas por marca de forma parcial (Gucci, Saint Laurent, Bottega Veneta, otras marcas y gafas) [A3]; las gafas serían la única parte separable.',
  oj: {
    Bajista: 'Ventas de 14.525 M en 2028e (−0,5 % y +1,5 % en 2027-2028) con un margen EBITDA del 26,0 % y una amortización del 13,2 %: EBIT de 1.859 M; resultado financiero de −580 M; impuestos del 30 %; 55 M de minoritarios. BPA recurrente de 6,85 € sobre 122,6 M de acciones.',
    Base: 'Ventas de 15.404 M en 2028e (+2,5 % y +4,5 %) con un margen EBITDA del 29,0 % y una amortización del 13,2 %: EBIT de 2.434 M; resultado financiero de −560 M (−280 M en el 1S26, de ellos −120 M de arrendamientos) [A3]; impuestos del 30 %; 60 M de minoritarios. BPA recurrente de 10,21 €. El de 2027e, con el que se calcula el PER actual, es de 8,13 €.',
    Alcista: 'Ventas de 16.006 M (+4,5 % y +6,5 %) con un margen EBITDA del 31,0 %: EBIT de 2.849 M; resultado financiero de −540 M; impuestos del 30 %; 70 M de minoritarios. BPA recurrente de 12,61 €.',
  },
  diferencia_consenso: 'Nuestro BPA de 2028e (10,21 €) queda un 14 % por debajo del consenso (11,94 €) y el de 2027e (8,13 €) un 8 % por debajo (8,85 €), porque el consenso es anterior al 3T [D5]. El objetivo base (163,36 €) queda un 34,6 % por debajo del objetivo medio de los analistas (249,72 €); la mayor parte de la diferencia está en el múltiplo: la regla v2 usa la mediana del PER al cierre de 2021-2023 (16,0x), mientras los analistas siguen pagando la recuperación.',
  objetivo12m_comentario: 'El objetivo a 12 meses ponderado (166,41 €) queda un 5,5 % por debajo del valor intrínseco (176,07 €) y los dos por debajo del precio. El BPA base de 2028e supone crecer un 33 % anual desde los 4,34 € de 2025, pero casi todo es margen y tipo impositivo: 2025 tuvo un margen operativo del 11,1 % y un tipo del 42 %; con el margen de 2026 ya confirmado por encima del 11,1 % y el tipo normal, 2026e ronda los 6,3 € (6,14 € del consenso de S&P Global) [P1], y de ahí a 2028e el crecimiento es del 27 % anual con ventas que solo suben un 7 % en dos años. Con la v3 la ponderada sería del 17,4 %, pero la historia limpia es de tres años y el selector toma la más baja.',
  valoracion_comentario: 'Pesos: DCF 50 %, comparables 25 % y escenarios 25 %. El DCF es el método más fiable para una empresa en recuperación porque recoge la vuelta del margen; los comparables por PER la castigan (156,60 €) y por EV/EBITDA la premian (256,63 €). Sin transacciones (Artémis controla el 59,3 % de los votos) ni suma de partes. Puente a 30-jun-2026: deuda bruta de 11.804 M, caja de 8.480 M y arrendamientos de 6.103 M; minoritarios (880 M) y pensiones (100 M) restan; el 30 % de Valentino y otras participadas suman 1.296 M; el sobreprecio estimado de la opción sobre el 70 % de Valentino (unos 4.000 M en 2028-2029 por una marca que pierde dinero) resta 2.200 M, 18 € por acción [A3, D18].',
  rentabilidad_comentario: 'Kering no crea valor hoy: el ROIC de 2025 es del 3,2 % (NOPAT de 979 M sobre 31.060 M de capital invertido con arrendamientos) frente a un WACC del 8,69 % [A5]. En 2021-2022 era del 19,8 %. La caída viene de los dos lados: el margen operativo pasó del 27,5 % al 11,1 % y la rotación del capital, de 0,63 a 0,35, porque el capital invertido subió un 53 % (Creed, el 30 % de Valentino, 3.300 M de inmuebles) mientras las ventas caían [A7, A8]. El ROIC incremental es negativo (−9,9 %). Los comparables con márgenes EBITDA del 27-47 % (LVMH, Hermès, Moncler) tienen rentabilidades muy superiores [D21]. Para volver a crear valor necesita un margen operativo de más del 18 %, que nuestro base alcanza en 2030e.',
  catalizadores: {
    items: [
      { fecha: '2026-11', evento: 'Nombramiento de los directores creativos de Saint Laurent y McQueen', efecto: 'Continuidad o ruptura en la marca que más margen aporta tras Gucci', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2027-02', evento: 'Resultados de 2026, dividendo y primera lectura de Gucci Core (4T)', efecto: 'Margen del 2S, caja libre sin inmuebles y tendencia de Gucci en tiendas propias', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2027-04', evento: 'Ventas del 1T27', efecto: 'Gucci frente a una base débil; primera prueba de la guía de 2027', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2027-07', evento: 'La licencia de belleza de Gucci pasa a L\'Oréal', efecto: 'Regalías nuevas desde mediados de 2027', probabilidad: 'Alta', sentido: '+' },
      { fecha: '2028', evento: 'Ventana de la opción de Mayhoola sobre el 70 % de Valentino', efecto: 'Hasta unos 4.000 M de inversión en una marca con pérdidas', probabilidad: 'Media', sentido: '−' },
    ],
    confianza: 'Media',
  },
  riesgos: {
    items: [
      { riesgo: 'Gucci no recupera al cliente', tipo: 'Negocio', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−55 % (escenario bajista del DCF)', mitigante: 'Joyería (+11 % en el 3T) y gafas crecen; Bottega Veneta resiste', senal: 'Gucci en tiendas propias por debajo del −5 % en el 4T26' },
      { riesgo: 'Margen que no recupera por costes fijos', tipo: 'Operativo', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '≈ −15 % del DCF por cada 2 puntos de margen EBITDA', mitigante: 'Al menos 125 cierres netos de tiendas y menos existencias', senal: 'Margen operativo recurrente de 2026 por debajo del 12 %' },
      { riesgo: 'Cambio de directores creativos en Saint Laurent y McQueen', tipo: 'Negocio', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5/−10 % si Saint Laurent pierde tracción', mitigante: 'La marca vendía bien con equipos estables', senal: 'Ventas de Saint Laurent en el 1S27' },
      { riesgo: 'Compra de Valentino en 2028-2029', tipo: 'Financiero', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−18 € por acción ya en el puente; más si se paga por encima de 4.000 M', mitigante: 'Precio ligado a los resultados de Valentino', senal: 'Resultados de Valentino y comunicaciones de Mayhoola' },
      { riesgo: 'China, Europa y el turismo', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−10 %', mitigante: 'Norteamérica y Japón aguantan', senal: 'Ventas de Asia-Pacífico y Europa Occidental del 4T' },
      { riesgo: 'Control de la familia Pinault', tipo: 'Gobierno', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: 'Descuento de control', mitigante: 'Consejero delegado independiente de la familia', senal: 'Operaciones con Artémis o más acciones pignoradas' },
    ],
    premortem: 'Octubre de 2029: la acción vale 110 €. Gucci Core gustó en las críticas, pero las tiendas propias siguieron cayendo un 3-6 % al año porque el cliente aspiracional no volvió y el rico prefirió el lujo discreto. Saint Laurent perdió tracción con su nuevo director creativo y el grupo dejó de tener una marca que creciera. Los cierres de tiendas sostuvieron el margen operativo en el 12-13 %, lejos del 15,8 % previsto para 2028. En 2028 Mayhoola ejerció la venta del 70 % de Valentino y Kering pagó cerca de 4.000 M con deuda cuando el beneficio no crecía; el dividendo se recortó. Las señales estaban en el 3T26: Gucci −9 % en tiendas propias y la retirada del objetivo de crecer.',
    ia: { exposicion: 'Baja', sentido: 'Mixto', efecto_valor: '±3 %', comentario: 'El lujo vende artesanía, escasez y deseo, que la IA no sustituye: la parte de las ventas expuesta es pequeña. La IA toca sobre todo costes y procesos: previsión de demanda y de existencias (Kering quiere bajar 1.000 M de existencias), personalización del marketing, atención al cliente y diseño de producto. Del lado de las ventas hay una oportunidad acotada: las gafas conectadas con Google, previstas para 2027, sin cifras todavía [B9, D4]. El riesgo es indirecto: que los agentes de compra y las búsquedas con IA resten tráfico a las tiendas propias o abaraten las marcas aspiracionales. Señal: ventas de las gafas conectadas y peso del canal digital en las tiendas propias.' },
    confianza: 'Media',
  },
  preguntas: {
    items: [
      { tema: 'Gucci', pregunta: '¿Qué margen operativo y qué ventas espera para Gucci en 2028?', por_que: 'El plan no da cifras de Gucci y de ese supuesto depende casi todo el valor.' },
      { tema: 'Guía de 2026', pregunta: '¿Por qué desapareció el objetivo de volver a crecer en 2026 y qué espera para 2027?', por_que: 'Es el segundo objetivo retirado del año; la credibilidad de la guía cuenta en el múltiplo.' },
      { tema: 'Valentino', pregunta: '¿Cómo se calculará el precio del 70 % en 2028 y cómo se pagará?', por_que: 'Unos 4.000 M pueden devolver la deuda neta a 7.000 M.' },
      { tema: 'Saint Laurent', pregunta: '¿Qué continuidad tendrá el estilo de Saint Laurent con el nuevo director creativo?', por_que: 'Es la marca que más aporta al margen después de Gucci.' },
      { tema: 'Arrendamientos', pregunta: '¿Cuánto bajan los pagos de arrendamientos con los 125 cierres netos de tiendas?', por_que: 'Son unos 1.076 M al año y la caja libre publicada no los resta.' },
      { tema: 'Europa', pregunta: '¿Qué explica la evolución de Europa Occidental en el 3T y qué espera para el turismo?', por_que: 'La respuesta en la conferencia quedó pendiente.' },
    ],
    confianza: 'Media',
  },
  resumen: {
    recomendacion: 'Mantener', conviccion: 'Baja',
    justificacion_recomendacion: null,
    horizonte: '12 meses',
    sintesis,
    tesis: 'Kering es el cuarto grupo mundial de lujo personal (14.675 M de ventas en 2025) con marcas de primer nivel, pero Gucci perdió más del 40 % de sus ventas en tres años y el margen operativo recurrente cayó del 27,5 % al 11,1 % [A6, A8]. La dirección de Luca de Meo ha saneado el balance (deuda neta de 3.324 M tras vender la belleza) y recorta tiendas y existencias, pero el 3T26 enseñó que Gucci sigue cayendo: −6 % comparable y −9 % en tiendas propias [A1, A3].\n\nA 178,12 € el precio descuenta un crecimiento del 4,7 % anual hasta 2033 con nuestro margen, algo más que nuestro base, y cotiza a 21,9 veces nuestro BPA de 2027e, en la parte alta de su historia limpia (19-23 veces). No es caro si el margen vuelve al 20 %, pero tampoco hay margen de seguridad: el valor intrínseco es de 176,07 €.\n\nPara invertir hay que creer que la colección Gucci Core del 4T devuelve el crecimiento a la marca en 2027. Las cifras todavía no lo muestran y la empresa ya no lo promete; por eso la tesis es una espera, no una compra.',
    vision_diferencial: {
      mercado_descuenta: 'El precio ya incorpora la caída del 3T (−16,6 % en un día) y una recuperación del margen algo mejor que la de nuestro base; el consenso de analistas, aún sin actualizar, espera un BPA de 11,94 € en 2028 [D5].',
      nuestra_vision: 'Somos más prudentes que el consenso en el beneficio (10,21 € en 2028e) y en el múltiplo: con tres años de historia limpia no damos por hecho que vuelva el PER de 22 veces.',
      por_que: 'El 3T retrasa la recuperación de Gucci al menos medio año y la empresa ha retirado dos objetivos de 2026; los analistas tardarán en recortar sus cifras. No tenemos una visión distinta sobre la marca: la diferencia es de calendario y de múltiplo.',
    },
    a_favor: [
      '**Balance saneado**: deuda neta de 3.324 M en junio tras vender la belleza por 4.000 M [A3].',
      '**Margen con recorrido**: 11,1 % en 2025 frente al 27,5 % de 2022; el plan pide más del 22 % [A6, D4].',
      '**Joyería y gafas crecen**: +11 % y +4 % comparables en el 3T [A1].',
      '**Sentimiento en capitulación**: −38 % en tres meses y a un 1 % del mínimo de 52 semanas [D11].',
      '**Regalías de la belleza**: la licencia de Gucci pasa a L\'Oréal a mediados de 2027 [A3].',
    ],
    en_contra: [
      '**Gucci sigue cayendo**: −6 % comparable y −9 % en tiendas propias en el 3T [A1].',
      '**Guía retirada**: ya no promete crecer en 2026 y el margen del 2S no mejorará sobre el 1S [A12].',
      '**No crea valor**: ROIC del 3,2 % frente a un WACC del 8,69 %.',
      '**Valentino**: posible compra del 70 % por unos 4.000 M en 2028-2029 [A3].',
      '**Directores creativos**: Saint Laurent y McQueen sin director desde octubre [D1].',
    ],
    que_vigilar: 'La tesis depende de que Gucci deje de caer en tiendas propias entre el 4T26 y el 2T27, con la colección Gucci Core en tienda. La señal de que no se cumple: dos trimestres más de Gucci por debajo del −5 % en tiendas propias o un margen operativo de 2026 por debajo del 12 %.',
    cambiaria_recomendacion: [
      'Por debajo de 147,32 €, con el caso base intacto, la regla daría Comprar.',
      'Un 4T26 con Gucci mejor que −3 % en tiendas propias y el margen del 2S en el 12,8 % subiría el BPA de 2027e y acercaría el Comprar.',
      'Por encima de 188,24 € la regla da Vender.',
      'Si Mayhoola ejerce la venta de Valentino por encima de 4.000 M, revisaríamos el valor a la baja.',
    ],
    kpis_seguimiento: [
      { kpi: 'Ventas de Gucci en tiendas propias', nivel_actual: '−9 % comparable (3T26)', umbral_alerta: '< −5 % en el 4T26', por_que: 'Es la parte más rentable de Gucci y la que mide el deseo.' },
      { kpi: 'Margen operativo recurrente del grupo', nivel_actual: '12,8 % (1S26)', umbral_alerta: '< 12 % en 2026', por_que: 'El base supone un 12,4 % en 2026 y un 15,8 % en 2028.' },
      { kpi: 'Deuda financiera neta', nivel_actual: '3.324 M (jun-26)', umbral_alerta: '> 5.000 M antes de Valentino', por_que: 'Mide si la caja libre sin activos es real.' },
      { kpi: 'Crecimiento comparable del grupo', nivel_actual: '−1 % (3T26)', umbral_alerta: '< −3 %', por_que: 'El base supone volumen positivo desde 2027.' },
    ],
    confianza: 'Media',
  },
  fuentes: [],
  huecos: [],
};

export default T;
