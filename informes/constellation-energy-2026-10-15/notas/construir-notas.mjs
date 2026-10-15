// Escribe las notas A-E de Constellation Energy (corte 2026-10-15) a partir del XBRL de la SEC (cuentas-xbrl.json),
// los 10-K 2025 y 2023, el 10-Q del 2T26, las notas de resultados (8-K 99.1), la presentación del 31-mar-2026,
// el proxy de 2026, bolsa.mjs, Yahoo Finance, Stock Analysis y foros. Cada nota cita con [n] de su propia lista.
// Ejecutar: node notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const X = JSON.parse(fs.readFileSync(path.join(dir, 'cuentas-xbrl.json'), 'utf8'));
const BOLSA = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const E = 'https://www.sec.gov/Archives/edgar/data/1868275';
const r1 = (v) => (v == null ? null : Math.round(v * 10) / 10);
const r2 = (v) => (v == null ? null : Math.round(v * 100) / 100);
const ANIOS = ['2021', '2022', '2023', '2024', '2025'];

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Form 10-K 2025 (cuentas auditadas, nota 5 de segmentos, deuda, NDT y obligaciones de desmantelamiento, crédito fiscal nuclear)', editor: 'Constellation Energy Corp. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-24', url: `${E}/000186827526000032/ceg-20251231.htm` },
  { id: 2, titulo: 'Hechos XBRL (companyfacts): cuenta, balance y flujos 2020-2025', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0001868275.json' },
  { id: 3, titulo: 'Form 10-Q del 2T26 (balance a 30-jun-2026, compra de Calpine y asignación del precio, recompras, deuda)', editor: 'Constellation Energy Corp. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-06', url: `${E}/000186827526000104/ceg-20260630.htm` },
  { id: 4, titulo: 'Constellation Reports Second Quarter 2026 Results (8-K, anexo 99.1)', editor: 'Constellation Energy Corp. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-06', url: `${E}/000186827526000097/ceg-20260806991.htm` },
  { id: 5, titulo: 'Constellation Reports First Quarter 2026 Results (8-K, anexo 99.1)', editor: 'Constellation Energy Corp. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-05-11', url: `${E}/000186827526000063/ceg-20260511991.htm` },
  { id: 6, titulo: 'Constellation Reports Fourth Quarter and Full Year 2025 Results (8-K, anexo 99.1)', editor: 'Constellation Energy Corp. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-24', url: `${E}/000186827526000029/ceg-20260224991.htm` },
  { id: 7, titulo: 'Constellation Reports Third Quarter 2025 Results (8-K, anexo 99.1)', editor: 'Constellation Energy Corp. / SEC EDGAR', tipo: 'Primaria', fecha: '2025-11-07', url: `${E}/000186827525000089/ceg-20251107991.htm` },
  { id: 8, titulo: 'Constellation Reports Fourth Quarter and Full Year 2024 Results (8-K, anexo 99.1; BPA ajustado 2023 de 6,28 USD)', editor: 'Constellation Energy Corp. / SEC EDGAR', tipo: 'Primaria', fecha: '2025-02-18', url: `${E}/000186827525000020/` },
  { id: 9, titulo: 'Form 10-K 2023 (flujos 2021-2023, cobro del precio aplazado de la titulización de clientes, MtM no realizado por año)', editor: 'Constellation Energy Corp. / SEC EDGAR', tipo: 'Primaria', fecha: '2024-02-27', url: `${E}/000186827524000014/ceg-20231231.htm` },
  { id: 10, titulo: '2026 Business and Earnings Outlook (presentación del 31-mar-2026, 8-K anexo 99.1: guía 2026, BPA base 2026-2029, herramientas de modelo)', editor: 'Constellation Energy Corp. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-03-31', url: `${E}/000186827526000045/ceg-202603318kexh991.htm` },
];
const cx = Object.fromEntries(X.financieros.cuenta.map((r) => [r.periodo, r]));
const bx = Object.fromEntries(X.balance.historico.map((r) => [r.periodo, r]));
const fx = Object.fromEntries(X.flujos.historico.map((r) => [r.periodo, r]));
// MtM no realizado dentro de los ingresos (nota de segmentos, «Other»): pérdida = gasto positivo en no_recurrentes
const mtm = { 2021: 633, 2022: 1188, 2023: -1399, 2024: -316, 2025: 805 };
const dpa = { 2021: 0, 2022: 0.564, 2023: 1.128, 2024: 1.41, 2025: 1.551 };
const bpa = { 2021: -0.63, 2022: -0.49, 2023: 5.01, 2024: 11.89, 2025: 7.40 };
const acc = { 2021: 327, 2022: 329, 2023: 324, 2024: 315, 2025: 314 };
// Cobro del precio aplazado (DPP) de la titulización de clientes, en inversión: se suma al flujo operativo
const dpp = { 2021: 3902, 2022: 4964, 2023: 7340, 2024: 10217, 2025: 0 };
const desinv = { 2021: 878, 2022: 52, 2023: 24, 2024: 0, 2025: 0 };

const cuenta = ANIOS.map((y) => {
  const c = cx[y];
  return { periodo: y, ingresos: c.ingresos, coste_ventas: null, gastos_generales: null, ebitda: c.ebitda, amortizaciones: c.amortizaciones, ebit: c.ebit, resultado_financiero: c.resultado_financiero, bai: c.bai, impuestos: c.impuestos, minoritarios: c.minoritarios, beneficio_neto: c.beneficio_neto, gastos_financieros: c.gastos_financieros, participadas_en_ebitda: null, no_recurrentes_en_ebitda: mtm[y], bpa: bpa[y], dpa: dpa[y], dpa_extraordinario: 0, acciones_diluidas: acc[y] };
});
const historico = ANIOS.map((y) => {
  const b = bx[y];
  return { periodo: y, activo_total: b.activo_total, activo_corriente: b.activo_corriente, pasivo_corriente: b.pasivo_corriente, pasivo_total: b.pasivo_total, fondo_comercio: b.fondo_comercio ?? 0, intangibles: b.intangibles, inmovilizado_material: b.inmovilizado_material, existencias: b.existencias ?? (y === '2021' ? 1121 : y === '2022' ? 1398 : 1279), clientes: b.clientes, proveedores: b.proveedores, activos_contrato: null, pasivos_contrato: null, caja: b.caja, deuda_financiera: b.deuda_financiera, arrendamientos: 0, patrimonio_neto: b.patrimonio_neto, minoritarios: b.minoritarios, reservas: b.reservas };
});
const flujos = ANIOS.map((y) => {
  const f = fx[y];
  return { periodo: y, flujo_operativo: f.flujo_operativo + dpp[y], capex: f.capex, pagos_arrendamientos: 0, adquisiciones: f.adquisiciones ?? 0, desinversiones: desinv[y], dividendos: f.dividendos, recompras: f.recompras ?? 0, emision_acciones: 0, intereses_en_financiacion: 0 };
});

