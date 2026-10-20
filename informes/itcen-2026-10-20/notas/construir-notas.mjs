// Escribe las notas A-E de ITCEN GLOBAL Co., Ltd. (124500.KQ, KOSDAQ; corte 2026-10-20, cierre del 20-oct en Seúl).
// Fuentes primarias: DART (dart.fss.or.kr, visor de secciones con notas/dart.mjs): informes anuales (사업보고서) de 2025
// (rcp 20260323001492, con 2024 y 2023), 2023 (20240329003280, con 2022 y 2021) y 2021 (20220330001842); informe semestral
// de 2026 (20260813001059); trimestrales 1T26, 3T25, 3T24, 1S24 y 1T24; ajuste del precio de conversión del CB nº 16
// (20260810900127) y compra de Galaxia FN (20260804000030). Consenso: FnGuide (Naver WiseReport). Bolsa y comparables:
// Yahoo Finance. Prensa coreana y foro de Naver. Cada nota cita solo con [n] de su propia lista.
// Ejecutar: node informes/itcen-2026-10-20/notas/construir-notas.mjs
// Ejercicio natural (31-dic). Cifras en millones de KRW salvo que se diga otra cosa.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const DART = (rcp) => `https://dart.fss.or.kr/dsaf001/main.do?rcpNo=${rcp}`;
const WR = (p) => `https://navercomp.wisereport.co.kr/v2/company/${p}.aspx?cmp_cd=124500`;
const bolsa = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const compsRaw = JSON.parse(fs.readFileSync(path.join(dir, 'comparables-yahoo-raw.json'), 'utf8'));
const fx = Object.fromEntries(compsRaw.filter((c) => /=X$/.test(c.s)).map((c) => [c.s, c.price]));
const USDKRW = fx['KRW=X']; // 1.325,86 (Yahoo, 20-oct-2026)
const JPYKRW = fx['JPYKRW=X']; // 8,374
const HKDKRW = fx['HKDKRW=X']; // 168,59
const PRECIO = 21450; // cierre del 20-oct-2026 en el KOSDAQ (Yahoo, regularMarketTime 15:30 KST)

// Prensa (Naver News y webs de los diarios), descargada el 20-oct-2026 en docs/news/.
const N = {
  zdnet: { titulo: '강진모 아이티센글로벌 회장, 자사주 1억 4천만원 규모 매입…"성장 확신" (el presidente compra 6.190 acciones; 1S26: ventas de 5,58 billones, +92 %; proyecto KGLD; Galaxia FN)', editor: 'ZDNet Korea', fecha: '2026-10-20', url: 'https://zdnet.co.kr/view/?no=20261020133134' },
  bloter: { titulo: '아이티센글로벌 강진모, 자사주 추가 매입으로 지분율 12.34% (compras del 16 y 19-oct a una media de 22.619 KRW)', editor: 'Bloter', fecha: '2026-10-20', url: 'https://www.bloter.net/news/articleView.html?idxno=676080' },
  dt: { titulo: '강진모 아이티센글로벌 회장, 자사주 1.4억 매입', editor: 'Digital Times', fecha: '2026-10-20', url: 'https://www.dt.co.kr/article/12090195' },
  ntkcb: { titulo: '아이티센글로벌, 500억 CB 발행 검토 (la matriz: caja de ≈ 4.000 M y ≈ 58.000 M de deuda a un año; el CB es refinanciación)', editor: 'NewsTop Korea (The Vista)', fecha: '2026-04-27', url: 'https://www.newstopkorea.com/news/articleView.html?idxno=44636' },
  hueco: { titulo: '외형만 부풀린 \'금\' 의존 구조…아이티센글로벌 \'허수 성장\' 논란 (crecimiento «hueco»: el 92,65 % de las ventas del 1T26 es oro; la venta de oro se contabiliza por el precio total)', editor: 'Sidae TV (시대)', fecha: '2026-06-23', url: 'https://www.sidae.com/article/2026062214032313773' },
  refix: { titulo: '아이티센글로벌 CB 리픽싱 불가피…주가 급락에 오버행 우려 확산 (ajuste del precio del CB y temor a nuevas acciones)', editor: 'Sidae TV (시대)', fecha: '2026-06-23', url: 'https://www.sidae.com/article/2026062315271521765' },
  sueldo: { titulo: '\'최대 실적 무배당\' 아이티센 강진모 회장 연봉은 직원 평균 17배 (beneficio récord sin dividendo; el presidente cobra 17 veces el salario medio)', editor: 'Sidae TV (시대)', fecha: '2026-06-29', url: 'https://www.sidae.com/article/2026062915321732306' },
  rumor: { titulo: '아이티센글로벌 "웹3 사업 철수는 루머… 3분기 금 토큰 공개로 증명" (la empresa niega vender KGE y salir de Web3)', editor: 'Chosun Biz', fecha: '2026-06-23', url: 'https://biz.chosun.com/stock/finance/2026/06/23/FVPO7B2N25B43OF6SU553W6LMI/' },
  cme: { titulo: 'CME의 증거금 인상에 금·은 가격 급락…관련주도 된서리 (ITCEN −8,15 % por la subida de márgenes de la CME)', editor: 'Hankyung', fecha: '2025-12-30', url: 'https://www.hankyung.com/article/2025123017836' },
  stable: { titulo: '스테이블코인株 휘청…韓美 오락가락 규제에 직격탄 (valores de stablecoins caen con dos dígitos en marzo)', editor: 'Maeil Business (MK Economy)', fecha: '2026-03-31', url: 'https://www.mk.co.kr/article/12003579' },
  si: { titulo: 'SI주 링네트·아이티센글로벌 훨훨... AI·클라우드 수주 기대에 돈 몰린다 (+13 % el 27-abr por la integración de sistemas e IA)', editor: 'Pinpoint News', fecha: '2026-04-27', url: 'https://www.pinpointnews.co.kr/news/articleView.html?idxno=448934' },
  sto: { titulo: '블록체인 체질 개선 돋보인 아이티센글로벌, 디지털 플랫폼 주도권 잡는다 (+14,6 % el 31-jul con el tema de los valores tokenizados)', editor: 'Pinpoint News', fecha: '2026-07-31', url: 'https://www.pinpointnews.co.kr/news/articleView.html?idxno=473317' },
  inst: { titulo: '[주간 코스닥 기관] HPSP 파마리서치 아이티센글로벌… (compras netas de institucionales del 24 al 28-ago)', editor: 'Pinpoint News', fecha: '2026-08-29', url: 'https://www.pinpointnews.co.kr/news/articleView.html?idxno=481653' },
  sto2: { titulo: '토큰증권(STO) 법제화 재추진 모멘텀… 핀테크·플랫폼주 溫氣 확산', editor: 'Pinpoint News', fecha: '2026-08-28', url: 'https://www.pinpointnews.co.kr/news/articleView.html?idxno=481406' },
  clarity: { titulo: '클래리티법 상원 문턱 못 넘자 스테이블코인 관련주 급락 (16-sep: la ley CLARITY no pasa el Senado)', editor: 'CBC News', fecha: '2026-09-16', url: 'https://www.cbci.co.kr/news/articleView.html?idxno=607253' },
  oro: { titulo: '오늘 금시세(금값) 폭락... 이중 하방 압력 현실화로 추락한 금가격 (20-oct: el oro cae por los tipos de EE. UU. y el won)', editor: 'Wikitree', fecha: '2026-10-20', url: 'https://www.wikitree.co.kr/articles/1167675' },
  krx: { titulo: '"통화질서 변곡점…금값 \'한 돈 300만원\' 간다" (KRX: negociación del mercado del oro de 19,42 billones del 2-ene al 2-oct de 2026, +77,2 %)', editor: 'Herald Economy', fecha: '2026-10-02', url: 'https://biz.heraldcorp.com/article/10892270' },
  frio: { titulo: '차갑게 식어버린 금 투자 열기...연초 대비 거래량·거래대금 80% 급락 (la negociación del oro en la KRX cae un 80 % desde enero)', editor: 'Aju Business Daily', fecha: '2026-08-05', url: 'https://www.ajunews.com/view/20260805150551973' },
  alza: { titulo: '아이티센글로벌 주가, 1월 30일 53,800원 10.93% 상승 마감', editor: 'Job Post', fecha: '2026-01-30', url: 'https://www.job-post.co.kr/news/articleView.html?idxno=204926' },
};
const fuenteN = (id, k, tipo = 'Prensa') => ({ id, ...N[k], tipo });

