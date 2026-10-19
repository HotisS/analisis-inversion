// Notas A-E de Takasago Thermal Engineering Co., Ltd. (高砂熱学工業, TSE 1969, 1969.T). Corte 2026-10-19 (lunes; cierre de ese día).
// Millones de JPY salvo que se diga otra cosa. J-GAAP. Ejercicio a marzo, etiquetado por el año en que EMPIEZA, como lo
// nombra la empresa: FY2025 = abril 2025 - marzo 2026. Split 1:2 efectivo el 1-oct-2025: BPA, DPA y acciones en base posterior.
// Fuentes: tanshin, presentaciones y Q&A de la web de RI (vía el canal eir-parts de TDnet), yuho FY2025 e informes extraordinarios
// de EDINET (disclosure2dl), Yahoo Finance y Yahoo! Japan Finance, MarketScreener, Ministerio de Hacienda (JGB) y MLIT.
// Ejecutar: node informes/takasago-thermal-2026-10-19/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const lee = (f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
const man = lee('docs/_manifest.json');
const u = (k) => { if (!man[k]) throw new Error('sin URL: ' + k); return man[k].url; };
const comps = lee('comparables-yahoo.json');
const compet = lee('competidores-yahoo.json');
const bolsa = lee('bolsa.json');
const mov = lee('movimiento.json')['1969.T'];
const ED = 'https://disclosure2dl.edinet-fsa.go.jp/searchdocument/pdf';
const TTE = 'Takasago Thermal Engineering (TDnet / eir-parts)';
export const PRECIO = 4187; // JPY, cierre del 19-oct-2026
export const ACCIONES = 130.89; // M, 140.478.804 emitidas − 9.589.367 en autocartera a 30-jun-2026
const r1 = (x) => Math.round(x * 10) / 10;
const r2 = (x) => Math.round(x * 100) / 100;

// ================================================================ A. Cuentas
const fA = [
  { id: 1, titulo: 'Consolidated Financial Results for the Fiscal Year Ended March 31, 2026 (kessan tanshin FY2025, J-GAAP): cuenta, balance y flujos de FY2025 y FY2024', editor: TTE, tipo: 'Primaria', fecha: '2026-05-12', url: u('tanshin-fy2025') },
  { id: 2, titulo: 'Corrección del tanshin FY2025 (estado de flujos: flujo operativo corregido a 29.725 M)', editor: TTE, tipo: 'Primaria', fecha: '2026-06-12', url: u('correccion-tanshin-fy2025') },
  { id: 3, titulo: 'Kessan tanshin FY2024 (ejercicio a marzo de 2025): cuenta, balance y flujos de FY2024 y FY2023', editor: TTE, tipo: 'Primaria', fecha: '2025-05-13', url: u('tanshin-fy2024') },
  { id: 4, titulo: 'Kessan tanshin FY2023 (ejercicio a marzo de 2024): estados de FY2023 y FY2022 e información por segmentos', editor: TTE, tipo: 'Primaria', fecha: '2024-05-14', url: u('tanshin-fy2023') },
  { id: 5, titulo: 'Financial results FY2022 (ejercicio a marzo de 2023): estados de FY2022 y FY2021, pedidos, ventas y cartera por línea de negocio', editor: TTE, tipo: 'Primaria', fecha: '2023-05-12', url: u('resultados-fy2022') },
  { id: 6, titulo: 'Financial results FY2021 (ejercicio a marzo de 2022)', editor: TTE, tipo: 'Primaria', fecha: '2022-05-13', url: u('resultados-fy2021') },
  { id: 7, titulo: 'FY2025 Financial Results Presentation (pedidos, ventas y cartera por sector, matriz y filiales, plan a medio plazo, asignación de capital y guía FY2026); corrección del 12-jun-2026', editor: TTE, tipo: 'Primaria', fecha: '2026-05-12', url: u('briefing-fy2025') },
  { id: 8, titulo: 'FY2025 Full-Year Results Briefing: Key Points from the Q&A Session (12-may-2026)', editor: TTE, tipo: 'Primaria', fecha: '2026-05-19', url: u('qa-fy2025') },
  { id: 9, titulo: 'Kessan tanshin 1T FY2026 (abril-junio de 2026): cuenta trimestral y balance a 30-jun-2026', editor: TTE, tipo: 'Primaria', fecha: '2026-08-05', url: u('tanshin-1t-fy2026') },
  { id: 10, titulo: 'FY2026 First-Quarter Results Presentation (pedidos, cartera, cartera de oportunidades por sector)', editor: TTE, tipo: 'Primaria', fecha: '2026-08-05', url: u('briefing-1t-fy2026') },
  { id: 11, titulo: 'FY2026 First-Quarter Results Briefing: Key Points from the Q&A Session (5-ago-2026)', editor: TTE, tipo: 'Primaria', fecha: '2026-08', url: u('qa-1t-fy2026') },
  { id: 12, titulo: 'Kessan tanshin trimestrales 1T, 2T y 3T de FY2024 y FY2025 (cifras acumuladas de las que salen los trimestres)', editor: TTE, tipo: 'Primaria', fecha: '2026-02-13', url: u('tanshin-3t-fy2025') },
  { id: 13, titulo: '有価証券報告書 第146期 (yuho FY2025): segmentos, ventas por país del cliente, remuneración, plantilla y cartera de participaciones cruzadas', editor: 'Takasago Thermal Engineering (EDINET)', tipo: 'Primaria', fecha: '2026-06-25', url: u('yuho-fy2025') },
  { id: 14, titulo: 'Revisión del plan a medio plazo 2026 (objetivos de ordinario y ROE, asignación de capital y reducción de participaciones cruzadas)', editor: TTE, tipo: 'Primaria', fecha: '2025-05-13', url: u('mtp-revision-2025') },
  { id: 15, titulo: 'Notice of Acquisition of Own Shares (recompra de abril-junio de 2025, unos 8.000 M)', editor: TTE, tipo: 'Primaria', fecha: '2025-06-24', url: u('recompra-2025') },
  { id: 16, titulo: 'Notice of Stock Split (1:2, efectivo el 1-oct-2025)', editor: TTE, tipo: 'Primaria', fecha: '2025-08-08', url: u('split-2025') },
];

