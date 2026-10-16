// Escribe las notas A-E de Sungrow Power Supply (300274.SZ, corte 2026-10-16). Sin XBRL público en China:
// 2023-2025 del informe de los auditores (NIIF/HKFRS, apéndice I del folleto de solicitud en HKEX del 24-abr-2026,
// en inglés); 2021-2022 de los informes anuales en normas chinas (CAS; versión inglesa breve y china completa);
// 1S26 y trimestres de los informes de CNINFO (CAS). Cada nota cita solo con [n] de su propia lista.
// Ejecutar: node informes/sungrow-2026-10-16/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const bolsa = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));

const HK = 'https://www1.hkexnews.hk/app/sehk/2026/108461/a132201/sehk26042400';
const CN = 'http://static.cninfo.com.cn/finalpage';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Folleto de solicitud de cotización en HKEX (versión de solicitud del 24-abr-2026), apéndice I: informe de los auditores con los estados consolidados NIIF de 2023, 2024 y 2025 y sus notas', editor: 'Sungrow Power Supply Co., Ltd. / Rongcheng (Hong Kong) CPA', tipo: 'Primaria', fecha: '2026-04-24', url: `${HK}576.pdf` },
  { id: 2, titulo: 'Folleto de solicitud en HKEX (24-abr-2026), capítulo «Financial Information» (ventas por segmento y región, márgenes por segmento, coste de ventas)', editor: 'Sungrow Power Supply Co., Ltd.', tipo: 'Primaria', fecha: '2026-04-24', url: `${HK}571.pdf` },
  { id: 3, titulo: 'Folleto de solicitud en HKEX (24-abr-2026), capítulo «Summary» (envíos de inversores y almacenamiento 2023-2025)', editor: 'Sungrow Power Supply Co., Ltd.', tipo: 'Primaria', fecha: '2026-04-24', url: `${HK}553.pdf` },
  { id: 4, titulo: '2026年半年度报告 (informe semestral 2026, CAS: balance, cuenta y flujos a 30-jun-2026, dividendo a cuenta)', editor: 'Sungrow Power Supply Co., Ltd. (CNINFO)', tipo: 'Primaria', fecha: '2026-08-29', url: `${CN}/2026-08-29/1225526948.PDF` },
  { id: 5, titulo: '2025年年度报告 (informe anual 2025, CAS: ventas por producto y región, márgenes, trimestres, remuneración, auditor)', editor: 'Sungrow Power Supply Co., Ltd. (CNINFO)', tipo: 'Primaria', fecha: '2026-04-01', url: `${CN}/2026-04-01/1225066678.PDF` },
  { id: 6, titulo: '2025 Annual Report (versión inglesa breve; política de dividendos y distribuciones de 2024 y 2025)', editor: 'Sungrow Power Supply Co., Ltd. (CNINFO)', tipo: 'Primaria', fecha: '2026-06-08', url: `${CN}/2026-06-08/1225358186.PDF` },
  { id: 7, titulo: '2022 Annual Report (versión inglesa: estados consolidados CAS de 2022 y 2021)', editor: 'Sungrow Power Supply Co., Ltd. (CNINFO)', tipo: 'Primaria', fecha: '2023-06-06', url: `${CN}/2023-06-06/1217001787.PDF` },
  { id: 8, titulo: '2022年年度报告 (informe anual 2022 completo: amortizaciones, dividendos, ventas por producto 2021-2022)', editor: 'Sungrow Power Supply Co., Ltd. (CNINFO)', tipo: 'Primaria', fecha: '2023-04-25', url: `${CN}/2023-04-25/1216556651.PDF` },
  { id: 9, titulo: '2023 Annual Report (versión inglesa: distribución de 2023 con 4 acciones liberadas por cada 10)', editor: 'Sungrow Power Supply Co., Ltd. (CNINFO)', tipo: 'Primaria', fecha: '2024-06-13', url: `${CN}/2024-06-13/1220348277.PDF` },
  { id: 10, titulo: '2025年三季度报告 (informe del 3T25)', editor: 'Sungrow Power Supply Co., Ltd. (CNINFO)', tipo: 'Primaria', fecha: '2025-10-29', url: `${CN}/2025-10-29/1224755574.PDF` },
  { id: 11, titulo: '2026年一季度报告 (informe del 1T26)', editor: 'Sungrow Power Supply Co., Ltd. (CNINFO)', tipo: 'Primaria', fecha: '2026-04-28', url: `${CN}/2026-04-28/1225208062.PDF` },
  { id: 12, titulo: 'Sungrow: ventas −28,99 % y beneficio −32,01 % en el 1S26; dividendo a cuenta, recompra, SST para centros de datos', editor: 'Mrjjxw (每日经济新闻)', tipo: 'Prensa', fecha: '2026-08-28', url: 'https://www.mrjjxw.com/articles/2026-08-28/4564208.html' },
  { id: 13, titulo: 'Sungrow cae un 13,65 %: la empresa dice que la producción es normal; conferencia con inversores del 1-jul (cuota de marcas locales en EE. UU.)', editor: '10jqka (同花顺)', tipo: 'Prensa', fecha: '2026-07-01', url: 'https://stock.10jqka.com.cn/20260701/c677863258.shtml' },
  { id: 14, titulo: 'Caída del 10,8 % del 1-abr-2026: 4T25 por debajo de lo esperado; almacenamiento doméstico con margen de un dígito', editor: '10jqka (同花顺)', tipo: 'Prensa', fecha: '2026-04-03', url: 'https://stock.10jqka.com.cn/20260403/c675746084.shtml' },
];

// Cuenta: 2023-2025 NIIF (apéndice I). EBIT = beneficio antes de costes financieros y de asociadas (bruto + otros
// ingresos + otras ganancias − I+D − administración − ventas − deterioros de activos financieros); EBITDA = EBIT +
// amortización de inmovilizado, derechos de uso, intangibles e inversiones inmobiliarias (estado de flujos).
// 2021-2022 CAS: EBIT = beneficio de explotación + gastos financieros netos (incluye resultado de inversiones y
// deterioros); amortizaciones del anexo del estado de flujos. BPA de 2021-2022 dividido entre 1,4 por las 4 acciones
// liberadas por cada 10 de la distribución de 2023 (las cifras NIIF de 2023 ya están en la base nueva).
const cuenta = [
  { periodo: '2021', ingresos: 24136.6, coste_ventas: 18765.2, gastos_generales: 2073.7, ebitda: 2528.5, amortizaciones: 347.7, ebit: 2180.8, resultado_financiero: -288.1, bai: 1892.7, impuestos: 188.7, minoritarios: 121.3, beneficio_neto: 1582.7, gastos_financieros: 124.1, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 0.771, dpa: 0.079, dpa_extraordinario: 0, acciones_diluidas: 2051.7 },
  { periodo: '2022', ingresos: 40257.2, coste_ventas: 30375.8, gastos_generales: 3781.6, ebitda: 4131.6, amortizaciones: 467.7, ebit: 3663.9, resultado_financiero: 470.1, bai: 4134.0, impuestos: 438.5, minoritarios: 102.0, beneficio_neto: 3593.4, gastos_financieros: 209.1, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 1.729, dpa: 0.157, dpa_extraordinario: 0, acciones_diluidas: 2078.8 },
  { periodo: '2023', ingresos: 72159.3, coste_ventas: 53790.4, gastos_generales: 4178.1, ebitda: 12412.2, amortizaciones: 630.2, ebit: 11782.0, resultado_financiero: -322.0, bai: 11460.0, impuestos: 1851.2, minoritarios: 169.2, beneficio_neto: 9439.6, gastos_financieros: 318.9, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 4.55, dpa: 0.689, dpa_extraordinario: 0, acciones_diluidas: 2074.6 },
  { periodo: '2024', ingresos: 77704.1, coste_ventas: 55203.0, gastos_generales: 5508.0, ebitda: 14782.3, amortizaciones: 857.5, ebit: 13924.8, resultado_financiero: -380.5, bai: 13544.3, impuestos: 2280.1, minoritarios: 227.9, beneficio_neto: 11036.3, gastos_financieros: 391.9, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 5.32, dpa: 1.08, dpa_extraordinario: 0, acciones_diluidas: 2074.5 },
  { periodo: '2025', ingresos: 88913.8, coste_ventas: 61882.4, gastos_generales: 7194.5, ebitda: 17758.7, amortizaciones: 1201.7, ebit: 16557.0, resultado_financiero: -297.0, bai: 16260.0, impuestos: 2727.1, minoritarios: 71.6, beneficio_neto: 13461.3, gastos_financieros: 347.0, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 6.53, dpa: 1.64, dpa_extraordinario: 0, acciones_diluidas: 2061.4 },
];

