// Notas A-E de Parkin Company P.J.S.C. (DFM: PARKIN, Yahoo PARKIN.AE; corte 2026-10-20).
// Emiratos no tiene XBRL en cuentas.mjs: cuentas anuales auditadas (PwC) de 2025 (con 2024 comparativo), intermedios revisados
// del 1T26 y del 2T25, comunicados trimestrales de la empresa y documentos de la salida a bolsa (folleto de admisión e información
// pro forma de 2023), todo bajado de la web de comunicaciones del DFM (feeds.dfm.ae) y de la oficina de prensa del Gobierno de Dubái.
// HISTORIAL CORTO: Parkin opera como sociedad desde el 1-ene-2024 (concesión de 49 años de la RTA). 2021-2023 son cifras del negocio
// de aparcamiento dentro de la RTA («carve-out»): sin canon de concesión, sin impuesto, sin deuda y con costes asignados por la RTA.
// No son comparables con 2024-2025 y así se dice en limitaciones; el balance de 2023 es el PRO FORMA (con la concesión y la deuda).
// Ejecutar: node informes/parkin-2026-10-20/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const bolsa = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const Y = JSON.parse(fs.readFileSync(path.join(dir, 'yahoo-raw.json'), 'utf8'));
const r1 = (x) => Math.round(x * 10) / 10;
const r2 = (x) => Math.round(x * 100) / 100;
const DFM = 'https://feeds.dfm.ae/documents/';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Consolidated financial statements for the year ended 31 December 2025 (PwC, opinión favorable): cuenta, balance y flujos 2025 y 2024; ingresos por línea (nota 6), deuda (22), impuesto de sociedades del 9 % (25), pasivos de contrato (26), concesión y canon variable (27), vinculadas (19), BPA (31)', editor: 'Parkin Company P.J.S.C. (DFM)', tipo: 'Primaria', fecha: '2026-02-25', url: `${DFM}2026/Feb/25/df5c9fbc-fd22-4b47-a163-5a51b5086753/Parkin%20FY%202025%20FS%20EN.pdf` },
  { id: 2, titulo: 'Condensed consolidated interim financial statements, three months ended 31 March 2026 (revisión limitada de PwC): balance a 31-mar-2026, cuenta y flujos del 1T26, dividendo de 343,7 M declarado', editor: 'Parkin Company P.J.S.C. (DFM)', tipo: 'Primaria', fecha: '2026-05-06', url: `${DFM}2026/May/6/ffffcfe8-fdc6-4f65-b93d-35b3b4a0313a/Q1%202026%20FS%20ENG%206%20May%202026.Pdf.pdf` },
  { id: 3, titulo: 'Condensed consolidated interim financial statements, six months ended 30 June 2025 (PwC): cuenta del 2T25 y del 1S25 con comparativos de 2024', editor: 'Parkin Company P.J.S.C. (DFM)', tipo: 'Primaria', fecha: '2025-08-07', url: `${DFM}2025/Aug/7/2655f989-2027-4644-a037-c159a4bc9711/Parkin%20Q2%202025%20FS%20Si.pdf` },
  { id: 4, titulo: 'Parkin delivers strong financial performance in Q2 2026 (comunicado de resultados: ingresos por segmento, plazas, transacciones, canon, deuda neta de 710,1 M, guía 2026 revisada)', editor: 'Parkin Company P.J.S.C. (vía Zawya)', tipo: 'Primaria', fecha: '2026-08-13', url: 'https://www.zawya.com/en/press-release/companies-news/parkin-delivers-strong-financial-performance-in-q2-2026-456555' },
  { id: 5, titulo: 'Parkin’s Q1 2026 Results Demonstrate Resilience and Growth Momentum (comunicado al DFM: KPI, tarifas por zona, abonos, canon provisionado al 27,5 %, política de dividendo)', editor: 'Parkin Company P.J.S.C. (DFM)', tipo: 'Primaria', fecha: '2026-05-06', url: `${DFM}2026/May/6/4909aa03-0a6a-43d9-aff6-ae5b75c85465/Parkin%20Q1%202026%20DFM%20ENG%20FINAL%206%20May%202026.Pdf.pdf` },
  { id: 6, titulo: 'Parkin delivers record annual and quarterly revenues (resultados del 4T25 y de 2025, guía 2026, petición de revisión de tarifas a la RTA)', editor: 'Dubai Media Office', tipo: 'Primaria', fecha: '2026-02-25', url: 'https://mediaoffice.ae/en/news/2026/february/25-02/parkin-delivers-record-annual-and-quarterly-revenues' },
  { id: 7, titulo: 'Parkin reports record quarterly results (3T25)', editor: 'Dubai Media Office', tipo: 'Primaria', fecha: '2025-11-07', url: 'https://mediaoffice.ae/en/news/2025/november/07-11/parkin-reports-record-quarterly-results' },
  { id: 8, titulo: 'Parkin Company PJSC Preliminary Results Brief for the Year Ended 31 December 2024', editor: 'Parkin Company P.J.S.C. (DFM)', tipo: 'Primaria', fecha: '2025-02-13', url: `${DFM}/2025/Feb/13/a698f5cc-6998-4c17-9e1e-58852377e3db/2024%20DFM%20ENG%20Parkin%20.pdf` },
  { id: 9, titulo: 'RTA – Parking Business: Unaudited pro-forma financial information as at and for the year ended 31 December 2023 (columna «carve-out» y ajustes pro forma de la concesión)', editor: 'Roads and Transport Authority / Parkin (DFM)', tipo: 'Primaria', fecha: '2024-03-20', url: `${DFM}2024/Mar/20/9f22e1a3-ffb8-41f4-af5f-c89fbbec0a28/PARKIN_FS_ANN2_2023_E_20_03_2024.pdf` },
  { id: 10, titulo: 'Listing Prospectus – Parkin Company P.J.S.C. (ingresos y EBITDA del negocio de aparcamiento 2021-2023, concesión, canon, cláusulas de compensación)', editor: 'Parkin Company P.J.S.C. (DFM)', tipo: 'Primaria', fecha: '2024-03-20', url: `${DFM}2024/Mar/20/e1b37c25-3449-46b9-a0bd-4186101515dc/PARKIN_Listing%20Prospectus_E.pdf` },
  { id: 11, titulo: 'Yahoo Finance, series anuales (fundamentals-timeseries) de PARKIN.AE: cuenta y flujos «carve-out» de 2022 y 2023', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/PARKIN.AE/financials' },
  { id: 12, titulo: 'First Look Note 2Q26 – Parkin Company PJSC (cuenta del 2T26 según NIIF: ingresos 360 M, amortizaciones 20 M; estimaciones 2026)', editor: 'FAB Securities Research', tipo: 'Analistas', fecha: '2026-08-25', url: 'https://fabsresearch.bankfab.com/ResearchPortal/Download/Index/1611' },
];

