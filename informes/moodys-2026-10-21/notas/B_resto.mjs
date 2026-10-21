// B: añade sector, competencia, esg, fuentes y huecos a la nota B.json
import fs from 'fs';
const ruta = new URL('B.json', import.meta.url);
const j = JSON.parse(fs.readFileSync(ruta, 'utf8'));

j.sector = {
  definicion: "El mercado relevante de Moody's es doble y mundial. El que decide el beneficio es el de **calificaciones de crédito** (MIS: 53 % de los ingresos externos de 2025 y el 70 % del resultado operativo ajustado) [2]; el segundo, **datos, investigación y software de riesgo** para bancos, aseguradoras, gestoras y empresas (MA). No hay una estadística independiente del tamaño del mercado de calificaciones: la SEC publica cuotas y el peso de las tres grandes en los ingresos de las NRSRO, pero no el total [5]. Por eso la serie es la suma de los ingresos de calificación de Moody's (MIS) y S&P Global (Ratings), que se toman de sus 10-K con el mismo criterio (con el canon cobrado a la división de datos del propio grupo) y que suman unas cuatro quintas partes del mercado (estimación propia: las tres grandes tienen el 92,4 % de los ingresos de las NRSRO y Fitch no publica cuentas) [2, 3, 5-7]. Para MA se da como referencia el gasto mundial en datos y análisis de mercados financieros de Burton-Taylor, que solo cubre una parte (investigación y datos, no el software de riesgo ni el KYC) [8].",
  tamano: "≈ 9.041 M USD de ingresos de calificación de Moody's y S&P en 2025 (4.317 + 4.724 M), +8 % [2, 6]; las tres grandes reúnen el 92,4 % de los ingresos de las NRSRO (2024) [5]. Para MA: 49.200 M USD de gasto mundial en datos y análisis de mercados financieros en 2025, +6,5 % (Burton-Taylor) [8].",
  unidad_serie: "millones de USD (ingresos de calificación de Moody's MIS + S&P Global Ratings, con el canon entre divisiones; aproximación al mercado de calificaciones)",
  serie: [
    { anio: "2021", tamano: 8074 },
    { anio: "2022", tamano: 5923 },
    { anio: "2023", tamano: 6378 },
    { anio: "2024", tamano: 8356 },
    { anio: "2025", tamano: 9041 }
  ],
  tcac_historico_pct: 2.9,
  tcac_previsto_pct: null,
  cr5_pct: 98.6,
  estructura: "Concentrada",
  drivers: [
    { driver: "Emisión y refinanciación de deuda", efecto: "+/−", horizonte: "Cíclico", evidencia: "Los ingresos de calificación de Moody's y S&P cayeron un 27 % en 2022 con la subida de tipos y subieron un 31 % en 2024 con la refinanciación [2, 3, 6, 7]. En el 3T26 los ingresos transaccionales de MIS bajaron un 5 % frente a un 3T25 récord: alto rendimiento −40 % y préstamos apalancados −27 % en ingresos [1]." },
    { driver: "Financiación de la infraestructura de IA", efecto: "+", horizonte: "Cíclico", evidencia: "Los ingresos de grado de inversión de MIS subieron un 18 % en el 3T26 por las grandes emisiones de tecnológicas y de los hiperescaladores ligadas a la IA, y PPIF un 11 % con la financiación de centros de datos [1]. El riesgo es que sea un pico de inversión." },
    { driver: "Crédito privado", efecto: "+", horizonte: "Estructural", evidencia: "Moody's lo cita como motor de crecimiento de MIS [2]; en el 3T26 los mercados privados empujaron la actividad de fondos y gestoras dentro de FIG (+2 %) [1]." },
    { driver: "Gasto en datos y software de riesgo", efecto: "+", horizonte: "Estructural", evidencia: "El gasto mundial en datos y análisis de mercados financieros creció un 6,5 % en 2025 hasta 49.200 M USD [8]; el ARR de MA crece un 8 % (3.688 M USD a septiembre de 2026), con KYC al 12 % [1]." },
    { driver: "IA generativa", efecto: "+/−", horizonte: "Estructural", evidencia: "El 10-K avisa de que la información gratuita o barata disponible con IA generativa puede reducir la demanda y de que las presiones de precio se han intensificado [2]; de momento el ARR de MA sigue creciendo un 8 % y el margen de MA sube 100 pb [1]." },
    { driver: "Tipos de interés y diferenciales", efecto: "−", horizonte: "Cíclico", evidencia: "La guía del 21-oct-2026 supone una subida más de la Fed y del BCE antes de fin de año, diferenciales de alto rendimiento hacia 300 pb y una tasa de impago especulativa del 3,8 % (antes, 3 %) [1]." }
  ],
  porter: [
    { fuerza: "Rivalidad", intensidad: 2, justificacion: "S&P, Moody's y Fitch tienen el 93,38 % de las calificaciones vigentes (31-dic-2024) y el 92,4 % de los ingresos de las NRSRO (91,1-93,2 % desde 2021) [5]. En datos y software (MA) la rivalidad es mayor: el 10-K cita competidores diversificados en software, investigación y datos comerciales y financieros [2]." },
    { fuerza: "Poder de los clientes", intensidad: 2, justificacion: "Base atomizada: ningún cliente llega al 10 % de las cuentas por cobrar [2]. El emisor elige agencia, pero mandatos e índices piden las grandes; Moody's sube precios cada año [2]. El 10-K reconoce que la presión de precios de competidores y clientes se ha intensificado [2]." },
    { fuerza: "Poder de los proveedores", intensidad: 1, justificacion: "El insumo principal es el personal (2.574 M USD de gasto de personal en 2025, un 33 % de los ingresos) [2]; los datos de terceros vienen de varias fuentes y la empresa dice no depender de ninguna para una parte material del negocio [2]." },
    { fuerza: "Amenaza de entrada", intensidad: 1, justificacion: "Las tres grandes tenían el 98,8 % de las calificaciones vigentes en 2007 y aún el 93,38 % en 2024; en deuda pública, el 98,6 % [5]. Las agencias medianas (KBRA, DBRS) ganan cuota en titulizaciones, pero su peso en ingresos es del 6,5 % [5]." },
    { fuerza: "Amenaza de sustitutos", intensidad: 3, justificacion: "Bancos de inversión, análisis interno de los inversores, agencias no reconocidas y herramientas de IA generativa compiten con calificaciones y datos [2]. Las calificaciones que exigen la regulación y los mandatos son difíciles de sustituir; los datos e investigación de MA son los más expuestos." }
  ],
  ciclo: {
    posicion: "Madurez del ciclo",
    comentario: "Los ingresos de calificación de Moody's y S&P marcaron máximos en 2025 (9.041 M USD) tras dos años de refinanciación [2, 6], y el 3T26 es el primer trimestre en que MIS cae (−1 %, transaccionales −5 %) frente a un 3T25 récord [1]. La guía supone tipos al alza, diferenciales que se abren y más impagos (3,8 %) [1]. En 2022 la subida de tipos hundió la emisión: los ingresos de MIS cayeron un 28 % y su resultado un 40 % mientras MA crecía un 15 % [3]. No se han cuadrado con fuente primaria las caídas de 2008-09 y 2020."
  },
  regulacion: "MIS está registrada en la SEC como NRSRO (Credit Rating Agency Reform Act de 2006 y Dodd-Frank) y supervisada por ESMA en la UE y por la FCA en el Reino Unido; la regulación limita los conflictos de interés, exige transparencia de métodos y puede afectar a precios y responsabilidad civil [2]. La SEC examina cada año a las NRSRO [5] y en septiembre de 2024 multó a Moody's con 20 M USD por no conservar mensajes de sus empleados [13]. El Reglamento europeo de calificaciones ESG se aplica desde mediados de 2026 y la FCA supervisará a los proveedores de calificaciones ESG desde junio de 2028 [6]. A favor: las normas de capital de bancos y aseguradoras y los mandatos de inversión citan calificaciones de agencias reconocidas [2].",
  tendencias: "Tres tendencias. La **IA generativa** es la amenaza principal para los datos e investigación de MA (clientes que construyen sus propias herramientas, información gratuita) y una oportunidad para los datos propios y verificables que la empresa vende para flujos de trabajo con IA [2]. El **crédito privado** crece y pide calificaciones privadas; Moody's lo cita como motor de MIS [1, 2]. La **financiación de la infraestructura de IA** ha disparado la emisión de grado de inversión y de proyectos en 2026 [1]. Moody's gana con las tres si la IA no abarata sus datos, con el riesgo de que la emisión ligada a la IA sea un pico.",
  confianza: "Media"
};

