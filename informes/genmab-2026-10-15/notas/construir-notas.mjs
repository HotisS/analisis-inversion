// Escribe las notas A-E de Genmab (corte 2026-10-15) con lo leído en el 20-F 2025, el informe anual 2025 (ESEF, cifras en USD
// reexpresadas 2021-2025), los informes del 3T25, 1T26 y 1S26 (6-K), las notas de prensa (6-K, exhibit 99.1), bolsa.mjs,
// movimiento.mjs, MarketScreener, Stock Analysis, FRED, BCE, IQVIA y foros. Cada nota cita solo con [n] de su propia lista.
// Ejecutar: node informes/genmab-2026-10-15/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const BOLSA = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const E = 'https://www.sec.gov/Archives/edgar/data/1434265';
const r1 = (v) => (v == null ? null : Math.round(v * 10) / 10);
const r2 = (v) => (v == null ? null : Math.round(v * 100) / 100);

// Tipos de cambio BCE (DKK por USD): cierre de año y 15-oct-2026
const FX_CIERRE = { 2020: 6.0638, 2021: 6.5658, 2022: 6.9722, 2023: 6.7447, 2024: 7.1786, 2025: 6.3565 };
const FX_HOY = 6.6693;

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Form 20-F 2025 (riesgos, patentes y plazo de las regalías de daratumumab, contratos con J&J, AbbVie, Novartis y Pfizer, Item 6 y 7)', editor: 'Genmab A/S / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-17', url: `${E}/000143426526000014/gmab-20251231_d2.htm` },
  { id: 2, titulo: 'Annual Report 2025 (ESEF): cifras clave 2021-2025 en USD, cuenta, balance, flujos, deuda y notas', editor: 'Genmab A/S / filings.xbrl.org', tipo: 'Primaria', fecha: '2026-02-17', url: 'https://filings.xbrl.org/529900MTJPDPE4MHJ122/2025-12-31/ESEF/DK/0/genmab-2025-12-31-1-en/reports/genmab-2025-12-31-1-en.xhtml' },
  { id: 3, titulo: 'Interim Report for the First Half of 2026 (6-K): cuenta, regalías por producto, deuda (nota 7), recompras, guía 2026 revisada', editor: 'Genmab A/S / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-06', url: `${E}/000143426526000108/gmab-20260630.htm` },
  { id: 4, titulo: 'Interim Report for the First Quarter of 2026 (6-K)', editor: 'Genmab A/S / SEC EDGAR', tipo: 'Primaria', fecha: '2026-05-07', url: `${E}/000143426526000076/genmabinterimreportq12026.htm` },
  { id: 5, titulo: 'Interim Report for the First Nine Months of 2025 (6-K)', editor: 'Genmab A/S / SEC EDGAR', tipo: 'Primaria', fecha: '2025-11-06', url: `${E}/000143426525000092/genmabinterimreportq32025.htm` },
  { id: 6, titulo: 'Hechos XBRL (companyfacts) de los 20-F: cuenta, balance y flujos 2023-2025 en USD', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0001434265.json' },
  { id: 7, titulo: 'Genmab Announces Net Sales of DARZALEX for Third Quarter of 2026 (6-K): 4.239 M USD, 2.528 M en EE. UU.', editor: 'Genmab A/S / SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-13', url: `${E}/000143426526000136/gmab_20261013xex99d1.htm` },
  { id: 8, titulo: 'Genmab Announces Net Sales of DARZALEX for 2025 (6-K): 14.351 M USD, 8.266 M en EE. UU.', editor: 'Genmab A/S / SEC EDGAR', tipo: 'Primaria', fecha: '2026-01-21', url: `${E}/000143426526000004/gmab_20260121xex99d1.htm` },
];

// Cuenta 2021-2025 en USD (informe anual 2025, cifras clave; 2023-2025 detalladas del XBRL)
const cuenta = [
  { periodo: '2021', ingresos: 1337, coste_ventas: 0, gastos_generales: 204, ebitda: null, amortizaciones: null, ebit: 469, resultado_financiero: 153, bai: 622, impuestos: 152, minoritarios: 0, beneficio_neto: 470, gastos_financieros: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 7.12, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: 66.0 },
  { periodo: '2022', ingresos: 2031, coste_ventas: 0, gastos_generales: 379, ebitda: null, amortizaciones: null, ebit: 865, resultado_financiero: 96, bai: 961, impuestos: 211, minoritarios: 0, beneficio_neto: 750, gastos_financieros: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 11.36, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: 66.0 },
  { periodo: '2023', ingresos: 2390, coste_ventas: 33, gastos_generales: 478, ebitda: 815, amortizaciones: 43, ebit: 772, resultado_financiero: 45, bai: 817, impuestos: 186, minoritarios: 0, beneficio_neto: 631, gastos_financieros: 10, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 9.58, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: 65.9 },
  { periodo: '2024', ingresos: 3121, coste_ventas: 143, gastos_generales: 549, ebitda: 1032, amortizaciones: 60, ebit: 972, resultado_financiero: 354, bai: 1326, impuestos: 193, minoritarios: 0, beneficio_neto: 1133, gastos_financieros: 18, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 17.53, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: 64.7 },
  { periodo: '2025', ingresos: 3720, coste_ventas: 238, gastos_generales: 626, ebitda: 1136, amortizaciones: 71, ebit: 1065, resultado_financiero: 139, bai: 1204, impuestos: 241, minoritarios: 0, beneficio_neto: 963, gastos_financieros: 61, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 15.37, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: 62.7 },
];

const balanceH = [
  { periodo: '2021', activo_total: 3899, activo_corriente: 3599, pasivo_corriente: null, pasivo_total: 494, fondo_comercio: 0, intangibles: null, inmovilizado_material: null, existencias: null, clientes: null, proveedores: null, activos_contrato: null, pasivos_contrato: null, caja: 3073, deuda_financiera: 0, arrendamientos: null, patrimonio_neto: 3405, minoritarios: 0, reservas: null },
  { periodo: '2022', activo_total: 4321, activo_corriente: 4048, pasivo_corriente: null, pasivo_total: 406, fondo_comercio: 0, intangibles: null, inmovilizado_material: null, existencias: null, clientes: null, proveedores: null, activos_contrato: null, pasivos_contrato: null, caja: 3202, deuda_financiera: 0, arrendamientos: null, patrimonio_neto: 3915, minoritarios: 0, reservas: null },
  { periodo: '2023', activo_total: 5232, activo_corriente: 4912, pasivo_corriente: 368, pasivo_total: 545, fondo_comercio: 0, intangibles: 15, inmovilizado_material: 142, existencias: 8, clientes: 733, proveedores: 49, activos_contrato: null, pasivos_contrato: null, caja: 4171, deuda_financiera: 0, arrendamientos: 114, patrimonio_neto: 4687, minoritarios: 0, reservas: 2737 },
  { periodo: '2024', activo_total: 6414, activo_corriente: 3900, pasivo_corriente: 744, pasivo_total: 1277, fondo_comercio: 355, intangibles: 1728, inmovilizado_material: 137, existencias: 9, clientes: 923, proveedores: 90, activos_contrato: null, pasivos_contrato: null, caja: 2954, deuda_financiera: 0, arrendamientos: 144, patrimonio_neto: 5137, minoritarios: 0, reservas: 3392 },
  { periodo: '2025', activo_total: 12873, activo_corriente: 2885, pasivo_corriente: 1427, pasivo_total: 7026, fondo_comercio: 355, intangibles: 9123, inmovilizado_material: 153, existencias: 18, clientes: 1112, proveedores: 145, activos_contrato: null, pasivos_contrato: null, caja: 1715, deuda_financiera: 5274, arrendamientos: 152, patrimonio_neto: 5847, minoritarios: 0, reservas: 4098 },
];

const flujosH = [
  { periodo: '2021', flujo_operativo: 354, capex: 40, pagos_arrendamientos: null, adquisiciones: 0, desinversiones: 0, dividendos: 0, recompras: null, emision_acciones: null, intereses_en_financiacion: 0 },
  { periodo: '2022', flujo_operativo: 555, capex: 45, pagos_arrendamientos: null, adquisiciones: 0, desinversiones: 0, dividendos: 0, recompras: null, emision_acciones: null, intereses_en_financiacion: 0 },
  { periodo: '2023', flujo_operativo: 1071, capex: 54, pagos_arrendamientos: 14, adquisiciones: 0, desinversiones: 0, dividendos: 0, recompras: 81, emision_acciones: 21, intereses_en_financiacion: 0 },
  { periodo: '2024', flujo_operativo: 1126, capex: 44, pagos_arrendamientos: 9, adquisiciones: 1783, desinversiones: 0, dividendos: 0, recompras: 560, emision_acciones: 19, intereses_en_financiacion: 0 },
  { periodo: '2025', flujo_operativo: 1186, capex: 55, pagos_arrendamientos: 13, adquisiciones: 7215, desinversiones: 0, dividendos: 0, recompras: 430, emision_acciones: 23, intereses_en_financiacion: 0 },
];

