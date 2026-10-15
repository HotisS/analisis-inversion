// Escribe las notas A-E de Qualys (corte 2026-10-15) a partir del XBRL de la SEC (cuentas-xbrl.json),
// las notas de prensa de resultados (8-K 99.1), el 10-K 2025, el 10-Q del 2T26, el proxy de 2026, bolsa.mjs,
// MarketScreener, Stock Analysis y foros. Cada nota cita solo con [n] de su propia lista. Ejecutar: node notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const X = JSON.parse(fs.readFileSync(path.join(dir, 'cuentas-xbrl.json'), 'utf8'));
const BOLSA = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const E8 = 'https://www.sec.gov/Archives/edgar/data/1107843';
const r1 = (v) => (v == null ? null : Math.round(v * 10) / 10);
const ANIOS = ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'];

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Form 10-K 2025 (cuentas auditadas, notas de ingresos por canal y geografía, comisiones activadas, competencia, empleados)', editor: 'Qualys, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-20', url: `${E8}/000110784326000008/qlys-20251231.htm` },
  { id: 2, titulo: 'Hechos XBRL (companyfacts): cuenta, balance y flujos 2016-2025, valores negociables, pagos en acciones, comisiones activadas', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0001107843.json' },
  { id: 3, titulo: 'Qualys Announces Second Quarter 2026 Financial Results (8-K, anexo 99.1)', editor: 'Qualys, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-04', url: `${E8}/000110784326000034/qlys-20260804xex991.htm` },
  { id: 4, titulo: 'Form 10-Q del 2T26 (balance a 30-jun-2026, tasa de expansión neta 105 %, recompras, ingresos por canal y geografía)', editor: 'Qualys, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-04', url: `${E8}/000110784326000035/qlys-20260630.htm` },
  { id: 5, titulo: 'Qualys Announces First Quarter 2026 Financial Results (8-K, anexo 99.1)', editor: 'Qualys, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-05-05', url: `${E8}/000110784326000013/qlys-20260505xex991.htm` },
  { id: 6, titulo: 'Qualys Announces Fourth Quarter and Full Year 2025 Financial Results (8-K, anexo 99.1)', editor: 'Qualys, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-05', url: `${E8}/000110784326000004/qlys-2026205xex991.htm` },
  { id: 7, titulo: 'Qualys Announces Third Quarter 2025 Financial Results (8-K, anexo 99.1)', editor: 'Qualys, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2025-11-04', url: `${E8}/000110784325000037/qlys-20251104xex991.htm` },
  { id: 8, titulo: 'Qualys (QLYS) Q2 2026 Earnings Call Transcript (facturación corriente +16 %, ETM 12 % de las contrataciones, 229 clientes de más de 500.000 USD)', editor: 'The Motley Fool (vía Webull)', tipo: 'Prensa', fecha: '2026-08-05', url: 'https://www.webull.com/news/15386993117914112' },
];
const cx = Object.fromEntries(X.financieros.cuenta.map((r) => [r.periodo, r]));
const bx = Object.fromEntries(X.balance.historico.map((r) => [r.periodo, r]));
const fx = Object.fromEntries(X.flujos.historico.map((r) => [r.periodo, r]));
// Valores negociables a corto y largo plazo (XBRL; 2024-2025 de las notas del 10-K): la caja del balance los incluye.
const valores = { 2018: 248.1 + 76.7, 2019: 211.3 + 119.5, 2020: 281.9 + 98.5, 2021: 268.0 + 111.2, 2022: 147.6 + 59.2, 2023: 221.9 + 56.6, 2024: 149.2 + 193.9, 2025: 195.7 + 250.9 };
// Ingresos diferidos no corrientes (XBRL ContractWithCustomerLiabilityNoncurrent)
const difNC = { 2018: 20.4, 2019: 20.9, 2020: 30.5, 2021: 32.8, 2022: 23.5, 2023: 31.7, 2024: 24.3, 2025: 16.3 };
// Aumento neto de comisiones activadas (corriente + no corriente, XBRL) que se suma al capex (lección de software)
const comisiones = { 2018: 0, 2019: 0, 2020: 1.3, 2021: 2.2, 2022: 2.5, 2023: 2.6, 2024: 4.9, 2025: 3.7 };
// Retenciones fiscales pagadas por la liquidación neta de acciones de empleados (XBRL): se suman a las recompras
const retenciones = { 2018: 14.9, 2019: 15.7, 2020: 20.2, 2021: 27.8, 2022: 17.6, 2023: 22.3, 2024: 28.4, 2025: 25.0 };
const opciones = { 2018: 24.1, 2019: 24.8, 2020: 34.5, 2021: 50.0, 2022: 24.5, 2023: 45.6, 2024: 17.3, 2025: 16.3 };
const compras = { 2018: 13.6, 2019: 4.1, 2020: 1.5, 2021: 1.2, 2022: 8.6, 2023: 0, 2024: 0, 2025: 0 };

