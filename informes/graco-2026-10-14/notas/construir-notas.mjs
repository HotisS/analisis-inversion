// Escribe las notas A-E de Graco (corte 2026-10-14). Hechos con fuente; los juicios van en propio.mjs / textos.mjs.
// Todas las notas comparten el mismo catálogo de fuentes (misma numeración): [A3] = [B3] = fuente 3.
import { writeFileSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const DIR = dirname(fileURLToPath(import.meta.url));
const w = (letra, obj) => writeFileSync(join(DIR, `${letra}.json`), JSON.stringify({ _estado: 'completa', ...obj }, null, 1));
const SEC = 'https://www.sec.gov/Archives/edgar/data/42888/';

export const FUENTES = [
  { id: 1, titulo: 'Annual Report on Form 10-K, ejercicio 2025 (cuentas, notas de segmentos, deuda, pensiones, adquisiciones, impuestos)', editor: 'Graco Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-02-17', url: SEC + '000004288826000081/ggg-20251226.htm' },
  { id: 2, titulo: 'Quarterly Report on Form 10-Q, segundo trimestre de 2026 (balance a 26-jun-26, MD&A, aranceles, recompras)', editor: 'Graco Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-07-22', url: SEC + '000004288826000123/ggg-20260626.htm' },
  { id: 3, titulo: 'Graco Reports Record Second Quarter Sales and Operating Earnings (comunicado del 2T26, Exhibit 99.1)', editor: 'Graco Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-07-22', url: SEC + '000004288826000123/ggg07222026exhibit991q2.htm' },
  { id: 4, titulo: 'Comunicado de resultados del 1T26 (Exhibit 99.1)', editor: 'Graco Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-04-22', url: SEC + '000004288826000098/ggg04222026exhibit991q1.htm' },
  { id: 5, titulo: 'Comunicado de resultados del 4T25 y del ejercicio 2025, guía 2026 (Exhibit 99.1 del 8-K)', editor: 'Graco Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-01-26', url: SEC + '000004288826000019/ggg01262026exhibit991q4.htm' },
  { id: 6, titulo: 'Comunicado de resultados del 3T25 (Exhibit 99.1)', editor: 'Graco Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2025-10-22', url: SEC + '000004288825000047/ggg10222025exhibit991q3.htm' },
  { id: 7, titulo: 'Quarterly Report on Form 10-Q, primer trimestre de 2026', editor: 'Graco Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-04-22', url: SEC + '000004288826000098/ggg-20260327.htm' },
  { id: 8, titulo: 'Quarterly Report on Form 10-Q, tercer trimestre de 2025', editor: 'Graco Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2025-10-22', url: SEC + '000004288825000047/ggg-20250926.htm' },
  { id: 9, titulo: 'Hechos XBRL de Graco Inc. (companyfacts: cuentas 2016-2025, deuda a corto, depreciación y amortización)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-14', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0000042888.json' },
  { id: 10, titulo: 'Proxy Statement 2026 (DEF 14A): consejo, remuneración, participaciones', editor: 'Graco Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-03-11', url: SEC + '000119312526101267/d93954ddef14a.htm' },
  { id: 11, titulo: 'Form 8-K: resultados de la junta del 24-abr-2026 (Item 5.07)', editor: 'Graco Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-04-27', url: SEC + '000004288826000101/ggg-20260424.htm' },
  { id: 12, titulo: 'Form 8-K: resultados de la junta del 25-abr-2025 (Item 5.07)', editor: 'Graco Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2025-04-28', url: SEC + '000004288825000018/ggg-20250425.htm' },
  { id: 13, titulo: 'Form 8-K: nombramiento de Sanjiv Gupta como director financiero (retiro de David Lowe)', editor: 'Graco Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-03-02', url: SEC + '000119312526085816/d104194d8k.htm' },
  { id: 14, titulo: 'Graco Inc. Enters into Definitive Agreement to Acquire Valco Melton (447 M USD, ≈14x EBITDA 2025, ventas ≈145 M)', editor: 'Graco Inc. (SEC EDGAR, 8-K)', tipo: 'Primaria', fecha: '2026-05-21', url: SEC + '000004288826000110/exhibit991052120268-k.htm' },
  { id: 15, titulo: 'Graco cierra la compra de Valco Melton (8-K, Exhibit 99.1)', editor: 'Graco Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-08-31', url: SEC + '000119312526377613/d100947dex991.htm' },
  { id: 16, titulo: 'Graco to acquire Corob (230 M EUR; ventas de 110 M EUR en 2023)', editor: 'Graco Inc. (SEC EDGAR, 8-K)', tipo: 'Primaria', fecha: '2024-09-26', url: SEC + '000119312524226949/d771161dex991.htm' },
  { id: 17, titulo: 'Form 4 de consejeros y directivos de Graco, oct-2025 a oct-2026 (compras y ventas)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-14', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000042888&type=4' },
  { id: 18, titulo: 'Form 8-K: dimisión del consejero Brett Carter', editor: 'Graco Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-02-13', url: SEC + '000004288826000036/ggg-20260212.htm' },
  { id: 19, titulo: 'Form 8-K: nombramiento de Richard B. Lewis como consejero (desde el 3-dic-2026)', editor: 'Graco Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-09-14', url: SEC + '000119312526389891/d127483d8k.htm' },
  { id: 20, titulo: 'Form 8-K: nombramiento de Steven B. Hedlund como consejero (desde el 10-sep-2026)', editor: 'Graco Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-06-15', url: SEC + '000004288826000114/ggg-20260612.htm' },
  { id: 21, titulo: 'Form 8-K: nombramiento de Andrea H. Simon como consejera', editor: 'Graco Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2025-10-30', url: SEC + '000004288825000055/ggg-20251030.htm' },
  { id: 22, titulo: 'Históricos diarios de GGG, ^GSPC y XLI (precio, rango, volumen, betas, cierres de ejercicio)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/GGG/history' },
  { id: 23, titulo: 'Graco (GGG) stock forecast: estimaciones de ventas y BPA 2026-2027, recomendaciones y precio objetivo', editor: 'Stock Analysis (S&P Global)', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/ggg/forecast/' },
  { id: 24, titulo: 'Graco Inc.: finanzas y estimaciones 2026-2028 (ventas, EBITDA, EBIT, BPA, DPA, caja neta)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/GRACO-INC-12752/finances/' },
  { id: 25, titulo: 'Market Yield on U.S. Treasury Securities at 10-Year (DGS10): 5,21 % el 13-oct-2026', editor: 'FRED, Federal Reserve Bank of St. Louis', tipo: 'Datos de mercado', fecha: '2026-10-13', url: 'https://fred.stlouisfed.org/series/DGS10' },
  { id: 26, titulo: 'Implied ERP by month (ERP T12m with sustainable payout, oct-2026: 4,20 %)', editor: 'A. Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 27, titulo: 'New Privately-Owned Housing Units Started (HOUST), 2021-ago-2026', editor: 'FRED / U.S. Census Bureau', tipo: 'Sectorial', fecha: '2026-09', url: 'https://fred.stlouisfed.org/series/HOUST' },
  { id: 28, titulo: 'Existing Home Sales (EXHOSLUSM495S), 2021-sep-2026', editor: 'FRED / National Association of Realtors', tipo: 'Sectorial', fecha: '2026-10', url: 'https://fred.stlouisfed.org/series/EXHOSLUSM495S' },
  { id: 29, titulo: '30-Year Fixed Rate Mortgage Average (MORTGAGE30US): 7,40 % el 8-oct-2026', editor: 'FRED / Freddie Mac', tipo: 'Sectorial', fecha: '2026-10-08', url: 'https://fred.stlouisfed.org/series/MORTGAGE30US' },
  { id: 30, titulo: 'Airless Paint Sprayers Market (1.974,7 M USD en 2025; 3.500 M en 2035; 5,9 % anual)', editor: 'WiseGuy Reports', tipo: 'Sectorial', fecha: '2025', url: 'https://www.wiseguyreports.com/reports/airless-paint-sprayers-market' },
  { id: 31, titulo: 'Spray Painting Machine Market (4.800 M USD en 2025; 7.700 M en 2035; 4,9 % anual; airless 41,2 %)', editor: 'Future Market Insights', tipo: 'Sectorial', fecha: '2025', url: 'https://www.futuremarketinsights.com/reports/spray-painting-machine-market' },
  { id: 32, titulo: 'Datos de cotización, PER adelantado y fundamentales de los comparables (Parker-Hannifin, IDEX, Nordson, Dover, Atlas Copco, Alfa Laval) a 14-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/NDSN/key-statistics' },
  { id: 33, titulo: 'Euro foreign exchange reference rates (USD 1,1195 por EUR el 14-oct-2026)', editor: 'Banco Central Europeo', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml' },
  { id: 34, titulo: 'Graco Q2 2026 earnings call transcript (23-jul-2026)', editor: 'Earnings Whispers', tipo: 'Primaria', fecha: '2026-07-23', url: 'https://earningswhispers.com/transcript/GGG/Q22026' },
  { id: 35, titulo: 'Danfoss formally completes US$3.3 billion acquisition of Eaton’s Hydraulics business (1.800 M USD de ventas en 2020)', editor: 'Danfoss (Business Wire)', tipo: 'Primaria', fecha: '2021-08-02', url: 'https://www.businesswire.com/news/home/20210802005512/en/Danfoss-Formally-Completes-US3.3-Billion-Acquisition-of-Eaton%e2%80%99s-Hydraulics-Business' },
  { id: 36, titulo: 'Ingersoll Rand to acquire Seepex GmbH (431,5 M EUR; ventas de unos 160 M EUR)', editor: 'Ingersoll Rand (Business Wire)', tipo: 'Primaria', fecha: '2021-06-21', url: 'https://www.businesswire.com/news/home/20210621005237/en/Ingersoll-Rand-to-Acquire-Seepex-GmbH-into-Precision-and-Science-Technologies-Segment/' },
  { id: 37, titulo: 'Baker Hughes to acquire Chart Industries (13.600 M USD de valor empresa; ventas 2024 de 4.200 M y EBITDA ajustado de 1.000 M)', editor: 'Hydrocarbon Engineering', tipo: 'Prensa', fecha: '2025-07-29', url: 'https://www.hydrocarbonengineering.com/gas-processing/29072025/baker-hughes-to-acquire-chart-industries/' },
  { id: 38, titulo: 'Seeking Alpha: titulares de análisis y noticias de GGG (RSS), abr-oct 2026', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-10', url: 'https://seekingalpha.com/api/sa/combined/GGG.xml' },
  { id: 39, titulo: 'Stocktwits: flujo de mensajes de $GGG, feb-oct 2026', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-13', url: 'https://api.stocktwits.com/api/2/streams/symbol/GGG.json' },
  { id: 40, titulo: 'MarketBeat: noticias, cambios de recomendación y movimientos institucionales de GGG (jul-oct 2026)', editor: 'MarketBeat', tipo: 'Foros y redes', fecha: '2026-10-14', url: 'https://www.marketbeat.com/stocks/NYSE/GGG/news/' },
  { id: 41, titulo: 'Graco Inc. Announces Third Quarter 2026 Earnings Conference Call (resultados el 21-oct-2026)', editor: 'Business Wire (vía Finviz)', tipo: 'Primaria', fecha: '2026-10-01', url: 'https://finviz.com/news/397935/graco-inc-announces-third-quarter-2026-earnings-conference-call' },
];
const F = FUENTES;

// ---------------- A: cuentas (del XBRL, corregido contra el 10-K) ----------------
const X = JSON.parse(readFileSync(join(DIR, 'cuentas-xbrl.json'), 'utf8'));
const ANIOS = ['2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'];
// Deuda bruta = deuda a largo (incluida la parte corriente) + «notes payable to banks» (ShortTermBankLoansAndNotesPayable), que cuentas.mjs no suma.
const DEUDA = { 2017: 226.0 + 6.6, 2018: 266.4 + 11.1, 2019: 164.3 + 7.7, 2020: 150.0 + 22.2, 2021: 150.0 + 43.5, 2022: 75.0 + 21.0, 2023: 0 + 30.0, 2024: 0 + 28.5, 2025: 1.6 + 23.1 };
// No recurrentes dentro del resultado de explotación (positivo = gasto): 2023 deterioro 7,8 − ajuste de contraprestación contingente 8,6; 2024 reorganización 7,7; 2025 ajuste de contraprestación contingente −14,1.
const NOREC = { 2023: -0.8, 2024: 7.7, 2025: -14.1 };
const DESINV = { 2024: 5.6, 2025: 11.2 };
const cuenta = X.financieros.cuenta.filter((r) => ANIOS.includes(r.periodo)).map((r) => {
  const { fin, ...c } = r;
  return { ...c, minoritarios: 0, participadas_en_ebitda: null, no_recurrentes_en_ebitda: NOREC[r.periodo] ?? null, dpa_extraordinario: 0 };
});
const balance = X.balance.historico.filter((r) => ANIOS.includes(r.periodo)).map((r) => {
  const { fin, ...b } = r;
  return { ...b, deuda_financiera: Math.round(DEUDA[r.periodo] * 10) / 10, arrendamientos: b.arrendamientos ?? 0, patrimonio_neto: Math.round((b.activo_total - b.pasivo_total) * 10) / 10, minoritarios: 0, activos_contrato: null };
});
const flujos = X.flujos.historico.filter((r) => ANIOS.includes(r.periodo)).map((r) => {
  const { fin, ...f } = r;
  return { ...f, pagos_arrendamientos: 0, desinversiones: DESINV[r.periodo] ?? 0 };
});

w('A', {
  negocio: {
    segmentos: [
      { nombre: 'Contractor', descripcion: 'Pulverizadores de pintura airless para profesionales y bricolaje, proporcionadoras de espuma y poliurea, marcado de vías, recubrimientos de tejados y, desde 2024, dosificadoras y mezcladoras de tinte (Corob) [1].', tipo_resultado: 'EBIT', historico: [{ periodo: '2023', ingresos: 985.7, resultado: 285.4 }, { periodo: '2024', ingresos: 988.9, resultado: 270.1 }, { periodo: '2025', ingresos: 1071.9, resultado: 270.3 }] },
      { nombre: 'Industrial', descripcion: 'Acabado líquido y en polvo (Gema), dosificación de selladores y adhesivos, bombas de proceso y lubricación; desde ago-26, Valco Melton (adhesivos para envases) [1, 15].', tipo_resultado: 'EBIT', historico: [{ periodo: '2023', ingresos: 1018.1, resultado: 356.0 }, { periodo: '2024', ingresos: 958.0, resultado: 311.7 }, { periodo: '2025', ingresos: 996.8, resultado: 334.6 }] },
      { nombre: 'Expansion Markets', descripcion: 'Bombas para semiconductores, válvulas de alta presión para petróleo y gas, y equipos de control ambiental (QED) [1].', tipo_resultado: 'EBIT', historico: [{ periodo: '2023', ingresos: 191.8, resultado: 43.3 }, { periodo: '2024', ingresos: 166.4, resultado: 31.5 }, { periodo: '2025', ingresos: 167.9, resultado: 41.5 }] },
      { nombre: 'Corporativo no asignado y ajustes', descripcion: 'Gastos centrales (pagos en acciones, costes de compras, morosidad), ajustes de contraprestación contingente y deterioros [1].', tipo_resultado: 'EBIT', historico: [{ periodo: '2023', ingresos: 0, resultado: -37.9 }, { periodo: '2024', ingresos: 0, resultado: -43.3 }, { periodo: '2025', ingresos: 0, resultado: -21.6 }] },
    ],
    geografias: [{ nombre: 'EE. UU.', peso_pct: 52.3 }, { nombre: 'Resto de América', peso_pct: 8.2 }, { nombre: 'Europa, Oriente Medio y África', peso_pct: 23.6 }, { nombre: 'Asia-Pacífico', peso_pct: 15.9 }],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Crecimiento orgánico (volumen y precio, sin divisa ni compras)', valor_anterior: '−4 % (2024)', valor_actual: '0 % (2025); −3 % en el 1S26', variacion: 'Guía 2026: «low single-digit»', comentario: '−6 % en el 1T26 (proyectos de acabado en polvo) y −1 % en el 2T26 [1, 2].' },
      { kpi: 'Pedidos orgánicos', valor_anterior: '«estables» (3T25)', valor_actual: '+5 % en el 2T26; media de seis semanas +14 %', variacion: 'Mejora', comentario: 'Cartera sin compras +28 % (57 M) desde inicio de año a 17-jul-26 [3, 34].' },
      { kpi: 'Contractor: crecimiento orgánico en América', valor_anterior: '−2 % (2025)', valor_actual: '+3 % (2T26)', variacion: 'Primer trimestre al alza en casi dos años', comentario: 'Pintura profesional y gran superficie; espuma y recubrimientos de protección por centros de datos e infraestructuras [2, 34].' },
      { kpi: 'Margen operativo del grupo', valor_anterior: '27,0 % (2024)', valor_actual: '27,9 % (2025); 29,6 % en el 2T26', variacion: '+0,9 puntos', comentario: 'El 2T26 incluye 9 M de devolución de aranceles IEEPA; 2025, 14,1 M de ganancia por contraprestación contingente [1, 2].' },
      { kpi: 'Ventas compradas', valor_anterior: '≈1 % (2024)', valor_actual: '5 % (2025); 4 % en el 1S26', variacion: 'Corob, Color Service, Radia; Valco Melton desde sep-26', comentario: 'Contractor sumó 100 M de ventas compradas en 2025 [1, 2].' },
      { kpi: 'Gasto en desarrollo de producto', valor_anterior: '87 M (4,1 % de las ventas, 2024)', valor_actual: '82 M (3,7 %, 2025)', variacion: '−5 M', comentario: 'Media de ≈4 % de las ventas en los últimos años [1].' },
    ],
    clientes: null,
    confianza: 'Alta',
  },
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-26', ingresos: 2267.2, ebitda: 743.4, ebit: 636.2, beneficio_neto: 533.5, bpa: 3.18, dpa: 1.16, dpa_extraordinario: 0, fcf: 629.6, participadas_en_ebitda: null, no_recurrentes_en_ebitda: -23.1 },
    cambios_perimetro: [
      { periodo: '2024', descripcion: 'Corob (dosificación de tintes, Italia), consolidada desde el 4-nov-2024: dos meses en la cuenta de 2024 y el año entero en el balance (290,7 M de contraprestación).' },
    ],
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '3T24', ingresos: 519.2, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.71, vs_consenso: null },
      { periodo: '4T24', ingresos: 548.7, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 154.6, margen_ebitda_pct: 28.2, bpa: 0.63, vs_consenso: null },
      { periodo: '1T25', ingresos: 528.3, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 168.7, margen_ebitda_pct: 31.9, bpa: 0.72, vs_consenso: null },
      { periodo: '2T25', ingresos: 571.8, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 184.6, margen_ebitda_pct: 32.3, bpa: 0.76, vs_consenso: null },
      { periodo: '3T25', ingresos: 543.4, crecimiento_pct: 4.7, crecimiento_organico_pct: -2.0, ebitda: 188.6, margen_ebitda_pct: 34.7, bpa: 0.82, vs_consenso: null },
      { periodo: '4T25', ingresos: 593.2, crecimiento_pct: 8.1, crecimiento_organico_pct: null, ebitda: 190.3, margen_ebitda_pct: 32.1, bpa: 0.79, vs_consenso: null },
      { periodo: '1T26', ingresos: 540.1, crecimiento_pct: 2.2, crecimiento_organico_pct: -6.0, ebitda: 166.4, margen_ebitda_pct: 30.8, bpa: 0.70, vs_consenso: 'Inferior' },
      { periodo: '2T26', ingresos: 590.6, crecimiento_pct: 3.3, crecimiento_organico_pct: -1.0, ebitda: 198.1, margen_ebitda_pct: 33.5, bpa: 0.87, vs_consenso: 'Superior' },
    ],
    confianza: 'Media',
  },
  balance: {
    historico: balance,
    vencimientos: [{ anio: '2026', importe: 24.7 }, { anio: '2029', importe: 0 }],
    liquidez: 'Caja de 507,6 M a 26-jun-26 (174 M fuera de EE. UU.) + 771 M de líneas comprometidas no dispuestas = 1.279 M; después pagó Valco Melton (447 M, 31-ago-26) [2, 15].',
    rating: 'Sin rating',
    coste_deuda_pct: 2.7,
    vida_media_anios: null,
    confianza: 'Alta',
  },
  flujos: { historico: flujos, confianza: 'Alta' },
  calidad: { auditor: 'Deloitte & Touche LLP', anios_auditor: 57, opinion: 'Favorable (sin salvedades)', confianza: 'Alta' },
  capital: {
    adquisiciones: [
      { anio: '2026', objetivo: 'Valco Melton (aplicación de adhesivos y control de calidad por visión; 650 empleados, ventas ≈145 M en 2025)', importe: 447, ev_ebitda: 14.0, financiacion: 'Caja', resultado: 'Cerrada el 31-ago-2026; incluye ≈40 M de valor actual de ventajas fiscales; entra en Industrial [14, 15].' },
      { anio: '2025', objetivo: 'Red Devil Equipment (Radia), dosificación de tintes', importe: 74, ev_ebitda: null, financiacion: 'Caja', resultado: 'Integrada en Contractor en el 4T25 [1].' },
      { anio: '2025', objetivo: 'Color Service s.r.l. (dosificación automática, Italia)', importe: 77, ev_ebitda: null, financiacion: 'Caja', resultado: 'Integrada en la división de polvo (Industrial) en el 3T25 [1].' },
      { anio: '2024', objetivo: 'Corob S.p.A. (dosificación, mezcla y agitado de tintes; ventas de 110 M EUR en 2023)', importe: 290.7, ev_ebitda: null, financiacion: 'Caja (230 M EUR + hasta 30 M EUR de pagos contingentes)', resultado: 'El primer periodo de pagos contingentes no se cumplió y se liberaron 14,1 M de la provisión en 2025: las ventas quedaron por debajo del plan; sin deterioro [1, 16].' },
    ],
    confianza: 'Alta',
  },
  fuentes: F,
  huecos: [
    { seccion: 'negocio', campo: 'segmentos 2021-2022', tipo: 'Complemento', intentos: '1) 10-K 2025 (solo 2023-2025 con la segmentación nueva); 2) 10-K 2024 (segmentación antigua: Industrial, Process, Contractor); 3) presentaciones a inversores (sin reexpresión)', decision: 'Omitido' },
    { seccion: 'trimestres', campo: 'crecimiento interanual de 3T24 a 2T25 y EBITDA del 3T24', tipo: 'Complemento', intentos: '1) comunicados del 3T25, 4T25, 1T26 y 2T26 (solo el trimestre y su comparable); 2) 10-Q de 2025 (no descargados los de 2024); 3) XBRL trimestral (sin tiempo en este análisis)', decision: 'Omitido' },
  ],
});

// ---------------- B: sector y competencia ----------------
w('B', {
  sector: {
    tamano: '≈4.800 M USD en 2025 las máquinas de pintura por pulverización (Future Market Insights; airless el 41,2 %) y ≈1.975 M USD los pulverizadores airless (WiseGuy Reports) [31, 30]',
    unidad_serie: 'millones de USD (máquinas de pintura por pulverización; 2030e interpolado al 4,9 % anual)',
    serie: [{ anio: '2025', tamano: 4800 }, { anio: '2030e', tamano: 6100 }, { anio: '2035e', tamano: 7700 }],
    tcac_historico_pct: null, tcac_previsto_pct: 4.9, cr5_pct: null, estructura: 'Moderadamente concentrada',
    drivers: [
      { driver: 'Vivienda en EE. UU. (obra nueva y repintado)', efecto: '−', horizonte: 'Cíclico', evidencia: 'Viviendas iniciadas 1,275 millones en ago-26 (1,69 millones en ene-22); compraventa de viviendas usadas 3,99 millones en sep-26; hipoteca a 30 años al 7,40 % el 8-oct-26 [27, 28, 29].' },
      { driver: 'Sustitución de rodillo y brocha por pulverización (productividad y escasez de pintores)', efecto: '+', horizonte: 'Estructural', evidencia: 'Mercado airless con crecimiento previsto del 5,9 % anual hasta 2035 [30].' },
      { driver: 'Centros de datos e infraestructuras (recubrimientos de protección, espuma, tejados, polvo para armarios eléctricos)', efecto: '+', horizonte: 'Cíclico', evidencia: 'La dirección lo cita como causa del crecimiento de Contractor en América en el 2T26, sin cuantificarlo («no cientos de millones») [34].' },
      { driver: 'Inversión industrial y automóvil (acabado, dosificación)', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Industrial −5 % orgánico en el 1S26 por proyectos de acabado; pedidos de seis semanas +11 % en julio [2, 34].' },
      { driver: 'Semiconductores (bombas de alta pureza)', efecto: '+', horizonte: 'Cíclico', evidencia: 'Pedidos de Expansion Markets +58 % en el 2T26 por semiconductores [34].' },
      { driver: 'Aranceles de EE. UU.', efecto: '+/−', horizonte: 'Cíclico', evidencia: '14 M de coste adicional en 2025; el Supremo anuló los aranceles IEEPA (20-feb-26) y Graco cobró 9 M netos de devoluciones en el 2T26 [1, 2].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 2, justificacion: 'Pocos rivales con gama completa (Wagner/Titan en pintura; Nordson y Wagner en polvo y acabado); Graco mantiene un margen operativo del 25-34 % por segmento [1].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Venta por distribuidores y grandes superficies; un cliente supera el 10 % de las ventas del grupo (Contractor e Industrial) [1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Metales y componentes estándar; Graco fabrica la mayor parte en EE. UU. y repercute precio (1,5-2 % en 2026) [1, 34].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Marca entre profesionales, red de distribución y servicio, y recambios; entrada china en gama baja de bricolaje.' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 2, justificacion: 'Rodillo y brocha en la gama baja; para obra grande, la pulverización gana productividad.' },
    ],
    ciclo: { posicion: 'Contracción' },
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: null,
    competidores: [
      { nombre: 'Nordson', pais: 'EE. UU.', ticker: 'NDSN', ingresos: 2988, cuota_pct: null, margen_ebit_pct: null, comentario: 'Rival directo en adhesivos, selladores y polvo; margen EBITDA 30,6 % (ingresos derivados del valor empresa y EV/ventas de Yahoo) [32].' },
      { nombre: 'IDEX', pais: 'EE. UU.', ticker: 'IEX', ingresos: 3600, cuota_pct: null, margen_ebit_pct: null, comentario: 'Bombas y dosificación de fluidos; margen EBITDA 26,7 % [32].' },
      { nombre: 'Wagner Group (con Titan)', pais: 'Alemania', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Principal rival en pulverizadores de pintura para profesionales y bricolaje; no cotiza ni publica cuentas.' },
      { nombre: 'Dover (bombas y equipos de proceso)', pais: 'EE. UU.', ticker: 'DOV', ingresos: 8443, cuota_pct: null, margen_ebit_pct: null, comentario: 'Conglomerado; compite en bombas de transferencia; margen EBITDA 22,8 % [32].' },
      { nombre: 'Interpump', pais: 'Italia', ticker: 'IP', ingresos: 2318, cuota_pct: null, margen_ebit_pct: null, comentario: 'Bombas de alta presión y procesos higiénicos; 2.071 M EUR de ventas en 2025 (pasado a USD con el BCE del 14-oct) [32, 33].' },
    ],
    foso: {
      veredicto: 'Amplio', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'Red de distribuidores formados y especificación por fabricantes de pintura; no es un efecto de red en sentido estricto.' },
        { fuente: 'Costes de cambio', puntuacion: 3, evidencia: 'Recambios y consumibles para la base instalada; en Valco Melton más de la mitad de las ventas son piezas y accesorios [34].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 4, evidencia: 'Marcas Graco, Gema y Corob; margen bruto del 52,5 % en 2025 [1].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Fabricación concentrada en EE. UU. con plantas nuevas (capex de 185-201 M en 2022-23) [1].' },
        { fuente: 'Escala eficiente', puntuacion: 4, evidencia: 'Nichos pequeños (airless profesional, proporcionadoras de espuma) donde dos o tres fabricantes cubren el mercado.' },
      ],
    },
    confianza: 'Media',
  },
  historia: {
    hitos: [
      { anio: '1926', hito: 'Fundación en Minneapolis; 2026 es su año 100 [5].' },
      { anio: '1969', hito: 'Deloitte audita la empresa al menos desde este año [1].' },
      { anio: '2017', hito: 'Estatutos reformados el 8-dic-2017 (desdoblamiento de 3 por 1); serie de BPA reexpresada [2, 9].' },
      { anio: '2021', hito: 'Mark Sheahan, director financiero desde 2018, pasa a consejero delegado [10].' },
      { anio: '2022-2023', hito: 'Inversión récord en plantas (capex de 201 y 185 M) [1, 9].' },
      { anio: '2024', hito: 'Compra de Corob (290,7 M), la mayor en una década hasta entonces [1].' },
      { anio: '2025', hito: 'Nueva segmentación (Contractor, Industrial, Expansion Markets) y compras de Color Service y Radia [1].' },
      { anio: '2026', hito: 'Compra de Valco Melton (447 M) y nuevo director financiero (Sanjiv Gupta, procedente de General Motors) [13, 15].' },
    ],
    confianza: 'Media',
  },
  esg: { calificaciones: [], confianza: 'Baja' },
  fuentes: F,
  huecos: [
    { seccion: 'competencia', campo: 'cuota de mercado de Graco', tipo: 'Núcleo', intentos: '1) 10-K 2025 (no publica cuotas); 2) informes de mercado de WiseGuy y Future Market Insights (solo listas de empresas); 3) cálculo con Contractor sobre el mercado airless (perímetros distintos: Contractor incluye espuma, marcado y tintes)', decision: 'Omitido' },
    { seccion: 'esg', campo: 'calificaciones ESG', tipo: 'Complemento', intentos: '1) proxy 2026 y 10-K (no las citan); 2) páginas públicas de MSCI y Sustainalytics (requieren registro); 3) búsqueda en prensa (sin resultado fiable)', decision: 'Omitido' },
  ],
});

// ---------------- C: equipo y gobierno ----------------
w('C', {
  directivos: {
    equipo: [
      { nombre: 'Mark W. Sheahan', cargo: 'Presidente y consejero delegado', desde: '2021', participacion_pct: 0.66, trayectoria: 'Director financiero de 2018 a 2021; consejero delegado desde junio de 2021. Con él las ventas pasaron de 1.988 M (2021) a 2.237 M (2025), con 4 de 5 puntos por compras [1, 10].' },
      { nombre: 'Sanjiv Gupta', cargo: 'Director financiero y tesorero', desde: '2026', participacion_pct: 0.0, trayectoria: 'Desde el 15-abr-2026; antes director financiero de GM International en General Motors (desde 2003 en GM) [13].' },
      { nombre: 'J. Kevin Gilligan', cargo: 'Presidente del consejo (independiente)', desde: '2024', participacion_pct: 0.06, trayectoria: 'Consejero desde 2001; antiguo consejero delegado de Capella Education [10].' },
      { nombre: 'Angela F. Wordell', cargo: 'Vicepresidenta ejecutiva de operaciones y cadena de suministro', desde: '2025', participacion_pct: 0.1, trayectoria: 'Directiva con remuneración publicada en el proxy de 2026 [10].' },
      { nombre: 'Peter J. O’Shea', cargo: 'Presidente de la división Industrial', desde: null, participacion_pct: 0.09, trayectoria: 'Responsable de la división que integra Valco Melton [10, 17].' },
    ],
    historial_guidance: [
      { anio: '2026', guia: 'Orgánico «low single-digit» y total «mid single-digit» en divisa constante', real: '1S26: −3 % orgánico, +3 % total; guía mantenida en julio', cumplida: 'Parcial' },
      { anio: '2025', guia: 'Orgánico «low single-digit» en divisa constante', real: '0 % orgánico; +6 % total con compras', cumplida: 'No' },
      { anio: 'Largo plazo', guia: '10 % de crecimiento de ventas y 12 % de beneficio neto al año', real: 'Ventas 2021-2025 +3,0 % anual y beneficio +4,4 % anual', cumplida: 'No' },
    ],
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'J. Kevin Gilligan', cargo: 'Presidente', tipo: 'Independiente', desde: '2001', comisiones: 'Presidencia del consejo' },
      { nombre: 'Mark W. Sheahan', cargo: 'Consejero delegado', tipo: 'Ejecutivo', desde: '2021', comisiones: '—' },
      { nombre: 'Martha A. Morfitt', cargo: 'Consejera', tipo: 'Independiente', desde: '1995', comisiones: 'n.d.' },
      { nombre: 'Eric P. Etchart', cargo: 'Consejero', tipo: 'Independiente', desde: '2010', comisiones: 'n.d.' },
      { nombre: 'Jody H. Feragen', cargo: 'Consejera', tipo: 'Independiente', desde: '2015', comisiones: 'Auditoría (presidenta)' },
      { nombre: 'Kevin J. Wheeler', cargo: 'Consejero', tipo: 'Independiente', desde: '2020', comisiones: 'n.d.' },
      { nombre: 'Archie C. Black', cargo: 'Consejero', tipo: 'Independiente', desde: '2023', comisiones: 'n.d.' },
      { nombre: 'Heather L. Anfang', cargo: 'Consejera', tipo: 'Independiente', desde: '2023', comisiones: 'n.d.' },
      { nombre: 'Andrea H. Simon', cargo: 'Consejera', tipo: 'Independiente', desde: '2025', comisiones: 'Auditoría; Organización y Remuneración' },
      { nombre: 'Steven B. Hedlund', cargo: 'Consejero', tipo: 'Independiente', desde: '2026', comisiones: 'Auditoría; Organización y Remuneración' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: false, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 68.2, voto_remuneracion_contra_pct: 31.5, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 9.49, fijo: 1.07, variable_corto: 1.26, variable_largo: 5.75, ratio_salario_medio: 120 },
    accionistas: [
      { nombre: 'The Vanguard Group', pct: 10.2, tipo: 'Institucional (13G)', variacion: 'Último 13G/A de feb-2024' },
      { nombre: 'BlackRock', pct: 10.2, tipo: 'Institucional (13G)', variacion: '13G/A de ene-2026' },
      { nombre: 'Consejeros y directivos (21 personas)', pct: 2.18, tipo: 'Internos', variacion: 'Ventas netas de 3,9 M USD en 12 meses' },
    ],
    insiders: [
      { fecha: '2026-08-03', persona: 'Eric P. Etchart (consejero)', operacion: 'Venta', acciones: 3218, importe: 0.26 },
      { fecha: '2026-04-27', persona: 'Andrea H. Simon (consejera)', operacion: 'Compra', acciones: 1240, importe: 0.10 },
      { fecha: '2026-02-06', persona: 'Angela F. Wordell (operaciones)', operacion: 'Venta', acciones: 2832, importe: 0.26 },
      { fecha: '2026-02-04', persona: 'Timothy R. White (Expansion Markets)', operacion: 'Venta', acciones: 1469, importe: 0.13 },
      { fecha: '2026-02-03', persona: 'J. Kevin Gilligan (presidente)', operacion: 'Venta', acciones: 12870, importe: 1.15 },
      { fecha: '2026-02-02', persona: 'Peter J. O’Shea (Industrial)', operacion: 'Venta', acciones: 8820, importe: 0.78 },
      { fecha: '2026-02-02', persona: 'Kathryn L. Schoenrock (sistemas)', operacion: 'Venta', acciones: 2223, importe: 0.20 },
      { fecha: '2026-01-30', persona: 'Claudio Merengo (división de polvo)', operacion: 'Venta', acciones: 14410, importe: 1.25 },
    ],
    alertas: [
      'Voto consultivo sobre la remuneración de la junta de 2026: 31,5 % en contra (10,5 % en 2025); el comité dice que consultará a los grandes accionistas [11, 12].',
      'Consejo escalonado (tres clases con mandatos de tres años): defensa frente a una toma de control; Morfitt reelegida con un 21 % en contra [10, 11].',
      'Cambio de director financiero en abr-2026 (retiro de David Lowe tras cinco años) [13].',
    ],
    confianza: 'Media',
  },
  fuentes: F,
  huecos: [
    { seccion: 'gobierno', campo: 'composición de las comisiones de cada consejero', tipo: 'Complemento', intentos: '1) proxy 2026 (texto extraído sin la matriz de comisiones legible); 2) 8-K de nombramientos (solo los nuevos); 3) web de gobierno (no consultada por tiempo)', decision: 'Omitido' },
  ],
});

// ---------------- D: mercado y valoración ----------------
const BO = JSON.parse(readFileSync(join(DIR, 'bolsa.json'), 'utf8'));
const FX = 1.1195; // USD por EUR (BCE, 14-oct-26)
const comps = JSON.parse(readFileSync(join(DIR, '../../../sectores/hidraulica-bombas-2026-10-14-comparables.json'), 'utf8'))
  .filter((c) => ['PH', 'IEX', 'NDSN', 'DOV', 'ATCO A', 'ALFA'].includes(c.ticker))
  .map((c) => ({ ...c, capitalizacion: Math.round(c.capitalizacion * FX) }));
comps.push({ nombre: 'Interpump', ticker: 'IP', pais: 'IT', capitalizacion: Math.round(3780 * FX), ev_ventas: 2.02, ev_ebitda_ltm: 9.2, ev_ebitda_ntm: 8.4, per_ntm: 15.3, crecimiento_pct: 7.5, margen_ebitda_pct: 21.9, roic_pct: 9.8, dn_ebitda: 0.7, fcf_yield_pct: 5.6 });

w('D', {
  identificacion: {
    nombre: 'Graco Inc.', nombre_corto: 'Graco', ticker: 'GGG', isin: 'US3841091040', mercado: 'New York Stock Exchange', indice_referencia: 'S&P 500',
    pais: 'Estados Unidos', pais_iso: 'US', sector: 'Industria', industria: 'Maquinaria', sede: 'Minneapolis (Minnesota)', fundacion: '1926', empleados: 4400, web: 'www.graco.com',
    precio: BO.identificacion.precio, fecha_precio: BO.identificacion.fecha_precio, acciones: 164.0, capitalizacion_publicada: null, free_float_pct: 97.8,
    max_52s: BO.identificacion.max_52s, min_52s: BO.identificacion.min_52s, volumen_medio_diario: '≈ 145 M USD/día (3 meses)', proximos_resultados: '2026-10-21',
  },
  consenso: {
    estimaciones: [
      { periodo: '2026e', ingresos: 2364, ebitda: 768.6, ebit: 663.1, bpa: 3.22, dpa: 1.18, fuente: 'MarketScreener (10 analistas) [24]' },
      { periodo: '2027e', ingresos: 2499, ebitda: 808.1, ebit: 710.0, bpa: 3.44, dpa: 1.25, fuente: 'MarketScreener [24]' },
      { periodo: '2028e', ingresos: 2621, ebitda: 871.4, ebit: 774.1, bpa: 3.77, dpa: 1.34, fuente: 'MarketScreener [24]' },
    ],
    recomendaciones: { n_analistas: 10, comprar: 3, mantener: 7, vender: 0, po_medio: 91.14, po_min: 84, po_max: 100 },
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: { ...BO.bolsa, posicion_corta_pct: null, confianza: 'Alta' },
  multiplos_historicos: {
    serie: ['2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'].map((y) => ({ anio: y, precio_cierre: BO.cierres_ejercicio.find((c) => c.anio === y).precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    confianza: 'Alta',
  },
  comparables: { empresas: comps, confianza: 'Media' },
  transacciones: {
    operaciones: [
      { fecha: '2026-05', objetivo: 'Valco Melton (adhesivos y control de calidad)', comprador: 'Graco', ev: 447, ev_ventas: 3.08, ev_ebitda: 14.0, prima_pct: null, excluir: false, comentario: '447 M USD en caja con ≈40 M de ventajas fiscales, ≈14x el EBITDA de 2025 y ventas de ≈145 M [14].' },
      { fecha: '2024-09', objetivo: 'Corob (dosificación de tintes)', comprador: 'Graco', ev: 291, ev_ventas: 2.4, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '290,7 M USD de contraprestación total sobre 110 M EUR (≈119 M USD) de ventas en 2023; EBITDA no publicado [1, 16].' },
      { fecha: '2025-07', objetivo: 'Chart Industries (equipos criogénicos y de proceso)', comprador: 'Baker Hughes', ev: 13600, ev_ventas: 3.24, ev_ebitda: 13.6, prima_pct: null, excluir: false, comentario: 'Valor empresa de 13.600 M USD sobre 4.200 M de ventas y 1.000 M de EBITDA ajustado de 2024 [37].' },
      { fecha: '2021-06', objetivo: 'Seepex (bombas de cavidad progresiva)', comprador: 'Ingersoll Rand', ev: 520, ev_ventas: 2.7, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '431,5 M EUR (≈520 M USD al cambio de 2021) sobre unos 160 M EUR de ventas [36].' },
      { fecha: '2021-08', objetivo: 'Eaton Hydraulics', comprador: 'Danfoss', ev: 3300, ev_ventas: 1.83, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '3.300 M USD sobre 1.800 M de ventas de 2020; EBITDA no publicado [35].' },
    ],
    confianza: 'Media',
  },
  fuentes: F,
  huecos: [
    { seccion: 'bolsa', campo: 'posición corta', tipo: 'Complemento', intentos: '1) FINRA (sin descarga directa); 2) Stock Analysis (no consultado); 3) MarketBeat (no lo muestra en la página leída)', decision: 'Omitido' },
  ],
});

// ---------------- E: sentimiento ----------------
w('E', {
  sentimiento: {
    tono: 'Dividido', tendencia: 'Estable',
    revisadas: [
      { plataforma: 'Seeking Alpha (análisis y noticias)', fecha: '2026-10', n_comentarios: 12, tono: 'Negativo', resumen: 'Cinco análisis en seis meses: «valoración que deja poco margen» (abr), «más compras no compensan el orgánico flojo» (jun), «mantener por falta de crecimiento orgánico» (jul), «demasiado cara para el optimismo» y «mejor precio, pero aún no es compra» (9-10 oct) [38].' },
      { plataforma: 'Stocktwits ($GGG)', fecha: '2026-10', n_comentarios: 30, tono: 'Dividido', resumen: 'Poco debate de fondo: opciones a corto plazo, avisos técnicos («ruptura desde una base baja» tras el 2T26) y alguna queja por la caída de mayo-junio [39].' },
      { plataforma: 'MarketBeat (noticias y movimientos institucionales)', fecha: '2026-10', n_comentarios: 20, tono: 'Neutro', resumen: 'Consenso «mantener»; RBC recorta el objetivo a 95 USD el 14-oct sin cambiar su recomendación; más ventas que compras de institucionales en septiembre [40].' },
    ],
    temas: [
      { tema: 'Crecimiento orgánico nulo tapado con compras', postura: 'Bajista', peso: 'Alto', contraste: 'Cierto: 0 % orgánico en 2025 y −3 % en el 1S26, con 4-5 puntos de compras; pero pedidos +5 % y cartera +28 % en el 2T26 [1, 2, 34].' },
      { tema: 'Valoración: prima frente al mercado sin crecimiento', postura: 'Bajista', peso: 'Alto', contraste: 'El PER adelantado ha bajado de ≈30x a ≈23x y cotiza bajo su mediana; la prima se justifica por un ROIC muy superior al coste de capital.' },
      { tema: 'Vivienda en EE. UU. y Contractor', postura: 'Dividida', peso: 'Medio', contraste: 'Contractor vuelve a crecer en América en el 2T26, pero las viviendas iniciadas siguen en 1,28 millones y la hipoteca al 7,4 % [27, 29].' },
      { tema: 'Compras (Valco Melton a 14x EBITDA)', postura: 'Dividida', peso: 'Medio', contraste: 'Más cara que Corob (≈2,4x ventas), pero con margen bruto ≥50 % y más de la mitad de recambios [14, 34].' },
    ],
    lectura: null,
    confianza: 'Baja',
  },
  fuentes: F,
  huecos: [
    { seccion: 'sentimiento', campo: 'Reddit y comentarios de lectores de Seeking Alpha', tipo: 'Complemento', intentos: '1) Reddit (403); 2) artículos de Seeking Alpha (403: solo titulares del RSS); 3) Motley Fool (no consultado por tiempo)', decision: 'Omitido: la sección se apoya en titulares, Stocktwits y MarketBeat, con confianza baja' },
  ],
});
console.log('Notas A-E escritas');
