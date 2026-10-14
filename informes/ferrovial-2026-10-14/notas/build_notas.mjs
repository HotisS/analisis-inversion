// Construye las notas A-E de Ferrovial (corte 2026-10-14). Entorno nube: solo WebSearch; cifras de extractos de búsqueda con su URL.
// Cada nota cita con su propia numeración [n]. Ejecutar: node informes/ferrovial-2026-10-14/notas/build_notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dir = path.dirname(fileURLToPath(import.meta.url));
const w = (n, o) => fs.writeFileSync(path.join(dir, n + '.json'), JSON.stringify(o, null, 2), 'utf8');

const F = {
  fy25: { titulo: 'Ferrovial reports strong full-year 2025 results (nota de resultados 2025)', editor: 'Ferrovial', tipo: 'Primaria', fecha: '2026-02-25', url: 'https://static.newsroom.ferrovial.com/wp-content/uploads/2026/02/25215545/press-release-fy25-financial-results-ferrovial.pdf' },
  h126: { titulo: 'Ferrovial reports strong H1 2026 results (nota de resultados 1S26)', editor: 'Ferrovial', tipo: 'Primaria', fecha: '2026-07-28', url: 'https://static.newsroom.ferrovial.com/wp-content/uploads/2026/07/28214513/press-release-h1-2026-financial-results.pdf' },
  iai25: { titulo: 'Integrated Annual Report 2025: Business performance (EBIT ajustado, desinversiones, plusvalía AGS)', editor: 'Ferrovial', tipo: 'Primaria', fecha: '2026-02-25', url: 'https://static-iai.ferrovial.com/wp-content/uploads/sites/14/2026/02/25214727/ferrovial-integrated-annual-report-2025-business-performance.pdf' },
  cc25: { titulo: 'Consolidated Financial Statements 2025', editor: 'Ferrovial', tipo: 'Primaria', fecha: '2026-02-25', url: 'https://static-iai.ferrovial.com/wp-content/uploads/sites/14/2026/02/25230329/iai-2025-ferrovial-consolidated-financial-statements.pdf' },
  ia24: { titulo: 'Integrated Annual Report 2024: Business performance (ingresos 9.147 M, EBITDA ajustado 1.342 M, venta del 19,75 % de Heathrow)', editor: 'Ferrovial', tipo: 'Primaria', fecha: '2025-02-28', url: 'https://informeanualintegrado2024.ferrovial.com/en/?p=9001' },
  fy23: { titulo: 'Ferrovial increased adjusted EBITDA by 40.6% to €991 million in 2023', editor: 'Ferrovial', tipo: 'Primaria', fecha: '2024-02-27', url: 'https://newsroom.ferrovial.com/en/press-releases/ferrovial-increased-adjusted-ebitda-by-40-6-to-e991-million-in-2023/' },
  fy21: { titulo: 'Ferrovial net profit rises to €1,197 million (resultados 2021)', editor: 'Ferrovial', tipo: 'Primaria', fecha: '2022-02-24', url: 'https://newsroom.ferrovial.com/wp-content/uploads/sites/4/2022/02/20220224-ferrovial-net-profit-rises-to-e1197-million.pdf' },
  bolsa22: { titulo: 'Informe anual integrado 2022: Ferrovial en bolsa (cierres 2021-2022, 727,4 M de acciones)', editor: 'Ferrovial', tipo: 'Primaria', fecha: '2023-02-28', url: 'https://informeanualintegrado2022.ferrovial.com/wp-content/uploads/sites/8/2023/02/ferrovial-informe-anual-integrado-2022-ferrovial-en-bolsa.pdf' },
  jga24: { titulo: 'Nota de prensa de la Junta General 2024 (cierre 2023: 33,02 EUR)', editor: 'Ferrovial', tipo: 'Primaria', fecha: '2024-04-11', url: 'https://newsroom.ferrovial.com/wp-content/uploads/sites/4/2024/04/240411-jg-accionistas-final.pdf' },
  jga26: { titulo: 'Nota de prensa de la Junta General 2026 (cierres 2024 y 2025)', editor: 'Ferrovial', tipo: 'Primaria', fecha: '2026-04-09', url: 'https://static.newsroom.ferrovial.com/wp-content/uploads/2026/04/09142635/260409-np-junta-general-de-accionistas-2026.pdf' },
  sa_bal: { titulo: 'Ferrovial SE: Balance Sheet (activo, pasivo y patrimonio 2021-2025)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://stockanalysis.com/stocks/fer/financials/balance-sheet/' },
  sa_stat: { titulo: 'Ferrovial SE (BME:FER) Statistics (LTM: beneficio 606 M, BPA 0,85, FCF 1.880 M)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://stockanalysis.com/quote/bme/FER/statistics/' },
  tipr: { titulo: 'Ferrovial SA Financials (ingresos, resultado de explotación y FCF 2021-2025)', editor: 'TipRanks', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://www.tipranks.com/stocks/es:fer/financials' },
  inv_cf: { titulo: 'Ferrovial Cash Flow (flujo operativo 2021-2024)', editor: 'Investing.com', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://www.investing.com/equities/grupo-ferrovial-cash-flow' },
  heath525: { titulo: 'Ferrovial completa la venta de su 5,25 % en Heathrow con plusvalías de 31 millones', editor: 'Forbes España', tipo: 'Prensa', fecha: '2025-07', url: 'https://forbes.es/economia/755262/ferrovial-completa-la-venta-de-su-525-en-heathrow-con-plusvalias-de-31-millones-de-euros/' },
  etr407: { titulo: 'Ferrovial closes acquisition of additional 5.06% of 407 ETR (6-K, EX-99.1)', editor: 'Ferrovial / SEC', tipo: 'Primaria', fecha: '2025-06-09', url: 'https://www.sec.gov/Archives/edgar/data/1468522/000146852225000075/a20250609_prxclosing407e.htm' },
  scrip26: { titulo: 'Ferrovial paga el dividendo flexible de 0,5578 euros (75,55 % en acciones)', editor: 'Bolsamanía', tipo: 'Prensa', fecha: '2026-06-15', url: 'https://www.bolsamania.com/noticias_print/empresas/ferrovial-400-millones-dividendo-flexible-pagara-05578-euros-accion--22729194.html' },
  remu: { titulo: 'Appendix I: scrip dividend, cash dividend, share buy-back and cancellation of shares (IAI 2025)', editor: 'Ferrovial', tipo: 'Primaria', fecha: '2026-02-25', url: 'https://informeanualintegrado2025.ferrovial.com/en/global-strategy-and-2025-performance/business-performance/appendix/appendix-i-scrip-dividend-cash-dividend-share-buy-back-and-cancellation-of-shares/' },
  buyb: { titulo: 'Ferrovial: share repurchase programme, transactions notice (6-K, sep-2026)', editor: 'Ferrovial / SEC', tipo: 'Primaria', fecha: '2026-09-22', url: 'https://www.sec.gov/Archives/edgar/data/0001468522/000146852226000066/ferr_repurchaseprogram21.htm' },
  q2call: { titulo: 'Ferrovial Q2 earnings call highlights', editor: 'MarketBeat / Nasdaq', tipo: 'Prensa', fecha: '2026-07-29', url: 'https://www.nasdaq.com/articles/ferrovial-q2-earnings-call-highlights' },
  q1: { titulo: 'Ferrovial posts Q1 2026 revenue of €2.1B (6-K)', editor: 'Stock Titan', tipo: 'Prensa', fecha: '2026-05', url: 'https://www.stocktitan.net/sec-filings/FER/6-k-ferrovial-se-current-report-foreign-issuer-eced18a16c00.html' },
  ubs: { titulo: 'UBS Global Research: Ferrovial, I24 bid leaves uncertainty on new US ML returns. Downgrade to Neutral', editor: 'UBS (publicado por Tennessee Lookout)', tipo: 'Analistas', fecha: '2026-08-26', url: 'https://tennesseelookout.com/wp-content/uploads/2026/09/Ferrovial-Downgrade.pdf' },
  tnl: { titulo: 'Bank downgrades Ferrovial stock over I-24 toll lane bid', editor: 'Tennessee Lookout', tipo: 'Prensa', fecha: '2026-09-02', url: 'https://tennesseelookout.com/2026/09/02/bank-downgrades-ferrovial-stock-over-i-24-toll-lane-bid/' },
  demo: { titulo: 'Ferrovial sinks almost 5% and marks lows of nearly a year (consenso Bloomberg 61,32 EUR)', editor: 'Demócrata', tipo: 'Prensa', fecha: '2026-08-26', url: 'https://www.democrata.es/en/economy/ferrovial-sinks-almost-5-and-marks-lows-of-nearly-a-year/amp/' },
  ahn_res: { titulo: 'Ferrovial schedules October 27 results: stock sits 29% below 52-week high (Lang & Schwarz, 45,11 EUR)', editor: 'ad-hoc-news', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.ad-hoc-news.de/boerse/news/corporate-news/ferrovial-schedules-october-27-results-ferrovial-stock-sits-29-00-percent-below-52-week-high/70325782' },
  ahn_bofa: { titulo: 'BofA cuts target for Ferrovial stock from EUR 67 to EUR 60', editor: 'ad-hoc-news', tipo: 'Prensa', fecha: '2026-10-12', url: 'https://www.ad-hoc-news.de/boerse/news/corporate-news/bofa-cuts-target-for-ferrovial-stock-from-eur-67-00-to-eur-60-00/70313576' },
  ahn_jpm: { titulo: 'Ferrovial gets EUR 2.9 billion D35 bid: JPMorgan cuts Ferrovial stock target to EUR 50', editor: 'ad-hoc-news', tipo: 'Prensa', fecha: '2026-10-06', url: 'https://www.ad-hoc-news.de/boerse/news/corporate-news/ferrovial-gets-eur-2-9-billion-d35-bid-jpmorgan-cuts-ferrovial-stock/70276549' },
  ahn_i24: { titulo: 'Ferrovial stock gains 1.32 percent as I-24 deal locks in 50 years', editor: 'ad-hoc-news', tipo: 'Prensa', fecha: '2026-10-01', url: 'https://www.ad-hoc-news.de/boerse/news/corporate-news/ferrovial-stock-gains-1-32-percent-as-i-24-deal-locks-in-50-years/70224462' },
  ahn_usd: { titulo: 'Ferrovial stock was USD 50.15 with a P/E ratio of 52.2 on October 9, 2026', editor: 'ad-hoc-news', tipo: 'Datos de mercado', fecha: '2026-10-09', url: 'https://www.ad-hoc-news.de/boerse/news/corporate-news/ferrovial-stock-was-usd-50-15-with-a-p-e-ratio-of-52-2-on-october-9-2026/70301143' },
  ahn_443: { titulo: 'Ferrovial stock costs EUR 44.43 at USD 36.1 billion market value', editor: 'ad-hoc-news', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://www.ad-hoc-news.de/boerse/news/corporate-news/ferrovial-stock-costs-eur-44-43-at-usd-36-1-billion-market-value/70280382' },
  bolsam: { titulo: 'Cotización de Ferrovial SE (rango de 52 semanas 45,60-63,50 EUR, 28-ago-2026)', editor: 'Bolsamanía', tipo: 'Datos de mercado', fecha: '2026-08-28', url: 'https://www.bolsamania.com/accion/FERROVIAL-SE' },
  gs: { titulo: 'Goldman Sachs ve a esta acción del Ibex 35 con potencial (consenso Reuters 59,55 EUR)', editor: 'Estrategias de Inversión', tipo: 'Prensa', fecha: '2026-05', url: 'https://www.estrategiasdeinversion.com/analisis/los-brokers-recomiendan/recomendaciones-espana/goldman-sachs-ve-a-esta-accion-del-ibex-35-con-n-921349' },
  ubs_es: { titulo: 'Hachazo de UBS a esta acción del Ibex 35 (Ferrovial, 65 → 59 EUR)', editor: 'Estrategias de Inversión', tipo: 'Prensa', fecha: '2026-08-26', url: 'https://www.estrategiasdeinversion.com/analisis/los-brokers-recomiendan/recomendaciones-espana/hachazo-de-ubs-a-esta-accion-del-ibex-35-le-recorta-n-944619' },
  chartmill: { titulo: 'FER estimates (BPA 2026-2028e)', editor: 'Chartmill', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://www.chartmill.com/stock/quote/FER/analyst-ratings' },
  sws: { titulo: 'Ferrovial: future growth (beneficio neto de consenso 2026-2028)', editor: 'Simply Wall St', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://simplywall.st/stocks/us/capital-goods/nasdaq-fer/ferrovial/future' },
  ms_vinci: { titulo: 'Vinci: valuation (PER 2026e 13,2x)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://ca.marketscreener.com/quote/stock/VINCI-39428277/valuation/' },
  mv_vinci: { titulo: 'Vinci valuation multiples (EV/EBITDA 2026e 6,9x)', editor: 'multiples.vc', tipo: 'Datos de mercado', fecha: '2026-05', url: 'https://multiples.vc/public-comps/vinci-valuation-multiples' },
  ms_aena: { titulo: 'Aena: valuation (PER 2026e 17,2x)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://ca.marketscreener.com/quote/stock/AENA-39435859/valuation/' },
  zb_sacyr: { titulo: 'Sacyr: valorisation (PER 2026e 20,6x)', editor: 'Zonebourse', tipo: 'Datos de mercado', fecha: '2026-09-11', url: 'https://www.zonebourse.com/cours/action/SACYR-S-A-69101/valorisation/' },
  ms_asur: { titulo: 'Grupo Aeroportuario del Sureste: PER 2026e 14,2x (vía informe de Aena del repositorio, 14-oct)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-08', url: 'https://au.marketscreener.com/quote/stock/GRUPO-AEROPORTUARIO-DEL-S-6492978/' },
  adp: { titulo: 'Aéroports de Paris y Fraport: PER próximos 12 meses (vía informe de Aena del repositorio, 14-oct)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://www.marketscreener.com/' },
  bund: { titulo: 'Rendimiento del Bund a 10 años (12-oct-2026), serie BBSIS (vía informes del repositorio del 14-oct)', editor: 'Deutsche Bundesbank', tipo: 'Primaria', fecha: '2026-10-12', url: 'https://api.statistiken.bundesbank.de/rest/download/BBSIS/D.I.ZST.ZI.EUR.S1311.B.A604.R10XX.R.A.A._Z._Z.A?format=csv&lang=en' },
  dama: { titulo: 'Implied ERP by month (ERPbymonth.xlsx), fila de octubre de 2026', editor: 'Aswath Damodaran, NYU Stern', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  delpino: { titulo: 'Rafael del Pino, primer accionista de Ferrovial con el 20,25 %', editor: 'Vozpópuli', tipo: 'Prensa', fecha: '2025', url: 'https://www.vozpopuli.com/espana/ferrovial-rafael_del_pino-cnmv-leopoldo_del_pino-siemprelara_0_880112031.html' },
  maria: { titulo: 'Ferrovial cae cerca de un 2 % en bolsa tras la desinversión de María del Pino', editor: 'Infobae (Europa Press)', tipo: 'Prensa', fecha: '2025-05-28', url: 'https://www.infobae.com/espana/agencias/2025/05/28/ferrovial-cae-cerca-de-un-2-en-bolsa-tras-la-desinversion-de-maria-del-pino/' },
  remu25: { titulo: 'Ferrovial: Del Pino y Madridejos, nueva política de remuneración 2025 (fijo 1,65 y 1,6 M)', editor: 'The Objective', tipo: 'Prensa', fecha: '2025-04', url: 'https://theobjective.com/economia/2022-12-29/rafael-del-pino-participacion-ferrovial/' },
  cnmc: { titulo: 'Los Del Pino ficharon a excargos de Competencia mientras Ferrovial manipulaba licitaciones (sanción CNMC)', editor: 'elDiario.es', tipo: 'Prensa', fecha: '2023', url: 'https://www.eldiario.es/economia/pino-ficharon-excargos-competencia-ferrovial-manipulaba-miles-licitaciones_1_10008902.html' },
  traslado: { titulo: 'El traslado de Ferrovial a Países Bajos divide a la dinastía Del Pino', editor: 'Gestión (EFE)', tipo: 'Prensa', fecha: '2023-03', url: 'https://gestion.pe/mundo/espana/traslado-de-ferrovial-a-paises-bajos-divide-a-dinastia-del-pino-noticia/' },
  rankia: { titulo: 'Foro: ¿Buena oportunidad para entrar en Ferrovial (FER)?', editor: 'Rankia', tipo: 'Foros y redes', fecha: '2026-09', url: 'https://www.rankia.com/foros/bolsa/temas/1905729-buena-oportunidad-para-entrar-ferrovial-fer' },
  walnut: { titulo: 'Is FER a Buy or a Sell? The Bull and Bear Case (2026)', editor: 'Walnut Invest', tipo: 'Foros y redes', fecha: '2026-09', url: 'https://walnutinvest.com/stocks/fer/is-it-a-buy-or-sell' },
  webull: { titulo: 'Learn Why The Bull Case For Ferrovial Stock Could Change Following Tennessee Toll Road Deal (Simply Wall St en Webull)', editor: 'Webull / Simply Wall St', tipo: 'Foros y redes', fecha: '2026-09', url: 'https://www.webull.com/news/15680261438784512' },
  webull2: { titulo: 'Is Ferrovial (BME:FER) Cheap On Its Tennessee I 24 Project Win? (comentarios)', editor: 'Webull / Simply Wall St', tipo: 'Foros y redes', fecha: '2026-09', url: 'https://www.webull.com/news/15516817305904128' },
  bolinches: { titulo: 'Ferrovial activará nuevos objetivos con la superación de la resistencia (análisis técnico, El Español-Invertia)', editor: 'El Español', tipo: 'Prensa', fecha: '2026-08-04', url: 'https://www.elespanol.com/invertia/mercados/20260804/ferrovial-activara-nuevos-interesantes-objetivos-superacion-resistencia-euros/1003744343199_0.html' },
  merca: { titulo: 'Ferrovial: unos resultados en línea con las expectativas no justifican los precios', editor: 'Merca2', tipo: 'Prensa', fecha: '2025-10-30', url: 'https://www.merca2.es/2025/10/30/ferrovial-resultados-precios-2246269/' },
  corner: { titulo: 'Ferrovial generates €540 million net profit in H1 2025 thanks to US and Canadian motorways', editor: 'The Corner', tipo: 'Prensa', fecha: '2025-07-29', url: 'https://thecorner.eu/?p=121375' },
  wiki: { titulo: 'Ferrovial (historia corporativa)', editor: 'Wikipedia', tipo: 'Prensa', fecha: '2026', url: 'https://en.wikipedia.org/wiki/Ferrovial' },
  eiffage: { titulo: 'Eiffage strengthens its position in Getlink capital (29,40 %)', editor: 'Eiffage', tipo: 'Primaria', fecha: '2026-03', url: 'https://www.eiffage.com/en/media/news/eiffage-strengthens-its-position-in-getlink-capital-and-raises-its-holding-to-2940-of-the-capital' },
};
const lista = (keys) => keys.map((k, i) => ({ id: i + 1, ...F[k] }));
const cit = (keys) => { const m = {}; keys.forEach((k, i) => (m[k] = i + 1)); return (...ks) => '[' + ks.map((k) => m[k]).join(', ') + ']'; };

// ---------------- A: cuentas ----------------
const KA = ['fy25', 'h126', 'iai25', 'cc25', 'ia24', 'fy23', 'fy21', 'sa_bal', 'sa_stat', 'tipr', 'inv_cf', 'heath525', 'etr407', 'scrip26', 'remu', 'buyb', 'q2call', 'q1', 'bolsa22', 'corner'];
const a = cit(KA);
const cuenta = [
  // EBITDA ajustado de la empresa; EBIT: 2021-2023 «resultado de explotación» de TipRanks; 2024-2025 EBIT ajustado del informe anual.
  { periodo: '2021', ingresos: 6910, ebitda: 596, ebit: 339, beneficio_neto: 1197, bpa: 1.63, acciones_diluidas: 733 },
  { periodo: '2022', ingresos: 7551, ebitda: 728, ebit: 359, beneficio_neto: 185, bpa: 0.25, acciones_diluidas: 727.4 },
  { periodo: '2023', ingresos: 8514, ebitda: 991, ebit: 642, beneficio_neto: 460, bpa: 0.63, acciones_diluidas: 727 },
  { periodo: '2024', ingresos: 9147, ebitda: 1342, ebit: 901, beneficio_neto: 3239, bpa: 4.44, acciones_diluidas: 730 },
  { periodo: '2025', ingresos: 9630, ebitda: 1500, ebit: 967, beneficio_neto: 888, bpa: 1.23, acciones_diluidas: 722 },
].map((c) => ({
  periodo: c.periodo, ingresos: c.ingresos, coste_ventas: null, gastos_generales: null, ebitda: c.ebitda,
  amortizaciones: Math.round((c.ebitda - c.ebit) * 10) / 10, ebit: c.ebit, resultado_financiero: null, bai: null, impuestos: null,
  minoritarios: null, beneficio_neto: c.beneficio_neto, gastos_financieros: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null,
  bpa: c.bpa, dpa: c.periodo === '2025' ? 0.87 : null, dpa_extraordinario: 0, acciones_diluidas: c.acciones_diluidas,
}));

const A = {
  _estado: 'completa (con huecos por el entorno)',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 9900, ebitda: 1630, ebit: null, beneficio_neto: 606, bpa: 0.85, dpa: 0.56, dpa_extraordinario: 0, fcf: 1880, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [
      { periodo: '2024', descripcion: 'Venta del 19,75 % de Heathrow (dic-24) y paso del 5,25 % restante a valor razonable: 2.600 M de impacto en la cuenta.' },
      { periodo: '2025', descripcion: 'Venta de AGS (ene-25, 272 M de plusvalía) y del 5,25 % de Heathrow (jul-25); compra del 5,06 % adicional de 407 ETR (jun-25), que se integra por puesta en equivalencia.' },
    ],
    comentario: `Los ingresos crecieron del ${'6.910'} M de 2021 a 9.630 M en 2025 ${a('tipr', 'fy25')}, con construcción (7.700 M en 2025, el 80 %) como grueso de las ventas y autopistas como grueso del beneficio: EBITDA ajustado de autopistas de 990 M sobre 1.500 M del grupo ${a('fy25')}. El EBITDA ajustado pasó de 596 M (2021) a 728 M (2022), 991 M (2023), 1.342 M (2024) y ≈1.500 M (2025) ${a('fy21', 'fy23', 'ia24', 'fy25')}: el margen sube de 8,6 % a 15,6 % por las tarifas dinámicas de las Managed Lanes de Texas y Virginia y por el margen de construcción (EBIT ajustado del 4,6 % en 2025) ${a('fy25')}. El beneficio neto publicado no sirve para comparar años: 2021 (1.197 M) lleva plusvalías de servicios y ajustes de valor razonable, 2024 (3.239 M) la venta de Heathrow (2.600 M) y 2025 (888 M) la de AGS (272 M) y la del 5,25 % de Heathrow (27 M) ${a('fy21', 'ia24', 'iai25', 'heath525')}. En el 1S26, ingresos de 4.700 M (+11,3 % comparable), EBITDA de 746 M (+21,6 %) y beneficio de 258 M frente a 540 M del 1S25 con plusvalías ${a('h126')}.`,
    ajustes: `Usamos el EBITDA y el EBIT **ajustados** de la empresa (sin desinversiones, deterioros ni ajustes de valor razonable). Beneficio limpio (estimación propia): 2025 = 888 − 272 (AGS) − 27 (Heathrow) ≈ 589 M ${a('fy25', 'iai25', 'heath525')}; 2024 = 3.239 − 2.600 (Heathrow) ≈ 639 M ${a('ia24')}; 2023 = 460 M publicado, sin plusvalías relevantes identificadas ${a('fy23')}. El BPA de 2021-2025 es publicado/estimado con las acciones aproximadas (727,4 M a cierre de 2022 ${a('bolsa22')}); el BPA limpio que usa el objetivo a 12 meses es 0,63 (2023), 0,88 (2024) y 0,82 (2025). La cuenta no separa en estas fuentes el resultado financiero, la puesta en equivalencia (407 ETR), los impuestos ni los minoritarios: quedan en null.`,
    confianza: 'Baja',
  },
  trimestres: {
    items: [
      { periodo: '1S25', ingresos: null, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.75, vs_consenso: null },
      { periodo: '1S26', ingresos: 4700, crecimiento_pct: null, crecimiento_organico_pct: 11.3, ebitda: 746, margen_ebitda_pct: 15.9, bpa: 0.36, vs_consenso: 'Inferior' },
    ],
    ultima_presentacion: `En la conferencia del 29 de julio la dirección destacó el 407 ETR (ingresos +18,7 %, peaje +20,2 % por la subida de tarifas de enero, EBITDA +24,4 %) aunque su tráfico cayó un 2,7 % en el 2T26 por menor actividad, menos obras en vías alternativas y mal tiempo; en el semestre el tráfico subió un 1,8 % con promociones comerciales ${a('q2call')}. Los ingresos superaron lo previsto y el BPA quedó un 16 % por debajo ${a('q2call')}. Las preguntas se centraron en la disciplina en las nuevas licitaciones de Managed Lanes de EE. UU. (I-24 en Nashville, I-285 en Atlanta) y en la entrada en servicio de la Nueva Terminal Uno de JFK (NTO). En el 1T26 los ingresos fueron de 2.100 M ${a('q1')}. Liquidez de 4.700 M y caja neta de 1.300 M sin proyectos a junio ${a('h126')}.`,
    confianza: 'Baja',
  },
  balance: {
    historico: [
      { periodo: '2021', activo_total: 24882, pasivo_total: 19053, patrimonio_neto: 4039, minoritarios: 1790 },
      { periodo: '2022', activo_total: 26344, pasivo_total: 19991, patrimonio_neto: 4113, minoritarios: 2240 },
      { periodo: '2023', activo_total: 26318, pasivo_total: 20439, patrimonio_neto: 3766, minoritarios: 2113 },
      { periodo: '2024', activo_total: 28999, pasivo_total: 20879, patrimonio_neto: 6075, minoritarios: 2045, deuda_financiera: 6061 },
      { periodo: '2025', activo_total: 27420, pasivo_total: 19755, patrimonio_neto: 5908, minoritarios: 1757, deuda_financiera: 5893 },
    ].map((b) => ({ activo_corriente: null, pasivo_corriente: null, fondo_comercio: null, intangibles: null, inmovilizado_material: null, existencias: null, clientes: null, proveedores: null, activos_contrato: null, pasivos_contrato: null, caja: b.deuda_financiera != null ? 0 : null, deuda_financiera: null, arrendamientos: null, reservas: null, ...b })),
    vencimientos: [],
    liquidez: `5.100 M de liquidez sin proyectos a cierre de 2025 y 4.700 M a junio de 2026; caja neta sin proyectos de 1.341 M (2025) y ≈1.300 M (jun-26) ${a('fy25', 'h126')}.`,
    rating: null, coste_deuda_pct: null, vida_media_anios: null,
    otros_pasivos: `La deuda consolidada es sobre todo deuda sin recurso de los proyectos (autopistas de EE. UU.): deuda neta consolidada de 5.893 M en 2025 frente a 6.061 M en 2024, con caja neta de 1.341 M fuera de los proyectos, así que la deuda neta de los proyectos ronda 7.234 M ${a('fy25')}. Compromisos: aportaciones de capital a la NTO de JFK y a la I-24 de Nashville (pago inicial de 1.500 M USD al estado del consorcio y pagos de concesión durante la construcción) ${a('h126')}. Sin datos de pensiones, provisiones ni garantías en las fuentes accesibles.`,
    comentario: `«Deuda financiera» registra la deuda **neta** consolidada (incluida la de los proyectos), con la caja a 0, porque las fuentes accesibles no separan bruta y caja. El patrimonio atribuido pasó de 3.766 M (2023) a 6.075 M (2024) por la plusvalía de Heathrow y bajó a 5.908 M en 2025 por recompras y dividendos ${a('sa_bal', 'cc25')}. La compañía matriz tiene caja neta: el riesgo financiero está aislado en proyectos sin recurso.`,
    confianza: 'Baja',
  },
  flujos: {
    historico: [
      { periodo: '2021', flujo_operativo: 784, capex: 98 },
      { periodo: '2022', flujo_operativo: 921, capex: 14 },
      { periodo: '2023', flujo_operativo: 1263, capex: 83 },
      { periodo: '2024', flujo_operativo: 1293, capex: 223 },
      { periodo: '2025', flujo_operativo: 1910, capex: 480 },
    ].map((f) => ({ pagos_arrendamientos: 0, adquisiciones: null, desinversiones: null, dividendos: null, recompras: null, emision_acciones: 0, intereses_en_financiacion: 0, ...f })),
    comentario: `Flujo operativo de Investing.com para 2021-2024 ${a('inv_cf')} y capex = flujo operativo − FCF de TipRanks (686, 907, 1.180, 1.070 y 1.430 M) ${a('tipr')}: estimación propia de baja confianza; 2025 con el flujo operativo de ≈1.910 M de Tradingkey frente a 2.490 M LTM de Stock Analysis ${a('sa_stat')}, que no cuadran entre sí. La caja relevante para el accionista es la de los dividendos de proyectos: récord de 968 M en 2025 (+2,2 %), con 407 ETR y Managed Lanes como principales ${a('fy25')}. La caja se usa en recompras (programa de hasta 800 M y 15 M de acciones hasta oct-26; 369,4 M invertidos a 18 de septiembre) ${a('buyb')} y en el dividendo flexible (400 M en junio, 75,55 % en acciones) ${a('scrip26')}.`,
    confianza: 'Baja',
  },
  calidad: {
    auditor: null, anios_auditor: null, opinion: null,
    comentario: `La calidad del beneficio publicado es baja como medida recurrente: tres de los últimos cinco ejercicios llevan plusvalías o ajustes de valor razonable de cientos o miles de millones (2021, 2024, 2025) ${a('fy21', 'ia24', 'iai25')}. Además, la mayor parte del valor (407 ETR, 48,29 %) se integra por puesta en equivalencia y el beneficio que aporta no está en el EBITDA ${a('etr407')}. Los indicadores del motor (Altman, Piotroski, Beneish) no son interpretables con un balance tan incompleto. Sin opinión de auditoría localizada en las fuentes accesibles.`,
    senales: [
      { senal: 'Beneficio publicado dominado por plusvalías de rotación de activos', nivel: 'Media', comentario: 'Se trabaja con BPA limpio (estimación propia).' },
      { senal: 'Valor principal en una participada por puesta en equivalencia (407 ETR)', nivel: 'Media', comentario: 'El EBITDA consolidado no la recoge; se valora aparte en el puente.' },
    ],
    confianza: 'Baja',
  },
  capital: {
    politica: `Remuneración por dividendo flexible (scrip) y recompras: en 2025, 0,3182 + 0,4769 EUR en scrip y 0,077 EUR en efectivo (≈0,87 EUR) ${a('remu')}; en 2026, 0,5578 EUR en junio (400 M, +75 % sobre el primer tramo de 2025) ${a('scrip26')}. Recompra de hasta 800 M y 15 M de acciones (≈2 % del capital) hasta octubre de 2026 ${a('remu', 'buyb')}. Prioridad declarada: rotar activos maduros (Heathrow, AGS) hacia autopistas de América del Norte.`,
    adquisiciones: [
      { anio: '2025', objetivo: '5,06 % adicional de 407 ETR (hasta el 48,29 %)', importe: 1330, ev_ebitda: null, financiacion: 'Caja de la venta de Heathrow', resultado: 'CAD 1.990 M; ingresos del 407 +18,7 % y EBITDA +24,4 % en el 1S26 [13, 17]' },
      { anio: '2026', objetivo: 'I-24 Southeast Choice Lanes (Nashville), 50 años', importe: null, ev_ebitda: null, financiacion: 'Consorcio DriveTN con deuda de proyecto', resultado: 'Cerrado el 30-sep-26; UBS estima TIR del accionista ≈7 %' },
    ],
    comentario: `La dirección ha vendido caro (Heathrow, AGS, servicios) y ha reinvertido en el activo de mayor calidad que conocía, el 407 ETR ${a('etr407', 'fy25')}. La duda nueva es la I-24: el mercado teme que la disciplina en las licitaciones de Managed Lanes se esté relajando. Las recompras compensan la dilución del scrip.`,
    confianza: 'Media',
  },
  negocio: {
    segmentos: [
      { nombre: 'Construcción', descripcion: 'Webber, Budimex, Ferrovial Construcción', tipo_resultado: 'EBIT', historico: [{ periodo: '2025', ingresos: 7700, resultado: 352 }] },
      { nombre: 'Autopistas', descripcion: 'Managed Lanes de EE. UU. (consolidadas) y 407 ETR (puesta en equivalencia)', tipo_resultado: 'EBITDA', historico: [{ periodo: '2025', ingresos: 1400, resultado: 990 }] },
      { nombre: 'Energía', descripcion: 'Infraestructuras energéticas', tipo_resultado: 'EBITDA', historico: [{ periodo: '2025', ingresos: 339, resultado: 3 }] },
      { nombre: 'Aeropuertos y otros', descripcion: 'NTO de JFK, Dalaman; corporación y ajustes', tipo_resultado: null, historico: [{ periodo: '2025', ingresos: 191, resultado: null }] },
    ],
    kpis: [
      { kpi: 'Cartera de construcción', valor_anterior: null, valor_actual: '17.400 M EUR (2025)', variacion: 'Récord', comentario: `${a('fy25')}` },
      { kpi: 'Dividendos de proyectos', valor_anterior: '947 M EUR (2024)', valor_actual: '968 M EUR (2025)', variacion: '+2,2 %', comentario: `${a('fy25')}` },
      { kpi: 'Ingreso por viaje del 407 ETR', valor_anterior: null, valor_actual: '+11,7 % (2025)', variacion: '+11,7 %', comentario: `${a('fy25')}` },
      { kpi: 'Tráfico del 407 ETR', valor_anterior: '+1,8 % (1S26)', valor_actual: '−2,7 % (2T26)', variacion: 'Empeora', comentario: `${a('q2call')}` },
    ],
    confianza: 'Media',
  },
  fuentes: lista(KA),
  huecos: [
    { seccion: 'balance', campo: 'historico (caja, deuda bruta, circulante, intangibles)', tipo: 'Núcleo', intentos: '1) Búsqueda de las cuentas consolidadas 2025 y del balance de la nota de resultados; 2) Stock Analysis, Yahoo y Twelve Data en búsqueda; 3) solo aparecen activo, pasivo, patrimonio y deuda neta: WebFetch no funciona en este entorno', decision: 'Omitido' },
    { seccion: 'financieros', campo: 'cuenta (resultado financiero, puesta en equivalencia, impuestos, minoritarios)', tipo: 'Núcleo', intentos: '1) Nota de resultados 2025; 2) informe anual integrado y 20-F en búsqueda; 3) agregadores: solo ingresos, EBIT y beneficio', decision: 'Omitido' },
    { seccion: 'flujos', campo: 'historico (dividendos, recompras, adquisiciones por año)', tipo: 'Núcleo', intentos: '1) Estado de flujos 2025; 2) Stock Analysis e Investing; 3) TipRanks: solo FCF', decision: 'Omitido' },
  ],
};
w('A', A);

// ---------------- B: sector y competencia ----------------
const KB = ['fy25', 'h126', 'etr407', 'wiki', 'ubs', 'tnl', 'ahn_jpm', 'ahn_i24', 'ms_vinci', 'eiffage', 'cnmc', 'q2call', 'traslado'];
const b = cit(KB);
const B = {
  historia: {
    resumen: `Fundada en 1952 por Rafael del Pino Moreno como constructora ferroviaria, Ferrovial salió a bolsa en 1999 y se transformó en promotora de infraestructuras: compró BAA (Heathrow) en 2006, entró en el 407 ETR de Toronto en 1999 y en las Managed Lanes de Texas y Virginia desde 2010 ${b('wiki')}. Entre 2021 y 2025 vendió servicios, Heathrow y AGS para concentrarse en autopistas de América del Norte. En 2023 trasladó la sede a Países Bajos y en 2024 empezó a cotizar en el Nasdaq ${b('wiki', 'traslado')}.`,
    hitos: [
      { anio: '1952', hito: 'Fundación por Rafael del Pino Moreno.' },
      { anio: '1999', hito: 'Salida a bolsa y entrada en el consorcio del 407 ETR (Toronto).' },
      { anio: '2006', hito: 'Compra de BAA (Heathrow y otros aeropuertos británicos).' },
      { anio: '2023', hito: 'Fusión inversa con Ferrovial International SE: sede en Países Bajos.' },
      { anio: '2024', hito: 'Cotización en el Nasdaq; venta del 19,75 % de Heathrow.' },
      { anio: '2025', hito: 'Venta de AGS y del 5,25 % restante de Heathrow; sube al 48,29 % del 407 ETR.' },
      { anio: '2026', hito: 'Cierre de la concesión de 50 años de la I-24 (Nashville) y preferente en la D35 checa (2.900 M).' },
    ],
    confianza: 'Media',
  },
  negocio: {
    descripcion: `Ferrovial desarrolla, financia y opera infraestructuras de transporte en concesión y construye para terceros. Autopistas: 407 ETR de Toronto (48,29 %, puesta en equivalencia) y Managed Lanes de peaje dinámico en Texas (NTE, LBJ, NTE 35W), Virginia (I-66) y Carolina del Norte (I-77), consolidadas con socios ${b('etr407', 'fy25')}. Aeropuertos: Nueva Terminal Uno de JFK (en construcción y apertura escalonada) y Dalaman. Construcción: Webber (EE. UU.), Budimex (Polonia) y Ferrovial Construcción, con cartera récord de 17.400 M ${b('fy25')}. Energía, marginal.`,
    como_gana_dinero: `El beneficio y el valor vienen de las concesiones de peaje: tarifas que suben por contrato o por congestión (ingreso por viaje del 407 +11,7 % en 2025) con costes casi fijos, de modo que el EBITDA de autopistas (990 M en 2025) crece más que los ingresos ${b('fy25')}. La caja llega a la matriz como dividendos de proyectos (968 M en 2025) ${b('fy25')}. Construcción aporta volumen (7.700 M) con margen EBIT ajustado del 4,6 % y es la puerta para ganar nuevas concesiones ${b('fy25')}. El negocio es de capital intensivo al inicio (aportaciones de capital en I-24 y JFK) y muy rentable en la madurez.`,
    geografias: [], geografias_criterio: 'destino',
    clientes: `Los «clientes» de las autopistas son millones de conductores (sin concentración); el riesgo está en el tráfico (−2,7 % en el 407 en el 2T26) ${b('q2call')} y en la regulación de tarifas. En construcción, clientes públicos (estados de EE. UU., Polonia, España). Poder de precios demostrado: el 407 sube tarifas sin tope regulatorio por encima de la inflación, y las Managed Lanes cobran en función de la congestión.`,
    kpis: [],
    confianza: 'Media',
  },
  sector: {
    definicion: 'Ficha sectorial corta (formato de verticales/sector/ficha.md). Perímetro: concesiones de autopistas de peaje y vías de peaje dinámico (managed lanes) de América del Norte y Europa, más construcción de infraestructuras de transporte. GICS: Industria / Infraestructuras de transporte. Es el mercado relevante para el beneficio de Ferrovial; la construcción se trata como negocio auxiliar.',
    tamano: null, unidad_serie: null, serie: [],
    tcac_historico_pct: null, tcac_previsto_pct: null, cr5_pct: null, estructura: 'Moderadamente concentrada',
    drivers: [
      { driver: 'Congestión urbana en Texas, Virginia, Georgia y Tennessee', efecto: '+', horizonte: 'Estructural', evidencia: `Nuevas licitaciones de managed lanes (I-24 de 9.200 M USD en Nashville; I-285 en Atlanta) ${b('tnl', 'ahn_i24')}.` },
      { driver: 'Tarifas por encima de la inflación', efecto: '+', horizonte: 'Estructural', evidencia: `Ingreso por viaje del 407 +11,7 % en 2025 y peaje +20,2 % en el 1S26 ${b('fy25', 'q2call')}.` },
      { driver: 'Actividad económica y tráfico', efecto: '+/−', horizonte: 'Cíclico', evidencia: `Tráfico del 407 −2,7 % en el 2T26 ${b('q2call')}.` },
      { driver: 'Competencia por las licitaciones (disciplina de precios)', efecto: '−', horizonte: 'Estructural', evidencia: `UBS: la oferta de la I-24 cuesta seis veces más por milla que la cartera actual y rendiría ≈7 % al accionista ${b('ubs')}.` },
      { driver: 'Tipos de interés', efecto: '−', horizonte: 'Cíclico', evidencia: 'La valoración de concesiones a 40-90 años es muy sensible a la tasa de descuento.' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: `Pocos promotores con experiencia en managed lanes (Ferrovial, Cintra es la propia Ferrovial, ACS-Iridium, Macquarie, Meridiam), pero pujas agresivas como la I-24 ${b('ubs')}.` },
      { fuerza: 'Poder de los clientes', intensidad: 2, justificacion: 'Conductores atomizados; el poder real lo tiene el concedente (estado) al diseñar el contrato.' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Ferrovial construye sus propias concesiones; el capital y la deuda de proyecto abundan.' },
      { fuerza: 'Amenaza de entrada', intensidad: 3, justificacion: 'Fondos de infraestructuras con capital barato entran en las licitaciones.' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 1, justificacion: 'La vía gratuita paralela está congestionada: por eso se paga el peaje.' },
    ],
    ciclo: { posicion: 'Madurez del ciclo', comentario: `El tráfico del 407 se frena (−2,7 % en el 2T26) mientras las tarifas siguen subiendo ${b('q2call')}. En 2020 el tráfico del 407 se hundió con la pandemia y se recuperó en dos años; en 2022 la subida de tipos castigó las valoraciones de concesiones, no sus ingresos.` },
    regulacion: 'El 407 ETR tiene libertad de tarifas sujeta a umbrales de tráfico hasta 2098; las managed lanes de EE. UU. fijan precio dinámico con topes por contrato. Riesgo político en Canadá (propuestas de rescate o de bajar peajes) y en EE. UU. (oposición local a los peajes, como en Tennessee).',
    tendencias: 'Más concesiones de managed lanes en el sur de EE. UU.; peaje electrónico sin barreras; vehículo eléctrico y teletrabajo como incertidumbres de tráfico. Ferrovial gana con la congestión y con la escasez de fondos públicos para carreteras.',
    confianza: 'Baja',
  },
  competencia: {
    cuota_pct: null,
    posicion: 'Primer promotor privado de managed lanes de EE. UU. y primer accionista del 407 ETR (48,29 %).',
    competidores: [
      { nombre: 'Vinci', pais: 'Francia', ticker: 'DG', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: `Concesiones y construcción, sobre todo en Europa; PER 2026e de 13,2x ${b('ms_vinci')}.` },
      { nombre: 'ACS (Iridium, Hochtief, Turner)', pais: 'España', ticker: 'ACS', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Compite por concesiones y obra en EE. UU. y Canadá.' },
      { nombre: 'Transurban', pais: 'Australia', ticker: 'TCL', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Express lanes en Virginia (495/95) y autopistas en Australia.' },
      { nombre: 'Eiffage (Getlink, APRR)', pais: 'Francia', ticker: 'FGR', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: `Concesiones europeas; 29,40 % de Getlink ${b('eiffage')}.` },
    ],
    foso: {
      veredicto: 'Amplio', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'No aplica.' },
        { fuente: 'Costes de cambio', puntuacion: 2, evidencia: 'El conductor puede usar la vía gratuita, pero congestionada.' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 5, evidencia: `Concesiones exclusivas a muy largo plazo: 407 ETR hasta 2098; I-24 a 50 años ${b('etr407', 'ahn_i24')}.` },
        { fuente: 'Ventaja en costes', puntuacion: 2, evidencia: 'Constructora propia y experiencia en tarifas dinámicas.' },
        { fuente: 'Escala eficiente', puntuacion: 4, evidencia: 'Un corredor solo admite una vía de peaje: monopolio local.' },
      ],
    },
    amenazas: `El foso de los activos existentes es amplio; lo que se puede erosionar es la rentabilidad de lo nuevo. UBS y JPMorgan rebajaron la acción por la I-24, con una TIR estimada del ≈7 % ${b('ubs', 'ahn_jpm')}. Riesgo político de tarifas en Ontario y en los estados de EE. UU.; tráfico del 407 a la baja en el 2T26 ${b('q2call')}.`,
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Seguridad laboral en construcción y emisiones de la obra; el beneficio de las autopistas de peaje dinámico (menos congestión) frente a la crítica por el coste para el conductor; integridad en licitaciones.',
    controversias: `Sanción de la CNMC (2022) a varias constructoras, entre ellas Ferrovial, por repartirse licitaciones públicas durante años ${b('cnmc')}. El traslado de la sede a Países Bajos (2023) generó un choque con el Gobierno español ${b('traslado')}.`,
    confianza: 'Baja',
  },
  fuentes: lista(KB),
  huecos: [
    { seccion: 'sector', campo: 'tamano y serie del mercado de concesiones de peaje', tipo: 'Núcleo', intentos: '1) Búsqueda de estadística de la FHWA y de la IBTTA; 2) informes de mercado de toll roads; 3) sin cifra fiable en extractos de búsqueda', decision: 'Omitido' },
    { seccion: 'competencia', campo: 'ingresos y margen EBIT de los competidores', tipo: 'Complemento', intentos: '1) Informes anuales de Vinci, ACS, Transurban; 2) agregadores; 3) búsqueda conjunta: solo PER', decision: 'Omitido' },
  ],
};
w('B', B);

// ---------------- C: equipo y gobierno ----------------
const KC = ['delpino', 'maria', 'remu25', 'traslado', 'cnmc', 'fy25', 'buyb'];
const c = cit(KC);
const C = {
  directivos: {
    equipo: [
      { nombre: 'Rafael del Pino', cargo: 'Presidente ejecutivo', desde: '2000', participacion_pct: 20.25, trayectoria: `Hijo del fundador; preside desde 2000. Ha dirigido la rotación de Heathrow, servicios y AGS hacia autopistas norteamericanas ${c('delpino')}.` },
      { nombre: 'Ignacio Madridejos', cargo: 'Consejero delegado', desde: '2019', participacion_pct: null, trayectoria: `Antes en Cemex; desde 2019 ha vendido servicios y aeropuertos y ha llevado la cotización al Nasdaq ${c('remu25')}.` },
      { nombre: 'Óscar Fanjul', cargo: 'Vicepresidente', desde: null, participacion_pct: null, trayectoria: `Reelegido vicepresidente en la junta de 2025 ${c('remu25')}.` },
    ],
    historial_guidance: [],
    comentario: `Equipo estable: el presidente lleva 26 años y el consejero delegado siete. La dirección ha cumplido su plan de rotación de activos (venta de Heathrow y AGS, compra del 5 % del 407) ${c('fy25')}. No hay guía anual numérica de beneficio con la que medir el cumplimiento.`,
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Rafael del Pino', cargo: 'Presidente', tipo: 'Ejecutivo', desde: '2000', comisiones: null },
      { nombre: 'Óscar Fanjul', cargo: 'Vicepresidente', tipo: 'Otro externo', desde: null, comisiones: null },
      { nombre: 'Ignacio Madridejos', cargo: 'Consejero delegado', tipo: 'Ejecutivo', desde: '2019', comisiones: null },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: true, consejero_coordinador: null, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: null, auditoria_independiente: null, insiders_sin_operaciones: null,
    accionista_control: true, presidente_vinculado_control: true, cambios_cupula_24m: 0,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: null, fijo: 1.6, variable_corto: null, variable_largo: null, ratio_salario_medio: null },
    remuneracion: `La política de 2025 subió el fijo del presidente un 10 % (1,65 M) y el del consejero delegado un 10,3 % (1,6 M) ${c('remu25')}. No se localizaron las métricas del variable ni los votos de la junta.`,
    accionistas: [
      { nombre: 'Rafael del Pino', pct: 20.25, tipo: 'Familia fundadora (presidente)', variacion: 'Estable' },
      { nombre: 'María del Pino', pct: 8.15, tipo: 'Familia fundadora', variacion: `Vendió parte en mayo de 2025 ${c('maria')}` },
      { nombre: 'Joaquín del Pino', pct: 2.53, tipo: 'Familia fundadora', variacion: null },
      { nombre: 'Autocartera (recompra en curso)', pct: null, tipo: 'Autocartera', variacion: `6,43 M de acciones compradas hasta el 18-sep-26 ${c('buyb')}` },
    ],
    insiders: [],
    control_y_defensas: `La familia Del Pino suma en torno al 31 % y Rafael del Pino, primer accionista con el 20,25 %, preside con funciones ejecutivas: control de hecho ${c('delpino')}. Los hermanos votan por separado desde 2015 ${c('delpino', 'traslado')}. Sede en Países Bajos desde 2023 (derecho societario neerlandés).`,
    alertas: [`Sanción de la CNMC por reparto de licitaciones públicas ${c('cnmc')}.`],
    confianza: 'Baja',
  },
  fuentes: lista(KC),
  huecos: [
    { seccion: 'gobierno', campo: 'consejo completo, comisiones, votos de la junta y variable', tipo: 'Núcleo', intentos: '1) Informe de gobierno y de remuneraciones 2025; 2) 20-F (Item 6); 3) prensa de la junta 2026: solo presidente, vicepresidente, consejero delegado y fijo', decision: 'Omitido' },
    { seccion: 'gobierno', campo: 'insiders (operaciones de consejeros 12 meses)', tipo: 'Complemento', intentos: '1) Registro AFM; 2) CNMV; 3) prensa: sin acceso desde este entorno', decision: 'Omitido' },
  ],
};
w('C', C);

// ---------------- D: mercado y valoración ----------------
const KD = ['ahn_res', 'bolsam', 'ahn_443', 'ahn_usd', 'demo', 'ubs', 'ubs_es', 'ahn_bofa', 'ahn_jpm', 'gs', 'chartmill', 'sws', 'ms_vinci', 'mv_vinci', 'ms_aena', 'zb_sacyr', 'adp', 'ms_asur', 'bolsa22', 'jga24', 'jga26', 'etr407', 'bund', 'dama', 'heath525', 'fy25', 'ia24', 'buyb'];
const d = cit(KD);
const D = {
  identificacion: {
    nombre: 'Ferrovial SE', nombre_corto: 'Ferrovial', ticker: 'FER', isin: 'NL0015001FS8', mercado: 'Bolsa de Madrid y Euronext Ámsterdam (también Nasdaq, en USD)', indice_referencia: 'IBEX 35',
    pais: 'Países Bajos', pais_iso: 'NL', sector: 'Industria', industria: 'Infraestructuras de transporte (concesiones y construcción)', sede: 'Ámsterdam (operativa en Madrid)', fundacion: '1952', empleados: null, web: 'www.ferrovial.com',
    precio: 45.11, fecha_precio: '2026-10-14', acciones: 713, capitalizacion_publicada: null, free_float_pct: 69,
    max_52s: 63.54, min_52s: 44.43, volumen_medio_diario: null, proximos_resultados: '2026-10-27',
  },
  consenso: {
    guidance: `Ferrovial no da guía de beneficio; sus objetivos son de flujo: dividendos de proyectos (968 M en 2025), mantener caja neta sin proyectos y crecer en managed lanes de EE. UU. ${d('fy25')}. Próximos resultados (9 meses): 27 de octubre ${d('ahn_res')}.`,
    estimaciones: [
      { periodo: '2026e', ingresos: null, ebitda: null, ebit: null, bpa: 0.93, dpa: null, fuente: `UBS ${d('ubs')}; Chartmill 1,05 ${d('chartmill')}` },
      { periodo: '2027e', ingresos: null, ebitda: null, ebit: null, bpa: 1.04, dpa: null, fuente: `UBS ${d('ubs')}; Chartmill 1,20 ${d('chartmill')}` },
      { periodo: '2028e', ingresos: null, ebitda: null, ebit: null, bpa: 1.27, dpa: null, fuente: `UBS ${d('ubs')}; Chartmill 1,41 ${d('chartmill')}` },
    ],
    recomendaciones: { n_analistas: 26, comprar: 13, mantener: 11, vender: 2, po_medio: 61.32, po_min: 50, po_max: 70 },
    revisiones: `Desde agosto, recortes: UBS de 65 a 59 EUR y a neutral (26-ago) ${d('ubs', 'ubs_es')}, JPMorgan de 65 a 50 EUR y a neutral ${d('ahn_jpm')}, BofA de 67 a 60 EUR manteniendo comprar (12-oct) ${d('ahn_bofa')}. UBS rebajó el BPA 2026-2030 entre 0 y −2 % por divisa y tráfico ${d('ubs')}. Simply Wall St da un beneficio de consenso de 738, 863 y 908 M para 2026-2028 ${d('sws')}. Consenso Bloomberg de agosto: 13 comprar, 11 mantener, 2 vender y 61,32 EUR de objetivo medio ${d('demo')}; el de Reuters de mayo era de 59,55 EUR ${d('gs')}. El máximo (70) es el caso alcista de UBS y el mínimo (50) el de JPMorgan.`,
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    tipo_rentabilidad: 'de precio (sin dividendos)',
    rentabilidades: [{ periodo: 'En el año', accion_pct: -18.5, indice_pct: null, sector_pct: null }],
    anual: [
      { anio: '2022', accion_pct: -11.2, indice_pct: null },
      { anio: '2023', accion_pct: 34.9, indice_pct: 22.9 },
      { anio: '2024', accion_pct: 23.0, indice_pct: null },
      { anio: '2025', accion_pct: 36.4, indice_pct: 48.2 },
    ],
    beta: null, volatilidad_pct: null, max_drawdown_pct: -29.0, posicion_corta_pct: null,
    comentario: `La acción marcó máximo histórico de 63,54 EUR el 27 de febrero de 2026 y ha caído un 29 % hasta 45,11 EUR (14-oct) ${d('ahn_res')}: primero por la guerra de Irán y los tipos, y desde agosto por la adjudicación de la I-24 de Nashville, que UBS y JPMorgan consideran poco rentable ${d('ubs', 'ahn_jpm')}. El 26 de agosto cayó un 4,95 % hasta 51,42 EUR ${d('demo')}. En 2025 subió un 36,4 % (38,6 % con dividendos) frente al 48,2 % del IBEX ${d('jga26')}.`,
    confianza: 'Baja',
  },
  multiplos_historicos: {
    serie: [
      { anio: '2021', precio_cierre: 27.56, ev_ebitda_ntm: null, per_ntm: null, excluir: true },
      { anio: '2022', precio_cierre: 24.47, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2023', precio_cierre: 33.02, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2024', precio_cierre: 40.6, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2025', precio_cierre: 55.34, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
    ],
    comentario: `Cierres oficiales de la empresa ${d('bolsa22', 'jga24', 'jga26')}. El PER publicado no sirve: el beneficio de 2021, 2024 y 2025 lleva plusvalías. Con BPA limpio del año siguiente (adelantado), el PER fue de 38,8x (2022), 37,7x (2023), 49,8x (2024) y 65,1x (2025, sobre nuestro 2026e); 2021 se excluye porque el BPA de 2022 (0,25) está deprimido. El mínimo de 52 semanas, 44,43 EUR ${d('ahn_443')}. Hoy, 46,0x nuestro 2027e: por debajo de la mediana de 2024-2025 y en línea con la de cinco años (44,3x). Ferrovial cotiza a PER muy altos porque el beneficio contable infravalora concesiones con décadas de crecimiento de tarifas.`,
    confianza: 'Baja',
  },
  comparables: {
    criterio: `No hay comparables puros de un holding de managed lanes y 407 ETR. Se usan concesionarias y constructoras europeas (Vinci, Sacyr) y gestores de aeropuertos cotizados (Aena, ADP, Fraport, ASUR) con su PER de los próximos 12 meses ${d('ms_vinci', 'zb_sacyr', 'ms_aena', 'adp', 'ms_asur')}. Transurban y Atlas Arteria (concesionarias puras) no tienen PER útil (beneficio contable mínimo) y quedan fuera. Los múltiplos son orientativos: Ferrovial cotiza a 3-4 veces su PER por la duración de sus concesiones.`,
    empresas: [
      { nombre: 'Vinci', ticker: 'DG', pais: 'FR', capitalizacion: null, ev_ventas: null, ev_ebitda_ltm: null, ev_ebitda_ntm: 6.9, per_ntm: 13.2, crecimiento_pct: null, margen_ebitda_pct: null, roic_pct: null, dn_ebitda: null, fcf_yield_pct: null },
      { nombre: 'Sacyr', ticker: 'SCYR', pais: 'ES', capitalizacion: null, ev_ventas: null, ev_ebitda_ltm: null, ev_ebitda_ntm: null, per_ntm: 20.6, crecimiento_pct: null, margen_ebitda_pct: null, roic_pct: null, dn_ebitda: null, fcf_yield_pct: null },
      { nombre: 'Aena', ticker: 'AENA', pais: 'ES', capitalizacion: null, ev_ventas: null, ev_ebitda_ltm: null, ev_ebitda_ntm: null, per_ntm: 17.2, crecimiento_pct: null, margen_ebitda_pct: null, roic_pct: null, dn_ebitda: null, fcf_yield_pct: null },
      { nombre: 'Aéroports de Paris', ticker: 'ADP', pais: 'FR', capitalizacion: null, ev_ventas: null, ev_ebitda_ltm: null, ev_ebitda_ntm: null, per_ntm: 18.2, crecimiento_pct: null, margen_ebitda_pct: null, roic_pct: null, dn_ebitda: null, fcf_yield_pct: null },
      { nombre: 'Fraport', ticker: 'FRA', pais: 'DE', capitalizacion: null, ev_ventas: null, ev_ebitda_ltm: null, ev_ebitda_ntm: null, per_ntm: 15.0, crecimiento_pct: null, margen_ebitda_pct: null, roic_pct: null, dn_ebitda: null, fcf_yield_pct: null },
      { nombre: 'ASUR', ticker: 'ASURB', pais: 'MX', capitalizacion: null, ev_ventas: null, ev_ebitda_ltm: null, ev_ebitda_ntm: null, per_ntm: 14.2, crecimiento_pct: null, margen_ebitda_pct: null, roic_pct: null, dn_ebitda: null, fcf_yield_pct: null },
    ],
    comentario: null,
    confianza: 'Baja',
  },
  transacciones: {
    operaciones: [
      { fecha: '2025-06', objetivo: '407 ETR (5,06 %)', comprador: 'Ferrovial (a AtkinsRéalis)', ev: null, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: `CAD 1.990 M por el 5,06 %; el tramo del 3,30 % (CAD 1.353 M) valora el 100 % del capital en ≈CAD 41.000 M ${d('etr407')}.` },
      { fecha: '2025-07', objetivo: 'Heathrow (5,25 %)', comprador: 'Ardian y PIF', ev: null, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: `Venta por 539 M EUR ${d('heath525', 'fy25')}.` },
      { fecha: '2024-12', objetivo: 'Heathrow (19,75 %)', comprador: 'Ardian y PIF', ev: null, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: `Plusvalía de 2.000 M EUR ${d('ia24')}.` },
      { fecha: '2025-01', objetivo: 'AGS Airports (50 %)', comprador: 'AviAlliance', ev: null, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: `533 M EUR, 272 M de plusvalía ${d('fy25')}.` },
    ],
    comentario: `Las operaciones recientes son de rotación de la propia Ferrovial y no publican múltiplo de EBITDA. La más útil es la del 407 ETR: el precio de 2025 valora la participación del 48,29 % en ≈CAD 19.800 M (≈12.400 M EUR), que usamos en el puente ${d('etr407')}. Con la familia Del Pino al ≈31 %, una OPA sobre Ferrovial es improbable.`,
    confianza: 'Media',
  },
  fuentes: lista(KD),
  huecos: [
    { seccion: 'bolsa', campo: 'beta, volatilidad, rentabilidades a 1-10 años', tipo: 'Complemento', intentos: '1) bolsa.mjs (sin red); 2) Yahoo e Investing en búsqueda; 3) prensa: solo cierres anuales y máximo/mínimo', decision: 'Omitido' },
    { seccion: 'comparables', campo: 'EV/EBITDA, crecimiento y márgenes de los comparables', tipo: 'Núcleo', intentos: '1) MarketScreener en búsqueda; 2) multiples.vc y Zonebourse; 3) informe de Aena del repositorio: solo PER', decision: 'Omitido' },
    { seccion: 'transacciones', campo: 'múltiplos EV/EBITDA pagados', tipo: 'Complemento', intentos: '1) Notas de Ferrovial; 2) prensa; 3) AtkinsRéalis: solo importes', decision: 'Omitido' },
  ],
};
w('D', D);

// ---------------- E: sentimiento ----------------
const KE = ['rankia', 'walnut', 'webull', 'webull2', 'bolinches', 'merca', 'ubs', 'q2call', 'ahn_bofa'];
const e = cit(KE);
const E = {
  sentimiento: {
    tono: 'Dividido', tendencia: 'Empeora',
    revisadas: [
      { plataforma: 'Rankia (foro «¿Buena oportunidad para entrar en Ferrovial?», >1.400 respuestas)', fecha: '2026-09', n_comentarios: 20, tono: 'Dividido', resumen: `El hilo mezcla comunicados de recompras y del scrip con usuarios que ven la caída como oportunidad de entrada y otros que esperan a los resultados del 27 de octubre ${e('rankia')}.` },
      { plataforma: 'Webull / Simply Wall St (comentarios sobre la I-24)', fecha: '2026-09', n_comentarios: 15, tono: 'Negativo', resumen: `Se discute si la I-24 cambia el caso alcista: la acción cae un 13,6 % en un mes y un 14,7 % en tres ${e('webull', 'webull2')}.` },
      { plataforma: 'Walnut Invest (caso alcista y bajista)', fecha: '2026-09', n_comentarios: 10, tono: 'Dividido', resumen: `Alcistas: precio y volumen del 407; bajistas: concesiones finitas y dependencia del valor terminal ${e('walnut')}.` },
      { plataforma: 'Prensa con comentarios (El Español, Merca2)', fecha: '2026-08', n_comentarios: 10, tono: 'Dividido', resumen: `Análisis técnico que esperaba superar resistencias en agosto, frente a la tesis de que los resultados «no justifican los precios» ${e('bolinches', 'merca')}.` },
    ],
    temas: [
      { tema: 'La I-24 de Nashville y la disciplina en las licitaciones', postura: 'Bajista', peso: 'Alto', contraste: `Fundado: UBS estima una TIR del ≈7 % y un coste por milla seis veces el de la cartera ${e('ubs')}; el informe lo recoge como riesgo principal y en el bajista.` },
      { tema: 'Caída de la acción como oportunidad', postura: 'Alcista', peso: 'Medio', contraste: `El PER adelantado (46x) está en su mediana de cinco años, no en mínimos: la caída corrige la prima de 2025, no deja la acción barata frente a su historia.` },
      { tema: 'Tráfico del 407 ETR', postura: 'Dividida', peso: 'Medio', contraste: `Dato real: −2,7 % en el 2T26 con tarifas +20 % ${e('q2call')}: el riesgo es la elasticidad, no el precio.` },
      { tema: 'Rebajas de analistas', postura: 'Bajista', peso: 'Medio', contraste: `Recortes de objetivo (UBS, JPMorgan, BofA), aunque BofA sigue en comprar ${e('ahn_bofa')}.` },
    ],
    lectura: `El inversor particular está dividido y más pesimista que hace seis meses: la I-24 ha roto la narrativa de «compounder» sin riesgo. No hay capitulación ni euforia; el sentimiento confirma que el catalizador a corto plazo son los resultados del 27 de octubre y cualquier aclaración sobre la rentabilidad de la I-24. No aporta cifras ni cambia la valoración.`,
    confianza: 'Baja',
  },
  fuentes: lista(KE),
  huecos: [{ seccion: 'sentimiento', campo: 'Reddit, Stocktwits y Seeking Alpha', tipo: 'Complemento', intentos: '1) Búsqueda en Reddit; 2) Stocktwits; 3) Seeking Alpha: sin acceso directo (solo WebSearch)', decision: 'Omitido' }],
};
w('E', E);
console.log('Notas A-E escritas');
