// Escribe las notas A-E de Legrand (corte 2026-10-15) a partir del XBRL ESEF (cuentas-xbrl.json), los comunicados
// de resultados depositados en la AMF (2020-2026), las cuentas consolidadas 2025 (URD, cap. 8), bolsa.json,
// MarketScreener, la BDIF de la AMF, la web del grupo y foros. Cada nota cita solo con [n] de su propia lista.
// Ejecutar: node informes/legrand-2026-10-15/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const X = JSON.parse(fs.readFileSync(path.join(dir, 'cuentas-xbrl.json'), 'utf8'));
const BOLSA = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const AMF = 'https://echanges.dila.gouv.fr/OPENDATA/AMF/BWR';
const r1 = (v) => (v == null ? null : Math.round(v * 10) / 10);
const r2 = (v) => (v == null ? null : Math.round(v * 100) / 100);
const ANIOS = ['2020', '2021', '2022', '2023', '2024', '2025'];

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: '2025 full-year results (comunicado con conciliaciones de EBITDA, resultado operativo ajustado, flujo de caja libre, circulante y deuda neta)', editor: 'Legrand / AMF', tipo: 'Primaria', fecha: '2026-02-12', url: `${AMF}/2026/02/FCBWR166517_20260212.pdf` },
  { id: 2, titulo: 'Consolidated financial statements 2025 (Universal Registration Document 2025, cap. 8: cuentas auditadas y notas de segmentos, deuda, OCEANE, BPA, empleados)', editor: 'Legrand', tipo: 'Primaria', fecha: '2026-02-11', url: 'https://www.legrand.com/sites/default/files/Documents_PDF_Legrand/Finance/2025/1Y/Legrand_Consolidated_Financial_Statements_2025_1770814867.pdf' },
  { id: 3, titulo: '2026 first-half results (comunicado: ventas, EBITDA, deuda neta, circulante y flujo de caja libre a 30-jun-2026; objetivos 2026 revisados)', editor: 'Legrand / AMF', tipo: 'Primaria', fecha: '2026-07-29', url: `${AMF}/2026/07/FCBWR168887_20260729.pdf` },
  { id: 4, titulo: '2026 first-quarter results (comunicado)', editor: 'Legrand / AMF', tipo: 'Primaria', fecha: '2026-05-07', url: `${AMF}/2026/05/FCBWR167775_20260507.pdf` },
  { id: 5, titulo: 'Unaudited consolidated financial information as of March 31, 2026 (cuenta, capital, autocartera y deuda por instrumentos)', editor: 'Legrand / AMF', tipo: 'Primaria', fecha: '2026-05-07', url: `${AMF}/2026/05/FCBWR167781_20260507.pdf` },
  { id: 6, titulo: 'Results for the first nine months of 2025 (comunicado)', editor: 'Legrand / AMF', tipo: 'Primaria', fecha: '2025-11-06', url: `${AMF}/2025/11/FCBWR165369_20251106.pdf` },
  { id: 7, titulo: '2024 full-year results (comunicado con conciliaciones 2023-2024)', editor: 'Legrand / AMF', tipo: 'Primaria', fecha: '2025-02-13', url: `${AMF}/2025/02/FCBWR161489_20250213.pdf` },
  { id: 8, titulo: '2023 full-year results (comunicado con conciliaciones 2022-2023)', editor: 'Legrand / AMF', tipo: 'Primaria', fecha: '2024-02-15', url: `${AMF}/2024/02/FCBWR155156_20240215.pdf` },
  { id: 9, titulo: '2021 full-year results (comunicado con conciliaciones 2020-2021)', editor: 'Legrand / AMF', tipo: 'Primaria', fecha: '2022-02-10', url: `${AMF}/2022/02/FCBWR139649_20220210.pdf` },
  { id: 10, titulo: '2020 full-year results (comunicado con conciliaciones 2019-2020)', editor: 'Legrand / AMF', tipo: 'Primaria', fecha: '2021-02-11', url: `${AMF}/2021/02/FCBWR131713_20210211.pdf` },
  { id: 11, titulo: 'Informes financieros anuales ESEF de Legrand 2020-2025 (XBRL: cuenta, balance y flujos)', editor: 'filings.xbrl.org', tipo: 'Primaria', fecha: '2026-04-08', url: 'https://filings.xbrl.org/api/filings?filter[entity.identifier]=969500XXRPGD7HCAFA90' },
  { id: 12, titulo: '2026 Capital Markets Day (comunicado: ambiciones 2030, reparto de ventas de centros de datos, asignación de capital)', editor: 'Legrand / AMF', tipo: 'Primaria', fecha: '2026-09-28', url: `${AMF}/2026/09/FCBWR169533_20260928.pdf` },
];
const cx = Object.fromEntries(X.financieros.cuenta.map((r) => [r.periodo, r]));
const bx = Object.fromEntries(X.balance.historico.map((r) => [r.periodo, r]));
const fx = Object.fromEntries(X.flujos.historico.map((r) => [r.periodo, r]));
// De las conciliaciones de los comunicados anuales [1, 7-10]: EBITDA publicado y amortizaciones (tangibles con derechos de uso + intangibles + deterioro del fondo de comercio)
const ebitda = { 2020: 1399.7, 2021: 1650.5, 2022: 1858.9, 2023: 1961.7, 2024: 2022.4, 2025: 2217.6 };
const capex = { 2020: 155.1, 2021: 170.5, 2022: 205.7, 2023: 253.3, 2024: 239.6, 2025: 248.7 };
const dpa = { 2020: 1.42, 2021: 1.65, 2022: 1.90, 2023: 2.09, 2024: 2.20, 2025: 2.38 };
const bpaDil = { 2020: 2.53, 2021: 3.37, 2022: 3.73, 2023: 4.30, 2024: 4.423, 2025: 4.705 };
const proveedores = { 2020: 612.9, 2021: 810.5, 2022: 852.5, 2023: 936.5, 2024: 963.6, 2025: 1064.0 };
const existencias = { 2020: 837.3 };
const desinv = { 2020: 22.3, 2021: 10.2, 2022: 5.0, 2023: 1.7, 2024: 6.8, 2025: 2.7 };
const cuenta = ANIOS.map((y) => {
  const c = cx[y];
  const amort = r1(ebitda[y] - c.ebit);
  return {
    periodo: y, ingresos: c.ingresos, coste_ventas: c.coste_ventas, gastos_generales: c.gastos_generales, ebitda: ebitda[y], amortizaciones: amort, ebit: c.ebit,
    resultado_financiero: c.resultado_financiero, bai: c.bai, impuestos: c.impuestos, minoritarios: c.minoritarios, beneficio_neto: c.beneficio_neto,
    gastos_financieros: c.gastos_financieros, participadas_en_ebitda: null, no_recurrentes_en_ebitda: y === '2022' ? null : null,
    bpa: bpaDil[y], dpa: dpa[y], dpa_extraordinario: 0, acciones_diluidas: r1(c.beneficio_neto / bpaDil[y]),
  };
});
const historico = ANIOS.map((y) => {
  const b = bx[y];
  return {
    periodo: y, activo_total: b.activo_total, activo_corriente: b.activo_corriente, pasivo_corriente: b.pasivo_corriente, pasivo_total: b.pasivo_total,
    fondo_comercio: b.fondo_comercio, intangibles: b.intangibles, inmovilizado_material: b.inmovilizado_material, existencias: b.existencias ?? existencias[y],
    clientes: b.clientes, proveedores: proveedores[y], activos_contrato: null, pasivos_contrato: null, caja: b.caja, deuda_financiera: b.deuda_financiera,
    arrendamientos: 0, patrimonio_neto: b.patrimonio_neto, minoritarios: b.minoritarios, reservas: b.reservas ?? null,
  };
});
const flujos = ANIOS.map((y) => {
  const f = fx[y];
  return {
    periodo: y, flujo_operativo: f.flujo_operativo, capex: capex[y], pagos_arrendamientos: f.pagos_arrendamientos ?? (y === '2020' ? 74 : 72),
    adquisiciones: f.adquisiciones ?? null, desinversiones: desinv[y], dividendos: f.dividendos, recompras: f.recompras, emision_acciones: f.emision_acciones ?? 0, intereses_en_financiacion: 0,
  };
});

