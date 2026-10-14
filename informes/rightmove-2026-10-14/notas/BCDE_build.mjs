// Notas B, C, D y E de Rightmove (corte 2026-10-14). Entorno nube: solo WebSearch. Comparables y transacciones reutilizados del
// informe de Auto Trader del 10-oct (MarketScreener a 9-oct-2026), como permite lecciones.md.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dir = path.dirname(fileURLToPath(import.meta.url));
const AT = JSON.parse(fs.readFileSync(path.join(dir, '../../auto-trader-2026-10-10/notas/D.json'), 'utf8'));
const w = (n, o) => fs.writeFileSync(path.join(dir, `${n}.json`), JSON.stringify(o, null, 1));

// ---------- D: mercado y valoración ----------
const fD = [
  { id: 1, titulo: 'Rightmove plc (LON:RMV): cotización y estadísticas', editor: 'Stockopedia', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://www.stockopedia.com/share-prices/rightmove-LON:RMV/' },
  { id: 2, titulo: 'Rightmove plc (RMV) share price', editor: 'InvestSmart', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://www.investsmart.com.au/security/lon/rmv/rightmove-plc/share-price' },
  { id: 3, titulo: 'Transaction in Own Shares (RNS, 14-sep-2026): capital y derechos de voto', editor: 'Rightmove plc', tipo: 'Primaria', fecha: '2026-09-14', url: 'https://www.investegate.co.uk/announcement/prn/rightmove--rmv/transaction-in-own-shares/9770357' },
  { id: 4, titulo: 'Rightmove (LON:RMV) stock price up 8.9% (alerta con consenso)', editor: 'MarketBeat', tipo: 'Analistas', fecha: '2026-10-08', url: 'https://www.marketbeat.com/instant-alerts/price-rightmove-lon-rmv-stock-price-up-89-whats-next-2026-10-08/' },
  { id: 5, titulo: 'Rightmove: precio objetivo de JPMorgan, Citigroup, Deutsche Bank y Berenberg (alertas)', editor: 'MarketBeat', tipo: 'Analistas', fecha: '2026-08-05', url: 'https://www.marketbeat.com/instant-alerts/rightmove-lonrmv-given-new-gbx-486-price-target-at-citigroup-2026-08-05/' },
  { id: 6, titulo: 'Rightmove plc: previsiones (crecimiento esperado de beneficio y ventas)', editor: 'Simply Wall St', tipo: 'Analistas', fecha: '2026-02', url: 'https://simplywall.st/stocks/gb/media/lse-rmv/rightmove-shares/future' },
  { id: 7, titulo: 'Rightmove plc ( RTMVY) - Price History (cierres mensuales del ADR)', editor: 'Digrin', tipo: 'Datos de mercado', fecha: '2026', url: 'https://www.digrin.com/stocks/detail/RTMVY/price' },
  { id: 8, titulo: 'Rightmove share price falls after FTSE 100 exit', editor: 'Property Industry Eye', tipo: 'Prensa', fecha: '2026-06', url: 'https://propertyindustryeye.com/rightmove-share-price-falls-after-ftse-100-exit/' },
  { id: 9, titulo: 'Rightmove (RMV) beta', editor: 'Lightyear', tipo: 'Datos de mercado', fecha: '2026-03', url: 'https://lightyear.com/gb/stock/RMV:LSE' },
  { id: 10, titulo: 'Rentabilidad nominal a la par del gilt a 10 años (serie IUDMNPY)', editor: 'Bank of England, Statistical Interactive Database', tipo: 'Primaria', fecha: '2026-10-07', url: 'https://www.bankofengland.co.uk/boeapps/database/_iadb-fromshowcolumns.asp?csv.x=yes&Datefrom=01/Sep/2026&Dateto=10/Oct/2026&SeriesCodes=IUDMNPY&CSVF=TN&UsingCodes=Y&VPD=Y&VFD=N' },
  { id: 11, titulo: 'Implied ERP by month (ERPbymonth.xlsx)', editor: 'Aswath Damodaran, NYU Stern', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 12, titulo: 'Rightmove: finances (estimaciones y consenso)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-09', url: 'https://www.marketscreener.com/quote/stock/RIGHTMOVE-PLC-45538042/finances/' },
  { id: 13, titulo: 'Informe Auto Trader (corte 10-oct-2026): datos de mercado de Auto Trader Group', editor: 'Elaboración propia a partir de los resultados FY26 de Auto Trader y MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-10', url: 'https://plc.autotrader.co.uk/media/usjleen0/full-year-press-release-fy26.pdf' },
];
// Fuentes de comparables y transacciones del informe de Auto Trader (ids 14-26 aquí).
const mapa = {}; let nid = 14;
for (const f of AT.fuentes.filter((f) => f.id >= 14 && f.id <= 26)) { mapa[f.id] = nid; fD.push({ ...f, id: nid++ }); }
const recita = (t) => t.replace(/\[([0-9 ,\-]+)\]/g, (m, g) => '[' + g.split(',').map((s) => s.trim()).map((s) => s.includes('-') ? s.split('-').map((x) => mapa[+x] ?? x).join('-') : (mapa[+s] ?? (+s === 13 ? 12 : s))).join(', ') + ']');

const empresas = AT.comparables.empresas.filter((e) => e.nombre !== 'Rightmove');
empresas.unshift({ nombre: 'Auto Trader', ticker: 'AUTO.L', pais: 'GB', capitalizacion: 3754, ev_ventas: 6.79, ev_ebitda_ltm: 10.3, ev_ebitda_ntm: 9.5, per_ntm: null, crecimiento_pct: 3.9, margen_ebitda_pct: 66.0, roic_pct: null, dn_ebitda: 0.46, fcf_yield_pct: null });

const D = {
  identificacion: {
    nombre: 'Rightmove plc', nombre_corto: 'Rightmove', ticker: 'RMV', isin: 'GB00BGDT3G23', mercado: 'London Stock Exchange (Main Market)', indice_referencia: 'FTSE 250',
    pais: 'Reino Unido', pais_iso: 'GB', sector: 'Servicios de comunicación', industria: 'Medios interactivos y servicios', sede: 'Milton Keynes (Reino Unido)', fundacion: '2000', empleados: null, web: 'plc.rightmove.co.uk',
    precio: 4.889, fecha_precio: '2026-10-13', acciones: 732.5, capitalizacion_publicada: 3629, free_float_pct: null,
    max_52s: null, min_52s: 3.914, volumen_medio_diario: null, proximos_resultados: '2027-02-26',
  },
  consenso: {
    estimaciones: [{ periodo: '2026e', ingresos: null, ebitda: null, ebit: null, bpa: 0.302, dpa: null, fuente: 'MarketBeat, BPA del ejercicio [4]' }],
    recomendaciones: { n_analistas: 8, comprar: 4, mantener: 3, vender: 1, po_medio: 5.95, po_min: 4.29, po_max: 6.65 },
    revisiones: 'Tras el 1S26 los objetivos se movieron en ambas direcciones: JPMorgan subió el suyo a 429 p con infraponderar, Citigroup a 486 p (neutral), Deutsche Bank reiteró comprar con 665 p y Berenberg comprar con 575 p [5]; Jefferies inició con infraponderar. El objetivo medio pasó de 607 p (31-jul) a 595 p (8-oct) [4]. No hay estimaciones gratuitas de 2027-2028 por año: Simply Wall St da un crecimiento esperado del BPA del 9,3 % anual y de los ingresos del 7,8 % (febrero de 2026) [6]. En noviembre de 2025 RBC estimó que la nueva guía rebajaba un 4-6 % el beneficio operativo del consenso [A16].',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Baja',
  },
  bolsa: {
    tipo_rentabilidad: 'de precio (sin dividendos)', rentabilidades: [], anual: [],
    beta: 0.99, volatilidad_pct: null, max_drawdown_pct: null, posicion_corta_pct: null,
    comentario: 'La acción ha caído un 33 % en un año [1]: −12,5 % el 6-nov-2025 (llegó a −28 % en la sesión) con el plan de inversión en IA y la guía de beneficio de 2026 [A16], salida del FTSE 100 en junio de 2026 (cerró a 417,9 p antes de la revisión) [8] y mínimo del año de 391,4 p [2]. Desde entonces ha rebotado a la zona de 490-500 p, con +8,9 % el 8-oct sin noticia identificada [4].',
    confianza: 'Baja',
  },
  multiplos_historicos: {
    serie: [
      { anio: '2019', precio_cierre: 6.34, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2020', precio_cierre: 6.53, ev_ebitda_ntm: null, per_ntm: null, excluir: true },
      { anio: '2021', precio_cierre: 7.94, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2022', precio_cierre: 5.10, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2023', precio_cierre: 5.76, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2024', precio_cierre: 6.42, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2025', precio_cierre: 5.19, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
    ],
    confianza: 'Baja',
  },
  comparables: {
    criterio: recita(AT.comparables.criterio.replace('los dos líderes británicos o alemanes más parecidos (Rightmove, Scout24)', 'el líder alemán de inmobiliario (Scout24), el portal británico de coches con el modelo más parecido (Auto Trader)')) + ' Auto Trader, con datos del informe propio del 10-oct [13].',
    empresas,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: AT.transacciones.operaciones.map((o) => ({ ...o, comentario: recita(o.comentario), excluir: o.objetivo.startsWith('Rightmove') })),
    comentario: recita(AT.transacciones.comentario),
    confianza: 'Media',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'bolsa', campo: 'rentabilidades, volatilidad, caída máxima y posición corta', tipo: 'Complemento', intentos: '1) bolsa.mjs (Yahoo): sin red; 2) búsqueda de históricos: solo cierres sueltos; 3) registro de cortos de la FCA: no abre', decision: 'Omitido' },
    { seccion: 'consenso', campo: 'estimaciones de 2027e y 2028e', tipo: 'Núcleo', intentos: '1) MarketScreener: no abre (solo WebSearch); 2) MarketBeat y Stockopedia vía búsqueda: solo BPA del ejercicio; 3) Simply Wall St: solo tasas de crecimiento', decision: 'Omitido' },
  ],
  _estado: { terminado: '2026-10-14', resumen: 'Precio 488,9 p (Stockopedia, última sesión antes del corte), 732,5 M de acciones (14-sep). Consenso MarketBeat 8 analistas, PO 595 p. Comparables y transacciones del informe de Auto Trader.' },
};
// Cierres de ejercicio: aproximados (Stockopedia/InvestSmart para 2025, ADR de Digrin convertido para 2021-2024) [7, 2].
w('D', D);

// ---------- B: sector y competencia ----------
const fB = [
  { id: 1, titulo: 'FY25 results presentation (cuota de tiempo, tráfico directo)', editor: 'Rightmove plc', tipo: 'Primaria', fecha: '2026-02-27', url: 'https://plc.rightmove.co.uk/content/uploads/2026/02/260227-FY25-Presentation.pdf' },
  { id: 2, titulo: 'OnTheMarket Says CoStar Backing Delivering Traffic, Stock and Leads Surge', editor: 'Online Marketplaces', tipo: 'Prensa', fecha: '2026-01', url: 'https://www.onlinemarketplaces.com/?p=105003' },
  { id: 3, titulo: 'CoStar CEO Andy Florance disappointed REA Group didn\'t buy Rightmove', editor: 'Online Marketplaces', tipo: 'Prensa', fecha: '2024', url: 'https://onlinemarketplaces.com/articles/costar-ceo-andy-florance-im-disappointed-that-rea-group-didnt-buy-rightmove' },
  { id: 4, titulo: 'OnTheMarket / CoStar shareholder vote: takeover approved with 94% majority', editor: 'Online Marketplaces', tipo: 'Prensa', fecha: '2023-12', url: 'https://www.onlinemarketplaces.com/articles/otm-shareholders-vote-outcome-costar-takeover-approved-with-94-majority/' },
  { id: 5, titulo: 'Rightmove Reaffirms 2026 Guidance As Peers Pull Ahead On Growth', editor: 'Online Marketplaces', tipo: 'Prensa', fecha: '2026-05', url: 'https://www.onlinemarketplaces.com/articles/rightmove-reaffirms-2026-guidance-as-peers-pull-ahead-on-growth/' },
  { id: 6, titulo: 'Half-year Financial Report 2026 (RNS)', editor: 'Rightmove plc', tipo: 'Primaria', fecha: '2026-07-31', url: 'https://www.investegate.co.uk/announcement/rns/rightmove--rmv/half-year-financial-report/9697048' },
  { id: 7, titulo: 'Rightmove\'s £1.6B antitrust headache: the rising tide of UK class actions', editor: 'Jones Day', tipo: 'Prensa', fecha: '2026-04', url: 'https://www.jonesday.com/de/insights/2026/04/rightmoves-16b-antitrust-headache-the-rising-tide-of-uk-class-actions' },
  { id: 8, titulo: 'Rightmove plc: historia corporativa (Final Results 31 December 2013, accionistas fundadores)', editor: 'Rightmove plc', tipo: 'Primaria', fecha: '2014-02-28', url: 'https://lse.co.uk/rns/RMV/rightmove-plc-final-results-31-december-2013-iw6m979xy6mp5xt.html' },
  { id: 9, titulo: 'OnTheMarket has overtaken Zoopla says leads management platform', editor: 'The Negotiator', tipo: 'Prensa', fecha: '2024', url: 'https://thenegotiator.co.uk/news/leads-management-firm-says-onthemarket-has-overtaken-zoopla-rightmove/' },
];
const B = {
  historia: {
    resumen: 'Rightmove nació en 2000 como empresa conjunta de cuatro grupos del sector inmobiliario británico (Countrywide, Connells, Halifax y Royal & SunAlliance) para tener su propio portal frente a la prensa local [8]. Salió a bolsa en Londres en 2006, entró en el FTSE 100 y desde 2007 recompra acciones cada año: ha comprado 557 M de acciones desde entonces [D3]. En 2020 regaló meses de suscripción a las agencias durante el confinamiento (ingresos −29 %) [A7]. En 2024 rechazó cuatro propuestas de REA Group, la última a 781 p por acción [D21]. En noviembre de 2025 anunció 60 M de inversión en IA en tres años y la acción cayó un 12,5 % en un día [A16]; en junio de 2026 salió del FTSE 100 [D8].',
    hitos: [
      { anio: '2000', hito: 'Fundación por Countrywide, Connells, Halifax y Royal & SunAlliance [8].' },
      { anio: '2006', hito: 'Salida a bolsa en Londres [8].' },
      { anio: '2007', hito: 'Inicio del programa de recompras continuado: 557 M de acciones recompradas hasta 2026 [D3].' },
      { anio: '2020', hito: 'Descuentos a los clientes por la pandemia: ingresos −29 % y beneficio operativo −37 % [A7].' },
      { anio: '2023', hito: 'CoStar compra OnTheMarket y anuncia una gran inversión para competir [4].' },
      { anio: '2024', hito: 'Rechaza cuatro propuestas de REA Group; la última, 781 p por acción [D21].' },
      { anio: '2025', hito: 'Plan de 60 M de inversión en IA (2026-2028); la acción cae un 12,5 % el día del anuncio [A16].' },
      { anio: '2026', hito: 'Salida del FTSE 100; demanda colectiva de ≈1.500 M ante el CAT; programa de recompra de 350 M [D8, 7, 6].' },
    ],
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'Rightmove es el mayor portal inmobiliario del Reino Unido. Las agencias inmobiliarias (16.385 sucursales a dic-2025) y los promotores de obra nueva (2.887 promociones) pagan una suscripción mensual por anunciar sus inmuebles y recibir contactos de compradores e inquilinos [A1]. Los usuarios no pagan. Vende también productos adicionales dentro de los paquetes (más visibilidad, valoraciones en línea, datos) y desarrolla «áreas de crecimiento»: inmuebles comerciales, hipotecas y servicios de alquiler, que facturaron 29,1 M en 2025 (+25 %) [A2]. El 100 % de los ingresos son del Reino Unido.',
    como_gana_dinero: 'Casi todos los ingresos son recurrentes: suscripción mensual por sucursal, con un ARPA de 1.621 GBP al mes en 2025 [A1]. El crecimiento sale del ARPA (precio y, sobre todo, paquetes superiores), mientras el número de clientes crece un 1-2 % al año en agencias y cae en obra nueva [A3]. Los costes son casi todos de personal, tecnología y marketing: con un 100 % de margen bruto, cada libra extra de ARPA pasa casi entera al beneficio, y el margen operativo subyacente fue del 70 % en 2025 [A1]. El plan de IA lo baja al 67-69 % en 2026 [A16, A3]. La estacionalidad es mínima.',
    clientes: 'Ningún cliente pesa de forma relevante: son miles de sucursales, aunque las grandes cadenas (Connells, Countrywide) negocian como grupo. La retención de agencias fue en 2025 la segunda más alta de la década [A1]. El poder de precios es la tesis y también el riesgo: el ARPA pasó de 1.524 a 1.621 GBP (+6 %) en 2025 y +8 % en agencia en el 1S26, muy por encima de la inflación [A1, A3]; pero las agencias se quejan de las tarifas, CoStar ofrece OnTheMarket como alternativa barata [3] y la demanda colectiva sostiene que las tarifas de 2020-2026 fueron excesivas [7].',
    confianza: 'Media',
  },
  sector: {
    definicion: 'El mercado relevante es la publicidad inmobiliaria residencial en internet del Reino Unido: lo que pagan agencias y promotores a los portales (Rightmove, Zoopla, OnTheMarket) por anunciar inmuebles en venta y alquiler. No hay una estadística oficial de su tamaño; los ingresos de Rightmove (425 M en 2025) son la mayor parte, y Zoopla (Silver Lake) y OnTheMarket (CoStar) no publican cuentas separadas recientes.',
    tamano: null, unidad_serie: null, serie: [], tcac_historico_pct: null, tcac_previsto_pct: null, cr5_pct: null, estructura: 'Concentrada',
    drivers: [
      { driver: 'Número de agencias y promotores activos', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Sucursales de agencia +2 % en 2025; promociones de obra nueva −1 % en 2025 y −4 % en el 1S26 [A1, 6].' },
      { driver: 'Poder de precios del portal dominante', efecto: '+', horizonte: 'Estructural', evidencia: 'ARPA +6 % en 2025 y +7 % en el 1S26 [A1, 6].' },
      { driver: 'Competencia de CoStar (OnTheMarket)', efecto: '−', horizonte: 'Estructural', evidencia: 'Visitas de OnTheMarket +55 % y contactos +94 % desde la compra, según la propia CoStar [2].' },
      { driver: 'Búsqueda con IA generativa', efecto: '+/−', horizonte: 'Estructural', evidencia: 'El tráfico desde modelos de lenguaje es < 0,5 % de las visitas de Rightmove [1].' },
      { driver: 'Regulación de competencia', efecto: '−', horizonte: 'Estructural', evidencia: 'Demanda colectiva de ≈1.500 M por tarifas excesivas; vista de certificación el 2-3 de noviembre de 2026 [7].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 2, justificacion: 'Rightmove tiene el 89 % del tiempo en portales (Comscore) [1]; CoStar invierte para cambiarlo [2].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Agencias fragmentadas, pero organizadas en cadenas y con una demanda colectiva en marcha [7].' },
      { fuerza: 'Poder de los proveedores', intensidad: 1, justificacion: 'Los «proveedores» son los anuncios, que aportan los propios clientes; el coste es de personal y tecnología.' },
      { fuerza: 'Amenaza de entrada', intensidad: 3, justificacion: 'CoStar es un entrante con dinero; la IA generativa abre otra vía de acceso al comprador.' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 2, justificacion: 'Redes sociales y webs propias de las agencias no han restado tráfico: más del 85 % es directo u orgánico [1].' },
    ],
    ciclo: { posicion: 'Madurez del ciclo', comentario: 'Los ingresos de Rightmove dependen poco de las transacciones: las agencias pagan la suscripción mientras tienen sucursal abierta. En 2008-09 cerraron sucursales; en 2020 el ingreso cayó un 29 % solo por los descuentos voluntarios [A7]; en 2022-23, con la subida de tipos y menos compraventas, los ingresos siguieron creciendo un 9-10 % [A6]. El punto débil del ciclo hoy es la obra nueva (promociones −6 a −10 % en 2026) [6].' },
    regulacion: 'La Ley de mercados digitales (DMCC Act 2024) da a la CMA poderes sobre empresas con estatus estratégico, pero Rightmove no está designada. El riesgo regulatorio concreto es la demanda colectiva ante el Competition Appeal Tribunal por abuso de posición dominante en las tarifas (abril 2020-abril 2026), de ≈1.500-1.600 M y financiada por Innsworth (Elliott): la vista para certificarla es el 2-3 de noviembre de 2026 [7]. Además, el impuesto británico sobre servicios digitales afecta al beneficio operativo [A16].',
    tendencias: 'La IA generativa puede cambiar cómo se busca vivienda: si los asistentes llegan a ser la puerta de entrada, el portal pierde el contacto directo con el comprador. Rightmove responde invirtiendo 60 M en tres años (valoraciones en línea, búsqueda conversacional, app en ChatGPT) [A16]. CoStar, con OnTheMarket, compite en precio y gasta en marketing [2]. Las agencias híbridas y en línea concentran sucursales, lo que limita el crecimiento de clientes.',
    confianza: 'Baja',
  },
  competencia: {
    cuota_pct: 89, posicion: '1.º portal inmobiliario del Reino Unido: 89 % del tiempo en portales según Comscore (75 % con SimilarWeb, data.ai y Sensor Tower) [1].',
    competidores: [
      { nombre: 'Zoopla (Houseful, Silver Lake)', pais: 'Reino Unido', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Segundo portal histórico; propiedad de Silver Lake, sin cuentas recientes publicadas. Según una plataforma de gestión de contactos, OnTheMarket ya le supera en contactos [9].' },
      { nombre: 'OnTheMarket (CoStar Group)', pais: 'Reino Unido / EE. UU.', ticker: 'CSGP', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Comprado por CoStar en 2023 [4]; visitas +55 %, páginas vistas +110 % y contactos +94 % desde la compra según la propia empresa (enero de 2026) [2]. Compite con precio y marketing.' },
    ],
    foso: {
      veredicto: 'Amplio', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 5, evidencia: 'Compradores van donde están los anuncios y agencias donde están los compradores: 89 % del tiempo en portales [1].' },
        { fuente: 'Costes de cambio', puntuacion: 3, evidencia: 'Una agencia que deja Rightmove pierde la mayor parte de los contactos; retención de 2025 la segunda más alta de la década [A1].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 4, evidencia: 'Más del 85 % del tráfico llega directo u orgánico, sin pagar adquisición [1].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Margen operativo subyacente del 70 % frente al 66 % de Auto Trader y 55-60 % de REA y Scout24 [D12].' },
        { fuente: 'Escala eficiente', puntuacion: 4, evidencia: 'El mercado sostiene un portal dominante; los rivales no publican beneficios.' },
      ],
    },
    amenazas: 'Tres amenazas, de mayor a menor probabilidad: (1) un límite a las subidas de precios, por la demanda colectiva o por presión de las agencias, que convierta el crecimiento del ARPA del 6-8 % en uno del 3 % (probabilidad media) [7]; (2) CoStar, que puede perder dinero años con OnTheMarket para ganar cuota (media-baja: tras tres años, Rightmove sigue con récord de cuota de tiempo) [1, 2]; (3) la búsqueda con IA, que hoy aporta menos del 0,5 % del tráfico pero podría desplazar el punto de entrada (baja a tres años, incierta a diez).',
    confianza: 'Media',
  },
  esg: { calificaciones: [], materialidad: 'Los asuntos materiales son de gobierno y de competencia, no ambientales: el trato a los clientes en precios (demanda colectiva) y la protección de datos de millones de usuarios. La huella de carbono de un negocio de oficina y nube es pequeña.', controversias: 'Demanda colectiva de ≈1.500 M presentada en 2025-26 ante el Competition Appeal Tribunal por tarifas excesivas a agencias y promotores (2020-2026); la empresa la rechaza [7]. Sin sanciones firmes conocidas.', confianza: 'Baja' },
  fuentes: fB,
  huecos: [
    { seccion: 'sector', campo: 'tamaño, serie y crecimiento del mercado', tipo: 'Núcleo', intentos: '1) estadística oficial (ONS) de publicidad inmobiliaria: no existe; 2) cuentas de Zoopla y OnTheMarket: no publicadas por separado; 3) informes de mercado: de pago', decision: 'Omitido' },
    { seccion: 'competencia', campo: 'ingresos y márgenes de Zoopla y OnTheMarket', tipo: 'Complemento', intentos: '1) Companies House: no abre; 2) informe de CoStar: no desglosa OnTheMarket; 3) prensa: solo métricas de tráfico', decision: 'Omitido' },
    { seccion: 'esg', campo: 'calificaciones ESG', tipo: 'Complemento', intentos: '1) MSCI y Sustainalytics: no abren; 2) informe anual: no abre; 3) no se gastan búsquedas', decision: 'Omitido' },
  ],
  _estado: { terminado: '2026-10-14' },
};
w('B', B);

// ---------- C: equipo y gobierno ----------
const fC = [
  { id: 1, titulo: 'Result of AGM 2026 (RNS, 8-may-2026)', editor: 'Rightmove plc', tipo: 'Primaria', fecha: '2026-05-08', url: 'https://www.investegate.co.uk/announcement/prn/rightmove--rmv/result-of-agm/9560118' },
  { id: 2, titulo: 'Result of AGM 2025 (RNS, 9-may-2025)', editor: 'Rightmove plc', tipo: 'Primaria', fecha: '2025-05-09', url: 'https://www.investegate.co.uk/announcement/prn/rightmove--rmv/result-of-agm/8871079' },
  { id: 3, titulo: 'Result of AGM 2024 (RNS, 10-may-2024)', editor: 'Rightmove plc', tipo: 'Primaria', fecha: '2024-05-10', url: 'https://plc.rightmove.co.uk/content/uploads/2024/05/2024.05.10-AGM-Results-Announcement.pdf' },
  { id: 4, titulo: 'First Court Date Secured for £1.5Bn Rightmove Lawsuit', editor: 'Online Marketplaces', tipo: 'Prensa', fecha: '2026', url: 'https://www.onlinemarketplaces.com/articles/first-court-date-secured-for-1-5bn-rightmove-lawsuit/' },
  { id: 5, titulo: 'US investor buys 6% stake in Rightmove as takeover rumours fly', editor: 'The Negotiator', tipo: 'Prensa', fecha: '2026', url: 'https://thenegotiator.co.uk/news/marketing-news/us-investor-buys-6-stake-in-rightmove-as-takeover-rumours-fly/' },
  { id: 6, titulo: 'Total Voting Rights (RNS, 1-sep-2026)', editor: 'Rightmove plc', tipo: 'Primaria', fecha: '2026-09-01', url: 'https://www.finanznachrichten.de/nachrichten-2026-09/69460819-rightmove-plc-total-voting-rights-008.htm' },
];
const C = {
  directivos: {
    equipo: [
      { nombre: 'Johan Svanström', cargo: 'Consejero delegado', desde: '2023', participacion_pct: null, trayectoria: 'Reelegido en la junta de 2026 con el 96,3 % a favor [1]. Bajo su mandato: ingresos de 364 a 425 M (2023-2025), defensa frente a REA en 2024 y giro hacia la inversión en IA en noviembre de 2025 [A1, A16].' },
    ],
    historial_guidance: [
      { anio: '2025', guia: 'Margen operativo subyacente del 70 % (reafirmada en noviembre de 2025) [A16]', real: '70 %, beneficio operativo subyacente 297,7 M (+9 %) [A1]', cumplida: 'Sí' },
      { anio: '2026', guia: 'Ingresos +8-10 %, beneficio operativo subyacente +3-5 %, BPA subyacente ≥ +5 % [A16]', real: 'Ingresos rebajados a +6-8 % en julio; beneficio y BPA mantenidos [A3]', cumplida: 'Parcial' },
    ],
    comentario: 'La dirección cumplió la guía de margen de 2025 y mantiene la de beneficio de 2026, pero rebajó la de ingresos a mitad de año por la obra nueva [A3]. El cambio de discurso de noviembre de 2025 (invertir 60 M y aceptar 3-5 % de crecimiento del beneficio) fue una decisión de largo plazo que el mercado castigó [A16]. No se ha podido verificar en esta sesión la composición del resto del equipo (director financiero, presidente) ni sus participaciones: queda como hueco.',
    confianza: 'Baja',
  },
  gobierno: {
    consejo: [],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: null, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: null, auditoria_independiente: null, insiders_sin_operaciones: null,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 90.6, voto_remuneracion_contra_pct: 9.4, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: null,
    remuneracion: 'En la junta del 8-may-2026 el informe de remuneración tuvo un 3,45 % en contra y la nueva política de remuneración un 9,39 % en contra, el voto más débil de la junta [1]. En contra del informe: 1,44 % en 2025 [2] y 3,37 % en 2024 [3]. Participó el 74 % del capital [1]. No se ha podido leer el informe de remuneración (métricas y pesos del variable) en esta sesión.',
    accionistas: [
      { nombre: 'Inversor estadounidense (6 %, según prensa)', pct: 6.0, tipo: 'Institucional', variacion: 'Entrada en 2026, con rumores de opa [5].' },
      { nombre: 'Autocartera', pct: 1.4, tipo: 'Autocartera', variacion: '10,4 M de acciones a 14-sep-2026 [D3].' },
    ],
    insiders: [],
    control_y_defensas: 'Sin accionista de control: capital disperso entre institucionales, con una acción un voto y sin blindajes conocidos [1, 6]. El consejo rechazó en 2024 cuatro propuestas de REA Group, la última de 781 p por acción, por infravalorar la empresa [D21]; la acción cotiza hoy un 37 % por debajo de esa oferta. La normativa británica de opas (City Code) obliga a ofrecer a todos el mismo precio.',
    alertas: [
      'Demanda colectiva de ≈1.500 M ante el Competition Appeal Tribunal por abuso de posición dominante (tarifas de 2020-2026); vista de certificación el 2-3 de noviembre de 2026 [4].',
    ],
    confianza: 'Baja',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'consejo, comisiones y remuneración del consejero delegado', tipo: 'Núcleo', intentos: '1) informe anual 2025: no abre (solo WebSearch); 2) búsqueda de la junta 2026: solo votos; 3) prensa: sin desglose', decision: 'Omitido' },
    { seccion: 'gobierno', campo: 'operaciones de directivos (PDMR) de 12 meses', tipo: 'Complemento', intentos: '1) RNS de PDMR: no abre; 2) búsqueda: sin resultados claros; 3) no se gastan más búsquedas', decision: 'Omitido' },
    { seccion: 'directivos', campo: 'director financiero, presidente y participaciones', tipo: 'Núcleo', intentos: '1) web de la empresa: no abre; 2) búsqueda de la junta: no nombra cargos; 3) no se ponen nombres sin comprobar (lecciones)', decision: 'Omitido' },
  ],
  _estado: { terminado: '2026-10-14' },
};
w('C', C);

// ---------- E: sentimiento ----------
const fE = [
  { id: 1, titulo: 'ii view: Rightmove restarts share buybacks as AI spend gathers pace', editor: 'interactive investor', tipo: 'Foros y redes', fecha: '2026-02-27', url: 'https://www.ii.co.uk/analysis-commentary/ii-view-rightmove-restarts-share-buybacks-ai-spend-gathers-pace-ii538293' },
  { id: 2, titulo: 'Rightmove share price builds bullish pressure as AI innovation, capital returns and investor optimism support recovery', editor: 'Kalkine', tipo: 'Foros y redes', fecha: '2026-08-14', url: 'https://kalkine.co.uk/news/technology/rightmove-share-price-builds-bullish-pressure-as-ai-innovation-capital-returns-and-investor-optimism-support-recovery' },
  { id: 3, titulo: '“They will be studied like Blockbuster Video” – agents predict Rightmove demise (comentarios de agentes)', editor: 'The Negotiator', tipo: 'Foros y redes', fecha: '2026', url: 'https://thenegotiator.co.uk/news/marketing-news/they-will-be-studied-like-blockbusters-agents-predict-rightmove-demise/' },
  { id: 4, titulo: 'An Update on Rightmove', editor: 'Cayucos Capital (Substack)', tipo: 'Foros y redes', fecha: '2026', url: 'https://cayucoscapital.substack.com/p/an-update-on-rightmove' },
  { id: 5, titulo: 'Rightmove avoids more share price woes as court date set (comentarios de lectores)', editor: 'The Negotiator', tipo: 'Foros y redes', fecha: '2026', url: 'https://thenegotiator.co.uk/news/marketing-news/rightmove-hit-by-more-share-price-woes-as-court-date-set/' },
  { id: 6, titulo: 'Rightmove half-year results 2026: growth holds as New Homes cuts guidance', editor: 'Josh Thompson (blog de inversión)', tipo: 'Foros y redes', fecha: '2026-08', url: 'https://joshthompson.co.uk/investing/rightmove-half-year-results-2026-new-homes-guidance-buybacks/' },
];
const E = {
  sentimiento: {
    tono: 'Dividido', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'interactive investor (ii view)', fecha: '2026-02', n_comentarios: null, tono: 'Positivo', resumen: 'Ve la recompra de 90 M por encima de lo esperado y la caída por la IA exagerada; mantiene la opinión favorable [1].' },
      { plataforma: 'Kalkine (comentario de mercado)', fecha: '2026-08', n_comentarios: null, tono: 'Positivo', resumen: 'Atribuye el rebote a la devolución de caja y a la estrategia de IA tras el 1S26 [2].' },
      { plataforma: 'The Negotiator (comentarios de agentes)', fecha: '2026', n_comentarios: null, tono: 'Negativo', resumen: 'Agentes inmobiliarios predicen el declive del portal por sus precios y la IA; es la voz de los clientes, no de los inversores [3].' },
      { plataforma: 'Substack de inversión (Cayucos Capital)', fecha: '2026', n_comentarios: null, tono: 'Positivo', resumen: 'Tesis de inversor particular: el foso sigue intacto y la acción descuenta demasiado la amenaza de la IA [4].' },
      { plataforma: 'Blog de inversión (resultados del 1S26)', fecha: '2026-08', n_comentarios: null, tono: 'Neutro', resumen: 'Destaca que el crecimiento aguanta pero la obra nueva obliga a rebajar la guía; la recompra sostiene la acción [6].' },
    ],
    temas: [
      { tema: 'IA generativa como sustituto del portal', postura: 'Dividida', peso: 'Alto', contraste: 'El tráfico desde modelos de lenguaje es < 0,5 % de las visitas y la cuota de tiempo marcó récord en 2025 [A1, A2]: hoy no hay erosión medible.' },
      { tema: 'Recompras y devolución de caja', postura: 'Alcista', peso: 'Alto', contraste: 'Cierto: más de 400 M en 12 meses, ≈11 % de la capitalización, financiados en parte con deuda [A3].' },
      { tema: 'Precios abusivos y demanda colectiva', postura: 'Bajista', peso: 'Medio', contraste: 'La demanda existe (≈1.500 M) y la vista es el 2-3 de noviembre [C4]; la certificación no implica culpa.' },
      { tema: 'Interés de compradores (REA, fondos)', postura: 'Alcista', peso: 'Medio', contraste: 'REA ofreció 781 p en 2024 [D21]; la prensa cita a un inversor estadounidense con un 6 % [C5].' },
    ],
    lectura: 'El sentimiento pasó de la capitulación de noviembre de 2025 a una mejora prudente: los inversores particulares y los comentaristas valoran la recompra y ven exagerada la amenaza de la IA, mientras los clientes (agentes) son hostiles. Esa hostilidad es la señal que más importa, porque es la base de la demanda colectiva y el límite real al poder de precios. No hay euforia: el sentimiento no contradice la tesis ni el consenso de analistas (dividido, 4 comprar, 3 mantener, 1 vender) [D4]. Pocos debates de foros abren desde aquí: confianza baja.',
    confianza: 'Baja',
  },
  fuentes: fE,
  huecos: [{ seccion: 'sentimiento', campo: 'foros de inversores (Reddit, LSE Chat, Stocktwits)', tipo: 'Complemento', intentos: '1) Reddit y Stocktwits: sin red (solo WebSearch); 2) búsqueda de foros: devuelve prensa; 3) LSE Chat da 403 (lecciones)', decision: 'Omitido' }],
  _estado: { terminado: '2026-10-14' },
};
w('E', E);
// Citas cruzadas [A1] dentro de una nota: se copia la fuente a la nota y se renumera (integrar solo traduce [n] locales en las notas).
const notas = Object.fromEntries(['A', 'B', 'C', 'D', 'E'].map((L) => [L, JSON.parse(fs.readFileSync(path.join(dir, `${L}.json`), 'utf8'))]));
for (const L of ['B', 'C', 'D', 'E']) {
  const n = notas[L]; const extra = {};
  const fix = (s) => s.replace(/\[([A-E]?\d+(?:\s*[,–-]\s*[A-E]?\d+)*)\]/g, (m, g) => {
    if (!/[A-E]/.test(g)) return m;
    return '[' + g.split(/\s*,\s*/).map((tok) => {
      const parts = tok.split(/\s*[–-]\s*/); let letra = null;
      return parts.map((t) => { const mm = t.match(/^([A-E])?(\d+)$/); if (mm[1]) letra = mm[1]; const X = mm[1] ?? (parts.length > 1 ? letra : null);
        if (!X || X === L) return mm[2];
        const key = X + mm[2]; if (!extra[key]) { const f = notas[X].fuentes.find((f) => f.id === +mm[2]); if (!f) throw new Error('falta ' + key); const id = n.fuentes.length + 1; n.fuentes.push({ ...f, id }); extra[key] = id; }
        return String(extra[key]); }).join('-');
    }).join(', ') + ']';
  });
  const rec = (o) => typeof o === 'string' ? fix(o) : Array.isArray(o) ? o.map(rec) : o && typeof o === 'object' ? Object.fromEntries(Object.entries(o).map(([k, v]) => [k, rec(v)])) : o;
  const { fuentes: _f, ...resto } = n; const out = rec(resto); w(L, { ...out, fuentes: n.fuentes });
}
console.log('B, C, D, E escritos');
