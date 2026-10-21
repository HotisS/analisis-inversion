// Textos del analista (TSMC, corte 2026-10-14). Citas con la letra de la nota; [P n] = fuentes propias.
export default {
  limitaciones: 'Análisis hecho desde la nube con la red limitada a la búsqueda web: la web de inversores de TSMC, la TWSE, sec.gov y los proveedores de datos no se pudieron abrir, así que las cifras salen de los extractos de búsqueda de los comunicados de resultados (6-K), los informes de gestión trimestrales, StockAnalysis, Stockopedia y la prensa financiera, cruzadas cuando fue posible; la confianza es menor que en un análisis normal y lo que no cuadró está en null y en los huecos. Línea elegida: la acción local 2330 de la Bolsa de Taiwán, en TWD; el ADR TSM de la NYSE equivale a 5 acciones y cotizaba a 472,20 USD el 8-oct-2026 [D18], con una prima de ≈20 % sobre la local al cambio de 32,3 TWD/USD [D16]. El precio es el cierre del 8-oct-2026 (2.550 TWD) [D5, D6], el último localizado; no se encontró el del 13-oct. Balance histórico incompleto (solo activo, pasivo y deuda de 2024-2025) y flujos solo de 2023-2025 (redondeados en la transcripción del 4T25): el circulante y el ROIC histórico del motor no son fiables. Puente con la caja de junio de 2026 y la deuda de diciembre de 2025; sin arrendamientos ni minoritarios (inmateriales frente a la capitalización, pero no verificados). El BPA del consenso está en USD por ADR y se ha convertido.',

  controles_explicados: [
    { control: 'Circulante del primer año', explicacion: 'No hay balance de 2025 con clientes, existencias y proveedores, así que el motor ve un circulante real de 0 %. El 8 % supuesto es prudente: solo clientes y existencias sumaban 826.450 M TWD en junio de 2026 (≈19 % de las ventas de doce meses) [A6].' },
    { control: 'Caja proyectada coherente', explicacion: 'El salto viene de las ventas (+43 % en 2026 y +28 % en 2027) con márgenes EBITDA del 72-73 %, ya vistos en el 1S26 (margen operativo del 58-60 %) [A2, A3]; el flujo libre de 2025 ya fue de ≈1 billón TWD [A9, A10] y el capex proyectado (37-40 % de las ventas) está por encima del de 2025 (34 %).' },
    { control: 'Objetivo 12 m frente al consenso', explicacion: 'Nuestro base queda ≈22 % por debajo del objetivo medio de las cuatro casas localizadas (3.700 TWD), que son las más alcistas y publicaron en la semana previa a los resultados; la diferencia está en el múltiplo (19,5x frente a ≈25x implícito), no en el BPA. Ver diferencia_consenso.' },
    { control: 'Sección de núcleo con datos: rentabilidad', explicacion: 'Hay comentario; el motor la marca vacía porque sin balance histórico no calcula ROIC de 2021-2024.' },
    { control: 'Sección de núcleo con datos: capital', explicacion: 'Hay política y comentario; no hay adquisiciones relevantes en diez años (TSMC crece con fábricas propias).' },
  ],

  parches: [],
  huecos_resueltos: [],

  secciones: {
    historia: {
      resumen: 'TSMC nació en 1987 en Hsinchu como primera fundición pura del mundo: fabrica chips diseñados por otros y no compite con sus clientes. Esa neutralidad, más la apuesta temprana por la litografía EUV, la llevó a ganar la carrera de los nodos avanzados a Intel y Samsung en 2018-2020. Con la IA generativa, desde 2023, se convirtió en el cuello de botella de los aceleradores de Nvidia, AMD, Broadcom y los diseños propios de los hiperescaladores. C. C. Wei es consejero delegado desde 2018 y presidente desde 2024 [C1, C4]. En 2025 facturó 3,81 billones TWD [A4] y tiene el 72,5 % de los ingresos de los diez mayores fabricantes por encargo [B1].',
      hitos: [
        { anio: '1987', hito: 'Fundación como primera fundición pura del mundo, con apoyo del Estado taiwanés (Fondo Nacional de Desarrollo, aún accionista y consejero) [C2].' },
        { anio: '2018', hito: 'C. C. Wei, consejero delegado [C2].' },
        { anio: '2022', hito: 'Caída del ciclo de semiconductores y del precio a 448,5 TWD al cierre del año, 11,4 veces el beneficio del año [D8].' },
        { anio: '2024', hito: 'C. C. Wei suma la presidencia, elegido por unanimidad [C1, C4].' },
        { anio: '2025', hito: 'Ventas de 3,81 billones TWD (+31,6 %) y BPA de 66,25 TWD (+46 %); compromiso de ≈165.000 M USD en Arizona [A12, B5].' },
        { anio: '2026', hito: 'Margen bruto récord del 67,7 % en el 2T26, guía de crecimiento elevada a algo más del 40 % en USD y capex de 60.000-64.000 M USD [A2, C3].' },
      ],
      confianza: 'Media',
    },
    negocio: {
      descripcion: 'TSMC fabrica obleas de silicio con los chips que diseñan sus clientes: Apple, Nvidia, AMD, Broadcom, Qualcomm, MediaTek y los hiperescaladores con diseños propios. Vende capacidad por nodo: en el 2T26 los nodos de 7 nm o menos fueron el 77 % de los ingresos por obleas (3 nm 30 %, 5 nm 33 %, 7 nm 11 % y el nuevo 2 nm 3 %) [A2]. Añade encapsulado avanzado (CoWoS), imprescindible en los aceleradores de IA. Produce sobre todo en Taiwán y amplía en Arizona, Japón y Alemania [B5].',
      como_gana_dinero: 'Cobra por oblea, con precios que suben en cada nodo nuevo y que en los nodos punteros fija casi sin rival: el margen bruto pasó del 59,9 % en 2025 [A12] al 67,7 % en el 2T26 [A2]. El coste es sobre todo amortización de equipos (688.260 M TWD en 2025, el 18 % de las ventas) [A8], así que el margen depende de llenar fábricas: con la capacidad de 3 y 5 nm agotada, cada oblea adicional entra casi entera en el beneficio. Lo diluyen las fábricas en el extranjero (más caras) y el arranque de cada nodo.',
      clientes: 'Concentración alta: los diez primeros clientes son la mayoría de las ventas y Apple y Nvidia pesan cada uno en torno a una quinta parte (cifras exactas no verificadas en esta sesión). El poder de precios se ve en las cifras: el margen bruto subió 7,8 puntos en año y medio pese a la dilución de Arizona [A2, A12]. Los contratos son de capacidad reservada con anticipos; cambiar de fabricante en un nodo puntero exige rediseñar el chip y 12-24 meses.',
      geografias: null,
      confianza: 'Media',
    },
    sector: {
      definicion: 'El mercado relevante es la fabricación de chips por encargo (fundición), medido por TrendForce con los diez mayores fabricantes: 53.490 M USD en el 2T26 (+11,5 % trimestral) [B1, B3]. Se usa esta medida y no el mercado total de semiconductores porque es donde compite TSMC; no se encontró una segunda fuente de tamaño anual.',
      drivers: [
        { driver: 'Gasto en centros de datos de IA', efecto: '+', horizonte: 'Estructural', evidencia: 'Ventas de septiembre de 2026 +54,6 % interanual; 5/4 y 3 nm completos [A1].' },
        { driver: 'Migración a nodos de 2 y 3 nm', efecto: '+', horizonte: 'Estructural', evidencia: 'Los nodos ≤7 nm pasaron del 74 % al 77 % de los ingresos por obleas en un trimestre [A2, A3].' },
        { driver: 'Ciclo de consumo (móviles y PC)', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'En 2023 las ventas cayeron un 4,5 % con el ajuste de inventarios [A4].' },
        { driver: 'Aranceles y política industrial de EE. UU.', efecto: '−', horizonte: 'Estructural', evidencia: 'Investigación de la Sección 232 sobre chips y exigencia de producción local (Arizona) [B4].' },
      ],
      porter: [
        { fuerza: 'Rivalidad', intensidad: 2, justificacion: 'Samsung tiene el 5,9 % y pierde cuota; Intel no tiene clientes externos relevantes [B1, B2].' },
        { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Clientes muy grandes (Apple, Nvidia), pero sin alternativa en nodos punteros: TSMC subió el margen bruto 7,8 puntos [A2, A12].' },
        { fuerza: 'Poder de los proveedores', intensidad: 3, justificacion: 'ASML es el único proveedor de EUV; su PER de 27x refleja ese poder [D11].' },
        { fuerza: 'Amenaza de entrada', intensidad: 1, justificacion: 'Un nodo puntero exige más de 20.000 M USD por fábrica y años de aprendizaje; TSMC invertirá 60.000-64.000 M USD solo en 2026 [C3].' },
        { fuerza: 'Amenaza de sustitutos', intensidad: 2, justificacion: 'No hay sustituto al silicio avanzado a medio plazo; el riesgo es que la IA gaste menos, no que use otra cosa.' },
      ],
      ciclo: { posicion: 'Expansión', comentario: 'Los indicadores son las ventas mensuales (+41,1 % en enero-septiembre) [A1] y los días de inventario (87, al alza) [A6]. El sector cayó con fuerza en 2008-09 y en 2022-23 (TSMC: −4,5 % de ventas en 2023 y PER de 11,4x al cierre de 2022) [A4, D8]; en 2020 creció. Estamos en el tercer año de expansión de la IA y los gestores ya hablan de la operación más concurrida [B6].' },
      regulacion: 'Controles de exportación de EE. UU. a China (que limitan a SMIC a nodos sin EUV), investigación de la Sección 232 sobre aranceles a chips importados y créditos fiscales de la ley CHIPS por producir en EE. UU. TSMC pidió exención para quien fabrique en el país y avisó de que los aranceles podían retrasar Arizona [B4]. En Taiwán, controles sobre la exportación de la tecnología más avanzada.',
      tendencias: 'Los aceleradores de IA concentran la demanda en los nodos de 3 y 2 nm y en el encapsulado avanzado, donde TSMC no tiene competencia real; SMIC crece (+20 % trimestral) en nodos maduros con apoyo chino [B2], que es donde TSMC pesa menos. Los hiperescaladores diseñan chips propios, pero los fabrican en TSMC. La empresa gana con estas tendencias; pierde margen con la producción en el extranjero.',
      confianza: 'Media',
    },
    competencia: {
      foso: {
        veredicto: 'Amplio', tendencia: 'Se amplía',
        fuentes: [
          { fuente: 'Efectos de red', puntuacion: 2, evidencia: 'Ecosistema de diseño (bibliotecas y socios de EDA) que se enriquece con cada cliente; no es un efecto de red clásico.' },
          { fuente: 'Costes de cambio', puntuacion: 4, evidencia: 'Llevar un chip de 3 nm a otro fabricante exige rediseño y 12-24 meses; cuota del 72,5 % y al alza [B1].' },
          { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 4, evidencia: 'Saber hacer de proceso y rendimientos en 3 y 2 nm que Samsung e Intel no igualan.' },
          { fuente: 'Ventaja en costes', puntuacion: 4, evidencia: 'Margen operativo del 60,3 % en el 2T26 [A2] frente a pérdidas en la fundición de Intel y Samsung.' },
          { fuente: 'Escala eficiente', puntuacion: 5, evidencia: 'Capex de 60.000-64.000 M USD en 2026 [C3]: ningún rival puede invertir lo mismo con rentabilidad.' },
        ],
      },
      amenazas: 'Tres: que Intel 18A/14A o Samsung 2 nm alcancen rendimientos comparables y un gran cliente diversifique por razones geopolíticas (probabilidad baja-media en cinco años); que EE. UU. imponga aranceles o condiciones que obliguen a producir más fuera de Taiwán con márgenes menores (media) [B4]; y una crisis en el estrecho de Taiwán (baja, impacto extremo).',
      confianza: 'Media',
    },
    financieros: {
      comentario: 'Las ventas crecieron de 1,59 a 3,81 billones TWD entre 2021 y 2025 (TCAC del 24 %), con un único tropiezo en 2023 (−4,5 %) por el ajuste de inventarios de consumo [A4]. El crecimiento es orgánico: no hay compras. El margen EBITDA se mantuvo entre el 67 % y el 69 % [A8], pero el operativo pasó del 42,6 % de 2023 al 50,8 % de 2025 y al 58-60 % en el 1S26 [A2, A3, A7] por precio (nodos de 3 nm) y apalancamiento operativo, pese a la dilución de las fábricas en el extranjero. El beneficio neto atribuido pasó de 596.540 a 1.717.883 M TWD [A7] y el BPA de 23,01 a 66,25 TWD [A12]. En los últimos doce meses a junio de 2026, BPA de 86,27 TWD (estimación propia con los trimestres publicados) [A2, A3].',
      ajustes: 'Se usan cifras reportadas. El EBITDA es el de StockAnalysis (EBIT más amortizaciones) [A8], y la amortización se obtiene por diferencia con el beneficio operativo de Stockopedia [A7]; cuadra con el orden de magnitud de la memoria. El LTM de EBIT y EBITDA es estimación propia: 2025 más el 1S26 menos el 1S25, con el margen operativo publicado de cada trimestre de 2026 y uno estimado del 49 % para el 1S25. Minoritarios tratados como cero (inmateriales). No hay partidas no recurrentes relevantes.',
    },
    trimestres: {
      ultima_presentacion: 'En julio (2T26) la dirección elevó la guía de crecimiento de 2026 en USD de «más del 30 %» a «algo más del 40 %» y el capex de 52.000-56.000 a 60.000-64.000 M USD [C3, P3]. El margen bruto (67,7 %) superó la guía de 65,5-67,5 % y la guía del 3T26 (ventas de 44.600-45.800 M USD, margen bruto 65-67 %) incorpora dilución del 2 nm y de las fábricas en el extranjero [A2]. El director financiero anticipó que el capex de los próximos tres años será «significativamente mayor» que el de los tres anteriores [C3]. Frente a abril (1T26), el discurso pasó de la cautela por aranceles a la escasez de capacidad [A3, P4]. Las preguntas repetidas fueron la sostenibilidad del gasto en IA, el margen de largo plazo con Arizona y el precio de 2027; la dirección no dio cifras de margen de 2027. Las ventas del 3T26 (≈1,49 billones TWD) superaron el techo de la guía [A1, P2], y el consenso de LSEG espera un beneficio de 740.800 M TWD (+64 %) [D5].',
    },
    balance: {
      otros_pasivos: 'No se pudieron leer las notas de provisiones, garantías ni litigios. TSMC recibe anticipos de clientes para reservar capacidad (no cuantificados aquí) y tiene compromisos de compra de equipos muy altos ligados al capex. Sin pensiones relevantes. La deuda (bonos en TWD y USD, 993.154 M TWD a diciembre de 2025 [A5]) es pequeña frente a la caja.',
      comentario: 'La caja e inversiones líquidas subieron de 2.634.430 M TWD en el 2T25 a 3.518.010 M en el 2T26 [A6], el 37,5 % del activo, pese a un capex de 846.760 M en el semestre. Clientes (440.920 M) y existencias (385.530 M) crecen con las ventas; los días de inventario subieron de 80 a 87 [A6]. La caja neta (≈2,5 billones TWD) equivale a ≈4 % de la capitalización: el balance no es una palanca de valor, sino un colchón.',
    },
    flujos: {
      comentario: 'El flujo operativo fue de 1,24 billones TWD en 2023, 1,83 billones en 2024 y ≈2,3 billones en 2025 [A9, A11], con un capex de 0,95, 0,96 y ≈1,3 billones (40.900 M USD en 2025) [A9, A10]: flujo libre de ≈1 billón en 2025, +15,2 % [A9]. En el 1S26, flujo operativo de 1,48 billones y capex de 0,85 billones [A6]. La empresa no separa capex de mantenimiento; estimación propia: la amortización (≈18 % de las ventas) aproxima el mantenimiento, de modo que dos tercios del capex de 2026 (37 % de las ventas) son crecimiento.',
    },
    calidad: {
      comentario: 'Auditor Deloitte Taiwán, opinión sin salvedades. No se pudieron leer las notas, así que la revisión es limitada. El Altman Z (17,33) y el Piotroski F (7) del motor son altos pero se apoyan en un balance incompleto; el Beneish M no se calcula. Lo que sí se ve: el beneficio se convierte en caja (flujo operativo de ≈2,3 billones frente a 1,72 billones de beneficio neto en 2025 [A9, A7]), no se capitaliza I+D relevante y la remuneración en acciones es pequeña. El tipo impositivo efectivo (15,9 % en 2025) es bajo por incentivos de Taiwán y subirá con el impuesto mínimo global.',
      senales: [
        { senal: 'Días de inventario al alza (de 76 a 87 en un año)', nivel: 'Baja', comentario: 'Coherente con el arranque del 2 nm y la escasez de capacidad; vigilar si sigue subiendo con ventas planas [A6].' },
        { senal: 'Revisión limitada por falta de acceso a las notas', nivel: 'Media', comentario: 'Sin notas de provisiones, vinculadas ni compromisos; ver huecos.' },
      ],
      confianza: 'Baja',
    },
    capital: {
      politica: 'Dividendo trimestral creciente y sostenible: 7,0 TWD por acción en el 1T26 y en el 2T26, frente a 18 TWD pagados en todo 2025 [A13, A12]; desde 2026 se puede cobrar en USD [A13]. Prioridad declarada de la caja: capex para crecer (60.000-64.000 M USD en 2026) [C3]. No hay recompras relevantes ni compras de empresas.',
      adquisiciones: [],
      comentario: 'Buena asignadora de capital: crece con fábricas propias, sin compras ni dilución (acciones estables en ≈25.930 M) [A7], y el ROIC del último ejercicio es del 50,5 %, con un ROIC incremental histórico del 32,4 %. El riesgo es el contrario: invertir 60.000-98.000 M USD al año (previsión de Goldman para 2028) [D19] en un pico de demanda.',
      confianza: 'Media',
    },
    directivos: {
      comentario: 'Equipo estable y creíble: C. C. Wei lleva ocho años al frente y la guía se ha cumplido o superado en 2025 y 2026 (margen bruto del 2T26 por encima del techo, ventas del 3T26 por encima del techo) [A1, A2]. La concentración del cargo de presidente y consejero delegado en una persona desde 2024 resta contrapeso [C1]; no se conoce plan de sucesión público.',
    },
    gobierno: {
      remuneracion: 'No se pudo leer el informe anual ni el 20-F, así que no hay cifras de remuneración ni de voto. TSMC reparte un bonus a empleados ligado al beneficio, que es un coste significativo dentro de los gastos; el consejo tiene comisión de remuneración formada por independientes [C2].',
      control_y_defensas: 'Sin accionista de control: el Fondo Nacional de Desarrollo del Estado taiwanés es el mayor accionista individual y tiene un consejero dominical [C2]; una acción, un voto. Siete de diez consejeros son independientes, la mayoría extranjeros con experiencia en el sector (Splinter, Gavrielov, Reif) [C1]. El riesgo de gobierno no es el minoritario, sino la influencia de los gobiernos de Taiwán y EE. UU. en decisiones de inversión.',
      alertas: ['Presidente y consejero delegado en la misma persona desde junio de 2024 [C1].', 'Influencia política de Taiwán y EE. UU. sobre dónde y cuánto invierte (Arizona) [B4].'],
    },
    consenso: {
      guidance: 'Guía de 2026 (julio): crecimiento de las ventas en USD de algo más del 40 % y capex de 60.000-64.000 M USD [C3]; 3T26: ventas de 44.600-45.800 M USD, margen bruto del 65-67 % y operativo del 56-58 % [A2]. Las ventas de enero-septiembre crecieron un 41,1 % en TWD [A1]. Resultados del 3T26 y guía del 4T26 el 15-oct-2026 [P2].',
      revisiones: 'Al alza en los últimos tres meses: Goldman Sachs subió el objetivo de 3.100 a 3.300 TWD el 6-oct [D19], Citi de 3.800 a 4.000 y Macquarie lo situó en 4.410 [D6]; Erste elevó su BPA de 2026 de 15,82 a 16,69 USD por ADR [D4]. Solo hay estimaciones completas de ventas (Stockopedia) y el BPA de un consenso en USD [D3, D4]: el contraste es débil.',
    },
    bolsa: {
      comentario: 'La acción subió un 64,5 % en 2026 hasta el 8-oct (de 1.550 a 2.550 TWD) [D7, D5], con máximo de cierre en 2.585 TWD [D5], al ritmo del beneficio (+77 % en el 2T26) [A2]: el PER apenas se ha movido. No se pudieron calcular beta, volatilidad ni caída máxima (sin datos diarios).',
    },
    multiplos_historicos: {
      comentario: 'Solo hay dos cierres verificados: 448,5 TWD en 2022 (11,4 veces el BPA del año, en plena caída del ciclo) [D8] y 1.550 TWD en 2025 (23,4 veces) [D7]. Zacks sitúa la mediana de cinco años del PER adelantado en ≈21x [D9]. Hoy cotiza a 19,5 veces nuestro BPA de 2027e: por debajo de su mediana adelantada, porque el beneficio crece más deprisa que el precio.',
    },
    comparables: {
      criterio: 'Empresas de semiconductores de gran capitalización ligadas a la IA (Nvidia, Broadcom, AMD, ASML) y fundiciones de nodos maduros (GlobalFoundries, UMC). No hay ninguna fundición puntera cotizada pura: Samsung e Intel mezclan memoria, móviles y CPU y sus PER no miden lo mismo; SMIC cotiza con prima china. Solo hay PER adelantado de cada una, de fechas distintas (julio-septiembre de 2026) [D10, D11, D12, D13, D14].',
      comentario: 'La mediana del PER adelantado es de 25,5x (12,7x-79x): TSMC, a 19,5x nuestro BPA de 2027e, cotiza con descuento frente a sus clientes de diseño (Nvidia ≈24x, Broadcom ≈31x) [D10] y a ASML (27x) [D11], y con prima frente a las fundiciones maduras (GlobalFoundries 17,7x, UMC 12,7x) [D13, D14]. El descuento frente al grupo de IA se explica por la intensidad de capital (capex del 37 % de las ventas frente a casi nada en Nvidia) y el riesgo de Taiwán; la prima sobre UMC y GlobalFoundries, por el crecimiento (+43 % frente a cifras de un dígito) y el margen. Usaríamos 20-25x.',
    },
    esg: {
      calificaciones: [],
      materialidad: 'Lo material es el agua y la energía: una fábrica de nodo puntero consume tanta electricidad como una ciudad mediana y Taiwán depende de importaciones de gas y de un sistema eléctrico tenso; las sequías de 2021 obligaron a comprar agua con camiones. La seguridad de los empleados y la retención de ingenieros, sobre todo en Arizona, afectan a los plazos. No se encontraron cifras verificadas de emisiones en esta sesión.',
      controversias: 'Sin sanciones relevantes localizadas en los últimos tres años. La investigación de EE. UU. sobre chips de TSMC que acabaron en Huawei (2024) y la presión arancelaria de la Sección 232 [B4] son los asuntos abiertos más citados.',
      confianza: 'Baja',
    },
    sentimiento: {
      lectura: 'El sentimiento es positivo y mejora, sin euforia: los particulares y los autores discuten si se puede comprar a 2.550 TWD, no si el negocio va bien [E1, E2]. Coincide con los analistas, que suben objetivos antes de los resultados, y con los gestores, que ven los semiconductores como la operación más concurrida [E5]. Eso último es el aviso útil: si el relato de la IA se rompe, la salida sería masiva y el PER podría volver a mínimos (11,4x en 2022) aunque el beneficio aguante. Ningún foro aporta un riesgo que el informe no recoja.',
    },
  },

  dcf_justificacion: {
    crecimiento: 'El 2026e (+43 %) está casi cerrado: enero-septiembre +41,1 % y guía de algo más del 40 % en USD [A1, C3]. Para 2027e suponemos +28 %, por debajo de Goldman (+36,9 % en USD) [D19] y de las ventas del consenso de Stockopedia (+34 %) [D3], porque el gasto de los hiperescaladores no puede crecer indefinidamente al ritmo de 2026. Después, +18 %, +13 % y +10 %, y convergencia al 3,5 % en 2035e: una TCAC de 2025 a 2035e del ≈13 %, frente al 24 % de 2021-2025 [A4].',
    margenes: 'Margen EBITDA del 73,5 % en 2026e, coherente con el margen operativo del 58-60 % del 1S26 más una amortización del 15 % [A2, A3]; baja de forma gradual al 68 % en 2035e, el rango de 2021-2025 (67-69 %) [A8], por la dilución de Arizona, Japón y Alemania y por la competencia en precios cuando se normalice la escasez.',
    inversion: 'Capex del 37 % de las ventas en 2026e (60.000-64.000 M USD a ≈32 TWD) [C3], del 40 % en 2027e (Goldman prevé 85.000 M USD) [D19] y bajando al 22,5 % en 2035e, por encima de la amortización (20,5 %). La media histórica fue del 34-53 %: subimos el capex respecto a la primera versión para que la prueba de sostenibilidad pase. Circulante del 8 % de las ventas.',
    wacc: 'Tasa libre del bono taiwanés a 10 años (1,88 %) [D15], porque los flujos están en TWD; beta de 1,15 (estimación propia: no se pudo calcular; TSMC pesa más del 40 % del TAIEX y su ADR es más volátil que el S&P 500); prima de mercado del 5,5 %; prima adicional de 1,5 puntos por el riesgo geopolítico del estrecho de Taiwán, donde está casi toda la capacidad. Deuda del 1,5 % del valor a un coste del 2 %. WACC del 9,58 %.',
    terminal: 'Gordon con un 1,5 %: la inflación de Taiwán ronda el 2 % y el bono a 10 años el 1,88 % [D15]; la regla del prompt (tasa libre menos medio punto) daría un 1,4 %, y usamos un 1,5 % porque la demanda de semiconductores crece por encima del PIB. El valor terminal pesa un 59 % del total.',
  },
  puente_comentarios: {
    '2026e': 'Volumen: obleas de 3 y 5 nm completas y arranque del 2 nm; precio: subidas en nodos avanzados y CoWoS; otros: mezcla y divisa [A1, A2].',
    '2027e': 'Volumen con la nueva capacidad de 2 nm y Arizona; precio +8 %, subidas anunciadas por la prensa para 2027 (sin confirmar) [C3].',
    '2028e': 'Volumen con la ampliación del capex de 2026-2027; precio más moderado.',
    '2029e': 'Normalización del crecimiento del gasto en IA.',
    '2030e': 'Crecimiento cercano al del mercado de fundición.',
  },
  veredicto: 'Sí',
  sostenibilidad_justificacion: 'Sí: el foso (72,5 % del mercado de fundición y prácticamente el único fabricante de 2-3 nm) [B1] y el poder de precios demostrado (margen bruto de 59,9 % a 67,7 % en año y medio) [A12, A2] sostienen el crecimiento proyectado, que es la mitad del histórico. Con el capex que proyectamos (37-40 % de las ventas en 2026-27), la reinversión financia al ROIC actual el 14,1 % de crecimiento medio proyectado, el capital nuevo rinde menos que el ROIC incremental histórico y la cuota final baja ligeramente. La primera versión, con menos capex, no pasaba: se subió el capex, no se bajó el crecimiento, porque TSMC siempre ha invertido el 34-53 % de sus ventas.',
  dcf_lectura: 'El DCF da 1.853,18 TWD por acción, un 27,3 % por debajo del precio, con un WACC del 9,58 % y un valor terminal que pesa el 59 %. El DCF inverso dice que el precio de 2.550 TWD descuenta un crecimiento del 16,0 % anual de 2027e a 2035e frente al 10,8 % de nuestro caso base, o una rentabilidad implícita del 7,5 %, dos puntos por debajo de nuestro WACC. Es exigente pero no absurdo: TSMC creció un 24 % anual en 2021-2025 [A4]. El mercado cree que la IA mantiene el crecimiento por encima del 15 % durante una década o acepta una rentabilidad menor por la calidad del negocio. Con la prima del mercado (4,2 %) la distancia se reduce. La valoración es muy sensible a la tasa: la tasa libre en TWD (1,88 %) es baja, pero la prima por Taiwán la compensa.',
  narrativas: {
    Bajista: 'El gasto en IA se estanca en 2027 como el de las telecomunicaciones en 2001: el crecimiento se queda 6 puntos por debajo del base cada año y el margen baja 4 puntos por capacidad ociosa y fábricas caras en el extranjero, como en 2023 (ventas −4,5 %) [A4].',
    Base: 'La IA sigue creciendo, pero a menos ritmo: +28 % en 2027 y convergencia gradual; margen EBITDA del 73 % al 68 % con la dilución del extranjero.',
    Alcista: 'Los hiperescaladores mantienen el ritmo de 2026 y TSMC sube precios en 2 nm: 4 puntos más de crecimiento y 1,5 de margen, en línea con Goldman Sachs [D19].',
  },
  escenarios_comentario: 'La asimetría del DCF es mala: el alcista queda por debajo del precio y el bajista pierde más de la mitad, porque el precio ya descuenta un crecimiento superior al de nuestro alcista en los primeros años. Con el método a 12 meses (BPA por PER) la asimetría mejora, porque el PER de hoy (19,5x) es el de un mercado que ya cree en el crecimiento. No compensa comprar a este precio por valor intrínseco.',
  valoracion_comentario: 'Pesamos el DCF al 50 %, los escenarios al 30 % y los comparables al 20 %. El DCF es el método más fiable para un negocio con capex tan alto, porque los múltiplos de Nvidia o Broadcom no cobran ese capex; los comparables suben el valor porque el sector cotiza a 25,5x. Transacciones no aplican: no hay compras de fundiciones punteras. La dispersión es grande: de 1.853 TWD (DCF) a más de 3.300 (comparables): el precio de hoy está entre los dos y se parece más a lo que pagan por el sector que a lo que dan sus flujos con nuestra tasa.',
  casos12m: [
    { escenario: 'Bajista', metrica: 'PER', beneficio_por_accion: 123.7, multiplo: null, precio: null, justificacion: 'Ventas de 7,44 billones TWD en 2028e (+22 % y +12 % en 2027-28), margen EBITDA del 68 % y amortización del 17,5 % (capex ya comprometido, no baja): EBIT de 3,76 billones, 105.700 M de ingresos financieros, impuesto del 17 % y 25.933 M de acciones.' },
    { escenario: 'Base', metrica: 'PER', beneficio_por_accion: 146.9, multiplo: null, precio: null, justificacion: 'Ventas de 8,23 billones TWD (+28 % y +18 %), margen EBITDA del 72 % y amortización del 17,5 %: EBIT de 4,48 billones, ingresos financieros de 105.700 M (los de 2025), impuesto del 17 % y 25.933 M de acciones sin recompras.' },
    { escenario: 'Alcista', metrica: 'PER', beneficio_por_accion: 160.6, multiplo: null, precio: null, justificacion: 'Ventas de 8,77 billones TWD (+32 % y +22 %) y margen EBITDA del 73,5 %: la escasez de 2 nm y CoWoS dura hasta 2028 y las subidas de precio compensan la dilución del extranjero.' },
  ],
  per_historico: { actual: 19.5, mediana_5a: 21.0, minimo_5a: 11.4, media_larga: null, excluidos: 'Ningún año excluido. Solo hay dos cierres verificados: 2022 (448,5 TWD; 11,4x el BPA de 39,20) y 2025 (1.550 TWD; 23,4x el BPA de 66,25) [D8, D7, A12]. La mediana de cinco años (21x) es la del PER adelantado de Zacks [D9], en la misma base que el actual (precio ÷ BPA del ejercicio siguiente). Actual = 2.550 ÷ 130,6 (nuestro BPA de 2027e). Sin media larga verificable.' },
  diferencia_consenso: 'Nuestro BPA de 2027e (130,6 TWD) queda un 5 % por debajo del de Erste convertido (137,3) [D4] y el de 2026e (106,6) coincide con el consenso (105,6) [D4]: la diferencia no está en el beneficio. Está en el múltiplo: nuestro base (19,5x el BPA de 2028e) frente a ≈25x implícito en el objetivo medio de 3.700 TWD de cuatro casas (Morgan Stanley 3.088, Goldman 3.300, Citi 4.000, Macquarie 4.410) [D6], que además son las más alcistas y se publicaron justo antes de los resultados. No acercamos la cifra.',
  objetivo12m_comentario: 'El objetivo a 12 meses queda muy por encima del valor intrínseco (DCF de 1.853 TWD): la distancia es de más del 25 %. Para cerrarla, el mercado tendría que dejar de descontar un crecimiento del 16 % anual durante una década o aceptar menos rentabilidad; no hay un catalizador con fecha que lo fuerce. A un año manda el beneficio: si el BPA de 2028e se acerca a 147 TWD y el PER se mantiene, la acción sube; si el ciclo gira, el múltiplo cae hacia el de 2022.',
  rentabilidad_comentario: 'Crea valor con holgura: ROIC del 50,5 % en 2025 frente a un WACC del 9,58 %, y ROIC incremental histórico del 32,4 %. El motor no puede calcular los años anteriores por falta de balance, pero el margen operativo (42,6 % en 2023, 50,8 % en 2025 [A7]) y la rotación de un activo que crece con el capex apuntan a un ROIC de más del 25 % en todo el periodo. Lo mueve el margen, no la rotación: cada nodo nuevo sube el precio por oblea. Supera con mucho a sus competidores en fundición (Samsung e Intel pierden dinero; UMC y GlobalFoundries tienen márgenes de un dígito alto o de dos dígitos bajos).',
  catalizadores: {
    items: [
      { fecha: '15-oct-2026', evento: 'Resultados del 3T26 y guía del 4T26 y de capex', efecto: 'Ventas ya conocidas (≈1,49 billones TWD) [A1]; importa el margen y la guía de 2027', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: 'Mediados de enero de 2027', evento: 'Resultados del 4T26 y guía de 2027 (crecimiento, capex, margen)', efecto: 'Fija el BPA de 2027; un capex de más de 80.000 M USD sería señal de demanda pero presiona el flujo', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '10-dic-2026', evento: 'Fecha ex dividendo de 7,0 TWD (pago el 7-ene-2027) [A13]', efecto: 'Dividendo creciente; primera vez cobrable en USD', probabilidad: 'Alta', sentido: '+' },
      { fecha: 'Mensual (día 10)', evento: 'Ventas mensuales', efecto: 'Primer indicador de desaceleración [A1]', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2026-2027', evento: 'Decisión de EE. UU. sobre aranceles de la Sección 232 a chips', efecto: 'Podría encarecer la producción en Taiwán o forzar más inversión en Arizona [B4]', probabilidad: 'Media', sentido: '−' },
      { fecha: '2S26-2027', evento: 'Rampa del 2 nm (3 % de las obleas en el 2T26) [A2]', efecto: 'Más precio por oblea; diluye el margen al principio', probabilidad: 'Alta', sentido: '+' },
    ],
    confianza: 'Media',
  },
  riesgos: {
    items: [
      { riesgo: 'Frenazo del gasto en IA de los hiperescaladores', tipo: 'Demanda', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−37 % (escenario bajista del DCF frente al base)', mitigante: 'Diversificación por clientes y nodos; móviles y PC', senal: 'Ventas mensuales con crecimiento interanual por debajo del 20 % [A1]' },
      { riesgo: 'Compresión del PER por salida de una operación concurrida', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−45 % si vuelve al mínimo de 5 años (11,4x)', mitigante: 'Beneficio creciente', senal: 'Encuestas de gestores y flujos de fondos [E5]' },
      { riesgo: 'Conflicto o bloqueo en el estrecho de Taiwán', tipo: 'Geopolítico', probabilidad: 'Baja', impacto: 'Alto', efecto_valor: '−50 % o más', mitigante: 'Fábricas en Arizona, Japón y Alemania [B5]', senal: 'Maniobras militares y sanciones' },
      { riesgo: 'Aranceles de EE. UU. a chips importados (Sección 232)', tipo: 'Regulatorio', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 % a −10 %', mitigante: 'Producción en Arizona y exenciones a quien invierte en EE. UU. [B4]', senal: 'Decisión del Departamento de Comercio' },
      { riesgo: 'Dilución del margen por las fábricas del extranjero y el 2 nm', tipo: 'Operativo', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: '−8 % por cada 2 puntos de margen EBITDA', mitigante: 'Subidas de precio', senal: 'Margen bruto trimestral por debajo del 62 % [A2]' },
      { riesgo: 'Exceso de capacidad tras un capex récord', tipo: 'Ciclo', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−10 % a −15 %', mitigante: 'Capacidad reservada con anticipos', senal: 'Días de inventario por encima de 95 [A6]' },
      { riesgo: 'Un competidor (Intel 14A, Samsung 2 nm) gana un gran cliente', tipo: 'Competencia', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−5 % a −10 %', mitigante: 'Ventaja de rendimientos y ecosistema', senal: 'Anuncio de un pedido de Apple o Nvidia en otra fundición [B2]' },
    ],
    premortem: 'Es octubre de 2029 y TSMC ha perdido un 40 %. La historia más probable: en 2027 los hiperescaladores, presionados por sus accionistas, recortaron el crecimiento del gasto en centros de datos tras dos años sin rentabilizar la IA; los pedidos de 3 y 2 nm se frenaron justo cuando entraba en servicio la capacidad del capex récord de 2026-2027 (más de 60.000 M USD al año) [C3, D19]. Las ventas crecieron un 8 % en 2028 en vez del 18 %, el margen bruto volvió al 55 % con fábricas a medio llenar y la amortización disparada, y el BPA se quedó plano. El mercado, que tenía los semiconductores como la operación más concurrida [E5], vendió en bloque: el PER bajó de 20x a 12x, como en 2022 [D8]. El indicador que lo habría anticipado: las ventas mensuales con un crecimiento interanual por debajo del 20 % durante tres meses y los días de inventario por encima de 95.',
    confianza: 'Media',
  },
  preguntas: {
    items: [
      { tema: 'Margen de 2027', pregunta: '¿Cuánto diluyen en 2027 el 2 nm y las fábricas del extranjero el margen bruto y cuánto compensan las subidas de precio?', por_que: 'Cada 2 puntos de margen EBITDA mueven ≈8 % el valor.' },
      { tema: 'Capex 2027-2028', pregunta: '¿El capex de 2027 superará los 80.000 M USD y qué parte es capacidad comprometida con contratos?', por_que: 'Decide si la prueba de sostenibilidad sigue pasando y el riesgo de exceso de capacidad.' },
      { tema: 'Concentración', pregunta: '¿Qué peso tienen Nvidia y Apple en las ventas de 2026 y con qué plazo están reservadas las capacidades?', por_que: 'La concentración en IA es el mayor riesgo de demanda.' },
      { tema: 'Aranceles', pregunta: '¿Qué exención negocia TSMC en la Sección 232 y qué coste tendría producir más en Arizona?', por_que: 'Riesgo regulatorio con fecha incierta [B4].' },
      { tema: 'Dividendo', pregunta: '¿Mantendrá el dividendo creciente (7 TWD por trimestre) si el capex sube a 85.000-98.000 M USD?', por_que: 'La rentabilidad por dividendo es solo del 1,1 %.' },
      { tema: 'Impuestos', pregunta: '¿Qué tipo efectivo deja el impuesto mínimo global a partir de 2027?', por_que: 'Proyectamos el 17 %; cada punto mueve ≈1 % el BPA.' },
    ],
    confianza: 'Media',
  },
  fuentes: [
    { id: 1, titulo: 'TSMC August 2026 Revenue Report', editor: 'TSMC', tipo: 'Primaria', fecha: '2026-09-10', url: 'https://pr.tsmc.com/system/files/newspdf/attachment/0ec5f546c67a79960d6dd1f70bf6f47d714a3151/August%202026%20%28E%29_final_wmn.pdf' },
    { id: 2, titulo: 'TSMC Quarterly Results (calendario: resultados del 3T26 el 15-oct-2026)', editor: 'TSMC', tipo: 'Primaria', fecha: '2026-10', url: 'https://investor.tsmc.com/quarterly-results' },
    { id: 3, titulo: 'TSMC 2Q26 Earnings Conference Transcript', editor: 'TSMC', tipo: 'Primaria', fecha: '2026-07-16', url: 'https://investor.tsmc.com/english/encrypt/files/encrypt_file/reports/2026-07/547d1696765e05ce3adb81c108ce1c8c1682b80c/TSMC%202Q26%20Transcript.pdf' },
    { id: 4, titulo: 'TSMC 1Q26 Presentation', editor: 'TSMC', tipo: 'Primaria', fecha: '2026-04-16', url: 'https://investor.tsmc.com/japanese/encrypt/files/encrypt_file/reports/2026-04/0f42cbb4f82454aa52bb7515556897bd22ce13d9/1Q26%20Presentation%20%28E%29.pdf' },
  ],
  huecos: [],
};
