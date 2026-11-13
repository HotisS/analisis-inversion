// Escribe las notas A-E de Shenzhen Transsion Holdings (línea H 2636.HK; línea A 688036.SS; corte 2026-11-13, precio del 13-nov)
// a partir de los documentos de notas/docs: folleto de la salida a bolsa en Hong Kong (7-oct-2026, Apéndice I con las cuentas NIIF
// 2023-2025 y 4M26, Apéndice IA con el 1S26 NIIF), informes CAS de CNINFO (anual 2022 para 2021-2022, anual 2025, resumen 2024,
// semestrales y trimestrales), anuncio de asignación de HKEX, Yahoo Finance (bolsa y comparables), MarketScreener (consenso),
// Omdia y Canalys (cuotas en África) y el foro de Eastmoney (sentimiento).
// Cada nota cita solo con [n] de su propia lista. Ejecutar: node informes/transsion-2026-11-13/notas/construir-notas.mjs
// Ejercicio natural (cierre a 31-dic). Cifras en millones de CNY (RMB) salvo que se diga otra cosa.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const HK = 'https://www1.hkexnews.hk/listedco/listconews/sehk/2026';
const CN = 'http://static.cninfo.com.cn/finalpage';
const bolsaA = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa-a.json'), 'utf8'));
const comps = JSON.parse(fs.readFileSync(path.join(dir, 'comparables-yahoo.json'), 'utf8'));
import { PH, PA, TC, HA, PRECIO, ACC, FECHA } from './precio.mjs';

// ================================================================ A. Cuentas
const fA = [
  { id: 1, titulo: 'Global Offering (folleto de la salida a bolsa H): Apéndice I, informe de los contables con las cuentas NIIF de 2023, 2024, 2025 y 4M26 (cuenta, balance, flujos, notas 6-12 y 29); Apéndice IA, información intermedia NIIF del 1S26; resumen, información financiera y sector', editor: 'Shenzhen Transsion Holdings Co., Ltd. (HKEXnews)', tipo: 'Primaria', fecha: '2026-10-07', url: `${HK}/1007/2026100700007.pdf` },
  { id: 2, titulo: '2025年年度报告 (informe anual 2025, normas chinas): datos trimestrales de 2025, auditor y plantilla', editor: 'Shenzhen Transsion Holdings (CNINFO)', tipo: 'Primaria', fecha: '2026-03-28', url: `${CN}/2026-03-28/1225047544.PDF` },
  { id: 3, titulo: '2024年年度报告摘要 (resumen del informe anual 2024): datos trimestrales de 2024', editor: 'Shenzhen Transsion Holdings (CNINFO)', tipo: 'Primaria', fecha: '2025-04-24', url: `${CN}/2025-04-24/1223237084.PDF` },
  { id: 4, titulo: '2022年年度报告 (informe anual 2022, normas chinas): estados consolidados de 2022 y 2021, anexo de flujos (amortizaciones) y ventas por producto', editor: 'Shenzhen Transsion Holdings (CNINFO)', tipo: 'Primaria', fecha: '2023-04-26', url: `${CN}/2023-04-26/1216592777.PDF` },
  { id: 5, titulo: '2026年半年度报告 (informe semestral 2026, normas chinas): cuenta, balance y flujos del 1S26, dividendo a cuenta y explicación de márgenes', editor: 'Shenzhen Transsion Holdings (CNINFO)', tipo: 'Primaria', fecha: '2026-08-18', url: `${CN}/2026-08-18/1225476410.PDF` },
  { id: 6, titulo: '2025年半年度报告 (informe semestral 2025)', editor: 'Shenzhen Transsion Holdings (CNINFO)', tipo: 'Primaria', fecha: '2025-08-28', url: `${CN}/2025-08-28/1224593529.PDF` },
  { id: 7, titulo: '2026年第一季度报告 (1T26)', editor: 'Shenzhen Transsion Holdings (CNINFO)', tipo: 'Primaria', fecha: '2026-04-28', url: `${CN}/2026-04-28/1225199578.PDF` },
  { id: 8, titulo: '2025年第三季度报告 (3T25)', editor: 'Shenzhen Transsion Holdings (CNINFO)', tipo: 'Primaria', fecha: '2025-10-29', url: `${CN}/2025-10-29/1224750731.PDF` },
  { id: 9, titulo: '2024年第三季度报告 (3T24)', editor: 'Shenzhen Transsion Holdings (CNINFO)', tipo: 'Primaria', fecha: '2024-10-29', url: `${CN}/2024-10-29/1221538361.PDF` },
  { id: 10, titulo: '2025年第一季度报告 (1T25)', editor: 'Shenzhen Transsion Holdings (CNINFO)', tipo: 'Primaria', fecha: '2025-04-29', url: `${CN}/2025-04-29/1223357331.PDF` },
  { id: 11, titulo: 'Announcement of Final Offer Price and Allotment Results (precio de oferta, acciones emitidas, sobreasignación, ingresos netos)', editor: 'Shenzhen Transsion Holdings (HKEXnews)', tipo: 'Primaria', fecha: '2026-10-14', url: `${HK}/1014/2026101401159.pdf` },
  { id: 12, titulo: '2026年半年度业绩预增的自愿性披露公告 (avance de resultados del 1S26)', editor: 'Shenzhen Transsion Holdings (CNINFO)', tipo: 'Primaria', fecha: '2026-07-20', url: `${CN}/2026-07-20/1225431511.PDF` },
  { id: 13, titulo: '2026年第三季度报告 (informe del 3T26, normas chinas, sin auditar): cuenta, balance a 30-sep-2026 y flujos de nueve meses', editor: 'Shenzhen Transsion Holdings (CNINFO)', tipo: 'Primaria', fecha: '2026-10-30', url: `${CN}/2026-10-31/1225646762.PDF` },
  { id: 14, titulo: '关于部分行使超额配售权、稳定价格行动及稳定价格期结束的公告 (ejercicio parcial de la sobreasignación: 6.500.600 H nuevas; acciones totales 1.244.333.445)', editor: 'Shenzhen Transsion Holdings (CNINFO)', tipo: 'Primaria', fecha: '2026-11-12', url: `${CN}/2026-11-12/1225667718.PDF` },
  { id: 15, titulo: '投资者关系活动记录表 (acta de la conferencia con 114 instituciones del 30-oct-2026, publicada el 2-nov; texto reproducido en el foro de Eastmoney)', editor: 'Shenzhen Transsion Holdings (vía Eastmoney)', tipo: 'Primaria', fecha: '2026-11-02', url: 'https://guba.eastmoney.com/news,688036,1790794927.html' },
];

// EBIT «limpio»: resultado operativo publicado menos las ganancias de instrumentos financieros (productos de gestión de
// tesorería: ganancias netas, cambios de valor razonable y ventas de activos financieros) y, en 2024, la plusvalía por venta de
// filiales; las diferencias de cambio se quedan en el EBIT (son un coste del negocio en monedas de mercados emergentes).
// resultado_financiero = intereses netos + ganancias de instrumentos financieros + participadas por puesta en equivalencia.
// 2021-2022 en normas chinas (CAS): EBIT = beneficio de explotación − cambios de valor razonable − resultado de inversiones sin
// participadas − intereses cobrados + intereses pagados + resultado extraordinario (营业外). BPA y DPA ajustados por la
// ampliación liberada de 4 × 10 de 2024 (÷ 1,4).
const cuenta = [
  { periodo: '2021', ingresos: 49411.9, coste_ventas: 38888.5, gastos_generales: 4539.7, ebitda: 4455.3, amortizaciones: 226.9, ebit: 4228.4, resultado_financiero: 549.4, bai: 4777.8, impuestos: 866.3, minoritarios: 2.3, beneficio_neto: 3909.2, gastos_financieros: 36.9, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 3.47, dpa: 1.071, dpa_extraordinario: 0, acciones_diluidas: 1126.2 },
  { periodo: '2022', ingresos: 46595.9, coste_ventas: 36659.4, gastos_generales: 4890.6, ebitda: 3324.1, amortizaciones: 266.6, ebit: 3057.5, resultado_financiero: -64.0, bai: 2993.5, impuestos: 526.7, minoritarios: -17.0, beneficio_neto: 2483.8, gastos_financieros: 66.9, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 2.2, dpa: 1.286, dpa_extraordinario: 0, acciones_diluidas: 1129.0 },
  { periodo: '2023', ingresos: 62294.9, coste_ventas: 47855.0, gastos_generales: 6136.8, ebitda: 6679.4, amortizaciones: 314.7, ebit: 6364.7, resultado_financiero: 349.7, bai: 6714.4, impuestos: 1127.3, minoritarios: 50.0, beneficio_neto: 5537.0, gastos_financieros: 79.7, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 4.87, dpa: 4.286, dpa_extraordinario: 0, acciones_diluidas: 1137.0 },
  { periodo: '2024', ingresos: 68715.3, coste_ventas: 54374.4, gastos_generales: 6831.3, ebitda: 6223.0, amortizaciones: 420.2, ebit: 5802.8, resultado_financiero: 874.8, bai: 6677.6, impuestos: 1080.3, minoritarios: 48.4, beneficio_neto: 5549.0, gastos_financieros: 82.0, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 4.85, dpa: 3.0, dpa_extraordinario: 0, acciones_diluidas: 1144.1 },
  { periodo: '2025', ingresos: 65591.2, coste_ventas: 53313.0, gastos_generales: 7126.2, ebitda: 2807.2, amortizaciones: 475.8, ebit: 2331.4, resultado_financiero: 851.4, bai: 3182.8, impuestos: 577.6, minoritarios: 24.6, beneficio_neto: 2580.6, gastos_financieros: 68.4, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 2.25, dpa: 1.7, dpa_extraordinario: 0, acciones_diluidas: 1146.9 },
];
const balanceHist = [
  { periodo: '2021', activo_total: 31459.3, activo_corriente: 26838.4, pasivo_corriente: 14307.5, pasivo_total: 17398.6, fondo_comercio: 0, intangibles: 474.4, inmovilizado_material: 1825.5, existencias: 7578.8, clientes: 1230.3, proveedores: 11288.0, activos_contrato: null, pasivos_contrato: null, caja: 9855.3, deuda_financiera: 1016.4, arrendamientos: 194.4, patrimonio_neto: 14022.6, minoritarios: 38.0, reservas: 7174.0 },
  { periodo: '2022', activo_total: 30846.5, activo_corriente: 25409.5, pasivo_corriente: 11386.1, pasivo_total: 14981.8, fondo_comercio: 0, intangibles: 470.5, inmovilizado_material: 2407.8, existencias: 6083.9, clientes: 1287.4, proveedores: 8058.2, activos_contrato: null, pasivos_contrato: null, caja: 9214.9, deuda_financiera: 1484.9, arrendamientos: 219.7, patrimonio_neto: 15818.6, minoritarios: 46.1, reservas: 8455.3 },
  { periodo: '2023', activo_total: 46121.0, activo_corriente: 40131.9, pasivo_corriente: 27055.7, pasivo_total: 27944.1, fondo_comercio: 0, intangibles: 89.5, inmovilizado_material: 3121.5, existencias: 10443.4, clientes: 1965.1, proveedores: 19141.7, activos_contrato: null, pasivos_contrato: null, caja: 11029.1, deuda_financiera: 2010.8, arrendamientos: 243.1, patrimonio_neto: 18055.2, minoritarios: 121.7, reservas: 10125.9 },
  { periodo: '2024', activo_total: 45062.4, activo_corriente: 38809.1, pasivo_corriente: 23985.4, pasivo_total: 24716.9, fondo_comercio: 0, intangibles: 72.6, inmovilizado_material: 3205.3, existencias: 8663.4, clientes: 3376.5, proveedores: 17212.9, activos_contrato: null, pasivos_contrato: null, caja: 11310.1, deuda_financiera: 2690.5, arrendamientos: 163.6, patrimonio_neto: 20230.4, minoritarios: 115.2, reservas: 11419.3 },
  { periodo: '2025', activo_total: 44382.3, activo_corriente: 37739.4, pasivo_corriente: 23060.7, pasivo_total: 23733.6, fondo_comercio: 0, intangibles: 55.2, inmovilizado_material: 3201.6, existencias: 8902.9, clientes: 3726.3, proveedores: 16793.4, activos_contrato: null, pasivos_contrato: null, caja: 11122.6, deuda_financiera: 2154.9, arrendamientos: 124.0, patrimonio_neto: 20524.9, minoritarios: 123.8, reservas: 11371.7 },
];
const flujosHist = [
  { periodo: '2021', flujo_operativo: 4038.6, capex: 740.2, pagos_arrendamientos: 88.0, adquisiciones: 0, desinversiones: 0, dividendos: 870.0, recompras: 0, emision_acciones: 174.7, intereses_en_financiacion: 17.4 },
  { periodo: '2022', flujo_operativo: 1979.4, capex: 840.1, pagos_arrendamientos: 103.4, adquisiciones: 0, desinversiones: 0, dividendos: 1210.1, recompras: 0, emision_acciones: 69.1, intereses_en_financiacion: 25.1 },
  { periodo: '2023', flujo_operativo: 11848.7, capex: 822.6, pagos_arrendamientos: 74.2, adquisiciones: 34.6, desinversiones: 0, dividendos: 3879.8, recompras: 0, emision_acciones: 109.6, intereses_en_financiacion: 69.6 },
  { periodo: '2024', flujo_operativo: 2795.0, capex: 640.2, pagos_arrendamientos: 85.3, adquisiciones: 0, desinversiones: 255.7, dividendos: 4163.3, recompras: 0, emision_acciones: 351.5, intereses_en_financiacion: 77.7 },
  { periodo: '2025', flujo_operativo: 1350.0, capex: 983.1, pagos_arrendamientos: 82.7, adquisiciones: 41.8, desinversiones: 0, dividendos: 2653.5, recompras: 0, emision_acciones: 313.3, intereses_en_financiacion: 63.2 },
];

