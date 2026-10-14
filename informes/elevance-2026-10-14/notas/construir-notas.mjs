// Construye las notas A-E de Elevance Health (corte 2026-10-14) desde la nube: solo WebSearch.
// Las cifras salen de los resultados de búsqueda (comunicados 8-K, 10-K citados, agregadores) con su URL.
// Sector, competencia y comparables se reutilizan de la carpeta de UnitedHealth (12-oct-2026), mismo sector.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const aqui = path.dirname(fileURLToPath(import.meta.url));
const unh = (l) => JSON.parse(fs.readFileSync(path.join(aqui, '../../unitedhealth-2026-10-12/notas', l + '.json'), 'utf8'));
const w = (l, o) => fs.writeFileSync(path.join(aqui, l + '.json'), JSON.stringify(o, null, 2));

// ---------------- A. Cuentas ----------------
const fA = [
  [1, 'Elevance Health, informe anual 10-K 2025', 'Elevance Health (SEC)', 'Primaria', '2026-02-06', 'https://www.sec.gov/Archives/edgar/data/1156039/000115603926000013/elv-20251231.htm'],
  [2, 'Elevance Health Reports Fourth Quarter and Full Year 2025 Results (8-K, exhibit 99.1)', 'Elevance Health (SEC)', 'Primaria', '2026-01-28', 'https://www.sec.gov/Archives/edgar/data/1156039/000115603926000006/a4q2025elvearningsrelease.htm'],
  [3, 'Elevance Health Reports Second Quarter 2026 Results, Raises Full Year Guidance (8-K, exhibit 99.1)', 'Elevance Health (SEC)', 'Primaria', '2026-07-15', 'https://www.sec.gov/Archives/edgar/data/0001156039/000115603926000058/a2q2026elvearningsrelease.htm'],
  [4, 'Elevance Health Reports First Quarter 2026 Results; Raises Full-Year Guidance (8-K, exhibit 99.1)', 'Elevance Health (SEC)', 'Primaria', '2026-04-22', 'https://www.sec.gov/Archives/edgar/data/0001156039/000115603926000039/a1q2026elvearningsrelease.htm'],
  [5, 'Elevance Health (ELV): income statement', 'Stock Analysis', 'Datos de mercado', '2026-10', 'https://stockanalysis.com/stocks/elv/financials/income-statement/'],
  [6, 'Elevance Health (ELV): cash flow statement', 'Stock Analysis', 'Datos de mercado', '2026-10', 'https://stockanalysis.com/stocks/ELV/financials/cash-flow-statement/'],
  [7, 'Elevance Health (ELV): balance sheet', 'Stock Analysis', 'Datos de mercado', '2026-10', 'https://stockanalysis.com/stocks/ELV/financials/balance-sheet/'],
  [8, 'Elevance Health: datos XBRL de las cuentas (pretax income, interest expense)', 'EDGAR Tools', 'Datos de mercado', '2026-10', 'https://app.edgar.tools/companies/ELV'],
  [9, 'Elevance Health Inc (NYSE:ELV): depreciación anual', 'Kalkine Media', 'Datos de mercado', '2026-10', 'https://kalkinemedia.com/ca/companies/nyse-elv'],
  [10, 'ELV beats Q1 earnings estimates on rising net investment income', 'Zacks', 'Prensa', '2026-04-22', 'https://www.zacks.com/stock/news/2905868/elv-beats-q1-earnings-estimates-on-rising-net-investment-income'],
  [11, 'Elevance Health (ELV) up 6.8% since last earnings report (balance del 2T26)', 'Zacks / Eastern Progress', 'Prensa', '2026-08', 'https://www.easternprogress.com/elevance-health-elv-up-6-8-since-last-earnings-report-can-it-continue/article_d774124b-ba20-53cc-9499-8cc3118d71c7.html'],
  [12, 'Elevance reports $1.5B profit in Q2, membership dip', "Becker's Payer Issues", 'Prensa', '2026-07-15', 'https://www.beckerspayer.com/?p=26606'],
  [13, 'Elevance Health (ELV): cash flow (recompras y dividendos)', 'Finboard', 'Datos de mercado', '2026-10', 'https://finboard.net/companies/ELV/cash-flow'],
  [14, 'Elevance Health (ELV), informe de Sure Dividend de enero de 2024 (BPA ajustado de 2023)', 'Sure Dividend', 'Analistas', '2024-01-25', 'https://www.suredividend.com/wp-content/uploads/2024/01/ELV-2024-01-25.pdf'],
  [15, 'Elevance Health, resultados del 4T22 (8-K, exhibit 99.1)', 'Elevance Health (SEC)', 'Primaria', '2023-01-25', 'https://www.sec.gov/Archives/edgar/data/1156039/000119312523014676/d418386dex991.htm'],
  [16, 'Anthem / Elevance Health: financials 2018-2020', 'Stockalarm', 'Datos de mercado', '2026-10', 'https://pro.stockalarm.io/quote/ANTM/financials'],
  [17, 'Elevance preparing to exit several Medicaid states', 'Healthcare Innovation', 'Prensa', '2026-07', 'https://www.hcinnovationgroup.com/policy-value-based-care/health-insurance/news/55391795/elevance-preparing-to-exit-several-medicaid-states'],
  [18, 'Elevance Health (ELV) income statement TTM', 'OpenCapital', 'Datos de mercado', '2026-10', 'https://www.opencapital.sh/stocks/elv/metrics/income-statement?period=ttm'],
  [19, 'Elevance Health, informe trimestral 10-Q del 3T25', 'Elevance Health', 'Primaria', '2025-10-22', 'https://s202.q4cdn.com/665319960/files/doc_financials/2025/q3/3Q2025ELV10Q.pdf'],
].map(([id, titulo, editor, tipo, fecha, url]) => ({ id, titulo, editor, tipo, fecha, url }));

