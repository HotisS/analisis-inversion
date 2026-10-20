// Escribe las notas A-E de BSE Limited (BSE.NS, NSE; corte 2026-10-20). Análisis value desde cero.
// Fuentes: informes anuales FY2025-26, FY2024-25, FY2023-24 y FY2021-22 (estados consolidados Ind AS auditados, dos ejercicios
// cada uno; FY2023 sale de las comparativas del FY2023-24), resultados trimestrales consolidados del 2T FY26 al 1T FY27,
// presentaciones y transcripciones (anuncios a la NSE), anuncios Regulation 30, Yahoo Finance (bolsa, consenso y comparables),
// FRED/OCDE (bono indio), Damodaran (prima), prensa india y el foro ValuePickr.
// India no tiene XBRL en herramientas/cuentas.mjs. Ejercicio de abril a marzo: FY2026 = abril de 2025 a marzo de 2026
// (etiqueta «fin»). Cifras en millones de INR (los estados vienen en lakhs: ÷ 10) salvo que se diga otra cosa.
// BPA y precios ajustados por las dos ampliaciones gratuitas 2:1 (2022 y mayo de 2025): ÷ 9 sobre las cifras de antes de 2022.
// BSE es una bolsa con cámara de compensación: la caja de los clientes (márgenes y depósitos de los miembros) y el fondo de
// garantía de liquidación (Core SGF) NO son de la empresa y se quitan de la caja y del flujo operativo.
// Cada nota cita solo con [n] de su propia lista. Ejecutar: node informes/bse-2026-10-20/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const N = 'https://nsearchives.nseindia.com/corporate';
const bolsa = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const comp = JSON.parse(fs.readFileSync(path.join(dir, 'comparables.json'), 'utf8'));

const URL = {
  ar26: `${N}/BSE1_23072026103414_NSEintimationNoticeandAR2026.pdf`,
  ar25: 'https://nsearchives.nseindia.com/annual_reports/AR_27090_BSE_2024_2025_A_24072025103555.pdf',
  ar24: 'https://nsearchives.nseindia.com/annual_reports/AR_24153_BSE_2023_2024_2006202415751.pdf',
  ar22: 'https://nsearchives.nseindia.com/annual_reports/AR_20066_BSE_2021_2022_17062022161215.zip',
  res1q27: `${N}/BSE1_04082026184424_NSEIntimation.pdf`,
  pres1q27: `${N}/BSE1_04082026185534_NSEintimation.pdf`,
  tr1q27: `${N}/BSE1_10082026115817_NSEIntimation.pdf`,
  res4q26: `${N}/BSE1_07052026173203_NSEintimation07052026.pdf`,
  pres4q26: `${N}/BSE1_07052026174401_NSEintimation.pdf`,
  tr4q26: `${N}/BSE1_13052026172037_NSEintimation.pdf`,
  res3q26: `${N}/BSE1_09022026183921_NSEIntimation.pdf`,
  pres3q26: `${N}/BSE1_09022026185014_intimation.pdf`,
  tr3q26: `${N}/BSE1_13022026174918_NSEintimation13022026.pdf`,
  res2q26: `${N}/BSE1_11112025180026_NSEIntimation.pdf`,
  pres2q26: `${N}/BSE1_11112025201829_Coveringletterinvestorpresentationrevised.pdf`,
  tr2q26: `${N}/BSE1_17112025150702_NSEIntimation.pdf`,
  auditor: `${N}/BSE1_04082026191701_NSEIntimation.pdf`,
  dividendo: `${N}/BSE1_07052026174613_NSEintimation07052026.pdf`,
  msci: `${N}/BSE1_19082026193321_NSEIntimation.pdf`,
  licencias: `${N}/BSE1_29062026173741_NSEIntimation.pdf`,
  midcap: `${N}/BSE1_13022026182721_NSEintimationsd.pdf`,
  next30: `${N}/BSE1_04032026164224_NSEIntimation.pdf`,
  it: `${N}/BSE1_09042026173337_NSEIntimation.pdf`,
  esg: `${N}/BSE1_16102026120419_NSEintimation.pdf`,
  iibx: `${N}/BSE1_10092026180312_NSEIntimation.pdf`,
  junta: `${N}/BSE1_19082026213255_NSEintimationresults2026.pdf`,
  postal: `${N}/BSE1_24072026210738_NSEIntimation2026.pdf`,
  ebix: `${N}/BSE1_09122025170743_NSEintimation.pdf`,
  consejoJun: `${N}/BSE1_16062026182713_NSEIntimation.pdf`,
  consejoDic: `${N}/BSE1_17122025183307_NSEintimation.pdf`,
  directorDic: `${N}/BSE1_16122025190837_NSEintimation.pdf`,
  ifsc: `${N}/BSE1_12112025182203_Nseintimation.pdf`,
  fusion: `${N}/BSE1_23042026202455_NSEIntimation.pdf`,
  general: `${N}/BSE1_30042026101625_NSEIntimation.pdf`,
  orden: `${N}/BSE1_23122025105317_NSEIntimation.pdf`,
  btNifty: 'https://www.businesstoday.in/markets/trending-stocks/story/bse-shares-enter-nifty-club-stock-tanks-4-what-consensus-target-suggests-558670-2026-09-30',
  btAgo: 'https://www.businesstoday.in/markets/stocks/story/bse-share-price-targets-buy-sell-or-hold-what-jefferies-ubs-jpmorgan-say-547235-2026-08-05',
  btAgo20: 'https://www.businesstoday.in/markets/stocks/story/bse-shares-fall-nearly-2-what-is-dragging-the-stock-550364-2026-08-20',
  btJef: 'https://www.businesstoday.in/markets/stocks/story/bse-shares-jefferies-downgrades-rating-to-underperform-lowers-target-price-549492-2026-08-17',
  bsCas: 'https://www.business-standard.com/markets/news/bse-hits-4-month-low-after-jefferies-nuvama-downgrade-stock-on-cas-risks-126081801046_1.html',
  ob9: 'https://www.outlookbusiness.com/markets/bse-shares-extend-fall-down-9-in-a-week-after-broker-downgrades',
  kotak: 'https://www.kotakneo.com/news/stocks/bse-shares-fall-after-goldman-sachs-bnp-paribas-stake-sale/',
  equentis: 'https://www.equentis.com/blog/bse-share-price-falls-4-as-it-enters-nifty-50-macquarie-sees-28-upside/',
  vp: 'https://forum.valuepickr.com/t/bse-ltd/13699',
};

// ================================================================ A. Cuentas
const fA = [
  { id: 1, titulo: 'Annual Report 2025-26: estados consolidados Ind AS de FY2026 y FY2025, notas (Core SGF, fondos de clientes, inversiones «owned»), informe del auditor, informe de gestión', editor: 'BSE Limited / NSE', tipo: 'Primaria', fecha: '2026-07-23', url: URL.ar26 },
  { id: 2, titulo: 'Annual Report 2024-25: estados consolidados de FY2025 y FY2024', editor: 'BSE Limited / NSE', tipo: 'Primaria', fecha: '2025-07-24', url: URL.ar25 },
  { id: 3, titulo: 'Annual Report 2023-24: estados consolidados de FY2024 y FY2023 (provisión de tasas a SEBI, venta parcial de CDSL)', editor: 'BSE Limited / NSE', tipo: 'Primaria', fecha: '2024-06-20', url: URL.ar24 },
  { id: 4, titulo: 'Annual Report 2021-22: estados consolidados de FY2022 y FY2021', editor: 'BSE Limited / NSE', tipo: 'Primaria', fecha: '2022-06-17', url: URL.ar22 },
  { id: 5, titulo: 'Resultados consolidados no auditados del trimestre a 30-jun-2026 (1T FY27) y salida del consejo del 4-ago-2026 (nuevo auditor KKC & Associates)', editor: 'BSE Limited / NSE', tipo: 'Primaria', fecha: '2026-08-04', url: URL.res1q27 },
  { id: 6, titulo: 'Investor Presentation 1T FY27: cuenta consolidada por líneas de ingreso, EBITDA operativo con y sin Core SGF, derivados (prima diaria, ingresos), accionariado', editor: 'BSE Limited / NSE', tipo: 'Primaria', fecha: '2026-08-04', url: URL.pres1q27 },
  { id: 7, titulo: 'Transcripción de la conferencia de resultados del 1T FY27 (subasta de cierre, normas del RBI, ingresos de inversiones)', editor: 'BSE Limited / NSE', tipo: 'Primaria', fecha: '2026-08-10', url: URL.tr1q27 },
  { id: 8, titulo: 'Resultados consolidados auditados de FY2026 y del 4T FY26 (balance y flujos)', editor: 'BSE Limited / NSE', tipo: 'Primaria', fecha: '2026-05-07', url: URL.res4q26 },
  { id: 9, titulo: 'Investor Presentation 4T FY26 (FY2026 por líneas, márgenes, Core SGF)', editor: 'BSE Limited / NSE', tipo: 'Primaria', fecha: '2026-05-07', url: URL.pres4q26 },
  { id: 10, titulo: 'Transcripción de la conferencia de resultados del 4T FY26', editor: 'BSE Limited / NSE', tipo: 'Primaria', fecha: '2026-05-13', url: URL.tr4q26 },
  { id: 11, titulo: 'Resultados consolidados del 3T FY26 (a 31-dic-2025) y presentación', editor: 'BSE Limited / NSE', tipo: 'Primaria', fecha: '2026-02-09', url: URL.res3q26 },
  { id: 12, titulo: 'Resultados consolidados del 2T FY26 (a 30-sep-2025) y presentación', editor: 'BSE Limited / NSE', tipo: 'Primaria', fecha: '2025-11-11', url: URL.res2q26 },
  { id: 13, titulo: 'Anuncio a la NSE: dividendo final de FY2026 (10 INR por acción)', editor: 'BSE Limited / NSE', tipo: 'Primaria', fecha: '2026-05-07', url: URL.dividendo },
  { id: 14, titulo: 'Anuncio a la NSE: orden de GST de 7,25 crore (recurso)', editor: 'BSE Limited / NSE', tipo: 'Primaria', fecha: '2025-12-23', url: URL.orden },
];

