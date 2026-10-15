// Notas A-E de Exelixis (EXEL), corte 2026-10-15. Hechas sin subagentes.
// Cifras de las cuentas: XBRL de la SEC (notas/cuentas-xbrl.json) contrastado con el 10-K 2025, el 10-Q del 2T26 y las notas de resultados.
// Ejercicio de 52/53 semanas que acaba el viernes más próximo al 31-dic: el FY que acaba el 2-ene-2026 es «2025» (como lo llama la empresa).
// Ejecutar: node notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const EDGAR = 'https://www.sec.gov/Archives/edgar/data/939767';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Form 10-K 2025 (cuentas anuales auditadas, ventas por producto, royalties, patentes, litigios, empleados)', editor: 'Exelixis, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-02-10', url: `${EDGAR}/000093976726000021/exel-20260102.htm` },
  { id: 2, titulo: 'Form 10-Q 2T26 (balance a 3-jul-26, flujos del semestre, caja y valores negociables, litigios con MSN)', editor: 'Exelixis, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-08-05', url: `${EDGAR}/000093976726000098/exel-20260703.htm` },
  { id: 3, titulo: 'Exelixis Announces Second Quarter 2026 Financial Results (Exhibit 99.1; guía 2026 rebajada)', editor: 'Exelixis, Inc.', tipo: 'Primaria', fecha: '2026-08-05', url: `${EDGAR}/000093976726000096/exel20260630exhibit991.htm` },
  { id: 4, titulo: 'Exelixis Announces First Quarter 2026 Financial Results (Exhibit 99.1)', editor: 'Exelixis, Inc.', tipo: 'Primaria', fecha: '2026-05-05', url: `${EDGAR}/000093976726000058/exel20260331exhibit991.htm` },
  { id: 5, titulo: 'Exelixis Announces Fourth Quarter and Fiscal Year 2025 Financial Results (Exhibit 99.1)', editor: 'Exelixis, Inc.', tipo: 'Primaria', fecha: '2026-02-10', url: `${EDGAR}/000093976726000019/exel2025q42025exhibit991.htm` },
  { id: 6, titulo: 'Exelixis Announces Third Quarter 2025 Financial Results (Exhibit 99.1; guía 2025 subida)', editor: 'Exelixis, Inc.', tipo: 'Primaria', fecha: '2025-11-04', url: `${EDGAR}/000093976725000127/exel20250930exhibit991.htm` },
  { id: 7, titulo: 'Company facts XBRL de Exelixis (CIK 939767): cuenta, balance, flujos, valores negociables, ventas y BPA trimestrales', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0000939767.json' },
  { id: 8, titulo: 'Form 10-K 2022 (caja e inversiones de 2021 y 2022, flujos de 2020-2022)', editor: 'Exelixis, Inc. (SEC)', tipo: 'Primaria', fecha: '2023-02-07', url: `${EDGAR}/000093976723000019/exel-20221230.htm` },
  { id: 9, titulo: 'Exelixis Announces Preliminary Fiscal Year 2025 Financial Results, Provides 2026 Financial Guidance (Exhibit 99.1)', editor: 'Exelixis, Inc.', tipo: 'Primaria', fecha: '2026-01-11', url: `${EDGAR}/000093976726000003/exel20260111exhibit991.htm` },
];

const c = (periodo, ingresos, coste_ventas, gastos_generales, ebitda, amortizaciones, ebit, resultado_financiero, bai, impuestos, beneficio_neto, bpa, acciones_diluidas, no_recurrentes_en_ebitda = null) => ({
  periodo, ingresos, coste_ventas, gastos_generales, ebitda, amortizaciones, ebit, resultado_financiero, bai, impuestos, minoritarios: 0, beneficio_neto, gastos_financieros: 0,
  participadas_en_ebitda: null, no_recurrentes_en_ebitda, bpa, dpa: 0, dpa_extraordinario: 0, acciones_diluidas,
});
const cuenta = [
  c('2021', 1435.0, 52.9, 401.7, 300.3, 13.6, 286.7, 7.5, 294.2, 63.1, 231.1, 0.72, 322.4),
  c('2022', 1611.1, 57.9, 459.9, 222.4, 20.9, 201.5, 32.9, 234.4, 52.1, 182.3, 0.56, 324.6),
  c('2023', 1830.2, 72.5, 542.7, 196.6, 25.7, 170.9, 86.6, 257.5, 49.8, 207.8, 0.65, 321.5),
  c('2024', 2168.7, 76.2, 492.1, 633.4, 28.8, 604.6, 77.0, 681.6, 160.4, 521.3, 1.76, 296.1, 85.3),
  c('2025', 2320.1, 83.7, 518.7, 901.3, 29.1, 872.2, 69.0, 941.2, 158.6, 782.6, 2.78, 281.9, 20.5),
];

