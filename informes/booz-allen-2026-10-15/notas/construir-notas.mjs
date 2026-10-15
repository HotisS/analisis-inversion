// Escribe las notas A-E de Booz Allen Hamilton (BAH, corte 2026-10-15) desde los documentos de notas/docs (EDGAR),
// el XBRL de la SEC (cuentas-xbrl.json), bolsa.json (Yahoo), form4.json y páginas web leídas el 15-oct-2026.
// Cada nota cita solo con [n] de su propia lista. Ejecutar: node informes/booz-allen-2026-10-15/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const bolsa = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const xbrl = JSON.parse(fs.readFileSync(path.join(dir, 'cuentas-xbrl.json'), 'utf8'));
const E = 'https://www.sec.gov/Archives/edgar/data/1443646/';
const r1 = (x) => Math.round(x * 10) / 10;

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Form 10-K del ejercicio cerrado el 31-mar-2026 (cuentas, notas de deuda, impuestos, cartera de pedidos, contratos, riesgos)', editor: 'Booz Allen Hamilton Holding Corp.', tipo: 'Primaria', fecha: '2026-05-22', url: E + '000162828026037521/bah-20260331.htm' },
  { id: 2, titulo: 'Nota de resultados del 4T y del ejercicio 2026 (Exhibit 99.1; cuenta, balance, flujos, conciliaciones, clientes por tipo, cartera)', editor: 'Booz Allen Hamilton', tipo: 'Primaria', fecha: '2026-05-22', url: E + '000162828026037519/bahexhibit991q4fy26_fina.htm' },
  { id: 3, titulo: 'Nota de resultados del 1T del ejercicio 2027 (trimestre a 30-jun-2026; guía 2027)', editor: 'Booz Allen Hamilton', tipo: 'Primaria', fecha: '2026-07-24', url: E + '000162828026049494/q1fy2027exhibit991_final.htm' },
  { id: 4, titulo: 'Nota de resultados del 3T del ejercicio 2026', editor: 'Booz Allen Hamilton', tipo: 'Primaria', fecha: '2026-01-23', url: E + '000162828026003186/finalbahexhibit991q3fy26.htm' },
  { id: 5, titulo: 'Nota de resultados del 2T del ejercicio 2026 (rebaja de la guía 2026)', editor: 'Booz Allen Hamilton', tipo: 'Primaria', fecha: '2025-10-24', url: E + '000162828025046175/bahexhibit991q2fy26.htm' },
  { id: 6, titulo: 'Nota de resultados del 4T y del ejercicio 2025 (con 2024)', editor: 'Booz Allen Hamilton', tipo: 'Primaria', fecha: '2025-05-23', url: E + '000144364625000075/bahexhibit991q4fy25_fina.htm' },
  { id: 7, titulo: 'Nota de resultados del 4T y del ejercicio 2024 (con 2023)', editor: 'Booz Allen Hamilton', tipo: 'Primaria', fecha: '2024-05-24', url: E + '000144364624000074/q4fy24bahexhibit991.htm' },
  { id: 8, titulo: 'Nota de resultados del 4T y del ejercicio 2023 (con 2022)', editor: 'Booz Allen Hamilton', tipo: 'Primaria', fecha: '2023-05-26', url: E + '000144364623000088/bah033123exhibit991_fina.htm' },
  { id: 9, titulo: 'Nota de resultados del 4T y del ejercicio 2022 (con 2021)', editor: 'Booz Allen Hamilton', tipo: 'Primaria', fecha: '2022-05-20', url: E + '000144364622000056/bah033122exhibit991_fina.htm' },
  { id: 10, titulo: 'Notas de resultados del 4T de los ejercicios 2020 y 2021', editor: 'Booz Allen Hamilton', tipo: 'Primaria', fecha: '2021-05-21', url: E + '000144364621000078/bah033121exhibit991_fina.htm' },
  { id: 11, titulo: 'XBRL de la SEC (companyfacts, CIK 1443646): cuenta, balance y flujos 2017-2026', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0001443646.json' },
  { id: 12, titulo: 'Presentación de resultados del 1T del ejercicio 2027 (Exhibit 99.2)', editor: 'Booz Allen Hamilton', tipo: 'Primaria', fecha: '2026-07-24', url: E + '000162828026049494/q1fy2027exhibit992_final.htm' },
  { id: 13, titulo: 'Nota de cierre de la compra de Ultra I&C Mission Solutions (720 M USD)', editor: 'Booz Allen Hamilton (8-K)', tipo: 'Primaria', fecha: '2026-08-24', url: E + '000144364626000058/ultraclosepressreleasevf.htm' },
  { id: 14, titulo: 'Acuerdo de compra de Ultra I&C Mission Solutions (8-K y nota, Exhibit 99.1)', editor: 'Booz Allen Hamilton (8-K)', tipo: 'Primaria', fecha: '2026-06-22', url: E + '000110465926076094/tm2618424d1_ex99-1.htm' },
  { id: 15, titulo: 'Emisión de bonos: 700 M al 5,375 % (2030) y 500 M al 5,900 % (2034) (8-K)', editor: 'Booz Allen Hamilton (8-K)', tipo: 'Primaria', fecha: '2026-08-04', url: E + '000110465926090450/tm2621893d1_8k.htm' },
  { id: 16, titulo: 'Folleto (424B2) de los bonos 2030 y 2034: capitalización a 30-jun-2026 y destino de los fondos', editor: 'Booz Allen Hamilton', tipo: 'Primaria', fecha: '2026-07-28', url: E + '000110465926087336/tm267274-4_424b2.htm' },
];

