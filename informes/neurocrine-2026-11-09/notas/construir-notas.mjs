// Notas A-E de Neurocrine Biosciences (NBIX), corte 2026-11-09 (iteración tras el 3T26; parte de las notas del 15-oct). Hechas sin subagentes.
// Cifras de las cuentas: XBRL de la SEC (notas/cuentas-xbrl.json) contrastado con el 10-K 2025, los 10-Q y las notas de resultados.
// Ejecutar: node notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const EDGAR = 'https://www.sec.gov/Archives/edgar/data/914475';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Form 10-K 2025 (cuentas anuales auditadas, notas de segmento, impuestos, bonos convertibles, litigios)', editor: 'Neurocrine Biosciences, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-02-11', url: `${EDGAR}/000091447526000007/nbix-20251231.htm` },
  { id: 2, titulo: 'Form 10-Q 2T26 (balance a 30-jun-26, flujos del semestre, compra de Soleno, línea de crédito)', editor: 'Neurocrine Biosciences, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-07-31', url: `${EDGAR}/000091447526000037/nbix-20260630.htm` },
  { id: 3, titulo: 'Form 10-Q 1T26', editor: 'Neurocrine Biosciences, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-05-05', url: `${EDGAR}/000091447526000026/nbix-20260331.htm` },
  { id: 4, titulo: 'Neurocrine Biosciences Reports Second-Quarter 2026 Financial Results (Exhibit 99.1)', editor: 'Neurocrine Biosciences, Inc.', tipo: 'Primaria', fecha: '2026-07-30', url: `${EDGAR}/000091447526000035/q2-2026xearningsrelease.htm` },
  { id: 5, titulo: 'Neurocrine Biosciences Reports Fourth-Quarter and Full-Year 2025 Financial Results (Exhibit 99.1)', editor: 'Neurocrine Biosciences, Inc.', tipo: 'Primaria', fecha: '2026-02-11', url: `${EDGAR}/000091447526000006/q4-2025xearningsrelease.htm` },
  { id: 6, titulo: 'Neurocrine Biosciences Reports First-Quarter 2026 Financial Results (Exhibit 99.1)', editor: 'Neurocrine Biosciences, Inc.', tipo: 'Primaria', fecha: '2026-05-05', url: `${EDGAR}/000091447526000025/q1-2026xearningsrelease.htm` },
  { id: 7, titulo: 'Company facts XBRL de Neurocrine (CIK 914475): cuenta, balance, flujos, valores negociables, bonos convertibles, I+D adquirida', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0000914475.json' },
  { id: 8, titulo: 'Form 8-K: cierre de la compra de Soleno Therapeutics (2.900 M USD en caja)', editor: 'Neurocrine Biosciences, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-05-18', url: `${EDGAR}/000119312526228013/d94926d8k.htm` },
  { id: 9, titulo: 'Neurocrine Biosciences Reports Third-Quarter 2026 Financial Results (Exhibit 99.1 del 8-K 2.02): ventas por producto, guía de INGREZZA 2.900-2.925 M, conciliación GAAP a no GAAP', editor: 'Neurocrine Biosciences, Inc.', tipo: 'Primaria', fecha: '2026-11-02', url: `${EDGAR}/000091447526000053/q3-2026xearningsrelease.htm` },
  { id: 10, titulo: 'Form 10-Q 3T26 (balance a 30-sep-26, flujos de nueve meses, recompras, existencias no corrientes de VYKAT XR, IRA, investigación del DOJ; 101,2 M de acciones a 26-oct)', editor: 'Neurocrine Biosciences, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-11-02', url: `${EDGAR}/000091447526000054/nbix-20260930.htm` },
];

// Cuenta publicada (US GAAP, XBRL). EBITDA = EBIT + depreciación (+ amortización de intangibles comprados desde 2026).
const c = (periodo, ingresos, coste_ventas, gastos_generales, ebitda, amortizaciones, ebit, resultado_financiero, bai, impuestos, beneficio_neto, gastos_financieros, bpa, acciones_diluidas) => ({
  periodo, ingresos, coste_ventas, gastos_generales, ebitda, amortizaciones, ebit, resultado_financiero, bai, impuestos, minoritarios: 0, beneficio_neto, gastos_financieros,
  participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa, dpa: 0, dpa_extraordinario: 0, acciones_diluidas,
});
const cuenta = [
  c('2021', 1133.5, 14.3, 583.3, 113.4, 10.9, 102.5, -1.1, 101.4, 11.8, 89.6, 25.8, 0.92, 97.9),
  c('2022', 1488.7, 23.2, 752.7, 264.6, 15.6, 249.0, -35.1, 213.9, 59.4, 154.5, 7.1, 1.56, 98.9),
  c('2023', 1887.1, 39.7, 887.6, 272.2, 21.3, 250.9, 81.2, 332.1, 82.4, 249.7, 4.6, 2.47, 101.0),
  c('2024', 2355.3, 34.0, 1007.2, 597.6, 27.1, 570.5, -84.5, 486.0, 144.7, 341.3, 2.0, 3.29, 103.7),
  c('2025', 2860.5, 52.1, 1156.2, 649.2, 30.1, 619.1, 86.3, 705.4, 226.8, 478.6, 0, 4.67, 102.5),
];

