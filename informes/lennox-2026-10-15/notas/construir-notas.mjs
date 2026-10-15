// Escribe las notas A-E de Lennox International (corte 2026-10-15) a partir del XBRL de la SEC (cuentas-xbrl.json),
// las notas de prensa de resultados (8-K 99.1), el 10-K 2025, el 10-Q del 2T26, el proxy de 2026, bolsa.mjs, form4.mjs,
// Yahoo Finance y prensa. Cada nota cita solo con [n] de su propia lista. Ejecutar: node notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const X = JSON.parse(fs.readFileSync(path.join(dir, 'cuentas-xbrl.json'), 'utf8'));
const BOLSA = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const E8 = 'https://www.sec.gov/Archives/edgar/data/1069202';
const r1 = (v) => (v == null ? null : Math.round(v * 10) / 10);
const ANIOS = ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'];

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Form 10-K 2025 (cuentas auditadas; nota 3 de segmentos; nota 8 de ingresos por geografía; cambio de LIFO a FIFO; deuda y rating)', editor: 'Lennox International Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-17', url: `${E8}/000106920226000028/lii-20251231.htm` },
  { id: 2, titulo: 'Hechos XBRL (companyfacts): cuenta, balance y flujos 2016-2025', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0001069202.json' },
  { id: 3, titulo: 'Lennox Reports 2026 Second Quarter Results (8-K, anexo 99.1)', editor: 'Lennox International Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-07-29', url: `${E8}/000106920226000085/lii-20260630xexx991pressre.htm` },
  { id: 4, titulo: 'Form 10-Q del 2T26 (balance a 30-jun-2026; compra de Heat Controller; reembolsos de aranceles IEEPA; recompras)', editor: 'Lennox International Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-07-29', url: `${E8}/000106920226000087/lii-20260630.htm` },
  { id: 5, titulo: 'Lennox Reports 2026 First Quarter Results (8-K, anexo 99.1)', editor: 'Lennox International Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-04-29', url: `${E8}/000106920226000052/lii-20260331xexx991pressre.htm` },
  { id: 6, titulo: 'Lennox Reports Fourth Quarter and Full Year 2025 Results; Provides Full Year 2026 Guidance (8-K, anexo 99.1)', editor: 'Lennox International Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-01-28', url: `${E8}/000106920226000005/lii-20251231xexx991pressre.htm` },
  { id: 7, titulo: 'Lennox Reports Third Quarter 2025 Results (8-K, anexo 99.1)', editor: 'Lennox International Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2025-10-22', url: `${E8}/000106920225000046/lii-2025930xexx991pressrel.htm` },
  { id: 8, titulo: 'Lennox Q2 2026 earnings summary (guía por segmentos, volúmenes, reembolsos de aranceles, preguntas de analistas)', editor: 'VectorShift Research', tipo: 'Prensa', fecha: '2026-07-29', url: 'https://vectorshift.ai/research/companies/lennox-international/earnings/2026-q2-summary' },
];
const cx = Object.fromEntries(X.financieros.cuenta.map((r) => [r.periodo, r]));
const bx = Object.fromEntries(X.balance.historico.map((r) => [r.periodo, r]));
const fx = Object.fromEntries(X.flujos.historico.map((r) => [r.periodo, r]));
const cuenta = ANIOS.map((y) => {
  const c = cx[y];
  return { periodo: y, ingresos: c.ingresos, coste_ventas: c.coste_ventas, gastos_generales: c.gastos_generales, ebitda: c.ebitda, amortizaciones: c.amortizaciones, ebit: c.ebit, resultado_financiero: c.resultado_financiero, bai: c.bai, impuestos: c.impuestos, minoritarios: 0, beneficio_neto: c.beneficio_neto, gastos_financieros: c.gastos_financieros, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: c.bpa, dpa: c.dpa, dpa_extraordinario: 0, acciones_diluidas: c.acciones_diluidas };
});
// Arrendamientos operativos (US GAAP): fuera de la deuda (su gasto ya está en el EBITDA). Los financieros ya van en deuda_financiera.
const historico = ANIOS.map((y) => {
  const b = bx[y];
  return { periodo: y, activo_total: b.activo_total, activo_corriente: b.activo_corriente, pasivo_corriente: b.pasivo_corriente, pasivo_total: b.pasivo_total, fondo_comercio: b.fondo_comercio, intangibles: b.intangibles ?? 0, inmovilizado_material: b.inmovilizado_material, existencias: b.existencias, clientes: b.clientes, proveedores: b.proveedores, activos_contrato: null, pasivos_contrato: null, caja: b.caja, deuda_financiera: b.deuda_financiera, arrendamientos: 0, patrimonio_neto: b.patrimonio_neto, minoritarios: 0, reservas: b.reservas };
});
const adq = { 2016: 0, 2017: 0, 2018: 0, 2019: 0, 2020: 0, 2021: 0, 2022: 0, 2023: 94.9, 2024: 0, 2025: 545.0 };
const flujos = ANIOS.map((y) => {
  const f = fx[y];
  return { periodo: y, flujo_operativo: f.flujo_operativo, capex: f.capex, pagos_arrendamientos: f.pagos_arrendamientos ?? 0, adquisiciones: adq[y], desinversiones: f.desinversiones ?? 0, dividendos: f.dividendos, recompras: f.recompras, emision_acciones: f.emision_acciones, intereses_en_financiacion: 0 };
});
const A = {
  _estado: 'Completo. Cuentas 2016-2025 del XBRL de la SEC comprobadas con el 10-K 2025 y las notas de resultados; LTM a junio de 2026 con el 10-Q del 2T26.',
  negocio: {
    segmentos: [
      { nombre: 'Home Comfort Solutions (residencial)', descripcion: 'Calderas de aire, aires acondicionados, bombas de calor, calidad del aire y recambios para reposición y obra nueva en EE. UU. y Canadá; venta directa a instaladores (Lennox) y a distribuidores (Allied, Armstrong, ADP)', tipo_resultado: 'EBIT', historico: [{ periodo: '2023', ingresos: 3222.9, resultado: 611.6 }, { periodo: '2024', ingresos: 3577.1, resultado: 760.5 }, { periodo: '2025', ingresos: 3343.4, resultado: 728.5 }] },
      { nombre: 'Building Climate Solutions (comercial y refrigeración)', descripcion: 'Equipos unitarios de cubierta para comercio ligero, servicio a cuentas nacionales (NAS, AES), refrigeración comercial Heatcraft y, desde 2025, Duro Dyne', tipo_resultado: 'EBIT', historico: [{ periodo: '2023', ingresos: 1511.4, resultado: 340.8 }, { periodo: '2024', ingresos: 1764.2, resultado: 401.7 }, { periodo: '2025', ingresos: 1851.9, resultado: 434.2 }] },
      { nombre: 'Corporativo y Europa (vendida en 2023)', descripcion: 'Gastos centrales no repartidos; en 2023 incluye las ventas de Europa, vendida en el 4T23', tipo_resultado: 'EBIT', historico: [{ periodo: '2023', ingresos: 247.6, resultado: -93.9 }, { periodo: '2024', ingresos: 0, resultado: -120.3 }, { periodo: '2025', ingresos: 0, resultado: -105.0 }] },
    ],
    geografias: [{ nombre: 'Estados Unidos', peso_pct: 92.8 }, { nombre: 'Canadá', peso_pct: 7.2 }],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Ventas de Home Comfort Solutions (2T)', valor_anterior: '1.009 M USD (2T25)', valor_actual: '936 M USD (2T26)', variacion: '−7 %', comentario: 'Unidades −12 % (obra nueva ≈−30 %), precio y mezcla +3 %, compras +2 % [3, 8].' },
      { kpi: 'Ventas de Building Climate Solutions (2T)', valor_anterior: '492 M USD (2T25)', valor_actual: '610 M USD (2T26)', variacion: '+24 %', comentario: 'Orgánico +15 % según la nota de prensa (+12 % según la conferencia), compras +9 % [3, 8].' },
      { kpi: 'Margen del beneficio de segmentos (año)', valor_anterior: '19,5 % (2024)', valor_actual: '20,4 % (2025)', variacion: '+0,9 puntos', comentario: 'Primer año por encima del 20 %; LTM jun-26 algo menor por la absorción de costes en residencial [6, 3].' },
      { kpi: 'Venta directa en residencial (% de HCS)', valor_anterior: '74 % (2024)', valor_actual: '76 % (2025)', variacion: '+2 puntos', comentario: 'El resto se vende a distribuidores independientes [1].' },
      { kpi: 'Flujo de caja libre', valor_anterior: '785 M USD (2024)', valor_actual: '640 M USD (2025)', variacion: '−18 %', comentario: 'Inventario alto por el cambio de refrigerante; guía 2026 de 750-850 M [6].' },
      { kpi: 'Recompras de acciones', valor_anterior: '54 M USD (2024)', valor_actual: '482 M USD (2025)', variacion: '×9', comentario: '163 M en el 1S26; quedan 858 M del programa a 30-jun-2026 [4].' },
    ],
    confianza: 'Alta',
  },
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 5302.2, ebitda: 1165.9, ebit: 1043.5, beneficio_neto: 788.5, bpa: 22.51, dpa: 5.26, dpa_extraordinario: 0, fcf: 738.9, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [{ periodo: '2025', descripcion: 'Duro Dyne y Supco (545 M USD), consolidadas desde octubre de 2025: entran en balance y solo un trimestre en la cuenta.' }, { periodo: '2023', descripcion: 'Venta de las operaciones europeas en el 4T23 (247,6 M USD de ventas en 2023) y compra de AES (94,9 M USD) en octubre.' }],
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '3T24', ingresos: 1498.1, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 6.68, vs_consenso: null },
      { periodo: '4T24', ingresos: 1345.0, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 5.64, vs_consenso: null },
      { periodo: '1T25', ingresos: 1072.6, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 3.63, vs_consenso: null },
      { periodo: '2T25', ingresos: 1500.9, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 7.71, vs_consenso: null },
      { periodo: '3T25', ingresos: 1426.8, crecimiento_pct: -4.8, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 6.98, vs_consenso: 'Inferior' },
      { periodo: '4T25', ingresos: 1195.0, crecimiento_pct: -11.2, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 4.07, vs_consenso: 'Inferior' },
      { periodo: '1T26', ingresos: 1135.1, crecimiento_pct: 5.8, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 3.35, vs_consenso: null },
      { periodo: '2T26', ingresos: 1545.3, crecimiento_pct: 3.0, crecimiento_organico_pct: -1.3, ebitda: null, margen_ebitda_pct: null, bpa: 7.72, vs_consenso: 'En línea' },
    ],
    confianza: 'Alta',
  },
  balance: {
    historico,
    vencimientos: [{ anio: '2026', importe: 432.1 }, { anio: '2027', importe: 600.0 }, { anio: '2028', importe: 500.0 }, { anio: '2029+', importe: 50.6 }],
    liquidez: 'Caja 51,5 M USD a 30-jun-2026 + línea de crédito no dispuesta de 1.000 M USD (vence en 2030) y papel comercial con límite de 500 M (412 M emitidos) [1, 4].',
    rating: "Baa1 (Moody's) y BBB (S&P), perspectiva estable, a 31-dic-2025 [1]",
    coste_deuda_pct: 3.2, vida_media_anios: 1.8,
    confianza: 'Alta',
  },
  flujos: { historico: flujos, confianza: 'Alta' },
  calidad: { auditor: 'Ernst & Young LLP (desde 2025; antes KPMG de 2002 a 2024)', anios_auditor: 1, opinion: 'Favorable (cuentas y control interno a 31-dic-2025); asunto crítico: provisión de garantías de 167,2 M USD', confianza: 'Alta' },
  fuentes: fA,
  huecos: [
    { seccion: 'trimestres', campo: 'EBITDA trimestral y crecimiento de los trimestres de 2024-2025', tipo: 'Complemento', intentos: '1) Notas de prensa (dan amortizaciones solo acumuladas en el estado de flujos); 2) 10-Q trimestrales no descargados por tiempo; 3) XBRL trimestral (no se usa la herramienta trimestral)', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Form 10-K 2025: Business (productos, marcas, canales, competencia, estacionalidad, refrigerantes A2L, aranceles)', editor: 'Lennox International Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-17', url: `${E8}/000106920226000028/lii-20251231.htm` },
  { id: 2, titulo: 'North America HVAC System Market: 42.200 M USD en 2025 y 57.600 M en 2030 (+6,4 % anual)', editor: 'MarketsandMarkets', tipo: 'Sectorial', fecha: '2025-11-17', url: 'https://www.marketsandmarkets.com/PressReleases/north-america-hvac-system.asp' },
  { id: 3, titulo: 'North America HVAC System Market Outlook to 2030 (49.500 M USD en 2024; 68.900 M en 2030)', editor: 'Ken Research', tipo: 'Sectorial', fecha: '2025', url: 'https://www.kenresearch.com/industry-reports/north-america-hvac-system-market.md' },
  { id: 4, titulo: 'United States: October 2025 heating and cooling equipment shipment data (AHRI: aire acondicionado y bombas de calor −17,7 % hasta octubre)', editor: 'International Institute of Refrigeration (datos de AHRI)', tipo: 'Sectorial', fecha: '2025-12', url: 'https://iifiir.org/en/news/united-states-october-2025-heating-and-cooling-equipment-shipment-data' },
  { id: 5, titulo: 'Estadísticas de Trane, Carrier, Johnson Controls, Watsco y AAON (ventas, EBIT y márgenes de los últimos 12 meses)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/quote/TT/' },
  { id: 6, titulo: 'Ficha sectorial de climatización (HVAC) y control de edificios', editor: 'Repositorio (sectores/climatizacion-hvac-2026-10-14)', tipo: 'Sectorial', fecha: '2026-10-14', url: 'https://github.com/' },
  { id: 7, titulo: 'Lennox Reports 2026 Second Quarter Results (8-K, anexo 99.1)', editor: 'Lennox International Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-07-29', url: `${E8}/000106920226000085/lii-20260630xexx991pressre.htm` },
  { id: 8, titulo: 'Form 10-Q del 2T26 (sentencia del Supremo sobre los aranceles IEEPA; aranceles 232 y 301; Heat Controller)', editor: 'Lennox International Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-07-29', url: `${E8}/000106920226000087/lii-20260630.htm` },
  { id: 9, titulo: 'Bosch acquires residential and light commercial HVAC business from Johnson Controls and Hitachi', editor: 'Bosch Home Comfort Group', tipo: 'Primaria', fecha: '2024-07-23', url: 'https://www.bosch-homecomfortgroup.com/en/news-and-stories/news/bosch-acquires-residential-and-light-commercial-hvac-business-from-johnson-controls-and-hitachi/' },
  { id: 10, titulo: 'Carrier to acquire Viessmann Climate in $12 billion deal', editor: 'Paul, Weiss', tipo: 'Prensa', fecha: '2023-04-26', url: 'https://www.paulweiss.com/insights/client-news/carrier-to-acquire-viessmann-climate-in-12-billion-deal' },
];
const B = {
  _estado: 'Completo. Tamaño de mercado con dos fuentes privadas (perímetros algo distintos); competidores con cifras de Yahoo al 15-oct.',
  historia: {
    hitos: [
      { anio: '1895', hito: 'Dave Lennox funda la empresa en Marshalltown (Iowa) con una caldera de carbón de acero remachado [1].' },
      { anio: '1904', hito: 'D.W. Norris compra la empresa; la familia Norris sigue siendo hoy el mayor accionista individual (9,3 %).' },
      { anio: '1999', hito: 'Salida a bolsa en la Bolsa de Nueva York (LII).' },
      { anio: '2023', hito: 'Venta de las operaciones europeas (4T) y compra de AES, servicio comercial; nueva fábrica de equipos comerciales en Saltillo (México) [1].' },
      { anio: '2024', hito: 'Reorganización en dos segmentos (Home Comfort Solutions y Building Climate Solutions) y empresas conjuntas con Samsung (equipos sin conductos) y Ariston (calentadores de agua) [1].' },
      { anio: '2025', hito: 'Cambio de refrigerante a A2L (R-454B), con escasez de bombonas y reducción de inventarios en el canal; compra de Duro Dyne y Supco por 545 M USD (octubre) [1].' },
      { anio: '2026', hito: 'Compra de Heat Controller (Comfort-Aire, Century) por 205 M USD en julio; recorte de la guía de BPA a 23-24 USD y caída del 21 % en un día (29-jul) [7, 8].' },
    ],
    confianza: 'Media',
  },
  negocio: { confianza: 'Alta' },
  sector: {
    tamano: '≈42.200 M USD en 2025 (sistemas de climatización de Norteamérica) [2]; Ken Research da 49.500 M en 2024 con un perímetro más amplio [3]',
    unidad_serie: 'millones de USD',
    serie: [{ anio: '2025', tamano: 42200 }, { anio: '2026e', tamano: 44900 }, { anio: '2027e', tamano: 47780 }, { anio: '2028e', tamano: 50840 }, { anio: '2029e', tamano: 54090 }, { anio: '2030e', tamano: 57600 }],
    tcac_historico_pct: null, tcac_previsto_pct: 6.4,
    cr5_pct: null, estructura: 'Moderadamente concentrada',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 12.3,
    competidores: [
      { nombre: 'Carrier Global', pais: 'EE. UU.', ticker: 'CARR', ingresos: 22108, cuota_pct: null, margen_ebit_pct: 8.1, comentario: 'Líder residencial en EE. UU. (Carrier, Bryant, Payne); compró Viessmann en 2024 y vende el resto de negocios no climáticos [1, 5, 10].' },
      { nombre: 'Trane Technologies', pais: 'Irlanda', ticker: 'TT', ingresos: 22210, cuota_pct: null, margen_ebit_pct: 17.8, comentario: 'Fuerte en enfriadoras comerciales y centros de datos; en residencial con Trane y American Standard [1, 5].' },
      { nombre: 'Daikin (Goodman, Amana)', pais: 'Japón', ticker: '6367', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Primer fabricante mundial; en EE. UU. compite en precio con Goodman y gana cuota en obra nueva [1, 6].' },
      { nombre: 'Bosch (York, Luxaire, Coleman)', pais: 'Alemania', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Compró en 2024 el negocio residencial y comercial ligero de Johnson Controls y Hitachi por ≈8.000 M USD [9].' },
      { nombre: 'Paloma (Rheem, Ruud)', pais: 'Japón', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Gran fabricante residencial no cotizado [1].' },
      { nombre: 'AAON', pais: 'EE. UU.', ticker: 'AAON', ingresos: 1932, cuota_pct: null, margen_ebit_pct: 11.1, comentario: 'Equipos comerciales de cubierta a medida y refrigeración de centros de datos [5].' },
    ],
    confianza: 'Media',
  },
  esg: { calificaciones: [], confianza: 'Baja' },
  fuentes: fB,
  huecos: [
    { seccion: 'sector', campo: 'CR5 y cuotas del mercado residencial de EE. UU.', tipo: 'Complemento', intentos: '1) 10-K (sin cuotas); 2) MarketsandMarkets y Ken Research (páginas públicas sin cuotas); 3) AHRI (solo unidades del conjunto del sector)', decision: 'Omitido; cuota de Lennox estimada sobre el mercado de MarketsandMarkets' },
    { seccion: 'esg', campo: 'calificaciones ESG', tipo: 'Complemento', intentos: '1) 10-K y proxy (sin calificaciones); 2) MSCI ESG Ratings (requiere JavaScript); 3) Sustainalytics (sin acceso)', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Proxy statement 2026 (DEF 14A): consejo, remuneración de 2025, ratio salarial 133:1, participaciones significativas', editor: 'Lennox International Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-04-08', url: `${E8}/000106920226000046/lii-20260406.htm` },
  { id: 2, titulo: 'Form 8-K: resultados de la junta del 21-may-2026 y dimisión de un consejero', editor: 'Lennox International Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-05-28', url: `${E8}/000106920226000076/lii-20260521.htm` },
  { id: 3, titulo: 'Form 4 de consejeros y directivos (15-oct-2025 a 15-oct-2026), herramientas/form4.mjs', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001069202&type=4' },
  { id: 4, titulo: 'Notas de resultados de enero/febrero 2022-2026 con la guía anual inicial (8-K, anexo 99.1)', editor: 'Lennox International Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-01-28', url: `${E8}/000106920226000005/lii-20251231xexx991pressre.htm` },
  { id: 5, titulo: 'Form 10-K 2025 (directivos; cambio de auditor; resultados 2023-2025)', editor: 'Lennox International Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-17', url: `${E8}/000106920226000028/lii-20251231.htm` },
  { id: 6, titulo: 'Lennox Reports 2026 Second Quarter Results (guía 2026 rebajada)', editor: 'Lennox International Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-07-29', url: `${E8}/000106920226000085/lii-20260630xexx991pressre.htm` },
  { id: 7, titulo: 'Lennox Reports Third Quarter 2025 Results (guía 2025 rebajada)', editor: 'Lennox International Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2025-10-22', url: `${E8}/000106920225000046/lii-2025930xexx991pressrel.htm` },
];
const cons = (nombre, cargo, tipo, desde, comisiones) => ({ nombre, cargo, tipo, desde, comisiones });
const C = {
  _estado: 'Completo. Proxy de 2026, 8-K de la junta y Form 4 de 12 meses.',
  directivos: {
    equipo: [
      { nombre: 'Alok Maskara', cargo: 'Consejero delegado', desde: '2022', participacion_pct: 0.15, trayectoria: 'Antes consejero delegado de Luxfer (cinco años) y presidente de unidades de Pentair; con él el margen de segmentos pasó de ≈14 % (2022) a 20,4 % (2025), salió de Europa y compró AES, Duro Dyne, Supco y Heat Controller [1, 5].' },
      { nombre: 'Michael Quenzer', cargo: 'Director financiero', desde: '2024', participacion_pct: 0.02, trayectoria: 'En Lennox desde 2004 (relaciones con inversores, planificación, finanzas del segmento comercial) [5].' },
      { nombre: 'Sarah R. Martin', cargo: 'Presidenta de Home Comfort Solutions', desde: '2025', participacion_pct: 0.0, trayectoria: 'Trece años en Honeywell (presidenta de Sensing & Safety Technologies); dirige el segmento residencial desde abril de 2025, el que más ha caído [5].' },
      { nombre: 'Joe Nassab', cargo: 'Presidente de Building Climate Solutions', desde: '2022', participacion_pct: 0.05, trayectoria: 'En Lennox desde 2010 (Allied Air); el segmento comercial ha pasado de 1.511 a 1.852 M USD de ventas y del 22,5 % al 23,4 % de margen (2023-2025) [5].' },
      { nombre: 'Todd J. Teske', cargo: 'Presidente independiente del consejo', desde: '2011', participacion_pct: 0.02, trayectoria: 'Antes presidente y consejero delegado de Briggs & Stratton [1].' },
    ],
    historial_guidance: [
      { anio: '2022', guia: 'Ventas +5-10 %; BPA 13,40-14,40 USD (subida a 13,50-14,50) [4]', real: 'Ventas +12,5 %; BPA 13,88 [5]', cumplida: 'Sí' },
      { anio: '2023', guia: 'Ventas núcleo 0 a +4 %; BPA 14,25-15,25 USD [4]', real: 'BPA ajustado 17,96 [4]', cumplida: 'Sí' },
      { anio: '2024', guia: 'Ventas núcleo +7 %; BPA ajustado 18,50-20,00 USD [4]', real: 'Ventas núcleo +≈12 %; BPA ajustado 22,58 [4]', cumplida: 'Sí' },
      { anio: '2025', guia: 'Ventas núcleo +2 %; BPA ajustado 22,00-23,50 USD; FCF 650-800 M [4]', real: 'Ventas −3 %; BPA ajustado 23,16; FCF 640 M (guía rebajada en octubre) [4, 7]', cumplida: 'Parcial' },
      { anio: '2026', guia: 'Ventas +6-7 %; BPA ajustado 23,50-25,00 USD [4]', real: 'En curso: guía de BPA rebajada a 23,00-24,00 en julio; ventas +8 % por compras [6]', cumplida: 'Parcial' },
    ],
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      cons('Todd J. Teske', 'Presidente independiente', 'Independiente', '2011', 'Ejecutiva (presidente); experto financiero'),
      cons('Alok Maskara', 'Consejero delegado', 'Ejecutivo', '2022', 'Ejecutiva'),
      cons('John W. Norris, III', 'Consejero', 'Dominical', '2001', 'Gobierno; Remuneración'),
      cons('Karen H. Quintos', 'Consejera', 'Independiente', '2014', 'Gobierno (presidenta)'),
      cons('Shane D. Wall', 'Consejero', 'Independiente', '2020', 'Remuneración (presidente)'),
      cons('Sherry L. Buck', 'Consejera', 'Independiente', '2019', 'Auditoría (presidenta)'),
      cons('Jon Vander Ark', 'Consejero', 'Independiente', '2024', 'Auditoría'),
      cons('Tracy A. Embree', 'Consejera', 'Independiente', '2025', 'Auditoría; Gobierno; Remuneración'),
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: true, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 93.0, voto_remuneracion_contra_pct: 7.0, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 8.43, fijo: 1.18, variable_corto: 1.33, variable_largo: 5.65, ratio_salario_medio: 133 },
    accionistas: [
      { nombre: 'The Vanguard Group', pct: 11.2, tipo: 'Institucional', variacion: 'Estable (13G de enero de 2025)' },
      { nombre: 'John W. Norris, III y fideicomisos de la familia Norris', pct: 9.3, tipo: 'Familia fundadora (consejero)', variacion: 'Estable' },
      { nombre: 'Capital International Investors', pct: 8.5, tipo: 'Institucional', variacion: 'Nueva posición declarada (13G de febrero de 2026)' },
      { nombre: 'BlackRock, Inc.', pct: 8.2, tipo: 'Institucional', variacion: 'Estable (13G de febrero de 2025)' },
      { nombre: 'Consejeros y directivos (16 personas)', pct: 9.8, tipo: 'Dirección', variacion: 'Casi todo es la familia Norris' },
    ],
    insiders: [
      { fecha: '2026-05-06', persona: 'Chris A. Kosel (director contable)', operacion: 'Venta', acciones: 971, importe: 0.53 },
      { fecha: '2026-02-25', persona: 'Shane D. Wall (consejero)', operacion: 'Venta', acciones: 100, importe: 0.05 },
      { fecha: '2026-02-04', persona: 'Todd J. Teske (presidente)', operacion: 'Venta', acciones: 700, importe: 0.37 },
      { fecha: '2026-02-04', persona: 'Chris A. Kosel (director contable)', operacion: 'Venta', acciones: 254, importe: 0.14 },
      { fecha: '2025-11-11', persona: 'Todd J. Teske (presidente)', operacion: 'Venta', acciones: 600, importe: 0.30 },
    ],
    alertas: [
      'Cambio de auditor en 2025: KPMG (auditor desde 2002) sustituido por Ernst & Young; el 8-K de marzo de 2025 no menciona desacuerdos [5].',
      'Ningún consejero ni directivo ha comprado acciones tras la caída del 38 %; ventas pequeñas (1,4 M USD en 12 meses) antes de la caída [3].',
      'Consejo escalonado en tres clases con mandatos de tres años: dificulta un cambio de control no pactado [2].',
      'Dimisión del consejero Sivasankaran Somasundaram en mayo de 2026 «sin desacuerdos»; el consejo pasa de nueve a ocho miembros [2].',
    ],
    confianza: 'Alta',
  },
  fuentes: fC,
  huecos: [],
};

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de LII, SPY y XLI (herramientas/bolsa.mjs y movimiento.mjs), hasta el 14-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/LII/history' },
  { id: 2, titulo: 'Lennox International: estimaciones (earningsTrend: BPA 2026e 23,47 y 2027e 25,82; ventas 5.586 y 5.921 M), recomendaciones y objetivos (media 453,21 USD, 14 analistas), historial de cambios de recomendación', editor: 'Yahoo Finance (quoteSummary)', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/quote/LII/analysis' },
  { id: 3, titulo: '10-Year Treasury Constant Maturity Rate (DGS10): 5,21 % el 13-oct-2026', editor: 'FRED, Federal Reserve Bank of St. Louis', tipo: 'Primaria', fecha: '2026-10-13', url: 'https://fred.stlouisfed.org/series/DGS10' },
  { id: 4, titulo: 'Implied ERP by month (ERPbymonth.xlsx): 4,20 % en octubre de 2026', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 5, titulo: 'Fichas de Trane, Carrier, Johnson Controls, Watsco y AAON (capitalización, PER adelantado, EV/EBITDA, márgenes, ROIC, deuda, FCF) al 15-oct-2026', editor: 'Yahoo Finance (herramientas/yahoo.mjs)', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/quote/CARR/' },
  { id: 6, titulo: 'Ficha sectorial de climatización: comparables Daikin, Vertiv y Schneider a 14-oct-2026', editor: 'Repositorio (sectores/climatizacion-hvac-2026-10-14-comparables.json, datos de Yahoo)', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://github.com/' },
  { id: 7, titulo: 'Bosch acquires residential and light commercial HVAC business from Johnson Controls and Hitachi (≈8.000 M USD; ventas ≈4.000 M EUR en 2023)', editor: 'Bosch Home Comfort Group', tipo: 'Primaria', fecha: '2024-07-23', url: 'https://www.bosch-homecomfortgroup.com/en/news-and-stories/news/bosch-acquires-residential-and-light-commercial-hvac-business-from-johnson-controls-and-hitachi/' },
  { id: 8, titulo: 'Carrier to acquire Viessmann Climate in $12 billion deal (≈13 veces el EBITDA proyectado de 2023 con sinergias)', editor: 'Paul, Weiss', tipo: 'Prensa', fecha: '2023-04-26', url: 'https://www.paulweiss.com/insights/client-news/carrier-to-acquire-viessmann-climate-in-12-billion-deal' },
  { id: 9, titulo: 'Form 10-Q del 2T26 (Heat Controller por 205 M USD; acciones en circulación 34,56 M a 22-jul-2026)', editor: 'Lennox International Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-07-29', url: `${E8}/000106920226000087/lii-20260630.htm` },
  { id: 10, titulo: 'Lennox Schedules Third Quarter Results (28-oct-2026, antes de la apertura)', editor: 'Lennox International Inc. (vía Finviz)', tipo: 'Primaria', fecha: '2026-10-08', url: 'https://finviz.com/news/400427/lennox-schedules-third-quarter-results' },
  { id: 11, titulo: 'Why Lennox (LII) stock is down today (29-jul-2026: −20 % tras recortar la guía)', editor: 'Barchart (StockStory)', tipo: 'Prensa', fecha: '2026-07-29', url: 'https://www.barchart.com/story/news/3530861/why-lennox-lii-stock-is-down-today' },
  { id: 12, titulo: 'Titulares de Lennox (Goldman Sachs rebaja a Lennox y Carrier, 14-oct-2026; «HVAC stocks slide as rising Treasury yields hit AI infrastructure trade», 18-ago-2026; «HVAC stocks sink as earnings, margin pressure, data-center qualms trigger selloff», 29-jul-2026)', editor: 'Seeking Alpha (RSS)', tipo: 'Prensa', fecha: '2026-10-14', url: 'https://seekingalpha.com/api/sa/combined/LII.xml' },
  { id: 13, titulo: 'Lennox Reports Third Quarter 2025 Results (guía 2025 rebajada; HCS −12 %)', editor: 'Lennox International Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2025-10-22', url: `${E8}/000106920225000046/lii-2025930xexx991pressrel.htm` },
  { id: 14, titulo: 'Lennox Reports 2026 First Quarter Results (HCS −10 %, BCS +38 %)', editor: 'Lennox International Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-04-29', url: `${E8}/000106920226000052/lii-20260331xexx991pressre.htm` },
];
const vertiv = 71059 / 0.8362, schneider = 138756 / 0.8362, daikin = 31669 / 0.8362;
const D = {
  _estado: 'Completo. Precio de bolsa.mjs: cierre del 14-oct (la sesión del 15-oct no había cerrado a las 17:00 UTC). Comparables de Yahoo al 15-oct (PER adelantado en base ajustada de cada empresa).',
  identificacion: {
    nombre: 'Lennox International Inc.', nombre_corto: 'Lennox', ticker: 'LII', isin: 'US5261071071', mercado: 'Bolsa de Nueva York (NYSE)', indice_referencia: 'S&P 500',
    pais: 'Estados Unidos', pais_iso: 'US', sector: 'Industria', industria: 'Productos de construcción (climatización y refrigeración)', sede: 'Richardson (Texas)', fundacion: '1895', empleados: 12900, web: 'https://www.lennox.com',
    precio: BOLSA.identificacion.precio, fecha_precio: BOLSA.identificacion.fecha_precio, acciones: 34.7, capitalizacion_publicada: 12292, free_float_pct: 90.4,
    max_52s: BOLSA.identificacion.max_52s, min_52s: BOLSA.identificacion.min_52s, volumen_medio_diario: `≈ ${BOLSA.volumen_3m.importe_dia_millones.toFixed(0)} M USD/día (3 meses)`, proximos_resultados: '2026-10-28',
  },
  consenso: {
    estimaciones: [
      { periodo: '2026e', ingresos: 5586.4, ebitda: null, ebit: null, bpa: 23.47, dpa: null, fuente: 'Yahoo Finance (18 analistas; BPA ajustado, que en 2026 coincide con el GAAP) [2]' },
      { periodo: '2027e', ingresos: 5921.4, ebitda: null, ebit: null, bpa: 25.82, dpa: null, fuente: 'Yahoo Finance (18 analistas) [2]' },
    ],
    recomendaciones: { n_analistas: 18, comprar: 4, mantener: 13, vender: 1, po_medio: 453.21, po_min: 350, po_max: 600 },
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: { ...BOLSA.bolsa, posicion_corta_pct: 9.8, confianza: 'Alta' },
  multiplos_historicos: {
    serie: ANIOS.map((y) => ({ anio: y, precio_cierre: BOLSA.cierres_ejercicio.find((c) => c.anio === y).precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    confianza: 'Alta',
  },
  comparables: {
    empresas: [
      { nombre: 'Trane Technologies', ticker: 'TT', pais: 'IE', capitalizacion: 98783, ev_ventas: 4.58, ev_ebitda_ltm: 23.4, ev_ebitda_ntm: null, per_ntm: 25.5, crecimiento_pct: null, margen_ebitda_pct: 19.5, roic_pct: 23.9, dn_ebitda: 0.66, fcf_yield_pct: 3.6 },
      { nombre: 'Carrier Global', ticker: 'CARR', pais: 'US', capitalizacion: 44810, ev_ventas: 2.49, ev_ebitda_ltm: 17.9, ev_ebitda_ntm: null, per_ntm: 16.4, crecimiento_pct: null, margen_ebitda_pct: 13.9, roic_pct: 7.6, dn_ebitda: 3.34, fcf_yield_pct: 4.3 },
      { nombre: 'Johnson Controls', ticker: 'JCI', pais: 'IE', capitalizacion: 87309, ev_ventas: 3.87, ev_ebitda_ltm: 26.2, ev_ebitda_ntm: null, per_ntm: 23.6, crecimiento_pct: null, margen_ebitda_pct: 14.8, roic_pct: 8.5, dn_ebitda: 2.57, fcf_yield_pct: 1.9 },
      { nombre: 'Watsco', ticker: 'WSO', pais: 'US', capitalizacion: 12391, ev_ventas: 1.71, ev_ebitda_ltm: 17.7, ev_ebitda_ntm: null, per_ntm: 22.6, crecimiento_pct: null, margen_ebitda_pct: 9.6, roic_pct: 19.8, dn_ebitda: 0.06, fcf_yield_pct: 5.6 },
      { nombre: 'AAON', ticker: 'AAON', pais: 'US', capitalizacion: 6304, ev_ventas: 3.47, ev_ebitda_ltm: 22.4, ev_ebitda_ntm: null, per_ntm: 21.4, crecimiento_pct: null, margen_ebitda_pct: 15.5, roic_pct: 9.4, dn_ebitda: 1.36, fcf_yield_pct: -2.1 },
      { nombre: 'Daikin Industries', ticker: '6367', pais: 'JP', capitalizacion: Math.round(daikin), ev_ventas: 1.23, ev_ebitda_ltm: 8.6, ev_ebitda_ntm: null, per_ntm: null, crecimiento_pct: null, margen_ebitda_pct: 14.3, roic_pct: 7.6, dn_ebitda: 0.22, fcf_yield_pct: 4.3 },
      { nombre: 'Vertiv', ticker: 'VRT', pais: 'US', capitalizacion: Math.round(vertiv), ev_ventas: 7.51, ev_ebitda_ltm: 33.7, ev_ebitda_ntm: null, per_ntm: 24.0, crecimiento_pct: null, margen_ebitda_pct: 22.2, roic_pct: 24.2, dn_ebitda: 0.46, fcf_yield_pct: 3.4 },
      { nombre: 'Schneider Electric', ticker: 'SU', pais: 'FR', capitalizacion: Math.round(schneider), ev_ventas: 3.86, ev_ebitda_ltm: 18.5, ev_ebitda_ntm: null, per_ntm: 21.4, crecimiento_pct: null, margen_ebitda_pct: 20.9, roic_pct: 12.9, dn_ebitda: 1.51, fcf_yield_pct: 3.9 },
    ],
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2026-07', objetivo: 'Heat Controller (Comfort-Aire, Century)', comprador: 'Lennox', ev: 205, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Equipos para distribuidores pequeños y medianos; múltiplo no publicado [9].' },
      { fecha: '2025-10', objetivo: 'Duro Dyne y Supco', comprador: 'Lennox', ev: 545, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Recambios y accesorios de climatización; múltiplo no publicado.' },
      { fecha: '2024-07', objetivo: 'Residencial y comercial ligero de Johnson Controls y Johnson Controls-Hitachi', comprador: 'Bosch', ev: 8100, ev_ventas: 1.85, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Estimación propia de EV/ventas: 7.400 M EUR entre ≈4.000 M EUR de ventas de 2023 [7].' },
      { fecha: '2023-04', objetivo: 'Viessmann Climate Solutions', comprador: 'Carrier', ev: 13200, ev_ventas: null, ev_ebitda: 13.0, prima_pct: null, excluir: false, comentario: '12.000 M EUR; ≈13 veces el EBITDA proyectado de 2023 con sinergias, según Carrier [8].' },
      { fecha: '2023-10', objetivo: 'AES Industries y AES Mechanical', comprador: 'Lennox', ev: 95, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Servicio y bordillos para equipos de cubierta; múltiplo no publicado.' },
    ],
    confianza: 'Baja',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'transacciones', campo: 'múltiplos de las compras de Lennox (AES, Duro Dyne y Supco, Heat Controller)', tipo: 'Complemento', intentos: '1) 10-K 2025 y 10-Q 2T26 (precio, sin EBITDA de las compradas); 2) notas de prensa de las compras (sin múltiplo); 3) prensa sectorial (sin cifra)', decision: 'Omitido; peso de transacciones 0' },
    { seccion: 'consenso', campo: 'EBITDA y EBIT del consenso y estimaciones de 2028', tipo: 'Complemento', intentos: '1) MarketScreener (la búsqueda lleva a otra empresa); 2) Yahoo (solo BPA y ventas a dos años); 3) valueinvesting.io y Seeking Alpha (403)', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Lennox International Inc.: noticias y análisis (titulares junio-octubre de 2026, RSS)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-14', url: 'https://seekingalpha.com/api/sa/combined/LII.xml' },
  { id: 2, titulo: 'Stream $LII (30 mensajes, 28-jul a 14-oct-2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-14', url: 'https://api.stocktwits.com/api/2/streams/symbol/LII.json' },
  { id: 3, titulo: "Lennox International's plummeting P/E undervalues its inevitable replacement cycle", editor: 'Kavout', tipo: 'Foros y redes', fecha: '2026-08', url: 'https://www.kavout.com/market-lens/lennox-international-s-plummeting-p-e-undervalues-its-inevitable-replacement-cycle' },
  { id: 4, titulo: 'What earnings season is signaling about HVACR in 2026', editor: 'HARDI (Market Intelligence)', tipo: 'Foros y redes', fecha: '2026', url: 'https://hardinet.org/posts/market-intelligence/what-earnings-season-is-signaling-about-hvacr-in-2026' },
];
const E = {
  _estado: 'Completo. Reddit da 403; se leen Seeking Alpha (titulares y artículos de autores), Stocktwits y comentarios de mercado.',
  sentimiento: {
    tono: 'Negativo', tendencia: 'Empeora',
    revisadas: [
      { plataforma: 'Seeking Alpha (artículos de autores)', fecha: '2026-08', n_comentarios: 4, tono: 'Dividido', resumen: 'De «valoración demasiado caliente» (junio) y «todavía no se ha enfriado bastante» (29-jul) a «negocio en el sitio correcto en el momento correcto» (agosto) [1].' },
      { plataforma: 'Seeking Alpha (noticias)', fecha: '2026-10', n_comentarios: 8, tono: 'Negativo', resumen: 'Rebaja de Goldman Sachs (14-oct), caída del sector por los tipos del bono (18-ago) y por márgenes y dudas sobre centros de datos (29-jul); la acción figura entre las de peor impulso del S&P [1].' },
      { plataforma: 'Stocktwits', fecha: '2026-10', n_comentarios: 30, tono: 'Negativo', resumen: 'Mínimos de 52 semanas casi cada semana desde agosto, apuestas bajistas antes de los resultados; una minoría compra «porque el aire acondicionado no va a desaparecer» [2].' },
      { plataforma: 'Comentarios de mercado (Kavout, HARDI)', fecha: '2026-08', n_comentarios: 3, tono: 'Dividido', resumen: 'Tesis alcista: la reposición aplazada tiene que volver y el PER ha caído a mínimos; tesis bajista: el residencial sigue débil por la vivienda y los tipos [3, 4].' },
    ],
    confianza: 'Media',
  },
  fuentes: fE,
  huecos: [],
};

guarda('A', A); guarda('B', B); guarda('C', C); guarda('D', D); guarda('E', E);
console.log('Notas A-E escritas');