// EBIT = beneficio antes de impuestos + gastos por intereses (incluye el rendimiento de la cartera de inversiones de las filiales reguladas).
// Amortizaciones: depreciación y amortización totales de Kalkine (1.302 M en 2021 y 1.546 M en 2025); 2022-2024 interpoladas (estimación propia).
const c = (periodo, ingresos, bai, intereses, da, impuestos, bn, bpa, dpa) => {
  const ebit = bai + intereses;
  return { periodo, ingresos, coste_ventas: null, gastos_generales: null, ebitda: ebit + da, amortizaciones: da, ebit, resultado_financiero: -intereses, bai, impuestos, minoritarios: Math.round((bai - impuestos - bn) * 10) / 10, beneficio_neto: bn, gastos_financieros: intereses, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa, dpa, dpa_extraordinario: 0, acciones_diluidas: Math.round((bn / bpa) * 10) / 10 };
};
const cuenta = [
  c('2021', 136943, 7995, 798, 1302, 1846, 6104, 24.73, 4.52),
  c('2022', 155723, 7600, 851, 1363, 1712, 5894, 24.81, 5.12),
  c('2023', 170209, 7715, 1030, 1424, 1724, 5987, 25.22, 5.84),
  c('2024', 175204, 7904, 1185, 1485, 1933, 5980, 25.68, 6.52),
  c('2025', 197600, 6710, 1402, 1546, 1049, 5662, 25.21, 6.84),
];

const b = (periodo, activo_total, activo_corriente, pasivo_corriente, patrimonio_neto, fondo_comercio, intangibles, caja, deuda_financiera) => ({
  periodo, activo_total, activo_corriente, pasivo_corriente, pasivo_total: activo_total - patrimonio_neto, fondo_comercio, intangibles,
  inmovilizado_material: null, existencias: null, clientes: null, proveedores: null, activos_contrato: null, pasivos_contrato: null,
  caja, deuda_financiera, arrendamientos: 0, patrimonio_neto, minoritarios: 0, reservas: null,
});

