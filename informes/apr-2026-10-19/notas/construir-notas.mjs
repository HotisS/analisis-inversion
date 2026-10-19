// Escribe las notas A-E de APR Co., Ltd. (278470.KS, KOSPI; corte 2026-10-19, cierre del 19-oct en Seúl).
// Fuentes primarias: DART (dart.fss.or.kr, visor de secciones con notas/dart.mjs): informe anual (사업보고서) de 2025
// (rcp 20260323001257, con 2024 y 2023), de 2023 (20240321000964, con 2022 reexpresado y 2021) y de 2022 (20230329001036);
// informe semestral de 2026 (20260814002503); avisos de la KRX (resultados provisionales, dividendos, junta, plan de valor,
// fusión con APR Factory, fecha del 3T26) y declaración de Fidelity. Web de inversores (apr-in.aprd.io): presentaciones del
// 1T26 y del 2T26. Consenso y objetivos: FnGuide (Naver WiseReport). Bolsa y comparables: Yahoo Finance. Prensa coreana
// (Naver News) y foro de Naver. Cada nota cita solo con [n] de su propia lista.
// Ejecutar: node informes/apr-2026-10-19/notas/construir-notas.mjs
// Ejercicio natural (31-dic). Cifras en millones de KRW salvo que se diga otra cosa.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const DART = (rcp) => `https://dart.fss.or.kr/dsaf001/main.do?rcpNo=${rcp}`;
const NAVER = (oid, aid) => `https://n.news.naver.com/mnews/article/${oid}/${aid}`;
const IR = 'https://apr-in.aprd.io/ir';
const bolsa = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const compsRaw = JSON.parse(fs.readFileSync(path.join(dir, 'comparables-yahoo-raw.json'), 'utf8'));
const fx = Object.fromEntries(compsRaw.filter((c) => /=X$/.test(c.s)).map((c) => [c.s, c.price]));
const USDKRW = fx['KRW=X']; // 1.331,28 (Yahoo, 19-oct-2026)
const JPYKRW = fx['JPYKRW=X']; // 8,38
const EURKRW = fx['EURKRW=X']; // 1.492,4
const PRECIO = 331500; // cierre del 19-oct-2026 (Yahoo regularMarketPrice a las 15:30 KST; el histórico diario aún no trae la barra)

// ================================================================ A. Cuentas
const fA = [
  { id: 1, titulo: '사업보고서 2025 (informe anual): estados consolidados K-IFRS de 2025, 2024 y 2023 auditados por Hyundai Accounting (현대회계법인), notas (gastos comerciales, amortizaciones, flujos), ventas por producto, región y canal, dividendos, consejo y remuneración', editor: 'APR / DART (FSS)', tipo: 'Primaria', fecha: '2026-03-23', url: DART('20260323001257') },
  { id: 2, titulo: '사업보고서 2023 (informe anual): estados consolidados de 2023, 2022 reexpresado (participadas e impuesto diferido) y 2021, auditados por Deloitte Anjin', editor: 'APR / DART (FSS)', tipo: 'Primaria', fecha: '2024-03-21', url: DART('20240321000964') },
  { id: 3, titulo: '반기보고서 2026 (informe semestral, revisión limitada): estados consolidados a 30-jun-2026 con NIIF 18 adoptada por adelantado, 2T26 y 1S26, gastos comerciales, ventas por producto y región, accionistas, sanciones', editor: 'APR / DART (FSS)', tipo: 'Primaria', fecha: '2026-08-14', url: DART('20260814002503') },
  { id: 4, titulo: '사업보고서 2022 (informe anual): cuentas de 2022 y 2021 publicadas antes de la reexpresión, gastos comerciales', editor: 'APR / DART (FSS)', tipo: 'Primaria', fecha: '2023-03-29', url: DART('20230329001036') },
  { id: 5, titulo: '2026년 2분기 경영실적 (presentación de resultados del 2T26): ventas por línea y región, cuenta y balance resumidos con NIIF 18', editor: 'APR', tipo: 'Primaria', fecha: '2026-08-05', url: `${IR}/APR_%EA%B2%BD%EC%98%81%EC%8B%A4%EC%A0%81_2Q26_KOR_vF.pdf` },
  { id: 6, titulo: '2026년 1분기 경영실적 (presentación de resultados del 1T26): ventas por línea y región (EE. UU. 42 % de las ventas), serie trimestral desde el 1T23', editor: 'APR', tipo: 'Primaria', fecha: '2026-05-07', url: `${IR}/APR_%EA%B2%BD%EC%98%81%EC%8B%A4%EC%A0%81_1Q26_KOR_vF.pdf` },
  { id: 7, titulo: '연결재무제표기준영업(잠정)실적 (resultados provisionales del 4T25 y de 2025)', editor: 'APR / KRX', tipo: 'Primaria', fecha: '2026-02-04', url: DART('20260204800151') },
  { id: 8, titulo: '연결재무제표기준영업(잠정)실적 (resultados provisionales del 3T25)', editor: 'APR / KRX', tipo: 'Primaria', fecha: '2025-11-06', url: DART('20251106800081') },
  { id: 9, titulo: '연결재무제표기준영업(잠정)실적 (resultados provisionales del 3T24)', editor: 'APR / KRX', tipo: 'Primaria', fecha: '2024-11-06', url: DART('20241106800193') },
  { id: 10, titulo: '현금ㆍ현물 배당 결정 (dividendo final de 2025: 1.500 KRW, 56.157 M)', editor: 'APR / KRX', tipo: 'Primaria', fecha: '2026-02-27', url: DART('20260227800370') },
  { id: 11, titulo: '현금ㆍ현물 배당 결정 (dividendo a cuenta de 2026: 2.500 KRW, 93.595 M, pagado en agosto)', editor: 'APR / KRX', tipo: 'Primaria', fecha: '2026-07-16', url: DART('20260716800385') },
  { id: 12, titulo: 'Consenso anual y trimestral; BPA trimestral real 3T25-2T26', editor: 'FnGuide (Naver WiseReport)', tipo: 'Analistas', fecha: '2026-10-16', url: 'https://navercomp.wisereport.co.kr/v2/company/c1050001.aspx?cmp_cd=278470' },
  { id: 13, titulo: '[인사이드 스토리] 주가 \'급락\'한 에이피알…이유는 "너무 잘 팔려서" (margen del 3T26 por debajo de lo esperado: won, logística de Europa, fletes aéreos)', editor: 'Bizwatch', tipo: 'Prensa', fecha: '2026-10-16', url: NAVER('648', '0000051647') },
  { id: 14, titulo: '[IR] 에이피알 "美 트럼프 관세 환급 200억대…2분기부터 분할 반영" (devolución de aranceles IEEPA y fletes aéreos del 1T26, CFO Shin Jae-ha)', editor: 'News1', tipo: 'Prensa', fecha: '2026-05-07', url: NAVER('421', '0008930631') },
  { id: 15, titulo: '회사합병 결정 (fusión por absorción de la filial APR Factory, fabricante de los aparatos)', editor: 'APR / KRX', tipo: 'Primaria', fecha: '2026-09-09', url: DART('20260909800113') },
  { id: 16, titulo: '에이피알, 2분기도 최대 실적 달성…상반기 매출만 1조3609억원', editor: 'Newsis', tipo: 'Prensa', fecha: '2026-08-05', url: 'https://www.newsis.com/view/NISX20260805_0003736987' },
];

