// Notas A-E de Zhejiang DunAn Artificial Environment (002011.SZ, corte 2026-10-19). China sin XBRL público:
// cuentas CAS de los informes anuales 2021-2025, semestrales 1S25 y 1S26 y trimestrales de CNINFO (en notas/docs/).
// 2022 reexpresado (fusión bajo control común en 2023): se usa la cifra reexpresada del informe de 2023.
// Cada nota cita solo con [n] de su propia lista. Ejecutar: node informes/dunan-2026-10-19/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const bolsa = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const comp = JSON.parse(fs.readFileSync(path.join(dir, 'comparables-yahoo.json'), 'utf8'));
const CN = 'http://static.cninfo.com.cn/finalpage';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: '2025年年度报告 (informe anual 2025, CAS: cuentas consolidadas, ventas por producto y región, trimestres, notas de deuda, arrendamientos, fondo de comercio, auditor)', editor: 'Zhejiang DunAn Artificial Environment (CNINFO)', tipo: 'Primaria', fecha: '2026-04-29', url: `${CN}/2026-04-29/1225243151.PDF` },
  { id: 2, titulo: '2024年年度报告 (informe anual 2024: compra de Shanghai Dachuang, trimestres 2024, desglose de la deuda)', editor: 'Zhejiang DunAn Artificial Environment (CNINFO)', tipo: 'Primaria', fecha: '2025-04-18', url: `${CN}/2025-04-18/1223129034.PDF` },
  { id: 3, titulo: '2023年年度报告 (informe anual 2023: cuentas 2023 y 2022 reexpresado, trimestres 2023)', editor: 'Zhejiang DunAn Artificial Environment (CNINFO)', tipo: 'Primaria', fecha: '2024-04-19', url: `${CN}/2024-04-19/1219666793.PDF` },
  { id: 4, titulo: '2022年年度报告 (informe anual 2022: cuentas 2022 y 2021, balance de apertura de 2022)', editor: 'Zhejiang DunAn Artificial Environment (CNINFO)', tipo: 'Primaria', fecha: '2023-04-22', url: `${CN}/2023-04-22/1216526985.PDF` },
  { id: 5, titulo: '2021年年度报告 (informe anual 2021: cuenta 2021 y 2020, ventas por producto)', editor: 'Zhejiang DunAn Artificial Environment (CNINFO)', tipo: 'Primaria', fecha: '2022-04-08', url: `${CN}/2022-04-08/1212839637.PDF` },
  { id: 6, titulo: '2026年半年度报告 (informe semestral 2026: balance a 30-jun-2026, cuenta y flujos del 1S26, ventas por producto, caja restringida)', editor: 'Zhejiang DunAn Artificial Environment (CNINFO)', tipo: 'Primaria', fecha: '2026-08-27', url: `${CN}/2026-08-27/1225513924.PDF` },
  { id: 7, titulo: '2025年半年度报告 (informe semestral 2025: cuenta, amortizaciones y flujos del 1S25)', editor: 'Zhejiang DunAn Artificial Environment (CNINFO)', tipo: 'Primaria', fecha: '2025-08-23', url: `${CN}/2025-08-23/1224559348.PDF` },
  { id: 8, titulo: '2026年一季度报告 (informe del 1T26)', editor: 'Zhejiang DunAn Artificial Environment (CNINFO)', tipo: 'Primaria', fecha: '2026-04-29', url: `${CN}/2026-04-29/1225243159.PDF` },
  { id: 9, titulo: '2025年三季度报告 (informe del 3T25)', editor: 'Zhejiang DunAn Artificial Environment (CNINFO)', tipo: 'Primaria', fecha: '2025-10-25', url: `${CN}/2025-10-25/1224731955.PDF` },
  { id: 10, titulo: '2025年度利润分配预案公告 (propuesta de dividendo de 0,10 CNY; sin dividendo en 2023 y 2024)', editor: 'Zhejiang DunAn Artificial Environment (CNINFO)', tipo: 'Primaria', fecha: '2026-04-29', url: `${CN}/2026-04-29/1225243161.PDF` },
  { id: 11, titulo: '2025年年度权益分派实施公告 (pago del dividendo sobre 1.074.477.339 acciones)', editor: 'Zhejiang DunAn Artificial Environment (CNINFO)', tipo: 'Primaria', fecha: '2026-08-05', url: `${CN}/2026-08-05/1225458512.PDF` },
  { id: 12, titulo: '关于向激励对象授予限制性股票与股票期权的公告 (plan de incentivos 2025: 10,075 M acciones restringidas a 7,05 CNY y 4,77 M opciones a 14,10 CNY; objetivos de beneficio 2025-2027)', editor: 'Zhejiang DunAn Artificial Environment (CNINFO)', tipo: 'Primaria', fecha: '2025-11-27', url: `${CN}/2025-11-27/1224828992.PDF` },
];

const cuenta = [
  { periodo: '2021', ingresos: 9836.98, coste_ventas: 8233.12, gastos_generales: 563.61, ebitda: 815.40, amortizaciones: 211.94, ebit: 603.46, resultado_financiero: -155.90, bai: 447.56, impuestos: 52.13, minoritarios: -9.94, beneficio_neto: 405.36, gastos_financieros: 114.46, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 0.44, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: 917.2 },
  { periodo: '2022', ingresos: 10208.89, coste_ventas: 8488.47, gastos_generales: 567.67, ebitda: 905.06, amortizaciones: 244.24, ebit: 660.82, resultado_financiero: 264.38, bai: 925.20, impuestos: 94.27, minoritarios: -3.06, beneficio_neto: 833.98, gastos_financieros: 128.24, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 0.91, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: 916.5 },
  { periodo: '2023', ingresos: 11382.45, coste_ventas: 9197.92, gastos_generales: 693.95, ebitda: 1223.39, amortizaciones: 251.34, ebit: 972.05, resultado_financiero: -115.77, bai: 856.28, impuestos: 123.82, minoritarios: -5.58, beneficio_neto: 738.04, gastos_financieros: 69.28, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 0.70, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: 1054.3 },
  { periodo: '2024', ingresos: 12678.36, coste_ventas: 10367.82, gastos_generales: 719.18, ebitda: 1434.07, amortizaciones: 269.64, ebit: 1164.43, resultado_financiero: 3.92, bai: 1168.35, impuestos: 128.14, minoritarios: -4.67, beneficio_neto: 1044.89, gastos_financieros: 65.76, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 0.99, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: 1055.4 },
  { periodo: '2025', ingresos: 13034.51, coste_ventas: 10625.87, gastos_generales: 708.89, ebitda: 1414.07, amortizaciones: 251.04, ebit: 1163.03, resultado_financiero: 51.84, bai: 1214.87, impuestos: 146.93, minoritarios: -10.00, beneficio_neto: 1077.93, gastos_financieros: 33.17, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 1.02, dpa: 0.10, dpa_extraordinario: 0, acciones_diluidas: 1056.8 },
];
const balanceH = [
  { periodo: '2021', activo_total: 8261.26, activo_corriente: 6343.70, pasivo_corriente: 5839.49, pasivo_total: 6625.66, fondo_comercio: 0, intangibles: 200.24, inmovilizado_material: 926.95, existencias: 1476.38, clientes: 2552.65, proveedores: 2543.44, activos_contrato: 263.99, pasivos_contrato: 107.18, caja: 1063.65, deuda_financiera: 2361.37, arrendamientos: 245.15, patrimonio_neto: 1735.42, minoritarios: -99.83, reservas: -1437.42 },
  { periodo: '2022', activo_total: 8327.98, activo_corriente: 6474.06, pasivo_corriente: 4282.14, pasivo_total: 4783.55, fondo_comercio: 0, intangibles: 182.22, inmovilizado_material: 918.42, existencias: 1261.80, clientes: 2464.33, proveedores: 2442.14, activos_contrato: 317.21, pasivos_contrato: 85.16, caja: 1630.73, deuda_financiera: 1093.96, arrendamientos: 191.52, patrimonio_neto: 3648.41, minoritarios: -103.98, reservas: -620.80 },
  { periodo: '2023', activo_total: 10782.98, activo_corriente: 8783.83, pasivo_corriente: 5498.95, pasivo_total: 6396.80, fondo_comercio: 0, intangibles: 174.95, inmovilizado_material: 1020.82, existencias: 1278.67, clientes: 3813.25, proveedores: 3346.17, activos_contrato: 289.41, pasivos_contrato: 126.07, caja: 3026.19, deuda_financiera: 1680.05, arrendamientos: 147.66, patrimonio_neto: 4417.31, minoritarios: -31.13, reservas: 123.87 },
  { periodo: '2024', activo_total: 12153.29, activo_corriente: 9690.02, pasivo_corriente: 6198.88, pasivo_total: 6641.50, fondo_comercio: 169.43, intangibles: 353.82, inmovilizado_material: 1132.38, existencias: 1660.38, clientes: 4229.63, proveedores: 3891.19, activos_contrato: 363.38, pasivos_contrato: 77.59, caja: 3216.21, deuda_financiera: 1353.05, arrendamientos: 95.69, patrimonio_neto: 5509.48, minoritarios: 2.31, reservas: 1168.76 },
  { periodo: '2025', activo_total: 12290.24, activo_corriente: 9794.83, pasivo_corriente: 5016.83, pasivo_total: 5631.48, fondo_comercio: 125.82, intangibles: 358.60, inmovilizado_material: 1238.20, existencias: 1334.57, clientes: 4514.12, proveedores: 3528.57, activos_contrato: 264.06, pasivos_contrato: 101.39, caja: 3472.17, deuda_financiera: 720.46, arrendamientos: 12.72, patrimonio_neto: 6666.35, minoritarios: -7.60, reservas: 2229.46 },
];
const flujosH = [
  { periodo: '2021', flujo_operativo: 517.74, capex: 243.58, pagos_arrendamientos: 6.87, adquisiciones: 0, desinversiones: 361.36, dividendos: 0, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 139.13 },
  { periodo: '2022', flujo_operativo: 1268.37, capex: 195.62, pagos_arrendamientos: 6.68, adquisiciones: 0, desinversiones: 91.70, dividendos: 0, recompras: 0, emision_acciones: 801.51, intereses_en_financiacion: 105.40 },
  { periodo: '2023', flujo_operativo: 811.80, capex: 430.39, pagos_arrendamientos: 91.62, adquisiciones: 0, desinversiones: 356.79, dividendos: 0, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 54.17 },
  { periodo: '2024', flujo_operativo: 1160.59, capex: 441.65, pagos_arrendamientos: 71.51, adquisiciones: 109.40, desinversiones: 61.08, dividendos: 0, recompras: 0, emision_acciones: 58.23, intereses_en_financiacion: 49.17 },
  { periodo: '2025', flujo_operativo: 1440.19, capex: 369.34, pagos_arrendamientos: 60.84, adquisiciones: 0, desinversiones: 20.23, dividendos: 0, recompras: 0, emision_acciones: 71.03, intereses_en_financiacion: 23.69 },
];
const segHist = (vals) => ['2021', '2022', '2023', '2024', '2025'].map((p, i) => ({ periodo: p, ingresos: vals[i], resultado: null }));