// Cuenta por naturaleza (Ind AS). ingresos = ingresos de explotación (tasas de negociación, rendimiento de los fondos de
// compensación, cotización, otros). coste_ventas = todos los gastos operativos sin amortización y CON la aportación al Core SGF
// (gasto obligatorio cada año); gastos_generales = null. EBITDA = el «Operating EBITDA including Core SGF» de la empresa.
// resultado_financiero = BAI − EBIT: rendimiento de la cartera propia + otros ingresos − gastos financieros + asociadas (CDSL).
// FY2024 sin la plusvalía excepcional de CDSL (4.066 M antes de impuestos). BPA = beneficio atribuido sin operaciones
// interrumpidas ÷ 411,98 M de acciones (incluidas las que están en suspenso), ajustado por las ampliaciones gratuitas.
const cuenta = [
  { periodo: 'FY2022', ingresos: 7431.5, coste_ventas: 5300.1, gastos_generales: null, ebitda: 2131.4, amortizaciones: 482.9, ebit: 1648.5, resultado_financiero: 1624.1, bai: 3272.6, impuestos: 823.3, minoritarios: -94.0, beneficio_neto: 2543.3, gastos_financieros: 221.5, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 6.17, dpa: 4.5, dpa_extraordinario: 0, acciones_diluidas: 411.98 },
  { periodo: 'FY2023', ingresos: 8155.3, coste_ventas: 6180.9, gastos_generales: null, ebitda: 1974.4, amortizaciones: 603.4, ebit: 1371.0, resultado_financiero: 1601.6, bai: 2972.6, impuestos: 916.1, minoritarios: -150.2, beneficio_neto: 2206.7, gastos_financieros: 274.8, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 5.35, dpa: 4.0, dpa_extraordinario: 0, acciones_diluidas: 411.98 },
  { periodo: 'FY2024', ingresos: 13900.3, coste_ventas: 9903.3, gastos_generales: null, ebitda: 3997.0, amortizaciones: 954.4, ebit: 3042.6, resultado_financiero: 2846.4, bai: 5889.0, impuestos: 1847.6, minoritarios: -67.3, beneficio_neto: 4108.7, gastos_financieros: 150.5, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 9.97, dpa: 5.0, dpa_extraordinario: 0, acciones_diluidas: 411.98 },
  { periodo: 'FY2025', ingresos: 29573, coste_ventas: 14576, gastos_generales: null, ebitda: 14997, amortizaciones: 1130, ebit: 13867, resultado_financiero: 3616, bai: 17483, impuestos: 4312, minoritarios: -35, beneficio_neto: 13206, gastos_financieros: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 32.06, dpa: 6.0, dpa_extraordinario: 1.67, acciones_diluidas: 411.98 },
  { periodo: 'FY2026', ingresos: 48340, coste_ventas: 17553, gastos_generales: null, ebitda: 30787, amortizaciones: 1590, ebit: 29197, resultado_financiero: 3796, bai: 32993, impuestos: 8238, minoritarios: -95, beneficio_neto: 24850, gastos_financieros: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 60.32, dpa: 10.0, dpa_extraordinario: 0, acciones_diluidas: 411.98 },
];
// Balance. caja = caja PROPIA: efectivo + otros saldos bancarios + inversiones corrientes y no corrientes + otros activos
// financieros − otros pasivos financieros (márgenes, depósitos y fondos de los miembros y clientes) − Core SGF. Contraste: las
// notas de inversiones «owned» de FY2026 suman ≈ 61.307 M frente a 60.772 M de la aproximación [1]. Sin deuda financiera;
// arrendamientos inmateriales. patrimonio_neto = atribuible a los dueños; reservas = «other equity».
const balanceHist = [
  { periodo: 'FY2022', activo_total: 61854, activo_corriente: 49535, pasivo_corriente: 27461, pasivo_total: 33957, fondo_comercio: 374, intangibles: 309, inmovilizado_material: 1029, existencias: 0, clientes: 634, proveedores: 729, activos_contrato: null, pasivos_contrato: null, caja: 21801, deuda_financiera: 0, arrendamientos: 0, patrimonio_neto: 26545, minoritarios: 1352, reservas: 26275 },
  { periodo: 'FY2023', activo_total: 59938, activo_corriente: 38571, pasivo_corriente: 23927, pasivo_total: 31648, fondo_comercio: 374, intangibles: 612, inmovilizado_material: 1557, existencias: 0, clientes: 909, proveedores: 804, activos_contrato: null, pasivos_contrato: null, caja: 20481, deuda_financiera: 0, arrendamientos: 0, patrimonio_neto: 27012, minoritarios: 1278, reservas: 26741 },
  { periodo: 'FY2024', activo_total: 94502, activo_corriente: 59699, pasivo_corriente: 50270, pasivo_total: 59955, fondo_comercio: 374, intangibles: 522, inmovilizado_material: 2102, existencias: 0, clientes: 2109, proveedores: 1906, activos_contrato: null, pasivos_contrato: null, caja: 30689, deuda_financiera: 0, arrendamientos: 0, patrimonio_neto: 33023, minoritarios: 1524, reservas: 32752 },
  { periodo: 'FY2025', activo_total: 103417, activo_corriente: 73427, pasivo_corriente: 46146, pasivo_total: 57660, fondo_comercio: 381, intangibles: 523, inmovilizado_material: 2636, existencias: 0, clientes: 2878, proveedores: 1140, activos_contrato: null, pasivos_contrato: null, caja: 36673, deuda_financiera: 0, arrendamientos: 0, patrimonio_neto: 44237, minoritarios: 1520, reservas: 43967 },
  { periodo: 'FY2026', activo_total: 134461, activo_corriente: 82171, pasivo_corriente: 53705, pasivo_total: 66506, fondo_comercio: 381, intangibles: 854, inmovilizado_material: 5953, existencias: 0, clientes: 5532, proveedores: 1309, activos_contrato: null, pasivos_contrato: null, caja: 60772, deuda_financiera: 0, arrendamientos: 0, patrimonio_neto: 66730, minoritarios: 1225, reservas: 65914 },
];
// Flujos. flujo_operativo AJUSTADO: el publicado sin la variación de los pasivos de clientes (márgenes y depósitos de los
// miembros) y sin las partidas del Core SGF (aportaciones, aportaciones de otras cámaras, rendimiento y multas del fondo),
// que no son de la empresa. capex = inmovilizado material e intangibles. desinversiones FY2024 = venta parcial de CDSL.
// emision_acciones = aportaciones de minoritarios a filiales (India INX, India ICC). adquisiciones = asociadas.
const flujosHist = [
  { periodo: 'FY2022', flujo_operativo: 1968, capex: 319.6, pagos_arrendamientos: null, adquisiciones: 195.8, desinversiones: 0, dividendos: 962.0, recompras: 0, emision_acciones: 1051.4, intereses_en_financiacion: null },
  { periodo: 'FY2023', flujo_operativo: 1115, capex: 1434.2, pagos_arrendamientos: null, adquisiciones: 88.5, desinversiones: 0, dividendos: 1855.1, recompras: 0, emision_acciones: 0, intereses_en_financiacion: null },
  { periodo: 'FY2024', flujo_operativo: 3877, capex: 1313.2, pagos_arrendamientos: null, adquisiciones: 0, desinversiones: 5159.7, dividendos: 1649.0, recompras: 142.0, emision_acciones: 369.6, intereses_en_financiacion: null },
  { periodo: 'FY2025', flujo_operativo: 7770, capex: 1532.3, pagos_arrendamientos: null, adquisiciones: 247.5, desinversiones: 0, dividendos: 2059.9, recompras: 0, emision_acciones: 0, intereses_en_financiacion: null },
  { periodo: 'FY2026', flujo_operativo: 23760, capex: 5151.6, pagos_arrendamientos: null, adquisiciones: 0, desinversiones: 0, dividendos: 3158.5, recompras: 0, emision_acciones: 121.5, intereses_en_financiacion: null },
];