// Cuenta del XBRL [11], comprobada con las notas de resultados. coste_ventas = coste de los ingresos + gastos facturables
// (la empresa los presenta en líneas separadas): ingresos − G&A − amortizaciones − EBIT. La amortización del XBRL (163 M en 2026) ya
// incluye la de intangibles comprados (48 M en 2026; la conciliación de EBITDA de [2] usa los mismos 163 M).
const NR = { '2023': 350, '2025': -228, '2026': 33 }; // reserva del DOJ (2023); provisión de costes reclamados −113 e indemnización del seguro −115 (2025); despidos y costes de compra (2026)
const anios = ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026'];
const cuenta = xbrl.financieros.cuenta.filter((c) => anios.includes(c.periodo)).map((c) => ({
  periodo: 'FY' + c.periodo, ingresos: c.ingresos, coste_ventas: r1(c.ingresos - c.gastos_generales - c.amortizaciones - c.ebit), gastos_generales: c.gastos_generales,
  ebitda: c.ebitda, amortizaciones: c.amortizaciones, ebit: c.ebit, resultado_financiero: c.resultado_financiero, bai: c.bai, impuestos: c.impuestos, minoritarios: 0,
  beneficio_neto: c.beneficio_neto, gastos_financieros: c.gastos_financieros, participadas_en_ebitda: null, no_recurrentes_en_ebitda: NR[c.periodo] ?? null,
  bpa: c.bpa, dpa: c.dpa, dpa_extraordinario: 0, acciones_diluidas: c.acciones_diluidas,
}));
const historicoBalance = xbrl.balance.historico.filter((b) => anios.includes(b.periodo)).map((b) => ({
  periodo: 'FY' + b.periodo, activo_total: b.activo_total, activo_corriente: b.activo_corriente, pasivo_corriente: b.pasivo_corriente, pasivo_total: b.pasivo_total,
  fondo_comercio: b.fondo_comercio, intangibles: b.intangibles, inmovilizado_material: b.inmovilizado_material, existencias: 0, clientes: b.clientes, proveedores: b.proveedores,
  activos_contrato: null, pasivos_contrato: null, caja: b.caja, deuda_financiera: b.deuda_financiera, arrendamientos: 0, patrimonio_neto: b.patrimonio_neto, minoritarios: 0, reservas: b.reservas,
}));
const historicoFlujos = xbrl.flujos.historico.filter((f) => anios.includes(f.periodo)).map((f) => ({
  periodo: 'FY' + f.periodo, flujo_operativo: f.flujo_operativo, capex: f.capex, pagos_arrendamientos: 0, adquisiciones: f.adquisiciones ?? 0, desinversiones: f.desinversiones ?? 0,
  dividendos: f.dividendos, recompras: f.recompras, emision_acciones: f.emision_acciones, intereses_en_financiacion: 0,
}));
const seg = (nombre, descripcion, filas) => ({ nombre, descripcion, tipo_resultado: null, historico: filas.map(([periodo, ingresos]) => ({ periodo, ingresos, resultado: null })) });