const A = {
  _estado: 'completa',
  financieros: {
    cuenta,
    // LTM jun-26 = 2025 − 1S25 + 1S26 (NIIF del Apéndice IA del folleto). EBIT limpio 1S26 1.801,1 (2.116,9 − 315,8 de instrumentos
    // financieros) y 1S25 952,0 (1.294,5 − 342,5); amortizaciones 224,9 y 228,1. FCF: flujo operativo −5.871 (1S26) y 1.350 − ≈10 (resto),
    // capex ≈ 882 y arrendamientos ≈ 80: estimación propia.
    // LTM sep-26 = 2025 (NIIF) − 9M25 + 9M26 (CAS, 3T26 [13]). EBIT limpio de 9 meses en CAS = resultado de explotación − cambios de valor
    // razonable − resultado de inversiones (incluidas participadas) − intereses cobrados + intereses pagados + resultado extraordinario:
    // 9M26 3.308,2 − 583,9 − 234,3 − 132,7 + 73,2 − 19,3 = 2.411,2; 9M25 2.697,3 + 40,4 − 612,4 − 86,8 + 16,7 + 0,5 = 2.055,7.
    // LTM EBIT = 2.331,4 − 2.055,7 + 2.411,2 = 2.686,9; amortización de 12 meses ≈ la de 2025 (475,8; el trimestral no la da): EBITDA ≈ 3.162,7 (estimación).
    // FCF: flujo operativo 1.350,0 − 3.284,9 − 9.873,2 = −11.808,1; capex 983,1 − 696,7 + 641,5 = 927,9; arrendamientos ≈ 83 → ≈ −12.819.
    ltm: { periodo: 'LTM sep-26', fecha_fin: '2026-09-30', ingresos: 66328.2, ebitda: 3162.7, ebit: 2686.9, beneficio_neto: 3062.6, bpa: 2.66, dpa: 1.7, dpa_extraordinario: 0, fcf: -12819, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [],
    comentario: 'Las ventas pasaron de 49.412 M CNY en 2021 a 68.715 M en 2024 y bajaron a 65.591 M en 2025 (−4,5 %), todo orgánico [4, 1]. La caída de 2025 tiene dos causas que la empresa separa: menos volumen (smartphones −9,1 %, de 106,5 a 96,8 millones; móviles básicos −23,9 %) porque frenó los envíos mientras subía la memoria sin poder repercutirla, y la pérdida de Europa central y oriental (−36,1 %) y Latinoamérica (−23,7 %) ante competidores internacionales [1]. El margen bruto cayó del 23,2 % (2023) al 20,9 % (2024) y al 18,7 % (2025): la memoria pasó del 20,9 % al 28,0 % del coste de las existencias vendidas [1]. A la vez subieron los gastos comerciales (6,9 % → 7,9 % de las ventas) y de I+D (3,6 % → 4,5 %): el margen EBIT limpio bajó del 10,2 % al 3,6 % [1]. **2026 rompe la serie al alza**: ventas del 1S26 de 35.431 M (+21,9 %) y beneficio atribuido de 1.773 M (+46,2 %) con menos teléfonos vendidos, porque subió el precio medio (smartphone a 705,5 CNY en 4M26 frente a 538,8) y el coste llegó con retraso por el inventario comprado antes [5, 1, 12]. En 4M26 la memoria ya era el 48,4 % del coste de las existencias vendidas [1]. **El 3T26 cortó la racha**: ventas −27,4 % y beneficio recurrente −47,7 %, con el margen bruto todavía alto (22,7 %) pero los gastos comerciales, generales, de I+D y financieros en el 19,3 % de las ventas; los nueve meses quedan en +1,5 % de ventas y +22,4 % de beneficio atribuido, este último con 584 M de ganancias de valor razonable [13, 15].',
    ajustes: 'Cifras publicadas. 2023-2025 y 1S26 en NIIF (informe de los contables del folleto de Hong Kong; 2025 coincide con las CAS en ventas y beneficio antes de impuestos: 65.591 M y 3.183 M) y 2021-2022 en normas chinas [1, 2, 4]. El EBIT es «limpio»: se quitan del resultado operativo las ganancias de los productos de tesorería (221 M en 2023, 553 M en 2024, 485 M en 2025, 316 M en el 1S26) y la plusvalía de 26 M por venta de filiales de 2024; pasan al resultado financiero [1]. Las diferencias de cambio (−310 M en 2025, −390 M en el 1S26) se dejan en el EBIT porque son un coste recurrente de vender en monedas de mercados emergentes [1]. Las subvenciones públicas (396 M en 2025, 662 M en 2024) se repiten todos los años y no se ajustan [1]. Pagos en acciones: 324 M en 2023 y 382 M en 2024; sin planes vivos en 2026 [1].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '4T24', ingresos: 17463.5, crecimiento_pct: -9.4, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 1.44, vs_consenso: null },
      { periodo: '1T25', ingresos: 13003.8, crecimiento_pct: -25.5, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.43, vs_consenso: null },
      { periodo: '2T25', ingresos: 16073.6, crecimiento_pct: -6.1, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.63, vs_consenso: null },
      { periodo: '3T25', ingresos: 20465.7, crecimiento_pct: 22.6, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.82, vs_consenso: null },
      { periodo: '4T25', ingresos: 16048.1, crecimiento_pct: -8.1, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.38, vs_consenso: null },
      { periodo: '1T26', ingresos: 16200.1, crecimiento_pct: 24.6, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.61, vs_consenso: null },
      { periodo: '2T26', ingresos: 19231.3, crecimiento_pct: 19.6, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.93, vs_consenso: null },
      { periodo: '3T26', ingresos: 14848.7, crecimiento_pct: -27.4, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.74, vs_consenso: null },
    ],
    ultima_presentacion: 'Cifras trimestrales en normas chinas; el segundo y el cuarto trimestre salen por diferencia (semestre − primer trimestre; año − nueve meses) [2, 3, 5, 6, 7, 8, 10, 13]. **El 3T26 cambió la tendencia**: ventas de 14.849 M (−27,4 % interanual y −22,8 % sobre el 2T26) y beneficio atribuido de 857 M (−8,4 %), pero el recurrente (扣非) cayó un 47,7 %, a 436 M: casi la mitad del beneficio del trimestre fueron ganancias de activos financieros [13]. La empresa lo atribuye a «供应链成本上涨及市场容量下降» (coste de la cadena de suministro y menor tamaño del mercado) [13]. En la conferencia del 30-oct con 114 instituciones, la dirección (el consejero Zhang Qi y el subdirector general Wang Haibin) dio tres mensajes: el margen bruto se mantiene alto (22,7 % en el 3T26 frente al 18,6 % del 3T25) por subidas de precio, mejor mezcla y la memoria comprada antes; el flujo operativo de −9.873 M en nueve meses es esa compra de memoria; y las existencias ya bajan (17.319 M a 30-sep, 1.600 M menos que en junio) [15, 13]. En julio el discurso era de crecimiento con margen; en octubre, de «保持财务健康的毛利率水平» (un margen sano) sin hablar de volumen. Lo que no contestó: cuántos teléfonos vendió en el trimestre, cuánta memoria cara queda en las existencias y qué margen espera cuando se consuma. No da previsiones numéricas.',
    confianza: 'Media',
  },
  balance: {
    historico: balanceHist,
    vencimientos: [{ anio: '2026-2027 (corto plazo)', importe: 5171.6 }, { anio: '2028+', importe: 73.7 }],
    liquidez: 'A 30-sep-2026: efectivo 7.843 M (6.520 M disponibles; el resto restringido) + productos de tesorería a valor razonable 4.698 M + activos financieros a largo plazo 1.979 M, frente a una deuda bancaria de 5.245 M (4.571 M de préstamos a corto, 601 M de vencimientos a menos de un año y 74 M a largo) [13]. Después del balance entraron 2.968 M HKD netos de la salida a bolsa (15-oct) y 227 M HKD de la sobreasignación (11-nov), ≈ 2.715 M CNY en total [A11, 14].',
    rating: 'Sin rating (no tiene bonos)',
    coste_deuda_pct: 2.2,
    vida_media_anios: 0.8,
    otros_pasivos: 'Pasivos que no son deuda pero pesan: los «otros pasivos corrientes» (1.681 M en jun-26; 3.184 M en 2023) recogen provisiones de garantía y de protección de precios a distribuidores; el gasto de garantía fue de 640 M en 2025 [1]. Las demandas de patentes esenciales (InterDigital, LG e IP Bridge siguen en juicio; con Ericsson hubo acuerdo el 8-jul-2026) están provisionadas sin cifra publicada [1]. Los efectos y pagarés a proveedores (parte de los 19.700 M de proveedores de jun-26) se garantizan con la caja restringida [1]. Sin pensiones de prestación definida relevantes ni pagos aplazados de compras. Las deudas son préstamos bancarios a corto plazo para financiar existencias: 3.960 M en jun-26 frente a 1.878 M en dic-25 [1].',
    comentario: 'El negocio funcionaba con circulante negativo: los proveedores (16.793 M en 2025) financiaban existencias y clientes (12.629 M); en 2023 el circulante comercial llegó a −6.734 M [1]. En 2026 se dio la vuelta: existencias de 8.903 M (dic-25) a 18.935 M (jun-26) y 17.319 M (sep-26), mientras los proveedores y efectos a pagar bajaban de 16.799 M a 13.626 M y los anticipos a proveedores subían de 697 M a 1.967 M [1, 13]. Estimación propia: circulante comercial (existencias + clientes − proveedores y efectos) de +8.183 M a 30-sep, el 12 % de las ventas de 12 meses. Lo pagó con su tesorería (efectivo y productos de tesorería de 22.476 M a 12.541 M en nueve meses) y con 2.700 M más de préstamos a corto [13]. La caja neta de deuda bajó a ≈ 7.250 M a 30-sep (≈ 10.000 M con la salida a bolsa). El balance aguanta, pero ya no sobra: si la memoria baja de precio con 17.000 M de existencias, el deterioro será el problema de 2027.',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujosHist,
    comentario: 'La caja sigue al circulante más que al beneficio: 2023 dio 11.849 M de flujo operativo con 5.537 M de beneficio porque los proveedores crecieron 11.899 M; 2024 y 2025 devolvieron parte (2.795 M y 1.350 M) [1]. Los nueve meses de 2026 consumieron 9.873 M (+3.285 M un año antes): los pagos a proveedores subieron 14.319 M y los cobros solo 3.030 M [13]. Acumulado 2021-2025, el flujo operativo (22.012 M) cubría de sobra el capex (4.026 M) y los dividendos (12.777 M) [1, 4]; en 2026 los dividendos (≈ 2.000 M pagados en nueve meses) se pagan con tesorería y deuda [13]. El capex es bajo (1,0-1,8 % de las ventas; 641 M en nueve meses): seis fábricas de montaje con un uso del 82 % [1, 13]. La inversión de crecimiento va por la cuenta (I+D de 2.480 M en nueve meses, +15,9 %) [13].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'Pan-China CPA (天健会计师事务所) para las cuentas CAS; Confucius International CPA para el informe de los contables del folleto de Hong Kong',
    anios_auditor: 10,
    opinion: 'Favorable',
    comentario: 'Tres cosas a vigilar. Primera, el EBIT publicado mezcla negocio y tesorería: «other gains» incluye 425 M de ventas de activos financieros en 2025; aquí se pasan al resultado financiero [1]. Segunda, el inventario: 18.935 M en jun-26 con deterioros de existencias de 374 M en el 1S26 (309 M en el 1S25) [1, 5]; si la memoria baja, habrá más. Tercera, los pagos de terceros por cuenta de clientes («Third-Party Payment Arrangements»), habituales en África por el control de divisas: la empresa los declara como riesgo y ha puesto controles [1]. A favor: el beneficio de 2025 en NIIF y en CAS es el mismo (2.581 M), la conversión en caja de cinco años es alta y no hay fondo de comercio ni capitalización de I+D relevante (intangibles de 55 M) [1, 2]. Los indicadores del motor (Altman, Piotroski y Beneish) se leen con 2021-2022 en CAS y 2023-2025 en NIIF: los cambios de partidas entre normas (inmovilizado en curso, derechos de uso de terrenos) mueven las rotaciones de activo.',
    senales: [
      { senal: 'Existencias de 17.319 M a 30-sep (8.903 M en dic-25), el 37 % del activo', nivel: 'Alta', comentario: 'Compra anticipada de memoria declarada; bajan 1.600 M desde junio; deterioros de activos de 329 M en nueve meses [13, 15].' },
      { senal: 'Flujo operativo de nueve meses de −9.873 M', nivel: 'Alta', comentario: 'Explicado por el inventario; se revierte solo si las existencias vuelven a su nivel [13].' },
      { senal: 'Beneficio del 3T26 con un 49 % de ganancias financieras', nivel: 'Media', comentario: 'Recurrente de 436 M frente a 857 M publicados; cambios de valor razonable de +584 M en nueve meses [13]. El BPA propio usa un resultado financiero recurrente.' },
      { senal: 'Pagos de terceros por cuenta de clientes', nivel: 'Media', comentario: 'Práctica de mercados con control de divisas; declarada como riesgo en el folleto [1].' },
      { senal: 'Litigios de patentes esenciales abiertos (InterDigital, LG, IP Bridge)', nivel: 'Media', comentario: 'Provisionados sin cifra; Ericsson resuelto en julio de 2026 [1].' },
    ],
    confianza: 'Media',
  },
  capital: {
    politica: 'Reparte en efectivo casi todo lo que gana: dividendos pagados de 3.867 M (2023), 4.130 M (2024) y 2.623 M (2025), por encima del 100 % del beneficio en 2025 [1]. En 2026, dividendo final de 2025 de 1.036 M (0,90 CNY por acción) y a cuenta del 1S26 de 921 M (0,80 CNY, el 51,9 % del beneficio del semestre); este último no lo cobran las acciones H nuevas [1, 5]. No hay recompras en 2023-2026. La salida a bolsa de Hong Kong aportó 2.968 M HKD netos y la sobreasignación parcial del 11-nov otros 227 M HKD (6,5 millones de H más), para I+D de IA (40 %), marca (30 %), internet móvil e IoT (20 %) y circulante (10 %) [1, 11, 14].',
    adquisiciones: [],
    comentario: 'No hace adquisiciones relevantes: las inversiones en participadas son pequeñas (938 M a valor contable en sep-26) [13]. El capital se asigna en dividendos y en la cuenta (I+D, marketing). La salida a bolsa de Hong Kong diluyó un 8,1 % en total (93,1 millones de acciones nuevas a 35,30 HKD, por debajo de la A) para obtener ≈ 2.715 M CNY: es una ampliación cara para el accionista de la A, hecha con un descuento del 38-44 %, aunque en 2026 ha servido para reponer la tesorería gastada en memoria [11, 14, 13].',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'Teléfonos móviles', descripcion: 'Smartphones (TECNO, Infinix, itel) y móviles básicos (itel)', tipo_resultado: null, historico: [
        { periodo: '2021', ingresos: 46195.6, resultado: null }, { periodo: '2022', ingresos: 42518.4, resultado: null }, { periodo: '2023', ingresos: 57348.1, resultado: null }, { periodo: '2024', ingresos: 63196.6, resultado: null }, { periodo: '2025', ingresos: 58447.5, resultado: null }] },
      { nombre: 'Internet móvil, IoT y otros', descripcion: 'Publicidad y distribución de aplicaciones en HiOS/XOS, accesorios (oraimo), electrodomésticos (Syinix), almacenamiento de energía y movilidad eléctrica', tipo_resultado: null, historico: [
        { periodo: '2021', ingresos: 3216.3, resultado: null }, { periodo: '2022', ingresos: 4077.5, resultado: null }, { periodo: '2023', ingresos: 4946.8, resultado: null }, { periodo: '2024', ingresos: 5518.7, resultado: null }, { periodo: '2025', ingresos: 7143.7, resultado: null }] },
    ],
    geografias: [
      { nombre: 'África', peso_pct: 37.7 }, { nombre: 'Asia-Pacífico emergente', peso_pct: 36.4 }, { nombre: 'Oriente Medio', peso_pct: 9.4 },
      { nombre: 'Latinoamérica', peso_pct: 8.0 }, { nombre: 'Europa central y oriental', peso_pct: 5.4 }, { nombre: 'Otros', peso_pct: 3.1 },
    ],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Teléfonos vendidos (millones)', valor_anterior: '201,4 (2024)', valor_actual: '169,0 (2025)', variacion: '−16,1 %', comentario: 'Smartphones 106,5 → 96,8; móviles básicos 95,0 → 72,2 [1].' },
      { kpi: 'Precio medio del smartphone (CNY)', valor_anterior: '538,8 (4M25)', valor_actual: '705,5 (4M26)', variacion: '+30,9 %', comentario: 'Subidas de precio por la memoria; 566,3 en todo 2025 [1].' },
      { kpi: 'Margen bruto', valor_anterior: '20,9 % (2024)', valor_actual: '18,7 % (2025); 21,6 % (1S26, NIIF); 22,6 % (9M26, normas chinas)', variacion: '−2,2 / +2,9 puntos', comentario: 'Memoria del 25,0 % al 28,0 % del coste en 2025; 2026 vende inventario comprado antes y sube precios; 22,7 % en el 3T26 [1, 13].' },
      { kpi: 'Peso de la memoria en el coste de las existencias vendidas', valor_anterior: '24,5 % (4M25)', valor_actual: '48,4 % (4M26)', variacion: '+23,9 puntos', comentario: 'El coste que decide el margen de 2026-2027 [1].' },
      { kpi: 'Distribuidores', valor_anterior: 'n.d.', valor_actual: '> 2.900 (abr-26)', variacion: 'n.d.', comentario: 'Más del 99 % de las ventas va a distribuidores; el primero pesa el 3,1 % (2025) [1].' },
      { kpi: 'Ventas del trimestre (M CNY)', valor_anterior: '20.466 (3T25)', valor_actual: '14.849 (3T26)', variacion: '−27,4 %', comentario: 'Primera caída desde el 2T25; el mercado mundial de smartphones cayó un 20-22 % en el 3T26 [13].' },
      { kpi: 'Uso de la capacidad de las fábricas de móviles', valor_anterior: '80,8 % (2024)', valor_actual: '82,3 % (2025)', variacion: '+1,5 puntos', comentario: '90,7 % en 2023 [1].' },
    ],
  },
  fuentes: fA,
  huecos: [
    { seccion: 'trimestres', campo: 'EBITDA trimestral y comparación con el consenso previo', tipo: 'Complemento', intentos: '1) Informes trimestrales CAS (no publican amortizaciones trimestrales); 2) folleto de Hong Kong (solo 4M y 1S); 3) consenso trimestral previo en MarketScreener (sin datos gratuitos)', decision: 'Omitido' },
  ],
};