const balanceH = [
  { periodo: '2021', activo_total: 42840.1, activo_corriente: 36307.4, pasivo_corriente: 23507.4, pasivo_total: 26136.5, fondo_comercio: 0, intangibles: 174.4, inmovilizado_material: 4670.3, existencias: 10767.5, clientes: 10295.1, proveedores: 17764.8, activos_contrato: 1364.4, pasivos_contrato: 1713.9, caja: 11603.0, deuda_financiera: 3621.4, arrendamientos: 283.8, patrimonio_neto: 15655.1, minoritarios: 1048.6, reservas: 6532.9 },
  { periodo: '2022', activo_total: 61626.2, activo_corriente: 51993.7, pasivo_corriente: 35468.6, pasivo_total: 41889.2, fondo_comercio: 0, intangibles: 340.4, inmovilizado_material: 5732.2, existencias: 19060.1, clientes: 15928.9, proveedores: 25926.0, activos_contrato: 1291.5, pasivos_contrato: 3788.4, caja: 13157.1, deuda_financiera: 6393.8, arrendamientos: 431.0, patrimonio_neto: 18666.3, minoritarios: 1070.7, reservas: 9613.3 },
  { periodo: '2023', activo_total: 82876.5, activo_corriente: 69283.9, pasivo_corriente: 45937.0, pasivo_total: 53422.0, fondo_comercio: 0, intangibles: 76.7, inmovilizado_material: 8175.0, existencias: 21441.5, clientes: 21845.0, proveedores: 28485.9, activos_contrato: 2656.4, pasivos_contrato: 6564.8, caja: 18339.1, deuda_financiera: 8425.5, arrendamientos: 405.0, patrimonio_neto: 27705.2, minoritarios: 1749.3, reservas: 27601.1 },
  { periodo: '2024', activo_total: 115073.8, activo_corriente: 95148.6, pasivo_corriente: 60297.9, pasivo_total: 74875.0, fondo_comercio: 297.0, intangibles: 169.7, inmovilizado_material: 11342.8, existencias: 29027.6, clientes: 28539.6, proveedores: 36757.2, activos_contrato: 3107.2, pasivos_contrato: 10027.4, caja: 27882.0, deuda_financiera: 13799.9, arrendamientos: 374.6, patrimonio_neto: 36905.1, minoritarios: 3293.7, reservas: 36603.0 },
  { periodo: '2025', activo_total: 118679.4, activo_corriente: 95428.4, pasivo_corriente: 57227.6, pasivo_total: 68907.5, fondo_comercio: 297.0, intangibles: 209.8, inmovilizado_material: 13780.4, existencias: 27255.4, clientes: 24769.3, proveedores: 36635.8, activos_contrato: 3300.5, pasivos_contrato: 10655.6, caja: 32996.3, deuda_financiera: 6757.6, arrendamientos: 435.5, patrimonio_neto: 46610.9, minoritarios: 3161.0, reservas: 46154.6 },
];

const flujosH = [
  { periodo: '2021', flujo_operativo: -1638.6, capex: 1665.6, pagos_arrendamientos: 0, adquisiciones: 0, desinversiones: 0, dividendos: 195.1, recompras: 0, emision_acciones: 4178.5, intereses_en_financiacion: 124.1 },
  { periodo: '2022', flujo_operativo: 1210.5, capex: 1526.8, pagos_arrendamientos: 0, adquisiciones: 0, desinversiones: 0, dividendos: 163.4, recompras: 505.6, emision_acciones: 15.0, intereses_en_financiacion: 188.2 },
  { periodo: '2023', flujo_operativo: 6981.8, capex: 2741.2, pagos_arrendamientos: 79.7, adquisiciones: 0, desinversiones: 9.6, dividendos: 362.9, recompras: 980.1, emision_acciones: 1012.7, intereses_en_financiacion: 277.4 },
  { periodo: '2024', flujo_operativo: 12068.3, capex: 2786.0, pagos_arrendamientos: 100.7, adquisiciones: 155.0, desinversiones: 0, dividendos: 1418.7, recompras: 517.8, emision_acciones: 900.1, intereses_en_financiacion: 319.3 },
  { periodo: '2025', flujo_operativo: 16917.8, capex: 3008.0, pagos_arrendamientos: 85.4, adquisiciones: 45.1, desinversiones: 112.4, dividendos: 4227.8, recompras: 300.0, emision_acciones: 161.0, intereses_en_financiacion: 220.5 },
];

const seg = (nombre, descripcion, filas) => ({ nombre, descripcion, tipo_resultado: null, historico: filas.map(([periodo, ingresos]) => ({ periodo, ingresos, resultado: null })) });

