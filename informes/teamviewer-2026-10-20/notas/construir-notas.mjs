// Notas A-E de TeamViewer SE (Xetra TMV, Yahoo TMV.DE). Corte 2026-10-20 (martes; sesión abierta: último cierre, 19-oct, 7,01 EUR).
// Cifras en millones de EUR, NIIF-UE, ejercicio a 31 de diciembre. filings.xbrl.org no tiene a TeamViewer (cuentas.mjs --esef: «Sin informes
// ESEF con xBRL-JSON para 529900H0PCNFHOO96547»): las cuentas salen del Geschäftsbericht 2025 (PDF oficial, páginas 133-135) para 2024-2025
// y de las notas de resultados anuales con estados completos (EQS) para 2021-2023. Semestre: nota y estado trimestral del 2T26 (28-jul-2026).
// Notas escritas por el analista, sin subagentes. Ejecutar: node informes/teamviewer-2026-10-20/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const lee = (f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
const bolsa = lee('bolsa.json');
const yd = lee('yahoo-datos.json');
const r1 = (x) => (x == null || !isFinite(x) ? null : Math.round(x * 10) / 10);
const r2 = (x) => (x == null || !isFinite(x) ? null : Math.round(x * 100) / 100);
const BG = 'https://app.boersengefluester.de/en/newswire/DE000A2YN900/teamviewer-se';

// ================================================================ A. Cuentas
const fA = [
  { id: 1, titulo: 'Geschäftsbericht 2025 (informe anual con cuentas consolidadas NIIF-UE, notas, informe de gestión, declaración de gobierno corporativo e informe de remuneraciones; PwC)', editor: 'TeamViewer SE', tipo: 'Primaria', fecha: '2026-03-18', url: 'https://ir-api.eqs.com//media/document/82a3641a-6647-41ac-b435-f7a47fa71aeb/assets/DE000A2YN900-JA-2025-EQ-D-00.pdf' },
  { id: 2, titulo: 'Q2 2026 Press Release and Quarterly Statement (cuenta, balance y flujos del 2T26 y del 1S26, sin auditar)', editor: 'TeamViewer SE (EQS)', tipo: 'Primaria', fecha: '2026-07-28', url: `${BG}/dex-turnaround-and-teamviewer-one-platform-momentum-full-year-guidance-reaffirmed-2372290` },
  { id: 3, titulo: 'Q1 2026 Press Release and Quarterly Statement', editor: 'TeamViewer SE (EQS)', tipo: 'Primaria', fecha: '2026-05-06', url: `${BG}/revenue-in-line-with-expectations-enterprise-arr-up-8-cc-full-year-2026-guidance-reaffirmed-2321952` },
  { id: 4, titulo: 'Q4/FY 2025 Press Release: «TeamViewer delivered on FY 2025 pro forma guidance…» (previsión 2026 y objetivos a medio plazo)', editor: 'TeamViewer SE (EQS)', tipo: 'Primaria', fecha: '2026-02-10', url: 'https://www.eqs-news.com/news/corporate-news/teamviewer-erfuellt-pro-forma-prognose-fuer-geschaeftsjahr-2025-starkes-8-wachstum-des-bereinigte-ebitda-bereinigte-ebitda-marge-von-44-3/e2f8c1f9-341a-488f-b5fd-e80c863e42be_en' },
  { id: 5, titulo: 'Q3 2025 Press Release and Quarterly Statement', editor: 'TeamViewer SE (EQS)', tipo: 'Primaria', fecha: '2025-10-22', url: `${BG}/teamviewer-continues-to-deliver-arr-and-revenue-growth-yoy-with-46-adj-ebitda-margin-2216490` },
  { id: 6, titulo: 'EQS-Adhoc: «TeamViewer discloses Q3 2025 results and updates FY 2025 pro forma guidance» (rebaja del ARR 2025 y de los ingresos 2026)', editor: 'TeamViewer SE (EQS)', tipo: 'Primaria', fecha: '2025-10-21', url: `${BG}/teamviewer-discloses-q3-2025-results-and-updates-fy-2025-pro-forma-guidance-2216474` },
  { id: 7, titulo: 'Q4/FY 2023 Press Release con estados consolidados 2023 y 2022 («TeamViewer delivers double-digit topline growth…»)', editor: 'TeamViewer SE (EQS, copia en webdisclosure)', tipo: 'Primaria', fecha: '2024-02-07', url: 'https://webdisclosure.com/press-release/cannapreneur-partners-etr-teamviewer-delivers-double-digit-topline-growth-strong-margin-and-81-basic-eps-increase-6y47JVehFKC' },
  { id: 8, titulo: 'Q4/FY 2022 Press Release con estados consolidados 2022 y 2021 («TeamViewer delivers on 2022 targets…»)', editor: 'TeamViewer SE (EQS, copia en webdisclosure)', tipo: 'Primaria', fecha: '2023-02-07', url: 'https://webdisclosure.com/press-release/cannapreneur-partners-etr-teamviewer-delivers-on-2022-targets-and-increases-earnings-per-share-by-46-ghKpFwerUpq' },
];

// Cuenta [A1, A7, A8]. gastos_generales = marketing + ventas + administración. no_recurrentes_en_ebitda = EBITDA ajustado de TeamViewer
// − EBITDA publicado − pagos en acciones (los pagos en acciones se quedan como coste recurrente): 2022 4,7; 2023 16,8; 2024 27,5 (costes
// de la compra de 1E y litigios); 2025 7,5 (integración de 1E) [A1, A7]. 2021: el EBITDA ajustado se medía sobre la facturación, sin dato
// comparable (null).
const C = [
  // periodo, ingresos, coste_ventas, gg, amort, ebit, ebitda, nr, rf, bai, imp, neto, gf, bpa, acc
  ['2021', 501.1, 70.9, 236.8, 50.9, 117.4, 168.3, null, -32.0, 85.4, 35.3, 50.1, 19.2, 0.25, 200.6],
  ['2022', 565.9, 81.3, 281.0, 53.7, 143.7, 197.5, 4.7, -27.0, 116.7, 49.1, 67.6, 25.8, 0.37, 185.1],
  ['2023', 626.7, 81.7, 294.8, 55.4, 166.6, 221.9, 16.8, -19.1, 147.5, 33.4, 114.0, 16.9, 0.66, 173.0],
  ['2024', 671.4, 80.8, 284.3, 46.2, 206.4, 252.6, 27.5, -21.9, 184.5, 61.4, 123.1, 17.5, 0.76, 161.3],
  ['2025', 746.8, 101.2, 297.5, 53.8, 252.6, 306.4, 7.5, -71.7, 180.9, 62.7, 118.2, 39.6, 0.75, 158.0],
];
const cuenta = C.map(([periodo, ingresos, coste_ventas, gastos_generales, amortizaciones, ebit, ebitda, nr, rf, bai, imp, neto, gf, bpa, acc]) => ({
  periodo, ingresos, coste_ventas, gastos_generales, ebitda, amortizaciones, ebit, resultado_financiero: rf, bai, impuestos: imp, minoritarios: 0,
  beneficio_neto: neto, gastos_financieros: gf, participadas_en_ebitda: null, no_recurrentes_en_ebitda: nr, bpa, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: acc,
}));

