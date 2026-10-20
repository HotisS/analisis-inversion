// Escribe las notas A-E de SILICON2 Co., Ltd. (257720.KQ, KOSDAQ; corte 2026-10-20, cierre del 20-oct en Seúl).
// Fuentes primarias: DART (dart.fss.or.kr, visor de secciones con notas/dart.mjs): informes anuales (사업보고서) de 2025
// (rcp 20260320001024, con 2024 y 2023), 2023 (20240320000377, con 2022 y 2021) y 2022 (20230322000608); informe semestral
// de 2026 (20260814003895); trimestrales 1T25, 3T25 y 3T24; avisos de la KRX (RCPS de CVC, almacén de Yongin, junta del
// 1-oct, recompra del 19-oct, préstamo, conversión de las RCPS de 2025) y declaraciones de participaciones y de directivos.
// Consenso y objetivos: FnGuide (Naver WiseReport). Bolsa y comparables: Yahoo Finance. Prensa coreana y foro de Naver.
// Cada nota cita solo con [n] de su propia lista.
// Ejecutar: node informes/silicon2-2026-10-20/notas/construir-notas.mjs
// Ejercicio natural (31-dic). Cifras en millones de KRW salvo que se diga otra cosa.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const DART = (rcp) => `https://dart.fss.or.kr/dsaf001/main.do?rcpNo=${rcp}`;
const WR = (p) => `https://navercomp.wisereport.co.kr/v2/company/${p}.aspx?cmp_cd=257720`;
const bolsa = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const compsRaw = JSON.parse(fs.readFileSync(path.join(dir, 'comparables-yahoo-raw.json'), 'utf8'));
const fx = Object.fromEntries(compsRaw.filter((c) => /=X$/.test(c.s)).map((c) => [c.s, c.price]));
const USDKRW = fx['KRW=X']; // 1.328,46 (Yahoo, 20-oct-2026)
const JPYKRW = fx['JPYKRW=X']; // 8,377
const EURKRW = fx['EURKRW=X']; // 1.488,2
const PRECIO = 32800; // cierre del 20-oct-2026 en el KOSDAQ (Yahoo, regularMarketTime 15:30 KST)

// Prensa (Naver News y webs de los diarios), descargada el 20-oct-2026 en docs/news/.
const N = {
  hana: { titulo: '[마켓 언박싱] 실리콘투, 매출 45% 성장 전망에도 낮아진 이익 눈높이…환율 부담 (Hana: objetivo de 59.000 a 52.000; beneficio operativo del 3T26 de 78.100 M frente a 93.300 M antes)', editor: 'Socialvalue', fecha: '2026-10-14', url: 'https://www.socialvalue.kr/news/view/1065597777056081' },
  wonko: { titulo: '"요즘 K 붙으면 영 불안한데"…주가 조정받은 뷰티·푸드 대표주들 (cosmética y alimentación coreanas corrigen por el won)', editor: 'Maeil Business', fecha: '2026-10-04', url: 'https://www.mk.co.kr/article/12168202' },
  nh: { titulo: '실리콘투, 환율이 안정된다면 (NH: un won un 5 % más fuerte resta ≈ 2,4 puntos de margen; objetivo de 58.000)', editor: 'Hankyung Magazine', fecha: '2026-10-09', url: 'https://magazine.hankyung.com/business/article/202610080562b' },
  etoday: { titulo: '월 수출 12억달러 뚫은 화장품…환율·용기난에 3분기 \'실적 명암\' (exportaciones de cosmética, won y escasez de envases en el 3T26)', editor: 'Etoday', fecha: '2026-10-17', url: 'https://www.etoday.co.kr/news/view/2636582' },
  bizwatch: { titulo: '[인사이드 스토리] 주가 \'급락\'한 에이피알…이유는 "너무 잘 팔려서" (APR: venta directa en Europa y logística)', editor: 'Bizwatch', fecha: '2026-10-15', url: 'https://news.bizwatch.co.kr/article/consumer/2026/10/15/0025' },
  moida: { titulo: '실리콘투 K뷰티 편집숍 \'모이다\' 출점 속도, 김성운 \'유럽판 올리브영\' 만들기 (tiendas moida: ≈ 30 abiertas, más de 100 en 2027)', editor: 'BusinessPost', fecha: '2026-10-07', url: 'https://www.businesspost.co.kr/BP?command=article_view&num=448812' },
  kiwoom: { titulo: '키움증권 "실리콘투 매출 성장세 지속, 유럽·라틴아메리카 유통망 확대 수혜" (Kiwoom: objetivo de 65.000 a 58.000; 3T26 de 67.900 M de beneficio operativo)', editor: 'BusinessPost', fecha: '2026-10-13', url: 'https://www.businesspost.co.kr/BP?command=article_view&num=449142' },
  inv: { titulo: '"만들고 나르고 바쁘다 바빠"…K뷰티 열풍에 생산·물류 \'확장전\' (almacenes de Silicon2 en Europa: de 2.762 m² a 20.464 m²)', editor: 'Edaily', fecha: '2026-09-17', url: 'https://www.edaily.co.kr/News/Read?newsId=04408326645581104&mediaCodeNo=257' },
  q3: { titulo: '잘 팔렸지만 환율 하락에 \'발목\'…K뷰티, 3분기 눈높이 하향 (exportaciones de cosmética del 3T26: 3.379 M USD, +38,2 %; Europa 43,1 % y Norteamérica 21,7 % de las ventas de Silicon2)', editor: 'Edaily', fecha: '2026-10-19', url: 'https://www.edaily.co.kr/News/Read?newsId=04267286645614560&mediaCodeNo=257' },
  cvc: { titulo: '실리콘투, CVC측 2인 기타비상무이사 선임 주총 승인 (junta del 1-oct: dos consejeros de CVC)', editor: 'Smart Today', fecha: '2026-10-01', url: 'https://www.smarttoday.co.kr/ko-kr/articles/112206' },
  goodai: { titulo: '전대미문 불장서 추락한 실리콘투…증권가 매수 권한 이유 (Goodai Global compra Hansung USA; sus marcas eran el 23,6 % de las ventas del 3T25)', editor: 'Hankyung', fecha: '2026-02-28', url: 'https://www.hankyung.com/article/2026022810386' },
  sedaily: { titulo: '판매부터 유통·큐레이션까지 다 한다…저변 확대하는 K뷰티 (distribuidores que también venden y curan: moida)', editor: 'Seoul Economic Daily', fecha: '2026-08-03', url: 'https://www.sedaily.com/article/20074768' },
  panico: { titulo: '코스닥 \'패닉\'...바이오·2차전지·반도체·로봇주 \'폭락\' (4-mar-2026: el KOSDAQ se hunde por Oriente Medio)', editor: 'Choice News', fecha: '2026-03-04', url: 'http://www.choicenews.co.kr/news/articleView.html?idxno=161861' },
  aprnh: { titulo: '에이피알, 채널 다변화로 글로벌 빠르게 침투…목표가 상향-NH (APR diversifica canales y vende directo fuera de Corea)', editor: 'Hankyung', fecha: '2026-03-05', url: 'https://www.hankyung.com/article/2026030599956' },
};
const fuenteN = (id, k, tipo = 'Prensa') => ({ id, ...N[k], tipo });

// ================================================================ A. Cuentas
const fA = [
  { id: 1, titulo: '사업보고서 2025 (informe anual): estados consolidados K-IFRS de 2025, 2024 y 2023 auditados por Shinwoo (신우회계법인), notas (gastos, amortizaciones, flujos), ventas por canal (mayorista, venta al público, fulfillment) y por región, clientes principales, dividendos, consejo y remuneración', editor: 'Silicon2 / DART (FSS)', tipo: 'Primaria', fecha: '2026-03-20', url: DART('20260320001024') },
  { id: 2, titulo: '사업보고서 2023 (informe anual): estados consolidados de 2023, 2022 y 2021, ventas por canal, historia y filiales', editor: 'Silicon2 / DART (FSS)', tipo: 'Primaria', fecha: '2024-03-20', url: DART('20240320000377') },
  { id: 3, titulo: '반기보고서 2026 (informe semestral, revisión limitada): estados consolidados a 30-jun-2026, 2T26 y 1S26, gasto por naturaleza, flujos, ventas por región, accionistas', editor: 'Silicon2 / DART (FSS)', tipo: 'Primaria', fecha: '2026-08-14', url: DART('20260814003895') },
  { id: 4, titulo: '사업보고서 2022 (informe anual): cuentas de 2022 y 2021', editor: 'Silicon2 / DART (FSS)', tipo: 'Primaria', fecha: '2023-03-22', url: DART('20230322000608') },
  { id: 5, titulo: '분기보고서 1T25 (con el 1T24 comparativo)', editor: 'Silicon2 / DART (FSS)', tipo: 'Primaria', fecha: '2025-05-12', url: DART('20250512000093') },
  { id: 6, titulo: '분기보고서 3T25 (3T25 y 9M25)', editor: 'Silicon2 / DART (FSS)', tipo: 'Primaria', fecha: '2025-11-13', url: DART('20251113000448') },
  { id: 7, titulo: '분기보고서 3T24 (con el 3T23 y 9M23 comparativos)', editor: 'Silicon2 / DART (FSS)', tipo: 'Primaria', fecha: '2024-11-14', url: DART('20241114000973') },
  { id: 8, titulo: '연결재무제표기준영업(잠정)실적 (resultados provisionales del 2T26)', editor: 'Silicon2 / KRX', tipo: 'Primaria', fecha: '2026-08-12', url: DART('20260812900140') },
  { id: 9, titulo: '주요사항보고서 (전환상환우선주 발행결정): 6.666.666 RCPS a 45.000 KRW (300.000 M) a Starlink Investment L.P. (CVC); conversión 1:1 desde el 15-sep-2027; reembolso a petición del inversor del 15-sep-2029 al 15-sep-2036 al precio de emisión más un 2 % anual compuesto', editor: 'Silicon2 / DART (FSS)', tipo: 'Primaria', fecha: '2026-08-18', url: DART('20260818000126') },
  { id: 10, titulo: '유상증자 (RCPS de CVC: pago recibido el 15-sep-2026)', editor: 'Silicon2 / KRX', tipo: 'Primaria', fecha: '2026-09-15', url: DART('20260915900386') },
  { id: 11, titulo: '유형자산 취득결정 (almacén logístico de Yongin: 55.034 M, 43.972 m²) y 정정 (pago completado el 7-oct-2026)', editor: 'Silicon2 / KRX', tipo: 'Primaria', fecha: '2026-10-07', url: DART('20261007900302') },
  { id: 12, titulo: '자기주식취득 신탁계약 체결 결정 (fideicomiso de recompra de 5.000 M con Samsung Securities; autocartera previa de 123.200 acciones)', editor: 'Silicon2 / DART (FSS)', tipo: 'Primaria', fecha: '2026-10-19', url: DART('20261019000068') },
  { id: 13, titulo: '단기차입금 증가 결정 (préstamo a corto de 45.000 M con garantía inmobiliaria)', editor: 'Silicon2 / KRX', tipo: 'Primaria', fecha: '2026-05-06', url: DART('20260506900861') },
  { id: 14, titulo: '전환청구권 행사 (conversión de las RCPS de 2025 de Silk SPV: 4.404.344 acciones)', editor: 'Silicon2 / KRX', tipo: 'Primaria', fecha: '2026-04-24', url: DART('20260424900593') },
  { id: 15, titulo: 'Consenso anual y trimestral, ratios históricos', editor: 'FnGuide (Naver WiseReport)', tipo: 'Analistas', fecha: '2026-10-19', url: WR('c1050001') },
  fuenteN(16, 'hana'),
  fuenteN(17, 'nh'),
  fuenteN(18, 'inv'),
];

