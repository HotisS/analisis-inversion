// Escribe las notas A-E de Cheniere Energy (corte 2026-10-15) a partir del XBRL de la SEC (cuentas-xbrl.json),
// las notas de resultados (8-K 99.1) del 3T25 al 2T26, el 10-K 2025, el 10-Q del 2T26, el proxy de 2026, bolsa.mjs,
// form4.mjs, Stock Analysis y prensa. Cada nota cita solo con [n] de su propia lista. Ejecutar: node notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const X = JSON.parse(fs.readFileSync(path.join(dir, 'cuentas-xbrl.json'), 'utf8'));
const BOLSA = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const E8 = 'https://www.sec.gov/Archives/edgar/data/3570';
const ANIOS = ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'];

// Variación de valor razonable de derivados antes de la entrega (sobre todo los contratos IPM a largo plazo): no es caja
// y la empresa la excluye de su EBITDA ajustado. Ganancia = positivo. 2024-2025 de las notas de resultados; 2018-2023,
// concepto XBRL DerivativeInstrumentsNotDesignatedAsHedgingInstrumentsGainLossNet (cuadra con el EBITDA ajustado ±6 %).
const deriv = { 2018: -51, 2019: 400, 2020: -211, 2021: -5989, 2022: -6531, 2023: 7890, 2024: 1313, 2025: 3615 };
const dpa = { 2018: 0, 2019: 0, 2020: 0, 2021: 0.33, 2022: 1.385, 2023: 1.62, 2024: 1.81, 2025: 2.055 };

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Form 10-K 2025 (cuentas auditadas, contratos SPA e IPM, ingresos por país, empleados, rating)', editor: 'Cheniere Energy, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-26', url: `${E8}/000000357026000005/lng-20251231.htm` },
  { id: 2, titulo: 'Hechos XBRL (companyfacts): cuenta, balance y flujos 2016-2025; ganancias y pérdidas de derivados no designados', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0000003570.json' },
  { id: 3, titulo: 'Cheniere Reports Second Quarter 2026 Results and Raises Full Year 2026 Financial Guidance (8-K, anexo 99.1)', editor: 'Cheniere Energy, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-06', url: `${E8}/000000357026000030/cei20262ndqtrerex991.htm` },
  { id: 4, titulo: 'Form 10-Q del 2T26 (balance a 30-jun-2026, deuda por emisor, arrendamientos, flujos del semestre, 206,5 M de acciones a 31-jul)', editor: 'Cheniere Energy, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-06', url: `${E8}/000000357026000028/lng-20260630.htm` },
  { id: 5, titulo: 'Cheniere Reports First Quarter 2026 Results (8-K, anexo 99.1; beneficio neto ajustado del 1T26)', editor: 'Cheniere Energy, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-05-07', url: `${E8}/000000357026000016/cei20261stqtrerex991.htm` },
  { id: 6, titulo: 'Cheniere Reports Fourth Quarter and Full Year 2025 Results, Introduces Full Year 2026 Financial Guidance (8-K, anexo 99.1)', editor: 'Cheniere Energy, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-26', url: `${E8}/000000357026000006/cei20254thqtrerex991.htm` },
  { id: 7, titulo: 'Cheniere Reports Third Quarter 2025 Results (8-K, anexo 99.1)', editor: 'Cheniere Energy, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2025-10-30', url: `${E8}/000000357025000109/cei20253rdqtrerex991.htm` },
];
const cx = Object.fromEntries(X.financieros.cuenta.map((r) => [r.periodo, r]));
const bx = Object.fromEntries(X.balance.historico.map((r) => [r.periodo, r]));
const fx = Object.fromEntries(X.flujos.historico.map((r) => [r.periodo, r]));
const cuenta = ANIOS.map((y) => {
  const c = cx[y];
  return { periodo: y, ingresos: c.ingresos, coste_ventas: c.coste_ventas ?? null, gastos_generales: c.gastos_generales, ebitda: c.ebitda, amortizaciones: c.amortizaciones, ebit: c.ebit, resultado_financiero: c.resultado_financiero, bai: c.bai, impuestos: c.impuestos, minoritarios: c.minoritarios, beneficio_neto: c.beneficio_neto, gastos_financieros: c.gastos_financieros, participadas_en_ebitda: null, no_recurrentes_en_ebitda: -deriv[y], bpa: c.bpa, dpa: dpa[y], dpa_extraordinario: 0, acciones_diluidas: c.acciones_diluidas };
});
const historico = ANIOS.map((y) => {
  const b = bx[y];
  return { periodo: y, activo_total: b.activo_total, activo_corriente: b.activo_corriente, pasivo_corriente: b.pasivo_corriente, pasivo_total: b.pasivo_total, fondo_comercio: b.fondo_comercio, intangibles: null, inmovilizado_material: b.inmovilizado_material, existencias: b.existencias, clientes: b.clientes ?? (y === '2023' ? 1105 : null), proveedores: b.proveedores, activos_contrato: null, pasivos_contrato: null, caja: b.caja, deuda_financiera: b.deuda_financiera, arrendamientos: y === '2025' ? 931 : null, patrimonio_neto: b.patrimonio_neto, minoritarios: b.minoritarios, reservas: b.reservas };
});
const flujos = ANIOS.map((y) => {
  const f = fx[y];
  return { periodo: y, flujo_operativo: f.flujo_operativo, capex: f.capex, pagos_arrendamientos: f.pagos_arrendamientos ?? 0, adquisiciones: 0, desinversiones: 0, dividendos: f.dividendos ?? 0, recompras: f.recompras ?? 0, emision_acciones: 0, intereses_en_financiacion: 0 };
});
const A = {
  _estado: 'Completo. Cuentas 2018-2025 del XBRL de la SEC comprobadas con el 10-K 2025 y las notas de resultados; LTM a junio de 2026 con el 10-Q y la nota del 2T26. Los derivados de los contratos IPM van como no recurrentes.',
  negocio: {
    segmentos: [
      { nombre: 'Licuefacción y venta de GNL (un solo segmento)', descripcion: 'Sabine Pass (vía Cheniere Partners, CQP: >30 Mtpa) y Corpus Christi (>24 Mtpa con los trenes medianos 1-6 de la Etapa 3); comercialización propia (Cheniere Marketing)', tipo_resultado: 'EBITDA ajustado', historico: [{ periodo: '2024', ingresos: 15703, resultado: 6155 }, { periodo: '2025', ingresos: 19976, resultado: 6943 }] },
    ],
    geografias: [{ nombre: 'Estados Unidos (sede del comprador)', peso_pct: 18.8 }, { nombre: 'Singapur', peso_pct: 10.8 }, { nombre: 'Reino Unido', peso_pct: 8.4 }, { nombre: 'Resto del mundo', peso_pct: 62.0 }],
    geografias_criterio: 'sede del comprador (no destino del cargamento)',
    kpis: [
      { kpi: 'GNL exportado (TBtu)', valor_anterior: '1.159 (1S25)', valor_actual: '1.360 (1S26)', variacion: '+17 %', comentario: '371 cargamentos en el 1S26 frente a 322; 2.424 TBtu y 670 cargamentos en todo 2025 [3, 6].' },
      { kpi: 'Producción prevista del año', valor_anterior: '52-54 Mt (feb-26)', valor_actual: '53-54 Mt (ago-26)', variacion: 'Sube el mínimo', comentario: 'Con los trenes medianos 5 y 6 de Corpus Christi Etapa 3 ya en servicio y el 7 en puesta en marcha [3].' },
      { kpi: 'Capacidad en operación', valor_anterior: '≈52 Mtpa (feb-26)', valor_actual: '≈55 Mtpa (ago-26)', variacion: '+3 Mtpa', comentario: 'Más de 6 Mtpa en construcción (tren 7 de la Etapa 3 y trenes 8-9) y más de 40 Mtpa en tramitación [3, 6].' },
      { kpi: 'Producción contratada a largo plazo', valor_anterior: '≈95 % (2024)', valor_actual: '≈90 % hasta mediados de la década de 2030', variacion: null, comentario: 'SPA e IPM con una vida media restante de unos 15 años a 31-dic-2025 [1].' },
      { kpi: 'EBITDA ajustado del semestre', valor_anterior: '3.288 M USD (1S25)', valor_actual: '4.137 M USD (1S26)', variacion: '+26 %', comentario: 'Más volumen y más margen por MMBtu en los volúmenes no contratados, por el cierre de Ormuz [3].' },
    ],
    confianza: 'Alta',
  },
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 21491, ebitda: 7864, ebit: 6423, beneficio_neto: 2917, bpa: 13.8, dpa: 2.165, dpa_extraordinario: 0, fcf: 2791, participadas_en_ebitda: null, no_recurrentes_en_ebitda: -189 },
    cambios_perimetro: [],
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '4T24', ingresos: 4436, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 1577, margen_ebitda_pct: 35.6, bpa: null, vs_consenso: null },
      { periodo: '1T25', ingresos: 5444, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 1872, margen_ebitda_pct: 34.4, bpa: 3.54, vs_consenso: null },
      { periodo: '2T25', ingresos: 4641, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 1416, margen_ebitda_pct: 30.5, bpa: 2.24, vs_consenso: null },
      { periodo: '3T25', ingresos: 4441, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 1608, margen_ebitda_pct: 36.2, bpa: null, vs_consenso: null },
      { periodo: '4T25', ingresos: 5450, crecimiento_pct: 22.9, crecimiento_organico_pct: null, ebitda: 2047, margen_ebitda_pct: 37.6, bpa: null, vs_consenso: null },
      { periodo: '1T26', ingresos: 5868, crecimiento_pct: 7.8, crecimiento_organico_pct: null, ebitda: 2333, margen_ebitda_pct: 39.8, bpa: 4.77, vs_consenso: 'Superior' },
      { periodo: '2T26', ingresos: 5732, crecimiento_pct: 23.5, crecimiento_organico_pct: null, ebitda: 1804, margen_ebitda_pct: 31.5, bpa: 3.02, vs_consenso: 'Inferior' },
    ],
    confianza: 'Alta',
  },
  balance: {
    historico,
    vencimientos: [],
    liquidez: 'Caja 1.099 M USD (443 M en Cheniere Partners) y 420 M de caja restringida a 30-jun-2026; 5.956 M de líneas de crédito sin disponer: liquidez total de 7.475 M [3].',
    rating: 'BBB+ (S&P, estable; subido en noviembre de 2025) para Cheniere y CQP; CCH BBB+ con perspectiva positiva',
    coste_deuda_pct: 4.5, vida_media_anios: null,
    confianza: 'Alta',
  },
  flujos: { historico: flujos, confianza: 'Alta' },
  calidad: { auditor: 'KPMG LLP', anios_auditor: null, opinion: 'Favorable (cuentas y control interno a 31-dic-2025)', confianza: 'Alta' },
  fuentes: fA,
  huecos: [
    { seccion: 'trimestres', campo: 'BPA ajustado de 4T24, 3T25 y 4T25', tipo: 'Complemento', intentos: '1) Notas de resultados (el beneficio neto ajustado solo se publica desde el 1T26, con el 1T25 y el 2T25 como comparación); 2) XBRL trimestral (solo GAAP); 3) prensa (BPA de bases mezcladas)', decision: 'Omitido' },
    { seccion: 'calidad', campo: 'años con el mismo auditor', tipo: 'Complemento', intentos: '1) 10-K 2025 (informe de KPMG sin año de inicio); 2) proxy 2026 (ratificación); 3) búsqueda no hecha por tiempo', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Form 10-K 2025: Business, Market Factors and Competition (previsión de WoodMac: demanda de 410 Mtpa en 2024 y 671 Mtpa en 2040)', editor: 'Cheniere Energy, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-26', url: `${E8}/000000357026000005/lng-20251231.htm` },
  { id: 2, titulo: 'Qatar shuts Ras Laffan LNG plant after Iranian drone strike', editor: 'World Oil (Bloomberg)', tipo: 'Prensa', fecha: '2026-03-02', url: 'https://worldoil.com/news/2026/3/2/qatar-shuts-ras-laffan-lng-plant-after-iranian-drone-strike/' },
  { id: 3, titulo: 'Qatar extends LNG force majeure as Hormuz disruption threatens winter supply', editor: 'The National', tipo: 'Prensa', fecha: '2026-09-28', url: 'https://thenationalnews.com/business/energy/2026/09/28/qatar-extends-lng-force-majeure-as-hormuz-disruption-threatens-winter-supply' },
  { id: 4, titulo: 'Down 23%, the Iran War Makes This Energy Stock One to Watch (EE. UU. ≈60-64 % del GNL importado por Europa)', editor: '24/7 Wall St.', tipo: 'Prensa', fecha: '2026-06-23', url: 'https://247wallst.com/investing/2026/06/23/down-23-the-iran-war-makes-this-energy-stock-one-to-watch/' },
  { id: 5, titulo: 'Venture Global: estadísticas (ingresos LTM 16.950 M USD, EBITDA 7.350 M)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/vg/statistics/' },
  { id: 6, titulo: 'Woodside Energy: estadísticas (ingresos LTM 13.840 M USD, EBITDA 7.990 M)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/wds/statistics/' },
  { id: 7, titulo: 'Cheniere Reports Second Quarter 2026 Results (proyectos, FERC, Bechtel para la ampliación de Sabine Pass)', editor: 'Cheniere Energy, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-06', url: `${E8}/000000357026000030/cei20262ndqtrerex991.htm` },
  { id: 8, titulo: 'Qatar pauses LNG output revival after tanker attack near Hormuz', editor: 'The Express Tribune (Bloomberg)', tipo: 'Prensa', fecha: '2026-07-09', url: 'https://tribune.com.pk/story/2617348/qatar-pauses-lng-output-revival-after-tanker-attack-near-hormuz-report' },
];
const B = {
  _estado: 'Completo con fuentes públicas: tamaño del mercado en volumen (WoodMac vía 10-K); la crisis de Ormuz de 2026 con prensa.',
  historia: {
    hitos: [
      { anio: '1996', hito: 'Fundación en Houston; en los 2000 construye Sabine Pass como terminal de importación de GNL [1].' },
      { anio: '2012', hito: 'Decisión de inversión del primer tren de licuefacción de Sabine Pass, con el gas de esquisto como materia prima: la importadora pasa a exportadora [1].' },
      { anio: '2016', hito: 'Primer cargamento exportado desde Sabine Pass (24-feb); Jack Fusco, consejero delegado desde mayo [1].' },
      { anio: '2018-2021', hito: 'Corpus Christi (tres trenes) entra en servicio; Sabine Pass llega a seis trenes y más de 30 Mtpa [1].' },
      { anio: '2022', hito: 'La invasión de Ucrania dispara el precio internacional del gas: EBITDA ajustado de ≈11.600 M USD; decisión de inversión de la Etapa 3 de Corpus Christi (siete trenes medianos) y plan de capital «20/20 Vision» [1].' },
      { anio: '2025', hito: 'Primeros cuatro trenes de la Etapa 3; decisión de inversión de los trenes 8-9; S&P sube el rating a BBB+ [1].' },
      { anio: '2026', hito: 'Ataque iraní a Ras Laffan (Catar) y cierre del estrecho de Ormuz en marzo: el GNL de EE. UU. pasa a ser ≈60 % del que importa Europa; Cheniere sube dos veces su guía [2, 4, 7].' },
    ],
    confianza: 'Media',
  },
  negocio: { confianza: 'Alta' },
  sector: {
    tamano: '≈410 Mtpa de demanda mundial de GNL en 2024 y 671 Mtpa en 2040 (WoodMac, 3T25) [1]; en valor, ≈180.000 M USD a 2025 al precio medio de Cheniere',
    unidad_serie: 'millones de toneladas al año (Mtpa)',
    serie: [{ anio: '2024', tamano: 410 }, { anio: '2030e', tamano: 505 }, { anio: '2035e', tamano: 590 }, { anio: '2040e', tamano: 671 }],
    tcac_historico_pct: null, tcac_previsto_pct: 3.1,
    cr5_pct: null, estructura: 'Oligopolio',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 11.0,
    competidores: [
      { nombre: 'QatarEnergy', pais: 'Catar', ticker: null, ingresos: null, cuota_pct: 19.0, margen_ebit_pct: null, comentario: 'El mayor exportador (≈77 Mtpa); Ras Laffan dañado en marzo de 2026 y en fuerza mayor hasta noviembre; dos trenes pueden tardar tres años en repararse [2, 3].' },
      { nombre: 'Venture Global', pais: 'EE. UU.', ticker: 'VG', ingresos: 16950, cuota_pct: null, margen_ebit_pct: null, comentario: 'Segundo exportador de EE. UU. (Calcasieu Pass, Plaquemines); más peso de la venta al contado: cayó un 42 % desde marzo frente al 23 % de Cheniere [5, 4].' },
      { nombre: 'Woodside Energy', pais: 'Australia', ticker: 'WDS', ingresos: 13840, cuota_pct: null, margen_ebit_pct: null, comentario: 'GNL australiano y Louisiana LNG en construcción [6].' },
      { nombre: 'Shell, TotalEnergies, ExxonMobil (carteras de GNL)', pais: 'Varios', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Integradas que compran y venden GNL de varios orígenes; Golden Pass (Exxon y QatarEnergy) arranca en EE. UU.' },
      { nombre: 'NextDecade, Sempra (Port Arthur), Energy Transfer (Lake Charles)', pais: 'EE. UU.', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Proyectos de la segunda ola estadounidense que compiten por los mismos contratos a largo plazo [1].' },
    ],
    confianza: 'Media',
  },
  esg: { calificaciones: [], confianza: 'Baja' },
  fuentes: fB,
  huecos: [
    { seccion: 'sector', campo: 'tamaño del mercado en valor y CR5', tipo: 'Complemento', intentos: '1) 10-K (solo volumen de WoodMac); 2) GIIGNL (informe anual de pago o en PDF no descargado por tiempo); 3) IEA Gas Market Report (sin cifra de valor)', decision: 'Estimado en valor al precio medio de Cheniere; CR5 omitido' },
    { seccion: 'esg', campo: 'calificaciones ESG', tipo: 'Complemento', intentos: '1) 10-K (remite al informe de responsabilidad corporativa); 2) MSCI (requiere JavaScript); 3) Sustainalytics (sin acceso)', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Proxy statement 2026 (DEF 14A): consejo, remuneración de 2025 (25,6 M USD del consejero delegado, ratio 110:1), participaciones', editor: 'Cheniere Energy, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-04-07', url: `${E8}/000119312526144572/d93921ddef14a.htm` },
  { id: 2, titulo: 'Form 8-K: resultados de la junta del 14-may-2026 (votos de consejeros y de remuneración)', editor: 'Cheniere Energy, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-05-15', url: `${E8}/000000357026000019/lng-20260514.htm` },
  { id: 3, titulo: 'Form 4 de consejeros y directivos (15-oct-2025 a 15-oct-2026), herramientas/form4.mjs', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000003570&type=4' },
  { id: 4, titulo: 'Cheniere Reports Third Quarter 2025 Results (guía 2025 de EBITDA ajustado 6.600-7.000 M USD)', editor: 'Cheniere Energy, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2025-10-30', url: `${E8}/000000357025000109/cei20253rdqtrerex991.htm` },
  { id: 5, titulo: 'Cheniere Reports Fourth Quarter and Full Year 2025 Results (EBITDA ajustado 2025 de 6.943 M; guía 2026)', editor: 'Cheniere Energy, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-26', url: `${E8}/000000357026000006/cei20254thqtrerex991.htm` },
  { id: 6, titulo: 'Form 8-K: nombramiento de Britt Vitalone como consejero (14-jul-2026)', editor: 'Cheniere Energy, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-07-14', url: `${E8}/000000357026000023/lng-20260714.htm` },
  { id: 7, titulo: 'Cheniere Reports Second Quarter 2026 Results (guía 2026 subida a 7.900-8.400 M)', editor: 'Cheniere Energy, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-06', url: `${E8}/000000357026000030/cei20262ndqtrerex991.htm` },
];
const cons = (nombre, cargo, tipo, desde, comisiones) => ({ nombre, cargo, tipo, desde, comisiones });
const C = {
  _estado: 'Completo. Proxy de 2026, 8-K de la junta y Form 4 de 12 meses.',
  directivos: {
    equipo: [
      { nombre: 'Jack A. Fusco', cargo: 'Presidente del consejo y consejero delegado', desde: '2016', participacion_pct: 0.34, trayectoria: 'Consejero delegado desde mayo de 2016 (antes, Calpine); presidente del consejo desde la junta de mayo de 2026. Con él Cheniere pasó de su primer cargamento a ≈55 Mtpa, al rating BBB+ y al plan «20/20 Vision» de recompras y reducción de deuda [1, 5].' },
      { nombre: 'Zach Davis', cargo: 'Director financiero', desde: '2022', participacion_pct: null, trayectoria: 'Director financiero; ha llevado la reducción de deuda, el paso a grado de inversión y la nueva autorización de recompra de más de 10.000 M USD hasta 2030 [5].' },
      { nombre: 'Anatol Feygin', cargo: 'Director comercial', desde: '2014', participacion_pct: null, trayectoria: 'Responsable de los contratos a largo plazo (SPA e IPM) que cubren ≈90 % de la producción [1].' },
      { nombre: 'Sean N. Markowitz', cargo: 'Director jurídico y secretario del consejo', desde: '2014', participacion_pct: null, trayectoria: 'Permisos de FERC y DOE para las ampliaciones [1].' },
    ],
    historial_guidance: [
      { anio: '2025', guia: 'EBITDA ajustado 6.600-7.000 M USD (reiterada en octubre de 2025) [4]', real: '6.943 M USD [5]', cumplida: 'Sí' },
      { anio: '2026', guia: 'EBITDA ajustado 6.750-7.250 M USD (febrero), subida a 7.250-7.750 M (mayo) y a 7.900-8.400 M (agosto) [5, 7]', real: 'En curso: 4.137 M en el 1S26', cumplida: 'Parcial' },
    ],
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      cons('Jack A. Fusco', 'Presidente del consejo y consejero delegado', 'Ejecutivo', '2016', null),
      cons('Patricia K. Collawn', 'Consejera coordinadora (Lead Director)', 'Independiente', null, null),
      cons('Brian E. Edwards', 'Consejero', 'Independiente', null, null),
      cons('Denise Gray', 'Consejera', 'Independiente', null, null),
      cons('Lorraine Mitchelmore', 'Consejera', 'Independiente', null, null),
      cons('W. Benjamin Moreland', 'Consejero', 'Independiente', null, 'Retribuciones (presidente), Auditoría'),
      cons('Scott Peak', 'Consejero', 'Dominical', '2026', null),
      cons('Donald F. Robillard, Jr.', 'Consejero', 'Independiente', null, null),
      cons('Neal A. Shear', 'Consejero', 'Independiente', null, null),
      cons('Britt Vitalone', 'Consejero', 'Independiente', '2026', 'Auditoría, Retribuciones'),
    ],
    presidente_ceo_separados: false, presidente_ejecutivo: true, consejero_coordinador: true, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 1,
    voto_remuneracion_pct: 90.1, voto_remuneracion_contra_pct: 9.2, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: 95.9,
    remuneracion_ceo: { anio: '2025', total: 25.65, fijo: 1.79, variable_corto: null, variable_largo: null, ratio_salario_medio: 110 },
    accionistas: [
      { nombre: 'The Vanguard Group', pct: 10.19, tipo: 'Institucional', variacion: '13G/A de marzo de 2026 (después reparte la tenencia entre sus filiales)' },
      { nombre: 'BlackRock, Inc.', pct: 7.63, tipo: 'Institucional', variacion: '13G/A de octubre de 2024' },
      { nombre: 'Consejeros y directivos (14 personas)', pct: 0.55, tipo: 'Dirección', variacion: 'Ventas de 28,4 M USD en marzo de 2026, cerca de máximos' },
    ],
    insiders: [
      { fecha: '2026-03-30', persona: 'Zach Davis (director financiero)', operacion: 'Venta', acciones: 29000, importe: 8.70 },
      { fecha: '2026-03-26', persona: 'Anatol Feygin (director comercial)', operacion: 'Venta', acciones: 40432, importe: 11.76 },
      { fecha: '2026-03-26', persona: 'Sean N. Markowitz (director jurídico)', operacion: 'Venta', acciones: 22246, importe: 6.47 },
      { fecha: '2026-03-27', persona: 'G. Andrea Botta (presidente saliente)', operacion: 'Venta', acciones: 5000, importe: 1.48 },
      { fecha: '2026-03-02', persona: 'Neal A. Shear (consejero)', operacion: 'Venta', acciones: 4100, importe: 1.02 },
      { fecha: '2025-11-04', persona: 'W. Benjamin Moreland (consejero)', operacion: 'Compra', acciones: 5000, importe: 1.04 },
    ],
    alertas: [
      'Ventas de la dirección por 29,4 M USD en 12 meses, casi todas en la semana del 26 al 30-mar-2026, a 290-300 USD (el máximo anual), sin plan 10b5-1 declarado; una sola compra, de un consejero, por 1,0 M a 208 USD [3].',
      'Desde mayo de 2026 el consejero delegado es también presidente del consejo, con una consejera coordinadora independiente [1].',
      'Cheniere controla Cheniere Partners (CQP) con el 48,6 % de las participaciones y el 100 % del socio general: posibles conflictos con los partícipes minoritarios; un consejero (Scott Peak) entra por el acuerdo de 2012 con el antiguo socio de Blackstone [1].',
    ],
    confianza: 'Alta',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'reparto de la remuneración variable del consejero delegado', tipo: 'Complemento', intentos: '1) Proxy 2026, tabla resumen (texto mal alineado en la extracción); 2) objetivo de bonus del 160 % del sueldo (2,86 M); 3) sin tiempo para leer la tabla como imagen', decision: 'Solo total, fijo y ratio' },
    { seccion: 'directivos', campo: 'historial de guía 2021-2024', tipo: 'Complemento', intentos: '1) Notas de resultados de febrero de 2021-2024 (no descargadas por tiempo); 2) 10-K (no recoge la guía); 3) prensa (cifras sin fuente primaria)', decision: 'Solo 2025 y 2026' },
  ],
};

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de LNG, SPY y XLE (herramientas/bolsa.mjs), hasta el 14-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/LNG/history' },
  { id: 2, titulo: 'Cheniere Energy (LNG) Stock Forecast: objetivo medio 311,33 USD (262-340), 22 analistas, 15 compra fuerte, 5 compra, 2 mantener', editor: 'Stock Analysis (S&P Global)', tipo: 'Analistas', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/lng/forecast/' },
  { id: 3, titulo: '10-Year Treasury Constant Maturity Rate (DGS10): 5,21 % el 13-oct-2026', editor: 'FRED, Federal Reserve Bank of St. Louis', tipo: 'Primaria', fecha: '2026-10-13', url: 'https://fred.stlouisfed.org/series/DGS10' },
  { id: 4, titulo: 'Implied ERP by month (ERPbymonth.xlsx): 4,20 % en octubre de 2026', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 5, titulo: 'Cheniere Energy: estadísticas (206,53 M de acciones, posición corta 2,30 %, próximos resultados el 29-oct-2026)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/lng/statistics/' },
  { id: 6, titulo: 'Estadísticas de Venture Global, Williams, Kinder Morgan, Energy Transfer, Targa y Woodside (cierre del 14-oct-2026)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/wmb/statistics/' },
  { id: 7, titulo: 'Cheniere Energy Partners (CQP): cierre de 62,26 USD el 14-oct-2026 (bolsa.mjs)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/CQP/history' },
  { id: 8, titulo: 'Q3 2026 earnings: consenso de BPA de 4,21 USD (16 analistas); 1T26 4,77 frente a 3,91 y 2T26 3,02 frente a 3,11', editor: 'TipRanks', tipo: 'Analistas', fecha: '2026-10', url: 'https://www.tipranks.com/stocks/GB:0HWH/earnings' },
  { id: 9, titulo: 'Form 10-Q del 2T26 (deuda de 24.257 M y arrendamientos financieros de 1.413 M a 30-jun-2026)', editor: 'Cheniere Energy, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-06', url: `${E8}/000000357026000028/lng-20260630.htm` },
];
const D = {
  _estado: 'Completo. Precio de bolsa.mjs: cierre del 14-oct (la sesión del 15-oct no había cerrado a las 16:40 UTC). Comparables de Stock Analysis.',
  identificacion: {
    nombre: 'Cheniere Energy, Inc.', nombre_corto: 'Cheniere', ticker: 'LNG', isin: 'US16411R2085', mercado: 'NYSE', indice_referencia: 'S&P 500',
    pais: 'Estados Unidos', pais_iso: 'US', sector: 'Energía', industria: 'Gas natural licuado (licuefacción y exportación)', sede: 'Houston (Texas)', fundacion: '1996', empleados: 1717, web: 'https://www.cheniere.com',
    precio: BOLSA.identificacion.precio, fecha_precio: BOLSA.identificacion.fecha_precio, acciones: 206.53, capitalizacion_publicada: 57660, free_float_pct: 99.3,
    max_52s: BOLSA.identificacion.max_52s, min_52s: BOLSA.identificacion.min_52s, volumen_medio_diario: `≈ ${BOLSA.volumen_3m.importe_dia_millones.toFixed(0)} M USD/día (3 meses)`, proximos_resultados: '2026-10-29',
  },
  consenso: {
    estimaciones: [
      { periodo: '2026e', ingresos: 22640, ebitda: null, ebit: null, bpa: null, dpa: 2.22, fuente: 'Stock Analysis (S&P Global) [2]; su BPA (23,16) no está en la base ajustada de la empresa: no se usa' },
      { periodo: '2027e', ingresos: 23390, ebitda: null, ebit: null, bpa: null, dpa: null, fuente: 'Stock Analysis [2]; BPA (20,80) en base mezclada: no se usa' },
    ],
    recomendaciones: { n_analistas: 22, comprar: 20, mantener: 2, vender: 0, po_medio: 311.33, po_min: 262, po_max: 340 },
    base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: null,
    confianza: 'Baja',
  },
  bolsa: { ...BOLSA.bolsa, beta: BOLSA.betas.semanal_5a, posicion_corta_pct: 2.3, confianza: 'Alta' },
  multiplos_historicos: {
    serie: ANIOS.map((y) => ({ anio: y, precio_cierre: BOLSA.cierres_ejercicio.find((c) => c.anio === y).precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: ['2019', '2020', '2021'].includes(y) })),
    confianza: 'Media',
  },
  comparables: {
    empresas: [
      { nombre: 'Venture Global', ticker: 'VG', pais: 'US', capitalizacion: 31100, ev_ventas: 4.12, ev_ebitda_ltm: 9.51, ev_ebitda_ntm: null, per_ntm: 7.71, crecimiento_pct: null, margen_ebitda_pct: 43.4, roic_pct: 10.5, dn_ebitda: 5.4, fcf_yield_pct: -23.2 },
      { nombre: 'Williams Companies', ticker: 'WMB', pais: 'US', capitalizacion: 85370, ev_ventas: 9.38, ev_ebitda_ltm: 16.44, ev_ebitda_ntm: null, per_ntm: 29.18, crecimiento_pct: null, margen_ebitda_pct: 57.1, roic_pct: 7.95, dn_ebitda: 4.3, fcf_yield_pct: -0.2 },
      { nombre: 'Kinder Morgan', ticker: 'KMI', pais: 'US', capitalizacion: 73060, ev_ventas: 5.85, ev_ebitda_ltm: 13.77, ev_ebitda_ntm: null, per_ntm: 22.56, crecimiento_pct: null, margen_ebitda_pct: 42.5, roic_pct: 6.24, dn_ebitda: 4.2, fcf_yield_pct: 3.65 },
      { nombre: 'Energy Transfer', ticker: 'ET', pais: 'US', capitalizacion: 68500, ev_ventas: 1.29, ev_ebitda_ltm: 8.10, ev_ebitda_ntm: null, per_ntm: 12.06, crecimiento_pct: null, margen_ebitda_pct: 16.0, roic_pct: 8.54, dn_ebitda: 4.0, fcf_yield_pct: 7.48 },
      { nombre: 'Targa Resources', ticker: 'TRGP', pais: 'US', capitalizacion: 60560, ev_ventas: 4.77, ev_ebitda_ltm: 14.53, ev_ebitda_ntm: null, per_ntm: 24.75, crecimiento_pct: null, margen_ebitda_pct: 32.9, roic_pct: 13.28, dn_ebitda: 3.5, fcf_yield_pct: 1.23 },
      { nombre: 'Woodside Energy', ticker: 'WDS', pais: 'AU', capitalizacion: 44640, ev_ventas: 4.27, ev_ebitda_ltm: 7.40, ev_ebitda_ntm: null, per_ntm: 11.65, crecimiento_pct: null, margen_ebitda_pct: 57.7, roic_pct: 4.39, dn_ebitda: 1.7, fcf_yield_pct: 0.23 },
    ],
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [],
    confianza: 'Baja',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'transacciones', campo: 'operaciones comparables con múltiplo', tipo: 'Complemento', intentos: '1) Prensa de operaciones de GNL (ventas de participaciones en proyectos, sin EV/EBITDA); 2) 10-K (sin operaciones del sector); 3) bases de operaciones (de pago)', decision: 'Omitido; peso 0' },
    { seccion: 'consenso', campo: 'BPA de consenso en la base ajustada de la empresa (2026-2028)', tipo: 'Núcleo', intentos: '1) Stock Analysis (23,16 y 20,80: no cuadra con el ajustado publicado, 7,79 en el 1S26); 2) MarketScreener (página inactiva o con registro); 3) TipRanks y Benzinga (solo el trimestre: 4,21-4,49 para el 3T26)', decision: 'Sin BPA anual de consenso; contraste con el trimestral' },
  ],
};

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Energy prices could soon skyrocket: why Cheniere is one of the top rated stocks to buy now', editor: 'Barchart', tipo: 'Foros y redes', fecha: '2026-09', url: 'https://www.barchart.com/story/news/1075253/energy-prices-could-soon-skyrocket-why-cheniere-is-one-of-the-top-rated-stocks-to-buy-now' },
  { id: 2, titulo: 'Cheniere Energy stock enters overbought territory on Strait of Hormuz rally: is it too late to buy LNG here?', editor: 'Barchart', tipo: 'Foros y redes', fecha: '2026-03', url: 'https://www.barchart.com/story/news/852215/cheniere-energy-stock-enters-overbought-territory-on-strait-of-hormuz-rally-is-it-too-late-to-buy-lng-here' },
  { id: 3, titulo: 'Down 23%, the Iran War Makes This Energy Stock One to Watch', editor: '24/7 Wall St.', tipo: 'Foros y redes', fecha: '2026-06-23', url: 'https://247wallst.com/investing/2026/06/23/down-23-the-iran-war-makes-this-energy-stock-one-to-watch/' },
  { id: 4, titulo: 'Natural gas prices are soaring: should you buy Cheniere here?', editor: 'Barchart', tipo: 'Foros y redes', fecha: '2026-04', url: 'https://www.barchart.com/story/news/1344505/natural-gas-prices-are-soaring-should-you-buy-cheniere-here' },
];
const E = {
  _estado: 'Parcial: por tiempo, solo comentarios de mercado; no se abrieron Stocktwits ni Seeking Alpha.',
  sentimiento: {
    tono: 'Positivo', tendencia: 'Estable',
    revisadas: [
      { plataforma: 'Comentarios de mercado (Barchart, 24/7 Wall St.)', fecha: '2026-09', n_comentarios: 4, tono: 'Positivo', resumen: 'La tesis que circula: Cheniere es la forma «segura» de jugar la crisis de Ormuz, porque cobra por contrato y vende algo al contado; en marzo se avisó de sobrecompra y en junio, tras caer un 23 %, se vio como oportunidad [1-4].' },
    ],
    confianza: 'Baja',
  },
  fuentes: fE,
  huecos: [
    { seccion: 'sentimiento', campo: 'foros de inversores (Reddit, Stocktwits, Seeking Alpha)', tipo: 'Complemento', intentos: '1) Reddit (403 desde la nube, lección común); 2) Stocktwits y Seeking Alpha no abiertos por tiempo; 3) comentarios de prensa sí', decision: 'Solo comentarios de mercado' },
  ],
};

guarda('A', A); guarda('B', B); guarda('C', C); guarda('D', D); guarda('E', E);
console.log('Notas A-E escritas');
