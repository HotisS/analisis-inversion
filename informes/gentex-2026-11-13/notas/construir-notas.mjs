// Escribe las notas A-E de Gentex (GNTX, corte 2026-11-13) a partir de los documentos de EDGAR descargados en notas/docs,
// del XBRL de la SEC (cuentas-xbrl.json), de bolsa.json (Yahoo) y de comparables-yahoo.json. Sin subagentes.
// Cada nota cita solo con [n] de su propia lista de fuentes. Ejecutar: node notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const lee = (f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const X = lee('cuentas-xbrl.json');
const BO = lee('bolsa.json');
const CY = lee('comparables-yahoo.json');
const r1 = (v) => (v == null ? null : Math.round(v * 10) / 10);
const r2 = (v) => (v == null ? null : Math.round(v * 100) / 100);
const EDGAR = 'https://www.sec.gov/Archives/edgar/data/355811';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Form 10-K 2025 (cuentas anuales auditadas, segmentos, clientes, VOXX)', editor: 'Gentex Corporation (SEC)', tipo: 'Primaria', fecha: '2026-02-24', url: `${EDGAR}/000035581126000010/gntx-20251231.htm` },
  { id: 2, titulo: 'Form 10-Q 3T26 (balance a 30-sep-2026, flujos de nueve meses, inversiones tecnológicas, IEEPA, línea de crédito)', editor: 'Gentex Corporation (SEC)', tipo: 'Primaria', fecha: '2026-11-06', url: `${EDGAR}/000035581126000065/gntx-20260930.htm` },
  { id: 3, titulo: 'Gentex Reports Second Quarter 2026 Financial Results (8-K, anexo 99.1)', editor: 'Gentex Corporation (SEC)', tipo: 'Primaria', fecha: '2026-07-24', url: `${EDGAR}/000035581126000044/exhibit99106302026.htm` },
  { id: 4, titulo: 'Gentex Reports First Quarter 2026 Financial Results (8-K, anexo 99.1)', editor: 'Gentex Corporation (SEC)', tipo: 'Primaria', fecha: '2026-04-24', url: `${EDGAR}/000035581126000021/exhibit99103312026.htm` },
  { id: 5, titulo: 'Gentex Reports Fourth Quarter and Calendar Year 2025 Results (8-K, anexo 99.1)', editor: 'Gentex Corporation (SEC)', tipo: 'Primaria', fecha: '2026-01-30', url: `${EDGAR}/000035581126000005/exhibit99112312025.htm` },
  { id: 6, titulo: 'Gentex Reports Third Quarter 2025 Financial Results (8-K, anexo 99.1)', editor: 'Gentex Corporation (SEC)', tipo: 'Primaria', fecha: '2025-10-24', url: `${EDGAR}/000035581125000047/exhibit99109302025.htm` },
  { id: 7, titulo: 'Gentex Reports Second Quarter 2025 Financial Results (8-K, anexo 99.1)', editor: 'Gentex Corporation (SEC)', tipo: 'Primaria', fecha: '2025-07-25', url: `${EDGAR}/000035581125000037/exhibit99106302025.htm` },
  { id: 8, titulo: 'Gentex Reports First Quarter 2025 Financial Results (8-K, anexo 99.1)', editor: 'Gentex Corporation (SEC)', tipo: 'Primaria', fecha: '2025-04-25', url: `${EDGAR}/000035581125000026/exhibit99103312025.htm` },
  { id: 9, titulo: 'Form 10-K 2023 (segmentos 2021-2023)', editor: 'Gentex Corporation (SEC)', tipo: 'Primaria', fecha: '2024-02-22', url: `${EDGAR}/000035581124000011/gntx-20231231.htm` },
  { id: 10, titulo: 'XBRL companyfacts de Gentex (CIK 355811): cuenta, balance y flujos 2016-2025', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0000355811.json' },
  { id: 11, titulo: 'Gentex Announces Closing of VOXX International Acquisition (8-K, anexo 99.1)', editor: 'Gentex Corporation (SEC)', tipo: 'Primaria', fecha: '2025-04-01', url: `${EDGAR}/000035581125000013/exhibit991412025.htm` },
  { id: 12, titulo: 'Gentex Reports Third Quarter 2026 Financial Results (8-K, anexo 99.1): ventas, márgenes, guía 2026 y 2027', editor: 'Gentex Corporation (SEC)', tipo: 'Primaria', fecha: '2026-10-23', url: `${EDGAR}/000035581126000060/exhibit99109302026.htm` },
  { id: 13, titulo: 'Gentex Q3 2026 earnings call transcript (preguntas de UBS, JPMorgan, Baird, BNP Paribas, Goldman Sachs, B. Riley y Morningstar)', editor: 'Earnings Whispers', tipo: 'Prensa', fecha: '2026-10-23', url: 'https://www.earningswhispers.com/transcript/GNTX/Q32026' },
  { id: 14, titulo: 'Form 10-Q 2T26 (balance a 30-jun-2026)', editor: 'Gentex Corporation (SEC)', tipo: 'Primaria', fecha: '2026-08-04', url: `${EDGAR}/000035581126000048/gntx-20260630.htm` },
];

const noRec = { 2024: 10.8, 2025: 18.3 }; // 2024: deterioro Vaporsens 8,9 + costes de compra 1,9; 2025: indemnizaciones 11,6 + costes de compra 3,8 + revalorización de existencias de VOXX 2,9 [1]
const cuenta = X.financieros.cuenta.map((c) => ({
  ...c, fin: undefined,
  minoritarios: c.minoritarios ?? 0,
  no_recurrentes_en_ebitda: noRec[c.periodo] ?? null,
  participadas_en_ebitda: null, dpa_extraordinario: 0,
}));
cuenta.forEach((c) => delete c.fin);
const balance = X.balance.historico.map((b) => {
  const o = { ...b };
  delete o.fin;
  o.deuda_financiera = b.deuda_financiera ?? 0;
  o.arrendamientos = 0; // US GAAP: arrendamientos operativos (≤ 9 M) ya dentro del EBITDA; no van a la deuda
  o.minoritarios = b.minoritarios ?? 0;
  o.activos_contrato = null; o.pasivos_contrato = null;
  return o;
});
const flujos = X.flujos.historico.map((f) => {
  const o = { ...f };
  delete o.fin;
  o.adquisiciones = f.adquisiciones ?? 0;
  o.pagos_arrendamientos = 0;
  o.intereses_en_financiacion = 0;
  return o;
});

