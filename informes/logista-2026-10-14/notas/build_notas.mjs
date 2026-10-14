// Notas A-E de Logista (corte 2026-10-14), escritas desde extractos de búsqueda web (entorno nube: solo WebSearch).
// Cada nota cita con su propia numeración [n]. Ejecutar: node informes/logista-2026-10-14/notas/build_notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dir = path.dirname(fileURLToPath(import.meta.url));
const w = (n, o) => fs.writeFileSync(path.join(dir, n + '.json'), JSON.stringify(o, null, 2), 'utf8');

const F = {
  fy25: { titulo: 'Anuncio de resultados FY25 (ejercicio cerrado el 30-sep-2025)', editor: 'Logista (CNMV)', tipo: 'Primaria', fecha: '2025-11-06', url: 'https://pro-logista.adobe.logista.com/content/dam/documents/logista-corporate/other-relevant-information/es/2025/Anuncio%20de%20Resultados%20FY25%20VF.pdf' },
  fy25p: { titulo: 'FY 2025 Results Presentation', editor: 'Logista', tipo: 'Primaria', fecha: '2025-11-06', url: 'https://www.logista.com/content/dam/documents/logista-corporate/economic-financial-information/results-presentations/en/2025/FY-2025%20Results%20Presentation%20VF.pdf' },
  h126: { titulo: 'Estados financieros intermedios condensados 1S FY26', editor: 'Logista', tipo: 'Primaria', fecha: '2026-05', url: 'https://www.logista.com/content/dam/documents/logista-corporate/economic-financial-information/financial-reports/es/Logista%20EEFF%20intermedios%20condensados%20FY26.pdf' },
  h126b: { titulo: 'El beneficio de Logista cae un 9,9 % en su primer semestre fiscal y los ingresos suben un 2,6 %', editor: 'Bolsamanía (Europa Press)', tipo: 'Prensa', fecha: '2026-05', url: 'https://www.bolsamania.com/noticias/empresas/beneficio-logista-cae-99-primer-semestre-fiscal-ingresos-suben-26--22386980.html' },
  m926: { titulo: 'Logista guanya 210 milions durant els nou mesos del seu any fiscal (−1,8 %) i aprova dividend', editor: 'Bolsamanía (Europa Press)', tipo: 'Prensa', fecha: '2026-07-23', url: 'https://www.bolsamania.com/noticias_print/resultados-anuncios/logista-guanya-210-milions-durant-els-nou-mesos-del-seu-any-fiscal--18-i-aprova-dividend--23117511.html' },
  m926b: { titulo: 'Logista recupera parte de lo perdido en el tercer trimestre de su ejercicio fiscal', editor: 'Alimarket', tipo: 'Prensa', fecha: '2026-07', url: 'https://www.alimarket.es/logistica/noticia/429625/logista-recupera-parte-de-lo-perdido-en-el-tercer-trimestre-de-su-ejercicio-fiscal' },
  div26: { titulo: 'Logista increases its interim dividend by 3,6 % to a gross €0.58 per share', editor: 'Logista', tipo: 'Primaria', fecha: '2026-07-24', url: 'https://www.logista.com/en/home/media/press-releases/20260724.html' },
  div25: { titulo: 'Logista approves a total dividend of €277 million, the same as last year', editor: 'Logista', tipo: 'Primaria', fecha: '2026-02-04', url: 'https://pro-logista.adobe.logista.com/en/home/media/press-releases/20260204.html' },
  fy24: { titulo: 'Logista gana 308 millones en su ejercicio fiscal 2024, un 13,2 % más (ventas económicas 1.757 M, EBIT ajustado 385 M)', editor: 'Merca2 (Europa Press)', tipo: 'Prensa', fecha: '2024-11-06', url: 'https://www.merca2.es/2024/11/06/logista-dividendo-complementario-2057835/' },
  fy23: { titulo: 'Logista incrementa su beneficio un 37 % en el año fiscal, hasta 272 millones', editor: 'Bolsamanía', tipo: 'Prensa', fecha: '2023-11', url: 'https://www.bolsamania.com/noticias/resultados-anuncios/logista-incrementa-beneficio-37-ano-fiscal-272-millones--15249792.html' },
  sa_is: { titulo: 'Logista Integral (BME:LOG): income statement (FY2021-FY2025)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://stockanalysis.com/quote/bme/LOG/financials/income-statement/' },
  roic: { titulo: 'Logista (LOG.MC): ingresos y BPA FY2018-FY2020', editor: 'roic.ai', tipo: 'Datos de mercado', fecha: '2026', url: 'https://www.roic.ai/quote/LOG.MC' },
  tipr: { titulo: 'Logista: income statement y cash flow (BPA 2020-2024)', editor: 'TipRanks', tipo: 'Datos de mercado', fecha: '2026', url: 'https://www.tipranks.com/stocks/es:log/financials/income-statement' },
  fintel: { titulo: 'Logista Integral: balance sheet (annual, Capital IQ)', editor: 'Fintel', tipo: 'Datos de mercado', fecha: '2026', url: 'https://fintel.io/bs/mx/log%20n?t=annual' },
  sws_h: { titulo: 'Logista Integral: balance sheet health (sep-2025)', editor: 'Simply Wall St', tipo: 'Datos de mercado', fecha: '2025-11', url: 'https://simplywall.st/stocks/gb/transportation/bats-chixe-loge/logista-integral-shares/health' },
  fcf25: { titulo: 'Logista FY2025: free cash flow 483 M EUR, capex 54 M, arrendamientos 76 M', editor: 'Investing.com', tipo: 'Datos de mercado', fecha: '2025-11', url: 'https://www.investing.com/equities/logista' },
  merca25: { titulo: 'Logista ofrece una oportunidad en crecimiento inorgánico y un dividendo atractivo (ingresos financieros 73 M frente a 103 M; caja media 2.700 M)', editor: 'Merca2', tipo: 'Prensa', fecha: '2025-11-28', url: 'https://www.merca2.es/2025/11/28/logista-crecimiento-inorganico-2328436/' },
  m925: { titulo: 'Logista gana 214 millones hasta su tercer trimestre fiscal, un 9,7 % menos (ingresos financieros 51 M frente a 77 M)', editor: 'Estrategias de Inversión', tipo: 'Prensa', fecha: '2025-07-17', url: 'https://www.estrategiasdeinversion.com/actualidad/noticias/bolsa-espana/logista-gana-214-millones-hasta-su-tercer-trimestre-n-832049' },
  mosca: { titulo: 'Logista alcanza el 73,33 % del grupo El Mosca y amplía su financiación con Imperial Brands (línea de 3.000 M a Euribor 6 m + 75 pb)', editor: 'Alimarket', tipo: 'Prensa', fecha: '2022-08', url: 'https://www.alimarket.es/logistica/noticia/375620/logista-alcanza-el-73-33--del-grupo-el-mosca-y-amplia-su-financiacion-con-imperial-brands' },
  losada: { titulo: 'Pedro Losada (CFO): «somos capaces de mantener…» (cobertura de tipos ≈50 % con Imperial)', editor: 'Estrategias de Inversión', tipo: 'Prensa', fecha: '2025', url: 'https://www.estrategiasdeinversion.com/analisis/bolsa-y-mercados/el-experto-opina/pedro-losada-cfo-logista-somos-capaces-de-mantener-n-767121' },
  bkt: { titulo: 'Resultados de Logista: análisis de Bankinter (EBIT ajustado +4/+6 % en 2026, comprar)', editor: 'Bankinter', tipo: 'Analistas', fecha: '2026-02', url: 'https://www.bankinter.com/blog/empresas/resultados-logista' },
  xtb: { titulo: 'Las acciones de Logista suben y rozan máximos de septiembre (JB Capital eleva objetivo a 35,50 EUR; 35,86 EUR)', editor: 'XTB', tipo: 'Datos de mercado', fecha: '2026-10-13', url: 'https://www.xtb.com/es/analisis-de-mercado/las-acciones-de-logista-lideran-el-indice-espanol-que-ha-ocurrido' },
  bolsam: { titulo: 'Cotización de Logista Integral (9-oct-2026: 35,36 EUR)', editor: 'Bolsamanía', tipo: 'Datos de mercado', fecha: '2026-10-09', url: 'https://www.bolsamania.com/accion/LOGISTA-INTEGRAL' },
  yahoo: { titulo: 'Logista Integral (CDNIF / LOG.MC): rango de 52 semanas 28,74-36,90', editor: 'Yahoo Finanzas', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://es.finance.yahoo.com/quote/CDNIF' },
  ms_val: { titulo: 'Logista Holdings: valuation (PER, capitalización y BPA FY2021-FY2028e, ejercicio a septiembre)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://marketscreener.com/quote/stock/LOGISTA-HOLDINGS-184385162/valuation-dividend' },
  zb_val: { titulo: 'Logista Holdings: valorisation (capitalización 2022 2.459 M y 2023 3.190 M)', editor: 'Zonebourse', tipo: 'Datos de mercado', fecha: '2026', url: 'https://www.zonebourse.com/cours/action/LOGISTA-HOLDINGS-120797837/valorisation/' },
  ia20: { titulo: 'Informe anual integrado 2020: creación de valor para el accionista (cotización al cierre del ejercicio 2020: 14,6 EUR)', editor: 'Logista', tipo: 'Primaria', fecha: '2020-11', url: 'https://www.logista.com/es/ia/en/creating-value-for-shareholders-and-investors.html' },
  capital: { titulo: 'Share and share capital information (132.750.000 acciones a 30-sep-2025)', editor: 'Logista', tipo: 'Primaria', fecha: '2025-09-30', url: 'https://www.logista.com/en/home/investors-shareholders/share-prices/social-capital.html' },
  inv_cons: { titulo: 'Logista (LOG): consenso de analistas (11 analistas, objetivo medio 32,54 EUR)', editor: 'Investing.com Italia', tipo: 'Analistas', fecha: '2026-07', url: 'https://it.investing.com/equities/logista-consensus-estimates' },
  dsv: { titulo: 'Comparables de logística (Kuehne+Nagel, DHL, GXO, NX, ID Logistics) del informe de DSV del repositorio (7-oct-2026, MarketScreener)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-07', url: 'https://www.marketscreener.com/' },
  rto: { titulo: 'Bunzl: PER próximos 12 meses (informe de Rentokil del repositorio, 7-oct-2026, MarketScreener)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-07', url: 'https://www.marketscreener.com/' },
  imb: { titulo: 'Imperial Brands (IMBBF): forward P/E 9,50', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-06', url: 'https://uk.finance.yahoo.com/quote/IMBBF' },
  gcap: { titulo: 'Imperial sells part of Logista stake to cut debt (queda con el 50,01 %)', editor: 'GlobalCapital', tipo: 'Prensa', fecha: '2022', url: 'https://www.globalcapital.com/article/28msrwf3i64sdcccb2b7i/equity/abbs-block-trades/imperial-sells-part-of-logista-stake-to-cut-debt' },
  iagc21: { titulo: 'Informe Anual de Gobierno Corporativo 2021', editor: 'Logista (CNMV)', tipo: 'Primaria', fecha: '2021-12', url: 'https://www.logista.com/content/dam/documents/logista-corporate/informe-anual-qrs/es/InformeAnualGobiernoCorporativo2021.pdf' },
  iagc22: { titulo: 'Informe Anual de Gobierno Corporativo 2022', editor: 'Logista (CNMV)', tipo: 'Primaria', fecha: '2022-12', url: 'https://www.logista.com/content/dam/documents/logista-corporate/informe-anual-qrs/es/InformeAnualGobiernoCorporativo2022.pdf' },
  vozpo: { titulo: 'Pedro Losada: tenemos elevada capacidad de generación de caja, balance sólido y retribución al accionista atractiva', editor: 'Vozpópuli', tipo: 'Prensa', fecha: '2025', url: 'https://www.vozpopuli.com/economia/pedro-losada-tenemos-elevada-capacidad-de-generacion-de-caja-balance-solido-y-retribucion-al-accionista-atractiva.html' },
  ei_q1: { titulo: 'Logista gana un 8,4 % menos pero mantiene previsiones (1T FY26)', editor: 'Estrategias de Inversión', tipo: 'Prensa', fecha: '2026-02', url: 'https://www.estrategiasdeinversion.com/actualidad/noticias/bolsa-espana/logista-gana-un-84-menos-pero-mantiene-previsiones-n-886945' },
  ei_h1: { titulo: 'Logista gana un 9,9 % menos en su primer semestre, pero ratifica la política de dividendos', editor: 'Estrategias de Inversión', tipo: 'Prensa', fecha: '2026-05', url: 'https://www.estrategiasdeinversion.com/actualidad/noticias/bolsa-espana/logista-gana-un-99-menos-en-su-primer-semestre-n-913031' },
  rankia: { titulo: 'Foro: Seguimiento de Logista (LOG)', editor: 'Rankia', tipo: 'Foros y redes', fecha: '2026', url: 'https://www.rankia.com/foros/bolsa/temas/2355570-seguimiento-logista-log' },
  benz: { titulo: 'Logista: dudas de algunos analistas sobre la guía y poca tracción en bolsa', editor: 'Benzinga España', tipo: 'Foros y redes', fecha: '2025', url: 'https://es.benzinga.com/?p=313340' },
  tikr: { titulo: 'Com rendimento de 6,7 %, as ações da Logista são uma opção de compra para 2026?', editor: 'TIKR (blog)', tipo: 'Foros y redes', fecha: '2026', url: 'https://www.tikr.com/pt/blog/yielding-6-7-is-logista-stock-a-buy-for-2026?' },
  alic: { titulo: 'Logista, un valor al alza cotizando muy por encima de la media móvil de 100 periodos', editor: 'Alicante Plaza', tipo: 'Foros y redes', fecha: '2026', url: 'https://alicanteplaza.es/alicanteplaza/logistaunvaloralalzacotizandomuyporencimadelamediamovilde100periodos' },
  cbolsa: { titulo: 'LOGISTA: confirmación alcista cierre >32,50 EUR; alerta cierre <28,50 EUR', editor: 'Capital Bolsa (Bolsamanía)', tipo: 'Foros y redes', fecha: '2026', url: 'https://www.bolsamania.com/capitalbolsa/noticias/analisis-tecnico/logista-confirmacion-alcista-cierre-3250-euro-alerta-cierre-2850-euro--21454203.html' },
  bund: { titulo: 'Rendimiento del Bund a 10 años (12-oct-2026), serie BBSIS (vía informes del repositorio del 14-oct)', editor: 'Deutsche Bundesbank', tipo: 'Primaria', fecha: '2026-10-12', url: 'https://api.statistiken.bundesbank.de/rest/download/BBSIS/D.I.ZST.ZI.EUR.S1311.B.A604.R10XX.R.A.A._Z._Z.A?format=csv&lang=en' },
  dama: { titulo: 'Implied ERP by month (ERPbymonth.xlsx), fila de octubre de 2026', editor: 'Aswath Damodaran, NYU Stern', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  ts: { titulo: 'LOG/EUR: cierres anuales (diciembre) 2019-2025', editor: 'TradersUnion', tipo: 'Datos de mercado', fecha: '2026', url: 'https://tradersunion.com/currencies/price-history/log-eur/' },
};
const lista = (keys) => keys.map((k, i) => ({ id: i + 1, ...F[k] }));
const cit = (keys) => { const m = {}; keys.forEach((k, i) => (m[k] = i + 1)); return (...ks) => '[' + ks.map((k) => { if (!m[k]) throw new Error('cita sin fuente ' + k); return m[k]; }).join(', ') + ']'; };

// ---------------- A: cuentas ----------------
const KA = ['fy25', 'fy25p', 'h126', 'h126b', 'm926', 'm926b', 'fy24', 'fy23', 'sa_is', 'roic', 'tipr', 'fintel', 'sws_h', 'fcf25', 'merca25', 'm925', 'mosca', 'losada', 'div25', 'div26', 'capital', 'ei_q1', 'vozpo'];
const a = cit(KA);
// Ingresos: Stock Analysis FY21-FY25, roic.ai FY18-FY20. EBIT publicado = margen operativo de Stock Analysis × ingresos (FY24-FY25; FY25 coincide con 318 M de la nota).
// BPA: roic.ai (FY18-FY20), TipRanks/MarketScreener (FY21-FY25). D&A: Stock Analysis FY24-FY25.
const cuenta = [
  { periodo: 'FY2021', ingresos: 10816, ebitda: null, ebit: null, amort: null, beneficio_neto: 175, bpa: 1.32, dpa: null },
  { periodo: 'FY2022', ingresos: 11464, ebitda: null, ebit: null, amort: null, beneficio_neto: 200, bpa: 1.51, dpa: null },
  { periodo: 'FY2023', ingresos: 12427, ebitda: null, ebit: null, amort: null, beneficio_neto: 274, bpa: 2.07, dpa: null },
  { periodo: 'FY2024', ingresos: 12985, ebitda: 490, ebit: 325, amort: 165, beneficio_neto: 308, bpa: 2.34, dpa: 2.09 },
  { periodo: 'FY2025', ingresos: 13535, ebitda: 488, ebit: 318, amort: 170, beneficio_neto: 281, bpa: 2.13, dpa: 2.09 },
].map((c) => ({
  periodo: c.periodo, ingresos: c.ingresos, coste_ventas: null, gastos_generales: null, ebitda: c.ebitda,
  amortizaciones: c.amort, ebit: c.ebit, resultado_financiero: null, bai: null, impuestos: null,
  minoritarios: null, beneficio_neto: c.beneficio_neto, gastos_financieros: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null,
  bpa: c.bpa, dpa: c.dpa, dpa_extraordinario: 0, acciones_diluidas: 132.5,
}));

const A = {
  _estado: 'completa (con huecos por el entorno)',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 13764, ebitda: null, ebit: 318, beneficio_neto: 277, bpa: 2.09, dpa: 2.11, dpa_extraordinario: 0, fcf: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [
      { periodo: 'FY2022', descripcion: 'Compra del 73,33 % del grupo de transporte El Mosca (con opción al 100 % en tres años) y de otras sociedades de transporte y farma.' },
    ],
    comentario: `Los ingresos brutos pasaron de 10.816 M en el FY2021 a 13.535 M en el FY2025 ${a('sa_is', 'fy25')}, pero son en su mayor parte impuestos especiales y precio del tabaco que Logista repercute: la medida útil son las **ventas económicas** (margen bruto), que crecieron de ≈1.685 M (FY2023, estimación desde la variación publicada) a 1.757 M (FY2024) y 1.809 M (FY2025, +3,0 %) ${a('fy24', 'fy25')}. El EBIT ajustado fue de 366 M (FY2023, estimación), 385 M (FY2024) y 378 M (FY2025, −1,9 %), con un beneficio por revalorización de inventarios de ≈35 M y ≈45 M ${a('fy24', 'fy25', 'fy25p')}. El beneficio neto subió de 175 M (FY2021) a 308 M (FY2024) y bajó a 281 M en el FY2025 (−8,8 %) porque los ingresos financieros de la caja prestada a Imperial cayeron de 103 M a 73 M con la bajada de tipos del BCE ${a('fy25', 'merca25')}. En los nueve meses del FY2026 (oct-25 a jun-26): ingresos 10.165 M (+2,3 %), ventas económicas 1.376 M (+1,1 %), EBIT ajustado 296 M (+3 %), EBIT 244 M (plano) y beneficio neto 210 M (−1,8 %) ${a('m926', 'm926b')}.`,
    ajustes: `Usamos el beneficio neto y el BPA publicados (incluyen los ingresos financieros de la caja y el resultado de inventarios). El EBIT ajustado de la empresa excluye la amortización de los activos intangibles de la compra de Logista France y los costes de reestructuración (≈60 M de diferencia en el FY2025: 378 M ajustado frente a 318 M publicado) ${a('fy25')}. EBITDA de FY2024-FY2025 = EBIT publicado + amortización de Stock Analysis (estimación propia: 318 + 170 = 488 M) ${a('sa_is')}. Las acciones (132,5 M) salen de 132,75 M emitidas ${a('capital')} menos una autocartera pequeña (dividendo de 277 M ÷ 2,09 EUR) ${a('div25')}. Los ingresos FY2018-FY2020 (9.476, 10.148 y 10.408 M) y el BPA (1,18, 1,24 y 1,19) son de roic.ai ${a('roic')}.`,
    confianza: 'Baja',
  },
  trimestres: {
    items: [
      { periodo: '1T26', ingresos: null, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.54, vs_consenso: null },
      { periodo: '1S26', ingresos: 6594, crecimiento_pct: 2.6, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 1.03, vs_consenso: null },
      { periodo: '9M26', ingresos: 10165, crecimiento_pct: 2.3, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 1.58, vs_consenso: null },
    ],
    ultima_presentacion: `En el 1T FY26 el beneficio cayó un 8,4 % (71 M) con el EBIT ajustado +2 % (100 M) ${a('ei_q1')}; en el semestre, beneficio de 136 M (−9,9 %), EBIT ajustado de 195 M (−3,5 %) y ventas económicas de 904 M (−1,3 %), por menos revalorización de inventarios; Italia creció (ingresos +6,3 %, 2.380 M) y Francia cayó (−3,4 %, 1.694 M) ${a('h126b')}. El 3T recuperó: a nueve meses el EBIT ajustado sube un 3 % (296 M) y el beneficio cae solo un 1,8 % (210 M) ${a('m926', 'm926b')}. La compañía reiteró la guía del año: EBIT ajustado sin inventarios ni adquisiciones creciendo a un dígito medio sobre el FY2025 y dividendo de al menos 2,09 EUR ${a('h126b', 'div26')}.`,
    confianza: 'Media',
  },
  balance: {
    historico: [
      { periodo: 'FY2021', activo_total: 7588, patrimonio_neto: 524, caja: 172 },
      { periodo: 'FY2022', activo_total: 7694, patrimonio_neto: 567, caja: 219 },
      { periodo: 'FY2023', activo_total: 8062, patrimonio_neto: 595, caja: 193 },
      { periodo: 'FY2024', activo_total: 8081, patrimonio_neto: 642, caja: 169 },
      { periodo: 'FY2025', activo_total: 8308, patrimonio_neto: 643, caja: 175, deuda_financiera: 21 },
    ].map((b) => ({ activo_corriente: null, pasivo_corriente: null, pasivo_total: b.activo_total - b.patrimonio_neto, fondo_comercio: null, intangibles: null, inmovilizado_material: null, existencias: null, clientes: null, proveedores: null, activos_contrato: null, pasivos_contrato: null, deuda_financiera: null, arrendamientos: null, reservas: null, minoritarios: null, ...b })),
    vencimientos: [],
    liquidez: `Logista presta a diario su tesorería excedente a Imperial Brands (línea recíproca de hasta 3.000 M a Euribor a 6 meses + 75 pb, renovada en junio de 2024 por tres años) ${a('mosca', 'merca25')}. La caja media prestada ronda 2.200-2.700 M según los analistas ${a('merca25')}; en balance aparece como crédito a empresas del grupo, no como «caja» (175 M a sep-25) ${a('fintel', 'sws_h')}.`,
    rating: null, coste_deuda_pct: null, vida_media_anios: null,
    otros_pasivos: `El grueso del pasivo (≈7.700 M sobre 8.308 M de activo) son impuestos especiales del tabaco cobrados a los estancos y pendientes de pago a Hacienda y deudas con los fabricantes: un circulante muy negativo que financia la caja prestada a Imperial ${a('fintel', 'merca25')}. Deuda financiera de 21 M a sep-25 ${a('sws_h')}. Sin datos de pasivos por arrendamiento (los pagos de arrendamiento fueron 76 M en el FY2025) ${a('fcf25')}.`,
    comentario: `«Caja» es solo la tesorería en bancos (175 M); la posición financiera real incluye el crédito a Imperial (≈2.000-2.700 M de media), que no se ha podido leer al cierre de cada ejercicio en las fuentes accesibles. El patrimonio es pequeño (643 M) porque Logista reparte ≈100 % del beneficio ${a('div25', 'vozpo')}.`,
    confianza: 'Baja',
  },
  flujos: {
    historico: [
      { periodo: 'FY2024', flujo_operativo: null, capex: null },
      { periodo: 'FY2025', flujo_operativo: 613, capex: 54, pagos_arrendamientos: 76, dividendos: 277 },
    ].map((f) => ({ pagos_arrendamientos: null, adquisiciones: null, desinversiones: null, dividendos: null, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0, ...f })),
    comentario: `En el FY2025 el flujo de caja libre fue de 483 M (225 M en el FY2024), con capex de 54 M y pagos de arrendamientos de 76 M; el flujo «normalizado» (sin el efecto del circulante, que varía mucho con el calendario de pago de impuestos) fue de 315 M ${a('fcf25')}. Flujo operativo FY2025 = 483 + 54 + 76 = 613 M (estimación propia). Las series de TipRanks y Stock Analysis no se pueden asignar a ejercicios con seguridad ${a('tipr')}. El uso de la caja es el dividendo: 277 M en el FY2025 (payout del 99 %) ${a('div25', 'vozpo')}.`,
    confianza: 'Baja',
  },
  calidad: {
    auditor: null, anios_auditor: null, opinion: null,
    comentario: `La calidad del beneficio es buena en caja (flujo normalizado de 315 M frente a 281 M de beneficio) ${a('fcf25', 'fy25')}, pero tiene dos componentes que no controla la empresa: el resultado por revalorización de inventarios (≈35-45 M al año, depende de las subidas de precio e impuestos del tabaco) y los ingresos financieros de la caja prestada a Imperial (103 M en el FY2024, 73 M en el FY2025), que siguen al Euribor ${a('fy25p', 'merca25', 'm925')}. Los indicadores del motor (Altman, Piotroski, Beneish) no se interpretan: el balance está incompleto y el circulante negativo los distorsiona.`,
    senales: [
      { senal: 'Beneficio ligado a los tipos de interés (caja prestada a Imperial)', nivel: 'Media', comentario: 'Cobertura de ≈50 % del riesgo de tipos con Imperial según el CFO.' },
      { senal: 'Resultado por inventarios dentro del EBIT ajustado', nivel: 'Baja', comentario: 'La guía de la empresa lo excluye.' },
    ],
    confianza: 'Baja',
  },
  capital: {
    politica: `Dividendo de al menos el 90 % del beneficio, con suelo de 2,09 EUR por acción para 2024, 2025 y 2026 ${a('div25', 'div26')}: en el FY2025 se repartieron 277 M (payout del 99 %) y el dividendo a cuenta del FY2026 sube un 3,6 % hasta 0,58 EUR (77 M) ${a('div26', 'm926')}. Sin recompras. Las adquisiciones se pagan con la caja (diversificación en farma, transporte y productos de nueva generación) ${a('merca25')}.`,
    adquisiciones: [
      { anio: '2022', objetivo: 'Grupo El Mosca (transporte, 73,33 %)', importe: null, ev_ebitda: null, financiacion: 'Caja', resultado: 'Transporte es el negocio que peor se ha comportado en el FY2025' },
    ],
    comentario: `La asignación de capital es simple: casi todo el beneficio vuelve al accionista y Imperial, con el 50,01 %, recibe la mitad. El riesgo es que el suelo de 2,09 EUR deje sin margen la inversión en diversificación si el beneficio no crece ${a('vozpo', 'div25')}.`,
    confianza: 'Media',
  },
  negocio: {
    segmentos: [],
    kpis: [
      { kpi: 'Ventas económicas del grupo', valor_anterior: '1.757 M EUR (FY2024)', valor_actual: '1.809 M EUR (FY2025)', variacion: '+3,0 %', comentario: `${a('fy24', 'fy25')}` },
      { kpi: 'EBIT ajustado', valor_anterior: '385 M EUR (FY2024)', valor_actual: '378 M EUR (FY2025)', variacion: '−1,9 %', comentario: `${a('fy24', 'fy25')}` },
      { kpi: 'Ingresos financieros', valor_anterior: '103 M EUR (FY2024)', valor_actual: '73 M EUR (FY2025)', variacion: '−29 %', comentario: `${a('merca25')}` },
      { kpi: 'Ventas económicas a 9 meses', valor_anterior: '≈1.361 M EUR (9M FY25)', valor_actual: '1.376 M EUR (9M FY26)', variacion: '+1,1 %', comentario: `${a('m926')}` },
    ],
    confianza: 'Media',
  },
  fuentes: lista(KA),
  huecos: [
    { seccion: 'balance', campo: 'historico (crédito a Imperial al cierre, circulante, deuda y arrendamientos)', tipo: 'Núcleo', intentos: '1) Anuncio de resultados FY25 y cuentas intermedias FY26 en búsqueda; 2) Fintel, Simply Wall St y Stock Analysis; 3) prensa (Merca2, Bankinter): solo caja media estimada por analistas', decision: 'Omitido' },
    { seccion: 'financieros', campo: 'cuenta (EBITDA y EBIT FY2021-FY2023, resultado financiero, impuestos, minoritarios)', tipo: 'Núcleo', intentos: '1) Notas de resultados FY23-FY25; 2) Stock Analysis y TipRanks; 3) MarketScreener: solo ingresos, beneficio y BPA', decision: 'Omitido' },
    { seccion: 'negocio', campo: 'segmentos (ventas económicas y EBIT ajustado por región, 5 años)', tipo: 'Complemento', intentos: '1) Presentaciones FY24-FY25; 2) prensa de resultados: solo ventas económicas FY2024 (Iberia 1.144, Italia 402, Francia 216 M); 3) sin serie completa', decision: 'Omitido' },
    { seccion: 'flujos', campo: 'historico FY2021-FY2024', tipo: 'Núcleo', intentos: '1) Estados de flujos de los informes anuales; 2) TipRanks y Stock Analysis (series sin asignación clara a ejercicios); 3) Investing: solo FCF FY2024-FY2025', decision: 'Omitido' },
  ],
};
w('A', A);

// ---------------- B: sector y competencia ----------------
const KB = ['fy25', 'fy24', 'h126b', 'm926', 'merca25', 'mosca', 'gcap', 'bkt', 'ei_h1', 'fy25p'];
const b = cit(KB);
const B = {
  historia: {
    resumen: `Logista nace de Tabacalera, el antiguo monopolio estatal español del tabaco: al fusionarse con Seita en 1999 (Altadis), su red de distribución se separó y salió a bolsa. Imperial Tobacco compró Altadis en 2008 y con ella el control de Logista. En 2014 volvió a bolsa como Compañía de Distribución Integral Logista Holdings, y en 2022 Imperial vendió parte para quedarse con el 50,01 % ${b('gcap')}. Desde entonces diversifica con compras de transporte (El Mosca) y logística farmacéutica ${b('mosca', 'merca25')}.`,
    hitos: [
      { anio: '1999', hito: 'Tabacalera y Seita forman Altadis; Logista agrupa la distribución.' },
      { anio: '2008', hito: 'Imperial Tobacco compra Altadis y el control de Logista.' },
      { anio: '2014', hito: 'Vuelve a cotizar (OPV de Imperial).' },
      { anio: '2016', hito: 'Integra Logista France tras comprar la parte de Imperial.' },
      { anio: '2022', hito: 'Compra del 73,33 % de El Mosca; Imperial baja al 50,01 %.' },
      { anio: '2024', hito: 'Línea de tesorería con Imperial ampliada a 3.000 M hasta 2027.' },
    ],
    confianza: 'Media',
  },
  negocio: {
    descripcion: `Logista distribuye productos de tabaco, conveniencia, recarga electrónica, farmacia y otros a unos 200.000-300.000 puntos de venta en España, Portugal, Italia, Francia y Polonia. Es el principal distribuidor a los estancos en España, Italia y Francia, por cuenta de todos los fabricantes (Imperial, Philip Morris, JTI, BAT). Fuera del tabaco tiene transporte (paquetería, larga distancia, temperatura controlada) y distribución farmacéutica ${b('fy25', 'merca25')}. Ingresos brutos de 13.535 M en el FY2025, de los que las ventas económicas (lo que queda tras pagar el producto y los impuestos) son 1.809 M ${b('fy25')}.`,
    como_gana_dinero: `Cobra una tarifa por unidad distribuida (cajetilla o producto) a los fabricantes, sin riesgo de precio del producto: el margen depende del volumen y de la tarifa, que se revisa con los fabricantes. Además cobra a los estancos los impuestos especiales antes de pagarlos a Hacienda, lo que le da una caja flotante de ≈2.000-2.700 M que presta a Imperial y que rindió 73 M en el FY2025 ${b('merca25')}. Cuando sube el precio o el impuesto del tabaco, el inventario se revaloriza (≈35-45 M al año) ${b('fy24', 'fy25')}. El negocio no necesita capital: capex de ≈54 M al año.`,
    geografias: [], geografias_criterio: 'origen',
    clientes: `Los clientes que pagan son los fabricantes de tabaco: Imperial (accionista de control) y los grandes competidores, con contratos plurianuales. Los puntos de venta son decenas de miles de estancos sin concentración. El poder de precios está acotado por los contratos y por la caída del volumen de cigarrillos (Francia: ventas económicas −2 % en nueve meses del FY2026) ${b('m926', 'h126b')}.`,
    kpis: [],
    confianza: 'Media',
  },
  sector: {
    definicion: 'Distribución mayorista de tabaco y productos de conveniencia a estancos en el sur de Europa (España, Italia, Francia, Portugal), más logística farmacéutica y transporte. GICS: Industria / Transporte y logística. El tabaco es un mercado regulado (estancos con licencia, impuestos especiales) con volúmenes de cigarrillos en descenso del 2-4 % anual y precios al alza por impuestos.',
    tamano: null, unidad_serie: null, serie: [],
    tcac_historico_pct: null, tcac_previsto_pct: null, cr5_pct: null, estructura: 'Concentrada',
    drivers: [
      { driver: 'Volumen de cigarrillos', efecto: '−', horizonte: 'Estructural', evidencia: `Francia, ventas económicas −2 % en 9M FY26 y ingresos −3,4 % en el semestre ${b('m926', 'h126b')}.` },
      { driver: 'Subidas de precio e impuestos del tabaco', efecto: '+', horizonte: 'Estructural', evidencia: `Revalorización de inventarios de ≈35-45 M al año ${b('fy24', 'fy25')}.` },
      { driver: 'Productos de nueva generación (calentado, vapeo, nicotina oral)', efecto: '+', horizonte: 'Estructural', evidencia: `Italia crece (ingresos +6,3 % en el 1S26) ${b('h126b')}.` },
      { driver: 'Tipos de interés', efecto: '+/−', horizonte: 'Cíclico', evidencia: `Ingresos financieros de 103 M (FY2024) a 73 M (FY2025) ${b('merca25')}.` },
      { driver: 'Diversificación (farma, transporte)', efecto: '+', horizonte: 'Estructural', evidencia: `Bankinter espera EBIT ajustado +4/+6 % en 2026 ${b('bkt')}.` },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 1, justificacion: 'Logista es el distribuidor dominante en España, Italia y Francia; la red de estancos y la regulación hacen inviable duplicarla.' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Cuatro fabricantes concentran el tabaco; Imperial es además el accionista de control.' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Transporte y almacenes subcontratables; el coste laboral es el principal.' },
      { fuerza: 'Amenaza de entrada', intensidad: 1, justificacion: 'Escala, licencias y relación con miles de estancos.' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'Caída estructural del cigarrillo; compensada en parte por productos de nueva generación que también distribuye.' },
    ],
    ciclo: { posicion: 'Madurez del ciclo', comentario: `El tabaco es poco cíclico: en 2008-09 y en 2020 los volúmenes siguieron su tendencia de caída lenta; el precio sube cada año por impuestos. Lo cíclico en Logista es el transporte y los tipos de interés, que movieron el beneficio un ±10 % en 2023-2025 ${b('merca25', 'fy25')}.` },
    regulacion: 'La directiva europea de impuestos al tabaco (en revisión) y las subidas de impuestos nacionales elevan precios y revalorizan inventarios a corto plazo, pero reducen el volumen. La regulación de productos de nueva generación (sabores, nicotina oral) está en debate en la UE y en Francia.',
    tendencias: 'Paso del cigarrillo a calentado y nicotina oral, que Logista también distribuye; concentración del comercio de conveniencia; crecimiento de la logística farmacéutica, donde Logista compra para crecer.',
    confianza: 'Baja',
  },
  competencia: {
    cuota_pct: null,
    posicion: 'Primer distribuidor de tabaco a estancos del sur de Europa (España, Italia y Francia); pequeño en transporte y farma.',
    competidores: [
      { nombre: 'Distribución propia de los fabricantes', pais: 'Europa', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Alternativa teórica: los fabricantes podrían distribuir por su cuenta, pero perderían la escala compartida.' },
      { nombre: 'Distribuidores farmacéuticos (Cofares, Alliance Healthcare)', pais: 'España/Italia', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Competencia en la logística farmacéutica donde Logista quiere crecer.' },
      { nombre: 'Operadores de transporte (DHL, GXO, ID Logistics)', pais: 'Europa', ticker: 'DHL', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Competencia en transporte y logística por contrato.' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Se estrecha',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 2, evidencia: 'La red de puntos de venta atrae a todos los fabricantes y viceversa.' },
        { fuente: 'Costes de cambio', puntuacion: 3, evidencia: 'Cambiar de distribuidor exige rehacer la logística a miles de estancos.' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 2, evidencia: 'Autorizaciones de distribución de tabaco; sin marca propia.' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Densidad de rutas que nadie más tiene.' },
        { fuente: 'Escala eficiente', puntuacion: 4, evidencia: 'Mercado que solo admite un distribuidor eficiente por país.' },
      ],
    },
    amenazas: `El foso es la escala en un mercado que encoge: el cigarrillo cae un 2-4 % al año y Francia ya resta ${b('m926')}. Si un gran fabricante decidiera distribuir por su cuenta o renegociar tarifas a la baja, el margen sufriría. El riesgo de tipos (caja prestada a Imperial) no es competitivo pero pesa en el beneficio ${b('merca25')}.`,
    confianza: 'Baja',
  },
  esg: {
    calificaciones: [],
    materialidad: 'La exposición al tabaco excluye a Logista de muchos fondos ESG; la flota de transporte y los almacenes concentran las emisiones.',
    controversias: 'Sin controversias relevantes localizadas en las fuentes accesibles.',
    confianza: 'Baja',
  },
  fuentes: lista(KB),
  huecos: [
    { seccion: 'sector', campo: 'tamaño y serie del mercado de distribución de tabaco en el sur de Europa', tipo: 'Núcleo', intentos: '1) Estadísticas del Comisionado para el Mercado de Tabacos y de las aduanas italiana y francesa en búsqueda; 2) informes sectoriales; 3) presentaciones de Logista: sin cifra en los extractos', decision: 'Omitido' },
    { seccion: 'competencia', campo: 'ingresos, cuota y margen de los competidores', tipo: 'Complemento', intentos: '1) No hay competidores cotizados equivalentes; 2) distribuidores farmacéuticos (no cotizan); 3) operadores de transporte: márgenes no comparables', decision: 'Omitido' },
  ],
};
w('B', B);

// ---------------- C: equipo y gobierno ----------------
const KC = ['iagc21', 'iagc22', 'gcap', 'vozpo', 'losada', 'div25', 'mosca'];
const c = cit(KC);
const C = {
  directivos: {
    equipo: [
      { nombre: 'Íñigo Meirás', cargo: 'Consejero delegado', desde: '2019', participacion_pct: null, trayectoria: `Antes consejero delegado de Ferrovial; figura como consejero delegado en el IAGC de 2021 y 2022 ${c('iagc21', 'iagc22')}. No se ha confirmado en fuentes de 2026.` },
      { nombre: 'Pedro Losada', cargo: 'Director financiero', desde: null, participacion_pct: null, trayectoria: `Portavoz financiero en 2025 sobre generación de caja y cobertura de tipos con Imperial ${c('vozpo', 'losada')}.` },
    ],
    historial_guidance: [],
    comentario: `La dirección prioriza el dividendo (payout del 99 % en el FY2025) y la diversificación por compras ${c('vozpo', 'div25')}. La guía del FY2025 (crecimiento del EBIT ajustado) no se cumplió (−1,9 %); la del FY2026 va en camino a nueve meses (+3 %).`,
    confianza: 'Baja',
  },
  gobierno: {
    consejo: [
      { nombre: 'Gregorio Marañón', cargo: 'Presidente', tipo: 'Independiente', desde: null, comisiones: null },
      { nombre: 'Íñigo Meirás', cargo: 'Consejero delegado', tipo: 'Ejecutivo', desde: '2019', comisiones: null },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: null, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: true, variable_ligado_rentabilidad: null, auditoria_independiente: null, insiders_sin_operaciones: null,
    accionista_control: true, presidente_vinculado_control: false, cambios_cupula_24m: null,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: null, total: null, fijo: null, variable_corto: null, variable_largo: null, ratio_salario_medio: null },
    remuneracion: 'No se localizaron las cifras de remuneración ni los votos de la junta en las fuentes accesibles.',
    accionistas: [
      { nombre: 'Imperial Brands (Imperial Tobacco Ltd.)', pct: 50.01, tipo: 'Accionista de control (industrial)', variacion: `Vendió parte en 2022 para reducir deuda ${c('gcap')}` },
    ],
    insiders: [],
    control_y_defensas: `Imperial Brands controla el 50,01 % de los votos ${c('iagc21', 'gcap')} y es a la vez cliente, prestatario de la caja de Logista (línea de hasta 3.000 M a Euribor a 6 meses + 75 pb) y proveedor de la cobertura de tipos ${c('mosca', 'losada')}. Es la operación vinculada más relevante del grupo y la principal cuestión de gobierno: el minoritario depende de que esas condiciones sean de mercado.`,
    alertas: [`Operación vinculada de tesorería con el accionista de control (Imperial) por ≈2.000-3.000 M ${c('mosca')}.`],
    confianza: 'Baja',
  },
  fuentes: lista(KC),
  huecos: [
    { seccion: 'gobierno', campo: 'consejo completo, remuneración, votos y operaciones de directivos', tipo: 'Núcleo', intentos: '1) IAGC e IARC 2025 en búsqueda; 2) CNMV (sin acceso desde este entorno); 3) prensa de la junta de febrero de 2026: sin datos', decision: 'Omitido' },
  ],
};
w('C', C);

// ---------------- D: mercado y valoración ----------------
const KD = ['xtb', 'bolsam', 'yahoo', 'ms_val', 'zb_val', 'ia20', 'capital', 'inv_cons', 'bkt', 'dsv', 'rto', 'imb', 'bund', 'dama', 'ts', 'div26', 'm926'];
const d = cit(KD);
const D = {
  identificacion: {
    nombre: 'Compañía de Distribución Integral Logista Holdings, S.A.', nombre_corto: 'Logista', ticker: 'LOG', isin: 'ES0105027009', mercado: 'Bolsa de Madrid (Mercado Continuo)', indice_referencia: 'IBEX 35',
    pais: 'España', pais_iso: 'ES', sector: 'Industria', industria: 'Distribución y logística (tabaco, conveniencia, farma, transporte)', sede: 'Leganés (Madrid)', fundacion: '1999', empleados: null, web: 'www.logista.com',
    precio: 35.86, fecha_precio: '2026-10-13', acciones: 132.5, capitalizacion_publicada: null, free_float_pct: 49.99,
    max_52s: 36.9, min_52s: 28.74, volumen_medio_diario: null, proximos_resultados: '2026-11-05',
  },
  consenso: {
    guidance: `Guía del FY2026: EBIT ajustado sin inventarios ni adquisiciones creciendo a un dígito medio sobre el FY2025 y dividendo de al menos 2,09 EUR; a nueve meses, EBIT ajustado +3 % ${d('m926', 'div26')}. Resultados del FY2026 previstos a principios de noviembre (estimación por el calendario de 2025).`,
    estimaciones: [
      { periodo: 'FY2026e', ingresos: null, ebitda: null, ebit: null, bpa: 2.12, dpa: null, fuente: `MarketScreener ${d('ms_val')}` },
      { periodo: 'FY2027e', ingresos: null, ebitda: null, ebit: null, bpa: 2.17, dpa: null, fuente: `MarketScreener ${d('ms_val')}` },
      { periodo: 'FY2028e', ingresos: null, ebitda: null, ebit: null, bpa: 2.42, dpa: null, fuente: `MarketScreener ${d('ms_val')}` },
    ],
    recomendaciones: { n_analistas: 11, comprar: 2, mantener: 6, vender: 3, po_medio: 32.54, po_min: 26.7, po_max: 35 },
    revisiones: `Consenso de Investing (julio de 2026): 11 analistas, 2 comprar, 6 mantener y 3 vender, objetivo medio de 32,54 EUR (26,70 de Kepler Cheuvreux, en venta, a 35 EUR) ${d('inv_cons')}. Bankinter mantiene comprar y esperaba EBIT ajustado +4/+6 % en 2026 frente a un consenso más bajo ${d('bkt')}. El 13 de octubre JB Capital subió su objetivo a 35,50 EUR, por debajo de la cotización ${d('xtb')}. MarketScreener da un BPA de 2,12 (FY2026), 2,17 (FY2027) y 2,42 EUR (FY2028) ${d('ms_val')}.`,
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    tipo_rentabilidad: 'de precio (sin dividendos)',
    rentabilidades: [{ periodo: 'Desde el cierre del FY2025 (30-sep-25)', accion_pct: 24.7, indice_pct: null, sector_pct: null }],
    anual: [
      { anio: '2020', accion_pct: -21.1, indice_pct: null },
      { anio: '2021', accion_pct: 10.5, indice_pct: null },
      { anio: '2022', accion_pct: 34.6, indice_pct: null },
      { anio: '2023', accion_pct: 3.7, indice_pct: null },
      { anio: '2024', accion_pct: 19.3, indice_pct: null },
      { anio: '2025', accion_pct: 3.0, indice_pct: null },
    ],
    beta: null, volatilidad_pct: null, max_drawdown_pct: null, posicion_corta_pct: null,
    comentario: `Cierres de diciembre de TradersUnion (20,10 EUR en 2019; 15,86, 17,53, 23,60, 24,48, 29,20 y 30,08 de 2020 a 2025) ${d('ts')}. La acción marca máximos históricos: 35,86 EUR el 13 de octubre de 2026, con un rango de 52 semanas de 28,74-36,90 EUR ${d('xtb', 'yahoo')}. Desde el cierre del FY2025 (≈28,75 EUR, capitalización de 3.816 M en MarketScreener) sube ≈25 % sin un cambio de guía: el mercado paga más por un dividendo de 2,09 EUR asegurado con tipos a la baja ${d('ms_val')}.`,
    confianza: 'Baja',
  },
  multiplos_historicos: {
    serie: [
      { anio: 'FY2020', precio_cierre: 14.6, ev_ebitda_ntm: null, per_ntm: 11.1, excluir: false },
      { anio: 'FY2021', precio_cierre: 18.2, ev_ebitda_ntm: null, per_ntm: 12.1, excluir: false },
      { anio: 'FY2022', precio_cierre: 18.52, ev_ebitda_ntm: null, per_ntm: 8.9, excluir: false },
      { anio: 'FY2023', precio_cierre: 24.03, ev_ebitda_ntm: null, per_ntm: 10.3, excluir: false },
      { anio: 'FY2024', precio_cierre: 27.1, ev_ebitda_ntm: null, per_ntm: 12.7, excluir: false },
      { anio: 'FY2025', precio_cierre: 28.75, ev_ebitda_ntm: null, per_ntm: 13.6, excluir: false },
    ],
    comentario: `Precio al cierre de cada ejercicio (30 de septiembre): FY2020 del informe anual (14,6 EUR) ${d('ia20')}; FY2021 y FY2024 = PER publicado × BPA de MarketScreener (13,8 × 1,32 y 11,6 × 2,34); FY2022, FY2023 y FY2025 = capitalización ÷ 132,75 M de acciones (2.459, 3.190 y 3.816 M) ${d('ms_val', 'zb_val', 'capital')}. PER adelantado = precio ÷ BPA del ejercicio siguiente (FY2025 sobre nuestro FY2026e de 2,11 EUR). Hoy: 35,86 ÷ 2,17 (nuestro FY2027e) = 16,5x, el más alto de la serie.`,
    confianza: 'Baja',
  },
  comparables: {
    criterio: `No hay cotizadas equivalentes (distribuidor de tabaco con caja flotante). Se usan operadores logísticos y de distribución europeos y globales con su PER de los próximos 12 meses tomado de los informes de DSV y Rentokil del repositorio (7-oct-2026, MarketScreener) ${d('dsv', 'rto')}, más Imperial Brands (su cliente y accionista, PER adelantado de 9,5x) ${d('imb')}. Son referencias de múltiplo, no de negocio: los logísticos crecen más y Logista tiene un volumen de tabaco que encoge.`,
    empresas: [
      { nombre: 'Kuehne+Nagel', ticker: 'KNIN', pais: 'CH', capitalizacion: null, ev_ventas: null, ev_ebitda_ltm: null, ev_ebitda_ntm: 12.2, per_ntm: 23.8, crecimiento_pct: 2.9, margen_ebitda_pct: null, roic_pct: null, dn_ebitda: null, fcf_yield_pct: null },
      { nombre: 'DHL Group', ticker: 'DHL', pais: 'DE', capitalizacion: null, ev_ventas: null, ev_ebitda_ltm: null, ev_ebitda_ntm: 6.8, per_ntm: 14.9, crecimiento_pct: 4.2, margen_ebitda_pct: null, roic_pct: null, dn_ebitda: null, fcf_yield_pct: null },
      { nombre: 'GXO Logistics', ticker: 'GXO', pais: 'US', capitalizacion: null, ev_ventas: null, ev_ebitda_ltm: null, ev_ebitda_ntm: 7.3, per_ntm: 19.5, crecimiento_pct: 5.6, margen_ebitda_pct: null, roic_pct: null, dn_ebitda: null, fcf_yield_pct: null },
      { nombre: 'NX Holdings', ticker: '9147', pais: 'JP', capitalizacion: null, ev_ventas: null, ev_ebitda_ltm: null, ev_ebitda_ntm: 5.3, per_ntm: 12.4, crecimiento_pct: 5.5, margen_ebitda_pct: null, roic_pct: null, dn_ebitda: null, fcf_yield_pct: null },
      { nombre: 'ID Logistics', ticker: 'IDL', pais: 'FR', capitalizacion: null, ev_ventas: null, ev_ebitda_ltm: null, ev_ebitda_ntm: 4.7, per_ntm: 23.9, crecimiento_pct: 12.5, margen_ebitda_pct: null, roic_pct: null, dn_ebitda: null, fcf_yield_pct: null },
      { nombre: 'Bunzl', ticker: 'BNZL', pais: 'GB', capitalizacion: null, ev_ventas: null, ev_ebitda_ltm: null, ev_ebitda_ntm: 8.9, per_ntm: 17.4, crecimiento_pct: 2.4, margen_ebitda_pct: null, roic_pct: null, dn_ebitda: null, fcf_yield_pct: null },
      { nombre: 'Imperial Brands', ticker: 'IMB', pais: 'GB', capitalizacion: null, ev_ventas: null, ev_ebitda_ltm: null, ev_ebitda_ntm: null, per_ntm: 9.5, crecimiento_pct: null, margen_ebitda_pct: null, roic_pct: null, dn_ebitda: null, fcf_yield_pct: null },
    ],
    comentario: null,
    confianza: 'Baja',
  },
  transacciones: null,
  fuentes: lista(KD),
  huecos: [
    { seccion: 'bolsa', campo: 'beta, volatilidad, caída máxima y rentabilidades frente al IBEX', tipo: 'Complemento', intentos: '1) bolsa.mjs (sin red); 2) Yahoo e Investing en búsqueda; 3) prensa: solo cierres anuales y rango de 52 semanas', decision: 'Omitido' },
    { seccion: 'transacciones', campo: 'operaciones del sector con múltiplo', tipo: 'Complemento', intentos: '1) Compras de Logista (El Mosca, farma): sin importes en los extractos; 2) operaciones de distribuidores de tabaco en Europa; 3) prensa: sin múltiplos', decision: 'Omitido' },
    { seccion: 'identificacion', campo: 'precio de cierre oficial del 13 o 14-oct', tipo: 'Núcleo', intentos: '1) Bolsa de Madrid (sin acceso); 2) Bolsamanía (35,36 EUR el 9-oct); 3) XTB, 13-oct por la mañana: 35,86 EUR', decision: 'Calculado y marcado como estimación' },
  ],
};
w('D', D);

// ---------------- E: sentimiento ----------------
const KE = ['rankia', 'benz', 'tikr', 'alic', 'cbolsa', 'xtb', 'inv_cons', 'bkt'];
const e = cit(KE);
const E = {
  sentimiento: {
    tono: 'Positivo', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Rankia (hilo «Seguimiento Logista (LOG)»)', fecha: '2026', n_comentarios: 15, tono: 'Positivo', resumen: `Inversores de dividendo que la tienen como valor «de cartera» por el 2,09 EUR asegurado; dudas sobre Francia y sobre la dependencia de Imperial ${e('rankia')}.` },
      { plataforma: 'TIKR (blog con comentarios, «¿comprar con un 6,7 % de rentabilidad?»)', fecha: '2026', n_comentarios: 5, tono: 'Positivo', resumen: `Caso de rentas: dividendo alto y estable, crecimiento bajo ${e('tikr')}.` },
      { plataforma: 'Análisis técnico en prensa (Alicante Plaza, Capital Bolsa)', fecha: '2026', n_comentarios: 5, tono: 'Positivo', resumen: `Tendencia alcista sobre la media de 100 sesiones; confirmación por encima de 32,50 EUR ${e('alic', 'cbolsa')}.` },
      { plataforma: 'Benzinga España', fecha: '2025', n_comentarios: 5, tono: 'Negativo', resumen: `Dudas sobre la guía y poca tracción en bolsa (antes de la subida de 2026) ${e('benz')}.` },
    ],
    temas: [
      { tema: 'Dividendo de 2,09 EUR como «bono»', postura: 'Alcista', peso: 'Alto', contraste: 'Fundado: la empresa lo garantiza para 2026 y el payout ya es del 99 %; a 35,86 EUR rinde un 5,8 %, menos que el 7 % de hace un año.' },
      { tema: 'Bajada de tipos y caja prestada a Imperial', postura: 'Dividida', peso: 'Medio', contraste: 'Los ingresos financieros cayeron de 103 a 73 M; con el BCE estable el golpe ya está en el beneficio.' },
      { tema: 'Caída del tabaco en Francia', postura: 'Bajista', peso: 'Medio', contraste: 'Real: ventas económicas de Francia −2 % en nueve meses.' },
      { tema: 'Cotización por encima del objetivo de los analistas', postura: 'Bajista', peso: 'Medio', contraste: `JB Capital sube a 35,50 EUR y aun así queda por debajo del precio; consenso de 32,54 EUR ${e('xtb', 'inv_cons')}.` },
    ],
    lectura: `El particular ve a Logista como un bono con cupón del 6 %: el tono es positivo y mejora con la subida a máximos, sin euforia. La divergencia está con los analistas: el consenso es neutral (2 comprar, 3 vender) y el objetivo medio queda un 9 % por debajo del precio ${e('inv_cons', 'bkt')}. No aporta cifras ni cambia la valoración.`,
    confianza: 'Baja',
  },
  fuentes: lista(KE),
  huecos: [{ seccion: 'sentimiento', campo: 'Reddit, Stocktwits y Seeking Alpha', tipo: 'Complemento', intentos: '1) Búsqueda en Reddit; 2) Seeking Alpha; 3) Stocktwits: sin hilos recientes en los extractos (solo WebSearch)', decision: 'Omitido' }],
};
w('E', E);
console.log('Notas A-E escritas');