// ================================================================ A. Cuentas
const fA = [
  { id: 1, titulo: '사업보고서 2025 (informe anual): estados consolidados K-IFRS de 2025, 2024 y 2023 auditados por EY Hanyoung (한영회계법인), notas (segmentos, amortizaciones, existencias, derivados, minoritarios, flujos), ventas por negocio, clientes, filiales, consejo, remuneración, vinculadas y litigios', editor: 'ITCEN GLOBAL / DART (FSS)', tipo: 'Primaria', fecha: '2026-03-23', url: DART('20260323001492') },
  { id: 2, titulo: '사업보고서 2023 (informe anual): estados consolidados de 2023, 2022 y 2021 (auditor de 2023: Samil PwC), segmentos, notas de amortización y flujos', editor: 'ITCEN GLOBAL / DART (FSS)', tipo: 'Primaria', fecha: '2024-03-29', url: DART('20240329003280') },
  { id: 3, titulo: '반기보고서 2026 (informe semestral, revisión limitada): estados consolidados a 30-jun-2026, 2T26 y 1S26, segmentos, deuda y convertibles (CB nº 16 de 40.000 M y CB de ITCEN PNS de 10.000 M), flujos', editor: 'ITCEN GLOBAL / DART (FSS)', tipo: 'Primaria', fecha: '2026-08-13', url: DART('20260813001059') },
  { id: 4, titulo: '사업보고서 2021 (informe anual): notas de amortización y gastos de 2021', editor: 'ITCEN GLOBAL / DART (FSS)', tipo: 'Primaria', fecha: '2022-03-30', url: DART('20220330001842') },
  { id: 5, titulo: '분기보고서 1T26 (1T26 y 1T25, segmentos)', editor: 'ITCEN GLOBAL / DART (FSS)', tipo: 'Primaria', fecha: '2026-05-14', url: DART('20260514001486') },
  { id: 6, titulo: '분기보고서 3T25 (3T25 y 9M25, segmentos)', editor: 'ITCEN GLOBAL / DART (FSS)', tipo: 'Primaria', fecha: '2025-11-13', url: DART('20251113000454') },
  { id: 7, titulo: '분기보고서 3T24 (3T24 y 9M24)', editor: 'ITCEN GLOBAL / DART (FSS)', tipo: 'Primaria', fecha: '2024-11-14', url: DART('20241114003011') },
  { id: 8, titulo: '전환가액의 조정 (CB nº 16: precio de conversión de 54.315 a 38.021 KRW el 8-ago-2026; 1.052.050 acciones)', editor: 'ITCEN GLOBAL / KRX', tipo: 'Primaria', fecha: '2026-08-10', url: DART('20260810900127') },
  { id: 9, titulo: '타법인 주식 및 출자증권 취득결정 (Galaxia FN: 93,27 % por 1.385 M, 30-jul-2026)', editor: 'ITCEN GLOBAL / DART (FSS)', tipo: 'Primaria', fecha: '2026-08-04', url: DART('20260804000030') },
  { id: 10, titulo: 'Estados financieros resumidos, BPA de los últimos doce meses (3.051 KRW) y valor contable por acción (7.087 KRW)', editor: 'FnGuide (Naver WiseReport)', tipo: 'Datos de mercado', fecha: '2026-10-19', url: WR('c1010001') },
  fuenteN(11, 'ntkcb'),
  fuenteN(12, 'hueco'),
  { id: 13, titulo: '반기보고서 1S24 (2T24 y 1S24)', editor: 'ITCEN GLOBAL / DART (FSS)', tipo: 'Primaria', fecha: '2024-08-19', url: DART('20240819000282') },
  { id: 14, titulo: '분기보고서 1T24 (1T24)', editor: 'ITCEN GLOBAL / DART (FSS)', tipo: 'Primaria', fecha: '2024-05-20', url: DART('20240520000086') },
];

// Cuenta por función (K-IFRS). EBITDA = beneficio operativo + amortización del inmovilizado (con derecho de uso), de las
// inversiones inmobiliarias y de los intangibles. 2024-2025 de la nota de gastos del anual de 2025; 2021-2023 aproximados
// (inmovilizado e inmuebles de las notas; intangibles de 2022-2023 estimados en ≈ 2.000 M). resultado_financiero = BAI −
// beneficio operativo (incluye otros ingresos y gastos, derivados del oro, vales regalo y asociadas). minoritarios = beneficio
// atribuido a los minoritarios de las filiales (≈ 76 % del total en 2025). gastos_financieros = intereses (2021-2023:
// intereses pagados). Acciones diluidas = beneficio de la dominante ÷ BPA.
const cuenta = [
  { periodo: '2021', ingresos: 3280884, coste_ventas: 3137643, gastos_generales: 111703, ebitda: 41916, amortizaciones: 10378, ebit: 31538, resultado_financiero: -24270, bai: 7268, impuestos: 9997, minoritarios: 4454, beneficio_neto: -7183, gastos_financieros: 6203, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: -361, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: 19.9 },
  { periodo: '2022', ingresos: 2621054, coste_ventas: 2465765, gastos_generales: 124844, ebitda: 39401, amortizaciones: 8956, ebit: 30445, resultado_financiero: 10663, bai: 41108, impuestos: 9925, minoritarios: 29485, beneficio_neto: 1698, gastos_financieros: 4848, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 85, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: 19.98 },
  { periodo: '2023', ingresos: 2815145, coste_ventas: 2649260, gastos_generales: 135366, ebitda: 41203, amortizaciones: 10684, ebit: 30519, resultado_financiero: -29917, bai: 602, impuestos: 6804, minoritarios: -6853, beneficio_neto: 650, gastos_financieros: 7676, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 32, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: 20.32 },
  { periodo: '2024', ingresos: 4961847, coste_ventas: 4759335, gastos_generales: 143948, ebitda: 69991, amortizaciones: 11426, ebit: 58565, resultado_financiero: -10753, bai: 47812, impuestos: 11749, minoritarios: 31808, beneficio_neto: 4255, gastos_financieros: 9482, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 184, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: 23.13 },
  { periodo: '2025', ingresos: 8870845, coste_ventas: 8423636, gastos_generales: 167283, ebitda: 294397, amortizaciones: 14471, ebit: 279926, resultado_financiero: -17058, bai: 262868, impuestos: 64584, minoritarios: 151634, beneficio_neto: 46650, gastos_financieros: 11572, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 2010, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: 23.21 },
];
// Deuda financiera = préstamos a corto + deuda a largo + bonos y convertibles (valor en libros), sin arrendamientos. Caja =
// efectivo + depósitos a corto. 2025: el fondo de comercio (40.605 M, casi todo de KGE) sale de los intangibles.
const balanceHist = [
  { periodo: '2021', activo_total: 686717, activo_corriente: 440496, pasivo_corriente: 337921, pasivo_total: 445790, fondo_comercio: null, intangibles: 75240, inmovilizado_material: 65981, existencias: 148928, clientes: 131130, proveedores: 108605, activos_contrato: null, pasivos_contrato: null, caja: 89980, deuda_financiera: 110322, arrendamientos: null, patrimonio_neto: 57201, minoritarios: 183727, reservas: 4102 },
  { periodo: '2022', activo_total: 830503, activo_corriente: 578455, pasivo_corriente: 495238, pasivo_total: 556057, fondo_comercio: null, intangibles: 69050, inmovilizado_material: 72838, existencias: 135083, clientes: 163356, proveedores: 197354, activos_contrato: null, pasivos_contrato: null, caja: 192594, deuda_financiera: 123750, arrendamientos: null, patrimonio_neto: 53377, minoritarios: 221068, reservas: 3780 },
  { periodo: '2023', activo_total: 777368, activo_corriente: 562633, pasivo_corriente: 481329, pasivo_total: 492958, fondo_comercio: null, intangibles: 52764, inmovilizado_material: 73942, existencias: 149213, clientes: 191647, proveedores: 167016, activos_contrato: 12986, pasivos_contrato: 30923, caja: 164529, deuda_financiera: 120908, arrendamientos: null, patrimonio_neto: 68982, minoritarios: 215429, reservas: 4348 },
  { periodo: '2024', activo_total: 945436, activo_corriente: 656595, pasivo_corriente: 550089, pasivo_total: 622948, fondo_comercio: null, intangibles: 48650, inmovilizado_material: 136271, existencias: 116981, clientes: 234983, proveedores: 206893, activos_contrato: 31247, pasivos_contrato: 48089, caja: 188920, deuda_financiera: 202467, arrendamientos: 8156, patrimonio_neto: 77920, minoritarios: 244568, reservas: 8852 },
  { periodo: '2025', activo_total: 1599392, activo_corriente: 1247957, pasivo_corriente: 1022376, pasivo_total: 1087584, fondo_comercio: 40605, intangibles: 9942, inmovilizado_material: 154736, existencias: 351827, clientes: 253848, proveedores: 214168, activos_contrato: 34049, pasivos_contrato: 100513, caja: 411890, deuda_financiera: 252748, arrendamientos: 13525, patrimonio_neto: 125387, minoritarios: 386421, reservas: 55436 },
];
// capex = inmovilizado material + intangibles. Intereses pagados en el flujo operativo. dividendos = los de la dominante (cero);
// las filiales pagaron 20.000 M a sus minoritarios en 2025.
const flujosHist = [
  { periodo: '2021', flujo_operativo: 3556, capex: 9311, pagos_arrendamientos: 2420, adquisiciones: null, desinversiones: null, dividendos: 0, recompras: 0, emision_acciones: null, intereses_en_financiacion: 0 },
  { periodo: '2022', flujo_operativo: 123335, capex: 20138, pagos_arrendamientos: 3764, adquisiciones: null, desinversiones: null, dividendos: 0, recompras: 0, emision_acciones: null, intereses_en_financiacion: 0 },
  { periodo: '2023', flujo_operativo: -29332, capex: 6451, pagos_arrendamientos: 6773, adquisiciones: null, desinversiones: null, dividendos: 0, recompras: 0, emision_acciones: null, intereses_en_financiacion: 0 },
  { periodo: '2024', flujo_operativo: 26443, capex: 73738, pagos_arrendamientos: null, adquisiciones: null, desinversiones: null, dividendos: 0, recompras: 0, emision_acciones: null, intereses_en_financiacion: 0 },
  { periodo: '2025', flujo_operativo: 238152, capex: 32200, pagos_arrendamientos: 8567, adquisiciones: 29863, desinversiones: null, dividendos: 0, recompras: 0, emision_acciones: null, intereses_en_financiacion: 0 },
];

