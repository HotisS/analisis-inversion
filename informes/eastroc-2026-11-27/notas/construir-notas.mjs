// Notas A-E de Eastroc Beverage (Group) Co., Ltd. — línea H 9980.HK (la que se analiza y se compra), línea A 605499.SS.
// Corte 2026-11-27 (viernes; cierres de la H y de la A del mismo día). Iteración tras el 3T26 (29-oct). Cifras en millones de CNY salvo
// que se diga otra cosa. Fuentes: informes CAS de CNINFO/SSE (anuales 2021-2025, semestrales y trimestrales), folleto H de HKEX
// (enero de 2026, cuentas NIIF 2022-2024 y 9M25), anuncios de HKEX y SSE, Yahoo Finance, MarketScreener, ChinaBond y Guba.
// Ejecutar: node informes/eastroc-2026-11-27/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const lee = (f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
const CN = 'http://static.cninfo.com.cn/finalpage';
const HK = 'https://www1.hkexnews.hk/listedco/listconews/sehk';
const bolsaA = lee('bolsa-a.json');
const comps = lee('comparables-yahoo.json');
const movH = lee('movimiento-h.json');
const movA = lee('movimiento-a.json');
export const TC = 0.85; // CNY por HKD, 27-nov-2026 (Yahoo HKDCNY=X 0,84997)
export const PRECIO_H = 96.15; // HKD, cierre del 27-nov-2026
export const PRECIO_A = 108.67; // CNY, cierre de la A el 27-nov-2026
export const HA = Math.round((PRECIO_H * TC / PRECIO_A) * 10000) / 10000; // 0,7521
const r1 = (x) => Math.round(x * 10) / 10;
const r2 = (x) => Math.round(x * 100) / 100;

// ================================================================ A. Cuentas
const fA = [
  { id: 1, titulo: '2025年年度报告 (informe anual 2025, normas chinas CAS): estados consolidados 2025 y 2024, anexo de flujos, ventas por producto, región y canal, datos trimestrales, dividendo y plantilla', editor: 'Eastroc Beverage (Group) Co., Ltd. (CNINFO/SSE)', tipo: 'Primaria', fecha: '2026-03-31', url: `${CN}/2026-03-31/1225063447.PDF` },
  { id: 2, titulo: '2024年年度报告 (informe anual 2024, CAS): datos trimestrales de 2024, dividendos y ampliación liberada 3 × 10', editor: 'Eastroc Beverage (CNINFO/SSE)', tipo: 'Primaria', fecha: '2025-03-08', url: `${CN}/2025-03-08/1222744419.PDF` },
  { id: 3, titulo: '2023年年度报告 (informe anual 2023, CAS): estados consolidados 2023 y 2022, anexo de flujos y auditor', editor: 'Eastroc Beverage (CNINFO/SSE)', tipo: 'Primaria', fecha: '2024-04-15', url: `${CN}/2024-04-15/1219612087.PDF` },
  { id: 4, titulo: '2021年年度报告 (informe anual 2021, CAS): estados consolidados 2021 y 2020, salida a bolsa de 2021 y nota de deuda', editor: 'Eastroc Beverage (CNINFO/SSE)', tipo: 'Primaria', fecha: '2022-02-28', url: `${CN}/2022-02-28/1212462995.PDF` },
  { id: 5, titulo: '2026年半年度报告 (informe semestral 2026, CAS): balance a 30-jun-2026, cuenta y flujos del 1S26, salida a bolsa H, ampliación liberada de mayo y recompra', editor: 'Eastroc Beverage (CNINFO/SSE)', tipo: 'Primaria', fecha: '2026-07-31', url: `${CN}/2026-07-31/1225449594.PDF` },
  { id: 6, titulo: '2026年第一季度报告 (informe del 1T26)', editor: 'Eastroc Beverage (CNINFO/SSE)', tipo: 'Primaria', fecha: '2026-04-30', url: `${CN}/2026-04-30/1225261649.PDF` },
  { id: 7, titulo: '2025年半年度报告 (informe semestral 2025, CAS): cuenta del 1S25', editor: 'Eastroc Beverage (CNINFO/SSE)', tipo: 'Primaria', fecha: '2025-07-26', url: `${CN}/2025-07-26/1224301365.PDF` },
  { id: 8, titulo: '2026年半年度主要经营数据的公告 (datos operativos del 1S26: ventas por producto, canal y región; distribuidores)', editor: 'Eastroc Beverage (CNINFO/SSE)', tipo: 'Primaria', fecha: '2026-07-31', url: `${CN}/2026-07-31/1225449598.PDF` },
  { id: 9, titulo: '2026年一季度主要经营数据的公告 (datos operativos del 1T26)', editor: 'Eastroc Beverage (CNINFO/SSE)', tipo: 'Primaria', fecha: '2026-04-30', url: `${CN}/2026-04-30/1225261839.PDF` },
  { id: 10, titulo: 'Global Offering (folleto de la salida a bolsa H): resumen, información financiera NIIF 2022-2024 y 9M25, sector (Frost & Sullivan) y negocio', editor: 'Eastroc Beverage (HKEXnews)', tipo: 'Primaria', fecha: '2026-01-26', url: `${HK}/2026/0126/2026012600003.pdf` },
  { id: 11, titulo: '关于2026年半年度业绩说明会情况的公告 (preguntas y respuestas de la conferencia de resultados del 1S26, 17-sep-2026)', editor: 'Eastroc Beverage (CNINFO/SSE)', tipo: 'Primaria', fecha: '2026-09-18', url: `${CN}/2026-09-18/1225570801.PDF` },
  { id: 12, titulo: '关于2025年年度暨2026年第一季度业绩说明会情况的公告 (conferencia de resultados de 2025 y 1T26, 29-may-2026)', editor: 'Eastroc Beverage (CNINFO/SSE)', tipo: 'Primaria', fecha: '2026-05-30', url: `${CN}/2026-05-30/1225340354.PDF` },
  { id: 13, titulo: '2022年年度报告 (informe anual 2022, CAS): dividendo de 2022', editor: 'Eastroc Beverage (CNINFO/SSE)', tipo: 'Primaria', fecha: '2023-04-22', url: `${CN}/2023-04-22/1216527837.PDF` },
  { id: 14, titulo: '未来三年（2026年-2028年）股东分红回报规划 (política de dividendos 2026-2028: al menos el 80 % del beneficio)', editor: 'Eastroc Beverage (CNINFO/SSE)', tipo: 'Primaria', fecha: '2026-07-31', url: `${CN}/2026-07-31/1225449588.PDF` },
  { id: 15, titulo: 'Poll results of the 2026 third EGM (acciones emitidas a 9-oct-2026: 676.016.900 A + 58.182.410 H; 7.122.551 A en autocartera)', editor: 'Eastroc Beverage (HKEXnews)', tipo: 'Primaria', fecha: '2026-10-09', url: `${HK}/2026/1009/2026100901141.pdf` },
  { id: 16, titulo: '关于以集中竞价交易方式回购A股股份的进展公告 (recompra de A a 30-sep-2026: 7.122.551 acciones, 1.038,7 M CNY)', editor: 'Eastroc Beverage (CNINFO/SSE)', tipo: 'Primaria', fecha: '2026-10-10', url: `${CN}/2026-10-10/1225600167.PDF` },
  { id: 17, titulo: '2026年第三季度报告 (informe del 3T26, CAS sin auditar): balance a 30-sep-2026, cuenta y flujos de 9M26 y 9M25, ventas por producto y región, accionistas', editor: 'Eastroc Beverage (CNINFO/SSE)', tipo: 'Primaria', fecha: '2026-10-30', url: `${CN}/2026-10-30/1225640886.PDF` },
  { id: 18, titulo: '2026年前三季度主要经营数据的公告 (datos operativos de 9M26: ventas por producto, canal y región; 3.787 distribuidores)', editor: 'Eastroc Beverage (CNINFO/SSE)', tipo: 'Primaria', fecha: '2026-10-30', url: `${CN}/2026-10-30/1225640897.PDF` },
  { id: 19, titulo: '关于以集中竞价交易方式回购A股股份的进展公告 (a 31-oct-2026: sin compras en octubre; 7.122.551 A acumuladas)', editor: 'Eastroc Beverage (CNINFO/SSE)', tipo: 'Primaria', fecha: '2026-11-03', url: `${CN}/2026-11-03/1225654007.PDF` },
  { id: 20, titulo: '东吴证券: 2026年三季报点评 «大势承压致降速明显，盈利亦受扰动» (desglose del 3T26 y causas)', editor: 'Soochow Securities (vía Eastmoney)', tipo: 'Analistas', fecha: '2026-10-30', url: 'https://data.eastmoney.com/report/info/AP202610301831232217.html' },
  { id: 21, titulo: '国金证券: «雨水天气持续扰动，业绩略有承压» (3T26 por debajo de lo esperado; anticipos +42,9 %)', editor: 'Sinolink Securities (vía Eastmoney)', tipo: 'Analistas', fecha: '2026-10-30', url: 'https://data.eastmoney.com/report/info/AP202610301831198363.html' },
  { id: 22, titulo: '国信证券: «经营短期承压，重视股东回报» (márgenes del 3T26 y previsiones rebajadas)', editor: 'Guosen Securities (vía Eastmoney)', tipo: 'Analistas', fecha: '2026-11-02', url: 'https://data.eastmoney.com/report/info/AP202611021831303670.html' },
  { id: 23, titulo: '东鹏饮料Q3净利下滑，经销商：莫透支渠道 (distribuidores: inventario de productos nuevos y equipos comerciales)', editor: '中华网财经 (vía Eastmoney)', tipo: 'Prensa', fecha: '2026-11-02', url: 'https://guba.eastmoney.com/news,hk09980,1790820985.html' },
  { id: 24, titulo: '关于召开2026年第三季度业绩说明会的公告 (conferencia del 3T26 el 9-dic-2026)', editor: 'Eastroc Beverage (CNINFO/SSE)', tipo: 'Primaria', fecha: '2026-11-24', url: `${CN}/2026-11-24/1225684098.PDF` },
];