j.competencia = {
  cuota_pct: 31.39,
  posicion: "**2.ª agencia de calificación del mundo**: 31,39 % de las calificaciones vigentes de las NRSRO a 31-dic-2024, frente al 49,60 % de S&P y el 12,40 % de Fitch [5]. Por ingresos, MIS facturó 4.317 M USD en 2025 frente a 4.724 M de S&P Ratings (48 % de los dos) [2, 6]. En datos y software de riesgo (MA, 3.611 M USD) compite con S&P Market Intelligence, Bloomberg, LSEG, FactSet y Verisk sin cuota de dos cifras.",
  competidores: [
    { nombre: "S&P Global", pais: "EE. UU.", ticker: "SPGI", ingresos: 15336, cuota_pct: 49.6, margen_ebit_pct: 42.2, comentario: "Primera agencia (49,60 % de las calificaciones vigentes [5]; Ratings 4.724 M USD en 2025 [6]) y rival directo de MA con Market Intelligence (4.916 M) [6]. Ingresos y beneficio operativo de 2025 con Mobility, escindida en 2026 [9]." },
    { nombre: "Fitch Ratings", pais: "EE. UU. / Reino Unido", ticker: null, ingresos: null, cuota_pct: 12.4, margen_ebit_pct: null, comentario: "Tercera agencia (12,40 % de las calificaciones vigentes); su cuota sube 7,72 puntos sin la deuda pública, fuerte en financieras y titulizaciones [5]. No cotiza ni publica cuentas." },
    { nombre: "Morningstar (DBRS Morningstar)", pais: "EE. UU.", ticker: "MORN", ingresos: 2446, cuota_pct: 3.13, margen_ebit_pct: 21.5, comentario: "Cuarta agencia (3,13 %); Morningstar Credit facturó 354,4 M USD en 2025 (+21,7 %), fuerte en CMBS y ABS [5]. Compite también en datos de fondos. Margen operativo 527 / 2.446 M [9]." },
    { nombre: "KBRA", pais: "EE. UU.", ticker: null, ingresos: null, cuota_pct: 2.08, margen_ebit_pct: null, comentario: "Quinta agencia (2,08 % de las calificaciones vigentes) y la que más gana en titulizaciones [5]. No cotiza." },
    { nombre: "London Stock Exchange Group (LSEG)", pais: "Reino Unido", ticker: "LSEG", ingresos: 12084, cuota_pct: null, margen_ebit_pct: 23.7, comentario: "Data & Analytics (Workspace) y Risk Intelligence (KYC, +11,7 % en 2025) compiten con Research and Insights, Data and Information y KYC de MA. Ingresos sin recuperaciones 8.986 M GBP a 1,3447 USD/GBP; margen con el beneficio operativo publicado (2.127 M GBP) [10, 12]." },
    { nombre: "Verisk Analytics", pais: "EE. UU.", ticker: "VRSK", ingresos: 3073, cuota_pct: null, margen_ebit_pct: 43.7, comentario: "Analítica para aseguradoras, incluidos modelos de catástrofes: rival de la línea de seguros de MA (RMS). Margen operativo 1.344 / 3.073 M [9]." },
    { nombre: "FactSet Research Systems", pais: "EE. UU.", ticker: "FDS", ingresos: 2476, cuota_pct: null, margen_ebit_pct: 28.3, comentario: "Datos y terminales para gestoras y banca; compite con Research and Insights y Data and Information. Ejercicio cerrado en agosto de 2026; margen operativo 700 / 2.476 M [9]." },
    { nombre: "Bloomberg L.P.", pais: "EE. UU.", ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: "Líder en datos financieros; compite con los datos e investigación de MA. No cotiza ni publica cuentas." }
  ],
  foso: {
    veredicto: "Amplio",
    tendencia: "Estable",
    fuentes: [
      { fuente: "Efectos de red", puntuacion: 4, evidencia: "Una calificación vale porque la usan todos: mandatos, índices y normas de capital piden agencias reconocidas [2]. Las tres grandes tienen el 93,38 % de las calificaciones vigentes y el 98,6 % en deuda pública [5]." },
      { fuente: "Costes de cambio", puntuacion: 4, evidencia: "MA está integrada en los procesos de crédito, seguros y KYC de sus clientes: 99 % de ingresos recurrentes en el 3T26 y ARR +8 % [1]. En MIS las tarifas de seguimiento (373 M USD en el 3T26, +8 %) se cobran mientras la deuda viva [1]." },
      { fuente: "Intangibles (marca, patentes, licencias)", puntuacion: 5, evidencia: "Registro de NRSRO y de ESMA y FCA, más de un siglo de historial de impagos y una marca que todos los inversores reconocen [2, 11]; el margen operativo ajustado de MIS fue del 63,6 % en 2025 y del 64,4 % en el 3T26 [1, 2]." },
      { fuente: "Ventaja en costes", puntuacion: 3, evidencia: "La escala reparte el coste fijo de analistas y tecnología: margen ajustado del grupo del 52,6 % en el 3T26 [1]. S&P, con una escala parecida, tiene márgenes similares (42 % operativo publicado en 2025) [9]." },
      { fuente: "Escala eficiente", puntuacion: 4, evidencia: "El mercado solo admite dos agencias globales completas y una tercera: las tres grandes mantienen entre el 91,1 % y el 93,2 % de los ingresos de las NRSRO desde 2021, aunque las medianas ganan en titulizaciones [5]." }
    ]
  },
  amenazas: "La amenaza más probable es la IA generativa sobre MA: si los clientes construyen modelos de riesgo y KYC con datos más baratos, el ARR (+8 %) podría frenarse y el margen (35,3 % en el 3T26) dejar de subir; el propio 10-K habla de presiones de precio que se han intensificado [1, 2]. En calificaciones, la amenaza es de cuota lenta (las tres grandes han pasado del 98,8 % de las calificaciones vigentes en 2007 al 93,38 % en 2024, con KBRA y DBRS en titulizaciones) [5] o regulatoria (responsabilidad civil, precios). La probabilidad de que el duopolio se rompa en cinco años es baja.",
  confianza: "Alta"
};