// EBITDA = beneficio de explotación + amortización del inmovilizado + amortización del fondo de comercio (J-GAAP amortiza el
// fondo de comercio). Resultado financiero = BAI − beneficio de explotación: incluye no operativos (dividendos de la cartera de
// acciones, intereses, participadas, alquileres) y extraordinarios (plusvalías de venta de acciones de la cartera, deterioros).
const cuenta = [
  { periodo: 'FY2021', ingresos: 302746, coste_ventas: 261349, gastos_generales: 27012, ebitda: 16324, amortizaciones: 1941, ebit: 14383, resultado_financiero: 2343, bai: 16726, impuestos: 5145, minoritarios: 45, beneficio_neto: 11535, gastos_financieros: 237, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 84.69, dpa: 30.0, dpa_extraordinario: 0, acciones_diluidas: 136.2 },
  { periodo: 'FY2022', ingresos: 338831, coste_ventas: 292468, gastos_generales: 31036, ebitda: 17807, amortizaciones: 2481, ebit: 15326, resultado_financiero: 1526, bai: 16852, impuestos: 4133, minoritarios: 491, beneficio_neto: 12227, gastos_financieros: 278, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 92.35, dpa: 31.5, dpa_extraordinario: 0, acciones_diluidas: 132.4 },
  { periodo: 'FY2023', ingresos: 363366, coste_ventas: 303419, gastos_generales: 35755, ebitda: 26924, amortizaciones: 2732, ebit: 24192, resultado_financiero: 2861, bai: 27053, impuestos: 6942, minoritarios: 498, beneficio_neto: 19612, gastos_financieros: 288, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 147.84, dpa: 59.5, dpa_extraordinario: 5.0, acciones_diluidas: 132.66 },
  { periodo: 'FY2024', ingresos: 381661, coste_ventas: 310015, gastos_generales: 39231, ebitda: 35707, amortizaciones: 3292, ebit: 32415, resultado_financiero: 5093, bai: 37508, impuestos: 9484, minoritarios: 392, beneficio_neto: 27631, gastos_financieros: 269, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 208.07, dpa: 83.5, dpa_extraordinario: 0, acciones_diluidas: 132.79 },
  { periodo: 'FY2025', ingresos: 423923, coste_ventas: 330203, gastos_generales: 45974, ebitda: 51503, amortizaciones: 3758, ebit: 47745, resultado_financiero: 5081, bai: 52826, impuestos: 14813, minoritarios: 542, beneficio_neto: 37470, gastos_financieros: 423, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 285.73, dpa: 115.0, dpa_extraordinario: 0, acciones_diluidas: 131.14 },
];
// Balance al cierre (31 de marzo del año siguiente). clientes = efectos y cuentas por cobrar + activos de contrato (obra ejecutada
// no facturada) + efectos electrónicos; proveedores = efectos, cuentas y obligaciones electrónicas por pagar; pasivos de contrato =
// anticipos de clientes. Sin NIIF 16 (J-GAAP): arrendamientos = 0.
const balance = [
  { periodo: 'FY2021', activo_total: 300736, activo_corriente: 228208, pasivo_corriente: 134342, pasivo_total: 163838, fondo_comercio: 1920, intangibles: 6183, inmovilizado_material: 20760, existencias: 3229, clientes: 158944, proveedores: 86272, activos_contrato: null, pasivos_contrato: 16116, caja: 56960, deuda_financiera: 33058, arrendamientos: 0, patrimonio_neto: 132897, minoritarios: 4000, reservas: 105788 },
  { periodo: 'FY2022', activo_total: 313391, activo_corriente: 238331, pasivo_corriente: 137146, pasivo_total: 166226, fondo_comercio: 1728, intangibles: 6375, inmovilizado_material: 23756, existencias: 3330, clientes: 148252, proveedores: 87393, activos_contrato: null, pasivos_contrato: 14693, caja: 72317, deuda_financiera: 29815, arrendamientos: 0, patrimonio_neto: 142470, minoritarios: 4694, reservas: 113913 },
  { periodo: 'FY2023', activo_total: 340106, activo_corriente: 248386, pasivo_corriente: 146750, pasivo_total: 172875, fondo_comercio: 1703, intangibles: 7469, inmovilizado_material: 23483, existencias: 4057, clientes: 185890, proveedores: 77279, activos_contrato: null, pasivos_contrato: 12593, caja: 53298, deuda_financiera: 39133, arrendamientos: 0, patrimonio_neto: 164355, minoritarios: 2875, reservas: 128724 },
  { periodo: 'FY2024', activo_total: 334949, activo_corriente: 245138, pasivo_corriente: 130040, pasivo_total: 150665, fondo_comercio: 1419, intangibles: 8208, inmovilizado_material: 23919, existencias: 3889, clientes: 186192, proveedores: 49713, activos_contrato: null, pasivos_contrato: 20978, caja: 47647, deuda_financiera: 37737, arrendamientos: 0, patrimonio_neto: 180667, minoritarios: 3615, reservas: 145846 },
  { periodo: 'FY2025', activo_total: 381823, activo_corriente: 264045, pasivo_corriente: 145726, pasivo_total: 166766, fondo_comercio: 2696, intangibles: 8761, inmovilizado_material: 23840, existencias: 4161, clientes: 203174, proveedores: 51481, activos_contrato: null, pasivos_contrato: 17993, caja: 48228, deuda_financiera: 42406, arrendamientos: 0, patrimonio_neto: 209889, minoritarios: 5167, reservas: 170683 },
];
// Flujos. Los intereses pagados van en el flujo operativo (J-GAAP). pagos_arrendamientos = amortización de arrendamientos
// financieros de las filiales. adquisiciones = compra de filiales y de participaciones de minoritarios. desinversiones = 0: las
// ventas de acciones de la cartera cruzada se tratan en el puente, no como venta de negocio.
const flujos = [
  { periodo: 'FY2021', flujo_operativo: 1186, capex: 3011, pagos_arrendamientos: 410, adquisiciones: 97, desinversiones: 0, dividendos: 3985, recompras: 6356, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: 'FY2022', flujo_operativo: 25826, capex: 5048, pagos_arrendamientos: 464, adquisiciones: 2908, desinversiones: 0, dividendos: 4102, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: 'FY2023', flujo_operativo: -13100, capex: 3347, pagos_arrendamientos: 465, adquisiciones: 4330, desinversiones: 0, dividendos: 4774, recompras: 2, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: 'FY2024', flujo_operativo: 5885, capex: 4337, pagos_arrendamientos: 511, adquisiciones: 32, desinversiones: 0, dividendos: 10508, recompras: 1939, emision_acciones: 1934, intereses_en_financiacion: 0 },
  { periodo: 'FY2025', flujo_operativo: 29725, capex: 5066, pagos_arrendamientos: 544, adquisiciones: 3220, desinversiones: 0, dividendos: 12634, recompras: 8209, emision_acciones: 207, intereses_en_financiacion: 0 },
];
// Ventas a clientes externos por línea de negocio (la empresa publica pedidos, ventas y cartera de la obra de instalaciones
// dividida en climatización general e industrial; segmentos contables: instalaciones, fabricación de equipos y otros).
const seg = (n, d, v, res = null, tipo = null) => ({ nombre: n, descripcion: d, tipo_resultado: tipo, historico: ['FY2021', 'FY2022', 'FY2023', 'FY2024', 'FY2025'].map((p, i) => ({ periodo: p, ingresos: v[i], resultado: res ? res[i] : null })) });
const segmentos = [
  seg('Instalaciones: climatización general', 'Climatización, ventilación y fontanería de oficinas, redesarrollos urbanos, hospitales, centros de datos, hoteles y edificios públicos; obra nueva y renovación.', [160202, 158194, 161961, 163170, 166776]),
  seg('Instalaciones: climatización industrial', 'Salas limpias y climatización de procesos para fábricas de semiconductores, componentes electrónicos, farmacia, baterías y química (tecnología propia TCR-SWIT); Japón y exterior.', [136503, 173822, 193532, 210512, 248606]),
  seg('Fabricación y venta de equipos', 'Equipos de climatización y salas limpias (Nippon Kucho Service y otras filiales); resultado = beneficio de explotación del segmento.', [5953, 6722, 7782, 7859, 8414], [null, 304, 405, 579, 907], 'EBIT'),
  seg('Otros', 'Agencia de seguros y servicios menores.', [86, 91, 90, 119, 125]),
];

