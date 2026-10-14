// Escribe las notas A-E de Interpump (corte 2026-10-14). Hechos con fuente; los juicios van en propio.mjs.
import { writeFileSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const DIR = dirname(fileURLToPath(import.meta.url));
const w = (letra, obj) => writeFileSync(join(DIR, `${letra}.json`), JSON.stringify({ _estado: 'completa', ...obj }, null, 1));

// ---------------- Fuentes comunes ----------------
const AR25 = { titulo: 'Relazione finanziaria annuale 2025 (bilancio consolidato, note, informativa di settore, sintesi dei risultati) en formato ESEF', editor: 'Interpump Group S.p.A. (repositorio filings.xbrl.org)', tipo: 'Primaria', fecha: '2026-03', url: 'https://filings.xbrl.org/815600C79D0F31F4D395/2025-12-31/ESEF/IT/0/815600C79D0F31F4D395-2025-12-31-1-it/reports/815600C79D0F31F4D395-2025-12-31-1-it.xhtml' };
const AR23 = { titulo: 'Relazione finanziaria annuale 2023 (ESEF): sintesi dei risultati 2014-2023, informativa di settore, debiti finanziari', editor: 'Interpump Group S.p.A. (repositorio filings.xbrl.org)', tipo: 'Primaria', fecha: '2024-03', url: 'https://filings.xbrl.org/815600C79D0F31F4D395/2023-12-31/ESEF/IT/0/815600C79D0F31F4D395-2023-12-31-it/reports/815600C79D0F31F4D395-2023-12-31-it.xhtml' };
const AR22 = { titulo: 'Relazione finanziaria annuale 2022 (ESEF): informativa di settore 2021-2022, debiti finanziari', editor: 'Interpump Group S.p.A. (repositorio filings.xbrl.org)', tipo: 'Primaria', fecha: '2023-03', url: 'https://filings.xbrl.org/815600C79D0F31F4D395/2022-12-31/ESEF/IT/0/815600C79D0F31F4D395-2022-12-31-it/reports/815600C79D0F31F4D395-2022-12-31-it.xhtml' };
const Q4 = { titulo: 'Interpump approves consolidated Q4 results and the preliminary data for FY 2025; objectives 2026-2028', editor: 'Interpump Group S.p.A. (eMarket Storage)', tipo: 'Primaria', fecha: '2026-02-13', url: 'https://www.emarketstorage.it/sites/default/files/comunicati/2026-02/20260213_177483.pdf' };
const P4Q = { titulo: '4Q-2025 preliminary financial results (presentación a analistas)', editor: 'Interpump Group S.p.A. (eMarket Storage)', tipo: 'Primaria', fecha: '2026-02-13', url: 'https://www.emarketstorage.it/sites/default/files/comunicati/2026-02/20260213_177484.pdf' };
const T4Q = { titulo: '4Q 2025 results conference call transcript', editor: 'Interpump Group S.p.A.', tipo: 'Primaria', fecha: '2026-02-17', url: 'https://www.interpumpgroup.it/sites/default/files/documents/ip_4q2025_results_conference_call_transcript_17_february_2026.pdf' };
const Q1 = { titulo: '1Q2026 Financial Results (presentación y datos del primer trimestre)', editor: 'Interpump Group S.p.A. (eMarket Storage)', tipo: 'Primaria', fecha: '2026-05-15', url: 'https://www.emarketstorage.it/sites/default/files/comunicati/2026-05/20260515_184279.pdf' };
const Q2 = { titulo: 'Interpump approves consolidated results for the second quarter of 2026 (cuenta, balance y flujos del 1S26)', editor: 'Interpump Group S.p.A. (eMarket Storage)', tipo: 'Primaria', fecha: '2026-08-05', url: 'https://www.emarketstorage.it/sites/default/files/comunicati/2026-08/20260805_187925.pdf' };
const T2Q = { titulo: 'Second Quarter 2026 Financial Results Conference Call (transcripción)', editor: 'Interpump Group S.p.A.', tipo: 'Primaria', fecha: '2026-08-05', url: 'https://www.interpumpgroup.it/sites/default/files/documents/ip_2026_2q_transcript.pdf' };
const FY20 = { titulo: 'Risultati bilancio 2020 (EBITDA 294,1 M; BPA 1,596; dividendo 0,26 EUR; 21,7 M de revalorizaciones fiscales en el beneficio)', editor: 'Interpump Group S.p.A.', tipo: 'Primaria', fecha: '2021-03-19', url: 'https://www.interpumpgroup.it/download/comunicati/2021-03-19 Risultati bilancio 2020.pdf' };
const FY19 = { titulo: 'Risultati bilancio 2019 (BPA 1,699 frente a 1,619 en 2018; 11,4 M de ingresos no recurrentes en 2018)', editor: 'Interpump Group S.p.A.', tipo: 'Primaria', fecha: '2020-03-16', url: 'https://www.interpumpgroup.it/download/comunicati/2020-03-16 Risultati bilancio 2019.pdf' };
const XBRL = (y, url) => ({ titulo: `Informe anual ${y} en formato ESEF (XBRL), repositorio filings.xbrl.org`, editor: 'Interpump Group S.p.A. / XBRL International', tipo: 'Primaria', fecha: `${y + 1}-03`, url });
const WD = { titulo: 'Closing White Drive: valor empresa de 278 M EUR con un EBITDA de 53 M a 12 meses', editor: 'Interpump Group S.p.A.', tipo: 'Primaria', fecha: '2021-10-01', url: 'https://www.interpumpgroup.it/download/comunicati/2021-10-01 Closing WD_EN.pdf' };
const CONSOB = { titulo: 'Interpump Group SpA: azionariato (partecipazioni rilevanti ex art. 120 TUF, situación al 12-abr-2026)', editor: 'CONSOB', tipo: 'Primaria', fecha: '2026-04-12', url: 'https://www.consob.it/web/area-pubblica/w/interpump-group-spa-azionariato-1' };
const AGM = { titulo: 'Interpump Group, utili solidi e dividendo in crescita: Montipò confermato presidente esecutivo (junta del 30-abr-2026)', editor: 'Stampa Reggiana', tipo: 'Prensa', fecha: '2026-04-30', url: 'https://www.stampareggiana.it/2026/04/30/interpump-group-utili-solidi-e-dividendo-in-crescita-montipo-confermato-presidente/' };
const MASTR = { titulo: 'Interpump, cessato il rapporto di lavoro con il dirigente Riccardo Mastronardi (dirigente con responsabilità strategiche, 5-oct-2026)', editor: 'Teleborsa (Borsa Italiana)', tipo: 'Prensa', fecha: '2026-10-06', url: 'https://www.borsaitaliana.it/borsa/notizie/teleborsa/finanza/interpump-cessato-il-rapporto-di-lavoro-con-il-dirigente-riccardo-mastronardi-189_2026-10-06_TLB.html?lang=it' };
const MSNEWS = { titulo: 'Interpump Group S.p.A.: últimas noticias (salida del índice FTSE All-World, cambios de recomendación, compras de MVV y Teknoice)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/INTERPUMP-GROUP-S-P-A-408413/news/' };
const MF = { titulo: 'Interpump, conti robusti e shopping sostanzioso: parla il presidente Montipò (deuda cero en tres años, más compras)', editor: 'Milano Finanza', tipo: 'Prensa', fecha: '2026-02-27', url: 'https://www.milanofinanza.it/news/interpump-conti-robusti-e-shopping-sostanzioso-parla-il-presidente-montipo-202602272140549891' };
const WIKI = { titulo: 'Interpump Group (historia y compras desde 1977)', editor: 'Wikipedia', tipo: 'Prensa', fecha: '2026', url: 'https://en.wikipedia.org/wiki/Interpump_Group' };
const ZB = { titulo: 'Interpump Group: finances (estimaciones 2026-2028 de ventas, EBITDA, EBIT, beneficio, BPA, dividendo y deuda neta; 8 analistas, objetivo medio 46,56 EUR)', editor: 'Zonebourse (MarketScreener)', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.zonebourse.com/cours/action/INTERPUMP-GROUP-S-P-A-41674324/finances/' };
const YH = { titulo: 'Históricos diarios de IP.MI, FTSEMIB.MI y EXH4.DE (precio, rango, volumen, betas, cierres de ejercicio)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/IP.MI/history' };
const YHC = { titulo: 'Datos de cotización, PER adelantado y series fundamentales de Interpump y de los comparables (quoteSummary y fundamentals-timeseries)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/IP.MI/key-statistics' };
const BUND = { titulo: 'Estructura temporal de tipos de la deuda federal alemana, vencimiento residual de 10 años (3,51 % el 14-oct-26)', editor: 'Deutsche Bundesbank', tipo: 'Primaria', fecha: '2026-10-14', url: 'https://api.statistiken.bundesbank.de/rest/data/BBSIS/D.I.ZST.ZI.EUR.S1311.B.A604.R10XX.R.A.A._Z._Z.A?format=csv&lastNObservations=5&lang=en' };
const DAMO = { titulo: 'Implied ERP by month (ERP T12m with sustainable payout, oct-2026: 4,20 %)', editor: 'A. Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' };
const CAL = { titulo: 'Interpump Group: calendario finanziario 2026 (resoconto al 30-sep el 13-nov-2026)', editor: 'Soldionline', tipo: 'Prensa', fecha: '2026-05-18', url: 'https://www.soldionline.it/notizie/azioni-italia/interpump-group-calendario-finanziario-2026' };
const FICHA = { titulo: 'Ficha sectorial «Hidráulica y bombas industriales» (sectores/hidraulica-bombas-2026-10-14.md)', editor: 'Análisis propio', tipo: 'Sectorial', fecha: '2026-10-14', url: 'https://github.com/HotisS/analisis-inversion/blob/main/sectores/hidraulica-bombas-2026-10-14.md' };
const MNM = { titulo: 'Hydraulics Market: 38.980 M USD en 2024 y 44.260 M USD en 2030 (2,4 % anual)', editor: 'MarketsandMarkets', tipo: 'Sectorial', fecha: '2025', url: 'https://www.marketsandmarkets.com/Market-Reports/hydraulics-market-209607944.html' };
const GII = { titulo: 'Hydraulics Market by Product (44.920 M USD en 2025; 55.730 M USD en 2030; 4,38 % anual)', editor: 'Research and Markets vía Global Information Inc.', tipo: 'Sectorial', fecha: '2025', url: 'https://www.giikorea.co.kr/report/ires1600938-hydraulics-market-by-product-hydraulic.html' };
const MRF = { titulo: 'High Pressure Pumps Market (3.860 M USD en 2025; 3,2 % anual 2026-2035)', editor: 'Market Research Future', tipo: 'Sectorial', fecha: '2025', url: 'https://www.marketresearchfuture.com/reports/high-pressure-pumps-market-1880' };
const PTO = { titulo: 'Power Take Off (PTO) Market (2.300 M USD en 2025; 5,97 % anual hasta 2032)', editor: 'Report Prime', tipo: 'Sectorial', fecha: '2025', url: 'https://www.reportprime.com/power-take-off-pto-r7709' };
const EATON = { titulo: 'Danfoss formally completes US$3.3 billion acquisition of Eaton’s Hydraulics business (1.800 M USD de ventas en 2020)', editor: 'Danfoss (Business Wire)', tipo: 'Primaria', fecha: '2021-08-02', url: 'https://www.businesswire.com/news/home/20210802005512/en/Danfoss-Formally-Completes-US3.3-Billion-Acquisition-of-Eaton%e2%80%99s-Hydraulics-Business' };
const EATON2 = { titulo: 'Danfoss completes €3bn acquisition of Eaton’s hydraulics business', editor: 'European Rubber Journal', tipo: 'Prensa', fecha: '2021-08', url: 'https://www.european-rubber-journal.com/article/2071425/danfoss-completes-3bn-acquisition-of-eaton-s-hydraulics-business' };
const SEEPEX = { titulo: 'Ingersoll Rand to acquire Seepex GmbH (431,5 M EUR; ventas de unos 160 M EUR)', editor: 'Ingersoll Rand (Business Wire)', tipo: 'Primaria', fecha: '2021-06-21', url: 'https://www.businesswire.com/news/home/20210621005237/en/Ingersoll-Rand-to-Acquire-Seepex-GmbH-into-Precision-and-Science-Technologies-Segment/' };
const CHART = { titulo: 'Baker Hughes to acquire Chart Industries (13.600 M USD de valor empresa; ventas 2024 de 4.200 M y EBITDA ajustado de 1.000 M)', editor: 'Hydrocarbon Engineering', tipo: 'Prensa', fecha: '2025-07-29', url: 'https://www.hydrocarbonengineering.com/gas-processing/29072025/baker-hughes-to-acquire-chart-industries/' };
const SA = { titulo: 'Interpump Group S.p.A. (IPGLF): news and analysis feed (transcripciones y notas de resultados)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-08', url: 'https://seekingalpha.com/api/sa/combined/IPGLF.xml' };
const MONEY = { titulo: 'Questo grafico svela perché questa azione di Piazza Affari salirà ancora (Interpump)', editor: 'Money.it', tipo: 'Foros y redes', fecha: '2026', url: 'https://www.money.it/questo-grafico-svela-perche-questa-azione-di-piazza-affari-salira-ancora-del-26' };
const EQUITA = { titulo: 'Interpump, Equita taglia target price con scenario 2026 più prudente su recupero ciclico', editor: 'Teleborsa', tipo: 'Foros y redes', fecha: '2026-04-30', url: 'https://www.teleborsa.it/News/2026/04/30/interpump-equita-taglia-target-price-con-scenario-2026-piu-prudente-su-recupero-ciclico-113.html' };
const WEBSIM = { titulo: 'INTERPUMP - Confermiamo la raccomandazione positiva (comentario tras el 1T26)', editor: 'Websim (Intermonte)', tipo: 'Foros y redes', fecha: '2026-05', url: 'https://www.websim.it/azioni/small-mid-cap/notizie/interpump-confermiamo-la-raccomandazione-positiva/' };
const MF2 = { titulo: 'Interpump riduce i margini ma conferma le stime 2026 (MF, 6-ago-2026)', editor: 'Milano Finanza', tipo: 'Foros y redes', fecha: '2026-08-06', url: 'https://www.milanofinanza.it/news/interpump-riduce-i-margini-ma-conferma-le-stime-2026-2713397' };
const TB1Q = { titulo: 'Interpump, margini in leggero calo nel primo trimestre, ricavi a 525 milioni di euro', editor: 'Teleborsa', tipo: 'Foros y redes', fecha: '2026-05-15', url: 'https://www.teleborsa.it/News/2026/05/15/interpump-margini-in-leggero-calo-nel-primo-trimestre-ricavi-a-525-milioni-di-euro-133.html' };

// ---------------- A. Cuentas ----------------
// XBRL (cuentas.mjs) + gastos comerciales (SellingExpense, no estaba en el XBRL) + EBITDA y amortizaciones de la sintesi dei risultati.
// BPA = básico publicado (sintesi dei risultati); acciones = beneficio ÷ BPA.
const c = (periodo, ingresos, coste_ventas, gastos_generales, ebitda, ebit, resultado_financiero, bai, impuestos, minoritarios, beneficio_neto, gastos_financieros, bpa, dpa) =>
  ({ periodo, ingresos, coste_ventas, gastos_generales, ebitda, amortizaciones: Math.round((ebitda - ebit) * 10) / 10, ebit, resultado_financiero, bai, impuestos, minoritarios, beneficio_neto, gastos_financieros, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa, dpa, dpa_extraordinario: 0, acciones_diluidas: Math.round(beneficio_neto / bpa * 10) / 10 });
const cuenta = [
  c('2021', 1604.3, 1029.6, 293.9, 379.8, 295.0, -19.5, 275.5, 77.0, 2.6, 195.9, 34.4, 1.836, 0.28),
  c('2022', 2078.0, 1353.5, 356.3, 492.3, 384.0, -15.3, 368.7, 98.9, 3.3, 266.5, 47.4, 2.524, 0.30),
  c('2023', 2240.0, 1460.1, 384.3, 536.7, 428.8, -51.0, 377.8, 100.3, 3.2, 274.3, 78.2, 2.565, 0.32),
  c('2024', 2078.4, 1364.8, 401.0, 456.6, 337.8, -26.8, 311.0, 82.6, 1.4, 227.1, 62.4, 2.124, 0.33),
  c('2025', 2070.7, 1339.9, 426.2, 462.0, 336.6, -37.8, 298.8, 89.1, 1.6, 208.1, 65.3, 1.955, 0.35),
];
const bal = (periodo, activo_total, activo_corriente, pasivo_corriente, pasivo_total, fondo_comercio, intangibles, inmovilizado_material, existencias, clientes, proveedores, caja, deuda_financiera, arrendamientos, patrimonio_neto, minoritarios, reservas) =>
  ({ periodo, activo_total, activo_corriente, pasivo_corriente, pasivo_total, fondo_comercio, intangibles, inmovilizado_material, existencias, clientes, proveedores, activos_contrato: null, pasivos_contrato: null, caja, deuda_financiera, arrendamientos, patrimonio_neto, minoritarios, reservas });
// Deuda financiera = debiti bancari + finanziamenti + obbligazioni + altri, sin leasing (nota de deudas financieras de cada informe).
const historicoBalance = [
  bal('2021', 2777.3, 1296.8, 681.3, 1437.7, 734.7, 60.3, 613.7, 516.0, 361.9, 285.2, 349.0, 758.0, 85.9, 1328.2, 11.5, 1197.2),
  bal('2022', 3131.1, 1555.0, 817.2, 1564.9, 754.9, 61.9, 681.1, 683.8, 433.8, 312.2, 358.3, 822.3, 77.8, 1553.5, 12.6, 1434.1),
  bal('2023', 3244.0, 1519.7, 787.2, 1441.1, 784.6, 70.8, 785.9, 696.4, 414.8, 262.9, 334.5, 735.9, 85.1, 1793.6, 9.3, 1673.8),
  bal('2024', 3391.8, 1570.2, 698.5, 1372.4, 837.8, 76.9, 853.7, 700.6, 386.0, 237.4, 392.6, 724.2, 77.4, 2008.4, 11.0, 1866.8),
  bal('2025', 3398.6, 1561.3, 702.9, 1288.5, 865.8, 74.1, 844.6, 679.0, 397.3, 233.6, 415.7, 629.7, 77.1, 2098.6, 11.5, 2039.8),
];
const flu = (periodo, flujo_operativo, capex, pagos_arrendamientos, adquisiciones, desinversiones, dividendos, recompras) =>
  ({ periodo, flujo_operativo, capex, pagos_arrendamientos, adquisiciones, desinversiones, dividendos, recompras, emision_acciones: 0, intereses_en_financiacion: 0 });
const historicoFlujos = [
  flu('2021', 257.2, 109.0, 19.0, 306.8, 2.3, 29.5, 22.4),
  flu('2022', 203.9, 132.6, 25.9, 39.4, 3.1, 31.2, 94.8),
  flu('2023', 332.6, 168.3, 20.5, 40.2, 3.4, 34.8, 0),
  flu('2024', 357.1, 138.2, 19.7, 89.2, 3.0, 35.0, 10.3),
  flu('2025', 334.0, 101.4, 20.4, 38.5, 2.7, 36.2, 16.6),
];
const seg = (nombre, descripcion, h) => ({ nombre, descripcion, tipo_resultado: 'EBIT', historico: h.map(([periodo, ingresos, resultado]) => ({ periodo, ingresos, resultado })) });

w('A', {
  negocio: {
    segmentos: [
      seg('Hydraulics (Olio)', 'Tomas de fuerza y bombas para vehículos industriales, cilindros, válvulas y distribuidores (Walvoil), motores orbitales y dirección (White Drive), reductores (Reggiana Riduttori, Transtecno), tubos y racores. Clientes: fabricantes de camiones, grúas, maquinaria agrícola, de obra y de manutención, y distribuidores. Resultado = EBIT del sector; el EBITDA de la división fue 266,2 M (19,6 %) en 2025 [A1, A2].', [['2021', 1134.1, 184.9], ['2022', 1541.6, 253.0], ['2023', 1634.3, 287.6], ['2024', 1407.5, 191.1], ['2025', 1355.0, 173.6]]),
      seg('Water Jetting (Acqua)', 'Bombas de émbolo de alta y muy alta presión (Pratissoli, General Pump, Hammelmann), sistemas de limpieza industrial e hidrodemolición, bombas, válvulas y líneas de proceso higiénicas para alimentación, farmacia y química (Inoxpa, Mariotti & Pecini), sistemas de ordeño (Waikato). Resultado = EBIT del sector; EBITDA 195,8 M (27,2 %) en 2025 [A1, A2].', [['2021', 470.1, 110.1], ['2022', 536.3, 131.0], ['2023', 605.7, 141.2], ['2024', 670.9, 146.7], ['2025', 715.7, 163.0]]),
    ],
    geografias: [
      { nombre: 'Italia', peso_pct: 15.6 }, { nombre: 'Resto de Europa', peso_pct: 35.2 }, { nombre: 'Norteamérica', peso_pct: 25.1 },
      { nombre: 'Lejano Oriente y Oceanía', peso_pct: 13.1 }, { nombre: 'Resto del mundo', peso_pct: 11.0 },
    ],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Crecimiento orgánico del grupo', valor_anterior: '−0,7 % (2025)', valor_actual: '+0,7 % (1S26); −0,7 % en el 2T26', variacion: 'Guía 2026: entre −2 % y +3 %, «parte alta»', comentario: 'Hydraulics +6,2 % orgánico en el 2T26 (cuarto trimestre seguido al alza); Water Jetting −12,5 % por los pedidos excepcionales de Hammelmann en China del 1S25 [A3, A4].' },
      { kpi: 'Crecimiento orgánico de Hydraulics', valor_anterior: '−14 % (2024)', valor_actual: '−4,1 % (2025); +4,1 % sin compras en el 1S26', variacion: 'Del −14,5 % del 1T25 al +6,2 % del 2T26', comentario: 'Agricultura y construcción +40 % en el 4T25; en el 2T26 la agricultura «empeora ligeramente» [A5, A4].' },
      { kpi: 'Margen EBITDA del grupo', valor_anterior: '22,0 % (2024)', valor_actual: '22,3 % (2025); 22,4 % (1S26)', variacion: '+0,3 puntos', comentario: 'Guía 2026: 22-22,5 %; objetivo 2028: ≈22,5 % [A3, A6].' },
      { kpi: 'Caja libre (FCF de la empresa)', valor_anterior: '≈188 M (2024, deducido de la deuda neta)', valor_actual: '220,4 M (2025, récord); 94,6 M en el 1S26', variacion: 'Tercer récord seguido previsto en 2026', comentario: 'Capex en el 4 % de las ventas; circulante en el 40 % de las ventas, objetivo 35-36 % [A6, A4].' },
      { kpi: 'Posición financiera neta', valor_anterior: '409,0 M (dic-24)', valor_actual: '291,1 M (dic-25); 305,7 M (jun-26)', variacion: '−103 M en 18 meses pese a 64 M de recompras', comentario: 'Sin arrendamientos fuera ni deudas por compras de minoritarios (64,3 M a jun-26) [A3, A6].' },
      { kpi: 'Relación pedidos/facturación', valor_anterior: 'n.d.', valor_actual: '> 1 en las dos divisiones (1S26)', variacion: '—', comentario: 'La empresa no publica la cifra exacta [A4].' },
    ],
  },
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 2080.1, ebitda: 455.6, ebit: 327.5, beneficio_neto: 212.5, bpa: 2.006, dpa: 0.35, dpa_extraordinario: 0, fcf: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [
      { periodo: '2021', descripcion: 'White Drive Motors & Steering, consolidada desde el 1-oct-2021 (valor empresa 278 M; ventas anuales algo por encima de 200 M): un trimestre en la cuenta y todo el balance [A9].' },
    ],
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '4T24', ingresos: 489.9, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 93.1, margen_ebitda_pct: 19.0, bpa: 0.447, vs_consenso: null },
      { periodo: '1T25', ingresos: 521.6, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 117.3, margen_ebitda_pct: 22.5, bpa: 0.532, vs_consenso: null },
      { periodo: '2T25', ingresos: 555.3, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 132.1, margen_ebitda_pct: 23.8, bpa: 0.562, vs_consenso: null },
      { periodo: '3T25', ingresos: 499.2, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 114.8, margen_ebitda_pct: 23.0, bpa: 0.515, vs_consenso: null },
      { periodo: '4T25', ingresos: 494.6, crecimiento_pct: 1.0, crecimiento_organico_pct: 2.5, ebitda: 97.7, margen_ebitda_pct: 19.8, bpa: 0.346, vs_consenso: null },
      { periodo: '1T26', ingresos: 524.8, crecimiento_pct: 0.6, crecimiento_organico_pct: 2.2, ebitda: 114.7, margen_ebitda_pct: 21.9, bpa: 0.537, vs_consenso: null },
      { periodo: '2T26', ingresos: 561.4, crecimiento_pct: 1.1, crecimiento_organico_pct: -0.7, ebitda: 128.4, margen_ebitda_pct: 22.9, bpa: 0.608, vs_consenso: null },
    ],
    confianza: 'Alta',
  },
  balance: {
    historico: historicoBalance,
    // Calendario de la deuda financiera con intereses (incluye arrendamientos) y bancos a dic-25, nota de debiti finanziari del informe 2025 [A1]: corto 232,0 + bancos 33,7; «entro 2 anni» 158,3; 2-5 años 182,1; más de 5 años 100,7.
    vencimientos: [{ anio: '2026', importe: 265.7 }, { anio: '2027', importe: 158.3 }, { anio: '2028-2030', importe: 182.1 }, { anio: '2031+', importe: 100.7 }],
    liquidez: 'Caja de 369,6 M a 30-jun-26 frente a deuda bruta de 675,3 M (bancos 33,4 M, deuda financiera con intereses a corto 219,3 M y a largo 422,5 M, con unos 77 M de arrendamientos); a dic-25, préstamos bancarios de 496,2 M a Euribor + 0,91 de diferencial medio y un bono de 99,5 M al 4,17 % [A3, A1]. Covenants (deuda neta/patrimonio, deuda neta/EBITDA, EBITDA/gastos financieros) «ampliamente respetados» [A1].',
    rating: 'Sin rating público (no consta en el informe anual ni en los trimestrales)',
    coste_deuda_pct: 3.6,
    vida_media_anios: null,
    confianza: 'Alta',
  },
  flujos: { historico: historicoFlujos, confianza: 'Alta' },
  calidad: { auditor: 'PricewaterhouseCoopers S.p.A. (según el informe 2023; en el texto ESEF de 2025 la página no se lee)', anios_auditor: null, opinion: 'Favorable', confianza: 'Media' },
  capital: {
    politica: null,
    adquisiciones: [
      { anio: '2021', objetivo: 'White Drive Motors & Steering (motores orbitales y dirección hidráulica; EE. UU. y Europa)', importe: 278, ev_ebitda: 5.2, financiacion: 'Caja y deuda bancaria', resultado: 'Comprada a 5,2x el EBITDA de cierre (53 M); integrada en Hydraulics; sin deterioros publicados [A9, A1].' },
      { anio: '2023', objetivo: 'I.Mec y Waikato Milking Systems (ordeño, Nueva Zelanda)', importe: null, ev_ebitda: null, financiacion: 'Caja', resultado: 'Integradas en Water Jetting, que crece de forma orgánica de un dígito alto en 2023-2025 [A10, A5].' },
      { anio: '2024', objetivo: 'Seis compras: PP China, YRP Shanghai Flow Technology, Alltube, Alfa Valvole, H.S. e Hidrover', importe: 89.2, ev_ebitda: null, financiacion: 'Caja', resultado: 'Salida de caja por compras de 89,2 M en 2024; sin efecto dilutivo en el margen según la empresa [A6, A1].' },
      { anio: '2025', objetivo: 'Padoan, Tutto Hidraulicos, Borghi Assali (70 %) y F.A.R.M.A.', importe: 52.4, ev_ebitda: null, financiacion: 'Caja y pagos aplazados', resultado: 'Aportan +2,4 % de ventas en el 1S26; el margen de Hydraulics sube al 21,2 % en el 2T26 pese a consolidarlas [A3, A4].' },
      { anio: '2026', objetivo: 'MVV (bombas dosificadoras de engranajes) y Teknoice (líneas para helados)', importe: 24, ev_ebitda: 4.3, financiacion: 'Caja', resultado: 'Valor empresa de 6 M (ventas 6,3 M, margen EBITDA ≈22 %) y 18 M (ventas ≈30 M, margen ≈14 %): ≈4,3x el EBITDA en las dos; demasiado recientes para juzgarlas [A3].' },
    ],
    confianza: 'Media',
  },
  fuentes: [
    { id: 1, ...AR25 }, { id: 2, ...AR23 }, { id: 3, ...Q2 }, { id: 4, ...T2Q }, { id: 5, ...T4Q }, { id: 6, ...Q4 },
    { id: 7, ...Q1 }, { id: 8, ...AR22 }, { id: 9, ...WD }, { id: 10, ...WIKI }, { id: 11, ...FY20 }, { id: 12, ...FY19 },
    { id: 13, ...XBRL(2024, 'https://filings.xbrl.org/815600C79D0F31F4D395/2024-12-31/ESEF/IT/0/815600C79D0F31F4D395-2024-12-31-0-it.json') },
  ],
  huecos: [
    { seccion: 'trimestres', campo: 'crecimiento de 1T25-3T25', tipo: 'Complemento', intentos: '1) Comunicado del 1S26 (solo 2T y 1S); 2) comunicado del 4T25 (solo 4T y año); 3) presentaciones (gráficos sin tabla legible)', decision: 'Omitido' },
  ],
});