// Cuenta por función (K-IFRS hasta 2025; NIIF 18 desde 2026). EBITDA = beneficio operativo + amortización (inmovilizado,
// derecho de uso e intangibles, de la nota de flujos). resultado_financiero = BAI − beneficio operativo. BPA diluido publicado,
// ajustado por el desdoblamiento 5:1 de 2024; acciones diluidas = beneficio ÷ BPA diluido. 2022 reexpresado [A2].
const cuenta = [
  { periodo: '2021', ingresos: 259146, coste_ventas: 71623, gastos_generales: 173250, ebitda: 21568, amortizaciones: 7295, ebit: 14273, resultado_financiero: -535, bai: 13738, impuestos: 2339, minoritarios: 0, beneficio_neto: 11399, gastos_financieros: 648, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 324, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: 35.16 },
  { periodo: '2022', ingresos: 397698, coste_ventas: 106223, gastos_generales: 252246, ebitda: 49984, amortizaciones: 10756, ebit: 39228, resultado_financiero: -23, bai: 39205, impuestos: 10242, minoritarios: 0, beneficio_neto: 28963, gastos_financieros: 1036, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 814, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: 35.56 },
  { periodo: '2023', ingresos: 523809, coste_ventas: 128361, gastos_generales: 291255, ebitda: 118117, amortizaciones: 13923, ebit: 104194, resultado_financiero: 1629, bai: 105823, impuestos: 24277, minoritarios: 0, beneficio_neto: 81546, gastos_financieros: 1265, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 2219, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: 36.75 },
  { periodo: '2024', ingresos: 722754, coste_ventas: 179154, gastos_generales: 420894, ebitda: 145197, amortizaciones: 22491, ebit: 122706, resultado_financiero: 10595, bai: 133301, impuestos: 25710, minoritarios: 0, beneficio_neto: 107590, gastos_financieros: 3770, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 2819, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: 38.17 },
  { periodo: '2025', ingresos: 1527345, coste_ventas: 356728, gastos_generales: 805096, ebitda: 395799, amortizaciones: 30278, ebit: 365521, resultado_financiero: -1217, bai: 364304, impuestos: 74649, minoritarios: 0, beneficio_neto: 289655, gastos_financieros: 3524, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 7718, dpa: 5090, dpa_extraordinario: 0, acciones_diluidas: 37.53 },
];
const balanceHist = [
  { periodo: '2021', activo_total: 126429, activo_corriente: 90319, pasivo_corriente: 50064, pasivo_total: 60428, fondo_comercio: 281, intangibles: 1329, inmovilizado_material: 7168, existencias: 37831, clientes: 13763, proveedores: 21982, activos_contrato: null, pasivos_contrato: null, caja: 33804, deuda_financiera: 16500, arrendamientos: 12522, patrimonio_neto: 66001, minoritarios: 0, reservas: 13976 },
  { periodo: '2022', activo_total: 183131, activo_corriente: 137024, pasivo_corriente: 76267, pasivo_total: 83865, fondo_comercio: 281, intangibles: 2106, inmovilizado_material: 8777, existencias: 50460, clientes: 21070, proveedores: 27460, activos_contrato: null, pasivos_contrato: null, caja: 58162, deuda_financiera: 21500, arrendamientos: 13047, patrimonio_neto: 99266, minoritarios: 0, reservas: 42339 },
  { periodo: '2023', activo_total: 287309, activo_corriente: 219308, pasivo_corriente: 82296, pasivo_total: 90361, fondo_comercio: 196, intangibles: 4102, inmovilizado_material: 14188, existencias: 56521, clientes: 23005, proveedores: 38607, activos_contrato: null, pasivos_contrato: null, caja: 133163, deuda_financiera: 9816, arrendamientos: 12423, patrimonio_neto: 196949, minoritarios: 0, reservas: 123704 },
  { periodo: '2024', activo_total: 565144, activo_corriente: 286027, pasivo_corriente: 145137, pasivo_total: 241619, fondo_comercio: 196, intangibles: 5633, inmovilizado_material: 51364, existencias: 109746, clientes: 47947, proveedores: 68377, activos_contrato: null, pasivos_contrato: null, caja: 120039, deuda_financiera: 2572, arrendamientos: 106718, patrimonio_neto: 323524, minoritarios: 0, reservas: 229092 },
  { periodo: '2025', activo_total: 771738, activo_corriente: 545836, pasivo_corriente: 238369, pasivo_total: 325938, fondo_comercio: 196, intangibles: 7077, inmovilizado_material: 59774, existencias: 165457, clientes: 91114, proveedores: 143069, activos_contrato: null, pasivos_contrato: null, caja: 279460, deuda_financiera: 0, arrendamientos: 100711, patrimonio_neto: 445800, minoritarios: 0, reservas: 427251 },
];
const flujosHist = [
  { periodo: '2021', flujo_operativo: 4585, capex: 4954, pagos_arrendamientos: 4954, adquisiciones: 0, desinversiones: 0, dividendos: 0, recompras: 0, emision_acciones: 1757, intereses_en_financiacion: 403 },
  { periodo: '2022', flujo_operativo: 31631, capex: 6924, pagos_arrendamientos: 6590, adquisiciones: 0, desinversiones: 0, dividendos: 0, recompras: 0, emision_acciones: 3646, intereses_en_financiacion: 615 },
  { periodo: '2023', flujo_operativo: 107841, capex: 11875, pagos_arrendamientos: 8605, adquisiciones: 0, desinversiones: 0, dividendos: 0, recompras: 0, emision_acciones: 8998, intereses_en_financiacion: 749 },
  { periodo: '2024', flujo_operativo: 79124, capex: 47822, pagos_arrendamientos: 9142, adquisiciones: 0, desinversiones: 0, dividendos: 0, recompras: 59944, emision_acciones: 75340, intereses_en_financiacion: 3495 },
  { periodo: '2025', flujo_operativo: 341046, capex: 17917, pagos_arrendamientos: 16110, adquisiciones: 0, desinversiones: 0, dividendos: 134376, recompras: 30002, emision_acciones: 3949, intereses_en_financiacion: 1853 },
];