const A = {
  _estado: 'completo (nube, solo WebSearch)',
  negocio: {
    segmentos: [],
    kpis: [
      { kpi: 'Ratio de prestaciones (benefit expense ratio, año)', valor_anterior: '88,5 % (2024)', valor_actual: '90,0 % (2025)', variacion: '+150 pb', comentario: 'Coste médico por encima de lo previsto en ACA, Medicaid y Medicare [1].' },
      { kpi: 'Ratio de prestaciones (trimestre)', valor_anterior: '86,8 % (1T26)', valor_actual: '89,7 % (2T26)', variacion: '+80 pb interanual en el 2T', comentario: 'Coste médico elevado en los negocios públicos; el ACA compensa en parte [3, 10].' },
      { kpi: 'Ratio de gastos operativos ajustado', valor_anterior: '10,6 % (2025)', valor_actual: '11,0 % (2T26)', variacion: '+100 pb interanual', comentario: 'Inversiones aceleradas en capacidades [3].' },
      { kpi: 'Días de siniestros pendientes de pago', valor_anterior: 'n. d.', valor_actual: '45,4 días (30-jun-26)', variacion: null, comentario: 'Indicador de la prudencia de las reservas [3].' },
      { kpi: 'Afiliados médicos', valor_anterior: '45,7 M (2024, aprox.)', valor_actual: '45,2 M (2025)', variacion: '≈ −1 %', comentario: 'Caen Medicare Advantage, Medicaid y grupo con riesgo; sube el ACA hasta junio de 2026 [12, 4].' },
    ],
  },
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 200420, ebitda: null, ebit: null, beneficio_neto: 5282, bpa: 23.58, dpa: 6.86, dpa_extraordinario: 0, fcf: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [],
    confianza: 'Media',
  },
  trimestres: {
    items: [
      { periodo: '1T25', ingresos: 48800, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 11.97, vs_consenso: null },
      { periodo: '2T25', ingresos: 49400, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 8.84, vs_consenso: 'Inferior' },
      { periodo: '3T25', ingresos: 50100, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 6.03, vs_consenso: null },
      { periodo: '4T25', ingresos: 49300, crecimiento_pct: 10.0, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 3.33, vs_consenso: 'En línea' },
      { periodo: '1T26', ingresos: 49500, crecimiento_pct: 1.5, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 12.58, vs_consenso: 'Superior' },
      { periodo: '2T26', ingresos: 49800, crecimiento_pct: 0.8, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 7.45, vs_consenso: 'Superior' },
    ],
    confianza: 'Media',
  },
  balance: {
    historico: [
      b('2021', 97460, 51122, 34885, 36060, 24228, 10615, 4880, 23330),
      b('2022', 102752, 55617, 39696, 36307, 24383, 10315, 7387, 24350),
      b('2023', 108928, 60029, 41791, 39306, 25317, 10273, 6526, 25270),
      b('2024', 116889, 58942, 40581, 41315, 28277, 12094, 8288, 31490),
      b('2025', 121494, 63001, 41035, 43882, 28344, 11200, 9491, 32046),
    ],
    vencimientos: [],
    liquidez: 'Caja y equivalentes consolidados de 9.491 M a 31-dic-2025, pero solo ≈ 2.600 M de caja e inversiones en la matriz (no regulada); ≈ 2.100 M a 30-jun-2026 [2, 3].',
    rating: null, coste_deuda_pct: 4.9, vida_media_anios: null,
    confianza: 'Media',
  },
  flujos: {
    historico: [
      { periodo: '2021', flujo_operativo: 8364, capex: 1087, pagos_arrendamientos: 0, adquisiciones: null, desinversiones: 0, dividendos: 1104, recompras: 1900, emision_acciones: 0, intereses_en_financiacion: 0 },
      { periodo: '2022', flujo_operativo: 8399, capex: 1152, pagos_arrendamientos: 0, adquisiciones: null, desinversiones: 0, dividendos: 1229, recompras: 2316, emision_acciones: 0, intereses_en_financiacion: 0 },
      { periodo: '2023', flujo_operativo: 8061, capex: 1296, pagos_arrendamientos: 0, adquisiciones: null, desinversiones: 0, dividendos: 1386, recompras: 2680, emision_acciones: 0, intereses_en_financiacion: 0 },
      { periodo: '2024', flujo_operativo: 5808, capex: 1256, pagos_arrendamientos: 0, adquisiciones: null, desinversiones: 0, dividendos: 1508, recompras: 2900, emision_acciones: 0, intereses_en_financiacion: 0 },
      { periodo: '2025', flujo_operativo: 4290, capex: 1116, pagos_arrendamientos: 0, adquisiciones: null, desinversiones: 0, dividendos: 1529, recompras: 2605, emision_acciones: 0, intereses_en_financiacion: 0 },
    ],
    confianza: 'Media',
  },
  calidad: { auditor: 'Ernst & Young LLP', anios_auditor: null, opinion: 'Favorable', confianza: 'Media' },
  fuentes: fA,
  huecos: [
    { seccion: 'negocio', campo: 'segmentos (ingresos y resultado por segmento 2021-2025)', tipo: 'Núcleo', intentos: '1) 10-K 2025 (sec.gov) no accesible desde la nube; 2) búsqueda de la nota de segmentos en prensa y agregadores; 3) comunicados trimestrales: solo cifras del grupo', decision: 'Omitido' },
    { seccion: 'balance', campo: 'vencimientos de la deuda', tipo: 'Complemento', intentos: '1) nota de deuda del 10-K no accesible; 2) búsqueda en prensa; 3) agregadores: sin calendario', decision: 'Omitido' },
    { seccion: 'flujos', campo: 'adquisiciones (salidas de caja anuales)', tipo: 'Complemento', intentos: '1) estado de flujos del 10-K no accesible; 2) Stock Analysis y Finboard citados sin esa línea en la búsqueda; 3) prensa: importes sueltos, no la línea anual', decision: 'Omitido' },
  ],
};
w('A', A);