const A = {
  _estado: 'completa',
  financieros: {
    cuenta,
    // LTM jun-26 = 2025 − 1S25 + 1S26 [A1, A3, A5, A6]. 1S25: ventas 2.903.300, beneficio operativo 55.410, dominante 14.410.
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 11548194, ebitda: 347977, ebit: 331977, beneficio_neto: 70779, bpa: 3051, dpa: 0, dpa_extraordinario: 0, fcf: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [
      { periodo: '2018', descripcion: 'Compra de Korea Gold Exchange (한국금거래소, KGE) a través de KGE Holdings: desde entonces el oro es la mayor parte de las ventas [A12].' },
      { periodo: '2022-2023', descripcion: 'Escisión de la nube de ITCEN ENTEC (Cloit, 2022) y fusiones internas del grupo IT (CTS con Supia ITCEN Holdings; ENTEC con Comtec Information) [A1].' },
      { periodo: '2025', descripcion: 'Compra de Info U & Company (datos con IA) y de otras participaciones (29.863 M en adquisiciones) [A1].' },
      { periodo: '2026', descripcion: 'Compra del 93,27 % de Galaxia FN (valores tokenizados) por 1.385 M el 30-jul [A9].' },
    ],
    comentario: 'Las ventas consolidadas pasaron de 2,62 billones de KRW en 2022 a 8,87 billones en 2025 y a 11,55 billones en los últimos doce meses, pero **casi todo es oro vendido al precio de mercado**: en 2025 el negocio Web3 (oro y metales preciosos de KGE) fueron 7,76 billones de ventas y 252.400 M de beneficio operativo (margen del 3,25 %) y la informática (SI), 1,12 billones y 27.900 M (2,5 %) [A1]. Antes del auge del oro el margen del oro era del 0,5-0,9 % (2022-2024) [A1, A2]. En el 1S26 el oro vendió 5,50 billones con 110.500 M de beneficio operativo (95.100 M en el 1T y solo 15.400 M en el 2T, margen del 0,6 %) y la informática 546.000 M con 11.060 M [A3, A5]. El beneficio atribuido a la dominante es solo el ≈ 23,5 % del consolidado (46.650 M de 198.284 M en 2025): **el ≈ 76 % es de los minoritarios de las filiales** [A1].',
    ajustes: 'Cifras publicadas K-IFRS. Cuatro avisos. (1) El resultado financiero mezcla coberturas del oro (derivados: +58.649 M de beneficio por operaciones en 2025), la revalorización de los vales regalo de oro (−52.744 M) e intereses (−11.572 M) [A1]: tratamos como recurrente ≈ −8.000 M. (2) El BPA del 1S26 (1.661 KRW básico) lleva ≈ 17.200 M de ganancia por la revalorización del derivado del CB nº 16 (el BPA diluido es de 891 KRW) [A3]: no es recurrente. (3) La amortización de 2021-2023 es aproximada (intangibles estimados). (4) El BPA de los últimos doce meses (3.051 KRW, FnGuide) está inflado por el 4T25 y el 1T26 del oro y por esa ganancia [A10].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '3T24', ingresos: 1284900, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 13420, margen_ebitda_pct: 1.04, bpa: null, vs_consenso: null },
      { periodo: '4T24', ingresos: 1506400, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 30920, margen_ebitda_pct: 2.05, bpa: null, vs_consenso: null },
      { periodo: '1T25', ingresos: 1636600, crecimiento_pct: 79.7, crecimiento_organico_pct: 79.7, ebitda: 37460, margen_ebitda_pct: 2.29, bpa: null, vs_consenso: null },
      { periodo: '2T25', ingresos: 1266700, crecimiento_pct: 0.5, crecimiento_organico_pct: 0.5, ebitda: 25190, margen_ebitda_pct: 1.99, bpa: null, vs_consenso: null },
      { periodo: '3T25', ingresos: 1727300, crecimiento_pct: 34.4, crecimiento_organico_pct: 34.4, ebitda: 68090, margen_ebitda_pct: 3.94, bpa: null, vs_consenso: null },
      { periodo: '4T25', ingresos: 4240300, crecimiento_pct: 181.5, crecimiento_organico_pct: 181.5, ebitda: 163670, margen_ebitda_pct: 3.86, bpa: null, vs_consenso: null },
      { periodo: '1T26', ingresos: 3288200, crecimiento_pct: 100.9, crecimiento_organico_pct: 100.9, ebitda: 103170, margen_ebitda_pct: 3.14, bpa: null, vs_consenso: null },
      { periodo: '2T26', ingresos: 2292400, crecimiento_pct: 81.0, crecimiento_organico_pct: 81.0, ebitda: 12290, margen_ebitda_pct: 0.54, bpa: 110, vs_consenso: null },
    ],
    ultima_presentacion: 'Ventas y beneficio operativo de cada trimestre de los informes trimestrales, semestrales y anuales [A1, A3, A5-A7, A13, A14]; EBITDA = beneficio operativo + la amortización anual repartida a partes iguales (estimación). Beneficio operativo: 3T24 10.560 M, 4T24 28.060, 1T25 33.840, 2T25 21.570, 3T25 64.470, 4T25 160.050, 1T26 99.170 y 2T26 8.290 M. El 2T26 (13-ago) fue el más flojo desde 2024: el margen del oro cayó al 0,6 % con el precio del oro bajando desde el máximo de enero y la negociación del oro en Corea un 80 % por debajo de la de enero [A3]. El BPA diluido del 2T26 fue de 110 KRW (el básico, 876 KRW, lleva la ganancia del derivado del CB). Sin consenso trimestral publicado (una sola casa). Resultados del 3T26 hacia el 13-nov (estimado: en 2025 fueron el 13-nov).',
    confianza: 'Media',
  },
  balance: {
    historico: balanceHist,
    vencimientos: [],
    liquidez: 'A 30-jun-2026 (consolidado): efectivo de 167.171 M (397.224 M en diciembre), depósitos a corto de 9.665 M y activos financieros a valor razonable a corto de 45.996 M; deuda financiera de 228.227 M en libros (165.969 M de préstamos a corto, 51.843 M de parte corriente del largo, 7.915 M de convertibles en libros y 2.500 M a largo), es decir 270.312 M con los convertibles a su nominal (40.000 M del CB nº 16 y 10.000 M del de ITCEN PNS) [A3]. **La matriz sola tiene poca caja**: ≈ 4.000 M a fin de 2025 frente a ≈ 58.000 M de deuda a un año; el CB de 40.000 M de mayo de 2026 fue para refinanciarla [A11]. Rating BBB+ (Seoul Credit Rating, may-2025; antes A−).',
    rating: 'BBB+ (Seoul Credit Rating, mayo de 2025)',
    coste_deuda_pct: 5.0,
    vida_media_anios: null,
    otros_pasivos: 'CB nº 16 (40.000 M, cupón 0 %, rendimiento al vencimiento del 1 %, vence el 8-may-2031): conversión desde el 8-may-2027 a 38.021 KRW (ajustado el 8-ago-2026 desde 54.315; suelo del 70 %), 1.052.050 acciones (4,5 %); el inversor puede pedir el reembolso desde el 8-may-2028 [A3, A8]. ITCEN Cloit tiene acciones preferentes convertibles con opción de venta del inversor (≈ 20.000 M, en otros pasivos financieros) [A1]. KGE Holdings tiene un préstamo de adquisición con vencimiento anticipado si se incumplen condiciones y la matriz una opción de compra sobre acciones de KGE Holdings (mar-2028 a mar-2030) [A1]. Garantías de cumplimiento de contratos del sindicato de software (268.055 M de cobertura) y avales personales del presidente sobre 11.560 M de préstamos [A1]. Pleitos pequeños (≈ 9.000 M en total) [A1].',
    comentario: 'El balance es el de un mayorista de oro con un negocio informático pegado: existencias de 351.827 M a fin de 2025 (oro en bruto, lingotes y joyería: 146.276 M de materias primas, 159.841 M de mercaderías y 41.273 M de producto terminado) y 356.858 M a 30-jun-2026 [A1, A3]. El circulante comercial (existencias + clientes + activos de contrato − proveedores − pasivos de contrato) fue de ≈ 325.000 M en 2025 (3,7 % de las ventas) y ≈ 476.000 M a 30-jun-2026: en el 1S26 la empresa consumió 188.251 M de caja operativa (impuestos de 2025, menos anticipos de clientes y más cuentas a cobrar) [A3]. El patrimonio de la dominante es pequeño (164.448 M a jun-2026) frente al de los minoritarios (457.079 M) [A3]. Deuda neta consolidada de ≈ 93.000 M (≈ 0,3 veces el EBITDA de los últimos doce meses), pero la matriz depende de los dividendos de filiales que no controla al 100 %.',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujosHist,
    comentario: 'El flujo operativo es muy irregular porque lo mueve el circulante del oro: 123.335 M en 2022, −29.332 M en 2023, 26.443 M en 2024, 238.152 M en 2025 (beneficio récord y anticipos de clientes) y −188.251 M en el 1S26 [A1, A2, A3]. En cinco años el flujo operativo acumulado (362.154 M) cubre el capex (141.838 M, sobre todo la sede de Gwacheon en 2024: 72.340 M) [A1]. La matriz no paga dividendo (política de no reparto en 2023-2025); en 2025 las filiales pagaron 20.000 M a sus minoritarios [A1]. Intereses pagados de 13.086 M en 2025 [A1].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'EY Hanyoung (한영회계법인)',
    anios_auditor: 2,
    opinion: 'Favorable (2025)',
    comentario: 'EY Hanyoung audita desde 2024 (antes Samil PwC), con opinión favorable; las cuestiones clave de 2025 son el deterioro del fondo de comercio de KGE (40.605 M) y el grado de avance de los contratos de integración de sistemas (230.395 M de ingresos) [A1]. En marzo de 2024 la empresa avisó de un retraso del informe de auditoría. Criterios a vigilar: (1) **la venta de oro se contabiliza por el importe bruto**: infla las ventas y hace que cualquier margen parezca bajo [A12]; (2) la mezcla de coberturas y vales regalo en el resultado financiero; (3) la ganancia por el derivado del CB en el BPA de 2026; (4) las ventas a la asociada Aurum Exchange (527.085 M en 2025, el 6 % de las ventas) [A1]; (5) ITCEN ENTEC fue designada por la KRX en 2023 por comunicación no fiel [A1].',
    senales: [
      { senal: 'Ventas de oro brutas', nivel: 'Media', comentario: '87 % de las ventas con margen operativo del 0,5-3 % [A1].' },
      { senal: 'Flujo operativo muy volátil', nivel: 'Media', comentario: '−188.251 M en el 1S26 tras +238.152 M en 2025 [A1, A3].' },
      { senal: 'Ventas a una asociada', nivel: 'Media', comentario: 'Aurum Exchange (asociada de KGE): 527.085 M en 2025 [A1].' },
      { senal: 'Ganancias por derivados del CB', nivel: 'Baja', comentario: '≈ 17.200 M en el 1S26; el BPA diluido es la mitad del básico [A3].' },
    ],
    confianza: 'Media',
  },
  capital: {
    politica: 'Sin dividendo de la matriz en 2023, 2024 ni 2025, ni siquiera con el beneficio récord de 2025 [A1]. Sin recompras de la empresa; el presidente compró 6.190 acciones (≈ 140 M) el 16 y el 19-oct-2026 a título personal. Sin plan de valor publicado.',
    adquisiciones: [
      { fecha: '2018', objetivo: 'Korea Gold Exchange (vía KGE Holdings)', importe: null, comentario: 'La compra que convirtió al grupo en el mayor mayorista de oro de Corea.' },
      { fecha: '2025', objetivo: 'Info U & Company y otras participaciones', importe: 29863, comentario: 'Datos con IA; participaciones en el Busan Digital Asset Exchange y en una gestora de capital riesgo [A1].' },
      { fecha: '2026-07-30', objetivo: 'Galaxia FN (93,27 %)', importe: 1385, comentario: 'Plataforma de valores tokenizados, a Galaxia Moneytree (grupo Hyosung) [A9].' },
    ],
    comentario: 'La matriz asigna capital comprando participaciones (oro, datos, activos digitales) y no reparte. Como holding, su caja depende de los dividendos de filiales en las que tiene entre el 25 % y el 50 %: las filiales pagan al resto de accionistas tanto o más que a la matriz. El ROE consolidado de los últimos doce meses fue del 54 % (Yahoo) por el auge del oro; el ROE atribuible de 2025 fue del 46 % sobre un patrimonio de la dominante pequeño (125.387 M) [A1].',
    confianza: 'Media',
  },
  negocio: {
    segmentos: [
      { nombre: 'Web3: oro y metales preciosos (Korea Gold Exchange y filiales)', descripcion: 'Compra, refino, fabricación y venta mayorista y al público de oro, plata y lingotes; plataformas móviles y proyecto de token de oro (KGLD)', tipo_resultado: 'EBIT', historico: [{ periodo: '2022', ingresos: 2113600, resultado: 11500 }, { periodo: '2023', ingresos: 1959000, resultado: 12250 }, { periodo: '2024', ingresos: 3940700, resultado: 34300 }, { periodo: '2025', ingresos: 7761400, resultado: 252400 }, { periodo: '1S26', ingresos: 5503900, resultado: 110500 }] },
      { nombre: 'Servicios informáticos (ITCEN CTS, ENTEC, Cloit, C-Platform, PNS)', descripcion: 'Integración de sistemas, mantenimiento, nube, centros de datos y equipos para Administraciones, educación, defensa y empresas', tipo_resultado: 'EBIT', historico: [{ periodo: '2022', ingresos: 795800, resultado: 18700 }, { periodo: '2023', ingresos: 1004000, resultado: 18400 }, { periodo: '2024', ingresos: 1036400, resultado: 24400 }, { periodo: '2025', ingresos: 1124900, resultado: 27900 }, { periodo: '1S26', ingresos: 546000, resultado: 11060 }] },
    ],
    geografias: [],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Margen operativo del oro', valor_anterior: '0,87 % (2024)', valor_actual: '3,25 % (2025); 0,6 % (2T26)', variacion: 'pico en 4T25-1T26', comentario: 'Antes del auge, 0,5-0,9 % [A1, A3].' },
      { kpi: 'Margen operativo de la informática', valor_anterior: '2,4 % (2024)', valor_actual: '2,5 % (2025); 2,0 % (1S26)', variacion: '+0,1 puntos', comentario: 'Estacional: el 4T pesa la mitad del año [A1, A3].' },
      { kpi: 'Peso del oro en las ventas brutas', valor_anterior: '66,1 % (2023)', valor_actual: '87,2 % (2025)', variacion: '+21 puntos', comentario: 'Por el precio y el volumen del oro [A1].' },
      { kpi: 'Parte del beneficio de la dominante', valor_anterior: '11,8 % (2024)', valor_actual: '23,5 % (2025)', variacion: '+11,7 puntos', comentario: 'El resto es de los minoritarios de las filiales [A1].' },
      { kpi: 'Existencias', valor_anterior: '116.981 M (dic-2024)', valor_actual: '356.858 M (jun-2026)', variacion: '×3,1', comentario: 'Más oro y a más precio [A1, A3].' },
    ],
  },
  fuentes: fA,
  huecos: [
    { seccion: 'trimestres', campo: 'BPA trimestral y consenso previo de cada trimestre', tipo: 'Complemento', intentos: '1) Informes trimestrales de DART (solo el beneficio y el BPA acumulado); 2) FnGuide (una sola casa, sin consenso trimestral); 3) prensa (cifras sueltas)', decision: 'Omitido' },
    { seccion: 'financieros', campo: 'Flujo libre de los últimos doce meses', tipo: 'Complemento', intentos: '1) Informe semestral de 2026 (flujo del 1S26 y 1S25); 2) informe semestral de 2025 (no descargado); 3) FnGuide (sin flujos trimestrales)', decision: 'Omitido' },
    { seccion: 'negocio', campo: 'Ventas por país', tipo: 'Complemento', intentos: '1) Informe anual de 2025 (no da regiones; exportaciones de oro de KGE FTC sin desglose); 2) informe semestral; 3) prensa', decision: 'Omitido' },
  ],
};
guarda('A', A);

