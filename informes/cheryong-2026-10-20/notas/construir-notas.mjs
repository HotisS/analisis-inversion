// Escribe las notas A-E de Cheryong Electric Co., Ltd. (제룡전기, 033100.KQ, KOSDAQ; corte 2026-10-20, cierre del 20-oct en Seúl).
// Fuentes primarias: DART (dart.fss.or.kr, visor de secciones con notas/dart.mjs): informes anuales (사업보고서) de 2025
// (corregido el 2-jun-2026, rcp 20260602000220, con 2025, 2024 y 2023), 2024 (20250317000538), 2023 (20240318000327, con 2023,
// 2022 y 2021) y 2021 (20220316001029, con 2021, 2020 y 2019); informe semestral de 2026 (20260813001320); trimestrales de
// 1T24 a 1T26; avisos de la KRX (variación de resultados, dividendo, compra de la nave de Daejeon, plan de valor, litigio).
// Cuentas individuales K-IFRS (별도): la sociedad no tiene filiales que consolidar. Ejercicio natural (31-dic). Millones de KRW.
// Consenso: FnGuide (Naver WiseReport): ningún analista en los últimos tres meses. Bolsa y comparables: Yahoo Finance.
// Cada nota cita solo con [n] de su propia lista. Ejecutar: node informes/cheryong-2026-10-20/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const DART = (rcp) => `https://dart.fss.or.kr/dsaf001/main.do?rcpNo=${rcp}`;
const WR = (p) => `https://navercomp.wisereport.co.kr/v2/company/${p}.aspx?cmp_cd=033100`;
const bolsa = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const compsRaw = JSON.parse(fs.readFileSync(path.join(dir, 'comparables-yahoo-raw.json'), 'utf8'));
const fx = Object.fromEntries(compsRaw.filter((c) => /=X$/.test(c.s)).map((c) => [c.s, c.price]));
const USDKRW = fx['KRW=X']; // 1.327,38 (Yahoo, 20-oct-2026)
const CADKRW = fx['CADKRW=X']; // 944,97
const TWDKRW = fx['TWDKRW=X']; // 40,596
const PRECIO = 40900; // cierre del 20-oct-2026 en el KOSDAQ (Yahoo; sesión cerrada a las 15:30 KST)
const ACCIONES = 16.062409; // 16.062.409 acciones emitidas, sin autocartera (semestral 2026)

// Prensa (Naver News y webs de los diarios), descargada el 20-oct-2026 en docs/news/.
const N = {
  sedaily: { titulo: 'AI 특수 누렸던 변압기 ‘휘청’…M&A 스텝 꼬인다 (el sector de transformadores entra en ajuste; Cheryong −36 % de ventas en el 1S26; Dongmi Electric valorado a ≈ 10 veces el EBITDA de 2025, ≈ 20 veces el de 2026)', editor: 'Seoul Economic Daily', fecha: '2026-10-14', url: 'https://www.sedaily.com/article/20090702' },
  edaily: { titulo: 'GIS 입찰담합 \'391억 과징금\' 줄소송 결과는…공정위 속속 승소 (Cheryong pierde en el Tribunal Supremo: multa de 1.165 M KRW firme)', editor: 'Edaily', fecha: '2026-10-19', url: 'https://www.edaily.co.kr/News/Read?newsId=04057366645614560&mediaCodeNo=257' },
  smedaily: { titulo: '변압기·케이블 수출 첫 분기 1조…낙수는 단절 (exportaciones coreanas de transformadores y cables récord en el 1T26; Cheryong, la excepción a la baja por aranceles y competencia)', editor: 'SME Daily (중소기업신문)', fecha: '2026-06', url: 'http://www.smedaily.co.kr/news/articleView.html?idxno=358676' },
  mk: { titulo: '“전력 아쉬워도 중국 장비는 쓰지마”...트럼프 명령에 K전력株 급등 (emergencia nacional de EE. UU. que limita la compra de equipos eléctricos de origen extranjero adversario)', editor: 'Maeil Business', fecha: '2026-08-27', url: 'https://www.mk.co.kr/news/stock/12138294' },
  fnnews: { titulo: 'Section 232: desde el 6-abr-2026 el arancel sobre derivados de acero, aluminio y cobre se cobra sobre el valor en aduana del producto acabado (15, 25 o 50 %); los transformadores de muy alta tensión, al 15 % hasta fin de 2027', editor: 'The Financial News (edición inglesa)', fecha: '2026-04-06', url: 'https://en.fnnews.com/news/202604061143170211' },
  sks: { titulo: 'SKS PE, ‘변압기 제조사’ 성진종합전기 550억 프리IPO 투자 (las cotizadas de transformadores, Cheryong incluida, a ≈ 17 veces el EBITDA)', editor: 'Seoul Economic Daily', fecha: '2026-08', url: 'https://www.sedaily.com/article/20084036' },
  asiae: { titulo: 'After an Unprecedented Boom: Korean High-Voltage Transformer Firms on Alert Over Multibillion-Won Tariff Shock (arancel del 50 % sobre el acero de los transformadores desde el 18-ago-2025)', editor: 'Asia Economy (edición inglesa)', fecha: '2025-08-19', url: 'https://view.asiae.co.kr/en/article/2025081911440803842' },
  topstar: { titulo: '[공매도 브리핑] 20일 … 제룡전기 26,43 % (peso de las ventas en corto en la negociación del 20-oct)', editor: 'Topstar News', fecha: '2026-10-20', url: 'https://www.topstarnews.net/news/articleView.html?idxno=16252563' },
  einfomax: { titulo: 'NH증권 "코스닥 1,500까지 상승 여지…공매도 비율 높은 종목 선호" (Cheryong, primera del KOSDAQ 150 por posición corta sobre el capital flotante)', editor: 'Yonhap Infomax', fecha: '2026-01-29', url: 'https://news.einfomax.co.kr/news/articleView.html?idxno=4395793' },
  econo: { titulo: '제룡전기 7% 급등 이어 산일전기 2%대 상승 (14-may-2026: 78.800 KRW tras cuatro sesiones de caída)', editor: 'Econonews', fecha: '2026-05-14', url: 'http://www.econonews.co.kr/news/articleView.html?idxno=438204' },
  einfo2: { titulo: '\'3대 메가프로젝트\' 수혜 기대…\'배전·초고압\' 전력주 빅사이클 가속 (30-jun-2026: inversión en la red coreana)', editor: 'Yonhap Infomax', fecha: '2026-06-30', url: 'https://news.einfomax.co.kr/news/articleView.html?idxno=4422520' },
  newsq: { titulo: '[박정식의 국내 주식시황] (21-may-2026: las «tres leyes de la red eléctrica» pasan la comisión de la Asamblea; Cheryong sube en el mercado alternativo)', editor: 'Newsquest', fecha: '2026-05-21', url: 'https://www.newsquest.co.kr/news/articleView.html?idxno=266590' },
  joongang: { titulo: '제룡전기 주가, 10월 20일 장중 40,950원 4.43% 하락', editor: 'Joongang Economy News', fecha: '2026-10-20', url: 'https://www.joongangenews.com/news/articleView.html?idxno=556685' },
};
const fuenteN = (id, k, tipo = 'Prensa') => ({ id, ...N[k], tipo });

// ================================================================ A. Cuentas
const fA = [
  { id: 1, titulo: '[기재정정] 사업보고서 2025 (informe anual corregido el 2-jun-2026): estados individuales K-IFRS de 2025, 2024 y 2023 auditados por Samil PwC, notas (gastos por naturaleza, ventas y gastos de venta, flujos, segmento único, clientes principales, vinculadas), ventas y cartera de pedidos, capacidad', editor: 'Cheryong Electric / DART (FSS)', tipo: 'Primaria', fecha: '2026-06-02', url: DART('20260602000220') },
  { id: 2, titulo: '반기보고서 2026 (informe semestral, revisión limitada): balance a 30-jun-2026, 2T26 y 1S26, gastos de venta (transporte), resultado financiero (plusvalía de 16.792 M en activos a valor razonable), flujos, cartera, capacidad y nave nueva', editor: 'Cheryong Electric / DART (FSS)', tipo: 'Primaria', fecha: '2026-08-13', url: DART('20260813001320') },
  { id: 3, titulo: '사업보고서 2024 (informe anual): estados de 2024 y 2023, notas y cartera a 31-dic-2024 (255.603 M)', editor: 'Cheryong Electric / DART (FSS)', tipo: 'Primaria', fecha: '2025-03-17', url: DART('20250317000538') },
  { id: 4, titulo: '사업보고서 2023 (informe anual): estados de 2023, 2022 y 2021, notas (amortización, flujos)', editor: 'Cheryong Electric / DART (FSS)', tipo: 'Primaria', fecha: '2024-03-18', url: DART('20240318000327') },
  { id: 5, titulo: '사업보고서 2021 (informe anual): estados de 2021, 2020 y 2019, notas (amortización)', editor: 'Cheryong Electric / DART (FSS)', tipo: 'Primaria', fecha: '2022-03-16', url: DART('20220316001029') },
  { id: 6, titulo: '분기보고서 1T26 (1T26 y 1T25; cartera a 31-mar-2026)', editor: 'Cheryong Electric / DART (FSS)', tipo: 'Primaria', fecha: '2026-05-13', url: DART('20260513000274') },
  { id: 7, titulo: '분기보고서 3T25 (3T25, 9M25 y 3T24; cartera a 30-sep-2025)', editor: 'Cheryong Electric / DART (FSS)', tipo: 'Primaria', fecha: '2025-11-12', url: DART('20251112000086') },
  { id: 8, titulo: '반기보고서 2025 (2T25 y 1S25; cartera a 30-jun-2025)', editor: 'Cheryong Electric / DART (FSS)', tipo: 'Primaria', fecha: '2025-08-13', url: DART('20250813000398') },
  { id: 9, titulo: '분기보고서 1T25 (cartera a 31-mar-2025)', editor: 'Cheryong Electric / DART (FSS)', tipo: 'Primaria', fecha: '2025-05-13', url: DART('20250513000541') },
  { id: 10, titulo: '분기보고서 3T24 (3T24, 9M24 y 3T23; cartera a 30-sep-2024)', editor: 'Cheryong Electric / DART (FSS)', tipo: 'Primaria', fecha: '2024-11-11', url: DART('20241111000144') },
  { id: 11, titulo: '매출액또는손익구조30%이상변동 (variación de resultados de 2025: ventas −14,7 %, beneficio operativo −31,4 %; causa: competencia en distribución en Norteamérica y aranceles de EE. UU.)', editor: 'Cheryong Electric / KRX', tipo: 'Primaria', fecha: '2026-02-09', url: DART('20260209900965') },
  { id: 12, titulo: '현금ㆍ현물배당결정 (dividendo de 2025: 1.100 KRW por acción, 17.669 M)', editor: 'Cheryong Electric / KRX', tipo: 'Primaria', fecha: '2026-02-09', url: DART('20260209900972') },
  { id: 13, titulo: '주요사항보고서(유형자산양수결정): terreno y edificios de Bosch Korea en Daejeon por 40.000 M KRW (16,5 % del activo) para transformadores de media y gran potencia', editor: 'Cheryong Electric / DART (FSS)', tipo: 'Primaria', fecha: '2026-02-04', url: DART('20260204000215') },
  { id: 14, titulo: '반기보고서 2024 y 분기보고서 1T24 (cartera a 31-mar-2024: 305.567 M; a 30-jun-2024: 292.992 M)', editor: 'Cheryong Electric / DART (FSS)', tipo: 'Primaria', fecha: '2024-08-09', url: DART('20240809000501') },
  fuenteN(15, 'sedaily'),
];