const A = {
  _estado: 'Completo. Revisado el 9-nov cifra a cifra: cuenta y flujos 2021-2025 iguales al XBRL de la SEC (companyfacts descargado el 9-nov); caja del balance = efectivo + valores disponibles para la venta corrientes y no corrientes, cuadrada año a año; ventas por producto 2023-2025 contra las notas de resultados del 4T; recompras de 2024 (300 M), 2025 (167,7 M) y 2026 (158,1 M) contra el XBRL; LTM a septiembre de 2026 con el 10-Q del 3T26.',
  negocio: {
    segmentos: [
      { nombre: 'INGREZZA (valbenazina)', descripcion: 'Inhibidor de VMAT2 para discinesia tardía y corea de Huntington; solo EE. UU.', tipo_resultado: null, historico: [
        { periodo: '2023', ingresos: 1836.0, resultado: null }, { periodo: '2024', ingresos: 2313.5, resultado: null }, { periodo: '2025', ingresos: 2513.7, resultado: null } ] },
      { nombre: 'CRENESSITY (crinecerfont)', descripcion: 'Antagonista CRF1 para hiperplasia suprarrenal congénita clásica; lanzado en dic-2024', tipo_resultado: null, historico: [
        { periodo: '2023', ingresos: 0, resultado: null }, { periodo: '2024', ingresos: 1.7, resultado: null }, { periodo: '2025', ingresos: 301.2, resultado: null } ] },
      { nombre: 'Otros (ALKINDI, EFMODY, royalties de AbbVie y Tanabe)', descripcion: 'Productos europeos vendidos en ene-2026 y royalties de elagolix (Orilissa/Oriahnn) y de valbenazina en Asia', tipo_resultado: null, historico: [
        { periodo: '2023', ingresos: 51.1, resultado: null }, { periodo: '2024', ingresos: 40.1, resultado: null }, { periodo: '2025', ingresos: 45.6, resultado: null } ] },
    ],
    geografias: [{ nombre: 'EE. UU.', peso_pct: 98.4 }, { nombre: 'Resto (royalties y Europa)', peso_pct: 1.6 }],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Ventas netas de INGREZZA (M USD, trimestre)', valor_anterior: '687 (3T25)', valor_actual: '801 (3T26)', variacion: '+17 %', comentario: 'Volumen de dos dígitos con récord de recetas totales y nuevas; en 2025 el año creció un 8,7 % por la bajada del precio neto [9, 5].' },
      { kpi: 'Ventas netas de CRENESSITY (M USD)', valor_anterior: '183,5 (2T26)', valor_actual: '211 (3T26)', variacion: '+15 % en el trimestre; +115 % interanual', comentario: 'Demanda de pacientes nuevos estable; reembolso de en torno al 80 % de las recetas dispensadas [9].' },
      { kpi: 'Ventas netas de VYKAT XR (M USD, trimestre completo)', valor_anterior: '94 (2T26 pro forma)', valor_actual: '106,7 (3T26)', variacion: '+13,5 %', comentario: 'Primer trimestre completo consolidado; la dirección esperaba ventas planas en torno a 94 M [9, 4].' },
       ,
      { kpi: 'Gasto de I+D (GAAP, M USD)', valor_anterior: '731,1 (2024)', valor_actual: '1.015,7 (2025)', variacion: '+39 %', comentario: 'Dos fases 3 (osavampator y direclidina); guía 2026 de 1.275-1.325 M [1, 4].' },
      { kpi: 'Empleados', valor_anterior: '≈ 200 (2017)', valor_actual: '≈ 2.000 (2025)', variacion: '×10', comentario: 'Ampliación de las redes de ventas de INGREZZA y CRENESSITY en el 1T26 [1].' },
    ],
    confianza: 'Alta',
  },
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM sep-26', fecha_fin: '2026-09-30', ingresos: 3701.7, ebitda: 970.7, ebit: 887.1, beneficio_neto: 702.5, bpa: 6.74, dpa: 0, dpa_extraordinario: 0, fcf: 1039.7, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 124.9 },
    cambios_perimetro: [{ periodo: '2026', descripcion: 'Soleno Therapeutics (VYKAT XR), consolidada desde el 18-may-26 por 2.830 M USD en caja; venta de Neurocrine Group Limited (ALKINDI y EFMODY) en ene-2026 con 28,6 M de plusvalía.' }],
    comentario: null, ajustes: null,
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '4T24', ingresos: 627.7, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 1.00, vs_consenso: null },
      { periodo: '1T25', ingresos: 572.6, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.08, vs_consenso: null },
      { periodo: '2T25', ingresos: 687.5, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 1.06, vs_consenso: null },
      { periodo: '3T25', ingresos: 794.9, crecimiento_pct: 27.8, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 2.04, vs_consenso: null },
      { periodo: '4T25', ingresos: 805.5, crecimiento_pct: 28.3, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 1.48, vs_consenso: null },
      { periodo: '1T26', ingresos: 814.5, crecimiento_pct: 42.2, crecimiento_organico_pct: 42.2, ebitda: null, margen_ebitda_pct: null, bpa: 1.91, vs_consenso: 'Superior' },
      { periodo: '2T26', ingresos: 959.0, crecimiento_pct: 39.5, crecimiento_organico_pct: 31.6, ebitda: null, margen_ebitda_pct: null, bpa: 1.39, vs_consenso: 'Superior' },
      { periodo: '3T26', ingresos: 1122.7, crecimiento_pct: 41.2, crecimiento_organico_pct: 27.8, ebitda: 375.4, margen_ebitda_pct: 33.4, bpa: 1.96, vs_consenso: 'Superior' },
    ],
    ultima_presentacion: null,
    confianza: 'Alta',
  },
  balance: {
    // caja = efectivo + valores negociables a corto y largo plazo (bonos corporativos y de agencias; liquidez inmediata). Deuda = bonos convertibles al 2,25 % con vencimiento en 2024.
    historico: [
      { periodo: '2021', activo_total: 2072.5, activo_corriente: 972.8, pasivo_corriente: 245.8, pasivo_total: 698.5, fondo_comercio: 0, intangibles: 0, inmovilizado_material: 58.6, existencias: 30.5, clientes: 185.5, proveedores: 225.8, activos_contrato: null, pasivos_contrato: null, caja: 1272.0, deuda_financiera: 335.1, arrendamientos: 0, patrimonio_neto: 1374.0, minoritarios: 0, reservas: -635.8 },
      { periodo: '2022', activo_total: 2368.7, activo_corriente: 1453.5, pasivo_corriente: 537.7, pasivo_total: 660.9, fondo_comercio: 5.4, intangibles: 37.2, inmovilizado_material: 58.6, existencias: 35.1, clientes: 350.0, proveedores: 347.6, activos_contrato: null, pasivos_contrato: null, caja: 1288.7, deuda_financiera: 169.4, arrendamientos: 0, patrimonio_neto: 1707.8, minoritarios: 0, reservas: -406.8 },
      { periodo: '2023', activo_total: 3251.4, activo_corriente: 1607.0, pasivo_corriente: 654.8, pasivo_total: 1019.4, fondo_comercio: 5.8, intangibles: 35.5, inmovilizado_material: 70.8, existencias: 38.3, clientes: 439.3, proveedores: 448.8, activos_contrato: null, pasivos_contrato: null, caja: 1719.1, deuda_financiera: 170.1, arrendamientos: 0, patrimonio_neto: 2232.0, minoritarios: 0, reservas: -157.1 },
      { periodo: '2024', activo_total: 3718.7, activo_corriente: 1724.7, pasivo_corriente: 507.7, pasivo_total: 1129.0, fondo_comercio: 5.7, intangibles: 36.5, inmovilizado_material: 82.6, existencias: 57.4, clientes: 479.1, proveedores: 461.6, activos_contrato: null, pasivos_contrato: null, caja: 1815.6, deuda_financiera: 0, arrendamientos: 0, patrimonio_neto: 2589.7, minoritarios: 0, reservas: 29.2 },
      { periodo: '2025', activo_total: 4631.5, activo_corriente: 2522.7, pasivo_corriente: 743.4, pasivo_total: 1378.4, fondo_comercio: 6.1, intangibles: 4.7, inmovilizado_material: 89.8, existencias: 69.0, clientes: 686.8, proveedores: 674.3, activos_contrato: null, pasivos_contrato: null, caja: 2543.4, deuda_financiera: 0, arrendamientos: 0, patrimonio_neto: 3253.1, minoritarios: 0, reservas: 447.7 },
    ],
    vencimientos: [{ anio: '2031', importe: 0 }],
    liquidez: 'Caja y valores negociables de 789,7 M USD a 30-sep-26 (641,5 de efectivo, 96,4 de valores a corto y 51,8 a largo) más una línea de crédito garantizada de 1.000 M sin disponer (vence el 14-may-2031); participaciones cotizadas de 95,0 M [10, 9].',
    rating: 'Sin rating',
    coste_deuda_pct: null, vida_media_anios: null,
    otros_pasivos: null, comentario: null,
    confianza: 'Alta',
  },
  flujos: {
    historico: [
      { periodo: '2021', flujo_operativo: 256.5, capex: 23.4, pagos_arrendamientos: 0, adquisiciones: 0, desinversiones: 0, dividendos: 0, recompras: 0, emision_acciones: 27.5, intereses_en_financiacion: 0 },
      { periodo: '2022', flujo_operativo: 339.4, capex: 16.5, pagos_arrendamientos: 0, adquisiciones: 42.7, desinversiones: 0, dividendos: 0, recompras: 0, emision_acciones: 44.7, intereses_en_financiacion: 0 },
      { periodo: '2023', flujo_operativo: 389.9, capex: 28.3, pagos_arrendamientos: 0, adquisiciones: 0, desinversiones: 0, dividendos: 0, recompras: 0, emision_acciones: 65.3, intereses_en_financiacion: 0 },
      { periodo: '2024', flujo_operativo: 595.4, capex: 38.2, pagos_arrendamientos: 0, adquisiciones: 0, desinversiones: 0, dividendos: 0, recompras: 300.0, emision_acciones: 122.1, intereses_en_financiacion: 0 },
      { periodo: '2025', flujo_operativo: 782.7, capex: 34.0, pagos_arrendamientos: 0, adquisiciones: 0, desinversiones: 0, dividendos: 0, recompras: 167.7, emision_acciones: 129.4, intereses_en_financiacion: 0 },
    ],
    comentario: null,
    confianza: 'Alta',
  },
  calidad: { auditor: 'Ernst & Young LLP', anios_auditor: 34, opinion: 'Favorable (sin salvedades; control interno eficaz a 31-dic-25)', comentario: null, senales: [], confianza: 'Alta' },
  capital: {
    politica: null,
    adquisiciones: [
      { anio: '2026', objetivo: 'Soleno Therapeutics (VYKAT XR, hiperfagia en el síndrome de Prader-Willi)', importe: 2829.9, ev_ebitda: null, financiacion: 'Caja propia (préstamo puente de 600 M de la línea de crédito, devuelto en junio)', resultado: 'Demasiado pronto, pero mejor de lo temido: VYKAT XR pasó de 94 M pro forma en el 2T26 a 106,7 M en el 3T26 pese a la alerta de seguridad de las asociaciones de pacientes (ago-26) [9, 4, 8].' },
      { anio: '2022', objetivo: 'Diurnal Group (ALKINDI, EFMODY; Reino Unido)', importe: 42.7, ev_ebitda: null, financiacion: 'Caja', resultado: 'Vendida en ene-2026 (Neurocrine Group Limited) con 28,6 M de plusvalía neta: compra menor sin efecto en las cifras [2].' },
    ],
    comentario: null,
    confianza: 'Alta',
  },
  huecos: [
    { seccion: 'trimestres', campo: 'EBITDA trimestral (salvo 3T26)', tipo: 'Complemento', intentos: '1) notas de resultados (solo resultado de explotación y BPA); 2) XBRL trimestral (sin depreciación trimestral); 3) 10-Q (depreciación acumulada; el 3T26 se calcula como diferencia de nueve meses y seis meses)', decision: 'Calculado y marcado como estimación' },
  ],
  fuentes: fA,
};

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Form 10-K 2025: negocio, patentes de INGREZZA (22 patentes del Orange Book hasta 2040; genéricos desde el 1-mar-2038 por los acuerdos de 2023), competencia y prevalencia de la discinesia tardía', editor: 'Neurocrine Biosciences, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-02-11', url: `${EDGAR}/000091447526000007/nbix-20251231.htm` },
  { id: 2, titulo: 'Form 10-Q 2T26: IRA (excepción de pequeña biotecnológica de INGREZZA hasta la selección de 2027 para precios de 2029), AUSTEDO con precio negociado en 2027, competencia', editor: 'Neurocrine Biosciences, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-07-31', url: `${EDGAR}/000091447526000037/nbix-20260630.htm` },
  { id: 3, titulo: "Teva's Q4 earnings beat, branded drugs drive revenue growth (AUSTEDO 2025: 2.260 M USD; guía 2026 2.400-2.550 M)", editor: 'Zacks', tipo: 'Prensa', fecha: '2026-01-28', url: 'https://www.zacks.com/stock/news/2825449/teva-s-q4-earnings-beat-branded-drugs-drive-revenue-growth' },
  { id: 4, titulo: 'CMS Announces Part D Savings & 2027 Maximum Fair Prices for 15 New Medicare-Negotiated Drugs (AUSTEDO: 6.623 USD de lista y 4.093 USD negociado, −38 %)', editor: 'Ritter Insurance Marketing', tipo: 'Sectorial', fecha: '2025-11-25', url: 'https://ritterim.com/blog/cms-announces-part-d-savings-and-2027-maximum-fair-prices-for-15-new-medicare-negotiated-drugs' },
  { id: 5, titulo: 'CMS Obtains Meaningful Discounts for IPAY 2027 Selected Drugs', editor: 'Manatt Health', tipo: 'Sectorial', fecha: '2025-12', url: 'https://www.manatt.com/insights/newsletters/health-highlights/cms-obtains-meaningful-discounts-for-ipay-2027-selected-drugs' },
  { id: 6, titulo: 'Prader-Willi syndrome groups call attention to possible safety risks with Vykat XR', editor: 'Healio', tipo: 'Prensa', fecha: '2026-08-13', url: 'https://www.healio.com/news/endocrinology/20260813/praderwilli-syndrome-groups-call-attention-to-possible-safety-risks-with-vykat-xr' },
  { id: 7, titulo: 'Soleno Therapeutics reports fourth quarter and full year 2025 financial results (VYKAT XR 190,4 M en 2025; 91,7 M en el 4T25; 859 pacientes en tratamiento)', editor: 'Soleno Therapeutics (BioSpace)', tipo: 'Primaria', fecha: '2026-02-25', url: 'https://www.biospace.com/press-releases/soleno-therapeutics-reports-fourth-quarter-and-full-year-2025-financial-results-and-provides-update-on-u-s-launch-of-vykat-xr' },
  { id: 8, titulo: 'Incyte, United Therapeutics, Vertex, BioMarin, Jazz y Exelixis: estadísticas (capitalización, EV, márgenes, ROIC) a 14-oct-26', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/incy/statistics/' },
  { id: 9, titulo: 'Teva, after 3rd straight year of growth, expects downturn in 2026', editor: 'Fierce Pharma', tipo: 'Prensa', fecha: '2026-01-28', url: 'https://www.fiercepharma.com/pharma/teva-third-year-growth-innovative-products-expects-downturn-2026' },
  { id: 10, titulo: 'Neurocrine stands by blockbuster hopeful Vykat XR as Prader-Willi docs raise potential safety flags', editor: 'Fierce Pharma', tipo: 'Prensa', fecha: '2026-08-12', url: 'https://www.fiercepharma.com/pharma/neurocrines-blockbuster-hopeful-vykat-xr-tied-possible-safety-risks-prader-willi-clinicians' },
  { id: 11, titulo: 'Form 10-Q 3T26: competencia de INGREZZA, CRENESSITY y VYKAT XR; ANDA con certificación del párrafo IV de Alvogen contra VYKAT XR (sep-26, demanda en oct-26, suspensión de 30 meses; exclusividades hasta mar-2028 y mar-2032); excepción de pequeña biotecnológica de INGREZZA confirmada en ene-2026', editor: 'Neurocrine Biosciences, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-11-02', url: `${EDGAR}/000091447526000054/nbix-20260930.htm` },
  { id: 12, titulo: 'Teva Reports Third Quarter 2026 Financial Results (Exhibit 99.1 del 8-K): AUSTEDO 751 M en el trimestre (+21 % a divisa local; 727 M en EE. UU.), previsión de AUSTEDO 2026 subida a 2.550-2.650 M, beneficio operativo GAAP 714 M sobre 4.400 M de ventas, acuerdo de nación más favorecida con la Administración (oct-26)', editor: 'Teva Pharmaceutical Industries (SEC)', tipo: 'Primaria', fecha: '2026-11-03', url: 'https://www.sec.gov/Archives/edgar/data/818686/000117184326007054/exh_991.htm' },
  { id: 13, titulo: 'Vertex Reports Third Quarter 2026 Financial Results (Exhibit 99.1): ventas 3.440 M (+12 %), beneficio operativo GAAP 712,9 M, cierre de la compra de Crinetics, guía de PALSONIFY 40-50 M en 2026', editor: 'Vertex Pharmaceuticals (SEC)', tipo: 'Primaria', fecha: '2026-11-02', url: 'https://www.sec.gov/Archives/edgar/data/875320/000087532026000287/ex-991_q32026.htm' },
  { id: 14, titulo: 'Vertex to Acquire Crinetics Pharmaceuticals (Exhibit 99.1 del 8-K): 85 USD por acción en caja, valor de 10.000 M (8.800 M neto de caja); atumelnant en fase 3 para CAH', editor: 'Crinetics Pharmaceuticals (SEC)', tipo: 'Primaria', fecha: '2026-07-06', url: 'https://www.sec.gov/Archives/edgar/data/1658247/000114036126027642/ef20077399_ex99-1.htm' },
  { id: 15, titulo: 'Form 8-K de Crinetics: cierre de la fusión con Vertex y exclusión del Nasdaq', editor: 'Crinetics Pharmaceuticals (SEC)', tipo: 'Primaria', fecha: '2026-09-01', url: 'https://www.sec.gov/Archives/edgar/data/1658247/000114036126035195/ef20081409_8k.htm' },
  { id: 16, titulo: 'Crinetics Reports Second Quarter 2026 Financial Results: PALSONIFY 24,0 M en el trimestre, designación pediátrica rara de atumelnant, caja 1.200 M', editor: 'Crinetics Pharmaceuticals (SEC)', tipo: 'Primaria', fecha: '2026-08-03', url: 'https://www.sec.gov/Archives/edgar/data/1658247/000165824726000052/crnxq226earningspr.htm' },
  { id: 17, titulo: 'Johnson & Johnson: datos suplementarios de ventas del 3T26 (Exhibit 99.2): CAPLYTA 398 M en el trimestre (+66,1 %) y 1.029 M en nueve meses', editor: 'Johnson & Johnson (SEC)', tipo: 'Primaria', fecha: '2026-10-13', url: 'https://www.sec.gov/Archives/edgar/data/200406/000020040626000189/a2026q3exhibit992.htm' },
  { id: 18, titulo: 'Bristol Myers Squibb Reports Third Quarter 2026 Financial Results (Exhibit 99.1): COBENFY 57 M en el trimestre (55 M en EE. UU.; +33 %)', editor: 'Bristol Myers Squibb (SEC)', tipo: 'Primaria', fecha: '2026-10-29', url: 'https://www.sec.gov/Archives/edgar/data/14272/000001427226000022/a2026q3ex991-filing.htm' },
  { id: 19, titulo: 'Xenon Reports Second Quarter 2026 Financial Results: NDA de azetukalner en epilepsia focal en el 3T26; datos de X-NOVA2 en depresión mayor en el 1S27; caja 1.200 M', editor: 'Xenon Pharmaceuticals (SEC)', tipo: 'Primaria', fecha: '2026-08-06', url: 'https://www.sec.gov/Archives/edgar/data/1582313/000119312526338019/xene-ex99_1.htm' },
  { id: 20, titulo: 'Spruce Biosciences Reports Second Quarter 2026 Financial Results: la empresa se centra en TA-ERT (MPS IIIB), BLA en el 4T26; sin programas en CAH', editor: 'Spruce Biosciences (SEC)', tipo: 'Primaria', fecha: '2026-08-12', url: 'https://www.sec.gov/Archives/edgar/data/1683553/000119312526345874/sprb-ex99_1.htm' },
  { id: 21, titulo: 'VMAT2 Inhibitors Market – Global Forecast 2025-2034 (5.000 M USD en 2024; 5.400 M en 2025; 12.300 M en 2034; TCAC 9,6 %; valbenazina 2.400 M en 2024; Norteamérica 39,5 %)', editor: 'Global Market Insights', tipo: 'Sectorial', fecha: '2025-05', url: 'https://www.gminsights.com/industry-analysis/vmat2-inhibitors-market' },
  { id: 22, titulo: 'Tardive Dyskinesia Treatment Market to Reach US$ 6.6 Billion by 2034 (3.600 M USD en 2024; TCAC 6,3 %; deutetrabenazina 46,3 % en 2023)', editor: 'Market.us', tipo: 'Sectorial', fecha: '2025-07-30', url: 'https://media.market.us/tardive-dyskinesia-treatment-market-news' },
  { id: 23, titulo: 'Teva Reports Fourth Quarter and Full Year 2025 Financial Results (Exhibit 99.1): AUSTEDO en EE. UU. 2.217 M en 2025 frente a 1.642 M en 2024 (+35 %)', editor: 'Teva Pharmaceutical Industries (SEC)', tipo: 'Primaria', fecha: '2026-01-28', url: 'https://www.sec.gov/Archives/edgar/data/818686/000117184326000462/exh_991.htm' },
  { id: 24, titulo: 'Teva Reports Fourth Quarter and Full Year 2024 Financial Results (Exhibit 99.1): AUSTEDO en EE. UU. 1.642 M en 2024 frente a 1.225 M en 2023 (+34 %)', editor: 'Teva Pharmaceutical Industries (SEC)', tipo: 'Primaria', fecha: '2025-01-29', url: 'https://www.sec.gov/Archives/edgar/data/818686/000117184325000493/exh_991.htm' },
];
const B = {
  _estado: 'Completo y rehecho el 9-nov: mercado de VMAT2 contrastado con las cuentas de Neurocrine y Teva y con dos informes de mercado; resultados del 3T26 (o del 2T26 cuando aún no hay 3T) de Teva, Vertex/Crinetics, J&J (CAPLYTA), Bristol-Myers (COBENFY), Xenon y Spruce.',
  negocio: { descripcion: null, como_gana_dinero: null, clientes: null },
  sector: {
    definicion: null,
    tamano: '≈ 4.731 M USD en 2025 en EE. UU.: INGREZZA 2.514 M [1] + AUSTEDO 2.217 M [23]; ≈ 5.470 M en 2026e (estimación propia con el punto medio de la guía de INGREZZA, 2.900-2.925 M, y de la previsión global de AUSTEDO, 2.550-2.650 M, menos unos 45 M de ventas fuera de EE. UU.) [11, 12]. Los informes de mercado dan 5.400 M en 2025 (VMAT2 global) [21] y 3.600 M en 2024 (discinesia tardía) [22]',
    unidad_serie: 'millones de USD (ventas netas en EE. UU. de INGREZZA + AUSTEDO)',
    serie: [ { anio: '2023', tamano: 3061 }, { anio: '2024', tamano: 3956 }, { anio: '2025', tamano: 4731 }, { anio: '2026e', tamano: 5468 } ],
    tcac_historico_pct: 24.3, tcac_previsto_pct: 5.0, cr5_pct: 99.0, estructura: 'Concentrada (duopolio)',
    drivers: [], porter: [], ciclo: { posicion: 'Expansión', comentario: null }, regulacion: null, tendencias: null,
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 53.1, posicion: '1.º en inhibidores de VMAT2 en EE. UU. (53,1 % de las ventas de 2025 y 52,4 % en el 3T26 frente a AUSTEDO de Teva); único tratamiento aprobado en CAH clásica (CRENESSITY) y en hiperfagia del Prader-Willi (VYKAT XR)',
    competidores: [
      { nombre: 'Teva (AUSTEDO / AUSTEDO XR)', pais: 'IL', ticker: 'TEVA', ingresos: 2217, cuota_pct: 46.9, margen_ebit_pct: 16.2, comentario: 'Único rival directo en discinesia tardía (ingresos: AUSTEDO en EE. UU. en 2025). En el 3T26 AUSTEDO creció más que INGREZZA en EE. UU. (727 M, +21 %, frente a 801 M, +17 %) y Teva subió su previsión 2026 a 2.550-2.650 M; precio de Medicare negociado desde el 1-ene-2027 (−38 % sobre lista). Margen: beneficio operativo GAAP del grupo en el 3T26 [12, 23, 4].' },
      { nombre: 'Vertex (atumelnant, vía Crinetics)', pais: 'US', ticker: 'VRTX', ingresos: 13200, cuota_pct: null, margen_ebit_pct: 20.7, comentario: 'Compró Crinetics por 10.000 M (cierre el 1-sep-26); atumelnant, oral diario en fase 3 para CAH, es el primer rival de CRENESSITY con un gigante detrás. Ingresos: guía 2026; margen: 3T26 GAAP [13, 14, 15].' },
      { nombre: 'Johnson & Johnson (CAPLYTA)', pais: 'US', ticker: 'JNJ', ingresos: 1029, cuota_pct: null, margen_ebit_pct: null, comentario: 'CAPLYTA, ya aprobado como adyuvante en depresión mayor, vendió 398 M en el 3T26 (+66 %): es el listón comercial de osavampator si su fase 3 sale bien en 2027. Ingresos: nueve meses de 2026 [17].' },
      { nombre: 'Bristol Myers Squibb (COBENFY)', pais: 'US', ticker: 'BMY', ingresos: 57, cuota_pct: null, margen_ebit_pct: null, comentario: 'Primer agonista muscarínico en esquizofrenia; solo 57 M en el 3T26 (+33 %), un lanzamiento lento que rebaja las expectativas de direclidina. Ingresos: trimestre [18].' },
      { nombre: 'Xenon (azetukalner)', pais: 'CA', ticker: 'XENE', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Abridor de canales KV7 con NDA en epilepsia en el 3T26 y datos en depresión mayor (X-NOVA2) en el 1S27, a la vez que osavampator [19].' },
      { nombre: 'Incyte', pais: 'US', ticker: 'INCY', ingresos: 5820, cuota_pct: null, margen_ebit_pct: null, comentario: 'Comparable de modelo: dependencia de un producto (Jakafi) con vencimiento cercano; margen EBITDA 33,4 % [8].' },
      { nombre: 'Jazz Pharmaceuticals', pais: 'IE', ticker: 'JAZZ', ingresos: 4600, cuota_pct: null, margen_ebit_pct: null, comentario: 'Neurociencia (Xywav) con genéricos de Xyrem; margen EBITDA 41,9 % [8].' },
    ],
    foso: { veredicto: 'Estrecho', tendencia: 'Estable', fuentes: [
      { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'No aplica a un medicamento.' },
      { fuente: 'Costes de cambio', puntuacion: 3, evidencia: 'Pacientes estables con un tratamiento crónico rara vez cambian; la persistencia de INGREZZA supera a la de AUSTEDO XR según datos de la empresa presentados en 2026 [11].' },
      { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 4, evidencia: '22 patentes del Orange Book de INGREZZA hasta 2040 y genéricos pactados desde 2038; CRENESSITY y VYKAT XR, primeros de su clase, aunque VYKAT XR ya tiene un genérico (Alvogen) litigando sus patentes [1, 11].' },
      { fuente: 'Ventaja en costes', puntuacion: 2, evidencia: 'Coste de ventas del 1,8 %, pero igual que cualquier medicamento con patente [1].' },
      { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'Duopolio en VMAT2; en CAH entra Vertex con atumelnant, que rompe la idea de un mercado demasiado pequeño para un tercero [1, 14].' },
    ] },
    amenazas: null,
    confianza: 'Media',
  },
  fuentes: fB,
};

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Proxy statement 2026 (DEF 14A): consejo, remuneración 2025, accionistas, ratio de remuneración', editor: 'Neurocrine Biosciences, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-04-15', url: `${EDGAR}/000091447526000015/nbix-20260415.htm` },
  { id: 2, titulo: 'Form 8-K: resultados de la junta de 27-may-2026', editor: 'Neurocrine Biosciences, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-05-28', url: `${EDGAR}/000091447526000029/nbix-20260527.htm` },
  { id: 3, titulo: 'Form 4 presentados entre el 9-nov-25 y el 9-nov-26 (herramientas/form4.mjs)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-11-09', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000914475&type=4' },
  { id: 4, titulo: 'Form 8-K: cambio de director médico (Eiry Roberts sustituye a Sanjay Keswani)', editor: 'Neurocrine Biosciences, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-09-28', url: `${EDGAR}/000091447526000045/nbix-20260925.htm` },
  { id: 5, titulo: 'Form 10-K 2025: investigación civil del Departamento de Justicia sobre la promoción de INGREZZA (ago-2025)', editor: 'Neurocrine Biosciences, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-02-11', url: `${EDGAR}/000091447526000007/nbix-20251231.htm` },
  { id: 6, titulo: 'Neurocrine Biosciences Reports Fourth-Quarter and Full-Year 2025 Financial Results (guía 2025 y 2026 de INGREZZA)', editor: 'Neurocrine Biosciences, Inc.', tipo: 'Primaria', fecha: '2026-02-11', url: `${EDGAR}/000091447526000006/q4-2025xearningsrelease.htm` },
  { id: 7, titulo: 'Neurocrine Biosciences Reports Second-Quarter 2026 Financial Results', editor: 'Neurocrine Biosciences, Inc.', tipo: 'Primaria', fecha: '2026-07-30', url: `${EDGAR}/000091447526000035/q2-2026xearningsrelease.htm` },
  { id: 8, titulo: 'Neurocrine Biosciences Reports Third-Quarter 2026 Financial Results (guía de INGREZZA subida a 2.900-2.925 M; vuelta de Eiry Roberts; día de I+D el 15-dic)', editor: 'Neurocrine Biosciences, Inc.', tipo: 'Primaria', fecha: '2026-11-02', url: `${EDGAR}/000091447526000053/q3-2026xearningsrelease.htm` },
  { id: 9, titulo: 'Schedule 13G de Vanguard Portfolio Management (5,08 M de acciones, 5 %, a 30-sep-26)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-30', url: `${EDGAR}/000210012126001081/xslSCHEDULE_13G_X02/primary_doc.xml` },
  { id: 10, titulo: 'Form 8-K: prórroga hasta el 31-dic-2026 del contrato de Eiry Roberts como asesora estratégica', editor: 'Neurocrine Biosciences, Inc. (SEC)', tipo: 'Primaria', fecha: '2025-11-24', url: `${EDGAR}/000091447525000186/nbix-20251121.htm` },
  { id: 11, titulo: 'Schedule 13G/A de JPMorgan Chase (5,30 M de acciones, 5,2 %, a 30-sep-26)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-15', url: `${EDGAR}/000001961726000371/xslSCHEDULE_13G_X02/primary_doc.xml` },
  { id: 12, titulo: 'Schedule 13G de Vanguard Capital Management (5,26 M de acciones, 5,23 %, a 31-mar-26)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-04-30', url: `${EDGAR}/000210011926000841/xslSCHEDULE_13G_X02/primary_doc.xml` },
  { id: 13, titulo: 'Schedule 13G/A de The Vanguard Group (0 acciones tras la reorganización interna del 12-ene-2026)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-03-27', url: `${EDGAR}/000010290926001848/xslSCHEDULE_13G_X02/primary_doc.xml` },
  { id: 14, titulo: 'Form 3 de Eiry W. Roberts como directora médica (evento del 28-sep-2026)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-07', url: `${EDGAR}/000172760626000004/xslF345X06/wk-form3_1791411301.xml` },
  { id: 15, titulo: 'Neurocrine Biosciences Reports Fourth Quarter and Year-End 2022 Financial Results (guía de INGREZZA 2023: 1.670-1.770 M)', editor: 'Neurocrine Biosciences, Inc.', tipo: 'Primaria', fecha: '2023-02-06', url: `${EDGAR}/000091447523000005/` },
  { id: 16, titulo: 'Neurocrine Biosciences Reports Third Quarter 2023 Financial Results (guía 2023 subida a 1.820-1.840 M; antes 1.770-1.820 M en el 2T23)', editor: 'Neurocrine Biosciences, Inc.', tipo: 'Primaria', fecha: '2023-10-31', url: `${EDGAR}/000091447523000072/` },
  { id: 17, titulo: 'Neurocrine Biosciences Reports Fourth Quarter and Full Year 2023 Financial Results (INGREZZA 2023: 1.840 M; guía 2024: 2.100-2.200 M)', editor: 'Neurocrine Biosciences, Inc.', tipo: 'Primaria', fecha: '2024-02-07', url: `${EDGAR}/000091447524000033/` },
  { id: 18, titulo: 'Neurocrine Biosciences Reports Third Quarter 2024 Financial Results (guía 2024 subida a 2.300-2.320 M; antes 2.250-2.300 M en el 2T24)', editor: 'Neurocrine Biosciences, Inc.', tipo: 'Primaria', fecha: '2024-10-30', url: `${EDGAR}/000091447524000210/` },
  { id: 19, titulo: 'Neurocrine Biosciences Reports Fourth Quarter and Full Year 2024 Financial Results (guía 2025: 2.500-2.600 M)', editor: 'Neurocrine Biosciences, Inc.', tipo: 'Primaria', fecha: '2025-02-06', url: `${EDGAR}/000091447525000034/` },
  { id: 20, titulo: 'Neurocrine Biosciences Reports Second Quarter 2025 Financial Results (guía 2025 estrechada a 2.500-2.550 M por menor precio neto)', editor: 'Neurocrine Biosciences, Inc.', tipo: 'Primaria', fecha: '2025-07-30', url: `${EDGAR}/000091447525000157/` },
  { id: 21, titulo: 'Form 8-K: resultados de la junta de 21-may-2025 (remuneración: 77,98 M a favor, 6,07 M en contra, 1,68 M abstenciones)', editor: 'Neurocrine Biosciences, Inc. (SEC)', tipo: 'Primaria', fecha: '2025-05-22', url: `${EDGAR}/000091447525000120/nbix-20250521.htm` },
  { id: 22, titulo: 'Form 8-K: resultados de la junta de 22-may-2024 (remuneración: 80,28 M a favor, 4,28 M en contra, 1,11 M abstenciones)', editor: 'Neurocrine Biosciences, Inc. (SEC)', tipo: 'Primaria', fecha: '2024-05-23', url: `${EDGAR}/000091447524000140/nbix-20240522.htm` },
];
const C = {
  _estado: 'Completo y rehecho el 9-nov: proxy 2026 releído (remuneración, propiedad, ratio 49:1), junta de mayo, 8-K de 12 meses (nov-25, may-26, sep-26, nov-26), Form 4 de 12 meses (herramientas/form4.mjs, 82 presentaciones), Form 3 de Roberts, 13G de JPMorgan y de las dos filiales de Vanguard, y la historia de guía comprobada nota a nota desde 2023.',
  directivos: {
    equipo: [
      { nombre: 'Kyle W. Gano', cargo: 'Consejero delegado', desde: '2024', participacion_pct: 0.63, trayectoria: 'En la empresa desde 2008; director de desarrollo de negocio y estrategia (2020-2024), artífice de las licencias de osavampator (Takeda) y de los agonistas muscarínicos (Nxera). Como consejero delegado: lanzamiento de CRENESSITY y compra de Soleno [1].' },
      { nombre: 'Matthew C. Abernethy', cargo: 'Director financiero', desde: '2017', participacion_pct: 0.39, trayectoria: 'Antes en Zimmer Biomet y Bard; ha llevado la recompra de convertibles y las recompras de 2024-2026 [1].' },
      { nombre: 'Eric Benevich', cargo: 'Director comercial', desde: '2016', participacion_pct: 0.32, trayectoria: 'Lanzó INGREZZA en 2017 (de 0 a 2.514 M en 2025) y CRENESSITY [1].' },
      { nombre: 'Eiry W. Roberts', cargo: 'Directora médica', desde: '2026', participacion_pct: 0.28, trayectoria: 'Directora médica hasta jun-2025 y luego asesora estratégica con contrato prorrogado hasta dic-2026; volvió al cargo el 28-sep-26 tras la salida pactada de Sanjay Keswani, que llevaba 16 meses [10, 4, 14].' },
      { nombre: 'William H. Rastetter', cargo: 'Presidente no ejecutivo', desde: '2011', participacion_pct: 0.12, trayectoria: 'Fundador y consejero delegado de IDEC; presidente ejecutivo de Biogen Idec (2003-2005) [1].' },
      { nombre: 'Kevin C. Gorman', cargo: 'Consejero (ex consejero delegado 2008-2024)', desde: '2008', participacion_pct: 1.56, trayectoria: 'Llevó a la empresa de la investigación a las ventas de INGREZZA; vendió 37,8 M USD en 12 meses con un plan 10b5-1 [1, 3].' },
    ],
    historial_guidance: [
      { anio: '2023', guia: 'INGREZZA 1.670-1.770 M USD (feb), subida a 1.770-1.820 (ago) y a 1.820-1.840 (oct) [15, 16]', real: '1.836 M', cumplida: 'Sí' },
      { anio: '2024', guia: 'INGREZZA 2.100-2.200 M (feb), subida a 2.250-2.300 (ago) y a 2.300-2.320 (oct) [17, 18]', real: '2.313,5 M', cumplida: 'Sí' },
      { anio: '2025', guia: 'INGREZZA 2.500-2.600 M (feb), estrechada a 2.500-2.550 en julio por el menor precio neto [19, 20]', real: '2.513,7 M', cumplida: 'Parcial' },
      { anio: '2026', guia: 'INGREZZA 2.700-2.800 M (feb), subida a 2.825-2.875 M (jul) y a 2.900-2.925 M (nov)', real: '2.174 M en nueve meses', cumplida: null },
    ],
    comentario: null,
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'William H. Rastetter', cargo: 'Presidente', tipo: 'Independiente', desde: '2010', comisiones: 'Ciencia y tecnología médica' },
      { nombre: 'Kyle W. Gano', cargo: 'Consejero delegado', tipo: 'Ejecutivo', desde: '2024', comisiones: null },
      { nombre: 'Kevin C. Gorman', cargo: 'Consejero', tipo: 'Otro externo', desde: '2008', comisiones: null },
      { nombre: 'Gary A. Lyons', cargo: 'Consejero', tipo: 'Independiente', desde: '1993', comisiones: null },
      { nombre: 'Johanna Mercier', cargo: 'Consejera', tipo: 'Independiente', desde: '2023', comisiones: null },
      { nombre: 'George J. Morrow', cargo: 'Consejero', tipo: 'Independiente', desde: '2015', comisiones: null },
      { nombre: 'Leslie V. Norwalk', cargo: 'Consejera', tipo: 'Independiente', desde: '2019', comisiones: null },
      { nombre: 'Christine A. Poon', cargo: 'Consejera', tipo: 'Independiente', desde: '2023', comisiones: null },
      { nombre: 'Richard F. Pops', cargo: 'Consejero', tipo: 'Independiente', desde: '1998', comisiones: null },
      { nombre: 'Shalini Sharp', cargo: 'Consejera', tipo: 'Independiente', desde: '2020', comisiones: null },
      { nombre: 'Stephen A. Sherwin', cargo: 'Consejero', tipo: 'Independiente', desde: '1999', comisiones: null },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: false, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 91.0, voto_remuneracion_contra_pct: 7.1, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 13.45, fijo: 0.92, variable_corto: 0.97, variable_largo: 11.50, ratio_salario_medio: 49 },
    remuneracion: null,
    accionistas: [
      { nombre: 'BlackRock', pct: 12.0, tipo: 'Institucional', variacion: '13G/A de abr-2025 (último publicado) [1]' },
      { nombre: 'Vanguard (Capital Management + Portfolio Management)', pct: 10.2, tipo: 'Institucional', variacion: 'Tras la reorganización de ene-2026 The Vanguard Group declara 0 y lo reparten dos filiales: 5,26 M (31-mar-26) y 5,08 M (30-sep-26) [13, 12, 9]' },
      { nombre: 'Dodge & Cox', pct: 5.5, tipo: 'Institucional', variacion: '13G de may-2025 (último publicado) [1]' },
      { nombre: 'JPMorgan Chase', pct: 5.2, tipo: 'Institucional', variacion: 'De 5,20 M (dic-25) a 5,30 M (sep-26) [1, 11]' },
      { nombre: 'Consejeros y directivos (20 personas)', pct: 4.6, tipo: 'Internos', variacion: 'Ventas netas de 77,4 M USD en 12 meses' },
    ],
    insiders: [
      { fecha: '2025-11-09 a 2026-11-09', persona: 'Kevin C. Gorman (consejero)', operacion: 'Venta', acciones: null, importe: 37.82 },
      { fecha: '2025-11-09 a 2026-11-09', persona: 'Julie Cooke (recursos humanos)', operacion: 'Venta', acciones: null, importe: 5.77 },
      { fecha: '2025-11-09 a 2026-11-09', persona: 'Kyle W. Gano (consejero delegado)', operacion: 'Venta', acciones: null, importe: 4.83 },
      { fecha: '2025-11-09 a 2026-11-09', persona: 'George J. Morrow (consejero; 2,34 M tras el 15-oct)', operacion: 'Venta', acciones: null, importe: 4.49 },
      { fecha: '2025-11-09 a 2026-11-09', persona: 'Darin Lippoldt (jurídico)', operacion: 'Venta', acciones: null, importe: 4.20 },
      { fecha: '2025-11-09 a 2026-11-09', persona: 'Stephen A. Sherwin (consejero)', operacion: 'Venta', acciones: null, importe: 4.13 },
      { fecha: '2025-11-09 a 2026-11-09', persona: 'Ingrid Delaet (regulatorio)', operacion: 'Venta', acciones: null, importe: 3.75 },
      { fecha: '2025-11-09 a 2026-11-09', persona: 'Jude Onyia (científico)', operacion: 'Venta', acciones: null, importe: 3.47 },
      { fecha: '2025-11-09 a 2026-11-09', persona: 'Matthew C. Abernethy (financiero)', operacion: 'Venta', acciones: null, importe: 0.36 },
    ],
    control_y_defensas: null,
    alertas: [
      'Investigación civil del Departamento de Justicia (ago-2025) sobre la promoción de INGREZZA; sin provisión [5].',
      'Consejo escalonado (tres clases con mandatos de tres años): protege frente a una toma de control hostil [2].',
      'Cero compras de consejeros y directivos en 12 meses; 77,4 M USD de ventas, todas con planes 10b5-1 [3].',
      'Salida pactada del director médico a los 16 meses (sep-2026), con indemnización del plan de directivos, en plena fase 3; vuelve Eiry Roberts, que ya lo fue [4, 8].',
      'En la junta de 2026 Gorman (exconsejero delegado) recibió un 10,1 % de votos en contra y Mercier un 11,9 %, por encima del resto del orden del día [2].',
    ],
    confianza: 'Alta',
  },
  fuentes: fC,
};

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de NBIX, SPY y XBI (herramientas/bolsa.mjs y movimiento.mjs) hasta el 6-nov-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-11-06', url: 'https://finance.yahoo.com/quote/NBIX/history' },
  { id: 2, titulo: 'NBIX: consenso de analistas tras el 3T26 (earningsTrend y financialData: BPA ajustado 2026 de 10,56 y 2027 de 12,09 con 16 analistas; ventas 3.991 y 4.582 M; objetivo medio 208,11 USD de 28 analistas, 150-253; 4 compra fuerte, 20 compra, 4 mantener)', editor: 'Yahoo Finance (quoteSummary)', tipo: 'Analistas', fecha: '2026-11-09', url: 'https://query1.finance.yahoo.com/v10/finance/quoteSummary/NBIX?modules=earningsTrend,financialData,recommendationTrend' },
  { id: 3, titulo: 'NBIX: estadísticas clave (101,2 M de acciones, posición corta del 8,27 % del flotante)', editor: 'Yahoo Finance (defaultKeyStatistics)', tipo: 'Datos de mercado', fecha: '2026-11-09', url: 'https://finance.yahoo.com/quote/NBIX/key-statistics' },
  { id: 4, titulo: 'Incyte (INCY): estadísticas y estimaciones', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-11-09', url: 'https://finance.yahoo.com/quote/INCY/key-statistics' },
  { id: 5, titulo: 'United Therapeutics (UTHR): estadísticas y estimaciones', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-11-09', url: 'https://finance.yahoo.com/quote/UTHR/key-statistics' },
  { id: 6, titulo: 'Vertex (VRTX): estadísticas y estimaciones', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-11-09', url: 'https://finance.yahoo.com/quote/VRTX/key-statistics' },
  { id: 7, titulo: 'BioMarin (BMRN): estadísticas y estimaciones', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-11-09', url: 'https://finance.yahoo.com/quote/BMRN/key-statistics' },
  { id: 8, titulo: 'Jazz Pharmaceuticals (JAZZ): estadísticas y estimaciones', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-11-09', url: 'https://finance.yahoo.com/quote/JAZZ/key-statistics' },
  { id: 9, titulo: 'Exelixis (EXEL): estadísticas y estimaciones', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-11-09', url: 'https://finance.yahoo.com/quote/EXEL/key-statistics' },
  { id: 10, titulo: 'Daily Treasury Par Yield Curve Rates: 10 años al 4,86 % el 6-nov-2026', editor: 'U.S. Department of the Treasury', tipo: 'Datos de mercado', fecha: '2026-11-06', url: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/daily-treasury-rates.csv/2026/all?type=daily_treasury_yield_curve' },
  { id: 11, titulo: 'Implied ERP by month (ERP T12m with sustainable payout, nov-2026: 4,41 %)', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-11', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 12, titulo: 'Form 8-K: cierre de la compra de Soleno (2.900 M USD) y 10-Q 2T26 (contraprestación 2.829,9 M)', editor: 'Neurocrine Biosciences, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-05-18', url: `${EDGAR}/000119312526228013/d94926d8k.htm` },
  { id: 13, titulo: 'Johnson & Johnson closes landmark Intra-Cellular Therapies acquisition (132 USD por acción, 14.600 M USD)', editor: 'Johnson & Johnson', tipo: 'Primaria', fecha: '2025-04-02', url: 'https://www.jnj.com/media-center/press-releases/johnson-johnson-closes-landmark-intra-cellular-therapies-acquisition-to-solidify-neuroscience-leadership' },
  { id: 14, titulo: 'Company facts XBRL de Intra-Cellular Therapies (ingresos 2024: 680,9 M USD) y de GW Pharmaceuticals (ingresos 2020: 527,2 M USD)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0001567514.json' },
  { id: 15, titulo: 'Jazz Pharmaceuticals to acquire GW Pharmaceuticals (7.200 M USD, 220 USD por ADS)', editor: 'Jazz Pharmaceuticals', tipo: 'Primaria', fecha: '2021-02-03', url: 'https://investor.jazzpharma.com/news-releases' },
  { id: 16, titulo: 'Soleno Therapeutics: resultados de 2025 (ventas 190,4 M; caja 506,1 M)', editor: 'Soleno Therapeutics (BioSpace)', tipo: 'Primaria', fecha: '2026-02-25', url: 'https://www.biospace.com/press-releases/soleno-therapeutics-reports-fourth-quarter-and-full-year-2025-financial-results-and-provides-update-on-u-s-launch-of-vykat-xr' },
  { id: 17, titulo: 'Neurocrine Biosciences Aktie: Umsatzprognose steigt nach starkem Q3 (ventas del 3T26 de 1.123 M frente a un consenso de 1.040 M; BPA ajustado 3,29 frente a 2,75)', editor: 'Goldesel', tipo: 'Prensa', fecha: '2026-11-02', url: 'https://goldesel.de/aktien/news/neurocrine-biosciences-aktie-umsatzprognose-steigt-nach-starkem-q3' },
  { id: 18, titulo: 'Titulares de Seeking Alpha del 2 y 3-nov-2026: «Non-GAAP EPS of $3.29 beats by $0.54, revenue of $1.12B beats by $80M»; «expects double-digit 2027 INGREZZA volume growth despite mid- to high single-digit net pricing headwinds»; «advances 13% after Q3 beat»', editor: 'Seeking Alpha (noticias)', tipo: 'Prensa', fecha: '2026-11-03', url: 'https://seekingalpha.com/symbol/NBIX/news' },
  { id: 19, titulo: 'Neurocrine’s Vykat XR linked to seven deaths, FOIA case reports (STAT+)', editor: 'STAT News', tipo: 'Prensa', fecha: '2026-10-13', url: 'https://statnews.com/2026/10/13/neurocrine-biosciences-prader-willi-vykat-xr' },
  { id: 20, titulo: 'NBIX: previsiones de los analistas antes del 3T26 (29 analistas, objetivo medio 206,22 USD; BPA ajustado 2026 de 10,27 y 2027 de 11,97)', editor: 'Stock Analysis (S&P Global)', tipo: 'Analistas', fecha: '2026-10-16', url: 'https://stockanalysis.com/stocks/nbix/forecast/' },
];
const bolsa = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const D = {
  _estado: 'Completo. Precio: cierre del viernes 6-nov-2026 (corte el lunes 9-nov antes de abrir). Consenso y comparables de Yahoo Finance al 9-nov (PER adelantado sobre BPA ajustado de 2027).',
  identificacion: {
    nombre: 'Neurocrine Biosciences, Inc.', nombre_corto: 'Neurocrine', ticker: 'NBIX', isin: 'US64125C1099', mercado: 'Nasdaq Global Select', indice_referencia: 'S&P 500',
    pais: 'EE. UU.', pais_iso: 'US', sector: 'Salud', industria: 'Biotecnología', sede: 'San Diego (California)', fundacion: '1992', empleados: 2000, web: 'neurocrine.com',
    precio: bolsa.identificacion.precio, fecha_precio: bolsa.identificacion.fecha_precio, acciones: 104.8, capitalizacion_publicada: 16664, free_float_pct: 98.7,
    max_52s: bolsa.identificacion.max_52s, min_52s: bolsa.identificacion.min_52s, volumen_medio_diario: '≈ 197 M USD/día (3 meses)', proximos_resultados: '2027-02-10',
  },
  consenso: {
    guidance: null,
    estimaciones: [
      { periodo: '2026e', ingresos: 3991, ebitda: null, ebit: null, bpa: 10.56, dpa: 0, fuente: 'Yahoo Finance tras el 3T26, 16 analistas (ventas, 23); BPA ajustado sin pagos en acciones ni amortización de intangibles [2]' },
      { periodo: '2027e', ingresos: 4582, ebitda: null, ebit: null, bpa: 12.09, dpa: 0, fuente: 'Yahoo Finance, 16 analistas (ventas, 25); BPA ajustado [2]' },
    ],
    recomendaciones: { n_analistas: 28, comprar: 24, mantener: 4, vender: 0, po_medio: 208.11, po_min: 150, po_max: 253 },
    revisiones: null,
    base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: 6.0,
    confianza: 'Media',
  },
  bolsa: { ...bolsa.bolsa, posicion_corta_pct: 8.27, comentario: null, confianza: 'Alta' },
  multiplos_historicos: {
    serie: [
      { anio: '2021', precio_cierre: 85.17, ev_ebitda_ntm: null, per_ntm: null, excluir: true },
      { anio: '2022', precio_cierre: 119.44, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2023', precio_cierre: 131.76, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2024', precio_cierre: 136.50, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2025', precio_cierre: 141.83, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
    ],
    comentario: null, confianza: 'Media',
  },
  comparables: {
    criterio: null,
    empresas: [
      { nombre: 'Incyte', ticker: 'INCY', pais: 'US', capitalizacion: 24389, ev_ventas: 3.42, ev_ebitda_ltm: 10.1, ev_ebitda_ntm: null, per_ntm: 13.9, crecimiento_pct: 4.2, margen_ebitda_pct: 33.9, roic_pct: null, dn_ebitda: -1.9, fcf_yield_pct: 5.3 },
      { nombre: 'United Therapeutics', ticker: 'UTHR', pais: 'US', capitalizacion: 23936, ev_ventas: 6.86, ev_ebitda_ltm: 16.2, ev_ebitda_ntm: null, per_ntm: 16.2, crecimiento_pct: 10.9, margen_ebitda_pct: 42.4, roic_pct: 31.3, dn_ebitda: -1.5, fcf_yield_pct: 1.9 },
      { nombre: 'Vertex', ticker: 'VRTX', pais: 'US', capitalizacion: 138708, ev_ventas: 10.72, ev_ebitda_ltm: 27.2, ev_ebitda_ntm: null, per_ntm: 27.5, crecimiento_pct: 10.5, margen_ebitda_pct: 39.4, roic_pct: 28.8, dn_ebitda: 0.0, fcf_yield_pct: 1.7 },
      { nombre: 'BioMarin', ticker: 'BMRN', pais: 'US', capitalizacion: 10853, ev_ventas: 3.91, ev_ebitda_ltm: 16.7, ev_ebitda_ntm: null, per_ntm: 8.8, crecimiento_pct: 15.2, margen_ebitda_pct: 23.4, roic_pct: 3.2, dn_ebitda: 4.0, fcf_yield_pct: -0.1 },
      { nombre: 'Jazz Pharmaceuticals', ticker: 'JAZZ', pais: 'IE', capitalizacion: 15069, ev_ventas: 3.79, ev_ebitda_ltm: 8.9, ev_ebitda_ntm: null, per_ntm: 9.0, crecimiento_pct: 5.1, margen_ebitda_pct: 42.6, roic_pct: 17.2, dn_ebitda: 1.4, fcf_yield_pct: 11.2 },
      { nombre: 'Exelixis', ticker: 'EXEL', pais: 'US', capitalizacion: 16976, ev_ventas: 6.51, ev_ebitda_ltm: 15.7, ev_ebitda_ntm: null, per_ntm: 16.3, crecimiento_pct: 12.6, margen_ebitda_pct: 41.3, roic_pct: null, dn_ebitda: -0.7, fcf_yield_pct: 4.5 },
    ],
    comentario: null, confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2026-05', objetivo: 'Soleno Therapeutics (VYKAT XR)', comprador: 'Neurocrine Biosciences', ev: 2324, ev_ventas: 12.2, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Contraprestación de 2.829,9 M menos 506,1 M de caja de Soleno a dic-25; ventas de 2025 de 190,4 M (primer año de lanzamiento) [12, 16].' },
      { fecha: '2025-04', objetivo: 'Intra-Cellular Therapies (CAPLYTA)', comprador: 'Johnson & Johnson', ev: 14600, ev_ventas: 21.4, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Valor de la operación sobre ventas de 2024 de 680,9 M; neurociencia en crecimiento con patentes largas [13, 14].' },
      { fecha: '2021-05', objetivo: 'GW Pharmaceuticals (EPIDIOLEX)', comprador: 'Jazz Pharmaceuticals', ev: 7200, ev_ventas: 13.7, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Valor de la operación sobre ventas de 2020 de 527,2 M; neurología con un producto [14, 15].' },
    ],
    comentario: null, confianza: 'Media',
  },
  fuentes: fD,
};

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Stocktwits: flujo de mensajes de $NBIX (30 mensajes del 30-sep al 7-nov-2026; 24 desde el 2-nov, 6 marcados alcistas y ninguno bajista)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-11-07', url: 'https://api.stocktwits.com/api/2/streams/symbol/NBIX.json' },
  { id: 2, titulo: 'Seeking Alpha: canal de NBIX (artículos, noticias y transcripciones del 2-jun al 5-nov-2026)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-11-05', url: 'https://seekingalpha.com/api/sa/combined/NBIX.xml' },
  { id: 3, titulo: 'NBIX Stock Slips As $2.9B Soleno Deal Triggers Fresh Drug Safety Warnings (sentimiento de Stocktwits «bajista» y comentarios de usuarios)', editor: 'Stocktwits News', tipo: 'Foros y redes', fecha: '2026-08-12', url: 'https://stocktwits.com/news-articles/markets/equity/nbix-stock-slips-as-2-9-b-soleno-deal-triggers-fresh-drug-safety-warnings/cZo8lijRJWD' },
  { id: 4, titulo: 'NEUROCRINE - Starkes Quartal, aber ein Sorgenkind bleibt! (texto abierto solo en la entradilla; sin comentarios visibles)', editor: 'stock3', tipo: 'Foros y redes', fecha: '2026-11-03', url: 'https://stock3.com/news/neurocrine-starkes-quartal-aber-ein-sorgenkind-bleibt-17369401' },
  { id: 5, titulo: 'Neurocrine Biosciences: Up 15% After Q3, And The Research Engine Is Still Almost Free (comprar, valor razonable 195,80 USD)', editor: 'Seeking Alpha (autor externo)', tipo: 'Foros y redes', fecha: '2026-11-04', url: 'https://seekingalpha.com/article/4962073-neurocrine-biosciences-up-15-percent-after-q3-and-the-research-engine-is-still-almost-free' },
  { id: 6, titulo: 'Neurocrine Biosciences: Breaking Down A Solid Quarter (alcista; un comentario)', editor: 'Seeking Alpha (autor externo)', tipo: 'Foros y redes', fecha: '2026-11-05', url: 'https://seekingalpha.com/article/4962798-neurocrine-biosciences-breaking-down-a-solid-quarter' },
  { id: 7, titulo: 'Neurocrine Biosciences: 3 Growth Drivers And An Attractive Valuation (alcista)', editor: 'Seeking Alpha (autor externo)', tipo: 'Foros y redes', fecha: '2026-11-04', url: 'https://seekingalpha.com/article/4962162-neurocrine-biosciences-three-growth-drivers-and-an-attractive-valuation' },
  { id: 8, titulo: 'Where Will Neurocrine Biosciences Be in 5 Years? (Jeff Siegel)', editor: 'The Motley Fool', tipo: 'Prensa', fecha: '2026-10-25', url: 'https://www.fool.com/investing/2026/10/25/where-will-neurocrine-biosciences-be-in-5-years/' },
  { id: 9, titulo: 'Neurocrine (NBIX) Q3 2026 Earnings Call Transcript (preguntas de 20 analistas: precio neto de 2027, seguridad de VYKAT XR, competencia de Vertex en CAH)', editor: 'Mitrade', tipo: 'Prensa', fecha: '2026-11-03', url: 'https://www.mitrade.com/insights/news/live-news/article-8-2224590-20261103' },
];
const E = {
  _estado: 'Rehecho el 9-nov abriendo cada página: Stocktwits (API), canal y tres artículos de Seeking Alpha, Stocktwits News, stock3, Motley Fool y la transcripción del 3T26. Reddit responde 403 y los comentarios de Seeking Alpha no son visibles sin cuenta.',
  sentimiento: {
    tono: 'Positivo', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Stocktwits ($NBIX)', fecha: '2026-11', n_comentarios: 24, tono: 'Positivo', resumen: 'Desde los resultados dominan los mensajes de «el mejor día desde 2020» y de ruptura de la media de 200 sesiones; 6 de 24 marcados alcistas y ninguno bajista. Hay quien vende con poca ganancia tras aguantar desde agosto, quien señala el salto de existencias de VYKAT XR y un resumen de noticias que enlaza la acción con «muerte de un paciente» el día de resultados [1].' },
      { plataforma: 'Seeking Alpha (artículos de autores)', fecha: '2026-11', n_comentarios: 1, tono: 'Positivo', resumen: 'Tres artículos alcistas en dos días: uno sube su valor razonable a 195,80 USD por la cartera temprana de I+D y pasaría a mantener si la FDA restringe VYKAT XR o CRENESSITY se estanca por debajo del 25 % de penetración [5]; otro destaca el trimestre (el autor declara posición larga) [6]; el tercero, el PER adelantado de 14 veces [7]. Los comentarios no se ven sin cuenta (solo uno contado) [2].' },
      { plataforma: 'Stocktwits News (comentarios)', fecha: '2026-08', n_comentarios: 2, tono: 'Negativo', resumen: 'Con la alerta de seguridad de VYKAT XR (siete muertes notificadas) el sentimiento de Stocktwits pasó a bajista; un usuario recuerda que no hay relación probada y otro que «siempre pensó que Soleno era una mala inversión» [3].' },
      { plataforma: 'stock3 (análisis)', fecha: '2026-11', n_comentarios: null, tono: 'Dividido', resumen: 'Trimestre fuerte y guía subida, pero VYKAT XR sigue siendo «el niño problemático»; el resto del texto es de pago [4].' },
      { plataforma: 'The Motley Fool', fecha: '2026-10', n_comentarios: null, tono: 'Positivo', resumen: 'Ve a Neurocrine con 6.000-7.000 M de ventas en 2031, menos dependiente de INGREZZA; avisa del precio de INGREZZA, del riesgo clínico de las fases 3 de 2027 y de cuánto quiera pagar el mercado por sus beneficios [8].' },
    ],
    temas: [
      { tema: 'Seguridad de VYKAT XR y precio pagado por Soleno', postura: 'Bajista', peso: 'Alto', contraste: 'En la conferencia, la directora médica defendió el balance beneficio-riesgo y el director comercial retrasó la vuelta al crecimiento de VYKAT XR [9].' },
      { tema: 'Trimestre récord y valoración todavía baja', postura: 'Alcista', peso: 'Alto', contraste: 'Parte del trimestre es un adelanto de pedidos de unos 20 M de INGREZZA, según el director financiero [9].' },
      { tema: 'Precio neto de INGREZZA en 2027 (AUSTEDO negociado) y IRA en 2029', postura: 'Bajista', peso: 'Medio', contraste: 'La dirección espera una cesión de precio de un dígito medio o alto compensada con volumen de dos dígitos [9].' },
      { tema: 'Fase 3 de osavampator y direclidina en 2027 y día de I+D del 15-dic', postura: 'Alcista', peso: 'Medio', contraste: 'Los particulares no mencionan el lanzamiento lento de COBENFY ni la competencia de Vertex en CAH, que sí preguntaron los analistas [9].' },
    ],
    lectura: null,
    confianza: 'Media',
  },
  fuentes: fE,
};

guarda('A', A); guarda('B', B); guarda('C', C); guarda('D', D); guarda('E', E);
console.log('Notas A-E escritas');