const A = {
  _estado: 'completo',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 10106.6, ebitda: 2350.7, ebit: 1908.0, beneficio_neto: 1314.7, bpa: 4.96, dpa: 2.38, dpa_extraordinario: 0, fcf: 1317.5, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [
      { periodo: '2024', descripcion: 'Compras por 1.510 M (MSS, ZPE Systems, Enovation, Netrack, Davenham, Vass, UPSistemas; APP y Power Bus Way solo en balance al cierre) [7, 1]' },
      { periodo: '2025', descripcion: 'Compras por 1.314 M (APP, Power Bus Way, Performation, CRS, Linkk, Amperio, Quitérios, Cogelec y Avtron, esta con 2 meses en la cuenta y entera en el balance) [1]' },
    ],
    comentario: null, ajustes: null, confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '4T24', ingresos: 2419.9, crecimiento_pct: null, crecimiento_organico_pct: 6.2, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: null },
      { periodo: '1T25', ingresos: 2277.8, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 1.111, vs_consenso: null },
      { periodo: '2T25', ingresos: 2496.5, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: null },
      { periodo: '3T25', ingresos: 2197.1, crecimiento_pct: null, crecimiento_organico_pct: 6.7, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: 'Inferior' },
      { periodo: '4T25', ingresos: 2509.2, crecimiento_pct: 3.7, crecimiento_organico_pct: 6.2, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: null },
      { periodo: '1T26', ingresos: 2537.6, crecimiento_pct: 11.4, crecimiento_organico_pct: 9.3, ebitda: 588.7, margen_ebitda_pct: 23.2, bpa: 1.264, vs_consenso: null },
      { periodo: '2T26', ingresos: 2862.7, crecimiento_pct: 14.7, crecimiento_organico_pct: 10.4, ebitda: 673.9, margen_ebitda_pct: 23.5, bpa: null, vs_consenso: null },
    ],
    ultima_presentacion: null, confianza: 'Media',
  },
  balance: {
    historico,
    vencimientos: [
      { anio: '2026', importe: 1013.4 }, { anio: '2027', importe: 355 }, { anio: '2028', importe: 475 }, { anio: '2029', importe: 700 }, { anio: '2030', importe: 600 }, { anio: '2031', importe: 600 }, { anio: '2032+', importe: 2300 },
    ],
    liquidez: 'Caja 1.969 M a 30-jun-2026 [3]; programas de pagarés NEU CP y NEU MTN de 1.200 M cada uno [2]; deuda bruta 7.724 M (con 432 M de arrendamientos a 31-mar) [3, 5]',
    rating: null, coste_deuda_pct: 2.9, vida_media_anios: null,
    otros_pasivos: null, comentario: null, confianza: 'Alta',
  },
  flujos: { historico: flujos, comentario: null, confianza: 'Alta' },
  calidad: { auditor: null, anios_auditor: null, opinion: 'Favorable', comentario: null, senales: [], confianza: 'Media' },
  capital: { politica: null, adquisiciones: [], comentario: null, confianza: 'Alta' },
  negocio: {
    segmentos: [
      { nombre: 'Europa', descripcion: 'Europa (Francia 1.166 M en 2025): mecanismos, cuadros, cableado y control de edificios', tipo_resultado: 'EBIT', historico: [{ periodo: '2024', ingresos: 3634.0, resultado: 838.0 }, { periodo: '2025', ingresos: 3834.1, resultado: 864.8 }] },
      { nombre: 'Norte y Centroamérica', descripcion: 'EE. UU. (3.647 M en 2025), Canadá y México: centros de datos, energía y edificios comerciales', tipo_resultado: 'EBIT', historico: [{ periodo: '2024', ingresos: 3504.7, resultado: 661.4 }, { periodo: '2025', ingresos: 4012.3, resultado: 821.5 }] },
      { nombre: 'Resto del mundo', descripcion: 'Asia-Pacífico, India, Oriente Medio, África y Sudamérica', tipo_resultado: 'EBIT', historico: [{ periodo: '2024', ingresos: 1510.2, resultado: 276.6 }, { periodo: '2025', ingresos: 1634.2, resultado: 276.0 }] },
    ],
    geografias: [
      { nombre: 'Estados Unidos', peso_pct: 39.2 }, { nombre: 'Europa', peso_pct: 38.0 }, { nombre: 'Asia-Pacífico', peso_pct: 12.6 }, { nombre: 'Sudamérica', peso_pct: 3.7 }, { nombre: 'África y Oriente Medio', peso_pct: 3.5 }, { nombre: 'Canadá y México', peso_pct: 3.0 },
    ],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Centros de datos (% de las ventas)', valor_anterior: '≈20 % (2024, proforma)', valor_actual: '26 % (2025); 32 % (1S26)', variacion: '+6 pp en 2025', comentario: '2.400 M en 2025 frente a 700 M en 2020; crecimiento orgánico > 30 % en el 1S26 [1, 3, 7]' },
      { kpi: 'Transición energética y digital (% de las ventas)', valor_anterior: 'n.d.', valor_actual: '53 % (2025)', variacion: null, comentario: 'Centros de datos, transición energética y vida digital [1]' },
      { kpi: 'Crecimiento orgánico', valor_anterior: '+1,0 % (2024)', valor_actual: '+7,7 % (2025); +9,8 % (1S26)', variacion: '+6,7 pp', comentario: 'EE. UU. +17 % en 2025 y +26,7 % en el 1S26 [1, 3, 7]' },
      { kpi: 'Margen operativo ajustado', valor_anterior: '20,5 % (2024)', valor_actual: '20,7 % (2025); 20,8 % (1S26)', variacion: '+0,2 pp', comentario: 'Objetivo 2026: 20,5-21,0 %; 2027-2030: 21-22 % de media [1, 3, 12]' },
      { kpi: 'Flujo de caja libre / ventas', valor_anterior: '14,9 % (2024)', valor_actual: '14,0 % (2025)', variacion: '−0,9 pp', comentario: 'Conversión del 107 % del beneficio neto [1]' },
      { kpi: 'Ventas anuales de las compras anunciadas', valor_anterior: '≈500 M (7 compras en 2025)', valor_actual: '≈450 M (7 compras en 2026 hasta julio)', variacion: null, comentario: '[1, 3]' },
    ],
  },
  fuentes: fA, huecos: [],
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: '2026 Capital Markets Day (centros de datos 32 % de las ventas; desglose por oferta; ambiciones 2030)', editor: 'Legrand / AMF', tipo: 'Primaria', fecha: '2026-09-28', url: `${AMF}/2026/09/FCBWR169533_20260928.pdf` },
  { id: 2, titulo: '2025 full-year results (centros de datos 2.400 M, 26 % de las ventas; compras de 2025)', editor: 'Legrand / AMF', tipo: 'Primaria', fecha: '2026-02-12', url: `${AMF}/2026/02/FCBWR166517_20260212.pdf` },
  { id: 3, titulo: "Data Center Physical Infrastructure Market Forecast to Reach $120 Billion by 2030", editor: "Dell'Oro Group", tipo: 'Sectorial', fecha: '2026-08-19', url: 'https://www.delloro.com/news/data-center-physical-infrastructure-market-forecast-to-reach-120-billion-by-2030/' },
  { id: 4, titulo: 'Data Center Physical Infrastructure Market Reaches $10.9 Billion in 4Q 2025, Up 20 Percent Y/Y', editor: "Dell'Oro Group", tipo: 'Sectorial', fecha: '2026-03-19', url: 'https://www.delloro.com/news/data-center-physical-infrastructure-market-reaches-10-9-billion-in-4q-2025-up-20-percent-y-y/' },
  { id: 5, titulo: 'Energy and AI, resumen ejecutivo', editor: 'Agencia Internacional de la Energía', tipo: 'Sectorial', fecha: '2025-04', url: 'https://www.iea.org/reports/energy-and-ai/executive-summary' },
  { id: 6, titulo: 'Análisis value de Schneider Electric del repositorio (cuentas 2025)', editor: 'Repositorio analisis-inversion', tipo: 'Analistas', fecha: '2026-10-14', url: 'informes/schneider-electric-2026-10-14/datos-v2.json' },
  { id: 7, titulo: 'Análisis value de ABB del repositorio (cuentas 2025, Rotork)', editor: 'Repositorio analisis-inversion', tipo: 'Analistas', fecha: '2026-10-15', url: 'informes/abb-2026-10-15/datos.json' },
  { id: 8, titulo: 'Análisis value de Eaton del repositorio (cuentas 2025, comparables y transacciones a 14-oct-2026)', editor: 'Repositorio analisis-inversion', tipo: 'Analistas', fecha: '2026-10-15', url: 'informes/eaton-2026-10-15/datos.json' },
  { id: 9, titulo: 'Notas del análisis de Hubbell del repositorio (cuentas 2025 del 10-K)', editor: 'Repositorio analisis-inversion', tipo: 'Analistas', fecha: '2026-10-15', url: 'informes/hubbell-2026-10-15/notas/A.json' },
  { id: 10, titulo: 'Análisis value de Vertiv del repositorio (cuentas 2025)', editor: 'Repositorio analisis-inversion', tipo: 'Analistas', fecha: '2026-10-07', url: 'informes/vertiv-2026-10-07/datos-v4.json' },
  { id: 11, titulo: '2026 first-half results (Europa −2,4 % orgánico; EE. UU. +26,7 %; 7 compras)', editor: 'Legrand / AMF', tipo: 'Primaria', fecha: '2026-07-29', url: `${AMF}/2026/07/FCBWR168887_20260729.pdf` },
  { id: 12, titulo: 'Legrand vise 18 milliards d’euros de revenus en 2030, le titre bondit', editor: 'ABC Bourse', tipo: 'Prensa', fecha: '2026-09-29', url: 'https://www.abcbourse.com/marches/legrand-vise-18-milliards-d-euros-de-revenus-en-2030-le-titre-bondit-de-plus-de_703319' },
];
const B = {
  _estado: 'completo',
  sector: {
    definicion: null,
    tamano: "≈ 39.600 M EUR (44.400 M USD) en 2025 de infraestructura física de centros de datos, estimación implícita en la previsión de Dell'Oro de 120.000 M USD en 2030 con TCAC del 22 % [3, 4]",
    unidad_serie: 'millones de EUR (USD a 1,1208)',
    serie: [ { anio: '2025', tamano: 39600 }, { anio: '2026e', tamano: 48400 }, { anio: '2027e', tamano: 59000 }, { anio: '2028e', tamano: 71900 }, { anio: '2029e', tamano: 87800 }, { anio: '2030e', tamano: 107100 } ],
    tcac_historico_pct: null, tcac_previsto_pct: 22, cr5_pct: null, estructura: 'Moderadamente concentrada',
    drivers: [], porter: [], ciclo: { posicion: 'Expansión', comentario: null }, regulacion: null, tendencias: null, confianza: 'Media',
  },
  competencia: {
    cuota_pct: 6.1,
    posicion: null,
    competidores: [
      { nombre: 'Schneider Electric', pais: 'Francia', ticker: 'SU', ingresos: 40000, cuota_pct: null, margen_ebit_pct: 18.8, comentario: 'Número uno mundial en distribución eléctrica de baja tensión y gestión de energía; el rival más directo en Europa y en centros de datos [6]' },
      { nombre: 'ABB (Electrification)', pais: 'Suiza', ticker: 'ABBN', ingresos: 29640, cuota_pct: null, margen_ebit_pct: 18.2, comentario: 'Cuadros, interruptores y celdas de media tensión; ventas del grupo convertidas de 33.220 M USD [7]' },
      { nombre: 'Eaton', pais: 'Irlanda/EE. UU.', ticker: 'ETN', ingresos: 24490, cuota_pct: null, margen_ebit_pct: 18.8, comentario: 'Distribución eléctrica y SAI en EE. UU.; compró Boyd Thermal (refrigeración líquida); grupo convertido de 27.448 M USD [8]' },
      { nombre: 'Vertiv', pais: 'EE. UU.', ticker: 'VRT', ingresos: 9127, cuota_pct: null, margen_ebit_pct: 17.9, comentario: 'SAI, distribución de energía y refrigeración para centros de datos; convertido de 10.230 M USD [10]' },
      { nombre: 'Hubbell', pais: 'EE. UU.', ticker: 'HUBB', ingresos: 5215, cuota_pct: null, margen_ebit_pct: 20.7, comentario: 'Material eléctrico y de red en EE. UU.; competidor de Legrand en mecanismos y canalizaciones; convertido de 5.845 M USD [9]' },
    ],
    foso: { veredicto: 'Amplio', tendencia: 'Estable', fuentes: [] },
    amenazas: null, confianza: 'Media',
  },
  historia: { resumen: null, hitos: [], confianza: 'Media' },
  esg: { calificaciones: [], materialidad: null, controversias: null, confianza: 'Baja' },
  fuentes: fB, huecos: [],
};
guarda('B', B);

