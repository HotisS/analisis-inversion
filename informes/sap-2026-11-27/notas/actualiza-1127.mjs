// Puesta al día de las notas A-E del 21-oct al corte del 27-nov-2026 (SAP). Se ejecuta una vez: node actualiza-1127.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const dir = dirname(fileURLToPath(import.meta.url));
const lee = (f) => JSON.parse(readFileSync(join(dir, f), 'utf8'));
const escribe = (f, o) => writeFileSync(join(dir, f), JSON.stringify(o, null, 1));
const A = lee('A.json'), B = lee('B.json'), C = lee('C.json'), D = lee('D.json'), E = lee('E.json');
const bolsa = lee('bolsa.json'), comps = lee('D_comps.json');
const yaHecho = D.fuentes.some((f) => f.id === 41);
if (yaHecho) { console.log('Ya actualizado'); process.exit(0); }

// ---------- D: mercado y valoración ----------
D.fuentes.push(
  { id: 41, titulo: 'Estructura temporal de tipos de la deuda federal cotizada (Svensson), 10 años, 26-nov-2026: 3,32 %', editor: 'Deutsche Bundesbank', tipo: 'Primaria', fecha: '2026-11-26', url: 'https://api.statistiken.bundesbank.de/rest/data/BBSIS/D.I.ZST.ZI.EUR.S1311.B.A604.R10XX.R.A.A._Z._Z.A' },
  { id: 42, titulo: 'Share Buy-back Program 2026 (tramo 2: operaciones diarias hasta el 20-nov-2026)', editor: 'SAP SE', tipo: 'Primaria', fecha: '2026-11-20', url: 'https://www.sap.com/investors/en/stock/share-buy-back/2026.html' },
  { id: 43, titulo: 'SAP SE: previsiones financieras (finances), consulta del 27-nov-2026 (cierre del 20-nov)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-11-27', url: 'https://www.marketscreener.com/quote/stock/SAP-SE-436555/finances/' },
  { id: 44, titulo: 'SAP SE: consenso de analistas y cambios de recomendación, consulta del 27-nov-2026', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-11-27', url: 'https://www.marketscreener.com/quote/stock/SAP-SE-436555/consensus/' },
  { id: 45, titulo: 'quoteSummary (earningsTrend, financialData, defaultKeyStatistics) de SAP.DE, MSFT, ORCL, CRM, NOW, ADBE, INTU, WDAY y DSY.PA, 27-nov-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-11-27', url: 'https://query1.finance.yahoo.com/v10/finance/quoteSummary/SAP.DE' },
  { id: 46, titulo: 'Históricos diarios SAP.DE, EXS1.DE (DAX) y EXV3.DE (Stoxx Europe 600 Technology), hasta el 26-nov-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-11-26', url: 'https://finance.yahoo.com/quote/SAP.DE/history' },
  { id: 47, titulo: 'Implied ERP by month (ERPbymonth.xlsx), noviembre 2026: 4,41 %', editor: 'A. Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-11', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 48, titulo: 'Tipo de cambio de referencia EUR/USD, 26-nov-2026 (1,0975)', editor: 'Banco Central Europeo', tipo: 'Primaria', fecha: '2026-11-26', url: 'https://data-api.ecb.europa.eu/service/data/EXR/D.USD.EUR.SP00.A' },
  { id: 49, titulo: 'Thomas Saueressig to Leave SAP Executive Board', editor: 'SAP News Center', tipo: 'Primaria', fecha: '2026-11-17', url: 'https://news.sap.com/2026/11/thomas-saueressig-to-leave-sap-executive-board/' },
  { id: 50, titulo: 'SAP Confirms Cyberattack, Source Code Reportedly Compromised', editor: 'SecurityWeek', tipo: 'Prensa', fecha: '2026-11-27', url: 'https://www.securityweek.com/sap-confirms-cyberattack-source-code-reportedly-compromised/' },
  { id: 51, titulo: 'SAP, Europe\'s largest software company, is planning to cut 10,000 jobs due to AI (según Bloomberg)', editor: 'Oninvest', tipo: 'Prensa', fecha: '2026-11-26', url: 'https://en.oninvest.com/article/sap-europe-s-largest-software-company-is-planning-to-cut-10-000-jobs-due-to-ai' },
  { id: 52, titulo: 'S&P 500 Falls To 7-Month Low As Tech And AI Concerns Fuel Sell-Off', editor: 'Forbes', tipo: 'Prensa', fecha: '2026-11-20', url: 'https://www.forbes.com/sites/antoniopequenoiv/2026/11/20/sp-500-falls-to-7-month-low-as-tech-and-ai-concerns-fuel-sell-off/' },
  { id: 53, titulo: 'Históricos diarios de MSFT, ORCL, CRM, NOW, ADBE, INTU, WDAY, DSY.PA, IGV y EXV3.DE (21-oct a 26-nov-2026)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-11-26', url: 'https://finance.yahoo.com/quote/CRM/history' },
  { id: 55, titulo: 'SAP (SAP) Q3 2026 Earnings Call Transcript (Motley Fool, en AOL)', editor: 'The Motley Fool', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://www.aol.com/articles/sap-sap-q3-2026-earnings-012901000.html' },
  { id: 54, titulo: 'SAP Confirms Security Incident as Hackers Reportedly Steal GitHub Tokens and Alter Code', editor: 'Cyber Security News', tipo: 'Prensa', fecha: '2026-11-27', url: 'https://cybersecuritynews.com/sap-security-incident/' },
);

const ACC = 1149.6;
Object.assign(D.identificacion, {
  precio: bolsa.identificacion.precio, fecha_precio: bolsa.identificacion.fecha_precio, acciones: ACC,
  capitalizacion_publicada: 222646, max_52s: bolsa.identificacion.max_52s, min_52s: bolsa.identificacion.min_52s,
  volumen_medio_diario: `≈ ${bolsa.volumen_3m.importe_dia_millones.toLocaleString('es-ES')} M EUR/día (3 meses; ${(bolsa.volumen_3m.acciones_dia / 1e6).toFixed(2).replace('.', ',')} M acciones/día en Xetra)`,
  proximos_resultados: '2027-01-28',
});
D.identificacion.extra = [
  'Precio: cierre de Xetra del jueves 26-nov-2026, 194,14 EUR; la sesión del 27-nov no había cerrado a la hora del corte (192,70-192,90 EUR a media mañana, −0,7 %) [46].',
  'Máximo de 52 semanas 219,65 EUR (intradía, 5-nov-2026; 215,75 al cierre); mínimo 127,50 EUR (intradía, 23-jul-2026) [46].',
  'Acciones diluidas: estimación propia de 1.149,6 M = 1.152,3 M a 30-sep-2026 (nota del 21-oct: 1.154,2 M a 30-jun menos 8,93 M recompradas en el 3T26 más 7 M de dilución de planes) − 2,66 M recompradas en Xetra del 1-oct al 20-nov-2026 (521,9 M EUR) [42, 30].',
  'Recompra: el tramo 2 (hasta 2.600 M EUR entre el 27-jul-2026 y el 27-ene-2027) llevaba 11,59 M acciones a 177,02 EUR de media (2.051,8 M EUR) al 20-nov; el banco aceleró en la caída: 1,93 M acciones entre el 17 y el 20-nov (frente a 10.000 al día en las semanas anteriores) [42]. El programa total es de hasta 10.000 M EUR hasta el 31-dic-2027.',
  'Capitalización publicada por Yahoo a 192,90 EUR (27-nov, sesión en curso): 222.646 M EUR; con 194,14 EUR y 1.149,6 M acciones, 223.183 M [45].',
  'Próximos resultados (4T26 y año 2026): 28-ene-2027 según el calendario de Yahoo; la web de inversores no se ha podido leer, se toma como fecha probable [45].',
];
D.fuentes_identificacion_nota = undefined;

D.valoracion.puente.otros_ajustes = 522;
D.valoracion.referencia_mercado = { mercado: 'S&P 500 (prima implícita de Damodaran, válida para mercados desarrollados)', prima_implicita_pct: 4.41, fecha: '2026-11', fuente: 'Damodaran, ERPbymonth.xlsx, noviembre 2026, columna ERP (T12m with sustainable payout) [47]' };
D.valoracion.comentario = 'Puente del balance a 30-sep-2026 del Quarterly Statement [30], con el desglose de la deuda del semestral [2]. Otros ajustes: 522 M de recompras pagadas del 1-oct al 20-nov, porque las acciones son de después del balance [42].';
D.valoracion.extra = (D.valoracion.extra || []).filter((x) => !/^Acciones y caja del mismo momento/.test(x) && !/^Bund a 10/.test(x));
D.valoracion.extra.push('Acciones y caja del mismo momento: acciones estimadas a 20-nov (1.149,6 M) y caja a 30-sep menos las recompras pagadas desde entonces (522 M en otros ajustes) [42]. El flujo libre del 4T no se suma: no se conoce.');
D.valoracion.extra.push('Bund a 10 años (curva de Svensson del Bundesbank, vencimiento residual de 10 años) del 26-nov-2026: 3,32 % (3,47 % el 21-oct) [41]. Prima implícita de Damodaran de noviembre: 4,41 % (4,20 % en octubre) [47].');

// Consenso
D.consenso.estimaciones = [
  { periodo: '2026e', ingresos: 40452, ebitda: 13024, ebit: 11882, bpa: 7.18, dpa: 2.688, fuente: 'MarketScreener, consulta del 27-nov-2026 (cierre del 20-nov), tras el 3T26 [43]' },
  { periodo: '2027e', ingresos: 45310, ebitda: 14949, ebit: 13845, bpa: 8.175, dpa: 3.021, fuente: 'MarketScreener, consulta del 27-nov-2026 [43]' },
  { periodo: '2028e', ingresos: 50880, ebitda: 17170, ebit: 16161, bpa: 9.642, dpa: 3.397, fuente: 'MarketScreener, consulta del 27-nov-2026 [43]' },
];
D.consenso.recomendaciones = { n_analistas: 29, comprar: null, mantener: null, vender: null, po_medio: 243.54, po_min: 198.84, po_max: 290 };
D.consenso.revisiones = 'Consenso a 27-nov-2026, ya con el 3T26. Frente al 21-oct (antes de los resultados): BPA 2026e de 7,03 a 7,18 EUR (+2,1 %), 2027e de 8,07 a 8,18 (+1,3 %) y 2028e de 9,49 a 9,64 (+1,6 %); ingresos 2026e de 40.302 a 40.452 M y EBITDA de 12.800 a 13.024 M [35, 43]. Yahoo da 7,16 y 8,49 EUR para 2026e y 2027e (24 y 23 analistas; hace 90 días, 7,13 y 8,37): mismo sentido, al alza [45]. El objetivo medio sube de 215,76 a 243,54 EUR (29 analistas, mínimo 198,84 y máximo 290), un 25,4 % sobre el cierre del 26-nov [44]. Cambios desde los resultados: subidas de objetivo de Goldman Sachs (258, comprar), Berenberg (240), Deutsche Bank (235) y Jefferies (220) el 22-23-oct, y JPMorgan pasa de neutral a sobreponderar con 275 EUR el 9-nov; DZ Bank sigue en vender y UBS en neutral [44]. Recomendación media: comprar. El desglose comprar/mantener/vender del 27-nov no se ha podido leer (Investing no abre); el del 21-oct era 23/5/0 [37].';
D.consenso.guidance = D.consenso.guidance.replace('No hay guía nueva de 2027-2028 en cifras.', 'No hay guía nueva de 2027-2028 en cifras. En la conferencia del 21-oct el director financiero matizó 2027: el 4T concentra la mitad de la contratación del año y la incertidumbre política y macro «podría pesar» en ella y en la trayectoria de 2027; los servicios seguirán cayendo; la parte alta del backlog del 4T sería «un 24 % o así» a divisa constante; y aun así mantiene que el crecimiento de los ingresos se acelerará en 2027 [55].');

// Bolsa
Object.assign(D.bolsa, {
  rentabilidades: bolsa.bolsa.rentabilidades, anual: bolsa.bolsa.anual, beta: bolsa.bolsa.beta, volatilidad_pct: bolsa.bolsa.volatilidad_pct, max_drawdown_pct: bolsa.bolsa.max_drawdown_pct,
  comentario: 'Rentabilidad total a 26-nov-2026 de la acción, del DAX (EXS1.DE) y del sector (Stoxx Europe 600 Technology, EXV3.DE) [46]. SAP pierde un 5,2 % en el año frente al +0,2 % del DAX y el +6,7 % del sector, y un 4,6 % a un año. Tras los resultados del 3T26 subió un 3,2 % el 22-oct y marcó máximo de 52 semanas el 5-nov (219,65 EUR intradía), pero entre el 17 y el 20-nov cayó un 13,9 % (de 213,40 a 183,68 EUR) en una venta general de la tecnología por el temor al gasto en IA financiado con deuda (el Nasdaq cayó un 5,3 % el 20-nov y el S&P 500 un 10,4 % en un mes) [52, 46]. En esos cuatro días el software cayó igual o más: Salesforce −15,9 %, Oracle −15,0 %, Dassault −13,3 %, ServiceNow −11,8 %, Workday −10,1 %, Stoxx Europe 600 Technology −9,4 % [53]. El 17-nov coincidió además con el anuncio de la salida de Thomas Saueressig del Executive Board [49]. A tres y cinco años sigue en línea o por delante del DAX.',
  extra: [
    'Rentabilidad total en el año a 26-nov-2026: SAP −5,2 %, DAX +0,2 %, Stoxx Europe 600 Technology +6,7 %; a un año: −4,6 %, +3,3 % y +8,6 % [46].',
    'Beta mensual a 5 años frente al DAX (EXS1.DE) 1,16 (ajustada 1,11); semanal 5 años 0,98; semanal 2 años 1,04 [46].',
    'Volatilidad diaria anualizada a un año 42,0 %; de 60 sesiones, 29,9 % [46].',
    'Mayores caídas diarias de 12 meses: −16,1 % el 29-ene-2026 (resultados del 4T25), −6,8 % el 9-abr, −6,5 % el 11-jun, −6,1 % el 23-abr y −5,6 % el 17-nov (precio) [46].',
    'Del 21-oct al 26-nov: SAP −7,0 %; software de EE. UU. (ETF IGV) −12,7 %; Salesforce −18,4 %, Oracle −19,6 %, Intuit −19,0 %, Workday −11,1 %, Microsoft −8,1 %, Dassault −5,6 %; DAX −0,9 % [53, 46].',
  ],
  contexto: {
    movimiento: { fecha: '2026-11-27', var_1m_pct: -7.7, var_3m_pct: 4.7, var_6m_pct: 17.3, var_12m_pct: -7.5, dist_max_52s_pct: -10.6, dist_min_52s_pct: 50.3, dist_max_historico_pct: -31.2, tendencia: 'alcista', volatilidad_60d_pct: 29.9, avisos: [] },
    movimientos_fuertes: [
      { periodo: 'jun-2026', var_pct: -20.2, causa: 'Caída de un mes hasta el 30-jun dentro de la venta de todo el software de aplicaciones por el temor a que los agentes de IA canibalicen las licencias por usuario; sin causa propia de SAP (informe del 21-oct) [32].', veredicto: 'no cambia', condicion: null },
      { periodo: '24-jul a 21-ago-2026', var_pct: 46.6, causa: 'Rebote desde el mínimo de 127,50 EUR: 2T26 mejor de lo temido (backlog +27 %) y arranque del tramo 2 de la recompra el 27-jul [1, 39, 32].', veredicto: 'no cambia', condicion: null },
      { periodo: '17 a 20-nov-2026', var_pct: -13.9, causa: 'Cuatro sesiones a la baja (−5,6 %, −3,8 %, −3,6 % y −1,8 %) en una venta general de la tecnología y del software por el temor al gasto en IA financiado con deuda; los rivales cayeron igual o más (Salesforce −15,9 %, Oracle −15,0 %, Dassault −13,3 %) [52, 53]. El primer día coincidió con la salida anunciada del director de clientes, que no cambia cifras [49]. Ningún dato propio nuevo de SAP; el banco de la recompra aceleró las compras (1,93 M acciones en cuatro días) [42].', veredicto: 'no cambia', condicion: null },
    ],
    noticias: [
      { fecha: '2026-11-27', tipo: 'demanda o regulador', hecho: 'Ciberataque («Project Granite»), adelantado por Der Spiegel el 26-nov: según una fuente interna, los atacantes robaron credenciales de empleados y copiaron y alteraron código fuente en GitHub. SAP confirma que investiga un incidente y que «hasta ahora» no hay indicios de acceso a datos de negocio de clientes; no dice si el código alterado llegó a productos entregados. Según Handelsblatt, cambió claves de firma, limitó el acceso a GitHub y paró procesos automáticos de desarrollo [50, 54]. Si el código manipulado hubiera llegado a software de clientes (un ataque a la cadena de suministro), el daño a la confianza, las reclamaciones y los costes podrían mover el precio bastante más de un 5 %; con lo publicado no hay pruebas de ello. A media mañana del 27-nov la acción cedía un 0,7 % [46].', veredicto: 'retrasa', condicion: 'Hasta que SAP (o un informe forense o del supervisor) confirme que el código alterado no llegó a productos entregados a clientes, o hasta el siguiente comunicado de SAP sobre el incidente si confirma el alcance limitado.' },
      { fecha: '2026-11-26', tipo: 'rumor', hecho: 'Bloomberg publica que SAP prepara un recorte de al menos 10.000 empleos (≥ 9 % de la plantilla) en una reorganización centrada en la IA; SAP no lo confirma ni lo niega. La reestructuración de 2024 costó ≈ 3.000 M EUR. La acción subió más de un 2 % ese día [51, 46]. Si se confirma, el cargo pesaría en el BPA NIIF de 2027 (no en el de 2028 que usamos para el objetivo) y el ahorro casa con el objetivo de hasta 3.000 M de eficiencias en dos años citado en la conferencia del 3T [55].', veredicto: 'no cambia', condicion: null },
      { fecha: '2026-11-17', tipo: 'directivos', hecho: 'Thomas Saueressig, director de clientes (Chief Customer Officer) y miembro del Executive Board, deja SAP para buscar «una nueva oportunidad» (según Bloomberg, consejero delegado de Ionos); sigue hasta finales de marzo de 2027 y Emmanuel Raptopoulos (presidente de EMEA, MEE y APAC) asume sus funciones de forma interina desde enero; el sucesor definitivo, pendiente [49]. Es la cuarta salida del Executive Board en dos años y medio, además de la de Alam en 2027.', veredicto: 'no cambia', condicion: null },
      { fecha: '2026-11-09', tipo: 'recomendación', hecho: 'JPMorgan sube SAP a sobreponderar (objetivo 275 EUR); tras los resultados subieron objetivo Goldman Sachs (258), Berenberg (240), Deutsche Bank (235) y Jefferies (220); DZ Bank mantiene vender. Objetivo medio 243,54 EUR (29 analistas) frente a 215,76 el 21-oct [44].', veredicto: 'no cambia', condicion: null },
      { fecha: '2026-11-20', tipo: 'directivos', hecho: 'Recompra: 11,59 M acciones a 177,02 EUR de media en el tramo 2 (2.051,8 M de 2.600 M EUR) al 20-nov; quedan ≈ 548 M hasta el 27-ene-2027 [42]. No se han encontrado operaciones de directivos nuevas desde el 21-oct en las notificaciones EQS-DD consultadas.', veredicto: 'no cambia', condicion: null },
      { fecha: '2026-10-21', tipo: 'resultados', hecho: 'Resultados del 3T26: ingresos 10.270 M (+13 %), nube +26 %, current cloud backlog 24.144 M (+26 % a divisa constante), resultado no NIIF 3.030 M (+18 %); guía de nube a la parte alta del rango. La acción subió un 3,2 % el 22-oct [30, 46].', veredicto: 'no cambia', condicion: null },
    ],
    proximos_resultados: '2027-01-28',
    veredicto: 'retrasa',
    condicion: 'Hasta que SAP aclare el alcance del ciberataque (que el código alterado no llegó a productos entregados a clientes). Si lo confirma, el veredicto vuelve a «no cambia» sin tocar el límite.',
    comentario: 'La acción baja un 7,7 % en un mes (sin aviso P1-P5) y queda un 10,6 % bajo el máximo de 52 semanas, con tendencia aún alcista (15 % sobre la media de 200 sesiones). La caída del 17 al 20-nov (−13,9 %) es de sector y de mercado, no propia: Salesforce, Oracle, Dassault y ServiceNow cayeron igual o más [52, 53]. No hay colocaciones, ampliaciones ni ofertas pendientes y el consenso sube estimaciones y objetivos. El hecho pendiente es el ciberataque confirmado el 26-27-nov: mientras no se sepa si el código manipulado llegó a clientes, el veredicto es «retrasa». El recorte de plantilla que publica Bloomberg es un rumor sin confirmar que, de producirse, pesaría en el BPA NIIF de 2027 y no en el de 2028. Próximos resultados: 28-ene-2027 (probable) [45, 50, 51].',
  },
});

// Comparables (rehechos con el consenso posterior a sus resultados)
D.comparables.empresas = comps.map(({ _precio, _bpa_ntm_ajustado_yahoo, _bpa_ntm_con_sbc, _sbc_pct, _peso_ej0, ...c }) => c);
D.comparables.comentario = 'Rehechos el 27-nov-2026 con el consenso de Yahoo Finance posterior a los resultados de cada una (earningsTrend: BPA e ingresos del ejercicio en curso y del siguiente, ponderados por los meses que caen en los próximos 12) y su precio, deuda, caja, EBITDA, ingresos y flujo libre de los últimos 12 meses [45]; los de EE. UU. convertidos a 1,0975 USD/EUR [48]. Para medir lo mismo que el BPA de SAP (cuyo no NIIF incluye los pagos en acciones), al BPA ajustado de las americanas se le restan los pagos en acciones de su último 10-K en porcentaje de las ventas (Oracle 7,1 %, Salesforce 8,5 %, ServiceNow 14,7 %, Adobe 8,2 %, Intuit 9,6 %, Workday 17,0 %; Microsoft no ajusta) [21]; Dassault queda sin corregir, como en el informe anterior. El EBITDA de los próximos 12 meses es estimación propia: el de los últimos 12 por el crecimiento de los ingresos esperado (margen constante). Mediana del PER de los próximos 12 meses: 17,9x (23,3x el 21-oct): el software se ha abaratado mucho más que SAP desde entonces [53].';

// ---------- A: transcripción del 3T26 ----------
const nA = A.fuentes.length;
A.fuentes.push(
  { id: nA + 1, titulo: 'SAP (SAP) Q3 2026 Earnings Call Transcript (Motley Fool, en AOL)', editor: 'The Motley Fool', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://www.aol.com/articles/sap-sap-q3-2026-earnings-012901000.html' },
  { id: nA + 2, titulo: 'SAP Quarterly Statement Q3 2026 (6-K, exhibit 99.1, presentado el 26-oct-2026)', editor: 'SAP SE / SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-26', url: 'https://www.sec.gov/Archives/edgar/data/1000184/000110465926118617/tm2628113d1_ex99-1.htm' },
);
console.log('A: transcripción = A' + (nA + 1) + ', 6-K = A' + (nA + 2));
const T = nA + 1, K = nA + 2;
A.trimestres.ultima_presentacion = A.trimestres.ultima_presentacion.replace(/La conferencia empezó a las 23:00 del 21-oct y no hay transcripción a la fecha de corte\. El ADR, que cerró en 232,73 USD, cotizaba a 242,15 USD \(\+4,0 %\) en la negociación posterior al cierre hacia las 22:35 de Madrid \[16\]\./,
  `El 6-K con el comunicado se presentó en EDGAR el 26-oct [${K}].\n\n**Conferencia del 3T26 (transcripción).** El tono cambia frente al 2T: menos costes y más contratación del 4T. El director financiero insistió en que el 4T concentra la mitad de la contratación anual y que la incertidumbre política y macro (petróleo de 60 a 110 USD, tipos de EE. UU. por encima del 5 %) «podría pesar» en ella y en la aceleración de 2027, que mantiene «como plan» pero «más exigente» por la base más alta de 2026 y la caída de los servicios, que seguirá [${T}]. A Morgan Stanley le dijo que la parte alta del backlog del 4T sería «un 24 % o así» a divisa constante (26 % en el 3T); a Bernstein, que la nube del 4T crecerá en torno al 23 % por bases de comparación y el fin del efecto de SmartRecruiters. A UBS reconoció que los créditos de migración empezarán a pesar en el flujo libre y que las cuentas a cobrar están «altas para mi gusto» (clientes que pagan más despacio con tipos altos), sin tocar la guía de 10.000 M [${T}]. En márgenes, el consejero delegado habló de hasta 3.000 M de eficiencias por IA en dos años y de recortar contratistas en la operación de la nube; el director financiero reiteró gastos al 80-90 % del crecimiento de los ingresos y avisó de que las compras restan margen operativo [${T}]. No cuantificaron la aportación de la IA a los ingresos ni el efecto de los modelos de consumo sobre el backlog (dijeron que en 2027 seguirá siendo «bastante tradicional») [${T}].`);
A.trimestres.extra = A.trimestres.extra || {};

// ---------- C: directivos ----------
const nC = C.fuentes.length;
C.fuentes.push({ id: nC + 1, titulo: 'Thomas Saueressig to Leave SAP Executive Board', editor: 'SAP News Center', tipo: 'Primaria', fecha: '2026-11-17', url: 'https://news.sap.com/2026/11/thomas-saueressig-to-leave-sap-executive-board/' });
const sa = C.directivos.equipo.find((e) => /Saueressig/.test(e.nombre));
if (sa) sa.trayectoria = (sa.trayectoria || '') + ` El 17-nov-2026 SAP anunció su salida del Executive Board (sigue hasta finales de marzo de 2027; Emmanuel Raptopoulos asume sus funciones de forma interina desde enero, sucesor definitivo pendiente) [${nC + 1}].`;
C.directivos.comentario = C.directivos.comentario.replace('y Alam se irá en 2027, con Klein asumiendo parte de producto y sin sucesor anunciado a 21-oct [4, 6, 24].', `Alam se irá en 2027, con Klein asumiendo parte de producto, y el 17-nov-2026 se anunció la salida de Saueressig (clientes) a finales de marzo de 2027, con un interino desde enero [4, 6, 24, ${nC + 1}].`);
C.gobierno.alertas = C.gobierno.alertas.map((a) => a.startsWith('Rotación en el Executive Board') ? a.replace('Muhammad Alam no renovará y se irá en 2027 [4, 6].', `Muhammad Alam no renovará y se irá en 2027; Thomas Saueressig (clientes) se irá a finales de marzo de 2027, con Emmanuel Raptopoulos como interino desde enero [4, 6, ${nC + 1}].`) : a);
C.gobierno.alertas.push(`Noviembre de 2026: ciberataque confirmado por SAP («Project Granite»; código fuente copiado y alterado en GitHub según Der Spiegel); SAP no ve acceso a datos de clientes y la investigación sigue (nota D, fuentes 50 y 54).`);

// ---------- E: sentimiento ----------
const nE = E.fuentes.length;
E.fuentes.push(
  { id: nE + 1, titulo: 'Stocktwits: flujo de mensajes de $SAP (30 últimos, 3 a 27-nov-2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-11-27', url: 'https://api.stocktwits.com/api/2/streams/symbol/SAP.json' },
  { id: nE + 2, titulo: 'Seeking Alpha: titulares y artículos de SAP (RSS, 21-oct a 26-nov-2026)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-11-26', url: 'https://seekingalpha.com/api/sa/combined/SAP.xml' },
);
E.sentimiento.revisadas = [
  { plataforma: 'Stocktwits ($SAP)', fecha: '2026-11', n_comentarios: 30, tono: 'Dividido', resumen: `Pocos mensajes con postura marcada (3 alcistas y 2 bajistas de 30). Domina la duda de si los clientes pagarán la IA encima de una migración cara («el ERP es la factura que no se cancela; el agente de IA es la que sí») y, en la caída del 17-19-nov, quien la ve como «sasspocalipsis» frente a quien subraya que aguantó mejor que el Nasdaq; el 27-nov aparece el ciberataque [${nE + 1}].` },
  { plataforma: 'Seeking Alpha (artículos y noticias)', fecha: '2026-11', n_comentarios: 12, tono: 'Dividido', resumen: `Tras los resultados, titulares de que SAP «tumba» la narrativa de la disrupción por IA y de Oppenheimer contando a SAP entre los «ganadores» de la IA (9-nov); a la vez, un artículo rebaja a «recortar en el rebote» por el euro, y el 26-nov el recorte de 10.000 empleos [${nE + 2}].` },
  ...E.sentimiento.revisadas.slice(0, 4),
];
E.sentimiento.tendencia = 'Estable';
E.sentimiento.temas.push({ tema: 'Ciberataque y recorte de plantilla (finales de noviembre)', postura: 'Dividida', peso: 'Medio', contraste: `El recorte de 10.000 empleos se lee como bueno para los costes [${nE + 1}]; el ciberataque se comenta sin datos. Los hechos: SAP confirma el incidente y no ve acceso a datos de clientes; no ha dicho si el código alterado llegó a productos (nota D). El recorte no está confirmado.` });
E.sentimiento.lectura = `El sentimiento sigue dividido y no es extremo: tras el 3T26 mejoró en prensa y analistas (subidas de objetivo, JPMorgan a sobreponderar), mientras los particulares siguen con la duda de fondo de si la IA se come el software de aplicaciones, que la venta del 17-20-nov reavivó en todo el sector [${nE + 1}, ${nE + 2}]. No hay euforia ni capitulación. Lo nuevo es el ciberataque, que los foros apenas han digerido y que el informe trata como hecho pendiente (regla 13). Ninguna cifra sale de aquí.`;

escribe('A.json', A); escribe('B.json', B); escribe('C.json', C); escribe('D.json', D); escribe('E.json', E);
console.log('Notas actualizadas');