const trim = [
  ['2T FY25', 7407, 3881, 8.42, null], ['3T FY25', 7681, 2356, 5.33, null], ['4T FY25', 8466, 5936, 12.00, null],
  ['1T FY26', 9580, 6255, 13.09, 6019], ['2T FY26', 10684, 6803, 13.56, 7407], ['3T FY26', 12441, 7322, 14.61, 7681],
  ['4T FY26', 15635, 10407, 19.35, 8466], ['1T FY27', 15661, 10460, 21.22, 9580],
].map(([periodo, ingresos, ebitda, bpa, ant]) => ({
  periodo, ingresos, crecimiento_pct: ant ? Math.round((ingresos / ant - 1) * 1000) / 10 : null, crecimiento_organico_pct: null,
  ebitda, margen_ebitda_pct: Math.round((ebitda / ingresos) * 1000) / 10, bpa, vs_consenso: null,
}));

const A = {
  _estado: 'completa',
  financieros: {
    cuenta,
    // LTM jun-26 = FY2026 − 1T FY26 + 1T FY27 [1, 6]. Ingresos 48.340 − 9.580 + 15.661; EBITDA 30.787 − 6.255 + 10.460;
    // amortización 1.590 − 269 + 426; beneficio atribuido sin interrumpidas 24.850 − 5.275 + 8.740.
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 54421, ebitda: 34992, ebit: 33245, beneficio_neto: 28315, bpa: 68.73, dpa: 10, dpa_extraordinario: 0, fcf: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [
      { periodo: 'FY2024', descripcion: 'Venta de parte de CDSL (del 20 % al 15 %), con una plusvalía excepcional de 4.066 M antes de impuestos [3].' },
      { periodo: 'FY2026', descripcion: 'Venta del 40 % de Ebix Insurance Broking (diciembre de 2025) y desinversión de BSE Institute (mayo de 2025, operación interrumpida) [1].' },
      { periodo: 'FY2027', descripcion: 'BSE Investments y BSE Administration & Supervision se fusionan en BSE Technologies (23-abr-2026); la participación directa en India International Bullion Holding sube al 20 % (asociada) [5, 6].' },
    ],
    comentario: 'Los ingresos pasaron de 7.432 M INR en FY2022 a 48.340 M en FY2026: se multiplicaron por 6,5, casi todo por los derivados sobre el Sensex que BSE relanzó en mayo de 2023 [1, 4]. Las tasas de negociación fueron 37.950 M en FY2026 (79 % de los ingresos), y dentro de ellas los derivados de renta variable unos 31.300 M, el 65 % del total; en el 1T FY27 los derivados fueron 11.550 M de 15.661 M (74 %) [6]. Es un negocio de costes casi fijos: el margen EBITDA pasó del 29 % en FY2024 al 64 % en FY2026 y al 67 % en el 1T FY27 [6]. El resto es estable: cotización (5.190 M), plataforma de fondos StAR MF y otros (3.485 M) y rendimiento de los fondos de compensación (1.714 M) [6]. El 1T FY27 dejó 15.661 M de ingresos (+63 %) pero plano frente al 4T FY26 (15.635 M): el crecimiento se paró con la subida del impuesto a la negociación (STT, abril de 2026) y antes de la subasta de cierre de agosto [6, 7].',
    ajustes: 'Tres ajustes. (1) Caja de clientes: el balance consolidado incluye los márgenes y depósitos de los miembros y el Core SGF (12.468 M en FY2026), que no son de BSE; la caja de la valoración es solo la propia (60.772 M a marzo de 2026) [1]. (2) Flujo operativo sin la variación de esos pasivos de clientes ni las partidas del Core SGF (lo hace también la empresa en su informe de flujo propio) [1]. (3) FY2024 sin la plusvalía de CDSL (4.066 M); el gasto de ese año lleva 1.698 M de tasas de SEBI de años anteriores, que no se quitan [3]. El EBITDA incluye la aportación obligatoria al Core SGF (770 M en FY2026), como la «Operating EBITDA including Core SGF» de la empresa [6].',
    confianza: 'Alta',
  },
  trimestres: {
    items: trim,
    ultima_presentacion: 'En la conferencia del 1T FY27 (10-ago-2026) el consejero delegado, Sundararaman Ramamurthy, no quiso hablar de la subasta de cierre (CAS) «con dos días de datos» y dijo que la empresa no mide su éxito por cuota de mercado sino por profundidad: más de 610 miembros activos y unos 650 inversores extranjeros en derivados, con objetivo de 800 [7]. La prima diaria media de los derivados fue un récord de 29.615 crore en el 1T (+96 %) [7]. Reconoció que la circular del RBI sobre garantías bancarias a los operadores por cuenta propia frena el crecimiento de los contratos de más de dos semanas [7]. El director financiero explicó que los ingresos de inversiones se duplicaron (1.352 M) por revertir pérdidas de valor de mercado de bonos del 4T [7]. Lo que no se aclaró: el efecto de la CAS (la prensa midió −12 % de volumen de opciones en agosto) y el de la posible supresión de los vencimientos semanales [7].',
    confianza: 'Alta',
  },
  balance: {
    historico: balanceHist,
    vencimientos: [],
    liquidez: 'Sin deuda. Caja propia de 60.772 M a 31-mar-2026, el 4,5 % de la capitalización [1]. El balance consolidado de 134.461 M incluye además los márgenes y depósitos de los miembros (otros pasivos financieros) y el Core SGF de 12.468 M, que son de los clientes y del sistema [1].',
    rating: null,
    coste_deuda_pct: null,
    vida_media_anios: null,
    otros_pasivos: 'Lo relevante fuera de la deuda: (1) el Core SGF (12.468 M), fondo obligatorio de la cámara para garantizar la liquidación, que la empresa alimenta con aportaciones anuales (770 M en FY2026) [1]; (2) los márgenes de los miembros, pasivos que se compensan con la caja de clientes [1]; (3) la orden de GST de 72,5 M recurrida [14]; (4) la obligación de mantener un patrimonio mínimo en las cámaras y bolsas reguladas por SEBI, que inmoviliza parte de la caja propia.',
    comentario: 'Balance de caja neta sin deuda, como el de cualquier bolsa con cámara: lo grande no es de la empresa. De los 134.461 M de activo de FY2026, unos 60.800 M son caja propia, 12.468 M el Core SGF y el resto, en buena parte, márgenes de miembros [1]. El patrimonio atribuido pasó de 26.545 M en FY2022 a 66.730 M en FY2026 [1, 4]. El circulante comercial es pequeño y positivo (clientes 5.532 M − proveedores 1.309 M) [1].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujosHist,
    comentario: 'Flujo operativo ajustado (sin la caja de clientes ni el Core SGF) de 23.760 M en FY2026, frente a 1.968 M en FY2022 [1, 4]. El capex subió a 5.152 M en FY2026 (10,7 % de las ventas) por el centro de datos, la tecnología de negociación y la nueva sede de la cámara; en FY2022-FY2025 fue del 2-18 % [1]. Flujo libre de ≈ 18.600 M en FY2026. Dividendos de 3.159 M pagados en FY2026 y 10 INR por acción (4.120 M) aprobados para julio de 2026 [13]. En FY2024 entró la venta parcial de CDSL (5.160 M) [3].',
    confianza: 'Media',
  },
  calidad: {
    auditor: 'S.R. Batliboi & Co. LLP (EY); desde la junta de 2026, KKC & Associates LLP',
    anios_auditor: 5,
    opinion: 'Favorable sin salvedades (FY2026)',
    comentario: 'S.R. Batliboi & Co. LLP auditó FY2022-FY2026 con opinión favorable sin salvedades [1]. Al terminar su mandato de cinco años, el consejo del 4-ago-2026 propuso a KKC & Associates LLP para 2026-2031 [5]. Criterios a vigilar: (1) la presentación mezcla la caja de clientes y el Core SGF con la propia; hay que separarla con las notas [1]; (2) los ingresos de inversiones llevan pérdidas y ganancias de valor de mercado de bonos (pérdida en el 4T FY26, reversión en el 1T FY27) [7]; (3) las tasas de SEBI se recalcularon en FY2024 sobre la facturación y no sobre los ingresos, con una provisión de 1.698 M de años anteriores [3].',
    senales: [
      { senal: 'Caja de clientes y Core SGF dentro del balance consolidado', nivel: 'Baja', comentario: 'Separada con las notas de inversiones propias [1].' },
      { senal: 'Ingresos de inversiones con valoración a mercado', nivel: 'Baja', comentario: 'Mueven el beneficio trimestral en 50-70 M [7].' },
      { senal: 'Cambio de auditor por rotación', nivel: 'Baja', comentario: 'KKC & Associates desde la junta de 2026 [5].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Dividendo creciente: 4,5 INR por acción (ajustado) en FY2022, 4 en FY2023, 5 en FY2024, 7,67 en FY2025 (1,67 extraordinario) y 10 en FY2026, entre el 17 % y el 75 % del beneficio [1, 13]. Recompra pequeña en FY2024 (142 M). Sin ampliaciones; dos emisiones gratuitas 2:1 (2022 y mayo de 2025) que no cambian el valor [1].',
    adquisiciones: [
      { anio: 'FY2027', objetivo: 'India International Bullion Holding IFSC (hasta el 20 %, compra a filiales propias)', importe: null, financiacion: 'Caja', ev_ebitda: null, resultado: 'Reorganización interna; pasa a asociada directa [5].' },
    ],
    comentario: 'La asignación de capital es conservadora: casi no compra empresas, acumula caja y reparte en dividendo el 17 % del beneficio de FY2026. Con 60.772 M de caja propia (el 91 % del patrimonio) que rinde un 5-6 % antes de impuestos, el ROE baja: la caja es el gran uso ineficiente del capital [1]. Vendió CDSL en parte (FY2024) y Ebix (FY2026) [1, 3].',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'Tasas de negociación', descripcion: 'Derivados de renta variable (opciones sobre el Sensex y el Bankex), contado de acciones, bonos y StAR MF', tipo_resultado: null, historico: [
        { periodo: 'FY2024', ingresos: 7089, resultado: null }, { periodo: 'FY2025', ingresos: 20299, resultado: null }, { periodo: 'FY2026', ingresos: 37950, resultado: null } ] },
      { nombre: 'Rendimiento de los fondos de compensación', descripcion: 'Intereses de la caja de la cámara (márgenes de miembros) que se queda BSE', tipo_resultado: null, historico: [
        { periodo: 'FY2024', ingresos: 1840, resultado: null }, { periodo: 'FY2025', ingresos: 2178, resultado: null }, { periodo: 'FY2026', ingresos: 1714, resultado: null } ] },
      { nombre: 'Servicios de cotización', descripcion: 'Cuotas anuales de cotización, salidas a bolsa, pymes', tipo_resultado: null, historico: [
        { periodo: 'FY2024', ingresos: 3497, resultado: null }, { periodo: 'FY2025', ingresos: 4900, resultado: null }, { periodo: 'FY2026', ingresos: 5190, resultado: null } ] },
      { nombre: 'Otros ingresos de explotación', descripcion: 'Colocación de servidores (co-location), datos, índices, distribución de fondos', tipo_resultado: null, historico: [
        { periodo: 'FY2024', ingresos: 1285, resultado: null }, { periodo: 'FY2025', ingresos: 2197, resultado: null }, { periodo: 'FY2026', ingresos: 3485, resultado: null } ] },
    ],
    geografias: [{ nombre: 'India', peso_pct: 100 }],
    geografias_criterio: 'origen',
    kpis: [
      { kpi: 'Prima diaria media de opciones (crore INR)', valor_anterior: '≈ 15.100 (1T FY26)', valor_actual: '29.615 (1T FY27)', variacion: '+96 %', comentario: 'Récord; en agosto bajó a ≈ 18.100 con la subasta de cierre [6, 7].' },
      { kpi: 'Ingresos de derivados (M INR)', valor_anterior: '11.279 (4T FY26)', valor_actual: '11.550 (1T FY27)', variacion: '+2 %', comentario: 'El 74 % de los ingresos [6].' },
      { kpi: 'Contado: negociación diaria media (M INR)', valor_anterior: null, valor_actual: '99.553 (1T FY27)', variacion: 'Récord trimestral', comentario: '[6, 7]' },
      { kpi: 'Margen EBITDA operativo con Core SGF', valor_anterior: '64 % (FY2026)', valor_actual: '67 % (1T FY27)', variacion: '+3 puntos', comentario: '[6]' },
      { kpi: 'Empresas en BSE SME', valor_anterior: '600 (jul-2025)', valor_actual: '750 (jul-2026)', variacion: '+25 %', comentario: '[7]' },
    ],
  },
  fuentes: fA,
  huecos: [
    { seccion: 'trimestres', campo: 'Comparación con el consenso de cada trimestre', tipo: 'Complemento', intentos: '1) Yahoo (solo el consenso vigente); 2) presentaciones (no lo dan); 3) prensa de cada publicación (cifras dispares)', decision: 'Omitido' },
    { seccion: 'negocio', campo: 'Resultado por línea de negocio', tipo: 'Complemento', intentos: '1) Informe anual (un solo segmento); 2) presentaciones (solo ingresos por línea); 3) transcripciones', decision: 'Omitido; ingresos por línea de la presentación' },
    { seccion: 'balance', campo: 'Rating de crédito', tipo: 'Complemento', intentos: '1) Informe anual (no tiene deuda calificada); 2) anuncios a la NSE; 3) web de la empresa', decision: 'Omitido (sin deuda)' },
  ],
};
guarda('A', A);

