// Escribe las notas A-E de Brady Corporation (BRC, corte 2026-10-15) a partir de los documentos de EDGAR descargados en notas/docs,
// del XBRL de la SEC (cuentas-xbrl.json y companyfacts), de bolsa.json (Yahoo) y de comparables-yahoo.json. Sin subagentes.
// Ejercicio fiscal a 31 de julio: «FY2026» = agosto de 2025 a julio de 2026 (etiqueta «fin»).
// Cada nota cita solo con [n] de su propia lista de fuentes. Ejecutar: node notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const lee = (f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const X = lee('cuentas-xbrl.json');
const BO = lee('bolsa.json');
const r1 = (v) => (v == null ? null : Math.round(v * 10) / 10);
const r2 = (v) => (v == null ? null : Math.round(v * 100) / 100);
const E = 'https://www.sec.gov/Archives/edgar/data/746598';
const FY = (p) => `FY${p}`;

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Form 10-K del ejercicio cerrado el 31-jul-2026 (cuentas auditadas, segmentos, deuda, hechos posteriores: compra de PSS; parte III: consejo, remuneración y accionistas)', editor: 'Brady Corporation (SEC)', tipo: 'Primaria', fecha: '2026-09-03', url: `${E}/000074659826000044/brc-20260731.htm` },
  { id: 2, titulo: 'Brady Corporation Reports 2026 Fourth Quarter and Record Full Year Results (8-K, anexo 99.1)', editor: 'Brady Corporation (SEC)', tipo: 'Primaria', fecha: '2026-09-03', url: `${E}/000074659826000043/exhibit991-financialsx2026.htm` },
  { id: 3, titulo: 'Fourth Quarter Fiscal 2026 Informational Slides (8-K, anexo 99.3): series trimestrales FY23-FY26 y guía FY27', editor: 'Brady Corporation (SEC)', tipo: 'Primaria', fecha: '2026-09-03', url: `${E}/000074659826000043/f26q4conferencecallprese.htm` },
  { id: 4, titulo: 'XBRL companyfacts de Brady Corp (CIK 746598): cuenta, balance y flujos FY2017-FY2026, amortización de intangibles y deuda', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0000746598.json' },
  { id: 5, titulo: 'Brady Corporation to Acquire Honeywell\'s Productivity Solutions and Services Business (8-K, anexo 99.1)', editor: 'Brady Corporation (SEC)', tipo: 'Primaria', fecha: '2026-04-20', url: `${E}/000074659826000014/exhibit991pressrelease-202.htm` },
  { id: 6, titulo: 'Form 8-K: cierre de la compra de PSS y colocación privada de 800 M en bonos (5,43-5,90 %)', editor: 'Brady Corporation (SEC)', tipo: 'Primaria', fecha: '2026-08-06', url: `${E}/000074659826000034/brc-20260803.htm` },
  { id: 7, titulo: 'Form 8-K: nuevo contrato de crédito de 1.000 M (préstamo de 500 M y línea de 500 M, vence en 2031)', editor: 'Brady Corporation (SEC)', tipo: 'Primaria', fecha: '2026-06-18', url: `${E}/000074659826000030/brc-20260612.htm` },
  { id: 8, titulo: 'Brady Corporation Completes Transformational Acquisition of Honeywell Technologies\' PSS Business (8-K, anexo 99.1)', editor: 'Brady Corporation (SEC)', tipo: 'Primaria', fecha: '2026-08-03', url: `${E}/000074659826000034/exhibit991-pressreleasex20.htm` },
  { id: 9, titulo: 'Brady Corp Plans to Acquire Gravotech Holding (8-K, anexo 99.1)', editor: 'Brady Corporation (SEC)', tipo: 'Primaria', fecha: '2024-03-15', url: `${E}/000074659824000012/exhibit991pressrelease.htm` },
  { id: 10, titulo: 'Brady completes acquisition of Gravotech (8-K, anexo 99.1): ventas y EBITDA previstos para FY2025', editor: 'Brady Corporation (SEC)', tipo: 'Primaria', fecha: '2024-08-01', url: `${E}/000074659824000057/exhibit991-pressrelease.htm` },
  { id: 11, titulo: 'Brady Non-GAAP EPS of $1.50 beats by $0.16, revenue of $435.24M beats by $29.17M', editor: 'Seeking Alpha', tipo: 'Prensa', fecha: '2026-05-18', url: 'https://seekingalpha.com/symbol/BRC' },
  { id: 12, titulo: 'Brady Increases Annual Dividend (8-K, anexo 99.2)', editor: 'Brady Corporation (SEC)', tipo: 'Primaria', fecha: '2026-09-03', url: `${E}/000074659826000043/exhibit992-dividendrelease.htm` },
];

// No recurrentes dentro del EBIT (gasto en positivo) según la conciliación de la empresa [2]: FY2026 costes de la compra de PSS
// (35,7 M) y transición del CEO (6,1 M); FY2025 cierre de plantas y reorganización (18,5 M) y costes de compras (5,1 M).
const noRec = { 2025: 23.5, 2026: 41.8 };
const bpa = { 2017: 1.84, 2018: 1.73, 2019: 2.46, 2020: 2.11, 2021: 2.47, 2022: 2.90, 2023: 3.50, 2024: 4.07, 2025: 3.94, 2026: 4.30 };
const dpa = { 2017: 0.82, 2018: 0.83, 2019: 0.85, 2020: 0.87, 2021: 0.88, 2022: 0.90, 2023: 0.92, 2024: 0.94, 2025: 0.96, 2026: 0.98 };
const deuda = { 2020: 0, 2021: 38.0, 2022: 95.0, 2023: 49.7 };
const cuenta = X.financieros.cuenta.map((c) => {
  const o = { ...c, periodo: FY(c.periodo), minoritarios: 0, no_recurrentes_en_ebitda: noRec[c.periodo] ?? null, participadas_en_ebitda: null, bpa: bpa[c.periodo], dpa: dpa[c.periodo], dpa_extraordinario: 0 };
  delete o.fin;
  return o;
});
const balance = X.balance.historico.map((b) => {
  const o = { ...b, periodo: FY(b.periodo) };
  delete o.fin;
  if (o.deuda_financiera == null || deuda[b.periodo] != null) o.deuda_financiera = deuda[b.periodo] ?? o.deuda_financiera;
  if (['2018', '2019', '2020'].includes(b.periodo)) o.patrimonio_neto = Math.round((b.activo_total - b.pasivo_total) * 10) / 10; // el XBRL repite 700 M: patrimonio = activo − pasivo del balance
  o.minoritarios = 0;
  o.arrendamientos = 0; // US GAAP: arrendamientos operativos (68,6 M en FY2026) ya dentro del EBITDA; no van a la deuda
  o.activos_contrato = null; o.pasivos_contrato = null;
  return o;
});
const flujos = X.flujos.historico.map((f) => {
  const o = { ...f, periodo: FY(f.periodo) };
  delete o.fin;
  o.adquisiciones = f.adquisiciones ?? 0;
  o.desinversiones = f.desinversiones ?? 0;
  o.pagos_arrendamientos = 0;
  o.intereses_en_financiacion = 0;
  return o;
});