const A = {
  _estado: 'completa',
  financieros: {
    cuenta,
    // LTM jun-26 = 2025 − 1S25 + 1S26 [A1, A3]. El 1S25 es el publicado (55.627 + 81.258 de beneficio operativo); el 1S26 lleva
    // NIIF 18 (otros ingresos y gastos de explotación dentro del beneficio operativo). Amortización: 30.278 − 14.617 + 18.034.
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 2294466, ebitda: 605156, ebit: 571461, beneficio_neto: 432198, bpa: 11522, dpa: 5090, dpa_extraordinario: 0, fcf: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [
      { periodo: '2023-2024', descripcion: 'APR Factory (fábrica propia de los aparatos AGE-R: primera planta en julio de 2023 y segunda en mayo de 2024) y filiales comerciales en EE. UU., Japón, China y otros países, todas de creación propia: crecimiento orgánico, sin compras [A1].' },
      { periodo: '2026', descripcion: 'Filiales nuevas en Países Bajos e India (1S26) y fusión por absorción de APR Factory decidida el 9-sep-2026: sin efecto en las cuentas consolidadas [A3, A15].' },
    ],
    comentario: 'Las ventas pasaron de 259.146 M KRW en 2021 a 1.527.345 M en 2025: un crecimiento anual del 55,8 %, todo orgánico, y se duplicaron solo en 2025 (+111 %) [A1, A2]. En el 1S26 volvieron a crecer un 129 % (1.360.889 M) [A3]. El motor es la cosmética de la marca Medicube (de 214.291 M en 2023 a 1.077.126 M en 2025 y 1.100.824 M solo en el 1S26), vendida sobre todo en Amazon EE. UU. y, desde 2026, en Europa; los aparatos de belleza para el hogar (AGE-R) crecen menos (406.984 M en 2025, +30 %) [A1, A3]. El margen operativo subió del 5,5 % (2021) al 23,9 % (2025) y al 25,2 % en el 1S26, con un margen bruto del 76,6 % (2025) y del 78,2 % (1S26). El gasto variable que decide el margen es el comercial: publicidad (17,5 % de las ventas en 2025 y 21,1 % en el 1S26), comisiones de venta de plataformas (16,5 % y 18,1 %) y transporte (7,4 % y 7,0 %) [A1, A3]. Últimos doce meses: 2.294.466 M de ventas y 571.461 M de beneficio operativo (24,9 %).',
    ajustes: 'Cifras publicadas K-IFRS, sin ajustes de no recurrentes. Tres avisos. (1) Desde 2026 la empresa aplica por adelantado la NIIF 18: los otros ingresos y gastos de explotación entran en el beneficio operativo y 2025 se reexpresa a 361.391 M (frente a 365.521 M publicados) [A3, A5]; la serie de la tabla es la publicada. (2) 2022 se reexpresó en el informe de 2023 por la contabilidad de participadas e impuesto diferido: el beneficio de 2022 bajó en 992 M [A2]. (3) El resultado financiero de 2024 (+10.595 M) incluye ganancias de valoración de activos financieros; desde 2025 es casi nulo. El 2T26 lleva parte de la devolución de los aranceles IEEPA pagados en EE. UU. (≈ 20.000-25.000 M en total, contabilizada por partes desde el 2T26 y hasta 2027) [A14]. Pagos en acciones: opciones de empleados y directivos (ejercicios en 2024-2026).',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '3T24', ingresos: 174117, crecimiento_pct: 42.8, crecimiento_organico_pct: 42.8, ebitda: 32866, margen_ebitda_pct: 18.9, bpa: null, vs_consenso: null },
      { periodo: '4T24', ingresos: 244215, crecimiento_pct: 60.7, crecimiento_organico_pct: 60.7, ebitda: 45309, margen_ebitda_pct: 18.6, bpa: null, vs_consenso: null },
      { periodo: '1T25', ingresos: 266033, crecimiento_pct: 78.7, crecimiento_organico_pct: 78.7, ebitda: 62936, margen_ebitda_pct: 23.7, bpa: null, vs_consenso: null },
      { periodo: '2T25', ingresos: 327735, crecimiento_pct: 110.8, crecimiento_organico_pct: 110.8, ebitda: 88567, margen_ebitda_pct: 27.0, bpa: null, vs_consenso: null },
      { periodo: '3T25', ingresos: 385943, crecimiento_pct: 121.7, crecimiento_organico_pct: 121.7, ebitda: 103959, margen_ebitda_pct: 26.9, bpa: 1981, vs_consenso: null },
      { periodo: '4T25', ingresos: 547634, crecimiento_pct: 124.2, crecimiento_organico_pct: 124.2, ebitda: 140339, margen_ebitda_pct: 25.6, bpa: 2639, vs_consenso: null },
      { periodo: '1T26', ingresos: 593356, crecimiento_pct: 123.0, crecimiento_organico_pct: 123.0, ebitda: 161289, margen_ebitda_pct: 27.2, bpa: 3132, vs_consenso: null },
      { periodo: '2T26', ingresos: 767533, crecimiento_pct: 134.2, crecimiento_organico_pct: 134.2, ebitda: 199570, margen_ebitda_pct: 26.0, bpa: 3780, vs_consenso: null },
    ],
    ultima_presentacion: 'Ventas y beneficio operativo de cada trimestre de los avisos de resultados provisionales y de las presentaciones (2026 con NIIF 18) [A5-A9]; EBITDA = beneficio operativo + la amortización del semestre repartida a partes iguales (5.623 M por trimestre en 2024, 7.309 M en el 1S25, 7.831 M en el 2S25 y 9.017 M en 2026: estimación); BPA básico de FnGuide [A12]. No hemos encontrado el consenso previo de cada trimestre en una fuente primaria y lo dejamos en blanco. La presentación del 5-ago-2026 tuvo tres mensajes [A5, A16]: (1) récord de ventas (767.533 M, +134 %) y de beneficio operativo (190.553 M, 24,8 % de margen) con el exterior al 92 % de las ventas; (2) Norteamérica +265 % (376.251 M, el 49 % de las ventas: Amazon más Ulta, Target, Walmart y Nordstrom) y Europa +380 % (145.084 M, el 19 %, con la entrada en las tiendas online de Amazon de cinco países); (3) Corea −14,5 % por el cierre de negocios no principales (ropa Nerdy, fotomatones Photogray). Lo que se explicó a medias: el gasto en publicidad saltó al 22,2 % de las ventas en el 2T26 (15,9 % un año antes) y las comisiones al 18,6 % (14,4 %) [A3]. El 12-oct-2026, en una llamada privada con analistas, la empresa anticipó un margen operativo del 21-22 % para el 3T26 (el consenso esperaba ≈ 25 %) por el won fuerte (1.423 KRW/USD de media en el 3T frente a 1.502 en el 2T), la logística de Europa y los fletes aéreos [A13].',
    confianza: 'Media',
  },
  balance: {
    historico: balanceHist,
    vencimientos: [],
    liquidez: 'A 30-jun-2026: efectivo de 94.463 M, activos financieros a corto a coste amortizado de 20.097 M y a valor razonable de 174.708 M (289.268 M en total) más 49.111 M de activos financieros a largo (17.846 M a coste amortizado y 31.265 M a valor razonable); sin deuda financiera desde 2025; 84.908 M de arrendamientos [A3]. Después del cierre pagó 93.595 M del dividendo a cuenta (31-ago) [A11].',
    rating: 'Sin rating público',
    coste_deuda_pct: null,
    vida_media_anios: null,
    otros_pasivos: 'Pasivo neto por pensiones de 2.234 M e impuesto de sociedades a pagar de 90.365 M a 30-jun-2026 [A3]. Sin garantías relevantes ni litigios importantes declarados. Sanciones de los últimos dos años: dos suspensiones de publicidad del regulador de medicamentos y cosmética (MFDS) por anunciar cosméticos como si fueran medicamentos (2 meses en enero de 2025 y 4 meses en enero de 2026) y multas pequeñas de aduanas (66 M) y del supervisor financiero (8 M) [A3].',
    comentario: 'Balance de caja neta: 289.268 M de caja e inversiones a corto frente a cero deuda financiera a 30-jun-2026 [A3]. El patrimonio pasó de 66.001 M (2021) a 648.034 M (jun-2026) con el beneficio y la salida a bolsa (febrero de 2024). La señal a vigilar es el circulante: las existencias pasaron de 165.457 M a 369.884 M en seis meses (+124 %) y los clientes de 91.114 M a 191.599 M (+110 %), más rápido que las ventas (+129 % interanual, pero solo +40 % frente al 2S25); el circulante comercial (existencias + clientes − proveedores) subió de 113.502 M (7,4 % de las ventas de 2025) a 314.088 M (≈ 10 % de las ventas anualizadas del 2T26) [A1, A3]. Tiene explicación (más tiendas físicas en EE. UU. y Europa, stock en almacenes de Amazon y envío por barco en vez de avión), pero se ha comido el flujo operativo del semestre.',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujosHist,
    comentario: 'El flujo operativo pasó de 4.585 M en 2021 a 341.046 M en 2025 (118 % del beneficio) [A1, A2]. En el 1S26 fue de solo 86.404 M, un 33 % del beneficio del semestre (258.793 M), por la subida de existencias (−206.090 M) y clientes (−99.111 M) y 62.055 M de impuestos pagados [A3]. El capex es bajo: 1,2 % de las ventas en 2025 (17.917 M), salvo 2024 (47.822 M, 6,6 %) por la segunda planta de aparatos y la sede; la cosmética la fabrican otros (Cosmax, Hankook Cosmetics, Nordinary) [A1]. Los arrendamientos (oficinas, almacenes, tiendas) cuestan 16.110 M al año. Usos de la caja: recompras de 59.944 M en 2024 y 30.002 M en 2025, todas amortizadas; dividendos desde 2025 (134.376 M pagados en 2025 y 149.752 M en 2026: el final de 1.500 KRW y el a cuenta de 2.500 KRW) [A1, A10, A11]. La salida a bolsa aportó ≈ 74.329 M en 2024.',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'Hyundai Accounting (현대회계법인) desde 2024; antes Deloitte Anjin (2023 y anteriores)',
    anios_auditor: 2,
    opinion: 'Favorable (2025)',
    comentario: 'Hyundai Accounting auditó 2024 y 2025 con opinión favorable y sin cuestiones clave de auditoría declaradas en el informe anual [A1]. Deloitte Anjin auditó 2023 y llamó la atención sobre la reexpresión de 2022 (participadas e impuesto diferido; −992 M de beneficio) [A1, A2]. Criterios a vigilar: (1) la conversión en caja del 1S26 (33 % del beneficio) por la acumulación de existencias y clientes [A3]; (2) el reconocimiento de ventas a distribuidores y a cadenas de EE. UU. (Ulta, Target, Walmart, Costco) con devoluciones y descuentos, que crece frente a la venta directa online (el online bajó del 66,6 % de las ventas en 2025 al 61,4 % en el 1S26) [A1, A3]; (3) la NIIF 18 adoptada por adelantado en 2026 cambia el beneficio operativo y complica comparar con el consenso [A5]; (4) la publicidad: el regulador sancionó dos veces anuncios que presentaban cosméticos como medicamentos [A3].',
    senales: [
      { senal: 'Existencias y clientes que crecen más que las ventas (1S26)', nivel: 'Media', comentario: 'Existencias +124 % y clientes +110 % en seis meses; flujo operativo del 33 % del beneficio [A3].' },
      { senal: 'Reexpresión de 2022', nivel: 'Baja', comentario: 'Participadas e impuesto diferido; −992 M; detectada por el auditor entrante [A2].' },
      { senal: 'Adopción anticipada de la NIIF 18', nivel: 'Baja', comentario: 'Cambia la frontera del beneficio operativo; 2025 reexpresado a 361.391 M [A5].' },
      { senal: 'Sanciones del MFDS por publicidad', nivel: 'Baja', comentario: 'Suspensión de publicidad de 2 meses (2025) y 4 meses (2026) [A3].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Reparte desde 2025: 5.090 KRW por acción de 2025 (3.590 a cuenta y 1.500 final; 190.533 M, el 65,8 % del beneficio) y 2.500 KRW a cuenta de 2026 (93.595 M) [A1, A10, A11]. Antes recompraba y amortizaba: 59.944 M en 2024 y 30.002 M en 2025 (884.335 acciones amortizadas en enero de 2025 y 613.400 en agosto de 2025) [A1]. El plan de valor del 31-mar-2026 promete repartir al menos el 25 % del beneficio hasta 2026 con dividendos y recompras para amortizar (nota C).',
    adquisiciones: [],
    comentario: 'Asignación de capital sencilla: el negocio necesita poco capital (capex del 1-2 % de las ventas) y genera caja; la única inversión grande fue la fábrica de aparatos (2023-2024). No ha hecho compras. El ROE fue del 75 % en 2025 (FnGuide) con caja neta [A12]. El reto es devolver la caja: el reparto del 66 % de 2025 lo cumple; el circulante de 2026 frena el ritmo.',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'Cosmética y belleza (Medicube, Aprilskin, Forment)', descripcion: 'Cuidado de la piel de Medicube (cremas, sérums, almohadillas, colágeno, PDRN), Aprilskin y Forment (perfume y cuerpo)', tipo_resultado: null, historico: [{ periodo: '2023', ingresos: 214291, resultado: null }, { periodo: '2024', ingresos: 338518, resultado: null }, { periodo: '2025', ingresos: 1077126, resultado: null }] },
      { nombre: 'Aparatos de belleza para el hogar (Medicube AGE-R)', descripcion: 'Aparatos de microcorriente, radiofrecuencia y electroporación (Booster Pro), fabricados por APR Factory', tipo_resultado: null, historico: [{ periodo: '2023', ingresos: 216190, resultado: null }, { periodo: '2024', ingresos: 312643, resultado: null }, { periodo: '2025', ingresos: 406984, resultado: null }] },
      { nombre: 'Otros (Nerdy, Photogray, Glam.D)', descripcion: 'Ropa urbana, fotomatones y suplementos: negocios que se están reduciendo', tipo_resultado: null, historico: [{ periodo: '2023', ingresos: 93328, resultado: null }, { periodo: '2024', ingresos: 71593, resultado: null }, { periodo: '2025', ingresos: 43235, resultado: null }] },
    ],
    geografias: [
      { nombre: 'Norteamérica', peso_pct: 47.6 },
      { nombre: 'Asia (Japón, China, Sudeste Asiático)', peso_pct: 18.9 },
      { nombre: 'Europa', peso_pct: 16.8 },
      { nombre: 'Corea', peso_pct: 9.5 },
      { nombre: 'Otros (Oriente Medio, Latinoamérica)', peso_pct: 7.2 },
    ],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Peso de las ventas fuera de Corea', valor_anterior: '80 % (2025)', valor_actual: '92 % (2T26)', variacion: '+12 puntos', comentario: 'Pesos por región del 1S26: Norteamérica 647.849 M, Europa 228.856 M, Corea 128.606 M [A3, A5].' },
      { kpi: 'Ventas en Norteamérica', valor_anterior: '103.195 M (2T25)', valor_actual: '376.251 M (2T26)', variacion: '+264,6 %', comentario: 'Amazon más Ulta, Target, Walmart y Nordstrom; EE. UU. fue el 42 % de las ventas del 1T26 [A5, A6].' },
      { kpi: 'Ventas en Europa', valor_anterior: '30.204 M (2T25)', valor_actual: '145.084 M (2T26)', variacion: '+380,3 %', comentario: 'Entrada en las tiendas de Amazon de cinco países europeos [A5].' },
      { kpi: 'Publicidad sobre ventas', valor_anterior: '15,9 % (2T25)', valor_actual: '22,2 % (2T26)', variacion: '+6,3 puntos', comentario: 'Comisiones de venta del 14,4 % al 18,6 % [A3].' },
      { kpi: 'Ventas de aparatos AGE-R', valor_anterior: '90.049 M (2T25)', valor_actual: '111.887 M (2T26)', variacion: '+24,3 %', comentario: 'Pierden peso: del 27,5 % al 14,6 % de las ventas [A5].' },
    ],
  },
  fuentes: fA,
  huecos: [
    { seccion: 'trimestres', campo: 'Consenso previo de cada trimestre y BPA de 3T24-2T25', tipo: 'Complemento', intentos: '1) FnGuide (BPA trimestral solo desde el 3T25; consenso solo vigente); 2) presentaciones de la empresa (sin BPA ni consenso); 3) prensa (cifras sueltas)', decision: 'Omitido' },
    { seccion: 'financieros', campo: 'Flujo libre de los últimos doce meses', tipo: 'Complemento', intentos: '1) Informe semestral de 2026 (solo 1S26 y 1S25 del estado de flujos con el desglose del 1S26); 2) informe semestral de 2025 (no descargado); 3) FnGuide (sin flujos trimestrales)', decision: 'Omitido' },
  ],
};
guarda('A', A);