const seg = (nombre, descripcion, filas) => ({ nombre, descripcion, tipo_resultado: 'EBIT', historico: filas.map(([periodo, ingresos, resultado]) => ({ periodo, ingresos, resultado })) });
const A = {
  _estado: 'Completa. Cuenta, balance y flujos del XBRL de la SEC comprobados con el 10-K 2025 y el 10-Q 3T26.',
  negocio: {
    segmentos: [
      seg('Automoción', 'Espejos retrovisores electrocrómicos interiores y exteriores, Full Display Mirror, HomeLink, monitorización del conductor y de la cabina (DMS/ICMS), dispositivos de atenuación (viseras, techos) y, desde abr-2025, la electrónica de automoción de VOXX.', [['2021', 1697.2, 414.2], ['2022', 1874.7, 372.5], ['2023', 2254.7, 495.7], ['2024', 2264.7, 476.2], ['2025', 2255.9, 491.0]]),
      seg('Audio premium', 'Klipsch, Onkyo e Integra (Premium Audio Company, de VOXX desde el 1-abr-2025): altavoces, receptores y barras de sonido.', [['2021', 0, 0], ['2022', 0, 0], ['2023', 0, 0], ['2024', 0, 0], ['2025', 151.3, 8.3]]),
      seg('Otros', 'Ventanillas atenuables de avión, protección contra incendios, médico, biometría (EyeLock, BioConnect), posventa y electrónica de consumo de VOXX.', [['2021', 34.0, -4.4], ['2022', 44.2, -2.5], ['2023', 44.6, 0.1], ['2024', 48.6, -16.5], ['2025', 127.1, -25.4]]),
    ],
    geografias: [
      { nombre: 'EE. UU.', peso_pct: 34.8 }, { nombre: 'Japón', peso_pct: 14.9 }, { nombre: 'Alemania', peso_pct: 9.6 },
      { nombre: 'México', peso_pct: 7.2 }, { nombre: 'Corea', peso_pct: 7.1 }, { nombre: 'China', peso_pct: 6.0 }, { nombre: 'Otros', peso_pct: 20.4 },
    ],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Ventas de automoción en Norteamérica (M USD, trimestre)', valor_anterior: '255,9 (3T25)', valor_actual: '263,3 (3T26)', variacion: '+3 %', comentario: 'Con la producción de la región un 5 % abajo: ≈800 pb de crecimiento por contenido [12].' },
      { kpi: 'Ventas en China (M USD, trimestre)', valor_anterior: '39,1 (3T25)', valor_actual: '22,1 (3T26)', variacion: '−44 %', comentario: 'Aranceles y competencia local; la dirección no espera mejora «en mucho tiempo» [12, 13].' },
      { kpi: 'Margen bruto', valor_anterior: '34,4 % (3T25)', valor_actual: '33,4 % (3T26)', variacion: '−100 pb', comentario: 'Metales preciosos (plata, oro, rutenio) y menos ventas de las previstas; sin devoluciones de aranceles en el trimestre [12].' },
      { kpi: 'Ingresos de audio premium (M USD, trimestre)', valor_anterior: '43,0 (3T25)', valor_actual: '54,7 (3T26)', variacion: '+27 %', comentario: 'Klipsch, Onkyo e Integra [12].' },
      { kpi: 'Peso de lo no automoción en ventas (trimestre)', valor_anterior: '12 % (3T25)', valor_actual: '15 % (3T26)', variacion: '+3 pp', comentario: 'Audio premium, aeronáutica (+135 %) y protección contra incendios (+36 %) [12].' },
      { kpi: 'Acciones en circulación (M)', valor_anterior: '210,7 (24-jul-2026)', valor_actual: '205,3 (23-oct-2026)', variacion: '−2,5 %', comentario: '5,7 M recompradas en el 3T26 a 23,44 USD (132,6 M); 11,6 M en nueve meses [2, 12].' },
    ],
    confianza: 'Alta',
  },
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM sep-26', fecha_fin: '2026-09-30', ingresos: 2618.9, ebitda: 602.5, ebit: 500.2, beneficio_neto: 396.6, bpa: 1.87, dpa: 0.48, dpa_extraordinario: 0, fcf: 449.4, participadas_en_ebitda: null, no_recurrentes_en_ebitda: -8.8 },
    cambios_perimetro: [{ periodo: '2025', descripcion: 'VOXX International, consolidada desde el 1-abr-2025 (aporta 267,2 M de ventas en 2025); BioConnect desde el 1-jul-2025 (4,5 M).' }],
    comentario: null, ajustes: null,
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '4T24', ingresos: 541.6, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.39, vs_consenso: null },
      { periodo: '1T25', ingresos: 576.8, crecimiento_pct: -2.3, crecimiento_organico_pct: -2.3, ebitda: 138.5, margen_ebitda_pct: 24.0, bpa: 0.42, vs_consenso: null },
      { periodo: '2T25', ingresos: 657.9, crecimiento_pct: 14.8, crecimiento_organico_pct: 1.1, ebitda: 145.9, margen_ebitda_pct: 22.2, bpa: 0.43, vs_consenso: null },
      { periodo: '3T25', ingresos: 655.2, crecimiento_pct: 7.7, crecimiento_organico_pct: -6.3, ebitda: null, margen_ebitda_pct: null, bpa: 0.46, vs_consenso: 'Inferior' },
      { periodo: '4T25', ingresos: 644.4, crecimiento_pct: 19.0, crecimiento_organico_pct: -0.1, ebitda: null, margen_ebitda_pct: null, bpa: 0.43, vs_consenso: 'En línea' },
      { periodo: '1T26', ingresos: 675.4, crecimiento_pct: 17.1, crecimiento_organico_pct: 1.7, ebitda: 149.4, margen_ebitda_pct: 22.1, bpa: 0.46, vs_consenso: 'Superior' },
      { periodo: '2T26', ingresos: 651.3, crecimiento_pct: -1.0, crecimiento_organico_pct: -1.0, ebitda: 167.1, margen_ebitda_pct: 25.7, bpa: 0.54, vs_consenso: 'Superior' },
      { periodo: '3T26', ingresos: 647.7, crecimiento_pct: -1.1, crecimiento_organico_pct: -1.1, ebitda: 140.7, margen_ebitda_pct: 21.7, bpa: 0.43, vs_consenso: 'Inferior' },
    ],
    ultima_presentacion: null,
    confianza: 'Media',
  },
  balance: {
    historico: balance,
    vencimientos: [],
    liquidez: 'Caja 136,4 M + inversiones a corto 9,2 M + renta fija a largo 103,4 M a 30-sep-2026 (249,1 M), y línea revolving de 350 M con PNC sin disponer (vence el 1-oct-2028); la deuda a corto de 3,8 M de diciembre ya no figura [2].',
    rating: 'Sin rating',
    coste_deuda_pct: 2.5,
    vida_media_anios: 5.0,
    otros_pasivos: null, comentario: null,
    confianza: 'Alta',
  },
  flujos: { historico: flujos, comentario: null, confianza: 'Alta' },
  calidad: {
    auditor: 'Ernst & Young LLP', anios_auditor: 27, opinion: 'Favorable (2025; el control interno de VOXX y BioConnect quedó fuera del perímetro de la revisión del primer año) [1]',
    comentario: null, senales: [], confianza: 'Alta',
  },
  capital: {
    politica: null,
    adquisiciones: [
      { anio: '2025', objetivo: 'VOXX International (71 % que no tenía; Klipsch, Onkyo, EyeLock, electrónica de automoción y consumo)', importe: 187.7, ev_ebitda: null, financiacion: 'Caja (148,3 M por el 71 %; 187,7 M netos de caja con la participación previa del 29 %)', resultado: 'Aporta 267,2 M de ventas y 6,1 M de beneficio en 2025; audio premium vendió 54,7 M en el 3T26 (+27 %) [1, 12].' },
      { anio: '2025', objetivo: 'BioConnect (biometría para control de accesos)', importe: 13.0, ev_ebitda: null, financiacion: 'Caja', resultado: '4,5 M de ventas en 2S25 [1].' },
      { anio: '2023', objetivo: 'Activos tecnológicos de eSight (gafas para baja visión)', importe: null, ev_ebitda: null, financiacion: 'Caja', resultado: 'Dentro de «Otros», que pierde dinero (−25,4 M de EBIT en 2025) [1].' },
      { anio: '2020', objetivo: 'Vaporsens (sensores de gases)', importe: null, ev_ebitda: null, financiacion: 'Caja', resultado: 'Deterioro de 8,9 M de fondo de comercio e I+D en curso en 2024 [1].' },
      { anio: '2013', objetivo: 'HomeLink (comprado a Johnson Controls)', importe: 700, ev_ebitda: null, financiacion: 'Caja y deuda bancaria ya devuelta', resultado: 'Origina casi todo el fondo de comercio de automoción (309,7 M) y los intangibles; HomeLink vende ≈120 M al año [1, 2].' },
    ],
    comentario: null,
    confianza: 'Media',
  },
  fuentes: fA,
  huecos: [
    { seccion: 'trimestres', campo: 'EBITDA de 4T24, 3T25 y 4T25', tipo: 'Complemento', intentos: '1) Notas de prensa trimestrales (sin flujos ni amortización); 2) 10-K 2025 (amortización solo anual); 3) derivarlo con la amortización del semestre (no se reparte por trimestre sin inventar)', decision: 'Omitido' },
  ],
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Form 10-K 2025: competencia (cuota del 79 % en espejos atenuables), clientes, riesgos', editor: 'Gentex Corporation (SEC)', tipo: 'Primaria', fecha: '2026-02-24', url: `${EDGAR}/000035581126000010/gntx-20251231.htm` },
  { id: 2, titulo: 'Form 10-K 2023: cuota del 89 % en 2023', editor: 'Gentex Corporation (SEC)', tipo: 'Primaria', fecha: '2024-02-22', url: `${EDGAR}/000035581124000011/gntx-20231231.htm` },
  { id: 3, titulo: 'Form 10-K 2021: cuota del 91 % en 2021', editor: 'Gentex Corporation (SEC)', tipo: 'Primaria', fecha: '2022-02-23', url: `${EDGAR}/000035581122000006/gntx-20211231.htm` },
  { id: 4, titulo: 'Auto Dimming Mirror Global Market Report (The Business Research Company): 2.310 M USD en 2025, 2.920 M en 2030', editor: 'The Business Research Company (vía GII)', tipo: 'Sectorial', fecha: '2026', url: 'https://www.gii.tw/report/tbrc1784185-auto-dimming-mirror-global-market-report.html' },
  { id: 5, titulo: 'Auto-Dimming Mirrors – Global Strategic Business Report: 2.100 M USD en 2025, 3.000 M en 2032 (TCAC 5,0 %)', editor: 'Global Industry Analysts (vía GII)', tipo: 'Sectorial', fecha: '2026', url: 'https://www.gii.tw/report/go2048491-auto-dimming-mirrors.html' },
  { id: 6, titulo: 'Producción de vehículos ligeros 2025-2027 (Mobility Global, previsión de mediados de octubre de 2026), en la nota de resultados del 3T26', editor: 'Gentex Corporation / Mobility Global', tipo: 'Primaria', fecha: '2026-10-23', url: `${EDGAR}/000035581126000060/exhibit99109302026.htm` },
  { id: 7, titulo: 'Previsión de producción de enero de 2026 y guía 2026, nota de resultados del 4T25', editor: 'Gentex Corporation / S&P Global Mobility', tipo: 'Primaria', fecha: '2026-01-30', url: `${EDGAR}/000035581126000005/exhibit99112312025.htm` },
  { id: 8, titulo: 'Cotizaciones y márgenes de Magna, Murakami, Samvardhana Motherson y Panasonic (quoteSummary)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/MGA/' },
  { id: 9, titulo: 'Form 10-Q 3T26: lanzamientos de FDM, DMS/ICMS, capacidad, aranceles y costes de memoria', editor: 'Gentex Corporation (SEC)', tipo: 'Primaria', fecha: '2026-11-06', url: `${EDGAR}/000035581126000065/gntx-20260930.htm` },
  { id: 10, titulo: 'Tipos de cambio de referencia del euro (USD, JPY, INR) del 14-oct-2026 (usados para los ingresos de Murakami y Motherson del informe anterior)', editor: 'Banco Central Europeo', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml' },
  { id: 12, titulo: 'Gentex Q3 2026 earnings call transcript', editor: 'Earnings Whispers', tipo: 'Prensa', fecha: '2026-10-23', url: 'https://www.earningswhispers.com/transcript/GNTX/Q32026' },
  { id: 11, titulo: 'Ficha sectorial: componentes de automóvil (15-oct-2026)', editor: 'Análisis propio', tipo: 'Sectorial', fecha: '2026-10-15', url: 'sectores/componentes-automovil-2026-10-15.md' },
];
const B = {
  _estado: 'Completa salvo calificaciones ESG publicadas.',
  historia: {
    resumen: null,
    hitos: [
      { anio: '1974', hito: 'Fred Bauer funda Gentex en Zeeland (Michigan) para fabricar detectores de humo.' },
      { anio: '1982', hito: 'Primer espejo retrovisor interior atenuable automático (todavía no electrocrómico).' },
      { anio: '1987', hito: 'Lanza el primer espejo electrocrómico comercial para automóviles.' },
      { anio: '2005', hito: 'Ventanillas atenuables para aviones (después, Boeing 787).' },
      { anio: '2013', hito: 'Compra HomeLink a Johnson Controls por unos 700 M USD.' },
      { anio: '2016', hito: 'Lanza el Full Display Mirror (retrovisor con pantalla de cámara) con General Motors.' },
      { anio: '2018', hito: 'Steve Downing, CEO.' },
      { anio: '2021', hito: 'Cuota del 91 % en espejos atenuables [3]; la falta de chips hunde la producción de coches.' },
      { anio: '2025', hito: 'Aranceles y contraaranceles con China: Gentex frena las exportaciones a ese mercado; compra VOXX (Klipsch, Onkyo, EyeLock) el 1-abr-2025; cuota del 79 % [1].' },
      { anio: '2026', hito: 'Devoluciones de aranceles IEEPA (38 M cobrados), DMS/ICMS en Europa, día del inversor en agosto y primer contrato de montaje de placas electrónicas (PCBA, ≈180 M al año desde 2029) [9, 12].' },
    ],
    confianza: 'Media',
  },
  sector: {
    definicion: null,
    tamano: '≈ 2.310 M USD en 2025 (espejos atenuables automáticos, mundo) [4]; otra fuente da 2.100 M [5]',
    unidad_serie: 'millones de USD (espejos atenuables automáticos, mundo)',
    serie: [{ anio: '2025', tamano: 2310 }, { anio: '2026e', tamano: 2410 }, { anio: '2030e', tamano: 2920 }],
    tcac_historico_pct: null, tcac_previsto_pct: 4.8, cr5_pct: null, estructura: 'Concentrada',
    drivers: [
      { driver: 'Producción de vehículos ligeros en los mercados de Gentex', efecto: '−', horizonte: 'Cíclico', evidencia: 'Mobility Global (oct-2026): 75,42 M de vehículos en 2026 en Norteamérica, Europa, Japón/Corea y China, un 3 % menos que en 2025, y 75,39 M en 2027; en sus mercados principales (sin China), −1 % en 2027 [6].' },
      { driver: 'Contenido por vehículo (FDM, DMS/ICMS, exteriores con funciones, HomeLink)', efecto: '+', horizonte: 'Estructural', evidencia: 'Más del 75 % de los lanzamientos del 2T26 llevan funciones avanzadas; el FDM crece 200.000-400.000 unidades en 2026 [9].' },
      { driver: 'Aranceles EE. UU.-China', efecto: '−', horizonte: 'Estructural', evidencia: 'Ventas en China de 22,1 M en el 3T26 (−44 %) frente a 50-60 M por trimestre previstos a principios de 2025 [6, 7].' },
      { driver: 'Pérdida del programa de VW en Europa', efecto: '−', horizonte: 'Cíclico', evidencia: '16,6 M menos de ventas en el 3T26 y 37,5 M en nueve meses; sin VW, Europa creció un 13 % [6].' },
      { driver: 'Coste de metales preciosos y memorias', efecto: '−', horizonte: 'Cíclico', evidencia: 'Rutenio +500 % en año y medio y memorias 8-10 veces más caras por unidad; 10-15 M de costes extra en el 4T26 que no se recuperarán hasta el 1S27 [6, 12].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 2, justificacion: 'Gentex tiene el 79 % mundial; Magna Mirrors es el único rival occidental con escala, y los chinos compiten sobre todo en su mercado [1].' },
      { fuerza: 'Poder de los clientes', intensidad: 4, justificacion: 'Tres fabricantes (Toyota 18 %, Volkswagen 11 %, GM 10 %) pesan el 39 % de las ventas y piden rebajas anuales de precio [1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 3, justificacion: 'Electrónica, vidrio y metales preciosos; en 2021-2022 la escasez de chips y la inflación bajaron el margen bruto [1].' },
      { fuerza: 'Amenaza de entrada', intensidad: 3, justificacion: 'Las patentes y la homologación protegen fuera de China; dentro, varios fabricantes locales ya venden espejos atenuables y FDM [1].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'Cámaras y pantallas (retrovisor digital) sustituyen al espejo; Gentex vende su propio FDM, pero Panasonic y proveedores chinos ofrecen productos equivalentes [1].' },
    ],
    ciclo: { posicion: 'Madurez del ciclo', comentario: null },
    regulacion: null, tendencias: null,
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 79, posicion: '1.º mundial en espejos retrovisores atenuables automáticos (79 % en 2025, 89 % en 2023, 91 % en 2021) [1, 2, 3]',
    competidores: [
      { nombre: 'Magna International (Magna Mirrors)', pais: 'Canadá', ticker: 'MGA', ingresos: 42671, cuota_pct: null, margen_ebit_pct: 5.6, comentario: 'Único rival occidental en espejos atenuables; también es cliente de subconjuntos exteriores de Gentex. Cifras del grupo entero [1, 8].' },
      { nombre: 'Murakami Corporation', pais: 'Japón', ticker: '7292.T', ingresos: 750, cuota_pct: null, margen_ebit_pct: 6.5, comentario: 'Espejos para fabricantes japoneses; ingresos de 118.815 M JPY pasados a USD con el BCE (158,45 JPY/USD) [8, 10].' },
      { nombre: 'Samvardhana Motherson (SMR)', pais: 'India', ticker: 'MOTHERSON.NS', ingresos: 13712, cuota_pct: null, margen_ebit_pct: 5.0, comentario: 'Mayor fabricante mundial de retrovisores exteriores (sin atenuación propia relevante); cifras del grupo [8, 10].' },
      { nombre: 'Panasonic (retrovisor electrónico tipo FDM)', pais: 'Japón', ticker: '6752.T', ingresos: null, cuota_pct: null, margen_ebit_pct: 9.2, comentario: 'Compite con el FDM en Japón [1]; margen del grupo entero [8].' },
      { nombre: 'Fabricantes chinos de espejos (varios)', pais: 'China', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Venden espejos atenuables y FDM en el mercado chino; ganan la cuota que Gentex pierde por los aranceles [1].' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Se estrecha',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'No hay: es un proveedor industrial.' },
        { fuente: 'Costes de cambio', puntuacion: 3, evidencia: 'Cada programa se homologa para toda la vida del modelo (5-7 años); cambiar de proveedor obliga a revalidar.' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 4, evidencia: 'Química electrocrómica propia desde 1987, cartera de patentes y HomeLink; cuota del 79-91 % durante años [1, 3].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Margen EBITDA del 23 % frente al 10 % de Magna o Visteon; pero producir casi todo en EE. UU. la expone a aranceles y la saca de China [1, 8].' },
        { fuente: 'Escala eficiente', puntuacion: 4, evidencia: 'Capacidad de 42-45 M de espejos interiores al año, para un mercado que no admite dos fabricantes de esa escala fuera de China [9].' },
      ],
    },
    amenazas: null,
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Los asuntos que mueven las cifras son tres. La cadena de suministro de metales preciosos y electrónica, que encareció el coste en 2026 [6]. La seguridad del producto, porque los DMS e ICMS responden a normas de seguridad (Euro NCAP y la normativa europea de vigilancia del conductor) que crean demanda. Y la concentración industrial en Michigan (5.708 de 6.398 empleados en EE. UU.) [1], que reduce la huella logística pero expone a los aranceles de terceros países.',
    controversias: 'No hemos encontrado sanciones ni litigios relevantes en los últimos tres años en el 10-K 2025 (apartado de procedimientos legales), salvo los litigios heredados de VOXX, provisionados en la compra y uno ya cerrado por menos de lo previsto [1].',
    confianza: 'Media',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'esg', campo: 'calificaciones ESG publicadas', tipo: 'Complemento', intentos: '1) 10-K 2025 y proxy 2026 (no las citan); 2) informe de sostenibilidad (no descargado por tiempo); 3) páginas públicas de MSCI y Sustainalytics (requieren registro)', decision: 'Omitido' },
    { seccion: 'sector', campo: 'CR5 del mercado de espejos atenuables', tipo: 'Complemento', intentos: '1) 10-K 2025 (solo la cuota de Gentex); 2) informes de mercado (resúmenes sin cuotas); 3) cálculo propio (no hay cuotas de los demás)', decision: 'Omitido' },
  ],
};
guarda('B', B);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Proxy statement 2026 (DEF 14A): consejo, remuneración, accionistas', editor: 'Gentex Corporation (SEC)', tipo: 'Primaria', fecha: '2026-04-09', url: `${EDGAR}/000035581126000016/gntx-20260406.htm` },
  { id: 2, titulo: 'Form 8-K: resultados de la junta del 21-may-2026 (votaciones)', editor: 'Gentex Corporation (SEC)', tipo: 'Primaria', fecha: '2026-05-26', url: `${EDGAR}/000035581126000028/gntx-20260521.htm` },
  { id: 3, titulo: 'Form 4 de Gentex entre el 13-nov-2025 y el 13-nov-2026 (herramientas/form4.mjs): 0 compras, ventas de 2,79 M USD', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-11-13', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000355811&type=4' },
  { id: 4, titulo: 'Guías anuales 2025 (enero y abril de 2025), nota de resultados del 1T25', editor: 'Gentex Corporation (SEC)', tipo: 'Primaria', fecha: '2025-04-25', url: `${EDGAR}/000035581125000026/exhibit99103312025.htm` },
  { id: 5, titulo: 'Guía 2025 actualizada (octubre de 2025), nota de resultados del 3T25', editor: 'Gentex Corporation (SEC)', tipo: 'Primaria', fecha: '2025-10-24', url: `${EDGAR}/000035581125000047/exhibit99109302025.htm` },
  { id: 6, titulo: 'Resultados de 2025 y guía 2026 (nota de resultados del 4T25)', editor: 'Gentex Corporation (SEC)', tipo: 'Primaria', fecha: '2026-01-30', url: `${EDGAR}/000035581126000005/exhibit99112312025.htm` },
  { id: 7, titulo: 'Guía 2026 a julio de 2026 (nota de resultados del 2T26)', editor: 'Gentex Corporation (SEC)', tipo: 'Primaria', fecha: '2026-07-24', url: `${EDGAR}/000035581126000044/exhibit99106302026.htm` },
  { id: 8, titulo: 'Form 10-K 2025: directivos y operaciones vinculadas', editor: 'Gentex Corporation (SEC)', tipo: 'Primaria', fecha: '2026-02-24', url: `${EDGAR}/000035581126000010/gntx-20251231.htm` },
  { id: 9, titulo: 'Guía 2026 y 2027 a octubre de 2026 (nota de resultados del 3T26)', editor: 'Gentex Corporation (SEC)', tipo: 'Primaria', fecha: '2026-10-23', url: `${EDGAR}/000035581126000060/exhibit99109302026.htm` },
];
const C = {
  _estado: 'Completa.',
  directivos: {
    equipo: [
      { nombre: 'Steve Downing', cargo: 'Presidente ejecutivo de operaciones (President) y consejero delegado (CEO)', desde: '2018', participacion_pct: 0.17, trayectoria: 'En Gentex desde 2002; director financiero y luego consejero delegado desde el 1-ene-2018. Con él, el margen EBITDA bajó del 33,3 % de 2018 al 22,8 % de 2025 y el BPA pasó de 1,62 a 1,74 USD, con recompras que redujeron las acciones un 19 %.' },
      { nombre: 'Neil Boehm', cargo: 'Director de operaciones y de tecnología (COO y CTO)', desde: '2017', participacion_pct: 0.04, trayectoria: 'Ingeniero de la casa; lleva los lanzamientos de FDM, DMS/ICMS y dispositivos atenuables y la integración industrial de VOXX.' },
      { nombre: 'Kevin Nash', cargo: 'Director financiero (CFO) y tesorero', desde: '2018', participacion_pct: 0.04, trayectoria: 'Antes, responsable de contabilidad de Gentex. Ha mantenido la caja neta y el reparto de más del 80 % del flujo operativo.' },
      { nombre: 'Matthew Chiodo', cargo: 'Vicepresidente de ventas', desde: '2019', participacion_pct: 0.04, trayectoria: 'Responsable de la relación con los fabricantes y de la presión de precios anual.' },
      { nombre: 'Scott Ryan', cargo: 'Director jurídico (General Counsel)', desde: '2015', participacion_pct: 0.03, trayectoria: 'Lleva patentes, aranceles y las reclamaciones de devolución de los IEEPA.' },
    ],
    historial_guidance: [
      { anio: '2025', guia: 'Enero: ventas de 2.400-2.450 M sin VOXX; margen bruto 33,5-34,5 % [4]', real: 'Ventas de Gentex sin VOXX 2.270 M; margen bruto 34,7 % [6]', cumplida: 'Parcial' },
      { anio: '2025', guia: 'Octubre: ventas consolidadas 2.500-2.600 M; margen bruto 33,5-34 % [5]', real: '2.534 M y 34,2 % [6]', cumplida: 'Sí' },
      { anio: '2026', guia: 'Enero: ventas 2.600-2.700 M; margen bruto 34-35 %; gastos 410-420 M [6]. Julio: 2.650-2.750 M y 34,5-35,5 % [7]', real: 'Octubre: ≈2.650 M (parte baja), margen bruto 34,0-34,5 % (recortado) y gastos 395-410 M [9]', cumplida: 'Parcial' },
      { anio: '2027', guia: 'Enero de 2026: ventas 2.750-2.850 M [6]', real: 'Abril, julio y octubre: 2.800-2.900 M, mantenida [7, 9]', cumplida: 'Parcial' },
    ],
    comentario: null,
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      { nombre: 'Richard Schaum', cargo: 'Presidente del consejo', tipo: 'Independiente', desde: '2011', comisiones: 'Retribuciones (presidente)' },
      { nombre: 'Steve Downing', cargo: 'Consejero delegado', tipo: 'Ejecutivo', desde: '2020', comisiones: '—' },
      { nombre: 'Leslie Brown', cargo: 'Consejera', tipo: 'Independiente', desde: '2016', comisiones: 'Nombramientos y gobierno (presidenta)' },
      { nombre: 'Garth Deur', cargo: 'Consejero', tipo: 'Independiente', desde: '2023', comisiones: 'Auditoría (experto financiero); Retribuciones' },
      { nombre: 'Brian Walker', cargo: 'Consejero', tipo: 'Independiente', desde: '2018', comisiones: 'Auditoría (experto financiero); Retribuciones' },
      { nombre: 'Kathleen Starkoff', cargo: 'Consejera', tipo: 'Independiente', desde: '2018', comisiones: 'n.d.' },
      { nombre: 'Ling Zang', cargo: 'Consejero', tipo: 'Independiente', desde: '2021', comisiones: 'Nombramientos y gobierno' },
      { nombre: 'Billy Pink', cargo: 'Consejero', tipo: 'Independiente', desde: '2024', comisiones: 'n.d.' },
      { nombre: 'Joseph Anderson', cargo: 'Consejero', tipo: 'Independiente', desde: '2025', comisiones: 'Nombramientos y gobierno' },
      { nombre: 'John Kennedy', cargo: 'Consejero (candidato nuevo en la junta de 2026)', tipo: 'Independiente', desde: '2026', comisiones: 'n.d.' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: true, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 96.0, voto_remuneracion_contra_pct: 2.6, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 5.95, fijo: 0.85, variable_corto: 0.98, variable_largo: 3.74, ratio_salario_medio: 102 },
    remuneracion: 'El variable anual se paga por ventas, beneficio operativo y BPA diluido, un tercio cada uno, «ajustados por aranceles» [1]. El variable a largo plazo (70 % acciones por objetivos, 30 % acciones restringidas) mide EBITDA y ROIC acumulados en tres años (2025-2027) [1]: premia la rentabilidad del capital, no el crecimiento a cualquier precio. El total del CEO fue de 5,95 M en 2025 (4,78 M en 2024), 102 veces el salario mediano de 58.562 USD [1]. Hay política de recuperación (clawback) según la norma del Nasdaq [1]. El ajuste por aranceles del bonus anual y que el BPA se beneficie de las recompras son los puntos débiles: el BPA puede subir con un beneficio plano.',
    accionistas: [
      { nombre: 'The Vanguard Group', pct: 9.9, tipo: 'Institucional (índices)', variacion: 'Estable' },
      { nombre: 'BlackRock', pct: 8.3, tipo: 'Institucional (índices)', variacion: 'Estable' },
      { nombre: 'Consejeros y directivos (13 personas)', pct: 0.45, tipo: 'Insiders', variacion: 'Ventas netas en 12 meses' },
    ],
    insiders: [
      { fecha: '2026-02-17', persona: 'Steve Downing (CEO)', operacion: 'Venta', acciones: 35000, importe: 0.87 },
      { fecha: '2026-02-17', persona: 'Matthew Chiodo (VP ventas)', operacion: 'Venta', acciones: 19827, importe: 0.50 },
      { fecha: '2026-02-17', persona: 'Kevin Nash (CFO)', operacion: 'Venta', acciones: 11885, importe: 0.30 },
      { fecha: '2026-02-17', persona: 'Neil Boehm (COO y CTO)', operacion: 'Venta', acciones: 11248, importe: 0.28 },
      { fecha: '2026-02-17', persona: 'Scott Ryan (General Counsel)', operacion: 'Venta', acciones: 9024, importe: 0.22 },
      { fecha: '2026-05-05', persona: 'Leslie Brown (consejera)', operacion: 'Venta', acciones: 10782, importe: 0.25 },
      { fecha: '2026-05-15', persona: 'Brian Walker (consejero)', operacion: 'Venta', acciones: 5939, importe: 0.14 },
      { fecha: '2026-05-15', persona: 'Joseph Anderson (consejero)', operacion: 'Venta', acciones: 5939, importe: 0.14 },
      { fecha: '2026-04-30', persona: 'Richard Schaum (presidente)', operacion: 'Venta', acciones: 4815, importe: 0.11 },
    ],
    control_y_defensas: 'Sin accionista de control: los dos mayores son gestoras de índices (Vanguard 9,9 % y BlackRock 8,3 %) [1] y los consejeros y directivos tienen menos del 0,5 % [1]. Una sola clase de acciones, consejo de diez con ocho o nueve independientes y presidente independiente desde que el fundador dejó la presidencia; se mantiene la figura de consejero coordinador [1]. No hubo operaciones vinculadas que aprobar en 2025 [1]. El plan de incentivos tiene cláusula de cambio de control (definición estándar de adquirente del 20-50 %) [1].',
    alertas: ['Ventas de mercado de todos los directivos principales el 17-feb-2026 (≈2,2 M USD) y de cuatro consejeros en abril-mayo, sin una sola compra en 12 meses, tampoco tras la caída a mínimos de noviembre [3].', 'El variable anual se calcula «ajustado por aranceles», lo que protege el bonus de un riesgo que asumen los accionistas [1].'],
    confianza: 'Alta',
  },
  fuentes: fC,
  huecos: [],
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de GNTX, SPY y CARZ (precio, rango, volumen, betas, cierres de ejercicio) con herramientas/bolsa.mjs', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-11-12', url: 'https://finance.yahoo.com/quote/GNTX/history/' },
  { id: 2, titulo: 'Consenso de analistas (earningsTrend, financialData, recommendationTrend, upgradeDowngradeHistory, calendarEvents) de GNTX', editor: 'Yahoo Finance', tipo: 'Analistas', fecha: '2026-11-13', url: 'https://finance.yahoo.com/quote/GNTX/analysis/' },
  { id: 3, titulo: 'Gentex (GNTX) Stock Forecast & Price Target: 9 analistas (S&P Global), objetivo medio 25,28 USD, BPA 2026 de 2,00 y 2027 de 2,14', editor: 'Stock Analysis', tipo: 'Analistas', fecha: '2026-11-12', url: 'https://stockanalysis.com/stocks/gntx/forecast/' },
  { id: 4, titulo: 'Comparables (VC, ALV, BWA, LEA, MGA, GTX, DORM, APTV): precio, capitalización, valor empresa, EBITDA, estimaciones (quoteSummary)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-11-12', url: 'https://finance.yahoo.com/quote/VC/' },
  { id: 5, titulo: 'AAM–Dowlais: folleto de la fusión (DEFM14A): múltiplo de 4,1 veces el EBITDA ajustado de 2023 y transacciones precedentes de J.P. Morgan', editor: 'American Axle & Manufacturing (SEC)', tipo: 'Primaria', fecha: '2025-06', url: 'https://www.sec.gov/Archives/edgar/data/1062231/000110465925055536/tm2512184-3_defm14a.htm' },
  { id: 6, titulo: 'ABC Technologies (Apollo) compra TI Fluid Systems: 200 peniques por acción, valor empresa de ≈1.830 M GBP', editor: 'Sharecast', tipo: 'Prensa', fecha: '2024-11-29', url: 'https://sharecast.com/news/news-and-announcements/abc-secures-ti-fluid-systems-in-pound1bn-deal--18215554.html' },
  { id: 7, titulo: 'Form 10-K 2025: compra de VOXX (187,7 M netos de caja, con la participación previa)', editor: 'Gentex Corporation (SEC)', tipo: 'Primaria', fecha: '2026-02-24', url: `${EDGAR}/000035581126000010/gntx-20251231.htm` },
  { id: 8, titulo: 'Gentex Announces Closing of VOXX International Acquisition: +325-375 M de ventas anuales', editor: 'Gentex Corporation (SEC)', tipo: 'Primaria', fecha: '2025-04-01', url: `${EDGAR}/000035581125000013/exhibit991412025.htm` },
  { id: 9, titulo: 'Daily Treasury Par Yield Curve Rates: bono a 10 años al 5,10 % el 12-nov-2026', editor: 'U.S. Department of the Treasury', tipo: 'Datos de mercado', fecha: '2026-11-12', url: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve' },
  { id: 10, titulo: 'Implied ERP by month (ERPbymonth.xlsx): 4,41 % a 1-nov-2026', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-11', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 11, titulo: 'Form 10-Q 3T26: acciones en circulación (205.326.516 a 23-oct-2026), balance e inversiones tecnológicas (110,0 M)', editor: 'Gentex Corporation (SEC)', tipo: 'Primaria', fecha: '2026-11-06', url: `${EDGAR}/000035581126000065/gntx-20260930.htm` },
  { id: 12, titulo: 'Gentex Reports Third Quarter 2026 Financial Results: guía 2026 y 2027', editor: 'Gentex Corporation (SEC)', tipo: 'Primaria', fecha: '2026-10-23', url: `${EDGAR}/000035581126000060/exhibit99109302026.htm` },
  { id: 13, titulo: 'Gentex Non-GAAP EPS of $0.47 misses by $0.03, revenue of $647.7M misses by $21.94M', editor: 'Seeking Alpha', tipo: 'Prensa', fecha: '2026-10-23', url: 'https://seekingalpha.com/symbol/GNTX/news' },
  { id: 14, titulo: 'Goldman Sachs cuts Gentex to Sell on higher input costs, low China OEM exposure', editor: 'Seeking Alpha', tipo: 'Prensa', fecha: '2026-10-06', url: 'https://seekingalpha.com/symbol/GNTX/news' },
];
const nombres = { VC: 'Visteon', ALV: 'Autoliv', BWA: 'BorgWarner', LEA: 'Lear', MGA: 'Magna International', GTX: 'Garrett Motion', DORM: 'Dorman Products' }; // Aptiv fuera (perímetro cambiado por la escisión)
const paises = { VC: 'US', ALV: 'SE', BWA: 'US', LEA: 'US', MGA: 'CA', GTX: 'US', DORM: 'US' };
const comps = CY.filter((c) => nombres[c.ticker]).map((c) => ({
  nombre: nombres[c.ticker], ticker: c.ticker, pais: paises[c.ticker], capitalizacion: Math.round(c.capitalizacion),
  ev_ventas: r2(c.ev_ventas), ev_ebitda_ltm: r1(c.ev_ebitda_ltm), ev_ebitda_ntm: r1(c.ev_ebitda_ntm), per_ntm: r1(c.per_ntm),
  crecimiento_pct: r1(c.crecimiento_pct), margen_ebitda_pct: r1(c.margen_ebitda_pct), roic_pct: null, dn_ebitda: r2(c.dn_ebitda), fcf_yield_pct: r1(c.fcf_yield_pct),
}));
const g = CY.find((c) => c.ticker === 'GNTX');
const D = {
  _estado: 'Completa. Comparables rehechos con el consenso posterior a sus resultados del 3T26 (Yahoo, 12-nov); EBITDA NTM = ventas NTM del consenso × margen EBITDA LTM.',
  identificacion: {
    nombre: 'Gentex Corporation', nombre_corto: 'Gentex', ticker: 'GNTX', isin: 'US3719011096', mercado: 'Nasdaq Global Select', indice_referencia: 'S&P 500 (SPY)',
    pais: 'Estados Unidos', pais_iso: 'US', sector: 'Consumo discrecional', industria: 'Componentes de automóvil', sede: 'Zeeland (Michigan, EE. UU.)', fundacion: '1974', empleados: 6398, web: 'https://www.gentex.com',
    precio: BO.identificacion.precio, fecha_precio: BO.identificacion.fecha_precio, acciones: 205.3, capitalizacion_publicada: Math.round(g.capitalizacion), free_float_pct: 99.5,
    max_52s: BO.identificacion.max_52s, min_52s: BO.identificacion.min_52s, volumen_medio_diario: `≈ ${String(BO.volumen_3m.importe_dia_millones).replace('.', ',')} M USD/día (3 meses)`, proximos_resultados: '2027-01-29',
  },
  consenso: {
    guidance: null,
    estimaciones: [
      { periodo: '2026e', ingresos: 2634, ebitda: null, ebit: 503, bpa: 2.00, dpa: 0.48, fuente: 'Yahoo Finance, 8 analistas (BPA ajustado) [2]; Stock Analysis da 2,00 y un beneficio operativo de 503 M [3]' },
      { periodo: '2027e', ingresos: 2800, ebitda: null, ebit: null, bpa: 2.14, dpa: null, fuente: 'Yahoo Finance, 8 analistas [2]; Stock Analysis, igual [3]' },
    ],
    recomendaciones: { n_analistas: 9, comprar: 3, mantener: 5, vender: 1, po_medio: 25.28, po_min: 20, po_max: 42 },
    revisiones: null,
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: { ...BO.bolsa, posicion_corta_pct: 9.2, comentario: null, confianza: 'Alta' },
  multiplos_historicos: {
    serie: BO.cierres_ejercicio.map((c) => ({ anio: c.anio, precio_cierre: c.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: ['2020', '2021'].includes(c.anio) })),
    comentario: null,
    confianza: 'Alta',
  },
  comparables: { criterio: null, empresas: comps, comentario: null, confianza: 'Media' },
  transacciones: {
    operaciones: [
      { fecha: '2025-04', objetivo: 'VOXX International', comprador: 'Gentex', ev: 187.7, ev_ventas: 0.54, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Valor empresa neto de caja con la participación previa del 29 % [7]; ventas anuales esperadas de 325-375 M (punto medio 350; múltiplo de ventas: estimación propia) [8]. EBITDA de VOXX cercano a cero: sin múltiplo.' },
      { fecha: '2025-01', objetivo: 'Dowlais (GKN Automotive y Powder Metallurgy)', comprador: 'American Axle', ev: null, ev_ventas: null, ev_ebitda: 4.1, prima_pct: null, excluir: false, comentario: '4,1 veces el EBITDA ajustado de 2023 (3,0 con sinergias) [5].' },
      { fecha: '2024-11', objetivo: 'TI Fluid Systems', comprador: 'ABC Technologies (Apollo)', ev: 2330, ev_ventas: null, ev_ebitda: null, prima_pct: 55, excluir: false, comentario: 'Valor empresa de ≈1.830 M GBP (≈2.330 M USD a 1,27 USD/GBP de entonces, estimación) y prima del 55 % sobre el precio previo a la oferta [6]. J.P. Morgan sitúa las precedentes del sector en 4,0-5,5 veces el EBITDA ajustado [5].' },
    ],
    comentario: null,
    confianza: 'Baja',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'transacciones', campo: 'múltiplos EV/EBITDA de 5-10 operaciones', tipo: 'Complemento', intentos: '1) Folleto AAM-Dowlais (solo el rango 4,0-5,5x de las precedentes, sin desglose); 2) prensa de TI Fluid, Tenneco y Veoneer (valor empresa sin EBITDA publicado); 3) informes de compra de VOXX (EBITDA cercano a cero)', decision: 'Omitido' },
    { seccion: 'comparables', campo: 'ROIC de los comparables', tipo: 'Complemento', intentos: '1) Yahoo (no da ROIC); 2) Stock Analysis (solo con suscripción para varios); 3) cálculo con cuentas de cada uno (fuera del presupuesto de tiempo)', decision: 'Omitido' },
    { seccion: 'consenso', campo: 'EBITDA y BPA de 2028 del consenso', tipo: 'Complemento', intentos: '1) Yahoo (solo dos ejercicios); 2) Stock Analysis (2027-2028 de pago); 3) MarketScreener (la página no carga la empresa)', decision: 'Omitido' },
  ],
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Stocktwits, flujo de mensajes de $GNTX (sep-nov 2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-11-11', url: 'https://api.stocktwits.com/api/2/streams/symbol/GNTX.json' },
  { id: 2, titulo: 'Seeking Alpha, artículos y noticias de GNTX (ago-nov 2026, RSS)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-11-12', url: 'https://seekingalpha.com/api/sa/combined/GNTX.xml' },
  { id: 3, titulo: 'Downgrading Gentex To Hold As Pressures Persist', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-26', url: 'https://seekingalpha.com/article/4957510-downgrading-gentex-to-hold-as-pressures-persist' },
  { id: 4, titulo: 'Gentex: A Resilient Cash Generator In A Troubled Automotive Market', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-28', url: 'https://seekingalpha.com/article/4958389-gentex-q3-resilient-cash-generator-in-a-troubled-automotive-market' },
  { id: 5, titulo: 'Gentex Non-GAAP EPS of $0.47 misses; Gentex forecasts $2.65B 2026 revenue (noticias y comentarios)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-23', url: 'https://seekingalpha.com/symbol/GNTX/news' },
  { id: 6, titulo: 'Posición corta (9,2 % del capital flotante)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-11-13', url: 'https://finance.yahoo.com/quote/GNTX/key-statistics/' },
];
const E = {
  _estado: 'Completa con lo que abre (Stocktwits y titulares de Seeking Alpha); Reddit no abre.',
  sentimiento: {
    tono: 'Negativo', tendencia: 'Empeora',
    revisadas: [
      { plataforma: 'Stocktwits ($GNTX)', fecha: '2026-11', n_comentarios: 25, tono: 'Dividido', resumen: 'Tras el 3T26 dominan los avisos de fallo en ventas y BPA y de recorte de la guía de margen, y en noviembre los de «nuevo mínimo de 52 semanas»; quedan pocos particulares que la defienden como dividendo seguro o que querían comprar «en la zona de 18-20» [1].' },
      { plataforma: 'Seeking Alpha (artículos, oct-nov 2026)', fecha: '2026-11', n_comentarios: 4, tono: 'Dividido', resumen: 'Un autor rebaja a Mantener porque las presiones de coste siguen; otro la ve como «generadora de caja resistente» en un mercado del automóvil con problemas. Antes de resultados, otro la subía por precio [2, 3, 4].' },
      { plataforma: 'Seeking Alpha (noticias y comentarios)', fecha: '2026-10', n_comentarios: 10, tono: 'Negativo', resumen: 'Titulares del fallo en ventas (−22 M frente al consenso) y en BPA ajustado (−0,03), de los 10-15 M de costes extra del 4T26 y de la rebaja de Goldman a Vender a principios de octubre [5].' },
    ],
    temas: [
      { tema: 'Está barata y recompra acciones', postura: 'Alcista', peso: 'Medio', contraste: 'Cierto: 9,1 veces nuestro BPA de 2027 y 5,7 M de acciones recompradas en el 3T26; pero las recompras se hicieron a 23,44 USD, un 21 % por encima del precio de hoy.' },
      { tema: 'Costes de metales preciosos y memorias', postura: 'Bajista', peso: 'Alto', contraste: 'Cierto y mayor de lo que se pensaba: margen bruto del 33,4 % en el 3T26 y la dirección habla de un 33-34 % para 2027, quizá menos.' },
      { tema: 'China y VW', postura: 'Bajista', peso: 'Medio', contraste: 'China −44 % en el trimestre y VW −16,6 M; sin ambos, automoción crecería un 2 %.' },
      { tema: 'Guía de ventas de 2027 creíble o no', postura: 'Dividida', peso: 'Medio', contraste: 'La dirección mantiene 2.800-2.900 M con la producción −1 % en sus mercados; ha fallado su propia previsión trimestral en el 2T y el 3T (−35 M en el 3T).' },
    ],
    lectura: null,
    confianza: 'Media',
  },
  fuentes: fE,
  huecos: [],
};
guarda('E', E);
console.log('Notas A-E escritas');
