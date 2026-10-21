// Escribe las notas A-E de SHIFT Inc. (3697.T, corte 2026-10-21) a partir de los documentos de notas/docs (tanshin,
// databook, presentaciones, transcripciones, yuho y avisos de TDnet descargados de la lista pública de xj-storage de la
// empresa), de bolsa.json (bolsa.mjs, cierre del 21-oct-2026), de yahoo-datos.json (Yahoo quoteSummary del 21-oct-2026,
// cierre de Tokio a las 15:30) y de la prensa japonesa. Cada nota cita solo con [n] de su propia lista de fuentes.
// No hay XBRL en cuentas.mjs para Japón: cifras copiadas a mano de los tanshin (J-GAAP) y comprobadas con el yuho.
// Ejecutar: node informes/shift-2026-10-21/notas/construir-notas.mjs
// Ejercicio de septiembre a agosto, etiquetado por el año en que TERMINA (el de la empresa): FY2026 = sep-2025 a ago-2026.
// Split 15:1 del 24-ene-2025: todos los BPA y cierres están divididos por 15.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const lee = (f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const r1 = (x) => (x == null ? null : Math.round(x * 10) / 10);
const r2 = (x) => (x == null ? null : Math.round(x * 100) / 100);
const n2 = (x) => String(x).replace('.', ',');
const B = lee('bolsa.json');
const Y = lee('yahoo-datos.json').datos;
const MAN = lee('docs/_manifest.json');
const U = (k) => MAN[k]?.url ?? null;

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Consolidated Financial Results for the Fiscal Year Ended August 31, 2026 [Japanese GAAP] (tanshin anual: cuenta, balance, flujos, segmentos, guía del año a ago-2027)', editor: 'SHIFT Inc. (TDnet)', tipo: 'Primaria', fecha: '2026-10-15', url: U('tanshin-fy2026-en') },
  { id: 2, titulo: 'Data Book FY2026 (trimestres, EBITDA, resultado ajustado, KPI de precio por proyecto, ventas de IA)', editor: 'SHIFT Inc.', tipo: 'Primaria', fecha: '2026-10-15', url: U('databook-fy2026-en') },
  { id: 3, titulo: 'Presentation Material for the Fiscal Year Ended August 2026 (resultados, crecimiento orgánico y comprado, IA, plantilla, plan SHIFT3000)', editor: 'SHIFT Inc.', tipo: 'Primaria', fecha: '2026-10-15', url: U('resultados-fy2026-en') },
  { id: 4, titulo: 'Transcripción de la presentación de resultados de FY2026 (preguntas de analistas: ocupación, contratación, IA, margen)', editor: 'SHIFT Inc.', tipo: 'Primaria', fecha: '2026-10-19', url: U('transcripcion-fy2026-en') },
  { id: 5, titulo: 'Consolidated Financial Results for the Fiscal Year Ended August 31, 2025 [Japanese GAAP] (cuenta FY2024 reexpresada, guía de FY2026)', editor: 'SHIFT Inc. (TDnet)', tipo: 'Primaria', fecha: '2025-10-14', url: U('tanshin-fy2025-en') },
  { id: 6, titulo: 'Consolidated Financial Results for the Fiscal Year Ended August 31, 2024 [Japanese GAAP] (guía de FY2025)', editor: 'SHIFT Inc. (TDnet)', tipo: 'Primaria', fecha: '2024-10-10', url: U('tanshin-fy2024-en') },
  { id: 7, titulo: 'Annual Securities Report (estados financieros) del ejercicio a ago-2023: cuenta, balance y flujos de FY2022-FY2023', editor: 'SHIFT Inc.', tipo: 'Primaria', fecha: '2024-01-17', url: U('yuho-fy2023-en') },
  { id: 8, titulo: '有価証券報告書 del ejercicio a ago-2025 (resumen de cinco años, empleados, salario medio, auditor, riesgos)', editor: 'SHIFT Inc. (EDINET)', tipo: 'Primaria', fecha: '2025-11-26', url: U('yuho-fy2025-ja') },
  { id: 9, titulo: 'Annual Securities Report (estados financieros en inglés) del ejercicio a ago-2025: compra del 33 % de Rise Consulting Group, notas', editor: 'SHIFT Inc.', tipo: 'Primaria', fecha: '2026-01-14', url: U('yuho-fy2025-en') },
  { id: 10, titulo: 'Notice Regarding Revision of Full-Year Forecasts (deterioro de Rise Consulting Group, julio de 2026)', editor: 'SHIFT Inc. (TDnet)', tipo: 'Primaria', fecha: '2026-07-15', url: U('revision-previsiones-2026-07-en') },
  { id: 11, titulo: 'Notice on Capital Policy (80 % del beneficio retenido y 20 % devuelto hasta FY2028; compras con capital externo)', editor: 'SHIFT Inc. (TDnet)', tipo: 'Primaria', fecha: '2026-07-15', url: U('capital-2026-07-en') },
  { id: 12, titulo: 'Notice of Acquisition of Shares of Nisseicom Limited (compra del 100 % por ≈ 20.486 M JPY)', editor: 'SHIFT Inc. (TDnet)', tipo: 'Primaria', fecha: '2026-01-14', url: U('nisseicom-2026-01-en') },
  { id: 13, titulo: 'Notice Regarding Establishment of a Joint Fund with Tokyo Gas (15.000 M JPY; SHIFT 32,3 %)', editor: 'SHIFT Inc. (TDnet)', tipo: 'Primaria', fecha: '2026-10-15', url: U('tokyogas-2026-10-en') },
  { id: 14, titulo: 'Notice Regarding Change in Reportable Segments (consultoría, desarrollo, pruebas, BPaaS, plataforma de inversión)', editor: 'SHIFT Inc. (TDnet)', tipo: 'Primaria', fecha: '2026-10-15', url: U('segmentos-2026-10-en') },
  { id: 15, titulo: 'Notice of Dividend (primer dividendo: 4,53 JPY con fecha de registro 31-ago-2026)', editor: 'SHIFT Inc. (TDnet)', tipo: 'Primaria', fecha: '2026-10-15', url: U('dividendo-2026-10-en') },
  { id: 16, titulo: 'Notice of Expected Non-Operating Expenses and Extraordinary Losses (Rise Consulting Group y Gurunavi)', editor: 'SHIFT Inc. (TDnet)', tipo: 'Primaria', fecha: '2026-05-29', url: U('extraordinario-2026-05-en') },
  { id: 17, titulo: 'Notice of Completion of Share Buyback (7,9 M de acciones, ≈ 6.547 M JPY)', editor: 'SHIFT Inc. (TDnet)', tipo: 'Primaria', fecha: '2026-01-28', url: U('recompra-2026-01-en') },
  { id: 18, titulo: 'Tanshin y presentación del tercer trimestre de FY2026', editor: 'SHIFT Inc. (TDnet)', tipo: 'Primaria', fecha: '2026-07-15', url: U('tanshin-3t-fy2026-en') },
];

