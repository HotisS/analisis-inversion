// Escribe las notas A-E (hechos) de Alibaba, corte 2026-10-14. Entorno nube: solo WebSearch; cifras de los extractos
// de búsqueda de los 6-K/20-F en EDGAR, de Stock Analysis y de prensa, con la URL como fuente.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dir = path.dirname(fileURLToPath(import.meta.url));
const w = (n, o) => fs.writeFileSync(path.join(dir, n), JSON.stringify(o, null, 2), 'utf8');

const SEC = 'https://www.sec.gov/Archives/edgar/data/';

// ---------------------------------------------------------------- A. Cuentas
const A = {
  _estado: 'Completo dentro de lo que deja la búsqueda web (sin abrir EDGAR). 16 fuentes.',
  financieros: {
    cuenta: [
      { periodo: 'FY2022', ingresos: 853062, coste_ventas: null, gastos_generales: null, ebitda: null, amortizaciones: null, ebit: 69553, resultado_financiero: null, bai: null, impuestos: null, minoritarios: null, beneficio_neto: 61959, gastos_financieros: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 22.72, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: 2727 },
      { periodo: 'FY2023', ingresos: 868687, coste_ventas: null, gastos_generales: null, ebitda: null, amortizaciones: null, ebit: 102552, resultado_financiero: null, bai: null, impuestos: null, minoritarios: null, beneficio_neto: 72509, gastos_financieros: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 27.46, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: 2641 },
      { periodo: 'FY2024', ingresos: 941168, coste_ventas: null, gastos_generales: null, ebitda: null, amortizaciones: null, ebit: 113350, resultado_financiero: null, bai: null, impuestos: null, minoritarios: null, beneficio_neto: 79741, gastos_financieros: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 31.24, dpa: 11.99, dpa_extraordinario: 4.77, acciones_diluidas: 2553 },
      { periodo: 'FY2025', ingresos: 996347, coste_ventas: null, gastos_generales: null, ebitda: 176501, amortizaciones: 35596, ebit: 140905, resultado_financiero: null, bai: null, impuestos: null, minoritarios: null, beneficio_neto: 129470, gastos_financieros: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 11854, bpa: 53.59, dpa: 14.51, dpa_extraordinario: 6.89, acciones_diluidas: 2416 },
      { periodo: 'FY2026', ingresos: 1023670, coste_ventas: null, gastos_generales: null, ebitda: 92296, amortizaciones: 42146, ebit: 50150, resultado_financiero: null, bai: null, impuestos: null, minoritarios: null, beneficio_neto: 105904, gastos_financieros: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 10007, bpa: 44.0, dpa: 7.24, dpa_extraordinario: 0, acciones_diluidas: 2407 },
    ],
    ltm: null,
    cambios_perimetro: [
      { periodo: 'FY2026', descripcion: 'Venta de Sun Art e Intime (cerradas en FY2025): las ventas comparables crecen un 11 % frente al 3 % publicado [A1].' },
    ],
    comentario: null, ajustes: null, confianza: 'Media',
  },
  trimestres: {
    items: [
      { periodo: '1T26', ingresos: 247652, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 45540, margen_ebitda_pct: 18.4, bpa: 14.69, vs_consenso: null },
      { periodo: '3T26', ingresos: 284840, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: null },
      { periodo: '4T26', ingresos: 243383, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.62, vs_consenso: 'Inferior' },
      { periodo: '1T27', ingresos: 268950, crecimiento_pct: 9.0, crecimiento_organico_pct: null, ebitda: 39140, margen_ebitda_pct: 14.6, bpa: 8.52, vs_consenso: 'Inferior' },
    ],
    ultima_presentacion: null, confianza: 'Media',
  },
  balance: {
    historico: [
      { periodo: 'FY2022', activo_total: 1695553, activo_corriente: null, pasivo_corriente: null, pasivo_total: 613360, fondo_comercio: null, intangibles: null, inmovilizado_material: null, existencias: null, clientes: null, proveedores: null, activos_contrato: null, pasivos_contrato: null, caja: 455085, deuda_financiera: 176597, arrendamientos: 0, patrimonio_neto: 1082193, minoritarios: null, reservas: null },
      { periodo: 'FY2023', activo_total: 1753044, activo_corriente: null, pasivo_corriente: null, pasivo_total: 630123, fondo_comercio: null, intangibles: null, inmovilizado_material: null, existencias: null, clientes: null, proveedores: null, activos_contrato: null, pasivos_contrato: null, caja: 524470, deuda_financiera: 195569, arrendamientos: 0, patrimonio_neto: 1122921, minoritarios: null, reservas: null },
      { periodo: 'FY2024', activo_total: 1764829, activo_corriente: null, pasivo_corriente: null, pasivo_total: 652230, fondo_comercio: null, intangibles: null, inmovilizado_material: null, existencias: null, clientes: null, proveedores: null, activos_contrato: null, pasivos_contrato: null, caja: 571029, deuda_financiera: 205614, arrendamientos: 0, patrimonio_neto: 1112599, minoritarios: null, reservas: null },
      { periodo: 'FY2025', activo_total: 1804227, activo_corriente: null, pasivo_corriente: null, pasivo_total: 714121, fondo_comercio: null, intangibles: null, inmovilizado_material: null, existencias: null, clientes: null, proveedores: null, activos_contrato: null, pasivos_contrato: null, caja: 427436, deuda_financiera: 248110, arrendamientos: 0, patrimonio_neto: 1090106, minoritarios: null, reservas: null },
      { periodo: 'FY2026', activo_total: 1909570, activo_corriente: null, pasivo_corriente: null, pasivo_total: 783300, fondo_comercio: null, intangibles: null, inmovilizado_material: null, existencias: null, clientes: null, proveedores: null, activos_contrato: null, pasivos_contrato: null, caja: 316820, deuda_financiera: 281722, arrendamientos: 0, patrimonio_neto: 1126270, minoritarios: null, reservas: null },
    ],
    vencimientos: [],
    liquidez: 'Caja e inversiones líquidas (tesorería sin restricciones) de 474.505 M RMB a 30-jun-2026 [A4], más los ≈68.600 M RMB netos de la colocación de agosto de 2026 [D4]; crédito sindicado de 8.000 M USD repartido entre 22 bancos en 2026 [A14].',
    rating: null, coste_deuda_pct: null, vida_media_anios: null,
    otros_pasivos: null, comentario: null, confianza: 'Media',
  },
  flujos: {
    historico: [
      { periodo: 'FY2022', flujo_operativo: 142759, capex: 53259, pagos_arrendamientos: 0, adquisiciones: null, desinversiones: null, dividendos: 0, recompras: 61200, emision_acciones: 0, intereses_en_financiacion: 0 },
      { periodo: 'FY2023', flujo_operativo: 199752, capex: 34352, pagos_arrendamientos: 0, adquisiciones: null, desinversiones: null, dividendos: 0, recompras: 74700, emision_acciones: 0, intereses_en_financiacion: 0 },
      { periodo: 'FY2024', flujo_operativo: 182593, capex: 32093, pagos_arrendamientos: 0, adquisiciones: null, desinversiones: null, dividendos: 17900, recompras: 88745, emision_acciones: 0, intereses_en_financiacion: 0 },
      { periodo: 'FY2025', flujo_operativo: 163509, capex: 86009, pagos_arrendamientos: 0, adquisiciones: null, desinversiones: null, dividendos: 29100, recompras: 86662, emision_acciones: 0, intereses_en_financiacion: 0 },
      { periodo: 'FY2026', flujo_operativo: 76213, capex: 126113, pagos_arrendamientos: 0, adquisiciones: null, desinversiones: null, dividendos: 33700, recompras: 7638, emision_acciones: 0, intereses_en_financiacion: 0 },
    ],
    comentario: null, confianza: 'Media',
  },
  calidad: { auditor: 'PricewaterhouseCoopers Zhong Tian (PwC)', anios_auditor: null, opinion: 'Favorable', comentario: null, senales: [], confianza: 'Baja' },
  negocio: {
    segmentos: [],
    geografias: [],
    kpis: [
      { kpi: 'Ingresos de la nube (AI Cloud and Compute)', valor_anterior: '+34 % (FY2026)', valor_actual: '48.440 M RMB en el 1T27, +45 %', variacion: '+11 puntos de crecimiento', comentario: 'El ritmo más alto en 22 trimestres; margen EBITA del 12 % [A4, A13].' },
      { kpi: 'Comercio rápido (quick commerce)', valor_anterior: '78.500 M RMB en FY2026, +47 %', valor_actual: '53.300 M RMB en el 1T27, +45 %', variacion: 'Sigue en pérdidas', comentario: 'La dirección espera rentabilidad en FY2029 [A4, A15].' },
      { kpi: 'Ingresos por gestión de clientes (CMR)', valor_anterior: null, valor_actual: '+5 % en FY2026 (+7 % sin el programa de incentivos)', variacion: null, comentario: 'Crece por la comisión (take rate), no por volumen [A1].' },
      { kpi: 'Inversión (capex)', valor_anterior: '126.113 M RMB en FY2026', valor_actual: '67.680 M RMB en el 1T27, +75 %', variacion: null, comentario: 'Plan de 380.000 M RMB en IA y nube para 2026-29 [A13].' },
      { kpi: 'Caja libre', valor_anterior: '−17.300 M RMB en el 4T26', valor_actual: '−44.670 M RMB en el 1T27', variacion: null, comentario: 'Por la nube y el comercio rápido [A1, A4].' },
    ],
    confianza: 'Media',
  },
  capital: { politica: null, adquisiciones: [], comentario: null, confianza: 'Media' },
  fuentes: [
    { id: 1, titulo: 'Alibaba Group Announces March Quarter 2026 and Fiscal Year 2026 Results (6-K, ex. 99.1)', editor: 'Alibaba Group / SEC', tipo: 'Primaria', fecha: '2026-05-13', url: SEC + '0001577552/000110465926060224/tm2614494d1_ex99-1.htm' },
    { id: 2, titulo: 'Resultados FY2026: conciliación no GAAP y EBITA por segmentos (6-K, ex. 99.1, PDF)', editor: 'Alibaba Group / SEC', tipo: 'Primaria', fecha: '2026-05-13', url: SEC + '0001577552/000119312526274928/d133513dex991.pdf' },
    { id: 3, titulo: 'Form 20-F, ejercicio cerrado el 31-mar-2026', editor: 'Alibaba Group / SEC', tipo: 'Primaria', fecha: '2026-05-20', url: SEC + '0001577552/000119312526231755/baba-20260331.htm' },
    { id: 4, titulo: 'Alibaba Group Announces June Quarter 2026 Results (6-K, ex. 99.1)', editor: 'Alibaba Group / SEC', tipo: 'Primaria', fecha: '2026-08-20', url: SEC + '0001577552/000110465926099220/tm2623667d1_ex99-1.htm' },
    { id: 5, titulo: 'Alibaba Group Announces March Quarter 2025 and Fiscal Year 2025 Results (6-K)', editor: 'Alibaba Group / SEC', tipo: 'Primaria', fecha: '2025-05-15', url: SEC + '1577552/000110465925049400/tm2515233d1_ex99-1.htm' },
    { id: 6, titulo: 'Resultados FY2023 (6-K, ex. 99.1): conciliación del BPA no GAAP de FY2021-23', editor: 'Alibaba Group / SEC', tipo: 'Primaria', fecha: '2023-05-18', url: SEC + '1577552/000119312523190974/d517168dex991.pdf' },
    { id: 7, titulo: 'Alibaba Group Announces March Quarter and Full Fiscal Year 2021 Results (6-K)', editor: 'Alibaba Group / SEC', tipo: 'Primaria', fecha: '2021-05-13', url: SEC + '1577552/000110465921065916/tm2116252d1_ex99-1.htm' },
    { id: 8, titulo: 'Alibaba Group Announces March Quarter 2024 and Fiscal Year 2024 Results (6-K)', editor: 'Alibaba Group / SEC', tipo: 'Primaria', fecha: '2024-05-14', url: SEC + '1577552/000110465924061145/tm2414429d1_ex99-1.htm' },
    { id: 9, titulo: 'Alibaba (BABA): cuenta de resultados anual', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://stockanalysis.com/stocks/baba/financials/income-statement/' },
    { id: 10, titulo: 'Alibaba (HKG:9988): balance anual', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://stockanalysis.com/quote/hkg/9988/financials/balance-sheet/' },
    { id: 11, titulo: 'Alibaba (LON:0HCI): estado de flujos anual', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://stockanalysis.com/quote/lon/0HCI/financials/cash-flow-statement/' },
    { id: 12, titulo: 'Alibaba Group Holding Limited: balance anual (Capital IQ)', editor: 'Fintel', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://fintel.io/bs/hk/9988' },
    { id: 13, titulo: 'Alibaba quarterly revenue up 9%, misses adjusted profit due to heavy AI spend (Reuters)', editor: 'BNN Bloomberg', tipo: 'Prensa', fecha: '2026-08-20', url: 'https://www.bnnbloomberg.ca/business/company-news/2026/08/20/alibabas-quarterly-revenue-up-9-misses-adjusted-profit-due-to-heavy-ai-spend/' },
    { id: 14, titulo: 'Alibaba allocates $8bn jumbo financing among 22 lenders', editor: 'GlobalCapital', tipo: 'Prensa', fecha: '2026', url: 'https://www.globalcapital.com/article/28ms9todcvhj3xsl3x8lm/asia/alibaba-allocates-8bn-jumbo-financing-among-22-lenders-after-13-join-in-senior' },
    { id: 15, titulo: 'Alibaba revenue rises 9% to RMB268.95bn as AI cloud sales surge 45%', editor: 'Retail Sector', tipo: 'Prensa', fecha: '2026-08-20', url: 'https://www.retailsector.co.uk/744206-alibaba-revenue-rises-9-to-rmb268-95bn-as-ai-cloud-sales-surge-45/' },
    { id: 16, titulo: 'Alibaba Group Q1 earnings call highlights', editor: 'MarketBeat', tipo: 'Prensa', fecha: '2026-08-20', url: 'https://www.marketbeat.com/instant-alerts/alibaba-group-q1-earnings-call-highlights-2026-08-20/' },
  ],
  huecos: [
    { seccion: 'financieros', campo: 'coste de ventas, gastos, resultado financiero, impuestos y minoritarios por año', tipo: 'Núcleo', intentos: '1) 20-F FY2026 en EDGAR (no abre desde la nube); 2) Stock Analysis y Fintel por búsqueda (solo ingresos, beneficio y BPA); 3) comunicados de resultados citados por la búsqueda (solo resultado operativo y conciliación no GAAP)', decision: 'Omitido' },
    { seccion: 'negocio', campo: 'segmentos con ingresos de 5 ejercicios', tipo: 'Núcleo', intentos: '1) 20-F FY2026; 2) comunicado FY2026 por búsqueda (solo EBITA ajustado por segmento y reorganización de 2025); 3) Stock Analysis segmentos', decision: 'Omitido' },
    { seccion: 'balance', campo: 'circulante, fondo de comercio, vencimientos y rating', tipo: 'Núcleo', intentos: '1) 20-F FY2026; 2) Stock Analysis y Fintel; 3) prensa de las emisiones de bonos', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- D. Mercado y valoración
const D = {
  _estado: 'Completo con la red limitada. Precio de cierre del 13-oct (Morningstar).',
  identificacion: {
    nombre: 'Alibaba Group Holding Limited', nombre_corto: 'Alibaba', ticker: 'BABA', isin: 'US01609W1027', mercado: 'NYSE (ADS; 1 ADS = 8 acciones ordinarias 9988.HK)', indice_referencia: 'Hang Seng / S&P 500',
    pais: 'China (sociedad de las Islas Caimán)', pais_iso: 'CN', sector: 'Consumo discrecional', industria: 'Comercio minorista por internet y nube', sede: 'Hangzhou', fundacion: '1999', empleados: null, web: 'https://www.alibabagroup.com',
    precio: 742.7, fecha_precio: '2026-10-13', acciones: 2486, capitalizacion_publicada: 1846000, free_float_pct: null,
    max_52s: 1222.8, min_52s: 616.3, volumen_medio_diario: null, proximos_resultados: '2026-11-24',
  },
  consenso: {
    guidance: null,
    estimaciones: [
      { periodo: 'FY2027e', ingresos: null, ebitda: null, ebit: null, bpa: 39.6, dpa: null, fuente: 'Consenso de MarketBeat (5,91 USD por ADS a 6,70) [D8]' },
      { periodo: 'FY2028e', ingresos: null, ebitda: null, ebit: null, bpa: 56.3, dpa: null, fuente: 'Erste Group, 8-sep-2026 (8,41 USD por ADS a 6,70); una sola casa [D7]' },
    ],
    recomendaciones: { n_analistas: 22, comprar: 17, mantener: 5, vender: 0, po_medio: 1264.3, po_min: 904.5, po_max: 1507.5 },
    revisiones: null, base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: null, confianza: 'Media',
  },
  bolsa: {
    tipo_rentabilidad: 'de precio (sin dividendos)',
    rentabilidades: [ { periodo: 'En el año', accion_pct: -24.4, indice_pct: null, sector_pct: null } ],
    anual: [
      { anio: '2021', accion_pct: -49.0, indice_pct: null }, { anio: '2022', accion_pct: -25.8, indice_pct: null }, { anio: '2023', accion_pct: -10.8, indice_pct: null }, { anio: '2024', accion_pct: 10.3, indice_pct: null }, { anio: '2025', accion_pct: 74.3, indice_pct: null },
    ],
    beta: null, volatilidad_pct: null, max_drawdown_pct: -36.8, posicion_corta_pct: null,
    comentario: null, confianza: 'Baja',
  },
  multiplos_historicos: {
    serie: [
      { anio: 'FY2022', precio_cierre: 689.7, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: 'FY2023', precio_cierre: 701.7, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: 'FY2024', precio_cierre: 522.5, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: 'FY2025', precio_cierre: 959.6, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: 'FY2026', precio_cierre: 865.2, ev_ebitda_ntm: null, per_ntm: null, excluir: true },
    ],
    comentario: null, confianza: 'Media',
  },
  comparables: {
    criterio: null,
    empresas: [
      { nombre: 'Tencent', ticker: '0700.HK', pais: 'CN', capitalizacion: null, ev_ventas: null, ev_ebitda_ltm: null, ev_ebitda_ntm: null, per_ntm: 12.3, crecimiento_pct: null, margen_ebitda_pct: null, roic_pct: null, dn_ebitda: null, fcf_yield_pct: null },
      { nombre: 'Baidu', ticker: 'BIDU', pais: 'CN', capitalizacion: null, ev_ventas: null, ev_ebitda_ltm: null, ev_ebitda_ntm: null, per_ntm: 13.3, crecimiento_pct: null, margen_ebitda_pct: null, roic_pct: null, dn_ebitda: null, fcf_yield_pct: null },
      { nombre: 'NetEase', ticker: 'NTES', pais: 'CN', capitalizacion: null, ev_ventas: null, ev_ebitda_ltm: null, ev_ebitda_ntm: null, per_ntm: 12.0, crecimiento_pct: null, margen_ebitda_pct: null, roic_pct: null, dn_ebitda: null, fcf_yield_pct: null },
      { nombre: 'PDD Holdings', ticker: 'PDD', pais: 'CN', capitalizacion: null, ev_ventas: null, ev_ebitda_ltm: null, ev_ebitda_ntm: null, per_ntm: 9.4, crecimiento_pct: null, margen_ebitda_pct: null, roic_pct: null, dn_ebitda: null, fcf_yield_pct: null },
      { nombre: 'Amazon', ticker: 'AMZN', pais: 'US', capitalizacion: 18790398, ev_ventas: 3.8, ev_ebitda_ltm: 15.18, ev_ebitda_ntm: 11.26, per_ntm: 23.47, crecimiento_pct: 15.07, margen_ebitda_pct: 23.69, roic_pct: 11.94, dn_ebitda: 0.67, fcf_yield_pct: -0.42 },
      { nombre: 'MercadoLibre', ticker: 'MELI', pais: 'UY', capitalizacion: 641927, ev_ventas: 2.58, ev_ebitda_ltm: 22.5, ev_ebitda_ntm: 17.2, per_ntm: 36.4, crecimiento_pct: 35, margen_ebitda_pct: 13.9, roic_pct: null, dn_ebitda: -1.13, fcf_yield_pct: null },
    ],
    comentario: null, confianza: 'Baja',
  },
  transacciones: null,
  fuentes: [
    { id: 1, titulo: 'BABA: cotización (cierre del 13-oct-2026, 110,85 USD)', editor: 'Morningstar', tipo: 'Datos de mercado', fecha: '2026-10-13', url: 'https://www.morningstar.com/stocks/xnys/baba/quote' },
    { id: 2, titulo: 'Alibaba (BABA) Stock Price: Oct 12 Close $110.78; rango de 52 semanas 91,99-182,50 USD', editor: 'Gotrade', tipo: 'Datos de mercado', fecha: '2026-10-12', url: 'https://www.heygotrade.com/en/us-stock/baba/' },
    { id: 3, titulo: 'Alibaba Group Holding (BABA) Stock Price & Overview', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://stockanalysis.com/stocks/baba/' },
    { id: 4, titulo: 'Colocación de 710 M de acciones nuevas a 112,70 HKD (6-K)', editor: 'Alibaba Group / SEC', tipo: 'Primaria', fecha: '2026-08-26', url: SEC + '0001577552/000119312526361715/baba-ex99_3.htm' },
    { id: 5, titulo: 'Alibaba Raises $10.2 Billion in Massive Share Sale, Sending Shares Tumbling', editor: 'KuCoin News', tipo: 'Prensa', fecha: '2026-08', url: 'https://www.kucoin.com/blog/en-alibaba-raises-10-2-billion-in-massive-share-sale-sending-shares-tumbling' },
    { id: 6, titulo: 'Alibaba Group (BABA) price target and analyst forecast (22 analistas, 3-sep-2026)', editor: 'MarketBeat', tipo: 'Analistas', fecha: '2026-09-03', url: 'https://www.marketbeat.com/stocks/NYSE/BABA/forecast/' },
    { id: 7, titulo: 'Erste Group Bank Boosts Earnings Estimates for Alibaba Group (FY2027 5,81 USD; FY2028 8,41 USD)', editor: 'The Markets Daily', tipo: 'Analistas', fecha: '2026-09-08', url: 'https://www.themarketsdaily.com/?p=9936258' },
    { id: 8, titulo: 'Consenso de BPA del ejercicio en curso (5,91 USD por ADS)', editor: 'Daily Political (MarketBeat)', tipo: 'Analistas', fecha: '2026-09', url: 'https://www.dailypolitical.com/?p=10505092' },
    { id: 9, titulo: 'Alibaba (BABA) price history: precios mensuales reales de marzo', editor: 'Digrin', tipo: 'Datos de mercado', fecha: '2026', url: 'https://www.digrin.com/stocks/detail/BABA/price' },
    { id: 10, titulo: 'Alibaba stock is down nearly 27% in 2026 as earnings keep missing estimates (cierre del 29-sep: 107,74 USD; −14,1 % desde el 31-mar)', editor: 'TIKR', tipo: 'Prensa', fecha: '2026-09-30', url: 'https://www.tikr.com/de/blog/alibaba-stock-is-down-nearly-27-in-2026-as-earnings-keep-missing-estimates-heres-what-the-next-report-has-to-show' },
    { id: 11, titulo: 'Alibaba - 12 Year Stock Price History (cierres anuales)', editor: 'Macrotrends', tipo: 'Datos de mercado', fecha: '2026-01-22', url: 'https://www.macrotrends.net/stocks/charts/BABA/alibaba/stock-price-history' },
    { id: 12, titulo: 'China 10Y Yield Hits Over 1-Year Low (≈1,67 %)', editor: 'Trading Economics', tipo: 'Datos de mercado', fecha: '2026-09-21', url: 'https://tradingeconomics.com/china/government-bond-yield/news/585190' },
    { id: 13, titulo: 'Offshore Yuan Holds Gains (≈6,70 por dólar a 30-sep)', editor: 'Trading Economics', tipo: 'Datos de mercado', fecha: '2026-09-30', url: 'https://tradingeconomics.com/china/currency/news/587959' },
    { id: 14, titulo: 'Citigroup Suggests Chinese Internet Stocks Are Nearing Attractive Valuation Lows (PER a un año)', editor: 'Tiger Brokers', tipo: 'Analistas', fecha: '2026-04', url: 'https://www.itiger.com/news/1106754947' },
    { id: 15, titulo: 'PDD Holdings: valoración (PER 2026e)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://uk.marketscreener.com/quote/stock/PDD-HOLDINGS-INC-45049866/valuation/' },
    { id: 16, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026: 4,20 %', editor: 'A. Damodaran, NYU Stern', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
    { id: 17, titulo: 'Comparables estadounidenses (Amazon, MercadoLibre) del informe de Amazon del 12-oct-2026, con datos de Stock Analysis y MarketScreener', editor: 'Stock Analysis / MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-12', url: 'https://stockanalysis.com/stocks/amzn/statistics/' },
    { id: 18, titulo: 'Alibaba Q1 FY27 earnings preview: Wall Street is overwhelmingly bullish (BPA ajustado esperado 10,8 RMB por ADS)', editor: 'Pepperstone', tipo: 'Analistas', fecha: '2026-08', url: 'https://pepperstone.com/en/analysis/navigating-markets/alibaba-q1-fy27-earnings-preview-wall-street-is-overwhelmingly-bullish-now-ai-and-cloud-have-to-prove-it' },
    { id: 19, titulo: 'BABA: Trendspider (próximos resultados)', editor: 'TrendSpider', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://trendspider.com/markets/symbols/BABA/' },
    { id: 20, titulo: 'Analysts boost Alibaba (BABA) price targets (Goldman 205, Mizuho 195, Jefferies 230 USD)', editor: 'TipRanks', tipo: 'Analistas', fecha: '2026-10', url: 'https://www.tipranks.com/news/analysts-see-more-upside-in-alibaba-stock-baba-on-cloud-and-ai-tailwinds' },
  ],
  huecos: [
    { seccion: 'transacciones', campo: 'sección entera', tipo: 'Complemento', intentos: '1) operaciones del sector en el 20-F; 2) búsqueda de compras de plataformas chinas de comercio electrónico con múltiplo; 3) prensa', decision: 'Omitido' },
    { seccion: 'bolsa', campo: 'beta, volatilidad, índices y rentabilidad total', tipo: 'Complemento', intentos: '1) bolsa.mjs (sin red); 2) Stock Analysis por búsqueda; 3) Macrotrends (solo cierres anuales de precio)', decision: 'Omitido' },
    { seccion: 'comparables', campo: 'capitalización, múltiplos de EBITDA y crecimiento de los comparables chinos', tipo: 'Núcleo', intentos: '1) MarketScreener por búsqueda (solo PER de PDD); 2) nota de Citigroup (solo PER a un año, de abril); 3) AlphaSpread (capitalizaciones sin fecha)', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- B. Sector y competencia
const B = {
  _estado: 'Parcial: sector y competencia con cifras de la empresa y prensa; sin tamaño de mercado de dos fuentes.',
  historia: {
    resumen: null,
    hitos: [
      { anio: '1999', hito: 'Jack Ma y 17 cofundadores crean Alibaba.com en Hangzhou (comercio entre empresas).' },
      { anio: '2003', hito: 'Nace Taobao; en 2004, Alipay (hoy Ant Group).' },
      { anio: '2014', hito: 'Salida a bolsa en Nueva York: 25.000 M USD, la mayor de la historia hasta entonces.' },
      { anio: '2019', hito: 'Segunda cotización en Hong Kong (9988.HK); 1 ADS pasa a ser 8 acciones ordinarias [B1].' },
      { anio: '2020-21', hito: 'Suspensión de la salida a bolsa de Ant Group y multa antimonopolio de 18.228 M RMB; empieza la campaña regulatoria [A7].' },
      { anio: '2023', hito: 'Reorganización en seis grupos; Eddie Wu, primer ejecutivo, y Joe Tsai, presidente.' },
      { anio: '2025', hito: 'Venta de Sun Art e Intime; entrada en el comercio rápido (Taobao Instant Commerce) [A1].' },
      { anio: '2026', hito: 'Plan de 380.000 M RMB en IA y nube para 2026-29 y colocación de 80.000 M HKD en acciones nuevas para financiarlo [A13, D4].' },
    ],
    confianza: 'Media',
  },
  sector: null,
  competencia: {
    cuota_pct: null, posicion: '1.º en comercio electrónico en China por volumen de mercancía (Taobao y Tmall) y 1.º en nube pública en China',
    competidores: [
      { nombre: 'PDD Holdings (Pinduoduo, Temu)', pais: 'China', ticker: 'PDD', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Precio bajo y subvenciones; gana cuota en el comercio electrónico chino desde 2019.' },
      { nombre: 'JD.com', pais: 'China', ticker: 'JD', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Venta directa y logística propia; rival en el comercio rápido desde 2025.' },
      { nombre: 'Meituan', pais: 'China', ticker: '3690.HK', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Líder en reparto a domicilio; la guerra de subvenciones del comercio rápido es con él.' },
      { nombre: 'ByteDance (Douyin)', pais: 'China', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Comercio en vídeo y en directo; también modelos de IA (Doubao).' },
      { nombre: 'Tencent Cloud / Huawei Cloud', pais: 'China', ticker: '0700.HK', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Competidores en la nube; Huawei con chips propios.' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Se estrecha',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 4, evidencia: 'Taobao y Tmall unen cientos de millones de compradores y millones de comercios; el CMR crece un 5 % en FY2026 por la comisión, no por volumen [A1].' },
        { fuente: 'Costes de cambio', puntuacion: 2, evidencia: 'Bajos para el comprador; algo mayores para el comercio (publicidad, datos) y para los clientes de la nube.' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'Marcas Taobao, Tmall y Alipay; modelos de lenguaje Qwen.' },
        { fuente: 'Ventaja en costes', puntuacion: 2, evidencia: 'La escala en la nube ayuda, pero el EBITA de comercio electrónico cae un 44 % en FY2026 por la guerra de subvenciones [A2].' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'Primera nube de China; el plan de inversión de 380.000 M RMB es difícil de igualar salvo para Tencent, ByteDance o Huawei [A13].' },
      ],
    },
    amenazas: null,
    confianza: 'Media',
  },
  esg: { calificaciones: [], materialidad: null, controversias: null, confianza: 'Baja' },
  fuentes: [
    { id: 1, titulo: 'Form 20-F FY2026 (descripción del negocio y estructura VIE)', editor: 'Alibaba Group / SEC', tipo: 'Primaria', fecha: '2026-05-20', url: SEC + '0001577552/000119312526231755/baba-20260331.htm' },
    { id: 2, titulo: 'Alibaba profit plunges 75% as AI spending increases', editor: 'Retail Gazette', tipo: 'Prensa', fecha: '2026-08-20', url: 'https://www.retailgazette.co.uk/blog/2026/08/alibaba-profit-plunges-75-as-ai-spending-increases/' },
    { id: 3, titulo: 'Alibaba reports continued profit squeeze from spending on AI and instant retail', editor: 'CTV News (AP)', tipo: 'Prensa', fecha: '2026-08-20', url: 'https://www.ctvnews.ca/business/article/alibaba-reports-continued-profit-squeeze-from-spending-on-ai-and-instant-retail/' },
    { id: 4, titulo: 'Alibaba (BABA) Stock Forecast for 2026: Can AI and Cloud Growth Push BABA Past $200? (subida de precios de la nube)', editor: 'BingX', tipo: 'Prensa', fecha: '2026-06-22', url: 'https://bingx.com/en/learn/article/alibaba-baba-stock-outlook-and-price-prediction-is-baba-a-good-investment' },
  ],
  huecos: [
    { seccion: 'sector', campo: 'sección entera (tamaño del mercado con dos fuentes, Porter, ciclo)', tipo: 'Núcleo', intentos: '1) estadística oficial de ventas en línea de China (NBS) por búsqueda; 2) informes de mercado de la nube china (IDC, Canalys) por búsqueda; 3) prensa', decision: 'Omitido por falta de búsquedas en el presupuesto compartido; el contexto va en competencia y en riesgos' },
    { seccion: 'competencia', campo: 'ingresos y márgenes de los competidores', tipo: 'Núcleo', intentos: '1) cuentas de PDD, JD y Meituan por búsqueda; 2) Stock Analysis; 3) prensa', decision: 'Omitido' },
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) MSCI; 2) Sustainalytics; 3) informe ESG de la empresa', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- C. Equipo y gobierno
const C = {
  _estado: 'Parcial: equipo y estructura de control del 20-F (conocida), demanda colectiva y lista 1260H; sin votos ni remuneración.',
  directivos: {
    equipo: [
      { nombre: 'Joseph (Joe) Tsai', cargo: 'Presidente del consejo', desde: '2023', participacion_pct: null, trayectoria: 'Cofundador (1999) y vicepresidente ejecutivo durante dos décadas; preside desde septiembre de 2023 [C1].' },
      { nombre: 'Eddie Yongming Wu', cargo: 'Primer ejecutivo', desde: '2023', participacion_pct: null, trayectoria: 'Cofundador; preside Taobao y Tmall y dirige la nube. Ha llevado el giro a la IA (plan de 380.000 M RMB) y la entrada en el comercio rápido [A13].' },
      { nombre: 'Toby Xu', cargo: 'Director financiero', desde: '2021', participacion_pct: null, trayectoria: 'Antes socio de PwC; ha llevado la venta de activos no estratégicos (Sun Art, Intime) y la colocación de 2026 [C1, D4].' },
    ],
    historial_guidance: [],
    comentario: null, confianza: 'Media',
  },
  gobierno: {
    consejo: [],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: null, una_accion_un_voto: false,
    operaciones_vinculadas_relevantes: true, variable_ligado_rentabilidad: null, auditoria_independiente: true, insiders_sin_operaciones: null,
    accionista_control: true, presidente_vinculado_control: true, cambios_cupula_24m: 0,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: null, remuneracion: null,
    accionistas: [],
    insiders: [],
    control_y_defensas: null,
    alertas: [
      'Demanda colectiva en Nueva York (Wistisen v. Alibaba, 1:26-cv-06654, SDNY) por supuestas omisiones sobre sus vínculos con el Estado chino; periodo del 26-jun-2025 al 24-jun-2026 [C2, C3].',
      'Inclusión en la lista 1260H del Departamento de Defensa de EE. UU. (empresas militares chinas) el 8-jun-2026, según la demanda; en febrero de 2026 entró y salió el mismo día [C2, C4].',
      'Estructura VIE: el accionista de BABA posee una sociedad de las Islas Caimán con contratos sobre las sociedades chinas, no estas [C1].',
    ],
    confianza: 'Baja',
  },
  fuentes: [
    { id: 1, titulo: 'Form 20-F FY2026 (Item 6, Item 16G, estructura VIE y Alibaba Partnership)', editor: 'Alibaba Group / SEC', tipo: 'Primaria', fecha: '2026-05-20', url: SEC + '0001577552/000119312526231755/baba-20260331.htm' },
    { id: 2, titulo: 'Alibaba Group Holding Limited (NYSE: BABA) Securities Fraud Class Action', editor: 'Kessler Topaz Meltzer & Check', tipo: 'Prensa', fecha: '2026-08', url: 'https://www.ktmc.com/?p=18145' },
    { id: 3, titulo: 'Kaplan Fox alerts Alibaba investors to a securities class action deadline on October 5, 2026', editor: 'Newsfile', tipo: 'Prensa', fecha: '2026-08', url: 'https://www.newsfilecorp.com/release/308164/Kaplan-Fox-Kilsheimer-LLP-Alerts-Alibaba-Group-Holding-Limited-BABA-Investors-to-a-Securities-Class-Action-Deadline-on-October-5-2026' },
    { id: 4, titulo: 'Alibaba stock has fallen 31% from its highs: is BABA a buy in 2026? (lista 1260H de febrero)', editor: 'TIKR', tipo: 'Prensa', fecha: '2026-04', url: 'https://www.tikr.com/es/blog/alibaba-stock-has-fallen-31-from-its-highs-is-baba-a-buy-in-2026' },
  ],
  huecos: [
    { seccion: 'gobierno', campo: 'consejo, votos de la junta, remuneración y accionistas', tipo: 'Núcleo', intentos: '1) 20-F FY2026 en EDGAR (no abre); 2) circular de la junta en HKEX por búsqueda; 3) prensa', decision: 'Omitido; se describe la estructura de control' },
    { seccion: 'directivos', campo: 'historial de cumplimiento de la guía', tipo: 'Núcleo', intentos: '1) comunicados; 2) transcripciones; 3) prensa', decision: 'Omitido: la empresa no da guía numérica anual' },
  ],
};

// ---------------------------------------------------------------- E. Sentimiento
const E = {
  _estado: 'Hecho con búsqueda web: Reddit y Stocktwits no son accesibles; Seeking Alpha, Motley Fool, TIKR y MarketBeat sí.',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Empeora',
    revisadas: [
      { plataforma: 'Seeking Alpha (artículos y comentarios)', fecha: '2026-09', n_comentarios: 40, tono: 'Dividido', resumen: 'Conviven un «Mantener» por el frenazo del consumo chino que pesa sobre la nube y tesis alcistas que ven el suelo técnico cerca y la inversión en IA pagada en tres años [E1, E2, E3].' },
      { plataforma: 'Motley Fool (Amazon frente a Alibaba)', fecha: '2026-10', n_comentarios: 10, tono: 'Neutro', resumen: 'Presenta a Alibaba como la opción barata y a Amazon como la de calidad; el riesgo de China pesa en la comparación [E4].' },
      { plataforma: 'TIKR (blog y comentarios)', fecha: '2026-09', n_comentarios: 10, tono: 'Negativo', resumen: 'La acción cae un 27 % en el año porque los resultados fallan una y otra vez frente a las previsiones; el próximo informe tiene que demostrar que el gasto rinde [E5].' },
      { plataforma: 'MarketBeat y agregadores técnicos', fecha: '2026-10', n_comentarios: 15, tono: 'Dividido', resumen: 'Analistas en «Compra moderada» con objetivos al alza; los indicadores técnicos la sitúan bajo las medias de 50 y 200 sesiones [D6, E6].' },
    ],
    temas: [
      { tema: 'El gasto en IA y la caja libre negativa', postura: 'Dividida', peso: 'Alto', contraste: 'La caja libre fue de −44.670 M RMB en el 1T27 y la inversión subió un 75 % [A4]; la dirección dice que la inversión en IA se paga en tres años, sin cifras de rendimiento que lo prueben.' },
      { tema: 'La colocación de agosto (dilución)', postura: 'Bajista', peso: 'Medio', contraste: '710 M de acciones nuevas, un 3,7 % del capital, a 112,70 HKD [D4]: diluye el BPA en la misma proporción y rompe con cinco años de recompras.' },
      { tema: 'Comercio rápido y guerra de subvenciones', postura: 'Bajista', peso: 'Alto', contraste: 'Ingresos +45 % pero en pérdidas hasta FY2029, según la empresa [A4]; es la principal causa de la caída del 44 % del EBITA de comercio electrónico [A2].' },
      { tema: 'Riesgo geopolítico y regulatorio (lista 1260H, demanda)', postura: 'Bajista', peso: 'Medio', contraste: 'Entró en la lista del Pentágono el 8-jun-2026 según la demanda colectiva [C2]; no hay cifra que lo cuantifique: va a la prima de riesgo del WACC.' },
      { tema: 'La nube como motor', postura: 'Alcista', peso: 'Alto', contraste: 'Crece un 45 % con margen EBITA del 12 % [A4]: los foros tienen razón en el crecimiento; el peso en el beneficio todavía es pequeño.' },
    ],
    lectura: null,
    confianza: 'Baja',
  },
  fuentes: [
    { id: 1, titulo: 'Alibaba Stock: Consumer Slowdown Weighs On Cloud Intelligence', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-09', url: 'https://seekingalpha.com/article/4855554-alibaba-consumer-slowdown-weighs-on-cloud-intelligence' },
    { id: 2, titulo: "Alibaba's Technical Bottom Is Near - Diversified Commerce/Cloud Growth Prospects", editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-09', url: 'https://seekingalpha.com/article/4916622-alibaba-stock-technical-bottom-near-diversified-commerce-cloud-growth-prospects' },
    { id: 3, titulo: 'Alibaba: Three-Year AI CapEx Payback Period Silence Bears', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-08', url: 'https://seekingalpha.com/article/4941330-alibaba-3-years-ai-capex-payback-period-silence-bears' },
    { id: 4, titulo: 'Amazon.com vs. Alibaba: Which Consumer Stock Is a Better Buy in 2026?', editor: 'Motley Fool', tipo: 'Foros y redes', fecha: '2026-10-12', url: 'https://www.fool.com/coverage/better-buy/2026/10/12/amazoncom-vs-alibaba-which-consumer-stock-is-a-better-buy-in-2026/' },
    { id: 5, titulo: "Alibaba stock is down nearly 27% in 2026 as earnings keep missing estimates", editor: 'TIKR', tipo: 'Foros y redes', fecha: '2026-09-30', url: 'https://www.tikr.com/de/blog/alibaba-stock-is-down-nearly-27-in-2026-as-earnings-keep-missing-estimates-heres-what-the-next-report-has-to-show' },
    { id: 6, titulo: 'Alibaba (BABA): análisis técnico (bajo las medias de 50 y 200)', editor: 'Gotrade', tipo: 'Foros y redes', fecha: '2026-10-12', url: 'https://www.heygotrade.com/en/us-stock/baba/' },
  ],
  huecos: [
    { seccion: 'sentimiento', campo: 'Reddit, Stocktwits y foros chinos (Xueqiu)', tipo: 'Complemento', intentos: '1) búsqueda en reddit.com (dominio bloqueado para el buscador); 2) Stocktwits por búsqueda (sin resultados); 3) Xueqiu (no se intentó por presupuesto de búsquedas)', decision: 'Omitido' },
  ],
};

w('A.json', A); w('B.json', B); w('C.json', C); w('D.json', D); w('E.json', E);
console.log('notas A-E escritas');