// Cuenta por función (K-IFRS, individual). EBITDA = beneficio operativo + amortización de inmovilizado, derechos de uso e
// intangibles (nota de gastos por naturaleza). resultado_financiero = BAI − beneficio operativo (incluye intereses de los
// depósitos, diferencias de cambio, otros ingresos y gastos y el resultado de la asociada). BPA básico = diluido (sin
// instrumentos dilusivos); acciones = 16,06 M todos los años. DPA del ejercicio (pagado al año siguiente).
const cuenta = [
  { periodo: '2020', ingresos: 44196, coste_ventas: 35447, gastos_generales: 4969, ebitda: 6155, amortizaciones: 2376, ebit: 3779, resultado_financiero: 150, bai: 3929, impuestos: 404, minoritarios: 0, beneficio_neto: 3525, gastos_financieros: 18, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 219, dpa: 50, dpa_extraordinario: 0, acciones_diluidas: 16.06 },
  { periodo: '2021', ingresos: 48783, coste_ventas: 41157, gastos_generales: 7509, ebitda: 2315, amortizaciones: 2198, ebit: 117, resultado_financiero: 962, bai: 1079, impuestos: -94, minoritarios: 0, beneficio_neto: 1173, gastos_financieros: 8, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 73, dpa: 50, dpa_extraordinario: 0, acciones_diluidas: 16.06 },
  { periodo: '2022', ingresos: 86061, coste_ventas: 53725, gastos_generales: 16353, ebitda: 17432, amortizaciones: 1449, ebit: 15983, resultado_financiero: -446, bai: 15537, impuestos: 3057, minoritarios: 0, beneficio_neto: 12480, gastos_financieros: 6, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 777, dpa: 150, dpa_extraordinario: 0, acciones_diluidas: 16.06 },
  { periodo: '2023', ingresos: 183941, coste_ventas: 92739, gastos_generales: 21050, ebitda: 71525, amortizaciones: 1373, ebit: 70152, resultado_financiero: 1717, bai: 71869, impuestos: 15485, minoritarios: 0, beneficio_neto: 56384, gastos_financieros: 8, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 3510, dpa: 500, dpa_extraordinario: 0, acciones_diluidas: 16.06 },
  { periodo: '2024', ingresos: 262736, coste_ventas: 126911, gastos_generales: 37980, ebitda: 99374, amortizaciones: 1529, ebit: 97845, resultado_financiero: 4984, bai: 102829, impuestos: 22908, minoritarios: 0, beneficio_neto: 79921, gastos_financieros: 28, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 4976, dpa: 1000, dpa_extraordinario: 0, acciones_diluidas: 16.06 },
  { periodo: '2025', ingresos: 224017, coste_ventas: 109597, gastos_generales: 47392, ebitda: 68929, amortizaciones: 1902, ebit: 67027, resultado_financiero: 7472, bai: 74499, impuestos: 15786, minoritarios: 0, beneficio_neto: 58712, gastos_financieros: 33, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 3655, dpa: 1100, dpa_extraordinario: 0, acciones_diluidas: 16.06 },
];
// Caja = efectivo + otros activos financieros corrientes (depósitos a plazo en bancos, a coste amortizado). Sin deuda
// financiera desde 2020 (en 2019: 1.158 M). Arrendamientos = pasivo por arrendamiento corriente + no corriente.
const balanceHist = [
  { periodo: '2020', activo_total: 71229, activo_corriente: 47250, pasivo_corriente: 12085, pasivo_total: 12451, fondo_comercio: 0, intangibles: 1111, inmovilizado_material: 19085, existencias: 7469, clientes: 10401, proveedores: 11903, activos_contrato: null, pasivos_contrato: null, caja: 29380, deuda_financiera: 0, arrendamientos: 323, patrimonio_neto: 58779, minoritarios: 0, reservas: 46556 },
  { periodo: '2021', activo_total: 77412, activo_corriente: 54942, pasivo_corriente: 18009, pasivo_total: 18258, fondo_comercio: 0, intangibles: 253, inmovilizado_material: 18207, existencias: 10826, clientes: 8483, proveedores: 17844, activos_contrato: null, pasivos_contrato: null, caja: 35623, deuda_financiera: 0, arrendamientos: 234, patrimonio_neto: 59153, minoritarios: 0, reservas: 46926 },
  { periodo: '2022', activo_total: 87891, activo_corriente: 66481, pasivo_corriente: 16579, pasivo_total: 17061, fondo_comercio: 0, intangibles: 107, inmovilizado_material: 17774, existencias: 25705, clientes: 24178, proveedores: 14157, activos_contrato: null, pasivos_contrato: null, caja: 16599, deuda_financiera: 0, arrendamientos: 243, patrimonio_neto: 70830, minoritarios: 0, reservas: 58603 },
  { periodo: '2023', activo_total: 158673, activo_corriente: 134533, pasivo_corriente: 33148, pasivo_total: 33869, fondo_comercio: 0, intangibles: 200, inmovilizado_material: 18727, existencias: 43040, clientes: 41337, proveedores: 18933, activos_contrato: null, pasivos_contrato: null, caja: 50156, deuda_financiera: 0, arrendamientos: 410, patrimonio_neto: 124804, minoritarios: 0, reservas: 99604 },
  { periodo: '2024', activo_total: 241768, activo_corriente: 215441, pasivo_corriente: 43685, pasivo_total: 45073, fondo_comercio: 0, intangibles: 226, inmovilizado_material: 19787, existencias: 44177, clientes: 35890, proveedores: 26980, activos_contrato: null, pasivos_contrato: null, caja: 135374, deuda_financiera: 0, arrendamientos: 694, patrimonio_neto: 196694, minoritarios: 0, reservas: 171494 },
  { periodo: '2025', activo_total: 266912, activo_corriente: 238936, pasivo_corriente: 26132, pasivo_total: 27568, fondo_comercio: 0, intangibles: 344, inmovilizado_material: 20494, existencias: 32405, clientes: 21231, proveedores: 17353, activos_contrato: null, pasivos_contrato: null, caja: 185299, deuda_financiera: 0, arrendamientos: 729, patrimonio_neto: 239344, minoritarios: 0, reservas: 214144 },
];
// capex = inmovilizado material + intangibles. Intereses pagados y cobrados, en el flujo operativo.
const flujosHist = [
  { periodo: '2020', flujo_operativo: 6848, capex: 567, pagos_arrendamientos: 176, adquisiciones: 0, desinversiones: 0, dividendos: 803, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: '2021', flujo_operativo: 7461, capex: 272, pagos_arrendamientos: 185, adquisiciones: 0, desinversiones: 0, dividendos: 803, recompras: 0, emision_acciones: 4, intereses_en_financiacion: 0 },
  { periodo: '2022', flujo_operativo: -17020, capex: 656, pagos_arrendamientos: 212, adquisiciones: 0, desinversiones: 0, dividendos: 803, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: '2023', flujo_operativo: 39530, capex: 2184, pagos_arrendamientos: 205, adquisiciones: 0, desinversiones: 0, dividendos: 2409, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: '2024', flujo_operativo: 95692, capex: 2325, pagos_arrendamientos: 221, adquisiciones: 0, desinversiones: 0, dividendos: 8031, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: '2025', flujo_operativo: 67170, capex: 2405, pagos_arrendamientos: 259, adquisiciones: 0, desinversiones: 0, dividendos: 16062, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
];

const A = {
  _estado: 'completa',
  financieros: {
    cuenta,
    // LTM jun-26 = 2025 − 1S25 + 1S26 [A1, A2, A8]. Ventas 224.017 − 110.560 + 70.323 = 183.780; beneficio operativo
    // 67.027 − 36.476 + 11.123 = 41.674; amortización 1.902 − 920 + 1.075 = 2.057; beneficio 58.712 − 29.852 + 26.086 = 54.946;
    // BPA 54.946 ÷ 16,06 = 3.421 (el mismo que da FnGuide). FCF: flujo operativo 67.170 − 23.712 + 13.188 = 56.646; capex
    // 2.405 − 1.713 + 45.736 = 46.428 (incluye la nave de Daejeon); arrendamientos ≈ 271.
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 183780, ebitda: 43731, ebit: 41674, beneficio_neto: 54946, bpa: 3421, dpa: 1100, dpa_extraordinario: 0, fcf: 9947, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [],
    comentario: 'Cheryong vive el ciclo de los transformadores de distribución en EE. UU. Las ventas pasaron de 44.196 M KRW en 2020 a 262.736 M en 2024 (×5,9) y el margen operativo del 8,6 % al 37,2 % (2023: 38,1 %), con un margen bruto que subió del 19,8 % al 51,7 % por precio, no por volumen: las unidades exportadas bajaron de 29.174 en 2024 a 16.733 en 2025 mientras el precio medio por unidad subía de ≈ 8,0 M a ≈ 11,9 M KRW [A1]. **El ciclo ya gira**: 2025 cerró con ventas −14,7 % y beneficio operativo −31,4 % por «la competencia en el mercado norteamericano de transformadores de distribución, al estabilizarse el suministro, y los aranceles de EE. UU.» [A11]; el 1S26, con ventas −36,4 % (70.323 M) y beneficio operativo −69,5 % (11.123 M, margen del 15,8 %) [A2]. Los gastos de transporte (운반비, donde la empresa registra el envío y los derechos de aduana al vender entregado) pasaron del 7,2 % de las ventas en 2024 al 12,7 % en 2025 y al 27,8 % en el 2T26 [A1, A2]. Todo el crecimiento es orgánico.',
    ajustes: 'Cifras publicadas K-IFRS, sin ajustes. Tres avisos. (1) El beneficio del 1S26 (26.086 M) lleva una plusvalía de 16.792 M por la venta de activos financieros a valor razonable (compras de 41.069 M y ventas de 57.862 M en el semestre): no es recurrente; sin ella, el BAI del semestre sería ≈ 17.000 M [A2]. (2) El resultado financiero recurrente son sobre todo intereses de los depósitos (≈ 4.100-4.500 M al año con ≈ 150.000-185.000 M de caja) y diferencias de cambio [A1, A2]. (3) 2021 (beneficio operativo de 117 M) fue un año de márgenes hundidos por el coste del acero y del cobre antes de la subida de precios; el BPA de 73 KRW no es representativo [A5]. El aviso preliminar de 2025 dio un beneficio de 59.064 M; el auditado es 58.712 M [A1, A11].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '3T24', ingresos: 69436, crecimiento_pct: 66.1, crecimiento_organico_pct: 66.1, ebitda: null, margen_ebitda_pct: null, bpa: 1273, vs_consenso: null },
      { periodo: '4T24', ingresos: 50767, crecimiento_pct: -22.8, crecimiento_organico_pct: -22.8, ebitda: null, margen_ebitda_pct: null, bpa: 655, vs_consenso: null },
      { periodo: '1T25', ingresos: 50203, crecimiento_pct: -22.7, crecimiento_organico_pct: -22.7, ebitda: null, margen_ebitda_pct: null, bpa: 917, vs_consenso: null },
      { periodo: '2T25', ingresos: 60358, crecimiento_pct: -22.2, crecimiento_organico_pct: -22.2, ebitda: null, margen_ebitda_pct: null, bpa: 941, vs_consenso: null },
      { periodo: '3T25', ingresos: 69750, crecimiento_pct: 0.5, crecimiento_organico_pct: 0.5, ebitda: null, margen_ebitda_pct: null, bpa: 1244, vs_consenso: null },
      { periodo: '4T25', ingresos: 43707, crecimiento_pct: -13.9, crecimiento_organico_pct: -13.9, ebitda: null, margen_ebitda_pct: null, bpa: 553, vs_consenso: null },
      { periodo: '1T26', ingresos: 34673, crecimiento_pct: -30.9, crecimiento_organico_pct: -30.9, ebitda: null, margen_ebitda_pct: null, bpa: 502, vs_consenso: null },
      { periodo: '2T26', ingresos: 35649, crecimiento_pct: -40.9, crecimiento_organico_pct: -40.9, ebitda: null, margen_ebitda_pct: null, bpa: 1122, vs_consenso: null },
    ],
    ultima_presentacion: 'Cheryong no da conferencias con analistas ni guía, y ninguna casa la cubre (FnGuide: ninguna recomendación en tres meses). Lo que dice la dirección está en los informes. Ventas y beneficio de cada trimestre de los trimestrales, semestrales y anuales; el 4T sale del anual menos los nueve meses [A1-A3, A6-A10]. El BPA trimestral es el beneficio entre 16,06 M de acciones (el de 2T26, 1.122 KRW, lleva la plusvalía financiera de 16.025 M del trimestre). Beneficio operativo trimestral: 26.630 M (3T24), 12.702 M (4T24), 16.068 M (1T25), 20.408 M (2T25), 22.530 M (3T25), 8.021 M (4T25), 5.888 M (1T26) y 5.234 M (2T26): del 38,4 % al 14,7 % de margen en siete trimestres. En el informe semestral la dirección habla de «estabilización de la capacidad mundial y competencia», de «apalancamiento operativo negativo con más costes fijos por la inversión en la gama» y de los aranceles; para 2026 espera demanda pública en Corea y más competencia en EE. UU., y apuesta por transformadores de media y gran potencia (154 kV) [A2]. No hemos encontrado el EBITDA trimestral (la amortización solo se publica por semestre) ni un consenso previo.',
    confianza: 'Alta',
  },
  balance: {
    historico: balanceHist,
    vencimientos: [],
    liquidez: 'A 30-jun-2026: efectivo de 39.457 M y depósitos a plazo de 114.496 M (153.953 M), sin deuda financiera; arrendamientos de 578 M [A2]. La caja bajó desde 185.299 M (dic-2025) por la compra de la nave de Daejeon (40.000 M, pagada en el 1S26) y el dividendo (17.669 M) [A2, A12, A13].',
    rating: 'Sin rating de deuda (no tiene bonos). Calificaciones de empresa: A+ (e-Credible, mar-2026) y AA− (SCI, mar-2026)',
    coste_deuda_pct: null,
    vida_media_anios: null,
    otros_pasivos: 'Sin deuda, garantías ni pensiones de prestación definida relevantes (provisiones no corrientes de 679 M, sobre todo garantías de producto) [A2]. Contingencias: multa de la Comisión de Competencia por el cártel de las subastas de GIS de KEPCO (1.165 M, firme tras perder en el Tribunal Supremo), veto de seis meses de KEPCO a sus subastas (suspendido por un juez mientras se pleitea) y una demanda de daños de KEPCO de 2.000 M contra diez fabricantes en primera instancia [A2]. Impuesto de sociedades a pagar de 12.383 M [A2].',
    comentario: 'Un balance de caja: 153.953 M de efectivo y depósitos frente a una capitalización de 656.953 M (23 %). El circulante comercial (existencias + clientes − proveedores) bajó de 66.444 M en 2023 (36 % de las ventas) a 36.283 M en 2025 (16 %), y en junio de 2026 era de 35.610 M, ≈ 25 % de las ventas anualizadas del semestre [A1, A2]. La nave de Daejeon llevó el inmovilizado material de 20.494 M a 65.192 M en seis meses (+44.698 M): es la primera inversión grande en una década y cambia el capital invertido [A2, A13].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujosHist,
    comentario: 'La conversión en caja es buena con el ciclo a favor: el flujo operativo de 2023-2025 (202.392 M) fue el 104 % del beneficio (195.017 M), con el capex por debajo del 1,3 % de las ventas [A1, A3, A4]. En 2022 fue negativo (−17.020 M) por la compra de existencias y los clientes al arrancar las exportaciones. El 1S26 cambia: flujo operativo de 13.188 M, capex de 45.736 M (la nave) y dividendo de 17.669 M [A2]. El capex de mantenimiento es pequeño (≈ 2.000-2.500 M al año: amortización de 1.373-1.902 M); para 2026 la empresa prevé 45.545 M de inversión en terreno y edificios y habrá equipamiento después [A2]. Estimación propia: el capex de mantenimiento es el 1-1,5 % de las ventas.',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'Samil PwC (삼일회계법인)',
    anios_auditor: 2,
    opinion: 'Favorable (2025)',
    comentario: 'Samil PwC audita desde 2024 (antes, Hyundai Accounting) con opinión favorable y la existencia de las ventas de producto como cuestión clave [A1]. Revisado: reconocimiento de ingresos (entrega; algún contrato público por avance de obra), gastos de transporte y aduana dentro de gastos de venta, activos por costes de obtención de contratos (amortización de 3.475 M por semestre), la plusvalía de activos financieros del 1S26 y las vinculadas. Tres puntos a vigilar. (1) **Compras a una vinculada**: Woojin Electric (우진전기), de la que el presidente es consejero delegado, vendió a Cheryong núcleos y componentes por 23.374 M en 2024 y 14.061 M en 2025 (13 % de las compras de materias primas) [A1]. (2) El corregido de junio de 2026 cambió dos notas (unidades de avance de obra y divisa de activos en dólares) sin tocar las cifras [A1]. (3) El beneficio del 1S26 depende en un 64 % de la plusvalía financiera [A2]. Lectura de los indicadores del motor: con el salto de ventas de 2022-2024, el Beneish puede dar falsos positivos; el Altman sale muy alto por la caja y la ausencia de deuda.',
    senales: [
      { senal: 'Compras a una sociedad del presidente (Woojin Electric)', nivel: 'Media', comentario: '14.061 M en 2025 y 23.374 M en 2024 [A1].' },
      { senal: 'Beneficio del 1S26 inflado por una plusvalía financiera', nivel: 'Media', comentario: '16.792 M de 26.086 M [A2].' },
      { senal: 'Cambio de auditor en 2024', nivel: 'Baja', comentario: 'De Hyundai Accounting a Samil PwC; opinión favorable [A1].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Dividendo creciente con el ciclo: 50 KRW por acción (2019-2021), 150 (2022), 500 (2023), 1.000 (2024) y 1.100 (2025: 17.669 M, 30,1 % del beneficio) [A1, A12]. El plan de valor de marzo de 2026 promete «un dividendo sostenible», mejor coste y nuevos productos, sin cifras [A2]. Sin recompras ni autocartera. Prioridad declarada para la caja: la gama de transformadores de media y gran potencia (154 kV) [A2, A13].',
    adquisiciones: [
      { anio: '2026', objetivo: 'Terreno y edificios de Bosch Korea en Daejeon (nave 2), junto a la fábrica actual', importe: 40000, ev_ebitda: null, financiacion: 'Caja propia', resultado: 'Para transformadores de media y gran potencia; sin producción aún. Inversión total prevista para 2026: 45.545 M [A2, A13].' },
    ],
    comentario: 'La dirección ha sido prudente: sin deuda, sin compras de empresas, capex mínimo y reparto creciente, y ha acumulado caja (de 29.380 M en 2020 a 185.299 M en 2025) [A1, A5]. La primera decisión grande, la nave de 40.000 M, llega cuando el ciclo de distribución gira y apuesta por un mercado (potencia, 154 kV) donde Cheryong no tiene historia ni homologaciones en EE. UU. [A2]. El 30 % de reparto deja la caja sin uso: con 153.953 M (23 % de la capitalización) y el beneficio a la baja, una recompra sería una señal; no la hay.',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'Transformadores: exportación (sobre todo EE. UU.)', descripcion: 'Transformadores de distribución en aceite (de poste y de pedestal, monofásicos y trifásicos hasta 3.750 kVA) para distribuidoras eléctricas y mayoristas de EE. UU.', tipo_resultado: null, historico: [{ periodo: '2023', ingresos: 150197, resultado: null }, { periodo: '2024', ingresos: 234490, resultado: null }, { periodo: '2025', ingresos: 198920, resultado: null }] },
      { nombre: 'Transformadores y otros: Corea', descripcion: 'Transformadores de resina (몰드) y en aceite, GIS y obras para KEPCO, ferrocarril y clientes industriales coreanos', tipo_resultado: null, historico: [{ periodo: '2023', ingresos: 33744, resultado: null }, { periodo: '2024', ingresos: 28246, resultado: null }, { periodo: '2025', ingresos: 25097, resultado: null }] },
    ],
    geografias: [
      { nombre: 'EE. UU. (exportación)', peso_pct: 88.8 },
      { nombre: 'Corea', peso_pct: 11.2 },
    ],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Cartera de pedidos', valor_anterior: '255.603 M (dic-2024)', valor_actual: '141.580 M (jun-2026)', variacion: '−44,6 %', comentario: 'Máximo de 305.567 M en mar-2024; 150.076 M en dic-2025 y 153.251 M en mar-2026 [A1, A2, A3, A6, A14].' },
      { kpi: 'Pedidos nuevos', valor_anterior: '118.490 M (2025)', valor_actual: '61.827 M (1S26)', variacion: '≈ 124.000 M anualizados', comentario: 'Pedidos/ventas de 0,53 en 2025 y 0,88 en el 1S26 [A1, A2].' },
      { kpi: 'Unidades exportadas', valor_anterior: '29.174 (2024)', valor_actual: '16.733 (2025); 4.912 (1S26)', variacion: '−42,6 % en 2025', comentario: 'Precio medio ≈ 8,0 M KRW por unidad en 2024, ≈ 11,9 M en 2025 y ≈ 12,0 M en el 1S26 [A1, A2].' },
      { kpi: 'Transporte y aduanas sobre ventas', valor_anterior: '12,6 % (2T25)', valor_actual: '27,8 % (2T26)', variacion: '+15,2 puntos', comentario: '9.905 M de 35.649 M de ventas en el 2T26: el arancel de la sección 232 lo paga Cheryong [A2].' },
      { kpi: 'Margen operativo', valor_anterior: '37,2 % (2024)', valor_actual: '15,8 % (1S26)', variacion: '−21,4 puntos', comentario: '29,9 % en 2025 [A1, A2].' },
      { kpi: 'Uso de la capacidad (horas de trabajo)', valor_anterior: 'n. d.', valor_actual: '107,9 % (1S26)', variacion: '—', comentario: 'Capacidad en unidades de 29.855 (2024), 17.449 (2025) y 8.122 en el semestre: se mide por la mezcla de productos [A2].' },
    ],
  },
  fuentes: fA,
  huecos: [
    { seccion: 'trimestres', campo: 'EBITDA trimestral y consenso previo de cada trimestre', tipo: 'Complemento', intentos: '1) Informes trimestrales de DART (amortización solo semestral y anual); 2) FnGuide (ninguna estimación en tres meses); 3) prensa (no hay previsiones de analistas)', decision: 'Omitido' },
    { seccion: 'balance', campo: 'Vencimientos de deuda', tipo: 'Complemento', intentos: '1) Nota de pasivos financieros (no hay deuda); 2) nota de arrendamientos (578 M); 3) no aplica', decision: 'Omitido' },
  ],
};
// Segmento Corea: 2023 y 2024 = ventas nacionales del informe (28.246 M en 2024; en 2023, 183.941 − 155.695 = 28.246 por
// coincidencia no: ver nota). Se corrige abajo con las cifras exactas de cada informe.
A.negocio.segmentos[0].historico[0].ingresos = 150197; // exportación 2023 (81,7 %) [A3]
A.negocio.segmentos[1].historico[0].ingresos = 33744;
guarda('A', A);

