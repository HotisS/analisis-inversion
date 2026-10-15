// Escribe las notas A-E de Broadridge (BR, corte 2026-10-15) desde los documentos de notas/docs (EDGAR), el XBRL de la SEC
// (cuentas-xbrl.json), bolsa.json (Yahoo) y páginas web leídas el 15-oct-2026. Cada nota cita solo con [n] de su propia lista.
// Ejecutar: node informes/broadridge-2026-10-15/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const bolsa = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const EDGAR = 'https://www.sec.gov/Archives/edgar/data/1383312/';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Form 10-K del ejercicio cerrado el 30-jun-2026 (cuentas, notas de deuda, activos digitales, geografías, cuentas a pagar)', editor: 'Broadridge Financial Solutions', tipo: 'Primaria', fecha: '2026-08-07', url: EDGAR + '000162828026052243/br-20260630.htm' },
  { id: 2, titulo: 'Nota de resultados del 4T y del ejercicio 2026 (Exhibit 99.1; cuenta, balance, flujos, segmentos, conciliaciones)', editor: 'Broadridge Financial Solutions', tipo: 'Primaria', fecha: '2026-08-04', url: EDGAR + '000138331226000022/ex991earningsrelease4q2026.htm' },
  { id: 3, titulo: 'Nota de resultados del 3T del ejercicio 2026', editor: 'Broadridge Financial Solutions', tipo: 'Primaria', fecha: '2026-04-30', url: EDGAR + '000138331226000013/ex991earningsrelease3q2026.htm' },
  { id: 4, titulo: 'Nota de resultados del 2T del ejercicio 2026', editor: 'Broadridge Financial Solutions', tipo: 'Primaria', fecha: '2026-02-03', url: EDGAR + '000138331226000005/ex991earningsrelease2q2026.htm' },
  { id: 5, titulo: 'Nota de resultados del 1T del ejercicio 2026', editor: 'Broadridge Financial Solutions', tipo: 'Primaria', fecha: '2025-11-04', url: EDGAR + '000138331225000032/ex991earningsrelease1q2026.htm' },
  { id: 6, titulo: 'Nota de resultados del 4T y del ejercicio 2024 (con el ejercicio 2023)', editor: 'Broadridge Financial Solutions', tipo: 'Primaria', fecha: '2024-08-06', url: EDGAR + '000138331224000037/ex991earningsrelease4q2024.htm' },
  { id: 7, titulo: 'Nota de resultados del 4T y del ejercicio 2022 (con el ejercicio 2021)', editor: 'Broadridge Financial Solutions', tipo: 'Primaria', fecha: '2022-08-12', url: EDGAR + '000138331222000035/ex991earningsrelease4q2022.htm' },
  { id: 8, titulo: 'Nota de resultados del 4T y del ejercicio 2021', editor: 'Broadridge Financial Solutions', tipo: 'Primaria', fecha: '2021-08', url: EDGAR + '000138331221000044/ex991earningsrelease4q2021.htm' },
  { id: 9, titulo: 'Nota de resultados del 4T y del ejercicio 2020 (con el ejercicio 2019)', editor: 'Broadridge Financial Solutions', tipo: 'Primaria', fecha: '2020-08', url: EDGAR + '000138331220000052/ex991earningsrelease4q.htm' },
  { id: 10, titulo: 'Hechos XBRL de los 10-K (companyfacts, CIK 0001383312)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-14', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0001383312.json' },
  { id: 11, titulo: 'Presentación de resultados del 4T del ejercicio 2026 (Exhibit 99.2)', editor: 'Broadridge Financial Solutions', tipo: 'Primaria', fecha: '2026-08-04', url: EDGAR + '000138331226000022/ex992earnings_presentati.htm' },
  { id: 12, titulo: 'Investor Presentation, mayo de 2026 (Exhibit 99.1)', editor: 'Broadridge Financial Solutions', tipo: 'Primaria', fecha: '2026-05-06', url: EDGAR + '000138331226000015/ex991investorpresentatio.htm' },
  { id: 13, titulo: 'Form 10-K del ejercicio 2021 (precio de compra de Itiviti y ganancia del instrumento de cobertura)', editor: 'Broadridge Financial Solutions', tipo: 'Primaria', fecha: '2021-08', url: EDGAR + '000138331221000047/br-20210630.htm' },
];

// D&A total = depreciación + amortización de intangibles comprados + amortización de otros activos (costes de conversión de clientes y comisiones), de los estados de flujos [2, 6, 7, 8, 9].
const DA = { FY2019: 260.0, FY2020: 299.3, FY2021: 334.7, FY2022: 464.0, FY2023: 425.0, FY2024: 477.9, FY2025: 498.1, FY2026: 508.4 };
const base = [
  // periodo, ingresos, coste_ventas, gastos_generales, ebit, beneficio_neto, impuestos, gastos_financieros, bpa, dpa, acciones
  ['FY2019', 4362.2, 3131.9, 577.5, 652.7, 482.1, 125.2, 45.9, 4.06, 1.94, 118.8],
  ['FY2020', 4529.0, 3265.1, 639.0, 624.9, 462.5, 117.0, 62.5, 3.95, 2.16, 117.0],
  ['FY2021', 4993.7, 3570.8, 744.3, 678.7, 547.5, 148.7, 57.5, 4.65, 2.30, 117.8],
  ['FY2022', 5709.1, 4116.9, 832.3, 759.9, 539.1, 133.1, 87.7, 4.55, 2.56, 118.5],
  ['FY2023', 6060.9, 4275.5, 849.0, 936.4, 630.6, 164.3, 143.7, 5.30, 2.90, 119.0],
  ['FY2024', 6506.8, 4572.9, 916.8, 1017.1, 698.1, 179.3, 150.2, 5.86, 3.20, 119.1],
  ['FY2025', 6889.1, 4752.3, 948.2, 1188.6, 839.5, 219.2, 135.8, 7.10, 3.52, 118.3],
  ['FY2026', 7476.8, 5100.7, 1075.5, 1300.6, 1124.3, 321.6, 111.8, 9.60, 3.90, 117.1],
];
const cuenta = base.map(([periodo, ingresos, cv, gg, ebit, bn, imp, gf, bpa, dpa, acc]) => {
  const bai = Math.round((bn + imp) * 10) / 10;
  return {
    periodo, ingresos, coste_ventas: cv, gastos_generales: gg, ebitda: Math.round((ebit + DA[periodo]) * 10) / 10, amortizaciones: DA[periodo], ebit,
    resultado_financiero: Math.round((bai - ebit) * 10) / 10, bai, impuestos: imp, minoritarios: 0, beneficio_neto: bn, gastos_financieros: gf,
    participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa, dpa, dpa_extraordinario: 0, acciones_diluidas: acc,
  };
});

// Balance al 30 de junio. Clientes y «payables and accrued expenses» de los balances de las notas de resultados [2, 6, 7, 8, 9];
// el resto del XBRL [10]. Arrendamientos operativos (US GAAP) fuera de la deuda: 262,9 M en 2026 [1].
const bal = [
  // periodo, activo, act_corr, pas_corr, pas_total, fc, intang, inmov, exist, clientes, proveedores, pas_contrato, caja, deuda, pn, reservas
  ['FY2019', 3880.7, 1042.3, 802.6, 2753.2, 1500.0, 556.2, 189.0, 21.1, 664.0, 711.7, 90.9, 273.2, 1470.4, 1127.5, 2087.7],
  ['FY2020', 4889.8, 1328.0, 1341.0, 3543.2, 1674.5, 583.8, 161.6, 21.5, 711.3, 829.9, 111.2, 476.6, 1787.5, 1346.5, 2302.6],
  ['FY2021', 8119.8, 1261.3, 1288.0, 6310.6, 3720.1, 1425.0, 177.2, 23.2, 820.3, 1102.7, 185.3, 274.5, 3887.6, 1809.1, 2583.8],
  ['FY2022', 8168.8, 1328.4, 1313.4, 6249.8, 3484.9, 1077.1, 150.9, 29.3, 946.9, 1114.9, 198.5, 224.7, 3793.0, 1919.1, 2824.0],
  ['FY2023', 8233.2, 1392.5, 2397.8, 5992.6, 3461.6, 1467.2, 145.7, 34.1, 974.0, 1019.5, 199.8, 252.3, 3413.2, 2240.6, 3113.0],
  ['FY2024', 8242.4, 1540.9, 1421.8, 6074.2, 3469.4, 1307.2, 162.2, 30.5, 1065.6, 1194.4, 227.4, 304.4, 3355.1, 2168.2, 3435.1],
  ['FY2025', 8545.0, 1817.1, 1861.2, 5889.9, 3609.6, 1277.4, 170.1, 32.1, 1077.1, 1112.8, 249.1, 561.5, 3252.3, 2655.1, 3862.5],
  ['FY2026', 8945.3, 1748.1, 1414.8, 6104.7, 3787.8, 1199.9, 174.3, 35.1, 1129.4, 1138.2, 276.6, 402.9, 3254.6, 2840.5, 4553.6],
];
const historicoBalance = bal.map(([periodo, at, ac, pc, pt, fc, ii, im, ex, cl, pr, pcto, caja, deuda, pn, res]) => ({
  periodo, activo_total: at, activo_corriente: ac, pasivo_corriente: pc, pasivo_total: pt, fondo_comercio: fc, intangibles: ii, inmovilizado_material: im,
  existencias: ex, clientes: cl, proveedores: pr, activos_contrato: null, pasivos_contrato: pcto, caja, deuda_financiera: deuda, arrendamientos: 0,
  patrimonio_neto: pn, minoritarios: 0, reservas: res,
}));