const A = {
  _estado: 'Completo. Cuentas 2021-2025 del XBRL de la SEC comprobadas con los 10-K 2025 y 2023; 2026 (con Calpine) en trimestres, LTM y puente.',
  negocio: {
    segmentos: [
      { nombre: 'Mid-Atlantic', descripcion: 'Este de PJM (Pensilvania, Maryland, Nueva Jersey): Limerick, Peach Bottom, Calvert Cliffs, Salem y Crane; venta minorista en la región', tipo_resultado: null, historico: [{ periodo: '2023', ingresos: 5138, resultado: null }, { periodo: '2024', ingresos: 5522, resultado: null }, { periodo: '2025', ingresos: 6487, resultado: null }] },
      { nombre: 'Midwest', descripcion: 'Oeste de PJM y MISO (Illinois): Braidwood, Byron, LaSalle, Dresden, Quad Cities y Clinton, con créditos del estado (CMC y ZEC)', tipo_resultado: null, historico: [{ periodo: '2023', ingresos: 4658, resultado: null }, { periodo: '2024', ingresos: 4805, resultado: null }, { periodo: '2025', ingresos: 5804, resultado: null }] },
      { nombre: 'New York', descripcion: 'Nine Mile Point, FitzPatrick y Ginna, con créditos de emisión cero (ZEC) hasta 2049', tipo_resultado: null, historico: [{ periodo: '2023', ingresos: 2021, resultado: null }, { periodo: '2024', ingresos: 2050, resultado: null }, { periodo: '2025', ingresos: 2190, resultado: null }] },
      { nombre: 'ERCOT', descripcion: 'Texas: participación en South Texas Project, gas y renovables, y venta minorista', tipo_resultado: null, historico: [{ periodo: '2023', ingresos: 1346, resultado: null }, { periodo: '2024', ingresos: 1550, resultado: null }, { periodo: '2025', ingresos: 1904, resultado: null }] },
      { nombre: 'Other Power Regions', descripcion: 'Nueva Inglaterra, sur, oeste y Canadá: sobre todo venta minorista y mayorista con energía comprada', tipo_resultado: null, historico: [{ periodo: '2023', ingresos: 5851, resultado: null }, { periodo: '2024', ingresos: 5506, resultado: null }, { periodo: '2025', ingresos: 5583, resultado: null }] },
      { nombre: 'Otros (gas, MtM no realizado)', descripcion: 'Venta de gas natural, actividades no asignadas y ganancias o pérdidas no realizadas de coberturas', tipo_resultado: null, historico: [{ periodo: '2023', ingresos: 5904, resultado: null }, { periodo: '2024', ingresos: 4135, resultado: null }, { periodo: '2025', ingresos: 3565, resultado: null }] },
    ],
    geografias: [{ nombre: 'Mid-Atlantic', peso_pct: 25.4 }, { nombre: 'Midwest', peso_pct: 22.7 }, { nombre: 'New York', peso_pct: 8.6 }, { nombre: 'ERCOT', peso_pct: 7.5 }, { nombre: 'Otras regiones', peso_pct: 21.9 }, { nombre: 'Otros (gas y MtM)', peso_pct: 13.9 }],
    geografias_criterio: 'origen',
    kpis: [
      { kpi: 'Producción nuclear (GWh, a su participación)', valor_anterior: '181.711 (2024)', valor_actual: '182.690 (2025)', variacion: '+0,5 %', comentario: 'La flota nuclear funciona casi a plena carga; el crecimiento de volumen viene de aumentos de potencia y de Crane [1].' },
      { kpi: 'Factor de carga nuclear (2T)', valor_anterior: '94,8 % (2T25)', valor_actual: '93,0 % (2T26)', variacion: '−1,8 pp', comentario: 'Más días de recarga en el 2T26 (86 frente a 41) [4].' },
      { kpi: 'Ventas totales de energía (GWh)', valor_anterior: '269.417 (2024)', valor_actual: '268.943 (2025)', variacion: '−0,2 %', comentario: 'Antes de Calpine, que suma unos 62 TWh de carga minorista al año [1, 3].' },
      { kpi: 'Margen de energía sobre combustible (RNF, M USD)', valor_anterior: '12.149 (2024)', valor_actual: '10.852 (2025)', variacion: '−10,7 %', comentario: 'Incluye el MtM no realizado (+316 en 2024, −805 en 2025); sin él, el RNF sube del 11.833 al 11.657 [1].' },
      { kpi: 'BPA ajustado (USD)', valor_anterior: '8,67 (2024)', valor_actual: '9,39 (2025)', variacion: '+8,3 %', comentario: 'Guía 2026: 11,50-12,50 USD, con Calpine; 5,30 en el 1S26 [4, 6, 8].' },
    ],
  },
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 31270, ebitda: null, ebit: 4596, beneficio_neto: 3465, bpa: 9.71, dpa: 1.663, dpa_extraordinario: 0, fcf: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [{ periodo: '2026', descripcion: 'Calpine, comprada el 7-ene-2026 por 21.835 M USD (50 M de acciones y 4.342 M en efectivo) más 12.551 M de deuda asumida: entra en la cuenta y el balance de 2026; 5.603 M de centrales mantenidas para la venta por el compromiso con el DOJ [3].' }],
    confianza: 'Media',
  },
  trimestres: {
    items: [
      { periodo: '3T24', ingresos: 6550, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 2.74, vs_consenso: null },
      { periodo: '4T24', ingresos: 5382, crecimiento_pct: -7.1, crecimiento_organico_pct: null, ebitda: 1227, margen_ebitda_pct: 22.8, bpa: 2.44, vs_consenso: null },
      { periodo: '1T25', ingresos: 6788, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 2.14, vs_consenso: null },
      { periodo: '2T25', ingresos: 6101, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 1205, margen_ebitda_pct: 19.8, bpa: 1.91, vs_consenso: null },
      { periodo: '3T25', ingresos: 6570, crecimiento_pct: 0.3, crecimiento_organico_pct: null, ebitda: 1327, margen_ebitda_pct: 20.2, bpa: 3.04, vs_consenso: null },
      { periodo: '4T25', ingresos: 6074, crecimiento_pct: 12.9, crecimiento_organico_pct: null, ebitda: 840, margen_ebitda_pct: 13.8, bpa: 2.30, vs_consenso: null },
      { periodo: '1T26', ingresos: 11122, crecimiento_pct: 63.8, crecimiento_organico_pct: null, ebitda: 2775, margen_ebitda_pct: 25.0, bpa: 2.74, vs_consenso: null },
      { periodo: '2T26', ingresos: 7504, crecimiento_pct: 23.0, crecimiento_organico_pct: null, ebitda: 1023, margen_ebitda_pct: 13.6, bpa: 2.55, vs_consenso: 'Superior' },
    ],
    confianza: 'Media',
  },
  balance: {
    historico,
    vencimientos: [{ anio: '2026', importe: 92 }, { anio: '2027', importe: 666 }, { anio: '2028', importe: 828 }, { anio: '2029', importe: 157 }, { anio: '2030', importe: 99 }, { anio: '2031+', importe: 5561 }],
    liquidez: 'Caja 697 M USD a 30-jun-2026 (380 M más restringidos); programa de pagarés de hasta 7.000 M USD respaldado por la línea de crédito; préstamo garantizado por el DOE de hasta 1.000 M USD para Crane sin disponer [1, 3].',
    rating: "S&P BBB+ y Moody's Baa1 (confirmados tras cerrar Calpine) [1, 10]",
    coste_deuda_pct: 4.6,
    vida_media_anios: null,
    confianza: 'Media',
  },
  flujos: { historico: flujos, confianza: 'Media' },
  calidad: { auditor: 'PricewaterhouseCoopers LLP', anios_auditor: 4, opinion: 'Favorable (10-K 2025)', confianza: 'Alta' },
  fuentes: fA,
  huecos: [
    { seccion: 'trimestres', campo: 'crecimiento interanual y EBITDA de 3T24, 1T25', tipo: 'Complemento', intentos: '1) Notas de resultados de 2025 y 2026 (solo dan el trimestre comparable del año anterior); 2) XBRL trimestral de companyfacts; 3) 10-Q de 2024 sin descargar por tiempo', decision: 'Omitido' },
    { seccion: 'trimestres', campo: 'consenso previo de cada trimestre (salvo 2T26)', tipo: 'Complemento', intentos: '1) Notas de resultados (no lo dan); 2) Seeking Alpha (solo titulares del 2T26: +0,27 USD sobre el consenso); 3) prensa de cada trimestre', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Form 10-K 2025 (negocio, flota, competencia, regulación de la NRC y FERC, crédito fiscal nuclear)', editor: 'Constellation Energy Corp. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-24', url: `${E}/000186827526000032/ceg-20251231.htm` },
  { id: 2, titulo: 'Electric Power Annual, tabla 1.2: ingresos de la venta de electricidad al cliente final 2015-2024', editor: 'U.S. Energy Information Administration', tipo: 'Sectorial', fecha: '2025-10', url: 'https://www.eia.gov/electricity/annual/html/epa_01_02.html' },
  { id: 3, titulo: '2024 United States Data Center Energy Usage Report (4,4 % del consumo en 2023; 6,7-12 % en 2028)', editor: 'Lawrence Berkeley National Laboratory', tipo: 'Sectorial', fecha: '2024-12', url: 'https://eta-publications.lbl.gov/sites/default/files/2024-12/lbnl-2024-united-states-data-center-energy-usage-report.pdf' },
  { id: 4, titulo: '2026 Business and Earnings Outlook (31-mar-2026): flota de 55 GW, 147 TWh nucleares sin contratar, 20 %+ de crecimiento del BPA base 2026-2029', editor: 'Constellation Energy Corp. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-03-31', url: `${E}/000186827526000045/ceg-202603318kexh991.htm` },
  { id: 5, titulo: 'Form 8-K: resultados de la subasta de capacidad de PJM 2028-2029 (325 USD/MW-día)', editor: 'Constellation Energy Corp. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-07-14', url: `${E}/000186827526000080/ceg-20260714.htm` },
  { id: 6, titulo: 'Google and Constellation Announce Landmark Agreement to Bring 890 MW of New Nuclear Capacity to PJM Grid', editor: 'Google Cloud Press Corner', tipo: 'Primaria', fecha: '2026-10-06', url: 'https://www.googlecloudpresscorner.com/2026-10-06-Google-and-Constellation-Announce-Landmark-Agreement-to-Bring-890-MW-of-New-Nuclear-Capacity-to-PJM-Grid-as-Part-of-Long-Term-Power-Deal' },
  { id: 7, titulo: 'Amazon, Constellation sign 20-year PPA to expand Maryland nuclear plant (Calvert Cliffs, 690 MW)', editor: 'Utility Dive', tipo: 'Prensa', fecha: '2026-09-30', url: 'https://utilitydive.com/news/amazon-constellation-sign-20-year-ppa-to-expand-maryland-nuclear-plant/832145' },
  { id: 8, titulo: 'Trump, governors push PJM to hold emergency auction for data center power', editor: 'Utility Dive', tipo: 'Prensa', fecha: '2026-01-16', url: 'https://www.utilitydive.com/news/trump-governors-pjm-emergency-auction-data-centers/809853/' },
  { id: 9, titulo: 'Constellation to Acquire Calpine (nota conjunta: 26.600 M USD netos, 7,9x EV/EBITDA 2026)', editor: 'Constellation Energy Corp.', tipo: 'Primaria', fecha: '2025-01-10', url: 'https://www.constellationenergy.com/newsroom/2025/constellation-to-acquire-calpine-creates-americas-leading-producer-of-clean-and-reliable-energy-to-meet-growing-demand-for-customers-and-communities.html' },
  { id: 10, titulo: 'Datos de mercado de Vistra, NRG, Talen, NextEra, PSEG, Dominion, Southern, AEP y Duke (ingresos, EBITDA y márgenes de los últimos 12 meses)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/quote/VST/' },
];
const B = {
  _estado: 'Completo con fuentes primarias de la empresa, EIA y LBNL; cuotas de mercado estimadas a partir de la generación propia.',
  historia: {
    resumen: 'Constellation nació el 1-feb-2022 como escisión del negocio de generación y comercialización de Exelon, que a su vez venía de la fusión de Exelon y Constellation Energy Group (2012). Heredó la mayor flota nuclear de EE. UU., que en 2019-2021 estuvo a punto de cerrar centrales en Illinois (Byron y Dresden) por precios bajos y que salvó una ley estatal (CMC) en 2021. El crédito fiscal nuclear de la Ley de Reducción de la Inflación (2022) puso un suelo de precio hasta 2032; en 2024 el contrato con Microsoft para reabrir Three Mile Island 1 (hoy Crane) convirtió a la empresa en la referencia de la energía para centros de datos. En enero de 2026 compró Calpine, el mayor operador de centrales de gas, y pasó a 55 GW [1, 4, 9].',
    hitos: [
      { anio: '2012', hito: 'Fusión de Exelon y Constellation Energy Group: nace la flota nuclear y el comercializador que hoy forman Constellation [1].' },
      { anio: '2021', hito: 'Illinois aprueba la ley que paga créditos (CMC) a Byron, Braidwood y Dresden y evita su cierre [1].' },
      { anio: '2022', hito: 'Escisión de Exelon (1-feb) y salida a bolsa en el Nasdaq; en agosto, la Ley de Reducción de la Inflación crea el crédito fiscal nuclear hasta 2032 [1].' },
      { anio: '2023', hito: 'Compra del 44 % de South Texas Project a NRG por 1.750 M USD [1].' },
      { anio: '2024', hito: 'Contrato de 20 años con Microsoft para reabrir Three Mile Island 1 (Crane Clean Energy Center) [1].' },
      { anio: '2025', hito: 'Contrato con Meta por la producción de Clinton desde 2027 y anuncio de la compra de Calpine (10-ene) [1, 9].' },
      { anio: '2026', hito: 'Cierra Calpine (7-ene); venta de 4,4 GW de gas a LS Power por 5.000 M USD y de Brazos Valley por 860 M por exigencia del DOJ; contratos con Amazon (Calvert Cliffs) y Google (890 MW de aumentos de potencia) [3, 6, 7].' },
    ],
    confianza: 'Alta',
  },
  negocio: {
    descripcion: 'Constellation es el mayor productor privado de electricidad del mundo y el primer operador nuclear de EE. UU.: 55 GW tras Calpine, de ellos unos 22 GW nucleares en 21 reactores (Illinois, Pensilvania, Nueva York, Maryland, Nueva Jersey y Texas), unos 23 GW de gas, la mayor flota geotérmica del país (The Geysers) e hidráulica, eólica y solar. La flota nuclear produce unos 183 TWh al año, cerca del 10 % de la energía limpia del país. Además es un gran comercializador: sirve unos 2,5 millones de cuentas, incluido el 80 % de las empresas del Fortune 100, y vende gas natural. Vende en mercados mayoristas liberalizados (PJM, ERCOT, Nueva York, MISO, California) y con contratos a largo plazo con grandes consumidores [1, 4].',
    clientes: 'Los clientes son distribuidoras, municipios, cooperativas, empresas industriales y comerciales y hogares. La novedad son los contratos de 15-20 años con tecnológicas: Microsoft (Crane, 835 MW desde 2027), Meta (Clinton, 1.121 MW desde junio de 2027), Amazon (690 MW de Calvert Cliffs, 20 años, con 190 MW de aumento de potencia en 2030-2032), Google (890 MW de aumentos de potencia en 11 reactores, 20 años, más un suministro de 2.700 MW a 15 años) y otros 920 MW con clientes con grado de inversión firmados en el 2T26. En marzo de 2026 la empresa tenía contratado a largo plazo un 25 % de su producción limpia de 2029 y 147 TWh nucleares al año todavía libres para contratar con prima [4, 6, 7]. El poder de precio se ve en esas primas: la empresa estima 20-50 USD/MWh sobre el suelo del crédito fiscal por cada GW nuclear contratado [4].',
  },
  sector: {
    definicion: 'El mercado relevante es la venta de electricidad al cliente final en EE. UU., que fija el tamaño del dinero que pasa por generadores y comercializadores: 514.396 M USD en 2024 según la EIA [2]. Constellation compite sobre todo en los mercados liberalizados (PJM, ERCOT, Nueva York, Nueva Inglaterra, California), donde el precio mayorista y la capacidad los fija una subasta. Se usa el dato de la EIA (estadística oficial) y no los informes de mercado privados; la cuota se calcula con los ingresos de la empresa sobre ese total.',
    tamano: '514.396 M USD en 2024 (ingresos de la venta al cliente final) [2]',
    unidad_serie: 'millones de USD',
    serie: [{ anio: '2019', tamano: 401738 }, { anio: '2020', tamano: 393639 }, { anio: '2021', tamano: 422323 }, { anio: '2022', tamano: 485249 }, { anio: '2023', tamano: 491370 }, { anio: '2024', tamano: 514396 }],
    tcac_historico_pct: 5.1,
    tcac_previsto_pct: 3.0,
    cr5_pct: null,
    estructura: 'Fragmentada',
    drivers: [
      { driver: 'Centros de datos e IA', efecto: '+', horizonte: 'Estructural', evidencia: 'Del 4,4 % del consumo de EE. UU. en 2023 a entre el 6,7 % y el 12 % en 2028 (325-580 TWh) [3].' },
      { driver: 'Precio de capacidad en PJM', efecto: '+', horizonte: 'Cíclico', evidencia: 'La subasta 2028-2029 cerró a 325 USD/MW-día en todas las zonas; Constellation colocó 18.875 MW [5].' },
      { driver: 'Crédito fiscal nuclear (suelo de precio)', efecto: '+', horizonte: 'Estructural', evidencia: 'Hasta 15 USD/MWh con ingresos brutos de 26-44,75 USD/MWh en 2025, ajustado por inflación hasta 2032 [1].' },
      { driver: 'Intervención política en los precios', efecto: '−', horizonte: 'Cíclico', evidencia: 'La Casa Blanca y los gobernadores de PJM pidieron en enero de 2026 una subasta de emergencia y topes al precio de capacidad [8].' },
      { driver: 'Precio del gas', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Marca el precio marginal de la electricidad: sube el margen nuclear y aprieta el diferencial de las centrales de gas [1].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Vistra, NRG, Talen y las eléctricas integradas compiten por los contratos con tecnológicas; la nuclear existente es escasa y no se puede replicar antes de 2032 [1, 4].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Las tecnológicas negocian contratos de 15-20 años con gran volumen, pero aceptan primas sobre el mercado por energía firme y limpia [4, 6].' },
      { fuerza: 'Poder de los proveedores', intensidad: 3, justificacion: 'Combustible nuclear con pocos proveedores y riesgo ruso; la empresa sube inventario. El gas es un mercado líquido [1].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Una nuclear nueva tarda más de diez años; un ciclo combinado nuevo, 4-6 años y turbinas agotadas; la flota costaría más de tres veces su valor empresa [4].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'Solar más baterías, gas detrás del contador y pequeños reactores modulares a partir de 2030; la eficiencia de los chips puede rebajar la demanda [1, 3].' },
    ],
    ciclo: { posicion: 'Expansión', comentario: 'El consumo eléctrico de EE. UU. vuelve a crecer tras quince años plano, por centros de datos, industria y electrificación [3]; los precios de capacidad de PJM pasaron de 29 USD/MW-día (2024-2025) a 325 en 2028-2029 [5]. En 2008-09 y 2020 la generación liberalizada sufrió por la caída del gas y de la demanda; Constellation no existía como cotizada, pero Exelon Generation vio caer sus márgenes y llegó a anunciar cierres nucleares en 2020 [1].' },
    regulacion: 'La NRC autoriza las licencias de los reactores (renovaciones a 60 y 80 años); FERC regula los mercados mayoristas y decide las reglas de PJM para la conexión de grandes cargas y la colocación de centros de datos junto a las centrales, todavía pendiente en octubre de 2026 (FERC rechazó el 12-oct la mayor parte del plan temporal de PJM). El crédito fiscal nuclear dura hasta 2032. Illinois (CMC hasta mayo de 2027) y Nueva York (ZEC hasta 2049) pagan créditos estatales [1, 4, 5].',
    tendencias: 'La IA ha convertido la energía firme y sin emisiones en escasa: las tecnológicas firman contratos largos con primas y financian aumentos de potencia (Google, Amazon) y reaperturas (Microsoft). La empresa gana con ello porque tiene la mayor flota nuclear existente. El riesgo es político: los gobernadores y la Casa Blanca quieren que los centros de datos paguen la nueva capacidad y no suban la factura de los hogares [6, 7, 8].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 7.0,
    posicion: '1.º productor de electricidad privado de EE. UU. y 1.º operador nuclear (≈ 22 GW de unos 97 GW del país); cuota estimada sobre los ingresos de la venta al cliente final con los ingresos de 2026 con Calpine (≈ 36.000 M USD sobre 514.396 M) [2, 4]',
    competidores: [
      { nombre: 'Vistra', pais: 'EE. UU.', ticker: 'VST', ingresos: 19212, cuota_pct: 3.7, margen_ebit_pct: null, comentario: 'Segundo nuclear liberalizado (Comanche Peak, Energy Harbor) y gran flota de gas en ERCOT y PJM; margen EBITDA del 34,6 % en los últimos 12 meses [10].' },
      { nombre: 'NRG Energy', pais: 'EE. UU.', ticker: 'NRG', ingresos: 33125, cuota_pct: 6.4, margen_ebit_pct: null, comentario: 'Comercializador con flota de gas ampliada con 13 GW de LS Power; margen EBITDA del 9,8 % [10].' },
      { nombre: 'Talen Energy', pais: 'EE. UU.', ticker: 'TLN', ingresos: 3741, cuota_pct: 0.7, margen_ebit_pct: null, comentario: 'Susquehanna (contrato con Amazon) y ciclos combinados en PJM [10].' },
      { nombre: 'NextEra Energy', pais: 'EE. UU.', ticker: 'NEE', ingresos: 28700, cuota_pct: 5.6, margen_ebit_pct: null, comentario: 'Mayor renovable del mundo y eléctrica regulada en Florida; reabre Duane Arnold con Google [10].' },
      { nombre: 'PSEG', pais: 'EE. UU.', ticker: 'PEG', ingresos: 12543, cuota_pct: 2.4, margen_ebit_pct: null, comentario: 'Socio de Constellation en Salem y Peach Bottom; red regulada en Nueva Jersey [1, 10].' },
      { nombre: 'Duke Energy', pais: 'EE. UU.', ticker: 'DUK', ingresos: 32803, cuota_pct: 6.4, margen_ebit_pct: null, comentario: 'Segunda flota nuclear del país, pero regulada (Carolinas): no vende a precio de mercado [10].' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Se amplía',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'No aplica: la electricidad no gana valor con más usuarios.' },
        { fuente: 'Costes de cambio', puntuacion: 2, evidencia: 'Contratos de 15-20 años con tecnológicas y 2,5 millones de cuentas minoristas; el cliente mayorista cambia de proveedor en cada subasta [1, 4].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 4, evidencia: 'Licencias de la NRC a 60-80 años para 21 reactores que no se pueden replicar antes de 2035; renovaciones de Ginna y Nine Mile Point 1 hasta 2049 pedidas en 2026 [1, 4].' },
        { fuente: 'Ventaja en costes', puntuacion: 4, evidencia: 'Factor de carga del 94-95 % durante años, por encima de la media del sector; coste marginal bajo y suelo de precio del crédito fiscal hasta 2032 [1].' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'Flota de 22 GW nucleares: reparte costes de recarga, combustible y seguridad; la flota completa costaría más de tres veces su valor empresa [4].' },
      ],
    },
    amenazas: 'Tres amenazas con probabilidad media: (1) que FERC y PJM fijen reglas de colocación y de conexión de grandes cargas que encarezcan o retrasen los contratos con centros de datos (la empresa tiene 5.000 MW en la cola de PJM); (2) topes políticos al precio de capacidad, como pidieron la Casa Blanca y los gobernadores en enero de 2026; (3) que la eficiencia de la IA rebaje la demanda prevista. A más largo plazo, los pequeños reactores modulares y la solar con baterías pueden competir por los contratos de 2030 en adelante [1, 3, 8].',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Los asuntos que mueven las cifras son tres: (1) la seguridad nuclear y la gestión del combustible gastado, que condicionan las licencias; (2) las emisiones de la flota de gas de Calpine, que rebajan el perfil sin emisiones (la nuclear y la geotermia siguen siendo la mayor parte de la producción) y exponen a un precio del carbono; (3) el desmantelamiento: 12.612 M USD de obligaciones cubiertos por 20.492 M en fondos de desmantelamiento a 30-jun-2026 [1, 3].',
    controversias: 'Demandas por la tormenta Uri (Texas, febrero de 2021): el Supremo de Texas rechazó los recursos de los demandantes en marzo y julio de 2026 y las reclamaciones contra los generadores se archivan [1]. Sin sanciones relevantes de la NRC en tres años en las fuentes revisadas.',
    confianza: 'Media',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'esg', campo: 'calificaciones ESG', tipo: 'Complemento', intentos: '1) Informe de sostenibilidad (no publica sus notas); 2) MSCI y Sustainalytics (de pago o con JavaScript); 3) prensa', decision: 'Omitido' },
    { seccion: 'sector', campo: 'cr5_pct', tipo: 'Complemento', intentos: '1) EIA (no da cuotas por empresa en ingresos); 2) 10-K (sin cuota); 3) suma de ingresos de los cinco mayores (mezcla negocios regulados y liberalizados)', decision: 'Omitido' },
    { seccion: 'competencia', campo: 'margen EBIT de los competidores', tipo: 'Complemento', intentos: '1) Yahoo (solo margen EBITDA); 2) Stock Analysis (bloqueo a curl); 3) cuentas de cada uno, no leídas por tiempo', decision: 'Omitido; se da el margen EBITDA en el comentario' },
  ],
};

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Proxy statement 2026 (DEF 14A): consejo, comités, remuneración, accionistas del 5 %', editor: 'Constellation Energy Corp. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-03-19', url: `${E}/000155278126000140/e26004_ceg-def14a.htm` },
  { id: 2, titulo: 'Form 8-K 5.07: resultados de la junta del 28-abr-2026', editor: 'Constellation Energy Corp. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-05-01', url: `${E}/000186827526000050/ceg-20260428.htm` },
  { id: 3, titulo: 'Constellation Announces Board Chairman Transition and New Board Appointment (8-K, anexo 99.1)', editor: 'Constellation Energy Corp. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-05', url: `${E}/000186827526000089/ceg-202608058kexh991.htm` },
  { id: 4, titulo: 'Form 8-K 5.02: cambios en la dirección al cierre de Calpine (Shane Smith, director financiero)', editor: 'Constellation Energy Corp. / SEC EDGAR', tipo: 'Primaria', fecha: '2025-11-21', url: `${E}/000186827525000107/ceg-20251121.htm` },
  { id: 5, titulo: 'Form 4 presentados entre el 15-oct-2025 y el 15-oct-2026 (herramienta form4.mjs)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001868275&type=4' },
  { id: 6, titulo: 'Form 8-K: oferta secundaria de 11 M de acciones de los antiguos accionistas de Calpine y recompra de 2 M por la empresa', editor: 'Constellation Energy Corp. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-06-02', url: `${E}/000110465926069482/tm2616531d1_8k.htm` },
  { id: 7, titulo: 'Notas de resultados 4T24-2T26 y presentación del 31-mar-2026 (guías y resultados)', editor: 'Constellation Energy Corp. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-06', url: `${E}/000186827526000097/ceg-20260806991.htm` },
  { id: 8, titulo: 'Form 10-Q del 2T26 (nota 2: acciones de Calpine sujetas a bloqueo hasta el 30-jun-2026 y el 30-jun-2027)', editor: 'Constellation Energy Corp. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-06', url: `${E}/000186827526000104/ceg-20260630.htm` },
];
const C = {
  _estado: 'Completo con proxy 2026, 8-K de la junta y de cambios en el consejo, y Form 4.',
  directivos: {
    equipo: [
      { nombre: 'Joseph Dominguez', cargo: 'Presidente del consejo (desde ago-2026) y consejero delegado', desde: '2022', participacion_pct: 0.05, trayectoria: 'Abogado; antes consejero delegado de ComEd y responsable de asuntos regulatorios de Exelon. Desde la escisión, el BPA ajustado pasó de 6,28 USD (2023) a 9,39 (2025) y la acción multiplicó por cuatro hasta 2025 [1, 7].' },
      { nombre: 'Shane Smith', cargo: 'Director financiero', desde: '2026', participacion_pct: null, trayectoria: 'Antes vicepresidente de Tesorería y Crédito; asumió el cargo al cerrar Calpine (enero de 2026), con la integración y la venta de activos exigida por el DOJ [4].' },
      { nombre: 'Daniel Eggers', cargo: 'Vicepresidente ejecutivo sénior de Finanzas y Economía de los Datos', desde: '2022', participacion_pct: null, trayectoria: 'Director financiero de 2022 a 2025; ahora lleva los contratos con centros de datos [4].' },
      { nombre: 'Bryan Hanson', cargo: 'Director general de Generación', desde: '2022', participacion_pct: null, trayectoria: 'Responsable de la flota nuclear, con factores de carga del 94-95 % [1].' },
      { nombre: 'James McHugh', cargo: 'Director comercial', desde: '2022', participacion_pct: null, trayectoria: 'Lleva la comercialización mayorista y minorista [1].' },
    ],
    historial_guidance: [
      { anio: '2023', guia: 'EBITDA ajustado 2.900-3.300 M USD', real: '4.025 M USD', cumplida: 'Sí' },
      { anio: '2024', guia: 'BPA ajustado 8,00-8,40 USD (tras dos subidas)', real: '8,67 USD', cumplida: 'Sí' },
      { anio: '2025', guia: 'BPA ajustado 8,90-9,60 USD', real: '9,39 USD', cumplida: 'Sí' },
      { anio: '2026', guia: 'BPA ajustado 11,00-12,00 USD (31-mar), subida a 11,50-12,50 (6-ago)', real: '5,30 USD en el 1S26', cumplida: 'Parcial' },
    ],
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      { nombre: 'Joseph Dominguez', cargo: 'Presidente y consejero delegado', tipo: 'Ejecutivo', desde: '2022', comisiones: null },
      { nombre: 'Charles L. Harrington', cargo: 'Consejero independiente coordinador', tipo: 'Independiente', desde: '2022', comisiones: 'Auditoría y Riesgos' },
      { nombre: 'Robert J. Lawless', cargo: 'Consejero (presidente hasta ago-2026)', tipo: 'Independiente', desde: '2022', comisiones: 'Gobierno Corporativo' },
      { nombre: 'Yves C. de Balmann', cargo: 'Consejero', tipo: 'Independiente', desde: '2022', comisiones: 'Remuneración (presidente)' },
      { nombre: 'Bradley M. Halverson', cargo: 'Consejero', tipo: 'Independiente', desde: '2022', comisiones: 'Auditoría y Riesgos (presidente)' },
      { nombre: 'Julie Holzrichter', cargo: 'Consejera', tipo: 'Independiente', desde: '2022', comisiones: 'Auditoría y Riesgos' },
      { nombre: 'Dhiaa M. Jamil', cargo: 'Consejero', tipo: 'Independiente', desde: '2023', comisiones: 'Remuneración' },
      { nombre: 'Ashish Khandpur', cargo: 'Consejero', tipo: 'Independiente', desde: '2022', comisiones: 'Remuneración' },
      { nombre: 'Eileen P. Paterson', cargo: 'Consejera', tipo: 'Independiente', desde: '2024', comisiones: 'Gobierno Corporativo' },
      { nombre: 'John M. Richardson', cargo: 'Consejero', tipo: 'Independiente', desde: '2022', comisiones: 'Auditoría y Riesgos' },
      { nombre: 'Nneka L. Rimmer', cargo: 'Consejera', tipo: 'Independiente', desde: '2022', comisiones: 'Auditoría y Riesgos' },
      { nombre: 'Roger Crandall', cargo: 'Consejero', tipo: 'Independiente', desde: '2026', comisiones: null },
    ],
    presidente_ceo_separados: false, presidente_ejecutivo: true, consejero_coordinador: true, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false, accionista_control: false, presidente_vinculado_control: false,
    cambios_cupula_24m: 1, voto_remuneracion_pct: 94.2, voto_remuneracion_contra_pct: 5.3, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 17.12, fijo: 1.48, variable_corto: 2.65, variable_largo: 12.1, ratio_salario_medio: 140 },
    remuneracion: 'El primer ejecutivo cobró 17,1 M USD en 2025: 1,48 M de fijo, 2,65 M de variable anual y 12,1 M en acciones; 140 veces el empleado mediano (122.610 USD). El variable a largo plazo son acciones de desempeño ligadas en un 67 % al flujo de caja libre antes de crecimiento y en un 33 % a la rentabilidad total relativa al accionista; el resto, acciones restringidas. Exige tener seis veces el sueldo en acciones. La junta de abril de 2026 aprobó la remuneración con un 94,2 % a favor y un 5,3 % en contra [1, 2].',
    accionistas: [
      { nombre: 'The Vanguard Group', pct: 11.7, tipo: 'Institucional', variacion: 'Según 13G (marzo de 2026)' },
      { nombre: 'BlackRock', pct: 7.2, tipo: 'Institucional', variacion: 'Según 13G' },
      { nombre: 'ECP ControlCo (antiguos accionistas de Calpine)', pct: 7.0, tipo: 'Capital privado', variacion: 'Recibió acciones por Calpine en enero de 2026; los vendedores colocaron 11 M de acciones en junio de 2026 (la empresa recompró 2 M) y el resto del bloqueo vence el 30-jun-2027 [6, 8]' },
      { nombre: 'State Street', pct: 5.7, tipo: 'Institucional', variacion: 'Según 13G' },
      { nombre: 'Capital International Investors', pct: 5.5, tipo: 'Institucional', variacion: 'Según 13G' },
    ],
    insiders: [{ fecha: '2026-08-11', persona: 'Roger W. Crandall (consejero)', operacion: 'Compra', acciones: 1500, importe: 0.42 }],
    control_y_defensas: 'Sin accionista de control: el mayor es Vanguard (11,7 %). Una sola clase de acciones, consejeros elegidos cada año. Desde agosto de 2026 el consejero delegado es también presidente, con un consejero independiente coordinador (Charles Harrington, que tuvo un 10 % de votos en contra en la junta de abril, el más alto del consejo). El riesgo para el minoritario no es de control sino de oferta: los antiguos dueños de Calpine (ECP y coinversores) recibieron 50 M de acciones; la mitad quedó libre el 30-jun-2026 y la otra mitad lo estará el 30-jun-2027 [1, 2, 3, 8].',
    alertas: ['Concentración de poder desde agosto de 2026: el consejero delegado pasa a presidir el consejo [3].', 'Oferta pendiente de acciones de los antiguos accionistas de Calpine (bloqueo hasta el 30-jun-2027 para la segunda mitad) [8].'],
    confianza: 'Alta',
  },
  fuentes: fC,
  huecos: [{ seccion: 'gobierno', campo: 'posición actual de ECP tras la colocación de junio', tipo: 'Complemento', intentos: '1) Proxy 2026 (22,0 M a marzo); 2) 8-K de la colocación (no da el reparto por vendedor); 3) búsqueda de 13G/A posteriores (no localizado)', decision: 'Omitido; se da la cifra del proxy' }],
};