// ================================================================ B. Sector y competencia
const fB = [
  { id: 1, titulo: '사업보고서 2025: negocio, marcas, historia, fabricantes por encargo, canales (online 66,6 %), regiones y competencia', editor: 'APR / DART (FSS)', tipo: 'Primaria', fecha: '2026-03-23', url: DART('20260323001257') },
  { id: 2, titulo: '반기보고서 2026: ventas por línea, región y canal; cliente A con más del 10 % de las ventas; fabricantes por encargo', editor: 'APR / DART (FSS)', tipo: 'Primaria', fecha: '2026-08-14', url: DART('20260814002503') },
  { id: 3, titulo: '2026년 2분기 경영실적: ventas por región, nuevos canales (Target, Walmart, Nordstrom; Amazon en cinco países de Europa)', editor: 'APR', tipo: 'Primaria', fecha: '2026-08-05', url: `${IR}/APR_%EA%B2%BD%EC%98%81%EC%8B%A4%EC%A0%81_2Q26_KOR_vF.pdf` },
  { id: 4, titulo: "잘 팔렸지만 환율 하락에 '발목'…K뷰티, 3분기 눈높이 하향 (exportaciones de cosmética del 3T26: 3.379 M USD, +38,2 %, según la aduana coreana; efecto del won)", editor: 'Edaily', tipo: 'Prensa', fecha: '2026-10-19', url: NAVER('018', '0006391667') },
  { id: 5, titulo: "Ficha sectorial «Higiene personal y cosmética de gran consumo» (este repositorio): mercado mundial de belleza de ≈ 300.000 M EUR en 2025 según L'Oréal (2025 Universal Registration Document), ≈ 4 % anual, CR5 ≈ 40 %", editor: "Análisis propio / L'Oréal", tipo: 'Sectorial', fecha: '2026-10-14', url: 'sectores/higiene-cosmetica-2026-10-14.md' },
  { id: 6, titulo: "Fichas de d'Alba, Amorepacific, LG H&H, Silicon2, VT, Clio, Kolmar Korea, Cosmax, Classys, e.l.f., L'Oréal y Shiseido", editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/278470.KS' },
  { id: 7, titulo: '美 관세 발효…기업들 "직격탄" vs "영향 확인부터" (arancel combinado del 12,5 % a las importaciones coreanas desde el 24-jul-2026; APR mantiene precios y planes)', editor: 'News1', tipo: 'Prensa', fecha: '2026-07-24', url: NAVER('421', '0009077713') },
  { id: 8, titulo: "에이피알 '메디큐브' 美 코스트코 400곳 입점 (Costco EE. UU., ≈ 400 tiendas; número uno en tónicos de Amazon desde febrero de 2025)", editor: 'Hankyung', tipo: 'Prensa', fecha: '2026-10-19', url: NAVER('015', '0005344089') },
  { id: 9, titulo: "에이피알, '전략 시장' 올 유럽 매출 5000억 목표 (objetivo de 500.000 M de ventas en Europa en 2026)", editor: 'Financial News', tipo: 'Prensa', fecha: '2026-08-19', url: NAVER('014', '0005563644') },
  { id: 10, titulo: '커지는 중남미 시장, 높아진 관세 장벽…李 대통령 주목한 K-뷰티 숙제 (mercado latinoamericano y barreras arancelarias)', editor: 'Newsis', tipo: 'Prensa', fecha: '2026-09-28', url: NAVER('003', '0014217921') },
];
const B = {
  _estado: 'completa',
  historia: {
    resumen: 'APR nació el 10-oct-2014 en Seúl, fundada por Kim Byung-hoon (entonces de 26 años), con la marca Aprilskin (cosmética suave). En 2016 lanzó Medicube (cosmética «dermatológica»), y en 2017 diversificó hacia ropa (Nerdy), perfume (Forment) y fotomatones (Photogray) [B1]. En 2021 entró en los aparatos de belleza para el hogar con Medicube AGE-R, que en 2023 se hicieron virales con el Booster Pro, y montó su propia fábrica (APR Factory, 2023-2024) [B1]. Salió a bolsa en el KOSPI el 27-feb-2024. Desde 2024 la cosmética de Medicube (almohadillas «Zero Pore», colágeno, PDRN) despegó en Amazon EE. UU. y la empresa pasó de 722.754 M de ventas (2024) a 1.527.345 M (2025) y a 2,29 billones en los últimos doce meses; en 2026 entró en las cadenas físicas de EE. UU. y en Europa [B1, B2, B3].',
    hitos: [
      { anio: '2014', hito: 'Fundación y lanzamiento de Aprilskin [B1].' },
      { anio: '2016', hito: 'Lanzamiento de Medicube [B1].' },
      { anio: '2017', hito: 'Nerdy (ropa), Forment (perfume) y Photogray (fotomatones); nombre actual, APR [B1].' },
      { anio: '2021', hito: 'Aparatos de belleza Medicube AGE-R [B1].' },
      { anio: '2023', hito: 'Booster Pro y primera planta de APR Factory; premio al exportador de 50 M USD [B1].' },
      { anio: '2024', hito: 'Salida a bolsa en el KOSPI (27-feb); segunda planta; premio al exportador de 200 M USD [B1].' },
      { anio: '2025', hito: 'Ventas de más de 1,5 billones (+111 %); número uno en tónicos de Amazon EE. UU. con las almohadillas Zero Pore [B1, B8].' },
      { anio: '2026', hito: 'Ulta, Target, Walmart, Nordstrom y Costco en EE. UU.; Amazon en cinco países europeos; exterior al 92 % de las ventas (2T26) [B3, B8].' },
    ],
    confianza: 'Alta',
  },
  negocio: {
    descripcion: 'APR diseña y vende cosmética coreana y aparatos de belleza para el hogar con la marca Medicube (y, mucho menores, Aprilskin y Forment) [B1]. En 2025 la cosmética fue el 71 % de las ventas y los aparatos el 27 %; en el 2T26, el 84,5 % y el 14,6 % [B1, B3]. No fabrica la cosmética: la encarga a fabricantes coreanos (Cosmax, Hankook Cosmetics, Nordinary); los aparatos sí los fabrica, en APR Factory [B1, B2]. Vende sobre todo fuera de Corea (80 % en 2025, 92 % en el 2T26): Norteamérica es la mitad de las ventas (Amazon, Ulta, Target, Walmart, Costco), Europa el 19 % (Amazon en cinco países) y Asia el 16 % (Japón, China, Sudeste Asiático) [B3].',
    como_gana_dinero: 'Vende un producto barato de fabricar (coste de ventas del 23 % de las ventas en 2025 y del 22 % en el 1S26) a precio de marca, y gasta mucho en darlo a conocer y en venderlo: publicidad (influencers y anuncios en Amazon, TikTok y Meta: 21 % de las ventas en el 1S26), comisiones de las plataformas (18 %) y transporte (7 %) [B1, B2]. Lo que queda es un margen operativo del 24-25 %. Los aparatos (300-500 USD) atraen al cliente y venden cosmética «a juego». Necesita poco capital: capex del 1-2 % de las ventas y circulante del 7-10 %. El online fue el 66,6 % de las ventas de 2025 y el 61,4 % del 1S26, a medida que entra en tiendas [B1, B2]. Estacionalidad: el 4T (Black Friday, Navidad, días de ofertas de Amazon) es el trimestre fuerte.',
    clientes: 'Consumidoras de 20-40 años en EE. UU., Europa y Asia que buscan cuidado de la piel «con resultados» a precio medio (20-40 USD el producto) [B1]. Amazon es el canal principal y no se publica su peso: el informe semestral solo dice que un cliente (cliente A) superó el 10 % de las ventas (160.298 M en el 1S26, el 11,8 %) [B2]. Con la venta directa en Amazon, el cliente final es la consumidora; con las cadenas (Ulta ≈ 1.400 tiendas, Target ≈ 1.500, Walmart ≈ 3.000, Costco ≈ 400 y CVS ≈ 3.000 antes de fin de año), el poder de negociación pasa al distribuidor [B3, B8]. Poder de precios: limitado; mantuvo precios tras el arancel del 12,5 % [B7].',
    confianza: 'Media',
  },
  sector: {
    definicion: "El mercado relevante es el mundial de belleza (cuidado de la piel, pelo, maquillaje, perfume e higiene) a precio neto de fabricante, que L'Oréal cifra en ≈ 300.000 M EUR en 2025, con crecimiento previsto de ≈ 4 % anual (ficha sectorial del repositorio) [B5]; los aparatos de belleza para el hogar son un nicho dentro. La cosmética coreana es el segmento que más crece: las exportaciones coreanas de cosmética crecieron un 18,5 %, un 30,8 % y un 38,2 % en los tres primeros trimestres de 2026 (3.379 M USD en el 3T26, récord), con EE. UU. y Europa a la cabeza [B4]. Usamos el mercado mundial de belleza como mercado final (prudente y amplio) y las exportaciones coreanas como indicador de la moda.",
    tamano: `≈ 300.000 M EUR en 2025 (≈ ${Math.round((300000 * EURKRW) / 1e6)} billones de KRW a ${EURKRW.toLocaleString('es-ES')} KRW/EUR) [B5]; exportaciones coreanas de cosmética de 3.379 M USD solo en el 3T26 [B4]`,
    unidad_serie: 'millones de EUR',
    serie: [
      { anio: '2021', tamano: 244000 }, { anio: '2025', tamano: 300000 }, { anio: '2026e', tamano: 312000 }, { anio: '2027e', tamano: 324500 }, { anio: '2028e', tamano: 337500 }, { anio: '2030e', tamano: 365000 },
    ],
    tcac_historico_pct: 5.3,
    tcac_previsto_pct: 4.0,
    cr5_pct: 40.0,
    estructura: 'Moderadamente concentrada arriba y muy fragmentada por debajo de los diez primeros; las marcas coreanas independientes ganan cuota en online y ahora en tiendas',
    drivers: [
      { driver: 'Moda de la cosmética coreana en EE. UU. y Europa', efecto: '+', horizonte: 'Cíclico', evidencia: 'Exportaciones coreanas de cosmética +38,2 % en el 3T26 [B4]; APR: Norteamérica +265 % y Europa +380 % en el 2T26 [B3].' },
      { driver: 'Venta en plataformas y redes (Amazon, TikTok Shop)', efecto: '+', horizonte: 'Estructural', evidencia: 'Permiten a una marca coreana llegar a todo el mundo sin red física; el online es el 61-67 % de las ventas de APR [B1, B2].' },
      { driver: 'Fabricantes por encargo coreanos (Cosmax, Kolmar)', efecto: '+/−', horizonte: 'Estructural', evidencia: 'Bajan la barrera de entrada: cualquier marca puede lanzar productos parecidos en meses [B1].' },
      { driver: 'Aranceles de EE. UU. y tipo de cambio', efecto: '−', horizonte: 'Cíclico', evidencia: 'Arancel combinado del 12,5 % desde el 24-jul-2026 [B7]; el won fuerte recorta las ventas en KRW (1 punto de margen por cada 5 % de bajada del dólar, según Shinyoung) [B4].' },
      { driver: 'Sustitución de marcas: la moda pasa', efecto: '−', horizonte: 'Estructural', evidencia: "VT perdió margen cuando su producto estrella dejó de crecer (margen operativo del 8 % hoy) [B6]; Dr.Jart (Estée Lauder) pierde dinero seis años después de su compra (nota de d'Alba del repositorio)." },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 5, justificacion: "Cientos de marcas coreanas compiten en Amazon con productos parecidos (d'Alba, Beauty of Joseon, Anua, Torriden, COSRX, Skin1004) [B6]." },
      { fuerza: 'Poder de los clientes', intensidad: 4, justificacion: 'Amazon (el «cliente A», ≈ 12 % de las ventas solo como cliente directo) y las cadenas de EE. UU. controlan el acceso a la consumidora y cobran por visibilidad [B2].' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Varios fabricantes por encargo compiten por los pedidos; el margen bruto ha subido al 78 % [B2].' },
      { fuerza: 'Amenaza de entrada', intensidad: 4, justificacion: 'Con fabricantes por encargo y redes sociales, lanzar una marca cuesta poco; los aparatos (fábrica y certificaciones) son algo más difíciles de copiar [B1].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: "Las marcas globales (L'Oréal, Estée Lauder), la dermocosmética y los tratamientos de clínica compiten por el mismo gasto." },
    ],
    ciclo: { posicion: 'Expansión', comentario: 'La cosmética es defensiva en volumen (en 2009 y 2020 cayó poco) [B5], pero la cosmética coreana fuera de Corea vive una fase de moda con crecimientos del 30-40 % en las exportaciones y del 100-400 % en algunas marcas [B4]. APR no ha vivido como cotizada un ciclo bajista del sector: el más cercano fue la caída de China en 2017-2022, que hundió a Amorepacific y LG H&H. Indicadores: exportaciones mensuales de cosmética coreana (aduanas), rankings de Amazon y tipo de cambio.' },
    regulacion: 'Cosmética: MFDS en Corea (APR fue sancionada dos veces por publicidad engañosa); en EE. UU., la ley MoCRA (registro y farmacovigilancia) y la FDA para protectores solares y aparatos de radiofrecuencia; en la UE, el reglamento 1223/2009 [B5]. Aranceles de EE. UU.: 12,5 % combinado (nación más favorecida más sección 301) desde el 24-jul-2026, después de la anulación de los aranceles IEEPA, que se devuelven [B7].',
    tendencias: 'Tres tendencias. (1) La cosmética coreana pasa de moda a categoría: entra en cadenas físicas (Ulta, Target, Walmart, Costco) y en Europa, y deja de depender solo de Amazon [B3, B8]. (2) Las ventas se deciden en redes y plataformas: TikTok y Amazon premian a la marca que más invierte en contenido y anuncios, lo que sube el gasto de todas (la publicidad de APR pasó del 16 % al 22 % de las ventas en un año). (3) Los grandes compran marcas coreanas (Estée Lauder-Dr.Jart, Amorepacific-COSRX, L\'Oréal-Dr.G), con resultados desiguales cuando pasa la moda. La IA entra en la recomendación de productos (agentes de compra): un riesgo para las marcas que viven del marketing.',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 0.5,
    posicion: 'La marca coreana independiente más grande y la que más crece: 2,29 billones de KRW de ventas en los últimos doce meses (≈ 1.720 M USD), el ≈ 0,5 % del mercado mundial de belleza [B5]. Número uno en tónicos de Amazon EE. UU. con las almohadillas Zero Pore desde febrero de 2025 [B8] y, por su tamaño, por delante de LG H&H y cerca de Amorepacific en beneficio operativo [B6].',
    competidores: [],
    foso: {
      veredicto: 'Sin foso',
      tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'Reseñas y rankings en Amazon ayudan a la marca líder, pero no impiden que otra escale.' },
        { fuente: 'Costes de cambio', puntuacion: 1, evidencia: 'Cambiar de crema no cuesta nada; el aparato (300-500 USD) fideliza algo a la cosmética «a juego».' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'Marca Medicube con productos líderes en Amazon EE. UU. y aparatos con tecnología propia (centro de I+D de aparatos) [B1, B8].' },
        { fuente: 'Ventaja en costes', puntuacion: 2, evidencia: 'Escala de marketing y fábrica propia de aparatos; pero la publicidad sube como porcentaje de las ventas [B2].' },
        { fuente: 'Escala eficiente', puntuacion: 1, evidencia: 'Mercado enorme y fragmentado.' },
      ],
    },
    amenazas: 'Lo más probable es la competencia de otras marcas coreanas por el mismo espacio en Amazon, TikTok y las cadenas: entrar cuesta poco con fabricantes por encargo y el marketing decide (probabilidad alta, impacto en margen: la publicidad ya sube). Segunda: que la moda de la cosmética coreana se enfríe en EE. UU., donde está la mitad de las ventas (probabilidad media en 3-5 años, impacto alto). Tercera: Amazon, que puede subir comisiones o cambiar el algoritmo (media). Cuarta: aranceles y won fuerte, que se comen margen en cada trimestre.',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Lo que toca las cifras: (1) la publicidad y las afirmaciones de eficacia (dos sanciones del MFDS por presentar cosméticos como medicamentos; en EE. UU., la FTC y las demandas colectivas) [B2]; (2) la seguridad de producto en aparatos eléctricos de uso facial (certificaciones, retiradas); (3) gobierno: el fundador controla el 35 % con sus relacionados y el consejo tiene mayoría de independientes. Impacto ambiental bajo: envases y transporte aéreo.',
    controversias: 'Suspensiones de publicidad del MFDS en enero de 2025 (2 meses) y enero de 2026 (4 meses); multa de aduanas de 66 M por control de cambios (2025) [B2]. En octubre de 2026, posible revisión de la KRX por la comunicación selectiva de la previsión del 3T26 a analistas (nota D).',
    confianza: 'Baja',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'esg', campo: 'Calificaciones ESG', tipo: 'Complemento', intentos: '1) KCGS (sin calificación encontrada en la búsqueda); 2) MSCI (sin ficha pública); 3) informe anual 2025 (no menciona calificaciones)', decision: 'Omitido' },
    { seccion: 'competencia', campo: 'Ventas y margen de Goodai Global (Beauty of Joseon, Tirtir, Skin1004) y Anua', tipo: 'Complemento', intentos: '1) No cotizan; 2) DART, informes de auditoría (no leídos por tiempo); 3) prensa (cifras dispersas)', decision: 'Omitido' },
  ],
};
// Competidores con las cifras de los últimos doce meses de Yahoo (ventas en millones de KRW al cambio del 19-oct).
const fxDe = (c) => (c === 'USD' ? USDKRW : c === 'JPY' ? JPYKRW : c === 'EUR' ? EURKRW : 1);
const raw = Object.fromEntries(compsRaw.map((c) => [c.s, c]));
const r1 = (x) => (x == null || !isFinite(x) ? null : Math.round(x * 10) / 10);
const r2 = (x) => (x == null || !isFinite(x) ? null : Math.round(x * 100) / 100);
const comp = (s, nombre, pais, comentario) => { const c = raw[s]; return { nombre, pais, ticker: s, ingresos: Math.round((c.rev * fxDe(c.fcur)) / 1e6), cuota_pct: null, margen_ebit_pct: r1(c.opM * 100), comentario }; };
B.competencia.competidores = [
  comp('483650.KS', "d'Alba Global", 'Corea', 'Marca coreana más pequeña con el mismo modelo (fabricación por encargo, Amazon y Costco en EE. UU.); un cuarto de las ventas de APR [B6].'),
  comp('090430.KS', 'Amorepacific', 'Corea', 'Grupo grande (Sulwhasoo, Laneige, COSRX); se recupera fuera de China; margen muy inferior [B6].'),
  comp('051900.KS', 'LG H&H', 'Corea', 'Cosmética de lujo dependiente de China; ventas planas [B6].'),
  comp('257720.KQ', 'Silicon2 (Stylekorean)', 'Corea', 'Distribuidor de marcas coreanas en EE. UU. y Europa; compite por el mismo estante [B6].'),
  comp('018290.KQ', 'VT Cosmetics', 'Corea', 'Marca coreana cuyo producto estrella (Reedle Shot) perdió tirón: el ejemplo del riesgo de moda [B6].'),
  { nombre: 'Goodai Global (Beauty of Joseon, Tirtir, Skin1004)', pais: 'Corea', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'No cotiza; agrupa varias de las marcas coreanas más vendidas en Amazon.' },
  comp('ELF', 'e.l.f. Beauty', 'EE. UU.', 'Cosmética de masas en EE. UU., el mismo cliente y los mismos canales (Ulta, Target, Walmart, Amazon) [B6].'),
  comp('214150.KQ', 'Classys', 'Corea', 'Aparatos de estética para clínicas (Shurink); referencia de margen para la parte de aparatos [B6].'),
];
guarda('B', B);

