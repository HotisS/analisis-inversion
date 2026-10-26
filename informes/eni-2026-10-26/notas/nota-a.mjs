// Nota A (Cuentas) de Eni, corte 2026-10-26. Fuentes: XBRL ESEF 2020-2025 (cuentas-xbrl.json, sin cambios desde el 15-oct),
// 20-F 2025/2022/2020 (ajustes y acciones), comunicado de resultados del 3T26 (23-oct-2026), documento pro forma 2025-9M26,
// presentación y transcripción del 3T26, 6-K de recompra del 21-oct. Cita solo con [n] de su propia lista.
// Ejecutar: node informes/eni-2026-10-26/notas/nota-a.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const X = JSON.parse(fs.readFileSync(path.join(dir, 'cuentas-xbrl.json'), 'utf8'));
const E8 = 'https://www.sec.gov/Archives/edgar/data/1002242';
const ED = 'https://www.eni.com/content/dam/enicom/documents';
const ANIOS = ['2020', '2021', '2022', '2023', '2024', '2025'];

// Partidas excluidas del resultado operativo ajustado (efecto inventario + partidas identificadas). Positivo = gasto neto
// dentro del EBIT/EBITDA publicado (ajustado − publicado). 20-F 2025 (2023-2025), 20-F 2022 (2020-2022); 2025 cuadrado de
// nuevo con el documento pro forma (EBIT ajustado 8.344 − publicado 5.010 = 3.334).
const noRec = { 2020: 5173, 2021: -2677, 2022: 2876, 2023: 5548, 2024: 5110, 2025: 3334 };
const dpa = { 2020: 0.36, 2021: 0.86, 2022: 0.88, 2023: 0.94, 2024: 1.0, 2025: 1.05 };
const accDil = { 2020: 3572.5, 2021: 3573.6, 2022: 3490.0, 2023: 3327.1, 2024: 3230.4, 2025: 3088.1 };
const gFin = { 2023: 1141, 2024: 1499, 2025: 1374 };

const fA = [
  { id: 1, titulo: 'Annual Report on Form 20-F 2025 (cuentas consolidadas auditadas, resultados ajustados 2023-2025, BPA y acciones, bonos híbridos, accionistas)', editor: 'Eni S.p.A. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-03-23', url: `${E8}/000155485526000390/e-20251231.htm` },
  { id: 2, titulo: 'Informe financiero ESEF (XBRL) 2020-2025: cuenta, balance y flujos', editor: 'Eni S.p.A. / filings.xbrl.org', tipo: 'Primaria', fecha: '2026-03-23', url: 'https://filings.xbrl.org/' },
  { id: 3, titulo: 'Eni: results for the third quarter and nine months of 2026 (comunicado completo con cuenta, balance a 30-sep-2026, flujos, deuda neta y partidas especiales)', editor: 'Eni S.p.A.', tipo: 'Primaria', fecha: '2026-10-23', url: `${ED}/press-release/migrated/2026-en/10/PR-2026-third-quarter-results.pdf` },
  { id: 4, titulo: 'Annual Report on Form 20-F 2022 (resultados ajustados 2020-2022 y acciones medias)', editor: 'Eni S.p.A. / SEC EDGAR', tipo: 'Primaria', fecha: '2023-04-05', url: `${E8}/000155485523000224/e-20221231.htm` },
  { id: 5, titulo: 'Annual Report on Form 20-F 2020 (resultados ajustados 2018-2020 y acciones medias)', editor: 'Eni S.p.A. / SEC EDGAR', tipo: 'Primaria', fecha: '2021-04-02', url: `${E8}/000110465921046015/tm215953-3_20f.htm` },
  { id: 6, titulo: 'Eni: report on the purchase of treasury shares during the period from 12 to 16 October 2026 (6-K)', editor: 'Eni S.p.A. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-21', url: `${E8}/000117494726000921/form6k-36435_eni.htm` },
  { id: 7, titulo: 'Group proforma adjusted results 2025 and nine months 2026 (por trimestre y segmento)', editor: 'Eni S.p.A.', tipo: 'Primaria', fecha: '2026-10-23', url: `${ED}/eng/reports/2026/group-proforma-adjusted-results-2025-and-nine-months-2026.pdf` },
  { id: 8, titulo: '3Q 2026 results: presentación a analistas (escenario de la guía, Plenitude, deuda)', editor: 'Eni S.p.A.', tipo: 'Primaria', fecha: '2026-10-23', url: `${ED}/eng/investor/presentations/2026/2026-third-quarter-results/2026-third-quarter-results.pdf` },
  { id: 9, titulo: 'ENI 3Q 2026 Results: transcripción de la conferencia (intervención del director financiero)', editor: 'Eni S.p.A.', tipo: 'Primaria', fecha: '2026-10-23', url: `${ED}/eng/investor/presentations/2026/2026-third-quarter-results/2026-third-quarter-results-Transcript.pdf` },
  { id: 10, titulo: 'Interim Consolidated Report as of June 30, 2026 (6-K): resultados del 1S26 y plusvalía de Searah', editor: 'Eni S.p.A. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-07-31', url: `${E8}/000110465926091832/tm2622039d1_6k.htm` },
  { id: 11, titulo: 'Conti Eni, attesa per utile record, dividendi e buyback (consenso del 3T26: beneficio neto ajustado de 2.480 M)', editor: 'Forbes Italia', tipo: 'Prensa', fecha: '2026-10-21', url: 'https://forbes.it/2026/10/21/conti-eni-utile-record-attesa-dividendi-buyback' },
  { id: 12, titulo: 'Eni, BofA incrementa target price in vista della trimestrale (consenso del 3T26: beneficio neto ajustado de 2.600 M)', editor: 'Teleborsa / Borsa Italiana', tipo: 'Prensa', fecha: '2026-10-16', url: 'https://www.borsaitaliana.it/borsa/notizie/teleborsa/finanza/eni-bofa-incrementa-target-price-in-vista-delle-trimestrale-111_2026-10-16_TLB.html?lang=it' },
  { id: 13, titulo: 'Eni, S&P Global alza outlook a stabile e conferma rating A-/A-2', editor: 'Teleborsa', tipo: 'Prensa', fecha: '2026-10-01', url: 'https://www.teleborsa.it/News/2026/10/01/eni-s-p-global-alza-outlook-a-stabile-e-conferma-rating-a-a-2-175.html' },
];