j.esg = {
  calificaciones: [
    { agencia: "CDP (cambio climático)", calificacion: "A (lista A por sexto año seguido) [14]", fecha: "2026-01" },
    { agencia: "FTSE Russell (FTSE4Good)", calificacion: "Incluida en el índice por octavo año", fecha: "2026-07" },
    { agencia: "EcoVadis", calificacion: "Medalla de bronce (35 % mejor)", fecha: "2024-10" }
  ],
  materialidad: "Para una agencia de calificación lo material es el **gobierno y la integridad del producto**: el modelo de pago por el emisor crea un conflicto de interés que regulan la SEC, ESMA y la FCA, y una pérdida de credibilidad afectaría directamente a los ingresos [2]. El segundo asunto es el **capital humano**: el gasto de personal fue de 2.574 M USD en 2025, un 33 % de los ingresos, con 16.076 empleados [2]. El tercero, **datos, ciberseguridad e IA**: MA vende datos y modelos, y el 10-K cita errores de los productos con IA y ataques informáticos entre los riesgos de reputación [2]. El impacto ambiental directo es pequeño; la empresa compra electricidad renovable para sus oficinas [2] y está en la lista A de CDP por sexto año [14].",
  controversias: "En septiembre de 2024 la SEC multó a Moody's Investors Service con 20 M USD por no conservar comunicaciones electrónicas de sus empleados (mensajes en dispositivos personales), dentro de una actuación contra seis agencias [13]. En 2026 la empresa dotó una provisión por una obligación fiscal internacional distinta del impuesto sobre beneficios (unos 0,25 USD por acción) [1]. El 10-K no detalla ningún litigio material abierto [2]. Fuera del plazo de tres años: el acuerdo de 863 M USD de 2017 por las calificaciones previas a la crisis [11].",
  confianza: "Media"
};

