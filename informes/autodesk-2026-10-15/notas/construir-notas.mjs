// Escribe las notas A-E de Autodesk (corte 2026-10-15) sin subagentes.
// Cuentas: XBRL de la SEC (notas/cuentas-xbrl.json) comprobado contra el 10-K FY2026, el 10-Q del 2T FY27 y las notas de resultados.
// Cada nota cita con [n] de su propia lista de fuentes. Ejecutar: node notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const EDGAR = 'https://www.sec.gov/Archives/edgar/data/769397';
const EURUSD = 1.1195; // BCE, 14-oct-2026

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Autodesk, Form 10-K del ejercicio cerrado el 31-ene-2026 (FY2026)', editor: 'Autodesk / SEC EDGAR', tipo: 'Primaria', fecha: '2026-03-03', url: `${EDGAR}/000076939726000015/adsk-20260131.htm` },
  { id: 2, titulo: 'Autodesk announces fiscal 2027 second quarter results (nota de resultados, anexo 99.1)', editor: 'Autodesk / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-27', url: `${EDGAR}/000076939726000059/q227pressrelease.htm` },
  { id: 3, titulo: 'Autodesk announces fiscal 2026 fourth quarter and full-year results (anexo 99.1)', editor: 'Autodesk / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-26', url: `${EDGAR}/000076939726000010/q426pressrelease.htm` },
  { id: 4, titulo: 'Autodesk, Form 10-Q del trimestre cerrado el 31-jul-2026 (2T FY27)', editor: 'Autodesk / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-28', url: `${EDGAR}/000076939726000061/adsk-20260731.htm` },
  { id: 5, titulo: 'Autodesk, Inc.: hechos XBRL de las cuentas anuales (companyfacts, CIK 769397)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0000769397.json' },
  { id: 6, titulo: 'Autodesk announces fiscal 2024 fourth quarter and full-year results (anexo 99.1)', editor: 'Autodesk / SEC EDGAR', tipo: 'Primaria', fecha: '2024-02-29', url: `${EDGAR}/000076939724000019/q424pressrelease.htm` },
  { id: 7, titulo: 'Autodesk announces fiscal 2023 fourth quarter and full-year results (anexo 99.1)', editor: 'Autodesk / SEC EDGAR', tipo: 'Primaria', fecha: '2023-02-23', url: `${EDGAR}/000076939723000022/q423pressrelease.htm` },
  { id: 8, titulo: 'Autodesk announces fiscal 2022 fourth quarter and full-year results (anexo 99.1)', editor: 'Autodesk / SEC EDGAR', tipo: 'Primaria', fecha: '2022-02-24', url: `${EDGAR}/000076939722000013/q422pressrelease.htm` },
  { id: 9, titulo: 'Autodesk announces fiscal 2021 fourth quarter and full-year results (anexo 99.1)', editor: 'Autodesk / SEC EDGAR', tipo: 'Primaria', fecha: '2021-02-25', url: `${EDGAR}/000076939721000009/q421pressrelease.htm` },
  { id: 10, titulo: 'Autodesk announces fiscal 2026 third quarter results (anexo 99.1)', editor: 'Autodesk / SEC EDGAR', tipo: 'Primaria', fecha: '2025-11-25', url: `${EDGAR}/000076939725000126/q326pressrelease.htm` },
  { id: 11, titulo: 'Autodesk announces fiscal 2027 first quarter results (anexo 99.1)', editor: 'Autodesk / SEC EDGAR', tipo: 'Primaria', fecha: '2026-05-28', url: `${EDGAR}/000076939726000041/q127pressrelease.htm` },
  { id: 12, titulo: 'Transcript: Autodesk (ADSK) Q2 FY27 earnings call', editor: 'The Singju Post', tipo: 'Prensa', fecha: '2026-08-27', url: 'https://singjupost.com/transcript-autodesk-adsk-q2-fy27-earnings-call-conference/' },
  { id: 13, titulo: 'Form 8-K: plan de reestructuración de enero de 2026 (≈1.000 empleos, 135-160 M USD) y carta del consejero delegado', editor: 'Autodesk / SEC EDGAR', tipo: 'Primaria', fecha: '2026-01-22', url: `${EDGAR}/000076939726000006/adsk-20260122.htm` },
  { id: 14, titulo: 'Autodesk announces fiscal 2020 fourth quarter and full-year results (anexo 99.1)', editor: 'Autodesk / SEC EDGAR', tipo: 'Primaria', fecha: '2020-02-27', url: `${EDGAR}/000076939720000005/q420pressrelease.htm` },
  { id: 15, titulo: 'Autodesk announces fiscal 2025 fourth quarter and full-year results (anexo 99.1)', editor: 'Autodesk / SEC EDGAR', tipo: 'Primaria', fecha: '2025-02-27', url: `${EDGAR}/000076939725000013/` },
  { id: 16, titulo: 'Form 8-K: emisión de 500 M USD al 5,050 % con vencimiento en 2029 y 500 M USD al 5,650 % en 2033', editor: 'Autodesk / SEC EDGAR', tipo: 'Primaria', fecha: '2026-09-10', url: `${EDGAR}/000119312526387877/d103766d8k.htm` },
  { id: 17, titulo: 'Folleto (424B2) de las obligaciones 2029 y 2033: uso de los fondos (repago del préstamo puente de 1.000 M USD)', editor: 'Autodesk / SEC EDGAR', tipo: 'Primaria', fecha: '2026-09-08', url: `${EDGAR}/000119312526384494/d110760d424b2.htm` },
];

const c = (periodo, o) => ({ periodo, participadas_en_ebitda: null, dpa: 0, dpa_extraordinario: 0, minoritarios: 0, ...o });
// Cuenta del XBRL [5] comprobada con el 10-K [1] y las notas de resultados. gastos_generales = ventas y marketing + generales y administración.
// amortizaciones = «Depreciation, amortization and accretion» del estado de flujos (incluye la amortización de la tecnología y los intangibles comprados).
// no_recurrentes_en_ebitda = reestructuración + costes de adquisición de la conciliación non-GAAP.
const cuenta = [
  c('FY2021', { ingresos: 3790, coste_ventas: 337, gastos_generales: 1854, ebitda: 753, amortizaciones: 124, ebit: 629, resultado_financiero: -82, bai: 547, impuestos: -661, beneficio_neto: 1208, gastos_financieros: null, no_recurrentes_en_ebitda: null, bpa: 5.44, acciones_diluidas: 222 }),
  c('FY2022', { ingresos: 4386, coste_ventas: 418, gastos_generales: 2195, ebitda: 766, amortizaciones: 148, ebit: 618, resultado_financiero: -53, bai: 565, impuestos: 68, beneficio_neto: 497, gastos_financieros: null, no_recurrentes_en_ebitda: null, bpa: 2.24, acciones_diluidas: 222 }),
  c('FY2023', { ingresos: 5005, coste_ventas: 480, gastos_generales: 2277, ebitda: 1139, amortizaciones: 150, ebit: 989, resultado_financiero: -43, bai: 946, impuestos: 123, beneficio_neto: 823, gastos_financieros: 83, no_recurrentes_en_ebitda: null, bpa: 3.78, acciones_diluidas: 218 }),
  c('FY2024', { ingresos: 5497, coste_ventas: 511, gastos_generales: 2443, ebitda: 1267, amortizaciones: 139, ebit: 1128, resultado_financiero: 8, bai: 1136, impuestos: 230, beneficio_neto: 906, gastos_financieros: 71, no_recurrentes_en_ebitda: 14, bpa: 4.19, acciones_diluidas: 216 }),
  c('FY2025', { ingresos: 6131, coste_ventas: 578, gastos_generales: 2650, ebitda: 1534, amortizaciones: 180, ebit: 1354, resultado_financiero: 30, bai: 1384, impuestos: 272, beneficio_neto: 1112, gastos_financieros: 71, no_recurrentes_en_ebitda: 62, bpa: 5.12, acciones_diluidas: 217 }),
  c('FY2026', { ingresos: 7206, coste_ventas: 650, gastos_generales: 3066, ebitda: 1773, amortizaciones: 195, ebit: 1578, resultado_financiero: 25, bai: 1603, impuestos: 479, beneficio_neto: 1124, gastos_financieros: 80, no_recurrentes_en_ebitda: 232, bpa: 5.23, acciones_diluidas: 215 }),
];