// Cuenta por función (K-IFRS). EBITDA = beneficio operativo + amortización (inmovilizado, derecho de uso e intangibles, de la
// nota de flujos). resultado_financiero = BAI − beneficio operativo (incluye diferencias de cambio y resultados de asociadas).
// BPA diluido publicado (ajustado por la ampliación liberada 1:5 de 2022); acciones diluidas = beneficio ÷ BPA diluido.
const cuenta = [
  { periodo: '2021', ingresos: 131002, coste_ventas: 92316, gastos_generales: 29927, ebitda: 11175, amortizaciones: 2416, ebit: 8759, resultado_financiero: 1504, bai: 10263, impuestos: 2009, minoritarios: 0, beneficio_neto: 8254, gastos_financieros: 249, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 149, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: 55.34 },
  { periodo: '2022', ingresos: 165272, coste_ventas: 112513, gastos_generales: 38520, ebitda: 16946, amortizaciones: 2707, ebit: 14239, resultado_financiero: 28, bai: 14267, impuestos: 3112, minoritarios: 0, beneficio_neto: 11156, gastos_financieros: 286, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 178, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: 60.74 },
  { periodo: '2023', ingresos: 342861, coste_ventas: 227773, gastos_generales: 67279, ebitda: 51509, amortizaciones: 3700, ebit: 47809, resultado_financiero: 314, bai: 48123, impuestos: 10110, minoritarios: 0, beneficio_neto: 38013, gastos_financieros: 711, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 623, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: 60.98 },
  { periodo: '2024', ingresos: 691522, coste_ventas: 458695, gastos_generales: 95252, ebitda: 143278, amortizaciones: 5703, ebit: 137575, resultado_financiero: 11133, bai: 148708, impuestos: 27970, minoritarios: 0, beneficio_neto: 120738, gastos_financieros: 5563, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 1981, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: 60.95 },
  { periodo: '2025', ingresos: 1116287, coste_ventas: 769530, gastos_generales: 141396, ebitda: 214213, amortizaciones: 8851, ebit: 205362, resultado_financiero: 11340, bai: 216702, impuestos: 48117, minoritarios: 0, beneficio_neto: 168585, gastos_financieros: 8368, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 2714, dpa: 306, dpa_extraordinario: 0, acciones_diluidas: 62.04 },
];
// Deuda financiera = préstamos a corto + parte corriente de la deuda a largo + deuda a largo (sin las RCPS de 2025, que eran
// pasivo financiero de 67.990 M más un derivado de 48.237 M y se convirtieron en acciones en abril de 2026). Caja = efectivo +
// otros activos financieros corrientes (depósitos a plazo).
const balanceHist = [
  { periodo: '2021', activo_total: 97392, activo_corriente: 68848, pasivo_corriente: 6463, pasivo_total: 11099, fondo_comercio: 0, intangibles: 165, inmovilizado_material: 20748, existencias: 21781, clientes: 5431, proveedores: 61, activos_contrato: null, pasivos_contrato: null, caja: 41228, deuda_financiera: 4674, arrendamientos: 2122, patrimonio_neto: 86294, minoritarios: 0, reservas: 25401 },
  { periodo: '2022', activo_total: 129216, activo_corriente: 73231, pasivo_corriente: 28606, pasivo_total: 32829, fondo_comercio: 0, intangibles: 91, inmovilizado_material: 42810, existencias: 28602, clientes: 6124, proveedores: 1082, activos_contrato: null, pasivos_contrato: null, caja: 37935, deuda_financiera: 23807, arrendamientos: 1283, patrimonio_neto: 96387, minoritarios: 0, reservas: 32793 },
  { periodo: '2023', activo_total: 215271, activo_corriente: 136395, pasivo_corriente: 74179, pasivo_total: 80319, fondo_comercio: 0, intangibles: 661, inmovilizado_material: 54128, existencias: 78537, clientes: 21283, proveedores: 502, activos_contrato: null, pasivos_contrato: null, caja: 34322, deuda_financiera: 58762, arrendamientos: 5033, patrimonio_neto: 134952, minoritarios: 0, reservas: 70806 },
  { periodo: '2024', activo_total: 457759, activo_corriente: 297096, pasivo_corriente: 189336, pasivo_total: 196171, fondo_comercio: 0, intangibles: 1647, inmovilizado_material: 106509, existencias: 145926, clientes: 42203, proveedores: 1350, activos_contrato: null, pasivos_contrato: null, caja: 94234, deuda_financiera: 145168, arrendamientos: 10024, patrimonio_neto: 261588, minoritarios: 0, reservas: 191544 },
  { periodo: '2025', activo_total: 709448, activo_corriente: 552802, pasivo_corriente: 121616, pasivo_total: 252018, fondo_comercio: 0, intangibles: 1756, inmovilizado_material: 108323, existencias: 300125, clientes: 96060, proveedores: 5637, activos_contrato: null, pasivos_contrato: null, caja: 141803, deuda_financiera: 41579, arrendamientos: 21246, patrimonio_neto: 457430, minoritarios: 0, reservas: 359801 },
];
// capex = inmovilizado material + intangibles. Los intereses pagados van en el flujo operativo (no en financiación).
const flujosHist = [
  { periodo: '2021', flujo_operativo: 2481, capex: 3271, pagos_arrendamientos: 1312, adquisiciones: 1974, desinversiones: 0, dividendos: 0, recompras: 0, emision_acciones: 43484, intereses_en_financiacion: 0 },
  { periodo: '2022', flujo_operativo: 9848, capex: 22757, pagos_arrendamientos: 1363, adquisiciones: 5594, desinversiones: 0, dividendos: 0, recompras: 0, emision_acciones: 902, intereses_en_financiacion: 0 },
  { periodo: '2023', flujo_operativo: -18474, capex: 18895, pagos_arrendamientos: 2273, adquisiciones: 4655, desinversiones: 0, dividendos: 0, recompras: 0, emision_acciones: 395, intereses_en_financiacion: 0 },
  { periodo: '2024', flujo_operativo: 60126, capex: 76631, pagos_arrendamientos: 3378, adquisiciones: 5497, desinversiones: 0, dividendos: 0, recompras: 0, emision_acciones: 353, intereses_en_financiacion: 0 },
  { periodo: '2025', flujo_operativo: 1141, capex: 7039, pagos_arrendamientos: 5846, adquisiciones: 0, desinversiones: 13050, dividendos: 0, recompras: 0, emision_acciones: 144218, intereses_en_financiacion: 0 },
];

