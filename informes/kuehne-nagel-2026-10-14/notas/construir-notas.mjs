// Escribe las notas A-E de Kuehne+Nagel (corte 2026-10-14) a partir de resultados de búsqueda web (único acceso de red en este entorno)
// y del análisis de DSV del repositorio (7-oct-2026: sector, competidores, comparables y transacciones).
// Cada nota cita solo con [n] de su propia lista de fuentes. Ejecutar: node notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const raiz = path.resolve(dir, '..', '..', '..');
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const DKK_CHF = 7.4745 / 0.9309; // DKK por CHF, tipos del BCE del 7-oct-2026 (8,029)

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Ad hoc announcement: Kuehne+Nagel full year 2025 results (ingresos netos 24.476 M, beneficio 925 M, caja libre 917 M)', editor: 'Kuehne + Nagel International AG', tipo: 'Primaria', fecha: '2026-03-03', url: 'https://assets.kuehne-nagel.com/f/331466/x/13f45a8e88/adhoc-kuehnenagel-fy-2025-english.pdf' },
  { id: 2, titulo: 'Annual Report 2025: income statement (ingresos, margen bruto, EBITDA, EBIT)', editor: 'Kuehne + Nagel International AG', tipo: 'Primaria', fecha: '2026-03', url: 'https://2025-annual-report.kuehne-nagel.com/annual-report/status-report/income-statement' },
  { id: 3, titulo: 'Consolidated Financial Statements 2025 (cuenta: EBT 1.230 M, impuesto 305 M; ingresos y gastos financieros)', editor: 'Kuehne + Nagel International AG', tipo: 'Primaria', fecha: '2026-03', url: 'https://assets.kuehne-nagel.com/f/331466/x/2fa31c0666/kn_2025_ar_consolidated_financial_statement.pdf' },
  { id: 4, titulo: 'Annual Report 2025: balance sheet (activo total 11.927 M)', editor: 'Kuehne + Nagel International AG', tipo: 'Primaria', fecha: '2026-03', url: 'https://2025-annual-report.kuehne-nagel.com/annual-report/consolidated-financial-statements-2025/balance-sheet' },
  { id: 5, titulo: 'Annual Report 2024 (cuenta 2024 y 2023, BPA 2018-2024, dividendo 8,25 CHF)', editor: 'Kuehne + Nagel International AG', tipo: 'Primaria', fecha: '2025-03', url: 'https://assets.kuehne-nagel.com/f/331466/x/52cabfc6da/annual_report_2024.pdf' },
  { id: 6, titulo: 'Kuehne+Nagel reports very strong 2022 result (ingresos 39.398 M, EBIT 3.763 M, beneficio 2.810 M)', editor: 'FreshPlaza', tipo: 'Prensa', fecha: '2023-03-02', url: 'https://www.freshplaza.com/north-america/article/9507786/kuehne-nagel-reports-very-strong-2022-result/' },
  { id: 7, titulo: 'Ad hoc: Kuehne+Nagel with remarkably strong performance in 2021', editor: 'Kuehne + Nagel International AG', tipo: 'Primaria', fecha: '2022-03-02', url: 'https://newsroom.kuehne-nagel.com/kuehnenagel-with-remarkably-strong-performance-in-2021/' },
  { id: 8, titulo: 'Annual Report 2021: key financial figures (margen bruto 9.896 M, EBITDA 3.679 M)', editor: 'Kuehne + Nagel International AG', tipo: 'Primaria', fecha: '2022-03', url: 'https://2021-annual-report.kuehne-nagel.com/annual-report/status-report/key-financial-figures' },
  { id: 9, titulo: 'Kuehne + Nagel International AG (SWX:KNIN): balance sheet anual y TTM', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://stockanalysis.com/quote/swx/KNIN/financials/balance-sheet/' },
  { id: 10, titulo: 'Kuehne + Nagel International AG (SWX:KNIN): cash flow statement', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://stockanalysis.com/quote/swx/KNIN/financials/cash-flow-statement/' },
  { id: 11, titulo: 'Ad hoc announcement: Kuehne+Nagel Q2 2026 results', editor: 'Kuehne + Nagel International AG', tipo: 'Primaria', fecha: '2026-07-23', url: 'https://assets.kuehne-nagel.com/f/331466/x/34ede41ff0/ad-hoc-kuehne-nagel-q2-2026-english.pdf' },
  { id: 12, titulo: 'Kuehne+Nagel H1 2026: muted overall, but Q2 shows clear rebound', editor: 'Transport Intelligence', tipo: 'Sectorial', fecha: '2026-07-23', url: 'https://ti-insight.com/briefs/kuehne-nagel-h1-2026-results-q2-rebound/' },
  { id: 13, titulo: 'Kuehne+Nagel Q2 earnings up 10 %; net turnover rises 8 %; lifts FY26 recurring EBIT view', editor: 'Vermögenszentrum (AWP)', tipo: 'Prensa', fecha: '2026-07-23', url: 'https://www.vermoegenszentrum.ch/en/stock-exchange-and-markets/news/kuehnenagel-q2-earnings-10-net-turnover-rises-8-lifts-fy26' },
  { id: 14, titulo: 'Ad hoc announcement: Kuehne+Nagel Q1 2026 results', editor: 'Kuehne + Nagel International AG', tipo: 'Primaria', fecha: '2026-04-24', url: 'https://assets.kuehne-nagel.com/f/331466/x/c708d82964/adhoc-kuehnenagel-q1-2026-english.pdf' },
  { id: 15, titulo: 'Kuehne+Nagel Q1 2026 (comparativa con el 1T25: ingresos 6.300 M, EBIT 402 M, beneficio 303 M)', editor: 'trans.info', tipo: 'Prensa', fecha: '2026-04-24', url: 'https://trans.info/en/kuehne-nagel-q1-2026-471421' },
  { id: 16, titulo: 'Kuehne+Nagel Q4 net income declines (4T25: ingresos 5.950 M, EBIT 213 M, recurrente 335 M)', editor: 'Nasdaq (RTTNews)', tipo: 'Prensa', fecha: '2026-03-03', url: 'https://www.nasdaq.com/articles/kuehnenagel-q4-net-income-declines' },
  { id: 17, titulo: 'Kuehne+Nagel successfully issues two bonds for a total of CHF 400 million (2028 y 2031)', editor: 'Kuehne + Nagel International AG', tipo: 'Primaria', fecha: '2025-05-01', url: 'https://newsroom.kuehne-nagel.com/kuehnenagel-successfully-issues-two-bonds-for-a-total-of-chf-400-million/' },
  { id: 18, titulo: 'Anleihe: Kühne+Nagel nimmt in zwei Tranchen 400 Mio Fr. auf (2029 y 2032; A-/A/A-)', editor: 'cash.ch (AWP)', tipo: 'Prensa', fecha: '2026-06', url: 'https://www.cash.ch/news/anleihe-kuhnenagel-nimmt-in-zwei-tranchen-400-mio-fr-auf-947731' },
  { id: 19, titulo: 'Kuehne+Nagel acquires majority stake in IMC Logistics', editor: 'Supply Chain Dive', tipo: 'Prensa', fecha: '2024-11', url: 'https://www.supplychaindive.com/news/imc-logistics-kuehne-nagel-merger-acquisition/733726/' },
  { id: 20, titulo: 'Kuehne+Nagel 2024 results (caja libre 643 M; dividendo 8,25 CHF frente a 10,00)', editor: 'FreshPlaza', tipo: 'Prensa', fecha: '2025-03-04', url: 'https://www.freshplaza.com/north-america/article/9710453/kuehne-nagel-reports-chf-24-8-billion-revenue-in-2024-up-4/' },
  { id: 21, titulo: 'Kuehne+Nagel 2023: net turnover 23,8 bn, EBIT 1,9 bn, net profit 1,5 bn', editor: 'Kuehne + Nagel (newsroom)', tipo: 'Primaria', fecha: '2024-03', url: 'https://fi.kuehne-nagel.com/en/-/uutiset/kuehne-nagelin-liiketulos-normalisoitui-2023' },
  { id: 22, titulo: 'Kuehne+Nagel Q2 FY26 earnings rise 10 % to CHF 276 million', editor: 'Vermögenszentrum (AWP)', tipo: 'Prensa', fecha: '2026-07-23', url: 'https://www.vermoegenszentrum.ch/en/stock-exchange-and-markets/news/kuehnenagel-q2-fy26-earnings-rise-10-chf-276-million-net-turnover' },
  { id: 23, titulo: 'Kuehne+Nagel Annual Report 2025 (tabla de datos de la acción: máximos y mínimos 2019-2025, BPA 7,43, dividendo 6,00)', editor: 'Kuehne + Nagel International AG', tipo: 'Primaria', fecha: '2026-03', url: 'https://www.at.no/files/2026/03/09/kn_2025_annualreport.pdf' },
];

// Cuenta publicada. coste_ventas = gastos netos de servicios de terceros (ingresos − margen bruto); gastos_generales = margen bruto − EBITDA
// (personal y otros gastos de explotación). 2021-2023: sin resultado financiero ni impuestos accesibles (null).
const fila = (periodo, ingresos, mb, ebitda, ebit, extra) => ({
  periodo, ingresos, coste_ventas: ingresos - mb, gastos_generales: mb - ebitda, ebitda, amortizaciones: ebitda - ebit, ebit,
  resultado_financiero: null, bai: null, impuestos: null, minoritarios: null, beneficio_neto: null, gastos_financieros: null,
  participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: null, dpa: null, dpa_extraordinario: 0, acciones_diluidas: null, ...extra,
});
const cuenta = [
  fila('2021', 32801, 9896, 3679, 2946, { minoritarios: 123, beneficio_neto: 2032, bpa: 16.92, dpa: 10.0, acciones_diluidas: 120.1 }),
  fila('2022', 39398, 11109, 4532, 3763, { beneficio_neto: 2654, bpa: 22.15, dpa: 14.0, acciones_diluidas: 119.8 }),
  fila('2023', 23849, 8787, 2678, 1903, { beneficio_neto: 1435, bpa: 12.06, dpa: 10.0, acciones_diluidas: 119.0 }),
  fila('2024', 24802, 8670, 2478, 1654, { resultado_financiero: -16, bai: 1638, impuestos: 408, minoritarios: 49, beneficio_neto: 1181, gastos_financieros: 46, no_recurrentes_en_ebitda: 17, bpa: 9.97, dpa: 8.25, acciones_diluidas: 118.5 }),
  fila('2025', 24476, 8800, 2151, 1242, { resultado_financiero: -12, bai: 1230, impuestos: 305, minoritarios: 43, beneficio_neto: 882, gastos_financieros: 50, no_recurrentes_en_ebitda: 138, bpa: 7.43, dpa: 6.0, acciones_diluidas: 118.7 }),
];

const A = {
  _estado: 'Completo con lo que permite la búsqueda web (sin acceso a los PDF). Cuenta de fuentes primarias citadas en resultados de búsqueda; balance y flujos de Stock Analysis.',
  negocio: {
    descripcion: 'Kuehne+Nagel es el mayor transitario del mundo en transporte marítimo y aéreo: organiza el transporte de mercancías de sus clientes comprando capacidad a navieras y aerolíneas, sin flota propia, y añade aduanas, transporte por carretera y logística de almacén [23]. En 2025 movió 4,33 millones de TEU por mar y 2,24 millones de toneladas por aire [23]. Tiene cuatro unidades: Sea Logistics, Air Logistics, Road Logistics y Contract Logistics [1]. En 2025 compró el 51 % de IMC Logistics, transportista de contenedores entre puertos y terminales en EE. UU. (49 instalaciones, unos 2 M de TEU al año) [19].',
    como_gana_dinero: 'Gana el diferencial entre lo que cobra al cliente y lo que paga al transportista: el margen bruto (8.800 M CHF en 2025, el 36 % de los ingresos netos) [2]. Lo que importa es el margen bruto por TEU o por tonelada (483 CHF por TEU y 776 CHF por tonelada en 2025) y la «conversión» (EBIT sobre margen bruto), que cayó del 34 % de 2022 al 14 % de 2025 [23, 2]. El coste principal es el personal; el negocio necesita poco capital (capex de 232 M en 2025, el 0,9 % de los ingresos) [10]. Con fletes altos los ingresos suben, pero el margen porcentual se diluye; el beneficio depende del volumen, del margen unitario y de la productividad.',
    segmentos: [],
    geografias: [], geografias_criterio: null,
    clientes: 'Clientes industriales, de consumo, tecnología, sanidad y comercio electrónico, sin concentración publicada en las fuentes accesibles. En septiembre de 2026 firmó con Amazon una colaboración de hasta siete años que incluye la logística de infraestructura de AWS (construcción, mantenimiento y ampliación de centros de datos) [11]. El poder de precios es limitado: en 2025 la conversión de Sea Logistics cayó del 41,1 % al 25,8 % por la presión de tarifas, y el margen bruto por TEU bajó [23]. El programa de ahorro de más de 200 M CHF lanzado en el 4T25 sostiene el margen en 2026 [14].',
    kpis: [
      { kpi: 'Volumen marítimo (TEU)', valor_anterior: 'n. d.', valor_actual: '4,33 M (2025)', variacion: null, comentario: 'N.º 1 mundial [23].' },
      { kpi: 'Volumen aéreo (t)', valor_anterior: 'n. d.', valor_actual: '2,24 M (2025)', variacion: null, comentario: '776 CHF de margen bruto por tonelada [23].' },
      { kpi: 'Conversión del grupo (EBIT/margen bruto)', valor_anterior: '19 % (2024)', valor_actual: '14 % (2025, 16 % recurrente)', variacion: '−5 pp', comentario: '16 % en el 1T26 [1, 14].' },
      { kpi: 'EBIT recurrente por unidad (2025)', valor_anterior: 'n. d.', valor_actual: 'Sea 585 M · Air 454 M · Road 86 M · Contract 255 M', variacion: null, comentario: 'Sea y Air, el 75 % del EBIT recurrente de 1.380 M [1].' },
      { kpi: 'EBIT recurrente', valor_anterior: '1.671 M (2024)', valor_actual: '1.380 M (2025)', variacion: '−17 %', comentario: 'Guía 2026: 1.350-1.550 M [1, 11].' },
    ],
    confianza: 'Media',
  },
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 24176, ebitda: 2141, ebit: 1221, beneficio_neto: 850, bpa: 7.17, dpa: 6.0, dpa_extraordinario: 0, fcf: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 100 },
    cambios_perimetro: [{ periodo: '2025', descripcion: 'IMC Logistics (51 %), consolidada desde el 1T25: drayage en EE. UU., unos 800 M USD de ingresos en 2023 [19].' }],
    comentario: 'Los ingresos netos siguen al ciclo de fletes: 20.382 M CHF en 2020, 32.801 M en 2021 y un máximo de 39.398 M en 2022, para volver a 23.849 M en 2023, 24.802 M en 2024 y 24.476 M en 2025 [7, 6, 21, 5, 2]. El EBIT hizo lo mismo con más amplitud: 1.070 M en 2020, 2.946 M en 2021, 3.763 M en 2022 y de nuevo 1.242 M en 2025 (1.380 M recurrente) [7, 6, 1]. El margen bruto aguanta mejor (8.800 M en 2025, más que en 2023) que la conversión, que cayó al 14 %: la caída de 2025 viene de Sea Logistics, donde el margen por TEU bajó y la conversión pasó del 41,1 % al 25,8 % [23]. En 2026 el primer semestre cerró con ingresos de 12.200 M (−2 %) y EBIT recurrente de 689 M (−3 %), pero el 2T creció: ingresos +8 % y EBIT +11 % (+17 % sin divisa) [11, 12].',
    ajustes: 'Usamos el EBIT y el beneficio publicados. La empresa da además un EBIT «recurrente» que excluye los costes del programa de ahorro: 1.380 M frente a 1.242 M en 2025 (138 M de costes, sobre todo en el 4T25: 335 M recurrente frente a 213 M publicado) y 1.671 M frente a 1.654 M en 2024 [1, 16]; los ponemos en no_recurrentes_en_ebitda. En el 1T26 hubo una plusvalía de 35 M por venta con arrendamiento posterior, que la empresa excluye del recurrente [12]. El beneficio atribuido de 2022 y 2023 es el BPA básico por las acciones medias estimadas (estimación propia; el beneficio total fue de 2.810 M y 1.464 M) [5, 6, 21]. El LTM a junio de 2026 se deriva de los semestres (ingresos 24.476 − 12.500 + 12.200; EBIT 1.242 − 745 + 724), estimación propia [1, 11, 15].',
    confianza: 'Media',
  },
  trimestres: {
    items: [
      { periodo: '4T25', ingresos: 5950, crecimiento_pct: -12.0, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: null },
      { periodo: '1T26', ingresos: 5600, crecimiento_pct: -11.1, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: 'Superior' },
      { periodo: '2T26', ingresos: 6600, crecimiento_pct: 8.0, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: 'Superior' },
      { periodo: '1S26', ingresos: 12200, crecimiento_pct: -2.0, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 4.10, vs_consenso: null },
    ],
    ultima_presentacion: 'En el 2T26 (23-jul-2026) la dirección subió la guía de EBIT recurrente de 2026 a 1.350-1.550 M CHF desde 1.200-1.400 M, con rendimientos estables o mejores en mar y aire, volumen positivo en el 3T y el 4T y un efecto divisa de hasta −5 % [11, 13]. Air Logistics fue la estrella: ingresos +20 % y EBIT +35 % en el trimestre, con la demanda de centros de datos [13]. En el 1T26 (24-abr) el discurso era de ahorro: el programa de octubre de 2025 sostuvo el EBIT (343 M frente a 402 M) y la guía era de 1.250-1.400 M [14, 15]. Según la prensa suiza, el EBIT del 2T batió el consenso en torno a un 8 %. Lo que no concreta la dirección: cuánto del alza del aire depende de clientes concretos (hiperescaladores) y la normalización de fletes cuando Oriente Medio se calme.',
    confianza: 'Media',
  },
  balance: {
    historico: [
      { periodo: '2021', activo_total: 14650, activo_corriente: 9681, pasivo_corriente: null, pasivo_total: 11439, fondo_comercio: null, intangibles: null, inmovilizado_material: null, existencias: 0, clientes: 6537, proveedores: null, activos_contrato: null, pasivos_contrato: null, caja: 2305, deuda_financiera: 0, arrendamientos: 1889, patrimonio_neto: 3204, minoritarios: 7, reservas: null },
      { periodo: '2022', activo_total: 14751, activo_corriente: 9958, pasivo_corriente: null, pasivo_total: 10604, fondo_comercio: null, intangibles: null, inmovilizado_material: null, existencias: 0, clientes: 5528, proveedores: null, activos_contrato: null, pasivos_contrato: null, caja: 3778, deuda_financiera: 0, arrendamientos: 1700, patrimonio_neto: 4140, minoritarios: 7, reservas: null },
      { periodo: '2023', activo_total: 10970, activo_corriente: null, pasivo_corriente: null, pasivo_total: 7811, fondo_comercio: null, intangibles: null, inmovilizado_material: null, existencias: 0, clientes: null, proveedores: null, activos_contrato: null, pasivos_contrato: null, caja: 2011, deuda_financiera: 0, arrendamientos: 1818, patrimonio_neto: 3159, minoritarios: null, reservas: null },
      { periodo: '2024', activo_total: 11725, activo_corriente: null, pasivo_corriente: null, pasivo_total: 8460, fondo_comercio: null, intangibles: null, inmovilizado_material: null, existencias: 0, clientes: null, proveedores: null, activos_contrato: null, pasivos_contrato: null, caja: 1152, deuda_financiera: 346, arrendamientos: 2000, patrimonio_neto: 3265, minoritarios: null, reservas: null },
      { periodo: '2025', activo_total: 11927, activo_corriente: null, pasivo_corriente: null, pasivo_total: 9715, fondo_comercio: null, intangibles: null, inmovilizado_material: null, existencias: 0, clientes: null, proveedores: null, activos_contrato: null, pasivos_contrato: null, caja: 750, deuda_financiera: 1757, arrendamientos: 2200, patrimonio_neto: 2212, minoritarios: null, reservas: null },
    ],
    vencimientos: [
      { anio: '2028', importe: 200 }, { anio: '2029', importe: 170 }, { anio: '2031', importe: 200 }, { anio: '2032', importe: 230 },
    ],
    liquidez: 'Caja de 617 M CHF a 30-jun-2026, con deuda financiera de 1.800 M (925 M a corto plazo) y arrendamientos de 2.284 M [9]. En julio de 2026 colocó 400 M en bonos a 2029 y 2032 para devolver deuda y líneas de crédito [18].',
    rating: 'A-/A/A- según la emisión de bonos de 2026 (agencias no detalladas en la fuente) [18].',
    coste_deuda_pct: 1.0,
    vida_media_anios: null,
    otros_pasivos: 'Los arrendamientos (2.284 M a junio de 2026: almacenes y oficinas) son el mayor pasivo financiero [9]. La compra del 51 % de IMC Logistics deja un 49 % en manos de terceros; no hemos podido leer si hay opciones de venta de esos minoritarios ni su valor [19]. Amazon tiene una opción de compra sobre acciones existentes de Kuehne+Nagel, liquidable en efectivo o, a elección de Amazon, en acciones, que se consolida por hitos comerciales en hasta siete años y que cubre una entidad financiera; ni el número de acciones ni el precio de ejercicio se han publicado en las fuentes accesibles [11]. No hemos leído las notas de pensiones, provisiones y litigios.',
    comentario: 'Kuehne+Nagel ha pasado de caja neta a deuda neta. La caja cayó de 3.778 M en 2022 a 750 M en 2025 y 617 M en junio de 2026 porque pagó más de lo que generó: dividendos de 1.186 M, 1.661 M, 1.182 M y 979 M en 2022-2025 y recompras de 646 M y 716 M en 2022-2023 [10, 9]. La deuda total (con arrendamientos) subió de 1.700 M en 2022 a 3.957 M en 2025, con 400 M de bonos en 2025 y otros 400 M en 2026 [9, 17, 18]. El patrimonio neto bajó de 4.140 M a 2.212 M. La deuda neta con arrendamientos, unos 3.467 M en junio de 2026, equivale a 1,6 veces el EBITDA de los últimos 12 meses: holgada, pero ya no es la caja neta histórica. El reparto entre deuda financiera y arrendamientos de 2021-2025 es estimación propia (Stock Analysis solo da la deuda total).',
    confianza: 'Baja',
  },
  flujos: {
    historico: [
      { periodo: '2021', flujo_operativo: 2462, capex: 197, pagos_arrendamientos: 472, adquisiciones: 902, desinversiones: 0, dividendos: 538, recompras: 59, emision_acciones: 0, intereses_en_financiacion: 0 },
      { periodo: '2022', flujo_operativo: 4404, capex: 239, pagos_arrendamientos: 490, adquisiciones: 0, desinversiones: 0, dividendos: 1186, recompras: 646, emision_acciones: 0, intereses_en_financiacion: 0 },
      { periodo: '2023', flujo_operativo: 1699, capex: 306, pagos_arrendamientos: 520, adquisiciones: 0, desinversiones: 0, dividendos: 1661, recompras: 716, emision_acciones: 0, intereses_en_financiacion: 0 },
      { periodo: '2024', flujo_operativo: 1484, capex: 300, pagos_arrendamientos: 541, adquisiciones: 0, desinversiones: 0, dividendos: 1182, recompras: 51, emision_acciones: 0, intereses_en_financiacion: 0 },
      { periodo: '2025', flujo_operativo: 1781, capex: 232, pagos_arrendamientos: 632, adquisiciones: 559, desinversiones: 0, dividendos: 979, recompras: 20, emision_acciones: 0, intereses_en_financiacion: 0 },
    ],
    comentario: 'La caja libre de la empresa (flujo operativo − capex − arrendamientos) fue de 917 M en 2025 y 643 M en 2024 [1, 20]; con el flujo operativo y el capex de Stock Analysis, los pagos de arrendamientos implícitos son de unos 632 M y 541 M (estimación propia; 2022 y 2023 interpolados) [10]. El capex es muy bajo (0,9-1,3 % de los ingresos) [10]: lo que pesa es el alquiler de almacenes y oficinas. El flujo de 2022 (4.404 M) estuvo inflado por la devolución de circulante al bajar los fletes, y el de 2023-2024 se resintió [10]. Desde 2023 los dividendos superan la caja libre: 1.661 M pagados en 2023 y 1.182 M en 2024 frente a 643 M de caja libre en 2024; la diferencia salió de la caja y de deuda nueva [10, 20].',
    confianza: 'Media',
  },
  calidad: {
    auditor: null, anios_auditor: null, opinion: null,
    comentario: 'No hemos podido leer el informe de auditoría. Las cuentas son sencillas: casi sin existencias, sin I+D capitalizada y con poco fondo de comercio salvo Apex (2021) e IMC (2025) [7, 19]. Lo que más distorsiona es el ciclo: en 2021-2022 el beneficio se triplicó por los fletes de la pandemia y luego volvió. Los costes de reestructuración del programa de ahorro (138 M en 2025) se presentan fuera del EBIT recurrente; por ahora es un programa con fecha (finales de 2026) y no un patrón anual [1]. La caja libre de 2025 (917 M) superó al beneficio atribuido (882 M), pero con el circulante a favor [1].',
    senales: [
      { senal: 'Resultado «recurrente» por encima del publicado', nivel: 'Baja', comentario: 'Diferencia de 138 M en 2025 por el programa de ahorro; de 17 M en 2024 [1].' },
      { senal: 'Dividendo por encima de la caja libre', nivel: 'Media', comentario: 'Pagos de 1.661 M (2023) y 1.182 M (2024) frente a una caja libre de 643 M en 2024 [10, 20].' },
    ],
    confianza: 'Baja',
  },
  capital: {
    politica: 'La empresa reparte la mayor parte del beneficio: dividendo de 6,00 CHF por acción por 2025 (8,25 por 2024, 10,00 por 2023 y 14,00 por 2022), un pago del 81 % del BPA de 2025 [23, 20]. Recompró 646 M en 2022 y 716 M en 2023 y casi nada desde 2024 [10]. Con la caja ya consumida, el dividendo se financia en parte con deuda (bonos de 400 M en 2025 y 2026) [17, 18].',
    adquisiciones: [
      { anio: '2021', objetivo: 'Apex International (transitario aéreo asiático, 75 % inicial)', importe: null, ev_ebitda: null, financiacion: 'Caja y acciones', resultado: 'Dio escala en el aéreo transpacífico justo en el máximo de fletes; adquisiciones pagadas de 902 M en 2021 [10].' },
      { anio: '2025', objetivo: 'IMC Logistics (51 %), drayage en EE. UU.', importe: null, ev_ebitda: null, financiacion: 'Caja', resultado: 'Precio no publicado (la prensa lo estimó en hasta 400 M USD en el mejor caso para el vendedor); adquisiciones pagadas de 559 M en 2025. Débil en 2025 por la menor importación en EE. UU. [19, 10].' },
    ],
    comentario: 'La asignación de capital ha sido de devolver caja: 6.300 M en dividendos y 1.500 M en recompras entre 2021 y 2025, casi todo el beneficio del ciclo [10]. Es razonable para un negocio que apenas necesita inversión, pero el dividendo se fijó con el beneficio del pico y obligó a endeudarse en 2025-2026. Las dos compras (Apex en el máximo del aéreo, IMC antes de los aranceles de EE. UU.) se hicieron en malos momentos del ciclo. La recompra del dividendo a 6,00 CHF lo deja más cerca de la caja libre.',
    confianza: 'Media',
  },
  fuentes: fA,
  huecos: [
    { seccion: 'financieros', campo: 'resultado financiero, impuestos y minoritarios 2021-2023', tipo: 'Núcleo', intentos: '1) Informes anuales 2021-2023 (PDF no accesibles: solo búsqueda web); 2) Stock Analysis y TipRanks (cifras sin etiqueta de año); 3) derivación del beneficio total y el BPA', decision: 'Omitido' },
    { seccion: 'negocio', campo: 'ingresos por segmento y geografías', tipo: 'Núcleo', intentos: '1) Informe anual 2025 (no accesible); 2) presentación del 4T25 (solo EBIT recurrente por unidad en la búsqueda); 3) notas de prensa trimestrales (solo 1T26 de mar y aire)', decision: 'Omitido' },
    { seccion: 'balance', campo: 'proveedores, pasivo corriente, fondo de comercio y reparto deuda/arrendamientos 2021-2025', tipo: 'Núcleo', intentos: '1) Balance del informe anual 2025 (extracto cortado); 2) Stock Analysis (solo totales); 3) arrendamientos de junio de 2026 aplicados hacia atrás', decision: 'Calculado y marcado como estimación' },
    { seccion: 'calidad', campo: 'auditor y opinión', tipo: 'Complemento', intentos: '1) Informe anual 2025 (no accesible); 2) informe de gobierno; 3) prensa', decision: 'Omitido' },
  ],
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia (reutiliza el análisis de DSV del 7-oct)
const dB = JSON.parse(fs.readFileSync(path.join(raiz, 'informes', 'dsv-2026-10-07', 'notas', 'B.json'), 'utf8'));
const sector = JSON.parse(JSON.stringify(dB.sector));
sector.definicion = 'El mercado relevante es el transitario mundial (organización del transporte aéreo y marítimo internacional, con aduanas y servicios asociados), que es la mayor parte del beneficio de Kuehne+Nagel: Sea y Air Logistics dieron 1.039 M de los 1.380 M de EBIT recurrente de 2025 [5]. Se mide por los ingresos netos de los transitarios (Transport Intelligence: 208.100 M EUR en 2025) y por volumen: 25,2 millones de toneladas aéreas y 69,0 millones de TEU marítimos controlados por transitarios [12, 13]. Quedan fuera la carretera y la logística por contrato, donde Kuehne+Nagel también compite. Sector y fuentes tomados del análisis de DSV del 7-oct-2026.';
const dsvRow = { nombre: 'DSV', pais: 'Dinamarca', ticker: 'DSV.CO', ingresos: Math.round(247331 / DKK_CHF), cuota_pct: 6, margen_ebit_pct: 7.9, comentario: 'N.º 1 mundial tras comprar Schenker en 2025: ingresos de 247.331 M DKK y margen EBIT del 7,9 % en 2025; conversión de Air & Sea del 40,2 % frente al 25,8 % de Kuehne+Nagel en mar [1, 5]. Convertido a CHF a 8,03 DKK/CHF.' };
const competidores = [dsvRow, ...dB.competencia.competidores.filter((c) => !/Kuehne/.test(c.nombre)).map((c) => ({ ...c, ingresos: Math.round(c.ingresos / DKK_CHF) }))];
const B = {
  _estado: 'Sector, competidores y fuentes del análisis de DSV del 7-oct-2026 (mismo mercado); ingresos de los competidores pasados a CHF.',
  historia: {
    resumen: 'Kuehne+Nagel nace en Bremen en 1890 como transitario de August Kühne y Friedrich Nagel. La familia Kühne compró la parte de Nagel y la empresa se trasladó a Suiza (Schindellegi). Klaus-Michael Kühne fue consejero delegado desde 1975 y presidente de 1992 a 2011; convirtió un transitario mediano en el n.º 1 mundial en mar y aire con crecimiento orgánico y compras (USCO en 2001, ACR en 2001, Apex en 2021, IMC en 2025). Murió el 24-ago-2026; su participación de control (en torno al 53-55 % a través de Kühne Holding) queda en la Fundación Kühne [3]. Desde 2022 el consejero delegado es Stefan Paul.',
    hitos: [
      { anio: '1890', hito: 'Fundación en Bremen por August Kühne y Friedrich Nagel.' },
      { anio: '1975', hito: 'Klaus-Michael Kühne, consejero delegado.' },
      { anio: '1994', hito: 'Salida a bolsa (SIX).' },
      { anio: '2021', hito: 'Compra de Apex International; máximo de fletes de la pandemia.' },
      { anio: '2022', hito: 'Récord de EBIT (3.763 M CHF); Stefan Paul, consejero delegado.' },
      { anio: '2025', hito: 'Compra del 51 % de IMC Logistics; programa de ahorro de más de 200 M CHF.' },
      { anio: '2026', hito: 'Colaboración de hasta siete años con Amazon (AWS) y muerte de Klaus-Michael Kühne (24-ago).' },
    ],
    confianza: 'Media',
  },
  sector: { ...sector, confianza: 'Media' },
  competencia: {
    cuota_pct: 4,
    posicion: 'N.º 3 del transitario mundial por ingresos netos (~4 % según la estimación de DSV, detrás de DSV con Schenker, ~6 %, y DHL, ~5 %) [1]; n.º 1 por volumen marítimo (4,33 M TEU, ≈6 % de los 69,0 M controlados por transitarios) y entre los dos primeros en aéreo (2,24 M t, ≈9 % de 25,2 M t) (estimación propia con [5, 13]).',
    competidores,
    foso: {
      veredicto: 'Estrecho', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 2, evidencia: 'Red propia en más de 100 países y la mayor cartera de carga marítima: la densidad abarata la consolidación, pero el cliente reparte su carga entre varios transitarios [1, 5].' },
        { fuente: 'Costes de cambio', puntuacion: 1, evidencia: 'Los grandes cargadores licitan y reparten la carga entre proveedores [7]; algo más altos en logística por contrato y en integraciones como la de AWS.' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 1, evidencia: 'Sin patentes ni licencias que excluyan; marca reconocida en el sector [7, 8].' },
        { fuente: 'Ventaja en costes', puntuacion: 2, evidencia: 'Margen EBIT del 5,1 % en 2025 frente al 7,9 % de DSV y el 9,5 % de Expeditors: la escala no se ha traducido en el coste más bajo [1, 5, 7].' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'N.º 1 en mar, gran comprador de capacidad: ROIC del 16 % con poco capital, aunque el mercado sigue fragmentado (top 20 ~40 %) [1].' },
      ],
    },
    amenazas: 'Primero, la normalización de fletes cuando se reabra la ruta de Oriente Medio: en 2025 la conversión del mar cayó del 41 % al 26 % [5, 14]. Segundo, DSV con Schenker, que gana escala de compra y presiona precios mientras integra [1]. Tercero, la integración vertical de las navieras (puerta a puerta) [1]. Cuarto, la demanda aérea ligada a los hiperescaladores, que hoy impulsa a Kuehne+Nagel y puede girar con el ciclo de inversión en centros de datos [15].',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Lo material son las emisiones de alcance 3 del transporte subcontratado (casi todo el inventario de un transitario sin flota) y la demanda de clientes de combustible sostenible de aviación y transporte marítimo bajo en carbono, que el transitario cobra como servicio; y el capital humano (más de 70.000 empleados, el personal es su mayor coste) [1, 5].',
    controversias: 'No hemos encontrado sanciones relevantes en tres años en las fuentes accesibles.',
    confianza: 'Baja',
  },
  fuentes: dB.fuentes,
  huecos: [
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) Informe de sostenibilidad (no accesible); 2) búsqueda de MSCI y Sustainalytics; 3) prensa', decision: 'Omitido' },
  ],
};
B.historia.resumen = B.historia.resumen.replace(' [3]', '');
guarda('B', B);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'German billionaire Klaus-Michael Kuehne dies at age 89', editor: 'The Star (Bloomberg)', tipo: 'Prensa', fecha: '2026-08-24', url: 'https://www.thestar.com.my/news/world/2026/08/24/german-billionaire-klaus-michael-kuehne-dies-at-age-89' },
  { id: 2, titulo: 'K+N honorary chairman Klaus-Michael Kühne dies at 89 (declaraciones de J. Wolle y S. Paul)', editor: 'STAT Times', tipo: 'Prensa', fecha: '2026-08-24', url: 'https://www.stattimes.com/logistics/kn-honorary-chairman-klaus-michael-khne-dies-at-sw89-1360406' },
  { id: 3, titulo: 'With no heirs, Kuehne’s foundation gets $49 billion fortune', editor: 'swissinfo.ch', tipo: 'Prensa', fecha: '2026-08', url: 'https://www.swissinfo.ch/eng/with-no-heirs%2c-kuehnes-foundation-gets-%2449-billion-fortune/91956375' },
  { id: 4, titulo: 'Kuehne+Nagel: Amazon s’offre une option sur des actions (derechos de voto de la Fundación Kühne)', editor: 'La Télé (AWP)', tipo: 'Prensa', fecha: '2026-09-21', url: 'https://latele.ch/articles/kuehne-nagel-amazon-s-offre-une-option-sur-des-actions' },
  { id: 5, titulo: 'Generalversammlung 2026 der Kühne+Nagel International AG (resultados de la junta del 6-may-2026)', editor: 'Marktpuls (AWP)', tipo: 'Prensa', fecha: '2026-05-06', url: 'https://www.marktpuls.ch/artikel/permalink/665666' },
  { id: 6, titulo: 'Invitation to the Annual General Meeting 2026', editor: 'Kuehne + Nagel International AG', tipo: 'Primaria', fecha: '2026-04', url: 'https://assets.kuehne-nagel.com/f/331466/x/4b3a6bd525/company-corporate-governance-invitation-agm-2026.pdf' },
  { id: 7, titulo: 'Kuehne+Nagel signs long-term strategic collaboration with Amazon', editor: 'RTTNews', tipo: 'Prensa', fecha: '2026-09-21', url: 'https://www.rttnews.com/3692437/kuehne-nagel-signs-long-term-strategic-collaboration-with-amazon.aspx' },
  { id: 8, titulo: 'Ad hoc announcement: Kuehne+Nagel full year 2025 results (guía 2026)', editor: 'Kuehne + Nagel International AG', tipo: 'Primaria', fecha: '2026-03-03', url: 'https://assets.kuehne-nagel.com/f/331466/x/13f45a8e88/adhoc-kuehnenagel-fy-2025-english.pdf' },
  { id: 9, titulo: 'Ad hoc announcement: Kuehne+Nagel Q2 2026 results (guía 2026 elevada)', editor: 'Kuehne + Nagel International AG', tipo: 'Primaria', fecha: '2026-07-23', url: 'https://assets.kuehne-nagel.com/f/331466/x/34ede41ff0/ad-hoc-kuehne-nagel-q2-2026-english.pdf' },
  { id: 10, titulo: 'K+N drops in Julius Baer trade on Q3 EBIT miss, guidance cut (2024)', editor: 'Stockopedia (Reuters)', tipo: 'Prensa', fecha: '2024-10', url: 'https://www.stockopedia.com/share-prices/julius-baer-gruppe-ag-SWX:BAER/news/k-n-drops-in-julius-baer-trade-on-q3-ebit-miss-guidance-cut-019e69ef-3807-7d56-acfd-e9c8800b1477/' },
  { id: 11, titulo: 'Kuehne + Nagel valuation insights as profit outlook softens (rebaja de la guía de 2025)', editor: 'Simply Wall St', tipo: 'Prensa', fecha: '2025-10', url: 'https://simplywall.st/stocks/ch/transportation/vtx-knin/kuehne-nagel-international-shares/news/kuehne-nagel-swxknin-valuation-insights-as-profit-outlook-so' },
  { id: 12, titulo: 'Ad hoc announcement: Kuehne+Nagel Q1 2026 results (guía 1.250-1.400 M)', editor: 'Kuehne + Nagel International AG', tipo: 'Primaria', fecha: '2026-04-24', url: 'https://assets.kuehne-nagel.com/f/331466/x/c708d82964/adhoc-kuehnenagel-q1-2026-english.pdf' },
];
const C = {
  _estado: 'Parcial: sin acceso al informe de gobierno ni al de remuneraciones; la SIX publica operaciones de directivos de forma anónima.',
  directivos: {
    equipo: [
      { nombre: 'Stefan Paul', cargo: 'Consejero delegado', desde: '2022', participacion_pct: null, trayectoria: 'Antes dirigió la carretera del grupo. Bajo su mandato el EBIT pasó del récord de 3.763 M (2022) a 1.242 M (2025) con la normalización de fletes; lanzó el programa de ahorro de más de 200 M y cerró la colaboración con Amazon [8, 7].' },
      { nombre: 'Jörg Wolle', cargo: 'Presidente del consejo', desde: null, participacion_pct: null, trayectoria: 'Reelegido presidente por un año en la junta de mayo de 2026 [5, 2].' },
    ],
    historial_guidance: [
      { anio: '2024', guia: 'EBIT de unos 1.300 M (rebajada tras el 3T24) [10]', real: 'EBIT de 1.654 M (1.671 M recurrente)', cumplida: 'Sí' },
      { anio: '2025', guia: 'Rebajada en el 3T25 [11]', real: 'EBIT recurrente de 1.380 M (1.242 M publicado)', cumplida: 'Parcial' },
      { anio: '2026', guia: 'EBIT recurrente de 1.200-1.400 M (marzo), 1.250-1.400 M (abril), 1.350-1.550 M (julio) [8, 12, 9]', real: 'EBIT recurrente de 689 M en el 1S26', cumplida: 'Parcial' },
    ],
    comentario: 'La dirección ha cambiado la guía cada trimestre, al alza y a la baja, como el mercado de fletes: es una guía a corto plazo, no un plan. El consejero delegado lleva cuatro años; el gran cambio es la muerte del accionista de control, Klaus-Michael Kühne, en agosto de 2026: su participación pasa a la Fundación Kühne según un plan de sucesión anunciado hace años [1, 3]. No hemos podido verificar el resto del comité de dirección.',
    confianza: 'Baja',
  },
  gobierno: {
    consejo: [
      { nombre: 'Jörg Wolle', cargo: 'Presidente', tipo: 'Otro externo', desde: null, comisiones: null },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: null, una_accion_un_voto: null,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: null, auditoria_independiente: null, insiders_sin_operaciones: false,
    accionista_control: true, presidente_vinculado_control: null, cambios_cupula_24m: 0,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: null,
    remuneracion: 'La junta del 6-may-2026, con el 77,37 % del capital representado, aprobó todas las propuestas del consejo por amplia mayoría, incluidos los importes de remuneración [5, 6]. No hemos podido leer los porcentajes de voto ni las métricas del variable.',
    accionistas: [
      { nombre: 'Kühne Holding AG (ahora Fundación Kühne)', pct: 53, tipo: 'Control', variacion: 'Los derechos de voto pasan a la Fundación Kühne tras la muerte de K.-M. Kühne (24-ago-2026); la prensa da entre el 53 % y el 60 % [1, 4].' },
    ],
    insiders: [],
    control_y_defensas: 'Kühne Holding controla la junta con más de la mitad del capital; con la muerte de Klaus-Michael Kühne los derechos de voto pasan a la Fundación Kühne, sin herederos [1, 3, 4]. Es un control estable que hace imposible una opa hostil y que ha sostenido una política de dividendo alto. La colaboración con Amazon da a Amazon una opción sobre acciones existentes (no nuevas), cubierta por un banco; su tamaño no se ha publicado [7].',
    alertas: ['Muerte del accionista de control (24-ago-2026): cambio de titular del control a la Fundación Kühne [1].', 'Opción de Amazon sobre acciones de Kuehne+Nagel de tamaño no publicado [7].'],
    confianza: 'Baja',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'composición del consejo, comisiones, votos de remuneración y remuneración del consejero delegado', tipo: 'Núcleo', intentos: '1) Informe de gobierno y de remuneraciones 2025 (no accesibles); 2) acta de la junta de 2026 (solo el resumen); 3) prensa', decision: 'Omitido' },
    { seccion: 'gobierno', campo: 'operaciones de directivos', tipo: 'Complemento', intentos: '1) SIX (anónimas, sin red); 2) búsqueda web; 3) prensa', decision: 'Omitido' },
    { seccion: 'directivos', campo: 'director financiero y comité de dirección', tipo: 'Complemento', intentos: '1) Informe anual 2025 (no accesible); 2) búsqueda web; 3) presentaciones de resultados', decision: 'Omitido' },
  ],
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const dD = JSON.parse(fs.readFileSync(path.join(raiz, 'informes', 'dsv-2026-10-07', 'notas', 'D.json'), 'utf8'));
const fD = [
  { id: 1, titulo: 'Kuehne und Nagel International AG: cotización en tiempo real (230,05 CHF en Cboe Europe, 13-oct-2026)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-13', url: 'https://www.marketscreener.com/quote/stock/KUEHNE-UND-NAGEL-INTERNAT-178766/' },
  { id: 2, titulo: 'KNIN-CH: Kuehne + Nagel International AG quote (228,50 CHF el 9-oct-2026; cierre anterior 224,30)', editor: 'CNBC', tipo: 'Datos de mercado', fecha: '2026-10-09', url: 'https://www.cnbc.com/quotes/KNIN-CH' },
  { id: 3, titulo: 'Kuehne & Nagel (KNIN): cotización, rango de 52 semanas 147,05-232,80 y objetivo medio 204,78 CHF', editor: 'Investing.com', tipo: 'Datos de mercado', fecha: '2026-10-07', url: 'https://uk.investing.com/equities/kuehne---nagel' },
  { id: 4, titulo: 'Kühne + Nagel: market cap history (capitalización de fin de año en USD, 2019-2025)', editor: 'CompaniesMarketCap', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://companiesmarketcap.com/kuhne-nagel/marketcap/' },
  { id: 5, titulo: 'Kuehne+Nagel Annual Report 2025 (máximos y mínimos anuales en la SIX 2019-2025; BPA 7,43)', editor: 'Kuehne + Nagel International AG', tipo: 'Primaria', fecha: '2026-03', url: 'https://www.at.no/files/2026/03/09/kn_2025_annualreport.pdf' },
  { id: 6, titulo: 'Consensus data and share price (mediana del último sondeo: ingresos, margen bruto, EBIT y BAI 2026-2027)', editor: 'Kuehne + Nagel International AG', tipo: 'Primaria', fecha: '2026-10', url: 'https://www.kuehne-nagel.com/company/investor-relations/consensus-data-and-share-price' },
  { id: 7, titulo: 'Kuehne+Nagel: BPA de consenso de 2026 de 8,63 CHF tras el 1S26 (15 analistas)', editor: 'Webull (Simply Wall St)', tipo: 'Datos de mercado', fecha: '2026-07', url: 'https://www.webull.com/news/15299353082733568' },
  { id: 8, titulo: 'Kuehne Nagel International: Kursziel (26 analistas: 4 comprar, 10 mantener, 12 vender; objetivo medio 186,66 CHF)', editor: 'aktien.guide', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://aktien.guide/kursziel/Kuehne-Nagel-International-CH0025238863' },
  { id: 9, titulo: 'Kühne+Nagel-Aktie erholt sich: Jefferies hebt auf «Buy», Kursziel 220 Franken', editor: 'Bilanz', tipo: 'Analistas', fecha: '2026', url: 'https://www.bilanz.ch/invest/aktien/kuehnenagel-aktie-erholt-sich-kursziel-bei-220-franken/qqm1flj' },
  { id: 10, titulo: 'Kuehne+Nagel signs long-term strategic collaboration with Amazon (acción +3 % hasta 228,40 CHF, máximo de 52 semanas)', editor: 'Vermögenszentrum (AWP)', tipo: 'Prensa', fecha: '2026-09-21', url: 'https://www.vermoegenszentrum.ch/en/stock-exchange-and-markets/news/kuehnenagel-signs-long-term-strategic-collaboration-amazon' },
  { id: 11, titulo: 'Comparables de transporte y logística a 7-oct-2026 (MarketScreener; capitalización en DKK) y ROIC de Stock Analysis, del análisis de DSV del repositorio', editor: 'MarketScreener / Stock Analysis (análisis de DSV del 7-oct-2026)', tipo: 'Datos de mercado', fecha: '2026-10-07', url: 'https://www.marketscreener.com/quote/stock/KUEHNE-UND-NAGEL-INTERNAT-178766/finances/' },
  { id: 12, titulo: 'Euro foreign exchange reference rates, 7 October 2026 (DKK 7,4745; CHF 0,9309)', editor: 'Banco Central Europeo', tipo: 'Datos de mercado', fecha: '2026-10-07', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml' },
  { id: 13, titulo: 'Company Announcement 1132: DSV to acquire Schenker (0,77x ventas, 14,0x EBIT)', editor: 'DSV A/S', tipo: 'Primaria', fecha: '2024-09-13', url: 'https://ml-eu.globenewswire.com/Resource/Download/0897f207-e5a6-40b6-89bd-576fe96433ba' },
  { id: 14, titulo: 'Bolloré Logistics sold to CMA CGM', editor: 'Logistics Business', tipo: 'Prensa', fecha: '2024-03', url: 'https://logisticsbusiness.com/transport-distribution/haulage-freight-forwarding/bollore-logistics-sold-to-cma-cgm/' },
  { id: 15, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026: 4,20 %', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 16, titulo: 'Rendimientos de obligaciones al contado: Confederación a 10 años (cubo rendeiduebd; 0,54 %, el mismo dato que los informes de Roche, Givaudan y Lonza del repositorio)', editor: 'Banco Nacional Suizo', tipo: 'Primaria', fecha: '2026-10', url: 'https://data.snb.ch/api/cube/rendeiduebd/data/csv/en' },
  { id: 17, titulo: 'Kuehne + Nagel (SWX:KNIN) Statistics (ROIC 16,3 %, deuda neta/EBITDA 1,6x)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-07', url: 'https://stockanalysis.com/quote/swx/KNIN/statistics/' },
  { id: 18, titulo: 'Schweizer Aktie der Woche: Logistikspezialist ist vielleicht schon zu hoch geflogen', editor: 'cash.ch', tipo: 'Prensa', fecha: '2026-08', url: 'https://www.cash.ch/news/top-news/schweizer-aktie-der-woche-logistikspezialist-ist-vielleicht-schon-zu-hoch-geflogen-950439' },
];
// Comparables de la nota D de DSV (7-oct, DKK) pasados a CHF; se quita Kuehne+Nagel y se añade DSV con sus múltiplos de ese día.
const comps = dD.comparables.empresas.filter((e) => !/Kuehne/.test(e.nombre)).map((e) => ({ ...e, capitalizacion: Math.round(e.capitalizacion / DKK_CHF) }));
comps.unshift({ nombre: 'DSV', ticker: 'DSV.CO', pais: 'DK', capitalizacion: Math.round(272065 / DKK_CHF), ev_ventas: 1.25, ev_ebitda_ltm: 11.2, ev_ebitda_ntm: 9.4, per_ntm: 15.8, crecimiento_pct: 3.9, margen_ebitda_pct: 11.1, roic_pct: 8.6, dn_ebitda: 2.6, fcf_yield_pct: 4.2 });
const dsvTrans = JSON.parse(fs.readFileSync(path.join(raiz, 'informes', 'dsv-2026-10-07', 'datos-v2.json'), 'utf8')).transacciones.operaciones;
const trans = dsvTrans.map((o, i) => ({ ...o, ev: Math.round(o.ev / DKK_CHF), comentario: o.comentario.replace(/\s*\[[0-9, ]+\]/g, '').replace(/ \(≈[0-9.]+ M DKK\)/, '').replace(/\s+\[/, ' [').replace('Convertido a DKK al tipo del BCE del 7-oct-2026.', '') + (i === 0 ? ' [13]' : i === 1 ? ' [14]' : ' [11]') + ' Convertido a CHF a 8,03 DKK/CHF [12].' }));
const D = {
  _estado: 'Precio de MarketScreener (13-oct, tiempo real) y CNBC (9-oct); sin bolsa.mjs ni históricos diarios en este entorno.',
  identificacion: {
    nombre: 'Kuehne + Nagel International AG', nombre_corto: 'Kuehne+Nagel', ticker: 'KNIN', isin: 'CH0025238863', mercado: 'SIX Swiss Exchange', indice_referencia: 'SMI',
    pais: 'Suiza', pais_iso: 'CH', sector: 'Industria', industria: 'Transporte aéreo de mercancías y logística', sede: 'Schindellegi (Feusisberg, Suiza)', fundacion: '1890', empleados: null, web: 'https://www.kuehne-nagel.com',
    precio: 230.05, fecha_precio: '2026-10-13', acciones: 118.5, capitalizacion_publicada: Math.round(212740 / DKK_CHF), free_float_pct: 47,
    max_52s: 232.8, min_52s: 147.05, volumen_medio_diario: '≈ 232.000 acciones/día (media de 2025)', proximos_resultados: '2026-10-22',
  },
  consenso: {
    guidance: 'Para 2026, EBIT recurrente de 1.350-1.550 M CHF (elevada el 23-jul-2026 desde 1.200-1.400 M), con rendimientos estables o mejores en mar y aire, volumen positivo en el segundo semestre y un efecto de conversión de divisa de hasta −5 % [6, 7]. La empresa no publica objetivos a medio plazo en las fuentes accesibles. Próximos resultados (3T26): 22-oct-2026.',
    estimaciones: [
      { periodo: '2026e', ingresos: 24167, ebitda: null, ebit: 1409, bpa: 8.63, dpa: null, fuente: 'Sondeo de la empresa (ingresos y EBIT) y BPA de 15 analistas tras el 1S26 [6, 7]' },
      { periodo: '2027e', ingresos: 24720, ebitda: null, ebit: 1467, bpa: null, fuente: 'Sondeo de la empresa (mediana) [6]' },
    ],
    recomendaciones: { n_analistas: 26, comprar: 4, mantener: 10, vender: 12, po_medio: 204.78, po_min: null, po_max: null },
    revisiones: 'Tras el 2T26 el BPA de consenso de 2026 subió de 8,32 a 8,63 CHF [7]. El sondeo de la empresa (EBIT 2026 de 1.409 M) es anterior o coetáneo a la subida de la guía. Los objetivos van por detrás del precio: el medio de Investing es de 204,78 CHF y el de aktien.guide de 186,66, con más ventas (12) que compras (4) [3, 8]; Jefferies subió a comprar con objetivo de 220 CHF [9]. Desde mínimos de 147 CHF la acción ha subido más de un 50 % en un año [3].',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    tipo_rentabilidad: 'de precio (sin dividendos)',
    rentabilidades: [],
    anual: [],
    beta: null, volatilidad_pct: null, max_drawdown_pct: null, posicion_corta_pct: null,
    comentario: 'La acción tocó 361 CHF en 2021 y bajó hasta 148 CHF en 2025 (mínimo del año) con la normalización de fletes y la caída del beneficio [5]. Desde ahí ha subido hasta 230 CHF: la subida de la guía en julio, el repunte del aéreo por los centros de datos y la colaboración con Amazon (21-sep-2026, máximo de 52 semanas de 228,40 CHF ese día) [10, 3]. Según cash.ch, en agosto ya había analistas que la veían «demasiado alta» [18].',
    confianza: 'Baja',
  },
  multiplos_historicos: {
    serie: [
      { anio: '2021', precio_cierre: 293, ev_ebitda_ntm: null, per_ntm: null, excluir: true },
      { anio: '2022', precio_cierre: 213, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2023', precio_cierre: 287, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2024', precio_cierre: 204, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2025', precio_cierre: 170, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
    ],
    comentario: 'Precios de cierre de año estimados: capitalización de fin de año en USD de CompaniesMarketCap [4], pasada a CHF con el tipo USD/CHF aproximado de cada 31 de diciembre y dividida por 120,75 M de acciones emitidas (estimación propia, ±3 %); quedan dentro de los máximos y mínimos anuales publicados por la empresa [5]. Se excluye 2021: el BPA de 2021-2022 fue el de la burbuja de fletes de la pandemia (PER de 17 veces sobre un BPA que luego se redujo a la mitad).',
    confianza: 'Baja',
  },
  comparables: {
    criterio: 'Las siete cotizadas de transitario y logística por contrato del análisis de DSV, con cifras de MarketScreener a 7-oct-2026 [11], más DSV con sus múltiplos de ese día: los rivales globales sin activos (DSV, Expeditors, C.H. Robinson), DHL Group (dueño de DHL Global Forwarding), NX Holdings (transitario japonés) y dos de logística por contrato (GXO, ID Logistics). Capitalización pasada a CHF con los tipos del BCE del 7-oct [12].',
    empresas: comps,
    comentario: null,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: trans,
    comentario: 'Las operaciones del sector rara vez publican el EBITDA: Schenker salió a 0,77 veces ventas y 14,0 veces EBIT [13] y Bolloré Logistics a unas 0,68 veces ventas [14]. Kuehne+Nagel no puede ser objetivo: la Fundación Kühne tiene el control, así que el método de transacciones no entra en el valor.',
    confianza: 'Baja',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'identificacion', campo: 'precio de cierre del 13-oct-2026', tipo: 'Núcleo', intentos: '1) bolsa.mjs (Yahoo bloqueado en este entorno); 2) búsqueda de cierres fechados (CNBC: 228,50 el 9-oct); 3) MarketScreener en tiempo real (230,05 el 13-oct por la mañana, Cboe Europe)', decision: 'Calculado y marcado como estimación' },
    { seccion: 'consenso', campo: 'BPA de consenso 2027-2028 y objetivos mínimo y máximo', tipo: 'Núcleo', intentos: '1) MarketScreener (no abre); 2) sondeo de la empresa (sin BPA); 3) Simply Wall St, aktien.guide y Stocksguide (BPA de 2027-2028 tras muro de pago)', decision: 'Omitido' },
    { seccion: 'bolsa', campo: 'beta, volatilidad y rentabilidades anuales', tipo: 'Complemento', intentos: '1) bolsa.mjs (sin red); 2) búsqueda de beta en agregadores; 3) históricos de Macrotrends (ADR en USD ajustado)', decision: 'Omitido' },
  ],
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Schweizer Aktie der Woche: Logistikspezialist ist vielleicht schon zu hoch geflogen (artículo y comentarios de lectores)', editor: 'cash.ch', tipo: 'Foros y redes', fecha: '2026-08', url: 'https://www.cash.ch/news/top-news/schweizer-aktie-der-woche-logistikspezialist-ist-vielleicht-schon-zu-hoch-geflogen-950439' },
  { id: 2, titulo: 'Schweizer Aktie der Woche: Kühne+Nagel dank Fracht-Boom und Millionen-Sparprogramm auf der Überholspur', editor: 'cash.ch', tipo: 'Foros y redes', fecha: '2026-07', url: 'https://www.cash.ch/news/top-news/schweizer-aktie-der-woche-kuhnenagel-dank-fracht-boom-und-millionen-sparprogramm-auf-der-uberholspur-942962' },
  { id: 3, titulo: 'Kuehne + Nagel: narrativas de la comunidad (valor razonable de 183,83 CHF frente a 205,70)', editor: 'Simply Wall St Community', tipo: 'Foros y redes', fecha: '2026-08', url: 'https://www.webull.com/news/15333893176910848' },
  { id: 4, titulo: 'What comes next for Kuehne + Nagel after a 51 % gain', editor: 'Webull (Simply Wall St)', tipo: 'Foros y redes', fecha: '2026-09', url: 'https://www.webull.com/news/15682856708015104' },
  { id: 5, titulo: 'Up in the air: Kuehne-Amazon tie-up leaves questions unanswered', editor: 'The Loadstar', tipo: 'Foros y redes', fecha: '2026-09', url: 'https://theloadstar.com/up-in-the-air-kuehne-amazon-tie-up-leaves-questions-unanswered/' },
  { id: 6, titulo: 'Amazon erhält Option auf Kühne+Nagel-Aktien', editor: 'eurotransport.de', tipo: 'Foros y redes', fecha: '2026-09', url: 'https://www.eurotransport.de/logistik/spedition-und-logistik/amazon-kaufoption-kuehne-nagel-aktien-aws-logistik/' },
  { id: 7, titulo: 'Kuehne Nagel International: Kursziel und Analystenmeinungen (4 comprar, 10 mantener, 12 vender)', editor: 'aktien.guide', tipo: 'Foros y redes', fecha: '2026-10', url: 'https://aktien.guide/kursziel/Kuehne-Nagel-International-CH0025238863' },
];
const E = {
  _estado: 'Reddit, Stocktwits y Seeking Alpha no devuelven debate reciente en la búsqueda; se usan cash.ch (con comentarios de lectores), la comunidad de Simply Wall St, prensa sectorial con comentarios y agregadores de opinión.',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'cash.ch (artículos y comentarios de lectores, Suiza)', fecha: '2026-08', n_comentarios: 15, tono: 'Dividido', resumen: 'Tras la subida del verano, «quizá ya ha volado demasiado alto»: los lectores se reparten entre quienes ven el repunte del aéreo y el ahorro como sostenibles y quienes esperan la vuelta de los fletes [1, 2].' },
      { plataforma: 'Simply Wall St Community (narrativas)', fecha: '2026-09', n_comentarios: 10, tono: 'Negativo', resumen: 'La narrativa más seguida pone el valor razonable en 183,83 CHF, por debajo del precio, y otra pregunta qué queda tras una subida del 51 % [3, 4].' },
      { plataforma: 'The Loadstar y eurotransport.de (prensa sectorial con comentarios)', fecha: '2026-09', n_comentarios: 8, tono: 'Dividido', resumen: 'La colaboración con Amazon se celebra como contrato de prestigio, pero los comentarios señalan que la opción sobre acciones y los hitos dejan preguntas sin respuesta sobre el margen y el coste [5, 6].' },
      { plataforma: 'aktien.guide (agregador de opiniones, Alemania)', fecha: '2026-10', n_comentarios: 26, tono: 'Negativo', resumen: 'Mayoría de opiniones de venta (12 de 26) con un objetivo medio por debajo del precio [7].' },
    ],
    temas: [
      { tema: 'Amazon/AWS y centros de datos como nuevo motor del aéreo', postura: 'Alcista', peso: 'Alto', contraste: null },
      { tema: 'Valoración tras subir más de un 50 % desde mínimos', postura: 'Bajista', peso: 'Alto', contraste: null },
      { tema: 'Normalización de fletes cuando se reabra Oriente Medio', postura: 'Bajista', peso: 'Medio', contraste: null },
      { tema: 'Fundación Kühne como nuevo accionista de control', postura: 'Dividida', peso: 'Medio', contraste: null },
    ],
    lectura: null,
    confianza: 'Baja',
  },
  fuentes: fE,
  huecos: [],
};
guarda('E', E);
console.log('Notas A-E escritas;', comps.length, 'comparables,', trans.length, 'transacciones.');
