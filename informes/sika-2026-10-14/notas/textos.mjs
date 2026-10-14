// Textos del analista (Sika AG, corte 2026-10-14). Citas con la letra de la nota.
export default {
  limitaciones: 'Análisis hecho desde la nube con la red limitada a la búsqueda web: la web de inversores de Sika, el informe anual en PDF, Yahoo y los proveedores de datos no se pudieron abrir, y descargar.mjs y bolsa.mjs no funcionan. Las cifras salen de los extractos de búsqueda de los comunicados de Sika (resultados 2021, 2023, 2025, 1T26 y 1S26), de su página de datos de la acción y de agregadores (Stock Analysis, TipRanks, MarketScreener), con la URL como fuente. Confianza de los datos de núcleo: media en la cuenta de resultados y la caja libre (cifras de la empresa), baja en el balance (solo 2023-2025 y sin circulante, de TipRanks), en el precio (último dato fechado: 185,35 CHF el 29-sep-2026, MarketScreener; no se encontró el cierre del 13-oct), en los comparables (solo PER adelantado, de fechas de septiembre-octubre) y en la bolsa (sin beta: 1,10 estimada). Cotiza solo en la SIX, en CHF; cuentas NIIF, ejercicio natural. Acciones: 160,48 M (capitalización publicada ÷ precio; sin autocartera relevante). La deuda bruta del puente (6.080 M, jun-26) incluye los arrendamientos según el agregador. Minoritarios, pensiones y asociadas no disponibles (0). Precios de cierre: 2023 del informe anual, 2024 de la capitalización publicada, 2022 y 2025 derivados de la rentabilidad anual publicada, 2021 de la rentabilidad de 2022 (estimaciones).',

  controles_explicados: [
    { control: 'Fuentes sin citar', explicacion: 'Varias fuentes de las notas se usaron para cifras de tablas (cuenta, flujos, comparables) que no llevan cita en el texto.' },
  ],

  parches: [],
  huecos_resueltos: [],

  secciones: {
    historia: {
      resumen: 'Sika nació en 1910 en Zúrich con un aditivo impermeabilizante para mortero y hoy es el mayor grupo mundial de química de construcción: aditivos de hormigón, impermeabilización, selladores, adhesivos, cubiertas y morteros, con 11.201 M CHF de ventas en 2025 [A1]. La familia Burkard la controló con acciones de voto múltiple hasta 2018, cuando terminó la disputa con Saint-Gobain, que había pactado comprar su participación; Sika pasó a una sola clase de acciones [B8]. Desde entonces ha crecido por compras grandes: Parex en 2019 y MBCC (la antigua química de construcción de BASF) en 2023, por 5.500 M CHF de valor empresa [B7]. En 2025, con ventas planas en moneda local y China en contracción, lanzó el programa de eficiencia Fast Forward [A1].',
      confianza: 'Media',
    },
    negocio: {
      descripcion: 'Sika fabrica y vende productos químicos para construir y reparar edificios e infraestructuras: aditivos para hormigón y cemento, impermeabilización de sótanos, túneles y cubiertas, selladores y adhesivos de construcción, morteros técnicos y suelos, además de adhesivos para automoción e industria (Global Business). Vende a contratistas, fabricantes de hormigón, distribuidores de material de construcción y fabricantes industriales en más de cien países, con producción local en cada región porque el producto pesa y viaja mal. En 2025 EMEA supuso el 44,9 % de las ventas, Américas el 34,6 % y Asia/Pacífico el 20,5 % [A13]. La reforma y renovación pesa en torno a la mitad de la demanda, lo que suaviza el ciclo de obra nueva.',
      como_gana_dinero: 'Los productos de Sika suponen una parte pequeña del coste de una obra pero un riesgo alto si fallan (filtraciones, fisuras), así que el cliente paga por la especificación y la asistencia técnica más que por el precio. Eso da poder de precio: Sika repercutió la inflación de materias primas de 2021-2022 y mantuvo el margen EBITDA en torno al 18-19 % [A1, A11]. El margen depende de las materias primas (derivados del petróleo, cemento), de la mezcla (impermeabilización y cubiertas, más rentables) y del volumen, con apalancamiento operativo moderado. La divisa resta: el franco fuerte quitó 5,4 puntos de crecimiento en 2025 y 5,5 en el 1S26 [A1, A3]. El segundo y tercer trimestre son los más fuertes por la estacionalidad de la construcción.',
      clientes: 'Cartera muy atomizada: decenas de miles de contratistas, distribuidores y fabricantes de hormigón; ningún cliente es relevante en las ventas según la empresa. Los contratos de suministro de aditivos a hormigoneras se renuevan cada año y los costes de cambio vienen de la especificación del proyecto y de la formulación ajustada a cada planta. Poder de precio demostrado: en 2022, con inflación de materias primas, las ventas crecieron un 15,8 % en moneda local y el EBIT un 13,5 % con margen estable en el 15,1 % [A10]. En 2025-2026, con volúmenes flojos, el precio aporta poco (≈1-2 puntos) y el crecimiento depende del volumen.',
      confianza: 'Media',
    },
    sector: {
      definicion: 'El mercado relevante es la química de construcción mundial: aditivos de hormigón y cemento, impermeabilización, selladores y adhesivos, morteros y revestimientos técnicos. Usamos la cifra de ResearchAndMarkets (82.548 M USD en 2025 y 101.889 M USD en 2030, +4,3 % anual) [B1] porque Fortune Business Insights (91.850 M USD en 2025 y +6,9 % anual) [B2] y Mordor (90.650 M USD en 2026 y +5,5 %) [B3] incluyen más revestimientos generales. Convertida a 0,80 CHF/USD, unos 66.000 M CHF en 2025.',
      drivers: [
        { driver: 'Renovación y rehabilitación energética', efecto: '+', horizonte: 'Estructural', evidencia: 'En torno a la mitad de la demanda de Sika; menos cíclica que la obra nueva [A1].' },
        { driver: 'Infraestructura en EE. UU. y Europa (y centros de datos)', efecto: '+', horizonte: 'Estructural', evidencia: 'BofA mejoró la recomendación en 2026 citando los centros de datos [B9]; Américas creció un 2,2 % en moneda local en 2025 [B6].' },
        { driver: 'Construcción residencial en China', efecto: '−', horizonte: 'Cíclico', evidencia: 'Asia/Pacífico cayó un 5,3 % en moneda local en 2025 y China sigue en contracción de dos dígitos [B6, B10].' },
        { driver: 'Penetración de aditivos y química en mercados emergentes', efecto: '+', horizonte: 'Estructural', evidencia: 'El mercado crece un 4,3-6,9 % anual según la fuente, por encima de la construcción [B1, B2].' },
        { driver: 'Tipos de interés y vivienda nueva en Europa', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'EMEA pasó de +7,3 % en 2024 a +2,2 % en 2025 en moneda local [B6].' },
      ],
      porter: [
        { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Dos grandes globales (Sika y Saint-Gobain, que compró Chryso, GCP y Fosroc) frente a muchos locales; competencia por especificación más que por precio [B4].' },
        { fuerza: 'Poder de los clientes', intensidad: 2, justificacion: 'Clientes atomizados y producto de coste pequeño frente al de la obra; las grandes hormigoneras negocian precio cada año.' },
        { fuerza: 'Poder de los proveedores', intensidad: 3, justificacion: 'Materias primas petroquímicas y cemento; Sika repercutió la inflación de 2022 con margen estable [A10].' },
        { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Hace falta red técnica, homologaciones y producción local en decenas de países; la consolidación ha ido en sentido contrario (MBCC, GCP, Fosroc) [B4, B7].' },
        { fuerza: 'Amenaza de sustitutos', intensidad: 2, justificacion: 'Pocos sustitutos funcionales; el riesgo es tecnológico (cementos con menos clínker que cambian la formulación), que Sika aprovecha con aditivos.' },
      ],
      ciclo: { posicion: 'Recuperación', comentario: 'El crecimiento orgánico pasó de casi cero en 2025 a +5,7 % en el 2T26 y la empresa subió su guía al 3-6 % en moneda local [A3]. En 2009 las ventas de Sika cayeron alrededor de un 11 % y en 2020 un 3 % en francos, con recuperación al año siguiente; 2022-2023 fue de precios altos y 2024-2025 de volúmenes flojos en Europa y China. Los analistas esperan un tercer trimestre más lento por volumen [D8].' },
      regulacion: 'Las normas de eficiencia energética de los edificios (la Directiva europea de eficiencia energética de edificios refundida en 2024) y los objetivos de descarbonización del cemento empujan la demanda de impermeabilización, aislamiento de cubiertas y aditivos que reducen el clínker. La regulación química europea (REACH) y las restricciones a los isocianatos exigen reformular selladores y adhesivos, con coste pero también barrera de entrada. No hay cambios con fecha que muevan las cifras a 12 meses.',
      tendencias: 'Tres tendencias favorecen a Sika: la descarbonización del hormigón (más aditivos por metro cúbico para bajar el clínker), la rehabilitación energética y la automatización de la obra (sistemas listos para aplicar). En contra: el giro de la vivienda china y la consolidación de Saint-Gobain como segundo competidor global tras comprar Chryso, GCP y Fosroc [B4]. Sika gana con las dos primeras porque tiene la mayor cartera de aditivos tras MBCC [B7].',
      confianza: 'Baja',
    },
    competencia: {
      foso: {
        veredicto: 'Amplio', tendencia: 'Estable',
        fuentes: [
          { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'Red de especificadores y aplicadores formados por Sika; no es un efecto de red en sentido estricto.' },
          { fuente: 'Costes de cambio', puntuacion: 3, evidencia: 'Formulación ajustada a cada planta de hormigón y especificación en proyecto; cambiar exige nuevas pruebas y homologaciones.' },
          { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 4, evidencia: 'Marca de referencia en impermeabilización y selladores; margen EBITDA del 18-19 % mantenido con la inflación de 2022 [A10, A1].' },
          { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Mayor escala de compras tras MBCC (sinergias de 160-180 M previstas) [A15].' },
          { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'Producción local en más de cien países que un entrante no puede replicar a coste razonable.' },
        ],
      },
      amenazas: 'El foso se erosionaría si Saint-Gobain usa su escala tras Chryso, GCP y Fosroc para competir en precio en aditivos [B4], o si una caída larga de la construcción china y europea obliga a competir por volumen. Probabilidad media: la rivalidad entre los dos grandes ha sido hasta ahora por compras, no por precio. Un riesgo más lento es que los cementeros integren la química (Holcim ya vende sistemas de cubiertas).',
      confianza: 'Baja',
    },
    financieros: {
      comentario: 'Las ventas crecieron de 9.252 M CHF en 2021 a 11.763 M en 2024 (MBCC aportó alrededor de 2.000 M desde mayo de 2023) y cayeron a 11.201 M en 2025 (−4,8 %) por la divisa: en moneda local crecieron un 0,6 % [A1, A9, A11]. El margen EBITDA publicado bajó de 19,3 % en 2024 a 18,4 % en 2025 por 86 M de costes de Fast Forward; sin ellos fue del 19,2 % [A1]. El 1S26 marca la vuelta del crecimiento (+4,0 % en moneda local, +2,9 % orgánico y +5,7 % orgánico en el 2T) con un margen del 19,0 %, pero el franco restó 5,5 puntos y el beneficio neto quedó plano (552,1 M) [A3, A4]. 2022 y 2023 no son comparables: 2022 lleva una plusvalía de 166,5 M por la venta de los recubrimientos industriales europeos y 78,3 M de costes de MBCC; 2023, 131,5 M de costes de compra e integración [A9, A10].',
      ajustes: 'Usamos las cifras publicadas. Las partidas no recurrentes dentro del EBITDA están en no_recurrentes_en_ebitda: −88,2 M en 2022 (plusvalía de 166,5 M menos 78,3 M de costes de MBCC), 131,5 M en 2023 (MBCC) y 86 M en 2025 (Fast Forward; 108 M en total con 22 M de deterioros) [A1, A9, A10]. El BPA ajustado que usamos para el PER histórico suma esas partidas netas de impuestos (al 20 %): 6,85 CHF en 2022, 7,31 en 2023 y 7,04 en 2025 (estimación propia). Los costes de compras se repiten en Sika (es un comprador frecuente), pero los de MBCC y Fast Forward son de tamaño excepcional.',
    },
    trimestres: {
      ultima_presentacion: 'En la conferencia del 1S26 (28-jul-2026) la dirección cambió el tono frente a febrero: subió la guía de crecimiento en moneda local del 1-4 % al 3-6 % por la aceleración del 2T (+6,8 % en moneda local, +5,7 % orgánico) y, a la vez, bajó el margen EBITDA esperado del 19,5-20,0 % al 19,0-19,5 %, porque la divisa y la mezcla regional pesan más de lo previsto; dijo sentirse cómoda con el consenso de EBITDA en francos [A3, A16]. Fast Forward va según el plan (80 M de ahorro en 2026) y la compra de Akkim en Turquía cerraría en el 3T [A3]. Los analistas preguntaron sobre todo por China (otra caída de dos dígitos), la sostenibilidad del volumen en EE. UU. y la caja libre del semestre, que bajó a 139,6 M desde 181,9 M [A3, A17]. La dirección no dio una cifra de margen para 2027 y remitió a los objetivos de Strategy 2028. En el 1T26 (14-abr) las ventas crecieron un 0,9 % en moneda local, por encima de un consenso de −0,7 % [D26].',
    },
    balance: {
      otros_pasivos: 'Sin acceso a la nota de provisiones, pensiones y garantías del informe anual: no hemos podido leer el déficit de pensiones (Sika tiene planes suizos de prestación definida), los pagos aplazados de compras ni las opciones de minoritarios. Los minoritarios son pequeños (Sika consolida casi todo al 100 %). La deuda bruta de 5.518 M a dic-25 incluye, según el agregador, los arrendamientos [A7]. No hay covenants conocidos: Sika financia con bonos en francos y euros de grado de inversión.',
      comentario: 'La deuda neta bajó de 5.190 M en 2023 (tras pagar MBCC) a 5.020 M en 2024 y 4.710 M en 2025, ≈2,3 veces el EBITDA [A7]. En el 1S26 subió a ≈5.455 M (deuda bruta de 6.080 M y caja de 625 M) por el dividendo de ≈595 M de abril y la estacionalidad del circulante [A8]. El patrimonio cayó de 7.030 M a 6.660 M en 2025 por la conversión de divisas. Con una caja libre de ≈1.350 M al año, Sika puede pagar el dividendo y bajar deuda unos 600-700 M anuales sin compras grandes.',
    },
    flujos: {
      comentario: 'El flujo operativo pasó de ≈1.064-1.100 M en 2021-2022 a ≈1.700 M en 2023-2025 con MBCC, y la caja libre operativa de la empresa fue de 1.402,9 M en 2024 y 1.356,1 M en 2025 (12,1 % de las ventas) [A1, A6]. El capex es bajo (157-348 M, 1,7-3,1 % de las ventas): Sika es un negocio de activos ligeros y casi todo su crecimiento inorgánico entra por compras (3.236 M en 2023 por MBCC y 200-300 M el resto de años) [A6]. La amortización (≈4,9 % de las ventas en 2025) supera al capex porque incluye la de los intangibles comprados. El primer semestre es estacionalmente flojo (139,6 M de caja libre en el 1S26) [A3]. Los dividendos pagados son estimación propia (DPA del año anterior × acciones).',
    },
    calidad: {
      auditor: null, anios_auditor: null, opinion: 'Favorable (sin salvedades conocidas)',
      comentario: 'No hemos podido leer el informe del auditor ni las notas, así que la lectura es limitada. Lo que sí se ve: cifras publicadas coherentes entre comunicados y agregadores; partidas no recurrentes grandes y explicadas en 2022, 2023 y 2025 (plusvalía de recubrimientos, MBCC y Fast Forward) [A1, A9, A10]; un fondo de comercio e intangibles elevados por las compras (Parex y MBCC), cuyo deterioro sería la principal palanca contable. El Altman Z del motor (3,13) está en zona segura; el Piotroski F (5) es intermedio por la caída del beneficio de 2025; el Beneish M no se puede calcular sin clientes ni circulante. Conversión de beneficio en caja alta (flujo operativo de 1.708 M frente a 1.045 M de beneficio neto en 2025) [A6].',
      senales: [
        { senal: 'Costes «únicos» repetidos', nivel: 'Media', comentario: 'Costes de compras en 2022-2023 y de reestructuración en 2025: en un comprador frecuente, parte es recurrente.' },
        { senal: 'Intangibles y fondo de comercio elevados', nivel: 'Media', comentario: 'Tras Parex y MBCC; un deterioro no afectaría a la caja pero sí al beneficio.' },
        { senal: 'Balance incompleto en el análisis', nivel: 'Baja', comentario: 'Sin circulante ni pensiones: limitación del entorno, no señal de la empresa.' },
      ],
      confianza: 'Baja',
    },
    capital: {
      politica: 'Sika reparte en torno al 50 % del beneficio y ha subido el dividendo cada año: 2,90 CHF por 2021, 3,20 por 2022, 3,30 por 2023, 3,60 por 2024 y 3,70 por 2025 [A1, A12]. No hace recompras. Las prioridades declaradas para la caja son invertir en crecimiento orgánico, compras complementarias, el dividendo y mantener un rating sólido; tras MBCC, bajar deuda [A1, A2].',
      adquisiciones: [
        { anio: '2023', objetivo: 'MBCC Group (química de construcción ex BASF)', importe: 5500, ev_ebitda: 11.5, financiacion: 'Deuda (bonos y préstamos) y caja; venta obligada de activos a reguladores', resultado: 'Sinergias de 160-180 M previstas para 2025; el margen del grupo mejoró hasta 2024 (19,3 %) pero el ROIC bajó al ≈10-11 % [A15, D19].' },
        { anio: '2019', objetivo: 'Parex (morteros, Francia)', importe: null, ev_ebitda: null, financiacion: 'Deuda', resultado: 'Integrada en morteros; sin deterioros conocidos.' },
        { anio: '2026', objetivo: 'Akkim (Turquía)', importe: null, ev_ebitda: null, financiacion: 'Caja', resultado: 'Cierre previsto en el 3T26 [A3].' },
      ],
      comentario: 'Sika ha comprado bien en tamaño y precio relativo (MBCC a 11,5 veces el EBITDA, 8,5 con sinergias, cuando el sector cotizaba más caro) [D19], pero las compras han bajado el rendimiento del capital: el ROIC del motor es del 11,3 % en 2023, 11,2 % en 2024 y 10,3 % en 2025, con el fondo de comercio dentro. Entre 2021 y 2025 la empresa generó ≈7.300 M de flujo operativo, invirtió ≈1.330 M en capex y ≈4.140 M en compras y repartió ≈2.360 M de dividendos (estimación) [A6]. No hay dilución relevante (≈159-161 M de acciones). La disciplina es buena; el reto es que las compras vuelvan a rendir por encima del 12-15 % histórico.',
      confianza: 'Media',
    },
    directivos: {
      comentario: 'Equipo estable y de casa: el consejero delegado lleva en Sika desde 1989 y el director financiero desde 2014. La credibilidad sufrió en 2025, cuando la empresa no llegó a su guía de crecimiento y tuvo que rebajarla tras un cuarto trimestre flojo [C10], y en julio de 2026 bajó la guía de margen mientras subía la de ventas [C9]. A favor, el 1T y el 2T de 2026 batieron al consenso. No hay plan de sucesión público.',
    },
    gobierno: {
      remuneracion: 'Según los agregadores, el consejero delegado cobró ≈4,3 M CHF en 2025 (≈5,4 M en 2024), con un tercio de fijo y el resto de variable en efectivo y acciones [C4]. No hemos podido leer las métricas exactas del variable a largo plazo en el informe de remuneración [C6]. La junta de 2026 aprobó el informe de remuneración de 2025 con el 96,89 % (3,11 % en contra) y la de 2025 el de 2024 con el 93,62 % [C1, C3].',
      control_y_defensas: 'Desde 2018 Sika tiene una sola clase de acciones y ningún accionista de control: los mayores son gestoras (BlackRock ≈7,7 %, UBS AM ≈5,6 %, Vanguard ≈4,4 %, Norges ≈3,0 %) [C5]. Desapareció el límite de voto que protegía a la familia Burkard. Presidente (Thierry Vanlancker) y consejero delegado (Thomas Hasler) están separados. No hay operaciones vinculadas conocidas.',
      alertas: ['Ninguna relevante detectada en los resultados de las juntas de 2025 y 2026 y en la prensa de los últimos 12 meses; no se pudieron revisar las operaciones de directivos (SIX, anónimas).'],
    },
    consenso: {
      guidance: 'Guía 2026 (28-jul-2026): crecimiento de ventas del 3-6 % en moneda local (antes 1-4 %) y margen EBITDA del 19,0-19,5 % (antes 19,5-20,0 %), con 80 M de ahorro de Fast Forward [C9]. A medio plazo, Strategy 2028: crecimiento del 6-9 % anual en moneda local, con objetivos reafirmados en julio [C9]. Próximos resultados (ventas de nueve meses): 23-oct-2026 [D6].',
      revisiones: 'Solo tenemos MarketScreener con estimaciones a tres años [D4]; Yahoo (11-sep) da para 2026 ventas de 11.410 M y BPA de 7,49 CHF [D5] y BofA 7,45 / 8,17 / 8,95 CHF para 2026-2028 [D23]. Los objetivos han subido desde los resultados del semestre: JPMorgan de 165 a 215 CHF, Octavian de 220 a 230, Berenberg de 233 a 240 y Jefferies de 213 a 215 [D8, D24]. El objetivo medio va de 187,32 CHF (19 analistas, AWP) a 197,36 CHF (22 analistas, Investing) [D6, D7]. Tendencia de 3 meses: subidas.',
    },
    bolsa: {
      comentario: 'La acción perdió un 40 % en 2022 (subida de tipos sobre un PER adelantado de más de 50 veces), recuperó un 20 % en 2023, cayó un 21 % en 2024 y un 23,6 % en 2025, cuando el SMI ganó un 14,1 %, por China, el franco y un cuarto trimestre flojo [D12]. En 2026 rebotó desde ≈147 CHF en abril tras un 1T mejor de lo esperado [D26] y un 15 % en una semana tras el 1S26, hasta ≈195 CHF en agosto; desde entonces consolida en torno a 185 CHF [D1, D8, D9]. Sin beta ni volatilidad propias por la falta de serie diaria.',
    },
    multiplos_historicos: {
      comentario: 'Con el BPA ajustado del año siguiente, Sika cotizó a 36,5 veces al cierre de 2020, 55,5 en 2021 (excluido: burbuja de tipos cero), 31,2 en 2022, 35,3 en 2023, 30,7 en 2024 y 23,5 en 2025 (sobre nuestro BPA de 2026e): la mediana de los cinco últimos años limpios es de 31 veces y hoy cotiza a 23,6 veces nuestro BPA de 2027e, un 24 % por debajo. Parte del descuento es estructural: el crecimiento orgánico de 2024-2025 fue casi nulo, el ROIC bajó al ≈10 % tras MBCC y los tipos suizos de largo plazo ya no son negativos. Los cierres de 2022 y 2025 son derivados de rentabilidades publicadas.',
    },
    comparables: {
      criterio: 'No hay comparables puros cotizados de química de construcción con el tamaño de Sika (Mapei no cotiza y la química de Saint-Gobain va dentro del grupo). Usamos materiales de construcción europeos (Saint-Gobain, Holcim), químicas de construcción y pinturas estadounidenses (RPM, Sherwin-Williams) y dos suizas de construcción de calidad (Geberit, Schindler, de otros informes del repositorio llevados a hoy). Solo tenemos el PER adelantado de todas: los demás múltiplos faltan.',
      comentario: 'La mediana del PER adelantado de los seis comparables es de 21,7 veces, frente a 23,1 veces (PER de los próximos 12 meses) de Sika: prima pequeña. Las de calidad (Geberit 25,3x, Sherwin-Williams 27,0x, Schindler 24,0x) cotizan por encima de Sika, y las de materiales con más ciclo y menos margen (Saint-Gobain 10,9x, Holcim 14,8x) muy por debajo [D13-D18]. Sika merece un múltiplo de calidad si vuelve a crecer al 5 % orgánico; hoy el mercado la paga a medio camino. Los comparables pesan un 20 % en la síntesis por lo incompleto de los datos.',
    },
    transacciones: {
      comentario: 'La referencia es MBCC: 5.500 M CHF, 11,5 veces el EBITDA 2022e (8,5 con sinergias) [D19]. Saint-Gobain pagó ≈1.025 M USD por Fosroc sin múltiplo publicado [D20]. Sika cotiza a 16,4 veces el EBITDA de los últimos 12 meses, por encima de lo que pagó por MBCC. Sin accionista de control, Sika es comprable en teoría, pero con ≈35.000 M de valor empresa solo Saint-Gobain o un químico grande podrían plantearlo, y no hay indicios. Peso cero en la síntesis.',
    },
    esg: {
      calificaciones: [],
      materialidad: 'Lo material para Sika es la descarbonización de la construcción: sus aditivos permiten bajar el clínker del cemento y las emisiones del hormigón, lo que convierte la regulación climática en un motor de demanda. En coste, la exposición está en las materias primas petroquímicas y en la energía de sus plantas, pequeña frente a la de un cementero. La junta de 2026 aprobó el informe de sostenibilidad con el 99,51 % [C1].',
      controversias: 'No hemos encontrado sanciones ni litigios relevantes en 2023-2026 en las búsquedas hechas; la compra de MBCC exigió vender activos a los reguladores de competencia (Reino Unido, EE. UU., Australia, Nueva Zelanda y Canadá).',
      confianza: 'Baja',
    },
    sentimiento: {
      lectura: 'El sentimiento de los particulares está dividido y mejora: tras dos años de caídas, los que promedian a la baja ven una empresa de calidad barata frente a su historia, y los escépticos ven China, el franco y una guía de margen rebajada [E1, E2, E4]. No es extremo (ni euforia ni capitulación) y coincide con los analistas, que suben objetivos. Aporta un matiz: la conversación se centra en el volumen del 3T (23-oct), que es también nuestro catalizador. Ninguna cifra del informe sale de los foros.',
    },
  },

  dcf_justificacion: {
    crecimiento: 'Ventas de 2026e casi cerradas: +1 % en francos (+4,5 % en moneda local, dentro de la guía del 3-6 %, menos 4,5 puntos de divisa y más ≈1 punto de Akkim) [A3]. Desde 2027e, 4,5-5 % anual (volumen 2,5-3 % y precio 2 %), por debajo del 6-9 % de Strategy 2028 porque ese objetivo incluye compras y la empresa no lo ha cumplido en 2024-2025; convergencia al 2 % en 2035e. El consenso espera +5,2 % en 2027e y +4,5 % en 2028e [D4].',
    margenes: 'Margen EBITDA del 19,2 % en 2026e (guía 19,0-19,5 %) que sube al 21 % en 2031e con los ahorros de Fast Forward y el apalancamiento del volumen. Es el extremo bajo del 20-23 % de Strategy 2028 y está por encima del máximo histórico (19,3 % en 2024) [A1]: el supuesto más exigente del modelo. El consenso implica 19,6 % en 2026e, 20,0 % en 2027e y 20,8 % en 2028e [D4].',
    inversion: 'Capex del 4,0-4,2 % de las ventas en 2026-2029e frente al 3,1 % de 2025 [A6], porque incluye ≈0,7 puntos de circulante (≈15 % de las ventas por el crecimiento; estimación propia, el balance que tenemos no trae el circulante), que baja al 3,6 % al final para igualar la amortización. La amortización baja del 4,8 % al 3,6 % al agotarse la de intangibles comprados. No se proyectan compras: el crecimiento por compras queda fuera del caso base.',
    wacc: 'Todo en francos. Tasa libre del 0,54 % (bono de la Confederación a 10 años, 8-oct-2026) [D21]; beta de 1,10 (estimación propia: química ligada a la construcción, sin serie de la acción), prima de mercado del 5,5 % y 1 punto adicional, como en los informes de Roche y Givaudan, porque los flujos están en divisas y el bono suizo es anormalmente bajo. Coste de la deuda del 2 % antes de impuestos y un 16 % de deuda. WACC del 6,63 %. Con la prima implícita del mercado (4,2 %) [D22], el WACC baja al 5,4 %.',
    terminal: 'Gordon con crecimiento del 1,0 % en francos, coherente con un bono al 0,54 % y una inflación suiza de ≈0,5-1 %, aunque los flujos vienen de países con más inflación (por eso la prima adicional en el WACC). El múltiplo de salida implícito se compara con los 14 veces EBITDA que pagan las transacciones y cotizan los comparables de calidad.',
  },

  puente_comentarios: {
    '2026e': 'Volumen +3 % (2T26 con +5,7 % orgánico), precio +1,5 %, y otros −3,5 % (divisa −4,5 % y Akkim +1 %) [A3].',
    '2027e': 'Volumen +2,5 % (construcción de EE. UU. e infraestructura; China estable) y precio +2 %; sin divisa ni compras.',
    '2028e': 'Volumen +3 % con la recuperación de la vivienda europea por los tipos más bajos y precio +2 %.',
    '2029e': 'Volumen +2,5 % y precio +2 %, en línea con el mercado (+4,3 % anual) [B1].',
    '2030e': 'Volumen +2,5 % y precio +2 %: cuota estable en ≈17 %.',
  },
  veredicto: 'En parte',
  sostenibilidad_justificacion: 'El motor no hace la prueba de reinversión porque la amortización de intangibles comprados supera al capex (reinversión negativa). A mano: sin compras, el crecimiento tiene que venir de precio (2 %, sin capital) y de volumen (2,5-3 %), que necesita circulante (≈0,7 % de las ventas, incluido en el capex). Con un ROIC del 10,3 % con el fondo de comercio dentro y una reinversión neta pequeña, el crecimiento financiable sale de ≈3-3,5 % más el precio: el 5-5,5 % inicial quedaba algo alto, y el crecimiento orgánico de 2024-2025 fue casi nulo. Rebajamos el base medio punto en 2027-2029 (4,5 / 5,0 / 4,5 %). La cuota implícita en 2030e (≈17 %) es la de hoy. El foso y el poder de precio de 2022 sostienen el crecimiento del mercado; no garantizan más.',
  dcf_lectura: 'El DCF da 176,88 CHF por acción, un 4,6 % por debajo del precio, con un 63 % del valor en el terminal. El DCF inverso dice que el precio de 185,35 CHF descuenta un crecimiento de las ventas del 4,3 % anual en 2027-2035e frente a nuestro 3,7 %, o un margen EBITDA del 21,7 % frente a nuestro 21 %: el mercado ya paga la recuperación del volumen y un margen por encima del máximo histórico (19,3 %). No es exigente si Sika cumple Strategy 2028 (20-23 % de margen), pero tampoco deja margen de seguridad. La valoración depende mucho de la tasa: con la prima implícita del mercado el DCF sube a 235,66 CHF. En resumen, a 185 CHF Sika cotiza cerca de su valor con nuestro WACC; la oportunidad está en el múltiplo (23,6 veces frente a una historia de 31), no en el flujo de caja.',

  narrativas: {
    Bajista: 'China sigue cayendo, Europa no se recupera y el franco se aprecia otro 3-4 %: crecimiento en francos de 2,5-3 % y margen estancado en ≈18,8 %, como en 2025 sin ahorros. Es lo que pasó en 2024-2025.',
    Base: 'El crecimiento orgánico se estabiliza en 4,5-5 % con EE. UU., infraestructura y precio; Fast Forward lleva el margen al 20,3 % en 2028 y al 21 % después. Sin compras grandes.',
    Alcista: 'Recuperación de la vivienda europea y de los centros de datos en EE. UU.: crecimiento del 6-6,5 % y margen del 21 % en 2028, el extremo bajo de Strategy 2028.',
  },
  escenarios_comentario: 'Por valor intrínseco la asimetría es mala: el alcista vale 211,62 CHF (+14,2 %) y el bajista 124,12 CHF (−33,0 %). A 12 meses, con la regla de múltiplos v3, es buena: el bajista pierde un 11,4 % y el alcista gana un 62,9 %, porque el PER de hoy (23,6x) está muy por debajo de la mediana de cinco años (31x). La diferencia entre las dos lecturas es la tesis: el precio es razonable para el flujo de caja con nuestro WACC y barato frente a la propia historia del múltiplo.',
  suma_partes_comentario: 'No aplica: las tres regiones venden los mismos productos con márgenes parecidos; Global Business (automoción e industria) es pequeña y no se reporta aparte en las fuentes que tenemos.',
  valoracion_comentario: 'El DCF pesa un 50 % porque Sika tiene flujos estables y una caja libre previsible; los escenarios un 30 % y los comparables un 20 %, poco porque solo tenemos el PER adelantado. Las transacciones no pesan (no hay operación a la vista). La síntesis da 174,92 CHF (−5,6 %); con la prima implícita del mercado, 221,27 CHF. La dispersión entre métodos es alta (de ≈124 a ≈212 CHF entre escenarios), sobre todo por el margen y la tasa de descuento.',
  rentabilidad_comentario: 'El ROIC del motor es del 11,3 % en 2023, 11,2 % en 2024 y 10,3 % en 2025, con el balance de TipRanks (patrimonio más deuda neta, fondo de comercio incluido), frente a un WACC del 6,63 %: crea valor, con 3,7 puntos de margen, por debajo del umbral de calidad de 5 puntos. Antes de MBCC Sika rendía bastante más (el capital creció ≈3.200 M con la compra y el EBIT apenas ≈500 M). Lo que mueve el ROIC es el margen: cada punto de margen EBITDA son ≈115 M de EBIT y ≈0,8 puntos de ROIC. Si Fast Forward lleva el margen al 21 %, el ROIC volvería al ≈12-13 %. Geberit, comparable suiza de calidad, rinde un 27 % [D17].',

  catalizadores: {
    items: [
      { fecha: '23-oct-2026', evento: 'Ventas de nueve meses', efecto: 'Volumen del 3T tras el +5,7 % orgánico del 2T; confirmación de la guía del 3-6 %', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: 'Feb-2027', evento: 'Resultados de 2026 y guía de 2027', efecto: 'Margen de 2026 frente al 19,0-19,5 % y objetivo de 2027', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: 'Mar-2027', evento: 'Junta y dividendo (≈3,80-3,90 CHF esperado)', efecto: 'Rentabilidad por dividendo ≈2 %', probabilidad: 'Alta', sentido: '+' },
      { fecha: '2026-2027', evento: 'Ahorro de Fast Forward (80 M en 2026)', efecto: '+0,7 puntos de margen si se materializa', probabilidad: 'Media', sentido: '+' },
      { fecha: 'Jul-2027', evento: 'Resultados del 1S27', efecto: 'Primer semestre comparable sin efecto divisa grande', probabilidad: 'Alta', sentido: '+/−' },
    ],
    confianza: 'Media',
  },
  riesgos: {
    items: [
      { riesgo: 'El volumen vuelve a frenarse (China, vivienda europea)', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−33 % (bajista del DCF); −11 % a 12 meses', mitigante: 'Renovación ≈50 % de la demanda; precio', senal: 'Crecimiento orgánico del 3T26 por debajo del 3 %' },
      { riesgo: 'Margen estancado en el 19 %', tipo: 'Operativo', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '≈−10 % por punto de margen EBITDA', mitigante: 'Fast Forward (80 M en 2026)', senal: 'Margen de 2026 por debajo del 19,0 %' },
      { riesgo: 'Franco fuerte', tipo: 'Divisa', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: '−3-5 % del BPA por cada 5 % de apreciación', mitigante: 'Producción local (costes en la misma divisa)', senal: 'EUR/CHF por debajo de 0,90' },
      { riesgo: 'El múltiplo no vuelve a su historia', tipo: 'Valoración', probabilidad: 'Media', impacto: 'Alto', efecto_valor: 'Con el PER de hoy (23,6x) el base a 12 meses sería ≈205 CHF (+11 %) en vez de 235', mitigante: 'Crecimiento del BPA del ≈10 % anual', senal: 'PER adelantado por debajo de 22x tras buenos resultados' },
      { riesgo: 'Compra grande mal pagada', tipo: 'Asignación de capital', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−5-10 %', mitigante: 'Historial razonable (MBCC a 8,5x con sinergias)', senal: 'Compra de más de 2.000 M a más de 13x EBITDA' },
      { riesgo: 'Competencia de Saint-Gobain en aditivos', tipo: 'Competencia', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−5-10 %', mitigante: 'Especificación y red técnica', senal: 'Caída de precio en aditivos o pérdida de contratos de hormigoneras' },
    ],
    premortem: 'Es octubre de 2029 y la acción vale 110 CHF. La recuperación del 2T26 fue un rebote técnico: en el 3T26 el volumen se frenó, China cayó otra vez y la vivienda europea no arrancó pese a los tipos bajos. Sika creció un 2-3 % en moneda local en 2027 y 2028 y el franco restó otros 3 puntos al año. Fast Forward ahorró lo prometido, pero la inflación salarial y la presión de precio de Saint-Gobain en aditivos se lo comieron: el margen se quedó en el 19 %. La dirección compró para cumplir el 6-9 % de Strategy 2028 y pagó caro; el ROIC bajó al 9 %, por debajo del umbral que los inversores de calidad exigen, y el PER adelantado se instaló en 18-20 veces, como el de un químico cíclico. El indicador que lo habría anticipado: un crecimiento orgánico del 3T26 por debajo del 3 % y un margen de 2026 en el extremo bajo de la guía.',
    confianza: 'Media',
  },
  preguntas: {
    items: [
      { tema: 'Volumen', pregunta: '¿Cuánto del +5,7 % orgánico del 2T26 fue volumen y cuánto precio y efecto calendario, y qué esperan en el 3T?', por_que: 'El caso base necesita 2,5-3 % de volumen anual.' },
      { tema: 'Margen', pregunta: '¿Por qué baja la guía de margen 2026 si Fast Forward ahorra 80 M? ¿Cuánto es divisa, cuánto mezcla y cuánto inversión?', por_que: 'El margen es el supuesto más exigente del DCF.' },
      { tema: 'Strategy 2028', pregunta: '¿Qué parte del 6-9 % de crecimiento espera de compras y a qué múltiplo?', por_que: 'El caso base no incluye compras; el ROIC depende de su precio.' },
      { tema: 'China', pregunta: '¿Qué peso tiene hoy China en las ventas y en el EBITDA, y cuándo esperan que deje de restar?', por_que: 'Es el principal riesgo de volumen.' },
      { tema: 'Balance', pregunta: '¿Cuál es el déficit de pensiones neto y los pagos aplazados de compras?', por_que: 'No los hemos podido incluir en el puente.' },
      { tema: 'Divisa', pregunta: '¿Qué sensibilidad tiene el BPA a un 1 % de apreciación del franco frente al euro y al dólar?', por_que: 'La divisa restó 5,5 puntos de ventas en el 1S26.' },
    ],
    confianza: 'Media',
  },

  objetivo_12m: {
    ejercicio: '2028e',
    casos: [
      { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: 7.43, multiplo: null, precio: null, justificacion: 'Crecimiento en francos del 2,5 % en 2027e y 3,0 % en 2028e y margen EBITDA del 18,8 %: ventas de ≈11.940 M, EBIT de ≈1.700 M, resultado financiero de −170 M, impuestos del 21,5 % y 160,5 M de acciones.' },
      { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: 8.72, multiplo: null, precio: null, justificacion: 'Crecimiento del 4,5 % y 5,0 % y margen EBITDA del 20,3 % en 2028e: ventas de ≈12.410 M, EBITDA de ≈2.520 M, amortización del 4,6 %, EBIT de ≈1.950 M, resultado financiero de −160 M, impuestos del 21,5 % y 160,5 M de acciones. Calibrado con 2025 (fórmula 6,50 frente a 6,50 publicado).' },
      { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: 9.50, multiplo: null, precio: null, justificacion: 'Crecimiento del 6,0 % y 6,5 % y margen del 21,1 % en 2028e: ventas de ≈12.770 M y EBIT de ≈2.110 M.' },
    ],
    per_historico: { base: 'adelantado', actual: 23.55, mediana_5a: 30.95, minimo_5a: 23.5, media_larga: 31.44, excluidos: 'PER adelantado = cierre del año ÷ BPA ajustado del año siguiente (sin las partidas no recurrentes de 2022, 2023 y 2025). Serie: 2020 36,5x; 2021 55,5x; 2022 31,2x; 2023 35,3x; 2024 30,7x; 2025 23,5x (sobre nuestro BPA de 2026e, 7,03 CHF). Excluido 2021 (burbuja de tipos cero). Mediana de 5 años sobre 2022-2025; media larga 2020-2025 sin 2021. Actual: 185,35 ÷ 7,87 (nuestro BPA de 2027e).' },
    comparables_per: { mediana: 21.7 },
    consenso: { bpa_ano1: 7.31, bpa_ano2: 8.20, objetivo_medio: 197.36, objetivo_min: 150, objetivo_max: 240, analistas: 22, tendencia_3m: 'subidas', fuente: 'MarketScreener (BPA) [D4], Investing.com (objetivo medio) [D6], cash.ch (rango y subidas) [D7, D8]' },
    diferencia_consenso: 'Nuestro BPA de 2028e (8,72 CHF) queda un 3,5 % por debajo del consenso (9,04) [D4]: crecemos un poco menos (4,5-5 % frente a ≈5 %) y el margen es parecido. La diferencia está en el múltiplo: nuestro base (235,44 CHF) queda un 19,3 % por encima del objetivo medio (197,36), porque la regla v3 lleva el PER de 23,6 veces a medio camino de su mediana de 31; los analistas aplican múltiplos de ≈22-25 veces. No ajustamos la cifra: el múltiplo lo pone la regla común.',
    media: null,
    comentario: 'El valor intrínseco (174,92 CHF) queda un 25 % por debajo del objetivo a 12 meses (232,42 CHF): el objetivo depende de que el mercado vuelva a pagar a Sika parte de su prima histórica, no del flujo de caja. Para cerrar la distancia haría falta que el volumen confirme en el 3T26 (23-oct) y en 2027 y que el margen suba hacia el 20 %; con eso, el DCF subiría y el múltiplo tendría base. La tesis de revalorización es a 12 meses, pero el valor real no la respalda a este precio.',
  },

  fuentes: [],
  huecos: [
    { seccion: 'dcf', campo: 'Beta de la acción', tipo: 'Complemento', intentos: '1) bolsa.mjs (sin red); 2) Yahoo y Stock Analysis (sin dato en los extractos); 3) beta sectorial (no accesible)', decision: 'Calculado y marcado como estimación (1,10)' },
  ],
};