// ---------------- B. Sector y competencia (reutiliza UnitedHealth, 12-oct) ----------------
const Bu = unh('B');
const B = {
  _estado: 'completo: sector y fuentes de la carpeta de UnitedHealth (12-oct-2026) con la posición de Elevance',
  historia: {
    resumen: 'Elevance Health nace en 2004 de la fusión de Anthem (Indiana) y WellPoint (California), las dos mayores licenciatarias de Blue Cross Blue Shield. Como WellPoint compró Amerigroup en 2012 (Medicaid) y volvió a llamarse Anthem en 2014; su intento de comprar Cigna (2015) lo bloquearon los tribunales en 2017. Desde 2017, con Gail Boudreaux de consejera delegada, ha añadido servicios: gestor de farmacia propio (IngenioRx, hoy CarelonRx, desde 2020), Beacon Health Options (salud conductual, 2020), MMM de Puerto Rico (2021), BioPlus (2023), Paragon y CareBridge (2024-2025). En 2022 cambió el nombre a Elevance Health y agrupó los servicios en Carelon [7].',
    hitos: [
      { anio: '2004', hito: 'Fusión de Anthem y WellPoint.' },
      { anio: '2012', hito: 'Compra de Amerigroup: entrada en Medicaid gestionado.' },
      { anio: '2017', hito: 'Los tribunales bloquean la compra de Cigna; Gail Boudreaux, consejera delegada.' },
      { anio: '2020', hito: 'Lanza su propio gestor de farmacia (IngenioRx, hoy CarelonRx) y compra Beacon Health Options.' },
      { anio: '2022', hito: 'Cambia el nombre a Elevance Health; los servicios pasan a Carelon.' },
      { anio: '2024', hito: 'Retira la compra de Blue Cross Blue Shield de Luisiana; compra CareBridge y Paragon.' },
      { anio: '2025', hito: 'Ratio de prestaciones del 90,0 % y recorte de la guía; BPA ajustado de 30,29 USD frente a 33,14 en 2023.' },
      { anio: '2026', hito: 'Pago de 342 M a CMS por el caso de Medicare Advantage; salida de mercados de Medicaid y guía subida a ≥ 27 USD .' },
    ],
    confianza: 'Media',
  },
  sector: { ...Bu.sector, confianza: 'Media' },
  competencia: {
    cuota_pct: 12,
    posicion: '2.º en seguro médico comercial en EE. UU. (12 % de los afiliados en 2024, detrás de UnitedHealth con el 16 %) [17]; ≈ 5 % de Medicare Advantage [6]; uno de los mayores en Medicaid gestionado y en el ACA. Sus ingresos de 2025 equivalen al 3,5 % del gasto sanitario nacional estimado (estimación propia: 197.600 M sobre 5,66 billones) [5, 7].',
    competidores: [
      { nombre: 'UnitedHealth Group', pais: 'EE. UU.', ticker: 'UNH', ingresos: 447567, cuota_pct: 16, margen_ebit_pct: 4.2, comentario: '1.º en seguro comercial (16 %) y en Medicare Advantage (26 %), con Optum (servicios, tecnología y farmacia). Ratio de siniestralidad del 89,1 % en 2025 [1, 6, 17].' },
      ...Bu.competencia.competidores.filter((x) => x.ticker !== 'ELV'),
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 2, evidencia: 'La red de proveedores de Blue Cross Blue Shield (descuentos negociados en 14 estados) atrae a empresas, pero el afiliado no gana valor con más afiliados [7].' },
        { fuente: 'Costes de cambio', puntuacion: 2, evidencia: 'Los contratos de seguro se renuevan cada año; el grupo de empresa (ASO) es más estable que Medicare Advantage o Medicaid, que se licitan o se eligen cada año [7].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 4, evidencia: 'Licencia exclusiva de la marca Blue Cross Blue Shield en 14 estados: es la principal barrera y explica el 12 % de cuota en seguro comercial [7, 17].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Ratio de gastos operativos del 10,6 % en 2025, el más bajo entre las grandes (UnitedHealth 13,3 %, Humana 12,0 %) [1, 7, 10].' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: '45,2 M de afiliados médicos: escala local para negociar con hospitales, pero menor que UnitedHealth (49,8 M) y sin una Optum [7].' },
      ],
    },
    amenazas: 'La regulación es la amenaza principal: Medicaid (recortes de la ley OBBBA y redeterminaciones), ajuste de riesgo de Medicare Advantage (V28 y fuentes de diagnóstico) y el fin de los subsidios reforzados del ACA reducen afiliados e ingresos por miembro justo en los negocios públicos donde Elevance perdió margen en 2025 [13, 14]. En comercial, la presión viene de los hospitales (consolidación) y de los fármacos GLP-1 y de especialidad. Es una erosión de margen, no de la franquicia Blue.',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Lo material son el acceso y el coste de la atención (denegaciones, autorizaciones previas) y la privacidad de los datos: Elevance sufrió en 2015 el mayor robo de datos sanitarios de EE. UU. (78,8 M de personas) y en 2026 pagó 342 M a CMS para cerrar un caso de Medicare Advantage.',
    controversias: 'Pago de 342 M a CMS en el 2T26, que evitó sanciones en Medicare Advantage. Litigios por denegaciones y por la codificación de riesgo comunes al sector (estimación propia, sin cuantificar).',
    confianza: 'Baja',
  },
  fuentes: Bu.fuentes.filter((f) => ![18, 19, 20, 21, 22, 23, 25, 26].includes(f.id)),
  huecos: [{ seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) web de Sustainalytics no accesible; 2) búsqueda MSCI ESG Elevance; 3) informe de sostenibilidad no accesible', decision: 'Omitido' }],
};
w('B', B);

