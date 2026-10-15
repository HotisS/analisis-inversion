// Escribe las notas A-E de Halozyme (corte 2026-10-15) a partir del XBRL de la SEC (cuentas-xbrl.json),
// las notas de prensa de resultados (8-K 99.1), los 10-K 2025 y 2022, el 10-Q del 2T26, el proxy 2026, los 8-K de 2026,
// bolsa.mjs, form4.mjs, MarketScreener, Stock Analysis y foros. Cada nota cita solo con [n] de su propia lista.
// Ejecutar: node informes/halozyme-2026-10-15/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const X = JSON.parse(fs.readFileSync(path.join(dir, 'cuentas-xbrl.json'), 'utf8'));
const BOLSA = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const E8 = 'https://www.sec.gov/Archives/edgar/data/1159036';
const r1 = (v) => (v == null ? null : Math.round(v * 10) / 10);
const ANIOS = ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'];

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Form 10-K 2025 (cuentas auditadas; ingresos por tipo y por país; deterioro e I+D en curso adquirida; patentes; empleados)', editor: 'Halozyme Therapeutics / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-17', url: `${E8}/000115903626000024/halo-20251231.htm` },
  { id: 2, titulo: 'Hechos XBRL (companyfacts): cuenta, balance y flujos 2016-2025, valores negociables, amortización de intangibles, trimestres', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0001159036.json' },
  { id: 3, titulo: 'Halozyme Reports Record Second Quarter 2026 Results, Beats Estimates and Raises Full Year 2026 Financial Guidance (8-K, anexo 99.1)', editor: 'Halozyme Therapeutics / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-06', url: `${E8}/000115903626000103/ex991q220268-k.htm` },
  { id: 4, titulo: 'Form 10-Q del 2T26 (balance a 30-jun-2026, bonos convertibles, recompras, ingresos por tipo, cláusula de rebaja de regalías)', editor: 'Halozyme Therapeutics / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-06', url: `${E8}/000115903626000104/halo-20260630.htm` },
  { id: 5, titulo: 'Halozyme Reports First Quarter 2026 Results and Reiterates 2026 Financial Guidance (8-K, anexo 99.1)', editor: 'Halozyme Therapeutics / SEC EDGAR', tipo: 'Primaria', fecha: '2026-05-11', url: `${E8}/000115903626000067/ex991q120268-k.htm` },
  { id: 6, titulo: 'Halozyme Reports Full Year 2025 Record Revenue of $1.4 Billion (8-K, anexo 99.1; conciliación del EBITDA ajustado)', editor: 'Halozyme Therapeutics / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-17', url: `${E8}/000115903626000023/ex991q420258-k.htm` },
  { id: 7, titulo: 'Form 10-K 2022 (ingresos por tipo 2020-2022; compra de Antares)', editor: 'Halozyme Therapeutics / SEC EDGAR', tipo: 'Primaria', fecha: '2023-02-21', url: `${E8}/000115903623000012/halo-20221231.htm` },
  { id: 8, titulo: 'Pricing of Upsized Private Offering of $1.3 Billion of Convertible Senior Notes due 2033 (8-K, anexo 99.1)', editor: 'Halozyme Therapeutics / SEC EDGAR', tipo: 'Primaria', fecha: '2026-09-18', url: `${E8}/000115903626000126/ex-991xhaloxpricingpressre.htm` },
  { id: 9, titulo: 'Halozyme Raises 2025 Revenue Estimates, Raises 2026 and Multi-Year Financial Guidance; compra de Surf Bio (8-K, anexo 99.1)', editor: 'Halozyme Therapeutics / SEC EDGAR', tipo: 'Primaria', fecha: '2026-01-28', url: `${E8}/000115903626000011/ex991guidance2026pressrele.htm` },
  { id: 10, titulo: 'Halozyme Therapeutics Non-GAAP EPS of $2.28 beats by $0.46 (2T26) y Non-GAAP EPS of $1.60 beats by $0.08 (1T26)', editor: 'Seeking Alpha (noticias)', tipo: 'Prensa', fecha: '2026-08-06', url: 'https://seekingalpha.com/api/sa/combined/HALO.xml' },
];
const cx = Object.fromEntries(X.financieros.cuenta.map((r) => [r.periodo, r]));
const bx = Object.fromEntries(X.balance.historico.map((r) => [r.periodo, r]));
const fx = Object.fromEntries(X.flujos.historico.map((r) => [r.periodo, r]));
// Amortización de intangibles adquiridos (XBRL AmortizationOfIntangibleAssets): va aparte de DepreciationDepletionAndAmortization
const amortIntang = { 2018: 0, 2019: 0, 2020: 0, 2021: 0, 2022: 43.1, 2023: 73.8, 2024: 71.0, 2025: 76.7 };
// Valores negociables (XBRL AvailableForSale…): la caja del balance no los incluye
const valores = { 2018: 296.6, 2019: 301.1, 2020: 220.3, 2021: 622.2, 2022: 128.6, 2023: 217.6, 2024: 480.2, 2025: 9.0 };
// No recurrentes dentro del EBITDA de 2025 (conciliación del 4T25 y 10-K): I+D en curso de Surf Bio 284,9; deterioro 48,7;
// costes de la compra de Elektrofi 14,6; indemnizaciones y aceleración de pagos en acciones 24,6; otros 1,4
const noRec = { 2025: 374.2 };
// Compras: Antares 2022 (XBRL 999) y Elektrofi + Surf Bio 2025 (725,97 negocio + 287,77 I+D en curso, neto de caja)
const compras = { 2018: 0, 2019: 0, 2020: 0, 2021: 0, 2022: 999.0, 2023: 0, 2024: 0, 2025: 1013.7 };