const A = {
  _estado: 'Completa. Cuenta, balance y flujos FY2017-FY2026 del XBRL de la SEC comprobados con el 10-K FY2026 y la nota de resultados del 4T; BPA de la clase A diluido; deuda FY2020-FY2023 de LineOfCredit del companyfacts.',
  negocio: {
    segmentos: [
      { nombre: 'Americas & Asia', descripcion: 'Norteamérica, Latinoamérica y Asia: identificación de cables, productos, seguridad e instalaciones y sanidad; incluye Code, AB&R, Mecco y la parte americana de Gravotech. Beneficio del segmento antes de costes centrales.', tipo_resultado: 'EBIT', historico: [{ periodo: 'FY2024', ingresos: 886.5, resultado: 196.8 }, { periodo: 'FY2025', ingresos: 993.7, resultado: 209.8 }, { periodo: 'FY2026', ingresos: 1106.6, resultado: 256.6 }] },
      { nombre: 'Europe & Australia', descripcion: 'Europa, Oriente Medio, África y Australia: señalización de seguridad (Seton, Signals), identificación de personas y de productos; incluye Gravotech (Francia) desde agosto de 2024.', tipo_resultado: 'EBIT', historico: [{ periodo: 'FY2024', ingresos: 454.9, resultado: 70.6 }, { periodo: 'FY2025', ingresos: 519.9, resultado: 56.9 }, { periodo: 'FY2026', ingresos: 554.9, resultado: 74.3 }] },
      { nombre: 'Costes centrales no asignados', descripcion: 'Finanzas, sistemas, recursos humanos y, en FY2026, 35,7 M de costes de la compra de PSS y 6,1 M de la transición del CEO. Sin ventas.', tipo_resultado: 'EBIT', historico: [{ periodo: 'FY2024', ingresos: 0, resultado: -24.0 }, { periodo: 'FY2025', ingresos: 0, resultado: -30.1 }, { periodo: 'FY2026', ingresos: 0, resultado: -67.4 }] },
    ],
    geografias: [
      { nombre: 'Américas', peso_pct: 57.5 },
      { nombre: 'Europa', peso_pct: 29.8 },
      { nombre: 'Asia', peso_pct: 9.1 },
      { nombre: 'Australia', peso_pct: 3.6 },
    ],
    geografias_criterio: 'origen',
    kpis: [
      { kpi: 'Crecimiento orgánico de ventas', valor_anterior: '+2,6 % (FY2025)', valor_actual: '+5,3 % (FY2026)', variacion: '+2,7 puntos', comentario: '+8,2 % y +8,4 % en el 3T y el 4T; Asia +15 % y Américas +6 % en el año; Europa +1,2 % [1, 3].' },
      { kpi: 'Ventas de identificación de cables (wire ID)', valor_anterior: '247,9 M (FY2025)', valor_actual: '289,1 M (FY2026)', variacion: '+16,6 %', comentario: 'Centros de datos: casi +20 % en Americas & Asia en el 4T [1, 3].' },
      { kpi: 'Ventas de identificación de productos', valor_anterior: '428,7 M (FY2025)', valor_actual: '497,7 M (FY2026)', variacion: '+16,1 % (con Mecco)', comentario: 'Impresoras, consumibles, escáneres, RFID y grabado (Gravotech); unidades de impresoras +25 % en el 4T [1, 3].' },
      { kpi: 'Margen bruto', valor_anterior: '50,3 % (FY2025)', valor_actual: '51,7 % (FY2026)', variacion: '+1,4 puntos', comentario: '52,9 % en el 4T, con una devolución de aranceles [1, 3].' },
      { kpi: 'Beneficio de los segmentos / ventas', valor_anterior: '17,6 % (FY2025)', valor_actual: '19,9 % (FY2026)', variacion: '+2,3 puntos', comentario: 'Americas & Asia 23,2 %; Europe & Australia 13,4 % tras cerrar plantas en FY2025 [1].' },
      { kpi: 'I+D / ventas', valor_anterior: '5,3 % (FY2025)', valor_actual: '5,7 % (FY2026)', variacion: '+0,4 puntos', comentario: '94,0 M; 67,7 M en FY2024 [1].' },
      { kpi: 'Caja neta', valor_anterior: '74,6 M (jul-25)', valor_actual: '172,2 M (jul-26)', variacion: '+97,6 M', comentario: 'Antes de la compra de PSS (1.400 M el 3-ago-2026), financiada con 1.600 M de deuda nueva [2, 6].' },
    ],
  },
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jul-26 pro forma con PSS', fecha_fin: '2026-07-31', ingresos: 2761.6, ebitda: 483.4, ebit: 418.5, beneficio_neto: 205.4, bpa: 4.30, dpa: 0.98, dpa_extraordinario: 0, fcf: 192.7, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 41.8 },
    cambios_perimetro: [
      { periodo: 'FY2021', descripcion: 'Compras por 244 M netos de caja (Magicard, Code y Nordic ID, marcas que hoy figuran en el 10-K) [1, 4].' },
      { periodo: 'FY2025', descripcion: 'Gravotech (grabado láser, Francia), consolidada desde el 1-ago-2024 por ≈130 M; además AB&R (oct-24) y Microfluidic Solutions de Funai (abr-25): compras por 144,5 M en el año [1, 2, 10].' },
      { periodo: 'FY2026', descripcion: 'Mecco (marcaje láser, EE. UU.), desde el 4-ago-2025 por 17,4 M [1].' },
    ],
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '1T25', ingresos: 377, crecimiento_pct: 13.6, crecimiento_organico_pct: 3.6, ebitda: null, margen_ebitda_pct: null, bpa: 0.97, vs_consenso: null },
      { periodo: '2T25', ingresos: 357, crecimiento_pct: 10.5, crecimiento_organico_pct: 2.6, ebitda: null, margen_ebitda_pct: null, bpa: 0.83, vs_consenso: null },
      { periodo: '3T25', ingresos: 383, crecimiento_pct: 11.7, crecimiento_organico_pct: 1.6, ebitda: null, margen_ebitda_pct: null, bpa: 1.09, vs_consenso: null },
      { periodo: '4T25', ingresos: 397.3, crecimiento_pct: 15.7, crecimiento_organico_pct: 2.4, ebitda: null, margen_ebitda_pct: null, bpa: 1.04, vs_consenso: null },
      { periodo: '1T26', ingresos: 405, crecimiento_pct: 7.4, crecimiento_organico_pct: 2.8, ebitda: null, margen_ebitda_pct: null, bpa: 1.13, vs_consenso: null },
      { periodo: '2T26', ingresos: 384, crecimiento_pct: 7.6, crecimiento_organico_pct: 1.6, ebitda: null, margen_ebitda_pct: null, bpa: 1.09, vs_consenso: null },
      { periodo: '3T26', ingresos: 435.2, crecimiento_pct: 13.6, crecimiento_organico_pct: 8.2, ebitda: null, margen_ebitda_pct: null, bpa: 1.21, vs_consenso: 'Superior' },
      { periodo: '4T26', ingresos: 436.9, crecimiento_pct: 10.0, crecimiento_organico_pct: 8.4, ebitda: null, margen_ebitda_pct: null, bpa: 0.96, vs_consenso: null },
    ],
    confianza: 'Media',
  },
  balance: {
    historico: balance,
    vencimientos: [
      { anio: 'FY2027', importe: 25 }, { anio: 'FY2028', importe: 25 }, { anio: 'FY2029', importe: 25 }, { anio: 'FY2030', importe: 25 }, { anio: 'FY2031', importe: 715 }, { anio: 'FY2032', importe: 250 }, { anio: 'FY2034+', importe: 550 },
    ],
    liquidez: 'A 31-jul-2026: caja de 187,1 M (93 % fuera de EE. UU.) y 283,2 M disponibles de la línea; tras la compra de PSS (3-ago-2026), deuda bruta de ≈1.615 M (préstamo de 500 M, ≈300 M de la línea de 500 M, 800 M en bonos privados y 15 M previos) [1, 6, 7].',
    rating: 'Sin rating público (crédito bancario y colocación privada de bonos).',
    coste_deuda_pct: 5.6,
    vida_media_anios: 6.0,
    otros_pasivos: 'Covenants del crédito y de los bonos: deuda neta/EBITDA ≤ 3,5x (hasta 4,0x los cuatro trimestres siguientes al cierre de PSS) y cobertura de intereses ≥ 3,0x; la empresa prevé ≈2,5x tras la compra y menos de 2,0x en dos años [1, 5, 6]. Bonos: 250 M al 5,43 % (2031), 300 M al 5,65 % (2033) y 250 M al 5,90 % (2036) [6]. Préstamo con amortización trimestral del 1,25 % del principal y vencimiento en junio de 2031 [7]. Arrendamientos operativos de 68,6 M (US GAAP: ya en el EBITDA). Otros pasivos a largo de 72,3 M (impuestos, prestaciones). Sin pensiones relevantes ni garantías significativas. La asignación del precio de PSS (fondo de comercio e intangibles) no se había hecho al publicar el 10-K [1].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'Deloitte & Touche LLP',
    anios_auditor: null,
    opinion: 'Favorable',
    senales: [
      { senal: 'Compra de PSS sin asignación del precio', nivel: 'Media', comentario: 'Al publicar el 10-K no se había valorado lo comprado: el fondo de comercio, los intangibles y su amortización (que restará al BPA publicado desde el 1T27) se conocerán con el 10-Q del 1T27 [1].' },
      { senal: 'BPA ajustado frente a publicado', nivel: 'Baja', comentario: 'El ajustado suma la amortización de intangibles (20,9 M en FY2026) y costes de compras, transición y reorganización: 5,29 frente a 4,30 USD en FY2026 [2].' },
      { senal: 'Remuneración en acciones al alza', nivel: 'Baja', comentario: '22,9 M en FY2026 frente a 11,9 M en FY2025 (1,4 % de las ventas), por la jubilación del CEO y los incentivos del nuevo [2, 1].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Prioridades declaradas: crecimiento orgánico (I+D del 5,7 % de las ventas), compras, dividendo y recompras [1, 2]. Dividendo subido 41 años seguidos: 1,00 USD anuales desde el 2T27 (+2,0 %) [12]. Recompras de 42,2 M en FY2026 y 50,8 M en FY2025. Tras PSS, prioridad a reducir la deuda neta por debajo de 2,0 veces el EBITDA en dos años [5, 8].',
    adquisiciones: [
      { anio: 'FY2021', objetivo: 'Magicard, Code y Nordic ID (impresoras de tarjetas, escáneres y RFID)', importe: 244, ev_ebitda: null, financiacion: 'Caja y línea de crédito', resultado: 'Base de la línea de escáneres y RFID; sin deterioros del fondo de comercio [1, 4].' },
      { anio: 'FY2025', objetivo: 'Gravotech (grabado láser y mecánico, Francia)', importe: 130, ev_ebitda: 10.0, financiacion: 'Caja y línea de crédito', resultado: 'Previsión de 125 M de ventas y 13 M de EBITDA en FY2025, compra anunciada en marzo de 2024 [9, 10]; el margen de Europe & Australia cayó al 11,0 % en FY2025 y volvió al 13,4 % en FY2026 tras cerrar plantas [1].' },
      { anio: 'FY2026', objetivo: 'Mecco (marcaje láser, EE. UU.)', importe: 17.4, ev_ebitda: null, financiacion: 'Caja', resultado: 'Integrada en identificación de productos [1].' },
      { anio: 'FY2027', objetivo: 'Productivity Solutions and Services de Honeywell (ordenadores móviles, escáneres, impresoras y software; desde el 3-ago-2026)', importe: 1400, ev_ebitda: 8.0, financiacion: 'Caja, 800 M de crédito bancario y 800 M de bonos privados', resultado: 'Pendiente: ≈1.100 M de ventas en 2025; la empresa espera +0,80 USD de BPA ajustado en el primer año y 25 M de sinergias en tres años [5, 8].' },
    ],
    confianza: 'Alta',
  },
  fuentes: fA,
  huecos: [
    { seccion: 'trimestres', campo: 'EBITDA trimestral', tipo: 'Complemento', intentos: '1) Notas de resultados trimestrales (no dan amortización por trimestre); 2) presentaciones (solo beneficio antes de impuestos); 3) XBRL de los 10-Q (amortizaciones acumuladas, no trimestrales sin restar)', decision: 'Omitido' },
    { seccion: 'negocio', campo: 'segmentos FY2022-FY2023', tipo: 'Complemento', intentos: '1) 10-K FY2026 (solo tres ejercicios); 2) XBRL companyfacts (sin dimensión de segmento en esos años); 3) 10-K FY2024 (no descargado por tiempo)', decision: 'Omitido' },
  ],
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Form 10-K FY2026: negocio, marcas, competencia, ventas por línea de producto y región', editor: 'Brady Corporation (SEC)', tipo: 'Primaria', fecha: '2026-09-03', url: `${E}/000074659826000044/brc-20260731.htm` },
  { id: 2, titulo: 'Nota de resultados del 4T FY2026: mercado direccionable de 14.000 M tras PSS', editor: 'Brady Corporation (SEC)', tipo: 'Primaria', fecha: '2026-09-03', url: `${E}/000074659826000043/exhibit991-financialsx2026.htm` },
  { id: 3, titulo: 'Anuncio de la compra de PSS: mercado de soluciones de productividad de 9.000 M y ventas de PSS de ≈1.100 M en 2025', editor: 'Brady Corporation (SEC)', tipo: 'Primaria', fecha: '2026-04-20', url: `${E}/000074659826000014/exhibit991pressrelease-202.htm` },
  { id: 4, titulo: 'Zebra Technologies to Acquire Elo (8-K, anexo 99.1): ventas de Elo de ≈400 M, crecimiento del 5-7 % a lo largo del ciclo', editor: 'Zebra Technologies (SEC)', tipo: 'Primaria', fecha: '2025-08-04', url: 'https://www.sec.gov/Archives/edgar/data/877212/000110465925073878/tm2522351d1_ex99-1.htm' },
  { id: 5, titulo: 'Datos de mercado de Zebra, Avery Dennison, Cognex, Datalogic, Sato, MSA, Halma, Fortive e IDEX (quoteSummary)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/quote/ZBRA/' },
  { id: 6, titulo: 'Ficha sectorial: equipos de seguridad (comparables MSA, Halma, Fortive)', editor: 'Análisis propio del repositorio', tipo: 'Sectorial', fecha: '2026-10-15', url: 'sectores/equipos-seguridad-2026-10-15.md' },
  { id: 7, titulo: 'Avery Dennison Second Quarter 2021 Results (8-K, anexo 99.2): compra de Vestcom por 1.450 M, ≈400 M de ventas', editor: 'Avery Dennison (SEC)', tipo: 'Primaria', fecha: '2021-07-28', url: 'https://www.sec.gov/Archives/edgar/data/8818/000119312521226494/d186068dex992.htm' },
];
const B = {
  _estado: 'Completa con limitaciones: tamaño de mercado de una sola fuente (la empresa); competidores y márgenes de Yahoo.',
  negocio: {
    descripcion: 'Brady fabrica y vende soluciones de identificación y seguridad: etiquetas de alto rendimiento (materiales adhesivos propios con recubrimientos que aguantan productos químicos, calor o intemperie), impresoras de etiquetas portátiles y de sobremesa con su software, marcadores de cables, señalización de seguridad e instalaciones (señales, cinta de suelo, marcadores de tuberías, bloqueo y etiquetado), pulseras y etiquetas para hospitales, credenciales e impresoras de tarjetas, escáneres (Code), RFID (Nordic ID) y grabado láser (Gravotech) [1]. En FY2026 vendió 1.661,6 M: seguridad e instalaciones 39 %, identificación de productos 30 %, cables 17 %, sanidad 8 % y personas 5 % [1]. Vende a través de distribuidores eléctricos e industriales, integradores (VAR), venta directa y catálogos y webs propias (Seton, Emedco) [1]. Desde el 3-ago-2026 suma PSS de Honeywell (ordenadores móviles, escáneres, impresoras y software de voz para almacenes, logística y comercio), con ≈1.100 M de ventas en 2025, que pasa a ser el segmento Intelligent Productivity Solutions [2, 3].',
    como_gana_dinero: 'El modelo es de impresora y consumible: la impresora (unidades +25 % en el 4T26) fija al cliente a los cartuchos y etiquetas de material propio, que son la mayor parte de las ventas y de margen bruto alto (51,7 % del grupo en FY2026) [1]. Ningún cliente pesa un 10 % [1]. Los pedidos son pequeños y repetitivos, ligados a la actividad industrial, la construcción (centros de datos para los marcadores de cables) y las normas de seguridad laboral; la mayor parte de los productos son estándar en stock y se sirven en el día o en un mes [1]. El margen depende del volumen (apalancamiento operativo: el beneficio de los segmentos pasó del 17,6 % al 19,9 % con un orgánico del 5,3 %), de la mezcla (impresoras y consumibles de identificación frente a señalización por catálogo) y del precio, que la empresa sube para compensar costes y aranceles [1]. PSS es más de hardware, con margen de segmento de «dos cifras bajas» y una parte de software y servicio [2, 3].',
  },
  sector: {
    definicion: 'El mercado relevante es la identificación industrial y la captura de datos: etiquetas y materiales de identificación, impresoras y software de etiquetado, señalización de seguridad y, desde PSS, ordenadores móviles y escáneres para empresas. La empresa cifra su mercado direccionable en ≈14.000 M USD tras la compra, de los que ≈9.000 M son el mercado de soluciones de productividad de PSS y el resto (≈5.000 M, por diferencia) el de identificación [2, 3]. No encontramos una segunda fuente independiente con el mismo perímetro: los estudios de pago sobre etiquetas industriales o sobre captura automática de datos (AIDC) miden perímetros más amplios. Usamos el de la empresa.',
    tamano: '≈14.000 M USD de mercado direccionable en 2026 (≈5.000 M identificación + ≈9.000 M productividad) [2, 3]',
    unidad_serie: 'millones de USD',
    serie: [{ anio: '2026', tamano: 14000 }, { anio: '2031e', tamano: 16700 }],
    tcac_historico_pct: null,
    tcac_previsto_pct: 3.6,
    cr5_pct: null,
    estructura: 'Fragmentada en identificación (el 10-K habla de competencia «muy fragmentada», desde pequeños fabricantes hasta grandes de adhesivos y material eléctrico) y concentrada en ordenadores móviles y escáneres (Zebra, Honeywell/PSS, Datalogic) [1].',
    drivers: [
      { driver: 'Construcción de centros de datos y electrificación', efecto: '+', horizonte: 'Estructural', evidencia: 'Ventas de identificación de cables +16,6 % en FY2026; casi +20 % en Americas & Asia en el 4T26 [1, 2].' },
      { driver: 'Actividad industrial en EE. UU. y Asia', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Orgánico de Asia +15 % y de Américas +6 % en FY2026; Europa +1,2 % tras −1,8 % en FY2025 [1].' },
      { driver: 'Automatización de almacenes y logística (PSS)', efecto: '+', horizonte: 'Estructural', evidencia: 'La empresa espera que el volumen de paquetes y los dispositivos multifunción en tiendas tiren de la demanda [3].' },
      { driver: 'Normas de seguridad laboral y trazabilidad', efecto: '+', horizonte: 'Estructural', evidencia: 'Señalización, bloqueo y etiquetado exigidos por OSHA y normas europeas; seguridad e instalaciones vende 647,8 M estables [1].' },
      { driver: 'Aranceles y cadena de suministro', efecto: '−', horizonte: 'Cíclico', evidencia: 'Brady fabrica en China y PSS tiene producción en Asia; el efecto neto de aranceles y devoluciones no movió el margen bruto de FY2026 [1].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Fragmentada en identificación; Zebra domina ordenadores móviles e impresoras de códigos de barras con márgenes EBITDA del 20 % [1, 5].' },
      { fuerza: 'Poder de los clientes', intensidad: 2, justificacion: 'Clientes pequeños y muchos (ninguno pesa un 10 %); en PSS, grandes cuentas de logística y comercio con más poder [1, 3].' },
      { fuerza: 'Poder de los proveedores', intensidad: 3, justificacion: 'Películas plásticas, adhesivos y componentes electrónicos de varios proveedores; algunos componentes de fuente única [1].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Hace falta catálogo amplio, materiales certificados (UL, normas militares) y red de distribución [1].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'Teléfonos inteligentes y visión artificial frente a escáneres dedicados; impresión directa sobre la pieza frente a etiquetas [1].' },
    ],
    ciclo: { posicion: 'Expansión', comentario: 'El orgánico pasó del 1,6 % del 2T26 al 8,2-8,4 % del 3T y 4T26, con centros de datos y Asia [2]. Brady es cíclica moderada: en FY2020 (pandemia) las ventas cayeron un 6,8 % y el beneficio neto un 14 %; en FY2022 crecieron un 13,7 % con inflación de costes trasladada a precios [1]. Europa ha sido el punto débil (orgánico negativo en FY2025). PSS es más cíclica: la inversión en dispositivos de almacén cayó en 2023-2024 tras el exceso de la pandemia (Zebra lo vivió).' },
    regulacion: 'Seguridad laboral (OSHA en EE. UU., directivas europeas) y trazabilidad de productos sostienen la demanda de señalización y etiquetado [1]. Aranceles de EE. UU. de 2025 y devoluciones posteriores: sin efecto neto relevante en el margen de FY2026 [1]. Regulación de las clases de acciones con voto distinto: la empresa la cita como riesgo [1]. PSS: normas de radio y de privacidad de datos en dispositivos.',
    tendencias: 'La identificación se digitaliza: impresoras conectadas, RFID, software de seguridad y trazabilidad; Brady crece en impresoras (unidades +25 % en el 4T26) y compra escáneres y RFID (Code, Nordic ID, PSS) [1, 2]. La IA y la visión artificial pueden sustituir parte del escaneo dedicado y la voz en almacenes; también hacen más valiosos los datos capturados. Con PSS, Brady gana escala frente a Zebra pero entra en un mercado de hardware más competido.',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 19.7,
    posicion: 'Líder en identificación industrial de alto rendimiento (etiquetas, impresoras y marcadores de cables) frente a un mercado fragmentado; n.º 2-3 en ordenadores móviles y escáneres de empresa tras comprar PSS, detrás de Zebra [1, 3, 5].',
    competidores: [
      { nombre: 'Zebra Technologies', pais: 'EE. UU.', ticker: 'ZBRA', ingresos: 5847, cuota_pct: null, margen_ebit_pct: null, comentario: 'Líder en ordenadores móviles, escáneres e impresoras de códigos de barras; margen EBITDA del 20,2 % [5].' },
      { nombre: 'Avery Dennison', pais: 'EE. UU.', ticker: 'AVY', ingresos: 9248, cuota_pct: null, margen_ebit_pct: null, comentario: 'Materiales de etiquetas y RFID; compró Vestcom (etiquetas de lineal) en 2021 [5, 7].' },
      { nombre: 'Cognex', pais: 'EE. UU.', ticker: 'CGNX', ingresos: 1089, cuota_pct: null, margen_ebit_pct: null, comentario: 'Visión artificial y lectores de códigos industriales; margen EBITDA del 24,6 % [5].' },
      { nombre: 'Datalogic', pais: 'IT', ticker: 'DAL.MI', ingresos: 571, cuota_pct: null, margen_ebit_pct: null, comentario: 'Escáneres y ordenadores móviles; margen EBITDA del 5,5 % (ventas en USD) [5].' },
      { nombre: 'SATO Holdings', pais: 'JP', ticker: '6287.T', ingresos: 1072, cuota_pct: null, margen_ebit_pct: null, comentario: 'Impresoras de etiquetas y consumibles; margen EBITDA del 10,8 % (ventas en USD) [5].' },
      { nombre: 'HellermannTyton (Aptiv) y Panduit', pais: 'DE / EE. UU.', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Competidores en marcadores de cables e identificación eléctrica; dentro de grupos mayores o sin cotizar [1].' },
    ],
    foso: {
      veredicto: 'Estrecho',
      tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'No aplica: venta de productos.' },
        { fuente: 'Costes de cambio', puntuacion: 3, evidencia: 'Impresora y software que solo usan consumibles propios; materiales homologados en las especificaciones del cliente (UL, normas militares) [1].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'Marcas Brady, Seton y Emedco; química de adhesivos propia; margen bruto del 51,7 % frente al 16 % de margen EBITDA de Avery Dennison [1, 5].' },
        { fuente: 'Ventaja en costes', puntuacion: 2, evidencia: 'Fabricación propia de rollos de material para terceros y para sí; sin ventaja clara frente a los grandes de adhesivos [1].' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'Catálogo amplio para pedidos pequeños por catálogo y distribuidores; nichos (marcadores de cables, pulseras) demasiado pequeños para grandes competidores [1].' },
      ],
    },
    amenazas: 'Tres amenazas. Zebra en ordenadores móviles y escáneres, donde PSS llega tras años de desinversión dentro de Honeywell y con un margen inferior (probabilidad media) [3, 5]. Sustitución del escaneo dedicado por teléfonos y visión artificial con IA (media-baja a 5 años). Y la ciclicidad de la inversión en almacenes y del gasto industrial europeo (media).',
    confianza: 'Media',
  },
  historia: {
    resumen: 'Fundada en 1914 por William H. Brady en Ladysmith (Wisconsin) para imprimir calendarios y etiquetas, hoy tiene su sede en Milwaukee [1]. Cotiza en la Bolsa de Nueva York con acciones de clase A sin voto; las de clase B, las únicas con voto, siguen en manos de dos fideicomisos de los descendientes del fundador [1]. En los años 2000 compró mucho (Seton, Emedco y decenas de marcas) y en 2013-2015 se reestructuró y vendió negocios. Desde 2015, con Michael Nauman y luego Russell Shaller, volvió a crecer y elevó márgenes; en 2024-2026 compró Gravotech, AB&R, Microfluidic Solutions y Mecco, y en agosto de 2026 hizo la mayor compra de su historia: PSS de Honeywell por 1.400 M [1, 2, 3].',
    hitos: [
      { anio: '1914', hito: 'William H. Brady funda la empresa [1].' },
      { anio: '2020-2021', hito: 'Compra Magicard, Code y Nordic ID: impresoras de tarjetas, escáneres y RFID [1].' },
      { anio: '2024', hito: 'Compra Gravotech (grabado láser, Francia) por ≈130 M [1].' },
      { anio: '2025', hito: 'Cierra plantas y reorganiza Europa (18,5 M de costes) [1].' },
      { anio: '2026 (abril)', hito: 'Acuerda comprar PSS de Honeywell por 1.400 M (≈8 veces el EBITDA) [3].' },
      { anio: '2026 (junio)', hito: 'Se jubila de golpe el CEO Russell Shaller; le sustituye el consejero Vineet Nargolwala (ex-CEO de Allegro MicroSystems) [1].' },
      { anio: '2026 (agosto)', hito: 'Cierra la compra de PSS con 1.600 M de deuda; el dividendo sube por 41.º año [1, 2].' },
    ],
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Lo material son la seguridad laboral propia (tasa de accidentes registrables de 0,53 y sin muertes en FY2026) y la de sus clientes, que es el motivo de compra de la señalización [1]; la química de adhesivos y disolventes en las plantas de recubrimiento; y la gestión de la cadena de suministro electrónica (minerales de conflicto: presenta el formulario SD cada año) [1].',
    controversias: 'Sin sanciones ni litigios relevantes en el 10-K FY2026 [1]. La empresa cita como riesgo la presión regulatoria y de inversores contra las estructuras con dos clases de acciones [1].',
    confianza: 'Media',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'sector', campo: 'segunda fuente del tamaño de mercado y CR5', tipo: 'Núcleo', intentos: '1) 10-K y notas de la empresa (solo el mercado direccionable); 2) presentaciones de Zebra (no cifran el mercado con el mismo perímetro); 3) resúmenes de estudios de pago (perímetros distintos, cifras no comprobables)', decision: 'Omitido' },
    { seccion: 'esg', campo: 'calificaciones ESG', tipo: 'Complemento', intentos: '1) 10-K; 2) web de la empresa (no abierta); 3) MSCI y Sustainalytics (requieren registro)', decision: 'Omitido' },
  ],
};
guarda('B', B);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Form 10-K FY2026, parte III (consejo, remuneración, accionistas, auditor)', editor: 'Brady Corporation (SEC)', tipo: 'Primaria', fecha: '2026-09-03', url: `${E}/000074659826000044/brc-20260731.htm` },
  { id: 2, titulo: 'Brady Corporation Announces CEO Transition (8-K, anexo 99.1)', editor: 'Brady Corporation (SEC)', tipo: 'Primaria', fecha: '2026-06-08', url: `${E}/000074659826000026/exhibit991pressrelease0608.htm` },
  { id: 3, titulo: 'Form 4 de Brady Corp presentados entre el 15-oct-2025 y el 15-oct-2026 (herramientas/form4.mjs)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000746598&type=4' },
  { id: 4, titulo: 'Schedule 13G/A de FMR LLC sobre la clase A (15,0 %)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-05-06', url: `${E}/000031506626001132/primary_doc.xml` },
  { id: 5, titulo: 'Schedule 13G de Vanguard Portfolio Management (5,99 %) y Vanguard Capital Management (5,01 %)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-07-31', url: `${E}/000210011926001356/primary_doc.xml` },
  { id: 6, titulo: 'Schedule 13G/A de Neuberger Berman Group (4,5 %)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-06-04', url: `${E}/000146510926000034/primary_doc.xml` },
  { id: 7, titulo: 'Notas de resultados FY2023-FY2026 y guías anuales (8-K)', editor: 'Brady Corporation (SEC)', tipo: 'Primaria', fecha: '2026-09-03', url: `${E}/000074659826000043/exhibit991-financialsx2026.htm` },
  { id: 8, titulo: 'Brady forecasts $5.20-$5.30 adjusted EPS for fiscal 2026', editor: 'Seeking Alpha', tipo: 'Prensa', fecha: '2026-05-18', url: 'https://seekingalpha.com/symbol/BRC' },
];
const C = {
  _estado: 'Completa. Sin proxy: Brady incluye la parte III en el 10-K porque la clase A no vota.',
  directivos: {
    equipo: [
      { nombre: 'Vineet Nargolwala', cargo: 'Presidente y consejero delegado', desde: '2026', participacion_pct: 0.1, trayectoria: 'Consejero desde 2022; CEO de Allegro MicroSystems (2022-2025), ejecutivo de Sensata (2013-2022) y casi diez años en Honeywell [1, 2]. Compró 13.011 acciones por 1,0 M USD a 76,86 USD el 10-jun-2026 [3]. Sin historial medible en Brady.' },
      { nombre: 'Ann E. Thornton', cargo: 'Directora financiera, de contabilidad y tesorera', desde: '2023', participacion_pct: 0.1, trayectoria: 'En Brady desde 2009 (directora de contabilidad desde 2016); antes auditora en PwC [1].' },
      { nombre: 'Thomas F. DeBruine', cargo: 'Director de operaciones', desde: '2024', participacion_pct: 0.03, trayectoria: 'En Brady desde 2000; dirigió las operaciones globales y los cierres de plantas de FY2025 [1].' },
      { nombre: 'Olivier Bojarski', cargo: 'Presidente de Americas & Asia', desde: '2023', participacion_pct: 0.05, trayectoria: 'Antes en Belden, ABB y Panduit; con él Americas & Asia pasó a un orgánico del 7,5 % y un margen del 23,2 % en FY2026 [1].' },
      { nombre: 'Brett Wilms', cargo: 'Presidente de EMEA y Australia', desde: '2023', participacion_pct: null, trayectoria: 'Antes en Groupe Autajon y Pentair; reorganizó Europa (margen del segmento del 11,0 % al 13,4 %) [1].' },
      { nombre: 'Bradley C. Richardson', cargo: 'Presidente no ejecutivo del consejo', desde: '2007', participacion_pct: 0.2, trayectoria: 'Ex director financiero de Avient, Diebold y Modine; preside el consejo desde 2021 y la comisión de auditoría [1].' },
    ],
    historial_guidance: [
      { anio: 'FY2026', guia: 'BPA ajustado de 5,20-5,30 USD (mayo de 2026)', real: '5,29 USD', cumplida: 'Sí' },
      { anio: 'FY2025', guia: 'BPA ajustado en el rango alto de la guía, ≈4,60 USD', real: '4,60 USD', cumplida: 'Sí' },
    ],
    comentario: 'Equipo nuevo en la cúpula: el CEO lleva cuatro meses y llegó por una jubilación anunciada el mismo día (8-jun-2026), con la compra de PSS ya firmada; la acción cayó un 15,1 % ese día [1, 2]. El consejo dice que lo eligió por su experiencia en Honeywell y en integrar negocios tecnológicos [2]. La directora financiera y el director de operaciones son de la casa. Cumplieron la guía de BPA ajustado en FY2025 y FY2026 [7, 8]. El CEO compró 1,0 M USD de acciones al llegar (con una prima de acciones igual al doble de lo comprado) [1, 3]; el resto de directivos vendió 6,7 M USD en doce meses [3].',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Bradley C. Richardson', cargo: 'Presidente no ejecutivo', tipo: 'Independiente', desde: '2007', comisiones: 'Auditoría (presidente), Gobierno, Remuneración, Retorno de capital' },
      { nombre: 'Vineet Nargolwala', cargo: 'Consejero delegado', tipo: 'Ejecutivo', desde: '2022', comisiones: '—' },
      { nombre: 'Elizabeth P. Bruno', cargo: 'Consejera', tipo: 'Dominical', desde: '2003', comisiones: 'Gobierno (presidenta), Remuneración, Retorno de capital, Tecnología' },
      { nombre: 'Patrick W. Allender', cargo: 'Consejero', tipo: 'Independiente', desde: '2007', comisiones: 'Auditoría, Gobierno' },
      { nombre: 'David S. Bem', cargo: 'Consejero', tipo: 'Independiente', desde: '2019', comisiones: 'Remuneración, Auditoría, Tecnología' },
      { nombre: 'Joanne Collins Smee', cargo: 'Consejera', tipo: 'Independiente', desde: '2022', comisiones: 'Remuneración (presidenta), Gobierno' },
      { nombre: 'Michelle E. Williams', cargo: 'Consejera', tipo: 'Independiente', desde: '2019', comisiones: 'Tecnología (presidenta), Gobierno' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: true, una_accion_un_voto: false,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: false, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: true, presidente_vinculado_control: false, cambios_cupula_24m: 1,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: 'FY2026', total: 13.92, fijo: 1.07, variable_corto: 2.19, variable_largo: 10.41, ratio_salario_medio: 143 },
    remuneracion: 'El CEO saliente, Russell Shaller, cobró 13,9 M USD en FY2026 (7,6 M en FY2025): 1,07 M fijos, 2,19 M de bonus y 10,4 M en acciones, que incluyen la consolidación de todos sus incentivos al jubilarse [1]. El nuevo CEO tiene 1,0 M de fijo, 3,2 M de acciones de entrada y otros 2,0 M igual al doble de lo que compró en el mercado [1]. El variable a largo es 50 % acciones por tiempo y 50 % por objetivos de ventas y BPA (con un tramo trienal), y el bonus anual se mide con beneficio operativo y de los segmentos: crecer y ganar más, no rentabilidad del capital [1]. Hay política de recuperación (clawback) [1]. La ratio frente al empleado mediano es de 143 veces (con el sueldo del nuevo CEO anualizado) [1]. La clase A no vota la remuneración.',
    accionistas: [
      { nombre: 'Fideicomiso EBL GST Non-Exempt Stock B (familia Brady; Elizabeth P. Bruno)', pct: 50.0, tipo: 'Clase B (100 % del voto entre los dos)', variacion: 'Sin cambios' },
      { nombre: 'William H. Brady III Living Trust (familia Brady)', pct: 50.0, tipo: 'Clase B', variacion: 'Sin cambios' },
      { nombre: 'FMR LLC (Fidelity)', pct: 15.0, tipo: 'Institucional, clase A', variacion: '13G/A de mayo de 2026 [4]' },
      { nombre: 'Vanguard (Portfolio Management 5,99 % y Capital Management 5,01 %)', pct: 11.0, tipo: 'Institucional, clase A', variacion: 'Nuevas declaraciones tras la reorganización de Vanguard (2026) [5]' },
      { nombre: 'Neuberger Berman Group', pct: 4.5, tipo: 'Institucional, clase A', variacion: 'Bajó del umbral del 5 % (mayo de 2026) [6]' },
      { nombre: 'Elizabeth P. Bruno (directa y fideicomisos)', pct: 2.1, tipo: 'Familia fundadora, clase A', variacion: 'Vendió 1,8 M USD en noviembre de 2025' },
      { nombre: 'Autocartera', pct: 15.4, tipo: '7,9 M de acciones de clase A sobre 51,3 M emitidas', variacion: '+0,17 M en FY2026' },
    ],
    insiders: [
      { fecha: '2026-06-10', persona: 'Vineet Nargolwala (CEO)', operacion: 'Compra', acciones: 13011, importe: 1.0 },
      { fecha: '2025-11-25', persona: 'Russell Shaller (CEO entonces)', operacion: 'Venta', acciones: 17130, importe: 1.39 },
      { fecha: '2025-11-19', persona: 'Elizabeth P. Bruno (consejera)', operacion: 'Venta', acciones: 23705, importe: 1.77 },
      { fecha: '2025-11-25', persona: 'Andrew Gorman (secretario general)', operacion: 'Venta', acciones: 12528, importe: 1.0 },
      { fecha: '2025-11-19', persona: 'Brett Wilms (presidente EMEA)', operacion: 'Venta', acciones: 14685, importe: 1.11 },
      { fecha: '2026-09-18', persona: 'Thomas DeBruine (director de operaciones)', operacion: 'Venta', acciones: 7308, importe: 0.62 },
      { fecha: '2025-12-19', persona: 'Ann Thornton (directora financiera)', operacion: 'Venta', acciones: 4080, importe: 0.33 },
    ],
    control_y_defensas: 'Brady tiene dos clases: 43,4 M de acciones de clase A, que cotizan y no votan salvo en casos legales, y 3,5 M de clase B, todas con voto, en manos de dos fideicomisos de descendientes del fundador al 50 % cada uno [1]. La familia decide el consejo y cualquier operación de control; no hay pacto conocido de cambio de control [1]. Ambas clases cobran el mismo dividendo (la B lleva una preferencia mínima) y el BPA es casi igual [1, 7]. La familia tiene además un 2,1 % de la clase A a través de la consejera Elizabeth Bruno, que preside la comisión de gobierno [1]. Seis de siete consejeros son independientes y el presidente no es de la familia [1]. Sin operaciones vinculadas relevantes [1].',
    alertas: [
      'Salida repentina del CEO (8-jun-2026) entre la firma y el cierre de la mayor compra de la historia de la empresa; la acción cayó un 15,1 % ese día [1, 2].',
      'Ventas de directivos por 6,7 M USD en doce meses, frente a una sola compra de 1,0 M del nuevo CEO [3].',
      'La clase A no vota: el minoritario no puede oponerse a compras, remuneraciones ni consejeros [1].',
    ],
    confianza: 'Alta',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'votaciones de remuneración', tipo: 'Complemento', intentos: '1) 10-K (no hay junta con voto de la clase A); 2) 8-K de la junta de diciembre de 2025 (votos de la clase B, 100 % familiares); 3) sin proxy en EDGAR', decision: 'Omitido' },
  ],
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const Y = lee('comparables-yahoo.json');
const ye = (t) => Y.empresas.find((e) => e.ticker === t);
const comp = (nombre, t, pais, extra = {}) => {
  const e = ye(t);
  return { nombre, ticker: t, pais, capitalizacion: Math.round(e.capitalizacion_usd_m ?? 0), ev_ventas: r2(e.ev_ventas), ev_ebitda_ltm: r1(e.ev_ebitda_ltm), ev_ebitda_ntm: r1(e.ev_ebitda_ntm), per_ntm: r1(e.per_ntm), crecimiento_pct: r1(e.crecimiento_pct), margen_ebitda_pct: r1(e.margen_ebitda_pct), roic_pct: null, dn_ebitda: r1(e.dn_ebitda), fcf_yield_pct: r1(e.fcf_yield_pct), ...extra };
};
const fD = [
  { id: 1, titulo: 'Históricos diarios de BRC, SPY y XLI (precio, rango, volumen, rentabilidades, beta, cierres de ejercicio)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/BRC/history/' },
  { id: 2, titulo: 'Consenso de Brady y de los comparables (quoteSummary: estimaciones, objetivos, recomendaciones)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/quote/BRC/analysis/' },
  { id: 3, titulo: 'Daily Treasury Par Yield Curve Rates 2026 (10 años: 5,19 % el 14-oct-2026)', editor: 'U.S. Department of the Treasury', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve&field_tdr_date_value=2026' },
  { id: 4, titulo: 'Implied ERP by month (ERPbymonth.xlsx): octubre de 2026, 4,20 %', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 5, titulo: 'Anuncio de la compra de PSS: 1.400 M, ≈8 veces el EBITDA de 2025, ventas de ≈1.100 M', editor: 'Brady Corporation (SEC)', tipo: 'Primaria', fecha: '2026-04-20', url: `${E}/000074659826000014/exhibit991pressrelease-202.htm` },
  { id: 6, titulo: 'Gravotech: anuncio (123 M EUR, ventas 2023 de 112 M EUR) y cierre (EBITDA previsto de 12 M EUR)', editor: 'Brady Corporation (SEC)', tipo: 'Primaria', fecha: '2024-08-01', url: `${E}/000074659824000057/exhibit991-pressrelease.htm` },
  { id: 7, titulo: 'Zebra Technologies to Acquire Elo (8-K): 1.300 M, ventas de ≈400 M y margen EBITDA similar al de Zebra', editor: 'Zebra Technologies (SEC)', tipo: 'Primaria', fecha: '2025-08-04', url: 'https://www.sec.gov/Archives/edgar/data/877212/000110465925073878/tm2522351d1_ex99-1.htm' },
  { id: 8, titulo: 'Avery Dennison 2T21 (8-K): compra de Vestcom por 1.450 M con ≈400 M de ventas previstas en 2021', editor: 'Avery Dennison (SEC)', tipo: 'Primaria', fecha: '2021-07-28', url: 'https://www.sec.gov/Archives/edgar/data/8818/000119312521226494/d186068dex992.htm' },
  { id: 9, titulo: 'Form 10-K FY2026: acciones en circulación (43,36 M de clase A y 3,54 M de clase B a 31-ago-2026)', editor: 'Brady Corporation (SEC)', tipo: 'Primaria', fecha: '2026-09-03', url: `${E}/000074659826000044/brc-20260731.htm` },
  { id: 10, titulo: 'Ficha sectorial de equipos de seguridad: comparables MSA, Halma y Fortive', editor: 'Análisis propio del repositorio', tipo: 'Sectorial', fecha: '2026-10-15', url: 'sectores/equipos-seguridad-2026-10-15.md' },
];
const hl = ye('HLMA.L');
const D = {
  _estado: 'Completa. Consenso de un solo proveedor (Yahoo, 2 analistas); comparables de Yahoo con PER del BPA ajustado de cada empresa.',
  identificacion: {
    nombre: 'Brady Corporation', nombre_corto: 'Brady', ticker: 'BRC', isin: 'US1046741062', mercado: 'New York Stock Exchange (clase A sin voto)', indice_referencia: 'S&P 500 (SPY) / S&P MidCap 400',
    pais: 'Estados Unidos', pais_iso: 'US', sector: 'Industria', industria: 'Commercial Services & Supplies', sede: 'Milwaukee (Wisconsin)', fundacion: '1914', empleados: 9300, web: 'www.bradyid.com',
    precio: BO.identificacion.precio, fecha_precio: BO.identificacion.fecha_precio, acciones: 47.4, capitalizacion_publicada: 3923, free_float_pct: 92.0,
    max_52s: BO.identificacion.max_52s, min_52s: BO.identificacion.min_52s, volumen_medio_diario: `≈ ${String(BO.volumen_3m.importe_dia_millones).replace('.', ',')} M USD/día (3 meses)`, proximos_resultados: '2026-11-17',
  },
  consenso: {
    guidance: 'Guía FY2027 (3-sep-2026): BPA ajustado de 6,25-6,75 USD (+18,1 % a +27,6 %), con ≈0,80 USD de PSS neto del coste de la deuda, la mayor parte en el segundo semestre; crecimiento orgánico de identificación (IDS) de ≈5 % y ventas de PSS (IPS) de ≈1.150 M; margen de segmento de ≈20 % en IDS y de «dos cifras bajas» en IPS; amortización de inmovilizado de ≈45 M, capex de ≈40 M y tipo impositivo de ≈21 % [5, 2]. Objetivo de deuda neta/EBITDA por debajo de 2,0x en dos años [5].',
    estimaciones: [
      { periodo: 'FY2027e', ingresos: 2891.6, ebitda: null, ebit: null, bpa: 6.55, dpa: 1.0, fuente: 'Yahoo Finance, 2 analistas, BPA ajustado [2]' },
      { periodo: 'FY2028e', ingresos: 3002.5, ebitda: null, ebit: null, bpa: 7.22, dpa: null, fuente: 'Yahoo Finance, 2 analistas, BPA ajustado [2]' },
    ],
    recomendaciones: { n_analistas: 2, comprar: 2, mantener: 0, vender: 0, po_medio: 110, po_min: 109, po_max: 111 },
    revisiones: 'El BPA FY2027 del consenso subió de 6,09 USD hace 90 días a 6,55 (+7,6 %) tras la guía del 3-sep, y el de FY2028 de 6,88 a 7,22 (+4,9 %) [2]. Solo dos analistas publican estimaciones (Yahoo); no encontramos una segunda fuente gratuita con estimaciones completas. Las dos recomendaciones son de compra, con objetivos de 109-111 USD [2].',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: { ...BO.bolsa, posicion_corta_pct: null, confianza: 'Alta' },
  multiplos_historicos: {
    serie: BO.cierres_ejercicio.filter((c) => c.anio >= 'FY2017').map((c) => ({ anio: c.anio, precio_cierre: c.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    confianza: 'Alta',
  },
  comparables: {
    empresas: [
      comp('Zebra Technologies', 'ZBRA', 'US'),
      comp('Avery Dennison', 'AVY', 'US'),
      comp('Cognex', 'CGNX', 'US'),
      comp('Datalogic', 'DAL.MI', 'IT'),
      comp('SATO Holdings', '6287.T', 'JP'),
      comp('MSA Safety', 'MSA', 'US'),
      comp('Halma', 'HLMA.L', 'GB', { capitalizacion: 17450, per_ntm: r1((hl.precio / 100) / (0.46 * 1.34444 + 0.54 * 1.48728)) }),
      comp('Fortive', 'FTV', 'US'),
      comp('IDEX', 'IEX', 'US'),
    ],
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2026-04', objetivo: 'Productivity Solutions and Services (Honeywell)', comprador: 'Brady', ev: 1400, ev_ventas: 1.27, ev_ebitda: 8.0, prima_pct: null, excluir: false, comentario: '≈1.100 M de ventas en 2025; múltiplo de EBITDA que da la empresa [5].' },
      { fecha: '2025-08', objetivo: 'Elo Touch Solutions', comprador: 'Zebra Technologies', ev: 1300, ev_ventas: 3.25, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Pantallas táctiles y quioscos; ≈400 M de ventas con margen EBITDA similar al de Zebra (≈20 %), lo que daría ≈16 veces (estimación propia, no publicada) [7].' },
      { fecha: '2024-03', objetivo: 'Gravotech Holding', comprador: 'Brady', ev: 133, ev_ventas: 1.10, ev_ebitda: 10.0, prima_pct: null, excluir: false, comentario: '123 M EUR por 112 M EUR de ventas de 2023; EBITDA previsto de 12 M EUR en FY2025 [6].' },
      { fecha: '2021-07', objetivo: 'Vestcom', comprador: 'Avery Dennison', ev: 1450, ev_ventas: 3.63, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Etiquetas y datos de lineal para comercio; ≈400 M de ventas previstas en 2021 [8].' },
    ],
    confianza: 'Media',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'bolsa', campo: 'posición corta', tipo: 'Complemento', intentos: '1) Yahoo quoteSummary (sin dato en la consulta); 2) FINRA (no consultado por tiempo); 3) Nasdaq short interest (requiere navegador)', decision: 'Omitido' },
    { seccion: 'transacciones', campo: 'EV/EBITDA de Elo y Vestcom', tipo: 'Complemento', intentos: '1) 8-K de Zebra y de Avery Dennison (solo ventas y «margen similar»); 2) presentaciones de las operaciones (no publican el múltiplo); 3) prensa (estimaciones sin fuente)', decision: 'Omitido' },
  ],
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Stocktwits: flujo de mensajes de $BRC (30 mensajes, may-oct 2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-09', url: 'https://stocktwits.com/symbol/BRC' },
  { id: 2, titulo: 'Seeking Alpha: titulares y análisis de BRC (RSS; jul-sep 2026)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-09', url: 'https://seekingalpha.com/symbol/BRC' },
  { id: 3, titulo: 'Brady Corporation: From A Balance Sheet With No Debt, To A $1.4B Bet At 8x EBITDA', editor: 'Seeking Alpha (autor externo)', tipo: 'Foros y redes', fecha: '2026-09-29', url: 'https://seekingalpha.com/symbol/BRC' },
  { id: 4, titulo: 'Brady: A Solid Setup For 2027', editor: 'Seeking Alpha (autor externo)', tipo: 'Foros y redes', fecha: '2026-09-26', url: 'https://seekingalpha.com/symbol/BRC' },
];
const Es = {
  _estado: 'Completa con poco debate: empresa poco seguida por particulares.',
  sentimiento: {
    tono: 'Positivo', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Stocktwits', fecha: '2026-09', n_comentarios: 30, tono: 'Positivo', resumen: 'Mensajes alcistas antes y después de los resultados del 3-sep: esperan que PSS «cambie de categoría» a la empresa y celebran la subida del dividendo; en junio, la compra del CEO y la caída por su nombramiento [1].' },
      { plataforma: 'Seeking Alpha (análisis)', fecha: '2026-09', n_comentarios: 4, tono: 'Dividido', resumen: 'Un análisis subraya el paso de no tener deuda a una apuesta de 1.400 M a 8 veces el EBITDA; otro ve un buen punto de partida para 2027 con la guía de +23 % de BPA ajustado [2, 3, 4].' },
      { plataforma: 'Seeking Alpha (noticias)', fecha: '2026-06', n_comentarios: 6, tono: 'Positivo', resumen: 'Subida del 17-19 % el 18-may con el 3T (centros de datos, «IA») y mejora de recomendación de Sidoti tras la caída por el cambio de CEO [2].' },
    ],
    temas: [
      { tema: 'PSS cambia la empresa (escala y BPA)', postura: 'Alcista', peso: 'Alto', contraste: 'La guía da +0,80 USD de BPA ajustado; con nuestro modelo, el BPA ajustado FY2028 sube a ≈7,1 USD, pero el margen de PSS es la mitad del de Brady y la deuda pasa de cero a ≈2,5 veces el EBITDA.' },
      { tema: 'Deuda y riesgo de integración', postura: 'Dividida', peso: 'Medio', contraste: 'Riesgo real: 1.600 M de deuda nueva al 5,4-5,9 % y un CEO recién llegado; los covenants (3,5-4,0x) dan holgura.' },
      { tema: 'Centros de datos e «IA» en identificación de cables', postura: 'Alcista', peso: 'Medio', contraste: 'Cierto pero acotado: identificación de cables es el 17 % de las ventas y creció un 16,6 % en FY2026.' },
      { tema: 'Cambio de CEO', postura: 'Dividida', peso: 'Bajo', contraste: 'Salida sin aviso y caída del 15 %; el nuevo CEO compró 1 M USD de acciones.' },
    ],
    confianza: 'Baja',
  },
  fuentes: fE,
  huecos: [],
};
guarda('E', Es);
console.log('Notas A-E escritas');
