// Construye D.json (mercado y valoración) de Edwards. Comparables y transacciones reutilizados del informe de Intuitive (6-oct-2026),
// que los tomó con acceso a MarketScreener y Stock Analysis; se llevan sin cambios (la variación de precio en 6 días es pequeña).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dir = path.dirname(fileURLToPath(import.meta.url));
const I = JSON.parse(fs.readFileSync(path.join(dir, '../../intuitive-2026-10-06/datos.json'), 'utf8'));

const comps = I.comparables.empresas.filter((c) => c.ticker !== 'EW');
comps.push({ nombre: 'Intuitive Surgical', ticker: 'ISRG', pais: 'US', capitalizacion: 144297, ev_ventas: null, ev_ebitda_ltm: null, ev_ebitda_ntm: 28.6, per_ntm: 39.2, crecimiento_pct: 13.2, margen_ebitda_pct: 37.9, roic_pct: 30.2, dn_ebitda: null, fcf_yield_pct: null });

const ops = I.transacciones.operaciones.map((o) => ({ ...o, comentario: (o.comentario || '').replace(/\s*\[[0-9,\s-]+\]/g, '') + ' [9]' }));
ops.push({ fecha: '2024-07', objetivo: 'JenaValve (y Endotronix)', comprador: 'Edwards Lifesciences', ev: null, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: true, comentario: 'Bloqueada por la FTC (medida cautelar de enero de 2026); importe no publicado en las fuentes leídas [10].' });