// Balance [A1, A7, A8]. pasivos_contrato = ingresos diferidos corrientes + no corrientes (la empresa factura por adelantado: lección SAP).
// deuda_financiera 2024-2025 = préstamos y Schuldschein (nota 16); arrendamientos = pasivos NIIF 16 (nota 16: 29,0 y 33,1). 2021-2023:
// las notas de resultados no separan los arrendamientos: toda la deuda financiera en deuda_financiera y arrendamientos 0 (la deuda neta no cambia).
const B = [
  // periodo, AT, AC, PC, PT, FC, intang, inmov, clientes, prov, pas_contrato, caja, deuda, arr, PN, reservas
  ['2021', 1546.7, 576.6, 337.1, 1226.6, 667.2, 248.2, 45.5, 11.6, 7.3, 250.6, 550.5, 877.5, 0, 320.1, -276.8],
  ['2022', 1172.7, 209.1, 474.3, 1057.4, 667.9, 212.9, 50.3, 18.3, 8.9, 312.3, 161.0, 632.6, 0, 115.3, -209.2],
  ['2023', 1111.5, 159.5, 511.8, 1027.9, 667.7, 175.7, 43.3, 22.0, 8.0, 356.2, 72.8, 529.4, 0, 83.7, -95.2],
  ['2024', 1070.3, 134.3, 548.0, 969.9, 668.1, 149.0, 41.5, 30.2, 15.8, 381.2, 55.3, 415.7, 29.0, 100.5, 27.9],
  ['2025', 1675.8, 123.7, 842.5, 1510.9, 1115.5, 343.9, 44.9, 27.5, 11.2, 384.0, 41.6, 909.9, 33.1, 164.9, 146.1],
];
const balHist = B.map(([periodo, activo_total, activo_corriente, pasivo_corriente, pasivo_total, fondo_comercio, intangibles, inmovilizado_material, clientes, proveedores, pasivos_contrato, caja, deuda_financiera, arrendamientos, patrimonio_neto, reservas]) => ({
  periodo, activo_total, activo_corriente, pasivo_corriente, pasivo_total, fondo_comercio, intangibles, inmovilizado_material, existencias: 0, clientes, proveedores,
  activos_contrato: null, pasivos_contrato, caja, deuda_financiera, arrendamientos, patrimonio_neto, minoritarios: 0, reservas,
}));

// Flujos [A1, A7, A8]. Intereses pagados en financiación (TeamViewer los clasifica ahí). Recompras = compra de acciones propias.
const F = [
  ['2021', 194.0, 15.2, 6.9, 23.4, 0, 0, 0, 0, 14.1],
  ['2022', 204.3, 8.8, 9.5, 2.0, 0, 0, 300.1, 0, 14.2],
  ['2023', 229.9, 5.6, 11.1, 8.1, 0, 0, 161.9, 0, 14.4],
  ['2024', 249.2, 5.4, 12.5, 0, 0, 0, 137.7, 0, 19.2],
  ['2025', 233.0, 5.8, 12.6, 682.5, 0, 0, 0, 0, 33.8],
];
const flujosHist = F.map(([periodo, flujo_operativo, capex, pagos_arrendamientos, adquisiciones, desinversiones, dividendos, recompras, emision_acciones, intereses_en_financiacion]) => ({
  periodo, flujo_operativo, capex, pagos_arrendamientos, adquisiciones, desinversiones, dividendos, recompras, emision_acciones, intereses_en_financiacion,
}));