const A = {
  _estado: 'completa',
  financieros: {
    cuenta,
    // LTM jun-26 = 2025 − 1S25 + 1S26 [A1, A3, A5]. 1S25 = 1T25 + 2T25 (510.963 de ventas, 99.911 de beneficio operativo, 74.384
    // de beneficio). Amortización: 8.851 − 3.844 + 7.394 = 12.401 (nota de flujos del semestral). BPA ≈ 2.714 − 1.221 + 2.005.
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 1354477, ebitda: 265362, ebit: 252961, beneficio_neto: 220878, bpa: 3498, dpa: 306, dpa_extraordinario: 0, fcf: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [
      { periodo: '2022-2025', descripcion: 'Filiales comerciales de creación propia en Japón (empresa conjunta, 2022), Malasia (2022), Polonia y Países Bajos (2023), Rusia (moida, 2023), Reino Unido, Singapur y Francia (2024), EAU, México e Italia (2025), Alemania (moida, 2025), España y Portugal (2025) [A1]. Participaciones minoritarias en marcas coreanas (asociadas). Ninguna compra de negocio: el crecimiento es orgánico.' },
    ],
    comentario: 'Las ventas pasaron de 131.002 M KRW en 2021 a 1.116.287 M en 2025: un crecimiento anual del 70,8 %, todo orgánico, que se duplicó en 2023 (+107 %) y en 2024 (+102 %) y siguió en 2025 (+61 %) [A1, A2]. En el 1S26 crecieron un 46,6 % (749.153 M) [A3]. **El 93,4 % de las ventas de 2025 fue mayorista a empresas** (plataforma Stylekorean Wholesale: 1.042.484 M), el 3,9 % venta al público (tienda en línea Stylekorean.com y tiendas moida: 42.985 M) y el 2,8 % servicios de fulfillment (30.815 M) [A1]. El margen operativo subió del 6,7 % (2021) al 19,9 % (2024) y bajó al 18,4 % en 2025; en el 1S26 fue del 19,7 % [A1, A3]. Es un margen muy alto para un distribuidor: el margen bruto es del 31 % (2025) y los gastos generales solo el 12,7 % de las ventas. Últimos doce meses: 1.354.477 M de ventas y 252.961 M de beneficio operativo (18,7 %).',
    ajustes: 'Cifras publicadas K-IFRS, sin ajustes. Tres avisos. (1) El resultado financiero incluye diferencias de cambio (ganancias con el won débil: +11.133 M en 2024, +11.340 M en 2025 y +16.206 M en el 1S26) y resultados de asociadas; no es recurrente en la misma cuantía [A1, A3]. (2) El 4T25 llevó bonus y una provisión de existencias que bajaron el margen operativo al 13,9 % [A1, A15]. (3) Las RCPS de 2025 (144.000 M de Silk SPV) se contabilizaron como pasivo financiero más un derivado hasta su conversión en abril de 2026 [A1, A14]. El BPA de los últimos doce meses es una aproximación (el del 1S25 sale del beneficio del semestre entre ≈ 60,9 M de acciones).',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '3T24', ingresos: 186674, crecimiento_pct: 84.9, crecimiento_organico_pct: 84.9, ebitda: 44022, margen_ebitda_pct: 23.6, bpa: null, vs_consenso: null },
      { periodo: '4T24', ingresos: 173560, crecimiento_pct: 64.2, crecimiento_organico_pct: 64.2, ebitda: 28015, margen_ebitda_pct: 16.1, bpa: null, vs_consenso: null },
      { periodo: '1T25', ingresos: 245677, crecimiento_pct: 63.9, crecimiento_organico_pct: 63.9, ebitda: 49651, margen_ebitda_pct: 20.2, bpa: null, vs_consenso: null },
      { periodo: '2T25', ingresos: 265286, crecimiento_pct: 46.3, crecimiento_organico_pct: 46.3, ebitda: 54104, margen_ebitda_pct: 20.4, bpa: null, vs_consenso: null },
      { periodo: '3T25', ingresos: 299375, crecimiento_pct: 60.4, crecimiento_organico_pct: 60.4, ebitda: 65577, margen_ebitda_pct: 21.9, bpa: null, vs_consenso: null },
      { periodo: '4T25', ingresos: 305949, crecimiento_pct: 76.3, crecimiento_organico_pct: 76.3, ebitda: 44882, margen_ebitda_pct: 14.7, bpa: null, vs_consenso: null },
      { periodo: '1T26', ingresos: 346556, crecimiento_pct: 41.1, crecimiento_organico_pct: 41.1, ebitda: 68237, margen_ebitda_pct: 19.7, bpa: null, vs_consenso: null },
      { periodo: '2T26', ingresos: 402597, crecimiento_pct: 51.8, crecimiento_organico_pct: 51.8, ebitda: 86667, margen_ebitda_pct: 21.5, bpa: null, vs_consenso: null },
    ],
    ultima_presentacion: 'Ventas y beneficio operativo de cada trimestre de los informes trimestrales, semestrales y anuales y del aviso de resultados provisionales del 2T26 [A1, A3, A5-A8]; los trimestres del año anterior (1T24 149.927 M, 2T24 181.361 M, 3T23 100.951 M, 4T23 105.677 M) salen de los comparativos de esos informes. EBITDA = beneficio operativo + la amortización del semestre repartida a partes iguales (estimación). No hemos encontrado el BPA trimestral ni el consenso previo de cada trimestre en una fuente primaria. El 2T26 (12-ago) fue récord: ventas de 402.597 M (+51,8 %) y beneficio operativo de 82.970 M (20,6 %) [A8]; la acción subió un 13 % ese día y cayó un 9,8 % el siguiente. Para el 3T26 (resultados hacia el 10-nov, estimado) el consenso de FnGuide espera 434.200 M de ventas y 84.800 M de beneficio operativo [A15], pero las casas recortan: Hana a 78.100 M y Kiwoom a 67.900 M por el won (un 5,6 % más fuerte frente al dólar y un 6,5 % frente al euro en el trimestre) [A16, A17].',
    confianza: 'Media',
  },
  balance: {
    historico: balanceHist,
    vencimientos: [],
    liquidez: 'A 30-jun-2026: efectivo de 82.274 M y otros activos financieros a corto de 49.222 M (131.496 M); deuda financiera de 68.176 M (68.123 M a corto, con un préstamo de 45.000 M con garantía inmobiliaria tomado en mayo) y arrendamientos de 64.599 M [A3, A13]. Después del cierre entraron los 300.000 M de las RCPS de CVC (15-sep), salieron 55.034 M del almacén de Yongin (7-oct) y se firmó un fideicomiso de recompra de 5.000 M (19-oct) [A10-A12].',
    rating: 'Sin rating público',
    coste_deuda_pct: null,
    vida_media_anios: null,
    otros_pasivos: 'Las RCPS de CVC (300.000 M, 6.666.666 acciones preferentes a 45.000 KRW): votan y cobran dividendo como las ordinarias, se convierten 1:1 desde el 15-sep-2027 y el inversor puede pedir el reembolso del 15-sep-2029 al 15-sep-2036 al precio de emisión más un 2 % anual compuesto [A9]. Si la acción no supera los 45.000 KRW, funcionan como deuda (≈ 325.000 M en 2029). Sin litigios ni garantías relevantes declarados; 3.694.590 acciones del fundador (5,6 %) pignoradas como garantía de un impuesto aplazado (nota C).',
    comentario: 'El balance es el de un distribuidor que crece: el activo pasó de 97.392 M (2021) a 964.459 M (jun-2026) y casi todo es circulante. **Las existencias son la cifra que vigilar**: 300.125 M a fin de 2025 (27 % de las ventas, ≈ 142 días de coste de ventas) y 450.971 M a 30-jun-2026 (+50 % en seis meses, frente a unas ventas del semestre +47 %) [A1, A3]. La dirección lo atribuye a compras adelantadas por miedo a la congestión de rutas, costes y escasez de envases, y dice no tener problemas de existencias [A18]. El circulante comercial (existencias + clientes − proveedores) fue el 27-35 % de las ventas en 2023-2025 (390.548 M en 2025) y ≈ 32 % de las ventas anualizadas del 2T26 [A1, A3]. Por eso el crecimiento consume caja y el flujo operativo es casi nulo pese a beneficios de 120.000-170.000 M. Deuda neta muy baja; con el dinero de CVC, caja neta de ≈ 360.000 M.',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujosHist,
    comentario: 'El flujo operativo fue de 1.141 M en 2025 frente a un beneficio de 168.585 M (0,7 %): la variación de existencias restó ≈ 148.000 M y la del circulante ≈ 191.000 M [A1]. En 2023 fue negativo (−18.474 M) y en 2024 de 60.126 M (50 % del beneficio); en el 1S26, 13.483 M (11 % del beneficio del semestre) [A1, A3]. En cinco años el flujo operativo acumulado (55.122 M) no cubre el capex (128.593 M, sobre todo almacenes y la sede de 2022-2024). El crecimiento se ha financiado con la salida a bolsa de 2021 (43.484 M), deuda a corto (145.100 M en 2024), las RCPS de 2025 (144.000 M) y ahora las de CVC (300.000 M) [A1, A9]. Primer dividendo en 2026 (306 KRW por 2025: 20.029 M) y primera recompra (4.998 M en el 1S26) [A3].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'Shinwoo Accounting (신우회계법인)',
    anios_auditor: 5,
    opinion: 'Favorable (2025)',
    comentario: 'Shinwoo audita al menos desde 2021, con opinión favorable todos los años; la cuestión clave de auditoría es el reconocimiento de ingresos [A1, A2]. Es una firma pequeña para una empresa de 1,1 billones de ventas. Criterios a vigilar: (1) la conversión en caja (flujo operativo del 0,7 % del beneficio en 2025 y del 11 % en el 1S26) por existencias que crecen tanto como las ventas [A1, A3]; (2) la valoración de existencias (provisión en el 4T25) en cosmética, que caduca y cambia de moda; (3) los resultados por diferencias de cambio, que inflan el BAI cuando el won se debilita; (4) en 2023 la KRX la designó por un retraso en un aviso obligatorio (nota C).',
    senales: [
      { senal: 'Flujo operativo casi nulo pese al beneficio', nivel: 'Alta', comentario: '1.141 M en 2025 frente a 168.585 M de beneficio; existencias del 27 % de las ventas [A1].' },
      { senal: 'Existencias +50 % en seis meses (1S26)', nivel: 'Media', comentario: '450.971 M a 30-jun-2026; compra adelantada según la dirección [A3, A18].' },
      { senal: 'Auditor pequeño', nivel: 'Baja', comentario: 'Shinwoo, opinión favorable; la cuestión clave es el reconocimiento de ingresos [A1].' },
      { senal: 'Resultados por diferencias de cambio', nivel: 'Baja', comentario: '+16.206 M de resultado no operativo en el 1S26 [A3].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Primer dividendo en 2026: 306 KRW por acción de 2025 (20.029 M, el 12 % del beneficio) [A1, A3]. Primera recompra en el 1S26 (4.998 M) y un fideicomiso de recompra de 5.000 M el 19-oct-2026 (≈ 146.198 acciones a 34.200 KRW) [A12]. Sin plan de valor publicado con objetivo de reparto.',
    adquisiciones: [],
    comentario: 'Casi todo el capital va al circulante (existencias y clientes) y a la logística: almacenes en Corea (Yongin, 55.034 M en 2026) y en Europa (de 2.762 m² en 2023 a 20.464 m² en 2026, hub de Polonia) y filiales en 15 países [A1, A11, A18]. Para financiarlo ha emitido capital dos veces en dos años (RCPS de 144.000 M en 2025 a 32.695 KRW y de 300.000 M en 2026 a 45.000 KRW), con dilución del 6,7 % y del 10,2 % [A9, A14]. El ROE fue del 42 % en los últimos doce meses (Yahoo) y el ROIC alto por el margen, pero el capital invertido crece con las ventas.',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'Mayorista a empresas (Stylekorean Wholesale, CA)', descripcion: 'Venta de cosmética coreana de unas 1.000 marcas (≈ 22.000 referencias) a distribuidores, cadenas y tiendas de 175 países a través de su plataforma B2B; iHerb es el mayor cliente (6,1 % de las ventas)', tipo_resultado: null, historico: [{ periodo: '2023', ingresos: 271890, resultado: null }, { periodo: '2024', ingresos: 607152, resultado: null }, { periodo: '2025', ingresos: 1042484, resultado: null }] },
      { nombre: 'Venta al público (Stylekorean.com y tiendas moida, PA)', descripcion: 'Tienda en línea propia (1,6 millones de miembros) y ≈ 30 tiendas físicas moida (la mitad en Europa)', tipo_resultado: null, historico: [{ periodo: '2023', ingresos: 17486, resultado: null }, { periodo: '2024', ingresos: 26278, resultado: null }, { periodo: '2025', ingresos: 42985, resultado: null }] },
      { nombre: 'Fulfillment y otros', descripcion: 'Servicios logísticos y de exportación para marcas', tipo_resultado: null, historico: [{ periodo: '2023', ingresos: 53485, resultado: null }, { periodo: '2024', ingresos: 58092, resultado: null }, { periodo: '2025', ingresos: 30819, resultado: null }] },
    ],
    geografias: [
      { nombre: 'Unión Europea', peso_pct: 28.2 },
      { nombre: 'EE. UU.', peso_pct: 18.1 },
      { nombre: 'Reino Unido', peso_pct: 6.4 },
      { nombre: 'Oriente Medio (EAU)', peso_pct: 7.0 },
      { nombre: 'Sudeste Asiático (Indonesia, Malasia)', peso_pct: 7.5 },
      { nombre: 'Canadá y México', peso_pct: 5.3 },
      { nombre: 'Corea', peso_pct: 3.1 },
      { nombre: 'Otros (Rusia, Latinoamérica, Asia, Oceanía)', peso_pct: 24.4 },
    ],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Peso mayorista en las ventas', valor_anterior: '79,3 % (2023)', valor_actual: '93,4 % (2025)', variacion: '+14,1 puntos', comentario: 'La venta al público es el 3,9 % y el fulfillment el 2,8 % [A1].' },
      { kpi: 'Ventas en la UE', valor_anterior: '314.900 M (2025)', valor_actual: '249.300 M (solo 1S26)', variacion: '≈ +60 % anualizado', comentario: 'Europa (UE más Reino Unido) ≈ 42 % de las ventas del 1S26 [A3].' },
      { kpi: 'Ventas en EE. UU.', valor_anterior: '203.700 M (2024)', valor_actual: '201.800 M (2025); 135.000 M (1S26)', variacion: '−0,9 % en 2025', comentario: 'Plano por la competencia y los aranceles; 18 % de las ventas del 1S26 [A1, A3].' },
      { kpi: 'Existencias', valor_anterior: '300.125 M (dic-2025)', valor_actual: '450.971 M (jun-2026)', variacion: '+50,3 %', comentario: 'Compra adelantada según la dirección [A3, A18].' },
      { kpi: 'Margen operativo trimestral', valor_anterior: '19,7 % (2T25)', valor_actual: '20,6 % (2T26)', variacion: '+0,9 puntos', comentario: 'El 3T26 bajará por el won (Hana: 78.100 M sobre ≈ 430.000 M de ventas) [A16].' },
    ],
  },
  fuentes: fA,
  huecos: [
    { seccion: 'trimestres', campo: 'BPA trimestral y consenso previo de cada trimestre', tipo: 'Complemento', intentos: '1) Informes trimestrales de DART (solo beneficio; BPA acumulado); 2) FnGuide (consenso vigente, no el previo); 3) prensa (cifras sueltas)', decision: 'Omitido' },
    { seccion: 'financieros', campo: 'Flujo libre de los últimos doce meses', tipo: 'Complemento', intentos: '1) Informe semestral de 2026 (flujo del 1S26 y 1S25 sin desglose completo del 1S25); 2) informe semestral de 2025 (no descargado); 3) FnGuide (sin flujos trimestrales)', decision: 'Omitido' },
  ],
};
guarda('A', A);