// Cuenta por naturaleza (NIIF). 2021: solo ingresos y EBITDA del folleto [A10]. 2022: carve-out (Yahoo, de las cuentas carve-out [A11]).
// 2023: carve-out [A9] (sin canon, sin impuesto). 2024-2025: cuentas auditadas [A1]. EBITDA = beneficio antes de impuestos + gastos
// financieros − ingresos financieros + amortizaciones (la empresa incluye los ingresos financieros en su «EBITDA»: 798,2 M en 2025).
const cuenta = [
  { periodo: '2021', ingresos: 590.6, coste_ventas: null, gastos_generales: null, ebitda: 240.3, amortizaciones: null, ebit: null, resultado_financiero: null, bai: null, impuestos: null, minoritarios: 0, beneficio_neto: null, gastos_financieros: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: null, dpa: null, dpa_extraordinario: 0, acciones_diluidas: null },
  { periodo: '2022', ingresos: 686.2, coste_ventas: null, gastos_generales: null, ebitda: 336.5, amortizaciones: 20.6, ebit: 315.9, resultado_financiero: -0.3, bai: 315.6, impuestos: 0, minoritarios: 0, beneficio_neto: 315.6, gastos_financieros: 0.3, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: null, dpa: null, dpa_extraordinario: 0, acciones_diluidas: null },
  { periodo: '2023', ingresos: 779.4, coste_ventas: null, gastos_generales: null, ebitda: 414.4, amortizaciones: 19.4, ebit: 395.0, resultado_financiero: -0.9, bai: 394.1, impuestos: 0, minoritarios: 0, beneficio_neto: 394.1, gastos_financieros: 0.9, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: null, dpa: null, dpa_extraordinario: 0, acciones_diluidas: null },
  { periodo: '2024', ingresos: 915.8, coste_ventas: null, gastos_generales: null, ebitda: 569.0, amortizaciones: 47.9, ebit: 521.1, resultado_financiero: -55.8, bai: 465.4, impuestos: 41.9, minoritarios: 0, beneficio_neto: 423.5, gastos_financieros: 64.0, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 0.141, dpa: 0.1599, dpa_extraordinario: 0, acciones_diluidas: 2999.6 },
  { periodo: '2025', ingresos: 1308.3, coste_ventas: null, gastos_generales: null, ebitda: 782.6, amortizaciones: 51.5, ebit: 731.1, resultado_financiero: -43.7, bai: 687.4, impuestos: 61.9, minoritarios: 0, beneficio_neto: 625.5, gastos_financieros: 59.3, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 0.2087, dpa: 0.2186, dpa_extraordinario: 0, acciones_diluidas: 2997.8 },
];
// LTM jun-26: ingresos NIIF 1.308,3 − 585,7 (1S25 [A3]) + 379,4 (1T26 [A2]) + ≈ 360 (2T26 [A12]) ≈ 1.461,6 (igual que Yahoo).
// EBITDA (sin ingresos financieros): 782,6 − 358,5 (1S25) + 226,7 (1T26) + ≈ 213,2 (2T26: 217,2 de la empresa − ≈ 4 de intereses cobrados) = 864,0.
// Beneficio: 625,5 − 136,6 − 148,4 + 185,1 + 166,2 = 691,8; BPA ÷ 2.999 M.
const ltm = { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 1461.6, ebitda: 864.0, ebit: 800.6, beneficio_neto: 691.8, bpa: 0.2307, dpa: 0.2317, dpa_extraordinario: 0, fcf: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null };

