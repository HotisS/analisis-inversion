// Escribe las notas A-E de JYP Entertainment (035900.KQ, KOSDAQ; corte 2026-10-19, cierre del 19-oct en Seúl).
// Fuentes primarias: DART (dart.fss.or.kr, visor de secciones con notas/dart.mjs): informes anuales (사업보고서) de 2025
// (rcp 20260318001519, con 2024 y 2023), 2023 (20240318000479), 2022 (20230320000741) y 2021 (20220321001029); informe semestral
// de 2026 (20260814003204) y trimestrales; avisos (junta de 2026, plan de valor, terrenos de Godeok y Seongnae). Consenso y
// objetivos: FnGuide (Naver WiseReport). Bolsa y comparables: Yahoo Finance; cierre del 19-oct de Naver Finance. Prensa coreana
// (Naver News) y foro de Naver. Cada nota cita solo con [n] de su propia lista.
// Ejecutar: node informes/jyp-2026-10-19/notas/construir-notas.mjs
// Ejercicio natural (31-dic). Cifras en millones de KRW salvo que se diga otra cosa.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const DART = (rcp) => `https://dart.fss.or.kr/dsaf001/main.do?rcpNo=${rcp}`;
const NAVER = (oid, aid) => `https://n.news.naver.com/mnews/article/${oid}/${aid}`;
const WISE = (p) => `https://navercomp.wisereport.co.kr/v2/company/${p}.aspx?cmp_cd=035900`;
const bolsa = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const compsRaw = JSON.parse(fs.readFileSync(path.join(dir, 'comparables-yahoo-raw.json'), 'utf8'));
const fx = Object.fromEntries(compsRaw.filter((c) => /=X$/.test(c.s)).map((c) => [c.s, c.price]));
const USDKRW = fx['KRW=X']; // 1.331,86 (Yahoo, 19-oct-2026)
const JPYKRW = fx['JPYKRW=X']; // 8,383
const EURKRW = fx['EURKRW=X']; // 1.493,2
const PRECIO = 40200; // cierre de la KRX del 19-oct-2026 (Naver Finance: 40.200, +2,94 %; Yahoo daba 40.400 a las 15:30:26 KST, el máximo del día)

// ================================================================ A. Cuentas
const fA = [
  { id: 1, titulo: '사업보고서 2025 (informe anual): estados consolidados K-IFRS de 2025, 2024 y 2023 auditados por Samjong KPMG; notas (ventas por tipo, segmentos, intangibles y primas de contratos de artistas, flujos, participadas), dividendos, consejo, remuneración y accionistas', editor: 'JYP Entertainment / DART (FSS)', tipo: 'Primaria', fecha: '2026-03-18', url: DART('20260318001519') },
  { id: 2, titulo: '사업보고서 2023 (informe anual): estados consolidados de 2023, 2022 y 2021', editor: 'JYP Entertainment / DART (FSS)', tipo: 'Primaria', fecha: '2024-03-18', url: DART('20240318000479') },
  { id: 3, titulo: '사업보고서 2022 (informe anual): estados consolidados de 2022 y 2021', editor: 'JYP Entertainment / DART (FSS)', tipo: 'Primaria', fecha: '2023-03-20', url: DART('20230320000741') },
  { id: 4, titulo: '사업보고서 2021 (informe anual): estados consolidados de 2021 y 2020 (venta de participadas y ganancias de valor razonable de 2021)', editor: 'JYP Entertainment / DART (FSS)', tipo: 'Primaria', fecha: '2022-03-21', url: DART('20220321001029') },
  { id: 5, titulo: '반기보고서 2026 (informe semestral, revisión limitada): estados consolidados a 30-jun-2026, 2T26 y 1S26, ventas por tipo con la clasificación nueva (MD aparte), accionistas, consejo', editor: 'JYP Entertainment / DART (FSS)', tipo: 'Primaria', fecha: '2026-08-14', url: DART('20260814003204') },
  { id: 6, titulo: '분기보고서 1T26 (informe del primer trimestre de 2026)', editor: 'JYP Entertainment / DART (FSS)', tipo: 'Primaria', fecha: '2026-05-15', url: DART('20260515002272') },
  { id: 7, titulo: '분기보고서 3T25 (informe del tercer trimestre de 2025)', editor: 'JYP Entertainment / DART (FSS)', tipo: 'Primaria', fecha: '2025-11-14', url: DART('20251114002061') },
  { id: 8, titulo: '분기보고서 1T25 (informe del primer trimestre de 2025: plusvalía por la venta de la participación en Dear U)', editor: 'JYP Entertainment / DART (FSS)', tipo: 'Primaria', fecha: '2025-05-14', url: DART('20250514000990') },
  { id: 9, titulo: '분기보고서 3T24 (informe del tercer trimestre de 2024)', editor: 'JYP Entertainment / DART (FSS)', tipo: 'Primaria', fecha: '2024-11-13', url: DART('20241113000443') },
  { id: 10, titulo: '반기보고서 2024 (informe semestral de 2024)', editor: 'JYP Entertainment / DART (FSS)', tipo: 'Primaria', fecha: '2024-08-13', url: DART('20240813000992') },
  { id: 11, titulo: '정기주주총회결과 (junta del 26-mar-2026: cuentas de 2025, dividendo de 877 KRW, 29.058 M; consejo de 8 con 4 independientes)', editor: 'JYP Entertainment / KRX', tipo: 'Primaria', fecha: '2026-03-26', url: DART('20260326903068') },
  { id: 12, titulo: 'Consenso anual y trimestral; BPA trimestral real', editor: 'FnGuide (Naver WiseReport)', tipo: 'Analistas', fecha: '2026-10-16', url: WISE('c1050001') },
  { id: 13, titulo: 'JYP엔터 2분기 영업이익 310억원…작년 대비 41.4%↓', editor: 'Yonhap', tipo: 'Prensa', fecha: '2026-08-12', url: NAVER('001', '0016247799') },
  { id: 14, titulo: 'JYP, 트와이스 활동 불확실성·스키즈 군백기 등 우려-유안타 (2T26: ≈ 2,55 M de discos, 95.000 espectadores... consenso de 381 mil M de beneficio operativo)', editor: 'Edaily', tipo: 'Prensa', fecha: '2026-08-13', url: NAVER('018', '0006350719') },
  { id: 15, titulo: '신규시설투자등 / 유형자산 양수 결정 (compra de terreno y edificios en Seongnae-dong por 96.000 M, pagos de oct-2026 a feb-2027)', editor: 'JYP Entertainment / DART (FSS)', tipo: 'Primaria', fecha: '2026-10-08', url: DART('20261008000381') },
  { id: 16, titulo: '[정정] 유형자산 양수 결정 (corrección: el terreno de Godeok, comprado por 75.537 M en 2023, se venderá tras dividir la parcela; inscripción prevista el 30-jun-2027)', editor: 'JYP Entertainment / DART (FSS)', tipo: 'Primaria', fecha: '2026-10-08', url: DART('20261008000398') },
  { id: 17, titulo: 'JYP, MD 사업 고성장…구조적 수익성 개선 국면 진입-메리츠證 (1T26: MD 60,6 mil M, +85 %)', editor: 'Financial News', tipo: 'Prensa', fecha: '2026-05-15', url: NAVER('014', '0005521934') },
  { id: 18, titulo: 'JYP엔터, 서구권 투어 확대 효과 확인…MD 성장세도 본격화-iM (gira de TWICE: 78 conciertos y ≈ 2,1 M de espectadores)', editor: 'Edaily', tipo: 'Prensa', fecha: '2026-05-15', url: NAVER('018', '0006281830') },
];