// ================================================================ B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Global Offering: Industry Overview (Frost & Sullivan), Business, Risk Factors e History', editor: 'Shenzhen Transsion Holdings (HKEXnews)', tipo: 'Primaria', fecha: '2026-10-07', url: `${HK}/1007/2026100700007.pdf` },
  { id: 2, titulo: 'Africa smartphone market expected to decline 26 % in 2026 following first contraction in three years (2Q26)', editor: 'Omdia', tipo: 'Sectorial', fecha: '2026-08-20', url: 'https://omdia.tech.informa.com/pr/2026/aug/africa-smartphone-market-expected-to-decline-26percent-in-2026-following-first-contraction-in-three-years' },
  { id: 3, titulo: 'Transsion still dominates Africa’s smartphone market, but Honor can’t be ignored (datos de Omdia del 1T26)', editor: 'Techish', tipo: 'Prensa', fecha: '2026-05-28', url: 'https://tech-ish.com/2026/05/28/transsion-still-dominates-africas-smartphone-market-but-honor-cant-be-ignored/' },
  { id: 4, titulo: 'Smartphone shipments in Africa rise in Q2 (datos de Canalys del 2T25)', editor: 'Developing Telecoms', tipo: 'Prensa', fecha: '2025-08-26', url: 'https://www.developingtelecoms.com/telecom-technology/telecom-devices-platforms/18968-smartphone-shipments-in-africa-rise-in-q2.html' },
  { id: 5, titulo: 'Cuentas anuales de Xiaomi, Apple, Samsung, Lenovo, Huaqin, Longcheer y TCL Electronics (series de Yahoo Finance)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-18', url: 'https://finance.yahoo.com' },
  { id: 6, titulo: '2026年半年度报告 (semestral 2026): cuota de IDC, estrategia y marcas', editor: 'Shenzhen Transsion Holdings (CNINFO)', tipo: 'Primaria', fecha: '2026-08-18', url: `${CN}/2026-08-18/1225476410.PDF` },
  { id: 7, titulo: 'Global smartphone shipments drop 22 % in Q3 2026 amid memory crisis: IDC (255,3 millones de unidades)', editor: 'FoneArena (datos de IDC)', tipo: 'Prensa', fecha: '2026-10', url: 'https://www.fonearena.com/blog/495163/global-smartphone-shipments-q3-2026-idc.html/amp' },
  { id: 8, titulo: 'Tecno and Infinix parent Transsion saw third-quarter revenue fall 27 % as memory costs rose (con datos de Omdia del 3T26: mundo −20 %, África −39 %)', editor: 'Techish', tipo: 'Prensa', fecha: '2026-11-02', url: 'https://tech-ish.com/2026/11/02/tecno-and-infinixs-parent-transsion-saw-third-quarter-revenue-fall-27-as-memory-costs-rose/' },
  { id: 9, titulo: '“存储通胀”中的传音控股：囤芯失血、H股遇冷与AI求生 (precios de la memoria, peso en el coste, H)', editor: 'Sina Finanzas (TMTPost / 资本剖面)', tipo: 'Prensa', fecha: '2026-11-05', url: 'https://cj.sina.com.cn/articles/view/2853016445/aa0d937d0270198yo' },
];
const B = {
  _estado: 'completa',
  historia: {
    resumen: 'Zhu Zhaojiang, que venía del fabricante chino Bird, fundó el negocio en Shenzhen en 2006 y se fue a vender a África cuando los grandes no la miraban: teléfonos baratos con doble y cuádruple SIM, baterías largas y cámaras calibradas para pieles oscuras [1]. La sociedad actual nace en 2013, en 2015 ya era la primera de África en unidades y en 2016 entró en India y el resto de Asia emergente [1]. Salió a bolsa en la STAR Market de Shanghái en septiembre de 2019; en 2024 repartió 4 acciones gratis por cada 10 [1]. 2025 fue su peor año desde la salida a bolsa (beneficio −53,5 %) por la memoria y la competencia, y en octubre de 2026 completó la doble cotización en Hong Kong con un descuento del 38-44 % frente a la A [1].',
    hitos: [
      { anio: '2006', hito: 'Zhu Zhaojiang empieza el negocio de teléfonos para mercados emergentes en Shenzhen [1].' },
      { anio: '2013', hito: 'Se constituye Transsion Limited, la sociedad actual; Infinix se suma a TECNO e itel [1].' },
      { anio: '2015', hito: 'Primera de África en teléfonos vendidos [1].' },
      { anio: '2016', hito: 'Entrada en India y el resto de Asia-Pacífico emergente [1].' },
      { anio: '2019', hito: 'Salida a bolsa en la STAR Market de Shanghái (688036) [1].' },
      { anio: '2022', hito: 'Primer teléfono 5G (Infinix ZERO 5G); ventas −5,7 % por la debilidad del consumo [1].' },
      { anio: '2024', hito: 'Máximo de ventas (68.715 M) y demanda de Qualcomm por patentes en China, India y Europa [1].' },
      { anio: '2025', hito: 'Beneficio −53,5 % por la memoria y la competencia en Europa del Este y Latinoamérica [1].' },
      { anio: '2026', hito: 'Acuerdo con Ericsson (julio), renovación de licencias con Qualcomm, doble cotización en Hong Kong (15-oct) y caída de ventas del 27 % en el 3T por la crisis de la memoria [1, 8].' },
    ],
    confianza: 'Alta',
  },
  negocio: {
    descripcion: 'Transsion diseña, fabrica y vende teléfonos para mercados emergentes con tres marcas: TECNO (gama media), Infinix (jóvenes, rendimiento) e itel (entrada y móviles básicos) [1]. En 2025 vendió 169 millones de teléfonos, el 11,8 % del mundo y el tercero en unidades, pero el octavo en ingresos (1,7 % del valor) porque vende barato: 566 CNY de precio medio por smartphone [1]. El 89 % de las ventas son teléfonos y el resto, internet móvil (publicidad y aplicaciones en su sistema HiOS/XOS, 942 M con margen bruto del 80 %), accesorios oraimo, electrodomésticos Syinix y energía [1]. Fabrica en seis plantas (cuatro en China, Bangladesh y Etiopía) y vende a más de 2.900 distribuidores en más de 100 países [1].',
    como_gana_dinero: 'Margen de fabricante de volumen: compra componentes (memoria, procesador, pantalla y cámara son el 68 % del coste en 2025), monta y vende con un margen bruto del 18-23 % y un EBIT del 4-10 % [1]. El margen depende sobre todo del coste de la memoria, que no controla y que repercute con retraso: en 2025 la memoria subió del 25 % al 28 % del coste y el margen bruto cayó 2,2 puntos; en 2026 subió precios y vendió inventario barato, y el margen subió 2,9 puntos [1]. No hay ingresos recurrentes salvo el internet móvil (1,4 % de las ventas) [1]. El apalancamiento operativo es alto: los gastos comerciales, generales e I+D suman 15,3 % de las ventas en 2025, así que un punto de margen bruto mueve un 25-30 % el beneficio. Estacionalidad suave: el tercer trimestre suele ser el más fuerte.',
    clientes: 'Concentración baja: los cinco mayores distribuidores pesan el 13,4 % de las ventas de 2025 y el primero el 3,1 % [1]. Las ventas son a distribuidores nacionales con crédito corto y cobro en monedas locales o dólares; los clientes finales compran a menudo a plazos (la empresa lidera la financiación de dispositivos en África, según Omdia) [2]. El poder de precios se vio en 2026: el smartphone subió un 31 % de precio medio y las ventas crecieron un 22 % con menos unidades, porque toda la industria subió a la vez [1]. Pero no es poder propio: en 2025, cuando quiso proteger el margen sin que los demás subieran, perdió volumen (−9,1 % de smartphones) [1].',
  },
  sector: {
    definicion: 'Mercado relevante: teléfonos móviles en mercados emergentes (África, Asia-Pacífico emergente, Oriente Medio, Latinoamérica y Europa central y oriental), donde Transsion hace el 97 % de sus ventas [1]. Se usa el tamaño en ingresos de Frost & Sullivan del folleto (175.500 M USD en 2025) y se contrasta con los envíos de Omdia y Canalys para África, el mercado que más pesa en el beneficio [1, 2, 4]. El mercado mundial (≈ 482.000 M USD, con Apple y Samsung en el 65 % del valor) no es el relevante: Transsion apenas vende por encima de 300 USD [1].',
    tamano: '≈ 175.500 M USD en 2025 (teléfonos en mercados emergentes, Frost & Sullivan) [1]; África: 19,2 millones de smartphones en el 2T25 y 17,8 millones en el 2T26 (−7 %) [4, 2]',
    unidad_serie: 'miles de millones de USD (ingresos de teléfonos en mercados emergentes)',
    serie: [
      { anio: '2021', tamano: 142.9 }, { anio: '2022', tamano: 151.9 }, { anio: '2023', tamano: 161.2 }, { anio: '2024', tamano: 171.1 }, { anio: '2025', tamano: 175.5 },
      { anio: '2026e', tamano: 185.3 }, { anio: '2027e', tamano: 197.2 }, { anio: '2028e', tamano: 215.7 }, { anio: '2030e', tamano: 266.7 },
    ],
    tcac_historico_pct: 5.3,
    tcac_previsto_pct: 8.7,
    cr5_pct: 62.0,
    estructura: 'Moderadamente concentrada',
    drivers: [
      { driver: 'Paso del móvil básico al smartphone', efecto: '+', horizonte: 'Estructural', evidencia: 'Los móviles básicos caen un 12 % anual en valor en 2021-2025 en mercados emergentes; penetración de internet móvil del 48 % en 2025 al 54 % en 2030 [1].' },
      { driver: 'Precio de la memoria (DRAM y NAND)', efecto: '−', horizonte: 'Cíclico', evidencia: 'Índice medio de DRAM de 821 en 2025 a 3.639 en el 1S26 y de NAND de 899 a 2.831; Frost & Sullivan espera que siga al alza hasta 2030 por la IA [1].' },
      { driver: 'Entrada de competidores chinos en África y Latinoamérica', efecto: '−', horizonte: 'Estructural', evidencia: 'Honor +161 % en el 2T25 y +101 % en el 1T26 en África; Xiaomi +32 % en el 2T25; las cinco primeras de Latinoamérica pasan del 64 % al 60 % del mercado en 2025 [4, 3, 1].' },
      { driver: 'Renta y población de los mercados emergentes', efecto: '+', horizonte: 'Estructural', evidencia: 'PIB por habitante de 6.200 USD en 2025 con un crecimiento previsto del 8,6 % anual hasta 2030; población de 5.800 millones [1].' },
      { driver: 'Divisas y control de cambios (naira, libra egipcia, rupia pakistaní)', efecto: '−', horizonte: 'Cíclico', evidencia: 'Diferencias de cambio de −310 M en 2025 y −390 M en el 1S26 [1].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 4, justificacion: 'Samsung, Xiaomi, Honor y OPPO compiten por precio en la gama de entrada; las cinco primeras de Latinoamérica perdieron 4 puntos de cuota en 2025 [1, 2].' },
      { fuerza: 'Poder de los clientes', intensidad: 2, justificacion: 'Más de 2.900 distribuidores, el primero con el 3,1 % de las ventas [1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 5, justificacion: 'Tres fabricantes de memoria fijan el precio; en 4M26 los cinco primeros proveedores son el 50,2 % de las compras y la memoria el 48,4 % del coste [1].' },
      { fuerza: 'Amenaza de entrada', intensidad: 3, justificacion: 'La escala y la red local cuestan años, pero los chinos con escala global (Honor, Xiaomi) pueden entrar con financiación y operadores [1, 3].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 1, justificacion: 'El teléfono es la puerta de internet en mercados con poca banda ancha fija [1].' },
    ],
    ciclo: { posicion: 'Contracción', comentario: 'El 3T26 confirmó la contracción: los envíos mundiales de smartphones cayeron un 22 % según IDC (255,3 millones, la mayor caída registrada) y un 20 % según Omdia, con África −39 %, la peor región [7, 8]. La causa es de oferta: los fabricantes de memoria pasaron capacidad a HBM y servidores de IA y la memoria pasó del 10-15 % al 40-50 % del coste de un teléfono de gama baja (IDC), más del 64 % por debajo de 99 USD (Omdia) [9]. Omdia ya esperaba en agosto −26 % en África para 2026 [2]. En valor, Frost & Sullivan aún esperaba crecimiento porque sube el precio medio [1]. Precedente: en 2022 el sector cayó y Transsion bajó un 5,7 % en ventas y un 36 % en beneficio, para recuperarse en 2023 (+34 %) cuando la memoria tocó fondo [1]. La diferencia ahora es que la memoria no ha tocado fondo.' },
    regulacion: 'Riesgos regulatorios concretos: aranceles y normas de origen locales (Nigeria, Etiopía, Bangladesh, Pakistán exigen montaje local o gravan importaciones; por eso tiene fábricas allí), control de divisas que obliga a cobrar por terceros, y las normas de inversión de EE. UU. de octubre de 2024 sobre tecnología china; las ventas en EE. UU. son irrelevantes (7,3 M en 2025) [1]. Patentes esenciales 4G y 5G: licencia con Qualcomm renovada hasta 2031 y acuerdo con Ericsson; InterDigital, LG e IP Bridge siguen en juicio [1].',
    tendencias: 'Tres tendencias. La IA en el teléfono pide más memoria y encarece los equipos de entrada: es lo que más daña a quien vende barato [1, 2]. Los competidores chinos con escala (Honor, Xiaomi) usan financiación a plazos y operadores para subir de gama en Sudáfrica y Kenia, justo donde Transsion quiere ir con TECNO [3, 2]. Y la monetización del sistema operativo propio (HiOS/XOS, internet móvil con margen del 80 %) crece despacio: 942 M en 2025 [1]. Transsion gana con la primera solo si mantiene su escala de compra; pierde con la segunda.',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 4.7,
    posicion: '1.ª en teléfonos de mercados emergentes por unidades (20,0 %, 169 millones) y 5.ª por ingresos (4,7 %); 1.ª en África por unidades (53,1 % de los teléfonos en 2025; 47 % de los smartphones en el 1T26) [1, 3]',
    competidores: [
      { nombre: 'Samsung Electronics', pais: 'Corea del Sur', ticker: '005930.KS', ingresos: 1669480, cuota_pct: 19.2, margen_ebit_pct: 15.0, comentario: 'Segunda en África (4,0 millones en el 1T26) con la serie Galaxy A de 150-299 USD [3, 5]; cifras del grupo, con semiconductores.' },
      { nombre: 'Xiaomi', pais: 'China', ticker: '1810.HK', ingresos: 457287, cuota_pct: 12.4, margen_ebit_pct: 11.7, comentario: 'Creció un 32 % en África en el 2T25 con precios de entrada y cayó un 28-30 % en 2026 al recortar la gama baja por la memoria [4, 3, 2]; cifras del grupo, con coches eléctricos.' },
      { nombre: 'Apple', pais: 'EE. UU.', ticker: 'AAPL', ingresos: 2778624, cuota_pct: 19.5, margen_ebit_pct: 32.0, comentario: 'Primera por ingresos en mercados emergentes (19,5 %) con muy pocas unidades; no compite en precio [1, 5].' },
      { nombre: 'Honor', pais: 'China', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'No cotiza. +161 % en África en el 2T25 y +101 % en el 1T26 (7 % de cuota) con gama de más de 300 USD y financiación en Sudáfrica [4, 3, 2].' },
      { nombre: 'Lenovo (Motorola)', pais: 'China', ticker: '0992.HK', ingresos: 554672, cuota_pct: null, margen_ebit_pct: 4.0, comentario: 'Motorola gana cuota en Latinoamérica; margen de grupo (PC incluido) [1, 5].' },
      { nombre: 'TCL Electronics', pais: 'China', ticker: '1070.HK', ingresos: 97488, cuota_pct: null, margen_ebit_pct: 3.6, comentario: 'Electrónica de consumo china para mercados emergentes; referencia de margen de ensamblador de marca [5].' },
    ],
    foso: {
      veredicto: 'Estrecho',
      tendencia: 'Se estrecha',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'El sistema HiOS/XOS tiene usuarios activos pero ingresa solo 942 M; no ata al cliente al teléfono [1].' },
        { fuente: 'Costes de cambio', puntuacion: 1, evidencia: 'Cambiar de marca de teléfono barato no cuesta nada; Honor ganó 4-5 puntos de cuota en África en un año [3, 4].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'TECNO e itel son marcas líderes en África desde 2015; más de 3.000 patentes concedidas, pero paga licencias de patentes esenciales y litiga con tres titulares [1].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Escala de compra (169 millones de teléfonos) y fábricas locales en Etiopía y Bangladesh; margen EBIT del 8-10 % en 2023-2024 frente al 3-4 % de Lenovo y TCL [1, 5].' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'Red de distribución y posventa en más de 100 países y 2.900 distribuidores, difícil de replicar rápido [1].' },
      ],
    },
    amenazas: 'La amenaza principal es la combinación de memoria cara y competidores con más margen. Con la memoria en el 48 % del coste, el teléfono de menos de 100 USD deja de ser rentable y el cliente sube a 150-300 USD, donde Samsung (Galaxy A) y Honor son más fuertes [2, 3]. Probabilidad alta de que Transsion pierda 3-5 puntos más de cuota en África en 2026-2027 (Omdia mide el mercado africano −39 % en unidades en el 3T26; Transsion no publica sus unidades del trimestre) [8] (Omdia ya la mide en el 47 % de los smartphones frente al 51 % de 2025) [3, 4]. Segunda amenaza: que Xiaomi vuelva a la gama de entrada cuando la memoria baje, como hizo en 2024-2025. Tercera: demandas de patentes que bloqueen ventas en algún país.',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Lo material es social y de gobierno más que ambiental. Social: los teléfonos baratos son la puerta a internet de cientos de millones de personas en África y Asia del Sur, y la financiación a plazos de equipos (que la empresa lidera en África) traslada riesgo de impago a clientes vulnerables [1, 2]. Gobierno: pagos de terceros por cuenta de clientes en mercados con control de divisas, declarados como riesgo [1]. Ambiental: emisiones de montaje bajas; la exposición está en los residuos electrónicos y en la cadena de suministro de componentes [1].',
    controversias: 'Demandas de patentes esenciales: Qualcomm (2024, resuelta con licencia renovada hasta 2031), Ericsson (resuelta el 8-jul-2026), InterDigital, LG e IP Bridge (en curso) [1]. En 2020 hubo informes de prensa sobre aplicaciones con software malicioso preinstalado en equipos de gama baja en África; no se encontró sanción de un regulador. No se encontraron multas de reguladores en tres años.',
    confianza: 'Baja',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'esg', campo: 'Calificaciones ESG (MSCI, Sustainalytics)', tipo: 'Complemento', intentos: '1) Folleto de Hong Kong (no las cita); 2) informe ESG de la empresa (en chino, sin calificación externa); 3) páginas públicas de MSCI y Sustainalytics (sin ficha abierta para 688036)', decision: 'Omitido' },
  ],
};

// ================================================================ C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Global Offering: Directors and Senior Management, Substantial Shareholders, Relationship with our Controlling Shareholders, Cornerstone Investors, Share Capital y nota 9 del Apéndice I (remuneraciones)', editor: 'Shenzhen Transsion Holdings (HKEXnews)', tipo: 'Primaria', fecha: '2026-10-07', url: `${HK}/1007/2026100700007.pdf` },
  { id: 2, titulo: 'List of Directors and their Roles and Functions', editor: 'Shenzhen Transsion Holdings (HKEXnews)', tipo: 'Primaria', fecha: '2026-10-14', url: `${HK}/1014/2026101400031.pdf` },
  { id: 3, titulo: 'Announcement of Final Offer Price and Allotment Results', editor: 'Shenzhen Transsion Holdings (HKEXnews)', tipo: 'Primaria', fecha: '2026-10-14', url: `${HK}/1014/2026101401159.pdf` },
  { id: 4, titulo: '传音控股股东询价转让计划书 (plan de transmisión por consulta del accionista de control, anuncio 2025-022)', editor: 'Shanghai Securities News (cnstock)', tipo: 'Primaria', fecha: '2025-09-12', url: 'https://paper.cnstock.com/html/2025-09/12/content_2120285.htm' },
  { id: 5, titulo: '2025年年度报告 (informe anual 2025): auditor, plantilla', editor: 'Shenzhen Transsion Holdings (CNINFO)', tipo: 'Primaria', fecha: '2026-03-28', url: `${CN}/2026-03-28/1225047544.PDF` },
  { id: 6, titulo: 'Qualcomm announces long-term patent cross-license agreement with Transsion', editor: 'Qualcomm', tipo: 'Primaria', fecha: '2026-10', url: 'https://www.qualcomm.com/news/releases/2026/10/qualcomm-announces-long-term-patent-cross-license-agreement-with' },
  { id: 7, titulo: '关于董事会换届选举的公告 (renovación del consejo: candidatos al cuarto consejo)', editor: 'Shenzhen Transsion Holdings (CNINFO)', tipo: 'Primaria', fecha: '2026-11-05', url: `${CN}/2026-11-05/1225656775.PDF` },
  { id: 8, titulo: '关于召开2026年第一次临时股东会的通知 (junta extraordinaria del 24-nov-2026)', editor: 'Shenzhen Transsion Holdings (CNINFO)', tipo: 'Primaria', fecha: '2026-11-05', url: `${CN}/2026-11-05/1225656789.PDF` },
  { id: 9, titulo: '2026年第三季度报告: diez mayores accionistas a 30-sep-2026', editor: 'Shenzhen Transsion Holdings (CNINFO)', tipo: 'Primaria', fecha: '2026-10-30', url: `${CN}/2026-10-31/1225646762.PDF` },
  { id: 10, titulo: '关于部分行使超额配售权、稳定价格行动及稳定价格期结束的公告 (estructura del capital tras la sobreasignación)', editor: 'Shenzhen Transsion Holdings (CNINFO)', tipo: 'Primaria', fecha: '2026-11-12', url: `${CN}/2026-11-12/1225667718.PDF` },
];
const C = {
  _estado: 'completa',
  directivos: {
    equipo: [
      { nombre: 'Zhu Zhaojiang', cargo: 'Presidente y director general (fundador)', desde: '2013', participacion_pct: 9.0, trayectoria: 'Fundó el negocio en 2006 tras trabajar en Bird; llevó a Transsion de cero a 169 millones de teléfonos al año y a la primera posición en África [1]. Controla el 43,44 % de los votos a través de Transsion Investment, de la que tiene el 20,68 % del capital y el 67 % de los votos (participación económica propia estimada ≈ 9 %, más el 10,21 % de Beijing Chuanjiali) [1].' },
      { nombre: 'Xiao Yonghui', cargo: 'Director financiero', desde: '2014', participacion_pct: null, trayectoria: 'En el grupo desde su creación en 2013 y director financiero desde enero de 2014; consejero de las filiales internacionales [1].' },
      { nombre: 'Zhang Qi', cargo: 'Consejero ejecutivo y director general adjunto (cadena de suministro)', desde: '2013', participacion_pct: null, trayectoria: 'Responsable de compras y suministro, la función que decide el coste de la memoria; el directivo mejor pagado en 2025 (8,1 M CNY con 5,6 M en acciones) [1].' },
      { nombre: 'Yan Meng', cargo: 'Consejero ejecutivo (almacenamiento de energía)', desde: '2013', participacion_pct: null, trayectoria: 'Dirige el negocio de energía, que pasó de 4 M de ventas en 2023 a 358 M en 2025 [1].' },
      { nombre: 'Yang Hong', cargo: 'Consejera ejecutiva y directora general adjunta (legal, valores y propiedad intelectual)', desde: '2013', participacion_pct: null, trayectoria: 'Lleva los litigios de patentes: acuerdos con Qualcomm y Ericsson en 2026 [1, 6].' },
    ],
    historial_guidance: [],
    comentario: 'Equipo fundador muy estable: los seis consejeros ejecutivos están desde 2013 y no hubo cambios de presidente ni de director general en 24 meses [1]. La empresa no publica previsiones anuales numéricas, así que no hay historial de guía que medir; el único compromiso público, la política de dividendos, se ha cumplido (reparto superior al 100 % del beneficio en 2025) [1]. La dependencia de Zhu es total: es presidente, director general y accionista de control, y no hay plan de sucesión público. La remuneración del presidente es baja (2,6 M CNY en 2025) y cayó con el beneficio (12,5 M en 2023) [1].',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Zhu Zhaojiang', cargo: 'Presidente y director general', tipo: 'Ejecutivo', desde: '2017', comisiones: 'Remuneración, Nombramientos, Estrategia y ESG (presidente)' },
      { nombre: 'Zhang Qi', cargo: 'Consejero ejecutivo', tipo: 'Ejecutivo', desde: '2017', comisiones: 'Estrategia y ESG' },
      { nombre: 'Yan Meng', cargo: 'Consejero ejecutivo', tipo: 'Ejecutivo', desde: '2017', comisiones: '—' },
      { nombre: 'Ye Weiqiang', cargo: 'Consejero ejecutivo', tipo: 'Ejecutivo', desde: '2017', comisiones: '—' },
      { nombre: 'Chowdhury Mohammad Ariful Hasan', cargo: 'Consejero ejecutivo', tipo: 'Ejecutivo', desde: '2020', comisiones: '—' },
      { nombre: 'Yang Hong', cargo: 'Consejera ejecutiva', tipo: 'Ejecutivo', desde: '2023', comisiones: '—' },
      { nombre: 'Huang Yijian', cargo: 'Consejero independiente', tipo: 'Independiente', desde: '2023', comisiones: 'Auditoría, Estrategia y ESG' },
      { nombre: 'Chen Linrong', cargo: 'Consejero independiente', tipo: 'Independiente', desde: '2023', comisiones: 'Remuneración, Nombramientos (presidente)' },
      { nombre: 'Zhang Huailei', cargo: 'Consejero independiente', tipo: 'Independiente', desde: '2023', comisiones: 'Auditoría, Remuneración (presidente)' },
      { nombre: 'Wong Yee Man', cargo: 'Consejera independiente', tipo: 'Independiente', desde: '2026', comisiones: 'Auditoría (presidenta), Nombramientos' },
    ],
    presidente_ceo_separados: false, presidente_ejecutivo: true, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: false, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: true, presidente_vinculado_control: true, cambios_cupula_24m: 0,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 2.62, fijo: 2.57, variable_corto: null, variable_largo: 0, ratio_salario_medio: 13 },
    remuneracion: 'El presidente cobró 2,62 M CNY en 2025 (salario y bonus 2,57 M, sin acciones), frente a 7,84 M en 2024 y 12,53 M en 2023: la remuneración baja con el beneficio, sin un plan de largo plazo vivo (no hay acciones restringidas pendientes en 2026) [1]. Ratio frente al coste medio por empleado (4.847 M de gasto de personal entre 24.025 empleados ≈ 0,20 M): unas 13 veces [1, 5]. Los planes de acciones de 2021-2024 se medían por crecimiento de ventas y beneficio, no por rentabilidad sobre el capital [1]. No hay cláusulas públicas de recuperación. La junta china no vota la remuneración individual cada año.',
    accionistas: [
      { nombre: 'Transsion Investment (Zhu Zhaojiang controla el 67 % de los votos)', pct: 43.21, tipo: 'Control (plataforma de empleados)', variacion: '537,7 millones de acciones A: 46,71 % de la A y 43,21 % del total tras la H y la sobreasignación; vendió un 2,0 % por consulta en sep-2025 [9, 10, 4]' },
      { nombre: 'MediaTek (Digimoc Holdings)', pct: 5.93, tipo: 'Proveedor (procesadores)', variacion: '5,78 % en A más 1,9 millones de H como inversor ancla [1, 3]' },
      { nombre: 'Xinyu Chuanjiali (plataforma de empleados)', pct: 4.98, tipo: 'Plataforma de empleados', variacion: '62,0 millones de A; 5,39 % de la A [9]' },
      { nombre: 'Inversores ancla de la H (Longsys, BYD, GIC, E Fund y otros)', pct: null, tipo: 'Inversores ancla (bloqueo de seis meses)', variacion: 'Nuevos en oct-2026; libres a partir de abril de 2027 [3]' },
    ],
    insiders: [
      { fecha: '2025-09-12', persona: 'Transsion Investment (accionista de control)', operacion: 'Venta', acciones: 22807011, importe: null },
    ],
    control_y_defensas: 'Zhu Zhaojiang controla la junta: Transsion Investment tiene el 43,21 % del capital tras la H y la sobreasignación y él ejerce el 67 % de sus votos con el 20,68 % de su capital; es presidente y director general a la vez [1, 9, 10]. Una acción, un voto, sin clases especiales; las H y las A votan juntas salvo en asuntos de clase [1, 8]. El accionista de control vendió el 2 % en septiembre de 2025 «por necesidades propias de fondos» [4]. **Renovación del consejo el 24-nov-2026** (junta extraordinaria, voto acumulativo): Zhu, Ye Weiqiang, el director financiero Xiao Yonghui, Wang Haibin y Jiang Shuming como no independientes; Wong Yee Man, Chen Linrong y Ma Sitian como independientes, más Zhang Qi, ya elegido el 4-nov consejero en representación de los empleados; salen del consejo Yan Meng, Yang Hong, Ariful Hasan y los independientes Huang Yijian y Zhang Huailei [7, 8]. El consejo pasa de diez a nueve miembros con tres independientes (33 %).',
    alertas: [
      'Venta del 2 % por el accionista de control en sep-2025 «por necesidades propias de fondos» [4].',
      'Salida a bolsa de Hong Kong con un descuento del 38-44 % frente a la A, que perjudica a los accionistas de la A [3].',
      'Litigios de patentes abiertos con InterDigital, LG e IP Bridge [1].',
      'Renovación del consejo el 24-nov-2026: salen tres ejecutivos y dos independientes, entra el director financiero; sigue la acumulación de presidente y director general [7].',
    ],
    confianza: 'Media',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'Voto de la junta sobre la remuneración', tipo: 'Complemento', intentos: '1) Actas de la junta de 2025 (CNINFO, 7-may-2026: votan el informe del consejo, no la remuneración individual); 2) folleto de Hong Kong; 3) juntas extraordinarias de nov y dic-2025', decision: 'Omitido' },
    { seccion: 'directivos', campo: 'Historial de cumplimiento de la guía', tipo: 'Complemento', intentos: '1) Informes anuales 2021-2025 (sin guía numérica); 2) presentaciones de resultados de la STAR Market; 3) folleto de Hong Kong (sin previsión de beneficio)', decision: 'Omitido' },
  ],
};

