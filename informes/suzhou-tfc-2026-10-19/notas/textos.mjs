// Textos del analista (Suzhou TFC Optical, corte 2026-10-19). Citas con la letra de la nota ([A4] = fuente 4 de A.json; [P1] propia).
export default {
  limitaciones: 'Cifras en millones de CNY, ejercicio a 31 de diciembre, normas contables chinas (CAS). El último periodo publicado es el 1S26 (30-jun-2026): el LTM es 2S25 + 1S26. Los resultados del 3T26 se publican el 29-oct-2026, diez días después del corte, y no están en el informe [D11]. Precio: cierre del 19-oct-2026 en Shenzhen (203,30 CNY, −4,46 % en el día; sello de la cotización 16:14 de Pekín [D2]); Yahoo aún no tenía la barra diaria del 19-oct, por lo que las rentabilidades de la sección de bolsa y las cifras de movimiento.mjs llegan hasta el cierre del 16-oct (212,80). Las acciones y el BPA están en la base de hoy (1.090,8 M de acciones tras la ampliación liberada de junio de 2026, 4 por cada 10): el BPA histórico publicado se divide por 1,4 por cada ampliación posterior. Los clientes del folleto H están anonimizados (A-E); que el A sea Fabrinet (fabricante para Nvidia) es una deducción por su descripción. La acción A de ChiNext NO la puede comprar un particular desde IBKR: está en la lista de Stock Connect, pero ChiNext en el sentido norte está limitado a inversores profesionales institucionales [P2]. Precio de una acción en EUR: ≈ 27 EUR (≈ 7,5 CNY por EUR).',
  controles_explicados: [
    { control: 'DCF inverso calculable', explicacion: 'No hay crecimiento en un rango razonable que lleve el DCF a 203,30 CNY con nuestro margen a largo plazo (40 %) y un WACC del 10,9 %: aun con el escenario alcista (consenso de 2027-2028) el valor es de 52,58 CNY. El motor da la rentabilidad implícita: el precio supone un 3,0 % anual con nuestros flujos, por debajo de la tasa libre más la prima. Para justificar el precio con un WACC del 10,9 % harían falta ventas de ≈ 60.000 M CNY sostenidas con un 45 % de margen (≈ 40 % de un mercado de componentes de 152.730 M en 2030 [B1]), que no es un supuesto razonable.' },
    { control: 'Caja proyectada coherente con la histórica', explicacion: 'El flujo libre medio de 2026e-2028e (≈ 3.037 M) triplica la media real de 2023-2025 (984 M) porque las ventas proyectadas se duplican y media (de 5.163 M a 13.653 M) con un margen EBITDA del 48-51 % (53,6 % en el 1S26 [A2]) y el capex baja del 8-11 % al 7 % de las ventas. El flujo operativo ya convierte bien: 1.868 M en 2025 (93 % del beneficio) y 1.001 M en el 1S26 (83 %) [A4]. El salto es crecimiento, no un supuesto de conversión.' },
    { control: 'Crecimiento del BPA base ≤ 25 % anual desde el último real', explicacion: 'El BPA base de 2028e (4,74 CNY) crece un 36,8 % anual desde 1,85 (2025) porque las ventas proyectadas crecen un 38 % anual en 2026-2028 (de 5.163 M a 13.653 M), por debajo del 58 % anual de 2023-2025 y del consenso (20.827 M en 2028e, BPA 7,90) [D3]. Es el supuesto que más pesa en el objetivo y el más expuesto al ciclo de inversión en IA: por eso el bajista recoge un año de caída (−10 % de ventas en 2028e) y la confianza es baja.' },
    { control: 'Circulante del primer año de proyección ≈ último real', explicacion: 'Supuesto del 19 % de las ventas frente al 18,2 % de 2025 [A4]; en el 1S26 subió (existencias de 929 M, el doble que en diciembre, por acopio de chips y pedidos; clientes de 1.452 M) y el 19 % es prudente.' },
  ],
  huecos: [],
  secciones: {
    historia: {
      resumen: 'TFC nace en 2005 en Suzhou, fundada por Zou Zhinong y Zhu Guodong para fabricar piezas cerámicas y componentes pasivos para la fibra óptica de telecomunicaciones [C1]. Sale a bolsa en ChiNext en febrero de 2015 y durante 2015-2022 crece despacio con las redes chinas (4G, 5G): ventas de 338 M CNY en 2017 y 1.196 M en 2022 [A4]. Desde 2018 dirige el negocio Ou Yang y la empresa se reorienta a los centros de datos y a los clientes extranjeros; la relación con el que hoy es su primer cliente empieza en 2018 [A7]. La IA cambia la escala: con los motores ópticos de 800G para el cliente A, las ventas pasan de 1.939 M en 2023 a 5.163 M en 2025 y el beneficio de 730 M a 2.017 M [A4]. En 2024-2026 abre fábrica en Tailandia, traslada la sede de las operaciones exteriores a Singapur y pide la salida a bolsa en Hong Kong [A7, D7]. La lección: el negocio de siempre (pasivos de precisión con margen alto) es el que sostiene el valor; el crecimiento de 2023-2026 depende de un cliente y de un ciclo.',
      hitos: [
        { anio: '2005', hito: 'Zou Zhinong y Zhu Guodong fundan TFC en Suzhou (componentes pasivos para fibra óptica) [C1].' },
        { anio: '2015', hito: 'Salida a bolsa en ChiNext (Shenzhen), código 300394.' },
        { anio: '2018', hito: 'Ou Yang, directora general; empieza la relación con el que hoy es el cliente A (64 % de las ventas) [A7].' },
        { anio: '2023', hito: 'Arrancan los motores ópticos de 800G para centros de datos de IA: ventas +62 %, beneficio +81 % [A4].' },
        { anio: '2024-2025', hito: 'Ventas de 3.252 M y 5.163 M; fábrica en Tailandia; los cinco primeros clientes llegan al 90,6 % [A1, A7].' },
        { anio: '2026', hito: 'Solicitud de acciones H en Hong Kong (10-abr); escasez de chips EML frena los motores (1S26 +15 %); máximo de 375 CNY el 3-jun y caída del 54 %; cambio de auditor a EY; propuesta de recompra (15-oct) [A2, A10, C5, D7].' },
      ],
      confianza: 'Media',
    },
    rentabilidad: {
      comentario: 'El ROIC del motor (99,9 % en 2025, 92,0 % en 2024, 28-35 % en 2018-2022) es real y excepcional: el capital invertido sin la caja es pequeño (1.985 M en 2025: inmovilizado de 1.318 M y circulante) porque los componentes pasivos se fabrican con poco capital y un margen bruto del 64-72 % [A1, A2]. Frente a un WACC del 10,9 %, la diferencia es de ≈ 89 puntos en 2025 y de más de 15 puntos en todos los años desde 2018. El ROE (42,5 %) es menor por la caja (3.178 M a junio). Lo que hay que preguntarse no es la rentabilidad sino su duración: el salto de 2023-2025 viene de los motores activos para un solo cliente, con un margen bruto del 47 % que la escasez de chips y la negociación con ese cliente pueden bajar. Los fabricantes de módulos (Innolight, Eoptolink) ganan un 41 % de margen EBITDA con mucho más capital [B3].',
      confianza: 'Media',
    },
    esg: {
      calificaciones: [],
      materialidad: 'Lo material para TFC es la concentración y la cadena de suministro más que las emisiones: depende de chips láser importados (EML de 200G de proveedores japoneses y estadounidenses, cuya escasez frenó los motores en el 1S26) y de un cliente que vende a Nvidia, en medio de los controles de exportación entre EE. UU. y China [A2, B2]. China controla desde 2023 la exportación de galio y germanio [B2]. Las fábricas (Jiangxi y Tailandia) consumen sobre todo electricidad y no publica una huella de carbono comparable. Lo social es la plantilla (5.127 personas) y la seguridad en el trabajo de precisión, sin incidentes publicados [A1].',
      controversias: 'Sin sanciones ni litigios relevantes publicados en los últimos tres años [A1, A2]. Gobierno: cambio de auditor en agosto de 2026 tras 16 años (a EY Hua Ming, por la salida a Hong Kong y sin desacuerdos declarados) [A10]; venta del accionista de control por subasta en noviembre de 2025 (421,5 M CNY a 140 CNY) [C3] y de directivos en enero de 2026 [C4]. Calificaciones de MSCI, Sustainalytics o CDP no encontradas en fuentes abiertas.',
      confianza: 'Baja',
    },
  },
  parches: [],
  huecos_resueltos: [],
  dcf_justificacion: {
    crecimiento: '2026e fijo en 7.000 M (+35,6 %): 1S26 de 2.827,9 M (+15,2 %) [A2] y un 2S26 de 4.172 M (+54 %), con los pasivos al ritmo del 1S26 (+77 %) y los motores activos recuperándose al mejorar la oferta de chips desde el 3T-4T, como dijo la empresa [D13]. El consenso (8.664 M) exige un 2S26 de 5.836 M, el doble del 1S26 [D3]. Después +50 % en 2027e (1,6T y CPO), +30 % en 2028e y +10 % en 2029e, y una meseta en 2030e (0 %): el capex en IA no crece para siempre y tras tres años fuertes llega una digestión. Las ventas de 2030e (15.018 M) son el 9,8 % del mercado de componentes de Frost & Sullivan, menos que la cuota de 2025 (11,7 %) [B1].',
    margenes: 'Margen EBITDA del 51 % en 2026e (53,6 % en el 1S26 con una mezcla anómala: pasivos al 71,9 % de margen bruto y activos a la baja [A2]) que baja al 40 % en 2031e, el nivel de 2019-2022 antes de la IA [A4]: más motores activos (47 % de margen bruto), bajada de precios por generación (−6 a −8 % al año en el puente) y competencia de Innolight y Eoptolink, que integran sus propios componentes [B3]. Incluye ≈ 1 % de las ventas de subvenciones y otros ingresos (51 M en 2025, 31 M en el 1S26) [A4].',
    inversion: 'Capex del 10 % de las ventas en 2026e (10,9 % en el 1S26 por Tailandia y Jiangxi [A4]) que baja al 4,5 %, y amortización del 3,7 % al 4,4 %. Circulante del 19 % de las ventas (18,2 % en 2025). Sin compras.',
    wacc: 'Sin deuda financiera: WACC = coste del capital. Tasa libre del 1,65 % (bono del Estado chino a 10 años, 1,6497 % [D5]), beta de 1,5 (mensual a 5 años ajustada; la semanal de 2 años es 3,4 y la sin ajustar 1,74 [D1]), prima del 5,5 % y un punto adicional por la concentración (64 % de las ventas en un cliente) y los controles de exportación: 10,9 %. Con la prima implícita del mercado (4,2 % [D6]) el coste baja al 8,95 % y el DCF sube a 52,43 CNY.',
    terminal: 'Crecimiento a perpetuidad del 1,0 %: por debajo de la tasa libre china, porque los componentes ópticos cambian de generación cada 2-3 años y el líder de hoy no tiene asegurado el de mañana. El valor terminal pesa el 52 %.',
  },
  puente_comentarios: {
    '2026e': 'Volumen de pasivos para 800G/1,6T y recuperación parcial de los motores en el 2S26 [A2, D13]; precio por generación −6 %; Tailandia suma capacidad.',
    '2027e': 'Rampa del 1,6T y primeros componentes para óptica coempaquetada (CPO) [B6]; precio −8 %.',
    '2028e': 'Volumen del 38 % y precio −8 %: la demanda sigue al capex de IA (913,7 bn USD en 2030 según Frost & Sullivan [B1]).',
    '2029e': 'Volumen del 18 %: el capex de IA se modera; precio −8 %.',
    '2030e': 'Meseta (0 %): digestión de la inversión en IA tras tres años fuertes; el volumen del 8 % solo compensa la bajada de precio.',
  },
  veredicto: 'En parte',
  sostenibilidad_justificacion: 'Las tres pruebas del motor pasan: la proyección casi no necesita capital (reinversión del 12 % del NOPAT), el ROIC incremental histórico (125 %) sobra y la cuota final (9,8 % en 2030e) es menor que la actual (11,7 %) [B1]. La calidad sí sostiene el crecimiento en lo que depende de la empresa: margen bruto de los pasivos del 64-72 %, ROIC de ≈ 100 % y primera en componentes con 2,3 veces la cuota de la segunda [B1, A2]. Pero el crecimiento no lo decide la empresa: el 64 % de las ventas va a un cliente y casi todo a un ciclo (capex de IA) que tiene picos; el 1S26 (+15 %) muestra que la oferta de chips y el cliente marcan el ritmo [A2, A7]. Por eso «En parte», y el base ya incluye una meseta en 2030e.',
  dcf_lectura: 'El DCF da 42,86 CNY por acción, un 78,9 % bajo el precio, con un WACC del 10,9 % y un valor terminal que pesa el 52 %; con la prima implícita del mercado, 52,43. No hay crecimiento razonable que lleve el DCF al precio: con nuestros flujos, el precio supone una rentabilidad del 3,0 % anual. El precio descuenta que TFC sigue creciendo más del 30 % al año varios años más con márgenes del 50 %, es decir, que el ciclo de IA no tiene pico en esta década.',
  narrativas: {
    Bajista: 'Digestión del capex de IA en 2028 (como la de las telecomunicaciones en 2019 y 2022): ventas +35 % en 2027e y −10 % en 2028e, margen 5-8 puntos menor por precios y por la integración de componentes en los fabricantes de módulos; WACC un punto mayor.',
    Base: 'Crecimiento del 35-50 % en 2026-2027 con 1,6T, meseta en 2030 y margen que vuelve al 40 % de antes de la IA; el primer cliente se mantiene.',
    Alcista: 'Ciclo más largo, 1,6T y CPO más rápidos (consenso): +60 % en 2027e y +45 % en 2028e, dos puntos más de margen.',
  },
  escenarios_comentario: 'Incluso el alcista (52,58 CNY, que proyecta las ventas del consenso para 2027-2028) queda un 74 % bajo el precio, y el bajista (23,32) un 89 %. La asimetría es muy desfavorable (−0,84). La razón: el DCF valora los flujos de diez años con un margen que vuelve a su nivel histórico; el precio solo se explica si el margen del 50 % y el crecimiento del 30 % duran mucho más.',
  casos_12m: {
    Bajista: 'Ventas de 9.452 M en 2027e y 8.507 M en 2028e (digestión del capex de IA) con un margen EBITDA 8 puntos menor: BPA de 2,44 CNY en 2028e y el PER del mínimo de cinco años (13,7 veces, el de 2022, cuando bajó la inversión en telecomunicaciones).',
    Base: 'Ventas de 7.000 M, 10.502 M y 13.653 M en 2026-2028e con un margen EBITDA del 51-48 %, resultado financiero de 90 M y un impuesto del 14,5 %: BPA de 4,74 CNY en 2028e (2,65 en 2026e y 3,85 en 2027e), sin la dilución de las acciones H.',
    Alcista: 'Ventas del consenso en 2027e (≈ 11.200 M) y 16.244 M en 2028e con dos puntos más de margen: BPA de 5,89 CNY, aún un 25 % bajo el consenso (7,90), que supone ventas de 20.827 M.',
  },
  diferencia_consenso: 'Nuestro BPA de 2028e (4,74 CNY) queda un 40 % bajo el consenso (7,90) y el de 2027e (3,85) un 27 % bajo (5,29) [D3]. Se mantiene tras revisar cada supuesto: el consenso supone ventas de 20.827 M en 2028e (×4 sobre 2025) y un margen neto del 41 %, cuando el 1S26 creció un 15 % y el margen de los motores activos es del 47 % bruto [A2]. La diferencia está en ventas (escasez de chips, un cliente que reparte pedidos, pico del ciclo) y algo de margen (mezcla). El objetivo medio de los analistas (321,64 CNY) está por encima de nuestro alcista (301,57).',
  objetivo_comentario: 'El objetivo a 12 meses ponderado (205,10 CNY) queda un 0,9 % sobre el precio (+1,4 % con dividendo) y el base (242,69) un 19,4 % (+19,9 %); la regla da Mantener porque la ponderada no llega al 15 % y el valor intrínseco (55,57) está un 72,7 % por debajo. El base supone que el PER baja de 56,3 a 51,2 veces nuestro BPA adelantado (tope ×1,1 de la regla) y que el BPA crece un 36,8 % anual de 2025 a 2028e; el bajista (33,43) aplica el PER de 2022 (13,7) a un BPA de 2,44. La distancia entre el objetivo y el valor intrínseco (−73 %) solo se cierra con un ciclo de IA sin pico durante la década; no hay un catalizador con fecha que lo haga. Comprar exigiría un precio por debajo de 55,57 CNY.',
  valoracion_comentario: 'Pesos: DCF 50 %, escenarios 35 % y comparables 15 %. El DCF es el método que más pesa porque es el único que obliga a decir qué pasa después del pico; los comparables pesan poco porque cotizan con una dispersión enorme (Eoptolink 9,6 veces y Innolight 11,2 veces su BPA de los próximos 12 meses, Yuanjie 81) [B3, D4]. TFC cotiza a 56,3 veces nuestro BPA de los próximos 12 meses (41,6 con el consenso), cinco veces más que los fabricantes de módulos que son sus clientes, por su margen y su papel de «proveedor de palas». La historia adelantada (mediana de 27,0 veces) también queda muy por debajo.',
  catalizadores: {
    items: [
      { fecha: '2026-10-29', evento: 'Resultados del 3T26', efecto: 'Prueba de la recuperación de los motores activos (oferta de chips EML) y de si el 2S26 se acerca a lo que pide el consenso (≈ 2.900 M por trimestre)', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '4T26-1S27', evento: 'Emisión de acciones H en Hong Kong (hasta el 10 % del capital tras la emisión + 15 % de sobreasignación)', efecto: 'Dilución del 11-13 % a precio de mercado; abre la acción a inversores extranjeros', probabilidad: 'Media', sentido: '+/−' },
      { fecha: '2026-11', evento: 'Recompra propuesta por el accionista de control (100-150 M CNY, precio máximo 350)', efecto: 'Simbólica: 0,05-0,07 % de la capitalización', probabilidad: 'Alta', sentido: '+' },
      { fecha: '2027-01', evento: 'Avance de resultados de 2026', efecto: 'Beneficio de 2026 frente a los 3.543 M del consenso', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2027', evento: 'Rampa del 1,6T y primeros pedidos de CPO', efecto: 'Determina si 2027 crece +50 % (base) o +60 % (alcista)', probabilidad: 'Media', sentido: '+' },
      { fecha: 'Continuo', evento: 'Capex de los grandes de la nube y guía de Nvidia/Fabrinet', efecto: 'Primera señal del pico del ciclo', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: 'Sin fecha', evento: 'Medidas de EE. UU. sobre componentes ópticos chinos (FCC, lista de entidades)', efecto: 'Riesgo binario para las ventas al cliente A', probabilidad: 'Baja', sentido: '−' },
    ],
    confianza: 'Media',
  },
  riesgos: {
    items: [
      { riesgo: 'Pico del ciclo de inversión en IA: el crecimiento depende del capex de los grandes de la nube y de Nvidia', tipo: 'Ciclo', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−80 % hasta el bajista a 12 meses (33,43 CNY)', mitigante: 'Los pasivos sirven a todas las generaciones y a varios clientes; caja neta de 2.600 M', senal: 'Capex de los cuatro grandes de la nube que deja de crecer; pedidos de Fabrinet a la baja' },
      { riesgo: 'Múltiplo: 56,3 veces nuestro BPA adelantado frente a una mediana de 27,0 y a 10-11 veces de Innolight y Eoptolink', tipo: 'Valoración', probabilidad: 'Alta', impacto: 'Alto', efecto_valor: '−50 % si el PER vuelve a la mediana con nuestro BPA', mitigante: 'Margen y ROIC muy superiores a los fabricantes de módulos', senal: 'Resultados del 3T26 por debajo del consenso' },
      { riesgo: 'Concentración: el primer cliente (Fabrinet, para Nvidia) da el 63,9 % de las ventas y los cinco primeros el 90,6 %', tipo: 'Clientes', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−30 a −40 % si el cliente A reparte pedidos a un segundo proveedor', mitigante: 'Relación desde 2018 y calificación larga por generación', senal: 'Bajada del peso del primer cliente en el anual 2026 o del margen de los motores' },
      { riesgo: 'Controles de exportación y aranceles EE. UU.-China (FCC, lista de entidades, componentes de origen chino en equipos para EE. UU.)', tipo: 'Regulación', probabilidad: 'Baja', impacto: 'Alto', efecto_valor: '−20 a −50 % en un caso extremo', mitigante: 'Fábrica en Tailandia; vende a ensambladores asiáticos (solo 66 M directos a Norteamérica); el rumor de la FCC de agosto se desmintió', senal: 'Norma de la FCC o del Departamento de Comercio sobre componentes ópticos chinos' },
      { riesgo: 'Escasez de chips láser (EML) y dependencia de proveedores extranjeros para los motores activos', tipo: 'Operativo', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 a −10 %', mitigante: 'La empresa espera mejor oferta desde el 3T-4T de 2026', senal: 'Ventas de activos del 3T26 por debajo de las del 3T25' },
      { riesgo: 'Dilución por las acciones H (11-13 %) y ventas del accionista de control y de directivos', tipo: 'Capital', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 a −10 % de BPA', mitigante: 'Entra caja a precio de mercado', senal: 'Precio de la emisión H y nuevos planes de venta' },
      { riesgo: 'Cambio tecnológico: CPO y silicio fotónico integran componentes y desplazan el valor hacia el chip', tipo: 'Tecnología', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−10 a −20 % a 3-5 años', mitigante: 'TFC desarrolla componentes para CPO y silicio fotónico', senal: 'Pedidos de CPO que van a otros proveedores' },
      { riesgo: 'Tipo de cambio: ventas en USD y costes en CNY (pérdidas de cambio de 37 M en el 1S26)', tipo: 'Financiero', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−2 %', mitigante: 'Fábrica en Tailandia', senal: 'Yuan por debajo de 6,6 por dólar' },
    ],
    premortem: 'Octubre de 2029: la acción vale un 60 % menos. No falló la fábrica sino el ciclo y el cliente. En 2027 los grandes de la nube anunciaron capex plano para 2028 tras dos años de exceso de capacidad, como pasó en las telecomunicaciones en 2001 y en 2019-2022 a menor escala. Fabrinet, con Nvidia apretando precios, sacó a un segundo proveedor de motores ópticos para el 1,6T y TFC perdió un tercio de esos pedidos. Los fabricantes de módulos chinos, con su propio exceso de capacidad, integraron componentes pasivos y bajaron precios. Las ventas de 2028 cayeron un 10 % y el margen EBITDA pasó del 50 % al 38 %. El PER volvió a 20-25 veces, su media de antes de la IA, sobre un BPA un 40 % menor que el que esperaba el consenso en 2026. La salida a Hong Kong de 2027 añadió acciones a precio alto. Las señales estaban en 2026: un 1S26 que creció un 15 % mientras el consenso pedía duplicar ventas, un primer cliente con el 64 % de las ventas y la venta del accionista de control a 140 CNY.',
    ia: {
      exposicion: 'Alta', sentido: 'Mixto', efecto_valor: '+/−50 % a 3-5 años (es la variable que decide el valor)',
      comentario: 'La IA es a la vez el motor y el mayor riesgo de TFC: ≈ 90 % de las ventas van a interconexión óptica de centros de datos, y el salto de 1.939 M a 5.163 M en dos años es la inversión en IA [A1, A7]. La oportunidad: el tráfico entre GPU crece con cada generación (800G → 1,6T → 3,2T) y la óptica coempaquetada multiplica los componentes por puerto [B1]. La amenaza: (1) el ciclo, si el capex de IA se frena; (2) el cambio de arquitectura (CPO, silicio fotónico, cobre en distancias cortas) que puede mover el valor hacia el fabricante del chip; y (3) que la IA abarate el diseño de componentes y la competencia china. En la operación interna, la IA apenas cambia nada (fabricación de precisión). Señal: el capex trimestral de los grandes de la nube y la cuota de TFC en los pedidos de CPO.',
    },
    confianza: 'Media',
  },
  preguntas: {
    items: [
      { tema: 'Cliente A', pregunta: '¿Qué parte de los motores ópticos del 1,6T de Fabrinet/Nvidia tiene TFC asignada para 2027 y hay ya un segundo proveedor calificado?', por_que: 'El 64 % de las ventas; la diferencia entre nuestro base y el consenso está aquí.' },
      { tema: 'Chips EML', pregunta: '¿Cuántos motores dejaron de enviarse en el 1S26 por la escasez y cuándo se recupera la oferta?', por_que: 'Explica si el +15 % del 1S26 es retraso o pérdida.' },
      { tema: 'Plan de acciones', pregunta: '¿Con qué ventas y margen se construyó el objetivo de beneficio de 2028 (+400 % sobre 2025, umbral +320 %)?', por_que: 'Es el doble que nuestro base; si la dirección lo ve alcanzable, conviene saber por qué.' },
      { tema: 'Acciones H', pregunta: '¿Se renovó la solicitud de Hong Kong (la del 10-abr cumplió seis meses) y a qué se destinará la caja si la empresa ya tiene 2.600 M sin deuda?', por_que: 'Dilución del 11-13 % sin necesidad de financiación aparente.' },
      { tema: 'CPO', pregunta: '¿Qué ventas de componentes para óptica coempaquetada espera en 2027-2028 y con qué clientes?', por_que: 'Decide si el cambio de arquitectura es oportunidad o amenaza.' },
      { tema: 'Controles de exportación', pregunta: '¿Qué parte de lo que fabrica en Tailandia lleva componentes de origen chino y cómo respondería a una regla de la FCC?', por_que: 'Riesgo binario sobre la mayor parte de las ventas.' },
      { tema: 'Margen', pregunta: '¿Qué margen bruto tendrán los motores activos cuando vuelva la oferta de chips?', por_que: 'La mezcla movió el margen bruto del 50,8 % (1S25) al 60,9 % (1S26).' },
    ],
    confianza: 'Media',
  },
  bolsa: {
    contexto: {
      movimiento: { fecha: '2026-10-16', var_1m_pct: -17.5, var_3m_pct: -17.9, var_6m_pct: -14.1, var_12m_pct: 63.2, dist_max_52s_pct: -40.1, dist_min_52s_pct: 106.6, dist_max_historico_pct: -40.1, tendencia: 'lateral', volatilidad_60d_pct: 89.0, avisos: [] },
      movimientos_fuertes: [
        { periodo: 'jul-2026', var_pct: -43.8, causa: 'Del máximo de 375 CNY (3-jun) al mínimo del 30-jul: caída de chips y del sector el 2-jul (−12 %; temor a menos inversión en IA) [P3], avance del 1S26 por debajo de lo esperado y escasez de chips EML el 17-jul (−13,4 %) [D9], reajuste del sector el 28-jul (−13,2 %) [D13] y el 30-jul (−12,1 %).', veredicto: 'no cambia', condicion: null },
        { periodo: 'ago-2026', var_pct: 64.6, causa: 'Rebote del sector tras el desmentido del rumor de la FCC (4-ago) [D12] y el semestral del 19-ago (beneficio +33,9 %, margen bruto del 61 %) [A2].', veredicto: 'no cambia', condicion: null },
        { periodo: 'sep-oct 2026', var_pct: -17.5, causa: 'Cinco semanas de caídas: rumor que hundió el sector un 7 % el 28-sep [P4] y salida de dinero del sector antes de los resultados del 3T; −4,5 % el 19-oct, a 203,30 [D2, E1].', veredicto: 'no cambia', condicion: null },
      ],
      noticias: [
        { fecha: '2026-10-15', tipo: 'accionista de referencia', hecho: 'El accionista de control propone recomprar 100-150 M CNY de acciones con un precio máximo de 350 CNY [C5, D8].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-08', tipo: 'ampliación o convertible', hecho: 'Concesión del plan de acciones restringidas de 2026 (2,29 M de acciones a 119,5 CNY; objetivos de beneficio de 2027-2029) [A11].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-08-13', tipo: 'demanda o regulador', hecho: 'Cambio de auditor tras 16 años (de Gongzheng Tianye a EY Hua Ming) por la salida a Hong Kong [A10].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-08-04', tipo: 'rumor', hecho: 'Rumor de una restricción de la FCC a los módulos ópticos chinos, desmentido [D12].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-07-17', tipo: 'resultados', hecho: 'Avance del 1S26: beneficio +25-45 % (salió +33,9 %), escasez de material y pérdidas de cambio [A5].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-04-10', tipo: 'ampliación o convertible', hecho: 'Solicitud de salida a bolsa de acciones H en Hong Kong: hasta el 10 % del capital tras la emisión más un 15 % de sobreasignación (dilución del 11-13 %). La solicitud cumplió seis meses el 10-oct sin cotizar; HKEXnews aún la muestra como presentada, y lo probable es que se renueve [C6, D7].', veredicto: 'retrasa', condicion: 'Hasta que se fije el precio de la emisión H o se retire la solicitud: una colocación del 10 % puede mover el precio más de un 5 %.' },
        { fecha: '2026-01-29', tipo: 'directivos', hecho: 'Ventas de directivos (Wang Zhihong, 394.800 acciones a 218,97 CNY) para pagar impuestos del plan de acciones [C4].', veredicto: 'no cambia', condicion: null },
        { fecha: '2025-11-25', tipo: 'accionista de referencia', hecho: 'El accionista de control vendió 3,011 M de acciones a 140 CNY por subasta privada (421,5 M CNY; ≈ 100 CNY en la base de hoy) [C3].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-29', tipo: 'resultados', hecho: 'Resultados del 3T26 el 29-oct-2026 [D11].', veredicto: 'no cambia', condicion: null },
      ],
      proximos_resultados: '2026-10-29',
      veredicto: 'retrasa',
      condicion: 'Hasta que se fije el precio de la emisión de acciones H en Hong Kong (o se retire la solicitud).',
      comentario: 'La acción cayó un 54 % del 3-jun al 30-jul, rebotó un 65 % en agosto y vuelve a bajar (−17,5 % en un mes al 16-oct y −4,5 % el 19-oct, a 203,30; −45,8 % sobre el máximo de 52 semanas). Los movimientos tienen causa conocida: el semestral flojo por la escasez de chips, el sector y rumores sobre EE. UU. Tendencia lateral (−9,4 % bajo la media de 200 sesiones) y sin avisos P. El hecho pendiente que mueve el precio es la emisión de acciones H (11-13 % de dilución): retrasa. Los resultados del 3T26 (29-oct) no retrasan por sí solos porque la tendencia no es bajista. La decisión no cambia: la acción no es compra a este precio.',
    },
  },
  resumen: {
    recomendacion: 'Mantener', conviccion: 'Media', justificacion_recomendacion: null, horizonte: '12 meses',
    sintesis: `**La recomendación y por qué.** Mantener, con convicción media (no compraríamos; quien la tenga puede esperar al 3T26). El objetivo a 12 meses es de 205,10 CNY (nuestro BPA de 2028e × el PER de la regla común), un +1,4 % de rentabilidad ponderada con el dividendo y un +19,9 % en el base, frente a un precio de 203,30 CNY (cierre del 19-oct-2026). El valor intrínseco (55,57 CNY) está un 72,7 % por debajo del precio y el objetivo medio de los analistas (321,64) un 58 % por encima, fuera de nuestro rango. La razón: TFC es un negocio excelente, pero el precio supone que el ciclo de inversión en IA no tiene pico en esta década. La convicción subiría hacia Vender si el 3T26 (29-oct) no muestra la recuperación de los motores activos (ventas trimestrales por debajo de 1.800 M).

**El negocio.** Primer fabricante mundial de componentes ópticos para centros de datos (11,7 % del mercado) [B1], con un margen bruto del 61 % en el 1S26 y un ROIC de ≈ 100 % frente a un WACC del 10,9 % [A2]. Su punto débil es la dependencia: el 63,9 % de las ventas va a un cliente (Fabrinet, que fabrica para Nvidia) y el 90,6 % a cinco [A7]. Sostenibilidad «En parte»: la calidad sostiene el crecimiento en lo que depende de la empresa, pero el ritmo lo marcan un cliente y el capex de IA, y el 1S26 (+15 %) lo demostró.

**Sector y ciclo.** El mercado de componentes crecería un 30,5 % anual hasta 2030 según Frost & Sullivan, un informe encargado por la empresa [B1]. Nuestro base ya es generoso (+35-50 % en 2026-2027) pero incluye una meseta en 2030; el bajista, una caída en 2028 como la de las telecomunicaciones en 2022.

**Finanzas.** Ventas de 5.163 M en 2025 (+59 %) y beneficio de 2.017 M (+50 %), sin deuda y con 3.178 M de caja a junio [A4]. El flujo operativo convierte el 83-93 % del beneficio; las subvenciones son pequeñas (51 M en 2025). Clientes y existencias crecen más que las ventas en el 1S26.

**Equipo y gobierno.** La pareja de control (37,5 %) vendió a 140 CNY en noviembre de 2025 y ahora propone una recompra simbólica [C3, C5]; cambio de auditor a EY y salida a Hong Kong con una dilución del 11-13 % [A10, D7].

**Valoración.** DCF de 42,86 CNY y valor ponderado de 55,57 (DCF 50 %, escenarios 35 %, comparables 15 %); ni el alcista con las ventas del consenso pasa de 52,58. El precio implica una rentabilidad del 3,0 % anual con nuestros flujos. TFC cotiza a 56,3 veces nuestro BPA de los próximos 12 meses, frente a una mediana adelantada de 27,0 y a 10-11 veces de Innolight y Eoptolink, sus clientes [D4]. Nuestro BPA de 2028e (4,74) queda un 40 % bajo el consenso (7,90), que supone multiplicar las ventas por cuatro.

**Riesgos y catalizadores.** Los mayores: el pico del ciclo (bajista a 12 meses de 33,43 CNY, −84 %), el múltiplo (−50 % si vuelve a su mediana) y el cliente A (−30 a −40 % si reparte pedidos); los controles de exportación EE. UU.-China son un riesgo de baja probabilidad y alto impacto. Catalizadores: 3T26 (29-oct), emisión H y rampa del 1,6T en 2027. El foro de Guba está cansado y dividido, sin euforia [E1].

**Qué cambiaría la decisión.** Comprar por debajo de 55,57 CNY; vender por encima de 228,99. Un 3T26 con ventas por encima de 2.500 M y margen bruto ≥ 58 % subiría nuestro base; un primer cliente por debajo del 50 % de las ventas sin sustituto, o una caída del capex de la nube, lo bajaría. Para un particular en IBKR, la acción A no es accesible (ChiNext solo para institucionales en Stock Connect) [P2]: la vía sería la línea H si sale.`,
    tesis: 'TFC fabrica las piezas de precisión que van dentro de los módulos ópticos que conectan las GPU en los centros de datos: componentes pasivos (lentes, agrupaciones de fibra, filtros) con un margen bruto del 64-72 % y motores ópticos para un cliente que fabrica para Nvidia [A1, A7]. Es la primera del mundo en componentes (11,7 %) [B1], gana un ROIC de ≈ 100 % y no tiene deuda; las ventas se han multiplicado por 2,7 en dos años [A4].\n\nEl precio (203,30 CNY, 221.760 M de capitalización) descuenta mucho más: 56 veces nuestro BPA de los próximos 12 meses y un DCF inverso sin solución razonable; con nuestros flujos el precio rinde un 3,0 % anual. El consenso espera 7,90 CNY de BPA en 2028 (×4,3 sobre 2025) [D3].\n\nPara invertir hay que creer que el capex de IA no tiene pico en esta década, que TFC mantiene el 64 % de un cliente y su margen, y que ni los controles de exportación ni el cambio a CPO le afectan. Nosotros creemos que el negocio es bueno pero que el precio paga el mejor caso.',
    vision_diferencial: {
      mercado_descuenta: 'Que el 1S26 fue un tropiezo de oferta (chips EML) y que en 2027-2028 TFC vuelve a crecer al 50-60 % anual con el 1,6T y la óptica coempaquetada, con un margen neto del 40 %: beneficio de 8.622 M en 2028 [D3]. Los 31 analistas de un año dicen comprar.',
      nuestra_vision: 'Coincidimos en la calidad y discrepamos en la duración: el crecimiento depende de un cliente (64 %) y de un ciclo que ya tiene tres años fuertes. Nuestro base (BPA 4,74 en 2028e) ya supone duplicar y media las ventas; aun con las ventas del consenso, el DCF no llega a 55 CNY.',
      por_que: 'Los ciclos de inversión en redes acaban (telecomunicaciones en 2001 y 2019-2022: en 2022 el PER adelantado de TFC bajó a 13,7). El 1S26 mostró que el ritmo no lo controla la empresa. Y los fabricantes de módulos, sus clientes, cotizan a 10-11 veces.',
    },
    a_favor: [
      '**Líder con margen excepcional**: primera en componentes ópticos (11,7 %) y margen bruto del 61 % en el 1S26.',
      '**ROIC de ≈ 100 %**: casi 90 puntos sobre el WACC, sin deuda y con 3.178 M de caja.',
      '**Crecimiento real**: ventas ×2,7 y beneficio ×2,8 de 2023 a 2025.',
      '**Conversión en caja**: el flujo operativo es el 83-93 % del beneficio.',
      '**1,6T y CPO**: más componentes por puerto en las próximas generaciones.',
    ],
    en_contra: [
      '**Precio sin margen de seguridad**: valor intrínseco de 55,57 CNY, un 72,7 % bajo el precio.',
      '**Un cliente**: el primero da el 63,9 % de las ventas y los cinco primeros el 90,6 %.',
      '**Ciclo de IA**: ventas del 1S26 +15 % frente a un consenso que pide ×1,7 en 2026.',
      '**Caro frente a sus clientes**: 56 veces el BPA adelantado frente a 10-11 de Innolight y Eoptolink.',
      '**Dilución y ventas**: acciones H (11-13 %) y el accionista de control vendió a 140 CNY.',
    ],
    que_vigilar: 'La tesis del mercado depende de que el 2S26 duplique al 1S26 y de que 2027 crezca un 50 % o más con el 1,6T, sin perder peso en el primer cliente. La señal en contra sería un 3T26 con ventas por debajo de 1.800 M (29-oct), un primer cliente que reparte pedidos o los grandes de la nube que dejan de subir el capex.',
    cambiaria_recomendacion: [
      'Precio por debajo de 55,57 CNY: Comprar (valor intrínseco por encima del precio y rentabilidad a 12 meses suficiente).',
      'Precio por encima de 228,99 CNY: Vender (ponderada ≤ −10 %).',
      'Ventas del 3T26 por debajo de 1.800 M CNY: reforzar la venta y bajar el base.',
      'Ventas del 3T26 por encima de 2.500 M con margen bruto ≥ 58 %: subir el base de 2026-2027.',
      'Regla de EE. UU. que restrinja componentes ópticos chinos: revisar a la baja.',
    ],
    kpis_seguimiento: [
      { kpi: 'Ventas trimestrales', nivel_actual: '1.497,7 M (2T26)', umbral_alerta: '< 1.800 M en el 3T26', por_que: 'El consenso necesita ≈ 2.900 M por trimestre en el 2S26.' },
      { kpi: 'Ventas de motores activos', nivel_actual: '1.259,9 M (1S26, −19,6 %)', umbral_alerta: 'Sin recuperación en el 2S26', por_que: 'Mide la escasez de chips y el cliente A.' },
      { kpi: 'Peso del primer cliente', nivel_actual: '63,9 % (2025)', umbral_alerta: '< 50 % sin sustituto', por_que: 'Concentración extrema.' },
      { kpi: 'Margen bruto', nivel_actual: '60,9 % (1S26)', umbral_alerta: '< 55 %', por_que: 'Poder de precios y mezcla.' },
      { kpi: 'Capex de los grandes de la nube', nivel_actual: 'Creciendo', umbral_alerta: 'Guía plana o a la baja', por_que: 'Primera señal del pico del ciclo.' },
    ],
  },
};