// ================================================================ B. Sector y competencia
const fB = [
  { id: 1, titulo: '사업보고서 2025: negocio (holding con tres pilares: gestión e inversión, Web3 y servicios informáticos), filiales, ventas por negocio (Web3 87,23 %, informática 12,75 %), estrategia en el sector público, cartera de pedidos y competencia', editor: 'ITCEN GLOBAL / DART (FSS)', tipo: 'Primaria', fecha: '2026-03-23', url: DART('20260323001492') },
  { id: 2, titulo: '반기보고서 2026: segmentos del 1S26 y clientes principales', editor: 'ITCEN GLOBAL / DART (FSS)', tipo: 'Primaria', fecha: '2026-08-13', url: DART('20260813001059') },
  fuenteN(3, 'krx'),
  fuenteN(4, 'frio'),
  fuenteN(5, 'hueco'),
  { id: 6, titulo: 'Fichas de Samsung SDS, LG CNS, Hyundai AutoEver, POSCO DX, Lotte Innovate, Shinsegae I&C, ITCEN CTS, ITCEN ENTEC, ITCEN PNS, Gold.com (antes A-Mark), ARE Holdings, Matsuda Sangyo y Chow Tai Fook', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/124500.KQ' },
  fuenteN(7, 'zdnet'),
  fuenteN(8, 'stable'),
  fuenteN(9, 'clarity'),
  fuenteN(10, 'oro'),
  fuenteN(11, 'sto'),
];
const B = {
  _estado: 'completa',
  historia: {
    resumen: 'ITCEN GLOBAL se fundó el 10-may-2005 en Corea como empresa de integración de sistemas y salió al KOSDAQ el 23-dic-2014 [B1]. Su presidente y fundador, Kang Jin-mo (antes en Daou Technology), la convirtió en un holding: compró integradores cotizados (Comtec System, hoy ITCEN CTS; Ssangyong Information & Communications, hoy ITCEN ENTEC) y en 2018 Korea Gold Exchange (KGE), el mayor mayorista de oro de Corea [B1, B5]. Desde 2020 vende oro por móvil y desde 2024 se presenta como grupo «Web3»: participación en el Busan Digital Asset Exchange, proyecto de token de oro (KGLD) y compra de Galaxia FN (valores tokenizados) en 2026 [B1, B7]. Con el auge del oro de 2025-2026 sus ventas superaron a las de Naver en el 1T26 [B5].',
    hitos: [
      { anio: '2005', hito: 'Fundación (10-may) [B1].' },
      { anio: '2014', hito: 'Salida a bolsa en el KOSDAQ (23-dic) [B1].' },
      { anio: '2018', hito: 'Compra de Korea Gold Exchange [B5].' },
      { anio: '2020', hito: 'Plataforma de oro fraccionado Sengold (vendida en 2025 al Busan Digital Asset Exchange) [B5].' },
      { anio: '2023', hito: 'Fusiones internas del grupo informático [B1].' },
      { anio: '2025', hito: 'Ventas de 8,87 billones con el auge del oro; sede en Gwacheon [B1].' },
      { anio: '2026', hito: 'CB de 40.000 M (mayo); compra de Galaxia FN (julio); proyecto KGLD [B7].' },
    ],
    confianza: 'Alta',
  },
  negocio: {
    descripcion: '**ITCEN GLOBAL es un holding con dos negocios que no se parecen.** (1) **Oro**: Korea Gold Exchange y sus filiales compran oro (importado y de reciclaje), lo refinan y lo venden en lingotes y joyería a joyerías, bancos, la asociada Aurum Exchange y al público; fue el 87 % de las ventas brutas de 2025 (7,76 billones) y el 90 % del beneficio operativo (252.400 M) [B1]. (2) **Servicios informáticos**: ITCEN CTS (cotiza en el KOSPI), ITCEN ENTEC (KOSDAQ), Cloit (nube), C-Platform e ITCEN PNS hacen integración de sistemas, mantenimiento, equipos y centros de datos, sobre todo para Administraciones (educación con K-Edufine, defensa, centros de datos del Estado) y empresas; 1,12 billones de ventas y 27.900 M de beneficio operativo [B1]. La matriz cobra marca y alquileres y tiene participaciones en activos digitales [B1].',
    como_gana_dinero: 'En el oro gana un margen pequeño entre el precio de compra y el de venta más la prima de fabricación de lingotes y joyas: el margen operativo fue del 0,5-0,9 % en 2022-2024 y del 3,25 % en 2025, cuando la fiebre del oro en Corea disparó la demanda y las primas [B1, B5]. Por eso las ventas suben y bajan con el precio del oro y con la cantidad que compran los coreanos [B3, B4]. En la informática gana un 2-3 % de margen operativo en proyectos públicos y privados, con el 4T como trimestre fuerte por el calendario presupuestario [B1]. Lo que más pesa en el resultado: el volumen de oro negociado en Corea y las primas, no el nivel del precio en sí.',
    clientes: 'En el oro, joyerías, mayoristas, bancos (Hana Bank) y el público; el mayor cliente supuso 3,03 billones en 2025 (34 % de las ventas) y la asociada Aurum Exchange, 527.085 M [B1]. En la informática, sobre todo el sector público coreano: la cartera de pedidos de más de 5.000 M de la matriz es toda pública (ejército, Agencia de Desarrollo de Defensa, centros de datos del Estado, K-Edufine del Ministerio de Educación) [B1]. Las grandes integradoras (Samsung SDS, LG CNS, SK C&C) tienen limitado el acceso a los contratos públicos, lo que deja ese mercado a las medianas como ITCEN [B1].',
    confianza: 'Alta',
  },
  sector: {
    definicion: 'Dos mercados. (1) **Oro en Corea**: no hay una cifra pública del comercio físico total; usamos como referencia la negociación del mercado del oro de la KRX (19,42 billones de KRW del 2-ene al 2-oct de 2026, +77,2 % frente a 10,96 billones un año antes) [B3], que cayó un 80 % entre enero y julio de 2026 [B4]. Las ventas de KGE no pasan por la KRX: la comparación mide escala, no cuota. (2) **Software y servicios informáticos públicos**: ≈ 4,25 billones de KRW en 2024 (+4,3 %), según el informe anual [B1].',
    tamano: '≈ 26 billones de KRW de negociación anualizada en la KRX en 2026 [B3]; ≈ 4,25 billones de software público (2024) [B1]',
    unidad_serie: 'billones de KRW (negociación del oro en la KRX, 2-ene a 2-oct)',
    serie: [
      { anio: '2025', tamano: 10.96 }, { anio: '2026', tamano: 19.42 },
    ],
    tcac_historico_pct: null,
    tcac_previsto_pct: null,
    cr5_pct: null,
    estructura: 'Oro: KGE es el mayor mayorista de Corea; Aurum Exchange (asociada) es el cuarto; compiten Samsung Gold Exchange, la Casa de la Moneda (KOMSCO), bancos y la KRX [B1]. Informática pública: fragmentada entre integradoras medianas por la restricción a las grandes',
    drivers: [
      { driver: 'Volumen de oro que compran los coreanos', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'La negociación de la KRX subió un 77 % en 2026 pero cayó un 80 % de enero a julio [B3, B4].' },
      { driver: 'Precio del oro y tipos de EE. UU.', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'El oro cayó el 20-oct por la subida de los tipos de EE. UU. y el won [B10].' },
      { driver: 'Regulación de activos digitales (stablecoins, valores tokenizados)', efecto: '+/−', horizonte: 'Estructural', evidencia: 'La ley de valores tokenizados se aprobó en enero de 2026; la de stablecoins se retrasa en Corea y EE. UU. [B1, B8, B9].' },
      { driver: 'Presupuesto público de informática', efecto: '+', horizonte: 'Estructural', evidencia: 'Software público de 4,25 billones (+4,3 %) [B1]; ENTEC preferente en K-Edufine (217.300 M) [B7].' },
      { driver: 'IA generativa en la programación y la integración', efecto: '−', horizonte: 'Estructural', evidencia: 'Abarata el trabajo por horas de la integración de sistemas; la empresa lo vende como «transformación con IA» [B1].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 4, justificacion: 'Oro: producto idéntico, compite por prima y red; informática: concursos públicos por precio [B1].' },
      { fuerza: 'Poder de los clientes', intensidad: 4, justificacion: 'El mayor cliente del oro fue el 34 % de las ventas de 2025; la Administración fija precios en los concursos [B1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 3, justificacion: 'El oro se compra a precio internacional; en informática, fabricantes como IBM y subcontratas [B1].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Refino, licencias y red física en el oro; referencias en contratos públicos en la informática.' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'Oro en la KRX, fondos cotizados de oro y cuentas de oro de los bancos [B3].' },
    ],
    ciclo: { posicion: 'Desaceleración', comentario: 'La fiebre del oro de finales de 2025 y enero de 2026 ya pasó: la negociación de la KRX cayó un 80 % entre enero y julio [B4] y el margen del oro de KGE bajó del 3,1 % del 1T26 al 0,6 % del 2T26 [B2]. El precio del oro (≈ 4.160 USD) está un 12 % por debajo del máximo de enero. Indicadores: negociación diaria de la KRX, primas de los lingotes y precio del oro en wones.' },
    regulacion: 'El oro se rige por la normativa de comercio de metales preciosos y por la de la KRX para el mercado regulado; KGE tiene licencias de refino y de comercio exterior. La informática pública se rige por la ley de software, que limita a las grandes integradoras en los concursos públicos [B1]. Los activos digitales dependen de la ley de valores tokenizados (aprobada en enero de 2026) y de la de stablecoins (pendiente) [B1, B8].',
    tendencias: 'Tres tendencias. (1) El oro pasó de ser un nicho a un activo de inversión masivo en Corea en 2025-2026, con efectos de moda que ya remiten [B3, B4]. (2) La tokenización de activos reales (oro, inmuebles) abre una vía de negocio para quien tiene el oro físico, pero aún sin ingresos [B7, B11]. (3) En la informática, la IA generativa cambia el trabajo de integración: más demanda de proyectos de IA y nube, pero menos horas por proyecto [B1].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 39.2,
    posicion: 'Korea Gold Exchange es el mayor mayorista de oro de Corea y la asociada Aurum Exchange el cuarto [B1]. Sus ventas de oro (≈ 9-10 billones al año al precio de 2026) equivalen a ≈ 35-40 % de la negociación anual del mercado del oro de la KRX, una referencia de escala, no una cuota [B3]. En la informática es una integradora mediana del sector público, por detrás de Samsung SDS, LG CNS, SK y Hyundai AutoEver.',
    competidores: [],
    foso: {
      veredicto: 'Ninguno',
      tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'Red de joyerías y bancos, sin efectos de red propiamente dichos.' },
        { fuente: 'Costes de cambio', puntuacion: 2, evidencia: 'Mantenimiento plurianual de sistemas públicos (K-Edufine) [B1].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 2, evidencia: 'Marca Korea Gold Exchange y licencias de refino; referencias públicas [B1].' },
        { fuente: 'Ventaja en costes', puntuacion: 2, evidencia: 'Escala en refino y fabricación de lingotes; margen operativo de 0,5-0,9 % en años normales [B1].' },
        { fuente: 'Escala eficiente', puntuacion: 2, evidencia: 'Pocos refinadores grandes en Corea.' },
      ],
    },
    amenazas: 'En el oro, que la demanda vuelva a niveles de 2023-2024 (margen del 0,5-0,9 %) y que los bancos, la KRX y los fondos cotizados capten la inversión que hoy compra lingotes (probabilidad alta, impacto alto). En la informática, la presión de precios de la Administración y la IA, que reduce las horas facturables (media, impacto medio). En lo digital, que la regulación retrase o impida el negocio de tokens (media, impacto bajo hoy: no tiene ingresos).',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Lo que toca las cifras: (1) gobierno: el fundador controla con el 24,85 % y el grupo es una cadena de participaciones con minoritarios en cada filial; operaciones con sociedades de la familia (ITCEN Core); (2) origen del oro (cadena de suministro responsable, reciclaje); (3) seguridad de la información en sistemas públicos.',
    controversias: 'ITCEN ENTEC, designada por la KRX en 2023 por comunicación no fiel [B1]. En junio de 2026, rumor de venta de KGE y salida de Web3, desmentido por la empresa [B5].',
    confianza: 'Baja',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'esg', campo: 'Calificaciones ESG', tipo: 'Complemento', intentos: '1) KCGS (sin calificación encontrada); 2) informe ESG de 2025 de la empresa (no da calificaciones externas); 3) informe anual', decision: 'Omitido' },
    { seccion: 'sector', campo: 'Tamaño total del comercio físico de oro en Corea y CR5', tipo: 'Complemento', intentos: '1) Informe anual (no da cuotas); 2) World Gold Council (sin cifra de Corea encontrada); 3) KRX y prensa (solo el mercado regulado)', decision: 'Omitido' },
  ],
};
const fxDe = (c) => (c === 'USD' ? USDKRW : c === 'JPY' ? JPYKRW : c === 'HKD' ? HKDKRW : 1);
const raw = Object.fromEntries(compsRaw.map((c) => [c.s, c]));
const r1 = (x) => (x == null || !isFinite(x) ? null : Math.round(x * 10) / 10);
const r2 = (x) => (x == null || !isFinite(x) ? null : Math.round(x * 100) / 100);
const comp = (s, nombre, pais, comentario) => { const c = raw[s]; return { nombre, pais, ticker: s, ingresos: Math.round((c.rev * fxDe(c.fcur)) / 1e6), cuota_pct: null, margen_ebit_pct: r1(c.opM * 100), comentario }; };
B.competencia.competidores = [
  comp('018260.KS', 'Samsung SDS', 'Corea', 'La mayor integradora coreana; limitada en concursos públicos [B1, B6].'),
  comp('064400.KS', 'LG CNS', 'Corea', 'Integradora grande, nube e IA [B6].'),
  comp('286940.KS', 'Lotte Innovate', 'Corea', 'Integradora mediana; socio de ITCEN CTS en centros de datos (16-oct-2026) [B6].'),
  comp('031820.KS', 'ITCEN CTS (filial, 25 %)', 'Corea', 'Filial cotizada del grupo: equipos, redes y centros de datos [B6].'),
  comp('010280.KQ', 'ITCEN ENTEC (filial)', 'Corea', 'Filial cotizada del grupo: sistemas públicos (K-Edufine) [B6].'),
  comp('GOLD', 'Gold.com (antes A-Mark)', 'EE. UU.', 'Mayorista de metales preciosos: margen operativo del 0,45 %, la referencia de un mayorista de oro maduro [B6].'),
  comp('5857.T', 'ARE Holdings', 'Japón', 'Refino y reciclaje de metales preciosos [B6].'),
];
guarda('B', B);

// ================================================================ C. Equipo y gobierno
const fC = [
  { id: 1, titulo: '사업보고서 2025: consejo, comisiones, directivos, remuneración (presidente: 1.146,2 M), accionistas, empleados, vinculadas, garantías y sanciones', editor: 'ITCEN GLOBAL / DART (FSS)', tipo: 'Primaria', fecha: '2026-03-23', url: DART('20260323001492') },
  { id: 2, titulo: '반기보고서 2026: accionistas a 30-jun-2026', editor: 'ITCEN GLOBAL / DART (FSS)', tipo: 'Primaria', fecha: '2026-08-13', url: DART('20260813001059') },
  { id: 3, titulo: 'Accionistas principales (grupo de control, 7 declarantes: 24,85 %), flotante (75,07 %) y extranjeros (5,36 %)', editor: 'FnGuide (Naver WiseReport)', tipo: 'Datos de mercado', fecha: '2026-10-19', url: WR('c1010001') },
  fuenteN(4, 'bloter'),
  fuenteN(5, 'zdnet'),
  fuenteN(6, 'sueldo'),
  fuenteN(7, 'ntkcb'),
];
const C = {
  _estado: 'completa',
  directivos: {
    equipo: [
      { nombre: 'Kang Jin-mo', cargo: 'Fundador, presidente del consejo y consejero delegado', desde: '2005', participacion_pct: 12.34, trayectoria: 'Físico (Ajou) con máster en gestión de ingeniería (Yonsei); Daou Technology (1993-97) y Yeollim Technology (1998-2002). Fundó la empresa en 2005 y construyó el grupo por compras (Comtec, Ssangyong Information & Communications, Korea Gold Exchange). Tiene el 12,34 % y controla el 24,85 % con su grupo [C1, C4].' },
      { nombre: 'Lee Kyung-il', cargo: 'Vicepresidente, consejero ejecutivo (inversiones)', desde: '2006', participacion_pct: 0.22, trayectoria: 'Daewoo Telecom (1990-98) y Hansol Telecom (1998-2003); en la empresa desde 2006 [C1].' },
      { nombre: 'Jung Kwang-ho', cargo: 'Presidente ejecutivo (finanzas), consejero ejecutivo', desde: '2023', participacion_pct: null, trayectoria: 'LG CNS (1994-2018) y Kakao Enterprise (2019-23) [C1].' },
    ],
    historial_guidance: [],
    comentario: 'La dirige su fundador desde 2005; la matriz tiene 164 empleados (sin contar las filiales) [C1]. No publica guía de ventas ni de beneficio. Riesgo de persona clave: Kang Jin-mo decide las compras, es consejero en la mayoría de las filiales y avala personalmente 11.560 M de préstamos del grupo [C1]. El 20-oct-2026 compró 6.190 acciones (≈ 140 M) diciendo que el precio no refleja el valor [C4, C5]: una señal pequeña (0,03 % del capital) frente a su remuneración anual.',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Kang Jin-mo', cargo: 'Presidente del consejo y consejero delegado', tipo: 'Ejecutivo', desde: '2005', comisiones: null },
      { nombre: 'Lee Kyung-il', cargo: 'Consejero ejecutivo (vicepresidente)', tipo: 'Ejecutivo', desde: null, comisiones: null },
      { nombre: 'Jung Kwang-ho', cargo: 'Consejero ejecutivo (finanzas)', tipo: 'Ejecutivo', desde: '2025', comisiones: null },
      { nombre: 'Kim Young-ho', cargo: 'Consejero independiente', tipo: 'Independiente', desde: '2023', comisiones: 'Auditoría (presidente)' },
      { nombre: 'Lee Hyung-ki', cargo: 'Consejero independiente', tipo: 'Independiente', desde: '2022', comisiones: 'Auditoría' },
      { nombre: 'Lim Gyu-jun', cargo: 'Consejero independiente', tipo: 'Independiente', desde: '2026', comisiones: 'Auditoría' },
    ],
    presidente_ceo_separados: false,
    presidente_ejecutivo: true,
    consejero_coordinador: false,
    una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: true,
    variable_ligado_rentabilidad: false,
    auditoria_independiente: true,
    insiders_sin_operaciones: false,
    accionista_control: true,
    presidente_vinculado_control: true,
    cambios_cupula_24m: 1,
    voto_remuneracion_pct: null,
    voto_remuneracion_contra_pct: null,
    voto_remuneracion_contra_libre_pct: null,
    voto_cupula_pct: null,
    remuneracion_ceo: 1146,
    remuneracion: 'Kang Jin-mo cobró 1.146,2 M KRW en 2025: 836,2 M de sueldo, 304 M de bonus (pagas extra y bonus por resultados) y 6 M de otros [C1]: 17 veces el salario medio de la matriz, en un año de beneficio récord sin dividendo [C6]. El límite aprobado por la junta para los seis consejeros es de 3.000 M; se pagaron 1.949 M [C1]. El bonus no está ligado a la rentabilidad sobre el capital.',
    accionistas: [
      { nombre: 'Kang Jin-mo', pct: 12.34, tipo: 'Fundador', variacion: '+6.190 acciones el 16 y el 19-oct-2026 (12,31 % → 12,34 %) [C4]' },
      { nombre: 'ITCEN Core (sociedad del grupo de control)', pct: 10.02, tipo: 'Sociedad vinculada al fundador', variacion: 'Sin cambios [C3]' },
      { nombre: 'Soft Itec y otros del grupo de control', pct: 2.49, tipo: 'Grupo de control', variacion: 'Soft Itec 2,26 %; Lee Kyung-il 0,22 % [C3]' },
      { nombre: 'Extranjeros', pct: 5.36, tipo: 'Inversores extranjeros', variacion: '[C3]' },
      { nombre: 'Accionistas minoritarios (pequeños)', pct: 66.74, tipo: 'Flotante', variacion: 'A fin de 2025 [C1]' },
    ],
    insiders: [
      { nombre: 'Kang Jin-mo', cargo: 'Fundador y presidente', tipo: 'Compra', fecha: '2026-10-19', acciones: 6190, importe: 140, comentario: 'El 16 y el 19-oct-2026 a una media de 22.619 KRW [C4, C5].' },
    ],
    control_y_defensas: 'El fundador controla con el 24,85 % (12,34 % propio, 10,02 % de ITCEN Core y el resto de sociedades y personas vinculadas) frente a un flotante del 75 % muy disperso [C3]. Es presidente del consejo y consejero delegado; tres consejeros independientes forman la comisión de auditoría [C1]. **Operaciones vinculadas**: el grupo pagó 10.279 M en «otros gastos» a ITCEN Core (sociedad del grupo de control) en 2025, le compró un activo de 197 M y le vendió bienes y servicios por 2.011 M; vendió 5.806 M a Soft Itec; y vendió 527.085 M de oro a la asociada Aurum Exchange [C1]. Kang Jin-mo y personas vinculadas avalan 21.160 M de préstamos del grupo [C1]. **Estructura en cadena**: la matriz tiene el 28,86 % directo de KGE Holdings (50 % con el grupo) y el 25 % de ITCEN CTS; el ≈ 76 % del beneficio consolidado es de minoritarios [C1].',
    alertas: [
      'Beneficio récord en 2025 sin dividendo y presidente con 17 veces el salario medio [C1, C6].',
      'Pagos de 10.279 M a ITCEN Core, sociedad del grupo de control [C1].',
      'Presidente del consejo y consejero delegado son la misma persona, que es el accionista de control [C1].',
      'La matriz tiene poca caja propia y refinancia con convertibles (CB de 40.000 M con precio rebajado un 30 %) [C7].',
    ],
    confianza: 'Media',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'Resultado de las votaciones de la junta de marzo de 2026', tipo: 'Complemento', intentos: '1) DART, aviso de resultado de la junta (sin porcentajes); 2) informe anual (no los da); 3) prensa (sin cifras)', decision: 'Omitido' },
    { seccion: 'directivos', campo: 'Empleados del grupo consolidado', tipo: 'Complemento', intentos: '1) Informe anual (solo los 164 de la matriz); 2) informe ESG (no descargado); 3) informes de las filiales cotizadas (no sumados)', decision: 'Omitido' },
  ],
};
guarda('C', C);