// ================================================================ D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de 2636.HK (línea H, cierre del 13-nov-2026) y del Tracker Fund 2800.HK', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-11-13', url: 'https://finance.yahoo.com/quote/2636.HK' },
  { id: 2, titulo: 'Históricos diarios de 688036.SS (línea A), del ETF del CSI 300 (510300.SS) y del ETF de la STAR 50 (588000.SS); cierres de cada ejercicio, betas, volatilidad y movimiento', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-11-13', url: 'https://finance.yahoo.com/quote/688036.SS' },
  { id: 3, titulo: 'Shenzhen Transsion (688036.SS): earningsTrend y financialData (BPA 2026e y 2027e, ventas, objetivo medio 54,25 CNY de 4 analistas, tendencia del BPA a 30 y 90 días)', editor: 'Yahoo Finance', tipo: 'Analistas', fecha: '2026-11-13', url: 'https://finance.yahoo.com/quote/688036.SS/analysis' },
  { id: 4, titulo: '传音控股 公司信息更新报告：Q3利润率维持高位彰显韧性 (BPA 2026-2028e 2,81 / 3,70 / 4,72; beneficio rebajado de 3.683 / 5.026 / 6.297 M a 3.483 / 4.582 / 5.847 M)', editor: 'Kaiyuan Securities (开源证券), vía Eastmoney', tipo: 'Analistas', fecha: '2026-11-04', url: 'https://data.eastmoney.com/report/info/AP202611041831389617.html' },
  { id: 5, titulo: 'Fichas de los comparables (capitalización, deuda neta, EBITDA de 12 meses, earningsTrend): Xiaomi, Apple, Samsung, Lenovo, Huaqin, Longcheer, TCL Electronics', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-11-13', url: 'https://finance.yahoo.com' },
  { id: 6, titulo: 'Curva de la deuda pública china (中债国债收益率曲线), 12-nov-2026: 10 años 1,6032 %', editor: 'ChinaBond (中央国债登记结算)', tipo: 'Datos de mercado', fecha: '2026-11-12', url: 'https://yield.chinabond.com.cn/cbweb-czb-web/czb/moreInfo?locale=cn_ZH&nameType=1' },
  { id: 7, titulo: 'Implied ERP by month (ERPbymonth.xlsx): prima implícita del S&P 500, noviembre de 2026 (4,41 %)', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-11', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 8, titulo: 'Tipo de cambio HKD/CNY (HKDCNY=X), 13-nov-2026: 0,8498', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-11-13', url: 'https://finance.yahoo.com/quote/HKDCNY=X' },
  { id: 9, titulo: '传音控股港股盘中涨超10%，调入港股通标的 (12-nov, 9:55: +10,07 % a 41,74 HKD)', editor: 'Caiwen (财闻网)', tipo: 'Prensa', fecha: '2026-11-12', url: 'https://www.caiwennews.com/article/1696724.shtml' },
  { id: 10, titulo: '港股通标的证券名单发生调整并自2026年11月12日起调入传音控股 (anuncio de la Bolsa de Shenzhen)', editor: 'Tonghuashun (同花顺) 7x24', tipo: 'Prensa', fecha: '2026-11-12', url: 'http://stock.10jqka.com.cn/20261112/c681728858.shtml' },
  { id: 11, titulo: '关于部分行使超额配售权、稳定价格行动及稳定价格期结束的公告 (fin de la estabilización el 11-nov; compras del estabilizador entre 32,36 y 35,30 HKD; 6.500.600 H nuevas)', editor: 'Shenzhen Transsion Holdings (CNINFO)', tipo: 'Primaria', fecha: '2026-11-12', url: 'http://static.cninfo.com.cn/finalpage/2026-11-12/1225667718.PDF' },
  { id: 12, titulo: '2026年第三季度报告 (3T26): ventas −27,4 %, beneficio recurrente −47,7 %', editor: 'Shenzhen Transsion Holdings (CNINFO)', tipo: 'Primaria', fecha: '2026-10-30', url: 'http://static.cninfo.com.cn/finalpage/2026-10-31/1225646762.PDF' },
  { id: 13, titulo: 'Global Offering: nota 29 (acuerdo con Ericsson del 8-jul-2026), inversores ancla y bloqueos', editor: 'Shenzhen Transsion Holdings (HKEXnews)', tipo: 'Primaria', fecha: '2026-10-07', url: `${HK}/1007/2026100700007.pdf` },
  { id: 14, titulo: '传音控股股东询价转让计划书 (venta del 2 % por el accionista de control, sep-2025)', editor: 'Shanghai Securities News (cnstock)', tipo: 'Primaria', fecha: '2025-09-12', url: 'https://paper.cnstock.com/html/2025-09/12/content_2120285.htm' },
  { id: 15, titulo: '传音控股盘中跌超5%，被纳入港股通 (13-nov, 11:36: −5,77 % a 43,76 HKD)', editor: 'Caiwen (财闻网)', tipo: 'Prensa', fecha: '2026-11-13', url: 'https://www.caiwennews.com/article/1699250.shtml' },
  { id: 16, titulo: '传音控股 收入利润稳定增长 (BPA 2026-2028e 2,90 / 3,89 / 5,10; ventas 69.300 / 80.600 / 95.600 M)', editor: 'China Post Securities (中邮证券), vía Eastmoney', tipo: 'Analistas', fecha: '2026-11-10', url: 'https://data.eastmoney.com/report/info/AP202611101831585052.html' },
  { id: 17, titulo: '传音控股港股异动: Guohai Securities recomienda vigilarla en su informe semanal de electrónica (20-oct, +5,55 % a 36,54 HKD)', editor: 'Caiwen (财闻网)', tipo: 'Prensa', fecha: '2026-10-20', url: 'https://www.caiwennews.com/article/1659285.shtml' },
  { id: 18, titulo: '关于召开2026年第一次临时股东会的通知 (junta extraordinaria del 24-nov-2026: renovación del consejo)', editor: 'Shenzhen Transsion Holdings (CNINFO)', tipo: 'Primaria', fecha: '2026-11-05', url: 'http://static.cninfo.com.cn/finalpage/2026-11-05/1225656789.PDF' },
];
const r1 = (x) => Math.round(x * 10) / 10;
const ren = bolsaA.bolsa.rentabilidades;
const cierresA = Object.fromEntries(bolsaA.cierres_ejercicio.map((c) => [c.anio, c.precio_cierre]));
const bH = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const VOL_H = '≈ 81 M HKD/día en la H (21 sesiones; ≈ 54 M sin el 12 y 13-nov) y ≈ 735 M CNY/día en la A (3 meses)';
const D = {
  _estado: 'completa',
  identificacion: {
    nombre: 'Shenzhen Transsion Holdings Co., Ltd.', nombre_corto: 'Transsion', ticker: '2636.HK', isin: null,
    mercado: 'Bolsa de Hong Kong (línea H desde el 15-oct-2026, en el Stock Connect del sur desde el 12-nov; la línea A cotiza en la STAR Market de Shanghái, 688036)', indice_referencia: 'Hang Seng (H) y STAR 50 / CSI 300 (A)',
    pais: 'China', pais_iso: 'CN', sector: 'Tecnología de la información', industria: 'Hardware, almacenamiento y periféricos (teléfonos)', sede: 'Shenzhen (Cantón, China)', fundacion: '2013', empleados: 24025, web: 'www.transsion.com',
    precio: PRECIO, fecha_precio: FECHA, acciones: Math.round(ACC * 10) / 10, capitalizacion_publicada: Math.round(PRECIO * ACC),
    free_float_pct: 45, max_52s: Math.round(48.8 * TC * 100) / 100, min_52s: Math.round(32.3 * TC * 100) / 100,
    volumen_medio_diario: VOL_H, proximos_resultados: '2027-03-28',
  },
  consenso: {
    guidance: 'Transsion no publica previsiones anuales. En la conferencia del 30-oct la dirección solo habló de mantener un margen bruto «sano» según el coste y la competencia, y de que las existencias ya bajan [12]. El 3T26 (ventas −27,4 %, beneficio recurrente −47,7 %) es el último dato duro [12].',
    estimaciones: [
      { periodo: '2026e', ingresos: 66129, ebitda: null, ebit: null, bpa: 2.936, dpa: null, fuente: 'Yahoo Finance (2 analistas el BPA, ventas de la media) [3]' },
      { periodo: '2027e', ingresos: 81240, ebitda: null, ebit: null, bpa: 3.364, dpa: null, fuente: 'Yahoo Finance (5 analistas) [3]' },
      { periodo: '2028e', ingresos: 95600, ebitda: null, ebit: null, bpa: 4.91, dpa: null, fuente: 'Media de Kaiyuan (4,72) y China Post (5,10); ventas de China Post [4, 16]' },
    ],
    recomendaciones: { n_analistas: 4, comprar: null, mantener: null, vender: null, po_medio: 54.25, po_min: 47.0, po_max: 60.0 },
    revisiones: 'El consenso es pobre y va a la baja. Yahoo da para la A un BPA de 2,94 CNY en 2026e (2 analistas) y 3,36 en 2027e (5), frente a 3,64 hace 90 días y 3,41 hace 30: un recorte del 7,6 % en tres meses del BPA de 2027 [3]. Kaiyuan rebajó el 4-nov su beneficio de 2026-2028 en un 5-7 % por la crisis de la memoria y mantiene «Comprar» (BPA 2,81 / 3,70 / 4,72) [4]; China Post mantiene «Comprar» con 2,90 / 3,89 / 5,10 y unas ventas de 69.300 M en 2026e que el 3T26 ya hace difíciles (exigen 19.000 M en el 4T) [16, 12]. Objetivo medio para la A de 54,25 CNY (47-60, 4 analistas, recomendación media «Mantener») sin actualizar tras los resultados [3]. Ningún banco publica todavía objetivo para la H. MarketScreener sigue con las cifras anteriores al 3T26 y no se usa [3].',
    base_ebitda: null,
    ajuste_ebitda_pct_ventas: null,
    confianza: 'Baja',
  },
  bolsa: {
    tipo_rentabilidad: 'total (con dividendos)',
    rentabilidades: ren.map((x) => ({ ...x })),
    anual: bolsaA.bolsa.anual.filter((x) => x.anio >= '2021'),
    beta: 1.07, volatilidad_pct: 50.8, max_drawdown_pct: -70.5, posicion_corta_pct: null,
    comentario: `La línea H tiene 21 sesiones: salió a 35,30 HKD el 15-oct, cotizó entre 32,3 y 38,5 HKD mientras el estabilizador compraba 6,5 millones de acciones a 32,36-35,30 HKD, saltó un 22,5 % el 12-nov al entrar en el Stock Connect del sur (46,44 HKD) y cerró el 13-nov en ${PH} HKD [1, 11, 10]. La historia es la de la A [2]: rinde un ${ren[1].accion_pct} % en un año frente al ${ren[1].indice_pct} % del CSI 300 y el ${ren[1].sector_pct} % de la STAR 50, y un ${ren[3].accion_pct} % anual en cinco años, con una caída máxima del 70,5 % (abr-2024 a oct-2026). Beta mensual de 5 años 1,07 frente al CSI 300 (semanal de 2 años 0,66) [2]. La A subió un 36 % desde el mínimo del 8-oct (45,26 CNY) mientras sus índices bajaban: se fue el peso de la colocación de la H. Con la H a ${PRECIO} CNY (${PH} HKD × ${TC}) frente a ${PA} CNY de la A, el descuento H/A es del ${Math.round((1 - HA) * 1000) / 10} % (38,7 % el 16-oct; 48,5 % el 11-nov, antes del Stock Connect) [1, 2, 8].`,
    contexto: {
      movimiento: { fecha: '2026-11-13', var_1m_pct: 27.8, var_3m_pct: 6.0, var_6m_pct: 5.7, var_12m_pct: -17.9, dist_max_52s_pct: -19.2, dist_min_52s_pct: 33.7, dist_max_historico_pct: -64.7, tendencia: 'lateral', volatilidad_60d_pct: 57, avisos: ['P1 Subida fuerte: +28 % en un mes (línea A; la H, +26 % desde su primer cierre)'] },
      movimientos_fuertes: [
        { periodo: '12-nov-2026 (H)', var_pct: 22.5, causa: 'Entrada de la H en el Stock Connect del sur con efecto desde el 12-nov (anuncio de las bolsas de Shenzhen y Shanghái a primera hora, al día siguiente del fin del periodo de estabilización): los inversores de China continental pueden comprar en Hong Kong la misma acción que en Shanghái cuesta casi el doble. Volumen de 11,3 millones de H (≈ 18 veces la media previa); a las 9:55 ya subía un 10 % [10, 9, 11, 1]. La A cayó un 0,6 % ese día: es arbitraje del descuento, no una noticia del negocio. El 13-nov devolvió un 9,6 % (−5,8 % a media sesión) [15, 1].', veredicto: 'no cambia', condicion: null },
        { periodo: '8-oct a 6-nov-2026 (A)', var_pct: 41.0, causa: 'Rebote de la A desde el mínimo del 8-oct (−14,3 % por el descuento de la oferta H) hasta 65,00 CNY: se fue el peso de la colocación, Guohai la recomendó vigilar el 20-oct (+10,5 % ese día) y el mercado leyó bien el margen bruto del 3T26 (22,7 %) [17, 12, 2]. Sin hecho de la empresa los días del 23-oct (+7,2 %) y del 5-nov (+9,9 %); los índices (CSI 300 y STAR 50) bajaban [2].', veredicto: 'no cambia', condicion: null },
        { periodo: 'oct-2026 (A)', var_pct: -20.8, causa: 'El 8-oct, primera sesión tras la Semana Dorada, −14,31 % a 46,10 CNY: la oferta de la H se lanzó con un descuento del 38-44 % frente al cierre de la A [13].', veredicto: 'no cambia', condicion: null },
        { periodo: 'ago-2026 (A)', var_pct: -12.9, causa: 'Del 20-jul al 4-ago (−8,2 % el 4-ago) devolvió la subida de julio: el mercado entendió que el margen del 1S26 venía de inventario barato y Omdia esperaba −26 % en África en 2026 [2].', veredicto: 'no cambia', condicion: null },
        { periodo: 'jul-2026 (A)', var_pct: 28.3, causa: 'Acuerdo de patentes con Ericsson (8-jul) y avance del 1S26 con beneficio +44,8 % (19-jul) [13, 2].', veredicto: 'no cambia', condicion: null },
      ],
      noticias: [
        { fecha: '2026-11-12', tipo: 'rumor', hecho: 'Entrada en el Stock Connect del sur (anuncio de la Bolsa de Shenzhen, efectivo el 12-nov): abre la H a los inversores del continente; es la causa de la subida del 22,5 % y puede seguir cerrando el descuento H/A, pero también es dinero rápido que puede salir [10, 9].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-11-11', tipo: 'ampliación o convertible', hecho: 'Fin de la estabilización y ejercicio parcial de la sobreasignación: 6.500.600 H nuevas a 35,30 HKD (0,5 % del capital, 227 M HKD netos; cotizan desde el 16-nov); el resto de la opción caducó. Acciones totales: 1.244.333.445 [11].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-30', tipo: 'resultados', hecho: 'Resultados del 3T26: ventas −27,4 %, beneficio atribuido −8,4 % y recurrente −47,7 %, flujo operativo de nueve meses de −9.873 M [12]. Están en este informe (rebaja de la proyección de 2026-2028).', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-11-04', tipo: 'recomendación', hecho: 'Kaiyuan rebaja un 5-7 % el beneficio de 2026-2028e y mantiene «Comprar»; China Post reitera «Comprar» el 10-nov; Yahoo: BPA de 2027e −7,6 % en 90 días [4, 16, 3].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-11-24', tipo: 'accionista de referencia', hecho: 'Junta extraordinaria para renovar el consejo (salen tres ejecutivos y dos independientes; el presidente sigue) [18].', veredicto: 'no cambia', condicion: null },
        { fecha: '2027-04-15', tipo: 'accionista de referencia', hecho: 'Fin del bloqueo de seis meses de los inversores ancla de la H (≈ 40 % de la oferta: MediaTek, Longsys, BYD y otros) [13]; dentro del horizonte, con socios industriales que no suelen vender y con la H ya en el Stock Connect.', veredicto: 'no cambia', condicion: null },
        { fecha: '2025-09-12', tipo: 'accionista de referencia', hecho: 'Transsion Investment, el accionista de control, vendió el 2,0 % por consulta «por necesidades propias de fondos» [14]. Sin ventas nuevas anunciadas.', veredicto: 'no cambia', condicion: null },
      ],
      proximos_resultados: '2027-03-28',
      veredicto: 'no cambia',
      condicion: null,
      comentario: 'La H sube un 19,0 % sobre el precio de oferta y la A un 36 % desde el mínimo de octubre (P1), con los índices chinos a la baja. Las dos causas están identificadas y no son del negocio: el fin de la colocación de la H (la A recupera lo que perdió el 8-oct) y la entrada de la H en el Stock Connect el 12-nov, que reduce el descuento H/A del 48,5 % al ' + Math.round((1 - HA) * 1000) / 10 + ' %. El dato del negocio va en contra (3T26 con ventas −27 %) y está en esta revisión. No hay un hecho pendiente que pueda mover el precio más de un 5 % en contra antes de los resultados anuales (≈ finales de marzo de 2027): la sobreasignación ya se ejerció y los anclas siguen bloqueados hasta abril. Veredicto: no cambia; el riesgo de la subida del Stock Connect es de precio y lo recoge la regla a 12 meses.',
    },
    confianza: 'Media',
  },
  multiplos_historicos: {
    // Precio de cierre en base H (CNY): cierre de la A de cada año × el cociente H/A de hoy, para no suponer que el descuento se cierra.
    serie: ['2021', '2022', '2023', '2024', '2025'].map((a) => ({ anio: a, precio_cierre: Math.round(cierresA[a] * HA * 100) / 100, ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    comentario: `La H no tiene historia: el precio de cierre de cada año es el de la A (156,90, 79,52, 138,40, 95,00 y 66,16 CNY, ya ajustados por la ampliación liberada de 2024) multiplicado por ${HA}, el cociente H/A del 13-nov [2, 1]. Así la historia y el precio actual miden lo mismo y no se supone que el descuento de la H se cierre (en un mes ha ido de 0,61 a 0,52 y a ${HA}). En la A, el PER de cierre bajó de 45x (2021) a 19x (2024) y volvió a 29x en 2025 con el beneficio hundido; hoy la A cotiza a 23,2x el beneficio de los últimos 12 meses (2,66 CNY) y la H a 13,6x.`,
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Fabricantes de teléfonos y electrónica de consumo cotizados: Xiaomi (rival directo en África y Asia), Samsung (segunda en África), Apple (referencia de valor), Lenovo (Motorola en Latinoamérica), Huaqin y Longcheer (fabricantes por encargo de teléfonos de gama baja) y TCL Electronics (marca china de electrónica para emergentes). Honor, vivo y OPPO no cotizan. Samsung se deja aunque su beneficio lo infla el ciclo de la memoria (PER de 2,8x): es lo contrario de Transsion en el mismo ciclo. Datos de Yahoo del 13-nov-2026 rehechos uno a uno (precio, deuda y caja del último trimestre, EBITDA de 12 meses y BPA de consenso de 2026e y 2027e ponderados por los meses que quedan; Lenovo con caja de sep-2025, la última que da Yahoo), en millones de CNY [5].',
    empresas: comps.map(({ _eps0, _eps1, _n, ...c }) => c),
    comentario: 'El mapa no cambia: los ensambladores de marca o por encargo con margen EBITDA del 1-6 % (Lenovo, TCL, Huaqin, Longcheer) cotizan a 0,2-0,5 veces ventas, y los que tienen ecosistema o semiconductores (Apple, Xiaomi, Samsung) a 1,3-11 veces [5]. Transsion en la H, a ≈ 0,4 veces ventas y ≈ 11 veces el EBITDA de 12 meses (deprimido), cotiza como ensamblador, con caja neta. La mediana del PER de los próximos 12 meses de los siete es 14,8x (Huaqin); sin Apple ni Samsung, 14,8x también (Xiaomi 20,3x, Longcheer 20,1x, Huaqin 14,8x, TCL 9,6x, Lenovo 7,0x). El rango útil para Transsion es el de TCL a Huaqin: 10-15x.',
    confianza: 'Media',
  },
  transacciones: null,
  fuentes: fD,
  huecos: [
    { seccion: 'transacciones', campo: 'Transacciones precedentes con múltiplo', tipo: 'Complemento', intentos: '1) Folleto de Hong Kong (sin operaciones del sector); 2) búsqueda de compras de fabricantes de teléfonos con múltiplo publicado (solo Lenovo/Motorola 2014, Google/Motorola 2012 y HP/Palm 2010, fuera de los 5-7 años); 3) Honor (escisión de Huawei en 2020, sin múltiplo publicado)', decision: 'Omitido' },
    { seccion: 'bolsa', campo: 'Posición corta oficial de la H', tipo: 'Complemento', intentos: '1) Estadística de ventas en corto de HKEX (sin serie descargable por valor); 2) registro de posiciones cortas de la SFC (publicación semanal con dos semanas de retraso: aún sin la H); 3) margen de la A en Shanghái (financiación de compras de 698 M, no es posición corta)', decision: 'Omitido' },
    { seccion: 'consenso', campo: 'EBITDA y EBIT de consenso tras el 3T26', tipo: 'Complemento', intentos: '1) MarketScreener (cifras anteriores al 3T26, sin actualizar); 2) Yahoo earningsTrend (solo BPA y ventas); 3) informes de Kaiyuan y China Post en Eastmoney (beneficio y ventas, sin EBITDA)', decision: 'Omitido' },
  ],
};

// ================================================================ E. Sentimiento
const fE = [
  { id: 1, titulo: '传音控股吧 (foro de Eastmoney de la H, hk02636), página 1: mensajes del 8 al 13-nov-2026', editor: 'Eastmoney Guba', tipo: 'Foros y redes', fecha: '2026-11-13', url: 'https://guba.eastmoney.com/list,hk02636.html' },
  { id: 2, titulo: '传音控股吧 (hk02636), página 2: mensajes del 30-oct al 5-nov-2026', editor: 'Eastmoney Guba', tipo: 'Foros y redes', fecha: '2026-11-05', url: 'https://guba.eastmoney.com/list,hk02636_2.html' },
  { id: 3, titulo: '传音控股吧 (foro de la A, 688036), página 3: mensajes del 4 y 5-nov-2026', editor: 'Eastmoney Guba', tipo: 'Foros y redes', fecha: '2026-11-05', url: 'https://guba.eastmoney.com/list,688036_3.html' },
  { id: 4, titulo: '传音控股吧 (688036), página 4: mensajes del 26-oct al 3-nov-2026 (resultados del 3T26)', editor: 'Eastmoney Guba', tipo: 'Foros y redes', fecha: '2026-11-03', url: 'https://guba.eastmoney.com/list,688036_4.html' },
  { id: 5, titulo: '传音控股吧 (688036), página 6: mensajes del 19 al 21-oct-2026', editor: 'Eastmoney Guba', tipo: 'Foros y redes', fecha: '2026-10-21', url: 'https://guba.eastmoney.com/list,688036_6.html' },
  { id: 6, titulo: '传音控股吧 (688036), página 10: mensajes del 7 al 9-oct-2026 (caída por la oferta H)', editor: 'Eastmoney Guba', tipo: 'Foros y redes', fecha: '2026-10-09', url: 'https://guba.eastmoney.com/list,688036_10.html' },
];
const E = {
  _estado: 'completa',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Eastmoney Guba (H, hk02636), Stock Connect', fecha: '2026-11', n_comentarios: 75, tono: 'Dividido', resumen: 'Sorpresa por la subida del 12-nov («偷偷摸摸进通»: entró en el Stock Connect sin que nadie lo esperara) y desconfianza: muchos lo ven como dinero rápido que «se devolverá» y como subida «para vender arriba»; otros señalan que la H recuperó en un día lo que la A en un mes [1].' },
      { plataforma: 'Eastmoney Guba (H, hk02636), resultados', fecha: '2026-10', n_comentarios: 60, tono: 'Negativo', resumen: 'Titulares del 3T26 (ventas −27 %, recurrente −48 %, «江波龙浮亏»: el ancla Longsys pierde dinero) y quejas por la poca liquidez de la H y los estrenos fallidos en Hong Kong [2].' },
      { plataforma: 'Eastmoney Guba (A, 688036), principios de noviembre', fecha: '2026-11', n_comentarios: 80, tono: 'Positivo', resumen: 'Euforia moderada con la A en 60 CNY: «目标100» (objetivo 100), «该轮到消费电子了», y a la vez dudas sobre si reducir posición; quejas de que va por detrás de su sector los días de subida general [3].' },
      { plataforma: 'Eastmoney Guba (A, 688036), resultados del 3T26', fecha: '2026-10', n_comentarios: 80, tono: 'Dividido', resumen: 'Unos ven el trimestre aceptable («季报我觉得还行») por el margen; otros temen el lunes y señalan la salida del fondo Gaoyi de los diez primeros y el flujo de caja; un hilo pregunta por qué empeoró de golpe la caja del negocio africano [4].' },
      { plataforma: 'Eastmoney Guba (A, 688036), rebote de octubre', fecha: '2026-10', n_comentarios: 80, tono: 'Dividido', resumen: 'Particulares atrapados que venden al recuperar el coste («回本就走») junto a quien la ve en «mínimo histórico» técnico; noticia de que Capital Group compró 6,7 millones de H [5].' },
      { plataforma: 'Eastmoney Guba (A, 688036), oferta de la H', fecha: '2026-10', n_comentarios: 80, tono: 'Negativo', resumen: 'Indignación por la H con descuento («打6折定增») y temor a que la memoria almacenada se acabe y el beneficio del segundo semestre «se hunda» [6].' },
    ],
    temas: [
      { tema: 'Stock Connect y descuento H/A', postura: 'Dividida', peso: 'Alto', contraste: 'Es la causa real de la subida del 12-nov (anuncio de la Bolsa de Shenzhen); el descuento H/A pasó del 48,5 % al 42 %. Que se cierre más no está en la valoración: la historia del PER usa el cociente H/A de hoy [1].' },
      { tema: 'Caída de ventas del 3T26 y memoria', postura: 'Bajista', peso: 'Alto', contraste: 'Tienen razón: ventas −27 % y beneficio recurrente −48 %; la proyección de 2026-2027 se rebaja por ello [2, 4].' },
      { tema: 'Flujo de caja e inventario', postura: 'Bajista', peso: 'Medio', contraste: 'Confirmado: −9.873 M de flujo operativo en nueve meses y 17.319 M de existencias; la dirección dice que ya bajan [4].' },
      { tema: 'IA en el teléfono y «revalorización de plataforma»', postura: 'Alcista', peso: 'Medio', contraste: 'Narrativa de casas de análisis sin cifra que la sostenga: el internet móvil es el 1,4 % de las ventas. No entra en la valoración [2].' },
      { tema: 'Particulares atrapados que venden al recuperar el coste', postura: 'Bajista', peso: 'Bajo', contraste: 'Oferta de papel en la A entre 60 y 66 CNY; no afecta al negocio [5].' },
    ],
    lectura: 'El tono pasó de capitulación (octubre) a dividido, con un punto de euforia en la A en noviembre y desconfianza en la H tras el salto del Stock Connect. Los foros ven bien los dos riesgos del informe (ventas del 3T26 y memoria) y añaden uno de precio que importa para comprar ahora: la subida del 12-nov es flujo, no negocio, y puede devolverse (el 13-nov ya cedió un 10 %). No contradicen a los analistas (que mantienen «Comprar» con recortes). No aporta un riesgo de negocio nuevo; sí aconseja no perseguir el precio del 12-nov.',
    confianza: 'Baja',
  },
  fuentes: fE,
  huecos: [],
};

guarda('A', A); guarda('B', B); guarda('C', C); guarda('D', D); guarda('E', E);
console.log('Notas A-E escritas. H/A =', HA);