// ================================================================ B. Sector y competencia
const fB = [
  { id: 1, titulo: '사업보고서 2025: negocio, plataforma Stylekorean, canales (mayorista 93,4 %), regiones, clientes (iHerb 6,1 %), marcas, logística y competencia', editor: 'Silicon2 / DART (FSS)', tipo: 'Primaria', fecha: '2026-03-20', url: DART('20260320001024') },
  { id: 2, titulo: '반기보고서 2026: ventas por canal y región del 1S26 (UE 249.300 M, EE. UU. 135.000 M, Reino Unido 68.800 M)', editor: 'Silicon2 / DART (FSS)', tipo: 'Primaria', fecha: '2026-08-14', url: DART('20260814003895') },
  fuenteN(3, 'q3'),
  fuenteN(4, 'goodai'),
  fuenteN(5, 'bizwatch'),
  fuenteN(6, 'moida'),
  fuenteN(7, 'inv'),
  { id: 8, titulo: 'Fichas de APR, d\'Alba, VT, Clio, Amorepacific, Cosmax, Kolmar Korea, Paltac, Arata y Sally Beauty', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/257720.KQ' },
  { id: 9, titulo: '화장품 수출 실적 2025 (exportaciones coreanas de cosmética de 2025: 11.420 M USD, +12,9 %)', editor: 'Asociación Coreana de la Industria Cosmética vía Medical Economy News', tipo: 'Sectorial', fecha: '2026-01', url: 'https://www.meconomynews.com/news/articleView.html?idxno=129631' },
  fuenteN(10, 'etoday'),
  fuenteN(11, 'sedaily'),
  { id: 12, titulo: 'Informe del análisis de APR de este repositorio (arancel combinado del 12,5 % a las importaciones coreanas en EE. UU. desde el 24-jul-2026, según News1)', editor: 'Análisis propio / News1', tipo: 'Sectorial', fecha: '2026-10-19', url: 'informes/apr-2026-10-19' },
  fuenteN(13, 'aprnh'),
];
const B = {
  _estado: 'completa',
  historia: {
    resumen: 'Silicon2 se fundó el 19-ene-2002 en Corea como empresa de componentes electrónicos y se reconvirtió en exportadora de cosmética coreana con la plataforma Stylekorean (tienda en línea al público y, sobre todo, venta mayorista a tiendas y distribuidores de todo el mundo) [B1]. Salió a bolsa en el KOSDAQ en septiembre de 2021. Desde 2022 abrió filiales y almacenes propios fuera de Corea (Japón, Malasia, Polonia, Países Bajos, Rusia, Reino Unido, Singapur, Francia, EAU, México, Italia, Alemania, España y Portugal) para vender con stock local [B1]. Con la moda de la cosmética coreana las ventas pasaron de 131.002 M (2021) a 1,12 billones (2025). En 2025 entró como inversor Glenwood Credit (RCPS de 144.000 M) y en 2026 CVC (300.000 M), que tiene dos consejeros desde el 1-oct-2026 [B1, B2].',
    hitos: [
      { anio: '2002', hito: 'Fundación (19-ene) [B1].' },
      { anio: '2021', hito: 'Salida a bolsa en el KOSDAQ (septiembre); inversiones minoritarias en marcas coreanas [B1].' },
      { anio: '2022', hito: 'Filiales en Japón y Malasia; premio al exportador de 70 M USD [B1].' },
      { anio: '2023', hito: 'Filiales en Polonia (almacén), Países Bajos y Rusia (moida); ventas +107 % [B1].' },
      { anio: '2024', hito: 'Reino Unido, Singapur y Francia; ventas de 691.522 M (+102 %) [B1].' },
      { anio: '2025', hito: 'EAU, México, Italia, Alemania, España y Portugal; ventas de 1,12 billones; RCPS de 144.000 M [B1].' },
      { anio: '2026', hito: 'CVC invierte 300.000 M (septiembre); almacén de Yongin; ≈ 30 tiendas moida [B6].' },
    ],
    confianza: 'Alta',
  },
  negocio: {
    descripcion: '**Silicon2 es sobre todo un mayorista**: compra cosmética a cientos de marcas coreanas y la revende a tiendas, cadenas, farmacias y distribuidores de 175 países por su plataforma en línea Stylekorean Wholesale. Eso fue el 93,4 % de las ventas de 2025 (1.042.484 M); la venta al público en su tienda en línea Stylekorean.com y en ≈ 30 tiendas moida fue solo el 3,9 % (42.985 M) y los servicios logísticos (fulfillment) el 2,8 % [B1]. Las ventas al público pesan cada vez menos (5,1 % en 2023). Tiene ≈ 22.000 referencias de unas 1.000 marcas, stock en almacenes propios en Corea, Polonia, EE. UU., EAU y otros países, y unos 1,6 millones de miembros en la tienda [B1, B7].',
    como_gana_dinero: 'Compra a la marca con descuento y vende al cliente profesional con margen: el margen bruto es del 31 % (2025) y, como gasta poco en publicidad (no es marca), el margen operativo es del 18-20 % [B1]. Gana porque resuelve a la tienda extranjera la compra de muchas marcas pequeñas coreanas (pedido mínimo bajo, stock local, cumplimiento regulatorio de cada país) y a la marca la exportación sin montar red propia. Lo que más pesa en el resultado: el tipo de cambio (vende en dólares y euros y compra en wones), la mezcla de marcas y el poder de negociación con las marcas que crecen. Necesita mucho circulante (existencias del 27 % de las ventas) [B1].',
    clientes: 'Unos miles de clientes profesionales: distribuidores, cadenas de belleza, farmacias, tiendas en línea (iHerb es el mayor, con el 6,1 % de las ventas de 2025) y tiendas de cosmética coreana en Europa, Oriente Medio, Latinoamérica y el Sudeste Asiático; ninguno pasa del 10 % [B1]. Su poder de negociación es moderado (pueden comprar a otros mayoristas o directamente a las marcas grandes). Del lado de los proveedores, las marcas que crecen pueden saltarse al distribuidor: Goodai Global (Beauty of Joseon, TIRTIR, Skinfood), cuyas marcas eran el 23,6 % de las ventas de Silicon2 en el 3T25, compró en febrero de 2026 a su distribuidor en EE. UU. (Hansung USA) [B4], y APR vende directo en Europa desde 2025 [B5, B13].',
    confianza: 'Alta',
  },
  sector: {
    definicion: 'El mercado relevante es la exportación de cosmética coreana, que Silicon2 distribuye fuera de Corea. Las exportaciones coreanas de cosmética fueron de 11.420 M USD en 2025 (+12,9 %) [B9] y de 9.637 M USD de enero a agosto de 2026 (+31,2 %); en el 3T26, 3.379 M USD (+38,2 %) [B3, B10]. Silicon2 vende ≈ 840 M USD al año (2025) [B1]: ≈ 7 % de esas exportaciones. Usamos las exportaciones coreanas de cosmética (a precio de exportación, en USD) como mercado final; es el mercado que puede repartirse entre marcas que venden directo y distribuidores.',
    tamano: `11.420 M USD en 2025 (≈ ${Math.round((11420 * USDKRW) / 1000).toLocaleString('es-ES')} miles de millones de KRW a ${USDKRW.toLocaleString('es-ES')} KRW/USD) [B9]; ≈ 15.000 M USD previstos en 2026 (+31 % hasta agosto) [B3]`,
    unidad_serie: 'millones de USD',
    serie: [
      { anio: '2021', tamano: 9180 }, { anio: '2025', tamano: 11420 }, { anio: '2026e', tamano: 14800 }, { anio: '2027e', tamano: 16300 }, { anio: '2028e', tamano: 17600 }, { anio: '2030e', tamano: 20000 },
    ],
    tcac_historico_pct: 5.6,
    tcac_previsto_pct: 9.0,
    cr5_pct: null,
    estructura: 'Fragmentada: cientos de marcas coreanas exportan, unas directamente (APR, Goodai, Amorepacific) y otras a través de mayoristas como Silicon2; la distribución en cada país la hacen importadores locales',
    drivers: [
      { driver: 'Moda de la cosmética coreana fuera de Corea', efecto: '+', horizonte: 'Cíclico', evidencia: 'Exportaciones +31,2 % en enero-agosto de 2026 y +38,2 % en el 3T26 [B3, B10].' },
      { driver: 'Marcas que venden directo (desintermediación)', efecto: '−', horizonte: 'Estructural', evidencia: 'Goodai Global compró a Hansung USA (febrero de 2026) [B4]; APR vende directo en Amazon Europa y Sephora [B5, B13].' },
      { driver: 'Tipo de cambio (won)', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Vende en USD y EUR y compra en KRW: un won un 5 % más fuerte resta ≈ 2,4 puntos de margen (NH) [B3].' },
      { driver: 'Aranceles de EE. UU.', efecto: '−', horizonte: 'Cíclico', evidencia: 'Arancel combinado del 12,5 % a las importaciones coreanas desde el 24-jul-2026 [B12]; EE. UU. es el 18 % de las ventas de Silicon2 [B2].' },
      { driver: 'Nuevos mercados (Europa, Oriente Medio, Latinoamérica)', efecto: '+', horizonte: 'Estructural', evidencia: 'La UE creció del 28 % de las ventas en 2025 a un tercio en el 1S26; filiales nuevas en España, Portugal, Alemania, Italia, México y EAU [B1, B2].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Otros mayoristas y exportadores coreanos (Hansung, hoy Goodai Global USA; empresas pequeñas de exportación) y las propias marcas compiten; Silicon2 es el mayor de los cotizados [B1, B4].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Miles de clientes, ninguno por encima del 10 %, pero pueden cambiar de proveedor [B1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 4, justificacion: 'Las marcas que tienen éxito negocian mejores condiciones o venden directo (Goodai, APR) [B4, B5].' },
      { fuerza: 'Amenaza de entrada', intensidad: 3, justificacion: 'Montar almacenes y licencias en 15 países cuesta, pero las plataformas (Amazon, TikTok Shop) abren otra vía a las marcas [B7].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'La venta directa de la marca al consumidor y las cadenas que compran directamente a Corea (Sephora, Ulta, Boots).' },
    ],
    ciclo: { posicion: 'Expansión', comentario: 'La cosmética coreana vive una fase de moda fuera de Corea con exportaciones creciendo un 30-40 % [B3]. Silicon2 no ha vivido como cotizada una caída del sector; el riesgo es doble: que la moda se enfríe y que las marcas grandes dejen de necesitar distribuidor. Indicadores: exportaciones mensuales de cosmética (aduanas), tipo de cambio y peso de las cinco primeras marcas en sus ventas.' },
    regulacion: 'Cada país regula la cosmética (en la UE el reglamento 1223/2009, con persona responsable y notificación en el portal CPNP; en EE. UU. la ley MoCRA): Silicon2 hace ese trámite por las marcas pequeñas, que es parte de su valor [B1]. Aranceles de EE. UU.: 12,5 % combinado desde el 24-jul-2026 [B12]. Rusia (≈ 3 % de las ventas en el 1S26) puede verse afectada por sanciones.',
    tendencias: 'Tres tendencias. (1) La cosmética coreana pasa de moda a categoría y entra en cadenas físicas de Europa y EE. UU.: más volumen, pero las cadenas grandes prefieren comprar directo a las marcas grandes [B5, B11]. (2) Las marcas que crecen integran la distribución (Goodai-Hansung en EE. UU., APR en Europa) y dejan al mayorista las marcas pequeñas y medianas [B4, B5]. (3) Silicon2 responde con venta al público (moida, «el Olive Young de Europa») y más almacenes locales [B6, B7].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 7.4,
    posicion: 'El mayor distribuidor mayorista cotizado de cosmética coreana: ≈ 840 M USD de ventas en 2025, el ≈ 7 % de las exportaciones coreanas de cosmética [B1, B9]. Su ventaja es la red: almacenes y filiales en 15 países, licencias y registros hechos, y miles de clientes profesionales.',
    competidores: [],
    foso: {
      veredicto: 'Estrecho',
      tendencia: 'Bajando',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 3, evidencia: 'Más marcas atraen más tiendas y más tiendas atraen más marcas pequeñas: 22.000 referencias y clientes en 175 países [B1].' },
        { fuente: 'Costes de cambio', puntuacion: 2, evidencia: 'Para una tienda pequeña es cómodo comprar muchas marcas a un solo proveedor con stock local; para una marca grande no [B1].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 2, evidencia: 'Registros y licencias en cada país y la marca Stylekorean; no tiene marcas de producto propias relevantes.' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Escala logística (Polonia, Yongin, EAU): el coste por pedido baja con el volumen [B7].' },
        { fuente: 'Escala eficiente', puntuacion: 1, evidencia: 'Mercado grande y en crecimiento, con espacio para otros mayoristas.' },
      ],
    },
    amenazas: 'Lo más probable es la desintermediación: que las marcas que crecen vendan directo o con distribuidores propios (Goodai Global compró a Hansung USA; APR vende directo en Europa) [B4, B5]. Las cinco primeras marcas pesan mucho en las ventas (las de Goodai eran el 23,6 % en el 3T25), así que perder una cuesta varios puntos de crecimiento (probabilidad media-alta, impacto alto). Segunda: que se enfríe la moda (media en 3-5 años). Tercera: el won fuerte, que se come el margen cada trimestre (alta, impacto medio).',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Lo que toca las cifras: (1) gobierno: el fundador controla el 43 % con su grupo y tiene acciones pignoradas; CVC entra en el consejo; (2) cumplimiento regulatorio de producto en 175 países (responsable de las notificaciones); (3) sanciones (Rusia). Impacto ambiental bajo: transporte y envases.',
    controversias: 'Designación de la KRX en 2023 como «comunicación no fiel» por retrasar un aviso obligatorio (nota C). Sin sanciones relevantes en 2025 [B1].',
    confianza: 'Baja',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'esg', campo: 'Calificaciones ESG', tipo: 'Complemento', intentos: '1) KCGS (sin calificación encontrada); 2) MSCI (sin ficha pública); 3) informe anual 2025 (no menciona calificaciones)', decision: 'Omitido' },
    { seccion: 'sector', campo: 'CR5 de los distribuidores de cosmética coreana', tipo: 'Complemento', intentos: '1) Informe anual 2025 (no da cuotas); 2) prensa (sin cifras de cuota); 3) asociación de la industria (solo exportaciones)', decision: 'Omitido' },
    { seccion: 'competencia', campo: 'Ventas de Goodai Global USA (antes Hansung USA) y otros mayoristas', tipo: 'Complemento', intentos: '1) No cotizan; 2) DART (no publican); 3) prensa (sin cifras)', decision: 'Omitido' },
  ],
};
const fxDe = (c) => (c === 'USD' ? USDKRW : c === 'JPY' ? JPYKRW : c === 'EUR' ? EURKRW : 1);
const raw = Object.fromEntries(compsRaw.map((c) => [c.s, c]));
const r1 = (x) => (x == null || !isFinite(x) ? null : Math.round(x * 10) / 10);
const r2 = (x) => (x == null || !isFinite(x) ? null : Math.round(x * 100) / 100);
const comp = (s, nombre, pais, comentario) => { const c = raw[s]; return { nombre, pais, ticker: s, ingresos: Math.round((c.rev * fxDe(c.fcur)) / 1e6), cuota_pct: null, margen_ebit_pct: r1(c.opM * 100), comentario }; };
B.competencia.competidores = [
  { nombre: 'Goodai Global USA (antes Hansung USA)', pais: 'EE. UU. / Corea', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Distribuidor de cosmética coreana en EE. UU. comprado en febrero de 2026 por Goodai Global (Beauty of Joseon, TIRTIR, Skinfood), cuyas marcas eran el 23,6 % de las ventas de Silicon2 en el 3T25 [B4]. No cotiza.' },
  comp('278470.KS', 'APR (Medicube)', 'Corea', 'Marca que vende directo en Amazon EE. UU. y Europa y en cadenas: el ejemplo de marca que no necesita mayorista [B5].'),
  comp('8283.T', 'Paltac', 'Japón', 'Mayorista japonés de cosmética y productos de higiene: margen operativo del 1,9 %, la referencia de un distribuidor maduro [B8].'),
  comp('2733.T', 'Arata', 'Japón', 'Mayorista japonés de productos del hogar y cosmética; margen operativo del 1,2 % [B8].'),
  comp('SBH', 'Sally Beauty', 'EE. UU.', 'Distribuidor y minorista de productos de belleza profesionales (EE. UU. y Europa) [B8].'),
];
guarda('B', B);

// ================================================================ C. Equipo y gobierno
const fC = [
  { id: 1, titulo: '사업보고서 2025: consejo, comisiones, directivos, remuneración, accionistas, empleados y sanciones', editor: 'Silicon2 / DART (FSS)', tipo: 'Primaria', fecha: '2026-03-20', url: DART('20260320001024') },
  { id: 2, titulo: '반기보고서 2026: accionistas a 30-jun-2026 y empleados (367)', editor: 'Silicon2 / DART (FSS)', tipo: 'Primaria', fecha: '2026-08-14', url: DART('20260814003895') },
  { id: 3, titulo: '주식등의 대량보유상황보고서 (Kim Sung-woon y relacionados: del 50,58 % al 43,62 % por la conversión de las RCPS de 2025; acciones pignoradas)', editor: 'DART (FSS)', tipo: 'Primaria', fecha: '2026-04-27', url: DART('20260427000627') },
  { id: 4, titulo: '임원ㆍ주요주주특정증권등소유상황보고서 (ventas del fundador: 187.000 acciones del 23 al 29-ene-2026 a 45.769-51.735 KRW)', editor: 'DART (FSS)', tipo: 'Primaria', fecha: '2026-01-30', url: DART('20260130000310') },
  { id: 5, titulo: '임원ㆍ주요주주특정증권등소유상황보고서 (ventas de 2025 del fundador: 173.600 acciones entre junio y agosto)', editor: 'DART (FSS)', tipo: 'Primaria', fecha: '2025-07-25', url: DART('20250725000405') },
  { id: 6, titulo: '임원ㆍ주요주주특정증권등소유상황보고서 (Gil Nam-young vende 20.772 acciones del 1 al 8-sep-2026 a 48.000-52.350 KRW)', editor: 'DART (FSS)', tipo: 'Primaria', fecha: '2026-09-08', url: DART('20260908000316') },
  { id: 7, titulo: '임시주주총회결과 (junta extraordinaria del 1-oct-2026: Lee Won-bae y Cho Eun-chul, de CVC, consejeros no ejecutivos)', editor: 'Silicon2 / KRX', tipo: 'Primaria', fecha: '2026-10-01', url: DART('20261001900444') },
  { id: 8, titulo: '주식등의 대량보유상황보고서 de Starlink Investment L.P. (CVC): 6.666.666 RCPS', editor: 'DART (FSS)', tipo: 'Primaria', fecha: '2026-09-18', url: DART('20260918000230') },
  { id: 9, titulo: 'Accionistas principales (Kim Sung-woon y 14 relacionados: 43,36 %; autocartera 0,19 %), flotante (56,45 %) y extranjeros (11,87 %); objetivos de 13 casas', editor: 'FnGuide (Naver WiseReport)', tipo: 'Datos de mercado', fecha: '2026-10-19', url: WR('c1010001') },
  { id: 10, titulo: '사업보고서 2023: designación de la KRX como 불성실공시법인 (comunicación no fiel) en 2023', editor: 'Silicon2 / DART (FSS)', tipo: 'Primaria', fecha: '2024-03-20', url: DART('20240320000377') },
  fuenteN(11, 'cvc'),
];
const C = {
  _estado: 'completa',
  directivos: {
    equipo: [
      { nombre: 'Kim Sung-woon', cargo: 'Fundador, presidente del consejo y primer ejecutivo', desde: '2002', participacion_pct: 28.81, trayectoria: 'Fundó la empresa en 2002 y la dirige desde entonces; convirtió una exportadora pequeña en el mayor distribuidor cotizado de cosmética coreana. Tiene el 28,81 % y el 43,4 % con su grupo [C1, C3].' },
      { nombre: 'Son Robert Inho', cargo: 'Director financiero (CFO), consejero ejecutivo', desde: null, participacion_pct: null, trayectoria: 'Consejero ejecutivo [C1].' },
      { nombre: 'Choi Jin-ho', cargo: 'Director de operaciones (COO), consejero ejecutivo', desde: null, participacion_pct: null, trayectoria: 'Consejero ejecutivo; el directivo mejor pagado de 2025 (10.426 M, sobre todo por opciones) [C1].' },
    ],
    historial_guidance: [],
    comentario: 'La dirige su fundador desde 2002, con un equipo pequeño (367 empleados en jun-2026) para 1,1 billones de ventas [C2]. La empresa no publica guía anual de ventas ni de beneficio. Como cotizada ha crecido más del 40 % cada año desde 2023. Riesgo de persona clave: el fundador decide la estrategia y las relaciones con las marcas; no hay plan de sucesión publicado. La entrada de CVC (dos consejeros desde el 1-oct-2026) añade un inversor profesional con interés en que la acción supere los 45.000 KRW [C7, C8].',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Kim Sung-woon', cargo: 'Presidente del consejo y primer ejecutivo', tipo: 'Ejecutivo', desde: '2002', comisiones: null },
      { nombre: 'Son Robert Inho', cargo: 'Consejero ejecutivo (CFO)', tipo: 'Ejecutivo', desde: null, comisiones: null },
      { nombre: 'Choi Jin-ho', cargo: 'Consejero ejecutivo (COO)', tipo: 'Ejecutivo', desde: null, comisiones: null },
      { nombre: 'Lee Se-hoon', cargo: 'Consejero independiente', tipo: 'Independiente', desde: '2022', comisiones: 'Auditoría (presidente)' },
      { nombre: 'Lee Taek-soon', cargo: 'Consejero independiente', tipo: 'Independiente', desde: '2022', comisiones: 'Auditoría' },
      { nombre: 'Ryu Jae-young', cargo: 'Consejero independiente', tipo: 'Independiente', desde: null, comisiones: 'Auditoría' },
      { nombre: 'Lee Won-bae', cargo: 'Consejero no ejecutivo (CVC)', tipo: 'Dominical', desde: '2026', comisiones: null },
      { nombre: 'Cho Eun-chul', cargo: 'Consejero no ejecutivo (CVC)', tipo: 'Dominical', desde: '2026', comisiones: null },
    ],
    presidente_ceo_separados: false,
    presidente_ejecutivo: true,
    consejero_coordinador: false,
    una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false,
    variable_ligado_rentabilidad: false,
    auditoria_independiente: true,
    insiders_sin_operaciones: false,
    accionista_control: true,
    presidente_vinculado_control: true,
    cambios_cupula_24m: 0,
    voto_remuneracion_pct: null,
    voto_remuneracion_contra_pct: null,
    voto_remuneracion_contra_libre_pct: null,
    voto_cupula_pct: null,
    remuneracion_ceo: 2313,
    remuneracion: 'El fundador cobró 2.313 M KRW en 2025: 800 M fijos y 1.513 M de bonus ligado a los resultados, no a la rentabilidad sobre el capital [C1]. El directivo mejor pagado fue el COO, Choi Jin-ho (10.426 M), por el ejercicio de opciones. No hemos encontrado el resultado de la votación del límite de remuneración.',
    accionistas: [
      { nombre: 'Kim Sung-woon (fundador) y relacionados (14)', pct: 43.4, tipo: 'Fundador; accionista de control', variacion: '28,81 % a título personal; bajó del 50,58 % al 43,62 % en abril de 2026 por la conversión de las RCPS de 2025; vendió 187.000 acciones en enero de 2026 y 173.600 en 2025 [C3, C4, C5]' },
      { nombre: 'Starlink Investment L.P. (CVC)', pct: 9.2, tipo: 'Capital riesgo (RCPS con voto)', variacion: '6.666.666 RCPS desde el 15-sep-2026: ≈ 9,2 % de las acciones con voto en base convertida [C8]' },
      { nombre: 'Silk SPV (Glenwood Credit)', pct: null, tipo: 'Inversor financiero', variacion: '4.404.344 acciones ordinarias desde la conversión de abril de 2026 (≈ 6,7 %); el pacto con el fundador terminó con la conversión; no consta si las mantiene [C3]' },
      { nombre: 'Autocartera', pct: 0.19, tipo: 'Autocartera', variacion: '123.200 acciones; recompra de ≈ 146.198 más en curso [C9]' },
    ],
    insiders: [
      { nombre: 'Kim Sung-woon', cargo: 'Fundador y CEO', tipo: 'Venta', fecha: '2026-01-29', acciones: 187000, importe: 9100, comentario: 'Del 23 al 29-ene-2026 a 45.769-51.735 KRW, para pagar impuestos [C4].' },
      { nombre: 'Gil Nam-young', cargo: 'Directiva no consejera', tipo: 'Venta', fecha: '2026-09-08', acciones: 20772, importe: 1040, comentario: 'Del 1 al 8-sep-2026 a 48.000-52.350 KRW [C6].' },
      { nombre: 'Kim Sung-woon', cargo: 'Fundador y CEO', tipo: 'Venta', fecha: '2025-08', acciones: 173600, importe: 9592, comentario: 'Entre junio y agosto de 2025 [C5].' },
    ],
    control_y_defensas: 'El fundador controla con el 43,4 % junto a sus relacionados y preside el consejo además de ser primer ejecutivo [C3, C9]. Tiene 3.694.590 acciones (5,6 % del capital) pignoradas como garantía del pago aplazado de un impuesto: si la acción cae mucho, podría tener que vender o aportar más garantías [C3]. Una acción, un voto; las RCPS de CVC también votan. El consejo tiene ocho miembros: tres ejecutivos, tres independientes (que forman la comisión de auditoría) y dos de CVC desde el 1-oct-2026 [C1, C7]. CVC tiene interés en que la acción suba por encima de 45.000 KRW; si no, puede pedir el reembolso desde 2029.',
    alertas: [
      'El fundador vende cada año para pagar impuestos (≈ 9.100-9.600 M en 2025 y 2026) y tiene el 5,6 % del capital pignorado [C3, C4, C5].',
      'Presidente del consejo y primer ejecutivo son la misma persona, que es el accionista de control [C1].',
      'Designación de la KRX en 2023 por comunicación no fiel (retraso de un aviso) [C10].',
    ],
    confianza: 'Media',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'Resultado de las votaciones de la junta de marzo de 2026 (remuneración)', tipo: 'Complemento', intentos: '1) DART, aviso de resultado de la junta (sin porcentajes de voto); 2) informe anual (no los da); 3) prensa (sin cifras)', decision: 'Omitido' },
  ],
};
guarda('C', C);