const cuenta = ANIOS.map((y) => {
  const c = cx[y];
  const am = r1(c.amortizaciones + amortIntang[y]);
  return { periodo: y, ingresos: c.ingresos, coste_ventas: c.coste_ventas, gastos_generales: c.gastos_generales, ebitda: r1(c.ebit + am), amortizaciones: am, ebit: c.ebit, resultado_financiero: c.resultado_financiero, bai: c.bai, impuestos: c.impuestos, minoritarios: 0, beneficio_neto: c.beneficio_neto, gastos_financieros: c.gastos_financieros, participadas_en_ebitda: null, no_recurrentes_en_ebitda: noRec[y] ?? null, bpa: c.bpa, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: c.acciones_diluidas };
});
const historico = ANIOS.map((y) => {
  const b = bx[y];
  return { periodo: y, activo_total: b.activo_total, activo_corriente: b.activo_corriente, pasivo_corriente: b.pasivo_corriente, pasivo_total: b.pasivo_total, fondo_comercio: b.fondo_comercio ?? 0, intangibles: b.intangibles ?? 0, inmovilizado_material: b.inmovilizado_material, existencias: b.existencias, clientes: b.clientes, proveedores: b.proveedores, activos_contrato: null, pasivos_contrato: null, caja: r1(b.caja + valores[y]), deuda_financiera: b.deuda_financiera, arrendamientos: 0, patrimonio_neto: b.patrimonio_neto, minoritarios: 0, reservas: b.reservas };
});
const flujos = ANIOS.map((y) => {
  const f = fx[y];
  return { periodo: y, flujo_operativo: f.flujo_operativo, capex: f.capex, pagos_arrendamientos: 0, adquisiciones: compras[y], desinversiones: f.desinversiones ?? 0, dividendos: 0, recompras: f.recompras ?? 0, emision_acciones: f.emision_acciones ?? 0, intereses_en_financiacion: 0 };
});
const segHist = {
  Regalías: { 2020: 88.6, 2021: 203.9, 2022: 360.5, 2023: 447.9, 2024: 571.0, 2025: 867.8 },
  'Ventas de producto': { 2020: 56.0, 2021: 104.2, 2022: 191.0, 2023: 300.9, 2024: 303.5, 2025: 376.4 },
  'Acuerdos de colaboración': { 2020: 123.0, 2021: 135.2, 2022: 108.6, 2023: 80.5, 2024: 140.8, 2025: 152.3 },
};
const segDesc = {
  Regalías: 'Regalías (de media, un porcentaje de un dígito medio de las ventas del socio) de los diez productos aprobados con ENHANZE: DARZALEX SC (Janssen), Phesgo y otros cuatro de Roche, VYVGART Hytrulo (argenx), Opdivo Qvantig (BMS), RYBREVANT SC y HyQvia (Takeda) [1].',
  'Ventas de producto': 'rHuPH20 a granel que se vende a los socios, productos propios (XYOSTED y Hylenex) y autoinyectores fabricados para socios (Teva) [1].',
  'Acuerdos de colaboración': 'Pagos iniciales por licencia y nominación de dianas, hitos de desarrollo, regulatorios y de ventas, y licencias de dispositivos: muy irregulares [1].',
};

