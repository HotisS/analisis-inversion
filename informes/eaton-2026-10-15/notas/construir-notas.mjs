// Escribe las notas A-E de Eaton (corte 2026-10-15) a partir del XBRL de la SEC (cuentas-xbrl.json y companyfacts),
// las notas de prensa de resultados (8-K 99.1), los 10-K 2025 y 2023, el 10-Q del 2T26, el proxy de 2026, form4.mjs, bolsa.mjs,
// MarketScreener y foros. Cada nota cita solo con [n] de su propia lista. Ejecutar: node notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const X = JSON.parse(fs.readFileSync(path.join(dir, 'cuentas-xbrl.json'), 'utf8'));
const BOLSA = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const E8 = 'https://www.sec.gov/Archives/edgar/data/1551182';
const r1 = (v) => (v == null ? null : Math.round(v * 10) / 10);
const ANIOS = ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'];

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Form 10-K 2025 (cuentas auditadas, segmentos, geografías, deuda, cartera de pedidos, empleados)', editor: 'Eaton Corporation plc / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-26', url: `${E8}/000155118226000007/etn-20251231.htm` },
  { id: 2, titulo: 'Hechos XBRL (companyfacts): cuenta, balance y flujos 2018-2025 y trimestres hasta el 2T26', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0001551182.json' },
  { id: 3, titulo: 'Eaton Reports Record Second Quarter 2026 Results (8-K, anexo 99)', editor: 'Eaton Corporation plc / SEC EDGAR', tipo: 'Primaria', fecha: '2026-07-31', url: `${E8}/000155118226000027/etn06302026exhibit99.htm` },
  { id: 4, titulo: 'Eaton Reports Record First Quarter 2026 Results (8-K, anexo 99)', editor: 'Eaton Corporation plc / SEC EDGAR', tipo: 'Primaria', fecha: '2026-05-05', url: `${E8}/000155118226000010/etn03312026exhibit99.htm` },
  { id: 5, titulo: 'Eaton Reports Record Fourth Quarter 2025 Results and Issues Guidance on 2026 Outlook (8-K, anexo 99)', editor: 'Eaton Corporation plc / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-03', url: `${E8}/000155118226000002/etn12312025exhibit99.htm` },
  { id: 6, titulo: 'Eaton Reports Record Third Quarter 2025 Results (8-K, anexo 99)', editor: 'Eaton Corporation plc / SEC EDGAR', tipo: 'Primaria', fecha: '2025-11-04', url: `${E8}/000155118225000033/etn09302025exhibit99.htm` },
  { id: 7, titulo: 'Form 10-Q del 2T26 (balance a 30-jun-2026, compras de Boyd Thermal y Ultra PCS, deuda)', editor: 'Eaton Corporation plc / SEC EDGAR', tipo: 'Primaria', fecha: '2026-07-31', url: `${E8}/000155118226000030/etn-20260630.htm` },
  { id: 8, titulo: 'Form 10-K 2023 (segmentos 2021-2023 con Hydraulics, Vehicle y eMobility)', editor: 'Eaton Corporation plc / SEC EDGAR', tipo: 'Primaria', fecha: '2024-02-29', url: `${E8}/000155118224000006/etn-20231231.htm` },
];
const cx = Object.fromEntries(X.financieros.cuenta.map((r) => [r.periodo, r]));
const bx = Object.fromEntries(X.balance.historico.map((r) => [r.periodo, r]));
const fx = Object.fromEntries(X.flujos.historico.map((r) => [r.periodo, r]));
// Intereses netos (XBRL InterestIncomeExpenseNet 2018-2023; InterestExpenseNonoperating 2024-2025; 10-K 2025, nota de segmentos)
const interes = { 2018: 258, 2019: 199, 2020: 149, 2021: 144, 2022: 144, 2023: 151, 2024: 130, 2025: 241 };
// Inversiones a corto plazo (XBRL ShortTermInvestments): la caja del puente las incluye
const inversiones = { 2018: 157, 2019: 221, 2020: 664, 2021: 271, 2022: 261, 2023: 2121, 2024: 1525, 2025: 181 };
// Deuda bruta = deuda a corto + deuda a largo (con la parte corriente), XBRL ShortTermBorrowings + LongTermDebt
const deuda = { 2018: 7107 + 414, 2019: 8067 + 255, 2020: 8057 + 1, 2021: 8566 + 13, 2022: 8331 + 324, 2023: 9261 + 8, 2024: 9152 + 0, 2025: 9894 + 1 };
// Gastos de reestructuración y de compras/ventas antes de impuestos dentro del EBITDA (10-K; notas de prensa): se tratan como recurrentes salvo los de 2026
const cuenta = ANIOS.map((y) => {
  const c = cx[y];
  const ebit = c.bai + interes[y];
  return { periodo: y, ingresos: c.ingresos, coste_ventas: c.coste_ventas, gastos_generales: c.gastos_generales, ebitda: ebit + c.amortizaciones, amortizaciones: c.amortizaciones, ebit, resultado_financiero: -interes[y], bai: c.bai, impuestos: c.impuestos, minoritarios: c.minoritarios, beneficio_neto: c.beneficio_neto, gastos_financieros: interes[y], participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: c.bpa, dpa: c.dpa, dpa_extraordinario: 0, acciones_diluidas: c.acciones_diluidas };
});
const historico = ANIOS.map((y) => {
  const b = bx[y];
  return { periodo: y, activo_total: b.activo_total, activo_corriente: b.activo_corriente, pasivo_corriente: b.pasivo_corriente, pasivo_total: b.pasivo_total, fondo_comercio: b.fondo_comercio, intangibles: b.intangibles, inmovilizado_material: b.inmovilizado_material, existencias: b.existencias, clientes: b.clientes, proveedores: b.proveedores, activos_contrato: null, pasivos_contrato: b.pasivos_contrato ?? null, caja: b.caja + inversiones[y], deuda_financiera: deuda[y], arrendamientos: 0, patrimonio_neto: b.patrimonio_neto, minoritarios: b.minoritarios, reservas: b.reservas };
});
const flujos = ANIOS.map((y) => {
  const f = fx[y];
  return { periodo: y, flujo_operativo: f.flujo_operativo, capex: f.capex, pagos_arrendamientos: 0, adquisiciones: Math.max(0, f.adquisiciones ?? 0), desinversiones: f.desinversiones ?? 0, dividendos: f.dividendos, recompras: f.recompras, emision_acciones: f.emision_acciones ?? 0, intereses_en_financiacion: 0 };
});
// Desinversiones grandes que el XBRL no recoge en el concepto elegido: Lighting (2020, 1.400 M) e Hydraulics (2021, 3.100 M) (10-K 2021 y 2022)
const fl2020 = flujos.find((f) => f.periodo === '2020'); fl2020.desinversiones = 1412;
const fl2021 = flujos.find((f) => f.periodo === '2021'); fl2021.desinversiones = 3126;