// ================================================================ B. Sector y competencia
const fB = [
  { id: 1, titulo: '[기재정정] 사업보고서 2025: negocio (transformadores 100 %), productos, materias primas (POSCO, Woojin), capacidad, ventas por mercado, clientes (A 37,9 %, B 24,5 %, C 12,3 %), mercado y competencia', editor: 'Cheryong Electric / DART (FSS)', tipo: 'Primaria', fecha: '2026-06-02', url: DART('20260602000220') },
  { id: 2, titulo: '반기보고서 2026: situación del mercado («estabilización de la capacidad mundial y competencia»), aranceles, plan de 154 kV, nave nueva, historia (certificación UL de transformadores de pedestal trifásicos en nov-2025)', editor: 'Cheryong Electric / DART (FSS)', tipo: 'Primaria', fecha: '2026-08-13', url: DART('20260813001320') },
  { id: 3, titulo: 'Ficha sectorial corta: transformadores y equipos de red (GlobalData: 53.510 M USD de transformadores de distribución en 2030; Wood Mackenzie: déficit del 10 % en distribución en EE. UU., demanda +41 % desde 2019, 50 % importado; márgenes de ciclo normal y de pico)', editor: 'Repositorio propio (sectores/transformadores-2026-10-16.md)', tipo: 'Sectorial', fecha: '2026-10-16', url: 'https://www.woodmac.com' },
  { id: 4, titulo: 'Power Transformer Market Size Projected to Grow $41.62 billion by 2030 (30.380 M USD en 2025; +6,5 % anual)', editor: 'MarketsandMarkets (GlobeNewswire)', tipo: 'Sectorial', fecha: '2025-09-29', url: 'https://www.globenewswire.com/news-release/2025/09/29/3157392/0/en/Power-Transformer-Market-Size-Projected-to-Grow-41-62-billion-by-2030-MarketsandMarkets.html' },
  fuenteN(5, 'fnnews'),
  fuenteN(6, 'asiae'),
  fuenteN(7, 'sedaily'),
  fuenteN(8, 'smedaily'),
  fuenteN(9, 'mk'),
  { id: 10, titulo: 'Fichas de HD Hyundai Electric, Hyosung Heavy, LS Electric, Iljin Electric, Sanil Electric, Hammond Power, Fortune Electric, Shihlin, Allis y Powell (ventas y márgenes de los últimos doce meses)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/062040.KS' },
  { id: 11, titulo: 'Informe semestral de 2026 (5. 위험관리 y 7. 기타 참고사항): precios de chapa magnética (4.180 KRW/kg) y núcleos amorfos, cuota de mercado no publicada', editor: 'Cheryong Electric / DART (FSS)', tipo: 'Primaria', fecha: '2026-08-13', url: DART('20260813001320') },
  fuenteN(12, 'einfo2'),
];