const A = {
  _estado: 'completa',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 1663.7, ebitda: 711.9, ebit: 597.2, beneficio_neto: 413.6, bpa: 3.41, dpa: 0, dpa_extraordinario: 0, fcf: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 374.2 },
    cambios_perimetro: [
      { periodo: '2022', descripcion: 'Antares Pharma, consolidada desde el 17-may-2022 (≈960 M USD): entran autoinyectores y XYOSTED; nace el fondo de comercio y la amortización de intangibles [7].' },
      { periodo: '2025', descripcion: 'Elektrofi (Hypercon), consolidada desde el 18-nov-2025, y Surf Bio (diciembre, tratada como compra de activos: 284,9 M de I+D en curso a gasto): el balance de 2025 las incluye y la cuenta casi no [1].' },
    ],
    comentario: null,
    ajustes: null,
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '3T24', ingresos: 290.1, crecimiento_pct: 34.3, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 1.05, vs_consenso: null },
      { periodo: '4T24', ingresos: 298.0, crecimiento_pct: 29.5, crecimiento_organico_pct: null, ebitda: 195.8, margen_ebitda_pct: 65.7, bpa: 1.06, vs_consenso: null },
      { periodo: '1T25', ingresos: 264.9, crecimiento_pct: 35.2, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.93, vs_consenso: null },
      { periodo: '2T25', ingresos: 325.7, crecimiento_pct: 40.8, crecimiento_organico_pct: null, ebitda: 222.9, margen_ebitda_pct: 68.4, bpa: 1.33, vs_consenso: null },
      { periodo: '3T25', ingresos: 354.3, crecimiento_pct: 22.1, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 1.43, vs_consenso: null },
      { periodo: '4T25', ingresos: 451.8, crecimiento_pct: 51.6, crecimiento_organico_pct: null, ebitda: -71.7, margen_ebitda_pct: -15.9, bpa: -1.2, vs_consenso: null },
      { periodo: '1T26', ingresos: 376.7, crecimiento_pct: 42.2, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 1.22, vs_consenso: 'Superior' },
      { periodo: '2T26', ingresos: 481.0, crecimiento_pct: 47.7, crecimiento_organico_pct: null, ebitda: 321.9, margen_ebitda_pct: 66.9, bpa: 1.9, vs_consenso: 'Superior' },
    ],
    ultima_presentacion: null,
    confianza: 'Media',
  },
  balance: {
    historico,
    vencimientos: [
      { anio: '2027', importe: 57.9 }, { anio: '2028', importe: 250.0 }, { anio: '2031', importe: 750.0 }, { anio: '2032', importe: 750.0 }, { anio: '2033', importe: 1300.0 },
    ],
    liquidez: 'Caja y valores negociables 231,9 M a 30-jun-2026 [3], más ≈460 M netos que quedaron de la emisión de septiembre (1.275 M netos menos 162,5 M de opciones de compra con techo y 652,5 M de recompra de bonos de 2027 y 2028) [8]; línea de crédito revolvente de 750 M sin disponer hasta noviembre de 2030 [4].',
    rating: 'Sin rating público de agencia (deuda en bonos convertibles privados 144A).',
    coste_deuda_pct: 0.9,
    vida_media_anios: 5.6,
    otros_pasivos: null,
    comentario: null,
    confianza: 'Alta',
  },
  flujos: { historico: flujos, comentario: null, confianza: 'Alta' },
  calidad: { auditor: 'Ernst & Young LLP', anios_auditor: 20, opinion: 'Favorable (sin salvedades) sobre las cuentas y el control interno de 2025', comentario: null, senales: null, confianza: 'Alta' },
  capital: {
    politica: null,
    adquisiciones: [
      { anio: '2022', objetivo: 'Antares Pharma (autoinyectores, XYOSTED, productos para Teva)', importe: 960, ev_ebitda: null, financiacion: 'Caja y bonos convertibles de 2028 (720 M)', resultado: 'Ventas de producto de 104 M (2021) a 376 M (2025) con XYOSTED creciendo; amortización de intangibles de ≈71-77 M al año y deterioro de un intangible de 48,7 M en 2025 [1, 7].' },
      { anio: '2025', objetivo: 'Elektrofi (tecnología Hypercon de hiperconcentración)', importe: 726, ev_ebitda: null, financiacion: 'Caja y bonos convertibles de 2031 y 2032', resultado: 'Sin ingresos todavía: cinco acuerdos firmados (Janssen, Lilly, argenx, Vertex, Oruka) con 17 dianas; primeras aprobaciones previstas en 2030-2031 [5].' },
      { anio: '2025', objetivo: 'Surf Bio (hiperconcentración con polímeros)', importe: 300, ev_ebitda: null, financiacion: 'Caja', resultado: 'Tratada como compra de activos: 284,9 M de I+D en curso llevados a gasto en el 4T25; hasta 100 M más en hitos [9].' },
    ],
    comentario: null,
    confianza: 'Alta',
  },
  negocio: {
    segmentos: Object.entries(segHist).map(([nombre, h]) => ({ nombre, descripcion: segDesc[nombre], tipo_resultado: null, historico: Object.entries(h).map(([periodo, ingresos]) => ({ periodo, ingresos, resultado: null })) })),
    geografias: [
      { nombre: 'Estados Unidos', peso_pct: 58.9 }, { nombre: 'Suiza', peso_pct: 19.8 }, { nombre: 'Bélgica', peso_pct: 15.6 }, { nombre: 'Japón', peso_pct: 3.3 }, { nombre: 'Otros', peso_pct: 2.4 },
    ],
    geografias_criterio: 'origen',
    kpis: [
      { kpi: 'Regalías (M USD)', valor_anterior: '571,0 (2024)', valor_actual: '867,8 (2025)', variacion: '+52 %', comentario: 'Guía 2026: 1.220-1.245 M (+41-43 %) [3, 1].' },
      { kpi: 'Productos aprobados con ENHANZE', valor_anterior: '9 (2024)', valor_actual: '10 (2025)', variacion: '+1', comentario: 'El décimo, RYBREVANT SC (Janssen); TAK-881 (Takeda) podría ser el undécimo [1, 5].' },
      { kpi: 'Productos de socios en desarrollo con ENHANZE', valor_anterior: '7 (dic-2025)', valor_actual: '9 (mar-2026)', variacion: '+2', comentario: 'Objetivo de 13 a final de 2026 [5].' },
      { kpi: 'Acuerdos nuevos de licencia en el año', valor_anterior: '3 (2025)', valor_actual: '5 (hasta jul-2026)', variacion: '+2', comentario: 'Vertex, Oruka, GSK, Incyte y uno no revelado; objetivo de 3 superado [3].' },
      { kpi: 'Recompras (M USD)', valor_anterior: '342,4 (2025)', valor_actual: '332,8 (solo 2T26)', variacion: 'n.a.', comentario: 'Programa de 1.000 M hasta 2028 y al menos 400 M en 2026 [3].' },
    ],
  },
  fuentes: fA,
  huecos: [
    { seccion: 'trimestres', campo: 'ebitda de 3T24, 1T25, 3T25 y 1T26', tipo: 'Complemento', intentos: '1) notas de prensa trimestrales (solo dan el EBITDA del trimestre en el 2T y el 4T descargados); 2) XBRL trimestral (la amortización viene acumulada en el estado de flujos); 3) derivarlo restando trimestres acumulados (no se hizo por falta de tiempo y de la amortización por trimestre)', decision: 'Omitido' },
  ],
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector, competencia, historia, ESG
const fB = [
  { id: 1, titulo: 'Form 10-K 2025: negocio, competencia, patentes de rHuPH20 (EE. UU. 2027, Europa 2029), MDASE (2032-2034), Hypercon (mediados de los 2040)', editor: 'Halozyme Therapeutics / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-17', url: `${E8}/000115903626000024/halo-20251231.htm` },
  { id: 2, titulo: 'Subcutaneous Biologic Market Size, Share and Forecast 2025-2034 (≈250.830 M USD en 2025; +11,7 % anual)', editor: 'Straits Research', tipo: 'Sectorial', fecha: '2025', url: 'https://straitsresearch.com/report/subcutaneous-biologic-market' },
  { id: 3, titulo: 'Subcutaneous Biologics Global Market Report (≈251.000 M USD en 2025; +5,5 % anual 2026-2034)', editor: 'The Report Cubes', tipo: 'Sectorial', fecha: '2025', url: 'https://www.thereportcubes.com/public/report-store/subcutaneous-biologics-global-market-report' },
  { id: 4, titulo: 'Halozyme Wins Injunction Stopping Manufacture and Sale of Merck\'s Keytruda SC in Multiple European Markets (tribunal de patentes de La Haya, EP622)', editor: 'Halozyme / PR Newswire (vía Webull)', tipo: 'Primaria', fecha: '2026-10-07', url: 'https://www.webull.com/news/15706964773454848' },
  { id: 5, titulo: 'Form 10-Q del 2T26 de Merck & Co.: revisiones posteriores a la concesión (PGR) contra las patentes MDASE y pleito de Nueva Jersey', editor: 'Merck & Co. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-05', url: 'https://www.sec.gov/Archives/edgar/data/0000310158/000031015826000212/mrk-20260630.htm' },
  { id: 6, titulo: 'MSD invalidates US Halozyme patent in SC pembrolizumab dispute (decisión final del PTAB)', editor: 'Pearce IP', tipo: 'Prensa', fecha: '2026-05-12', url: 'https://www.pearceip.law/2026/05/12/msd-invalidates-us-halozyme-patent-in-sc-pembrolizumab-dispute/' },
  { id: 7, titulo: 'Halozyme Reports Record Second Quarter 2026 Results (8-K, anexo 99.1)', editor: 'Halozyme Therapeutics / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-06', url: `${E8}/000115903626000103/ex991q220268-k.htm` },
  { id: 8, titulo: 'Form 10-K 2022 (compra de Antares; historia de la compañía)', editor: 'Halozyme Therapeutics / SEC EDGAR', tipo: 'Primaria', fecha: '2023-02-21', url: `${E8}/000115903623000012/halo-20221231.htm` },
  { id: 9, titulo: 'Halozyme Announces Issuance of New European Patent for ENHANZE (EP 4269578, vence en marzo de 2029)', editor: 'Halozyme Therapeutics', tipo: 'Primaria', fecha: '2024-06', url: 'https://ir.halozyme.com/news/news-details/2024/Halozyme-Announces-Issuance-of-New-European-Patent-for-ENHANZE-Drug-Delivery-Platform/default.aspx' },
  { id: 10, titulo: 'Halozyme ENHANZE Royalty Summary (marzo de 2025): duración de las regalías por producto y país', editor: 'Halozyme Therapeutics', tipo: 'Primaria', fecha: '2025-03', url: 'https://s28.q4cdn.com/284259014/files/doc_downloads/2026/Halozyme-ENHANZE-Royalty-Summary-March-2025.pdf' },
];
const B = {
  _estado: 'completa',
  historia: {
    resumen: null,
    hitos: [
      { anio: '1998', hito: 'Fundada en San Diego (como Deliatroph); desarrolla la hialuronidasa humana recombinante rHuPH20 [8].' },
      { anio: '2005', hito: 'La FDA aprueba Hylenex, su primer producto con rHuPH20 [8].' },
      { anio: '2006', hito: 'Primer acuerdo ENHANZE con Roche (Herceptin y MabThera subcutáneos, lanzados en Europa en 2013-2014) [8].' },
      { anio: '2014', hito: 'Helen Torley, nueva primera ejecutiva [8].' },
      { anio: '2019', hito: 'Abandona su oncológico propio (PEGPH20) tras fallar en fase 3 y se concentra en ENHANZE; reestructuración [8].' },
      { anio: '2020', hito: 'Aprobación de DARZALEX FASPRO (Janssen) en EE. UU. y en la UE: hoy su mayor fuente de regalías [1].' },
      { anio: '2022', hito: 'Compra Antares Pharma por ≈960 M USD: autoinyectores y XYOSTED [8].' },
      { anio: '2023', hito: 'Aprobación de VYVGART Hytrulo (argenx), segundo gran motor de regalías [1].' },
      { anio: '2025', hito: 'Compra Elektrofi (Hypercon) y Surf Bio: tecnologías de hiperconcentración con patentes hasta mediados de los 2040 [1].' },
      { anio: '2026', hito: 'Regalías por encima de 1.000 M USD en el año y sentencias en Alemania y La Haya contra el Keytruda SC de Merck por las patentes MDASE [4, 7].' },
    ],
    confianza: 'Alta',
  },
  negocio: { descripcion: null, como_gana_dinero: null, clientes: null },
  sector: {
    definicion: null,
    tamano: '≈250.000 M USD de ventas de biológicos subcutáneos en 2025, con dos estimaciones casi iguales (250.830 M [2] y 251.000 M [3]).',
    unidad_serie: 'millones de USD (ventas de biológicos subcutáneos)',
    serie: [ { anio: '2025', tamano: 251000 }, { anio: '2026e', tamano: 264800 }, { anio: '2027e', tamano: 279400 }, { anio: '2028e', tamano: 294700 }, { anio: '2030e', tamano: 328000 } ],
    tcac_historico_pct: null, tcac_previsto_pct: 5.5, cr5_pct: null, estructura: 'Moderadamente concentrada',
    drivers: [
      { driver: 'Paso de intravenoso a subcutáneo', efecto: '+', horizonte: 'Estructural', evidencia: 'DARZALEX SC supera ya a la versión intravenosa; la dosis SC se pone en 3-5 minutos frente a varias horas de infusión [1].' },
      { driver: 'Defensa de franquicias frente a biosimilares', efecto: '+', horizonte: 'Estructural', evidencia: 'La versión co-formulada con ENHANZE tiene exclusividad propia y alarga la vida del producto más allá de la patente del intravenoso [1].' },
      { driver: 'Caducidad de las patentes de rHuPH20', efecto: '−', horizonte: 'Estructural', evidencia: 'Patente de EE. UU. hasta 2027 y europeas hasta 2029: sin otra reivindicación válida, la regalía baja en ese país [1, 9].' },
      { driver: 'Competencia de otras hialuronidasas (Alteogen, MDASE en pleito)', efecto: '−', horizonte: 'Estructural', evidencia: 'Merck lanzó Keytruda SC con la enzima de Alteogen; Halozyme lo ha frenado en Alemania y en ocho países europeos, pero la PTAB ha anulado varias patentes MDASE en EE. UU. [4, 5, 6].' },
      { driver: 'Precios de los medicamentos en EE. UU. (IRA)', efecto: '−', horizonte: 'Cíclico', evidencia: 'La negociación de precios de Medicare puede bajar las ventas de los socios y con ellas las regalías [1].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Pocos rivales con enzima aprobada (Alteogen con ALT-B4) y otras vías (hiperconcentración, autoinyectores); la rivalidad crece desde que Merck eligió a Alteogen [4].' },
      { fuerza: 'Poder de los clientes', intensidad: 4, justificacion: 'Los clientes son grandes farmacéuticas (Janssen, Roche, argenx) y tres productos explican la mayor parte de las regalías [1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Fabricación de rHuPH20 externalizada pero con proceso propio de alto rendimiento [1].' },
      { fuerza: 'Amenaza de entrada', intensidad: 3, justificacion: 'Desarrollar y validar una enzima ante los reguladores lleva años, pero Alteogen ya lo ha hecho [4].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'Formulaciones hiperconcentradas sin enzima y autoinyectores de gran volumen; Halozyme compró dos de esas tecnologías (Hypercon y Surf Bio) para cubrirse [1].' },
    ],
    ciclo: { posicion: 'Expansión', comentario: null },
    regulacion: null,
    tendencias: null,
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 0.56,
    posicion: '1.ª tecnología de administración subcutánea con enzima por productos aprobados (10) y regalías; su cuota se mide como ingresos frente a las ventas de biológicos subcutáneos (≈0,56 %) [1, 3].',
    competidores: [
      { nombre: 'Alteogen', pais: 'Corea del Sur', ticker: '196170.KQ', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Hialuronidasa ALT-B4 licenciada a Merck (Keytruda SC), Daiichi y otros; el rival directo de ENHANZE [4].' },
      { nombre: 'Ypsomed', pais: 'Suiza', ticker: 'YPSN.SW', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Autoinyectores y bombas de parche: compite con el negocio de dispositivos de Antares.' },
      { nombre: 'Xeris Biopharma', pais: 'EE. UU.', ticker: 'XERS', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'XeriJect: formulaciones concentradas sin agua para inyección subcutánea.' },
      { nombre: 'Enable Injections', pais: 'EE. UU.', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Inyectores de gran volumen que se colocan en el cuerpo: alternativa sin enzima.' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'Cada aprobación facilita la siguiente (más de un millón de pacientes tratados, diez productos), pero no hay red propiamente dicha [7].' },
        { fuente: 'Costes de cambio', puntuacion: 4, evidencia: 'Un producto aprobado con ENHANZE no cambia de enzima sin nuevos ensayos: las regalías duran lo que la vida del producto o de la patente [1].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'rHuPH20 caduca en 2027-2029; MDASE (2032-2034) en litigio y con reivindicaciones anuladas en EE. UU.; Hypercon y Surf Bio hasta mediados de los 2040 [1, 6].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: '423 empleados para 1.397 M de ingresos y margen EBITDA ajustado previsto del ≈66 % en 2026 [1, 7].' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'Mercado de pocos licenciantes con expediente regulatorio aprobado (Halozyme y Alteogen) [4].' },
      ],
    },
    amenazas: null,
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: null,
    controversias: null,
    confianza: 'Baja',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) proxy 2026 e informe anual (no las publican); 2) web de inversores, sección de sostenibilidad (no da notas de agencias); 3) páginas públicas de MSCI y Sustainalytics (de pago o sin ficha legible)', decision: 'Omitido' },
    { seccion: 'competencia', campo: 'ingresos y márgenes de los competidores', tipo: 'Complemento', intentos: '1) cuentas de Alteogen (en coreano, KRW, no descargadas a tiempo); 2) Ypsomed y Xeris (negocios distintos, no comparables en margen); 3) Enable Injections no cotiza', decision: 'Omitido' },
    { seccion: 'sector', campo: 'cr5_pct', tipo: 'Complemento', intentos: '1) informes sectoriales de Straits y Report Cubes (resúmenes sin cuotas); 2) 10-K de Halozyme (no da cuota); 3) estimación por regalías (no fiable)', decision: 'Omitido' },
  ],
};
guarda('B', B);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Proxy statement (DEF 14A) 2026: consejo, comisiones, remuneración 2025, accionistas', editor: 'Halozyme Therapeutics / SEC EDGAR', tipo: 'Primaria', fecha: '2026-03-23', url: `${E8}/000115903626000041/halo-20260323.htm` },
  { id: 2, titulo: 'Form 8-K (5.07): resultados de la junta del 5-may-2026 (voto consultivo de remuneración: 84,7 M a favor, 9,3 M en contra)', editor: 'Halozyme Therapeutics / SEC EDGAR', tipo: 'Primaria', fecha: '2026-05-07', url: `${E8}/000115903626000057/halo-20260505.htm` },
  { id: 3, titulo: 'Form 8-K (5.02): David Ramsay, director financiero interino desde el 23-mar-2026', editor: 'Halozyme Therapeutics / SEC EDGAR', tipo: 'Primaria', fecha: '2026-03-12', url: `${E8}/000115903626000035/halo-20260312.htm` },
  { id: 4, titulo: 'Form 8-K (5.02): Darren Snellgrove, director financiero desde el 8-jun-2026 (antes CFO del sector farmacéutico de J&J)', editor: 'Halozyme Therapeutics / SEC EDGAR', tipo: 'Primaria', fecha: '2026-04-30', url: `${E8}/000115903626000053/halo-20260430.htm` },
  { id: 5, titulo: 'Form 8-K (5.02): salida de Cortney Caudill, directora de operaciones', editor: 'Halozyme Therapeutics / SEC EDGAR', tipo: 'Primaria', fecha: '2026-07-02', url: `${E8}/000115903626000088/halo-20260630.htm` },
  { id: 6, titulo: 'Form 8-K (5.02): Dannielle Appelhans, consejera (14-ago-2026)', editor: 'Halozyme Therapeutics / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-18', url: `${E8}/000115903626000106/halo-20260814.htm` },
  { id: 7, titulo: 'Form 8-K (5.02): James Daly, consejero (28-sep-2026)', editor: 'Halozyme Therapeutics / SEC EDGAR', tipo: 'Primaria', fecha: '2026-09-30', url: `${E8}/000115903626000128/halo-20260928.htm` },
  { id: 8, titulo: 'Form 4 presentados entre el 15-oct-2025 y el 15-oct-2026 (herramientas/form4.mjs): 0 compras, 48,4 M USD de ventas, 46,1 M con plan 10b5-1', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001159036&type=4' },
  { id: 9, titulo: 'Notas de prensa de resultados 2021-2026 (guías anuales y su cumplimiento)', editor: 'Halozyme Therapeutics / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-06', url: `${E8}/000115903626000103/ex991q220268-k.htm` },
];
const C = {
  _estado: 'completa',
  directivos: {
    equipo: [
      { nombre: 'Helen I. Torley', cargo: 'Presidenta y primera ejecutiva', desde: '2014', participacion_pct: 1.8, trayectoria: 'Médica; antes directora comercial de Onyx y directiva de Amgen. Con ella las regalías pasaron de 9 M (2014) a 868 M (2025) y la empresa dejó su oncológico propio en 2019 para centrarse en ENHANZE [1].' },
      { nombre: 'Darren Snellgrove', cargo: 'Director financiero', desde: '2026', participacion_pct: 0.0, trayectoria: 'Veinte años en J&J, último puesto CFO del sector farmacéutico (2021-2025); llega en junio de 2026 tras un interino de tres meses [3, 4].' },
      { nombre: 'Jeffrey W. Henderson', cargo: 'Presidente del consejo (independiente)', desde: '2015', participacion_pct: 0.05, trayectoria: 'Antiguo CFO de Cardinal Health; preside el consejo desde mayo de 2022 [1].' },
      { nombre: 'Mark Snyder', cargo: 'Vicepresidente ejecutivo, director jurídico y secretario', desde: '2022', participacion_pct: 0.17, trayectoria: 'Lleva los pleitos de patentes MDASE contra Merck en EE. UU. y Europa [1].' },
    ],
    historial_guidance: [
      { anio: '2023', guia: 'Ingresos 785-845 M (guía de inicio de año)', real: '829,3 M', cumplida: 'Sí' },
      { anio: '2024', guia: 'Ingresos 935-1.015 M (inicio de año)', real: '1.015,3 M', cumplida: 'Sí' },
      { anio: '2025', guia: 'Ingresos 1.150-1.225 M (inicio de año), subida varias veces', real: '1.396,6 M', cumplida: 'Sí' },
      { anio: '2026', guia: 'Ingresos 1.710-1.810 M (enero), 1.835-1.910 M (agosto)', real: '857,7 M en el primer semestre (+45 %)', cumplida: 'Parcial' },
    ],
    comentario: null,
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Jeffrey W. Henderson', cargo: 'Presidente', tipo: 'Independiente', desde: '2015', comisiones: 'Auditoría' },
      { nombre: 'Helen I. Torley', cargo: 'Consejera y primera ejecutiva', tipo: 'Ejecutivo', desde: '2014', comisiones: '—' },
      { nombre: 'Bernadette Connaughton', cargo: 'Consejera', tipo: 'Independiente', desde: '2018', comisiones: 'Remuneración (presidenta)' },
      { nombre: 'Matthew L. Posard', cargo: 'Consejero', tipo: 'Independiente', desde: '2013', comisiones: 'Nombramientos (presidente) y Auditoría' },
      { nombre: 'Barbara Duncan', cargo: 'Consejera', tipo: 'Independiente', desde: '2023', comisiones: 'Auditoría (presidenta) y Remuneración' },
      { nombre: 'Mahesh Krishnan', cargo: 'Consejero', tipo: 'Independiente', desde: '2024', comisiones: 'Nombramientos y Remuneración' },
      { nombre: 'James Lang', cargo: 'Consejero', tipo: 'Independiente', desde: '2025', comisiones: '—' },
      { nombre: 'Moni Miyashita', cargo: 'Consejera', tipo: 'Independiente', desde: null, comisiones: null },
      { nombre: 'Dannielle Appelhans', cargo: 'Consejera', tipo: 'Independiente', desde: '2026', comisiones: '—' },
      { nombre: 'James Daly', cargo: 'Consejero', tipo: 'Independiente', desde: '2026', comisiones: '—' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: true, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 89.8, voto_remuneracion_contra_pct: 9.9, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 23.17, fijo: 1.0, variable_corto: 1.15, variable_largo: 21.0, ratio_salario_medio: 100 },
    remuneracion: null,
    accionistas: [
      { nombre: 'Vanguard Group', pct: 11.2, tipo: 'Institucional (gestora pasiva)', variacion: '13G/A de febrero de 2024' },
      { nombre: 'BlackRock', pct: 10.6, tipo: 'Institucional (gestora)', variacion: '13G/A de julio de 2025' },
      { nombre: 'State Street', pct: 5.1, tipo: 'Institucional (gestora pasiva)', variacion: '13G de mayo de 2025' },
      { nombre: 'Consejeros y directivos (11 personas)', pct: 2.5, tipo: 'Directivos', variacion: 'Ventas netas de 48,4 M USD en 12 meses' },
    ],
    insiders: [
      { fecha: '2026-10-06', persona: 'Helen I. Torley (CEO)', operacion: 'Venta', acciones: 60000, importe: 6.61 },
      { fecha: '2026-09-15', persona: 'Helen I. Torley (CEO)', operacion: 'Venta', acciones: 60000, importe: 6.44 },
      { fecha: '2026-09-15', persona: 'Matthew L. Posard (consejero)', operacion: 'Venta', acciones: 18996, importe: 2.05 },
      { fecha: '2026-08-15', persona: 'Helen I. Torley (CEO)', operacion: 'Venta', acciones: 60000, importe: 6.28 },
      { fecha: '2026-03-15', persona: 'Cortney Caudill (COO)', operacion: 'Venta', acciones: 28857, importe: 1.96 },
      { fecha: '2025-11-15', persona: 'Helen I. Torley (CEO)', operacion: 'Venta', acciones: 60000, importe: 4.17 },
    ],
    control_y_defensas: null,
    alertas: [
      'Rotación del director financiero: Nicole LaBrosse sale en marzo de 2026, interino de tres meses (David Ramsay) y nuevo CFO desde junio (Darren Snellgrove, de J&J, cuyo grupo es el mayor pagador de regalías) [3, 4].',
      'Salida de la directora de operaciones (Cortney Caudill) en junio de 2026, nueve meses después de su nombramiento [5].',
      'Ventas continuas de la primera ejecutiva con plan 10b5-1: 42,1 M USD en 12 meses, unas 50.000-60.000 acciones al mes, sobre todo ejerciendo opciones antiguas [8].',
    ],
    confianza: 'Alta',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'fecha de entrada de Moni Miyashita y sus comisiones', tipo: 'Complemento', intentos: '1) proxy 2026, biografías (no localizada en el texto descargado); 2) 10-K 2025, parte III (remite al proxy); 3) 8-K de nombramientos de 2021-2025 (no revisados)', decision: 'Omitido' },
  ],
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de HALO, SPY e IBB (herramientas/bolsa.mjs) hasta el 14-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/HALO/history' },
  { id: 2, titulo: 'HALO: estimaciones anuales 2026-2028 (ventas, EBITDA, beneficio, BPA GAAP), objetivo medio 108,78 USD, 9 analistas', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://www.marketscreener.com/quote/stock/HALOZYME-THERAPEUTICS-INC-50245/finances/' },
  { id: 3, titulo: 'HALO: previsiones (9 analistas, objetivo medio 108,78, mínimo 78, máximo 130; BPA no GAAP 2026 8,84) y cambios de recomendación', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/halo/forecast/' },
  { id: 4, titulo: 'HALO: estadísticas (113,50 M de acciones, PER adelantado 12,2, posición corta 13,6 % del flotante, beta 0,88)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/halo/statistics/' },
  { id: 5, titulo: 'Royalty Pharma (RPRX): estadísticas', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/rprx/statistics/' },
  { id: 6, titulo: 'Incyte, United Therapeutics, Vertex, BioMarin, Jazz y Exelixis: estadísticas (tomadas del informe de Neurocrine con el mismo corte, notas/D.json)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/exel/statistics/' },
  { id: 7, titulo: '10-Year Treasury Constant Maturity Rate (DGS10): 5,21 % el 13-oct-2026', editor: 'FRED, Banco de la Reserva Federal de San Luis', tipo: 'Datos de mercado', fecha: '2026-10-13', url: 'https://fred.stlouisfed.org/series/DGS10' },
  { id: 8, titulo: 'Implied ERP by month (ERP T12m with sustainable payout, oct-2026: 4,20 %)', editor: 'A. Damodaran, NYU Stern', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 9, titulo: 'Form 10-K 2022 de Halozyme: compra de Antares Pharma (5,60 USD por acción, ≈960 M USD; ventas de Antares 2021 ≈184 M)', editor: 'Halozyme Therapeutics / SEC EDGAR', tipo: 'Primaria', fecha: '2023-02-21', url: `${E8}/000115903623000012/halo-20221231.htm` },
  { id: 10, titulo: 'Form 10-Q del 2T26 de Halozyme: compra de Elektrofi (28,80 USD por acción; 56,5 M a titulares de opciones; contraprestación contingente 23 M)', editor: 'Halozyme Therapeutics / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-06', url: `${E8}/000115903626000104/halo-20260630.htm` },
  { id: 11, titulo: 'Halozyme Raises 2026 and Multi-Year Financial Guidance; compra de Surf Bio (300 M + 100 M en hitos)', editor: 'Halozyme Therapeutics / SEC EDGAR', tipo: 'Primaria', fecha: '2026-01-28', url: `${E8}/000115903626000011/ex991guidance2026pressrele.htm` },
  { id: 12, titulo: 'Novo Holdings completes acquisition of Catalent (16.500 M USD de valor empresa)', editor: 'Catalent / Novo Holdings', tipo: 'Prensa', fecha: '2024-12-18', url: 'https://www.catalent.com/catalent-news/novo-holdings-completes-acquisition-of-catalent/' },
  { id: 13, titulo: 'Pricing of $1.3 Billion of Convertible Senior Notes due 2033 (cupón 1,50 %, conversión a 139,84 USD, techo de la cobertura 208,39 USD)', editor: 'Halozyme Therapeutics / SEC EDGAR', tipo: 'Primaria', fecha: '2026-09-18', url: `${E8}/000115903626000126/ex-991xhaloxpricingpressre.htm` },
  { id: 14, titulo: 'Halozyme Reports Record Second Quarter 2026 Results (guía 2026)', editor: 'Halozyme Therapeutics / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-06', url: `${E8}/000115903626000103/ex991q220268-k.htm` },
  { id: 15, titulo: 'Halozyme Wins Injunction Stopping Manufacture and Sale of Merck\'s Keytruda SC in Multiple European Markets', editor: 'Halozyme / PR Newswire (vía Webull)', tipo: 'Primaria', fecha: '2026-10-07', url: 'https://www.webull.com/news/15706964773454848' },
  { id: 16, titulo: 'Halozyme Surge: What the 20% Jump Really Means for Investors (reacción a los resultados del 2T26)', editor: 'AInvest', tipo: 'Prensa', fecha: '2026-08-11', url: 'https://www.ainvest.com/news/halozyme-surge-20-jump-means-investors-2608/' },
  { id: 17, titulo: 'Movimiento del precio (herramientas/movimiento.mjs HALO): 1, 3, 6 y 12 meses, máximos, media de 200 sesiones', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/quote/HALO/history' },
];
const cierres = Object.fromEntries(BOLSA.cierres_ejercicio.map((c) => [c.anio, c.precio_cierre]));
const D = {
  _estado: 'completa',
  identificacion: {
    nombre: 'Halozyme Therapeutics, Inc.', nombre_corto: 'Halozyme', ticker: 'HALO', isin: 'US40637H1095', mercado: 'Nasdaq Global Select', indice_referencia: 'S&P 500 (SPY); sector: Nasdaq Biotechnology (IBB)',
    pais: 'Estados Unidos', pais_iso: 'US', sector: 'Salud', industria: 'Biotecnología', sede: 'San Diego (California)', fundacion: '1998', empleados: 423, web: 'www.halozyme.com',
    precio: BOLSA.identificacion.precio, fecha_precio: BOLSA.identificacion.fecha_precio, acciones: 118.4, capitalizacion_publicada: 13760, free_float_pct: 98.8,
    max_52s: BOLSA.identificacion.max_52s, min_52s: BOLSA.identificacion.min_52s, volumen_medio_diario: '≈ 230 M USD/día (3 meses)', proximos_resultados: '2026-11-05',
  },
  consenso: {
    guidance: null,
    estimaciones: [
      { periodo: '2026e', ingresos: 1881, ebitda: 1233, ebit: 1129, bpa: 7.3, dpa: 0, fuente: 'MarketScreener (BPA GAAP) [2]' },
      { periodo: '2027e', ingresos: 2100, ebitda: 1442, ebit: 1381, bpa: 8.9, dpa: 0, fuente: 'MarketScreener [2]' },
      { periodo: '2028e', ingresos: 2339, ebitda: 1516, ebit: 1570, bpa: 10.15, dpa: 0, fuente: 'MarketScreener [2]' },
    ],
    recomendaciones: { n_analistas: 9, comprar: null, mantener: null, vender: null, po_medio: 108.78, po_min: 78, po_max: 130 },
    revisiones: null,
    base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: 1.6,
    confianza: 'Media',
  },
  bolsa: {
    ...BOLSA.bolsa,
    posicion_corta_pct: 13.6,
    comentario: null,
    contexto: null,
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: ANIOS.map((y) => ({ anio: y, precio_cierre: cierres[y], ev_ebitda_ntm: null, per_ntm: null, excluir: y === '2018' || y === '2019' || y === '2021' || y === '2025' })),
    comentario: null,
    confianza: 'Media',
  },
  comparables: {
    criterio: null,
    empresas: [
      { nombre: 'Royalty Pharma', ticker: 'RPRX', pais: 'US', capitalizacion: 34530, ev_ventas: 16.58, ev_ebitda_ltm: 27.0, ev_ebitda_ntm: null, per_ntm: 10.9, crecimiento_pct: null, margen_ebitda_pct: 61.4, roic_pct: 5.4, dn_ebitda: 5.2, fcf_yield_pct: 8.8 },
      { nombre: 'Incyte', ticker: 'INCY', pais: 'US', capitalizacion: 22610, ev_ventas: 3.11, ev_ebitda_ltm: 9.3, ev_ebitda_ntm: null, per_ntm: null, crecimiento_pct: 8.5, margen_ebitda_pct: 33.4, roic_pct: null, dn_ebitda: -2.3, fcf_yield_pct: 8.5 },
      { nombre: 'United Therapeutics', ticker: 'UTHR', pais: 'US', capitalizacion: 23160, ev_ventas: 6.14, ev_ebitda_ltm: 12.9, ev_ebitda_ntm: null, per_ntm: 20.3, crecimiento_pct: null, margen_ebitda_pct: 47.4, roic_pct: 31.3, dn_ebitda: -2.5, fcf_yield_pct: 4.7 },
      { nombre: 'Vertex', ticker: 'VRTX', pais: 'US', capitalizacion: 126350, ev_ventas: 9.11, ev_ebitda_ltm: 22.5, ev_ebitda_ntm: null, per_ntm: 34.4, crecimiento_pct: null, margen_ebitda_pct: 40.5, roic_pct: 28.8, dn_ebitda: -2.3, fcf_yield_pct: 3.0 },
      { nombre: 'BioMarin', ticker: 'BMRN', pais: 'US', capitalizacion: 10670, ev_ventas: 4.11, ev_ebitda_ltm: 21.7, ev_ebitda_ntm: null, per_ntm: 9.6, crecimiento_pct: null, margen_ebitda_pct: 18.9, roic_pct: 3.2, dn_ebitda: 5.2, fcf_yield_pct: 6.9 },
      { nombre: 'Jazz Pharmaceuticals', ticker: 'JAZZ', pais: 'IE', capitalizacion: 13610, ev_ventas: 3.44, ev_ebitda_ltm: 8.2, ev_ebitda_ntm: null, per_ntm: 9.6, crecimiento_pct: null, margen_ebitda_pct: 41.9, roic_pct: 17.2, dn_ebitda: 1.1, fcf_yield_pct: 11.7 },
      { nombre: 'Exelixis', ticker: 'EXEL', pais: 'US', capitalizacion: 15110, ev_ventas: 5.7, ev_ebitda_ltm: 13.6, ev_ebitda_ntm: null, per_ntm: 17.4, crecimiento_pct: null, margen_ebitda_pct: 41.9, roic_pct: null, dn_ebitda: -1.2, fcf_yield_pct: 7.8 },
    ],
    comentario: null,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2022-05', objetivo: 'Antares Pharma (autoinyectores)', comprador: 'Halozyme', ev: 960, ev_ventas: 5.22, ev_ebitda: null, prima_pct: 50.0, excluir: false, comentario: '5,60 USD por acción; ventas de 2021 ≈184 M [9].' },
      { fecha: '2024-12', objetivo: 'Catalent (formulación y fabricación por contrato)', comprador: 'Novo Holdings', ev: 16500, ev_ventas: 3.77, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Ventas del ejercicio 2024 ≈4.380 M; negocio de servicios, no de regalías [12].' },
      { fecha: '2025-11', objetivo: 'Elektrofi (Hypercon)', comprador: 'Halozyme', ev: 726, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Sin ingresos: se paga la tecnología (pago neto de caja) [10].' },
      { fecha: '2025-12', objetivo: 'Surf Bio', comprador: 'Halozyme', ev: 300, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '300 M iniciales más hasta 100 M en hitos; sin ingresos [11].' },
    ],
    comentario: null,
    confianza: 'Baja',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'transacciones', campo: 'tercera operación con múltiplo publicado', tipo: 'Complemento', intentos: '1) compras del sector de administración de fármacos (Elektrofi, Surf Bio: sin ingresos); 2) oferta de Halozyme por Evotec en 2024 (retirada, no se cerró); 3) compras de regalías de Royalty Pharma (son flujos, no empresas)', decision: 'Omitido' },
    { seccion: 'consenso', campo: 'reparto de recomendaciones', tipo: 'Complemento', intentos: '1) MarketScreener (solo «Comprar» de media); 2) Stock Analysis (consenso «Buy», sin reparto abierto); 3) cambios recientes: H.C. Wainwright, TD Cowen, Leerink y Morgan Stanley en Comprar, J.P. Morgan en Neutral', decision: 'Omitido' },
  ],
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Seeking Alpha, titulares y artículos de HALO (jul-oct 2026): «Running Through 2027», «The Market May Be Underpricing The Second Growth Wave», «Royalty King»', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10', url: 'https://seekingalpha.com/api/sa/combined/HALO.xml' },
  { id: 2, titulo: 'Stocktwits, flujo de mensajes de $HALO (30 mensajes del 13 al 15-oct-2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10', url: 'https://api.stocktwits.com/api/2/streams/symbol/HALO.json' },
  { id: 3, titulo: 'AInvest: «HALO\'s 48% Q2 Jump Looks Real—But Can the Beat-and-Raise Hold Through 2026?» y «Halozyme hit record high: factor stack explains»', editor: 'AInvest', tipo: 'Foros y redes', fecha: '2026-08', url: 'https://www.ainvest.com/news/halo-48-q2-jump-real-beat-raise-hold-2026-2608/' },
  { id: 4, titulo: 'Pluang: «Halozyme, modelo de negocio único»', editor: 'Pluang', tipo: 'Foros y redes', fecha: '2026-08', url: 'https://pluang.com/en/news-feed/halozyme-model-bisnis-unik-tambah-elemen-penguat-portofolio-biotech' },
];
const E = {
  _estado: 'completa',
  sentimiento: {
    tono: 'Positivo', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Seeking Alpha (artículos de autores y noticias)', fecha: '2026-10', n_comentarios: 25, tono: 'Positivo', resumen: 'Predominan las tesis alcistas («segunda ola de crecimiento», «rey de las regalías»); una pieza pone fecha al riesgo: «corre hasta 2027», por la caducidad de la patente de EE. UU. [1].' },
      { plataforma: 'Stocktwits ($HALO)', fecha: '2026-10', n_comentarios: 30, tono: 'Positivo', resumen: 'Euforia de corto plazo: mensajes de «máximo histórico», subidas de objetivo de TD Cowen y H.C. Wainwright y compras por análisis técnico; casi nadie habla de la deuda convertible ni del litigio [2].' },
      { plataforma: 'AInvest (análisis y comentarios)', fecha: '2026-08', n_comentarios: 10, tono: 'Dividido', resumen: 'Reconocen la calidad del resultado del 2T26, pero avisan de sobrecompra (RSI de 85,8 tras subir ≈20 % en una sesión) y de que el impulso solo no sostiene más subida [3].' },
      { plataforma: 'Pluang (prensa para particulares)', fecha: '2026-08', n_comentarios: 5, tono: 'Positivo', resumen: 'Presenta a Halozyme como «complemento» de una cartera biotecnológica por su modelo de regalías sin riesgo de ensayos [4].' },
    ],
    temas: [
      { tema: 'Modelo de regalías y subida de guía', postura: 'Alcista', peso: 'Alto', contraste: 'Los datos lo respaldan: regalías +50 % en el 2T26 y guía 2026 subida dos veces.' },
      { tema: 'Patentes de 2027-2029 y abismo de regalías', postura: 'Dividida', peso: 'Medio', contraste: 'Riesgo real y fechado: la regalía baja en cada país al caducar rHuPH20 si no hay otra patente; el informe lo recoge en la proyección de 2029-2033.' },
      { tema: 'Pleito con Merck por Keytruda SC', postura: 'Alcista', peso: 'Medio', contraste: 'Las sentencias europeas favorecen a Halozyme, pero en EE. UU. la PTAB ha anulado patentes MDASE: el valor de un acuerdo es incierto y no está en nuestra proyección.' },
      { tema: 'Precio en máximos y sobrecompra', postura: 'Dividida', peso: 'Medio', contraste: 'Cierto: +82 % en seis meses y a 0 % del máximo de 52 semanas; con 13,6 % del flotante en corto (cobertura de convertibles).' },
    ],
    lectura: null,
    confianza: 'Media',
  },
  fuentes: fE,
  huecos: [],
};
guarda('E', E);
console.log('Notas A-E escritas en', dir);
