// Subagente D (GigaCloud): construye notas/D.json con los hechos de mercado y valoración.
// Comparables: Yahoo quoteSummary (cierre 5-nov-2026) con el valor empresa recalculado SIN arrendamientos operativos
// (US GAAP, como el puente de GCT): deuda financiera = totalDebt de Yahoo − pasivo por arrendamiento operativo del
// último balance en el XBRL de la SEC (o deuda del XBRL cuando Yahoo no cuadra). Ejecutar desde la raíz del repo.
import { readFileSync, writeFileSync } from 'node:fs';
const N = 'informes/gigacloud-2026-11-06/notas';
const v = (x) => (x && typeof x === 'object' ? (x.raw ?? null) : x ?? null);
const r = (x, d = 1) => (x == null || !isFinite(x) ? null : Math.round(x * 10 ** d) / 10 ** d);
const bolsa = JSON.parse(readFileSync(`${N}/D-bolsa.json`, 'utf8'));

// Pasivo por arrendamiento operativo (millones USD) y deuda financiera / caja usadas, del XBRL de la SEC [11]
const ajuste = {
  W: { pais: 'US', nota: 'deuda financiera del XBRL (LongTermDebt 2.799 a 30-sep-2026); caja e inversiones 1.098', deudaFin: 2799, caja: 1098 },
  WSM: { pais: 'US', oplease: 217.032 + 1310.914 },
  RH: { pais: 'US', oplease: 113.332 + 749.376 },
  ARHS: { pais: 'US', oplease: 63.295 + 508.555, caja: 318.039 },
  LZB: { pais: 'US', oplease: 87.865 + 474.253 },
  ETD: { pais: 'US', oplease: 26.91 + 93.463 },
  LOVE: { pais: 'US', oplease: 24.648 + 166.376 },
  BSET: { pais: 'US', oplease: 17.661 + 65.052 },
  HOFT: { pais: 'US', oplease: 5.089 + 18.865 },
  GXO: { pais: 'US', oplease: 777 + 2225 },
};
const mesesRestantes = (fin) => { const d = new Date(fin); return Math.max(0, Math.min(12, (d.getUTCFullYear() - 2026) * 12 + d.getUTCMonth() - 10 + 1)); };
const empresas = [], detalle = [];
for (const s of Object.keys(ajuste)) {
  const q = JSON.parse(readFileSync(`${N}/docs/D-yahoo/${s}.json`, 'utf8')).quoteSummary.result[0];
  const fd = q.financialData, p = q.price;
  const mcap = v(p.marketCap) / 1e6, ventas = v(fd.totalRevenue) / 1e6, ebitda = v(fd.ebitda) / 1e6, fcf = v(fd.freeCashflow) / 1e6;
  const a = ajuste[s];
  const deudaFin = a.deudaFin ?? Math.max(0, v(fd.totalDebt) / 1e6 - a.oplease);
  const caja = a.caja ?? v(fd.totalCash) / 1e6;
  const ev = mcap + deudaFin - caja;
  const t = q.earningsTrend.trend, y0 = t.find((x) => x.period === '0y'), y1 = t.find((x) => x.period === '+1y');
  const w = mesesRestantes(y0.endDate) / 12;
  const eps = w * v(y0.earningsEstimate.avg) + (1 - w) * v(y1.earningsEstimate.avg);
  const rev = (w * v(y0.revenueEstimate.avg) + (1 - w) * v(y1.revenueEstimate.avg)) / 1e6;
  empresas.push({ nombre: p.longName.replace(/,? Inc\.?$|,? Incorporated$|,? Corporation$/,'').replace(/^The /, '').replace(/ Company$/, ''), ticker: s, pais: a.pais, capitalizacion: r(mcap, 0), ev_ventas: r(ev / ventas, 2), ev_ebitda_ltm: ebitda > 0 ? r(ev / ebitda) : null, ev_ebitda_ntm: null,
    per_ntm: eps > 0 ? r(v(p.regularMarketPrice) / eps) : null, crecimiento_pct: r((rev / ventas - 1) * 100), margen_ebitda_pct: r((ebitda / ventas) * 100), roic_pct: null,
    dn_ebitda: ebitda > 0 ? r((deudaFin - caja) / ebitda, 2) : null, fcf_yield_pct: r((fcf / mcap) * 100) });
  detalle.push({ ticker: s, precio: v(p.regularMarketPrice), fin_ejercicio_0y: y0.endDate, peso_0y_ntm: r(w, 2), bpa_0y: r(v(y0.earningsEstimate.avg), 3), bpa_1y: r(v(y1.earningsEstimate.avg), 3), analistas_bpa_1y: v(y1.earningsEstimate.numberOfAnalysts), ventas_ltm: r(ventas, 0), ebitda_ltm: r(ebitda, 0), deuda_yahoo: r(v(fd.totalDebt) / 1e6, 0), arrend_operativo_xbrl: r(a.oplease ?? null, 0), deuda_financiera_usada: r(deudaFin, 0), caja_usada: r(caja, 0), ev: r(ev, 0) });
}
writeFileSync(`${N}/D-comparables-detalle.json`, JSON.stringify(detalle, null, 1));