const B = {
  _estado: 'completa',
  historia: {
    resumen: 'Cheryong Electric nació en 1986 como fabricante de material eléctrico y abrió su fábrica de Daejeon en 2005. Cotiza en el KOSDAQ desde agosto de 1997. En 2011 escindió el negocio de metal y plásticos (hoy Cheryong Industrial, 제룡산업, también de la familia Park) y se quedó solo con los transformadores y la aparamenta [A1]. Durante dos décadas vendió sobre todo en Corea (KEPCO, ferrocarril) con márgenes de un dígito alto; desde 2015 exporta transformadores de distribución a EE. UU. («torre» de 10 M USD de exportación en 2015, de 70 M USD en 2023 y de 100 M USD en 2024) [B2]. La escasez de transformadores en EE. UU. a partir de 2022 multiplicó por seis las ventas y por veinticinco el beneficio operativo entre 2021 y 2024 [B1]. En 2026 compró la nave de Bosch Korea en Daejeon para entrar en media y gran potencia [B2].',
    hitos: [
      { anio: '1986', hito: 'Fundación; fábrica de Cheongsan (1990) y centro de I+D (1992) [B2].' },
      { anio: '1997', hito: 'Salida al KOSDAQ [B2].' },
      { anio: '2005', hito: 'Fábrica de Daejeon, la única hoy [B2].' },
      { anio: '2011', hito: 'Escisión del negocio de metal y plásticos (Cheryong Industrial) [B2].' },
      { anio: '2015', hito: 'Primer hito exportador: 10 M USD al año, sobre todo a EE. UU. [B2].' },
      { anio: '2023', hito: 'Ventas de 183.941 M KRW (×2,1) y margen operativo del 38 %; 70 M USD de exportación [B1, B2].' },
      { anio: '2024', hito: 'Máximo del ciclo: ventas de 262.736 M y 100 M USD de exportación; cartera récord de 305.567 M en marzo; multa por el cártel de GIS de KEPCO (diciembre) [B1, B2].' },
      { anio: '2025', hito: 'Ventas −14,7 % por competencia y aranceles; certificación UL de transformadores de pedestal trifásicos hasta 3.750 kVA (noviembre) [B1, B2].' },
      { anio: '2026', hito: 'Compra de la nave 2 de Daejeon (40.000 M) para 154 kV; ventas del 1S −36 % [B2].' },
    ],
    confianza: 'Alta',
  },
  negocio: {
    descripcion: 'Cheryong fabrica transformadores, el aparato que baja la tensión de la red a la que usa el cliente final, en una sola fábrica en Daejeon (Corea) con 190 empleados [B1]. El 100 % de las ventas son de la división de material eléctrico pesado y casi todo son transformadores de distribución: de poste (monofásicos, los que cuelgan en las calles de EE. UU.) y de pedestal (pad-mounted, en el suelo, para urbanizaciones, comercios y centros de datos), en aceite y con núcleo de chapa magnética o amorfo [B1, B2]. El 88,8 % de las ventas de 2025 fue exportación a EE. UU. (198.920 M KRW) y el 11,2 % a Corea (KEPCO, ferrocarril e industria: transformadores secos de resina, GIS y obras) [B1]. Tres clientes, que la empresa no nombra (A, B y C), fueron el 74,6 % de las ventas de 2025 [B1]. En noviembre de 2025 obtuvo la certificación UL para transformadores de pedestal trifásicos de hasta 3.750 kVA, más grandes y caros [B2].',
    como_gana_dinero: 'Vende por pedido, con plazos de entrega de meses, a precio cerrado en dólares, y cobra al contado unos 50 días después de entregar [B1]. El coste principal es material: chapa magnética de POSCO y núcleos de Woojin Electric (vinculada), cobre y aceite; el material comprado fue el 45 % del gasto en 2025 [B1]. El margen depende sobre todo del **precio en EE. UU.**, que se disparó con la escasez de 2022-2024 (margen bruto del 51,7 % en 2024 frente al 19,8 % en 2020) y ahora baja con la competencia [B1]. Desde 2025 también pesan los **aranceles**: Cheryong vende entregado y paga el transporte y el arancel, que suman el 27,8 % de las ventas del 2T26 [B1, B2]. Apalancamiento operativo alto: con ventas −36 % en el 1S26, el beneficio operativo cayó un 69,5 % [B2]. Sin ingresos recurrentes: cada año hay que volver a ganar los pedidos.',
    clientes: 'Muy concentrados: el primer cliente (A) fue el 37,9 % de las ventas de 2025 (38,3 % en 2024), el segundo (B) el 24,5 % (17,1 %) y el tercero (C) el 12,3 % (11,1 %): el 74,6 % entre tres [B1]. No se publican los nombres; por el producto son distribuidoras eléctricas o mayoristas de material eléctrico de EE. UU. Los contratos son pedidos, sin compromisos plurianuales publicados. **Poder de precios**: lo tuvo con la escasez (el precio medio por unidad exportada subió de ≈ 8,0 M a ≈ 11,9 M KRW entre 2024 y 2025, en parte por mezcla) [B1], pero no lo ha tenido para repercutir el arancel: el margen operativo bajó del 37,2 % (2024) al 15,8 % (1S26) [B1, B2]. En Corea vende a KEPCO por subasta pública; en 2025 KEPCO la vetó seis meses por el cártel de GIS (veto suspendido por un juez) [B2].',
  },
  sector: {
    definicion: 'El mercado que importa es el de **transformadores de distribución en EE. UU.**, donde Cheryong vende el 89 %. Como no hay cifra pública de ese mercado con fuente primaria, usamos el mundial de transformadores de distribución de GlobalData (53.510 M USD en 2030) recogido en la ficha sectorial del repositorio, con las cifras de Wood Mackenzie para EE. UU. (déficit del 10 %, demanda +41 % desde 2019, 50 % de importación) [B3]. MarketsandMarkets mide solo potencia (30.380 M USD en 2025) [B4]: sirve de contraste del ciclo, no del perímetro. Estimación propia de distribución mundial en 2025: ≈ 34.800 M USD (total de ≈ 65.200 M menos potencia) [B3, B4].',
    tamano: '≈ 34.800 M USD de transformadores de distribución en el mundo en 2025 (estimación propia con GlobalData y MarketsandMarkets) y 53.510 M USD en 2030 (GlobalData) [B3, B4]',
    unidad_serie: 'millones de USD (transformadores de distribución, mundo)',
    serie: [
      { anio: '2025', tamano: 34800 },
      { anio: '2030e', tamano: 53510 },
    ],
    tcac_historico_pct: null,
    tcac_previsto_pct: 9.0,
    cr5_pct: null,
    estructura: 'Fragmentada',
    drivers: [
      { driver: 'Centros de datos de IA', efecto: '+', horizonte: 'Estructural', evidencia: 'Los centros de datos piden transformadores de pedestal y de potencia; las exportaciones coreanas de transformadores grandes y cables superaron 1 billón de KRW en el 1T26, más de la mitad a EE. UU. [B8].' },
      { driver: 'Reposición de una red envejecida y electrificación', efecto: '+', horizonte: 'Estructural', evidencia: 'Demanda de transformadores de distribución en EE. UU. +41 % desde 2019 y déficit del 10 % (Wood Mackenzie) [B3].' },
      { driver: 'Capacidad nueva de los competidores', efecto: '−', horizonte: 'Cíclico', evidencia: '1.800 M USD de ampliaciones anunciadas en EE. UU. desde 2023; Cheryong habla de «estabilización del suministro» y competencia [B2, B3].' },
      { driver: 'Aranceles de EE. UU. (sección 232)', efecto: '−', horizonte: 'Cíclico', evidencia: '50 % sobre el acero de los transformadores desde ago-2025; desde el 6-abr-2026, 15/25/50 % sobre el valor del producto acabado (15 % solo para muy alta tensión hasta 2027) [B5, B6].' },
      { driver: 'Veto a equipos de países adversarios', efecto: '+', horizonte: 'Estructural', evidencia: 'Emergencia nacional del 26-ago-2026 que limita la compra de equipos eléctricos de origen extranjero adversario (China) [B9].' },
      { driver: 'Inversión en la red coreana', efecto: '+', horizonte: 'Estructural', evidencia: 'Plan de KEPCO hasta 2030 y «tres leyes de la red» en tramitación (may-2026) [B12].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 4, justificacion: 'Producto estándar con norma ANSI/IEEE; competidores estadounidenses (Eaton, ERMCO, Howard), mexicanos (Prolec GE, WEG), coreanos (HD Hyundai, LS, Hyosung, Sanil) y nuevos importadores; la empresa reconoce más competencia [B1, B2].' },
      { fuerza: 'Poder de los clientes', intensidad: 4, justificacion: 'Tres clientes son el 74,6 % de las ventas; las distribuidoras compran por subasta y con varios proveedores homologados [B1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 3, justificacion: 'Chapa magnética de POSCO (pocos fabricantes de grano orientado) y cobre a precio de la LME; precio de la chapa estable en 4.180 KRW/kg en 2024-2026 [B11].' },
      { fuerza: 'Amenaza de entrada', intensidad: 3, justificacion: 'Fabricar distribución es fácil y barato (capex del 1-3 % de las ventas); la barrera es la homologación de cada distribuidora y la certificación UL [B2, B3].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 1, justificacion: 'No hay sustituto del transformador; los de estado sólido están en fase de prueba [B3].' },
    ],
    ciclo: { posicion: 'Contracción', comentario: 'Para Cheryong el ciclo de precios ya gira: cartera −54 % desde el máximo (305.567 M en mar-2024 a 141.580 M en jun-2026) y pedidos/ventas de 0,53 en 2025 [B1, B2]. La demanda estructural sigue (centros de datos, red), pero la capacidad nueva y los aranceles hunden el precio que cobra un exportador de distribución. En el ciclo anterior, tras el auge de 2005-2008, precios y márgenes cayeron casi una década [B3]. En 2020-2021 Cheryong ganó un margen operativo del 8,6 % y del 0,2 %; en 2022, con la escasez, subió al 18,6 % [B1].' },
    regulacion: 'Lo que más pesa son los aranceles de EE. UU.: sección 232 sobre derivados del acero (50 % del contenido de acero desde el 18-ago-2025; desde el 6-abr-2026, 15, 25 o 50 % sobre el valor en aduana del producto acabado según el peso del metal, con un 15 % solo para los de muy alta tensión hasta el 31-dic-2027) [B5, B6]. Los transformadores de distribución no tienen el tipo reducido. El 26-ago-2026 EE. UU. declaró una emergencia que limita los equipos eléctricos de países adversarios, que favorece a Corea frente a China [B9]. Normas de eficiencia del Departamento de Energía para distribución (2024; el núcleo amorfo de Cheryong las cumple) [B3]. En Corea, el cártel de GIS (multa, veto de KEPCO suspendido y demanda de daños) [B2].',
    tendencias: 'Tres tendencias. (1) Los centros de datos de IA son viento a favor de la demanda de transformadores, sobre todo de potencia y de pedestal grandes; el negocio de Cheryong (poste y pedestal pequeño) lo nota menos que HD Hyundai o Hyosung, que cerraron 2025 con récord mientras Cheryong caía [B7, B8]. (2) Relocalización: los grandes abren fábricas en EE. UU. (HD Hyundai en Alabama, Hyosung en Memphis, LS) y así esquivan el arancel; Cheryong exporta desde Corea y paga el arancel entero [B3, B8]. (3) Subir de gama (154 kV) es su respuesta, con una nave comprada en 2026 y sin producción todavía [B2].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 0.5,
    posicion: 'Proveedor de nicho de transformadores de distribución importados en EE. UU.; ≈ 0,5 % del mercado mundial de distribución (estimación propia: ≈ 169 M USD de ventas de 2025 sobre ≈ 34.800 M USD) [B1, B3]. En Corea, fabricante mediano de transformadores secos de resina para KEPCO y ferrocarril.',
    competidores: [],
    foso: {
      veredicto: 'Sin foso',
      tendencia: 'Se estrecha',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'No aplica: producto industrial vendido por pedido [B1].' },
        { fuente: 'Costes de cambio', puntuacion: 2, evidencia: 'Homologación de cada distribuidora y certificación UL; cuesta entrar, pero los clientes ya tienen varios proveedores y compran por subasta [B1, B2].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 1, evidencia: '66 patentes (60 en Corea); productos certificados (núcleo amorfo, resina sin tóxicos), pero sin prima de marca demostrada [B2].' },
        { fuente: 'Ventaja en costes', puntuacion: 2, evidencia: 'Fábrica coreana con 190 empleados y gastos generales bajos; la ventaja se perdió con el arancel, que no pagan los que fabrican en EE. UU. o México [B1, B5].' },
        { fuente: 'Escala eficiente', puntuacion: 1, evidencia: 'Ventas de ≈ 169 M USD en un mercado de decenas de miles de millones y fácil de ampliar [B3].' },
      ],
    },
    amenazas: 'Lo que erosiona el margen ya está pasando: (1) la capacidad nueva en EE. UU. y México (1.800 M USD anunciados desde 2023) normaliza el precio, y la propia empresa habla de competencia [B2, B3]; (2) el arancel de la sección 232 lo paga Cheryong y no los competidores con fábrica local [B5]; (3) tres clientes son el 74,6 % de las ventas: perder uno restaría hasta un 38 % [B1]. Probabilidad alta de que el margen no vuelva al 30-38 % de 2023-2025; media de que baje al 8-12 % del ciclo anterior.',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Lo material es producto y gobierno. Producto: transformadores de alta eficiencia (núcleo amorfo, aceite vegetal) y GIS sin SF6 alineados con las normas de eficiencia de EE. UU. y Corea [B2]. Gobierno: el cártel de las subastas de GIS de KEPCO de 2018-2022, con multa de 1.165 M KRW firme y veto de seis meses de KEPCO (suspendido mientras se pleitea) [B2]. Sin informe de sostenibilidad ni emisiones publicadas.',
    controversias: 'Cártel de las subastas de GIS de KEPCO (2018-2022): la Comisión de Competencia multó en diciembre de 2024 a nueve fabricantes y la asociación con 39.100 M KRW; Cheryong (1.165 M) perdió en el Tribunal Supremo en 2026 [B2, C4]. KEPCO la vetó seis meses (jul-2025, suspendido por un juez) y reclama 2.000 M de daños a diez empresas [B2].',
    confianza: 'Media',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'sector', campo: 'Tamaño del mercado de transformadores de distribución de EE. UU. con fuente primaria y CR5', tipo: 'Complemento', intentos: '1) Informes de Cheryong (no publica cuota ni mercado); 2) ficha sectorial (GlobalData mundial, Wood Mackenzie en porcentajes); 3) NREL y Departamento de Energía (no abiertos desde este entorno)', decision: 'Omitido' },
    { seccion: 'esg', campo: 'Calificaciones ESG', tipo: 'Complemento', intentos: '1) Informe anual (no menciona); 2) KCGS (Instituto Coreano de Gobierno Corporativo: sin acceso); 3) prensa (sin calificaciones publicadas)', decision: 'Omitido' },
  ],
};
// Competidores con cifras de Yahoo (últimos doce meses), convertidas a KRW al cambio del 20-oct-2026.
const fxDe = (c) => (c === 'USD' ? USDKRW : c === 'CAD' ? CADKRW : c === 'TWD' ? TWDKRW : 1);
const raw = Object.fromEntries(compsRaw.map((c) => [c.s, c]));
const r1 = (x) => (x == null || !isFinite(x) ? null : Math.round(x * 10) / 10);
const r2 = (x) => (x == null || !isFinite(x) ? null : Math.round(x * 100) / 100);
const comp = (s, nombre, pais, comentario) => { const c = raw[s]; return { nombre, pais, ticker: s, ingresos: Math.round((c.rev * fxDe(c.fcur)) / 1e6), cuota_pct: null, margen_ebit_pct: r1(c.opM * 100), comentario }; };
B.competencia.competidores = [
  comp('267260.KS', 'HD Hyundai Electric', 'KR', 'Potencia y distribución; fábrica en Alabama; margen de pico del 27 % [B10].'),
  comp('298040.KS', 'Hyosung Heavy Industries', 'KR', 'Potencia (765 kV) y fábrica en Memphis [B10].'),
  comp('010120.KS', 'LS Electric', 'KR', 'Aparamenta y transformadores; centros de datos en EE. UU. [B10].'),
  comp('103590.KS', 'Iljin Electric', 'KR', 'Transformadores de potencia y cables [B10].'),
  comp('062040.KS', 'Sanil Electric', 'KR', 'Transformadores especiales para renovables y almacenamiento en EE. UU.; el rival coreano más parecido en tamaño, que crece mientras Cheryong cae [B10].'),
  comp('HPS-A.TO', 'Hammond Power Solutions', 'CA', 'Transformadores secos y de distribución en Norteamérica, con fábricas locales [B10].'),
];
guarda('B', B);

// ================================================================ C. Equipo y gobierno
const fC = [
  { id: 1, titulo: '[기재정정] 사업보고서 2025: consejo, comités, directivos, remuneración (presidente 1.446 M KRW), empleados (190, 81,4 M KRW de media), auditor, vinculadas', editor: 'Cheryong Electric / DART (FSS)', tipo: 'Primaria', fecha: '2026-06-02', url: DART('20260602000220') },
  { id: 2, titulo: '반기보고서 2026: accionistas a 30-jun-2026 (familia Park 33,13 %), consejo y sus sesiones, litigios, sanciones (Comisión de Competencia y KEPCO)', editor: 'Cheryong Electric / DART (FSS)', tipo: 'Primaria', fecha: '2026-08-13', url: DART('20260813001320') },
  { id: 3, titulo: '기업가치제고계획 (plan de valor 2026: rentabilidad, dividendo sostenible, nuevos productos; reparto del 30,1 % de 2025)', editor: 'Cheryong Electric / KRX', tipo: 'Primaria', fecha: '2026-03-17', url: DART('20260317900500') },
  fuenteN(4, 'edaily'),
  { id: 5, titulo: '[기재정정] 소송등의제기ㆍ신청 (경영권분쟁소송): petición de un accionista (Park Hyung-ryul) para ver el libro de accionistas y las actas, retirada en abril de 2024', editor: 'Cheryong Electric / KRX', tipo: 'Primaria', fecha: '2024-04-12', url: DART('20240412900203') },
  { id: 6, titulo: 'Ficha de empresa: accionistas principales a 19-oct-2026 (familia Park 33,13 %, Samsung Asset Management 7,62 %, Norges Bank 5,66 %, KB Asset Management 5,26 %), capital flotante del 66,87 %', editor: 'FnGuide (Naver WiseReport)', tipo: 'Datos de mercado', fecha: '2026-10-19', url: WR('c1010001') },
  { id: 7, titulo: 'Lista de avisos de DART de 제룡전기 (oct-2025 a oct-2026): participaciones significativas de Samsung AM (feb, mar y jun de 2026) y KB AM (jul-2026); ninguna declaración de directivos o accionistas principales', editor: 'DART (FSS)', tipo: 'Primaria', fecha: '2026-10-20', url: 'https://dart.fss.or.kr/dsab007/main.do' },
  { id: 8, titulo: '정기주주총회결과 (junta del 24-mar-2026: reelección de Park Jong-tae, Kim Hyun-soon y Kim Hee-jun)', editor: 'Cheryong Electric / KRX', tipo: 'Primaria', fecha: '2026-03-24', url: DART('20260324900844') },
];
const C = {
  _estado: 'completa',
  directivos: {
    equipo: [
      { nombre: 'Park Jong-tae (박종태)', cargo: 'Presidente y consejero delegado; accionista de control', desde: '2016', participacion_pct: 17.93, trayectoria: 'En la empresa desde 1989; presidente desde 2013 y consejero delegado desde 2016; es también consejero delegado de Cheryong Industrial y de Woojin Electric (proveedor vinculado). Con él las ventas pasaron de ≈ 45.000 M KRW (2019) a 262.736 M (2024) y la caja de 29.380 M (2020) a 185.299 M (2025) [C1, C2].' },
      { nombre: 'Park In-jun (박인준)', cargo: 'Consejero y presidente ejecutivo de administración (사장)', desde: '2018', participacion_pct: 3.0, trayectoria: 'Hijo del presidente; ingeniero mecánico por Purdue y MBA por la Universidad Nacional de Seúl; en la empresa desde 2018 [C1].' },
      { nombre: 'Lee Jin-ho (이진호)', cargo: 'Presidente de negocio (사장, no consejero)', desde: '2021', participacion_pct: 0.01, trayectoria: 'Antes director general (전무) en Hyundai Electric; dirige el negocio desde dic-2021, cuando empezó la expansión en EE. UU. [C1].' },
      { nombre: 'Kim Hyun-soon (김현순)', cargo: 'Consejera ejecutiva (asesoría de gestión)', desde: '1989', participacion_pct: 3.8, trayectoria: 'En el grupo desde 1989 (antes en Cheryong Industrial); 16 mandatos como consejera [C1].' },
      { nombre: 'Moon Byung-chul (문병철)', cargo: 'Vicepresidente de producción', desde: '2017', participacion_pct: 0, trayectoria: 'Ingeniero eléctrico; antes en Hyosung [C1].' },
      { nombre: 'Park Seok-jun (박석준)', cargo: 'Director general de administración', desde: '2014', participacion_pct: 0, trayectoria: 'Antes en planificación estratégica del grupo Tongyang [C1].' },
    ],
    historial_guidance: [],
    comentario: 'Equipo estable y de la familia: el presidente lleva 37 años en la empresa y su hijo es el número dos; el negocio lo dirige un profesional que vino de Hyundai Electric en 2021 [C1]. No publica guía ni objetivos a medio plazo, así que no se puede medir su credibilidad con cifras; el plan de valor de 2026 no tiene metas numéricas [C3]. La sucesión parece familiar (Park In-jun). Ejecución en el ciclo: acertó al llenar la fábrica con EE. UU. en 2022-2024 y al no endeudarse; falló en defender margen y pedidos en 2025-2026, cuando rivales coreanos más grandes siguieron creciendo [C1, C2].',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Park Jong-tae', cargo: 'Presidente y consejero delegado', tipo: 'Ejecutivo', desde: '1989', comisiones: 'Ninguna (no hay comisiones)' },
      { nombre: 'Park In-jun', cargo: 'Consejero', tipo: 'Ejecutivo', desde: '2021', comisiones: 'Ninguna' },
      { nombre: 'Kim Hyun-soon', cargo: 'Consejera', tipo: 'Ejecutivo', desde: '1990', comisiones: 'Ninguna' },
      { nombre: 'Kim Hee-jun', cargo: 'Consejero independiente', tipo: 'Independiente', desde: '2024', comisiones: 'Ninguna' },
    ],
    presidente_ceo_separados: false, presidente_ejecutivo: true, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: true, variable_ligado_rentabilidad: false, auditoria_independiente: false, insiders_sin_operaciones: true,
    accionista_control: true, presidente_vinculado_control: true, cambios_cupula_24m: 0,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 1446, fijo: 1083, variable_corto: 363, variable_largo: 0, ratio_salario_medio: 18 },
    remuneracion: 'En 2025 el presidente cobró 1.446 M KRW (1.083 M de sueldo y 363 M de pagas extra: dos medias pagas fijas y una «extra especial» que aprueba el consejo según «resultados y contribución») y su hijo 931 M (693 M y 238 M) [C1]. Es 17,8 veces el sueldo medio de un empleado (81,4 M KRW). No hay variable a largo plazo, ni acciones, ni métricas de rentabilidad, ni cláusula de devolución. La junta aprueba solo un límite global (3.500 M para cuatro consejeros; se pagaron 2.685 M a cinco, contando al auditor interno) [C1]. No se publican los votos de la junta.',
    accionistas: [
      { nombre: 'Park Jong-tae', pct: 17.93, tipo: 'Accionista de control (presidente)', variacion: 'Vendió 498.099 acciones en mar-2024 y 200.000 en jul-2024; sin cambios desde entonces [C2].' },
      { nombre: 'Fundación social Cheryong (제룡사회복지법인)', pct: 4.98, tipo: 'Vinculada al control', variacion: 'Sin cambios [C2].' },
      { nombre: 'Kim Hyun-soon', pct: 3.8, tipo: 'Consejera (grupo de control)', variacion: 'Sin cambios [C2].' },
      { nombre: 'Park In-jun', pct: 3.0, tipo: 'Hijo del presidente (grupo de control)', variacion: 'Sin cambios [C2].' },
      { nombre: 'Park In-won', pct: 2.34, tipo: 'Familia (grupo de control)', variacion: 'Sin cambios [C2].' },
      { nombre: 'Park Jin-su', pct: 1.08, tipo: 'Familia (grupo de control)', variacion: 'Sin cambios [C2].' },
      { nombre: 'Samsung Asset Management', pct: 7.62, tipo: 'Institucional', variacion: 'Declaraciones en feb, mar y jun de 2026 [C6, C7].' },
      { nombre: 'Norges Bank', pct: 5.66, tipo: 'Institucional', variacion: 'Por encima del 5 % desde sep-2024 [C6, C7].' },
      { nombre: 'KB Asset Management', pct: 5.26, tipo: 'Institucional', variacion: 'Superó el 5 % en jul-2026 [C6, C7].' },
    ],
    insiders: [],
    control_y_defensas: 'La familia Park controla el 33,13 % (presidente 17,93 %, fundación 4,98 %, consejera Kim 3,80 %, hijos y familiares 6,42 %) [C2]. Con el resto muy repartido (87.662 minoritarios con el 53,9 %), decide la junta. El consejo son cuatro personas: tres ejecutivas (dos de la familia) y un independiente; no hay comisión de auditoría (hay un auditor interno, 감사) ni de nombramientos [C2]. Una sola clase de acciones, sin blindajes. Operación vinculada recurrente: compras a Woojin Electric, que dirige el presidente (14.061 M en 2025) [C1]. En 2023 un accionista particular pidió ante el juez ver el libro de accionistas y las actas; retiró la petición en abril de 2024 [C5].',
    alertas: [
      'Cártel de las subastas de GIS de KEPCO: multa de 1.165 M KRW, firme tras el Tribunal Supremo (2026); denuncia penal de la empresa por la Comisión; veto de KEPCO suspendido; demanda de 2.000 M a diez fabricantes [C2, C4].',
      'Compras a Woojin Electric, sociedad del presidente (14.061 M en 2025) [C1].',
      'Consejo con un solo independiente y sin comisiones [C2].',
    ],
    confianza: 'Alta',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'Votos de la junta (remuneración y reelecciones)', tipo: 'Complemento', intentos: '1) Resultado de la junta de mar-2026 en DART (solo «aprobado»); 2) informe anual (no los publica); 3) prensa (sin datos)', decision: 'Omitido' },
    { seccion: 'directivos', campo: 'Historial de guía', tipo: 'Complemento', intentos: '1) Avisos de DART (la empresa no publica previsiones); 2) informe anual y plan de valor (sin cifras); 3) prensa (sin guía)', decision: 'Omitido' },
  ],
};
guarda('C', C);