// Ejercicios reales 2020-2025 (CAS). EBIT = resultado de explotación sin ingresos financieros, inversiones ni valor razonable,
// con los extraordinarios no operativos (营业外收支); resultado financiero = −财务费用 + 投资收益 + 公允价值变动.
const cuenta = [
  { periodo: '2020', ingresos: 4958.5, coste_ventas: 2783.88, gastos_generales: 1123.76, ebitda: 1138.2, amortizaciones: 134.45, ebit: 1003.75, resultado_financiero: 25.8, bai: 1029.55, impuestos: 217.49, minoritarios: 0, beneficio_neto: 812.06, gastos_financieros: 9.78, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 1.335, dpa: null, dpa_extraordinario: 0, acciones_diluidas: 608.4 },
  { periodo: '2021', ingresos: 6977.82, coste_ventas: 3881.56, gastos_generales: 1662.82, ebitda: 1559.15, amortizaciones: 196.25, ebit: 1362.9, resultado_financiero: 150.6, bai: 1513.52, impuestos: 320.56, minoritarios: 0, beneficio_neto: 1192.96, gastos_financieros: 14.81, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 1.84, dpa: 1.775, dpa_extraordinario: 0, acciones_diluidas: 648.3 },
  { periodo: '2022', ingresos: 8505.39, coste_ventas: 4905.46, gastos_generales: 1748.55, ebitda: 2033.53, amortizaciones: 239.32, ebit: 1794.21, resultado_financiero: 41.8, bai: 1836.01, impuestos: 395.49, minoritarios: 0, beneficio_neto: 1440.52, gastos_financieros: 52.68, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 2.131, dpa: 1.183, dpa_extraordinario: 0, acciones_diluidas: 676.02 },
  { periodo: '2023', ingresos: 11262.79, coste_ventas: 6411.65, gastos_generales: 2378.66, ebitda: 2680.5, amortizaciones: 269.89, ebit: 2410.61, resultado_financiero: 168.66, bai: 2579.27, impuestos: 539.5, minoritarios: 0, beneficio_neto: 2039.77, gastos_financieros: 80.09, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 3.017, dpa: 1.479, dpa_extraordinario: 0, acciones_diluidas: 676.02 },
  { periodo: '2024', ingresos: 15838.85, coste_ventas: 8741.56, gastos_generales: 3169.41, ebitda: 4147.43, amortizaciones: 358.94, ebit: 3788.49, resultado_financiero: 318.81, bai: 4107.31, impuestos: 780.88, minoritarios: -0.28, beneficio_neto: 3326.71, gastos_financieros: 102.88, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 4.921, dpa: 3.402, dpa_extraordinario: 0, acciones_diluidas: 676.02 },
  { periodo: '2025', ingresos: 20875.27, coste_ventas: 11501.22, gastos_generales: 4048.05, ebitda: 5665.85, amortizaciones: 495.89, ebit: 5169.96, resultado_financiero: 414.4, bai: 5584.36, impuestos: 1170.34, minoritarios: -1.24, beneficio_neto: 4415.26, gastos_financieros: 101.13, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 6.531, dpa: 3.846, dpa_extraordinario: 0, acciones_diluidas: 676.02 },
];
const balance = [
  { periodo: '2020', activo_total: 4361.29, activo_corriente: 1958.98, pasivo_corriente: 2130.0, pasivo_total: 2448.03, fondo_comercio: 0, intangibles: 236.58, inmovilizado_material: 1860.65, existencias: 272.7, clientes: 12.85, proveedores: 297.98, activos_contrato: null, pasivos_contrato: null, caja: 1224.85, deuda_financiera: 473.7, arrendamientos: 0, patrimonio_neto: 1913.25, minoritarios: 0, reservas: 1052.44 },
  { periodo: '2021', activo_total: 7790.49, activo_corriente: 2851.53, pasivo_corriente: 3415.09, pasivo_total: 3552.37, fondo_comercio: 0, intangibles: 322.57, inmovilizado_material: 2096.26, existencias: 340.04, clientes: 24.57, proveedores: 554.39, activos_contrato: null, pasivos_contrato: null, caja: 1019.1, deuda_financiera: 679.68, arrendamientos: 106.22, patrimonio_neto: 4238.13, minoritarios: 0, reservas: 1557.71 },
  { periodo: '2022', activo_total: 11869.96, activo_corriente: 7246.19, pasivo_corriente: 6705.7, pasivo_total: 6805.36, fondo_comercio: 0, intangibles: 357.35, inmovilizado_material: 2761.58, existencias: 394.22, clientes: 24.75, proveedores: 651.2, activos_contrato: null, pasivos_contrato: null, caja: 2157.56, deuda_financiera: 3181.6, arrendamientos: 124.58, patrimonio_neto: 5064.6, minoritarios: 0, reservas: 2398.53 },
  { periodo: '2023', activo_total: 14710.05, activo_corriente: 8768.56, pasivo_corriente: 8047.34, pasivo_total: 8386.29, fondo_comercio: 0, intangibles: 484.84, inmovilizado_material: 3301.27, existencias: 568.6, clientes: 66.36, proveedores: 915.36, activos_contrato: null, pasivos_contrato: null, caja: 6057.69, deuda_financiera: 3215.71, arrendamientos: 129.15, patrimonio_neto: 6323.76, minoritarios: 0, reservas: 3638.28 },
  { periodo: '2024', activo_total: 22676.3, activo_corriente: 12705.62, pasivo_corriente: 14845.04, pasivo_total: 14984.72, fondo_comercio: 0, intangibles: 746.12, inmovilizado_material: 4223.73, existencias: 1068.08, clientes: 81.31, proveedores: 1265.33, activos_contrato: null, pasivos_contrato: null, caja: 5652.55, deuda_financiera: 6551.34, arrendamientos: 98.5, patrimonio_neto: 7687.8, minoritarios: 3.78, reservas: 4904.94 },
  { periodo: '2025', activo_total: 26720.73, activo_corriente: 15387.48, pasivo_corriente: 16810.06, pasivo_total: 17296.94, fondo_comercio: 0, intangibles: 1058.36, inmovilizado_material: 6360.24, existencias: 656.96, clientes: 90.93, proveedores: 1289.05, activos_contrato: null, pasivos_contrato: null, caja: 5680.04, deuda_financiera: 6630.23, arrendamientos: 425.38, patrimonio_neto: 9420.96, minoritarios: 2.84, reservas: 6720.14 },
];
const flujos = [
  { periodo: '2020', flujo_operativo: 1340.36, capex: 645.37, pagos_arrendamientos: 0, adquisiciones: 0.07, desinversiones: 0, dividendos: 546.6, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 9.78 },
  { periodo: '2021', flujo_operativo: 2076.84, capex: 609.48, pagos_arrendamientos: 12.21, adquisiciones: 6.12, desinversiones: 0, dividendos: 600.02, recompras: 0, emision_acciones: 1851.26, intereses_en_financiacion: 26.65 },
  { periodo: '2022', flujo_operativo: 2026.11, capex: 792.69, pagos_arrendamientos: 15.85, adquisiciones: 0, desinversiones: 0, dividendos: 600.02, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 3.44 },
  { periodo: '2023', flujo_operativo: 3281.27, capex: 917.72, pagos_arrendamientos: 18.1, adquisiciones: 5.43, desinversiones: 0, dividendos: 800.02, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 11.01 },
  { periodo: '2024', flujo_operativo: 5789.41, capex: 1687.48, pagos_arrendamientos: 19.89, adquisiciones: 0, desinversiones: 0, dividendos: 2000.05, recompras: 0, emision_acciones: 4.06, intereses_en_financiacion: 51.2 },
  { periodo: '2025', flujo_operativo: 6174.24, capex: 2269.16, pagos_arrendamientos: 27.99, adquisiciones: 355.97, desinversiones: 0, dividendos: 2600.06, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 77.94 },
];
const segHist = [ // ingresos del negocio principal por producto (sin otros ingresos)
  ['Bebidas energéticas (Eastroc Super Drink)', 'Línea principal: Eastroc Super Drink (东鹏特饮) en botella PET de 250 y 500 ml y en lata; precio de venta al público de 3-6 CNY.', [['2023', 10336.8], ['2024', 13303.6], ['2025', 15598.99]]],
  ['Bebidas de electrolitos (Sip Water / 补水啦)', 'Bebida de electrolitos lanzada en 2023; 555 ml y 1 l.', [['2023', 1495.0], ['2024', 1495.0 * 0 + 1495.0 > 0 ? 1495.0 : null], ['2025', 3273.92]]],
];
// (los años anteriores de electrolitos y otras se fijan abajo a partir de 2024 publicado: 3.273,9 / (1 + 118,99 %) = 1.495,0)
const segmentos = [
  { nombre: 'Bebidas energéticas', descripcion: 'Eastroc Super Drink (东鹏特饮) en PET de 250/500 ml y lata, más la versión sin azúcar; 3-6 CNY al público.', tipo_resultado: null, historico: [{ periodo: '2023', ingresos: 10336.84, resultado: null }, { periodo: '2024', ingresos: 13303.64, resultado: null }, { periodo: '2025', ingresos: 15598.99, resultado: null }] },
  { nombre: 'Bebidas de electrolitos', descripcion: 'Sip Water (东鹏补水啦), lanzada en 2023; 555 ml y 1 l.', tipo_resultado: null, historico: [{ periodo: '2023', ingresos: 485.88, resultado: null }, { periodo: '2024', ingresos: 1495.0, resultado: null }, { periodo: '2025', ingresos: 3273.92, resultado: null }] },
  { nombre: 'Otras bebidas', descripcion: 'Té (果之茶), café listo para beber (东鹏大咖), agua de coco y otras; en 2026 el té ya se publica aparte.', tipo_resultado: null, historico: [{ periodo: '2023', ingresos: 430.15, resultado: null }, { periodo: '2024', ingresos: 1023.13, resultado: null }, { periodo: '2025', ingresos: 1985.79, resultado: null }] },
  { nombre: 'Otros ingresos', descripcion: 'Ingresos fuera del negocio principal (materiales, alquileres) y conciliación con el total.', tipo_resultado: null, historico: [{ periodo: '2023', ingresos: 9.92, resultado: null }, { periodo: '2024', ingresos: 17.08, resultado: null }, { periodo: '2025', ingresos: 16.57, resultado: null }] },
];