// ---------------- C. Equipo y gobierno ----------------
const fC = [
  [1, 'Elevance Health, proxy statement (DEF 14A) 2026', 'Elevance Health (SEC)', 'Primaria', '2026-03-26', 'https://www.sec.gov/Archives/edgar/data/1156039/000115603926000031/elv-20260326.htm'],
  [2, "Elevance Health's 5 highest-paid executives in 2025", "Becker's Payer Issues", 'Prensa', '2026-04', 'https://www.beckerspayer.com/workforce/elevance-healths-5-highest-paid-executives-in-2025'],
  [3, 'Elevance Health: CEO kauft Aktien für rund 1 Mio. Dollar', 'Goldesel', 'Prensa', '2026', 'https://goldesel.de/aktien/news/elevance-health-ceo-kauft-aktien-fur-rund-1-mio-dollar-kurs-bleibt-nach-guidance-delle-unter-druck'],
  [4, 'Elevance Health Reports Fourth Quarter and Full Year 2025 Results (8-K)', 'Elevance Health (SEC)', 'Primaria', '2026-01-28', 'https://www.sec.gov/Archives/edgar/data/1156039/000115603926000006/a4q2025elvearningsrelease.htm'],
  [5, 'Elevance Health Reports Second Quarter 2026 Results (8-K)', 'Elevance Health (SEC)', 'Primaria', '2026-07-15', 'https://www.sec.gov/Archives/edgar/data/0001156039/000115603926000058/a2q2026elvearningsrelease.htm'],
  [6, 'Elevance Health, informe de Sure Dividend de enero de 2024 (guía 2024 > 37,10 USD)', 'Sure Dividend', 'Analistas', '2024-01-25', 'https://www.suredividend.com/wp-content/uploads/2024/01/ELV-2024-01-25.pdf'],
  [7, 'Elevance Health stock tumbles 12% on Q3 earnings miss (2024)', 'Investing.com', 'Prensa', '2024-10-17', 'https://investing.com/news/stock-market-news/elevance-health-stock-tumbles-12-on-q3-earnings-miss-93CH-3667964'],
  [8, 'Health insurance stocks slide after Elevance highlights margin pressures', 'Finviz / Reuters', 'Prensa', '2025-07', 'https://finviz.com/news/368594/health-insurance-stocks-slide-after-elevance-highlights-margin-pressures-elv'],
].map(([id, titulo, editor, tipo, fecha, url]) => ({ id, titulo, editor, tipo, fecha, url }));
const C = {
  _estado: 'parcial (proxy no legible desde la nube; datos de prensa)',
  directivos: {
    equipo: [
      { nombre: 'Gail K. Boudreaux', cargo: 'Presidenta y consejera delegada', desde: '2017', participacion_pct: null, trayectoria: 'Venía de dirigir UnitedHealthcare (2008-2014). Con ella el BPA ajustado pasó de 15,87 USD (2018) a 33,14 (2023) y la empresa entró en farmacia y servicios (Carelon); en 2024-2025 incumplió dos guías seguidas [6].' },
      { nombre: 'Mark Kaye', cargo: 'Vicepresidente ejecutivo y director financiero', desde: '2023', participacion_pct: null, trayectoria: 'Antes director financiero de Moody’s. Remuneración de ≈ 7,09 M USD en 2025 [2].' },
    ],
    historial_guidance: [
      { anio: '2023', guia: 'BPA ajustado > 32,60 USD', real: '33,14 USD', cumplida: 'Sí' },
      { anio: '2024', guia: 'BPA ajustado > 37,10 USD (enero)', real: '≈ 33,0 USD (recortada en octubre)', cumplida: 'No' },
      { anio: '2025', guia: 'BPA ajustado ≈ 34-34,50 USD (enero)', real: '30,29 USD', cumplida: 'No' },
      { anio: '2026', guia: 'BPA ajustado ≥ 25,50 USD (enero), subida a ≥ 26,75 (abril) y ≥ 27,00 (julio)', real: 'En curso', cumplida: 'Parcial' },
    ],
    confianza: 'Baja',
  },
  gobierno: {
    consejo: [{ nombre: 'Gail K. Boudreaux', cargo: 'Consejera delegada', tipo: 'Ejecutivo', desde: '2017', comisiones: null }],
    presidente_ceo_separados: null, presidente_ejecutivo: null, consejero_coordinador: null, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: null, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 22.58, fijo: 1.6, variable_corto: 3.38, variable_largo: 17.6, ratio_salario_medio: null },
    accionistas: [],
    insiders: [],
    alertas: [
      'Pago de 342 M a CMS en el 2T26 para cerrar un expediente de Medicare Advantage [5].',
      'Dos guías anuales incumplidas seguidas (2024 y 2025) [6, 7, 8].',
      'Compra de acciones de la consejera delegada por ≈ 1 M USD tras la guía de 2026 (señal positiva) [3].',
    ],
    confianza: 'Baja',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'consejo completo, independencia y comisiones', tipo: 'Núcleo', intentos: '1) proxy DEF 14A 2026 en sec.gov (no accesible desde la nube); 2) PDF del proxy en q4cdn (no accesible); 3) búsqueda de prensa: sin la lista', decision: 'Omitido' },
    { seccion: 'gobierno', campo: 'voto de remuneración y accionistas significativos', tipo: 'Complemento', intentos: '1) 8-K de la junta de mayo de 2026; 2) proxy; 3) prensa: sin el resultado del voto', decision: 'Omitido' },
  ],
};
w('C', C);

