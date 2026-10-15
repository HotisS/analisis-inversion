// Escribe las notas A-E de Compass Group (corte 2026-10-15) a partir de los documentos de notas/docs (RNS de resultados,
// informe anual 2025 en ESEF, XBRL), Yahoo Finance (bolsa.mjs y quoteSummary) y prensa. Cada nota cita con [n] de su propia lista.
// Ejecutar: node informes/compass-2026-10-15/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const r1 = (x) => Math.round(x);
const r2 = (x) => Math.round(x * 100) / 100;
const r3 = (x) => Math.round(x * 1000) / 1000;

// Tipos GBP→USD (Yahoo GBPUSD=X): medias del ejercicio para la cuenta y los flujos; cierre para el balance.
// FY2023 ya viene reexpresado en USD por la empresa (informe 2024); FY2021 y FY2022 se publicaron en GBP.
const MEDIA = { FY2021: 1.3693, FY2022: 1.2808 };
const CIERRE = { FY2021: 1.3470, FY2022: 1.1169 };

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Full-year results announcement for the year ended 30 September 2025 (cuentas consolidadas y notas, conciliación subyacente, nota 14 de medidas no NIIF)', editor: 'Compass Group PLC (RNS 8102I)', tipo: 'Primaria', fecha: '2025-11-25', url: 'https://data.fca.org.uk/artefacts/NSM/RNS/19b5f16e-90b9-46fe-8622-723e71a74f5a.html' },
  { id: 2, titulo: 'Full-year results announcement for the year ended 30 September 2024 (2023 reexpresado en USD)', editor: 'Compass Group PLC (RNS 5888N)', tipo: 'Primaria', fecha: '2024-11-26', url: 'https://data.fca.org.uk/artefacts/NSM/RNS/5443336.html' },
  { id: 3, titulo: 'Full-year results announcement for the year ended 30 September 2023 (en GBP; 2022 comparativo)', editor: 'Compass Group PLC (RNS 9039T)', tipo: 'Primaria', fecha: '2023-11-20', url: 'https://data.fca.org.uk/artefacts/NSM/RNS/4974359.html' },
  { id: 4, titulo: 'Full year results announcement for the year ended 30 September 2021 (en GBP)', editor: 'Compass Group PLC (RNS 1842T)', tipo: 'Primaria', fecha: '2021-11-23', url: 'https://data.fca.org.uk/artefacts/NSM/RNS/4187157.html' },
  { id: 5, titulo: 'Half Year Results Announcement for the six months ended 31 March 2026', editor: 'Compass Group PLC', tipo: 'Primaria', fecha: '2026-05-11', url: 'https://www.compass-group.com/content/dam/compass-group/corporate/Investors/Results-presentations/2026/Compass-Group-Half-Year-2026-Press-Release.pdf.downloadasset.pdf' },
  { id: 6, titulo: 'Half year results announcement for the six months ended 31 March 2025', editor: 'Compass Group PLC (RNS, copia de shareprices.com)', tipo: 'Primaria', fecha: '2025-05-14', url: 'https://shareprices.com/rns/half-year-results-announcement-usqa7625f1jj2w1/' },
  { id: 7, titulo: 'Q3 Trading Update (RNS 0987N): crecimiento orgánico del 7,1 %, retención del 96 %, guía de 2026 reiterada', editor: 'Compass Group PLC', tipo: 'Primaria', fecha: '2026-07-21', url: 'https://pdf.dfcfw.com/pdf/H22_AN202607211827203660_1.pdf' },
  { id: 8, titulo: 'Annual Report 2025 (ESEF): gobierno, remuneración, riesgos, clientes, auditor', editor: 'Compass Group PLC', tipo: 'Primaria', fecha: '2025-12', url: 'https://filings.xbrl.org/2138008M6MH9OZ6U2T68/2025-09-30/ESEF/GB/0/2138008M6MH9OZ6U2T68-2025-09-30/reports/2138008M6MH9OZ6U2T68-2025-09-30-T01.xhtml' },
  { id: 9, titulo: 'Annual Report 2022 (ESEF, en GBP): cuenta, balance y flujos de 2021 y 2022', editor: 'Compass Group PLC', tipo: 'Primaria', fecha: '2022-12', url: 'https://filings.xbrl.org/2138008M6MH9OZ6U2T68/2022-09-30/ESEF/GB/0/2138008M6MH9OZ6U2T68-2022-09-30/reports/2138008M6MH9OZ6U2T68-2022-09-30-T01.xhtml' },
  { id: 10, titulo: 'GBPUSD=X: históricos diarios (medias de los ejercicios FY2021-FY2023 y cierres de septiembre)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/quote/GBPUSD%3DX/history/' },
  { id: 11, titulo: 'Half year results 2026: full transcript (conferencia con analistas)', editor: 'Compass Group PLC (Brunswick)', tipo: 'Primaria', fecha: '2026-05-11', url: 'https://www.compass-group.com/content/dam/compass-group/corporate/Investors/Results-presentations/2026/Compass_Group_Half_year_results%202026_Full_Transcript.pdf.downloadasset.pdf' },
  { id: 12, titulo: 'Compass Group PLC agrees to acquire Vermaat Groep (RNS: VE ≈ 1.500 M EUR, ventas ≈ 700 M EUR en 2025)', editor: 'Compass Group PLC', tipo: 'Primaria', fecha: '2025-07-22', url: 'https://www.compass-group.com/content/dam/compass-group/corporate/Investors/Results-presentations/2025/Aquisition%20of%20Vermaat%20RNS.pdf.downloadasset.pdf' },
  { id: 13, titulo: 'ii view: caterer Compass beefs up profit forecasts (consenso previo al 1S26: ventas 24.860 M y beneficio operativo 1.820 M)', editor: 'interactive investor', tipo: 'Prensa', fecha: '2026-05-11', url: 'https://www.ii.co.uk/analysis-commentary/ii-view-caterer-compass-beefs-profit-forecasts-ii539026' },
];

// Cuenta publicada (estatutaria). Subyacente (u*): beneficio operativo y EBITDA subyacentes de la nota de medidas no NIIF.
// amortizaciones = amortización y depreciación subyacentes (sin la de intangibles comprados); ebitda = EBIT publicado + esas amortizaciones;
// no_recurrentes_en_ebitda = beneficio operativo subyacente − EBIT publicado (amortización de intangibles comprados, costes de compras e
// integración, contraprestaciones contingentes y la revisión de la cartera de países). Así el EBITDA ajustado del motor = EBITDA subyacente.
// resultado_financiero = BAI − EBIT (incluye la pérdida neta por venta y cierre de negocios: 203 M en 2024, 31 M en 2025).
function fila(p, f, x) {
  const { ingresos, ebit, bai, impuestos, minoritarios, beneficio_neto, gastos_financieros, uop, uebitda, bpa, dpa, acciones } = x;
  const uda = uebitda - uop;
  return {
    periodo: p, ingresos: r1(ingresos * f), coste_ventas: null, gastos_generales: null,
    ebitda: r1((ebit + uda) * f), amortizaciones: r1(uda * f), ebit: r1(ebit * f),
    resultado_financiero: r1((bai - ebit) * f), bai: r1(bai * f), impuestos: r1(impuestos * f), minoritarios: r1(minoritarios * f),
    beneficio_neto: r1(beneficio_neto * f), gastos_financieros: r1(gastos_financieros * f),
    participadas_en_ebitda: null, no_recurrentes_en_ebitda: r1((uop - ebit) * f),
    bpa: r3(bpa * f), dpa: r3(dpa * f), dpa_extraordinario: 0, acciones_diluidas: acciones,
  };
}
const cuenta = [
  fila('FY2021', MEDIA.FY2021, { ingresos: 17908, ebit: 545, bai: 464, impuestos: 107, minoritarios: 0, beneficio_neto: 357, gastos_financieros: 120, uop: 811, uebitda: 1554, bpa: 0.200, dpa: 0.14, acciones: 1785 }),
  fila('FY2022', MEDIA.FY2022, { ingresos: 25512, ebit: 1500, bai: 1469, impuestos: 352, minoritarios: 4, beneficio_neto: 1113, gastos_financieros: 111, uop: 1590, uebitda: 2371, bpa: 0.626, dpa: 0.315, acciones: 1779 }),
  fila('FY2023', 1, { ingresos: 37907, ebit: 2313, bai: 2137, impuestos: 525, minoritarios: 5, beneficio_neto: 1607, gastos_financieros: 225, uop: 2592, uebitda: 3620, bpa: 0.922, dpa: 0.526, acciones: 1745 }),
  fila('FY2024', 1, { ingresos: 42002, ebit: 2584, bai: 2056, impuestos: 642, minoritarios: 10, beneficio_neto: 1404, gastos_financieros: 393, uop: 2998, uebitda: 4145, bpa: 0.823, dpa: 0.598, acciones: 1707 }),
  fila('FY2025', 1, { ingresos: 46070, ebit: 2964, bai: 2584, impuestos: 704, minoritarios: 12, beneficio_neto: 1868, gastos_financieros: 429, uop: 3335, uebitda: 4645, bpa: 1.101, dpa: 0.659, acciones: 1699 }),
];

// Balance al cierre (septiembre). FY2021-FY2022 en GBP pasados a USD al cambio de cierre.
function bal(p, f, b) {
  const o = { periodo: p };
  for (const [k, v] of Object.entries(b)) o[k] = v == null ? null : r1(v * f);
  return { ...o, activos_contrato: null, pasivos_contrato: null };
}
const B = (activo_total, activo_corriente, pasivo_corriente, pasivo_total, fondo_comercio, intangibles, inmovilizado_material, existencias, clientes, proveedores, caja, deuda_financiera, arrendamientos, patrimonio_neto, minoritarios, reservas) =>
  ({ activo_total, activo_corriente, pasivo_corriente, pasivo_total, fondo_comercio, intangibles, inmovilizado_material, existencias, clientes, proveedores, caja, deuda_financiera, arrendamientos, patrimonio_neto, minoritarios, reservas });