const fl = [
  // periodo, operativo, capex (inmovilizado + software), adquisiciones, dividendos, recompras, emisión
  ['FY2019', 617.0, 72.6, 354.7, 211.2, 397.8, 31.1],
  ['FY2020', 598.2, 98.7, 339.1, 241.0, 69.3, 41.8],
  ['FY2021', 640.1, 100.7, 2603.6, 261.7, 21.5, 35.3],
  ['FY2022', 443.5, 73.1, 13.3, 290.7, 22.8, 60.2],
  ['FY2023', 823.3, 75.2, 0, 331.0, 24.3, 43.1],
  ['FY2024', 1056.2, 113.0, 34.3, 368.2, 485.4, 72.4],
  ['FY2025', 1171.3, 114.9, 193.5, 402.3, 134.9, 62.3],
  ['FY2026', 1345.6, 112.6, 282.7, 443.5, 603.7, 22.3],
];
const historicoFlujos = fl.map(([periodo, op, capex, adq, div, rec, em]) => ({
  periodo, flujo_operativo: op, capex, pagos_arrendamientos: 0, adquisiciones: adq, desinversiones: 0, dividendos: div, recompras: rec, emision_acciones: em, intereses_en_financiacion: 0,
}));

const seg = (nombre, descripcion, filas) => ({ nombre, descripcion, tipo_resultado: 'EBIT', historico: filas.map(([periodo, ingresos, resultado]) => ({ periodo, ingresos, resultado })) });