const A = {
  _estado: 'completa',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 414640, ebitda: 50097, ebit: 46109, beneficio_neto: 34922, bpa: 266.72, dpa: 115.0, dpa_extraordinario: 0, fcf: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [
      { periodo: 'FY2025', descripcion: 'Entrada en el perímetro de THS Innovations y Prompt Techno Service (Tailandia, gestión energética y mantenimiento de instalaciones; 1.287 empleados) desde el 3T FY2025; compras por 3.220 M [7, 13].' },
    ],
    comentario: 'Takasago es el mayor contratista independiente de climatización de Japón. Las ventas pasaron de 302.746 M en FY2021 a 423.923 M en FY2025 (+8,8 % anual) y el beneficio de explotación se triplicó, de 14.383 M a 47.745 M: el margen de explotación pasó del 4,8 % al 11,3 % [1, 5, 6]. El salto vino de tres cosas: la ola de fábricas de semiconductores en Japón (TSMC-JASM en Kumamoto, Rapidus, Kioxia), que llevó la climatización industrial de 136.503 M a 248.606 M; precios mejores al contratar (más contratos directos con el cliente y a coste más margen: el 61,2 % de los pedidos de la matriz en FY2025) y la escasez de capacidad de obra en Japón, que da poder de precio a quien tiene técnicos [7, 8]. FY2025 fue excepcional: grandes obras de semiconductores se cerraron con mejora de margen al terminar, y la propia empresa dice que sin ellas el margen bruto habría quedado «en la zona del 21 %» (22,1 % publicado) [8]. El 1T FY2026 bajó (ventas −9,9 %, explotación −16,2 %) porque la obra industrial se concentra en el 2S, según la empresa en línea con su plan [9, 11]. Los resultados son muy estacionales: el 3T y el 4T suman más de la mitad de las ventas y del beneficio [12].',
    ajustes: 'Cifras publicadas (J-GAAP), sin ajustes. EBITDA = beneficio de explotación + amortización + amortización del fondo de comercio (314 M en FY2025). El resultado financiero (BAI − beneficio de explotación) recoge dividendos de la cartera de acciones e intereses netos (no operativo neto de 2.897 M en FY2025) y extraordinarios: plusvalías de venta de acciones de la cartera cruzada (1.161 / 270 / 1.295 / 2.712 / 799 M en FY2021-FY2025) y de inmovilizado (1.517 M en FY2025), deterioro de 288 M en FY2023 [1, 3, 4, 5]. Esas plusvalías se repiten cada año porque la empresa vende su cartera cruzada por plan; en el BPA propio solo cuento una parte decreciente. BPA y DPA de todos los años en base posterior al split 1:2 del 1-oct-2025 [16]. El DPA de FY2023 incluye 5 JPY (10 antes del split) conmemorativos del centenario [4]. El flujo operativo de FY2025 es el corregido el 12-jun-2026 (29.725 M) [2].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '1T FY2024', ingresos: 70415, crecimiento_pct: -10.0, crecimiento_organico_pct: null, ebitda: 2692, margen_ebitda_pct: 3.8, bpa: 15.28, vs_consenso: null },
      { periodo: '2T FY2024', ingresos: 89495, crecimiento_pct: 3.9, crecimiento_organico_pct: null, ebitda: 8674, margen_ebitda_pct: 9.7, bpa: 46.42, vs_consenso: null },
      { periodo: '3T FY2024', ingresos: 105283, crecimiento_pct: 6.0, crecimiento_organico_pct: null, ebitda: 11976, margen_ebitda_pct: 11.4, bpa: 63.48, vs_consenso: null },
      { periodo: '4T FY2024', ingresos: 116468, crecimiento_pct: 16.9, crecimiento_organico_pct: null, ebitda: 12365, margen_ebitda_pct: 10.6, bpa: 82.9, vs_consenso: null },
      { periodo: '1T FY2025', ingresos: 94205, crecimiento_pct: 33.8, crecimiento_organico_pct: null, ebitda: 10977, margen_ebitda_pct: 11.7, bpa: 67.98, vs_consenso: null },
      { periodo: '2T FY2025', ingresos: 100296, crecimiento_pct: 12.1, crecimiento_organico_pct: null, ebitda: 15457, margen_ebitda_pct: 15.4, bpa: 85.79, vs_consenso: null },
      { periodo: '3T FY2025', ingresos: 111524, crecimiento_pct: 5.9, crecimiento_organico_pct: null, ebitda: 15387, margen_ebitda_pct: 13.8, bpa: 84.41, vs_consenso: null },
      { periodo: '4T FY2025', ingresos: 117898, crecimiento_pct: 1.2, crecimiento_organico_pct: null, ebitda: 9682, margen_ebitda_pct: 8.2, bpa: 47.55, vs_consenso: null },
      { periodo: '1T FY2026', ingresos: 84922, crecimiento_pct: -9.9, crecimiento_organico_pct: null, ebitda: 9571, margen_ebitda_pct: 11.3, bpa: 48.97, vs_consenso: null },
    ],
    ultima_presentacion: 'En la conferencia del 1T FY2026 (5-ago-2026) los analistas preguntaron por la caída de ventas (−9,9 %) y por el margen bruto del 22,5 % [11]. La dirección dijo que la pausa en la obra industrial era la prevista, que el beneficio superó su plan interno por las renovaciones y las filiales de Singapur y Tailandia, y que las ventas volverán a crecer en el 2S [11]. Mantuvo la guía (ventas 440.000 M, explotación 50.000 M, neto 40.000 M) citando el terremoto de Kumamoto y Oriente Medio [9, 11]. La cartera de oportunidades de semiconductores crece (inversiones anunciadas y ampliaciones en fábricas que ya hizo Takasago, con obras de 2-3 meses), la de centros de datos se retrasa al año siguiente y los redesarrollos de oficinas dan trabajo estable hasta 2029 [10, 11]. Frente a mayo, el tono pasó de explicar la pérdida de unos 50.000 M de pedidos por una fábrica de baterías cancelada [8] a destacar que la cartera total subió un 12,2 % hasta 433.250 M y que el 94 % de los pedidos industriales de la matriz son renovaciones [10, 11]. Sobre recompras, «flexible y oportuna» según las inversiones de crecimiento [11].',
    confianza: 'Alta',
  },
  balance: {
    historico: balance,
    vencimientos: [{ anio: 'FY2026 (≤ 12 meses)', importe: 35593 }, { anio: 'FY2027 o después', importe: 5000 }],
    liquidez: 'Caja de 42.125 M a 30-jun-2026 frente a 40.593 M de deuda financiera (préstamos a corto 25.593 M, bono con vencimiento a menos de un año 10.000 M y otro bono 5.000 M): caja neta de deuda de unos 1.500 M [9]. A eso se suman 64.201 M de inversiones financieras, de las que 45.407 M (a mar-26) son la cartera de acciones cruzadas de 83 empresas, y 9.726 M de superávit neto de pensiones [9, 13]. Rating A+ (estable) de JCR, subido el 15-abr-2026 [7].',
    rating: 'A+ (JCR, estable)',
    coste_deuda_pct: 1.0,
    vida_media_anios: 1.0,
    otros_pasivos: 'El pasivo que importa es comercial: proveedores y subcontratistas (51.481 M) y anticipos de clientes (17.993 M) a mar-26 [1]. El fondo de pensiones tiene superávit (activo 11.495 M frente a pasivo 1.769 M a jun-26) [9]. El riesgo contable típico del contratista es el reconocimiento de ingresos por grado de avance: las provisiones por pérdidas en obra son pequeñas y no hay litigios relevantes publicados [13]. Avales y garantías a filiales y a terceros por importes menores [13].',
    comentario: 'El balance de un contratista japonés: el circulante es grande y es lo que consume el flujo. Clientes y obra ejecutada pendiente de facturar suman 203.174 M (el 48 % de las ventas) frente a 51.481 M de proveedores; el circulante comercial neto pasó del 19 % de las ventas en FY2021 al 32 % en FY2025 [1, 5]. La razón es doble: la ley japonesa de subcontratación y la presión pública para pagar antes a los subcontratistas (los proveedores cayeron de 87.393 M en FY2022 a 49.713 M en FY2024) y las grandes obras de semiconductores que se facturan al final [3, 4]. La caja neta de deuda bajó de 42.502 M (FY2022) a 5.822 M (FY2025) mientras el patrimonio subía de 142.470 M a 209.889 M: el crecimiento lo pagó el balance y no el flujo [1, 5]. La cartera cruzada (22,6 % del patrimonio, objetivo ≤ 15 % a mar-27) es una reserva de valor que se va vendiendo [8, 13].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'La conversión del beneficio en caja es irregular y baja: en cinco años el flujo operativo sumó 49.522 M frente a 108.475 M de beneficio neto (0,46 veces), porque el circulante absorbió unos 70.000 M [1, 3, 4, 5]. El año malo fue FY2023 (−13.100 M) por las grandes obras de semiconductores y el pago anticipado a subcontratistas; FY2025 (29.725 M) se recuperó con los cobros al terminar esas obras [2, 7]. El capex es bajo (1,2 % de las ventas): es un negocio de personas, no de fábricas [1]. Dividendos y recompras (12.634 M y 8.209 M en FY2025) superaron el flujo libre, y se pagaron con caja y con la venta de la cartera cruzada [1, 14]. Mientras las ventas crezcan, el flujo libre seguirá por debajo del beneficio; si se estancan, el circulante se liberará.',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'KPMG AZSA LLC', anios_auditor: null, opinion: 'Favorable (sin salvedades) en FY2025 [13]',
    comentario: 'Las cuentas de un contratista dependen del reconocimiento por grado de avance: el beneficio de una obra se estima con su coste total previsto, y un cambio de estimación al terminar mueve el margen (como en FY2025, donde grandes obras de semiconductores cerraron con mejora) [8]. La empresa lo explica y separa ese efecto (margen bruto «en la zona del 21 %» sin él) [8]. Las plusvalías de venta de la cartera cruzada (799-2.712 M al año) y del inmovilizado (1.517 M en FY2025) inflan el beneficio neto entre un 2 % y un 10 % según el año [1, 3]. No hay capitalización de gastos ni pagos en acciones relevantes. Corrigió el estado de flujos de FY2025 un mes después de publicarlo (reclasificación dentro del operativo) [2].',
    senales: [
      { senal: 'Flujo operativo acumulado de 5 años = 0,46 veces el beneficio', nivel: 'Media', comentario: 'Normal en un contratista que crece (obra ejecutada pendiente de cobro) y con pagos más rápidos a subcontratistas; vigilar los activos de contrato [1, 5].' },
      { senal: 'Margen de FY2025 ayudado por cierres de grandes obras', nivel: 'Media', comentario: 'La empresa estima el margen bruto subyacente en la zona del 21 % frente al 22,1 % publicado; el 4T FY2025 ya bajó al 7,3 % de margen de explotación [8, 12].' },
      { senal: 'Corrección del estado de flujos de FY2025 (12-jun-2026)', nivel: 'Baja', comentario: 'Reclasificación dentro del flujo operativo, sin cambio en cuenta ni balance [2].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Dividendo progresivo con un payout objetivo del 40 % desde FY2023 [13]: DPA de 115 JPY en FY2025 (43 a cuenta y 72 final) y guía de 123 JPY en FY2026 (61 + 62) [1, 9]. Recompras «flexibles»: unos 8.000 M en abril-junio de 2025 [15]. Plan a medio plazo 2026 (FY2024-FY2026): más de 90.000 M en crecimiento (I+D, neutralidad de carbono, compras de unos 7.500 M, personas) y más de 58.000 M de remuneración al accionista, financiados en parte con la venta de 20.000 M de la cartera cruzada [7, 14].',
    adquisiciones: [
      { anio: 'FY2025', objetivo: 'THS Innovations y Prompt Techno Service (Tailandia): gestión energética y mantenimiento de instalaciones, 1.287 empleados', importe: 3220, ev_ebitda: null, financiacion: 'Caja', resultado: 'Consolidadas desde el 3T FY2025; demasiado pronto para juzgar [7, 13].' },
      { anio: 'FY2023', objetivo: 'Compra de minoritarios de filiales consolidadas', importe: 4288, ev_ebitda: null, financiacion: 'Caja', resultado: 'Los minoritarios del balance bajaron de 4.694 M a 2.875 M [4].' },
    ],
    comentario: 'La dirección asigna el capital con disciplina y en línea con el código de gobierno japonés: subió el payout del 35 % al 40 %, recompró el 6 % del capital en FY2021 y FY2025 a precios muy por debajo del actual (FY2025: a unos 2.900 JPY en base posterior al split), y reduce la cartera cruzada [1, 14, 15]. Las compras son pequeñas y de servicios en el sudeste asiático [7]. Lo discutible: la caja neta casi desapareció porque el circulante creció, y aun así se repartió más que el flujo libre; con 64.000 M de inversiones financieras no hay tensión, pero el margen para recompras grandes depende de vender la cartera cruzada [9].',
    confianza: 'Alta',
  },
  negocio: {
    segmentos,
    geografias: [
      { nombre: 'Japón', peso_pct: 78.6 },
      { nombre: 'Sudeste asiático (Tailandia, Singapur, Malasia, Vietnam, Myanmar)', peso_pct: 12.0 },
      { nombre: 'Otros (India, China, EE. UU. y otros)', peso_pct: 9.4 },
    ],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Pedidos consolidados', valor_anterior: '416.147 M (FY2024)', valor_actual: '460.057 M (FY2025); 106.598 M en el 1T FY2026', variacion: '+10,6 %; +1,7 % en el 1T', comentario: 'General +30,4 % e industrial −6,3 % en FY2025 por una fábrica de baterías de unos 50.000 M cancelada; guía FY2026: 520.000 M [7, 8, 10].' },
      { kpi: 'Cartera de pedidos', valor_anterior: '375.440 M (mar-25)', valor_actual: '411.573 M (mar-26); 433.250 M (jun-26)', variacion: '+9,6 %; +12,2 % interanual en jun-26', comentario: 'Cubre ≈ 1 año de ventas; la industrial bajó un 20,7 % en FY2025 (153.957 M) y repuntó a 160.973 M en jun-26 [7, 10].' },
      { kpi: 'Ventas de climatización industrial (peso)', valor_anterior: '45,1 % (FY2021)', valor_actual: '58,6 % (FY2025)', variacion: '+13,5 puntos', comentario: 'Semiconductores, electrónica, farmacia y baterías [5, 7].' },
      { kpi: 'Margen bruto consolidado', valor_anterior: '18,8 % (FY2024)', valor_actual: '22,1 % (FY2025); 22,5 % en el 1T FY2026', variacion: '+3,3 puntos', comentario: 'Unos 21 % sin las mejoras al cierre de grandes obras [8, 11].' },
      { kpi: 'Contratos directos y a coste más margen (matriz)', valor_anterior: 'n. d.', valor_actual: '61,2 % de los pedidos (FY2025); 63,8 % (1T FY2026)', variacion: 'al alza', comentario: 'Objetivo en torno al 65 %: mejor margen al contratar [8, 11].' },
      { kpi: 'Ventas en el exterior', valor_anterior: '50.631 M (FY2021)', valor_actual: '90.756 M (FY2025)', variacion: '+15,7 % anual', comentario: 'Sobre todo sudeste asiático e India; la cartera exterior bajó un 25 % en FY2025 [5, 7].' },
    ],
    confianza: 'Alta',
  },
  fuentes: fA,
  huecos: [
    { seccion: 'trimestres', campo: 'vs_consenso', tipo: 'Complemento', intentos: '1) MarketScreener: solo estimaciones anuales; 2) kabutan e irbank: 403; 3) prensa (Nikkei, kabutan en Yahoo Japón): sin consenso trimestral publicado', decision: 'Omitido' },
    { seccion: 'financieros', campo: 'ltm.fcf', tipo: 'Complemento', intentos: '1) Tanshin del 1T FY2026: las empresas japonesas no publican estado de flujos en el 1T y el 3T; 2) presentación del 1T: sin flujos; 3) yuho semestral: aún no publicado (noviembre)', decision: 'Omitido' },
    { seccion: 'calidad', campo: 'anios_auditor', tipo: 'Complemento', intentos: '1) Yuho FY2025: no da el año de inicio en el texto extraído; 2) informe de gobierno 2026: sin dato; 3) tanshin: sin dato', decision: 'Omitido' },
  ],
};
guarda('A', A);