// ---------------- B. Sector y competencia ----------------
w('B', {
  historia: {
    resumen: null,
    hitos: [
      { anio: '1977', hito: 'Fulvio Montipò funda Interpump en Sant\'Ilario d\'Enza (Reggio Emilia) para fabricar bombas de émbolo de alta presión [B1].' },
      { anio: '1996', hito: 'Salida a bolsa en Milán; hoy cotiza en el segmento STAR de Euronext Milan [B1, B5].' },
      { anio: '1997', hito: 'Entrada en la hidráulica (tomas de fuerza para vehículos industriales), hoy dos tercios de las ventas [B1, B5].' },
      { anio: '2005', hito: 'Compra de Hammelmann (Alemania), líder en bombas de muy alta presión e hidrodemolición [B1].' },
      { anio: '2014', hito: 'Compra de Walvoil (válvulas y distribuidores hidráulicos) [B1].' },
      { anio: '2017', hito: 'Compras de Inoxpa y Mariotti & Pecini: entrada en bombas y líneas higiénicas para alimentación, hoy el 10 % del grupo [B1, B6].' },
      { anio: '2021', hito: 'Compra de White Drive Motors & Steering a Danfoss por 278 M, la mayor de su historia [B1, B7].' },
      { anio: '2026', hito: 'Objetivo de 2.500 M de ventas y deuda neta cero en 2028; caída del 18,3 % el 13-feb por una guía prudente; compras de MVV y Teknoice [B5, B8].' },
    ],
    confianza: 'Media',
  },
  sector: {
    definicion: null,
    tamano: 'Hidráulica mundial: 38.980 M USD en 2024 y 44.260 M en 2030 [B2]; 44.920 M USD en 2025 y 55.730 M en 2030 [B3]. Bombas de alta presión: ≈3.860 M USD en 2025 [B4].',
    unidad_serie: 'millones de USD (hidráulica mundial, MarketsandMarkets)',
    serie: [{ anio: '2024', tamano: 38980 }, { anio: '2030e', tamano: 44260 }],
    tcac_historico_pct: null,
    tcac_previsto_pct: 3.4,
    cr5_pct: null,
    estructura: 'Fragmentada',
    confianza: 'Media',
  },
  competencia: { cuota_pct: 3, confianza: 'Media' },
  esg: { calificaciones: [], confianza: 'Baja' },
  fuentes: [
    { id: 1, ...WIKI }, { id: 2, ...MNM }, { id: 3, ...GII }, { id: 4, ...MRF }, { id: 5, ...Q4 }, { id: 6, ...T4Q }, { id: 7, ...WD }, { id: 8, ...YH },
    { id: 9, ...FICHA }, { id: 10, ...PTO }, { id: 11, ...EATON },
  ],
  huecos: [
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) Informe de sostenibilidad CSRD 2025 (sin calificaciones de terceros legibles en el texto ESEF); 2) búsqueda MSCI/Sustainalytics (sin acceso gratuito); 3) prensa (sin dato fechado)', decision: 'Omitido' },
    { seccion: 'sector', campo: 'cr5_pct', tipo: 'Complemento', intentos: '1) MarketsandMarkets (lista de jugadores sin cuotas); 2) Research and Markets (sin cuotas en el resumen); 3) informes anuales de Parker y Bucher (sin cuota del mercado total)', decision: 'Omitido' },
  ],
});