// ================================================================ D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de 257720.KQ, del KOSDAQ (^KQ11) y del ETF TIGER 화장품 (228790.KS); cierres, betas y volatilidad; cierre del 20-oct-2026 (32.800 KRW, 15:30 KST)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/257720.KQ' },
  { id: 2, titulo: 'Consenso anual 2026e-2028e y trimestral', editor: 'FnGuide (Naver WiseReport)', tipo: 'Analistas', fecha: '2026-10-19', url: WR('c1050001') },
  { id: 3, titulo: 'Objetivos y recomendaciones de 13 casas (Hana, Kiwoom, Meritz, NH, KB, SK, KIS, Yuanta, Samsung, Hanwha, Sangsangin y otras)', editor: 'FnGuide (Naver WiseReport)', tipo: 'Analistas', fecha: '2026-10-19', url: WR('c1010001') },
  { id: 4, titulo: 'Fichas de comparables (precio, capitalización, valor empresa, ventas, EBITDA, estimaciones de BPA) y tipos de cambio KRW=X (1.328,46), JPYKRW=X (8,377) y EURKRW=X (1.488,2)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/278470.KS' },
  { id: 5, titulo: 'Long-Term Government Bond Yields: 10-year for Korea (IRLTLT01KRM156N), septiembre de 2026: 4,454 %', editor: 'OECD vía FRED', tipo: 'Datos de mercado', fecha: '2026-10-01', url: 'https://fred.stlouisfed.org/series/IRLTLT01KRM156N' },
  { id: 6, titulo: 'Implied ERP by month: octubre de 2026, 4,20 %', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  fuenteN(7, 'hana', 'Analistas'),
  fuenteN(8, 'kiwoom', 'Analistas'),
  fuenteN(9, 'nh', 'Analistas'),
  fuenteN(10, 'wonko'),
  fuenteN(11, 'goodai'),
  fuenteN(12, 'panico'),
];
const blend = (e0, e1) => 0.2 * e0 + 0.8 * e1; // próximos 12 meses desde el 20-oct: ≈ 2,4 meses de 2026 y 9,6 de 2027
const nombres = { '278470.KS': ['APR', 'KR'], '483650.KS': ["d'Alba Global", 'KR'], '018290.KQ': ['VT', 'KR'], '237880.KQ': ['Clio Cosmetics', 'KR'], '090430.KS': ['Amorepacific', 'KR'], '192820.KS': ['Cosmax', 'KR'], '161890.KS': ['Kolmar Korea', 'KR'], '8283.T': ['Paltac', 'JP'], '2733.T': ['Arata', 'JP'], SBH: ['Sally Beauty', 'US'] };
const comparables = compsRaw.filter((c) => nombres[c.s]).map((c) => {
  const fxP = fxDe(c.cur); const fxF = fxDe(c.fcur);
  const e0 = c.et.find((t) => t.p === '0y'); const e1 = c.et.find((t) => t.p === '+1y');
  let epsN = e0?.eps && e1?.eps ? blend(e0.eps, e1.eps) : null;
  let revN = e0?.rev && e1?.rev ? blend(e0.rev, e1.rev) : null;
  let crec = revN && c.rev ? (revN / c.rev - 1) * 100 : null;
  // Paltac y Arata (ejercicio a marzo): 0y = marzo de 2027, +1y = marzo de 2028; mezcla 0,45/0,55 para los próximos 12 meses.
  if (c.s === '8283.T' || c.s === '2733.T') { epsN = 0.45 * e0.eps + 0.55 * e1.eps; crec = (e1.rev / e0.rev - 1) * 100; }
  // Sally Beauty (ejercicio a septiembre): +1y = sept-2027 cubre casi los próximos 12 meses.
  if (c.s === 'SBH') { epsN = e1.eps; crec = (e1.rev / e0.rev - 1) * 100; }
  return {
    nombre: nombres[c.s][0], ticker: c.s, pais: nombres[c.s][1],
    capitalizacion: Math.round((c.mcap * fxP) / 1e6),
    ev_ventas: r2(c.evRev), ev_ebitda_ltm: r1(c.evEbitda), ev_ebitda_ntm: null,
    per_ntm: epsN ? r1((c.price * (fxP / fxF)) / epsN) : null,
    crecimiento_pct: r1(crec),
    margen_ebitda_pct: c.ebitda && c.rev ? r1((c.ebitda / c.rev) * 100) : null,
    roic_pct: null,
    dn_ebitda: c.ebitda ? r2((c.debt - c.cash) / c.ebitda) : null,
    fcf_yield_pct: c.fcf != null ? r1(((c.fcf * fxF) / (c.mcap * fxP)) * 100) : null,
  };
});
const pers = comparables.map((c) => c.per_ntm).filter((x) => x != null).sort((a, b) => a - b);
const medianaPER = pers.length % 2 ? pers[(pers.length - 1) / 2] : (pers[pers.length / 2 - 1] + pers[pers.length / 2]) / 2;
const sil = raw['257720.KQ'];
const D = {
  _estado: 'completa',
  identificacion: {
    nombre: 'SILICON2 Co., Ltd.', nombre_corto: 'Silicon2', ticker: '257720', isin: 'KR7257720003', mercado: 'KOSDAQ (Korea Exchange)', indice_referencia: 'KOSDAQ',
    pais: 'Corea del Sur', pais_iso: 'KR', sector: 'Consumer Staples', industria: 'Distribución mayorista de cosmética', sede: 'Seúl (Corea del Sur)', fundacion: '2002', empleados: 367, web: 'https://www.silicon2.co.kr',
    precio: PRECIO, fecha_precio: '2026-10-20', acciones: 65.45, capitalizacion_publicada: Math.round(sil.mcap / 1e6), free_float_pct: 56.45,
    max_52s: bolsa.identificacion.max_52s, min_52s: bolsa.identificacion.min_52s, volumen_medio_diario: `≈ ${bolsa.volumen_3m.importe_dia_millones.toLocaleString('es-ES')} M KRW/día (3 meses; ${bolsa.volumen_3m.acciones_dia.toLocaleString('es-ES')} acciones)`, proximos_resultados: '2026-11-10',
  },
  consenso: {
    guidance: 'La empresa no publica una guía anual de ventas ni de beneficio. Objetivo de más de 100 tiendas moida en 2027 (≈ 30 hoy) según la prensa [nota B: 6]. Resultados del 3T26 hacia el 10-nov-2026 (estimado: en 2025 fueron el 10-nov; sin aviso de fecha todavía).',
    estimaciones: [
      { periodo: '2026e', ingresos: 1605300, ebitda: null, ebit: 292300, bpa: 3576, dpa: null, fuente: 'FnGuide, a 19-oct-2026 [D2]' },
      { periodo: '2027e', ingresos: 2049300, ebitda: null, ebit: 378200, bpa: 4233, dpa: null, fuente: 'FnGuide [D2]' },
      { periodo: '2028e', ingresos: 2477500, ebitda: null, ebit: 460400, bpa: 5143, dpa: null, fuente: 'FnGuide [D2] (≈ 72,2 M de acciones: incluye las RCPS de CVC)' },
    ],
    recomendaciones: { n_analistas: 13, comprar: 13, mantener: 0, vender: 0, po_medio: 58385, po_min: 52000, po_max: 65000 },
    revisiones: 'A la baja en octubre por el won: Meritz de 60.000 a 52.000 (1-oct), Kiwoom de 65.000 a 58.000 (12-oct; beneficio operativo del 3T26 de 67.900 M) y Hana de 59.000 a 52.000 (14-oct; 78.100 M, antes 93.300 M) [D7, D8, D3]. NH (58.000) calcula que un won un 5 % más fuerte resta ≈ 2,4 puntos de margen [D9]. Todas las recomendaciones siguen en comprar; objetivo medio de 58.385 KRW (Yahoo: 57.143 con 7 analistas) [D3, D4].',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    ...bolsa.bolsa,
    posicion_corta_pct: null,
    comentario: `La acción multiplicó por diez su precio entre 2022 y 2024 (de 2.455 a 32.700 KRW) con el salto del beneficio [D1]. Llegó a 56.100 KRW el 30-ene-2026 y hoy cotiza a 32.800 (cierre del 20-oct), un 41,5 % por debajo del máximo y un 9,9 % por encima del mínimo de 52 semanas (29.850, 26-jun-2026) [D1]. En el año cae un 15,1 % (KOSDAQ −15,5 %) y a un año un 25,4 % (KOSDAQ −10,7 %). Es muy volátil (63 % anual): cayó un 11,8 % el 3-feb (Goodai compra a su distribuidor en EE. UU.) [D11] y un 12,8 % el 4-mar (pánico del KOSDAQ por Oriente Medio) [D12], subió un 64 % en agosto (2T26 y entrada de CVC) y ha perdido un 40 % desde el 31-ago por el won y los recortes del 3T26 [D10]. A 32.800 KRW cotiza a ${r1(PRECIO / 3498)} veces el BPA de los últimos doce meses y a ${r1(PRECIO / 3576)} veces el BPA de 2026e del consenso.`,
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: ['2021', '2022', '2023', '2024', '2025'].map((a) => ({ anio: a, precio_cierre: bolsa.cierres_ejercicio.find((x) => x.anio === a).precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: a === '2022' || a === '2023' })),
    comentario: 'Cinco cierres como cotizada. PER adelantado (cierre ÷ BPA real del año siguiente): 2021 18,1x (3.216,67 ÷ 178); 2022 3,9x (2.455 ÷ 623); 2023 3,9x (7.710 ÷ 1.981); 2024 12,0x (32.700 ÷ 2.714); 2025 ≈ 11-12x sobre nuestro BPA de 2026e [D1, nota A]. Los de 2022 y 2023 miden la sorpresa del crecimiento (el BPA se multiplicó por 3,5 en 2023 y por 3,2 en 2024) más que una valoración: los excluimos como BPA atípico y lo decimos en el objetivo a 12 meses. PER al cierre (BPA del propio año): 21,6x, 13,8x, 12,4x, 16,5x y 14,2x.',
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Marcas y fabricantes de cosmética coreanos cotizados (APR, d\'Alba, VT, Clio, Amorepacific, Cosmax, Kolmar Korea) y tres distribuidores de belleza fuera de Corea (Paltac y Arata en Japón; Sally Beauty en EE. UU.). PER de los próximos 12 meses = precio ÷ (0,2 × BPA 2026e + 0,8 × BPA 2027e) de Yahoo; Paltac y Arata (ejercicio a marzo) con 0,45 × marzo-2027 + 0,55 × marzo-2028; Sally Beauty con el ejercicio a sept-2027. EV/EBITDA de los próximos 12 meses en blanco: Yahoo no da un EBITDA futuro homogéneo.',
    empresas: comparables,
    comentario: `No hay un comparable perfecto: las marcas coreanas tienen más margen y más riesgo de moda; los distribuidores maduros (Paltac, Arata, Sally) crecen un 1-3 % con márgenes EBITDA del 2-10 %. Mediana del grupo: ${r1(medianaPER)} veces el BPA de los próximos doce meses. Silicon2, a 32.800 KRW, cotiza a ${r1(PRECIO / blend(sil.et.find((t) => t.p === '0y').eps, sil.et.find((t) => t.p === '+1y').eps))} veces el BPA del consenso de Yahoo, por debajo de todos salvo Sally Beauty y VT, con un crecimiento del 30-40 % y un margen EBITDA del 19,6 %. El descuento refleja tres dudas: que el margen de distribuidor sea sostenible (los mayoristas maduros ganan un 2-3 %), que las marcas grandes se la salten y el won.`,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2026-08', objetivo: 'Silicon2 (RCPS, ≈ 9,2 % en base convertida)', comprador: 'CVC (Starlink Investment L.P.)', ev: null, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: true, comentario: '300.000 M a 45.000 KRW por acción, con derecho a reembolso al 2 % anual desde 2029: una inversión minoritaria con protección, no una compra de control [nota A: 9].' },
      { fecha: '2025', objetivo: 'Silicon2 (RCPS, ≈ 6,7 %)', comprador: 'Silk SPV (Glenwood Credit)', ev: null, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: true, comentario: '144.000 M a 32.695 KRW por acción; convertidas en abril de 2026.' },
    ],
    comentario: 'No hay compras de distribuidores de cosmética comparables con precio público (la de Hansung USA por Goodai Global no publicó importe). Las dos rondas de capital de Silicon2 dan una referencia: CVC pagó 45.000 KRW por acción en agosto de 2026 (con protección a la baja), un 37 % más que el precio de hoy.',
    confianza: 'Baja',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'bolsa', campo: 'Posición corta', tipo: 'Complemento', intentos: '1) KRX (data.krx.co.kr sin acceso desde este entorno); 2) FnGuide (no la publica); 3) foro de Naver (solo comentarios)', decision: 'Omitido' },
    { seccion: 'transacciones', campo: 'Compras de distribuidores comparables con precio', tipo: 'Complemento', intentos: '1) Goodai-Hansung USA (sin importe publicado); 2) prensa (sin múltiplos); 3) DART de Goodai (no cotiza)', decision: 'Omitido' },
  ],
};
guarda('D', D);

