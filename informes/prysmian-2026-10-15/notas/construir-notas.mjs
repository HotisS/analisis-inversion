// Escribe las notas A-E de Prysmian (corte 2026-10-15) con lo leído en las fuentes primarias (notas de prensa
// de resultados 2022-2025 y del 1S26 en eMarket Storage, XBRL ESEF 2021-2024, junta de 2026, ampliación de
// septiembre de 2026), bolsa.mjs, MarketScreener, Stock Analysis y prensa. Cada nota cita solo su lista.
// Ejecutar: node informes/prysmian-2026-10-15/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const BOLSA = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const EM = 'https://www.emarketstorage.it/sites/default/files/comunicati';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Prysmian S.p.A.: Full year 2025 results (nota de prensa con cuenta, balance, flujos y conciliación del EBITDA)', editor: 'Prysmian S.p.A. / eMarket Storage', tipo: 'Primaria', fecha: '2026-02-26', url: `${EM}/2026-02/20260226_177863.pdf` },
  { id: 2, titulo: 'FY 2025 Integrated Results (presentación: segmentos, ingresos a precios estándar del metal, vencimientos de la deuda, objetivos 2028)', editor: 'Prysmian S.p.A. / eMarket Storage', tipo: 'Primaria', fecha: '2026-02-26', url: `${EM}/2026-02/20260226_177865.pdf` },
  { id: 3, titulo: 'Prysmian S.p.A.: Results as of 30 June 2026 (nota de prensa, balance a 30-jun-2026, flujos del semestre, guía elevada)', editor: 'Prysmian S.p.A. / eMarket Storage', tipo: 'Primaria', fecha: '2026-07-30', url: `${EM}/2026-07/20260730_187445.pdf` },
  { id: 4, titulo: 'Prysmian S.p.A.: FY 2024 results (nota de prensa con estados financieros)', editor: 'Prysmian S.p.A. / eMarket Storage', tipo: 'Primaria', fecha: '2025-02-27', url: `${EM}/2025-02/20250227_161138.pdf` },
  { id: 5, titulo: 'Integrated results at 31 December 2023 (nota de prensa con estados financieros)', editor: 'Prysmian S.p.A. / eMarket Storage', tipo: 'Primaria', fecha: '2024-02-29', url: 'https://emarketstorage.it/sites/default/files/comunicati/2024-02/20240229_142659.pdf' },
  { id: 6, titulo: 'Results at 31 December 2022 (nota de prensa con estados financieros 2022 y 2021)', editor: 'Prysmian S.p.A. / eMarket Storage', tipo: 'Primaria', fecha: '2023-03-09', url: `${EM}/2023-06/20230309_126454.pdf` },
  { id: 7, titulo: 'Informes financieros anuales ESEF 2021-2024 (XBRL: balance y flujos)', editor: 'filings.xbrl.org', tipo: 'Primaria', fecha: '2025-04', url: 'https://filings.xbrl.org/' },
  { id: 8, titulo: 'Prysmian starts the year with organic growth, margin expansion and strong free cash flow (resultados del 1T26)', editor: 'Prysmian S.p.A.', tipo: 'Primaria', fecha: '2026-04-30', url: 'https://www.prysmian.com/en/media/press-releases/prysmian-starts-the-year-with-organic-growth-margin-expansion-and-strong-free-cash-flow' },
  { id: 9, titulo: 'Q3 & 9M25 Integrated Results (nota de prensa)', editor: 'Prysmian S.p.A.', tipo: 'Primaria', fecha: '2025-10-30', url: 'https://www.prysmian.com/en/media/press-releases/q3-9m25-integrated-results' },
];

const cuenta = [
  { periodo: '2021', ingresos: 12736, coste_ventas: 8677, gastos_generales: null, ebitda: 907, amortizaciones: 335, ebit: 572, resultado_financiero: -96, bai: 476, impuestos: 166, minoritarios: 2, beneficio_neto: 308, gastos_financieros: 104, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 49, bpa: 1.17, dpa: 0.55, dpa_extraordinario: 0, acciones_diluidas: null },
  { periodo: '2022', ingresos: 16067, coste_ventas: 10618, gastos_generales: null, ebitda: 1252, amortizaciones: 403, ebit: 849, resultado_financiero: -110, bai: 739, impuestos: 230, minoritarios: 5, beneficio_neto: 504, gastos_financieros: 88, participadas_en_ebitda: 47, no_recurrentes_en_ebitda: 101, bpa: 1.90, dpa: 0.60, dpa_extraordinario: 0, acciones_diluidas: null },
  { periodo: '2023', ingresos: 15354, coste_ventas: 9653, gastos_generales: null, ebitda: 1434, amortizaciones: 574, ebit: 860, resultado_financiero: -96, bai: 764, impuestos: 217, minoritarios: 18, beneficio_neto: 529, gastos_financieros: 140, participadas_en_ebitda: 33, no_recurrentes_en_ebitda: 143, bpa: 1.84, dpa: 0.70, dpa_extraordinario: 0, acciones_diluidas: null },
  { periodo: '2024', ingresos: 17026, coste_ventas: 10740, gastos_generales: null, ebitda: 1715, amortizaciones: 509, ebit: 1206, resultado_financiero: -225, bai: 981, impuestos: 233, minoritarios: 19, beneficio_neto: 729, gastos_financieros: 145, participadas_en_ebitda: 41, no_recurrentes_en_ebitda: 173, bpa: 2.52, dpa: 0.80, dpa_extraordinario: 0, acciones_diluidas: 289.3 },
  { periodo: '2025', ingresos: 19650, coste_ventas: 12145, gastos_generales: null, ebitda: 2574, amortizaciones: 646, ebit: 1928, resultado_financiero: -274, bai: 1654, impuestos: 360, minoritarios: 24, beneficio_neto: 1270, gastos_financieros: 215, participadas_en_ebitda: 19, no_recurrentes_en_ebitda: -290, bpa: 4.30, dpa: 0.90, dpa_extraordinario: 0, acciones_diluidas: 295.3 },
];