const A = {
  _estado: 'completa',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM sep-26', fecha_fin: '2026-09-30', ingresos: 22627.5, ebitda: 6471.3, ebit: 5856.29, beneficio_neto: 4799.15, bpa: 6.719, dpa: 3.846, dpa_extraordinario: 0, fcf: 4482.1, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [],
    comentario: 'Eastroc creció las ventas de 4.959 M CNY en 2020 a 20.875 M en 2025 (tasa anual del 33 %) sin compras de empresas: todo es orgánico [1, 4]. En 2025 la bebida energética creció un 17,3 % (15.599 M), las de electrolitos un 119,0 % (3.274 M) y otras un 94,1 % [1]. El margen EBIT (sin ingresos financieros) pasó del 20,2 % de 2020 al 24,8 % de 2025 por el apalancamiento operativo, con el margen bruto en el 44-45 % [1, 3, 4]. 2026 va a dos velocidades: el 1S creció un 15,9 % (12.443 M), pero el 3T26 solo un 0,75 % (6.153 M), con las energéticas un 8,6 % por debajo del 3T25 (3.843 M), Sip Water plano (+0,5 %) y el té +145 % (580 M) [17, 18, 5]. El EBIT del 3T26 aún creció un 6,5 % (1.718 M frente a 1.612 M) porque el margen bruto subió 0,5 puntos (45,7 %) y el gasto comercial bajó un 11,4 %; lo que cayó fue lo de debajo: pérdidas de cambio y de valor razonable [17, 20]. En 9M26 las ventas crecen un 10,4 % y el EBIT un 15,6 % [17].',
    ajustes: 'Cifras publicadas (CAS), sin ajustes. Para el EBIT se sacan del resultado de explotación los ingresos financieros netos, los resultados de los productos de tesorería y los cambios de valor razonable (en 2025, 414 M; en 9M26, 203 M), que pasan al resultado financiero; las subvenciones públicas (84 M en 9M26) se quedan en el EBIT porque se repiten cada año [1, 17]. En el 3T26 el resultado financiero fue de −41 M frente a +164 M del 3T25: unos 126 M de pérdidas de cambio (estimación propia: gasto financiero de 49 M menos 23 M de intereses pagados más 100 M de intereses cobrados) por el efectivo en HKD de la salida a bolsa, y −25 M de valor razonable de fondos de capital riesgo frente a +120 M [17, 20]. Los BPA y DPA van en acciones de hoy (÷ 1,3 por cada ampliación liberada de 3 × 10, 2024 y mayo de 2026) [2, 5]. El LTM a sep-26 es 2025 + 9M26 − 9M25; su amortización (615 M) es estimación propia, porque los informes trimestrales no la publican [17]. El beneficio sin extraordinarios (扣非) fue de 3.851 M en 9M26 (+8,8 %) y de 1.253 M en el 3T26 (−1,3 %) [17].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      // (3T24 fuera: se quedan los ocho últimos trimestres)
      { periodo: '4T24', ingresos: 3280.57, crecimiento_pct: 39.3, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.916, vs_consenso: null },
      { periodo: '1T25', ingresos: 4848.07, crecimiento_pct: 39.2, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 1.45, vs_consenso: null },
      { periodo: '2T25', ingresos: 5888.56, crecimiento_pct: 34.1, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 2.063, vs_consenso: null },
      { periodo: '3T25', ingresos: 6107.34, crecimiento_pct: 30.4, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 2.051, vs_consenso: null },
      { periodo: '4T25', ingresos: 4031.31, crecimiento_pct: 22.9, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.968, vs_consenso: null },
      { periodo: '1T26', ingresos: 5888.25, crecimiento_pct: 21.5, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 1.734, vs_consenso: null },
      { periodo: '2T26', ingresos: 6554.79, crecimiento_pct: 11.3, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 2.214, vs_consenso: null },
      { periodo: '3T26', ingresos: 6153.16, crecimiento_pct: 0.75, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 1.756, vs_consenso: 'Inferior' },
    ],
    ultima_presentacion: 'La conferencia del 3T26 no se ha celebrado: la empresa la convocó para el 9-dic-2026 en SSE Roadshow, con preguntas desde el 2-dic [24]; lo que sigue sale del informe y de las notas de los brókeres. El 3T26 quedó por debajo de lo esperado (Sinolink: «业绩低于预期») [21]. Causas que da el informe: tipo de cambio («汇兑损失增加», el gasto financiero de 9M26 sube un 297 %), valor razonable de fondos de capital riesgo y más gasto de administración (+36,8 %) [17]. Los brókeres añaden lluvias y menos calor en julio-agosto en el sur y el centro, consumo débil, más premios en los tapones (中奖比例) y la guerra de precios en electrolitos, donde Nongfu y Genki Forest venden a «1 yuan» [20, 21]. Las neveras de 2026 ya estaban puestas antes del 3T y en septiembre el foco pasó a vaciar inventario y colocar productos nuevos [20]. Distribuidores citados por la prensa culpan a la prisa por los nuevos productos (inventario de 海岛椰) y a menos incentivos del equipo comercial [23]. Lo bueno: anticipos de distribuidores de 5.090 M a 30-sep, un 42,9 % más que un año antes, y 308 distribuidores netos más en 9M26 [17, 18, 21]. En la de septiembre (1S26), la dirección ya atribuía el frenazo del 2T al tiempo y a la competencia, sin dar rotación del canal ni guía para el 2S [11]; el 3T confirmó que no era solo el 2T.',
    confianza: 'Alta',
  },
  balance: {
    historico: balance,
    vencimientos: [{ anio: '2026', importe: 6272.62 }, { anio: '2027', importe: 17.33 }],
    liquidez: 'Caja 14.152 M + productos de tesorería 6.566 M + depósitos a menos de un año 1.802 M + fondos de capital riesgo 553 M a 30-sep-2026 (23.072 M en total) frente a 6.273 M de préstamos a corto (descuento de efectos y préstamos bancarios al 1-2 %) [17].',
    rating: 'Sin rating',
    coste_deuda_pct: 1.5,
    vida_media_anios: 0.5,
    otros_pasivos: 'El pasivo más grande no es deuda: los anticipos de distribuidores (合同负债) suman 5.090 M a 30-sep-2026 (5.974 M a fin de 2025), un 42,9 % más que un año antes: los distribuidores pagan antes de recibir la mercancía y su anticipo del 3T anuncia el pedido de la temporada siguiente [17, 21]. Los «otros acreedores» (1.899 M, +36 %) incluyen bonificaciones comerciales y publicidad por pagar y 175 M de dividendo por pagar [17]. Sin pensiones, litigios ni garantías relevantes a terceros [1]. La retirada de botellas de Sip Water con la imagen de Mbappé (contrato roto el 27-oct) puede traer cambios de producto a cargo de la empresa en el 4T26, sin cifra publicada [23]. Los préstamos a corto (6.273 M) conviven con 23.072 M de tesorería: es arbitraje de tipos, no necesidad de financiación [17].',
    comentario: 'El circulante comercial es negativo (−551 M en 2025: existencias 657 M y clientes 91 M frente a 1.289 M de proveedores) y, con los anticipos de distribuidores, la empresa crece con el dinero de su red [1]. La caja neta de deuda pasó de 751 M en 2020 a unos 8.500 M a fin de 2025 y a 16.400 M a 30-sep-2026 tras la salida a bolsa H (9.927 M cobrados) y después de pagar 3.456 M de dividendos e intereses y 1.039 M de recompra en 9M26 [1, 17]. Los clientes subieron a 174 M (+92 %) con las cadenas y el canal en línea, y las existencias se mantienen en 665 M [17]. La deuda bruta a corto (6.273 M) se toma a tipos del 1-2 % y se coloca la tesorería a más plazo [17].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'La conversión del beneficio en caja es alta y estructural: el flujo operativo fue 1,4 veces el beneficio en 2025 (6.174 M) y 1,7 en 2024, porque los distribuidores pagan por adelantado [1]. En 9M26 fue de 3.542 M (+13,1 %), 0,85 veces el beneficio, por las compras de PET a precio cerrado; el 4T suele subirlo con los anticipos [17]. El capex bajó a 1.429 M en 9M26 (−16 %) al entrar en servicio Zhongshan y Kunming, y en noviembre se compró suelo en Zhengzhou por 98 M [17, 4]. La empresa no separa mantenimiento y crecimiento; con una amortización del 2,7 % de las ventas estimamos (estimación propia) que unos 6 puntos del capex de 2026 son de crecimiento [1, 17]. Los dividendos absorben la mayor parte del flujo libre (2.600 M pagados en 2025) y la política 2026-2028 promete al menos el 80 % del beneficio [1, 14].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'Deloitte Touche Tohmatsu (德勤华永; Deloitte Hong Kong para la H)', anios_auditor: 2, opinion: 'Favorable (sin salvedades) en 2025, también la auditoría del control interno',
    comentario: 'Deloitte audita desde 2024; antes, PwC Zhong Tian (cinco años hasta 2023), cambio habitual en China tras la sanción a PwC por Evergrande, no por un desacuerdo [1, 3]. No hay pagos en acciones ni capitalización de I+D (66 M de I+D a gastos). El reconocimiento de ingresos es al entregar al distribuidor; el riesgo está en las bonificaciones comerciales: se registran como menos ingreso y su saldo por pagar subió un 70 % en el 1T26 [12]. Si el canal se llena para llegar a las cifras, lo veríamos en anticipos de distribuidores que bajan (−14 % entre dic-25 y jun-26, en parte estacional) y bonificaciones que suben: es la señal a vigilar [5, 12]. El beneficio sin extraordinarios es un 5 % menor que el publicado en 2025 y un 9 % menor en el 1S26 por las ganancias de tesorería [1, 5].',
    senales: [
      { senal: 'Ventas a distribuidores −4,9 % en el 3T26 con anticipos +42,9 %', nivel: 'Media', comentario: 'Puede ser un canal que se vacía antes de la temporada nueva o pedidos adelantados con condiciones mejores; distribuidores citados por la prensa hablan de inventario de productos nuevos [17, 21, 23].' },
      { senal: 'Flujo operativo de 9M26 por debajo del beneficio (0,85 veces)', nivel: 'Baja', comentario: 'Compras de materias primas a precio cerrado; en el año completo la conversión suele superar 1,3 veces por los anticipos del 4T [1, 17].' },
      { senal: 'Préstamos a corto de 5.649-6.630 M con 13.000-23.600 M de tesorería', nivel: 'Baja', comentario: 'Arbitraje de tipos habitual en China; no es necesidad de caja, pero infla el balance y la deuda bruta [1, 5].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Política de dividendos 2026-2028: al menos el 80 % del beneficio atribuido, con dividendo anual y a cuenta; la recompra cuenta como dividendo [14, 22]. Dividendos de 2025: 25 CNY por 10 acciones a cuenta (1.300 M) y 25 por 10 final (1.412 M), el 61 % del beneficio; a cuenta de 2026, 30 CNY por 10 acciones (2.181 M, el 76 % del beneficio del 1S26), pagado en septiembre [1, 5, 17]. Recompra de A de 1.000-2.000 M aprobada en abril de 2026 (hasta el 29-abr-2027): 1.038,7 M ejecutados a 134-155 CNY por acción en mayo-junio y nada desde entonces (tampoco en octubre) [16, 19]. Autorización para recomprar hasta el 10 % de las H, sin uso conocido [5, 20]. La salida a bolsa H aportó 9.927 M brutos para capacidad, marca y el sudeste asiático [17, 10].',
    adquisiciones: [],
    comentario: 'La dirección asigna capital con disciplina pero con dos dudas. A favor: crecimiento orgánico sin compras, capex que entra en servicio con rapidez (el inmovilizado se multiplicó por 3,4 entre 2020 y 2025 y las ventas por 4,2) y un reparto creciente de dividendos [1, 4]. En contra: la salida a bolsa H se hizo a 248 HKD (190,8 HKD en acciones de hoy) cuando la empresa ya tenía más de 13.000 M de tesorería, diluyendo un 8,6 % para guardar el dinero; y la recompra de A se ejecutó a 134-155 CNY, entre un 18 % y un 37 % por encima del precio actual de la A [5, 16]. Pagar el 80 % del beneficio con 17.500 M de caja neta es coherente: la caja sobra. No hay compras de empresas en diez años [1].',
    confianza: 'Alta',
  },
  negocio: {
    segmentos,
    geografias: [
      { nombre: 'China, sur (Guangdong, Hainan, HK y Macao)', peso_pct: 29.8 },
      { nombre: 'China, centro (Guangxi, Hunan, Hubei, Jiangxi, Fujian)', peso_pct: 22.1 },
      { nombre: 'China, este (Anhui, Jiangsu, Zhejiang, Shanghái)', peso_pct: 16.1 },
      { nombre: 'China, oeste (Sichuan, Chongqing, Yunnan y otras 7)', peso_pct: 15.3 },
      { nombre: 'China, norte (Shandong, Hebei, Henan, Pekín y otras 6)', peso_pct: 13.1 },
      { nombre: 'Otros (en línea, exterior y restauración)', peso_pct: 3.6 },
    ],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Volumen vendido (toneladas)', valor_anterior: '4.217.000 (2024)', valor_actual: '6.026.702 (2025)', variacion: '+42,9 %', comentario: 'Energéticas +19,2 %, electrolitos +121,9 %, otras +87,4 % [1].' },
      { kpi: 'Ventas de bebidas energéticas', valor_anterior: '13.304 M CNY (2024)', valor_actual: '15.599 M (2025); 12.780 M en 9M26', variacion: '+17,3 %; +1,7 % en 9M26', comentario: '−8,6 % en el 3T26 (3.843 M): primera caída trimestral desde la salida a bolsa [1, 18, 20].' },
      { kpi: 'Ventas de electrolitos (Sip Water)', valor_anterior: '1.495 M (2024)', valor_actual: '3.274 M (2025); 3.032 M en 9M26', variacion: '+119,0 %; +6,5 % en 9M26', comentario: '+0,5 % en el 3T26; guerra de precios y fin del contrato con Mbappé [1, 18, 21].' },
      { kpi: 'Té (果之茶 y otros)', valor_anterior: '579 M (9M25)', valor_actual: '1.638 M (9M26)', variacion: '+183 %', comentario: '580 M en el 3T26 (+145 %): el 8,8 % de las ventas; es lo que sostiene el crecimiento [18].' },
      { kpi: 'Distribuidores', valor_anterior: '3.193 (fin de 2025)', valor_actual: '3.787 (sep-26)', variacion: '+594', comentario: '704 altas y 396 bajas en 9M26, 359 de las altas en «otros» (en línea, exterior y restauración); el saldo inicial que implica (3.479) no casa con el del anual: posible cambio de criterio [1, 18].' },
      { kpi: 'Margen bruto del grupo', valor_anterior: '45,2 % (9M25)', valor_actual: '47,5 % (9M26); 45,7 % en el 3T26', variacion: '+2,3 puntos; +0,5 en el 3T26', comentario: 'PET y azúcar comprados a precio cerrado; la ventaja se estrecha en el 3T [17, 22].' },
    ],
    confianza: 'Alta',
  },
  fuentes: fA,
  huecos: [
    { seccion: 'trimestres', campo: 'ebitda y vs_consenso', tipo: 'Complemento', intentos: '1) Informes trimestrales CAS: no publican amortización trimestral; 2) folleto H: solo 9M25; 3) MarketScreener y prensa: sin consenso previo por trimestre', decision: 'Omitido' },
    { seccion: 'trimestres', campo: 'conferencia del 3T26', tipo: 'Complemento', intentos: '1) CNINFO, actas de reuniones con inversores (relation) oct-nov 2026: ninguna publicada; 2) SSE Roadshow: la conferencia del 3T26 está convocada para el 9-dic-2026, después del corte [24]; 3) notas de seis brókeres posteriores al 3T26 y prensa con declaraciones de distribuidores: usadas en su lugar [20-23]', decision: 'Omitido' },
    { seccion: 'capital', campo: 'adquisiciones', tipo: 'Complemento', intentos: '1) Informe anual 2025, nota de combinaciones de negocios: «no aplica»; 2) folleto H, historia: sin compras de negocios; 3) anuncios de SSE 2016-2026: solo compra de una sociedad tenedora de suelo en 2025', decision: 'Omitido' },
  ],
};
guarda('A', A);