// Balance [5, 1]. pasivos_contrato = ingresos diferidos a corto + largo. Arrendamientos operativos (US GAAP) fuera: su gasto ya está en el EBITDA.
const b = (periodo, o) => ({ periodo, existencias: 0, activos_contrato: null, arrendamientos: 0, minoritarios: 0, ...o });
const historico = [
  b('FY2021', { activo_total: 7280, activo_corriente: 2626, pasivo_corriente: 3255, pasivo_total: 6315, fondo_comercio: 2707, intangibles: 199, inmovilizado_material: 193, clientes: 643, proveedores: 123, pasivos_contrato: 3360, caja: 1772, deuda_financiera: 1650, patrimonio_neto: 965, reservas: -1488 }),
  b('FY2022', { activo_total: 8607, activo_corriente: 2764, pasivo_corriente: 4009, pasivo_total: 7758, fondo_comercio: 3604, intangibles: 494, inmovilizado_material: 162, clientes: 716, proveedores: 121, pasivos_contrato: 3790, caja: 1528, deuda_financiera: 2650, patrimonio_neto: 849, reservas: -1950 }),
  b('FY2023', { activo_total: 9438, activo_corriente: 3341, pasivo_corriente: 4000, pasivo_total: 8293, fondo_comercio: 3625, intangibles: 407, inmovilizado_material: 144, clientes: 961, proveedores: 102, pasivos_contrato: 4580, caja: 1947, deuda_financiera: 2300, patrimonio_neto: 1145, reservas: -1995 }),
  b('FY2024', { activo_total: 9912, activo_corriente: 3579, pasivo_corriente: 4351, pasivo_total: 8057, fondo_comercio: 3653, intangibles: 406, inmovilizado_material: 121, clientes: 876, proveedores: 100, pasivos_contrato: 4264, caja: 1892, deuda_financiera: 2300, patrimonio_neto: 1855, reservas: -1713 }),
  b('FY2025', { activo_total: 10833, activo_corriente: 3482, pasivo_corriente: 5151, pasivo_total: 8212, fondo_comercio: 4242, intangibles: 574, inmovilizado_material: 117, clientes: 1008, proveedores: 242, pasivos_contrato: 4128, caja: 1599, deuda_financiera: 2300, patrimonio_neto: 2621, reservas: -1333 }),
  b('FY2026', { activo_total: 12467, activo_corriente: 4942, pasivo_corriente: 5808, pasivo_total: 9422, fondo_comercio: 4295, intangibles: 467, inmovilizado_material: 121, clientes: 1439, proveedores: 422, pasivos_contrato: 4693, caja: 2249, deuda_financiera: 2500, patrimonio_neto: 3045, reservas: -1432 }),
];

const f = (periodo, o) => ({ periodo, pagos_arrendamientos: 0, desinversiones: 0, dividendos: 0, intereses_en_financiacion: 0, ...o });
const flujos = [
  f('FY2021', { flujo_operativo: 1437, capex: 96, adquisiciones: 246, recompras: 552, emision_acciones: 114 }),
  f('FY2022', { flujo_operativo: 1531, capex: 67, adquisiciones: 1250, recompras: 1079, emision_acciones: 114 }),
  f('FY2023', { flujo_operativo: 2071, capex: 46, adquisiciones: 96, recompras: 1101, emision_acciones: 124 }),
  f('FY2024', { flujo_operativo: 1313, capex: 61, adquisiciones: 70, recompras: 795, emision_acciones: 130 }),
  f('FY2025', { flujo_operativo: 1607, capex: 102, adquisiciones: 825, recompras: 852, emision_acciones: 121 }),
  f('FY2026', { flujo_operativo: 2452, capex: 76, adquisiciones: 0, recompras: 1402, emision_acciones: 137 }),
];

const seg = (nombre, descripcion, v) => ({ nombre, descripcion, tipo_resultado: null, historico: ['FY2022', 'FY2023', 'FY2024', 'FY2025', 'FY2026'].map((p, i) => ({ periodo: p, ingresos: v[i], resultado: null })) });

