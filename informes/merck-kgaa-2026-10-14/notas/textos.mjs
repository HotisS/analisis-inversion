// Textos del analista (Merck KGaA, corte 2026-10-14). Cifras del motor tal cual (calc); hechos con cita [letra+n].
export default {
  limitaciones: 'Entorno sin red salvo la búsqueda web: ningún documento se ha abierto entero; todas las cifras salen de extractos de búsqueda de documentos citados (informes anuales, notas de resultados, proveedores de datos) y lo que no cuadra está en null. Línea cotizada: Xetra (MRK). Las acciones (434,8 M) son el capital total equivalente con el que la empresa calcula el BPA: 129,2 M cotizan y el resto corresponde a la participación de E. Merck KG (≈ 70 %), que no cotiza. Precio: 137,20 EUR, cotización de Börse Stuttgart del 13-oct-2026 (sin cierre de Xetra verificable). Pasivos financieros con arrendamientos incluidos. Proveedores de 2025 = los de 2024 (estimación). Comparables reutilizados de los análisis del repo del mismo día. Sin bolsa.mjs: no hay beta propia, rentabilidades ni volatilidad.',
  controles_explicados: [
    { control: 'Capitalización calculada', explicacion: 'La capitalización publicada (63.330 M) es de Stockopedia a 145,65 EUR; a ese precio da las mismas 434,8 M de acciones. La diferencia es solo de fecha del precio.' },
    { control: 'Comparables estables', explicacion: 'La muestra mezcla herramientas de laboratorio (24-26x EBITDA) y farmacéuticas (7-13x), porque Merck es las dos cosas: la mediana salta según cuál se quite. Por eso los comparables pesan solo un 25 % y la suma de partes no se hace sin cifras de segmento completas.' },
  ],
  huecos: [
    { seccion: 'bolsa', campo: 'sección completa', tipo: 'Complemento', intentos: '1) herramientas/bolsa.mjs sin red; 2) búsqueda de rentabilidades anuales: solo cierres; 3) proveedores (Stockopedia, Digrin): instantáneas sin fecha', decision: 'Omitido' },
    { seccion: 'historia', campo: 'sección completa', tipo: 'Complemento', intentos: '1) web corporativa no accesible; 2) informe anual por búsqueda: no buscado (presupuesto compartido); 3) conocimiento general no citable', decision: 'Omitido' },
    { seccion: 'valoracion', campo: 'pensiones a jun-26', tipo: 'Complemento', intentos: '1) informe del 2T26: solo deuda neta; 2) balance 2025: sin la línea; 3) balance 2024: 1.956 M de provisiones no corrientes para prestaciones a empleados', decision: 'Calculado y marcado como estimación' },
  ],
  secciones: {
    negocio: {
      descripcion: 'Merck KGaA (Darmstadt; en EE. UU. y Canadá opera como EMD/MilliporeSigma) es un grupo de ciencia y tecnología con tres negocios. Life Science (9.000 M de ventas en 2025, el 43 %) vende consumibles, reactivos y equipos a laboratorios de investigación y a fabricantes de biofármacos (filtración, medios de cultivo, servicios de proceso) [A8]. Healthcare (8.600 M, 41 %) vende medicamentos con receta: oncología (Bavencio, Erbitux y los de SpringWorks, comprada en 2025), neurología (Mavenclad, Rebif), fertilidad y medicamentos generales de marca [A8]. Electronics (≈ 3.500 M, 17 %) vende materiales para semiconductores y pantallas [A1, A7]. Ha acordado comprar Bio-Techne (reactivos de investigación) por ≈ 9.900 M EUR, con cierre previsto a finales de 2026 o principios de 2027 [B3].',
      como_gana_dinero: 'En Life Science, la mayor parte de las ventas son consumibles que se repiten con cada lote de producción de un biofármaco: cuando un proceso se valida con un filtro o un medio, cambiarlo exige revalidar, y eso da recurrencia y precio. En Healthcare el margen depende de las patentes: Mavenclad perdió la exclusividad en EE. UU. y la guía supone cero ventas allí desde agosto de 2026 [A3, A14]. Electronics es cíclica y va con la inversión en chips; creció un 11,7 % orgánico en el 2T26 por la IA [A3]. El grupo tiene un margen EBITDA pre del 28,9 % en 2025 y del 29,4 % en el 2T26 [A1, A3]; la divisa es la palanca a corto plazo (−5,5 % en las ventas del 1T26) [A6].',
      clientes: 'No hay datos públicos de concentración en los extractos leídos. Life Science vende a miles de laboratorios y a las grandes farmacéuticas y CDMO; Healthcare, a sistemas sanitarios y mayoristas; Electronics, a un número reducido de fabricantes de chips y pantallas. El poder de precios demostrado se ve en Life Science: margen EBITDA pre de ≈ 29 % (2.600 de 9.000 M) en 2025 pese al bache de los bioprocesos [A8].',
    },
    sector: {
      definicion: 'Merck compite en tres mercados distintos: herramientas y consumibles de ciencias de la vida (con Thermo Fisher, Danaher, Sartorius y, tras la compra, el antiguo competidor Bio-Techne), farmacia de especialidad (oncología, esclerosis múltiple, fertilidad) y materiales para semiconductores. No hemos podido leer estimaciones de tamaño de mercado con el presupuesto de búsquedas de esta sesión, así que la sección es cualitativa.',
      tamano: null, unidad_serie: null, serie: [], tcac_historico_pct: null, tcac_previsto_pct: null, cr5_pct: null, estructura: 'Moderadamente concentrada',
      drivers: [
        { driver: 'Producción de biofármacos (bioprocesos)', efecto: '+', horizonte: 'Estructural', evidencia: 'Process Solutions creció un 10,3 % orgánico en el 3T25 tras el ajuste de inventarios de 2023-24 [A7].' },
        { driver: 'Inversión en chips para IA', efecto: '+', horizonte: 'Cíclico', evidencia: 'Electronics +11,7 % orgánico en el 2T26 [A3].' },
        { driver: 'Pérdidas de exclusividad en farmacia', efecto: '−', horizonte: 'Estructural', evidencia: 'Mavenclad sin ventas en EE. UU. desde agosto de 2026; Healthcare −3,4 % orgánico en el 2T26 [A3, A14].' },
        { driver: 'Dólar frente al euro', efecto: '−', horizonte: 'Cíclico', evidencia: 'Efecto divisa de −5,5 % en las ventas del 1T26 y −4,9 % en el 3T25 [A6, A7].' },
      ],
      porter: [
        { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Tres grandes en ciencias de la vida que compiten en servicio y gama más que en precio; márgenes EBIT de 17-19 % en Thermo Fisher y Danaher [B1, B2].' },
        { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Las farmacéuticas son grandes compradoras, pero cambiar un consumible validado en un proceso aprobado es caro.' },
        { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Materias primas químicas diversificadas; sin proveedor crítico identificado.' },
        { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Gama de cientos de miles de productos y redes de distribución difíciles de replicar; las compras grandes (Bio-Techne a ≈ 26,5x EBITDA) muestran el precio de entrar [B4].' },
        { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'En farmacia, genéricos y biosimilares al vencer las patentes (Mavenclad) [A14].' },
      ],
      ciclo: { posicion: 'Recuperación', comentario: 'Los bioprocesos salen del ajuste de inventarios de 2023-24 (crecimiento orgánico de Process Solutions del 10,3 % en el 3T25) y los semiconductores crecen con la IA [A7, A3]. En 2021-22 la pandemia infló la demanda (ventas de 22.232 M en 2022) y en 2023 cayeron un 5,6 % [A1].' },
      regulacion: 'Precios de medicamentos en EE. UU. (negociación de Medicare y aranceles) y en Europa, y la caducidad de patentes, que en 2026 se lleva las ventas de Mavenclad en EE. UU. [A14]. La compra de Bio-Techne necesita la aprobación de los reguladores de competencia [B3].',
      tendencias: 'Más biofármacos (anticuerpos, terapias celulares y génicas) aumentan el consumo de filtros y medios por dosis; la IA impulsa los materiales avanzados para chips. Merck gana con las dos si mantiene cuota.',
      confianza: 'Baja',
    },
    competencia: {
      foso: {
        veredicto: 'Estrecho', tendencia: 'Estable',
        fuentes: [
          { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'No aplica.' },
          { fuente: 'Costes de cambio', puntuacion: 4, evidencia: 'Consumibles validados en procesos de fabricación aprobados por los reguladores.' },
          { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'Marcas Sigma-Aldrich y Millipore; patentes farmacéuticas que caducan (Mavenclad) [A14].' },
          { fuente: 'Ventaja en costes', puntuacion: 2, evidencia: 'Escala en química fina; margen EBITDA pre del grupo del 28,9 % [A1].' },
          { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'Tres grandes en ciencias de la vida; nichos en materiales para chips.' },
        ],
      },
      amenazas: 'La rentabilidad sobre el capital (ROIC del 7,5 % en 2025) no supera al coste de capital: el foso protege márgenes, pero las compras pagadas caras (Sigma-Aldrich, Versum, SpringWorks y ahora Bio-Techne) lo diluyen. En farmacia la amenaza son los genéricos; en Electronics, la concentración de clientes y el ciclo.',
    },
    financieros: {
      comentario: 'Las ventas pasaron de 19.687 M en 2021 a 22.232 M en 2022 con la pandemia y se han quedado en torno a 21.000 M desde entonces (21.102 M en 2025, −0,3 %) [A1]. El crecimiento orgánico de 2025 fue del 3,1 %, comido por un −3,7 % de divisa [A8]. El margen EBITDA publicado bajó del 30,2 % de 2021 al 28,0 % de 2025, y el EBIT de 4.179 a 3.601 M, porque la amortización subió con las compras (de 1.767 a 2.298 M) [A1]. El beneficio neto cayó de 3.057 a 2.608 M y el BPA de 7,03 a 6,00; en 2025 pesó también el resultado financiero (−293 M frente a −109 M, por la deuda de SpringWorks) [A2]. En 2026 la empresa ha subido dos veces la guía (EBITDA pre de 5.900-6.300 M, BPA pre de 7,90-8,60) [A3].',
      ajustes: 'La empresa publica «EBITDA pre» y «BPA pre», que excluyen reestructuraciones, integraciones y litigios (210 M en 2025 y 293 M en 2024: se repiten, así que en el DCF los tratamos como gasto) y, el BPA pre, la amortización de intangibles comprados. Usamos las cifras publicadas en la cuenta y el DCF, y el BPA pre solo para el PER a 12 meses, porque es el que mira el mercado y el de la guía. Diferencia en 2025: BPA pre 8,34 frente a 6,00 publicado [A8, A2].',
    },
    trimestres: {
      ultima_presentacion: 'En el 2T26 (6-ago) la dirección subió por segunda vez la guía de 2026: ventas de 21.000-21.800 M, EBITDA pre de 5.900-6.300 M y BPA pre de 7,90-8,60, apoyándose en Life Science y en un Electronics que crece por la IA (+11,7 % orgánico), mientras Healthcare cae un 3,4 % orgánico por los genéricos de Mavenclad [A3]. La guía supone cero ventas de Mavenclad en EE. UU. desde agosto y excluye un posible lanzamiento de Pergoveris en EE. UU. [A3]. En el 1T26 (13-may) el discurso fue de «crecimiento pese a la divisa» (orgánico +2,9 %, divisa −5,5 %), con 67 M de efectos únicos en Electronics que los analistas señalaron [A6, A16]. El tema de las preguntas en agosto fue Bio-Techne: precio, financiación y cuándo aportará al BPA (al tercer año, según la empresa) [A13, B4].',
    },
    balance: {
      otros_pasivos: 'Provisiones no corrientes para prestaciones a empleados de 1.956 M a dic-24 [A20]: las llevamos al puente netas de un 25 % de impuestos (1.467 M, estimación). La compra de Bio-Techne (≈ 9.900 M EUR de valor empresa) añadirá deuda: con un EBITDA pre de ≈ 6.300 M y la deuda neta actual de 9.207 M, la deuda neta subiría a ≈ 19.000 M, unas 2,8 veces el EBITDA pre combinado (estimación propia), y la empresa dice que mantendrá el grado de inversión [A18]. No hemos encontrado covenants, factoring ni pagos aplazados relevantes.',
      comentario: 'La deuda financiera neta subió de 8.619 M (dic-25) a 9.207 M (jun-26) por el dividendo; 1,4 veces el EBITDA pre [A4, A15]. El patrimonio neto es el 55,6 % del activo y el fondo de comercio (17.934 M) más los intangibles (7.662 M) suman la mitad del activo [A1, A2]: el balance es de comprador de empresas. El circulante comercial (existencias 4.562 M, clientes 3.947 M) ronda el 30 % de las ventas, alto, por la gama amplia de Life Science.',
    },
    flujos: {
      comentario: 'El flujo operativo osciló entre 3.784 y 4.616 M en 2021-2025 y el capex (material más intangibles) subió del 7,2 % de las ventas en 2021 al 10,3 % en 2024 (nuevas plantas de Life Science y Electronics) y 9,3 % en 2025 [A9, A1]. El FCF de 2025 fue de 1.974 M, el 76 % del beneficio neto, y la caja se fue en compras (2.915 M por SpringWorks) [A9]. La empresa no da el reparto entre capex de mantenimiento y de crecimiento; con una amortización del inmovilizado propio de ≈ 5,5 % de las ventas (la que cuadra el BPA pre), estimamos que unos 3-4 puntos del capex son de crecimiento (estimación propia).',
    },
    calidad: {
      comentario: 'No hemos podido leer el informe del auditor ni las notas. Lo que se ve en las cifras: la diferencia entre el BPA pre y el publicado (8,34 frente a 6,00 en 2025) es sobre todo amortización de intangibles comprados, que no es caja, más 200-300 M al año de reestructuraciones e integraciones que se repiten [A1, A8]. El Altman Z de 2,21 («zona gris») refleja un balance con mucho fondo de comercio y poca rotación, no un riesgo de impago (deuda neta de 1,4 veces el EBITDA pre). El Piotroski de 4 recoge la caída del ROA y del margen desde 2022. El Beneish M de −2,20 no sugiere manipulación.',
      senales: [{ senal: 'Ajustes «pre» que se repiten cada año', nivel: 'Baja', comentario: '210-293 M al año; los tratamos como gasto en el DCF.' }],
      confianza: 'Baja',
    },
    capital: {
      politica: 'Dividendo estable de 2,20 EUR desde 2022 (1,85 en 2021), un pago del 26 % del BPA pre y del 37 % del BPA publicado de 2025 [A15]. No hay recompras: la familia controla el 70 % y la empresa prioriza las compras en Life Science manteniendo el grado de inversión [A18].',
      adquisiciones: [
        { anio: '2026', objetivo: 'Bio-Techne (pendiente de cierre)', importe: 9900, ev_ebitda: 26.5, financiacion: 'Caja y deuda nueva', resultado: 'Sin cerrar; no aporta al BPA pre hasta el tercer año, según la empresa [B3, B4].' },
        { anio: '2025', objetivo: 'SpringWorks Therapeutics', importe: 2915, ev_ebitda: null, financiacion: 'Caja y deuda', resultado: 'Consolidada desde julio de 2025; oncología de tumores raros que compensa en parte la caída de Mavenclad [A9, B5].' },
      ],
      comentario: 'El ROIC ha bajado del 10,8 % de 2021 al 7,5 % de 2025 y el ROIC incremental de esos años es negativo: el capital invertido creció de 30.318 a 37.831 M mientras el NOPAT caía. Parte es el ciclo de la pandemia, pero también refleja compras caras: Bio-Techne se paga a ≈ 26,5 veces el EBITDA. La familia no diluye (no hay ampliaciones) y el dividendo es prudente; el juicio sobre la dirección como asignadora de capital es, por ahora, neutral tirando a negativo.',
      confianza: 'Media',
    },
    directivos: {
      comentario: 'La sucesión fue ordenada: Kai Beckmann, en la Dirección desde 2011 y responsable de Electronics, se anunció en septiembre de 2025 y relevó a Belén Garijo el 1-may-2026 [C1, C2]. La guía se ha cumplido en 2021, 2023 y 2025, y la de 2026 se ha subido dos veces tras un punto de partida conservador [A3, A6]. Falta por ver la integración de Bio-Techne, la primera gran compra del nuevo CEO.',
    },
    gobierno: {
      remuneracion: 'El informe de remuneraciones de 2025 se aprobó con un 87,23 % de votos a favor (88,28 % el año anterior) [C3]. No hemos podido leer la política ni las métricas del variable.',
      control_y_defensas: 'Merck KGaA es una sociedad comanditaria por acciones: E. Merck KG, el vehículo de la familia Merck, es el socio personalmente responsable y tiene ≈ 70 % del capital total; los accionistas cotizados tienen el 30 % restante. El consejo de socios de E. Merck KG nombra a la Dirección (así se eligió a Beckmann) [C1], y la junta de los accionistas cotizados no puede cambiarla. El minoritario está protegido por la alineación económica (la familia cobra el mismo dividendo y no vende), no por los derechos de voto.',
      confianza: 'Media',
    },
    consenso: {
      guidance: 'Guía de 2026 (6-ago-2026, segunda subida): ventas de 21.000-21.800 M (orgánico +1 % a +3 %), EBITDA pre de 5.900-6.300 M (orgánico 0 % a +3 %) y BPA pre de 7,90-8,60, sin ventas de Mavenclad en EE. UU. desde agosto ni Pergoveris en EE. UU. [A3]. En mayo era de 20.400-21.400 M, 5.700-6.100 M y 7,50-8,20 [A6].',
      revisiones: 'Las estimaciones han subido desde mayo con las dos subidas de la guía: el BPA pre medio del consenso VARA (7,78, rango 7,45-8,03) es anterior a la segunda subida [D5]. Los objetivos de precio también suben: Deutsche Bank de 125 a 141 (agosto), Barclays de 140 a 150 (septiembre) [D9, D1]. Solo hay una fuente con estimaciones completas de ventas y EBITDA (MarketScreener) [D4].',
    },
    multiplos_historicos: {
      comentario: 'Con el BPA publicado, el PER de cierre ha bajado de 32x en 2021 a 20x en 2025; con el BPA pre, que es el que mira el mercado, de 26,0x a 14,7x (2025, mínimo de la serie). Hoy cotiza a 16,1 veces nuestro BPA pre de 2027e, por debajo de la mediana de cinco años (17,0x). La compresión responde al bache de los bioprocesos de 2023-24, a la caída de Healthcare por patentes y al dólar; no a un cambio del perfil de riesgo financiero.',
    },
    comparables: {
      criterio: 'Herramientas de ciencias de la vida (Thermo Fisher, Danaher, Agilent, Qiagen) para Life Science, y farmacéuticas europeas (Novartis, AstraZeneca, Sanofi, GSK) para Healthcare. No hay comparable puro de Electronics en la muestra (Entegris no se pudo leer). Merck es las tres cosas a la vez, así que ningún comparable lo es del todo.',
      comentario: 'Merck cotiza a 11,7 veces el EBITDA de los próximos 12 meses y 17,6 veces el beneficio, en medio de las dos familias: muy por debajo de las herramientas estadounidenses (24-26x EBITDA, PER de 21-25x) y por encima de Sanofi y GSK (PER de 10-12x). Ponderando por el peso de cada negocio (43 % Life Science) el descuento frente a una suma de partes razonable existe, pero se explica por el ROIC (7,5 % frente a 11-19 % de Qiagen y las farmacéuticas) y por el control familiar. La mediana de PER de la muestra es de 19,5x.',
    },
    transacciones: {
      comentario: 'La única operación con múltiplo es la propia compra de Bio-Techne a ≈ 26,5 veces el EBITDA esperado de 2026 [B4]: dice cuánto se paga hoy por activos de reactivos de investigación, no cuánto valdría Merck, que con un 70 % en manos de la familia no es opinable. No ponderamos las transacciones.',
    },
    sentimiento: {
      lectura: 'El sentimiento está dividido y mejorando: la prensa y los comentaristas alemanes critican el precio de Bio-Techne y la caída de Healthcare, mientras las notas de bancos y las comunidades de valoración insisten en el descuento frente a Thermo Fisher y Danaher y en la guía conservadora [E1, E2, E5]. No hay euforia ni capitulación. No aporta un riesgo que el informe no recoja; confirma que el catalizador que el mercado espera es que Electronics y Life Science compensen a Healthcare, y que la compra de Bio-Techne frena la revalorización mientras no se vea su aportación.',
    },
  },
  dcf_justificacion: {
    crecimiento: 'El 2026e está casi cerrado (dos trimestres publicados y la guía subida dos veces): +1,4 %, el centro de la guía (21.400 M) [A3]. En 2027e, +3,0 %: el año completo sin Mavenclad en EE. UU. resta a Healthcare, mientras Life Science y Electronics crecen a un ritmo medio-alto de un dígito. De 2028e a 2030e, 4,0 % y 3,5 %, por encima del crecimiento de 2021-2025 (TCAC del 1,8 %, con el pico de la pandemia) y en línea con el orgánico de 2025 (3,1 %) y del 2T26 (4,1 %) [A1, A3]. Hasta el 2,5 % en el terminal. El consenso de MarketScreener supone ventas de 22.060 M en 2027 y 23.280 M en 2028 (con Bio-Techne parcialmente) [D4].',
    margenes: 'Margen EBITDA del 27,5 % en 2026e (el EBITDA pre del centro de la guía, 6.100 M, menos 1 punto de ajustes que se repiten) y hasta el 28,5 % en 2030e, la mitad de la mejora que ha mostrado el EBITDA pre en el 2T26 (29,4 %) [A3]. Por debajo del 30,2 % de 2021, con la pandemia [A1].',
    inversion: 'Capex del 9,3 % de las ventas en 2026e (el de 2025) bajando al 7,0 % al final, cuando acaba el ciclo de plantas nuevas (7,2 % en 2021) [A9]. Amortización del inmovilizado propio del 6,0 % al 6,7 % (sin la de intangibles comprados, que no es caja). Circulante comercial del 29,5 % de las ventas, el de 2025.',
    wacc: 'Bund a 10 años del 3,53 % [D15], beta de 0,85 (estimación: salud y química diversificada europea; no hemos podido medirla), prima de mercado del 5,5 % y sin prima adicional (vende en todo el mundo). Coste de la deuda del 3,6 % antes de impuestos (gastos financieros de 404 M sobre ≈ 11.000 M de deuda media [A2]) con un peso del 15 %. WACC del 7,40 %. Con la prima implícita del mercado (4,2 %), el 6,46 %.',
    terminal: 'Gordon con un crecimiento del 2,0 % (inflación del euro más un crecimiento real modesto), por debajo de la tasa libre menos medio punto. El múltiplo de salida implícito queda en torno a 13 veces el EBITDA, el de las farmacéuticas europeas grandes y muy por debajo de las herramientas estadounidenses.',
  },
  puente_comentarios: {
    '2026e': 'Volumen de Life Science y Electronics (+4,1 % orgánico del grupo en el 2T26), precio casi neutro, y −2,1 puntos de divisa y Mavenclad fuera de EE. UU. desde agosto [A3].',
    '2027e': 'Año completo sin Mavenclad en EE. UU. (resta ≈ 2 puntos al volumen de Healthcare); Life Science y Electronics compensan.',
    '2028e': 'Volumen de bioprocesos y materiales para chips; precio en línea con la historia de Life Science.',
    '2029e': 'Igual que 2028e; medio punto menos que el primer supuesto tras la prueba de sostenibilidad.',
    '2030e': 'Convergencia hacia el crecimiento terminal.',
  },
  veredicto: 'En parte',
  sostenibilidad_justificacion: 'El motor no hace la prueba porque la reinversión neta proyectada es baja (15 % del NOPAT), así que la hacemos a mano. Con el ROIC contable del 7,5 % y esa reinversión, el crecimiento financiable sería de apenas un 1,1 %, por debajo del 3,2 % medio proyectado. Pero el ROIC contable lleva 25.600 M de fondo de comercio e intangibles comprados; sin ellos, el capital operativo ronda los 12.000 M y el ROIC orgánico supera el 20 %, y el crecimiento orgánico de Merck se financia sobre todo con I+D que va a gasto. Rebajamos medio punto el crecimiento de 2028e-2030e (de 4,5/4,5/4,0 a 4,0/4,0/3,5) para quedarnos en el orgánico demostrado (3,1 % en 2025 y 4,1 % en el 2T26) [A8, A3], y el veredicto es «En parte»: el crecimiento orgánico es sostenible, pero el comprado no ha rendido su coste.',
  dcf_lectura: 'El DCF da 133,90 EUR por acción, un 2,4 % por debajo del precio, con el 65 % del valor en el terminal. El DCF inverso dice que el precio descuenta un crecimiento del 3,6 % anual en 2027e-2035e con un margen del 28,9 %, frente al 3,2 % y el 28,5 % de nuestro caso base: el precio pide algo más que nosotros, pero poco, y esa exigencia es razonable frente al orgánico de 2025 (3,1 %) y del 2T26 (4,1 %). La rentabilidad implícita (7,3 %) coincide con nuestro WACC (7,40 %): la acción está en su valor con nuestra tasa. La lectura cambia con la prima del mercado: con el 4,2 % de Damodaran el valor objetivo sube a 159,74 EUR. Toda la discrepancia entre las dos reglas es de tasa de descuento, no de cifras.',
  narrativas: {
    Bajista: 'Los bioprocesos vuelven a frenar (como en 2023, cuando las ventas del grupo cayeron un 5,6 %), Electronics sufre el ciclo de los chips y Healthcare no compensa la pérdida de Mavenclad. Crecimiento 2 puntos menor y margen 1,5 puntos menor; terminal del 1,5 %.',
    Base: 'Life Science y Electronics compensan la caída de Healthcare: crecimiento del 3-4 % y margen EBITDA hasta el 28,5 %.',
    Alcista: 'Process Solutions sigue creciendo a doble dígito y la IA mantiene Electronics: un punto más de crecimiento y de margen.',
  },
  escenarios_comentario: 'El DCF da 99,70 EUR en el bajista (−27,3 %), 133,90 en el base y 151,37 en el alcista (+10,3 %): con nuestro WACC la asimetría es mala (0,38x). La lectura a 12 meses es más favorable porque el PER actual (16,1x) ya está cerca del mínimo de cinco años (14,7x): el bajista a 12 meses pierde un 11,2 % y el alcista gana un 39,6 % (asimetría de 2,97x). La diferencia es que el DCF castiga el ROIC bajo y el múltiplo ya lo descuenta.',
  suma_partes_comentario: 'No la hacemos: solo tenemos ventas de los tres negocios y EBITDA de Life Science, y la mitad del grupo cambia en 2027 con Bio-Techne. Sería el método natural para un grupo de tres negocios tan distintos.',
  valoracion_comentario: 'Pesos: DCF 40 %, escenarios 35 % y comparables 25 %. El DCF y los escenarios recogen lo esencial (un ROIC del 7,5 % casi igual al WACC del 7,40 %); los comparables pesan menos porque la muestra mezcla herramientas a 24-26 veces el EBITDA con farmacéuticas a 7-13 veces y la mediana salta según cuál se quite. Las transacciones no pesan (solo Bio-Techne tiene múltiplo y la familia controla el 70 %). El valor intrínseco resultante es de 134,52 EUR (−2,0 %). La dispersión es grande: el PER de los comparables da hasta 170,38 y el EV/EBITDA de los próximos 12 meses desde 70,82.',
  diferencia_consenso: 'Nuestro BPA pre de 2026e (8,27) supera al consenso VARA (7,78), que es anterior a la segunda subida de la guía (7,90-8,60) [D5, A3]: el centro de la guía es 8,25. No tenemos consenso de BPA pre de 2027-28; el beneficio publicado de S&P Global (≈ 7,40 por acción en 2028) no es comparable porque incluye la amortización de intangibles comprados [D6]. Nuestro precio base a 12 meses (146,51) queda un 0,3 % por encima del objetivo medio de los analistas (146,11): coincidimos.',
  objetivo12m_comentario: 'El objetivo a 12 meses (150,51 EUR, +11,3 % con dividendo) supera al valor intrínseco (134,52 EUR) en un 12 %: el mercado paga hoy 16,1 veces un BPA pre que excluye la amortización de intangibles comprados, y nuestro DCF descuenta flujos con un ROIC que apenas cubre el WACC. Para cerrar la distancia hacia arriba haría falta que el ROIC subiera con la integración de Bio-Techne (sinergias de 140 M al tercer año [B3]), y hacia abajo, que el mercado dejara de valorar a Merck por BPA pre.',
  j12: {
    Bajista: 'Ventas de 22.044 M (crecimiento 2 puntos menor en 2027-28) con un margen EBITDA pre del 27,5 %: EBIT pre de 4.850 M, 300 M de resultado financiero, 22 % de impuestos, 10 M de minoritarios y 434,8 M de acciones. BPA pre de 8,14.',
    Base: 'Ventas de 22.921 M (21.400 en 2026e, +3,0 % y +4,0 %) con un margen EBITDA pre del 29,0 %, menos una amortización sin intangibles comprados del 5,5 %: EBIT pre de 5.386 M; 300 M de resultado financiero (sin Bio-Techne), 22 % de impuestos y 434,8 M de acciones sin recompras. BPA pre de 9,10.',
    Alcista: 'Ventas de 23.366 M (un punto más de crecimiento) y margen EBITDA pre del 30,0 %, el del 3T25: EBIT pre de 5.725 M y BPA pre de 9,71.',
  },
  rentabilidad_comentario: 'Merck no crea valor hoy: el ROIC bajó del 10,8 % de 2021 al 7,5 % de 2025, prácticamente igual al WACC del 7,40 %. La caída viene del margen (EBIT del 21,2 % al 17,1 % de las ventas) y de una rotación baja (0,41 veces) porque el capital invertido (37.831 M) incluye 25.600 M de fondo de comercio e intangibles de compras [A2]. El ROIC incremental de 2021-2025 es negativo: el capital creció 7.500 M y el NOPAT bajó. Los competidores estadounidenses tienen ROIC aún menores (Thermo Fisher 7,3 %, Danaher 5,5 %) por el mismo motivo; las farmacéuticas europeas, de 9-26 % [D13].',
  catalizadores: {
    items: [
      { fecha: 'Noviembre de 2026 (3T26)', evento: 'Resultados del tercer trimestre', efecto: 'Primer trimestre completo sin Mavenclad en EE. UU.; confirmación de la guía subida', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '4T26-1T27', evento: 'Cierre de la compra de Bio-Techne', efecto: 'Más deuda (≈ 2,8 veces el EBITDA pre, estimación) y nueva guía con Bio-Techne', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: 'Marzo de 2027', evento: 'Resultados de 2026 y guía de 2027', efecto: 'Primer año completo sin Mavenclad en EE. UU.; la guía inicial de 2026 decepcionó y la acción cayó [E4]', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2027', evento: 'Posible lanzamiento de Pergoveris en EE. UU.', efecto: 'Excluido de la guía de 2026 [A3]', probabilidad: 'Media', sentido: '+' },
      { fecha: 'Abril de 2027', evento: 'Junta general y dividendo', efecto: 'Dividendo de 2,20 EUR o más', probabilidad: 'Alta', sentido: '+' },
    ],
    confianza: 'Media',
  },
  riesgos: {
    items: [
      { riesgo: 'Integración y precio de Bio-Techne', tipo: 'Estratégico', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−10 % (pagar ≈ 26,5x EBITDA con un ROIC del 7,5 % destruye valor si no llegan las sinergias)', mitigante: 'Sinergias de costes de 140 M al tercer año [B3]', senal: 'Crecimiento orgánico de Bio-Techne por debajo del 5 % tras el cierre' },
      { riesgo: 'Nueva caída de los bioprocesos', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−27 % (escenario bajista del DCF)', mitigante: 'Pedidos de Process Solutions con relación pedidos/ventas por encima de 1', senal: 'Crecimiento orgánico de Life Science por debajo del 2 %' },
      { riesgo: 'Healthcare tras Mavenclad y otras patentes', tipo: 'Regulatorio', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: '−5 %', mitigante: 'SpringWorks y Pergoveris', senal: 'Healthcare por debajo de −5 % orgánico' },
      { riesgo: 'Dólar débil', tipo: 'Financiero', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 % (−5,5 % de ventas en el 1T26)', mitigante: 'Costes también en dólares', senal: 'EUR/USD por encima de 1,20' },
      { riesgo: 'Ciclo de los semiconductores', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 %', mitigante: 'Exposición a chips de IA', senal: 'Electronics por debajo de 0 % orgánico' },
      { riesgo: 'Control familiar sin voto del minoritario', tipo: 'Gobierno', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: 'Descuento permanente', mitigante: 'Alineación por dividendo; 350 años de gestión familiar', senal: 'Operaciones con E. Merck KG' },
    ],
    premortem: 'Octubre de 2029: la acción ha perdido un 40 %. Merck cerró Bio-Techne a principios de 2027 con la deuda neta cerca de tres veces el EBITDA, justo cuando las farmacéuticas recortaron otra vez inventarios de consumibles de bioprocesos y la financiación de la investigación académica en EE. UU. siguió cayendo: Life Science creció un 1 % en 2027 y 2028. Electronics, tras dos años de IA, sufrió la corrección de la inversión en chips. Healthcare no compensó la pérdida de Mavenclad y Pergoveris no se aprobó en EE. UU. El BPA pre se estancó en 8 EUR, la empresa tuvo que frenar el dividendo para defender el rating y el PER bajó a 12 veces, el de una farmacéutica sin crecimiento. Los indicadores que lo habrían anticipado: la relación pedidos/ventas de Process Solutions, el crecimiento orgánico de Bio-Techne tras el cierre y la deuda neta sobre EBITDA pre por encima de 2,5 veces.',
    confianza: 'Media',
  },
  preguntas: {
    items: [
      { tema: 'Bio-Techne', pregunta: '¿Qué ROIC espera la Dirección de Bio-Techne al quinto año y qué crecimiento orgánico supone?', por_que: 'A ≈ 26,5x EBITDA y con un ROIC del grupo del 7,5 %, es la decisión que más mueve el valor.' },
      { tema: 'Financiación', pregunta: '¿Cuánto de la compra se pagará con híbridos y cuál es el objetivo de deuda neta/EBITDA pre a dos años?', por_que: 'Determina el coste financiero de nuestro BPA de 2028e (300 M sin la compra).' },
      { tema: 'Healthcare', pregunta: '¿Cuánto vendió Mavenclad en EE. UU. en 2025 y qué parte de Healthcare tiene patentes que caducan antes de 2030?', por_que: 'Explica el crecimiento de 2027e.' },
      { tema: 'Ajustes «pre»', pregunta: '¿Por qué las reestructuraciones e integraciones (200-300 M al año) se excluyen si se repiten?', por_que: 'La diferencia es de ≈ 1 punto de margen y la tratamos como gasto.' },
      { tema: 'Electronics', pregunta: '¿Qué parte del crecimiento del 11,7 % del 2T26 es de chips de IA y cuánto dura la visibilidad?', por_que: 'Sostiene el escenario alcista.' },
      { tema: 'Pensiones', pregunta: '¿Cuál es el déficit de pensiones a junio de 2026?', por_que: 'Lo hemos estimado con el dato de 2024.' },
    ],
    confianza: 'Media',
  },
  fuentes: [],
};