// ================================================================ B. Sector y competencia
const fB = [
  { id: 1, titulo: '建設工事施工統計調査報告 令和4年度実績 (estadística de obras de construcción, ejercicio fiscal 2022): obras de climatización y fontanería (管工事業) 2020-2022', editor: 'Ministerio de Tierra, Infraestructura y Transporte (MLIT)', tipo: 'Primaria', fecha: '2024-03-29', url: u('mlit-sekou-2024') },
  { id: 2, titulo: 'Mercado de obras de climatización y fontanería en Japón: 10.315.700 M JPY en el ejercicio fiscal 2024 (+2,8 %), citando la estadística del MLIT', editor: 'CREX (vía búsqueda web)', tipo: 'Prensa', fecha: '2025', url: 'https://crex-group.com' },
  { id: 3, titulo: '空調・衛生設備工事市場に関する調査 (Yano Research: 73 grandes contratistas de climatización y fontanería, 1.238.800 M JPY en el ejercicio fiscal 2021)', editor: 'Yano Research Institute', tipo: 'Estudio sectorial', fecha: '2022-12-16', url: 'https://www.yano.co.jp/press-release/show/press_id/3150' },
  { id: 4, titulo: 'FY2025 Financial Results Presentation: mercados, cartera de oportunidades por sector, grandes obras (Rapidus, semiconductores, centros de datos), T-Base y plantilla', editor: TTE, tipo: 'Primaria', fecha: '2026-05-12', url: u('briefing-fy2025') },
  { id: 5, titulo: 'Q&A de las conferencias de FY2025 (12-may-2026) y del 1T FY2026 (5-ago-2026)', editor: TTE, tipo: 'Primaria', fecha: '2026-08', url: u('qa-1t-fy2026') },
  { id: 6, titulo: 'Fichas de Kinden, Sanki Engineering, Taikisha, Dai-Dan, Kandenko, Hibiya Engineering, United Integrated Services, Comfort Systems USA y EMCOR (cuentas del último ejercicio)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com' },
  { id: 7, titulo: '有価証券報告書 第146期 (yuho FY2025): negocio, riesgos, plantilla y clientes', editor: 'Takasago Thermal Engineering (EDINET)', tipo: 'Primaria', fecha: '2026-06-25', url: u('yuho-fy2025') },
  { id: 8, titulo: 'Corporate Governance Report (junio de 2026): sostenibilidad, capital humano, política de capital', editor: TTE, tipo: 'Primaria', fecha: '2026-06-25', url: u('gobierno-2026') },
  { id: 9, titulo: 'Financial results FY2023 (centenario, historia y objetivos de capital)', editor: TTE, tipo: 'Primaria', fecha: '2024-05-14', url: u('resultados-fy2023') },
];
const cp = Object.fromEntries(comps.map((e) => [e.simbolo, e]));
const B = {
  _estado: 'completa',
  negocio: {
    descripcion: 'Takasago Thermal Engineering diseña, instala y mantiene sistemas de climatización, ventilación y salas limpias. Es un contratista de instalaciones (設備工事, subcontratista o contratista directo de la constructora general o del cliente final) con dos grandes clientelas: la climatización industrial (58,6 % de las ventas en FY2025), sobre todo salas limpias para fábricas de semiconductores y electrónica (TSMC-JASM, Rapidus, Kioxia y otras), farmacia y baterías, y la climatización general (39,4 %): oficinas de los grandes redesarrollos de Tokio, centros de datos, hospitales y edificios públicos [4, 7]. Fabrica equipos en pequeña escala (2 %) y el 21 % de las ventas es fuera de Japón (sudeste asiático, India, China) [4, 7]. Trabaja con una red de unos 600 subcontratistas fieles (Kowakai) y 7.287 empleados, de los que 2.469 en la matriz [4, 7].',
    como_gana_dinero: 'Cobra por obra: precio cerrado o, cada vez más, coste más margen y contrato directo con el cliente (61-64 % de los pedidos de la matriz), con cláusulas de revisión de precios [5]. El beneficio es el margen bruto de la obra (22 % en FY2025) menos los gastos generales (10,8 % de las ventas): el coste son subcontratistas, materiales (tubería, conductos, equipos) y su propia ingeniería [4, 7]. El margen depende de tres cosas: la escasez de capacidad de obra en Japón (que hoy da poder de precio a quien tiene técnicos y subcontratistas), la mezcla (las renovaciones y las salas limpias de semiconductores dejan más margen) y la ejecución (sobrecostes o mejoras al cerrar una obra grande) [5]. Las renovaciones y el mantenimiento (7,9 % de las ventas) son la parte recurrente [4].',
    clientes: 'Ningún cliente supera el 10 % de las ventas [7]. Los clientes son fabricantes de semiconductores y electrónica (que deciden por ciclos de inversión), promotores inmobiliarios y constructoras generales (Kajima, Obayashi, Shimizu, Taisei, Takenaka) y el sector público [4]. El poder de precio es hoy alto por la escasez de mano de obra: los clientes aceptan contratos a coste más margen que antes no aceptaban, y la empresa dice que la subida de costes podría frenar parte de la inversión de los clientes [5]. Una fábrica de baterías de unos 50.000 M cancelada en FY2025 muestra el riesgo de concentración por proyecto [5].',
    confianza: 'Alta',
  },
  sector: {
    definicion: 'El mercado relevante es la obra de climatización y fontanería (管工事業) en Japón según la estadística de obras del MLIT, porque es donde compite el 79 % de las ventas: 8.196.561 M JPY en el ejercicio fiscal 2020, 8.659.659 M en 2021 y 8.313.576 M en 2022 [1], y 10.315.700 M en 2024 según CREX citando la misma fuente [2]. Ojo: el salto 2022-2024 puede deberse en parte a cambios en la encuesta, y el mercado incluye fontanería y pequeñas obras donde Takasago no compite. Contraste: los 73 grandes contratistas del sector facturaron 1.238.800 M en 2021 (Yano) [3]; Takasago (302.746 M) era el mayor. La cuota sobre el mercado amplio es del 3-4 %; sobre los grandes, de alrededor del 20 %.',
    tamano: '≈ 10.315.700 M JPY en el ejercicio fiscal 2024 (obras de climatización y fontanería en Japón, MLIT vía CREX) [1, 2]',
    unidad_serie: 'millones de JPY (obras de climatización y fontanería en Japón)',
    serie: [
      { anio: '2020', tamano: 8196561 }, { anio: '2021', tamano: 8659659 }, { anio: '2022', tamano: 8313576 }, { anio: '2024', tamano: 10315700 },
    ],
    tcac_historico_pct: 5.9,
    tcac_previsto_pct: 3.0,
    cr5_pct: null,
    estructura: 'Fragmentada en el mercado amplio; concentrada en las grandes obras (cinco o seis contratistas de climatización y los grupos eléctricos)',
    drivers: [
      { driver: 'Fábricas de semiconductores en Japón (subvenciones públicas a TSMC-JASM, Rapidus, Kioxia, Micron)', efecto: '+', horizonte: 'Cíclico', evidencia: 'La climatización industrial de Takasago pasó de 136.503 M (FY2021) a 248.606 M (FY2025); la cartera de oportunidades de semiconductores sube en 2026 [4, 5].' },
      { driver: 'Escasez de técnicos y subcontratistas (envejecimiento, límite de horas extra desde abril de 2024)', efecto: '+/−', horizonte: 'Estructural', evidencia: 'Da poder de precio (más contratos a coste más margen) pero limita cuánta obra se puede hacer [5].' },
      { driver: 'Redesarrollos urbanos y renovación de edificios', efecto: '+', horizonte: 'Estructural', evidencia: 'Los grandes redesarrollos de oficinas dan trabajo estable hasta 2029 según la empresa [5].' },
      { driver: 'Centros de datos (IA)', efecto: '+', horizonte: 'Cíclico', evidencia: 'Equipo dedicado y más volumen que antes, pero los pedidos se retrasan al año siguiente [5].' },
      { driver: 'Descarbonización y eficiencia energética (renovación de equipos, bombas de calor, hidrógeno)', efecto: '+', horizonte: 'Estructural', evidencia: 'Línea de negocio de neutralidad de carbono del plan a medio plazo [4].' },
      { driver: 'Coste de construcción', efecto: '−', horizonte: 'Cíclico', evidencia: 'La subida de costes puede frenar decisiones de inversión de los clientes, según la propia empresa [5].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Cinco o seis grandes de climatización (Takasago, Sanki, Taikisha, Dai-Dan, Shinryo privada) y los grupos eléctricos (Kinden, Kandenko); hoy hay más obra que capacidad [5, 6].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Grandes fabricantes y constructoras generales; hoy aceptan contratos a coste más margen por la escasez [5].' },
      { fuerza: 'Poder de los proveedores', intensidad: 3, justificacion: 'Los subcontratistas especializados escasean; materiales con cláusulas de revisión [5].' },
      { fuerza: 'Amenaza de entrada', intensidad: 1, justificacion: 'Hacen falta licencias, técnicos certificados, historial de obras de salas limpias y una red de subcontratistas [7].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 1, justificacion: 'La climatización y las salas limpias no tienen sustituto; la prefabricación (T-Base) cambia cómo se hace, no si se hace [4].' },
    ],
    ciclo: { posicion: 'Expansión madura', comentario: 'El ciclo de inversión en fábricas de semiconductores en Japón vivió su pico de obra nueva en FY2023-FY2025 [4]. En FY2025 los pedidos industriales de Takasago cayeron un 6,3 % y la cartera industrial un 20,7 %, compensados por la general (+30,4 %); en 2026 la cartera de oportunidades de semiconductores vuelve a subir, ahora sobre todo en ampliaciones (94 % de renovación en los pedidos industriales del 1T) [4, 5]. El sector de obra japonés no cae desde 2011 porque la oferta (técnicos) es el límite, no la demanda. Un parón de inversión en semiconductores sí se notaría: en FY2019-FY2021 el margen de explotación de Takasago estaba en el 4-5 %.' },
    regulacion: 'Licencia de contratista (建設業法) y la ley de subcontratación, que obliga a pagar antes y mejor a los subcontratistas (por eso bajaron los proveedores) [7]. El límite de horas extra en la construcción desde abril de 2024 reduce la capacidad de obra [5]. Normas de eficiencia energética de edificios (ZEB) y la política industrial de semiconductores (subvenciones de METI a Rapidus y TSMC) empujan la demanda [4]. Precios públicos de mano de obra (公共工事設計労務単価) suben cada año.',
    tendencias: 'Tres tendencias: (1) prefabricación y digitalización de la obra (T-Base de Takasago, BIM) para hacer más con menos técnicos, con una contribución que la empresa cifra en 13.000 M de obra en FY2026 y 50.000 M en FY2030 [4, 5]; (2) contratos directos con el cliente y a coste más margen, que suben el margen al contratar [5]; (3) internacionalización al sudeste asiático e India siguiendo a los fabricantes japoneses y a los centros de datos [4]. Takasago gana con las tres; la amenaza es que el ciclo de semiconductores se enfríe a la vez que se normaliza la escasez.',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 4.1,
    posicion: '1.º contratista independiente de climatización de Japón por ventas (423.923 M en FY2025, frente a 286.127 M de Taikisha, 254.673 M de Sanki y 256.228 M de Dai-Dan); los grupos eléctricos Kinden y Kandenko son mayores pero hacen sobre todo instalación eléctrica [6]. Cuota del 4,1 % del mercado amplio de climatización y fontanería (estimación propia: 423.923 / 10.315.700) [2].',
    competidores: ['1979.T', '1961.T', '1980.T', '1944.T', '1942.T', '2404.TW'].map((t) => {
      const e = cp[t]; const c = compet[t];
      const com = { '1979.T': 'Rival directo en salas limpias industriales (automóvil y semiconductores) y pintura; más peso exterior [6].', '1961.T': 'Climatización y fontanería de edificios; más peso de climatización general [6].', '1980.T': 'Climatización y electricidad de edificios; margen alto con renovaciones [6].', '1944.T': 'Grupo de instalaciones eléctricas y de climatización ligado a Kansai Electric [6].', '1942.T': 'Grupo de instalaciones eléctricas ligado a TEPCO; centros de datos y redes [6].', '2404.TW': 'Contratista taiwanés de salas limpias para TSMC; compite en las fábricas de TSMC fuera de Taiwán [6].' }[t];
      return { nombre: e.nombre, pais: t.endsWith('.TW') ? 'TW' : 'JP', ticker: t, ingresos: e.ventas_ltm, cuota_pct: null, margen_ebit_pct: c ? c.margen_ebit_yahoo : null, comentario: com };
    }),
    foso: {
      veredicto: 'Estrecho', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'No aplica: cada obra es independiente.' },
        { fuente: 'Costes de cambio', puntuacion: 2, evidencia: 'Las ampliaciones de una fábrica las suele hacer quien la construyó (renovaciones del 94 % de los pedidos industriales en el 1T FY2026) [5].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 2, evidencia: 'Tecnología de salas limpias TCR-SWIT y historial de obras de semiconductores; marca de referencia en Japón [5].' },
        { fuente: 'Ventaja en costes', puntuacion: 2, evidencia: 'Escala en compras y prefabricación (T-Base); margen similar al de los rivales (11,3 % frente al 9-15 %) [6].' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'Red de unos 600 subcontratistas fieles y 2.469 técnicos de la matriz en un mercado donde la capacidad es el límite [4, 5].' },
      ],
    },
    amenazas: 'Taikisha y UIS en salas limpias de semiconductores, y los grupos eléctricos (Kinden, Kandenko) en centros de datos [6]. La mayor amenaza no es un competidor sino el ciclo: si las grandes inversiones en fábricas se frenan, todos los contratistas se disputarán menos obra y los márgenes volverán hacia el 5-8 %.',
    confianza: 'Media',
  },
  historia: {
    resumen: 'Takasago se fundó en 1923 en Tokio como contratista de calefacción (高砂煖房工事) y fue pionera de la climatización en Japón [9]. Cotiza en la Bolsa de Tokio desde 1949. En los años ochenta y noventa se especializó en salas limpias para la industria electrónica y se expandió por Asia [7]. Entre FY2019 y FY2021 el margen de explotación estaba en el 4-5 %; el plan a medio plazo 2026 (lanzado en 2024, revisado en mayo de 2025) y la ola de fábricas de semiconductores en Japón lo llevaron al 11,3 % en FY2025 [4, 14 de A]. En 2023 celebró su centenario con un dividendo conmemorativo [9]. En febrero de 2025 tenedores cruzados (MUFG, Taiyo Life y otros) vendieron 3,1 millones de acciones en una colocación secundaria, y en octubre de 2025 hizo un split 1:2 [D].',
    hitos: [
      { anio: '1923', hito: 'Fundación en Tokio como contratista de calefacción.' },
      { anio: '1949', hito: 'Salida a la Bolsa de Tokio.' },
      { anio: '2020', hito: 'Kazuhito Kojima, presidente y consejero delegado.' },
      { anio: '2023', hito: 'Centenario; arranque de la ola de fábricas de semiconductores (pedidos de 403.110 M).' },
      { anio: '2025', hito: 'Colocación secundaria de tenedores cruzados (febrero), recompra de 8.000 M y split 1:2 (octubre).' },
      { anio: '2026', hito: 'Récord de beneficio de FY2025 (explotación 47.745 M); Hiroshi Kubota, vicepresidente y consejero representante (abril); rating JCR A+.' },
    ],
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Lo material es la seguridad en obra, el capital humano (escasez de técnicos: la plantilla de la matriz pasó de 2.131 a 2.469 y el salario medio subió un 10,3 % en FY2025 hasta 12,46 M JPY) y la eficiencia energética que instala en los edificios de sus clientes [7, 8]. Su propio impacto ambiental es pequeño (no fabrica), pero la climatización es el mayor consumo de energía de un edificio y de una fábrica de semiconductores: la descarbonización es una oportunidad de negocio [4]. Mujeres directivas: 3,5 % (objetivo 10 % hacia 2030) [8].',
    controversias: 'No constan sanciones, accidentes graves publicados ni litigios relevantes en los últimos tres años [7].',
    confianza: 'Baja',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) Sustainalytics: ficha sin cifra pública; 2) informe de gobierno 2026: no cita calificaciones; 3) web de RI (sostenibilidad): bloqueada por el proxy (502)', decision: 'Omitido' },
    { seccion: 'sector', campo: 'cr5_pct', tipo: 'Complemento', intentos: '1) MLIT: no publica cuotas; 2) Yano: solo total de los 73 grandes; 3) presentaciones de la empresa: comparan con rivales sin cuotas', decision: 'Omitido' },
  ],
};
guarda('B', B);