const A = {
  _estado: 'completo',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 13535.86, ebitda: 1353.18, ebit: 1113.04, beneficio_neto: 1009.47, bpa: 0.95, dpa: 0.10, dpa_extraordinario: 0, fcf: 1217.8, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [{ periodo: '2024', descripcion: 'Shanghai Dachuang Automotive Technology (65,95 %), consolidada desde el 1-jul-2024: 244,6 M CNY, fondo de comercio de 181,9 M; aporta medio año en 2024' }],
    comentario: 'Ventas de 9.837 M CNY en 2021 a 13.035 M en 2025 (TCAC del 7,3 %), todo orgánico salvo Shanghai Dachuang (51 M de ventas en el 2S24) [A1, A2]. El salto está en el margen: el margen bruto pasó del 16,3 % en 2021 al 18,5 % en 2025 y el EBIT (resultado de explotación sin ingresos financieros, de inversiones ni de valor razonable) del 6,1 % al 8,9 % [A1, A4]. El componente que más pesa es la materia prima: el 75,6 % del coste de ventas de 2025 es cobre, acero y latón [A1]. 2026 se tuerce: en el 1S26 las ventas crecen un 7,4 % (7.231 M), pero el beneficio atribuido cae un 12,8 % (467 M) por el cobre más caro, las diferencias de cambio (gasto financiero de 11,0 M frente a 0,5 M) y una mezcla con más «otros negocios» de margen bajo (+88,8 %) [A6]. El 2T26 vendió 4.174 M (+12,6 %) con un beneficio de 271 M (−14,8 %) [A6, A8].',
    ajustes: 'Cifras CAS publicadas, sin ajustes. EBIT = resultado de explotación + gastos financieros netos − ingresos de inversiones − cambios de valor razonable; las partidas fuera de explotación (营业外) quedan en el resultado financiero del informe. Esas partidas fueron grandes en los años del saneamiento ligado a la quiebra del antiguo accionista (DunAn Holding): +432 M de ingresos extraordinarios en 2022, −117 M de gastos extraordinarios en 2023 y pérdidas por deterioro de cuentas a cobrar de 106 M en 2022 y 95 M en 2023, con reversión parcial en 2024 [A3, A4]. El beneficio recurrente (扣非) fue de 821 M en 2023, 929 M en 2024 y 992 M en 2025 [A1]. En 2025 hay además 43,6 M de deterioro del fondo de comercio de Dachuang [A1].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '3T24', ingresos: 2990.04, crecimiento_pct: 4.1, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.17, vs_consenso: null },
      { periodo: '4T24', ingresos: 3342.60, crecimiento_pct: 13.8, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.37, vs_consenso: null },
      { periodo: '1T25', ingresos: 3021.23, crecimiento_pct: 15.0, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.21, vs_consenso: null },
      { periodo: '2T25', ingresos: 3708.16, crecimiento_pct: -0.3, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.30, vs_consenso: null },
      { periodo: '3T25', ingresos: 2993.40, crecimiento_pct: 0.1, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.22, vs_consenso: null },
      { periodo: '4T25', ingresos: 3311.71, crecimiento_pct: -0.9, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.29, vs_consenso: null },
      { periodo: '1T26', ingresos: 3056.66, crecimiento_pct: 1.2, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.19, vs_consenso: null },
      { periodo: '2T26', ingresos: 4174.09, crecimiento_pct: 12.6, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.25, vs_consenso: 'Inferior' },
    ],
    ultima_presentacion: 'DunAn no publica transcripciones; el discurso sale de los informes de gestión del anual 2025 y del 1S26 [A1, A6]. En abril la dirección vendía «crecimiento estable» con tres patas: componentes para aire acondicionado (75 % de las ventas), equipos (núcleo, semiconductores, almacenamiento) y gestión térmica del vehículo eléctrico (+52 % en 2025) [A1]. En agosto el tono cambia: reconoce que el aire acondicionado doméstico chino produjo un 4,9 % menos en el 1S26, que el mercado de aire acondicionado central cayó un 18 % y que el fin de las ayudas al recambio pesa; pone el foco en los centros de datos («algunos componentes para refrigeración de centros de datos crecen más del 40 %»), en las válvulas de acero inoxidable (+100 % en algunos productos) y en 120 nuevas adjudicaciones de válvulas para coches [A6]. No cuantifica el negocio de centros de datos ni da una guía anual; tampoco explica el peso del cobre en la caída del margen bruto de exportación (−4,9 puntos, al 22,7 %) [A6]. BPA trimestral = beneficio atribuido ÷ 1.060 M de acciones medias (estimación propia; la empresa solo da el BPA semestral: 0,44 en el 1S26) [A6].',
    confianza: 'Media',
  },
  balance: {
    historico: balanceH,
    vencimientos: [{ anio: '2026', importe: 234.9 }, { anio: '2027+', importe: 484.5 }],
    liquidez: 'Caja de 3.620 M CNY a 30-jun-2026 (135 M restringidos como garantía de efectos y otros) y efectos bancarios a cobrar de 2.245 M frente a 719 M de deuda bancaria y 28 M de arrendamientos [A6]. 200 M de la caja están depositados en Gree Group Finance, la financiera del accionista de control (límite diario de 300 M) [A6].',
    rating: 'Sin rating',
    coste_deuda_pct: 3.2,
    vida_media_anios: 1.5,
    otros_pasivos: 'Sin pensiones de prestación definida relevantes ni bonos. La deuda bancaria bajó de 2.361 M en 2021 a 720 M en 2025 [A4, A1]. Garantías a filiales dentro del grupo y avales de efectos comerciales (efectos a pagar de 1.502 M a jun-26) [A6]. El circulante usa mucho efecto bancario: 2.245 M de efectos a cobrar (应收款项融资) y 1.502 M a pagar; se tratan como clientes y proveedores, no como caja ni deuda. Fondo de comercio residual de 125,8 M (Dachuang) tras deteriorar 56,1 M en 2024-2025; el plan de Dachuang (910 M de ventas y 71 M de beneficio acumulados en 2024-2026) está en riesgo [A1].',
    comentario: 'El balance pasó de la crisis a la caja neta: patrimonio de 1.735 M y deuda de 2.361 M en 2021, con pérdidas acumuladas de 1.437 M heredadas de las garantías al antiguo accionista; en 2025, patrimonio de 6.666 M y caja neta de unos 2.740 M [A4, A1]. La ampliación de 810 M suscrita por Gree en 2022 (139,4 M de acciones a 5,81 CNY) y cuatro años de beneficios lo explican [A3]. El circulante comercial (existencias + clientes + efectos − proveedores − efectos a pagar) ronda el 18-19 % de las ventas y sube en el primer semestre por la campaña (existencias de 1.688 M a jun-26) [A6].',
    confianza: 'Alta',
  },
  flujos: { historico: flujosH, comentario: 'Flujo operativo de 1.440 M en 2025 (134 % del beneficio) y 547 M en el 1S26 (+71 %), por más cobros en caja y menos efectos [A1, A6]. El capex fue de 369 M en 2025 y de 242 M en el 1S26, por la nueva sede y fábrica inteligente; con la amortización en 251 M, unos 250 M serían de mantenimiento (estimación propia: amortización) y el resto de crecimiento [A1, A6]. 2021-2022 no son comparables: hubo desinversiones de activos del negocio de ahorro energético (361 M en 2021) y la ampliación de Gree (802 M netos en 2022) [A4]. Los pagos de arrendamientos de 2021-2022 son los «alquileres y fianzas» que publica la empresa (6-7 M); desde 2023 se publica el pago de pasivos por arrendamiento (92 M en 2023, 61 M en 2025) [A3, A1]. No se pagaron dividendos de 2021 a 2025: el primero, 107 M (0,10 CNY), se pagó en agosto de 2026 [A10, A11].', confianza: 'Alta' },
  calidad: {
    auditor: 'Zhongshen Zhonghuan (中审众环会计师事务所)',
    anios_auditor: 4,
    opinion: 'Favorable (sin salvedades) en 2025, con control interno también auditado',
    comentario: null, senales: null,
    confianza: 'Alta',
  },
  capital: {
    politica: 'Primer dividendo en años: 0,10 CNY por acción con cargo a 2025 (107 M, el 9,97 % del beneficio), limitado por las reservas de la matriz (155 M distribuibles a fin de 2025, tras años de pérdidas) [A10]. No hay recompras de acciones en el mercado; la autocartera contable (102 M) corresponde a las acciones restringidas de los planes de incentivos, que se recompran a precio de concesión cuando no se cumplen objetivos [A1, A6]. La empresa invierte en la nueva sede y fábrica (智能智造总部基地) y prioriza gestión térmica del vehículo, centros de datos y almacenamiento [A6].',
    adquisiciones: [
      { anio: '2024', objetivo: 'Shanghai Dachuang Automotive Technology (65,95 %; bombas y válvulas de agua para gestión térmica del vehículo)', importe: 244.6, ev_ebitda: null, financiacion: 'Caja', resultado: 'Fondo de comercio de 181,9 M; deterioros de 12,5 M en 2024 y 43,6 M en 2025 [A1, A2]' },
    ],
    comentario: null,
    confianza: 'Media',
  },
  negocio: {
    segmentos: [
      { nombre: 'Componentes de climatización', descripcion: 'Válvulas de cierre, de cuatro vías, de expansión electrónica y térmica, solenoides, depósitos, intercambiadores y tuberías para aire acondicionado, bombas de calor y refrigeración comercial', tipo_resultado: null, historico: segHist([7757.56, 7776.11, 8455.95, 9612.12, 9837.72]) },
      { nombre: 'Equipos de refrigeración', descripcion: 'Aire acondicionado central comercial y equipos especiales: salas limpias de semiconductores, nuclear, ferrocarril, almacenamiento de energía y frío', tipo_resultado: null, historico: segHist([1492.83, 1489.54, 1646.38, 1495.53, 1162.96]) },
      { nombre: 'Gestión térmica del vehículo eléctrico', descripcion: 'Válvulas de refrigerante, bombas y válvulas de agua y control electrónico para baterías, motor y habitáculo', tipo_resultado: null, historico: segHist([51.25, 199.89, 472.82, 811.65, 1234.03]) },
      { nombre: 'Otros negocios', descripcion: 'Venta de materiales, chatarra y otros ingresos no principales', tipo_resultado: null, historico: segHist([535.34, 743.34, 807.30, 759.07, 799.79]) },
    ],
    geografias: [
      { nombre: 'China', peso_pct: 83.35 },
      { nombre: 'Fuera de China', peso_pct: 16.65 },
    ],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Ventas de componentes de climatización (M CNY)', valor_anterior: '9.612 (2024)', valor_actual: '9.838 (2025)', variacion: '+2,3 %', comentario: '5.306 M en el 1S26, −2,0 % [A1, A6]' },
      { kpi: 'Ventas de gestión térmica del vehículo (M CNY)', valor_anterior: '812 (2024)', valor_actual: '1.234 (2025)', variacion: '+52,0 %', comentario: '606 M en el 1S26, +25,9 % [A1, A6]' },
      { kpi: 'Margen bruto del grupo', valor_anterior: '18,2 % (2024)', valor_actual: '18,5 % (2025)', variacion: '+0,3 pp', comentario: '16,3 % en el 1S26 (17,8 % en la actividad principal) [A1, A6]' },
      { kpi: 'Margen bruto de exportación', valor_anterior: '26,5 % (2024)', valor_actual: '25,8 % (2025)', variacion: '−0,7 pp', comentario: '22,7 % en el 1S26, −4,9 pp [A1, A6]' },
      { kpi: 'Peso de las ventas fuera de China', valor_anterior: '18,0 % (2024)', valor_actual: '16,6 % (2025)', variacion: '−1,4 pp', comentario: '17,2 % en el 1S26 [A1, A6]' },
      { kpi: 'Equipos de refrigeración (M CNY)', valor_anterior: '1.496 (2024)', valor_actual: '1.163 (2025)', variacion: '−22,2 %', comentario: '652 M en el 1S26, +35,0 % (semiconductores, nuclear, almacenamiento) [A1, A6]' },
    ],
    confianza: 'Alta',
  },
  fuentes: fA,
  huecos: [
    { seccion: 'trimestres', campo: 'ebitda trimestral', tipo: 'Complemento', intentos: '1) Informes trimestrales CAS (cuenta abreviada sin amortización); 2) informe semestral (amortización solo semestral); 3) prorratear la amortización semestral: descartado por las diferencias de cambio que mueven el resultado de cada trimestre', decision: 'Omitido' },
  ],
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: '2025年年度报告 (informe anual 2025: sector, posición mundial, clientes, competidores, I+D)', editor: 'Zhejiang DunAn Artificial Environment (CNINFO)', tipo: 'Primaria', fecha: '2026-04-29', url: `${CN}/2026-04-29/1225243151.PDF` },
  { id: 2, titulo: '2026年半年度报告 (informe semestral 2026: datos de Chanye Online e i-Media del 1S26, cuotas mundiales, centros de datos, patentes)', editor: 'Zhejiang DunAn Artificial Environment (CNINFO)', tipo: 'Primaria', fecha: '2026-08-27', url: `${CN}/2026-08-27/1225513924.PDF` },
  { id: 3, titulo: '2024年年度报告 (informe anual 2024: producción y ventas de aire acondicionado doméstico de 2024, Chanye Online)', editor: 'Zhejiang DunAn Artificial Environment (CNINFO)', tipo: 'Primaria', fecha: '2025-04-18', url: `${CN}/2025-04-18/1223129034.PDF` },
  { id: 4, titulo: '2023年年度报告 (informe anual 2023: ventas de aire acondicionado doméstico y central de 2023, Chanye Online)', editor: 'Zhejiang DunAn Artificial Environment (CNINFO)', tipo: 'Primaria', fecha: '2024-04-19', url: `${CN}/2024-04-19/1219666793.PDF` },
  { id: 5, titulo: 'Zhejiang Sanhua Intelligent Controls: 2025年年度报告摘要 (resumen del informe anual 2025: ventas 31.012 M, beneficio 4.063 M, clientes)', editor: 'Zhejiang Sanhua Intelligent Controls (CNINFO)', tipo: 'Primaria', fecha: '2026-03-24', url: `${CN}/2026-03-24/1225026521.PDF` },
  { id: 6, titulo: 'Zhejiang Sanhua Intelligent Controls: 2026年半年度报告摘要 (1S26: ventas 16.900 M, +3,9 %; beneficio 2.044 M, −3,1 %)', editor: 'Zhejiang Sanhua Intelligent Controls (CNINFO)', tipo: 'Primaria', fecha: '2026-08-27', url: `${CN}/2026-08-27/1225514003.PDF` },
  { id: 7, titulo: 'Global Electronic Expansion Valves Market … USD 1,986.0 Million by 2035 … 8.4% CAGR (886,5 M USD en 2025)', editor: 'Future Market Insights / GlobeNewswire', tipo: 'Sectorial', fecha: '2025-01-14', url: 'https://www.globenewswire.com/news-release/2025/01/14/3008963/0/en/Global-Electronic-Expansion-Valves-Market-Set-to-Achieve-Remarkable-Growth-with-a-Projected-Size-of-USD-1-986-0-Million-by-2035-Driven-by-a-Decent-8-4-CAGR-Future-Market-Insights-I.html' },
  { id: 8, titulo: 'Ficha de Yahoo Finance (cuentas anuales 2025: ventas y EBIT de Yinlun, Aotecar, Songz, Envicool, Shenling, Hanon Systems y Modine)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/' },
  { id: 9, titulo: '2025年度环境、社会及公司治理（ESG）报告 (informe ESG 2025: emisiones de alcance 1 y 2, calificación Wind A)', editor: 'Zhejiang DunAn Artificial Environment (CNINFO)', tipo: 'Primaria', fecha: '2026-04-29', url: `${CN}/2026-04-29/1225243173.PDF` },
];
const B = {
  _estado: 'completo',
  historia: {
    resumen: 'DunAn nace en Zhuji (Zhejiang) en los años ochenta como fabricante de válvulas de cobre para aire acondicionado dentro del grupo privado DunAn Holding, y sale a bolsa en Shenzhen en 2004 [B1]. Durante los 2010 diversifica hacia equipos de climatización y ahorro energético. En 2018 la crisis de deuda de DunAn Holding arrastra a la cotizada por garantías cruzadas: pérdidas de 1.033 M en 2020, patrimonio de solo 1.735 M en 2021 y pérdidas acumuladas de 1.437 M [B1]. En abril de 2022 Gree Electric, su mayor cliente, compra el 29,48 % a DunAn Precision y toma el control; en enero de 2023 suscribe además 139,4 M de acciones nuevas a 5,81 CNY y llega al 38 % [B1]. Desde entonces la empresa limpia el balance, vende el negocio de ahorro energético y crece en gestión térmica del vehículo eléctrico y en refrigeración para centros de datos [B1, B2].',
    hitos: [
      { anio: '2004', hito: 'Salida a bolsa en la Bolsa de Shenzhen (002011) [B1]' },
      { anio: '2018', hito: 'Crisis de deuda del accionista DunAn Holding; garantías y préstamos cruzados contaminan la cotizada [B1]' },
      { anio: '2020', hito: 'Pérdida de 1.033 M CNY por deterioros y provisiones del negocio de ahorro energético y de las garantías [B1]' },
      { anio: '2022', hito: 'Gree Electric compra 270,36 M de acciones a DunAn Precision (abril) y se convierte en accionista de control [B1]' },
      { anio: '2023', hito: 'Ampliación de 810 M CNY suscrita por Gree (139,4 M de acciones a 5,81); primer plan de incentivos en acciones [B1]' },
      { anio: '2024', hito: 'Compra del 65,95 % de Shanghai Dachuang (bombas y válvulas de agua para coche eléctrico) por 244,6 M [B1]' },
      { anio: '2025', hito: 'Récord de ventas (13.035 M) y beneficio (1.078 M); primer dividendo en años (0,10 CNY) [B1]' },
      { anio: '2026', hito: 'Caída del beneficio del 1S26 (−12,8 %) con el aire acondicionado doméstico chino a la baja; subida del 51 % de la acción en septiembre por la moda de la refrigeración líquida [B2]' },
    ],
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'DunAn fabrica los componentes que regulan el paso del refrigerante en un aparato de aire acondicionado o una bomba de calor: válvulas de cierre (primera del mundo en cuota), válvulas de cuatro vías y de expansión electrónica (segunda del mundo), solenoides, depósitos, intercambiadores de microcanal y conjuntos de tuberías [B2]. Es el 75 % de las ventas y se vende a los grandes fabricantes chinos y extranjeros de aire acondicionado [B1]. Un 9 % son equipos completos de aire acondicionado central y climatización especial (salas limpias de SMIC, CXMT o JCET, centrales nucleares —96 unidades en 34 plantas—, almacenamiento de energía con BYD o CRRC) y otro 9 % es gestión térmica del coche eléctrico (válvulas de refrigerante, bombas de agua) para BYD, Geely, SAIC, Chery, NIO, XPeng, Li Auto o Leapmotor [B2]. Tiene 20 fábricas: 17 en China, muchas junto a las de sus clientes (Zhuji, Tianjin, Zhuhai, Nantong, Hefei, Wuhu, Chongqing…), y 3 en Tailandia, más 9 oficinas comerciales en el extranjero [B1, B2].',
    como_gana_dinero: 'Margen de fabricante de componentes: margen bruto del 18,5 % en 2025 y EBIT del 8,9 % [B1]. Las ventas siguen a la producción de aire acondicionado en China (19.839 M de aparatos vendidos en 2025) con pedidos «bajo pedido» sin contratos plurianuales [B1]. El 75,6 % del coste es materia prima (cobre, latón y acero), que se traslada al precio con retraso: cuando el cobre sube rápido, el margen cae unos trimestres (1S26) [B1, B2]. Hay estacionalidad: el 2T es el trimestre fuerte (campaña de verano) y las existencias suben en el primer semestre [B2]. El apalancamiento operativo es moderado: I+D (4,1 % de las ventas) y gastos comerciales y generales (5,4 %) son en gran parte fijos [B1].',
    clientes: 'Concentración alta: los cinco primeros clientes son el 45,1 % de las ventas de 2025 y el primero, el 20,6 %, es parte vinculada: Gree Electric, el accionista de control [B1]. La junta aprobó para 2026 un techo de 3.300 M de operaciones vinculadas con Gree [B1]. Los demás grandes clientes son fabricantes de aire acondicionado chinos y extranjeros (la empresa no da nombres). El poder de precio es limitado: la empresa repercute el cobre con retraso y el margen bruto de exportación cayó del 27,6 % en el 1S25 al 22,7 % en el 1S26 [B2]. Las ventas a distribuidores bajaron un 26,7 % en 2025 y las directas subieron un 5,3 % [B1].',
    confianza: 'Alta',
  },
  sector: {
    definicion: 'El mercado relevante son los componentes de control del refrigerante (válvulas de cuatro vías, de expansión, de cierre, solenoides) para aire acondicionado doméstico y comercial, bombas de calor y, cada vez más, coche eléctrico y centros de datos. No hay una estadística pública del tamaño en valor de todo el conjunto; se usa la producción de aire acondicionado doméstico chino de Chanye Online (产业在线), que citan DunAn y Sanhua y marca el volumen de válvulas, y como contraste el mercado mundial de válvulas de expansión electrónica de Future Market Insights (886,5 M USD en 2025, +8,4 % anual hasta 2035) [B1, B5, B7]. Las válvulas de expansión son solo una parte de las ventas de DunAn, por eso no se usa ese dato como mercado total.',
    tamano: '≈ 198,4 M de aparatos de aire acondicionado doméstico vendidos por fabricantes chinos en 2025 (Chanye Online) [B1]; válvulas de expansión electrónica: 886,5 M USD en 2025 (Future Market Insights) [B7]',
    unidad_serie: 'millones de aparatos de aire acondicionado doméstico vendidos por fabricantes chinos (Chanye Online)',
    serie: [
      { anio: '2023', tamano: 170.44 },
      { anio: '2024', tamano: 200.85 },
      { anio: '2025', tamano: 198.39 },
    ],
    tcac_historico_pct: 7.9,
    tcac_previsto_pct: 8.4,
    cr5_pct: null,
    estructura: 'Concentrada',
    drivers: [
      { driver: 'Producción de aire acondicionado doméstico en China', efecto: '+/−', horizonte: 'Cíclico', evidencia: '+17,8 % en 2024, −1,2 % en 2025 y −6,2 % en ventas del 1S26, por el fin de las ayudas al recambio [B1, B2]' },
      { driver: 'Cambio a refrigerantes de bajo potencial de calentamiento y más eficiencia', efecto: '+', horizonte: 'Estructural', evidencia: 'Más válvulas de expansión electrónica por aparato y válvulas de acero inoxidable (+100 % en algunos productos de DunAn en el 1S26) [B2]' },
      { driver: 'Gestión térmica del coche eléctrico', efecto: '+', horizonte: 'Estructural', evidencia: 'Producción china de eléctricos +6,7 % en el 1S26 y ventas del segmento de DunAn +25,9 % [B2]' },
      { driver: 'Refrigeración de centros de datos y almacenamiento', efecto: '+', horizonte: 'Estructural', evidencia: 'Componentes de DunAn para centros de datos +40 % en el 1S26; exportación de aire acondicionado central +12,7 % en 2025 [B2, B5]' },
      { driver: 'Precio del cobre', efecto: '−', horizonte: 'Cíclico', evidencia: 'El 75,6 % del coste de ventas es materia prima; margen bruto del 1S26 1,6 puntos por debajo de 2025 [B1, B2]' },
      { driver: 'Aire acondicionado central y vivienda en China', efecto: '−', horizonte: 'Cíclico', evidencia: 'Mercado chino de aire acondicionado central −18 % en el 1S26 (i-Media) [B2]' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Duopolio mundial en válvulas de cuatro vías y de expansión (Sanhua primera, DunAn segunda) con márgenes distintos: EBIT del 16,1 % de Sanhua frente al 8,9 % de DunAn en 2025 [B5, B8, B1]' },
      { fuerza: 'Poder de los clientes', intensidad: 4, justificacion: 'Clientes muy concentrados (cinco primeros 45 %; Gree 20,6 % y accionista de control) que compran a dos o tres proveedores y negocian precio cada año [B1]' },
      { fuerza: 'Poder de los proveedores', intensidad: 3, justificacion: 'Cobre y latón cotizados; el 75,6 % del coste es materia prima y se repercute con retraso [B1]' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Homologación larga con cada fabricante, escala y 5.076 patentes solicitadas por DunAn; en el coche eléctrico entran fabricantes de piezas de automoción [B2]' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 2, justificacion: 'La válvula de expansión electrónica sustituye a la térmica, pero ambas las fabrica DunAn; no hay sustituto del ciclo de compresión a la vista [B2]' },
    ],
    ciclo: { posicion: 'Contracción', comentario: 'El aire acondicionado doméstico chino viene de un récord en 2024 (200,9 M de aparatos vendidos, +17,8 %) y cae: −1,2 % en 2025 y −6,2 % en el 1S26, con el mercado interior −5,6 % y la exportación −6,8 % [B3, B1, B2]. El aire acondicionado central cae un 18 % en el 1S26 por la vivienda [B2]. Lo sabemos por los datos de Chanye Online y por las ventas de componentes de DunAn (−2,0 %) y de Sanhua (+3,9 % en total en el 1S26) [B2, B6]. En 2020 DunAn ya cayó por su propia crisis; en 2022 las ventas de componentes estuvieron planas (−0,5 %) [B1].' },
    regulacion: 'Las normas de «doble carbono» y de refrigerantes aceleran el paso a refrigerantes de bajo potencial de calentamiento y suben la exigencia de eficiencia, lo que eleva la barrera técnica de los componentes (la empresa lo cita como motor de sus válvulas de acero inoxidable y de expansión) [B2]. Las cuotas chinas de producción de HFC (Enmienda de Kigali) y el reglamento europeo de gases fluorados empujan en la misma dirección (contexto general, sin cifra propia de la empresa). En China, el programa de ayudas al recambio de electrodomésticos de 2024-2025 adelantó la demanda y su retirada la frena en 2026 [B2]. Los aranceles de EE. UU. afectan poco: las exportaciones son el 16,6 % de las ventas y no se desglosan por país [B1].',
    tendencias: 'Tres tendencias favorecen a DunAn: la electrónica sustituye a la válvula térmica (más contenido por aparato), la bomba de calor gana peso en Europa y el coche eléctrico multiplica válvulas por vehículo (DunAn vende ya 1.234 M en gestión térmica) [B1, B2]. La refrigeración de centros de datos de IA usa intercambiadores y válvulas de DunAn; es una fuente de crecimiento, pero pequeña frente a sus 13.000 M de ventas [B2]. En contra: Sanhua crece más rápido en coche eléctrico y en robótica, y los fabricantes de aire acondicionado integran más componentes [B5].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: null,
    posicion: 'Primera del mundo en válvulas de cierre y segunda en válvulas de cuatro vías y de expansión electrónica, detrás de Sanhua (datos de Chanye Online a 30-jun-2026) [B2]',
    competidores: [
      { nombre: 'Zhejiang Sanhua Intelligent Controls', pais: 'China', ticker: '002050.SZ', ingresos: 31012, cuota_pct: null, margen_ebit_pct: 16.1, comentario: 'Líder mundial en válvulas de cuatro vías y de expansión; crece más en coche eléctrico (Tesla, BYD) y robótica; beneficio de 4.063 M en 2025 (+31 %) [B5, B8]' },
      { nombre: 'Zhejiang Yinlun Machinery', pais: 'China', ticker: '002126.SZ', ingresos: 15678, cuota_pct: null, margen_ebit_pct: 8.6, comentario: 'Intercambiadores y gestión térmica de vehículo y de centros de datos [B8]' },
      { nombre: 'Nanjing Aotecar', pais: 'China', ticker: '002239.SZ', ingresos: 8198, cuota_pct: null, margen_ebit_pct: 3.0, comentario: 'Compresores y climatización de vehículo [B8]' },
      { nombre: 'Shanghai Songz Automobile Air Conditioning', pais: 'China', ticker: '002454.SZ', ingresos: 5628, cuota_pct: null, margen_ebit_pct: 5.8, comentario: 'Climatización de autobuses, ferrocarril y coche eléctrico [B8]' },
      { nombre: 'Shenzhen Envicool', pais: 'China', ticker: '002837.SZ', ingresos: 6068, cuota_pct: null, margen_ebit_pct: 10.3, comentario: 'Refrigeración de precisión y líquida para centros de datos y almacenamiento [B8]' },
      { nombre: 'Hanon Systems', pais: 'Corea', ticker: '018880.KS', ingresos: 54544, cuota_pct: null, margen_ebit_pct: 1.0, comentario: 'Segundo mundial en gestión térmica de automóvil; ahora de Hankook [B8]' },
      { nombre: 'Saginomiya / Fujikoki / Danfoss (válvulas)', pais: 'Japón / Dinamarca', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Fabricantes de válvulas de expansión con cuota en aparatos japoneses y comerciales; no publican cuentas del negocio [B1]' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'No aplican a un fabricante de componentes [B1]' },
        { fuente: 'Costes de cambio', puntuacion: 3, evidencia: 'Homologación de cada válvula en cada modelo de aparato o de coche; 120 nuevas adjudicaciones de válvulas de coche en el 1S26 [B2]' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 2, evidencia: '5.076 patentes solicitadas en China (1.488 de invención) y 538 PCT; participa en 105 normas [B2]' },
        { fuente: 'Ventaja en costes', puntuacion: 2, evidencia: 'Escala de segundo del mundo, pero margen EBIT del 8,9 % frente al 16,1 % de Sanhua: no tiene la ventaja de costes del líder [B1, B8]' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'Dos proveedores dominan el mundo en válvulas de cuatro vías y de expansión; poco espacio para un tercero rentable [B2]' },
      ],
    },
    amenazas: 'La más probable es la presión de precios de los fabricantes de aire acondicionado en un año de caída (probabilidad media-alta en 2026-2027), que ya se ve en el margen bruto de exportación (−4,9 puntos en el 1S26) [B2]. La segunda, que Sanhua use su mayor margen para ganar cuota en válvulas de expansión y en coche eléctrico (media). La tercera, la dependencia de Gree: si Gree reparte compras o integra válvulas propias, DunAn pierde parte de su 20,6 % de ventas (baja mientras Gree sea el accionista de control) [B1].',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [{ agencia: 'Wind ESG', calificacion: 'A', fecha: '2026-04' }],
    materialidad: 'Dos asuntos mueven las cifras. El primero, los refrigerantes: la transición a gases de bajo potencial de calentamiento (Kigali, reglamento europeo de 2024) obliga a rediseñar válvulas y es una oportunidad (válvulas de acero inoxidable, +100 % en algunos productos) [B2]. El segundo, la energía de una industria metalúrgica: emisiones de 16.165 t CO₂e de alcance 1 y 52.684 t de alcance 2 en 2025, pequeñas frente a 13.035 M de ventas [B9]. La seguridad laboral en estampación y soldadura es el riesgo social principal [B9].',
    controversias: 'Las controversias son de gobierno y heredadas: las garantías al antiguo accionista DunAn Holding, que costaron pérdidas en 2020-2023 y litigios del negocio de ahorro energético (Zhejiang DunAn Energy Saving) resueltos con provisiones [B1]. No hay sanciones ambientales ni del regulador bursátil en los tres últimos años en los informes anuales [B1].',
    confianza: 'Media',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'sector', campo: 'cr5_pct', tipo: 'Complemento', intentos: '1) Informes anuales de DunAn y Sanhua (solo dan posición, no cuota); 2) Chanye Online: datos de pago; 3) informes de mercado de válvulas (FMI, Lucintel): sin cuota de los cinco primeros en lo publicado', decision: 'Omitido' },
    { seccion: 'competencia', campo: 'cuota_pct', tipo: 'Complemento', intentos: '1) Informe semestral 2026 (solo «segunda mundial»); 2) informe de Sanhua (no da cuota de rivales); 3) FMI: no publica cuotas por empresa en el comunicado', decision: 'Omitido' },
  ],
};
guarda('B', B);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: '2025年年度报告 (informe anual 2025: consejo, directivos, remuneraciones, accionistas, operaciones vinculadas)', editor: 'Zhejiang DunAn Artificial Environment (CNINFO)', tipo: 'Primaria', fecha: '2026-04-29', url: `${CN}/2026-04-29/1225243151.PDF` },
  { id: 2, titulo: '2026年半年度报告 (accionistas a 30-jun-2026, depósitos en Gree Group Finance, ventas a Gree)', editor: 'Zhejiang DunAn Artificial Environment (CNINFO)', tipo: 'Primaria', fecha: '2026-08-27', url: `${CN}/2026-08-27/1225513924.PDF` },
  { id: 3, titulo: '2025年年度股东会决议公告 (resultado de la junta del 25-jun-2026, votos de los minoritarios)', editor: 'Zhejiang DunAn Artificial Environment (CNINFO)', tipo: 'Primaria', fecha: '2026-06-26', url: `${CN}/2026-06-26/1225388782.PDF` },
  { id: 4, titulo: '关于持股5%以上股东减持股份触及1%整数倍的公告 (Zijin Mining Investment vende 4,52 M de acciones, 15-sep a 8-dic-2025)', editor: 'Zhejiang DunAn Artificial Environment (CNINFO)', tipo: 'Primaria', fecha: '2025-12-09', url: `${CN}/2025-12-09/1224859663.PDF` },
  { id: 5, titulo: '关于股东减持计划实施期限届满暨实施结果的公告 (fin del plan de venta de Zijin, 12-dic-2025)', editor: 'Zhejiang DunAn Artificial Environment (CNINFO)', tipo: 'Primaria', fecha: '2025-12-13', url: `${CN}/2025-12-13/1224875480.PDF` },
  { id: 6, titulo: '关于非公开发行股票限售股份解除限售上市流通的提示性公告 (fin del bloqueo de las 139,4 M acciones de Gree, 9-ene-2026)', editor: 'Zhejiang DunAn Artificial Environment (CNINFO)', tipo: 'Primaria', fecha: '2026-01-08', url: `${CN}/2026-01-08/1224922840.PDF` },
  { id: 7, titulo: '关于向激励对象授予限制性股票与股票期权的公告 (plan de incentivos 2025 y sus objetivos)', editor: 'Zhejiang DunAn Artificial Environment (CNINFO)', tipo: 'Primaria', fecha: '2025-11-27', url: `${CN}/2025-11-27/1224828992.PDF` },
  { id: 8, titulo: '2022年年度报告 (cambio de accionista de control: Gree, 27-abr-2022)', editor: 'Zhejiang DunAn Artificial Environment (CNINFO)', tipo: 'Primaria', fecha: '2023-04-22', url: `${CN}/2023-04-22/1216526985.PDF` },
  { id: 9, titulo: '关于2026年度日常关联交易预计的公告 (operaciones vinculadas con Gree de hasta 3.300 M)', editor: 'Zhejiang DunAn Artificial Environment (CNINFO)', tipo: 'Primaria', fecha: '2026-04-29', url: `${CN}/2026-04-29/1225243164.PDF` },
  { id: 10, titulo: 'Operaciones de consejeros y directivos de 002011 (base de datos de Eastmoney sobre los registros de la Bolsa de Shenzhen): última compra o venta en el mercado, 25-nov-2021', editor: 'Eastmoney Data Center', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://data.eastmoney.com/executive/002011.html' },
];
const C = {
  _estado: 'completo',
  directivos: {
    equipo: [
      { nombre: 'Fang Xiangjian (方祥建)', cargo: 'Presidente del consejo (no ejecutivo en DunAn)', desde: '2024', participacion_pct: 0, trayectoria: 'Directivo de Gree desde 2001 (calidad, fábrica); vicepresidente ejecutivo de Gree desde enero de 2026. No cobra de DunAn [C1].' },
      { nombre: 'Li Jianjun (李建军)', cargo: 'Consejero y presidente ejecutivo (总裁)', desde: '2017', participacion_pct: 0.05, trayectoria: 'Ingeniero de la casa: dirigió el instituto de aire acondicionado central y DunAn Mechanical & Electrical. Con él la empresa pasó de pérdidas (2020) a 1.078 M de beneficio (2025). Cobró 2,86 M CNY en 2025 [C1].' },
      { nombre: 'Feng Zhongbo (冯忠波)', cargo: 'Consejero y vicepresidente', desde: '2018', participacion_pct: 0.04, trayectoria: 'Antiguo presidente de DunAn y de filiales químicas del grupo DunAn Holding [C1].' },
      { nombre: 'Xu Yangao (徐燕高)', cargo: 'Director financiero', desde: '2014', participacion_pct: 0.02, trayectoria: 'Doce años en el cargo, de la crisis al saneamiento; antes en el control financiero del grupo DunAn [C1].' },
      { nombre: 'Liu Che (刘掣)', cargo: 'Vicepresidente', desde: '2024', participacion_pct: 0.02, trayectoria: 'Nueve años en ventas de Sanhua y de la empresa conjunta Sanhua-Danfoss de microcanal; entró en 2024 [C1].' },
      { nombre: 'Lou Jiayang (楼家杨)', cargo: 'Vicepresidente y responsable de gestión térmica del vehículo', desde: '2025', participacion_pct: 0.03, trayectoria: 'En la casa desde 2005; dirige el negocio de coche eléctrico, que pasó de 51 M de ventas en 2021 a 1.234 M en 2025 [C1].' },
    ],
    historial_guidance: [
      { anio: '2024', guia: 'Objetivo del plan de incentivos 2023 para 2024 (beneficio recurrente)', real: 'Beneficio recurrente de 929 M (+13 %); objetivo cumplido y acciones liberadas en 2025', cumplida: 'Sí' },
      { anio: '2025', guia: 'Beneficio recurrente (sin coste de incentivos) ≥ 2024 × 1,141 = 1.060 M', real: '992 M + 13,5 M de coste de incentivos = 1.006 M (94,9 %); liberación parcial', cumplida: 'Parcial' },
      { anio: '2026', guia: 'Beneficio recurrente ≥ 2024 × 1,3402 = 1.245 M', real: '467 M en el 1S26 (−9,7 %): muy lejos', cumplida: 'No' },
    ],
    comentario: 'Equipo de la casa (presidente ejecutivo desde 2017, director financiero desde 2014) supervisado por Gree, que pone al presidente del consejo, dos consejeros y la secretaria del consejo [C1]. La credibilidad se mide con los objetivos de los planes de incentivos, que son la única guía pública: cumplió 2024, se quedó a un 95 % en 2025 y 2026 va muy por debajo (el 1S26 da un 37 % del objetivo anual) [C1, C7]. Hay pocos cambios en la cúpula: en 2025 entraron el vicepresidente de coche eléctrico y la secretaria del consejo por traslado [C1]. No hay plan de sucesión publicado; la sucesión real la decide Gree.',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Fang Xiangjian', cargo: 'Presidente', tipo: 'Dominical', desde: '2024', comisiones: 'Estrategia' },
      { nombre: 'Zhang Zhouhu', cargo: 'Consejero (secretario del consejo de Gree)', tipo: 'Dominical', desde: '2023', comisiones: 'Auditoría' },
      { nombre: 'Li Jianjun', cargo: 'Consejero y presidente ejecutivo', tipo: 'Ejecutivo', desde: '2017', comisiones: 'Estrategia' },
      { nombre: 'Feng Zhongbo', cargo: 'Consejero y vicepresidente', tipo: 'Ejecutivo', desde: '2025', comisiones: null },
      { nombre: 'Zhang Xiuping', cargo: 'Consejera (China National Machinery)', tipo: 'Otro externo', desde: '2025', comisiones: null },
      { nombre: 'Liu Jinping', cargo: 'Consejero independiente', tipo: 'Independiente', desde: '2022', comisiones: 'Nombramientos y retribuciones' },
      { nombre: 'Hu Jiewu', cargo: 'Consejero independiente (profesor de contabilidad)', tipo: 'Independiente', desde: '2025', comisiones: 'Auditoría (preside)' },
      { nombre: 'Yan Hong', cargo: 'Consejera independiente (abogada)', tipo: 'Independiente', desde: '2025', comisiones: 'Auditoría, retribuciones' },
      { nombre: 'Jin Guolin', cargo: 'Consejero representante de los trabajadores', tipo: 'Ejecutivo', desde: '2025', comisiones: null },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: true, variable_ligado_rentabilidad: false, auditoria_independiente: true, insiders_sin_operaciones: true, accionista_control: true, presidente_vinculado_control: true, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 99.73, voto_remuneracion_contra_pct: 0.24, voto_remuneracion_contra_libre_pct: 8.13, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 2.86, fijo: null, variable_corto: null, variable_largo: null, ratio_salario_medio: 20 },
    remuneracion: 'El presidente ejecutivo cobró 2,86 M CNY en 2025 y el conjunto del consejo y la alta dirección 16,8 M; el presidente del consejo no cobra (lo paga Gree) [C1]. El informe no separa fijo y variable. El variable a largo plazo son acciones restringidas y opciones (plan de 2023 y plan de 2025: 10,1 M de acciones a 7,05 CNY y 4,77 M de opciones a 14,10 CNY) que se liberan si el beneficio recurrente crece un 14,1 %, 34,0 % y 51,8 % frente a 2024 en 2025, 2026 y 2027 [C7]. Premia crecimiento del beneficio, no rentabilidad sobre el capital ni caja. Ratio frente al coste medio por empleado: 2,86 M ÷ 0,143 M (1.802 M pagados a 12.631 empleados) ≈ 20 veces (estimación propia) [C1]. En la junta de 2026 el 8,1 % de los minoritarios votó contra la remuneración de los consejeros [C3].',
    accionistas: [
      { nombre: 'Gree Electric Appliances (珠海格力电器)', pct: 38.13, tipo: 'Accionista de control (industrial; cliente principal)', variacion: 'Sin cambios; sus 139,4 M de acciones de la ampliación quedaron libres el 9-ene-2026 y no ha vendido [C2, C6]' },
      { nombre: 'Zijin Mining Investment (Shanghai) (紫金矿业投资)', pct: 6.32, tipo: 'Financiero (entró en la reestructuración de DunAn Holding)', variacion: 'Vendió 4,52 M de acciones (0,42 %) entre sep y dic de 2025; del 7,37 % al 6,95 % y al 6,32 % a jun-26 [C4, C5, C2]' },
      { nombre: 'Fondos de Orient Securities Asset Management (东方红)', pct: 2.44, tipo: 'Fondos de inversión', variacion: 'Compraron 9,97 M de acciones en el 1S26 [C2]' },
      { nombre: 'Hong Kong Securities Clearing (Stock Connect)', pct: 0.72, tipo: 'Inversores extranjeros por Stock Connect', variacion: 'Vendió 4,11 M de acciones en el 1S26 [C2]' },
      { nombre: 'Consejeros y directivos', pct: 0.26, tipo: 'Acciones de los planes de incentivos', variacion: '2,79 M de acciones a fin de 2025 [C1]' },
    ],
    insiders: [],
    control_y_defensas: 'Gree controla la junta con el 38,13 % (en la junta de 2026 fue el 97 % del capital presente) y nombra al presidente, dos consejeros y la secretaria del consejo [C1, C3]. Gree no tiene a su vez accionista de control. Es a la vez el primer cliente (20,6 % de las ventas) y el banco: DunAn tiene 200 M depositados en Gree Group Finance y la junta aprobó para 2026 hasta 3.300 M de operaciones vinculadas [C2, C9]. El acuerdo de servicios financieros con Gree Finance salió con un 26,0 % de votos en contra de los minoritarios, la mayor oposición de la junta [C3]. No hay clases de acciones ni blindajes estatutarios. Desde 2025 no hay consejo de supervisión: lo sustituye la comisión de auditoría, presidida por un independiente [C1].',
    alertas: [
      'Operaciones vinculadas con el accionista de control: Gree es el 20,6 % de las ventas y gestiona parte de la tesorería (Gree Finance); el 26,0 % de los minoritarios votó contra el acuerdo financiero [C1, C3].',
      'Zijin Mining (6,32 %) vendió en 2025 y puede volver a vender: oferta latente de unos 68 M de acciones [C4, C2].',
      'Fondo de comercio de Shanghai Dachuang deteriorado dos años seguidos (56,1 M de 181,9 M) [C1].',
    ],
    confianza: 'Media',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'remuneracion_ceo (fijo y variable)', tipo: 'Complemento', intentos: '1) Informe anual 2025 (solo total por persona); 2) plan de remuneración 2026 de la junta (solo criterios); 3) informe ESG 2025: sin desglose', decision: 'Omitido' },
  ],
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de 002011.SZ, 510300.SS (CSI 300) y 159996.SZ (electrodomésticos): precio, rentabilidades, beta, volatilidad y cierres de ejercicio (herramientas/bolsa.mjs)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/002011.SZ/history' },
  { id: 2, titulo: 'Previsiones de beneficio de 002011 (盈利预测): media de seis meses y detalle por casa (CICC, Galaxy, Everbright, Changjiang, Zhongyuan, Southwest, Shenwan Hongyuan)', editor: 'Eastmoney (东方财富) F10', tipo: 'Analistas', fecha: '2026-10-19', url: 'https://emweb.securities.eastmoney.com/PC_HSF10/ProfitForecast/Index?code=SZ002011' },
  { id: 3, titulo: 'Informes de analistas sobre 002011 (Southwest, Kaiyuan, Huaan, Huaxin, 2024-2026) y objetivo de precio de 13,95-14,55 CNY', editor: 'Eastmoney (东方财富) Research', tipo: 'Analistas', fecha: '2026-10-19', url: 'https://data.eastmoney.com/report/stock.jshtml?code=002011' },
  { id: 4, titulo: 'Ficha de Yahoo Finance de los comparables (precio, capitalización, cuentas, estimaciones de BPA y ventas a 0 y +1 años; script del scratchpad sobre herramientas/yahoo.mjs)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/' },
  { id: 5, titulo: 'Curva de la deuda pública china (中债国债收益率曲线), 10 años a 19-oct-2026: 1,6497 %', editor: 'ChinaBond (中央国债登记结算)', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://yield.chinabond.com.cn/' },
  { id: 6, titulo: 'ERPbymonth.xlsx: prima implícita del S&P 500 de octubre de 2026 (4,20 %, con payout sostenible)', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 7, titulo: 'List of SZSE Securities / China Connect Securities (eligible for both buy and sell), actualizada el 16-oct-2026: 002011 «ZHEJIANG DUN\'AN ARTIFICIAL ENVIRONMENT», código CCASS 72011', editor: 'HKEX', tipo: 'Primaria', fecha: '2026-10-16', url: 'https://www.hkex.com.hk/-/media/HKEX-Market/Mutual-Market/Stock-Connect/Eligible-Stocks/View-All-Eligible-Securities_xls/SZSE_Securities.xls' },
  { id: 8, titulo: '定期报告预约披露 (calendario de resultados): informe del 3T26 de 002011 previsto para el 27-oct-2026 (primera fecha, 28-oct)', editor: 'CNINFO', tipo: 'Primaria', fecha: '2026-10-19', url: 'http://www.cninfo.com.cn/new/commonUrl?url=data/yypl' },
  { id: 9, titulo: '2026年半年度报告 (acciones a 30-jun-2026, balance para el puente)', editor: 'Zhejiang DunAn Artificial Environment (CNINFO)', tipo: 'Primaria', fecha: '2026-08-27', url: `${CN}/2026-08-27/1225513924.PDF` },
  { id: 10, titulo: '2025年年度权益分派实施公告 (1.074.477.339 acciones; dividendo de 107,4 M pagado en agosto de 2026)', editor: 'Zhejiang DunAn Artificial Environment (CNINFO)', tipo: 'Primaria', fecha: '2026-08-05', url: `${CN}/2026-08-05/1225458512.PDF` },
];
const bo = bolsa.bolsa;
const cierre = Object.fromEntries(bolsa.cierres_ejercicio.map((c) => [c.anio, c.precio_cierre]));
const sinc = (t) => comp.empresas.find((e) => e.ticker === t);
const fila = (t, extra = {}) => { const e = sinc(t); return { nombre: e.nombre, ticker: e.ticker, pais: e.pais, capitalizacion: e.capitalizacion, ev_ventas: e.ev_ventas, ev_ebitda_ltm: e.ev_ebitda_ltm, ev_ebitda_ntm: null, per_ntm: e.per_ntm, crecimiento_pct: e.crecimiento_pct, margen_ebitda_pct: e.margen_ebitda_pct, roic_pct: e.roic_pct, dn_ebitda: e.dn_ebitda, fcf_yield_pct: e.fcf_yield_pct, ...extra }; };
const D = {
  _estado: 'completo',
  identificacion: {
    nombre: 'Zhejiang DunAn Artificial Environment Co., Ltd. (浙江盾安人工环境股份有限公司)', nombre_corto: 'DunAn', ticker: '002011.SZ', isin: null,
    mercado: 'Bolsa de Shenzhen (consejo principal, acciones A en CNY); comprable desde fuera de China por Shenzhen-Hong Kong Stock Connect (hacia el norte, compra y venta)', indice_referencia: 'CSI 300 (ETF 510300.SS)',
    pais: 'China', pais_iso: 'CN', sector: 'Industria', industria: 'Componentes de construcción y climatización (válvulas y control de refrigerante)', sede: 'Zhuji (Zhejiang)', fundacion: null, empleados: 12631, web: 'https://www.dunan.net',
    precio: bolsa.identificacion.precio, fecha_precio: bolsa.identificacion.fecha_precio, acciones: 1074.48, capitalizacion_publicada: 11551, free_float_pct: 55.0,
    max_52s: bolsa.identificacion.max_52s, min_52s: bolsa.identificacion.min_52s, volumen_medio_diario: `≈ ${bolsa.volumen_3m.importe_dia_millones.toLocaleString('es-ES', { maximumFractionDigits: 0 })} M CNY/día (3 meses)`, proximos_resultados: '2026-10-27',
  },
  consenso: {
    guidance: 'DunAn no publica guía anual de ventas ni de beneficio [D9]. La única referencia son los objetivos de sus planes de incentivos: beneficio recurrente (sin coste de incentivos) de al menos 1.245 M en 2026 y 1.410 M en 2027 (+34,0 % y +51,8 % sobre 2024) [D9]. Con el 1S26 en 467 M, el objetivo de 2026 no se alcanzará; los analistas, que antes del 1S26 estaban en 1,09-1,13 CNY por acción, lo bajaron a 0,90-1,11 [D2].',
    estimaciones: [
      { periodo: '2026e', ingresos: 13995, ebitda: null, ebit: null, bpa: 1.01, dpa: null, fuente: 'Eastmoney, media de seis meses (7 casas) [D2]' },
      { periodo: '2027e', ingresos: 15066, ebitda: null, ebit: null, bpa: 1.15, dpa: null, fuente: 'Eastmoney [D2]' },
      { periodo: '2028e', ingresos: 16197, ebitda: null, ebit: null, bpa: 1.28, dpa: null, fuente: 'Eastmoney [D2]' },
    ],
    recomendaciones: { n_analistas: 10, comprar: 7, mantener: 3, vender: 0, po_medio: 14.25, po_min: 13.95, po_max: 14.55 },
    revisiones: 'Tras el 1S26 (26-ago) las cinco casas que publicaron rebajaron el BPA de 2026: Zhongyuan 0,90 (con «mantener»), Galaxy 0,95, Changjiang 0,97, Everbright 1,02 y CICC 1,11, frente a 1,09 (Southwest) y 1,13 (Shenwan Hongyuan) en mayo [D2]. Para 2027 el rango es 1,05-1,28. La media de seis meses (1,007 / 1,146 / 1,276) aún mezcla las de mayo: la de las casas de después del 1S26 es 0,99 para 2026 (estimación propia, media simple de cinco). Los «aumentar» de Eastmoney van como «mantener» en el recuento. Contraste: Yahoo da dos analistas con objetivo medio de 13,98 CNY [D4].',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    tipo_rentabilidad: bo.tipo_rentabilidad,
    rentabilidades: bo.rentabilidades,
    anual: bo.anual.filter((a) => +a.anio >= 2017),
    beta: bo.beta, volatilidad_pct: bo.volatilidad_pct, max_drawdown_pct: bo.max_drawdown_pct, posicion_corta_pct: null,
    comentario: 'La acción gana un 8,5 % anual en cinco años frente al −1,3 % del CSI 300, todo por 2021 (+247 %, cuando Gree negoció la compra del control) [D1]. Desde entonces va por detrás: −1,7 % anual en tres años frente al +8,1 % del índice, y −17,1 % en un año frente al −5,9 % [D1]. El beneficio subió de 738 M (2023) a 1.078 M (2025) y la acción no, porque el mercado no paga más de 10-11 veces por un proveedor de aire acondicionado en un ciclo que se enfría. En septiembre de 2026 subió un 51 % en un mes con la moda de la refrigeración líquida para centros de datos y lo devolvió en cuatro semanas [D1].',
    contexto: null,
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: [
      { anio: '2021', precio_cierre: cierre['2021'], ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2022', precio_cierre: cierre['2022'], ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2023', precio_cierre: cierre['2023'], ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2024', precio_cierre: cierre['2024'], ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2025', precio_cierre: cierre['2025'], ev_ebitda_ntm: null, per_ntm: null, excluir: false },
    ],
    comentario: null,
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Fabricantes cotizados de componentes y sistemas de gestión térmica, con Sanhua (el rival directo en válvulas) primero: Yinlun, Aotecar y Songz (climatización y térmica del vehículo), Envicool y Shenling (refrigeración de centros de datos, a los que el mercado asoció a DunAn en septiembre), Hanon Systems y Modine (térmica de vehículo e industrial fuera de China). No hay otro fabricante cotizado de válvulas de cuatro vías: Saginomiya, Fujikoki y Danfoss no cotizan o no publican el negocio. Se excluye la línea H de Sanhua (2050.HK) para no contar dos veces la misma empresa. El PER de Modine se pondera con su ejercicio a marzo (5/12 del FY27 y 7/12 del FY28) [D4].',
    empresas: [
      fila('002050.SZ', { nombre: 'Zhejiang Sanhua Intelligent Controls (A)' }),
      fila('002126.SZ'),
      fila('002239.SZ'),
      fila('002454.SZ'),
      fila('002837.SZ'),
      fila('301018.SZ'),
      fila('018880.KS'),
      fila('MOD', { per_ntm: 17.2 }),
    ],
    comentario: null,
    confianza: 'Media',
  },
  transacciones: null,
  fuentes: fD,
  huecos: [
    { seccion: 'transacciones', campo: 'operaciones', tipo: 'Complemento', intentos: '1) Informes anuales de DunAn y Sanhua: compras sin múltiplo publicado (Shanghai Dachuang, 244,6 M por el 65,95 %, sin EBITDA del objetivo); 2) compra del control de DunAn por Gree (2022) y de Hanon por Hankook (2024): precio por acción, sin EBITDA del perímetro en un documento primario abierto; 3) prensa sectorial de válvulas (Danfoss, Saginomiya): operaciones privadas sin múltiplo', decision: 'Omitido' },
    { seccion: 'bolsa', campo: 'posicion_corta_pct', tipo: 'Complemento', intentos: '1) Bolsa de Shenzhen: no publica posiciones cortas por valor; 2) saldo de préstamo de valores (融券) no publicado de forma abierta; 3) Yahoo y Stock Analysis: sin dato para acciones A', decision: 'Omitido' },
    { seccion: 'comparables', campo: 'ev_ebitda_ntm', tipo: 'Complemento', intentos: '1) Yahoo: sin EBITDA estimado; 2) Eastmoney: solo ventas, beneficio y BPA; 3) MarketScreener: página de DunAn no disponible sin suscripción', decision: 'Omitido' },
  ],
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Eastmoney Guba (股吧) de 002011: hilos de particulares, páginas 1-3 (15-19 de octubre de 2026)', editor: 'Eastmoney Guba', tipo: 'Foros y redes', fecha: '2026-10-19', url: 'https://guba.eastmoney.com/list,002011.html' },
  { id: 2, titulo: 'Eastmoney Guba de 002011: hilos de septiembre y octubre sobre la subida por la refrigeración líquida y su reversión', editor: 'Eastmoney Guba', tipo: 'Foros y redes', fecha: '2026-10-16', url: 'https://guba.eastmoney.com/list,002011_2.html' },
  { id: 3, titulo: 'Eastmoney: «液冷服务器板块涨势扩大» (DunAn sube al límite con el grupo de refrigeración líquida, 7-sep-2026)', editor: 'Primera Finanzas (第一财经) / Eastmoney', tipo: 'Prensa', fecha: '2026-09-07', url: 'https://finance.eastmoney.com/a/202609073866609064.html' },
];
const E = {
  _estado: 'completo',
  sentimiento: {
    tono: 'Negativo', tendencia: 'Empeora',
    revisadas: [
      { plataforma: 'Eastmoney Guba (hilos del 15-19 de octubre)', fecha: '2026-10', n_comentarios: 150, tono: 'Negativo', resumen: 'Frustración tras devolver toda la subida de septiembre: «la historia de la refrigeración líquida se acabó, volvemos al punto de partida», «el capital especulativo subió y repartió»; muchos esperan los resultados del 3T del lunes 26-27 de octubre para ver si se corta la caída del beneficio [E1].' },
      { plataforma: 'Eastmoney Guba (septiembre-octubre, subida y reversión)', fecha: '2026-09', n_comentarios: 80, tono: 'Dividido', resumen: 'En septiembre, entusiasmo por la refrigeración líquida, Tesla y la «vuelta del valor» («un DunAn de 20.000 M»); en octubre, quejas de que la acción «sube con la tecnología y no cae con ella» y temor a que Zijin vuelva a vender [E2].' },
    ],
    temas: [
      { tema: 'Refrigeración líquida y centros de datos', postura: 'Dividida', peso: 'Alto', contraste: 'Es real pero pequeño: «algunos componentes para centros de datos crecen más del 40 %» dentro de una línea de 5.306 M que cae un 2 % en el 1S26 [E3].' },
      { tema: 'Caída del beneficio en 2026', postura: 'Bajista', peso: 'Alto', contraste: 'El 1S26 cayó un 12,8 % y los analistas recortaron el BPA de 2026 a 0,90-1,11 [E1].' },
      { tema: 'Venta de Zijin Mining (6,3 %)', postura: 'Bajista', peso: 'Medio', contraste: 'Vendió un 0,42 % en el 4T25; no hay plan nuevo publicado a 19-oct-2026 [E2].' },
      { tema: 'Barata frente a Sanhua', postura: 'Alcista', peso: 'Bajo', contraste: 'Cotiza a ~10 veces beneficio frente a ~27 de Sanhua, con la mitad de margen y menos crecimiento [E1].' },
    ],
    lectura: null,
    confianza: 'Baja',
  },
  fuentes: fE,
  huecos: [
    { seccion: 'sentimiento', campo: 'revisadas (otras plataformas)', tipo: 'Complemento', intentos: '1) Xueqiu (雪球): exige JavaScript y no devuelve mensajes; 2) Stocktwits y Reddit: sin hilos sobre 002011 en tres meses; 3) Seeking Alpha: sin cobertura de la acción A', decision: 'Omitido' },
  ],
};
guarda('E', E);
console.log('Notas A-E escritas en', dir);