const A = {
  _estado: 'completa',
  financieros: {
    cuenta,
    // LTM jun-26 = 2025 + 1S26 − 1S25 [A1, A2]: ingresos 746,8 + 365,9 − 364,4; EBITDA 306,4 + 145,7 − 144,4; EBIT 252,6 + 119,1 − 117,1;
    // neto 118,2 + 64,3 − 52,2; BPA 0,75 + 0,41 − 0,33. FCF: FCFE ajustado de la empresa 208,3 + 64,6 − 104,0 [A1, A2].
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 748.3, ebitda: 307.7, ebit: 254.6, beneficio_neto: 130.3, bpa: 0.83, dpa: 0, dpa_extraordinario: 0, fcf: 168.9, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 7.5 },
    cambios_perimetro: [{ periodo: '2025', descripcion: '1E (Reino Unido, gestión de la experiencia digital del empleado, DEX) consolidada desde el 31-ene-2025: 682,5 M pagados en caja; fondo de comercio de 668,1 a 1.115,5 M e intangibles de 149,0 a 343,9 M [A1]. Las cifras pro forma de la empresa (767,5 M de ingresos 2025) incluyen enero y anulan el «haircut» contable; las del informe son las NIIF (746,8 M).' }],
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '1T25', ingresos: 178.8, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 66.6, margen_ebitda_pct: r1(66.6 / 178.8 * 100), bpa: 0.19, vs_consenso: null },
      { periodo: '2T25', ingresos: 185.6, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 77.9, margen_ebitda_pct: r1(77.9 / 185.6 * 100), bpa: 0.14, vs_consenso: null },
      { periodo: '3T25', ingresos: 189.5, crecimiento_pct: null, crecimiento_organico_pct: 4.0, ebitda: 79.5, margen_ebitda_pct: r1(79.5 / 189.5 * 100), bpa: 0.18, vs_consenso: 'Inferior' },
      { periodo: '4T25', ingresos: 192.9, crecimiento_pct: null, crecimiento_organico_pct: 2.0, ebitda: 82.5, margen_ebitda_pct: r1(82.5 / 192.9 * 100), bpa: 0.24, vs_consenso: null },
      { periodo: '1T26', ingresos: 183.2, crecimiento_pct: r1((183.2 / 178.8 - 1) * 100), crecimiento_organico_pct: -0.4, ebitda: 75.1, margen_ebitda_pct: r1(75.1 / 183.2 * 100), bpa: 0.22, vs_consenso: 'En línea' },
      { periodo: '2T26', ingresos: 182.75, crecimiento_pct: r1((182.75 / 185.63 - 1) * 100), crecimiento_organico_pct: -1.4, ebitda: 70.6, margen_ebitda_pct: r1(70.6 / 182.75 * 100), bpa: 0.19, vs_consenso: null },
    ],
    confianza: 'Media',
  },
  balance: {
    historico: balHist,
    // Nominal a 31-dic-2025 [A1, p. 46]: 2026: DCM Bridge 145 + préstamo del mercado monetario 8 + Schuldschein 2021 193; 2027: Schuldschein 2024
    // 48,5; 2028: Schuldschein 13 + colocación privada 15; 2029: préstamo a plazo 225 + línea revolvente 185 + Schuldschein 51,5; 2030: 15; 2031: 9.
    vencimientos: [{ anio: '2026', importe: 346.0 }, { anio: '2027', importe: 48.5 }, { anio: '2028', importe: 28.0 }, { anio: '2029', importe: 461.5 }, { anio: '2030', importe: 15.0 }, { anio: '2031+', importe: 9.0 }],
    liquidez: 'Caja 39,6 M a 30-jun-2026 [A2] + parte no dispuesta de la línea revolvente sindicada (hasta 525 M; 185 M dispuestos a 31-dic-2025) [A1]; en el 2T26 se amplió hasta 2031 la línea revolvente de 75 M, se firmó un préstamo bilateral de 40 M y se lanzó un Schuldschein nuevo [A2].',
    rating: 'Sin rating',
    coste_deuda_pct: 4.6,
    vida_media_anios: null,
    confianza: 'Alta',
  },
  flujos: { historico: flujosHist, confianza: 'Alta' },
  calidad: { auditor: 'PricewaterhouseCoopers GmbH WPG', anios_auditor: null, opinion: 'Favorable (sin salvedades) para 2025', confianza: 'Media' },
  negocio: {
    // Monosegmento: ingresos por grupo de clientes [A7, A1, A4]. 2022-2023 reexpresados por la empresa [A7]; 2024 = TeamViewer sin 1E
    // (ENT pro forma 219,7 − ajuste pro forma 68,5) [A1, A4]; 2025 = ENT pro forma 240,2 − «haircut» y enero de 1E 20,8 (estimación propia: el
    // ajuste pro forma es todo de 1E, que es Enterprise) y SMB 527,3 [A1, A4].
    segmentos: [
      { nombre: 'SMB (clientes con ARR < 10.000 EUR)', descripcion: 'Pequeñas y medianas empresas, autónomos y equipos de TI: licencias por suscripción de TeamViewer Remote, Tensor básico y complementos; venta sobre todo en la tienda web.', tipo_resultado: null, historico: [{ periodo: '2022', ingresos: 467.2, resultado: null }, { periodo: '2023', ingresos: 504.6, resultado: null }, { periodo: '2024', ingresos: 520.2, resultado: null }, { periodo: '2025', ingresos: 527.3, resultado: null }] },
      { nombre: 'Enterprise (ARR ≥ 10.000 EUR)', descripcion: 'Grandes cuentas: Tensor, DEX (1E), Frontline (realidad aumentada para trabajadores de campo), TeamViewer ONE y acuerdos plurianuales.', tipo_resultado: null, historico: [{ periodo: '2022', ingresos: 98.6, resultado: null }, { periodo: '2023', ingresos: 122.1, resultado: null }, { periodo: '2024', ingresos: 151.2, resultado: null }, { periodo: '2025', ingresos: 219.5, resultado: null }] },
    ],
    geografias: [{ nombre: 'EMEA', peso_pct: 53.3 }, { nombre: 'Américas', peso_pct: 36.9 }, { nombre: 'Asia-Pacífico', peso_pct: 9.8 }],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'ARR (M EUR)', valor_anterior: '759,1 (jun-25)', valor_actual: '736,8 (jun-26)', variacion: '−2,9 % (−0,1 % a tipo constante)', comentario: 'Plano a tipo constante: Enterprise +8,3 %, SMB −3,6 % [A2].' },
      { kpi: 'ARR Enterprise (M EUR)', valor_anterior: '227,1', valor_actual: '235,5', variacion: '+3,7 % (+8,3 % cc)', comentario: 'Con 8 M de bajas puntuales de 1E absorbidas en el 1T26 [A3, A2].' },
      { kpi: 'ARR SMB (M EUR)', valor_anterior: '532,0', valor_actual: '501,4', variacion: '−5,8 % (−3,6 % cc)', comentario: 'Cuentas < 1.500 EUR −7,0 % cc tras retirar las subidas de precio de 2025 [A2].' },
      { kpi: 'Clientes (miles)', valor_anterior: '656,4', valor_actual: '611,9', variacion: '−7 %', comentario: 'Pérdida de clientes pequeños; Enterprise sube a 5.311 [A2].' },
      { kpi: 'NRR total (cc)', valor_anterior: '97 %', valor_actual: '93 %', variacion: '−4 pp', comentario: 'Los clientes existentes gastan un 7 % menos que hace un año [A2].' },
      { kpi: 'Margen EBITDA ajustado', valor_anterior: '44,1 % (2T25)', valor_actual: '43,2 % (2T26)', variacion: '−0,9 pp', comentario: '44,4 % sin el efecto divisa [A2].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    adquisiciones: [
      { anio: '2025', objetivo: '1E (Reino Unido; DEX para grandes empresas)', importe: 682.5, ev_ebitda: null, financiacion: 'Deuda: préstamo puente DCM 145 M, préstamo a plazo 225 M, línea revolvente y colocaciones privadas [A1]', resultado: 'Bajas de clientes del sector público de EE. UU. (DOGE) y fricciones comerciales: causa principal de la rebaja de octubre de 2025; 8 M de ARR perdidos en el 1T26; recuperación desde el 2T26 según la empresa (bajas en mínimos desde la compra) [A6, A3, A2]. Sin deterioro del fondo de comercio en 2025 [A1].' },
      { anio: '2021', objetivo: 'Xaleon (Australia) y otras compras pequeñas', importe: 23.4, ev_ebitda: null, financiacion: 'Caja', resultado: 'Integradas en el negocio Enterprise [A8].' },
    ],
    confianza: 'Media',
  },
  fuentes: fA,
  huecos: [
    { seccion: 'trimestres', campo: 'vs_consenso (1T25, 2T25, 4T25, 2T26)', tipo: 'Complemento', intentos: '1) notas de resultados de la empresa (no publican consenso); 2) prensa dpa-AFX y boerse-express; 3) Yahoo y MarketScreener (solo el consenso vigente)', decision: 'Omitido' },
    { seccion: 'balance', campo: 'arrendamientos 2021-2023 separados de la deuda', tipo: 'Complemento', intentos: '1) notas de resultados anuales 2022-2023 (no separan); 2) informe anual 2025 (solo 2024-2025); 3) cálculo a partir del inmovilizado: no fiable', decision: 'Omitido: toda la deuda financiera en deuda_financiera (la deuda neta no cambia)' },
  ],
};
guarda('A', A);