const fuentes = [
  { id: 1, titulo: 'GigaCloud Technology Inc, Form 10-Q del tercer trimestre de 2026 (30-sep-2026)', editor: 'GigaCloud Technology / SEC EDGAR', tipo: 'Primaria', fecha: '2026-11-05', url: 'https://www.sec.gov/Archives/edgar/data/1857816/000162828026070475/gct-20260930.htm' },
  { id: 2, titulo: 'GigaCloud Technology, nota de prensa de resultados del 3T26 (8-K, anexo 99.1)', editor: 'GigaCloud Technology / SEC EDGAR', tipo: 'Primaria', fecha: '2026-11-05', url: 'https://www.sec.gov/Archives/edgar/data/1857816/000162828026070471/gct-2026q3xearningsrelease.htm' },
  { id: 3, titulo: 'Históricos diarios de GCT, ^RUT y XLY (herramientas/bolsa.mjs y movimiento.mjs)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-11-05', url: 'https://query1.finance.yahoo.com/v8/finance/chart/GCT' },
  { id: 4, titulo: 'quoteSummary de GCT y de los comparables (precio, capitalización, deuda, caja, EBITDA y ventas LTM, FCF, estimaciones, recomendaciones y precios objetivo)', editor: 'Yahoo Finance (estimaciones de S&P Global)', tipo: 'Datos de mercado', fecha: '2026-11-06', url: 'https://query2.finance.yahoo.com/v10/finance/quoteSummary/GCT' },
  { id: 5, titulo: 'GigaCloud Technology (GCT) Stock Forecast & Price Targets', editor: 'Stock Analysis (S&P Global)', tipo: 'Datos de mercado', fecha: '2026-11-06', url: 'https://stockanalysis.com/stocks/gct/forecast/' },
  { id: 6, titulo: 'GCT: Detailed Earnings Estimates (actualizado el 5-nov-2026, antes de incorporar el 3T26)', editor: 'Zacks Investment Research', tipo: 'Datos de mercado', fecha: '2026-11-05', url: 'https://www.zacks.com/stock/quote/GCT/detailed-earning-estimates' },
  { id: 7, titulo: 'GigaCloud Technology (GCT) Statistics: acciones, flotante, posición corta', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-11-06', url: 'https://stockanalysis.com/stocks/gct/statistics/' },
  { id: 8, titulo: 'Daily Treasury Par Yield Curve Rates 2026 (CSV)', editor: 'U.S. Department of the Treasury', tipo: 'Primaria', fecha: '2026-11-05', url: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/daily-treasury-rates.csv/2026/all?type=daily_treasury_yield_curve&field_tdr_date_value=2026' },
  { id: 9, titulo: 'Implied ERP by month (ERPbymonth.xlsx)', editor: 'Aswath Damodaran, NYU Stern', tipo: 'Sectorial', fecha: '2026-11', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 10, titulo: 'Betas by Sector (US), enero de 2026', editor: 'Aswath Damodaran, NYU Stern', tipo: 'Sectorial', fecha: '2026-01', url: 'https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/Betas.html' },
  { id: 11, titulo: 'XBRL companyfacts de los comparables (pasivos por arrendamiento operativo y financiero, deuda y caja del último 10-Q/10-K)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-11-06', url: 'https://data.sec.gov/api/xbrl/companyfacts/' },
  { id: 12, titulo: 'HNI Corporation to Acquire Steelcase Inc. (8-K, anexo 99.1)', editor: 'HNI Corporation / SEC EDGAR', tipo: 'Primaria', fecha: '2025-08-04', url: 'https://www.sec.gov/Archives/edgar/data/48287/000095010325009762/dp232552_ex9901.htm' },
  { id: 13, titulo: 'Leading Global Bedding Company Tempur Sealy to Acquire Mattress Firm (8-K)', editor: 'Tempur Sealy International / SEC EDGAR', tipo: 'Primaria', fecha: '2023-05-09', url: 'https://www.sec.gov/Archives/edgar/data/1206264/000120626423000109/leadingglobalbeddingcompan.htm' },
  { id: 14, titulo: 'GXO to Acquire PFSweb', editor: 'GXO Logistics', tipo: 'Primaria', fecha: '2023-09-14', url: 'https://gxo.com/news_article/gxo-to-acquire-pfsweb/' },
  { id: 15, titulo: 'PFSweb, Inc., XBRL companyfacts (ingresos de 2022 del 10-K)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2023-03', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0001095315.json' },
  { id: 16, titulo: 'Herman Miller and Knoll to Combine (8-K, anexo 99.1)', editor: 'Herman Miller / SEC EDGAR', tipo: 'Primaria', fecha: '2021-04-19', url: 'https://www.sec.gov/Archives/edgar/data/66382/000114036121013203/nt10023299x1_ex99-1.htm' },
  { id: 17, titulo: 'At Home and Hellman & Friedman amend definitive agreement ($37.00 por acción) (8-K, anexo 99.1)', editor: 'At Home Group / SEC EDGAR', tipo: 'Primaria', fecha: '2021-06-16', url: 'https://www.sec.gov/Archives/edgar/data/1646228/000110465921081815/tm2119645d5_ex99-1.htm' },
  { id: 18, titulo: 'GigaCloud Technology, Form 10-K de 2023 (compra de Noble House y Wondersign)', editor: 'GigaCloud Technology / SEC EDGAR', tipo: 'Primaria', fecha: '2024-03', url: 'https://www.sec.gov/Archives/edgar/data/1857816/000185781624000066/gct-20231231.htm' },
  { id: 19, titulo: 'GigaCloud Technology, nota de prensa de resultados del 4T25 y del ejercicio 2025 (8-K, anexo 99.1)', editor: 'GigaCloud Technology / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-26', url: 'https://www.sec.gov/Archives/edgar/data/1857816/000185781626000017/a2026-02x26x8xkex991earnin.htm' },
  { id: 20, titulo: 'GigaCloud Technology, nota de prensa de resultados del 1T26 (8-K, anexo 99.1)', editor: 'GigaCloud Technology / SEC EDGAR', tipo: 'Primaria', fecha: '2026-05-07', url: 'https://www.sec.gov/Archives/edgar/data/1857816/000185781626000054/gct-2026q1earningsrelease.htm' },
  { id: 21, titulo: 'GigaCloud Technology, nota de prensa de resultados del 2T26 (8-K, anexo 99.1)', editor: 'GigaCloud Technology / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-06', url: 'https://www.sec.gov/Archives/edgar/data/1857816/000185781626000072/gct-2026q2earningsrelease.htm' },
  { id: 22, titulo: 'GigaCloud Technology, 8-K del 11-may-2026 (contrato a plazo variable prepagado del consejero delegado, Item 8.01)', editor: 'GigaCloud Technology / SEC EDGAR', tipo: 'Primaria', fecha: '2026-05-11', url: 'https://www.sec.gov/Archives/edgar/data/1857816/000185781626000058/gct-20260511.htm' },
  { id: 23, titulo: 'GigaCloud Technology, 8-K del 10-ago-2026 (liquidación de las 413.942 acciones restantes del contrato a plazo, Item 8.01)', editor: 'GigaCloud Technology / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-10', url: 'https://www.sec.gov/Archives/edgar/data/1857816/000185781626000077/gct-20260810.htm' },
  { id: 24, titulo: 'Lista de presentaciones de GigaCloud Technology en EDGAR (10-Q, 8-K, Form 4 y Form 144)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-11-06', url: 'https://data.sec.gov/submissions/CIK0001857816.json' },
];

const b = bolsa.bolsa;
const D = {
  identificacion: {
    nombre: 'GigaCloud Technology Inc', nombre_corto: 'GigaCloud', ticker: 'GCT', isin: 'KYG386441037', mercado: 'Nasdaq Global Market (clase A)', indice_referencia: 'Russell 2000 (^RUT)',
    pais: 'Islas Caimán (sede operativa en City of Industry, California)', pais_iso: 'KY', sector: 'Consumo discrecional', industria: 'Distribuidores (comercio B2B de muebles)',
    sede: 'City of Industry, California (EE. UU.)', fundacion: null, empleados: null, web: 'https://investors.gigacloudtech.com',
    precio: bolsa.identificacion.precio, fecha_precio: bolsa.identificacion.fecha_precio, acciones: 35.66, capitalizacion_publicada: 2250, free_float_pct: 75.2,
    max_52s: bolsa.identificacion.max_52s, min_52s: bolsa.identificacion.min_52s,
    volumen_medio_diario: `≈ ${String(bolsa.volumen_3m.importe_dia_millones).replace('.', ',')} M USD/día (3 meses; ${bolsa.volumen_3m.acciones_dia.toLocaleString('es-ES')} acciones)`, proximos_resultados: null,
    notas: 'Precio: cierre del 5-nov-2026 [3] (la sesión del 6-nov no había cerrado). Acciones: 35,624 M en circulación a 31-oct-2026 (29,167 M clase A y 6,457 M clase B, sin 0,580 M recompradas pendientes de amortizar ni 0,047 M reservadas para planes) [1], más 0,035 M de dilución (diferencia entre acciones medias diluidas y básicas del 3T26: 35,824 frente a 35,789 M) [1] = 35,66 M. Las 87.860 acciones recompradas después del 30-sep (5,0 M USD a 56,90 USD) ya están fuera del recuento del 31-oct (35,712 − 0,088 = 35,624 M) [1]. Mínimo de 52 semanas: 27,56 USD es el mínimo de cierre (7-nov-2025) [3]; el intradía de Yahoo es 25,39 USD [4]. Capitalización publicada: 2.250 M USD de Yahoo (35,71 M acciones a 30-sep) [4]; Stock Analysis da 2,25 bn [7]. Flotante: 26,86 M acciones según Yahoo y Stock Analysis sobre 35,71 M = 75,2 % (estimación propia) [4, 7]. ISIN derivado del CUSIP G38644103 de los 13G (prefijo KY y dígito de control calculado: estimación propia). Clase B (20 votos) del fundador y consejero delegado Larry Wu.',
  },
  consenso: {
    guidance: 'La empresa solo da guía de ingresos del trimestre siguiente. El 5-nov-2026 fijó para el 4T26 unos ingresos de 425-450 M USD (+17 % a +24 % sobre los 362,7 M del 4T25) [2, 19], tras un 3T26 de 423,6 M que superó su propia horquilla de 375-400 M dada el 6-ago [1, 21]. Con los 1.194,7 M de nueve meses, la guía implica 1.620-1.645 M en 2026 (+26 % a +28 %; estimación propia), por encima del consenso de ingresos de 1.566 M [4]. No hay objetivos de margen ni plan a medio plazo publicados. Queda autorizado un programa de recompras con 120,0 M USD disponibles a 30-sep-2026 [1].',
    estimaciones: [
      { periodo: '2026e', ingresos: 1566, ebitda: null, ebit: null, bpa: 4.70, dpa: 0, fuente: 'Ingresos: media de 3 analistas, S&P Global vía Yahoo, ya con algún cambio tras el 3T26 [4] (Zacks: 1.580 M, 2 analistas [6]). BPA: Zacks, 2 analistas, base GAAP, antes del 3T26 [6]; S&P Global/Yahoo da 4,92 USD (1 analista, base ajustada de la empresa, ya actualizada tras el 3T26) [4, 5]' },
      { periodo: '2027e', ingresos: 1696, ebitda: null, ebit: null, bpa: 5.20, dpa: 0, fuente: 'Ingresos: media de 3 analistas, S&P Global vía Yahoo [4] (Zacks: 1.720 M, 2 analistas [6]). BPA: Zacks, 2 analistas, GAAP, antes del 3T26 [6]; S&P Global/Yahoo: 5,82 USD (1 analista, base ajustada) [4, 5]' },
      { periodo: '2028e', ingresos: null, ebitda: null, ebit: null, bpa: null, dpa: null, fuente: 'Sin estimaciones gratuitas de 2028 (Yahoo, Zacks y Stock Analysis no las publican con cifra)' },
    ],
    recomendaciones: { n_analistas: 3, comprar: 2, mantener: 1, vender: 0, po_medio: 61.33, po_min: 53, po_max: 73 },
    revisiones: 'Cobertura muy escasa: tres analistas (Maxim Group, Roth MKM y Lake Street) [4, 5]. Recomendaciones de S&P Global: 1 compra fuerte, 1 compra y 1 mantener (sep-2026), frente a 2, 1 y 1 en febrero [5]. Los precios objetivo (medio 61,33, mediana 58, mínimo 53, máximo 73 USD) se actualizaron por última vez el 7-ago-2026 y están por debajo del precio (63,01) [5]; Maxim reiteró compra con 73 USD el 7-ago y Roth mantuvo neutral con 40 USD el 26-may [5]. Tras el 3T26, el único analista de BPA en Yahoo subió 2026e de 4,18 a 4,92 USD y 2027e de 4,83 a 5,82 USD en una semana (90 días antes: 4,535 y 4,93) [4]. Zacks (GAAP) aún no había incorporado el 3T26: 4,70 y 5,20 USD, con estimaciones de 4,47-4,92 y 4,57-5,82 [6].',
    base_ebitda: null, ajuste_ebitda_pct_ventas: null,
    confianza: 'Baja',
  },
  bolsa: {
    tipo_rentabilidad: b.tipo_rentabilidad,
    rentabilidades: b.rentabilidades,
    anual: b.anual,
    beta: b.beta, volatilidad_pct: b.volatilidad_pct, max_drawdown_pct: b.max_drawdown_pct, posicion_corta_pct: 8.2,
    comentario: null,
    contexto: {
      movimiento: { fecha: '2026-11-05', var_1m_pct: 12.6, var_3m_pct: 18.3, var_6m_pct: 47.1, var_12m_pct: 137.1, dist_max_52s_pct: 0, dist_min_52s_pct: 147.5, dist_max_historico_pct: 0, tendencia: 'alcista', volatilidad_60d_pct: 45.5, avisos: [] },
      movimientos_fuertes: [
        { periodo: 'jul-ago-2026 (mes hasta el 6-ago)', var_pct: 55.3, causa: 'Resultados del 2T26 el 6-ago: ingresos de 411,6 M USD (+27,6 %), por encima de la guía de 365-390 M, y recompras aceleradas de unos 30 M en el trimestre [21] [3]', veredicto: 'no cambia', condicion: null },
        { periodo: 'may-jun-2026 (mes hasta el 5-jun)', var_pct: -29.9, causa: 'Coincide con los resultados del 1T26 (7-may: ingresos de 359,5 M, guía del 2T de 365-390 M) [20] y con el 8-K del 11-may sobre el contrato a plazo variable prepagado del consejero delegado sobre acciones de la compañía (diversificación y liquidez) [22]; no hay un hecho propio único publicado [3]', veredicto: 'no cambia', condicion: null },
        { periodo: '7-abr-2026', var_pct: -10.0, causa: 'Caída diaria sin presentación de la empresa en EDGAR esos días [24]; causa no identificada en fuentes primarias [3]', veredicto: 'no cambia', condicion: null },
        { periodo: '27-ene-2026', var_pct: -9.0, causa: 'Caída diaria sin presentación de la empresa en EDGAR esos días [24]; causa no identificada en fuentes primarias [3]', veredicto: 'no cambia', condicion: null },
        { periodo: '31-ago-2026', var_pct: -8.3, causa: 'Caída diaria tras la subida de agosto, en plena ventana de liquidación de las 413.942 acciones restantes del contrato a plazo del consejero delegado (hasta el 30-sep) [23] y de avisos de venta Form 144 de directivos en agosto y septiembre [24] [3]', veredicto: 'no cambia', condicion: null },
        { periodo: '4-feb-2026 y 12-feb-2026', var_pct: -7.4, causa: 'Caídas diarias de −7,4 % y −6,5 % sin presentación de la empresa en EDGAR esos días [24]; causa no identificada [3]', veredicto: 'no cambia', condicion: null },
      ],
      noticias: [
        { fecha: '2026-11-05', tipo: 'resultados', hecho: '3T26: ingresos de 423,6 M USD (+27,3 %), beneficio neto de 50,6 M (+36 %), BPA diluido de 1,41 USD; guía del 4T26 de 425-450 M. La acción subió un 8,8 % ese día hasta el máximo de 52 semanas [1, 2, 3]', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-11-05', tipo: 'directivos', hecho: 'Recompras: 491.831 acciones a 36,00 USD (17,7 M) en el 3T26 y 87.860 a 56,90 USD (5,0 M) hasta el 5-nov con un plan 10b5-1; quedan 120,0 M autorizados [1]', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-08-10', tipo: 'accionista de referencia', hecho: 'El consejero delegado y fundador (Larry Wu) completa el contrato a plazo variable prepagado sobre las 413.942 acciones restantes, convertidas de clase B a A en el 3T26, como muy tarde el 30-sep-2026 [23, 1]; el contrato se anunció el 11-may [22]', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-09-21', tipo: 'directivos', hecho: 'Avisos de venta (Form 144, que no son ventas confirmadas) y Form 4 de varios directivos en agosto y septiembre de 2026 [24]', veredicto: 'no cambia', condicion: null },
      ],
      proximos_resultados: null,
      veredicto: 'no cambia',
      condicion: null,
      comentario: null,
    },
    confianza: 'Media',
    notas: 'Rentabilidades de precio (el ^RUT no lleva dividendos; GCT no paga). Sin 5 y 10 años: cotiza desde el 18-ago-2022. 2022 no figura en «anual» por ser un año parcial; la caída máxima de −81,9 % es de sep-nov-2022, justo después de la OPV (bolsa.mjs descartó 5 cierres anómalos de ago-2022) [3]. Betas frente al ^RUT: mensual 5 años 0,97 (51 meses), semanal 5 años 1,35, semanal 2 años 1,73; ajustadas 0,98 y 1,23 [3]. Yahoo y Stock Analysis dan 1,61 (5 años, frente al S&P 500) [4, 7]. Posición corta: 2,92 M acciones a mitad de octubre de 2026 = 8,17 % de las acciones y 10,87 % del flotante (Stock Analysis) [7]; Yahoo, 12,65 % del flotante [4]; 3,9 días para cubrir [7]. bolsa.mjs da +147,5 % a 1 año y movimiento.mjs +137,1 % (distinta sesión base). Próximos resultados (4T26): sin fecha anunciada; los del 4T25 se publicaron el 26-feb-2026 [19].',
  },
  multiplos_historicos: {
    serie: bolsa.cierres_ejercicio.map((c) => ({ anio: c.anio, precio_cierre: c.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    comentario: null,
    confianza: 'Media',
    notas: 'Cotiza desde la OPV del 18-ago-2022 (12,25 USD por acción): solo hay cierres de 2022 a 2025 [3]. Sin PER ni EV/EBITDA NTM históricos gratuitos. El cierre de 2022 (5,69 USD) viene tras una caída del 82 % desde la OPV y el BPA de 2022 del XBRL (0,60 USD) usa una media de acciones con las preferentes previas a la OPV: puede convenir excluirlo. PER adelantado bruto (cierre ÷ BPA GAAP diluido del año siguiente, de cuentas-xbrl.json): 2022: 5,69/2,30 = 2,5x; 2023: 18,30/3,05 = 6,0x; 2024: 18,52/3,59 = 5,2x; 2025: 39,28/BPA 2026e (≈ 4,7-5,0 según la base) ≈ 7,9-8,4x (estimación propia).',
  },
  comparables: {
    criterio: null,
    empresas,
    comentario: null,
    confianza: 'Media',
    notas: 'Fuente única: Yahoo quoteSummary (S&P Global) a 5-nov-2026 [4], con el valor empresa recalculado sin arrendamientos operativos, igual que el puente de GCT en US GAAP: deuda financiera = deuda total de Yahoo − pasivo por arrendamiento operativo del último balance del XBRL [11] (Wayfair: deuda financiera del XBRL de 2.799 M y caja con inversiones de 1.098 M; Arhaus: caja del 30-sep-2026 del XBRL, 318 M). Detalle cifra a cifra en notas/D-comparables-detalle.json. EV/ventas y EV/EBITDA LTM con ventas y EBITDA LTM de Yahoo (algunos LTM todavía sin el último trimestre). PER NTM y crecimiento NTM: estimaciones de Yahoo ponderadas por los meses de nov-2026 a oct-2027 que caen en cada ejercicio (WSM, RH, LOVE y HOFT cierran en enero-febrero; LZB en abril; ETD en junio; BSET en noviembre). EV/EBITDA NTM y ROIC: null (sin EBITDA estimado ni ROIC del mismo proveedor gratis). Wayfair y Hooker tienen EBITDA LTM muy bajo (2,8 % y 1,4 % de margen) y múltiplos sin sentido (EV/EBITDA LTM de 46,8x y 35,1x): candidatos a excluir. Lovesac (margen EBITDA del 2,5 %) tiene un PER NTM de 8,6x con un BPA que se triplica en el ejercicio siguiente según un solo analista. GXO es logística por contrato, no muebles: referencia del negocio de servicios (logística y marketplace) de GCT. Para GCT, Yahoo aún tiene el LTM al 2T26 (ventas de 1.466,5 M y EBITDA de 179,6 M) y una deuda de 507 M con los arrendamientos operativos [4]: no usar sus múltiplos.',
  },
  transacciones: {
    operaciones: [
      { fecha: '2025-08', objetivo: 'Steelcase (mobiliario de oficina, EE. UU.)', comprador: 'HNI Corporation', ev: null, ev_ventas: null, ev_ebitda: 5.8, prima_pct: null, excluir: false, comentario: 'Contraprestación de unos 2.200 M USD a los accionistas (7,20 USD en efectivo + 0,2192 acciones de HNI = 18,30 USD por acción); 5,8x el EBITDA ajustado de los últimos 12 meses CONTANDO 120 M de sinergias de costes [12]. Mobiliario de oficina, no de hogar.' },
      { fecha: '2023-05', objetivo: 'Mattress Firm (distribución especializada de colchones, EE. UU.)', comprador: 'Tempur Sealy (hoy Somnigroup)', ev: 4000, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Valor empresa de unos 4.000 M USD: 2.700 M en efectivo (incluida la amortización de su deuda) y 1.300 M en acciones (34,2 M acciones a 37,62 USD) [13]. El comunicado no da ventas ni EBITDA; cerrada en febrero de 2025.' },
      { fecha: '2023-09', objetivo: 'PFSweb (preparación de pedidos de comercio electrónico, EE. UU.)', comprador: 'GXO Logistics', ev: 142, ev_ventas: 0.48, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '7,50 USD por acción en efectivo; capital de unos 181 M y valor empresa de 142 M con una caja de 39 M a 30-jun-2023 [14]. EV/ventas sobre los ingresos de 2022 del 10-K (295,1 M, incluidos los repercutidos) [15]: estimación propia.' },
      { fecha: '2021-04', objetivo: 'Knoll (mobiliario de oficina y hogar, EE. UU.)', comprador: 'Herman Miller (hoy MillerKnoll)', ev: 1800, ev_ventas: null, ev_ebitda: null, prima_pct: 45, excluir: false, comentario: 'Operación en efectivo y acciones valorada en 1.800 M USD; prima del 45 % sobre el cierre del 16-abr-2021 [16]. El comunicado da ventas y EBITDA combinados (3.600 M y 552 M con 100 M de sinergias), no los de Knoll.' },
      { fecha: '2021-06', objetivo: 'At Home Group (tiendas de decoración del hogar, EE. UU.)', comprador: 'Hellman & Friedman', ev: null, ev_ventas: null, ev_ebitda: null, prima_pct: 21, excluir: false, comentario: 'Exclusión de bolsa a 37,00 USD por acción en efectivo tras mejorar la oferta: prima del 21 % sobre el cierre del 4-may-2021 (30,67 USD) y del 28 % sobre la media de 30 días [17]. Valor empresa no publicado en el comunicado.' },
      { fecha: '2023-10', objetivo: 'Noble House Home Furnishings (distribución B2B de muebles de interior y exterior)', comprador: 'GigaCloud Technology', ev: 77.6, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Contraprestación de unos 77,6 M USD [18]; la empresa no publica las ventas ni el EBITDA del negocio comprado.' },
      { fecha: '2026-01', objetivo: 'New Classic Home Furnishing (mayorista de muebles, EE. UU.)', comprador: 'GigaCloud Technology', ev: 18.7, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '18,7 M USD sin deuda (14,4 M pagados, 1,0 M aplazado y 3,3 M de pago contingente por objetivos), frente a 18,4 M de activos netos identificables: se pagó casi a valor contable [1]. El pago contingente máximo (3,6 M) exige 60 M de ingresos en 12 meses [1].' },
    ],
    comentario: null,
    confianza: 'Baja',
  },
  dcf: {
    wacc: { tasa_libre_pct: 4.84, beta: null, prima_mercado_pct: null, prima_adicional_pct: null, coste_deuda_pct: null, tasa_impositiva_pct: null, peso_deuda_pct: 0 },
    notas_integrador: 'Hechos para el WACC: bono del Tesoro de EE. UU. a 10 años del 5-nov-2026: 4,84 % (CSV oficial del Tesoro) [8]. Beta: frente al ^RUT, mensual 5 años 0,97 (51 meses), semanal 5 años 1,35, semanal 2 años 1,73, ajustadas 0,98 y 1,23 [3]; Yahoo/Stock Analysis 1,61 (5 años, S&P 500) [4, 7]. Damodaran (EE. UU., ene-2026), beta desapalancada corregida por caja: Furn/Home Furnishings 0,65 (27 empresas); Retail (Distributors) 0,80 (62); Retail (Special Lines) 1,00 (94); Total Market 0,76 [10]. GCT no tiene deuda financiera (solo 1,2 M de arrendamientos financieros) y tiene caja neta: peso de la deuda 0 % y beta apalancada = desapalancada. Prima implícita del S&P 500 de Damodaran (ERP T12m with sustainable payout): 4,41 % en la última fila de ERPbymonth.xlsx (bono 4,94 %, inicio de noviembre de 2026), frente al 4,20 % de octubre [9]. Tipo efectivo: 17,0 % en 9M26 (26,8/157,8) y 14,8 % en 2025 (23,8/161,2) [1] (estimación propia).',
  },
  valoracion: {
    puente: { fecha: '2026-09-30', deuda_financiera: 0, arrendamientos: 1.2, caja: 417.3, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 8.4 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, ERP T12m with sustainable payout)', prima_implicita_pct: 4.41, fecha: '2026-11', fuente: 'Damodaran, ERPbymonth.xlsx [9]' },
    notas_integrador: 'Puente a 30-sep-2026 [1]: caja y equivalentes 374,2 M + inversiones a corto (depósitos a plazo, letras del Tesoro de EE. UU.) 43,0 M = 417,3 M; se deja fuera la caja restringida (0,7 M). Sin préstamos ni líneas dispuestas en el balance. Arrendamientos financieros: 0,588 M corrientes (dentro de «accrued expenses») + 0,655 M no corrientes = 1,2 M. Los arrendamientos operativos (115,2 + 359,6 = 474,7 M) NO van al puente (US GAAP: su gasto, 97,4 M en 9M26, ya está en el EBITDA). Otros ajustes = 3,4 M de pago contingente por New Classic + 5,0 M pagados en recompras después del balance (87.860 acciones ya fuera del recuento de 35,624 M del 31-oct) = 8,4 M. Caja neta ajustada ≈ 407,6 M. Con 35,66 M acciones y 63,01 USD: capitalización ≈ 2.247 M y valor empresa ≈ 1.839 M (estimación propia, el motor lo recalcula). Impuestos a pagar no corrientes (4,8 M) no incluidos. LTM a 30-sep-2026 (cuentas-xbrl 2025 + 9M26 − 9M25 [1]): ventas 1.557,4 M; EBIT 189,3 M; amortizaciones 8,7 M; EBITDA 198,1 M; EBITDA ajustado de la empresa (sin pagos en acciones; 162,9 M en 2025 [19] + 167,9 − 120,0 [2]) 210,8 M; pagos en acciones LTM 12,8 M (0,8 % de ventas; 12,5 M en 9M26 por una concesión del 1S26); beneficio neto 169,6 M; BPA diluido LTM 3,59 + 3,60 − 2,56 = 4,63 USD. Múltiplos aproximados: PER LTM 13,6x (Stock Analysis: 13,60 [7]); EV/EBITDA LTM 9,3x (8,7x sobre el ajustado); PER NTM ≈ 12,3x con el BPA GAAP de Zacks (2/12 × 4,70 + 10/12 × 5,20 = 5,12) y ≈ 11,1x con el de S&P/Yahoo (5,67). OJO con la base del BPA de S&P/Yahoo: su «año anterior» (4,26 USD en 2025, 1,16 en el 4T25) coincide con el «Adjusted EPS - diluted» de la empresa, que es el EBITDA ajustado dividido entre las acciones diluidas (162,9/38,2 = 4,27) [19, 2], no un beneficio; y su 2026e de 4,92 queda por debajo de lo ya publicado en esa base (9M26: 167,9/36,38 = 4,61 + 1,44 del 4T = 6,05). No mezclar con el BPA GAAP de las cuentas. Historia del PER adelantado: véase multiplos_historicos.notas.',
  },
  fuentes,
  huecos: [
    { seccion: 'consenso', campo: 'EBITDA y EBIT estimados 2026e-2028e', tipo: 'Núcleo', intentos: '1) Yahoo quoteSummary (earningsTrend: solo BPA y ventas); 2) Zacks y Stock Analysis (solo BPA y ventas; el detalle de Stock Analysis se carga con JavaScript); 3) MarketScreener y MarketBeat (403 desde la nube); Benzinga (error de cliente)', decision: 'Omitido' },
    { seccion: 'consenso', campo: 'Estimaciones de 2028e', tipo: 'Complemento', intentos: '1) Yahoo (solo 0y y +1y); 2) Zacks (solo año en curso y siguiente); 3) Stock Analysis (columna FY2028 sin cifras en el HTML)', decision: 'Omitido' },
    { seccion: 'consenso', campo: 'BPA GAAP del consenso actualizado tras el 3T26', tipo: 'Núcleo', intentos: '1) Zacks (actualizado el 5-nov a las 16:00, aún sin el 3T26: trimestre en curso 9/2026); 2) Yahoo/S&P Global (actualizado, pero 1 analista y base «ajustada» de la empresa); 3) Stock Analysis (misma fuente S&P)', decision: 'Se usa el GAAP de Zacks previo a resultados y se explica la diferencia de base' },
    { seccion: 'comparables', campo: 'EV/EBITDA NTM y ROIC de los comparables', tipo: 'Núcleo', intentos: '1) Yahoo quoteSummary (no da EBITDA estimado ni ROIC); 2) MarketScreener (403); 3) Stock Analysis por empresa (no cabía en el presupuesto de llamadas)', decision: 'Omitido' },
    { seccion: 'transacciones', campo: 'Múltiplos pagados (EV/ventas, EV/EBITDA) de Mattress Firm, Knoll, At Home, Noble House y New Classic', tipo: 'Complemento', intentos: '1) Comunicados oficiales de cada operación en EDGAR (no dan ventas ni EBITDA del objetivo); 2) XBRL de los objetivos (Knoll: sin ingresos etiquetados de 2020; At Home: ingresos, pero sin valor empresa publicado); 3) 10-K de GigaCloud (sin ventas de Noble House ni de New Classic)', decision: 'Omitido: solo 2 operaciones con múltiplo (Steelcase y PFSweb), por debajo del mínimo de 3' },
    { seccion: 'identificacion', campo: 'Fecha de los próximos resultados (4T26)', tipo: 'Complemento', intentos: '1) Nota de prensa del 3T26 (no la da); 2) Yahoo calendarEvents (da el 5-nov, ya pasado); 3) Stock Analysis (sin fecha)', decision: 'Omitido; los del 4T25 fueron el 26-feb-2026' },
    { seccion: 'identificacion', campo: 'ISIN publicado por una fuente', tipo: 'Complemento', intentos: '1) 10-Q y 10-K (no lo incluyen); 2) 13G de FMR y de Wu (solo el CUSIP G38644103); 3) Derivado del CUSIP con el prefijo KY y el dígito de control', decision: 'Calculado y marcado como estimación' },
  ],
};
writeFileSync(`${N}/D.json`, JSON.stringify(D, null, 2));
console.log(JSON.stringify(empresas, null, 0).replace(/\},\{/g, '},\n{'));