// Balance: 2023 PRO FORMA (con la concesión de 1.400 M y la deuda de 1.097 M) [A9]; 2024-2025 auditados [A1].
// clientes = clientes y otras cuentas a cobrar + saldos a cobrar de la RTA y Digital Dubai (multas y cobros que gestiona la Administración);
// proveedores = acreedores + saldos con la RTA SIN los 300 M de canon diferido (solo se paga si Parkin quiebra; no es deuda ni circulante).
// pasivos_contrato = abonos y permisos cobrados por adelantado + saldo del monedero de la app. caja = caja + depósitos a corto.
// inmovilizado_material incluye los derechos de uso.
const balanceH = [
  { periodo: '2023', activo_total: 1863.1, activo_corriente: 401.8, pasivo_corriente: 447.9, pasivo_total: 1602.1, fondo_comercio: 0, intangibles: 1409.3, inmovilizado_material: 52.0, existencias: 0, clientes: 228.3, proveedores: 80.9, activos_contrato: null, pasivos_contrato: 61.5, caja: 118.5, deuda_financiera: 1097.3, arrendamientos: 27.2, patrimonio_neto: 261.0, minoritarios: 0, reservas: 0 },
  { periodo: '2024', activo_total: 2210.2, activo_corriente: 776.6, pasivo_corriente: 586.7, pasivo_total: 1730.3, fondo_comercio: 0, intangibles: 1396.5, inmovilizado_material: 37.2, existencias: 0, clientes: 361.3, proveedores: 173.4, activos_contrato: null, pasivos_contrato: 63.3, caja: 402.3, deuda_financiera: 1097.8, arrendamientos: 30.1, patrimonio_neto: 480.0, minoritarios: 0, reservas: 392.0 },
  { periodo: '2025', activo_total: 2351.5, activo_corriente: 923.0, pasivo_corriente: 695.5, pasivo_total: 1848.7, fondo_comercio: 0, intangibles: 1354.9, inmovilizado_material: 73.6, existencias: 0, clientes: 445.4, proveedores: 223.1, activos_contrato: null, pasivos_contrato: 91.6, caja: 465.2, deuda_financiera: 1098.3, arrendamientos: 48.1, patrimonio_neto: 502.8, minoritarios: 0, reservas: 424.6 },
];
// Flujos: 2022-2023 carve-out (Yahoo [A11]: flujo operativo y capex; las «distribuciones» eran transferencias a la RTA, no dividendos).
// 2024: el pago inicial de la concesión (1.100 M) va en adquisiciones, no en capex. Intereses pagados en financiación [A1].
const flujosH = [
  { periodo: '2022', flujo_operativo: 419.4, capex: 2.4, pagos_arrendamientos: null, adquisiciones: 0, desinversiones: 0, dividendos: null, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: '2023', flujo_operativo: 454.2, capex: 4.4, pagos_arrendamientos: null, adquisiciones: 0, desinversiones: 0, dividendos: null, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: '2024', flujo_operativo: 546.1, capex: 11.6, pagos_arrendamientos: 4.9, adquisiciones: 1100.0, desinversiones: 0, dividendos: 198.8, recompras: 2.0, emision_acciones: 121.5, intereses_en_financiacion: 50.7 },
  { periodo: '2025', flujo_operativo: 733.6, capex: 13.9, pagos_arrendamientos: 11.3, adquisiciones: 0, desinversiones: 0.1, dividendos: 592.9, recompras: 9.8, emision_acciones: 0, intereses_en_financiacion: 59.1 },
];
// Trimestres: «ingresos totales» y «EBITDA» TAL COMO LOS PUBLICA LA EMPRESA (incluyen los intereses cobrados, ≈ 3-5 M por trimestre).
// Crecimiento sobre los ingresos NIIF del mismo trimestre del año anterior cuando hay dato [A1, A3].
const tri = [
  { periodo: '3T24', ingresos: 239.2, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.035, vs_consenso: null },
  { periodo: '4T24', ingresos: 265.0, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 158.2, margen_ebitda_pct: 59.7, bpa: 0.040, vs_consenso: null },
  { periodo: '1T25', ingresos: 273.3, crecimiento_pct: 25.0, crecimiento_organico_pct: null, ebitda: 176.2, margen_ebitda_pct: 64.5, bpa: 0.046, vs_consenso: null },
  { periodo: '2T25', ingresos: 320.0, crecimiento_pct: 54.8, crecimiento_organico_pct: null, ebitda: 189.3, margen_ebitda_pct: 59.2, bpa: 0.049, vs_consenso: null },
  { periodo: '3T25', ingresos: 343.3, crecimiento_pct: 43.5, crecimiento_organico_pct: null, ebitda: 199.8, margen_ebitda_pct: 58.2, bpa: 0.052, vs_consenso: 'En línea' },
  { periodo: '4T25', ingresos: 389.4, crecimiento_pct: 46.9, crecimiento_organico_pct: null, ebitda: 232.9, margen_ebitda_pct: 59.8, bpa: 0.061, vs_consenso: null },
  { periodo: '1T26', ingresos: 384.2, crecimiento_pct: 41.0, crecimiento_organico_pct: null, ebitda: 231.3, margen_ebitda_pct: 60.2, bpa: 0.062, vs_consenso: null },
  { periodo: '2T26', ingresos: 364.1, crecimiento_pct: 13.6, crecimiento_organico_pct: null, ebitda: 217.2, margen_ebitda_pct: 59.7, bpa: 0.055, vs_consenso: 'Inferior' },
];
const lin = (nombre, descripcion, v24, v25) => ({ nombre, descripcion, tipo_resultado: null, historico: [{ periodo: '2024', ingresos: v24, resultado: null }, { periodo: '2025', ingresos: v25, resultado: null }] });

guarda('A', {
  _estado: 'completo',
  financieros: {
    cuenta, ltm,
    cambios_perimetro: [{ periodo: '2024', descripcion: 'Arranque de Parkin como sociedad el 1-ene-2024: entran la concesión (1.400 M de intangible), la deuda de 1.100 M, el canon variable del 20-27,5 %, el impuesto del 9 % y la plantilla propia; 2021-2023 son cifras del negocio dentro de la RTA y no son comparables [A1, A9].' }],
    confianza: 'Media',
  },
  trimestres: { items: tri, confianza: 'Alta' },
  balance: {
    historico: balanceH,
    vencimientos: [{ anio: '2029', importe: 1100 }],
    liquidez: 'Caja y depósitos de 463,2 M y línea revolvente sin disponer de 100 M a 30-jun-2026: liquidez de 563,2 M [A4]',
    rating: 'Sin rating',
    coste_deuda_pct: 5.1,
    vida_media_anios: 2.3,
    confianza: 'Alta',
  },
  flujos: { historico: flujosH, confianza: 'Alta' },
  calidad: { auditor: 'PricewaterhouseCoopers Limited Partnership, Dubai Branch', anios_auditor: 2, opinion: 'Favorable', confianza: 'Alta' },
  negocio: {
    segmentos: [
      lin('Aparcamiento público (calle y superficie)', 'Tarifa por hora o por día en las zonas A-D, con precio variable (punta y valle, estándar y premium) desde abril de 2025; paga canon a la RTA.', 404.6, 524.5),
      lin('Multas (enforcement)', 'Sanciones por no pagar o por exceder el tiempo, impuestas por inspectores y coches con cámaras; sin canon.', 249.1, 408.7),
      lin('Abonos y permisos', 'Abonos de 1, 3, 6 y 12 meses y permisos de residentes; se cobran por adelantado y se reconocen en el periodo; pagan canon.', 152.8, 222.0),
      lin('Aparcamientos de promotores', 'Gestión de aparcamientos privados (Dubai Holding, DAMAC, Emaar, TECOM, Spinneys) con reparto o renta mínima garantizada; sin canon.', 69.5, 94.0),
      lin('Edificios de aparcamiento (MSCP)', 'Aparcamientos en altura públicos operados por Parkin; pagan canon.', 11.8, 14.4),
      lin('Reservas y otros', 'Reservas de plazas, alquiler de locales y gestión de aparcamientos de centros comerciales.', 28.0, 44.7),
    ],
    geografias: [{ nombre: 'Emirato de Dubái', peso_pct: 100 }],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Plazas gestionadas (miles)', valor_anterior: '206,4 (dic-24)', valor_actual: '268,3 (jun-26)', variacion: '+30 %', comentario: 'Públicas 203,2k, de promotores 61,5k y en edificios 3,7k a jun-26 [A4, A6].' },
      { kpi: 'Tarifa media ponderada por hora (AED)', valor_anterior: '2,01 (4T24)', valor_actual: '3,00 (2T26)', variacion: '+49 %', comentario: 'Tarifa variable desde abril de 2025 [A4, A6].' },
      { kpi: 'Ocupación del aparcamiento público', valor_anterior: '28,3 % (4T24)', valor_actual: '21,8 % (1T26)', variacion: '−6,5 p.p.', comentario: 'Cae porque los abonados no cuentan y por el paso a abonos baratos [A5, A6].' },
      { kpi: 'Abonos vendidos en el trimestre (miles)', valor_anterior: '70,9 (2T25)', valor_actual: '97,5 (2T26)', variacion: '+38 %', comentario: 'Arbitraje entre la tarifa diaria nueva y el precio del abono sin revisar [A4].' },
      { kpi: 'Multas emitidas en el trimestre (miles)', valor_anterior: '660 (2T25)', valor_actual: '695 (2T26)', variacion: '+5 %', comentario: '37 coches con cámaras (25 un año antes); cobro del 75 % en el 2T26 (83 %) [A4].' },
      { kpi: 'Transacciones de aparcamiento público (M)', valor_anterior: '29,2 (2T25)', valor_actual: '27,2 (2T26)', variacion: '−7 %', comentario: 'Geopolítica (guerra con Irán), menos días de cobro y abonos [A4].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    adquisiciones: [
      { anio: '2024', objetivo: 'Concesión de 49 años del aparcamiento público de Dubái (RTA)', importe: 1400, ev_ebitda: null, financiacion: 'Pago inicial de 1.100 M con un préstamo murabaha de Emirates NBD; 300 M diferidos que solo se pagan si Parkin quiebra', resultado: 'EBITDA de 569 M en 2024 y 783 M en 2025: el pago inicial se recupera en menos de dos años de EBITDA [A1].' },
    ],
    confianza: 'Alta',
  },
  fuentes: fA,
  huecos: [
    { seccion: 'trimestres', campo: 'EBITDA del 3T24', tipo: 'Complemento', intentos: '1) Comunicado del 3T25 (solo el crecimiento, +36 %); 2) cuentas anuales 2024 (sin trimestres); 3) derivarlo del +36 % redondeado daría un dato impreciso', decision: 'Omitido' },
    { seccion: 'financieros', campo: 'cuenta completa 2021 y BPA 2021-2023', tipo: 'Complemento', intentos: '1) Folleto de admisión (solo ingresos y EBITDA); 2) información pro forma de 2023 (solo 2023); 3) las cuentas carve-out completas de 2021-2022 no están en el DFM en una versión legible y no hay acciones antes de 2024', decision: 'Omitido; 2021 solo con ingresos y EBITDA' },
  ],
});