// Cuenta por función (K-IFRS). EBITDA = beneficio operativo + amortización de inmovilizado material (con derechos de uso) e
// intangibles (incluidas las primas de contratos de exclusividad de artistas), de las notas de flujos. resultado_financiero = BAI −
// beneficio operativo (incluye otros ingresos y gastos no operativos, participadas y plusvalías). BPA diluido publicado; acciones
// diluidas = beneficio atribuido ÷ BPA diluido.
const cuenta = [
  { periodo: '2020', ingresos: 144399, coste_ventas: 67502, gastos_generales: 32761, ebitda: 48207, amortizaciones: 4071, ebit: 44136, resultado_financiero: -6148, bai: 37988, impuestos: 8351, minoritarios: 103, beneficio_neto: 29534, gastos_financieros: 94, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 892, dpa: 154, dpa_extraordinario: 0, acciones_diluidas: 33.11 },
  { periodo: '2021', ingresos: 193900, coste_ventas: 89746, gastos_generales: 46250, ebitda: 62594, amortizaciones: 4690, ebit: 57904, resultado_financiero: 28008, bai: 85912, impuestos: 18412, minoritarios: 40, beneficio_neto: 67461, gastos_financieros: 38, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 2037, dpa: 369, dpa_extraordinario: 0, acciones_diluidas: 33.12 },
  { periodo: '2022', ingresos: 345892, coste_ventas: 189330, gastos_generales: 59931, ebitda: 102676, amortizaciones: 6045, ebit: 96632, resultado_financiero: -2511, bai: 94121, impuestos: 26619, minoritarios: 18, beneficio_neto: 67484, gastos_financieros: 90, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 2038, dpa: 369, dpa_extraordinario: 0, acciones_diluidas: 33.11 },
  { periodo: '2023', ingresos: 566501, coste_ventas: 298217, gastos_generales: 98840, ebitda: 180499, amortizaciones: 11055, ebit: 169444, resultado_financiero: -13771, bai: 155673, impuestos: 50656, minoritarios: -450, beneficio_neto: 105467, gastos_financieros: 264, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 3184, dpa: 574, dpa_extraordinario: 0, acciones_diluidas: 33.12 },
  { periodo: '2024', ingresos: 601788, coste_ventas: 345406, gastos_generales: 128119, ebitda: 142926, amortizaciones: 14664, ebit: 128262, resultado_financiero: 7895, bai: 136157, impuestos: 38442, minoritarios: -44, beneficio_neto: 97759, gastos_financieros: 202, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 2951, dpa: 534, dpa_extraordinario: 0, acciones_diluidas: 33.13 },
  { periodo: '2025', ingresos: 821855, coste_ventas: 518411, gastos_generales: 148197, ebitda: 176495, amortizaciones: 21249, ebit: 155246, resultado_financiero: 68107, bai: 223353, impuestos: 62790, minoritarios: 2, beneficio_neto: 160562, gastos_financieros: 171, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 4846, dpa: 877, dpa_extraordinario: 0, acciones_diluidas: 33.13 },
];
const balanceHist = [
  { periodo: '2020', activo_total: 223950, activo_corriente: 126953, pasivo_corriente: 33334, pasivo_total: 37702, fondo_comercio: null, intangibles: 30828, inmovilizado_material: 40547, existencias: 448, clientes: 19458, proveedores: 11049, activos_contrato: null, pasivos_contrato: 7365, caja: 103628, deuda_financiera: 0, arrendamientos: null, patrimonio_neto: 182672, minoritarios: 3576, reservas: 99912 },
  { periodo: '2021', activo_total: 317418, activo_corriente: 159187, pasivo_corriente: 58332, pasivo_total: 66769, fondo_comercio: null, intangibles: 29546, inmovilizado_material: 38286, existencias: 1433, clientes: 46946, proveedores: 14515, activos_contrato: null, pasivos_contrato: 16931, caja: 106693, deuda_financiera: 0, arrendamientos: null, patrimonio_neto: 246622, minoritarios: 4028, reservas: 162276 },
  { periodo: '2022', activo_total: 411122, activo_corriente: 237106, pasivo_corriente: 101384, pasivo_total: 106621, fondo_comercio: null, intangibles: 41507, inmovilizado_material: 37764, existencias: 2397, clientes: 68207, proveedores: 31557, activos_contrato: null, pasivos_contrato: 25417, caja: 159658, deuda_financiera: 0, arrendamientos: null, patrimonio_neto: 300558, minoritarios: 3943, reservas: 217546 },
  { periodo: '2023', activo_total: 571533, activo_corriente: 368756, pasivo_corriente: 154345, pasivo_total: 173491, fondo_comercio: null, intangibles: 40648, inmovilizado_material: 56287, existencias: 24439, clientes: 71041, proveedores: 55643, activos_contrato: null, pasivos_contrato: 28142, caja: 262743, deuda_financiera: 0, arrendamientos: null, patrimonio_neto: 394022, minoritarios: 4021, reservas: 310800 },
  { periodo: '2024', activo_total: 678782, activo_corriente: 362269, pasivo_corriente: 174829, pasivo_total: 195901, fondo_comercio: 30342, intangibles: 29882, inmovilizado_material: 140231, existencias: 14310, clientes: 117418, proveedores: 94330, activos_contrato: null, pasivos_contrato: 26130, caja: 217126, deuda_financiera: 0, arrendamientos: 9562, patrimonio_neto: 478599, minoritarios: 4283, reservas: 389528 },
  { periodo: '2025', activo_total: 851090, activo_corriente: 496448, pasivo_corriente: 206243, pasivo_total: 226142, fondo_comercio: 30387, intangibles: 36511, inmovilizado_material: 141799, existencias: 20169, clientes: 123517, proveedores: 72272, activos_contrato: 80481, pasivos_contrato: 53684, caja: 337406, deuda_financiera: 0, arrendamientos: 9346, patrimonio_neto: 620598, minoritarios: 4350, reservas: 532624 },
];
const flujosHist = [
  { periodo: '2020', flujo_operativo: 22060, capex: 3990, pagos_arrendamientos: 1563, adquisiciones: 3641, desinversiones: 0, dividendos: 5130, recompras: 0, emision_acciones: 13, intereses_en_financiacion: 0 },
  { periodo: '2021', flujo_operativo: 45833, capex: 1111, pagos_arrendamientos: 1704, adquisiciones: 25926, desinversiones: 0, dividendos: 5097, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: '2022', flujo_operativo: 87648, capex: 14802, pagos_arrendamientos: 1631, adquisiciones: 3000, desinversiones: 0, dividendos: 12213, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: '2023', flujo_operativo: 151239, capex: 13007, pagos_arrendamientos: 2604, adquisiciones: 8016, desinversiones: 0, dividendos: 12213, recompras: 0, emision_acciones: 655, intereses_en_financiacion: 0 },
  { periodo: '2024', flujo_operativo: 89293, capex: 111422, pagos_arrendamientos: 3944, adquisiciones: 1500, desinversiones: 1250, dividendos: 19010, recompras: 0, emision_acciones: 629, intereses_en_financiacion: 0 },
  { periodo: '2025', flujo_operativo: 124333, capex: 22508, pagos_arrendamientos: 4773, adquisiciones: 500, desinversiones: 97539, dividendos: 17693, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
];

const A = {
  _estado: 'completa',
  financieros: {
    cuenta,
    // LTM jun-26 = 2025 − 1S25 + 1S26 [A1, A5]. Ventas 821.855 − 356.591 + 369.102; beneficio operativo 155.246 − 72.536 + 64.372.
    // Beneficio atribuido 160.562 − 105.784 + 53.856 = 108.635 (la plusvalía de Dear U del 1T25 sale del LTM).
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 834366, ebitda: 168706, ebit: 147082, beneficio_neto: 108635, bpa: 3278, dpa: 877, dpa_extraordinario: 0, fcf: 109869, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [
      { periodo: '2021', descripcion: 'Venta de participaciones en sociedades del grupo (plusvalía de 22.044 M) y ganancias de valor razonable de 15.497 M fuera del beneficio operativo [A4].' },
    ],
    comentario: 'Las ventas pasaron de 144.399 M KRW en 2020 a 821.855 M en 2025: un crecimiento anual del 41,6 %, casi todo orgánico, empujado por Stray Kids y TWICE en EE. UU., Europa y Japón [A1, A4]. 2023 fue el año del salto de margen (beneficio operativo del 29,9 % de las ventas); desde entonces el margen baja: 21,3 % en 2024, 18,9 % en 2025 y 17,4 % en el 1S26, porque crecen los conciertos y el MD (productos), que dejan menos margen que los discos, y porque suben los costes de producción de contenidos de los grupos nuevos [A1, A5]. En 2025 las ventas crecieron un 36,6 %, con los conciertos (188.892 M, +82 %) y el MD a la cabeza [A1]. En 2026 las ventas se estancan: el 1S26 creció un 3,5 % (369.102 M) con un beneficio operativo un 11,3 % menor (64.372 M) y un 2T26 de −15,1 % en ventas y −41,4 % en beneficio operativo, muy por debajo de lo esperado [A5, A13]. Últimos doce meses: 834.366 M de ventas y 147.082 M de beneficio operativo (17,6 %).',
    ajustes: 'Cifras publicadas K-IFRS, sin ajustes en la tabla. Tres avisos. (1) El beneficio neto de 2025 (160.562 M; BPA de 4.846 KRW) lleva una plusvalía de 73.160 M por la venta de la participación en Dear U [A1, A8]; sin ella (neta de un impuesto estimado del 22 %) el BPA sería de ≈ 3.124 KRW. (2) El de 2021 (67.461 M) lleva 22.044 M de plusvalías por venta de participadas y 15.497 M de ganancias de valor razonable [A4]; sin ellas el BPA sería de ≈ 1.203 KRW. (3) En 2023 hubo 12.607 M de pérdidas de valor razonable y un deterioro de intangibles de 4.719 M [A2]. Las primas de contratos de exclusividad de artistas (전속계약금) se activan como intangibles y se amortizan durante el contrato (9.086 M en 2025) [A1]: están en el EBITDA como amortización. Desde 2026 la empresa clasifica las ventas de otra forma (MD aparte y YouTube dentro de discos y música) y reexpresa 2024 y 2025 [A5].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '3T24', ingresos: 170473, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 52066, margen_ebitda_pct: 30.5, bpa: 1169, vs_consenso: null },
      { periodo: '4T24', ingresos: 199104, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 40574, margen_ebitda_pct: 20.4, bpa: 782, vs_consenso: null },
      { periodo: '1T25', ingresos: 140759, crecimiento_pct: 3.1, crecimiento_organico_pct: 3.1, ebitda: 24940, margen_ebitda_pct: 17.7, bpa: 2093, vs_consenso: null },
      { periodo: '2T25', ingresos: 215832, crecimiento_pct: 125.5, crecimiento_organico_pct: 125.5, ebitda: 58220, margen_ebitda_pct: 27.0, bpa: 1100, vs_consenso: null },
      { periodo: '3T25', ingresos: 232626, crecimiento_pct: 36.5, crecimiento_organico_pct: 36.5, ebitda: 46104, margen_ebitda_pct: 19.8, bpa: 818, vs_consenso: 'Inferior' },
      { periodo: '4T25', ingresos: 232637, crecimiento_pct: 16.8, crecimiento_organico_pct: 16.8, ebitda: 47230, margen_ebitda_pct: 20.3, bpa: 835, vs_consenso: null },
      { periodo: '1T26', ingresos: 185960, crecimiento_pct: 32.1, crecimiento_organico_pct: 32.1, ebitda: 38774, margen_ebitda_pct: 20.9, bpa: 967, vs_consenso: null },
      { periodo: '2T26', ingresos: 183143, crecimiento_pct: -15.1, crecimiento_organico_pct: -15.1, ebitda: 36398, margen_ebitda_pct: 19.9, bpa: 659, vs_consenso: 'Inferior' },
    ],
    ultima_presentacion: 'Ventas, beneficio operativo y beneficio atribuido de cada trimestre de los informes trimestrales y semestrales [A5-A10]; EBITDA = beneficio operativo + la amortización anual repartida a partes iguales (3.666 M por trimestre en 2024, 5.312 M en 2025 y 5.400 M en 2026: estimación); BPA básico de FnGuide [A12]. Consenso previo: el 2T26 quedó un 18 % por debajo del beneficio operativo esperado (310 frente a 378 mil M, Yonhap Infomax) [A13]; el 3T25 (40.792 M) también defraudó y el 1T26 (33.374 M, +70 %) mejoró con el MD y la gira de TWICE [A17, A18]. JYP no hace presentaciones de resultados ni da guía: publica un aviso de resultados provisionales. El 2T26 dejó tres mensajes [A13, A14]: (1) caída del 15 % de las ventas frente a un 2T25 con la gira de estadios de Stray Kids en Occidente; (2) los conciertos fueron muchos pero pequeños (TWICE 23, 2PM y NiziU en cúpulas de Japón: ≈ 950.000 espectadores) y dejaron poco margen; (3) los discos vendieron ≈ 2,55 M de copias, poco para tantos lanzamientos, y los costes de producción pesaron. Lo que no se explicó: el calendario de TWICE tras la renovación de contratos.',
    confianza: 'Media',
  },
  balance: {
    historico: balanceHist,
    vencimientos: [],
    liquidez: 'A 30-jun-2026: efectivo de 273.779 M y activos financieros a corto de 102.857 M (376.636 M en total), más 56.949 M de activos financieros a largo (32.860 M a coste amortizado, 23.501 M a valor razonable con cambios en resultados y 588 M con cambios en otro resultado global) y 34.272 M en participadas [A5]. Sin deuda financiera; arrendamientos de 8.649 M. Después del cierre: compra de edificios en Seongnae-dong por 96.000 M (pagos de octubre de 2026 a febrero de 2027) y venta prevista del terreno de Godeok (75.537 M de coste) [A15, A16].',
    rating: 'Sin rating público',
    coste_deuda_pct: null,
    vida_media_anios: null,
    otros_pasivos: 'Pasivos de contrato (cobros anticipados de conciertos, discos y licencias) de 75.654 M a 30-jun-2026 frente a 53.684 M a fin de 2025 [A5]. Sin litigios importantes ni garantías relevantes declarados [A1]. Fondo de comercio de 30.387 M (2025) de compras de sociedades del grupo [A1].',
    comentario: 'Balance sin deuda y con mucha caja: 376.636 M a corto más 56.949 M a largo a 30-jun-2026, el 50 % del activo [A5]. El patrimonio pasó de 182.672 M (2020) a 648.573 M (jun-2026) [A4, A5]. El inmovilizado material saltó de 56.287 M (2023) a 140.231 M (2024) por el terreno de Godeok (75.537 M) para una sede que no se construirá: se venderá y la empresa comprará edificios junto a su sede actual por 96.000 M [A1, A15, A16]. El circulante es pequeño: clientes y activos de contrato frente a proveedores y cobros anticipados. Los activos intangibles (36.511 M sin fondo de comercio) son sobre todo primas de contratos de exclusividad con artistas, que se amortizan durante el contrato [A1].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujosHist,
    comentario: 'El flujo operativo pasó de 22.060 M en 2020 a 151.239 M en 2023 y a 124.333 M en 2025 (77 % del beneficio publicado; 119 % del beneficio sin la plusvalía de Dear U) [A1, A2, A4]. En el 1S26 fue de 29.557 M, el 55 % del beneficio del semestre, por el cobro más lento de MD y licencias (clientes de 139.067 M) [A5]. El capex es bajo salvo 2024 (111.422 M, con el terreno de Godeok y 24.105 M de intangibles: primas de contratos de artistas y derechos) [A1]; en un año normal es de 13.000-22.500 M (2-3 % de las ventas), y las primas de renovación de contratos de artistas van dentro. Usos de la caja: dividendos del 15-20 % del beneficio (17.693 M en 2025 y 29.058 M en 2026), sin recompras desde hace años; la autocartera (2.399.433 acciones, 6,75 %) no se amortiza [A1, A11]. La venta de Dear U aportó 97.539 M en 2025.',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'Samjong KPMG (삼정회계법인) desde 2024; antes Ijeong (2021-2023)',
    anios_auditor: 3,
    opinion: 'Favorable (2025)',
    comentario: 'Samjong KPMG auditó 2024 y 2025 con opinión favorable; la cuestión clave de auditoría de 2025 fue el periodo de reconocimiento de las ventas (discos, conciertos y MD entregados alrededor del cierre) [A1]. Criterios a vigilar: (1) las primas de contratos de exclusividad de artistas se activan y se amortizan: una renovación cara (TWICE en 2026) sube la amortización varios años [A1]; (2) los activos de contrato (80.481 M en 2025) y los clientes crecen con las licencias y el MD, y el flujo operativo del 1S26 fue solo el 55 % del beneficio [A5]; (3) la plusvalía de Dear U (73.160 M) infla el beneficio de 2025 [A8]; (4) el terreno de Godeok se vende tras dos años y medio: posible pérdida o ganancia en 2027 [A16].',
    senales: [
      { senal: 'Plusvalía no recurrente en 2025', nivel: 'Baja', comentario: 'Venta de Dear U: 73.160 M en el resultado no operativo; el BPA de 2025 (4.846) no sirve de base [A1, A8].' },
      { senal: 'Flujo operativo por debajo del beneficio (1S26)', nivel: 'Media', comentario: 'El 55 % del beneficio; clientes de 139.067 M y cobros anticipados al alza [A5].' },
      { senal: 'Primas de contratos de artistas activadas', nivel: 'Baja', comentario: 'Intangibles que se amortizan durante el contrato; 9.086 M de amortización en 2025 [A1].' },
      { senal: 'Inversión inmobiliaria abandonada', nivel: 'Baja', comentario: 'Terreno de Godeok de 75.537 M que se venderá; compra de edificios por 96.000 M [A15, A16].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Dividendo del 15-20 % del beneficio consolidado: 877 KRW por acción de 2025 (29.058 M, el 18 % del beneficio con la plusvalía) [A1, A11]. El plan de valor de febrero de 2026 mantiene ese reparto y no promete amortizar la autocartera (6,75 % del capital) (nota C). No recompra desde hace años.',
    adquisiciones: [],
    comentario: 'Asignación de capital prudente pero perezosa: el negocio necesita poco capital (capex del 2-3 % de las ventas) y genera caja, que se acumula (≈ 433.000 M de caja e inversiones financieras, el 32 % de la capitalización a 40.200 KRW). Las dos decisiones grandes de los últimos años fueron inmobiliarias (terreno de Godeok en 2023-2024, abandonado; edificios de Seongnae en 2026) [A15, A16]. El ROE fue del 16-25 % según el año con un tercio del activo en caja. Los foros critican que no amortice la autocartera.',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'Entretenimiento (artistas: discos, conciertos, MD, publicidad, apariciones)', descripcion: 'Gestión de artistas (Stray Kids, TWICE, ITZY, NMIXX, NiziU, Xdinary Heroes, Nexz, KickFlip, 2PM, DAY6 y otros) y explotación de su música, conciertos y productos', tipo_resultado: 'Beneficio operativo', historico: [{ periodo: '2024', ingresos: 505802, resultado: 112070 }, { periodo: '2025', ingresos: 691802, resultado: 126709 }] },
      { nombre: 'Distribución (MD)', descripcion: 'Venta de productos de los artistas (filial JYP Three Sixty)', tipo_resultado: 'Beneficio operativo', historico: [{ periodo: '2024', ingresos: 87223, resultado: 15789 }, { periodo: '2025', ingresos: 118556, resultado: 27157 }] },
      { nombre: 'Edición musical', descripcion: 'Derechos de autor de las canciones (JYP Publishing)', tipo_resultado: 'Beneficio operativo', historico: [{ periodo: '2024', ingresos: 8763, resultado: 403 }, { periodo: '2025', ingresos: 11496, resultado: 1380 }] },
    ],
    geografias: [
      { nombre: 'Corea (ventas nacionales)', peso_pct: 42.8 },
      { nombre: 'Exterior (Japón, EE. UU., Asia, Europa)', peso_pct: 57.2 },
    ],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Ventas de conciertos', valor_anterior: '103.581 M (2024)', valor_actual: '188.892 M (2025)', variacion: '+82,4 %', comentario: 'Gira de estadios de Stray Kids en 2025 y gira de TWICE (78 conciertos, ≈ 2,1 M de espectadores) [A1, A18]. 1S26: 80.784 M [A5].' },
      { kpi: 'Ventas de MD (clasificación de 2026)', valor_anterior: '132.642 M (2024)', valor_actual: '188.501 M (2025)', variacion: '+42,1 %', comentario: 'Productos y tiendas temporales en las giras; 1S26: 104.420 M (+85 % en el 1T26) [A5, A17].' },
      { kpi: 'Discos y música (clasificación de 2026)', valor_anterior: '237.538 M (2024)', valor_actual: '283.279 M (2025)', variacion: '+19,3 %', comentario: '1S26: 101.712 M; el 2T26 vendió ≈ 2,55 M de copias [A5, A14].' },
      { kpi: 'Margen operativo', valor_anterior: '29,9 % (2023)', valor_actual: '17,4 % (1S26)', variacion: '−12,5 puntos', comentario: 'Más conciertos y MD (menos margen) y más costes de contenidos [A1, A5].' },
      { kpi: 'Ventas al exterior', valor_anterior: null, valor_actual: '469.826 M (57 %, 2025)', variacion: null, comentario: 'Japón es el mayor mercado exterior (NiziU, TWICE, Nexz) [A1].' },
    ],
  },
  fuentes: fA,
  huecos: [
    { seccion: 'trimestres', campo: 'Crecimiento interanual del 3T24 y 4T24 y consenso previo de cada trimestre', tipo: 'Complemento', intentos: '1) Informes trimestrales de 2023 (no descargados); 2) FnGuide (solo consenso vigente); 3) prensa (consenso solo del 2T26)', decision: 'Omitido' },
    { seccion: 'negocio', campo: 'Ventas y beneficio por artista', tipo: 'Complemento', intentos: '1) Informe anual (no lo publica); 2) informe semestral (no lo publica); 3) prensa y analistas (estimaciones sueltas)', decision: 'Omitido; la concentración se estima en la nota B' },
  ],
};
guarda('A', A);

