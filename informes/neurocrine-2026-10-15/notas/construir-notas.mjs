// Notas A-E de Neurocrine Biosciences (NBIX), corte 2026-10-15. Hechas sin subagentes.
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
  _estado: 'Completo. Cuentas 2021-2025 del XBRL contrastadas con el 10-K 2025; LTM a junio de 2026 con los dos 10-Q; trimestres de las notas de resultados.',
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
      { kpi: 'Ventas netas de INGREZZA (M USD)', valor_anterior: '2.313,5 (2024)', valor_actual: '2.513,7 (2025)', variacion: '+8,7 %', comentario: 'Volumen de recetas al alza de dos dígitos y precio neto a la baja por descuentos de acceso a formularios [5].' },
      { kpi: 'Ventas netas de CRENESSITY (M USD)', valor_anterior: '135,3 (4T25)', valor_actual: '183,5 (2T26)', variacion: '+36 % en dos trimestres', comentario: '2.048 formularios de inicio en 2025; reembolso de en torno al 80 % de las recetas dispensadas [5, 4].' },
      { kpi: 'Ventas netas de VYKAT XR (M USD, trimestre completo pro forma)', valor_anterior: '91,7 (4T25, Soleno)', valor_actual: '94 (2T26)', variacion: '+2,5 %', comentario: 'Estancado desde el 4T25; consolidado desde el 18-may-26 (54 M en el 2T26) [4].' },
      { kpi: 'Guía de ventas de INGREZZA 2026 (M USD)', valor_anterior: '2.700-2.800 (feb-26)', valor_actual: '2.825-2.875 (jul-26)', variacion: '+2,6 % en el punto medio', comentario: 'Subida de la guía con los resultados del 2T26 [4].' },
      { kpi: 'Gasto de I+D (GAAP, M USD)', valor_anterior: '731,1 (2024)', valor_actual: '1.015,7 (2025)', variacion: '+39 %', comentario: 'Dos fases 3 (osavampator y direclidina); guía 2026 de 1.275-1.325 M [1, 4].' },
      { kpi: 'Empleados', valor_anterior: '≈ 200 (2017)', valor_actual: '≈ 2.000 (2025)', variacion: '×10', comentario: 'Ampliación de las redes de ventas de INGREZZA y CRENESSITY en el 1T26 [1].' },
    ],
    confianza: 'Alta',
  },
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 3373.9, ebitda: 842, ebit: 794.8, beneficio_neto: 705.5, bpa: 6.84, dpa: 0, dpa_extraordinario: 0, fcf: 870.4, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 97 },
    cambios_perimetro: [{ periodo: '2026', descripcion: 'Soleno Therapeutics (VYKAT XR), consolidada desde el 18-may-26 por 2.830 M USD en caja; venta de Neurocrine Group Limited (ALKINDI y EFMODY) en ene-2026 con 28,6 M de plusvalía.' }],
    comentario: null, ajustes: null,
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '3T24', ingresos: 622.1, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 1.24, vs_consenso: null },
      { periodo: '4T24', ingresos: 627.7, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 1.00, vs_consenso: null },
      { periodo: '1T25', ingresos: 572.6, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.08, vs_consenso: null },
      { periodo: '2T25', ingresos: 687.5, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 1.06, vs_consenso: null },
      { periodo: '3T25', ingresos: 794.9, crecimiento_pct: 27.8, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 2.04, vs_consenso: null },
      { periodo: '4T25', ingresos: 805.5, crecimiento_pct: 28.3, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 1.48, vs_consenso: null },
      { periodo: '1T26', ingresos: 814.5, crecimiento_pct: 42.2, crecimiento_organico_pct: 42.2, ebitda: null, margen_ebitda_pct: null, bpa: 1.91, vs_consenso: 'Superior' },
      { periodo: '2T26', ingresos: 959.0, crecimiento_pct: 39.5, crecimiento_organico_pct: 31.6, ebitda: null, margen_ebitda_pct: null, bpa: 1.39, vs_consenso: 'Superior' },
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
    liquidez: 'Caja y valores negociables de 481,7 M USD a 30-jun-26 (389,8 a corto y 91,9 a largo) más una línea de crédito garantizada de 1.000 M sin disponer (vence el 14-may-2031); participaciones cotizadas de 147,3 M [2, 4].',
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
      { anio: '2026', objetivo: 'Soleno Therapeutics (VYKAT XR, hiperfagia en el síndrome de Prader-Willi)', importe: 2829.9, ev_ebitda: null, financiacion: 'Caja propia (préstamo puente de 600 M de la línea de crédito, devuelto en junio)', resultado: 'Demasiado pronto: VYKAT XR plano desde el 4T25 (94 M pro forma en el 2T26) y alerta de seguridad de las asociaciones de pacientes en ago-26 [4, 8].' },
      { anio: '2022', objetivo: 'Diurnal Group (ALKINDI, EFMODY; Reino Unido)', importe: 42.7, ev_ebitda: null, financiacion: 'Caja', resultado: 'Vendida en ene-2026 (Neurocrine Group Limited) con 28,6 M de plusvalía neta: compra menor sin efecto en las cifras [2].' },
    ],
    comentario: null,
    confianza: 'Alta',
  },
  huecos: [
    { seccion: 'trimestres', campo: 'EBITDA trimestral', tipo: 'Complemento', intentos: '1) notas de resultados (solo resultado de explotación y BPA); 2) XBRL trimestral (sin depreciación trimestral); 3) 10-Q (depreciación solo semestral)', decision: 'Omitido' },
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
];
const B = {
  _estado: 'Completo. Mercado relevante = inhibidores de VMAT2 en EE. UU. (INGREZZA + AUSTEDO); CAH y Prader-Willi como mercados nuevos sin tamaño publicado fiable.',
  negocio: { descripcion: null, como_gana_dinero: null, clientes: null },
  sector: {
    definicion: null,
    tamano: '≈ 4.774 M USD en 2025: INGREZZA 2.514 M [1] + AUSTEDO 2.260 M [3] (ventas netas en EE. UU. de los dos inhibidores de VMAT2 con marca)',
    unidad_serie: 'millones de USD (ventas netas de INGREZZA + AUSTEDO)',
    serie: [ { anio: '2025', tamano: 4774 }, { anio: '2026e', tamano: 5325 } ],
    tcac_historico_pct: null, tcac_previsto_pct: 5.0, cr5_pct: 99.0, estructura: 'Concentrada (duopolio)',
    drivers: [], porter: [], ciclo: { posicion: 'Expansión', comentario: null }, regulacion: null, tendencias: null,
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 52.7, posicion: '1.º en inhibidores de VMAT2 en EE. UU. (52,7 % de las ventas de 2025 frente a AUSTEDO de Teva); único tratamiento aprobado en CAH clásica (CRENESSITY) y en hiperfagia del Prader-Willi (VYKAT XR)',
    competidores: [
      { nombre: 'Teva (AUSTEDO / AUSTEDO XR)', pais: 'IL', ticker: 'TEVA', ingresos: 2260, cuota_pct: 47.3, margen_ebit_pct: null, comentario: 'Único rival directo en discinesia tardía; precio de Medicare negociado desde el 1-ene-2027 (−38 % sobre lista) [3, 4].' },
      { nombre: 'Incyte', pais: 'US', ticker: 'INCY', ingresos: 5820, cuota_pct: null, margen_ebit_pct: null, comentario: 'Comparable de modelo: dependencia de un producto (Jakafi) con vencimiento cercano; margen EBITDA 33,4 % [8].' },
      { nombre: 'United Therapeutics', pais: 'US', ticker: 'UTHR', ingresos: 3150, cuota_pct: null, margen_ebit_pct: null, comentario: 'Enfermedades raras (hipertensión pulmonar), margen EBITDA 47,4 % [8].' },
      { nombre: 'Jazz Pharmaceuticals', pais: 'IE', ticker: 'JAZZ', ingresos: 4600, cuota_pct: null, margen_ebit_pct: null, comentario: 'Neurociencia (Xywav) con genéricos de Xyrem; margen EBITDA 41,9 % [8].' },
      { nombre: 'BioMarin', pais: 'US', ticker: 'BMRN', ingresos: 3410, cuota_pct: null, margen_ebit_pct: null, comentario: 'Enfermedades raras; endeudada tras su última compra (DN/EBITDA 5,2×) [8].' },
      { nombre: 'Exelixis', pais: 'US', ticker: 'EXEL', ingresos: 2440, cuota_pct: null, margen_ebit_pct: null, comentario: 'Un producto (cabozantinib) con genéricos acordados desde 2031; margen EBITDA 41,9 % [8].' },
    ],
    foso: { veredicto: 'Estrecho', tendencia: 'Estable', fuentes: [
      { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'No aplica a un medicamento.' },
      { fuente: 'Costes de cambio', puntuacion: 3, evidencia: 'Pacientes estables con un tratamiento crónico rara vez cambian; la persistencia de INGREZZA supera a la de AUSTEDO XR según datos de la empresa [2].' },
      { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 4, evidencia: '22 patentes del Orange Book de INGREZZA hasta 2040 y genéricos pactados desde 2038; CRENESSITY y VYKAT XR, primeros de su clase [1, 2].' },
      { fuente: 'Ventaja en costes', puntuacion: 2, evidencia: 'Coste de ventas del 1,8 %, pero igual que cualquier medicamento con patente [1].' },
      { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'Duopolio en VMAT2 y mercados de enfermedades raras demasiado pequeños para un tercero [1].' },
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
  { id: 3, titulo: 'Form 4 presentados entre el 15-oct-25 y el 15-oct-26 (herramientas/form4.mjs)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000914475&type=4' },
  { id: 4, titulo: 'Form 8-K: cambio de director médico (Eiry Roberts sustituye a Sanjay Keswani)', editor: 'Neurocrine Biosciences, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-09-28', url: `${EDGAR}/000091447526000045/nbix-20260925.htm` },
  { id: 5, titulo: 'Form 10-K 2025: investigación civil del Departamento de Justicia sobre la promoción de INGREZZA (ago-2025)', editor: 'Neurocrine Biosciences, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-02-11', url: `${EDGAR}/000091447526000007/nbix-20251231.htm` },
  { id: 6, titulo: 'Neurocrine Biosciences Reports Fourth-Quarter and Full-Year 2025 Financial Results (guía 2025 y 2026 de INGREZZA)', editor: 'Neurocrine Biosciences, Inc.', tipo: 'Primaria', fecha: '2026-02-11', url: `${EDGAR}/000091447526000006/q4-2025xearningsrelease.htm` },
  { id: 7, titulo: 'Neurocrine Biosciences Reports Second-Quarter 2026 Financial Results', editor: 'Neurocrine Biosciences, Inc.', tipo: 'Primaria', fecha: '2026-07-30', url: `${EDGAR}/000091447526000035/q2-2026xearningsrelease.htm` },
];
const C = {
  _estado: 'Completo con el proxy 2026, la junta de mayo y los Form 4 de 12 meses.',
  directivos: {
    equipo: [
      { nombre: 'Kyle W. Gano', cargo: 'Consejero delegado', desde: '2024', participacion_pct: 0.63, trayectoria: 'En la empresa desde 2008; director de desarrollo de negocio y estrategia (2020-2024), artífice de las licencias de osavampator (Takeda) y de los agonistas muscarínicos (Nxera). Como consejero delegado: lanzamiento de CRENESSITY y compra de Soleno [1].' },
      { nombre: 'Matthew C. Abernethy', cargo: 'Director financiero', desde: '2017', participacion_pct: 0.39, trayectoria: 'Antes en Zimmer Biomet y Bard; ha llevado la recompra de convertibles y las recompras de 2024-2026 [1].' },
      { nombre: 'Eric Benevich', cargo: 'Director comercial', desde: '2016', participacion_pct: 0.32, trayectoria: 'Lanzó INGREZZA en 2017 (de 0 a 2.514 M en 2025) y CRENESSITY [1].' },
      { nombre: 'Eiry W. Roberts', cargo: 'Directora médica', desde: '2026', participacion_pct: 0.28, trayectoria: 'Volvió al cargo el 28-sep-26 tras la salida de Sanjay Keswani, que llevaba 15 meses [4].' },
      { nombre: 'William H. Rastetter', cargo: 'Presidente no ejecutivo', desde: '2011', participacion_pct: 0.12, trayectoria: 'Fundador y consejero delegado de IDEC; presidente ejecutivo de Biogen Idec (2003-2005) [1].' },
      { nombre: 'Kevin C. Gorman', cargo: 'Consejero (ex consejero delegado 2008-2024)', desde: '2008', participacion_pct: 1.56, trayectoria: 'Llevó a la empresa de la investigación a las ventas de INGREZZA; vendió 37,8 M USD en 12 meses con un plan 10b5-1 [1, 3].' },
    ],
    historial_guidance: [
      { anio: '2023', guia: 'INGREZZA 1.750-1.800 M USD (subida a 1.820-1.840)', real: '1.836 M', cumplida: 'Sí' },
      { anio: '2024', guia: 'INGREZZA 2.100-2.200 M (subida y luego rebajada a 2.300-2.320)', real: '2.313,5 M', cumplida: 'Sí' },
      { anio: '2025', guia: 'INGREZZA 2.500-2.600 M (ajustada a 2.500-2.550)', real: '2.513,7 M', cumplida: 'Parcial' },
      { anio: '2026', guia: 'INGREZZA 2.700-2.800 M (feb), subida a 2.825-2.875 M (jul)', real: '1.373 M en el 1S26', cumplida: null },
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
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 1,
    voto_remuneracion_pct: 93.2, voto_remuneracion_contra_pct: 6.7, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 13.45, fijo: 0.92, variable_corto: 0.97, variable_largo: 11.50, ratio_salario_medio: 49 },
    remuneracion: null,
    accionistas: [
      { nombre: 'BlackRock', pct: 12.0, tipo: 'Institucional', variacion: '13G de abr-2025' },
      { nombre: 'The Vanguard Group', pct: 10.1, tipo: 'Institucional', variacion: '13G de mar-2025' },
      { nombre: 'Dodge & Cox', pct: 5.5, tipo: 'Institucional', variacion: 'Entra por encima del 5 %' },
      { nombre: 'JPMorgan Chase', pct: 5.2, tipo: 'Institucional', variacion: 's.d.' },
      { nombre: 'Consejeros y directivos (20 personas)', pct: 4.6, tipo: 'Internos', variacion: 'Ventas netas de 77,9 M USD en 12 meses' },
    ],
    insiders: [
      { fecha: '2025-10-15 a 2026-10-15', persona: 'Kevin C. Gorman (consejero)', operacion: 'Venta', acciones: null, importe: 37.82 },
      { fecha: '2025-10-15 a 2026-10-15', persona: 'Julie Cooke (recursos humanos)', operacion: 'Venta', acciones: null, importe: 5.77 },
      { fecha: '2025-10-15 a 2026-10-15', persona: 'Kyle W. Gano (consejero delegado)', operacion: 'Venta', acciones: null, importe: 4.87 },
      { fecha: '2025-10-15 a 2026-10-15', persona: 'Darin Lippoldt (jurídico)', operacion: 'Venta', acciones: null, importe: 4.20 },
      { fecha: '2025-10-15 a 2026-10-15', persona: 'Stephen A. Sherwin (consejero)', operacion: 'Venta', acciones: null, importe: 4.13 },
      { fecha: '2025-10-15 a 2026-10-15', persona: 'Matthew C. Abernethy (financiero)', operacion: 'Venta', acciones: null, importe: 0.36 },
    ],
    control_y_defensas: null,
    alertas: [
      'Investigación civil del Departamento de Justicia (ago-2025) sobre la promoción de INGREZZA; sin provisión [5].',
      'Consejo escalonado (tres clases con mandatos de tres años): protege frente a una toma de control hostil [2].',
      'Cero compras de consejeros y directivos en 12 meses; 77,9 M USD de ventas, todas con planes 10b5-1 [3].',
      'Salida del director médico a los 15 meses (sep-2026) en plena fase 3 [4].',
    ],
    confianza: 'Alta',
  },
  fuentes: fC,
};

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de NBIX, SPY y XBI (herramientas/bolsa.mjs) hasta el 14-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/NBIX/history' },
  { id: 2, titulo: 'NBIX: previsiones de los analistas (29 analistas, objetivo medio 206,81 USD; BPA ajustado 2026 de 10,19 y 2027 de 11,95; ventas 2026 de 3.900 M y 2027 de 4.560 M)', editor: 'Stock Analysis (S&P Global)', tipo: 'Analistas', fecha: '2026-10-13', url: 'https://stockanalysis.com/stocks/nbix/forecast/' },
  { id: 3, titulo: 'NBIX: estadísticas (101,65 M de acciones, PER adelantado 12,0, posición corta 5,83 % del flotante)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/nbix/statistics/' },
  { id: 4, titulo: 'Incyte (INCY): estadísticas', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/incy/statistics/' },
  { id: 5, titulo: 'United Therapeutics (UTHR): estadísticas', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/uthr/statistics/' },
  { id: 6, titulo: 'Vertex (VRTX): estadísticas', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/vrtx/statistics/' },
  { id: 7, titulo: 'BioMarin (BMRN): estadísticas', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/bmrn/statistics/' },
  { id: 8, titulo: 'Jazz Pharmaceuticals (JAZZ): estadísticas', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/jazz/statistics/' },
  { id: 9, titulo: 'Exelixis (EXEL): estadísticas', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/exel/statistics/' },
  { id: 10, titulo: '10-Year Treasury Constant Maturity Rate (DGS10): 5,21 % el 13-oct-2026', editor: 'Federal Reserve Bank of St. Louis (FRED)', tipo: 'Datos de mercado', fecha: '2026-10-13', url: 'https://fred.stlouisfed.org/series/DGS10' },
  { id: 11, titulo: 'Implied ERP by month (ERP T12m with sustainable payout, oct-2026: 4,20 %)', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 12, titulo: 'Form 8-K: cierre de la compra de Soleno (2.900 M USD) y 10-Q 2T26 (contraprestación 2.829,9 M)', editor: 'Neurocrine Biosciences, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-05-18', url: `${EDGAR}/000119312526228013/d94926d8k.htm` },
  { id: 13, titulo: 'Johnson & Johnson closes landmark Intra-Cellular Therapies acquisition (132 USD por acción, 14.600 M USD)', editor: 'Johnson & Johnson', tipo: 'Primaria', fecha: '2025-04-02', url: 'https://www.jnj.com/media-center/press-releases/johnson-johnson-closes-landmark-intra-cellular-therapies-acquisition-to-solidify-neuroscience-leadership' },
  { id: 14, titulo: 'Company facts XBRL de Intra-Cellular Therapies (ingresos 2024: 680,9 M USD) y de GW Pharmaceuticals (ingresos 2020: 527,2 M USD)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0001567514.json' },
  { id: 15, titulo: 'Jazz Pharmaceuticals to acquire GW Pharmaceuticals (7.200 M USD, 220 USD por ADS)', editor: 'Jazz Pharmaceuticals', tipo: 'Primaria', fecha: '2021-02-03', url: 'https://investor.jazzpharma.com/news-releases' },
  { id: 16, titulo: 'Soleno Therapeutics: resultados de 2025 (ventas 190,4 M; caja 506,1 M)', editor: 'Soleno Therapeutics (BioSpace)', tipo: 'Primaria', fecha: '2026-02-25', url: 'https://www.biospace.com/press-releases/soleno-therapeutics-reports-fourth-quarter-and-full-year-2025-financial-results-and-provides-update-on-u-s-launch-of-vykat-xr' },
];
const bolsa = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const D = {
  _estado: 'Completo. Precio: cierre del 14-oct-2026 (la sesión del 15-oct no había cerrado). Comparables con PER adelantado ajustado (no GAAP) de Stock Analysis.',
  identificacion: {
    nombre: 'Neurocrine Biosciences, Inc.', nombre_corto: 'Neurocrine', ticker: 'NBIX', isin: 'US64125C1099', mercado: 'Nasdaq Global Select', indice_referencia: 'S&P 500',
    pais: 'EE. UU.', pais_iso: 'US', sector: 'Salud', industria: 'Biotecnología', sede: 'San Diego (California)', fundacion: '1992', empleados: 2000, web: 'neurocrine.com',
    precio: bolsa.identificacion.precio, fecha_precio: bolsa.identificacion.fecha_precio, acciones: 104.2, capitalizacion_publicada: 13820, free_float_pct: 98.7,
    max_52s: bolsa.identificacion.max_52s, min_52s: bolsa.identificacion.min_52s, volumen_medio_diario: '≈ 203 M USD/día (3 meses)', proximos_resultados: '2026-10-29',
  },
  consenso: {
    guidance: null,
    estimaciones: [
      { periodo: '2026e', ingresos: 3900, ebitda: null, ebit: null, bpa: 10.19, dpa: 0, fuente: 'Stock Analysis (S&P Global), 25 analistas; BPA ajustado sin pagos en acciones ni amortización de intangibles [2]' },
      { periodo: '2027e', ingresos: 4560, ebitda: null, ebit: null, bpa: 11.95, dpa: 0, fuente: 'Stock Analysis (S&P Global); BPA ajustado [2]' },
    ],
    recomendaciones: { n_analistas: 29, comprar: null, mantener: null, vender: null, po_medio: 206.81, po_min: 150, po_max: 253 },
    revisiones: null,
    base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: 6.0,
    confianza: 'Media',
  },
  bolsa: { ...bolsa.bolsa, posicion_corta_pct: 5.83, comentario: null, confianza: 'Alta' },
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
      { nombre: 'Incyte', ticker: 'INCY', pais: 'US', capitalizacion: 22610, ev_ventas: 3.11, ev_ebitda_ltm: 9.3, ev_ebitda_ntm: null, per_ntm: null, crecimiento_pct: 8.5, margen_ebitda_pct: 33.4, roic_pct: null, dn_ebitda: -2.3, fcf_yield_pct: 8.5 },
      { nombre: 'United Therapeutics', ticker: 'UTHR', pais: 'US', capitalizacion: 23160, ev_ventas: 6.14, ev_ebitda_ltm: 12.9, ev_ebitda_ntm: null, per_ntm: 20.3, crecimiento_pct: null, margen_ebitda_pct: 47.4, roic_pct: 31.3, dn_ebitda: -2.5, fcf_yield_pct: 4.7 },
      { nombre: 'Vertex', ticker: 'VRTX', pais: 'US', capitalizacion: 126350, ev_ventas: 9.11, ev_ebitda_ltm: 22.5, ev_ebitda_ntm: null, per_ntm: 34.4, crecimiento_pct: null, margen_ebitda_pct: 40.5, roic_pct: 28.8, dn_ebitda: -2.3, fcf_yield_pct: 3.0 },
      { nombre: 'BioMarin', ticker: 'BMRN', pais: 'US', capitalizacion: 10670, ev_ventas: 4.11, ev_ebitda_ltm: 21.7, ev_ebitda_ntm: null, per_ntm: 9.6, crecimiento_pct: null, margen_ebitda_pct: 18.9, roic_pct: 3.2, dn_ebitda: 5.2, fcf_yield_pct: 6.9 },
      { nombre: 'Jazz Pharmaceuticals', ticker: 'JAZZ', pais: 'IE', capitalizacion: 13610, ev_ventas: 3.44, ev_ebitda_ltm: 8.2, ev_ebitda_ntm: null, per_ntm: 9.6, crecimiento_pct: null, margen_ebitda_pct: 41.9, roic_pct: 17.2, dn_ebitda: 1.1, fcf_yield_pct: 11.7 },
      { nombre: 'Exelixis', ticker: 'EXEL', pais: 'US', capitalizacion: 15110, ev_ventas: 5.70, ev_ebitda_ltm: 13.6, ev_ebitda_ntm: null, per_ntm: 17.4, crecimiento_pct: null, margen_ebitda_pct: 41.9, roic_pct: null, dn_ebitda: -1.2, fcf_yield_pct: 7.8 },
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
  { id: 1, titulo: 'Stocktwits: flujo de mensajes de $NBIX (30 mensajes del 13-ago al 7-oct-2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-07', url: 'https://api.stocktwits.com/api/2/streams/symbol/NBIX.json' },
  { id: 2, titulo: 'Seeking Alpha: titulares y artículos de NBIX (jul-oct 2026: «House Full Of Options», «Upholding A Buy Rating After M&A Deal For Soleno», «Neurocrine slips as safety issues linked to Vykat XR resurface»)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-09-15', url: 'https://seekingalpha.com/api/sa/combined/NBIX.xml' },
  { id: 3, titulo: 'NBIX Stock Slips As $2.9B Soleno Deal Triggers Fresh Drug Safety Warnings (con comentarios de usuarios)', editor: 'Stocktwits News', tipo: 'Foros y redes', fecha: '2026-08-12', url: 'https://stocktwits.com/news-articles/markets/equity/nbix-stock-slips-as-2-9-b-soleno-deal-triggers-fresh-drug-safety-warnings/cZo8lijRJWD' },
  { id: 4, titulo: 'NBIX stock dips 12% in a month: time to buy, hold or sell?', editor: 'Zacks', tipo: 'Foros y redes', fecha: '2026-08', url: 'https://www.zacks.com/stock/news/2975712/nbix-stock-dips-12-in-a-month-time-to-buy-hold-or-sell' },
];
const E = {
  _estado: 'Completo con lo que abre (Reddit no responde): Stocktwits, Seeking Alpha, Stocktwits News y Zacks.',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Empeora',
    revisadas: [
      { plataforma: 'Stocktwits ($NBIX)', fecha: '2026-10', n_comentarios: 30, tono: 'Dividido', resumen: 'Los alcistas compran en las caídas (151-152 USD en agosto) y la ven como «crecimiento barato»; desde mediados de septiembre predominan los mensajes de desconcierto («¿qué está pasando con el precio?») sin una noticia concreta [1].' },
      { plataforma: 'Seeking Alpha (artículos y comentarios)', fecha: '2026-09', n_comentarios: 25, tono: 'Positivo', resumen: 'Los autores mantienen compra tras Soleno («casa llena de opciones») pero señalan que VYKAT XR añade riesgo; la duda recurrente es el gasto comercial y el IRA de 2029 [2].' },
      { plataforma: 'Stocktwits News (comentarios)', fecha: '2026-08', n_comentarios: 15, tono: 'Negativo', resumen: 'La alerta de seguridad de VYKAT XR (siete muertes notificadas) reaviva el informe bajista de 2025 contra Soleno; algunos usuarios dudan del precio pagado [3].' },
      { plataforma: 'Zacks (comentarios y nota)', fecha: '2026-08', n_comentarios: 10, tono: 'Neutro', resumen: 'La caída del 12 % en un mes se atribuye al mayor gasto y a la compra; se recomienda mantener [4].' },
    ],
    temas: [
      { tema: 'Seguridad de VYKAT XR y precio pagado por Soleno', postura: 'Bajista', peso: 'Alto', contraste: null },
      { tema: 'Valoración barata frente al crecimiento', postura: 'Alcista', peso: 'Alto', contraste: null },
      { tema: 'Negociación de precios de Medicare (IRA) de INGREZZA en 2029', postura: 'Bajista', peso: 'Medio', contraste: null },
      { tema: 'Fase 3 de osavampator y direclidina en 2027', postura: 'Alcista', peso: 'Medio', contraste: null },
    ],
    lectura: null,
    confianza: 'Media',
  },
  fuentes: fE,
};

guarda('A', A); guarda('B', B); guarda('C', C); guarda('D', D); guarda('E', E);
console.log('Notas A-E escritas');
