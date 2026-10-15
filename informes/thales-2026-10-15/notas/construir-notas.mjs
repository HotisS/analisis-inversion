// Escribe las notas A-E de Thales (corte 2026-10-15) con los documentos descargados en notas/docs
// (XBRL ESEF, URD 2025, notas de resultados 2019-2026, informe semestral 1S26, consenso de la empresa, Yahoo, BDIF de la AMF).
// Cada nota cita solo con [n] de su propia lista. Ejecutar: node informes/thales-2026-10-15/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const raiz = path.resolve(dir, '..', '..', '..');
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');

const URD = 'https://filings.xbrl.org/529900FNDVTQJOVVPZ19/2025-12-31/ESEF/FR/0/tha-2025-12-31-1-fr/reports/tha-2025-12-31-1-fr.xhtml';
const H1 = 'https://www.thalesgroup.com/sites/default/files/2026-07/Thales_-_2026_Half-Yearly_Financial_report.pdf';
const FY25 = 'https://www.edrmagazine.eu/wp-content/uploads/2026/03/2025-Q4-Thales.pdf';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Thales reports its 2025 full-year results (nota de prensa con cuenta ajustada 2025 y 2024, segmentos, geografías y flujos)', editor: 'Thales', tipo: 'Primaria', fecha: '2026-03-03', url: FY25 },
  { id: 2, titulo: 'Document d’enregistrement universel 2025 (cuentas consolidadas y notas, ESEF)', editor: 'Thales / AMF', tipo: 'Primaria', fecha: '2026-03', url: URD },
  { id: 3, titulo: 'Half-yearly financial report 2026 (informe de actividad y estados financieros a 30-jun-2026)', editor: 'Thales', tipo: 'Primaria', fecha: '2026-07-23', url: H1 },
  { id: 4, titulo: 'Thales reports its 2023 full-year results (BPA ajustado 2023 8,48 y 2022 7,35; objetivos 2024)', editor: 'Thales / AMF (DILA)', tipo: 'Primaria', fecha: '2024-03-05', url: 'https://echanges.dila.gouv.fr/OPENDATA/AMF/ECO/2024/03/FCECO073960_20240305.pdf' },
  { id: 5, titulo: 'Thales reports its 2022 full-year results (Transporte como actividad interrumpida; BPA ajustado 2021 6,39; objetivos 2023)', editor: 'Thales', tipo: 'Primaria', fecha: '2023-03-08', url: 'https://cdn.uc.assets.prezly.com/472bd266-5ace-449f-b0a6-191f1b7445bd/-/inline/no/thales-reports-its-2022-full-year-results-press-release-8-march-2023.pdf' },
  { id: 6, titulo: 'Thales 2019 Full-Year results (BPA ajustado 2019 6,61 y 2018 5,55)', editor: 'Thales / AMF (DILA)', tipo: 'Primaria', fecha: '2020-02-26', url: 'https://echanges.dila.gouv.fr/OPENDATA/AMF/ECO/2020/02/FCECO053958_20200226.pdf' },
  { id: 7, titulo: 'Thales 2025 half-year results (1S25 y 1S24; guía 2025 elevada)', editor: 'Thales / AMF (DILA)', tipo: 'Primaria', fecha: '2025-07-23', url: 'https://echanges.dila.gouv.fr/OPENDATA/AMF/ECO/2025/07/FCECO079167_20250723.pdf' },
  { id: 8, titulo: 'Thales: estados financieros XBRL (ESEF) 2020-2025 en filings.xbrl.org (LEI 529900FNDVTQJOVVPZ19)', editor: 'XBRL International / AMF', tipo: 'Primaria', fecha: '2026-03', url: 'https://filings.xbrl.org/529900FNDVTQJOVVPZ19/2025-12-31/ESEF/FR/0/tha-2025-12-31-1-fr.json' },
  { id: 9, titulo: 'H1 2026 results: presentación a analistas (23-jul-2026; calendario: ventas del 3T el 22-oct-2026)', editor: 'Thales', tipo: 'Primaria', fecha: '2026-07-23', url: 'https://www.thalesgroup.com/sites/default/files/press_release/documents/Thales%20publie%20ses%20r%C3%A9sultats%20du%20premier%20semestre%202026%20%E2%80%93%20Pr%C3%A9sentation%20%E2%80%93%2023%20juillet%202026_1.pdf' },
];

const cuenta = [
  { periodo: '2020', ingresos: 15371, coste_ventas: 11791.2, gastos_generales: null, ebitda: 1769.4, amortizaciones: 1126.2, ebit: 643.2, resultado_financiero: -86.8, bai: 556.4, impuestos: 64.5, minoritarios: 8.5, beneficio_neto: 483.4, gastos_financieros: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 2.27, dpa: 1.76, dpa_extraordinario: 0, acciones_diluidas: 213.0 },
  { periodo: '2021', ingresos: 16192, coste_ventas: 12158.9, gastos_generales: null, ebitda: 2254.8, amortizaciones: 1062.6, ebit: 1192.2, resultado_financiero: 89.9, bai: 1282.1, impuestos: 147.7, minoritarios: 45.6, beneficio_neto: 1088.8, gastos_financieros: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 5.11, dpa: 2.56, dpa_extraordinario: 0, acciones_diluidas: 213.1 },
  { periodo: '2022', ingresos: 17568.8, coste_ventas: 13113.4, gastos_generales: null, ebitda: 2379.3, amortizaciones: 1058.8, ebit: 1320.5, resultado_financiero: 35.6, bai: 1356.1, impuestos: 225.1, minoritarios: 10.4, beneficio_neto: 1120.6, gastos_financieros: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 23.5, bpa: 5.28, dpa: 2.94, dpa_extraordinario: 0, acciones_diluidas: 212.2 },
  { periodo: '2023', ingresos: 18428.4, coste_ventas: 13662, gastos_generales: null, ebitda: 2219.5, amortizaciones: 1045.1, ebit: 1174.4, resultado_financiero: 80.7, bai: 1255.1, impuestos: 252.2, minoritarios: -20.5, beneficio_neto: 1023.4, gastos_financieros: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 387.6, bpa: 4.89, dpa: 3.4, dpa_extraordinario: 0, acciones_diluidas: 209.3 },
  { periodo: '2024', ingresos: 20576.6, coste_ventas: 15202.7, gastos_generales: 2283, ebitda: 2417.6, amortizaciones: 1155.4, ebit: 1262.2, resultado_financiero: -82.6, bai: 1179.6, impuestos: 247.3, minoritarios: -75.1, beneficio_neto: 1419.5, gastos_financieros: 267.3, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 437, bpa: 6.89, dpa: 3.7, dpa_extraordinario: 0, acciones_diluidas: 206.0 },
  { periodo: '2025', ingresos: 22136.4, coste_ventas: 16283.2, gastos_generales: 2307, ebitda: 3151.4, amortizaciones: 1087.3, ebit: 2064.1, resultado_financiero: -27.3, bai: 2036.8, impuestos: 396.5, minoritarios: -34.2, beneficio_neto: 1674.5, gastos_financieros: 225.8, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 68, bpa: 8.13, dpa: 3.9, dpa_extraordinario: 0, acciones_diluidas: 206.0 },
];