// ---------------------------------------------------------------- C. Equipo y gobierno
const BDIF = 'https://bdif.amf-france.org/back/api/v1/documents';
const fC = [
  { id: 1, titulo: "Conseil d'administration (composición, cargos, comités y fechas de nombramiento)", editor: 'Legrand', tipo: 'Primaria', fecha: '2026-10', url: 'https://www.legrand.com/fr/node/2693' },
  { id: 2, titulo: 'Assemblée Générale Mixte du 27 mai 2026: résultat du vote des résolutions', editor: 'Legrand', tipo: 'Primaria', fecha: '2026-05-27', url: 'https://www.legrand.com/sites/default/files/Documents_PDF_Legrand/Finance/2026/AG/Re%CC%81sultat%20Des%20Votes_1779896941.pdf' },
  { id: 3, titulo: 'Declaraciones de operaciones de directivos de Legrand (BDIF, tipo DD, 2025-2026)', editor: 'AMF', tipo: 'Primaria', fecha: '2026-08-25', url: 'https://bdif.amf-france.org/back/api/v1/informations?RechercheTexte=LEGRAND&TypesInformation=DD&From=0&Size=40' },
  { id: 4, titulo: 'Déclaration de franchissement de seuils: Massachusetts Financial Services baja del 5 % (13-jul-2026)', editor: 'AMF', tipo: 'Primaria', fecha: '2026-07-17', url: `${BDIF}/2026/226C1077/E503A2E6718071633506D2603D2EFCC026639B7CD8CBBA82DA529C3B602D88CA.pdf` },
  { id: 5, titulo: 'Déclaration de franchissement de seuils: FIL Limited baja del 5 % (25-jul-2025)', editor: 'AMF', tipo: 'Primaria', fecha: '2025-07-30', url: 'https://echanges.dila.gouv.fr/OPENDATA/AMF/307/8888/01/FC307592721_20250811.pdf' },
  { id: 6, titulo: 'Description of the share buyback program (capital y autocartera a 22-may-2026)', editor: 'Legrand / AMF', tipo: 'Primaria', fecha: '2026-05-27', url: `${AMF}/2026/05/FCBWR168035_20260527.pdf` },
  { id: 7, titulo: '2026 first-quarter results (renovación de consejeros; 80 % independientes, 60 % mujeres)', editor: 'Legrand / AMF', tipo: 'Primaria', fecha: '2026-05-07', url: `${AMF}/2026/05/FCBWR167775_20260507.pdf` },
  { id: 8, titulo: '2023 full-year results (objetivos 2024)', editor: 'Legrand / AMF', tipo: 'Primaria', fecha: '2024-02-15', url: `${AMF}/2024/02/FCBWR155156_20240215.pdf` },
  { id: 9, titulo: '2024 full-year results (objetivos 2025 y cumplimiento de 2024)', editor: 'Legrand / AMF', tipo: 'Primaria', fecha: '2025-02-13', url: `${AMF}/2025/02/FCBWR161489_20250213.pdf` },
  { id: 10, titulo: '2021 full-year results (objetivos 2022)', editor: 'Legrand / AMF', tipo: 'Primaria', fecha: '2022-02-10', url: `${AMF}/2022/02/FCBWR139649_20220210.pdf` },
  { id: 11, titulo: '2025 full-year results (cumplimiento de 2025, objetivos 2026 y 2030)', editor: 'Legrand / AMF', tipo: 'Primaria', fecha: '2026-02-12', url: `${AMF}/2026/02/FCBWR166517_20260212.pdf` },
  { id: 12, titulo: '2026 first-half results (objetivos 2026 revisados al alza)', editor: 'Legrand / AMF', tipo: 'Primaria', fecha: '2026-07-29', url: `${AMF}/2026/07/FCBWR168887_20260729.pdf` },
];
const C = {
  _estado: 'completo',
  directivos: {
    equipo: [
      { nombre: 'Benoît Coquart', cargo: 'Consejero delegado (Directeur Général)', desde: '2018', participacion_pct: null, trayectoria: 'En Legrand desde 1997; dirigió Francia y la estrategia antes de suceder a Gilles Schnepp en febrero de 2018. Con él las ventas pasaron de 5.997 M (2018) a 9.481 M (2025) y los centros de datos de 700 M (2020) a 2.400 M (2025), con el margen ajustado en el 20-21 % [11].' },
      { nombre: 'Franck Lemery', cargo: 'Director financiero', desde: '2019', participacion_pct: null, trayectoria: 'Presenta las ambiciones 2030 del día del inversor de 2026 (margen 21-22 %, flujo libre 13-15 % de las ventas) [3].' },
      { nombre: 'Angeles Garcia-Poveda', cargo: 'Presidenta no ejecutiva del consejo', desde: '2020', participacion_pct: null, trayectoria: 'Consejera desde 2012 y presidenta desde el 1-jul-2020; compró acciones en enero y agosto de 2026 [1, 3].' },
      { nombre: 'Brian DiBella', cargo: 'Presidente y consejero delegado de Norte y Centroamérica', desde: null, participacion_pct: null, trayectoria: 'Responsable de la región que más crece (47 % de las ventas del 1S26, +24 % orgánico) y de la estrategia de centros de datos presentada en Singapur [12].' },
    ],
    historial_guidance: [
      { anio: '2022', guia: 'Ventas a tipo de cambio constante +5 % a +11 %; margen ajustado ≈20 %', real: 'Crecimiento orgánico de dos dígitos y margen ajustado del 20,4 % (1.701,5 M sobre 8.339 M)', cumplida: 'Sí' },
      { anio: '2024', guia: 'Crecimiento de ventas de un dígito bajo; margen antes de compras 20,0-20,8 %', real: '+3,9 % sin divisa; margen ajustado 20,5 %', cumplida: 'Sí' },
      { anio: '2025', guia: 'Ventas sin divisa +6 % a +10 % (elevada en julio a +10 % a +12 %); margen 20,5-21,0 %', real: '+12,8 % sin divisa (orgánico +7,7 %, compras +5,1 %); margen 20,7 %', cumplida: 'Sí' },
      { anio: '2026', guia: 'Ventas sin divisa +10 % a +15 % (julio: +16 % a +19 %, orgánico +8 % a +10 %); margen 20,5-21,0 %', real: '1S26: +17 % sin divisa, orgánico +9,8 %, margen 20,8 %', cumplida: 'Parcial' },
    ],
    comentario: null, confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Angeles Garcia-Poveda', cargo: 'Presidenta', tipo: 'Otro externo', desde: '2012', comisiones: 'Compromisos y RSC' },
      { nombre: 'Benoît Coquart', cargo: 'Consejero delegado', tipo: 'Ejecutivo', desde: '2020', comisiones: '—' },
      { nombre: 'Isabelle Boccon-Gibod', cargo: 'Consejera independiente coordinadora', tipo: 'Independiente', desde: '2016', comisiones: 'Auditoría (presidenta); Compromisos y RSC; Nombramientos y Gobierno' },
      { nombre: 'Jean-Marc Chéry', cargo: 'Consejero', tipo: 'Independiente', desde: '2021', comisiones: 'Compromisos y RSC (presidente); Nombramientos y Gobierno (presidente)' },
      { nombre: 'Valérie Chort', cargo: 'Consejera', tipo: 'Independiente', desde: '2023', comisiones: 'Auditoría; Compromisos y RSC; Remuneraciones' },
      { nombre: 'Patrick Koller', cargo: 'Consejero', tipo: 'Independiente', desde: '2018', comisiones: 'Remuneraciones (presidente); Nombramientos y Gobierno' },
      { nombre: 'Rekha Mehrotra Menon', cargo: 'Consejera', tipo: 'Independiente', desde: '2024', comisiones: 'Nombramientos y Gobierno' },
      { nombre: 'Florent Menegaux', cargo: 'Consejero', tipo: 'Independiente', desde: '2022', comisiones: 'Auditoría; Nombramientos y Gobierno' },
      { nombre: 'Stéphane Pallez', cargo: 'Consejera', tipo: 'Independiente', desde: '2025', comisiones: 'Remuneraciones; Compromisos y RSC' },
      { nombre: 'Clare Scherrer', cargo: 'Consejera', tipo: 'Independiente', desde: '2023', comisiones: 'Auditoría' },
      { nombre: 'Sophie Bourdais', cargo: 'Consejera en representación de los empleados', tipo: 'Otro externo', desde: '2020', comisiones: 'Remuneraciones' },
      { nombre: 'Licia Nicodemi', cargo: 'Consejera en representación de los empleados', tipo: 'Otro externo', desde: '2026', comisiones: 'Auditoría' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: true, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: null, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 96.99, voto_remuneracion_contra_pct: 3.01, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: null,
    remuneracion: null,
    accionistas: [
      { nombre: 'Massachusetts Financial Services (MFS)', pct: 4.99, tipo: 'Gestora (cuenta de clientes)', variacion: 'Bajó del 5 % el 13-jul-2026 vendiendo en mercado [4]' },
      { nombre: 'FIL Limited (Fidelity)', pct: 4.99, tipo: 'Gestora', variacion: 'Subió al 5,17 % en jun-2025 y volvió al 4,99 % el 25-jul-2025 [5]' },
      { nombre: 'Autocartera', pct: 0.23, tipo: 'Autocartera', variacion: '612.319 acciones a 22-may-2026 (881.204 a 31-mar) para planes de acciones [6]' },
    ],
    insiders: [
      { fecha: '2026-08-18', persona: 'Angeles Garcia-Poveda (presidenta)', operacion: 'Compra', acciones: 100, importe: 0.01 },
      { fecha: '2026-08-03', persona: 'Franck Lemery (director financiero)', operacion: 'Venta', acciones: 2730, importe: 0.36 },
      { fecha: '2026-03-04', persona: 'Valérie Chort (consejera)', operacion: 'Compra', acciones: 800, importe: 0.11 },
      { fecha: '2026-02-17', persona: 'Benoît Coquart (consejero delegado)', operacion: 'Venta', acciones: 8395, importe: 1.25 },
      { fecha: '2026-02-16', persona: 'Franck Lemery (director financiero)', operacion: 'Venta', acciones: 3536, importe: 0.53 },
      { fecha: '2026-01-12', persona: 'Isabelle Boccon-Gibod (consejera)', operacion: 'Compra', acciones: 108, importe: 0.01 },
      { fecha: '2026-01-09', persona: 'Angeles Garcia-Poveda (presidenta)', operacion: 'Compra', acciones: 850, importe: 0.11 },
    ],
    control_y_defensas: null,
    alertas: [],
    confianza: 'Media',
  },
  fuentes: fC, huecos: [],
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de LR.PA, ^FCHI y EXH4.DE (precio, rango, volumen, betas, volatilidad, cierres de ejercicio) hasta el 15-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/quote/LR.PA/history' },
  { id: 2, titulo: 'Legrand: estimaciones 2026-2028 (ventas, EBITDA, EBIT ajustado, beneficio, BPA, dividendo, deuda neta, flujo libre)', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-15', url: 'https://www.marketscreener.com/quote/stock/LEGRAND-16719/finances/' },
  { id: 3, titulo: 'Legrand: consenso de analistas (18, «Outperform», objetivo medio 169,22 EUR, máximo 200, mínimo 120)', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-15', url: 'https://www.marketscreener.com/quote/stock/LEGRAND-16719/consensus/' },
  { id: 4, titulo: 'Rendimiento del Bund a 10 años (3,45 % el 15-oct-2026), serie BBSIS', editor: 'Deutsche Bundesbank', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://api.statistiken.bundesbank.de/rest/data/BBSIS/D.I.ZST.ZI.EUR.S1311.B.A604.R10XX.R.A.A._Z._Z.A?format=csv&lastNObservations=5&lang=en' },
  { id: 5, titulo: 'Tipos de cambio de referencia del euro (1,1208 USD por EUR, 15-oct-2026)', editor: 'Banco Central Europeo', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml' },
  { id: 6, titulo: 'Implied ERP by month (ERPbymonth.xlsx): 4,20 % en octubre de 2026', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 7, titulo: 'Análisis value de Eaton del repositorio: comparables (MarketScreener y Stock Analysis llevados al 14-oct) y transacciones del sector', editor: 'Repositorio analisis-inversion', tipo: 'Analistas', fecha: '2026-10-15', url: 'informes/eaton-2026-10-15/datos.json' },
  { id: 8, titulo: 'Análisis value de ABB del repositorio: compra de Rotork', editor: 'Repositorio analisis-inversion', tipo: 'Analistas', fecha: '2026-10-15', url: 'informes/abb-2026-10-15/datos.json' },
  { id: 9, titulo: 'Legrand: après un gros accident de parcours, Legrand peut-il redevenir la valeur chérie des investisseurs? (caída del 12,2 % del 6-nov-2025)', editor: 'BFM Bourse / Tradingsat', tipo: 'Prensa', fecha: '2025-11-16', url: 'https://www.tradingsat.com/legrand-FR0010307819/actualites/legrand-apres-un-gros-accident-de-parcours-legrand-peut-il-redevenir-la-valeur-cherie-des-investisseurs-a-la-bourse-de-paris-1150310.html' },
  { id: 10, titulo: 'Legrand: noticias (subidas de AlphaValue el 6-oct, BofA el 9-sep, Deutsche Bank el 3-sep, RBC el 3-ago; día del inversor 29-sep)', editor: 'MarketScreener', tipo: 'Prensa', fecha: '2026-10-15', url: 'https://www.marketscreener.com/quote/stock/LEGRAND-16719/news/' },
  { id: 11, titulo: 'Legrand vise 18 milliards d’euros de revenus en 2030, le titre bondit (y objetivos de RBC y Deutsche Bank de 160 EUR)', editor: 'ABC Bourse', tipo: 'Prensa', fecha: '2026-09-29', url: 'https://www.abcbourse.com/marches/legrand-vise-18-milliards-d-euros-de-revenus-en-2030-le-titre-bondit-de-plus-de_703319' },
  { id: 12, titulo: 'Noticias de ETN en Seeking Alpha (RSS): «AI slowdown fears hammer data-center power and construction stocks» (14-sep-2026)', editor: 'Seeking Alpha', tipo: 'Prensa', fecha: '2026-10-14', url: 'https://seekingalpha.com/api/sa/combined/ETN.xml' },
  { id: 13, titulo: 'Legrand reprend du terrain suite à un relèvement d’objectif chez RBC (pérdida del 4 % en un mes por dudas sobre el auge de la IA)', editor: 'Option Finance', tipo: 'Prensa', fecha: '2026-07-03', url: 'https://www.optionfinance.fr/info-financiere-en-continu/d/2026-07-03-legrand-reprend-du-terrain-suite-a-un-relevement-dobjectif-chez-rbc.html' },
  { id: 14, titulo: '2026 first-half results (calendario: resultados de nueve meses el 5-nov-2026)', editor: 'Legrand / AMF', tipo: 'Primaria', fecha: '2026-07-29', url: `${AMF}/2026/07/FCBWR168887_20260729.pdf` },
  { id: 15, titulo: 'Action Legrand: l’une des plus fortes baisses du CAC 40 (5 y 7-oct-2026, con Schneider; tensión en la deuda francesa)', editor: 'Idéal Investisseur', tipo: 'Prensa', fecha: '2026-10-08', url: 'https://www.ideal-investisseur.fr/actions-b/action-legrand-lune-des-plus-fortes-baisses-du-cac-40-le-titre-lache-2/26757.html' },
];
const usd = 1.1208;
const comps = [
  ['Schneider Electric', 'SU', 'FR', 171834, 3.88, 17.4, 15.1, 24.2, 14, 22.8, 13.96, 1.5, 4],
  ['ABB', 'ABBN', 'CH', 178158, 4.89, 23.2, 19.5, 27.3, 16, 20.7, 25.12, 0.25, 3.1],
  ['Eaton', 'ETN', 'IE', 159247, 5.99, 27.9, 21.4, 29.2, 19.9, 21.5, 15.8, 3.1, 2.5],
  ['nVent Electric', 'NVT', 'IE', 25599, 5.67, 25.7, 18.9, 30.1, 33.6, 21.7, 11.93, 1.56, 3.2],
  ['Hubbell', 'HUBB', 'US', 25535, 4.72, 19.2, 15.9, 24.1, 16.4, 24.2, 13.6, 1.3, 4.1],
  ['Vertiv', 'VRT', 'US', 87617, 7.64, 34.2, 19.7, 28.3, 18.5, 22.3, 28.9, -0.1, 3.3],
  ['Trane Technologies', 'TT', 'IE', 105718, 4.81, 23.8, 20.3, 28.3, 12.9, 20.1, 26.58, 0.67, 3.5],
  ['Johnson Controls', 'JCI', 'IE', 94014, 4.11, 22.5, 18.6, 25.9, 10.2, 16.9, 12.79, 2.38, 3.9],
].map(([nombre, ticker, pais, capUsd, ev_ventas, ev_ebitda_ltm, ev_ebitda_ntm, per_ntm, crecimiento_pct, margen_ebitda_pct, roic_pct, dn_ebitda, fcf_yield_pct]) => ({ nombre, ticker, pais, capitalizacion: Math.round(capUsd / usd), ev_ventas, ev_ebitda_ltm, ev_ebitda_ntm, per_ntm, crecimiento_pct, margen_ebitda_pct, roic_pct, dn_ebitda, fcf_yield_pct }));
const ops = [
  ['2025-11', 'Boyd Thermal (refrigeración líquida, EE. UU.)', 'Eaton', 9500, 5.6, 22.5],
  ['2025-03', 'Fibrebond (salas eléctricas modulares, EE. UU.)', 'Eaton', 1400, 3.7, 12.7],
  ['2025-03', 'Electrical Products Group de Avail (EE. UU.)', 'nVent', 975, 2.6, 12.5],
  ['2024-06', 'Trachte (salas de control, EE. UU.)', 'nVent', 695, 2.8, 12.0],
  ['2025-11', 'PurgeRite (servicios de refrigeración líquida)', 'Vertiv', 1000, null, 10.0],
  ['2026-09', 'UtilityInnovation Group', 'Vertiv', 1450, null, 13.0],
  ['2026-07', 'Rotork (actuadores, Reino Unido)', 'ABB', 5500, null, 20.0],
].map(([fecha, objetivo, comprador, evUsd, ev_ventas, ev_ebitda]) => ({ fecha, objetivo, comprador, ev: Math.round(evUsd / usd), ev_ventas, ev_ebitda, prima_pct: null, excluir: false, comentario: comprador === 'ABB' ? 'Valor en USD del informe de ABB, convertido [8]' : 'Del informe de Eaton del repositorio, convertido a EUR [7]' }));
const D = {
  _estado: 'completo',
  identificacion: {
    nombre: 'Legrand SA', nombre_corto: 'Legrand', ticker: 'LR', isin: 'FR0010307819', mercado: 'Euronext Paris', indice_referencia: 'CAC 40',
    pais: 'Francia', pais_iso: 'FR', sector: 'Industria', industria: 'Componentes y equipos eléctricos', sede: 'Limoges (Francia)', fundacion: '1904', empleados: 39611, web: 'https://www.legrand.com',
    precio: BOLSA.identificacion.precio, fecha_precio: BOLSA.identificacion.fecha_precio, acciones: 263.4, capitalizacion_publicada: null, free_float_pct: 99.7,
    max_52s: BOLSA.identificacion.max_52s, min_52s: BOLSA.identificacion.min_52s, volumen_medio_diario: `≈ ${String(BOLSA.volumen_3m.importe_dia_millones).replace('.', ',')} M EUR/día (3 meses)`, proximos_resultados: '2026-11-05',
  },
  consenso: {
    guidance: null,
    estimaciones: [
      { periodo: '2026e', ingresos: 11061, ebitda: 2619, ebit: 2258, bpa: 5.524, dpa: 2.696, fuente: 'MarketScreener (EBIT = resultado operativo ajustado) [2]' },
      { periodo: '2027e', ingresos: 12346, ebitda: 2969, ebit: 2586, bpa: 6.406, dpa: 3.099, fuente: 'MarketScreener [2]' },
      { periodo: '2028e', ingresos: 13463, ebitda: 3252, ebit: 2875, bpa: 7.204, dpa: 3.511, fuente: 'MarketScreener [2]' },
    ],
    recomendaciones: { n_analistas: 18, comprar: null, mantener: null, vender: null, po_medio: 169.22, po_min: 120, po_max: 200 },
    revisiones: null, base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: 0.4, confianza: 'Media',
  },
  bolsa: {
    ...BOLSA.bolsa,
    posicion_corta_pct: null,
    comentario: null,
    contexto: null,
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: BOLSA.cierres_ejercicio.filter((c) => ANIOS.includes(c.anio)).map((c) => ({ anio: c.anio, precio_cierre: c.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    comentario: null, confianza: 'Alta',
  },
  comparables: { criterio: null, empresas: comps, comentario: null, confianza: 'Media' },
  transacciones: { operaciones: ops, comentario: null, confianza: 'Media' },
  fuentes: fD, huecos: [],
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Forum Legrand (hilos de jul-oct 2026: «Évolution incompréhensible au regard du résultat», «Résultats excellents!», «Objectif croissance avec les datacenters», «Été des enfers»)', editor: 'Boursorama', tipo: 'Foros y redes', fecha: '2026-10-15', url: 'https://www.boursorama.com/bourse/forum/1rPLR/' },
  { id: 2, titulo: 'Legrand SA: noticias y análisis (RSS): «Guidance Upgrade As Data Center Offering Gets Traction» (2-oct), «Datacenter Growth, Pricing Action, And Operating Leverage Into Q2» (20-jul), «An Impressive Share Price Performance, But Stock Appears Fairly Valued» (17-abr)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-02', url: 'https://seekingalpha.com/api/sa/combined/LGRDY.xml' },
  { id: 3, titulo: 'Legrand: après un gros accident de parcours… (AlphaValue: «victime de son propre succès»)', editor: 'BFM Bourse / Tradingsat', tipo: 'Prensa', fecha: '2025-11-16', url: 'https://www.tradingsat.com/legrand-FR0010307819/actualites/legrand-apres-un-gros-accident-de-parcours-legrand-peut-il-redevenir-la-valeur-cherie-des-investisseurs-a-la-bourse-de-paris-1150310.html' },
];
const E = {
  _estado: 'completo',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Boursorama (foro de Legrand)', fecha: '2026-10', n_comentarios: 70, tono: 'Dividido', resumen: 'Doce hilos en tres meses; el más largo (27 respuestas) no entiende que la acción baje tras unos resultados récord; otros compran en las caídas y alguno pide vender tras el verano [1].' },
      { plataforma: 'Seeking Alpha (artículos de autores y transcripciones)', fecha: '2026-10', n_comentarios: 3, tono: 'Positivo', resumen: 'Los dos últimos artículos destacan la mejora de la guía y el apalancamiento operativo por los centros de datos; en abril otro la veía «justamente valorada» [2].' },
      { plataforma: 'Prensa de bolsa francesa (BFM Bourse)', fecha: '2025-11', n_comentarios: 1, tono: 'Dividido', resumen: 'Tras la caída del 12 % de noviembre, unos la ven «víctima de su propio éxito» y otros un punto de entrada [3].' },
    ],
    temas: [], lectura: null, confianza: 'Baja',
  },
  fuentes: fE, huecos: [],
};
guarda('E', E);
console.log('Notas A-E escritas.');
