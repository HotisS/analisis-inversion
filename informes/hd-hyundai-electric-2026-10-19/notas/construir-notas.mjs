// Escribe las notas A-E de HD Hyundai Electric Co., Ltd. (267260.KS, KOSPI; corte 2026-10-19, cierre del 19-oct en Seúl).
// Fuentes primarias: informes de DART (사업보고서 FY2022-FY2025, 반기보고서 1S26, 분기보고서 3T24, 3T25 y 1T26, informe de
// auditoría consolidado FY2022) leídos con el visor de secciones de dart.fss.or.kr (el PDF devuelve 0 bytes; el visor sí
// responde desde este entorno), avisos de DART de 2026 (contratos, guía, cierre de Anseong, juntas, plan de valor, accionista
// de control), presentaciones de resultados trimestrales 3T24-2T26 de la web de la empresa, Federal Register (antidumping),
// FnGuide/WiseReport (consenso), Yahoo Finance (bolsa y comparables), Naver (bono a 10 años y foro), prensa coreana e inglesa.
// Cada nota cita solo con [n] de su propia lista. Ejecutar: node informes/hd-hyundai-electric-2026-10-19/notas/construir-notas.mjs
// Ejercicio natural (31-dic). Cifras en millones de KRW salvo que se diga otra cosa.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const DART = (r) => `https://dart.fss.or.kr/dsaf001/main.do?rcpNo=${r}`;
const IR = 'https://www.hd-hyundaielectric.com';
const bolsa = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const compsRaw = JSON.parse(fs.readFileSync(path.join(dir, 'comparables-yahoo-raw.json'), 'utf8'));
// Tipos de cambio de Yahoo del 19-oct-2026 (KRW por unidad).
const FX = { KRW: 1, USD: 1329.95, EUR: 1490.3, CHF: 1613.22, CAD: 944.35, JPY: 8.384 };

// ================================================================ A. Cuentas
const fA = [
  { id: 1, titulo: '사업보고서 (informe anual) FY2025: estados consolidados K-IFRS de 2025 y 2024 con notas (ventas por producto y región, clientes principales, amortizaciones, deuda, contratos), dividendos, consejo y remuneraciones', editor: 'HD Hyundai Electric / DART (FSS)', tipo: 'Primaria', fecha: '2026-03-16', url: DART('20260316000940') },
  { id: 2, titulo: '사업보고서 FY2024 (versión corregida): estados consolidados de 2024 y 2023 con notas', editor: 'HD Hyundai Electric / DART (FSS)', tipo: 'Primaria', fecha: '2025-03-20', url: DART('20250320001309') },
  { id: 3, titulo: '사업보고서 FY2023: estados consolidados de 2023 y 2022, ventas por producto 2021-2023', editor: 'HD Hyundai Electric / DART (FSS)', tipo: 'Primaria', fecha: '2024-03-18', url: DART('20240318000722') },
  { id: 4, titulo: '사업보고서 FY2022 e informe de auditoría consolidado FY2022: estados de 2022 y 2021 y notas (Samjong KPMG)', editor: 'HD Hyundai Electric / DART (FSS)', tipo: 'Primaria', fecha: '2023-03-14', url: DART('20230314001160') },
  { id: 5, titulo: '반기보고서 (informe semestral) 1S26: estados consolidados a 30-jun-2026 (balance, resultados del 2T y del 1S, flujos del semestre) y notas', editor: 'HD Hyundai Electric / DART (FSS)', tipo: 'Primaria', fecha: '2026-08-14', url: DART('20260814003228') },
  { id: 6, titulo: '분기보고서 3T25 y 1T26 (estados consolidados a 30-sep-2025 y 31-mar-2026)', editor: 'HD Hyundai Electric / DART (FSS)', tipo: 'Primaria', fecha: '2026-05-15', url: DART('20260515002315') },
  { id: 7, titulo: '2Q 2026 Earning Release: ventas, beneficio operativo, pedidos y cartera por negocio y región', editor: 'HD Hyundai Electric', tipo: 'Primaria', fecha: '2026-07-28', url: IR },
  { id: 8, titulo: 'Earning Releases 3Q24, 4Q24, 2Q25, 3Q25, 4Q25 y 1Q26 (resultados trimestrales, pedidos y cartera)', editor: 'HD Hyundai Electric', tipo: 'Primaria', fecha: '2026-04-28', url: IR },
  { id: 9, titulo: 'Aviso de DART: previsión de resultados consolidados corregida (pedidos de 2026 de 4.222 a 5.185 M USD; ventas 4,35 billones KRW)', editor: 'HD Hyundai Electric / DART (FSS)', tipo: 'Primaria', fecha: '2026-07-06', url: DART('20260706800260') },
  { id: 10, titulo: 'Aviso de DART: contrato a largo plazo de equipos para centros de datos (1,1212 billones KRW, 27,5 % de las ventas, hasta 1-ene-2029)', editor: 'HD Hyundai Electric / DART (FSS)', tipo: 'Primaria', fecha: '2026-07-02', url: DART('20260702800227') },
  { id: 11, titulo: 'Aviso de DART: plan de mejora del valor 2026 (retorno al accionista ≥ 30 %, ventas de 4,74 billones en 2027, ROE medio del 30 % en 2025-2027)', editor: 'HD Hyundai Electric / DART (FSS)', tipo: 'Primaria', fecha: '2026-03-25', url: DART('20260325800992') },
  { id: 12, titulo: 'Aviso de DART: resultado de la junta de 24-mar-2026 (cuentas, dividendo final de 5.200 KRW, votos)', editor: 'HD Hyundai Electric / DART (FSS)', tipo: 'Primaria', fecha: '2026-03-24', url: DART('20260324801629') },
  { id: 13, titulo: 'Aviso de DART: cierre de la fábrica de Anseong (84.900 M de ventas) al entrar en servicio el campus de distribución de Cheongju', editor: 'HD Hyundai Electric / DART (FSS)', tipo: 'Primaria', fecha: '2026-02-06', url: DART('20260206801061') },
  { id: 14, titulo: 'Stocks in Focus: HD Hyundai Electric cae tras el 2T26 (distribución en EE. UU. después de 2029; devoluciones de aranceles compensatorios de unos 6.000 M)', editor: 'Edaily (edición inglesa)', tipo: 'Prensa', fecha: '2026-07-29', url: 'https://en.edaily.co.kr/news/eda202607295199/' },
];