// ================================================================ D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de 033100.KQ, ^KQ11 y 267260.KS hasta el 20-oct-2026 (precio, rango, volumen, rentabilidades, beta, volatilidad, caída máxima y cierres de cada ejercicio)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/033100.KQ' },
  { id: 2, titulo: 'Ficha de empresa y consenso (ninguna recomendación ni estimación en los últimos tres meses; capitalización de 688.300 M a 19-oct; 16.062.409 acciones; flotante del 66,87 %; BPA de los últimos doce meses de 3.421 KRW)', editor: 'FnGuide (Naver WiseReport)', tipo: 'Analistas', fecha: '2026-10-19', url: WR('c1010001') },
  { id: 3, titulo: 'Fichas de comparables (precio, capitalización, valor empresa, EV/ventas, EV/EBITDA, márgenes, BPA y ventas estimados de 2026 y 2027) y tipos de cambio KRW=X, CADKRW=X y TWDKRW=X', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/267260.KS' },
  { id: 4, titulo: 'Long-Term Government Bond Yields: 10-year for Korea (IRLTLT01KRM156N), septiembre de 2026: 4,454 %', editor: 'OECD vía FRED', tipo: 'Datos de mercado', fecha: '2026-10-01', url: 'https://fred.stlouisfed.org/series/IRLTLT01KRM156N' },
  { id: 5, titulo: 'Implied ERP by month (ERPbymonth.xlsx): 4,20 % en octubre de 2026 (T12m with sustainable payout)', editor: 'Damodaran Online', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 6, titulo: 'GE Vernova to acquire remaining 50% stake of Prolec GE (5.275 M USD)', editor: 'T&D World', tipo: 'Prensa', fecha: '2025-10-21', url: 'https://www.tdworld.com/utility-business/news/55325306/ge-vernova-to-acquire-remaining-50-stake-of-prolec-ge' },
  { id: 7, titulo: 'Eaton acquires Fibrebond Corporation for 1.400 M USD (ventas de 378 M, EBITDA de 110 M)', editor: 'DatacenterDynamics', tipo: 'Prensa', fecha: '2025-03-18', url: 'https://datacenterdynamics.com/en/news/eaton-acquires-fibrebond-corporation-for-14bn' },
  { id: 8, titulo: 'Hubbell to acquire DMC Power for 825 M USD (ventas de 130 M; EBITDA de 2026e de 60 M)', editor: 'Nasdaq / Zacks', tipo: 'Prensa', fecha: '2025-08', url: 'https://www.nasdaq.com/articles/hubbell-acquire-dmc-power-825-mln-all-cash-deal' },
  { id: 9, titulo: 'ABB completes divestment of Power Grids to Hitachi (valor empresa de 11.000 M USD por el 100 %)', editor: 'ABB', tipo: 'Primaria', fecha: '2020-07-01', url: 'https://new.abb.com/news/detail/64657/abb-completes-divestment-of-power-grids-to-hitachi' },
  fuenteN(10, 'sedaily'),
  fuenteN(11, 'sks'),
  { id: 12, titulo: 'movimiento.mjs 033100.KQ: variación a 1, 3, 6 y 12 meses, máximos y mínimos, media de 200 sesiones, volatilidad de 60 sesiones (P5)', editor: 'Cálculo con históricos de Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/033100.KQ/history' },
  fuenteN(13, 'topstar'),
  fuenteN(14, 'einfomax'),
  fuenteN(15, 'joongang'),
];
const blend = (e0, e1) => 0.2 * e0 + 0.8 * e1; // próximos 12 meses desde el 20-oct: ≈ 2,4 meses de 2026 y 9,6 de 2027
// Stock Analysis (ficha sectorial del 16-oct-2026) para el ROIC de los que lo tienen; el resto, null.
const ROIC = { '267260.KS': 66, '298040.KS': 23, '010120.KS': 13, 'HPS-A.TO': 17, '1519.TW': 52, '1503.TW': 10, '1514.TW': 13 };
const nombres = { '267260.KS': ['HD Hyundai Electric', 'KR'], '298040.KS': ['Hyosung Heavy Industries', 'KR'], '010120.KS': ['LS Electric', 'KR'], '103590.KS': ['Iljin Electric', 'KR'], '062040.KS': ['Sanil Electric', 'KR'], 'HPS-A.TO': ['Hammond Power Solutions', 'CA'], '1519.TW': ['Fortune Electric', 'TW'], '1503.TW': ['Shihlin Electric', 'TW'], '1514.TW': ['Allis Electric', 'TW'], POWL: ['Powell Industries', 'US'] };
const comparables = compsRaw.filter((c) => nombres[c.s]).map((c) => {
  const f = fxDe(c.fcur);
  const e0 = c.et.find((t) => t.p === '0y'); const e1 = c.et.find((t) => t.p === '+1y');
  // Powell cierra en septiembre: los próximos 12 meses son su ejercicio +1y (oct-2026 a sep-2027).
  const epsNtm = c.s === 'POWL' ? e1?.eps : (e0?.eps != null && e1?.eps != null ? blend(e0.eps, e1.eps) : null);
  const revNtm = c.s === 'POWL' ? e1?.rev : (e0?.rev && e1?.rev ? blend(e0.rev, e1.rev) : null);
  return {
    nombre: nombres[c.s][0], ticker: c.s, pais: nombres[c.s][1],
    capitalizacion: Math.round((c.mcap * fxDe(c.cur)) / 1e6),
    ev_ventas: r2(c.evRev), ev_ebitda_ltm: r1(c.evEbitda), ev_ebitda_ntm: null,
    per_ntm: epsNtm ? r1(c.price / epsNtm) : null,
    crecimiento_pct: revNtm && c.rev ? r1((revNtm / c.rev - 1) * 100) : null,
    margen_ebitda_pct: r1(c.ebitdaM * 100), roic_pct: ROIC[c.s] ?? null,
    dn_ebitda: c.ebitda ? r1((c.debt - c.cash) / c.ebitda) : null,
    fcf_yield_pct: c.fcf != null && c.mcap ? r1(((c.fcf * f) / (c.mcap * fxDe(c.cur))) * 100) : null,
  };
});
const pers = comparables.map((c) => c.per_ntm).filter((x) => x != null).sort((a, b) => a - b);
const medianaPER = pers.length % 2 ? pers[(pers.length - 1) / 2] : (pers[pers.length / 2 - 1] + pers[pers.length / 2]) / 2;
const ide = bolsa.identificacion;
const D = {
  _estado: 'completa',
  identificacion: {
    nombre: 'Cheryong Electric Co., Ltd. (제룡전기주식회사)', nombre_corto: 'Cheryong Electric', ticker: '033100', isin: 'KR7033100009', mercado: 'KOSDAQ (Korea Exchange)', indice_referencia: 'KOSDAQ',
    pais: 'Corea del Sur', pais_iso: 'KR', sector: 'Industria', industria: 'Equipos eléctricos pesados', sede: 'Seúl (fábrica en Daejeon)', fundacion: '1986', empleados: 190, web: 'https://www.cheryongelec.com',
    precio: PRECIO, fecha_precio: '2026-10-20', acciones: ACCIONES, capitalizacion_publicada: 688300, free_float_pct: 66.87,
    max_52s: ide.max_52s, min_52s: ide.min_52s, volumen_medio_diario: `≈ ${Math.round(bolsa.volumen_3m.importe_dia_millones).toLocaleString('es-ES')} M KRW/día (3 meses)`, proximos_resultados: '2026-11-13',
  },
  consenso: {
    guidance: 'Cheryong no publica previsiones de ventas ni de beneficio, ni objetivos a medio plazo; el plan de valor de marzo de 2026 habla de rentabilidad, dividendo sostenible y nuevos productos sin cifras [D2]. El informe semestral prevé para 2026 demanda pública en Corea, más competencia y aranceles en EE. UU. y la entrada en 154 kV [D2].',
    estimaciones: [],
    recomendaciones: { n_analistas: 0, comprar: 0, mantener: 0, vender: 0, po_medio: null, po_min: null, po_max: null },
    revisiones: 'Ninguna casa ha publicado estimaciones ni recomendación en los últimos tres meses (FnGuide, 19-oct-2026) y Yahoo no tiene consenso [D2, D3]. Sin cobertura, el precio lo mueven el flujo de los particulares, los fondos temáticos y las ventas en corto: Cheryong fue en enero de 2026 la primera del KOSDAQ 150 por posición corta sobre el capital flotante (NH) y el 20-oct las ventas en corto fueron el 26,4 % de lo negociado [D13, D14].',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Baja',
  },
  bolsa: {
    ...bolsa.bolsa,
    posicion_corta_pct: null,
    comentario: 'La acción multiplicó por siete su precio entre el cierre de 2021 (5.220 KRW) y el de 2024 (45.950) con la escasez de transformadores; cayó un 71,5 % desde el máximo de julio de 2024 hasta abril de 2025 cuando se vio que el beneficio había tocado techo [D1]. En 2026 subió hasta 93.800 KRW (6-may) con la euforia de las eléctricas coreanas por la IA y se desplomó un 45,9 % en un mes; cotiza a 40.900, un 55 % bajo el máximo de 52 semanas [D1, D12]. En el año sube un 16,5 % frente a un −15,5 % del KOSDAQ y un −37,0 % de HD Hyundai Electric [D1]. Beta mensual de 1,11 frente al KOSDAQ y volatilidad anual del 79,9 % [D1].',
  },
  multiplos_historicos: {
    serie: bolsa.cierres_ejercicio.filter((c) => +c.anio >= 2020).map((c) => ({ anio: c.anio, precio_cierre: c.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: c.anio === '2021' })),
    comentario: 'Con el precio de cierre de cada año y el beneficio del mismo año, el PER fue de 24x (2020), 71x (2021, beneficio hundido: excluido), 14x (2022), 5,7x (2023), 9,2x (2024) y 9,6x (2025) [D1]. El mercado nunca pagó el beneficio de pico: lo descontaba como transitorio. Hoy, a 40.900 KRW, el PER de los últimos doce meses es de 12,0x (BPA de 3.421 KRW con la plusvalía financiera del 1S26) y sube a ≈ 20x sin ella; frente al beneficio que esperamos para 2027 es mucho más alto.',
  },
  comparables: {
    criterio: 'Fabricantes cotizados de transformadores y aparamenta que venden en EE. UU.: cinco coreanos (HD Hyundai Electric, Hyosung Heavy, LS Electric, Iljin y Sanil, el más parecido en tamaño y en producto), Hammond Power (distribución en Norteamérica), tres taiwaneses (Fortune, Shihlin, Allis) y Powell (aparamenta en EE. UU.). No hay ningún cotizado puro de transformadores de distribución exportados a EE. UU. Bosung Powertec queda fuera por falta de datos. Todas las cifras de Yahoo a 20-oct-2026; PER de los próximos 12 meses = precio ÷ (0,2 × BPA 2026e + 0,8 × BPA 2027e) [D3].',
    empresas: comparables,
    comentario: null,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2025-10', objetivo: 'Prolec GE (50 % restante; transformadores de distribución y potencia en México y EE. UU.)', comprador: 'GE Vernova', ev: Math.round(10550 * USDKRW), ev_ventas: 3.5, ev_ebitda: 14.1, prima_pct: null, excluir: false, comentario: '5.275 M USD por el 50 % = 10.550 M USD por el 100 %; ventas de ≈ 3.000 M USD y margen EBITDA de ≈ 25 % (estimación con datos de la operación) [D6].' },
      { fecha: '2025-03', objetivo: 'Fibrebond (salas eléctricas modulares)', comprador: 'Eaton', ev: Math.round(1400 * USDKRW), ev_ventas: 3.7, ev_ebitda: 12.7, prima_pct: null, excluir: false, comentario: 'Ventas de 378 M USD y EBITDA de 110 M [D7].' },
      { fecha: '2025-08', objetivo: 'DMC Power (conectores de alta tensión)', comprador: 'Hubbell', ev: Math.round(825 * USDKRW), ev_ventas: 6.3, ev_ebitda: 13.8, prima_pct: null, excluir: false, comentario: 'Ventas de 130 M USD; múltiplo sobre el EBITDA de 2026e (60 M) [D8].' },
      { fecha: '2020-07', objetivo: 'ABB Power Grids (100 %)', comprador: 'Hitachi', ev: Math.round(11000 * USDKRW), ev_ventas: 1.1, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Valor empresa de 11.000 M USD, en el fondo del ciclo anterior [D9].' },
      { fecha: '2026-06', objetivo: 'Dongmi Electric (동미전기공업; transformadores, Corea)', comprador: 'Cactus PE (en negociación)', ev: 500000, ev_ventas: null, ev_ebitda: 10.0, prima_pct: null, excluir: false, comentario: '≈ 500.000 M KRW, ≈ 10 veces el EBITDA de 2025 y ≈ 20 veces el de 2026 con el beneficio a la baja; el cierre se retrasa porque los inversores no pagan ese múltiplo [D10].' },
    ],
    comentario: 'Las compras de equipos de red de 2025 se pagaron a 12,7-14,1 veces el EBITDA (Prolec GE, Fibrebond, DMC Power) sobre márgenes de pico, y la de ABB Power Grids, en el fondo del ciclo anterior, a 1,1 veces las ventas [D6-D9]. La referencia más cercana a Cheryong es Dongmi Electric: ≈ 10 veces el EBITDA de 2025, que pasa a ≈ 20 veces con el de 2026, y el comprador no encuentra financiación [D10]. Cheryong no es objetivo probable de una opa: la familia Park controla el 33 % [D2].',
    confianza: 'Media',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'consenso', campo: 'Estimaciones, recomendaciones y objetivos de analistas', tipo: 'Núcleo', intentos: '1) FnGuide/WiseReport (ninguna en tres meses); 2) Yahoo Finance (sin analistas); 3) prensa coreana (sin informes recientes de casas de bolsa)', decision: 'Omitido' },
    { seccion: 'bolsa', campo: 'Posición corta sobre el capital', tipo: 'Complemento', intentos: '1) KRX (data.krx.co.kr sin acceso desde este entorno); 2) FnGuide (no la publica); 3) prensa (solo el peso de las ventas en corto en la negociación diaria, 26,4 % el 20-oct)', decision: 'Omitido' },
  ],
};
D.comparables.comentario = `Mediana del PER de los próximos 12 meses: ${String(medianaPER).replace('.', ',')}x. Los comparables cotizan con margen EBITDA de pico (10-37 %) y crecimiento previsto del 10-60 %; Cheryong es el único del grupo con ventas a la baja (−41 % en el 2T26) y sin consenso. Por eso sus múltiplos no son el ancla: HD Hyundai, Hyosung y Sanil crecen con potencia y centros de datos, y Cheryong pierde precio en distribución. El EV/EBITDA de los últimos doce meses de Cheryong (≈ 11,6x con la caja) parece en línea con Hyosung o Iljin, pero sobre un EBITDA que cae a la mitad en 2026e.`;
// mediana PER comparables: solo para consola
guarda('D', D);