// ================================================================ B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Global Offering, «Industry Overview» (Frost & Sullivan): mercado chino de bebidas funcionales y energéticas 2019-2029e, cuotas por volumen y por venta al público, precios de materias primas', editor: 'Eastroc Beverage (HKEXnews)', tipo: 'Primaria', fecha: '2026-01-26', url: `${HK}/2026/0126/2026012600003.pdf` },
  { id: 2, titulo: '2025年年度报告 (informe anual 2025): sector, regulación, productos, plantas y empleados', editor: 'Eastroc Beverage (CNINFO/SSE)', tipo: 'Primaria', fecha: '2026-03-31', url: `${CN}/2026-03-31/1225063447.PDF` },
  { id: 3, titulo: 'Red Bull challenger: AI flap, Citi cuts (cuotas NielsenIQ 2025: 51,6 % en volumen y 38,3 % en valor; Monster China +95 % en el 1T26)', editor: 'Bamboo Works (en Longbridge/Benzinga)', tipo: 'Prensa', fecha: '2026-07-16', url: 'https://longbridge.com/news/292928486' },
  { id: 4, titulo: 'Monster Beverage, Celsius, Nongfu Spring, Tingyi, Uni-President China, China Resources Beverage, Carabao, Osotspa y Coca-Cola: cuentas anuales y últimos 12 meses (ficha de Yahoo Finance)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-11-27', url: 'https://finance.yahoo.com' },
  { id: 9, titulo: '2026年前三季度主要经营数据的公告 (ventas de 9M26 por producto y región)', editor: 'Eastroc Beverage (CNINFO/SSE)', tipo: 'Primaria', fecha: '2026-10-30', url: `${CN}/2026-10-30/1225640897.PDF` },
  { id: 10, titulo: '电解质水分化加剧：外星人奔跑，补水啦们冷淡丨消费参考 y «28个品牌挤进电解质水行列» (competencia en electrolitos, nov-2026)', editor: 'Prensa económica china (vía Eastmoney)', tipo: 'Prensa', fecha: '2026-11-25', url: 'https://guba.eastmoney.com/list,hk09980.html' },
  { id: 5, titulo: '关于2026年半年度业绩说明会情况的公告 (conferencia del 1S26: competencia, electrolitos, sur de China)', editor: 'Eastroc Beverage (CNINFO/SSE)', tipo: 'Primaria', fecha: '2026-09-18', url: `${CN}/2026-09-18/1225570801.PDF` },
  { id: 6, titulo: '2026年半年度主要经营数据的公告 (ventas del 1S26 por producto, con el té aparte)', editor: 'Eastroc Beverage (CNINFO/SSE)', tipo: 'Primaria', fecha: '2026-07-31', url: `${CN}/2026-07-31/1225449598.PDF` },
  { id: 7, titulo: '饮料“旺季不旺”：无糖茶独涨 行业逻辑生变 (temporada alta floja en bebidas; solo crece el té sin azúcar)', editor: 'Prensa económica china (vía Eastmoney)', tipo: 'Prensa', fecha: '2026-10-17', url: 'https://guba.eastmoney.com/list,hk09980.html' },
  { id: 8, titulo: '2025 Sustainability Report (informe de sostenibilidad 2025)', editor: 'Eastroc Beverage (HKEXnews)', tipo: 'Primaria', fecha: '2026-03-30', url: `${HK}/2026/0330/2026033003394.pdf` },
];
const compe = comps.empresas.filter((e) => e.ticker !== 'KDP');
const B = {
  _estado: 'completa',
  negocio: {
    descripcion: 'Eastroc fabrica y vende bebidas funcionales en China. Su producto central es Eastroc Super Drink (东鹏特饮), una bebida energética con taurina y cafeína en botella PET de 250 y 500 ml a 3-6 CNY, dirigida a conductores, obreros, repartidores y estudiantes; supuso el 74,8 % de las ventas en 2025 [2]. Desde 2023 vende Sip Water (补水啦), bebida de electrolitos (15,7 %), y una cartera de té (果之茶), café listo para beber (东鹏大咖), agua de coco y otras (9,5 %) [2]. Vende a través de unos 3.200 distribuidores exclusivos que llegan a más de 4 millones de puntos de venta (tiendas de barrio, gasolineras, comedores de fábrica), con neveras propias y códigos QR en cada botella que le dan datos del punto de venta [1, 2]. Tiene 13 bases de producción en China y empieza en el sudeste asiático (Vietnam, Malasia, Indonesia) [2, 5].',
    como_gana_dinero: 'Margen bruto del 45 % (51 % en energéticas, 35 % en electrolitos, 16 % en otras) sobre una botella barata: el 80 % del coste son materias primas, sobre todo PET (polietileno), azúcar y cartón, y el 7 % es transporte [2]. El beneficio depende de tres cosas: el precio del PET y el azúcar (bajaron en 2024-2025 y subieron el margen energético 2,5 puntos), la mezcla (cada punto de peso que gana el té o el café resta margen) y el volumen por fábrica, porque las plantas regionales recortan el flete [2]. Los gastos comerciales (16,3 % de las ventas) son sobre todo neveras, promoción en el punto de venta y patrocinios [2]. No hay ingresos recurrentes por contrato, pero sí recompra diaria: es un consumo de impulso. La estacionalidad es fuerte: el 2T y el 3T suman el 58 % de las ventas del año [1 de A].',
    clientes: 'No depende de ningún cliente: los cinco primeros distribuidores sumaron un 5-6 % de las ventas y ninguno pasa del 2 % [2]. Los distribuidores son exclusivos por zona, pagan por adelantado (anticipos de 5.974 M a fin de 2025, el 29 % de las ventas) y su número se mantiene en unos 3.200 [2]. El poder de precios es limitado: el precio de Eastroc Super Drink en 500 ml lleva años en 5 CNY y la estrategia es vender barato frente a Red Bull (6-7 CNY por 250 ml) [1, 3]. La empresa sí ha subido el precio por litro con formatos (Sip Water de 555 ml) y en 2026 se habla de subidas en el sector [5, 7]. En electrolitos la competencia (segunda unidad a mitad de precio) le obliga a promocionar [5].',
    confianza: 'Media',
  },
  sector: {
    definicion: 'El mercado relevante es el de bebidas funcionales en China (energéticas, de electrolitos y deportivas) a precio de venta al público, según Frost & Sullivan en el folleto H [1]: 166.500 M CNY en 2024, de los que 111.400 M son energéticas. Usamos este y no el de refrescos (1,25 billones) porque es donde compite el 90 % de las ventas de Eastroc. Contrastamos con NielsenIQ (cuota en energéticas del 51,6 % en volumen y 38,3 % en valor en 2025) [3]. Ojo con la base: las cifras de mercado son a precio de venta al público, y las ventas de Eastroc a precio de fábrica (≈ 40 % del precio de venta, estimación propia: 15.839 M de ventas de 2024 frente a una cuota del 23,0 % de 166.500 M) [1].',
    tamano: '≈ 166.500 M CNY de venta al público en 2024 (bebidas funcionales en China; energéticas 111.400 M) [1]',
    unidad_serie: 'millones de CNY (venta al público, bebidas funcionales en China)',
    serie: [
      { anio: '2019', tamano: 111900 }, { anio: '2024', tamano: 166500 }, { anio: '2029e', tamano: 281000 },
    ],
    tcac_historico_pct: 8.3,
    tcac_previsto_pct: 10.9,
    cr5_pct: 70.8,
    estructura: 'Concentrada',
    drivers: [
      { driver: 'Consumo per cápita de energéticas bajo', efecto: '+', horizonte: 'Estructural', evidencia: '5,3 litros por habitante en China en 2024 frente a 17,1 en EE. UU. y 9,4 en Tailandia; previsión de 8,4 litros en 2029 [1].' },
      { driver: 'Hábitos de salud y menos azúcar', efecto: '−', horizonte: 'Estructural', evidencia: 'El té sin azúcar es lo único que crece en el verano de 2026 [7]; Eastroc lanzó versiones sin azúcar, aún pequeñas [2].' },
      { driver: 'Precio del PET y del azúcar', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'El PET cayó un 2,1 % anual de 2019 a 2024 y el margen energético subió 2,5 puntos en 2025 [1, 2].' },
      { driver: 'Competencia en electrolitos', efecto: '−', horizonte: 'Cíclico', evidencia: 'Más de 100 marcas, promociones de «1 yuan» de Nongfu y Genki Forest: Sip Water pasó de +119 % en 2025 a +0,5 % en el 3T26 [5, 9, 10].' },
      { driver: 'Tiempo en verano', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Lluvias y menos calor en julio-agosto en el sur y el centro: energéticas −8,6 % en el 3T26, sur −2,6 % y centro −8,1 % [9, A20].' },
      { driver: 'Repartidores y trabajo manual', efecto: '+', horizonte: 'Estructural', evidencia: 'Los consumidores de base (conductores, mensajeros, obreros) crecen con el comercio electrónico y la entrega a domicilio [1].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 4, justificacion: 'Red Bull (dos grupos), Monster (+95 % en China en el 1T26), Carabao y marcas locales; en electrolitos, guerra de precios [3, 5].' },
      { fuerza: 'Poder de los clientes', intensidad: 2, justificacion: 'Venta atomizada a millones de tiendas a través de distribuidores exclusivos que pagan por adelantado [2].' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'PET, azúcar y cartón son materias primas con muchos proveedores; el riesgo es de precio, no de poder [1].' },
      { fuerza: 'Amenaza de entrada', intensidad: 3, justificacion: 'Fabricar es fácil; la barrera es la red de 4 millones de puntos con neveras y la marca. Monster y Nongfu entran con fuerza [3].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'Café, té listo para beber y bebidas sin azúcar compiten por la misma ocasión de consumo [7].' },
    ],
    ciclo: { posicion: 'Madurez del ciclo', comentario: 'Tras crecer al 8 % anual de 2019 a 2024, el verano de 2026 fue de «temporada alta floja»: solo creció el té sin azúcar [1, 7]. Las bebidas de bajo precio aguantaron en 2020 y 2022 (Eastroc creció en ambos años un 17-22 %) porque su consumidor no deja el producto en las crisis, pero el canal de tiendas sufre con la caída del consumo [2]. El índice chino de alimentación y bebidas bajó un 20 % en el 1S26 [3]. Lo que vemos (frenazo del núcleo en el 2T26 y guerra de precios) es más competencia que ciclo.' },
    regulacion: 'Las bebidas energéticas con taurina y cafeína tienen límites de dosis en la norma GB y parte de la gama de Eastroc está registrada como alimento saludable (保健食品), con aprobación de la administración del mercado (SAMR) [2]. No hay impuesto sobre el azúcar en China, pero las autoridades promueven el «menos azúcar» y el etiquetado nutricional obligatorio se endurece desde 2025-2027 [2]. Un impuesto al azúcar o restricciones de venta a menores, como en el Reino Unido, serían el riesgo regulatorio mayor (estimación propia: el 75 % de las ventas lleva azúcar).',
    tendencias: 'Tres tendencias: (1) bebidas sin azúcar y «saludables», donde Eastroc llega tarde; (2) concentración del canal de tiendas en cadenas y venta instantánea en línea (Meituan), que reduce el valor de la red propia de neveras; y (3) internacionalización al sudeste asiático, donde el consumo per cápita es el doble [1, 5, 7]. Eastroc gana con la tercera (fábrica en Indonesia y equipos en Vietnam y Malasia) y pierde con las dos primeras. La digitalización (códigos QR en cada botella, 270 millones de usuarios) le da datos de venta en tiempo real que los competidores no tienen [2].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 23.0,
    posicion: '1.º en volumen y 2.º en valor en bebidas funcionales en China (26,3 % y 23,0 % en 2024); en energéticas, 40,1 % del volumen y 31,4 % del valor, 2.º tras Red Bull (Frost & Sullivan) [1]. NielsenIQ: 51,6 % del volumen y 38,3 % del valor de energéticas en 2025 [3].',
    competidores: [
      { nombre: 'Red Bull China (Reignwood / TCP, privadas)', pais: 'CN/TH', ticker: null, ingresos: null, cuota_pct: 36.9, margen_ebit_pct: null, comentario: '«Compañía A» del folleto: 36,9 % del valor de energéticas en 2024, ventas planas (−0,4 % anual 2022-2024); disputa de marca entre Reignwood y TCP [1].' },
      { nombre: 'Monster Beverage', pais: 'US', ticker: 'MNST', ingresos: compe[0]._ventas_ltm_m, cuota_pct: null, margen_ebit_pct: compe[0]._ebit_ltm_margen, comentario: 'Ventas en China +95 % en el 1T26 con Predator, su marca barata [3, 4].' },
      { nombre: 'Nongfu Spring', pais: 'CN', ticker: '9633.HK', ingresos: compe[2]._ventas_ltm_m, cuota_pct: null, margen_ebit_pct: compe[2]._ebit_ltm_margen, comentario: 'Scream (尖叫) y bebidas funcionales; distribución nacional de agua y té [4].' },
      { nombre: 'Carabao Group', pais: 'TH', ticker: 'CBG.BK', ingresos: compe[6]._ventas_ltm_m, cuota_pct: 7.7, margen_ebit_pct: compe[6]._ebit_ltm_margen, comentario: '«Compañía E» del folleto: 7,7 % del valor de energéticas en China [1, 4].' },
      { nombre: 'Tingyi (Master Kong)', pais: 'CN', ticker: '0322.HK', ingresos: compe[3]._ventas_ltm_m, cuota_pct: null, margen_ebit_pct: compe[3]._ebit_ltm_margen, comentario: 'Bebidas y fideos; distribuidor de Pepsi en China [4].' },
      { nombre: 'China Resources Beverage', pais: 'CN', ticker: '2460.HK', ingresos: compe[5]._ventas_ltm_m, cuota_pct: null, margen_ebit_pct: compe[5]._ebit_ltm_margen, comentario: 'Agua C\'estbon y bebidas funcionales (至本清润); ventas en caída [4].' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'Los datos de los códigos QR mejoran con la escala, pero el consumidor no gana nada porque otros beban la misma marca [2].' },
        { fuente: 'Costes de cambio', puntuacion: 1, evidencia: 'Cambiar de bebida cuesta cero al consumidor; para el tendero, la nevera es de Eastroc [2].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'Marca de referencia en el segmento barato: 51,6 % del volumen de energéticas en 2025 [3]; registros de alimento saludable [2].' },
        { fuente: 'Ventaja en costes', puntuacion: 4, evidencia: 'Margen EBIT del 24,8 % vendiendo a la mitad del precio de Red Bull; 13 fábricas regionales y botella PET [2, 3].' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'Red de 3.200 distribuidores exclusivos y más de 4 millones de puntos con neveras: difícil de copiar deprisa [1, 2].' },
      ],
    },
    amenazas: 'Tres amenazas con probabilidad media: Monster con una marca barata (Predator) y la red de Coca-Cola en China, que ataca justo el segmento de 3-5 CNY [3]; la guerra de precios en electrolitos, que ya frenó Sip Water del +119 % al +12 % [5]; y el cambio de gusto hacia lo sin azúcar [7]. El riesgo es un margen que vuelva del 25 % al 20 % (el de 2021) si hay que subir la promoción, no la pérdida del canal.',
    confianza: 'Media',
  },
  historia: {
    resumen: 'Eastroc nació en 1994 como una embotelladora municipal de Shenzhen. En 2003 la compró Lin Muqin, entonces directivo, con un grupo de socios, la reestructuró y en 2009 lanzó Eastroc Super Drink en botella PET a mitad de precio que Red Bull [2, 1]. El crecimiento se aceleró a partir de 2016 con la expansión fuera de Guangdong y la red de neveras. Salió a bolsa en Shanghái en mayo de 2021 (400 millones de acciones a 46,27 CNY) [2]. En 2023 lanzó Sip Water y en 2024-2025 una cartera de té y café. En febrero de 2026 salió a bolsa en Hong Kong (248 HKD, 10.141 M HKD brutos), con 16 inversores ancla, para financiar la expansión al sudeste asiático [1].',
    hitos: [
      { anio: '1994', hito: 'Fundación de la embotelladora en Shenzhen.' },
      { anio: '2003', hito: 'Lin Muqin y socios compran la empresa; reestructuración.' },
      { anio: '2009', hito: 'Lanzamiento de Eastroc Super Drink en PET de 500 ml.' },
      { anio: '2021', hito: 'Salida a bolsa en Shanghái (605499).' },
      { anio: '2023', hito: 'Lanzamiento de Sip Water (electrolitos).' },
      { anio: '2024', hito: 'Ventas de 15.839 M (+40,6 %) y ampliación liberada de 3 × 10.' },
      { anio: '2026', hito: 'Salida a bolsa H en Hong Kong (3-feb), ampliación liberada 3 × 10 (mayo), recompra de 1.039 M y frenazo del núcleo en el 2T.' },
    ],
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Lo material son el azúcar y la salud del consumidor (la mayoría de la gama lleva azúcar y cafeína), el plástico (PET de un solo uso: unas 6 millones de toneladas de bebida al año) y la seguridad alimentaria [8]. La empresa publica informe de sostenibilidad desde 2023 y uno conforme a HKEX en 2025, con datos de emisiones y uso de PET reciclado en parte de la gama [8]. No hay impuestos al carbono o al plástico que hoy afecten a las cifras; un impuesto al azúcar sí lo haría.',
    controversias: 'En junio de 2026 circuló un vídeo manipulado con IA en el que el presidente rechazaba su propia bebida; la policía identificó al autor y la empresa no tuvo responsabilidad, pero la acción perdió unos 7.000 M CNY de valor en cuatro sesiones [3]. No constan sanciones de reguladores en los últimos tres años [2].',
    confianza: 'Baja',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) Informe de sostenibilidad 2025: no cita calificaciones externas; 2) búsqueda de MSCI y Sustainalytics para 605499 y 9980: sin página pública; 3) prensa: sin cifras', decision: 'Omitido' },
    { seccion: 'competencia', campo: 'ingresos y margen de Red Bull China', tipo: 'Complemento', intentos: '1) Folleto H: competidores anónimos; 2) TCP y Reignwood no publican cuentas de China; 3) prensa: sin cifras fiables', decision: 'Omitido' },
  ],
};
guarda('B', B);