// ---------------- C. Equipo y gobierno ----------------
w('C', {
  directivos: {
    equipo: [
      { nombre: 'Fulvio Montipò', cargo: 'Fundador y presidente ejecutivo', desde: '1977', participacion_pct: 1.43, trayectoria: 'Fundó el grupo en 1977 y lo sacó a bolsa en 1996; desde entonces las ventas pasaron de unos 672 M (2014) a 2.071 M (2025) con más de 100 compras. Tiene el 1,43 % directo; su familia controla Gruppo IPG Holding (23,42 % del voto) a través de Leila Montipò e Sorelle Sapa. Confirmado en la junta de abril de 2026 hasta el ejercicio 2028; recibió 1,14 M de opciones en 2025 [C1, C2, C3].' },
      { nombre: 'Fabio Marasi', cargo: 'Consejero delegado', desde: null, participacion_pct: null, trayectoria: 'Confirmado como consejero delegado en abril de 2026; dirige las conferencias de resultados. Con él el grupo recuperó el crecimiento orgánico de Hydraulics (cuatro trimestres seguidos) y logró dos récords de caja libre (2024-2025); 160.000 opciones en 2025 [C2, C3, C4].' },
      { nombre: 'Giovanni Tamburi', cargo: 'Vicepresidente', desde: null, participacion_pct: null, trayectoria: 'Fundador de Tamburi Investment Partners (TIP), socio minoritario de Gruppo IPG Holding; confirmado como vicepresidente en abril de 2026 [C2].' },
      { nombre: 'Mauro Barani', cargo: 'Director de información financiera (dirigente preposto)', desde: null, participacion_pct: null, trayectoria: 'Firma la declaración del artículo 154-bis sobre los documentos contables; confirmado en abril de 2026 [C2, C5].' },
      { nombre: 'Federica Menichetti', cargo: 'Consejera independiente coordinadora (lead independent director)', desde: '2026', participacion_pct: null, trayectoria: 'Nombrada consejera coordinadora en el consejo renovado en abril de 2026 (nueve miembros, seis independientes) [C2].' },
    ],
    historial_guidance: [
      { anio: '2024', guia: 'Recuperación en el segundo semestre (la empresa reconoce que «los dos últimos años» decepcionaron frente a lo previsto)', real: 'Ventas del grupo −7,2 % (2.078 frente a 2.240 M) con Hydraulics −14 % orgánico; margen EBITDA del 22,0 % (24,0 % en 2023) [C9]', cumplida: 'No' },
      { anio: '2025', guia: 'Crecimiento orgánico entre −5 % y +1 % (feb-25)', real: '−0,7 % orgánico, en la parte alta del rango; margen EBITDA del 22,3 % [C9]', cumplida: 'Sí' },
      { anio: '2026', guia: 'Orgánico entre −2 % y +3 %, margen 22-22,5 % (feb-26); «parte alta» desde ago-26', real: '+0,7 % orgánico y 22,4 % de margen en el 1S26', cumplida: 'Parcial' },
      { anio: '2028', guia: 'Ventas de 2.500 M (+20 % sobre 2025 con compras), margen ≈22,5 %, deuda neta cero', real: 'En curso: 2.080 M de ventas en los 12 meses a jun-26 y 305,7 M de deuda neta', cumplida: 'Parcial' },
    ],
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Fulvio Montipò', cargo: 'Presidente ejecutivo', tipo: 'Ejecutivo', desde: '1977', comisiones: null },
      { nombre: 'Giovanni Tamburi', cargo: 'Vicepresidente', tipo: 'Otro externo', desde: null, comisiones: null },
      { nombre: 'Fabio Marasi', cargo: 'Consejero delegado', tipo: 'Ejecutivo', desde: null, comisiones: null },
      { nombre: 'Federica Menichetti', cargo: 'Consejera independiente coordinadora', tipo: 'Independiente', desde: '2026', comisiones: null },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: true, consejero_coordinador: true, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: false, auditoria_independiente: null, insiders_sin_operaciones: false,
    accionista_control: true, presidente_vinculado_control: true, cambios_cupula_24m: 0,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: null,
    accionistas: [
      { nombre: 'Gruppo IPG Holding S.p.A. (familia Montipò, vía Leila Montipò e Sorelle Sapa; Tamburi Investment Partners es socio minoritario del holding)', pct: 23.42, tipo: 'Control de hecho', variacion: 'Sin cambios declarados desde nov-23' },
      { nombre: 'FMR LLC (Fidelity)', pct: 6.90, tipo: 'Institucional', variacion: 'Declaración de nov-24' },
      { nombre: 'Reggiana Finanziaria S.r.l. (G. Albarelli)', pct: 3.49, tipo: 'Particular / familiar', variacion: 'Declaración de oct-19' },
      { nombre: 'Fulvio Montipò (directa)', pct: 1.43, tipo: 'Fundador', variacion: 'n.d.' },
      { nombre: 'Autocartera', pct: 3.48, tipo: 'Autocartera', variacion: '3.785.087 acciones a jun-26 (2,92 % a mar-26) a 37,46 EUR de coste medio' },
    ],
    insiders: [],
    alertas: [
      'Salida de Riccardo Mastronardi, dirigente con responsabilidades estratégicas, el 5-oct-2026, sin motivo publicado [C5].',
      'El fundador y presidente ejecutivo tiene más de 80 años; el plan de sucesión no se ha leído en el informe de gobierno 2025 [C1].',
      'Investigación fiscal o judicial al fundador: no se ha encontrado ninguna abierta en el informe anual 2025, en los comunicados de 2026 ni en la prensa italiana consultada (ver huecos) [C6].',
      'Interpump salió del índice FTSE All-World el 21-sep-2026 [C6].',
    ],
    confianza: 'Media',
  },
  fuentes: [
    { id: 1, ...WIKI }, { id: 2, ...AGM }, { id: 3, ...CONSOB }, { id: 4, ...T2Q }, { id: 5, ...MASTR }, { id: 6, ...MSNEWS }, { id: 7, ...AR25 }, { id: 8, ...MF }, { id: 9, ...T4Q },
  ],
  huecos: [
    { seccion: 'gobierno', campo: 'remuneracion_ceo y votos de remuneración', tipo: 'Núcleo', intentos: '1) Informe anual 2025 (solo el total del consejo: 9,30 M en 2025 con el valor de las opciones); 2) búsqueda de la Relazione sulla remunerazione 2026 (no localizada en abierto); 3) prensa de la junta del 30-abr-2026 (sin porcentajes de voto)', decision: 'Omitido' },
    { seccion: 'gobierno', campo: 'consejo completo (cinco consejeros) y comisiones', tipo: 'Complemento', intentos: '1) Prensa de la junta de 2026 (solo cuatro nombres); 2) informe anual 2025 (página de órganos sociales ilegible en el ESEF); 3) MarketScreener (detrás de registro)', decision: 'Omitido' },
    { seccion: 'gobierno', campo: 'investigación fiscal o judicial al fundador', tipo: 'Complemento', intentos: '1) Informe anual 2025 (contingencias y fondos para litigios: nada sobre el presidente); 2) búsquedas en prensa italiana (Milano Finanza, Teleborsa, Reggionline) con «Montipò indagato», «sequestro», «procura»: sin resultados; 3) noticias de MarketScreener de 2026 y comunicados de la empresa: nada', decision: 'Omitido (sin constancia pública de una investigación abierta a la fecha de corte)' },
    { seccion: 'gobierno', campo: 'insiders', tipo: 'Complemento', intentos: '1) Comunicados de internal dealing de 2026 (no localizados en abierto); 2) Consob (solo participaciones >3 %); 3) MarketScreener (detrás de registro)', decision: 'Omitido' },
  ],
});