const A = {
  _estado: 'Completo. Cuenta, balance y flujos FY2018-FY2026 del XBRL de la SEC, comprobados con las notas de resultados y el 10-K de 2026. Trimestres de las notas de resultados.',
  negocio: {
    segmentos: [
      seg('Defensa', 'Departamento de Guerra (antes de Defensa) y servicios armados: ingeniería, ciberseguridad, sistemas de mando y control, IA aplicada y productos de defensa (desde 2027 se reporta junto con Inteligencia como «Seguridad nacional»).', [['FY2024', 5061], ['FY2025', 5943], ['FY2026', 6069]]),
      seg('Inteligencia', 'Comunidad de inteligencia: análisis, ciberoperaciones, datos e IA en entornos clasificados.', [['FY2024', 1763], ['FY2025', 1867], ['FY2026', 1900]]),
      seg('Civil', 'Agencias civiles federales (salud, veteranos, Hacienda y otras) y algo de comercial: modernización de sistemas, datos y consultoría técnica.', [['FY2024', 3838], ['FY2025', 4170], ['FY2026', 3248]]),
    ],
    geografias: [{ nombre: 'Estados Unidos (Gobierno federal y otros)', peso_pct: 98.0 }, { nombre: 'Otros', peso_pct: 2.0 }],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Cartera de pedidos total (M USD)', valor_anterior: '37.027 (mar-25)', valor_actual: '38.187 (mar-26); 39.483 (jun-26)', variacion: '+3,1 %', comentario: 'Financiada 4.664 M y opciones con precio 24.601 M a jun-26; la financiada sube un 15 % interanual [2, 3].' },
      { kpi: 'Relación pedidos/ventas (12 meses)', valor_anterior: '1,4x (mar-25)', valor_actual: '1,1x (mar-26 y jun-26); 1,5x en el 1T27', variacion: '−0,3x', comentario: 'Pedidos netos = variación de la cartera + ingresos [2, 3].' },
      { kpi: 'Plantilla total', valor_anterior: '35.800 (mar-25)', valor_actual: '31.500 (mar-26); 30.900 (jun-26)', variacion: '−12,0 %', comentario: 'Plantilla facturable 28.200 a jun-26 [2, 3].' },
      { kpi: 'Ingresos civiles (M USD)', valor_anterior: '4.170 (FY2025)', valor_actual: '3.248 (FY2026)', variacion: '−22,1 %', comentario: 'Recortes y revisiones de contratos de 2025-26; 1T27 civil y comercial 772 M (−16 %) [2, 3].' },
      { kpi: 'Ingresos de seguridad nacional (M USD)', valor_anterior: '7.810 (FY2025)', valor_actual: '7.969 (FY2026)', variacion: '+2,0 %', comentario: 'Defensa + Inteligencia; 1T27 2.028 M (+1,3 %) [2, 3].' },
      { kpi: 'Mezcla de contratos: precio fijo', valor_anterior: '20 % (FY2025)', valor_actual: '19 % (FY2026); 21 % (1T27)', variacion: '−1 pp', comentario: 'Coste más margen 59 %, por horas 22 % en FY2026 [1, 3].' },
    ],
  },
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 11093, ebitda: 1223, ebit: 1055, beneficio_neto: 778, bpa: 6.37, dpa: 2.36, dpa_extraordinario: 0, fcf: 1116, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 29 },
    cambios_perimetro: [],
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '2T25', ingresos: 3146, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 364, margen_ebitda_pct: 11.6, bpa: 3.01, vs_consenso: null },
      { periodo: '3T25', ingresos: 2917, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 332, margen_ebitda_pct: 11.4, bpa: 1.45, vs_consenso: null },
      { periodo: '4T25', ingresos: 2974, crecimiento_pct: 7.3, crecimiento_organico_pct: null, ebitda: 316, margen_ebitda_pct: 10.6, bpa: 1.52, vs_consenso: null },
      { periodo: '1T26', ingresos: 2924, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 311, margen_ebitda_pct: 10.6, bpa: 2.16, vs_consenso: null },
      { periodo: '2T26', ingresos: 2890, crecimiento_pct: -8.1, crecimiento_organico_pct: null, ebitda: 324, margen_ebitda_pct: 11.2, bpa: 1.42, vs_consenso: 'Inferior' },
      { periodo: '3T26', ingresos: 2620, crecimiento_pct: -10.2, crecimiento_organico_pct: null, ebitda: 285, margen_ebitda_pct: 10.9, bpa: 1.63, vs_consenso: null },
      { periodo: '4T26', ingresos: 2783, crecimiento_pct: -6.4, crecimiento_organico_pct: null, ebitda: 309, margen_ebitda_pct: 11.1, bpa: 1.68, vs_consenso: null },
      { periodo: '1T27', ingresos: 2800, crecimiento_pct: -4.2, crecimiento_organico_pct: null, ebitda: 334, margen_ebitda_pct: 11.9, bpa: 1.63, vs_consenso: 'Superior' },
    ],
    confianza: 'Alta',
  },
  balance: {
    historico: historicoBalance,
    vencimientos: [
      { anio: 'FY2027', importe: 19 }, { anio: 'FY2028', importe: 18 }, { anio: 'FY2029', importe: 737 }, { anio: 'FY2030', importe: 538 }, { anio: 'FY2031+', importe: 3138 },
    ],
    liquidez: 'Caja 540 M a 30-jun-2026 y línea de crédito de 1.500 M sin disponer; liquidez total ≈2.000 M según la empresa [3, 12, 16]. En agosto emitió 1.200 M en bonos (2030 y 2034), amortizó el préstamo A-1 (714 M) y pagó Ultra (720 M) [13, 15, 16].',
    rating: "Moody's Baa3 / S&P BBB-, perspectiva estable (term sheet de los bonos de julio de 2026)",
    coste_deuda_pct: 5.3, vida_media_anios: 5.5,
    confianza: 'Alta',
  },
  flujos: { historico: historicoFlujos, confianza: 'Alta' },
  calidad: { auditor: 'Ernst & Young LLP', anios_auditor: 20, opinion: 'Favorable', confianza: 'Alta' },
  capital: {
    adquisiciones: [
      { anio: 'FY2022', objetivo: 'Liberty IT Solutions (modernización digital para Veteranos)', importe: 725, ev_ebitda: null, financiacion: 'Deuda y caja', resultado: 'Integrada en Civil; sin deterioro del fondo de comercio; el negocio civil cayó un 22 % en 2026 por los recortes federales [1, 9].' },
      { anio: 'FY2023', objetivo: 'EverWatch (ciberoperaciones para inteligencia)', importe: 440, ev_ebitda: null, financiacion: 'Caja', resultado: 'Cerrada tras ganar el pleito antimonopolio del DOJ (oct-2022); refuerza Inteligencia, que crece +1,8 % en 2026 [1, 8].' },
      { anio: 'FY2025', objetivo: 'PAR Government Systems (PGSC)', importe: 97, ev_ebitda: null, financiacion: 'Caja', resultado: 'Pequeña compra de tecnología de defensa; costes de compra de 8 M [6].' },
      { anio: 'FY2027', objetivo: 'Defy Security (ciberseguridad comercial)', importe: 220, ev_ebitda: null, financiacion: 'Caja', resultado: 'Cerrada en el 1T27 (220 M pagados netos de caja en el trimestre) [3].' },
      { anio: 'FY2027', objetivo: 'Ultra I&C Mission Solutions (software de misión, cifrado y computación en el borde)', importe: 720, ev_ebitda: null, financiacion: 'Bonos de 2030 y 2034 (1.200 M, en parte para refinanciar)', resultado: 'Cerrada el 24-ago-2026; múltiplo no publicado [13, 14, 15].' },
    ],
    confianza: 'Alta',
  },
  fuentes: fA,
  huecos: [
    { seccion: 'negocio', campo: 'ingresos por tipo de cliente antes de FY2024', tipo: 'Complemento', intentos: '1) notas de resultados de 2020-2023 (no desglosan por cliente); 2) 10-K de 2026 (solo 2024-2026); 3) presentaciones de resultados (sin series anteriores)', decision: 'Omitido' },
    { seccion: 'trimestres', campo: 'crecimiento interanual de 2T25, 3T25 y 1T26 y consenso previo de cada trimestre', tipo: 'Complemento', intentos: '1) notas de resultados (comparan con el trimestre de un año antes solo en las del ejercicio en curso leídas); 2) presentaciones; 3) prensa (Seeking Alpha solo da el 1T27 y el 2T26)', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Form 10-K del ejercicio 2026: negocio, competencia, entorno político y presupuestario, órdenes ejecutivas', editor: 'Booz Allen Hamilton Holding Corp.', tipo: 'Primaria', fecha: '2026-05-22', url: E + '000162828026037521/bah-20260331.htm' },
  { id: 2, titulo: 'Snapshot of Government-Wide Contracting for FY2025 (793.000 M USD, +17.800 M real)', editor: 'U.S. Government Accountability Office (GAO)', tipo: 'Sectorial', fecha: '2026-05-05', url: 'https://www.gao.gov/blog/snapshot-government-wide-contracting-fy-2025-interactive-dashboard' },
  { id: 3, titulo: 'Federal addressable market shifts (FY25: 792.800 M; DoD 491.600 M; civiles 301.200 M, de ellos 249.000 M en servicios)', editor: 'FederalBudgetIQ', tipo: 'Sectorial', fecha: '2026-02', url: 'https://federalbudgetiq.com/insights/federal-addressable-market-shifts/' },
  { id: 4, titulo: 'Consultants Hurt as Civilian Agencies Lower Annual Spending (servicios de asesoría −19 %; civiles −1/3 a 26.000 M; DoD −1 % a 24.000 M)', editor: 'Bloomberg Government', tipo: 'Prensa', fecha: '2026-01', url: 'https://news.bgov.com/bloomberg-government-news/consultants-hurt-as-civilian-agencies-reel-in-annual-spending-1' },
  { id: 5, titulo: 'Estadísticas de CACI, SAIC, Leidos, Parsons, KBR, ICF y Maximus (capitalización, VE, múltiplos, márgenes, ROIC)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/caci/statistics/' },
  { id: 6, titulo: 'Scott Bessent explains Treasury decision to cancel Booz Allen contracts', editor: 'FedScoop', tipo: 'Prensa', fecha: '2026-04-22', url: 'https://fedscoop.com/scott-bessent-explains-treasury-decision-to-cancel-booz-allen-contracts/' },
  { id: 7, titulo: 'Ficha sectorial: consultoría y servicios tecnológicos para el Gobierno de EE. UU. (15-oct-2026)', editor: 'Análisis propio (repo)', tipo: 'Sectorial', fecha: '2026-10-15', url: 'sectores/consultoria-gobierno-2026-10-15.md' },
  { id: 8, titulo: 'Proxy statement 2026 (DEF 14A): historia de la empresa en la trayectoria del consejo', editor: 'Booz Allen Hamilton Holding Corp.', tipo: 'Primaria', fecha: '2026-06-11', url: E + '000144364626000021/bah-20260611.htm' },
  { id: 9, titulo: 'Booz Allen, OpenAI partner on AI for U.S. government and commercial clients', editor: 'Seeking Alpha (noticia)', tipo: 'Prensa', fecha: '2026-07-23', url: 'https://seekingalpha.com/api/sa/combined/BAH.xml' },
  { id: 10, titulo: 'Notas de resultados del 4T de 2023 y de 2024 (reserva y acuerdo con el DOJ, compras y ventas de negocios)', editor: 'Booz Allen Hamilton', tipo: 'Primaria', fecha: '2024-05-24', url: E + '000144364624000074/q4fy24bahexhibit991.htm' },
];
const B = {
  _estado: 'Completo con la ficha sectorial nueva (sectores/consultoria-gobierno-2026-10-15.md). Márgenes EBIT de los competidores no recogidos: se da el EBITDA de Stock Analysis.',
  historia: {
    hitos: [
      { anio: '2008', hito: 'Separación del negocio comercial (Booz & Company) y compra del negocio público por Carlyle [8].' },
      { anio: '2010', hito: 'Salida a bolsa en la NYSE [8].' },
      { anio: '2015', hito: 'Horacio Rozanski, primer ejecutivo; desde 2018 también presidente [8].' },
      { anio: '2021', hito: 'Compra de Liberty IT Solutions (725 M) para crecer en modernización digital civil [10].' },
      { anio: '2022', hito: 'Compra de EverWatch (440 M) tras ganar el pleito antimonopolio del DOJ [10].' },
      { anio: '2023', hito: 'Reserva de 350 M por la investigación del DOJ sobre imputación de costes (acuerdo en el ejercicio 2024) [10].' },
      { anio: '2025', hito: 'Revisiones de contratos del Gobierno (DOGE): los ingresos civiles caen un 22 % y la plantilla un 12 % en el ejercicio 2026 [1].' },
      { anio: '2026', hito: 'Hacienda cancela sus 31 contratos (21 M de obligaciones) por la filtración de datos fiscales de un antiguo empleado [6].' },
      { anio: '2026', hito: 'Compra de Ultra I&C Mission Solutions (720 M) y de Defy Security: giro hacia productos de defensa [1].' },
    ],
    confianza: 'Media',
  },
  sector: {
    tamano: '≈ 793.000 M USD de contratos federales en el año fiscal 2025 (GAO [2]); servicios de asesoría y gestión ≈ 50.000 M (Bloomberg Government [4])',
    unidad_serie: 'millones de USD (obligaciones de contratos federales)',
    serie: [{ anio: '2024', tamano: 755100 }, { anio: '2025', tamano: 793000 }],
    tcac_historico_pct: null, tcac_previsto_pct: 3.0, cr5_pct: null, estructura: 'Fragmentada',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 1.4,
    competidores: [
      { nombre: 'Leidos', pais: 'EE. UU.', ticker: 'LDOS', ingresos: 17600, cuota_pct: 2.2, margen_ebit_pct: null, comentario: 'El mayor del grupo; margen EBITDA 13,5 %, ROIC 14,3 % [5].' },
      { nombre: 'CACI International', pais: 'EE. UU.', ticker: 'CACI', ingresos: 9560, cuota_pct: 1.2, margen_ebit_pct: null, comentario: 'Más producto propio (guerra electrónica, espectro); margen EBITDA 12,4 %, ROIC 7,4 % [5].' },
      { nombre: 'KBR', pais: 'EE. UU.', ticker: 'KBR', ingresos: 7690, cuota_pct: 1.0, margen_ebit_pct: null, comentario: 'Misión y espacio; margen EBITDA 8,7 % [5].' },
      { nombre: 'SAIC', pais: 'EE. UU.', ticker: 'SAIC', ingresos: 7420, cuota_pct: 0.9, margen_ebit_pct: null, comentario: 'Integración de TI; margen EBITDA 10,2 %, ROIC 12,4 % [5].' },
      { nombre: 'Parsons', pais: 'EE. UU.', ticker: 'PSN', ingresos: 6260, cuota_pct: 0.8, margen_ebit_pct: null, comentario: 'Mitad infraestructuras; margen EBITDA 7,5 % [5].' },
      { nombre: 'Maximus', pais: 'EE. UU.', ticker: 'MMS', ingresos: 5220, cuota_pct: 0.7, margen_ebit_pct: null, comentario: 'Servicios civiles de salud y sociales; margen EBITDA 13,2 % [5].' },
      { nombre: 'ICF International', pais: 'EE. UU.', ticker: 'ICFI', ingresos: 1820, cuota_pct: 0.2, margen_ebit_pct: null, comentario: 'Consultoría civil, la más expuesta a los recortes; margen EBITDA 10,8 % [5].' },
      { nombre: 'Accenture Federal Services y Deloitte (Gobierno)', pais: 'EE. UU.', ticker: null, ingresos: null, cuota_pct: null, comentario: 'Filiales de grandes consultoras, no cotizan por separado; compiten en civil y en IA [1].' },
    ],
    confianza: 'Media',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'competencia', campo: 'margen EBIT del último ejercicio de cada competidor', tipo: 'Complemento', intentos: '1) Stock Analysis estadísticas (solo margen EBITDA); 2) notas de resultados de cada competidor (no leídas por tiempo); 3) MarketScreener (EBIT de consenso, otra base)', decision: 'Omitido; se da el margen EBITDA en el comentario' },
    { seccion: 'sector', campo: 'serie de 5-8 años del mercado y CR5', tipo: 'Complemento', intentos: '1) GAO (solo 2024 y 2025 en el blog); 2) FederalBudgetIQ (2025); 3) Bloomberg Government (de pago)', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Proxy statement 2026 (DEF 14A): consejo, comisiones, remuneración, participaciones', editor: 'Booz Allen Hamilton Holding Corp.', tipo: 'Primaria', fecha: '2026-06-11', url: E + '000144364626000021/bah-20260611.htm' },
  { id: 2, titulo: 'Resultados de la junta del 22-jul-2026 (8-K, Item 5.07)', editor: 'Booz Allen Hamilton (8-K)', tipo: 'Primaria', fecha: '2026-07-24', url: E + '000144364626000029/bah-20260722.htm' },
  { id: 3, titulo: 'Nombramiento de Troy Lahr (director financiero) y de Kristine Martin Anderson (presidenta) (8-K)', editor: 'Booz Allen Hamilton (8-K)', tipo: 'Primaria', fecha: '2026-04-27', url: E + '000144364626000007/leadershipchanges042726.htm' },
  { id: 4, titulo: 'Dimisión del director financiero Matthew Calderone (8-K)', editor: 'Booz Allen Hamilton (8-K)', tipo: 'Primaria', fecha: '2025-12-15', url: E + '000144364625000148/bah-20251211.htm' },
  { id: 5, titulo: 'Nombramiento de Ryan P. Nolan como consejero (8-K)', editor: 'Booz Allen Hamilton (8-K)', tipo: 'Primaria', fecha: '2026-05-12', url: E + '000144364626000014/nolanbodappointmentvf.htm' },
  { id: 6, titulo: 'Formularios 4 de consejeros y directivos (15-oct-2025 a 15-oct-2026)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001443646&type=4' },
  { id: 7, titulo: 'Notas de resultados del 4T de 2022, 2023, 2024, 2025 y 2026 y del 2T de 2026 (guías anuales y su cumplimiento)', editor: 'Booz Allen Hamilton', tipo: 'Primaria', fecha: '2026-05-22', url: E + '000162828026037519/bahexhibit991q4fy26_fina.htm' },
  { id: 8, titulo: 'Form 10-K del ejercicio 2026: litigios, investigaciones, orden ejecutiva sobre recompras de contratistas de defensa', editor: 'Booz Allen Hamilton Holding Corp.', tipo: 'Primaria', fecha: '2026-05-22', url: E + '000162828026037521/bah-20260331.htm' },
  { id: 9, titulo: 'Scott Bessent explains Treasury decision to cancel Booz Allen contracts', editor: 'FedScoop', tipo: 'Prensa', fecha: '2026-04-22', url: 'https://fedscoop.com/scott-bessent-explains-treasury-decision-to-cancel-booz-allen-contracts/' },
];
const C = {
  _estado: 'Completo con el proxy de 2026, la junta de julio y los Form 4.',
  directivos: {
    equipo: [
      { nombre: 'Horacio D. Rozanski', cargo: 'Presidente y primer ejecutivo', desde: '2015', participacion_pct: 0.56, trayectoria: 'En la empresa desde 1992; dirigió la separación de 2008 y la salida a bolsa de 2010. Con él los ingresos pasaron de 5.300 M (FY2015) a 12.000 M (FY2025) y el BPA ajustado de 1,5 a 6,35 USD; en FY2026 los ingresos cayeron un 6,4 % [1, 7].' },
      { nombre: 'Kristine Martin Anderson', cargo: 'Presidenta y directora de operaciones', desde: '2026', participacion_pct: null, trayectoria: '20 años en la empresa; directora de operaciones desde 2022, antes dirigió Civil; directora financiera en funciones de febrero a mayo de 2026 [3].' },
      { nombre: 'Troy Lahr', cargo: 'Director financiero', desde: '2026', participacion_pct: null, trayectoria: 'Desde el 4-may-2026; antes director financiero de Sierra Space y del negocio de Defensa, Espacio y Seguridad de Boeing (27.000 M USD) [3].' },
      { nombre: 'Richard C. Crowe', cargo: 'Director de crecimiento', desde: '2024', participacion_pct: null, trayectoria: 'Directivo con remuneración de 2,8 M en FY2026 [1].' },
      { nombre: 'Steve Escaravage', cargo: 'Presidente del negocio de tecnología de defensa', desde: '2026', participacion_pct: null, trayectoria: 'Dirige el negocio de productos de defensa en el que se integra Ultra Mission Solutions [1].' },
    ],
    historial_guidance: [
      { anio: 'FY2023', guia: 'Ingresos +5-9 %; BPA ajustado 4,15-4,45 USD', real: 'Ingresos +10,7 %; BPA ajustado 4,56', cumplida: 'Sí' },
      { anio: 'FY2024', guia: 'Ingresos +7-11 %; BPA ajustado 4,80-4,95 USD', real: 'Ingresos +15,2 %; BPA ajustado 5,50', cumplida: 'Sí' },
      { anio: 'FY2025', guia: 'Ingresos +8-11 %; EBITDA ajustado 1.260-1.300 M; BPA ajustado 5,80-6,05', real: 'Ingresos +12,4 %; EBITDA ajustado 1.315 M; BPA ajustado 6,35', cumplida: 'Sí' },
      { anio: 'FY2026', guia: 'Ingresos 12.000-12.500 M (0-4 %); EBITDA ajustado 1.315-1.370 M; BPA ajustado 6,20-6,55 (rebajada en oct-2025 a 11.300-11.500 M)', real: 'Ingresos 11.217 M (−6,4 %); EBITDA ajustado 1.229 M; BPA ajustado 6,51 (con créditos fiscales)', cumplida: 'No' },
      { anio: 'FY2027', guia: 'Ingresos 11.200-11.700 M (0-4 %); EBITDA ajustado 1.240-1.290 M; BPA ajustado 6,00-6,35; FCF 825-925 M', real: 'Mantenida en julio (1T27: EBITDA ajustado +7,4 %)', cumplida: 'Parcial' },
    ],
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      { nombre: 'Horacio D. Rozanski', cargo: 'Presidente y primer ejecutivo', tipo: 'Ejecutivo', desde: '2014', comisiones: 'Ejecutiva' },
      { nombre: 'Mark Gaumond', cargo: 'Consejero coordinador independiente', tipo: 'Independiente', desde: '2011', comisiones: 'Ejecutiva; Auditoría (desde jul-2026)' },
      { nombre: 'Debra L. Dial', cargo: 'Consejera', tipo: 'Independiente', desde: '2025', comisiones: 'Auditoría (presidenta)' },
      { nombre: 'Michèle A. Flournoy', cargo: 'Consejera', tipo: 'Independiente', desde: '2018', comisiones: 'n.d.' },
      { nombre: 'Ellen Jewett', cargo: 'Consejera', tipo: 'Independiente', desde: '2018', comisiones: 'n.d.' },
      { nombre: 'Gretchen W. McClain', cargo: 'Consejera', tipo: 'Independiente', desde: '2014', comisiones: 'n.d.' },
      { nombre: 'Ryan P. Nolan', cargo: 'Consejero', tipo: 'Independiente', desde: '2026', comisiones: 'Auditoría' },
      { nombre: "Robert C. O'Brien", cargo: 'Consejero', tipo: 'Independiente', desde: '2025', comisiones: 'n.d.' },
      { nombre: 'Rory P. Read', cargo: 'Consejero', tipo: 'Independiente', desde: '2023', comisiones: 'n.d.' },
      { nombre: 'William M. Thornberry', cargo: 'Consejero', tipo: 'Independiente', desde: '2024', comisiones: 'n.d.' },
    ],
    presidente_ceo_separados: false, presidente_ejecutivo: true, consejero_coordinador: true, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: false, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 96.7, voto_remuneracion_contra_pct: 3.2, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: 'FY2026', total: 13.80, fijo: 1.50, variable_corto: 1.80, variable_largo: 10.25, ratio_salario_medio: 87 },
    accionistas: [
      { nombre: 'BlackRock', pct: 10.93, tipo: 'Gestora (13G/A)', variacion: 'Datos a 31-dic-2025' },
      { nombre: 'Vanguard Portfolio Management', pct: 6.60, tipo: 'Gestora (13G)', variacion: 'Datos a 31-mar-2026' },
      { nombre: 'T. Rowe Price Investment Management', pct: 5.45, tipo: 'Gestora (13G)', variacion: 'Datos a 31-dic-2025' },
      { nombre: 'Vanguard Capital Management', pct: 5.27, tipo: 'Gestora (13G)', variacion: 'Datos de 2026' },
      { nombre: 'Consejeros y directivos (22 personas)', pct: 1.08, tipo: 'Internos', variacion: 'Rozanski 672.587 acciones' },
      { nombre: 'Autocartera', pct: 29.5, tipo: 'Autocartera (sobre emitidas)', variacion: '50,2 M de 170,5 M emitidas a jun-2026' },
    ],
    insiders: [
      { fecha: '2025-10-30', persona: 'Horacio Rozanski (primer ejecutivo)', operacion: 'Compra', acciones: 23800, importe: 2.01 },
      { fecha: '2026-02-26', persona: 'Dennis Metzfield (controller)', operacion: 'Venta', acciones: 350, importe: 0.03 },
      { fecha: '2026-08-13', persona: 'Dennis Metzfield (controller)', operacion: 'Venta', acciones: 469, importe: 0.04 },
    ],
    alertas: [
      'Hacienda canceló en enero de 2026 sus 31 contratos (21 M de obligaciones) por la filtración de declaraciones fiscales de un antiguo contratista; el secretario Bessent lo reiteró en el Senado el 22-abr-2026 [9].',
      'Acuerdo con el DOJ en el ejercicio 2024 por imputación de costes (reserva de 350 M en FY2023) [8].',
      'Rotación del director financiero: Calderone dimitió en dic-2025; Lahr entró en mayo de 2026 [3, 4].',
      'Orden ejecutiva de 7-ene-2026 que puede limitar recompras y dividendos de contratistas de defensa que incumplan [8].',
    ],
    confianza: 'Alta',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'comisiones de cada consejero', tipo: 'Complemento', intentos: '1) proxy 2026, tabla de comisiones (símbolos sin texto en la extracción); 2) web de gobierno corporativo (no leída); 3) 8-K de nombramientos (solo Dial, Gaumond y Nolan)', decision: 'Omitido salvo las conocidas' },
  ],
};

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Yahoo Finance, históricos diarios de BAH, SPY y XLI (precio, rango, rentabilidades, beta, cierres de marzo)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/BAH/history' },
  { id: 2, titulo: 'MarketScreener: estimaciones anuales de BAH (ventas, EBITDA, EBIT, beneficio, BPA, DPA, deuda neta, FCF; FY2027-FY2029)', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-14', url: 'https://uk.marketscreener.com/quote/stock/BOOZ-ALLEN-HAMILTON-HOLDI-6873099/finances/' },
  { id: 3, titulo: 'MarketScreener: consenso de BAH (15 analistas, «Mantener», objetivo medio 84,38 USD, rango 63-140) y cambios de objetivos', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-14', url: 'https://uk.marketscreener.com/quote/stock/BOOZ-ALLEN-HAMILTON-HOLDI-6873099/consensus/' },
  { id: 4, titulo: 'Stock Analysis: estadísticas de BAH (VE, PER adelantado, ROIC, posición corta 5,81 %)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/bah/statistics/' },
  { id: 5, titulo: 'Stock Analysis: estadísticas de CACI', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/caci/statistics/' },
  { id: 6, titulo: 'Stock Analysis: estadísticas de SAIC', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/saic/statistics/' },
  { id: 7, titulo: 'Stock Analysis: estadísticas de Leidos', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/ldos/statistics/' },
  { id: 8, titulo: 'Stock Analysis: estadísticas de Parsons', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/psn/statistics/' },
  { id: 9, titulo: 'Stock Analysis: estadísticas de KBR', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/kbr/statistics/' },
  { id: 10, titulo: 'Stock Analysis: estadísticas de ICF International', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/icfi/statistics/' },
  { id: 11, titulo: 'Stock Analysis: estadísticas de Maximus', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/mms/statistics/' },
  { id: 12, titulo: 'Rentabilidad del bono del Tesoro a 10 años (DGS10): 5,21 % el 13-oct-2026', editor: 'FRED, Banco de la Reserva Federal de San Luis', tipo: 'Datos de mercado', fecha: '2026-10-13', url: 'https://fred.stlouisfed.org/series/DGS10' },
  { id: 13, titulo: 'Implied ERP by month (ERPbymonth.xlsx): 4,20 % en octubre de 2026', editor: 'A. Damodaran, NYU Stern', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 14, titulo: 'Nota de resultados del 1T del ejercicio 2027: balance a 30-jun-2026, acciones en circulación, guía 2027', editor: 'Booz Allen Hamilton', tipo: 'Primaria', fecha: '2026-07-24', url: E + '000162828026049494/q1fy2027exhibit991_final.htm' },
  { id: 15, titulo: 'Booz Allen schedules Q2 FY2027 earnings call for October 23, 2026', editor: 'BriefGlance', tipo: 'Prensa', fecha: '2026-09', url: 'https://briefglance.com/companies/booz-allen-hamilton-holding-corporation/pulses/77526' },
  { id: 16, titulo: 'Nota de cierre de Ultra I&C Mission Solutions (720 M USD, múltiplo no publicado)', editor: 'Booz Allen Hamilton (8-K)', tipo: 'Primaria', fecha: '2026-08-24', url: E + '000144364626000058/ultraclosepressreleasevf.htm' },
  { id: 17, titulo: 'Notas de resultados de 2022 y 2023: compras de Liberty (725 M) y EverWatch (440 M)', editor: 'Booz Allen Hamilton', tipo: 'Primaria', fecha: '2023-05-26', url: E + '000144364623000088/bah033123exhibit991_fina.htm' },
];
const D = {
  _estado: 'Completo. Precio y bolsa de bolsa.mjs (cierre del 14-oct-2026; la sesión del 15-oct no había cerrado). Consenso de MarketScreener; comparables de Stock Analysis (PER adelantado sobre BPA ajustado de cada empresa).',
  identificacion: {
    nombre: 'Booz Allen Hamilton Holding Corporation', nombre_corto: 'Booz Allen', ticker: 'BAH', isin: 'US0995021062', mercado: 'NYSE', indice_referencia: 'S&P 500',
    pais: 'Estados Unidos', pais_iso: 'US', sector: 'Industria', industria: 'Servicios profesionales (consultoría y tecnología para el Gobierno)', sede: 'McLean, Virginia', fundacion: '1914', empleados: 30900, web: 'www.boozallen.com',
    precio: bolsa.identificacion.precio, fecha_precio: bolsa.identificacion.fecha_precio, acciones: 120.3, capitalizacion_publicada: 8640, free_float_pct: 98.9,
    max_52s: bolsa.identificacion.max_52s, min_52s: bolsa.identificacion.min_52s, volumen_medio_diario: `≈ ${String(bolsa.volumen_3m.importe_dia_millones).replace('.', ',')} M USD/día (3 meses)`, proximos_resultados: '2026-10-23',
  },
  consenso: {
    guidance: 'Guía del ejercicio 2027 (22-may-2026, mantenida el 24-jul-2026): ingresos 11.200-11.700 M (0-4 %), EBITDA ajustado 1.240-1.290 M (margen ≈11 %), BPA ajustado 6,00-6,35 USD con un tipo fiscal del 20-23 % y 118-120 M de acciones, FCF 825-925 M con un capex de 220 M (105 M de la nueva sede) [14]. La guía es anterior a la compra de Ultra (720 M, cerrada el 24-ago-2026) [16]. No hay plan a medio plazo vigente: el anterior («VoLT», hasta FY2025) se cumplió.',
    estimaciones: [
      { periodo: 'FY2027e', ingresos: 11422, ebitda: 1274, ebit: 1112, bpa: 5.92, dpa: 2.41, fuente: 'MarketScreener [2]' },
      { periodo: 'FY2028e', ingresos: 11955, ebitda: 1332, ebit: 1179, bpa: 6.39, dpa: 2.53, fuente: 'MarketScreener [2]' },
      { periodo: 'FY2029e', ingresos: 12406, ebitda: 1393, ebit: 1245, bpa: 7.02, dpa: 2.62, fuente: 'MarketScreener [2]' },
    ],
    recomendaciones: { n_analistas: 15, comprar: null, mantener: null, vender: null, po_medio: 84.38, po_min: 63.0, po_max: 140.0 },
    revisiones: 'En 3 meses los objetivos se estabilizan tras un año de recortes: Truist pasó a Comprar con 85 USD (8-oct; había bajado a 70 en julio), UBS subió de 70 a 78 (27-jul) y BofA bajó de 90 a 75 (20-jul); Stifel pasó a Comprar con 110 en mayo [3]. El BPA de FY2027 del consenso (5,92) queda bajo la guía ajustada (6,00-6,35) porque MarketScreener lo da con la amortización de compras y los gastos no recurrentes; el EBITDA (1.274 M) es el ajustado de la empresa [2]. Solo una fuente gratuita con estimaciones completas.',
    base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: 0.3,
    confianza: 'Media',
  },
  bolsa: { ...bolsa.bolsa, posicion_corta_pct: 5.81, confianza: 'Alta' },
  multiplos_historicos: {
    serie: bolsa.cierres_ejercicio.filter((c) => anios.map((a) => 'FY' + a).includes(c.anio)).map((c) => ({ anio: c.anio, precio_cierre: c.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    confianza: 'Alta',
  },
  comparables: {
    criterio: 'Contratistas de servicios tecnológicos y profesionales para el Gobierno de EE. UU. con el mismo modelo (contratos de coste más margen, por horas y precio fijo; plantilla con habilitación de seguridad): Leidos, CACI, SAIC, KBR, Parsons, ICF y Maximus. Fuera Accenture (excluida por el usuario y con poco peso federal) y los fabricantes de defensa (Lockheed, General Dynamics), con otro modelo de capital. PER adelantado de Stock Analysis sobre el BPA AJUSTADO de cada empresa (sin amortización de compras): para BAH en esa base sería 11,6x [4-11].',
    empresas: [
      { nombre: 'Leidos', ticker: 'LDOS', pais: 'US', capitalizacion: 15130, ev_ventas: 1.19, ev_ebitda_ltm: 8.8, ev_ebitda_ntm: null, per_ntm: 10.0, crecimiento_pct: 5.1, margen_ebitda_pct: 13.5, roic_pct: 14.3, dn_ebitda: 2.6, fcf_yield_pct: 14.3 },
      { nombre: 'CACI International', ticker: 'CACI', pais: 'US', capitalizacion: 13350, ev_ventas: 1.94, ev_ebitda_ltm: 15.6, ev_ebitda_ntm: null, per_ntm: 18.0, crecimiento_pct: 8.4, margen_ebitda_pct: 12.4, roic_pct: 7.4, dn_ebitda: 4.1, fcf_yield_pct: 5.8 },
      { nombre: 'SAIC', ticker: 'SAIC', pais: 'US', capitalizacion: 5510, ev_ventas: 1.09, ev_ebitda_ltm: 10.8, ev_ebitda_ntm: null, per_ntm: 12.8, crecimiento_pct: 1.4, margen_ebitda_pct: 10.2, roic_pct: 12.4, dn_ebitda: 3.3, fcf_yield_pct: 11.2 },
      { nombre: 'KBR', ticker: 'KBR', pais: 'US', capitalizacion: 4440, ev_ventas: 0.90, ev_ebitda_ltm: 10.3, ev_ebitda_ntm: null, per_ntm: 8.6, crecimiento_pct: 4.6, margen_ebitda_pct: 8.7, roic_pct: 10.2, dn_ebitda: 3.3, fcf_yield_pct: 7.8 },
      { nombre: 'Parsons', ticker: 'PSN', pais: 'US', capitalizacion: 4570, ev_ventas: 0.95, ev_ebitda_ltm: 12.6, ev_ebitda_ntm: null, per_ntm: 13.0, crecimiento_pct: 3.6, margen_ebitda_pct: 7.5, roic_pct: 6.6, dn_ebitda: 3.0, fcf_yield_pct: 6.7 },
      { nombre: 'ICF International', ticker: 'ICFI', pais: 'US', capitalizacion: 1550, ev_ventas: 1.16, ev_ebitda_ltm: 10.7, ev_ebitda_ntm: null, per_ntm: 11.6, crecimiento_pct: 5.3, margen_ebitda_pct: 10.8, roic_pct: 6.9, dn_ebitda: 2.6, fcf_yield_pct: 12.8 },
      { nombre: 'Maximus', ticker: 'MMS', pais: 'US', capitalizacion: 3020, ev_ventas: 0.90, ev_ebitda_ltm: 6.8, ev_ebitda_ntm: null, per_ntm: 7.0, crecimiento_pct: 2.4, margen_ebitda_pct: 13.2, roic_pct: 13.3, dn_ebitda: 2.3, fcf_yield_pct: 14.3 },
    ],
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2021-11', objetivo: 'Liberty IT Solutions', comprador: 'Booz Allen', ev: 725, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Modernización digital civil (Veteranos); múltiplo no publicado [17].' },
      { fecha: '2022-10', objetivo: 'EverWatch', comprador: 'Booz Allen', ev: 440, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Ciberoperaciones para inteligencia [17].' },
      { fecha: '2026-08', objetivo: 'Ultra I&C Mission Solutions', comprador: 'Booz Allen', ev: 720, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Productos de software de misión y cifrado comprados a Cobham Ultra (Advent) [16].' },
    ],
    confianza: 'Baja',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'transacciones', campo: 'múltiplos pagados (EV/ventas, EV/EBITDA) de las compras del sector', tipo: 'Complemento', intentos: '1) notas y 8-K de Booz Allen (Liberty, EverWatch, Ultra: sin ventas ni EBITDA de las compradas); 2) prensa de compras de competidores (múltiplos de prensa sin nota oficial); 3) búsqueda web de múltiplos del sector (resúmenes de buscador, no válidos)', decision: 'Omitido' },
    { seccion: 'comparables', campo: 'EV/EBITDA de los próximos 12 meses de los comparables', tipo: 'Complemento', intentos: '1) Stock Analysis (solo LTM); 2) MarketScreener de cada uno (no consultado por tiempo); 3) consenso de EBITDA del sector (sin fuente gratuita homogénea)', decision: 'Omitido' },
    { seccion: 'consenso', campo: 'reparto de recomendaciones (comprar/mantener/vender)', tipo: 'Complemento', intentos: '1) MarketScreener (solo media «Mantener» y 15 analistas); 2) Stock Analysis (de pago); 3) prensa', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Seeking Alpha: canal RSS de BAH (análisis y noticias, abr-oct 2026)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-08', url: 'https://seekingalpha.com/api/sa/combined/BAH.xml' },
  { id: 2, titulo: 'Stocktwits: flujo de mensajes de $BAH (jul-oct 2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-12', url: 'https://api.stocktwits.com/api/2/streams/symbol/BAH.json' },
  { id: 3, titulo: 'MarketScreener: cambios de recomendación y objetivo de los analistas (jul-oct 2026)', editor: 'MarketScreener', tipo: 'Foros y redes', fecha: '2026-10-14', url: 'https://uk.marketscreener.com/quote/stock/BOOZ-ALLEN-HAMILTON-HOLDI-6873099/consensus/' },
];
const Es = {
  _estado: 'Completo con tres sitios; Reddit no abre en la nube.',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Seeking Alpha (análisis de autores)', fecha: '2026-10', n_comentarios: 8, tono: 'Positivo', resumen: 'Desde junio predominan los artículos alcistas («la caída ya está descontada», «más resistente de lo que cree el mercado», «el mercado ignora el segmento que crece»): ven barato un negocio de seguridad nacional que sigue creciendo mientras cae Civil [1].' },
      { plataforma: 'Seeking Alpha (noticias y titulares)', fecha: '2026-10', n_comentarios: 20, tono: 'Dividido', resumen: 'Titulares de mejoras de recomendación (Stifel en mayo, Truist en octubre) y de la compra de Ultra, frente a la cancelación de contratos de Hacienda y el riesgo de recortes civiles [1].' },
      { plataforma: 'Stocktwits', fecha: '2026-10', n_comentarios: 35, tono: 'Dividido', resumen: 'Particulares que compran en 68-70 USD y otros que piden vender todos los contratistas federales por el riesgo de prórrogas presupuestarias tras las elecciones de mitad de mandato; debate sobre si la IA sustituye a los consultores [2].' },
      { plataforma: 'MarketScreener (notas de analistas)', fecha: '2026-10', n_comentarios: 6, tono: 'Neutro', resumen: 'Consenso «Mantener» con objetivos que dejan de bajar: de 90 a 75 (BofA), de 70 a 78 (UBS) y de 70 a 85 (Truist) [3].' },
    ],
    temas: [
      { tema: 'Recortes civiles (DOGE) y riesgo presupuestario', postura: 'Dividida', peso: 'Alto', contraste: 'Civil cayó un 22 % en FY2026 y un 16 % en el 1T27, pero ya pesa solo el 28 % de las ventas; seguridad nacional +1,3 % en el 1T27.' },
      { tema: 'Valoración: PER adelantado en mínimos de una década', postura: 'Alcista', peso: 'Alto', contraste: 'Cierto: el PER adelantado (≈13x sobre BPA normalizado) está en el mínimo de su historia desde 2018; la mediana de cinco años es ≈19x.' },
      { tema: 'IA: amenaza para el modelo por horas u oportunidad (alianza con OpenAI)', postura: 'Dividida', peso: 'Medio', contraste: 'La plantilla baja un 12 % con los ingresos estables en seguridad nacional; el margen sube (11,9 % en el 1T27). Ver riesgos.' },
      { tema: 'Reputación y contratos de Hacienda', postura: 'Bajista', peso: 'Bajo', contraste: 'Efecto directo pequeño (21 M de obligaciones), pero recuerda el riesgo de reputación con un cliente único.' },
    ],
    confianza: 'Media',
  },
  fuentes: fE,
  huecos: [],
};

guarda('A', A); guarda('B', B); guarda('C', C); guarda('D', D); guarda('E', Es);
console.log('Notas A-E escritas.');
