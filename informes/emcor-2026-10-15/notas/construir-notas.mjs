// Escribe las notas A-E de EMCOR (corte 2026-10-15) a partir del XBRL de la SEC (cuentas-xbrl.json y companyfacts),
// las notas de prensa de resultados (8-K 99.1), el 10-K 2025, el 10-Q del 2T26, el proxy de 2026, la transcripción del 2T26,
// bolsa.mjs, Yahoo (comparables-yahoo.json), Stock Analysis y Seeking Alpha. Cada nota cita solo con [n] de su lista.
// Ejecutar: node informes/emcor-2026-10-15/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const X = JSON.parse(fs.readFileSync(path.join(dir, 'cuentas-xbrl.json'), 'utf8'));
const BOLSA = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const YH = JSON.parse(fs.readFileSync(path.join(dir, 'comparables-yahoo.json'), 'utf8'));
const E8 = 'https://www.sec.gov/Archives/edgar/data/105634';
const r1 = (v) => (v == null ? null : Math.round(v * 10) / 10);
const ANIOS = ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'];

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Form 10-K 2025 (cuentas auditadas, segmentos, ingresos por mercado, cartera de pedidos, venta de EMCOR UK, planes de pensiones multiempresa)', editor: 'EMCOR Group, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-26', url: `${E8}/000010563426000025/eme-20251231.htm` },
  { id: 2, titulo: 'Hechos XBRL (companyfacts): cuenta, balance y flujos 2015-2025, amortización de intangibles, deterioros, cartera de pedidos', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0000105634.json' },
  { id: 3, titulo: 'EMCOR Group, Inc. Reports Second Quarter 2026 Results (8-K, anexo 99.1)', editor: 'EMCOR Group, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-07-30', url: `${E8}/000010563426000112/eme-ex991_2026630xq2.htm` },
  { id: 4, titulo: 'Form 10-Q del 2T26 (ingresos por mercado, cartera por segmento, compras, recompras, hechos posteriores)', editor: 'EMCOR Group, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-07-30', url: `${E8}/000010563426000110/eme-20260630.htm` },
  { id: 5, titulo: 'EMCOR Group, Inc. Reports First Quarter 2026 Results (8-K, anexo 99.1)', editor: 'EMCOR Group, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-04-29', url: `${E8}/000010563426000048/eme-ex991_2026331xq1.htm` },
  { id: 6, titulo: 'EMCOR Group, Inc. Reports Fourth Quarter and Full-Year 2025 Results (8-K, anexo 99.1)', editor: 'EMCOR Group, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-26', url: `${E8}/000010563426000027/eme-ex991_20251231xq4.htm` },
  { id: 7, titulo: 'EMCOR Group, Inc. Reports Third Quarter 2025 Results (8-K, anexo 99.1)', editor: 'EMCOR Group, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2025-10-30', url: `${E8}/000010563425000082/eme-ex991_2025930xq3.htm` },
  { id: 8, titulo: 'EMCOR (EME) Q2 2026 Earnings Call Transcript (compras de cinco instaladores eléctricos, márgenes, cartera, multiplicadores de los centros de datos de IA)', editor: 'The Motley Fool (vía Webull)', tipo: 'Prensa', fecha: '2026-07-30', url: 'https://www.webull.com/news/15319340250375168' },
  { id: 9, titulo: 'EMCOR Group, Inc. Reports Fourth Quarter and Full-Year 2020 Results (BPA no GAAP de 2020: 6,40 USD)', editor: 'EMCOR Group, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2021-02-25', url: `${E8}/000010563421000047/` },
];
const cx = Object.fromEntries(X.financieros.cuenta.map((r) => [r.periodo, r]));
const bx = Object.fromEntries(X.balance.historico.map((r) => [r.periodo, r]));
const fx = Object.fromEntries(X.flujos.historico.map((r) => [r.periodo, r]));
// Amortización de intangibles identificables (XBRL AmortizationOfIntangibleAssets): 2016-2023 el concepto de amortizaciones solo trae la depreciación
const amortInt = { 2016: 40.9, 2017: 48.6, 2018: 42.4, 2019: 48.1, 2020: 60.0, 2021: 64.1, 2022: 61.3, 2023: 67.1, 2024: 0, 2025: 0 };
// No recurrentes dentro del EBIT (positivo = gasto): deterioros 2017 (57,8), 2020 (232,8), 2023 (2,4); 2025: plusvalía de la venta de EMCOR UK (−144,9) menos costes de la venta y de la compra de Miller Electric (10,7 + 9,4)
const noRec = { 2016: 2.4, 2017: 57.8, 2018: 0.9, 2019: null, 2020: 232.8, 2021: null, 2022: null, 2023: 2.4, 2024: null, 2025: -124.8 };
const retenciones = { 2016: 4.2, 2017: 3.5, 2018: 3.8, 2019: 6.5, 2020: 2.6, 2021: 4.2, 2022: 7.5, 2023: 6.1, 2024: 15.4, 2025: 16.8 };
const deudaFix = { 2016: 408.4, 2019: 296.6 }; // deuda a largo + corto (el corto no está en el XBRL de esos años: se deja la cifra a largo y se avisa)
const cuenta = ANIOS.map((y) => {
  const c = cx[y];
  const amort = r1(c.amortizaciones + amortInt[y]);
  return { periodo: y, ingresos: c.ingresos, coste_ventas: c.coste_ventas, gastos_generales: c.gastos_generales, ebitda: r1(c.ebit + amort), amortizaciones: amort, ebit: c.ebit, resultado_financiero: c.resultado_financiero, bai: c.bai, impuestos: c.impuestos, minoritarios: c.minoritarios ?? 0, beneficio_neto: c.beneficio_neto, gastos_financieros: c.gastos_financieros, participadas_en_ebitda: null, no_recurrentes_en_ebitda: noRec[y], bpa: c.bpa, dpa: c.dpa, dpa_extraordinario: 0, acciones_diluidas: c.acciones_diluidas };
});
const historico = ANIOS.map((y) => {
  const b = bx[y];
  return { periodo: y, activo_total: b.activo_total, activo_corriente: b.activo_corriente, pasivo_corriente: b.pasivo_corriente, pasivo_total: b.pasivo_total, fondo_comercio: b.fondo_comercio, intangibles: b.intangibles, inmovilizado_material: b.inmovilizado_material, existencias: y === '2025' ? 126.3 : y === '2024' ? 95.7 : null, clientes: b.clientes, proveedores: b.proveedores, activos_contrato: b.activos_contrato, pasivos_contrato: b.pasivos_contrato, caja: b.caja, deuda_financiera: deudaFix[y] ?? b.deuda_financiera ?? 0, arrendamientos: 0, patrimonio_neto: b.patrimonio_neto, minoritarios: b.minoritarios, reservas: b.reservas };
});
const flujos = ANIOS.map((y) => {
  const f = fx[y];
  return { periodo: y, flujo_operativo: f.flujo_operativo, capex: f.capex, pagos_arrendamientos: f.pagos_arrendamientos ?? 0, adquisiciones: f.adquisiciones, desinversiones: f.desinversiones, dividendos: f.dividendos, recompras: r1(f.recompras + retenciones[y]), emision_acciones: 0, intereses_en_financiacion: 0 };
});
const seg = (nombre, descripcion, h) => ({ nombre, descripcion, tipo_resultado: 'EBIT', historico: h.map(([periodo, ingresos, resultado]) => ({ periodo, ingresos, resultado })) });
const A = {
  _estado: 'Completo. Cuentas 2016-2025 del XBRL de la SEC con la amortización de intangibles añadida (2016-2023) y los no recurrentes marcados; comprobadas con el 10-K 2025 y las notas de resultados; LTM a junio de 2026 con el 10-Q del 2T26.',
  negocio: {
    segmentos: [
      seg('Construcción eléctrica y servicios (EE. UU.)', 'Instalaciones eléctricas, de baja tensión y comunicaciones: centros de datos, hospitales, edificios públicos, fábricas', [['2023', 2783.7, 230.6], ['2024', 3342.9, 447.2], ['2025', 5074.3, 612.0]]),
      seg('Construcción mecánica y servicios (EE. UU.)', 'Climatización (HVAC), refrigeración, fontanería, tuberías de proceso, protección contra incendios y prefabricados', [['2023', 5074.8, 530.6], ['2024', 6405.7, 799.6], ['2025', 7050.5, 905.3]]),
      seg('Servicios a edificios (EE. UU.)', 'Mantenimiento mecánico, controles y automatización, eficiencia energética y gestión de instalaciones', [['2023', 3120.1, 183.0], ['2024', 3114.8, 176.7], ['2025', 3122.2, 187.2]]),
      seg('Servicios industriales (EE. UU.)', 'Mantenimiento y paradas de refinerías y petroquímicas; fabricación de intercambiadores de calor', [['2023', 1167.8, 35.4], ['2024', 1277.2, 44.2], ['2025', 1268.1, 25.0]]),
      seg('Servicios a edificios (Reino Unido)', 'Vendido a OCS en el 4T25', [['2023', 436.4, 25.7], ['2024', 425.5, 21.5], ['2025', 471.3, 21.0]]),
      seg('Corporativo', 'Gastos centrales (en 2025 incluye la plusvalía de 144,9 M de la venta de EMCOR UK)', [['2023', 0, -127.2], ['2024', 0, -144.4], ['2025', 0, -37.0]]),
    ],
    geografias: [{ nombre: 'Estados Unidos', peso_pct: 97.2 }, { nombre: 'Reino Unido (vendido en 2025)', peso_pct: 2.8 }],
    geografias_criterio: 'origen',
    kpis: [
      { kpi: 'Cartera de pedidos (obligaciones pendientes, RPO)', valor_anterior: '11.910 M USD (jun-25)', valor_actual: '17.140 M USD (jun-26)', variacion: '+43,9 %', comentario: 'Un 95 % del aumento es orgánico; el 75-76 % se convierte en ingresos en 12 meses (≈85 % históricamente) [3, 8].' },
      { kpi: 'Centros de datos (mercado «redes y comunicaciones») en los ingresos de construcción', valor_anterior: '≈1.060 M USD (2T25)', valor_actual: '1.772 M USD (2T26)', variacion: '+67 %', comentario: 'Eléctrica 973 M (58 % del segmento) y mecánica 799 M (35 %): ≈34 % de los ingresos del grupo en el 2T26, frente al 24 % de 2025 y el 11 % de 2023 [4, 1].' },
      { kpi: 'Crecimiento orgánico de los ingresos', valor_anterior: '7,9 % (2025)', valor_actual: '19,6 % (2T26)', variacion: '+11,7 puntos', comentario: '18,3 % en el 1S26, sin compras ni la venta del Reino Unido [3, 6].' },
      { kpi: 'Margen operativo del segmento mecánico', valor_anterior: '13,6 % (2T25)', valor_actual: '12,5 % (2T26)', variacion: '−1,1 puntos', comentario: 'Más contratos de precio máximo garantizado y a coste más margen, y más papel de contratista principal [4, 8].' },
      { kpi: 'Margen operativo del grupo', valor_anterior: '9,6 % (2T25)', valor_actual: '10,6 % (2T26)', variacion: '+1,0 punto', comentario: 'Guía 2026: 9,5-9,8 %; la empresa no supone repetir el 10,6 % en el segundo semestre [3, 8].' },
    ],
    confianza: 'Alta',
  },
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 18597.8, ebitda: 2135.3, ebit: 1930.6, beneficio_neto: 1439.2, bpa: 32.12, dpa: 1.30, dpa_extraordinario: 0, fcf: 1171.0, participadas_en_ebitda: null, no_recurrentes_en_ebitda: -134.2 },
    cambios_perimetro: [
      { fecha: '2025-02-03', operacion: 'Compra de Miller Electric Company (instalador eléctrico del sureste de EE. UU.) por 876,8 M USD', efecto_ingresos: 'Unos 800 M USD de ingresos anuales; dentro del segmento eléctrico', comentario: 'Pagada con caja y 250 M netos del crédito revolvente, ya devueltos [4].' },
      { fecha: '2025-12', operacion: 'Venta de EMCOR UK a OCS (cobro neto de 256,6 M USD)', efecto_ingresos: '−471 M USD de ingresos anuales (2,8 %)', comentario: 'Plusvalía de 144,9 M antes de impuestos en el 4T25 [6].' },
      { fecha: '2026-07/09', operacion: 'Compra de cinco instaladores eléctricos sindicados (B&B, Sidney, Giles, Schmidt, Connelly) por ≈750 M USD más hasta 90 M de pagos aplazados', efecto_ingresos: '≈625 M USD de ingresos y 105 M de EBITDA en los 12 meses a junio de 2026', comentario: 'Posteriores al balance de junio; la guía de 2026 incluye 250-275 M de ingresos suyos en el 2S26 [4, 8].' },
    ],
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '3T24', ingresos: 3696.9, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 398.0, margen_ebitda_pct: 10.8, bpa: 5.80, vs_consenso: null },
      { periodo: '4T24', ingresos: 3770.0, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 423.9, margen_ebitda_pct: 11.2, bpa: 6.32, vs_consenso: null },
      { periodo: '1T25', ingresos: 3867.4, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 360.7, margen_ebitda_pct: 9.3, bpa: 5.26, vs_consenso: null },
      { periodo: '2T25', ingresos: 4304.4, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 461.8, margen_ebitda_pct: 10.7, bpa: 6.72, vs_consenso: null },
      { periodo: '3T25', ingresos: 4301.5, crecimiento_pct: 16.4, crecimiento_organico_pct: null, ebitda: 453.5, margen_ebitda_pct: 10.5, bpa: 6.57, vs_consenso: null },
      { periodo: '4T25', ingresos: 4513.1, crecimiento_pct: 19.7, crecimiento_organico_pct: 9.5, ebitda: 489.6, margen_ebitda_pct: 10.8, bpa: 7.19, vs_consenso: null },
      { periodo: '1T26', ingresos: 4628.2, crecimiento_pct: 19.7, crecimiento_organico_pct: 16.3, ebitda: 456.4, margen_ebitda_pct: 9.9, bpa: 6.84, vs_consenso: 'Superior' },
      { periodo: '2T26', ingresos: 5154.9, crecimiento_pct: 19.8, crecimiento_organico_pct: 19.6, ebitda: 601.6, margen_ebitda_pct: 11.7, bpa: 9.06, vs_consenso: 'Superior' },
    ],
    confianza: 'Alta',
  },
  balance: {
    historico,
    vencimientos: [],
    liquidez: 'Caja de 924,4 M USD a 30-jun-2026 y sin deuda financiera; crédito revolvente de 1.300 M USD (2023 Credit Agreement) sin disponer salvo cartas de crédito. En julio-septiembre de 2026 paga ≈750 M por cinco compras, con caja y, si hace falta, el revolvente [4, 8].',
    rating: 'Sin rating publicado (sin bonos emitidos)',
    coste_deuda_pct: null, vida_media_anios: null,
    confianza: 'Alta',
  },
  flujos: { historico: flujos, confianza: 'Alta' },
  calidad: { auditor: 'Ernst & Young LLP', anios_auditor: null, opinion: 'Favorable (cuentas y control interno a 31-dic-2025)', confianza: 'Alta' },
  fuentes: fA,
  huecos: [
    { seccion: 'trimestres', campo: 'crecimiento interanual de 3T24 a 2T25', tipo: 'Complemento', intentos: '1) Notas de prensa del 3T25 al 2T26 (solo comparan con el trimestre del año anterior); 2) XBRL trimestral de 2023 no descargado; 3) prensa (sin cifra fiable)', decision: 'Omitido' },
    { seccion: 'calidad', campo: 'años con el mismo auditor', tipo: 'Complemento', intentos: '1) 10-K 2025 (informe de EY sin año de inicio en el texto extraído); 2) proxy 2026 (ratificación sin año de inicio); 3) 8-K de la junta (solo votos)', decision: 'Omitido' },
    { seccion: 'negocio', campo: 'segmentos 2021-2022', tipo: 'Complemento', intentos: '1) 10-K 2025 (solo 2023-2025); 2) XBRL companyfacts (sin dimensiones de segmento); 3) 10-K 2023 no descargado por tiempo', decision: 'Omitido: tres ejercicios' },
  ],
};

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Form 10-K 2025: Business (actividades, mercados, competencia, mano de obra sindicada, 44.000 empleados)', editor: 'EMCOR Group, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-26', url: `${E8}/000010563426000025/eme-20251231.htm` },
  { id: 2, titulo: 'Total Construction Spending: Nonresidential (TLNRESCONS), 1.308.532 M USD anualizados en agosto de 2026', editor: 'U.S. Census Bureau vía FRED', tipo: 'Sectorial', fecha: '2026-10-01', url: 'https://fred.stlouisfed.org/series/TLNRESCONS' },
  { id: 3, titulo: 'Form 10-Q del 2T26: ingresos por mercado (redes y comunicaciones, institucional, sanidad, agua) y cartera', editor: 'EMCOR Group, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-07-30', url: `${E8}/000010563426000110/eme-20260630.htm` },
  { id: 4, titulo: 'EMCOR (EME) Q2 2026 Earnings Call Transcript', editor: 'The Motley Fool (vía Webull)', tipo: 'Prensa', fecha: '2026-07-30', url: 'https://www.webull.com/news/15319340250375168' },
  { id: 5, titulo: 'Fichas de Comfort Systems, Quanta, MasTec, IES, APi, Primoris, Limbach, Sterling, MYR y Dycom (ingresos, márgenes, ROIC)', editor: 'Yahoo Finance (herramientas/yahoo.mjs)', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/quote/FIX/' },
  { id: 6, titulo: 'Data centers drive surge in U.S. construction starts, UBS says', editor: 'Seeking Alpha', tipo: 'Prensa', fecha: '2026-09-23', url: 'https://seekingalpha.com/api/sa/combined/EME.xml' },
  { id: 7, titulo: 'AI slowdown fears hammer data-center power and construction stocks', editor: 'Seeking Alpha', tipo: 'Prensa', fecha: '2026-09-14', url: 'https://seekingalpha.com/api/sa/combined/EME.xml' },
  { id: 8, titulo: 'Ficha sectorial de climatización (HVAC) y control de edificios (refrigeración de centros de datos, comparables)', editor: 'Repositorio (sectores/climatizacion-hvac-2026-10-14)', tipo: 'Sectorial', fecha: '2026-10-14', url: 'https://github.com/' },
  { id: 9, titulo: 'EMCOR Group, Inc. (EME) Stock Hit by DeepSeek AI Concerns as Investors Reassess Data Center Demand', editor: 'Insider Monkey', tipo: 'Prensa', fecha: '2025-01', url: 'https://www.insidermonkey.com/blog/emcor-group-inc-eme-stock-hit-by-deepseek-ai-concerns-as-investors-reassess-data-center-demand-1436927/' },
];
const B = {
  _estado: 'Completo. Mercado: gasto en construcción no residencial de EE. UU. (Census) con un peso de las instalaciones MEP estimado; competidores con cifras de Yahoo a 15-oct.',
  historia: {
    hitos: [
      { anio: '1994', hito: 'Nace EMCOR de la reorganización de JWP Inc. tras su quiebra; empieza a cotizar como grupo de instaladores [1].' },
      { anio: '2002', hito: 'Compra Consolidated Engineering Services y otras empresas de mantenimiento: entra con fuerza en servicios a edificios [1].' },
      { anio: '2011', hito: 'Anthony Guzzi, presidente desde 2004, pasa a consejero delegado (presidente del consejo desde 2018) [1].' },
      { anio: '2017', hito: 'Compra varias empresas de protección contra incendios y servicios mecánicos; deterioro de 57,8 M en servicios industriales [1].' },
      { anio: '2020', hito: 'Deterioro de 232,8 M en servicios industriales por la caída del petróleo y la COVID [1].' },
      { anio: '2023', hito: 'Empieza la ola de centros de datos y de fábricas de semiconductores: margen operativo del 7,0 % y BPA de 13,31 USD [1].' },
      { anio: '2025', hito: 'Compra Miller Electric (876,8 M USD) y vende su filial británica a OCS; entra en el S&P 500 [1].' },
      { anio: '2026', hito: 'Cartera récord de 17.140 M USD; compra cinco instaladores eléctricos por ≈750 M; la acción marca máximos de 951,96 USD en mayo y cae un 22 % por el miedo al frenazo del gasto en IA [3, 4, 7].' },
    ],
    confianza: 'Media',
  },
  negocio: { confianza: 'Alta' },
  sector: {
    tamano: 'Gasto en construcción no residencial de EE. UU.: 1.273.524 M USD en 2025 y 1.308.532 M anualizados en agosto de 2026 [2]; las instalaciones mecánicas, eléctricas y de fontanería (MEP) suponen ≈35 % (estimación propia), ≈450.000 M USD',
    unidad_serie: 'millones de USD (construcción no residencial total, Census)',
    serie: [{ anio: '2019', tamano: 874830 }, { anio: '2020', tamano: 841712 }, { anio: '2021', tamano: 867490 }, { anio: '2022', tamano: 1057267 }, { anio: '2023', tamano: 1271409 }, { anio: '2024', tamano: 1318434 }, { anio: '2025', tamano: 1273524 }],
    tcac_historico_pct: 6.5, tcac_previsto_pct: 4.0,
    cr5_pct: null, estructura: 'Fragmentada',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 3.8,
    competidores: YH.empresas.filter((e) => ['FIX', 'PWR', 'MTZ', 'IESC', 'APG', 'LMB'].includes(e.ticker)).map((e) => ({
      nombre: e.nombre.replace(', Inc.', '').replace(' Corporation', ''), pais: 'EE. UU.', ticker: e.ticker, ingresos: Math.round(e.ventas_ltm), cuota_pct: null, margen_ebit_pct: r1(e.ebit_ltm / e.ventas_ltm * 100),
      comentario: { FIX: 'El rival más parecido: instalador mecánico y eléctrico muy expuesto a centros de datos, con más margen (EBIT 16 %) y crecimiento (+43 % en 2026e) [5].', PWR: 'Redes eléctricas y de alta tensión: compite por la mano de obra eléctrica sindicada y en centros de datos [5].', MTZ: 'Infraestructuras de energía y comunicaciones, más centrado en obra civil [5].', IESC: 'Instalador eléctrico más pequeño con fuerte peso de centros de datos [5].', APG: 'Protección contra incendios e inspecciones: compite con el servicio de EMCOR [5].', LMB: 'Instalador mecánico regional que gira hacia el mantenimiento [5].' }[e.ticker],
    })),
    confianza: 'Media',
  },
  esg: { calificaciones: [], confianza: 'Baja' },
  fuentes: fB,
  huecos: [
    { seccion: 'sector', campo: 'tamaño del mercado de instalaciones MEP y CR5', tipo: 'Complemento', intentos: '1) Census (solo gasto total de construcción); 2) ENR Top Specialty Contractors (de pago); 3) estudios de IBISWorld (de pago)', decision: 'Estimado (≈35 % del gasto no residencial) y marcado como estimación' },
    { seccion: 'esg', campo: 'calificaciones ESG', tipo: 'Complemento', intentos: '1) 10-K y proxy (sin calificaciones); 2) MSCI ESG Ratings (requiere JavaScript); 3) Sustainalytics (sin acceso)', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Proxy statement 2026 (DEF 14A): consejo, remuneración de 2025, ratio salarial, participaciones', editor: 'EMCOR Group, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-04-21', url: `${E8}/000114036126015809/ny20062562x1_def14a.htm` },
  { id: 2, titulo: 'Form 8-K: resultados de la junta de 2026 (votos de consejeros, remuneración y auditor)', editor: 'EMCOR Group, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-06-04', url: `${E8}/000010563426000085/eme-20260604.htm` },
  { id: 3, titulo: 'Form 4 de consejeros y directivos (15-oct-2025 a 15-oct-2026), herramientas/form4.mjs', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000105634&type=4' },
  { id: 4, titulo: 'Notas de resultados de febrero 2023-2026 con la guía anual inicial (8-K, anexo 99.1)', editor: 'EMCOR Group, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-26', url: `${E8}/000010563426000027/eme-ex991_20251231xq4.htm` },
  { id: 5, titulo: 'Form 10-K 2025 y notas de resultados 2023-2025 (resultados reales)', editor: 'EMCOR Group, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-26', url: `${E8}/000010563426000025/eme-20251231.htm` },
  { id: 6, titulo: 'EMCOR Group, Inc. Reports Second Quarter 2026 Results (guía de 2026 subida por segunda vez)', editor: 'EMCOR Group, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-07-30', url: `${E8}/000010563426000112/eme-ex991_2026630xq2.htm` },
];
const cons = (nombre, cargo, tipo, desde, comisiones) => ({ nombre, cargo, tipo, desde, comisiones });
const C = {
  _estado: 'Completo. Proxy de 2026, 8-K de la junta y Form 4 de 12 meses.',
  directivos: {
    equipo: [
      { nombre: 'Anthony J. Guzzi', cargo: 'Presidente del consejo, presidente ejecutivo y consejero delegado', desde: '2011', participacion_pct: 0.38, trayectoria: 'En EMCOR desde 2004 (presidente y director de operaciones), consejero delegado desde 2011 y presidente del consejo desde 2018; antes en Carrier (United Technologies). Con él los ingresos han pasado de ≈5.000 a 17.000 M USD y el margen operativo de ≈4 % a 10 % [1].' },
      { nombre: 'Jason R. Nalbandian', cargo: 'Director financiero', desde: '2024', participacion_pct: null, trayectoria: 'Director financiero desde abril de 2024; antes responsable contable y de planificación del grupo [1].' },
      { nombre: 'Maxine L. Mauricio', cargo: 'Vicepresidenta ejecutiva, directora jurídica y de administración', desde: '2023', participacion_pct: null, trayectoria: 'Directora jurídica desde 2016 y de administración desde 2023 [1].' },
    ],
    historial_guidance: [
      { anio: '2023', guia: 'Ingresos 12.000-12.500 M USD; BPA 8,75-9,50 [4]', real: 'Ingresos 12.583 M; BPA 13,31 [5]', cumplida: 'Sí' },
      { anio: '2024', guia: 'Ingresos 13.500-14.000 M USD; BPA 14,00-15,00 [4]', real: 'Ingresos 14.566 M; BPA 21,52 [5]', cumplida: 'Sí' },
      { anio: '2025', guia: 'Ingresos 16.100-16.900 M USD; BPA 22,25-24,00 [4]', real: 'Ingresos 16.986 M; BPA no GAAP 25,87 (GAAP 28,19 con la venta del Reino Unido) [5]', cumplida: 'Sí' },
      { anio: '2026', guia: 'Ingresos 17.750-18.500 M USD; BPA 27,25-29,25 (febrero); subida a 20.000-20.500 M y 32,00-33,25 en julio [4, 6]', real: 'En curso: 1S26 9.783 M y BPA 15,89', cumplida: 'Parcial' },
    ],
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      cons('Anthony J. Guzzi', 'Presidente del consejo y consejero delegado', 'Ejecutivo', '2009', null),
      cons('John W. Altmeyer', 'Consejero', 'Independiente', null, null),
      cons('Amy E. Dahl', 'Consejera', 'Independiente', '2024', null),
      cons('Ronald L. Johnson', 'Consejero', 'Independiente', null, null),
      cons('Carol P. Lowe', 'Consejera', 'Independiente', null, 'Auditoría'),
      cons('M. Kevin McEvoy', 'Consejero', 'Independiente', null, null),
      cons('Pat Roche', 'Consejero', 'Independiente', null, null),
      cons('Steven B. Schwarzwaelder', 'Consejero', 'Independiente', null, null),
      cons('Robin Walker-Lee', 'Consejera', 'Independiente', null, null),
    ],
    presidente_ceo_separados: false, presidente_ejecutivo: true, consejero_coordinador: true, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 1,
    voto_remuneracion_pct: 86.8, voto_remuneracion_contra_pct: 13.0, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 14.38, fijo: 1.33, variable_corto: 9.38, variable_largo: 3.51, ratio_salario_medio: 164 },
    accionistas: [
      { nombre: 'BlackRock, Inc.', pct: 8.0, tipo: 'Institucional', variacion: 'Estable (13G/A de oct-25)' },
      { nombre: 'The Vanguard Group', pct: 11.9, tipo: 'Institucional', variacion: 'Desagregado en 2026 (realineación interna; ya no declara en conjunto)' },
      { nombre: 'FMR LLC (Fidelity)', pct: 5.9, tipo: 'Institucional', variacion: 'Nueva declaración (13G de nov-25)' },
      { nombre: 'Anthony J. Guzzi (consejero delegado)', pct: 0.38, tipo: 'Dirección', variacion: 'Baja: ventas de 26,3 M USD con plan 10b5-1 en 12 meses' },
    ],
    insiders: [
      { fecha: '2026', persona: 'Anthony J. Guzzi (consejero delegado)', operacion: 'Venta', acciones: null, importe: 26.26 },
      { fecha: '2026', persona: 'Steven B. Schwarzwaelder (consejero)', operacion: 'Venta', acciones: null, importe: 5.01 },
      { fecha: '2026', persona: 'Maxine L. Mauricio (directora jurídica)', operacion: 'Venta', acciones: null, importe: 2.47 },
      { fecha: '2026', persona: 'John W. Altmeyer (consejero)', operacion: 'Venta', acciones: null, importe: 2.24 },
      { fecha: '2026', persona: 'Jason R. Nalbandian (director financiero)', operacion: 'Venta', acciones: null, importe: 0.69 },
    ],
    alertas: [
      'Ventas de consejeros y directivos por 40,8 M USD en 12 meses y ninguna compra; el consejero delegado, 26,3 M con plan 10b5-1 [3].',
      'Presidente del consejo y consejero delegado en la misma persona (con consejero coordinador independiente) [1].',
      'Un 13 % de votos en contra de la remuneración en la junta de 2026 [2].',
      'Participa en planes de pensiones multiempresa sindicales (aportaciones de 725,7 M USD en 2025): riesgo de pasivo por salida si se retirara de ellos [A1 del 10-K].',
    ],
    confianza: 'Alta',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'fecha de entrada de cada consejero y comisiones', tipo: 'Complemento', intentos: '1) Proxy 2026 (biografías extraídas sin la tabla de comisiones); 2) 8-K de la junta (solo votos); 3) web de gobierno corporativo (no descargada)', decision: 'Omitido: fechas en null' },
    { seccion: 'gobierno', campo: 'fecha y número de acciones de cada venta de directivos', tipo: 'Complemento', intentos: '1) form4.mjs (da totales por persona); 2) EDGAR Form 4 individual (no leído uno a uno por tiempo); 3) MarketBeat (sin abrir)', decision: 'Se dan importes por persona en 12 meses' },
  ],
};
C.gobierno.alertas[3] = 'Participa en planes de pensiones multiempresa sindicales (aportaciones de 725,7 M USD en 2025): riesgo de pasivo por salida si se retirara de ellos [5].';

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de EME, SPY y XLI (herramientas/bolsa.mjs y movimiento.mjs), hasta el 15-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/quote/EME/history' },
  { id: 2, titulo: 'EMCOR Group (EME) Stock Forecast: 10 analistas, objetivo medio 1.033 USD (885-1.200), BPA 2026e 32,99 y 2027e 37,37', editor: 'Stock Analysis (S&P Global)', tipo: 'Analistas', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/eme/forecast/' },
  { id: 3, titulo: '10-Year Treasury Constant Maturity Rate (DGS10): 5,21 % el 13-oct-2026', editor: 'FRED, Federal Reserve Bank of St. Louis', tipo: 'Primaria', fecha: '2026-10-13', url: 'https://fred.stlouisfed.org/series/DGS10' },
  { id: 4, titulo: 'Implied ERP by month (ERPbymonth.xlsx): 4,20 % en octubre de 2026', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 5, titulo: 'Fichas y estimaciones de consenso (earningsTrend) de EME y diez comparables, 15-oct-2026 (herramientas/yahoo.mjs)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/quote/EME/analysis' },
  { id: 6, titulo: 'Form 10-Q del 2T26 (acciones en circulación a 24-jul-2026: 44.109.901; hechos posteriores: compras por ≈700 M USD)', editor: 'EMCOR Group, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-07-30', url: `${E8}/000010563426000110/eme-20260630.htm` },
  { id: 7, titulo: 'EMCOR (EME) Q2 2026 Earnings Call Transcript (cinco compras: ≈750 M USD por ≈625 M de ingresos y 105 M de EBITDA)', editor: 'The Motley Fool (vía Webull)', tipo: 'Prensa', fecha: '2026-07-30', url: 'https://www.webull.com/news/15319340250375168' },
  { id: 8, titulo: 'Form 10-K 2025: compra de Miller Electric (876,8 M USD) y venta de EMCOR UK (cobro neto 256,6 M)', editor: 'EMCOR Group, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-26', url: `${E8}/000010563426000025/eme-20251231.htm` },
  { id: 9, titulo: 'EMCOR Group (EME) earnings date: 3T26 previsto el 29-oct-2026 antes de la apertura', editor: 'Unusual Whales / Earnings Whispers', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://unusualwhales.com/stock/EME/earnings' },
  { id: 10, titulo: 'Titulares de EMCOR (dividendo de 0,40 USD de octubre, caídas por el miedo al frenazo de la IA, «Hold» por múltiplo)', editor: 'Seeking Alpha (RSS)', tipo: 'Prensa', fecha: '2026-10-15', url: 'https://seekingalpha.com/api/sa/combined/EME.xml' },
  { id: 11, titulo: 'Why EMCOR Group plunged today (−17 % tras el 3T25: guía corta tras subir un 70 % en el año)', editor: 'The Motley Fool', tipo: 'Prensa', fecha: '2025-10-30', url: 'https://www.fool.com/investing/2025/10/30/why-emcor-group-plunged-today' },
  { id: 12, titulo: 'EMCOR (EME) stock trades down, here is why (guía de 2026 por debajo de lo esperado)', editor: 'StockStory (Barchart)', tipo: 'Prensa', fecha: '2026-02-26', url: 'https://www.barchart.com/story/news/448257/emcor-eme-stock-trades-down-here-is-why' },
  { id: 13, titulo: 'EMCOR Group (EME) down 4,7 % in sector-wide rotation out of infrastructure names; down 5,2 % ahead of Q2 earnings', editor: 'Weiss Ratings', tipo: 'Prensa', fecha: '2026-07', url: 'https://weissratings.com/en/instant-news-alerts/emcor-group-inc-eme-down-5-2-do-i-close-the-trade' },
];
const comps = YH.empresas.filter((e) => e.ticker !== 'EME').map((e) => {
  const t0 = e.tendencia?.find((x) => x.periodo === '0y'), t1 = e.tendencia?.find((x) => x.periodo === '+1y');
  const crec = t0?.ventas && t1?.ventas ? r1((t1.ventas / t0.ventas - 1) * 100) : null;
  const per = e.per_ntm ?? (t1?.bpa ? r1(e.precio / t1.bpa) : null);
  return { nombre: e.nombre.replace(', Inc.', '').replace(' Corporation', ''), ticker: e.ticker, pais: 'US', capitalizacion: e.capitalizacion, ev_ventas: e.ev_ventas, ev_ebitda_ltm: e.ev_ebitda_ltm, ev_ebitda_ntm: null, per_ntm: per, crecimiento_pct: crec, margen_ebitda_pct: e.margen_ebitda_pct, roic_pct: e.roic_pct, dn_ebitda: e.dn_ebitda, fcf_yield_pct: e.fcf_yield_pct };
});
const D = {
  _estado: 'Completo. Precio de bolsa.mjs: cierre del 14-oct (la sesión del 15-oct no había cerrado; a media sesión cotiza a ≈722 USD). Comparables y consenso de Yahoo a 15-oct; objetivo de analistas de Stock Analysis.',
  identificacion: {
    nombre: 'EMCOR Group, Inc.', nombre_corto: 'EMCOR', ticker: 'EME', isin: 'US29084Q1004', mercado: 'New York Stock Exchange', indice_referencia: 'S&P 500',
    pais: 'Estados Unidos', pais_iso: 'US', sector: 'Industria', industria: 'Construcción e ingeniería (instalaciones mecánicas y eléctricas)', sede: 'Norwalk (Connecticut)', fundacion: '1994', empleados: 44000, web: 'https://www.emcorgroup.com',
    precio: BOLSA.identificacion.precio, fecha_precio: BOLSA.identificacion.fecha_precio, acciones: 44.1, capitalizacion_publicada: 32876, free_float_pct: 99.3,
    max_52s: BOLSA.identificacion.max_52s, min_52s: BOLSA.identificacion.min_52s, volumen_medio_diario: `≈ ${BOLSA.volumen_3m.importe_dia_millones.toFixed(0)} M USD/día (3 meses)`, proximos_resultados: '2026-10-29',
  },
  consenso: {
    estimaciones: [
      { periodo: '2026e', ingresos: 20336.4, ebitda: null, ebit: null, bpa: 32.99, dpa: 1.60, fuente: 'Yahoo Finance (10 analistas) [5]; Stock Analysis [2]' },
      { periodo: '2027e', ingresos: 22603.1, ebitda: null, ebit: null, bpa: 37.37, dpa: 1.60, fuente: 'Yahoo Finance (10 analistas) [5]; Stock Analysis [2]' },
    ],
    recomendaciones: { n_analistas: 10, comprar: 7, mantener: 3, vender: 0, po_medio: 1033.0, po_min: 885.0, po_max: 1200.0 },
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: { ...BOLSA.bolsa, posicion_corta_pct: null, confianza: 'Alta' },
  multiplos_historicos: {
    serie: ANIOS.map((y) => ({ anio: y, precio_cierre: BOLSA.cierres_ejercicio.find((c) => c.anio === y)?.precio_cierre ?? null, ev_ebitda_ntm: null, per_ntm: null, excluir: y === '2020' || y === '2017' })),
    confianza: 'Alta',
  },
  comparables: { empresas: comps, confianza: 'Media' },
  transacciones: {
    operaciones: [
      { fecha: '2026-07', objetivo: 'B&B, Sidney, Giles, Schmidt y Connelly Electric (cinco instaladores eléctricos)', comprador: 'EMCOR', ev: 750, ev_ventas: 1.2, ev_ebitda: 7.1, prima_pct: null, excluir: false, comentario: '≈750 M USD por ≈625 M de ingresos y 105 M de EBITDA de los 12 meses a junio de 2026, más hasta 90 M de pagos aplazados [7].' },
      { fecha: '2025-02', objetivo: 'Miller Electric Company', comprador: 'EMCOR', ev: 876.8, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Instalador eléctrico del sureste; precio con ajustes de circulante [8].' },
      { fecha: '2025-12', objetivo: 'EMCOR UK', comprador: 'OCS', ev: 256.6, ev_ventas: 0.54, ev_ebitda: null, prima_pct: null, excluir: true, comentario: 'Venta: cobro neto sobre 471 M de ingresos; negocio de mantenimiento de bajo margen (4,4 %) [8].' },
    ],
    confianza: 'Media',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'consenso', campo: 'EBITDA y EBIT de consenso y estimación de 2028', tipo: 'Complemento', intentos: '1) MarketScreener (WebFetch devuelve otra empresa); 2) Stock Analysis (solo ingresos y BPA 2026-2027); 3) Yahoo earningsTrend (solo dos ejercicios)', decision: 'Omitido; se comparan ingresos y BPA' },
    { seccion: 'bolsa', campo: 'posición corta', tipo: 'Complemento', intentos: '1) Yahoo (ficha sin el dato); 2) Stock Analysis estadísticas (no leído por tiempo); 3) NYSE (sin acceso gratuito)', decision: 'Omitido' },
    { seccion: 'transacciones', campo: 'múltiplo de la compra de Miller Electric', tipo: 'Complemento', intentos: '1) 10-K 2025 (sin EBITDA de Miller); 2) nota de la compra de diciembre de 2024 (no descargada); 3) prensa (sin cifra primaria)', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'EMCOR Group, Inc.: noticias y análisis (titulares abril-octubre de 2026, RSS)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-15', url: 'https://seekingalpha.com/api/sa/combined/EME.xml' },
  { id: 2, titulo: 'EMCOR: Hold While The Multiple Exceeds Every Year-End Level Since 2021', editor: 'Seeking Alpha (autor)', tipo: 'Foros y redes', fecha: '2026-10-15', url: 'https://seekingalpha.com/api/sa/combined/EME.xml' },
  { id: 3, titulo: 'EMCOR: The Blowout Quarter Came - And The Stock Ate All Of It', editor: 'Seeking Alpha (autor)', tipo: 'Foros y redes', fecha: '2026-07-31', url: 'https://seekingalpha.com/api/sa/combined/EME.xml' },
  { id: 4, titulo: 'Comfort Systems vs. EMCOR Group: I Was Wrong Before, But EMCOR Is Still My Buy; EMCOR: Exceptional Business But Valuation Stretched', editor: 'Seeking Alpha (autores)', tipo: 'Foros y redes', fecha: '2026-06-29', url: 'https://seekingalpha.com/api/sa/combined/EME.xml' },
];
const E = {
  _estado: 'Completo con alcance reducido: titulares y artículos de autores de Seeking Alpha; Reddit y Stocktwits no se leyeron por tiempo.',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Empeora',
    revisadas: [
      { plataforma: 'Seeking Alpha (artículos de autores)', fecha: '2026-10', n_comentarios: 5, tono: 'Dividido', resumen: 'De «negocio excepcional, valoración estirada, esperar una caída» (junio) y «el trimestre récord llegó y la acción no subió» (julio) a «mantener mientras el múltiplo supere todos los cierres de año desde 2021» (octubre); una voz alcista prefiere EMCOR a Comfort Systems por precio [2, 3, 4].' },
      { plataforma: 'Seeking Alpha (noticias de mercado)', fecha: '2026-09', n_comentarios: 6, tono: 'Negativo', resumen: 'Agosto: las empresas de climatización caen con la subida de los tipos; septiembre: «el miedo al frenazo de la IA castiga a la construcción de centros de datos», aunque UBS ve un récord de inicios de obra por los centros de datos [1].' },
    ],
    confianza: 'Baja',
  },
  fuentes: fE,
  huecos: [
    { seccion: 'sentimiento', campo: 'foros (Reddit, Stocktwits)', tipo: 'Complemento', intentos: '1) Reddit (403 desde la nube, lección); 2) Stocktwits (no consultado por tiempo); 3) MarketBeat (no consultado)', decision: 'Omitido' },
  ],
};

guarda('A', A); guarda('B', B); guarda('C', C); guarda('D', D); guarda('E', E);
console.log('Notas A-E escritas');