const A = {
  _estado: 'completo',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 21235, ebitda: 2810, ebit: 2093, beneficio_neto: 1415, bpa: 4.70, dpa: 0.90, dpa_extraordinario: 0, fcf: 978, participadas_en_ebitda: 9, no_recurrentes_en_ebitda: -233 },
    cambios_perimetro: [
      { periodo: '2024', descripcion: 'Encore Wire (EE. UU.), consolidada desde el 1-jul-2024 (EV ≈3.900 M EUR): la cuenta de 2024 recoge medio año y el balance el año entero.' },
      { periodo: '2025', descripcion: 'Channell Commercial, consolidada desde el 1-jun-2025 (≈1.069 M EUR de salida de caja por compras en 2025); venta de la participación en YOFC (plusvalía de 346 M neta de impuestos).' },
    ],
    comentario: null,
    ajustes: null,
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '3T24', ingresos: 4543, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 540, margen_ebitda_pct: 11.9, bpa: null, vs_consenso: null },
      { periodo: '4T24', ingresos: 4664, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 518, margen_ebitda_pct: 11.1, bpa: null, vs_consenso: null },
      { periodo: '1T25', ingresos: 4771, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 527, margen_ebitda_pct: 11.0, bpa: null, vs_consenso: null },
      { periodo: '2T25', ingresos: 4883, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 605, margen_ebitda_pct: 12.4, bpa: null, vs_consenso: null },
      { periodo: '3T25', ingresos: 5030, crecimiento_pct: 10.7, crecimiento_organico_pct: 9.2, ebitda: 644, margen_ebitda_pct: 12.8, bpa: null, vs_consenso: null },
      { periodo: '4T25', ingresos: 4966, crecimiento_pct: 6.5, crecimiento_organico_pct: 4.3, ebitda: 622, margen_ebitda_pct: 12.5, bpa: null, vs_consenso: null },
      { periodo: '1T26', ingresos: 5218, crecimiento_pct: 9.4, crecimiento_organico_pct: 5.0, ebitda: 601, margen_ebitda_pct: 11.5, bpa: null, vs_consenso: null },
      { periodo: '2T26', ingresos: 6021, crecimiento_pct: 23.3, crecimiento_organico_pct: 9.4, ebitda: 730, margen_ebitda_pct: 12.1, bpa: null, vs_consenso: 'Superior' },
    ],
    ultima_presentacion: null,
    confianza: 'Media',
  },
  balance: {
    historico: [
      { periodo: '2021', activo_total: 12019, activo_corriente: 6388, pasivo_corriente: 5610, pasivo_total: 8930, fondo_comercio: 1635, intangibles: 505, inmovilizado_material: 2794, existencias: 2054, clientes: 1622, proveedores: 2592, activos_contrato: null, pasivos_contrato: null, caja: 1702, deuda_financiera: 3729, arrendamientos: null, patrimonio_neto: 2915, minoritarios: 174, reservas: null },
      { periodo: '2022', activo_total: 12756, activo_corriente: 6798, pasivo_corriente: 5605, pasivo_total: 8985, fondo_comercio: 1691, intangibles: 473, inmovilizado_material: 3020, existencias: 2241, clientes: 1942, proveedores: 2718, activos_contrato: null, pasivos_contrato: null, caja: 1285, deuda_financiera: 3067, arrendamientos: null, patrimonio_neto: 3585, minoritarios: 186, reservas: null },
      { periodo: '2023', activo_total: 13323, activo_corriente: 7235, pasivo_corriente: 6150, pasivo_total: 9351, fondo_comercio: 1660, intangibles: 411, inmovilizado_material: 3401, existencias: 2264, clientes: 1987, proveedores: 2199, activos_contrato: null, pasivos_contrato: null, caja: 1741, deuda_financiera: 3096, arrendamientos: null, patrimonio_neto: 3781, minoritarios: 191, reservas: null },
      { periodo: '2024', activo_total: 18157, activo_corriente: 7621, pasivo_corriente: 6646, pasivo_total: 12860, fondo_comercio: 3492, intangibles: 1424, inmovilizado_material: 4922, existencias: 2858, clientes: 2433, proveedores: 2462, activos_contrato: 554, pasivos_contrato: 2074, caja: 1033, deuda_financiera: 5415, arrendamientos: null, patrimonio_neto: 5087, minoritarios: 210, reservas: 4328 },
      { periodo: '2025', activo_total: 20190, activo_corriente: 9048, pasivo_corriente: 7380, pasivo_total: 13510, fondo_comercio: 3647, intangibles: 1610, inmovilizado_material: 5279, existencias: 3066, clientes: 2428, proveedores: 2798, activos_contrato: 567, pasivos_contrato: 2325, caja: 2025, deuda_financiera: 5208, arrendamientos: null, patrimonio_neto: 6474, minoritarios: 206, reservas: 5174 },
    ],
    vencimientos: [
      { anio: '2026', importe: 198 }, { anio: '2027', importe: 345 }, { anio: '2028', importe: 1200 }, { anio: '2029', importe: 650 },
      { anio: '2030', importe: 1465 }, { anio: '2031', importe: 850 }, { anio: '2032+', importe: 1200 },
    ],
    liquidez: 'Caja 1.246 M y activos financieros líquidos 86 M a 30-jun-2026 [3], más la línea de crédito revolvente sin disponer (importe no desglosado en la nota) [2]; 850 M de la ampliación del 15-sep-2026 para Atkore.',
    rating: 'Grado de inversión (S&P); el híbrido perpetuo de 1.000 M, «BB» con un 50 % de contenido de capital [1]',
    coste_deuda_pct: 4.0,
    vida_media_anios: 3.9,
    otros_pasivos: null,
    comentario: null,
    confianza: 'Media',
  },
  flujos: {
    historico: [
      { periodo: '2021', flujo_operativo: 777, capex: 283, pagos_arrendamientos: null, adquisiciones: 85, desinversiones: 8, dividendos: 134, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 104 },
      { periodo: '2022', flujo_operativo: 1038, capex: 454, pagos_arrendamientos: null, adquisiciones: 7, desinversiones: 2, dividendos: 148, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 88 },
      { periodo: '2023', flujo_operativo: 1416, capex: 624, pagos_arrendamientos: null, adquisiciones: 0, desinversiones: 0, dividendos: 165, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 140 },
      { periodo: '2024', flujo_operativo: 1933, capex: 793, pagos_arrendamientos: null, adquisiciones: 4126, desinversiones: 9, dividendos: 202, recompras: 327, emision_acciones: 0, intereses_en_financiacion: 142 },
      { periodo: '2025', flujo_operativo: 2162, capex: 791, pagos_arrendamientos: null, adquisiciones: 952, desinversiones: 701, dividendos: 239, recompras: 47, emision_acciones: 0, intereses_en_financiacion: 233 },
    ],
    comentario: null,
    confianza: 'Media',
  },
  negocio: {
    segmentos: [
      { nombre: 'Transmission', descripcion: 'Cables submarinos y terrestres de alta y muy alta tensión (HVDC y HVAC) llave en mano: interconexiones, eólica marina, corredores terrestres.', tipo_resultado: 'EBITDA', historico: [{ periodo: '2024', ingresos: 2481, resultado: 361 }, { periodo: '2025', ingresos: 3262, resultado: 582 }] },
      { nombre: 'Power Grid', descripcion: 'Cables de media y alta tensión para las redes de distribución y líneas aéreas (OHTL) de las eléctricas.', tipo_resultado: 'EBITDA', historico: [{ periodo: '2024', ingresos: 3544, resultado: 474 }, { periodo: '2025', ingresos: 3811, resultado: 480 }] },
      { nombre: 'Industrial & Construction', descripcion: 'Cables de baja y media tensión para edificios, centros de datos e industria (Encore Wire en EE. UU.).', tipo_resultado: 'EBITDA', historico: [{ periodo: '2024', ingresos: 6151, resultado: 620 }, { periodo: '2025', ingresos: 7519, resultado: 795 }] },
      { nombre: 'Specialties', descripcion: 'Cables especiales: automoción (en desinversión), ascensores, petróleo y gas, minería, renovables.', tipo_resultado: 'EBITDA', historico: [{ periodo: '2024', ingresos: 3052, resultado: 310 }, { periodo: '2025', ingresos: 2983, resultado: 279 }] },
      { nombre: 'Digital Solutions', descripcion: 'Fibra y cable óptico, conectividad (Channell) y cables para centros de datos e hiperescaladores.', tipo_resultado: 'EBITDA', historico: [{ periodo: '2024', ingresos: 1306, resultado: 161 }, { periodo: '2025', ingresos: 1618, resultado: 268 }] },
      { nombre: 'Otros', descripcion: 'Otras actividades de Electrification.', tipo_resultado: 'EBITDA', historico: [{ periodo: '2024', ingresos: 492, resultado: 1 }, { periodo: '2025', ingresos: 457, resultado: -6 }] },
    ],
    geografias: [],
    kpis: [
      { kpi: 'Cartera de pedidos de Transmission', valor_anterior: '≈17.000 M EUR (dic-25, con EGL4)', valor_actual: '≈17.000 M EUR (jun-26) + ≈2.000 M adjudicados sin asignar', variacion: 'Estable', comentario: 'Cuatro-cinco años de ventas del segmento [1, 3].' },
      { kpi: 'Margen EBITDA ajustado a precios estándar del metal', valor_anterior: '12,9 % (2024)', valor_actual: '14,2 % (2025); 14,8 % (1S26)', variacion: '+1,3 pp y +1,0 pp', comentario: 'Lo empujan Transmission (18,3 % → 20,7 %) y Digital Solutions [1, 3].' },
      { kpi: 'Flujo de caja libre', valor_anterior: '1.011 M (2024)', valor_actual: '1.171 M (2025); guía 2026 1.650-1.750 M', variacion: '+15,8 %', comentario: 'FCF antes de compras, ventas de participadas y antimonopolio [1, 3].' },
      { kpi: 'Deuda financiera neta', valor_anterior: '4.296 M (dic-24)', valor_actual: '3.097 M (dic-25); 4.079 M (jun-26)', variacion: '−1.199 M en 2025', comentario: 'Antes de Atkore (≈3.390 M EUR) [1, 3].' },
      { kpi: 'Ingresos ligados a la sostenibilidad', valor_anterior: '43,1 % (2024)', valor_actual: '44,2 % (2025); 45,9 % (1S26)', variacion: '+1,1 pp', comentario: 'Objetivo 2028: 55 % [2, 3].' },
    ],
    confianza: 'Alta',
  },
  calidad: { auditor: 'PricewaterhouseCoopers S.p.A. (desde 2025; antes EY S.p.A.)', anios_auditor: 1, opinion: 'Favorable', comentario: null, senales: [], confianza: 'Media' },
  fuentes: fA,
  huecos: [
    { seccion: 'negocio', campo: 'geografias', tipo: 'Complemento', intentos: '1) Notas de prensa de 2025 y del 1S26 (no desglosan por región); 2) presentación FY25 (solo cifras por segmento); 3) búsqueda del informe anual integrado 2025 (no descargado por tiempo)', decision: 'Omitido' },
    { seccion: 'flujos', campo: 'pagos_arrendamientos', tipo: 'Complemento', intentos: '1) Estado de flujos de las notas de prensa 2021-2025 (no separa el principal de arrendamientos); 2) conciliación de la deuda neta (solo el aumento por NIIF 16: 115 M en 2024 y 255 M en 2025); 3) XBRL ESEF (sin concepto)', decision: 'Omitido; las altas de derechos de uso se suman al capex del DCF' },
  ],
};

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Wire and Cable Market (tamaño 2025: 248.900 M USD; TCAC 5,5 % hasta 2035)', editor: 'Market Research Future', tipo: 'Sectorial', fecha: '2026', url: 'https://www.marketresearchfuture.com/reports/wire-and-cable-market-25173' },
  { id: 2, titulo: 'Wires And Cables Global Market Report (237.640 M USD en 2024 y 248.120 M USD en 2025)', editor: 'The Business Research Company (vía GII)', tipo: 'Sectorial', fecha: '2025', url: 'https://cn.gii.tw/report/tbrc1678645-wires-cables-global-market-report.html' },
  { id: 3, titulo: 'Submarine Cable System Market (19.950 M USD en 2025 → 33.750 M USD en 2030, TCAC 11,1 %)', editor: 'MarketsandMarkets', tipo: 'Sectorial', fecha: '2025', url: 'https://www.marketsandmarkets.com/PressReleases/submarine-cable-system.asp' },
  { id: 4, titulo: 'High Voltage Cable Market (49.250 M USD en 2025; TCAC 6,9 % 2026-2033)', editor: 'SkyQuest (vía GII)', tipo: 'Sectorial', fecha: '2025', url: 'https://cn.gii.tw/report/sky1814218-high-voltage-cable-market-size-share-growth.html' },
  { id: 5, titulo: 'Nexans: estadísticas (ingresos, EBITDA, ROIC)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/quote/epa/NEX/statistics/' },
  { id: 6, titulo: 'NKT: estadísticas', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/quote/cph/NKT/statistics/' },
  { id: 7, titulo: 'Sumitomo Electric: estadísticas', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/quote/tyo/5802/statistics/' },
  { id: 8, titulo: 'Furukawa Electric: estadísticas', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/quote/tyo/5801/statistics/' },
  { id: 9, titulo: 'Fujikura: estadísticas', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/quote/tyo/5803/statistics/' },
  { id: 10, titulo: 'Corning: estadísticas', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/glw/statistics/' },
  { id: 11, titulo: 'Prysmian S.p.A.: Results as of 30 June 2026', editor: 'Prysmian S.p.A. / eMarket Storage', tipo: 'Primaria', fecha: '2026-07-30', url: `${EM}/2026-07/20260730_187445.pdf` },
  { id: 12, titulo: 'Prysmian inks up to €5.5B deal with Molex for data center optical cables', editor: 'Seeking Alpha (noticia)', tipo: 'Prensa', fecha: '2026-07-20', url: 'https://seekingalpha.com/symbol/PRYMY' },
  { id: 13, titulo: 'Prysmian to acquire Atkore to become a fully fledged electrical solutions provider', editor: 'Prysmian S.p.A.', tipo: 'Primaria', fecha: '2026-08-03', url: 'https://www.prysmian.com/en/media/press-releases/prysmian-to-acquire-atkore-to-become-a-fully-fledged-electrical-solutions' },
];
const eur = (v, fx) => Math.round(v / fx);
const B = {
  _estado: 'completo',
  sector: {
    definicion: null,
    tamano: '≈ 248.900 M USD en 2025 (≈ 222.000 M EUR) [1]; 248.120 M USD según TBRC [2]',
    unidad_serie: 'millones de USD',
    serie: [{ anio: '2024', tamano: 237640 }, { anio: '2025', tamano: 248120 }, { anio: '2030e', tamano: 325300 }],
    tcac_historico_pct: 4.4, tcac_previsto_pct: 5.5, cr5_pct: null, estructura: 'Fragmentada (baja tensión) y concentrada (alta tensión submarina)',
    drivers: [],
    porter: [],
    ciclo: { posicion: 'Expansión', comentario: null },
    regulacion: null, tendencias: null,
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 8.9,
    posicion: '1.º mundial en cables de energía y telecomunicaciones (≈19.650 M EUR de ventas frente a ≈222.000 M EUR de mercado); en alta tensión submarina, uno de los tres grandes con Nexans y NKT',
    competidores: [
      { nombre: 'Nexans', pais: 'Francia', ticker: 'NEX.PA', ingresos: 8570, cuota_pct: 3.9, margen_ebit_pct: null, comentario: 'N.º 2 europeo; alta tensión submarina y redes; margen EBITDA 8,7 % (LTM) [5].' },
      { nombre: 'NKT', pais: 'Dinamarca', ticker: 'NKT.CO', ingresos: eur(26870, 7.475), cuota_pct: 1.6, margen_ebit_pct: null, comentario: 'Especialista en HVDC submarino y terrestre; margen EBITDA 19,3 %, caja neta [6].' },
      { nombre: 'Sumitomo Electric', pais: 'Japón', ticker: '5802.T', ingresos: eur(5290000, 177.06), cuota_pct: null, margen_ebit_pct: null, comentario: 'Conglomerado (cableado de automóvil la mayor parte); cables de energía y fibra; margen EBITDA 12,6 % [7].' },
      { nombre: 'Furukawa Electric', pais: 'Japón', ticker: '5801.T', ingresos: eur(1380000, 177.06), cuota_pct: null, margen_ebit_pct: null, comentario: 'Fibra óptica, cables de energía y componentes; margen EBITDA 9,0 % [8].' },
      { nombre: 'Fujikura', pais: 'Japón', ticker: '5803.T', ingresos: eur(1320000, 177.06), cuota_pct: null, margen_ebit_pct: null, comentario: 'Cables ópticos para centros de datos (cliente principal en EE. UU.); margen EBITDA 21,3 % [9].' },
      { nombre: 'Corning (Optical Communications)', pais: 'EE. UU.', ticker: 'GLW', ingresos: eur(16960, 1.1208), cuota_pct: null, margen_ebit_pct: null, comentario: 'Líder en fibra y cable óptico para centros de datos; el grupo entero, margen EBITDA 24,1 % [10].' },
      { nombre: 'Southwire', pais: 'EE. UU.', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Privada; principal rival de Encore Wire en cable de construcción en EE. UU.' },
    ],
    foso: { veredicto: 'Estrecho', tendencia: 'Se amplía', fuentes: [] },
    amenazas: null,
    confianza: 'Media',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'competencia', campo: 'margen_ebit_pct de los competidores', tipo: 'Complemento', intentos: '1) Stock Analysis (solo margen EBITDA); 2) MarketScreener (páginas de comparables sin datos o de otra empresa); 3) informes anuales de Nexans y NKT (no leídos por tiempo)', decision: 'Omitido: se da el margen EBITDA en el comentario' },
    { seccion: 'sector', campo: 'cr5_pct', tipo: 'Complemento', intentos: '1) Informes sectoriales gratuitos (dan tamaño, no cuotas); 2) QYResearch (de pago); 3) suma de ingresos de los cinco grandes: perímetros no comparables', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Organi sociali (consejo, comités y colegio sindical)', editor: 'Prysmian S.p.A.', tipo: 'Primaria', fecha: '2026-10', url: 'https://www.prysmian.com/it/la-societa/governance/organi-sociali' },
  { id: 2, titulo: 'Prysmian S.p.A.: Assemblea degli Azionisti (16-abr-2026)', editor: 'Prysmian S.p.A. / eMarket Storage', tipo: 'Primaria', fecha: '2026-04-16', url: `${EM}/2026-04/20260416_182195.pdf` },
  { id: 3, titulo: 'Prysmian S.p.A. — Azionariato (participaciones significativas)', editor: 'Consob', tipo: 'Primaria', fecha: '2026-05-28', url: 'https://www.consob.it/web/consob-and-its-activities/w/prysmian-spa-azionariato-1' },
  { id: 4, titulo: 'Prysmian S.p.A.: Full year 2025 results (acciones propias, plan de incentivos 2026-2028, delega de ampliación)', editor: 'Prysmian S.p.A. / eMarket Storage', tipo: 'Primaria', fecha: '2026-02-26', url: `${EM}/2026-02/20260226_177863.pdf` },
  { id: 5, titulo: 'Capital Increase Pricing Press Release (7.024.793 acciones nuevas a 121 EUR)', editor: 'Prysmian S.p.A.', tipo: 'Primaria', fecha: '2026-09-10', url: 'https://www.prysmian.com/sites/www.prysmian.com/files/media/documents/Capital%20Increase%20Pricing%20Press%20Release%20ENG.pdf' },
  { id: 6, titulo: 'Italy\'s Prysmian raises annual outlook after Q3 core profit jumps nearly 20% (Reuters)', editor: 'Stockopedia / Reuters', tipo: 'Prensa', fecha: '2025-10-30', url: 'https://www.stockopedia.com/share-prices/prysmian-sp-a-BIT:PRY/news/italy-apos-s-prysmian-raises-annual-outlook-after-q3-core-profit-jumps-nearly-20-019e69f1-5d58-7110-96d5-c86966d1c1b0/' },
  { id: 7, titulo: 'Prysmian S.p.A.: Results as of 30 June 2026 (junta extraordinaria del 29-sep-2026 sobre la lista del consejo)', editor: 'Prysmian S.p.A. / eMarket Storage', tipo: 'Primaria', fecha: '2026-07-30', url: `${EM}/2026-07/20260730_187445.pdf` },
  { id: 8, titulo: 'Politica di Remunerazione (fijo del consejero delegado 1,3 M EUR)', editor: 'Prysmian S.p.A.', tipo: 'Primaria', fecha: '2026', url: 'https://www.prysmian.com/index%2ephp/it/la-societa/governance/remunerazioni' },
];
const cons = (nombre, cargo, tipo, comisiones) => ({ nombre, cargo, tipo, desde: null, comisiones });
const C = {
  _estado: 'completo',
  directivos: {
    equipo: [
      { nombre: 'Massimo Battaini', cargo: 'Consejero delegado y director general', desde: '2024', participacion_pct: null, trayectoria: 'Toda su carrera en el grupo (Pirelli Cavi y Prysmian); dirigió Transmission y Norteamérica antes de suceder a Valerio Battista en abril de 2024. Con él, el margen ajustado pasó del 12,9 % (2024) al 14,2 % (2025) y llegaron Channell, Molex y Atkore [4, 7].' },
      { nombre: 'Pier Francesco Facchini', cargo: 'Consejero y director financiero', desde: null, participacion_pct: null, trayectoria: 'Director financiero del grupo desde hace más de una década; condujo la financiación de General Cable, Encore Wire y Atkore (60 % deuda, ≈20 % híbridos, ≈20 % capital) [4].' },
      { nombre: 'Francesco Gori', cargo: 'Presidente (no ejecutivo, independiente)', desde: '2024', participacion_pct: null, trayectoria: 'Antiguo consejero delegado de Pirelli Tyre; preside el consejo desde la renovación de 2024 [1].' },
      { nombre: 'Valerio Battista', cargo: 'Vicepresidente (no ejecutivo)', desde: null, participacion_pct: null, trayectoria: 'Consejero delegado de 2005 a 2024: salida a bolsa, compras de Draka (2011) y General Cable (2018) [1].' },
    ],
    historial_guidance: [
      { anio: '2025', guia: 'EBITDA ajustado 2.300-2.380 M, elevado a 2.380-2.430 M con el 3T25 [6]', real: '2.398 M [4]', cumplida: 'Sí' },
      { anio: '2025', guia: 'FCF (guía de 2025)', real: '1.171 M, por encima de la guía [4]', cumplida: 'Sí' },
      { anio: '2026', guia: 'EBITDA ajustado 2.625-2.775 M y FCF 1.300-1.400 M (feb-26); elevada a 2.800-2.900 M y 1.650-1.750 M (jul-26) [7]', real: '1S26: 1.331 M (+17,6 %) [7]', cumplida: 'Parcial' },
    ],
    comentario: null,
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      cons('Francesco Gori', 'Presidente', 'Independiente', 'Remuneraciones y Nombramientos'),
      cons('Valerio Battista', 'Vicepresidente', 'Otro externo', '—'),
      cons('Massimo Battaini', 'Consejero delegado', 'Ejecutivo', '—'),
      cons('Pier Francesco Facchini', 'Consejero (director financiero)', 'Ejecutivo', '—'),
      cons('Paolo Amato', 'Consejero', 'Independiente', 'Control y Riesgos'),
      cons('Jaska de Bakker', 'Consejera', 'Independiente', 'Control y Riesgos (presidenta)'),
      cons('Ines Kolmsee', 'Consejera', 'Independiente', 'Innovación y Sostenibilidad (presidenta)'),
      cons('Emma Marcegaglia', 'Consejera coordinadora independiente', 'Independiente', 'Innovación y Sostenibilidad'),
      cons('Tarak Mehta', 'Consejero', 'Independiente', 'Control y Riesgos'),
      cons('Richard Keith Palmer', 'Consejero', 'Independiente', 'Remuneraciones y Nombramientos (presidente)'),
      cons('Susannah Stewart', 'Consejera', 'Independiente', 'Innovación y Sostenibilidad'),
      cons('Annalisa Stupenengo', 'Consejera', 'Independiente', 'Remuneraciones y Nombramientos'),
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: true, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2026', total: null, fijo: 1.3, variable_corto: null, variable_largo: null, ratio_salario_medio: null },
    remuneracion: null,
    accionistas: [
      { nombre: 'BlackRock Inc.', pct: 4.75, tipo: 'Institucional', variacion: 'Bajó del 5,00 % al 4,75 % (ago-2025) [3]' },
      { nombre: 'FMR LLC (Fidelity)', pct: 2.98, tipo: 'Institucional', variacion: 'Por debajo del 3 % desde mar-2025 [3]' },
      { nombre: 'Autocartera', pct: 3.0, tipo: 'Autocartera', variacion: '9,59 M de acciones en feb-2026 [4]; registro Consob 3,001 % [3]' },
      { nombre: 'Empleados (plan YES)', pct: null, tipo: 'Empleados', variacion: 'El 50 % de la plantilla es accionista (46 % en 2024) [4]' },
    ],
    insiders: [],
    control_y_defensas: null,
    alertas: [],
    confianza: 'Media',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'voto_remuneracion_pct', tipo: 'Complemento', intentos: '1) Comunicado de la junta de 2026 (dice «voto favorevole» sin porcentajes); 2) búsqueda del acta («rendiconto sintetico delle votazioni»); 3) prensa italiana', decision: 'Omitido' },
    { seccion: 'gobierno', campo: 'remuneracion_ceo (total devengado 2025)', tipo: 'Complemento', intentos: '1) Política de remuneración (solo el fijo de 1,3 M); 2) búsqueda de la Sección II de la Relación de remuneraciones 2026; 3) agregadores (Simply Wall St da 2,14 M sin año: no se usa)', decision: 'Omitido' },
    { seccion: 'gobierno', campo: 'insiders', tipo: 'Complemento', intentos: '1) Búsqueda de «internal dealing» Prysmian 2026; 2) eMarket Storage (no filtrado por tipo); 3) prensa', decision: 'Omitido; insiders_sin_operaciones = false (no comprobado)' },
  ],
};

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de PRY.MI, FTSE MIB y EXH4.DE (precio, betas, volatilidad, cierres de ejercicio)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/quote/PRY.MI/history' },
  { id: 2, titulo: 'Prysmian: finanzas y consenso (estimaciones 2026-2028, 18 analistas, objetivo medio 154,56 EUR)', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-15', url: 'https://www.marketscreener.com/quote/stock/PRYSMIAN-S-P-A-252187/finances/' },
  { id: 3, titulo: 'Rendimiento del Bund a 10 años (serie diaria BBSIS; 3,45 % el 15-oct-2026)', editor: 'Deutsche Bundesbank', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://api.statistiken.bundesbank.de/rest/data/BBSIS/D.I.ZST.ZI.EUR.S1311.B.A604.R10XX.R.A.A._Z._Z.A' },
  { id: 4, titulo: 'Tipos de cambio de referencia del euro (USD 1,1208; JPY 177,06; DKK 7,4750)', editor: 'Banco Central Europeo', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml' },
  { id: 5, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre 2026: 4,20 %', editor: 'A. Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 6, titulo: 'Prysmian to buy Atkore for $95 per share in $3.8 billion deal (Reuters)', editor: 'KFGO / Reuters', tipo: 'Prensa', fecha: '2026-08-03', url: 'https://kfgo.com/2026/08/03/prysmian-to-buy-atkore-for-95-per-share-in-3-8-billion-deal/' },
  { id: 7, titulo: 'Azioni Prysmian, 8 ottobre: quanto costa davvero Atkore (cierre previsto el 19-oct, 9,8x EBITDA, objetivos de Barclays, Deutsche Bank y Banca Akros, 3T el 29-oct)', editor: 'Economia Italia', tipo: 'Prensa', fecha: '2026-10-08', url: 'https://finanza.economia-italia.com/azioni-prysmian-8-ottobre-2026' },
  { id: 8, titulo: 'Prysmian falls as Jefferies cuts its target price to 164 euros', editor: 'Il Sole 24 Ore', tipo: 'Prensa', fecha: '2026-09-01', url: 'https://en.ilsole24ore.com/art/prysmian-falls-as-jefferies-cuts-its-target-price-to-164-euros-AJSK7I0' },
  { id: 9, titulo: 'Capital Increase Pricing Press Release (850 M EUR a 121 EUR por acción)', editor: 'Prysmian S.p.A.', tipo: 'Primaria', fecha: '2026-09-10', url: 'https://www.prysmian.com/sites/www.prysmian.com/files/media/documents/Capital%20Increase%20Pricing%20Press%20Release%20ENG.pdf' },
  { id: 10, titulo: 'Prysmian – Acquisizione di Encore Wire per EV di 3,9 mld (8,2x / 6,3x EV/EBITDA pre/post sinergie)', editor: 'Websim', tipo: 'Prensa', fecha: '2024-04-15', url: 'https://www.websim.it/notizie/blue-chip/italia/prysmian-acquisizione-di-encore-wire-per-ev-di-39bn-82x-63x-ev-ebitda-23-pre-post-sinergie-20240415051509' },
  { id: 11, titulo: 'Nexans completes acquisition of La Triveneta Cavi (EV ≈520 M; 5,6x EBITDA 2023)', editor: 'Nexans', tipo: 'Primaria', fecha: '2024-06-06', url: 'https://www.nexans.com/regulated-informations/nexans-completes-acquisition-of-la-triveneta-cavi/' },
  { id: 12, titulo: 'Prysmian, Jefferies e Citi vedono ancora upside dopo il +64% nel 2026', editor: 'Milano Finanza', tipo: 'Prensa', fecha: '2026-07-07', url: 'https://www.milanofinanza.it/news/prysmian-jefferies-e-citi-vedono-ancora-upside-dopo-il-64-nel-2026-la-scommessa-sulla-fibra-per-gli-202607071043389744' },
  { id: 13, titulo: 'Prysmian +2,8 % tra i migliori del FTSE MIB dopo accordo con Molex', editor: 'Teleborsa', tipo: 'Prensa', fecha: '2026-07-21', url: 'https://www.teleborsa.it/AMP/News/2026/07/21/prysmian-2-8percent-tra-i-migliori-del-ftse-mib-in-scia-a-giudizi-positivi-degli-analisti-dopo-accordo-con-molex-75.html' },
  { id: 14, titulo: 'Prysmian\'s market decline met with a lukewarm response to the Atkore deal', editor: 'Il Sole 24 Ore', tipo: 'Prensa', fecha: '2026-08-03', url: 'https://en.ilsole24ore.com/art/prysmians-market-decline-met-with-a-lukewarm-response-to-the-atkore-deal-AJ24cad' },
  { id: 15, titulo: 'Estadísticas de comparables: Nexans, NKT, Fujikura, Sumitomo Electric, Furukawa Electric, Corning, Hubbell y nVent', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/quote/epa/NEX/statistics/' },
  { id: 16, titulo: 'Piazza Affari in calo: Prysmian (7-jul-2026, ventas en valores ligados a la IA)', editor: 'Teleborsa', tipo: 'Prensa', fecha: '2026-07-07', url: 'https://www.teleborsa.it/News/2026/07/07/piazza-affari-in-calo-prysmian-133_TLB-1LINER.html' },
  { id: 17, titulo: 'Prysmian to acquire Atkore (nota de la empresa: 2,85 bn USD de ventas y 386 M USD de EBITDA en 2025; ≈150 M USD de sinergias)', editor: 'Prysmian S.p.A.', tipo: 'Primaria', fecha: '2026-08-03', url: 'https://www.prysmian.com/en/media/press-releases/prysmian-to-acquire-atkore-to-become-a-fully-fledged-electrical-solutions' },
];
const R = BOLSA.bolsa;
const comp = (nombre, ticker, pais, cap, ev_ventas, ev_ebitda_ltm, per_ntm, crecimiento_pct, margen_ebitda_pct, roic_pct, dn_ebitda, fcf_yield_pct) => ({ nombre, ticker, pais, capitalizacion: cap, ev_ventas, ev_ebitda_ltm, ev_ebitda_ntm: null, per_ntm, crecimiento_pct, margen_ebitda_pct, roic_pct, dn_ebitda, fcf_yield_pct });
const D = {
  _estado: 'completo',
  identificacion: {
    nombre: 'Prysmian S.p.A.', nombre_corto: 'Prysmian', ticker: 'PRY', isin: 'IT0004176001', mercado: 'Euronext Milan (Borsa Italiana)', indice_referencia: 'FTSE MIB',
    pais: 'Italia', pais_iso: 'IT', sector: 'Industria', industria: 'Equipos eléctricos (cables)', sede: 'Milán', fundacion: '1879', empleados: 34000, web: 'www.prysmian.com',
    precio: BOLSA.identificacion.precio, fecha_precio: BOLSA.identificacion.fecha_precio, acciones: 299.0, capitalizacion_publicada: null, free_float_pct: 97.0,
    max_52s: BOLSA.identificacion.max_52s, min_52s: BOLSA.identificacion.min_52s, volumen_medio_diario: `≈ ${String(BOLSA.volumen_3m.importe_dia_millones).replace('.', ',')} M EUR/día (3 meses)`, proximos_resultados: '2026-10-29',
  },
  consenso: {
    guidance: null,
    estimaciones: [
      { periodo: '2026e', ingresos: 22771, ebitda: 2893, ebit: 2155, bpa: 4.76, dpa: 1.01, fuente: 'MarketScreener (18 analistas) [2]' },
      { periodo: '2027e', ingresos: 24655, ebitda: 3412, ebit: 2687, bpa: 6.10, dpa: 1.17, fuente: 'MarketScreener [2]' },
      { periodo: '2028e', ingresos: 26689, ebitda: 3864, ebit: 3090, bpa: 7.06, dpa: 1.32, fuente: 'MarketScreener [2]' },
    ],
    recomendaciones: { n_analistas: 18, comprar: 15, mantener: 3, vender: 0, po_medio: 154.56, po_min: null, po_max: null },
    revisiones: null,
    base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: 0.6,
    confianza: 'Media',
  },
  bolsa: {
    tipo_rentabilidad: R.tipo_rentabilidad,
    rentabilidades: R.rentabilidades,
    anual: R.anual,
    beta: R.beta, volatilidad_pct: R.volatilidad_pct, max_drawdown_pct: R.max_drawdown_pct, posicion_corta_pct: null,
    comentario: null,
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: [
      { anio: '2021', precio_cierre: 33.11, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2022', precio_cierre: 34.66, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2023', precio_cierre: 41.17, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2024', precio_cierre: 61.66, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2025', precio_cierre: 86.38, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
    ],
    comentario: null,
    confianza: 'Media',
  },
  comparables: {
    criterio: null,
    empresas: [
      comp('Nexans', 'NEX.PA', 'FR', 5560, 0.78, 8.4, 15.9, null, 8.7, 10.8, 1.4, 6.1),
      comp('NKT', 'NKT.CO', 'DK', eur(45410, 7.475), 1.52, 7.7, 24.3, 12.4, 19.3, 36.9, -0.9, -0.9),
      comp('Fujikura', '5803.T', 'JP', eur(7520000, 177.06), 5.68, 25.3, 23.6, 22.9, 21.3, 36.2, -0.3, 1.3),
      comp('Sumitomo Electric', '5802.T', 'JP', eur(6570000, 177.06), 1.35, 10.2, 17.2, 7.2, 12.6, 10.7, 0.7, 3.1),
      comp('Furukawa Electric', '5801.T', 'JP', eur(2380000, 177.06), 1.95, 18.5, 19.6, 14.3, 9.0, 8.2, 2.3, -0.8),
      comp('Corning', 'GLW', 'US', eur(116390, 1.1208), 7.26, 30.1, 38.0, 21.3, 24.1, 11.3, 1.7, 2.1),
      comp('Hubbell', 'HUBB', 'US', eur(24360, 1.1208), 4.74, 19.5, 21.7, 11.4, 24.4, 13.6, 3.4, 3.7),
      comp('nVent', 'NVT', 'US', eur(23090, 1.1208), 5.40, 24.9, 24.1, 26.2, 21.7, 11.9, 1.3, 2.3),
    ],
    comentario: null,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2026-08', objetivo: 'Atkore (EE. UU.)', comprador: 'Prysmian', ev: 3390, ev_ventas: 1.33, ev_ebitda: 9.8, prima_pct: 30.0, excluir: false, comentario: 'EV 3.800 M USD; 9,8x el EBITDA ajustado de 2025 (386 M USD), 7,1x con sinergias [6, 7, 17].' },
      { fecha: '2024-04', objetivo: 'Encore Wire (EE. UU.)', comprador: 'Prysmian', ev: 3900, ev_ventas: 1.6, ev_ebitda: 8.2, prima_pct: 20.0, excluir: false, comentario: '8,2x EBITDA 2023 (6,3x con sinergias); prima sobre la media de 30 días [10].' },
      { fecha: '2024-06', objetivo: 'La Triveneta Cavi (Italia)', comprador: 'Nexans', ev: 520, ev_ventas: 0.65, ev_ebitda: 5.6, prima_pct: null, excluir: false, comentario: 'Cable de baja y media tensión; 5,6x EBITDA 2023 antes de sinergias [11].' },
      { fecha: '2025-06', objetivo: 'Channell Commercial (EE. UU.)', comprador: 'Prysmian', ev: 950, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Conectividad y armarios para redes; ≈950 M USD, múltiplo no publicado.' },
    ],
    comentario: null,
    confianza: 'Media',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'bolsa', campo: 'posicion_corta_pct', tipo: 'Complemento', intentos: '1) Registro de posiciones cortas netas de la Consob; 2) agregadores (Stock Analysis no lo da para Milán); 3) prensa', decision: 'Omitido' },
    { seccion: 'consenso', campo: 'po_min y po_max', tipo: 'Complemento', intentos: '1) MarketScreener (solo media); 2) Economia Italia (Barclays y Deutsche Bank 167, Akros 138, Jefferies 164); 3) Investing (no abierto)', decision: 'Omitido; reparto comprar/mantener derivado del 83 % de «comprar» de Bloomberg' },
  ],
};

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Prysmian S.p.A. (PRYMY): análisis y noticias (RSS)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-09', url: 'https://seekingalpha.com/api/sa/combined/PRYMY.xml' },
  { id: 2, titulo: 'PRYMY stream', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-06', url: 'https://api.stocktwits.com/api/2/streams/symbol/PRYMY.json' },
  { id: 3, titulo: 'Prysmian\'s market decline met with a lukewarm response to the Atkore deal', editor: 'Il Sole 24 Ore', tipo: 'Prensa', fecha: '2026-08-03', url: 'https://en.ilsole24ore.com/art/prysmians-market-decline-met-with-a-lukewarm-response-to-the-atkore-deal-AJ24cad' },
  { id: 4, titulo: 'Azioni Prysmian alla prova trimestrale: bene utili e guidance 2026', editor: 'Risparmioggi', tipo: 'Foros y redes', fecha: '2026-07', url: 'https://www.risparmioggi.it/azioni-di-prysmian-alla-prova-trimestrale-bene-utili-e-guidance-2026/' },
];
const E = {
  _estado: 'completo',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Empeora',
    revisadas: [
      { plataforma: 'Seeking Alpha (artículos de autores)', fecha: '2026-10', n_comentarios: 8, tono: 'Positivo', resumen: 'De julio a octubre dominan las tesis alcistas («AI\'s next bottleneck runs through power and fiber», «Atkore adds another growth leg», «separate power from data»); la nota discordante, «It is time to trim», es de abril tras subir un 300 % [1].' },
      { plataforma: 'Stocktwits (PRYMY, ADR)', fecha: '2026-10', n_comentarios: 16, tono: 'Positivo', resumen: 'Debate escaso: compras por recomendaciones de boletines y extrañeza por lo poco seguida que está en EE. UU.; ninguna crítica de fondo [2].' },
      { plataforma: 'Prensa italiana con comentarios (Il Sole 24 Ore)', fecha: '2026-08', n_comentarios: 3, tono: 'Dividido', resumen: 'La compra de Atkore se recibió con frialdad por la financiación (60 % deuda, 20 % híbridos, 20 % capital) y por el mayor peso del negocio más cíclico [3].' },
      { plataforma: 'Risparmioggi (portal de pequeños inversores)', fecha: '2026-07', n_comentarios: 5, tono: 'Neutro', resumen: 'Lee la caída de un 31 % en un mes como rotación hacia otros sectores y no como deterioro de las cuentas [4].' },
    ],
    temas: [],
    lectura: null,
    confianza: 'Baja',
  },
  fuentes: fE,
  huecos: [],
};

guarda('A', A); guarda('B', B); guarda('C', C); guarda('D', D); guarda('E', E);
console.log('Notas A-E escritas');