// ================================================================ C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Corporate Governance Report (25-jun-2026): estructura, comisiones, política de remuneración y de capital', editor: TTE, tipo: 'Primaria', fecha: '2026-06-25', url: u('gobierno-2026') },
  { id: 2, titulo: 'Notice of Convocation of the 146th Annual General Meeting (candidatos, trayectoria y acciones de cada consejero)', editor: TTE, tipo: 'Primaria', fecha: '2026-06-05', url: u('junta-2026') },
  { id: 3, titulo: '臨時報告書 (resultado de las votaciones de la junta del 25-jun-2026: reelección de Kazuhito Kojima con el 88,7 %)', editor: 'Takasago Thermal Engineering (EDINET)', tipo: 'Primaria', fecha: '2026-06-26', url: `${ED}/S100YM7V.pdf` },
  { id: 4, titulo: '臨時報告書 (votaciones de la junta del 19-jun-2024: reelección de Kojima con el 92,9 %)', editor: 'Takasago Thermal Engineering (EDINET)', tipo: 'Primaria', fecha: '2024-06-20', url: `${ED}/S100TO7S.pdf` },
  { id: 5, titulo: '有価証券報告書 第146期 (yuho FY2025): remuneración por tipo y de Kojima (159 M), cartera de participaciones cruzadas, accionistas', editor: 'Takasago Thermal Engineering (EDINET)', tipo: 'Primaria', fecha: '2026-06-25', url: u('yuho-fy2025') },
  { id: 6, titulo: 'Notice of Change in Representative Directors (Hiroshi Kubota, vicepresidente y consejero representante desde el 1-abr-2026)', editor: TTE, tipo: 'Primaria', fecha: '2026-01-22', url: u('cambio-presidente-2026') },
  { id: 7, titulo: 'Notice of Secondary Offering of Shares (venta de 3.106.800 acciones de tenedores cruzados) y fijación del precio', editor: TTE, tipo: 'Primaria', fecha: '2025-02-13', url: u('colocacion-2025') },
  { id: 8, titulo: 'Notice of Resolutions of the 146th AGM', editor: TTE, tipo: 'Primaria', fecha: '2026-06-25', url: u('votos-junta-2026') },
  { id: 9, titulo: 'Revisiones de la guía (29-oct-2025 y 13-feb-2026) y guías iniciales de FY2022-FY2025 en los tanshin', editor: TTE, tipo: 'Primaria', fecha: '2026-02-13', url: u('revision-feb2026') },
  { id: 10, titulo: 'Kessan tanshin FY2022-FY2025 (guía inicial de cada ejercicio)', editor: TTE, tipo: 'Primaria', fecha: '2026-05-12', url: u('tanshin-fy2025') },
];
const C = {
  _estado: 'completa',
  directivos: {
    equipo: [
      { nombre: 'Kazuhito Kojima (小島和人)', cargo: 'Presidente y consejero delegado (代表取締役社長)', desde: '2020', participacion_pct: 0.15, trayectoria: 'Toda su carrera en Takasago; consejero desde 2019 y presidente desde abril de 2020. Con él el margen de explotación pasó del 4,8 % al 11,3 % y lanzó el plan a medio plazo 2026 y T-Base. 193.478 acciones [2].' },
      { nombre: 'Hiroshi Kubota (久保田浩司)', cargo: 'Vicepresidente ejecutivo y consejero representante', desde: '2026', participacion_pct: 0.04, trayectoria: 'Consejero desde 2022; representante desde el 1-abr-2026, lo que lo sitúa como posible sucesor. 57.673 acciones [2, 6].' },
      { nombre: 'Tadashi Kamiya (神谷忠史)', cargo: 'Consejero, director ejecutivo sénior (ingeniería y obra)', desde: '2019', participacion_pct: 0.06, trayectoria: 'Carrera técnica en la empresa; 79.817 acciones [2].' },
      { nombre: 'Ichiro Yamamoto (山本一郎)', cargo: 'Consejero y director ejecutivo (finanzas y relación con inversores)', desde: '2026', participacion_pct: 0.02, trayectoria: 'Nuevo consejero en junio de 2026, sustituye en la práctica a Masatoshi Morino (finanzas, retirado el 31-mar-2026). 21.823 acciones [2].' },
    ],
    historial_guidance: [
      { anio: 'FY2022', guia: 'Ventas 311.000 / explotación 13.100 / neto 10.800', real: 'Ventas 338.831 / explotación 15.326 / neto 12.227', cumplida: 'Sí' },
      { anio: 'FY2023', guia: 'Ventas 359.000 / explotación 15.500 / neto 12.700', real: 'Ventas 363.366 / explotación 24.192 / neto 19.612', cumplida: 'Sí' },
      { anio: 'FY2024', guia: 'Ventas 370.000 / explotación 25.700 / neto 21.400', real: 'Ventas 381.661 / explotación 32.415 / neto 27.631', cumplida: 'Sí' },
      { anio: 'FY2025', guia: 'Ventas 410.000 / explotación 36.000 / neto 28.700 (subida a 43.300 y 47.100 de explotación en oct-25 y feb-26)', real: 'Ventas 423.923 / explotación 47.745 / neto 37.470', cumplida: 'Sí' },
    ],
    comentario: 'Equipo de la casa, como es norma en Japón: el presidente lleva 6 años en el cargo y toda su carrera en la empresa [2]. La credibilidad es alta y medible: la guía inicial se ha superado los cuatro últimos años, y por mucho en beneficio (FY2025: explotación 47.745 M frente a 36.000 M de la guía inicial) [9, 10]. Eso también significa que la guía es conservadora por costumbre: la de FY2026 (explotación 50.000 M, +4,7 %) seguramente esconde margen. La sucesión parece encauzada (Kubota, representante desde abril de 2026) y el relevo en finanzas (Yamamoto por Morino) fue ordenado [6]. Los directivos tienen pocas acciones (menos del 0,3 % entre todos), pero cobran en acciones a través del plan BIP [1].',
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      { nombre: 'Shuma Uchino (内野州馬)', cargo: 'Presidente del consejo (externo, ex-Mitsubishi Corporation)', tipo: 'Independiente', desde: '2023', comisiones: 'Gobierno, nombramientos y remuneraciones' },
      { nombre: 'Kazuhito Kojima', cargo: 'Consejero representante, presidente y consejero delegado', tipo: 'Ejecutivo', desde: '2019', comisiones: 'Gobierno, nombramientos y remuneraciones' },
      { nombre: 'Hiroshi Kubota', cargo: 'Consejero representante, vicepresidente ejecutivo', tipo: 'Ejecutivo', desde: '2022', comisiones: '—' },
      { nombre: 'Tadashi Kamiya', cargo: 'Consejero, director ejecutivo sénior', tipo: 'Ejecutivo', desde: '2019', comisiones: '—' },
      { nombre: 'Ichiro Yamamoto', cargo: 'Consejero, director ejecutivo', tipo: 'Ejecutivo', desde: '2026', comisiones: '—' },
      { nombre: 'Atsushi Takagi (髙木敦)', cargo: 'Consejero externo', tipo: 'Independiente', desde: '2022', comisiones: 'Gobierno, nombramientos y remuneraciones (presidente)' },
      { nombre: 'Yoko Seki (関葉子)', cargo: 'Consejera externa', tipo: 'Independiente', desde: '2019', comisiones: 'Gobierno, nombramientos y remuneraciones' },
      { nombre: 'Hideka Morimoto (森本英香)', cargo: 'Consejero externo (ex-viceministro de Medio Ambiente)', tipo: 'Independiente', desde: '2021', comisiones: 'Gobierno, nombramientos y remuneraciones' },
      { nombre: 'Hirotaka Yamada', cargo: 'Consejero miembro de la comisión de auditoría (interno)', tipo: 'Otro externo', desde: '2024', comisiones: 'Auditoría y supervisión' },
      { nombre: 'Sakakibara', cargo: 'Consejero externo, comisión de auditoría', tipo: 'Independiente', desde: null, comisiones: 'Auditoría y supervisión (presidente)' },
      { nombre: 'Hioka', cargo: 'Consejero externo, comisión de auditoría', tipo: 'Independiente', desde: null, comisiones: 'Auditoría y supervisión' },
      { nombre: 'Wakamatsu', cargo: 'Consejero externo, comisión de auditoría', tipo: 'Independiente', desde: null, comisiones: 'Auditoría y supervisión' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: 88.7,
    remuneracion_ceo: { anio: 'FY2025', total: 159, fijo: 56, variable_corto: 68, variable_largo: 34, ratio_salario_medio: 12.8 },
    remuneracion: 'Kazuhito Kojima cobró 159 M JPY en FY2025: 56 M fijos, 68 M de bonus y 34 M en acciones (plan BIP) [5]. Los cuatro consejeros internos sumaron 389 M (153 fijos, 155 de bonus, 80 en acciones) [5]. Estructura objetivo del consejero representante: 40 % fijo, 30 % bonus y 30 % acciones [1]. El bonus (0-200 %) depende en un 50 % del beneficio ordinario consolidado, un 20 % del margen bruto y un 30 % de la evaluación individual; las acciones, en un 60 % de objetivos del plan a medio plazo (ordinario 30 %, ROE 20 %, rentabilidad total frente al TOPIX 30 %, CO2 y compromiso de la plantilla) [1]. La remuneración no se vota cada año en Japón; la reelección de Kojima obtuvo el 88,7 % en junio de 2026 (92,9 % en 2024), con un 11,2 % en contra probablemente por las recomendaciones de los asesores de voto sobre la cartera cruzada [3, 4]. El sueldo del presidente equivale a 12,8 veces el salario medio de la matriz (12,46 M) [5].',
    accionistas: [
      { nombre: 'The Master Trust Bank of Japan (fideicomiso)', pct: 10.64, tipo: 'Custodio (fondos índice e institucionales)', variacion: '— [5]' },
      { nombre: 'Nippon Life Insurance', pct: 6.83, tipo: 'Tenedor cruzado (aseguradora)', variacion: 'Estable [5].' },
      { nombre: 'State Street Bank and Trust (custodio)', pct: 5.47, tipo: 'Custodio de inversores extranjeros', variacion: '— [5]' },
      { nombre: 'Asociación de empleados de Takasago (持株会)', pct: 4.71, tipo: 'Empleados', variacion: '— [5]' },
      { nombre: 'Takasago Kyoeikai (asociación de subcontratistas y proveedores)', pct: 4.03, tipo: 'Proveedores (estable)', variacion: '— [5]' },
      { nombre: 'Custody Bank of Japan (fideicomiso)', pct: 3.97, tipo: 'Custodio', variacion: '— [5]' },
      { nombre: 'Capital Research and Management', pct: 3.74, tipo: 'Gestora (Capital Group)', variacion: 'Declaración de participación de mayo de 2026.' },
      { nombre: 'Dai-ichi Life Insurance', pct: 3.17, tipo: 'Tenedor cruzado (aseguradora)', variacion: '— [5]' },
    ],
    insiders: [],
    control_y_defensas: 'Sin accionista de control: el mayor es un custodio (10,6 %), y entre aseguradoras, bancos y socios comerciales (tenedores cruzados), la asociación de empleados y la de subcontratistas suman cerca de una cuarta parte del capital; el flotante libre según la empresa es del 53,1 % [5]. Sin medidas antiOPA [1]. Una acción, un voto. Sociedad con comisión de auditoría y supervisión: 12 consejeros, 7 externos independientes, y el presidente del consejo es externo (Shuma Uchino) [1, 2]. Los tenedores cruzados siguen vendiendo (colocación secundaria de 3,1 millones de acciones en febrero de 2025), lo que da estabilidad de voto decreciente y oferta de acciones latente [7]. Japón no tiene un registro público de operaciones de directivos; sus acciones aparecen en la convocatoria de cada junta [2].',
    alertas: [
      'Ventas de tenedores cruzados (colocación secundaria de feb-2025) que pueden repetirse y pesar sobre el precio [7].',
      'La reelección del presidente bajó del 92,9 % (2024) al 88,7 % (2026) [3, 4].',
    ],
    confianza: 'Media',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'insiders', tipo: 'Complemento', intentos: '1) Japón no tiene registro público de operaciones de directivos; 2) convocatorias de 2025 y 2026: solo saldos de acciones; 3) informes de grandes participaciones (EDINET): solo accionistas de más del 5 %', decision: 'Omitido' },
    { seccion: 'gobierno', campo: 'voto de la junta de 2025', tipo: 'Complemento', intentos: '1) Búsqueda del informe extraordinario de junio de 2025 en EDINET (disclosure2dl): no localizado; 2) web de RI: bloqueada; 3) prensa: sin datos', decision: 'Omitido' },
    { seccion: 'gobierno', campo: 'desde de los consejeros de la comisión de auditoría', tipo: 'Complemento', intentos: '1) Informe de gobierno 2026: nombres sin fecha de entrada; 2) convocatoria 2026: solo los candidatos de ese año; 3) yuho: lista en japonés sin año en el texto extraído', decision: 'Omitido' },
  ],
};
guarda('C', C);