// Cuenta (M JPY, J-GAAP). EBITDA del motor = resultado operativo + amortización del inmovilizado + amortización del fondo de
// comercio, que coincide con el EBITDA que publica la empresa [A2]. resultado_financiero = BAI − resultado operativo:
// incluye los no operativos (participadas por puesta en equivalencia) y los extraordinarios (deterioros), para cuadrar.
// FY2024 con las cifras reexpresadas del tanshin de FY2025 [A5]. BPA básico (el diluido es casi igual), ya /15.
const C_ = [
  // periodo, ingresos, coste, generales, ebit, bai, impuestos, minoritarios, bn, bpa, dpa, amort(dep+fc), gastoFin, acciones diluidas
  ['FY2022', 64873, 43773, 14186, 6913, 7460, 2355, 131, 4974, 18.85, 0, 564 + 892, 14, 264.83],
  ['FY2023', 88030, 58086, 18378, 11565, 10153, 3667, 239, 6245, 23.64, 0, 692 + 1028, 19, 264.63],
  ['FY2024', 110627, 75267, 24823, 10537, 9032, 3786, 118, 5127, 19.43, 0, 1435 + 1451, 57, 264.16],
  ['FY2025', 129819, 84803, 29387, 15628, 13674, 4669, 69, 8935, 33.93, 0, 1845 + 1394, 117, 263.61],
  ['FY2026', 161600, 107398, 36756, 17445, 12891, 5501, -39, 7430, 28.72, 4.53, 2297 + 1861, 361, 259.00],
];
const cuenta = C_.map(([periodo, ingresos, coste_ventas, gastos_generales, ebit, bai, impuestos, minoritarios, beneficio_neto, bpa, dpa, amortizaciones, gastos_financieros, acciones_diluidas]) => ({
  periodo, ingresos, coste_ventas, gastos_generales, ebitda: ebit + amortizaciones, amortizaciones, ebit, resultado_financiero: bai - ebit, bai, impuestos, minoritarios, beneficio_neto,
  gastos_financieros, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa, dpa, dpa_extraordinario: 0, acciones_diluidas,
}));
// Balance al 31-ago. proveedores = pasivo corriente − deuda a corto − impuesto sobre beneficios a pagar (cuentas a pagar,
// gastos devengados de personal, impuesto sobre el consumo, provisiones de bonus y otros). clientes = cuentas a cobrar +
// activos de contrato. intangibles = otros intangibles con los de clientes de las compras. Sin arrendamientos (J-GAAP).
const B_ = [
  // periodo, activo, act.corr, pas.corr, pas.total, fc, intang, inmov, exist, clientes, proveedores, caja, deuda, patrimonio, minoritarios, reservas
  ['FY2022', 40230, 22423, 11726, 14222, 6488, 972, 1194, 799, 7981, 11726 - 1246 - 1523, 12921, 3552, 25592, 359, 11655],
  ['FY2023', 49530, 30513, 18319, 19951, 8997, 1431, 1961, 733, 11048, 18319 - 3536 - 2807, 17591, 4903, 28957, 451, 17901],
  ['FY2024', 62717, 37022, 19653, 28195, 9262, 4615, 6818, 977, 13805, 19653 - 2906 - 2012, 20869, 9577, 33685, 482, 23029],
  ['FY2025', 77001, 43123, 25028, 35963, 7866, 4321, 7923, 1626, 15400, 25028 - 3532 - 3158, 23726, 12036, 40598, 0, 31964],
  ['FY2026', 109685, 61300, 33858, 67487, 22344, 5524, 8486, 1832, 24527, 33858 - 7175 - 3881, 31097, 34713, 41559, 145, 39394],
];
const balance = B_.map(([periodo, activo_total, activo_corriente, pasivo_corriente, pasivo_total, fondo_comercio, intangibles, inmovilizado_material, existencias, clientes, proveedores, caja, deuda_financiera, patrimonio_neto, minoritarios, reservas]) => ({
  periodo, activo_total, activo_corriente, pasivo_corriente, pasivo_total, fondo_comercio, intangibles, inmovilizado_material, existencias, clientes, proveedores,
  activos_contrato: null, pasivos_contrato: null, caja, deuda_financiera, arrendamientos: 0, patrimonio_neto, minoritarios, reservas,
}));
// Flujos: capex = inmovilizado material + intangible; adquisiciones = compra de filiales con cambio de perímetro, negocios y
// participadas (Rise en FY2025); recompras; emisión = ampliaciones y aportaciones de minoritarios.
const F_ = [
  ['FY2022', 7392, 651 + 117, 52 + 260, 0, 1999, 248],
  ['FY2023', 10248, 1145 + 111, 2864 + 1000, 0, 2001, 3],
  ['FY2024', 9088, 5652 + 59, 4624, 0, 2, 9],
  ['FY2025', 15652, 1323 + 155, 1017 + 7668, 0, 999, 0],
  ['FY2026', 13723, 1095 + 568, 20982, 0, 6547, 186],
];
const flujos = F_.map(([periodo, flujo_operativo, capex, adquisiciones, dividendos, recompras, emision_acciones]) => ({
  periodo, flujo_operativo, capex, pagos_arrendamientos: 0, adquisiciones, desinversiones: 0, dividendos, recompras, emision_acciones, intereses_en_financiacion: 0,
}));
const trim = (p, ing, prev, ebitda, org = null) => ({ periodo: p, ingresos: ing, crecimiento_pct: prev ? r1((ing / prev - 1) * 100) : null, crecimiento_organico_pct: org, ebitda, margen_ebitda_pct: r1(ebitda / ing * 100), bpa: null, vs_consenso: null });