// ---------------------------------------------------------------- B. Sector, competencia, historia, ESG
const fB = [
  { id: 1, titulo: 'Listing Prospectus – Parkin Company P.J.S.C. (mercado, plazas sin pagar convertibles, demanda prevista, concesión, mecanismo de tarifas y canon, cláusulas de compensación)', editor: 'Parkin Company P.J.S.C. (DFM)', tipo: 'Primaria', fecha: '2024-03-20', url: `${DFM}2024/Mar/20/e1b37c25-3449-46b9-a0bd-4186101515dc/PARKIN_Listing%20Prospectus_E.pdf` },
  { id: 2, titulo: 'Dubai population tops 4.580 million by end of 2025, records 7.5% growth (Dubai Data and Statistics Establishment)', editor: 'WAM', tipo: 'Sectorial', fecha: '2026-07-30', url: 'https://www.wam.ae/en/article/c1hd5qo-dubai-population-tops-4580-million-end-2025' },
  { id: 3, titulo: 'Parkin delivers strong financial performance in Q2 2026 (plazas, abonos, guía revisada)', editor: 'Parkin Company P.J.S.C. (vía Zawya)', tipo: 'Primaria', fecha: '2026-08-13', url: 'https://www.zawya.com/en/press-release/companies-news/parkin-delivers-strong-financial-performance-in-q2-2026-456555' },
  { id: 4, titulo: 'Parkin to Introduce Smart, Community-Centric Parking Solutions (acuerdo con Dubai Holding, ≈ 29,6k plazas)', editor: 'Parkin Company P.J.S.C. (DFM)', tipo: 'Primaria', fecha: '2025-08-05', url: `${DFM}/2025/Aug/4/61fc6da4-393c-4319-a229-838cf638e6bd/Parkin%20X%20Dubai%20Holdi.pdf` },
  { id: 5, titulo: 'Parkin to Deploy AI-Driven Enforcement at Dubai Mall, Dubai Hills Mall and Marina Mall Under New EMAAR Agreement', editor: 'Parkin Company P.J.S.C. (DFM)', tipo: 'Primaria', fecha: '2026-05-04', url: `${DFM}2026/May/3/e5af9094-4097-4746-8a52-e4145e1bd997/EMAAR%20Malls%20Pod%20Enforcement%20ENG%20FINAL.Pdf.pdf` },
  { id: 6, titulo: 'Dubai’s Parkin to expand into Bahrain and Egypt as network continues to grow', editor: 'The National', tipo: 'Prensa', fecha: '2026-08-24', url: 'https://www.thenationalnews.com/news/uae/2026/08/24/dubais-parkin-to-expand-into-bahrain-and-egypt-as-network-continues-to-grow/' },
  { id: 7, titulo: 'Yahoo Finance, fichas (quoteSummary) de Salik, Park24 y Transurban: ingresos y margen operativo de los últimos 12 meses', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/SALIK.AE/' },
  { id: 8, titulo: 'Dubai’s Parkin announces 5% VAT on all parking services starting June 1', editor: 'Khaleej Times', tipo: 'Prensa', fecha: '2026-05-22', url: 'https://www.khaleejtimes.com/uae/transport/parkin-announces-5-vat-to-all-parking-services-starting-june-1' },
  { id: 9, titulo: 'Dubai parking fees could rise after Parkin submits tariff hike request', editor: 'Gulf News', tipo: 'Prensa', fecha: '2026-02-26', url: 'https://gulfnews.com/business/markets/dubai-parking-fees-could-rise-after-parkin-submits-tariff-hike-request-1.500455827' },
  { id: 10, titulo: 'Consolidated financial statements 2025, nota 27 (concesión: canon del 20 % al 27,5 %, provisión de 44,5 M, terminación y reversión de activos en 2072)', editor: 'Parkin Company P.J.S.C. (DFM)', tipo: 'Primaria', fecha: '2026-02-25', url: `${DFM}2026/Feb/25/df5c9fbc-fd22-4b47-a163-5a51b5086753/Parkin%20FY%202025%20FS%20EN.pdf` },
];
const cs = Object.fromEntries(Y.comps.map((c) => [c.s, c]));
const fx = { AED: 1, USD: Y.fx['USDAED=X'], EUR: Y.fx['EURAED=X'], JPY: Y.fx['JPYAED=X'], AUD: Y.fx['AUDAED=X'], CHF: Y.fx['CHFAED=X'] };
const compet = (s, nombre, pais, comentario) => { const c = cs[s]; return { nombre, pais, ticker: s, ingresos: Math.round(c.rev / 1e6 * fx[c.fcur]), cuota_pct: null, margen_ebit_pct: r1(c.opM * 100), comentario }; };
guarda('B', {
  _estado: 'completo',
  sector: {
    tamano: 'Sin estadística oficial del mercado de aparcamiento de pago de Dubái. Referencias: ≈ 392.000 plazas públicas sin cobrar además de las ≈ 175.000 de pago en 2023, y una demanda de aparcamiento público de pago que crecería un 60 % hasta 2033 según el estudio del folleto [1]; población de 4,58 M a fin de 2025 (+7,5 %) [2]',
    unidad_serie: null, serie: [],
    tcac_historico_pct: 7.3, tcac_previsto_pct: 4.8,
    cr5_pct: null, estructura: 'Concentrada',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: null,
    posicion: '1.º de Dubái: operador exclusivo de todo el aparcamiento público de pago (≈ 203k plazas a jun-26) por concesión hasta 2072; en aparcamiento de promotores (61,5k plazas) compite con operadores privados y con los propios promotores [3, 10]',
    competidores: [
      compet('SALIK.AE', 'Salik', 'Emiratos', 'Concesión de peajes de Dubái de la misma RTA (49 años); no compite en aparcamiento público, sí en servicios de movilidad y cobro (aparcamiento de centros comerciales con cobro automático); referencia de modelo y de múltiplo [7].'),
      compet('4666.T', 'Park24', 'Japón', 'Mayor operador de aparcamiento de Japón (Times), con plazas propias y alquiladas; margen mucho menor porque paga el suelo, mientras Parkin usa la vía pública por un canon [7].'),
      compet('TCL.AX', 'Transurban', 'Australia', 'Concesiones de autopistas urbanas; referencia de negocio de concesión con margen EBITDA del 60 %, pero con mucha más deuda [7].'),
      { nombre: 'Q Mobility (Abu Dabi)', pais: 'Emiratos', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Gestiona el aparcamiento público (Mawaqif) y los peajes de Abu Dabi; no cotiza y no publica cuentas. Es el competidor natural si Parkin entra en Abu Dabi (DAMAC en Al Reem) [6].' },
      { nombre: 'Operadores privados y promotores (Emaar, Majid Al Futtaim, operadores internacionales)', pais: 'Emiratos', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Los grandes promotores gestionan o subcontratan sus aparcamientos; Parkin les ofrece cobro sin barreras y sanciones (Emaar, mayo de 2026; Majid Al Futtaim en dos centros) [5, 3].' },
    ],
    confianza: 'Media',
  },
  historia: {
    hitos: [
      { anio: '1995', hito: 'Nace el aparcamiento público de pago de Dubái dentro del Ayuntamiento (Dubai Municipality) [3].' },
      { anio: '2005', hito: 'Pasa a la nueva Autoridad de Carreteras y Transporte (RTA) [3].' },
      { anio: '2008', hito: 'La RTA es de las primeras del mundo en cobrar el aparcamiento por SMS [1].' },
      { anio: '2023', hito: 'Ley 30/2023 de Dubái: se crea Parkin Company P.J.S.C. (29-dic) [1].' },
      { anio: '2024', hito: 'Concesión de 49 años desde el 1-ene (pago inicial de 1.100 M); salida a bolsa del 24,99 % a 2,10 AED el 21-mar; el Fondo de Inversión de Dubái conserva el 75,01 % [1, 10].' },
      { anio: '2025', hito: 'Tarifa variable desde el 4-abr (punta 6 AED/hora en premium); acuerdo con Dubai Holding por ≈ 29,6k plazas (ago) [4, 10].' },
      { anio: '2026', hito: 'Petición a la RTA de revisar tarifas y abonos (feb); IVA del 5 % en todos los servicios desde el 1-jun; contratos con Emaar (mayo) y entrada en Abu Dabi y planes en Baréin y Egipto (ago) [5, 6, 8, 9].' },
    ],
    confianza: 'Alta',
  },
  esg: { calificaciones: [], confianza: 'Baja' },
  fuentes: fB,
  huecos: [
    { seccion: 'sector', campo: 'tamaño del mercado y serie', tipo: 'Complemento', intentos: '1) Folleto de admisión: solo plazas y crecimiento previsto de la demanda, sin cifra en dirhams; 2) Dubai Statistics / RTA: no publican ingresos del aparcamiento de pago; 3) informes de mercado (Mordor, 6Wresearch) de pago y con perímetros de todo el país', decision: 'Omitido; se usa la proyección propia por plazas y tarifa' },
    { seccion: 'competencia', campo: 'cuota_pct', tipo: 'Complemento', intentos: '1) Folleto: «posición dominante» sin cifra; 2) comunicados: tampoco; 3) sin datos de ingresos de los operadores privados de Dubái', decision: 'Omitido; en aparcamiento público es exclusiva (100 %)' },
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) MSCI y Sustainalytics: sin ficha pública de Parkin; 2) informe de sostenibilidad 2025: no localizado en el DFM; 3) CDP: sin respuesta registrada', decision: 'Omitido' },
  ],
});

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Consolidated financial statements 2025: informe de los administradores (consejo), nota 19 (vinculadas: RTA, ENBD, Dubai Holding; remuneración de la alta dirección 7,3 M)', editor: 'Parkin Company P.J.S.C. (DFM)', tipo: 'Primaria', fecha: '2026-02-25', url: `${DFM}2026/Feb/25/df5c9fbc-fd22-4b47-a163-5a51b5086753/Parkin%20FY%202025%20FS%20EN.pdf` },
  { id: 2, titulo: 'Listing Prospectus (consejo y alta dirección con trayectorias, accionariado tras la salida a bolsa, cláusula de cambio de control del préstamo)', editor: 'Parkin Company P.J.S.C. (DFM)', tipo: 'Primaria', fecha: '2024-03-20', url: `${DFM}2024/Mar/20/e1b37c25-3449-46b9-a0bd-4186101515dc/PARKIN_Listing%20Prospectus_E.pdf` },
  { id: 3, titulo: 'Condensed consolidated interim financial statements 1T26 (nota 1: Dubai Investment Fund 75,01 %; autocartera)', editor: 'Parkin Company P.J.S.C. (DFM)', tipo: 'Primaria', fecha: '2026-05-06', url: `${DFM}2026/May/6/ffffcfe8-fdc6-4f65-b93d-35b3b4a0313a/Q1%202026%20FS%20ENG%206%20May%202026.Pdf.pdf` },
  { id: 4, titulo: 'Resultados del 4T25 y de 2025 (guía 2026 inicial, dividendos)', editor: 'Dubai Media Office', tipo: 'Primaria', fecha: '2026-02-25', url: 'https://mediaoffice.ae/en/news/2026/february/25-02/parkin-delivers-record-annual-and-quarterly-revenues' },
  { id: 5, titulo: 'Resultados del 2T26 (guía 2026 revisada)', editor: 'Parkin Company P.J.S.C. (vía Zawya)', tipo: 'Primaria', fecha: '2026-08-13', url: 'https://www.zawya.com/en/press-release/companies-news/parkin-delivers-strong-financial-performance-in-q2-2026-456555' },
  { id: 6, titulo: 'Parkin posts 50% profit rise in Q3 2025, revises full-year guidance upward', editor: 'Gulf Business', tipo: 'Prensa', fecha: '2025-11-07', url: 'https://gulfbusiness.com/en/2025/finance/parkin-posts-50-profit-rise-in-q3-2025-revises-full-year-guidance-upward/' },
];
guarda('C', {
  _estado: 'completo',
  directivos: {
    equipo: [
      { nombre: 'Mohamed Abdulla Al Ali', cargo: 'Consejero delegado (CEO)', desde: '2024', participacion_pct: null, trayectoria: 'Ingeniero civil; en la RTA desde 2007 (operaciones de autobuses, proyectos de transporte público, planificación y negocio). Dirigió el tráfico de la Expo 2020. Con él Parkin pasó de 916 a 1.308 M de ingresos en un año [2, 1].' },
      { nombre: 'Khattab Abu Qaoud', cargo: 'Director financiero (CFO)', desde: '2024', participacion_pct: null, trayectoria: 'Más de 20 años en finanzas de infraestructuras y PPP; en la RTA desde 2013, trabajó en la salida a bolsa de Salik y en la financiación del metro [2].' },
      { nombre: 'Osama Hashim Al Safi', cargo: 'Director de operaciones (COO)', desde: '2024', participacion_pct: null, trayectoria: 'Directivo de la RTA trasladado a Parkin en la separación [2].' },
      { nombre: 'Ahmed Abdullah Alzaabi', cargo: 'Director de tecnología', desde: '2024', participacion_pct: null, trayectoria: 'Responsable de los sistemas de pago, la app y la inspección con cámaras [2].' },
      { nombre: 'Ahmed Hashem Bahrozyan', cargo: 'Presidente (no ejecutivo)', desde: '2024', participacion_pct: null, trayectoria: 'Consejero delegado de la Agencia de Transporte Público de la RTA; en la RTA desde 2005 [2].' },
    ],
    historial_guidance: [
      { anio: '2025', guia: 'Guía anual de ingresos por segmento revisada al alza con el 3T25 [6]', real: 'Ingresos de 1.308 M (+43 %) y beneficio de 625,5 M (+48 %) [4]', cumplida: 'Sí' },
      { anio: '2026 (aparcamiento público)', guia: '560-610 M en febrero de 2026 [4]', real: 'Rebajada a 510-550 M en agosto (abonos, guerra, ritmo de las plazas nuevas) [5]', cumplida: 'No' },
      { anio: '2026 (resto)', guia: 'Multas 420-460 M; abonos 260-280 M; promotores 110-130 M; capex 45-55 M [4]', real: 'Abonos subidos a 280-300 M y promotores a 130-150 M; multas y capex sin cambios en agosto [5]', cumplida: 'Parcial' },
    ],
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Ahmed Hashem Bahrozyan', cargo: 'Presidente', tipo: 'Dominical', desde: '2024', comisiones: null },
      { nombre: 'Ahmed Hassan Mahboub', cargo: 'Vicepresidente', tipo: 'Dominical', desde: '2024', comisiones: null },
      { nombre: 'Muna Abdulrahman Al Osaimi', cargo: 'Consejera', tipo: 'Dominical', desde: '2024', comisiones: null },
      { nombre: 'Nasser Hamad Abu Shehab', cargo: 'Consejero', tipo: 'Dominical', desde: '2024', comisiones: null },
      { nombre: 'Alawi Ali Al Sheikh-Ali', cargo: 'Consejero', tipo: 'Otro externo', desde: '2024', comisiones: null },
      { nombre: 'Mona Mohammad Bajman', cargo: 'Consejera', tipo: 'Dominical', desde: '2024', comisiones: null },
      { nombre: 'Alunood Thabit Al Ameri', cargo: 'Consejera', tipo: 'Dominical', desde: '2024', comisiones: null },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: true, variable_ligado_rentabilidad: null, auditoria_independiente: null, insiders_sin_operaciones: null,
    accionista_control: true, presidente_vinculado_control: true, cambios_cupula_24m: 0,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: null,
    accionistas: [
      { nombre: 'Dubai Investment Fund (Gobierno de Dubái)', pct: 75.01, tipo: 'Control (Estado)', variacion: 'Sin cambios desde la salida a bolsa (mar-2024)' },
      { nombre: 'Capital flotante (DFM)', pct: 24.99, tipo: 'Flotante', variacion: 'Autocartera de un creador de liquidez: 11,8 M AED a dic-25 y 1,6 M a mar-26' },
    ],
    insiders: [],
    alertas: [
      'El Gobierno de Dubái está a los dos lados: dueño del 75 % (DIF), concedente y regulador (RTA, que fija tarifas y zonas), banco (Emirates NBD presta los 1.100 M y guarda la caja) y socio en aparcamientos de promotores (Dubai Holding, TECOM, Wasl) [1].',
      'El canon variable desde abril de 2025 sigue sin cerrarse con la RTA: la empresa provisiona el máximo (27,5 %) desde el 1T26 [1].',
      'Sin informe de gobierno corporativo ni de remuneraciones localizado: no se pueden comprobar comisiones, independientes ni votos de la junta.',
    ],
    confianza: 'Baja',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'comisiones, independientes, votos y remuneración del CEO', tipo: 'Núcleo', intentos: '1) Informe de gobierno corporativo 2025 en el DFM: no encontrado con el buscador ni en feeds.dfm.ae; 2) web de la empresa (parkin.ae): la sección de inversores no responde (404) y se genera con JavaScript; 3) cuentas 2025: solo la remuneración total de la alta dirección (7,3 M AED, 5,9 M en 2024)', decision: 'Omitido; se usa el consejo del informe de administradores y el folleto' },
    { seccion: 'gobierno', campo: 'insiders (operaciones de consejeros y directivos)', tipo: 'Complemento', intentos: '1) DFM, comunicaciones de operaciones de insiders: sin acceso al buscador; 2) prensa: ninguna noticia; 3) cuentas: sin pagos en acciones', decision: 'Omitido' },
  ],
});

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Yahoo Finance, históricos diarios (PARKIN.AE, ETF iShares MSCI UAE y ETF de infraestructuras globales IGF), con herramientas/bolsa.mjs', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/PARKIN.AE/history' },
  { id: 2, titulo: 'Parkin Company: estimaciones anuales 2026-2028 (ventas con ingresos financieros, EBITDA, EBIT, beneficio, BPA, dividendo), 9 analistas, objetivo medio 6,512 AED', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://www.marketscreener.com/quote/stock/PARKIN-COMPANY-167442725/finances/' },
  { id: 3, titulo: 'Yahoo Finance quoteSummary: PARKIN.AE (8 analistas, objetivo 5,55-7,30) y comparables (Salik, Dubai Taxi, Park24, Transurban, Atlas Arteria, Vinci, Getlink, Aena, Flughafen Zürich)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/PARKIN.AE/analysis' },
  { id: 4, titulo: 'Parkin Company: consenso tras el 2T26 (6 analistas, objetivo 6,34 AED, 5,35-7,00)', editor: 'Simply Wall St (vía Webull)', tipo: 'Analistas', fecha: '2026-08-17', url: 'https://www.webull.com.au/news-detail/15415713586824192' },
  { id: 5, titulo: 'First Look Note 2Q26: sube a COMPRAR con objetivo de 6,50 AED (DCF con WACC del 8,5 % y crecimiento final del 3,5 %)', editor: 'FAB Securities Research', tipo: 'Analistas', fecha: '2026-08-25', url: 'https://fabsresearch.bankfab.com/ResearchPortal/Download/Index/1611' },
  { id: 6, titulo: 'Market Yield on U.S. Treasury Securities at 10-Year Constant Maturity (DGS10): 5,09 % el 16-oct-2026', editor: 'FRED, Federal Reserve Bank of St. Louis', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://fred.stlouisfed.org/series/DGS10' },
  { id: 7, titulo: 'Country Default Spreads and Risk Premiums (Abu Dabi, Aa2: diferencial soberano 0,42 %, prima de país 0,64 %)', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/ctryprem.html' },
  { id: 8, titulo: 'Implied ERP by month (ERPbymonth.xlsx): 4,20 % en octubre de 2026', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 9, titulo: 'Yahoo Finance, dividendos de PARKIN.AE (0,117125 AED del 1S26, fecha ex 14-oct-2026)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/PARKIN.AE/history?filter=div' },
  { id: 10, titulo: 'DFM Exchange Dubai: acceso de los clientes de Interactive Brokers a la bolsa de Dubái (desde dic-2025)', editor: 'Interactive Brokers', tipo: 'Primaria', fecha: '2025-12-09', url: 'https://www.interactivebrokers.co.uk/en/trading/dfm-exchange-dubai.php' },
  { id: 11, titulo: 'Dubai and Qatar stock indexes plunge in Iran war', editor: 'AGBI', tipo: 'Prensa', fecha: '2026-03-12', url: 'https://www.agbi.com/markets/2026/03/dubai-and-qatar-stock-indexes-plunge-in-iran-war/' },
  { id: 12, titulo: 'Dubai parking operator increases revenue despite impact of Iran war', editor: 'The National', tipo: 'Prensa', fecha: '2026-08-13', url: 'https://www.thenationalnews.com/news/uae/2026/08/13/dubai-parking-operator-increases-revenue-despite-impact-of-iran-war/' },
  { id: 13, titulo: 'Resultados del 2T26 (deuda neta de 710,1 M y liquidez de 563,2 M a 30-jun-2026)', editor: 'Parkin Company P.J.S.C. (vía Zawya)', tipo: 'Primaria', fecha: '2026-08-13', url: 'https://www.zawya.com/en/press-release/companies-news/parkin-delivers-strong-financial-performance-in-q2-2026-456555' },
  { id: 14, titulo: 'Dubai stocks slip briefly into bear market territory', editor: 'Enterprise AM', tipo: 'Prensa', fecha: '2026-03-17', url: 'https://enterpriseam.com/uae/2026/03/17/dubai-stocks-slip-briefly-into-bear-market-territory/' },
];
// Comparables (sin la propia), Yahoo [3], a 20-oct-2026, convertidos a AED. PER de los próximos 12 meses = precio ÷ BPA NTM
// (2/12 del ejercicio en curso y 10/12 del siguiente; Park24, con ejercicio a octubre: 0/12 y 12/12). Crecimiento = ventas estimadas del
// ejercicio siguiente sobre el actual. Transurban sin PER (amortización de concesiones y distribuciones lo deforman) y
// Atlas Arteria fuera (consolida solo una parte de sus autopistas: EV/EBITDA de 227x en Yahoo).
const COMPS = [['SALIK.AE', 'Salik', 'AE', 2 / 12], ['DTC.AE', 'Dubai Taxi', 'AE', 2 / 12], ['4666.T', 'Park24', 'JP', 0], ['TCL.AX', 'Transurban', 'AU', null], ['DG.PA', 'Vinci', 'FR', 2 / 12], ['GET.PA', 'Getlink', 'FR', 2 / 12], ['AENA.MC', 'Aena', 'ES', 2 / 12], ['FHZN.SW', 'Flughafen Zürich', 'CH', 2 / 12]];
const empresas = COMPS.map(([s, nombre, pais, w0]) => {
  const c = cs[s]; const f = fx[c.cur]; const ff = fx[c.fcur];
  const e0 = c.et.find((e) => e.p === '0y'), e1 = c.et.find((e) => e.p === '+1y');
  const epsN = w0 !== null && e0?.eps && e1?.eps ? w0 * e0.eps + (1 - w0) * e1.eps : null;
  return {
    nombre, ticker: s, pais, capitalizacion: Math.round(c.mcap / 1e6 * f), ev_ventas: r2(c.evRev), ev_ebitda_ltm: s === 'ALX.AX' ? null : r1(c.evEbitda), ev_ebitda_ntm: null,
    per_ntm: epsN ? r1(c.price / epsN) : null, crecimiento_pct: e0?.rev && e1?.rev ? r1((e1.rev / e0.rev - 1) * 100) : null,
    margen_ebitda_pct: r1(c.ebitdaM * 100), roic_pct: null, dn_ebitda: s === 'ALX.AX' ? null : r2((c.debt - c.cash) / c.ebitda), fcf_yield_pct: r1(c.fcf * ff / (c.mcap * f) * 100),
  };
});
const yb = bolsa.bolsa;
const P = cs['PARKIN.AE'];
guarda('D', {
  _estado: 'completo',
  identificacion: {
    nombre: 'Parkin Company P.J.S.C.', nombre_corto: 'Parkin', ticker: 'PARKIN', isin: 'AEE01370P249', mercado: 'Dubai Financial Market (DFM)', indice_referencia: 'DFM General Index (ETF iShares MSCI UAE como aproximación)',
    pais: 'Emiratos Árabes Unidos', pais_iso: 'AE', sector: 'Industria', industria: 'Infraestructura de transporte (concesiones)', sede: 'Dubái', fundacion: '2023', empleados: 361, web: 'https://www.parkin.ae',
    precio: bolsa.identificacion.precio, fecha_precio: bolsa.identificacion.fecha_precio, acciones: 2999.0, capitalizacion_publicada: Math.round(P.mcap / 1e6), free_float_pct: 24.99,
    max_52s: bolsa.identificacion.max_52s, min_52s: bolsa.identificacion.min_52s,
    volumen_medio_diario: `≈ ${String(bolsa.volumen_3m.importe_dia_millones).replace('.', ',')} M AED/día (3 meses, ≈ 2 M USD)`, proximos_resultados: '2026-11-06',
  },
  consenso: {
    estimaciones: [
      { periodo: '2026e', ingresos: 1486, ebitda: 890.4, ebit: 809.2, bpa: 0.2249, dpa: 0.2142, fuente: 'MarketScreener (ventas y EBITDA con ingresos financieros) [2]' },
      { periodo: '2027e', ingresos: 1573, ebitda: 953.8, ebit: 884.2, bpa: 0.2564, dpa: 0.2602, fuente: 'MarketScreener [2]' },
      { periodo: '2028e', ingresos: 1675, ebitda: 1015, ebit: 949.3, bpa: 0.2753, dpa: 0.2854, fuente: 'MarketScreener [2]' },
    ],
    recomendaciones: { n_analistas: 9, comprar: null, mantener: null, vender: null, po_medio: 6.51, po_min: 5.55, po_max: 7.30 },
    base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: 1.2,
    confianza: 'Media',
  },
  bolsa: {
    tipo_rentabilidad: yb.tipo_rentabilidad, rentabilidades: yb.rentabilidades, anual: yb.anual,
    beta: yb.beta, volatilidad_pct: yb.volatilidad_pct, max_drawdown_pct: yb.max_drawdown_pct, posicion_corta_pct: null,
    confianza: 'Media',
  },
  multiplos_historicos: {
    serie: bolsa.cierres_ejercicio.map((c) => ({ anio: c.anio, precio_cierre: c.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    confianza: 'Media',
  },
  comparables: { empresas, confianza: 'Media' },
  transacciones: null,
  fuentes: fD,
  huecos: [
    { seccion: 'transacciones', campo: 'sección completa', tipo: 'Complemento', intentos: '1) Compra de SP+ por Metropolis (2023-2024, EV ≈ 1.500 M USD): el comunicado no da el EBITDA de referencia; 2) operadores europeos (Indigo, APCOA, Saba, Q-Park): participaciones privadas sin múltiplo publicado; 3) Golfo (Q Mobility, concesión de Parkin): sin precio ni EBITDA comparables (la concesión de la RTA no es una compraventa a mercado)', decision: 'Omitido; peso cero en la síntesis' },
    { seccion: 'consenso', campo: 'recomendaciones (desglose)', tipo: 'Complemento', intentos: '1) MarketScreener: media «Outperform» sin desglose; 2) Yahoo: «buy» de 8; 3) prensa: FAB «Comprar» (ago-26) y Simply Wall St (6 analistas)', decision: 'Omitido el desglose' },
    { seccion: 'bolsa', campo: 'posicion_corta_pct', tipo: 'Complemento', intentos: '1) DFM: el préstamo de valores no publica posiciones cortas por emisor; 2) Yahoo: sin dato; 3) prensa: sin noticias', decision: 'Omitido' },
  ],
});

// ---------------------------------------------------------------- E. Sentimiento
guarda('E', {
  _estado: 'completo',
  sentimiento: null,
  fuentes: [],
  huecos: [
    { seccion: 'sentimiento', campo: 'sección completa', tipo: 'Complemento', intentos: '1) Stocktwits (API de PARKIN): 404; 2) Reddit (búsqueda) e Investing (comentarios): 403; 3) búsqueda web de foros en inglés y árabe: solo noticias y fichas de dividendos, sin debate legible', decision: 'Omitido' },
  ],
});
console.log('Notas A-E escritas;', empresas.length, 'comparables');