const seg = (nombre, descripcion, filas) => ({ nombre, descripcion, tipo_resultado: 'EBIT', historico: filas.map(([periodo, ingresos, resultado]) => ({ periodo, ingresos, resultado })) });
const A = {
  _estado: 'Completo. Cuentas 2018-2025 del XBRL de la SEC comprobadas con los 10-K 2025 y 2023 y las notas de resultados; LTM a junio de 2026 con las notas del 1T26 y 2T26.',
  negocio: {
    segmentos: [
      seg('Electrical Americas', 'Cuadros, protección de circuitos, SAI trifásicos, distribución de potencia y servicios en América; centros de datos, edificios, redes y residencial', [['2021', 7242, 1495], ['2022', 8497, 1913], ['2023', 10098, 2675], ['2024', 11436, 3455], ['2025', 13276, 3972]]),
      seg('Electrical Global', 'Lo mismo fuera de América, más equipos para zonas peligrosas y, desde marzo de 2026, Boyd Thermal (refrigeración líquida)', [['2021', 5516, 1034], ['2022', 5848, 1134], ['2023', 6084, 1176], ['2024', 6248, 1149], ['2025', 6815, 1323]]),
      seg('Aerospace', 'Sistemas de combustible, hidráulicos y de potencia para aviones civiles y militares; Ultra PCS desde enero de 2026', [['2021', 2648, 580], ['2022', 3039, 705], ['2023', 3413, 780], ['2024', 3744, 859], ['2025', 4249, 1013]]),
      seg('Mobility (Vehicle + eMobility)', 'Transmisiones, embragues, válvulas y electrónica de potencia para vehículos; se separa con Dana en el 1T27', [['2021', 2922, 420], ['2022', 3368, 444], ['2023', 3601, 461], ['2024', 3452, 495], ['2025', 3109, 405]]),
      seg('Hydraulics (vendido)', 'Vendido a Danfoss en agosto de 2021', [['2021', 1300, 177]]),
    ],
    geografias: [
      { nombre: 'Estados Unidos', peso_pct: 62.4 }, { nombre: 'Europa', peso_pct: 18.5 }, { nombre: 'Asia-Pacífico', peso_pct: 9.9 }, { nombre: 'Latinoamérica', peso_pct: 5.3 }, { nombre: 'Canadá', peso_pct: 3.9 },
    ],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Cartera de pedidos total', valor_anterior: '≈ 15.300 M USD (dic-24, cálculo inverso)', valor_actual: '19.800 M USD (dic-25)', variacion: '+29 % Eléctrico, +16 % Aeroespacial', comentario: 'El 69 % se entrega en 12 meses [1, 5]. En junio de 2026 la cartera eléctrica crecía un 43 % y la aeroespacial un 28 % [3].' },
      { kpi: 'Pedidos (media móvil 12 meses, Electrical Americas)', valor_anterior: '+11 % (3T25, aprox.)', valor_actual: '+41 % orgánico (2T26)', variacion: 'Aceleración', comentario: 'Electrical Global +33 %, Aeroespacial +17 % [3].' },
      { kpi: 'Relación pedidos/ventas 12 meses (Eléctrico)', valor_anterior: '1,1 (4T25)', valor_actual: '1,2 (2T26)', variacion: '+0,1', comentario: 'Aeroespacial también 1,2 [3, 5].' },
      { kpi: 'Margen de segmentos', valor_anterior: '24,5 % (2025)', valor_actual: '23,1 % (2T26); guía 2026 24,1-24,5 %', variacion: '−80 pb interanual en el 2T', comentario: 'Boyd Thermal y la subida de capacidad diluyen; Electrical Americas 27,5 % en el 2T26, +190 pb sobre el 1T [3].' },
      { kpi: 'Crecimiento orgánico', valor_anterior: '8 % (2025)', valor_actual: '14 % (2T26); guía 2026 11-13 %', variacion: '+6 puntos', comentario: 'La guía de crecimiento orgánico se subió dos veces: 7-9 % en febrero, 9-11 % en mayo y 11-13 % en julio [3, 4, 5].' },
    ],
  },
  financieros: {
    cuenta,
    ltm: (() => {
      // LTM jun-26 = 2025 + 1S26 − 1S25 (notas de prensa del 2T26 y XBRL)
      const ing = 27448 + 15982 - 13404;
      const bai = 4932 + 2251 - 2363;
      const intn = 241 + 307 - 103;
      const ebit = bai + intn;
      const da = 1006 + (272 + 134 + 255) - (232 + 121 + 129); // D&A 1S26 ≈ 1T26 272 + dep. 2T26 134 + amort. 2T26 255; 1S25 ≈ 232 + 121 + 129
      const bn = 4087 + 1687 - 1945;
      return { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: ing, ebitda: ebit + da, ebit, beneficio_neto: bn, bpa: r1((10.45 + 4.33 - 4.96) * 100) / 100, dpa: 4.28, dpa_extraordinario: 0, fcf: 3553 + (507 - 193 + 874) - (238 - 147 + 716), participadas_en_ebitda: null, no_recurrentes_en_ebitda: null };
    })(),
    cambios_perimetro: [
      { periodo: '2020', descripcion: 'Venta de Lighting a Signify (marzo de 2020, ≈1.400 M USD) y compra de Tripp Lite anunciada; ventas −17 % por la pandemia y la venta.' },
      { periodo: '2021', descripcion: 'Compras de Tripp Lite y Cobham Mission Systems (≈4.500 M USD) y venta de Hydraulics a Danfoss (agosto, 3.300 M): perímetros no comparables con 2020.' },
      { periodo: '2025', descripcion: 'Fibrebond (abril, 1.430 M USD) y Resilient Power (agosto); Boyd Thermal (9.550 M) y Ultra PCS (1.530 M) entran en 2026: el balance de 2026 duplica intangibles.' },
    ],
  },
  trimestres: {
    items: [
      { periodo: '3T24', ingresos: 6345, crecimiento_pct: 7.9, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 2.53, vs_consenso: null },
      { periodo: '4T24', ingresos: 6240, crecimiento_pct: 4.6, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 2.45, vs_consenso: null },
      { periodo: '1T25', ingresos: 6377, crecimiento_pct: 7.3, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 2.45, vs_consenso: null },
      { periodo: '2T25', ingresos: 7028, crecimiento_pct: 10.7, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 2.51, vs_consenso: null },
      { periodo: '3T25', ingresos: 6988, crecimiento_pct: 10.1, crecimiento_organico_pct: 7, ebitda: null, margen_ebitda_pct: null, bpa: 2.59, vs_consenso: null },
      { periodo: '4T25', ingresos: 7055, crecimiento_pct: 13.1, crecimiento_organico_pct: 9, ebitda: null, margen_ebitda_pct: null, bpa: 2.90, vs_consenso: null },
      { periodo: '1T26', ingresos: 7451, crecimiento_pct: 16.8, crecimiento_organico_pct: 10, ebitda: null, margen_ebitda_pct: null, bpa: 2.22, vs_consenso: null },
      { periodo: '2T26', ingresos: 8531, crecimiento_pct: 21.4, crecimiento_organico_pct: 14, ebitda: null, margen_ebitda_pct: null, bpa: 2.11, vs_consenso: 'Superior' },
    ],
  },
  balance: {
    historico,
    vencimientos: [{ anio: '2026', importe: 1136 }, { anio: '2027', importe: 706 }, { anio: '2028', importe: 504 }, { anio: '2029', importe: 203 }, { anio: '2030', importe: 1206 }, { anio: '2031+', importe: 6140 }],
    liquidez: 'Caja e inversiones a corto 695 M USD a 30-jun-2026; línea de crédito a 5 años de 4.000 M (ampliada en febrero de 2026, vence en 2030) que respalda un programa de pagarés de 4.000 M, del que había 2.091 M dispuestos como deuda a corto [3, 7].',
    rating: 'S&P A-/A-2 y Moody\'s A3/P-2, perspectiva estable (10-K 2025) [1]',
    coste_deuda_pct: 4.3,
    vida_media_anios: null,
  },
  flujos: { historico: flujos },
  calidad: { auditor: 'Ernst & Young LLP', anios_auditor: null, opinion: 'Favorable (cuentas y control interno, 2025)' },
  fuentes: fA,
  huecos: [
    { seccion: 'trimestres', campo: 'EBITDA trimestral y comparación con el consenso previo', tipo: 'Complemento', intentos: '1) XBRL trimestral: solo da la amortización del 1T de cada año; 2) notas de prensa: dan el beneficio de segmentos, no el EBITDA; 3) consenso previo trimestral: de pago', decision: 'Omitido' },
    { seccion: 'balance', campo: 'vida_media_anios', tipo: 'Complemento', intentos: '1) Nota 9 del 10-K 2025: lista de bonos sin vida media; 2) 10-Q 2T26; 3) cálculo con vencimientos: los de 2031+ no vienen por año', decision: 'Omitido' },
  ],
};
// Corrige el 4T25 y 4T24 (año menos tres trimestres) y deja el BPA del 4T25 = 10,45 − 2,45 − 2,51 − 2,59 = 2,90
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Data Center Physical Infrastructure Market Forecast to Reach $120 Billion by 2030', editor: "Dell'Oro Group", tipo: 'Sectorial', fecha: '2026-08-19', url: 'https://www.delloro.com/news/data-center-physical-infrastructure-market-forecast-to-reach-120-billion-by-2030/' },
  { id: 2, titulo: 'Data Center Physical Infrastructure Market Reaches $10.9 Billion in 4Q 2025, Up 20 Percent Y/Y', editor: "Dell'Oro Group", tipo: 'Sectorial', fecha: '2026-03-19', url: 'https://www.delloro.com/news/data-center-physical-infrastructure-market-reaches-10-9-billion-in-4q-2025-up-20-percent-y-y/' },
  { id: 3, titulo: 'Energy and AI, resumen ejecutivo', editor: 'Agencia Internacional de la Energía', tipo: 'Sectorial', fecha: '2025-04', url: 'https://www.iea.org/reports/energy-and-ai/executive-summary' },
  { id: 4, titulo: 'Eaton signs agreement to acquire Boyd Thermal', editor: 'Eaton', tipo: 'Primaria', fecha: '2025-11-03', url: 'https://www.eaton.com/us/en-us/company/news-insights/news-releases/2025/eaton-signs-agreement-to-acquire-boyd-thermal--expanding-solutio.html' },
  { id: 5, titulo: 'Why invest in Eaton (objetivos 2030 del día del inversor de marzo de 2025)', editor: 'Eaton', tipo: 'Primaria', fecha: '2025-03', url: 'https://images.eaton.com/nl/en-gb/company/investor-relations/why-invest-in-eaton.html' },
  { id: 6, titulo: "Eaton's Growth Targets Look Achievable, Analyst Raises EPS Forecast (BofA: centros de datos ≈19 % de las ventas)", editor: 'Benzinga', tipo: 'Analistas', fecha: '2025-03', url: 'https://www.benzinga.com/analyst-ratings/analyst-color/25/03/44361268/eatons-growth-targets-look-achievable-analyst-raises-eps-forecast-for-2026-2027' },
  { id: 7, titulo: 'Análisis value de Vertiv del repositorio (competidores y transacciones, cifras de sus cuentas a 7-oct-2026)', editor: 'Repositorio analisis-inversion', tipo: 'Analistas', fecha: '2026-10-07', url: 'informes/vertiv-2026-10-07/datos-v4.json' },
  { id: 8, titulo: 'Form 10-K 2025 de Eaton (competencia, segmentos)', editor: 'Eaton Corporation plc / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-26', url: `${E8}/000155118226000007/etn-20251231.htm` },
];
const B = {
  _estado: 'Completo con perímetro estimado: no hay una fuente gratuita del mercado total de equipos eléctricos de baja y media tensión.',
  competencia: {
    competidores: [
      { nombre: 'Schneider Electric (Energy Management)', pais: 'Francia', ticker: 'SU', ingresos: 38928, cuota_pct: null, margen_ebit_pct: 21.8, comentario: 'Líder mundial en distribución eléctrica y SAI; más peso en Europa y China; compró Motivair (refrigeración líquida) en 2024 [7].' },
      { nombre: 'ABB (Electrification)', pais: 'Suiza', ticker: 'ABBN', ingresos: 17357, cuota_pct: null, margen_ebit_pct: 23.5, comentario: 'Fuerte en media tensión y Europa; menos expuesto a SAI de centros de datos en EE. UU. [7].' },
      { nombre: 'Vertiv', pais: 'EE. UU.', ticker: 'VRT', ingresos: 11480, cuota_pct: null, margen_ebit_pct: null, comentario: 'Especialista en centros de datos (SAI, térmica); rival directo en refrigeración líquida tras Boyd; ventas de los 12 meses a junio de 2026 [7].' },
      { nombre: 'Johnson Controls', pais: 'Irlanda', ticker: 'JCI', ingresos: 23596, cuota_pct: null, margen_ebit_pct: 17.0, comentario: 'Enfriadoras y climatización de edificios; competidor solo en la parte térmica [7].' },
      { nombre: 'nVent Electric', pais: 'Irlanda', ticker: 'NVT', ingresos: 3893, cuota_pct: null, margen_ebit_pct: 15.8, comentario: 'Armarios, refrigeración líquida y conexiones; más pequeño [7].' },
    ],
  },
  fuentes: fB,
};
guarda('B', B);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Proxy statement 2026 (DEF 14A): consejo, remuneración 2025, accionistas', editor: 'Eaton Corporation plc / SEC EDGAR', tipo: 'Primaria', fecha: '2026-03-13', url: `${E8}/000119312526105117/etn-20260312.htm` },
  { id: 2, titulo: '8-K de resultados de la junta del 22-abr-2026 (Item 5.07)', editor: 'Eaton Corporation plc / SEC EDGAR', tipo: 'Primaria', fecha: '2026-04-23', url: `${E8}/000114036126016399/ef20071273_8k.htm` },
  { id: 3, titulo: 'Form 4 presentados entre el 15-oct-2025 y el 15-oct-2026 (form4.mjs)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001551182&type=4' },
  { id: 4, titulo: '8-K: nombramiento de David B. Foster como director financiero (Item 5.02)', editor: 'Eaton Corporation plc / SEC EDGAR', tipo: 'Primaria', fecha: '2026-03-02', url: `${E8}/000114036126007206/ef20066779_8k.htm` },
  { id: 5, titulo: '8-K: salida anunciada del director financiero Olivier Leonetti (anexo 99.1)', editor: 'Eaton Corporation plc / SEC EDGAR', tipo: 'Primaria', fecha: '2025-11-20', url: `${E8}/000114036125042797/ef20059654_ex99-1.htm` },
  { id: 6, titulo: '8-K: cambio de responsable contable (Item 5.02)', editor: 'Eaton Corporation plc / SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-05', url: `${E8}/000114036126038523/ef20083229_8k.htm` },
  { id: 7, titulo: 'Notas de resultados del 3T25, 4T25, 1T26 y 2T26 (guía y cumplimiento)', editor: 'Eaton Corporation plc / SEC EDGAR', tipo: 'Primaria', fecha: '2026-07-31', url: `${E8}/000155118226000027/etn06302026exhibit99.htm` },
];
const ind = (nombre, cargo, desde, comisiones = null) => ({ nombre, cargo, tipo: 'Independiente', desde, comisiones });
const C = {
  _estado: 'Completo salvo comisiones por consejero (el proxy las da en gráficos).',
  directivos: {
    equipo: [
      { nombre: 'Paulo Ruiz', cargo: 'Consejero delegado', desde: '2025', participacion_pct: 0.01, trayectoria: 'Entró en 2019 como presidente de Hydraulics; después Energy Solutions and Services (2021-22), director de operaciones del sector Industrial (2022-24) y del sector Eléctrico; consejero delegado desde el 1-jun-2025 [1]. Ha cerrado Boyd Thermal, Ultra PCS y la separación de Mobility en su primer año.' },
      { nombre: 'David B. Foster', cargo: 'Director financiero', desde: '2026', participacion_pct: null, trayectoria: 'En Eaton de 1993 a 2022 (planificación, control, tesorería, fusiones); asesor externo de la separación de Mobility desde julio de 2025; director financiero desde el 2-mar-2026, tras la salida de Olivier Leonetti [4, 5].' },
      { nombre: 'Gregory R. Page', cargo: 'Presidente no ejecutivo', desde: '2017', participacion_pct: null, trayectoria: 'Ex presidente y consejero delegado de Cargill; consejero coordinador 2022-2025 y presidente no ejecutivo desde el 1-jun-2025, cuando se separaron los cargos [1].' },
      { nombre: 'Heath B. Monesmith', cargo: 'Alto directivo (sector Eléctrico)', desde: null, participacion_pct: null, trayectoria: 'Uno de los cinco consejeros ejecutivos con remuneración publicada en el proxy; vendió acciones por 15,8 M USD en los últimos 12 meses [1, 3].' },
    ],
    historial_guidance: [
      { anio: '2025', guia: 'BPA ajustado 11,97-12,17 USD y crecimiento orgánico 8,5-9,5 % (guía del 3T25)', real: 'BPA ajustado 12,07; orgánico 8 %', cumplida: 'Parcial' },
      { anio: '2026 (en curso)', guia: 'Feb-26: orgánico 7-9 %, margen de segmentos 24,6-25,0 %, BPA 11,57-12,07 (ajustado 13,00-13,50)', real: 'Jul-26: orgánico 11-13 %, margen 24,1-24,5 %, BPA 10,36-10,56 (ajustado 13,40-13,60)', cumplida: 'Parcial' },
    ],
  },
  gobierno: {
    consejo: [
      { nombre: 'Gregory R. Page', cargo: 'Presidente no ejecutivo', tipo: 'Independiente', desde: '2017', comisiones: null },
      { nombre: 'Paulo Ruiz', cargo: 'Consejero delegado', tipo: 'Ejecutivo', desde: '2024', comisiones: null },
      ind('Gerald Johnson', 'Consejero', '2025'), ind('Silvio Napoli', 'Consejero', null), ind('Sandra Pianalto', 'Consejera', null),
      ind('Robert V. Pragada', 'Consejero', null), ind('Lori J. Ryerkerk', 'Consejera', null), ind('Andre Schulten', 'Consejero', null, 'Presidente de Auditoría'),
      ind('Karenann Terrell', 'Consejera', null), ind('Dorothy C. Thompson', 'Consejera', null), ind('Darryl L. Wilson', 'Consejero', null),
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: true, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 1,
    voto_remuneracion_pct: 92.7, voto_remuneracion_contra_pct: 7.0, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 7.92, fijo: 1.09, variable_corto: 1.16, variable_largo: 5.53, ratio_salario_medio: 128 },
    accionistas: [
      { nombre: 'The Vanguard Group', pct: 9.43, tipo: 'Institucional (índices)', variacion: 'Estable (13G/A de feb-2024)' },
      { nombre: 'BlackRock', pct: 7.04, tipo: 'Institucional (índices)', variacion: 'Estable (13G/A de feb-2024)' },
      { nombre: 'Consejeros y directivos (grupo)', pct: 0.1, tipo: 'Internos', variacion: 'Ventas netas de 22,6 M USD en 12 meses' },
    ],
    insiders: [
      { fecha: '2026-10-15', persona: 'Heath B. Monesmith (alto directivo)', operacion: 'Venta', acciones: null, importe: 15.78 },
      { fecha: '2026-10-15', persona: 'Paulo Ruiz (consejero delegado)', operacion: 'Venta', acciones: null, importe: 4.18 },
      { fecha: '2026-10-15', persona: 'Michael Yelton (directivo)', operacion: 'Venta', acciones: null, importe: 1.31 },
      { fecha: '2026-10-15', persona: 'Peter Denk (directivo)', operacion: 'Venta', acciones: null, importe: 0.84 },
      { fecha: '2026-10-15', persona: 'Gerald Johnson (consejero)', operacion: 'Compra', acciones: null, importe: 0.59 },
    ],
    alertas: [
      'Rotación en finanzas: el director financiero Olivier Leonetti salió en abril de 2026 tras dos años en el cargo [5]; su sucesor viene de fuera (consultor, ex directivo) [4]; el responsable contable cambió de puesto en octubre de 2026 [6]. No hay salvedades ni reexpresiones.',
      'Ventas de directivos por 22,6 M USD en 12 meses (ninguna bajo plan 10b5-1 según el Form 4) frente a una sola compra de un consejero (0,59 M) [3].',
    ],
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'Comisiones y año de entrada de cada consejero', tipo: 'Complemento', intentos: '1) Proxy 2026: tabla de comisiones en gráfico; 2) web de Eaton (gobierno): no abrió el texto; 3) 10-K Item 10: remite al proxy', decision: 'Omitido' },
  ],
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de ETN, SPY y XLI (precio, rentabilidades, betas, volatilidad, cierres anuales)', editor: 'Yahoo Finance (herramientas/bolsa.mjs)', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/ETN/history' },
  { id: 2, titulo: 'Eaton: Financial Data, Forecasts, Estimates and Valuation', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://www.marketscreener.com/quote/stock/EATON-CORPORATION-PLC-12029421/finances/' },
  { id: 3, titulo: 'Eaton: consenso de analistas (28 analistas, objetivo medio 486,05 USD) y cambios recientes de objetivo', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-15', url: 'https://www.marketscreener.com/quote/stock/EATON-CORPORATION-PLC-12029421/consensus/' },
  { id: 4, titulo: 'Market Yield on U.S. Treasury Securities at 10-Year Constant Maturity (DGS10): 5,21 % el 13-oct-2026', editor: 'Federal Reserve Bank of St. Louis (FRED)', tipo: 'Primaria', fecha: '2026-10-13', url: 'https://fred.stlouisfed.org/series/DGS10' },
  { id: 5, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026: 4,20 %', editor: 'Aswath Damodaran, NYU Stern', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 6, titulo: 'Comparables (Schneider, ABB, nVent, Trane, Hubbell, Johnson Controls, Vertiv): múltiplos de MarketScreener y ROIC de Stock Analysis a 7-oct-2026, llevados al cierre del 14-oct con la variación de precio', editor: 'MarketScreener / Stock Analysis (vía informe de Vertiv del repositorio)', tipo: 'Datos de mercado', fecha: '2026-10-07', url: 'informes/vertiv-2026-10-07/datos-v4.json' },
  { id: 7, titulo: 'Cierres del 7 y 14-oct-2026 de SU.PA, ABBN.SW, NVT, TT, HUBB, JCI y VRT', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/' },
  { id: 8, titulo: 'Eaton signs agreement to acquire Fibrebond Corporation', editor: 'Eaton', tipo: 'Primaria', fecha: '2025-03-11', url: 'https://www.eaton.com/us/en-us/company/news-insights/news-releases/2025/eaton-signs-agreement-to-acquire-fibrebond-corporation--expandin.html' },
  { id: 9, titulo: 'Eaton signs agreement to acquire Boyd Thermal', editor: 'Eaton', tipo: 'Primaria', fecha: '2025-11-03', url: 'https://www.eaton.com/us/en-us/company/news-insights/news-releases/2025/eaton-signs-agreement-to-acquire-boyd-thermal--expanding-solutio.html' },
  { id: 10, titulo: 'Oaktree has agreed to sell COL Group to Eaton for an enterprise value of €810 million', editor: 'Lincoln International', tipo: 'Prensa', fecha: '2026-09-29', url: 'https://www.lincolninternational.com/transactions/oaktree-has-agreed-to-sell-col-group-to-eaton-for-an-enterprise-value-of-810-million/' },
  { id: 11, titulo: 'Eaton to acquire COL Group (ventas previstas de ≈250 M EUR en 2027; cierre en el 1T27)', editor: 'DatacenterDynamics', tipo: 'Prensa', fecha: '2026-09-29', url: 'https://datacenterdynamics.com/en/news/eaton-to-acquire-col-group' },
  { id: 12, titulo: 'Eaton Advances 2030 Growth Strategy with Announcement to Combine Mobility Group with Dana Incorporated (valor de Mobility ≈5.100 M USD, 8,3x EBITDA ajustado 2026e)', editor: 'Eaton / Business Wire', tipo: 'Primaria', fecha: '2026-06-11', url: 'https://www.businesswire.com/news/home/20260611592639/en/Eaton-Advances-2030-Growth-Strategy-with-Announcement-to-Combine-Mobility-Group-with-Dana-Incorporated' },
  { id: 13, titulo: 'Notas de prensa de compras de nVent (Trachte, Avail EPG), Schneider (Motivair) y Vertiv (PurgeRite, UIG), recogidas en el informe de Vertiv del repositorio', editor: 'Empresas / SEC EDGAR', tipo: 'Primaria', fecha: '2026-09-02', url: 'informes/vertiv-2026-10-07/datos-v4.json' },
  { id: 14, titulo: 'Noticias de ETN en Seeking Alpha (RSS): «AI slowdown fears hammer data-center power and construction stocks» (14-sep), subida de UBS (8-sep), compra de COL (25-sep), resultados del 2T26 (31-jul)', editor: 'Seeking Alpha', tipo: 'Prensa', fecha: '2026-10-14', url: 'https://seekingalpha.com/api/sa/combined/ETN.xml' },
  { id: 15, titulo: 'Eaton (NYSE:ETN) Trading Down 7.6% – Time to Sell? (14-sep-2026)', editor: 'MarketBeat', tipo: 'Prensa', fecha: '2026-09-14', url: 'https://www.marketbeat.com/instant-alerts/price-eaton-nyse-etn-trading-down-76-time-to-sell-2026-09-14/' },
  { id: 16, titulo: 'Eaton Falls 5% Despite Strong Q1 Results, Raises FY26 Growth Outlook', editor: 'RTTNews', tipo: 'Prensa', fecha: '2026-05-05', url: 'https://www.rttnews.com/3647434/eaton-falls-5-despite-strong-q1-results-raises-fy26-growth-outlook.aspx' },
  { id: 17, titulo: 'Eaton (NYSE:ETN) stock price down 5.3%: here’s why (18-ago-2026)', editor: 'MarketBeat', tipo: 'Prensa', fecha: '2026-08-18', url: 'https://www.marketbeat.com/instant-alerts/eaton-nyseetn-stock-price-down-53-heres-why-2026-08-18/' },
  { id: 18, titulo: 'Eaton Corporation plc (ETN) dropped due to concerns over impact on AI supply chain from slower data centre expansion', editor: 'Yahoo Finance (carta de inversores)', tipo: 'Prensa', fecha: '2026-06', url: 'https://finance.yahoo.com/news/eaton-corporation-plc-etn-dropped-134730150.html' },
  { id: 19, titulo: 'Movimiento del precio de ETN (herramientas/movimiento.mjs y movimiento-precio.mjs, a 15-oct-2026)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/quote/ETN/history' },
];
const B0 = BOLSA.bolsa;
// Comparables a 7-oct (MarketScreener y Stock Analysis vía el informe de Vertiv), llevados al 14-oct con el precio (cap y PER × variación; EV con la deuda neta fija)
const vari = { SU: 1.0387, ABBN: 0.9875, NVT: 0.91, TT: 1.0086, HUBB: 0.9957, JCI: 0.9776, VRT: 222.83 / 253.14 };
const V = JSON.parse(fs.readFileSync(path.join(dir, '../../vertiv-2026-10-07/datos-v4.json'), 'utf8'));
const lleva = (e, k) => {
  const r = vari[k];
  const dnRel = e.dn_ebitda / e.ev_ebitda_ltm; // deuda neta / valor empresa
  const f = (1 - dnRel) * r + dnRel; // los múltiplos EV se mueven con (cap·r + DN)/(cap + DN)
  return { ...e, capitalizacion: Math.round(e.capitalizacion * r), ev_ventas: Math.round(e.ev_ventas * f * 100) / 100, ev_ebitda_ltm: r1(e.ev_ebitda_ltm * f), ev_ebitda_ntm: r1(e.ev_ebitda_ntm * f), per_ntm: r1(e.per_ntm * r), fcf_yield_pct: r1(e.fcf_yield_pct / r) };
};
const compsV = Object.fromEntries(V.comparables.empresas.map((e) => [e.ticker, e]));
const vk = V.calc.clave;
const vertiv = { nombre: 'Vertiv', ticker: 'VRT', pais: 'US', capitalizacion: vk.capitalizacion, ev_ventas: vk.ev_ventas_ltm, ev_ebitda_ltm: vk.ev_ebitda_ltm, ev_ebitda_ntm: vk.ev_ebitda_ntm, per_ntm: vk.per_ntm, crecimiento_pct: vk.crecimiento_tcac_pct, margen_ebitda_pct: vk.margen_ebitda_pct, roic_pct: vk.roic_pct, dn_ebitda: vk.dn_ebitda, fcf_yield_pct: vk.fcf_yield_pct };
const empresas = ['SU', 'ABBN', 'NVT', 'TT', 'HUBB', 'JCI'].map((k) => lleva(compsV[k], k)).concat([lleva(vertiv, 'VRT')]);
const D = {
  _estado: 'Completo. Precio: cierre del 14-oct-2026 (la sesión del 15-oct no había cerrado a la hora del análisis).',
  identificacion: {
    nombre: 'Eaton Corporation plc', nombre_corto: 'Eaton', ticker: 'ETN', isin: 'IE00B8KQN827', mercado: 'New York Stock Exchange', indice_referencia: 'S&P 500',
    pais: 'Irlanda (sede legal en Dublín; dirección operativa en Cleveland, EE. UU.)', pais_iso: 'IE', sector: 'Industria', industria: 'Componentes y equipos eléctricos', sede: 'Dublín (Irlanda)', fundacion: '1911', empleados: 97303, web: 'https://www.eaton.com',
    precio: BOLSA.identificacion.precio, fecha_precio: BOLSA.identificacion.fecha_precio, acciones: 389.5, capitalizacion_publicada: 159250, free_float_pct: 99.9,
    max_52s: BOLSA.identificacion.max_52s, min_52s: BOLSA.identificacion.min_52s, volumen_medio_diario: `≈ ${Math.round(BOLSA.volumen_3m.importe_dia_millones)} M USD/día (3 meses)`, proximos_resultados: '2026-11-03',
  },
  consenso: {
    estimaciones: [
      { periodo: '2026e', ingresos: 32884, ebitda: 7822, ebit: 6529, bpa: 11.25, dpa: 4.42, fuente: 'MarketScreener, 15-oct-2026 [2]' },
      { periodo: '2027e', ingresos: 36840, ebitda: 9128, ebit: 7863, bpa: 14.74, dpa: 4.70, fuente: 'MarketScreener, 15-oct-2026 [2]' },
      { periodo: '2028e', ingresos: 40412, ebitda: 10207, ebit: 8979, bpa: 17.48, dpa: 5.17, fuente: 'MarketScreener, 15-oct-2026 [2]' },
    ],
    recomendaciones: { n_analistas: 28, comprar: null, mantener: null, vender: null, po_medio: 486.05, po_min: 333.0, po_max: 534.0 },
    base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: 1.3,
  },
  bolsa: { ...B0, posicion_corta_pct: null },
  multiplos_historicos: {
    serie: BOLSA.cierres_ejercicio.filter((c) => ANIOS.includes(c.anio)).map((c) => ({ anio: c.anio, precio_cierre: c.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: c.anio === '2020' })),
  },
  comparables: { empresas },
  transacciones: {
    operaciones: [
      { fecha: '2025-11', objetivo: 'Boyd Thermal (refrigeración líquida)', comprador: 'Eaton', ev: 9500, ev_ventas: 5.6, ev_ebitda: 22.5, prima_pct: null, excluir: false, comentario: '22,5x el EBITDA ajustado de 2026e; ventas previstas de 1.700 M USD en 2026, 1.500 M de ellas en refrigeración líquida [9]. Cerrada el 12-mar-2026 por 9.550 M netos de caja.' },
      { fecha: '2025-03', objetivo: 'Fibrebond (salas eléctricas modulares)', comprador: 'Eaton', ev: 1400, ev_ventas: 3.7, ev_ebitda: 12.7, prima_pct: null, excluir: false, comentario: 'EBITDA ajustado de 2025e de 110 M y ventas de ≈378 M; múltiplos calculados por nosotros [8]. Más 240 M de bonus de retención.' },
      { fecha: '2026-09', objetivo: 'COL Group (celdas de media tensión sin SF6, Italia)', comprador: 'Eaton', ev: 919, ev_ventas: 3.2, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '810 M EUR (≈919 M USD) sobre ≈250 M EUR de ventas previstas en 2027 (EV/ventas 2027e, cálculo propio); cierre en el 1T27 [10, 11].' },
      { fecha: '2025-03', objetivo: 'Electrical Products Group (Avail)', comprador: 'nVent', ev: 975, ev_ventas: 2.6, ev_ebitda: 12.5, prima_pct: null, excluir: false, comentario: '12,5x el EBITDA de los 12 meses anteriores [13].' },
      { fecha: '2024-06', objetivo: 'Trachte (salas de control)', comprador: 'nVent', ev: 695, ev_ventas: 2.8, ev_ebitda: 12.0, prima_pct: null, excluir: false, comentario: '≈12x el EBITDA ajustado de 2024e [13].' },
      { fecha: '2025-11', objetivo: 'PurgeRite (servicios de refrigeración líquida)', comprador: 'Vertiv', ev: 1000, ev_ventas: null, ev_ebitda: 10.0, prima_pct: null, excluir: false, comentario: '≈10x el EBITDA de 2026e con sinergias [13].' },
      { fecha: '2026-09', objetivo: 'UtilityInnovation Group', comprador: 'Vertiv', ev: 1450, ev_ventas: null, ev_ebitda: 13.0, prima_pct: null, excluir: false, comentario: '≈13x el EBITDA de 2027e, más earn-out [13].' },
      { fecha: '2026-06', objetivo: 'Mobility de Eaton (combinación con Dana)', comprador: 'Dana (fusión inversa)', ev: 5100, ev_ventas: 1.6, ev_ebitda: 8.3, prima_pct: null, excluir: true, comentario: 'Venta de Eaton, no compra: 8,3x el EBITDA ajustado de 2026e; negocio de vehículos, sin relación con el eléctrico [12]. Fuera de la media.' },
    ],
  },
  fuentes: fD,
  huecos: [
    { seccion: 'consenso', campo: 'Desglose de recomendaciones (comprar/mantener/vender)', tipo: 'Complemento', intentos: '1) MarketScreener: solo la media («Comprar»); 2) Seeking Alpha: de pago; 3) Trendlyne: dato de mayo de 2026', decision: 'Omitido' },
    { seccion: 'bolsa', campo: 'posicion_corta_pct', tipo: 'Complemento', intentos: '1) Seeking Alpha cita a ETN entre las de menor posición corta (6-oct) sin cifra; 2) Stock Analysis no abre por curl; 3) FINRA: sin acceso directo', decision: 'Omitido' },
  ],
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Seeking Alpha, artículos sobre ETN (sep-oct 2026): «Strong Backlog And Margin Recovery Support The Buy Case», «My Momentum Formulas Scream Sell Overvalued Eaton», «Portfolio Transformation Is Working, But The Stock Is Not Cheap», «Strong Secular Growth, But Valuation Limits Upside»', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-14', url: 'https://seekingalpha.com/symbol/ETN/analysis' },
  { id: 2, titulo: 'Stocktwits, flujo de $ETN (30 mensajes, 7-15 oct 2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-15', url: 'https://api.stocktwits.com/api/2/streams/symbol/ETN.json' },
  { id: 3, titulo: 'Why Vertiv and Eaton are the ultimate AI infrastructure stocks (con aviso de valoración)', editor: 'The Motley Fool', tipo: 'Foros y redes', fecha: '2026-07-06', url: 'https://www.fool.com/investing/2026/07/06/why-vertiv-eaton-ultimate-infrastructure-ai/' },
  { id: 4, titulo: 'Is this AI data center stock a buy amid oversupply fears? (VRT)', editor: 'The Motley Fool', tipo: 'Foros y redes', fecha: '2026-05-22', url: 'https://fool.com/investing/2026/05/22/ai-data-center-stock-buy-oversupply-vrt/' },
  { id: 5, titulo: 'Eaton Mobility And Dana: Separating The Fast Growth From The Slow; Eaton: Data Center Growth Consistent, But Not Explosive', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-07-13', url: 'https://seekingalpha.com/symbol/ETN/analysis' },
];
const E = {
  _estado: 'Completo con lo que abre: Seeking Alpha (RSS y titulares), Stocktwits (API) y Motley Fool; Reddit da 403.',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Estable',
    revisadas: [
      { plataforma: 'Seeking Alpha (artículos)', fecha: '2026-10', n_comentarios: 8, tono: 'Dividido', resumen: 'De cuatro artículos de septiembre y octubre, uno pide comprar por la cartera y la recuperación del margen y tres avisan de que la valoración ya recoge el crecimiento [1].' },
      { plataforma: 'Stocktwits ($ETN)', fecha: '2026-10', n_comentarios: 30, tono: 'Dividido', resumen: '11 mensajes alcistas y 1 bajista marcados; se comentan compras grandes de opciones de compra a noviembre y, a la vez, «valoración hinchada» con objetivos de 320-340 [2].' },
      { plataforma: 'The Motley Fool', fecha: '2026-07', n_comentarios: 2, tono: 'Neutro', resumen: 'Eaton y Vertiv como la infraestructura de la IA, pero a 38x beneficios pasados cualquier frenazo de la IA las castigaría [3, 4].' },
      { plataforma: 'Seeking Alpha (Mobility y centros de datos)', fecha: '2026-07', n_comentarios: 2, tono: 'Positivo', resumen: 'La salida de Mobility se lee como una mejora de la calidad del grupo; el crecimiento en centros de datos se ve «constante, no explosivo» [5].' },
    ],
    temas: [
      { tema: 'Valoración frente al crecimiento de la IA', postura: 'Bajista', peso: 'Alto', contraste: 'Cotiza a ≈33x nuestro BPA GAAP de 2027e y a ≈30x el ajustado de 2026e: la preocupación es razonable y la recoge la regla a 12 meses.' },
      { tema: 'Frenazo o exceso de capacidad en centros de datos', postura: 'Dividida', peso: 'Alto', contraste: 'La cartera eléctrica crece un 43 % y los pedidos un 41 % en América (2T26): los datos aún no muestran frenazo, pero la acción cae con cada susto del sector (14-sep).' },
      { tema: 'Cartera de pedidos y margen', postura: 'Alcista', peso: 'Medio', contraste: 'Cierto en pedidos; el margen de segmentos baja en 2026 por Boyd (24,1-24,5 % frente al 24,5 % de 2025).' },
      { tema: 'Separación de Mobility', postura: 'Alcista', peso: 'Bajo', contraste: 'Mejora el crecimiento y el margen del grupo, pero resta ≈3 % del BPA de 2028 aunque se retiren acciones en el canje (estimación propia).' },
    ],
  },
  fuentes: fE,
};
guarda('E', E);
console.log('Notas A-E escritas');