const D = {
  identificacion: {
    nombre: 'Edwards Lifesciences Corporation', nombre_corto: 'Edwards', ticker: 'EW', isin: 'US28176E1082', mercado: 'NYSE', indice_referencia: 'S&P 500',
    pais: 'Estados Unidos', pais_iso: 'US', sector: 'Salud', industria: 'Equipos y suministros médicos', sede: 'Irvine (California)', fundacion: '1958', empleados: null, web: 'https://www.edwards.com',
    precio: 85.76, fecha_precio: '2026-10-13', acciones: 576.4, capitalizacion_publicada: 49850, free_float_pct: null,
    max_52s: 96.29, min_52s: 72.30, volumen_medio_diario: null, proximos_resultados: '2026-11-04',
  },
  consenso: {
    guidance: 'Guía 2026 (confirmada y subida el 23-jul-2026): ventas +10-11 % a divisa constante (antes 9-11 %), 6.600-6.900 M; TAVR 4.750-5.000 M (+8-9 % a divisa constante); TMTT 760-780 M; BPA ajustado 2,95-3,05 USD (+17 % en el punto medio) con un tipo impositivo del 16-19 % [1, 6]. No hay guía pública de 2027; la empresa la suele dar en su conferencia de inversores de diciembre. Resultados del 3T26 el 4-nov-2026 y acto con inversores en TCT el 2-nov, con los datos del ensayo PROGRESS [2].',
    estimaciones: [
      { periodo: '2026e', ingresos: 6780, ebitda: null, ebit: null, bpa: 3.00, dpa: 0, fuente: 'Stock Analysis (S&P Global), 28 analistas, 6-oct-2026 [11]; ventas: punto medio aproximado de la guía' },
      { periodo: '2027e', ingresos: 7320, ebitda: null, ebit: null, bpa: 3.38, dpa: 0, fuente: 'Stock Analysis (BPA, 6-oct) [11]; Yahoo Finance (ventas, 30 analistas, feb-2026) [5]' },
    ],
    recomendaciones: { n_analistas: 28, comprar: null, mantener: null, vender: null, po_medio: 101.59, po_min: 81, po_max: 110 },
    revisiones: 'El BPA de 2027e subió de 3,30 USD (Yahoo, febrero) a 3,38 (Stock Analysis, octubre) tras dos trimestres por encima de lo esperado [5, 11]. Los objetivos subieron en julio-octubre: UBS inició en Comprar con 110 USD (28-jul) y lo reiteró en octubre, Leerink subió a Outperform con 101 USD y Bernstein subió a 99 USD manteniendo Market Perform [3, 4, 16]. El objetivo medio pasa de ≈96,5 USD en febrero a 101,6 USD en octubre. Solo encontramos una fuente con estimaciones completas; el objetivo y las recomendaciones se contrastan con Benzinga y StreetInsider.',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: null,
  multiplos_historicos: {
    serie: [
      { anio: '2023', precio_cierre: 76.25, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2024', precio_cierre: 74.03, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2025', precio_cierre: 85.25, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
    ],
    comentario: 'Precios de cierre de Macrotrends (2019-2024) y Digrin (dic-2025) [7, 8]. El PER adelantado (cierre ÷ BPA ajustado del año siguiente) bajó de 41x en 2020 y 52x en 2021 a 28-30x en 2022-2025: el mercado dejó de pagar la prima de crecimiento cuando TAVR se frenó en 2023-2024 (crecimiento de un dígito medio) y no la ha recuperado pese a la aceleración de 2025-26. Hoy cotiza a ≈26x nuestro BPA de 2027e, por debajo de su mediana reciente.',
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Fabricantes estadounidenses de tecnología médica de gran capitalización con los que compite por el capital de los mismos fondos: Medtronic, Abbott y Boston Scientific (también rivales en corazón estructural), Stryker y Zimmer, Intuitive (crecedor de calidad), Dexcom, Insulet, IDEXX y ResMed (consumible recurrente). Cifras del informe de Intuitive del repo a 6-oct-2026 (MarketScreener y Stock Analysis), sin cambios [9].',
    empresas: comps,
    comentario: null,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: ops,
    comentario: 'Las compras de tecnología médica de crecimiento se pagan a 6-18 veces las ventas (Shockwave 17,9x, Abiomed 16,1x, Penumbra 10,4x) [9]. Edwards no es objetivo plausible: capitalización de ≈50.000 M y un comprador natural (Medtronic, Abbott, Boston) chocaría con la FTC, que ya bloqueó la compra de JenaValve por la propia Edwards [10]. Las transacciones no pesan en la valoración.',
    confianza: 'Media',
  },
  fuentes: [
    { id: 1, titulo: 'Form 8-K, anexo 99.1: resultados del 2T26 y guía 2026', editor: 'Edwards Lifesciences / SEC EDGAR', tipo: 'Primaria', fecha: '2026-07-23', url: 'https://www.sec.gov/Archives/edgar/data/0001099800/000109980026000038/ex-991q22026.htm' },
    { id: 2, titulo: 'Is Edwards Lifesciences (NYSE:EW) Entering A Stronger Phase? (cotización del 13-oct-2026, calendario del 3T26)', editor: 'Kalkine Media', tipo: 'Prensa', fecha: '2026-10-13', url: 'https://kalkinemedia.com/us/stocks/healthcare/is-edwards-lifesciences-nyseew-entering-a-stronger-phase' },
    { id: 3, titulo: 'UBS reiterates Edwards Lifesciences stock rating on endpoint expectations', editor: 'Investing.com', tipo: 'Analistas', fecha: '2026-10', url: 'https://www.investing.com/news/analyst-ratings/ubs-reiterates-edwards-lifesciences-stock-rating-on-endpoint-expectations-93CH-4939318' },
    { id: 4, titulo: 'Edwards Lifesciences analyst ratings and price targets', editor: 'Benzinga', tipo: 'Analistas', fecha: '2026-08-24', url: 'https://www.benzinga.com/quote/EW/sentiment' },
    { id: 5, titulo: 'EW analysis: earnings and revenue estimates', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-02', url: 'https://uk.finance.yahoo.com/quote/EW/analysis' },
    { id: 6, titulo: 'Edwards Lifesciences 2Q26 TAVR sales top consensus ahead of key Medicare decision', editor: 'MDDI', tipo: 'Prensa', fecha: '2026-07-24', url: 'https://www.mddionline.com/cardiovascular/edwards-lifesciences-2q26-tavr-sales-top-consensus-ahead-of-key-medicare-decision-clinical-trial' },
    { id: 7, titulo: 'Edwards Lifesciences - 25 Year Stock Price History', editor: 'Macrotrends', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://www.macrotrends.net/stocks/charts/EW/edwards-lifesciences/stock-price-history' },
    { id: 8, titulo: 'Edwards Lifesciences (EW) price history, monthly', editor: 'Digrin', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://www.digrin.com/stocks/detail/EW/price' },
    { id: 9, titulo: 'Informe de Intuitive Surgical del repo (corte 6-oct-2026): comparables y transacciones con datos de MarketScreener, Stock Analysis y comunicados', editor: 'Análisis propio (repo analisis-inversion)', tipo: 'Datos de mercado', fecha: '2026-10-06', url: 'https://www.marketscreener.com/quote/stock/EDWARDS-LIFESCIENCES-CORP-12521/finances/' },
    { id: 10, titulo: 'Edwards Lifesciences Comments on FTC Action to Block Proposed Acquisition of JenaValve', editor: 'Business Wire', tipo: 'Primaria', fecha: '2025-08-06', url: 'https://secure.businesswire.com/news/home/20250806182521/en/Edwards-Lifesciences-Comments-on-FTCs-Action-to-Block-Proposed-Acquisition-of-JenaValve' },
    { id: 11, titulo: 'Edwards Lifesciences (EW) Stock Forecast (BPA no GAAP de S&P Global) y estadísticas, vía informe de Intuitive del 6-oct', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-06', url: 'https://stockanalysis.com/stocks/ew/forecast/' },
    { id: 12, titulo: 'Edwards Lifesciences (EW): cotización y rango de 52 semanas', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://stockanalysis.com/stocks/EW/' },
    { id: 13, titulo: 'Implied ERP by month (ERP T12m with sustainable payout), oct-2026: 4,20 %', editor: 'Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
    { id: 14, titulo: 'Market Yield on U.S. Treasury Securities at 10-Year (DGS10), 5,22 % (tomado del informe de Group 1 Automotive del repo, mismo corte)', editor: 'FRED (Reserva Federal de San Luis)', tipo: 'Datos de mercado', fecha: '2026-10-13', url: 'https://fred.stlouisfed.org/series/DGS10' },
    { id: 15, titulo: 'EW earnings history (BPA ajustado 2020-2022)', editor: 'AlphaQuery / Zacks', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://www.alphaquery.com/stock/EW/earnings-history' },
    { id: 16, titulo: 'Analyst Ratings for Edwards Lifesciences (EW)', editor: 'StreetInsider', tipo: 'Analistas', fecha: '2026-10', url: 'https://www.streetinsider.com/rating_history.php?q=EW' },
    { id: 17, titulo: 'Edwards Lifesciences Stock Forecast: Where Analysts See the Stock Going by 2027', editor: 'TIKR', tipo: 'Analistas', fecha: '2026', url: 'https://www.tikr.com/blog/edwards-lifesciences-stock-forecast-where-analysts-see-the-stock-going-by-2027' },
  ],
  huecos: [
    { seccion: 'bolsa', campo: 'Rentabilidades, beta, volatilidad y caída máxima', tipo: 'Complemento', intentos: '1) bolsa.mjs sin red; 2) WebFetch a Yahoo bloqueado; 3) búsqueda web: solo cotizaciones sueltas', decision: 'Omitido' },
    { seccion: 'consenso', campo: 'Estimaciones de 2028e y EBITDA de consenso', tipo: 'Complemento', intentos: '1) MarketScreener (sin red); 2) Yahoo y Stock Analysis vía búsqueda; 3) TIKR y Barchart', decision: 'Omitido' },
  ],
};
fs.writeFileSync(path.join(dir, 'D.json'), JSON.stringify(D, null, 2));
console.log('D.json', comps.length, 'comparables', ops.length, 'transacciones');