// ================================================================ E. Sentimiento
const fE = [
  { id: 1, titulo: 'Foro de Naver (종목토론실) de 033100: 100 mensajes distintos del 3-sep al 20-oct-2026 (hora de Corea)', editor: 'Naver Pay Securities', tipo: 'Foros y redes', fecha: '2026-10-20', url: 'https://m.stock.naver.com/domestic/stock/033100/discussion' },
  { id: 2, titulo: 'Foro de Paxnet (종목토론) de 033100: pocos mensajes y publicidad (sin debate real en tres meses)', editor: 'Paxnet', tipo: 'Foros y redes', fecha: '2026-10-20', url: 'https://www.paxnet.co.kr/tbbs/list?tbbsType=L&id=033100' },
  fuenteN(3, 'sedaily'),
  fuenteN(4, 'topstar'),
];
const E = {
  _estado: 'completa',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Empeora',
    revisadas: [
      { plataforma: 'Foro de Naver (oct-2026)', fecha: '2026-10', n_comentarios: 51, tono: 'Negativo', resumen: 'Miedo a romper los 40.000 KRW, quejas por las ventas en corto y por que «sale mal en resultados otra vez»; unos pocos piden comprar «a cualquier precio por debajo de 50.000» [E1].' },
      { plataforma: 'Foro de Naver (sep-2026)', fecha: '2026-09', n_comentarios: 49, tono: 'Dividido', resumen: 'Euforia de unos («vale 100.000 KRW», «compra con el dinero de la casa») frente a cansancio de otros («caída en escalera», «dos años de dolor») y envidia de Sanil e Iljin, que suben [E1].' },
    ],
    temas: [
      { tema: 'Ventas en corto', postura: 'Bajista', peso: 'Alto', contraste: 'Es real: el 20-oct las ventas en corto fueron el 26,4 % de lo negociado [E4]. Responden a una cartera que cae, no a una manipulación.' },
      { tema: '«Vale 100.000 KRW» (vuelta al máximo de mayo)', postura: 'Alcista', peso: 'Medio', contraste: 'Las cifras no lo sostienen: beneficio operativo del 1S26 de 11.123 M (−69,5 %) y cartera de 141.580 M (−45 % en 18 meses) [E3].' },
      { tema: 'Rezagada frente a Sanil, Iljin y HD Hyundai', postura: 'Bajista', peso: 'Medio', contraste: 'Correcto y explicable: los rivales venden potencia y tienen fábricas en EE. UU.; Cheryong vende distribución desde Corea y paga el arancel [E3].' },
      { tema: 'Inversión de KEPCO en la red (55 billones hasta 2030)', postura: 'Alcista', peso: 'Bajo', contraste: 'Ayuda en Corea, que es el 11 % de las ventas, y la empresa está vetada a medias por el cártel de GIS [E1].' },
    ],
    lectura: 'El foro de Naver es el único con debate real: Paxnet tiene pocos mensajes y publicidad [E1, E2]. El particular coreano está dividido entre quien ve una ganga (la caja y el recuerdo de 93.800 KRW) y quien ve una caída en escalera; casi nadie habla de márgenes, aranceles ni cartera. No hay capitulación ni euforia extremas. Lo que el foro intuye y el informe confirma: los rivales grandes siguen creciendo y Cheryong no. No aporta un riesgo nuevo.',
    confianza: 'Media',
  },
  fuentes: fE,
  huecos: [
    { seccion: 'sentimiento', campo: 'Más foros con debate (Reddit, Stocktwits, Seeking Alpha)', tipo: 'Complemento', intentos: '1) Naver (sí); 2) Paxnet (sin debate real); 3) Daum Finanzas (API sin respuesta) y foros en inglés (empresa sin seguimiento fuera de Corea)', decision: 'Omitido' },
  ],
};
guarda('E', E);
console.log('A-E escritas; mediana PER comparables', medianaPER);