// ================================================================ C. Equipo y gobierno
const fC = [
  { id: 1, titulo: '2025年年度报告 (informe anual 2025): consejo, directivos, remuneración, participaciones y compromisos de bloqueo', editor: 'Eastroc Beverage (CNINFO/SSE)', tipo: 'Primaria', fecha: '2026-03-31', url: `${CN}/2026-03-31/1225063447.PDF` },
  { id: 2, titulo: '关于董事会完成换届选举及聘任高级管理人员的公告 (cuarto consejo, comisiones y directivos, 9-oct-2026)', editor: 'Eastroc Beverage (CNINFO/SSE)', tipo: 'Primaria', fecha: '2026-10-10', url: `${CN}/2026-10-10/1225600168.PDF` },
  { id: 3, titulo: '2026年半年度报告 (informe semestral 2026): accionistas a 30-jun-2026 y salida a bolsa H', editor: 'Eastroc Beverage (CNINFO/SSE)', tipo: 'Primaria', fecha: '2026-07-31', url: `${CN}/2026-07-31/1225449594.PDF` },
  { id: 4, titulo: '关于控股股东增持公司H股股份计划的公告 (plan del accionista de control para comprar H por 100-200 M HKD)', editor: 'Eastroc Beverage (CNINFO/SSE)', tipo: 'Primaria', fecha: '2026-05-30', url: `${CN}/2026-05-30/1225340350.PDF` },
  { id: 5, titulo: '2025年年度股东会决议公告 (votaciones de la junta de 2025, con el voto de los accionistas de menos del 5 %)', editor: 'Eastroc Beverage (CNINFO/SSE)', tipo: 'Primaria', fecha: '2026-04-30', url: `${CN}/2026-04-30/1225261865.PDF` },
  { id: 6, titulo: 'Poll results of the 2026 third EGM and changes in composition of board committees', editor: 'Eastroc Beverage (HKEXnews)', tipo: 'Primaria', fecha: '2026-10-09', url: `${HK}/2026/1009/2026100901141.pdf` },
  { id: 7, titulo: 'Announcement of final offer price and allotment results (inversores ancla y bloqueos de la salida a bolsa H)', editor: 'Eastroc Beverage (HKEXnews)', tipo: 'Primaria', fecha: '2026-02-02', url: `${HK}/2026/0202/2026020203212.pdf` },
  { id: 8, titulo: 'Búsqueda de anuncios de SSE/CNINFO por «减持» (ventas) e «增持» (compras), jun-2025 a oct-2026', editor: 'CNINFO', tipo: 'Primaria', fecha: '2026-10-19', url: 'http://www.cninfo.com.cn/new/disclosure/stock?stockCode=605499' },
  { id: 9, titulo: '2023年年度报告 (informe anual 2023): auditor PwC y crecimiento', editor: 'Eastroc Beverage (CNINFO/SSE)', tipo: 'Primaria', fecha: '2024-04-15', url: `${CN}/2024-04-15/1219612087.PDF` },
  { id: 10, titulo: 'Global Offering: directores, historia, contratos de servicio y remuneración 2022-2024', editor: 'Eastroc Beverage (HKEXnews)', tipo: 'Primaria', fecha: '2026-01-26', url: `${HK}/2026/0126/2026012600003.pdf` },
];
const C = {
  _estado: 'completa',
  directivos: {
    equipo: [
      { nombre: 'Lin Muqin (林木勤)', cargo: 'Presidente y consejero delegado (总裁)', desde: '2003', participacion_pct: 46.25, trayectoria: 'Fundador de hecho: entró en 1997, compró la empresa en 2003 y lanzó Eastroc Super Drink en 2009. Con él las ventas pasaron de unos 300 M a 20.875 M CNY (2025) con márgenes crecientes [1, 2].' },
      { nombre: 'Lin Mugang (林木港)', cargo: 'Consejero y presidente ejecutivo adjunto (执行总裁)', desde: '2003', participacion_pct: 4.85, trayectoria: 'Hermano del presidente; dirige ventas y marketing desde 2001. Responsable de la red de distribuidores [1, 2].' },
      { nombre: 'Peng Dexin (彭得新)', cargo: 'Director financiero', desde: '2021', participacion_pct: 0.52, trayectoria: 'En la empresa desde 2003 (jefe de finanzas y director financiero adjunto); director financiero desde octubre de 2021 [1, 2].' },
      { nombre: 'Lu Yifu (卢义富)', cargo: 'Consejero y vicepresidente, ventas nacionales', desde: '2018', participacion_pct: 0.09, trayectoria: 'Once años en JDB (加多宝) como director regional y uno en Xiangpiaopiao; llegó en 2018 [2].' },
      { nombre: 'Jiang Weiwei (蒋薇薇)', cargo: 'Consejera y vicepresidenta, marca', desde: '2017', participacion_pct: 0.09, trayectoria: 'Viene de la publicidad (Charm Media); dirige la marca y los patrocinios deportivos [2].' },
      { nombre: 'Hu Yajun (胡亚军)', cargo: 'Consejero ejecutivo, director del área internacional', desde: '2016', participacion_pct: null, trayectoria: 'Antes en Swire Coca-Cola y Pepsi China; dirige el sudeste asiático, la apuesta de crecimiento con los fondos de la H [2].' },
    ],
    historial_guidance: [],
    comentario: 'Equipo estable y de la casa: el presidente lleva 23 años al frente y su hermano 25; el director financiero, 23 en la empresa [1, 2]. La renovación del consejo de octubre de 2026 (anticipada cuatro meses) metió a dos ejecutivos comerciales (Hu Yajun y Yu Bin) y sacó a un consejero ejecutivo (Zhang Lei) y a una independiente [2]. No hay plan de sucesión publicado para un presidente de 62 años que concentra la marca, la estrategia y el 46 % del capital: es el riesgo de persona clave. La empresa no da guía anual, así que no se puede medir su cumplimiento; en la salida a bolsa de 2021 y en la H prometió crecer y lo hizo hasta 2025 [1, 10].',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Lin Muqin', cargo: 'Presidente y consejero delegado', tipo: 'Ejecutivo', desde: '2018', comisiones: 'Estrategia y sostenibilidad (presidente), nombramientos, retribuciones' },
      { nombre: 'Lin Mugang', cargo: 'Consejero, presidente ejecutivo adjunto', tipo: 'Ejecutivo', desde: '2018', comisiones: 'Estrategia' },
      { nombre: 'Jiang Weiwei', cargo: 'Consejera, vicepresidenta', tipo: 'Ejecutivo', desde: '2024', comisiones: 'Estrategia' },
      { nombre: 'Lu Yifu', cargo: 'Consejero, vicepresidente', tipo: 'Ejecutivo', desde: '2024', comisiones: 'Estrategia' },
      { nombre: 'Hu Yajun', cargo: 'Consejero, director internacional', tipo: 'Ejecutivo', desde: '2026', comisiones: '—' },
      { nombre: 'Yu Bin', cargo: 'Consejero, director de personas', tipo: 'Ejecutivo', desde: '2026', comisiones: '—' },
      { nombre: 'Lin Daiji', cargo: 'Consejero representante de los trabajadores (financiación)', tipo: 'Ejecutivo', desde: '2024', comisiones: '—' },
      { nombre: 'Tai Kwok Leung Alexander (戴国良)', cargo: 'Consejero independiente', tipo: 'Independiente', desde: '2025', comisiones: 'Auditoría (presidente)' },
      { nombre: 'Zhao Yali', cargo: 'Consejera independiente', tipo: 'Independiente', desde: '2024', comisiones: 'Auditoría, nombramientos, estrategia' },
      { nombre: 'Li Hongbin', cargo: 'Consejero independiente', tipo: 'Independiente', desde: '2024', comisiones: 'Auditoría, retribuciones' },
      { nombre: 'Zhang Ya', cargo: 'Consejero independiente', tipo: 'Independiente', desde: '2026', comisiones: 'Nombramientos (presidente), retribuciones (presidente)' },
    ],
    presidente_ceo_separados: false, presidente_ejecutivo: true, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: false, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: true, presidente_vinculado_control: true, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 99.99, voto_remuneracion_contra_pct: 0.01, voto_remuneracion_contra_libre_pct: 0.02, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 5.32, fijo: null, variable_corto: null, variable_largo: 0, ratio_salario_medio: 30 },
    remuneracion: 'El presidente cobró 5,32 M CNY en 2025 (antes de impuestos) y los cuatro ejecutivos siguientes entre 3,3 y 4,4 M [1]. El informe no separa fijo y variable; el variable anual se fija con la evaluación de ventas y beneficio de la comisión de retribuciones, sin métricas de rentabilidad sobre el capital ni de flujo de caja [1]. No hay planes de acciones ni opciones desde la salida a bolsa (la recompra de 2026 podría destinarse a uno) [1, 3]. La política de 2026 se aprobó con el 99,99 % a favor y un 0,02 % en contra entre los accionistas de menos del 5 % [5]. Con un 46 % del capital, el incentivo del presidente es el dividendo, no el sueldo: cobró unos 1.200 M CNY de dividendos en 2025 (estimación propia: 258,7 M de acciones × 4,7 CNY por acción antiguos).',
    accionistas: [
      { nombre: 'Lin Muqin (presidente)', pct: 45.8, tipo: 'Control (persona física)', variacion: '336,25 M A (45,80 % de las acciones emitidas; 46,25 % sin autocartera) y 603.200 H; sin ventas; compró 159.300 H por 14,99 M HKD el 23-25-nov-2026 [A17, D17].' },
      { nombre: 'Lin Mugang (hermano, consejero)', pct: 4.85, tipo: 'Familia (acción concertada)', variacion: 'Sin cambios (solo la ampliación liberada) [3].' },
      { nombre: 'Lin Daiqin (sobrino)', pct: 4.85, tipo: 'Familia', variacion: 'Sin cambios [3].' },
      { nombre: 'Ruichang Kunpeng (sociedad de los directivos; socio: el hijo del presidente)', pct: 4.71, tipo: 'Directivos y familia', variacion: 'Sin cambios [3].' },
      { nombre: 'HKSCC Nominees (titular de las H)', pct: 7.92, tipo: 'Custodio de las H (inversores ancla y otros)', variacion: 'Temasek vendió 180.141 H el 27-oct (queda con el 5,95 % de las H) y BlackRock redujo su posición (avisos del 10 y 20-nov) [A17, D17].' },
      { nombre: 'Hong Kong Securities Clearing (Stock Connect hacia la A)', pct: 1.84, tipo: 'Inversores extranjeros en la A', variacion: 'De 3,67 % a 1,84 % entre junio y septiembre [3, A17].' },
      { nombre: 'Cai Yunsheng', pct: 1.78, tipo: 'Socio histórico', variacion: 'Sin cambios [3].' },
      { nombre: 'Autocartera (recompra de A)', pct: 0.97, tipo: 'Autocartera', variacion: '7.122.551 A compradas en mayo-junio de 2026 [3].' },
    ],
    insiders: [
      { fecha: '2026-05-29', persona: 'Lin Muqin (presidente)', operacion: 'Compra', acciones: 49800, importe: 5.51 },
      { fecha: '2026-06-30', persona: 'Lin Muqin (presidente), compras acumuladas de H hasta jun-26', operacion: 'Compra', acciones: 131000, importe: null },
      { fecha: '2026-11-25', persona: 'Lin Muqin (presidente), compras de H del 23 al 25-nov', operacion: 'Compra', acciones: 159300, importe: 12.74 },
    ],
    control_y_defensas: 'Lin Muqin controla la empresa con el 46,25 % de los votos (sin autocartera) y, con su hermano, su cuñado y la sociedad de la que es socio su hijo, el 57 % [3, 4]. Una acción, un voto, sin blindajes, pero ninguna junta puede ir contra él. El consejo de 11 tiene 7 ejecutivos (tres de la familia Lin: el presidente, su hermano y un consejero apellidado Lin) y 4 independientes, justo el tercio legal [2]. Las comisiones de auditoría, nombramientos y retribuciones están presididas por independientes [2]. No hay operaciones vinculadas relevantes publicadas. La A y la H votan juntas; la H tiene un 8 % del capital y su precio cotiza con un 27 % de descuento sobre la A [6].',
    alertas: [
      'Concentración del poder en el presidente (62 años): presidente y consejero delegado a la vez, 46 % del capital y sin plan de sucesión publicado [1, 2].',
      'Consejo con mayoría ejecutiva (7 de 11) y familiar; la renovación de octubre de 2026 se adelantó cuatro meses [2].',
      'Inversores ancla de la H (49 % de las H) sin bloqueo desde el 3-ago-2026; Temasek vendió H el 27-oct [7, D17].',
      'Cambio de secretario conjunto y representante autorizado ante HKEX (Zhang Lei sale, entra Zhang Chen, 23-nov-2026) [A24].',
    ],
    confianza: 'Media',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'directivos', campo: 'historial_guidance', tipo: 'Complemento', intentos: '1) Informes anuales 2021-2025: sin guía anual cuantificada; 2) conferencias de 2025 y 2026: «no damos objetivos»; 3) folleto H: sin plan a medio plazo con cifras', decision: 'Omitido' },
    { seccion: 'gobierno', campo: 'remuneracion_ceo.fijo y variable', tipo: 'Complemento', intentos: '1) Informe anual 2025 (CAS): solo el total; 2) informe anual H 2025: total por consejero; 3) folleto H: tabla 2022-2024 sin desglose de 2025', decision: 'Omitido' },
  ],
};
guarda('C', C);