// ================================================================ E. Sentimiento
const fE = [
  { id: 1, titulo: 'Foro de Naver (종목토론실) de 257720: 400 mensajes del 13 al 20-oct-2026 (hora de Corea)', editor: 'Naver Pay Securities', tipo: 'Prensa', fecha: '2026-10-20', url: 'https://m.stock.naver.com/domestic/stock/257720/discussion' },
  fuenteN(2, 'wonko'),
  fuenteN(3, 'hana', 'Analistas'),
  fuenteN(4, 'q3'),
];
const E = {
  _estado: 'completa',
  sentimiento: {
    tono: 'Negativo',
    tendencia: 'Empeora',
    revisadas: [
      { plataforma: 'Foro de Naver (종목토론실), 13 al 20-oct-2026', fecha: '2026-10', n_comentarios: 400, tono: 'Negativo', resumen: 'Frustración tras caer de 54.200 a ≈ 32.000 KRW en siete semanas: análisis técnico («hombro-cabeza-hombro», soporte en 30.000), quejas de que compran los particulares mientras venden extranjeros e instituciones, críticas a la empresa por no defender la acción y dudas sobre el won; una minoría alcista a largo plazo recuerda el precio de CVC (45.000) [E1].' },
      { plataforma: 'Prensa y análisis coreanos', fecha: '2026-10', n_comentarios: 3, tono: 'Neutro', resumen: 'Recortes de objetivo por el won pero todas en comprar [E3]; las exportaciones de cosmética siguen en récord (+38,2 % en el 3T26) [E4]; la cosmética y la alimentación coreanas corrigen como grupo [E2].' },
    ],
    temas: [
      { tema: 'El won fuerte y el margen del 3T26', postura: 'Bajista', peso: 'Alto', contraste: 'Cierto: el won subió un 5,6 % frente al dólar y un 6,5 % frente al euro en el 3T26; NH estima −2,4 puntos de margen por cada 5 % [E3, E4].' },
      { tema: 'Ventas de extranjeros e instituciones', postura: 'Bajista', peso: 'Medio', contraste: 'Plausible (los extranjeros tienen solo el 11,9 %); es flujo, no negocio.' },
      { tema: 'Desintermediación (Goodai, APR)', postura: 'Bajista', peso: 'Medio', contraste: 'Cierto y estructural (nota B).' },
      { tema: 'Precio de CVC (45.000 KRW) como suelo', postura: 'Alcista', peso: 'Bajo', contraste: 'Parcial: CVC tiene reembolso garantizado, no necesita que la acción suba.' },
    ],
    lectura: 'Los particulares coreanos están cansados y desconfían; hablan de gráficos y flujos más que del negocio, que sigue creciendo un 40-50 %. Coinciden con los analistas en el miedo al margen del 3T26, pero las 13 casas siguen en comprar con objetivos de 52.000-65.000 KRW. No hay euforia: hay capitulación de parte del foro.',
    confianza: 'Media',
  },
  fuentes: fE,
  huecos: [],
};
guarda('E', E);
console.log('Notas A-E escritas;', comparables.length, 'comparables; mediana PER', r1(medianaPER), comparables.map((c) => `${c.nombre} ${c.per_ntm}`).join(', '));