// ================================================================ C. Equipo y gobierno
const fC = [
  { id: 1, titulo: '사업보고서 2025: consejo, comisiones, directivos, remuneración de consejeros, accionistas y opciones', editor: 'APR / DART (FSS)', tipo: 'Primaria', fecha: '2026-03-23', url: DART('20260323001257') },
  { id: 2, titulo: '반기보고서 2026: accionistas a 30-jun-2026 (Kim Byung-hoon 31,93 %, con relacionados 34,81 %; NPS), empleados (751), directivos', editor: 'APR / DART (FSS)', tipo: 'Primaria', fecha: '2026-08-14', url: DART('20260814002503') },
  { id: 3, titulo: '정기주주총회결과 (junta del 31-mar-2026: votos de cada punto; límite de remuneración aprobado con el 71,2 % de los votos emitidos)', editor: 'APR / KRX', tipo: 'Primaria', fecha: '2026-03-31', url: DART('20260331804213') },
  { id: 4, titulo: '기업가치 제고 계획 (plan de valor: reparto de al menos el 25 % del beneficio con dividendos y recompras para amortizar)', editor: 'APR / KRX', tipo: 'Primaria', fecha: '2026-03-31', url: DART('20260331804449') },
  { id: 5, titulo: '주식등의 대량보유상황보고서 de Fidelity Management & Research (5,01 %)', editor: 'DART (FSS)', tipo: 'Primaria', fecha: '2026-08-06', url: DART('20260806000334') },
  { id: 6, titulo: 'Accionistas principales, capital flotante (64,95 %) y extranjeros (38,37 %) a 16-oct-2026; objetivos de 22 casas', editor: 'FnGuide (Naver WiseReport)', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://navercomp.wisereport.co.kr/v2/company/c1010001.aspx?cmp_cd=278470' },
  { id: 7, titulo: '기업지배구조 보고서 (informe de gobierno corporativo de 2025)', editor: 'APR / KRX', tipo: 'Primaria', fecha: '2026-05-29', url: DART('20260529801251') },
  { id: 8, titulo: '[단독] 미공개정보 샜나...에이피알, 비공개 그룹콜 10분 뒤 주가 급락 (llamada privada a analistas del 12-oct; la KRX estudia una posible infracción de la norma de comunicación equitativa)', editor: 'Maeil Business (매경)', tipo: 'Prensa', fecha: '2026-10-16', url: NAVER('024', '0000108959') },
];
const C = {
  _estado: 'completa',
  directivos: {
    equipo: [
      { nombre: 'Kim Byung-hoon', cargo: 'Fundador y primer ejecutivo (representative director)', desde: '2014', participacion_pct: 31.93, trayectoria: 'Fundó la empresa en 2014, nada más terminar la universidad, y la dirige desde entonces; nacido en noviembre de 1988. Tiene 11.953.660 acciones (31,93 %) y un 34,81 % con sus relacionados [C2, C3].' },
      { nombre: 'Shin Jae-ha', cargo: 'Vicepresidente y director financiero (CFO), consejero ejecutivo', desde: '2016', participacion_pct: 1.22, trayectoria: 'En APR desde junio de 2016; consejero desde 2023, reelegido en marzo de 2026. Tiene 457.310 acciones [C2, C3].' },
    ],
    historial_guidance: [
      { anio: '2026', guia: 'Europa: 500.000 M de ventas en 2026 (agosto de 2026) [nota B: 9]', real: '1S26: 228.856 M (46 % del objetivo)', cumplida: 'Parcial' },
      { anio: '3T26', guia: 'Margen operativo del 21-22 % (llamada privada a analistas del 12-oct-2026) [C8]', real: 'Pendiente (30-oct-2026)', cumplida: 'Parcial' },
      { anio: '2026', guia: 'Devolución de aranceles IEEPA de ≈ 20.000-25.000 M, contabilizada por partes desde el 2T26 (mayo de 2026) [nota A: 14]', real: 'En curso', cumplida: 'Parcial' },
    ],
    comentario: 'La dirige su fundador desde 2014, con un equipo joven (751 empleados en jun-2026) que ha multiplicado las ventas por nueve en cuatro años [C2]. La empresa no da una guía anual de ventas: comunica objetivos sueltos (Europa) y previsiones a analistas. Como cotizada ha cumplido de sobra: cada trimestre desde 2025 ha crecido más del 100 %. El tropiezo reciente es de forma: el 12-oct-2026 anticipó en una llamada privada a analistas un margen del 3T26 por debajo de lo esperado, la acción empezó a caer diez minutos después, cerró el día con −5,3 % y cayó un 19,6 % al día siguiente, y la prensa habla de posible filtración de información [C8]. Riesgo de persona clave: la estrategia, la marca y el control dependen del fundador (37 años); no hay plan de sucesión publicado.',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Kim Hyung-yi', cargo: 'Presidente del consejo, consejero independiente', tipo: 'Independiente', desde: '2023', comisiones: 'Auditoría (presidente)' },
      { nombre: 'Kim Byung-hoon', cargo: 'Consejero ejecutivo y primer ejecutivo', tipo: 'Ejecutivo', desde: '2014', comisiones: null },
      { nombre: 'Shin Jae-ha', cargo: 'Consejero ejecutivo (CFO)', tipo: 'Ejecutivo', desde: '2023', comisiones: null },
      { nombre: 'Noh Yu-ri', cargo: 'Consejera independiente (auditora de cuentas)', tipo: 'Independiente', desde: '2023', comisiones: 'Auditoría; Retribución' },
      { nombre: 'Oh Ju-dong', cargo: 'Consejero independiente', tipo: 'Independiente', desde: '2024', comisiones: 'Auditoría; Transparencia' },
    ],
    presidente_ceo_separados: true,
    presidente_ejecutivo: false,
    consejero_coordinador: false,
    una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false,
    variable_ligado_rentabilidad: false,
    auditoria_independiente: true,
    insiders_sin_operaciones: false,
    accionista_control: true,
    presidente_vinculado_control: false,
    cambios_cupula_24m: 0,
    voto_remuneracion_pct: 71.2,
    voto_remuneracion_contra_pct: 28.8,
    voto_remuneracion_contra_libre_pct: 28.8,
    voto_cupula_pct: 98.7,
    remuneracion_ceo: 4100,
    remuneracion: 'El primer ejecutivo cobró 4.100 M KRW en 2025: 2.000 M fijos y 2.100 M de bonus ligado al beneficio operativo, no a la rentabilidad sobre el capital [C1]. El directivo mejor pagado de 2025 fue otro (18.201 M), casi todo por ejercer opciones sobre acciones. En Corea la junta vota un límite global para los consejeros: en marzo de 2026 lo aprobó solo el 71,2 % de los votos emitidos, con un 28,8 % en contra; el fundador y sus relacionados no votaron ese punto (los votos a favor fueron el 34,6 % de las acciones, frente al ≈ 65 % que votó los demás), así que el 28,8 % es el rechazo del capital libre presente [C3].',
    accionistas: [
      { nombre: 'Kim Byung-hoon (fundador) y relacionados', pct: 34.81, tipo: 'Fundador; accionista de control', variacion: '31,93 % a título personal (11.953.660 acciones) [C2]' },
      { nombre: 'Servicio Nacional de Pensiones (NPS)', pct: 9.0, tipo: 'Institucional (Corea)', variacion: 'Declaración de más del 5 % [C2, C6]' },
      { nombre: 'Fidelity Management & Research (FMR)', pct: 5.01, tipo: 'Institucional (EE. UU.)', variacion: 'Pasó del 5 % el 17-jul-2026 [C5]' },
      { nombre: 'Capital flotante restante (extranjeros 38,37 % del total)', pct: 51.18, tipo: 'Flotante', variacion: 'Flotante del 64,95 % según FnGuide; 37.438.155 acciones emitidas, sin autocartera [C6]' },
    ],
    insiders: [],
    control_y_defensas: 'El fundador controla con el 34,81 % junto a sus relacionados y no ha vendido como cotizado según las declaraciones revisadas [C2]. Una acción, un voto; sin blindajes. Tres de los cinco consejeros son independientes, uno de ellos preside el consejo, y forman la comisión de auditoría; en 2026 se añadió una comisión de retribución y otra de transparencia y se reforzó la elección separada de consejeros de auditoría (los votos del control se limitan) [C3, C7]. Los bloqueos de la salida a bolsa vencieron en 2024-2025.',
    alertas: [
      'Comunicación selectiva a analistas de la previsión del 3T26 (12-oct-2026); la KRX estudia si incumplió la norma de comunicación equitativa [C8].',
      'Un 28,8 % del capital libre votó contra el límite de remuneración en marzo de 2026 [C3].',
      'Bonus del primer ejecutivo ligado al beneficio operativo, no a la rentabilidad [C1].',
    ],
    confianza: 'Media',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'Operaciones de consejeros y directivos de los últimos 12 meses', tipo: 'Complemento', intentos: '1) DART, búsqueda de 임원ㆍ주요주주특정증권등소유상황보고서 (no hecha por tiempo); 2) FnGuide (solo accionistas principales); 3) prensa (sin ventas del fundador)', decision: 'Omitido; insiders_sin_operaciones en false por no haberlo comprobado' },
  ],
};
guarda('C', C);