// ---------------------------------------------------------------- D. Mercado y valoración
const COMPS = fs.readFileSync(path.join(dir, 'comparables-yahoo.jsonl'), 'utf8').trim().split('\n').map((l) => JSON.parse(l));
const NOMBRES = { VST: ['Vistra', 'US'], NRG: ['NRG Energy', 'US'], TLN: ['Talen Energy', 'US'], NEE: ['NextEra Energy', 'US'], PEG: ['PSEG', 'US'], D: ['Dominion Energy', 'US'], SO: ['Southern Company', 'US'], AEP: ['American Electric Power', 'US'], DUK: ['Duke Energy', 'US'] };
const w0 = 2.5 / 12; // meses que quedan de 2026 en los próximos 12
const empresas = COMPS.filter((c) => c.s !== 'CEG').map((c) => {
  const epsN = w0 * c.eps0 + (1 - w0) * c.eps1;
  const revN = w0 * c.rev0 + (1 - w0) * c.rev1;
  return {
    nombre: NOMBRES[c.s][0], ticker: c.s, pais: NOMBRES[c.s][1], capitalizacion: Math.round(c.mcap / 1e6), ev_ventas: r2(c.ev_rev), ev_ebitda_ltm: r1(c.ev_ebitda), ev_ebitda_ntm: null,
    per_ntm: r1(c.precio / epsN), crecimiento_pct: r1((revN / (c.rev ?? c.revprev) - 1) * 100), margen_ebitda_pct: r1(c.ebitda_m * 100), roic_pct: null,
    dn_ebitda: r1((c.debt - c.cash) / c.ebitda), fcf_yield_pct: r1((c.fcf / c.mcap) * 100),
  };
});
const pers = empresas.map((e) => e.per_ntm).sort((a, b) => a - b);
const medianaPer = pers.length % 2 ? pers[(pers.length - 1) / 2] : (pers[pers.length / 2 - 1] + pers[pers.length / 2]) / 2;