const cuenta = ANIOS.map((y) => {
  const c = cx[y];
  return { periodo: y, ingresos: c.ingresos, coste_ventas: c.coste_ventas, gastos_generales: c.gastos_generales, ebitda: c.ebitda, amortizaciones: c.amortizaciones, ebit: c.ebit, resultado_financiero: c.resultado_financiero, bai: c.bai, impuestos: c.impuestos, minoritarios: 0, beneficio_neto: c.beneficio_neto, gastos_financieros: 0, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: c.bpa, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: c.acciones_diluidas };
});
const historico = ANIOS.map((y) => {
  const b = bx[y];
  return { periodo: y, activo_total: b.activo_total, activo_corriente: b.activo_corriente, pasivo_corriente: b.pasivo_corriente, pasivo_total: b.pasivo_total, fondo_comercio: b.fondo_comercio, intangibles: b.intangibles, inmovilizado_material: b.inmovilizado_material, existencias: 0, clientes: b.clientes, proveedores: b.proveedores, activos_contrato: null, pasivos_contrato: r1(b.pasivos_contrato + difNC[y]), caja: r1(b.caja + valores[y]), deuda_financiera: 0, arrendamientos: 0, patrimonio_neto: b.patrimonio_neto, minoritarios: 0, reservas: b.reservas };
});
const flujos = ANIOS.map((y) => {
  const f = fx[y];
  return { periodo: y, flujo_operativo: f.flujo_operativo, capex: r1(f.capex + comisiones[y]), pagos_arrendamientos: f.pagos_arrendamientos ?? 0, adquisiciones: compras[y], desinversiones: 0, dividendos: 0, recompras: r1(f.recompras + retenciones[y]), emision_acciones: opciones[y], intereses_en_financiacion: 0 };
});
const A = {
  _estado: 'Completo. Cuentas 2018-2025 del XBRL de la SEC comprobadas con el 10-K 2025 y las notas de resultados; LTM a junio de 2026 con el 10-Q del 2T26.',
  negocio: {
    segmentos: [
      { nombre: 'Venta directa', descripcion: 'Equipo comercial propio (grandes cuentas y ventas internas a pymes)', tipo_resultado: null, historico: [{ periodo: '2023', ingresos: 315.0, resultado: null }, { periodo: '2024', ingresos: 325.4, resultado: null }, { periodo: '2025', ingresos: 338.0, resultado: null }] },
      { nombre: 'Socios y canal', descripcion: 'Proveedores de servicios gestionados (MSSP), nubes públicas, revendedores e integradores', tipo_resultado: null, historico: [{ periodo: '2023', ingresos: 239.5, resultado: null }, { periodo: '2024', ingresos: 282.1, resultado: null }, { periodo: '2025', ingresos: 331.1, resultado: null }] },
    ],
    geografias: [{ nombre: 'Estados Unidos', peso_pct: 56.4 }, { nombre: 'Resto del mundo', peso_pct: 43.6 }],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Tasa de expansión neta (ARR, divisa constante)', valor_anterior: '104 % (jun-25)', valor_actual: '105 % (jun-26)', variacion: '+1 punto', comentario: 'Era el 103 % en diciembre de 2024 y de 2025 [4, 1]; la cohorte con ETM o CSAM, 107 % [8].' },
      { kpi: 'Facturación corriente calculada (2T)', valor_anterior: '≈152 M USD (2T25)', valor_actual: '176,5 M USD (2T26)', variacion: '+16 %', comentario: 'LTM +10 % (8,5 % el trimestre anterior); la empresa supone solo +7-8 % en el segundo semestre [8].' },
      { kpi: 'Clientes de más de 500.000 USD', valor_anterior: '≈212', valor_actual: '229', variacion: '+8 %', comentario: 'Dato de la conferencia del 2T26 [8].' },
      { kpi: 'Ingresos por canal de socios (% del total, 2T)', valor_anterior: '49 %', valor_actual: '54 %', variacion: '+5 puntos', comentario: 'Canal +22 % y directo plano en el 2T26 [4, 8].' },
      { kpi: 'Peso de VMDR en las contrataciones (LTM)', valor_anterior: '54 %', valor_actual: '49 %', variacion: '−5 puntos', comentario: 'Lo compensan ETM/CSAM (12 % de las contrataciones totales), parches (9 %) y TotalCloud (5 %) [8].' },
      { kpi: 'Pagos en acciones (% de ingresos)', valor_anterior: '12,7 % (2024)', valor_actual: '11,5 % (2025)', variacion: '−1,2 puntos', comentario: '77,0 M USD en 2025; 38,2 M en el 1S26 (10,7 %) [2, 3].' },
    ],
    confianza: 'Alta',
  },
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 703.0, ebitda: 254.0, ebit: 241.6, beneficio_neto: 206.5, bpa: 5.76, dpa: 0, dpa_extraordinario: 0, fcf: 313.5, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [],
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '3T24', ingresos: 153.9, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 49.3, margen_ebitda_pct: 32.0, bpa: 1.24, vs_consenso: null },
      { periodo: '4T24', ingresos: 159.2, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 53.6, margen_ebitda_pct: 33.7, bpa: 1.19, vs_consenso: null },
      { periodo: '1T25', ingresos: 159.9, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 55.9, margen_ebitda_pct: 35.0, bpa: 1.29, vs_consenso: null },
      { periodo: '2T25', ingresos: 164.1, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 55.4, margen_ebitda_pct: 33.8, bpa: 1.29, vs_consenso: null },
      { periodo: '3T25', ingresos: 169.9, crecimiento_pct: 10.4, crecimiento_organico_pct: null, ebitda: 63.2, margen_ebitda_pct: 37.2, bpa: 1.39, vs_consenso: null },
      { periodo: '4T25', ingresos: 175.3, crecimiento_pct: 10.1, crecimiento_organico_pct: null, ebitda: 62.0, margen_ebitda_pct: 35.4, bpa: 1.47, vs_consenso: null },
      { periodo: '1T26', ingresos: 175.6, crecimiento_pct: 9.8, crecimiento_organico_pct: null, ebitda: 63.9, margen_ebitda_pct: 36.4, bpa: 1.42, vs_consenso: 'Superior' },
      { periodo: '2T26', ingresos: 182.2, crecimiento_pct: 11.0, crecimiento_organico_pct: null, ebitda: 65.0, margen_ebitda_pct: 35.7, bpa: 1.50, vs_consenso: 'Superior' },
    ],
    confianza: 'Alta',
  },
  balance: {
    historico,
    vencimientos: [],
    liquidez: 'Caja y equivalentes 250,3 M USD + valores negociables a corto 176,0 M y a largo 277,2 M = 703,5 M USD a 30-jun-2026; sin deuda financiera ni líneas de crédito dispuestas [4].',
    rating: 'Sin rating',
    coste_deuda_pct: null, vida_media_anios: null,
    confianza: 'Alta',
  },
  flujos: { historico: flujos, confianza: 'Alta' },
  calidad: { auditor: 'Grant Thornton LLP', anios_auditor: null, opinion: 'Favorable (cuentas y control interno a 31-dic-2025)', confianza: 'Alta' },
  fuentes: fA,
  huecos: [
    { seccion: 'trimestres', campo: 'crecimiento interanual de 3T24 a 2T25', tipo: 'Complemento', intentos: '1) Notas de prensa del 3T25 al 2T26 (solo dan el trimestre del año anterior); 2) XBRL trimestral de 2023-2024 no descargado; 3) prensa (sin cifra fiable)', decision: 'Omitido' },
    { seccion: 'calidad', campo: 'años con el mismo auditor', tipo: 'Complemento', intentos: '1) 10-K 2025 (solo el informe de Grant Thornton); 2) proxy 2026 (ratificación sin año de inicio); 3) búsqueda web sin dato primario', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Form 10-K 2025: Business (plataforma Enterprise TruRisk, VMDR, ETM, TotalCloud, competencia, patentes)', editor: 'Qualys, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-20', url: `${E8}/000110784326000008/qlys-20251231.htm` },
  { id: 2, titulo: 'Security and Vulnerability Management Market: 17.550 M USD en 2025 y 24.070 M en 2030 (+6,5 % anual)', editor: 'MarketsandMarkets', tipo: 'Sectorial', fecha: '2025', url: 'https://www.marketsandmarkets.com/Market-Reports/vulnerability-assessment-management-market-225551733.html' },
  { id: 3, titulo: 'Security & Vulnerability Management Market Report: 17.600 M USD en 2025, +6,7 % anual 2026-2032', editor: 'P&S Intelligence', tipo: 'Sectorial', fecha: '2025', url: 'https://www.psmarketresearch.com/market-analysis/security-&-vulnerability-management-market-report' },
  { id: 4, titulo: 'Qualys Announces Second Quarter 2026 Financial Results (FedRAMP High de TotalCloud, Project Glasswing, Frost Radar)', editor: 'Qualys, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-04', url: `${E8}/000110784326000034/qlys-20260804xex991.htm` },
  { id: 5, titulo: 'Tenable: estadísticas (ingresos LTM 1.040 M USD, EBITDA 53,7 M)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/tenb/statistics/' },
  { id: 6, titulo: 'Rapid7: estadísticas (ingresos LTM 855,9 M USD, margen operativo 1,6 %)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/rpd/statistics/' },
  { id: 7, titulo: 'CrowdStrike: estadísticas (ingresos LTM 5.400 M USD, margen operativo −2,5 %)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/crwd/statistics/' },
  { id: 8, titulo: 'Palo Alto Networks: estadísticas (ingresos LTM 11.480 M USD, margen operativo 7,1 %)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/panw/statistics/' },
  { id: 9, titulo: 'Software, cybersecurity stocks tank: Anthropic and OpenAI fears rattle the sector', editor: 'Yahoo Finance', tipo: 'Prensa', fecha: '2026-04', url: 'https://finance.yahoo.com/sectors/technology/articles/software-cybersecurity-stocks-tank-anthropic-121840002.html' },
  { id: 10, titulo: 'Qualys, Rapid7 and Tenable shares plummet: what you need to know (Claude Mythos y Project Glasswing)', editor: 'Barchart (StockStory)', tipo: 'Prensa', fecha: '2026-04', url: 'https://www.barchart.com/story/news/928634/qualys-rapid7-and-tenable-shares-plummet-what-you-need-to-know' },
  { id: 11, titulo: 'SEC charges four companies with misleading cyber disclosures (Unisys, Avaya, Check Point, Mimecast)', editor: 'U.S. Securities and Exchange Commission', tipo: 'Primaria', fecha: '2024-10-22', url: 'https://www.sec.gov/newsroom/press-releases/2024-174' },
  { id: 12, titulo: 'Qualys exploring sale after attracting takeover interest, Bloomberg reports', editor: 'Nasdaq (Reuters)', tipo: 'Prensa', fecha: '2024-11-07', url: 'https://www.nasdaq.com/articles/qualys-exploring-sale-after-attracting-takeover-interest-bloomberg-reports-0' },
  { id: 13, titulo: 'Ficha sectorial de software de aplicaciones (mapa del riesgo de IA, economía del sector)', editor: 'Repositorio (sectores/software-2026-10-14)', tipo: 'Sectorial', fecha: '2026-10-14', url: 'https://github.com/' },
  { id: 14, titulo: 'Qualys (QLYS) Q2 2026 Earnings Call Transcript', editor: 'The Motley Fool (vía Webull)', tipo: 'Prensa', fecha: '2026-08-05', url: 'https://www.webull.com/news/15386993117914112' },
];
const B = {
  _estado: 'Completo. Tamaño de mercado con dos fuentes privadas que coinciden (≈17.500 M USD en 2025); competidores con cifras de Stock Analysis a 14-oct.',
  historia: {
    hitos: [
      { anio: '1999', hito: 'Fundación en California; en 2000 lanza su primer servicio en la nube, la gestión de vulnerabilidades (VM) [1].' },
      { anio: '2012', hito: 'Salida a bolsa en el Nasdaq (QLYS) [1].' },
      { anio: '2021', hito: 'Muere el consejero delegado histórico, Philippe Courtot; Sumedh Thakar (en la empresa desde 2003) pasa a primer ejecutivo en abril.' },
      { anio: '2022', hito: 'Lanza TotalCloud, su plataforma de protección de aplicaciones nativas de la nube (CNAPP) [1].' },
      { anio: '2024', hito: 'En noviembre la prensa informa de que explora su venta tras recibir interés comprador [12].' },
      { anio: '2025', hito: 'Lanza Enterprise TruRisk Management (ETM), que reúne la exposición de riesgo de sensores propios y de terceros, y TruConfirm, que valida si una vulnerabilidad es explotable [1].' },
      { anio: '2026', hito: 'Abril: la presentación de Claude Mythos y Project Glasswing de Anthropic hunde a las empresas de vulnerabilidades (Qualys −13 % en un día) [9, 10]; después entra en Glasswing como socio y consigue FedRAMP High para TotalCloud [4].' },
    ],
    confianza: 'Media',
  },
  negocio: { confianza: 'Alta' },
  sector: {
    tamano: '≈17.550 M USD en 2025 (seguridad y gestión de vulnerabilidades, mundial) [2]; P&S Intelligence da 17.600 M [3]',
    unidad_serie: 'millones de USD',
    serie: [{ anio: '2025', tamano: 17550 }, { anio: '2026e', tamano: 18690 }, { anio: '2027e', tamano: 19910 }, { anio: '2028e', tamano: 21200 }, { anio: '2029e', tamano: 22580 }, { anio: '2030e', tamano: 24070 }],
    tcac_historico_pct: null, tcac_previsto_pct: 6.5,
    cr5_pct: null, estructura: 'Fragmentada',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 3.8,
    competidores: [
      { nombre: 'Tenable Holdings', pais: 'EE. UU.', ticker: 'TENB', ingresos: 1040, cuota_pct: 5.9, margen_ebit_pct: null, comentario: 'Rival directo en vulnerabilidades (Nessus, Tenable One); más grande en ingresos y casi sin beneficio contable (EBITDA del 5,2 %) [5].' },
      { nombre: 'Rapid7', pais: 'EE. UU.', ticker: 'RPD', ingresos: 856, cuota_pct: null, margen_ebit_pct: 1.6, comentario: 'Vulnerabilidades y detección gestionada; crecimiento casi nulo y cotiza a 1,3 veces ventas: el rival que pierde cuota [6].' },
      { nombre: 'CrowdStrike', pais: 'EE. UU.', ticker: 'CRWD', ingresos: 5400, cuota_pct: null, margen_ebit_pct: -2.5, comentario: 'Gestión de exposición desde su agente de endpoint (Falcon Exposure Management): la amenaza de «gratis dentro de la suite» [7, 1].' },
      { nombre: 'Palo Alto Networks', pais: 'EE. UU.', ticker: 'PANW', ingresos: 11480, cuota_pct: null, margen_ebit_pct: 7.1, comentario: 'Cortex y Prisma Cloud (CNAPP) compiten con TotalCloud y con la consolidación de plataformas [8, 1].' },
      { nombre: 'Wiz (Google)', pais: 'EE. UU.', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Líder en seguridad de la nube (CNAPP); comprada por Google, gana terreno en el inventario de riesgos de la nube [1].' },
      { nombre: 'Microsoft (Defender Vulnerability Management)', pais: 'EE. UU.', ticker: 'MSFT', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Gestión de vulnerabilidades incluida en las licencias E5: presión de precio en los clientes medianos.' },
    ],
    confianza: 'Media',
  },
  esg: { calificaciones: [], confianza: 'Baja' },
  fuentes: fB,
  huecos: [
    { seccion: 'sector', campo: 'CR5 y cuota de mercado de los cinco primeros', tipo: 'Complemento', intentos: '1) MarketsandMarkets (página pública sin cuotas); 2) IDC Worldwide Device Vulnerability Management Market Shares (de pago); 3) Gartner (de pago) y prensa (sin cifra)', decision: 'Omitido' },
    { seccion: 'esg', campo: 'calificaciones ESG', tipo: 'Complemento', intentos: '1) 10-K y proxy (sin calificaciones); 2) MSCI ESG Ratings Corporate Search (requiere JavaScript); 3) Sustainalytics (sin acceso)', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Proxy statement 2026 (DEF 14A): consejo, remuneración de 2025, ratio salarial 456:1, participaciones', editor: 'Qualys, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-04-22', url: `${E8}/000114036126016101/ny20064597x1_def14a.htm` },
  { id: 2, titulo: 'Form 8-K: resultados de la junta del 10-jun-2026 (votos de consejeros, remuneración y plan de acciones)', editor: 'Qualys, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-06-11', url: `${E8}/000110784326000024/qlys-20260610.htm` },
  { id: 3, titulo: 'Form 4 de consejeros y directivos (15-oct-2025 a 15-oct-2026), herramientas/form4.mjs', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001107843&type=4' },
  { id: 4, titulo: 'Notas de resultados de febrero 2021-2026 con la guía anual inicial (8-K, anexo 99.1)', editor: 'Qualys, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-05', url: `${E8}/000110784326000004/qlys-2026205xex991.htm` },
  { id: 5, titulo: 'Form 10-K 2025 (resultados anuales reales 2021-2025)', editor: 'Qualys, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-20', url: `${E8}/000110784326000008/qlys-20251231.htm` },
  { id: 6, titulo: 'Qualys (QLYS) Q2 2026 Earnings Call Transcript (salidas del CISO y del director general de ETM; nombramientos)', editor: 'The Motley Fool (vía Webull)', tipo: 'Prensa', fecha: '2026-08-05', url: 'https://www.webull.com/news/15386993117914112' },
  { id: 7, titulo: 'SEC charges four companies with misleading cyber disclosures', editor: 'U.S. Securities and Exchange Commission', tipo: 'Primaria', fecha: '2024-10-22', url: 'https://www.sec.gov/newsroom/press-releases/2024-174' },
];
const cons = (nombre, cargo, tipo, desde, comisiones) => ({ nombre, cargo, tipo, desde, comisiones });
const C = {
  _estado: 'Completo. Proxy de 2026, 8-K de la junta y Form 4 de 12 meses.',
  directivos: {
    equipo: [
      { nombre: 'Sumedh S. Thakar', cargo: 'Presidente ejecutivo de la compañía (President) y consejero delegado', desde: '2021', participacion_pct: 0.44, trayectoria: 'En Qualys desde 2003 (ingeniero, director de producto de 2014 a 2021); consejero delegado desde abril de 2021. Con él los ingresos han pasado de 411 a 669 M USD (2021-2025) y el margen operativo GAAP del 21 % al 33 % [1, 5].' },
      { nombre: 'Joo Mi Kim', cargo: 'Directora financiera', desde: '2020', participacion_pct: 0.07, trayectoria: 'Directora financiera desde junio de 2020; antes directora financiera de Impact y anteriormente en Qualys. Ha llevado la política de recompra continuada y la disciplina de margen [1].' },
      { nombre: 'Bruce K. Posey', cargo: 'Director jurídico y secretario del consejo', desde: '2012', participacion_pct: 0.09, trayectoria: 'Director jurídico desde 2021 y secretario desde 2012 [1].' },
      { nombre: 'Shailesh Athalye', cargo: 'Director de producto y soluciones (ETM)', desde: '2026', participacion_pct: null, trayectoria: 'Unos 14 años en Qualys, cinco como vicepresidente sénior de producto; sustituye al director general de ETM que se marchó en 2026 [6].' },
    ],
    historial_guidance: [
      { anio: '2021', guia: 'Ingresos 399-402 M USD; BPA GAAP 1,39-1,44 [4]', real: 'Ingresos 411,2 M; BPA 1,77 [5]', cumplida: 'Sí' },
      { anio: '2022', guia: 'Ingresos 482-485 M USD; BPA GAAP 1,59-1,64 [4]', real: 'Ingresos 489,7 M; BPA 2,74 [5]', cumplida: 'Sí' },
      { anio: '2023', guia: 'Ingresos 553-557 M USD; BPA GAAP 2,54-2,62 [4]', real: 'Ingresos 554,5 M; BPA 4,03 [5]', cumplida: 'Sí' },
      { anio: '2024', guia: 'Ingresos 600-610 M USD; BPA GAAP 3,11-3,43 [4]', real: 'Ingresos 607,6 M; BPA 4,65 [5]', cumplida: 'Sí' },
      { anio: '2025', guia: 'Ingresos 645-657 M USD; BPA GAAP 3,62-4,02 [4]', real: 'Ingresos 669,1 M; BPA 5,44 [5]', cumplida: 'Sí' },
      { anio: '2026', guia: 'Ingresos 717-725 M USD; BPA GAAP 5,20-5,48 (febrero); subida a 732-738 M y 5,76-5,90 en agosto [4]', real: 'En curso: 1S26 357,8 M y BPA 2,91', cumplida: 'Parcial' },
    ],
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      cons('Jeffrey P. Hank', 'Presidente no ejecutivo del consejo', 'Independiente', '2010', 'Auditoría'),
      cons('Sumedh S. Thakar', 'Consejero delegado', 'Ejecutivo', '2021', null),
      cons('Kristi M. Rogers', 'Consejera', 'Independiente', '2013', null),
      cons('Wendy M. Pfeiffer', 'Consejera', 'Independiente', '2019', null),
      cons('John A. Zangardi', 'Consejero', 'Independiente', '2020', null),
      cons('Thomas P. Berquist', 'Consejero', 'Independiente', '2023', null),
      cons('Bradford L. Brooks', 'Consejero', 'Independiente', '2025', null),
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 91.5, voto_remuneracion_contra_pct: 8.3, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 15.95, fijo: 0.62, variable_corto: 0.72, variable_largo: 14.60, ratio_salario_medio: 456 },
    accionistas: [
      { nombre: 'BlackRock, Inc.', pct: 14.4, tipo: 'Institucional', variacion: 'Estable (13G)' },
      { nombre: 'The Vanguard Group', pct: 11.8, tipo: 'Institucional', variacion: 'Estable (13G)' },
      { nombre: 'Consejeros y directivos (9 personas)', pct: 0.72, tipo: 'Dirección', variacion: 'Baja por ventas de plan 10b5-1 (≈173.000 acciones en 12 meses)' },
    ],
    insiders: [
      { fecha: '2026-09-14', persona: 'Sumedh S. Thakar (consejero delegado)', operacion: 'Venta', acciones: 108700, importe: 14.62 },
      { fecha: '2026-09-02', persona: 'Joo Mi Kim (directora financiera)', operacion: 'Venta', acciones: 45095, importe: 6.29 },
      { fecha: '2026-09-21', persona: 'Bruce K. Posey (director jurídico)', operacion: 'Venta', acciones: 15169, importe: 2.06 },
      { fecha: '2026-08-20', persona: 'Wendy M. Pfeiffer (consejera)', operacion: 'Venta', acciones: 2000, importe: 0.28 },
      { fecha: '2026-09-02', persona: 'Thomas P. Berquist (consejero)', operacion: 'Venta', acciones: 1450, importe: 0.19 },
      { fecha: '2026-06-12', persona: 'Jeffrey P. Hank (presidente)', operacion: 'Venta', acciones: 940, importe: 0.10 },
    ],
    alertas: [
      'Ventas de la dirección por 23,5 M USD en 12 meses, todas con plan 10b5-1 y ninguna compra; el consejero delegado vendió ≈108.700 acciones, cerca de tres cuartas partes de las 142.682 que tenía en abril de 2026 [3, 1].',
      'Salida en 2026 del responsable de seguridad (CISO) y del director general de ETM, la línea que sostiene la tesis de crecimiento [6].',
      'Sanción de la SEC de octubre de 2024 (450.000 USD) por minimizar en sus informes el ataque a SolarWinds [7].',
      'Consejo escalonado (tres clases con mandatos de tres años): dificulta un cambio de control sin acuerdo del consejo [2].',
    ],
    confianza: 'Alta',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'votos de remuneración de 2024 y 2025', tipo: 'Complemento', intentos: '1) 8-K de la junta de 2026 (solo 2026); 2) lista de presentaciones de EDGAR (8-K de 2024-2025 no descargados por tiempo); 3) proxy 2026 (no resume votos anteriores)', decision: 'Omitido: se usa el voto de 2026' },
  ],
};

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de QLYS, SPY y CIBR (herramientas/bolsa.mjs), hasta el 14-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/QLYS/history' },
  { id: 2, titulo: 'Qualys, Inc.: Financial data, forecasts, estimates (consenso 2026-2028; EBITDA y EBIT ajustados, BPA GAAP)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://www.marketscreener.com/quote/stock/QUALYS-INC-11612572/finances/' },
  { id: 3, titulo: '10-Year Treasury Constant Maturity Rate (DGS10): 5,21 % el 13-oct-2026', editor: 'FRED, Federal Reserve Bank of St. Louis', tipo: 'Primaria', fecha: '2026-10-13', url: 'https://fred.stlouisfed.org/series/DGS10' },
  { id: 4, titulo: 'Implied ERP by month (ERPbymonth.xlsx): 4,20 % en octubre de 2026', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 5, titulo: 'Qualys: estadísticas (acciones 34,60 M, posición corta 9,57 % del flotante, caja neta 650 M USD)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/qlys/statistics/' },
  { id: 6, titulo: 'Estadísticas de Tenable, Rapid7, CrowdStrike, Palo Alto, Fortinet, Check Point y Okta (cierre del 14-oct-2026)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/tenb/statistics/' },
  { id: 7, titulo: 'Thoma Bravo to buy cybersecurity firm Darktrace for $5.3 billion', editor: 'Security Boulevard', tipo: 'Prensa', fecha: '2024-04-26', url: 'https://securityboulevard.com/2024/04/thoma-bravo-to-buy-cybersecurity-firm-darktrace-for-5-3-billion' },
  { id: 8, titulo: 'SailPoint, Tufin go private in run of cybersecurity acquisitions by PE firms (SailPoint a 16,0 veces ventas LTM)', editor: 'S&P Global Market Intelligence (451 Research)', tipo: 'Analistas', fecha: '2022-04', url: 'https://www.spglobal.com/market-intelligence/en/news-insights/articles/2022/4/sailpoint-tufin-go-private-in-run-of-cybersecurity-acquisitions-by-pe-firms-69703930' },
  { id: 9, titulo: 'Thoma Bravo acquires Proofpoint for approximately $12.3 billion', editor: 'PrivSource', tipo: 'Prensa', fecha: '2021-04', url: 'https://www.privsource.com/acquisitions/deal/thoma-bravo-acquires-proofpoint-for-approximately-12-3-billion-D8SWX5' },
  { id: 10, titulo: 'Qualys Announces Second Quarter 2026 Financial Results (guía 2026 y del 3T; próximos resultados)', editor: 'Qualys, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-04', url: `${E8}/000110784326000034/qlys-20260804xex991.htm` },
  { id: 11, titulo: 'QUALYS (QLYS) Earnings Date (3T26 previsto el 3-nov-2026)', editor: 'Unusual Whales', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://unusualwhales.com/stock/QLYS/earnings' },
  { id: 12, titulo: 'Qualys (QLYS) Stock Forecast (objetivo medio a 6 meses 174,5 USD; consenso Mantener)', editor: 'Traders Union', tipo: 'Analistas', fecha: '2026-10-08', url: 'https://tradersunion.com/currencies/forecast/qlys-usd/' },
];
const D = {
  _estado: 'Completo. Precio de bolsa.mjs: cierre del 14-oct (el del 15-oct no había cerrado). Comparables de Stock Analysis al cierre del 14-oct (PER adelantado en bases mezcladas: casi todas ajustado).',
  identificacion: {
    nombre: 'Qualys, Inc.', nombre_corto: 'Qualys', ticker: 'QLYS', isin: 'US74758T3032', mercado: 'Nasdaq Global Select', indice_referencia: 'S&P 500',
    pais: 'Estados Unidos', pais_iso: 'US', sector: 'Tecnologías de la información', industria: 'Software de sistemas (ciberseguridad)', sede: 'Foster City (California)', fundacion: '1999', empleados: 2625, web: 'https://www.qualys.com',
    precio: BOLSA.identificacion.precio, fecha_precio: BOLSA.identificacion.fecha_precio, acciones: 34.7, capitalizacion_publicada: 6560, free_float_pct: 99.2,
    max_52s: BOLSA.identificacion.max_52s, min_52s: BOLSA.identificacion.min_52s, volumen_medio_diario: `≈ ${BOLSA.volumen_3m.importe_dia_millones.toFixed(0)} M USD/día (3 meses)`, proximos_resultados: '2026-11-03',
  },
  consenso: {
    estimaciones: [
      { periodo: '2026e', ingresos: 735.1, ebitda: 334.7, ebit: 323.5, bpa: 5.81, dpa: 0, fuente: 'MarketScreener (22 analistas; EBITDA y EBIT ajustados, sin pagos en acciones; BPA GAAP) [2]' },
      { periodo: '2027e', ingresos: 795.5, ebitda: 362.7, ebit: 349.4, bpa: 6.48, dpa: 0, fuente: 'MarketScreener [2]' },
      { periodo: '2028e', ingresos: 857.3, ebitda: 395.8, ebit: 375.0, bpa: 6.59, dpa: 0, fuente: 'MarketScreener [2]' },
    ],
    recomendaciones: { n_analistas: 22, comprar: null, mantener: null, vender: null, po_medio: 181.03, po_min: null, po_max: null },
    base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: 10.8,
    confianza: 'Media',
  },
  bolsa: { ...BOLSA.bolsa, posicion_corta_pct: 9.57, confianza: 'Alta' },
  multiplos_historicos: {
    serie: ANIOS.map((y) => ({ anio: y, precio_cierre: BOLSA.cierres_ejercicio.find((c) => c.anio === y).precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: y === '2021' })),
    confianza: 'Alta',
  },
  comparables: {
    empresas: [
      { nombre: 'Tenable Holdings', ticker: 'TENB', pais: 'US', capitalizacion: 4200, ev_ventas: 4.14, ev_ebitda_ltm: 80.5, ev_ebitda_ntm: null, per_ntm: 18.6, crecimiento_pct: null, margen_ebitda_pct: 5.2, roic_pct: 5.8, dn_ebitda: 2.3, fcf_yield_pct: 6.3 },
      { nombre: 'Rapid7', ticker: 'RPD', pais: 'US', capitalizacion: 834, ev_ventas: 1.28, ev_ebitda_ltm: 18.8, ev_ebitda_ntm: null, per_ntm: 6.7, crecimiento_pct: null, margen_ebitda_pct: 6.8, roic_pct: 2.6, dn_ebitda: 4.5, fcf_yield_pct: 17.4 },
      { nombre: 'CrowdStrike', ticker: 'CRWD', pais: 'US', capitalizacion: 255800, ev_ventas: 46.6, ev_ebitda_ltm: null, ev_ebitda_ntm: null, per_ntm: 176.5, crecimiento_pct: null, margen_ebitda_pct: 2.0, roic_pct: -14.1, dn_ebitda: null, fcf_yield_pct: 0.6 },
      { nombre: 'Palo Alto Networks', ticker: 'PANW', pais: 'US', capitalizacion: 306780, ev_ventas: 26.7, ev_ebitda_ltm: 196.3, ev_ebitda_ntm: null, per_ntm: 89.5, crecimiento_pct: null, margen_ebitda_pct: 13.6, roic_pct: 1.7, dn_ebitda: -0.3, fcf_yield_pct: 1.3 },
      { nombre: 'Fortinet', ticker: 'FTNT', pais: 'US', capitalizacion: 135040, ev_ventas: 17.5, ev_ebitda_ltm: 50.7, ev_ebitda_ntm: null, per_ntm: 52.4, crecimiento_pct: null, margen_ebitda_pct: 34.5, roic_pct: 57.9, dn_ebitda: -1.35, fcf_yield_pct: 2.3 },
      { nombre: 'Check Point Software', ticker: 'CHKP', pais: 'IL', capitalizacion: 13690, ev_ventas: 4.15, ev_ebitda_ltm: 13.5, ev_ebitda_ntm: null, per_ntm: 12.4, crecimiento_pct: null, margen_ebitda_pct: 30.7, roic_pct: 36.0, dn_ebitda: -2.6, fcf_yield_pct: 8.0 },
      { nombre: 'Okta', ticker: 'OKTA', pais: 'US', capitalizacion: 37050, ev_ventas: 11.3, ev_ebitda_ltm: 108.4, ev_ebitda_ntm: null, per_ntm: 52.0, crecimiento_pct: null, margen_ebitda_pct: 10.5, roic_pct: 4.6, dn_ebitda: -7.0, fcf_yield_pct: 2.6 },
    ],
    confianza: 'Baja',
  },
  transacciones: {
    operaciones: [
      { fecha: '2025-03', objetivo: 'Wiz', comprador: 'Alphabet (Google)', ev: 32000, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: true, comentario: 'Seguridad de la nube; sin beneficios y creciendo a más del 50 %: no comparable en múltiplo, sí en interés estratégico por la seguridad de la nube.' },
      { fecha: '2024-04', objetivo: 'Darktrace', comprador: 'Thoma Bravo', ev: 5300, ev_ventas: null, ev_ebitda: null, prima_pct: 44, excluir: false, comentario: '7,75 USD por acción; prima del 44 % sobre la media de tres meses [7].' },
      { fecha: '2022-04', objetivo: 'SailPoint', comprador: 'Thoma Bravo', ev: 6900, ev_ventas: 16.0, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '16,0 veces las ventas LTM según 451 Research; media del sector en 2022, 8,8 veces [8].' },
      { fecha: '2021-04', objetivo: 'Proofpoint', comprador: 'Thoma Bravo', ev: 12300, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '176 USD por acción en efectivo [9].' },
    ],
    confianza: 'Baja',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'transacciones', campo: 'múltiplos EV/ventas y EV/EBITDA de Darktrace, Proofpoint y Wiz', tipo: 'Complemento', intentos: '1) Notas de prensa de las operaciones (solo valor y precio por acción); 2) S&P Global/451 Research (solo SailPoint); 3) búsqueda de bases de operaciones (CapIQ, PitchBook: de pago)', decision: 'Omitido; peso de transacciones 0' },
    { seccion: 'consenso', campo: 'reparto de recomendaciones y objetivos mínimo y máximo', tipo: 'Complemento', intentos: '1) MarketScreener (solo media de 181,03 USD y 22 analistas); 2) Traders Union (objetivo medio 174,5 USD, Mantener); 3) Investing.com (requiere JavaScript)', decision: 'Omitido' },
    { seccion: 'comparables', campo: 'EV/EBITDA NTM y crecimiento esperado de los comparables', tipo: 'Complemento', intentos: '1) Stock Analysis (solo LTM y PER adelantado); 2) MarketScreener (no abre las páginas de los comparables sin sesión); 3) informes growth del repositorio (CrowdStrike, Zscaler: otra fecha y otra base)', decision: 'Omitido; se usa sobre todo el PER' },
  ],
};

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Qualys, Inc.: noticias y análisis (titulares abril-octubre de 2026, RSS)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-09-15', url: 'https://seekingalpha.com/api/sa/combined/QLYS.xml' },
  { id: 2, titulo: 'Stream $QLYS (30 mensajes, 5-ago a 11-oct-2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-11', url: 'https://api.stocktwits.com/api/2/streams/symbol/QLYS.json' },
  { id: 3, titulo: 'Qualys (NASDAQ:QLYS) rallies after beat, raised guidance and AI scanning push', editor: 'Kalkine Media', tipo: 'Foros y redes', fecha: '2026-08', url: 'https://kalkinemedia.com/us/stocks/midcap/qualys-nasdaqqlys-rallies-after-beat-raised-guidance-and-ai-scanning-push' },
  { id: 4, titulo: 'AI fears led investors to undervalue cybersecurity firm (Investor Essentials Daily)', editor: 'Valens Research', tipo: 'Foros y redes', fecha: '2026-06', url: 'https://www.valens-research.com/investor-essentials-daily/ai-fears-led-investors-undervalue-cybersecurity-firm/' },
  { id: 5, titulo: 'What comes next for Qualys after the launch of «Agent Val» exploit automation?', editor: 'TIKR', tipo: 'Foros y redes', fecha: '2026-09', url: 'https://www.tikr.com/blog/what-comes-next-for-qualys-after-the-launch-of-agent-val-exploit-automation' },
];
const E = {
  _estado: 'Completo. Reddit da 403; se leen Seeking Alpha (titulares y artículos de autores), Stocktwits y comentarios de mercado.',
  sentimiento: {
    tono: 'Positivo', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Seeking Alpha (artículos de autores)', fecha: '2026-09', n_comentarios: 6, tono: 'Dividido', resumen: 'De «vientos de cola de la IA y valoración razonable» (junio-julio) a «gran trimestre, mejor negocio, precio equivocado» (rebaja de agosto) y «la cartera de oportunidades justificaría la prima si acelera» (septiembre) [1].' },
      { plataforma: 'Seeking Alpha (noticias de analistas)', fecha: '2026-08', n_comentarios: 10, tono: 'Positivo', resumen: 'William Blair rebaja a Qualys, Tenable y Rapid7 por la IA en mayo; Scotiabank y JPMorgan suben recomendación en julio porque los modelos de frontera multiplican las vulnerabilidades; tras el 2T, «gana cuota» [1].' },
      { plataforma: 'Stocktwits', fecha: '2026-10', n_comentarios: 30, tono: 'Positivo', resumen: 'Entusiasmo de corto plazo (máximos de 200 USD, «mi mejor compra del año», objetivos de 300); pocos bajistas, que hablan de subida inflada por la moda de la IA [2].' },
      { plataforma: 'Comentarios de mercado (Kalkine, TIKR, Valens)', fecha: '2026-09', n_comentarios: 4, tono: 'Positivo', resumen: 'La tesis que circula: cuanto más rápido encuentre la IA vulnerabilidades, más vale priorizar y parchear; Agent Val y TruConfirm como prueba de que Qualys se adapta [3, 4, 5].' },
    ],
    confianza: 'Media',
  },
  fuentes: fE,
  huecos: [],
};

guarda('A', A); guarda('B', B); guarda('C', C); guarda('D', D); guarda('E', E);
console.log('Notas A-E escritas');