const segHist = (vals) => ['2023', '2024', '2025'].map((p, i) => ({ periodo: p, ingresos: vals[i], resultado: null }));

const A = {
  _estado: 'completo',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 4131, ebitda: 1165, ebit: 1072, beneficio_neto: 788, bpa: 12.65, dpa: 0, dpa_extraordinario: 0, fcf: 855, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [
      { periodo: '2025', descripcion: 'Merus N.V., consolidada desde el 12-dic-2025 (7.215 M USD en caja, 97 USD por acción): entra en el balance (intangibles de 9.123 M) y casi nada en la cuenta de 2025.' },
      { periodo: '2024', descripcion: 'ProfoundBio, comprada en mayo de 2024 por 1.783 M USD netos de caja (Rina-S): fondo de comercio de 355 M e intangibles de ≈1.700 M.' },
    ],
    comentario: 'Los ingresos pasaron de 1.337 M USD en 2021 a 3.720 M en 2025 [A2] sin una sola compra que los explique: el motor fueron las regalías de DARZALEX (2.443 M en 2025, +21 %, el 66 % de los ingresos [A2, A1]) y de Kesimpta (443 M, +37 %) [A2]. Las ventas propias (EPKINLY en EE. UU. y Japón, Tivdak fuera de EE. UU.) suman 398 M (11 %) [A2]. El margen operativo cayó del 35,1 % de 2021 al 28,6 % de 2025 porque la I+D (1.606 M, 43 % de los ingresos) y la estructura comercial crecen para lanzar productos propios, y 2025 cargó 185 M de costes de la compra de Merus y el cierre de acasunlimab [A2]. En el primer semestre de 2026 los ingresos crecen un 25 % (2.051 M) pero el beneficio neto baja a 356 M (531 M) por los 186 M de gasto financiero neto de la deuda de Merus [A3]. 2021-2022 no son del todo comparables en el detalle: solo hay cifras clave reexpresadas en USD.',
    ajustes: 'Cifras NIIF publicadas. La empresa da un «resultado operativo ajustado» que excluye los costes de adquisición e integración (43 M en 2024, 185 M en 2025, 90 M previstos en 2026) y la amortización de intangibles comprados (13 M en 2025, 47 M en 2026) [A2, A3]. Como se repiten tres años seguidos, no los tratamos como no recurrentes: quedan dentro del EBITDA y del BPA. El tipo impositivo de 2026 (3,6 % estimado en el semestre) está rebajado por créditos fiscales de Merus y la propia empresa dice que no es representativo [A3]. El beneficio financiero de 2024 (354 M) incluye ganancias de cambio y de la cartera de valores que ya no existe [A2].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '3T24', ingresos: 816, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: null },
      { periodo: '4T24', ingresos: 923, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: null },
      { periodo: '1T25', ingresos: 715, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: null },
      { periodo: '2T25', ingresos: 925, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 5.42, vs_consenso: null },
      { periodo: '3T25', ingresos: 1022, crecimiento_pct: 25.2, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: null },
      { periodo: '4T25', ingresos: 1058, crecimiento_pct: 14.6, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: 'Inferior' },
      { periodo: '1T26', ingresos: 896, crecimiento_pct: 25.3, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: null },
      { periodo: '2T26', ingresos: 1155, crecimiento_pct: 24.9, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 4.91, vs_consenso: null },
    ],
    ultima_presentacion: 'En febrero (resultados de 2025) la dirección presentó 2026 como el año de transición: guía de ingresos de 4.065-4.395 M USD y de beneficio operativo ajustado de 900-1.400 M, con la I+D de petosemtamab y Rina-S y la preparación de sus lanzamientos absorbiendo el crecimiento de las regalías [A3]. En agosto, con el semestre, subió la guía a 4.325-4.525 M de ingresos y 1.065-1.385 M de beneficio operativo ajustado por DARZALEX (ventas de J&J previstas de 16.500-16.900 M) y EPKINLY (+48 % en el semestre) [A3]. El mensaje cambió de «construir» a «ejecutar»: cinco ensayos de fase 3 con Rina-S, dos con petosemtamab y lanzamientos previstos desde 2027 [A3]. Lo que más preguntaron los analistas, según la prensa especializada, fue cómo se sustituyen las regalías de DARZALEX desde 2029 y el ritmo de reducción de la deuda; la dirección no ha dado un objetivo de ingresos para 2030 ni una cifra de pico de ventas por producto más allá de los «al menos 1.000 M en 2029» de petosemtamab que dio al cerrar Merus [A1, A3]. No hemos leído las transcripciones completas (de pago): hueco registrado.',
    confianza: 'Media',
  },
  negocio: {
    segmentos: [
      { nombre: 'Regalías: DARZALEX', descripcion: 'Regalía escalonada del 12-20 % sobre las ventas mundiales de daratumumab de J&J, menos la parte de Halozyme y las reducciones por falta de patente [A3].', tipo_resultado: null, historico: segHist([1635, 2019, 2443]) },
      { nombre: 'Regalías: Kesimpta', descripcion: 'Regalía sobre las ventas de ofatumumab de Novartis en esclerosis múltiple [A1].', tipo_resultado: null, historico: segHist([217, 323, 443]) },
      { nombre: 'Otras regalías', descripcion: 'TEPEZZA (Amgen), RYBREVANT, TECVAYLI, TALVEY (J&J), TEPKINLY fuera de EE. UU. y Japón, BIZENGRI [A2].', tipo_resultado: null, historico: segHist([137, 175, 216]) },
      { nombre: 'Ventas propias y colaboración', descripcion: 'EPKINLY en EE. UU. y Japón, Tivdak en Japón y Europa y el 50 % del beneficio bruto de Tivdak en EE. UU. [A2, A3].', tipo_resultado: null, historico: segHist([106, 315, 468]) },
      { nombre: 'Hitos y reembolsos', descripcion: 'Hitos de socios y reembolso de I+D compartida [A2].', tipo_resultado: null, historico: segHist([295, 289, 150]) },
    ],
    geografias: null,
    geografias_criterio: null,
    kpis: [
      { kpi: 'Ventas mundiales de DARZALEX (J&J)', valor_anterior: '11.670 M USD (2024)', valor_actual: '14.351 M USD (2025)', variacion: '+23 %', comentario: 'El 58 % en EE. UU. (8.266 M) [A8]; 3T26: 4.239 M (2.528 M en EE. UU.) [A7].' },
      { kpi: 'Regalías de DARZALEX', valor_anterior: '2.019 M USD', valor_actual: '2.443 M USD (2025)', variacion: '+21 %', comentario: 'Crecen menos que las ventas por los tramos, la parte de Halozyme en la versión subcutánea y el tipo de cambio pactado [A2].' },
      { kpi: 'Ventas mundiales de EPKINLY/TEPKINLY', valor_anterior: '211 M USD (1S25)', valor_actual: '312 M USD (1S26)', variacion: '+48 %', comentario: 'Genmab registra las de EE. UU. y Japón (242 M) y cobra un 22-26 % del resto [A3].' },
      { kpi: 'Regalías de Kesimpta', valor_anterior: '323 M USD', valor_actual: '443 M USD (2025)', variacion: '+37 %', comentario: 'Patente de EE. UU. extendida hasta mayo de 2031 [A1].' },
      { kpi: 'Empleados a fin de periodo', valor_anterior: '2.639 (jun-25)', valor_actual: '3.119 (jun-26)', variacion: '+18 %', comentario: 'Integración de Merus y fuerza comercial para Rina-S y petosemtamab [A3].' },
    ],
    confianza: 'Alta',
  },
  balance: {
    historico: balanceH,
    vencimientos: [
      { anio: '2026', importe: 150 },
      { anio: '2027', importe: 70 },
      { anio: '2028', importe: 70 },
      { anio: '2029', importe: 70 },
      { anio: '2030', importe: 860 },
      { anio: '2031+', importe: 4155 },
    ],
    liquidez: 'Caja de 1.503 M USD a 30-jun-2026 (30 M restringidos) [A3], más una línea de crédito garantizada de 500 M a cinco años y otra sin garantía de 300 M, sin disponer [A2].',
    rating: 'Sin rating publicado en las cuentas (hueco registrado).',
    coste_deuda_pct: 6.4,
    vida_media_anios: 6.3,
    otros_pasivos: 'La deuda de Merus (5.500 M nominales en diciembre de 2025) se reparte en un préstamo A de 1.000 M (SOFR + margen, 5,48 % a fin de 2025, vence en diciembre de 2030), un préstamo B de 2.000 M (6,73 %, diciembre de 2032; margen rebajado de 3 a 2 puntos en junio de 2026), bonos garantizados de 1.500 M al 6,25 % (2032) y bonos sin garantía de 1.000 M al 7,25 % (2033) [A2, A3]. Los préstamos están garantizados con prácticamente todos los activos (11.100 M de valor contable pignorado) y llevan covenants, que se cumplen [A2, A3]. Cuatro swaps de 406 M cada uno fijan el SOFR en ≈3,4 % hasta junio de 2028 [A3]. Hay litigios por patentes (Chugai contra EPKINLY en Japón) y una demanda de AbbVie por secretos comerciales, sin provisión [A3, A1]. Pensiones: planes de aportación definida, sin déficit relevante [A2].',
    comentario: 'Genmab pasó de una caja neta de 2.954 M USD a fin de 2024 a una deuda neta de 3.559 M a fin de 2025 por la compra de Merus [A2]: la mayor decisión de capital de su historia. A junio de 2026, la deuda bruta contable es de 5.135 M (5.375 M nominales tras amortizar 125 M) y la caja de 1.503 M [A3]. Con un EBITDA LTM de ≈1.165 M (estimación propia), la deuda neta es de ≈3,1 veces; baja rápido si las regalías siguen creciendo, pero el vencimiento grande (préstamo A, 2030) llega justo después de la caída de las regalías de DARZALEX en EE. UU. (2029). El circulante es casi todo cuentas a cobrar de regalías (1.112 M), que cobra trimestralmente.',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujosH,
    comentario: 'La conversión en caja es buena y estable: el flujo operativo de 2023-2025 (1.071-1.186 M USD) iguala o supera el beneficio neto, porque las regalías se cobran a un trimestre y el capex es mínimo (55 M en 2025, 1,5 % de los ingresos) [A2]. En 2024-2025 la caja fue a compras (ProfoundBio 1.783 M, Merus 7.215 M) y a recompras (560 M y 430 M) [A2]. En el primer semestre de 2026 el flujo operativo cae a 54 M (349 M) por 191 M de intereses y costes de la operación pagados, 320 M de pagos de acreedores (cierre de acasunlimab, bonus, retenciones de Merus) [A3]: un semestre anómalo, no la nueva normalidad. Todo el capex es de mantenimiento; la inversión de crecimiento está en la I+D, que va a la cuenta.',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'Deloitte Statsautoriseret Revisionspartnerselskab',
    anios_auditor: 2,
    opinion: 'Favorable (sin salvedades)',
    senales: [
      { senal: 'Cambio de auditor', nivel: 'Baja', comentario: 'PwC fue sustituida por Deloitte desde el ejercicio 2024 [A2]; rotación ordinaria, sin desacuerdos publicados.' },
      { senal: 'Compra de Merus tratada con 9.123 M de intangibles y sin fondo de comercio nuevo', nivel: 'Media', comentario: 'El valor está en petosemtamab y la plataforma Biclonics; si la fase 3 falla, el deterioro sería de miles de millones [A2, A3].' },
      { senal: 'Tipo impositivo de 2026 rebajado por créditos fiscales de Merus', nivel: 'Baja', comentario: 'El 3,6 % del semestre no es repetible; la propia empresa lo advierte [A3].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Genmab no paga dividendo y no ha anunciado que vaya a hacerlo. Recompra acciones de forma regular, sobre todo para cubrir las RSU (342.130 acciones por 96 M USD en febrero-marzo de 2026) y ocasionalmente para reducir capital (2,2 millones de acciones por 430 M en 2025, amortizadas en abril de 2026) [A3]. La prioridad declarada para la caja es invertir en la cartera propia y reducir la deuda de Merus [A2, A3].',
    adquisiciones: [
      { anio: '2025', objetivo: 'Merus N.V. (petosemtamab, plataforma Biclonics)', importe: 8000, ev_ebitda: null, financiacion: '5.500 M de deuda nueva y caja', resultado: 'Demasiado pronto: dos fases 3 de petosemtamab en marcha; lanzamiento previsto en 2027 [A3].' },
      { anio: '2024', objetivo: 'ProfoundBio (Rina-S y plataforma de ADC)', importe: 1800, ev_ebitda: null, financiacion: 'Caja', resultado: 'Bien encaminado: Rina-S tiene designación de terapia innovadora en endometrio y cinco fases 3 [A3]; datos de fase 2 con 45,9 % de respuesta en ovario resistente a platino presentados en octubre de 2026 [B12].' },
    ],
    confianza: 'Alta',
  },
  fuentes: fA,
  huecos: [
    { seccion: 'trimestres', campo: 'EBITDA y BPA de cada trimestre', tipo: 'Complemento', intentos: '1) informes trimestrales 6-K (solo dan beneficio operativo y neto); 2) XBRL de los 6-K (sin amortización trimestral); 3) restas de acumulados (solo ingresos y beneficio operativo)', decision: 'Omitido' },
    { seccion: 'trimestres', campo: 'Transcripciones de las dos últimas conferencias', tipo: 'Complemento', intentos: '1) web de inversores (403); 2) Seeking Alpha (de pago); 3) prensa especializada', decision: 'Omitido' },
    { seccion: 'balance', campo: 'Detalle del balance de 2021 y 2022 en USD', tipo: 'Complemento', intentos: '1) informe anual 2025 (solo cifras clave en USD); 2) XBRL de la SEC (solo 2023-2025 en USD); 3) 20-F de 2022 en DKK (no reexpresado)', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Global Oncology Trends 2025: gasto mundial en medicamentos oncológicos 252.000 M USD en 2024 y 441.000 M en 2029', editor: 'IQVIA Institute', tipo: 'Sectorial', fecha: '2025-05', url: 'https://www.iqvia.com/insights/the-iqvia-institute/reports-and-publications/reports/global-oncology-trends-2025' },
  { id: 2, titulo: 'New Modalities & More Upsides in the Oncology Drug Market', editor: 'DCAT Value Chain Insights', tipo: 'Sectorial', fecha: '2025-06', url: 'https://www.dcatvci.org/features/new-modalities-more-upsides-in-the-oncology-drug-market/' },
  { id: 3, titulo: 'Form 20-F 2025: competencia, patentes (daratumumab 2029 EE. UU., 2031 Europa; ofatumumab 2031), contratos', editor: 'Genmab A/S / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-17', url: `${E}/000143426526000014/gmab-20251231_d2.htm` },
  { id: 4, titulo: 'AbbVie 10-K 2025 (XBRL: ingresos 61.160 M USD, resultado operativo 15.075 M)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-02', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0001551152.json' },
  { id: 5, titulo: 'Regeneron 10-K 2025 (XBRL: ingresos 14.343 M USD, resultado operativo 3.578 M)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-02', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0000872589.json' },
  { id: 6, titulo: 'Johnson & Johnson 10-K 2025 (XBRL: ventas 94.193 M USD, beneficio antes de impuestos 32.581 M)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-02', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0000200406.json' },
  { id: 7, titulo: 'Roche, Novartis y Sanofi: cuentas 2025 (ingresos y EBIT tomados de los análisis del repositorio del 14-oct-2026, que citan sus informes anuales)', editor: 'Roche / Novartis / Sanofi', tipo: 'Primaria', fecha: '2026-02', url: 'https://www.roche.com/investors/reports' },
  { id: 8, titulo: 'Genmab and AbbVie Announce Epcoritamab in Combination with R-CHOP Demonstrates Statistically Significant Improvement in PFS (EPCORE DLBCL-2)', editor: 'Genmab A/S / SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-05', url: `${E}/000143426526000132/gmab_20261015xex99d1.htm` },
  { id: 9, titulo: 'Genmab Announces Positive Phase 3 Results for Epcoritamab Plus Lenalidomide (EPCORE DLBCL-4)', editor: 'Genmab A/S / SEC EDGAR', tipo: 'Primaria', fecha: '2026-06-29', url: `${E}/000143426526000100/gmab_20260629xex99d1.htm` },
  { id: 10, titulo: 'Genmab Announces Topline Results for Epcoritamab from Phase 3 EPCORE DLBCL-1 (supervivencia global HR 0,96, no significativa)', editor: 'Genmab A/S / SEC EDGAR', tipo: 'Primaria', fecha: '2026-01-16', url: `${E}/000143426526000002/gmab_20260116xex99d1.htm` },
  { id: 11, titulo: 'Genmab Announces Completion of Tender Offer for Merus (97 USD por acción; petosemtamab con al menos 1.000 M de ventas potenciales en 2029)', editor: 'Genmab A/S / SEC EDGAR', tipo: 'Primaria', fecha: '2025-12-12', url: `${E}/000143426525000110/gmab_20251212xex991.htm` },
  { id: 12, titulo: 'Interim Report for the First Half of 2026: cartera, ensayos de fase 3 y regalías por producto', editor: 'Genmab A/S / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-06', url: `${E}/000143426526000108/gmab-20260630.htm` },
  { id: 13, titulo: 'Genmab and AbbVie\'s epcoritamab fails in phase 3 lymphoma study (confirmación del 23-jul-2026)', editor: 'European Biotechnology', tipo: 'Prensa', fecha: '2026-07-24', url: 'https://european-biotechnology.com/latest-news/genmab-abbvies-epcoritamab-phase-3-lymphoma/' },
];
const B = {
  _estado: 'completo',
  historia: {
    resumen: 'Genmab nació en 1999 en Copenhague como empresa de anticuerpos humanos con la tecnología de ratones transgénicos de Medarex y salió a bolsa en Copenhague en 2000 [B3]. Su gran acierto fue daratumumab, licenciado a J&J en 2012, que se convirtió en DARZALEX, el tratamiento de referencia del mieloma múltiple; sus regalías financiaron todo lo demás [B3]. La segunda fuente de valor son las plataformas (DuoBody para biespecíficos, HexaBody), que dieron TECVAYLI, TALVEY y RYBREVANT a J&J y epcoritamab, su primer producto propio [B3]. Cotiza también en el Nasdaq desde 2019. Desde 2023 vende sus propios medicamentos y en 2024-2025 compró ProfoundBio y Merus para sustituir las regalías de DARZALEX antes de que caduquen [B11, B12].',
    hitos: [
      { anio: '1999', hito: 'Fundación en Copenhague; Jan van de Winkel, cofundador, es primer ejecutivo desde 2010 [B3].' },
      { anio: '2000', hito: 'Salida a bolsa en Copenhague [B3].' },
      { anio: '2012', hito: 'Licencia mundial de daratumumab a J&J [B3].' },
      { anio: '2015', hito: 'Aprobación de DARZALEX en EE. UU. (primera venta) [B3].' },
      { anio: '2019', hito: 'Cotización en el Nasdaq (ADS) [B3].' },
      { anio: '2020', hito: 'Acuerdo con AbbVie para epcoritamab; aprobación de Kesimpta (Novartis) [B3].' },
      { anio: '2023', hito: 'Aprobación de EPKINLY: primera venta propia [B3].' },
      { anio: '2024', hito: 'Compra de ProfoundBio (Rina-S) por ≈1.800 M USD [B12].' },
      { anio: '2025', hito: 'Compra de Merus (petosemtamab) por ≈8.000 M USD con 5.500 M de deuda [B11].' },
      { anio: '2026', hito: 'Fases 3 positivas de epcoritamab en segunda línea (DLBCL-4) y primera línea (DLBCL-2) de linfoma difuso; DLBCL-1 sin mejora de supervivencia [B8, B9, B10].' },
    ],
    confianza: 'Alta',
  },
  negocio: {
    descripcion: 'Genmab descubre y desarrolla anticuerpos contra el cáncer. Tiene dos negocios. El primero cobra regalías: J&J vende DARZALEX (mieloma múltiple) y otros tres anticuerpos de su tecnología, Novartis vende Kesimpta (esclerosis múltiple) y Amgen TEPEZZA; Genmab cobra un porcentaje de cada venta sin gasto comercial [B3, B12]. El segundo vende medicamentos propios: EPKINLY (epcoritamab, linfoma; con AbbVie) y Tivdak (cáncer de cuello de útero; con Pfizer), y prepara dos lanzamientos propios, Rina-S (ovario y endometrio) y petosemtamab (cabeza y cuello) [B12]. Clientes: los socios farmacéuticos (regalías) y hospitales y distribuidores especializados en EE. UU. y Japón (ventas propias). Sede en Copenhague, con centros en Utrecht, Princeton y Tokio y 3.119 empleados [B12].',
    como_gana_dinero: 'El 83 % de los ingresos de 2025 fueron regalías [A2]: casi todo margen, porque los costes de desarrollo y venta los paga el socio. Con ellas Genmab financia una I+D de 1.606 M USD (43 % de los ingresos) y una estructura comercial creciente [A2]. Las ventas propias dejan menos margen: en EPKINLY reparte el beneficio con AbbVie (116 M pagados en el semestre por 242 M de ventas registradas) [B12]. El apalancamiento operativo es alto: cada dólar más de regalías llega casi entero al beneficio, y cada dólar perdido sale entero. No hay estacionalidad relevante. Lo que hay es un plazo: las regalías de DARZALEX caen desde 2029 (patente de EE. UU.) y 2031 (Europa) [B3].',
    clientes: 'Concentración extrema: J&J paga más del 70 % de los ingresos (66 % solo DARZALEX en 2025) y Novartis ≈12 % [A2, B3]. Los contratos de licencia duran hasta que caduca la última patente relevante o 13 años desde la primera venta en cada país, lo que llegue después [B3]. El poder de precios no es de Genmab sino de sus socios: DARZALEX ganó cuota en todas las regiones (+23 % de ventas en 2025) [A8, B3]. Un arbitraje decidió que Genmab no cobra por las patentes propias de J&J de la versión subcutánea, que ya es la mayor parte de las ventas [B3]. En sus productos propios compite contra Roche (glofitamab y mosunetuzumab en linfoma) y, en ovario, contra AbbVie (Elahere) [B3].',
    confianza: 'Alta',
  },
  sector: {
    definicion: 'El mercado relevante es el de medicamentos oncológicos con receta, a precio de lista, mundial: es donde compiten DARZALEX (mieloma), EPKINLY (linfoma), Tivdak, Rina-S y petosemtamab. Usamos la cifra del IQVIA Institute (252.000 M USD en 2024 y 441.000 M en 2029) [B1], contrastada con el resumen de DCAT del mismo informe [B2]; no encontramos una segunda estimación independiente gratuita del mismo perímetro (hueco). Para el negocio de regalías, el mercado que importa es el de mieloma múltiple, donde DARZALEX vendió 14.351 M en 2025 [A8].',
    tamano: '≈252.000 M USD en 2024 (gasto mundial en medicamentos oncológicos a precio de lista) [B1]',
    unidad_serie: 'millones de USD',
    serie: [ { anio: '2020', tamano: 144000 }, { anio: '2024', tamano: 252000 }, { anio: '2029e', tamano: 441000 } ],
    tcac_historico_pct: 11.9,
    tcac_previsto_pct: 11.8,
    cr5_pct: null,
    estructura: 'Moderadamente concentrada',
    drivers: [
      { driver: 'Nuevas modalidades (biespecíficos, ADC)', efecto: '+', horizonte: 'Estructural', evidencia: 'IQVIA prevé que el gasto en ADC y biespecíficos crezca de forma significativa hasta 2029 [B1]; EPKINLY +48 % en el semestre [B12].' },
      { driver: 'Envejecimiento y supervivencia más larga en mieloma', efecto: '+', horizonte: 'Estructural', evidencia: 'Ventas de DARZALEX +23 % en 2025 y 4.239 M en el 3T26 [A8, A7].' },
      { driver: 'Caducidad de patentes y biosimilares', efecto: '−', horizonte: 'Estructural', evidencia: 'Patentes de daratumumab: 2029 EE. UU., 2031 Europa; biosimilares de PD-1 frenan el gasto en 2028-2029 [B3, B1].' },
      { driver: 'Presión de precios en EE. UU. (Ley de Reducción de la Inflación, precio de nación más favorecida)', efecto: '−', horizonte: 'Estructural', evidencia: 'El 20-F lo cita como riesgo para precios y reembolso [B3]; IQVIA prevé que el crecimiento se frene desde 2027 [B1].' },
      { driver: 'Éxito clínico de los ensayos de fase 3', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Tres fases 3 de epcoritamab en 2026: dos positivas, una sin supervivencia [B8, B9, B10].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 4, justificacion: 'En linfoma compiten tres biespecíficos CD3xCD20 (Roche tiene dos) y las CAR-T; en mieloma, J&J y Sanofi (isatuximab) [B3].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Pagadores públicos y aseguradoras negocian precios; en EE. UU. aumenta la presión regulatoria [B3].' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Fabricación externalizada en pocos fabricantes, que el 20-F cita como riesgo, pero sustituibles [B3].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Desarrollar un anticuerpo oncológico cuesta miles de millones y diez años; las patentes protegen hasta 2029-2038 [B3].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 4, justificacion: 'Cada año hay terapias nuevas (CAR-T, trispecíficos, ADC) que desplazan líneas de tratamiento [B1, B3].' },
    ],
    ciclo: { posicion: 'Expansión', comentario: 'El gasto oncológico creció un 11,9 % anual en 2020-2024, con una pausa en 2022, y no cayó ni en 2008-09 ni en 2020: el cáncer no espera al ciclo [B1]. IQVIA prevé que el crecimiento se frene desde 2027 por biosimilares [B1]. Para Genmab el ciclo que importa no es el económico sino el de sus patentes y ensayos.' },
    regulacion: 'En EE. UU., la Ley de Reducción de la Inflación permite negociar el precio de Medicare de los biológicos a los 13 años de su aprobación; DARZALEX (2015) y sus regalías pueden verse afectados antes de la caducidad de la patente en 2029 [B3]. La FDA concede designaciones de terapia innovadora que aceleran las aprobaciones (Rina-S en endometrio, petosemtamab en cabeza y cuello) [B12]. La retirada de EPKINLY en una indicación por la fase 3 DLBCL-1 sin supervivencia está en discusión con los reguladores [B10, B13].',
    tendencias: 'Los anticuerpos biespecíficos y los conjugados anticuerpo-fármaco (ADC) son las dos modalidades que más crecen en oncología [B1, B2], y Genmab tiene plataforma propia en las dos (DuoBody, la de ProfoundBio y la Biclonics de Merus). La tendencia a combinar biespecíficos con quimioterapia en primera línea (DLBCL-2) amplía el mercado de EPKINLY [B8]. El riesgo es la saturación: varios grupos desarrollan ADC contra el receptor de folato y biespecíficos EGFR en cabeza y cuello [B3].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: null,
    posicion: 'Sin cuota propia medible en oncología (≈0,2 % del gasto mundial con ventas propias de 398 M USD); a través de DARZALEX participa en el primer anticuerpo del mieloma múltiple (14.351 M de ventas en 2025) [A8, B1].',
    competidores: [
      { nombre: 'Roche', pais: 'Suiza', ticker: 'ROG', ingresos: 76420, cuota_pct: null, margen_ebit_pct: 29.2, comentario: 'Glofitamab y mosunetuzumab compiten con EPKINLY en linfoma [B3, B7].' },
      { nombre: 'AbbVie', pais: 'EE. UU.', ticker: 'ABBV', ingresos: 61160, cuota_pct: null, margen_ebit_pct: 24.6, comentario: 'Socio en EPKINLY y competidor en ovario con Elahere (ADC del receptor de folato) frente a Rina-S [B4, B3].' },
      { nombre: 'Johnson & Johnson', pais: 'EE. UU.', ticker: 'JNJ', ingresos: 94193, cuota_pct: null, margen_ebit_pct: 34.6, comentario: 'Socio (DARZALEX, TECVAYLI, TALVEY, RYBREVANT); margen antes de impuestos [B6].' },
      { nombre: 'Sanofi', pais: 'Francia', ticker: 'SAN', ingresos: 49298, cuota_pct: null, margen_ebit_pct: 27.8, comentario: 'Isatuximab (anti-CD38) compite con DARZALEX [B7, B3].' },
      { nombre: 'Novartis', pais: 'Suiza', ticker: 'NOVN', ingresos: 56674, cuota_pct: null, margen_ebit_pct: 31.1, comentario: 'Socio en Kesimpta [B7].' },
      { nombre: 'Regeneron', pais: 'EE. UU.', ticker: 'REGN', ingresos: 14343, cuota_pct: null, margen_ebit_pct: 24.9, comentario: 'Biespecíficos CD20xCD3 (odronextamab) y anti-PD-1 en cabeza y cuello [B5, B3].' },
    ],
    foso: {
      veredicto: 'Estrecho',
      tendencia: 'Se estrecha',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'No aplica a un desarrollador de medicamentos.' },
        { fuente: 'Costes de cambio', puntuacion: 2, evidencia: 'Los médicos cambian de tratamiento cuando hay datos mejores; la combinación con R-CHOP en primera línea crearía hábito si se aprueba [B8].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 4, evidencia: 'Patentes hasta 2029-2031 (daratumumab, ofatumumab), 2031 (Tivdak) y 2038 (epcoritamab); plataformas DuoBody y Biclonics licenciadas a J&J, AbbVie, BioNTech [B3].' },
        { fuente: 'Ventaja en costes', puntuacion: 2, evidencia: 'Las regalías no tienen coste comercial; margen operativo del 28,6 % con un 43 % de I+D [A2].' },
        { fuente: 'Escala eficiente', puntuacion: 1, evidencia: 'Escala pequeña frente a Roche, AbbVie o J&J en ventas propias [B4, B6, B7].' },
      ],
    },
    amenazas: 'La amenaza principal no es un competidor sino el calendario: la patente de daratumumab en EE. UU. caduca en 2029 y la europea en 2031, y con ellas el 66 % de los ingresos [B3, A2]. En sus productos propios, Roche tiene dos biespecíficos de linfoma y más fuerza comercial, y la fase 3 DLBCL-1 de EPKINLY en monoterapia no mejoró la supervivencia [B10, B13]. En cabeza y cuello, petosemtamab compite con otros biespecíficos EGFR en desarrollo. Probabilidad de erosión del foso en cinco años: alta, salvo que los dos lanzamientos de 2027 funcionen.',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Lo material en Genmab es el acceso y precio de los medicamentos (presión regulatoria en EE. UU. sobre biológicos de 13 años: DARZALEX) [B3], la seguridad de los ensayos clínicos (síndrome de liberación de citoquinas en los biespecíficos) y el gobierno: la junta de 2026 tuvo que retirar la remuneración del consejo y aprobarla en una junta extraordinaria en octubre tras consultar a los accionistas [C3, C5]. Las emisiones son poco relevantes para un desarrollador sin fábricas propias.',
    controversias: 'Sin sanciones de reguladores en los tres últimos años según el 20-F. Litigios por patentes con Chugai (EPKINLY en Japón) y una demanda de AbbVie por secretos comerciales presentada en el 4T25, sin provisión [B3, B12].',
    confianza: 'Media',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'sector', campo: 'Segunda fuente independiente del tamaño del mercado oncológico', tipo: 'Complemento', intentos: '1) IQVIA (usada); 2) Evaluate Pharma (de pago); 3) DCAT (resume el mismo informe de IQVIA)', decision: 'Omitido' },
    { seccion: 'sector', campo: 'cr5_pct', tipo: 'Complemento', intentos: '1) IQVIA (no publica cuotas); 2) informes anuales de los grandes; 3) estimación (no fiable con el perímetro mundial)', decision: 'Omitido' },
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) informe anual (no las cita); 2) MSCI y Sustainalytics (de pago o bloqueados); 3) prensa', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Form 20-F 2025, Item 6 (consejo, dirección, remuneración, participaciones) e Item 7 (accionistas)', editor: 'Genmab A/S / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-17', url: `${E}/000143426526000014/gmab-20251231_d2.htm` },
  { id: 2, titulo: 'Annual Report 2025, nota 5.1 (remuneración de la dirección) y nota de honorarios del auditor', editor: 'Genmab A/S', tipo: 'Primaria', fecha: '2026-02-17', url: 'https://filings.xbrl.org/529900MTJPDPE4MHJ122/2025-12-31/ESEF/DK/0/genmab-2025-12-31-1-en/reports/genmab-2025-12-31-1-en.xhtml' },
  { id: 3, titulo: 'Passing of Genmab A/S\' Annual General Meeting (19-mar-2026: remuneración del consejo para 2026 retirada)', editor: 'Genmab A/S / SEC EDGAR', tipo: 'Primaria', fecha: '2026-03-19', url: `${E}/000143426526000044/gmab_20260319xex99d1x1.htm` },
  { id: 4, titulo: 'Carta a los accionistas para la junta extraordinaria del 7-oct-2026 (remuneración del consejo)', editor: 'Genmab A/S / SEC EDGAR', tipo: 'Primaria', fecha: '2026-09-08', url: `${E}/000143426526000116/gmab_20260908xex99d3.htm` },
  { id: 5, titulo: 'Resolution Adopted at the Extraordinary General Meeting (7-oct-2026)', editor: 'Genmab A/S / SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-07', url: `${E}/000143426526000134/gmab_20261007xex99d1.htm` },
  { id: 6, titulo: 'Major Shareholder Announcement: Orbis Investment Management (abr-jun 2026)', editor: 'Genmab A/S / SEC EDGAR', tipo: 'Primaria', fecha: '2026-06-15', url: `${E}/000143426526000092/gmab_20260615xex99d1.htm` },
  { id: 7, titulo: 'Major Shareholder Announcement: Darwin Global Management, 5,11 % (28-sep-2026)', editor: 'Genmab A/S / SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-02', url: `${E}/000143426526000129/gmab_20261002xex99d1.htm` },
  { id: 8, titulo: 'Transactions with Shares by Managerial Employees (29-may-2026: venta de 526 acciones de M. Kavanagh)', editor: 'Genmab A/S / SEC EDGAR', tipo: 'Primaria', fecha: '2026-05-29', url: `${E}/000143426526000085/gmab_29052026xex99d1.htm` },
  { id: 9, titulo: 'Transactions with Shares by Managerial Employees (27-feb-2026)', editor: 'Genmab A/S / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-27', url: `${E}/000143426526000031/gmab_20260227ex99d2.htm` },
  { id: 10, titulo: 'Genmab Announces Initiation of Share Buy-Back Program (17-feb-2026)', editor: 'Genmab A/S / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-17', url: `${E}/000143426526000016/gmab_20260217xex99d1.htm` },
  { id: 11, titulo: 'Interim Report for the First Half of 2026 (guía 2026 y su revisión)', editor: 'Genmab A/S / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-06', url: `${E}/000143426526000108/gmab-20260630.htm` },
  { id: 12, titulo: 'Annual Report 2025: guía 2025 frente a lo logrado', editor: 'Genmab A/S', tipo: 'Primaria', fecha: '2026-02-17', url: 'https://filings.xbrl.org/529900MTJPDPE4MHJ122/2025-12-31/ESEF/DK/0/genmab-2025-12-31-1-en/reports/genmab-2025-12-31-1-en.xhtml' },
];
const C = {
  _estado: 'completo',
  directivos: {
    equipo: [
      { nombre: 'Jan G. J. van de Winkel', cargo: 'Presidente ejecutivo (CEO)', desde: '2010', participacion_pct: 1.06, trayectoria: 'Cofundador y director científico hasta 2010. Con él los ingresos pasaron de menos de 100 M USD a 3.720 M y Genmab pasó de las regalías a vender productos propios; también decidió las compras de ProfoundBio y Merus [C1, C2].' },
      { nombre: 'Anthony Pagano', cargo: 'Director financiero', desde: '2019', participacion_pct: 0.03, trayectoria: 'Antes en Genmab EE. UU. y en la industria; montó la financiación de 5.500 M de Merus y rebajó en un punto el margen del préstamo B en junio de 2026 [C1, C11].' },
      { nombre: 'Deirdre P. Connelly', cargo: 'Presidenta del consejo (independiente)', desde: '2017', participacion_pct: 0.01, trayectoria: 'Expresidenta de GSK Norteamérica y 26 años en Eli Lilly; lanzó más de 20 medicamentos [C1].' },
      { nombre: 'Judith Klimovsky', cargo: 'Directora de desarrollo', desde: '2017', participacion_pct: null, trayectoria: 'Responsable de los ensayos de fase 3 de epcoritamab, Rina-S y petosemtamab [C1].' },
      { nombre: 'Tahamtan Ahmadi', cargo: 'Director médico', desde: '2019', participacion_pct: null, trayectoria: 'Lidera la medicina experimental [C1].' },
    ],
    historial_guidance: [
      { anio: '2025', guia: 'Ingresos 3.500-3.700 M USD; beneficio operativo ajustado 1.055-1.405 M [C12]', real: 'Ingresos 3.720 M; beneficio operativo ajustado 1.263 M [C12]', cumplida: 'Sí' },
      { anio: '2026 (en curso)', guia: 'Febrero: ingresos 4.065-4.395 M; agosto: 4.325-4.525 M [C11]', real: 'Primer semestre: 2.051 M (+25 %) [C11]', cumplida: 'Parcial' },
    ],
    comentario: 'Equipo estable y fundador al mando desde 2010, con un 1,06 % del capital [C1]. Ha cumplido las guías anuales recientes (2025 dentro del rango y por arriba en ingresos) [C12], y en 2026 ya la ha subido [C11]. El punto débil es la ejecución de los ensayos: la fase 3 DLBCL-1 de EPKINLY no mejoró la supervivencia y acasunlimab se abandonó en 2025 [C12]. Sucesión: el consejero delegado tiene 64 años y no hay sucesor anunciado; es la principal pregunta de gobierno para 2027-2029, justo cuando caen las regalías.',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Deirdre P. Connelly', cargo: 'Presidenta', tipo: 'Independiente', desde: '2017', comisiones: 'Auditoría y Finanzas; Retribuciones; Nombramientos' },
      { nombre: 'Pernille Erenbjerg', cargo: 'Vicepresidenta', tipo: 'Independiente', desde: '2015', comisiones: 'Auditoría y Finanzas (presidenta); Nombramientos' },
      { nombre: 'Anders Gersel Pedersen', cargo: 'Consejero', tipo: 'Otro externo', desde: '2003', comisiones: 'Nombramientos (presidente); Retribuciones; Científica' },
      { nombre: 'Paolo Paoletti', cargo: 'Consejero', tipo: 'Independiente', desde: '2015', comisiones: 'Científica (presidente); Retribuciones' },
      { nombre: 'Rolf Hoffmann', cargo: 'Consejero', tipo: 'Independiente', desde: '2017', comisiones: 'Auditoría y Finanzas; Científica' },
      { nombre: 'Elizabeth O\'Farrell', cargo: 'Consejera', tipo: 'Independiente', desde: '2022', comisiones: 'Retribuciones (presidenta); Auditoría y Finanzas' },
      { nombre: 'Martin Schultz', cargo: 'Consejero (empleados)', tipo: 'Otro externo', desde: '2022', comisiones: '—' },
      { nombre: 'Mijke Zachariasse', cargo: 'Consejera (empleados)', tipo: 'Otro externo', desde: '2019', comisiones: '—' },
      { nombre: 'Michael Kavanagh', cargo: 'Consejero (empleados)', tipo: 'Otro externo', desde: '2025', comisiones: '—' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: false, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 10.7, fijo: 1.8, variable_corto: 1.5, variable_largo: 7.4, ratio_salario_medio: null },
    remuneracion: 'El consejero delegado cobró 10,7 M USD en 2025: 1,5 M de salario, 0,3 M de pensión, 1,5 M de bonus y 7,4 M en acciones restringidas (RSU) [C2]. El bonus puede llegar al 150 % del salario y lo que pase del 100 % se paga en RSU a tres años; los demás directivos, hasta el 90 % [C1]. Las RSU se conceden a discreción del consejo y el 20-F no detalla métricas de rentabilidad sobre el capital: por eso no damos el variable por ligado a rentabilidad. Indemnización: dos años de salario más 12 meses de preaviso, y con cambio de control dos años más y dos veces el mayor bonus [C1]. El consejo cobra en efectivo y RSU solo por permanencia; en la junta de marzo de 2026 tuvo que retirar su propuesta por la oposición de accionistas y asesores de voto, y la aprobó en una junta extraordinaria el 7-oct-2026 tras recalibrar el grupo de comparación, sin bajar importes [C3, C4, C5].',
    accionistas: [
      { nombre: 'Orbis Investment Management', pct: 5.0, tipo: 'Institucional', variacion: 'Entra y sale alrededor del 5 % (avisos de marzo a junio de 2026: 3,11-3,17 millones de acciones) [C6]' },
      { nombre: 'Darwin Global Management', pct: 5.11, tipo: 'Institucional', variacion: 'Supera el 5 % el 28-sep-2026 [C7]' },
      { nombre: 'BlackRock', pct: 5.8, tipo: 'Institucional', variacion: 'Según el 13G de marzo de 2025 citado en el 20-F [C1]' },
      { nombre: 'Consejo y dirección', pct: 1.27, tipo: 'Directivos', variacion: 'Totalmente diluido; el consejero delegado, 1,06 % [C1]' },
      { nombre: 'Autocartera', pct: 1.47, tipo: 'Autocartera', variacion: '915.601 acciones a 30-jun-2026 tras amortizar 1,9 millones en abril [C11]' },
    ],
    insiders: [
      { fecha: '2026-05-29', persona: 'Michael Kavanagh (consejero por los empleados)', operacion: 'Venta', acciones: 526, importe: 0.14 },
    ],
    control_y_defensas: 'Sin accionista de control: el mayor tiene ≈5-6 % y hay una sola clase de acciones, con un voto por acción [C1]. La presidenta y la vicepresidenta son independientes y presiden la comisión de auditoría y el consejo; seis consejeros los elige la junta cada año y tres los empleados (ley danesa) [C1]. No hay blindajes estatutarios; sí un régimen danés de control de inversión extranjera en sectores sensibles que podría afectar a una oferta [C1]. La única defensa de facto son las indemnizaciones por cambio de control de la dirección (hasta cuatro años de salario para el consejero delegado) [C1].',
    alertas: [
      'Junta de marzo de 2026: retirada de la remuneración del consejo por falta de apoyo; aprobada en la extraordinaria de octubre sin bajar los importes [C3, C5].',
      'Remuneración del consejero delegado de 10,7 M USD en 2025, el 69 % en RSU que no dependen de objetivos publicados de rentabilidad [C2].',
    ],
    confianza: 'Media',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'voto_remuneracion_pct y voto_remuneracion_contra_pct', tipo: 'Complemento', intentos: '1) anuncios de las juntas de 2024-2026 (sin recuento); 2) web de inversores (403); 3) prensa danesa', decision: 'Omitido' },
    { seccion: 'gobierno', campo: 'ratio_salario_medio', tipo: 'Complemento', intentos: '1) informe de remuneraciones; 2) informe anual (coste de personal 763 M / 2.694 empleados = 0,28 M, pero incluye pagos en acciones); 3) cálculo propio no comparable', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios GMAB.CO, ^OMXC25 y EXV4.DE (precio, rango, rentabilidades, beta, volatilidad, cierres de ejercicio)', editor: 'Yahoo Finance (herramientas/bolsa.mjs)', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/quote/GMAB.CO/history' },
  { id: 2, titulo: 'Genmab A/S: estimaciones anuales 2026-2028 (ingresos, EBITDA, EBIT, beneficio, BPA en DKK), 17 analistas, objetivo medio 2.635,67 DKK', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-15', url: 'https://www.marketscreener.com/quote/stock/GENMAB-A-S-447532/finances/' },
  { id: 3, titulo: 'GMAB: estadísticas y previsiones (ADS; objetivo medio 44,4 USD, 12 analistas, «Strong Buy»)', editor: 'Stock Analysis', tipo: 'Analistas', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/gmab/forecast/' },
  { id: 4, titulo: 'Implied ERP by month (ERPbymonth.xlsx): 4,20 % en octubre de 2026', editor: 'A. Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 5, titulo: 'Bono del Tesoro de EE. UU. a 10 años (DGS10): 5,21 % el 13-oct-2026', editor: 'FRED, Federal Reserve Bank of St. Louis', tipo: 'Datos de mercado', fecha: '2026-10-13', url: 'https://fred.stlouisfed.org/series/DGS10' },
  { id: 6, titulo: 'Tipos de cambio de referencia del euro (EUR/USD 1,1208 y EUR/DKK 7,475 el 15-oct-2026; cierres de año)', editor: 'Banco Central Europeo', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist.zip' },
  { id: 7, titulo: 'Comparables de biofarmacia (Incyte, United Therapeutics, Vertex, BioMarin, Jazz, Exelixis): estadísticas al cierre del 14-oct-2026', editor: 'Stock Analysis (ficha sectorial del repositorio, sectores/biofarma-neurologia-2026-10-15)', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/vrtx/statistics/' },
  { id: 8, titulo: 'Royalty Pharma (RPRX): estadísticas', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/rprx/statistics/' },
  { id: 9, titulo: 'Halozyme (HALO): estadísticas', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/halo/statistics/' },
  { id: 10, titulo: 'Movimiento del precio de GMAB.CO a 1-12 meses, máximos, media de 200 sesiones y caídas diarias de más del 5 % (herramientas/movimiento.mjs y movimiento-precio.mjs)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/quote/GMAB.CO/history' },
  { id: 11, titulo: 'Annual Report 2025: cifras clave 2021-2025 (precio de cierre de cada año en DKK)', editor: 'Genmab A/S', tipo: 'Primaria', fecha: '2026-02-17', url: 'https://filings.xbrl.org/529900MTJPDPE4MHJ122/2025-12-31/ESEF/DK/0/genmab-2025-12-31-1-en/reports/genmab-2025-12-31-1-en.xhtml' },
  { id: 12, titulo: 'Interim Report for the First Half of 2026: guía 2026, deuda a 30-jun-2026, acciones y autocartera', editor: 'Genmab A/S / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-06', url: `${E}/000143426526000108/gmab-20260630.htm` },
  { id: 13, titulo: 'Genmab Announces Completion of Tender Offer for Merus (97 USD por acción)', editor: 'Genmab A/S / SEC EDGAR', tipo: 'Primaria', fecha: '2025-12-12', url: `${E}/000143426525000110/gmab_20251212xex991.htm` },
  { id: 14, titulo: 'Seeking Alpha: titulares y análisis sobre GMAB (resultados, conferencias, «late-stage trial setback» del 24-jul-2026)', editor: 'Seeking Alpha', tipo: 'Prensa', fecha: '2026-10-06', url: 'https://seekingalpha.com/symbol/GMAB' },
];
const cierres = Object.fromEntries((BOLSA.cierres_ejercicio || []).map((c) => [c.anio, c.precio_cierre]));
const serieMH = ['2021', '2022', '2023', '2024', '2025'].map((a) => ({ anio: a, precio_cierre: r2(cierres[a] / FX_CIERRE[a]), ev_ebitda_ntm: null, per_ntm: null, excluir: false }));
const comps = [
  { nombre: 'Incyte', ticker: 'INCY', pais: 'US', capitalizacion: 22610, ev_ventas: 3.11, ev_ebitda_ltm: 9.3, ev_ebitda_ntm: null, per_ntm: null, crecimiento_pct: 8.5, margen_ebitda_pct: 33.4, roic_pct: null, dn_ebitda: -2.3, fcf_yield_pct: 8.5 },
  { nombre: 'United Therapeutics', ticker: 'UTHR', pais: 'US', capitalizacion: 23160, ev_ventas: 6.14, ev_ebitda_ltm: 12.9, ev_ebitda_ntm: null, per_ntm: 20.3, crecimiento_pct: null, margen_ebitda_pct: 47.4, roic_pct: 31.3, dn_ebitda: -2.5, fcf_yield_pct: 4.7 },
  { nombre: 'Vertex', ticker: 'VRTX', pais: 'US', capitalizacion: 126350, ev_ventas: 9.11, ev_ebitda_ltm: 22.5, ev_ebitda_ntm: null, per_ntm: 34.4, crecimiento_pct: null, margen_ebitda_pct: 40.5, roic_pct: 28.8, dn_ebitda: -2.3, fcf_yield_pct: 3.0 },
  { nombre: 'BioMarin', ticker: 'BMRN', pais: 'US', capitalizacion: 10670, ev_ventas: 4.11, ev_ebitda_ltm: 21.7, ev_ebitda_ntm: null, per_ntm: 9.6, crecimiento_pct: null, margen_ebitda_pct: 18.9, roic_pct: 3.2, dn_ebitda: 5.2, fcf_yield_pct: 6.9 },
  { nombre: 'Jazz Pharmaceuticals', ticker: 'JAZZ', pais: 'IE', capitalizacion: 13610, ev_ventas: 3.44, ev_ebitda_ltm: 8.2, ev_ebitda_ntm: null, per_ntm: 9.6, crecimiento_pct: null, margen_ebitda_pct: 41.9, roic_pct: 17.2, dn_ebitda: 1.1, fcf_yield_pct: 11.7 },
  { nombre: 'Exelixis', ticker: 'EXEL', pais: 'US', capitalizacion: 15110, ev_ventas: 5.7, ev_ebitda_ltm: 13.6, ev_ebitda_ntm: null, per_ntm: 17.4, crecimiento_pct: null, margen_ebitda_pct: 41.9, roic_pct: null, dn_ebitda: -1.2, fcf_yield_pct: 7.8 },
  { nombre: 'Royalty Pharma', ticker: 'RPRX', pais: 'US', capitalizacion: 34530, ev_ventas: 16.58, ev_ebitda_ltm: 27.0, ev_ebitda_ntm: null, per_ntm: 10.9, crecimiento_pct: null, margen_ebitda_pct: 61.4, roic_pct: 5.4, dn_ebitda: 5.1, fcf_yield_pct: 8.8 },
  { nombre: 'Halozyme', ticker: 'HALO', pais: 'US', capitalizacion: 13760, ev_ventas: 9.14, ev_ebitda_ltm: 14.5, ev_ebitda_ntm: null, per_ntm: 12.2, crecimiento_pct: null, margen_ebitda_pct: 63.2, roic_pct: 32.1, dn_ebitda: 1.8, fcf_yield_pct: 6.1 },
];
const D = {
  _estado: 'completo',
  identificacion: {
    nombre: 'Genmab A/S', nombre_corto: 'Genmab', ticker: 'GMAB', isin: 'DK0010272202', mercado: 'Nasdaq Copenhague (también ADS en el Nasdaq de EE. UU., 10 ADS = 1 acción)', indice_referencia: 'OMX Copenhagen 25',
    pais: 'Dinamarca', pais_iso: 'DK', sector: 'Salud', industria: 'Biotecnología', sede: 'Valby (Copenhague)', fundacion: '1999', empleados: 3119, web: 'https://www.genmab.com',
    precio: r2(2529 / FX_HOY), fecha_precio: '2026-10-15', acciones: 61.8, capitalizacion_publicada: 22760, free_float_pct: 98.0,
    max_52s: r2(2603 / FX_HOY), min_52s: r2(1512 / FX_HOY), volumen_medio_diario: '≈ 259 M DKK/día (≈ 39 M USD; 3 meses, solo Copenhague)', proximos_resultados: '2026-11-05',
  },
  consenso: {
    guidance: 'Guía de 2026 revisada el 6-ago-2026: ingresos de 4.325-4.525 M USD (antes 4.065-4.395 M), regalías de 3.625-3.750 M, ventas propias y colaboración de 595-640 M, gastos operativos ajustados de 2.810-2.950 M y beneficio operativo ajustado de 1.065-1.385 M (excluye 90 M de costes de integración y 47 M de amortización de intangibles comprados) [D12]. Supone ventas de DARZALEX de 16.500-16.900 M y un USD/DKK de 6,2 [D12]. A medio plazo: petosemtamab con al menos 1.000 M de ventas en 2029 y lanzamiento en 2027; la compra de Merus, acrecitiva al EBITDA a finales de 2029 [D13]. Próximos resultados: 5-nov-2026.',
    estimaciones: [
      { periodo: '2026e', ingresos: r1(29678 / FX_HOY), ebitda: r1(8863 / FX_HOY), ebit: r1(7825 / FX_HOY), bpa: r2(81.38 / FX_HOY), dpa: 0, fuente: 'MarketScreener, 17 analistas, en DKK convertidos a 6,6693 [D2]' },
      { periodo: '2027e', ingresos: r1(34828 / FX_HOY), ebitda: r1(12364 / FX_HOY), ebit: r1(10161 / FX_HOY), bpa: r2(114.9 / FX_HOY), dpa: 0, fuente: 'MarketScreener [D2]' },
      { periodo: '2028e', ingresos: r1(43539 / FX_HOY), ebitda: r1(17311 / FX_HOY), ebit: r1(14631 / FX_HOY), bpa: r2(173 / FX_HOY), dpa: 0, fuente: 'MarketScreener [D2]' },
    ],
    recomendaciones: { n_analistas: 17, comprar: null, mantener: null, vender: null, po_medio: r2(2635.67 / FX_HOY), po_min: r2(33.5 * 10 * 6.669 / FX_HOY), po_max: r2(58 * 10 * 6.669 / FX_HOY) },
    revisiones: 'Una sola fuente gratuita con estimaciones completas (MarketScreener, en DKK); contrastamos objetivo y recomendación con Stock Analysis para el ADS: 12 analistas, «Strong Buy», objetivo medio 44,4 USD por ADS (≈444 USD por acción), mínimo 33,5 y máximo 58 [D2, D3]. Las estimaciones de ingresos de 2026 han subido con la guía de agosto (de 4.230 M a 4.425 M en el punto medio) [D12]; Barclays subió en septiembre su objetivo a 2.900 DKK (titular de MarketScreener). No tenemos la serie de revisiones de BPA a 3 y 12 meses (hueco).',
    base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: 3.1,
    confianza: 'Media',
  },
  bolsa: {
    ...BOLSA.bolsa,
    posicion_corta_pct: null,
    comentario: 'La acción ha subido un 24,8 % en 2026 y un 21,8 % en un año, frente al 0,5 % y el 8,5 % del OMXC25, pero en cinco años pierde un 2,4 % anual [D1]: cayó un 64,5 % entre diciembre de 2022 y abril de 2025 por la cercanía de la caducidad de DARZALEX y las dudas sobre la cartera propia [D1]. La recuperación desde el mínimo de 1.512 DKK (3-jun-2026) se explica por tres hechos: la guía subida en agosto, la fase 3 DLBCL-4 positiva (29-jun) y la DLBCL-2 en primera línea (5-oct) [D12, D10]. La beta frente al OMXC25 es 1,01 y frente al S&P 500 (ADS) 0,65 [D1, D3].',
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: serieMH,
    comentario: 'Genmab cotizaba a 35-57 veces el BPA del año siguiente en 2020-2022, cuando el mercado pagaba la cartera y las regalías crecientes sin mirar la caducidad, y bajó a 13,5 veces a finales de 2024, cuando la caducidad de DARZALEX (2029) quedaba a cuatro años y las ventas propias no compensaban [D1, D11]. Hoy cotiza a ≈22,9 veces nuestro BPA de 2027, por debajo de la mediana de cinco años (28,1x) pero muy por encima del mínimo. Ha cambiado algo estructural: la deuda de Merus (5.375 M) y el plazo de las regalías. Los precios de cierre están convertidos a USD al tipo de cierre de cada año del BCE [D6].',
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Biotecnológicas rentables de tamaño medio con un producto dominante y riesgo de caducidad (Incyte, United Therapeutics, BioMarin, Jazz, Exelixis), una de referencia de calidad (Vertex) y dos modelos de regalías (Royalty Pharma, Halozyme), que es como gana hoy Genmab el 83 % de sus ingresos [D7, D8, D9]. No usamos Roche, AbbVie o J&J (diez veces mayores y diversificadas) ni argenx o BioNTech (sin beneficio comparable). PER adelantado de Stock Analysis sobre BPA ajustado; el de Genmab es NIIF, cercano al ajustado porque apenas ajusta (integración y amortización de compras).',
    empresas: comps,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2025-12', objetivo: 'Merus (petosemtamab)', comprador: 'Genmab', ev: 8000, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '97 USD por acción en efectivo; sin ventas propias relevantes [D13].' },
      { fecha: '2024-05', objetivo: 'ProfoundBio (Rina-S)', comprador: 'Genmab', ev: 1800, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'No cotizada; precio en caja de 1.783 M netos [A2].' },
    ],
    comentario: 'Las compras de biotecnológicas en oncología se pagan por la cartera, no por el beneficio: no hay múltiplos de EBITDA útiles. Genmab, sin accionista de control y con 23.400 M de capitalización, es un objetivo posible para una gran farmacéutica que quiera las plataformas y los lanzamientos de 2027, pero la caducidad de DARZALEX y la deuda lo hacen menos probable antes de ver las fases 3 de petosemtamab.',
    confianza: 'Baja',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'transacciones', campo: 'Múltiplos de transacciones comparables', tipo: 'Complemento', intentos: '1) notas de las compras de Genmab (sin ventas ni EBITDA del comprado); 2) operaciones de oncología 2020-2025 (Seagen, ImmunoGen, Mirati: múltiplos de prensa sin nota oficial leída); 3) cálculo propio sin cifras primarias', decision: 'Omitido' },
    { seccion: 'bolsa', campo: 'posicion_corta_pct', tipo: 'Complemento', intentos: '1) Finanstilsynet (xlsx mensual, solo por encima del 0,5 %: ninguna publicada leída); 2) Stock Analysis (1,00 % de las acciones en el ADS, no la acción danesa); 3) prensa', decision: 'Omitido' },
    { seccion: 'consenso', campo: 'Revisiones del BPA a 3 y 12 meses', tipo: 'Complemento', intentos: '1) MarketScreener (solo la foto actual gratis); 2) Stock Analysis (de pago); 3) Investing (bloqueado)', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Stocktwits: flujo de mensajes de $GMAB (30 mensajes, 1-12 oct 2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-12', url: 'https://api.stocktwits.com/api/2/streams/symbol/GMAB.json' },
  { id: 2, titulo: 'Seeking Alpha: análisis de lectores sobre GMAB («Darzalex Growth Fuels Rally, Upside Is Tight», «Multiple Binaries Could Alter The Thesis», «Multiple Late-Stage Readouts Ahead», «H1 Preview: Darzalex Beats The Sales Outlook»)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-07-28', url: 'https://seekingalpha.com/api/sa/combined/GMAB.xml' },
  { id: 3, titulo: 'Genmab and AbbVie\'s epcoritamab fails in phase 3 lymphoma study', editor: 'European Biotechnology', tipo: 'Prensa', fecha: '2026-07-24', url: 'https://european-biotechnology.com/latest-news/genmab-abbvies-epcoritamab-phase-3-lymphoma/' },
  { id: 4, titulo: 'Setback for Genmab and AbbVie\'s lymphoma drug', editor: 'The Pharma Letter', tipo: 'Prensa', fecha: '2026-07-24', url: 'https://www.thepharmaletter.com/biotech-news/setback-for-genmab-and-abbvie-s-lymphoma-drug' },
];
const ESent = {
  _estado: 'completo',
  sentimiento: {
    tono: 'Positivo',
    tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Stocktwits ($GMAB)', fecha: '2026-10', n_comentarios: 30, tono: 'Positivo', resumen: 'Euforia tras la fase 3 DLBCL-2 del 5-oct: mensajes de «nuevo estándar» en primera línea y objetivos de 50-100 USD por ADS sin cifras que los sostengan; algún mensaje que la llama «aburrida pero constante» [E1].' },
      { plataforma: 'Seeking Alpha (artículos y comentarios)', fecha: '2026-07', n_comentarios: 20, tono: 'Dividido', resumen: 'Unos destacan que DARZALEX supera las previsiones de ventas; otros que el potencial es «ajustado» y que la tesis depende de varios resultados binarios (petosemtamab, Rina-S, EPKINLY en primera línea) [E2].' },
      { plataforma: 'Prensa especializada (European Biotechnology, The Pharma Letter)', fecha: '2026-07', n_comentarios: 6, tono: 'Negativo', resumen: 'Cobertura del «revés» de julio: la DLBCL-1 no mejoró la supervivencia global, el único objetivo principal en EE. UU. [E3, E4].' },
    ],
    temas: [
      { tema: 'EPKINLY en primera línea de linfoma difuso', postura: 'Alcista', peso: 'Alto', contraste: 'Los datos lo apoyan (HR 0,49 en supervivencia libre de progresión) pero aún sin supervivencia global ni aprobación; y EPKINLY se reparte con AbbVie [B8, A3].' },
      { tema: 'Caducidad de DARZALEX en 2029', postura: 'Bajista', peso: 'Medio', contraste: 'Es el riesgo central del informe: el 66 % de los ingresos caduca entre 2029 y 2031 [A1, A2].' },
      { tema: 'Resultados binarios de petosemtamab y Rina-S', postura: 'Dividida', peso: 'Medio', contraste: 'Coincide con el informe: la compra de Merus (≈8.000 M) depende de dos fases 3 [B11].' },
    ],
    lectura: 'El foro de particulares está eufórico tras la DLBCL-2 y la acción en máximos de 52 semanas, mientras los artículos de análisis más extensos siguen divididos por la caducidad de DARZALEX y los resultados binarios. La euforia no cambia la valoración, pero sí advierte de que buena parte de la buena noticia ya está en el precio (+37 % en tres meses) y de que una fase 3 negativa de petosemtamab o Rina-S tendría el efecto contrario. No hemos encontrado debate en foros daneses (Euroinvestor, Shareholders.dk) accesible sin registro.',
    confianza: 'Media',
  },
  fuentes: fE,
  huecos: [],
};

guarda('A', A); guarda('B', B); guarda('C', C); guarda('D', D); guarda('E', ESent);
console.log('Notas A-E escritas');