const fD = [
  { id: 1, titulo: 'Históricos diarios de CEG, SPY y XLU (precio, rango, rentabilidades, beta, volatilidad, cierres de ejercicio) con bolsa.mjs', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/CEG/history/' },
  { id: 2, titulo: 'Constellation Energy (CEG) Stock Forecast: estimaciones de BPA e ingresos, precio objetivo y recomendaciones (S&P Global)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-07', url: 'https://stockanalysis.com/stocks/ceg/forecast/' },
  { id: 3, titulo: 'Yahoo Finance quoteSummary de CEG y comparables (consenso de BPA e ingresos 2026-2027, tendencia de 90 días, objetivos, valor empresa, posición corta)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/quote/CEG/analysis/' },
  { id: 4, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026: 4,20 %', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 5, titulo: 'Rentabilidad del bono del Tesoro a 10 años (DGS10): 5,21 % el 13-oct-2026', editor: 'FRED, Federal Reserve Bank of St. Louis', tipo: 'Datos de mercado', fecha: '2026-10-13', url: 'https://fred.stlouisfed.org/series/DGS10' },
  { id: 6, titulo: 'Constellation to Acquire Calpine (26.600 M USD netos; 7,9x EV/EBITDA 2026)', editor: 'Constellation Energy Corp.', tipo: 'Primaria', fecha: '2025-01-10', url: 'https://www.constellationenergy.com/newsroom/2025/constellation-to-acquire-calpine-creates-americas-leading-producer-of-clean-and-reliable-energy-to-meet-growing-demand-for-customers-and-communities.html' },
  { id: 7, titulo: 'NRG to acquire LS Power portfolio (8-K, anexo 99.1: 12.000 M USD, 7,5x EV/EBITDA 2026)', editor: 'NRG Energy / SEC EDGAR', tipo: 'Primaria', fecha: '2025-05-12', url: 'https://www.sec.gov/Archives/edgar/data/1013871/000110465925047007/tm2514561d1_ex99-1.htm' },
  { id: 8, titulo: 'Talen to acquire Freedom and Guernsey (3.500 M USD netos, 6,7x EV/EBITDA 2026)', editor: 'American Public Power Association', tipo: 'Prensa', fecha: '2025-07-17', url: 'https://www.publicpower.org/node/27947' },
  { id: 9, titulo: 'Form 10-Q del 2T26, nota 2 (ventas a LS Power: 4,4 GW por 5.000 M USD y Brazos Valley por 860 M)', editor: 'Constellation Energy Corp. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-06', url: `${E}/000186827526000104/ceg-20260630.htm` },
  { id: 10, titulo: 'Notas de resultados 4T24 a 2T26 (BPA ajustado de 2023, 2024 y 2025)', editor: 'Constellation Energy Corp. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-06', url: `${E}/000186827526000097/ceg-20260806991.htm` },
  { id: 11, titulo: 'Constellation Energy stock falls after 2026 guidance misses (consenso 2026 de 11,72 USD)', editor: 'Investing.com', tipo: 'Prensa', fecha: '2026-03-31', url: 'https://www.investing.com/news/stock-market-news/constellation-energy-stock-falls-after-2026-guidance-misses-93CH-4590883' },
  { id: 12, titulo: 'Why Constellation Energy Stock Is Tumbling Today (Citigroup rebaja el objetivo de 348 a 297 USD)', editor: 'The Motley Fool', tipo: 'Prensa', fecha: '2026-07-01', url: 'https://www.fool.com/investing/2026/07/01/why-constellation-energy-stock-is-tumbling-today/' },
  { id: 13, titulo: 'Why Constellation Energy Stock Slumped in March (−15,3 % en marzo; IPC de electricidad; retraso posible de Crane)', editor: 'The Motley Fool', tipo: 'Prensa', fecha: '2026-04-08', url: 'https://www.fool.com/investing/2026/04/08/why-constellation-energy-stock-slumped-in-march/' },
  { id: 14, titulo: 'Constellation Energy Stock Fell 13% Last Week (acciones de Calpine que llegan al mercado, 9-18 sep)', editor: 'Yahoo Finance', tipo: 'Prensa', fecha: '2026-09-21', url: 'https://finance.yahoo.com/markets/stocks/articles/constellation-energy-stock-fell-13-073132457.html' },
  { id: 15, titulo: 'Why is Constellation Energy stock sliding today? (FERC aplaza cinco meses la compra de respaldo de PJM)', editor: 'Investing.com', tipo: 'Prensa', fecha: '2026-09-30', url: 'https://www.investing.com/news/stock-market-news/why-is-constellation-energy-stock-sliding-today-93CH-4925601' },
  { id: 16, titulo: 'Trump, governors push PJM to hold emergency auction for data center power', editor: 'Utility Dive', tipo: 'Prensa', fecha: '2026-01-16', url: 'https://www.utilitydive.com/news/trump-governors-pjm-emergency-auction-data-centers/809853/' },
  { id: 17, titulo: 'Titulares de CEG (Google +12 % el 6-oct; FERC rechaza el plan temporal de PJM el 12-oct; acuerdo con Shell de 715 M el 10-sep)', editor: 'Seeking Alpha (RSS)', tipo: 'Prensa', fecha: '2026-10-15', url: 'https://seekingalpha.com/api/sa/combined/CEG.xml' },
  { id: 18, titulo: 'Constellation Energy Stock: Why It Fell 32% While the Story Got Better (Argus 350→325)', editor: 'Top1Markets', tipo: 'Prensa', fecha: '2026-08-17', url: 'https://www.top1markets.com/news/constellation-energy-stock' },
];
const b = BOLSA.bolsa;
const D = {
  _estado: 'Completo. Precio del 14-oct-2026 (la sesión del 15-oct no había cerrado a la hora del análisis, 16:40 UTC).',
  identificacion: {
    nombre: 'Constellation Energy Corporation', nombre_corto: 'Constellation Energy', ticker: 'CEG', isin: 'US21037T1097', mercado: 'Nasdaq Global Select', indice_referencia: 'S&P 500',
    pais: 'Estados Unidos', pais_iso: 'US', sector: 'Suministros públicos', industria: 'Productores independientes de electricidad', sede: 'Baltimore (Maryland)', fundacion: '2022', empleados: null, web: 'https://www.constellationenergy.com',
    precio: BOLSA.identificacion.precio, fecha_precio: BOLSA.identificacion.fecha_precio, acciones: 354.3, capitalizacion_publicada: 97279, free_float_pct: 99.7,
    max_52s: BOLSA.identificacion.max_52s, min_52s: BOLSA.identificacion.min_52s, volumen_medio_diario: '≈ 858 M USD/día (3 meses)', proximos_resultados: '2026-11-09',
  },
  consenso: {
    estimaciones: [
      { periodo: '2026e', ingresos: 36046, ebitda: null, ebit: null, bpa: 12.14, dpa: 1.71, fuente: 'Yahoo Finance (19 analistas en BPA, 13 en ingresos; BPA ajustado) [3]' },
      { periodo: '2027e', ingresos: 37290, ebitda: null, ebit: null, bpa: 13.31, dpa: 1.88, fuente: 'Yahoo Finance (19 analistas; hace 90 días 13,58) [3]' },
    ],
    recomendaciones: { n_analistas: 23, comprar: 19, mantener: 3, vender: 1, po_medio: 336.6, po_min: 238, po_max: 395 },
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    tipo_rentabilidad: b.tipo_rentabilidad,
    rentabilidades: b.rentabilidades,
    anual: b.anual,
    beta: b.beta, volatilidad_pct: b.volatilidad_pct, max_drawdown_pct: b.max_drawdown_pct, posicion_corta_pct: 3.3,
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: [
      { anio: '2022', precio_cierre: 86.21, ev_ebitda_ntm: null, per_ntm: 13.7, excluir: false },
      { anio: '2023', precio_cierre: 116.89, ev_ebitda_ntm: null, per_ntm: 13.5, excluir: false },
      { anio: '2024', precio_cierre: 223.71, ev_ebitda_ntm: null, per_ntm: 23.8, excluir: false },
      { anio: '2025', precio_cierre: 353.27, ev_ebitda_ntm: null, per_ntm: 29.1, excluir: false },
    ],
    confianza: 'Media',
  },
  comparables: { empresas, confianza: 'Media' },
  transacciones: {
    operaciones: [
      { fecha: '2025-01', objetivo: 'Calpine (≈ 27 GW de gas y geotermia, comercializador)', comprador: 'Constellation Energy', ev: 26600, ev_ventas: null, ev_ebitda: 7.9, prima_pct: null, excluir: false, comentario: 'Valor neto tras la caja generada hasta el cierre y los créditos fiscales; 21.835 M de precio contable más 12.551 M de deuda asumida [6].' },
      { fecha: '2025-05', objetivo: 'Cartera de LS Power (13 GW de gas y CPower)', comprador: 'NRG Energy', ev: 12000, ev_ventas: null, ev_ebitda: 7.5, prima_pct: null, excluir: false, comentario: 'Unos 50 % del coste de construir de nuevo, según NRG [7].' },
      { fecha: '2025-07', objetivo: 'Freedom y Guernsey (ciclos combinados en PJM)', comprador: 'Talen Energy', ev: 3500, ev_ventas: null, ev_ebitda: 6.7, prima_pct: null, excluir: false, comentario: 'Precio neto de créditos fiscales; 3.800 M brutos [8].' },
      { fecha: '2026-03', objetivo: '4,4 GW de gas en Delaware y Pensilvania (venta exigida por el DOJ)', comprador: 'LS Power', ev: 5000, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Unos 1.140 USD/kW; cierre previsto antes de fin de 2026 [9].' },
      { fecha: '2026-08', objetivo: 'Brazos Valley (606 MW de gas en ERCOT)', comprador: 'LS Power', ev: 860, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Unos 1.420 USD/kW; cerrada el 14-oct-2026 [9, 17].' },
    ],
    confianza: 'Media',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'consenso', campo: 'estimaciones de 2028 y EBITDA del consenso', tipo: 'Complemento', intentos: '1) Stock Analysis (2028 de pago); 2) MarketScreener (WebFetch devuelve la portada); 3) Yahoo (solo dos ejercicios)', decision: 'Omitido' },
    { seccion: 'multiplos_historicos', campo: 'historia anterior a 2022', tipo: 'Complemento', intentos: '1) La empresa cotiza desde la escisión de febrero de 2022; 2) Exelon (otro perímetro); 3) BPA ajustado de 2022 no publicado (la empresa daba EBITDA ajustado)', decision: 'Omitido; historia de cuatro cierres' },
    { seccion: 'transacciones', campo: 'múltiplo de EBITDA de las ventas a LS Power', tipo: 'Complemento', intentos: '1) 10-Q del 2T26 (solo precio); 2) notas de resultados; 3) prensa', decision: 'Se dan en USD/kW' },
  ],
};

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Titulares y artículos de autores sobre CEG (agosto-octubre de 2026)', editor: 'Seeking Alpha (RSS)', tipo: 'Foros y redes', fecha: '2026-10-15', url: 'https://seekingalpha.com/api/sa/combined/CEG.xml' },
  { id: 2, titulo: 'Mensajes de CEG (12-15 oct 2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-15', url: 'https://api.stocktwits.com/api/2/streams/symbol/CEG.json' },
  { id: 3, titulo: 'Constellation Energy Stock is Down 25% in 2026. A June FERC Filing Could Signal a Recovery.', editor: 'TIKR', tipo: 'Foros y redes', fecha: '2026-07-27', url: 'https://www.tikr.com/blog/constellation-energy-stock-fell-41-a-june-ferc-filing-could-signal-a-recovery' },
  { id: 4, titulo: 'Constellation Energy: Premium Company At A Premium Price / A More Attractive Entry Point Into The Nuclear Power Boom', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-09-30', url: 'https://seekingalpha.com/article/4950743-constellation-energy-premium-company-at-a-premium-price' },
];
const Ent = {
  _estado: 'Completo. Reddit da 403; se leen Seeking Alpha, Stocktwits y comentarios de mercado.',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Seeking Alpha (artículos de autores)', fecha: '2026-09', n_comentarios: 9, tono: 'Positivo', resumen: 'Mayoría alcista: «escasez que el mercado infravalora», «la máquina de caja nuclear despierta», «entrada más atractiva»; una minoría ve «empresa premium a precio premium» [1, 4].' },
      { plataforma: 'Seeking Alpha (noticias)', fecha: '2026-10', n_comentarios: 12, tono: 'Dividido', resumen: 'Subidas con Google (+12 %) y Amazon; caídas con las decisiones de FERC sobre PJM y con la corrección de los valores de IA [1].' },
      { plataforma: 'Stocktwits', fecha: '2026-10', n_comentarios: 30, tono: 'Dividido', resumen: '17 de 30 mensajes marcados alcistas, pero el tono es de decepción: «se cerró el hueco de Google», «todo lo de IA sufre», objetivos técnicos de 245-250 y de 300 [2].' },
      { plataforma: 'Comentarios de mercado (TIKR)', fecha: '2026-07', n_comentarios: 3, tono: 'Positivo', resumen: 'La caída se explica por la incertidumbre de las reglas de PJM, que congeló contratos con tecnológicas; si FERC decide, se cerraría el descuento [3].' },
    ],
    temas: [
      { tema: 'Reglas de PJM y FERC para centros de datos', postura: 'Dividida', peso: 'Alto', contraste: 'Es el riesgo central: FERC rechazó el 12-oct gran parte del plan temporal de PJM y aplazó el 30-sep la compra de respaldo; los contratos de Amazon y Google se firmaron igualmente.' },
      { tema: 'Acciones de los vendedores de Calpine', postura: 'Bajista', peso: 'Medio', contraste: 'Real: 11 M colocadas en junio y venta en el mercado en septiembre; el resto del bloqueo vence el 30-jun-2027.' },
      { tema: 'Burbuja de la IA', postura: 'Dividida', peso: 'Alto', contraste: 'La acción se mueve con los valores de IA (caída del 9-oct), aunque el beneficio de 2026 depende sobre todo de precios mayoristas, capacidad y Calpine.' },
      { tema: 'Valoración tras la caída', postura: 'Alcista', peso: 'Medio', contraste: 'A 21x el BPA de 2027 sigue por encima de las eléctricas (16-18x) y de Vistra (15x).' },
    ],
    lectura: null,
    confianza: 'Media',
  },
  fuentes: fE,
  huecos: [],
};

guarda('A', A); guarda('B', B); guarda('C', C); guarda('D', D); guarda('E', Ent);
console.log('Notas A-E escritas. Mediana PER NTM comparables:', r1(medianaPer), empresas.map((e) => `${e.ticker} ${e.per_ntm}`).join(', '));