// ================================================================ B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Annual Report 2025-26: informe de gestión (mercado de capitales indio, inversores, derivados, cotizaciones) y estrategia', editor: 'BSE Limited / NSE', tipo: 'Primaria', fecha: '2026-07-23', url: URL.ar26 },
  { id: 2, titulo: 'Investor Presentation 1T FY27: grupo, líneas de negocio, derivados, StAR MF, cotización', editor: 'BSE Limited / NSE', tipo: 'Primaria', fecha: '2026-08-04', url: URL.pres1q27 },
  { id: 3, titulo: 'Fichas de NSE, MCX, CDSL, CAMS, CME, ICE, Cboe, Nasdaq, HKEX, Deutsche Börse y LSEG (ventas, márgenes, consenso)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/NSE.BO' },
  { id: 4, titulo: 'Anuncio a la NSE: acuerdo con MSCI sobre varios de sus índices; BSE estudiará lanzar derivados en India ligados a ellos', editor: 'BSE Limited / NSE', tipo: 'Primaria', fecha: '2026-08-19', url: URL.msci },
  { id: 5, titulo: 'Anuncio a la NSE: desde el 1-ene-2027 BSE vende directamente sus datos de mercado a clientes internacionales (hasta ahora lo hacía Deutsche Börse, desde 2013)', editor: 'BSE Limited / NSE', tipo: 'Primaria', fecha: '2026-06-29', url: URL.licencias },
  { id: 6, titulo: 'Anuncios a la NSE: aprobación de SEBI para derivados sobre los índices Focused Midcap, Sensex Next 30 y Focused IT', editor: 'BSE Limited / NSE', tipo: 'Primaria', fecha: '2026-04-09', url: URL.it },
  { id: 7, titulo: 'Business Standard: «BSE hits 4-month low after Jefferies, Nuvama downgrade stock on CAS risks» (subasta de cierre, cuota de prima)', editor: 'Business Standard', tipo: 'Prensa', fecha: '2026-08-18', url: URL.bsCas },
  { id: 8, titulo: 'Business Today: «BSE shares: Jefferies downgrades rating to Underperform» (normas del RBI, recorte de BPA)', editor: 'Business Today', tipo: 'Prensa', fecha: '2026-08-17', url: URL.btJef },
  { id: 9, titulo: 'Business Today: «BSE shares fall nearly 2 %; what is dragging the stock?» (volúmenes de agosto)', editor: 'Business Today', tipo: 'Prensa', fecha: '2026-08-20', url: URL.btAgo20 },
  { id: 10, titulo: 'Anuncio a la NSE: calificación ESG', editor: 'BSE Limited / NSE', tipo: 'Primaria', fecha: '2026-10-16', url: URL.esg },
  { id: 11, titulo: 'Annual Report 2025-26: BRSR (empleados, energía, gobierno)', editor: 'BSE Limited / NSE', tipo: 'Primaria', fecha: '2026-07-23', url: URL.ar26 },
  { id: 12, titulo: 'Transcripción del 1T FY27 (cuota, inversores extranjeros, contratos mensuales)', editor: 'BSE Limited / NSE', tipo: 'Primaria', fecha: '2026-08-10', url: URL.tr1q27 },
  { id: 13, titulo: 'Annual Report 2021-22: historia y negocio antes del relanzamiento de los derivados', editor: 'BSE Limited / NSE', tipo: 'Primaria', fecha: '2022-06-17', url: URL.ar22 },
];
const C_ = Object.fromEntries(comp.empresas.map((e) => [e.ticker, e]));
const B = {
  _estado: 'completa',
  historia: {
    resumen: 'BSE es la bolsa más antigua de Asia: nació en 1875 como la Native Share & Stock Brokers\' Association, bajo un árbol de Dalal Street, en Bombay [13]. Fue una asociación mutua de intermediarios hasta 2005, cuando se convirtió en sociedad anónima; salió a bolsa (en la NSE, su rival) en febrero de 2017 [13]. Desde los años noventa la NSE, creada por el Gobierno con negociación electrónica, le quitó casi todo el volumen. En mayo de 2023 BSE relanzó los derivados sobre el Sensex con vencimiento semanal en viernes y contratos más pequeños, y en dos años pasó a tener cerca de un tercio de la prima de las opciones sobre índices de India [2, 7]. Ese giro multiplicó por seis los ingresos y por diez el beneficio entre FY2022 y FY2026.',
    hitos: [
      { anio: '1875', hito: 'Fundación como asociación de intermediarios en Bombay [13].' },
      { anio: '1986', hito: 'Lanza el Sensex, el primer índice bursátil de India [13].' },
      { anio: '2017', hito: 'Salida a bolsa en la NSE (febrero) [13].' },
      { anio: '2023', hito: 'Relanzamiento de los derivados sobre el Sensex (15 de mayo) [2].' },
      { anio: '2025', hito: 'SEBI fija los vencimientos semanales en martes (NSE) y jueves (BSE) desde septiembre de 2025, tras limitarlos a uno por bolsa en noviembre de 2024 [7].' },
      { anio: '2026', hito: 'Subasta de cierre (3-ago), acuerdo con MSCI (19-ago), entrada en el Nifty 50 (30-sep) y cotización de la NSE en BSE (24-sep) [4, 7].' },
    ],
    confianza: 'Alta',
  },
  negocio: {
    descripcion: 'BSE es una bolsa de valores con cámara de compensación propia (BSE Clearing). Gana dinero con cada operación que se hace en su mercado: sobre todo opciones sobre el índice Sensex (el 74 % de los ingresos del 1T FY27), y además contado de acciones, bonos y la plataforma StAR MF, por la que pasan casi todas las órdenes de fondos de inversión de los distribuidores indios [2]. Cobra también cuotas a las más de 5.000 empresas que cotizan, alquila espacio para servidores junto a su motor (co-location) y vende datos e índices [1, 2]. Tiene el 15 % de CDSL, uno de los dos depositarios de valores de India, y controla las bolsas internacionales India INX e India ICC en GIFT City [2].',
    como_gana_dinero: 'Cobra una tasa por cada contrato negociado, sobre el valor de la prima de la opción (o del nominal en contado y futuros), a los miembros, que la repercuten a sus clientes [1]. Los costes son casi fijos (tecnología, personal, la contribución regulatoria a SEBI y la aportación al fondo de garantía), así que cada rupia de más volumen cae casi entera al beneficio: margen EBITDA del 64 % en FY2026 y del 67 % en el 1T FY27 [2]. El volumen depende de los operadores por cuenta propia y del minorista indio, que compra opciones con vencimiento muy corto; la regulación decide cuánto se puede negociar. La cotización y StAR MF son más estables y crecen con el ahorro de los hogares [1].',
    clientes: 'Los clientes directos son unos 1.283 miembros (intermediarios) [2]. Detrás, el volumen de opciones lo hacen sobre todo operadores por cuenta propia y algorítmicos y minoristas; los inversores extranjeros (≈ 650 activos) crecen [12]. No depende de un cliente concreto, pero sí de un tipo de operación (opciones semanales sobre índices) y de un regulador (SEBI). Poder de precios: limitado; SEBI vigila las tasas y obliga a cobrar lo mismo a todos los miembros.',
    confianza: 'Alta',
  },
  sector: {
    definicion: 'El mercado relevante son los ingresos de las bolsas indias: NSE, MCX (materias primas) y BSE. Con los últimos doce meses publicados suman ≈ 273.600 M INR: NSE ≈ 191.440 M, MCX ≈ 27.750 M y BSE 54.421 M [3]. NSE domina con ≈ 70 %; BSE tiene ≈ 20 %, casi todo de opciones sobre índices. No hay estadística oficial de este agregado: es estimación propia sumando las cuentas de las tres.',
    tamano: '≈ 273.600 M INR de ingresos de las bolsas indias (últimos doce meses) [3]',
    unidad_serie: 'millones de INR',
    serie: [
      { anio: 'LTM jun-2026', tamano: 273600 },
    ],
    tcac_historico_pct: null,
    tcac_previsto_pct: 12.0,
    cr5_pct: 100,
    estructura: 'Oligopolio',
    drivers: [
      { driver: 'Regulación de SEBI de los derivados para minoristas (vencimientos semanales, tamaño de contrato, márgenes)', efecto: '−', horizonte: 'Estructural', evidencia: 'Desde noviembre de 2024 un solo vencimiento semanal por bolsa; SEBI estudia suprimirlos [7].' },
      { driver: 'Impuestos y crédito a los operadores (STT desde abril de 2026, garantías bancarias del RBI desde julio de 2026)', efecto: '−', horizonte: 'Cíclico', evidencia: 'Jefferies calcula hasta −10 % de prima en un año por las normas del RBI [8].' },
      { driver: 'Ahorro de los hogares hacia bolsa (cuentas, fondos, salidas a bolsa)', efecto: '+', horizonte: 'Estructural', evidencia: '255 M de inversores registrados en BSE; StAR MF +28 % de órdenes [2, 12].' },
      { driver: 'Nuevos productos (índices sectoriales, MSCI, contratos mensuales)', efecto: '+', horizonte: 'Estructural', evidencia: 'Aprobaciones de SEBI para Focused Midcap, Sensex Next 30 y Focused IT; acuerdo con MSCI para estudiar derivados sobre sus índices; venta directa de datos al extranjero desde 2027 [4, 5, 6].' },
      { driver: 'Inversores extranjeros en derivados indios', efecto: '+', horizonte: 'Estructural', evidencia: '≈ 650 activos en BSE, objetivo 800 [12].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 4, justificacion: 'Duopolio con la NSE, que tiene el 70 % de la prima de opciones y la liquidez del Nifty [7].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Los grandes operadores por cuenta propia mueven el volumen de una bolsa a otra según el día de vencimiento.' },
      { fuerza: 'Poder de los proveedores', intensidad: 1, justificacion: 'Tecnología propia; sin proveedores críticos.' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Licencia de SEBI y liquidez; MSE (Metropolitan) lo intenta sin éxito.' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 2, justificacion: 'Los derivados extranjeros sobre India (GIFT Nifty) y los productos fuera de bolsa.' },
    ],
    ciclo: { posicion: 'Expansión', comentario: 'El volumen de opciones en India creció más de diez veces entre 2020 y 2024 y luego se frenó por la regulación (noviembre de 2024, mayo de 2025, agosto de 2026) [7]. BSE creció por cuota, no por mercado. Indicadores: prima diaria media, número de operadores activos, normas de SEBI.' },
    regulacion: 'Es el factor decisivo. SEBI (1) limitó en noviembre de 2024 los vencimientos semanales a un índice por bolsa, subió el tamaño mínimo de contrato y los márgenes del día de vencimiento; (2) movió los vencimientos a martes (NSE) y jueves (BSE) en 2025; (3) introdujo la subasta de cierre (CAS) desde el 3-ago-2026, que según la prensa recortó un 33 % los contratos del día de vencimiento de BSE en agosto, y la está revisando tras una consulta de septiembre [7, 9]. Su presidente dijo en septiembre de 2025 que se estudia acabar con los vencimientos semanales; la propuesta de mayo de 2026 aún conserva uno por bolsa [7]. El Gobierno subió el STT desde abril de 2026 y el RBI exige desde julio garantías bancarias más caras a los operadores por cuenta propia [8].',
    tendencias: 'Tres. (1) Del vencimiento semanal al mensual: el regulador empuja y BSE dice que sus contratos de más de dos semanas ya se han multiplicado por cinco desde enero de 2025 [12]. (2) Más productos y más inversores extranjeros (MSCI, índices sectoriales) [4, 6]. (3) Automatización de la negociación: los operadores algorítmicos ya hacen la mayor parte del volumen de opciones; la IA entra en la vigilancia del mercado y en los propios algoritmos, no en el papel de la bolsa.',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 20.0,
    posicion: 'Segunda bolsa de India. Estimación propia: ≈ 20 % de los ingresos de las bolsas indias [3]; en opciones sobre índices, ≈ 36 % de la prima diaria y ≈ 52 % de los contratos en agosto de 2026, según la prensa [7]; en fondos, la mayor plataforma de órdenes (StAR MF) [2].',
    competidores: [
      { nombre: 'National Stock Exchange of India', pais: 'India', ticker: 'NSE.BO', ingresos: 191440, cuota_pct: 70, margen_ebit_pct: C_['NSE.BO'].margen_ebitda_pct, comentario: 'Margen de EBITDA de Yahoo; domina contado, futuros y opciones sobre el Nifty. Cotiza en BSE desde el 24-sep-2026 [3].' },
      { nombre: 'Multi Commodity Exchange of India', pais: 'India', ticker: 'MCX.NS', ingresos: 27750, cuota_pct: 10, margen_ebit_pct: C_['MCX.NS'].margen_ebitda_pct, comentario: 'Materias primas; margen de EBITDA de Yahoo [3].' },
      { nombre: 'Metropolitan Stock Exchange', pais: 'India', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Tercera bolsa de valores; sin volumen relevante.' },
    ],
    foso: {
      veredicto: 'Estrecho',
      tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 4, evidencia: 'La liquidez atrae liquidez: ganó un tercio de la prima de opciones en dos años [7].' },
        { fuente: 'Costes de cambio', puntuacion: 2, evidencia: 'Los miembros operan en las dos bolsas; cambiar de mercado es barato.' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 4, evidencia: 'Licencia de bolsa y cámara (duopolio regulado) y el Sensex [1].' },
        { fuente: 'Ventaja en costes', puntuacion: 2, evidencia: 'Margen del 64-67 %, pero la NSE tiene más escala (82 %) [3].' },
        { fuente: 'Escala eficiente', puntuacion: 4, evidencia: 'El mercado indio solo admite dos bolsas de valores grandes.' },
      ],
    },
    amenazas: 'La amenaza más probable no es un competidor nuevo, sino que el regulador recorte el negocio de opciones semanales, del que viene casi todo el crecimiento [7]. La segunda, la NSE: puede mover sus vencimientos o lanzar productos que quiten el día de BSE, y desde septiembre de 2026 cotiza (más recursos y presión por crecer) [3]. La tercera, que la subasta de cierre o el STT reduzcan la actividad de los operadores por cuenta propia [8, 9].',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Lo material es de gobierno: integridad del mercado (vigilancia, manipulación en vencimientos), ciberseguridad y continuidad del servicio, y la protección del inversor minorista (SEBI estima que nueve de cada diez minoristas pierden en opciones) [1, 11].',
    controversias: 'Orden de GST de 72,5 M recurrida (diciembre de 2025) [nota A]. En agosto de 2026 SEBI prohibió operar a dos entidades por manipular un vencimiento del Sensex (13-ago) e intervino 3,67 crore: el caso no es contra BSE, pero muestra el riesgo regulatorio del día de vencimiento [7]. Calificación ESG comunicada a la NSE en octubre de 2026 [10].',
    confianza: 'Media',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'sector', campo: 'Serie histórica del mercado de ingresos de las bolsas indias', tipo: 'Complemento', intentos: '1) Informe anual de BSE (datos de volumen, no de ingresos del sector); 2) cuentas de NSE (cotiza desde sep-2026; solo LTM en Yahoo); 3) SEBI (estadística de volúmenes)', decision: 'Omitido; solo el LTM' },
    { seccion: 'esg', campo: 'Calificación ESG concreta', tipo: 'Complemento', intentos: '1) Anuncio a la NSE (no da la nota en el texto extraído); 2) informe anual; 3) web de la empresa', decision: 'Omitido' },
  ],
};
guarda('B', B);