const A = {
  _estado: 'Completo. Cuenta, balance y flujos de las notas de resultados anuales y del 10-K de 2026, contrastados con el XBRL de la SEC (el XBRL da el beneficio antes de impuestos solo de EE. UU. y la amortización sin intangibles: corregido).',
  negocio: {
    segmentos: [
      seg('Investor Communication Solutions (ICS)', 'Comunicaciones al inversor: distribución de juntas y votos por cuenta de bancos y brókeres (Regulatory), datos y distribución de fondos, servicios a emisores y comunicaciones a clientes; incluye el franqueo repercutido (Distribution).', [
        ['FY2021', 3827.0, 596.0], ['FY2022', 4262.1, 726.3], ['FY2023', 4535.6, 811.4], ['FY2024', 4857.9, 950.4], ['FY2025', 5113.0, 1054.0], ['FY2026', 5560.8, 1103.5]]),
      seg('Global Technology and Operations (GTO)', 'Tecnología y operaciones para mercados de capitales (post-contratación, órdenes y conectividad: Itiviti, NYFIX, CQG) y para gestión de patrimonios y de activos.', [
        ['FY2021', 1186.2, 200.3], ['FY2022', 1474.4, 139.5], ['FY2023', 1525.2, 183.9], ['FY2024', 1648.9, 173.3], ['FY2025', 1776.1, 201.4], ['FY2026', 1916.0, 297.8]]),
      seg('Divisa (conciliación)', 'Diferencia entre los ingresos de los segmentos a tipo de cambio interno y los consolidados (solo hasta 2022).', [
        ['FY2021', -19.5, null], ['FY2022', -27.4, null], ['FY2023', 0, null], ['FY2024', 0, null], ['FY2025', 0, null], ['FY2026', 0, null]]),
    ],
    geografias: [
      { nombre: 'Estados Unidos', peso_pct: 85.3 }, { nombre: 'Canadá', peso_pct: 7.3 }, { nombre: 'Europa', peso_pct: 6.6 }, { nombre: 'Otros', peso_pct: 0.8 },
    ],
    geografias_criterio: 'origen',
    kpis: [
      { kpi: 'Ingresos recurrentes', valor_anterior: '4.508 M USD (2025)', valor_actual: '4.878 M USD (2026)', variacion: '+8 %', comentario: '+8 % a tipo constante; 7 puntos orgánicos en ICS [2].' },
      { kpi: 'Ventas cerradas (closed sales)', valor_anterior: '288 M USD', valor_actual: '305 M USD', variacion: '+6 %', comentario: 'Guía 2027: 290-330 M [2]. En el 3T la empresa había bajado la previsión del año a 240-290 M [3].' },
      { kpi: 'Crecimiento de posiciones en acciones con ingreso', valor_anterior: '12 %', valor_actual: '12 % (14 % en el 4T)', variacion: '=', comentario: 'Motor del volumen de Regulatory; fondos y ETF +6 % [2].' },
      { kpi: 'Crecimiento interno de operaciones (trades)', valor_anterior: '13 %', valor_actual: '15 %', variacion: '+2 pp', comentario: 'Volumen de los clientes de las plataformas de negociación [2].' },
      { kpi: 'Ingresos de distribución (franqueo e impresión)', valor_anterior: '2.062 M USD', valor_actual: '2.251 M USD', variacion: '+9 %', comentario: '≈123 M por subidas de tarifas postales; margen casi nulo, es lo que reduciría Reg E-Delivery [2, 1].' },
      { kpi: 'Conversión de caja libre (ajustada)', valor_anterior: '104 %', valor_actual: '110 %', variacion: '+6 pp', comentario: 'Caja libre de 1.233 M USD sobre beneficio neto ajustado de 1.124 M [2].' },
    ],
    confianza: 'Alta',
  },
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 7476.8, ebitda: 1809.0, ebit: 1300.6, beneficio_neto: 1124.3, bpa: 9.60, dpa: 3.90, dpa_extraordinario: 0, fcf: 1233.0, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [
      { periodo: 'FY2021', descripcion: 'Itiviti, comprada el 12-may-2021 por 2.580 M USD: entra entera en el balance (37 % del activo) y solo con el 1 % de los ingresos del año [13].' },
    ],
    comentario: 'Los ingresos pasaron de 4.362 M USD en 2019 a 7.477 M en 2026 [9, 2]. La compra de Itiviti (2021) y de SIS, CQG, Acolin, Signal e iJoin (2025-2026) explica parte; en 2026 el recurrente creció un 8 % con unos 7 puntos orgánicos en ICS y 4 en GTO [2]. Los ingresos de distribución (2.251 M, el 30 % del total) son franqueo e impresión repercutidos con margen casi nulo: diluyen el margen contable, que hay que leer sobre los ingresos recurrentes [2]. El margen EBIT subió del 13,3 % de 2022 al 17,4 % de 2026 por la escala en ICS (beneficio antes de impuestos del segmento: 726 M a 1.104 M) y la recuperación de GTO (de 140 M a 298 M) [7, 2]. El margen ajustado de explotación fue del 20,5 %, con 40 puntos básicos de presión por la distribución y por menos intereses del flotante [2].',
    ajustes: 'Usamos las cifras publicadas. El BPA de 2026 (9,60 USD) incluye 227 M de ganancias no realizadas y realizadas de activos digitales (monedas Canton recibidas como validador de la red Canton) y 7,3 M de plusvalía de una inversión: son no recurrentes y están por debajo del EBIT [2, 1]. Sin ellas, al tipo efectivo del 22,2 %, el BPA normalizado es ≈8,04 USD (estimación propia). En 2021 hubo 72,7 M de «otros ingresos no operativos», sobre todo la ganancia de un instrumento de cobertura de divisa de la compra de Itiviti [8, 13]: BPA normalizado ≈4,16. La empresa publica un BPA ajustado (9,60 en 2026 y 8,55 en 2025) que suma la amortización de intangibles comprados (203,6 M en 2026), los costes de compras (17,5 M) y de reestructuración (13,2 M) y resta las ganancias de activos digitales [2]. Los costes de compras se repiten cada año: no los tratamos como no recurrentes.',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '1T25', ingresos: 1422.9, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.68, vs_consenso: null },
      { periodo: '2T25', ingresos: 1589.2, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 1.20, vs_consenso: null },
      { periodo: '3T25', ingresos: 1811.7, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 2.05, vs_consenso: null },
      { periodo: '4T25', ingresos: 2065.4, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 3.16, vs_consenso: null },
      { periodo: '1T26', ingresos: 1589.4, crecimiento_pct: 11.7, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 1.40, vs_consenso: null },
      { periodo: '2T26', ingresos: 1713.9, crecimiento_pct: 7.8, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 2.42, vs_consenso: null },
      { periodo: '3T26', ingresos: 1953.6, crecimiento_pct: 7.8, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 2.36, vs_consenso: 'Superior' },
      { periodo: '4T26', ingresos: 2219.9, crecimiento_pct: 7.5, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 3.44, vs_consenso: 'Superior' },
    ],
    confianza: 'Media',
  },
  balance: {
    historico: historicoBalance,
    vencimientos: [
      { anio: 'FY2027', importe: 0 }, { anio: 'FY2028', importe: 0 }, { anio: 'FY2029', importe: 0 },
      { anio: 'FY2030', importe: 1024.7 }, { anio: 'FY2031', importe: 1750.0 }, { anio: 'FY2032+', importe: 500.0 },
    ],
    liquidez: 'Caja 402,9 M USD a 30-jun-2026 y 1.225 M disponibles de la línea de crédito de 1.500 M (vence en dic-2029) [1].',
    rating: null,
    coste_deuda_pct: 3.4,
    vida_media_anios: 4.4,
    confianza: 'Alta',
  },
  flujos: { historico: historicoFlujos, confianza: 'Alta' },
  calidad: { auditor: 'Deloitte & Touche LLP', anios_auditor: null, opinion: 'Favorable (sin salvedades; control interno eficaz)', confianza: 'Alta' },
  capital: {
    adquisiciones: [
      { anio: 'FY2021', objetivo: 'Itiviti Holding AB (negociación y conectividad para mercados de capitales, Suecia)', importe: 2580.4, ev_ebitda: null, financiacion: 'Préstamos a plazo de 2.550 M USD y bonos', resultado: 'Fondo de comercio de 1.932 M; el beneficio de GTO cayó de 200 M (2021) a 140 M (2022) y no volvió a superar el de 2021 hasta 2026 (298 M) [13, 7, 2]. Sin deterioros.' },
      { anio: 'FY2025', objetivo: 'Compras del ejercicio, la principal el negocio Securities Industry Services de Kyndryl (SIS)', importe: 193.5, ev_ebitda: null, financiacion: 'Caja', resultado: 'SIS aportó 5 puntos al crecimiento de Wealth and Investment Management en 2026 [2].' },
      { anio: 'FY2026', objetivo: 'CQG, Acolin (distribución transfronteriza de fondos), Signal e iJoin', importe: 282.7, ev_ebitda: null, financiacion: 'Caja', resultado: 'Demasiado recientes; CQG aportó 1-3 puntos al crecimiento de Capital Markets [2].' },
    ],
    confianza: 'Alta',
  },
  fuentes: [...fA, { id: 14, titulo: 'Pricing term sheet de los bonos al 5,750 % con vencimiento en 2036 (FWP)', editor: 'Broadridge Financial Solutions', tipo: 'Primaria', fecha: '2026-05-04', url: 'https://www.sec.gov/Archives/edgar/data/0001383312/000114036126018900/ef20072386_fwp.htm' }],
  huecos: [
    { seccion: 'trimestres', campo: 'EBITDA trimestral y crecimiento de los trimestres del ejercicio 2025', tipo: 'Complemento', intentos: '1) Notas de resultados trimestrales de 2026 (solo cuenta, sin amortizaciones por trimestre); 2) XBRL de los 10-Q (amortizaciones acumuladas); 3) notas trimestrales de 2025 no descargadas por tiempo', decision: 'Omitido' },
    { seccion: 'calidad', campo: 'años del auditor', tipo: 'Complemento', intentos: '1) 10-K 2026 (informe de Deloitte sin el año de inicio); 2) proxy 2026 (ratificación del auditor); 3) búsqueda no hecha por tiempo', decision: 'Omitido' },
  ],
};
A.balance.rating = 'Moody\'s Baa2, S&P BBB, Fitch BBB+ (calificaciones previstas de los bonos de 2036, may-2026) [14]';

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Form 10-K del ejercicio 2026: negocio, competencia, riesgos (IA, tokenización, Reg E-Delivery)', editor: 'Broadridge Financial Solutions', tipo: 'Primaria', fecha: '2026-08-07', url: EDGAR + '000162828026052243/br-20260630.htm' },
  { id: 2, titulo: 'Investor Presentation, mayo de 2026 (mercado direccionable de 60.000 M USD, posiciones, cuentas)', editor: 'Broadridge Financial Solutions', tipo: 'Primaria', fecha: '2026-05-06', url: EDGAR + '000138331226000015/ex991investorpresentatio.htm' },
  { id: 3, titulo: 'Ficha sectorial: software de aplicaciones (repositorio, 14-oct-2026; mapa del riesgo de IA)', editor: 'Análisis propio (repositorio)', tipo: 'Sectorial', fecha: '2026-10-14', url: 'sectores/software-2026-10-14.md' },
  { id: 4, titulo: 'Ficha sectorial: infraestructura de mercados y datos financieros (repositorio, 14-oct-2026; Burton-Taylor)', editor: 'Análisis propio (repositorio)', tipo: 'Sectorial', fecha: '2026-10-14', url: 'sectores/bolsas-datos-financieros-2026-10-14.md' },
  { id: 5, titulo: 'SS&C Technologies (SSNC): estadísticas', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/ssnc/statistics/' },
  { id: 6, titulo: 'Fidelity National Information Services (FIS): estadísticas', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/fis/statistics/' },
  { id: 7, titulo: 'Jack Henry (JKHY): estadísticas', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/jkhy/statistics/' },
  { id: 8, titulo: 'Donnelley Financial Solutions (DFIN): estadísticas', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/dfin/statistics/' },
  { id: 9, titulo: 'SEI Investments (SEIC): estadísticas', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/seic/statistics/' },
  { id: 10, titulo: 'Computershare (ASX: CPU): estadísticas', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/quote/asx/CPU/statistics/' },
  { id: 11, titulo: 'Nota de resultados del 4T del ejercicio 2026 (crecimiento por línea de producto)', editor: 'Broadridge Financial Solutions', tipo: 'Primaria', fecha: '2026-08-04', url: EDGAR + '000138331226000022/ex991earningsrelease4q2026.htm' },
  { id: 12, titulo: 'Presentación de resultados del 4T del ejercicio 2026 (tokenización, DLR, IA agéntica)', editor: 'Broadridge Financial Solutions', tipo: 'Primaria', fecha: '2026-08-04', url: EDGAR + '000138331226000022/ex992earnings_presentati.htm' },
  { id: 13, titulo: 'Broadridge Financial Solutions (BR) Fell Amid Concerns Over AI Disruption and Tokenized Equities (carta del 2T26 de SouthernSun)', editor: 'Insider Monkey', tipo: 'Prensa', fecha: '2026-07-24', url: 'https://www.insidermonkey.com/blog/broadridge-financial-solutions-br-fell-amid-concerns-over-ai-disruption-and-tokenized-equities-1804258/' },
];
const B = {
  _estado: 'Completo con documentos de la empresa, las dos fichas sectoriales del repositorio y Stock Analysis para los competidores cotizados.',
  historia: {
    resumen: 'Broadridge nació en 2007 como escisión de ADP, que había creado el negocio de distribución de juntas y votos por cuenta de los brókeres en los años sesenta y lo había convertido en el procesador casi único de las comunicaciones a los accionistas en «street name» de EE. UU. Desde la escisión ha hecho dos cosas: ampliar las comunicaciones (fondos, emisores, comunicaciones a clientes, compra del negocio de comunicaciones de DST) y construir una segunda pata tecnológica para mercados de capitales y patrimonios. La compra de Itiviti (2021, 2.580 M USD) llevó GTO a la parte de órdenes y conectividad; en 2025-2026 añadió SIS de Kyndryl, CQG y Acolin, y montó una plataforma de repos sobre registro distribuido (DLR) [1, 2].',
    hitos: [
      { anio: '2007', hito: 'Escisión de ADP y salida a bolsa en la NYSE.' },
      { anio: '2019', hito: 'Tim Gokey sucede a Rich Daly como primer ejecutivo.' },
      { anio: '2021', hito: 'Compra de Itiviti por 2.580 M USD: entra en la negociación y la conectividad (front office) [1].' },
      { anio: '2024', hito: 'Empieza a cobrar en monedas Canton como validador de la red Canton (repos tokenizados).' },
      { anio: '2025', hito: 'Compra el negocio de servicios a la industria de valores de Kyndryl (SIS) y CQG.' },
      { anio: '2026', hito: 'Compra Acolin; 227 M USD de ganancias por activos digitales; la SEC propone Reg E-Delivery (16-jul) [1].' },
      { anio: '2026', hito: 'Chris Perry, presidente desde 2026, entra en el consejo: sucesión ordenada de Gokey en preparación.' },
    ],
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'Broadridge es la infraestructura que conecta a los emisores y fondos con sus inversores a través de los brókeres y bancos, y procesa operaciones para los mercados de capitales. ICS (74 % de los ingresos) distribuye las convocatorias de junta, los informes y los folletos a los titulares de acciones y fondos en cuentas de valores, recoge y cuenta los votos (ProxyEdge para institucionales) y presta servicios a emisores y comunicaciones a clientes; da servicio a unas 900 millones de posiciones en acciones de EE. UU. y a más de 170 millones de cuentas minoristas [1, 2]. GTO (26 %) da plataformas de post-contratación, órdenes y conectividad (procesa más de 15 billones de USD al día en renta fija y variable) y software para gestoras y patrimonios [2].',
    como_gana_dinero: 'Cobra por unidad procesada: por posición o por comunicación en ICS (tarifas fijadas en parte por las reglas de la NYSE, que el emisor paga y Broadridge reparte con los brókeres) y por cuenta u operación en GTO, con contratos plurianuales [1]. El 65 % de los ingresos es recurrente (4.878 M), el 5 % es por eventos (fusiones, campañas de fondos: 348 M) y el 30 % es distribución (franqueo e impresión: 2.251 M) con margen casi nulo [11]. El margen depende de la escala: ICS ganó un 30,6 % antes de impuestos en el 4T, la temporada de juntas, y un 19,8 % en el año; los costes de conversión de clientes nuevos se activan y se amortizan [11, 1]. Estacionalidad fuerte: el 4T (abril-junio) concentra la temporada de juntas.',
    clientes: 'El primer cliente pesa el 7 % de los ingresos de 2026 [1]. Los clientes de ICS son los brókeres y bancos (que delegan la obligación de reenviar comunicaciones) y los emisores y fondos que pagan; en GTO, 21 de los 25 creadores de mercado primario de la deuda de EE. UU. y 7 de los 10 mayores bancos de inversión [2]. Los contratos son plurianuales y el cambio de proveedor exige migrar datos de cuentas y posiciones. El poder de precios es indirecto: el crecimiento de Regulatory (+12 % en 2026) sale del número de posiciones (+12 %), no de subidas de tarifa, y las tarifas de juntas las fija la NYSE [11, 1].',
    confianza: 'Alta',
  },
  sector: {
    definicion: 'El mercado relevante es la infraestructura tecnológica y de comunicaciones para la industria de valores: distribución y votación de juntas y comunicaciones reguladas, procesamiento post-contratación, órdenes y conectividad y plataformas de patrimonios. La empresa estima su mercado direccionable «vendido» (lo que hoy se compra a terceros) en 60.000 M USD [2]; no hay una segunda fuente independiente con ese perímetro. Como contraste, el gasto mundial en datos y análisis de mercados financieros fue de ≈49.200 M USD en 2025, +6,5 % (Burton-Taylor), con un perímetro distinto (terminales, índices, datos) [4]. Usamos los 60.000 M de la empresa para la cuota y lo marcamos como dato de la propia empresa.',
    tamano: '≈ 60.000 M USD de mercado direccionable vendido (empresa, 2026) [2]; datos y análisis de mercados financieros ≈ 49.200 M USD en 2025 (Burton-Taylor) [4]',
    unidad_serie: 'millones de USD (datos y análisis de mercados financieros, Burton-Taylor; perímetro de contraste)',
    serie: [ { anio: '2019', tamano: 32000 }, { anio: '2022', tamano: 37300 }, { anio: '2023', tamano: 42000 }, { anio: '2025', tamano: 49200 }, { anio: '2030e', tamano: 70000 } ],
    tcac_historico_pct: 7.4,
    tcac_previsto_pct: 7.0,
    cr5_pct: null,
    estructura: 'Concentrada en comunicaciones al inversor de EE. UU.; fragmentada en tecnología para mercados de capitales y patrimonios',
    drivers: [
      { driver: 'Número de posiciones de inversores (más cuentas minoristas, acciones fraccionadas, ETF)', efecto: '+', horizonte: 'Estructural', evidencia: 'Posiciones en acciones +16 % en 2026 (+12 % las que generan ingreso); fondos y ETF +6 % [11].' },
      { driver: 'Volumen de negociación', efecto: '+', horizonte: 'Cíclico', evidencia: 'Crecimiento interno de operaciones +15 % en 2026 [11].' },
      { driver: 'Paso de papel a digital (Reg E-Delivery propuesta el 16-jul-2026)', efecto: '+/−', horizonte: 'Estructural', evidencia: 'La empresa espera una «modesta» rebaja del crecimiento recurrente durante 2-3 años y menos ingresos de distribución, con mejor margen [1].' },
      { driver: 'Tokenización de valores y registros distribuidos', efecto: '+/−', horizonte: 'Estructural', evidencia: 'Riesgo de desintermediación declarado en el 10-K; a la vez, DLR procesa repos tokenizados (354.000 M USD al día en mayo, +392 %) [1, 2].' },
      { driver: 'Externalización de la tecnología de los bancos y brókeres', efecto: '+', horizonte: 'Estructural', evidencia: 'Ventas cerradas récord de 305 M USD en 2026; acuerdo ampliado con Kyndryl (may-2026) [11].' },
      { driver: 'Tipos de interés (ingresos del flotante)', efecto: '−', horizonte: 'Cíclico', evidencia: 'Menos ingresos por intereses del flotante restaron margen en 2026 [11].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 2, justificacion: 'En la distribución de juntas a titulares en cuentas de valores de EE. UU. Broadridge procesa casi todas las posiciones (unos 900 millones) [2]; la rivalidad está en GTO (SS&C, FIS, ION, proveedores internos).' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Clientes grandes (el primero, 7 % de los ingresos) que negocian contratos plurianuales; las fusiones de brókeres concentran poder [1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Los costes principales son personal, correo (repercutido) y centros de datos; las tarifas postales se repercuten [11].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Barrera regulatoria y de red: hay que conectar a miles de brókeres, emisores y fondos y cumplir las reglas de la SEC y la NYSE [1].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 4, justificacion: 'El papel desaparece (Reg E-Delivery), la tokenización puede llevar el registro y el voto a la cadena de bloques y la IA puede automatizar el voto institucional y las comunicaciones [1, 3].' },
    ],
    ciclo: { posicion: 'Madurez del ciclo', comentario: 'El negocio recurrente apenas nota el ciclo: los ingresos crecieron en 2009 (según la empresa), en 2020 (+3,8 %) y en 2022 (+14 %) [9, 7]. Lo cíclico son los ingresos por eventos (fusiones y campañas de fondos, 5 % de los ingresos) y el volumen de negociación en GTO. Hoy los volúmenes y las posiciones crecen a doble dígito: es la parte alta para esos indicadores.' },
    regulacion: 'Las tarifas por reenviar comunicaciones a los titulares en cuentas de valores las fijan las reglas de la NYSE aprobadas por la SEC [1]. El 16-jul-2026 la SEC propuso Reg E-Delivery: permitiría que el envío electrónico sea el método por defecto sin consentimiento previo, para folletos, juntas, informes y confirmaciones; el periodo de comentarios era de 60 días. La empresa no espera efecto en el ejercicio 2027 y sí una rebaja «modesta» del crecimiento recurrente durante dos o tres años, que espera compensar, y menos distribución [1]. Además: marco de los valores tokenizados aún sin definir en EE. UU. [1].',
    tendencias: 'Tres tendencias mueven la tesis. (1) Digitalización: menos papel y más interacción digital con el accionista; la empresa vende herramientas digitales (crecimiento a doble dígito durante cuatro años) [2]. (2) Tokenización: Broadridge ya presta voto y comunicaciones a valores tokenizados (primer voto en cadena de bloques de una cotizada de EE. UU., Ondo, Galaxy) y su plataforma DLR mueve repos tokenizados [12, 2]; si gana, se convierte en la capa de gobierno de esos valores; si no, pierde el peaje. (3) IA: la usa en el motor de políticas de voto personalizadas (800.000 M USD de activos) y en eficiencia interna; el mercado teme que la IA abarate las comunicaciones y el voto [2, 13].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 12.5,
    posicion: '1.º en comunicaciones a inversores y voto de juntas en EE. UU. (procesador casi único de las posiciones en cuentas de valores); 12,5 % del mercado direccionable de 60.000 M USD que estima la empresa (7.477 / 60.000; estimación propia con dato de la empresa) [2]',
    competidores: [
      { nombre: 'SS&C Technologies', pais: 'EE. UU.', ticker: 'SSNC', ingresos: 6560, cuota_pct: null, margen_ebit_pct: null, comentario: 'Software y servicios para gestoras y fondos (DST, transferencia de fondos); compite con GTO y con la distribución de fondos; compró Calastone en 2025 [5].' },
      { nombre: 'FIS', pais: 'EE. UU.', ticker: 'FIS', ingresos: 12200, cuota_pct: null, margen_ebit_pct: null, comentario: 'Tecnología de mercados de capitales y banca; compite en post-contratación [6].' },
      { nombre: 'Computershare', pais: 'Australia', ticker: 'CPU', ingresos: 3309, cuota_pct: null, margen_ebit_pct: null, comentario: 'Registro de accionistas y agente de transferencias (titulares registrados): competidor y socio en juntas [10].' },
      { nombre: 'Donnelley Financial Solutions', pais: 'EE. UU.', ticker: 'DFIN', ingresos: 777.5, cuota_pct: null, margen_ebit_pct: null, comentario: 'Informes regulatorios y comunicaciones de fondos y emisores; compite con las soluciones de emisores y fondos de ICS [8].' },
      { nombre: 'SEI Investments', pais: 'EE. UU.', ticker: 'SEIC', ingresos: 2450, cuota_pct: null, margen_ebit_pct: null, comentario: 'Plataformas y externalización para patrimonios y gestoras; compite con Wealth and Investment Management [9].' },
      { nombre: 'Jack Henry', pais: 'EE. UU.', ticker: 'JKHY', ingresos: 2540, cuota_pct: null, margen_ebit_pct: null, comentario: 'Proceso bancario para entidades medianas; comparable de modelo (procesamiento recurrente), no competidor directo [7].' },
    ],
    foso: {
      veredicto: 'Amplio', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 5, evidencia: 'Conecta a miles de brókeres, bancos, emisores y fondos con 170 millones de cuentas: cada parte usa la red porque las demás ya están [2].' },
        { fuente: 'Costes de cambio', puntuacion: 4, evidencia: 'Migrar posiciones, preferencias de envío y el voto de un bróker o la post-contratación de un banco lleva años; contratos plurianuales [1].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'Más de 180 patentes y solicitudes; reconocimiento regulatorio de su papel en el proceso de juntas [1].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Escala: margen antes de impuestos de ICS del 19,8 % en el año con el franqueo incluido [11].' },
        { fuente: 'Escala eficiente', puntuacion: 4, evidencia: 'El mercado de reenvío de comunicaciones de EE. UU. solo admite un procesador eficiente; no hay rival de tamaño comparable [1, 2].' },
      ],
    },
    amenazas: 'Tres amenazas, de más a menos probables. (1) Reg E-Delivery: menos papel reduce la distribución (sin margen) y, según la empresa, algo el crecimiento recurrente durante 2-3 años [1]; probabilidad alta de que se apruebe en alguna forma, efecto moderado. (2) Tokenización: si las acciones pasan a registros distribuidos donde el emisor ve al titular final, el papel de intermediario de Broadridge puede desaparecer; probabilidad baja a cinco años, alta a quince, y Broadridge se está posicionando como capa de gobierno de esos registros [1, 12]. (3) IA: abarata el voto institucional (políticas de voto automáticas) y la redacción de comunicaciones; afecta más a las herramientas que al proceso regulado de reenvío, que exige auditoría y responsabilidad [3, 13].',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Los asuntos que mueven las cifras son la ciberseguridad y la continuidad del servicio (procesa datos personales de 170 millones de cuentas y operaciones por más de 15 billones de USD al día: un fallo grave sería sanción y pérdida de clientes) y el papel: menos impresión y envío reduce emisiones y la distribución sin margen [1, 2]. La empresa forma parte del Project Glasswing de Anthropic para usar modelos de IA en ciberdefensa [1].',
    controversias: 'Sin controversias materiales identificadas en el 10-K de 2026 (sin litigios relevantes declarados) [1].',
    confianza: 'Baja',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'esg', campo: 'calificaciones ESG publicadas', tipo: 'Complemento', intentos: '1) 10-K y proxy 2026 (sin calificaciones de terceros); 2) informe de sostenibilidad no descargado; 3) búsqueda web no hecha por presupuesto', decision: 'Omitido' },
    { seccion: 'competencia', campo: 'margen EBIT y cuotas de los competidores', tipo: 'Complemento', intentos: '1) Stock Analysis (solo EBITDA y múltiplos); 2) informes anuales de SS&C, Computershare y DFIN no leídos por tiempo; 3) no hay cuotas publicadas por segmento', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Proxy statement (DEF 14A) para la junta del 10-nov-2026', editor: 'Broadridge Financial Solutions', tipo: 'Primaria', fecha: '2026-09-29', url: EDGAR + '000114036126037937/ny20075597x1_def14a.htm' },
  { id: 2, titulo: 'Form 4 de consejeros y directivos (oct-2025 a oct-2026), con herramientas/form4.mjs', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-14', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001383312&type=4' },
  { id: 3, titulo: 'Broadridge Appoints Todd Diganci to its Board of Directors (8-K)', editor: 'Broadridge Financial Solutions', tipo: 'Primaria', fecha: '2026-06-09', url: EDGAR + '000138331226000019/exhibit991prrediganci.htm' },
  { id: 4, titulo: 'Nota de resultados del 4T del ejercicio 2026 (guía 2027 y objetivos a tres años cumplidos)', editor: 'Broadridge Financial Solutions', tipo: 'Primaria', fecha: '2026-08-04', url: EDGAR + '000138331226000022/ex991earningsrelease4q2026.htm' },
  { id: 5, titulo: 'Broadridge targets at or above 7% recurring revenue growth and 10% to 12% adjusted EPS growth while cutting sales outlook (3T26)', editor: 'Seeking Alpha (noticias)', tipo: 'Prensa', fecha: '2026-04-30', url: 'https://seekingalpha.com/symbol/BR/news' },
  { id: 6, titulo: 'Investor Presentation, mayo de 2026 (objetivos FY24-26)', editor: 'Broadridge Financial Solutions', tipo: 'Primaria', fecha: '2026-05-06', url: EDGAR + '000138331226000015/ex991investorpresentatio.htm' },
];
const C = {
  _estado: 'Completo con el proxy de 2026 y los Form 4 de 12 meses.',
  directivos: {
    equipo: [
      { nombre: 'Timothy C. Gokey', cargo: 'Consejero delegado (CEO)', desde: '2019', participacion_pct: null, trayectoria: 'En Broadridge desde 2010 (director financiero, director de operaciones, presidente); antes en H&R Block y McKinsey. Como CEO cumplió los objetivos a tres años de crecimiento recurrente y BPA ajustado en los ciclos de su mandato [4]. Compró 5.300 acciones en mercado en marzo de 2026 a 194,49 USD [2].' },
      { nombre: 'Christopher J. Perry', cargo: 'Presidente (operativo) y consejero', desde: '2026', participacion_pct: null, trayectoria: 'Al frente de las ventas y los clientes globales durante años; entra en el consejo en 2026, lo que apunta a la sucesión de Gokey [1].' },
      { nombre: 'Ashima Ghei', cargo: 'Directora financiera (CFO)', desde: '2024', participacion_pct: null, trayectoria: 'Carrera interna en finanzas de Broadridge; vicepresidenta corporativa [1].' },
      { nombre: 'Eileen K. Murray', cargo: 'Presidenta independiente del consejo', desde: '2025', participacion_pct: null, trayectoria: 'Ex presidenta del consejo de gobernadores de FINRA y ex co-CEO de Bridgewater; consejera desde 2022 [1].' },
      { nombre: 'Thomas P. Carey', cargo: 'Vicepresidente corporativo, GTO y producto y tecnología', desde: '2018', participacion_pct: null, trayectoria: 'Dirige GTO desde 2018; desde julio de 2026 también producto y tecnología de todo el grupo [1]. Vendió acciones por 2,7 M USD en 12 meses [2].' },
      { nombre: 'Douglas R. DeSchutter', cargo: 'Vicepresidente corporativo, ICS', desde: null, participacion_pct: null, trayectoria: 'Responsable del segmento de comunicaciones al inversor [1].' },
    ],
    historial_guidance: [
      { anio: 'FY2024-26', guia: 'Objetivos a tres años: ingresos recurrentes +7-9 % y BPA ajustado +8-12 % anual [6]', real: 'Cumplidos: la empresa los da por logrados por quinto ciclo seguido [4]', cumplida: 'Sí' },
      { anio: 'FY2026', guia: 'Revisada en el 3T: recurrente ≥ 7 % a tipo constante, BPA ajustado +10-12 %, ventas cerradas 240-290 M USD [5]', real: 'Recurrente +8 %, BPA ajustado +12 %, ventas cerradas 305 M [4]', cumplida: 'Sí' },
      { anio: 'FY2027', guia: 'Recurrente +6-8 % a tipo constante, margen ajustado ≈21 %, BPA ajustado +8-12 %, conversión de caja ≥ 100 %, ventas cerradas 290-330 M [4]', real: 'En curso (1T el 3-nov-2026 aprox.)', cumplida: 'Parcial' },
    ],
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Eileen K. Murray', cargo: 'Presidenta', tipo: 'Independiente', desde: '2022', comisiones: '—' },
      { nombre: 'Timothy C. Gokey', cargo: 'Consejero delegado', tipo: 'Ejecutivo', desde: '2019', comisiones: '—' },
      { nombre: 'Christopher J. Perry', cargo: 'Presidente operativo', tipo: 'Ejecutivo', desde: '2026', comisiones: '—' },
      { nombre: 'Melvin L. Flowers', cargo: 'Vocal', tipo: 'Independiente', desde: '2021', comisiones: 'Auditoría y Riesgos (presidente); Gobierno y Nombramientos' },
      { nombre: 'Robert N. Duelks', cargo: 'Vocal', tipo: 'Independiente', desde: '2009', comisiones: 'Gobierno y Nombramientos (presidente); Auditoría y Riesgos' },
      { nombre: 'Annette L. Nazareth', cargo: 'Vocal', tipo: 'Independiente', desde: '2021', comisiones: 'Auditoría y Riesgos; Gobierno y Nombramientos' },
      { nombre: 'Maura A. Markus', cargo: 'Vocal', tipo: 'Independiente', desde: '2013', comisiones: 'Retribuciones' },
      { nombre: 'Patricia A. Mosconi', cargo: 'Vocal', tipo: 'Independiente', desde: '2026', comisiones: 'Retribuciones' },
      { nombre: 'Todd T. Diganci', cargo: 'Vocal', tipo: 'Independiente', desde: '2026', comisiones: 'Auditoría y Riesgos' },
      { nombre: 'Srinivas D. Tallapragada', cargo: 'Candidato (junta del 10-nov-2026)', tipo: 'Independiente', desde: '2026', comisiones: 'Auditoría y Riesgos (si es elegido)' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: false, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 92.0, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: 'FY2026', total: 19.13, fijo: 1.11, variable_corto: 1.93, variable_largo: 14.64, ratio_salario_medio: 285 },
    remuneracion: 'El CEO cobró 19,1 M USD en 2026 (17,2 M en 2025 y 14,3 M en 2024): 1,1 M de fijo, 1,9 M de bonus anual y 14,6 M en acciones y opciones (6,7 M en acciones de rendimiento y 7,9 M en opciones a diez años) [1]. Las acciones de rendimiento (PRSU) dependen del BPA ajustado medio de tres años y, desde 2026, del ingreso recurrente orgánico medio; pueden pagar entre el 0 % y el 165 % [1]. No hay métrica de rentabilidad sobre el capital ni de rentabilidad total para el accionista: premia crecer el BPA ajustado, que excluye la amortización de las compras, lo que favorece comprar empresas. Hay política de recuperación (clawback) amplia y prohibición de coberturas y prendas. Ratio CEO/empleado mediano: 285 a 1. El voto consultivo de 2025 sacó un 92 % a favor [1].',
    accionistas: [
      { nombre: 'BlackRock', pct: 8.55, tipo: 'Institucional', variacion: 'Dato del 13G de ene-2024' },
      { nombre: 'Vanguard Capital Management', pct: 7.70, tipo: 'Institucional', variacion: 'Nuevo 13G (mar-2026), tras la división de Vanguard' },
      { nombre: 'Vanguard Portfolio Management', pct: 5.61, tipo: 'Institucional', variacion: 'Nuevo 13G (mar-2026)' },
      { nombre: 'Autocartera', pct: 26.2, tipo: 'Autocartera (40,4 M acciones sobre 154,5 M emitidas)', variacion: '+3,1 M acciones en el ejercicio 2026 (recompras de 604 M USD)' },
    ],
    insiders: [
      { fecha: '2026-03-06', persona: 'Timothy C. Gokey (CEO)', operacion: 'Compra', acciones: 5300, importe: 1.03 },
      { fecha: '2025-11-18', persona: 'Christopher J. Perry (presidente)', operacion: 'Venta', acciones: 3984, importe: 0.90 },
      { fecha: '2025-12-03', persona: 'Thomas P. Carey (VP corporativo)', operacion: 'Venta', acciones: 10214, importe: 2.34 },
      { fecha: '2026-02-06', persona: 'Robert N. Duelks (consejero)', operacion: 'Venta', acciones: 253, importe: 0.05 },
      { fecha: '2026-06-04', persona: 'Hope M. Jarkowski (directora jurídica)', operacion: 'Venta', acciones: 1966, importe: 0.30 },
      { fecha: '2026-10-01', persona: 'Thomas P. Carey (VP corporativo)', operacion: 'Venta', acciones: 2501, importe: 0.40 },
    ],
    control_y_defensas: 'Sin accionista de control: los tres mayores son gestoras indexadas (BlackRock 8,6 %, Vanguard 13,3 % en dos vehículos) [1]. Una acción, un voto; consejo de mayoría independiente con presidenta independiente desde 2025 y las tres comisiones formadas solo por independientes. No hay operaciones vinculadas relevantes declaradas. Amit Zavery deja el consejo en la junta de 2026 sin desacuerdo, y entra Srinivas Tallapragada (ex Salesforce), un perfil de tecnología e IA [1].',
    alertas: [
      'El variable a largo plazo se mide con BPA ajustado (sin la amortización de compras) e ingreso recurrente: premia crecer, no la rentabilidad sobre el capital.',
      'Ventas de directivos por 4,0 M USD frente a una sola compra (CEO, 1,0 M) en 12 meses; ninguna con plan 10b5-1 [2].',
    ],
    confianza: 'Alta',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'directivos', campo: 'participación de cada directivo en el capital', tipo: 'Complemento', intentos: '1) Tabla de propiedad del proxy (no leída entera por tiempo); 2) Form 4 (saldos tras cada operación, no consolidados); 3) no hay otra fuente', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de BR, SPY y XLI (precio, rango, volumen, beta, rentabilidades, cierres de junio)', editor: 'Yahoo Finance (herramientas/bolsa.mjs)', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/BR/history/' },
  { id: 2, titulo: 'BR forecast: consenso de S&P Global (9 analistas, BPA y ventas FY2027, precio objetivo)', editor: 'Stock Analysis', tipo: 'Analistas', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/br/forecast/' },
  { id: 3, titulo: 'BR price target and analyst ratings (8 analistas, cambios recientes)', editor: 'MarketBeat', tipo: 'Analistas', fecha: '2026-10-14', url: 'https://www.marketbeat.com/stocks/NYSE/BR/forecast/' },
  { id: 4, titulo: 'BR statistics (capitalización, valor empresa, PER adelantado, acciones, posición corta)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/br/statistics/' },
  { id: 5, titulo: 'Bono del Tesoro de EE. UU. a 10 años (DGS10)', editor: 'FRED, Reserva Federal de San Luis', tipo: 'Datos de mercado', fecha: '2026-10-13', url: 'https://fred.stlouisfed.org/series/DGS10' },
  { id: 6, titulo: 'Tipos de cambio de referencia del euro', editor: 'Banco Central Europeo', tipo: 'Primaria', fecha: '2026-10-14', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml' },
  { id: 7, titulo: 'Implied ERP by month (ERP T12m with sustainable payout, oct-2026: 4,20 %)', editor: 'A. Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 8, titulo: 'Comparables de la ficha sectorial de infraestructura de mercados y datos (FactSet, Thomson Reuters; 13-oct-2026)', editor: 'Análisis propio (repositorio)', tipo: 'Sectorial', fecha: '2026-10-14', url: 'sectores/bolsas-datos-financieros-2026-10-14-comparables.json' },
  { id: 9, titulo: 'SS&C Technologies (SSNC): estadísticas', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/ssnc/statistics/' },
  { id: 10, titulo: 'Jack Henry (JKHY): estadísticas', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/jkhy/statistics/' },
  { id: 11, titulo: 'Donnelley Financial (DFIN): estadísticas', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/dfin/statistics/' },
  { id: 12, titulo: 'SEI Investments (SEIC): estadísticas', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/seic/statistics/' },
  { id: 13, titulo: 'Computershare (ASX: CPU): estadísticas', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/quote/asx/CPU/statistics/' },
  { id: 14, titulo: 'FIS: estadísticas', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/fis/statistics/' },
  { id: 15, titulo: 'Form 10-K del ejercicio 2021 (precio de compra de Itiviti)', editor: 'Broadridge Financial Solutions', tipo: 'Primaria', fecha: '2021-08', url: EDGAR + '000138331221000047/br-20210630.htm' },
  { id: 16, titulo: 'Envestnet announces $4.5 billion take-private transaction with Bain Capital', editor: 'Envestnet', tipo: 'Primaria', fecha: '2024-07-11', url: 'https://www.envestnet.com/newsroom/press-releases/envestnet-leading-wealth-technology-platform-announces-45-billion-take' },
  { id: 17, titulo: 'SS&C Technologies inks $1bn agreement to acquire Calastone', editor: 'FinTech Futures', tipo: 'Prensa', fecha: '2025-07', url: 'https://www.fintechfutures.com/m-a/ssc-technologies-inks-1bn-agreement-to-acquire-calastone' },
  { id: 18, titulo: 'Form 10-K del ejercicio 2026 (acciones en circulación a 31-jul-2026, deuda, activos digitales)', editor: 'Broadridge Financial Solutions', tipo: 'Primaria', fecha: '2026-08-07', url: EDGAR + '000162828026052243/br-20260630.htm' },
  { id: 19, titulo: 'Nota de resultados del 4T del ejercicio 2026 (guía del ejercicio 2027)', editor: 'Broadridge Financial Solutions', tipo: 'Primaria', fecha: '2026-08-04', url: EDGAR + '000138331226000022/ex991earningsrelease4q2026.htm' },
];
const AUDUSD = 1.1195 / 1.5971; // BCE 14-oct-2026
const D = {
  _estado: 'Completo. Precio y bolsa de bolsa.mjs (cierre del 14-oct-2026; la sesión del 15-oct no había cerrado). Consenso de S&P Global vía Stock Analysis (solo el ejercicio 2027) y MarketBeat.',
  identificacion: {
    nombre: 'Broadridge Financial Solutions, Inc.', nombre_corto: 'Broadridge', ticker: 'BR', isin: 'US11133T1034', mercado: 'NYSE', indice_referencia: 'S&P 500',
    pais: 'Estados Unidos', pais_iso: 'US', sector: 'Industria', industria: 'Servicios profesionales (procesamiento de datos y externalización)', sede: 'Lake Success, Nueva York', fundacion: '2007', empleados: 16000, web: 'www.broadridge.com',
    precio: bolsa.identificacion.precio, fecha_precio: bolsa.identificacion.fecha_precio, acciones: 114.6, capitalizacion_publicada: 19000, free_float_pct: 99.5,
    max_52s: bolsa.identificacion.max_52s, min_52s: bolsa.identificacion.min_52s, volumen_medio_diario: `≈ ${String(bolsa.volumen_3m.importe_dia_millones).replace('.', ',')} M USD/día (3 meses)`, proximos_resultados: '2026-11-03',
  },
  consenso: {
    guidance: 'Guía del ejercicio 2027 (4-ago-2026): ingresos recurrentes +6-8 % a tipo constante, margen operativo ajustado ≈21 % (≈19 % publicado), BPA ajustado +8-12 % (10,37-10,75 USD) y BPA publicado entre −4 % y 0 % sobre 9,60 (sin activos digitales, que no se pueden prever), conversión de caja libre ≥ 100 % y ventas cerradas de 290-330 M USD [19]. Los objetivos a tres años 2027-2029 se presentarán con el día del inversor; los de 2024-2026 se cumplieron. Sin cambios de la guía desde agosto.',
    estimaciones: [
      { periodo: 'FY2027e', ingresos: 7860, ebitda: null, ebit: null, bpa: 10.55, dpa: 4.36, fuente: 'S&P Global vía Stock Analysis, 9 analistas; BPA AJUSTADO (sin amortización de compras) [2]' },
    ],
    recomendaciones: { n_analistas: 8, comprar: 4, mantener: 4, vender: 0, po_medio: 216.0, po_min: 176.0, po_max: 257.0 },
    revisiones: 'Solo una fuente gratuita con estimaciones completas del ejercicio 2027 (S&P Global, 9 analistas: BPA ajustado 10,55 USD, rango 10,40-10,65; ventas 7.860 M) [2]; antes de los resultados de agosto el consenso del BPA ajustado de 2027 era 10,41 y la guía (10,37-10,75) lo dejó casi igual. Precio objetivo: 213,38 USD de media para S&P Global (176-250) y 216,00 para MarketBeat (176-257) [2, 3]. Tras los resultados, Morgan Stanley subió el objetivo de 169 a 176 (igual peso), RBC de 225 a 226 (sobreponderar) y UBS lo dejó en 180 (neutral) [3]: objetivos estables o algo al alza en 3 meses. Sin BPA de consenso de 2028 gratuito.',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: { ...bolsa.bolsa, posicion_corta_pct: 2.58, confianza: 'Alta' },
  multiplos_historicos: {
    serie: bolsa.cierres_ejercicio.filter((c) => ['FY2019', 'FY2020', 'FY2021', 'FY2022', 'FY2023', 'FY2024', 'FY2025', 'FY2026'].includes(c.anio))
      .map((c) => ({ anio: c.anio, precio_cierre: c.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    confianza: 'Alta',
  },
  comparables: {
    criterio: 'Procesadores y proveedores de tecnología recurrente para la industria financiera con la misma economía (cobro por cuenta, posición u operación, contratos plurianuales): SS&C (fondos y gestoras), Jack Henry (proceso bancario), SEI (plataformas de patrimonios), Computershare (registro de accionistas), Donnelley Financial (comunicaciones reguladas), y FactSet y Thomson Reuters (datos y contenido regulatorio, de la ficha sectorial). Fuera FIS: su PER adelantado de 5,5x refleja un problema propio (deuda de 5,9 veces el EBITDA tras la compra del negocio de emisión de Global Payments) y hundiría la mediana. Bases de BPA mezcladas (la mayoría ajustadas). Crecimiento: previsión de ventas a 3 años de Stock Analysis para los que no tienen ficha.',
    empresas: [
      { nombre: 'SS&C Technologies', ticker: 'SSNC', pais: 'US', capitalizacion: 19250, ev_ventas: 4.05, ev_ebitda_ltm: 12.6, ev_ebitda_ntm: null, per_ntm: 11.0, crecimiento_pct: 5.7, margen_ebitda_pct: 32.2, roic_pct: 8.7, dn_ebitda: 3.47, fcf_yield_pct: 9.1 },
      { nombre: 'Jack Henry', ticker: 'JKHY', pais: 'US', capitalizacion: 10890, ev_ventas: 4.30, ev_ebitda_ltm: 15.6, ev_ebitda_ntm: null, per_ntm: 21.4, crecimiento_pct: 6.7, margen_ebitda_pct: 27.6, roic_pct: 22.7, dn_ebitda: 0.09, fcf_yield_pct: 6.4 },
      { nombre: 'SEI Investments', ticker: 'SEIC', pais: 'US', capitalizacion: 12630, ev_ventas: 5.01, ev_ebitda_ltm: 16.2, ev_ebitda_ntm: null, per_ntm: 15.9, crecimiento_pct: 8.9, margen_ebitda_pct: 31.0, roic_pct: 22.4, dn_ebitda: -0.47, fcf_yield_pct: 5.4 },
      { nombre: 'Computershare', ticker: 'CPU', pais: 'AU', capitalizacion: Math.round(23950 * AUDUSD), ev_ventas: 5.16, ev_ebitda_ltm: 15.3, ev_ebitda_ntm: null, per_ntm: 18.6, crecimiento_pct: 2.8, margen_ebitda_pct: 33.1, roic_pct: 26.2, dn_ebitda: 0.28, fcf_yield_pct: 4.8 },
      { nombre: 'Donnelley Financial', ticker: 'DFIN', pais: 'US', capitalizacion: 1210, ev_ventas: 1.80, ev_ebitda_ltm: 8.8, ev_ebitda_ntm: null, per_ntm: 9.2, crecimiento_pct: 2.1, margen_ebitda_pct: 20.5, roic_pct: 18.9, dn_ebitda: 1.17, fcf_yield_pct: 12.6 },
      { nombre: 'FactSet', ticker: 'FDS', pais: 'US', capitalizacion: 10344, ev_ventas: 4.69, ev_ebitda_ltm: 13.1, ev_ebitda_ntm: 11.5, per_ntm: 16.5, crecimiento_pct: 6.3, margen_ebitda_pct: 35.8, roic_pct: 17.5, dn_ebitda: 1.45, fcf_yield_pct: 5.9 },
      { nombre: 'Thomson Reuters', ticker: 'TRI', pais: 'CA', capitalizacion: 45549, ev_ventas: 6.17, ev_ebitda_ltm: 15.6, ev_ebitda_ntm: 13.7, per_ntm: 24.1, crecimiento_pct: 8.2, margen_ebitda_pct: 39.3, roic_pct: 12.1, dn_ebitda: 0.81, fcf_yield_pct: 4.3 },
    ],
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2021-05', objetivo: 'Itiviti (negociación y conectividad)', comprador: 'Broadridge', ev: 2580, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Precio de compra neto de caja del 10-K de 2021 [15]; la empresa no publicó ventas ni EBITDA de Itiviti.' },
      { fecha: '2024-07', objetivo: 'Envestnet (plataforma de patrimonios)', comprador: 'Bain Capital', ev: 4500, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Exclusión de bolsa a 63,15 USD por acción [16].' },
      { fecha: '2025-07', objetivo: 'Calastone (red de distribución de fondos)', comprador: 'SS&C Technologies', ev: 1030, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '≈766 M GBP a Carlyle [17].' },
    ],
    comentario: 'Las tres operaciones del sector de los últimos cinco años no publicaron múltiplos: sirven para ver que el capital riesgo y los consolidadores pagan miles de millones por redes de distribución y plataformas, no para valorar. Broadridge no es un objetivo realista: capitalización de ≈19.000 M USD, accionariado disperso y, sobre todo, un papel cuasi regulatorio en las juntas de EE. UU. que haría muy difícil que la comprara un competidor o un banco. Peso 0 en la síntesis.',
    confianza: 'Baja',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'transacciones', campo: 'múltiplos pagados (EV/ventas, EV/EBITDA)', tipo: 'Complemento', intentos: '1) 10-K de 2021 de Broadridge (Itiviti sin ventas ni EBITDA); 2) nota de Envestnet y prensa de Calastone (sin múltiplos); 3) búsqueda web de múltiplos (sin cifras fiables)', decision: 'Omitido' },
    { seccion: 'consenso', campo: 'estimaciones de 2028 y 2029 y EBITDA de consenso', tipo: 'Complemento', intentos: '1) MarketScreener (no abre); 2) Stock Analysis (2028 y 2029 de pago); 3) Yahoo Finance análisis (no carga) y búsqueda web (cifras de modelos propios, no consenso)', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Seeking Alpha: canal RSS de BR (análisis y noticias, mar-oct 2026)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-14', url: 'https://seekingalpha.com/api/sa/combined/BR.xml' },
  { id: 2, titulo: 'Stocktwits: flujo de mensajes de $BR (30 mensajes, jun-oct 2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-14', url: 'https://api.stocktwits.com/api/2/streams/symbol/BR.json' },
  { id: 3, titulo: 'Why Broadridge Financial Solutions stock is soaring (resultados del 4T)', editor: 'The Motley Fool', tipo: 'Foros y redes', fecha: '2026-08-04', url: 'https://www.fool.com/investing/2026/08/04/why-broadridge-financial-solutions-stock-is-soarin/' },
  { id: 4, titulo: 'Broadridge Financial Solutions (BR) Fell Amid Concerns Over AI Disruption and Tokenized Equities', editor: 'Insider Monkey', tipo: 'Foros y redes', fecha: '2026-07-24', url: 'https://www.insidermonkey.com/blog/broadridge-financial-solutions-br-fell-amid-concerns-over-ai-disruption-and-tokenized-equities-1804258/' },
];
const E = {
  _estado: 'Completo con lo que abre en la nube (RSS de Seeking Alpha, API de Stocktwits, Motley Fool, Insider Monkey). Reddit no abre.',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Seeking Alpha (análisis)', fecha: '2026-09', n_comentarios: 12, tono: 'Positivo', resumen: 'Desde marzo los títulos de los análisis pasan de «el apocalipsis del SaaS ha creado un punto de entrada» a «los bajistas se han adelantado» (subida de recomendación en agosto), «monetiza su propia disrupción» y «construye la infraestructura de la tokenización» (29-sep) [1].' },
      { plataforma: 'Stocktwits', fecha: '2026-10', n_comentarios: 30, tono: 'Positivo', resumen: 'Mensajes mayoritariamente alcistas de particulares: compras entre 135 y 170 USD, celebración de los volúmenes del repo tokenizado (7,5 billones en septiembre) y del dividendo; algunos venden en la subida de agosto y uno recuerda el aviso de Reg E-Delivery del 10-K [2].' },
      { plataforma: 'The Motley Fool', fecha: '2026-08', n_comentarios: 1, tono: 'Positivo', resumen: 'Tras subir un 7 % el día de resultados, el autor dice que el miedo a la tokenización y a la digitalización de las comunicaciones reguladas puede ser exagerado y ya está en el precio [3].' },
      { plataforma: 'Insider Monkey (cartas de fondos)', fecha: '2026-07', n_comentarios: 1, tono: 'Negativo', resumen: 'Recoge la caída de Broadridge en el 2T por miedo a la disrupción de la IA y a las acciones tokenizadas, en la carta de un gestor de pequeñas y medianas [4].' },
    ],
    temas: [
      { tema: 'La IA y el «apocalipsis del SaaS» se comen el negocio', postura: 'Dividida', peso: 'Alto', contraste: 'El castigo fue de todo el software (6 % el 3-feb y otro 6 % el 6-feb); las cifras no muestran daño: recurrente +8 % y ventas cerradas récord en 2026 [1, 4].' },
      { tema: 'Tokenización: amenaza u oportunidad', postura: 'Alcista', peso: 'Alto', contraste: 'El repo tokenizado crece rápido pero sus ingresos son pequeños (16,5 M USD de servicios en Canton en 2026); el riesgo de desintermediación está en el 10-K [2].' },
      { tema: 'Reg E-Delivery y el fin del papel', postura: 'Bajista', peso: 'Medio', contraste: 'La empresa espera una rebaja «modesta» del recurrente durante 2-3 años y mejor margen; lo incorporamos al caso base [2].' },
      { tema: 'Dividendo y recompras', postura: 'Alcista', peso: 'Medio', contraste: 'Dividendo +12 % (20.º año de subida) y recompra nueva de 1.500 M USD: cierto [2].' },
    ],
    lectura: 'El sentimiento ha pasado de la capitulación de febrero-junio (mínimo de 133,83 USD el 22-jun) a un optimismo prudente tras los resultados de agosto. No es extremo: los particulares compran la caída y hablan de tokenización, los analistas están repartidos (4 comprar y 4 mantener). El riesgo que los foros recogen y que pesa en la tesis es Reg E-Delivery; el de la IA se discute más como contagio del sector que con datos de la empresa. No contradice al consenso de analistas.',
    confianza: 'Media',
  },
  fuentes: fE,
  huecos: [],
};

guarda('A', A); guarda('B', B); guarda('C', C); guarda('D', D); guarda('E', E);
console.log('Notas A-E escritas');