// ================================================================ D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de 124500.KQ, del KOSDAQ (^KQ11) y del ETF KODEX IT (157490.KS); cierres, betas y volatilidad; cierre del 20-oct-2026 (21.450 KRW, 15:30 KST)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/124500.KQ' },
  { id: 2, titulo: 'Consenso 2026e (una casa: BPA de 2.222 KRW, EBITDA de 307.650 M), BPA de los últimos doce meses (3.051) y objetivo (54.000 KRW)', editor: 'FnGuide (Naver WiseReport)', tipo: 'Analistas', fecha: '2026-10-19', url: WR('c1050001') },
  { id: 3, titulo: 'Objetivos y recomendaciones: BNK Investment (11-sep-2026, Comprar, de 68.000 a 54.000 KRW)', editor: 'FnGuide (Naver WiseReport)', tipo: 'Analistas', fecha: '2026-10-19', url: WR('c1080001') },
  { id: 4, titulo: 'Fichas de comparables (precio, capitalización, valor empresa, ventas, EBITDA, estimaciones de BPA) y tipos de cambio KRW=X (1.325,86), JPYKRW=X (8,374) y HKDKRW=X (168,59)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/018260.KS' },
  { id: 5, titulo: 'Long-Term Government Bond Yields: 10-year for Korea (IRLTLT01KRM156N), septiembre de 2026: 4,454 %', editor: 'OECD vía FRED', tipo: 'Datos de mercado', fecha: '2026-10-01', url: 'https://fred.stlouisfed.org/series/IRLTLT01KRM156N' },
  { id: 6, titulo: 'Implied ERP by month: octubre de 2026, 4,20 %', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  fuenteN(7, 'cme'),
  fuenteN(8, 'stable'),
  fuenteN(9, 'rumor'),
  fuenteN(10, 'refix'),
  fuenteN(11, 'sto'),
  fuenteN(12, 'inst'),
  fuenteN(13, 'clarity'),
  fuenteN(14, 'oro'),
  fuenteN(15, 'si'),
  fuenteN(16, 'alza'),
];
const blend = (e0, e1) => 0.2 * e0 + 0.8 * e1; // próximos 12 meses desde el 20-oct: ≈ 2,4 meses de 2026 y 9,6 de 2027
const nombres = { '018260.KS': ['Samsung SDS', 'KR'], '064400.KS': ['LG CNS', 'KR'], '307950.KS': ['Hyundai AutoEver', 'KR'], '022100.KS': ['POSCO DX', 'KR'], '286940.KS': ['Lotte Innovate', 'KR'], GOLD: ['Gold.com (antes A-Mark)', 'US'], '5857.T': ['ARE Holdings', 'JP'], '7456.T': ['Matsuda Sangyo', 'JP'], '1929.HK': ['Chow Tai Fook', 'HK'] };
const comparables = compsRaw.filter((c) => nombres[c.s]).map((c) => {
  const fxP = fxDe(c.cur); const fxF = fxDe(c.fcur);
  const e0 = c.et.find((t) => t.p === '0y'); const e1 = c.et.find((t) => t.p === '+1y');
  let epsN = e0?.eps && e1?.eps ? blend(e0.eps, e1.eps) : null;
  let crec = e0?.rev && e1?.rev ? (e1.rev / e0.rev - 1) * 100 : null;
  // Ejercicio a marzo (ARE, Matsuda, Chow Tai Fook): 0y = marzo de 2027, +1y = marzo de 2028; mezcla 0,45/0,55.
  if (['5857.T', '7456.T', '1929.HK'].includes(c.s)) epsN = 0.45 * e0.eps + 0.55 * e1.eps;
  // Gold.com (ejercicio a junio): 0y = junio de 2027 ≈ próximos 12 meses.
  if (c.s === 'GOLD') epsN = e0.eps;
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
const itc = raw['124500.KQ'];
const D = {
  _estado: 'completa',
  identificacion: {
    nombre: 'ITCEN GLOBAL Co., Ltd. (아이티센글로벌)', nombre_corto: 'ITCEN GLOBAL', ticker: '124500', isin: 'KR7124500000', mercado: 'KOSDAQ (Korea Exchange)', indice_referencia: 'KOSDAQ',
    pais: 'Corea del Sur', pais_iso: 'KR', sector: 'Information Technology', industria: 'Holding: servicios informáticos y comercio de oro', sede: 'Gwacheon (Gyeonggi, Corea del Sur)', fundacion: '2005', empleados: 164, web: 'https://www.itcenglobal.com',
    precio: PRECIO, fecha_precio: '2026-10-20', acciones: 23.2, capitalizacion_publicada: Math.round(itc.mcap / 1e6), free_float_pct: 75.07,
    max_52s: bolsa.identificacion.max_52s, min_52s: bolsa.identificacion.min_52s, volumen_medio_diario: `≈ ${bolsa.volumen_3m.importe_dia_millones.toLocaleString('es-ES')} M KRW/día (3 meses; ${bolsa.volumen_3m.acciones_dia.toLocaleString('es-ES')} acciones)`, proximos_resultados: '2026-11-13',
  },
  consenso: {
    guidance: 'La empresa no publica guía de ventas ni de beneficio. Objetivo declarado de llevar 50 toneladas de oro a la cadena de bloques en cinco años con el token KGLD (emisión piloto). Resultados del 3T26 hacia el 13-nov-2026 (estimado: en 2025 fueron el 13-nov; sin aviso todavía).',
    estimaciones: [
      { periodo: '2026e', ingresos: null, ebitda: 307650, ebit: null, bpa: 2222, dpa: null, fuente: 'FnGuide, una casa (BNK), a 19-oct-2026 [D2]' },
    ],
    recomendaciones: { n_analistas: 1, comprar: 1, mantener: 0, vender: 0, po_medio: 54000, po_min: 54000, po_max: 54000 },
    revisiones: 'Una sola casa con objetivo publicado: BNK Investment (11-sep-2026), Comprar, rebajó el objetivo de 68.000 a 54.000 KRW [D3]. Samsung Securities comenta el valor sin objetivo. Con una sola estimación el consenso no es representativo.',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Baja',
  },
  bolsa: {
    ...bolsa.bolsa,
    posicion_corta_pct: null,
    comentario: `Valor de tema más que de resultados. Pasó de 5.200 KRW (fin de 2024) a 30.300 (fin de 2025, +483 %) y a un máximo de 75.500 KRW el 13-mar-2026 con el auge del oro y los temas de stablecoins y tokens [D1]. Desde entonces ha caído un 70 %: −17,6 % el 4-mar (pánico del KOSDAQ), −15,3 % el 23-mar (regulación de stablecoins) [D8], −16 % el 16-jun y −12,1 % el 25-jun (rumor de venta de KGE, desmentido, y ajuste del CB) [D9, D10], subidas del 14-23 % en julio-agosto (valores tokenizados e institucionales) [D11, D12] y caídas el 16-sep (ley CLARITY en EE. UU.) [D13] y el 20-oct (−9,1 %, el oro baja) [D14]. Hoy cotiza a 21.450 KRW (cierre del 20-oct), ${Math.round((1 - PRECIO / 75500) * 100)} % por debajo del máximo y un 26 % por encima del mínimo de 52 semanas (17.000 KRW, 22-oct-2025). Volatilidad del 105 % anual. A 21.450 KRW cotiza a ${r1(PRECIO / 3051)} veces el BPA de los últimos doce meses (inflado por el oro y el CB) y a ${r1(PRECIO / 2222)} veces el BPA de 2026e de la única casa.`,
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: ['2021', '2022', '2023', '2024', '2025'].map((a) => ({ anio: a, precio_cierre: bolsa.cierres_ejercicio.find((x) => x.anio === a)?.precio_cierre ?? null, ev_ebitda_ntm: null, per_ntm: null, excluir: a === '2022' || a === '2024' })),
    comentario: 'PER adelantado (cierre ÷ BPA real del año siguiente): 2021 59,0x (5.010 ÷ 85); 2022 112,2x (3.590 ÷ 32); 2023 40,4x (7.440 ÷ 184); 2024 2,6x (5.200 ÷ 2.010); 2025 ≈ 25x sobre nuestro BPA normalizado de 2026e [D1, nota A]. 2022 y 2024 son atípicos (más de tres veces o menos de un tercio de la mediana del resto): el BPA de la dominante fue casi nulo en 2023 y se multiplicó por 11 en 2025 con el oro. PER al cierre (BPA del propio año): 2021 pérdidas, 2022 42,2x, 2023 232x, 2024 28,3x y 2025 15,1x. El beneficio de la dominante ha sido tan pequeño e irregular que la historia del PER dice poco.',
    confianza: 'Baja',
  },
  comparables: {
    criterio: 'Dos grupos: integradoras coreanas cotizadas (Samsung SDS, LG CNS, Hyundai AutoEver, POSCO DX, Lotte Innovate; la filial ITCEN ENTEC queda fuera porque su BPA de Yahoo da un PER de 2x que no es comparable) y comercio y refino de metales preciosos (Gold.com en EE. UU., ARE Holdings y Matsuda Sangyo en Japón, Chow Tai Fook en Hong Kong). PER de los próximos 12 meses = precio ÷ (0,2 × BPA 2026e + 0,8 × BPA 2027e) de Yahoo; los de ejercicio a marzo con 0,45 × marzo-2027 + 0,55 × marzo-2028; Gold.com con el ejercicio a junio de 2027.',
    empresas: comparables,
    comentario: `Ningún comparable tiene la mezcla de ITCEN (holding con minoritarios, oro a margen bajo e integración pública). Mediana del grupo: ${r1(medianaPER)} veces el BPA de los próximos doce meses, con una dispersión enorme (Lotte Innovate ≈ 7x, POSCO DX ≈ 50x). Gold.com, el mayorista de metales preciosos más parecido al oro de KGE, cotiza a ≈ 10x con un margen operativo del 0,45 % [D4]. ITCEN, a 21.450 KRW, cotiza a ≈ 25 veces nuestro BPA normalizado de 2027e: más caro que las integradoras grandes y que los mayoristas de oro. Su EV/EBITDA de los últimos doce meses (2,6x en Yahoo) parece bajo porque cuenta un EBITDA del 100 % del que tres cuartas partes son de minoritarios y del pico del oro.`,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2026-07', objetivo: 'Galaxia FN (93,27 %)', comprador: 'ITCEN GLOBAL', ev: 1385, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: true, comentario: 'Plataforma de valores tokenizados con pérdidas; importe pequeño [nota A: 9].' },
      { fecha: '2026-05', objetivo: 'ITCEN GLOBAL (CB nº 16, 40.000 M)', comprador: 'Fondo de capital privado (ITC Holdings, de KCGI)', ev: null, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: true, comentario: 'Convertible a 54.315 KRW, rebajado a 38.021 KRW en agosto; deuda con opción, no una compra de control [nota A: 8].' },
    ],
    comentario: 'No hay compras recientes de mayoristas de oro o integradoras coreanas con múltiplos públicos comparables. El CB de mayo de 2026 da una referencia: el inversor aceptó convertir a 38.021 KRW (con reembolso garantizado desde 2028), un 77 % por encima del precio de hoy.',
    confianza: 'Baja',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'bolsa', campo: 'Posición corta', tipo: 'Complemento', intentos: '1) KRX (data.krx.co.kr sin acceso desde este entorno); 2) FnGuide (no la publica); 3) foro de Naver (solo comentarios)', decision: 'Omitido' },
    { seccion: 'consenso', campo: 'Consenso de 2027e y 2028e', tipo: 'Complemento', intentos: '1) FnGuide (solo 2026e de una casa); 2) Yahoo (sin estimaciones); 3) prensa (sin cifras)', decision: 'Omitido' },
  ],
};
guarda('D', D);

