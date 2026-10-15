// Textos del analista (Eaton, corte 2026-10-15). Las cifras del motor se copian de calc tras el último cálculo.
// Citas: [A3] = fuente 3 de A.json, [B2] de B.json, [C1], [D2], [E1]; [P1] fuente propia.
export default {
  fuentes: [
    { id: 1, titulo: 'Tipos de cambio de referencia del euro (USD por EUR, 14-oct-2026)', editor: 'Banco Central Europeo', tipo: 'Primaria', fecha: '2026-10-14', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml' },
  ],
  limitaciones: 'Línea cotizada: acciones ordinarias en la Bolsa de Nueva York (ETN), única clase; sociedad irlandesa con dirección en Cleveland. Precio: cierre del 14-oct-2026 (408,85 USD), porque la sesión del 15-oct no había cerrado a la hora del análisis (a media sesión, 399,31) [D1, D19]. Cuentas 2018-2025 del XBRL de la SEC, comprobadas con los 10-K 2025 y 2023 [A1, A2, A8]. EBIT = beneficio antes de impuestos + intereses netos (la cuenta de Eaton no tiene línea de resultado de explotación); incluye la amortización de intangibles, las reestructuraciones y los costes de compras y ventas. Caja = efectivo + inversiones a corto. US GAAP: los arrendamientos operativos (≈800 M) quedan dentro del EBITDA y fuera de la deuda. Segmentos: la empresa juntó Vehicle y eMobility en «Mobility» en 2026; los años anteriores son la suma de los dos. BPA: GAAP (el publicado), no el ajustado de la empresa, que excluye la amortización de intangibles (≈1,74 USD por acción en 2026). La separación de Mobility (1T27) se trata en el DCF como neutra (canje a valor de mercado) y en el BPA de 2028 como salida del negocio con retirada de ≈9,5 M de acciones (estimación propia). Comparables: múltiplos de MarketScreener a 7-oct llevados al 14-oct con el precio, en su mayoría sobre BPA y EBITDA ajustados: pesan 0 en el valor.',
  controles_explicados: [
    { control: 'Veredicto de sostenibilidad del analista coherente', explicacion: 'El motor compara con un histórico de ingresos del 3,5 % anual (2018-2025) que resta la venta de Lighting (2020) y de Hydraulics (2021); el crecimiento orgánico fue del 8 % en 2024 y 2025 y del 14 % en el 2T26, con una cartera eléctrica un 43 % mayor. Sin las compras de 2026 el crecimiento medio proyectado es ≈8 %. Se mantiene «Sí» (justificación de sostenibilidad).' },
    { control: 'Regresión múltiplo-crecimiento', explicacion: 'R² bajo: con siete comparables de crecimiento parecido, la regresión no se usa (comparables con peso 0).' },
    { control: 'Múltiplos LTM y NTM de cada comparable', explicacion: 'Vertiv: el salto de 34,2x a 19,7x viene de su crecimiento (+30-40 % de EBITDA) y de que el LTM es contable y el NTM ajustado; los comparables pesan 0.' },
  ],
  huecos: [
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) Informe de sostenibilidad de Eaton: no se descargó por tiempo; 2) MSCI ESG ratings: requiere JavaScript; 3) Sustainalytics: página de pago', decision: 'Omitido' },
    { seccion: 'sector', campo: 'cr5_pct', tipo: 'Complemento', intentos: "1) Dell'Oro: da el tamaño, no las cuotas (de pago); 2) 10-K de Eaton: no publica cuota; 3) informes de Schneider y ABB: solo cuotas cualitativas", decision: 'Omitido' },
    { seccion: 'competencia', campo: 'cuota_pct', tipo: 'Complemento', intentos: "1) Dell'Oro (cuotas de pago); 2) 10-K y presentaciones de Eaton: sin cuota; 3) estimación con las ventas a centros de datos (≈19 % de 2025, dato de BofA): demasiado indirecta para darla como cuota", decision: 'Omitido' },
  ],
  secciones: {
    historia: {
      resumen: 'Eaton nace en 1911 en Nueva Jersey como fabricante de ejes para camiones y durante 90 años fue un proveedor de automoción e industria. El giro hacia la electricidad empieza con la compra de la división eléctrica de Westinghouse (1994) y se completa con Cooper Industries (2012, ≈11.800 M USD), con la que traslada la sede legal a Irlanda. Desde 2016, con Craig Arnold, vende lo cíclico (Lighting en 2020, Hydraulics en 2021) y compra electricidad y aeroespacial (Tripp Lite, Cobham Mission Systems). Paulo Ruiz, consejero delegado desde junio de 2025, acelera el giro: compra Fibrebond, Boyd Thermal (refrigeración líquida, 9.550 M) y Ultra PCS, y separa Mobility con Dana en 2027 [A1, A3, C1].',
      hitos: [
        { anio: '1911', hito: 'Fundación como fabricante de ejes para camiones.' },
        { anio: '1994', hito: 'Compra de la distribución eléctrica de Westinghouse: entrada en el negocio eléctrico.' },
        { anio: '2012', hito: 'Compra de Cooper Industries y traslado de la sede legal a Dublín.' },
        { anio: '2020', hito: 'Venta de Lighting a Signify y compra de Tripp Lite (SAI monofásicos y centros de datos).' },
        { anio: '2021', hito: 'Venta de Hydraulics a Danfoss y compra de Cobham Mission Systems (aeroespacial).' },
        { anio: '2025', hito: 'Paulo Ruiz sucede a Craig Arnold; compra de Fibrebond (salas eléctricas modulares) y objetivos a 2030.' },
        { anio: '2026', hito: 'Compra de Boyd Thermal (refrigeración líquida) y Ultra PCS; acuerdo con Dana para separar Mobility (cierre en el 1T27); compra de COL Group (Italia).' },
      ],
      confianza: 'Media',
    },
    negocio: {
      descripcion: 'Eaton fabrica el equipo que lleva la electricidad desde la red hasta el consumo: cuadros de baja y media tensión, interruptores y protección de circuitos, sistemas de alimentación ininterrumpida (SAI), distribución de potencia en salas y armarios, salas eléctricas prefabricadas y, desde marzo de 2026, refrigeración líquida para servidores (Boyd Thermal). Lo vende a centros de datos, edificios comerciales e institucionales, compañías eléctricas, industria y vivienda, sobre todo a través de distribuidores y, en grandes proyectos, directamente. Electrical Americas (48 % de las ventas de 2025) y Electrical Global (25 %) son el núcleo; Aerospace (15 %) vende sistemas de combustible, hidráulicos y de potencia para aviones civiles y militares; Mobility (11 %), transmisiones y componentes de vehículos, sale del grupo en el 1T27 [A1, A3].',
      como_gana_dinero: 'Gana dinero con productos de catálogo de alto margen (protección y distribución) y con equipos diseñados para cada proyecto (SAI trifásicos, cuadros, salas modulares) que se cobran por hitos. El margen de segmentos fue del 24,5 % en 2025; Electrical Americas, el más rentable, ganó el 29,9 % de sus ventas [A1, A5]. El margen depende del volumen (fábricas llenas), del precio frente al cobre y el acero, y de la mezcla: centros de datos y redes pagan bien la rapidez de entrega. La cartera de pedidos (19.800 M en diciembre de 2025, el 69 % para 12 meses) da visibilidad de casi un año [A1]. Los servicios y la posventa aeroespacial son la parte recurrente. El apalancamiento operativo es alto: en 2020 las ventas cayeron un 17 % y el margen EBITDA bajó al 15,2 % (cifra del informe).',
      clientes: 'No hay un cliente que pase del 10 % de las ventas [A1]. En centros de datos vende a los grandes de la nube y a los constructores de centros de colocación, directamente o a través de integradores; BofA estima que los centros de datos fueron ≈19 % de las ventas de 2025, con comercio e instituciones ≈20 %, compañías eléctricas ≈11 % y aeroespacial ≈15 % [B6]. Con Boyd (1.500 M de ventas previstas en refrigeración líquida en 2026 [B4]) la exposición a centros de datos sube hacia una cuarta parte. Poder de precios: el margen de segmentos pasó del 20,5 % de 2022 al 24,5 % de 2025 con inflación de costes, y la cartera crece más que las ventas (relación pedidos/ventas 1,2) [A3, A5].',
      confianza: 'Media',
    },
    sector: {
      definicion: "El mercado que más mueve a Eaton hoy es la infraestructura física de los centros de datos tal como la mide Dell'Oro: SAI, distribución de energía, gestión térmica (con la refrigeración líquida), racks y servicios, a escala mundial [B1, B2]. Cubre en torno a una cuarta parte de las ventas de Eaton tras Boyd; el resto (edificios, redes eléctricas, industria, vivienda y aeroespacial) no tiene una fuente gratuita de tamaño homogénea. Lo contrastamos con la AIE, que mide el consumo eléctrico de los centros de datos: 415 TWh en 2024 y ≈945 TWh en 2030 [B3]. La serie intermedia es interpolación propia a la TCAC de Dell'Oro.",
      tamano: "≈ 44.400 M USD en 2025: estimación propia implícita en la previsión de Dell'Oro de 120.000 M USD en 2030 con una TCAC del 22 % [B1]; el 4T25 sumó 10.900 M, un 20 % más que un año antes [B2].",
      unidad_serie: 'millones de USD',
      serie: [{ anio: '2025', tamano: 44400 }, { anio: '2026e', tamano: 54200 }, { anio: '2027e', tamano: 66100 }, { anio: '2028e', tamano: 80600 }, { anio: '2029e', tamano: 98400 }, { anio: '2030e', tamano: 120000 }],
      tcac_historico_pct: null, tcac_previsto_pct: 22.0, cr5_pct: null, estructura: 'Moderadamente concentrada',
      drivers: [
        { driver: 'Inversión en centros de datos de IA', efecto: '+', horizonte: 'Cíclico', evidencia: "Dell'Oro prevé 22 % anual hasta 2030 [B1]; pedidos de Electrical Americas +41 % (media móvil, 2T26) [A3]." },
        { driver: 'Electrificación y demanda eléctrica', efecto: '+', horizonte: 'Estructural', evidencia: 'La AIE prevé que el consumo de los centros de datos se duplique de 2024 a 2030 [B3]; las redes necesitan equipos de media tensión (compra de COL, 250 M EUR de ventas en 2027) [D11].' },
        { driver: 'Relocalización industrial e infraestructura en EE. UU.', efecto: '+', horizonte: 'Estructural', evidencia: 'Estados Unidos es el 62 % de las ventas de Eaton [A1]; comercio e instituciones ≈20 % [B6].' },
        { driver: 'Aeronáutica civil y defensa', efecto: '+', horizonte: 'Cíclico', evidencia: 'Pedidos aeroespaciales +17 % y cartera +28 % (2T26) [A3].' },
        { driver: 'Coste del cobre, el acero y aranceles', efecto: '−', horizonte: 'Cíclico', evidencia: 'Eaton cita la inflación de materias primas y los aranceles entre sus riesgos principales [A3].' },
        { driver: 'Posible exceso de capacidad en centros de datos en 2027', efecto: '−', horizonte: 'Cíclico', evidencia: 'Analistas avisan de sobreoferta de energía y frío en la segunda mitad de 2026 y 2027 [E4]; el 14-sep el sector cayó por miedo a un frenazo de la IA [D14].' },
      ],
      porter: [
        { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Cinco grandes (Schneider, ABB, Siemens, Eaton, Vertiv) con márgenes del 20-30 % y plazos de entrega largos: hoy compiten por capacidad, no por precio [B7].' },
        { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Los grandes de la nube compran a gran escala y diseñan con varios proveedores; los distribuidores pesan en el catálogo.' },
        { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Materias primas cotizadas (cobre, acero) y electrónica; Eaton traslada costes con un margen que ha subido 4 puntos desde 2022 [A5].' },
        { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Certificaciones, base instalada y red de servicio; en refrigeración líquida entran especialistas (CoolIT, Motivair) y por eso Eaton compró Boyd.' },
        { fuerza: 'Amenaza de sustitutos', intensidad: 2, justificacion: 'La corriente continua a 800 V en los centros de datos y los transformadores de estado sólido cambian el diseño; Eaton ya compró Resilient Power (estado sólido) [A1].' },
      ],
      ciclo: { posicion: 'Expansión', comentario: 'Los pedidos eléctricos crecen un 33-41 %, la cartera un 43 % y la relación pedidos/ventas es 1,2 (2T26) [A3]: es la fase alta del ciclo inversor de centros de datos. En 2020 las ventas de Eaton cayeron un 17 % (con la venta de Lighting) y el margen EBITDA bajó al 15,2 %; en 2009 la obra no residencial de EE. UU. se hundió y en 2022 la bolsa recortó el múltiplo (PER adelantado de 19,6x) sin que bajaran las ventas.' },
      regulacion: 'En EE. UU., los aranceles de 2025-2026 encarecen componentes y favorecen a quien fabrica en el país (Eaton anunció 242 M para una planta en Arkansas en septiembre de 2026) [D14]. En Europa, el reglamento de gases fluorados prohíbe el SF6 en celdas de media tensión nuevas por etapas desde 2026, lo que favorece a COL y su tecnología sin SF6 [D11]. Las normas de eficiencia de centros de datos (EED en Europa) premian la refrigeración líquida.',
      tendencias: 'Tres cambios técnicos: la densidad de los racks de IA obliga a la refrigeración líquida directa (Boyd, 1.500 M de ventas en 2026 [B4]); la distribución en corriente continua a 800 V y los transformadores de estado sólido (Resilient Power) [A1]; y las salas eléctricas modulares prefabricadas (Fibrebond), que acortan la obra. Eaton ha comprado en las tres; el riesgo es pagar caro la moda (Boyd a 22,5x EBITDA [D9]).',
      confianza: 'Media',
    },
    competencia: {
      cuota_pct: null,
      posicion: 'Uno de los tres grandes del mundo en distribución eléctrica y SAI para centros de datos con Schneider y ABB (en América, con Schneider y Vertiv); n.º 1 o 2 en varios nichos de la cadena de distribución eléctrica en EE. UU.; en refrigeración líquida, entre los primeros tras Boyd [B4, B7].',
      foso: {
        veredicto: 'Estrecho', tendencia: 'Estable',
        fuentes: [
          { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'Poco: la red de distribuidores y la base instalada ayudan, pero no es un efecto de red.' },
          { fuente: 'Costes de cambio', puntuacion: 3, evidencia: 'Los diseños de centros de datos y edificios se especifican con un fabricante y su servicio; cambiar exige recertificar.' },
          { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'Marcas Eaton, Cutler-Hammer, Bussmann y Tripp Lite; certificaciones UL y aeronáuticas.' },
          { fuente: 'Ventaja en costes', puntuacion: 2, evidencia: 'Escala de compras y fábricas en EE. UU. y México; no es la más barata.' },
          { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'Pocos fabricantes con cartera completa y capacidad en EE. UU.; márgenes de segmentos del 24,5 % frente al 21,8 % de Schneider Energy Management y 23,5 % de ABB Electrification [A5, B7].' },
        ],
      },
      amenazas: 'Las amenazas son tres. Un cambio de arquitectura en los centros de datos (corriente continua a 800 V, refrigeración integrada por los fabricantes de chips) puede dejar fuera parte del catálogo: probabilidad media a 5 años, y Eaton se cubre comprando (Resilient, Boyd). Los rivales con más capacidad (Schneider, ABB, Siemens) y los especialistas (Vertiv) bajan precios cuando se llenen las fábricas: probabilidad media en 2027-2028. Y los grandes de la nube pueden integrar diseño y compra, con más poder de negociación.',
      confianza: 'Media',
    },
    financieros: {
      comentario: 'Las ventas pasaron de 21.609 M en 2018 a 27.448 M en 2025, un 3,5 % anual, pero esa cifra resta la venta de Lighting (2020) y de Hydraulics (2021): el crecimiento orgánico fue del 8 % en 2024 y en 2025 [A1]. En 2026 el salto es mayor: +17 % en el 1T y +21 % en el 2T (14 % orgánico y 7 % de compras) [A3, A4]. El margen EBITDA contable subió del 16,6 % de 2018 al 22,5 % de 2025 por la mezcla (más centros de datos y aeroespacial) y por precio; el de segmentos llegó al 24,5 % en 2025 [A5]. En 2026 baja: Boyd Thermal entra con menos margen, las fábricas nuevas de Electrical Americas restaron margen en el 1T y la amortización de intangibles sube a ≈1.000 M al año [A3]. El BPA GAAP fue de 10,45 USD en 2025 y la guía de 2026 es de 10,36-10,56 (13,40-13,60 ajustado) [A3].',
      ajustes: 'Usamos las cifras publicadas (GAAP). Eaton da un BPA ajustado que suma tres partidas: amortización de intangibles (0,99 USD por acción en 2025; 1,74 en la guía de 2026), costes de compras y ventas (0,37 en 2025; 1,08 en 2026 por Boyd, Ultra PCS y la separación de Mobility) y reestructuración (0,26 en 2025; 0,22 en 2026, el programa termina este año) [A1, A3]. No las tratamos como no recurrentes: Eaton compra todos los años y ha reestructurado casi todos. En 2026 los 52 M de retenciones fiscales por financiar Boyd suben el tipo efectivo del 1S al 24,9 % [A3].',
      confianza: 'Alta',
    },
    trimestres: {
      ultima_presentacion: 'En el 2T26 (31-jul) la dirección subió por segunda vez la guía de crecimiento orgánico (11-13 %, desde el 7-9 % de febrero) y el BPA ajustado (13,40-13,60), mientras bajaba el GAAP (10,36-10,56) por la amortización y los costes de Boyd [A3, A5]. El mensaje cambió entre las dos conferencias: en mayo el foco era el coste de subir capacidad (el margen del 1T, 22,7 %, cayó 120 pb y la acción bajó un 5 % el día de resultados [D16]); en julio, la recuperación del margen de Electrical Americas (27,5 %, +190 pb sobre el 1T) y los pedidos (+41 % en América) [A3]. Las preguntas que más se repiten son si los pedidos de centros de datos son sostenibles en 2027, cuánto margen pierde el grupo con Boyd y cuándo llega al 28 % de 2030. La dirección no da un dato separado de pedidos de centros de datos ni de margen de Boyd. La acción subió un 7 % el día del 2T26 [D14].',
      confianza: 'Media',
    },
    balance: {
      otros_pasivos: 'Pensiones y otros beneficios: 759 M de pasivo a junio de 2026 (601 M de pensiones y 158 M de otros), 600 M después de impuestos en el puente; los planes de EE. UU. están congelados para los no sindicados [A1, A3]. Contingentes: el earn-out de Resilient (32 M) y 50 M de incentivos ligados a hitos; 240 M de bonus de retención de Fibrebond que se reconocen hasta 2031 [A3]. Hay reclamaciones de amianto de productos antiguos, sin efecto material según la empresa [A1]. Sin factoring declarado. Covenants: la línea de crédito exige solvencia, con holgura (rating A-/A3) [A1].',
      comentario: 'La deuda bruta pasó de 9.895 M en diciembre de 2025 a 20.611 M en junio de 2026 para pagar Boyd Thermal y Ultra PCS (11.080 M): la deuda neta ajustada es de 20.598 M, 3,2 veces el EBITDA de los últimos 12 meses (cifras del informe), el nivel más alto en una década. El circulante comercial se mantiene en el 18-19 % de las ventas desde 2022. El fondo de comercio e intangibles suben a 32.840 M, el 58 % del activo [A3]. La empresa usará los 1.100 M de caja de la operación con Dana para reducir deuda [A3]; con un flujo libre de ≈3.900 M al año y dividendos de ≈1.700 M, bajar de 3x a 2x lleva unos dos años sin recompras.',
      confianza: 'Alta',
    },
    flujos: {
      comentario: 'El flujo libre (después de intereses y capex) pasó de 2.093 M en 2018 a 3.553 M en 2025, con una conversión del 87-93 % del beneficio en 2023-2025 (cifras del informe). Los años anómalos: 2020 (181 %) por la caída del circulante con la pandemia y 2021 (74 %) por impuestos de la venta de Hydraulics y circulante. El capex sube del 2,6 % al 3,3 % de las ventas por las fábricas nuevas de Electrical Americas; la empresa no separa mantenimiento y crecimiento, y estimamos que el mantenimiento se parece a la depreciación (≈1,7 % de las ventas) y el resto es crecimiento (estimación propia). En el 1S26 el flujo libre fue de 1.188 M, un 47 % más [A3, A4]. El objetivo de 2030 es convertir el 95-100 % del beneficio ajustado en caja [B5].',
      confianza: 'Alta',
    },
    calidad: {
      comentario: 'Auditor Ernst & Young, opinión favorable sobre las cuentas y el control interno de 2025 [A1]. Lo que más pesa es la diferencia entre el BPA publicado y el ajustado: 13 % en 2025 y 23 % en 2026 por la amortización de intangibles y los costes de compras; el informe usa el publicado. Los costes «de compras y ventas» aparecen todos los años (54-190 M por trimestre en 2025-2026) y los de reestructuración, desde 2020: son recurrentes en la práctica. El Altman Z de 5,92 está lejos de cualquier zona de riesgo aunque la deuda haya subido; el Piotroski de 6 es neutro (resta la caída del margen y la subida de la deuda de 2026 aún no está en el año de cálculo); el Beneish M de −2,36 no sugiere manipulación. La alerta es de gobierno contable: tres cambios en la cúpula financiera en un año (director financiero y responsable contable) [C4, C5, C6], sin reexpresiones ni salvedades.',
      senales: [
        { senal: 'BPA ajustado un 23 % por encima del publicado en 2026', nivel: 'Media', comentario: 'Amortización de intangibles (1,74 USD) y costes de compras (1,08) [A3]; el consenso y los objetivos de los analistas parten del ajustado.' },
        { senal: 'Costes de compras y reestructuración todos los años', nivel: 'Baja', comentario: 'El programa de 475 M termina en 2026, pero las compras siguen (COL en 2027) [A3].' },
        { senal: 'Rotación en finanzas', nivel: 'Baja', comentario: 'Nuevo director financiero en marzo de 2026 y nuevo responsable contable en octubre [C4, C6].' },
      ],
      confianza: 'Alta',
    },
    rentabilidad: {
      comentario: 'Eaton crea valor: el ROIC fue del 15,8 % en 2025 frente a un WACC del 10,39 %, 5,4 puntos por encima, y del 13,2 % en 2023 (cifras del informe). Sin el fondo de comercio el ROIC es del 36,2 %: el negocio de base es muy rentable y lo que baja la cifra son las compras (el fondo de comercio es el 56 % del capital invertido). El ROIC sube por margen, no por rotación (0,63-0,65 veces). El ROIC incremental histórico es alto (49,7 %) porque el margen ha subido sobre la misma base de capital. La advertencia: Boyd Thermal y Ultra PCS añaden ≈11.000 M de capital en 2026 y un EBITDA de ≈420 M en Boyd (9.500 M a 22,5x [D9]); con ese capital el ROIC de 2026 bajará hacia el 12-13 % (estimación propia) y la distancia con el WACC, a 2-3 puntos, hasta que Boyd crezca. Schneider (14 %) y Hubbell (13,6 %) están en niveles parecidos; ABB (25 %) y Trane (27 %) muy por encima [D6].',
      confianza: 'Media',
    },
    capital: {
      politica: 'Eaton reparte un dividendo trimestral que sube cada año (1,04 USD en 2025, 1,10 en 2026: ≈1.700 M al año) y recompró acciones por 2.492 M en 2024 y 1.862 M en 2025 [A1, D14]. En 2026 no ha recomprado: la caja va a pagar deuda tras Boyd. El marco declarado es crecer con compras «disciplinadas» en electricidad y aeroespacial, mantener el rating A y devolver el resto [A3].',
      adquisiciones: [
        { anio: '2026', objetivo: 'Boyd Thermal (refrigeración líquida)', importe: 9550, ev_ebitda: 22.5, financiacion: 'Deuda (bonos y pagarés)', resultado: 'Pronto para juzgar: un trimestre completo; las ventas de Electrical Global +44 % (25 puntos de Boyd) con margen del 19,8 % [A3, D9].' },
        { anio: '2026', objetivo: 'Ultra PCS (electrónica aeroespacial y de defensa)', importe: 1530, ev_ebitda: null, financiacion: 'Deuda', resultado: 'Integrada en Aerospace; aporta 6 puntos de crecimiento del segmento en el 2T26 [A3].' },
        { anio: '2025', objetivo: 'Fibrebond (salas eléctricas modulares)', importe: 1430, ev_ebitda: 12.7, financiacion: 'Caja', resultado: 'En línea: Electrical Americas crece un 18 % orgánico en el 2T26; 240 M de bonus de retención encarecen la compra [A3, D8].' },
        { anio: '2021', objetivo: 'Cobham Mission Systems y Tripp Lite', importe: 4500, ev_ebitda: null, financiacion: 'Caja de la venta de Hydraulics y deuda', resultado: 'Sin deterioros; Aerospace pasó de 2.648 M a 4.249 M de ventas en 2021-2025 con margen del 23,8 % [A1, A8].' },
        { anio: '2027', objetivo: 'COL Group (media tensión sin SF6, Italia)', importe: 919, ev_ebitda: null, financiacion: 'Caja', resultado: 'Anunciada en septiembre de 2026; cierre previsto en el 1T27 [D10, D11].' },
      ],
      comentario: 'La dirección ha transformado bien la cartera: vendió Lighting e Hydraulics, compró aeroespacial y electricidad y el margen subió 6 puntos en siete años. El riesgo de la nueva etapa es el precio: Boyd costó 22,5 veces el EBITDA, el doble que las compras de nVent o Vertiv (10-13x) [D9, D13], y se pagó con deuda en el punto alto del ciclo de centros de datos. La dilución ha sido negativa (las acciones diluidas bajaron de 436,9 M en 2018 a 389,5 M en 2026) gracias a recompras de ≈1.000-2.500 M al año. La separación de Mobility con Dana a 8,3x EBITDA [D12] saca un negocio de poco crecimiento sin coste fiscal.',
      confianza: 'Media',
    },
    directivos: {
      comentario: 'Equipo nuevo: Paulo Ruiz lleva 16 meses como consejero delegado y David Foster siete como director financiero; el presidente no ejecutivo (Gregory Page) separa los cargos desde junio de 2025 [C1, C4]. Ruiz viene de dentro (siete años en Eaton) y ha hecho en un año más operaciones que su antecesor en cinco. La guía de 2026 se ha subido dos veces en crecimiento y bajado en BPA GAAP por las compras; en 2025 el BPA ajustado cayó en el centro de la guía del 3T (12,07 frente a 11,97-12,17) y el orgánico quedó por debajo (8 % frente a 8,5-9,5 %) [C7]. La salida del director financiero a los dos años y la vuelta de un jubilado de la casa como sucesor apuntan a una sucesión improvisada, aunque Foster conoce la separación de Mobility.',
      confianza: 'Media',
    },
    gobierno: {
      remuneracion: 'La remuneración total de Ruiz en 2025 fue de 7,92 M USD: 1,09 M de fijo, 1,16 M de variable anual y 5,53 M en acciones y opciones (cifras de la tabla resumen del proxy) [C1]; 128 veces el salario medio. El variable anual (0-300 % del objetivo) pagó el 70 % en 2025; el largo plazo se reparte entre acciones de rendimiento (rentabilidad total para el accionista frente a un grupo de comparables, 0-200 %), acciones restringidas y opciones [C1, A1]. Premia la cotización relativa más que el ROIC. El voto consultivo de 2026 la aprobó con el 92,7 % a favor y el 7,0 % en contra [C2].',
      control_y_defensas: 'Sin accionista de control: Vanguard (9,4 %) y BlackRock (7,0 %) son los mayores y son fondos índice [C1]. Una acción, un voto; el consejo se reelige cada año y diez de los once consejeros son independientes. Al ser sociedad irlandesa, la junta renueva cada año la autorización para emitir acciones y excluir el derecho de suscripción preferente (94,6 % a favor en 2026) [C2]. No hay operaciones vinculadas relevantes; el nuevo director financiero cobró ≈0,23 M como consultor antes de su nombramiento [C4].',
      confianza: 'Alta',
    },
    consenso: {
      guidance: 'Guía de 2026 (31-jul-2026): crecimiento orgánico del 11-13 %, margen de segmentos del 24,1-24,5 %, BPA de 10,36-10,56 USD y ajustado de 13,40-13,60; para el 3T26, orgánico del 13,5-15,5 % y BPA ajustado de 3,46-3,56 [A3]. Objetivos a 2030 (día del inversor de marzo de 2025): crecimiento orgánico del 6-9 % anual, margen de segmentos del 28 %, conversión de caja del 95-100 % y BPA ajustado creciendo más del 12 % al año [B5]. La separación de Mobility se cierra en el 1T27 [A3].',
      revisiones: 'El consenso de BPA solo está en una fuente gratuita completa (MarketScreener, base mixta: 11,25 USD en 2026, más cerca del GAAP que del ajustado) [D2]. Los objetivos de precio suben: 11 subidas entre agosto y octubre (BNP Paribas 530, RBC 526, Deutsche Bank 521, UBS 515) y el objetivo medio es de 486,05 USD con 28 analistas [D3]. El ajustado de 2026 pasó de 13,00-13,50 (febrero) a 13,40-13,60 (julio) [A3].',
      confianza: 'Media',
    },
    bolsa: {
      comentario: 'Eaton ha sido una de las grandes ganadoras de la década: un 23,1 % anual en diez años frente al 15,5 % del S&P 500 [D1]. En 2023 y 2024 subió un 56 % y un 40 % con la tesis de los centros de datos; en 2025 cayó un 2,8 % (DeepSeek en enero, el giro de la guía) y en 2026 lleva un 29,4 %, aunque en 12 meses solo un 10,4 % frente al 17,5 % del índice. La volatilidad (39,8 %) es la de un valor de la IA, no la de un industrial: diez días con caídas de más del 5 % en un año [D19]. La beta mensual de cinco años es 1,12.',
      contexto: {
        movimiento: { fecha: '2026-10-15', var_1m_pct: 0.4, var_3m_pct: -0.2, var_6m_pct: 1.7, var_12m_pct: 6.7, dist_max_52s_pct: -13.2, dist_min_52s_pct: 26.4, dist_max_historico_pct: -13.2, tendencia: 'alcista', volatilidad_60d_pct: 44, avisos: [] },
        movimientos_fuertes: [
          { periodo: 'abr-2026', var_pct: 21.1, causa: 'Rebote de todo el sector de equipos para centros de datos tras la caída del 1T, antes de los resultados del 1T26; no hubo un hecho propio de Eaton (la subida de la guía llegó el 5-may) [D19, A4].', veredicto: 'no cambia', condicion: null },
          { periodo: 'jun-2026', var_pct: -13.0, causa: 'Tres caídas del 5-7 % (5, 10 y 23-jun) por el miedo a un frenazo de la inversión en centros de datos y la valoración; el 11-jun se anunció la operación con Dana [D18, D12].', veredicto: 'no cambia', condicion: null },
          { periodo: 'sep-2026', var_pct: -13.3, causa: 'El 14-sep cayó un 7,6 % con todo el sector por el miedo a un frenazo de la IA, sin noticia propia; una semana antes UBS la había subido a comprar [D14, D15].', veredicto: 'no cambia', condicion: null },
        ],
        noticias: [
          { fecha: '2026-11-03', tipo: 'resultados', hecho: 'Resultados del 3T26 a principios de noviembre (fecha no publicada aún; el 3T25 se presentó el 4-nov). Guía del trimestre: orgánico 13,5-15,5 % y BPA ajustado 3,46-3,56 [A3].', veredicto: 'no cambia', condicion: null },
          { fecha: '2026-09-29', tipo: 'fusión u oferta', hecho: 'Compra de COL Group (Italia, media tensión) por 810 M EUR; cierre en el 1T27 [D10, D11].', veredicto: 'no cambia', condicion: null },
          { fecha: '2026-06-11', tipo: 'fusión u oferta', hecho: 'Acuerdo para combinar Mobility con Dana (≈5.100 M de valor; 1.100 M en caja para Eaton; canje de acciones en el 1T27) [D12].', veredicto: 'no cambia', condicion: null },
          { fecha: '2026-10-14', tipo: 'recomendación', hecho: 'Subidas de objetivo de BNP Paribas (530), RBC (526), Citigroup (498), HSBC (495) y Deutsche Bank (521) en octubre; UBS a comprar el 8-sep [D3, D14].', veredicto: 'no cambia', condicion: null },
          { fecha: '2026-10-15', tipo: 'directivos', hecho: 'Ventas de directivos por 22,6 M USD en 12 meses (15,8 M de Heath Monesmith y 4,2 M del consejero delegado), frente a una compra de 0,59 M de un consejero [C3].', veredicto: 'no cambia', condicion: null },
          { fecha: '2026-10-05', tipo: 'directivos', hecho: 'Cambio de responsable contable (traslado interno) tras el relevo del director financiero en marzo [C4, C6].', veredicto: 'no cambia', condicion: null },
        ],
        proximos_resultados: '2026-11-03',
        veredicto: 'no cambia',
        condicion: null,
        comentario: 'El precio está donde estaba hace seis meses (+1,7 %) y un 13 % por debajo del máximo de agosto (478): las caídas de junio y septiembre vinieron del sector (miedo a un frenazo de la IA y valoración), no de Eaton, cuyas cifras han ido a mejor (guía subida dos veces). No hay colocaciones, ampliaciones ni decisiones judiciales pendientes; la operación con Dana es un canje voluntario a valor de mercado. Las ventas de directivos son grandes pero en un valor que ha subido mucho y sin compras en contra que preocupen. Los resultados del 3T no retrasan la decisión (regla 11). Veredicto: no cambia.',
      },
      confianza: 'Alta',
    },
    multiplos_historicos: {
      comentario: 'Eaton cotizaba a 13-16 veces el beneficio del año siguiente en 2017-2018, cuando era un industrial cíclico con camiones e hidráulica; el mercado la reclasificó a partir de 2020 con la venta de lo cíclico y, desde 2023, con los centros de datos: PER adelantado de 25-32x en 2023-2025. Hoy paga 32,9x nuestro BPA GAAP de 2027, por encima de la mediana de cinco años (28,1x) y muy lejos del mínimo (19,6x en 2022). El cambio estructural es real (más crecimiento y margen), pero la mitad de la prima depende de que el ciclo de la IA dure: la regla a 12 meses supone que el múltiplo baja a medio camino hacia la mediana.',
      confianza: 'Media',
    },
    comparables: {
      criterio: 'Siete fabricantes de equipos eléctricos y térmicos que venden a centros de datos, edificios y redes: Schneider, ABB, Hubbell y nVent en distribución eléctrica, Vertiv en SAI y refrigeración de centros de datos, y Trane y Johnson Controls en refrigeración. Fuera Siemens (conglomerado con salud y trenes) y Legrand (sin datos homogéneos a la fecha). Datos de MarketScreener y Stock Analysis a 7-oct-2026, llevados al cierre del 14-oct con la variación de precio de cada uno [D6, D7]; casi todos sobre BPA y EBITDA ajustados.',
      comentario: 'Eaton cotiza a 29,2x el PER de los próximos 12 meses y 21,4x el EV/EBITDA (cifras del informe), en la parte alta del grupo con Vertiv y nVent y por encima de Schneider (24,2x) y Hubbell (24,1x), con más crecimiento que estos dos. La comparación está sesgada: los múltiplos de los comparables son sobre beneficio ajustado y los de Eaton sobre una mezcla del consenso; con su BPA ajustado de 2026 (13,50) Eaton cotiza a ≈30x. El crecimiento no explica los múltiplos del grupo (R² casi nulo). Por eso los comparables pesan 0 en el valor y su mediana de PER (27,3x) solo entra como referencia del alcista a 12 meses, donde no decide.',
      confianza: 'Media',
    },
    transacciones: {
      comentario: 'Las compras del sector se pagan a 10-13 veces el EBITDA (nVent, Vertiv, Fibrebond) salvo Boyd Thermal, a 22,5x, por su crecimiento en refrigeración líquida [D8, D9, D13]. Al múltiplo medio de las transacciones Eaton valdría ≈156 USD por acción (cifra del informe): el mercado le paga mucho más que lo que pagan los compradores por negocios pequeños. Eaton es compradora, no objetivo: por tamaño (≈159.000 M de capitalización) no hay comprador posible. La venta de Mobility a 8,3x EBITDA [D12] muestra lo que vale lo que sale del grupo.',
      confianza: 'Media',
    },
    esg: {
      calificaciones: [],
      materialidad: 'Los asuntos que mueven cifras son tres. Primero, los productos de eficiencia y electrificación: SAI, distribución y refrigeración líquida reducen el consumo de los centros de datos, y la prohibición europea del SF6 en celdas de media tensión favorece a COL [D11]. Segundo, la seguridad de producto: sus equipos protegen instalaciones críticas y un fallo tiene coste reputacional y de garantía. Tercero, las emisiones propias son pequeñas frente a las del uso de sus productos; la empresa exige ISO 14001 en todas sus fábricas [A1].',
      controversias: 'El 10-K 2025 no declara procedimientos legales ni ambientales materiales; hay reclamaciones de amianto por productos antiguos que la empresa considera no materiales [A1]. No hemos encontrado sanciones de reguladores contra Eaton en los últimos tres años en las fuentes consultadas.',
      confianza: 'Baja',
    },
    catalizadores: {
      items: [
        { fecha: '≈3-nov-2026', evento: 'Resultados del 3T26', efecto: 'Pedidos y margen de Electrical Americas; primera guía cualitativa de 2027', probabilidad: 'Alta', sentido: '+/−' },
        { fecha: 'Finales de oct-2026 y ene-2027', evento: 'Guías de inversión de los grandes de la nube para 2027', efecto: 'Marca la demanda de centros de datos y el múltiplo de todo el sector', probabilidad: 'Alta', sentido: '+/−' },
        { fecha: 'Feb-2027', evento: 'Resultados de 2026 y guía de 2027 sin Mobility; subida del dividendo', efecto: 'Primer año «limpio» del grupo eléctrico y aeroespacial', probabilidad: 'Alta', sentido: '+/−' },
        { fecha: '1T27', evento: 'Cierre de la operación Mobility-Dana (canje de acciones y 1.100 M de caja)', efecto: 'Retira ≈2,5 % de las acciones (estimación propia) y baja la deuda', probabilidad: 'Media', sentido: '+' },
        { fecha: '1T27', evento: 'Cierre de la compra de COL Group', efecto: 'Capacidad en media tensión en Europa', probabilidad: 'Alta', sentido: '+' },
        { fecha: '2027', evento: 'Vuelta a las recompras tras bajar la deuda', efecto: 'Sostiene el BPA', probabilidad: 'Media', sentido: '+' },
      ],
      confianza: 'Media',
    },
    riesgos: {
      items: [
        { riesgo: 'Frenazo de la inversión en centros de datos de IA en 2027-2028', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−40 % (precio del bajista a 12 meses)', mitigante: 'Cartera de 19.800 M (69 % a 12 meses) y negocios de redes, edificios y aeroespacial', senal: 'Relación pedidos/ventas eléctrica por debajo de 1,0 o pedidos de Electrical Americas en negativo' },
        { riesgo: 'Compresión del múltiplo (cotiza a 32,9x el BPA GAAP de 2027)', tipo: 'Valoración', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−25 % si vuelve a 24x', mitigante: 'Crecimiento del BPA del 12-15 % anual', senal: 'PER adelantado del sector por debajo de 25x' },
        { riesgo: 'Boyd Thermal no cumple (pagada a 22,5x EBITDA)', tipo: 'Ejecución', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 % (deterioro de parte de 9.550 M)', mitigante: 'Cartera de Electrical Global +103 % (2T26)', senal: 'Crecimiento de Electrical Global sin compras por debajo del 10 %' },
        { riesgo: 'Deuda alta tras las compras (3,2x EBITDA)', tipo: 'Financiero', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−5 %', mitigante: 'Rating A-/A3, flujo libre de ≈3.900 M, caja de Dana', senal: 'Rebaja de rating o deuda neta/EBITDA por encima de 3x a finales de 2027' },
        { riesgo: 'Margen: subida de capacidad, cobre y aranceles', tipo: 'Operativo', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−10 % (−2 puntos de margen, escenario bajista)', mitigante: 'Precios en contratos y cartera', senal: 'Margen de Electrical Americas por debajo del 26 %' },
        { riesgo: 'Cambio tecnológico (corriente continua 800 V, refrigeración de los fabricantes de chips)', tipo: 'Tecnológico', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−10 %', mitigante: 'Compras de Resilient Power y Boyd', senal: 'Diseños de referencia de Nvidia sin proveedores tradicionales' },
        { riesgo: 'La operación con Dana se retrasa o cae', tipo: 'Corporativo', probabilidad: 'Baja', impacto: 'Bajo', efecto_valor: '−2 %', mitigante: 'Plan B: escisión pura de Mobility', senal: 'Voto de los accionistas de Dana o retraso regulatorio' },
      ],
      premortem: 'Octubre de 2029: la acción ha perdido un 40 %. En 2027 los grandes de la nube, tras dos años de inversión récord, frenaron: la IA rendía menos de lo esperado y el exceso de capacidad de energía y frío que avisaban algunos analistas en 2026 se materializó. Los pedidos de Electrical Americas, que crecían un 41 %, cayeron un 15 % en 2028; la cartera de 19.800 M se consumió y las fábricas nuevas de Arkansas y México quedaron medio vacías, con el margen de segmentos de vuelta al 22 %. Boyd Thermal, pagada a 22,5 veces el EBITDA, se deterioró en 3.000 M. Con la deuda en 3x EBITDA, Eaton tuvo que suspender las recompras justo cuando la acción caía. El mercado dejó de pagarla como valor de la IA y volvió al múltiplo de un industrial, 20x, sobre un BPA un 15 % menor. Lo habría anticipado la relación pedidos/ventas eléctrica por debajo de 1,0 dos trimestres seguidos y el recorte de inversión de dos de los cuatro grandes de la nube.',
      ia: {
        exposicion: 'Alta', sentido: 'Mixto', efecto_valor: '+10 % / −40 % (alcista y bajista a 12 meses)',
        comentario: 'La IA es hoy el motor de Eaton, no una amenaza de sustitución: sus productos son físicos (cuadros, SAI, refrigeración) y no los reemplaza el software. La exposición es al ciclo: los centros de datos eran ≈19 % de las ventas de 2025 según BofA [B6] y con Boyd (1.500 M de refrigeración líquida [B4]) se acercan a una cuarta parte, más la parte de redes eléctricas que crece por el consumo de la IA. Si la inversión en IA se frena, el bajista a 12 meses pierde un 40 %. En costes, la IA ayuda poco en una fábrica de equipos. Señal: los pedidos de Electrical Americas y las guías de inversión de los grandes de la nube. Riesgo de IA para el negocio: medio (bajo de sustitución, alto de ciclo).',
      },
      confianza: 'Media',
    },
    preguntas: {
      items: [
        { tema: 'Centros de datos', pregunta: '¿Qué parte de los pedidos de los últimos 12 meses viene de los cuatro grandes de la nube y qué parte tiene fecha de entrega en 2028 o después?', por_que: 'La cartera es la defensa del bajista; si está concentrada y lejos, es más frágil.' },
        { tema: 'Boyd Thermal', pregunta: '¿Qué margen y crecimiento tiene Boyd en 2026 y cuál es su EBITDA real frente a los 420 M que justificaban 22,5x?', por_que: 'Decide si el ROIC del grupo vuelve por encima del 15 %.' },
        { tema: 'Margen 2030', pregunta: '¿Cómo se llega del 24,3 % de 2026 al 28 % de 2030 con Boyd diluyendo y fábricas nuevas?', por_que: 'Nuestro base supone 26,5 % en 2028; cada punto vale ≈0,75 USD de BPA.' },
        { tema: 'Mobility', pregunta: '¿Cuántas acciones de Eaton espera retirar en el canje y a qué descuento se ofrecerán las de la nueva empresa?', por_que: 'Mueve el BPA de 2027-2028 un 1-3 %.' },
        { tema: 'Deuda', pregunta: '¿Cuándo vuelven las recompras y qué deuda neta/EBITDA objetivo tiene la empresa?', por_que: 'Sin recompras el BPA crece 2-3 puntos menos al año.' },
        { tema: 'Directivos', pregunta: '¿Por qué venden los altos directivos 22,6 M en un año y por qué salió el director financiero a los dos años?', por_que: 'Señal de gobierno en una fase de muchas operaciones.' },
      ],
      confianza: 'Media',
    },
    sentimiento: {
      lectura: 'El sentimiento es dividido y estable: los particulares ven el crecimiento (cartera, pedidos, IA) pero discuten sobre todo la valoración, que es también nuestra conclusión. No hay euforia ni capitulación: tras la caída de septiembre los foros mezclan apuestas alcistas con opciones y llamadas a vender por caro [E1, E2]. Lo que aporta a la decisión es que el riesgo que más preocupa (un frenazo de la IA en 2027) ya está en el bajista del informe; el consenso de analistas (comprar, objetivo 486) es más optimista que los foros.',
      confianza: 'Media',
    },
  },
  dcf_justificacion: {
    crecimiento: 'En 2026 las ventas crecen un 20 % (fijo): 11-13 % orgánico según la guía, 7-8 puntos de Boyd Thermal, Ultra PCS y Fibrebond y algo de divisa [A3]. Después, 11,5 % en 2027 (orgánico del 9-11 % con la cartera de pedidos un 43 % mayor y medio punto de COL), 10 % en 2028 y una bajada gradual al 6 % en 2033, dentro del objetivo de la empresa del 6-9 % orgánico hasta 2030 [B5]. El grupo se proyecta con Mobility (canje neutro en valor), que crece poco: es una proyección algo conservadora para lo que queda. El crecimiento medio (9,8 %) está por debajo del consenso de MarketScreener de 2026-2028 (≈14 % en 2027 y ≈10 % en 2028) [D2].',
    margenes: 'El margen EBITDA contable pasa del 22,5 % de 2025-2026 (2026 con ≈525 M de costes de compras y la dilución de Boyd) al 23,5 % en 2027 y al 25,5 % en 2030. Es coherente con el objetivo de margen de segmentos del 28 % en 2030 [B5], restando los costes del centro corporativo (≈2,5-3 % de las ventas) y sumando la depreciación de los segmentos. No suponemos el 28 % completo: el base queda unos 2 puntos por debajo del objetivo de la empresa.',
    inversion: 'Capex del 3,4 % de las ventas, por encima del 3,3 % de 2025 (fábricas nuevas de Electrical Americas) [A1]. La amortización baja del 4,4 % al 3,4 % porque la de intangibles de Boyd y Ultra PCS (≈1.000 M al año) se diluye con el crecimiento; en el último año capex = amortización. Circulante comercial del 19 % de las ventas, como en 2022-2025 (18,3-19,0 %, cifras del informe).',
    wacc: 'Tasa libre del 5,21 % (bono de EE. UU. a 10 años, 13-oct-2026) [D4]; beta de 1,10 entre la mensual de cinco años (1,12) y la semanal (1,08) [D1]; prima de mercado del 5,5 %; coste de la deuda del 4,6 % antes de impuestos (cupones de 3,6-5,5 % de sus bonos y pagarés) [A1]; peso de la deuda del 11,5 % a valor de mercado (20.611 M frente a 159.247 M de capitalización). WACC del 10,39 % (cifra del informe). Con la prima implícita del mercado (4,20 %) [D5], la regla relativa da también Vender sobre el valor intrínseco.',
    terminal: 'Gordon con crecimiento del 3,0 % (2 % de inflación en dólares y 1 % real), por debajo de la tasa libre menos medio punto. Usamos un DCF en tres etapas: tras 2033 el crecimiento baja en línea recta del 6 % al 3 % en ocho años, porque el ROIC (15,8 %) supera al WACC en más de 5 puntos y la electrificación es un motor de más de diez años. El valor terminal pesa un 38 % del total (cifra del informe).',
  },
  etapa2_justificacion: 'La demanda de equipos eléctricos tiene un motor más largo que la proyección explícita: la AIE prevé que el consumo de los centros de datos se duplique de 2024 a 2030 [B3], las redes de EE. UU. y Europa necesitan renovarse y la electrificación de edificios e industria sigue. Eaton tiene el 62 % de sus ventas en EE. UU. y capacidad nueva en marcha [A1]. El ROIC de 2025 (15,8 %) supera al WACC (10,39 %) en 5,4 puntos (cifras del informe), justo por encima del mínimo; tras Boyd bajará, por eso la etapa de transición es corta (8 años) y sin subir el margen.',
  puente_comentarios: {
    '2026e': 'Guía orgánica del 11-13 % (10 de volumen y 2 de precio) más 8 puntos de compras (Boyd desde el 12-mar, Ultra PCS desde el 23-ene, Fibrebond en el 1T) y divisa [A3].',
    '2027e': 'Cartera de pedidos +43 % en el Eléctrico y +28 % en Aeroespacial (jun-26) [A3]; COL desde el 1T27 (≈0,5 puntos) [D11].',
    '2028e': 'Crecimiento de mercado del 22 % en centros de datos [B1] diluido por el resto de negocios; precio del 2 % como en el ciclo.',
    '2029e': 'Objetivo de la empresa de 6-9 % orgánico anual hasta 2030 [B5].',
    '2030e': 'Parte baja del objetivo de 2030: normalización del ciclo de centros de datos.',
  },
  veredicto: 'Sí',
  sostenibilidad_justificacion: 'Sí. El crecimiento proyectado sin compras (≈8 % medio) está por debajo del orgánico reciente (8 % en 2024-2025 y 14 % en el 2T26) y dentro del objetivo de 6-9 % de la empresa [A1, A3, B5]. El motor compara con un histórico del 3,5 % que resta las ventas de Lighting e Hydraulics, por eso dice «En parte». El poder de precios está demostrado (margen de segmentos del 20,5 % en 2022 al 24,5 % en 2025 con inflación de costes [A5]) y la cartera de pedidos cubre casi un año de ventas. La reinversión parece pequeña porque la amortización incluye ≈1.000 M de intangibles de compras que no son inversión de mantenimiento; con la depreciación (≈1,7 %), el capex del 3,4 % sí financia capacidad nueva. El crecimiento depende del ciclo de centros de datos, y eso está en el bajista.',
  dcf_lectura: 'El DCF da 237,93 USD por acción, un 41,8 % por debajo del precio, con un WACC del 10,39 % y un valor terminal del 38 % (cifras del informe). El DCF inverso es la clave: al precio de 408,85 el mercado descuenta un crecimiento de las ventas del 14,8 % anual en 2027-2033 frente a nuestro 8,4%, o un margen EBITDA del 37,8 % frente a nuestro 25,5 %; dicho de otra forma, la acción rinde un 7,8 % anual a nuestras cifras, por debajo del 10,39 % que pedimos. Eso es exigente frente a la historia: Eaton creció un 8 % orgánico en 2024-2025 y su objetivo a 2030 es del 6-9 %. El precio supone que el ciclo de la IA dura una década con crecimientos de dos dígitos, o que el múltiplo actual se mantiene para siempre. El DCF es sensible a la tasa: con el bono al 5,2 % un WACC del 10 % castiga a todos los crecedores; aun con un WACC de 9,9 % (−0,5) el valor solo llega a ≈274 (cifra de la sensibilidad).',
  narrativas: {
    Bajista: 'La inversión en centros de datos se frena en 2027 (como la obra no residencial de EE. UU. en 2009 o el sector en el susto de 2022): el crecimiento baja 3 puntos al año y el margen 2 puntos por la capacidad ociosa; el WACC sube medio punto.',
    Base: 'La cartera de pedidos se convierte en ventas en 2026-2027 y el crecimiento baja hacia el 6 % en 2033; el margen EBITDA sube al 25,5 %, dos puntos por debajo del objetivo de la empresa.',
    Alcista: 'La IA y las redes mantienen la demanda: 2 puntos más de crecimiento al año y el margen de segmentos llega al 28 % de 2030.',
  },
  escenarios_comentario: 'La asimetría es desfavorable: incluso el alcista (298,15) queda un 27 % por debajo del precio y el bajista (142,21) pierde un 65 % (cifras del informe). Con nuestros supuestos el valor intrínseco no alcanza el precio en ningún escenario: el mercado paga un crecimiento más largo que el de nuestro alcista. No compensa a largo plazo; a 12 meses la lectura es otra (regla de múltiplos).',
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No se aplica: Aeroespacial (15 % de las ventas) y Mobility (11 %, sale en el 1T27) tienen comparables distintos, pero el valor está en el negocio eléctrico y una suma de partes con múltiplos de mercado solo repetiría la valoración de los comparables, que pesan 0.', confianza: 'Media' },
  valoracion_comentario: 'Pesos: DCF 60 % y escenarios 40 %; comparables y transacciones 0. El DCF es el único método que no depende del múltiplo actual del sector, que cotiza con la prima de la IA; los comparables (PER 24-30x ajustado) y las transacciones (10-13x EBITDA de negocios pequeños) miden cosas distintas. La dispersión es enorme: transacciones ≈156, DCF ≈238, comparables ≈350-380 y analistas 486 (cifras del informe). El valor intrínseco de 234,38 USD (−42,7 %) dice que el precio pide más crecimiento del que creemos sostenible; la regla a 12 meses, que parte del múltiplo de hoy, dice que el precio puede aguantar un año si el BPA crece.',
  diferencia_consenso: 'Nuestro BPA GAAP de 2027 (12,43) está un 16 % por debajo del de MarketScreener (14,74) y el de 2028 (15,20) un 13 % por debajo (17,48) [D2]. La diferencia no está en el negocio: el consenso mezcla BPA ajustados (sin la amortización de intangibles, ≈2,05 USD por acción) y, en parte, sigue contando Mobility; nuestro 2028 en base ajustada sería ≈17,2, un 2 % por debajo. El objetivo medio de los analistas (486,05) aplica ≈28-30x al BPA ajustado de 2027; el nuestro (419,97) aplica 30,4x a un BPA GAAP de 2028 y pondera un bajista a 19,6x.',
  media_12m: 405.93,
  objetivo_comentario: 'El objetivo a 12 meses (419,97 USD, +3,8 % con dividendo; +14,1 % en el base) está un 79 % por encima del valor intrínseco (234,38): la regla supone que el mercado sigue pagando ≈30x el beneficio de 2028, el DCF no. Para cerrar esa distancia haría falta que la inversión en IA siga creciendo a dos dígitos más allá de 2030 o que bajen los tipos (el bono al 5,2 % pesa en el DCF). La tesis de valor es a varios años y hoy no da margen: el horizonte de 12 meses solo funciona si el múltiplo aguanta.',
  per_historico: {
    base: 'adelantado', actual: 32.9, mediana_5a: 28.1, minimo_5a: 19.6, media_larga: 23.4,
    excluidos: 'Historia adelantada (cierre de cada año ÷ BPA GAAP real del año siguiente): 2017 16,1x; 2018 13,1x; 2020 22,5x; 2021 28,1x; 2022 19,6x; 2023 25,3x; 2024 31,8x; 2025 30,4x (con nuestro BPA de 2026e, 10,46, el centro de la guía GAAP). Fuera: 2019 (27,1x sobre el BPA de 2020 hundido por la pandemia) y 2016 (BPA de 2017 inflado por la reforma fiscal). Actual: 408,85 ÷ 12,43 (nuestro BPA GAAP de 2027e) = 32,9x.',
    v2: { mediana_5a: 30.5, minimo_5a: 25.6, media_larga: 26.5, excluidos: 'Historia al cierre (precio ÷ BPA GAAP del mismo año): 2021 32,4x; 2022 25,6x; 2023 30,0x; 2024 34,9x; 2025 30,5x; 2018 14,0x; 2019 18,0x. Fuera 2020 (34,4x sobre el BPA de la pandemia) y 2017 (plusvalía fiscal).' },
  },
  casos_12m: [
    { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: 12.50, multiplo: null, precio: null, justificacion: 'Los grandes de la nube frenan la inversión en 2027 y los pedidos de centros de datos caen: ventas sin Mobility de ≈35.000 M en 2028 y margen de segmentos del 24,5 % por la capacidad ociosa. BPA GAAP 12,50 sobre ≈380 M de acciones tras el canje de Mobility (estimación propia).' },
    { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: 15.20, multiplo: null, precio: null, justificacion: 'Sin Mobility, ventas de ≈36.900 M en 2028 (+11 % en 2027 y +10 % en 2028 con la cartera de pedidos) y margen de segmentos del 26,5 %, camino del 28 % de 2030; amortización de intangibles ≈1.000 M, intereses ≈650 M y tipo del 18,5 %. BPA GAAP 15,20 (≈17,2 ajustado).' },
    { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: 16.80, multiplo: null, precio: null, justificacion: 'La demanda de centros de datos y de redes sigue como en 2026 y Boyd crece al 30 %: ventas sin Mobility de ≈38.300 M y margen de segmentos del 27,5 % ya en 2028. BPA GAAP 16,80.' },
  ],
  resumen: {
    recomendacion: 'Mantener', conviccion: 'Media', justificacion_recomendacion: null, horizonte: '12 meses',
    sintesis: `**La recomendación y por qué.** Mantener, convicción media. El objetivo a 12 meses es de 419,97 USD: una rentabilidad ponderada del 3,8 % con dividendo y del 14,1 % en el caso base, lejos del 15 % que pide una compra. El valor intrínseco (234,38) está un 42,7 % por debajo del precio de 408,85, y el objetivo medio de los analistas (486,05) queda por encima de nuestro rango central. El bajista a 12 meses pierde un 40 % y el alcista gana un 26 %: la asimetría no compensa. La razón principal: Eaton es un gran negocio en el centro de la electrificación y de la IA, pero el precio ya descuenta una década de crecimiento de dos dígitos. La convicción es media porque las dos reglas (absoluta y relativa) coinciden y la ponderada está lejos de los umbrales; bajaría si la relación pedidos/ventas eléctrica cae de 1,0 y subiría con una caída del precio hacia 300 sin cambio en la cartera.

**El negocio.** Eaton fabrica la cadena eléctrica de los centros de datos, los edificios y las redes, y desde marzo la refrigeración líquida (Boyd Thermal). El ROIC de 2025 fue del 15,8 % frente a un WACC del 10,39 %, y del 36,2 % sin el fondo de comercio; su margen de segmentos (24,5 %) supera al de Schneider y ABB [B7]. El foso es estrecho: escala, especificación en proyectos y servicio, no una ventaja imposible de copiar. Sostenibilidad del crecimiento: Sí; el ≈8 % orgánico que proyectamos está por debajo del 14 % actual y dentro del objetivo de 6-9 % a 2030, con poder de precios demostrado. Pero el ROIC bajará hacia el 12-13 % con los 11.000 M invertidos en Boyd y Ultra PCS (estimación propia): la calidad pasa justa el listón de 5 puntos.

**Sector y ciclo.** Estamos en la fase alta del ciclo inversor de centros de datos: pedidos +41 % en América y cartera +43 % [A3]. Dell'Oro prevé un 22 % anual hasta 2030 [B1], pero el sector ya cayó dos veces en 2026 por miedo a un exceso de capacidad.

**Finanzas.** La deuda neta ajustada (20.598 M) es 3,2 veces el EBITDA tras las compras; el BPA GAAP de 2026 (10,36-10,56) no crece por la amortización y los costes de Boyd, aunque el ajustado sube un 12 %. La conversión de caja es buena (87-93 %).

**Equipo y gobierno.** Consejo independiente y cargos separados; pero un equipo nuevo, tres cambios en la cúpula financiera en un año y ventas de directivos por 22,6 M.

**Valoración.** El DCF inverso dice que el precio necesita un crecimiento del 14,8 % anual hasta 2033 frente a nuestro 8,4 %. A 12 meses la regla parte de 32,9x nuestro BPA GAAP de 2027, lo lleva a 30,4x (a medio camino hacia la mediana de cinco años, 28,1x) sobre un BPA de 2028 de 15,20, y pondera un bajista al mínimo de 19,6x. Discrepamos del consenso en la base (GAAP frente a ajustado), no en el negocio.

**Riesgos y catalizadores.** El riesgo mayor es un frenazo de la inversión en IA en 2027 (−40 %) y la compresión del múltiplo; después, Boyd pagada a 22,5x EBITDA. Catalizadores: resultados del 3T26 a principios de noviembre, guías de inversión de los grandes de la nube y cierre de Mobility-Dana y COL en el 1T27. Los foros discuten sobre todo la valoración, como nosotros.

**Qué cambiaría la decisión.** Comprar por debajo de 234,38 USD (el valor intrínseco manda sobre la regla); vender por encima de 471,39. Pasaríamos a vender si la relación pedidos/ventas eléctrica cae por debajo de 1,0 dos trimestres o si el margen de Electrical Americas baja del 26 %.`,
    tesis: 'Eaton es el tercer gran fabricante mundial de equipos de distribución eléctrica y SAI, con el 62 % de las ventas en EE. UU. y un margen de segmentos del 24,5 % [A1, A5]. Ha pasado de proveedor de camiones a empresa de electricidad y aeroespacial, y con Boyd Thermal añade la refrigeración líquida de los centros de datos de IA. Sus pedidos crecen un 41 % y la cartera un 43 % [A3].\n\nEl precio (408,85 USD) descuenta mucho: 32,9 veces nuestro BPA GAAP de 2027 y, según el DCF inverso, un crecimiento del 14,8 % anual hasta 2033, casi el doble de nuestro caso base (8,4 %) y por encima del objetivo de la propia empresa (6-9 % orgánico hasta 2030) [B5].\n\nEl mercado acierta en la calidad y en la dirección del ciclo, pero pide que dure demasiado. Para invertir hoy hay que creer que la inversión en IA y en redes crece a dos dígitos más allá de 2030 y que Eaton mantiene el margen pese a Boyd y a la competencia. Nuestra lectura: excelente empresa, precio que deja poco margen; a 12 meses el múltiplo puede aguantar, pero el riesgo de un frenazo es asimétrico.',
    vision_diferencial: {
      mercado_descuenta: 'Un crecimiento de ventas del 14,8 % anual hasta 2033 con márgenes que siguen subiendo, y un múltiplo de ≈30x el beneficio ajustado que se mantiene. Los analistas (objetivo medio 486,05) esperan un 19 % más en un año.',
      nuestra_vision: 'El crecimiento es real pero cíclico: 8-10 % de media hasta 2030 y bajando después; el margen sube hasta ≈25,5 % de EBITDA, por debajo del objetivo de la empresa. El valor intrínseco es de 234,38 y el objetivo a 12 meses de 419,97.',
      por_que: 'Los ciclos de inversión en infraestructura (telecomunicaciones en 2000, obra no residencial en 2008) acaban con exceso de capacidad, y Eaton ha comprado en el pico (Boyd a 22,5x). El mercado extrapola la cartera de hoy.',
    },
    a_favor: [
      '**Pedidos y cartera en máximos**: pedidos de Electrical Americas +41 % y cartera eléctrica +43 % (2T26) [A3].',
      '**Margen superior a sus rivales**: 24,5 % de margen de segmentos en 2025 frente al 21,8 % de Schneider Energy Management [A5, B7].',
      '**Crea valor**: ROIC del 15,8 % frente a un WACC del 10,39 % (36,2 % sin fondo de comercio).',
      '**Cartera más limpia**: sale Mobility (crecimiento negativo) a cambio de 1.100 M en caja y un canje sin impuestos [D12].',
      '**Guía al alza**: crecimiento orgánico de 2026 subido del 7-9 % al 11-13 % en cinco meses [A3].',
    ],
    en_contra: [
      '**Precio exigente**: el DCF inverso pide un 14,8 % anual de crecimiento hasta 2033; el valor intrínseco es de 234,38.',
      '**Compra cara en el pico**: Boyd Thermal a 22,5 veces el EBITDA, pagada con deuda [D9].',
      '**Deuda al alza**: deuda neta ajustada de 20.598 M, 3,2 veces el EBITDA.',
      '**BPA GAAP plano en 2026**: 10,36-10,56 frente a 10,45 en 2025 por amortización y costes de compras [A3].',
      '**Bajista severo**: −40 % a 12 meses si el ciclo de la IA se frena y el múltiplo vuelve a 19,6x.',
    ],
    que_vigilar: 'La tesis de Mantener depende de que la demanda de centros de datos siga creciendo en 2027: la señal es la relación pedidos/ventas del negocio eléctrico (1,2 hoy) y los pedidos de Electrical Americas (+41 %). Si los pedidos caen en negativo o la relación baja de 1,0, el bajista se activa. La otra condición es que Boyd no diluya el margen: margen de Electrical Global por encima del 19 %.',
    cambiaria_recomendacion: [
      'Precio por debajo de 234,38 USD (valor intrínseco): pasaríamos a Comprar si la cartera no ha cambiado.',
      'Precio por encima de 471,39 USD: Vender (ponderada a 12 meses ≤ −10 %).',
      'Relación pedidos/ventas eléctrica por debajo de 1,0 dos trimestres seguidos: revisar a Vender.',
      'Margen de Electrical Americas por debajo del 26 % en un trimestre: rebajar el BPA del base.',
      'Recorte de la guía de inversión de dos de los cuatro grandes de la nube para 2027.',
    ],
    kpis_seguimiento: [
      { kpi: 'Pedidos de Electrical Americas (media móvil 12 meses)', nivel_actual: '+41 % (2T26)', umbral_alerta: 'Negativo', por_que: 'Adelanta las ventas de 2027-2028.' },
      { kpi: 'Relación pedidos/ventas eléctrica', nivel_actual: '1,2', umbral_alerta: '< 1,0', por_que: 'La cartera deja de crecer.' },
      { kpi: 'Margen de segmentos del grupo', nivel_actual: '23,1 % (2T26); guía 24,1-24,5 %', umbral_alerta: '< 23 % en 2027', por_que: 'Camino al 28 % de 2030.' },
      { kpi: 'Deuda neta / EBITDA', nivel_actual: '3,2x', umbral_alerta: '> 3x a final de 2027', por_que: 'Sin desapalancar no hay recompras.' },
      { kpi: 'Crecimiento orgánico', nivel_actual: '14 % (2T26)', umbral_alerta: '< 6 %', por_que: 'Debajo del objetivo 2030.' },
    ],
  },
};