const A = {
  _estado: 'Completo. Cuentas del XBRL de la SEC comprobadas con el 10-K FY2026, el 10-Q del 2T FY27 y las notas de resultados anuales FY2020-FY2026.',
  negocio: {
    segmentos: [
      seg('AECO (arquitectura, ingeniería, construcción y operaciones)', 'Colección AEC (Revit, Civil 3D), Autodesk Construction Cloud, Forma y operaciones', [1959.9, 2278, 2580, 2937, 3583]),
      seg('AutoCAD y AutoCAD LT', 'CAD 2D/3D generalista', [1253.0, 1387, 1462, 1572, 1787]),
      seg('Fabricación (MFG)', 'Colección PD&M, Inventor, Fusion', [876.0, 978, 1063, 1189, 1379]),
      seg('Medios y entretenimiento (M&E)', 'Maya, 3ds Max, Flow', [258.9, 291, 295, 315, 332]),
      seg('Otros', 'Servicios y otros', [38.6, 71, 97, 118, 125]),
    ],
    geografias: [
      { nombre: 'EE. UU.', peso_pct: 35.6 }, { nombre: 'Resto de América', peso_pct: 8.5 }, { nombre: 'EMEA', peso_pct: 38.8 }, { nombre: 'Asia-Pacífico', peso_pct: 17.1 },
    ],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Ingresos recurrentes / ingresos', valor_anterior: '97 % (FY2025)', valor_actual: '97 % (FY2026)', variacion: '0 pp', comentario: 'Mantenimiento, suscripciones y parte de «otros» [1].' },
      { kpi: 'Retención neta de ingresos (NR3, divisa constante)', valor_anterior: 'Algo por encima del 100-110 % (jul-25)', valor_actual: 'Cerca del techo del 100-110 % (jul-26)', variacion: 'Ligera bajada', comentario: 'La empresa solo da el rango [4].' },
      { kpi: 'Billings (facturación)', valor_anterior: '5.980 M USD (FY2025, estim. por diferencia)', valor_actual: '7.771 M USD (FY2026, +30 %)', variacion: '+30 %', comentario: 'Inflada por el nuevo modelo de transacción y el paso a facturación anual [3]; 2T FY27: +10 % [2].' },
      { kpi: 'Obligaciones de ejecución pendientes (RPO)', valor_anterior: '7.282 M USD (jul-25, estim. por diferencia)', valor_actual: '7.433 M USD (jul-26, +2 %)', variacion: '+2 %', comentario: 'Frenadas por la retirada de descuentos plurianuales; la RPO corriente crece un 12 % [2].' },
      { kpi: 'Ventas a través de TD Synnex', valor_anterior: '33 % (FY2025)', valor_actual: '14 % (FY2026)', variacion: '−19 pp', comentario: 'El nuevo modelo de transacción factura directamente al cliente [1].' },
      { kpi: 'Empleados', valor_anterior: '≈15.300 (ene-25)', valor_actual: '≈14.300 (ene-26)', variacion: '−7 %', comentario: 'Dos reestructuraciones de ventas en 2025 y 2026 [1, 13].' },
    ],
    confianza: 'Alta',
  },
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jul-26', fecha_fin: '2026-07-31', ingresos: 7790, ebitda: 2242, ebit: 2041, beneficio_neto: 1642, bpa: 7.72, dpa: 0, dpa_extraordinario: 0, fcf: 2839, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 134 },
    cambios_perimetro: [{ periodo: 'FY2025', descripcion: 'Compra de PIX4D, Payapps y otras por 825 M USD en caja; pequeñas frente a unas ventas de 6.131 M.' }],
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '3T FY25', ingresos: 1570, crecimiento_pct: 11.3, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 1.27, vs_consenso: null },
      { periodo: '4T FY25', ingresos: 1639, crecimiento_pct: 11.6, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 1.40, vs_consenso: null },
      { periodo: '1T FY26', ingresos: 1633, crecimiento_pct: 15.2, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.70, vs_consenso: null },
      { periodo: '2T FY26', ingresos: 1763, crecimiento_pct: 17.1, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 1.46, vs_consenso: null },
      { periodo: '3T FY26', ingresos: 1853, crecimiento_pct: 18.0, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 1.60, vs_consenso: null },
      { periodo: '4T FY26', ingresos: 1957, crecimiento_pct: 19.4, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 1.48, vs_consenso: null },
      { periodo: '1T FY27', ingresos: 1934, crecimiento_pct: 18.4, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 2.32, vs_consenso: null },
      { periodo: '2T FY27', ingresos: 2046, crecimiento_pct: 16.1, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 2.33, vs_consenso: 'Superior' },
    ],
    confianza: 'Alta',
  },
  balance: {
    historico,
    vencimientos: [{ anio: 'FY2028', importe: 1500 }, { anio: 'FY2030', importe: 500 }, { anio: 'FY2031', importe: 500 }, { anio: 'FY2032', importe: 1000 }, { anio: 'FY2034', importe: 500 }, { anio: 'FY2036', importe: 500 }],
    liquidez: 'Caja e inversiones líquidas de 4.357 M USD a 31-jul-26 antes de pagar MaintainX (≈3.530 M el 3-ago) [4]; línea de crédito no dispuesta de 2.000 M USD que respalda un programa de pagarés de hasta 2.000 M (1.000 M dispuestos) [4].',
    rating: null,
    coste_deuda_pct: 3.3,
    vida_media_anios: 4.6,
    confianza: 'Alta',
  },
  flujos: { historico: flujos, confianza: 'Alta' },
  calidad: { auditor: 'Ernst & Young LLP', anios_auditor: null, opinion: 'Favorable', confianza: 'Media' },
  fuentes: fA,
  huecos: [
    { seccion: 'calidad', campo: 'anios_auditor', tipo: 'Complemento', intentos: '1) 10-K FY2026, informe del auditor («We have served as the Company\'s auditor since…»: no extraído); 2) proxy 2026, propuesta de ratificación; 3) búsqueda en el texto de los documentos descargados', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Geschäftsbericht 2025 (Cambashi: mercado de software de diseño 9.400 M EUR y de construcción 6.600 M EUR en 2025)', editor: 'Nemetschek SE', tipo: 'Primaria', fecha: '2026-03-19', url: 'https://ir.nemetschek.com/media/document/31f34112-03e9-4e86-9892-457de2987552/assets/Nemetschek-Geschaeftsbericht-2025_de_locked.pdf' },
  { id: 2, titulo: 'Building Information Modeling Market worth $15.42 billion by 2030', editor: 'MarketsandMarkets', tipo: 'Sectorial', fecha: '2025-08-25', url: 'https://www.marketsandmarkets.com/PressReleases/building-information-modeling.asp' },
  { id: 3, titulo: 'Autodesk, Form 10-K FY2026 (negocio, canales, competencia, riesgos)', editor: 'Autodesk / SEC EDGAR', tipo: 'Primaria', fecha: '2026-03-03', url: `${EDGAR}/000076939726000015/adsk-20260131.htm` },
  { id: 4, titulo: 'Bentley Systems, Form 10-K 2025', editor: 'Bentley Systems / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-26', url: 'https://www.sec.gov/Archives/edgar/data/1031308/000103130826000007/' },
  { id: 5, titulo: 'Trimble, Form 10-K 2025', editor: 'Trimble / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-25', url: 'https://www.sec.gov/Archives/edgar/data/864749/000086474926000015/' },
  { id: 6, titulo: 'PTC, Form 10-K del ejercicio cerrado el 30-sep-2025', editor: 'PTC / SEC EDGAR', tipo: 'Primaria', fecha: '2025-11-21', url: 'https://www.sec.gov/Archives/edgar/data/857005/000119312525291326/' },
  { id: 7, titulo: 'Dassault Systèmes, resultados del 4T25 y del ejercicio 2025', editor: 'Dassault Systèmes', tipo: 'Primaria', fecha: '2026-02-11', url: 'https://www.3ds.com/assets/invest/2026-02/dassault-systemes-25q4-earnings_pr_va.pdf' },
  { id: 8, titulo: 'Hexagon, Year-End Report 2025', editor: 'Hexagon AB', tipo: 'Primaria', fecha: '2026-01-30', url: 'https://mb.cision.com/Main/387/4300053/3907199.pdf' },
  { id: 9, titulo: 'Procore Technologies, Form 10-K 2025', editor: 'Procore / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-24', url: 'https://www.sec.gov/Archives/edgar/data/1611052/000162828026011055/' },
  { id: 10, titulo: 'Last Week in ConTech (cuota de Revit en Reino Unido del 27 % al 49 % en seis años; ArchiCAD 22 %)', editor: 'ConTech Roundup', tipo: 'Sectorial', fecha: '2026-02-23', url: 'https://contechroundup.substack.com/p/last-week-in-contech-23-february' },
  { id: 11, titulo: 'Autodesk: AI margin pressure (riesgo de menos puestos con la IA)', editor: 'Pitchgrade', tipo: 'Analistas', fecha: '2026-03', url: 'https://pitchgrade.com/research/autodesk-ai-margin-pressure' },
  { id: 12, titulo: 'Autodesk wants you to pay for outcomes, not just access', editor: 'Schnitger Corporation', tipo: 'Sectorial', fecha: '2025-10-08', url: 'https://schnitgercorp.com/2025/10/08/autodesk-wants-you-to-pay-for-outcomes-not-just-access/' },
  { id: 13, titulo: 'Autodesk to acquire MaintainX (nota de prensa, anexo 99.1 del 8-K)', editor: 'Autodesk / SEC EDGAR', tipo: 'Primaria', fecha: '2026-05-28', url: `${EDGAR}/000121390026062125/ea029248301ex99-1.htm` },
  { id: 14, titulo: 'Schneider Electric to buy US software maker PTC for $22.6bn in cash', editor: 'The Next Web', tipo: 'Prensa', fecha: '2026-10-05', url: 'https://thenextweb.com/news/schneider-electric-ptc-22-6bn' },
  { id: 15, titulo: 'Transcript: Autodesk (ADSK) Q2 FY27 earnings call', editor: 'The Singju Post', tipo: 'Prensa', fecha: '2026-08-27', url: 'https://singjupost.com/transcript-autodesk-adsk-q2-fy27-earnings-call-conference/' },
  { id: 16, titulo: 'Tipos de cambio de referencia del euro (14-oct-2026: 1,1195 USD/EUR)', editor: 'Banco Central Europeo', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml' },
  { id: 17, titulo: 'Sustainalytics ESG Risk Rating: Autodesk Inc. (15,1, riesgo bajo)', editor: 'Morningstar Sustainalytics', tipo: 'Datos de mercado', fecha: '2026', url: 'https://sustainalytics.com/esg-rating/autodesk-inc/1007998148' },
];
const k = (x) => Math.round(x * EURUSD);
const B = {
  _estado: 'Completo. Tamaño de mercado y competidores tomados de las fuentes primarias que usó el análisis de Nemetschek del 10-oct-2026 (repositorio), con los ingresos en EUR pasados a USD al tipo del BCE del 14-oct.',
  historia: {
    resumen: 'Autodesk nació en 1982 con AutoCAD, el primer CAD para ordenador personal, y se convirtió en el estándar del dibujo técnico. Con Revit (comprado en 2002) dominó el BIM en edificación. Entre 2016 y 2020 pasó de licencias perpetuas a suscripción, con años de pérdidas, y luego compró sus piezas de construcción (PlanGrid, BuildingConnected en 2018-2019). Desde 2024 cambió el modo de vender: el nuevo modelo de transacción factura directamente al cliente en vez de a través de distribuidores, y la facturación plurianual por adelantado pasó a anual [3]. En 2024 una investigación interna sobre sus prácticas de caja libre y margen non-GAAP retrasó el 10-K y cambió al director financiero; en 2025 el activista Starboard pactó dos consejeros [3]. En 2026 compró MaintainX por ≈3.600 M USD para entrar en operación y mantenimiento [13].',
    hitos: [
      { anio: '1982', hito: 'Fundación y lanzamiento de AutoCAD.' },
      { anio: '2002', hito: 'Compra de Revit Technology: base del liderazgo en BIM.' },
      { anio: '2016', hito: 'Fin de la venta de licencias perpetuas de casi todos los productos: paso a suscripción [3].' },
      { anio: '2018', hito: 'Compra de PlanGrid (875 M USD) y BuildingConnected: nace Autodesk Construction Cloud.' },
      { anio: '2024', hito: 'Investigación del comité de auditoría sobre la caja libre y el margen non-GAAP; la SEC y la fiscalía la cerraron sin acciones en agosto de 2025 [3].' },
      { anio: '2024-2025', hito: 'Nuevo modelo de transacción: las ventas por TD Synnex bajan del 39 % (FY2024) al 14 % (FY2026) [3].' },
      { anio: '2025', hito: 'Acuerdo de cooperación con Starboard (23-abr-2025): entran en el consejo Jeff Epstein y Christie Simons [3].' },
      { anio: '2026', hito: 'Compra de MaintainX por ≈3.600 M USD en efectivo, cerrada el 3-ago-2026 [13].' },
    ],
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'Autodesk vende programas de diseño y de gestión de proyectos para la edificación, la ingeniería civil, la construcción, la fabricación industrial y los efectos visuales. Sus productos clave son AutoCAD (CAD generalista, 1.787 M USD en FY2026), Revit y Civil 3D (dentro de la colección AEC), Autodesk Construction Cloud, Inventor y Fusion (fabricación) y Maya y 3ds Max (medios) [3]. Los clientes van desde un autónomo con AutoCAD LT hasta las mayores constructoras e ingenierías con contratos corporativos (EBA). Vende por su tienda en línea, directamente a cuentas grandes y a través de revendedores, que con el nuevo modelo de transacción presupuestan pero no facturan [3]. El 44 % de los ingresos viene de América, el 39 % de EMEA y el 17 % de Asia-Pacífico.',
    clientes: 'Base muy atomizada: ningún cliente final pesa de forma significativa; el único intermediario relevante, el distribuidor TD Synnex, ha bajado del 39 % de las ventas en FY2024 al 14 % en FY2026 por el nuevo modelo de transacción [3]. La retención neta (NR3) está en el rango del 100-110 % [3], con renovaciones «fuertes» según la dirección, que no da la cifra [15]. El poder de precios es demostrable: Autodesk ha retirado descuentos plurianuales y subido precios de forma sostenida, con ingresos que crecen por encima del volumen de puestos; la RPO crece solo un 2 % por la retirada de esos descuentos [3]. El riesgo es el número de puestos: Revit y AutoCAD se cobran por usuario nombrado (≈3.005 USD al año Revit) [11].',
    confianza: 'Alta',
  },
  sector: {
    definicion: 'El mercado relevante es el software de diseño, ingeniería y construcción (CAD, BIM y gestión de obra), que es donde está el 75 % de las ventas de Autodesk (AECO más AutoCAD). Se usa la medición de Cambashi que cita Nemetschek: 9.400 M EUR de software de diseño y planificación AEC y 6.600 M EUR de construcción en 2025 [1]. MarketsandMarkets mide solo las herramientas BIM: 9.030 M USD en 2025 y 15.420 M USD en 2030 [2]. La fabricación (CAD mecánico y PLM, donde están Dassault, PTC y Siemens) y los medios son mercados distintos y no se incluyen.',
    tamano: '≈16.000 M EUR en 2025 (≈17.900 M USD; diseño 9.400 M y construcción 6.600 M EUR, Cambashi) [1, 16]; BIM en sentido estricto: 9.030 M USD en 2025 [2].',
    unidad_serie: 'millones de EUR',
    serie: [{ anio: '2022', tamano: 12300 }, { anio: '2024', tamano: 14500 }, { anio: '2025', tamano: 16000 }, { anio: '2026e', tamano: 17576 }, { anio: '2027e', tamano: 19308 }, { anio: '2028e', tamano: 21210 }, { anio: '2029e', tamano: 23300 }],
    tcac_historico_pct: 9.2, tcac_previsto_pct: 9.9, cr5_pct: null, estructura: 'Moderadamente concentrada',
    drivers: [
      { driver: 'BIM obligatorio en obra pública', efecto: '+', horizonte: 'Estructural', evidencia: 'En Reino Unido Revit pasó del 27 % al 49 % de cuota en seis años; un mandato BIM funciona como un mandato Revit [10].' },
      { driver: 'Digitalización de la obra', efecto: '+', horizonte: 'Estructural', evidencia: 'Cambashi prevé un 11,4 % anual para el software de construcción en 2025-2029 frente al 8,6 % del de diseño [1]; la construcción de Autodesk crece «por encima del 20 %» [15].' },
      { driver: 'Precio y paso a facturación directa', efecto: '+', horizonte: 'Estructural', evidencia: 'El nuevo modelo de transacción y la retirada de descuentos plurianuales suben el precio efectivo [3].' },
      { driver: 'IA generativa y agentes', efecto: '+/−', horizonte: 'Estructural', evidencia: 'Menos puestos por proyecto si la IA hace el trabajo de varios delineantes [11]; Autodesk prepara cobros por consumo y por uso de máquinas (API) [12, 15].' },
      { driver: 'Ciclo de la construcción y de la industria', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'En FY2010 las ventas cayeron un 26 % con licencias perpetuas; con suscripción la caída de 2020 fue nula (+16 % en FY2021) [3].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Oligopolio por nichos: Autodesk en BIM de edificación y CAD 2D, Bentley en infraestructura, Nemetschek en Europa, Dassault y PTC en CAD mecánico [1, 4, 7].' },
      { fuerza: 'Poder de los clientes', intensidad: 2, justificacion: 'Clientes atomizados; solo los EBA de grandes cuentas negocian, y el formato de archivo (DWG, RVT) ata [3].' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Coste de nube y de modelos de IA que comprimirá algo el margen bruto, según la dirección [15].' },
      { fuerza: 'Amenaza de entrada', intensidad: 3, justificacion: 'Nuevos actores nativos de IA y en la nube (generación de planos, «texto a CAD»); la barrera es el dato y los estándares, no el código [11].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 4, justificacion: 'La IA puede reducir puestos y abaratar alternativas; es el centro del debate del mercado desde febrero de 2026 [11].' },
    ],
    ciclo: { posicion: 'Madurez del ciclo', comentario: 'Con suscripción, el ciclo pesa poco: Autodesk creció un 16 % en FY2021 (pandemia) y un 14 % en FY2023 pese a la subida de tipos [3]. Lo que mueve hoy al sector es el múltiplo: el miedo a la IA ha desrateado todo el software de diseño en 2026 (Autodesk −24 % en un año frente al +17 % del S&P 500). Indicadores: billings, RPO corriente y NR3 trimestrales.' },
    regulacion: 'No hay regulación que limite precios. Afectan los mandatos BIM en obra pública (Reino Unido, España, Alemania) [10], las normas de exportación de EE. UU. (salida de Rusia) [3], la protección de datos y la Ley de IA europea en los modelos que entrenen con datos de clientes. La reforma fiscal de EE. UU. de 2025 cambió la deducción de la I+D, lo que movió los impuestos diferidos de FY2026 [3].',
    tendencias: 'Tres tendencias: (1) paso de herramientas de escritorio a plataformas de datos en la nube (Forma, Fusion, Autodesk Construction Cloud), donde Autodesk quiere cobrar por proyecto y por consumo y no solo por puesto [12]; (2) la IA, que automatiza tareas de dibujo y documentación y amenaza el cobro por usuario, pero da valor al que tiene los datos del proyecto [11, 15]; (3) concentración: Schneider compra PTC por 23.700 M USD [14], Nemetschek compra HCSS y Autodesk compra MaintainX [13].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 20.0,
    posicion: 'Líder mundial en software de diseño y construcción AEC: estimación propia de ≈20 % del mercado de Cambashi (3.583 M USD de AECO sobre ≈17.900 M USD) [1, 3]. En CAD mecánico es el cuarto tras Dassault, Siemens y PTC.',
    competidores: [
      { nombre: 'Dassault Systèmes', pais: 'Francia', ticker: 'DSY', ingresos: k(6235.8), cuota_pct: null, margen_ebit_pct: 21.7, comentario: 'CATIA y SolidWorks; líder en CAD mecánico y PLM, poco en edificación [7].' },
      { nombre: 'Hexagon', pais: 'Suecia', ticker: 'HEXA B', ingresos: k(5424.6), cuota_pct: null, margen_ebit_pct: 17.0, comentario: 'Medición y software industrial; separa su software de ingeniería (Octave) [8].' },
      { nombre: 'Trimble', pais: 'EE. UU.', ticker: 'TRMB', ingresos: 3587, cuota_pct: null, margen_ebit_pct: 16.5, comentario: 'Tekla y Viewpoint en obra; mezcla hardware y software [5].' },
      { nombre: 'PTC', pais: 'EE. UU.', ticker: 'PTC', ingresos: 2739, cuota_pct: null, margen_ebit_pct: 35.9, comentario: 'Creo y Windchill; en proceso de compra por Schneider Electric a 205 USD por acción [6, 14].' },
      { nombre: 'Bentley Systems', pais: 'EE. UU.', ticker: 'BSY', ingresos: 1502, cuota_pct: null, margen_ebit_pct: 24.1, comentario: 'Infraestructura (carreteras, energía, agua) [4].' },
      { nombre: 'Nemetschek', pais: 'Alemania', ticker: 'NEM', ingresos: k(1191.2), cuota_pct: 6.3, margen_ebit_pct: null, comentario: 'ArchiCAD, Allplan, Bluebeam; principal rival de Revit en Europa [1].' },
      { nombre: 'Procore', pais: 'EE. UU.', ticker: 'PCOR', ingresos: 1323, cuota_pct: null, margen_ebit_pct: -9.4, comentario: 'Gestión de obra en la nube, rival de Autodesk Construction Cloud [9].' },
    ],
    foso: {
      veredicto: 'Amplio', tendencia: 'Se estrecha',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 4, evidencia: 'DWG y RVT son los formatos de intercambio de la industria: un mandato BIM es en la práctica un mandato Revit [10].' },
        { fuente: 'Costes de cambio', puntuacion: 5, evidencia: 'Bibliotecas, plantillas, formación y archivos de décadas; NR3 en el 100-110 % y ingresos recurrentes del 97 % [3].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 4, evidencia: 'AutoCAD y Revit son estándares de formación en escuelas de arquitectura e ingeniería [3].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Margen operativo non-GAAP del 38 % en FY2026 frente al 24 % de Bentley y el 22 % de Dassault (contable) [3, 4, 7].' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: '7.206 M USD de ventas, más que Bentley, Nemetschek y Procore juntos [3, 4, 9].' },
      ],
    },
    amenazas: 'La IA es la amenaza principal: puede reducir el número de puestos por proyecto (se cobra por usuario) y dar entrada a herramientas nativas que generen planos o modelos a partir de texto [11]. Su probabilidad de dañar el cobro por puesto en 3-5 años es media; la de sustituir el formato y los datos de Revit, baja. Segunda amenaza: Nemetschek y Bentley en Europa e infraestructura, y Procore en obra. Tercera: la ejecución de las reestructuraciones comerciales (Europa occidental va más lenta) [15].',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [{ agencia: 'Sustainalytics', calificacion: 'Riesgo ESG 15,1 (bajo)', fecha: '2026' }],
    materialidad: 'En software, lo material es el capital humano (dos reestructuraciones de ventas en dos años, 2.350 puestos) [3], la seguridad de los datos de los clientes en la nube y el gobierno de la IA (uso de datos de clientes para entrenar modelos). Las emisiones son pequeñas (oficinas y nube de terceros).',
    controversias: 'La investigación interna de 2024 sobre las prácticas de caja libre y margen non-GAAP llevó a una demanda colectiva, desestimada con posibilidad de enmendar en julio de 2025, y a una demanda derivativa aún abierta; la SEC y la fiscalía cerraron sus expedientes en agosto de 2025 sin acciones [3].',
    confianza: 'Media',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'sector', campo: 'cr5_pct', tipo: 'Complemento', intentos: '1) Informe anual de Nemetschek (Cambashi): solo tamaño; 2) MarketsandMarkets (nota de prensa, sin cuotas); 3) cálculo con los ingresos de los cinco primeros: perímetros distintos (fabricación y hardware mezclados)', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Autodesk, Proxy Statement 2026 (DEF 14A)', editor: 'Autodesk / SEC EDGAR', tipo: 'Primaria', fecha: '2026-05-06', url: `${EDGAR}/000076939726000030/adsk-20260429.htm` },
  { id: 2, titulo: 'Form 8-K: resultados de la junta del 17-jun-2026 (votaciones)', editor: 'Autodesk / SEC EDGAR', tipo: 'Primaria', fecha: '2026-06-18', url: `${EDGAR}/000076939726000050/adsk-20260617.htm` },
  { id: 3, titulo: 'Form 4 de directivos y consejeros (oct-2025 a oct-2026), agregados con herramientas/form4.mjs', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000769397&type=4' },
  { id: 4, titulo: 'Autodesk, Form 10-K FY2026 (litigios, investigación interna, acuerdo con Starboard)', editor: 'Autodesk / SEC EDGAR', tipo: 'Primaria', fecha: '2026-03-03', url: `${EDGAR}/000076939726000015/adsk-20260131.htm` },
  { id: 5, titulo: 'Form 8-K: nombramiento de Omar Abbosh y salida de Stephen Milligan del consejo', editor: 'Autodesk / SEC EDGAR', tipo: 'Primaria', fecha: '2026-04-24', url: `${EDGAR}/000076939726000024/autodeskannouncesnominatio.htm` },
  { id: 6, titulo: 'Autodesk issues statement in response to comments by Starboard Value', editor: 'Finansavisen (Business Wire)', tipo: 'Prensa', fecha: '2025-03-26', url: 'https://www.finansavisen.no/borsmeldinger/2025/03/26/58bf2c75-46b5-4963-8ba8-2ca65cfec984/autodesk-issues-statement-in-response-to-comments-by-starboard-value' },
  { id: 7, titulo: 'Notas de resultados del 4T FY2022, FY2023, FY2024 y FY2025 (guías anuales)', editor: 'Autodesk / SEC EDGAR', tipo: 'Primaria', fecha: '2025-02-27', url: `${EDGAR}/000076939725000013/` },
  { id: 8, titulo: 'Autodesk announces fiscal 2027 second quarter results (guía elevada)', editor: 'Autodesk / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-27', url: `${EDGAR}/000076939726000059/q227pressrelease.htm` },
  { id: 9, titulo: 'Transcript: Autodesk (ADSK) Q2 FY27 earnings call', editor: 'The Singju Post', tipo: 'Prensa', fecha: '2026-08-27', url: 'https://singjupost.com/transcript-autodesk-adsk-q2-fy27-earnings-call-conference/' },
];
const cons = (nombre, cargo, tipo, desde, comisiones) => ({ nombre, cargo, tipo, desde, comisiones });
const C = {
  _estado: 'Completo con el proxy 2026, el 8-K de la junta y los Form 4.',
  directivos: {
    equipo: [
      { nombre: 'Andrew Anagnost', cargo: 'Presidente ejecutivo de la compañía (CEO)', desde: '2017', participacion_pct: 0.06, trayectoria: 'En Autodesk desde 1997; dirigió la transición a suscripción (ventas de 2.031 M USD en FY2017 a 7.206 M en FY2026, margen non-GAAP del 38 %) [1]. Starboard pidió su salida en 2024-2025 [6].' },
      { nombre: 'Janesh Moorjani', cargo: 'Director financiero (EVP, CFO)', desde: '2024', participacion_pct: 0.01, trayectoria: 'Llegó en diciembre de 2024 desde Elastic tras la investigación sobre las prácticas de caja libre; compró 2.500 acciones a 197,67 USD en junio de 2026 [1, 3].' },
      { nombre: 'Steven M. Blum', cargo: 'Director de operaciones (COO)', desde: '2017', participacion_pct: 0.02, trayectoria: 'Responsable de ventas y del nuevo modelo de transacción [1].' },
      { nombre: 'Ruth Ann Keene', cargo: 'EVP, Corporate Affairs, Chief Legal Officer', desde: '2021', participacion_pct: 0.04, trayectoria: 'Jefa de los servicios jurídicos y de asuntos corporativos [1].' },
      { nombre: 'Stacy J. Smith', cargo: 'Presidente no ejecutivo del consejo', desde: '2011', participacion_pct: 0.01, trayectoria: 'Ex director financiero de Intel; compró 3.435 acciones por 0,79 M USD en mayo de 2026 [1, 3].' },
    ],
    historial_guidance: [
      { anio: 'FY2023', guia: 'Ingresos de 5.020-5.120 M USD (feb-22)', real: '5.005 M USD', cumplida: 'No' },
      { anio: 'FY2024', guia: 'Ingresos de 5.355-5.455 M USD (feb-23)', real: '5.497 M USD', cumplida: 'Sí' },
      { anio: 'FY2025', guia: 'Ingresos de 5.990-6.090 M USD (feb-24)', real: '6.131 M USD', cumplida: 'Sí' },
      { anio: 'FY2026', guia: 'Ingresos de 6.895-6.965 M USD (feb-25)', real: '7.206 M USD', cumplida: 'Sí' },
      { anio: 'FY2027', guia: 'Ingresos de 8.100-8.170 M USD (feb-26)', real: 'Elevada a 8.295-8.345 M USD en agosto (incluye MaintainX)', cumplida: 'Parcial' },
    ],
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      cons('Stacy J. Smith', 'Presidente no ejecutivo', 'Independiente', '2011', 'Gobierno y nombramientos'),
      cons('Andrew Anagnost', 'Consejero delegado', 'Ejecutivo', '2017', '—'),
      cons('Karen Blasing', 'Consejera', 'Independiente', '2018', 'Remuneración (presidenta)'),
      cons('John T. Cahill', 'Consejero', 'Independiente', '2024', 'Auditoría (presidente)'),
      cons('Jeff Epstein', 'Consejero (acuerdo con Starboard)', 'Independiente', '2025', 'Auditoría'),
      cons('Ayanna Howard', 'Consejera', 'Independiente', '2019', 'Remuneración'),
      cons('Blake Irving', 'Consejero', 'Independiente', '2019', 'Gobierno y nombramientos (presidente)'),
      cons('Ram R. Krishnan', 'Consejero', 'Independiente', '2024', 'Remuneración'),
      cons('Rami Rahim', 'Consejero', 'Independiente', '2022', 'Gobierno y nombramientos'),
      cons('Christie Simons', 'Consejera (acuerdo con Starboard)', 'Independiente', '2025', 'Auditoría'),
      cons('Omar Abbosh', 'Consejero', 'Independiente', '2026', 'n.d.'),
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: true, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 88.1, voto_remuneracion_contra_pct: 8.3, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: 'FY2026', total: 30.09, fijo: 1.04, variable_corto: 1.72, variable_largo: 27.24, ratio_salario_medio: 204 },
    remuneracion: 'El 96 % de la remuneración objetivo del consejero delegado es variable [1]. El variable a largo plazo son unidades por objetivos (PSU) que desde FY2026 miden el resultado de explotación non-GAAP menos los pagos en acciones y el rendimiento relativo para el accionista a tres años (rTSR), en vez de la caja libre, que algunos accionistas cuestionaron tras la investigación [1]. Es una buena métrica: castiga la dilución. El total de Anagnost subió de 20,6 M USD (FY2024) a 30,1 M (FY2026), 204 veces el empleado mediano [1]. Hay cláusula de recuperación (clawback). La votación consultiva fue del 88,1 % a favor en 2025 y del 91,3 % en 2026 (8,3 % en contra) [1, 2].',
    accionistas: [
      { nombre: 'The Vanguard Group', pct: 10.1, tipo: 'Gestora pasiva', variacion: 'n.d.' },
      { nombre: 'BlackRock', pct: 9.1, tipo: 'Gestora', variacion: 'n.d.' },
      { nombre: 'Consejeros y directivos (15 personas)', pct: 0.14, tipo: 'Insiders', variacion: 'Compras en mercado en mayo-junio de 2026' },
    ],
    insiders: [
      { fecha: '2026-05-29', persona: 'Stacy J. Smith (presidente)', operacion: 'Compra', acciones: 3435, importe: 0.79 },
      { fecha: '2026-06-15', persona: 'Janesh Moorjani (CFO)', operacion: 'Compra', acciones: 2500, importe: 0.49 },
      { fecha: '2026-06-16', persona: 'Andrew Anagnost (CEO)', operacion: 'Compra', acciones: 2460, importe: 0.50 },
      { fecha: '2026-06-23', persona: 'John T. Cahill (consejero)', operacion: 'Compra', acciones: 2000, importe: 0.38 },
    ],
    control_y_defensas: 'Sin accionista de control: Vanguard (10,1 %) y BlackRock (9,1 %) son gestoras [1]. Una acción, un voto; consejo de 11 con 10 independientes y presidente no ejecutivo separado del consejero delegado [1]. Starboard (≈0,5 % del capital) pactó en abril de 2025 dos consejeros y retiró su candidatura [4, 6]. En 2026 la junta aprobó limitar la responsabilidad de los directivos (exculpación de Delaware, 81 % a favor) y rechazó por poco (47,6 % a favor) una propuesta para facilitar juntas extraordinarias [2].',
    alertas: [
      'Investigación interna de 2024 sobre las prácticas de caja libre y margen non-GAAP: cambió el director financiero; la SEC y la fiscalía cerraron sin acciones en agosto de 2025; queda una demanda derivativa [4].',
      'Activismo: Starboard pidió en 2024-2025 el relevo del consejero delegado; acuerdo de cooperación en abril de 2025 [4, 6].',
      'Remuneración del consejero delegado al alza (+46 % en dos años) con la acción por debajo del S&P 500 [1].',
    ],
    confianza: 'Alta',
  },
  fuentes: fC,
  huecos: [],
};

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de ADSK, SPY e IGV (herramientas/bolsa.mjs), hasta el 14-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/ADSK/history' },
  { id: 2, titulo: 'Autodesk, Inc.: Financial data, forecasts, estimates (consenso FY2027-FY2029)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://www.marketscreener.com/quote/stock/AUTODESK-INC-40246776/finances/' },
  { id: 3, titulo: 'Daily Treasury Par Yield Curve Rates (10 años: 5,19 % el 14-oct-2026)', editor: 'U.S. Department of the Treasury', tipo: 'Primaria', fecha: '2026-10-14', url: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve&field_tdr_date_value=2026' },
  { id: 4, titulo: 'Implied ERP by month (ERPbymonth.xlsx): 4,20 % en octubre de 2026', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 5, titulo: 'Análisis de Cadence Design Systems del 14-oct-2026: comparables Synopsys y Cadence (cifras de MarketScreener y de las cuentas a 9-oct)', editor: 'Repositorio (informes/cadence-2026-10-14)', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/CADENCE-DESIGN-SYSTEMS-I-4842/finances/' },
  { id: 6, titulo: 'Análisis de Nemetschek del 10-oct-2026: comparables Trimble, Hexagon y Nemetschek (MarketScreener, a 9-oct)', editor: 'Repositorio (informes/nemetschek-2026-10-10)', tipo: 'Datos de mercado', fecha: '2026-10-10', url: 'https://www.marketscreener.com/quote/stock/NEMETSCHEK-SE-436400/finances/' },
  { id: 7, titulo: 'Análisis de Dassault Systèmes del 7-oct-2026 (múltiplos propios a 6-oct)', editor: 'Repositorio (informes/dassault-2026-10-07)', tipo: 'Datos de mercado', fecha: '2026-10-07', url: 'https://www.marketscreener.com/quote/stock/DASSAULT-SYSTEMES-SE-4624/finances/' },
  { id: 8, titulo: 'Ficha sectorial de software de aplicaciones (comparables a 10-14 oct, Bentley)', editor: 'Repositorio (sectores/software-2026-10-14)', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/BENTLEY-SYSTEMS-INCORPORA-114855936/finances/' },
  { id: 9, titulo: 'Cotizaciones de cierre de los comparables del 13 y 14-oct-2026 (API de gráficos)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/SNPS/history' },
  { id: 10, titulo: 'Schneider Electric to buy US software maker PTC for $22.6bn in cash', editor: 'The Next Web', tipo: 'Prensa', fecha: '2026-10-05', url: 'https://thenextweb.com/news/schneider-electric-ptc-22-6bn' },
  { id: 11, titulo: 'Schneider Electric to buy PTC for $22.6 billion (valor con deuda 23.700 M USD; 21x EBITA ajustado 2027e)', editor: 'The Tech Capital', tipo: 'Prensa', fecha: '2026-10-05', url: 'https://thetechcapital.com/schneider-electric-buy-ptc-22-6-billion-industrial-ai/' },
  { id: 12, titulo: 'Form 8-K: acuerdo de fusión para comprar MaintainX por ≈3.575 M USD', editor: 'Autodesk / SEC EDGAR', tipo: 'Primaria', fecha: '2026-05-28', url: `${EDGAR}/000121390026062125/ea0292483-8k_autodesk.htm` },
  { id: 13, titulo: 'Nemetschek SE übernimmt HCSS (nota de prensa)', editor: 'Nemetschek SE (EQS News)', tipo: 'Primaria', fecha: '2026-04-13', url: 'https://ir.nemetschek.com/nachrichten/nemetschek-se-uebernimmt-hcss-und-steigt-zum-naechsten-globalen-marktfuehrer-im-markt-fuer-bausoftware-auf/d0299905-a853-4952-bf37-68df4f0a53ef' },
  { id: 14, titulo: 'Nemetschek to Buy Thoma Bravo\'s HCSS in €2 Billion-Plus Deal', editor: 'Bloomberg Law', tipo: 'Prensa', fecha: '2026-04-14', url: 'https://news.bloomberglaw.com/private-equity/nemetschek-strikes-deal-for-thomas-software-firm-hcss' },
  { id: 15, titulo: 'Nemetschek Group erwirbt GoCanvas (ad hoc)', editor: 'Nemetschek SE', tipo: 'Primaria', fecha: '2024-06-06', url: 'https://ir.nemetschek.com/nachrichten/nemetschek-se-erwirbt-gocanvas-um-die-digitalisierung-in-der-bauindustrie-weiter-zu-beschleunigen/a779c764-bbec-4d8a-beea-dbec6fab68d2' },
  { id: 16, titulo: 'Synopsys to Acquire Ansys (8-K, anexo 99.1)', editor: 'Synopsys / SEC EDGAR', tipo: 'Primaria', fecha: '2024-01-16', url: 'https://www.sec.gov/Archives/edgar/data/883241/000119312524008120/d720113dex991.htm' },
  { id: 17, titulo: 'Renesas to Acquire PCB Design Software Leader Altium (ASX)', editor: 'Altium / Renesas', tipo: 'Primaria', fecha: '2024-02-15', url: 'https://announcements.asx.com.au/asxpdf/20240215/pdf/060f97wn7z3zgb.pdf' },
  { id: 18, titulo: 'Acquisition of Altair Engineering (presentación a inversores)', editor: 'Siemens AG', tipo: 'Primaria', fecha: '2024-10-30', url: 'https://assets.new.siemens.com/siemens/assets/api/uuid:dd37857b-7a3c-4eab-abec-3f7c784e6de0/siemens-investor-presentation-241030.pdf' },
  { id: 19, titulo: 'ADSK short interest (≈4,2 % del capital flotante, 8,9 M de acciones)', editor: 'Equibles', tipo: 'Datos de mercado', fecha: '2026-08', url: 'https://equibles.com/stocks/ADSK' },
  { id: 20, titulo: 'Autodesk, Inc. (ADSK): noticias de analistas (Cantor y Goldman Sachs inician en Neutral; Guggenheim en Comprar)', editor: 'Seeking Alpha (RSS)', tipo: 'Prensa', fecha: '2026-10-09', url: 'https://seekingalpha.com/api/sa/combined/ADSK.xml' },
  { id: 22, titulo: 'Autodesk announces fiscal 2027 second quarter results (guía FY2027)', editor: 'Autodesk / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-27', url: `${EDGAR}/000076939726000059/q227pressrelease.htm` },
  { id: 23, titulo: 'Transcript: Autodesk (ADSK) Q2 FY27 earnings call', editor: 'The Singju Post', tipo: 'Prensa', fecha: '2026-08-27', url: 'https://singjupost.com/transcript-autodesk-adsk-q2-fy27-earnings-call-conference/' },
  { id: 21, titulo: 'Down 18 % in last 12 months, can Autodesk stock recover in 2026? (Citi rebaja a Neutral, objetivo 246 USD)', editor: 'TIKR', tipo: 'Prensa', fecha: '2026-09', url: 'https://www.tikr.com/blog/down-18-in-last-12-months-can-autodesk-nasdaq-stock-recover-in-2026' },
];
const D = {
  _estado: 'Completo. Precio de bolsa.mjs (cierre del 14-oct; el del 15-oct no había cerrado). Comparables tomados de los informes del repositorio de 7-14 oct y llevados al cierre del 13-14 oct con la variación del precio (estimación).',
  identificacion: {
    nombre: 'Autodesk, Inc.', nombre_corto: 'Autodesk', ticker: 'ADSK', isin: 'US0527691069', mercado: 'Nasdaq Global Select', indice_referencia: 'S&P 500',
    pais: 'Estados Unidos', pais_iso: 'US', sector: 'Tecnologías de la información', industria: 'Software de aplicaciones', sede: 'San Francisco (California)', fundacion: '1982', empleados: 14300, web: 'https://www.autodesk.com',
    precio: 231.14, fecha_precio: '2026-10-14', acciones: 211.0, capitalizacion_publicada: null, free_float_pct: 99.8,
    max_52s: 320.0, min_52s: 185.5, volumen_medio_diario: '≈ 495 M USD/día (3 meses)', proximos_resultados: '2026-11-24',
  },
  consenso: {
    guidance: 'Guía FY2027 (27-ago-2026, con MaintainX desde el 3-ago): billings de 8.575-8.650 M USD, ingresos de 8.295-8.345 M (+15-16 %), margen operativo GAAP del 25-27 % y non-GAAP del ≈39 %, BPA GAAP de 7,89-8,72 USD y non-GAAP de 12,52-12,60, caja libre de 2.725-2.750 M [22]. La dirección espera mejorar algo el margen non-GAAP en FY2028 y llegar al 41 % en FY2029, con pagos en acciones del ≈9 % de las ventas (11 % en FY2026) [23].',
    estimaciones: [
      { periodo: 'FY2027e', ingresos: 8324, ebitda: 3444, ebit: 3241, bpa: 8.48, dpa: 0, fuente: 'MarketScreener (36 analistas; EBITDA y EBIT ajustados, BPA GAAP) [2]' },
      { periodo: 'FY2028e', ingresos: 9242, ebitda: 3856, ebit: 3661, bpa: 9.78, dpa: 0, fuente: 'MarketScreener [2]' },
      { periodo: 'FY2029e', ingresos: 10241, ebitda: 4355, ebit: 4193, bpa: 11.61, dpa: 0, fuente: 'MarketScreener [2]' },
    ],
    recomendaciones: { n_analistas: 36, comprar: null, mantener: null, vender: null, po_medio: 307.54, po_min: null, po_max: null },
    base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: 10.8,
    confianza: 'Media',
  },
  bolsa: {
    tipo_rentabilidad: 'total (con dividendos)',
    rentabilidades: [
      { periodo: 'En el año', accion_pct: -21.9, indice_pct: 13.7, sector_pct: 1.9 },
      { periodo: '1 año', accion_pct: -24.2, indice_pct: 16.9, sector_pct: -5.0 },
      { periodo: '3 años (anual.)', accion_pct: 3.3, indice_pct: 22.7, sector_pct: 15.5 },
      { periodo: '5 años (anual.)', accion_pct: -4.5, indice_pct: 13.0, sector_pct: 4.9 },
      { periodo: '10 años (anual.)', accion_pct: 12.8, indice_pct: 15.5, sector_pct: 17.2 },
    ],
    anual: [
      { anio: '2019', accion_pct: 42.6, indice_pct: 31.2 }, { anio: '2020', accion_pct: 66.4, indice_pct: 18.3 }, { anio: '2021', accion_pct: -7.9, indice_pct: 28.7 },
      { anio: '2022', accion_pct: -33.5, indice_pct: -18.2 }, { anio: '2023', accion_pct: 30.3, indice_pct: 26.2 }, { anio: '2024', accion_pct: 21.4, indice_pct: 24.9 }, { anio: '2025', accion_pct: 0.1, indice_pct: 17.7 },
    ],
    beta: 1.3, volatilidad_pct: 38.8, max_drawdown_pct: -50.8, posicion_corta_pct: 4.2,
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: [
      { anio: 'FY2021', precio_cierre: 277.43, ev_ebitda_ntm: null, per_ntm: null, excluir: true },
      { anio: 'FY2022', precio_cierre: 249.79, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: 'FY2023', precio_cierre: 215.16, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: 'FY2024', precio_cierre: 253.81, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: 'FY2025', precio_cierre: 311.34, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: 'FY2026', precio_cierre: 252.87, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
    ],
    confianza: 'Media',
  },
  comparables: {
    empresas: [
      { nombre: 'Synopsys', ticker: 'SNPS', pais: 'US', capitalizacion: 90540, ev_ventas: 10.83, ev_ebitda_ltm: 27.4, ev_ebitda_ntm: 21.5, per_ntm: 22.6, crecimiento_pct: 17.1, margen_ebitda_pct: 22.0, roic_pct: 2.2, dn_ebitda: 3.48, fcf_yield_pct: 3.0 },
      { nombre: 'Cadence Design Systems', ticker: 'CDNS', pais: 'US', capitalizacion: 90950, ev_ventas: 15.75, ev_ebitda_ltm: 53.4, ev_ebitda_ntm: null, per_ntm: 36.1, crecimiento_pct: 7.9, margen_ebitda_pct: 29.5, roic_pct: 23.7, dn_ebitda: 0.6, fcf_yield_pct: 1.7 },
      { nombre: 'Dassault Systèmes', ticker: 'DSY', pais: 'FR', capitalizacion: 33445, ev_ventas: 4.55, ev_ebitda_ltm: 13.8, ev_ebitda_ntm: 12.5, per_ntm: 21.4, crecimiento_pct: 7.6, margen_ebitda_pct: 33.0, roic_pct: 13.8, dn_ebitda: -0.8, fcf_yield_pct: 5.0 },
      { nombre: 'Bentley Systems', ticker: 'BSY', pais: 'US', capitalizacion: 10162, ev_ventas: 7.06, ev_ebitda_ltm: 22.9, ev_ebitda_ntm: 19.1, per_ntm: 28.1, crecimiento_pct: 11.4, margen_ebitda_pct: 30.2, roic_pct: 11.9, dn_ebitda: 2.28, fcf_yield_pct: 3.9 },
      { nombre: 'Nemetschek', ticker: 'NEM', pais: 'DE', capitalizacion: 9226, ev_ventas: 8.55, ev_ebitda_ltm: 26.9, ev_ebitda_ntm: 20.1, per_ntm: 28.3, crecimiento_pct: 20.0, margen_ebitda_pct: 31.7, roic_pct: 19.2, dn_ebitda: 1.5, fcf_yield_pct: 4.0 },
      { nombre: 'Trimble', ticker: 'TRMB', pais: 'US', capitalizacion: 12304, ev_ventas: 3.95, ev_ebitda_ltm: 15.3, ev_ebitda_ntm: 13.8, per_ntm: 26.9, crecimiento_pct: 10.0, margen_ebitda_pct: 25.1, roic_pct: null, dn_ebitda: 1.3, fcf_yield_pct: 6.6 },
      { nombre: 'Hexagon', ticker: 'HEXA B', pais: 'SE', capitalizacion: 27954, ev_ventas: null, ev_ebitda_ltm: null, ev_ebitda_ntm: 16.3, per_ntm: 30.1, crecimiento_pct: null, margen_ebitda_pct: 36.5, roic_pct: null, dn_ebitda: 1.0, fcf_yield_pct: 3.0 },
    ],
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2026-10', objetivo: 'PTC', comprador: 'Schneider Electric', ev: 23700, ev_ventas: 8.65, ev_ebitda: null, prima_pct: 42.3, excluir: false, comentario: '205 USD por acción en efectivo; 22.600 M de capital y ≈23.700 M con deuda; ventas de FY2025 de 2.739 M USD; ≈21 veces el EBITA ajustado de 2027e según la prensa [10, 11]. Pendiente de aprobación (3T 2027).' },
      { fecha: '2026-05', objetivo: 'MaintainX', comprador: 'Autodesk', ev: 3575, ev_ventas: 26.5, ev_ebitda: null, prima_pct: null, excluir: true, comentario: '≈26 veces el ARR esperado de 2026 (>135 M USD, +50 %); sin beneficios. Excluida: crecimiento y perfil de pérdidas distintos [12].' },
      { fecha: '2026-04', objetivo: 'HCSS', comprador: 'Nemetschek', ev: 2340, ev_ventas: 10.9, ev_ebitda: 20.0, prima_pct: null, excluir: false, comentario: 'Más de 2.000 M EUR y algo más de 20 veces el EBITDA de 2025, según el consejero delegado de Nemetschek; ventas ≈215 M USD [13, 14].' },
      { fecha: '2024-06', objetivo: 'GoCanvas', comprador: 'Nemetschek', ev: 770, ev_ventas: 11.5, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '≈11,5 veces el ARR de 2023 (67 M USD) [15].' },
      { fecha: '2024-01', objetivo: 'Ansys', comprador: 'Synopsys', ev: 35000, ev_ventas: 15.4, ev_ebitda: null, prima_pct: 29, excluir: false, comentario: '390 USD por acción en efectivo y acciones; ventas de 2023 de 2.270 M USD [16].' },
      { fecha: '2024-02', objetivo: 'Altium', comprador: 'Renesas', ev: 5750, ev_ventas: 18.0, ev_ebitda: 50.0, prima_pct: 34, excluir: false, comentario: '8.800 M AUD de valor empresa; ≈18 veces ventas y ≈50 veces EBITDA del ejercicio 2024e [17].' },
      { fecha: '2024-10', objetivo: 'Altair Engineering', comprador: 'Siemens', ev: 10000, ev_ventas: 14.0, ev_ebitda: 31.0, prima_pct: 19, excluir: false, comentario: '113 USD por acción; 14 veces ventas y 31 veces EBITDA ajustado de 2025e con sinergias [18].' },
    ],
    confianza: 'Media',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'consenso', campo: 'reparto de recomendaciones y objetivos mínimo y máximo', tipo: 'Complemento', intentos: '1) MarketScreener (solo media y número); 2) Investing.com (no abre sin JavaScript); 3) prensa: Citi 246 USD, Piper 300 USD, Wells Fargo 330 USD, sin la lista completa', decision: 'Omitido' },
    { seccion: 'balance', campo: 'rating', tipo: 'Complemento', intentos: '1) Folleto 424B2 de sept-2026 (solo definiciones de grado de inversión); 2) 10-K y 10-Q (sin rating); 3) búsqueda de acciones de Moody\'s y S&P de 2026 (sin resultado)', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Autodesk, Inc.: noticias y análisis (titulares jul-oct 2026, RSS)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-09', url: 'https://seekingalpha.com/api/sa/combined/ADSK.xml' },
  { id: 2, titulo: 'Stream $ADSK (30 mensajes, 17-sep a 9-oct-2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-09', url: 'https://api.stocktwits.com/api/2/streams/symbol/ADSK.json' },
  { id: 3, titulo: 'Autodesk fell 35 %: I asked AI to kill the moat. It couldn\'t (narrativa de un usuario)', editor: 'Simply Wall St', tipo: 'Foros y redes', fecha: '2026-09-11', url: 'https://www.simplywall.st/narratives/octskt9d-autodesk-fell-35percent-i-asked-ai-to-kill-the-moat-it-couldnt' },
  { id: 4, titulo: 'Autodesk, Paylocity, Rapid7, DigitalOcean and Manhattan Associates shares plummet (agentes de IA)', editor: 'Yahoo Finance (StockStory)', tipo: 'Foros y redes', fecha: '2026', url: 'https://finance.yahoo.com/markets/stocks/articles/autodesk-paylocity-rapid7-digitalocean-manhattan-023747720.html' },
  { id: 5, titulo: 'Autodesk (ADSK) stock fell 8 % on September 4, 2026', editor: 'TIKR', tipo: 'Foros y redes', fecha: '2026-09', url: 'https://www.tikr.com/blog/title-2' },
];
const E = {
  _estado: 'Completo. Reddit da 403; se leen Seeking Alpha (titulares y artículos de autores), Stocktwits, la comunidad de Simply Wall St y comentarios de Yahoo/TIKR.',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Seeking Alpha (artículos de autores)', fecha: '2026-10', n_comentarios: 12, tono: 'Positivo', resumen: 'Mayoría de títulos alcistas («mercado que valora mal a un beneficiado de la IA», «demasiado barata para ignorarla», «subidas de precio»), con uno equilibrado tras el 2T [1].' },
      { plataforma: 'Seeking Alpha (noticias de analistas)', fecha: '2026-09', n_comentarios: 8, tono: 'Dividido', resumen: 'Cantor y Goldman inician en Neutral por la IA; Guggenheim en Comprar; la acción cae tras el 2T pese a superar previsiones [1].' },
      { plataforma: 'Stocktwits', fecha: '2026-10', n_comentarios: 30, tono: 'Dividido', resumen: 'Debate técnico (doble suelo en 185, media de 200 sesiones) y alivio tras la compra de PTC por Schneider; algunos bajistas esperan nuevos mínimos [2].' },
      { plataforma: 'Simply Wall St (comunidad)', fecha: '2026-09', n_comentarios: 1, tono: 'Positivo', resumen: 'Narrativa que «pide a la IA romper el foso» y concluye que la amenaza está en la interfaz y el cobro por puesto, no en los datos [3].' },
      { plataforma: 'Yahoo Finance / TIKR (comentarios de mercado)', fecha: '2026-09', n_comentarios: 4, tono: 'Negativo', resumen: 'Caídas del 8-9 % en un día por noticias ajenas (agentes de Anthropic, relevo en Adobe): el mercado vende todo el software por puesto [4, 5].' },
    ],
    confianza: 'Media',
  },
  fuentes: fE,
  huecos: [],
};

guarda('A', A); guarda('B', B); guarda('C', C); guarda('D', D); guarda('E', E);
console.log('Notas A-E escritas.');