// Cuenta por función (K-IFRS). EBITDA = beneficio operativo + amortización del inmovilizado, de derechos de uso y de intangibles
// (notas de flujos). resultado_financiero = BAI − beneficio operativo (financieros, cambio, otros y participadas). beneficio_neto
// = atribuido a la dominante. Sin acciones dilutivas: BPA diluido = básico. DPA del ejercicio (ordinario e intermedio).
const cuenta = [
  { periodo: '2021', ingresos: 1805992, coste_ventas: 1570865, gastos_generales: 225390, ebitda: 52552, amortizaciones: 42816, ebit: 9736, resultado_financiero: -50157, bai: -40421, impuestos: -6735, minoritarios: 0, beneficio_neto: -33687, gastos_financieros: 24716, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: -936, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: 35.99 },
  { periodo: '2022', ingresos: 2104499, coste_ventas: 1768194, gastos_generales: 203264, ebitda: 179892, amortizaciones: 46851, ebit: 133041, resultado_financiero: 30874, bai: 163915, impuestos: 1897, minoritarios: -468, beneficio_neto: 162486, gastos_financieros: 24316, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 4514, dpa: 500, dpa_extraordinario: 0, acciones_diluidas: 35.99 },
  { periodo: '2023', ingresos: 2702799, coste_ventas: 2092381, gastos_generales: 295200, ebitda: 367561, amortizaciones: 52343, ebit: 315218, resultado_financiero: -4702, bai: 310516, impuestos: 51061, minoritarios: 303, beneficio_neto: 259153, gastos_financieros: 39245, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 7200, dpa: 1000, dpa_extraordinario: 0, acciones_diluidas: 35.99 },
  { periodo: '2024', ingresos: 3322349, coste_ventas: 2277784, gastos_generales: 375595, ebitda: 734093, amortizaciones: 65122, ebit: 668971, resultado_financiero: -18899, bai: 650072, impuestos: 151662, minoritarios: -3157, beneficio_neto: 501567, gastos_financieros: 29592, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 13935, dpa: 5350, dpa_extraordinario: 0, acciones_diluidas: 35.99 },
  { periodo: '2025', ingresos: 4079498, coste_ventas: 2686659, gastos_generales: 397526, ebitda: 1068901, amortizaciones: 73588, ebit: 995313, resultado_financiero: -38928, bai: 956385, impuestos: 224569, minoritarios: -789, beneficio_neto: 732605, gastos_financieros: 16787, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 20354, dpa: 7100, dpa_extraordinario: 0, acciones_diluidas: 35.99 },
];
// Balance. caja = efectivo + activos financieros a corto (depósitos). deuda_financiera = préstamos y bonos a corto y largo.
// intangibles incluye el fondo de comercio (pequeño: compra de Plaspo en 2022; el informe no lo separa en el balance resumido).
const balanceHist = [
  { periodo: '2021', activo_total: 2214970, activo_corriente: 1398338, pasivo_corriente: 1252496, pasivo_total: 1568748, fondo_comercio: 0, intangibles: 52678, inmovilizado_material: 516254, existencias: 357079, clientes: 456484, proveedores: 479634, activos_contrato: 190700, pasivos_contrato: 241570, caja: 375866, deuda_financiera: 545862, arrendamientos: 8774, patrimonio_neto: 646222, minoritarios: 0, reservas: -499814 },
  { periodo: '2022', activo_total: 2435030, activo_corriente: 1548306, pasivo_corriente: 1411145, pasivo_total: 1603861, fondo_comercio: 0, intangibles: 65511, inmovilizado_material: 536868, existencias: 627806, clientes: 506399, proveedores: 365914, activos_contrato: 170224, pasivos_contrato: 326345, caja: 194778, deuda_financiera: 565165, arrendamientos: 33572, patrimonio_neto: 822580, minoritarios: 8589, reservas: 171908 },
  { periodo: '2023', activo_total: 2910160, activo_corriente: 1972953, pasivo_corriente: 1497429, pasivo_total: 1853130, fondo_comercio: 0, intangibles: 70006, inmovilizado_material: 624253, existencias: 849725, clientes: 659957, proveedores: 405271, activos_contrato: 220881, pasivos_contrato: 468137, caja: 200049, deuda_financiera: 715493, arrendamientos: 27173, patrimonio_neto: 1048142, minoritarios: 8888, reservas: 396621 },
  { periodo: '2024', activo_total: 3795545, activo_corriente: 2763741, pasivo_corriente: 2001079, pasivo_total: 2288028, fondo_comercio: 0, intangibles: 65913, inmovilizado_material: 730080, existencias: 1081391, clientes: 832343, proveedores: 500633, activos_contrato: 170882, pasivos_contrato: 1071884, caja: 602760, deuda_financiera: 293749, arrendamientos: 58031, patrimonio_neto: 1501787, minoritarios: 5730, reservas: 815876 },
  { periodo: '2025', activo_total: 4769815, activo_corriente: 3426275, pasivo_corriente: 2548719, pasivo_total: 2736880, fondo_comercio: 0, intangibles: 65246, inmovilizado_material: 942725, existencias: 1266518, clientes: 774761, proveedores: 607925, activos_contrato: 316948, pasivos_contrato: 1482483, caja: 968043, deuda_financiera: 186059, arrendamientos: 72506, patrimonio_neto: 2028772, minoritarios: 4163, reservas: 1322719 },
];
// Flujos. capex = inmovilizado material + intangibles. Intereses pagados dentro del flujo operativo. 2022: compra de Plaspo.
const flujosHist = [
  { periodo: '2021', flujo_operativo: 109777, capex: 33190, pagos_arrendamientos: 8610, adquisiciones: 0, desinversiones: 0, dividendos: 0, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: '2022', flujo_operativo: -124139, capex: 41237, pagos_arrendamientos: 9778, adquisiciones: 14416, desinversiones: 0, dividendos: 0, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: '2023', flujo_operativo: -22439, capex: 89249, pagos_arrendamientos: 12441, adquisiciones: 0, desinversiones: 0, dividendos: 17996, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: '2024', flujo_operativo: 1033722, capex: 136732, pagos_arrendamientos: 14976, adquisiciones: 0, desinversiones: 0, dividendos: 75583, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: '2025', flujo_operativo: 959573, capex: 241915, pagos_arrendamientos: 18695, adquisiciones: 16, desinversiones: 0, dividendos: 221347, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
];

const A = {
  _estado: 'completa',
  financieros: {
    cuenta,
    // LTM jun-26 = 2025 − 1S25 + 1S26 (informe semestral). BPA LTM = 850.785 ÷ 35,99 M. FCF = flujo operativo 982.843 − capex 328.195 − arrendamientos 19.689.
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 4336924, ebitda: 1191183, ebit: 1113296, beneficio_neto: 850785, bpa: 23637, dpa: 7800, dpa_extraordinario: 0, fcf: 634959, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [
      { periodo: '2022', descripcion: 'Compra de Plaspo (aparamenta de baja tensión, 14.416 M), pequeña frente al grupo [4].' },
      { periodo: '2026', descripcion: 'Cierre de la fábrica de distribución de Anseong (84.900 M de ventas) al trasladarse la producción al campus de Cheongju; no es una venta de negocio [13].' },
    ],
    comentario: 'Las ventas pasaron de 1,81 billones de KRW en 2021 a 4,08 billones en 2025, un 22,6 % anual, casi todo orgánico [1, 3, 4]. El cambio de verdad está en el margen: el operativo pasó del 0,5 % en 2021 (con un cargo por la demanda de salario ordinario) al 6,3 % en 2022, el 11,7 % en 2023, el 20,1 % en 2024 y el 24,4 % en 2025 [1, 2]. La causa es el ciclo de transformadores de alta tensión: escasez en EE. UU. y Oriente Medio, precios unitarios mucho más altos y pedidos seleccionados; la línea de equipos de potencia pasó de 1,10 a 2,84 billones entre 2022 y 2025 y Norteamérica de 728.100 M en 2023 a 1,61 billones en 2025 [1, 8]. En el 1S26 las ventas crecieron un 13,4 % (2,18 billones) y el beneficio operativo un 27,6 % (545.304 M; margen del 25,0 %) [5]. Los últimos doce meses suman 4,34 billones de ventas, 1,11 billones de beneficio operativo (25,7 %) y 850.785 M de beneficio atribuido [5].',
    ajustes: 'Cifras publicadas K-IFRS, sin ajustes. Partidas a tener en cuenta: (1) 2021, el beneficio operativo de 9.736 M incluye el coste de la sentencia sobre el salario ordinario en gastos de personal [4]; (2) 2022, el BAI (163.915 M) supera al beneficio operativo (133.041 M) por 85.777 M de otros ingresos no operativos (diferencias de cambio y derivados) y un impuesto casi nulo (1.897 M) por créditos fiscales de pérdidas anteriores: el BPA de 2022 (4.514 KRW) no es recurrente [3, 4]; (3) devoluciones de derechos antidumping de EE. UU. contabilizadas en otros ingresos: 8.671 M en 2024 y 3.248 M en 2025 [1]; (4) en el 2T26 el beneficio operativo lleva devoluciones de los aranceles «recíprocos» (IEEPA) anulados en EE. UU., sin importe publicado; la prensa los cifra en unos 6.000 M [7, 14]. El tipo impositivo efectivo fue del 23,5 % en 2025 y del 26,5 % en el 1S26 [1, 5].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '3T24', ingresos: 788700, crecimiento_pct: 13.6, crecimiento_organico_pct: 13.6, ebitda: 179700, margen_ebitda_pct: 22.8, bpa: 3248, vs_consenso: null },
      { periodo: '4T24', ingresos: 815700, crecimiento_pct: 2.3, crecimiento_organico_pct: 2.3, ebitda: 183600, margen_ebitda_pct: 22.5, bpa: 3593, vs_consenso: null },
      { periodo: '1T25', ingresos: 1014700, crecimiento_pct: 26.7, crecimiento_organico_pct: 26.7, ebitda: 235600, margen_ebitda_pct: 23.2, bpa: 4282, vs_consenso: null },
      { periodo: '2T25', ingresos: 906200, crecimiento_pct: -1.2, crecimiento_organico_pct: -1.2, ebitda: 227100, margen_ebitda_pct: 25.1, bpa: 3957, vs_consenso: null },
      { periodo: '3T25', ingresos: 995400, crecimiento_pct: 26.2, crecimiento_organico_pct: 26.2, ebitda: 265700, margen_ebitda_pct: 26.7, bpa: 5301, vs_consenso: null },
      { periodo: '4T25', ingresos: 1163200, crecimiento_pct: 42.6, crecimiento_organico_pct: 42.6, ebitda: 340500, margen_ebitda_pct: 29.3, bpa: 6797, vs_consenso: null },
      { periodo: '1T26', ingresos: 1036500, crecimiento_pct: 2.1, crecimiento_organico_pct: 2.1, ebitda: 278000, margen_ebitda_pct: 26.8, bpa: 5772, vs_consenso: null },
      { periodo: '2T26', ingresos: 1141800, crecimiento_pct: 26.0, crecimiento_organico_pct: 26.0, ebitda: 307100, margen_ebitda_pct: 26.9, bpa: 5740, vs_consenso: 'En línea' },
    ],
    ultima_presentacion: 'En la presentación del 2T26 (28-jul-2026) la empresa publicó ventas de 1,14 billones (+26,0 %) y beneficio operativo de 287.000 M (+37,3 %; margen del 25,1 %), en línea con lo esperado [7]. Los pedidos del trimestre fueron 1.440 M USD (−19,9 % frente al 1T por la base alta) y la cartera llegó a 8.490 M USD (+29,6 % en un año) [7]. Norteamérica: pedidos del 1S26 iguales a todo 2025 y mejor margen en los nuevos pedidos de equipos de potencia [7]. Antes, el 6-jul, había subido el objetivo de pedidos de 2026 de 4.222 a 5.185 M USD sin tocar el de ventas (4,35 billones) [9], y el 2-jul anunció el mayor contrato de su historia: 1,12 billones de equipos para centros de datos de un cliente de EE. UU. hasta 2029 [10]. Lo que se preguntó y pesó en bolsa el día siguiente (−16,9 %): la dirección dijo que la venta de equipos de distribución en EE. UU. no despegará hasta después de 2029 y que las devoluciones de aranceles compensatorios son de solo unos 6.000 M [14]. No dio guía de margen.',
    confianza: 'Alta',
  },
  balance: {
    historico: balanceHist,
    vencimientos: [{ anio: '2026-27', importe: 104518 }, { anio: '2027+', importe: 9949 }],
    liquidez: 'A 30-jun-2026: efectivo de 988.054 M y depósitos a corto de 21.041 M (1,01 billones) frente a 114.467 M de préstamos y bonos (104.518 M a corto) y 67.752 M de arrendamientos [5]. Caja neta de unos 895.000 M sin arrendamientos (827.000 M con ellos). Calificación AA- de Korea Ratings, NICE y KIS (marzo de 2026) [1].',
    rating: 'AA- (Korea Ratings, NICE Investors Service y Korea Investors Service; escala coreana, marzo de 2026)',
    coste_deuda_pct: 4.8,
    vida_media_anios: null,
    otros_pasivos: 'Pasivos de contrato (anticipos de clientes) de 1,89 billones a junio de 2026 (1,48 billones a cierre de 2025, 241.570 M en 2021): financian el circulante mientras dura la escasez y se devuelven en cuanto los pedidos se normalicen [5, 1]. Plan de pensiones de prestación definida con activos afectos; provisiones de garantías y por pérdidas en contratos. Venta con arrendamiento posterior a un 6,2 % [1]. Sin litigios relevantes abiertos tras la sentencia del salario ordinario [1].',
    comentario: 'El balance ha pasado de deuda neta de 170.000 M en 2021 (545.862 M de deuda y 375.866 M de caja) a caja neta de 782.000 M en 2025 y de 895.000 M en junio de 2026 [1, 4, 5]. Lo ha hecho el ciclo: los clientes adelantan dinero para asegurar capacidad (pasivos de contrato de 1,89 billones), lo que deja el circulante comercial cerca de cero pese a unas existencias de 1,54 billones (+21 % en seis meses) [5]. Es una caja «prestada» por los clientes: en una normalización de pedidos los anticipos bajarían y el circulante absorbería caja, como en 2022-2023 (flujo operativo negativo con pedidos y existencias al alza) [3, 4]. Los fondos propios atribuidos casi se triplicaron desde 2022 (822.580 M a 2,25 billones) [5].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujosHist,
    comentario: 'El flujo operativo fue negativo en 2022 (−124.139 M) y 2023 (−22.439 M) porque las existencias y los clientes crecieron con los pedidos antes de que llegaran los anticipos, y saltó a 1,03 billones en 2024 y 959.573 M en 2025 cuando los pasivos de contrato subieron de 468.137 M a 1,48 billones [1, 2, 3]. En los últimos doce meses: 982.843 M de flujo operativo, 328.195 M de capex y 19.689 M de arrendamientos, un flujo libre de 634.959 M (75 % del beneficio) [5]. El capex sube con las ampliaciones: transformadores en Ulsan (211.800 M, 2025-2027), el campus de distribución de Cheongju (118.500 M, en marcha desde nov-2025) y la ampliación de Alabama [1, 13]; 241.915 M en 2025 (5,9 % de las ventas) frente a 33.190 M en 2021 (1,8 %). Estimación propia: capex de mantenimiento del 2 % de las ventas, en línea con la amortización. Usos de la caja en 2025: dividendos 221.347 M y amortización de deuda (de 293.749 a 186.059 M) [1].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'Ernst & Young Hanyoung (2024-2025); Samjong KPMG hasta 2023',
    anios_auditor: 2,
    opinion: 'Favorable (consolidado e individual, 2025)',
    comentario: 'Opinión favorable sin salvedades de EY Hanyoung en 2025, igual que en 2024; Samjong KPMG la dio en 2022 y 2023 [12, 1, 4]. El cambio de auditor de 2024 encaja con la rotación obligatoria coreana (designación periódica). Criterios a vigilar: (1) reconocimiento de ingresos a lo largo del tiempo en contratos grandes (activos de contrato de 547.447 M a junio de 2026, +73 % en seis meses, frente a pasivos de contrato de 1,89 billones) [5]; (2) existencias de 1,54 billones, el 35 % de las ventas anuales, sostenidas por la cartera de pedidos [5]; (3) partidas no recurrentes pequeñas: devoluciones de antidumping (3.248 M en 2025) y de aranceles recíprocos en el 2T26 [1, 7]; (4) el impuesto casi nulo de 2022 por créditos de pérdidas anteriores [4]. No hay pagos en acciones relevantes ni capitalización agresiva de desarrollo (intangibles de 65.246 M, el 1,4 % del activo) [1]. La conversión del beneficio en caja (flujo operativo/beneficio de 1,3 veces en 2025 y 1,2 veces en los últimos doce meses) depende de los anticipos de clientes.',
    senales: [
      { senal: 'Flujo operativo apoyado en anticipos de clientes', nivel: 'Media', comentario: 'Pasivos de contrato de 1,89 billones (41 % de las ventas) a jun-2026; se revertirían en una normalización de pedidos [5].' },
      { senal: 'Activos de contrato y existencias al alza', nivel: 'Baja', comentario: 'Activos de contrato +73 % y existencias +21 % en el 1S26, con la cartera +26 % [5, 7].' },
      { senal: 'Ingresos no recurrentes por aranceles', nivel: 'Baja', comentario: 'Devoluciones de antidumping (8.671 M en 2024, 3.248 M en 2025) y de aranceles recíprocos en el 2T26 [1, 14].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'El plan de mejora del valor (marzo de 2025, revisado en marzo de 2026) fija un retorno al accionista de al menos el 30 % del beneficio (en 2025 fue del 40 %), ventas de 4,74 billones en 2027 y un ROE medio del 30 % en 2025-2027 [11]. Desde 2026 el dividendo es trimestral: 1.300 KRW en el 1T y el 2T de 2026, tras un dividendo total de 7.100 KRW por 2025 (1.900 a cuenta y 5.200 final; 255.548 M, el 34,9 % del beneficio) [12, 5]. No hay recompras. La empresa cumple los requisitos de «empresa de dividendo alto» de la ley fiscal coreana (tributación separada del dividendo para el accionista) [11].',
    adquisiciones: [
      { anio: '2022', objetivo: 'Plaspo (aparamenta de baja tensión)', importe: 14416, ev_ebitda: null, financiacion: 'Caja', resultado: 'Pequeña; consolidada como filial (HD Hyundai Plaspo) [4, 7].' },
    ],
    comentario: 'La asignación de capital es conservadora y buena: con el ciclo a favor, la empresa ha preferido pagar deuda (de 715.493 M en 2023 a 114.467 M), ampliar capacidad en sus fábricas (Ulsan, Cheongju, Alabama) con un capex que ha pasado del 2 % al 6 % de las ventas y subir el dividendo de 1.000 a 7.100 KRW en dos años, en lugar de comprar empresas [1, 5]. Lo discutible es la caja acumulada (1,01 billones) sin recompras en un año en que la acción ha caído un 63 % desde máximos: los particulares del foro las reclaman (nota E). ROE de 2025 del 41,5 % según la empresa [11].',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'Equipos de potencia', descripcion: 'Transformadores de potencia (hasta 765 kV) y reactores, aparamenta aislada en gas (GIS) e interruptores de alta tensión', tipo_resultado: null, historico: [
        { periodo: '2021', ingresos: 975952, resultado: null }, { periodo: '2022', ingresos: 1096837, resultado: null }, { periodo: '2023', ingresos: 1571748, resultado: null }, { periodo: '2024', ingresos: 2035525, resultado: null }, { periodo: '2025', ingresos: 2835195, resultado: null } ] },
      { nombre: 'Máquinas rotativas', descripcion: 'Motores eléctricos de alta y baja tensión, generadores y productos marinos (cuadros y control de barcos)', tipo_resultado: null, historico: [
        { periodo: '2021', ingresos: 379034, resultado: null }, { periodo: '2022', ingresos: 404798, resultado: null }, { periodo: '2023', ingresos: 486814, resultado: null }, { periodo: '2024', ingresos: 537227, resultado: null }, { periodo: '2025', ingresos: 588664, resultado: null } ] },
      { nombre: 'Distribución y otros', descripcion: 'Transformadores de distribución, aparamenta e interruptores de media y baja tensión, baterías (ESS) y otros', tipo_resultado: null, historico: [
        { periodo: '2021', ingresos: 451006, resultado: null }, { periodo: '2022', ingresos: 602864, resultado: null }, { periodo: '2023', ingresos: 644237, resultado: null }, { periodo: '2024', ingresos: 749597, resultado: null }, { periodo: '2025', ingresos: 655639, resultado: null } ] },
    ],
    geografias: [
      { nombre: 'Norteamérica', peso_pct: 39.6 },
      { nombre: 'Corea', peso_pct: 22.9 },
      { nombre: 'Oriente Medio', peso_pct: 20.9 },
      { nombre: 'Europa', peso_pct: 9.9 },
      { nombre: 'Resto (Asia, Oceanía, otros)', peso_pct: 6.7 },
    ],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Pedidos (millones de USD)', valor_anterior: '3.816 (2024)', valor_actual: '4.274 (2025); 3.237 (1S26)', variacion: '+12,0 % en 2025', comentario: 'Objetivo de 2026 subido a 5.185 M USD el 6-jul [8, 9, 7].' },
      { kpi: 'Cartera de pedidos (millones de USD)', valor_anterior: '5.541 (dic-2024)', valor_actual: '8.490 (jun-2026)', variacion: '+53 % en 18 meses', comentario: 'Unos dos años de ventas [8, 7].' },
      { kpi: 'Ventas en Norteamérica (miles de millones de KRW)', valor_anterior: '1.006,2 (2024)', valor_actual: '1.614,9 (2025)', variacion: '+60,5 %', comentario: 'Xcel (9,9 %) y NextEra (8,8 %) entre los tres primeros clientes [1, 7].' },
      { kpi: 'Margen operativo', valor_anterior: '20,1 % (2024)', valor_actual: '24,4 % (2025); 25,1 % (2T26)', variacion: '+4,3 puntos', comentario: '[1, 7]' },
      { kpi: 'Cliente principal (Saudi Electricity)', valor_anterior: null, valor_actual: '421.200 M (10,3 % de las ventas de 2025)', variacion: null, comentario: 'Tres clientes suman el 29 % [1].' },
    ],
  },
  fuentes: fA,
  huecos: [
    { seccion: 'trimestres', campo: 'Consenso previo de cada trimestre 3T24-1T26', tipo: 'Complemento', intentos: '1) FnGuide/WiseReport (solo el consenso vigente); 2) prensa coreana de cada publicación (solo el 2T26: en línea); 3) Yahoo (sin histórico de sorpresas para KRX)', decision: 'Omitido' },
    { seccion: 'negocio', campo: 'Resultado por línea de negocio', tipo: 'Complemento', intentos: '1) Informe anual (un solo segmento a efectos de NIIF 8); 2) presentaciones trimestrales (solo variaciones cualitativas por línea); 3) informes de analistas (sin acceso)', decision: 'Omitido' },
  ],
};
guarda('A', A);