// ================================================================ E. Sentimiento
const fE = [
  { id: 1, titulo: 'Foro de Naver (종목토론실) de 124500: 400 mensajes del 17-sep al 20-oct-2026 (hora de Corea)', editor: 'Naver Pay Securities', tipo: 'Prensa', fecha: '2026-10-20', url: 'https://m.stock.naver.com/domestic/stock/124500/discussion' },
  fuenteN(2, 'hueco'),
  fuenteN(3, 'zdnet'),
  fuenteN(4, 'frio'),
];
const E = {
  _estado: 'completa',
  sentimiento: {
    tono: 'Negativo',
    tendencia: 'Empeora',
    revisadas: [
      { plataforma: 'Foro de Naver (종목토론실), 17-sep al 20-oct-2026', fecha: '2026-10', n_comentarios: 400, tono: 'Negativo', resumen: 'Mensajes de pérdidas, insultos y gráficos tras caer de 35.900 (fin de agosto) a 21.450 KRW; dudas sobre el token de oro KGLD («retraso casi seguro»), recordatorios de que la negociación del oro ha caído mucho y críticas al presidente; una minoría alcista a largo plazo («el banco del oro del futuro») y celebra su compra de acciones del 20-oct [E1].' },
      { plataforma: 'Prensa coreana', fecha: '2026-06 a 2026-10', n_comentarios: 4, tono: 'Neutro', resumen: 'Críticas al «crecimiento hueco» de unas ventas infladas por el oro [E2]; la empresa destaca el 1S26 récord, el KGLD y Galaxia FN y la compra del presidente [E3]; el interés por el oro se enfría [E4].' },
    ],
    temas: [
      { tema: 'Token de oro KGLD y Web3', postura: 'Alcista', peso: 'Alto', contraste: 'Sin ingresos todavía; emisión piloto; depende de la regulación (nota B).' },
      { tema: 'El oro se enfría', postura: 'Bajista', peso: 'Alto', contraste: 'Cierto: −80 % de negociación en la KRX de enero a julio y margen del 0,6 % en el 2T26 [E4].' },
      { tema: 'Compra del presidente', postura: 'Alcista', peso: 'Bajo', contraste: '≈ 140 M, el 0,03 % del capital [E3].' },
      { tema: 'Crecimiento hueco (ventas brutas de oro)', postura: 'Bajista', peso: 'Medio', contraste: 'Cierto en las ventas; el beneficio sí creció, pero por el pico del oro [E2].' },
    ],
    lectura: 'El foro está en capitulación tras perder el 70 % desde el máximo: domina el enfado y se discute el tema (token de oro, stablecoins) más que el beneficio. No hay euforia; los alcistas que quedan dependen de un catalizador (KGLD, ley de stablecoins) sin fecha cierta.',
    confianza: 'Media',
  },
  fuentes: fE,
  huecos: [],
};
guarda('E', E);
console.log('Notas A-E escritas;', comparables.length, 'comparables; mediana PER', r1(medianaPER), comparables.map((c) => `${c.nombre} ${c.per_ntm}`).join(', '));
