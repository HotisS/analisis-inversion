// Textos del analista (KLA, corte 2026-10-15). Cifras del motor tal cual; hechos con cita de la nota ([A3] = fuente 3 de A.json).
const casos_12m = [
  { escenario: 'Bajista', metrica: 'PER FY2028e', beneficio_por_accion: 3.77, multiplo: null, precio: null, justificacion: 'Bajón del ciclo de inversión en 2027-28 como el de 2023-24: las ventas del FY2028 caen un 14 % (perfil del escenario), el margen EBITDA baja al 41 % y el BPA vuelve a 3,77 USD, apenas por encima del FY2026. El mercado paga el mínimo adelantado de cinco años (13,2x).' },
  { escenario: 'Base', metrica: 'PER FY2028e', beneficio_por_accion: 6.18, multiplo: null, precio: null, justificacion: 'Se cumple la guía: ventas +30 % en el FY2027 apoyadas en la cartera de 12.570 M y +17 % en el FY2028; margen EBITDA del 48 %; tipo fiscal del 14,5 %; 1.290 M de acciones medias (recompra anunciada de 9.740 M a ≈ 2.300 M al año, neta de la emisión a empleados).' },
  { escenario: 'Alcista', metrica: 'PER FY2028e', beneficio_por_accion: 6.70, multiplo: null, precio: null, justificacion: 'La inversión en IA y memoria de alto ancho de banda se prolonga: +33 % y +20 % de ventas en el FY2027 y FY2028 y margen EBITDA del 49,5 %, en línea con los objetivos de 2030 del día del inversor.' },
];
const per_historico = {
  base: 'adelantado', actual: 34.9, mediana_5a: 21.7, minimo_5a: 13.2, media_larga: 17.9, anios: 8,
  v2: { mediana_5a: 24.2, minimo_5a: 14.6, media_larga: 23.1, anios: 8, excluidos: 'Historia al cierre (precio ÷ BPA del mismo año): FY2018 20,1x; FY2019 15,8x; FY2020 25,3x; FY2021 24,2x; FY2022 14,6x; FY2023 20,1x; FY2024 36,8x (BPA normalizado); FY2025 27,8x (normalizado); FY2026 82,4x excluido (burbuja).' },
  excluidos: 'FY2026 (cierre del 30-jun-2026 a 301,71 USD ÷ BPA FY2027e propio = 58,9x): pico de un mes (+57 %) que se deshizo en julio (−40 %), burbuja. FY2023 y FY2024 con el BPA del año siguiente normalizado sin los deterioros del negocio de PCB (289,5 y 239,1 M): 2,24 y 3,22 USD. Serie (cierre ÷ BPA del año siguiente): FY2018 13,7x; FY2019 15,4x; FY2020 14,5x; FY2021 14,8x; FY2022 13,2x; FY2023 21,7x; FY2024 25,6x; FY2025 24,5x. Split de 10:1 aplicado a toda la serie.',
};