// ================================================================ D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de 9980.HK, 605499.SS, 510300.SS (CSI 300), 515170.SS (alimentación y bebidas), 2800.HK, 3067.HK y HKDCNY=X (bolsa.mjs y movimiento.mjs)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-11-27', url: 'https://finance.yahoo.com/quote/9980.HK/history' },
  { id: 2, titulo: 'Notas de brókeres tras el 3T26 con BPA 2026e-2028e: Soochow, Sinolink (30-oct), Wanlian (1-nov), Guosen (2-nov), Kaiyuan (3-nov) y Hualong (6-nov)', editor: 'Eastmoney (reportapi, 研报中心)', tipo: 'Analistas', fecha: '2026-11-06', url: 'https://data.eastmoney.com/report/stock.jshtml?code=605499' },
  { id: 3, titulo: 'Eastroc Beverage 9980.HK y 605499.SS: objetivos de los analistas (H: 114,88 HKD de media, 89,72-151,64, 12 analistas; A: 133,88 CNY, 95-212,31, 15), recomendaciones y tendencia del BPA (earningsTrend)', editor: 'Yahoo Finance (quoteSummary)', tipo: 'Analistas', fecha: '2026-11-27', url: 'https://finance.yahoo.com/quote/9980.HK/analysis' },
  { id: 4, titulo: 'Curva de la deuda pública china (中债国债收益率曲线), 10 años a 26-nov-2026: 1,5912 % (POST a czbChartSearch)', editor: 'ChinaBond (中央国债登记结算)', tipo: 'Datos de mercado', fecha: '2026-11-26', url: 'https://yield.chinabond.com.cn/' },
  { id: 5, titulo: 'Implied ERP by month (ERPbymonth.xlsx), noviembre de 2026: 4,41 % (T12m with sustainable payout)', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-11', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 6, titulo: 'Ficha de comparables (capitalización, valor empresa, ventas, EBITDA, PER adelantado, previsión de ventas, flujo libre) de diez empresas de bebidas', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-11-27', url: 'https://finance.yahoo.com' },
  { id: 7, titulo: 'Celsius Holdings to Acquire Alani Nu (1.800 M USD; 1.650 M netos de activos fiscales; menos de 3 veces las ventas de 2024 y unas 12 veces el EBITDA con sinergias)', editor: 'Celsius Holdings', tipo: 'Primaria', fecha: '2025-02-20', url: 'https://s203.q4cdn.com/427437840/files/doc_news/Celsius-Holdings-to-Acquire-Alani-Nu-Creating-a-Leading-Better-For-You-Functional-Lifestyle-Platform-2025.pdf' },
  { id: 8, titulo: 'Poll results of the 2026 third EGM (acciones: 734.199.310 emitidas, 727.076.759 con voto)', editor: 'Eastroc Beverage (HKEXnews)', tipo: 'Primaria', fecha: '2026-10-09', url: `${HK}/2026/1009/2026100901141.pdf` },
  { id: 9, titulo: '2026年第三季度报告 (balance a 30-sep-2026 para el puente)', editor: 'Eastroc Beverage (CNINFO/SSE)', tipo: 'Primaria', fecha: '2026-10-30', url: `${CN}/2026-10-30/1225640886.PDF` },
  { id: 10, titulo: '关于召开2026年第三季度业绩说明会的公告 (conferencia del 3T26 el 9-dic-2026)', editor: 'Eastroc Beverage (CNINFO/SSE)', tipo: 'Primaria', fecha: '2026-11-24', url: `${CN}/2026-11-24/1225684098.PDF` },
  { id: 11, titulo: 'Red Bull challenger: AI flap, Citi cuts (Citi rebaja el BPA de 2026-2027 un 10-15 % y el objetivo de la H de 310,80 a 161,70 HKD)', editor: 'Bamboo Works (en Longbridge/Benzinga)', tipo: 'Prensa', fecha: '2026-07-16', url: 'https://longbridge.com/news/292928486' },
  { id: 12, titulo: '海通国际：降东鹏饮料H股目标价至123港元，维持“增持” (ventas 2026-2028e 22.900/24.740/26.760 M; beneficio 4.890/5.060/5.200 M; 4T26 como el 3T)', editor: 'Gelonghui (vía Eastmoney)', tipo: 'Analistas', fecha: '2026-11-18', url: 'https://guba.eastmoney.com/news,hk09980,1798064517.html' },
  { id: 13, titulo: 'Partial exercise of the over-allotment option and end of stabilization (3.865.800 H más)', editor: 'Eastroc Beverage (HKEXnews)', tipo: 'Primaria', fecha: '2026-03-01', url: `${HK}/2026/0301/2026030100013.pdf` },
  { id: 14, titulo: 'Keurig Dr Pepper acquires GHOST (990 M USD por el 60 %, 2024) y PepsiCo acquires Rockstar Energy (3.850 M USD, 2020): notas de prensa', editor: 'Keurig Dr Pepper; PepsiCo', tipo: 'Primaria', fecha: '2024-10-24', url: 'https://news.keurigdrpepper.com/' },
  { id: 15, titulo: 'Bolsa: movimiento del precio (movimiento.mjs) de 9980.HK y 605499.SS', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-11-27', url: 'https://finance.yahoo.com/quote/605499.SS' },
  { id: 16, titulo: '汇丰将东鹏饮料A股评级下调至持有，目标价97元 (HSBC baja la A a «mantener», objetivo 97 CNY)', editor: 'Cailianshe (vía Eastmoney)', tipo: 'Prensa', fecha: '2026-11-20', url: 'https://guba.eastmoney.com/news,hk09980,1799353089.html' },
  { id: 17, titulo: 'Avisos de participaciones de HKEX: Temasek vende 180.141 H a 93,73 HKD (27-oct; queda con el 5,95 %), BlackRock reduce su posición en la H (avisos del 10 y 20-nov) y el presidente compra 159.300 H por 14,99 M HKD (23-25-nov; 603.200 H)', editor: 'HKEXnews (Disclosure of Interests), vía Eastmoney', tipo: 'Primaria', fecha: '2026-11-26', url: 'https://guba.eastmoney.com/news,hk09980,1802136135.html' },
  { id: 18, titulo: 'Eastroc termina el contrato con Mbappé (27-oct) y las cadenas retiran Sip Water con su imagen; cambio por lotes', editor: 'Jiemian (界面新闻, vía Eastmoney)', tipo: 'Prensa', fecha: '2026-10-31', url: 'https://guba.eastmoney.com/news,hk09980,1790214739.html' },
];
const bA = bolsaA.bolsa;
const cierresA = Object.fromEntries(bolsaA.cierres_ejercicio.map((c) => [c.anio, c.precio_cierre]));
const D = {
  _estado: 'completa',
  identificacion: {
    nombre: 'Eastroc Beverage (Group) Co., Ltd. (东鹏饮料（集团）股份有限公司)', nombre_corto: 'Eastroc', ticker: '9980.HK', isin: null,
    mercado: 'Bolsa de Hong Kong (línea H, 9980.HK, HKD); también Bolsa de Shanghái (línea A, 605499.SS, CNY)', indice_referencia: 'CSI 300 (A) / Hang Seng (H)',
    pais: 'China', pais_iso: 'CN', sector: 'Consumo básico', industria: 'Refrescos y bebidas no alcohólicas', sede: 'Shenzhen (Guangdong)', fundacion: '1994', empleados: 12376, web: 'https://www.szeastroc.com',
    precio: r2(PRECIO_H * TC), fecha_precio: '2026-11-27', acciones: 727.08, capitalizacion_publicada: null, free_float_pct: 41.6,
    max_52s: r2(227.69 * TC), min_52s: r2(87.6 * TC), volumen_medio_diario: '≈ 58,3 M HKD/día en la H (3 meses); ≈ 519 M CNY/día en la A', proximos_resultados: '2027-03-31',
  },
  consenso: {
    guidance: 'Eastroc no da guía anual de ventas ni de beneficio («no publicamos objetivos internos», septiembre de 2026) [A11]. Los compromisos cuantificados son de reparto: dividendo de al menos el 80 % del beneficio en 2026-2028, con la recompra contando como dividendo, y recompra de A de 1.000-2.000 M hasta abril de 2027 (1.038,7 M hechos) [A14, A19]. La conferencia del 3T26 es el 9-dic-2026 [10]; los resultados de 2026, hacia finales de marzo de 2027 (el anual de 2025 salió el 31-mar) [A1].',
    estimaciones: [
      { periodo: '2026e', ingresos: 22900, ebitda: null, ebit: null, bpa: 6.58, dpa: null, fuente: 'Mediana de seis notas posteriores al 3T26 (BPA) y de Guosen, Hualong y Haitong (ventas) [2, 12]; Yahoo: 6,51 (7 analistas) [3]' },
      { periodo: '2027e', ingresos: 24740, ebitda: null, ebit: null, bpa: 7.08, dpa: null, fuente: 'Ídem; Yahoo: 6,85 (9 analistas), 8,22 hace 90 días [2, 3, 12]' },
      { periodo: '2028e', ingresos: 26760, ebitda: null, ebit: null, bpa: 8.15, dpa: null, fuente: 'Ídem (seis notas, 6,53-9,05) [2, 12]' },
    ],
    recomendaciones: { n_analistas: 12, comprar: 7, mantener: 4, vender: 1, po_medio: r2(114.88 * TC), po_min: r2(89.72 * TC), po_max: r2(151.64 * TC) },
    revisiones: 'Fuerte recorte tras el 3T26. En Yahoo, el BPA de 2027e de la H pasó de 8,22 CNY hace 90 días a 6,85 (−17 %), y el de 2026e de 6,97 a 6,51 (−7 %) [3]. Los brókeres chinos bajaron el beneficio de 2026-2028 entre un 5 % y un 30 %: Soochow de 5.190/5.960/6.810 M a 4.830/5.210/5.720 M, Guosen de 5.070/5.380/5.940 M a 4.750/4.390/4.790 M (prevé que 2027 baje), Hualong de 5.531/6.697/7.820 M a 4.827/5.127/6.006 M; Sinolink, −8/−11/−5 % [2]. Haitong International bajó el objetivo de la H de 140 a 123 HKD (19 veces 2027e con un 20 % de descuento de la H) y HSBC rebajó la A a «mantener» con objetivo de 97 CNY [12, 16]. En la H, 7 de 12 analistas recomiendan comprar (9 de 12 hace un mes) [3]. Solo usamos ventas y BPA: los EBITDA de los proveedores incluyen ingresos financieros.',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    tipo_rentabilidad: bA.tipo_rentabilidad,
    rentabilidades: bA.rentabilidades,
    anual: bA.anual,
    beta: 0.73, volatilidad_pct: 52.8, max_drawdown_pct: -56.4, posicion_corta_pct: null,
    comentario: 'La H cotiza desde el 3-feb-2026: salió a 248 HKD (190,8 en acciones de hoy) y cerró el 27-nov en 96,15 HKD, un 50 % menos; tocó el mínimo (87,60 HKD) el 22-oct, una semana antes de los resultados [1, 13]. La A, que da la historia, pierde un 43,1 % en un año frente al −7,6 % del CSI 300 y el −15,6 % del sector de alimentación y bebidas (rentabilidad total) [1]. Desde el informe anterior (16-oct, 97,40 HKD) la H apenas se ha movido (−1,3 %): cayó hasta el 22-oct, subió un 4 % el día de los resultados del 3T26 (30-oct) porque el beneficio sin extraordinarios cayó solo un 1,3 % y los anticipos de distribuidores subieron, y desde entonces va de lado [1, A17, A21]. El descuento de la H frente a la A se ha estrechado del 27,3 % al 24,8 % (cociente 0,752) [1]. Volatilidad de la H del 52,8 % y caída máxima del −56,4 % en 10 meses; beta de la A, 0,73 mensual a 5 años frente al CSI 300 [1].',
  },
  multiplos_historicos: {
    serie: [
      { anio: '2021', precio_cierre: r2(cierresA['2021'] * HA), ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2022', precio_cierre: r2(cierresA['2022'] * HA), ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2023', precio_cierre: r2(cierresA['2023'] * HA), ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2024', precio_cierre: r2(cierresA['2024'] * HA), ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2025', precio_cierre: r2(cierresA['2025'] * HA), ev_ebitda_ntm: null, per_ntm: null, excluir: false },
    ],
    confianza: 'Media',
  },
  comparables: {
    empresas: compe.map((e) => ({ nombre: e.nombre, ticker: e.ticker, pais: e.pais, capitalizacion: e.capitalizacion, ev_ventas: e.ev_ventas, ev_ebitda_ltm: e.ev_ebitda_ltm, ev_ebitda_ntm: null, per_ntm: e.per_ntm, crecimiento_pct: e.crecimiento_pct, margen_ebitda_pct: e.margen_ebitda_pct, roic_pct: null, dn_ebitda: e.dn_ebitda, fcf_yield_pct: e.fcf_yield_pct })),
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2025-02', objetivo: 'Alani Nu (bebidas energéticas, EE. UU.)', comprador: 'Celsius Holdings', ev: r1(1650 * comps.fx_cny.USD), ev_ventas: 2.77, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '1.650 M USD netos de 150 M de activos fiscales; 2,77 veces las ventas de 2024 (595 M USD); «unas 12 veces» el EBITDA con sinergias, que no usamos [7].' },
      { fecha: '2024-10', objetivo: 'GHOST (bebidas energéticas, 60 %)', comprador: 'Keurig Dr Pepper', ev: r1(990 / 0.6 * comps.fx_cny.USD), ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '990 M USD por el 60 % (100 % implícito 1.650 M USD); múltiplos no publicados [14].' },
      { fecha: '2020-03', objetivo: 'Rockstar Energy', comprador: 'PepsiCo', ev: r1(3850 * comps.fx_cny.USD), ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '3.850 M USD; múltiplos no publicados [14].' },
    ],
    confianza: 'Baja',
  },
  valoracion: {
    puente: { fecha: '2026-09-30', deuda_financiera: 6272.62, arrendamientos: 401.16, caja: 23071.92, minoritarios: 41.68, pensiones: 0, asociadas: 0, otros_ajustes: 174.55 },
    referencia_mercado: { mercado: 'Prima implícita del S&P 500 (Damodaran), la principal, para mercados desarrollados; el riesgo de China va en la prima adicional', prima_implicita_pct: 4.41, fecha: '2026-11', fuente: 'Damodaran, ERPbymonth.xlsx, noviembre de 2026 [5]' },
  },
  fuentes: fD,
  huecos: [
    { seccion: 'bolsa', campo: 'posicion_corta_pct', tipo: 'Complemento', intentos: '1) HKEX, ventas en corto diarias: solo volumen, no posición; 2) SSE, margen y préstamo de valores: sin cifra de corto para la A; 3) prensa: sin dato', decision: 'Omitido' },
    { seccion: 'transacciones', campo: 'múltiplos de EBITDA', tipo: 'Complemento', intentos: '1) Notas de prensa de Celsius, KDP y PepsiCo: solo EBITDA con sinergias en Alani Nu; 2) 8-K y 10-K de los compradores: sin EBITDA de la comprada; 3) operaciones en China: ninguna comparable con cifras públicas', decision: 'Omitido' },
  ],
};
guarda('D', D);