const balance_hist = [
  bal('FY2021', CIERRE.FY2021, B(14868, 4952, 5227, 9949, 4550, 1617, 835, 327, 2684, 4090, 1840, 3635, 845, 4891, 28, 242)),
  bal('FY2022', CIERRE.FY2022, B(18748, 6685, 7033, 12843, 5119, 1960, 948, 511, 3988, 5626, 1983, 3964, 913, 5874, 31, 1419)),
  bal('FY2023', 1, B(21483, 6951, 9320, 15183, 6105, 2480, 1166, 692, 5094, 7166, 1029, 4114, 1153, 6263, 37, 1018)),
  bal('FY2024', 1, B(24349, 7493, 10072, 17443, 6899, 3325, 1411, 734, 5686, 8172, 623, 4596, 1315, 6829, 77, 1574)),
  bal('FY2025', 1, B(26715, 7793, 10665, 18955, 7687, 3999, 1569, 820, 6350, 8639, 575, 5426, 1566, 7653, 107, 2302)),
];

// Flujos: capex = intangibles + activos de cumplimiento de contratos + inmovilizado material (actividades de inversión).
function flu(p, f, x) { const o = { periodo: p }; for (const [k, v] of Object.entries(x)) o[k] = r1(v * f); return o; }
const flujos_hist = [
  flu('FY2021', MEDIA.FY2021, { flujo_operativo: 1171, capex: 614, pagos_arrendamientos: 153, adquisiciones: 157, desinversiones: 0, dividendos: 0, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 }),
  flu('FY2022', MEDIA.FY2022, { flujo_operativo: 1596, capex: 677, pagos_arrendamientos: 152, adquisiciones: 263, desinversiones: 35, dividendos: 418, recompras: 422, emision_acciones: 0, intereses_en_financiacion: 0 }),
  flu('FY2023', 1, { flujo_operativo: 2536, capex: 1088, pagos_arrendamientos: 215, adquisiciones: 389, desinversiones: 58, dividendos: 796, recompras: 1148, emision_acciones: 0, intereses_en_financiacion: 0 }),
  flu('FY2024', 1, { flujo_operativo: 3135, capex: 1409, pagos_arrendamientos: 227, adquisiciones: 784, desinversiones: 225, dividendos: 963, recompras: 577, emision_acciones: 0, intereses_en_financiacion: 0 }),
  flu('FY2025', 1, { flujo_operativo: 3366, capex: 1384, pagos_arrendamientos: 265, adquisiciones: 1251, desinversiones: 166, dividendos: 1047, recompras: 115, emision_acciones: 0, intereses_en_financiacion: 0 }),
];