const cx = Object.fromEntries(X.financieros.cuenta.map((r) => [r.periodo, r]));
const bx = Object.fromEntries(X.balance.historico.map((r) => [r.periodo, r]));
const fx = Object.fromEntries(X.flujos.historico.map((r) => [r.periodo, r]));
const cuenta = ANIOS.map((y) => {
  const c = cx[y];
  return { periodo: y, ingresos: c.ingresos, coste_ventas: null, gastos_generales: null, ebitda: c.ebitda, amortizaciones: c.amortizaciones, ebit: c.ebit, resultado_financiero: c.resultado_financiero, bai: c.bai, impuestos: c.impuestos, minoritarios: c.minoritarios, beneficio_neto: c.beneficio_neto, gastos_financieros: gFin[y] ?? null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: noRec[y], bpa: c.bpa, dpa: dpa[y], dpa_extraordinario: 0, acciones_diluidas: accDil[y] };
});
const historico = ANIOS.map((y) => {
  const b = bx[y];
  return { periodo: y, activo_total: b.activo_total, activo_corriente: b.activo_corriente, pasivo_corriente: b.pasivo_corriente, pasivo_total: b.pasivo_total, fondo_comercio: null, intangibles: null, inmovilizado_material: b.inmovilizado_material, existencias: b.existencias, clientes: b.clientes, proveedores: b.proveedores, activos_contrato: null, pasivos_contrato: null, caja: b.caja, deuda_financiera: b.deuda_financiera, arrendamientos: b.arrendamientos, patrimonio_neto: b.patrimonio_neto, minoritarios: b.minoritarios, reservas: null };
});
const flujos = ANIOS.map((y) => {
  const f = fx[y];
  return { periodo: y, flujo_operativo: f.flujo_operativo, capex: f.capex, pagos_arrendamientos: f.pagos_arrendamientos ?? 0, adquisiciones: f.adquisiciones ?? 0, desinversiones: f.desinversiones ?? 0, dividendos: f.dividendos ?? 0, recompras: f.recompras ?? 0, emision_acciones: 0, intereses_en_financiacion: 0 };
});

// LTM a sep-26 en base ajustada (todas las operaciones, Plenitude incluida hasta el 30-sep): FY25 + 9M26 − 9M25.
// Ventas: 82.151 + 75.409 − 61.536; EBIT ajustado de filiales: 8.344 + 9.633 − 6.562; amortización (flujos, todas las
// operaciones): 7.349 + 4.952 − 5.538; beneficio neto ajustado atribuido: 4.989 + 6.436 − 3.793 [3, 7].
const ltm = { periodo: 'LTM sep-26', fecha_fin: '2026-09-30', ingresos: 96024, ebitda: 18178, ebit: 11415, beneficio_neto: 7632, bpa: 2.55, dpa: 1.56, dpa_extraordinario: 0.46, fcf: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null };