// ================================================================ D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de 278470.KS, del KOSPI (^KS11) y del ETF TIGER 화장품 (228790.KS); cierres, betas y volatilidad; cierre del 19-oct-2026 (331.500 KRW, regularMarketPrice)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/278470.KS' },
  { id: 2, titulo: 'Consenso anual 2026e-2028e y trimestral (media de tres meses)', editor: 'FnGuide (Naver WiseReport)', tipo: 'Analistas', fecha: '2026-10-16', url: 'https://navercomp.wisereport.co.kr/v2/company/c1050001.aspx?cmp_cd=278470' },
  { id: 3, titulo: 'Objetivos y recomendaciones de 22 casas (agosto-octubre de 2026): KIS, Hana, NH, Meritz, Shinhan, Kyobo, Shinyoung, KB, DB, SK, Hyundai Motor, Daol, Sangsangin, Kiwoom, Eugene, LS, BNK, Hanwha, Samsung, IBK, Heungkuk, Yuanta', editor: 'FnGuide (Naver WiseReport)', tipo: 'Analistas', fecha: '2026-10-16', url: 'https://navercomp.wisereport.co.kr/v2/company/c1010001.aspx?cmp_cd=278470' },
  { id: 4, titulo: 'Fichas de comparables (precio, capitalización, valor empresa, ventas, EBITDA, estimaciones de BPA) y tipos de cambio KRW=X (1.331,28), JPYKRW=X (8,38) y EURKRW=X (1.492,4)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/483650.KS' },
  { id: 5, titulo: 'Long-Term Government Bond Yields: 10-year for Korea (IRLTLT01KRM156N), septiembre de 2026: 4,454 %', editor: 'OECD vía FRED', tipo: 'Datos de mercado', fecha: '2026-10-01', url: 'https://fred.stlouisfed.org/series/IRLTLT01KRM156N' },
  { id: 6, titulo: 'Implied ERP by month: octubre de 2026, 4,20 %', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 7, titulo: '에이피알, 상장 이후 최대 낙폭…목표가 줄하향 19.6%↓ (13-oct: SK 560.000→480.000, Daol 560.000→500.000, Hyundai Motor 550.000→510.000, Meritz 550.000→520.000, Shinhan 540.000→510.000)', editor: 'News1', tipo: 'Prensa', fecha: '2026-10-13', url: NAVER('421', '0009225467') },
  { id: 8, titulo: '급락에도 "목표가 52만원"…한국투자證 "분명한 과매도" (PER de los próximos 12 meses de ≈ 14 veces, el más bajo del año)', editor: 'Korea Economic TV', tipo: 'Prensa', fecha: '2026-10-15', url: NAVER('215', '0001269240') },
  { id: 9, titulo: '"너무 빠진 것 아니냐"…증권가 전망에 주가 20% \'와르르\'', editor: 'Hankyung', tipo: 'Prensa', fecha: '2026-10-14', url: NAVER('015', '0005342253') },
  { id: 10, titulo: '원화 강세에 흔들린 화장품주…에이피알 한달 새 21% 뚝 (septiembre de 2026)', editor: 'Seoul Economic Daily', tipo: 'Prensa', fecha: '2026-09-30', url: NAVER('011', '0004666992') },
];
const blend = (e0, e1) => 0.2 * e0 + 0.8 * e1; // próximos 12 meses desde el 19-oct: 2,4 meses de 2026 y 9,6 de 2027
const nombres = { '483650.KS': ["d'Alba Global", 'KR'], '090430.KS': ['Amorepacific', 'KR'], '051900.KS': ['LG H&H', 'KR'], '257720.KQ': ['Silicon2', 'KR'], '018290.KQ': ['VT', 'KR'], '237880.KQ': ['Clio Cosmetics', 'KR'], '161890.KS': ['Kolmar Korea', 'KR'], '192820.KS': ['Cosmax', 'KR'], '214150.KQ': ['Classys', 'KR'], ELF: ['e.l.f. Beauty', 'US'], 'OR.PA': ["L'Oréal", 'FR'], '4911.T': ['Shiseido', 'JP'] };
const comparables = compsRaw.filter((c) => nombres[c.s]).map((c) => {
  const fxP = fxDe(c.cur); const fxF = fxDe(c.fcur);
  const e0 = c.et.find((t) => t.p === '0y'); const e1 = c.et.find((t) => t.p === '+1y');
  const epsN = e0?.eps && e1?.eps ? blend(e0.eps, e1.eps) : null;
  const revN = e0?.rev && e1?.rev ? blend(e0.rev, e1.rev) : null;
  return {
    nombre: nombres[c.s][0], ticker: c.s, pais: nombres[c.s][1],
    capitalizacion: Math.round((c.mcap * fxP) / 1e6),
    ev_ventas: r2(c.evRev), ev_ebitda_ltm: r1(c.evEbitda), ev_ebitda_ntm: null,
    per_ntm: epsN ? r1((c.price * (fxP / fxF)) / epsN) : null,
    crecimiento_pct: revN && c.rev ? r1((revN / c.rev - 1) * 100) : null,
    margen_ebitda_pct: c.ebitda && c.rev ? r1((c.ebitda / c.rev) * 100) : null,
    roic_pct: null,
    dn_ebitda: c.ebitda ? r2((c.debt - c.cash) / c.ebitda) : null,
    fcf_yield_pct: c.fcf != null ? r1(((c.fcf * fxF) / (c.mcap * fxP)) * 100) : null,
  };
});
const pers = comparables.map((c) => c.per_ntm).filter((x) => x != null).sort((a, b) => a - b);
const medianaPER = pers.length % 2 ? pers[(pers.length - 1) / 2] : (pers[pers.length / 2 - 1] + pers[pers.length / 2]) / 2;
const cl = Object.fromEntries(bolsa.cierres_ejercicio.map((x) => [x.anio, x.precio_cierre]));
const apr = raw['278470.KS'];
const D = {
  _estado: 'completa',
  identificacion: {
    nombre: 'APR Co., Ltd.', nombre_corto: 'APR', ticker: '278470', isin: 'KR7278470000', mercado: 'KOSPI (Korea Exchange)', indice_referencia: 'KOSPI',
    pais: 'Corea del Sur', pais_iso: 'KR', sector: 'Consumer Staples', industria: 'Personal Care Products', sede: 'Seúl (Lotte World Tower, piso 36, Songpa-gu)', fundacion: '2014', empleados: 751, web: 'https://apr-in.com',
    precio: PRECIO, fecha_precio: '2026-10-19', acciones: 37.44, capitalizacion_publicada: Math.round(apr.mcap / 1e6), free_float_pct: 64.95,
    max_52s: bolsa.identificacion.max_52s, min_52s: bolsa.identificacion.min_52s, volumen_medio_diario: `≈ ${bolsa.volumen_3m.importe_dia_millones.toLocaleString('es-ES')} M KRW/día (3 meses; ${bolsa.volumen_3m.acciones_dia.toLocaleString('es-ES')} acciones)`, proximos_resultados: '2026-10-30',
  },
  consenso: {
    guidance: 'La empresa no publica una guía anual de ventas ni de beneficio. Objetivos sueltos: 500.000 M de ventas en Europa en 2026 [nota B: 9]; margen operativo del 21-22 % en el 3T26, comunicado a analistas en una llamada privada el 12-oct-2026 [nota C: 8]. Plan de valor: reparto de al menos el 25 % del beneficio [nota C: 4]. Resultados del 3T26 el 30-oct-2026 con conferencia a las 10:00 KST.',
    estimaciones: [
      { periodo: '2026e', ingresos: 3082740, ebitda: null, ebit: 742940, bpa: 15212, dpa: 5506, fuente: 'FnGuide, media de 3 meses a 16-oct-2026 [D2]' },
      { periodo: '2027e', ingresos: 4257900, ebitda: null, ebit: 1044190, bpa: 21394, dpa: null, fuente: 'FnGuide [D2]' },
      { periodo: '2028e', ingresos: 5302460, ebitda: null, ebit: 1320830, bpa: 27194, dpa: null, fuente: 'FnGuide [D2]' },
    ],
    recomendaciones: { n_analistas: 22, comprar: 22, mantener: 0, vender: 0, po_medio: 520000, po_min: 410000, po_max: 570000 },
    revisiones: 'A la baja en octubre. Tras la llamada del 12-oct, siete casas recortaron el objetivo entre el 13 y el 14-oct: SK 560.000→480.000, Daol 560.000→500.000, Hyundai Motor 550.000→510.000, Meritz 550.000→520.000, Shinhan 540.000→510.000, NH 540.000→500.000 y Hana 510.000→410.000 [D3, D7]; KIS mantuvo 520.000 y habló de «sobreventa clara» (PER de los próximos doce meses de ≈ 14 veces) [D8]. El consenso de beneficio operativo del 3T26 bajó de 196.000 M a ≈ 181.900 M en un mes (ventas de 784.640 M) [D2]. Todas las recomendaciones siguen en comprar; el objetivo medio de FnGuide es de 520.000 KRW (Yahoo: 505.185 con 27 analistas) [D3, D4].',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    ...bolsa.bolsa,
    posicion_corta_pct: null,
    comentario: `La acción salió a bolsa el 27-feb-2024 y cerró 2024 en 50.000 KRW (ajustado por el desdoblamiento 5:1) y 2025 en 231.000 KRW (+362 %) [D1]. Llegó a 475.000 KRW el 1-sep-2026 y hoy cotiza a 331.500 (cierre del 19-oct), un 30 % por debajo del máximo y un 62 % por encima del mínimo de 52 semanas (204.000, nov-2025) [D1]. En el año sube un ≈ 43 % frente al +34,5 % del KOSPI (empujado por los fabricantes de chips) y el +23,1 % del ETF de cosmética coreana; a un año sube un ≈ 38 % frente al +51 % del KOSPI (datos de Yahoo al 16-oct, llevados al cierre del 19-oct) [D1]. Es muy volátil (66 % anual): en 2026 ha tenido meses de +47 % (agosto, por el 2T26) y de −21 % (septiembre, won fuerte), y el 13-oct cayó un 19,6 %, la mayor caída diaria desde que cotiza [D7]. A 331.500 KRW cotiza a ${r1(PRECIO / 11522)} veces el BPA de los últimos doce meses y a ${r1(PRECIO / 15212)} veces el BPA de 2026e del consenso.`,
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: ['2024', '2025'].map((a) => ({ anio: a, precio_cierre: cl[a], ev_ebitda_ntm: null, per_ntm: null, excluir: a === '2024' })),
    comentario: 'Solo hay dos cierres de ejercicio como cotizada: 2024 (50.000 KRW, 17,7 veces el BPA de 2024 y 6,5 veces el BPA real de 2025) y 2025 (231.000 KRW, 29,9 veces el BPA de 2025 y ≈ 16 veces el de 2026 en nuestra estimación) [D1]. El PER adelantado de 2024 (6,5x) mide la sorpresa del crecimiento de 2025 (el BPA pasó de 2.819 a 7.718 KRW, +174 %) más que una valoración: lo excluimos como BPA atípico y lo decimos en el objetivo a 12 meses. Con dos años de historia no hay mediana útil: el método aplica la regla de historia corta.',
    confianza: 'Media',
  },
  comparables: {
    criterio: "Marcas y grupos de cosmética coreanos cotizados (d'Alba, VT, Clio, Amorepacific, LG H&H), el distribuidor Silicon2, los fabricantes por encargo (Kolmar Korea, Cosmax), Classys (aparatos de estética) y tres referencias fuera de Corea (e.l.f. Beauty en EE. UU., L'Oréal y Shiseido). PER de los próximos 12 meses = precio ÷ (0,2 × BPA 2026e + 0,8 × BPA 2027e) de Yahoo; en e.l.f., ejercicios a marzo de 2027 y 2028. EV/EBITDA de los próximos 12 meses en blanco: Yahoo no da un EBITDA futuro homogéneo.",
    empresas: comparables,
    comentario: `La cosmética coreana cotiza en dos grupos: los grupos maduros, los fabricantes y las marcas cuyo producto estrella ya pasó (VT, Clio, Silicon2, Classys) a 8-10 veces el BPA de los próximos doce meses, y los que tienen crecimiento o recuperación (d'Alba 12,7x, Kolmar 13,6x, Cosmax 16,3x, LG H&H 17,2x, Amorepacific 20,5x). Las referencias globales (L'Oréal, Shiseido, e.l.f.) cotizan a 27-30 veces. Mediana del grupo: ${r1(medianaPER)} veces. APR, a 331.500 KRW, cotiza a ${r1(PRECIO / blend(15193.6, 21232.8))} veces el BPA del consenso de Yahoo y a ≈ 17 veces el nuestro (2027e), con más crecimiento y más margen que todos: la prima frente a d'Alba (≈ 13 veces) es el precio de ser la marca líder, y el descuento frente a e.l.f. o L'Oréal, el de la moda y Corea.`,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2023-10', objetivo: 'COSRX (54,8 %, hasta el 93,2 %)', comprador: 'Amorepacific', ev: 1378000, ev_ventas: 3.6, ev_ebitda: 9.6, prima_pct: null, excluir: false, comentario: "755.100 M por el 54,8 % = ≈ 1,38 billones por el 100 % (capital, aproximación al valor empresa). Múltiplos sobre el 1S23 anualizado (ventas ≈ 380.400 M, beneficio operativo ≈ 143.400 M, usado como EBITDA). Dato de la nota de d'Alba del repositorio (Etoday y News Tomato)." },
    ],
    comentario: `Las marcas coreanas de éxito se han comprado a unas 3-4 veces las ventas y unas 10 veces el beneficio operativo (COSRX, 2023). APR vale hoy en bolsa ≈ ${Math.round(apr.ev / 1e12 * 10) / 10} billones de valor empresa, ${r1(apr.evRev)} veces las ventas y ${r1(apr.evEbitda)} veces el EBITDA de los últimos doce meses: el doble que COSRX. El fundador controla el 35 %: una compra no es probable.`,
    confianza: 'Baja',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'bolsa', campo: 'Posición corta', tipo: 'Complemento', intentos: '1) KRX (data.krx.co.kr sin acceso desde este entorno); 2) FnGuide (no la publica); 3) foro de Naver (solo comentarios sobre ventas en corto)', decision: 'Omitido' },
    { seccion: 'multiplos_historicos', campo: 'Historia de múltiplos de más de dos años', tipo: 'Complemento', intentos: '1) Salida a bolsa en febrero de 2024: no existe; 2) FnGuide (PER de 2024 y 2025); 3) folleto de la salida a bolsa (valoración por comparables, no leída)', decision: 'Omitido; regla de historia corta' },
  ],
};
guarda('D', D);