const A = {
  _estado: 'Completo. Cuentas 2021-2025 del XBRL contrastadas con el 10-K 2025 (y el 10-K 2022 para la caja de 2021-2022); LTM a junio de 2026 con el 10-Q del 2T26; trimestres del XBRL y de las notas de resultados.',
  negocio: {
    segmentos: [
      { nombre: 'CABOMETYX (cabozantinib, EE. UU.)', descripcion: 'Comprimido oral para cáncer renal avanzado (sola o con nivolumab), hepatocarcinoma, tiroides diferenciado y tumores neuroendocrinos', tipo_resultado: null, historico: [
        { periodo: '2023', ingresos: 1615.3, resultado: null }, { periodo: '2024', ingresos: 1798.2, resultado: null }, { periodo: '2025', ingresos: 2113.4, resultado: null } ] },
      { nombre: 'COMETRIQ (cabozantinib cápsulas, EE. UU.)', descripcion: 'Cáncer medular de tiroides', tipo_resultado: null, historico: [
        { periodo: '2023', ingresos: 13.6, resultado: null }, { periodo: '2024', ingresos: 11.2, resultado: null }, { periodo: '2025', ingresos: 9.4, resultado: null } ] },
      { nombre: 'Colaboraciones (royalties de Ipsen y Takeda, hitos y servicios)', descripcion: 'Royalties sobre las ventas de cabozantinib fuera de EE. UU. (Ipsen) y en Japón (Takeda), hitos y reembolsos, menos el 3 % que se paga a Royalty Pharma', tipo_resultado: null, historico: [
        { periodo: '2023', ingresos: 201.3, resultado: null }, { periodo: '2024', ingresos: 359.3, resultado: null }, { periodo: '2025', ingresos: 197.3, resultado: null } ] },
    ],
    geografias: [{ nombre: 'EE. UU. (ventas propias)', peso_pct: 91.5 }, { nombre: 'Resto del mundo (royalties y colaboraciones)', peso_pct: 8.5 }],
    geografias_criterio: 'origen',
    kpis: [
      { kpi: 'Ventas netas de cabozantinib en EE. UU. (M USD)', valor_anterior: '1.809,4 (2024)', valor_actual: '2.122,8 (2025)', variacion: '+17 %', comentario: 'Unidades +16 % y precio neto medio +1 %: más duración de tratamiento con nivolumab en riñón y tumores neuroendocrinos desde mar-2025 [A1].' },
      { kpi: 'Ventas brutas frente a netas (descuentos)', valor_anterior: '28,1 % (2024)', valor_actual: '29,5 % (2025)', variacion: '+1,4 puntos', comentario: 'Descuentos crecientes por programas públicos y el 340B [A1].' },
      { kpi: 'Royalties de Ipsen (M USD)', valor_anterior: '154,0 (2024)', valor_actual: '165,9 (2025)', variacion: '+7,7 %', comentario: 'Cabozantinib aprobado en 68 países fuera de EE. UU. [A1].' },
      { kpi: 'Ventas mundiales de la franquicia cabozantinib (M USD)', valor_anterior: 's.d.', valor_actual: '≈ 2.900 (2025)', variacion: null, comentario: 'Exelixis más Ipsen y Takeda [A5].' },
      { kpi: 'Guía de ingresos totales 2026 (M USD)', valor_anterior: '2.525-2.625 (ene-26)', valor_actual: '2.500-2.550 (ago-26)', variacion: '−2 % en el punto medio', comentario: 'Rebajada con el 2T26; no incluye zanzalintinib [A3, A9].' },
      { kpi: 'Acciones en circulación (M)', valor_anterior: '262,5 (dic-25)', valor_actual: '247,8 (27-jul-26)', variacion: '−5,6 %', comentario: '2.900 M USD recomprados desde mar-2023 (93,3 M de acciones a 31,12 USD de media) [A3, A2].' },
      { kpi: 'Empleados', valor_anterior: '1.147 (2024)', valor_actual: '1.077 (2025)', variacion: '−6,1 %', comentario: 'Tras la reestructuración de 2024 [A1].' },
    ],
    confianza: 'Alta',
  },
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-07-03', ingresos: 2435.9, ebitda: 1000.0, ebit: 971.5, beneficio_neto: 860.6, bpa: 3.18, dpa: 0, dpa_extraordinario: 0, fcf: 1172.6, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [],
    comentario: null, ajustes: null,
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '3T24', ingresos: 539.5, crecimiento_pct: 14.3, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.40, vs_consenso: null },
      { periodo: '4T24', ingresos: 566.8, crecimiento_pct: 18.2, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.48, vs_consenso: null },
      { periodo: '1T25', ingresos: 555.4, crecimiento_pct: 30.6, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.55, vs_consenso: null },
      { periodo: '2T25', ingresos: 568.3, crecimiento_pct: -10.8, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.65, vs_consenso: null },
      { periodo: '3T25', ingresos: 597.8, crecimiento_pct: 10.8, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.69, vs_consenso: null },
      { periodo: '4T25', ingresos: 598.6, crecimiento_pct: 5.6, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.88, vs_consenso: null },
      { periodo: '1T26', ingresos: 610.8, crecimiento_pct: 10.0, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.79, vs_consenso: null },
      { periodo: '2T26', ingresos: 628.7, crecimiento_pct: 10.6, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.82, vs_consenso: 'Superior' },
    ],
    ultima_presentacion: null,
    confianza: 'Alta',
  },
  balance: {
    // caja = efectivo + valores negociables a corto y largo plazo (deuda de alta calidad disponible para la venta). Sin deuda financiera.
    // Arrendamientos operativos (US GAAP) fuera de la deuda: su gasto ya está en el EBITDA.
    historico: [
      { periodo: '2021', activo_total: 2616.2, activo_corriente: 1834.7, pasivo_corriente: 337.6, pasivo_total: 405.6, fondo_comercio: 63.7, intangibles: 0, inmovilizado_material: 104.0, existencias: 27.5, clientes: 282.7, proveedores: 24.3, activos_contrato: null, pasivos_contrato: 7.8, caja: 1854.9, deuda_financiera: 0, arrendamientos: 0, patrimonio_neto: 2210.6, minoritarios: 0, reservas: -216.5 },
      { periodo: '2022', activo_total: 3071.5, activo_corriente: 1618.8, pasivo_corriente: 324.4, pasivo_total: 583.1, fondo_comercio: 63.7, intangibles: 0, inmovilizado_material: 110.6, existencias: 33.3, clientes: 214.8, proveedores: 32.7, activos_contrato: null, pasivos_contrato: 7.5, caja: 2066.7, deuda_financiera: 0, arrendamientos: 0, patrimonio_neto: 2488.4, minoritarios: 0, reservas: -34.2 },
      { periodo: '2023', activo_total: 2942.4, activo_corriente: 1318.0, pasivo_corriente: 394.3, pasivo_total: 678.4, fondo_comercio: 63.7, intangibles: 0, inmovilizado_material: 128.7, existencias: 17.3, clientes: 237.4, proveedores: 33.8, activos_contrato: null, pasivos_contrato: 5.4, caja: 1724.0, deuda_financiera: 0, arrendamientos: 0, patrimonio_neto: 2263.9, minoritarios: 0, reservas: -173.4 },
      { periodo: '2024', activo_total: 2947.7, activo_corriente: 1467.6, pasivo_corriente: 403.8, pasivo_total: 703.5, fondo_comercio: 63.7, intangibles: 0, inmovilizado_material: 119.4, existencias: 22.4, clientes: 265.4, proveedores: 38.2, activos_contrato: null, pasivos_contrato: 2.7, caja: 1748.6, deuda_financiera: 0, arrendamientos: 0, patrimonio_neto: 2244.2, minoritarios: 0, reservas: -98.6 },
      { periodo: '2025', activo_total: 2844.4, activo_corriente: 1443.3, pasivo_corriente: 405.6, pasivo_total: 683.1, fondo_comercio: 63.7, intangibles: 0, inmovilizado_material: 99.0, existencias: 21.7, clientes: 286.9, proveedores: 29.6, activos_contrato: null, pasivos_contrato: 1.1, caja: 1662.7, deuda_financiera: 0, arrendamientos: 0, patrimonio_neto: 2161.3, minoritarios: 0, reservas: -76.8 },
    ],
    vencimientos: [],
    liquidez: 'Caja y valores negociables de 1.384,3 M USD a 3-jul-26 (281,4 de efectivo, 557,9 a corto y 544,9 a largo plazo), sin deuda financiera ni línea de crédito relevante [A2].',
    rating: 'Sin rating',
    coste_deuda_pct: null, vida_media_anios: null,
    otros_pasivos: null, comentario: null,
    confianza: 'Alta',
  },
  flujos: {
    // adquisiciones = I+D en curso comprada (licencias de moléculas); recompras incluyen los impuestos pagados por liquidación neta de acciones cuando superan lo cobrado por el plan de empleados.
    historico: [
      { periodo: '2021', flujo_operativo: 400.8, capex: 54.2, pagos_arrendamientos: 0, adquisiciones: 10.0, desinversiones: 0, dividendos: 0, recompras: 14.8, emision_acciones: 0, intereses_en_financiacion: 0 },
      { periodo: '2022', flujo_operativo: 362.6, capex: 27.7, pagos_arrendamientos: 0, adquisiciones: 110.8, desinversiones: 0, dividendos: 0, recompras: 0, emision_acciones: 0.6, intereses_en_financiacion: 0 },
      { periodo: '2023', flujo_operativo: 333.3, capex: 40.5, pagos_arrendamientos: 0, adquisiciones: 122.5, desinversiones: 0, dividendos: 0, recompras: 550.4, emision_acciones: 4.3, intereses_en_financiacion: 0 },
      { periodo: '2024', flujo_operativo: 700.0, capex: 28.4, pagos_arrendamientos: 0, adquisiciones: 37.8, desinversiones: 0, dividendos: 0, recompras: 652.0, emision_acciones: 23.2, intereses_en_financiacion: 0 },
      { periodo: '2025', flujo_operativo: 884.3, capex: 8.4, pagos_arrendamientos: 0, adquisiciones: 31.5, desinversiones: 0, dividendos: 0, recompras: 969.6, emision_acciones: 0, intereses_en_financiacion: 0 },
    ],
    comentario: null,
    confianza: 'Alta',
  },
  calidad: { auditor: 'Ernst & Young LLP', anios_auditor: null, opinion: 'Favorable (sin salvedades; control interno eficaz al cierre de 2025)', comentario: null, senales: [], confianza: 'Alta' },
  capital: {
    politica: null,
    adquisiciones: [
      { anio: '2023', objetivo: 'Licencias de moléculas en fase temprana (I+D en curso comprada)', importe: 122.5, ev_ebitda: null, financiacion: 'Caja', resultado: 'Sin producto aprobado; parte de la cartera se recortó en la reestructuración de 2024 [A1].' },
      { anio: '2022', objetivo: 'Licencias de moléculas y anticuerpos (I+D en curso comprada)', importe: 110.8, ev_ebitda: null, financiacion: 'Caja', resultado: 'Sin producto aprobado [A8].' },
      { anio: '2024-2025', objetivo: 'Licencias menores (I+D en curso comprada)', importe: 69.3, ev_ebitda: null, financiacion: 'Caja', resultado: 'Demasiado pronto [A1].' },
    ],
    comentario: null,
    confianza: 'Alta',
  },
  huecos: [
    { seccion: 'trimestres', campo: 'EBITDA trimestral', tipo: 'Complemento', intentos: '1) notas de resultados (solo resultado de explotación y BPA); 2) XBRL trimestral (sin depreciación trimestral); 3) 10-Q (depreciación solo semestral)', decision: 'Omitido' },
    { seccion: 'calidad', campo: 'años del auditor', tipo: 'Complemento', intentos: '1) proxy 2026 (no da el año de inicio); 2) 10-K 2025 (informe del auditor sin año); 3) 10-K 2022 (igual)', decision: 'Omitido' },
  ],
  fuentes: fA,
};

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Form 10-K 2025: negocio, competencia por indicación, patentes de cabozantinib del Orange Book (2026-2033), IRA y excepción de pequeña biotecnológica', editor: 'Exelixis, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-02-10', url: `${EDGAR}/000093976726000021/exel-20260102.htm` },
  { id: 2, titulo: 'Form 10-Q 2T26: excepción de pequeña biotecnológica del IRA hasta IPAY 2028, precios de nación más favorecida, aranceles de abr-2026, litigios con MSN y Azurity (juicio del 2-nov-2026)', editor: 'Exelixis, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-08-05', url: `${EDGAR}/000093976726000098/exel-20260703.htm` },
  { id: 3, titulo: 'Advanced Renal Cell Carcinoma Market: 8.200 M USD en los 7 mayores mercados en 2025, 13.100 M en 2036 (TCAC 4,22 %)', editor: 'IMARC Group', tipo: 'Sectorial', fecha: '2026', url: 'https://www.imarcgroup.com/advanced-renal-cell-carcinoma-market' },
  { id: 4, titulo: 'Kidney Cancer Medicine Market: de 6.600 M USD en 2025 a 10.190 M en 2032 (TCAC 6,4 %)', editor: 'Reportprime', tipo: 'Sectorial', fecha: '2026', url: 'https://www.reportprime.com/kidney-cancer-medicine-r13881.md' },
  { id: 5, titulo: 'Form 8-K: el Tribunal de Apelación del Circuito Federal confirma la validez de las patentes \'439, \'440 y \'015; el genérico de MSN no antes del 15-ene-2030', editor: 'Exelixis, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-08-31', url: `${EDGAR}/000093976726000104/exel-20260831.htm` },
  { id: 6, titulo: 'Form 10-K 2023: acuerdo con Teva (18-jul-2023), licencia para vender su genérico de CABOMETYX en EE. UU. desde el 1-ene-2031', editor: 'Exelixis, Inc. (SEC)', tipo: 'Primaria', fecha: '2024-02-06', url: `${EDGAR}/000093976724000028/exel-20231229.htm` },
  { id: 7, titulo: 'Incyte, United Therapeutics, Vertex, BioMarin, Jazz y Neurocrine: estadísticas (capitalización, EV, márgenes, ROIC, PER adelantado) a 14-oct-26 (ficha sectorial de biofarma)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/incy/statistics/' },
  { id: 8, titulo: 'RBC Capital Lowers Exelixis (EXEL) Price Target to $43 (datos del inhibidor de HIF-2α de Merck en riñón)', editor: 'Yahoo Finance', tipo: 'Prensa', fecha: '2026-03-02', url: 'https://finance.yahoo.com/markets/stocks/articles/rbc-capital-lowers-exelixis-exel-071800844.html' },
];
const B = {
  _estado: 'Completo. Mercado relevante = fármacos para el cáncer renal avanzado (la mayor indicación de cabozantinib); tumores neuroendocrinos, hígado y tiroides como indicaciones secundarias sin tamaño publicado fiable.',
  negocio: { descripcion: null, como_gana_dinero: null, clientes: null },
  sector: {
    definicion: null,
    tamano: '≈ 8.200 M USD en 2025 en los siete mayores mercados (EE. UU., UE-4, Reino Unido y Japón) para el cáncer renal avanzado [B3]; otra fuente da 6.600 M para todos los fármacos del cáncer de riñón en el mundo [B4]',
    unidad_serie: 'millones de USD (cáncer renal avanzado, 7 mayores mercados; 2030e y 2036e con la TCAC de la fuente)',
    serie: [ { anio: '2025', tamano: 8200 }, { anio: '2030e', tamano: 10080 }, { anio: '2036e', tamano: 13100 } ],
    tcac_historico_pct: null, tcac_previsto_pct: 4.2, cr5_pct: null, estructura: 'Moderadamente concentrada',
    drivers: [], porter: [], ciclo: { posicion: 'Expansión', comentario: null }, regulacion: null, tendencias: null,
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 25.0, posicion: 'Inhibidor de tirosina-quinasa más recetado en cáncer renal avanzado en EE. UU. con nivolumab en primera línea (estimación propia de cuota: ≈ 25 % del mercado de cáncer renal avanzado de los 7 mayores mercados, con las ventas mundiales de cabozantinib en riñón); 2.ª línea en hepatocarcinoma y tumores neuroendocrinos',
    competidores: [
      { nombre: 'Merck (KEYTRUDA + axitinib o lenvatinib; WELIREG)', pais: 'US', ticker: 'MRK', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Principal rival en primera línea de riñón; su inhibidor de HIF-2α (belzutifan) avanza en combinaciones [B1, B8].' },
      { nombre: 'Bristol-Myers Squibb (OPDIVO + YERVOY)', pais: 'US', ticker: 'BMY', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Socio y rival: nivolumab va con cabozantinib en CheckMate-9ER y también con ipilimumab [B1].' },
      { nombre: 'Eisai (lenvatinib)', pais: 'JP', ticker: '4523', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Competidor en riñón, hígado y tiroides [B1].' },
      { nombre: 'Pfizer (axitinib, sunitinib)', pais: 'US', ticker: 'PFE', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Axitinib con pembrolizumab en primera línea de riñón [B1].' },
      { nombre: 'Bayer (regorafenib, sorafenib)', pais: 'DE', ticker: 'BAYN', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Rival en hígado y referencia de zanzalintinib en colorrectal (STELLAR-303) [B1].' },
      { nombre: 'Incyte (comparable de modelo)', pais: 'US', ticker: 'INCY', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Un producto principal (Jakafi) con vencimiento cercano; margen EBITDA 33,4 % [B7].' },
      { nombre: 'Jazz Pharmaceuticals (comparable de modelo)', pais: 'IE', ticker: 'JAZZ', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Ya pasó el precipicio de Xyrem; margen EBITDA 41,9 % [B7].' },
    ],
    foso: { veredicto: 'Estrecho', tendencia: 'Se estrecha', fuentes: [
      { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'No aplica a un medicamento.' },
      { fuente: 'Costes de cambio', puntuacion: 2, evidencia: 'Los oncólogos mantienen la pauta que funciona y la combinación con nivolumab dura más (las recargas explicaron el +16 % de unidades de 2025) [A1].' },
      { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'La patente de composición vence en ago-2026; protegen el producto las de sal y formulación hasta 2030-2033: genéricos de MSN no antes del 15-ene-2030 y acuerdos con Teva y otros desde el 1-ene-2031 [B1, B5, B6].' },
      { fuente: 'Ventaja en costes', puntuacion: 2, evidencia: 'Coste de ventas del 3,6 % de los ingresos, igual que cualquier medicamento con patente [A1].' },
      { fuente: 'Escala eficiente', puntuacion: 2, evidencia: 'Red comercial en oncología urológica y digestiva que zanzalintinib podría aprovechar [A5].' },
    ] },
    amenazas: null,
    confianza: 'Media',
  },
  fuentes: fB,
};

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Proxy statement 2026 (DEF 14A): consejo, remuneración 2025, accionistas, ratio de remuneración', editor: 'Exelixis, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-04-15', url: `${EDGAR}/000093976726000046/exel-20260415.htm` },
  { id: 2, titulo: 'Form 8-K: resultados de la junta de 26-may-2026 (voto consultivo de remuneración: 163,1 M a favor y 43,2 M en contra)', editor: 'Exelixis, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-05-29', url: `${EDGAR}/000093976726000074/exel-20260526.htm` },
  { id: 3, titulo: 'Form 4 presentados entre el 15-oct-25 y el 15-oct-26 (herramientas/form4.mjs)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000939767&type=4' },
  { id: 4, titulo: 'Exelixis Announces Third Quarter 2025 Financial Results (guías 2025 de mayo y noviembre)', editor: 'Exelixis, Inc.', tipo: 'Primaria', fecha: '2025-11-04', url: `${EDGAR}/000093976725000127/exel20250930exhibit991.htm` },
  { id: 5, titulo: 'Exelixis Announces Second Quarter 2026 Financial Results (guía 2026 rebajada)', editor: 'Exelixis, Inc.', tipo: 'Primaria', fecha: '2026-08-05', url: `${EDGAR}/000093976726000096/exel20260630exhibit991.htm` },
  { id: 6, titulo: 'Exelixis Announces Preliminary Fiscal Year 2025 Financial Results, Provides 2026 Financial Guidance', editor: 'Exelixis, Inc.', tipo: 'Primaria', fecha: '2026-01-11', url: `${EDGAR}/000093976726000003/exel20260111exhibit991.htm` },
];
const C = {
  _estado: 'Completo con el proxy 2026, la junta de mayo y los Form 4 de 12 meses.',
  directivos: {
    equipo: [
      { nombre: 'Michael M. Morrissey', cargo: 'Consejero delegado (President and CEO)', desde: '2010', participacion_pct: 0.88, trayectoria: 'En Exelixis desde 2000 como responsable de investigación; consejero delegado desde 2010. Llevó a cabozantinib de la aprobación en tiroides (2012) a 2.123 M de ventas en EE. UU. en 2025 y lanzó el programa de zanzalintinib [C1, A1].' },
      { nombre: 'Christopher J. Senner', cargo: 'Director financiero', desde: '2015', participacion_pct: 0.21, trayectoria: 'Ha llevado las recompras de 2023-2026 (2.900 M USD); vendió 4,6 M USD de acciones en 12 meses [C1, C3].' },
      { nombre: 'Dana T. Aftab', cargo: 'Director de I+D', desde: '2025', participacion_pct: 0.08, trayectoria: 'En Exelixis desde 1998, donde dirigió el descubrimiento de cabozantinib; director científico (2022-2025) y ascendido en ago-2025 tras la salida de la directora médica Amy Peterson [C1].' },
      { nombre: 'Patrick J. Haley', cargo: 'Director comercial', desde: '2020', participacion_pct: 0.0, trayectoria: 'Responsable del crecimiento de CABOMETYX en riñón y tumores neuroendocrinos y del lanzamiento previsto de zanzalintinib [C1].' },
      { nombre: 'Stelios Papadopoulos', cargo: 'Presidente no ejecutivo (cofundador)', desde: '1994', participacion_pct: 0.46, trayectoria: 'Cofundador y presidente del consejo desde 1998; ex banquero de inversión en biotecnología (Cowen, PaineWebber) [C1].' },
      { nombre: 'David E. Johnson', cargo: 'Consejero (Caligan Partners)', desde: '2023', participacion_pct: 0.65, trayectoria: 'Gestor activista que entró en el consejo en 2023 por acuerdo; único consejero que ha comprado acciones en 12 meses (1,19 M USD) [C1, C3].' },
    ],
    historial_guidance: [
      { anio: '2025', guia: 'Ingresos totales 2.250-2.350 M USD (may-25), subida a 2.300-2.350 M (nov-25)', real: '2.320,1 M', cumplida: 'Sí' },
      { anio: '2026', guia: 'Ingresos totales 2.525-2.625 M (ene-26), rebajada a 2.500-2.550 M (ago-26)', real: '1.239,5 M en el 1S26', cumplida: 'Parcial' },
    ],
    comentario: null,
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Stelios Papadopoulos', cargo: 'Presidente', tipo: 'Independiente', desde: '1994', comisiones: null },
      { nombre: 'Michael M. Morrissey', cargo: 'Consejero delegado', tipo: 'Ejecutivo', desde: '2010', comisiones: null },
      { nombre: 'Mary C. Beckerle', cargo: 'Consejera', tipo: 'Independiente', desde: '2024', comisiones: null },
      { nombre: 'S. Gail Eckhardt', cargo: 'Consejera', tipo: 'Independiente', desde: '2024', comisiones: null },
      { nombre: 'Maria C. Freire', cargo: 'Consejera', tipo: 'Independiente', desde: '2018', comisiones: null },
      { nombre: 'Tomas J. Heyman', cargo: 'Consejero', tipo: 'Independiente', desde: '2023', comisiones: null },
      { nombre: 'David E. Johnson', cargo: 'Consejero (Caligan Partners)', tipo: 'Independiente', desde: '2023', comisiones: null },
      { nombre: 'Robert L. Oliver, Jr.', cargo: 'Consejero', tipo: 'Independiente', desde: '2023', comisiones: null },
      { nombre: 'George Poste', cargo: 'Consejero', tipo: 'Independiente', desde: '2004', comisiones: null },
      { nombre: 'Julie Anne Smith', cargo: 'Consejera', tipo: 'Independiente', desde: '2016', comisiones: null },
      { nombre: 'Jack L. Wyszomierski', cargo: 'Consejero', tipo: 'Independiente', desde: '2004', comisiones: null },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 78.9, voto_remuneracion_contra_pct: 20.9, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 33.24, fijo: 1.31, variable_corto: 1.38, variable_largo: 30.54, ratio_salario_medio: 81 },
    remuneracion: null,
    accionistas: [
      { nombre: 'The Vanguard Group', pct: 12.3, tipo: 'Institucional', variacion: '13G/A de mar-2026: reorganización interna de sus participaciones' },
      { nombre: 'BlackRock', pct: 11.1, tipo: 'Institucional', variacion: 's.d.' },
      { nombre: 'Farallon Capital', pct: 6.1, tipo: 'Inversor activista (campaña de 2022)', variacion: 's.d.' },
      { nombre: 'Consejeros y directivos', pct: 2.6, tipo: 'Internos', variacion: 'Ventas de 42,2 M USD y compras de 1,19 M en 12 meses' },
    ],
    insiders: [
      { fecha: '2025-10-15 a 2026-10-15', persona: 'Dana T. Aftab (I+D)', operacion: 'Venta', acciones: null, importe: 7.70 },
      { fecha: '2025-10-15 a 2026-10-15', persona: 'Patrick J. Haley (comercial)', operacion: 'Venta', acciones: null, importe: 7.60 },
      { fecha: '2025-10-15 a 2026-10-15', persona: 'Julie Smith (consejera)', operacion: 'Venta', acciones: null, importe: 4.69 },
      { fecha: '2025-10-15 a 2026-10-15', persona: 'Jack L. Wyszomierski (consejero, plan 10b5-1)', operacion: 'Venta', acciones: null, importe: 4.58 },
      { fecha: '2025-10-15 a 2026-10-15', persona: 'Christopher J. Senner (financiero)', operacion: 'Venta', acciones: null, importe: 4.56 },
      { fecha: '2025-10-15 a 2026-10-15', persona: 'Stelios Papadopoulos (presidente)', operacion: 'Venta', acciones: null, importe: 4.36 },
      { fecha: '2025-10-15 a 2026-10-15', persona: 'David E. Johnson (consejero)', operacion: 'Compra', acciones: null, importe: 1.19 },
    ],
    control_y_defensas: null,
    alertas: [
      'Voto consultivo de remuneración con un 20,9 % en contra en la junta de 2026, tras una concesión de acciones de 30,5 M USD al consejero delegado [C2, C1].',
      'Ventas de consejeros y directivos de 42,2 M USD en 12 meses (solo 6,9 M con planes 10b5-1) frente a 1,19 M de compras [C3].',
      'Historial de presión activista: Farallon (2022) y Caligan (acuerdo de 2023 con tres consejeros nuevos) [C1].',
      'Rotación en I+D clínica: la directora médica y el jefe jurídico salieron en 2025 [C1].',
    ],
    confianza: 'Alta',
  },
  fuentes: fC,
};

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de EXEL, SPY y XBI (herramientas/bolsa.mjs) hasta el 14-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/EXEL/history' },
  { id: 2, titulo: 'EXEL: previsiones de los analistas (18 analistas, objetivo medio 54,87 USD; BPA ajustado 2026 de 3,58 y 2027 de 4,27; ventas 2026 de 2.600 M y 2027 de 2.900 M)', editor: 'Stock Analysis (S&P Global)', tipo: 'Analistas', fecha: '2026-10-09', url: 'https://stockanalysis.com/stocks/exel/forecast/' },
  { id: 3, titulo: 'EXEL: estadísticas (247,78 M de acciones, PER adelantado 17,41, posición corta 11,37 % de las acciones y 13,19 % del flotante)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/exel/statistics/' },
  { id: 4, titulo: 'Incyte, United Therapeutics, Vertex, BioMarin, Jazz y Neurocrine: estadísticas al cierre del 14-oct-2026 (sectores/biofarma-neurologia-2026-10-15-comparables.json)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/uthr/statistics/' },
  { id: 5, titulo: '10-Year Treasury Constant Maturity Rate (DGS10): 5,21 % el 13-oct-2026', editor: 'Federal Reserve Bank of St. Louis (FRED)', tipo: 'Datos de mercado', fecha: '2026-10-13', url: 'https://fred.stlouisfed.org/series/DGS10' },
  { id: 6, titulo: 'Implied ERP by month (ERP T12m with sustainable payout, oct-2026: 4,20 %)', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 7, titulo: 'Johnson & Johnson closes landmark Intra-Cellular Therapies acquisition (14.600 M USD)', editor: 'Johnson & Johnson', tipo: 'Primaria', fecha: '2025-04-02', url: 'https://www.jnj.com/media-center/press-releases/johnson-johnson-closes-landmark-intra-cellular-therapies-acquisition-to-solidify-neuroscience-leadership' },
  { id: 8, titulo: 'Jazz Pharmaceuticals to acquire GW Pharmaceuticals (7.200 M USD)', editor: 'Jazz Pharmaceuticals', tipo: 'Primaria', fecha: '2021-02-03', url: 'https://investor.jazzpharma.com/news-releases' },
  { id: 9, titulo: 'Form 8-K de Neurocrine: cierre de la compra de Soleno Therapeutics (2.900 M USD)', editor: 'Neurocrine Biosciences (SEC)', tipo: 'Primaria', fecha: '2026-05-18', url: 'https://www.sec.gov/Archives/edgar/data/914475/000119312526228013/d94926d8k.htm' },
  { id: 10, titulo: 'Exelixis (EXEL): noticias de septiembre-octubre de 2026 (cambios de objetivo de RBC, Truist y Bank of America; máximos históricos del 1 y 12-oct)', editor: 'MarketBeat', tipo: 'Prensa', fecha: '2026-10-15', url: 'https://www.marketbeat.com/stocks/NASDAQ/EXEL/news/' },
  { id: 11, titulo: 'Exelixis falls 12.5% (datos de STELLAR-303 en el ESMO 2025)', editor: 'The Fly (TipRanks)', tipo: 'Prensa', fecha: '2025-10-20', url: 'https://www.tipranks.com/news/the-fly/exelixis-falls-12-5-thefly' },
  { id: 12, titulo: 'Form 8-K: la FDA amplía tres meses la revisión de zanzalintinib en colorrectal; nueva fecha PDUFA el 3-mar-2027', editor: 'Exelixis, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-09-11', url: `${EDGAR}/000093976726000108/exel-20260910.htm` },
  { id: 13, titulo: 'Exelixis falls as final analysis of zanzalintinib phase 3 data disappoints (22-jun-26) y otros titulares de EXEL', editor: 'Seeking Alpha', tipo: 'Prensa', fecha: '2026-06-22', url: 'https://seekingalpha.com/api/sa/combined/EXEL.xml' },
];
const bolsa = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const D = {
  _estado: 'Completo. Precio: cierre del 14-oct-2026 (la sesión del 15-oct no había cerrado). Comparables con PER adelantado ajustado (no GAAP) de Stock Analysis.',
  identificacion: {
    nombre: 'Exelixis, Inc.', nombre_corto: 'Exelixis', ticker: 'EXEL', isin: 'US30161Q1040', mercado: 'Nasdaq Global Select', indice_referencia: 'S&P 500',
    pais: 'EE. UU.', pais_iso: 'US', sector: 'Salud', industria: 'Biotecnología', sede: 'Alameda (California)', fundacion: '1994', empleados: 1077, web: 'exelixis.com',
    precio: bolsa.identificacion.precio, fecha_precio: bolsa.identificacion.fecha_precio, acciones: 256.7, capitalizacion_publicada: 15550, free_float_pct: 86.2,
    max_52s: bolsa.identificacion.max_52s, min_52s: bolsa.identificacion.min_52s, volumen_medio_diario: '≈ 133 M USD/día (3 meses)', proximos_resultados: '2026-11-03',
  },
  consenso: {
    guidance: null,
    estimaciones: [
      { periodo: '2026e', ingresos: 2600, ebitda: null, ebit: null, bpa: 3.58, dpa: 0, fuente: 'Stock Analysis (S&P Global), 17 analistas; BPA ajustado sin pagos en acciones [D2]' },
      { periodo: '2027e', ingresos: 2900, ebitda: null, ebit: null, bpa: 4.27, dpa: 0, fuente: 'Stock Analysis (S&P Global); BPA ajustado [D2]' },
    ],
    recomendaciones: { n_analistas: 18, comprar: null, mantener: null, vender: null, po_medio: 54.87, po_min: 41, po_max: 70 },
    revisiones: null,
    base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: 5.0,
    confianza: 'Media',
  },
  bolsa: { ...bolsa.bolsa, posicion_corta_pct: 11.37, comentario: null, confianza: 'Alta' },
  multiplos_historicos: {
    serie: [
      { anio: '2021', precio_cierre: 18.28, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2022', precio_cierre: 16.04, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2023', precio_cierre: 23.99, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2024', precio_cierre: 33.30, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2025', precio_cierre: 43.83, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
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
      { nombre: 'Neurocrine Biosciences', ticker: 'NBIX', pais: 'US', capitalizacion: 13820, ev_ventas: 4.1, ev_ebitda_ltm: 15.2, ev_ebitda_ntm: null, per_ntm: 12.0, crecimiento_pct: null, margen_ebitda_pct: 27.0, roic_pct: 21.0, dn_ebitda: -0.5, fcf_yield_pct: null },
    ],
    comentario: null, confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2026-05', objetivo: 'Soleno Therapeutics (VYKAT XR)', comprador: 'Neurocrine Biosciences', ev: 2324, ev_ventas: 12.2, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Biofarma de un producto en lanzamiento; 12,2 veces las ventas de 2025 [D9].' },
      { fecha: '2025-04', objetivo: 'Intra-Cellular Therapies (CAPLYTA)', comprador: 'Johnson & Johnson', ev: 14600, ev_ventas: 21.4, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Producto en crecimiento con patentes largas; 21,4 veces las ventas de 2024 [D7].' },
      { fecha: '2021-05', objetivo: 'GW Pharmaceuticals (EPIDIOLEX)', comprador: 'Jazz Pharmaceuticals', ev: 7200, ev_ventas: 13.7, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Un producto con patentes largas; 13,7 veces las ventas de 2020 [D8].' },
    ],
    comentario: null, confianza: 'Baja',
  },
  fuentes: fD,
};

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Stocktwits: flujo de mensajes de $EXEL (30 mensajes del 11-sep al 15-oct-2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-15', url: 'https://api.stocktwits.com/api/2/streams/symbol/EXEL.json' },
  { id: 2, titulo: 'Seeking Alpha: titulares y artículos de EXEL (jun-oct 2026: «Why The 3-Month Delay Is More Negative Than It May Seem (Downgrade)», «The FDA Delay Costs Less Than The Market Thinks», «STELLAR-303 Results Mixed, STELLAR-304 Success Likely»)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-09-15', url: 'https://seekingalpha.com/api/sa/combined/EXEL.xml' },
  { id: 3, titulo: 'MarketBeat: titulares y comentarios de EXEL (sep-oct 2026)', editor: 'MarketBeat', tipo: 'Foros y redes', fecha: '2026-10-15', url: 'https://www.marketbeat.com/stocks/NASDAQ/EXEL/news/' },
];
const E = {
  _estado: 'Completo con lo que abre (Reddit no responde): Stocktwits, Seeking Alpha y MarketBeat.',
  sentimiento: {
    tono: 'Positivo', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Stocktwits ($EXEL)', fecha: '2026-10', n_comentarios: 30, tono: 'Positivo', resumen: 'Mensajes de impulso: la acción «toca 60» cada día, nuevos máximos y «no estés corto»; algún usuario especula con una compra de la empresa; el retraso de la FDA se lee como algo menor [E1].' },
      { plataforma: 'Seeking Alpha (artículos y comentarios)', fecha: '2026-09', n_comentarios: 20, tono: 'Dividido', resumen: 'Dos lecturas opuestas del retraso de la FDA (rebaja a mantener frente a «cuesta menos de lo que cree el mercado»); el debate de fondo es si zanzalintinib sustituye a cabozantinib antes de 2030-2031 [E2].' },
      { plataforma: 'MarketBeat (titulares y notas de analistas)', fecha: '2026-10', n_comentarios: 15, tono: 'Neutro', resumen: 'Analistas en «mantener» de media con objetivos por debajo del precio (Bank of America en venta a 41 USD, RBC a 51); despachos de bufetes que buscan accionistas sin demanda presentada [E3].' },
    ],
    temas: [
      { tema: 'Retraso de la FDA y aprobación de zanzalintinib en colorrectal', postura: 'Dividida', peso: 'Alto', contraste: null },
      { tema: 'Impulso y máximos históricos', postura: 'Alcista', peso: 'Alto', contraste: null },
      { tema: 'Genéricos de cabozantinib en 2030-2031', postura: 'Bajista', peso: 'Medio', contraste: null },
      { tema: 'Posible compra de la empresa', postura: 'Alcista', peso: 'Bajo', contraste: null },
    ],
    lectura: null,
    confianza: 'Media',
  },
  fuentes: fE,
};

guarda('A', A); guarda('B', B); guarda('C', C); guarda('D', D); guarda('E', E);
console.log('Notas A-E escritas');