// ================================================================ B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Remote Desktop Software Market Outlook (tamaño 2025: 4.100 M USD; TCAC 14,7 % hasta 2034)', editor: 'Research and Markets', tipo: 'Sectorial', fecha: '2026', url: 'https://www.researchandmarkets.com/reports/6185692/remote-desktop-software-market-outlook-market' },
  { id: 2, titulo: 'Remote Desktop Software Global Market Report (3.110 M USD en 2025; 7.240 M en 2030)', editor: 'The Business Research Company (vía GII)', tipo: 'Sectorial', fecha: '2026', url: 'https://www.giikorea.co.kr/report/tbrc1977384-remote-desktop-software-global-market-report.html' },
  { id: 3, titulo: 'Enterprise Digital Employee Experience Management Tools Market (1.655 M USD en 2025; TCAC 11,6 %)', editor: 'Intel Market Research', tipo: 'Sectorial', fecha: '2026', url: 'https://www.intelmarketresearch.com/enterprise-digital-employee-experience-management-tools-market-55919' },
  { id: 4, titulo: 'TeamViewer and ServiceNow launch strategic partnership to accelerate autonomous IT operations', editor: 'TeamViewer SE', tipo: 'Primaria', fecha: '2026-07-23', url: 'https://www.teamviewer.com/hu/global/company/press/2026/teamviewer-servicenow-launch-strategic-partnership-accelerate-autonomous-it-operations/' },
  { id: 5, titulo: '«TeamViewer und Aumovio geraten in den Sog der KI-Ängste» (Bernstein incluye a TeamViewer entre los valores europeos expuestos a la sustitución por IA)', editor: 'stock3 / dpa-AFX', tipo: 'Prensa', fecha: '2026-02-17', url: 'https://stock3.com/news/teamviewer-und-aumovio-geraten-in-den-sog-der-ki-aengste-16934653' },
  { id: 6, titulo: 'Geschäftsbericht 2025: Grundlagen des Konzerns, Chancen- und Risikobericht', editor: 'TeamViewer SE', tipo: 'Primaria', fecha: '2026-03-18', url: 'https://ir-api.eqs.com//media/document/82a3641a-6647-41ac-b435-f7a47fa71aeb/assets/DE000A2YN900-JA-2025-EQ-D-00.pdf' },
  { id: 8, titulo: 'Q2 2026 Press Release and Quarterly Statement (ARR, clientes, NRR, márgenes)', editor: 'TeamViewer SE (EQS)', tipo: 'Primaria', fecha: '2026-07-28', url: `${BG}/dex-turnaround-and-teamviewer-one-platform-momentum-full-year-guidance-reaffirmed-2372290` },
  { id: 7, titulo: 'Yahoo Finance, ficha de N-able (ingresos y margen EBITDA de los últimos 12 meses)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/NABL/' },
];
const nabl = yd.datos.NABL;
const B_ = {
  _estado: 'completa',
  sector: {
    tamano: '≈ 3.100-4.100 M USD en 2025 el software de acceso remoto (The Business Research Company y Research and Markets) [B2, B1], más 1.655 M USD de herramientas de DEX para empresas [B3]',
    unidad_serie: 'millones de USD',
    serie: [{ anio: '2025', tamano: 3110 }, { anio: '2030e', tamano: 7240 }],
    tcac_historico_pct: null,
    tcac_previsto_pct: 18.6,
    cr5_pct: null,
    estructura: 'Moderadamente concentrada',
    drivers: [
      { driver: 'Parque de dispositivos y trabajo híbrido', efecto: '+', horizonte: 'Estructural', evidencia: '600.000 clientes de pago y más de 2.500 millones de instalaciones de TeamViewer [B6].' },
      { driver: 'Agentes de IA que resuelven incidencias sin sesión remota humana', efecto: '−', horizonte: 'Estructural', evidencia: 'Bernstein la puso en febrero de 2026 en su lista de valores europeos expuestos a la sustitución por IA; la acción marcó 4,81 EUR el 17-feb [B5].' },
      { driver: 'Herramientas gratuitas o incluidas en paquetes (Microsoft Quick Assist, Intune Remote Help)', efecto: '−', horizonte: 'Estructural', evidencia: 'Presión sobre las cuentas pequeñas: el ARR SMB < 1.500 EUR cae un 7,0 % a tipo constante [B8].' },
      { driver: 'Consolidación de proveedores en plataformas (gestión autónoma de dispositivos)', efecto: '+', horizonte: 'Estructural', evidencia: 'TeamViewer ONE y acuerdo con ServiceNow (paquete para sus clientes) [B4].' },
      { driver: 'Gasto en TI y sector público de EE. UU.', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'DOGE y el cierre federal de 43 días frenaron a 1E en 2025 [B6].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 4, justificacion: 'AnyDesk, Splashtop, GoTo, ConnectWise, NinjaOne y Microsoft compiten en precio en SMB; en DEX, Nexthink, Tanium y Riverbed.' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'SMB muy dispersa (607.000 clientes), pero sensible al precio: las subidas de 2025 dispararon las bajas [B8].' },
      { fuerza: 'Poder de los proveedores', intensidad: 1, justificacion: 'Coste de ventas del 13,5 % de los ingresos (nube, pasarelas de pago) [B6].' },
      { fuerza: 'Amenaza de entrada', intensidad: 3, justificacion: 'La conectividad básica es fácil de replicar; la escala, la seguridad y las integraciones no.' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 4, justificacion: 'Agentes de IA y herramientas incluidas en el sistema operativo pueden quitar sesiones de soporte humano [B5].' },
    ],
    ciclo: { posicion: 'Madurez del ciclo' },
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: null,
    posicion: 'Líder en acceso y soporte remoto por ingresos (≈ 747 M EUR en 2025, más que N-able entero) y «Leader» en el cuadrante de Gartner de DEX con 1E [B8]',
    competidores: [
      { nombre: 'N-able (gestión remota de equipos para proveedores de servicios)', pais: 'EE. UU.', ticker: 'NABL', ingresos: r1(nabl.ventas / 1e6 / yd.eurusd), cuota_pct: null, margen_ebit_pct: null, comentario: `Ingresos LTM ≈ ${r1(nabl.ventas / 1e6)} M USD y margen EBITDA del ${r1(nabl.margen_ebitda * 100)} % [B7]; vende a proveedores de servicios gestionados.` },
      { nombre: 'Microsoft (Quick Assist, Intune Remote Help)', pais: 'EE. UU.', ticker: 'MSFT', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Quick Assist viene gratis con Windows; Remote Help, dentro de Intune: el sustituto más directo en cuentas pequeñas.' },
      { nombre: 'AnyDesk', pais: 'Alemania', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Rival directo en SMB, no cotiza, sin cuentas publicadas comparables.' },
      { nombre: 'GoTo (LogMeIn)', pais: 'EE. UU.', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Privada desde 2020; GoTo Resolve y Rescue.' },
      { nombre: 'Nexthink y Tanium (DEX y gestión de dispositivos)', pais: 'Suiza / EE. UU.', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Rivales de 1E en grandes empresas; privadas.' },
      { nombre: 'Splashtop, ConnectWise, NinjaOne', pais: 'EE. UU.', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Rivales de precio en SMB y en proveedores de servicios; privadas.' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Se estrecha',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 2, evidencia: 'Las sesiones conectan a técnicos y usuarios que a menudo ya tienen el cliente instalado (2.500 millones de instalaciones).' },
        { fuente: 'Costes de cambio', puntuacion: 3, evidencia: 'Alto en Enterprise (NRR ajustado 98 %, renovaciones plurianuales de DEX); bajo en SMB (NRR total 93 %, clientes −7 %) [B8].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'Marca conocida en soporte remoto; Gartner e IDC la sitúan como líder en DEX [B8].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Margen bruto recurrente del 92 % y margen EBITDA ajustado del 43-44 % [B8].' },
        { fuente: 'Escala eficiente', puntuacion: 2, evidencia: 'Nicho rentable, pero la conectividad básica la regala Microsoft.' },
      ],
    },
    confianza: 'Media',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'competencia', campo: 'cuota_pct y cr5_pct', tipo: 'Núcleo', intentos: '1) informe anual 2025 (no da cuota); 2) informes de mercado de acceso remoto (cifras de tamaño, no cuotas fiables); 3) cálculo con ingresos de rivales: la mayoría son privados', decision: 'Omitido' },
    { seccion: 'sector', campo: 'serie histórica de tamaño de mercado', tipo: 'Complemento', intentos: '1) Research and Markets (solo 2025 y 2034); 2) TBRC (2025 y 2030); 3) Intel Market Research (DEX, 2025)', decision: 'Omitido: dos puntos' },
  ],
};
guarda('B', B_);

// ================================================================ C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Geschäftsbericht 2025: Erklärung zur Unternehmensführung y Vergütungsbericht 2025', editor: 'TeamViewer SE', tipo: 'Primaria', fecha: '2026-03-18', url: 'https://ir-api.eqs.com//media/document/82a3641a-6647-41ac-b435-f7a47fa71aeb/assets/DE000A2YN900-JA-2025-EQ-D-00.pdf' },
  { id: 2, titulo: 'Einberufung der Hauptversammlung 2026 (orden del día: autorización de recompra de hasta el 10 %)', editor: 'TeamViewer SE', tipo: 'Primaria', fecha: '2026-04-22', url: 'https://www.hauptversammlung.de/fileadmin/public/user_upload/teamviewer_TO26.pdf' },
  { id: 3, titulo: 'EQS-News: Annual General Meeting 2026 of TeamViewer SE: shareholders elect new Supervisory Board member and approve all agenda items with a large majority', editor: 'TeamViewer SE (EQS)', tipo: 'Primaria', fecha: '2026-06-02', url: 'https://www.webdisclosure.com/press-release/cannapreneur-partners-etr-annual-general-meeting-2026-of-teamviewer-se-shareholders-elect-new-supervisory-board-member-and-approve-all-agenda-items-with-a-large-majority-MnxfPPPfzVU' },
  { id: 4, titulo: 'TeamViewer SE: director deals (notificaciones del artículo 19 MAR de los últimos 12 meses)', editor: 'Hargreaves Lansdown', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://www.hl.co.uk/shares/shares-search-results/t/teamviewer-se-npv/director-deals' },
  { id: 5, titulo: '«TeamViewer-Aktie: Management kauft bei Rekordtief»', editor: 'boerse-express', tipo: 'Prensa', fecha: '2025-10-26', url: 'https://www.boerse-express.com/news/articles/teamviewer-aktie-management-kauft-bei-rekordtief-836101' },
  { id: 6, titulo: '«TeamViewer-Aktie: 6,5-Prozent-Sprung auf 6,89 Euro» (Goldman Sachs supera el 5 %; objetivos de DZ Bank y Deutsche Bank)', editor: 'kapitalmarktexperten.de', tipo: 'Prensa', fecha: '2026-08-19', url: 'https://www.kapitalmarktexperten.de/teamviewer-aktie-65-prozent-sprung-auf-689-euro/' },
  { id: 7, titulo: 'Q4/FY 2023 Press Release (cumplimiento de la guía 2023 y guía 2024)', editor: 'TeamViewer SE (EQS)', tipo: 'Primaria', fecha: '2024-02-07', url: 'https://webdisclosure.com/press-release/cannapreneur-partners-etr-teamviewer-delivers-double-digit-topline-growth-strong-margin-and-81-basic-eps-increase-6y47JVehFKC' },
  { id: 8, titulo: 'EQS-Adhoc del 3T25: rebaja de la guía de ARR 2025 y de los ingresos 2026', editor: 'TeamViewer SE (EQS)', tipo: 'Primaria', fecha: '2025-10-21', url: `${BG}/teamviewer-discloses-q3-2025-results-and-updates-fy-2025-pro-forma-guidance-2216474` },
  { id: 9, titulo: 'Q4/FY 2025 Press Release (guía 2026 y objetivos a medio plazo)', editor: 'TeamViewer SE (EQS)', tipo: 'Primaria', fecha: '2026-02-10', url: 'https://www.eqs-news.com/news/corporate-news/teamviewer-erfuellt-pro-forma-prognose-fuer-geschaeftsjahr-2025-starkes-8-wachstum-des-bereinigte-ebitda-bereinigte-ebitda-marge-von-44-3/e2f8c1f9-341a-488f-b5fd-e80c863e42be_en' },
  { id: 10, titulo: 'Q2 2026 Press Release and Quarterly Statement (ARR, clientes, NRR, márgenes)', editor: 'TeamViewer SE (EQS)', tipo: 'Primaria', fecha: '2026-07-28', url: `${BG}/dex-turnaround-and-teamviewer-one-platform-momentum-full-year-guidance-reaffirmed-2372290` },
];
const C_ = {
  _estado: 'completa',
  directivos: {
    equipo: [
      { nombre: 'Oliver Steil', cargo: 'Consejero delegado (CEO)', desde: '2018', participacion_pct: null, trayectoria: 'Socio operativo de Permira antes de TeamViewer; llevó la salida a bolsa de 2019 y la compra de 1E. Mandato hasta octubre de 2028 [C1]. Compró 50.000 acciones a 6,47 EUR el 23-oct-2025 [C4].' },
      { nombre: 'Michael Wilkens', cargo: 'Director financiero (CFO)', desde: '2022', participacion_pct: null, trayectoria: 'CFO desde septiembre de 2022, mandato hasta agosto de 2027 [C1]; financió la compra de 1E con deuda y redujo el apalancamiento de 3,2x a 2,5x [C9]. Compró 10.000 acciones a 6,45 EUR [C4].' },
      { nombre: 'Mark Banfield', cargo: 'Director comercial (CRO)', desde: '2025', participacion_pct: null, trayectoria: 'En el consejo de dirección desde febrero de 2025 (CCO y desde agosto CRO); mandato hasta enero de 2028 [C1].' },
      { nombre: 'Mei Dent', cargo: 'Directora de producto y tecnología (CPTO)', desde: '2023', participacion_pct: null, trayectoria: 'Desde agosto de 2023, mandato hasta diciembre de 2027 [C1]; responsable de TeamViewer ONE y del agente Tia.' },
      { nombre: 'Ralf W. Dieter', cargo: 'Presidente del consejo de supervisión', desde: null, participacion_pct: null, trayectoria: 'Presidente del Aufsichtsrat [C1]; compró 37.000 acciones el 24-oct-2025 [C4].' },
    ],
    historial_guidance: [
      { anio: '2023', guia: 'Ingresos y margen EBITDA ajustado ≥ 40 %', real: 'Ingresos +11 % a 626,7 M; margen 42 % [C7]', cumplida: 'Sí' },
      { anio: '2024', guia: 'Ingresos 660-685 M; margen EBITDA ajustado ≥ 43 %', real: '671,4 M; 44 % [C7, C1]', cumplida: 'Sí' },
      { anio: '2025', guia: 'ARR pro forma 815-840 M; ingresos 778-797 M; margen ≈ 43 %', real: 'ARR 759,7 M (rebajado en octubre a 780-800); ingresos pro forma 767,5 M; margen 44,3 % [C8, C9]', cumplida: 'No' },
      { anio: '2026', guia: 'Octubre de 2025: ingresos 790-825 M (antes 850-870); febrero de 2026: +0-3 % a tipo constante sobre 767,5 M; margen ≈ 43 %', real: '1S26: −0,9 % cc pro forma; margen 44,2 % [C10]', cumplida: 'Parcial' },
    ],
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Ralf W. Dieter', cargo: 'Presidente', tipo: 'Independiente', desde: null, comisiones: 'Nombramientos y retribuciones (vocal)' },
      { nombre: 'Dr. Abraham (Abe) Peled', cargo: 'Vicepresidente', tipo: 'Independiente', desde: null, comisiones: 'Nombramientos y retribuciones (presidente)' },
      { nombre: 'Swantje Conrad', cargo: 'Consejera', tipo: 'Independiente', desde: null, comisiones: 'Auditoría (presidenta)' },
      { nombre: 'Dr. Joachim (Joe) Heel', cargo: 'Consejero', tipo: 'Independiente', desde: null, comisiones: '—' },
      { nombre: 'James Jeffrey (Jeff) Kinder', cargo: 'Consejero', tipo: 'Independiente', desde: null, comisiones: '—' },
      { nombre: 'Axel Salzmann', cargo: 'Consejero', tipo: 'Independiente', desde: null, comisiones: 'Auditoría; nombramientos y retribuciones' },
      { nombre: 'Christina Stercken', cargo: 'Consejera', tipo: 'Independiente', desde: '2023', comisiones: 'Auditoría' },
      { nombre: 'Andrea Euenheim', cargo: 'Consejera', tipo: 'Independiente', desde: '2026', comisiones: null },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 2.42, fijo: 1.06, variable_corto: 1.36, variable_largo: 0, ratio_salario_medio: null },
    accionistas: [
      { nombre: 'Inversores de Norteamérica (agregado)', pct: 28.3, tipo: 'Institucional', variacion: 'Análisis del registro a 31-dic-2025 [C1]' },
      { nombre: 'Accionistas particulares (incluida la dirección)', pct: 20.2, tipo: 'Particulares', variacion: '[C1]' },
      { nombre: 'Brokers y otros', pct: 17.9, tipo: 'Otros', variacion: '[C1]' },
      { nombre: 'Resto de Europa', pct: 16.2, tipo: 'Institucional', variacion: '[C1]' },
      { nombre: 'Alemania', pct: 9.3, tipo: 'Institucional', variacion: '[C1]' },
      { nombre: 'Goldman Sachs', pct: 5.0, tipo: 'Banco (derechos de voto e instrumentos)', variacion: 'Supera el 5 % el 6-ago-2026 [C6]' },
      { nombre: 'Autocartera', pct: 4.0, tipo: 'Autocartera', variacion: '6,53 M de acciones a 31-dic-2025; 6,5 M amortizadas en diciembre de 2025 [C1]' },
    ],
    insiders: [
      { fecha: '2025-10-23', persona: 'Oliver Steil (CEO)', operacion: 'Compra', acciones: 50000, importe: 0.32 },
      { fecha: '2025-10-23', persona: 'Michael Wilkens (CFO)', operacion: 'Compra', acciones: 10000, importe: 0.06 },
      { fecha: '2025-10-23', persona: 'Abraham Peled (vicepresidente del consejo de supervisión)', operacion: 'Compra', acciones: 30000, importe: 0.20 },
      { fecha: '2025-10-24', persona: 'Ralf W. Dieter (presidente del consejo de supervisión)', operacion: 'Compra', acciones: 37000, importe: 0.25 },
      { fecha: '2025-10-24', persona: 'Mark Banfield (CRO)', operacion: 'Compra', acciones: 15000, importe: 0.10 },
      { fecha: '2025-10-24', persona: 'Mei Dent (CPTO)', operacion: 'Compra', acciones: 10000, importe: 0.07 },
    ],
    confianza: 'Media',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'voto_remuneracion_pct (junta de 2026)', tipo: 'Complemento', intentos: '1) nota de la junta del 2-jun-2026 (no da porcentajes); 2) web de inversores ir.teamviewer.com/agm (no abre sin JavaScript); 3) prensa (solo «amplia mayoría»)', decision: 'Omitido' },
    { seccion: 'gobierno', campo: 'participaciones significativas por nombre', tipo: 'Complemento', intentos: '1) informe anual 2025 (solo distribución geográfica); 2) notificaciones de derechos de voto en EQS (solo Goldman Sachs encontrada); 3) Yahoo (instituciones 45,9 %)', decision: 'Omitido salvo Goldman Sachs' },
    { seccion: 'directivos', campo: 'participacion_pct de los directivos', tipo: 'Complemento', intentos: '1) informe de remuneraciones (acciones restringidas a mantener, no tenencia total); 2) Yahoo (insiders 1,9 %); 3) notificaciones MAR (solo compras)', decision: 'Omitido' },
  ],
};
guarda('C', C_);

// ================================================================ D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Yahoo Finance, históricos diarios de TMV.DE, EXS1.DE (DAX) y EXV3.DE (tecnología europea) (herramientas/bolsa.mjs y movimiento.mjs)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/TMV.DE/history/' },
  { id: 2, titulo: 'Yahoo Finance quoteSummary: consenso de BPA y ventas, objetivos y recomendaciones de TeamViewer y datos de los comparables', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/TMV.DE/analysis/' },
  { id: 3, titulo: 'MarketScreener, TeamViewer SE: previsiones financieras 2026-2028 (14 analistas, objetivo medio 7,99 EUR)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://www.marketscreener.com/quote/stock/TEAMVIEWER-SE-66480659/finances/' },
  { id: 4, titulo: 'Rendimiento del Bund a 10 años (serie diaria BBSIS)', editor: 'Deutsche Bundesbank', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://api.statistiken.bundesbank.de/rest/download/BBSIS/D.I.ZAR.ZI.EUR.S1311.B.A604.R10XX.R.A.A._Z._Z.A?format=csv&lang=en' },
  { id: 5, titulo: 'Implied Equity Risk Premiums by month (ERPbymonth.xlsx), octubre de 2026: 4,20 %', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10-01', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 6, titulo: '«TeamViewer Stock Forecast: What to Watch in the Q3 2026 Results» (objetivos de DZ Bank, JPMorgan, Berenberg y Barclays; fecha de resultados)', editor: 'Admiral Markets', tipo: 'Analistas', fecha: '2026-10-12', url: 'https://admiralmarkets.com/education/articles/shares/teamviewer-stock-forecast-q3-2026' },
  { id: 7, titulo: 'Calendario financiero de TeamViewer (3T26 el 03-nov-2026)', editor: 'boersengefluester.de', tipo: 'Datos de mercado', fecha: '2026-10-20', url: `${BG}/dex-turnaround-and-teamviewer-one-platform-momentum-full-year-guidance-reaffirmed-2372290` },
  { id: 8, titulo: 'Noticias de TeamViewer (titulares y fechas de junio a octubre de 2026)', editor: 'boerse-express', tipo: 'Prensa', fecha: '2026-10-20', url: 'https://www.boerse-express.com/boerse/aktie/teamviewer-ag-inh-on+tts-175136296/news' },
  { id: 9, titulo: 'SolarWinds to Be Acquired by Turn/River Capital (18,50 USD por acción, valor empresa 4.400 M USD)', editor: 'SolarWinds', tipo: 'Primaria', fecha: '2025-02-07', url: 'https://www.solarwinds.com/company/newsroom/press-releases/solarwinds-to-be-acquired-by-turn-river-capital' },
  { id: 10, titulo: 'SolarWinds Announces Fourth Quarter and Full Year 2024 Results (ingresos 2024: 796,9 M USD)', editor: 'SolarWinds', tipo: 'Primaria', fecha: '2025-02-12', url: 'https://www.solarwinds.com/company/newsroom/press-releases/solarwinds-announces-fourth-quarter-and-full-year-2024-results' },
  { id: 11, titulo: '«Jamf goes private for $2.2 billion: that’s 3.3x ARR…» (ingresos de 12 meses 666 M USD)', editor: 'SaaStr', tipo: 'Prensa', fecha: '2025-10-29', url: 'https://www.saastr.com/jamf-goes-private-for-2-2-billion-thats-3-3x-arr-why-b2b-can-be-a-long-hard-road' },
  { id: 12, titulo: 'Jamf: múltiplos de la operación con Francisco Partners (EV/EBITDA 14,3x)', editor: 'multiples.vc', tipo: 'Datos de mercado', fecha: '2026-01', url: 'https://multiples.vc/private-comps/jamf' },
  { id: 14, titulo: 'Geschäftsbericht 2025 (precio de compra de 1E, 682,5 M; ingresos pro forma de 1E)', editor: 'TeamViewer SE', tipo: 'Primaria', fecha: '2026-03-18', url: 'https://ir-api.eqs.com//media/document/82a3641a-6647-41ac-b435-f7a47fa71aeb/assets/DE000A2YN900-JA-2025-EQ-D-00.pdf' },
  { id: 13, titulo: '«TeamViewer-Aktie: 6,5-Prozent-Sprung auf 6,89 Euro» (rumor de Silver Lake sobre Workday; objetivos de DZ Bank y Deutsche Bank)', editor: 'kapitalmarktexperten.de', tipo: 'Prensa', fecha: '2026-08-19', url: 'https://www.kapitalmarktexperten.de/teamviewer-aktie-65-prozent-sprung-auf-689-euro/' },
];

// Comparables (Yahoo, 20-oct-2026, en EUR con EURUSD de Yahoo). PER NTM = precio ÷ BPA de los próximos 12 meses (ponderando los dos ejercicios
// estimados por los meses que caen en ellos). El BPA de Yahoo de las estadounidenses es «non-GAAP» (sin pagos en acciones ni amortización de
// compras): su PER sale más bajo que en la base de este informe (que cuenta los pagos en acciones como coste). EV/EBITDA NTM: null (Yahoo no
// da EBITDA estimado y no se mezclan proveedores).
const CORTE = new Date('2026-10-20');
const compsT = ['NABL', 'DBX', 'BOX', 'DOCU', 'QLYS', 'RPD', 'TENB', 'FRSH'];
const paises = { NABL: 'US', DBX: 'US', BOX: 'US', DOCU: 'US', QLYS: 'US', RPD: 'US', TENB: 'US', FRSH: 'US' };
const empresas = compsT.map((t) => {
  const x = yd.datos[t];
  const fx = x.divisa === 'USD' ? 1 / yd.eurusd : 1;
  const y0 = x.trend.find((r) => r.periodo === '0y'); const y1 = x.trend.find((r) => r.periodo === '+1y');
  const meses0 = Math.max(0, Math.min(12, (new Date(y0.fin) - CORTE) / (30.44 * 864e5)));
  const w0 = meses0 / 12; const w1 = 1 - w0;
  const bpaNtm = w0 * y0.bpa + w1 * y1.bpa;
  const ventasNtm = w0 * y0.ventas + w1 * y1.ventas;
  return {
    nombre: x.nombre.replace(/, Inc\.| Inc\.| Holdings/g, ''), ticker: t, pais: paises[t],
    capitalizacion: Math.round(x.cap * fx / 1e6), ev_ventas: r2(x.ev / x.ventas), ev_ebitda_ltm: r1(x.ev / x.ebitda), ev_ebitda_ntm: null,
    per_ntm: r1(x.precio / bpaNtm), crecimiento_pct: r1((ventasNtm / x.ventas - 1) * 100), margen_ebitda_pct: r1(x.margen_ebitda * 100), roic_pct: null,
    dn_ebitda: r2((x.deuda - x.caja) / x.ebitda), fcf_yield_pct: r1(x.fcf / x.cap * 100),
  };
});
const tmv = yd.datos['TMV.DE'];
const b = bolsa.identificacion;
const D = {
  _estado: 'completa',
  identificacion: {
    nombre: 'TeamViewer SE', nombre_corto: 'TeamViewer', ticker: 'TMV', isin: 'DE000A2YN900', mercado: 'Xetra (Fráncfort, Prime Standard)', indice_referencia: 'SDAX y TecDAX (salió del MDAX en marzo de 2026)',
    pais: 'Alemania', pais_iso: 'DE', sector: 'Tecnologías de la información', industria: 'Software', sede: 'Göppingen (Alemania)', fundacion: '2005', empleados: 1925, web: 'https://www.teamviewer.com',
    precio: b.precio, fecha_precio: b.fecha_precio, acciones: 158.4, capitalizacion_publicada: Math.round(tmv.cap / 1e6), free_float_pct: 100.0,
    max_52s: b.max_52s, min_52s: b.min_52s, volumen_medio_diario: `≈ ${String(bolsa.volumen_3m.importe_dia_millones).replace('.', ',')} M EUR/día (3 meses)`, proximos_resultados: '2026-11-03',
  },
  consenso: {
    estimaciones: [
      { periodo: '2026e', ingresos: 759.3, ebitda: 327.6, ebit: 247.4, bpa: 0.84, dpa: 0, fuente: 'MarketScreener (BPA NIIF; EBITDA ajustado) [D3]; Yahoo: BPA 1,02 de 12 analistas, base mixta [D2]' },
      { periodo: '2027e', ingresos: 784.9, ebitda: 338.8, ebit: 262.2, bpa: 0.95, dpa: 0, fuente: 'MarketScreener [D3]; Yahoo 1,10 [D2]' },
      { periodo: '2028e', ingresos: 817.4, ebitda: 344.2, ebit: 274.5, bpa: 1.00, dpa: 0, fuente: 'MarketScreener [D3]' },
    ],
    recomendaciones: { n_analistas: 14, comprar: 7, mantener: 7, vender: 0, po_medio: 7.99, po_min: 5.70, po_max: 13.00 },
    base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: 2.0,
    confianza: 'Media',
  },
  bolsa: {
    ...bolsa.bolsa,
    posicion_corta_pct: null,
    contexto: null,
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: bolsa.cierres_ejercicio.filter((c) => +c.anio >= 2021).map((c) => ({ anio: c.anio, precio_cierre: c.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    confianza: 'Alta',
  },
  comparables: { empresas, confianza: 'Media' },
  transacciones: {
    operaciones: [
      { fecha: '2024-12', objetivo: '1E (DEX, Reino Unido)', comprador: 'TeamViewer', ev: 682.5, ev_ventas: r2(682.5 / 68.5), ev_ebitda: null, prima_pct: null, excluir: false, comentario: '720 M USD; 682,5 M EUR pagados en enero de 2025 sobre 68,5 M de ingresos pro forma de 2024 (estimación propia del múltiplo) [D14].' },
      { fecha: '2025-02', objetivo: 'SolarWinds (gestión y observabilidad de TI)', comprador: 'Turn/River Capital', ev: Math.round(4400 / 1.04), ev_ventas: r2(4400 / 796.9), ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Valor empresa 4.400 M USD; múltiplo sobre los ingresos de 2024 (796,9 M USD), estimación propia; prima del 35 % sobre el precio medio de 90 días [D9, D10].' },
      { fecha: '2025-10', objetivo: 'Jamf (gestión de dispositivos Apple)', comprador: 'Francisco Partners', ev: Math.round(2200 / 1.16), ev_ventas: 3.3, ev_ebitda: 14.3, prima_pct: null, excluir: false, comentario: 'Unos 2.200 M USD; 3,3 veces los ingresos de 12 meses y 14,3 veces el EBITDA; cerrada en enero de 2026 [D11, D12].' },
    ],
    confianza: 'Media',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'bolsa', campo: 'posicion_corta_pct', tipo: 'Complemento', intentos: '1) Bundesanzeiger, registro de posiciones cortas netas (sin acceso automático); 2) Yahoo (sin dato para Xetra); 3) prensa', decision: 'Omitido' },
    { seccion: 'comparables', campo: 'ev_ebitda_ntm y roic_pct', tipo: 'Complemento', intentos: '1) Yahoo (no da EBITDA estimado ni ROIC); 2) MarketScreener (solo abre la ficha de TeamViewer); 3) Stock Analysis (bloqueado)', decision: 'Omitido: se compara por PER y EV/ventas' },
  ],
};
guarda('D', D);

// ================================================================ E. Sentimiento
guarda('E', {
  _estado: 'vacía',
  sentimiento: null,
  fuentes: [],
  huecos: [{ seccion: 'sentimiento', campo: 'sección entera', tipo: 'Complemento', intentos: '1) foro de wallstreet-online (código 410, sin hilos legibles) y ariva (sin contenido); 2) Stocktwits (sin símbolo TMVWY) y Reddit (bloqueado); 3) RSS de Seeking Alpha: solo titulares de análisis y transcripciones, sin comentarios', decision: 'Omitido' }],
});
console.log('Notas A-E escritas; comparables:', empresas.map((e) => `${e.ticker} PER ${e.per_ntm} crec ${e.crecimiento_pct}`).join(' | '));