// ---------------- D. Mercado y valoración ----------------
const B = JSON.parse(readFileSync(join(DIR, 'bolsa.json'), 'utf8'));
const comps = JSON.parse(readFileSync(join(DIR, '..', '..', '..', 'sectores', 'hidraulica-bombas-2026-10-14-comparables.json'), 'utf8'));
w('D', {
  identificacion: {
    nombre: 'Interpump Group S.p.A.', nombre_corto: 'Interpump', ticker: 'IP', isin: 'IT0001078911', mercado: 'Euronext Milan (segmento STAR)', indice_referencia: 'FTSE MIB',
    pais: 'Italia', pais_iso: 'IT', sector: 'Industria', industria: 'Maquinaria', sede: "Sant'Ilario d'Enza (Reggio Emilia)", fundacion: '1977', empleados: 9712, web: 'www.interpumpgroup.it',
    precio: B.identificacion.precio, fecha_precio: B.identificacion.fecha_precio, acciones: 105.35, capitalizacion_publicada: 3771, free_float_pct: 68.0,
    max_52s: B.identificacion.max_52s, min_52s: B.identificacion.min_52s, volumen_medio_diario: '≈ 6,2 M EUR/día (3 meses)', proximos_resultados: '2026-11-13',
  },
  consenso: {
    guidance: null,
    estimaciones: [
      { periodo: '2026e', ingresos: 2156, ebitda: 477.4, ebit: 351.0, bpa: 2.147, dpa: 0.36, fuente: 'Zonebourse/MarketScreener, 8 analistas [D3]' },
      { periodo: '2027e', ingresos: 2258, ebitda: 508.7, ebit: 380.1, bpa: 2.39, dpa: 0.386, fuente: 'Zonebourse/MarketScreener [D3]' },
      { periodo: '2028e', ingresos: 2357, ebitda: 537.7, ebit: 407.7, bpa: 2.62, dpa: 0.416, fuente: 'Zonebourse/MarketScreener [D3]' },
    ],
    recomendaciones: { n_analistas: 8, comprar: null, mantener: null, vender: null, po_medio: 46.56, po_min: null, po_max: null },
    revisiones: null,
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: { ...B.bolsa, posicion_corta_pct: null, confianza: 'Alta' },
  multiplos_historicos: {
    serie: ['2021', '2022', '2023', '2024', '2025'].map((anio) => ({ anio, precio_cierre: B.cierres_ejercicio.find((x) => x.anio === anio).precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    confianza: 'Alta',
  },
  comparables: { empresas: comps, confianza: 'Media' },
  transacciones: {
    operaciones: [
      { fecha: '2021-10', objetivo: 'White Drive Motors & Steering (hidráulica móvil)', comprador: 'Interpump', ev: 278, ev_ventas: null, ev_ebitda: 5.2, prima_pct: null, excluir: false, comentario: '278 M de valor empresa con un EBITDA de cierre de 53 M a 12 meses; ventas algo por encima de 200 M [D5].' },
      { fecha: '2021-08', objetivo: 'Eaton Hydraulics', comprador: 'Danfoss', ev: 3000, ev_ventas: 1.83, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '3.300 M USD (≈3.000 M EUR) sobre 1.800 M USD de ventas en 2020; EBITDA no publicado [D6, D7].' },
      { fecha: '2021-06', objetivo: 'Seepex (bombas de cavidad progresiva)', comprador: 'Ingersoll Rand', ev: 431.5, ev_ventas: 2.70, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '431,5 M EUR sobre unos 160 M de ventas; el comprador espera bajar a «dos dígitos bajos» de EBITDA con sinergias al tercer año [D8].' },
      { fecha: '2025-07', objetivo: 'Chart Industries (equipos criogénicos y de proceso)', comprador: 'Baker Hughes', ev: 12148, ev_ventas: 3.24, ev_ebitda: 13.6, prima_pct: null, excluir: false, comentario: '13.600 M USD (12.148 M EUR al cambio del 14-oct-26) sobre 1.000 M USD de EBITDA ajustado [D9].' },
      { fecha: '2026-07', objetivo: 'Teknoice (líneas industriales de helado)', comprador: 'Interpump', ev: 18, ev_ventas: 0.60, ev_ebitda: 4.3, prima_pct: null, excluir: false, comentario: 'Ventas ≈30 M con margen EBITDA ≈14 % [D10].' },
      { fecha: '2026-07', objetivo: 'MVV (bombas dosificadoras de engranajes)', comprador: 'Interpump (Alfa Valvole)', ev: 6, ev_ventas: 0.95, ev_ebitda: 4.3, prima_pct: null, excluir: false, comentario: 'Ventas de 6,3 M con margen EBITDA ≈22 % [D10].' },
    ],
    confianza: 'Media',
  },
  fuentes: [
    { id: 1, ...YH }, { id: 2, ...YHC }, { id: 3, ...ZB }, { id: 4, ...BUND }, { id: 5, ...WD }, { id: 6, ...EATON }, { id: 7, ...EATON2 }, { id: 8, ...SEEPEX }, { id: 9, ...CHART },
    { id: 10, ...Q2 }, { id: 11, ...DAMO }, { id: 12, ...CAL }, { id: 13, ...CONSOB }, { id: 14, ...FICHA },
  ],
  huecos: [
    { seccion: 'bolsa', campo: 'posicion_corta_pct', tipo: 'Complemento', intentos: '1) Consob, posizioni nette corte (sin posiciones por encima del 0,5 % publicadas en lo consultado); 2) Yahoo (no da cortos para Milán); 3) MarketScreener (detrás de registro)', decision: 'Omitido' },
    { seccion: 'consenso', campo: 'recomendaciones desglosadas y objetivos mínimo y máximo', tipo: 'Complemento', intentos: '1) Zonebourse (solo media y recomendación media «Comprar»); 2) Yahoo (objetivo medio 46,56, 8 analistas, sin rango); 3) MarketScreener (detrás de registro)', decision: 'Omitido' },
  ],
});

// ---------------- E. Sentimiento ----------------
w('E', {
  sentimiento: {
    tono: 'Dividido', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Seeking Alpha (noticias y transcripciones de IPGLF)', fecha: '2026-08', n_comentarios: 5, tono: 'Neutro', resumen: 'Solo notas de resultados (BPA de 0,61 EUR en el 2T26) y la transcripción; sin debate de lectores en el canal abierto [E1].' },
      { plataforma: 'Teleborsa y Milano Finanza (comentarios de mercado)', fecha: '2026-08', n_comentarios: 6, tono: 'Dividido', resumen: 'Tras el 2T26, «reduce márgenes pero confirma estimaciones» y la acción sube un 4 %; en abril, Equita recortó el objetivo por un 2026 más prudente en el ciclo [E2, E3].' },
      { plataforma: 'Websim (Intermonte) y MarketScreener (pieza «¿Una venta de más?»)', fecha: '2026-05', n_comentarios: 4, tono: 'Positivo', resumen: 'Tras el 1T26 el tono se vuelve más constructivo: abril por encima del presupuesto y pedidos al alza; se discute si la caída del 18 % de febrero fue excesiva [E4, E5].' },
      { plataforma: 'Money.it (análisis técnico para particulares)', fecha: '2026-09', n_comentarios: 3, tono: 'Positivo', resumen: 'Plantea un rebote del 25 % desde mínimos por el gráfico; sin argumento de negocio [E6].' },
    ],
    temas: [
      { tema: 'Valoración: cotiza a la mitad del múltiplo de las estadounidenses', postura: 'Alcista', peso: 'Alto', contraste: 'Cierto en múltiplos (EV/EBITDA 8,7x frente a una mediana de 18,5x de los comparables), pero con menos ROIC sobre el capital con fondo de comercio y más ciclo; el propio presidente lo repite [E7, D2].' },
      { tema: 'Guía 2026 prudente y la caída del 13-feb', postura: 'Bajista', peso: 'Alto', contraste: 'La guía (−2 % a +3 % orgánico) se ha cumplido en el 1S26 (+0,7 %) y la empresa apunta a la parte alta: el miedo de febrero se ha corregido en parte [A3].' },
      { tema: 'Fin del ciclo bajista de la hidráulica', postura: 'Dividida', peso: 'Medio', contraste: 'Cuatro trimestres de crecimiento orgánico en Hydraulics, pero la agricultura empeora en el 2T26 y el comparable del 2S26 es más difícil [A4].' },
      { tema: 'Water Jetting tras los pedidos de China', postura: 'Dividida', peso: 'Medio', contraste: 'Caída del 12,5 % orgánico en el 1S26 solo por el comparable; margen por encima del 26 % y alimentación creciendo de un dígito alto [A4].' },
    ],
    lectura: null,
    confianza: 'Baja',
  },
  fuentes: [
    { id: 1, ...SA }, { id: 2, ...MF2 }, { id: 3, ...EQUITA }, { id: 4, ...WEBSIM }, { id: 5, ...MSNEWS, tipo: 'Foros y redes' }, { id: 6, ...MONEY }, { id: 7, ...MF, tipo: 'Foros y redes' }, { id: 8, ...TB1Q },
  ],
  huecos: [
    { seccion: 'sentimiento', campo: 'foros de particulares', tipo: 'Complemento', intentos: '1) FinanzaOnline (protección Cloudflare); 2) Stocktwits (símbolo IPGLF sin flujo); 3) Reddit y Investing (sin hilos recientes localizados)', decision: 'Omitido: la sección se apoya en comentarios de prensa y de analistas para particulares, con confianza baja' },
  ],
});
console.log('Notas A-E escritas');
