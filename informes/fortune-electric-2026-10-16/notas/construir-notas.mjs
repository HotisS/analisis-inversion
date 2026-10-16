// Escribe las notas A-E de Fortune Electric (華城電機, 1519.TW; corte 2026-10-16) a partir de los documentos de notas/docs
// (informe anual 2025 en inglés, estados consolidados auditados 2021-2025, semestral 2T26 en chino, prensa taiwanesa, consenso FactSet vía Anue
// y StockAnalysis). Cuentas en millones de TWD (NIIF adoptadas en Taiwán). BPA y DPA reexpresados sobre 347,47 M de acciones
// (ampliación gratuita 1:10 del 5-ago-2026). Cada nota cita solo con [n] de su propia lista. Ejecutar: node notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => {
  let txt = JSON.stringify(obj, null, 2);
  txt = txt.replace(/\[([A-E]\d+(?:[,–-]\s*[A-E]?\d+)*)\]/g, (m, dentro) => {
    const otras = (dentro.match(/[A-E]/g) || []).filter((l) => l !== letra);
    if (otras.length) console.warn(`${letra}: cita a otra nota ${m}`);
    return '[' + dentro.replace(new RegExp(letra, 'g'), '') + ']';
  });
  fs.writeFileSync(path.join(dir, `${letra}.json`), txt + '\n', 'utf8');
};
const TW = 'https://doc.twse.com.tw/server-java/t57sb01?step=9&kind=A&co_id=1519&filename=';
const ACC = 347.47; // acciones tras la ampliación gratuita del 5-ago-2026
const r2 = (x) => Math.round(x * 100) / 100;

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: '2025 Annual Report (inglés): actividad, ventas por producto y destino, cuotas de mercado, capacidad, clientes principales, plantilla y plan de inversiones', editor: 'Fortune Electric Co., Ltd.', tipo: 'Primaria', fecha: '2026-06-12', url: 'https://doc.twse.com.tw/pdf/2025_1519_20260612FE4.pdf' },
  { id: 2, titulo: 'Consolidated Financial Statements 2025 and 2024 with Independent Auditors’ Report (Deloitte; inglés): cuenta, balance, flujos, segmentos, clientes principales, arrendamientos y deuda', editor: 'Fortune Electric Co., Ltd. (MOPS / TWSE)', tipo: 'Primaria', fecha: '2026-03', url: TW + '202504_1519_AIA.pdf' },
  { id: 3, titulo: 'Consolidated Financial Statements 2023 and 2022 (Deloitte; inglés)', editor: 'Fortune Electric Co., Ltd. (MOPS / TWSE)', tipo: 'Primaria', fecha: '2024-03', url: TW + '202304_1519_AIA.pdf' },
  { id: 4, titulo: 'Consolidated Financial Statements 2022 and 2021 (Deloitte; inglés): pérdida de control de Fortune Electric Value y plusvalía de 468,3 M', editor: 'Fortune Electric Co., Ltd. (MOPS / TWSE)', tipo: 'Primaria', fecha: '2023-03', url: TW + '202204_1519_AIA.pdf' },
  { id: 5, titulo: '合併財務報告 115年第2季 (estados consolidados a 30-jun-2026, revisión limitada de Deloitte; chino): balance, cuenta, flujos, segmentos, dividendo a pagar', editor: 'Fortune Electric Co., Ltd. (MOPS / TWSE)', tipo: 'Primaria', fecha: '2026-08-10', url: TW + '202602_1519_AI1.pdf' },
  { id: 6, titulo: '華城 2026上半年財報解析 (margen bruto del 1S26 del 43,55 %, retrasos de entregas a EE. UU., 2S mejor que el 1S)', editor: 'UAnalyze (優分析)', tipo: 'Prensa', fecha: '2026-08', url: 'https://uanalyze.com.tw/articles/7254553096' },
  { id: 7, titulo: '華城 9月營收 (ventas de septiembre de 2.028,5 M TWD, +7,2 %; tercer trimestre +2,8 %)', editor: 'Anue 鉅亨網', tipo: 'Prensa', fecha: '2026-10-09', url: 'https://news.cnyes.com/news/id/6628415' },
  { id: 8, titulo: '華城 (1519) 每月營收: serie mensual de ventas 2024-2026', editor: 'HiStock 嗨投資', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://histock.tw/stock/1519/%E6%AF%8F%E6%9C%88%E7%87%9F%E6%94%B6' },
  { id: 9, titulo: 'Fortune Electric (TPE: 1519): cuenta trimestral 3T24-2T26', editor: 'Stock Analysis (S&P Global Market Intelligence)', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://stockanalysis.com/quote/tpe/1519/financials/?p=quarterly' },
  { id: 10, titulo: '華城 2025年報解析 (exportación del 55 % de las ventas, gastos comerciales por aranceles, Stargate)', editor: 'UAnalyze (優分析)', tipo: 'Prensa', fecha: '2026-03', url: 'https://uanalyze.com.tw/articles/8853548792' },
  { id: 11, titulo: '華城訂單滿手 產能將增3成 (ampliación de Guanyin 3B en 2026, +30 % de capacidad; fábrica de Taichung en 2027)', editor: 'Yahoo奇摩股市', tipo: 'Prensa', fecha: '2026', url: 'https://tw.stock.yahoo.com/news/%E8%8F%AF%E5%9F%8E%E8%A8%82%E5%96%AE%E6%BB%BF%E6%89%8B-%E7%94%A2%E8%83%BD%E5%B0%87%E5%A2%9E3%E6%88%90-201000905.html' },
];
const g = (com, rd, ecl) => Math.round((com + rd + ecl) * 10) / 10;
const fila = (periodo, ingresos, coste, gg, amort, ebit, nonop, bai, imp, mino, neto, gfin, dpaTotal) => ({
  periodo, ingresos, coste_ventas: coste, gastos_generales: gg, ebitda: Math.round((ebit + amort) * 10) / 10, amortizaciones: amort, ebit,
  resultado_financiero: nonop, bai, impuestos: imp, minoritarios: mino, beneficio_neto: neto, gastos_financieros: gfin,
  participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: r2(neto / ACC), dpa: r2(dpaTotal / ACC), dpa_extraordinario: 0, acciones_diluidas: ACC,
});
// dpaTotal = dividendo en efectivo con cargo al ejercicio (importe total pagado al año siguiente), en M TWD, repartido sobre la base actual.
const cuenta = [
  fila('2021', 9020.1, 7613.2, 1014.9, 139.9, 392.0, -26.1, 365.9, 78.4, -2.4, 289.9, 30.6, 261.1),
  fila('2022', 7750.7, 6163.1, g(1033.9, 148.3, -23.8), 150.0, 429.2, 520.6, 949.8, 127.5, -15.9, 838.2, 46.9, 652.6),
  fila('2023', 13899.7, 9565.7, g(1282.1, 214.5, -16.1), 172.5, 2853.6, 218.5, 3072.1, 510.3, -15.5, 2577.3, 49.3, 1566.4),
  fila('2024', 20202.8, 12818.1, g(2162.1, 329.9, 2.2), 228.0, 4890.5, 548.8, 5439.3, 1168.3, -15.0, 4286.0, 37.8, 2584.5),
  fila('2025', 24423.1, 14537.7, g(4177.0, 398.0, 83.2), 357.5, 5227.2, 381.9, 5609.1, 1242.0, -52.3, 4419.4, 47.1, 3474.7),
];
const balance = [
  { periodo: '2021', activo_total: 9922.4, activo_corriente: 7343.1, pasivo_corriente: 4896.6, pasivo_total: 6402.7, fondo_comercio: null, intangibles: 41.3, inmovilizado_material: 1993.4, existencias: 2731.2, clientes: 2661.5, proveedores: 2351.2, activos_contrato: 1418.1, pasivos_contrato: 495.4, caja: 169.0, deuda_financiera: 2639.6, arrendamientos: 123.3, patrimonio_neto: 3479.0, minoritarios: 40.7, reservas: 902.5 },
  { periodo: '2022', activo_total: 11700.4, activo_corriente: 9117.7, pasivo_corriente: 6410.6, pasivo_total: 7435.2, fondo_comercio: null, intangibles: 56.5, inmovilizado_material: 1976.7, existencias: 4204.8, clientes: 2142.1, proveedores: 2149.8, activos_contrato: 1457.8, pasivos_contrato: 1572.1, caja: 595.6, deuda_financiera: 2758.1, arrendamientos: 131.4, patrimonio_neto: 4143.7, minoritarios: 121.6, reservas: 1505.9 },
  { periodo: '2023', activo_total: 15246.8, activo_corriente: 12566.8, pasivo_corriente: 8777.4, pasivo_total: 9114.2, fondo_comercio: null, intangibles: 66.4, inmovilizado_material: 2080.6, existencias: 5441.3, clientes: 2468.8, proveedores: 3343.0, activos_contrato: 2037.3, pasivos_contrato: 2855.5, caja: 1737.5, deuda_financiera: 489.7, arrendamientos: 143.2, patrimonio_neto: 6026.5, minoritarios: 106.1, reservas: 3417.6 },
  { periodo: '2024', activo_total: 21869.4, activo_corriente: 18137.6, pasivo_corriente: 11143.6, pasivo_total: 13095.5, fondo_comercio: null, intangibles: 67.0, inmovilizado_material: 2283.4, existencias: 7597.6, clientes: 3809.8, proveedores: 4349.8, activos_contrato: 3178.9, pasivos_contrato: 5001.7, caja: 2480.9, deuda_financiera: 35.0, arrendamientos: 541.9, patrimonio_neto: 8682.8, minoritarios: 91.1, reservas: 5889.9 },
  { periodo: '2025', activo_total: 28210.8, activo_corriente: 21541.0, pasivo_corriente: 13013.7, pasivo_total: 17390.6, fondo_comercio: null, intangibles: 60.9, inmovilizado_material: 3221.6, existencias: 8333.5, clientes: 4582.1, proveedores: 3479.9, activos_contrato: 1936.4, pasivos_contrato: 7533.0, caja: 4795.8, deuda_financiera: 754.0, arrendamientos: 2119.8, patrimonio_neto: 10583.2, minoritarios: 237.0, reservas: 7413.4 },
];
const flujos = [
  { periodo: '2021', flujo_operativo: -438.0, capex: 93.5, pagos_arrendamientos: 12.4, adquisiciones: 0, desinversiones: 0, dividendos: 339.4, recompras: 0, emision_acciones: 45.0, intereses_en_financiacion: 0 },
  { periodo: '2022', flujo_operativo: 837.8, capex: 174.8, pagos_arrendamientos: 13.7, adquisiciones: 0, desinversiones: 0, dividendos: 261.1, recompras: 0, emision_acciones: 180.0, intereses_en_financiacion: 0 },
  { periodo: '2023', flujo_operativo: 4281.3, capex: 183.5, pagos_arrendamientos: 23.6, adquisiciones: 0, desinversiones: 0, dividendos: 652.6, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: '2024', flujo_operativo: 3444.8, capex: 513.3, pagos_arrendamientos: 50.8, adquisiciones: 0, desinversiones: 0, dividendos: 1566.4, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: '2025', flujo_operativo: 5961.5, capex: 1273.0, pagos_arrendamientos: 93.3, adquisiciones: 0, desinversiones: 0, dividendos: 2584.5, recompras: 0, emision_acciones: 244.8, intereses_en_financiacion: 0 },
];
const segmentos = [
  { nombre: 'Equipos eléctricos', descripcion: 'Transformadores de potencia (hasta muy alta tensión) y de distribución, cuadros y aparamenta de media y baja tensión; para Taipower, renovables, industria y, desde 2023, exportación a EE. UU. (eléctricas y centros de datos).', tipo_resultado: 'Resultado de segmento (antes de gastos generales)', historico: [
    { periodo: '2022', ingresos: 7241.7, resultado: 769.9 }, { periodo: '2023', ingresos: 12635.3, resultado: 3228.1 },
    { periodo: '2024', ingresos: 18814.0, resultado: 5418.6 }, { periodo: '2025', ingresos: 23033.2, resultado: 6054.5 }] },
  { nombre: 'Obra llave en mano', descripcion: 'Ingeniería y montaje de subestaciones y obras eléctricas, sobre todo en Taiwán.', tipo_resultado: 'Resultado de segmento (antes de gastos generales)', historico: [
    { periodo: '2022', ingresos: 509.0, resultado: -73.3 }, { periodo: '2023', ingresos: 1264.5, resultado: 107.0 },
    { periodo: '2024', ingresos: 1388.8, resultado: 200.8 }, { periodo: '2025', ingresos: 1389.9, resultado: 91.1 }] },
];
const A = {
  _estado: 'completa',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 24140.6, ebitda: 5497.7, ebit: 5050.0, beneficio_neto: 4828.4, bpa: r2(4828.4 / ACC), dpa: r2(3474.7 / ACC), dpa_extraordinario: 0, fcf: 5412.2, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [
      { periodo: '2022', descripcion: 'Pérdida de control de Fortune Electric Value (recarga de vehículos eléctricos): plusvalía no operativa de 468,3 M TWD y salida neta de caja de 72,1 M [4]. En 2025 la filial vuelve a consolidarse con el 60,95 % [2].' },
    ],
    comentario: 'Las ventas pasaron de 9.020 M TWD en 2021 a 24.423 M en 2025 (+28 % anual; +47 % anual desde el valle de 2022), por la exportación de transformadores a EE. UU., donde falta capacidad, y por el plan de red de Taipower [1, 2]. El margen bruto saltó del 15,6 % (2021) al 31,2 % (2023) y al 40,5 % (2025): precio y mezcla de transformadores de potencia [2, 3]. El beneficio de explotación pasó de 392 M a 5.227 M, aunque en 2025 los gastos comerciales y generales casi se duplicaron (4.177 M frente a 2.162 M) por fletes, aranceles de EE. UU. compartidos con clientes y comisiones de exportación [2, 10]. 2026 es un año de pausa: ventas de nueve meses −0,7 % (retrasos de entregas a EE. UU.) con margen bruto del 43,55 % en el 1S26, +5,1 puntos [6-8].',
    ajustes: 'Usamos las cifras publicadas. El BPA y el DPA de todos los años están reexpresados sobre 347,47 M de acciones, la base tras la ampliación gratuita 1:10 del 5-ago-2026, para que se comparen con el precio de hoy; el BPA publicado de 2025 era 13,99 TWD sobre 315,9 M [2, 5]. El DPA es el dividendo en efectivo con cargo a cada ejercicio (importe total pagado al año siguiente) repartido sobre esa base: 2025, 11 TWD por acción antigua (3.474,7 M), pagado en agosto de 2026 [5]. El resultado no operativo de 2022 incluye 468,3 M de plusvalía por la pérdida de control de una filial: no se repite [4]. Los minoritarios son pérdidas (filiales de recarga, hidrógeno y un centro comercial en obra) y suman al beneficio atribuido [2]. La amortización incluye la de derechos de uso.',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '3T24', ingresos: 5356.9, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 3.54, vs_consenso: null },
      { periodo: '4T24', ingresos: 7162.6, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 4.5, vs_consenso: null },
      { periodo: '1T25', ingresos: 4421.3, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 2.48, vs_consenso: null },
      { periodo: '2T25', ingresos: 6073.4, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 2.28, vs_consenso: null },
      { periodo: '3T25', ingresos: 5831.8, crecimiento_pct: 8.9, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 3.14, vs_consenso: null },
      { periodo: '4T25', ingresos: 8096.6, crecimiento_pct: 13.0, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 4.83, vs_consenso: null },
      { periodo: '1T26', ingresos: 4756.5, crecimiento_pct: 7.6, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 2.99, vs_consenso: null },
      { periodo: '2T26', ingresos: 5455.7, crecimiento_pct: -10.2, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 2.94, vs_consenso: 'Inferior' },
      { periodo: '3T26 (solo ventas)', ingresos: 5994.8, crecimiento_pct: 2.8, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: null },
    ],
    ultima_presentacion: 'La empresa no da guía numérica. Con los resultados del 1S26 (10-ago) explicó que las ventas del semestre cayeron un 1,4 % por retrasos de entregas a EE. UU. (calendarios de obra de clientes y despacho en aduana), que el margen bruto subió al 43,55 % por la mezcla de transformadores de potencia y que el segundo semestre será mejor que el primero [5, 6]. La cartera de pedidos supera los 30.000 M TWD, con visibilidad hasta 2029 y plazos de entrega de 2,5-3 años para exportación (2 años para Taipower); la ligada a centros de datos de IA es de unos 22.000 M [6, 11]. Las ventas del 3T26 (5.994,8 M, +2,8 %) todavía no muestran la aceleración [7, 8]; los trimestres de 2024-2025 vienen de la cuenta trimestral de Stock Analysis, cuadrada con los semestrales [5, 9]. El consejo del 3T26 será a mediados de noviembre.',
    confianza: 'Media',
  },
  balance: {
    historico: balance,
    vencimientos: [{ anio: '2026-27 (corto plazo)', importe: 560 }, { anio: '2027 en adelante (largo plazo)', importe: 130 }],
    liquidez: 'Caja de 7.162,3 M TWD a 30-jun-2026, más 555,6 M de depósitos a plazo en activos financieros a coste amortizado, frente a 690 M de deuda bancaria [5]. De esa caja salieron en agosto 3.474,7 M de dividendo, que a 30-jun figuraba como dividendo a pagar [5].',
    rating: 'Sin rating público.',
    coste_deuda_pct: 2.0,
    vida_media_anios: null,
    otros_pasivos: 'Arrendamientos de 2.142,1 M TWD a 30-jun-2026 (2.119,8 M a fin de 2025, desde 541,9 M en 2024): sobre todo el suelo arrendado para la fábrica nueva de muy alta tensión en Taichung; NIIF 16, van al puente [2, 5]. Pasivos de contrato (anticipos de clientes) de 9.313,7 M, de ellos 3.874,7 M a más de un año: financian el circulante y caerían si los pedidos frenan [5]. Otros pasivos corrientes incluyen 1.114,4 M de «cobros provisionales» que inflan el flujo operativo del 1S26 [5]. Plan de pensiones de prestación definida pequeño [2].',
    comentario: 'El balance pasó de una deuda neta de 2.471 M TWD en 2021 a una caja neta de 4.042 M en 2025 (6.472 M en junio de 2026 antes del dividendo de agosto), financiado por el beneficio y por los anticipos de clientes: los pasivos de contrato subieron de 495 M a 9.314 M [2, 5]. El circulante comercial neto (existencias + clientes + activos de contrato − proveedores − anticipos) bajó del 26 % de las ventas en 2024 al 15,7 % en 2025 y a ~11 % en junio de 2026: mientras falten transformadores los clientes pagan por adelantado, pero es circulante prestado que se devolvería en una caída [2, 5]. Existencias de 10.316 M (≈ 5 meses de ventas) por la cartera de pedidos [5].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'De 2021 a 2025 el flujo operativo sumó 14.087 M TWD frente a 12.411 M de beneficio atribuido (114 %), con 2023 muy alto (4.281 M) por el salto de los anticipos de clientes [2-4]. 2021 fue negativo (−438 M) porque las existencias y los activos de contrato crecieron con pedidos de renovables [4]. El capex se multiplicó: de 94-184 M en 2021-2023 a 513 M en 2024 y 1.273 M en 2025 (5,2 % de las ventas), más ~1.580 M de altas de derechos de uso en 2025 (suelo de Taichung) que no pasan por caja [2]. En el 1S26 el flujo operativo fue de 3.497 M, inflado por 1.114 M de cobros provisionales; el capex, de 896 M [5]. Las entradas de minoritarios (45 M, 180 M y 244,8 M) son aportaciones a filiales de recarga, hidrógeno y el centro comercial [2, 4]. Intereses pagados dentro del flujo operativo (47 M en 2025) [2].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'Deloitte & Touche (Taiwán)', anios_auditor: null, opinion: 'Favorable',
    comentario: 'Cuentas consolidadas en NIIF adoptadas en Taiwán, auditadas por Deloitte sin salvedades; el semestral de 2026 tiene revisión limitada [2, 5]. Cuestión clave de auditoría de 2025: el reconocimiento de ingresos de clientes nuevos entre los diez primeros (18 % de las ventas), por el riesgo de corte de período en exportaciones [2]. Las pérdidas crediticias esperadas pasaron de reversiones (2022-2023) a una dotación de 83,2 M en 2025 [2]. No capitaliza I+D (398 M en 2025, 1,6 % de las ventas) [2]. Tres cosas distorsionan la lectura: la plusvalía de 2022 (468 M, no operativa), los anticipos de clientes que inflan la caja y el flujo operativo, y el BPA publicado de cada año en una base de acciones distinta por las ampliaciones gratuitas anuales [2-5].',
    senales: [
      { senal: 'Clientes nuevos con el 18 % de las ventas (cuestión clave de auditoría)', nivel: 'Media', comentario: 'Exportaciones a clientes recién llegados de EE. UU.; Deloitte revisó el corte de período [2].' },
      { senal: 'Anticipos de clientes de 9.314 M (38 % de las ventas)', nivel: 'Media', comentario: 'Flujo operativo y caja dependen de que sigan entrando pedidos; en una caída se devuelven en circulante [5].' },
      { senal: 'Gastos comerciales +93 % en 2025', nivel: 'Media', comentario: 'Aranceles compartidos (30-40 % en envíos ya hechos), fletes y comisiones de exportación [2, 10].' },
      { senal: 'Plusvalía no operativa de 468 M en 2022', nivel: 'Baja', comentario: 'Pérdida de control de Fortune Electric Value; explicada en las notas [4].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Reparte en efectivo la mayor parte del beneficio y añade una ampliación gratuita de 1 acción por cada 10 cada año desde 2024: 11 TWD por acción antigua en efectivo con cargo a 2025 (3.474,7 M, 79 % del beneficio) más 1 TWD en acciones [2, 5]. No hay recompras. El capex sube para doblar capacidad en 2027-2028: 1.273 M en 2025 y 1.225 M previstos en 2026 según el informe anual, más la fábrica de Taichung (filial de muy alta tensión) para el 2T27 y la ampliación de Guanyin 3B en 2026 (+30 % de capacidad) [1, 11].',
    adquisiciones: [],
    comentario: 'En el negocio principal la asignación de capital es buena: la capacidad se amplía con caja propia y anticipos de clientes, sin deuda ni ampliaciones de capital, y el dividendo sube con el beneficio [1, 2]. Fuera de él hay tres proyectos que no encajan con un fabricante de transformadores: Fortune Nev, un centro comercial en obra (83,85 %, apertura prevista en el 2S27), Fortune Electric Value (recarga de vehículos eléctricos, 60,95 %, con pérdidas) y Foresee Energy (hidrógeno, proyecto BOT) [1, 2]. Son pequeños frente al grupo (los minoritarios pierden 52 M en 2025), pero apuntan a una familia que usa la sociedad cotizada para diversificar. Las ampliaciones gratuitas anuales no crean valor: solo multiplican el número de acciones.',
    confianza: 'Alta',
  },
  negocio: {
    segmentos,
    geografias: [
      { nombre: 'Norteamérica', peso_pct: 58.8 },
      { nombre: 'Taiwán', peso_pct: 40.1 },
      { nombre: 'Resto de Asia', peso_pct: 1.0 },
      { nombre: 'Otros', peso_pct: 0.1 },
    ],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Peso de la exportación en las ventas', valor_anterior: '45 % (2024)', valor_actual: '55 % (2025); >60 % esperado en 2026', variacion: '+10 pp', comentario: 'Casi toda a EE. UU.: eléctricas, renovables y centros de datos [1, 10].' },
      { kpi: 'Cartera de pedidos', valor_anterior: '>30.000 M TWD (feb-2025)', valor_actual: 'visibilidad hasta 2029; 22.000 M ligados a centros de datos (2026)', variacion: null, comentario: 'La empresa no publica la cifra total de forma periódica [6, 11].' },
      { kpi: 'Margen bruto', valor_anterior: '36,6 % (2024)', valor_actual: '40,5 % (2025); 43,55 % (1S26)', variacion: '+3,9 pp / +5,1 pp', comentario: 'Mezcla de transformadores de potencia de exportación [2, 6].' },
      { kpi: 'Cuota en transformadores de potencia vendidos en Taiwán (volumen)', valor_anterior: null, valor_actual: '60 % (2025)', variacion: null, comentario: 'Y >90 % de los exportados desde Taiwán; 30 % y >70 % en distribución [1].' },
      { kpi: 'Plantilla', valor_anterior: '1.294 (2024)', valor_actual: '1.509 (2025)', variacion: '+17 %', comentario: 'Sin filiales en el extranjero [1].' },
      { kpi: 'Primer cliente (probablemente Taipower)', valor_anterior: null, valor_actual: '22 % de las ventas (2025)', variacion: null, comentario: 'Tres clientes suman el 49 %; el cliente C creció un 325 % [2].' },
    ],
  },
  fuentes: fA,
  huecos: [
    { seccion: 'trimestres', campo: 'EBITDA trimestral y comparación con el consenso de cada trimestre', tipo: 'Complemento', intentos: '1) Estados semestrales (dan la amortización solo por semestre); 2) Stock Analysis (sin EBITDA trimestral fiable); 3) prensa (comparan con el año anterior, no con el consenso)', decision: 'Omitido' },
    { seccion: 'balance', campo: 'vida media de la deuda', tipo: 'Complemento', intentos: '1) Estados del 2T26 (préstamos bancarios a corto y un largo de 130 M sin calendario detallado); 2) informe anual (sin tabla de vencimientos); 3) MOPS (bloqueado)', decision: 'Omitido' },
    { seccion: 'calidad', campo: 'años de Deloitte como auditor', tipo: 'Complemento', intentos: '1) Informe anual 2025 (socios firmantes, no el año de entrada); 2) estados 2021-2025 (Deloitte en todos); 3) MOPS (bloqueado)', decision: 'Omitido' },
  ],
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: '2025 Annual Report (inglés): mercado de Taiwán y EE. UU., plan de red de Taipower, cuotas propias, competidores, capacidad e historia', editor: 'Fortune Electric Co., Ltd.', tipo: 'Primaria', fecha: '2026-06-12', url: 'https://doc.twse.com.tw/pdf/2025_1519_20260612FE4.pdf' },
  { id: 2, titulo: 'Power transformers and distribution transformers will face supply deficits of 30 % and 10 % in 2025', editor: 'Wood Mackenzie', tipo: 'Sectorial', fecha: '2025-08-14', url: 'https://www.woodmac.com/press-releases/power-transformers-and-distribution-transformers-will-face-supply-deficits-of-30-and-10-in-2025/' },
  { id: 3, titulo: 'US transformer supply may fall sharply in 2025, says Wood Mackenzie (demanda +116 % y +41 % desde 2019; importaciones del 80 % y 50 %)', editor: 'pv magazine', tipo: 'Prensa', fecha: '2025-08-15', url: 'https://www.pv-magazine.com/2025/08/15/us-transformer-supply-may-fall-sharply-in-2025-says-wood-mackenzie/' },
  { id: 4, titulo: 'US transformer market faces severe bottlenecks (precios +45-95 % desde 2019)', editor: 'Transformers Magazine', tipo: 'Sectorial', fecha: '2025', url: 'https://transformers-magazine.com/tm-news/us-transformer-market-faces-severe-bottlenecks/' },
  { id: 5, titulo: 'Power Transformer Market worth 41,62 mil M USD by 2030 (30,38 mil M en 2025, +6,5 % anual)', editor: 'MarketsandMarkets (GlobeNewswire)', tipo: 'Sectorial', fecha: '2025-09-29', url: 'https://www.globenewswire.com/news-release/2025/09/29/3157392/0/en/Power-Transformer-Market-Size-Projected-to-Grow-41-62-billion-by-2030-MarketsandMarkets.html' },
  { id: 6, titulo: 'Global transformers market to reach 89,34 mil M USD in 2030 (potencia 35,83 y distribución 53,51)', editor: 'GlobalData', tipo: 'Sectorial', fecha: '2025', url: 'https://www.globaldata.com/media/power/global-transformers-market-to-reach-89-34-billion-in-2030-led-by-asia-pacific-forecasts-globaldata/' },
  { id: 7, titulo: 'Stock Analysis: estadísticas de HD Hyundai Electric, Hyosung Heavy Industries, LS Electric, Hammond Power, WEG, Shihlin, Chung-Hsin, Allis y Siemens Energy (16-oct-2026)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://stockanalysis.com/quote/krx/267260/statistics/' },
  { id: 8, titulo: 'Consolidated Financial Statements 2025 (clientes principales, ventas por destino)', editor: 'Fortune Electric Co., Ltd. (MOPS / TWSE)', tipo: 'Primaria', fecha: '2026-03', url: TW + '202504_1519_AIA.pdf' },
  { id: 9, titulo: '華城訂單滿手 產能將增3成 (capacidad +30 %; competencia coreana en EE. UU.)', editor: 'Yahoo奇摩股市', tipo: 'Prensa', fecha: '2026', url: 'https://tw.stock.yahoo.com/news/%E8%8F%AF%E5%9F%8E%E8%A8%82%E5%96%AE%E6%BB%BF%E6%89%8B-%E7%94%A2%E8%83%BD%E5%B0%87%E5%A2%9E3%E6%88%90-201000905.html' },
  { id: 10, titulo: 'GE Vernova to fully acquire Prolec GE joint venture (ampliaciones de capacidad en Norteamérica)', editor: 'Prolec GE', tipo: 'Primaria', fecha: '2025-10', url: 'https://www.prolec.energy/news/ge-vernova-to-fully-acquire-prolec-ge-joint-venture/' },
];
const B = {
  _estado: 'completa',
  sector: {
    definicion: 'El mercado relevante es el de transformadores eléctricos (de potencia y de distribución) y equipos de red de media y alta tensión, en Taiwán y, sobre todo, en EE. UU., adonde va el 59 % de las ventas [1, 8]. GlobalData lo cifra en 89.340 M USD en 2030 en el mundo (35.830 M de potencia y 53.510 M de distribución) y MarketsandMarkets da 30.380 M USD en 2025 solo para potencia, con un +6,5 % anual hasta 2030 [5, 6]. Usamos el perímetro mundial de GlobalData (potencia + distribución) porque Fortune vende las dos cosas; para 2025 estimamos ~65.200 M USD descontando el 6,5 % anual (estimación propia).',
    tamano: '≈ 65.200 M USD en 2025 (estimación propia a partir de GlobalData y MarketsandMarkets); 89.340 M en 2030 [5, 6].',
    unidad_serie: 'millones de USD (transformadores de potencia y distribución, mundo)',
    serie: [{ anio: '2025e', tamano: 65200 }, { anio: '2030e', tamano: 89340 }],
    tcac_historico_pct: null, tcac_previsto_pct: 6.5, cr5_pct: null, estructura: 'Fragmentada',
    drivers: [
      { driver: 'Déficit de transformadores en EE. UU.', efecto: '+', horizonte: 'Cíclico', evidencia: 'Déficit de oferta del 30 % en potencia y del 10 % en distribución en 2025; demanda +116 % y +41 % desde 2019; el 80 % y el 50 % se importa [2, 3].' },
      { driver: 'Centros de datos de IA y electrificación', efecto: '+', horizonte: 'Estructural', evidencia: 'Cartera de Fortune ligada a centros de datos de ~22.000 M TWD; el DOE prevé un 7-8 % anual de demanda de transformadores [1].' },
      { driver: 'Plan de red de Taipower y renovables en Taiwán', efecto: '+', horizonte: 'Estructural', evidencia: 'Inversión de 564.500 M TWD en 10 años; objetivo del 60-70 % de renovables en 2050 [1].' },
      { driver: 'Precios unitarios', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Subidas del 45-95 % desde 2019 según tipo [4]; bajarían cuando entren las ampliaciones de capacidad (1.800 M USD anunciados en EE. UU. desde 2023) [2].' },
      { driver: 'Aranceles de EE. UU.', efecto: '−', horizonte: 'Cíclico', evidencia: 'Fortune comparte el 30-40 % del arancel en envíos ya hechos y pone cláusulas en los contratos nuevos [1, 9].' },
      { driver: 'Ampliaciones de capacidad de los rivales', efecto: '−', horizonte: 'Cíclico', evidencia: 'HD Hyundai, Hyosung, LS, Siemens Energy, Hitachi Energy y Prolec GE amplían fábricas en EE. UU. y México [9, 10].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Muchos fabricantes mundiales (Hitachi Energy, Siemens Energy, GE Vernova/Prolec, coreanos, Hammond, WEG); hoy la escasez la suaviza, pero todos amplían capacidad [7, 10].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Eléctricas y Taipower compran por concurso; tres clientes suman el 49 % de las ventas de Fortune [8]. Con plazos de 2-3 años, hoy aceptan anticipos y subidas.' },
      { fuerza: 'Poder de los proveedores', intensidad: 3, justificacion: 'Acero magnético de grano orientado y cobre, con pocos proveedores de acero eléctrico; el precio se repercute con retraso [1].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Homologación de cada eléctrica, ensayos de muy alta tensión y 2-3 años para levantar una fábrica; los grandes entran por ampliación [1, 2].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 1, justificacion: 'No hay sustituto del transformador en la red; la electrónica de potencia (transformadores de estado sólido) aún no compite en potencia [1].' },
    ],
    ciclo: { posicion: 'Expansión', comentario: 'El sector está en un pico de ciclo: escasez, plazos de 2-3 años, precios +45-95 % desde 2019 y anticipos de clientes [2, 4]. Los transformadores han tenido ciclos largos: tras el auge de 2005-2008, precios y márgenes cayeron casi una década. Fortune lo vivió: en 2021-2022 ganaba un margen de explotación del 4-6 % y en 2025 del 21 % [8]. La duda no es si la demanda sigue creciendo, sino qué pasa con precio y margen cuando lleguen las ampliaciones de capacidad en 2027-2029.' },
    regulacion: 'En Taiwán, Taipower compra por concurso público y fija las especificaciones; el plan de refuerzo de red de 2022 destina 564.500 M TWD en 10 años [1]. En EE. UU., la norma de eficiencia del DOE para transformadores de distribución (2024) eleva el contenido de acero eléctrico, y los aranceles de 2025 sobre importaciones de Taiwán (con exenciones parciales para equipos de red) se negocian contrato a contrato [1].',
    tendencias: 'La demanda crece por cuatro motivos a la vez: centros de datos de IA, renovables y almacenamiento con más transformadores elevadores, sustitución de una red envejecida en EE. UU. y electrificación [1-3]. A medio plazo, los grandes fabricantes amplían capacidad en Norteamérica y aparecen transformadores de estado sólido para centros de datos; la IA aparece sobre todo como demanda.',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 1.16,
    posicion: 'Primer fabricante de transformadores de Taiwán y primer exportador: según la empresa, el 60 % del volumen de transformadores de potencia vendidos en Taiwán y más del 90 % de los exportados; el 30 % y más del 70 % en distribución; ~10 % en cuadros [1]. En el mundo es un fabricante mediano: ~1,2 % del mercado de transformadores (estimación propia con ingresos del grupo) [5, 6].',
    competidores: [
      { nombre: 'HD Hyundai Electric', pais: 'Corea del Sur', ticker: '267260.KS', ingresos: 104203, cuota_pct: null, margen_ebit_pct: 25.7, comentario: 'Gran exportador de transformadores de potencia a EE. UU., con fábrica en Alabama [7].' },
      { nombre: 'Hyosung Heavy Industries', pais: 'Corea del Sur', ticker: '298040.KS', ingresos: 154067, cuota_pct: null, margen_ebit_pct: 12.8, comentario: 'Transformadores de potencia con fábrica en Memphis (EE. UU.) [7].' },
      { nombre: 'LS Electric', pais: 'Corea del Sur', ticker: '010120.KS', ingresos: 136814, cuota_pct: null, margen_ebit_pct: 9.4, comentario: 'Equipos de distribución y transformadores; centros de datos en EE. UU. [7].' },
      { nombre: 'Hammond Power Solutions', pais: 'Canadá', ticker: 'HPS-A.TO', ingresos: 24175, cuota_pct: null, margen_ebit_pct: 9.3, comentario: 'Transformadores secos y de distribución en Norteamérica [7].' },
      { nombre: 'Shihlin Electric', pais: 'Taiwán', ticker: '1503.TW', ingresos: 39145, cuota_pct: null, margen_ebit_pct: 11.7, comentario: 'Rival local en transformadores y aparamenta [7].' },
      { nombre: 'Chung-Hsin Electric & Machinery', pais: 'Taiwán', ticker: '1513.TW', ingresos: 27921, cuota_pct: null, margen_ebit_pct: 18.8, comentario: 'Rival local en transformadores de potencia y obras para Taipower [7].' },
      { nombre: 'Allis Electric', pais: 'Taiwán', ticker: '1514.TW', ingresos: 11323, cuota_pct: null, margen_ebit_pct: 10.3, comentario: 'Cuadros y transformadores de media tensión [7].' },
      { nombre: 'Hitachi Energy / Siemens Energy / GE Vernova (Prolec GE)', pais: 'Suiza-Japón / Alemania / EE. UU.', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Los tres grandes mundiales de la red, todos ampliando capacidad en Norteamérica [10].' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'No aplica a un fabricante de equipos.' },
        { fuente: 'Costes de cambio', puntuacion: 3, evidencia: 'Homologación con cada eléctrica y diseño a medida; una vez aprobado, el proveedor repite, pero cada pedido se concursa [1].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 2, evidencia: 'Homologaciones de muy alta tensión y 56 años de historial; I+D del 1,6 % de las ventas [1, 8].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Fábricas en Taiwán con costes de mano de obra por debajo de EE. UU. y escala local: margen de explotación del 21 % frente al 9-13 % de Hyosung, LS o Hammond [7, 8].' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: '60 % de los transformadores de potencia de Taiwán: un mercado local que no admite muchos fabricantes [1].' },
      ],
    },
    amenazas: 'Tres amenazas. La primera, la capacidad nueva de los rivales en EE. UU. y México a partir de 2027, que bajaría precios y plazos (probabilidad alta a 3 años) [2, 10]. La segunda, los aranceles de EE. UU. sobre productos de Taiwán, que favorecen a quien fabrica allí; Fortune no tiene fábrica en EE. UU. [1]. La tercera, que Taipower reparta más los concursos entre Shihlin y Chung-Hsin cuando estos amplíen capacidad (probabilidad media).',
    confianza: 'Media',
  },
  historia: {
    resumen: 'Fortune Electric (華城電機) se fundó en 1969 en Taoyuan como fabricante de transformadores y cuadros para el mercado taiwanés [1]. Durante décadas fue un proveedor de Taipower y de la industria local, con márgenes bajos. Desde 2019 empezó a exportar transformadores de potencia a EE. UU., y entre 2022 y 2025 las ventas se triplicaron con la escasez de transformadores allí [1, 8]. En 2025 entró en proyectos de centros de datos (incluido Stargate) y lanzó la fábrica de muy alta tensión de Taichung [1, 9].',
    hitos: [
      { anio: '1969', hito: 'Fundación en Taoyuan (Taiwán) [1].' },
      { anio: '2019', hito: 'Primeros pedidos grandes de transformadores de potencia para EE. UU. [1].' },
      { anio: '2023', hito: 'Ventas +79 % y margen de explotación del 20,5 % por la exportación [8].' },
      { anio: '2025', hito: 'Ventas de 24.423 M TWD; exportación del 55 %; primeros pedidos de centros de datos Stargate [1, 9].' },
      { anio: '2026', hito: 'Ampliación de Guanyin 3B (+30 % de capacidad); fábrica de Taichung prevista para el 2T27 [9].' },
    ],
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Lo material es la eficiencia de los transformadores (las pérdidas en la red) y el acero y el cobre que consumen, y la seguridad en fábricas y obras [1]. Fortune vende a renovables y a la red, lo que le da un perfil favorable en la transición energética; publica informe de sostenibilidad conforme a las normas de la bolsa de Taiwán [1].',
    controversias: 'No hemos encontrado sanciones, litigios relevantes ni accidentes graves en los últimos tres años en el informe anual ni en la prensa revisada [1].',
    confianza: 'Baja',
  },
  negocio: {
    descripcion: 'Fortune Electric diseña y fabrica transformadores de potencia (hasta muy alta tensión), transformadores de distribución, cuadros eléctricos y aparamenta de media y baja tensión, y hace obras llave en mano de subestaciones [1]. En 2025 los transformadores fueron el 73,6 % de las ventas, los cuadros el 7,3 %, las obras el 5,7 % y la aparamenta el 3,7 % [1]. Fabrica solo en Taiwán (Guanyin, Hukou y, desde 2027, Taichung) y exporta el 55 % de las ventas, casi todo a EE. UU. [1].',
    como_gana_dinero: 'Gana con cada transformador vendido: precio fijado al aceptar el pedido, coste de acero eléctrico, cobre y horas de fábrica [1]. Con la escasez, los pedidos se firman con 2-3 años de plazo, anticipos y precios mucho más altos que en 2019, lo que llevó el margen bruto del 16 % (2021) al 40-44 % (2025-2026) [8]. Los ingresos dependen de la capacidad de las fábricas (por eso crece a saltos al ampliar) y del precio medio; el margen, de la mezcla (potencia de exportación es lo más rentable) y del precio de las materias primas.',
    clientes: 'Concentrados: el primer cliente (probablemente Taipower) fue el 22 % de las ventas de 2025, el segundo el 14 % y el tercero el 13 %; los clientes nuevos entre los diez primeros sumaron el 18 % [8]. En EE. UU. vende a eléctricas, promotores de renovables y centros de datos, en parte a través de distribuidores. Poder de precios demostrado en el ciclo actual: subió el margen bruto 25 puntos en cuatro años y ahora pone cláusulas de arancel en los contratos [1, 8].',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'competencia', campo: 'CR5 del mercado mundial de transformadores', tipo: 'Complemento', intentos: '1) Informe anual (solo cuotas en Taiwán); 2) notas de prensa de GlobalData y MarketsandMarkets (sin cuotas); 3) Wood Mackenzie (sin cuotas públicas)', decision: 'Omitido' },
    { seccion: 'sector', campo: 'serie histórica del tamaño del mercado de transformadores', tipo: 'Complemento', intentos: '1) GlobalData (solo 2030 y APAC 2024); 2) MarketsandMarkets (solo potencia 2025-2030); 3) Grand View Research (cifras de pago)', decision: 'Calculado y marcado como estimación' },
    { seccion: 'esg', campo: 'calificaciones ESG (MSCI, Sustainalytics)', tipo: 'Complemento', intentos: '1) Informe anual 2025 (sin notas externas); 2) webs de MSCI y Sustainalytics (requieren registro); 3) prensa taiwanesa (sin dato)', decision: 'Omitido' },
  ],
};
guarda('B', B);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: '2025 Annual Report (inglés): consejo, dirección, participaciones, remuneración de consejeros y directivos, comisión de auditoría, principales accionistas, traspasos de acciones', editor: 'Fortune Electric Co., Ltd.', tipo: 'Primaria', fecha: '2026-06-12', url: 'https://doc.twse.com.tw/pdf/2025_1519_20260612FE4.pdf' },
  { id: 2, titulo: 'Consolidated Financial Statements 2025 (operaciones vinculadas, filiales y minoritarios)', editor: 'Fortune Electric Co., Ltd. (MOPS / TWSE)', tipo: 'Primaria', fecha: '2026-03', url: TW + '202504_1519_AIA.pdf' },
  { id: 3, titulo: 'Fortune Electric: propiedad de insiders e institucionales', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://stockanalysis.com/quote/tpe/1519/' },
  { id: 4, titulo: '華城 FactSet: consenso de BPA y objetivo (recortes desde mayo de 2026)', editor: 'Anue 鉅亨網', tipo: 'Prensa', fecha: '2026-09-23', url: 'https://news.cnyes.com/news/id/6614057' },
];
const C = {
  _estado: 'completa',
  directivos: {
    equipo: [
      { nombre: 'Hsu Bang-Fu (許邦福)', cargo: 'Presidente del consejo', desde: null, participacion_pct: 10.84, trayectoria: 'Cabeza de la familia fundadora; 4,04 % directo, 0,44 % de su cónyuge y 6,36 % mediante sociedades interpuestas. En feb-2026 traspasó 7,69 M de acciones a sus sociedades n.º 1 a 4 [1].' },
      { nombre: 'Hsu Shou-Hsiung (許守雄)', cargo: 'Vicepresidente del consejo', desde: null, participacion_pct: 12.11, trayectoria: '8,66 % directo y 3,45 % de su cónyuge; preside Hua Cheng Investment, que tiene el 9,22 % [1].' },
      { nombre: 'Hsu I-Te (許宜德)', cargo: 'Director general (presidente ejecutivo)', desde: null, participacion_pct: 0.75, trayectoria: 'Hijo del presidente. Bajo su dirección las ventas se han triplicado desde 2022. En mar-2025 traspasó 2,195 M de acciones a sociedades propias [1].' },
      { nombre: 'Hsu I-Sheng (許宜生)', cargo: 'Consejero delegado (CEO)', desde: null, participacion_pct: 1.24, trayectoria: 'Hijo del vicepresidente; lleva la operación y la exportación [1].' },
      { nombre: 'Hsu I-Ming', cargo: 'Vicedirector general', desde: null, participacion_pct: 1.02, trayectoria: 'Miembro de la familia [1].' },
      { nombre: 'Hsu I-Yang', cargo: 'Director financiero y de gobierno corporativo', desde: null, participacion_pct: 1.24, trayectoria: 'Miembro de la familia; la jefa de contabilidad es Chiu Hsu-Lan [1].' },
    ],
    historial_guidance: [
      { anio: '2025-2026', guia: 'No da guía numérica de ventas ni de márgenes; en 2026 anticipó un 2S mejor que el 1S y >60 % de exportación [1]', real: '3T26 +2,8 % interanual; nueve meses −0,7 %', cumplida: 'Parcial' },
    ],
    comentario: 'Empresa de familia: la familia Hsu controla en torno al 45-50 % del capital y ocupa la presidencia, la vicepresidencia, la dirección general, la consejería delegada, la vicedirección general y la dirección financiera [1, 3]. El resultado de esta generación es excelente (de 392 M a 5.227 M de beneficio de explotación en cuatro años), y la alineación con el accionista es alta por la participación. Lo flojo es la falta de contrapeso profesional y de guía numérica, y los proyectos ajenos al negocio (centro comercial, recarga, hidrógeno) [1, 2]. No hay plan de sucesión público.',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Hsu Bang-Fu', cargo: 'Presidente', tipo: 'Dominical', desde: '1979', comisiones: null },
      { nombre: 'Hsu Shou-Hsiung', cargo: 'Vicepresidente', tipo: 'Dominical', desde: '1969', comisiones: null },
      { nombre: 'Hsu I-Te', cargo: 'Consejero (director general)', tipo: 'Ejecutivo', desde: '2017', comisiones: null },
      { nombre: 'Hsu I-Sheng', cargo: 'Consejero (consejero delegado)', tipo: 'Ejecutivo', desde: '2011', comisiones: null },
      { nombre: 'Shu Yi-Cheun', cargo: 'Consejero', tipo: 'Dominical', desde: '2017', comisiones: null },
      { nombre: 'Weng Jen-Pei', cargo: 'Consejero', tipo: 'Dominical', desde: '2017', comisiones: null },
      { nombre: 'Hu Len-Kuo', cargo: 'Consejero', tipo: 'Independiente', desde: null, comisiones: 'Auditoría; Remuneración' },
      { nombre: 'Lei Whey-Min', cargo: 'Consejera', tipo: 'Independiente', desde: null, comisiones: 'Auditoría; Remuneración' },
      { nombre: 'Liao Chih-Hsiang', cargo: 'Consejero', tipo: 'Independiente', desde: null, comisiones: 'Auditoría' },
      { nombre: 'Yeh Yun-Ching', cargo: 'Consejero', tipo: 'Independiente', desde: '2023', comisiones: 'Auditoría' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: true, presidente_vinculado_control: true, cambios_cupula_24m: 0,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 25.2, fijo: null, variable_corto: null, variable_largo: null, ratio_salario_medio: null },
    remuneracion: 'Los consejeros cobraron 93,2 M TWD en 2025, el 2,11 % del beneficio, con una parte ligada al beneficio por estatutos (la remuneración de consejeros de Taiwán se fija como porcentaje del beneficio) [1]. El director general y el consejero delegado sumaron 25,2 M TWD (unos 0,8 M USD); la cúpula, 141,2 M [1]. No hay incentivos a largo plazo en acciones: la alineación viene de la participación familiar. En Taiwán la junta no vota un informe de remuneración.',
    accionistas: [
      { nombre: 'Familia Hsu (directo, cónyuges y sociedades)', pct: 45.0, tipo: 'Familia fundadora', variacion: 'Traspasos internos a sociedades familiares en 2025-2026, sin ventas al mercado declaradas [1].' },
      { nombre: 'Hua Cheng Investment (dentro de la familia)', pct: 9.22, tipo: 'Sociedad familiar', variacion: 'Presidida por Hsu Shou-Hsiung [1].' },
      { nombre: 'Chun Sheng Fa Investment', pct: 4.41, tipo: 'Sociedad patrimonial', variacion: null },
    ],
    insiders: [],
    control_y_defensas: 'La familia Hsu controla la empresa con ~45-50 % y 6 de los 10 puestos del consejo; los 4 independientes forman la comisión de auditoría (7 reuniones en 2025, asistencia del 100 %) [1]. Una acción, un voto; no hay acciones de doble voto ni pignoraciones declaradas [1]. Presidente y director general son padre e hijo. Sin una OPA amistosa de la familia, el control no es disputable.',
    alertas: [
      'Control familiar: presidente, vicepresidente, director general, consejero delegado y director financiero son de la familia Hsu [1].',
      'Proyectos ajenos al negocio dentro del grupo cotizado: centro comercial (Fortune Nev, 83,85 %), recarga de vehículos y hidrógeno [1, 2].',
      'Traspasos de acciones de directivos a sociedades propias (feb-2026, 7,69 M de acciones del presidente) [1].',
    ],
    confianza: 'Media',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'votos de la junta sobre remuneración', tipo: 'Complemento', intentos: '1) Informe anual (Taiwán no vota informe de remuneración); 2) actas de junta en MOPS (bloqueado); 3) prensa (sin dato)', decision: 'Omitido' },
    { seccion: 'directivos', campo: 'año de entrada de cada directivo en el cargo', tipo: 'Complemento', intentos: '1) Informe anual 2025 (fechas de elección del consejo de 2023, no de los cargos ejecutivos); 2) web de la empresa (bloqueada por Incapsula); 3) prensa (sin dato)', decision: 'Omitido' },
  ],
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Yahoo Finance: históricos diarios de 1519.TW, 0050.TW y 2308.TW hasta el 16-oct-2026 (rango, volumen, rentabilidades, betas y cierres de ejercicio ajustados)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://finance.yahoo.com/quote/1519.TW/history/' },
  { id: 2, titulo: '華城 FactSet 最新調查: BPA 2026-2028 (7 analistas; mediana 2026 de 16,71 TWD), ventas y objetivo medio de 863,64 TWD', editor: 'Anue 鉅亨網 (FactSet)', tipo: 'Analistas', fecha: '2026-09-23', url: 'https://news.cnyes.com/news/id/6614057' },
  { id: 3, titulo: 'Fortune Electric (TPE: 1519): previsiones y recomendaciones (8 analistas: 5 compra fuerte, 3 compra; objetivo medio 873,26 TWD) y próxima fecha de resultados', editor: 'Stock Analysis (S&P Global Market Intelligence)', tipo: 'Analistas', fecha: '2026-10-09', url: 'https://stockanalysis.com/quote/tpe/1519/forecast/' },
  { id: 4, titulo: 'Stock Analysis: estadísticas de comparables (capitalización, VE/ventas, VE/EBITDA, PER adelantado, márgenes, ROIC, deuda, FCF), 16-oct-2026', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://stockanalysis.com/quote/krx/267260/statistics/' },
  { id: 5, titulo: 'Taiwan 10-Year Government Bond Yield: 2,03 % (16-oct-2026)', editor: 'Trading Economics', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://tradingeconomics.com/taiwan/government-bond-yield' },
  { id: 6, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026: 4,20 %', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 7, titulo: 'Tipos de cambio de referencia del BCE (15-oct-2026: USD 1,1208; KRW 1.508,48; CAD 1,5923; BRL 5,6679 por EUR)', editor: 'Banco Central Europeo', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml' },
  { id: 8, titulo: 'GE Vernova to fully acquire Prolec GE joint venture: 5.275 M USD por el 50 %; ventas de ~3.000 M USD y margen EBITDA ajustado de ~25 %', editor: 'Prolec GE', tipo: 'Primaria', fecha: '2025-10-21', url: 'https://www.prolec.energy/news/ge-vernova-to-fully-acquire-prolec-ge-joint-venture/' },
  { id: 9, titulo: 'Hubbell to acquire NSI Industries (8-K, Ex. 99.1): 3.000 M USD, ~15,5 veces el EBITDA ajustado', editor: 'Hubbell Inc. (SEC)', tipo: 'Primaria', fecha: '2026-05', url: 'https://www.sec.gov/Archives/edgar/data/48898/000119312526204099/d133302dex991.htm' },
  { id: 10, titulo: 'Hammond Power Solutions Inc. to Acquire AEG Power Solutions (valor empresa de 365 M CAD; ventas de AEG de ~326 M CAD en 2025)', editor: 'Hammond Power Solutions', tipo: 'Primaria', fecha: '2026-02-17', url: 'https://americas.hammondpowersolutions.com/news/2026/february/hps-aeg-power-solutions-aquisition' },
  { id: 11, titulo: 'Hitachi to buy ABB’s Power Grids business (valor empresa de 11.000 M USD por el 100 %)', editor: 'Process Online', tipo: 'Prensa', fecha: '2018-12-17', url: 'https://processonline.com.au/content/business/news/hitachi-to-buy-abb-s-power-grids-business-612558250' },
  { id: 12, titulo: '合併財務報告 115年第2季: balance a 30-jun-2026 (deuda, caja, arrendamientos, minoritarios, dividendo a pagar)', editor: 'Fortune Electric Co., Ltd. (MOPS / TWSE)', tipo: 'Primaria', fecha: '2026-08-10', url: TW + '202602_1519_AI1.pdf' },
  { id: 13, titulo: 'Bolsa de Taiwán: cierres oficiales de 1519 y ex-derecho del 5-ago-2026', editor: 'Taiwan Stock Exchange', tipo: 'Primaria', fecha: '2026-10', url: 'https://www.twse.com.tw/zh/trading/historical/stock-day.html' },
  { id: 14, titulo: 'Fortune Electric (TPE: 1519): ratios (PER adelantado 32,3; VE/EBITDA 40,1; flotante 126,35 M; insiders 39,2 %)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://stockanalysis.com/quote/tpe/1519/' },
];
const cambio = { USD: 32.338 };
const comps = [
  { nombre: 'HD Hyundai Electric', ticker: '267260.KS', pais: 'KR', capitalizacion: 446232, ev_ventas: 3.85, ev_ebitda_ltm: 14.03, ev_ebitda_ntm: null, per_ntm: 16.28, crecimiento_pct: 16.3, margen_ebitda_pct: 27.5, roic_pct: 66.3, dn_ebitda: -0.69, fcf_yield_pct: 3.8 },
  { nombre: 'Hyosung Heavy Industries', ticker: '298040.KS', pais: 'KR', capitalizacion: 430907, ev_ventas: 2.67, ev_ebitda_ltm: 18.92, ev_ebitda_ntm: null, per_ntm: 18.04, crecimiento_pct: 18.8, margen_ebitda_pct: 14.3, roic_pct: 23.0, dn_ebitda: 0.06, fcf_yield_pct: 3.0 },
  { nombre: 'LS Electric', ticker: '010120.KS', pais: 'KR', capitalizacion: 567094, ev_ventas: 4.22, ev_ebitda_ltm: 35.62, ev_ebitda_ntm: null, per_ntm: 36.51, crecimiento_pct: 23.5, margen_ebitda_pct: 11.8, roic_pct: 13.4, dn_ebitda: 1.15, fcf_yield_pct: -0.8 },
  { nombre: 'Hammond Power Solutions', ticker: 'HPS-A.TO', pais: 'CA', capitalizacion: 69653, ev_ventas: 2.94, ev_ebitda_ltm: 26.04, ev_ebitda_ntm: null, per_ntm: 26.96, crecimiento_pct: 28.8, margen_ebitda_pct: 10.7, roic_pct: 16.8, dn_ebitda: 0.54, fcf_yield_pct: 0.1 },
  { nombre: 'WEG', ticker: 'WEGE3.SA', pais: 'BR', capitalizacion: 1317118, ev_ventas: 5.09, ev_ebitda_ltm: 23.59, ev_ebitda_ntm: null, per_ntm: 29.14, crecimiento_pct: 11.7, margen_ebitda_pct: 21.2, roic_pct: 38.3, dn_ebitda: -0.35, fcf_yield_pct: 2.0 },
  { nombre: 'Shihlin Electric & Engineering', ticker: '1503.TW', pais: 'TW', capitalizacion: 103413, ev_ventas: 2.56, ev_ebitda_ltm: 17.82, ev_ebitda_ntm: null, per_ntm: 19.92, crecimiento_pct: null, margen_ebitda_pct: 13.8, roic_pct: 10.0, dn_ebitda: -0.65, fcf_yield_pct: 1.9 },
  { nombre: 'Chung-Hsin Electric & Machinery', ticker: '1513.TW', pais: 'TW', capitalizacion: 81522, ev_ventas: 3.09, ev_ebitda_ltm: 9.69, ev_ebitda_ntm: null, per_ntm: 16.97, crecimiento_pct: 8.3, margen_ebitda_pct: 25.5, roic_pct: 16.1, dn_ebitda: 0.61, fcf_yield_pct: 10.7 },
  { nombre: 'Allis Electric', ticker: '1514.TW', pais: 'TW', capitalizacion: 27358, ev_ventas: 2.5, ev_ebitda_ltm: 21.6, ev_ebitda_ntm: null, per_ntm: 24.48, crecimiento_pct: null, margen_ebitda_pct: 11.1, roic_pct: 12.5, dn_ebitda: 0.84, fcf_yield_pct: 2.6 },
  { nombre: 'Siemens Energy', ticker: 'ENR.DE', pais: 'DE', capitalizacion: 4146683, ev_ventas: 2.52, ev_ebitda_ltm: 20.44, ev_ebitda_ntm: null, per_ntm: 22.77, crecimiento_pct: 13.6, margen_ebitda_pct: 11.0, roic_pct: null, dn_ebitda: -1.76, fcf_yield_pct: 6.9 },
];
const D = {
  _estado: 'completa',
  identificacion: {
    nombre: 'Fortune Electric Co., Ltd. (華城電機股份有限公司)', nombre_corto: 'Fortune Electric', ticker: '1519', isin: 'TW0001519001', mercado: 'Bolsa de Taiwán (TWSE)', indice_referencia: 'TAIEX (MSCI Taiwan)',
    pais: 'Taiwán', pais_iso: 'TW', sector: 'Industria', industria: 'Equipos eléctricos (transformadores y aparamenta)', sede: 'Taoyuan (Taiwán)', fundacion: '1969', empleados: 1509, web: 'https://www.fortune.com.tw',
    precio: 656, fecha_precio: '2026-10-16', acciones: 347.47, capitalizacion_publicada: null, free_float_pct: 36.4,
    max_52s: 1013.64, min_52s: 528.18, volumen_medio_diario: '≈ 1.085 M TWD/día (3 meses; 1,56 M de acciones)', proximos_resultados: '2026-11-13',
  },
  consenso: {
    guidance: 'La empresa no publica guía numérica. Para 2026 dijo que el segundo semestre será mejor que el primero y que la exportación superará el 60 % de las ventas; la capacidad sube un 30 % en 2026 (Guanyin 3B) y la fábrica de Taichung entra en el 2T27 [12].',
    estimaciones: [
      { periodo: '2026e', ingresos: 27269, ebitda: null, ebit: null, bpa: 15.19, dpa: null, fuente: 'FactSet vía Anue, mediana de 7 analistas; BPA de 16,71 en la base antigua pasado a la nueva (÷1,1) [2]' },
      { periodo: '2027e', ingresos: 34396, ebitda: null, ebit: null, bpa: 21.1, dpa: null, fuente: 'FactSet vía Anue, mediana (23,21 en la base antigua) [2]' },
      { periodo: '2028e', ingresos: 41490, ebitda: null, ebit: null, bpa: 25.22, dpa: null, fuente: 'FactSet vía Anue, mediana (27,74 en la base antigua) [2]' },
    ],
    recomendaciones: { n_analistas: 8, comprar: 8, mantener: 0, vender: 0, po_medio: 863.64, po_min: null, po_max: null },
    revisiones: 'El consenso recorta: en mayo de 2026 FactSet daba una mediana de BPA 2026 de 21,38 TWD (base antigua) y un objetivo de 1.035; el 23-sep, 16,71 y 863,64 (−22 % y −17 %) [2]. Stock Analysis (S&P, 9-oct) muestra 8 analistas, todos en compra, con objetivo medio de 873,26 y BPA 2026 de 19,09 en la base nueva (rango 15,54-22,74), con estimaciones de ventas más viejas [3]. Suponemos que el BPA de FactSet está en la base de 315,9 M de acciones (anterior a la ampliación gratuita de agosto) y lo dividimos por 1,1.',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  multiplos_historicos: {
    serie: [
      { anio: '2020', precio_cierre: 37.34, ev_ebitda_ntm: null, per_ntm: null, excluir: true },
      { anio: '2021', precio_cierre: 28.06, ev_ebitda_ntm: null, per_ntm: null, excluir: true },
      { anio: '2022', precio_cierre: 36.29, ev_ebitda_ntm: null, per_ntm: null, excluir: true },
      { anio: '2023', precio_cierre: 245.68, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2024', precio_cierre: 465.29, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2025', precio_cierre: 695.45, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
    ],
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Nueve cotizadas de transformadores y equipos de red: los tres coreanos que más exportan a EE. UU. (HD Hyundai Electric, Hyosung Heavy, LS Electric), Hammond (Norteamérica), WEG (Brasil, transformadores y motores), los tres rivales taiwaneses (Shihlin, Chung-Hsin, Allis) y Siemens Energy (redes y turbinas). Hitachi Energy no cotiza aparte y GE Vernova se excluye porque vive sobre todo de turbinas de gas y su EBITDA está distorsionado (60 veces). Cifras de Stock Analysis del 16-oct-2026, capitalización en M TWD al cambio del BCE [4, 7]. El ROIC de Siemens Energy que da la fuente (89,7 %) no tiene sentido y se deja en blanco.',
    empresas: comps,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2025-10', objetivo: 'Prolec GE (transformadores; 50 % restante)', comprador: 'GE Vernova', ev: Math.round(10550 * cambio.USD), ev_ventas: 3.52, ev_ebitda: 14.1, prima_pct: null, excluir: false, comentario: '5.275 M USD por el 50 % → 10.550 M por el 100 %; ventas de ~3.000 M USD y margen EBITDA ajustado de ~25 % (múltiplos implícitos, cálculo propio) [8].' },
      { fecha: '2026-05', objetivo: 'NSI Industries (equipos y accesorios eléctricos)', comprador: 'Hubbell', ev: Math.round(3000 * cambio.USD), ev_ventas: 5.26, ev_ebitda: 15.5, prima_pct: null, excluir: false, comentario: 'Múltiplo de EBITDA ajustado publicado por Hubbell [9].' },
      { fecha: '2026-02', objetivo: 'AEG Power Solutions (electrónica de potencia y sistemas de alimentación)', comprador: 'Hammond Power Solutions', ev: Math.round(267 * cambio.USD), ev_ventas: 1.12, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '365 M CAD frente a 326 M CAD de ventas de 2025 [10].' },
      { fecha: '2018-12', objetivo: 'ABB Power Grids (transformadores y redes)', comprador: 'Hitachi', ev: Math.round(11000 * cambio.USD), ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: true, comentario: 'Fuera del ciclo actual (márgenes de un dígito); sin múltiplo verificado [11].' },
    ],
    confianza: 'Baja',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'comparables', campo: 'EV/EBITDA de los próximos 12 meses de los comparables', tipo: 'Complemento', intentos: '1) Stock Analysis (solo VE/EBITDA de 12 meses pasados); 2) Yahoo (limitado por exceso de consultas); 3) MarketScreener (de pago por comparable)', decision: 'Omitido' },
    { seccion: 'consenso', campo: 'EBITDA, EBIT y DPA del consenso', tipo: 'Complemento', intentos: '1) FactSet vía Anue (solo BPA, ventas y objetivo); 2) Stock Analysis (BPA y ventas); 3) MarketScreener (de pago)', decision: 'Omitido' },
    { seccion: 'bolsa', campo: 'posición corta', tipo: 'Complemento', intentos: '1) TWSE (datos de préstamo de valores bloqueados por exceso de consultas); 2) Stock Analysis (sin dato); 3) prensa (sin dato)', decision: 'Omitido' },
  ],
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: '[情報] 1519 華城 Q1 3.29 & 4月營收 (hilo de PTT Stock, 33 empujes)', editor: 'PTT Stock', tipo: 'Foros y redes', fecha: '2026-05-12', url: 'https://www.ptt.cc/bbs/Stock/M.1778560962.A.7F8.html' },
  { id: 2, titulo: 'Búsqueda de 華城 en PTT Stock: hilos de ene-2026 («黃仁勳指AI需要更多能源 華城再創新高»), dic-2025 («AI資料中心訂單逾120億», 23 empujes) y sep-2025 (42 empujes)', editor: 'PTT Stock', tipo: 'Foros y redes', fecha: '2026-10-16', url: 'https://www.ptt.cc/bbs/Stock/search?q=%E8%8F%AF%E5%9F%8E' },
  { id: 3, titulo: '華城 FactSet 最新調查 (recortes de BPA y objetivo; 7 analistas)', editor: 'Anue 鉅亨網', tipo: 'Foros y redes', fecha: '2026-09-23', url: 'https://news.cnyes.com/news/id/6614057' },
  { id: 4, titulo: '華城 9月營收 y comentarios del mercado sobre el tercer trimestre', editor: 'Anue 鉅亨網', tipo: 'Foros y redes', fecha: '2026-10-09', url: 'https://news.cnyes.com/news/id/6628415' },
  { id: 5, titulo: '重電股 (prensa sobre el grupo de equipos eléctricos pesados: 華城, 士電, 中興電, 亞力)', editor: 'Commercial Times (工商時報)', tipo: 'Foros y redes', fecha: '2026-03-11', url: 'https://wantrich.chinatimes.com/news/20260311900004-420401' },
];
const E = {
  _estado: 'completa',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Empeora',
    revisadas: [
      { plataforma: 'PTT Stock (hilos de resultados y ventas)', fecha: '2026-05', n_comentarios: 33, tono: 'Dividido', resumen: 'El BPA del 1T26 (3,29 TWD en la base antigua) y las ventas de abril se leen como «crecimiento que se frena»; unos ven la cartera de centros de datos y otros la valoración de 50 veces [1].' },
      { plataforma: 'PTT Stock (hilos de 2025-2026)', fecha: '2026-01', n_comentarios: 65, tono: 'Positivo', resumen: 'En el pico (enero de 2026, máximos tras las palabras de Jensen Huang sobre energía para la IA) el tono era de euforia «重電 = IA» [2].' },
      { plataforma: 'Anue y prensa económica taiwanesa', fecha: '2026-10', n_comentarios: 0, tono: 'Negativo', resumen: 'Recortes de BPA de FactSet (−22 % desde mayo), ventas planas en el 3T26 y retrasos en EE. UU.; la prensa sigue destacando la cartera de pedidos [3, 4].' },
    ],
    temas: [
      { tema: 'Equipos eléctricos pesados como valor de IA', postura: 'Alcista', peso: 'Alto', contraste: 'Cierto en parte: la cartera ligada a centros de datos es de ~22.000 M TWD, pero 2026 trae ventas planas [A] [3, 4].' },
      { tema: 'Valoración tras multiplicar por 25 desde 2022', postura: 'Bajista', peso: 'Alto', contraste: 'Coincide con nuestro DCF; el PER adelantado ronda las 39 veces nuestro BPA de 2027e [3].' },
      { tema: 'Retrasos de entregas y aranceles en EE. UU.', postura: 'Bajista', peso: 'Medio', contraste: 'Confirmado por la empresa en el 1S26; la cartera sigue firmada [4].' },
    ],
    lectura: 'El debate de particulares en PTT fue eufórico hasta el máximo de febrero de 2026 (1.014 TWD ajustado) y desde entonces se ha vuelto dividido, con la valoración y el freno de las ventas como temas centrales [1, 2]. La prensa económica recoge los recortes de FactSet y las ventas planas del 3T26, y trata a Fortune como el líder del grupo de equipos eléctricos pesados junto a Shihlin, Chung-Hsin y Allis [3-5]. Con la acción un 33 % por debajo del máximo y por debajo de su media de 200 sesiones, el sentimiento ha girado pero no es de capitulación: los analistas siguen todos en compra [3]. No añade un riesgo que el informe no recoja.',
    confianza: 'Baja',
  },
  fuentes: fE,
  huecos: [],
};
// el contraste de E no debe citar otras notas
E.sentimiento.temas[0].contraste = 'Cierto en parte: la cartera ligada a centros de datos es de ~22.000 M TWD, pero 2026 trae ventas planas [3, 4].';
guarda('E', E);
console.log('Notas A-E escritas');