// ================================================================ B. Sector y competencia
const fB = [
  { id: 1, titulo: '사업보고서 2025: negocio, artistas, historia, sociedades del grupo, ventas por tipo, distribuidores (Republic Records, Sony, TME, Dreamus, Live Nation), competencia', editor: 'JYP Entertainment / DART (FSS)', tipo: 'Primaria', fecha: '2026-03-18', url: DART('20260318001519') },
  { id: 2, titulo: '반기보고서 2026: ventas por tipo, clientes, artistas', editor: 'JYP Entertainment / DART (FSS)', tipo: 'Primaria', fecha: '2026-08-14', url: DART('20260814003204') },
  { id: 3, titulo: 'Global Music Report 2026: ingresos de la música grabada de 31.700 M USD en 2025 (+6,4 %; Asia +10,9 %)', editor: 'IFPI', tipo: 'Sectorial', fecha: '2026-03-18', url: 'https://www.ifpi.org/resources/' },
  { id: 4, titulo: 'Fichas de HYBE, SM, YG, Dear U, UMG, WMG, Sony, TME', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/035900.KQ' },
  { id: 5, titulo: 'JYP엔터 "스트레이키즈, 재계약 성공…새로운 도약 예고" (renovación de los ocho miembros de Stray Kids, julio de 2024)', editor: 'Money Today', tipo: 'Prensa', fecha: '2024-07-18', url: NAVER('008', '0005065604') },
  { id: 6, titulo: '박진영이 "무조건 산다"더니 \'반토막\'…트와이스 멤버들 속속 떠나자 (Jeongyeon y Chaeyoung no renuevan con JYP; siguen en TWICE)', editor: 'Seoul Shinmun', tipo: 'Prensa', fecha: '2026-08-13', url: NAVER('081', '0003670196') },
  { id: 7, titulo: '"\'하나의 중국\' 지지땐 활동 가능" 트와이스 쯔위에 제안? (oferta china a Tzuyu, cuyo contrato con JYP vence este año)', editor: 'Economist (Corea)', tipo: 'Prensa', fecha: '2026-09-01', url: NAVER('243', '0000102466') },
  { id: 8, titulo: '한한령 모멘텀 사라지자 엔터株 흔들 (se desinflan las esperanzas de que China levante el veto; 3T25 flojo)', editor: 'Chosun Biz', tipo: 'Prensa', fecha: '2025-12-13', url: NAVER('366', '0001129871') },
  { id: 9, titulo: '한·중 K팝 콘서트 추진 … 엔터주 반등 기대해도 좋을까 (concierto de K-pop en Pekín en preparación)', editor: 'Maeil Shinmun', tipo: 'Prensa', fecha: '2025-12-17', url: NAVER('088', '0000987342') },
  { id: 10, titulo: '인간 한계 넘는 K팝, 밀리언셀러 플레이브부터 \'로봇 아이돌\'까지 (ídolos virtuales: PLAVE mete sus cinco canciones en el top 5; ídolos robot)', editor: 'Donghaeng Media', tipo: 'Prensa', fecha: '2026-10-15', url: NAVER('417', '0001161042') },
  { id: 11, titulo: '키스오브라이프 만든 디렉터, 이번엔 버추얼 아이돌 (AMA, grupo virtual OWIS: 6.900 M de financiación con SBVA)', editor: 'Edaily', tipo: 'Prensa', fecha: '2026-10-09', url: NAVER('018', '0006384384') },
  { id: 12, titulo: 'JYP, 중대 결정...파격 \'보이콧\' 선언 (Stray Kids no se presenta a los Grammy; nueve números uno en el Billboard 200)', editor: 'Hankyung Business', tipo: 'Prensa', fecha: '2026-10-03', url: NAVER('050', '0000111596') },
  { id: 13, titulo: '"스트레이키즈 구원투수 되나" JYP에 쏠린 시선 (mini 10 de Stray Kids, ≈ 3,3 M de copias en la primera semana; mayor gira de K-pop de 2025 según Billboard)', editor: 'Hankyung Business', tipo: 'Prensa', fecha: '2026-09-29', url: NAVER('050', '0000111387') },
  { id: 14, titulo: '빅뱅·BTS 잘나가는데…\'올해만 40% 급락\' 엔터주 왜 헤맬까', editor: 'Asia Economy', tipo: 'Prensa', fecha: '2026-07-23', url: NAVER('277', '0005793346') },
];
const B = {
  _estado: 'completa',
  historia: {
    resumen: 'JYP nació en 1997 como agencia del cantante y productor Park Jin-young y llegó a la bolsa en 2001 por una fusión inversa con una cotizada del KOSDAQ [B1]. En los años 2000 lanzó a Rain, g.o.d., Wonder Girls y 2PM; tras unos años flojos (2010-2014), el éxito de TWICE (2015) y Stray Kids (2018) la convirtió en una de las cuatro grandes agencias de K-pop. Desde 2018 trabaja con un sistema de «divisiones» por grupo y ha abierto filiales en Japón (NiziU, 2020; Nexz, 2024), EE. UU. (VCHA, 2024) y China [B1]. Las ventas pasaron de 144.399 M en 2020 a 821.855 M en 2025; desde 2026 el beneficio cae porque sus dos grandes grupos entran en el final de su ciclo [B2].',
    hitos: [
      { anio: '1997', hito: 'Fundación por Park Jin-young [B1].' },
      { anio: '2001', hito: 'Salida a bolsa en el KOSDAQ por fusión [B1].' },
      { anio: '2015', hito: 'Debut de TWICE [B1].' },
      { anio: '2018', hito: 'Debut de Stray Kids [B1].' },
      { anio: '2020', hito: 'NiziU en Japón con Sony Music [B1].' },
      { anio: '2024', hito: 'Stray Kids renueva con los ocho miembros (julio) [B5].' },
      { anio: '2025', hito: 'Ventas récord de 821.855 M; gira de estadios de Stray Kids, la mayor de K-pop del año según Billboard [B13].' },
      { anio: '2026', hito: 'Jeongyeon y Chaeyoung no renuevan con JYP (siguen en TWICE); Park Jin-young deja el consejo; se abandona la sede de Godeok [B6].' },
    ],
    confianza: 'Alta',
  },
  negocio: {
    descripcion: 'JYP descubre, forma y gestiona grupos de K-pop y explota todo lo que generan: discos y música en plataformas (34 % de las ventas de 2025), conciertos (23 %), productos y licencias de imagen (MD y otros, 33 %), publicidad (5 %) y apariciones (4 %) [B1, B2]. Sus artistas más importantes son Stray Kids (chicos, 2018) y TWICE (chicas, 2015); detrás vienen ITZY, NMIXX, NiziU (Japón), Xdinary Heroes, Nexz, KickFlip, 2PM y DAY6 [B1]. El 57 % de las ventas es fuera de Corea, con Japón a la cabeza [B1].',
    como_gana_dinero: 'Invierte años en formar a los aprendices y en lanzar un grupo (coste de contenidos, vídeos, coreografías); si el grupo triunfa, cobra durante el contrato (habitualmente siete años) una parte de todo lo que genera: venta de discos (copias físicas con fotos y cartas que los fans compran repetidas), escuchas en plataformas, entradas de conciertos (los estadios dejan mucho margen; los recintos pequeños, poco), productos y licencias [B1]. Los artistas se llevan una parte creciente según su antigüedad y su poder de negociación, sobre todo al renovar. Distribuye con Republic Records (Universal) en EE. UU., Sony en Japón, TME en China, Dreamus en Corea y organiza giras con Live Nation [B1]. Margen operativo del 18-30 % según los grupos estén de gira grande y con disco nuevo.',
    clientes: 'Los clientes finales son los fans: jóvenes de Asia, EE. UU. y Latinoamérica que compran discos, entradas y productos de su grupo [B1]. Los clientes directos son distribuidores (Dreamus, Sony Japón, Republic), plataformas y promotores; ninguno pasó del 10 % de las ventas en 2025 (el mayor sumó 67.551 M, el 8 %) [B1]. La concentración real es de artistas, no de clientes: Stray Kids y TWICE generan, según los analistas, bastante más de la mitad del beneficio (la empresa no lo publica) [B6, B13].',
    confianza: 'Media',
  },
  sector: {
    definicion: 'El mercado relevante es el mundial de la música grabada (ingresos de las discográficas por plataformas, discos físicos, derechos de ejecución y sincronización), que la IFPI cifra en 31.700 M USD en 2025 (+6,4 %; Asia +10,9 %) [B3]. JYP vende además conciertos y productos, que son mercados más grandes; usamos la música grabada como medida prudente de la cuota y del techo del crecimiento. Dentro, el K-pop es un nicho: las cuatro grandes agencias coreanas (HYBE, SM, JYP, YG) suman ≈ 4 billones de KRW de ventas, ≈ 3.000 M USD [B4].',
    tamano: `31.700 M USD en 2025 (≈ ${Math.round((31700 * USDKRW) / 1000).toLocaleString('es-ES')} mil M KRW a ${USDKRW.toLocaleString('es-ES')} KRW/USD) [B3]`,
    unidad_serie: 'millones de USD',
    serie: [
      { anio: '2021', tamano: 25900 }, { anio: '2022', tamano: 26200 }, { anio: '2023', tamano: 28600 }, { anio: '2024', tamano: 29600 }, { anio: '2025', tamano: 31700 }, { anio: '2026e', tamano: 33300 }, { anio: '2028e', tamano: 36700 }, { anio: '2030e', tamano: 40500 },
    ],
    tcac_historico_pct: 5.2,
    tcac_previsto_pct: 5.0,
    cr5_pct: 75.0,
    estructura: 'Muy concentrada en la distribución (Universal, Sony y Warner tienen ≈ 70 % de la música grabada) y fragmentada en la creación; en el K-pop, cuatro agencias cotizadas compiten con decenas de agencias pequeñas',
    drivers: [
      { driver: 'Suscripciones de streaming y subida de precios', efecto: '+', horizonte: 'Estructural', evidencia: 'La música grabada crece un 5-6 % anual con el streaming de pago [B3].' },
      { driver: 'Fandom global del K-pop: giras de estadios y MD', efecto: '+', horizonte: 'Cíclico', evidencia: 'Conciertos de JYP +82 % en 2025; Stray Kids hizo la gira de K-pop más taquillera de 2025 [B1, B13].' },
      { driver: 'Ciclo de vida de los grupos (contratos de siete años, servicio militar)', efecto: '−', horizonte: 'Estructural', evidencia: 'TWICE en su segunda renovación con dos miembros fuera de JYP; Stray Kids empieza el servicio militar desde la segunda mitad de 2027 [B6, B13].' },
      { driver: 'Venta de discos físicos', efecto: '−', horizonte: 'Cíclico', evidencia: 'Las copias por lanzamiento bajan; el 2T26 vendió ≈ 2,55 M con muchos lanzamientos (nota A) [B2].' },
      { driver: 'China (veto cultural desde 2016)', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Esperanzas de apertura a finales de 2025 que se desinflaron en enero de 2026 [B8, B9].' },
      { driver: 'IA generativa e ídolos virtuales', efecto: '−', horizonte: 'Estructural', evidencia: 'PLAVE (grupo virtual) llena las listas coreanas; AMA levanta 6.900 M para un grupo virtual [B10, B11].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 4, justificacion: 'HYBE, SM, YG y muchas agencias pequeñas lanzan grupos cada año y compiten por la atención y el dinero de los mismos fans [B4].' },
      { fuerza: 'Poder de los clientes', intensidad: 2, justificacion: 'Los fans compran por lealtad al grupo, no por precio; ningún distribuidor pasa del 10 % de las ventas [B1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 4, justificacion: 'El proveedor clave es el artista: tras el primer contrato, los grupos de éxito negocian un reparto mucho mayor o se van (Jeongyeon y Chaeyoung) [B6].' },
      { fuerza: 'Amenaza de entrada', intensidad: 3, justificacion: 'Crear un grupo es barato, pero hacerlo triunfar requiere sistema de formación, red de distribución y años; los ídolos virtuales y la IA bajan la barrera [B10, B11].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'Otros géneros, juegos, vídeos cortos y contenidos hechos con IA compiten por el tiempo de los jóvenes.' },
    ],
    ciclo: { posicion: 'Desaceleración', comentario: 'El K-pop vivió su mejor momento en 2020-2023 (discos récord, giras de estadios). Desde 2024 la venta de discos físicos se estanca y las agencias dependen de las giras y el MD; en 2026 las cuatro grandes caen un 40-50 % en bolsa pese a ventas récord en HYBE, porque el dinero se fue a los chips y la IA y porque faltan grupos nuevos que sustituyan a los veteranos [B14]. El ciclo de cada agencia lo marca el de sus grupos: JYP entra en un valle en 2027-2029 (TWICE con contratos renovados a la baja y Stray Kids en el servicio militar).' },
    regulacion: 'Contratos estándar de la Comisión de Comercio Justa coreana (siete años como máximo para el primer contrato); servicio militar obligatorio de ≈ 18-21 meses para los varones coreanos antes de los 28-30 años; en China, el veto informal al K-pop desde el despliegue del THAAD (2016) sigue en pie [B8]. Derechos de autor: los litigios sobre el uso de música para entrenar IA siguen abiertos en EE. UU. y Europa.',
    tendencias: 'Tres tendencias. (1) Más dinero por fan y menos por disco: giras de estadios, tiendas temporales y productos (el MD de JYP creció un 85 % en el 1T26) [B2]. (2) Localización: grupos formados en Japón (NiziU, Nexz), EE. UU. (VCHA) y China con socios locales. (3) La IA y los ídolos virtuales: abaratan la producción (composición, vídeos) y crean competidores sin servicio militar, sin contratos que renovar y sin escándalos (PLAVE) [B10, B11]; a la vez amenazan el valor de los derechos de autor si la música hecha con IA inunda las plataformas.',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 1.9,
    posicion: 'Una de las cuatro grandes agencias de K-pop: tercera por ventas (821.855 M en 2025) tras HYBE (≈ 3,6 billones) y SM (≈ 1,3 billones), y la más rentable de las cuatro en los últimos cinco años [B4]. Sus ventas equivalen al ≈ 1,9 % del mercado mundial de música grabada (aunque solo un tercio son discos y música) [B3].',
    competidores: [],
    foso: {
      veredicto: 'Estrecho',
      tendencia: 'Bajando',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 2, evidencia: 'Los fans de un grupo de la casa siguen a los nuevos (conciertos conjuntos, plataformas), pero solo en parte.' },
        { fuente: 'Costes de cambio', puntuacion: 2, evidencia: 'Los fans no se cambian de grupo, pero los artistas sí pueden cambiar de agencia al acabar el contrato [B6].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'Sistema de formación y producción de JYP con éxitos repetidos (TWICE, Stray Kids, ITZY, NiziU) y catálogo de canciones [B1].' },
        { fuente: 'Ventaja en costes', puntuacion: 1, evidencia: 'Escala de distribución y giras con Live Nation, Republic y Sony; no es una ventaja de coste decisiva.' },
        { fuente: 'Escala eficiente', puntuacion: 1, evidencia: 'Hay sitio para muchas agencias.' },
      ],
    },
    amenazas: 'La amenaza principal no es otra agencia sino el ciclo de los propios grupos: los artistas veteranos renegocian o se van y los varones hacen el servicio militar. Segunda: que los grupos nuevos (NMIXX, Nexz, KickFlip, los que debutan en 2027) no lleguen al tamaño de Stray Kids o TWICE (probabilidad alta en plazo de tres años; impacto alto). Tercera: los ídolos virtuales y la música hecha con IA, que compiten por el tiempo y el dinero de los fans sin los costes de un grupo humano [B10, B11]. Cuarta: China, que puede abrirse (al alza) o castigar por política (caso de Tzuyu) [B7].',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Lo que toca las cifras: (1) el trato a los artistas y aprendices (contratos, salud, presión), que decide si renuevan; (2) gobierno: el fundador controla con el 15,4 % sin ser consejero desde 2026 y su remuneración es la más alta [nota C]; (3) la seguridad en conciertos y la protección de datos de los fans. Impacto ambiental bajo: discos físicos (plástico, papel) y giras.',
    controversias: 'Park Jin-young compareció en la comisión parlamentaria el 7-oct-2026 por el festival «Phenomenon» organizado con las otras grandes agencias y la comisión presidencial que copreside; defendió que no hubo trato de favor (prensa). Stray Kids boicotea los Grammy de 2027 por la categoría separada de pop asiático [B12].',
    confianza: 'Baja',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'esg', campo: 'Calificaciones ESG', tipo: 'Complemento', intentos: '1) KCGS (sin calificación encontrada); 2) MSCI (sin ficha pública); 3) informe anual 2025 (no menciona calificaciones)', decision: 'Omitido' },
    { seccion: 'competencia', campo: 'Cuota de JYP en el K-pop por ventas de discos y conciertos', tipo: 'Complemento', intentos: '1) Circle Chart (no consultado por acceso); 2) informe anual (no la da); 3) prensa (cifras sueltas por grupo)', decision: 'Omitido' },
  ],
};
const fxDe = (c) => (c === 'USD' ? USDKRW : c === 'JPY' ? JPYKRW : c === 'EUR' ? EURKRW : 1);
const raw = Object.fromEntries(compsRaw.map((c) => [c.s, c]));
const r1 = (x) => (x == null || !isFinite(x) ? null : Math.round(x * 10) / 10);
const r2 = (x) => (x == null || !isFinite(x) ? null : Math.round(x * 100) / 100);
const comp = (s, nombre, pais, comentario) => { const c = raw[s]; return { nombre, pais, ticker: s, ingresos: Math.round((c.rev * fxDe(c.fcur)) / 1e6), cuota_pct: null, margen_ebit_pct: r1(c.opM * 100), comentario }; };
B.competencia.competidores = [
  comp('352820.KS', 'HYBE', 'Corea', 'La mayor agencia (BTS, Seventeen, Le Sserafim, NewJeans); vuelta de BTS en 2026; margen operativo reducido por las inversiones en EE. UU. [B4].'),
  comp('041510.KQ', 'SM Entertainment', 'Corea', 'Agencia de aespa, NCT, Riize; controlada por Kakao; la más parecida en tamaño [B4].'),
  comp('122870.KQ', 'YG Entertainment', 'Corea', 'Blackpink, BigBang (vuelta en 2026), Babymonster; muy dependiente de un grupo [B4].'),
  comp('376300.KQ', 'Dear U', 'Corea', 'Plataforma de mensajes con artistas (Bubble); JYP vendió su participación en 2025 [B4].'),
  comp('UMG.AS', 'Universal Music Group', 'Países Bajos', 'Mayor discográfica del mundo y socio de JYP en EE. UU. (Republic Records) [B1, B4].'),
  comp('WMG', 'Warner Music Group', 'EE. UU.', 'Tercera discográfica mundial; referencia de margen de catálogo [B4].'),
];
guarda('B', B);

// ================================================================ C. Equipo y gobierno
const fC = [
  { id: 1, titulo: '사업보고서 2025: consejo, comisiones, directivos, remuneración de consejeros, accionistas, autocartera', editor: 'JYP Entertainment / DART (FSS)', tipo: 'Primaria', fecha: '2026-03-18', url: DART('20260318001519') },
  { id: 2, titulo: '반기보고서 2026: directivos y consejeros a 30-jun-2026 (7 consejeros, 4 independientes), accionistas (Park Jin-young 15,37 %; autocartera 6,75 %; minoritarios 66,23 %)', editor: 'JYP Entertainment / DART (FSS)', tipo: 'Primaria', fecha: '2026-08-14', url: DART('20260814003204') },
  { id: 3, titulo: '정기주주총회결과 (junta del 26-mar-2026)', editor: 'JYP Entertainment / KRX', tipo: 'Primaria', fecha: '2026-03-26', url: DART('20260326903068') },
  { id: 4, titulo: '사외이사의 선임ㆍ해임 또는 중도퇴임에 관한 신고 (reelección del independiente Kong Tae-yong para la comisión de auditoría)', editor: 'JYP Entertainment / DART (FSS)', tipo: 'Primaria', fecha: '2026-03-26', url: DART('20260326001488') },
  { id: 5, titulo: '기업가치 제고 계획 (plan de valor de 2026: reparto del 15-20 % del beneficio)', editor: 'JYP Entertainment / KRX', tipo: 'Primaria', fecha: '2026-02-20', url: DART('20260220900878') },
  { id: 6, titulo: 'Accionistas principales (Park Jin-young y 3 relacionados 15,95 %), flotante (77,30 %) y extranjeros (13,61 %) a 16-oct-2026', editor: 'FnGuide (Naver WiseReport)', tipo: 'Datos de mercado', fecha: '2026-10-16', url: WISE('c1010001') },
  { id: 7, titulo: '박진영, JYP 사내이사 사임…"K팝 대외업무 집중"', editor: 'Dong-A Ilbo', tipo: 'Prensa', fecha: '2026-03-10', url: NAVER('020', '0003702923') },
  { id: 8, titulo: '국감 출석 JYP "패노메논, 특혜 아닌 4개社 희생…대통령 위한 일 아냐"', editor: 'Yonhap', tipo: 'Prensa', fecha: '2026-10-07', url: NAVER('001', '0016363814') },
  { id: 9, titulo: 'Búsqueda en DART de avisos de operaciones de consejeros y accionistas principales (임원ㆍ주요주주특정증권등소유상황보고서) de JYP: el último es del 18-ene-2024', editor: 'DART (FSS)', tipo: 'Primaria', fecha: '2026-10-19', url: 'https://dart.fss.or.kr/dsab007/main.do' },
];
const C = {
  _estado: 'completa',
  directivos: {
    equipo: [
      { nombre: 'Jung Wook (정욱)', cargo: 'Primer ejecutivo (대표이사) y presidente del consejo', desde: '2011', participacion_pct: 0.41, trayectoria: 'En JYP desde 2011 y primer ejecutivo desde entonces (nacido en 1971); persona vinculada al accionista de control. Tiene 146.879 acciones [C2]. Mandato hasta marzo de 2029.' },
      { nombre: 'Byun Sang-bong (변상봉)', cargo: 'Vicepresidente y director financiero (CFO), consejero ejecutivo', desde: null, participacion_pct: 0.04, trayectoria: 'Contable (AICPA); también consejero de filiales del grupo [C2].' },
      { nombre: 'Park Jin-young (박진영)', cargo: 'Fundador, director creativo (CCO) y productor principal; no consejero desde marzo de 2026', desde: '1997', participacion_pct: 15.37, trayectoria: 'Cantante y productor; fundó la empresa en 1997 y es su mayor accionista (5.462.511 acciones). Dejó el consejo en marzo de 2026 para dedicarse a la comisión presidencial de intercambio de cultura popular, que copreside [C2, C7].' },
      { nombre: 'Lee Ji-young (이지영)', cargo: 'Consejera ejecutiva, directora de desarrollo de artistas nuevos', desde: '2011', participacion_pct: 0.02, trayectoria: 'En JYP desde 2011; dirige el área de nuevos grupos [C2].' },
    ],
    historial_guidance: [],
    comentario: 'Equipo estable: el primer ejecutivo, Jung Wook, dirige la empresa desde 2011 y llevó el cambio a un sistema de divisiones por grupo que multiplicó las ventas por cinco entre 2017 y 2025 [C1]. JYP no da guía de resultados: solo publica resultados provisionales. Riesgo de persona clave: la parte creativa sigue en manos de Park Jin-young (54 años), que desde 2025 dedica tiempo a la comisión presidencial y dejó el consejo en marzo de 2026 [C7]; compareció en el Parlamento en octubre por el festival «Phenomenon» [C8]. La empresa no ha publicado un plan de sucesión creativa.',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Jung Wook', cargo: 'Presidente y primer ejecutivo', tipo: 'Ejecutivo', desde: '2011', comisiones: null },
      { nombre: 'Byun Sang-bong', cargo: 'Consejero ejecutivo (CFO)', tipo: 'Ejecutivo', desde: null, comisiones: null },
      { nombre: 'Lee Ji-young', cargo: 'Consejera ejecutiva', tipo: 'Ejecutivo', desde: null, comisiones: null },
      { nombre: 'Park Wan', cargo: 'Consejero independiente (contable, Samhwa)', tipo: 'Independiente', desde: '2021', comisiones: 'Auditoría; Retribución; ESG; Inversiones; Nombramientos' },
      { nombre: 'Kong Tae-yong', cargo: 'Consejero independiente (abogado)', tipo: 'Independiente', desde: null, comisiones: 'Auditoría; Retribución; ESG; Inversiones; Nombramientos' },
      { nombre: 'Yoon Hyung-geun', cargo: 'Consejero independiente', tipo: 'Independiente', desde: null, comisiones: 'Auditoría; Retribución; Nombramientos' },
      { nombre: 'Lee Jung-min', cargo: 'Consejera independiente (profesora)', tipo: 'Independiente', desde: '2025', comisiones: 'ESG; Nombramientos' },
    ],
    presidente_ceo_separados: false,
    presidente_ejecutivo: true,
    consejero_coordinador: false,
    una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false,
    variable_ligado_rentabilidad: false,
    auditoria_independiente: true,
    insiders_sin_operaciones: true,
    accionista_control: true,
    presidente_vinculado_control: true,
    cambios_cupula_24m: 0,
    voto_remuneracion_pct: null,
    voto_remuneracion_contra_pct: null,
    voto_remuneracion_contra_libre_pct: null,
    voto_cupula_pct: null,
    remuneracion_ceo: 1502,
    remuneracion: 'El primer ejecutivo cobró 1.502 M KRW en 2025 (502 M fijos y 1.000 M de bonus); el mejor pagado fue Park Jin-young, con 2.658 M (830 M fijos y 1.827 M de bonus, ligado a su papel creativo), y el CFO 982 M [C1]. El bonus se decide por resultados (ventas, beneficio operativo) y aportación cualitativa, no por la rentabilidad sobre el capital [C1]. La junta vota cada año un límite global para los consejeros; el aviso de resultados de la junta no da los porcentajes de voto [C3].',
    accionistas: [
      { nombre: 'Park Jin-young (fundador) y relacionados', pct: 15.95, tipo: 'Fundador; accionista de control de hecho', variacion: '15,37 % a título personal (5.462.511 acciones), sin cambios en 2026 [C2, C6]' },
      { nombre: 'Autocartera', pct: 6.75, tipo: 'Autocartera', variacion: '2.399.433 acciones, sin amortizar [C2]' },
      { nombre: 'Minoritarios y flotante (extranjeros 13,61 % del total)', pct: 77.3, tipo: 'Flotante', variacion: 'Flotante del 77,30 % según FnGuide; ningún otro accionista declara más del 5 % (el Servicio Nacional de Pensiones bajó del 5 %) [C2, C6]' },
    ],
    insiders: [],
    control_y_defensas: 'Park Jin-young controla de hecho con el 15,95 % junto a sus relacionados (el primer ejecutivo es persona vinculada), con el resto del capital disperso [C2, C6]. Una acción, un voto; sin blindajes. Cuatro de los siete consejeros son independientes y forman la comisión de auditoría (tres) y la de nombramientos; el presidente del consejo es el primer ejecutivo [C2, C4]. En los registros de DART no hay operaciones de consejeros ni accionistas principales desde el 18-ene-2024 [C9].',
    alertas: [
      'El presidente del consejo es el primer ejecutivo y persona vinculada al accionista de control [C2].',
      'La autocartera (6,75 %) no se amortiza y el reparto es bajo (15-20 % del beneficio) con un tercio del activo en caja [C2, C5].',
      'El fundador, que decide la parte creativa, dejó el consejo y dedica tiempo a un cargo público [C7, C8].',
    ],
    confianza: 'Media',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'Porcentajes de voto de la junta (límite de remuneración)', tipo: 'Complemento', intentos: '1) Aviso de resultados de la junta (no los da); 2) informe de gobierno corporativo (no descargado); 3) prensa (sin datos)', decision: 'Omitido' },
  ],
};
guarda('C', C);

// ================================================================ D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de 035900.KQ, del KOSDAQ (^KQ11) y del ETF TIGER 미디어컨텐츠 (266360.KS); cierres, betas y volatilidad hasta el 16-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://finance.yahoo.com/quote/035900.KQ' },
  { id: 2, titulo: 'Consenso anual 2026e-2028e y trimestral (media de tres meses)', editor: 'FnGuide (Naver WiseReport)', tipo: 'Analistas', fecha: '2026-10-16', url: WISE('c1050001') },
  { id: 3, titulo: 'Objetivos y recomendaciones de 15 casas (julio-octubre de 2026)', editor: 'FnGuide (Naver WiseReport)', tipo: 'Analistas', fecha: '2026-10-19', url: WISE('c1080001') },
  { id: 4, titulo: 'Fichas de comparables (precio, capitalización, valor empresa, ventas, EBITDA, estimaciones de BPA) y tipos de cambio KRW=X (1.331,86), JPYKRW=X (8,383) y EURKRW=X (1.493,2)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/352820.KS' },
  { id: 5, titulo: 'Long-Term Government Bond Yields: 10-year for Korea (IRLTLT01KRM156N), septiembre de 2026: 4,454 %', editor: 'OECD vía FRED', tipo: 'Datos de mercado', fecha: '2026-10-01', url: 'https://fred.stlouisfed.org/series/IRLTLT01KRM156N' },
  { id: 6, titulo: 'Implied ERP by month: octubre de 2026, 4,20 %', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 7, titulo: 'Cotización de JYP Ent. (035900) del 19-oct-2026: cierre 40.200 KRW (+2,94 %), apertura 38.700, máximo 40.400, mínimo 38.650', editor: 'Naver Finance (KRX)', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.naver.com/item/sise.naver?code=035900' },
  { id: 8, titulo: 'JYP엔터, 저연차 IP가 고연차 IP 공백 채워야…목표가↓-상상인 (3T26: ventas 237,3 y beneficio operativo 41,1 mil M; 2026 ventas 761,5 mil M, −7,3 %; recortes de 2027)', editor: 'Edaily', tipo: 'Prensa', fecha: '2026-10-19', url: NAVER('018', '0006391140') },
  { id: 9, titulo: '하나證 "JYP, 저연차 그룹의 성장 정말 필요한 상황…목표가↓" (3T26 de 39,5 mil M y 4T26 de ≈ 25 mil M de beneficio operativo; PER de 2027 de ≈ 13 veces)', editor: 'Chosun Biz', tipo: 'Prensa', fecha: '2026-10-07', url: NAVER('366', '0001196493') },
  { id: 10, titulo: '[특징주] JYP엔터, 2분기 부진·트와이스 재계약 불확실성에 급락 (−11,2 % el 13-ago; recortes de objetivo)', editor: 'Yonhap', tipo: 'Prensa', fecha: '2026-08-13', url: NAVER('001', '0016250291') },
  { id: 11, titulo: '하이브 -48.9%, JYP -41.4%... 죽쑤는 엔터주 중 최악 이유', editor: 'Chosun Ilbo', tipo: 'Prensa', fecha: '2026-09-27', url: NAVER('023', '0004000530') },
];
const blend = (e0, e1) => 0.2 * e0 + 0.8 * e1; // próximos 12 meses desde el 19-oct: 2,4 meses de 2026 y 9,6 de 2027
const nombres = { '352820.KS': ['HYBE', 'KR'], '041510.KQ': ['SM Entertainment', 'KR'], '122870.KQ': ['YG Entertainment', 'KR'], '376300.KQ': ['Dear U', 'KR'], 'UMG.AS': ['Universal Music Group', 'NL'], WMG: ['Warner Music Group', 'US'], '6758.T': ['Sony Group', 'JP'] };
const comparables = compsRaw.filter((c) => nombres[c.s]).map((c) => {
  const fxP = fxDe(c.cur); const fxF = fxDe(c.fcur);
  const e0 = c.et.find((t) => t.p === '0y'); const e1 = c.et.find((t) => t.p === '+1y');
  const epsN = e0?.eps && e1?.eps ? blend(e0.eps, e1.eps) : null;
  const revN = e0?.rev && e1?.rev ? blend(e0.rev, e1.rev) : null;
  return {
    nombre: nombres[c.s][0], ticker: c.s, pais: nombres[c.s][1],
    capitalizacion: c.mcap ? Math.round((c.mcap * fxP) / 1e6) : null,
    ev_ventas: r2(c.evRev), ev_ebitda_ltm: c.s === '352820.KS' ? null : r1(c.evEbitda), ev_ebitda_ntm: null,
    per_ntm: epsN ? r1((c.price * (fxP / fxF)) / epsN) : null,
    crecimiento_pct: revN && c.rev ? r1((revN / c.rev - 1) * 100) : null,
    margen_ebitda_pct: c.ebitda && c.rev ? r1((c.ebitda / c.rev) * 100) : null,
    roic_pct: null,
    dn_ebitda: c.ebitda ? r2((c.debt - c.cash) / c.ebitda) : null,
    fcf_yield_pct: c.fcf != null && c.mcap ? r1(((c.fcf * fxF) / (c.mcap * fxP)) * 100) : null,
  };
});
const pers = comparables.map((c) => c.per_ntm).filter((x) => x != null).sort((a, b) => a - b);
const medianaPER = pers.length % 2 ? pers[(pers.length - 1) / 2] : (pers[pers.length / 2 - 1] + pers[pers.length / 2]) / 2;
const cl = Object.fromEntries(bolsa.cierres_ejercicio.map((x) => [x.anio, x.precio_cierre]));
const jyp = raw['035900.KQ'];
// PER adelantado de cada cierre = cierre ÷ BPA real del año siguiente (2021 y 2025 sin plusvalías: 1.203 y 3.124 KRW) [A1-A4];
// el de 2025 usa nuestro BPA de 2026e (≈ 3.000 KRW: se rellena en propio).
const bpaSig = { '2020': 1203, '2021': 2038, '2022': 3184, '2023': 2951, '2024': 3124 };
const D = {
  _estado: 'completa',
  identificacion: {
    nombre: 'JYP Entertainment Corporation', nombre_corto: 'JYP Entertainment', ticker: '035900', isin: 'KR7035900000', mercado: 'KOSDAQ (Korea Exchange)', indice_referencia: 'KOSDAQ',
    pais: 'Corea del Sur', pais_iso: 'KR', sector: 'Communication Services', industria: 'Entertainment (música y gestión de artistas)', sede: 'Seúl (Seongnae-dong, Gangdong-gu)', fundacion: '1997', empleados: 496, web: 'https://www.jype.com',
    precio: PRECIO, fecha_precio: '2026-10-19', acciones: 33.13, capitalizacion_publicada: Math.round((PRECIO * 33133059) / 1e6), free_float_pct: 77.3,
    max_52s: bolsa.identificacion.max_52s, min_52s: bolsa.identificacion.min_52s, volumen_medio_diario: `≈ ${bolsa.volumen_3m.importe_dia_millones.toLocaleString('es-ES')} M KRW/día (3 meses; ${bolsa.volumen_3m.acciones_dia.toLocaleString('es-ES')} acciones)`, proximos_resultados: '2026-11-12',
  },
  consenso: {
    guidance: 'La empresa no publica guía de ventas ni de beneficio. Lo único comunicado: calendario de artistas (gira mundial de estadios de Stray Kids en 2027, debut de grupos nuevos, NMIXX en Japón en el 4T26) y plan de valor con reparto del 15-20 % del beneficio [nota C: 5]. Resultados del 3T26 sin fecha anunciada (los del 3T25 se publicaron el 12-nov-2025); usamos el 12-nov-2026 como estimación.',
    estimaciones: [
      { periodo: '2026e', ingresos: 814840, ebitda: null, ebit: 146610, bpa: 3257, dpa: null, fuente: 'FnGuide, media de 3 meses a 16-oct-2026 [D2]' },
      { periodo: '2027e', ingresos: 867380, ebitda: null, ebit: 162150, bpa: 3538, dpa: null, fuente: 'FnGuide [D2]' },
      { periodo: '2028e', ingresos: 884760, ebitda: null, ebit: 165450, bpa: 3647, dpa: null, fuente: 'FnGuide [D2]' },
    ],
    recomendaciones: { n_analistas: 15, comprar: 15, mantener: 0, vender: 0, po_medio: 60467, po_min: 49000, po_max: 80000 },
    revisiones: 'A la baja desde julio: JYP fue la acción coreana con más informes de recorte de objetivo entre el 1-jul y el 23-ago (28) [D10]. Tras el 2T26, Meritz 79.000→65.000, SK 75.000→66.000, NH 83.000→69.000→58.000, Samsung 77.000→62.000, Hana 79.000→58.000→49.000, iM 80.000→60.000→50.000 y Yuanta 70.000→60.000→55.000; el 19-oct Sangsangin bajó de 60.000 a 52.000 [D3, D8, D9, D10]. El consenso medio a tres meses aún no recoge del todo los recortes: las casas más recientes ven ventas de 2026 de 761.500 M (−7,3 %) y un 4T26 de ≈ 25.000 M de beneficio operativo frente a los 40.800 M del consenso [D8, D9]. Todas siguen en comprar; objetivo medio de 60.467 KRW (rango 49.000-80.000).',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    ...bolsa.bolsa,
    posicion_corta_pct: null,
    comentario: `La acción cerró 2023 en 101.300 KRW, 2024 en 69.900 y 2025 en 72.600 [D1]. Hoy cotiza a 40.200 (cierre del 19-oct-2026 en la KRX [D7]): un 54 % por debajo del máximo de 52 semanas (88.500, 3-nov-2025), un 11 % por encima del mínimo (36.350, 13-oct-2026) y un 72 % por debajo del máximo de cinco años. En el año cae un ≈ 45 % y a un año un ≈ 45 % frente al −7,5 % del KOSDAQ y el −29 % del ETF de contenidos (datos al 16-oct) [D1]; el dinero de la bolsa coreana se fue a los chips y la IA y las cuatro grandes agencias cayeron un 40-50 % [D11]. Las mayores caídas: −11,2 % el 13-ago (2T26 y salida de dos miembros de TWICE) y −10,8 % el 4-mar (mercado) [D1, D10]. Beta baja frente al KOSDAQ (0,51 mensual) y volatilidad alta (≈ 45 %). A 40.200 KRW cotiza a ${r1(PRECIO / 3278)} veces el BPA de los últimos doce meses y a ${r1(PRECIO / 3257)} veces el de 2026e del consenso.`,
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: ['2020', '2021', '2022', '2023', '2024', '2025'].map((a) => ({ anio: a, precio_cierre: cl[a], ev_ebitda_ntm: null, per_ntm: bpaSig[a] ? r1(cl[a] / bpaSig[a]) : null, excluir: false })),
    comentario: 'PER adelantado de cada cierre de ejercicio = cierre ÷ BPA real del año siguiente; los BPA de 2021 y 2025 van sin plusvalías (1.203 y 3.124 KRW) [A1-A4]. 2020: 31,9x; 2021: 24,9x; 2022: 21,3x; 2023: 34,3x (el BPA de 2024 cayó); 2024: 22,4x; 2025: sobre nuestro BPA de 2026e (en el objetivo a 12 meses). El mercado pagó entre 21 y 34 veces el beneficio del año siguiente mientras el K-pop crecía; hoy paga ≈ 13 veces nuestro BPA de 2027e, el mínimo de la década fuera de 2019 [D1].',
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Las otras tres grandes agencias de K-pop (HYBE, SM, YG), Dear U (plataforma de fans) y las tres grandes discográficas (Universal, Warner, Sony, esta con otros negocios). PER de los próximos 12 meses = precio ÷ (0,2 × BPA 2026e + 0,8 × BPA 2027e) de Yahoo; en Sony, ejercicios a marzo. Excluidas: Live Nation y Spotify (otro negocio, PER sin sentido), Tencent Music (BPA en CNY sin tipo de cambio homogéneo) y Avex (sin estimaciones). EV/EBITDA de HYBE en blanco (95 veces: EBITDA hundido por inversiones).',
    empresas: comparables,
    comentario: `Las agencias coreanas cotizan entre 12 y 23 veces el BPA de los próximos doce meses: HYBE la más cara (vuelta de BTS), SM y YG a 14-15 veces, Dear U a 12. Las discográficas, dueñas de catálogos que cobran durante décadas, a 15-17 veces. Mediana del grupo: ${r1(medianaPER)} veces. JYP, a 40.200 KRW, cotiza a ${r1(PRECIO / blend(3292.98, 3693.61))} veces el BPA del consenso de Yahoo y a ≈ 13 veces el nuestro de 2027e: el descuento frente a SM y YG recoge que su beneficio baja en 2027-2028, cuando el de ellas sube.`,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [],
    comentario: 'No hay transacciones comparables útiles con precio público: las compras de agencias coreanas de los últimos años son de control en disputa (Kakao-SM en 2023, con oferta pública a 150.000 KRW) o de agencias pequeñas. No las usamos para el valor. El fundador controla de hecho con el 16 %: una compra no es probable.',
    confianza: 'Baja',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'bolsa', campo: 'Posición corta', tipo: 'Complemento', intentos: '1) KRX (data.krx.co.kr sin acceso desde este entorno); 2) FnGuide (no la publica); 3) foro de Naver (solo comentarios)', decision: 'Omitido' },
    { seccion: 'transacciones', campo: 'Transacciones de control comparables', tipo: 'Complemento', intentos: '1) Kakao-SM 2023 (oferta en una guerra de control, no comparable); 2) DART (compras pequeñas de filiales); 3) prensa (sin múltiplos)', decision: 'Omitido' },
  ],
};
guarda('D', D);