const secciones = {
  historia: {
    resumen: 'KLA nace en abril de 1997 de la fusión de KLA Instruments (1975) y Tencor Instruments (1976), los dos pioneros de la inspección y la metrología de obleas [A1]. Durante tres décadas ha ido sumando a su negocio central de control de procesos compras que amplían el perímetro: en 2019 compró la israelí Orbotech (inspección de PCB y pantallas, y la británica SPTS de grabado y deposición), que es el origen de los dos segmentos pequeños y de los deterioros de 2020, 2024 y 2025 [A2]. Richard Wallace dirige la empresa desde 2006. En 2026 hizo su primer split (10 por 1, el 11 de junio) tras una subida de la acción del 95 % en 2025 [A5, D1].',
    hitos: [
      { anio: '1975', hito: 'Fundación de KLA Instruments; Tencor Instruments nace en 1976 [A1].' },
      { anio: '1997', hito: 'Fusión de KLA y Tencor: KLA-Tencor [A1].' },
      { anio: '2006', hito: 'Richard Wallace, consejero delegado [C4].' },
      { anio: '2019', hito: 'Compra de Orbotech (PCB, pantallas y SPTS) y cambio de nombre a KLA Corporation [A2].' },
      { anio: '2022', hito: 'Recompra de 3.968 M USD en un año, la mayor de su historia, financiada en parte con deuda [A2].' },
      { anio: '2024-2025', hito: 'Deterioros de 289,5 y 239,1 M en el negocio de PCB por el empeoramiento de su previsión [A3].' },
      { anio: '2026', hito: 'Día del inversor (12-mar): objetivo de 26.000 M de ventas en 2030, dividendo +21 % y recompra de 7.000 M; split de 10 por 1 el 11-jun [B5, B10, A5].' },
    ],
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'KLA fabrica los equipos que miran y miden las obleas durante la fabricación de chips: inspección de defectos en obleas y en retículas (las máscaras de la litografía), metrología de capas y de superposición y el software que convierte esos datos en rendimiento de la fábrica [A1]. En el FY2026 la inspección de obleas fue el 49 % de las ventas, el «patterning» (retículas y metrología) el 20 % y los servicios de la base instalada el 23 % [A1]. Sus clientes son los fabricantes de lógica, fundición y memoria: TSMC pasa del 10 % de las ventas los tres últimos años [A1]. Vende en directo; el 87 % de las ventas es fuera de EE. UU., con China (29,8 %), Taiwán (26,8 %) y Corea (13,5 %) a la cabeza [A1]. Tiene unos 17.000 empleados, un 27 % en I+D [A1].',
    como_gana_dinero: 'Cada nodo nuevo multiplica los pasos en los que hay que inspeccionar y medir, y un defecto que se escapa cuesta una oblea de miles de dólares: por eso los clientes pagan la herramienta que más defectos encuentra y KLA cobra márgenes brutos del 61 % [A3]. El 90 % de las ventas y el 97 % del beneficio de los segmentos vienen del control de procesos, con un margen de segmento del 44,8 % en el FY2026 [A1]. El servicio (23 % de las ventas, +16,5 %) es recurrente y crece con la base instalada [A1]. El producto depende del gasto de inversión de los fabricantes (WFE), que es cíclico: en el FY2024 las ventas cayeron un 6,5 % y el BPA un 16 % [A2]. Con una I+D del 11 % de las ventas casi fija, el apalancamiento operativo es alto en los dos sentidos.',
    clientes: 'Base muy concentrada: TSMC supera el 10 % de las ventas en los tres últimos ejercicios y los pedidos de fundición/lógica han sido «una parte significativa» de los pedidos de los últimos años [A1]. La cartera de pedidos subió de 7.860 a 12.570 M USD en el FY2026 por la construcción de infraestructura de IA, aunque KLA advierte de que puede haber retrasos y cancelaciones [A1]. El poder de precios se ve en el margen bruto, estable en el 60-61 % con ventas que se duplicaron desde el FY2020, y en una cuota que subió 3,6 puntos desde 2021 hasta el 58 % [A2, B10]. China es el riesgo de cliente: 29,8 % de las ventas, plana en el FY2026 porque las restricciones de exportación compensan la inversión en nodos maduros [A1].',
  },
  sector: {
    definicion: 'El mercado relevante es el control de procesos de semiconductores (inspección y metrología), una parte del gasto en equipos de fabricación de obleas (WFE). No hay serie pública fiable del control de procesos: Global Market Insights lo estima en 12.600 M USD en 2025 [B3], pero con la cuota del 58 % que KLA da para 2025 [B10] y las ventas de su segmento (12.245 M en el FY2026, con servicios) el perímetro de KLA es de unos 21.000 M (estimación propia). Por eso la serie y el crecimiento son los del WFE mundial (SEMI y guía de KLA), del que el control de procesos es en torno a un 13-14 % y crece algo más rápido [B2, A6]. Perímetro mundial, en dólares.',
    drivers: [
      { driver: 'Inversión en IA (lógica avanzada y memoria HBM)', efecto: '+', horizonte: 'Cíclico', evidencia: 'KLA subió en julio su previsión de WFE de 2026 a «la parte baja de 150.000 M» desde más de 140.000 M [A6].' },
      { driver: 'Complejidad de cada nodo (EUV, 2 nm, GAA)', efecto: '+', horizonte: 'Estructural', evidencia: 'Más pasos de proceso y tolerancias más finas aumentan la intensidad de control de procesos [A1].' },
      { driver: 'Encapsulado avanzado', efecto: '+', horizonte: 'Estructural', evidencia: 'El segmento de PCB e inspección de componentes creció un 21 % y volvió a beneficio (108 M) [A1].' },
      { driver: 'Restricciones de exportación a China', efecto: '−', horizonte: 'Estructural', evidencia: 'China pasó del 42,8 % de las ventas en el FY2024 al 29,8 % en el FY2026 [A1].' },
      { driver: 'Ciclo de memoria y de inversión', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Ventas del FY2024 −6,5 % tras el pico de 2023 [A2].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 2, justificacion: 'KLA tiene el 58 % del control de procesos; los rivales (Applied, Hitachi, Onto, Nova, Lasertec) son fuertes en nichos [B10, B1].' },
      { fuerza: 'Poder de los clientes', intensidad: 4, justificacion: 'Tres o cuatro fabricantes deciden la mayor parte del gasto; TSMC supera el 10 % de las ventas [A1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 3, justificacion: 'Componentes de fuente única: en enero de 2026 la escasez alargó los plazos de entrega [D15, A1].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Décadas de datos de defectos y de I+D (1.532 M al año); los fabricantes chinos de equipos entran por los nodos maduros [A1, D18].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 1, justificacion: 'No hay forma de fabricar a 2 nm sin inspeccionar y medir; la inspección integrada en otros equipos (ASML-HMI) es complementaria [B1].' },
    ],
    ciclo: { posicion: 'Expansión', comentario: 'La cartera de pedidos (+60 %), la guía del 1T27 (4.000 M, +25 % interanual) y la previsión de WFE al alza dicen que el ciclo sube [A1, A3, A6]. En 2008-09 el WFE se hundió más de un 40 %, en 2020 apenas paró y en 2023-24 KLA bajó un 6,5 % de ventas mientras la memoria recortaba [A2]. El riesgo es que 2027-28 sea el pico de un ciclo alimentado por la IA, como apuntó la caída de julio de 2026 [D13].' },
    regulacion: 'Las reglas de la Oficina de Industria y Seguridad (BIS) de EE. UU. limitan la venta de equipos avanzados a China; KLA advierte de que la falta de licencias le ha obligado a devolver anticipos de clientes chinos [A1]. En septiembre de 2026 dos proyectos de ley bipartidistas para endurecer la exportación de equipos de chips quedaron a la espera de votación en el Senado [D17]. Aranceles y medidas de represalia figuran entre los riesgos del 10-K [A3].',
    tendencias: 'La IA multiplica la demanda de lógica de vanguardia y de memoria HBM, que necesitan más control de procesos por oblea; el encapsulado avanzado abre un mercado nuevo para la inspección [A3]. En contra, China fabrica ya sus propios equipos para nodos maduros, lo que limita a medio plazo un mercado que fue el 43 % de las ventas en el FY2024 [A1, D18]. KLA gana con la tendencia mientras la inversión en IA siga.',
  },
  competencia: {
    foso: {
      veredicto: 'Amplio', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 2, evidencia: 'Su base de datos de defectos crece con cada herramienta instalada y mejora los algoritmos de clasificación; no es una red de usuarios [A1].' },
        { fuente: 'Costes de cambio', puntuacion: 4, evidencia: 'Las recetas de inspección se cualifican nodo a nodo; cambiar de proveedor en mitad de un nodo arriesga el rendimiento [A1].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 4, evidencia: 'I+D de 1.532 M en el FY2026 (11 % de las ventas), más del doble que Onto y Nova juntas en ventas [A3, B8, B9].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Escala para repartir la I+D: margen de segmento del 44,8 % frente a un EBITDA del 28-32 % de Onto y Nova [A1, B8, B9].' },
        { fuente: 'Escala eficiente', puntuacion: 4, evidencia: 'Un mercado de ≈ 21.000 M en el que KLA tiene el 58 % y la cuota sube desde 2021 [B10].' },
      ],
    },
    amenazas: 'La amenaza más probable es la pérdida de China: los fabricantes locales cubren cada vez más los nodos maduros y una ley nueva podría cerrar la venta de los equipos que hoy sí se permiten (29,8 % de las ventas) [A1, D17]. La segunda, que Applied Materials y ASML integren inspección por haz de electrones y metrología en sus propias herramientas [B1]. La tercera, la concentración en TSMC y en dos fabricantes de memoria. Probabilidad media en China y baja en lo técnico: la cuota ha subido 3,6 puntos en cinco años [B10].',
  },
  financieros: {
    comentario: 'Las ventas pasaron de 4.569 M en el FY2019 a 13.580 M en el FY2026, un 16,8 % anual, con la compra de Orbotech en 2019 como único salto de perímetro [A2]. El FY2024 fue el bache del ciclo (−6,5 %) y el FY2025 la recuperación (+23,9 %) [A2]. En el FY2026 las ventas crecieron un 11,7 % y el margen EBITDA llegó al 44,6 %, con un margen bruto del 61,3 % [A3]. El EBITDA del informe es el contable (con los pagos en acciones restados, 310 M en el FY2026) y suma de vuelta los deterioros del negocio de PCB de los FY2020, FY2024 y FY2025, que van por debajo del EBITDA [A2]. Los años FY2019-FY2023 están reexpresados al split de 10 por 1 de junio de 2026 [A5].',
    ajustes: 'Las cifras son las publicadas (US GAAP). KLA publica además un beneficio no GAAP que excluye los cargos de adquisiciones (sobre todo amortización de intangibles de Orbotech: 178 M en el FY2026), las reestructuraciones, los deterioros y partidas fiscales puntuales: 3,76 USD de BPA no GAAP frente a 3,66 GAAP en el FY2026 y 3,33 frente a 3,04 en el FY2025 [A3]. La amortización de intangibles se repite y no se trata como no recurrente. Los deterioros (256,6 M en el FY2020, 289,5 M en el FY2024 y 239,1 M en el FY2025) no son recurrentes y por eso el EBITDA los excluye; el BPA publicado los incluye y la historia del PER se normaliza [A2].',
  },
  trimestres: {
    ultima_presentacion: 'En la llamada del 4T26 (28-jul-2026) Rick Wallace dijo que las tendencias «se refuerzan» y que el negocio acelera en el segundo semestre de 2026 y durante 2027, con la IA como motor en lógica avanzada, memoria y encapsulado [A3]. La dirección subió su previsión de WFE de 2026 a la parte baja de 150.000 M desde más de 140.000 M y guio el 1T27 en 4.000 M ± 200 de ventas, margen bruto del 61,6 % y BPA de 1,14 USD [A3, A6]. Frente a la llamada del 2T26 (enero), cuando la acción cayó un 15 % en un día por los plazos de entrega que alargaba la escasez de componentes, el discurso pasó de la capacidad de servir a la fuerza de la demanda [D15]. Las preguntas se repitieron sobre China, el peso de la memoria y si 2027 crece más que 2026. El mercado leyó la guía del 1T27 como solo «en línea» y la acción cayó tras los resultados [D14, D18]; la dirección no dio cifras para el conjunto de 2027.',
  },
  balance: {
    otros_pasivos: 'Pasivos de contrato (ingresos diferidos de sistemas y servicio) de 1.775 M, con anticipos de clientes que KLA ha tenido que devolver en China cuando no llegaba la licencia [A1]. Posiciones fiscales inciertas de 257,8 M [A1]. Factoring sin recurso de 515 M en el FY2026 (231 M en el FY2025): reduce clientes y adelanta caja; se vigila porque se duplicó [A1]. Swaps que pasan 2.000 M de los bonos de 2022 a tipo variable [A1]. Sin pensiones relevantes ni pagos aplazados de compras. Arrendamientos operativos (264 M) fuera del puente: en US GAAP su gasto ya está en el EBITDA.',
    comentario: 'La deuda bruta es estable desde 2022 (5.887 M, bonos con vencimientos del FY2029 al FY2063) y la caja con valores negociables subió a 4.856 M: la deuda neta es de unos 1.030 M, 0,2 veces el EBITDA [A1, A2]. El circulante comercial (existencias 3.649 M y clientes 2.889 M) es alto porque los equipos tardan meses en fabricarse e instalarse; los pasivos de contrato lo compensan en parte [A2]. Las existencias subieron un 13,6 % con ventas +11,7 %, coherente con una cartera que creció un 60 % [A1]. El patrimonio es bajo (6.350 M) por décadas de recompras, lo que infla el ROE.',
  },
  flujos: {
    comentario: 'El flujo operativo fue de 4.143 M en el FY2026 y el flujo libre de 3.767 M, igual que el del FY2025 pese a un beneficio un 19 % mayor: el circulante absorbió caja en el 4T (clientes +586 M y existencias +212 M) por el salto de las ventas y la cartera [A3]. La conversión del beneficio neto en flujo libre es del 78 % en el FY2026 y del 92 % en el FY2025 [A2]. El capex es bajo (2,8 % de las ventas); estimación propia: alrededor de la mitad es mantenimiento (la amortización material ronda los 200 M) y el resto, capacidad en Singapur y EE. UU. [A1]. KLA devolvió 3.348 M (89 % del flujo libre) en dividendos y recompras [A3].',
  },
  calidad: {
    comentario: 'PwC audita a KLA desde 1977, 49 años seguidos: es la mayor señal de gobierno a vigilar, no de calidad contable [A1]. Opinión favorable sobre las cuentas y el control interno a 30-jun-2026 [A1]. Los pagos en acciones son modestos (310 M, el 6,4 % del beneficio neto) y se restan en el EBITDA del informe [A2]. Hay tres deterioros del negocio de PCB en seis años, que dicen que la compra de Orbotech se pagó cara en esa parte [A2]. El tipo fiscal efectivo es bajo (13,8 %) por incentivos en Singapur e Israel y la deducción FDII; un cambio fiscal es un riesgo [A1]. El factoring se duplicó a 515 M [A1]. Los indicadores del motor son buenos: Altman Z de 14,76 (sin riesgo de quiebra), Piotroski F de 7 y Beneish M de −2,06, por debajo del umbral de manipulación de −1,78.',
    senales: [
      { senal: 'Auditor desde 1977 (49 años)', nivel: 'Media', comentario: 'Rotación del socio sí, de la firma no [A1].' },
      { senal: 'Factoring sin recurso de 515 M (+124 %)', nivel: 'Baja', comentario: 'Adelanta cobros; mejora el flujo operativo del año [A1].' },
      { senal: 'Deterioros repetidos en PCB (FY2020, FY2024, FY2025)', nivel: 'Baja', comentario: 'Negocio pequeño (5,5 % de las ventas) que ya vuelve a beneficio [A1, A2].' },
    ],
  },
  rentabilidad: { comentario: 'KLA crea mucho valor: el ROIC del motor es del 72,3 % en el FY2026 frente a un WACC del 12,16 %, y lo hace desde hace más de una década. Lo mueve el margen (beneficio neto del 35,6 % de las ventas), no la rotación (0,8 veces), y el capital invertido es pequeño porque el patrimonio se ha reducido con recompras. El ROIC incremental histórico es del 150,7 %: cada dólar de capital nuevo ha rendido mucho más que el viejo, porque el crecimiento ha venido de vender más con la misma estructura. Sin el fondo de comercio de Orbotech el ROIC sería del 98,5 %. Frente a sus rivales, Lam Research tiene un ROIC parecido (70 %) y Applied Materials la mitad (36 %) [B6, B7].', confianza: 'Alta' },
  capital: {
    politica: 'KLA devuelve casi todo el flujo libre: dividendo trimestral de 0,23 USD (0,92 al año tras el split, +21 % en marzo de 2026, 17 años seguidos de subidas) y recompras con 9.740 M de autorización pendiente a 30-jun-2026 (programa de 5.000 M de 2025 y otro de 7.000 M de marzo de 2026) [B5, A1, A7]. La prioridad declarada es invertir en I+D y capacidad, mantener el grado de inversión (Fitch A) y devolver el resto [A1].',
    adquisiciones: [
      { anio: '2019', objetivo: 'Orbotech (inspección de PCB y pantallas, SPTS)', importe: 3400, ev_ebitda: null, financiacion: 'Caja, deuda y acciones', resultado: 'Ampliación del perímetro a encapsulado; deterioros de 256,6 M (FY2020), 289,5 M (FY2024) y 239,1 M (FY2025) en PCB [A2].' },
      { anio: '2022', objetivo: 'Compras pequeñas de tecnología (≈ 479 M)', importe: 479, ev_ebitda: null, financiacion: 'Caja', resultado: 'Sin deterioros publicados [A2].' },
    ],
    comentario: 'La asignación de capital es buena en lo central y mediocre en lo inorgánico. En ocho años KLA ha recomprado y repartido mucho más de lo que ha gastado en compras, y el número de acciones bajó de 1.569 M a 1.320 M (−16 %) [A2]. La única gran compra, Orbotech, ha dejado tres deterioros en la parte de PCB, aunque el encapsulado avanzado le está dando ahora un segundo aire. En 2022 se endeudó para recomprar 3.968 M a precios que hoy parecen bajos. El ROIC incremental del 150,7 % confirma que el crecimiento no ha necesitado capital.',
    confianza: 'Alta',
  },
  directivos: {
    historial_guidance: [
      { anio: '4T26', guia: 'Ventas y BPA dentro del rango del trimestre', real: 'Ventas de 3.658 M por encima del punto medio; BPA de 1,04 en la parte alta [A3]', cumplida: 'Sí' },
      { anio: '3T26', guia: 'Rango de ventas y BPA del trimestre', real: 'Ventas de 3.415 M y BPA de 0,91, por encima del consenso [A4]', cumplida: 'Sí' },
      { anio: 'Día del inversor 2026', guia: 'Ventas de 26.000 M y BPA de ≈ 8,40 USD (post-split) en 2030', real: 'Pendiente; el consenso da 24.970 M en el FY2029 [D2, B10]', cumplida: 'Parcial' },
    ],
    comentario: 'Un equipo estable y con historial: Wallace lleva veinte años de consejero delegado y Higgins trece de director financiero, y en ese tiempo la empresa ha ganado cuota y ha multiplicado el BPA. La empresa da guía trimestral y la suele cumplir por arriba. Los directivos han vendido 112 M USD en doce meses, casi todo con planes 10b5-1 programados, y ninguno ha comprado [C3]: no es una alarma por sí solo, pero tampoco una señal de confianza a estos precios. La sucesión de Wallace (en KLA desde 1988) es la pregunta abierta: el proxy no nombra sucesor [C1].',
  },
  gobierno: {
    remuneracion: 'El consejero delegado cobró 29,95 M USD en el FY2026: 1,28 M de fijo, 5,13 M de variable anual (el 200 % del objetivo, con un multiplicador de 167,6 % por el margen operativo en dólares y un 119,2 % por objetivos estratégicos) y el resto, sobre todo en acciones con condiciones de rendimiento [C1]. La ratio con el empleado mediano es de 300 a 1 [C1]. El variable premia el margen operativo en dólares, que crece con las ventas: puede premiar el ciclo más que la gestión. La junta de 2025 aprobó la remuneración con un 91,4 % a favor y un 7,5 % en contra [C2].',
    control_y_defensas: 'Sin accionista de control: BlackRock (8,8 %) y Vanguard (7,5 %) son los mayores, y consejeros y directivos tienen menos del 0,1 % [C1]. Una acción, un voto; consejo de diez con nueve independientes, presidente no ejecutivo (Robert Calderoni) y renovación de cuatro consejeros en 2025 [C1, C2]. Los bonos llevan una cláusula de cambio de control con rebaja de calificación [A1]. No hay operaciones vinculadas relevantes [C1]. El consejo se elige cada año.',
  },
  consenso: {
    guidance: 'Guía del 1T27 (julio-septiembre de 2026, publicada el 28-jul-2026): ventas de 4.000 M ± 200, margen bruto GAAP del 61,6 % ± 1 punto y BPA GAAP de 1,14 ± 0,10 USD [A3]. Para el año, la dirección espera aceleración en el segundo semestre de 2026 y durante 2027 y sitúa el WFE de 2026 en la parte baja de 150.000 M [A6]. En el día del inversor (12-mar-2026) fijó un crecimiento anual de las ventas del 13-17 % hasta 2030 y unos 26.000 M en 2030 [B10]. La guía se confirmará el 28-oct-2026 con los resultados del 1T27 [D4].',
    revisiones: 'Solo hay una fuente gratuita con estimaciones a tres años (MarketScreener); Stock Analysis cuadra en el FY2027 (18.140 M de ventas y 5,44 de BPA, 30 analistas) [D2, D3]. El objetivo medio pasó de unos 215 USD a primeros de julio a 232,77 hoy: subidas de Bernstein (250) y Bank of America (317) en verano y un recorte de UBS (200, neutral) en septiembre [D13, D2]. Las estimaciones de BPA del FY2027 se han mantenido desde la guía de julio. Investing.com da un objetivo medio parecido (233,77) [D15].',
  },
  bolsa: {
    comentario: 'La acción ha batido al mercado con mucha volatilidad: +40,1 % anual en diez años frente al 15,5 % del S&P 500, +65,4 % en el último año, pero con una caída máxima del 44,5 % en cinco años y una volatilidad del 60,5 % [D1]. 2026 ha sido extremo: subió de 107 USD (nov-25) a 307 USD (30-jun-26) con el resto del sector (el ETF de semiconductores subió un 82 % en el primer semestre) y luego perdió un 42 % [D1, D13]. Hoy cotiza un 42,6 % por debajo del máximo y un 4,3 % bajo la media de 200 sesiones [D16].',
    contexto: {
      movimiento: { fecha: '2026-10-15', var_1m_pct: 3.4, var_3m_pct: -18.7, var_6m_pct: -0.3, var_12m_pct: 68.7, dist_max_52s_pct: -42.6, dist_min_52s_pct: 59.2, dist_max_historico_pct: -42.6, tendencia: 'lateral', volatilidad_60d_pct: 53, avisos: [] },
      movimientos_fuertes: [
        { periodo: 'ene-2026', var_pct: -15.2, causa: 'Caída de un día (30-ene) tras los resultados del 2T26 por plazos de entrega más largos por escasez de componentes [D15].', veredicto: 'no cambia', condicion: null },
        { periodo: 'jun-2026', var_pct: 57.0, causa: 'Subida del sector (ETF de semiconductores +82 % en el semestre) por la inversión en IA, con el split del 11-jun; sin noticia propia de la empresa [D13, A5].', veredicto: 'no cambia', condicion: null },
        { periodo: 'jul-2026', var_pct: -40.2, causa: 'Recogida de beneficios del sector al empezar el semestre (−11,8 % y −11,5 % el 1 y 2-jul), la noticia de que SK Hynix frenaba el paso a HBM4 y una guía del 1T27 solo en línea el 28-jul, con el índice de semiconductores en mercado bajista [D13, D14, D18].', veredicto: 'no cambia', condicion: null },
        { periodo: 'ago-sep-2026', var_pct: -20.0, causa: 'Del 13-ago (209 USD) al 16-sep (167 USD): dudas sobre la duración del gasto en IA, recorte de objetivo de UBS y titulares sobre leyes de exportación [D2, D17].', veredicto: 'no cambia', condicion: null },
      ],
      noticias: [
        { fecha: '2026-07-28', tipo: 'resultados', hecho: 'Resultados del FY2026 por encima del punto medio y guía del 1T27 de 4.000 M; la acción cae porque el mercado esperaba más [A3, D14].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-09-01', tipo: 'recomendación', hecho: 'UBS recorta el objetivo a 200 USD (neutral); Bernstein lo sube a 250 en agosto; objetivo medio 232,77 USD con 30 analistas [D2, D15].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-09-23', tipo: 'demanda o regulador', hecho: 'Dos proyectos de ley bipartidistas para endurecer la exportación de equipos de chips a China, a la espera de votación en el Senado y sin fecha [D17].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-15', tipo: 'directivos', hecho: 'Ventas de directivos de 112 M USD en 12 meses (110,7 M con planes 10b5-1); ninguna compra [C3].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-06-11', tipo: 'ampliación o convertible', hecho: 'Split de 10 por 1 (no cambia el valor); recompra pendiente de 9.740 M [A5, A1].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-28', tipo: 'resultados', hecho: 'Resultados del 1T27 tras el cierre del 28-oct; junta de accionistas el 4-nov [D4, C1].', veredicto: 'no cambia', condicion: null },
      ],
      proximos_resultados: '2026-10-28',
      veredicto: 'no cambia',
      condicion: null,
      comentario: 'El precio se ha movido con el sector, no con la empresa: subió un 57 % en junio y cayó un 40 % en julio sin que cambiaran la cartera de pedidos (12.570 M) ni la guía, que subió [A1, A3, D13]. No hay hechos pendientes con fecha que puedan mover el precio más de un 5 % en contra aparte de los resultados del 28-oct, que no aplazan (regla 11): ni colocaciones ni ampliaciones, y las leyes de exportación no tienen fecha de votación [D17]. Las ventas de directivos son con planes programados. Veredicto: no cambia; la señal la decide la valoración.',
    },
  },
  catalizadores: {
    items: [
      { fecha: '28-oct-2026', evento: 'Resultados del 1T27 y guía del 2T27', efecto: 'Confirma o no la aceleración del segundo semestre; una guía por debajo de 4.000 M señalaría el pico', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '4-nov-2026', evento: 'Junta de accionistas (voto de remuneración y consejo)', efecto: 'Sin efecto esperado en el valor', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: 'Ene-2027', evento: 'Resultados del 2T27 y primera visión del WFE de 2027', efecto: 'Un WFE de 2027 por encima de 175.000 M alargaría el ciclo', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: 'Sin fecha (Senado de EE. UU.)', evento: 'Votación de las leyes bipartidistas de exportación de equipos de chips', efecto: 'Podría recortar las ventas a China (29,8 %)', probabilidad: 'Media', sentido: '−' },
      { fecha: '2026-2027', evento: 'Recompras con 9.740 M de autorización pendiente', efecto: 'Reduce las acciones ≈ 1-2 % al año', probabilidad: 'Alta', sentido: '+' },
    ],
    confianza: 'Media',
  },
  riesgos: {
    items: [
      { riesgo: 'Fin del ciclo de inversión en IA en 2027-28', tipo: 'Cíclico / mercado', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−40 % (bajista del motor: 47,07 USD frente a 77,16)', mitigante: 'Servicio recurrente (23 % de las ventas) y balance con caja', senal: 'Cartera de pedidos que deja de crecer; guía trimestral por debajo del trimestre anterior' },
      { riesgo: 'Restricciones de exportación a China', tipo: 'Regulatorio', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−15 % a −20 % (China es el 29,8 % de las ventas)', mitigante: 'Ventas a nodos maduros permitidas; resto de Asia y EE. UU. creciendo', senal: 'Votación de las leyes del Senado; nuevas reglas del BIS [D17]' },
      { riesgo: 'Recompresión del múltiplo', tipo: 'Valoración', probabilidad: 'Alta', impacto: 'Alto', efecto_valor: '−30 % si vuelve a 24x el BPA adelantado', mitigante: 'Crecimiento del BPA del 40 % en el FY2027', senal: 'PER adelantado del grupo por debajo de 22x' },
      { riesgo: 'Concentración de clientes (TSMC y dos de memoria)', tipo: 'Comercial', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−10 %', mitigante: 'Necesidad técnica del control de procesos en cada nodo', senal: 'Recorte de capex de TSMC o de los fabricantes de HBM' },
      { riesgo: 'Competencia de la inspección integrada (Applied, ASML) y de fabricantes chinos', tipo: 'Competitivo', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−10 %', mitigante: 'Cuota que sube desde 2021 y I+D de 1.532 M', senal: 'Pérdida de cuota en el informe de terceros [B10]' },
      { riesgo: 'Escasez de componentes y plazos de entrega', tipo: 'Operativo', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−5 %', mitigante: 'Cartera de pedidos que se desplaza, no se pierde', senal: 'Comentarios sobre plazos en la llamada (enero de 2026) [D15]' },
      { riesgo: 'Cambio fiscal (tipo efectivo del 13,8 %)', tipo: 'Fiscal', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−5 %', mitigante: 'Diversificación geográfica', senal: 'Cambios en FDII o en los incentivos de Singapur e Israel [A1]' },
    ],
    premortem: 'Octubre de 2029: KLA vale un 40 % menos. En 2027 la inversión en IA siguió, pero los fabricantes habían pedido de más: TSMC y los de memoria aplazaron pedidos en la segunda mitad del FY2028, la cartera de pedidos cayó dos trimestres seguidos y las ventas del FY2028 bajaron un 14 %. Al mismo tiempo el Senado aprobó la ley que cerró la venta de equipos de nodos maduros a China, que ya era casi un tercio de las ventas, y los fabricantes chinos ocuparon el hueco. El BPA volvió a 3,8 USD y el mercado, que pagaba 35 veces, volvió a pagar 15 como en 2022. Nada de esto rompió el negocio: el ROIC siguió por encima del 40 %. Lo que falló fue el precio de entrada. Las señales estaban: una guía trimestral que dejó de crecer, la cartera de pedidos y los titulares del Senado.',
    ia: { exposicion: 'Alta', sentido: 'Mixto', efecto_valor: '+10 % en el alcista / −40 % si la inversión en IA se frena', comentario: 'Riesgo de IA: medio. Para el negocio la IA es sobre todo una oportunidad indirecta: más chips de vanguardia, memoria HBM y encapsulado avanzado necesitan más inspección por oblea, y la cartera de pedidos subió un 60 % por la construcción de infraestructura de IA [A1]. La IA no sustituye lo que vende KLA: sus herramientas usan aprendizaje automático para clasificar defectos, y la base de datos de defectos es una ventaja que la IA hace más valiosa. El riesgo está en la dependencia: una parte creciente de la demanda depende de que la inversión en IA siga, y si se frena la caída sería la de un ciclo de WFE (bajista del motor: 47,07 USD por acción, −39 % frente al base). La señal es la cartera de pedidos y la guía de WFE de la dirección.' },
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Los asuntos que mueven las cifras son tres: el cumplimiento de las reglas de exportación (KLA advierte de que puede tener que devolver anticipos de clientes chinos) [A1], la retención del talento técnico (27 % de la plantilla en I+D, en mercados laborales competidos) [A1] y el consumo energético de sus clientes, que no es suyo. KLA publica objetivos de clima y riesgos de no cumplirlos en el 10-K [A3].',
    controversias: 'No hemos encontrado sanciones ni litigios relevantes contra KLA en los tres últimos años en el 10-K ni en la prensa revisada; el 10-K menciona riesgos de propiedad intelectual y de cumplimiento de acuerdos con el gobierno, sin casos materiales abiertos [A1].',
    confianza: 'Baja',
  },
  preguntas: {
    items: [
      { tema: 'Ciclo', pregunta: '¿Qué parte de la cartera de 12.570 M se entregará en el FY2027 y cuánto es memoria HBM?', por_que: 'Decide si el FY2028 crece o cae, y de ahí el bajista.' },
      { tema: 'China', pregunta: '¿Qué porcentaje de las ventas a China quedaría afectado por las leyes pendientes en el Senado?', por_que: 'Es el 29,8 % de las ventas.' },
      { tema: 'Márgenes', pregunta: '¿Cuánto del margen bruto del 61 % depende de la mezcla de retículas y metrología de EUV?', por_que: 'Valida el margen del 48 % del base.' },
      { tema: 'Encapsulado', pregunta: '¿Cuándo llega el negocio de encapsulado avanzado al objetivo de 1.000 M?', por_que: 'Es el motor nuevo de crecimiento.' },
      { tema: 'Capital', pregunta: '¿Mantendrán la recompra si el precio se dobla otra vez, o acumularán caja?', por_que: 'Recomprar a 35x el beneficio destruye valor.' },
      { tema: 'Sucesión', pregunta: '¿Quién sucederá a Rick Wallace y en qué plazo?', por_que: 'Lleva veinte años de consejero delegado.' },
    ],
    confianza: 'Media',
  },
  multiplos_historicos: { comentario: 'KLA cotizaba a 13-15 veces el beneficio del año siguiente entre 2018 y 2022 y pasó a 22-26 veces en 2023-2025, cuando el mercado empezó a verla como una beneficiaria estructural de la IA y no solo como una cíclica. El cierre del FY2026 (30-jun-2026) fue un pico de burbuja (58,9x el BPA del FY2027e propio) que se deshizo en un mes. Hoy, a 34,9 veces nuestro BPA del FY2027e, cotiza muy por encima de su mediana de cinco años (21,7x) y de los comparables (26,4x de mediana del PER adelantado): el precio ya descuenta que el múltiplo nuevo se queda.' },
  comparables: {
    criterio: 'Fabricantes de equipos de semiconductores cotizados con cifras del mismo proveedor y del mismo día (Stock Analysis, 15-oct-2026): los otros tres grandes del WFE (Applied Materials, Lam Research y ASML), los dos especialistas en metrología e inspección (Onto Innovation y Nova) y Teradyne (equipos de prueba, también ligados a la IA) [D5-D10]. No incluimos Hitachi High-Tech (filial no cotizada) ni Lasertec y Tokyo Electron (sin cifras del mismo proveedor). El PER adelantado de Stock Analysis es ajustado (sin amortización de intangibles), algo por encima del GAAP de KLA (≈ 3 % de diferencia en su BPA).',
    comentario: 'KLA cotiza con prima sobre el grupo: EV/EBITDA de los últimos 12 meses de 38,9x y PER adelantado de 31,0x en el motor, frente a una mediana del PER adelantado de los comparables de 26,4x. La prima tiene argumentos (ROIC del 72 % frente al 36 % de Applied y un margen EBITDA del 44,6 %, el mayor del grupo junto a ASML) pero es la prima de un ciclo alto: con el PER de los comparables el valor implícito es de 147-170 USD, por debajo del precio. Ningún comparable distorsiona la mediana: van de 21,7x (Onto) a 34,4x (Teradyne).',
  },
};

export default {
  limitaciones: 'Ejercicio a junio (FY2026 = jul-2025 a jun-2026), etiquetado por el año en que termina. Split de 10 por 1 el 11-jun-2026: el XBRL de la SEC da los años FY2019-FY2023 en acciones de antes del split y se han reexpresado (BPA y DPA ÷ 10, acciones × 10). Precio: cierre del 14-oct-2026 (178,81 USD); la sesión del 15-oct seguía abierta al cerrar el informe (173 USD a media sesión). La caja incluye los valores negociables; en el FY2023 solo los de vencimiento a menos de un año (713 M), porque el XBRL no da el total. Consenso de una sola fuente con estimaciones a tres años (MarketScreener), contrastada en el FY2027 con Stock Analysis. Sin transacciones precedentes con múltiplo. Comparables con múltiplos de los últimos 12 meses y PER adelantado de Stock Analysis (ajustado).',
  controles_explicados: [
    { control: 'EBITDA − amortizaciones = EBIT (FY2020)', explicacion: 'Deterioro de 256,6 M (fondo de comercio de Orbotech) entre EBITDA y EBIT; el EBITDA lo excluye.' },
    { control: 'EBITDA − amortizaciones = EBIT (FY2024)', explicacion: 'Deterioro de 289,5 M del negocio de PCB entre EBITDA y EBIT.' },
    { control: 'EBITDA − amortizaciones = EBIT (FY2025)', explicacion: 'Deterioro de 239,1 M del negocio de PCB entre EBITDA y EBIT.' },
    { control: 'Capitalización calculada ≈ publicada', explicacion: 'La publicada (Stock Analysis) usa 1.305 M de acciones en circulación y el precio de media sesión del 15-oct (172,89); el informe usa 1.312 M diluidas (guía del 1T27) y el cierre del 14-oct.' },
    { control: 'Crecimiento del BPA base ≤ 25 % anual', explicacion: 'El BPA base del FY2028e (6,18) crece un 30 % anual desde el FY2026 porque la guía del 1T27 (+25 % de ventas) y la cartera de 12.570 M (+60 %) sostienen un FY2027 de +30 %; el consenso pide más (6,69).' },
  ],
  huecos: [],
  secciones,
  etapa2_justificacion: 'El control de procesos crece con la complejidad de cada nodo y con la IA: más pasos que inspeccionar por oblea, memoria HBM y encapsulado avanzado [A1, A3]. KLA tiene el 58 % del mercado y ha ganado 3,6 puntos desde 2021 [B10]; su objetivo es crecer un 13-17 % anual hasta 2030 con un WFE que crezca un 12 % [B10]. El ROIC (72 %) supera al WACC en 60 puntos, así que crecer crea valor. Usamos una transición de cinco años desde el 7 % del FY2033 hasta el 3 % terminal, por debajo de la guía, porque el WFE es cíclico.',
  dcf_justificacion: {
    crecimiento: 'El FY2027 crece un 30 %: la guía del 1T27 (4.000 M, +25 % interanual), la cartera de pedidos de 12.570 M (+60 %) y la previsión de WFE de la dirección [A1, A3, A6]; el consenso pide un 33,6 % [D2]. Después bajamos al 17 % y al 13 % en los FY2028-FY2029 (consenso: 18,9 % y 15,7 %) y al 7-9 % hasta el FY2033, por debajo del 13-17 % que la dirección promete hasta 2030 [B10], porque el WFE es cíclico y ninguna década ha encadenado ocho años de subidas. Media de la proyección: 13,0 % anual frente al 16,8 % histórico de 2019-2026.',
    margenes: 'Margen EBITDA del 47 % en el FY2027 y del 48 % en los FY2028-FY2029, frente al 44,6 % del FY2026 [A2]: el apalancamiento operativo con una I+D que crece menos que las ventas; el consenso da un EBITDA ajustado del 48,3 % y 49,2 % (≈ 47 % y 48 % contables tras restar 1,3 puntos de ajustes) [D2]. Luego baja al 46 % en el FY2033 y al 45 % al final de la transición, por más competencia en nodos maduros y en China.',
    inversion: 'Capex del 3,0 % de las ventas (2,8 % en el FY2026, con fábricas nuevas en Singapur) y amortización del 2,6 % (2,9 % en el FY2026, con la amortización de intangibles de Orbotech que se acaba) [A2]. Circulante del 31 % de las ventas: existencias + clientes − proveedores + activos de contrato − pasivos de contrato, como en el FY2026 [A2]. Tipo fiscal del 14,5 % frente al 13,8 % del FY2026 por la retención sobre dividendos de filiales que introdujo la última ley fiscal [A3].',
    wacc: 'Tasa libre del 5,21 % (bono de EE. UU. a 10 años del 13-oct-2026) [D11]; beta de 1,30, la ajustada de cinco años mensual frente al SPY (bruta 1,45; semanal de dos años 1,70) [D1]; prima de mercado del 5,5 %. Coste de la deuda del 4,8 % (284 M de intereses sobre 5.950 M de bonos) y peso de la deuda del 2,4 % a valor de mercado. WACC del 12,16 %. Con la prima implícita del mercado (4,2 %) el WACC baja al 10,51 % [D12].',
    terminal: 'Gordon con un crecimiento del 3,0 % en dólares, entre la inflación esperada (≈ 2,5 %) y la tasa libre menos medio punto, tras una transición de cinco años desde el 7 % del FY2033. El valor terminal pesa un 40 % del valor. El múltiplo de salida de 20x EBITDA es solo de contraste.',
  },
  puente_comentarios: {
    'FY2027e': 'Volumen: cartera de 12.570 M y guía del 1T27; precio: herramientas de nueva generación; otros: encapsulado avanzado [A1, A3].',
    'FY2028e': 'Volumen por la memoria HBM y la lógica de 2 nm; precio en línea con la historia [A1].',
    'FY2029e': 'El WFE sigue creciendo hacia los objetivos de 2030 de la dirección [B10].',
    'FY2030e': 'Normalización del ciclo: crecimiento por debajo del objetivo del 13-17 % [B10].',
    'FY2031e': 'Crecimiento estructural del control de procesos y del servicio de la base instalada [A1].',
  },
  veredicto: 'Sí',
  sostenibilidad_justificacion: 'Sí. El crecimiento proyectado (13,0 % anual) es menor que el histórico de 2019-2026 (16,8 %) y que el objetivo de la dirección (13-17 % hasta 2030) [A2, B10]. Casi no necesita capital: la reinversión es el 9 % del NOPAT y el crecimiento financiable bruto (11,6 %) más una subida de precios del 2,5 % cubren la proyección. El ROIC incremental histórico (150,7 %) y la cuota que sube desde 2021 (58 %) prueban el poder de precios [B10]. La prueba de cuota se hace a mano porque la cuota es de un segmento: con ventas del segmento de control de procesos que crecen como el grupo y un mercado al 12 % anual hasta 2030 [B10], la cuota se mantiene en el 58-60 %, dentro de 1,5 veces la actual. El riesgo no es de calidad sino de ciclo.',
  dcf_lectura: 'El DCF da 77,16 USD por acción, un 56,8 % por debajo del precio, con un 40 % del valor en el terminal; sin la etapa de transición serían 72,47 USD. El DCF inverso es la clave: el precio de 178,81 USD pide un crecimiento de las ventas del 26,9 % anual durante siete años (FY2027e-FY2033e) frente a nuestro 13,0 % y frente al 16,8 % que KLA logró en 2019-2026, o una rentabilidad anual del 7,1 % frente a un WACC del 12,16 % (10,51 % con la prima del mercado). Ningún margen hasta el 76 % justifica el precio con nuestro crecimiento. Es exigente: descuenta que la inversión en IA dure una década sin el bache cíclico que siempre ha tenido el WFE. Con la prima implícita del mercado el valor objetivo sube a 105,42 USD, todavía un 41 % por debajo. Que la empresa sea excelente (ROIC del 72 %) no cambia la cuenta: el precio ya paga esa excelencia y algo más.',
  narrativas: {
    Bajista: 'El ciclo de inversión en IA se frena en 2027-28 como el de memoria en 2023-24: los fabricantes digieren capacidad, las ventas del FY2028 caen un 14 %, China se cierra más por ley y el margen EBITDA baja al 41 %. Ya le pasó a KLA en el FY2024 (−6,5 % de ventas, −16 % de BPA) [A2].',
    Base: 'Se cumple la guía: +30 % en el FY2027 con la cartera de pedidos, +17 % y +13 % después y una normalización al 7 % hasta el FY2033, con un margen EBITDA del 46-48 %.',
    Alcista: 'La IA mantiene el WFE en subida hasta 2030 y KLA cumple sus objetivos de 2030 (26.000 M de ventas) con un margen EBITDA del 49,5 % [B10].',
  },
  escenarios_comentario: 'La asimetría es negativa en valor intrínseco: el alcista (95,92 USD) está un 46,4 % por debajo del precio y el bajista (47,07 USD) un 73,7 %. Incluso el escenario que cumple los objetivos de la dirección vale menos que la cotización con un WACC del 12,16 %. A 12 meses, con la regla de múltiplos, el reparto es mejor (bajista 49,76 USD, base 195,91 y alcista 212,39), pero el bajista pesa mucho: un ciclo que se da la vuelta y un mercado que vuelve a pagar 13x hunden el objetivo.',
  casos_12m,
  per_historico,
  diferencia_consenso: 'Nuestro BPA del FY2028e (6,18 USD) queda un 7,6 % por debajo del consenso (6,69) por las ventas (20.654 M frente a 21.575 M, −4,3 %): suponemos un FY2028 algo más corto, porque el WFE es cíclico, y el mismo margen. Nuestro precio base (195,91 USD) queda un 15,8 % por debajo del objetivo medio de los analistas (232,77), sobre todo por el múltiplo: la regla parte del PER actual (34,9x) y lo baja hacia una historia de 21,7x, mientras los analistas mantienen el múltiplo de hoy. El objetivo medio de los analistas queda dentro de nuestro rango (49,76-212,39) solo por encima del alcista: está fuera, por arriba.',
  media_12m: 152.69,
  objetivo_comentario: 'El objetivo a 12 meses (163,49 USD) está un 79 % por encima del valor intrínseco (91,32 USD): la distancia es la del múltiplo que el mercado paga hoy por la IA frente a lo que valen los flujos con un WACC del 12 %. Cerrarla exigiría años de crecimiento por encima del 25 % anual (lo que pide el DCF inverso) o una bajada del precio. La tesis no es a 12 meses: a este precio KLA es una empresa excelente sin margen de seguridad. El BPA base del FY2028e crece un 30 % anual desde el FY2026 porque la guía y la cartera de pedidos sostienen el FY2027 (+30 % de ventas).',
  valoracion_comentario: 'Pesos: DCF 50 %, escenarios 30 % y comparables 20 %. El DCF es el método más fiable en una empresa con flujos previsibles a largo plazo y sin deuda relevante, y los escenarios recogen el ciclo. Los comparables pesan menos porque todo el grupo cotiza a múltiplos de ciclo alto (26x el beneficio adelantado de mediana) y su PER es ajustado. Las transacciones no pesan (sin operaciones con múltiplo publicado). La dispersión es enorme: los comparables dan 147-170 USD y el DCF 71-85 USD. La diferencia es que el mercado paga hoy el crecimiento de la IA con una prima de riesgo baja; con la prima implícita del mercado (4,2 %) el valor objetivo sube a 105,42 USD y sigue lejos del precio.',
  resumen: {
    recomendacion: 'Mantener', conviccion: 'Media', justificacion_recomendacion: null, horizonte: '12 meses',
    sintesis: '**La recomendación y por qué.** Mantener con convicción media, la que sugiere el motor, para quien ya la tenga; no es una compra. El objetivo a 12 meses es de 163,49 USD, con una rentabilidad ponderada del −8,1 % y del 10,0 % en el caso base, y el valor intrínseco de 91,32 USD queda un 48,9 % por debajo del precio de 178,81 USD. El objetivo medio de los analistas (232,77 USD, 30 analistas) queda por encima incluso de nuestro alcista (212,39) [D2]. La razón: KLA es una de las mejores empresas de la cadena de la IA, pero el precio ya paga varios años de crecimiento sin ciclo. La convicción subiría a Vender si la guía del 28-oct baja del 1T27 o el precio pasa de 182,55 USD; bajaría a favor de comprar solo por debajo de 91,32 USD.\n\n**El negocio.** KLA tiene el 58 % del control de procesos de semiconductores, un margen bruto del 61 % y un ROIC del 72,3 % frente a un WACC del 12,16 % [B10, A3]. La IA le llega de forma indirecta pero directa al bolsillo: más pasos que inspeccionar por oblea en lógica de 2 nm, memoria HBM y encapsulado avanzado, con una cartera de pedidos que subió un 60 % hasta 12.570 M [A1]. Sostenibilidad del crecimiento: Sí; el 13,0 % anual que proyectamos casi no necesita capital y es menor que el 16,8 % de 2019-2026.\n\n**Sector y ciclo.** El WFE está en expansión (la dirección lo ve en la parte baja de 150.000 M en 2026) [A6], pero es cíclico: en el FY2024 las ventas de KLA cayeron un 6,5 % y la acción ha perdido un 42 % desde el máximo de junio en solo cuatro meses [A2, D16]. China (29,8 % de las ventas) se estanca por las restricciones de exportación [A1].\n\n**Valoración.** El DCF da 77,16 USD y el DCF inverso dice que el precio pide un 26,9 % de crecimiento anual durante siete años, el doble de nuestro caso base. A 34,9 veces nuestro BPA del FY2027e, la acción cotiza muy por encima de su mediana de cinco años (21,7x) y de los comparables (26,4x). La regla a 12 meses lleva el múltiplo del base a 31,7x y el bajista al mínimo de cinco años (13,2x): por eso la ponderada sale negativa.\n\n**Equipo y gobierno.** Consejo independiente y presidente no ejecutivo; los directivos han vendido 112 M USD en doce meses con planes programados y nadie ha comprado [C3]. PwC audita desde 1977.\n\n**Riesgos y catalizadores.** El mayor riesgo es el ciclo: un frenazo de la inversión en IA en 2027-28 deja el BPA en 3,77 USD y el precio en 49,76. El segundo, una ley que cierre más China [D17]. Catalizadores: resultados del 1T27 el 28-oct y junta el 4-nov. Los foros están divididos entre comprar la caída y el miedo al pico.\n\n**Qué cambiaría la decisión.** Comprar por debajo de 91,32 USD (valor intrínseco); vender por encima de 182,55 USD. Una guía del FY2027 por encima del 35 % de crecimiento o un pedido de memoria que alargue el ciclo a 2029 subirían el BPA; una guía del 2T27 por debajo de 4.000 M confirmaría el pico.',
    tesis: 'KLA es la empresa que permite a los fabricantes de chips saber si lo que fabrican sirve: tiene el 58 % del control de procesos, un margen bruto del 61 %, un ROIC del 72 % y devuelve casi todo el flujo libre (3.348 M en el FY2026) [B10, A3]. La IA le da más trabajo por oblea en lógica avanzada, memoria HBM y encapsulado, y su cartera de pedidos subió un 60 % [A1].\n\nEl precio de 178,81 USD descuenta un crecimiento de las ventas del 26,9 % anual durante siete años, cuando la empresa promete un 13-17 % y logró un 16,8 % en 2019-2026 [B10, A2]. Cotiza a 34,9 veces nuestro BPA del FY2027e, frente a 21,7x de mediana en cinco años y 26,4x de los comparables.\n\nEl mercado acierta en la calidad y se pasa en el precio. Para invertir hay que creer que la inversión en IA durará una década sin el bache que el WFE siempre ha tenido y que China no se cerrará más. Nuestra lectura es que el negocio lo merece y la cotización no: Mantener, y comprar solo con un margen de seguridad que hoy no hay.',
    vision_diferencial: {
      mercado_descuenta: 'Que la inversión en IA mantiene el WFE en subida varios años y que KLA cumple o supera sus objetivos de 2030 (26.000 M de ventas), con un múltiplo de 30-35 veces el beneficio que se queda [D2, B10].',
      nuestra_vision: 'Coincidimos en el FY2027 (la guía y la cartera lo aseguran) pero no en que el múltiplo se quede: en cada ciclo el mercado ha vuelto a pagar 13-15 veces el beneficio en el bajón, y nuestro base crece menos que el consenso a partir del FY2028.',
      por_que: 'La historia del sector: el WFE ha tenido una caída en cada década, y KLA perdió un 6,5 % de ventas en el FY2024 [A2]. La caída de julio de 2026 (−40 % en un mes) sin cambio de cifras muestra lo sensible que es el múltiplo a cualquier duda sobre la IA [D13].',
    },
    a_favor: [
      '**Cuota dominante y creciente**: el 58 % del control de procesos, +3,6 puntos desde 2021 [B10].',
      '**Rentabilidad excepcional**: ROIC del 72,3 % y margen bruto del 61 % [A3].',
      '**Cartera de pedidos récord**: 12.570 M USD, +60 % en un año [A1].',
      '**Devolución de capital**: 3.348 M en el FY2026 y 9.740 M de recompra pendiente [A3, A1].',
      '**Balance sólido**: deuda neta de unos 1.030 M, 0,2 veces el EBITDA, y calificación A de Fitch [A1].',
    ],
    en_contra: [
      '**Precio exigente**: el DCF inverso pide un 26,9 % anual durante siete años.',
      '**Ciclo**: las ventas del FY2024 cayeron un 6,5 % y la acción un 42 % desde junio de 2026 [A2, D16].',
      '**China**: 29,8 % de las ventas, estancada y con leyes de exportación pendientes [A1, D17].',
      '**Concentración**: TSMC supera el 10 % de las ventas [A1].',
      '**Ventas de directivos**: 112 M USD en doce meses y ninguna compra [C3].',
    ],
    que_vigilar: 'La tesis depende de que el ciclo de inversión en IA no se dé la vuelta en 2027-28. La señal será la guía trimestral y la cartera de pedidos: si la cartera deja de crecer o la guía del 2T27 (28-oct) baja de los 4.000 M del 1T27, el pico está cerca y el bajista gana peso. A favor, una previsión de WFE de 2027 por encima de 175.000 M.',
    cambiaria_recomendacion: [
      'Si el precio baja de 91,32 USD (valor intrínseco), pasaríamos a Comprar si se mantiene la calidad.',
      'Si el precio pasa de 182,55 USD con el objetivo actual, la regla da Vender.',
      'Si la guía del 2T27 (28-oct) baja de 4.000 M de ventas, rebajaríamos el BPA del FY2028e y el objetivo.',
      'Si una ley cierra la venta a China de los equipos hoy permitidos (29,8 % de las ventas), el bajista pasa a ser el base.',
    ],
    kpis_seguimiento: [
      { kpi: 'Cartera de pedidos', nivel_actual: '12.570 M USD (jun-26)', umbral_alerta: 'Caída trimestral', por_que: 'Adelanta las ventas de 2-4 trimestres [A1].' },
      { kpi: 'Guía de ventas trimestral', nivel_actual: '4.000 M (1T27)', umbral_alerta: '< 4.000 M en el 2T27', por_que: 'Dice si el ciclo sigue subiendo [A3].' },
      { kpi: 'Peso de China', nivel_actual: '29,8 %', umbral_alerta: '< 25 % por licencias', por_que: 'Riesgo regulatorio [A1].' },
      { kpi: 'Margen bruto GAAP', nivel_actual: '61,3 %', umbral_alerta: '< 59 %', por_que: 'Poder de precios [A3].' },
      { kpi: 'Previsión de WFE de la dirección', nivel_actual: 'Parte baja de 150.000 M (2026)', umbral_alerta: 'Revisión a la baja', por_que: 'Mercado final [A6].' },
    ],
  },
};