const A = {
  _estado: 'Completa. Sin XBRL en cuentas.mjs para Japón: cuenta, balance y flujos FY2022-FY2026 copiados de los tanshin J-GAAP en inglés y del yuho (resumen de cinco años en japonés). Ejercicio de septiembre a agosto etiquetado por el año en que termina (FY2026 = sep-2025 a ago-2026), igual que la empresa. Crecimiento orgánico y comprado: el que publica la empresa en la presentación de FY2026 [3].',
  financieros: {
    cuenta,
    ltm: { periodo: 'FY2026', fecha_fin: '2026-08-31', ingresos: 161600, ebitda: 21603, ebit: 17445, beneficio_neto: 7430, bpa: 28.72, dpa: 4.53, dpa_extraordinario: 0, fcf: 13723 - 1663, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [
      { periodo: 'FY2023', descripcion: 'Compras de varias empresas de desarrollo y personal técnico (≈ 3.864 M JPY de salida de caja) [7].' },
      { periodo: 'FY2024', descripcion: 'HumanSystem y Club Nets, entre otras (4.624 M JPY) [6].' },
      { periodo: 'FY2025', descripcion: 'Compra del 33 % de Rise Consulting Group (7.668 M JPY), por puesta en equivalencia desde el 31-may-2025 [9].' },
      { periodo: 'FY2026', descripcion: 'Nisseicom (100 % por ≈ 20.486 M JPY, ventas ≈ 20.000 M al año, consolidada desde el 3T) y STEP; 20.982 M de salida de caja por compras de filiales; el crecimiento comprado aportó ≈ 8.700 M de ventas de los 31.800 M de aumento [1, 3, 12].' },
    ],
    comentario: 'Las ventas pasaron de 64.873 M JPY en FY2022 a 161.600 M en FY2026 (TCAC del 25,6 %), con compras cada año [1, 7]. En FY2026 crecieron un 24,5 %: ≈ 23.100 M orgánicos (+17,8 %) y ≈ 8.700 M de compras (Nisseicom y STEP) [3]. El resultado operativo J-GAAP (después de amortizar el fondo de comercio) subió de 6.913 M a 17.445 M, pero el margen bajó del 12,0 % de FY2025 al 10,8 % por el margen bruto (33,5 %, −1,1 puntos: ingenieros jóvenes contratados en el 1T que tardaron seis meses en ser productivos) y por las amortizaciones de las compras [1, 4]. El beneficio neto cayó un 16,8 % (7.430 M) por la pérdida de 3.861 M de Rise Consulting Group, una participada por puesta en equivalencia que se deterioró en el 3T, y 859 M de pérdidas extraordinarias [1, 10]. El EBITDA del informe es el de la empresa: resultado operativo + amortización + amortización del fondo de comercio (21.604 M, 13,4 %) [2]. Pérdidas extraordinarias todos los años por deterioros de filiales y participaciones: 2.263 M (FY2023), 2.053 M, 1.624 M y 859 M [1, 5, 7].',
    ajustes: 'La empresa publica un resultado «ajustado» que suma la amortización del fondo de comercio y de los intangibles de clientes y los costes de las compras: resultado operativo ajustado de 20.259 M y BPA ajustado de 39,12 JPY en FY2026 [2]. El informe usa el BPA básico J-GAAP (28,72 JPY), después de amortizar el fondo de comercio, que es la base de la guía de BPA básico de FY2027 (52,16 JPY) y del consenso (54,06) [1]. BPA de FY2026 sin la pérdida de Rise: ≈ 43,6 JPY. Split 15:1 del 24-ene-2025 aplicado a toda la historia [5].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      trim('1T FY2025', 30174, 25073, 4317), trim('2T FY2025', 31513, 27231, 5334), trim('3T FY2025', 33723, 28838, 4654), trim('4T FY2025', 34407, 29484, 4562),
      trim('1T FY2026', 34845, 30174, 3642), trim('2T FY2026', 37190, 31513, 4947), trim('3T FY2026', 43812, 33723, 5539), trim('4T FY2026', 45752, 34407, 7474),
    ],
    ultima_presentacion: 'Resultados de FY2026 (15-oct-2026): ventas de 161.600 M JPY (+24,5 %), resultado operativo ajustado de 20.259 M (+14,8 %) y EBITDA de 21.604 M; el 4T fue el mejor trimestre (ventas 45.752 M, +33 %; EBITDA 7.474 M, 16,3 %) [1, 2]. Guía de FY2027 sin compras nuevas: ventas de 190.000 M (+17,6 %), resultado operativo ajustado de 25.000 M y BPA básico de 52,16 JPY; caso ambicioso de 200.000 M [1, 3]. Plan SHIFT3000: 300.000 M de ventas y 52.500 M de resultado ajustado en FY2031 (≈ 20.000 M orgánicos y ≈ 6.000 M comprados al año) [3]. KPI: precio por proyecto de la matriz de 4.575 miles de JPY al mes en el 4T, 4.777 proyectos (3.851 un año antes), continuidad de clientes del 93,2 % [2, 3]. Las ventas con IA («With AI» y «AI Native») pasaron del 2,7 % al 28,4 % de las ventas consolidadas entre el 1T y el 4T, con margen bruto del 42,3 % y 54,7 % frente al 31,9 % del trabajo tradicional; al mismo tiempo las pruebas tradicionales bajaron del 42,3 % al 18,7 % de las ventas: buena parte es trabajo que antes se vendía sin IA [3]. En la sesión de preguntas el consejero delegado dijo que en el 2T dieron por hecho que los ingenieros de ≤ 6 M JPY de salario serían sustituidos por la IA y dejaron de contratar ingenieros; que no publican el número de ingenieros porque su KPI es el precio por proyecto; y que la ocupación del 4T es de las más altas de su historia (objetivo del 92 %) [4]. Primer dividendo (4,53 JPY) y fondo con Tokyo Gas de 15.000 M para compras [13, 15].',
    confianza: 'Alta',
  },
  balance: {
    historico: balance,
    vencimientos: [{ anio: 'FY2027', importe: 7175 }, { anio: 'FY2028-FY2031', importe: 27538 }],
    liquidez: 'Caja de 31.097 M JPY a 31-ago-2026 frente a 34.713 M de préstamos (7.175 a corto y 27.538 a largo): deuda neta de ≈ 3.600 M, ≈ 0,2 veces el EBITDA [1]. La deuda se triplicó en FY2026 (27.400 M de préstamos nuevos) para pagar Nisseicom (≈ 20.500 M) y la recompra (6.547 M) [1, 12, 17].',
    rating: 'Sin calificación crediticia pública',
    coste_deuda_pct: 1.2,
    vida_media_anios: null,
    otros_pasivos: 'Obligaciones por pensiones de 3.477 M JPY (planes de prestación definida de filiales compradas) [1]. Sin arrendamientos en balance (J-GAAP): los alquileres de oficinas van en gastos. Inversiones financieras de 4.961 M, con la participación del 33 % en Rise Consulting Group (cotizada, 9168.T) por puesta en equivalencia [1, 9].',
    comentario: 'El balance ha cambiado con las compras: el fondo de comercio pasó de 7.866 M a 22.344 M JPY en FY2026 (Nisseicom) y, con los intangibles de clientes, es ≈ 69 % del patrimonio neto (41.559 M) [1, 11]. El fondo de comercio se amortiza (J-GAAP: 1.861 M en FY2026, ≈ 2.000-2.300 M en FY2027) y se deteriora con frecuencia: pérdidas extraordinarias por deterioro de filiales en cada uno de los últimos cuatro años [1, 5]. El circulante operativo es pequeño: cuentas a cobrar y activos de contrato (24.527 M, 55 días de ventas del 4T) casi compensados por los gastos de personal devengados, impuestos indirectos y bonus [1]. El patrimonio apenas subió (de 40.598 M a 41.559 M) porque la recompra de enero se llevó casi todo el beneficio [1, 17].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'El flujo operativo fue de 13.723 M JPY en FY2026 (15.652 M en FY2025), frente a un beneficio de 7.430 M: la conversión es buena porque la amortización del fondo de comercio y la pérdida de Rise no son caja [1]. La inversión en inmovilizado es pequeña (1.663 M, ≈ 1 % de las ventas; FY2024 fue la excepción por la nueva sede, 5.711 M) [1, 6]. Lo grande son las compras: 20.982 M en FY2026, 8.685 M en FY2025 (con Rise) y 4.624 M en FY2024 [1, 5, 6]. Flujo libre después de compras: −8.919 M en FY2026, financiado con deuda [1]. Sin dividendos pagados hasta noviembre de 2026; recompras de 6.547 M en FY2026 [1, 17].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'Deloitte Touche Tohmatsu LLC desde FY2026 (antes Ernst & Young ShinNihon, siete años)', anios_auditor: 1, opinion: 'Favorable sin salvedades en el ejercicio a ago-2025 (EY) [8]; el informe del auditor de FY2026 llega con el yuho del 24-nov-2026',
    comentario: 'Cuentas J-GAAP de un comprador en serie: el beneficio publicado lleva la amortización del fondo de comercio (≈ 1.900-2.300 M al año) y deterioros repetidos de filiales y participaciones, y la empresa empuja un beneficio «ajustado» que los quita todos [1, 2]. Los deterioros recurrentes (Rise, Gurunavi y filiales en FY2023-FY2026) dicen que algunas compras se pagaron caras: en FY2026 se deterioraron 3.861 M de Rise un año después de comprarla por 7.668 M [1, 10]. Cambio de auditor de EY a Deloitte en FY2026 [8]. El flujo operativo sigue al EBITDA. La empresa dejó de dar el número de ingenieros, un dato clave en un negocio de horas [4].',
    senales: [
      { senal: 'Deterioros repetidos de compras y participadas', nivel: 'Media', comentario: '2.263 M (FY2023), 2.053 M, 1.624 M y 859 M + 3.861 M de Rise en FY2026 [1, 5, 7].' },
      { senal: 'Beneficio «ajustado» que excluye amortizaciones y costes de compras', nivel: 'Media', comentario: 'BPA ajustado de 39,12 JPY frente al básico de 28,72 en FY2026 [2].' },
      { senal: 'Fondo de comercio e intangibles de clientes ≈ 69 % del patrimonio', nivel: 'Media', comentario: 'La propia empresa quiere bajarlo comprando con capital de terceros [11].' },
      { senal: 'Cambio de auditor', nivel: 'Baja', comentario: 'De EY (siete años) a Deloitte en FY2026 [8].' },
      { senal: 'Deja de publicar el número de ingenieros', nivel: 'Baja', comentario: 'El consejero delegado prefiere el precio por proyecto como KPI [4].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Desde el 15-jul-2026 y hasta FY2028: retener ≈ 80 % del beneficio para crecer y devolver ≈ 20 % (≈ 10 % en dividendo y ≈ 10 % flexible); las compras grandes, sobre todo con capital de terceros (fondos), para no seguir inflando el fondo de comercio [11]. Primer dividendo de 4,53 JPY por FY2026 (1.172 M, registro 31-ago-2026, pago 26-nov-2026) y 5,20 JPY previstos para FY2027 [1, 15]. Fondo con Tokyo Gas de 15.000 M (SHIFT 32,3 %, Tokyo Gas 66,7 %) desde el 1-dic-2026, que se consolidará [13]. Recompra de 7,9 M de acciones (≈ 6.547 M) en enero de 2026 [17].',
    adquisiciones: [
      { anio: 'FY2026', objetivo: 'Nisseicom (desarrollo y operación de sistemas; ventas ≈ 20.900 M, resultado operativo ≈ 1.100 M)', importe: 20486, ev_ebitda: null, financiacion: 'Deuda bancaria', resultado: 'Consolidada desde el 3T; ≈ 0,98 veces ventas y ≈ 21 veces el beneficio [12].' },
      { anio: 'FY2025', objetivo: 'Rise Consulting Group (33 %, consultora cotizada)', importe: 7668, ev_ebitda: null, financiacion: 'Caja', resultado: 'Deterioro de 3.861 M en FY2026; hoy vale ≈ 2.900 M en bolsa [9, 10].' },
      { anio: 'FY2024', objetivo: 'HumanSystem, Club Nets y otras', importe: 4624, ev_ebitda: null, financiacion: 'Caja', resultado: 'Integradas [6].' },
    ],
    comentario: 'SHIFT ha crecido comprando: ≈ 39.000 M JPY en compras y participaciones en cuatro años, más que todo su flujo libre antes de compras [1, 5, 6, 7]. El resultado es mixto: Nisseicom añade ≈ 20.000 M de ventas al año a ≈ 1 vez ventas, pero Rise perdió la mitad de su valor en un año y hay deterioros cada año [1, 10]. La nueva política reconoce el problema: menos fondo de comercio, compras con capital ajeno (el fondo con Tokyo Gas) y un primer dividendo [11, 13]. Las acciones en circulación bajaron de ≈ 263 M a 255,6 M con la recompra de enero [1, 17].',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'Pruebas (Testing)', descripcion: 'Pruebas y control de calidad de software, con y sin IA; el negocio original.', tipo_resultado: 'EBIT', historico: [{ periodo: 'FY2025', ingresos: 57612, resultado: 15929 }, { periodo: 'FY2026', ingresos: 64382, resultado: 16897 }] },
      { nombre: 'Desarrollo (Development)', descripcion: 'Desarrollo de sistemas, ERP, infraestructura y operación (Nisseicom).', tipo_resultado: 'EBIT', historico: [{ periodo: 'FY2025', ingresos: 47949, resultado: 5034 }, { periodo: 'FY2026', ingresos: 65107, resultado: 5838 }] },
      { nombre: 'Consultoría', descripcion: 'Consultoría de TI, PMO y seguridad (fases iniciales de los proyectos).', tipo_resultado: 'EBIT', historico: [{ periodo: 'FY2025', ingresos: 14789, resultado: 4295 }, { periodo: 'FY2026', ingresos: 19263, resultado: 5449 }] },
      { nombre: 'BPaaS', descripcion: 'Externalización de procesos con plataforma propia.', tipo_resultado: 'EBIT', historico: [{ periodo: 'FY2025', ingresos: 3817, resultado: 455 }, { periodo: 'FY2026', ingresos: 5157, resultado: 801 }] },
      { nombre: 'Otros y plataforma de inversión', descripcion: 'Contratación y otros negocios; plataforma de inversión (fondos para compras).', tipo_resultado: 'EBIT', historico: [{ periodo: 'FY2025', ingresos: 9996, resultado: 1046 }, { periodo: 'FY2026', ingresos: 12856, resultado: 1142 }] },
    ],
    geografias: [{ nombre: 'Japón', peso_pct: 100 }],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Precio por proyecto (matriz, mensual)', valor_anterior: 'n. d.', valor_actual: '4.575 miles de JPY (4T FY2026)', variacion: 'Sube', comentario: 'Consolidado: 2.921 miles; el KPI que la empresa prefiere al número de ingenieros [2, 4].' },
      { kpi: 'Proyectos', valor_anterior: '3.851', valor_actual: '4.777 (4T FY2026)', variacion: '+24,0 %', comentario: 'Incluye los de las compras [2].' },
      { kpi: 'Peso de las ventas con IA', valor_anterior: '2,7 % (1T FY2026)', valor_actual: '28,4 % (4T FY2026)', variacion: '+25,7 puntos', comentario: 'Margen bruto del 42-55 % frente al 32 % tradicional; en gran parte sustituye pruebas tradicionales [3].' },
      { kpi: 'Margen bruto', valor_anterior: '34,7 % (FY2025)', valor_actual: '33,5 % (FY2026)', variacion: '−1,2 puntos', comentario: 'Ocupación baja en el 1T por los ingenieros jóvenes [4].' },
      { kpi: 'Empleados (consolidado)', valor_anterior: '10.266 (ago-24)', valor_actual: '11.688 (ago-25)', variacion: '+13,9 %', comentario: 'Más 1.978 temporales; FY2026 sin publicar hasta el yuho de noviembre; no se contratan ingenieros desde el 2T FY2026 [4, 8].' },
      { kpi: 'Continuidad de clientes (trimestral)', valor_anterior: 'n. d.', valor_actual: '93,2 %', variacion: 'n. d.', comentario: '185 comerciales; ≈ 550 M JPY de ventas por comercial [3].' },
    ],
    clientes: 'Grandes empresas japonesas de finanzas, industria, comercio, telecomunicaciones y administración; ningún cliente supera el 10 % de las ventas (nota de segmentos) [1, 8]. Continuidad de clientes del 93,2 % por trimestre [3]. Poder de precios: el precio por proyecto sube por la mezcla (proyectos grandes y largos, consultoría) y por la IA, que la empresa cobra con más margen [3].',
    confianza: 'Alta',
  },
  huecos: [
    { seccion: 'negocio', campo: 'número de ingenieros y precio por ingeniero de FY2026', tipo: 'Complemento', intentos: '1) databook de FY2026 (no lo da); 2) presentación de resultados (solo plantilla de oficina, −113); 3) transcripción (la empresa no lo publica)', decision: 'Omitido; se usa el precio por proyecto y los empleados del yuho de FY2025' },
    { seccion: 'calidad', campo: 'opinión del auditor de FY2026', tipo: 'Complemento', intentos: '1) tanshin (sin auditoría); 2) lista de documentos de la empresa (yuho previsto para el 24-nov-2026); 3) EDINET', decision: 'Omitido hasta el yuho' },
  ],
  fuentes: fA,
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Japan IT Services Market Forecast 2025-2030 (7,5663 billones de JPY en 2025, +7,3 %; TCAC del 6,2 % hasta 10,2541 billones en 2030)', editor: 'IDC Japan', tipo: 'Datos sectoriales', fecha: '2026-03-09', url: 'https://www.idc.com/getdoc.jsp?containerId=prJPJ53233926' },
  { id: 2, titulo: 'Presentation Material FY2026 (mercado de pruebas ≈ 5,5 billones estimado por la empresa; IA; plan SHIFT3000)', editor: 'SHIFT Inc.', tipo: 'Primaria', fecha: '2026-10-15', url: U('resultados-fy2026-en') },
  { id: 3, titulo: '有価証券報告書 del ejercicio a ago-2025 (negocio, riesgos, escasez de ingenieros: ≈ 1 millón de ingenieros de TI en Japón)', editor: 'SHIFT Inc. (EDINET)', tipo: 'Primaria', fecha: '2025-11-26', url: U('yuho-fy2025-ja') },
  { id: 4, titulo: 'Encuesta mensual de servicios (información y comunicaciones +4,5 % interanual en mayo de 2026)', editor: 'Oficina de Estadística de Japón', tipo: 'Primaria', fecha: '2026-07', url: U('servicios-stat-2026-05-ja') },
  { id: 5, titulo: 'Fichas de comparables (ventas, EBITDA, estimaciones) de Yahoo Finance', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com' },
  { id: 6, titulo: 'Transcripción de resultados de FY2026 (IA, ingenieros de ≤ 6 M JPY sustituidos por IA, ocupación)', editor: 'SHIFT Inc.', tipo: 'Primaria', fecha: '2026-10-19', url: U('transcripcion-fy2026-en') },
  { id: 7, titulo: 'Noticias de SHIFT en Kabutan (rebaja de Daiwa por el riesgo de sustitución por IA, venta de software y SaaS de febrero de 2026)', editor: 'Kabutan', tipo: 'Prensa', fecha: '2026-10-21', url: 'https://kabutan.jp/stock/news?code=3697' },
];
const B__ = {
  _estado: 'Completa con una fuente independiente de tamaño de mercado (IDC Japan, servicios de TI) y la estimación de la empresa para pruebas. Cuotas de los competidores privados (NTT Data, Fujitsu, filiales de pruebas de los integradores) sin cifras públicas.',
  sector: {
    definicion: 'Mercado relevante: los servicios de TI para empresas en Japón (pruebas y control de calidad, desarrollo, operación y consultoría de sistemas), donde SHIFT hace el 100 % de sus ventas [3]. IDC Japan lo mide en 7,5663 billones de JPY en 2025 (+7,3 %) [1]. Dentro, las pruebas de software: la empresa estima ≈ 5,5 billones como el 35 % del gasto en software (15,96 billones), pero buena parte la hacen los propios integradores y clientes, no especialistas como SHIFT [2].',
    tamano: '7.566.300 M JPY (servicios de TI de Japón, 2025, IDC Japan) [1]',
    unidad_serie: 'millones de JPY (IDC Japan: 6,4608 billones en 2023, 7,5663 en 2025 y 10,2541 en 2030; años intermedios interpolados por el analista con la TCAC del 6,2 %)',
    serie: [{ anio: '2023', tamano: 6460800 }, { anio: '2024', tamano: 7051000 }, { anio: '2025', tamano: 7566300 }, { anio: '2026e', tamano: 8035000 }, { anio: '2027e', tamano: 8533000 }, { anio: '2028e', tamano: 9062000 }, { anio: '2029e', tamano: 9624000 }, { anio: '2030e', tamano: 10254100 }],
    tcac_historico_pct: 8.2, tcac_previsto_pct: 6.2, cr5_pct: null, estructura: 'Fragmentada',
    drivers: [
      { driver: 'Transformación digital y sustitución de sistemas antiguos en Japón', efecto: '+', horizonte: 'Estructural', evidencia: 'Servicios de TI +7,3 % en 2025 y TCAC del 6,2 % hasta 2030 [1]; información y comunicaciones +4,5 % interanual en mayo de 2026, 50 meses seguidos al alza [4].' },
      { driver: 'Escasez de ingenieros de TI', efecto: '+/−', horizonte: 'Estructural', evidencia: '≈ 1 millón de ingenieros de TI en Japón y oferta de empleo muy por encima de la demanda [3]: sube precios, pero limita el crecimiento por volumen.' },
      { driver: 'IA generativa que escribe y ejecuta pruebas', efecto: '−', horizonte: 'Estructural', evidencia: 'SHIFT dice que el coste por caso de prueba con IA baja un 92 % [2]; Daiwa rebajó la acción en junio de 2026 por el riesgo de sustitución [7].' },
      { driver: 'IA que multiplica el software que hay que probar y la seguridad', efecto: '+', horizonte: 'Estructural', evidencia: 'Más código generado por IA, más pruebas de IA, ciberseguridad y defensa: contratos de evaluación de IA de defensa en 2026 [2].' },
      { driver: 'Ciclo de inversión empresarial', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Los proyectos de TI se aplazan en recesión; las pruebas son de los primeros en recortarse.' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Integradores (NTT Data, Fujitsu, NEC) con sus propias pruebas, especialistas pequeños (Valtes, Digital Hearts) y consultoras [5].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Grandes empresas con compras centralizadas; ningún cliente supera el 10 % [3].' },
      { fuerza: 'Poder de los proveedores', intensidad: 4, justificacion: 'El proveedor es el ingeniero: escasez en Japón y salarios al alza [3].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Barrera baja en capital pero alta en escala, método y base de clientes.' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 5, justificacion: 'La IA puede generar y ejecutar casos de prueba y revisar código: el trabajo de prueba manual por horas es el más expuesto [2, 7].' },
    ],
    ciclo: { posicion: 'Expansión', comentario: 'El gasto en TI de Japón crece (+7,3 % en 2025) y SHIFT crece un 18 % orgánico; la IA cambia la mezcla dentro del mercado más que su tamaño a corto plazo [1, 2].' },
    regulacion: 'Sin regulación sectorial específica: ley laboral (envío de personal y contratos de servicios), protección de datos y contratación pública; la certificación ISMAP para servicios en la nube de la administración [3].',
    tendencias: 'Tres tendencias: 1) la IA automatiza el diseño y la ejecución de pruebas: el trabajo tradicional de SHIFT pasó del 42 % al 19 % de sus ventas en un año, sustituido por servicios «con IA» con más margen [2]; 2) la IA genera más software y más riesgos (seguridad, calidad de la propia IA), que piden más verificación [2]; 3) los clientes japoneses externalizan cada vez más por la falta de ingenieros, pero los integradores grandes compiten por el mismo trabajo [3].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: r1(161600 / 8035000 * 100), posicion: 'Mayor especialista independiente en pruebas de software de Japón; ≈ 2 % de los servicios de TI del país con 161.600 M JPY de ventas en FY2026 [1, 3]',
    competidores: [
      { nombre: 'NTT Data, Fujitsu, NEC (pruebas dentro de la integración)', pais: 'Japón', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Hacen sus propias pruebas; son a la vez clientes y competidores.' },
      { nombre: 'Nomura Research Institute', pais: 'Japón', ticker: '4307.T', ingresos: Math.round(Y['4307.T'].ventas / 1e6), cuota_pct: null, margen_ebit_pct: null, comentario: 'Consultoría y sistemas [5].' },
      { nombre: 'TIS', pais: 'Japón', ticker: '3626.T', ingresos: Math.round(Y['3626.T'].ventas / 1e6), cuota_pct: null, margen_ebit_pct: null, comentario: 'Integrador independiente [5].' },
      { nombre: 'Systena', pais: 'Japón', ticker: '2317.T', ingresos: Math.round(Y['2317.T'].ventas / 1e6), cuota_pct: null, margen_ebit_pct: null, comentario: 'Desarrollo y pruebas de software y móviles [5].' },
      { nombre: 'Digital Hearts Holdings', pais: 'Japón', ticker: '3676.T', ingresos: Math.round(Y['3676.T'].ventas / 1e6), cuota_pct: null, margen_ebit_pct: null, comentario: 'Pruebas de software y videojuegos [5].' },
      { nombre: 'Valtes Holdings', pais: 'Japón', ticker: '4442.T', ingresos: Math.round(Y['4442.T'].ventas / 1e6), cuota_pct: null, margen_ebit_pct: null, comentario: 'Especialista en pruebas, mucho más pequeño [5].' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'En riesgo',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'No hay red de usuarios.' },
        { fuente: 'Costes de cambio', puntuacion: 2, evidencia: 'Continuidad de clientes del 93 % y proyectos largos, pero los contratos son de servicios y se pueden cambiar [2].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 2, evidencia: 'Marca de referencia en pruebas en Japón, método y herramientas propias (CAT, plataformas de IA) [2].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Escala: el mayor equipo de pruebas del país, con contratación de no ingenieros formados por examen propio; IA interna que baja el coste por caso un 92 % [2, 3].' },
        { fuente: 'Escala eficiente', puntuacion: 1, evidencia: 'Mercado grande y fragmentado.' },
      ],
    },
    amenazas: 'La mayor amenaza es la IA: si los clientes o los integradores generan y ejecutan las pruebas con IA, el trabajo por horas de SHIFT se encoge; la propia SHIFT vende ya «pruebas con IA» que sustituyen a las tradicionales y dejó de contratar ingenieros jóvenes [2, 6]. Segundo, los integradores grandes, que pueden quedarse las pruebas dentro de sus proyectos. Tercero, la escasez de ingenieros encarece el crecimiento por volumen [3].',
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'SHIFT es la mayor empresa independiente de pruebas de software de Japón: comprueba que los sistemas y aplicaciones de grandes empresas funcionan antes de ponerlos en marcha, y desde hace unos años también desarrolla, opera sistemas y hace consultoría de TI, en parte con empresas compradas [3]. Vende todo en Japón [3].',
    como_gana_dinero: 'Cobra por proyecto, sobre todo por horas de ingenieros y personal de pruebas asignados a cada cliente: ventas = proyectos × precio por proyecto [2]. Crece contratando (hasta 2025), subiendo el precio por proyecto (proyectos más grandes y consultoría) y comprando empresas de desarrollo y personal técnico [2]. Desde 2026 vende servicios «con IA» con más margen (42-55 % frente al 32 %), pero que necesitan menos horas [2, 6].',
  },
  huecos: [
    { seccion: 'sector', campo: 'tamaño independiente del mercado de pruebas de software en Japón', tipo: 'Complemento', intentos: '1) presentación de SHIFT (estimación propia de ≈ 5,5 billones); 2) IDC Japan (solo servicios de TI en conjunto); 3) libro blanco del Ministerio del Interior (sin dato de pruebas)', decision: 'Omitido; se usa el mercado de servicios de TI de IDC' },
  ],
  fuentes: fB,
};
guarda('B', B__);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: '有価証券報告書 del ejercicio a ago-2025: consejo, remuneración, mayores accionistas, participaciones de consejeros, salario medio', editor: 'SHIFT Inc. (EDINET)', tipo: 'Primaria', fecha: '2025-11-26', url: U('yuho-fy2025-ja') },
  { id: 2, titulo: 'Notice of Convocation of the 20th Annual General Meeting of Shareholders (consejeros propuestos, comisiones)', editor: 'SHIFT Inc.', tipo: 'Primaria', fecha: '2025-10-31', url: U('junta-2025-en') },
  { id: 3, titulo: '臨時報告書 (resultados de las votaciones de la junta de noviembre de 2025 y su corrección)', editor: 'SHIFT Inc. (EDINET)', tipo: 'Primaria', fecha: '2025-11-27', url: U('votos-2025-corr-ja') },
  { id: 4, titulo: '臨時報告書 (votaciones de la junta de noviembre de 2024)', editor: 'SHIFT Inc. (EDINET)', tipo: 'Primaria', fecha: '2024-11-28', url: U('votos-2024-ja') },
  { id: 5, titulo: 'Recomendación de voto de ISS para la junta de 2025 (en contra de dos consejeros de la comisión de auditoría)', editor: 'SHIFT Inc. (respuesta a ISS)', tipo: 'Primaria', fecha: '2025-11-07', url: U('iss-2025-ja') },
  { id: 6, titulo: 'Tanshin de FY2024, FY2025 y FY2026 (guías iniciales y resultados)', editor: 'SHIFT Inc. (TDnet)', tipo: 'Primaria', fecha: '2026-10-15', url: U('tanshin-fy2026-en') },
  { id: 7, titulo: 'Informe de participación significativa de Masaru Tange y personas vinculadas (del 34,09 % al 33,18 %)', editor: 'EDINET (vía Kabutan)', tipo: 'Primaria', fecha: '2026-02-06', url: 'https://kabutan.jp/stock/holder?code=3697' },
  { id: 8, titulo: 'Revisión de previsiones de julio de 2026 (BPA de FY2026 de 43,67 a 24,35 JPY por Rise)', editor: 'SHIFT Inc. (TDnet)', tipo: 'Primaria', fecha: '2026-07-15', url: U('revision-previsiones-2026-07-en') },
];
const ACC = 255.62;
const C = {
  _estado: 'Completa. Japón no tiene registro de operaciones de directivos tipo Form 4: se usan los informes de participación significativa y el yuho. El yuho de FY2026 (consejo y remuneración actualizados) sale el 24-nov-2026: se usa el de FY2025 y la junta de noviembre de 2025.',
  directivos: {
    equipo: [
      { nombre: 'Masaru Tange', cargo: 'Fundador, presidente ejecutivo y consejero delegado', desde: '2005', participacion_pct: r2(81646 / (ACC * 1000) * 100), trayectoria: 'Fundó SHIFT en 2005 como consultora de mejora de procesos y la convirtió en la mayor empresa de pruebas de software de Japón; con él las ventas pasaron de ≈ 1.000 M a 161.600 M JPY [1].' },
      { nombre: 'Michio Sasaki', cargo: 'Consejero y presidente del consejo (ex presidente de Keyence)', desde: '2022', participacion_pct: null, trayectoria: 'Ex presidente de Keyence; aporta disciplina comercial y de márgenes [1, 2].' },
      { nombre: 'Motoya Kobayashi', cargo: 'Consejero ejecutivo', desde: null, participacion_pct: r2(2248 / (ACC * 1000) * 100), trayectoria: 'Responsable de negocio; 2,25 M de acciones [1].' },
    ],
    historial_guidance: [
      { anio: 'FY2025', guia: 'Ventas 130.000 M JPY; resultado operativo 13.500 M; beneficio 7.900 M', real: '129.819; 15.628; 8.935', cumplida: 'Sí' },
      { anio: 'FY2026', guia: 'Ventas 150.000 M; resultado operativo ajustado 20.000 M; beneficio ajustado 13.500 M (BPA ajustado 51,27)', real: '161.600 (con compras); 20.259; 10.120 (BPA ajustado 39,12)', cumplida: 'No' },
      { anio: 'FY2026 (revisada en julio)', guia: 'BPA básico 24,35 JPY (desde 43,67) por el deterioro de Rise', real: '28,72', cumplida: 'Sí' },
      { anio: 'FY2027', guia: 'Ventas 190.000 M; resultado operativo ajustado 25.000 M; BPA básico 52,16', real: 'En curso', cumplida: 'n. d.' },
    ],
    comentario: 'Empresa de fundador: Masaru Tange (consejero delegado desde 2005) tiene ≈ 32 % de las acciones en circulación y su grupo ≈ 33 % [1, 7]. Cumple la guía de ventas (con compras) y de resultado operativo, pero el beneficio de FY2026 falló un 25 % por la pérdida de Rise, una participada comprada un año antes [6, 8]. El presidente del consejo es Michio Sasaki, ex presidente de Keyence [2].',
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      { nombre: 'Masaru Tange', cargo: 'Presidente ejecutivo y consejero delegado', tipo: 'Ejecutivo', desde: '2005', comisiones: '—' },
      { nombre: 'Michio Sasaki', cargo: 'Presidente del consejo', tipo: 'Ejecutivo', desde: null, comisiones: '—' },
      { nombre: 'Motoya Kobayashi', cargo: 'Consejero', tipo: 'Ejecutivo', desde: null, comisiones: '—' },
      { nombre: 'Murakami', cargo: 'Consejero externo', tipo: 'Independiente', desde: null, comisiones: 'Nombramientos y retribuciones' },
      { nombre: 'Fumiko Motoya', cargo: 'Consejera externa', tipo: 'Independiente', desde: null, comisiones: 'Nombramientos y retribuciones' },
      { nombre: 'Amy Hatta', cargo: 'Consejera externa', tipo: 'Independiente', desde: null, comisiones: 'Nombramientos y retribuciones' },
      { nombre: 'Arai', cargo: 'Consejero externo (comisión de auditoría, a tiempo completo)', tipo: 'Independiente', desde: null, comisiones: 'Auditoría y supervisión' },
      { nombre: 'Nakagaki', cargo: 'Consejero externo (comisión de auditoría)', tipo: 'Independiente', desde: null, comisiones: 'Auditoría y supervisión' },
      { nombre: 'Yanaka', cargo: 'Consejera externa (comisión de auditoría)', tipo: 'Independiente', desde: null, comisiones: 'Auditoría y supervisión' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: true, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: false, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: true, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: 98.79,
    remuneracion_ceo: { anio: 'FY2025', total: 147, fijo: 17, variable_corto: 0, variable_largo: 129, ratio_salario_medio: r1(147 / 6.849) },
    remuneracion: 'Tange cobró 147 M JPY en FY2025: 17 M de fijo y 129 M en acciones restringidas, sin variable ligado a resultados [1]. El consejo delega en el consejero delegado el reparto de la remuneración individual de los consejeros ejecutivos, algo que critican los asesores de voto [1, 5]. Ratio frente al salario medio de la matriz (6,849 M JPY): ≈ 21 veces [1]. En Japón no hay voto consultivo de la remuneración.',
    accionistas: [
      { nombre: 'Masaru Tange (fundador y consejero delegado)', pct: r2(81646 / (ACC * 1000) * 100), tipo: 'Interno', variacion: 'Directo sin cambios; su grupo bajó del 34,09 % al 33,18 % (enero de 2026) [7]' },
      { nombre: 'The Master Trust Bank of Japan y Custody Bank of Japan (fiduciarios)', pct: null, tipo: 'Institucional', variacion: 'Custodios de fondos japoneses [1]' },
      { nombre: 'Arcus Investment', pct: r2(13.41 / ACC * 100), tipo: 'Institucional', variacion: 'Más del 5 % (13,41 M de acciones, marzo de 2026)' },
      { nombre: 'Nomura Asset Management y Sumitomo Mitsui Trust AM', pct: null, tipo: 'Institucional', variacion: 'Cambios en informes de participación de 2026' },
      { nombre: 'Goldman Sachs', pct: null, tipo: 'Institucional', variacion: 'Bajó del 5 % en febrero de 2026' },
      { nombre: 'Motoya Kobayashi (consejero)', pct: r2(2248 / (ACC * 1000) * 100), tipo: 'Interno', variacion: 'Sin cambios conocidos [1]' },
    ],
    insiders: [
      { fecha: '2026-01-30', persona: 'Grupo de Masaru Tange (personas vinculadas)', operacion: 'Venta', acciones: null, importe: null },
    ],
    control_y_defensas: 'El fundador controla de hecho la junta con ≈ 32-33 % (más de un tercio con su grupo hasta enero de 2026: bloqueo de acuerdos especiales) [1, 7]. Una acción, un voto. Sociedad con comisión de auditoría y supervisión: nueve consejeros, seis externos y tres mujeres; el presidente del consejo (Sasaki) no es el consejero delegado, pero es ejecutivo [2]. Tange fue reelegido con el 98,79 % en 2025 (99,08 % en 2024) [3, 4]. ISS recomendó votar en contra de dos consejeros de la comisión de auditoría en 2025 [5]. Sin medidas antiopa.',
    alertas: [
      'El fundador tiene un tercio: alinea intereses pero también decide solo las compras (Rise se deterioró a la mitad en un año) [1, 8].',
      'Remuneración del consejo decidida por el consejero delegado y sin variable ligado a resultados [1].',
      'Cambio de auditor de EY a Deloitte en FY2026 [1].',
    ],
    confianza: 'Media',
  },
  huecos: [
    { seccion: 'gobierno', campo: 'año de entrada de los consejeros externos y nombres completos', tipo: 'Complemento', intentos: '1) convocatoria de 2025 (inglés, sin fechas); 2) yuho en japonés (tabla mal extraída); 3) informe de gobierno (escaneado)', decision: 'Omitido' },
  ],
  fuentes: fC,
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de 3697.T, 1306.T (TOPIX) y 1626.T (sector TI y servicios): precio, rentabilidades, beta, cierres de ejercicio; herramienta bolsa.mjs', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/3697.T/history' },
  { id: 2, titulo: 'Consenso de 3697.T y comparables (BPA y ventas, objetivos, recomendaciones) y cierre del 21-oct-2026 (15:30 de Tokio): quoteSummary', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/3697.T/analysis' },
  { id: 3, titulo: 'Noticias de SHIFT en Kabutan (resultados, stop-high del 16-oct, rebaja de Daiwa, índice Nikkei 225, contratos de defensa)', editor: 'Kabutan', tipo: 'Prensa', fecha: '2026-10-21', url: 'https://kabutan.jp/stock/news?code=3697' },
  { id: 4, titulo: 'Interest Rate (rendimiento del bono japonés a 10 años: 2,927 % el 20-oct-2026)', editor: 'Ministerio de Hacienda de Japón', tipo: 'Primaria', fecha: '2026-10-20', url: U('jgb-10a') },
  { id: 5, titulo: 'Implied ERP by month (ERPbymonth.xlsx): octubre de 2026, 4,20 %', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 6, titulo: 'Tanshin de FY2026 (balance a 31-ago-2026, acciones, guía de FY2027)', editor: 'SHIFT Inc. (TDnet)', tipo: 'Primaria', fecha: '2026-10-15', url: U('tanshin-fy2026-en') },
  { id: 7, titulo: 'SHIFT Inc. (3697): consenso de analistas (8 analistas, objetivo medio 984,29 JPY) y estimaciones de FY2027-FY2028', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-20', url: 'https://www.marketscreener.com/quote/stock/SHIFT-INC-18464297/consensus/' },
  { id: 8, titulo: 'Movimiento del precio de 3697.T (1-12 meses, máximos, media de 200, avisos P1-P5): herramienta movimiento.mjs', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/3697.T/history' },
  { id: 9, titulo: 'Notice of Acquisition of Shares of Nisseicom (precio ≈ 20.486 M JPY; ventas y beneficio de Nisseicom)', editor: 'SHIFT Inc. (TDnet)', tipo: 'Primaria', fecha: '2026-01-14', url: U('nisseicom-2026-01-en') },
  { id: 10, titulo: 'Fondo con Tokyo Gas y política de capital (15-jul y 15-oct-2026)', editor: 'SHIFT Inc. (TDnet)', tipo: 'Primaria', fecha: '2026-10-15', url: U('tokyogas-2026-10-en') },
  { id: 11, titulo: 'Recompra de 7,9 M de acciones (enero de 2026)', editor: 'SHIFT Inc. (TDnet)', tipo: 'Primaria', fecha: '2026-01-28', url: U('recompra-2026-01-en') },
  { id: 12, titulo: 'Rise Consulting Group (9168.T): capitalización del 21-oct-2026 (8.837 M JPY)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/9168.T' },
  { id: 13, titulo: 'Tipo de cambio USD/JPY (157,913) del 21-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/JPY=X' },
  { id: 14, titulo: 'Deterioro de Rise y revisión de previsiones (29-may y 15-jul-2026)', editor: 'SHIFT Inc. (TDnet)', tipo: 'Primaria', fecha: '2026-07-15', url: U('revision-previsiones-2026-07-en') },
];
const c = Y['3697.T'];
const t = Object.fromEntries(c.trend.map((x) => [x.periodo, x]));
const bol = B.bolsa;
// Comparables: PER de los próximos 12 meses = precio ÷ (mezcla de los dos ejercicios del consenso según los meses que quedan
// del ejercicio en curso a 21-oct-2026). Los PER adelantados de Yahoo para Japón no son fiables (SHIFT sale sin el split).
const FX = { JPY: 1, USD: 157.913 };
const corte = new Date('2026-10-21T00:00:00Z');
const compsDef = [
  ['Nomura Research Institute', '4307.T', 'JP'], ['TIS', '3626.T', 'JP'], ['Systena', '2317.T', 'JP'], ['Digital Hearts Holdings', '3676.T', 'JP'], ['Valtes Holdings', '4442.T', 'JP'],
  ['BayCurrent', '6532.T', 'JP'], ['NS Solutions', '2327.T', 'JP'], ['EPAM Systems', 'EPAM', 'US'], ['Globant', 'GLOB', 'US'],
];
const comps = compsDef.map(([nombre, tk, pais]) => {
  const y = Y[tk]; const tt = Object.fromEntries(y.trend.map((x) => [x.periodo, x]));
  const fin0 = new Date(tt['0y'].fin + 'T00:00:00Z'); const m = Math.max(0, Math.min(12, (fin0 - corte) / (30.44 * 864e5)));
  const bpaNtm = tt['0y'].bpa != null && tt['+1y'].bpa != null ? (m / 12) * tt['0y'].bpa + (1 - m / 12) * tt['+1y'].bpa : null;
  const crec = tt['0y'].ventas && tt['+1y'].ventas ? (tt['+1y'].ventas / tt['0y'].ventas - 1) * 100 : null;
  const dn = y.ev != null && y.cap != null ? (y.ev - y.cap) : null;
  return {
    nombre, ticker: tk, pais, capitalizacion: Math.round(y.cap * FX[y.divisa] / 1e6), ev_ventas: y.ev && y.ventas ? r2(y.ev / y.ventas) : null,
    ev_ebitda_ltm: y.ev && y.ebitda ? r1(y.ev / y.ebitda) : null, ev_ebitda_ntm: null, per_ntm: bpaNtm ? r1(y.precio / bpaNtm) : null,
    crecimiento_pct: r1(crec), margen_ebitda_pct: y.ebitda && y.ventas ? r1(y.ebitda / y.ventas * 100) : null, roic_pct: null,
    dn_ebitda: dn != null && y.ebitda ? r1(dn / y.ebitda) : null, fcf_yield_pct: null,
  };
});
const perMed = (() => { const v = comps.map((x) => x.per_ntm).filter((x) => x != null).sort((a, b) => a - b); const n = v.length; return n % 2 ? v[(n - 1) / 2] : r1((v[n / 2 - 1] + v[n / 2]) / 2); })();
const PRECIO = c.precio; // 1.056,5 JPY, cierre del 21-oct-2026 (15:30 JST)
const D = {
  _estado: `Completa. Precio de cierre del 21-oct-2026 (1.056,5 JPY, Yahoo, 15:30 de Tokio; también en bolsa.mjs). Mediana del PER de los próximos 12 meses de los comparables: ${perMed}. Transacciones: solo Nisseicom (compra propia) con múltiplos aproximados; peso 0.`,
  _per_mediana_comparables: perMed,
  identificacion: {
    nombre: 'SHIFT Inc.', nombre_corto: 'SHIFT', ticker: '3697.T', isin: 'JP3355400007', mercado: 'Bolsa de Tokio (Prime)', indice_referencia: 'TOPIX',
    pais: 'Japón', pais_iso: 'JP', sector: 'Tecnología de la información', industria: 'Servicios de TI (pruebas de software, desarrollo y consultoría)', sede: 'Tokio (Minato)', fundacion: '2005', empleados: 11688, web: 'https://www.shiftinc.jp',
    precio: PRECIO, fecha_precio: '2026-10-21', acciones: ACC, capitalizacion_publicada: Math.round(c.cap / 1e6), free_float_pct: null,
    max_52s: B.identificacion.max_52s, min_52s: B.identificacion.min_52s, volumen_medio_diario: `≈ ${Math.round(B.volumen_3m.importe_dia_millones).toLocaleString('es-ES')} M JPY/día (3 meses)`, proximos_resultados: '2027-01-14',
  },
  consenso: {
    guidance: 'Guía de FY2027 (sep-2026 a ago-2027), dada el 15-oct-2026, sin compras nuevas: ventas de 190.000 M JPY (+17,6 %), resultado operativo ajustado de 25.000 M, beneficio ajustado de 16.500 M, BPA ajustado de 63,75 JPY y BPA básico de 52,16; DPA de 5,20 JPY. Caso ambicioso: 200.000 M de ventas y 31.400 M de resultado ajustado. Plan SHIFT3000: 300.000 M de ventas y 52.500 M de resultado ajustado en FY2031 [6].',
    estimaciones: [
      { periodo: 'FY2027e', ingresos: Math.round(t['0y'].ventas / 1e6), ebitda: 26407, ebit: 22758, bpa: r2(t['0y'].bpa), dpa: 3.2, fuente: `Yahoo Finance (${t['0y'].n} analistas) y MarketScreener [2, 7]` },
      { periodo: 'FY2028e', ingresos: Math.round(t['+1y'].ventas / 1e6), ebitda: 30862, ebit: 26584, bpa: r2(t['+1y'].bpa), dpa: 3.88, fuente: `Yahoo Finance (${t['+1y'].n} analistas) y MarketScreener [2, 7]` },
    ],
    recomendaciones: { n_analistas: 8, comprar: 3, mantener: 5, vender: 0, po_medio: 984, po_min: 780, po_max: 1250 },
    revisiones: `El BPA de FY2027 del consenso apenas se movió en 90 días (de ${n2(r2(t['0y'].bpa_hace90))} a ${n2(r2(t['0y'].bpa))} JPY) y el de FY2028 subió de ${n2(r2(t['+1y'].bpa_hace90))} a ${n2(r2(t['+1y'].bpa))} [2]. El objetivo medio (984 JPY, 8 analistas, 780-1.250) está por debajo del precio [7]. Daiwa rebajó la recomendación de 1 a 3 y el objetivo de 1.700 a 780 JPY el 2-jun-2026 por el riesgo de sustitución por IA; Iwai Cosmo la subió a A con objetivo de 1.050 el 21-abr-2026 [3]. En el foro se cita un informe de SBI con objetivo de 2.700 (no comprobado).`,
    base_ebitda: 'consenso de EBITDA de MarketScreener', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    ...bol,
    beta: 1.11, posicion_corta_pct: null,
    comentario: 'Acción muy volátil (62 % anual) que lleva cinco años por detrás del mercado: −8,1 % anual a cinco años frente al +18,0 % del TOPIX, tras caer un 75,6 % entre diciembre de 2023 y agosto de 2024 [1]. Desde el mínimo de febrero de 2026 (590 JPY, venta general del software por la IA) ha subido un 79 % [1, 8]. Beta frente al ETF del TOPIX: 0,55 mensual a cinco años, 1,11 semanal a cinco años y 0,53 semanal a dos años; el ETF 1306.T tiene dos cierres anómalos que la herramienta descarta [1]. Liquidez alta: ≈ 5.400 M JPY negociados al día [1]. Entró en el Nikkei 225 en octubre de 2025 [3].',
    contexto: {
      movimiento: { fecha: '2026-10-21', var_1m_pct: 23.5, var_3m_pct: 55.4, var_6m_pct: 60.8, var_12m_pct: -11.5, dist_max_52s_pct: -18.4, dist_min_52s_pct: 78.6, dist_max_historico_pct: -56.0, tendencia: 'alcista', volatilidad_60d_pct: 64.0, avisos: ['P1'] },
      movimientos_fuertes: [
        { periodo: 'oct 2025-feb 2026', var_pct: -50.7, causa: 'Del máximo de 1.196 JPY (27-oct-2025) al mínimo de 590 (24-feb-2026): primer trimestre por debajo de lo esperado (−8,5 % el 15-ene), recompra de enero y la venta general del software y los servicios de TI por el miedo a la IA en febrero, con caídas del −7 al −10 % en un día (4-feb, 24-feb) [3, 8].', veredicto: 'no cambia', condicion: null },
        { periodo: 'jun 2026', var_pct: -12.2, causa: 'Daiwa rebaja la acción de 1 a 3 y el objetivo a 780 JPY por el riesgo de que la IA sustituya las pruebas por horas (3-jun) [3].', veredicto: 'no cambia', condicion: null },
        { periodo: 'jul 2026', var_pct: 30.2, causa: 'Resultados del 3T, primer dividendo y nueva política de capital (15-jul): cuatro sesiones de +8 a +9 % (17 a 28-jul) [3, 8].', veredicto: 'no cambia', condicion: null },
        { periodo: 'oct 2026', var_pct: 23.5, causa: 'Resultados de FY2026 (4T récord), guía de +17,6 % y fondo con Tokyo Gas (15-oct): stop-high del 16-oct (+16,5 %); −3,5 % el 21-oct [3, 8].', veredicto: 'no cambia', condicion: null },
      ],
      noticias: [
        { fecha: '2026-10-15', tipo: 'resultados', hecho: 'FY2026: ventas +24,5 %, 4T récord; guía de FY2027 de 190.000 M de ventas y BPA básico de 52,16; fondo de 15.000 M con Tokyo Gas para compras; dividendo de 4,53 JPY [6, 10].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10', tipo: 'otros', hecho: 'Contrato de investigación para la certificación ISMAP de la administración; en agosto, contrato de evaluación de IA para defensa [3].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-07-15', tipo: 'resultados', hecho: 'Tercer trimestre; BPA de FY2026 rebajado de 43,67 a 24,35 JPY por el deterioro de Rise; 80 % del beneficio retenido y 20 % devuelto hasta FY2028 [14].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-06-02', tipo: 'recomendación', hecho: 'Daiwa rebaja de 1 a 3 (objetivo de 1.700 a 780 JPY) por el riesgo de sustitución por IA [3].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-05-29', tipo: 'otros', hecho: 'Aviso de deterioro de la participación en Rise Consulting Group (4.500 M en las cuentas individuales) y de Gurunavi (≈ 300 M); el 26-may, integración de la administración de 15 filiales [14].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-02-24', tipo: 'otros', hecho: 'Mínimo de 590 JPY en la venta general del software y los servicios de TI por la IA (el mismo día cayeron BayCurrent y otras) [3, 8].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-02-06', tipo: 'directivos', hecho: 'El grupo del fundador baja del 34,09 % al 33,18 % (personas vinculadas; Tange directo sin cambios) [3].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-01-14', tipo: 'resultados', hecho: 'Primer trimestre flojo (−8,5 % al día siguiente); compra de Nisseicom (≈ 20.486 M) y recompra de hasta 10.000 M (7,9 M de acciones compradas hasta el 28-ene) [9, 11].', veredicto: 'no cambia', condicion: null },
        { fecha: '2025-10', tipo: 'otros', hecho: 'Entrada en el Nikkei 225; máximo de 52 semanas (1.196 JPY) el 27-oct-2025 [3].', veredicto: 'no cambia', condicion: null },
        { fecha: '2027-01-14', tipo: 'resultados', hecho: 'Resultados del 1T de FY2027 hacia mediados de enero de 2027 (el año pasado, 14-ene) [6].', veredicto: 'no cambia', condicion: null },
      ],
      proximos_resultados: '2027-01-14',
      veredicto: 'no cambia',
      condicion: null,
      comentario: 'Salta el aviso P1 (subida fuerte: +55 % en tres meses y +23,5 % en un mes) [8]. La subida tiene causa en hechos de la empresa —tercer y cuarto trimestres mejores, primer dividendo, guía de +17,6 % y fondo con Tokyo Gas— y en la vuelta del sector tras la venta por la IA de febrero, no en una operación corporativa ni en un rumor [3, 6]. La acción sigue un 18 % bajo su máximo de 52 semanas y un 56 % bajo el de cinco años: no es una burbuja de precio, es una recuperación. No hay colocaciones, ampliaciones ni litigios con fecha; la rebaja de Daiwa por la IA (junio) es una opinión que el informe recoge en el escenario bajista. Los próximos resultados (mediados de enero) están a casi tres meses. Veredicto: no cambia.',
    },
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: B.cierres_ejercicio.filter((x) => ['FY2018', 'FY2019', 'FY2020', 'FY2021', 'FY2022', 'FY2023', 'FY2024', 'FY2025', 'FY2026'].includes(x.anio)).map((x) => ({ anio: x.anio, precio_cierre: x.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    comentario: 'Precio de cierre de cada ejercicio (31 de agosto o último día hábil) de Yahoo, ajustado por el split 15:1 [1]. En base adelantada (cierre ÷ BPA real del año siguiente) SHIFT cotizó a 52-103 veces entre 2019 y 2023, en plena época de crecimiento del 30-40 % y tipos cero; a 27 veces en agosto de 2024 y a ≈ 35 veces en agosto de 2025 (con el BPA de FY2026 sin la pérdida de Rise). Hoy, a ≈ 19-20 veces el BPA de los próximos 12 meses, está muy por debajo de su historia: el mercado ha dejado de pagarle como empresa de alto crecimiento.',
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Servicios de TI japoneses cotizados (NRI, TIS, NS Solutions, Systena), especialistas en pruebas (Digital Hearts, Valtes), BayCurrent (consultoría) y dos empresas extranjeras de ingeniería de software por horas (EPAM, Globant) [2]. Se deja fuera Pole To Win (pérdidas). Ninguna es igual: SHIFT crece más que los integradores y es mucho mayor que los especialistas en pruebas.',
    empresas: comps,
    comentario: `SHIFT cotiza a ≈ 19-20 veces el BPA de los próximos 12 meses frente a una mediana de comparables de ${n2(perMed)} veces [2]. Los integradores japoneses (TIS, NS Solutions) cotizan a 15-23 veces con crecimientos del 3-5 %; NRI a ≈ 26; los especialistas en pruebas (Digital Hearts, Valtes) a 12-15 veces; EPAM y Globant, empresas de horas de ingeniería expuestas a la IA, a 7-10 veces. SHIFT tiene prima por crecimiento (≈ 15-18 % frente al 3-10 %), pero su margen EBITDA (13 %) es de los más bajos.`,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2026-01', comprador: 'SHIFT (SHIFT Growth Capital)', objetivo: 'Nisseicom', ev: 20486, ev_ebitda: null, ev_ventas: 0.98, comentario: 'Precio del 100 % del capital frente a ventas de 20.859 M y beneficio de 959 M (≈ 21 veces) del ejercicio a mar-2025; caja neta de Nisseicom no publicada [9].' },
    ],
    comentario: 'Solo hay una transacción con datos: la propia compra de Nisseicom, a ≈ 1 vez ventas y ≈ 21 veces el beneficio [9]. No es comparable con SHIFT (empresa de desarrollo con margen del 5 %). La compra de Fuji Soft por KKR (2024-2025) no se usa: no se pudo comprobar el precio en fuente primaria. Peso 0.',
    confianza: 'Baja',
  },
  huecos: [
    { seccion: 'transacciones', campo: 'operaciones comparables con EV/EBITDA publicado', tipo: 'Complemento', intentos: '1) Fuji Soft/KKR (nota de prensa bloqueada, 403); 2) Nisseicom (sin EBITDA ni caja neta); 3) búsqueda de compras de empresas de pruebas en Japón (sin múltiplos)', decision: 'Omitido; peso 0' },
    { seccion: 'bolsa', campo: 'beta fiable frente al TOPIX', tipo: 'Complemento', intentos: '1) 1321.T (beta −0,01, datos rotos); 2) 1306.T mensual a 5 años (0,55); 3) semanal a 5 años (1,11)', decision: 'Se usa la semanal a cinco años (1,11) y 1 punto de prima adicional por la IA' },
  ],
  fuentes: fD,
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Foro de SHIFT (3697) en Yahoo! Finance Japón: mensajes y votos de la semana', editor: 'Yahoo! Finance Japan', tipo: 'Foros y redes', fecha: '2026-10-21', url: 'https://finance.yahoo.co.jp/quote/3697.T/forum' },
  { id: 2, titulo: 'Noticias y comentarios de mercado sobre SHIFT (stop-high, rebaja de Daiwa por la IA)', editor: 'Kabutan', tipo: 'Foros y redes', fecha: '2026-10-21', url: 'https://kabutan.jp/stock/news?code=3697' },
  { id: 3, titulo: 'Consenso y recomendaciones (3 comprar, 5 mantener)', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-20', url: 'https://www.marketscreener.com/quote/stock/SHIFT-INC-18464297/consensus/' },
];
const E = {
  _estado: 'Completa. Foro de Yahoo! Japón del 21-oct-2026 (≈ 75-80 mensajes del día), noticias de Kabutan y recomendaciones de analistas. Minkabu da 403. Reddit y Stocktwits casi no tienen mensajes sobre 3697.',
  sentimiento: {
    tono: 'Positivo', tendencia: 'Mejorando',
    revisadas: [
      { plataforma: 'Yahoo! Finance Japón (foro de 3697)', fecha: '2026-10', n_comentarios: 78, tono: 'Positivo', resumen: 'Votos de la semana: 61 % «comprar fuerte» y 11 % «comprar», frente a un 15 % «vender». Hablan de doblar el precio, de un objetivo de 2.700 JPY atribuido a SBI y de que SHIFT «deja de ser una empresa de pruebas»; los bajistas, de la media de 20 meses y de los cortos [1].' },
      { plataforma: 'Kabutan (noticias y comentarios)', fecha: '2026-10', n_comentarios: 10, tono: 'Positivo', resumen: 'Stop-high tras los resultados y el fondo con Tokyo Gas; en junio, la rebaja de Daiwa por la IA dominaba [2].' },
      { plataforma: 'Analistas (MarketScreener)', fecha: '2026-10', n_comentarios: 8, tono: 'Neutral', resumen: '3 comprar y 5 mantener; objetivo medio de 984 JPY, por debajo del precio [3].' },
    ],
    temas: [
      { tema: 'SHIFT gana con la IA (servicios con IA del 28 % de las ventas)', postura: 'Alcista', peso: 'Alto', contraste: 'El margen bruto de esos servicios es mayor, pero sustituyen pruebas tradicionales y necesitan menos horas: crecen las ventas con IA, no necesariamente las totales.' },
      { tema: 'Rebaja de Daiwa: la IA sustituye las pruebas', postura: 'Bajista', peso: 'Alto', contraste: 'Es el riesgo central; el escenario bajista lo recoge.' },
      { tema: 'Recuperación técnica y cortos', postura: 'Dividida', peso: 'Medio', contraste: 'Explica parte de la violencia de las subidas; no dice nada del valor.' },
      { tema: 'Compras y fondo con Tokyo Gas', postura: 'Alcista', peso: 'Medio', contraste: 'Crecimiento comprado con capital ajeno; los deterioros de Rise piden prudencia.' },
    ],
    lectura: 'El sentimiento ha pasado del miedo de febrero-junio (venta del software por la IA y rebaja de Daiwa) al optimismo de octubre (stop-high, 72 % de votos de compra en el foro) [1, 2]. Los analistas son más fríos: 5 de 8 dicen mantener y el objetivo medio queda bajo el precio [3]. No hay euforia de máximos (la acción está un 56 % bajo su máximo de cinco años), pero sí entusiasmo de corto plazo. Opiniones, no datos: ninguna cifra del informe sale de aquí.',
    confianza: 'Media',
  },
  huecos: [],
  fuentes: fE,
};
guarda('E', E);
console.log('Notas A-E escritas. Mediana PER comparables:', perMed, comps.map((x) => `${x.ticker} ${x.per_ntm}`).join(', '));