const A = {
  _estado: 'Completo. Cuentas FY2021-FY2025 del XBRL (ESEF) comprobadas con las notas de resultados; 1S26 y 3T26 de la empresa.',
  negocio: {
    segmentos: [
      { nombre: 'Norteamérica', descripcion: 'EE. UU. y Canadá: el 68 % de las ventas y el 77 % del beneficio operativo subyacente de las regiones en FY2025 [1].', tipo_resultado: 'EBIT', historico: [{ periodo: 'FY2024', ingresos: 28557, resultado: 2335 }, { periodo: 'FY2025', ingresos: 31398, resultado: 2582 }] },
      { nombre: 'Internacional', descripcion: 'Europa (Reino Unido, Francia, Alemania, Países Bajos, Nórdicos…) y resto del mundo (Australia, Japón, Turquía, Oriente Medio); desde FY2025 una sola región [1].', tipo_resultado: 'EBIT', historico: [{ periodo: 'FY2024', ingresos: 13445, resultado: 807 }, { periodo: 'FY2025', ingresos: 14672, resultado: 904 }] },
      { nombre: 'Actividades centrales', descripcion: 'Costes corporativos no repartidos [1].', tipo_resultado: 'EBIT', historico: [{ periodo: 'FY2024', ingresos: 0, resultado: -144 }, { periodo: 'FY2025', ingresos: 0, resultado: -151 }] },
    ],
    geografias: [
      { nombre: 'Estados Unidos', peso_pct: 64.8 }, { nombre: 'Reino Unido', peso_pct: 9.1 }, { nombre: 'Canadá', peso_pct: 3.4 }, { nombre: 'Resto (Europa continental, Australia, Japón, Turquía…)', peso_pct: 22.7 },
    ],
    geografias_criterio: 'origen',
    kpis: [
      { kpi: 'Crecimiento orgánico de ventas', valor_anterior: '10,6 % (FY2024)', valor_actual: '8,7 % (FY2025); 7,2 % en 9M FY2026', variacion: '−1,9 pp', comentario: 'Precio ≈ 3 % y volumen comparable ≈ 1 % en FY2025; en el 1S26 precio 2,7 % y volumen 0,7 % [1, 5, 7].' },
      { kpi: 'Crecimiento neto por nuevos contratos (altas − bajas)', valor_anterior: '4,2 %', valor_actual: '4,5 %', variacion: '+0,3 pp', comentario: 'Cuarto año seguido en el rango objetivo del 4-5 %; antes de la pandemia, ≈ 3 % [1, 2].' },
      { kpi: 'Retención de clientes', valor_anterior: '96,4 % (FY2024)', valor_actual: '96,3 % (FY2025); 96 % en el 1S26 y el 3T26', variacion: '−0,1 pp', comentario: 'Norteamérica 97 %, Internacional 95 % [1, 5, 7].' },
      { kpi: 'Nuevos contratos ganados (ventas anuales, 12 meses)', valor_anterior: '≈ 3.400 M USD', valor_actual: '3.800 M (FY2025); 4.300 M a junio de 2026', variacion: '+11 % y +16 %', comentario: 'La mitad de primera externalización (clientes que antes cocinaban ellos mismos) [1, 7].' },
      { kpi: 'Margen operativo subyacente', valor_anterior: '7,1 %', valor_actual: '7,2 % (FY2025); 7,4 % en el 1S26', variacion: '+10 pb', comentario: 'La empresa aspira a +10-20 pb al año [1, 5, 11].' },
      { kpi: 'ROCE (beneficio operativo neto de impuestos / capital empleado medio)', valor_anterior: '19,0 %', valor_actual: '18,2 %', variacion: '−0,8 pp', comentario: 'Capital empleado con el fondo de comercio de las compras; baja por las compras europeas [1].' },
    ],
    clientes: 'La cartera está muy repartida: el primer cliente es el 2 % de las ventas subyacentes y los diez primeros el 9 % [8]. Los contratos duran de tres a cinco años [1] y la retención supera el 96 % desde hace años (96,3 % en FY2025, 97 % en Norteamérica) [1]. El poder de precios se ve en la inflación de 2022-2024: el precio aportó ≈ 4 % del crecimiento orgánico en FY2024 y ≈ 3 % en FY2025, y el margen subyacente siguió subiendo (6,2 % en 2022, 6,8 % en 2023, 7,1 % en 2024, 7,2 % en 2025) [1, 2, 3]. Por sectores, FY2025: empresas e industria 38,9 % (17.946 M), sanidad y residencias 23,3 %, educación 18,1 %, deportes y ocio 14,1 % y defensa, plataformas y zonas remotas 5,6 % [1].',
    confianza: 'Alta',
  },
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM mar-26', fecha_fin: '2026-03-31', ingresos: 48485, ebitda: 4536, ebit: 3093, beneficio_neto: 2018, bpa: 1.188, dpa: 0.688, dpa_extraordinario: 0, fcf: 1883, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 454 },
    cambios_perimetro: [
      { periodo: 'FY2026', descripcion: 'Vermaat (Países Bajos), consolidada desde el 15-dic-2025 (1.624 M USD con la deuda que se canceló) y Pro Care Management (Alemania) desde el 27-feb-2026 (270 M): entran en el balance de marzo de 2026 y solo en parte en la cuenta del 1S26 [5].' },
      { periodo: 'FY2025', descripcion: 'Dupont Restauration (Francia) y 4Service (Noruega), 701 M; salida de Chile, Colombia, México y Kazajistán [1].' },
    ],
    comentario: 'Las ventas pasan de 24.522 M USD en FY2021 (todavía con la pandemia) a 46.070 M en FY2025. Desde FY2023 crecen a doble dígito con un orgánico del 18,8 % (FY2023), 10,6 % (FY2024) y 8,7 % (FY2025) [1, 2, 3]; las compras netas de ventas aportan poco hasta FY2026 (Vermaat, ≈ 700 M EUR de ventas [12]). El margen operativo subyacente sube 10-60 pb al año: 4,5 % en FY2021, 6,2 % en 2022, 6,8 % en 2023, 7,1 % en 2024, 7,2 % en 2025 y 7,4 % en el 1S26 [1, 3, 4, 5], por apalancamiento de gastos generales y escala de compras. El margen publicado es menor (6,4 % en FY2025) porque resta la amortización de intangibles comprados y los costes de compras y salidas de países. FY2021 y FY2022 se publicaron en GBP y aquí van en USD al cambio medio del ejercicio (1,3693 y 1,2808); FY2023 es la reexpresión en USD de la propia empresa [2, 10]. FY2021 no es comparable (pandemia).',
    ajustes: 'Usamos la cuenta publicada y, para el EBITDA, el subyacente de la empresa: el motor devuelve al EBITDA la diferencia entre el beneficio operativo subyacente y el publicado (371 M en FY2025: 357 M de cargos de compras, de ellos 226 M de amortización de intangibles comprados, 88 M de costes de transacción, 27 M de contraprestaciones contingentes, y 14 M de la revisión de la cartera y la compra de seguro de pensiones) [1]. En FY2024 la diferencia fue de 414 M, con 170 M de la salida de cinco países y un deterioro de 156 M [2]. Los cargos de compras se repiten cada año porque la empresa compra cada año: el BPA subyacente (131,9 centavos en FY2025) va un 20 % por encima del publicado (110,1). Debajo del beneficio operativo, la pérdida por venta y cierre de negocios (31 M en FY2025, 203 M en FY2024) va en el resultado financiero de la tabla.',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '1S24', ingresos: 20744, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 2030, margen_ebitda_pct: 9.8, bpa: 0.59, vs_consenso: null },
      { periodo: '2S24', ingresos: 21258, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 2115, margen_ebitda_pct: 9.9, bpa: 0.605, vs_consenso: null },
      { periodo: '1S25', ingresos: 22568, crecimiento_pct: 8.8, crecimiento_organico_pct: 8.5, ebitda: 2245, margen_ebitda_pct: 9.9, bpa: 0.645, vs_consenso: null },
      { periodo: '2S25', ingresos: 23502, crecimiento_pct: 10.6, crecimiento_organico_pct: null, ebitda: 2400, margen_ebitda_pct: 10.2, bpa: 0.674, vs_consenso: null },
      { periodo: '1S26', ingresos: 24983, crecimiento_pct: 10.7, crecimiento_organico_pct: 7.2, ebitda: 2590, margen_ebitda_pct: 10.4, bpa: 0.728, vs_consenso: 'Superior' },
    ],
    ultima_presentacion: 'Compass publica semestres y dos avances de ventas (1T y 3T). En el 1S26 (11-may-2026) superó lo esperado: ventas de 24.983 M frente a 24.860 M y beneficio operativo subyacente de 1.839 M frente a 1.820 M del consenso [5, 13], y subió la guía de crecimiento del beneficio operativo de 2026 de «en torno al 10 %» a «más del 11 %» [5]. Los analistas preguntaron sobre todo por tres cosas: por qué el crecimiento neto por contratos bajó de 4 % en el 2T (la dirección lo achacó al temporal, que retrasó aperturas, y aseguró cerrar el año en el 4-5 %), si la inflación de alimentos y energía por la guerra de Irán se trasladará a precios (precio del 2,7 % y «sin estar atados a menús») y si habrá recompras: el director financiero lo dejó para noviembre, «según la cartera de compras» [11]. También preguntaron por los centros de datos de IA: la empresa dice que da servicio a los grandes operadores en construcción y explotación [11]. En el 3T (21-jul-2026) el orgánico fue del 7,1 %, el neto por contratos volvió al 4-5 % y la retención siguió en el 96 %; reiteró la guía y avisó de que el capex de 2026 quedará algo por encima del 3,5 % de las ventas [7]. No dio cifra de recompra ni de margen del 2S.',
    confianza: 'Alta',
  },
  balance: {
    historico: balance_hist,
    vencimientos: [{ anio: 'FY2026', importe: 1043 }, { anio: 'FY2027', importe: 300 }, { anio: 'FY2028', importe: 554 }, { anio: 'FY2029', importe: 360 }, { anio: 'FY2030', importe: 578 }, { anio: 'FY2031+', importe: 2591 }],
    liquidez: 'A 31-mar-2026: línea de crédito comprometida de 3.200 M hasta febrero de 2031 sin disponer y 400 M de caja neta de descubiertos (3.600 M de liquidez); 1.100 M de pagarés respaldados por la línea [5].',
    rating: 'S&P A / A-1 (estable); Moody’s A2 / P-1 (estable) [5]',
    coste_deuda_pct: 4.4,
    vida_media_anios: 4.8,
    otros_pasivos: 'Pensiones: superávit contable de 305 M en el plan británico (98 % asegurado) y déficit de 1.420 M en el resto, cubierto con 1.305 M de inversiones (fondo «Rabbi Trust» de EE. UU. y planes no financiados): déficit neto de 115 M a 31-mar-2026 [5]. Covenants de la colocación privada en EE. UU. (300 M que vencen en diciembre de 2026): deuda neta ≤ 3,5 veces el EBITDA (1,6 a marzo) y cobertura de intereses ≥ 3 veces (17,7) [5]. Pagos aplazados y contingentes de compras: 276 M pagados en FY2025 [1]. Provisiones de 779 M (seguros, litigios, reestructuración) [5]. Los proveedores y otras cuentas a pagar (8.857 M) superan a los clientes (6.739 M): el circulante es negativo, como en todo el sector.',
    comentario: 'La deuda neta de la empresa (con arrendamientos y derivados) pasó de 5.391 M en septiembre de 2024 a 6.418 M en septiembre de 2025 y a 8.600 M en marzo de 2026, por Vermaat (1.624 M) y Pro Care (270 M) [1, 5]: 1,7 veces el EBITDA subyacente, por encima del objetivo de 1-1,5 veces, que la dirección quiere recuperar «con el tiempo» [5]. En enero de 2026 colocó 1.500 M EUR en bonos a 2029 y 2035 [5]. El circulante comercial es negativo (−3,2 % de las ventas en FY2025: clientes y existencias 7.170 M frente a 8.639 M de proveedores), lo que financia parte del crecimiento; en FY2025 salió 40 M de circulante y en el 1S26, por estacionalidad, 381 M [1, 5]. FY2021-FY2022 pasados de GBP a USD al cambio de cierre (1,3470 y 1,1169) [10]. El calendario de vencimientos es el de la nota 19 a 30-sep-2025 (5.426 M de deuda bruta, por ejercicio de octubre a septiembre; en FY2026 entran 639 M de pagarés que vencieron en octubre) [8]: no incluye los 1.500 M EUR de bonos de enero de 2026 a 2029 y 2035.',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos_hist,
    comentario: 'La conversión es buena y estable: flujo libre subyacente de 1.975 M en FY2025 (88 % del beneficio subyacente después de impuestos e intereses) y 1.740 M en FY2024 [1, 2]. El capex de la tabla (1.384 M en FY2025) suma inmovilizado, intangibles y «activos de cumplimiento de contratos» (equipamiento de cocinas en el local del cliente que se amortiza durante el contrato); con las inversiones en anticipos a clientes (197 M, dentro del flujo operativo) la empresa da 1.514 M, el 3,3 % de las ventas (3,7 % en FY2024) [1]. No separa el capex de mantenimiento; estimación propia: el de mantenimiento se parece a la amortización subyacente de inmovilizado y contratos (≈ 2,8 % de las ventas) y el resto (≈ 0,5-0,9 %) financia contratos nuevos. Usos de la caja en FY2021-FY2025: dividendos ≈ 3.400 M, recompras ≈ 2.400 M y compras ≈ 2.840 M; en FY2026 las compras subieron a 2.400 M en nueve meses [1, 7].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'KPMG LLP', anios_auditor: 12, opinion: 'Favorable (sin salvedades)',
    senales: [
      { senal: 'Cargos «no subyacentes» que se repiten cada año', nivel: 'Media', comentario: 'Cargos de compras de 244 M en FY2024 y 370 M en FY2025 (amortización de intangibles comprados, costes de transacción, contingentes) más 373 M de salidas de países en FY2024 [1, 2]: el BPA subyacente supera al publicado en un 20-45 %.' },
      { senal: 'Activos de cumplimiento de contratos y anticipos a clientes', nivel: 'Baja', comentario: 'Se capitalizan inversiones en el local del cliente (492 M de compras y 197 M de anticipos en FY2025) y se amortizan durante el contrato [1]: práctica del sector, pero sube el EBITDA frente a quien las lleva a gasto.' },
      { senal: 'Fondo de comercio creciente', nivel: 'Baja', comentario: 'De 4.550 M GBP en 2021 a 7.687 M USD en 2025 y más con Vermaat; sin deterioros relevantes salvo los 156 M de 2024 ligados a salidas de países [1, 2].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Prioridades declaradas, por orden: invertir en el negocio (capex y compras), mantener un rating sólido con deuda neta de 1-1,5 veces el EBITDA, pagar un dividendo ordinario del 50 % del BPA subyacente y devolver el sobrante [1]. Dividendo de 65,9 centavos por FY2025 (+10,2 %) y a cuenta de 25,5 centavos en el 1S26 (+13 %) [1, 5]. Recompras: 1.148 M en FY2023, 577 M en FY2024 y 115 M en FY2025 (cierre del programa de 500 M); ninguna en FY2026, que se ha dedicado a compras en Europa. La decisión sobre devolver caja se anunciará con los resultados de noviembre [11].',
    adquisiciones: [
      { anio: '2026', objetivo: 'Vermaat (Países Bajos, restauración de empresa premium)', importe: 1624, ev_ebitda: null, financiacion: 'Pagarés y luego bonos de 1.500 M EUR', resultado: 'Integración «progresando bien»; acrecitiva en margen y BPA en el primer año completo según la empresa [5, 12].' },
      { anio: '2026', objetivo: 'Pro Care Management (central de compras de alimentación, Alemania)', importe: 270, ev_ebitda: null, financiacion: 'Caja y deuda', resultado: 'Demasiado pronto para juzgar [5].' },
      { anio: '2025', objetivo: 'Dupont Restauration (Francia) y 4Service (Noruega)', importe: 701, ev_ebitda: null, financiacion: 'Caja y deuda', resultado: 'Internacional sube el margen 20 pb en FY2025; las compras «ya contribuyen al beneficio» [1].' },
      { anio: '2024', objetivo: 'Compras pequeñas en EE. UU. (Canteen, máquinas expendedoras) y Hofmann Menü (Alemania)', importe: 784, ev_ebitda: null, financiacion: 'Caja', resultado: 'ROCE del grupo del 19,0 % en FY2024 y 18,2 % en FY2025, con el fondo de comercio incluido [1].' },
    ],
    confianza: 'Media',
  },
  fuentes: fA,
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector, competencia, historia, ESG
const fB = [
  { id: 1, titulo: 'Contract Catering Market Statistics: 280.600 M USD en 2025 y 408.300 M en 2034 (TCAC 4,1 %)', editor: 'IMARC Group', tipo: 'Sectorial', fecha: '2026', url: 'https://www.imarcgroup.com/contract-catering-market-statistics' },
  { id: 2, titulo: 'Global Contract Catering Market 2026-2032: 281.000 M USD en 2025, 383.000 M en 2032; TCAC 2020-2025 del 5,8 %', editor: 'Ken Research', tipo: 'Sectorial', fecha: '2026', url: 'https://www.kenresearch.com/industry-reports/global-contract-catering-market' },
  { id: 3, titulo: 'Full-year results announcement FY2025 (mercado direccionable de ≈ 360.000 M USD, estimación de la dirección)', editor: 'Compass Group PLC', tipo: 'Primaria', fecha: '2025-11-25', url: 'https://data.fca.org.uk/artefacts/NSM/RNS/19b5f16e-90b9-46fe-8622-723e71a74f5a.html' },
  { id: 4, titulo: 'Q3 Trading Update 2026 (mercado fragmentado de 360.000 M USD; centros de datos; Mundial)', editor: 'Compass Group PLC', tipo: 'Primaria', fecha: '2026-07-21', url: 'https://pdf.dfcfw.com/pdf/H22_AN202607211827203660_1.pdf' },
  { id: 5, titulo: 'Sodexo, Aramark, Elior, SSP, Avolta, DO & CO, ISS: ventas, EBITDA, deuda y estimaciones (quoteSummary)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/quote/SW.PA/key-statistics/' },
  { id: 6, titulo: 'Compass Group (historia: Factory Canteens 1941, salida a bolsa en 1988, fusión y separación de Granada 2000-2001, venta de SSP y Moto en 2006)', editor: 'Wikipedia', tipo: 'Prensa', fecha: '2026-10', url: 'https://en.wikipedia.org/wiki/Compass_Group' },
  { id: 7, titulo: 'Caterer Compass records Q3 revenue boost from AI data centres (Reuters): dos tercios de los contratos con precios dinámicos', editor: 'ESM Magazine (Reuters)', tipo: 'Prensa', fecha: '2026-07-21', url: 'https://www.esmmagazine.com/retail/caterer-compass-records-q3-revenue-boost-from-ai-data-centres-317005' },
  { id: 8, titulo: 'Half year results 2026: full transcript', editor: 'Compass Group PLC (Brunswick)', tipo: 'Primaria', fecha: '2026-05-11', url: 'https://www.compass-group.com/content/dam/compass-group/corporate/Investors/Results-presentations/2026/Compass_Group_Half_year_results%202026_Full_Transcript.pdf.downloadasset.pdf' },
  { id: 9, titulo: 'Annual Report 2025 (ESEF): riesgos principales, sostenibilidad, clientes', editor: 'Compass Group PLC', tipo: 'Primaria', fecha: '2025-12', url: 'https://filings.xbrl.org/2138008M6MH9OZ6U2T68/2025-09-30/ESEF/GB/0/2138008M6MH9OZ6U2T68-2025-09-30/reports/2138008M6MH9OZ6U2T68-2025-09-30-T01.xhtml' },
  { id: 10, titulo: 'ii view: caterer Compass sticks with growth forecasts for 2026 (caída del 8 % por el temor a despidos por IA; menos del 2 % de las ventas expuesto, según la empresa)', editor: 'interactive investor', tipo: 'Prensa', fecha: '2026-02-05', url: 'https://www.ii.co.uk/analysis-commentary/ii-view-caterer-compass-sticks-growth-forecasts-2026-ii538044' },
  { id: 12, titulo: 'Half Year Results Announcement 2026', editor: 'Compass Group PLC', tipo: 'Primaria', fecha: '2026-05-11', url: 'https://www.compass-group.com/content/dam/compass-group/corporate/Investors/Results-presentations/2026/Compass-Group-Half-Year-2026-Press-Release.pdf.downloadasset.pdf' },
  { id: 13, titulo: 'Full year results announcement FY2021 (ventas de 17.900 M GBP, margen subyacente del 4,5 %)', editor: 'Compass Group PLC (RNS 1842T)', tipo: 'Primaria', fecha: '2021-11-23', url: 'https://data.fca.org.uk/artefacts/NSM/RNS/4187157.html' },
  { id: 14, titulo: 'Full-year results announcement FY2024 (emisiones e intensidad)', editor: 'Compass Group PLC (RNS 5888N)', tipo: 'Primaria', fecha: '2024-11-26', url: 'https://data.fca.org.uk/artefacts/NSM/RNS/5443336.html' },
];
const B_ = {
  _estado: 'Completo con dos fuentes de tamaño de mercado y las cuentas de seis competidores cotizados.',
  negocio: {
    descripcion: 'Compass es el mayor grupo de restauración colectiva del mundo: gestiona comedores y cafeterías dentro de las instalaciones de sus clientes (oficinas y fábricas, hospitales y residencias, colegios y universidades, estadios y recintos, bases militares y explotaciones mineras o petroleras), y añade máquinas expendedoras, tiendas sin cajero y servicios de apoyo (limpieza, mantenimiento) [3]. Sirve más de 5.000 millones de comidas al año con más de 590.000 empleados en más de 25 países, tras salir de una decena de países no estratégicos en 2024-2025 [3, 4]. Trabaja con marcas propias por sector (Eurest, Levy, Morrison, Chartwells, Bon Appétit, Canteen, ESS) que comparten la escala de compras del grupo [3]. Norteamérica es el 68 % de las ventas; Internacional, ahora casi solo Europa, el 32 % [3].',
    como_gana_dinero: 'Cobra al cliente por cada contrato, de tres a cinco años, con tres fórmulas: a coste más honorario, con subvención del cliente o a riesgo (vende al comensal) [3]. Casi todo el ingreso es recurrente: la retención supera el 96 % [3]. El margen operativo subyacente (7,2 % en FY2025) depende de cuatro cosas: el coste de la comida (27 % de las ventas: 12.434 M), el de la plantilla (47 %: 21.787 M) [3], la capacidad de repercutir la inflación (dos tercios de los contratos con precios dinámicos [7]) y la escala de compras, que es la ventaja frente a rivales más pequeños. El crecimiento es neto por contratos (4-5 %), precio (1,5-3 %) y volumen (0,5-1 %) [8]. Necesita poco capital: capex del 3,3-3,7 % de las ventas y circulante negativo. Estacionalidad suave (educación y deportes).',
    confianza: 'Alta',
  },
  sector: {
    definicion: 'Restauración colectiva externalizada (catering de contrato): comida y servicios de apoyo prestados por un tercero dentro de las instalaciones del cliente, en empresas, sanidad, educación, deportes y ocio y zonas remotas o de defensa. Fuera: restauración comercial, catering aéreo y restauración de viaje (aeropuertos y autopistas). Ámbito mundial. Las consultoras miden solo lo ya externalizado (≈ 281.000 M USD en 2025 [1, 2]); Compass usa un mercado direccionable de ≈ 360.000 M que incluye las actividades que ha añadido con compras y parte de lo que todavía gestionan los propios clientes [3, 4]. Usamos la cifra de Compass para la cuota, porque es el perímetro de sus ventas, y las consultoras para el crecimiento.',
    tamano: '≈ 281.000 M USD en 2025 de mercado externalizado (IMARC 280.600 M [1]; Ken Research 281.000 M [2]); ≈ 360.000 M de mercado direccionable para Compass [3]',
    unidad_serie: 'miles de millones de USD (mercado externalizado, Ken Research)',
    serie: [
      { anio: '2020', tamano: 212 }, { anio: '2025', tamano: 281 }, { anio: '2028e', tamano: 321 }, { anio: '2032e', tamano: 383 },
    ],
    tcac_historico_pct: 5.8,
    tcac_previsto_pct: 4.5,
    cr5_pct: 35,
    estructura: 'Fragmentada',
    drivers: [
      { driver: 'Primera externalización', efecto: '+', horizonte: 'Estructural', evidencia: 'La mitad de los nuevos contratos de Compass en los últimos 12 meses (4.300 M) viene de clientes que antes cocinaban ellos mismos [4].' },
      { driver: 'Inflación de alimentos y salarios', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Sube los ingresos nominales (precio ≈ 3 % en FY2025) y presiona el margen con retraso; dos tercios de los contratos tienen precios dinámicos [3, 7].' },
      { driver: 'Ocupación de oficinas y empleo de oficina', efecto: '−', horizonte: 'Estructural', evidencia: 'Teletrabajo e IA reducen comensales en oficinas; Compass dice que menos del 2 % de sus ventas está expuesto a despidos por IA [10].' },
      { driver: 'Envejecimiento y gasto sanitario', efecto: '+', horizonte: 'Estructural', evidencia: 'Sanidad y residencias es el 23 % de las ventas de Compass y seis de sus veinte mayores contratos de 2026 en Norteamérica [3, 4].' },
      { driver: 'Inversión en defensa, energía y centros de datos', efecto: '+', horizonte: 'Estructural', evidencia: 'Empresas e industria, con los centros de datos de IA, crece a doble dígito y aporta más de 2.000 M de nuevos contratos [4].' },
      { driver: 'Fármacos para adelgazar (GLP-1)', efecto: '−', horizonte: 'Estructural', evidencia: 'Menos comida por comensal; sin efecto visible en el volumen comparable (0,7-1 % al año) [8].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Tres grandes (Compass, Sodexo, Aramark) compiten en concursos con muchos locales; pero la retención del 96 % y el margen estable de Compass (7,2 %) frente a Sodexo (≈ 4,8 % EBITDA) muestran rivalidad contenida para el líder [3, 5].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Grandes clientes licitan cada 3-5 años; el primero es solo el 2 % de las ventas de Compass [9].' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Proveedores de alimentos fragmentados; la escala de compras es la ventaja del líder. La mano de obra sí tiene poder (salarios mínimos) [9].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Entrar en pequeño es fácil, pero los contratos grandes exigen escala, cumplimiento sanitario y capital para equipar cocinas [3].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'El cliente puede volver a cocinar él mismo, cerrar el comedor o dar vales y comida a domicilio; el teletrabajo reduce comensales [10].' },
    ],
    ciclo: { posicion: 'Expansión', comentario: 'El volumen comparable crece 0,5-1 % y la primera externalización sostiene el neto por contratos en el 4-5 % [8]. El sector es defensivo salvo con cierres físicos: en la pandemia las ventas de Compass cayeron de 25.200 M GBP (FY2019) a 17.900 M en FY2021 y el margen al 4,5 % [13]; en 2008-09 bajó el volumen en empresas pero no la retención; en 2022 la inflación subió precios y la recuperación aceleró el crecimiento orgánico al 19 % en FY2023 [3].' },
    regulacion: 'Seguridad alimentaria y alérgenos, salario mínimo y cotizaciones (subida de la cotización social británica de abril de 2025), normas de contratación pública en sanidad, educación y defensa, y requisitos de residuos y emisiones (Compass se ha comprometido con cero emisiones netas en 2050) [9]. En EE. UU., la nutrición escolar depende de las normas federales de comedores. No hay cambios en tramitación con fecha que muevan las cifras.',
    tendencias: 'Tres cambios a favor del líder: la externalización sigue creciendo (la mitad de los contratos nuevos), los clientes piden servicios integrados por sector y la tecnología (pago sin cajero, tiendas automáticas, datos de consumo) premia la escala [3, 4]. En contra: menos comensales en oficinas (teletrabajo, despidos por IA) y menos comida por persona con los GLP-1 [10]. Compass gana cuota frente a Sodexo, que crece un 1 % en 2026, y a Elior [5].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 12.8,
    posicion: '1.º mundial en restauración colectiva: 46.100 M USD de ventas frente a ≈ 360.000 M de mercado direccionable (≈ 16 % del mercado ya externalizado de 281.000 M) [1, 3]',
    competidores: [
      { nombre: 'Sodexo', pais: 'Francia', ticker: 'SW.PA', ingresos: 26438, cuota_pct: 7.3, margen_ebit_pct: 4.0, comentario: 'Número 2; crecimiento orgánico ≈ 1-3 % en 2026 y relanzamiento en Norteamérica; más servicios de instalaciones. Ventas de 23.616 M EUR (12 meses) [5].' },
      { nombre: 'Aramark', pais: 'EE. UU.', ticker: 'ARMK', ingresos: 19845, cuota_pct: 5.5, margen_ebit_pct: 4.5, comentario: 'Número 3, centrado en EE. UU. (educación, deportes, prisiones); orgánico ≈ 8-9 % previsto [5].' },
      { nombre: 'Elior Group', pais: 'Francia', ticker: 'ELIOR.PA', ingresos: 6847, cuota_pct: 1.9, margen_ebit_pct: 2.0, comentario: 'Francia y EE. UU.; muy endeudada (DN/EBITDA ≈ 5,8 veces) y crecimiento plano [5].' },
      { nombre: 'ISS', pais: 'Dinamarca', ticker: 'ISS.CO', ingresos: 13145, cuota_pct: null, margen_ebit_pct: 4.5, comentario: 'Servicios de instalaciones integrados con restauración; compite en contratos de oficinas [5].' },
      { nombre: 'DO & CO', pais: 'Austria', ticker: 'DOC.VI', ingresos: 2797, cuota_pct: 0.8, margen_ebit_pct: 8.6, comentario: 'Catering aéreo y de eventos de gama alta; compite con Levy en grandes eventos deportivos [5].' },
      { nombre: 'Restauración propia de los clientes y operadores locales', pais: 'Mundial', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'La mitad del mercado europeo direccionable sigue sin externalizar según la empresa [10].' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'No aplica: el valor de un comedor no crece con el número de clientes.' },
        { fuente: 'Costes de cambio', puntuacion: 3, evidencia: 'Retención del 96 % y contratos de 3-5 años con cocinas equipadas por el operador; cambiar exige un concurso y una transición [3].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 1, evidencia: 'Marcas por sector conocidas por los compradores (Levy, Chartwells, Morrison), no por el comensal.' },
        { fuente: 'Ventaja en costes', puntuacion: 4, evidencia: 'Escala de compras: el margen subyacente de Compass (7,2 %) casi dobla el de Sodexo y Aramark en EBIT, con el mismo cliente tipo [3, 5].' },
        { fuente: 'Escala eficiente', puntuacion: 2, evidencia: 'Densidad regional y equipos de licitación; pero el mercado es fragmentado y los contratos pequeños los gana cualquiera.' },
      ],
    },
    amenazas: 'El foso es de escala y ejecución, no estructural: un error de servicio en grandes contratos o una guerra de precios de Sodexo y Aramark para recuperar cuota en Norteamérica (Sodexo ha dicho que quiere crecer allí desde 2027 [7]) bajaría el neto por contratos. Probabilidad media. A más largo plazo, menos comensales en oficinas por el teletrabajo y la IA, y menos comida por persona con los GLP-1; la empresa estima menos del 2 % de las ventas expuesto a despidos por IA [10]. La integración de compras grandes en Europa (Vermaat) es un riesgo de ejecución, no del foso.',
    confianza: 'Media',
  },
  historia: {
    resumen: 'Nace en 1941 como Factory Canteens, comedores de fábrica en el Reino Unido; pasa por Grand Metropolitan y sale de él con una compra apalancada de la dirección en 1987, antes de cotizar en Londres en 1988 [6]. En los noventa compra en EE. UU. (Canteen, Eurest, Morrison, Levy) y en 2000-2001 se fusiona y se separa de Granada [6]. En 2006 vende la restauración de viaje (SSP y Moto) por 1.820 M GBP para centrarse en la colectiva [6]. Tras la pandemia, con una ampliación de capital en 2020, crece como nunca: retención por encima del 96 %, neto por contratos del 4-5 %, salida de países pequeños y compras en Europa [3]. Publica en USD desde FY2024 y cotiza en USD en Londres desde el 1-abr-2026 [10].',
    hitos: [
      { anio: '1941', hito: 'Fundada como Factory Canteens Limited (comedores de fábrica) [6].' },
      { anio: '1987', hito: 'Compra apalancada de la dirección a Grand Metropolitan; cotiza en Londres en 1988 [6].' },
      { anio: '1994', hito: 'Compra Canteen Corporation en EE. UU., base de la región que hoy es el 68 % de las ventas [6].' },
      { anio: '2000', hito: 'Fusión con Granada y separación en 2001 en Compass y Granada Media [6].' },
      { anio: '2006', hito: 'Vende la restauración de viaje (SSP y Moto) por 1.820 M GBP; escándalo de contratos con la ONU (ESS) [6].' },
      { anio: '2020', hito: 'Pandemia: ventas a mínimos (17.900 M GBP en FY2021, 77 % de las de 2019) y ampliación de capital [13].' },
      { anio: '2023', hito: 'Pasa a publicar en USD desde el ejercicio 2024 [3].' },
      { anio: '2024-2025', hito: 'Revisión de la cartera: sale de nueve países y compra en Europa (Dupont Restauration, 4Service) [3].' },
      { anio: '2025-2026', hito: 'Compra Vermaat (1.500 M EUR) y Pro Care; cambia la cotización de Londres a USD (1-abr-2026) [10, 12].' },
    ],
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Lo que más mueve las cifras: (1) la plantilla, 590.000 personas y el 47 % de las ventas en salarios (21.787 M en FY2025): salarios mínimos, cotizaciones británicas y rotación pesan en el margen [3, 9]; (2) seguridad alimentaria: el índice de incidentes fue 0,17 frente a un límite de 0,14 en FY2025 y la dirección perdió esa parte del bonus [9]; (3) desperdicio y emisiones de la comida (alcance 3), que suben con las ventas aunque la intensidad bajó un 4 % en FY2024 [14].',
    controversias: 'Sin sanciones ni litigios materiales en los últimos tres años en los documentos revisados (informe anual 2025 y resultados). El precedente es de 2005-2006: corrupción en contratos de la ONU de su filial ESS, con investigaciones en EE. UU. y Reino Unido y acuerdos en 2006 [6].',
    confianza: 'Baja',
  },
  fuentes: fB,
};
guarda('B', B_);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Annual Report 2025 (ESEF): consejo, asistencia, remuneración (tabla de cifra total), participaciones, accionistas significativos, auditor', editor: 'Compass Group PLC', tipo: 'Primaria', fecha: '2025-12', url: 'https://filings.xbrl.org/2138008M6MH9OZ6U2T68/2025-09-30/ESEF/GB/0/2138008M6MH9OZ6U2T68-2025-09-30/reports/2138008M6MH9OZ6U2T68-2025-09-30-T01.xhtml' },
  { id: 2, titulo: 'AGM alert: Compass, Sage, easyJet (retribución del consejero delegado de 10,5 M GBP)', editor: 'interactive investor', tipo: 'Prensa', fecha: '2026-01-16', url: 'https://www.ii.co.uk/analysis-commentary/agm-alert-compass-sage-easyjet-ii537830' },
  { id: 3, titulo: 'Full year results announcement FY2021 (guía de FY2022)', editor: 'Compass Group PLC', tipo: 'Primaria', fecha: '2021-11-23', url: 'https://data.fca.org.uk/artefacts/NSM/RNS/4187157.html' },
  { id: 4, titulo: 'Full-year results announcement FY2023 (resultado de 2023 y guía de 2024)', editor: 'Compass Group PLC', tipo: 'Primaria', fecha: '2023-11-20', url: 'https://data.fca.org.uk/artefacts/NSM/RNS/4974359.html' },
  { id: 5, titulo: 'Full-year results announcement FY2024 (resultado de 2024 y guía de 2025)', editor: 'Compass Group PLC', tipo: 'Primaria', fecha: '2024-11-26', url: 'https://data.fca.org.uk/artefacts/NSM/RNS/5443336.html' },
  { id: 6, titulo: 'Full-year results announcement FY2025 (resultado de 2025 y guía de 2026)', editor: 'Compass Group PLC', tipo: 'Primaria', fecha: '2025-11-25', url: 'https://data.fca.org.uk/artefacts/NSM/RNS/19b5f16e-90b9-46fe-8622-723e71a74f5a.html' },
  { id: 7, titulo: 'Half Year Results Announcement 2026 (guía subida a «más del 11 %»)', editor: 'Compass Group PLC', tipo: 'Primaria', fecha: '2026-05-11', url: 'https://www.compass-group.com/content/dam/compass-group/corporate/Investors/Results-presentations/2026/Compass-Group-Half-Year-2026-Press-Release.pdf.downloadasset.pdf' },
];
const GBPUSD25 = 1.3091; // cambio que usa el propio informe de remuneración
const C = {
  _estado: 'Completo con el informe anual 2025. Operaciones de directivos de 12 meses no revisadas en el registro (solo entregas de planes de incentivos).',
  directivos: {
    equipo: [
      { nombre: 'Dominic Blakemore', cargo: 'Consejero delegado (Group CEO)', desde: '2018', participacion_pct: 0.03, trayectoria: 'En Compass desde 2012 como director financiero, luego director de operaciones de Europa y consejero delegado adjunto; antes en Iglo, Cadbury y PwC [1]. En su mandato el margen subyacente pasó del 7,0 % prepandemia a 7,2 % y la retención al 96 %, con un neto por contratos del 4-5 % cinco años seguidos [6]. Tiene 518.239 acciones [1].' },
      { nombre: 'Petros Parras', cargo: 'Director financiero (Group CFO)', desde: '2023', participacion_pct: 0.0, trayectoria: 'Director financiero de Europa y Oriente Medio en 2020-2023; antes en Procter & Gamble, Reckitt y Coty [1].' },
      { nombre: 'Palmer Brown', cargo: 'Director de operaciones de Norteamérica (COO)', desde: '2021', participacion_pct: null, trayectoria: 'En el grupo desde 2001; director financiero del grupo en 2021-2023; lleva la región que da el 77 % del beneficio de las regiones [1].' },
      { nombre: 'Ian Meakins', cargo: 'Presidente no ejecutivo', desde: '2020', participacion_pct: null, trayectoria: 'Ex consejero delegado de Wolseley (Ferguson), Travelex y Alliance Unichem; preside también Unilever [1].' },
      { nombre: 'Anne-Françoise Nesmes', cargo: 'Consejera independiente coordinadora y presidenta de auditoría', desde: '2018', participacion_pct: null, trayectoria: 'Ex directora financiera de Smith+Nephew, Merlin y Dechra [1].' },
    ],
    historial_guidance: [
      { anio: 'FY2022', guia: 'Crecimiento orgánico del 20-25 % y margen subyacente por encima del 6 % [3]', real: 'Margen subyacente del 6,2 % y beneficio operativo subyacente de 1.590 M GBP (+96 % frente a 811 M) [4]', cumplida: 'Sí' },
      { anio: 'FY2024', guia: 'Crecimiento del beneficio operativo subyacente «hacia el 13 %» con orgánico alto de un dígito [4]', real: '+16,4 % a tipos constantes y orgánico del 10,6 % [5]', cumplida: 'Sí' },
      { anio: 'FY2025', guia: 'Crecimiento del beneficio operativo subyacente alto de un dígito y orgánico por encima del 7,5 % [5]', real: '+11,7 % y orgánico del 8,7 % [6]', cumplida: 'Sí' },
    ],
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      { nombre: 'Ian Meakins', cargo: 'Presidente', tipo: 'Otro externo', desde: '2020', comisiones: 'Nombramientos (presidente), Responsabilidad corporativa' },
      { nombre: 'Dominic Blakemore', cargo: 'Consejero delegado', tipo: 'Ejecutivo', desde: '2012', comisiones: 'Responsabilidad corporativa' },
      { nombre: 'Petros Parras', cargo: 'Director financiero', tipo: 'Ejecutivo', desde: '2023', comisiones: 'Responsabilidad corporativa' },
      { nombre: 'Palmer Brown', cargo: 'Director de operaciones de Norteamérica', tipo: 'Ejecutivo', desde: '2021', comisiones: 'Responsabilidad corporativa' },
      { nombre: 'Anne-Françoise Nesmes', cargo: 'Consejera coordinadora', tipo: 'Independiente', desde: '2018', comisiones: 'Auditoría (presidenta), Nombramientos, Remuneración, Responsabilidad corporativa' },
      { nombre: 'Liat Ben-Zur', cargo: 'Consejera (representa a la plantilla)', tipo: 'Independiente', desde: '2024', comisiones: 'Auditoría, Nombramientos, Remuneración, Responsabilidad corporativa' },
      { nombre: 'Stefan Bomhard', cargo: 'Consejero', tipo: 'Independiente', desde: '2016', comisiones: 'Ninguna desde el 30-sep-2025' },
      { nombre: 'John Bryant', cargo: 'Consejero', tipo: 'Independiente', desde: '2018', comisiones: 'Remuneración (presidente), Auditoría, Nombramientos, Responsabilidad corporativa' },
      { nombre: 'Juliana Chugg', cargo: 'Consejera', tipo: 'Independiente', desde: '2024', comisiones: 'Auditoría, Nombramientos, Remuneración, Responsabilidad corporativa' },
      { nombre: 'Arlene Isaacs-Lowe', cargo: 'Consejera', tipo: 'Independiente', desde: '2021', comisiones: 'Responsabilidad corporativa (presidenta), Auditoría, Nombramientos, Remuneración' },
      { nombre: 'Sundar Raman', cargo: 'Consejero', tipo: 'Independiente', desde: '2022', comisiones: 'Auditoría, Nombramientos, Remuneración, Responsabilidad corporativa' },
      { nombre: 'Leanne Wood', cargo: 'Consejera', tipo: 'Independiente', desde: '2023', comisiones: 'Auditoría, Nombramientos, Remuneración, Responsabilidad corporativa' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: true, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 97.49, voto_remuneracion_contra_pct: 2.51, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: 'FY2025', total: r2(10.508 * GBPUSD25), fijo: r2(1.448 * GBPUSD25), variable_corto: r2(3.325 * GBPUSD25), variable_largo: r2(5.735 * GBPUSD25), ratio_salario_medio: 364 },
    remuneracion: 'Cifra total del consejero delegado en FY2025: 10,51 M GBP (13,76 M USD al cambio del propio informe), con 1,45 M fijos, 3,33 M de bonus (95 % del máximo) y 5,74 M del plan a largo plazo 2022-2023 (93,7 % consolidado) [1]. El bonus pesa un 60 % el crecimiento del beneficio (objetivo 6,5 %, logrado 10,1 %), un 25 % la conversión en caja y un 15 % seguridad, higiene alimentaria y desperdicio; el plan a largo plazo mide ROCE, flujo libre ajustado y rentabilidad relativa para el accionista [1]. La política de 2025 subió el salario un 20,8 % y los máximos al 250 % (bonus) y 500 % (largo plazo) del salario [2]. Ratio frente al empleado británico mediano: 364 veces [1]. Hay cláusulas de recuperación y dos años de tenencia tras la salida [1]. Premia rentabilidad y caja, no crecimiento a cualquier precio, pero el nivel es alto.',
    accionistas: [
      { nombre: 'BlackRock, Inc.', pct: 9.99, tipo: 'Institucional', variacion: 'Notificación DTR 5 vigente a la fecha del informe anual 2025 [1]' },
      { nombre: 'FMR LLC (Fidelity)', pct: 5.09, tipo: 'Institucional', variacion: 'Idem [1]' },
      { nombre: 'Artisan Partners', pct: 4.96, tipo: 'Institucional', variacion: 'Idem [1]' },
      { nombre: 'Invesco', pct: 4.95, tipo: 'Institucional', variacion: 'Idem [1]' },
      { nombre: 'Massachusetts Financial Services', pct: 4.6, tipo: 'Institucional', variacion: 'Idem [1]' },
    ],
    insiders: [],
    control_y_defensas: 'Capital disperso: ningún accionista controla (el mayor, BlackRock, con el 9,99 %) [1]. Una acción, un voto; sin clases ni blindajes. Presidente no ejecutivo independiente al nombramiento, consejera coordinadora y mayoría de independientes (8 de 12) [1]. No hay operaciones vinculadas relevantes [1]. La cotización en USD desde abril de 2026 puede atraer inversores de EE. UU.; la empresa no ha anunciado intención de mover la cotización principal.',
    alertas: ['Subida del 21 % del salario del consejero delegado en 2025 y máximos de incentivos al 250 % y 500 % del salario: votada a favor por el 97,5 % en 2025 [1, 2].', 'Índice de incidentes de seguridad alimentaria por encima del límite en FY2025 (0,17 frente a 0,14) [1].'],
    confianza: 'Media',
  },
  fuentes: fC,
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const bolsa = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa-adr.json'), 'utf8'));
const EURUSD = 1.1195, GBPUSD = 1.1195 / 0.84385, CHFUSD = 1.1195 / 0.9330, DKKUSD = 1.1195 / 7.4754;
const comp = (nombre, ticker, pais, f, mcap, ev, ebitda_ltm, ventas, per_ntm, crec, deuda, caja, fcf, ebitda_ntm) => ({
  nombre, ticker, pais, capitalizacion: r1(mcap * f / 1e6), ev_ventas: r2(ev / ventas), ev_ebitda_ltm: Math.round(ev / ebitda_ltm * 10) / 10,
  ev_ebitda_ntm: ebitda_ntm ? Math.round(ev / ebitda_ntm * 10) / 10 : null, per_ntm, crecimiento_pct: crec,
  margen_ebitda_pct: Math.round(ebitda_ltm / ventas * 1000) / 10, roic_pct: null, dn_ebitda: Math.round((deuda - caja) / ebitda_ltm * 10) / 10,
  fcf_yield_pct: fcf ? Math.round(fcf / mcap * 1000) / 10 : null,
});
const comparables = [
  comp('Sodexo', 'SW.PA', 'FR', EURUSD, 55.25 * 145785321, 12270732288, 1134000000, 23616000000, 16.5, 2.5, 5406000128, 1203000064, 596000000),
  comp('Aramark', 'ARMK', 'US', 1, 54.75 * 263625044, 20451350528, 1444033024, 19845263360, 19.5, 8.8, 6468355072, 520393984, 374142496),
  comp('Elior Group', 'ELIOR.PA', 'FR', EURUSD, 1.78 * 251022189, 1630782464, 202000000, 6115999744, 5.7, 3.0, 1259000064, 79000000, 875000),
  comp('SSP Group', 'SSPG.L', 'GB', GBPUSD, 1.791 * 749169278, 3707540992, 413000000, 3740800000, 11.4, 4.5, 2336300032, 240700000, null),
  comp('Avolta', 'AVOL.SW', 'CH', CHFUSD, 43.26 * 141508681, 17698400256, 1596999936, 13818000384, 10.6, 4.4, 12460999680, 993000000, null),
  comp('DO & CO', 'DOC.VI', 'AT', EURUSD, 194.8 * 10983458, 2218897664, 269350016, 2492019968, 15.2, 7.8, 248150000, 269129984, 182940000),
  comp('ISS', 'ISS.CO', 'DK', DKKUSD, 295.4 * 153309752, 62279053312, 4757000192, 87773003776, 12.7, 6.5, 18631999488, 2796999936, 4790125056),
];
const fD = [
  { id: 1, titulo: 'CMPGY (ADR 1:1 en USD), URTH (MSCI World) y XLY: históricos diarios (rentabilidades, beta, volatilidad, caída máxima, cierres de ejercicio)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/CMPGY/history/' },
  { id: 2, titulo: 'CPG.L: cierre del 14-oct-2026 (31,34 USD), acciones, máximo y mínimo; la serie de Yahoo pasa de GBP a USD en marzo de 2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/CPG.L/history/' },
  { id: 3, titulo: 'Compass Group PLC: estimaciones anuales FY2025-FY2028 (ventas, EBITDA, EBIT, beneficio, BPA publicado, dividendo) y consenso (20 analistas, objetivo medio 38,06 USD)', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-15', url: 'https://www.marketscreener.com/quote/stock/COMPASS-GROUP-PLC-35939959/finances/' },
  { id: 4, titulo: 'CPG.L quoteSummary: BPA subyacente de consenso FY2026 (1,484) y FY2027 (1,634, 18 analistas), objetivo medio 38,06 (31,00-42,50, 19 analistas), recomendaciones', editor: 'Yahoo Finance', tipo: 'Analistas', fecha: '2026-10-15', url: 'https://finance.yahoo.com/quote/CPG.L/analysis/' },
  { id: 5, titulo: 'Comparables (Sodexo, Aramark, Elior, SSP, Avolta, DO & CO, ISS): capitalización, valor empresa, EBITDA y ventas de 12 meses, PER adelantado, estimaciones de ventas', editor: 'Yahoo Finance (quoteSummary)', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/quote/SW.PA/key-statistics/' },
  { id: 6, titulo: 'Tipos de cambio de referencia del BCE (14-oct-2026): USD 1,1195; GBP 0,84385; CHF 0,9330; DKK 7,4754', editor: 'Banco Central Europeo', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml' },
  { id: 7, titulo: 'Full year results 2019 (BPA subyacente de 85,2 peniques; 2018: 77,6 publicado)', editor: 'Compass Group PLC (RNS 6079U)', tipo: 'Primaria', fecha: '2019-11-26', url: 'https://data.fca.org.uk/artefacts/NSM/data-migration/LSE20191126070007_14322558.html' },
  { id: 8, titulo: 'Full year results 2021 (BPA subyacente de 29,5 peniques)', editor: 'Compass Group PLC (RNS 1842T)', tipo: 'Primaria', fecha: '2021-11-23', url: 'https://data.fca.org.uk/artefacts/NSM/RNS/4187157.html' },
  { id: 9, titulo: 'Full-year results 2023 (BPA subyacente de 86,1 peniques; 2022: 63,0)', editor: 'Compass Group PLC (RNS 9039T)', tipo: 'Primaria', fecha: '2023-11-20', url: 'https://data.fca.org.uk/artefacts/NSM/RNS/4974359.html' },
  { id: 10, titulo: 'Full-year results 2024 (BPA subyacente de 119,5 centavos; 2023 reexpresado 105,2)', editor: 'Compass Group PLC (RNS 5888N)', tipo: 'Primaria', fecha: '2024-11-26', url: 'https://data.fca.org.uk/artefacts/NSM/RNS/5443336.html' },
  { id: 11, titulo: 'Full-year results 2025 (BPA subyacente de 131,9 centavos)', editor: 'Compass Group PLC (RNS 8102I)', tipo: 'Primaria', fecha: '2025-11-25', url: 'https://data.fca.org.uk/artefacts/NSM/RNS/19b5f16e-90b9-46fe-8622-723e71a74f5a.html' },
  { id: 12, titulo: 'Compass Group PLC agrees to acquire Vermaat Groep (VE ≈ 1.500 M EUR; ventas ≈ 700 M EUR con margen operativo de dos dígitos)', editor: 'Compass Group PLC', tipo: 'Primaria', fecha: '2025-07-22', url: 'https://www.compass-group.com/content/dam/compass-group/corporate/Investors/Results-presentations/2025/Aquisition%20of%20Vermaat%20RNS.pdf.downloadasset.pdf' },
  { id: 13, titulo: 'SATS: Investor presentation on proposed WFS acquisition (VE 2.250 M EUR, 9,7 veces el EBITDA)', editor: 'SATS Ltd (SGX)', tipo: 'Primaria', fecha: '2022-09-28', url: 'https://links.sgx.com/1.0.0/corporate-announcements/1PG04C1TY0YF5CYO/732672_SATS_Investor_Presentation_on_Proposed_WFS_Acquisition_20220928.pdf' },
  { id: 14, titulo: 'PAI Partners swoops to acquire travel dining specialist Areas from Elior Group', editor: 'The Moodie Davitt Report', tipo: 'Prensa', fecha: '2019-04', url: 'https://moodiedavittreport.com/pai-partners-swoops-to-acquire-travel-dining-specialist-areas-from-elior-group/' },
  { id: 15, titulo: 'Daily Treasury Par Yield Curve Rates (10 años: 5,19 % el 14-oct-2026)', editor: 'U.S. Department of the Treasury', tipo: 'Primaria', fecha: '2026-10-14', url: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve&field_tdr_date_value=2026' },
  { id: 16, titulo: 'Implied ERP by month (ERPbymonth.xlsx): 4,20 % en octubre de 2026', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 17, titulo: 'Q3 Trading Update 2026 (calendario: resultados anuales el 24-nov-2026)', editor: 'Compass Group PLC', tipo: 'Primaria', fecha: '2026-07-21', url: 'https://pdf.dfcfw.com/pdf/H22_AN202607211827203660_1.pdf' },
  { id: 18, titulo: 'ii view: caterer Compass sticks with growth forecasts for 2026 (cotización en USD desde el 1-abr-2026)', editor: 'interactive investor', tipo: 'Prensa', fecha: '2026-02-05', url: 'https://www.ii.co.uk/analysis-commentary/ii-view-caterer-compass-sticks-growth-forecasts-2026-ii538044' },
];
const cierres = Object.fromEntries(bolsa.cierres_ejercicio.map((c) => [c.anio, c.precio_cierre]));
const D = {
  _estado: 'Completo. Precio del 14-oct-2026 (la sesión del 15-oct no había cerrado). Serie de bolsa en USD con el ADR CMPGY (1:1), porque la de Londres pasa de GBP a USD en marzo de 2026.',
  identificacion: {
    nombre: 'Compass Group PLC', nombre_corto: 'Compass', ticker: 'CPG', isin: 'GB00BD6K4575', mercado: 'London Stock Exchange (cotiza en USD desde el 1-abr-2026)', indice_referencia: 'FTSE 100',
    pais: 'Reino Unido', pais_iso: 'GB', sector: 'Consumo discrecional', industria: 'Hoteles, restaurantes y ocio (restauración colectiva)', sede: 'Chertsey (Surrey, Reino Unido)', fundacion: '1941', empleados: 590000, web: 'www.compass-group.com',
    precio: 31.34, fecha_precio: '2026-10-14', acciones: 1700.3, capitalizacion_publicada: 54444, free_float_pct: 99.9,
    max_52s: 35.94, min_52s: 26.95, volumen_medio_diario: '≈ 63 M USD/día en Londres (3 meses)', proximos_resultados: '2026-11-24',
  },
  consenso: {
    guidance: 'Para FY2026 (cerrado el 30-sep-2026, se publica el 24-nov): crecimiento del beneficio operativo subyacente «por encima del 11 %» a tipos constantes (subido en mayo desde «en torno al 10 %»), con orgánico de ≈ 7 %, ≈ 2 % de compras y mejora del margen; costes financieros de ≈ 350 M y tipo impositivo subyacente del 25,5 %; deuda neta por encima de 1,5 veces el EBITDA en 2026. Reiterada el 21-jul-2026 [17]. A largo plazo: orgánico medio-alto de un dígito, mejora del margen y beneficio creciendo más que las ventas [11].',
    estimaciones: [
      { periodo: 'FY2026e', ingresos: 50619, ebitda: 5155, ebit: 3746, bpa: 1.484, dpa: 0.738, fuente: 'MarketScreener (ventas, EBITDA y EBIT subyacentes) [3]; BPA subyacente de Yahoo, 18 analistas [4]' },
      { periodo: 'FY2027e', ingresos: 54388, ebitda: 5597, ebit: 4097, bpa: 1.634, dpa: 0.812, fuente: 'MarketScreener [3]; Yahoo [4]' },
      { periodo: 'FY2028e', ingresos: 58095, ebitda: 6023, ebit: 4438, bpa: null, dpa: 0.896, fuente: 'MarketScreener [3]' },
    ],
    recomendaciones: { n_analistas: 20, comprar: 15, mantener: 5, vender: 0, po_medio: 38.06, po_min: 31.0, po_max: 42.5 },
    revisiones: 'El BPA subyacente de consenso de FY2027 apenas ha cambiado en 3 meses (1,639 hace 90 días y 1,634 hoy) y el de FY2026 tampoco (1,483 → 1,484) [4]. El BPA de MarketScreener es el publicado (1,33 para FY2026 y 1,52 para FY2027), no el subyacente: no se mezclan [3]. El objetivo medio es de 38,06 USD en las dos fuentes (20 analistas en MarketScreener, 19 en Yahoo), con 15 compras y 5 mantener [3, 4].',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    ...bolsa.bolsa,
    posicion_corta_pct: null,
    comentario: 'Serie en USD del ADR (1:1), comparada con el MSCI World y el sector de consumo discrecional de EE. UU. [1]. La acción subió un 23 % en 2023 y en 2024 y se paró en 2025 (−3 %) y en 2026 (0 % en el año), mientras el índice mundial ganaba más del 12 % [1]. Las dos caídas fuertes de 2026 fueron el 5-feb (hasta −8 % en la sesión por el miedo a despidos por IA en oficinas) y el 21-jul (−3 % pese a cumplir) [18]; el mínimo de 52 semanas fue 26,95 USD en abril [1]. Beta mensual de 5 años de 0,76 frente al MSCI World (ajustada 0,84); la semanal de 2 años es 0,33 [1].',
    confianza: 'Media',
  },
  multiplos_historicos: {
    serie: [
      { anio: 'FY2021', precio_cierre: cierres.FY2021, ev_ebitda_ntm: null, per_ntm: null, excluir: true },
      { anio: 'FY2022', precio_cierre: cierres.FY2022, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: 'FY2023', precio_cierre: cierres.FY2023, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: 'FY2024', precio_cierre: cierres.FY2024, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: 'FY2025', precio_cierre: cierres.FY2025, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
    ],
    confianza: 'Media',
  },
  comparables: { empresas: comparables, confianza: 'Media' },
  transacciones: {
    operaciones: [
      { fecha: '2025-07', objetivo: 'Vermaat Groep (restauración de empresa premium, Países Bajos)', comprador: 'Compass Group', ev: r1(1500 * EURUSD), ev_ventas: 2.14, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'VE ≈ 1.500 M EUR para ventas de ≈ 700 M EUR con margen operativo de dos dígitos: menos de ≈ 21 veces el EBIT [12].' },
      { fecha: '2022-09', objetivo: 'Worldwide Flight Services (asistencia de carga aérea)', comprador: 'SATS', ev: r1(2250 * EURUSD), ev_ventas: null, ev_ebitda: 9.7, prima_pct: null, excluir: false, comentario: 'Servicios de aeropuerto con mucha mano de obra; 9,7 veces el EBITDA antes de sinergias [13].' },
      { fecha: '2019-04', objetivo: 'Areas (restauración en aeropuertos y autopistas)', comprador: 'PAI Partners', ev: r1(1542 * EURUSD), ev_ventas: 0.84, ev_ebitda: 7.5, prima_pct: null, excluir: false, comentario: 'Venta de Elior; 7,5 veces el EBITDA antes de NIIF 16 [14].' },
    ],
    confianza: 'Baja',
  },
  valoracion: { puente: { fecha: '2026-03-31' } },
  fuentes: fD,
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Seeking Alpha: titulares de análisis de lectores sobre CMPGY (jun-2026 «may not outperform the market»; ago-2026 «operating margin is improving, but not by much»)', editor: 'Seeking Alpha (RSS)', tipo: 'Foros y redes', fecha: '2026-08-26', url: 'https://seekingalpha.com/api/sa/combined/CMPGY.xml' },
  { id: 2, titulo: 'Caterer Compass records Q3 revenue boost from AI data centres (caída de más del 3 % el 21-jul pese a cumplir)', editor: 'ESM Magazine (Reuters)', tipo: 'Prensa', fecha: '2026-07-21', url: 'https://www.esmmagazine.com/retail/caterer-compass-records-q3-revenue-boost-from-ai-data-centres-317005' },
  { id: 3, titulo: 'ii view: caterer Compass beefs up profit forecasts (riesgos de la IA y los fármacos para adelgazar; deuda)', editor: 'interactive investor', tipo: 'Foros y redes', fecha: '2026-05-11', url: 'https://www.ii.co.uk/analysis-commentary/ii-view-caterer-compass-beefs-profit-forecasts-ii539026' },
  { id: 4, titulo: 'ii view: caterer Compass sticks with growth forecasts for 2026 (caída del 8 % por el miedo a despidos por IA)', editor: 'interactive investor', tipo: 'Foros y redes', fecha: '2026-02-05', url: 'https://www.ii.co.uk/analysis-commentary/ii-view-caterer-compass-sticks-growth-forecasts-2026-ii538044' },
  { id: 5, titulo: 'Why Compass Group PLC (LSE) stock fell 2.47 % on 21st July 2026 (recogida de beneficios y expectativas altas)', editor: 'Kalkine Media', tipo: 'Foros y redes', fecha: '2026-07-21', url: 'https://kalkine.co.uk/news/consumer/is-compass-group-plc-still-a-long-term-growth-story' },
  { id: 6, titulo: 'AGM alert: Compass, Sage, easyJet (debate sobre la retribución del consejero delegado)', editor: 'interactive investor', tipo: 'Foros y redes', fecha: '2026-01-16', url: 'https://www.ii.co.uk/analysis-commentary/agm-alert-compass-sage-easyjet-ii537830' },
  { id: 7, titulo: 'Half Year Results Announcement 2026 (volumen comparable 0,7 %, deuda neta 1,7 veces el EBITDA)', editor: 'Compass Group PLC', tipo: 'Primaria', fecha: '2026-05-11', url: 'https://www.compass-group.com/content/dam/compass-group/corporate/Investors/Results-presentations/2026/Compass-Group-Half-Year-2026-Press-Release.pdf.downloadasset.pdf' },
  { id: 8, titulo: 'Q3 Trading Update 2026 (empresas e industria a doble dígito; más de 2.000 M de contratos nuevos)', editor: 'Compass Group PLC', tipo: 'Primaria', fecha: '2026-07-21', url: 'https://pdf.dfcfw.com/pdf/H22_AN202607211827203660_1.pdf' },
];
const E = {
  _estado: 'Parcial: foros con debate abierto escaso (Reddit, LSE Chat, Stocktwits y Simply Wall St cerrados o sin el símbolo); se resumen análisis de lectores y comentario de plataformas para particulares.',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Estable',
    revisadas: [
      { plataforma: 'Seeking Alpha (análisis de lectores, CMPGY)', fecha: '2026-08', n_comentarios: 4, tono: 'Dividido', resumen: 'Los dos últimos análisis de particulares reconocen la calidad pero dudan del precio: «puede no batir al mercado en 2026» y «el margen mejora, pero poco» [1].' },
      { plataforma: 'Kalkine Media (comentario de mercado para particulares)', fecha: '2026-07', n_comentarios: 3, tono: 'Neutro', resumen: 'Tras el 3T la caída se atribuye a recogida de beneficios y expectativas altas, no a peores cifras [5].' },
      { plataforma: 'Prensa (Reuters vía ESM)', fecha: '2026-07', n_comentarios: 2, tono: 'Dividido', resumen: 'Los centros de datos de IA compensan la subida de energía y alimentos por la guerra de Irán; la acción cae más de un 3 % aun cumpliendo [2].' },
      { plataforma: 'interactive investor (análisis para particulares)', fecha: '2026-05', n_comentarios: 3, tono: 'Positivo', resumen: 'Empresa bien gestionada que «merece estar en carteras diversificadas», con dos riesgos que repite cada vez: despidos por IA en oficinas y fármacos para adelgazar [3, 4].' },
    ],
    temas: [
      { tema: 'La IA reducirá comensales en oficinas', postura: 'Bajista', peso: 'Alto', contraste: 'Movió la acción −8 % en febrero [4]; la empresa dice que menos del 2 % de sus ventas está expuesto y empresas e industria crece a doble dígito con los centros de datos [8]. El temor es más rápido que los datos.' },
      { tema: 'Valoración exigente para un crecimiento del 7 %', postura: 'Dividida', peso: 'Medio', contraste: 'PER adelantado de 19,6 veces frente a una mediana de 23,5 en cinco años: hoy cotiza por debajo de su historia, no por encima (cálculo del informe con la serie de bolsa y el BPA subyacente) [7].' },
      { tema: 'Fármacos para adelgazar (GLP-1)', postura: 'Bajista', peso: 'Bajo', contraste: 'Volumen comparable positivo (0,7 % en el 1S26) y ventas por contrato, no por plato; sin efecto visible [7].' },
      { tema: 'Más deuda y menos recompras por las compras en Europa', postura: 'Dividida', peso: 'Medio', contraste: 'Deuda neta de 1,7 veces el EBITDA en marzo, por encima del objetivo; la decisión de recompras llega en noviembre [7].' },
    ],
    lectura: 'El sentimiento de los particulares va por detrás del de los analistas: 15 de 20 recomiendan comprar con objetivo de 38 USD, mientras los foros y el comentario minorista hablan de una acción cara que no bate al mercado y de la IA como amenaza. No hay euforia ni capitulación: la acción no ha hecho nada en dos años con el beneficio creciendo un 11 % al año, que es la tesis. El riesgo que señalan (IA en oficinas) está en el informe; si el neto por contratos se mantiene en el 4-5 % y la retención en el 96 %, el temor no se confirma. Confianza baja: poco debate abierto.',
    confianza: 'Baja',
  },
  fuentes: fE,
};
guarda('E', E);
console.log('Notas A-E escritas. Cuenta FY2021:', JSON.stringify(cuenta[0]).slice(0, 300));