const nuevas = [
  { id: 5, titulo: "2025 Staff Report on Nationally Recognized Statistical Rating Organizations", editor: "SEC, Office of Credit Ratings", tipo: "Primaria", fecha: "2026-04-24", url: "https://www.sec.gov/files/2025-ocr-staff-report-compliant-4-24-26.pdf" },
  { id: 6, titulo: "Form 10-K del ejercicio 2025", editor: "S&P Global (SEC EDGAR)", tipo: "Primaria", fecha: "2026-02-11", url: "https://www.sec.gov/Archives/edgar/data/64040/000006404026000013/spgi-20251231.htm" },
  { id: 7, titulo: "Form 10-K del ejercicio 2022", editor: "S&P Global (SEC EDGAR)", tipo: "Primaria", fecha: "2023-02-10", url: "https://www.sec.gov/Archives/edgar/data/64040/000006404023000058/spgi-20221231.htm" },
  { id: 8, titulo: "Market data spend hits $49.2bn as AI, volatility and algos drive growth (estudio Burton-Taylor)", editor: "FOW", tipo: "Sectorial", fecha: "2026-04-08", url: "https://www.fow.com/insights/market-data-spend-hits-usd49-2bn-as-ai-volatility-and-algos-drive-growth" },
  { id: 9, titulo: "XBRL companyfacts (ingresos y beneficio operativo de los 10-K): S&P Global, Verisk, Morningstar, FactSet", editor: "SEC EDGAR", tipo: "Primaria", fecha: "2026-10-21", url: "https://data.sec.gov/api/xbrl/companyfacts/CIK0000064040.json" },
  { id: 10, titulo: "London Stock Exchange Group plc: Preliminary results for the year ended 31 December 2025", editor: "LSEG", tipo: "Primaria", fecha: "2026-02-26", url: "https://www.lseg.com/en/media-centre/press-releases/2026/london-stock-exchange-group-plc-preliminary-results-for-the-year-ended-31-december-2025" },
  { id: 12, titulo: "U.S. Dollars to U.K. Pound Sterling Spot Exchange Rate (DEXUSUK)", editor: "FRED, Reserva Federal de St. Louis", tipo: "Datos de mercado", fecha: "2025-12-31", url: "https://fred.stlouisfed.org/series/DEXUSUK" },
  { id: 13, titulo: "SEC Charges Six Credit Rating Agencies with Significant Recordkeeping Failures (comunicado 2024-114)", editor: "SEC", tipo: "Primaria", fecha: "2024-09-03", url: "https://www.sec.gov/newsroom/press-releases/2024-114" },
  { id: 14, titulo: "Sustainability (reconocimientos y calificaciones ESG)", editor: "Moody's Corporation", tipo: "Primaria", fecha: "2026-07", url: "https://www.moodys.com/web/en/us/about-us/sustainability.html" }
];
const ids = new Set(j.fuentes.map(f => f.id));
for (const f of nuevas) if (!ids.has(f.id)) j.fuentes.push(f);
j.fuentes.sort((a, b) => a.id - b.id);

j.huecos = [
  { seccion: "sector", campo: "tcac_previsto_pct", tipo: "Complemento", intentos: "1) Guía de Moody's del 21-oct-2026 y 10-K 2025 (solo previsión de emisión de 2026, no a cinco años); 2) 10-K 2025 de S&P Global e informe de NRSRO de la SEC (sin previsión de mercado); 3) estudio Burton-Taylor resumido por FOW (solo dato de 2025, y de datos, no de calificaciones)", decision: "Omitido" },
  { seccion: "esg", campo: "calificaciones (MSCI, Sustainalytics)", tipo: "Complemento", intentos: "1) Página de sostenibilidad de Moody's (solo CDP, FTSE4Good, EcoVadis); 2) búsqueda web de la calificación MSCI y del ESG Risk Rating de Sustainalytics de MCO (sin resultado de la fuente); 3) página de Sustainalytics (no muestra la puntuación de la empresa)", decision: "Omitido" }
];
j._estado = 'terminado';
fs.writeFileSync(ruta, JSON.stringify(j, null, 2) + '\n');
console.log('ok', j.fuentes.map(f => f.id).join(','));