// ================================================================ C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Annual Report 2025-26: informe de gobierno corporativo, remuneración de consejeros y altos directivos, informe secretarial', editor: 'BSE Limited / NSE', tipo: 'Primaria', fecha: '2026-07-23', url: URL.ar26 },
  { id: 2, titulo: 'Investor Presentation 1T FY27: consejo, equipo directivo y accionariado a junio de 2026', editor: 'BSE Limited / NSE', tipo: 'Primaria', fecha: '2026-08-04', url: URL.pres1q27 },
  { id: 3, titulo: 'Anuncio a la NSE: resultados de la junta de 2026 (informe del escrutador)', editor: 'BSE Limited / NSE', tipo: 'Primaria', fecha: '2026-08-19', url: URL.junta },
  { id: 4, titulo: 'Anuncio a la NSE: salida del consejo de junio de 2026 (consejeros ejecutivos de las verticales)', editor: 'BSE Limited / NSE', tipo: 'Primaria', fecha: '2026-06-16', url: URL.consejoJun },
  { id: 5, titulo: 'Anuncio a la NSE: cambios en el consejo y en la dirección (diciembre de 2025)', editor: 'BSE Limited / NSE', tipo: 'Primaria', fecha: '2025-12-17', url: URL.consejoDic },
  { id: 6, titulo: 'Anuncio a la NSE: nombramiento de consejero de interés público (diciembre de 2025)', editor: 'BSE Limited / NSE', tipo: 'Primaria', fecha: '2025-12-16', url: URL.directorDic },
  { id: 7, titulo: 'Anuncio a la NSE: nuevo auditor (KKC & Associates LLP) y más participación en IIBH', editor: 'BSE Limited / NSE', tipo: 'Primaria', fecha: '2026-08-04', url: URL.auditor },
  { id: 8, titulo: 'Anuncio a la NSE: votación postal (julio de 2026)', editor: 'BSE Limited / NSE', tipo: 'Primaria', fecha: '2026-07-24', url: URL.postal },
  { id: 9, titulo: 'Kotak Neo: Goldman Sachs y BNP Paribas venden 68,33 lakh acciones (1,67 %) a ≈ 3.200 INR al entrar en el Nifty 50', editor: 'Kotak Securities', tipo: 'Prensa', fecha: '2026-09-30', url: URL.kotak },
];
const C = {
  _estado: 'completa',
  directivos: {
    equipo: [
      { nombre: 'Sundararaman Ramamurthy', cargo: 'Consejero delegado (MD & CEO)', desde: '2023', participacion_pct: 0.0, trayectoria: 'Más de 40 años en mercados y banca; antes MD y COO de Bank of America en India y, durante más de 20 años, directivo de la NSE desde su fundación [2].' },
      { nombre: 'Deepak Goel', cargo: 'Director financiero', desde: null, participacion_pct: 0.0, trayectoria: 'Director financiero [2].' },
      { nombre: 'Gopalan S Raghavan', cargo: 'Consejero ejecutivo, vertical 2 (regulación, cumplimiento, riesgos)', desde: '2026', participacion_pct: 0.0, trayectoria: 'Más de 30 años en infraestructura de mercado; exconsejero ejecutivo de NSDL y del equipo fundador de SEBI [2, 4].' },
      { nombre: 'Saurabh Shukla', cargo: 'Consejero ejecutivo, vertical 1', desde: '2026', participacion_pct: 0.0, trayectoria: 'Desde el 4-sep-2026 [4].' },
      { nombre: 'Vishal Bhat', cargo: 'Secretario del consejo', desde: null, participacion_pct: 0.0, trayectoria: '[2]' },
    ],
    historial_guidance: [],
    comentario: 'BSE no da guías numéricas. El consejero delegado, Ramamurthy, llegó en enero de 2023 desde Bank of America y la NSE, y cuatro meses después relanzó los derivados del Sensex: es el responsable del giro [2]. Como toda bolsa india, la estructura la fija SEBI: dos consejeros ejecutivos por verticales (negocio y regulación), nombrados en 2026, y un director de regulación (Geetha Gangadharan) y otro de riesgos (Sanjay Jain) nuevos en 2026 [2, 4, 5]. No hay plan de sucesión publicado; el mandato del consejero delegado lo aprueba SEBI.',
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      { nombre: 'Prof. Subhasis Chaudhuri', cargo: 'Presidente (consejero de interés público)', tipo: 'Independiente', desde: '2022', comisiones: null },
      { nombre: 'Sundararaman Ramamurthy', cargo: 'Consejero delegado', tipo: 'Ejecutivo', desde: '2023', comisiones: null },
      { nombre: 'Justice (Retd.) Shiavax Jal Vazifdar', cargo: 'Consejero de interés público', tipo: 'Independiente', desde: '2022', comisiones: null },
      { nombre: 'Dr. Padmini Srinivasan', cargo: 'Consejera de interés público', tipo: 'Independiente', desde: '2023', comisiones: null },
      { nombre: 'Shamanna Balasubramanya', cargo: 'Consejero de interés público', tipo: 'Independiente', desde: '2025', comisiones: null },
      { nombre: 'Rajiv Bansal', cargo: 'Consejero de interés público', tipo: 'Independiente', desde: '2025', comisiones: null },
      { nombre: 'Dr. Santanu Paul', cargo: 'Consejero de interés público', tipo: 'Independiente', desde: '2026', comisiones: null },
      { nombre: 'Jagannath Mukkavilli', cargo: 'Consejero no independiente (ex LIC)', tipo: 'Dominical', desde: '2024', comisiones: null },
      { nombre: 'Gopalan S Raghavan', cargo: 'Consejero ejecutivo', tipo: 'Ejecutivo', desde: '2026', comisiones: null },
      { nombre: 'Saurabh Shukla', cargo: 'Consejero ejecutivo', tipo: 'Ejecutivo', desde: '2026', comisiones: null },
    ],
    presidente_ceo_separados: true,
    presidente_ejecutivo: false,
    consejero_coordinador: false,
    una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false,
    variable_ligado_rentabilidad: false,
    auditoria_independiente: true,
    insiders_sin_operaciones: true,
    accionista_control: false,
    presidente_vinculado_control: false,
    cambios_cupula_24m: 0,
    voto_remuneracion_pct: null,
    voto_remuneracion_contra_pct: null,
    voto_remuneracion_contra_libre_pct: null,
    voto_cupula_pct: 83.37,
    remuneracion_ceo: { anio: 'FY2026', total: 86.49, fijo: 67.6, variable_corto: 19.0, variable_largo: 0, ratio_salario_medio: 79.16 },
    remuneracion: 'En FY2026 el consejero delegado cobró 86,49 M INR: ≈ 67,6 M fijos y ≈ 19,0 M de variable, del que la mitad se aplaza tres años como manda SEBI para las infraestructuras de mercado; 79 veces el sueldo mediano [1]. No hay opciones sobre acciones: las normas de SEBI (SECC) no permiten pagar a los directivos clave con acciones ni ligar el variable al beneficio de la bolsa [1]. La remuneración no se vota en la junta [1].',
    accionistas: [
      { nombre: 'Life Insurance Corporation of India', pct: 5.57, tipo: 'Institucional', variacion: '[2]' },
      { nombre: 'Kotak Flexicap Fund', pct: 1.79, tipo: 'Institucional', variacion: '[2]' },
      { nombre: 'Siddharth Balachandran', pct: 1.70, tipo: 'Particular', variacion: '[2]' },
      { nombre: 'SBI Life Insurance', pct: 1.65, tipo: 'Institucional', variacion: '[2]' },
      { nombre: 'Tata AIA Life Insurance', pct: 1.43, tipo: 'Institucional', variacion: '[2]' },
      { nombre: 'Inversores extranjeros y no residentes', pct: 24.7, tipo: 'Institucional', variacion: 'Goldman Sachs y BNP Paribas vendieron un 1,67 % el 30-sep-2026 [9]' },
      { nombre: 'Fondos de inversión indios', pct: 11.8, tipo: 'Institucional', variacion: '[2]' },
      { nombre: 'Particulares', pct: 33.9, tipo: 'Flotante', variacion: '[2]' },
      { nombre: 'Miembros (intermediarios)', pct: 7.7, tipo: 'Otros', variacion: '[2]' },
    ],
    insiders: [],
    control_y_defensas: 'Sin accionista de control: el 100 % es «público» [2]. La ley (SECC) limita a un 5 % lo que puede tener cada accionista de una bolsa (15 % para bolsas, aseguradoras y bancos de propiedad pública como LIC) y obliga a que la mayoría del consejo sean consejeros de interés público nombrados con aprobación de SEBI; el presidente lo es [1, 2]. No hay blindajes; de hecho, nadie puede comprar la empresa.',
    alertas: [
      'El consejero no independiente Jagannath Mukkavilli (ex LIC) fue reelegido en la junta de 2026 con un 16,63 % de votos en contra [3].',
      'Gobierno determinado por el regulador: SEBI aprueba consejeros, directivos clave y su remuneración [1].',
    ],
    confianza: 'Alta',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'Voto de la junta sobre la remuneración', tipo: 'Complemento', intentos: '1) Informe del escrutador de la junta de 2026 (no hay punto de remuneración); 2) informe anual; 3) votación postal de julio de 2026', decision: 'No aplica: la remuneración no se vota' },
    { seccion: 'gobierno', campo: 'Compras y ventas de directivos', tipo: 'Complemento', intentos: '1) Anuncios de la NSE (sin comunicaciones de directivos en 12 meses); 2) informe anual (los directivos no tienen acciones relevantes); 3) prensa', decision: 'Omitido' },
  ],
};
guarda('C', C);