// ---------------- D. Mercado y valoración ----------------
const Du = unh('D');
const fD = [
  [1, 'Elevance Health (ELV) stock price & overview (cierre del 13-oct-2026)', 'Stock Analysis', 'Datos de mercado', '2026-10-13', 'https://stockanalysis.com/stocks/elv/'],
  [2, 'Elevance Health (ELV) stock forecast & analyst price targets', 'Stock Analysis (S&P Global)', 'Analistas', '2026-10-13', 'https://stockanalysis.com/stocks/elv/forecast/'],
  [3, 'Elevance Health (ELV) price target and analyst ratings', 'MarketBeat', 'Analistas', '2026-10', 'https://www.marketbeat.com/stocks/NASDAQ/ELV/forecast/'],
  [4, 'FY2026 EPS estimates for Elevance Health boosted by analyst (Zacks 2027-2028)', 'MarketBeat', 'Analistas', '2026-07-29', 'https://www.marketbeat.com/instant-alerts/fy2026-eps-estimates-for-elevance-health-boosted-by-analyst-2026-07-29/'],
  [5, "Elevance Health's Q2 2026 earnings: what to expect", 'Barchart', 'Analistas', '2026-07', 'https://www.barchart.com/story/news/12224/elevance-health-s-q2-2026-earnings-what-to-expect'],
  [6, 'ELV stock info (2-oct-2026, rango de 52 semanas)', 'Trade Ideas', 'Datos de mercado', '2026-10-02', 'https://www.trade-ideas.com/stock-info/ELV/'],
  [7, 'Elevance Health (ELV) set to announce quarterly earnings on Wednesday', 'Defense World', 'Prensa', '2026-10-14', 'https://www.defenseworld.net/2026/10/14/elevance-health-elv-set-to-announce-quarterly-earnings-on-wednesday.html'],
  [8, 'Elevance Health conference call Q3 2026 results', 'BioPharmaWatch', 'Prensa', '2026-10-05', 'https://www.biopharmawatch.com/news/ELV/elevance-health-conference-call-q3-2026-results'],
  [9, 'Elevance Health: 24 year stock price history', 'Macrotrends', 'Datos de mercado', '2026-10', 'https://macrotrends.net/stocks/charts/ELV/elevance-health/stock-price-history'],
  [10, 'Elevance Health stock analysis: guidance raised to $27, street high at $498', 'TIKR', 'Analistas', '2026-07', 'https://www.tikr.com/blog/elevance-health-stock-analysis-guidance-raised-to-27-street-high-at-498-tikr-target-at-534'],
  [11, 'Elevance Health Inc. (ELV) stock forecast', 'Tickflow', 'Analistas', '2026-07-31', 'https://tickflow.io/stock/ELV/forecast'],
  [12, 'Elevance Health Inc: sentiment (posición corta)', 'Benzinga', 'Datos de mercado', '2026-08', 'https://www.benzinga.com/quote/ELV/sentiment'],
  [13, 'UnitedHealth Group (UNH) statistics', 'Stock Analysis', 'Datos de mercado', '2026-10-12', 'https://stockanalysis.com/stocks/unh/statistics/'],
].map(([id, titulo, editor, tipo, fecha, url]) => ({ id, titulo, editor, tipo, fecha, url }));
// Comparables y transacciones de la carpeta de UnitedHealth (fuentes D10-D16 y D28-D39 de aquella nota), renumeradas aquí desde 14.
const mapaU = {};
let n = 14;
const fuentesU = [];
for (const f of Du.fuentes) {
  if ([10, 11, 12, 13, 14, 15, 16, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39].includes(f.id)) { mapaU[f.id] = n; fuentesU.push({ ...f, id: n }); n++; }
}
const re = (t) => (t ?? '').replace(/\[([\d,\s-]+)\]/g, (m, g) => '[' + g.split(',').map((x) => { const k = Number(x.trim()); return mapaU[k] ?? x.trim(); }).join(', ') + ']');
const comps = Du.comparables.empresas.filter((e) => e.ticker !== 'ELV');
comps.unshift({ nombre: 'UnitedHealth Group', ticker: 'UNH', pais: 'US', capitalizacion: 342000, ev_ventas: 0.94, ev_ebitda_ltm: 14.7, ev_ebitda_ntm: null, per_ntm: 18.4, crecimiento_pct: 1.6, margen_ebitda_pct: 6.4, roic_pct: 12.5, dn_ebitda: 2.5, fcf_yield_pct: null });
const D = {
  _estado: 'completo con comparables y transacciones del 9-12 oct (carpeta de UnitedHealth)',
  identificacion: {
    nombre: 'Elevance Health, Inc.', nombre_corto: 'Elevance', ticker: 'ELV', isin: 'US0367521038', mercado: 'NYSE', indice_referencia: 'S&P 500',
    pais: 'Estados Unidos', pais_iso: 'US', sector: 'Health Care', industria: 'Managed Health Care', sede: 'Indianápolis (Indiana)', fundacion: '2004', empleados: null, web: 'elevancehealth.com',
    precio: 425.27, fecha_precio: '2026-10-13', acciones: 222.5, capitalizacion_publicada: null, free_float_pct: null,
    max_52s: 436.24, min_52s: 274.84, volumen_medio_diario: null, proximos_resultados: '2026-10-21',
  },
  consenso: {
    guidance: 'Guía de 2026 (15-jul-2026): BPA ajustado de al menos 27,00 USD (desde ≥ 25,50 en enero y ≥ 26,75 en abril), BPA contable de al menos 20,10 USD y flujo operativo de al menos 6.000 M. La dirección reafirma volver a crecer al menos un 12 % el BPA ajustado en 2027 sobre la base de 2026, y acelera inversiones en capacidades (ratio de gastos operativos ajustado del 11,0 % en el 2T26) [A3, A4, A2]. Resultados del 3T26 el 21-oct-2026 antes de la apertura [7, 8].',
    estimaciones: [
      { periodo: '2026e', ingresos: null, ebitda: null, ebit: null, bpa: 26.92, dpa: 6.88, fuente: 'Barchart (consenso tras el 2T26) [5]' },
      { periodo: '2027e', ingresos: null, ebitda: null, ebit: null, bpa: 29.12, dpa: null, fuente: 'Barchart [5]; Zacks 28,83 [4]' },
      { periodo: '2028e', ingresos: null, ebitda: null, ebit: null, bpa: 32.49, dpa: null, fuente: 'Zacks Research [4]' },
    ],
    recomendaciones: { n_analistas: 22, comprar: 15, mantener: 8, vender: 0, po_medio: 451.38, po_min: 360, po_max: 498 },
    revisiones: 'Las revisiones han ido al alza desde abril: la guía subió dos veces (de ≥ 25,50 a ≥ 27,00 USD) y el BPA de consenso de 2026 pasó de 25,93 a 26,92 USD [5]. En octubre BofA subió su objetivo a 480 USD, Barclays a 469 y Guggenheim a 460; Leerink, a 395 con «Market Perform» [2, 3]. El objetivo medio pasó de ≈ 381 USD (TIKR, primavera) a 441 (MarketBeat) y 451 (S&P Global, 22 analistas) [10, 3, 2]. Solo hay estimaciones de BPA (ajustado), no de ingresos ni de EBITDA, desde la nube.',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: null,
  multiplos_historicos: {
    serie: [
      { anio: '2021', precio_cierre: 463.54, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2022', precio_cierre: 512.97, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2023', precio_cierre: 471.56, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2024', precio_cierre: 368.9, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2025', precio_cierre: 350.2, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
    ],
    confianza: 'Media',
  },
  comparables: { criterio: 'Las grandes aseguradoras de salud cotizadas de EE. UU. (UnitedHealth, CVS-Aetna, Cigna, Humana, Centene, Molina) y dos especialistas en crecimiento (Oscar en el ACA, Alignment en Medicare Advantage). Cifras de Stock Analysis del 9-12 oct-2026, tomadas para el informe de UnitedHealth; UnitedHealth entra con las de su propio informe. Su valor empresa resta la caja regulada: solo se usa el PER.', empresas: comps, confianza: 'Media' },
  transacciones: { operaciones: Du.transacciones.operaciones.map((o) => ({ ...o, comentario: re(o.comentario) })), confianza: 'Media' },
  fuentes: [...fD, ...fuentesU],
  huecos: [
    { seccion: 'bolsa', campo: 'rentabilidades, beta, volatilidad y caída máxima', tipo: 'Complemento', intentos: '1) bolsa.mjs (Yahoo) sin red en la nube; 2) búsqueda de rentabilidades anuales; 3) Macrotrends y Trade Ideas: solo cierres y rango', decision: 'Omitido' },
    { seccion: 'consenso', campo: 'ingresos y EBITDA de consenso', tipo: 'Complemento', intentos: '1) Stock Analysis forecast (sin tabla en la búsqueda); 2) MarketScreener no accesible; 3) Barchart y Zacks: solo BPA', decision: 'Omitido' },
  ],
};
w('D', D);
console.log('mapa UNH->ELV D:', JSON.stringify(mapaU));

// ---------------- E. Sentimiento ----------------
const fE = [
  [1, 'Elevance Health Has Upside, But Not Yet A Buy (artículo y comentarios)', 'Seeking Alpha', 'Foros y redes', '2026-07-28', 'https://seekingalpha.com/symbol/ELV/analysis'],
  [2, 'Elevance Health (ELV) sentiment: Reddit, noticias y redes', 'SentiSense', 'Foros y redes', '2026-08-10', 'https://app.sentisense.ai/stocks/ELV/sentiment'],
  [3, 'Elevance Health (ELV) raises 2026 targets and exits weak Medicaid markets (comentarios y valoraciones de la comunidad)', 'Simply Wall St', 'Foros y redes', '2026-07', 'https://simplywall.st/stocks/us/healthcare/nyse-elv/elevance-health/news/elevance-health-elv-raises-2026-targets-and-exits-weak-medic/amp'],
  [4, 'Elevance Health: Analystenupgrade auf Buy – Kursziel auf 498 USD erhöht (comentarios de lectores)', 'Goldesel', 'Foros y redes', '2026-05', 'https://goldesel.de/aktien/news/elevance-health-analystenupgrade-auf-buy-kursziel-auf-498-usd-erhoht'],
  [5, 'Elevance Health Inc: opciones y posición corta', 'Benzinga', 'Foros y redes', '2026-08', 'https://www.benzinga.com/quote/ELV/sentiment'],
  [6, 'ELV: informe de Sure Dividend (julio de 2026)', 'Sure Dividend', 'Foros y redes', '2026-07-16', 'https://www.suredividend.com/wp-content/uploads/2026/07/ELV-2026-07-16.pdf'],
].map(([id, titulo, editor, tipo, fecha, url]) => ({ id, titulo, editor, tipo, fecha, url }));
const E = {
  _estado: 'completo con búsqueda web (Reddit y Stocktwits no se abren desde la nube: lectura indirecta vía SentiSense)',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Seeking Alpha', fecha: '2026-07', n_comentarios: 20, tono: 'Neutro', resumen: 'El artículo más leído tras el 2T26 recomienda «Hold»: valoración con descuento y buena caja, pero el margen sigue presionado y no hay prueba de que el coste médico ceda [1]; Sure Dividend también mantiene «Hold» por la rentabilidad esperada [6].' },
      { plataforma: 'Reddit (vía SentiSense)', fecha: '2026-08', n_comentarios: 16, tono: 'Negativo', resumen: 'En Reddit predominan las menciones bajistas (≈ 21 % de las menciones con sesgo bajista y atención baja, ≈ 16 al día): el debate es Medicaid, el ACA y si el sector es una «trampa de valor» [2].' },
      { plataforma: 'Simply Wall St (comunidad)', fecha: '2026-07', n_comentarios: 10, tono: 'Positivo', resumen: 'Las narrativas de la comunidad celebran la guía subida y la salida de mercados de Medicaid con pérdidas; las valoraciones de usuarios suben el valor razonable [3].' },
      { plataforma: 'Goldesel (lectores en alemán)', fecha: '2026-05', n_comentarios: 5, tono: 'Positivo', resumen: 'Los lectores comentan la subida de Deutsche Bank a «Buy» (498 USD) y la compra de acciones de la consejera delegada como señal de suelo [4].' },
      { plataforma: 'Benzinga (opciones y cortos)', fecha: '2026-08', n_comentarios: 0, tono: 'Positivo', resumen: 'Posición corta baja (≈ 2,9 % del capital flotante) y ratio put/call de 0,40: el mercado de opciones no apuesta contra la acción [5].' },
    ],
    temas: [
      { tema: 'Coste médico en Medicaid y Medicare', postura: 'Bajista', peso: 'Alto', contraste: 'Con razón: el ratio de prestaciones del 2T26 subió 80 pb al 89,7 % por los negocios públicos y la dirección prevé un margen operativo de Medicaid del −1,75 % en 2026.' },
      { tema: '¿Ha tocado fondo el sector?', postura: 'Dividida', peso: 'Alto', contraste: 'Las cifras apoyan un suelo en 2026: guía subida dos veces y vuelta prometida a +12 % de BPA en 2027; pero 2024 y 2025 se incumplieron.' },
      { tema: 'Valoración barata frente a la historia', postura: 'Alcista', peso: 'Medio', contraste: 'Exagerado tras la subida a 425 USD: 15,7 veces el BPA ajustado de 2026e, por encima de la mediana de cinco años (14,2x).' },
      { tema: 'Salida de mercados de Medicaid y del ACA', postura: 'Alcista', peso: 'Medio', contraste: 'Mejora el margen pero resta ingresos en 2027: lo recogemos con un crecimiento del 3 % ese año.' },
    ],
    lectura: 'El sentimiento no es extremo: los particulares siguen escépticos (Reddit bajista) mientras los analistas son mayoritariamente compradores (15 de 23) y los cortos son bajos. Desde julio el tono mejora con la guía subida y el rebote de la acción (de 373 a 425 USD), lo que reduce el margen de seguridad que veían los inversores de valor en primavera. Ningún foro aporta un riesgo que el informe no recoja; el tema que más pesa, el coste médico de Medicaid, es también nuestro principal riesgo. Antes del 3T26 (21-oct) el mercado ya descuenta un buen trimestre tras el de UnitedHealth.',
    confianza: 'Baja',
  },
  fuentes: fE,
  huecos: [{ seccion: 'sentimiento', campo: 'Reddit y Stocktwits leídos directamente', tipo: 'Complemento', intentos: '1) búsqueda de hilos en Reddit; 2) Stocktwits ELV; 3) agregador SentiSense (usado)', decision: 'Calculado y marcado como estimación' }],
};
w('E', E);
