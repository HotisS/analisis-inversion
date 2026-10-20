// Textos del analista (Swisscom, corte 2026-10-20). Citas con la letra de la nota ([A3] = fuente 3 de A.json; [P1] propia).
export default {
  limitaciones: 'Cifras en millones de CHF, ejercicio natural. Línea cotizada: acción nominativa de Swisscom en SIX (SCMN, CHF); cuentas en CHF, sin conversión. Precio del informe: cierre del 19-oct-2026 (672,00 CHF); la sesión del 20-oct estaba abierta y a las 08:49 UTC (10:49 de Zúrich) cotizaba a 672,00 CHF (Yahoo; 671,50 en la herramienta de movimiento): la decisión no cambia [D2, D9]. Base EBITDAaL: el EBITDA del informe es el EBITDAaL de la empresa (después de arrendamientos), el EBIT resta los intereses de arrendamientos y los arrendamientos (3.480 M a 30-jun-2026) no están en la deuda del puente ni en los múltiplos; el EV/EBITDA de los comparables de Yahoo (NIIF 16) no es comparable y no se usa [A1, D2]. Swisscom no presenta en ESEF ni en la SEC: las cuentas se han tomado a mano de los informes anuales 2021-2025 (2024 reexpresado) y del informe del 1S26 [A1, A4]. Italia en EUR convertida por la empresa. No hay ficha sectorial de telecomunicaciones en el repositorio (el encargo no permite crearla). Operaciones de directivos anónimas (Suiza) y sin registro público de cortos.',
  controles_explicados: [],
  huecos: [],
  secciones: {
    historia: {
      resumen: 'Swisscom nace en 1998 de la separación de las antiguas PTT suizas (Telecom PTT) y sale a bolsa ese mismo año; la ley de empresas de telecomunicaciones obliga a la Confederación a conservar la mayoría [A1]. En 2007 compra Fastweb, el operador de fibra italiano, que durante años da poco rendimiento y acumula deterioros [A1]. En Suiza construye la red de fibra y 5G líder del país y pasa a vender TI y nube a empresas. En 2024 compra Vodafone Italia por 8.000 M EUR, la mayor operación de su historia, y la fusiona con Fastweb el 1-ene-2026; desde septiembre de 2026 ya no está en el SMI [A9, D7].',
      hitos: [
        { anio: '1998', hito: 'Separación de las PTT: nace Swisscom y sale a bolsa; la Confederación conserva la mayoría por ley.' },
        { anio: '2007', hito: 'Compra de Fastweb (Italia): base del negocio italiano [A1].' },
        { anio: '2021', hito: 'Michael Rechsteiner, presidente del consejo [C1].' },
        { anio: '2022', hito: 'Christoph Aeschlimann, consejero delegado [C1].' },
        { anio: '2024', hito: 'Compra de Vodafone Italia por 8.000 M EUR de valor empresa (cierre el 31-dic) [A9].' },
        { anio: '2025', hito: 'Primer año con Vodafone Italia: ventas de 15.048 M CHF; dividendo de 26 CHF (22 desde 2017) [A1].' },
        { anio: '2026', hito: 'Fusión de Fastweb y Vodafone Italia; salida del SMI (21-sep); objetivos del Consejo Federal 2026-2029 [D7, B4].' },
      ],
      confianza: 'Media',
    },
    rentabilidad: {
      comentario: 'El ROIC (beneficio operativo después de impuestos sobre patrimonio + deuda financiera neta, en base EBITDAaL) era del 9,7-10,5 % en 2021-2023 y cae al 7,5 % en 2024 y al 6,0 % en 2025 al entrar Vodafone Italia: 7.454 M CHF de capital nuevo que hoy rinde ≈ 4-5 % [A1, A9]. Sin fondo de comercio, 8,2 %. Frente a un WACC del 4,31 % (tipos suizos casi nulos), el diferencial es de solo 1,7 puntos; con la prima implícita del mercado (WACC 3,6 %), 2,4 puntos [D4, D5]. Suiza sola gana mucho más (EBITDAaL de 3.362 M con un margen del 43 %); Italia (23 % de margen, inversión de ≈ 20 % de las ventas) diluye. Las sinergias (≈ 600 M EUR anuales en 2029) subirían el ROIC del grupo hacia el 7 %, todavía lejos de los 5 puntos sobre el WACC que pide el método [A7]. El ROE del 10,4 % se apoya en la deuda.',
      confianza: 'Media',
    },
    esg: {
      calificaciones: [
        { agencia: 'MSCI ESG', calificacion: 'AA', fecha: '2025-12' },
        { agencia: 'CDP (clima)', calificacion: 'A', fecha: '2025-12' },
        { agencia: 'Sustainalytics', calificacion: 'Riesgo bajo (17,2)', fecha: '2025-12' },
        { agencia: 'EcoVadis', calificacion: 'Platino (86/100)', fecha: '2025-12' },
      ],
      materialidad: 'Lo material es la seguridad y disponibilidad de la red (infraestructura crítica de Suiza, servicio universal hasta 2031), la ciberseguridad y la protección de datos, el consumo eléctrico de redes y centros de datos (objetivo de cero emisiones netas en 2035), y el trato a clientes y empleados en la integración italiana (−4,6 % de plantilla en Suiza en el último año) [A1, A11].',
      controversias: 'Procedimientos de la COMCO sobre la construcción de la fibra (la multa de 18,4 M CHF fue anulada en octubre de 2026; quedan otros abiertos) y caídas de la red de emergencias en años anteriores [D13, A1]. En Italia, investigación de la AGCM sobre el acuerdo de torres y red con TIM [D14].',
      confianza: 'Media',
    },
  },
  parches: [],
  huecos_resueltos: [],
  dcf_justificacion: {
    crecimiento: '2026e (−2,2 %, fijo) en la guía de 14.700-14.900 M y en el consenso (14.714 M): el euro más débil resta un punto, Italia pierde el operador virtual de PosteMobile y los precios bajan en Suiza [A7, D3]. 2027e-2028e planos (−0,4 % y 0,0 %), como el consenso (14.640 y 14.644 M) [D3]. Después, +0,2-0,5 %: Suiza estable y algo de precio en Italia tras la consolidación. Sin crecimiento real: es una empresa madura.',
    margenes: 'Margen EBITDAaL del 34,6 % en 2026e (5.092 M; guía 5.000-5.100, consenso 5.079) que sube al 35,8 % en 2029e por las sinergias de Vodafone Italia (≈ 600 M EUR anuales en 2029, más de 300 M en 2026) menos la erosión de precios [A7, D3]. El consenso llega al 36,1 % en 2029: nuestro margen final queda algo por debajo, porque Suiza pierde ≈ 30 M de EBITDAaL al año [D3].',
    inversion: 'Inversión del 20,6 % de las ventas en 2026e (guía 3.000-3.100 M) que baja al 19,2-19,6 % cuando termina la integración y el despliegue de fibra (consenso 2.841 M en 2028) [A7, D3]. Amortización sin derechos de uso del 21,8 % al 19,6 % (21,0 % en 2025 y ≈ 22 % en el 1S26), igual a la inversión al final. Circulante del 2 % de las ventas, el de 2025.',
    wacc: 'Tasa libre del 0,6 % (bono de la Confederación a 10 años, 0,586 % el 30-sep-2026 [D4]); beta de 0,70, por encima de las medidas (0,46 mensual a 5 años; 0,64 ajustada [D1]) porque el negocio italiano es más arriesgado; prima del 5,5 % más 0,8 puntos por la exposición a Italia (45 % de las ventas); coste de la deuda del 2,0 % antes de impuestos (1,85 % medio hoy, 3,1-3,6 % en las emisiones en euros) [A4]; peso de la deuda del 26 % (deuda financiera de 13.021 M frente a 34.811 M de capitalización). WACC del 4,31 %, cerca del 3,89 % de la prueba de deterioro de Suiza y por debajo del 5,51 % de Italia [A1].',
    terminal: 'Crecimiento a perpetuidad del 0,5 %, entre el 0 % que usa la empresa para Suiza y el 2 % de Italia en sus pruebas de deterioro, y por debajo de la inflación suiza esperada (≈ 0,5-1 %) [A1]. Queda casi igual que la tasa libre (0,6 %): con tipos suizos tan bajos la regla habitual (g por debajo de la tasa libre menos medio punto) daría un 0,1 %, y con g del 0 % el DCF bajaría a 644 CHF. El múltiplo implícito de salida es de 9,8 veces el EBITDAaL, cerca de las compras europeas (media de 10,6) [D11].',
  },
  puente_comentarios: {
    '2026e': 'Volumen −0,5 % (PosteMobile, banda ancha suiza −2 %), precio −0,7 % (marcas baratas en Suiza, Italia) y −1,0 % de tipo de cambio (euro): guía de 14.700-14.900 M [A7, A4].',
    '2027e': 'Volumen y precio −0,2 % cada uno: Suiza sigue cediendo y Italia se estabiliza; consenso −0,5 % [D3].',
    '2028e': 'Plano: igual que el consenso (14.644 M) [D3].',
    '2029e': 'Volumen +0,2 % (TI y nube para empresas, 5G autónomo).',
    '2030e': 'Volumen +0,3 % y precio +0,2 % (Italia más ordenada tras la consolidación).',
  },
  veredicto: 'Sí',
  sostenibilidad_justificacion: 'El crecimiento proyectado es de −0,1 % anual de media (2026e-2032e), frente a un 7,7 % histórico que es todo de la compra de Vodafone Italia; en perímetro constante las ventas bajaron un 2,0 % en 2025 [A1]. No hace falta capital nuevo: la inversión es la de mantenimiento y la reinversión neta acumulada es negativa (la amortización supera a la inversión mientras termina la integración). Lo que hay que creer es el margen, no el crecimiento: las sinergias ya van por delante del plan (166 M EUR en el 1S26) [A7]. Riesgo a la baja: que la erosión de precios en Suiza y en Italia se coma las sinergias (el bajista).',
  dcf_lectura: 'El DCF da 737,65 CHF por acción, un 9,8 % sobre el precio, con un WACC del 4,31 % y un valor terminal que pesa el 79 %. Es muy sensible a la tasa: con medio punto más de WACC baja a 624,77 y con medio punto menos sube a 884,73; con crecimiento a perpetuidad del 0 %, 644,31. El DCF inverso dice que el precio descuenta un −1,1 % anual de crecimiento con nuestro margen, frente al +0,2 % de nuestro base: el mercado pide algo menos de lo que proyectamos. La rentabilidad implícita en el precio es del 4,6 % anual, apenas por encima del WACC: precio justo, sin margen de seguridad.',
  narrativas: {
    Bajista: 'Iliad y los virtuales siguen bajando precios en Italia, la AGCM bloquea o condiciona el acuerdo con TIM, Suiza pierde un 1-2 % de ventas al año por las marcas baratas y la regulación de la fibra, y las sinergias no compensan: un punto menos de crecimiento, 1,5 puntos menos de margen y WACC 0,3 puntos más alto.',
    Base: 'Ventas planas, margen EBITDAaL del 34,6 % al 35,8 % por las sinergias de Vodafone Italia, inversión que baja al 19,4 % de las ventas y dividendo de 27-29 CHF.',
    Alcista: 'La consolidación italiana ordena precios, el acuerdo de torres con TIM ahorra costes y libera caja, y la TI e IA para empresas suizas crece: medio punto más de crecimiento y 0,8 puntos más de margen.',
  },
  escenarios_comentario: 'La asimetría es desfavorable: el alcista vale 813,30 CHF (+21,0 %) y el bajista 472,62 (−29,7 %), 0,71 veces. Con un WACC del 4,3 % y el valor terminal en el 79 %, un punto y medio de margen mueve el valor un 36 %; el precio solo está cubierto en el caso base.',
  suma_partes_comentario: 'No se aplica: Suiza (3.362 M de EBITDAaL en 2025, margen del 43 %) e Italia (1.580 M, 23 %) se podrían valorar por separado, pero la Confederación debe conservar la mayoría del conjunto y no hay intención de vender Italia; la venta de torres en Italia (acuerdo con TIM) es la única separación de activos en marcha [A1, D3].',
  casos_12m: {
    Bajista: 'Ventas un punto por debajo en 2028e y margen EBITDAaL 1,5 puntos menor (33,9 %) por precios en Italia y Suiza: BPA de 25,91 CHF en 2028e (−13 % frente al base) y el PER vuelve a su mínimo de cinco años (15,3 veces, el de final de 2022).',
    Base: 'Ventas de 14.717 M en 2026e y planas hasta 2028e, margen EBITDAaL del 35,4 % en 2028e (5.189 M; consenso 5.223), amortización del 21,0 %, resultado financiero de −235 M, impuesto del 18 % y 51,80 M de acciones: BPA de 29,69 CHF (+6,5 % anual desde los 24,54 de 2025).',
    Alcista: 'Medio punto más de crecimiento y 0,8 puntos más de margen por las sinergias y el acuerdo de torres: BPA de 31,73 CHF; la regla no da más PER que el base porque la historia (mediana de 17,0 veces) y los comparables (13,3) están por debajo.',
  },
  diferencia_consenso: 'Nuestro BPA queda un 3-5 % por debajo del consenso que recopila la empresa: 25,78 frente a 26,64 CHF en 2026e, 27,45 frente a 28,46 en 2027e y 29,69 frente a 31,20 en 2028e [D3]. El EBITDAaL es casi el mismo (5.189 frente a 5.223 M en 2028e); la diferencia está debajo: mantenemos un resultado financiero de −235/−255 M (el ritmo del 1S26, con la deuda nueva en euros al 3,1-3,6 %) frente a ≈ −210 M implícitos en el consenso, y una amortización algo mayor [A4]. Yahoo da 28,25 y 31,22 CHF para 2026-2027 con 11 analistas, más alto aún [D2].',
  objetivo_comentario: 'El objetivo a 12 meses (611,60 CHF, ponderado) queda un 9,0 % bajo el precio (−5,1 % con el dividendo de 27 CHF) y el base (668,03 CHF) da un +3,3 % con dividendo. El PER de la regla para el base es de 22,5 veces: el actual (24,8) no puede bajar más de un 10 % en un año aunque la mediana de cinco años sea de 17,0. El bajista (15,3 veces × 25,91 = 396,42 CHF, −37 %) pesa mucho porque la historia adelantada de Swisscom fue de 13,5-17,6 veces antes de comprar Vodafone Italia. Los analistas esperan menos aún (575,76 CHF de media).',
  valoracion_comentario: 'Pesos: DCF 50 %, escenarios 40 % y comparables 10 %; transacciones 0 % (la Confederación no puede vender el control). El DCF manda porque es un negocio estable de flujos predecibles, pero con tipos suizos casi nulos el valor depende de la tasa: con la prima implícita del mercado (4,2 %, WACC 3,6 %) el valor sube a 863,33 CHF. Los comparables (PER de 13,3 veces) dan solo 373,75 CHF: las telecos europeas cotizan con tipos de interés más altos y peor calidad, y por eso pesan poco. Valor intrínseco ponderado: 682,32 CHF, un 1,5 % sobre el precio.',
  catalizadores: {
    items: [
      { fecha: '2026-11-05', evento: 'Resultados del 3T26', efecto: 'EBITDAaL del trimestre frente a 1.291 M del consenso; avance de sinergias y de las ventas italianas', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2026-12', evento: 'Acuerdo definitivo de torres con TIM (≈ 6.000 emplazamientos)', efecto: 'Ahorros en Italia; +0,3 veces de deuda / EBITDA según la empresa', probabilidad: 'Media', sentido: '+/−' },
      { fecha: '2027-01-01', evento: 'Nuevo consejero delegado y director financiero de Swisscom Suiza (Wierzbitzki, Stettler)', efecto: 'Separación de la gestión de Suiza y del grupo', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2027-02-11', evento: 'Resultados de 2026 y guía de 2027; dividendo de 27 CHF', efecto: 'La guía de 2027 frente al consenso (EBITDAaL 5.092 M); posible dividendo de 28 CHF por 2027', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2027-04', evento: 'Decisión de la AGCM sobre el acuerdo de torres y red con TIM', efecto: 'Condiciones o bloqueo de las sinergias de red en Italia', probabilidad: 'Media', sentido: '+/−' },
      { fecha: '2028', evento: 'Fin del contrato exclusivo con INWIT (modelo de varios proveedores)', efecto: 'Ahorro en alquiler de torres en Italia', probabilidad: 'Media', sentido: '+' },
      { fecha: 'Continuo', evento: 'Tipos de interés del Banco Nacional Suizo', efecto: 'La acción se mueve como un bono: bajadas de tipos la suben', probabilidad: 'Media', sentido: '+/−' },
    ],
    confianza: 'Media',
  },
  riesgos: {
    items: [
      { riesgo: 'Múltiplo: 24,8 veces el BPA de los próximos 12 meses frente a una mediana adelantada de cinco años de 17,0 y a 13,3 de las telecos europeas', tipo: 'Valoración', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−20 a −35 % si el PER vuelve a 16-18 veces', mitigante: 'Tipos suizos del 0,6 % y dividendo del 4 % sostienen el múltiplo', senal: 'Subidas de tipos en Suiza o recortes del dividendo' },
      { riesgo: 'Competencia en Italia: Iliad y los virtuales bajan precios; pérdida de PosteMobile (−20 % de líneas mayoristas); ventas italianas −3,3 % en el 1S26', tipo: 'Competencia', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: '−5 a −10 % (bajista)', mitigante: 'Sinergias de ≈ 600 M EUR anuales en 2029; primer operador móvil del país', senal: 'EBITDAaL de Italia por debajo de 1.800 M EUR en 2026' },
      { riesgo: 'Regulación de precios en Suiza: Supervisor de Precios (fibra oscura a 24 CHF/mes), COMCO, servicio universal', tipo: 'Regulación', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−3 a −5 %', mitigante: 'Acuerdo de octubre de 2026 por dos años; multa de la fibra anulada', senal: 'Nuevas decisiones de la COMCO o del Supervisor de Precios sobre tarifas mayoristas' },
      { riesgo: 'Deuda tras Vodafone Italia: 13.021 M de deuda financiera (15.935 M con arrendamientos), 2,4 veces el EBITDA con tope de 2,4 del Consejo Federal; la nueva en euros cuesta un 3,1-3,6 %', tipo: 'Financiero', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−3 a −5 %', mitigante: 'Rating A, 94-95 % a tipo fijo, vida media de 5,5 años, líneas de 2.900 M sin usar', senal: 'Deuda / EBITDA por encima de 2,4 veces o rebaja de rating' },
      { riesgo: 'Deterioro del fondo de comercio de Italia (1.893 M; prueba con crecimiento del 2 % a perpetuidad)', tipo: 'Contable', probabilidad: 'Baja', impacto: 'Bajo', efecto_valor: 'Sin caja; −1 a −2 % por la señal', mitigante: 'Sinergias por delante del plan', senal: 'Ventas italianas que siguen cayendo en 2027' },
      { riesgo: 'Accionista de control público (Confederación, 50,95 %)', tipo: 'Gobierno', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: 'Limita el alcista', mitigante: 'Estabilidad, rating y dividendo protegidos', senal: 'Objetivos estratégicos que pidan más inversión en Suiza o menos dividendo' },
      { riesgo: 'Riesgo de IA: automatización de los servicios de TI a empresas y competencia de los grandes de la nube', tipo: 'Tecnología', probabilidad: 'Baja', impacto: 'Bajo', efecto_valor: '±3 % a 3-5 años', mitigante: 'La conectividad física no se sustituye; plataforma de IA soberana suiza', senal: 'Caída de las ventas de TI (2.005 M en 2025) por encima del 5 % anual' },
    ],
    premortem: 'Octubre de 2027: la acción ha perdido un 30 %. Los resultados no fueron malos (EBITDAaL en la guía), pero el Banco Nacional Suizo subió tipos con la inflación, el bono a 10 años pasó del 0,6 % al 1,5 % y los inversores de dividendo se fueron a la renta fija; a la vez, la AGCM condicionó el acuerdo con TIM, Italia volvió a caer un 3 % y el mercado dejó de pagar 24 veces por un negocio que no crece. El PER volvió a 17 veces, su media de antes de Vodafone Italia.',
    ia: {
      exposicion: 'Baja', sentido: 'Mixto', efecto_valor: '±3 % a 3-5 años',
      comentario: 'La IA no sustituye lo que da el 85 % de las ventas: la conectividad física (fibra, móvil, red) que, al contrario, más tráfico de IA hace más necesaria. Riesgo moderado en la parte de servicios de TI a empresas suizas (2.005 M CHF en 2025): la IA automatiza integración y soporte, y los grandes de la nube compiten en IA y datos. A favor: atención al cliente y operación de red más baratas (plantilla suiza −4,6 % en un año) y venta de IA «soberana» a empresas y administración suizas que no quieren datos fuera del país [A1, A11]. Conclusión: riesgo bajo, más oportunidad de coste que amenaza de ingresos.',
    },
    confianza: 'Media',
  },
  preguntas: {
    items: [
      { tema: 'Italia', pregunta: '¿Cuándo se estabilizan las ventas italianas (−3,3 % en el 1S26) y cuánto de la caída es PosteMobile frente a precios?', por_que: 'Las sinergias solo suben el BPA si las ventas dejan de caer.' },
      { tema: 'Sinergias', pregunta: '¿Cuánto de los ≈ 600 M EUR de sinergias en 2029 es coste ya asegurado y cuánto depende del acuerdo con TIM y de INWIT?', por_que: 'Es la diferencia entre nuestro margen y el del consenso.' },
      { tema: 'Torres', pregunta: '¿Cuánta caja y cuánta deuda añade el acuerdo de torres con TIM, y qué pasa si la AGCM lo condiciona?', por_que: '+0,3 veces de deuda con el tope del Consejo Federal en 2,4.' },
      { tema: 'Dividendo', pregunta: '¿Puede subir el dividendo por encima de 27 CHF con un flujo libre de ≈ 1.500-1.700 M y 1.400 M de dividendo?', por_que: 'Es lo que sostiene el múltiplo.' },
      { tema: 'Suiza', pregunta: '¿Hasta dónde llega la caída de clientes de banda ancha (−2,1 % anual) y de la TI para empresas?', por_que: 'Suiza es el 68 % del EBITDAaL.' },
      { tema: 'Inversión', pregunta: '¿Cuánto baja la inversión tras 2027 (fibra al 60-80 % y 5G autónomo)?', por_que: 'Cada punto de ventas son ≈ 150 M de flujo libre.' },
    ],
    confianza: 'Media',
  },
  resumen: {
    recomendacion: 'Mantener', conviccion: 'Baja', justificacion_recomendacion: null, horizonte: '12 meses',
    sintesis: `**La recomendación y por qué.** Mantener, con convicción baja; no es compra. El objetivo a 12 meses es de 611,60 CHF (nuestro BPA de 2028e × el PER de la regla común), un −5,1 % de rentabilidad ponderada con el dividendo y un +3,3 % en el caso base; el valor intrínseco (682,32 CHF) está apenas un 1,5 % sobre el precio de 672,00 CHF (cierre del 19-oct-2026; a las 10:49 de Zúrich del 20-oct seguía en 672). Tampoco pasa la calidad: el ROIC (6,0 %) supera al WACC (4,31 %) en solo 1,7 puntos, frente a los 5 que pide el método. La convicción es baja porque el valor depende casi solo de la tasa de descuento: con la prima implícita del mercado (WACC del 3,6 %) el valor sube a 863,33 CHF y la regla relativa diría Comprar, mientras que con medio punto más de WACC el DCF cae a 624,77. Subiría con dos semestres de ventas italianas estables y sinergias en plan; bajaría con una subida de los tipos suizos o un recorte de la guía.

**El negocio.** Primer operador de Suiza (51 % de los contratos móviles, 46 % de la banda ancha) y, desde 2025, con Fastweb + Vodafone, primero en móvil en Italia [B1, B2]. Ventas de 15.048 M CHF y EBITDAaL de 4.984 M en 2025; Suiza gana el 43 % de margen e Italia el 23 % [A1].

**Finanzas.** Ventas planas en Suiza desde hace años; la compra de Vodafone Italia (7.454 M CHF) subió las ventas un 37 % pero bajó el BPA de 33,03 CHF (2023) a 24,54 (2025) por la amortización de lo comprado, los intereses y la integración [A1]. En el 1S26 el EBITDAaL sube un 3,4 % con las sinergias aunque las ventas bajen un 3,0 % [A4]. Deuda financiera de 13.021 M (2,4 veces el EBITDA con arrendamientos, el tope que fija el Consejo Federal), con un coste medio del 1,85 % y rating A [A4, A1]. El dividendo (26 CHF; 27 por 2026) se lleva casi todo el flujo libre.

**Equipo y gobierno.** La Confederación tiene el 50,95 % por ley: no puede haber oferta, el voto del resto está limitado al 5 % y el Consejo Federal fija deuda máxima y prohíbe compras grandes fuera [C1, C5]. Equipo prudente que cumple su guía; el variable no mira el ROIC.

**Valoración.** El DCF da 737,65 CHF (+9,8 %) con un WACC del 4,31 % y un valor terminal del 79 %; medio punto más de WACC lo baja a 624,77. El DCF inverso descuenta un −1,1 % de crecimiento anual frente al +0,2 % del base. La regla a 12 meses lleva el PER de 24,8 a 22,5 veces (la mediana de cinco años es de 17,0 y la de las telecos europeas de 13,3) y nuestro BPA de 2028e (29,69 CHF) queda un 5 % bajo el consenso.

**Riesgos y catalizadores.** El mayor riesgo es el múltiplo con tipos suizos que suban; después, la competencia en Italia, la regulación de precios en Suiza y la deuda de la compra. El riesgo de IA es bajo (más ahorro de costes que amenaza). Catalizadores: 3T26 el 5-nov, guía de 2027 el 11-feb-2027 y decisión de la AGCM sobre las torres hacia abril de 2027.

**Qué cambiaría la decisión.** El precio que daría la rentabilidad de compra es 554,44 CHF, pero ni así sería compra para la cartera: falla la calidad (ROIC − WACC de 1,7 puntos). Vender por encima de 708,45 CHF.`,
    tesis: 'Swisscom es un bono con dividendo: un negocio suizo de red que no crece, con un margen del 43 % y una mayoría pública que garantiza estabilidad, más un negocio italiano comprado barato pero en un mercado de precios a la baja. A 672 CHF el precio paga 24,8 veces el beneficio de los próximos 12 meses porque los tipos suizos están en el 0,6 %; el DCF lo justifica a duras penas y la historia y los comparables no.',
    vision_diferencial: {
      mercado_descuenta: 'Que el dividendo de 27 CHF es seguro y que con tipos suizos casi nulos un 4 % de rentabilidad vale 24 veces el beneficio; los analistas, sin embargo, son vendedores (0 % comprar) con un objetivo medio de 575,76 CHF.',
      nuestra_vision: 'Coincidimos en que el dividendo es seguro y el negocio estable; discrepamos en el precio: con un ROIC del 6 % y crecimiento nulo, el valor depende de la tasa de descuento, no del negocio.',
      por_que: 'Antes de comprar Vodafone Italia, Swisscom cotizó a 13,5-17,6 veces el BPA adelantado durante una década de tipos aún más bajos; la compra subió la deuda y bajó el ROIC sin dar crecimiento.',
    },
    a_favor: [
      '**Red líder en Suiza**: 51 % de los contratos móviles y margen EBITDAaL del 43 %.',
      '**Sinergias en Italia**: 166 M EUR en el 1S26; ≈ 600 M anuales en 2029.',
      '**Dividendo**: 26 CHF (27 por 2026), ≈ 4 % de rentabilidad.',
      '**Balance de calidad**: rating A, deuda al 1,85 % y 94-95 % a tipo fijo.',
      '**Riesgo bajo**: beta de 0,46 y volatilidad del 18 %.',
    ],
    en_contra: [
      '**Caro**: 24,8 veces el BPA de los próximos 12 meses frente a 17,0 de su mediana y 13,3 de las telecos europeas.',
      '**Calidad insuficiente**: ROIC del 6,0 % frente a un WACC del 4,3 %.',
      '**Sin crecimiento**: ventas planas; Italia cae un 3 %.',
      '**Deuda en el tope**: 2,4 veces el EBITDA, el límite del Consejo Federal.',
      '**Analistas vendedores**: 0 % comprar; objetivo medio de 575,76 CHF.',
    ],
    que_vigilar: 'La tesis depende de que las sinergias italianas compensen la caída de precios en Italia y en Suiza y de que los tipos suizos sigan bajos. La señal en contra sería un EBITDAaL de Italia por debajo de 1.800 M EUR o una guía de 2027 que no suba el dividendo.',
    cambiaria_recomendacion: [
      'Precio por debajo de 554,44 CHF: la rentabilidad sería de compra, pero la calidad (ROIC − WACC ≥ 5) seguiría fallando: no apta para la cartera.',
      'Precio entre 554,44 y 708,45 CHF: Mantener.',
      'Precio por encima de 708,45 CHF: Vender.',
      'Sinergias y ventas italianas que suban el ROIC por encima del 8 %: revisar la calidad.',
      'Subida de tipos en Suiza (bono a 10 años por encima del 1,2 %): reforzar Vender.',
    ],
    kpis_seguimiento: [
      { kpi: 'EBITDAaL del grupo', nivel_actual: '2.557 M (1S26); guía 5.000-5.100', umbral_alerta: '< 5.000 M en 2026', por_que: 'Base del BPA.' },
      { kpi: 'EBITDAaL de Italia', nivel_actual: '913 M EUR (1S26); guía 1.800-1.900', umbral_alerta: '< 1.800 M EUR', por_que: 'Mide las sinergias.' },
      { kpi: 'Ventas de Italia', nivel_actual: '−3,3 % (1S26)', umbral_alerta: '< −4 %', por_que: 'Competencia de precios.' },
      { kpi: 'Deuda neta / EBITDA', nivel_actual: '2,4 veces', umbral_alerta: '> 2,4 veces', por_que: 'Tope del Consejo Federal.' },
      { kpi: 'Bono de la Confederación a 10 años', nivel_actual: '0,59 %', umbral_alerta: '> 1,2 %', por_que: 'Sostiene el múltiplo.' },
    ],
  },
};