// ================================================================ E. Sentimiento
const fE = [
  { id: 1, titulo: 'Foro de Naver (종목토론실) de 035900: 400 mensajes del 30-sep al 20-oct-2026 (hora de Corea)', editor: 'Naver Pay Securities', tipo: 'Prensa', fecha: '2026-10-19', url: 'https://m.stock.naver.com/domestic/stock/035900/discussion' },
  { id: 2, titulo: '박진영이 "무조건 산다"더니 \'반토막\'…트와이스 멤버들 속속 떠나자 \'털썩\'', editor: 'Seoul Shinmun', tipo: 'Prensa', fecha: '2026-08-13', url: NAVER('081', '0003670196') },
  { id: 3, titulo: '"매수 외치던 박진영 어쩌나" 14만원→3만원 폭락…목표가 하향 1위 찍었다', editor: 'Herald Economy', tipo: 'Prensa', fecha: '2026-08-25', url: NAVER('016', '0002688340') },
  { id: 4, titulo: '"엔터주 바닥 찍었다고?"...\'멀티 IP\'로 성장축 넓힌다 (Sangsangin: la caída es de múltiplo, por el dinero que va a la IA y los chips)', editor: 'Maekyung Economy', tipo: 'Prensa', fecha: '2026-09-19', url: NAVER('024', '0000108333') },
  { id: 5, titulo: 'K팝은 대박, 내 주가는 쪽박…엔터 \'빅4\', -40% 눈물', editor: 'Kukmin Ilbo', tipo: 'Prensa', fecha: '2026-09-02', url: NAVER('005', '0001870388') },
];
const E = {
  _estado: 'completa',
  sentimiento: {
    tono: 'Negativo',
    tendencia: 'Estable',
    revisadas: [
      { plataforma: 'Foro de Naver (종목토론실), 30-sep al 20-oct-2026', fecha: '2026-10', n_comentarios: 400, tono: 'Negativo', resumen: 'Tono amargo y sarcástico: burlas a Park Jin-young por su «compren sin falta» de 2023, quejas porque no amortiza la autocartera ni recompra, miedo a que más miembros de TWICE se vayan y al servicio militar de Stray Kids, y ventas de inversores que llevan años perdiendo; una minoría habla de suelo a 36.000-38.000 KRW y de comprar a 11-12 veces el beneficio [E1].' },
      { plataforma: 'Prensa económica coreana', fecha: '2026-07 a 2026-10', n_comentarios: 8, tono: 'Negativo', resumen: 'Titulares sobre el «reducido a la mitad» y el récord de recortes de objetivo (28 en siete semanas) [E2, E3]; las cuatro agencias pierden un 40 % pese a ventas récord en el sector [E5]; algún analista ve la caída como de múltiplo, no de negocio [E4].' },
    ],
    temas: [
      { tema: 'TWICE: renovación y salida de miembros', postura: 'Bajista', peso: 'Alto', contraste: 'Cierto: Jeongyeon y Chaeyoung no renuevan con JYP (siguen en TWICE) y la renovación del resto está en curso [E2]. La actividad del grupo completo será menor (nota B).' },
      { tema: 'Servicio militar de Stray Kids', postura: 'Bajista', peso: 'Alto', contraste: 'Cierto: las entradas empiezan en la segunda mitad de 2027 y serán escalonadas (nota B).' },
      { tema: 'Autocartera sin amortizar y reparto bajo', postura: 'Bajista', peso: 'Medio', contraste: 'Cierto: 6,75 % en autocartera y reparto del 15-20 % con un tercio del activo en caja (nota A).' },
      { tema: 'Park Jin-young y la política', postura: 'Bajista', peso: 'Bajo', contraste: 'Parcial: dejó el consejo y copreside una comisión presidencial; el efecto en el negocio no está medido (nota C).' },
      { tema: 'Valoración barata (11-13 veces)', postura: 'Alcista', peso: 'Medio', contraste: 'Cierto sobre el consenso; sobre un beneficio que baja en 2027-2028, menos (nota D).' },
    ],
    lectura: 'El sentimiento es de capitulación: los particulares están heridos tras perder un 70 % desde el máximo de 2023 y desconfían de la dirección por la caja ociosa y la autocartera. Coinciden con los analistas en los dos riesgos (TWICE y el servicio militar de Stray Kids), pero no en la conclusión: las 15 casas siguen en comprar con objetivos de 49.000-80.000 KRW. No hay euforia en ningún lado.',
    confianza: 'Media',
  },
  fuentes: fE,
  huecos: [],
};
guarda('E', E);
console.log('Notas A-E escritas;', comparables.length, 'comparables; mediana PER', r1(medianaPER), comparables.map((c) => `${c.nombre} ${c.per_ntm}`).join(', '));