const A = {
  _estado: 'completa',
  negocio: {
    segmentos: [
      { nombre: 'Defensa', descripcion: 'Radares, guerra electrónica, defensa aérea (SAMP/T, misiles ligeros), sistemas navales y submarinos, optrónica, comunicaciones militares, vehículos protegidos (Bushmaster).', tipo_resultado: 'EBIT', historico: [{ periodo: '2024', ingresos: 10969, resultado: 1432 }, { periodo: '2025', ingresos: 12234, resultado: 1619 }] },
      { nombre: 'Aeroespacial', descripcion: 'Aviónica (cabinas, vuelo, entretenimiento, comunicaciones de aeronaves) y Espacio (Thales Alenia Space, 67 %; satélites de telecomunicaciones, observación, exploración).', tipo_resultado: 'EBIT', historico: [{ periodo: '2024', ingresos: 5471, resultado: 391 }, { periodo: '2025', ingresos: 5910, resultado: 560 }] },
      { nombre: 'Ciber y Digital', descripcion: 'Ciberseguridad (Imperva, cifrado y gestión de claves) y Digital (identidad y biometría, tarjetas de pago, conectividad segura, la antigua Gemalto).', tipo_resultado: 'EBIT', historico: [{ periodo: '2024', ingresos: 4024, resultado: 585 }, { periodo: '2025', ingresos: 3852, resultado: 526 }] },
      { nombre: 'Otros (incl. Naval Group al 35 %)', descripcion: 'Actividades no asignadas y contribución de Naval Group (35 %) al EBIT ajustado.', tipo_resultado: 'EBIT', historico: [{ periodo: '2024', ingresos: 113, resultado: 10 }, { periodo: '2025', ingresos: 140, resultado: 35 }] },
    ],
    geografias: [
      { nombre: 'Francia', peso_pct: 27.7 }, { nombre: 'Resto de Europa', peso_pct: 28.0 }, { nombre: 'Reino Unido', peso_pct: 6.5 },
      { nombre: 'EE. UU. y Canadá', peso_pct: 12.4 }, { nombre: 'Asia', peso_pct: 9.9 }, { nombre: 'Oriente Próximo y Medio', peso_pct: 5.9 },
      { nombre: 'Australia y Nueva Zelanda', peso_pct: 4.1 }, { nombre: 'Resto del mundo', peso_pct: 5.5 },
    ],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Pedidos (M EUR)', valor_anterior: '25.289 (2024)', valor_actual: '25.264 (2025); 12.471 en 1S26 (+21 %)', variacion: '0 % / +21 %', comentario: 'Defensa con relación pedidos/ventas de 1,24 en 2025, más de 1,2 por séptimo año [A1, A3].' },
      { kpi: 'Cartera de pedidos (M EUR)', valor_anterior: '50.602 (dic-24)', valor_actual: '52.434 (jun-26)', variacion: '+3,6 %', comentario: 'Unos 2,4 años de ventas; la de Defensa, 41.100 M (3,2 años). Sin el F126 retirado en junio [A3].' },
      { kpi: 'Margen EBIT ajustado', valor_anterior: '11,8 % (2024)', valor_actual: '12,4 % (2025); 12,5 % en 1S26', variacion: '+0,6 pp', comentario: 'Guía 2026 12,6-12,8 %; objetivo 2028 13-14 % [A1, A3].' },
      { kpi: 'Free cash-flow operativo (M EUR)', valor_anterior: '2.027 (2024)', valor_actual: '2.577 (2025); 1.865 en 1S26', variacion: '+27 %', comentario: 'Conversión del beneficio neto ajustado del 128 % en 2025; guía 2026 100-110 % [A1, A3].' },
      { kpi: 'BPA ajustado (EUR)', valor_anterior: '9,24 (2024)', valor_actual: '9,76 (2025); 4,82 en 1S26 (+13 %)', variacion: '+6 %', comentario: 'Incluye la contribución temporal al impuesto de sociedades en Francia (75 M en 2025, 57 M en 1S26) [A1, A3].' },
      { kpi: 'Margen EBIT ajustado de Ciber y Digital', valor_anterior: '14,4 % (1S25)', valor_actual: '10,9 % (1S26)', variacion: '−3,6 pp', comentario: 'Digital pierde margen en pagos e identidad; Ciber estable en 14 % [A3].' },
    ],
  },
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 22820, ebitda: 2892, ebit: 1805, beneficio_neto: 1496, bpa: 7.29, dpa: 3.9, dpa_extraordinario: 0, fcf: 3707, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 516 },
    cambios_perimetro: [
      { periodo: '2022', descripcion: 'Transporte (vendido a Hitachi Rail en 2024) pasa a actividad interrumpida desde 2022: 2020-2021 incluyen sus ventas (unos 1.600 M) y 2022-2025 no.' },
      { periodo: '2023', descripcion: 'Compras de Imperva (EV 3.600 M USD, desde dic-23), Cobham Aerospace Communications y Tesserent: el fondo de comercio sube de 5.470 a 8.940 M.' },
    ],
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '1S24', ingresos: 9493, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 1096, margen_ebitda_pct: 11.5, bpa: 4.21, vs_consenso: null },
      { periodo: '2S24', ingresos: 11084, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 1323, margen_ebitda_pct: 11.9, bpa: 5.03, vs_consenso: null },
      { periodo: '1S25', ingresos: 10265, crecimiento_pct: 8.1, crecimiento_organico_pct: 8.1, ebitda: 1248, margen_ebitda_pct: 12.2, bpa: 4.27, vs_consenso: null },
      { periodo: '2S25', ingresos: 11871, crecimiento_pct: 7.1, crecimiento_organico_pct: null, ebitda: 1492, margen_ebitda_pct: 12.6, bpa: 5.49, vs_consenso: null },
      { periodo: '1S26', ingresos: 10949, crecimiento_pct: 6.7, crecimiento_organico_pct: 7.8, ebitda: 1372, margen_ebitda_pct: 12.5, bpa: 4.82, vs_consenso: 'Superior' },
    ],
    confianza: 'Alta',
  },
  balance: {
    historico: [
      { periodo: '2020', activo_total: 31800, activo_corriente: 17427, pasivo_corriente: 17176, pasivo_total: 26461, fondo_comercio: 6034, intangibles: 2285, inmovilizado_material: 3570, existencias: null, clientes: 5038, proveedores: 5998, activos_contrato: 2935, pasivos_contrato: 6454, caja: 5004, deuda_financiera: 7598, arrendamientos: null, patrimonio_neto: 5142, minoritarios: 197, reservas: null },
      { periodo: '2021', activo_total: 32835, activo_corriente: 19704, pasivo_corriente: 18568, pasivo_total: 26116, fondo_comercio: 5203, intangibles: 1943, inmovilizado_material: 3399, existencias: null, clientes: 5443, proveedores: 6067, activos_contrato: 2478, pasivos_contrato: 7069, caja: 5049, deuda_financiera: 5921, arrendamientos: null, patrimonio_neto: 6474, minoritarios: 244, reservas: null },
      { periodo: '2022', activo_total: 34421, activo_corriente: 21014, pasivo_corriente: 20743, pasivo_total: 27039, fondo_comercio: 5470, intangibles: 1566, inmovilizado_material: 3479, existencias: null, clientes: 5810, proveedores: 6919, activos_contrato: 2411, pasivos_contrato: 8314, caja: 5100, deuda_financiera: 5471, arrendamientos: null, patrimonio_neto: 7174, minoritarios: 208, reservas: null },
      { periodo: '2023', activo_total: 38786, activo_corriente: 21657, pasivo_corriente: 24225, pasivo_total: 31817, fondo_comercio: 8940, intangibles: 1288, inmovilizado_material: null, existencias: null, clientes: 6269, proveedores: 7644, activos_contrato: 2897, pasivos_contrato: 9789, caja: 3980, deuda_financiera: 6979.1, arrendamientos: 1454.9, patrimonio_neto: 6830, minoritarios: 139, reservas: null },
      { periodo: '2024', activo_total: 39989.8, activo_corriente: 21295.4, pasivo_corriente: 25656.7, pasivo_total: 32431.7, fondo_comercio: 8899.2, intangibles: 2532.7, inmovilizado_material: 3715.5, existencias: 4935.5, clientes: 7146.2, proveedores: 8332.7, activos_contrato: 3242.7, pasivos_contrato: 11541.1, caja: 4779.6, deuda_financiera: 6430.9, arrendamientos: 1392.3, patrimonio_neto: 7515.2, minoritarios: 42.9, reservas: null },
      { periodo: '2025', activo_total: 39155.4, activo_corriente: 21322.3, pasivo_corriente: 25238.7, pasivo_total: 31167.7, fondo_comercio: 8530.5, intangibles: 1996.1, inmovilizado_material: 3899.2, existencias: 4964.2, clientes: 6845.8, proveedores: 8652.3, activos_contrato: 3535.0, pasivos_contrato: 12384.0, caja: 4511.1, deuda_financiera: 4796.7, arrendamientos: 1332.8, patrimonio_neto: 7968.4, minoritarios: 19.3, reservas: null },
    ],
    vencimientos: [{ anio: '2026', importe: 1907.2 }, { anio: '2027', importe: 500.6 }, { anio: '2028', importe: 1296.9 }, { anio: '2029', importe: 496.9 }, { anio: '2030+', importe: 595.1 }],
    liquidez: 'Caja y equivalentes 4.997 M + otros activos financieros corrientes 59 M a 30-jun-2026 [A3], más una línea de crédito confirmada no dispuesta de 1.500 M con vencimiento en 2028 y un programa de pagarés NEU CP [A2].',
    rating: 'S&P A- (estable); Moody’s A2 (estable) [A2]',
    coste_deuda_pct: 3.0,
    vida_media_anios: 2.5,
    confianza: 'Alta',
  },
  flujos: {
    historico: [
      { periodo: '2020', flujo_operativo: 1155, capex: 379, pagos_arrendamientos: null, adquisiciones: 22, desinversiones: 21.6, dividendos: 85.1, recompras: 8.9, emision_acciones: 0, intereses_en_financiacion: 0 },
      { periodo: '2021', flujo_operativo: 2707, capex: 451, pagos_arrendamientos: null, adquisiciones: 54.7, desinversiones: 2.2, dividendos: 417, recompras: 26.7, emision_acciones: 0, intereses_en_financiacion: 0 },
      { periodo: '2022', flujo_operativo: 3025, capex: 535, pagos_arrendamientos: null, adquisiciones: 418, desinversiones: 2, dividendos: 563, recompras: 351, emision_acciones: 0, intereses_en_financiacion: 0 },
      { periodo: '2023', flujo_operativo: 1596, capex: 626, pagos_arrendamientos: null, adquisiciones: 3579, desinversiones: 132, dividendos: 634, recompras: 491, emision_acciones: 0, intereses_en_financiacion: 0 },
      { periodo: '2024', flujo_operativo: 2637.8, capex: 616.8, pagos_arrendamientos: 222.1, adquisiciones: 1169, desinversiones: 1520.1, dividendos: 708.4, recompras: 275.4, emision_acciones: 0, intereses_en_financiacion: 0 },
      { periodo: '2025', flujo_operativo: 3321.8, capex: 746.3, pagos_arrendamientos: 235.8, adquisiciones: 9.2, desinversiones: 0, dividendos: 780.7, recompras: 45.2, emision_acciones: 0, intereses_en_financiacion: 0 },
    ],
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'Ernst & Young Audit y PricewaterhouseCoopers Audit (PwC sustituye a Forvis Mazars desde la junta de mayo de 2025)',
    anios_auditor: null,
    opinion: 'Favorable (cuentas 2025 y revisión limitada del 1S26) [A2, A3]',
    confianza: 'Media',
  },
  capital: {
    adquisiciones: [
      { anio: '2019', objetivo: 'Gemalto (identidad digital y seguridad, Países Bajos)', importe: 4800, ev_ebitda: null, financiacion: 'Caja y deuda', resultado: 'Base de Digital; en 2024 la parte de pagos e identidad pierde margen y en 1S26 el margen de Digital cae; sin deterioro del fondo de comercio de esa unidad publicado [A2, A3].' },
      { anio: '2023', objetivo: 'Imperva (ciberseguridad de aplicaciones y datos, EE. UU.)', importe: 3270, ev_ebitda: null, financiacion: 'Deuda (bonos de jun y oct-2023)', resultado: 'Pagado a 6,1 veces ventas; Ciber vuelve a crecer en 2T26 (+4,5 %) con margen del 14 % [A3].' },
      { anio: '2023', objetivo: 'Cobham Aerospace Communications (comunicaciones de aeronaves)', importe: null, ev_ebitda: null, financiacion: 'Caja', resultado: 'Integrado en Aviónica; Aeroespacial sube margen de 7,1 % a 9,5 % en 2024-2025 [A1].' },
      { anio: '2024', objetivo: 'Venta de Transporte a Hitachi Rail', importe: 1520, ev_ebitda: null, financiacion: 'Desinversión (cobro neto de caja cedida)', resultado: 'Plusvalía en actividades interrumpidas (412 M en el beneficio de 2024) [A1].' },
    ],
    confianza: 'Media',
  },
  fuentes: fA,
  huecos: [
    { seccion: 'financieros', campo: 'gastos comerciales y generales 2020-2023 y gastos financieros brutos 2020-2023', tipo: 'Complemento', intentos: '1) XBRL ESEF (solo administración, sin comerciales); 2) notas de resultados 2022-2023 (cuenta ajustada sin desglose de intereses brutos); 3) URD 2022 (descarga fallida)', decision: 'Omitido' },
    { seccion: 'balance', campo: 'arrendamientos 2020-2022 (la deuda de esos años los incluye) y existencias 2020-2023', tipo: 'Complemento', intentos: '1) XBRL ESEF sin concepto separado; 2) URD 2022 en filings.xbrl.org (descarga fallida); 3) notas de resultados (solo deuda neta total)', decision: 'Omitido' },
  ],
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Global military spending surges in 2025: 2.887.000 M USD (+2,9 %); Europa +14 %', editor: 'SIPRI', tipo: 'Sectorial', fecha: '2026-04-27', url: 'https://www.sipri.org/media/press-release/2026/world-military-expenditure' },
  { id: 2, titulo: 'Document d’enregistrement universel 2025: actividades, mercados, proyecto Bromo (espacio con Airbus y Leonardo), clientes', editor: 'Thales / AMF', tipo: 'Primaria', fecha: '2026-03', url: URD },
  { id: 3, titulo: 'Half-yearly financial report 2026 (pedidos por región, F126, anulación de satélites)', editor: 'Thales', tipo: 'Primaria', fecha: '2026-07-23', url: H1 },
  { id: 4, titulo: 'Ficha sectorial: defensa y electrónica de defensa (15-oct-2026), con comparables al 13/14-oct', editor: 'Repositorio de análisis (ficha propia)', tipo: 'Sectorial', fecha: '2026-10-15', url: 'https://github.com/ (repositorio) sectores/defensa-2026-10-15.md' },
  { id: 5, titulo: 'Défense européenne : Bernstein passe le secteur au crible (Thales 290 → 250 EUR; Rheinmetall 1.900 → 1.200 EUR)', editor: 'Option Finance', tipo: 'Prensa', fecha: '2026-09-29', url: 'https://www.optionfinance.fr/info-financiere-en-continu/d/2026-09-29-defense-europeenne-bernstein-passe-le-secteur-au-crible.html' },
  { id: 6, titulo: 'Comparables: estimaciones y estadísticas de BAE Systems, Leonardo, Rheinmetall, Hensoldt, Saab, Lockheed Martin, General Dynamics y L3Harris', editor: 'MarketScreener / Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-07', url: 'https://www.marketscreener.com/quote/stock/THALES-4715/finances/' },
  { id: 7, titulo: 'Thales reports its 2025 full-year results', editor: 'Thales', tipo: 'Primaria', fecha: '2026-03-03', url: FY25 },
];
const B = {
  _estado: 'completa',
  historia: {
    resumen: 'Thales nace en 2000 al cambiar de nombre Thomson-CSF, la electrónica de defensa del antiguo grupo Thomson nacionalizado en 1982 y privatizado parcialmente en 1998, cuando entraron Alcatel y Dassault. Dassault Aviation sustituyó a Alcatel-Lucent como socio industrial en 2009 y hoy el Estado francés (a través de TSA) y Dassault controlan juntos el 53 % del capital con un pacto de accionistas [B2]. Con Patrice Caine (presidente y consejero delegado desde 2014) el grupo se ha concentrado en defensa, aeroespacial y seguridad digital: compró Gemalto en 2019 e Imperva en 2023, vendió Transporte a Hitachi Rail en 2024 y prepara la fusión de su espacio con el de Airbus y Leonardo (proyecto Bromo, previsto para 2027) [B2].',
    hitos: [
      { anio: '1968', hito: 'Fusión de CSF con Thomson (Thomson-CSF), base de la electrónica de defensa francesa.' },
      { anio: '1998', hito: 'Privatización parcial: entran Alcatel, Dassault Industries y Aerospatiale junto al Estado.' },
      { anio: '2000', hito: 'Thomson-CSF pasa a llamarse Thales tras comprar Racal (Reino Unido).' },
      { anio: '2009', hito: 'Dassault Aviation compra la participación de Alcatel-Lucent y se convierte en el socio industrial del Estado.' },
      { anio: '2014', hito: 'Patrice Caine, presidente y consejero delegado.' },
      { anio: '2019', hito: 'Compra de Gemalto (identidad digital y seguridad) por unos 4.800 M EUR.' },
      { anio: '2023', hito: 'Compras de Imperva (3.600 M USD), Cobham Aerospace Communications y Tesserent.' },
      { anio: '2024', hito: 'Venta de Transporte a Hitachi Rail; día del inversor con objetivos 2028 (margen EBIT ajustado 13-14 %).' },
      { anio: '2025', hito: 'Protocolo con Airbus y Leonardo para fusionar sus actividades espaciales (Thales 32,5 %).' },
      { anio: '2026', hito: 'Alemania anula las fragatas F126: cargo de 450 M EUR; pedidos del 1S26 +21 % [B3].' },
    ],
    confianza: 'Media',
  },
  sector: {
    definicion: 'El mercado relevante es el gasto en equipamiento de defensa (electrónica, sistemas y armamento) de los países de la OTAN y de sus aliados exportadores, más la aviónica y el espacio institucional. Como referencia de tamaño usamos el gasto militar de SIPRI, que incluye personal y operaciones; el equipamiento es entre un 20 % y un 35 % de él según el país [B1, B4]. Thales vende el 62 % en Europa y el 28 % en Francia [B7].',
    tamano: '≈ 2.887.000 M USD de gasto militar mundial en 2025; Europa 864.000 M USD (+14 %) [B1]',
    unidad_serie: 'miles de millones de USD (gasto militar mundial, SIPRI)',
    serie: [{ anio: '2024', tamano: 2718 }, { anio: '2025', tamano: 2887 }],
    tcac_historico_pct: 6.2,
    tcac_previsto_pct: 6.0,
    cr5_pct: null,
    estructura: 'Fragmentada',
    drivers: [
      { driver: 'Rearme europeo (OTAN: 3,5 % + 1,5 % del PIB en 2035)', efecto: '+', horizonte: 'Estructural', evidencia: 'Gasto de los europeos de la OTAN +14 % en 2025, el mayor aumento desde 1953 [B1]; pedidos de Thales en Europa (sin Francia) +46 % en 1S26 [B3].' },
      { driver: 'Defensa aérea y antimisiles', efecto: '+', horizonte: 'Estructural', evidencia: 'Pedido de SAMP/T NG en dos capas (OCCAR) y sistemas de vigilancia aérea para Oriente Medio en 1S26 [B3].' },
      { driver: 'Presupuesto francés y elecciones de 2027', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'El Estado francés compra unos 4.500 M EUR al año a Thales (20 % de las ventas) [B2]; foros y prensa debaten un «bache» de la defensa francesa tras 2027.' },
      { driver: 'Negociaciones de paz en Ucrania', efecto: '−', horizonte: 'Cíclico', evidencia: 'Resta prima al múltiplo del sector (Bernstein recorta objetivos el 29-sep-2026) más que a los pedidos ya firmados [B5].' },
      { driver: 'Tráfico aéreo y cadencias de Airbus y Boeing', efecto: '+', horizonte: 'Cíclico', evidencia: 'Aviónica creció en 1S26 con el aumento de las cadencias de los fabricantes [B3].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 2, justificacion: 'Mercados nacionales con campeones protegidos; competencia en exportación (BAE, Leonardo, Raytheon, Hensoldt). Márgenes estables del 12-14 % en defensa [B6].' },
      { fuerza: 'Poder de los clientes', intensidad: 4, justificacion: 'Clientes estatales con poder de compra y capacidad de anular programas (F126: cargo de 450 M) [B3].' },
      { fuerza: 'Poder de los proveedores', intensidad: 3, justificacion: 'Componentes electrónicos y energéticos escasos; la cadena de suministro limitó entregas en 2022-2024 [B2].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Barreras altas: habilitaciones, controles de exportación y décadas de I+D (1.328 M EUR propios en 2025) [B7]; los nuevos entran en drones y software.' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 2, justificacion: 'Drones baratos y software sustituyen parte de las plataformas caras, pero exigen más sensores y guerra electrónica, donde Thales es fuerte.' },
    ],
    ciclo: { posicion: 'Expansión', comentario: 'Pedidos récord y relación pedidos/ventas de 1,14 en 1S26 [B3]. El sector no siguió a la economía en 2008-09 ni en 2020 (las ventas de Thales cayeron un 7 % en 2020 por aviónica civil, no por defensa). Tras 2022 los presupuestos europeos se aceleran; el riesgo de ciclo está en los múltiplos de bolsa, que pasaron de 12-15x a más de 20x.' },
    regulacion: 'Compromiso de la OTAN de junio de 2025 (3,5 % del PIB en defensa básica y 1,5 % en seguridad para 2035); programa europeo SAFE de préstamos para compras conjuntas y preferencia europea; ley de programación militar francesa 2024-2030. Controles de exportación (normas francesas e ITAR) que pueden frenar ventas a terceros países. En Francia, una contribución temporal al impuesto de sociedades costó 75 M EUR en 2025 y se renovó para 2026 [B2].',
    tendencias: 'La guerra de Ucrania ha desplazado la demanda hacia defensa aérea, munición, guerra electrónica y drones; Thales gana en sensores, radares y guerra electrónica. En espacio, la fusión con Airbus y Leonardo busca escala frente a SpaceX y constelaciones baratas. En Digital, las tarjetas de pago físicas pierden volumen y la identidad compite con soluciones de software. La IA entra en el tratamiento de señales y de datos de sensores, donde Thales invierte con su centro cortAIx [B2].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: null,
    posicion: 'Primer grupo francés de electrónica de defensa y uno de los tres mayores de Europa con BAE Systems y Leonardo; líder mundial en tarjetas e identidad (Gemalto) y uno de los dos grandes fabricantes europeos de satélites (Thales Alenia Space) [B2].',
    competidores: [
      { nombre: 'BAE Systems', pais: 'Reino Unido', ticker: 'BA.', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Mayor grupo europeo; capitalización 64.618 M EUR, PER NTM 21,6x [B4].' },
      { nombre: 'Leonardo', pais: 'Italia', ticker: 'LDO', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Electrónica, helicópteros y espacio (socio de Thales en Thales Alenia Space y en Bromo); PER NTM 17,0x [B4].' },
      { nombre: 'Rheinmetall', pais: 'Alemania', ticker: 'RHM', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Munición y vehículos; crecimiento del 40 % y PER NTM 20,5x [B4].' },
      { nombre: 'Hensoldt', pais: 'Alemania', ticker: 'HAG', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Sensores y radares, competidor directo en electrónica; PER NTM 39,1x [B4].' },
      { nombre: 'Saab', pais: 'Suecia', ticker: 'SAAB B', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Radares, guerra electrónica y aviones; PER NTM 33,1x [B4].' },
      { nombre: 'RTX (Raytheon)', pais: 'EE. UU.', ticker: 'RTX', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Rival en defensa aérea y radares en exportación.' },
    ],
    foso: {
      veredicto: 'Amplio', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'Poco relevante; algo en estándares de identidad y pagos.' },
        { fuente: 'Costes de cambio', puntuacion: 5, evidencia: 'Sistemas integrados en plataformas con 30-40 años de vida (Rafale, fragatas, radares); el soporte y la modernización vuelven al mismo proveedor. Cartera de Defensa de 41.100 M, 3,2 años de ventas [B3].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 4, evidencia: 'Habilitaciones de seguridad, controles de exportación y 1.328 M de I+D propia al año [B7].' },
        { fuente: 'Ventaja en costes', puntuacion: 2, evidencia: 'Sin ventaja clara: margen EBIT ajustado de defensa del 13,2 % en línea con BAE y por encima de Leonardo [B6, B7].' },
        { fuente: 'Escala eficiente', puntuacion: 4, evidencia: 'Mercados nacionales que solo admiten uno o dos proveedores por sistema; el Estado francés es accionista y cliente de 4.500 M al año [B2].' },
      ],
    },
    amenazas: 'Tres amenazas: (1) que el ciclo de rearme se frene tras un acuerdo en Ucrania o por límites fiscales en Francia (Thales vende el 28 % en Francia); (2) la entrada de empresas de software y drones (Anduril, Helsing) en la parte de mando, control y sensores baratos, donde el precio por sistema puede caer; (3) en Digital, la pérdida de volumen en tarjetas de pago y la presión de precios en identidad, que ya rebajan el margen de Ciber y Digital del 14,4 % al 10,9 % en un año [B3]. Probabilidad media en (1) y (3), baja a cinco años en (2).',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Lo material para las cifras es la ética de las exportaciones de armamento (controles, clientes de Oriente Medio y Asia: 16 % de las ventas en emergentes con crecimiento del 36,7 % en Oriente Medio en 1S26) [B3], la ciberseguridad propia (Thales vende seguridad: un incidente grave dañaría la marca) y la exclusión de algunos fondos ESG del sector defensa, que limita la base de inversores aunque se ha suavizado desde 2022.',
    controversias: 'El programa interno de cumplimiento abrió investigación en 109 alertas en 2025 [B2]. El litigio más relevante es comercial: la reclamación a Alemania por la anulación de las fragatas F126 (cargo de 450 M en el 1S26) [B3]. No hemos verificado en fuentes primarias el estado de las investigaciones judiciales sobre contratos de exportación de las que se ha hecho eco la prensa; queda como pregunta abierta.',
    confianza: 'Baja',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'competencia', campo: 'cuota de mercado y ventas y márgenes de los competidores en el mismo perímetro', tipo: 'Complemento', intentos: '1) URD 2025 (no publica cuotas); 2) ficha sectorial (sin cuotas fiables por sistema); 3) informes de los competidores (perímetros distintos)', decision: 'Omitido' },
    { seccion: 'esg', campo: 'calificaciones ESG publicadas', tipo: 'Complemento', intentos: '1) URD 2025 (no se localizaron con búsqueda en el texto); 2) MSCI y Sustainalytics (páginas con JavaScript); 3) prensa', decision: 'Omitido' },
    { seccion: 'sector', campo: 'segunda fuente independiente del tamaño del mercado', tipo: 'Complemento', intentos: '1) OTAN (cifras de gasto no consultadas por tiempo); 2) EDA; 3) informes de mercado de pago', decision: 'Omitido' },
  ],
};
guarda('B', B);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Document d’enregistrement universel 2025: gobierno corporativo, consejo, pacto de accionistas, remuneraciones y accionariado', editor: 'Thales / AMF', tipo: 'Primaria', fecha: '2026-03', url: URD },
  { id: 2, titulo: 'BDIF: declaración de operaciones de directivos 2026DD1123145 (P. Caine, compra de 12.700 acciones a 227,29 EUR el 22-jun-2026)', editor: 'AMF', tipo: 'Primaria', fecha: '2026-06-26', url: 'https://bdif.amf-france.org/back/api/v1/documents/2026/2026DD1123145/10B4654B023ECD2FADFA13DC8F4699B388703529762BCF7D7704D00499BBA2C2.pdf' },
  { id: 3, titulo: 'BDIF: declaraciones 2026DD1116246 y 2026DD1141870 (A. Rigail, consejera: compras de 350 acciones el 21-may y 150 el 1-oct-2026)', editor: 'AMF', tipo: 'Primaria', fecha: '2026-10-02', url: 'https://bdif.amf-france.org/back/api/v1/documents/2026/2026DD1141870/8A357D6BA3FBC0DC20F7E01F130FDF87925F491100C8B6F26DBAC88BA1C4A1EC.pdf' },
  { id: 4, titulo: 'Half-yearly financial report 2026 (declaración del responsable, firmada por P. Caine como Chairman & CEO el 23-jul-2026)', editor: 'Thales', tipo: 'Primaria', fecha: '2026-07-23', url: H1 },
  { id: 5, titulo: 'Thales reports its 2023 full-year results (objetivos 2024)', editor: 'Thales / AMF (DILA)', tipo: 'Primaria', fecha: '2024-03-05', url: 'https://echanges.dila.gouv.fr/OPENDATA/AMF/ECO/2024/03/FCECO073960_20240305.pdf' },
  { id: 6, titulo: 'Thales reports its 2022 full-year results (objetivos 2023)', editor: 'Thales', tipo: 'Primaria', fecha: '2023-03-08', url: 'https://cdn.uc.assets.prezly.com/472bd266-5ace-449f-b0a6-191f1b7445bd/-/inline/no/thales-reports-its-2022-full-year-results-press-release-8-march-2023.pdf' },
  { id: 7, titulo: 'Thales 2025 half-year results (guía 2025 elevada a +6-7 % orgánico)', editor: 'Thales / AMF (DILA)', tipo: 'Primaria', fecha: '2025-07-23', url: 'https://echanges.dila.gouv.fr/OPENDATA/AMF/ECO/2025/07/FCECO079167_20250723.pdf' },
  { id: 8, titulo: 'Thales reports its 2025 full-year results', editor: 'Thales', tipo: 'Primaria', fecha: '2026-03-03', url: FY25 },
];
const consejo = [
  ['Patrice Caine', 'Presidente y consejero delegado', 'Ejecutivo', '2014', 'Estrategia y RSE'],
  ['Estado francés (Alexis Zajdenweber)', 'Consejero', 'Dominical', '2024', 'Estrategia'],
  ['Delphine Gény-Stephann', 'Consejera', 'Dominical', null, null],
  ['Bernard Fontana', 'Consejero', 'Dominical', null, null],
  ['Anne Rigail', 'Consejera', 'Dominical', null, null],
  ['Éric Trappier', 'Consejero (presidente y consejero delegado de Dassault Aviation)', 'Dominical', null, null],
  ['Loïk Segalen', 'Consejero', 'Dominical', null, null],
  ['Marie-Françoise Walbaum', 'Consejera', 'Dominical', null, null],
  ['Valérie Guillemet', 'Consejera', 'Dominical', '2025', null],
  ['Ruby McGregor-Smith', 'Consejera', 'Independiente', null, null],
  ['Marianna Nitsch', 'Consejera', 'Independiente', null, null],
  ['Loïc Rocard', 'Consejero', 'Independiente', null, null],
  ['Anne-Claire Taittinger', 'Consejera', 'Independiente', null, null],
  ['Philippe Lépinay', 'Consejero (representa a los empleados accionistas)', 'Otro externo', null, null],
  ['Anne-Marie Hunot-Schmit', 'Consejera (designada por los sindicatos)', 'Otro externo', null, null],
  ['Stéphane Jubault', 'Consejero (designado por los sindicatos)', 'Otro externo', null, null],
].map(([nombre, cargo, tipo, desde, comisiones]) => ({ nombre, cargo, tipo, desde, comisiones }));
const C = {
  _estado: 'completa',
  directivos: {
    equipo: [
      { nombre: 'Patrice Caine', cargo: 'Presidente y consejero delegado (PDG)', desde: '2014', participacion_pct: 0.01, trayectoria: 'Ingeniero del Corps des mines; entró en Thales en 2002 y en el comité ejecutivo en 2013. Con él las ventas pasaron de 13.000 a más de 22.000 M EUR y el beneficio neto ajustado de 562 a más de 2.000 M entre 2014 y 2025 [C1]. Renovado para un cuarto mandato en la junta de mayo de 2026 [C1, C4].' },
    ],
    historial_guidance: [
      { anio: '2023', guia: 'Crecimiento orgánico +4/+7 %; margen EBIT 11,5-11,8 % [C6]', real: 'Orgánico +7,9 %; margen 11,6 % [C5]', cumplida: 'Sí' },
      { anio: '2024', guia: 'Crecimiento orgánico +4/+6 % (19.700-20.100 M); margen 11,7-12,0 % [C5]', real: 'Ventas 20.577 M; margen 11,8 % [C8]', cumplida: 'Sí' },
      { anio: '2025', guia: 'Orgánico +5/+6 %, elevado a +6/+7 % en julio; margen 12,2-12,4 % [C7]', real: 'Orgánico +8,8 %; margen 12,4 % [C8]', cumplida: 'Sí' },
      { anio: '2026', guia: 'Orgánico +6/+7 % (23.300-23.600 M); margen 12,6-12,8 %; pedidos/ventas > 1,1; conversión 100-110 % [C4]', real: '1S26: orgánico +7,8 %; margen 12,5 %; pedidos/ventas 1,14', cumplida: 'Parcial' },
    ],
    confianza: 'Media',
  },
  gobierno: {
    consejo,
    presidente_ceo_separados: false, presidente_ejecutivo: true, consejero_coordinador: false, una_accion_un_voto: false,
    operaciones_vinculadas_relevantes: true, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: true, presidente_vinculado_control: true, cambios_cupula_24m: 0,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 3.56, fijo: 1.0, variable_corto: null, variable_largo: null, ratio_salario_medio: 45 },
    accionistas: [
      { nombre: 'Estado francés (vía TSA, más 2.060 acciones directas y una acción específica)', pct: 26.6, tipo: 'Accionista público (Secteur Public)', variacion: 'Sin cambios en 2024-2025; 36,35 % de los derechos de voto' },
      { nombre: 'Dassault Aviation', pct: 26.59, tipo: 'Socio industrial (pacto con el Estado)', variacion: 'Sin cambios; 29,91 % de los votos' },
      { nombre: 'Empleados', pct: 2.99, tipo: 'Plan de empleados', variacion: '−0,19 pp en 2025' },
      { nombre: 'Autocartera', pct: 0.23, tipo: 'Autocartera', variacion: '−0,08 pp en 2025' },
      { nombre: 'Otros (flotante)', pct: 43.59, tipo: 'Flotante', variacion: '+0,27 pp' },
    ],
    insiders: [
      { fecha: '2026-05-21', persona: 'Anne Rigail (consejera)', operacion: 'Compra', acciones: 350, importe: 0.08 },
      { fecha: '2026-06-22', persona: 'Patrice Caine (vía su sociedad patrimonial)', operacion: 'Compra', acciones: 12700, importe: 2.89 },
      { fecha: '2026-10-01', persona: 'Anne Rigail (consejera)', operacion: 'Compra', acciones: 150, importe: 0.03 },
    ],
    alertas: [
      'El Estado francés y Dassault Aviation controlan el 53,2 % del capital y el 66 % de los votos con un pacto que reparte 9 de 14 puestos del consejo y elige de común acuerdo al presidente [C1].',
      'Presidente y consejero delegado en la misma persona, sin consejero coordinador independiente; solo 4 independientes de 16 [C1].',
      'El Estado es a la vez accionista de control y el primer cliente (unos 4.500 M EUR de ventas en 2025) [C1].',
    ],
    confianza: 'Media',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'votos de la junta sobre remuneración (2024-2026)', tipo: 'Complemento', intentos: '1) URD 2025 (no recoge el resultado de las votaciones); 2) web de la junta (thalesgroup.com bloquea con Incapsula); 3) BALO y prensa (sin cifras)', decision: 'Omitido' },
    { seccion: 'directivos', campo: 'director financiero y otros miembros del comité ejecutivo con su participación', tipo: 'Complemento', intentos: '1) URD 2025 (búsqueda en el texto sin resultado concluyente); 2) informe semestral 2026; 3) web de la empresa (bloqueada)', decision: 'Omitido' },
  ],
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const bolsa = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const comps = JSON.parse(fs.readFileSync(path.join(raiz, 'sectores', 'defensa-2026-10-15-comparables.json'), 'utf8'));
const fD = [
  { id: 1, titulo: 'Yahoo Finance, históricos diarios de HO.PA, ^FCHI y EXV1.DE (hasta el 13-oct-2026) y cotización del 15-oct con el cierre anterior (14-oct: 224,70 EUR)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/quote/HO.PA/history/' },
  { id: 2, titulo: 'THALES CONSENSUS at 15 July 2026 (16 casas: pedidos, ventas, EBIT ajustado y BPA ajustado 2026-2028)', editor: 'Thales (recopilación de analistas)', tipo: 'Analistas', fecha: '2026-07-15', url: 'https://www.thalesgroup.com/sites/default/files/2026-07/2026.07.15%20Thales%20Consensus%20VA.pdf' },
  { id: 3, titulo: 'Thales: estimaciones anuales 2026-2028, 18 analistas, objetivo medio 293,61 EUR, consenso «Outperform»', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://www.marketscreener.com/quote/stock/THALES-4715/finances/' },
  { id: 4, titulo: 'Comparables de defensa al 13/14-oct-2026 (ficha sectorial; cifras de MarketScreener y Stock Analysis del 6/7-oct llevadas al cierre)', editor: 'Ficha sectorial propia', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'sectores/defensa-2026-10-15-comparables.json' },
  { id: 5, titulo: 'Bundesbank: rendimiento del Bund a 10 años (3,51 % el 14-oct-2026)', editor: 'Deutsche Bundesbank', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://api.statistiken.bundesbank.de/rest/download/BBSIS/D.I.ZST.ZI.EUR.S1311.B.A604.R10XX.R.A.A._Z._Z.A?format=csv&lang=en' },
  { id: 6, titulo: 'Damodaran, Implied ERP by month (ERPbymonth.xlsx): 4,20 % en octubre de 2026', editor: 'A. Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 7, titulo: 'Ball Corporation: Ball Announces Agreement to Sell Aerospace Business for $5.6 Billion (8-K)', editor: 'Ball Corporation (SEC EDGAR)', tipo: 'Primaria', fecha: '2023-08-17', url: 'https://www.sec.gov/Archives/edgar/data/9389/000000938923000028/ball-20230817xex99.htm' },
  { id: 8, titulo: 'Aerojet Rocketdyne: comunicación sobre la compra por L3Harris (DEFA14A)', editor: 'Aerojet Rocketdyne (SEC EDGAR)', tipo: 'Primaria', fecha: '2022-12-19', url: 'https://www.sec.gov/Archives/edgar/data/40888/000119312522308466/d415225ddefa14a.htm' },
  { id: 9, titulo: 'Parker Hannifin: anuncio de la oferta por Meggitt plc (Rule 2.7)', editor: 'Parker Hannifin (SEC EDGAR)', tipo: 'Primaria', fecha: '2021-08-02', url: 'https://www.sec.gov/Archives/edgar/data/76334/000119312521233544/d211612dex21.htm' },
  { id: 10, titulo: 'Hensoldt AG, Analyst Call: Acquisition of ESG', editor: 'Hensoldt AG', tipo: 'Primaria', fecha: '2023-12', url: 'https://investors.hensoldt.net/media/document/c62ffd6f-0980-4f75-b730-461d0bf50b6e/assets/HENSOLDT_AG_Analyst_Call_ESG.pdf' },
  { id: 11, titulo: 'Redeia: venta de Hispasat a Indra (valor empresa 966 M EUR)', editor: 'Redeia', tipo: 'Primaria', fecha: '2025-01-31', url: 'https://redeia.com/sites/default/files/paragraph/2025/01/file/20250131_NP_Hispasat.pdf' },
  { id: 12, titulo: 'Leonardo to acquire Iveco Defence (EV 1.700 M EUR)', editor: 'Leonardo', tipo: 'Primaria', fecha: '2025-07-30', url: 'https://www.leonardo.com/documents/15646808/0/LDO_Iveco_CS_ENG_30_07_2025.pdf' },
  { id: 13, titulo: 'Thales acquires Imperva for $3.6 billion', editor: 'Help Net Security', tipo: 'Prensa', fecha: '2023-07-25', url: 'https://www.helpnetsecurity.com/2023/07/25/thales-imperva-acquisiton-3-6-billion/' },
  { id: 14, titulo: 'Document d’enregistrement universel 2025 (capital: 205.941.913 acciones, autocartera 464.490)', editor: 'Thales / AMF', tipo: 'Primaria', fecha: '2026-03', url: URD },
];
const D = {
  _estado: 'completa',
  identificacion: {
    nombre: 'Thales S.A.', nombre_corto: 'Thales', ticker: 'HO', isin: 'FR0000121329', mercado: 'Euronext París', indice_referencia: 'CAC 40',
    pais: 'Francia', pais_iso: 'FR', sector: 'Industria', industria: 'Aeroespacial y defensa', sede: 'Meudon (Francia)', fundacion: '1968', empleados: 85000, web: 'www.thalesgroup.com',
    precio: 224.7, fecha_precio: '2026-10-14', acciones: 205.48, capitalizacion_publicada: null, free_float_pct: 43.6,
    max_52s: bolsa.identificacion.max_52s, min_52s: bolsa.identificacion.min_52s, volumen_medio_diario: `≈ ${bolsa.volumen_3m.importe_dia_millones.toFixed(1).replace('.', ',')} M EUR/día (3 meses)`, proximos_resultados: '2026-10-22',
  },
  consenso: {
    estimaciones: [
      { periodo: '2026e', ingresos: 23703, ebitda: null, ebit: 2995, bpa: 10.53, dpa: 4.27, fuente: 'Consenso de la empresa a 15-jul-2026 (16 casas; BPA y EBIT ajustados) [D2]; DPA de MarketScreener [D3]' },
      { periodo: '2027e', ingresos: 25659, ebitda: null, ebit: 3370, bpa: 12.2, dpa: 4.91, fuente: 'Consenso de la empresa a 15-jul-2026 [D2]; DPA de MarketScreener [D3]' },
      { periodo: '2028e', ingresos: 27869, ebitda: null, ebit: 3796, bpa: 13.97, dpa: 5.57, fuente: 'Consenso de la empresa a 15-jul-2026 [D2]; DPA de MarketScreener [D3]' },
    ],
    recomendaciones: { n_analistas: 18, comprar: null, mantener: null, vender: null, po_medio: 293.61, po_min: null, po_max: null },
    base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: 0.9,
    confianza: 'Media',
  },
  bolsa: { ...bolsa.bolsa, posicion_corta_pct: null, confianza: 'Alta' },
  multiplos_historicos: {
    serie: bolsa.cierres_ejercicio.filter((c) => +c.anio >= 2020).map((c) => ({ anio: c.anio, precio_cierre: c.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    confianza: 'Alta',
  },
  comparables: { empresas: comps.empresas, confianza: 'Media' },
  transacciones: {
    operaciones: [
      { fecha: '2023-08', objetivo: 'Ball Aerospace (sistemas espaciales y de defensa, EE. UU.)', comprador: 'BAE Systems', ev: 5000, ev_ventas: null, ev_ebitda: 19.6, prima_pct: null, excluir: false, comentario: 'Precio de 5.600 M USD; 19,6 veces el EBITDA comparable de los últimos 12 meses según el vendedor [D7].' },
      { fecha: '2022-12', objetivo: 'Aerojet Rocketdyne (motores de misiles, EE. UU.)', comprador: 'L3Harris', ev: 4196, ev_ventas: null, ev_ebitda: 16.5, prima_pct: 37, excluir: false, comentario: '4.700 M USD con deuda neta; 16,5 veces el EBITDA ajustado; prima del 37 % [D8].' },
      { fecha: '2021-08', objetivo: 'Meggitt (componentes aeroespaciales y de defensa, Reino Unido)', comprador: 'Parker Hannifin', ev: 8416, ev_ventas: null, ev_ebitda: 16.3, prima_pct: 70.5, excluir: false, comentario: 'EV de 7.100 M GBP, 16,3 veces el EBITDA de 2019; prima del 70,5 % [D9].' },
      { fecha: '2023-12', objetivo: 'ESG Elektroniksystem- und Logistik (electrónica de defensa, Alemania)', comprador: 'Hensoldt', ev: 730, ev_ventas: 2.21, ev_ebitda: 14.0, prima_pct: null, excluir: false, comentario: 'Unas 14 veces el EBITDA 2024e antes de sinergias [D10].' },
      { fecha: '2025-01', objetivo: 'Hispasat (89,68 %; operador de satélites, España)', comprador: 'Indra', ev: 966, ev_ventas: 3.49, ev_ebitda: 6.9, prima_pct: null, excluir: false, comentario: 'Operador de satélites, no fabricante: múltiplo de infraestructura [D11].' },
      { fecha: '2025-07', objetivo: 'Iveco Defence Vehicles y Astra (vehículos militares, Italia)', comprador: 'Leonardo', ev: 1700, ev_ventas: 1.5, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'EV/EBIT de 15,7 veces; EBITDA no publicado [D12].' },
      { fecha: '2023-07', objetivo: 'Imperva (ciberseguridad, EE. UU.)', comprador: 'Thales', ev: 3270, ev_ventas: 6.1, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '6,1 veces las ventas de 2024e [D13].' },
    ],
    confianza: 'Media',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'consenso', campo: 'reparto de recomendaciones y objetivos máximo y mínimo', tipo: 'Complemento', intentos: '1) MarketScreener (solo media y número); 2) consenso de la empresa (sin objetivos); 3) Stock Analysis (sin desglose fiable)', decision: 'Omitido' },
    { seccion: 'bolsa', campo: 'posición corta', tipo: 'Complemento', intentos: '1) AMF (registro de posiciones cortas netas: sin posiciones publicadas por encima del 0,5 %); 2) Stock Analysis; 3) prensa', decision: 'Omitido' },
  ],
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Foro de Thales (HO) en Boursorama: hilos de julio a octubre de 2026', editor: 'Boursorama', tipo: 'Foros y redes', fecha: '2026-10-14', url: 'https://www.boursorama.com/bourse/forum/1rPHO/' },
  { id: 2, titulo: 'Défense européenne : Bernstein passe le secteur au crible', editor: 'Option Finance / Tradingsat', tipo: 'Prensa', fecha: '2026-09-29', url: 'https://www.tradingsat.com/thales-FR0000121329/actualites/thales-defense-europeenne-bernstein-passe-le-secteur-au-crible-1170932.html' },
  { id: 3, titulo: 'Idéal Investisseur: crónicas de la acción de Thales (rebaja de UBS de 390 a 330 EUR; prima geopolítica que se desinfla)', editor: 'Idéal Investisseur', tipo: 'Prensa', fecha: '2026-07-20', url: 'https://www.ideal-investisseur.fr/en/stock-news/thales-shares-drop-3-and-mark-the-lowest-point-on-the-cac-40/22434.html' },
];
const E = {
  _estado: 'completa',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Empeora',
    revisadas: [
      { plataforma: 'Boursorama (foro de Thales)', fecha: '2026-10', n_comentarios: 230, tono: 'Dividido', resumen: 'Unos 40 hilos de julio a octubre: frustración por las rachas de caídas («13 sesiones de baja», «¿por qué baja sin lógica?», «desamor»), dudas por las elecciones presidenciales de 2027 y peticiones de «grandes contratos»; a la vez, objetivos de 300-330 EUR y compras en las caídas [E1].' },
      { plataforma: 'Prensa bursátil francesa (comentarios y crónicas)', fecha: '2026-09', n_comentarios: 20, tono: 'Negativo', resumen: 'Bernstein rebaja el objetivo de 290 a 250 EUR (mantiene Comprar) y ve la caída como oportunidad táctica, con más cautela a largo plazo [E2]; UBS había rebajado de 390 a 330 EUR en julio [E3].' },
    ],
    temas: [
      { tema: 'La prima geopolítica se desinfla (paz en Ucrania, rotación fuera de defensa)', postura: 'Bajista', peso: 'Alto', contraste: null },
      { tema: 'Presidenciales de 2027 y presupuesto francés de defensa', postura: 'Bajista', peso: 'Medio', contraste: null },
      { tema: 'Grandes contratos (Rafale para India, Suecia, Oriente Medio)', postura: 'Alcista', peso: 'Medio', contraste: null },
      { tema: 'Objetivos de los analistas muy por encima del precio', postura: 'Alcista', peso: 'Medio', contraste: null },
    ],
    confianza: 'Baja',
  },
  fuentes: fE,
  huecos: [
    { seccion: 'sentimiento', campo: 'foros en inglés (Reddit, Seeking Alpha, Stocktwits)', tipo: 'Complemento', intentos: '1) Reddit (403 en este entorno); 2) Stocktwits (sin flujo de HO.PA); 3) Seeking Alpha (THLLY, poco debate)', decision: 'Omitido' },
  ],
};
guarda('E', E);
console.log('Notas A-E escritas');