const A = {
  _estado: 'Completo. Cuentas 2020-2025 del XBRL ESEF (sin cambios) comprobadas con los 20-F; LTM a sep-26, trimestres, segmentos, KPI y balance de 30-sep-2026 con el comunicado del 3T26 y el documento pro forma.',
  negocio: {
    segmentos: [
      { nombre: 'Exploración y Producción (E&P)', descripcion: 'Petróleo y gas en unos 40 países (Egipto, Libia, Argelia, Congo, Costa de Marfil, Angola vía Azule, Noruega vía Vår Energi, Indonesia y Malasia vía Searah); 1,83 Mbep/d en el 3T26', tipo_resultado: 'EBIT ajustado proforma (incluye JV)', historico: [{ periodo: '2025', ingresos: null, resultado: 11163 }, { periodo: '9M25', ingresos: null, resultado: 8368 }, { periodo: '9M26', ingresos: null, resultado: 12757 }] },
      { nombre: 'Gas y GNL global (GGP) y Power', descripcion: 'Compra y venta de gas por gasoducto y GNL (35,3 bcm vendidos en 9M26, +17 %) y centrales de ciclo combinado en Italia', tipo_resultado: 'EBIT ajustado proforma', historico: [{ periodo: '2025', ingresos: null, resultado: 1392 }, { periodo: '9M25', ingresos: null, resultado: 1206 }, { periodo: '9M26', ingresos: null, resultado: 1275 }] },
      { nombre: 'Negocios de transición (Enilive y Plenitude)', descripcion: 'Enilive: biorrefino y 5.000 estaciones (KKR 30 %). Plenitude: renovables (6,1 GW), 10,8 M de clientes y recarga; desconsolidada el 30-sep-2026 (Eni 65 %, control conjunto con Ares)', tipo_resultado: 'EBIT ajustado proforma', historico: [{ periodo: '2025', ingresos: null, resultado: 1208 }, { periodo: '9M25', ingresos: null, resultado: 929 }, { periodo: '9M26', ingresos: null, resultado: 1473 }] },
      { nombre: 'Refino, Química (Versalis) y plantas en transformación', descripcion: 'Refinerías en Italia, 20 % de ADNOC Refining y química de Versalis en reestructuración', tipo_resultado: 'EBIT ajustado proforma', historico: [{ periodo: '2025', ingresos: null, resultado: -689 }, { periodo: '9M25', ingresos: null, resultado: -580 }, { periodo: '9M26', ingresos: null, resultado: 172 }] },
      { nombre: 'Corporación y ajustes', descripcion: 'Servicios centrales y eliminaciones', tipo_resultado: 'EBIT ajustado proforma', historico: [{ periodo: '2025', ingresos: null, resultado: -851 }, { periodo: '9M25', ingresos: null, resultado: -565 }, { periodo: '9M26', ingresos: null, resultado: -772 }] },
    ],
    geografias: [],
    geografias_criterio: null,
    kpis: [
      { kpi: 'Producción de hidrocarburos (Mbep/d)', valor_anterior: '1,756 (3T25)', valor_actual: '1,829 (3T26)', variacion: '+4 % (+7 % subyacente)', comentario: 'Congo, Libia, Costa de Marfil, México, Ghana y Searah; guía 2026 subida al 6-7 % subyacente [3, 9].' },
      { kpi: 'Precio medio realizado (USD/bep)', valor_anterior: '52,07 (3T25)', valor_actual: '69,31 (3T26)', variacion: '+33 %', comentario: 'Brent medio de 97 USD en el 3T26 frente a 69,1 un año antes [3, 8].' },
      { kpi: 'Margen de refino SERM (USD/b)', valor_anterior: '8,9 (3T25)', valor_actual: '28,1 (3T26)', variacion: '×3,2', comentario: 'Destilados medios escasos por el corte de flujos de Oriente Medio [3].' },
      { kpi: 'Ventas de gas (bcm)', valor_anterior: '≈30,2 (9M25, implícito en el +17 %)', valor_actual: '35,33 (9M26)', variacion: '+17 %', comentario: 'Más volumen en Italia y Francia [3].' },
      { kpi: 'Beneficio neto ajustado atribuido (M EUR)', valor_anterior: '3.793 (9M25)', valor_actual: '6.436 (9M26)', variacion: '+70 %', comentario: '2.801 M en el 3T26, por encima del consenso (2.480-2.600 M) [3, 11, 12].' },
      { kpi: 'Gearing proforma (antes de arrendamientos)', valor_anterior: '15 % (dic-25)', valor_actual: '9 % (sep-26)', variacion: '−6 pp', comentario: 'Mínimo histórico; deuda neta de 6.702 M [3].' },
    ],
  },
  financieros: {
    cuenta,
    ltm,
    cambios_perimetro: [
      { periodo: '2026', descripcion: 'Searah (JV 50/50 con Petronas, desde junio de 2026): los activos de Indonesia salen de la consolidación y pasan a participadas (plusvalía de ≈2.000 M). Plenitude: desconsolidada el 30-sep-2026 (Eni 65 %, control conjunto con Ares), registrada como participada a valor razonable con una plusvalía de ≈1.500 M; sale del balance su deuda (≈2.750 M) y sus minoritarios (≈2.000 M) [3].' },
    ],
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '1S25', ingresos: 41332, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 8185, margen_ebitda_pct: 19.8, bpa: 0.82, vs_consenso: null },
      { periodo: '3T25', ingresos: 20204, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 3915, margen_ebitda_pct: 19.4, bpa: 0.41, vs_consenso: null },
      { periodo: '4T25', ingresos: 20615, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 3593, margen_ebitda_pct: 17.4, bpa: 0.39, vs_consenso: null },
      { periodo: '1T26', ingresos: 22962, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 4114, margen_ebitda_pct: 17.9, bpa: 0.43, vs_consenso: null },
      { periodo: '2T26', ingresos: 24375, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 5218, margen_ebitda_pct: 21.4, bpa: 0.78, vs_consenso: 'Superior' },
      { periodo: '3T26', ingresos: 28072, crecimiento_pct: 38.9, crecimiento_organico_pct: null, ebitda: 5253, margen_ebitda_pct: 18.7, bpa: 0.95, vs_consenso: 'Superior' },
    ],
    confianza: 'Media',
  },
  balance: {
    historico,
    vencimientos: [],
    liquidez: 'Deuda bruta de 34.390 M frente a caja de 11.767 M, activos financieros a valor razonable de 8.371 M y créditos financieros no operativos de 7.550 M (1.700 M son préstamos a Plenitude) a 30-sep-2026: deuda neta antes de arrendamientos de 6.702 M y reserva de liquidez de 37.000 M [3, 8].',
    rating: "S&P A- (perspectiva estable desde el 1-oct-2026); Moody's A3 (estable); Fitch A- (estable) [8, 13]",
    coste_deuda_pct: 3.8,
    vida_media_anios: null,
    confianza: 'Alta',
  },
  flujos: { historico: flujos, confianza: 'Alta' },
  calidad: { auditor: 'PricewaterhouseCoopers SpA', anios_auditor: 7, opinion: 'Favorable (también sobre el control interno, por la cotización en Nueva York)', confianza: 'Alta' },
  capital: {
    politica: null,
    adquisiciones: [
      { anio: '2024', objetivo: 'Neptune Energy (activos fuera de Noruega)', importe: null, ev_ebitda: null, financiacion: 'Caja', resultado: 'Integrada; Noruega pasó a Vår Energi [1].' },
      { anio: '2026', objetivo: 'Searah (JV con Petronas en Indonesia y Malasia)', importe: null, ev_ebitda: null, financiacion: 'Aportación de activos', resultado: 'Participación del 50 % registrada por 4.900 M y plusvalía de ≈2.000 M; aporta un trimestre completo en el 3T26 [3].' },
      { anio: '2026', objetivo: 'Plenitude: ampliación no proporcional con Ares (1.560 M; Eni suscribe el 30 %)', importe: 1560, ev_ebitda: null, financiacion: 'Ares aporta ≈1.100 M', resultado: 'Valor de empresa de 13.100 M y de las acciones antes de la ampliación de 10.800 M; Eni baja al 65 % y desconsolida [3, 8].' },
    ],
    confianza: 'Media',
  },
  fuentes: fA,
};

fs.writeFileSync(path.join(dir, 'A.json'), JSON.stringify(A, null, 2) + '\n', 'utf8');
console.log('Nota A escrita');