// ================================================================ D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de 1969.T, 1306.T (ETF del TOPIX) y 1619.T (ETF de construcción y materiales TOPIX-17)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/1969.T/history' },
  { id: 2, titulo: 'Takasago Thermal Engineering: estimaciones FY2026-FY2027 (6 analistas), objetivo medio 5.975 JPY (5.250-6.900) y cambios de recomendación', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-19', url: 'https://www.marketscreener.com/quote/stock/TAKASAGO-THERMAL-ENGINEE-6492012/' },
  { id: 3, titulo: 'Interest Rate (jgbcme.csv): bono del Estado japonés a 10 años, 2,958 % el 16-oct-2026 (último publicado al corte)', editor: 'Ministerio de Hacienda de Japón', tipo: 'Datos de mercado', fecha: '2026-10-16', url: u('jgbcme') },
  { id: 4, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026: 4,20 %', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 5, titulo: 'Fichas de comparables (capitalización, valor empresa, ventas, flujo libre, PER adelantado) de nueve contratistas de instalaciones', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com' },
  { id: 6, titulo: 'PER con la previsión de la propia empresa (会社予想PER) de Kinden, Sanki, Taikisha, Dai-Dan, Kandenko, Hibiya y Takasago', editor: 'Yahoo! Japan Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.co.jp/quote/1969.T' },
  { id: 7, titulo: 'Kessan tanshin 1T FY2026: balance a 30-jun-2026, acciones emitidas y autocartera, guía FY2026', editor: TTE, tipo: 'Primaria', fecha: '2026-08-05', url: u('tanshin-1t-fy2026') },
  { id: 8, titulo: 'Yuho FY2025: cartera de participaciones cruzadas (34 cotizadas por 43.013 M y 49 no cotizadas por 2.394 M), diferencia de valoración neta de impuestos', editor: 'Takasago Thermal Engineering (EDINET)', tipo: 'Primaria', fecha: '2026-06-25', url: u('yuho-fy2025') },
  { id: 9, titulo: 'Bolsa: movimiento del precio (movimiento.mjs) de 1969.T', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/1969.T' },
  { id: 10, titulo: 'Titulares de kabutan y Nikkei sobre Takasago (revisión de guía de feb-2026, resultados de mayo y agosto de 2026, cambios de recomendación de Nomura y Morgan Stanley MUFG)', editor: 'Yahoo! Japan Finance (noticias)', tipo: 'Prensa', fecha: '2026-10-19', url: 'https://finance.yahoo.co.jp/quote/1969.T/news' },
  { id: 11, titulo: 'FY2025 Financial Results Presentation: guía FY2026, dividendos y capital', editor: TTE, tipo: 'Primaria', fecha: '2026-05-12', url: u('briefing-fy2025') },
];
const perJP = { '1944.T': 17.54, '1961.T': 15.19, '1979.T': 12.88, '1980.T': 14.65, '1942.T': 15.98, '1982.T': 16.08 };
const paisDe = (t) => (t.endsWith('.T') ? 'JP' : t.endsWith('.TW') ? 'TW' : 'US');
const D = {
  _estado: 'completa',
  identificacion: {
    nombre: 'Takasago Thermal Engineering Co., Ltd. (高砂熱学工業株式会社)', nombre_corto: 'Takasago Thermal', ticker: '1969.T', isin: 'JP3455200000',
    mercado: 'Bolsa de Tokio (Prime Market), JPY', indice_referencia: 'TOPIX',
    pais: 'Japón', pais_iso: 'JP', sector: 'Industria', industria: 'Ingeniería e instalaciones (climatización y salas limpias)', sede: 'Tokio (Shinjuku)', fundacion: '1923', empleados: 7287, web: 'https://www.tte-net.com',
    precio: PRECIO, fecha_precio: '2026-10-19', acciones: ACCIONES, capitalizacion_publicada: null, free_float_pct: 53.1,
    max_52s: bolsa.identificacion.max_52s, min_52s: bolsa.identificacion.min_52s, volumen_medio_diario: `≈ ${Math.round(bolsa.volumen_3m.importe_dia_millones).toLocaleString('es-ES')} M JPY/día (3 meses)`, proximos_resultados: '2026-11-13',
  },
  consenso: {
    guidance: 'Guía FY2026 (12-may-2026, mantenida el 5-ago): ventas 440.000 M (+3,8 %), beneficio de explotación 50.000 M (+4,7 %), ordinario 52.000 M, neto 40.000 M (BPA 305,63 JPY), pedidos 520.000 M y DPA 123 JPY [7, 11]. La empresa ha superado su guía inicial los cuatro últimos años [C]. Los resultados del 2T FY2026 se esperan hacia el 13-nov-2026 (el año pasado, el 14-nov; fecha exacta sin publicar al corte) [7].',
    estimaciones: [
      { periodo: 'FY2026e', ingresos: 446667, ebitda: null, ebit: null, bpa: 327.0, dpa: 128.7, fuente: 'MarketScreener, 6 analistas [2]' },
      { periodo: 'FY2027e', ingresos: 483500, ebitda: null, ebit: null, bpa: 358.8, dpa: 141.0, fuente: 'MarketScreener [2]' },
    ],
    recomendaciones: { n_analistas: 6, comprar: null, mantener: null, vender: null, po_medio: 5975, po_min: 5250, po_max: 6900 },
    revisiones: 'El consenso está por encima de la guía (BPA FY2026e 327 frente a 305,63) porque los analistas descuentan que la empresa la vuelva a batir [2, 7]. Movimientos recientes: Nomura subió a «comprar» el 27-may-2026 (objetivo 5.500); un gran bróker japonés mantuvo «comprar» y bajó el objetivo a 5.400 el 26-ago tras el 1T; Morgan Stanley MUFG subió de neutral a sobreponderar el 14-sep (4.900 → 5.900) [10]. El objetivo medio (5.975 JPY) queda un 43 % por encima del precio. Uso solo ventas y BPA del consenso: su EBIT de FY2026e (53.960 M) parece incluir partidas no operativas, como el de Yahoo para las japonesas [2].',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    tipo_rentabilidad: bolsa.bolsa.tipo_rentabilidad,
    rentabilidades: bolsa.bolsa.rentabilidades,
    anual: bolsa.bolsa.anual,
    beta: 1.05, volatilidad_pct: bolsa.bolsa.volatilidad_pct, max_drawdown_pct: bolsa.bolsa.max_drawdown_pct, posicion_corta_pct: null,
    comentario: 'La acción multiplicó por cinco su precio entre marzo de 2023 y febrero de 2026 (+85,9 % en 2023, +103,6 % en 2024 y +43,6 % en 2025, frente al +20-28 % del TOPIX) al subir el beneficio y el múltiplo a la vez [1]. Desde el máximo de 5.749 JPY del 13-feb-2026 cae un 27 %: ese día bajó un 9,4 % pese a subir la guía, y luego vinieron los resultados de mayo con una guía modesta (−7,3 % y −5,7 %) y un 1T flojo en agosto [1, 10]. En el último año gana un 3,9 % con dividendos frente al +31 % del TOPIX y el +19 % del sector de construcción [1]. Beta de 1,08 mensual a 5 años frente al ETF del TOPIX (ajustada 1,05; semanal a 2 años 0,95); volatilidad del 41 % y caída máxima del −28,8 % (mayo-agosto de 2024) [1].',
  },
  multiplos_historicos: {
    serie: bolsa.cierres_ejercicio.filter((c) => ['FY2021', 'FY2022', 'FY2023', 'FY2024', 'FY2025'].includes(c.anio)).map((c) => ({ anio: c.anio, precio_cierre: c.precio_cierre, ev_ebitda_ntm: null, per_ntm: { FY2021: r2(867.5 / 92.35), FY2022: r2(1054.5 / 147.84), FY2023: r2(2435 / 208.07), FY2024: r2(2776 / 285.73) }[c.anio] ?? null, excluir: false })),
    confianza: 'Media',
  },
  comparables: {
    empresas: comps.filter((e) => e.simbolo !== '1969.T').map((e) => {
      const jp = paisDe(e.simbolo) === 'JP';
      return { nombre: e.nombre, ticker: e.simbolo, pais: paisDe(e.simbolo), capitalizacion: e.capitalizacion, ev_ventas: e.ev_ventas, ev_ebitda_ltm: jp ? null : e.ev_ebitda_ltm, ev_ebitda_ntm: null, per_ntm: jp ? perJP[e.simbolo] : e.per_ntm, crecimiento_pct: e.crec_ult_ejercicio_pct, margen_ebitda_pct: jp ? null : e.margen_ebitda_pct, roic_pct: compet[e.simbolo]?.roic ?? null, dn_ebitda: e.dn_ebitda, fcf_yield_pct: e.fcf_yield_pct };
    }),
    criterio: 'Seis contratistas japoneses de instalaciones (cuatro de climatización y dos grupos eléctricos con climatización) y tres extranjeros de salas limpias e instalaciones (UIS de Taiwán, Comfort Systems y EMCOR de EE. UU.). Para las japonesas, el PER es el de la previsión de la propia empresa para el ejercicio a marzo de 2027 (Yahoo! Japan, 19-oct-2026), y el EV/EBITDA y el margen EBITDA van vacíos porque el EBITDA de Yahoo para Japón incluye partidas no operativas (Takasago: 57.007 M frente a 51.503 M propios); para las extranjeras, el PER adelantado de Yahoo [5, 6]. Takasago: PER de 13,7 con su propia guía.',
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [],
    confianza: 'Baja',
  },
  valoracion: {
    // Puente a 30-jun-2026 [7, 8]: deuda = préstamos a corto 25.593 + bono a corto 10.000 + bono 5.000. Pensiones: superávit
    // neto (11.495 − 1.769) × (1 − 30,6 %) = 6.750, en negativo (suma). Cartera cruzada (83 valores, 45.407 M a mar-26, a valor de
    // mercado las cotizadas) menos el impuesto latente de su plusvalía (21.883 M netos ⇒ ≈ 9.650 M de impuesto) ≈ 35.750 M: en
    // otros_ajustes con signo negativo (suma). Resto de inversiones financieras (participadas y fondos inmobiliarios verdes) a valor
    // contable: 64.201 − 45.407 = 18.794 M en asociadas.
    puente: { fecha: '2026-06-30', deuda_financiera: 40593, arrendamientos: 0, caja: 42125, minoritarios: 5274, pensiones: -6750, asociadas: 18794, otros_ajustes: -35750 },
    referencia_mercado: { mercado: 'Prima implícita del S&P 500 (Damodaran), la principal, para mercados desarrollados; Japón sin prima adicional', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx, octubre de 2026 [4]' },
  },
  fuentes: fD,
  huecos: [
    { seccion: 'bolsa', campo: 'posicion_corta_pct', tipo: 'Complemento', intentos: '1) JPX publica solo posiciones de más del 0,5 % por gestora, sin total; 2) Yahoo! Japan: margen de crédito, no corto total; 3) karauri.net: 403', decision: 'Omitido' },
    { seccion: 'transacciones', campo: 'operaciones', tipo: 'Complemento', intentos: '1) Compras de contratistas de instalaciones en Japón (Kinden-Tokyo Electrical, Kandenko): sin múltiplos publicados; 2) Shinryo, Taikisha: compras pequeñas sin cifras; 3) EE. UU. (Comfort Systems, EMCOR): compras de empresas privadas sin EBITDA publicado', decision: 'Omitido' },
    { seccion: 'consenso', campo: 'recomendaciones por tipo y EBITDA/EBIT', tipo: 'Complemento', intentos: '1) MarketScreener: media «comprar» sin desglose y EBIT con no operativos; 2) Yahoo! Japan (コンセンサス): 403 en la página de consenso; 3) Yahoo Finance: 6 analistas sin desglose', decision: 'Omitido' },
  ],
};
guarda('D', D);

// ================================================================ E. Sentimiento
const fE = [
  { id: 1, titulo: 'Foro de Yahoo! Japan Finance (掲示板) de 1969: unos 50 comentarios de septiembre y octubre de 2026', editor: 'Yahoo! Japan Finance', tipo: 'Foros y redes', fecha: '2026-10-19', url: 'https://finance.yahoo.co.jp/quote/1969.T/forum' },
  { id: 2, titulo: 'Titulares de kabutan y Nikkei sobre Takasago (agosto-octubre de 2026)', editor: 'Yahoo! Japan Finance (noticias)', tipo: 'Prensa', fecha: '2026-10-19', url: 'https://finance.yahoo.co.jp/quote/1969.T/news' },
  { id: 3, titulo: 'Takasago Thermal Engineering: análisis de valoración (19-oct-2026)', editor: 'Simply Wall St', tipo: 'Foros y redes', fecha: '2026-10-19', url: 'https://simplywall.st/stocks/jp/capital-goods/tse-1969/takasago-thermal-engineering-shares' },
  { id: 4, titulo: 'Q&A de las conferencias de FY2025 y del 1T FY2026 (preguntas de analistas)', editor: TTE, tipo: 'Primaria', fecha: '2026-08', url: u('qa-1t-fy2026') },
];
const E = {
  _estado: 'completa',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Empeora',
    revisadas: [
      { plataforma: 'Foro de Yahoo! Japan Finance (1969)', fecha: '2026-10', n_comentarios: 50, tono: 'Dividido', resumen: 'Mayoría de pequeños accionistas a largo plazo («ガチホ», mantener pase lo que pase) inquietos por la caída desde febrero; unos esperan el 2T para comprar más, otros culpan a la venta de los tenedores cruzados y al fin del ciclo de semiconductores [1].' },
      { plataforma: 'Prensa financiera japonesa (kabutan, Nikkei)', fecha: '2026-08/10', n_comentarios: 8, tono: 'Neutro', resumen: 'Titulares sobre el ordinario del 1T (−12 %), la subida de Morgan Stanley MUFG a sobreponderar (14-sep) y la rotación del mercado japonés hacia otros valores de semiconductores y centros de datos [2].' },
      { plataforma: 'Analistas en las conferencias', fecha: '2026-05/08', n_comentarios: 25, tono: 'Neutro', resumen: 'Preguntas sobre el margen sin las grandes obras, la caída de pedidos industriales, el retraso de los centros de datos y la recompra; tono técnico y sin alarma [4].' },
      { plataforma: 'Simply Wall St', fecha: '2026-10', n_comentarios: 1, tono: 'Positivo', resumen: 'Artículo que ve la acción infravalorada frente a su flujo descontado y a sus rivales [3].' },
    ],
    temas: [
      { tema: 'El ciclo de semiconductores ha tocado techo', postura: 'Bajista', peso: 'Alto', contraste: 'A medias: los pedidos industriales cayeron un 6,3 % en FY2025, pero la cartera industrial repuntó en el 1T FY2026 y la cartera de oportunidades sube [A].' },
      { tema: 'Ventas de los tenedores cruzados', postura: 'Bajista', peso: 'Medio', contraste: 'Real: colocación de 3,1 millones de acciones en feb-2025 y presión de los inversores para deshacer la cartera cruzada en todo Japón [C].' },
      { tema: 'La empresa siempre bate su guía', postura: 'Alcista', peso: 'Medio', contraste: 'Cierto los cuatro últimos años [C]; el consenso ya lo descuenta (BPA 327 frente a 305,6).' },
      { tema: 'Dividendo progresivo y recompras', postura: 'Alcista', peso: 'Medio', contraste: 'Payout del 40 % con DPA de 123 JPY en FY2026 (rentabilidad del 2,9 %) [A].' },
    ],
    lectura: 'El tono es el de una acción que fue favorita y se ha enfriado: los particulares aguantan pero sin convicción, y la prensa ha dejado de hablar de ella mientras los analistas mantienen objetivos de 5.400-6.900 JPY [1, 2]. No hay euforia ni capitulación. La duda que mueve el precio (si el margen de FY2025 fue un pico) es la misma del informe, y la resolverá el 2T del 13-nov. Ningún dato del informe sale de los foros.',
    confianza: 'Media',
  },
  fuentes: fE,
  huecos: [],
};
guarda('E', E);
console.log('Notas A-E escritas.', { per_comps: D.comparables.empresas.map((e) => [e.ticker, e.per_ntm]) });