// ================================================================ E. Sentimiento
const fE = [
  { id: 1, titulo: 'Foro de Eastmoney (东方财富股吧) de la A, 605499: unas 160 entradas del 26 y 27-nov-2026', editor: 'Eastmoney Guba', tipo: 'Foros y redes', fecha: '2026-11-27', url: 'https://guba.eastmoney.com/list,605499.html' },
  { id: 2, titulo: 'Foro de Eastmoney de la H, hk09980: 160 entradas y noticias del 27-oct al 27-nov-2026', editor: 'Eastmoney Guba', tipo: 'Foros y redes', fecha: '2026-11-27', url: 'https://guba.eastmoney.com/list,hk09980.html' },
  { id: 3, titulo: 'Preguntas de inversores en la conferencia del 1S26 (plataforma de SSE Roadshow)', editor: 'SSE Roadshow / Eastroc (CNINFO)', tipo: 'Foros y redes', fecha: '2026-09-17', url: `${CN}/2026-09-18/1225570801.PDF` },
  { id: 4, titulo: 'Artículos de opinión enlazados en el foro: «增长机器踩刹车，东鹏上桌卖酒» (23-nov), «东鹏掉进“劲酒繁荣幻象”» (25-nov) y «补水啦急刹车背后» (20-nov)', editor: 'Eastmoney Guba (prensa y blogs)', tipo: 'Foros y redes', fecha: '2026-11-25', url: 'https://guba.eastmoney.com/list,hk09980.html' },
];
const E = {
  _estado: 'completa',
  sentimiento: {
    tono: 'Negativo', tendencia: 'Estable',
    revisadas: [
      { plataforma: 'Eastmoney Guba (A, 605499)', fecha: '2026-11', n_comentarios: 160, tono: 'Negativo', resumen: 'Frustración porque la acción no sube con el mercado («todo el día en verde menos esto», «los de dividendo no se compran») y quejas de que «el principal vende»; a la vez, quien compra a 106-108 CNY por el dividendo alto y la recompra, y quien cita «PET y azúcar más caros, energéticas en negativo y Sip Water a cero» para vender [1].' },
      { plataforma: 'Eastmoney Guba (H, hk09980)', fecha: '2026-11', n_comentarios: 160, tono: 'Dividido', resumen: 'Dominan las noticias: compras de H del presidente, el fin del contrato con Mbappé, el licor «好厉害», el recorte de Haitong y la rebaja de HSBC; los comentarios comparan el PER (11 veces) con el de Nongfu (24) y se quejan de que la H cae cuando la A sube [2].' },
      { plataforma: 'Artículos de opinión enlazados en el foro', fecha: '2026-11', n_comentarios: 30, tono: 'Negativo', resumen: '«La máquina de crecer frena y Eastroc se pone a vender licor»: dudas sobre la diversificación (té, coco, licor a 16 CNY) y sobre el frenazo de Sip Water [4].' },
      { plataforma: 'SSE Roadshow, conferencia del 1S26', fecha: '2026-09', n_comentarios: 10, tono: 'Negativo', resumen: 'Preguntas técnicas y escépticas: energéticas +1,46 % en el 2T, Guangdong +2,89 %, flujo de caja, guerra de precios en Sip Water [3].' },
    ],
    temas: [
      { tema: 'El núcleo (Eastroc Super Drink) ha tocado techo', postura: 'Bajista', peso: 'Alto', contraste: 'Los datos dan razón al foro en el trimestre: energéticas −8,6 % en el 3T26, primera caída desde la salida a bolsa; en 9M26, +1,7 % [A18]. Si es tiempo o techo no se sabrá hasta el verano de 2027.' },
      { tema: 'Diversificación a la desesperada (té, coco, licor)', postura: 'Bajista', peso: 'Medio', contraste: 'El té suma 1.638 M en 9M26 (+183 %) y sostiene el crecimiento; el licor es una prueba pequeña («小步测试») [A18, 2].' },
      { tema: 'Barata con dividendo y recompra', postura: 'Alcista', peso: 'Medio', contraste: 'Cierto en múltiplo: la H cotiza a unas 12 veces nuestro BPA de 2027e, con al menos el 80 % del beneficio en dividendos; la recompra de A lleva parada desde junio [A19].' },
      { tema: 'Compras del presidente', postura: 'Alcista', peso: 'Bajo', contraste: '159.300 H por 14,99 M HKD el 23-25-nov; es poco frente a su 45,8 % de la A, pero es la única operación de directivos y es de compra [D17].' },
    ],
    lectura: 'El tono sigue en capitulación, pero ya no empeora: tras el 3T26 el foro de la A pasa de esperar los resultados a quejarse de que la acción no sigue al mercado, y en la H pesan las noticias (Mbappé, licor, rebajas) más que las opiniones [1, 2]. El foro tiene razón en el dato que importa (energéticas −8,6 %) y el informe lo recoge rebajando el crecimiento. La lectura de «barata» que hacen los alcistas es la misma que la nuestra; la diferencia es que el objetivo a 12 meses no supone que el PER suba. Ninguna cifra del informe sale de los foros.',
    confianza: 'Media',
  },
  fuentes: fE,
  huecos: [],
};
guarda('E', E);
console.log('Notas A-E escritas. H/A =', HA);