// ================================================================ D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de BSE.NS y del Nifty 50 (^NSEI); cierres de cada ejercicio, beta y volatilidad', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/BSE.NS' },
  { id: 2, titulo: 'BSE.NS: consenso de BPA e ingresos de FY2027 y FY2028 (19 analistas) y precio objetivo medio (earningsTrend, financialData)', editor: 'Yahoo Finance', tipo: 'Analistas', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/BSE.NS/analysis' },
  { id: 3, titulo: 'Fichas de comparables (precio, capitalización, valor empresa, ventas y EBITDA de los últimos doce meses, estimaciones de BPA)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/NSE.BO' },
  { id: 4, titulo: 'Long-Term Government Bond Yields: 10-year for India (INDIRLTLT01STM), septiembre de 2026: 7,06 %', editor: 'OECD vía FRED (Federal Reserve Bank of St. Louis)', tipo: 'Datos de mercado', fecha: '2026-10-01', url: 'https://fred.stlouisfed.org/series/INDIRLTLT01STM' },
  { id: 5, titulo: 'Tipos de cambio USDINR, EURINR, GBPINR y HKDINR, 20-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/USDINR=X' },
  { id: 6, titulo: 'Implied ERP by month: octubre de 2026, 4,20 %', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 7, titulo: 'CDSL (CDSL.NS): precio de 1.270 INR; BSE tiene 31,35 M de acciones (15 %)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/CDSL.NS' },
  { id: 8, titulo: 'Annual Report 2025-26 (participadas, CDSL al coste, acciones en suspenso)', editor: 'BSE Limited / NSE', tipo: 'Primaria', fecha: '2026-07-23', url: URL.ar26 },
  { id: 9, titulo: 'Business Today: «BSE shares enter Nifty club, stock tanks 4 %; what consensus target suggests» (objetivo de consenso 3.787,68 INR)', editor: 'Business Today', tipo: 'Prensa', fecha: '2026-09-30', url: URL.btNifty },
  { id: 10, titulo: 'Business Today: «BSE share price targets: Buy, sell or hold? What Jefferies, UBS, JPMorgan say»', editor: 'Business Today', tipo: 'Prensa', fecha: '2026-08-05', url: URL.btAgo },
  { id: 11, titulo: 'Business Today: Jefferies baja a Infraponderar (2.940 INR) y recorta el BPA de FY2027-FY2029 un 5-12 %', editor: 'Business Today', tipo: 'Prensa', fecha: '2026-08-17', url: URL.btJef },
  { id: 12, titulo: 'Business Standard: Jefferies y Nuvama rebajan por la subasta de cierre; Nuvama Mantener 3.240 INR', editor: 'Business Standard', tipo: 'Prensa', fecha: '2026-08-18', url: URL.bsCas },
  { id: 13, titulo: 'Outlook Business: «BSE Shares Extend Fall, Down 9 % In A Week After Broker Downgrades»', editor: 'Outlook Business', tipo: 'Prensa', fecha: '2026-08-21', url: URL.ob9 },
  { id: 14, titulo: 'Kotak Neo: ventas en bloque de 2.186 crore al entrar en el Nifty 50', editor: 'Kotak Securities', tipo: 'Prensa', fecha: '2026-09-30', url: URL.kotak },
  { id: 15, titulo: 'Equentis: Macquarie ve un 28 % de potencial (Outperform, 4.000 INR)', editor: 'Equentis', tipo: 'Prensa', fecha: '2026-09-30', url: URL.equentis },
  { id: 16, titulo: 'Interactive Brokers, base de conocimiento: acceso a la NSE solo para no residentes indios (NRI) e intermediarios', editor: 'Interactive Brokers', tipo: 'Otros', fecha: '2026-10', url: 'https://www.interactivebrokers.com/en/index.php?f=1152' },
];
const cl = Object.fromEntries(bolsa.cierres_ejercicio.map((x) => [x.anio, x.precio_cierre]));
const D = {
  _estado: 'completa',
  identificacion: {
    nombre: 'BSE Limited', nombre_corto: 'BSE', ticker: 'BSE', isin: 'INE118H01025', mercado: 'National Stock Exchange of India (NSE)', indice_referencia: 'Nifty 50',
    pais: 'India', pais_iso: 'IN', sector: 'Financials', industria: 'Capital Markets (bolsas y datos)', sede: 'Bombay (Maharashtra)', fundacion: '1875', empleados: null, web: 'https://www.bseindia.com',
    precio: bolsa.identificacion.precio, fecha_precio: bolsa.identificacion.fecha_precio, acciones: 411.98, capitalizacion_publicada: Math.round(bolsa.identificacion.precio * 406.13), free_float_pct: 100,
    max_52s: bolsa.identificacion.max_52s, min_52s: bolsa.identificacion.min_52s, volumen_medio_diario: '≈ 15.263 M INR/día (3 meses)', proximos_resultados: null,
  },
  consenso: {
    guidance: 'BSE no da guías de ingresos ni de beneficio (nota A [7]).',
    estimaciones: [
      { periodo: 'FY2027e', ingresos: 63231, ebitda: null, ebit: null, bpa: 76.88, dpa: null, fuente: 'Yahoo Finance, 19 analistas [2]' },
      { periodo: 'FY2028e', ingresos: 72490, ebitda: null, ebit: null, bpa: 88.50, dpa: null, fuente: 'Yahoo Finance [2]' },
    ],
    recomendaciones: { n_analistas: 19, comprar: null, mantener: null, vender: null, po_medio: 3698, po_min: 2820, po_max: 4500 },
    revisiones: 'A la baja desde agosto. Jefferies bajó a Infraponderar con 2.940 INR y recortó el BPA de FY2027-FY2029 un 5-12 % por las normas del RBI y la subasta de cierre (17-ago) [11]; Nuvama a Mantener con 3.240 (−6,3 % de BPA de FY2027 y −15 % de FY2028) [12]; Bernstein está en Infraponderar con 2.820 [13]. Del lado comprador: Macquarie Outperform 4.000, JPMorgan Sobreponderar 3.950, HDFC Securities Añadir 3.850, MOFSL Neutral 3.900, UBS 4.500 [10, 15]. Objetivo medio de consenso 3.787,68 INR según Business Today (30-sep) y 3.698 según Yahoo [2, 9].',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    ...bolsa.bolsa,
    posicion_corta_pct: null,
    comentario: 'La acción (ajustada por las dos ampliaciones gratuitas) pasó de 143,65 INR en marzo de 2023 a un máximo de 4.446,8 el 27-may-2026: se multiplicó por 31 con el relanzamiento de los derivados [1]. Desde el máximo ha caído un 25 %, hasta 3.336 INR (cierre del 19-oct). Las caídas: agosto de 2026 (subasta de cierre, normas del RBI y rebajas de Jefferies y Nuvama; −9 % en una semana) y el 30-sep (−4 % el día de entrada en el Nifty 50, con ventas en bloque de Goldman Sachs y BNP Paribas) [13, 14]. En doce meses gana un 33,8 % frente a −11,4 % del Nifty 50 [1].',
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: ['FY2022', 'FY2023', 'FY2024', 'FY2025', 'FY2026'].map((a) => ({ anio: a, precio_cierre: cl[a] ?? null, ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    comentario: 'Con el BPA real del año siguiente, BSE cotizó a 10,3 veces en marzo de 2021, 58,8 en 2022 (antes de la caída del beneficio de FY2023), 14,4 en 2023 (antes de los derivados), 26,2 en 2024, 30,3 en 2025 y unas 36 veces en marzo de 2026 sobre nuestro BPA de FY2027e [1, nota A]. Hoy, a 3.336 INR, son unas 41 veces nuestro BPA de FY2028e: el múltiplo más alto de su historia reciente, por encima de la NSE (37,5) y de las bolsas mundiales (16-23) [3].',
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Bolsas e infraestructuras de mercado cotizadas: las indias (NSE, MCX, CDSL, CAMS) y las grandes mundiales (CME, ICE, Cboe, Nasdaq, HKEX, Deutsche Börse, LSEG). PER de los próximos 12 meses = precio ÷ media de los BPA de Yahoo del ejercicio en curso y del siguiente, ponderada por los meses que quedan. Cboe y Deutsche Börse sin crecimiento ni EV/EBITDA adelantado: Yahoo da sus ingresos brutos y el consenso netos.',
    empresas: comp.empresas.map(({ _divisa, _precio, _eps_ntm, _w0, _roe_pct, ...e }) => e),
    comentario: 'Las infraestructuras indias cotizan a 28-46 veces el BPA de los próximos doce meses (NSE 37,5; MCX 41,1; CDSL 45,8) y las mundiales a 16-23 veces; la mediana de las once es 23,0 [3]. BSE, a ≈ 41 veces nuestro BPA de FY2028e y ≈ 45 veces el de FY2027e, está en lo alto del grupo indio con un margen (64-67 %) inferior al de la NSE (82 %) y un crecimiento que depende de la regulación.',
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2025-12', objetivo: 'Ebix Insurance Broking (40 %)', comprador: 'Venta de BSE', ev: null, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: true, comentario: 'Venta de la participación; sin múltiplo publicado [8].' },
      { fecha: '2023-06', objetivo: 'CDSL (5 % vendido)', comprador: 'Varios', ev: null, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: true, comentario: 'Venta en bolsa a precio de mercado [8].' },
    ],
    comentario: 'No hay compras de bolsas comparables con múltiplo publicado en India: la propiedad de las bolsas está limitada por ley (5 % por accionista). No se usan para el valor.',
    confianza: 'Baja',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'transacciones', campo: 'Múltiplos de operaciones de bolsas', tipo: 'Complemento', intentos: '1) Informe anual de BSE; 2) prensa de operaciones mundiales (LSEG-Refinitiv, ICE-Black Knight: otro negocio); 3) Yahoo', decision: 'Omitido' },
    { seccion: 'consenso', campo: 'Consenso de FY2029e y de EBITDA', tipo: 'Complemento', intentos: '1) Yahoo (solo dos ejercicios); 2) prensa (objetivos, no BPA de FY2029); 3) MarketScreener (sin acceso a la tabla)', decision: 'Omitido' },
    { seccion: 'bolsa', campo: 'Posición corta', tipo: 'Complemento', intentos: '1) NSE (sin saldo agregado público); 2) Yahoo; 3) prensa', decision: 'Omitido' },
  ],
};
guarda('D', D);

// ================================================================ E. Sentimiento
const fE = [
  { id: 1, titulo: 'ValuePickr, hilo «BSE Ltd» (posts de agosto a octubre de 2026: prima de septiembre y octubre, efecto de la CAS)', editor: 'ValuePickr', tipo: 'Foros y redes', fecha: '2026-10-17', url: URL.vp },
  { id: 2, titulo: 'Business Today: entrada en el Nifty 50 y objetivo de consenso', editor: 'Business Today', tipo: 'Prensa', fecha: '2026-09-30', url: URL.btNifty },
  { id: 3, titulo: 'Business Standard: mínimo de cuatro meses tras las rebajas por la CAS', editor: 'Business Standard', tipo: 'Prensa', fecha: '2026-08-18', url: URL.bsCas },
  { id: 4, titulo: 'Outlook Business: −9 % en una semana tras las rebajas', editor: 'Outlook Business', tipo: 'Prensa', fecha: '2026-08-21', url: URL.ob9 },
];
const E = {
  _estado: 'completa',
  sentimiento: {
    tono: 'Dividido',
    tendencia: 'Empeora',
    revisadas: [
      { plataforma: 'ValuePickr (hilo de BSE)', fecha: '2026-10', n_comentarios: 25, tono: 'Dividido', resumen: 'Se sigue la prima diaria mes a mes: tras la caída de agosto con la subasta de cierre (≈ 18.700 crore), los foreros ven recuperación en septiembre (≈ 23.200) y en la primera quincena de octubre; estiman que los ingresos de derivados del 2T FY27 bajarán un 18-20 % frente al 1T. Unos ven la caída como oportunidad por la entrada en el Nifty 50 y la cotización de la NSE; otros temen que SEBI suprima los vencimientos semanales [1].' },
      { plataforma: 'Prensa financiera india (Business Today, Business Standard, Outlook Business)', fecha: '2026-09', n_comentarios: null, tono: 'Negativo', resumen: 'Agosto: rebajas de Jefferies y Nuvama y −9 % en una semana; septiembre: entrada en el Nifty 50 con ventas en bloque y −4 % el día del cambio; objetivo de consenso ≈ 3.790 INR [2, 3, 4].' },
    ],
    temas: [
      { tema: 'Regulación de los vencimientos semanales', postura: 'Bajista', peso: 'Alto', contraste: 'Riesgo real: SEBI lo ha dicho en público; la propuesta de mayo de 2026 aún los conserva (nota B).' },
      { tema: 'Subasta de cierre y normas del RBI', postura: 'Bajista', peso: 'Alto', contraste: 'Agosto bajó; septiembre y octubre recuperan según el foro, sin cifra oficial aún (nota A).' },
      { tema: 'Nifty 50 y flujos pasivos', postura: 'Alcista', peso: 'Medio', contraste: 'Ya ocurrió (30-sep); los vendedores fueron fondos que replicaban otros índices (nota C).' },
      { tema: 'Valoración: más cara que la NSE', postura: 'Bajista', peso: 'Medio', contraste: 'Cierto: ≈ 41 veces nuestro BPA de FY2028e frente a 37,5 la NSE (nota D).' },
    ],
    lectura: 'El inversor particular sigue el volumen día a día y está dividido: la acción ha subido 31 veces en tres años y medio y la discusión es si la regulación ya ha hecho todo el daño. La prensa y los analistas giraron a negativo en agosto. Coincide con los datos en que el 2T FY27 será peor que el 1T y en que el riesgo grande es regulatorio, no de competencia.',
    confianza: 'Media',
  },
  fuentes: fE,
  huecos: [
    { seccion: 'sentimiento', campo: 'Reddit y X', tipo: 'Complemento', intentos: '1) API de Reddit (bloqueada desde este entorno); 2) búsqueda web (sin hilos recientes con datos); 3) ValuePickr como sustituto', decision: 'Omitido' },
  ],
};
guarda('E', E);
console.log('Notas A-E escritas; LTM BPA', A.financieros.ltm.bpa, '; comparables', comp.empresas.length);
