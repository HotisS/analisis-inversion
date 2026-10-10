// Construye notas/A.json (subagente A, Adobe). Cifras de companyfacts (XBRL), 10-K, 10-Q y notas de resultados.
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const dir = dirname(fileURLToPath(import.meta.url));
const E = 'https://www.sec.gov/Archives/edgar/data/796343/';

const fuentes = [
  { id: 1, titulo: 'Adobe Inc. Form 10-K, ejercicio fiscal 2025 (cerrado el 28-nov-2025)', editor: 'Adobe Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-01-15', url: E + '000079634326000003/adbe-20251128.htm' },
  { id: 2, titulo: 'Adobe Inc. Form 10-K, ejercicio fiscal 2023', editor: 'Adobe Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2024-01-17', url: E + '000079634324000006/adbe-20231201.htm' },
  { id: 3, titulo: 'Adobe Inc. Form 10-K, ejercicio fiscal 2021', editor: 'Adobe Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2022-01-21', url: E + '000079634322000032/adbe-20211203.htm' },
  { id: 4, titulo: 'Adobe Inc. Form 10-K, ejercicio fiscal 2019', editor: 'Adobe Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2020-01-21', url: E + '000079634320000013/adbe10kfy19.htm' },
  { id: 5, titulo: 'Adobe Inc. XBRL Company Facts (series anuales de los 10-K FY2016-FY2025)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-10', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0000796343.json' },
  { id: 6, titulo: 'Adobe Inc. Form 10-Q, tercer trimestre FY2026 (cerrado el 28-ago-2026)', editor: 'Adobe Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-09-22', url: E + '000079634326000156/adbe-20260828.htm' },
  { id: 7, titulo: 'Adobe Reports Record Q3 Results (FY2026), anexo 99.1 al 8-K', editor: 'Adobe Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-09-10', url: E + '000079634326000147/adbeex991q326.htm' },
  { id: 8, titulo: 'Resultados del 2T FY2026, anexo 99.1 al 8-K', editor: 'Adobe Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-06-11', url: E + '000079634326000109/adbeex991q226.htm' },
  { id: 9, titulo: 'Resultados del 1T FY2026, anexo 99.1 al 8-K', editor: 'Adobe Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-03-12', url: E + '000079634326000048/adbeex991q126.htm' },
  { id: 10, titulo: 'Resultados del 4T y del ejercicio FY2025, anexo 99.1 al 8-K', editor: 'Adobe Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2025-12-10', url: E + '000079634325000135/adbeex991q425.htm' },
  { id: 11, titulo: 'Resultados del 3T FY2025, anexo 99.1 al 8-K', editor: 'Adobe Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2025-09-11', url: E + '000079634325000102/adbeex991q325.htm' },
  { id: 12, titulo: 'Resultados del 2T FY2025, anexo 99.1 al 8-K', editor: 'Adobe Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2025-06-12', url: E + '000079634325000064/adbeex991q225.htm' },
  { id: 13, titulo: 'Resultados del 1T FY2025, anexo 99.1 al 8-K', editor: 'Adobe Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2025-03-12', url: E + '000079634325000052/adbeex991q125.htm' },
  { id: 14, titulo: 'Resultados del 4T y del ejercicio FY2024, anexo 99.1 al 8-K', editor: 'Adobe Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2024-12-11', url: E + '000079634324000250/adbeex991q424.htm' },
  { id: 15, titulo: 'Adobe Announces Anil Chakravarthy to Become President and CEO, anexo 99.1 al 8-K', editor: 'Adobe Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-09-08', url: E + '000079634326000144/adbeex9918-k9826.htm' },
  { id: 16, titulo: 'Adobe Q3 FY2026 Earnings Call, transcripción corregida (FactSet CallStreet)', editor: 'Adobe Inc.', tipo: 'Primaria', fecha: '2026-09-10', url: 'https://www.adobe.com/cc-shared/assets/investor-relations/pdfs/adbe-q3fy26-transcript.pdf' },
  { id: 17, titulo: 'Adobe Q2 FY2026 Earnings Call, transcripción corregida (FactSet CallStreet)', editor: 'Adobe Inc.', tipo: 'Primaria', fecha: '2026-06-11', url: 'https://www.adobe.com/cc-shared/assets/investor-relations/pdfs/adbe-q2fy26-transcript.pdf' },
];

// ---- Cuenta de resultados (USD M). Fuente: XBRL companyfacts [5], cotejado con 10-K [1-4].
// [periodo, ingresos, coste_ventas, S&M, G&A, ebit, amort (flujos: depreciation, amortization and accretion), no operativo, bai, impuestos, bn, gastos_fin, bpa, acciones]
const C = [
  ['FY2016', 5854.4, 819.9, 1910.2, 576.2, 1493.6, 331.5, -58.5, 1435.1, 266.4, 1168.8, 70.4, 2.32, 504.3],
  ['FY2017', 7301.5, 1010.5, 2197.6, 624.7, 2168.1, 326.0, -30.5, 2137.6, 443.7, 1694.0, 74.4, 3.38, 501.1],
  ['FY2018', 9030, 1195, 2621, 745, 2840, 346, -46, 2794, 203, 2591, 89, 5.20, 497.8],
  ['FY2019', 11171, 1673, 3244, 881, 3268, 757, -63, 3205, 254, 2951, 157, 6.00, 491.6],
  ['FY2020', 12868, 1722, 3591, 968, 4237, 757, -61, 4176, -1084, 5260, 116, 10.83, 485.5],
  ['FY2021', 15785, 1865, 4321, 1085, 5802, 788, -97, 5705, 883, 4822, 113, 10.02, 481.0],
  ['FY2022', 17606, 2165, 4968, 1219, 6098, 856, -90, 6008, 1252, 4756, 112, 10.10, 470.9],
  ['FY2023', 19409, 2354, 5351, 1413, 6650, 872, 149, 6799, 1371, 5428, 113, 11.82, 459.1],
  ['FY2024', 21505, 2358, 5764, 1529, 6741, 857, 190, 6931, 1371, 5560, 169, 12.36, 449.7],
  ['FY2025', 23769, 2551, 6488, 1573, 8706, 818, 28, 8734, 1604, 7130, 263, 16.70, 427.0],
];
const r1 = x => Math.round(x * 10) / 10;
const cuenta = C.map(([periodo, ing, cv, sm, ga, ebit, am, nop, bai, imp, bn, gf, bpa, acc]) => ({
  periodo, ingresos: ing, coste_ventas: cv, gastos_generales: r1(sm + ga), ebitda: r1(ebit + am), amortizaciones: am, ebit,
  resultado_financiero: nop, bai, impuestos: imp, minoritarios: 0, beneficio_neto: bn, gastos_financieros: gf,
  participadas_en_ebitda: null,
  no_recurrentes_en_ebitda: periodo === 'FY2024' ? 1078 : null,
  bpa, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: acc,
}));

const financieros = {
  cuenta,
  ltm: {
    periodo: 'LTM ago-26', fecha_fin: '2026-08-28',
    ingresos: 25970, ebitda: 10037, ebit: 9271, beneficio_neto: 7284, bpa: 17.92, dpa: 0, dpa_extraordinario: 0, fcf: 10592,
    participadas_en_ebitda: null, no_recurrentes_en_ebitda: 162,
  },
  cambios_perimetro: [
    { periodo: 'FY2018', descripcion: 'Marketo (4.730 M USD, oct-2018) y Magento (1.640 M USD, jun-2018): el fondo de comercio pasa de 5.822 a 10.581 M y la deuda de 1.881 a 4.125 M; Marketo solo aporta un trimestre a la cuenta.' },
    { periodo: 'FY2021', descripcion: 'Workfront (1.520 M USD, 1T FY2021) y Frame.io (1.180 M USD, 4T FY2021, casi sin aportar a la cuenta del año).' },
  ],
  comentario: 'Los ingresos pasaron de 5.854 M USD en FY2016 a 23.769 M en FY2025, una tasa compuesta del 16,9 % [5], con dos escalones de compras: Magento y Marketo en FY2018 y Workfront y Frame.io en FY2021 [3, 4]. Desde FY2022 el crecimiento es casi todo orgánico y se ha estabilizado en el 10-12 % anual (FY2025: +10,5 %; 9M FY2026: +12,5 %, con Semrush desde el 28-abr-2026) [1, 6].\n\nEl margen EBIT pasó del 25,5 % (FY2016) al 36,6 % (FY2025). El margen bruto se mantiene en el 89 % [1] y la mejora viene del apalancamiento de los gastos de I+D, ventas y administración. FY2024 (31,3 %) no es comparable: incluye la indemnización de 1.000 M USD por la ruptura de la compra de Figma y 78 M de deterioros de activos por derechos de uso de oficinas [1]. FY2020 lleva un beneficio fiscal no recurrente de 1.350 M por el traspaso de propiedad intelectual a Irlanda, que llevó el beneficio neto a 5.260 M y el BPA a 10,83 USD [3]. Los pagos en acciones (1.942 M en FY2025, el 8,2 % de las ventas) están dentro del EBIT y del EBITDA, como exige US GAAP [5].',
  ajustes: 'Se usan cifras US GAAP. La empresa publica cifras no GAAP que excluyen los pagos en acciones y la remuneración diferida, la amortización de intangibles adquiridos, las ganancias y pérdidas de inversiones, partidas no recurrentes y ajustes fiscales, con un tipo impositivo fijo del 18 % para FY2026-FY2028 [7]. En FY2025 el BPA no GAAP fue de 20,94 USD frente a 16,70 GAAP [10]; en el 3T26, 6,13 frente a 4,62 [7]. Partidas no recurrentes dentro del EBITDA: en FY2024, la indemnización a Figma (1.000 M) y los deterioros de oficinas (78 M) [1]; en el LTM a ago-26, la contingencia por litigios, que incluye el acuerdo con el Departamento de Justicia de EE. UU. por las prácticas de cancelación de suscripciones (62 M en el 1T26 y 30 M en el 2T26), y un deterioro del fondo de comercio de Publishing & Advertising de 70 M (2T26) [6, 8, 9]. Los gastos de adquisición (25 M en 9M26) se dejan como recurrentes.',
  extra: [
    'Pagos en acciones: 349 M USD en FY2016 frente a 1.942 M en FY2025 (del 6,0 % al 8,2 % de las ventas) [5].',
    'I+D: 976 M USD en FY2016 (16,7 % de las ventas) frente a 4.294 M en FY2025 (18,1 %) [5].',
    'Amortización de intangibles adquiridos: 310 M USD en FY2025 frente a 405 M en FY2022 [5].',
    'Tipo impositivo efectivo: 18,4 % en FY2025 y 19,8 % en FY2024 (la indemnización a Figma no era deducible) [1].',
    'LTM ago-26: ingresos 25.970 M = FY2025 23.769 + 9M26 19.776 - 9M25 17.575; EBIT 9.271 M; amortizaciones 766 M; flujo operativo 10.806 M y capex 214 M [1, 6-13].',
    'Guía FY2026 (10-sep-2026): ingresos de 26.576-26.626 M USD, BPA GAAP de 18,12-18,17 USD y no GAAP de 24,45-24,50; margen operativo GAAP ~35 % y no GAAP ~45 %; ~400 M de acciones diluidas [7].',
  ],
  confianza: 'Alta',
};

// ---- Trimestres
const trimestres = {
  items: [
    { periodo: '4T24', ingresos: 5606, crecimiento_pct: 11.1, crecimiento_organico_pct: null, ebitda: 2175, margen_ebitda_pct: 38.8, bpa: 3.79, vs_consenso: null },
    { periodo: '1T25', ingresos: 5714, crecimiento_pct: 10.3, crecimiento_organico_pct: null, ebitda: 2380, margen_ebitda_pct: 41.7, bpa: 4.14, vs_consenso: null },
    { periodo: '2T25', ingresos: 5873, crecimiento_pct: 10.6, crecimiento_organico_pct: null, ebitda: 2318, margen_ebitda_pct: 39.5, bpa: 3.94, vs_consenso: null },
    { periodo: '3T25', ingresos: 5988, crecimiento_pct: 10.7, crecimiento_organico_pct: null, ebitda: 2381, margen_ebitda_pct: 39.8, bpa: 4.18, vs_consenso: null },
    { periodo: '4T25', ingresos: 6194, crecimiento_pct: 10.5, crecimiento_organico_pct: null, ebitda: 2445, margen_ebitda_pct: 39.5, bpa: 4.45, vs_consenso: null },
    { periodo: '1T26', ingresos: 6398, crecimiento_pct: 12.0, crecimiento_organico_pct: null, ebitda: 2592, margen_ebitda_pct: 40.5, bpa: 4.60, vs_consenso: null },
    { periodo: '2T26', ingresos: 6618, crecimiento_pct: 12.7, crecimiento_organico_pct: null, ebitda: 2431, margen_ebitda_pct: 36.7, bpa: 4.25, vs_consenso: null },
    { periodo: '3T26', ingresos: 6760, crecimiento_pct: 12.9, crecimiento_organico_pct: null, ebitda: 2569, margen_ebitda_pct: 38.0, bpa: 4.62, vs_consenso: null },
  ],
  ultima_presentacion: "En la conferencia del 2T26 (11-jun-2026) la dirección anunció un giro estratégico: llevar más tráfico a las versiones gratuitas (freemium) de Firefly, Express y Acrobat para captar usuarios y aplazar las subidas de precio de Creative Cloud previstas para el segundo semestre [17]. Reconoció que eso reduce el crecimiento del ARR de suscriptores individuales en la segunda mitad: la mitad del efecto viene del aplazamiento de precios y la otra mitad del empuje freemium [17]. Mantuvo el objetivo de crecimiento del ARR total del 10,2 % para FY2026, pero ahora incluye a Semrush (unos 480 M de ARR) [8, 17]. Los usuarios activos mensuales freemium de creatividad pasaron de 50 a 90 millones en un año [17].\n\nEn la del 3T26 (10-sep-2026), la primera con Anil Chakravarthy como consejero delegado designado, el discurso pasó a los agentes de IA (software agéntico) y a los más de 1.000 millones de usuarios mensuales [16]. Las preguntas se repitieron sobre tres puntos: el RPO, que creció solo un 8 % interanual (cRPO +9 %), según un analista el primer crecimiento de un dígito desde principios de FY2023; la caída de en torno al 36-37 % del ARR neto nuevo, según un analista; y cuándo volverán las subidas de precio [16]. El director financiero interino atribuyó el RPO a la estrategia freemium y a la estacionalidad; Narayen se alegró de no haber subido precios, y nadie dio fecha para retomarlos ni cuantificó cada efecto [16].",
  extra: [
    'EBITDA trimestral = EBIT GAAP + depreciación, amortización y acrecentamiento del estado de flujos; incluye los pagos en acciones (539 M en el 3T26) [7].',
    'Crecimiento a tipo de cambio constante: 1T25 11 %, 2T25 11 %, 3T25 10 %, 4T25 10 %, 1T26 11 %, 2T26 11 %, 3T26 12 % [7-13]. Semrush consolida desde el 28-abr-2026 (2T26) y aporta unos 480 M de ARR [8].',
    'BPA no GAAP frente a la guía dada el trimestre anterior: 1T25 5,08 USD (guía 4,95-5,00), 2T25 5,06 (4,95-5,00), 3T25 5,31 (5,15-5,20), 4T25 5,50 (5,35-5,40), 1T26 6,06 (5,85-5,90), 2T26 5,96 (5,80-5,85), 3T26 6,13 (6,05-6,10): siete trimestres seguidos por encima del techo de la guía [7-14].',
    '2T26: el EBIT GAAP (2.238 M) incluye un deterioro del fondo de comercio de 70 M y una contingencia por litigios de 30 M; 1T26, contingencia de 62 M por el acuerdo con el Departamento de Justicia [8, 9].',
    'ARR total de Adobe: 25,20 mil M USD al cierre de FY2025 (+11,5 %), 26,06 mil M en el 1T26, 27,10 mil M en el 2T26 (con ~480 M de Semrush) y 27,50 mil M en el 3T26 (+11,2 % frente a 24,74 mil M revalorizado a los tipos de FY2026) [6, 8-10].',
    'AI-first ARR: más de 250 M en el 3T25, más de 500 M en el 2T26 (se triplica) y +150 % interanual en el 3T26 [7, 8, 11].',
    'Guía 4T26: ingresos de 6.800-6.850 M USD, BPA GAAP 4,65-4,70 y no GAAP 6,30-6,35, ~389 M de acciones [7].',
    'Relevo en la dirección: Anil Chakravarthy (presidente de Customer Experience Orchestration y de operaciones de campo) será consejero delegado el 1-dic-2026 y Shantanu Narayen pasará a presidente ejecutivo [15]. El director financiero es interino (Steve Day) [7].',
  ],
  confianza: 'Alta',
};

// ---- Balance (USD M). Caja = efectivo + inversiones a corto plazo. Arrendamientos operativos fuera de la deuda (US GAAP).
// [periodo, AT, AC, PC, PT, FdC, intang, PPE, clientes, proveedores, efectivo, inv_cp, deuda, PN, RE]
const B = [
  ['FY2016', 12697.2, 5839.8, 2811.6, 5272.4, 5406.5, 414.4, 816.3, 833.0, 88.0, 1011.3, 3750.0, 1892.2, 7424.8, 8114.5],
  ['FY2017', 14535.6, 7247.8, 3527.5, 6075.7, 5821.6, 385.7, 937.0, 1218.0, 113.5, 2306.0, 3513.7, 1881.4, 8459.0, 9573.9],
  ['FY2018', 18768.7, 4857.0, 4301.1, 9406.6, 10581, 2069.0, 1075.1, 1315.6, 186.3, 1643, 1586.2, 4124.8, 9362, 11815.6],
  ['FY2019', 20762, 6495, 8191, 10232, 10691, 1721, 1293, 1535, 209, 2650, 1527, 4138, 10530, 14829],
  ['FY2020', 24284, 8146, 5512, 11020, 10742, 1359, 1517, 1398, 306, 4478, 1514, 4117, 13264, 19611],
  ['FY2021', 27241, 8669, 6932, 12444, 12668, 1820, 1673, 1878, 312, 3844, 1954, 4123, 14797, 23905],
  ['FY2022', 27165, 8996, 8128, 13114, 12787, 1449, 1908, 2065, 379, 4236, 1860, 4129, 14051, 28319],
  ['FY2023', 29779, 11084, 8251, 13261, 12805, 1088, 2030, 2224, 314, 7141, 701, 3634, 16518, 33346],
  ['FY2024', 30230, 11232, 10521, 16125, 12788, 782, 1936, 2072, 361, 7613, 273, 5628, 14105, 38470],
  ['FY2025', 29496, 10163, 10200, 17873, 12857, 495, 1873, 2344, 417, 5431, 1164, 6210, 11623, 45354],
];
const balance = {
  historico: B.map(([periodo, at, ac, pc, pt, fdc, intg, ppe, cli, prov, ef, icp, deuda, pn, re]) => ({
    periodo, activo_total: at, activo_corriente: ac, pasivo_corriente: pc, pasivo_total: pt, fondo_comercio: fdc, intangibles: intg,
    inmovilizado_material: ppe, existencias: 0, clientes: cli, proveedores: prov, activos_contrato: null, pasivos_contrato: null,
    caja: r1(ef + icp), deuda_financiera: deuda, arrendamientos: 0, patrimonio_neto: pn, minoritarios: 0, reservas: re,
  })),
  vencimientos: [
    { anio: 'FY2027', importe: 1600 },
    { anio: 'FY2028', importe: 800 },
    { anio: 'FY2029', importe: 750 },
    { anio: 'FY2030', importe: 2000 },
    { anio: 'FY2031+', importe: 1250 },
  ],
  liquidez: 'A 28-ago-2026: efectivo de 4.359 M USD e inversiones a corto plazo de 1.280 M (5.639 M en total), más una línea de crédito revolving no dispuesta de 1.500 M (ampliable a 2.000 M, firmada en junio de 2022 a cinco años) y un programa de pagarés de hasta 3.000 M, del que había 250 M en circulación al 3,77 % [6]. Deuda bruta de 6.363 M (bonos de 6.150 M a la par y 250 M de pagarés) [6].',
  rating: null,
  coste_deuda_pct: 4.4,
  vida_media_anios: 3.3,
  otros_pasivos: 'Los bonos no tienen covenants financieros; los de febrero de 2020 llevan recompra al 101 % por cambio de control y límites a garantías y a ventas con arrendamiento posterior [6]. Swaps de tipo de interés sobre 2.700 M de nocional que pasan a variable (SOFR OIS) parte de los bonos [6]. Arrendamientos operativos: pasivo de 399 M a 28-ago-2026 (438 M al cierre de FY2025); en US GAAP su gasto ya está dentro del EBITDA, por eso no se suman a la deuda [1, 6]. Impuestos a pagar a largo plazo de 567 M [6]. No hay pensiones de prestación definida relevantes. Litigios abiertos: demanda colectiva de accionistas por las declaraciones sobre la competencia de Figma (periodo de jul-2021 a sep-2022) y demandas derivadas, sin estimación posible de pérdida; el caso del Departamento de Justicia sobre la cancelación de suscripciones se cerró con un acuerdo el 12-mar-2026 [6].',
  comentario: 'Adobe opera con circulante negativo: los ingresos diferidos (7.094 M a corto plazo en ago-26 frente a 3.378 M en FY2019) financian el negocio porque las suscripciones se cobran por adelantado [5, 6]. La deuda bruta subió de 1.892 M en FY2016 a 4.125 M en FY2018 por Marketo, se mantuvo en torno a 4.100 M hasta FY2022 y pasó a 6.210 M en FY2025 tras emitir 2.000 M en abril de 2024 y otros 2.000 M en enero de 2025, a la vez que la caja bajó de 7.886 M (FY2024) a 6.595 M (FY2025) [1, 5]. Las emisiones financian en parte recompras superiores al flujo libre: el patrimonio neto cayó de 16.518 M (FY2023) a 11.623 M (FY2025) con 48.847 M de autocartera acumulada [1]. A 28-ago-2026 la deuda neta de caja e inversiones a corto plazo era de unos 724 M [6].',
  extra: [
    'Ingresos diferidos totales: 7.204 M USD a 28-ago-2026 y 7.030 M al cierre de FY2025 [6].',
    'Obligaciones de ejecución pendientes (RPO): 22.160 M USD en el 3T26, de las que el 67 % se reconocerá en 12 meses [7].',
    'Bonos vivos: 850 M al 2,15 % (feb-2027), 500 M al 4,85 % (abr-2027), 800 M al 4,75 % (ene-2028), 750 M al 4,80 % (abr-2029), 700 M al 4,95 % (ene-2030), 1.300 M al 2,30 % (feb-2030), 750 M al 4,95 % (abr-2034) y 500 M al 5,30 % (ene-2035) [6].',
    'Valor razonable de los bonos: 6.030 M USD a 28-ago-2026 [6].',
  ],
  confianza: 'Alta',
};

// ---- Flujos (USD M)
// [periodo, FO, capex, adquisiciones, recompras, emision (reemisión de autocartera)]
const F = [
  ['FY2016', 2199.7, 203.8, 48.4, 1075, 145.7],
  ['FY2017', 2912.9, 178.1, 459.6, 1100, 158.4],
  ['FY2018', 4029, 267, 6314, 2050, 191],
  ['FY2019', 4422, 395, 101, 2750, 233],
  ['FY2020', 5727, 419, 0, 3050, 270],
  ['FY2021', 7230, 348, 2682, 3950, 291],
  ['FY2022', 7838, 442, 126, 6550, 278],
  ['FY2023', 7302, 360, 0, 4400, 314],
  ['FY2024', 8056, 183, 0, 9500, 361],
  ['FY2025', 10031, 179, 17, 11281, 348],
];
const flujos = {
  historico: F.map(([periodo, fo, capex, adq, rec, em]) => ({
    periodo, flujo_operativo: fo, capex, pagos_arrendamientos: 0, adquisiciones: adq, desinversiones: 0, dividendos: 0, recompras: rec, emision_acciones: em, intereses_en_financiacion: 0,
  })),
  comentario: 'La conversión de beneficio en caja es alta y estable: el flujo operativo supera al beneficio neto todos los años salvo FY2020 (por el beneficio fiscal no monetario de 1.350 M) [3, 5]. La caja la impulsan el cobro anticipado de las suscripciones (los ingresos diferidos sumaron 771 M al flujo de FY2025) y los pagos en acciones, que no consumen caja (1.942 M en FY2025) [1]. FY2024 es anómalo: los 1.000 M pagados a Figma restaron caja y el flujo operativo fue de 8.056 M frente a 10.031 M en FY2025 [1]. El capex es pequeño (179 M en FY2025, el 0,8 % de las ventas, frente a 442 M en FY2022 cuando se construían oficinas en San José) y la empresa no separa mantenimiento y crecimiento; el gasto en centros de datos de terceros va en la cuenta como coste de ventas [1, 5]. Los intereses pagados (246 M en FY2025) van en el flujo operativo [1]. Además de las recompras, Adobe paga los impuestos de la liquidación neta de acciones de los empleados (475 M en FY2025, 677 M en FY2024), que el cuadro no recoge [5].',
  extra: [
    '9M FY2026: flujo operativo de 7.646 M USD, capex de 180 M, compra de Semrush por 1.560 M neta de caja y recompras de 6.821 M [6-9].',
    'Recompras acumuladas FY2016-FY2025: 45.706 M USD; flujo operativo menos capex acumulado: 56.773 M [5].',
    'Impuestos pagados por liquidación neta de acciones: 440 M (FY2019), 681 M (FY2020), 719 M (FY2021), 518 M (FY2022), 589 M (FY2023), 677 M (FY2024), 475 M (FY2025) [5].',
  ],
  confianza: 'Alta',
};

const calidad = {
  auditor: 'KPMG LLP (Santa Clara, California)',
  anios_auditor: 43,
  opinion: 'Favorable',
  comentario: 'KPMG audita a Adobe desde 1983 y su opinión sobre las cuentas y el control interno de FY2025 es favorable; la cuestión clave de auditoría es la suficiencia de la evidencia sobre los ingresos por suscripciones vendidas en la tienda en línea, por el número de sistemas implicados [1]. El reconocimiento de ingresos es sencillo: el 96 % son suscripciones que se reconocen linealmente [1]. Los pagos en acciones son la mayor diferencia entre el beneficio contable y el que presenta la dirección: 1.942 M en FY2025, el 27 % del beneficio neto, y 1.614 M en 9M FY2026 [5, 6]. No se capitaliza I+D. La amortización de intangibles adquiridos baja (310 M en FY2025) y el deterioro de 70 M del fondo de comercio de Publishing & Advertising (2T26) es el primero del periodo [5, 6]. El tipo impositivo de FY2020 (−26 %) refleja el beneficio de 1.350 M por el traspaso de propiedad intelectual a Irlanda [3]. Desde el 1T FY2026 Adobe informa como un solo segmento, lo que reduce la información por negocio [6].',
  senales: [
    { senal: 'Pagos en acciones elevados', nivel: 'Media', comentario: '1.942 M USD en FY2025 (8,2 % de las ventas y 27 % del beneficio neto); el BPA no GAAP los excluye y la diferencia con el GAAP es de 4,24 USD por acción [1, 10].' },
    { senal: 'Pérdida de detalle por segmentos', nivel: 'Media', comentario: 'Desde el 1T FY2026 hay un solo segmento y Digital Media ARR se sustituye por el ARR total de Adobe; ya no se publican los márgenes brutos de Digital Media y Digital Experience [6].' },
    { senal: 'Recompras por encima del flujo libre financiadas con deuda', nivel: 'Media', comentario: 'En FY2024-FY2025 se recompraron 20.781 M frente a 17.725 M de flujo operativo menos capex; la deuda bruta pasó de 3.634 a 6.210 M y el patrimonio neto de 16.518 a 11.623 M [1, 5].' },
    { senal: 'Partidas no recurrentes recientes', nivel: 'Baja', comentario: 'Indemnización a Figma de 1.000 M (FY2024), deterioros de oficinas de 78 M (FY2024), contingencias legales de 92 M y deterioro del fondo de comercio de 70 M (9M FY2026) [1, 6].' },
    { senal: 'Litigios', nivel: 'Baja', comentario: 'Demanda colectiva de accionistas y demandas derivadas por las declaraciones sobre Figma, sin estimación de pérdida; el caso del Departamento de Justicia sobre las cancelaciones se cerró con acuerdo en marzo de 2026 [6].' },
  ],
  confianza: 'Alta',
};

const capital = {
  politica: 'Adobe no paga dividendo y devuelve la caja con recompras. En marzo de 2024 el consejo aprobó un programa de 25.000 M USD, agotado en 9M FY2026, y en abril de 2026 otro de 25.000 M hasta el 30-abr-2030, del que quedaban 24.550 M a 28-ago-2026 [6]. Recompra sobre todo con acuerdos estructurados con bancos [6]. Las compras van en segundo lugar: la última grande fue Semrush (1.874 M, abr-2026) [6]. Las acciones diluidas pasaron de 504,3 M en FY2016 a 427,0 M en FY2025 y a 395 M en el 3T26 [5, 7].',
  adquisiciones: [
    { anio: '2017', objetivo: 'TubeMogul (publicidad en vídeo, Digital Experience)', importe: 561, ev_ebitda: null, financiacion: 'Caja', resultado: 'Integrada en Advertising Cloud, que después pasó a Publishing and Advertising; ese negocio sufrió en FY2026 un deterioro del fondo de comercio de 70 M [3, 4, 6].' },
    { anio: '2018', objetivo: 'Magento (comercio electrónico)', importe: 1640, ev_ebitda: null, financiacion: 'Caja', resultado: 'Integrada en Adobe Commerce dentro de Digital Experience; sin deterioros del fondo de comercio [1, 4].' },
    { anio: '2018', objetivo: 'Marketo (automatización de marketing)', importe: 4730, ev_ebitda: null, financiacion: 'Caja y un préstamo a plazo de 2.250 M', resultado: 'Integrada en Digital Experience (Marketo Engage); los ingresos del segmento pasaron de 2.795 M en FY2019 a 5.864 M en FY2025 con márgenes brutos del 62 % al 72 % [1, 3].' },
    { anio: '2021', objetivo: 'Workfront (gestión del trabajo)', importe: 1520, ev_ebitda: null, financiacion: 'Caja', resultado: 'Integrada en Digital Experience; base de la oferta GenStudio [3, 6].' },
    { anio: '2021', objetivo: 'Frame.io (colaboración en vídeo)', importe: 1180, ev_ebitda: null, financiacion: 'Caja', resultado: 'Integrada en Digital Media (Creative Cloud) [3].' },
    { anio: '2024', objetivo: 'Figma (compra abandonada)', importe: 1000, ev_ebitda: null, financiacion: 'Caja', resultado: 'La compra (anunciada por unos 20.000 M, mitad en efectivo y mitad en acciones) se abandonó por la oposición de los reguladores; Adobe pagó una indemnización de 1.000 M el 20-dic-2023 (FY2024) [1, 2].' },
    { anio: '2026', objetivo: 'Semrush (visibilidad en buscadores y en motores de IA)', importe: 1874, ev_ebitda: null, financiacion: 'Caja, pagarés y deuda', resultado: 'Cerrada el 28-abr-2026; fondo de comercio de 1.251 M e intangibles de 582 M; aporta unos 480 M de ARR [6, 8].' },
  ],
  comentario: null,
  extra: [
    'Recompras: 1.075 M USD en FY2016 frente a 11.281 M en FY2025 (el 112 % del flujo operativo de ese año) [5].',
    'Acciones recompradas: 10,4 M en FY2016, 15,7 M en FY2022 y 17,5 M en FY2024; 9,5 M solo en el 3T26 [5, 7].',
  ],
  confianza: 'Alta',
};

// ---- Negocio (solo datos)
const seg = (nombre, descripcion, filas) => ({ nombre, descripcion, tipo_resultado: null, historico: filas.map(([periodo, ingresos]) => ({ periodo, ingresos, resultado: null })) });
const negocio = {
  descripcion: null,
  como_gana_dinero: null,
  segmentos: [
    seg('Digital Media', 'Creative Cloud (Photoshop, Illustrator, Premiere, Lightroom, Firefly, Express) y Document Cloud (Acrobat, Acrobat Studio).', [['FY2019', 7707], ['FY2020', 9233], ['FY2021', 11520], ['FY2022', 12842], ['FY2023', 14216], ['FY2024', 15864], ['FY2025', 17649]]),
    seg('Digital Experience', 'Plataforma de experiencia de cliente para empresas: Experience Platform, Analytics, Experience Manager, Commerce (Magento), Marketo Engage, Workfront y GenStudio.', [['FY2019', 2795], ['FY2020', 3125], ['FY2021', 3867], ['FY2022', 4422], ['FY2023', 4893], ['FY2024', 5366], ['FY2025', 5864]]),
    seg('Publishing and Advertising', 'Productos heredados: eLearning, publicación técnica, conferencias web, impresión profesional y Adobe Advertising.', [['FY2019', 669], ['FY2020', 510], ['FY2021', 398], ['FY2022', 342], ['FY2023', 300], ['FY2024', 275], ['FY2025', 256]]),
  ],
  geografias: [
    { nombre: 'América', peso_pct: 59.4 },
    { nombre: 'EMEA', peso_pct: 26.5 },
    { nombre: 'Asia-Pacífico', peso_pct: 14.1 },
  ],
  geografias_criterio: 'destino',
  clientes: null,
  kpis: [
    { kpi: 'ARR total de Adobe (mil M USD)', valor_anterior: '22,61 (FY2024)', valor_actual: '25,20 (FY2025); 27,50 (3T26)', variacion: '+11,5 % (FY2025); +11,2 % en el 3T26', comentario: 'Indicador principal desde FY2026; el 3T26 incluye unos 480 M de Semrush [6, 8, 10].' },
    { kpi: 'Digital Media ARR (mil M USD)', valor_anterior: '17,33 (FY2024)', valor_actual: '19,20 (FY2025)', variacion: '+11,5 % a tipos constantes', comentario: 'Serie: 8,40 (FY2019), 12,24 (FY2021), 15,17 (FY2023); dejó de publicarse en FY2026 [1-4, 14].' },
    { kpi: 'Obligaciones de ejecución pendientes, RPO (mil M USD)', valor_anterior: '19,96 (FY2024)', valor_actual: '22,52 (FY2025); 22,16 (3T26)', variacion: '+12,8 % (FY2025)', comentario: 'El 65 % (FY2025) y el 67 % (3T26) se reconoce en 12 meses [1, 7].' },
    { kpi: 'Ingresos por suscripción (% del total)', valor_anterior: '95,4 % (FY2024)', valor_actual: '96,4 % (FY2025); 97,4 % (3T26)', variacion: '+1,0 p.p.', comentario: 'Suscripción 22.904 M, producto 325 M y servicios 540 M en FY2025 [1, 7].' },
    { kpi: 'Suscripción Business Professionals & Consumers (M USD)', valor_anterior: '5.662 (FY2024)', valor_actual: '6.495 (FY2025); 1.905 (3T26)', variacion: '+15 % (FY2025); +16 % (3T26)', comentario: 'Acrobat y Express [1, 6].' },
    { kpi: 'Suscripción Creative & Marketing Professionals (M USD)', valor_anterior: '14.749 (FY2024)', valor_actual: '16.303 (FY2025); 4.651 (3T26)', variacion: '+11 % (FY2025); +13 % (3T26)', comentario: 'Creative Cloud y Digital Experience; el 3T26 incluye Semrush [1, 6].' },
    { kpi: 'Margen bruto de Digital Experience', valor_anterior: '70 % (FY2024)', valor_actual: '72 % (FY2025)', variacion: '+2 p.p.', comentario: 'Digital Media: 96 % y 95 %; Publishing and Advertising: 68 % y 67 % [1].' },
  ],
  extra: [
    'Desde el 1T FY2026 Adobe reporta un único segmento operativo; las cifras por segmento de FY2019-FY2025 son las del último 10-K que las publicó, reexpresadas por la empresa en FY2021 al pasar Advertising Cloud de Digital Experience a Publishing and Advertising [1-3, 6].',
    'Resultado de segmento publicado hasta FY2025: margen bruto. FY2025: Digital Media 16.808 M (95 %), Digital Experience 4.239 M (72 %), Publishing and Advertising 171 M (67 %) [1].',
    'Ingresos por suscripción por segmento en FY2025: Digital Media 17.389 M, Digital Experience 5.409 M, Publishing and Advertising 106 M [1].',
    'Creative ARR 13,85 mil M y Document Cloud ARR 3,48 mil M al cierre de FY2024 [14]; Creative ARR 12,37 mil M y Document Cloud ARR 2,81 mil M al cierre de FY2023 [2].',
    'Geografías FY2025 (por dónde el cliente gestiona el uso): América 14.120 M, EMEA 6.289 M, Asia-Pacífico 3.360 M [1].',
    'Usuarios activos mensuales: más de 1.000 millones en creatividad y productividad (3T26) [7].',
  ],
  confianza: 'Alta',
};

const huecos = [
  { seccion: 'trimestres', campo: 'vs_consenso', tipo: 'Complemento', intentos: '1) notas de resultados de Adobe (no publican consenso); 2) 10-Q (no lo recogen); 3) se compara con la guía de la propia empresa en trimestres.extra; el consenso previo de cada trimestre no está en fuentes primarias gratuitas', decision: 'Omitido' },
  { seccion: 'balance', campo: 'rating', tipo: 'Núcleo', intentos: '1) 10-K FY2025 (sin mención a las agencias); 2) 10-Q 3T26 (sin mención); 3) folleto de las emisiones de 2024-2025 en EDGAR (pendiente de revisar en la integración)', decision: 'Omitido' },
];

const out = { negocio, financieros, trimestres, balance, flujos, calidad, rentabilidad: null, capital, fuentes, huecos };
if (process.argv[2]) out._estado = { terminado: process.argv[2], resumen: process.argv.slice(3).join(' ') };
writeFileSync(join(dir, 'A.json'), JSON.stringify(out, null, 2), 'utf8');
console.log('A.json escrito');