// ================================================================ B. Sector y competencia
const fB = [
  { id: 1, titulo: '사업보고서 FY2025: historia de la sociedad, descripción del negocio, mercado, competencia, capacidad y clientes', editor: 'HD Hyundai Electric / DART (FSS)', tipo: 'Primaria', fecha: '2026-03-16', url: DART('20260316000940') },
  { id: 2, titulo: 'Power Transformer Market Size Projected to Grow $41.62 billion by 2030 (30.380 M USD en 2025; +6,5 % anual)', editor: 'MarketsandMarkets (GlobeNewswire)', tipo: 'Sectorial', fecha: '2025-09-29', url: 'https://www.globenewswire.com/news-release/2025/09/29/3157392/0/en/Power-Transformer-Market-Size-Projected-to-Grow-41-62-billion-by-2030-MarketsandMarkets.html' },
  { id: 3, titulo: 'Power Transformers Industry, Global, 2025-2035 (transformadores de más de 10 MVA: 41.000 M USD en 2024, 80.100 M en 2030)', editor: 'Frost & Sullivan', tipo: 'Sectorial', fecha: '2025', url: 'https://store.frost.com/power-transformers-industry-global-2025-2035.html' },
  { id: 4, titulo: 'Ficha sectorial corta: transformadores y equipos de red eléctrica (GlobalData 89.340 M USD en 2030; Wood Mackenzie; cotizadas)', editor: 'Repositorio propio (sectores/transformadores-2026-10-16.md)', tipo: 'Sectorial', fecha: '2026-10-16', url: 'https://www.woodmac.com' },
  { id: 5, titulo: 'Large Power Transformers from the Republic of Korea: Final Results of Antidumping Duty Administrative Review; 2023-2024 (HD Hyundai Electric 0,00 %; Hyosung y LS Electric 4,32 %)', editor: 'U.S. Department of Commerce / Federal Register', tipo: 'Primaria', fecha: '2026-08-14', url: 'https://www.federalregister.gov/d/2026-16663' },
  { id: 6, titulo: 'Large Power Transformers from the Republic of Korea: Preliminary Results of Antidumping Duty Administrative Review; 2023-2024', editor: 'U.S. Department of Commerce / Federal Register', tipo: 'Primaria', fecha: '2026-02-10', url: 'https://www.federalregister.gov/documents/2026/02/10/2026-02646/large-power-transformers-from-the-republic-of-korea-preliminary-results-of-antidumping-duty' },
  { id: 7, titulo: 'Sección 232: desde el 6-abr-2026 el arancel se aplica sobre el valor del producto acabado; transformadores de muy alta tensión al 15 % hasta fin de 2027', editor: 'The Financial News (edición inglesa)', tipo: 'Prensa', fecha: '2026-04-06', url: 'https://en.fnnews.com/news/202604061143170211' },
  { id: 8, titulo: 'After an Unprecedented Boom: Korean High-Voltage Transformer Firms on Alert Over Multibillion-Won Tariff Shock (arancel del 50 % sobre el acero; el acero eléctrico es el 30-40 % del coste)', editor: 'Asia Economy (edición inglesa)', tipo: 'Prensa', fecha: '2025-08-19', url: 'https://view.asiae.co.kr/en/article/2025081911440803842' },
  { id: 9, titulo: 'Fichas de Hyosung Heavy Industries, LS Electric, Iljin Electric, Siemens Energy, GE Vernova, Hitachi, ABB, Schneider, Eaton, Hubbell y Hammond Power (ventas, márgenes)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/298040.KS' },
  { id: 10, titulo: '2Q 2026 Earning Release: perspectivas por región (FERC, centros de datos, Oriente Medio, Europa)', editor: 'HD Hyundai Electric', tipo: 'Primaria', fecha: '2026-07-28', url: IR },
  { id: 11, titulo: 'HD Hyundai Electric to invest $273.7 million in high-voltage transformers (ampliación de Ulsan y Alabama)', editor: 'Korea JoongAng Daily', tipo: 'Prensa', fecha: '2024', url: 'https://www.koreajoongangdaily.com/business/hd-hyundai-electric-to-invest-2737-million-in-high-voltage-transformers-by-2026/10181530' },
  { id: 12, titulo: 'Aviso de DART: plan de mejora del valor 2026 (cumplimiento del 87 % de los indicadores clave de gobierno)', editor: 'HD Hyundai Electric / DART (FSS)', tipo: 'Primaria', fecha: '2026-03-25', url: DART('20260325800992') },
];
const opM = (s) => { const c = compsRaw.find((x) => x.s === s); return c?.opM != null ? Math.round(c.opM * 1000) / 10 : null; };
const revK = (s) => { const c = compsRaw.find((x) => x.s === s); return c?.rev ? Math.round((c.rev * FX[c.fcur]) / 1e6) : null; };
const B = {
  _estado: 'completa',
  historia: {
    resumen: 'HD Hyundai Electric nació el 1-abr-2017 como escisión de la división eléctrica y electrónica de Hyundai Heavy Industries, que fabricaba transformadores, aparamenta y motores en Ulsan [1]. Salió a cotizar en el KOSPI en mayo de 2017 como Hyundai Electric & Energy Systems. Tuvo años malos (pérdidas netas de 40.246 M en 2020 y de 33.687 M en 2021, con la demanda de salario ordinario y un mercado de transformadores con exceso de capacidad) [1] [A4] y cambió de nombre a HD Hyundai Electric en marzo de 2023, con la sede trasladada a Seongnam [1]. Desde 2022 vive el mayor ciclo de su historia: la escasez de transformadores en EE. UU. y la inversión en red de Oriente Medio llevaron sus ventas de 2,1 a 4,1 billones y su margen operativo del 6 % al 24 % en tres años [1]. Fabrica en Ulsan, Cheongju (distribución), Alabama (EE. UU.) y Yangzhong (China), con filiales comerciales y de servicio en Atlanta, Texas, Oriente Medio, Suiza, Hungría y Alemania [1, 10].',
    hitos: [
      { anio: '2010', hito: 'Fábrica de transformadores de Alabama (EE. UU.), entonces de Hyundai Heavy Industries [1].' },
      { anio: '2017', hito: 'Escisión de Hyundai Heavy Industries (1-abr) y salida a bolsa en el KOSPI [1].' },
      { anio: '2019', hito: 'Traspaso del negocio de control naval a otra sociedad del grupo [1].' },
      { anio: '2022', hito: 'Compra de Plaspo (aparamenta de baja tensión) [1].' },
      { anio: '2023', hito: 'Cambio de nombre a HD Hyundai Electric y traslado de la sede a Seongnam; primer contrato eólico marino europeo [1].' },
      { anio: '2024', hito: 'Filial en Europa (GmbH); plan de ampliación de transformadores en Ulsan y Alabama [1, 11].' },
      { anio: '2025', hito: 'Filial en Texas; campus de distribución de Cheongju en marcha (nov-2025); ventas de 4,08 billones [1].' },
      { anio: '2026', hito: 'Cierre de Anseong; contrato de 1,12 billones para centros de datos en EE. UU.; antidumping de EE. UU. al 0,00 % [1, 5].' },
    ],
    confianza: 'Alta',
  },
  negocio: {
    descripcion: 'HD Hyundai Electric fabrica equipos para llevar la electricidad desde la central al consumidor: transformadores de potencia de hasta 765 kV y reactores, aparamenta aislada en gas, interruptores, transformadores y cuadros de distribución, y máquinas rotativas (motores y generadores, también para barcos) [1]. En 2025 los equipos de potencia fueron el 70 % de las ventas, las máquinas rotativas el 14 % y la distribución y otros el 16 % [1]. El 77 % se exporta: Norteamérica 40 %, Oriente Medio 21 %, Europa 10 % [1, 10]. Fabrica a pedido, con plazos de entrega de dos a cuatro años en los transformadores grandes.',
    como_gana_dinero: 'Gana dinero vendiendo equipos hechos a medida a eléctricas, operadores de red y grandes consumidores (centros de datos, fábricas de semiconductores, renovables) [1]. El margen depende de tres cosas: el precio de los pedidos firmados dos o tres años antes (hoy entregando pedidos de 2023-2024 a precios de escasez), el coste del acero eléctrico de grano orientado y el cobre (el acero es el 30-40 % del coste) y la ocupación de las fábricas [1, 8]. Los clientes adelantan parte del precio para reservar capacidad, lo que financia el circulante. La ventaja frente a chinos e indios es la homologación en las eléctricas de EE. UU. y Oriente Medio (proceso de años), la capacidad de 765 kV y la fábrica de Alabama, que evita parte de los aranceles [1, 10].',
    clientes: 'Saudi Electricity (421.200 M, el 10,3 % de las ventas de 2025), Xcel Energy (406.700 M, 9,9 %) y NextEra (358.900 M, 8,8 %) son los tres mayores; juntos, el 29 % [1]. En EE. UU. vende a eléctricas reguladas, a promotores renovables y, desde 2026, a un gran tecnológico para centros de datos (contrato de 1,12 billones hasta 2029) [1]. En Corea, KEPCO y fábricas de semiconductores. Poder de precios: demostrado en el ciclo (margen operativo del 6 % al 24 % en tres años con precios unitarios en EE. UU. un 45-95 % por encima de 2019 [4]), pero no estructural: en 2020-2021, con exceso de capacidad, la empresa tuvo pérdidas netas [1].',
    confianza: 'Alta',
  },
  sector: {
    definicion: 'El mercado relevante es el mundial de transformadores (de potencia y de distribución), con EE. UU. como el que fija el precio marginal. Es el perímetro de la ficha sectorial del repositorio: GlobalData lo cifra en 89.340 M USD en 2030 (35.830 M de potencia y 53.510 M de distribución) y una estimación propia de 65.200 M USD en 2025 [4]. Más estrecho, MarketsandMarkets da 30.380 M USD de transformadores de potencia en 2025 y 41.620 M en 2030 (+6,5 % anual) [2]; Frost & Sullivan, 41.000 M USD en 2024 para los de más de 10 MVA y 80.100 M en 2030 [3]. Las ventas de la empresa incluyen máquinas rotativas (14 %), fuera de este perímetro: la cuota calculada la sobrestima algo.',
    tamano: '≈ 65.200 M USD en 2025 (transformadores de potencia y distribución; estimación de la ficha sectorial con GlobalData) [4]',
    unidad_serie: 'millones de USD',
    serie: [
      { anio: '2025', tamano: 65200 }, { anio: '2026e', tamano: 69440 }, { anio: '2027e', tamano: 73950 }, { anio: '2028e', tamano: 78760 }, { anio: '2029e', tamano: 83880 }, { anio: '2030e', tamano: 89340 },
    ],
    tcac_historico_pct: null,
    tcac_previsto_pct: 6.5,
    cr5_pct: null,
    estructura: 'Fragmentada',
    drivers: [
      { driver: 'Centros de datos e inteligencia artificial en EE. UU.', efecto: '+', horizonte: 'Estructural', evidencia: 'Contrato de 1,12 billones con un gran tecnológico; la FERC ordena agilizar la conexión de grandes consumidores (jun-2026) [1, 10].' },
      { driver: 'Red envejecida y escasez de transformadores en EE. UU.', efecto: '+', horizonte: 'Estructural', evidencia: 'Faltan el 30 % de los transformadores de potencia; el 80 % se importa (Wood Mackenzie) [4].' },
      { driver: 'Inversión en red de Oriente Medio y renovables en Europa', efecto: '+', horizonte: 'Cíclico', evidencia: 'Oriente Medio 854.000 M de ventas en 2025; Saudi Electricity el 10,3 % [1].' },
      { driver: 'Capacidad nueva de la competencia (2027-2029)', efecto: '−', horizonte: 'Cíclico', evidencia: 'Hitachi Energy, Siemens Energy, Prolec GE, Hyosung y LS amplían fábricas, también en EE. UU. [4].' },
      { driver: 'Aranceles de EE. UU. (sección 232 y antidumping)', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Antidumping del 0,00 % para la empresa [5]; arancel de la sección 232 sobre el valor del transformador desde abril de 2026, 15 % para muy alta tensión hasta 2027 [7].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Hoy baja por la escasez (plazos de 2-4 años); estructuralmente alta: Hitachi Energy, Siemens Energy, GE Vernova-Prolec, Hyosung, LS, WEG y fabricantes chinos e indios [4].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Eléctricas grandes y concentradas (tres clientes, el 29 % de las ventas) que hoy aceptan anticipos y precios altos para asegurar capacidad [1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 3, justificacion: 'Acero eléctrico de grano orientado con pocos productores (POSCO, Nippon Steel, Cleveland-Cliffs en EE. UU.) y cobre; el acero es el 30-40 % del coste [8].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Homologación en cada eléctrica, ensayos de 765 kV y años de historial; los chinos entran por precio fuera de EE. UU. [1, 4].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 1, justificacion: 'No hay sustituto para el transformador en la red; los transformadores de estado sólido están en fase de pruebas.' },
    ],
    ciclo: { posicion: 'Madurez del ciclo', comentario: 'Es un negocio muy cíclico en precio. Tras el auge de 2005-2008 los precios y márgenes cayeron casi una década [4]; la propia empresa tuvo pérdidas netas en 2020 y 2021, con un margen operativo del 4,2 % y del 0,5 % [1] [A4]. Desde 2022 la escasez ha subido precios y márgenes a máximos; la cartera de 8.490 M USD cubre unos dos años de ventas [A7]. Los indicadores a vigilar: plazos de entrega en EE. UU., precios de los pedidos nuevos (la empresa dice que siguen mejorando) y la puesta en marcha de la capacidad anunciada por la competencia en 2027-2029 [4, 10].' },
    regulacion: 'Lo que más pesa es el comercio con EE. UU. Antidumping: la orden de 2012 sobre transformadores grandes coreanos sigue vigente; en la revisión de 2023-2024 (final del 14-ago-2026) Commerce dio a HD Hyundai Electric e Iljin un margen del 0,00 % y a Hyosung y LS Electric un 4,32 %; la revisión de agosto de 2025 a julio de 2026 está abierta [5, 6]. Sección 232: desde el 18-ago-2025 un arancel del 50 % sobre el contenido de acero y aluminio de los transformadores importados; desde el 6-abr-2026 se cobra sobre el valor en aduana del producto acabado, con un tipo reducido del 15 % para los de muy alta tensión hasta el 31-dic-2027 [7, 8]. Además, normas de eficiencia del DOE y planes de red nacionales (KEPCO en Corea).',
    tendencias: 'Tres tendencias. (1) Electrificación de grandes consumidores: centros de datos, fábricas de semiconductores y baterías piden transformadores y aparamenta directamente, no a través de la eléctrica [10]. (2) Fabricar en EE. UU. para sortear aranceles: Alabama amplía capacidad y la competencia también (Hyosung en Memphis, Hitachi en Virginia) [11, 4]. (3) Muy alta tensión (765 kV) para las nuevas líneas de transporte de EE. UU., donde hay pocos proveedores homologados: la empresa firmó dos contratos de 765 kV en 2026 (98.300 M y 173.000 M) [1]. La inteligencia artificial empuja la demanda, no cambia el producto.',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 4.7,
    posicion: 'Uno de los cinco o seis mayores fabricantes de transformadores de potencia del mundo y el primer exportador coreano a EE. UU.; ventas de 4,08 billones en 2025 (≈ 3.070 M USD al cambio del corte), un 4,7 % de un mercado mundial de transformadores de ≈ 65.200 M USD (incluye máquinas rotativas, fuera del perímetro) [1, 4]. En EE. UU. es de los pocos con fábrica local y homologación de 765 kV [1].',
    competidores: [
      { nombre: 'Hitachi Energy (Hitachi)', pais: 'Suiza / Japón', ticker: '6501.T', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Antigua ABB Power Grids; el mayor fabricante del mundo; amplía en EE. UU. Dentro de Hitachi (margen operativo del grupo ' + opM('6501.T') + ' %) [9].' },
      { nombre: 'Siemens Energy (Grid Technologies)', pais: 'Alemania', ticker: 'ENR.DE', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Segundo del mundo en red; margen operativo del grupo ' + opM('ENR.DE') + ' % [9].' },
      { nombre: 'GE Vernova (Prolec GE)', pais: 'EE. UU. / México', ticker: 'GEV', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Compró el 50 % restante de Prolec GE en oct-2025: el mayor proveedor de transformadores de EE. UU. con fábricas en México [9].' },
      { nombre: 'Hyosung Heavy Industries', pais: 'Corea', ticker: '298040.KS', ingresos: revK('298040.KS'), cuota_pct: null, margen_ebit_pct: opM('298040.KS'), comentario: 'Competidor coreano directo con fábrica en Memphis; también construcción [9, 5].' },
      { nombre: 'LS Electric', pais: 'Corea', ticker: '010120.KS', ingresos: revK('010120.KS'), cuota_pct: null, margen_ebit_pct: opM('010120.KS'), comentario: 'Más fuerte en distribución y baja tensión; antidumping del 4,32 % [9, 5].' },
      { nombre: 'Iljin Electric', pais: 'Corea', ticker: '103590.KS', ingresos: revK('103590.KS'), cuota_pct: null, margen_ebit_pct: opM('103590.KS'), comentario: 'Menor; antidumping del 0,00 % [9, 5].' },
      { nombre: 'Hammond Power Solutions', pais: 'Canadá', ticker: 'HPS-A.TO', ingresos: revK('HPS-A.TO'), cuota_pct: null, margen_ebit_pct: opM('HPS-A.TO'), comentario: 'Transformadores secos y de distribución en Norteamérica [9].' },
    ],
    foso: {
      veredicto: 'Estrecho',
      tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'No aplica: venta de equipos a medida.' },
        { fuente: 'Costes de cambio', puntuacion: 3, evidencia: 'Homologación en cada eléctrica y repuestos y servicio durante 30-40 años de vida del transformador; los tres primeros clientes repiten [1].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'Historial en 765 kV y certificaciones en EE. UU. y Oriente Medio; antidumping al 0,00 % frente al 4,32 % de dos competidores coreanos [1, 5].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Margen operativo del ' + opM('267260.KS') + ' % frente al ' + opM('298040.KS') + ' % de Hyosung y el ' + opM('010120.KS') + ' % de LS [9].' },
        { fuente: 'Escala eficiente', puntuacion: 2, evidencia: 'Mercado con pocos fabricantes de muy alta tensión, pero la escala no impide la entrada de capacidad nueva en 2027-2029 [4].' },
      ],
    },
    amenazas: 'Lo más probable es la normalización de precios cuando entre la capacidad nueva de la competencia (2027-2029): Hitachi Energy, Siemens Energy, Prolec GE y los coreanos amplían, y en el ciclo anterior los márgenes tardaron una década en recuperarse [4]; probabilidad media-alta a tres-cinco años. Segunda: aranceles de EE. UU. más altos o una revisión antidumping desfavorable (el margen del 0,00 % se revisa cada año) [5, 7]. Tercera: los fabricantes chinos e indios en Oriente Medio y Europa, donde no hay aranceles, a precios un 20-30 % menores (media). Cuarta: un frenazo del capex de centros de datos.',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Los asuntos ESG que tocan las cifras son tres. (1) Seguridad laboral y relaciones con el sindicato: las huelgas del grupo HD Hyundai en Ulsan (agosto de 2026) pueden retrasar entregas [1]. (2) Gobierno: filial cotizada de un grupo familiar (HD Hyundai, 35,39 %) con consejeros dominicales y operaciones con el grupo (servicios, marcas, contratos con HD Hyundai Electric America) [1, 12]. (3) Producto: los transformadores eficientes y la red para renovables son el lado positivo; el acero y la energía de las fábricas, el lado de las emisiones. La empresa publica informe de sostenibilidad (junio de 2026) y cumple el 87 % de los 15 indicadores clave de gobierno de la bolsa coreana [12].',
    controversias: 'La demanda colectiva por el salario ordinario (2021) se cerró con un cargo en las cuentas [A1]. No hemos encontrado sanciones, retiradas de producto ni litigios relevantes abiertos en DART ni en la prensa en los últimos tres años, más allá de los procedimientos antidumping de EE. UU., que la empresa ha ganado en las dos últimas revisiones [5, 6].',
    confianza: 'Media',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'esg', campo: 'Calificaciones ESG (MSCI, Sustainalytics, KCGS)', tipo: 'Complemento', intentos: '1) Informe anual FY2025 (no las publica); 2) FnGuide/WiseReport (sin calificación ESG en la ficha); 3) búsqueda en prensa (sin calificación reciente)', decision: 'Omitido' },
    { seccion: 'sector', campo: 'TCAC histórico del mercado y CR5', tipo: 'Complemento', intentos: '1) MarketsandMarkets y Frost & Sullivan (solo resúmenes públicos); 2) ficha sectorial (sin CR5 público); 3) informe anual (sin cuotas)', decision: 'Omitido' },
  ],
};
guarda('B', B);

// ================================================================ C. Equipo y gobierno
const fC = [
  { id: 1, titulo: '사업보고서 FY2025: consejo de administración, comisiones, directivos, remuneración de consejeros (más de 500 M KRW), accionistas y operaciones vinculadas', editor: 'HD Hyundai Electric / DART (FSS)', tipo: 'Primaria', fecha: '2026-03-16', url: DART('20260316000940') },
  { id: 2, titulo: 'Aviso de DART: resultado de la junta de 24-mar-2026 (votos de cada punto, consejeros elegidos, voto acumulativo)', editor: 'HD Hyundai Electric / DART (FSS)', tipo: 'Primaria', fecha: '2026-03-24', url: DART('20260324801629') },
  { id: 3, titulo: 'Aviso de DART: resultado de la junta extraordinaria de 8-sep-2026 (elección de Kim Woo-chan, 95,0 % a favor)', editor: 'HD Hyundai Electric / DART (FSS)', tipo: 'Primaria', fecha: '2026-09-08', url: DART('20260908800531') },
  { id: 4, titulo: 'Aviso de DART: cambio en la participación del accionista de control (HD Hyundai 35,39 %; 37,06 % con partes vinculadas; canje de bonos)', editor: 'HD Hyundai Electric / DART (FSS)', tipo: 'Primaria', fecha: '2026-10-01', url: DART('20261001800430') },
  { id: 5, titulo: 'Aviso de DART: plan de mejora del valor 2026 (retorno al accionista, objetivos de ventas y ROE, indicadores de gobierno)', editor: 'HD Hyundai Electric / DART (FSS)', tipo: 'Primaria', fecha: '2026-03-25', url: DART('20260325800992') },
  { id: 6, titulo: 'Aviso de DART: previsión de resultados 2026 (ventas 4,35 billones) y corrección de pedidos (4.222 → 5.185 M USD)', editor: 'HD Hyundai Electric / DART (FSS)', tipo: 'Primaria', fecha: '2026-07-06', url: DART('20260706800260') },
  { id: 7, titulo: '사업보고서 FY2023 y FY2024: guías de pedidos y ventas de 2023-2025 y su cumplimiento', editor: 'HD Hyundai Electric / DART (FSS)', tipo: 'Primaria', fecha: '2025-03-20', url: DART('20250320001309') },
  { id: 8, titulo: 'WiseReport/FnGuide: accionistas principales (HD Hyundai y partes vinculadas 37,06 %, Servicio Nacional de Pensiones 8,00 %)', editor: 'FnGuide (Naver WiseReport)', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://navercomp.wisereport.co.kr/v2/company/c1010001.aspx?cmp_cd=267260' },
  { id: 9, titulo: 'Earning Release 4Q25: resultados de 2025 frente a la guía (ventas 4,08 billones, pedidos 4.274 M USD)', editor: 'HD Hyundai Electric', tipo: 'Primaria', fecha: '2026-01-27', url: IR },
];
const C = {
  _estado: 'completa',
  directivos: {
    equipo: [
      { nombre: 'Kim Young-gi', cargo: 'Consejero delegado (representante) y presidente del consejo', desde: '2025', participacion_pct: 0.0, trayectoria: 'Ingeniero de la casa: dirigió el negocio de equipos de potencia (transformadores) antes de ser nombrado consejero delegado en la junta de marzo de 2025, cuando Cho Seok dejó el cargo [1].' },
      { nombre: 'Namgung Hoon', cargo: 'Consejero ejecutivo (finanzas del grupo)', desde: '2026', participacion_pct: 0.0, trayectoria: 'Directivo de HD Hyundai: responsable de apoyo financiero del holding (2024-) y antes de recursos humanos de HD Korea Shipbuilding; elegido en marzo de 2026 con el 99,1 % de los votos [2].' },
      { nombre: 'Cho Seok', cargo: 'Antiguo consejero delegado (hasta marzo de 2025)', desde: '2021', participacion_pct: 0.0, trayectoria: 'Dirigió la empresa en el giro de 2021-2024 (de pérdidas a un margen del 20 %) y pasó a otro cargo del grupo [1].' },
    ],
    historial_guidance: [
      { anio: '2024', guia: 'Objetivos anuales de pedidos y cartera (cifra no recogida en la presentación)', real: 'Pedidos de 3.816 M USD y cartera de 5.541 M USD: «superan el objetivo de pedidos y cartera»', cumplida: 'Sí' },
      { anio: '2025', guia: 'Pedidos de 3.822 M USD (4.274 − 452)', real: 'Pedidos de 4.274 M USD (+452 M sobre la guía); ventas de 4,08 billones (+22,8 %)', cumplida: 'Sí' },
      { anio: '2026', guia: 'Ventas de 4,35 billones; pedidos de 4.222 M USD, subidos a 5.185 M USD el 6-jul', real: '1S26: ventas de 2,18 billones (50 % de la guía) y pedidos de 3.237 M USD', cumplida: 'En curso' },
    ],
    comentario: 'La dirección tiene buen historial de guías: en 2024 y 2025 superó sus objetivos de pedidos (en 2025, por 452 M USD), que fija con prudencia en enero [7, 9]; no hemos encontrado la cifra de la guía de 2023. En 2026 va en línea en ventas (la mitad de la guía en el primer semestre) y por encima en pedidos, lo que llevó a subir el objetivo un 23 % en julio [6]. El equipo es de la casa y del grupo: el consejero delegado viene de la línea de transformadores y el otro consejero ejecutivo de finanzas del holding [1, 2]. La estabilidad es razonable (un cambio de consejero delegado en 2025, ordenado por el grupo). Ningún directivo tiene una participación relevante; el incentivo lo marca el grupo HD Hyundai.',
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      { nombre: 'Kim Young-gi', cargo: 'Presidente y consejero delegado', tipo: 'Ejecutivo', desde: '2025', comisiones: null },
      { nombre: 'Namgung Hoon', cargo: 'Consejero ejecutivo', tipo: 'Ejecutivo', desde: '2026', comisiones: null },
      { nombre: 'Park Su-hwan', cargo: 'Consejero externo', tipo: 'Independiente', desde: null, comisiones: 'Auditoría (presidente)' },
      { nombre: 'Jeon Sun-ok', cargo: 'Consejera externa', tipo: 'Independiente', desde: '2025', comisiones: 'Auditoría' },
      { nombre: 'Kim Woo-chan', cargo: 'Consejero externo (independiente)', tipo: 'Independiente', desde: '2026', comisiones: 'Auditoría' },
    ],
    presidente_ceo_separados: false,
    presidente_ejecutivo: true,
    consejero_coordinador: false,
    una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: true,
    variable_ligado_rentabilidad: true,
    auditoria_independiente: true,
    insiders_sin_operaciones: false,
    accionista_control: true,
    presidente_vinculado_control: true,
    cambios_cupula_24m: 1,
    voto_remuneracion_pct: 99.7,
    voto_remuneracion_contra_pct: 0.3,
    voto_remuneracion_contra_libre_pct: null,
    voto_cupula_pct: 99.1,
    remuneracion_ceo: 1232,
    remuneracion: 'En 2025 el consejero delegado Kim Young-gi cobró 1.232 M KRW: 728 M de salario y 504 M de variable, ligado según el informe a resultados (ventas, beneficio operativo y pedidos) y a objetivos cualitativos [1]. Su antecesor Cho Seok cobró 664 M por el tiempo en el cargo [1]. En Corea la junta vota un límite global de remuneración de los consejeros, no la política individual: en marzo de 2026 lo aprobó el 99,7 % de los votos emitidos (0,3 % en contra) [2]. Los empleados de la matriz (2.209) cobraron de media unos 131 M KRW [1]. No hay planes de acciones ni opciones.',
    accionistas: [
      { nombre: 'HD Hyundai Co. (holding del grupo)', pct: 35.39, tipo: 'Accionista de control', variacion: '12.756.533 acciones a 30-sep-2026; baja poco a poco por el canje de sus bonos canjeables de noviembre de 2024 [4]' },
      { nombre: 'Fundaciones Asan (Asan Social Welfare y Asan Nanum) y directivos del grupo', pct: 1.67, tipo: 'Partes vinculadas', variacion: '37,06 % con el holding [4]' },
      { nombre: 'Servicio Nacional de Pensiones (NPS)', pct: 8.0, tipo: 'Institucional', variacion: 'Declaración de más del 5 % [8]' },
      { nombre: 'Autocartera', pct: 0.15, tipo: 'Autocartera', variacion: '54.431 acciones [1]' },
      { nombre: 'Capital flotante', pct: 54.8, tipo: 'Flotante', variacion: 'Incluye fondos extranjeros (BlackRock declaró más del 5 % en agosto de 2026) [8]' },
    ],
    insiders: [
      { fecha: '2026-09-30', persona: 'HD Hyundai Co. (accionista de control)', operacion: 'Venta', acciones: 1623, importe: null },
    ],
    control_y_defensas: 'HD Hyundai controla la empresa con el 35,39 % (37,06 % con fundaciones y directivos del grupo), y el grupo lo controla a su vez la familia Chung (Chung Ki-sun, presidente de HD Hyundai) [4]. El consejo tiene cinco miembros, tres independientes (60 %); el presidente es el consejero delegado, propuesto por el grupo [2]. En la junta de marzo de 2026 los accionistas aprobaron quitar del estatuto la exclusión del voto acumulativo (ahora se aplica), por la reforma de la ley de sociedades coreana, lo que facilita que los minoritarios elijan un consejero [2]. Un consejero independiente reelegido en marzo con un 15,7 % de votos en contra dimitió en junio; lo sustituyó en septiembre un exfiscal y exjuez, antiguo auditor de la autoridad financiera (95,0 % a favor) [2, 3]. Operaciones vinculadas: ventas a la filial de EE. UU. y servicios del grupo (marca, sistemas), aprobadas por el consejo [1].',
    alertas: [
      'Filial cotizada de un grupo familiar: el accionista de control decide el consejero delegado y parte del consejo [4].',
      'El holding reduce su participación con bonos canjeables en acciones de la empresa (presión vendedora gradual) [4].',
      'Presidente del consejo y consejero delegado son la misma persona [1].',
    ],
    confianza: 'Alta',
  },
  fuentes: fC,
  huecos: [],
};
guarda('C', C);

// ================================================================ D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de 267260.KS, del KOSPI (^KS11) y de LS Electric (010120.KS) como referencia sectorial; cierres de cada ejercicio, betas, volatilidad y dividendos (sin desdoblamientos)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/267260.KS' },
  { id: 2, titulo: 'Consenso anual 2026e-2028e (media de tres meses de las casas coreanas), objetivos e informes de analistas', editor: 'FnGuide (Naver WiseReport)', tipo: 'Analistas', fecha: '2026-10-16', url: 'https://navercomp.wisereport.co.kr/v2/company/c1050001.aspx?cmp_cd=267260' },
  { id: 3, titulo: 'Brokerages cut price targets, dampening hopes as stock market stabilization fund talk resurfaces (recortes de objetivos a HD Hyundai Electric)', editor: 'MoneyToday (edición inglesa)', tipo: 'Prensa', fecha: '2026-10-19', url: 'https://www.mt.co.kr/en/stock/2026/10/19/2026101915492164073' },
  { id: 4, titulo: 'Stocks in Focus: HD Hyundai Electric cae un 16,9 % tras el 2T26', editor: 'Edaily (edición inglesa)', tipo: 'Prensa', fecha: '2026-07-29', url: 'https://en.edaily.co.kr/news/eda202607295199/' },
  { id: 5, titulo: 'Kospi plunges 5% as tech stocks tumble (caída del KOSPI desde el máximo de junio de 2026)', editor: 'Korea JoongAng Daily', tipo: 'Prensa', fecha: '2026-08', url: 'https://www.koreajoongangdaily.com/business/kospi-plunges-5-as-tech-stocks-tumble/12918482' },
  { id: 6, titulo: 'Fichas de comparables (precio, capitalización, valor empresa, ventas y EBITDA de los últimos doce meses, estimaciones de BPA)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/298040.KS' },
  { id: 7, titulo: 'Rendimiento del bono del Estado coreano a 10 años (KR10YT=RR): 4,154 % al cierre del 19-oct-2026', editor: 'Naver Pay Securities', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://m.stock.naver.com/marketindex/bond/KR10YT=RR' },
  { id: 8, titulo: 'Tipos de cambio KRW=X (1.329,95), EURKRW (1.490,3), CHFKRW (1.613,22), CADKRW (944,35) y JPYKRW (8,384), 19-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/KRW=X' },
  { id: 9, titulo: 'Implied ERP by month (ERPbymonth.xlsx): octubre de 2026, 4,20 %', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 10, titulo: 'GE Vernova to acquire remaining 50% stake of Prolec GE (5.275 M USD)', editor: 'T&D World', tipo: 'Prensa', fecha: '2025-10-21', url: 'https://www.tdworld.com/utility-business/news/55325306/ge-vernova-to-acquire-remaining-50-stake-of-prolec-ge' },
  { id: 11, titulo: 'Eaton acquires Fibrebond Corporation for 1.400 M USD (ventas de 378 M, EBITDA de 110 M)', editor: 'DatacenterDynamics', tipo: 'Prensa', fecha: '2025-03-18', url: 'https://datacenterdynamics.com/en/news/eaton-acquires-fibrebond-corporation-for-14bn' },
  { id: 12, titulo: 'Hubbell to acquire DMC Power for 825 M USD (ventas de 130 M; EBITDA de 2026e de 60 M)', editor: 'Nasdaq / Zacks', tipo: 'Prensa', fecha: '2025-08', url: 'https://www.nasdaq.com/articles/hubbell-acquire-dmc-power-825-mln-all-cash-deal' },
  { id: 13, titulo: 'ABB completes divestment of Power Grids to Hitachi (valor empresa de 11.000 M USD por el 100 %)', editor: 'ABB', tipo: 'Primaria', fecha: '2020-07-01', url: 'https://new.abb.com/news/detail/64657/abb-completes-divestment-of-power-grids-to-hitachi' },
  { id: 14, titulo: 'Aviso de DART: resultados de 2025 (cambio de más del 15 % en ventas y beneficio) y presentaciones de resultados (fechas de 2024-2026)', editor: 'HD Hyundai Electric / DART (FSS)', tipo: 'Primaria', fecha: '2026-01-26', url: DART('20260126800411') },
  { id: 15, titulo: 'Aviso de DART: reuniones con inversores en Singapur y Hong Kong (7-8 oct-2026)', editor: 'HD Hyundai Electric / DART (FSS)', tipo: 'Primaria', fecha: '2026-09-30', url: DART('20260930801077') },
  { id: 16, titulo: 'Ficha de la acción en Naver: cierre de 522.000 KRW (KRX/NXT), máximo de 52 semanas de 1.449.000 y mínimo de 473.000, capitalización de 18,82 billones', editor: 'Naver Pay Securities', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://m.stock.naver.com/domestic/stock/267260/total' },
];
const blend = (e0, e1, w0 = 0.2) => w0 * e0 + (1 - w0) * e1; // próximos 12 meses desde el 19-oct: 2,4 meses de 2026 y 9,6 de 2027
const pesoE0 = { 'ENR.DE': 0.0, '6501.T': 0.45 }; // Siemens Energy: ejercicio a sep (el FY26 ya está cerrado); Hitachi: a marzo
const r1 = (x) => (x == null || !isFinite(x) ? null : Math.round(x * 10) / 10);
const r2 = (x) => (x == null || !isFinite(x) ? null : Math.round(x * 100) / 100);
const nombres = { '298040.KS': ['Hyosung Heavy Industries', 'KR'], '010120.KS': ['LS Electric', 'KR'], '103590.KS': ['Iljin Electric', 'KR'], 'ENR.DE': ['Siemens Energy', 'DE'], GEV: ['GE Vernova', 'US'], 'SU.PA': ['Schneider Electric', 'FR'], 'ABBN.SW': ['ABB', 'CH'], ETN: ['Eaton', 'US'], 'HPS-A.TO': ['Hammond Power Solutions', 'CA'], '6501.T': ['Hitachi', 'JP'], HUBB: ['Hubbell', 'US'] };
const comparables = compsRaw.filter((c) => nombres[c.s]).map((c) => {
  const fxP = FX[c.cur], fxF = FX[c.fcur];
  const e0 = c.et.find((t) => t.p === '0y'); const e1 = c.et.find((t) => t.p === '+1y');
  const w0 = pesoE0[c.s] ?? 0.2;
  const epsN = e0?.eps && e1?.eps ? blend(e0.eps, e1.eps, w0) : null;
  const revN = e0?.rev && e1?.rev ? blend(e0.rev, e1.rev, w0) : null;
  return {
    nombre: nombres[c.s][0], ticker: c.s, pais: nombres[c.s][1],
    capitalizacion: Math.round((c.mcap * fxP) / 1e6),
    ev_ventas: r2(c.evRev), ev_ebitda_ltm: r1(c.evEbitda), ev_ebitda_ntm: null,
    per_ntm: epsN ? r1(c.price * (fxP / fxF) / epsN) : null,
    crecimiento_pct: revN && c.rev ? r1((revN / c.rev - 1) * 100) : null,
    margen_ebitda_pct: c.ebitda && c.rev ? r1((c.ebitda / c.rev) * 100) : null,
    roic_pct: null,
    dn_ebitda: c.ebitda ? r2((c.debt - c.cash) / c.ebitda) : null,
    fcf_yield_pct: c.fcf != null ? r1((c.fcf * fxF) / (c.mcap * fxP) * 100) : null,
  };
});
const cl = Object.fromEntries(bolsa.cierres_ejercicio.map((x) => [x.anio, x.precio_cierre]));
// PER de los próximos doce meses «realizado»: cierre de cada año ÷ BPA real del año siguiente (2025: ÷ consenso de 2026e).
const bpaSig = { 2021: 4514, 2022: 7200, 2023: 13935, 2024: 20354, 2025: 25677 };
const D = {
  _estado: 'completa',
  identificacion: {
    nombre: 'HD Hyundai Electric Co., Ltd.', nombre_corto: 'HD Hyundai Electric', ticker: '267260', isin: 'KR7267260008', mercado: 'KOSPI (Korea Exchange)', indice_referencia: 'KOSPI',
    pais: 'Corea del Sur', pais_iso: 'KR', sector: 'Industrials', industria: 'Electrical Equipment (Heavy Electrical Equipment)', sede: 'Seongnam (Bundang-gu, Gyeonggi-do)', fundacion: '2017', empleados: 2209, web: 'https://www.hd-hyundaielectric.com',
    precio: bolsa.identificacion.precio, fecha_precio: bolsa.identificacion.fecha_precio, acciones: 35.99, capitalizacion_publicada: 18896200, free_float_pct: 54.8,
    max_52s: 1430000, min_52s: 473500, volumen_medio_diario: '≈ 101.600 M KRW/día (3 meses; 147.665 acciones)', proximos_resultados: '2026-10-22',
  },
  consenso: {
    guidance: 'Guía de 2026 dada en enero: ventas de 4,35 billones de KRW (+6,6 %) y pedidos de 4.222 M USD; el 6-jul-2026 subió los pedidos a 5.185 M USD (+23 %) y mantuvo las ventas [A9]. No da guía de margen. A medio plazo, el plan de mejora del valor fija ventas de 4,74 billones en 2027 y un ROE medio del 30 % en 2025-2027 [A11]. La empresa suele dar la guía con prudencia y superarla (nota C).',
    estimaciones: [
      { periodo: '2026e', ingresos: 4647300, ebitda: 1290900, ebit: 1206100, bpa: 25677, dpa: 8705, fuente: 'FnGuide, media de 3 meses a 16-oct-2026 [2]' },
      { periodo: '2027e', ingresos: 5459100, ebitda: null, ebit: 1516000, bpa: 32314, dpa: null, fuente: 'FnGuide [2]' },
      { periodo: '2028e', ingresos: 6354000, ebitda: null, ebit: 1848900, bpa: 39584, dpa: null, fuente: 'FnGuide [2]' },
    ],
    recomendaciones: { n_analistas: 18, comprar: 18, mantener: 0, vender: 0, po_medio: 1083056, po_min: 900000, po_max: 1430000 },
    revisiones: 'Los BPA apenas se han movido (Yahoo: 25.951 KRW en 2026e y 33.087 en 2027e con 23 analistas, casi igual que FnGuide) [2, 6], pero los objetivos bajan: en octubre recortaron Mirae, Korea Investment, LS, Daewoo y Hana (de 1,44 M a 1,15 M KRW el 7-oct, por el won más fuerte), y la prensa del 19-oct recoge más recortes antes de los resultados del 3T [2, 3]. El consenso del 3T26 es de 1,17 billones de ventas y 306.500 M de beneficio operativo [2]. Todos recomiendan comprar con un objetivo medio de 1,08 M KRW, el doble del precio: el consenso no ha seguido a la acción.',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    ...bolsa.bolsa,
    posicion_corta_pct: null,
    comentario: 'La caída del 63 % desde máximos que marcaba el escáner es real: de 1.430.000 KRW de cierre el 7-may-2026 a 525.000 el 19-oct (−63,3 %; −65,6 % hasta el mínimo de 473.500 del 15-oct) [1]. No es un error de datos ni un desdoblamiento: Yahoo no registra ningún desdoblamiento (solo dividendos de 5.200, 1.300 y 1.300 KRW), el volumen es normal y Naver da los mismos precios (cierre de 522.000, máximo de 1.449.000 y mínimo de 473.000 en 52 semanas) [1, 16]. Tres causas: (1) el sector entero cayó desde el mismo 7-may (Hyosung Heavy −57,9 %, LS Electric −48,3 %) por dudas sobre el gasto en inteligencia artificial y la rotación de los fondos [1, 6]; (2) el KOSPI cayó un 36,7 % desde su máximo de junio (de 9.115 a 5.768) con las dudas sobre Samsung y SK Hynix y las ventas de extranjeros [5]; (3) lo propio: −16,9 % el 29-jul tras el 2T26 por el retraso de la distribución en EE. UU. y unas devoluciones de aranceles pequeñas, y recortes de objetivos por el won fuerte (1.330 KRW/USD) [3, 4]. El múltiplo bajó de 38 veces el beneficio de 2025 a 22 veces el de los últimos doce meses mientras el beneficio subía.',
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: ['2021', '2022', '2023', '2024', '2025'].map((a) => ({ anio: a, precio_cierre: cl[a], ev_ebitda_ntm: null, per_ntm: r1(cl[a] / bpaSig[a]), excluir: a === '2021' })),
    comentario: 'El PER de los doce meses siguientes «realizado» (cierre de cada año ÷ BPA real del año siguiente) pasó de 4-6 veces en 2021-2023, cuando nadie esperaba el ciclo, a 18,8 veces en 2024 y 30 veces en 2025 (con el consenso de 2026). Al cierre de cada año, sobre el beneficio del propio año, fue de 9,4 veces en 2022, 11,4 en 2023, 27,4 en 2024 y 38,0 en 2025 (la empresa da 27,45 y 38,03 en su plan de valor) [A11]. Hoy cotiza a 20,4 veces el BPA de consenso de 2026e y a 16,2 veces el de 2027e: el mercado ya ha quitado la prima de 2025 y descuenta que el beneficio de pico no dura. 2021 se excluye: el BPA de 2022 lleva 85.777 M de otros ingresos y casi no paga impuestos (nota A).',
    confianza: 'Alta',
  },
  comparables: {
    criterio: 'Fabricantes cotizados de transformadores y equipos de red: los tres coreanos (Hyosung Heavy, LS Electric, Iljin Electric), los grandes occidentales con negocio de red (Siemens Energy, GE Vernova, Hitachi, ABB, Schneider, Eaton, Hubbell) y Hammond Power (transformadores en Norteamérica). Los occidentales son conglomerados con más servicio y software y mayor calidad de beneficio, por eso cotizan con prima; los coreanos son la comparación más pura. Hitachi Energy y Prolec GE no cotizan por separado. PER de los próximos doce meses con el consenso de Yahoo (2026e y 2027e ponderados; Siemens Energy y Hitachi con sus ejercicios no naturales).',
    empresas: comparables,
    comentario: 'Los comparables coreanos cotizan a 16-35 veces el BPA de los próximos doce meses (Iljin a 16, Hyosung a 17, LS Electric a 35) y los occidentales a 20-36; la mediana de los once es de 21,1 veces. HD Hyundai Electric, con el margen más alto del grupo (EBITDA del 27 % frente al 14 % de Hyosung y el 12 % de LS), cotiza a unas 17 veces el consenso de los próximos doce meses: en la parte baja, con los coreanos de menos calidad. El descuento frente a los occidentales tiene tres razones: es un fabricante puro de equipos (más cíclico, sin servicio), está en el mercado coreano (descuento de gobierno corporativo y del won) y sus márgenes están en máximos. Por EV/EBITDA de los últimos doce meses (15,2 veces) está por debajo de todos salvo Iljin.',
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2025-10', objetivo: 'Prolec GE (50 % restante)', comprador: 'GE Vernova', ev: Math.round(10550 * FX.USD), ev_ventas: 3.5, ev_ebitda: 14.1, prima_pct: null, excluir: false, comentario: '5.275 M USD por el 50 % = 10.550 M USD por el 100 %; ventas de 2025 de ≈ 3.000 M USD con un margen EBITDA de ≈ 25 % (estimación propia con datos de la operación) [10].' },
      { fecha: '2025-03', objetivo: 'Fibrebond (salas eléctricas modulares)', comprador: 'Eaton', ev: Math.round(1400 * FX.USD), ev_ventas: 3.7, ev_ebitda: 12.7, prima_pct: null, excluir: false, comentario: 'Ventas de 378 M USD y EBITDA de 110 M [11].' },
      { fecha: '2025-08', objetivo: 'DMC Power (conectores de alta tensión)', comprador: 'Hubbell', ev: Math.round(825 * FX.USD), ev_ventas: 6.3, ev_ebitda: 13.8, prima_pct: null, excluir: false, comentario: 'Ventas de 130 M USD; múltiplo sobre el EBITDA de 2026e (60 M) [12].' },
      { fecha: '2018-12', objetivo: 'ABB Power Grids (80,1 %, después 100 %)', comprador: 'Hitachi', ev: Math.round(11000 * FX.USD), ev_ventas: 1.1, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Valor empresa de 11.000 M USD por el 100 %, 11,2 veces el EBITA, en el fondo del ciclo anterior [13].' },
      { fecha: '2022-04', objetivo: 'Plaspo', comprador: 'HD Hyundai Electric', ev: 14416, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: true, comentario: 'Compra pequeña de aparamenta de baja tensión; sin múltiplo publicado [A4].' },
    ],
    comentario: 'Las compras recientes de equipos de red se pagaron a 12,7-14,1 veces el EBITDA (Prolec GE, Fibrebond, DMC Power), y la de ABB Power Grids, en el fondo del ciclo anterior, a 11 veces el EBITA. HD Hyundai Electric vale en bolsa 15,2 veces el EBITDA de los últimos doce meses, algo por encima de esas operaciones, pero sobre un EBITDA en máximos de ciclo (margen del 27 %). Con un margen de ciclo medio (15-18 %), el mismo valor empresa sería unas 25 veces el EBITDA. No hay posibilidad práctica de una opa: la controla el grupo HD Hyundai.',
    confianza: 'Media',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'bolsa', campo: 'Posición corta', tipo: 'Complemento', intentos: '1) KRX, saldo de préstamo y posición corta (sin acceso desde este entorno); 2) FnGuide (no la publica); 3) foro de Naver (cifras sin verificar)', decision: 'Omitido' },
    { seccion: 'multiplos_historicos', campo: 'EV/EBITDA y PER de los próximos 12 meses con el consenso de cada momento', tipo: 'Complemento', intentos: '1) FnGuide (solo PER de cierre); 2) Yahoo (sin histórico de estimaciones); 3) informes de analistas (sin acceso a bandas históricas)', decision: 'Sustituido por el PER «realizado» con el BPA real del año siguiente' },
  ],
};
guarda('D', D);

// ================================================================ E. Sentimiento
const fE = [
  { id: 1, titulo: 'Foro de Naver (종목토론실) de 267260: 1.200 mensajes del 19-ago al 19-oct-2026', editor: 'Naver Pay Securities', tipo: 'Foros y redes', fecha: '2026-10-19', url: 'https://m.stock.naver.com/domestic/stock/267260/discussion' },
  { id: 2, titulo: 'HD Hyundai Heavy Shares Halve to 351,500 Won as Union Plans Walkout (huelga en el grupo HD Hyundai)', editor: 'Seoul Economic Daily (edición inglesa)', tipo: 'Prensa', fecha: '2026-10-18', url: 'https://en.sedaily.com/finance/2026/10/18/hd-hyundai-heavy-shares-halve-to-351500-won-as-union-plans' },
  { id: 3, titulo: 'Brokerages cut price targets, dampening hopes as stock market stabilization fund talk resurfaces', editor: 'MoneyToday (edición inglesa)', tipo: 'Prensa', fecha: '2026-10-19', url: 'https://www.mt.co.kr/en/stock/2026/10/19/2026101915492164073' },
];
const E = {
  _estado: 'completa',
  sentimiento: {
    tono: 'Negativo',
    tendencia: 'Empeora',
    revisadas: [
      { plataforma: 'Foro de Naver (종목토론실), octubre de 2026', fecha: '2026-10', n_comentarios: 600, tono: 'Negativo', resumen: 'Capitulación: «−70 % desde máximos», rabia contra las casas de análisis que mantienen objetivos de 1 M KRW mientras recortan, contra el Gobierno y el KOSPI; algunos hablan de un «valor justo de 300.000» y de vender para pasarse a SK Hynix; peticiones de recompra de acciones a la empresa [1, 3].' },
      { plataforma: 'Foro de Naver, septiembre de 2026', fecha: '2026-09', n_comentarios: 400, tono: 'Negativo', resumen: 'Particulares que promedian a la baja y dudan; quejas por la presión vendedora de los extranjeros y por el canje de los bonos del holding [1].' },
      { plataforma: 'Foro de Naver, finales de agosto de 2026', fecha: '2026-08', n_comentarios: 200, tono: 'Dividido', resumen: 'Tras el 2T26: miedo por la huelga del sindicato del grupo y el comentario sobre la distribución en EE. UU.; optimismo por el antidumping al 0,00 % y la fábrica de Alabama [1, 2].' },
    ],
    temas: [
      { tema: 'El ciclo de transformadores ha tocado techo', postura: 'Bajista', peso: 'Alto', contraste: 'Parcialmente cierto: el margen está en máximos y la competencia amplía capacidad para 2027-2029 (nota B), pero la cartera de 8.490 M USD y los pedidos de 2026 por encima de la guía (nota A) dan dos años de visibilidad.' },
      { tema: 'Las casas de análisis no bajan sus objetivos lo suficiente', postura: 'Bajista', peso: 'Medio', contraste: 'Cierto: 18 de 18 recomiendan comprar con un objetivo medio que dobla el precio; los recortes de octubre son de un 10-20 % (nota D).' },
      { tema: 'Arancel cero en EE. UU. y fábrica de Alabama', postura: 'Alcista', peso: 'Medio', contraste: 'Cierto: margen antidumping del 0,00 % frente al 4,32 % de Hyosung y LS (nota B), aunque se revisa cada año.' },
      { tema: 'La empresa debería recomprar acciones', postura: 'Alcista', peso: 'Medio', contraste: 'Tiene 1,01 billones de caja y no recompra; la política es de dividendo (nota A).' },
      { tema: 'El mercado coreano y los extranjeros arrastran la acción', postura: 'Bajista', peso: 'Alto', contraste: 'Cierto: el KOSPI ha caído un 37 % desde junio y el sector un 50-60 % desde mayo (nota D).' },
    ],
    lectura: 'El sentimiento de los particulares coreanos es de capitulación, con la acción un 63 % por debajo del máximo de mayo y los foros llenos de vendedores que se pasan a los semiconductores. Coincide con los datos en lo esencial (el margen está en máximos de ciclo y el mercado coreano está en plena corrección) y exagera en lo demás: el beneficio de los últimos doce meses sigue subiendo (+27 % en el 1S26) y la cartera de pedidos crece. Va en contra del consenso de analistas, unánime en comprar. Para un inversor de valor, este pesimismo es una condición necesaria para comprar, no suficiente: el precio tiene que pagar el riesgo de que el margen vuelva a su media.',
    confianza: 'Media',
  },
  fuentes: fE,
  huecos: [],
};
guarda('E', E);
console.log('Notas A-E escritas;', comparables.length, 'comparables:', comparables.map((c) => `${c.nombre} PER ${c.per_ntm}`).join(', '));