guarda('A', {
  _estado: 'completa',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 76563.5, ebitda: 15350, ebit: 14148, beneficio_neto: 10985.2, bpa: 5.34, dpa: 1.33, dpa_extraordinario: 0, fcf: 14410, participadas_en_ebitda: null, no_recurrentes_en_ebitda: -618 },
    cambios_perimetro: [],
    comentario: 'Las ventas pasaron de 24.137 M CNY en 2021 a 88.914 M en 2025 (TCAC del 38 %) [7, 1], todo orgánico: las compras de 2024-2025 son pequeñas (155 y 45 M) [1]. El motor fue el almacenamiento, de 3.138 M en 2021 a 37.287 M en 2025, que en 2025 ya pesa el 41,9 % de las ventas [8, 2]. El margen bruto subió del 22,3 % (2021) al 30,4 % (2025) por la mezcla: almacenamiento con margen bruto del 36,5 % frente al 14,5 % del negocio de promoción de plantas, que cae del 34,3 % al 18,6 % de las ventas [2]. **2026 rompe la serie**: ventas del 1S26 de 30.912 M (−29,0 %) y beneficio atribuido de 5.259 M (−32,0 %), con el beneficio sin partidas no recurrentes en 4.275 M (−43,0 %) [4]. La caída viene de tres sitios: promoción de plantas (−85 %, por el cambio de retribución de las renovables en China), almacenamiento en Oriente Medio (≈ −5.200 M por calendario de proyectos) y menos inversores en China (66 GW frente a 76 GW) [4, 12]. El margen bruto del 1S26 sube al 35,9 % por la salida del negocio de bajo margen [4]. El 4T25 ya había dado la señal: 1.580 M de beneficio, el trimestre más bajo desde 2023 [5, 14].',
    ajustes: 'Se usan las cifras publicadas. 2023-2025 en NIIF (informe de los auditores del folleto de Hong Kong) y 2021-2022 en normas chinas (CAS); entre las dos normas la diferencia es pequeña: ventas 2025 de 88.914 M en NIIF frente a 89.184 M en CAS, y el mismo activo total y patrimonio a 31-dic-2025 [1, 5]. Partidas no recurrentes: el 1S26 lleva 669 M de ganancias de valor razonable de inversiones financieras (51 M en el 1S25) que se restan del EBITDA de los últimos doce meses (−618 M); el beneficio sin no recurrentes de 2025 fue de 13.0 mil millones aprox. frente a 13.461 publicado [4, 5]. Los deterioros de existencias (1.218 M en 2025) y de cuentas a cobrar (942 M) se repiten todos los años y no se ajustan [1]. Pagos en acciones: 462 M en 2025 (0,5 % de las ventas) [1].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '1T25', ingresos: 19036.4, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 1.85, vs_consenso: null },
      { periodo: '2T25', ingresos: 24496.7, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 1.88, vs_consenso: null },
      { periodo: '3T25', ingresos: 22868.8, crecimiento_pct: 20.8, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 2.0, vs_consenso: null },
      { periodo: '4T25', ingresos: 22782.4, crecimiento_pct: -18.4, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.8, vs_consenso: 'Inferior' },
      { periodo: '1T26', ingresos: 15560.6, crecimiento_pct: -18.3, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 1.11, vs_consenso: null },
      { periodo: '2T26', ingresos: 15351.6, crecimiento_pct: -37.3, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 1.45, vs_consenso: null },
    ],
    ultima_presentacion: 'En la conferencia con inversores del 1-jul-2026, tras la caída por la noticia de que EE. UU. preparaba un veto a los inversores extranjeros conectados a red, la dirección dijo que la producción seguía normal, que las marcas locales tienen en torno al 10 % del mercado estadounidense y que una cadena de suministro local completa tardaría al menos cinco años [13]. Con el 1S26 (28-ago) puso el acento en el margen: margen bruto del 35,9 % (+1,6 puntos), inversores con el 42,7 % y almacenamiento con el 32,4 % (−7,5 puntos) por el encarecimiento de las celdas y la competencia; envíos de almacenamiento de 25 GWh (+28 %) con menos ingresos por la caída de Oriente Medio [4, 12]. Anunció un dividendo a cuenta de 0,64 CNY por acción (25 % del beneficio), una recompra de 500-1.000 M para incentivos y avances en la división de centros de datos (transformador de estado sólido EnerNeo ya a la venta) [12]. En el 4T25 (1-abr) había explicado que renunció a parte del almacenamiento doméstico porque ahí el margen es de un dígito [14]. La dirección no dio guía numérica de ventas ni de envíos para 2026 en las fuentes consultadas.',
    confianza: 'Media',
  },
  balance: {
    historico: balanceH,
    vencimientos: [{ anio: '2026', importe: 2865.7 }, { anio: '2027+', importe: 3891.9 }],
    liquidez: 'Caja y equivalentes de 30.861 M y 4.045 M en activos financieros de negociación (depósitos y productos de renta fija a corto) a 30-jun-2026, frente a una deuda bancaria de unos 7.500 M [4].',
    rating: 'Sin rating (no tiene bonos emitidos)',
    coste_deuda_pct: 3.4,
    vida_media_anios: null,
    otros_pasivos: 'Provisiones de 5.883 M a 30-jun-2026 (sobre todo garantías de producto: inversores con garantía mínima de cinco años y sistemas de almacenamiento) [4, 1]. Pasivos por rescate de 882 M a cierre de 2025: inversores externos en filiales (almacenamiento) con derecho a vender sus participaciones a la empresa, que se tratan como deuda en el puente [1]. Pagarés comerciales a pagar de 19.798 M (financiación de proveedores con aval bancario, habitual en China) que no son deuda financiera pero dependen de líneas bancarias [4]. Sin pensiones de prestación definida relevantes.',
    comentario: 'El balance es de caja neta: unos 27.000 M a 30-jun-2026 (caja y activos financieros líquidos 34.906 M frente a deuda de 7.462 M y arrendamientos de 327 M) [4]. La deuda bruta bajó de 13.800 M (2024) a 6.758 M (2025) al devolver préstamos con la caja generada [1]. El circulante comercial está financiado por proveedores: existencias de 32.153 M y cuentas a cobrar de 23.924 M frente a proveedores y pagarés de 40.474 M y anticipos de clientes de 11.656 M [4]. Las existencias subieron 4.900 M en el semestre (preparación de entregas del 2S) y son el principal riesgo de balance si los precios de las celdas bajan [4].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujosH,
    comentario: 'La conversión de beneficio en caja mejoró mucho: flujo de explotación de −1.639 M en 2021 y 1.210 M en 2022 (circulante en expansión) a 6.982 M, 12.068 M y 16.918 M en 2023-2025 (126 % del beneficio en 2025) [7, 1]. El capex es pequeño: 3.008 M en 2025 (3,4 % de las ventas), sobre todo fábricas fuera de China (50 GW de capacidad de inversores en el extranjero) [1, 3]. En el 1S26 el flujo de explotación fue de 3.735 M (+8,8 %) pese a la caída del beneficio [4]. Usos de la caja en 2025: dividendos 4.228 M, devolución neta de deuda 5.256 M y recompras 300 M [1]. Dividendos de 2021: estimación propia (pagos por dividendos e intereses de 319 M menos 124 M de intereses).',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'Rongcheng CPA (容诚会计师事务所); Rongcheng (Hong Kong) para el folleto NIIF',
    anios_auditor: 19,
    opinion: 'Favorable',
    comentario: 'El auditor lleva 19 años seguidos, demasiado tiempo para la independencia, aunque los firmantes rotan (1, 1 y 4 años) [5]. Las cuentas NIIF auditadas para Hong Kong cuadran con las chinas en activo y patrimonio, lo que sube la confianza [1, 4]. Partidas a vigilar: deterioros de existencias de 1.199 M, 694 M y 1.218 M en 2023-2025 (2 % del coste de ventas) y de cuentas a cobrar de 790 M, 1.086 M y 942 M, por clientes de plantas y de almacenamiento [1]; provisiones de garantía que crecen con las ventas (5.701 M a fin de 2025, 6,4 % de las ventas) [1]. El I+D se lleva a gastos casi entero (intangibles de solo 210 M) [1]. Los pagos en acciones (462 M) son pequeños. Los indicadores del motor (Altman, Piotroski, Beneish) se leen con la caída de 2026 en mente: el Beneish no detecta nada anómalo en 2025.',
    senales: [
      { senal: 'Auditor con 19 años seguidos', nivel: 'Media', comentario: 'Rotan los socios firmantes, pero la firma es la misma desde 2007 [5].' },
      { senal: 'Existencias al alza con ventas a la baja (32.153 M a jun-26, +18 % en el semestre)', nivel: 'Media', comentario: 'Riesgo de deterioro si bajan los precios de las celdas o se retrasan proyectos [4].' },
      { senal: 'Deterioros de cuentas a cobrar recurrentes (≈ 1.000 M al año)', nivel: 'Baja', comentario: 'Clientes de promoción de plantas en China; el negocio se reduce [1].' },
    ],
    confianza: 'Media',
  },
  capital: {
    politica: 'Dividendo del 25 % del beneficio en dos pagos: 0,95 CNY a cuenta y 0,69 final por el ejercicio 2025 (3.367 M en total) y 0,64 a cuenta del 1S26 (1.317 M) [6, 4, 14]. Recompras para incentivos: 300 M en 2025 y un programa de 500-1.000 M aprobado en 2026 con precio máximo de 188 CNY [1, 12]. Solicitud de cotización en Hong Kong (acciones H) para financiar fábricas en el extranjero e I+D [2].',
    adquisiciones: [],
    comentario: 'La dirección ha invertido poco y bien: capex acumulado de 11.700 M en cinco años para un negocio que multiplicó las ventas por 3,7 [1, 7]. La caja se ha devuelto con dividendos crecientes (de 163 M en 2022 a 4.228 M en 2025) y recompras pequeñas [1]. Lo discutible es la ampliación en Hong Kong con 27.000 M de caja neta: diluye a los accionistas sin necesidad financiera, aunque da una moneda y un acceso a inversores extranjeros [2, 4]. No hay compras grandes: el crecimiento es orgánico.',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      seg('Inversores y conversión de potencia', 'Inversores fotovoltaicos (residencial, comercial, centrales), convertidores eólicos y PCS.', [['2021', 9050.8], ['2022', 15717.3], ['2023', 27653.1], ['2024', 29127.0], ['2025', 31136.2]]),
      seg('Sistemas de almacenamiento', 'Sistemas de baterías integrados (PowerTitan, PowerStack) para red, comercial y residencial; compra las celdas.', [['2021', 3137.6], ['2022', 10126.5], ['2023', 17801.5], ['2024', 24959.2], ['2025', 37286.6]]),
      seg('Promoción de plantas renovables', 'Desarrollo y construcción de plantas solares y eólicas, sobre todo en China (residencial y comercial).', [['2021', 9678.7], ['2022', 11603.8], ['2023', 24734.0], ['2024', 21003.0], ['2025', 16559.4]]),
      seg('Otros', 'Generación de plantas propias, recarga de vehículos, operación y mantenimiento, hidrógeno, fotovoltaica flotante.', [['2021', 2269.5], ['2022', 2809.6], ['2023', 1970.7], ['2024', 2614.9], ['2025', 3931.6]]),
    ],
    geografias: [{ nombre: 'China continental', peso_pct: 39.3 }, { nombre: 'Resto del mundo (incluye Hong Kong, Macao y Taiwán)', peso_pct: 60.7 }],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Envíos de inversores (GW)', valor_anterior: '147 (2024)', valor_actual: '143 (2025); 66 en el 1S26 (76 en el 1S25)', variacion: '−3 %; −13 % en el 1S26', comentario: 'La caída de 2026 es del mercado chino (−14 GW) [3, 12].' },
      { kpi: 'Envíos de almacenamiento (GWh)', valor_anterior: '28,0 (2024)', valor_actual: '43,0 (2025); 25 en el 1S26', variacion: '+54 %; +28 % en el 1S26', comentario: 'Fuera de China pasó de 19 a 36 GWh en 2025 [3, 14, 12].' },
      { kpi: 'Margen bruto del almacenamiento', valor_anterior: '36,7 % (2024)', valor_actual: '36,5 % (2025); 32,4 % (1S26)', variacion: '−7,5 puntos en el 1S26', comentario: 'Celdas más caras (carbonato de litio) y competencia [2, 12].' },
      { kpi: 'Margen bruto de inversores', valor_anterior: '30,9 % (2024)', valor_actual: '34,7 % (2025); 42,7 % (1S26)', variacion: '+7,0 puntos en el 1S26', comentario: 'Mezcla internacional y menos China [2, 12].' },
      { kpi: 'Peso de las ventas fuera de China', valor_anterior: '46,7 % (2024)', valor_actual: '60,7 % (2025); 73,4 % (1S26)', variacion: '+26,7 puntos', comentario: 'China cae a la mitad en el 1S26 [2, 12].' },
      { kpi: 'Cuota mundial de inversores por envíos', valor_anterior: '—', valor_actual: '25,2 % (2024), n.º 1', variacion: '—', comentario: 'Frost & Sullivan, en el folleto [3].' },
    ],
    confianza: 'Alta',
  },
  fuentes: fA,
  huecos: [
    { seccion: 'trimestres', campo: 'EBITDA trimestral y crecimiento del 1T25 y 2T25', tipo: 'Complemento', intentos: '1) Informes trimestrales de CNINFO (CAS): no publican EBITDA ni amortización trimestral; 2) informe anual 2025, tabla por trimestres: solo ventas y beneficio; 3) informes de 2024 para el crecimiento: no descargados por presupuesto', decision: 'Omitido' },
  ],
});

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Folleto de solicitud en HKEX (24-abr-2026), capítulo «Industry Overview» (estudio de Frost & Sullivan: tamaños de mercado 2021-2030, cuotas por envíos 2024)', editor: 'Sungrow / Frost & Sullivan', tipo: 'Sectorial', fecha: '2026-04-24', url: `${HK}562.pdf` },
  { id: 2, titulo: 'Folleto de solicitud en HKEX (24-abr-2026), capítulo «Business» (productos, clientes, proveedores, capacidad, empleados)', editor: 'Sungrow Power Supply Co., Ltd.', tipo: 'Primaria', fecha: '2026-04-24', url: `${HK}565.pdf` },
  { id: 3, titulo: 'Folleto de solicitud en HKEX (24-abr-2026), capítulo «Risk Factors» (aranceles de EE. UU., medidas de la UE)', editor: 'Sungrow Power Supply Co., Ltd.', tipo: 'Primaria', fecha: '2026-04-24', url: `${HK}557.pdf` },
  { id: 4, titulo: 'EU moves to ban high-risk inverters from China over cybersecurity threats', editor: 'Euronews', tipo: 'Prensa', fecha: '2026-05-04', url: 'https://euronews.com/2026/05/04/eu-moves-to-ban-high-risk-inverters-from-china-over-cybersecurity-threats' },
  { id: 5, titulo: 'Sungrow cae un 13,65 %: Reuters informa de un proyecto de veto de EE. UU. a los inversores extranjeros conectados a red', editor: '10jqka (同花顺)', tipo: 'Prensa', fecha: '2026-07-01', url: 'https://stock.10jqka.com.cn/20260701/c677863258.shtml' },
  { id: 6, titulo: 'Folleto de solicitud en HKEX (24-abr-2026), capítulo «History, Development and Corporate Structure»', editor: 'Sungrow Power Supply Co., Ltd.', tipo: 'Primaria', fecha: '2026-04-24', url: `${HK}564.pdf` },
  { id: 7, titulo: 'Yahoo Finance: ventas, EBITDA y deuda de los últimos doce meses de competidores cotizados (Deye, Ginlong, GoodWe, Sineng, Enphase, SolarEdge, Fluence, CATL)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://finance.yahoo.com' },
  { id: 8, titulo: 'Informe semestral 2026 (CAS): ventas por producto y región del 1S26', editor: 'Sungrow Power Supply Co., Ltd. (CNINFO)', tipo: 'Primaria', fecha: '2026-08-29', url: `${CN}/2026-08-29/1225526948.PDF` },
  { id: 9, titulo: 'Caída del 10,8 % del 1-abr-2026: carbonato de litio y cobre, competencia en precios, almacenamiento doméstico con margen de un dígito', editor: '10jqka (同花顺)', tipo: 'Prensa', fecha: '2026-04-03', url: 'https://stock.10jqka.com.cn/20260403/c675746084.shtml' },
  { id: 10, titulo: 'CATL raises $5 billion in share sale, Sungrow files for Hong Kong IPO for the second time', editor: 'pv magazine', tipo: 'Prensa', fecha: '2026-04-28', url: 'https://www.pv-magazine.com/2026/04/28/catl-raises-5-billion-in-share-sale-sungrow-files-for-hong-kong-ipo-for-the-second-time/' },
];
guarda('B', {
  _estado: 'completa',
  sector: {
    definicion: 'Equipos de conversión de energía limpia que vende Sungrow: inversores fotovoltaicos y sistemas de almacenamiento en baterías integrados (con su PCS), a escala mundial. Se usa el estudio de Frost & Sullivan del folleto de Hong Kong, que separa inversores (24.900 M USD en 2025) y almacenamiento (47.100 M USD), dentro de un mercado de «conversión de potencia limpia» de 100.500 M USD que añade eólica, vehículo eléctrico, hidrógeno y alimentación de centros de datos [1]. La segunda fuente es el volumen físico del mismo estudio: 682 GW de inversores enviados y 324 GWh de almacenamiento instalado en 2025 [1]. La promoción de plantas (18,6 % de las ventas de 2025) no está en este perímetro.',
    tamano: '≈ 72.000 M USD en 2025 (inversores 24.900 M y almacenamiento 47.100 M) [1]',
    unidad_serie: 'miles de millones de USD (inversores + almacenamiento, Frost & Sullivan)',
    serie: [{ anio: '2021', tamano: 16.8 }, { anio: '2025', tamano: 72.0 }, { anio: '2030e', tamano: 193.3 }],
    tcac_historico_pct: 43.9,
    tcac_previsto_pct: 21.9,
    cr5_pct: 63.9,
    estructura: 'Concentrada en inversores (cinco primeros 63,9 %); moderadamente concentrada en almacenamiento (43,3 %)',
    drivers: [
      { driver: 'Almacenamiento para redes con mucha solar y para centros de datos', efecto: '+', horizonte: 'Estructural', evidencia: 'Instalaciones de baterías de 23,6 GWh (2021) a 324,1 GWh (2025); previsión de 1.164,7 GWh en 2030 (TCAC 29,2 %) [1].' },
      { driver: 'Instalación solar mundial', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'De 170 GW (2021) a 579 GW (2025); previsión de 1.043 GW en 2030 (TCAC 12,5 %), con China frenando en 2026 tras el cambio de retribución [1, 8].' },
      { driver: 'Precio de las celdas (carbonato de litio)', efecto: '−', horizonte: 'Cíclico', evidencia: 'El litio casi se duplicó en el 2S25; el margen bruto del almacenamiento de Sungrow bajó 7,5 puntos en el 1S26 [9, 8].' },
      { driver: 'Proteccionismo en EE. UU. y la UE', efecto: '−', horizonte: 'Estructural', evidencia: 'Proyecto de veto de EE. UU. a inversores extranjeros (jun-2026) y veto de la UE a inversores de proveedores de alto riesgo en proyectos con fondos europeos (may-2026) [5, 4].' },
      { driver: 'Sustitución de inversores viejos', efecto: '+', horizonte: 'Estructural', evidencia: 'La reposición será ≈ 12 % de los envíos de 2030 [1].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 5, justificacion: 'Decenas de fabricantes chinos con exceso de capacidad; guerra de precios en almacenamiento doméstico (margen de un dígito según Sungrow) [9].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Grandes eléctricas y promotores compran por licitación, pero el primer cliente no llega al 17 % entre los cinco primeros (17,0 % en 2025) [2].' },
      { fuerza: 'Poder de los proveedores', intensidad: 3, justificacion: 'Celdas de batería de pocos fabricantes (CATL, EVE, Hithium); los cinco primeros proveedores son el 25,1 % de las compras [2].' },
      { fuerza: 'Amenaza de entrada', intensidad: 3, justificacion: 'Barrera de bancabilidad y servicio mundial; pero los fabricantes de celdas integran sistemas (CATL, BYD, Tesla) [1].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 2, justificacion: 'Sin sustituto del inversor; en almacenamiento compiten otras tecnologías (bombeo, sodio), con poca cuota hoy [1].' },
    ],
    ciclo: { posicion: 'Contracción', comentario: 'Instalación solar en China a la baja en 2026 tras el paso a precios de mercado de las renovables, precios de módulos y de sistemas de almacenamiento bajo presión y litio más caro: las ventas de Sungrow caen un 29 % en el 1S26 [8]. En 2022 el sector sufrió la escasez de chips y la subida del litio (margen bruto de Sungrow 24,5 %) y en 2023-2024 la sobrecapacidad china hundió precios de módulos, pero el almacenamiento compensó [7, 1]. Fuera de China la demanda de almacenamiento sigue creciendo (envíos de Sungrow +28 % en el 1S26) [8].' },
    regulacion: 'EE. UU.: aranceles recíprocos de 2025 (anulados por el Tribunal Supremo), aranceles de la sección 301 y reglas de contenido extranjero en los créditos fiscales; Reuters informó en junio de 2026 de un proyecto de veto a los inversores extranjeros conectados a red, sin aprobar [3, 5]. UE: en mayo de 2026 la Comisión dejó sin fondos europeos los proyectos con inversores de proveedores de alto riesgo y abrió la puerta a un veto en el mercado con la Ley de Ciberseguridad [4]. China: desde 2025 la retribución de las renovables nuevas pasa a precio de mercado, lo que frena la instalación doméstica en 2026 [8].',
    tendencias: 'Sistemas de almacenamiento más grandes (celdas de 684 Ah en el PowerTitan 3.0) y formación de red (grid-forming) [6]; alimentación de centros de datos de IA con transformadores de estado sólido y corriente continua de 800 V, un mercado que Frost & Sullivan estima en 29.100 M USD en 2030 (TCAC 32,8 %) [1]; integración vertical de los fabricantes de celdas en sistemas, que presiona a los integradores que compran celdas, como Sungrow [1, 9].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 25.2,
    posicion: 'N.º 1 mundial en inversores por envíos (25,2 % en 2024, por delante de Huawei con el 24,8 %) y n.º 2 en almacenamiento integrado (11,9 %, tras Tesla con el 13,3 %) [1].',
    competidores: [
      { nombre: 'Huawei Digital Power', pais: 'China', ticker: null, ingresos: null, cuota_pct: 24.8, margen_ebit_pct: null, comentario: 'N.º 2 en inversores; no cotiza ni publica las cifras del negocio [1].' },
      { nombre: 'Tesla Energy', pais: 'EE. UU.', ticker: 'TSLA', ingresos: null, cuota_pct: 13.3, margen_ebit_pct: null, comentario: 'N.º 1 en almacenamiento integrado (Megapack), fabrica en EE. UU. y China [1].' },
      { nombre: 'Ningbo Deye', pais: 'China', ticker: '605117.SS', ingresos: 17329, cuota_pct: null, margen_ebit_pct: null, comentario: 'Inversores híbridos y almacenamiento residencial en mercados emergentes; margen EBITDA del 30,6 % en los últimos doce meses [7].' },
      { nombre: 'Ginlong (Solis)', pais: 'China', ticker: '300763.SZ', ingresos: 7040, cuota_pct: null, margen_ebit_pct: null, comentario: 'Inversores de cadena; deuda neta de 6.700 M CNY [7].' },
      { nombre: 'GoodWe', pais: 'China', ticker: '688390.SS', ingresos: 11053, cuota_pct: null, margen_ebit_pct: null, comentario: 'Inversores residenciales y comerciales; margen EBITDA del 5,8 % [7].' },
      { nombre: 'Enphase Energy', pais: 'EE. UU.', ticker: 'ENPH', ingresos: 8889, cuota_pct: null, margen_ebit_pct: null, comentario: 'Microinversores residenciales; ventas de 1.329 M USD (8.889 M CNY) en los últimos doce meses [7].' },
      { nombre: 'Fluence Energy', pais: 'EE. UU.', ticker: 'FLNC', ingresos: 17610, cuota_pct: null, margen_ebit_pct: null, comentario: 'Integrador de almacenamiento (Siemens y AES), en pérdidas; ventas de 2.632 M USD [7].' },
    ],
    foso: {
      veredicto: 'Estrecho',
      tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'Plataforma de supervisión de plantas, sin efecto de red real [2].' },
        { fuente: 'Costes de cambio', puntuacion: 2, evidencia: 'Bancabilidad: los financiadores aceptan pocas marcas; n.º 1 en el ranking de BNEF de almacenamiento y PCS [6].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'Marca SUNGROW con valor de más de 100.000 M CNY (World Brand Lab); I+D de 4.175 M CNY en 2025 [6].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Escala de 143 GW de inversores y 43 GWh de almacenamiento en 2025; margen bruto de inversores del 34,7 % frente al 5,8 % de margen EBITDA de GoodWe [2, 7].' },
        { fuente: 'Escala eficiente', puntuacion: 2, evidencia: 'Mercado grande y con muchos competidores chinos; la escala no impide la entrada [1].' },
      ],
    },
    amenazas: 'La principal es política: un veto en EE. UU. o en la UE a los inversores chinos (la UE ya los excluye de los proyectos con fondos europeos) quitaría mercados de margen alto, donde Sungrow obtiene buena parte del 60,7 % de ventas exteriores [3, 4, 5]. La segunda, la integración de los fabricantes de celdas (CATL, BYD, EVE) en sistemas de almacenamiento completos: Sungrow compra las celdas y sufre cuando sube el litio [9]. Probabilidad media de que alguna de las dos recorte el margen de forma duradera.',
    confianza: 'Media',
  },
  historia: {
    resumen: 'Cao Renxian, profesor de la Universidad Tecnológica de Hefei, fundó la empresa en 1997 y en 2003 desarrolló el primer inversor fotovoltaico chino de 10 kW con tecnología propia [6]. Empezó en almacenamiento en 2006 y abrió su primera oficina en el extranjero (Francia) en 2008 [6]. Cotiza en ChiNext desde 2011 [6]. Desde 2015 es líder mundial en envíos de inversores y en 2015 creó la filial de almacenamiento, que en 2025 ya es su primer negocio [6]. En 2025 creó la división de alimentación de centros de datos y pidió cotizar en Hong Kong; la solicitud caducó en abril de 2026 y la volvió a presentar el 24-abr-2026 [6, 10].',
    hitos: [
      { anio: '1997', hito: 'Fundación de Hefei Sungrow por Cao Renxian [6].' },
      { anio: '2003', hito: 'Primer inversor conectado a red de 10 kW con tecnología propia de China [6].' },
      { anio: '2006', hito: 'Primer inversor de almacenamiento (SC50) [6].' },
      { anio: '2011', hito: 'Salida a bolsa en ChiNext (300274) [6].' },
      { anio: '2015', hito: 'Filial de almacenamiento y primer convertidor eólico de 3.300 V [6].' },
      { anio: '2023', hito: 'Primer inversor de 2.000 V conectado a red [6].' },
      { anio: '2024', hito: 'N.º 1 en bancabilidad de almacenamiento y PCS según BNEF [6].' },
      { anio: '2025', hito: 'PowerTitan 3.0, división de centros de datos, calificación MSCI ESG AAA y primera solicitud en Hong Kong [6].' },
      { anio: '2026', hito: 'Segunda solicitud de cotización en Hong Kong (24-abr) [10].' },
    ],
    confianza: 'Alta',
  },
  esg: {
    calificaciones: [{ agencia: 'MSCI', calificacion: 'AAA', fecha: '2025' }],
    materialidad: 'Lo material es la seguridad de los sistemas de almacenamiento (incendios), la ciberseguridad de los inversores conectados a red y la cadena de suministro. La ciberseguridad ya tiene efecto en ventas: la UE excluye los inversores de proveedores de alto riesgo de los proyectos con fondos europeos [4]. En seguridad, Sungrow hizo en 2024 la primera prueba de combustión a gran escala de un sistema de almacenamiento [2]. Las provisiones de garantía (5.883 M CNY) miden el riesgo de calidad [8].',
    controversias: 'No se han encontrado sanciones ni litigios relevantes contra la empresa en los últimos tres años en las fuentes revisadas (folleto de Hong Kong, informes anuales). La exclusión de la UE y el proyecto de veto de EE. UU. son medidas sobre los proveedores chinos en general, no sanciones a Sungrow [3, 4, 5].',
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'Sungrow fabrica inversores fotovoltaicos (de residencial a centrales de varios MW), sistemas de almacenamiento en baterías integrados (PowerTitan para red, PowerStack para comercial), convertidores eólicos, equipos de recarga y electrolizadores de hidrógeno, y promueve plantas solares y eólicas en China [2]. Vende en más de 170 países; en 2025 el 60,7 % de las ventas fue fuera de China [2]. Tiene 19.006 empleados (diciembre de 2025) y fábricas en China, India, Tailandia y Europa, con 50 GW de capacidad de inversores fuera de China [2]. Los clientes son eléctricas, promotores de renovables y distribuidores; en China, muchos son empresas estatales [2].',
    como_gana_dinero: 'Margen de producto: el bruto de 2025 fue del 34,7 % en inversores y del 36,5 % en almacenamiento, frente al 14,5 % de la promoción de plantas [2]. En almacenamiento Sungrow integra celdas compradas con su PCS, su control y su servicio: gana con el diseño y la bancabilidad, y pierde margen cuando suben las celdas o bajan los precios de los sistemas [9]. Los mercados de fuera de China dejan un margen bruto del 40,4 % frente al 18,8 % en China [8]. El negocio es de proyecto (licitaciones con entregas concentradas en el segundo semestre) y apenas tiene ingresos recurrentes, salvo operación y mantenimiento y la generación de sus plantas.',
    clientes: 'Los cinco primeros clientes fueron el 34,4 %, 19,8 % y 17,0 % de las ventas en 2023-2025: la concentración baja a medida que crece el negocio internacional [2]. Los contratos de almacenamiento son por proyecto, con garantías de 10-20 años. Poder de precios: el margen bruto de inversores subió de 30,9 % a 42,7 % entre 2024 y el 1S26 pese a la competencia, pero en almacenamiento no pudo trasladar la subida de las celdas (−7,5 puntos en el 1S26) [2, 8].',
  },
  fuentes: fB,
  huecos: [],
});

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Informe anual 2025 (CAS): consejo, alta dirección y remuneraciones de 2025, presidencia y dirección general en la misma persona', editor: 'Sungrow Power Supply Co., Ltd. (CNINFO)', tipo: 'Primaria', fecha: '2026-04-01', url: `${CN}/2026-04-01/1225066678.PDF` },
  { id: 2, titulo: 'Folleto de solicitud en HKEX (24-abr-2026), capítulo «Directors and Senior Management» (consejo, comisiones, remuneración agregada)', editor: 'Sungrow Power Supply Co., Ltd.', tipo: 'Primaria', fecha: '2026-04-24', url: `${HK}566.pdf` },
  { id: 3, titulo: 'Folleto de solicitud en HKEX (24-abr-2026), capítulo «Relationship with our Single Largest Shareholders Group» (Cao Renxian y Su Wen, 30,63 %)', editor: 'Sungrow Power Supply Co., Ltd.', tipo: 'Primaria', fecha: '2026-04-24', url: `${HK}567.pdf` },
  { id: 4, titulo: 'Informe semestral 2026 (CAS): diez primeros accionistas a 30-jun-2026, pignoraciones, autocartera', editor: 'Sungrow Power Supply Co., Ltd. (CNINFO)', tipo: 'Primaria', fecha: '2026-08-29', url: `${CN}/2026-08-29/1225526948.PDF` },
  { id: 5, titulo: 'Cuatro altos directivos terminan antes de tiempo su plan de venta de hasta 424.900 acciones', editor: 'Jiemian (界面新闻)', tipo: 'Prensa', fecha: '2025-09-26', url: 'https://m.jiemian.com/article/13410407.html' },
  { id: 6, titulo: 'El presidente Cao Renxian propone una recompra de 500-1.000 M CNY para incentivos', editor: '10jqka (同花顺)', tipo: 'Prensa', fecha: '2026-07-22', url: 'https://stock.10jqka.com.cn/20260722/c678335209.shtml' },
];
guarda('C', {
  _estado: 'completa',
  directivos: {
    equipo: [
      { nombre: 'Cao Renxian', cargo: 'Presidente y director general (president)', desde: '1997', participacion_pct: 30.46, trayectoria: 'Fundador; antes profesor en la Universidad Tecnológica de Hefei. Ha llevado la empresa de 24.137 M CNY de ventas en 2021 a 88.914 M en 2025. Diputado de la Asamblea Popular Nacional y presidente de la Asociación China de la Industria Fotovoltaica [1, 2].' },
      { nombre: 'Gu Yilei', cargo: 'Vicepresidente del consejo y vicepresidente sénior (fotovoltaica y almacenamiento)', desde: '2015', participacion_pct: null, trayectoria: 'En la empresa desde 2015; dirige los dos negocios principales; la remuneración más alta de 2025 (18,0 M CNY) [1, 2].' },
      { nombre: 'Tian Shuai', cargo: 'Vicepresidente y director financiero', desde: '2022', participacion_pct: null, trayectoria: 'Director financiero desde junio de 2022 [2].' },
      { nombre: 'Zhao Wei', cargo: 'Consejero, vicepresidente sénior y director científico', desde: '2003', participacion_pct: 0.47, trayectoria: 'Responsable de I+D desde 2003 [2, 4].' },
      { nombre: 'Wu Jiamao', cargo: 'Consejero y vicepresidente sénior (ventas mundiales)', desde: '2005', participacion_pct: null, trayectoria: 'Dirige las ventas internacionales, que pasaron del 46,7 % al 60,7 % de las ventas en 2025 [2].' },
      { nombre: 'Zhang Xucheng', cargo: 'Consejero (promoción de plantas)', desde: '2003', participacion_pct: null, trayectoria: 'Responsable del negocio de promoción de plantas, el que más cae en 2026 [2].' },
    ],
    historial_guidance: [],
    comentario: 'Equipo estable y de casa: el fundador preside y dirige desde hace casi tres décadas, y los responsables de I+D, ventas y producción llevan 15-20 años en la empresa [2]. No hay cambios en la cúpula en 24 meses. La credibilidad no se puede medir con guías numéricas porque la empresa no las publica [1]. Plan de sucesión: Gu Yilei, vicepresidente del consejo con los dos negocios principales, es el candidato natural, pero no hay plan público [2].',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Cao Renxian', cargo: 'Presidente y director general', tipo: 'Ejecutivo', desde: '2001', comisiones: 'Estrategia; Retribuciones' },
      { nombre: 'Gu Yilei', cargo: 'Vicepresidente', tipo: 'Ejecutivo', desde: '2022', comisiones: '—' },
      { nombre: 'Zhang Xucheng', cargo: 'Consejero', tipo: 'Ejecutivo', desde: '2010', comisiones: '—' },
      { nombre: 'Zhao Wei', cargo: 'Consejero (representante de los empleados)', tipo: 'Ejecutivo', desde: '2010', comisiones: '—' },
      { nombre: 'Wu Jiamao', cargo: 'Consejero', tipo: 'Ejecutivo', desde: '2023', comisiones: '—' },
      { nombre: 'Gu Guang', cargo: 'Consejera independiente', tipo: 'Independiente', desde: '2020', comisiones: 'Auditoría (presidenta)' },
      { nombre: 'Li Mingfa', cargo: 'Consejero independiente', tipo: 'Independiente', desde: '2020', comisiones: 'Auditoría' },
      { nombre: 'Zhang Lei', cargo: 'Consejero independiente', tipo: 'Independiente', desde: '2023', comisiones: 'Auditoría' },
    ],
    presidente_ceo_separados: false, presidente_ejecutivo: true, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: false, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: true, presidente_vinculado_control: true, cambios_cupula_24m: 0,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 4.08, fijo: null, variable_corto: null, variable_largo: null, ratio_salario_medio: null },
    remuneracion: 'El presidente cobró 4,08 M CNY en 2025, menos que su vicepresidente (18,0 M) y que el responsable de ventas (13,6 M): el fundador se paga sobre todo con su 30,5 % [1]. Los consejeros y la alta dirección sumaron 65,6 M CNY [1]. El variable de los no independientes sigue un plan anual de evaluación que no publica métricas ni pesos; los planes de acciones para empleados (el de 2026 para hasta 147 personas, con 1.000 M de fondo) se financian con recompras [1, 6]. No consta cláusula de recuperación.',
    accionistas: [
      { nombre: 'Cao Renxian (fundador)', pct: 30.46, tipo: 'Persona física; con su cónyuge Su Wen controla el 30,63 %', variacion: 'Sin cambios; 21,99 M acciones pignoradas' },
      { nombre: 'HKSCC (inversores extranjeros por Stock Connect)', pct: 8.08, tipo: 'Cuenta ómnibus', variacion: '+3,96 M acciones en el 1S26' },
      { nombre: 'China Life Insurance (producto tradicional)', pct: 0.65, tipo: 'Aseguradora', variacion: '−0,34 M' },
      { nombre: 'Zheng Guibiao', pct: 0.58, tipo: 'Persona física', variacion: '−0,90 M' },
      { nombre: 'Kylin Asia Holdings', pct: 0.55, tipo: 'Inversor', variacion: '−0,65 M' },
      { nombre: 'Zhao Wei (consejero)', pct: 0.47, tipo: 'Directivo', variacion: 'Sin cambios; 1,0 M pignoradas' },
      { nombre: 'Abu Dhabi Investment Authority', pct: 0.46, tipo: 'Fondo soberano', variacion: '+8,05 M en el 1S26' },
      { nombre: 'Autocartera', pct: 0.76, tipo: 'Autocartera', variacion: '15,73 M acciones a 30-jun-2026' },
    ],
    insiders: [],
    control_y_defensas: 'Cao Renxian y su cónyuge controlan el 30,63 % y deciden de hecho el consejo; Cao preside y dirige a la vez [3, 1]. No hay clases de acciones con voto distinto [2]. El consejo tiene cinco ejecutivos y tres independientes (cuatro tras la cotización en Hong Kong): la mayoría es de la casa [2]. Pignoración pequeña (22 M de 631 M acciones de Cao) [4]. Compromiso de no competencia del fundador desde 2011 [3]. Las operaciones vinculadas del folleto no son relevantes [2].',
    alertas: [
      'Presidente y director general en la misma persona, que además es el accionista de control (30,46 %) [1, 4].',
      'Cuatro altos directivos (Gu Yilei, Wu Jiamao, Deng Dejun y Wang Lei) anunciaron en julio de 2025 ventas de hasta 424.900 acciones por necesidades personales y terminaron el plan antes de tiempo en septiembre de 2025 «para evitar operaciones a corto plazo»; cantidad pequeña (0,02 % del capital) [5].',
      'Ampliación de capital en Hong Kong pendiente (la solicitud del 24-abr-2026 caduca a los seis meses si no se aprueba): dilución sin necesidad financiera [2].',
    ],
    confianza: 'Media',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'directivos', campo: 'historial_guidance', tipo: 'Complemento', intentos: '1) Informes anuales 2023-2025 (CAS e inglés): no publican guía de ventas ni de beneficio; 2) folleto de Hong Kong: no da previsiones; 3) prensa de resultados (mrjjxw, 10jqka): sin objetivos numéricos de la empresa para 2026', decision: 'Omitido' },
    { seccion: 'gobierno', campo: 'Votos de la junta sobre remuneración', tipo: 'Complemento', intentos: '1) Informe anual 2025: no da porcentajes de voto; 2) actas de las juntas en CNINFO: no descargadas; 3) prensa: sin datos', decision: 'Omitido' },
  ],
});

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Yahoo Finance, históricos diarios de 300274.SZ, 510300.SS (ETF del CSI 300) y 159915.SZ (ETF de ChiNext), hasta el 16-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://finance.yahoo.com/quote/300274.SZ' },
  { id: 2, titulo: 'MarketScreener: estimaciones de consenso 2026-2028 de Sungrow (ventas, EBITDA, EBIT, beneficio, BPA, dividendo)', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-16', url: 'https://www.marketscreener.com/quote/stock/SUNGROW-POWER-SUPPLY-CO-L-11367321/finances/' },
  { id: 3, titulo: 'MarketScreener: consenso de 20 analistas, objetivo medio 146,50 CNY (máx. 230,72, mín. 77,00) y cambios de objetivo recientes', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-15', url: 'https://www.marketscreener.com/quote/stock/SUNGROW-POWER-SUPPLY-CO-L-11367321/consensus/' },
  { id: 4, titulo: 'Kaiyuan Securities: «H1 业绩同比承压，Q2 盈利环比改善» (beneficio 2026-2028e de 12.952/16.199/18.701 M CNY)', editor: 'Kaiyuan Securities (开源证券)', tipo: 'Analistas', fecha: '2026-08-31', url: 'https://pdf.dfcfw.com/pdf/H3_AP202609011828888466_1.pdf' },
  { id: 5, titulo: 'Yahoo Finance: capitalización, PER adelantado, ventas, EBITDA, beneficio, deuda y caja de los comparables (fichas del 16-oct-2026)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://finance.yahoo.com' },
  { id: 6, titulo: 'Curva de rendimientos de la deuda pública china (中债国债收益率曲线), 15-oct-2026: 10 años 1,6601 %', editor: 'ChinaBond (中央国债登记结算)', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://yield.chinabond.com.cn/' },
  { id: 7, titulo: 'Tipos de cambio de referencia del euro, 15-oct-2026 (CNY 7,4993; USD 1,1208)', editor: 'Banco Central Europeo', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml' },
  { id: 8, titulo: 'Implied ERP by month (ERPbymonth.xlsx): prima implícita del S&P 500, octubre de 2026 (4,20 %)', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 9, titulo: 'CNINFO: calendario de publicación de informes periódicos (预约披露), informe del 3T26 de 300274 previsto para el 30-oct-2026', editor: 'CNINFO (巨潮资讯)', tipo: 'Primaria', fecha: '2026-10-16', url: 'http://www.cninfo.com.cn/new/information/getPrbookInfo' },
  { id: 10, titulo: 'HKEXnews: buscador de valores cotizados (Sungrow no tiene acciones H cotizadas; el código 03661 corresponde a SG Micro)', editor: 'Hong Kong Exchanges and Clearing', tipo: 'Primaria', fecha: '2026-10-16', url: 'https://www1.hkexnews.hk/search/prefix.do?lang=EN&type=A&name=sungrow&market=SEHK' },
  { id: 11, titulo: 'Informe semestral 2026 (CAS): balance a 30-jun-2026 para el puente (caja, deuda, minoritarios, asociadas, pasivos de rescate) y acciones en circulación sin autocartera (2.057,5 M)', editor: 'Sungrow Power Supply Co., Ltd. (CNINFO)', tipo: 'Primaria', fecha: '2026-08-29', url: `${CN}/2026-08-29/1225526948.PDF` },
];
const id = bolsa.identificacion;
const comps = [
  { nombre: 'Ningbo Deye', ticker: '605117.SS', pais: 'CN', capitalizacion: 91091, ev_ventas: 5.07, ev_ebitda_ltm: 16.6, ev_ebitda_ntm: null, per_ntm: 12.5, crecimiento_pct: null, margen_ebitda_pct: 30.6, roic_pct: null, dn_ebitda: -0.6, fcf_yield_pct: 5.6 },
  { nombre: 'Ginlong (Solis)', ticker: '300763.SZ', pais: 'CN', capitalizacion: 19216, ev_ventas: 3.69, ev_ebitda_ltm: 15.3, ev_ebitda_ntm: null, per_ntm: null, crecimiento_pct: null, margen_ebitda_pct: 24.0, roic_pct: null, dn_ebitda: 4.0, fcf_yield_pct: 7.6 },
  { nombre: 'GoodWe', ticker: '688390.SS', pais: 'CN', capitalizacion: 11954, ev_ventas: 1.06, ev_ebitda_ltm: 18.3, ev_ebitda_ntm: null, per_ntm: null, crecimiento_pct: null, margen_ebitda_pct: 5.8, roic_pct: null, dn_ebitda: -0.4, fcf_yield_pct: 6.8 },
  { nombre: 'Sineng Electric', ticker: '300827.SZ', pais: 'CN', capitalizacion: 13650, ev_ventas: 1.87, ev_ebitda_ltm: 17.8, ev_ebitda_ntm: null, per_ntm: null, crecimiento_pct: null, margen_ebitda_pct: 10.5, roic_pct: null, dn_ebitda: -2.8, fcf_yield_pct: 1.2 },
  { nombre: 'Kehua Data', ticker: '002335.SZ', pais: 'CN', capitalizacion: 19078, ev_ventas: 2.37, ev_ebitda_ltm: 14.8, ev_ebitda_ntm: null, per_ntm: null, crecimiento_pct: null, margen_ebitda_pct: 16.0, roic_pct: null, dn_ebitda: 0.5, fcf_yield_pct: 9.4 },
  { nombre: 'CATL', ticker: '300750.SZ', pais: 'CN', capitalizacion: 1281748, ev_ventas: 2.05, ev_ebitda_ltm: 7.8, ev_ebitda_ntm: null, per_ntm: 10.8, crecimiento_pct: null, margen_ebitda_pct: 26.3, roic_pct: null, dn_ebitda: -1.6, fcf_yield_pct: 5.8 },
  { nombre: 'Enphase Energy', ticker: 'ENPH', pais: 'US', capitalizacion: 27251, ev_ventas: 3.62, ev_ebitda_ltm: 19.4, ev_ebitda_ntm: null, per_ntm: 14.2, crecimiento_pct: null, margen_ebitda_pct: 18.7, roic_pct: null, dn_ebitda: 3.0, fcf_yield_pct: 1.9 },
  { nombre: 'Fluence Energy', ticker: 'FLNC', pais: 'US', capitalizacion: 8375, ev_ventas: 0.36, ev_ebitda_ltm: null, ev_ebitda_ntm: null, per_ntm: null, crecimiento_pct: null, margen_ebitda_pct: -2.7, roic_pct: null, dn_ebitda: null, fcf_yield_pct: 0.0 },
];
guarda('D', {
  _estado: 'completa',
  identificacion: {
    nombre: 'Sungrow Power Supply Co., Ltd. (阳光电源股份有限公司)', nombre_corto: 'Sungrow', ticker: '300274', isin: 'CNE1000018M7', mercado: 'Bolsa de Shenzhen, ChiNext (acción A, CNY)', indice_referencia: 'CSI 300',
    pais: 'China', pais_iso: 'CN', sector: 'Industrials', industria: 'Electrical Components & Equipment', sede: 'Hefei (Anhui)', fundacion: '1997', empleados: 19006, web: 'https://en.sungrowpower.com',
    precio: id.precio, fecha_precio: id.fecha_precio, acciones: 2057.5, capitalizacion_publicada: 159347, free_float_pct: 69.0,
    max_52s: id.max_52s, min_52s: id.min_52s, volumen_medio_diario: '≈ 5.100 M CNY/día (3 meses)', proximos_resultados: '2026-10-30',
  },
  consenso: {
    guidance: 'Sungrow no publica guía de ventas ni de beneficio [11]. Lo más parecido: dividendo del 25 % del beneficio (a cuenta del 1S26: 0,64 CNY) y recompra de 500-1.000 M para incentivos [11]. La dirección habla de cartera de pedidos de almacenamiento «llena» para el 2S26 según el informe de Kaiyuan, sin cifras [4].',
    estimaciones: [
      { periodo: '2026e', ingresos: 90823, ebitda: 16925, ebit: 15927, bpa: 6.588, dpa: 1.555, fuente: 'MarketScreener (consenso; parte de las estimaciones son anteriores al 1S26) [2]' },
      { periodo: '2027e', ingresos: 106884, ebitda: 19333, ebit: 18397, bpa: 7.702, dpa: 1.688, fuente: 'MarketScreener [2]' },
      { periodo: '2028e', ingresos: 121253, ebitda: 22062, ebit: 20846, bpa: 8.694, dpa: 1.848, fuente: 'MarketScreener [2]' },
    ],
    recomendaciones: { n_analistas: 20, comprar: null, mantener: null, vender: null, po_medio: 146.5, po_min: 77.0, po_max: 230.72 },
    revisiones: 'Las estimaciones van a la baja desde abril: Nomura bajó a Neutral con objetivo de 120 CNY (desde 230) el 28-abr tras el 4T25; Jefferies recortó de 236,35 a 201,13 CNY el 1-sep tras el 1S26; Kaiyuan rebajó el beneficio de 2026-2028 un 16-19 % (de 15.473/19.347/23.084 M a 12.952/16.199/18.701 M) [3, 4]. El consenso de MarketScreener (ventas 2026e de 90.823 M, beneficio de 13.681 M) no recoge del todo la caída del 1S26: con 30.912 M de ventas en el semestre, llegar a 90.823 M exigiría 59.911 M en el 2S, un 31 % más que el 2S25 [2, 11].',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    ...bolsa.bolsa,
    posicion_corta_pct: null,
    comentario: null,
  },
  multiplos_historicos: {
    serie: [
      { anio: '2021', precio_cierre: 104.14, ev_ebitda_ntm: null, per_ntm: null, excluir: true },
      { anio: '2022', precio_cierre: 79.86, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2023', precio_cierre: 62.56, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2024', precio_cierre: 73.83, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2025', precio_cierre: 171.04, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
    ],
    comentario: null,
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Fabricantes cotizados de inversores (Deye, Ginlong, GoodWe, Sineng, Enphase), de alimentación y almacenamiento (Kehua), integradores de almacenamiento (Fluence) y el primer fabricante de celdas, que también vende sistemas (CATL). Huawei y Tesla Energy, los dos grandes rivales, no cotizan por separado. SolarEdge y SMA quedan fuera: SolarEdge en pérdidas (PER sin sentido) y SMA sin capitalización ni deuda fiables en la fuente del día. Solo cuatro tienen PER de los próximos doce meses (Deye, CATL, Enphase y, sin él, el resto); los chinos pequeños no tienen consenso gratuito.',
    empresas: comps,
    comentario: null,
    confianza: 'Media',
  },
  transacciones: null,
  fuentes: fD,
  huecos: [
    { seccion: 'transacciones', campo: 'sección completa', tipo: 'Complemento', intentos: '1) Folleto de Hong Kong: no recoge operaciones del sector; 2) búsquedas de compras de fabricantes de inversores y almacenamiento con múltiplo publicado (venta de los inversores de ABB a Fimer en 2020, Saft por Total en 2016): sin múltiplos de EBITDA publicados y perímetros distintos; 3) prensa sectorial (pv magazine, Energy-Storage.news): operaciones pequeñas sin cifras', decision: 'Omitido' },
    { seccion: 'bolsa', campo: 'posicion_corta_pct', tipo: 'Complemento', intentos: '1) Bolsa de Shenzhen (préstamo de valores): la web no abre desde el entorno (error TLS); 2) CNINFO: no publica cortos; 3) proveedores gratuitos: sin dato', decision: 'Omitido' },
  ],
});

// ---------------------------------------------------------------- E. Sentimiento
guarda('E', {
  _estado: 'completa',
  sentimiento: null,
  fuentes: [],
  huecos: [
    { seccion: 'sentimiento', campo: 'sección completa', tipo: 'Complemento', intentos: '1) Foro de Eastmoney (guba.eastmoney.com/list,300274): devuelve una página de verificación antibot sin mensajes; 2) Stocktwits (API de 300274.SZ: «Symbol not found») y Xueqiu (sin acceso sin sesión); 3) Huxiu (artículo del 1-may-2026) y Wallstreetcn (28-ago-2026): artículos de opinión sin comentarios de lectores visibles', decision: 'Omitido' },
  ],
});
console.log('Notas A-E escritas en', dir);
