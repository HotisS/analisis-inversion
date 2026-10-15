// Escribe las notas A-E de Universal Music Group (corte 2026-10-15) con los documentos de notas/docs.
// Todas las notas comparten la misma lista de fuentes F (integrar.mjs quita los duplicados); citas [n] a esa lista.
// Ejecutar: node informes/universal-music-2026-10-15/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');

export const F = [
  { id: 1, titulo: 'UMG reports financial results for the fourth quarter and full year ended December 31, 2025 (cuenta, flujos, conciliaciones de EBITDA ajustado y beneficio neto ajustado, segmentos)', editor: 'Universal Music Group N.V. (PR Newswire)', tipo: 'Primaria', fecha: '2026-03-05', url: 'https://www.bolsamania.com/nota-de-prensa/mercados/universal-music-group-nv-reports-financial-results-for-the-fourth-quarter-and-full-year-ended-december-31-2025--21946174.html' },
  { id: 2, titulo: 'UMG reports financial results for the second quarter and half year ended June 30, 2026', editor: 'Universal Music Group N.V. (PR Newswire / Cision)', tipo: 'Primaria', fecha: '2026-07-30', url: 'https://digital-release.wowktv.com/business/press-releases/cision/20260730LA16008/universal-music-group-n-v-reports-financial-results-for-the-second-quarter-and-half-year-ended-june-30-2026' },
  { id: 3, titulo: 'Informes anuales 2021-2025 de Universal Music Group N.V. en formato ESEF (XBRL): cuenta, balance y flujos', editor: 'Universal Music Group N.V. / AFM (filings.xbrl.org)', tipo: 'Primaria', fecha: '2026-03-26', url: 'https://filings.xbrl.org/724500GJBUL3D9TW9Y18/2025-12-31/ESEF/NL/0/724500GJBUL3D9TW9Y18-2025-12-31-1-en/reports/724500GJBUL3D9TW9Y18-2025-12-31-1-en.xhtml' },
  { id: 4, titulo: 'UMG reports financial results for the fourth quarter and full year ended December 31, 2023 (BPA ajustado 2023 y 2022, segmentos 2022-2023)', editor: 'Universal Music Group N.V. (Stock Titan)', tipo: 'Primaria', fecha: '2024-02-29', url: 'https://www.stocktitan.net/news/UNVGY/universal-music-group-n-v-reports-financial-results-for-the-fourth-s6tilkqm5vdv.html' },
  { id: 5, titulo: 'UMG reports financial results for the fourth quarter and full year ended December 31, 2021 (BPA ajustado 2021 y 2020)', editor: 'Universal Music Group N.V. (Stock Titan)', tipo: 'Primaria', fecha: '2022-03-03', url: 'https://www.stocktitan.net/news/UNVGY/universal-music-group-n-v-reports-financial-results-for-the-fourth-8a82dwlgnhqc.html' },
  { id: 6, titulo: 'Yahoo Finance, históricos diarios (UMG.AS, ^AEX, EXV1.DE) hasta el 14-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/UMG.AS/history' },
  { id: 7, titulo: 'Yahoo Finance, estimaciones de consenso de UMG.AS (BPA ajustado 2026e 0,997 con 15 analistas y 2027e 1,090 con 16; ventas; objetivo medio 21,49 EUR, mínimo 12, máximo 39, 20 opiniones; 1.798,2 M acciones)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/quote/UMG.AS/analysis' },
  { id: 8, titulo: 'MarketScreener: Universal Music Group N.V., finanzas y consenso (ventas, EBITDA ajustado, BPA NIIF, DPA y deuda neta 2023-2028; 21 analistas; objetivo medio 21,49 EUR)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://www.marketscreener.com/quote/stock/UNIVERSAL-MUSIC-GROUP-N-V-127080831/finances/' },
  { id: 9, titulo: "Bill Ackman's Pershing Square is selling its remaining Universal Music Group stake, days after UMG rejected its $64B takeover bid", editor: 'Music Business Worldwide', tipo: 'Prensa', fecha: '2026-06-03', url: 'https://www.musicbusinessworldwide.com/bill-ackmans-pershing-square-is-selling-its-remaining-universal-music-group-shares-days-after-umg-rejected-its-64bn-takeover-bid/' },
  { id: 10, titulo: "UMG spends $290m buying back stock from Bill Ackman's Pershing Square, amid fund's exit", editor: 'Music Business Worldwide', tipo: 'Prensa', fecha: '2026-06-04', url: 'https://www.musicbusinessworldwide.com/umg-spends-290m-buying-back-stock-from-bill-ackmans-pershing-square-amid-funds-exit-from-music-company/' },
  { id: 11, titulo: 'Universal Music Group to sell half of its Spotify stake, increase share buybacks (propuesta de Pershing: 5,05 EUR en efectivo + 0,77 acciones = 30,40 EUR por acción)', editor: 'TheWrap', tipo: 'Prensa', fecha: '2026-04-29', url: 'https://www.thewrap.com/industry-news/business/universal-music-group-spotify-stake-share-buybacks/' },
  { id: 12, titulo: 'UMG has now bought back nearly €1 billion of its shares this year (programas de 500 y 250 M, compra a Pershing; venta de Spotify en curso)', editor: 'Music Business Worldwide', tipo: 'Prensa', fecha: '2026-09-07', url: 'https://www.musicbusinessworldwide.com/umg-has-now-bought-back-e1-billion-of-its-shares-this-year/' },
  { id: 13, titulo: 'UMG reports weekly transactions under and completion of its €250 million share buyback program', editor: 'Universal Music Group N.V. (PR Newswire)', tipo: 'Primaria', fecha: '2026-09-07', url: 'https://www.placera.se/pressmeddelanden/universal-music-group-universal-music-group-n-v-reports-weekly-transactions-under-and-completion-of-its-250-million-share-buyback-program-20260907' },
  { id: 14, titulo: 'UMG to announce financial results for the third quarter ended September 30, 2026 (29-oct-2026, tras el cierre)', editor: 'Universal Music Group N.V. (PR Newswire)', tipo: 'Primaria', fecha: '2026-10-01', url: 'https://www.trivano.com/persbericht/universal-music-group-nv-to-announce-financial-results-for-the-third-quarter-ended-september-30-2026-764625.html' },
  { id: 15, titulo: 'Universal Music shares shed quarter of value on streaming concerns (Reuters)', editor: 'Reuters (vía WSAU)', tipo: 'Prensa', fecha: '2026-07-31', url: 'https://wsau.com/2026/07/31/universal-music-shares-sink-23-as-subscription-growth-slows/' },
  { id: 16, titulo: 'UMG slumps in Amsterdam; second quarter disappoints on margins and subscriptions (Radiocor: previsiones de los analistas, UBS, ING)', editor: 'Il Sole 24 Ore', tipo: 'Prensa', fecha: '2026-07-31', url: 'https://en.ilsole24ore.com/art/umg-slumps-in-amsterdam-second-quarter-results-disappoint-on-margins-and-subscriptions-AJCCARb' },
  { id: 17, titulo: 'UMG Q2 revenue up 13% but stock falls 25% on subscription slowdown', editor: 'InterSpace Daily', tipo: 'Prensa', fecha: '2026-07-31', url: 'https://interspacemusic.com/blog/umg-q2-revenue-up-13-but-stock-falls-25-on-subscription-slowdown/' },
  { id: 18, titulo: 'Universal Music Group (UMG) Q2 2026 earnings summary (conferencia del 30-jul-2026)', editor: 'Quartr', tipo: 'Prensa', fecha: '2026-07-30', url: 'https://quartr.com/events/universal-music-group-n-v-umg-q2-2026_ojaumZPz' },
  { id: 19, titulo: 'Universal Music Group generated $3.83B in Q2, up 13.3% YoY', editor: 'Music Business Worldwide', tipo: 'Prensa', fecha: '2026-07-30', url: 'https://www.musicbusinessworldwide.com/universal-music-group-generated-3-83bn-in-q2-up-13-3-yoy-driven-by-noah-kahan-bts-olivia-rodrigo-drake-and-olivia-dean/' },
  { id: 20, titulo: 'IFPI Global Music Report 2026: global recorded music revenues hit $31.7B in 2025, up 6.4%; 837 M paid subscription users', editor: 'Music Business Worldwide (sobre IFPI)', tipo: 'Sectorial', fecha: '2026-03-18', url: 'https://www.musicbusinessworldwide.com/global-recorded-music-revenues-hit-31-7bn-in-2025-up-6-4-yoy-users-of-paid-music-subscriptions-reach-837m/' },
  { id: 21, titulo: 'UMG and Sony seek to add 61,000 copyrighted works to Suno lawsuit after discovery reveals Suno trained on millions of their recordings', editor: 'Music Business Worldwide', tipo: 'Prensa', fecha: '2026-05-20', url: 'https://www.musicbusinessworldwide.com/umg-and-sony-seek-to-add-61000-copyrighted-works-to-suno-lawsuit-after-discovery-reveals-suno-trained-on-millions-of-their-recordings/' },
  { id: 22, titulo: 'Universal has settled its lawsuit with Udio and signed AI deals with Udio and Stability', editor: 'Complete Music Update', tipo: 'Prensa', fecha: '2025-10-30', url: 'https://completemusicupdate.com/universal-has-settled-its-lawsuit-with-udio-and-signed-ai-deals-with-udio-and-stability/' },
  { id: 23, titulo: 'UMG investor presentation reveals major’s plans for superfans and streaming growth (Capital Markets Day 2024: objetivos hasta 2028)', editor: 'Music Week', tipo: 'Prensa', fecha: '2024-09-19', url: 'https://www.musicweek.com/labels/read/umg-investor-presentation-reveals-major-s-plans-for-superfans-and-streaming-growth/090486' },
  { id: 24, titulo: 'UMG announces results of its 2026 Annual General Meeting of Shareholders', editor: 'Universal Music Group N.V. (PR Newswire / Cision)', tipo: 'Primaria', fecha: '2026-05-13', url: 'https://digital-release.wboy.com/business/press-releases/cision/20260513LA58768/universal-music-group-n-v-announces-results-of-its-2026-annual-general-meeting-of-shareholders' },
  { id: 25, titulo: 'Universal Music’s £119m CEO pay offer may provoke shareholder revolt (The Guardian)', editor: 'Hargreaves Lansdown / The Guardian', tipo: 'Prensa', fecha: '2024-05-06', url: 'https://www.hl.co.uk/news/universal-musics-119m-ceo-pay-offer-may-provoke-shareholder-revolt' },
  { id: 26, titulo: 'Bundesbank: rendimiento del Bund a 10 años (3,51 % el 14-oct-2026)', editor: 'Deutsche Bundesbank', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://api.statistiken.bundesbank.de/rest/download/BBSIS/D.I.ZST.ZI.EUR.S1311.B.A604.R10XX.R.A.A._Z._Z.A?format=csv&lang=en' },
  { id: 27, titulo: 'Damodaran, Implied ERP by month (ERPbymonth.xlsx): 4,20 % en octubre de 2026', editor: 'A. Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 28, titulo: 'Stocktwits: flujo de mensajes de $UMGNF (abril-agosto de 2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-08-24', url: 'https://api.stocktwits.com/api/2/streams/symbol/UMGNF.json' },
  { id: 29, titulo: 'Stocktwits: flujo de mensajes de $UNVGY (mayo-agosto de 2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-08-31', url: 'https://api.stocktwits.com/api/2/streams/symbol/UNVGY.json' },
  { id: 30, titulo: 'Seeking Alpha: artículos de opinión y debate sobre UMG (marzo-septiembre de 2026, RSS)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-09-02', url: 'https://seekingalpha.com/api/sa/combined/UMGNF.xml' },
  { id: 31, titulo: 'UMG: the reasons behind a significant stock market decline', editor: 'Electronlibre', tipo: 'Prensa', fecha: '2026-09', url: 'https://electronlibre.info/articles/105037-umg-the-reasons-behind-a-significant-stock-market-decline/' },
  { id: 32, titulo: 'Trivano: noticias y recomendaciones de analistas sobre UMG (Barclays equalweight 22,50 EUR; J.P. Morgan overweight 39 EUR)', editor: 'Trivano', tipo: 'Analistas', fecha: '2026-09-29', url: 'https://www.trivano.com/aandeel/universal-music-group-nv.42482.nieuws' },
  { id: 33, titulo: 'Yahoo Finance, datos de mercado de comparables (WMG, Reservoir Media, HYBE, JYP, Spotify, Sony Group, Tencent Music) a 14-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/WMG/key-statistics' },
  { id: 34, titulo: 'AFM, registro de participaciones sustanciales: V. Bolloré en Universal Music Group N.V. (18,51 % del capital y 39,90 % de los votos con el acuerdo con Vivendi y Tencent)', editor: 'Autoriteit Financiële Markten', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://www.afm.nl/en/sector/registers/meldingenregisters/substantiele-deelnemingen/details?id=175189' },
  { id: 35, titulo: 'Cyrille Bolloré steps down from Universal Music Group board', editor: 'Music Business Worldwide', tipo: 'Prensa', fecha: '2025-07-28', url: 'https://www.musicbusinessworldwide.com/cyrille-bollore-son-of-vincent-steps-down-from-universal-music-group-board-as-bollore-group-fights-french-regulator-over-vivendi-share-offer/' },
  { id: 36, titulo: 'Yahoo Finance, cotización de Spotify (SPOT, 523,96 USD), Tencent Music y EUR/USD (1,1227) a 14/15-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/SPOT/history' },
  { id: 38, titulo: 'Informe anual 2023 de Universal Music Group N.V. (ESEF): balances 2022-2023, catálogos, anticipos de regalías y cuentas por pagar', editor: 'Universal Music Group N.V. / AFM (filings.xbrl.org)', tipo: 'Primaria', fecha: '2024-03-07', url: 'https://filings.xbrl.org/724500GJBUL3D9TW9Y18/2023-12-31/ESEF/NL/0/724500GJBUL3D9TW9Y18-2023-12-31-en/reports/724500GJBUL3D9TW9Y18-2023-12-31-en.xhtml' },
  { id: 37, titulo: 'Ficha sectorial propia: música grabada y derechos editoriales (15-oct-2026)', editor: 'Análisis propio (sectores/musica-derechos-2026-10-15.md)', tipo: 'Sectorial', fecha: '2026-10-15', url: null },
];

// ---------------------------------------------------------------- A. Cuentas
const fila = (periodo, ingresos, coste_ventas, gastos_generales, ebitda, amortizaciones, ebit, resultado_financiero, bai, impuestos, minoritarios, beneficio_neto, gastos_financieros, no_rec, bpa, dpa, acciones) => ({
  periodo, ingresos, coste_ventas, gastos_generales, ebitda, amortizaciones, ebit, resultado_financiero, bai, impuestos, minoritarios, beneficio_neto, gastos_financieros,
  participadas_en_ebitda: null, no_recurrentes_en_ebitda: no_rec, bpa, dpa, dpa_extraordinario: 0, acciones_diluidas: acciones,
});
const cuenta = [
  fila('2020', 7432, 3917, 2285, 1457, 236, 1221, 560, 1781, 412, 3, 1366, 15, 30, 0.75, null, 1813),
  fila('2021', 8504, 4608, 2327, 1671, 277, 1394, -229, 1165, 277, 2, 886, 17, 83, 0.49, 0.40, 1813),
  fila('2022', 10340, 5753, 2702, 1977, 377, 1600, -700, 900, 115, 3, 782, 30, 51, 0.43, 0.47, 1817),
  fila('2023', 11108, 6208, 3213, 1800, 382, 1418, 303, 1721, 458, 4, 1259, 77, 8, 0.68, 0.51, 1830),
  fila('2024', 11834, 6746, 3015, 2184, 409, 1775, 1096, 2871, 778, 7, 2086, 81, 148, 1.13, 0.52, 1846),
  fila('2025', 12507, 7196, 2982, 2444, 446, 1998, 88, 2086, 546, 7, 1533, 81, 139, 0.83, 0.52, 1846),
];
const bal = (periodo, activo_total, activo_corriente, pasivo_corriente, pasivo_total, fondo_comercio, intangibles, inmovilizado_material, existencias, clientes, proveedores, caja, deuda_financiera, arrendamientos, patrimonio_neto, minoritarios) => ({
  periodo, activo_total, activo_corriente, pasivo_corriente, pasivo_total, fondo_comercio, intangibles, inmovilizado_material, existencias, clientes, proveedores,
  activos_contrato: null, pasivos_contrato: null, caja, deuda_financiera, arrendamientos, patrimonio_neto, minoritarios, reservas: null,
});
const balance = [
  bal('2020', 11540, 3540, 5008, 9906, 1369, 2409, 176, 79, 3500, 4126, 1141, 3009, 525, 1634, 0),
  bal('2021', 12094, 3334, 5392, 10064, 1480, 3078, 167, 99, 4183, 4875, 585, 2595, 501, 2030, 0),
  bal('2022', 11639, 3604, 6520, 9287, 1578, 3177, 167, 163, 4591, 5150, 439, 2250, 423, 2351, 1),
  bal('2023', 13091, 4056, 6267, 10108, 1624, 3200, 177, 210, 4880, 5711, 413, 2104, 410, 2962, 21),
  bal('2024', 17320, 4573, 7624, 12769, 1895, 3625, 242, 255, 5793, 6394, 553, 2651, 541, 4526, 25),
  bal('2025', 17456, 4575, 7206, 12888, 1754, 3312, 255, 263, 5743, 6229, 451, 2846, 561, 4543, 25),
];
const flu = (periodo, flujo_operativo, capex, pagos_arrendamientos, adquisiciones, desinversiones, dividendos, intereses) => ({
  periodo, flujo_operativo, capex, pagos_arrendamientos, adquisiciones, desinversiones, dividendos, recompras: 0, emision_acciones: 0, intereses_en_financiacion: intereses,
});
const flujos = [
  flu('2020', 926, 995, 91, 9, 27, 283, 15),
  flu('2021', 1140, 449, 86, 82, 143, 785, 17),
  flu('2022', 1732, 452, 86, 80, 9, 798, 44),
  flu('2023', 1885, 299, 80, 332, 2, 929, 91),
  flu('2024', 1755, 449, 81, 698, 83, 933, 102),
  flu('2025', 1739, 540, 72, 412, 143, 953, 102),
];
const seg = (nombre, descripcion, h) => ({ nombre, descripcion, tipo_resultado: 'EBITDA', historico: h.map(([periodo, ingresos, resultado]) => ({ periodo, ingresos, resultado })) });

const A = {
  _estado: 'completa',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 12820, ebitda: 2505, ebit: 1952, beneficio_neto: 1888, bpa: 1.02, dpa: 0.52, dpa_extraordinario: 0, fcf: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [{ periodo: '2026', descripcion: 'Downtown Music Holdings, consolidada desde el 20-feb-2026 (288 M de ventas y 13 M de EBITDA ajustado en el 1S26) [2].' }],
    comentario: 'Las ventas pasan de 7.432 M en 2020 a 12.507 M en 2025 (TCAC del 11 %), casi todo orgánico: suscripciones de streaming, subidas de precio de las plataformas, vinilo y licencias; las compras (catálogos, Downtown en 2026) aportan poco hasta 2026 [1, 3]. En 2025 las ventas crecen un 5,7 % (8,7 % a tipo constante): la debilidad del dólar resta tres puntos. El EBITDA ajustado de la empresa sube de 1.497 M (20,1 %) en 2020 a 2.810 M (22,5 %) en 2025 [1, 5]; la mezcla (más físico, más servicios a artistas y sellos, merchandising con pérdidas) frena el margen y el ahorro del rediseño organizativo lo sostiene [1]. En el 1S26 el margen ajustado cae 1,6 puntos, hasta el 21,1 %, por la consolidación de Downtown (margen del 4,5 %), la mezcla y más gastos centrales [2]. El BPA publicado oscila mucho (0,43-1,13 EUR) porque la cuenta recoge el valor razonable de Spotify y Tencent Music; el BPA ajustado crece sin interrupción: 0,57 (2020), 0,70, 0,80, 0,87, 0,96 y 1,03 EUR (2025) [1, 4, 5].',
    ajustes: 'Las cifras de la cuenta son las publicadas (XBRL ESEF) [3]. El EBITDA del informe es EBIT + amortizaciones y depreciaciones (incluida la de catálogos y la de derechos de uso) y lleva dentro los pagos en acciones (227 M en 2025, 329 M en 2024 y 561 M en 2023 por el arranque del plan de acciones). Como no recurrentes devolvemos al EBITDA la reestructuración del rediseño organizativo (95 M en 2025 y 169 M en 2024), los gastos de la salida a bolsa en EE. UU. y asesoría de compras (45 M en 2025), los de la salida a bolsa de 2021 (23 M) y la remuneración en acciones extraordinaria concedida por Vivendi (45 M en 2021) [1, 4, 5]. El LTM usa el beneficio y el BPA ajustados de la empresa (sin revalorización de participadas cotizadas, pagos en acciones ni amortización de catálogos): el publicado del LTM (BPA de 0,18 EUR) está hundido por la caída de valor de Spotify y Tencent Music [2]. El BPA del objetivo a 12 meses y su historia son el ajustado de la empresa, la base del consenso.',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '1S25', ingresos: 5881, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 1336, margen_ebitda_pct: 22.7, bpa: 0.48, vs_consenso: null },
      { periodo: '2S25', ingresos: 6626, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 1474, margen_ebitda_pct: 22.2, bpa: 0.55, vs_consenso: null },
      { periodo: '1S26', ingresos: 6194, crecimiento_pct: 5.3, crecimiento_organico_pct: 5.7, ebitda: 1310, margen_ebitda_pct: 21.1, bpa: 0.47, vs_consenso: 'Inferior' },
    ],
    ultima_presentacion: null,
    confianza: 'Media',
  },
  balance: {
    historico: balance,
    vencimientos: [],
    liquidez: 'Caja de 451 M a 31-dic-2025; bonos por 2.293 M y pagarés por 384 M; deuda financiera neta de 2.390 M a cierre de 2025 y de 4.131 M a 30-jun-2026 tras la compra de Downtown, 734 M de recompras en el 2T y 514 M de dividendo, compensados en parte por 379 M de la venta de acciones de Spotify [1, 2].',
    rating: 'Grado de inversión (la empresa reafirma el compromiso de mantener sus calificaciones; nota sin verificar en el documento original)',
    coste_deuda_pct: 3.5,
    vida_media_anios: null,
    otros_pasivos: 'Los pasivos que no parecen deuda son los derechos de autor y regalías por pagar a artistas y autores (dentro de proveedores y otras cuentas a pagar: 6.229 M en 2025) y, en el activo, los anticipos de regalías a artistas (3.136 M: 1.146 corrientes y 1.990 no corrientes), que se recuperan con las regalías futuras [3]. Otros pasivos financieros no corrientes: 1.449 M en 2025 [3]. Provisiones: 179 M corrientes y 242 M no corrientes, con los compromisos de pensiones dentro (sin desglose en el XBRL) [3]. La venta de la mitad de la participación en Spotify se reparte con los artistas («los artistas participarán en los ingresos») [11]. El dividendo a cuenta de 0,24 EUR (432 M), declarado el 30-jul y con fecha de pago el 27-oct-2026, es un pasivo a la fecha de corte: la acción ya cotiza sin él [2].',
    comentario: 'El circulante comercial es muy negativo (existencias y clientes 2.870 M frente a 6.229 M de regalías y cuentas por pagar en 2025): el negocio cobra de las plataformas antes de pagar a los artistas. Pero ese circulante se financia en parte con anticipos de regalías, que suben de 1.859 M en 2020 a 3.136 M en 2025 y consumen caja cada año (402 M netos de recuperaciones en 2025, 186 M en 2024) [1, 3]. Con los anticipos dentro, el circulante es de −1,8 % de las ventas. La deuda neta financiera sube de 2.390 M a 4.131 M en el 1S26 (1,5 veces el EBITDA de los últimos 12 meses) por la compra de Downtown, las recompras y el dividendo [2]; la venta de la mitad de Spotify, en curso, la reducirá.',
    confianza: 'Media',
  },
  flujos: {
    historico: flujos,
    comentario: 'El flujo operativo pasa de 926 M (2020) a 1.739 M (2025); la conversión del EBITDA en caja depende de los anticipos de regalías a artistas, que se pagan al firmar o renovar y se recuperan después (588 M netos en 2020, 402 M en 2025) [1, 3, 5]. En el capex incluimos las inversiones en catálogos (929 M en 2020, año de grandes compras; 345 M en 2025) y en software, además del inmovilizado (70 M): la empresa los presenta en inversión y son la forma de comprar ingresos futuros [1, 3]. Estimación propia: el mantenimiento es el inmovilizado y el software (≈1,5 % de las ventas); los catálogos y los anticipos son inversión de crecimiento. El flujo libre de la empresa (definición antigua, después de inversiones estratégicas) fue de 702 M en 2025 y 523 M en 2024; con la definición nueva de 2026 fue de 24 M en el 1S26 frente a 163 M del 1S25, por menos beneficio operativo, más circulante, más intereses y la obra de oficinas [1, 2]. El dividendo (953 M en 2025) supera el flujo libre de la definición antigua.',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'EY Accountants B.V.', anios_auditor: null, opinion: 'Favorable (reelegido por la junta de 2026 para los ejercicios 2026 y 2027) [24]',
    comentario: null,
    senales: [],
    confianza: 'Media',
  },
  negocio: {
    segmentos: [
      seg('Música grabada', 'Sellos discográficos (Republic, Interscope, Island, Capitol, Def Jam, Virgin Music Group…): streaming por suscripción y con anuncios, físico, descargas y licencias.', [['2022', 7937, 1900], ['2023', 8461, 2042], ['2024', 8901, 2275], ['2025', 9456, 2423]]),
      seg('Edición musical', 'Universal Music Publishing Group: derechos de autor de las composiciones (digital, comunicación pública, sincronización y mecánicos).', [['2022', 1799, 410], ['2023', 1956, 470], ['2024', 2121, 511], ['2025', 2260, 549]]),
      seg('Merchandising y otros', 'Bravado: productos de artistas en giras, venta directa y comercio minorista.', [['2022', 618, 36], ['2023', 706, 47], ['2024', 842, 43], ['2025', 811, 16]]),
      seg('Corporativo y eliminaciones', 'Gastos centrales y ventas entre segmentos.', [['2022', -14, -211], ['2023', -15, -190], ['2024', -30, -168], ['2025', -20, -178]]),
    ],
    geografias: [],
    geografias_criterio: null,
    kpis: [
      { kpi: 'Ingresos por suscripciones (música grabada)', valor_anterior: '4.624 M EUR (2024)', valor_actual: '4.884 M EUR (2025)', variacion: '+5,6 % (+8,6 % a tipo constante)', comentario: 'En el 1S26, +7,3 % a tipo constante sin Downtown; +6,7 % en el 2T [1, 2].' },
      { kpi: 'Ingresos por streaming con anuncios (música grabada)', valor_anterior: '1.414 M EUR', valor_actual: '1.435 M EUR', variacion: '+1,5 % (+4,7 % constante)', comentario: 'El consumo se va de las plataformas de vídeo a las de vídeo corto, que pagan peor [1, 2].' },
      { kpi: 'Ventas físicas (música grabada)', valor_anterior: '1.358 M EUR', valor_actual: '1.475 M EUR', variacion: '+8,6 %', comentario: 'Vinilo en EE. UU. y Europa; margen menor que el digital [1].' },
      { kpi: 'Margen EBITDA ajustado del grupo', valor_anterior: '22,5 % (2024)', valor_actual: '22,5 % (2025)', variacion: '0,0 pp', comentario: '21,1 % en el 1S26 (−1,6 pp) por Downtown [1, 2].' },
      { kpi: 'Anticipos de regalías netos de recuperaciones', valor_anterior: '186 M EUR', valor_actual: '402 M EUR', variacion: '×2,2', comentario: 'Renovaciones y prórrogas de grandes artistas; 292 M en el 1S26 [1, 2].' },
      { kpi: 'Inversión en catálogos', valor_anterior: '266 M EUR', valor_actual: '345 M EUR', variacion: '+30 %', comentario: 'Sezen Aksu, A-Sketch, etc. [1].' },
    ],
  },
  fuentes: F,
  huecos: [
    { seccion: 'negocio', campo: 'segmentos 2020-2021', tipo: 'Complemento', intentos: '1) Nota de resultados de 2021 [5]: las tablas de segmentos no se extraen del HTML; 2) XBRL ESEF 2021 sin desglose de segmentos etiquetado; 3) informe anual 2021 en PDF no descargado por tiempo', decision: 'Omitido' },
    { seccion: 'negocio', campo: 'geografias', tipo: 'Complemento', intentos: '1) Notas de resultados 2025 y 1S26 (no publican ventas por región); 2) XBRL ESEF 2025 (sin desglose etiquetado accesible); 3) informe anual 2025 en PDF no descargado (la web de inversores carga con JavaScript)', decision: 'Omitido' },
    { seccion: 'balance', campo: 'vencimientos y vida media de la deuda', tipo: 'Complemento', intentos: '1) Nota de resultados 2025 (solo deuda neta por instrumentos); 2) XBRL ESEF 2025 (sin calendario etiquetado); 3) informe semestral 1S26 no accesible (web con JavaScript)', decision: 'Omitido' },
  ],
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const B = {
  _estado: 'completa',
  sector: {
    definicion: null,
    tamano: '≈ 31.700 M USD de ingresos mayoristas de música grabada en 2025 (IFPI), +6,4 %; ≈ 28.200 M EUR al cambio medio de 2025 [20]',
    unidad_serie: 'millones de USD (ingresos mayoristas de música grabada, IFPI)',
    serie: [{ anio: '2024', tamano: 29800 }, { anio: '2025', tamano: 31700 }],
    tcac_historico_pct: null,
    tcac_previsto_pct: 6.0,
    cr5_pct: null,
    estructura: 'Concentrada',
    drivers: [],
    porter: [],
    ciclo: null,
    regulacion: null,
    tendencias: null,
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 31,
    posicion: '1.º mundial en música grabada (estimación propia ≈ 31 % de los ingresos mayoristas de la IFPI) y entre los dos primeros en edición musical',
    competidores: [
      { nombre: 'Warner Music Group', pais: 'EE. UU.', ticker: 'WMG', ingresos: 6506, cuota_pct: null, margen_ebit_pct: 16.7, comentario: 'Tercera discográfica y editora (Atlantic, Warner Records, Warner Chappell); acuerdo de licencia con Suno en nov-2025. Ingresos de los últimos 12 meses de Yahoo convertidos a EUR [33].' },
      { nombre: 'Sony Music Entertainment (Sony Group)', pais: 'Japón', ticker: '6758.T', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Segunda discográfica y primera editora (Sony Music Publishing); dentro de un conglomerado, sin cifras del segmento abiertas en este análisis.' },
      { nombre: 'Tencent Music Entertainment', pais: 'China', ticker: 'TME', ingresos: 4518, cuota_pct: null, margen_ebit_pct: 29.2, comentario: 'Plataforma dominante en China, cliente de UMG y su accionista (≈ 11 % con Tencent) [33, 34].' },
      { nombre: 'HYBE', pais: 'Corea del Sur', ticker: '352820.KS', ingresos: 2383, cuota_pct: null, margen_ebit_pct: 11.6, comentario: 'K-pop (BTS); distribuye en parte con UMG [33].' },
      { nombre: 'Reservoir Media', pais: 'EE. UU.', ticker: 'RSVR', ingresos: 160, cuota_pct: null, margen_ebit_pct: 13.0, comentario: 'Independiente de edición y catálogos; compra derechos con deuda [33].' },
    ],
    foso: { veredicto: 'Amplio', tendencia: 'Estable', fuentes: [] },
    amenazas: null,
    confianza: 'Media',
  },
  historia: {
    resumen: null,
    hitos: [
      { anio: '1934', hito: 'Origen en Decca Records (EE. UU.).' },
      { anio: '1998', hito: 'Seagram compra PolyGram y la une a Universal Music: nace el grupo actual.' },
      { anio: '2006', hito: 'Vivendi toma el 100 % de Universal Music Group.' },
      { anio: '2011', hito: 'Lucian Grainge, primer ejecutivo; en 2012 compra la música grabada de EMI.' },
      { anio: '2020', hito: 'Un consorcio de Tencent compra el 20 % del grupo a Vivendi.' },
      { anio: '2021', hito: 'Escisión de Vivendi y salida a bolsa en Euronext Ámsterdam (21-sep-2021); Pershing Square compra ≈ 10 % [9].' },
      { anio: '2024', hito: 'Día del inversor: objetivos hasta 2028 de ventas +7 % anual, suscripciones +8-10 % y EBITDA ajustado > 10 % [23]; rediseño organizativo con ahorro de costes.' },
      { anio: '2025', hito: 'Acuerdos «Streaming 2.0» con Spotify y YouTube; acuerdo y licencia con Udio y Stability AI tras demandar a las IA generativas [1, 22].' },
      { anio: '2026', hito: 'Compra de Downtown (feb-26), primeras recompras de su historia (≈ 1.000 M EUR), oferta de Pershing de 30,40 EUR por acción rechazada (29-may) y caída del 25 % en bolsa tras el 2T [2, 9, 12, 15].' },
    ],
    confianza: 'Media',
  },
  esg: { calificaciones: [], materialidad: null, controversias: null, confianza: 'Baja' },
  fuentes: F,
  huecos: [
    { seccion: 'sector', campo: 'serie de tamaño 2020-2023 y segunda fuente independiente', tipo: 'Complemento', intentos: '1) Resumen del Global Music Report 2026 de la IFPI (solo 2025 y el crecimiento de 2024) [20]; 2) informes anuales de la IFPI de años anteriores no abiertos; 3) MIDiA y Goldman Sachs «Music in the Air» no accesibles gratis', decision: 'Omitido' },
    { seccion: 'esg', campo: 'calificaciones ESG', tipo: 'Complemento', intentos: '1) MSCI ESG (requiere JavaScript); 2) Sustainalytics (página de calificación con antibot); 3) informe anual 2025 (no descargado)', decision: 'Omitido' },
  ],
};
guarda('B', B);

// ---------------------------------------------------------------- C. Equipo y gobierno
const C = {
  _estado: 'completa',
  directivos: {
    equipo: [
      { nombre: 'Sir Lucian Grainge', cargo: 'Chairman & CEO (consejero ejecutivo)', desde: '2011', participacion_pct: null, trayectoria: 'Lleva el grupo desde 2011: compra de EMI (2012), salida a bolsa de 2021 y ventas de 4.500 M EUR (2011) a 12.507 M (2025) [1].' },
      { nombre: 'Matt Ellis', cargo: 'Director financiero', desde: '2025', participacion_pct: null, trayectoria: 'Antiguo director financiero de Verizon; anunció las recompras («dislocación en la valoración») y la nueva definición de flujo libre [2, 12].' },
      { nombre: 'Boyd Muir', cargo: 'Director de operaciones', desde: '2025', participacion_pct: null, trayectoria: 'Director financiero hasta 2025 y artífice del rediseño organizativo [4, 18].' },
      { nombre: 'Michael Nash', cargo: 'Director digital', desde: null, participacion_pct: null, trayectoria: 'Negocia los acuerdos con plataformas («Streaming 2.0») y con las IA [18].' },
      { nombre: 'Sherry Lansing', cargo: 'Presidenta del consejo', desde: '2021', participacion_pct: null, trayectoria: 'Antigua presidenta de Paramount Pictures; firmó el rechazo de la propuesta de Pershing [9].' },
    ],
    historial_guidance: [
      { anio: '2025', guia: 'Objetivos del día del inversor 2024 hasta 2028: ventas +7 % anual, suscripciones +8-10 %, EBITDA ajustado > 10 % [23]', real: 'Ventas +8,7 %, suscripciones +8,6 %, EBITDA ajustado +8,6 % a tipo constante [1]', cumplida: 'Parcial' },
      { anio: '2025', guia: 'Salida a bolsa en EE. UU. prevista (compromiso con Pershing)', real: 'Aplazada en mar-2026 por la «dislocación» de la valoración [1]', cumplida: 'No' },
      { anio: '2026', guia: 'Mismos objetivos hasta 2028', real: '1S26 sin Downtown: ventas +5,7 %, suscripciones +7,3 %, EBITDA ajustado +1,6 % a tipo constante [2]', cumplida: 'No' },
    ],
    comentario: null,
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Sir Lucian Grainge', cargo: 'Consejero ejecutivo, Chairman & CEO', tipo: 'Ejecutivo', desde: '2021', comisiones: null },
      { nombre: 'Sherry Lansing', cargo: 'Presidenta del consejo', tipo: 'Independiente', desde: '2021', comisiones: null },
      { nombre: 'James Mitchell', cargo: 'Consejero no ejecutivo (vinculado a Tencent)', tipo: 'Dominical', desde: null, comisiones: null },
      { nombre: 'Nicole Avant', cargo: 'Consejera no ejecutiva', tipo: 'Independiente', desde: null, comisiones: null },
      { nombre: 'Margaret Frerejean-Taittinger', cargo: 'Consejera no ejecutiva', tipo: 'Independiente', desde: null, comisiones: null },
      { nombre: 'Mandy Ginsberg', cargo: 'Consejera no ejecutiva', tipo: 'Independiente', desde: null, comisiones: null },
      { nombre: 'Cathia Lawson-Hall', cargo: 'Consejera no ejecutiva', tipo: 'Independiente', desde: null, comisiones: null },
      { nombre: 'Eric Sprunk', cargo: 'Consejero no ejecutivo', tipo: 'Independiente', desde: null, comisiones: null },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: true, variable_ligado_rentabilidad: true, auditoria_independiente: null, insiders_sin_operaciones: false,
    accionista_control: true, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: null,
    remuneracion: null,
    accionistas: [
      { nombre: 'Grupo Bolloré (Bolloré SE y Compagnie de l’Odet)', pct: 18.51, tipo: 'Dominical; 39,90 % de los votos con el acuerdo de relación con Vivendi y Tencent', variacion: 'Sin cambios relevantes (notificación AFM de may-2025, registro al 15-oct-2026) [34]' },
      { nombre: 'Tencent (Tencent Mobility y Tencent Music Entertainment HK)', pct: null, tipo: 'Dominical, dentro del acuerdo de relación', variacion: 'Estable [34]' },
      { nombre: 'Vivendi SE', pct: null, tipo: 'Dominical, dentro del acuerdo de relación (controlada por el grupo Bolloré)', variacion: 'Estable [34]' },
      { nombre: 'Pershing Square', pct: 0, tipo: 'Antiguo accionista significativo', variacion: 'Salió en jun-2026 (≈ 4,7 %): 14,16 M de acciones vendidas a UMG a 17,66 EUR y el resto en colocación [9, 10]' },
      { nombre: 'Autocartera', pct: null, tipo: 'Recompras 2026', variacion: '57,4 M de acciones compradas en 2026 por ≈ 999 M EUR, para el plan de acciones o amortizar [12, 13]' },
    ],
    insiders: [],
    control_y_defensas: null,
    alertas: [],
    confianza: 'Media',
  },
  fuentes: F,
  huecos: [
    { seccion: 'gobierno', campo: 'votos de remuneración de las tres últimas juntas y remuneración del primer ejecutivo de 2025', tipo: 'Complemento', intentos: '1) Resultados de la junta de 2026 (solo «aprobadas por mayoría», el detalle se publica en la web) [24]; 2) web de inversores (carga con JavaScript); 3) prensa: solo la revuelta de 2023 (40 % en contra) y la paga de 2023-2024 [25]', decision: 'Omitido' },
    { seccion: 'gobierno', campo: 'operaciones de directivos (12 meses)', tipo: 'Complemento', intentos: '1) Registro de operaciones de directivos de la AFM (formulario con JavaScript); 2) Stocktwits y prensa (solo recompras de la empresa); 3) informe semestral (no accesible)', decision: 'Omitido' },
  ],
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const bolsa = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const D = {
  _estado: 'completa',
  identificacion: {
    nombre: 'Universal Music Group N.V.', nombre_corto: 'UMG', ticker: 'UMG', isin: 'NL0015000IY2', mercado: 'Euronext Ámsterdam', indice_referencia: 'AEX',
    pais: 'Países Bajos', pais_iso: 'NL', sector: 'Servicios de comunicación', industria: 'Entretenimiento', sede: 'Hilversum (Países Bajos) y Santa Mónica (EE. UU.)', fundacion: '1934', empleados: null, web: 'universalmusic.com',
    precio: bolsa.identificacion.precio, fecha_precio: bolsa.identificacion.fecha_precio, acciones: 1798.2, capitalizacion_publicada: 27459, free_float_pct: 60.1,
    max_52s: bolsa.identificacion.max_52s, min_52s: bolsa.identificacion.min_52s, volumen_medio_diario: '≈ 53 M EUR/día (3 meses)', proximos_resultados: '2026-10-29',
  },
  consenso: {
    guidance: null,
    estimaciones: [
      { periodo: '2026e', ingresos: 13416, ebitda: 2794, ebit: 2091, bpa: 1.00, dpa: 0.55, fuente: 'Ventas, EBITDA ajustado, EBIT y DPA de MarketScreener (21 analistas) [8]; BPA ajustado de Yahoo (15 analistas) [7]' },
      { periodo: '2027e', ingresos: 14371, ebitda: 3043, ebit: 2343, bpa: 1.09, dpa: 0.57, fuente: 'MarketScreener [8]; BPA ajustado de Yahoo (16 analistas) [7]' },
      { periodo: '2028e', ingresos: 15316, ebitda: 3306, ebit: 2523, bpa: null, dpa: 0.59, fuente: 'MarketScreener [8] (sin BPA ajustado de 2028)' },
    ],
    recomendaciones: { n_analistas: 21, comprar: null, mantener: null, vender: null, po_medio: 21.49, po_min: 12.0, po_max: 39.0 },
    revisiones: null,
    base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: 1.8,
    confianza: 'Media',
  },
  bolsa: { ...bolsa.bolsa, posicion_corta_pct: null, comentario: null, confianza: 'Alta' },
  multiplos_historicos: {
    serie: [
      { anio: '2021', precio_cierre: 24.78, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2022', precio_cierre: 22.51, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2023', precio_cierre: 25.81, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2024', precio_cierre: 24.72, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2025', precio_cierre: 22.23, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
    ],
    comentario: null,
    confianza: 'Media',
  },
  comparables: {
    criterio: null,
    empresas: [
      { nombre: 'Warner Music Group', ticker: 'WMG', pais: 'US', capitalizacion: 13470, ev_ventas: 2.69, ev_ebitda_ltm: 11.8, ev_ebitda_ntm: null, per_ntm: 14.7, crecimiento_pct: 6.1, margen_ebitda_pct: 22.9, roic_pct: null, dn_ebitda: 2.6, fcf_yield_pct: 2.5 },
      { nombre: 'Reservoir Media', ticker: 'RSVR', pais: 'US', capitalizacion: 566, ev_ventas: 6.06, ev_ebitda_ltm: 15.6, ev_ebitda_ntm: null, per_ntm: 12.7, crecimiento_pct: 5.6, margen_ebitda_pct: 38.9, roic_pct: null, dn_ebitda: 6.5, fcf_yield_pct: null },
      { nombre: 'Sony Group', ticker: '6758.T', pais: 'JP', capitalizacion: 128072, ev_ventas: 1.79, ev_ebitda_ltm: 11.0, ev_ebitda_ntm: null, per_ntm: 16.7, crecimiento_pct: -0.8, margen_ebitda_pct: 16.4, roic_pct: null, dn_ebitda: -0.1, fcf_yield_pct: null },
      { nombre: 'Tencent Music Entertainment', ticker: 'TME', pais: 'CN', capitalizacion: 12310, ev_ventas: 2.3, ev_ebitda_ltm: 7.0, ev_ebitda_ntm: null, per_ntm: 8.6, crecimiento_pct: 8.0, margen_ebitda_pct: 33.2, roic_pct: null, dn_ebitda: -1.2, fcf_yield_pct: 7.7 },
      { nombre: 'HYBE', ticker: '352820.KS', pais: 'KR', capitalizacion: 4642, ev_ventas: 1.81, ev_ebitda_ltm: null, ev_ebitda_ntm: null, per_ntm: 18.0, crecimiento_pct: -12.6, margen_ebitda_pct: 2.2, roic_pct: null, dn_ebitda: null, fcf_yield_pct: 3.9 },
      { nombre: 'JYP Entertainment', ticker: '035900.KQ', pais: 'KR', capitalizacion: 822, ev_ventas: 1.06, ev_ebitda_ltm: 5.3, ev_ebitda_ntm: null, per_ntm: 9.9, crecimiento_pct: 8.6, margen_ebitda_pct: 20.2, roic_pct: null, dn_ebitda: -2.2, fcf_yield_pct: 7.7 },
      { nombre: 'Spotify Technology', ticker: 'SPOT', pais: 'SE', capitalizacion: 95944, ev_ventas: 5.59, ev_ebitda_ltm: 37.7, ev_ebitda_ntm: null, per_ntm: 34.2, crecimiento_pct: 14.4, margen_ebitda_pct: 14.8, roic_pct: null, dn_ebitda: -2.4, fcf_yield_pct: 1.4 },
    ],
    comentario: null,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2026-02', objetivo: 'Downtown Music Holdings', comprador: 'Universal Music Group', ev: null, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Distribución y servicios a artistas independientes; consolidada desde el 20-feb-2026 con margen EBITDA ajustado del 4,5 % [2].' },
      { fecha: '2026-04', objetivo: 'Universal Music Group (propuesta, rechazada)', comprador: 'Pershing Square SPARC Holdings', ev: 55800, ev_ventas: null, ev_ebitda: null, prima_pct: 78, excluir: true, comentario: 'Propuesta no vinculante de 30,40 EUR por acción (5,05 en efectivo + 0,77 acciones nuevas), 78 % sobre el cierre del 2-abr; el «ev» es el valor del capital ofrecido. Rechazada el 29-may; pagaba en acciones de la propia sociedad fusionada [9, 11].' },
      { fecha: '2026-06', objetivo: '14,16 M de acciones de UMG (bloque de Pershing)', comprador: 'Universal Music Group (recompra)', ev: 250, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: true, comentario: 'Compra a 17,66 EUR por acción en la salida de Pershing [10].' },
    ],
    comentario: null,
    confianza: 'Baja',
  },
  fuentes: F,
  huecos: [
    { seccion: 'transacciones', campo: 'múltiplos de operaciones del sector', tipo: 'Complemento', intentos: '1) Notas de compra de Downtown (precio de 775 M USD citado en prensa, sin EBITDA); 2) prensa de compras de catálogos (Queen, Hipgnosis/Blackstone) sin EBITDA publicado; 3) informes de MBW y Billboard sobre múltiplos de catálogos (en múltiplo de regalías netas, no de EBITDA)', decision: 'Omitido' },
    { seccion: 'bolsa', campo: 'posición corta', tipo: 'Complemento', intentos: '1) Registro de posiciones cortas de la AFM (formulario con JavaScript); 2) Yahoo (sin dato de Euronext); 3) prensa (sin dato)', decision: 'Omitido' },
  ],
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const E = {
  _estado: 'completa',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Empeora',
    revisadas: [
      { plataforma: 'Stocktwits ($UMGNF y $UNVGY)', fecha: '2026-08', n_comentarios: 30, tono: 'Positivo', resumen: 'Poco debate y casi todo alcista: celebran el rechazo a Pershing («bien que dijeran que no»), comentan las recompras semanales como apoyo al precio y alguno compra para largo plazo; casi ningún mensaje tras la caída del 31-jul [28, 29].' },
      { plataforma: 'Seeking Alpha (artículos de opinión y comentarios)', fecha: '2026-09', n_comentarios: 20, tono: 'Dividido', resumen: 'Entre marzo y julio se alternan tesis alcistas («la tesis alcista es más fuerte que hace dos años», «economía de derechos sólida») con bajistas («escalera a ninguna parte») y una rebaja tras la oferta de Ackman; tras el 2T el debate se centra en la transcripción de la conferencia [30].' },
      { plataforma: 'Prensa económica con comentarios (Reuters, Il Sole 24 Ore, InterSpace)', fecha: '2026-07', n_comentarios: 15, tono: 'Negativo', resumen: 'La caída del 25 % se lee como pérdida de confianza en el crecimiento de suscripciones; críticas de un antiguo directivo a la gestión de Grainge; los brókers (JPMorgan, UBS, ING) defienden que el 2T fue temporal [15, 16, 17].' },
      { plataforma: 'Prensa sectorial europea (Electronlibre)', fecha: '2026-09', n_comentarios: 5, tono: 'Negativo', resumen: 'Atribuye la caída a 15 EUR a la desaceleración del streaming, a los temores por la IA y al aplazamiento de la cotización en EE. UU.; habla de «inversores especulativos» y de recortes de plantilla [31].' },
    ],
    temas: [
      { tema: 'Desaceleración de las suscripciones (6,7 % en el 2T sin Downtown)', postura: 'Bajista', peso: 'Alto', contraste: null },
      { tema: 'Rechazo de la oferta de Ackman a 30,40 EUR y peso de Bolloré', postura: 'Dividida', peso: 'Alto', contraste: null },
      { tema: 'Recompras y venta de la mitad de Spotify', postura: 'Alcista', peso: 'Medio', contraste: null },
      { tema: 'IA generativa: avalancha de canciones sintéticas frente a nuevas licencias', postura: 'Dividida', peso: 'Medio', contraste: null },
    ],
    lectura: null,
    confianza: 'Baja',
  },
  fuentes: F,
  huecos: [
    { seccion: 'sentimiento', campo: 'Reddit y foros neerlandeses (IEX, Beursduivel)', tipo: 'Complemento', intentos: '1) Reddit (403 en este entorno); 2) búsqueda de hilos neerlandeses de septiembre (solo noticias y recomendaciones de Trivano) [32]; 3) foros de Stocktwits y Seeking Alpha leídos en su lugar', decision: 'Omitido' },
  ],
};
guarda('E', E);
console.log('Notas A-E escritas');
