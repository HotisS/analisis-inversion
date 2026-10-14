// Textos del analista (Thermo Fisher, corte 2026-10-14). Cifras del motor tal cual; hechos con cita de la nota.
export default {
  limitaciones: 'Análisis hecho desde la nube con la red limitada a la búsqueda web: sec.gov, la web de la empresa y los proveedores de datos no se pudieron abrir, así que las cifras salen de extractos de búsqueda de los comunicados 8-K, del 10-K, del proxy y de Stock Analysis, cruzadas cuando fue posible; la confianza es menor que en un análisis normal y lo que no cuadró está en null y en los huecos. Algunas cifras antiguas (flujo operativo y capex 2021-2024, BPA trimestrales 3T24-3T25, cierres anuales 2018-2023, patrimonio atribuido 2022-2023) se tomaron de memoria de los documentos de la empresa y cuadran con totales publicados (FCF de cada año, ingresos y BPA de 2025). Cuentas en USD con US GAAP; ejercicio natural. Precio: cierre del 13-oct-2026 (la sesión del 14 no había cerrado). Acciones: 377 M, estimación desde la capitalización publicada de julio. El EBITDA del informe es el GAAP (EBIT + amortizaciones); el BPA del objetivo a 12 meses y el PER histórico están en base ajustada (sin amortización de intangibles comprados), la que usa el mercado. Los resultados del 3T26 salen el 21-oct-2026, una semana después del corte.',
  controles_explicados: [
    { control: 'Sección de núcleo con datos: competencia', explicacion: 'Sin cifras de competidores (10-K de Danaher, Agilent y Waters no accesibles); queda el foso y la posición.' },
  ],
  parches: [],
  huecos_resueltos: [],
  secciones: {
    negocio: {
      como_gana_dinero: 'Alrededor de dos tercios de los ingresos son recurrentes: consumibles, reactivos, servicios de fabricación por contrato, ensayos clínicos (PPD, Clario) y distribución de laboratorio; el resto son instrumentos, que dependen del presupuesto de capital de farmacéuticas, universidades y Gobiernos [A1]. El margen depende de la mezcla: Ciencias de la vida gana un 36,3 % de margen de segmento, mientras que la distribución y los servicios de Laboratorio y servicios biofarmacéuticos, que son el 52 % de las ventas, ganan bastante menos [A1, B1]. Hay apalancamiento operativo: con un orgánico del 5 % en el 2T26 el BPA ajustado creció un 13 % [A4]. El cuarto trimestre es el más fuerte por los presupuestos de fin de año (12.214 M en el 4T25 frente a 10.363 M en el 1T25) [A2].',
      clientes: 'La empresa no publica concentración, pero vende a miles de laboratorios; las grandes farmacéuticas y biotecnológicas son el primer grupo de clientes y el que más mueve el ciclo [A1]. Los costes de cambio son altos en bioproducción y en ensayos clínicos, porque los procesos se validan ante el regulador con un proveedor concreto. El poder de precios es moderado: la empresa sube precios en torno a la inflación y sostuvo el margen operativo ajustado (21,8 % en el 1T26 frente a 21,9 % un año antes) con un orgánico de solo el 1 % [A3].',
    },
    sector: {
      definicion: 'El mercado relevante son las herramientas, consumibles y servicios para la investigación, el desarrollo y la fabricación de medicamentos, el diagnóstico y el laboratorio industrial, mundial. No se ha podido contrastar el tamaño con dos fuentes (hueco registrado): Thermo Fisher, con 44.556 M USD, es el mayor proveedor, y Danaher, Agilent, Waters, Mettler-Toledo, Merck KGaA y Sartorius son sus rivales directos según el segmento [A1, D7].',
      tamano: null, unidad_serie: null, serie: [], tcac_historico_pct: null, tcac_previsto_pct: null, cr5_pct: null, estructura: 'Moderadamente concentrada',
      drivers: [
        { driver: 'Gasto en I+D y fabricación de farmacéuticas', efecto: '+', horizonte: 'Estructural', evidencia: 'Bioproducción creció 548 M en 2025 por la demanda de farmacéuticas y biotecnológicas [A1].' },
        { driver: 'Financiación de las biotecnológicas', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'El orgánico de Thermo Fisher pasó del 1 % en el 1T26 al 5 % en el 2T26 y la dirección habla de más gasto de las biotecnológicas [A3, A4, A12].' },
        { driver: 'Financiación pública y académica (NIH)', efecto: '−', horizonte: 'Cíclico', evidencia: 'Los recortes federales mantienen débil Instrumentos analíticos: +1,2 % en 2025 [A1, B2].' },
        { driver: 'Fin de las ventas de covid', efecto: '−', horizonte: 'Cíclico', evidencia: 'Los ingresos cayeron de 44.915 M en 2022 a 42.857 M en 2023 y no recuperaron hasta 2025 [A5].' },
      ],
      porter: [
        { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Pocos grandes y especializados por segmento; Barclays rebajó el sector por valoraciones altas, no por guerra de precios [B3].' },
        { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Las grandes farmacéuticas negocian, pero el coste del consumible es pequeño frente al del medicamento.' },
        { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Insumos variados; Thermo Fisher integra fabricación propia.' },
        { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Validación regulatoria, catálogo y red comercial mundial.' },
        { fuerza: 'Amenaza de sustitutos', intensidad: 2, justificacion: 'Los métodos nuevos (proteómica, datos digitales de ensayos) los compra la propia empresa: Olink en 2024, Clario en 2026 [A12].' },
      ],
      ciclo: { posicion: 'Recuperación', comentario: 'Tras dos años planos (orgánico del 2 % en 2025), el 2T26 marcó un 5 % orgánico y la empresa subió dos veces la guía de 2026 [A2, A4]. En septiembre, Casper habló de mejora de la demanda en varios mercados finales [B4]. La academia y los Gobiernos siguen débiles [B2]. En 2020 el sector creció por la covid y en 2023-24 sufrió la resaca de ese pico y la caída de la financiación biotecnológica.' },
      regulacion: 'Afectan a las cifras los presupuestos de los NIH en EE. UU. (recortes de 2025-26 que pesan en instrumentos y academia) y los aranceles entre EE. UU. y China; no se ha podido leer el detalle en el 10-K [B2].',
      tendencias: 'La demanda se desplaza hacia la bioproducción de biológicos, la proteómica y los datos digitales de ensayos clínicos; Thermo Fisher compra para estar en ellas (Olink, Clario, filtración de Solventum) y vende lo que crece menos (microbiología a Astorg) [A1, A14, A15].',
      confianza: 'Baja',
    },
    competencia: {
      amenazas: 'El foso es de escala y de costes de cambio, y no parece erosionarse: el margen de Ciencias de la vida se sostiene en el 36 % [A1]. El riesgo es otro: que el rendimiento de las compras baje (ROIC del 7,3 % en 2025 frente al 10,5 % de 2021), porque cada compra grande se paga a múltiplos altos (Clario a ≈9,9 veces ventas) [A15].',
    },
    financieros: {
      comentario: 'Los ingresos pasaron de 39.211 M en 2021 a 44.556 M en 2025 (+3,3 % anual), pero con una joroba: el pico de 2022 (44.915 M) llevaba pruebas de covid y 2023-24 fueron planos [A5]. El orgánico fue del 2 % en 2025 y el resto lo pusieron las compras [A2]. El margen EBITDA GAAP bajó del 32,2 % de 2021 al 23,6 % de 2025 por el fin de la covid y la mezcla (PPD y distribución pesan más); el operativo ajustado se mueve poco (23,6 % en el 4T25 frente a 23,9 %) [A2]. En 2026 el crecimiento vuelve: +6,2 % en el 1T26 y +10,5 % en el 2T26, con un 5 % orgánico en el segundo trimestre y Clario desde el 24 de marzo [A3, A4, P1, P2].',
    },
    trimestres: {
      ultima_presentacion: 'En la conferencia del 2T26 (23 de julio) la dirección subió la guía de 2026 a 47.400-48.100 M de ingresos y 24,93-25,33 USD de BPA ajustado, desde 24,64-25,12, tras un BPA de 6,03 USD, 0,30 por encima de su propia guía [A4, A12]. El director financiero, Jim Meyer, atribuyó la mejora a farmacéuticas y biotecnológicas, y Casper dijo que el gasto de las biotecnológicas repuntó [A12, A13]. En abril, en cambio, la guía del 2T fue floja y la acción cayó un 9 % pese a superar el consenso en 0,20 USD [A3, E3]. Entre una conferencia y otra el discurso pasó de «el mercado mejora poco a poco» a «aceleración»; las preguntas giraron en torno a la academia y los Gobiernos (aún débiles), Clario y el uso de la caja de la venta de microbiología [A14, B2]. No hemos podido leer las transcripciones completas.',
    },
    balance: {
      otros_pasivos: 'Clario lleva 125 M de pago aplazado en enero de 2027 y hasta 400 M de pagos variables según sus resultados de 2026 y 2027 [A15]; el puente suma 325 M por ellos y resta los ≈1.025 M cobrados por la microbiología en agosto [A14]. Los arrendamientos operativos no van a la deuda (US GAAP). No se han podido leer las notas de pensiones, litigios ni covenants.',
      comentario: 'La deuda bruta subió de 31.275 M a final de 2024 a 39.385 M en 2025 y a 42.549 M en junio de 2026 por las compras (filtración de Solventum, Clario), con bonos emitidos a principios de 2026 [A7, A9, P3]. La deuda neta ajustada es de unos 38.000 M, 3,5 veces el EBITDA; el circulante comercial se mantiene en el 24 % de las ventas [A7]. La caja de 9.852 M de final de 2025 se gastó en Clario [A7, A15].',
      rating: null,
    },
    flujos: {
      comentario: 'Thermo Fisher convierte bien: el flujo libre fue de 6.789 M en 2021, 6.911 M en 2022, 6.927 M en 2023, 7.324 M en 2024 y 6.337 M en 2025 [A1]. La caída de 2025 vino del circulante y del calendario de impuestos, según la dirección [A10]. El capex bajó de 2.523 M en 2021 (ampliaciones de capacidad de la pandemia) a ≈1.500 M en 2025 [A11]; la guía de 2026 es de 1.800-2.000 M de capex y 6.800-7.300 M de flujo libre [A10]. Estimamos que el capex de mantenimiento es de ≈2,5-3 % de las ventas. Las compras se comen el flujo: ≈13.000 M comprometidos en 2025 frente a 6.337 M de flujo libre [A2].',
    },
    calidad: {
      comentario: 'Las cuentas son limpias pero muy ajustadas: el BPA ajustado (22,87 USD en 2025) supera al GAAP (17,74 USD) en un 29 %, sobre todo por la amortización de intangibles comprados, que se repite cada año porque la empresa compra cada año [A2]. Por eso usamos el GAAP en el DCF y el ajustado solo para comparar el PER con la historia y con el mercado. El Altman Z (3,28) está en zona segura; el Piotroski F (4) es medio por la caída del margen y el aumento de la deuda; el Beneish M (−2,47) no señala manipulación. Faltan el coste de ventas, los impuestos y el activo corriente por año, así que los tres indicadores son aproximados.',
      senales: [
        { senal: 'Diferencia de BPA ajustado sobre GAAP del 29 %', nivel: 'Media', comentario: 'Amortización de intangibles y costes de compras recurrentes [A2].' },
        { senal: 'Fondo de comercio de 49.362 M, el 45 % del activo', nivel: 'Media', comentario: 'Sin deterioros conocidos, pero el ROIC de las compras baja [A7].' },
      ],
    },
    capital: {
      politica: 'La empresa reparte su caja entre compras, recompras y un dividendo pequeño: en 2025 desplegó 16.500 M, de los que 13.000 M fueron compras y 3.600 M recompras y dividendos [A2]. El dividendo trimestral subió de 0,43 a 0,47 USD en 2026 (0,3 % de rentabilidad) [D1]. En el 2T26 recompró 1.000 M a cuenta de la venta de microbiología [A13, A14].',
      comentario: 'Casper es un comprador disciplinado en la integración, pero el rendimiento de lo comprado cae: el ROIC del motor pasó del 10,5 % de 2021 al 7,3 % de 2025, por debajo del WACC del 9,10 %, y el ROIC incremental de 2021-25 es negativo porque el beneficio bajó tras la covid mientras el capital crecía [A5, A7]. Las recompras (≈15.000 M en cinco años) redujeron las acciones de 397 a 379 M, un 1 % al año [A5]. La venta de microbiología a 1,7 veces ventas para recomprar acciones muestra que la dirección sabe podar [A14].',
    },
    directivos: {
      comentario: 'Equipo estable y creíble: Casper lleva 17 años al frente, cumplió la guía de BPA de 2025 (22,87 USD, en la parte alta) y en 2026 la ha subido dos veces [A2, A4]. El premio de retención de mayo de 2025 le ata hasta 2030 y despeja la sucesión a corto plazo, pero a un precio alto [C1, C2]. El director financiero es nuevo en el cargo [C3]. No hemos podido leer el historial completo de la guía de 2021-2024.',
    },
    gobierno: {
      remuneracion: 'La remuneración total de Casper fue de 79,9 M USD en 2025 frente a 30,4 M en 2024: 65,7 M en acciones, 8,0 M en opciones, 3,7 M de variable anual y 0,7 M de otros [C1]. El salto es un premio de retención ligado a resultados para que siga hasta 2030, cuyas condiciones no se cumplían a final de 2025 [C2]. La empresa publicó material adicional para pedir el voto a favor en la junta de 2026, señal de que algún asesor de voto lo cuestionó [C2]. No hemos encontrado el porcentaje de voto.',
      control_y_defensas: 'Capital disperso, sin accionista de control ni clases de acciones; una acción, un voto. El presidente es también consejero delegado, con un consejero coordinador independiente (no hemos podido comprobar su nombre). No se conocen operaciones vinculadas relevantes ni blindajes; los grandes gestores pasivos son los primeros accionistas, sin cifra comprobada [C1].',
      alertas: ['Remuneración del consejero delegado de 79,9 M USD en 2025 por un premio de retención; la empresa tuvo que hacer campaña por el voto de remuneración en 2026 [C1, C2].', 'Presidente y consejero delegado en la misma persona desde 2020.'],
    },
    consenso: {
      guidance: 'Guía de 2026 (23-jul-2026): ingresos de 47.400-48.100 M y BPA ajustado de 24,93-25,33 USD, tras subirla en abril (24,64-25,12) desde la de enero (24,22-24,80) [A4, B3, D16]. Incluye Clario (≈900 M de ingresos y 0,32 USD de BPA) y resta la microbiología vendida (≈200 M de ingresos en 2026; 0,15 USD de dilución el primer año completo) [A12, A14]. En enero la empresa pedía 1.800-2.000 M de capex y 6.800-7.300 M de flujo libre [A10].',
      revisiones: 'Al alza: Erste subió el BPA de 2026 de 24,85 a 25,12 USD tras el 2T26 y J. P. Morgan el objetivo de 600 a 690 USD [D2, D3]. El objetivo medio pasó de 596 USD en junio a 617-635 USD en agosto [D16, D4, D2]. Solo tenemos una fuente con BPA de 2027e (27,43 USD), sin consenso de 2028e. Las cifras son de agosto: el consenso de octubre puede estar más arriba tras la subida de la acción.',
    },
    bolsa: {
      comentario: 'La acción cayó a 435,27 USD en mayo, tras el 1T26 (−9 % en un día por una guía trimestral floja) y con el sector castigado por los recortes de la financiación pública y biotecnológica [D1, E3]. Desde entonces ha subido un 52 % hasta 663,04 USD: +9 % el día del 2T26, 629,27 USD el 21 de agosto y 655,83 USD el 17 de septiembre, cerca del máximo de 52 semanas (694,33 USD) [D1, D15]. No tenemos rentabilidades totales ni beta publicadas (hueco).',
    },
    multiplos_historicos: {
      comentario: 'Con el BPA ajustado, Thermo Fisher ha cotizado entre 23,6x y 25,3x en los años limpios, salvo 2019 (30,4x), con tipos de interés bajos [D5, D6]. Hoy paga ≈26,4x el BPA de 2026e de consenso (25,12 USD), algo por encima de la mediana de cinco años (24,6x) aunque el bono a 10 años está en el 5,22 % frente al 2-4 % de esos años [D3, D13]. El PER no ha bajado con los tipos: el mercado sigue pagando la calidad.',
    },
    comparables: {
      criterio: 'Herramientas de ciencias de la vida (Danaher, Agilent, Waters, Mettler-Toledo, Qiagen) y servicios de desarrollo de fármacos (IQVIA, Charles River), porque la mitad de las ventas de Thermo Fisher es Laboratorio y servicios biofarmacéuticos [A1]. Faltan Sartorius y Merck KGaA (sin datos a la fecha). DHR, A, WAT y MTD solo tienen PER adelantado, con fechas distintas (MTD y WAT de abril-mayo); IQV, CRL y QGEN vienen de los análisis de Medpace y bioMérieux del 8-oct [D7-D12].',
      comentario: 'Thermo Fisher cotiza a 24,6x el PER de los próximos 12 meses, por encima de la mediana de los comparables (23,3x) y en línea con Danaher (24,4x) [D7]. La prima frente a los de servicios (IQVIA, 18,5x) se explica por el peso de los consumibles; la de Mettler-Toledo (30,0x) muestra que el mercado paga más por márgenes más altos. El PER de los comparables da un valor de 627,62 USD por acción; el EV/EBITDA de los últimos 12 meses, mucho menos, porque nuestro EBITDA es GAAP y el de los comparables, ajustado.',
    },
    transacciones: {
      comentario: 'Las compras del sector se pagan a 4-10 veces ventas: Clario a ≈9,9x, PPD a ≈3,7x y la filtración de Solventum a ≈4x, mientras que la microbiología se vendió a 1,7x [A14, A15, D17]. No hay EV/EBITDA publicados. Thermo Fisher, con 250.000 M de capitalización, no es objetivo de una compra; las transacciones no entran en la valoración.',
    },
    esg: {
      calificaciones: [],
      materialidad: 'Los asuntos materiales son la seguridad y calidad de productos validados ante el regulador (bioproducción, diagnóstico), la exposición a China y a los aranceles, y la remuneración del primer ejecutivo. No hemos podido leer el informe de sostenibilidad (hueco).',
      controversias: 'La remuneración de 79,9 M USD de 2025 obligó a la empresa a hacer campaña por el voto en la junta de 2026 [C1, C2]. No hemos encontrado sanciones relevantes en los últimos tres años con la búsqueda disponible.',
      confianza: 'Baja',
    },
    sentimiento: {
      lectura: 'El sentimiento ha pasado de la capitulación de mayo (acción en 435 USD, «el sector está roto») a un optimismo prudente: la mayoría ve la recuperación pero duda de pagar 26x tras un 52 % de subida [E1, E5, E6]. No es euforia y coincide con el consenso de analistas (21 de 26 en comprar) [D2]. Lo que aporta es el riesgo de tiempo: el rally descuenta que el 5 % orgánico del 2T26 se repite; un 3T26 (21 de octubre) por debajo castigaría la acción como en abril [E3]. No hay hilos de Reddit recientes con debate: Thermo Fisher es un valor institucional, poco comentado por particulares [E2, E7].',
    },
  },
  dcf_justificacion: {
    crecimiento: '2026e (+7,1 %, fijo) es el punto medio de la guía de julio menos la microbiología vendida [A4, A14]. 2027e-2028e (+6 %) suman un orgánico del 4,5-5 %, el del 2T26 y el del sector en recuperación, y 1-1,5 puntos de Clario y la filtración de Solventum, que crecen más que el grupo [A4, A12]. Después baja hasta el 3 %. Es menos que el objetivo histórico de la empresa (7 % orgánico) porque no proyectamos compras nuevas. El consenso de BPA de 2027e (27,43 USD) implica algo más [D3].',
    margenes: 'El margen EBITDA GAAP sube del 23,6 % de 2025 al 24,2 % en 2026e y al 25,5 % en 2030e: medio punto al año en 2026-28, lo que promete la dirección (≈50 pb de margen operativo ajustado al año) [A2, D16], y nada después. Queda muy por debajo del 32,2 % de 2021, que llevaba la covid.',
    inversion: 'Capex del 4 % de las ventas en 2026e (guía de 1.800-2.000 M) y del 3,5 % después, por encima del ≈3,4 % de 2025 [A10, A11]. La amortización baja del 6,3 % al 3,6 % porque dos tercios son intangibles de compras que se agotan; en el último año igualamos capex y amortización. Circulante del 24 % de las ventas, el de 2025 [A7].',
    wacc: 'Tasa libre del 5,22 % (bono a 10 años de EE. UU. del 13-oct) [D13], beta de 0,85 (negocio defensivo de salud; no hay beta publicada a la fecha, hueco), prima del 5,5 %: coste del capital del 9,9 %. Deuda al 5,2 % antes de impuestos (coste de los bonos nuevos; el medio es menor), tipo del 12 % y un 15 % de deuda a valor de mercado: WACC del 9,10 %. Con la prima implícita del mercado (4,2 %) el WACC sería del 8,2 % [D14].',
    terminal: 'Gordon con un 3 % de crecimiento: inflación de EE. UU. de ≈2,5 % y algo de crecimiento real, por debajo de la tasa libre menos medio punto. Un 3 % es exigente para una empresa ya madura, pero el sector crece con el gasto en salud. El múltiplo de salida de referencia (20x EBITDA) es inferior al actual (26,1x).',
  },
  puente_comentarios: {
    '2026e': 'Volumen del 2,5 % (orgánico del 1-5 % en el primer semestre), precio del 1,5 % y 3,1 puntos de compras netas: Clario desde el 24 de marzo y la filtración de Solventum, menos la microbiología desde agosto [A3, A4, A12, A14].',
    '2027e': 'Orgánico del 4,5 % (3 de volumen y 1,5 de precio) y 1,5 puntos del trimestre de Clario que falta y de su crecimiento por encima del grupo [A12].',
    '2028e': 'Orgánico del 5 % con la biotecnología normalizada; 1 punto de mezcla hacia bioproducción y datos clínicos, que crecen más [A1].',
    '2029e': 'Orgánico del 4,5 % y 1 punto de mezcla.',
    '2030e': 'Orgánico del 4 % y 1 punto de mezcla.',
  },
  veredicto: 'Sí',
  sostenibilidad_justificacion: 'Sí, con matices. La reinversión neta de la proyección es casi nula (capex del 3,6 % de las ventas y amortización que baja), así que el motor no puede hacer la prueba del crecimiento financiable y la hacemos a mano: el crecimiento orgánico proyectado (4-5 %) es el del mercado y el de la propia empresa en 2T26, sin ganar cuota, con un precio del 1,5 % por debajo de la inflación y un capex por encima del de 2025 [A4, A11]. El crecimiento por compras ya está pagado (Clario, Solventum) y no proyectamos compras nuevas. El matiz es el rendimiento: el ROIC (7,3 % en 2025) está por debajo del WACC (9,10 %) porque el capital lleva 49.362 M de fondo de comercio; crecer comprando no crea valor a estos precios.',
  dcf_lectura: 'El DCF da 345,74 USD por acción, un 47,9 % por debajo del precio de 663,04 USD, con un WACC del 9,10 % y un valor terminal del 59 % del total. Con la prima implícita del mercado (WACC del 8,2 %) sube a 426,87 USD, aún un 36 % por debajo. El DCF inverso es la clave: el precio descuenta un crecimiento de los ingresos del 13,9 % anual de 2027e a 2035e frente al 4,5 % de nuestro caso base, o un margen EBITDA del 40,5 % frente al 25,5 %; dicho de otra forma, a 663,04 USD el comprador obtiene un 6,6 % anual, menos que el 9,10 % de WACC y que el 8,2 % que pide el mercado. Es exigente: el precio solo cuadra si la empresa vuelve a crecer comprando con éxito durante años, algo que hizo en 2010-2021 pero que hoy, con el ROIC por debajo del WACC, no está demostrado.',
  narrativas: {
    Bajista: 'La recuperación de la biotecnología se frena y la academia sigue a la baja: el orgánico se queda en el 2 % de 2025 y la presión de precios y de mezcla quita un punto de margen. Le pasó a la propia empresa en 2023-24 [A5].',
    Base: 'El orgánico se estabiliza en el 4,5-5 %, Clario aporta lo previsto y el margen gana medio punto al año hasta 2028e [A4, A12].',
    Alcista: 'La biotecnología vuelve a financiarse con fuerza y la bioproducción de biológicos acelera: orgánico del 6-7 %, como el objetivo histórico de la empresa, y medio punto más de margen.',
  },
  escenarios_comentario: 'El DCF da 261,89 USD en el bajista (−60,5 %), 345,74 en el base y 397,35 en el alcista (−40,1 %): todos por debajo del precio, porque el problema no es el escenario sino la tasa de descuento con el bono al 5,22 %. La asimetría del DCF (−0,66x) no sirve para decidir. La del objetivo a 12 meses sí: 765,07 USD en el alcista (+15,7 %) frente a 628,05 en el bajista (−5,0 %), una asimetría de 2,92x, porque el PER de Thermo Fisher apenas se ha movido entre 23,6x y 25,3x en los años limpios.',
  suma_partes_comentario: 'No aplica: solo hemos podido obtener el resultado de Ciencias de la vida (3.768 M en 2025); sin el de los otros tres segmentos la suma de partes sería un ejercicio de supuestos [A1].',
  valoracion_comentario: 'El DCF pesa un 40 %, los comparables un 40 % y los escenarios un 20 %. El valor objetivo de largo plazo es de 456,88 USD, un 31,1 % por debajo del precio: el DCF y los escenarios (262-397 USD) quedan muy por debajo y el PER de los comparables (627,62 USD) cerca. La dispersión no es de cifras sino de tasa de descuento: con un bono al 5,22 %, un negocio que crece un 5 % y rinde un 7,3 % sobre el capital no vale 26 veces beneficios en un DCF, pero el mercado lleva años pagándolo. Por eso la decisión la toma el objetivo a 12 meses, con el PER propio de la empresa, y el valor intrínseco es una advertencia de que la acción no tiene margen de seguridad.',
  rentabilidad_comentario: 'Thermo Fisher no crea valor sobre el capital total: el ROIC del motor (NOPAT entre capital invertido con fondo de comercio) fue del 10,5 % en 2021, del 8,9 % en 2022 y del 7,3 % en 2023-2025, frente a un WACC del 9,10 % (−1,8 puntos) [A5, A7]. La caída la explica el margen (fin de la covid) y el capital comprado (PPD, Olink, Solventum): el ROIC incremental de 2021-25 es negativo. Sin fondo de comercio el negocio rinde mucho más (Ciencias de la vida gana un 36 % sobre ventas) [A1], así que el problema es el precio pagado por las compras, no el negocio. IQVIA (9,8 %) y Charles River (8,6 %) están en niveles parecidos [D11].',
  diferencia_consenso: 'Nuestro precio base (709,71 USD) queda un 11,8 % por encima del objetivo medio de los analistas (635,08 USD, de agosto; 26 analistas, máximo 750) [D2]. El BPA no explica la diferencia: nuestro 2027e (26,65 USD) queda un 3 % por debajo de Erste (27,43 USD), porque no contamos recompras no anunciadas [D3]. La explica la fecha: los objetivos son de agosto, con la acción en 570-630 USD, y el nuestro aplica un PER de 24,6x al BPA de 2028e, un año más. Es probable que los objetivos suban tras el 3T26.',
  objetivo12m_comentario: 'El objetivo a 12 meses (703,14 USD) queda un 54 % por encima del valor intrínseco (456,88 USD). La distancia no se cierra con un catalizador: refleja que el mercado paga por Thermo Fisher un PER estable de 24-25x con independencia de los tipos de interés, y el DCF con el bono al 5,22 % no. Si el mercado algún día valorase la empresa por su flujo de caja (rentabilidad del 2,5 %), la acción tendría poco suelo. Por eso la tesis es de mantener, no de comprar: la rentabilidad a 12 meses (6,3 %) es la del beneficio, no la de un múltiplo barato.',
  oj: {
    Bajista: 'Ventas de 51.600 M en 2028e (−2 puntos de crecimiento en 2027-28) y margen EBITDA ajustado del 25,3 %: EBIT ajustado de ≈11.970 M tras una depreciación del 2,1 %, 650 M de gasto financiero neto, impuesto del 12 % y 376 M de acciones.',
    Base: 'Ventas de 53.620 M en 2028e y margen EBITDA ajustado del 26,3 % (el 25,0 % GAAP del DCF más 1,3 puntos de reestructuración y otros que excluye la empresa): EBIT ajustado de ≈12.975 M, 650 M de gasto financiero neto, impuesto del 12 % y 376 M de acciones, sin recompras no anunciadas.',
    Alcista: 'Ventas de 55.150 M (+1,5 puntos de crecimiento en 2027-28) y margen ajustado del 26,8 %: orgánico del 6-7 % con la biotecnología financiada.',
  },
  catalizadores: { items: [
    { fecha: '21-oct-2026', evento: 'Resultados del 3T26', efecto: 'Prueba de que el orgánico del 5 % del 2T26 se sostiene; la comparativa es de 11.122 M y 5,79 USD de BPA [A4].', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'Ene-2027', evento: 'Guía de 2027 con los resultados del 4T26', efecto: 'El consenso espera ≈27,4 USD de BPA [D3]; una guía por debajo de 27 USD pesaría.', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'Ene-2027', evento: 'Pago aplazado de Clario (125 M) y medición de los pagos variables', efecto: 'Muestra si Clario cumple su plan [A15].', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: '2027', evento: 'Presupuesto de los NIH para el año fiscal 2027', efecto: 'Academia y Gobiernos pesan en Instrumentos analíticos [B2].', probabilidad: 'Media', sentido: '+/−' },
    { fecha: '2026-2027', evento: 'Nuevas recompras con la caja de la microbiología', efecto: 'Ya se hizo 1.000 M en el 2T26 [A13]; cada 1.000 M sube el BPA ≈0,4 %.', probabilidad: 'Media', sentido: '+' },
  ], confianza: 'Media' },
  riesgos: { items: [
    { riesgo: 'Recaída de la financiación biotecnológica', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−11 % a 12 meses (bajista: 628,05 USD con un PER de 23,7x)', mitigante: 'Dos tercios de ingresos recurrentes.', senal: 'Orgánico por debajo del 3 % en dos trimestres.' },
    { riesgo: 'Compresión del PER si el bono sigue por encima del 5 %', tipo: 'Valoración', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−31 % hasta el valor intrínseco (456,88 USD)', mitigante: 'El PER ha resistido la subida de tipos de 2022-26.', senal: 'PER adelantado por debajo de 22x en el sector.' },
    { riesgo: 'Rendimiento bajo de las compras (Clario a ≈9,9x ventas)', tipo: 'Asignación de capital', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 % (un 2 % menos de BPA y medio punto menos de PER)', mitigante: 'Historial de integración de Casper.', senal: 'Pagos variables de Clario por debajo del máximo; deterioros.' },
    { riesgo: 'Recortes de los NIH y de la financiación académica', tipo: 'Regulatorio', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: '−3 % (Instrumentos analíticos es el 16 % de las ventas)', mitigante: 'Peso pequeño de la academia.', senal: 'Instrumentos analíticos en negativo.' },
    { riesgo: 'Aranceles y exposición a China', tipo: 'Geopolítico', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−3 %', mitigante: 'Fabricación local.', senal: 'Guía de margen recortada por aranceles.' },
    { riesgo: 'Gobierno: remuneración y dependencia de Casper', tipo: 'Gobierno', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: 'Difícil de cuantificar', mitigante: 'Premio de retención hasta 2030.', senal: 'Voto de remuneración por debajo del 70 %.' },
  ],
  premortem: 'Octubre de 2029: la acción ha perdido un 40 % y cotiza a ≈400 USD. El 3T26 confirmó la recuperación y la acción tocó 750 USD a principios de 2027, pero el orgánico de 2027 se quedó en el 3 %: la biotecnología volvió a cerrar el grifo cuando los tipos siguieron por encima del 5 %, la academia no se recuperó y la bioproducción digirió inventarios otra vez. Thermo Fisher hizo lo de siempre, comprar, y pagó otra empresa de datos clínicos a 8 veces ventas con deuda. El BPA de 2028 quedó en 26 USD en vez de 29 y el mercado, que ya no pagaba la calidad con el bono al 5 %, bajó el PER a 16x, el de IQVIA. El indicador que lo habría anticipado: el orgánico trimestral por debajo del 3 % y la deuda neta por encima de 3,5 veces el EBITDA tras una compra nueva.',
  confianza: 'Media' },
  preguntas: { items: [
    { tema: 'Crecimiento orgánico', pregunta: '¿Cuánto del 5 % orgánico del 2T26 es recuperación de inventarios de bioproducción y cuánto demanda final?', por_que: 'Decide si 2027 crece al 4,5-5 % de nuestro base o al 2 % del bajista.' },
    { tema: 'Clario', pregunta: '¿Qué crecimiento y margen tiene Clario en 2026 y qué parte de los 400 M variables espera pagar?', por_que: 'Se pagó a ≈9,9 veces ventas; su rendimiento fija el ROIC de los próximos años.' },
    { tema: 'Asignación de capital', pregunta: '¿Qué ROIC exige a una compra y cuál es el de PPD frente a lo pagado?', por_que: 'El ROIC del grupo (7,3 %) está por debajo del WACC.' },
    { tema: 'Margen', pregunta: '¿Se mantiene la mejora de 50 pb al año del margen operativo ajustado en 2027-28?', por_que: 'Es medio punto de BPA al año.' },
    { tema: 'Academia', pregunta: '¿Qué peso tienen hoy academia y Gobiernos en las ventas y cuánto han caído en 2026?', por_que: 'Riesgo de los recortes de los NIH.' },
    { tema: 'Remuneración', pregunta: '¿Qué voto obtuvo la remuneración en la junta de 2026 y qué condiciones tiene el premio de retención?', por_que: 'Alerta de gobierno sin cifra comprobada.' },
  ], confianza: 'Media' },
  fuentes: [
    { id: 1, titulo: 'Thermo Fisher Scientific, Form 10-Q del 1T26 (trimestre cerrado el 28-mar-2026).', editor: 'Thermo Fisher / SEC', tipo: 'Primaria', fecha: '2026-04-24', url: 'https://www.sec.gov/Archives/edgar/data/0000097745/000009774526000092/tmo-20260328.htm' },
    { id: 2, titulo: 'Thermo Fisher Scientific to Acquire Clario (nota de prensa, anexo 99.1 del 8-K).', editor: 'Thermo Fisher / SEC', tipo: 'Primaria', fecha: '2025-10-29', url: 'https://www.sec.gov/Archives/edgar/data/97745/000009774525000156/thermofisherscientifictoac.htm' },
    { id: 3, titulo: 'Thermo Fisher Scientific, folleto de emisión de bonos (424B5) de 2026.', editor: 'Thermo Fisher / SEC', tipo: 'Primaria', fecha: '2026-01', url: 'https://www.sec.gov/Archives/edgar/data/97745/000114036126004305/ny20064939x1_424b5.htm' },
  ],
  huecos: [],
};