// ================================================================ E. Sentimiento
const fE = [
  { id: 1, titulo: 'Foro de Naver (종목토론실) de 278470: 400 mensajes del 13 al 19-oct-2026 (hora de Corea)', editor: 'Naver Pay Securities', tipo: 'Prensa', fecha: '2026-10-19', url: 'https://m.stock.naver.com/domestic/stock/278470/discussion' },
  { id: 2, titulo: '[단독] 미공개정보 샜나...에이피알, 비공개 그룹콜 10분 뒤 주가 급락', editor: 'Maeil Business (매경)', tipo: 'Prensa', fecha: '2026-10-16', url: NAVER('024', '0000108959') },
  { id: 3, titulo: "'매수 사이드카' 속 소외된 화장품·미용·관광주… \"환율 하락 미워요\" (la cosmética se queda fuera de la subida de la bolsa por los chips y el won)", editor: 'Seoul Economic Daily', tipo: 'Prensa', fecha: '2026-07-15', url: NAVER('011', '0004641760') },
  { id: 4, titulo: '급락에도 "목표가 52만원"…한국투자證 "분명한 과매도"', editor: 'Korea Economic TV', tipo: 'Prensa', fecha: '2026-10-15', url: NAVER('215', '0001269240') },
];
const E = {
  _estado: 'completa',
  sentimiento: {
    tono: 'Dividido',
    tendencia: 'Empeora',
    revisadas: [
      { plataforma: 'Foro de Naver (종목토론실), 13 al 15-oct-2026', fecha: '2026-10', n_comentarios: 230, tono: 'Negativo', resumen: 'Indignación tras la caída del 19,6 %: «se dio la información antes a los institucionales», quejas de compras a crédito y ventas forzosas, «24,5 se ve», críticas al fundador y a la recompra «de solo 30.000 M»; una minoría compra «en el miedo» [E1].' },
      { plataforma: 'Foro de Naver, 16 al 19-oct-2026', fecha: '2026-10', n_comentarios: 170, tono: 'Dividido', resumen: 'Tras el rebote del 16-oct (+9,2 %): «a 40 (400.000)», comentarios sobre la subida de e.l.f. y la cosmética en EE. UU., el récord del Prime Day (+85 %) y Costco; persiste la sospecha sobre la llamada a analistas [E1].' },
      { plataforma: 'Prensa y análisis coreanos', fecha: '2026-10', n_comentarios: 6, tono: 'Neutro', resumen: 'Posible filtración de información en la llamada del 12-oct y revisión de la KRX [E2]; KIS habla de «sobreventa clara» a 14 veces el beneficio [E4]; en julio, la cosmética quedó fuera de la subida de la bolsa por los chips y el won [E3].' },
    ],
    temas: [
      { tema: 'Filtración a institucionales en la llamada del 12-oct', postura: 'Bajista', peso: 'Alto', contraste: 'Cierto en parte: la acción cayó desde las 15:10 del 12-oct y los informes salieron al día siguiente; la KRX estudia si hubo infracción [E2]. Es un problema de gobierno (sanción leve probable), no de negocio.' },
      { tema: 'Compras a crédito y ventas forzosas', postura: 'Bajista', peso: 'Medio', contraste: 'Plausible: hubo ventas forzosas el 13-oct con el KOSPI −5,5 %; es flujo, no negocio. Sin dato oficial de saldo de crédito en las fuentes leídas.' },
      { tema: 'El won fuerte y el margen del 3T26', postura: 'Bajista', peso: 'Medio', contraste: 'Cierto: el 92 % de las ventas es fuera de Corea; Shinyoung estima un punto de margen menos por cada 5 % de bajada del dólar (nota B).' },
      { tema: 'Demanda en EE. UU. y Europa (Prime Day, Costco)', postura: 'Alcista', peso: 'Medio', contraste: 'Cierto: ventas en EE. UU. +85 % en los días de ofertas de Amazon de octubre y entrada en ≈ 400 Costco (nota B).' },
      { tema: 'Recompras pequeñas', postura: 'Bajista', peso: 'Bajo', contraste: 'Parcial: reparte sobre todo con dividendo (66 % del beneficio de 2025) (nota A).' },
    ],
    lectura: 'Los particulares coreanos están heridos tras la caída de 475.000 a 283.000 KRW en seis semanas y desconfían de la empresa por la llamada privada a analistas; hablan más de flujos (crédito, ventas en corto, institucionales) que del negocio, que sigue creciendo más del 100 %. Coinciden con los analistas en el miedo al margen del 3T26, pero no en el fondo: las 22 casas recomiendan comprar con objetivos de 410.000-570.000 KRW. No hay euforia; hay cansancio y una minoría que compra en el miedo.',
    confianza: 'Media',
  },
  fuentes: fE,
  huecos: [],
};
guarda('E', E);
console.log('Notas A-E escritas;', comparables.length, 'comparables; mediana PER', r1(medianaPER), comparables.map((c) => `${c.nombre} ${c.per_ntm}`).join(', '));
