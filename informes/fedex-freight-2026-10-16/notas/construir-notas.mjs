// Escribe las notas A-E de FedEx Freight Holding Company (FDXF, corte 2026-10-16) a partir del XBRL de la SEC
// (cuentas-xbrl.json), el 10-K del ejercicio a mayo de 2026 (estados combinados «carve-out» auditados), el folleto
// de la escisión (Information Statement, anexo 99.1 del Form 10), el 8-K con la cuenta reexpresada por años naturales
// 2024-2025, la nota de resultados del 4T FY26 con la guía del periodo de transición, la transcripción y la
// presentación de esa conferencia, los 8-K de jun-oct 2026, el 13G de FedEx, bolsa.mjs, Stock Analysis,
// MarketScreener y foros. Cada nota cita solo con [n] de su propia lista.
// Ejecutar: node notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const X = JSON.parse(fs.readFileSync(path.join(dir, 'cuentas-xbrl.json'), 'utf8'));
const BOLSA = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const E = 'https://www.sec.gov/Archives/edgar/data/2082247';
const ANIOS = ['FY2023', 'FY2024', 'FY2025', 'FY2026'];

const SRC = {
  k10: { titulo: 'Form 10-K del ejercicio a 31-may-2026 (estados combinados auditados FY2024-FY2026; gastos por naturaleza; deuda; partes vinculadas; factoring; escisión; gobierno y remuneración)', editor: 'FedEx Freight Holding Company / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-05', url: `${E}/000162828026053359/fdxf-20260531.htm` },
  xbrl: { titulo: 'Hechos XBRL (companyfacts): cuenta, balance y flujos FY2024-FY2026', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-16', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0002082247.json' },
  info: { titulo: 'Information Statement de la escisión (anexo 99.1 del Form 10): cuentas FY2023-FY2025, negocio, sector LTL, deuda, acuerdos con FedEx', editor: 'FedEx Freight Holding Company / SEC EDGAR', tipo: 'Primaria', fecha: '2026-05', url: `${E}/000110465926060223/tm2520565d14_ex99-1.htm` },
  recast: { titulo: 'Cuenta reexpresada por años naturales 2024 y 2025 y por trimestres naturales, con datos operativos (8-K, anexo 99.1)', editor: 'FedEx Freight Holding Company / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-06', url: `${E}/000162828026054314/fdxf-cy2025cy2024recast.htm` },
  pr: { titulo: 'FedEx Freight Reports Fourth Quarter and Full Fiscal Year 2026 Financial Results; guía del periodo de transición jun-dic 2026 (8-K, anexo 99.1)', editor: 'FedEx Freight Holding Company / SEC EDGAR', tipo: 'Primaria', fecha: '2026-06-25', url: `${E}/000162828026045515/fdxf-q4fy2026juneearningsr.htm` },
  transc: { titulo: 'Transcripción de la conferencia de resultados del 4T FY26', editor: 'FedEx Freight (web de inversores)', tipo: 'Primaria', fecha: '2026-06-25', url: 'https://d1io3yog0oux5.cloudfront.net/_3f3801753a78500dbf98de77199d3d74/fedexfreight/db/3594/34565/webcast_transcript/FedEx+Freight+Q4+FY2026+Earnings+Transcript.pdf' },
  pres: { titulo: 'Presentación de resultados del 4T FY26', editor: 'FedEx Freight (web de inversores)', tipo: 'Primaria', fecha: '2026-06-25', url: 'https://d1io3yog0oux5.cloudfront.net/_3f3801753a78500dbf98de77199d3d74/fedexfreight/db/3594/34565/presentation/FedEx+Freight+Q4+FY2026+Earnings+Presentation.pdf' },
  k8jun1: { titulo: '8-K: culminación de la escisión, acuerdos con FedEx y líneas de crédito (1-jun-2026)', editor: 'FedEx Freight Holding Company / SEC EDGAR', tipo: 'Primaria', fecha: '2026-06-01', url: `${E}/000110465926068521/tm2615735d2_8k.htm` },
  k8jun26: { titulo: '8-K: planes de incentivos TY26 y TY26-CY28 (punto 5.02)', editor: 'FedEx Freight Holding Company / SEC EDGAR', tipo: 'Primaria', fecha: '2026-06-26', url: `${E}/000110465926078270/tm2619027d1_8k.htm` },
  k8sep: { titulo: '8-K: despido del vicepresidente ejecutivo comercial (Michael B. Lyons) por violar el código de conducta', editor: 'FedEx Freight Holding Company / SEC EDGAR', tipo: 'Primaria', fecha: '2026-09-02', url: `${E}/000110465926104793/tm2624680d1_8k.htm` },
  k8oct: { titulo: '8-K: fecha de la primera junta de accionistas (5-may-2027)', editor: 'FedEx Freight Holding Company / SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-02', url: `${E}/000110465926113295/tm2626881d1_8k.htm` },
  g13: { titulo: 'Schedule 13G de FedEx Corporation: 29.751.545 acciones (19,9 %)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-07', url: `${E}/000110465926092744/xslSCHEDULE_13G_X02/primary_doc.xml` },
  form4: { titulo: 'Formularios 3 y 4 presentados desde el 27-may-2026 (concesiones; sin compras ni ventas en mercado)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-16', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0002082247&type=4' },
  fw: { titulo: 'FedEx Freight embarks on journey as standalone LTL carrier (día del inversor: ingresos +4-6 % anual, margen operativo ajustado del 12 % al 15 %, caja libre > 1.000 M)', editor: 'FreightWaves', tipo: 'Prensa', fecha: '2026-04-08', url: 'https://www.freightwaves.com/news/fedex-freight-embarks-on-journey-as-standalone-ltl' },
  news: { titulo: 'FedEx Freight Hosts Inaugural Investor Day Ahead of Planned Spinoff from FedEx', editor: 'FedEx Freight (sala de prensa)', tipo: 'Primaria', fecha: '2026-04-08', url: 'https://newsroom.fedexfreight.com/fedex-freight-hosts-inaugural-investor-day-ahead-of-planned-spinoff-from-fedex' },
  bolsa: { titulo: 'Históricos diarios de FDXF, SPY e IYT (herramientas/bolsa.mjs y movimiento.mjs)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/quote/FDXF/history/' },
  ms: { titulo: 'FedEx Freight: consenso de ventas, EBITDA, EBIT, BPA, dividendo y deuda neta 2027-2029 (14 analistas) y de los comparables', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://www.marketscreener.com/quote/stock/FEDEX-FREIGHT-HOLDING-CO/finances/' },
  sa: { titulo: 'FDXF stock forecast: objetivo medio 146,5 USD, mediana 140,5, mínimo 108, máximo 200; cambios de objetivo de septiembre-octubre de 2026', editor: 'Stock Analysis (datos de S&P Global)', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/fdxf/forecast/' },
  sacomp: { titulo: 'Estadísticas de ODFL, SAIA, XPO, ARCB, TFII y KNX (capitalización, EV, EV/EBITDA, PER adelantado, ROIC, rentabilidad de la caja libre, beta)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://stockanalysis.com/stocks/odfl/statistics/' },
  dam: { titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026: 4,20 %', editor: 'A. Damodaran, NYU Stern', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  tes: { titulo: 'Daily Treasury Par Yield Curve Rates 2026 (10 años: 5,10 % el 15-oct-2026)', editor: 'U.S. Department of the Treasury', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve&field_tdr_date_value=2026' },
  ir: { titulo: 'FedEx Freight to Report Earnings on October 29, 2026 (nota del 1-oct-2026)', editor: 'FedEx Freight (web de inversores)', tipo: 'Primaria', fecha: '2026-10-01', url: 'https://investors.fedexfreight.com/' },
  aaa: { titulo: 'Knight-Swift enters LTL arena with $1.35B acquisition of AAA Cooper (ventas 2021e 780 M, EBITDA 140 M)', editor: 'FreightWaves', tipo: 'Prensa', fecha: '2021-07', url: 'https://www.freightwaves.com/news/knight-swift-enters-ltl-arena-with-1-35b-acquisition-of-aaa-cooper' },
  mme: { titulo: 'Knight-Swift Expands Its LTL Footprint Through the Acquisition of Midwest Motor Express (8-K, anexo 99.1: 150 M USD; ventas 137 M y EBITDA ajustado 27 M en 2021e)', editor: 'Knight-Swift / SEC EDGAR', tipo: 'Primaria', fecha: '2021-12-06', url: 'https://www.sec.gov/Archives/edgar/data/1492691/000149269121000090/knx-exhibit99112062021.htm' },
  ups: { titulo: 'TFI International Completes Previously Announced UPS Freight Acquisition (800 M USD, sin caja ni deuda)', editor: 'TFI International / GlobeNewswire', tipo: 'Primaria', fecha: '2021-04-30', url: 'https://www.globenewswire.com/news-release/2021/04/30/2220839/0/en/TFI-International-Completes-Previously-Announced-UPS-Freight-Acquisition.html' },
  st: { titulo: 'Stocktwits, flujo de mensajes de $FDXF (septiembre-octubre de 2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-15', url: 'https://stocktwits.com/symbol/FDXF' },
  salpha: { titulo: 'Seeking Alpha, análisis y noticias de FDXF (titulares de junio-octubre de 2026)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-15', url: 'https://seekingalpha.com/symbol/FDXF' },
};
const lista = (claves) => claves.map((k, i) => ({ id: i + 1, ...SRC[k] }));

// ---------------------------------------------------------------- A. Cuentas
const fA = lista(['k10', 'xbrl', 'info', 'recast', 'pr', 'transc', 'pres', 'k8jun1', 'fw']);
const cx = Object.fromEntries(X.financieros.cuenta.map((r) => [r.periodo, r]));
// FY2023 del folleto (cuenta combinada auditada); FY2024-FY2026 del XBRL del 10-K.
const c23 = { periodo: 'FY2023', ingresos: 10084, amortizaciones: 445, ebit: 1894, resultado_financiero: 196, bai: 2090, impuestos: 509, beneficio_neto: 1581, gastos_financieros: 0 };
// Cuenta por naturaleza: «coste_ventas» = transporte comprado + combustible (los aprovisionamientos de un transportista).
const coste = { FY2023: 1079 + 748, FY2024: 873 + 571, FY2025: 807 + 457, FY2026: 807 + 486 };
const noRec = { FY2023: null, FY2024: null, FY2025: null, FY2026: 492 };
const cuenta = ANIOS.map((y) => {
  const c = y === 'FY2023' ? c23 : cx[y];
  return { periodo: y, ingresos: c.ingresos, coste_ventas: coste[y], gastos_generales: null, ebitda: c.ebit + c.amortizaciones, amortizaciones: c.amortizaciones, ebit: c.ebit, resultado_financiero: c.resultado_financiero, bai: c.bai, impuestos: c.impuestos, minoritarios: 0, beneficio_neto: c.beneficio_neto, gastos_financieros: c.gastos_financieros ?? 0, participadas_en_ebitda: null, no_recurrentes_en_ebitda: noRec[y], bpa: Math.round((c.beneficio_neto / 149.5) * 100) / 100, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: 149.5 };
});
const historico = [
  { periodo: 'FY2024', activo_total: 5048, activo_corriente: 305, pasivo_corriente: 1049, pasivo_total: 2924, fondo_comercio: 602, intangibles: 0, inmovilizado_material: 2726, existencias: 25, clientes: 139, proveedores: 141, activos_contrato: null, pasivos_contrato: null, caja: 106, deuda_financiera: 0, arrendamientos: 40, patrimonio_neto: 2124, minoritarios: 0, reservas: 2127 },
  { periodo: 'FY2025', activo_total: 5022, activo_corriente: 284, pasivo_corriente: 773, pasivo_total: 2629, fondo_comercio: 602, intangibles: 0, inmovilizado_material: 2780, existencias: 21, clientes: 132, proveedores: 150, activos_contrato: null, pasivos_contrato: null, caja: 109, deuda_financiera: 0, arrendamientos: 73, patrimonio_neto: 2393, minoritarios: 0, reservas: 2400 },
  { periodo: 'FY2026', activo_total: 6884, activo_corriente: 1506, pasivo_corriente: 993, pasivo_total: 7381, fondo_comercio: 602, intangibles: 0, inmovilizado_material: 2923, existencias: null, clientes: 1154, proveedores: 106, activos_contrato: null, pasivos_contrato: null, caja: 251, deuda_financiera: 4264, arrendamientos: 263, patrimonio_neto: -497, minoritarios: 0, reservas: -509 },
];
const flujos = [
  { periodo: 'FY2023', flujo_operativo: 1752, capex: 558, pagos_arrendamientos: 1, adquisiciones: 0, desinversiones: 56, dividendos: 0, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: 'FY2024', flujo_operativo: 1541, capex: 461, pagos_arrendamientos: 1, adquisiciones: 0, desinversiones: 58, dividendos: 0, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: 'FY2025', flujo_operativo: 1531, capex: 437, pagos_arrendamientos: 63, adquisiciones: 0, desinversiones: 52, dividendos: 0, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: 'FY2026', flujo_operativo: 167, capex: 379, pagos_arrendamientos: 23, adquisiciones: 0, desinversiones: 16, dividendos: 48, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
];
const tri = (periodo, ingresos, ebit, amort, sep, bpa, prev) => {
  const ebitda = ebit + amort + sep;
  return { periodo, ingresos, crecimiento_pct: prev ? Math.round((ingresos / prev - 1) * 1000) / 10 : null, crecimiento_organico_pct: null, ebitda, margen_ebitda_pct: Math.round((ebitda / ingresos) * 1000) / 10, bpa, vs_consenso: null };
};
const A = {
  _estado: 'completa',
  financieros: {
    cuenta,
    ltm: { periodo: 'FY2026 (jun-25 a may-26)', fecha_fin: '2026-05-31', ingresos: 8795, ebitda: 1052, ebit: 540, beneficio_neto: 655, bpa: 4.38, dpa: 0, dpa_extraordinario: 0, fcf: -212, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 492 },
    cambios_perimetro: [],
    comentario: 'FedEx Freight cotiza desde el 1-jun-2026; antes era un segmento de FedEx. Las cuentas son las combinadas «carve-out» auditadas de los ejercicios a mayo: FY2024-FY2026 del 10-K y FY2023 del folleto de la escisión [1, 3]. Son cuatro años, no cinco: el folleto solo da tres ejercicios auditados y el 10-K otros tres. Los ingresos caen de 10.084 M USD en FY2023 a 8.795 M en FY2026 (−4,7 % al año): tres años de recesión del transporte industrial de EE. UU., con envíos medios diarios de 90.833 en 2024 y 88.391 en 2025 (83.710 en el 4T25) e ingreso por quintal sin combustible casi plano (33,79 → 34,07 USD) [4]. El margen EBIT baja del 18,8 % (FY2023) al 15,8 % (FY2025) por volumen y salarios, y al 6,1 % en FY2026 por 492 M de costes de la separación (sistemas, marca, contratación de funciones propias) [1]; sin ellos, el 11,7 %. Los costes de la separación se tratan como no recurrentes y se devuelven al EBITDA. La cuenta lleva 573-628 M al año de costes asignados por FedEx (servicios compartidos, tecnología, ventas), que la empresa sustituye por unos 600 M de costes propios más 100 M anualizados de contratos de servicios transitorios con FedEx [1, 6]. Se presenta por naturaleza: salarios (4.276 M en FY2026, 49 % de las ventas), transporte comprado (807 M), combustible (486 M), alquileres, mantenimiento y otros [1].',
    ajustes: 'Dos ajustes. (1) El resultado financiero de 2023-2026 (196-398 M) es casi todo interés cobrado a FedEx por la tesorería centralizada (330, 388 y 351 M en FY2024-FY2026) y no se repite: desde junio de 2026 la empresa paga intereses por 4.264 M de deuda (guía: ≈135 M en siete meses) [1, 5]. Por eso el beneficio neto y el BPA históricos (10,58-4,38 USD, calculados sobre las 149,5 M de acciones de la escisión) no son comparables con los futuros; nuestras proyecciones usan el interés de la deuda nueva. (2) La empresa publica un EBIT ajustado sin costes de la separación: 1.108 M en FY2026 para el segmento (margen 12,6 %), frente a 1.032 M en las cuentas combinadas [1, 5]; la diferencia es de perímetro (el segmento no lleva todos los costes asignados). Usamos las cuentas combinadas.',
    confianza: 'Media',
  },
  trimestres: {
    items: [
      tri('1T24', 2292, 421, 118, 0, 2.51, null),
      tri('2T24', 2355, 447, 126, 0, 2.71, null),
      tri('3T24', 2313, 409, 125, 0, 2.62, null),
      tri('4T24', 2132, 255, 125, 0, 1.79, null),
      tri('1T25', 2162, 310, 124, 0, 2.11, 2292),
      tri('2T25', 2289, 436, 98, 0, 2.63, 2355),
      tri('3T25', 2259, 290, 125, 30, 1.95, 2313),
      tri('4T25', 2068, -14, 125, 176, 0.39, 2132),
    ],
    ultima_presentacion: 'Trimestres naturales de la cuenta reexpresada (8-K del 6-ago-2026); EBITDA sin costes de la separación (30 M en el 3T25 y 176 M en el 4T25); BPA contable con el interés de la tesorería de FedEx [4]. El último trimestre publicado es el 4T del ejercicio a mayo de 2026 (mar-may 2026), en la nota del 25-jun: ingresos de ≈2.400 M (+4,8 %), EBIT de 158 M y ajustado de 363 M (margen 15,1 %, −23,9 %), envíos medios diarios de 86.700 (−5,9 %) e ingreso por envío +11,5 % por el recargo de combustible y más peso por envío [5]. Guía del periodo de transición (jun-dic 2026): ingresos +4-6 % sobre 5.100 M, EBIT de 475-515 M (ajustado 605-645 M, margen 11,5-12,0 %), intereses de ≈135 M, tipo del 26 % y BPA de 1,75-1,95 USD (2,40-2,60 sin costes de la separación) [5]. La dirección habló de demanda «estabilizándose» (ISM y precios del camión completo) y de capacidad libre: 10.000 envíos diarios más sin flota nueva y ≈30 % de capacidad de instalaciones [6]. Lo que no se resuelve: cuánto cuesta de verdad ser independiente (≈600 M anualizados, «algo más» en los próximos 12 meses) y cuándo bajan [6]. El siguiente dato son los resultados del trimestre jul-sep, el 29-oct-2026.',
    confianza: 'Media',
  },
  balance: {
    historico,
    vencimientos: [{ anio: '2027', importe: 43 }, { anio: '2028', importe: 0 }, { anio: '2029', importe: 1600 }, { anio: '2030', importe: 0 }, { anio: '2031+', importe: 2700 }],
    liquidez: 'Caja de 251 M USD a 31-may-2026 y una línea de crédito comprometida de 1.200 M a cinco años sin disponer [1, 8]. El convenio exige un apalancamiento total de 3,75 veces como máximo, que baja a 3,50 veces a partir del séptimo mes tras la escisión [1].',
    rating: 'Grado de inversión según la empresa (objetivo de mantenerlo con un apalancamiento bruto de 2,5 veces en 12 meses) [9]; las calificaciones concretas no figuran en los documentos leídos.',
    coste_deuda_pct: 4.8,
    vida_media_anios: 5.8,
    otros_pasivos: 'Arrendamientos operativos de 1.838 M (172 corrientes y 1.666 a largo) por terminales y equipos, fuera de la deuda (US GAAP) [1]. FedEx asumió 330 M de reservas de autoseguro (accidentes, accidentes laborales) acumuladas hasta la escisión; desde junio la empresa genera las suyas [1]. Pensiones: FedEx le transfirió el plan de prestación definida de los empleados en activo con un pasivo neto «que se espera inmaterial» [1].',
    comentario: 'Antes de la escisión la empresa no tenía deuda: la tesorería se centralizaba en FedEx, que cobraba las cuentas de clientes por un contrato de factoring (por eso las cuentas a cobrar eran de solo 132 M en FY2025) [1, 3]. En FY2026 emitió 4.264 M (préstamo de 600 M al 4,91 % y bonos de 1.000 M al 4,30 % a 2029, 1.000 M al 4,65 % a 2031, 700 M al 4,95 % a 2033 y 1.000 M al 5,25 % a 2036; tipo medio del 4,79 %), pagó a FedEx una distribución de 4.122 M, terminó el factoring el 30-nov-2025 y recompró ≈1.000 M de cuentas a cobrar [1]. Resultado: patrimonio neto contable negativo (−497 M) y deuda neta de 4.276 M con los arrendamientos financieros, 2,8 veces el EBITDA de FY2026 sin costes de la separación (1.544 M) [1]. El circulante pasa de casi cero a ≈12 % de las ventas.',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'La caja operativa fue de 1.531-1.752 M USD al año en FY2023-FY2025 con un capex de 437-558 M (4,9-5,5 % de las ventas): caja libre de ≈1.000-1.200 M, que se transfería a FedEx (1.077-1.255 M al año) [1, 3]. FY2026 no es representativo: la caja operativa cae a 167 M por la recompra de ≈1.000 M de cuentas a cobrar al terminar el factoring y por los 492 M de costes de la separación [1]. La empresa no separa capex de mantenimiento y de crecimiento; estimación propia: el mantenimiento ronda la amortización (≈5,5 % de las ventas) en un negocio de camiones y terminales. Objetivo de la dirección: caja libre de más de 1.000 M al año a medio plazo y capex de ≈5 % de las ventas [9].',
    confianza: 'Media',
  },
  calidad: {
    auditor: 'Ernst & Young LLP', anios_auditor: 1, opinion: 'Favorable (sin salvedades)',
    comentario: 'Ernst & Young audita a la empresa desde 2025 (también es el auditor de FedEx) [1]. La materia crítica de auditoría es la valoración de las reservas de autoseguro (accidentes de vehículos y laborales) asignadas por FedEx: 330 M asumidos por FedEx al cierre [1]. Las cuentas «carve-out» llevan costes asignados por la matriz (573-628 M al año) con criterios de reparto, no costes reales de una empresa independiente, y un interés cobrado a FedEx que no se repite: el beneficio histórico sobrestima el futuro [1]. FY2026 mezcla 492 M de costes de la separación y el fin del factoring. Lectura de los indicadores del informe: con cuatro años y una cuenta por naturaleza, el Beneish M es aproximado; el Altman y el Piotroski de FY2026 los distorsiona el patrimonio negativo creado por la distribución a FedEx, no un deterioro del negocio.',
    senales: [
      { senal: 'Cuentas «carve-out» con costes asignados', nivel: 'Media', comentario: '573-628 M al año de costes repartidos por FedEx; los costes reales de empresa independiente son ≈600 M más 100 M de servicios transitorios [1, 6].' },
      { senal: 'Interés de la tesorería de FedEx en el beneficio', nivel: 'Media', comentario: '330-388 M al año de ingreso financiero que desaparece; el BPA histórico (9-10 USD) no es el normal [1].' },
      { senal: 'Costes de la separación elevados y prolongados', nivel: 'Media', comentario: '492 M en FY2026 y ≈150 M más de enero a mayo de 2027, según el director financiero [1, 6].' },
      { senal: 'Patrimonio neto negativo', nivel: 'Baja', comentario: 'Lo crea la distribución de 4.122 M a FedEx, no las pérdidas [1].' },
    ],
    confianza: 'Media',
  },
  capital: {
    politica: 'La empresa prevé empezar a pagar dividendo a finales de 2026 o principios de 2027 y recompras a partir de 2027, con el objetivo de bajar el apalancamiento bruto a 2,5 veces en 12 meses y mantener el grado de inversión [6, 9]. Capex de ≈5 % de las ventas [9].',
    adquisiciones: [],
    comentario: 'Sin historia propia de asignación de capital: hasta mayo de 2026 FedEx se llevaba la caja libre (≈1.100 M al año de transferencias netas en FY2023-FY2025) [1, 3]. La última compra relevante fue Watkins Motor Lines en 2006 [1]. La primera decisión como empresa independiente fue endeudarse en 4.264 M para pagar a FedEx [1].',
    confianza: 'Media',
  },
  negocio: {
    segmentos: [
      { nombre: 'FedEx Freight (LTL)', descripcion: 'Transporte de carga fraccionada (Priority, Economy, Direct) y FedEx Custom Critical (urgente); un único segmento de información', tipo_resultado: 'EBIT', historico: ANIOS.map((y) => { const c = y === 'FY2023' ? c23 : cx[y]; return { periodo: y, ingresos: c.ingresos, resultado: c.ebit }; }) },
    ],
    geografias: [{ nombre: 'Estados Unidos', peso_pct: 97.2 }, { nombre: 'Internacional (Canadá, México y otros)', peso_pct: 2.8 }],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Envíos medios diarios', valor_anterior: '2024: 90.833', valor_actual: '2025: 88.391; 4T FY26: 86.700', variacion: '−2,7 % y −5,9 %', comentario: 'Tres años de caída por la recesión del transporte industrial [4, 5].' },
      { kpi: 'Ingreso por quintal sin combustible (USD)', valor_anterior: '2024: 33,79', valor_actual: '2025: 34,07', variacion: '+0,8 %', comentario: 'Precio casi plano; en el 4T FY26, ingreso por quintal con combustible +8,2 % [4, 5].' },
      { kpi: 'Margen EBIT ajustado', valor_anterior: 'FY2025: 16,7 %', valor_actual: 'FY2026: 12,6 % (4T: 15,1 %)', variacion: '−4,1 pp', comentario: 'Segmento, sin costes de la separación [5].' },
      { kpi: 'Peso por envío (libras)', valor_anterior: '4T FY25: 920', valor_actual: '4T FY26: 948', variacion: '+3,0 %', comentario: 'Más peso sube el ingreso por envío [5].' },
      { kpi: 'Clientes', valor_anterior: '', valor_actual: '≈108.000; el mayor, 4 %; los 25 mayores, 21 %', variacion: '', comentario: 'Base muy diversificada [1].' },
      { kpi: 'Capacidad libre', valor_anterior: '', valor_actual: '≈30 % de las instalaciones; 10.000 envíos/día sin flota nueva', variacion: '', comentario: 'Apalancamiento operativo si vuelve el volumen [6].' },
    ],
  },
  fuentes: fA,
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = lista(['k10', 'info', 'recast', 'sacomp', 'ms', 'transc', 'fw', 'pr']);
const B = {
  _estado: 'completa',
  historia: {
    resumen: 'FedEx Freight nace de las compras de FedEx en el transporte de carga fraccionada: Viking Freight (enero de 1998), American Freightways (febrero de 2001) y Watkins Motor Lines (mayo de 2006) [1]. En 2002 las dos primeras pasan a llamarse FedEx Freight East y West y en 2008 se fusionan en FedEx Freight; se integran en una sola red. Tras la quiebra de Yellow (2023), el sector se queda con unos diez operadores de escala [2]. El 8-abr-2026 celebra su primer día del inversor y el 1-jun-2026 FedEx reparte el 80,1 % de las acciones a sus accionistas (una por cada dos de FedEx) y se queda con el 19,9 %; empieza a cotizar en la Bolsa de Nueva York, entra en el S&P 500 y en el Dow Jones Transportation [1, 7].',
    hitos: [
      { anio: '1998', hito: 'FedEx compra Viking Freight [1].' },
      { anio: '2001', hito: 'FedEx compra American Freightways [1].' },
      { anio: '2006', hito: 'FedEx compra Watkins Motor Lines (FedEx National LTL) [1].' },
      { anio: '2008', hito: 'Fusión de FedEx Freight East y West en FedEx Freight [1].' },
      { anio: '2023', hito: 'Quiebra de Yellow; el sector se reparte sus terminales y clientes [2].' },
      { anio: '2026', hito: 'Día del inversor (8-abr), escisión y salida a bolsa (1-jun); entrada en el S&P 500 [1, 7].' },
    ],
    confianza: 'Alta',
  },
  negocio: {
    descripcion: 'FedEx Freight es la mayor empresa de transporte de carga fraccionada (LTL: envíos de entre ≈70 kilos y unos pocos miles, que no llenan un camión) de Norteamérica: recoge envíos de muchos clientes, los consolida en más de 365 terminales con más de 26.000 muelles y los reparte por una red de líneas regulares [1, 2]. Tiene ≈40.000 empleados y casi 30.000 vehículos (≈17.000 tractoras) y cubre casi todos los códigos postales de EE. UU., Canadá y México [8]. Ofrece dos servicios en la misma red: Priority (rápido; 5.560 M USD de ingresos en FY2026) y Economy (más barato; 2.827 M), más Direct y FedEx Custom Critical (urgente; dentro de los 408 M de otros) [1]. El 97 % de los ingresos es de EE. UU. [1].',
    como_gana_dinero: 'Cobra por envío según origen, destino, peso y clase de mercancía, con un recargo por combustible que repercute el gasoil con algo de retraso, y negocia tarifas anuales con los grandes clientes [1, 2]. El negocio es de costes fijos (red de terminales, flota, plantilla propia: los salarios son el 49 % de las ventas): con más volumen y más peso por envío el margen sube rápido; con menos, cae. El margen EBIT pasó del 18,8 % en FY2023 al 15,8 % en FY2025 con una caída de volumen de un dígito [1, 3]. La clave es la densidad (envíos por parada y por terminal) y el precio: en LTL el servicio (plazos, daños) permite subir precios todos los años, como demuestra Old Dominion [2, 4].',
    clientes: '≈108.000 clientes: el mayor pesa un 4 % de los ingresos, los cinco mayores un 9 % y los 25 mayores un 21 % [1]. La industria (fabricantes, distribuidores mayoristas) es el principal cliente; el comercio minorista, la entrega a domicilio de bultos voluminosos. Los ingresos con FedEx (partes vinculadas) son de 136-171 M al año [1]. El poder de precio es medio: ingreso por quintal sin combustible +0,8 % en 2025 con el volumen cayendo [3].',
    confianza: 'Alta',
  },
  sector: {
    definicion: 'El mercado relevante es el transporte de carga fraccionada (LTL) en EE. UU.: más de 50.000 M USD de ingresos en 2025, con un crecimiento del 3,9 % anual en 2015-2025 según la empresa (fuentes JOC y SJ Consulting) [2]. No incluye el camión completo (TL), la paquetería ni la logística. FedEx Freight, con 8.778 M de ingresos en 2025 [3], tiene ≈17 % de ese mercado. Ficha corta del sector, de elaboración propia [P1].',
    tamano: '> 50.000 M USD en 2025 (EE. UU.; JOC y SJ Consulting citados por la empresa) [2].',
    unidad_serie: 'miles de millones de USD (2025 real; 2026-2030 al 3,9 % anual, estimación propia con el crecimiento histórico que la empresa espera mantener)',
    serie: [
      { anio: '2025', tamano: 50 }, { anio: '2026e', tamano: 52 }, { anio: '2027e', tamano: 54 }, { anio: '2028e', tamano: 56 }, { anio: '2029e', tamano: 58 }, { anio: '2030e', tamano: 61 },
    ],
    tcac_historico_pct: 3.9, tcac_previsto_pct: 3.9, cr5_pct: null, estructura: 'Oligopolio',
    drivers: [
      { driver: 'Ciclo industrial de EE. UU. (ISM manufacturero)', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Tres años de caída de envíos (2023-2025); la dirección ve señales de estabilización [3, 6].' },
      { driver: 'Disciplina de precios tras la quiebra de Yellow', efecto: '+', horizonte: 'Estructural', evidencia: 'Unos diez operadores de escala; el sector sube tarifas pese al volumen débil [2].' },
      { driver: 'Precio del gasoil', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'El recargo por combustible subió el ingreso por envío un 11,5 % en el 4T FY26 [8].' },
      { driver: 'Comercio electrónico de bultos pesados y entrega a domicilio', efecto: '+', horizonte: 'Estructural', evidencia: 'Servicios de entrega residencial y a minoristas [2].' },
      { driver: 'Aranceles y relocalización industrial', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Menos importación y más fábricas en EE. UU. y México [1].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Diez operadores de escala; Old Dominion y Saia ganan cuota con servicio; XPO mejora márgenes [2, 4].' },
      { fuerza: 'Poder de los clientes', intensidad: 2, justificacion: '108.000 clientes, el mayor un 4 % [1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 3, justificacion: 'Conductores escasos (rotación del 10 % en FedEx Freight), gasoil, tractoras [1].' },
      { fuerza: 'Amenaza de entrada', intensidad: 1, justificacion: 'Una red nacional de terminales cerca de las ciudades es casi imposible de replicar; los terminales de Yellow se subastaron a los ya existentes [2].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 2, justificacion: 'Camión completo barato en recesión, paquetería pesada y plataformas digitales de carga [1].' },
    ],
    ciclo: { posicion: 'Recesión', comentario: 'El transporte industrial de EE. UU. lleva tres años en recesión: los envíos de FedEx Freight cayeron un 2,7 % en 2025 y un 5,9 % en el 4T FY26 [3, 8]. En 2009 y en 2020 el volumen del sector cayó con fuerza y se recuperó en 12-18 meses; en 2021-2022 subieron precios y márgenes. La dirección cita la estabilización del ISM y de los precios del camión completo como señales tempranas [6]. Nuestra proyección supone una recuperación suave de volumen a partir de 2027.' },
    regulacion: 'Regulación federal de seguridad (FMCSA: horas de conducción, controles de drogas, cámaras), normas de emisiones de la EPA para camiones de 2027 (encarecen las tractoras nuevas) y litigios por accidentes («veredictos nucleares») que encarecen el seguro [1].',
    tendencias: 'Tecnología de tarificación y enrutado con datos (y con IA), dimensionadores automáticos, seguimiento en tiempo real y, a largo plazo, camiones autónomos en las líneas troncales [1, 6]. El sector se concentra en los operadores con red densa y servicio: Old Dominion tiene un margen EBIT del 25 % frente al 9-16 % del resto [4].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 17,
    posicion: 'Mayor operador LTL de Norteamérica por ingresos (8.778 M USD en 2025) y por muelles, con ≈17 % del mercado de EE. UU. [2, 3].',
    competidores: [
      { nombre: 'Old Dominion Freight Line', pais: 'EE. UU.', ticker: 'ODFL', ingresos: 5496, cuota_pct: 11, margen_ebit_pct: 24.8, comentario: 'Referente de servicio y margen; ROIC del 25 % [4, 5].' },
      { nombre: 'XPO', pais: 'EE. UU.', ticker: 'XPO', ingresos: 8157, cuota_pct: null, margen_ebit_pct: 9.2, comentario: 'LTL de Norteamérica más transporte en Europa; plan de mejora de margen [4, 5].' },
      { nombre: 'Saia', pais: 'EE. UU.', ticker: 'SAIA', ingresos: 3234, cuota_pct: 6, margen_ebit_pct: 10.4, comentario: 'Crece con terminales nuevas (compró terminales de Yellow) [4, 5].' },
      { nombre: 'ArcBest (ABF Freight)', pais: 'EE. UU.', ticker: 'ARCB', ingresos: 4010, cuota_pct: null, margen_ebit_pct: 3.1, comentario: 'LTL sindicalizado más logística [4, 5].' },
      { nombre: 'TFI International (TForce Freight)', pais: 'Canadá', ticker: 'TFII', ingresos: 7885, cuota_pct: null, margen_ebit_pct: 7.2, comentario: 'Compró UPS Freight en 2021 [4, 5].' },
      { nombre: 'Knight-Swift (AAA Cooper, MME)', pais: 'EE. UU.', ticker: 'KNX', ingresos: 7470, cuota_pct: null, margen_ebit_pct: 5.3, comentario: 'Sobre todo camión completo; LTL regional en crecimiento [4, 5].' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 3, evidencia: 'Densidad: más envíos por terminal y por ruta bajan el coste unitario; red con más muelles del sector [2].' },
        { fuente: 'Costes de cambio', puntuacion: 1, evidencia: 'Los clientes reparten carga entre varios operadores y cambian por servicio o precio [1].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 2, evidencia: 'Marca FedEx bajo licencia; reputación de servicio [1].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Escala: 26.000 muelles y la mayor red nacional [2].' },
        { fuente: 'Escala eficiente', puntuacion: 4, evidencia: 'Unos diez operadores de escala; terminales en zonas urbanas casi imposibles de replicar [2].' },
      ],
    },
    amenazas: 'Tres amenazas: (1) pérdida de cuota frente a Old Dominion y Saia, que crecen con mejor servicio mientras FedEx Freight pierde envíos (probabilidad media; −5,9 % de envíos en el 4T FY26) [8]; (2) una red que pierde densidad al separarse de FedEx (ventas cruzadas con FedEx Ground y Express, contratos de transición) (media) [1]; (3) camión completo barato que captura envíos grandes en la recesión (media) [6].',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Lo material es la seguridad vial y laboral (récord de accidentes evitables según el Departamento de Transporte en el 4T FY26) [8], las emisiones de la flota de gasoil y la gestión de los conductores (rotación del ≈10 %) [1]. La empresa es nueva y no ha publicado aún un informe de sostenibilidad propio.',
    controversias: 'Despido del vicepresidente ejecutivo comercial por violar el código de conducta (2-sep-2026), sin efecto en las cuentas según la empresa [1]. Litigios por accidentes, habituales en el sector [1].',
    confianza: 'Baja',
  },
  fuentes: [...fB, { id: 9, titulo: 'Ficha sectorial corta del transporte LTL de EE. UU. (notas/ficha-sector.md)', editor: 'Elaboración propia', tipo: 'Propia', fecha: '2026-10-16', url: null }],
};
// la cita [P1] del texto de sector se sustituye por la fuente 9 de esta nota
B.sector.definicion = B.sector.definicion.replace('[P1]', '[9]');
guarda('B', B);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = lista(['k10', 'k8jun26', 'k8sep', 'k8oct', 'g13', 'form4', 'pr', 'info']);
const cons = (nombre, cargo, tipo, desde, comisiones = null) => ({ nombre, cargo, tipo, desde, comisiones });
const C = {
  _estado: 'completa',
  directivos: {
    equipo: [
      { nombre: 'John A. Smith', cargo: 'Presidente ejecutivo (consejero delegado)', desde: '2026', participacion_pct: null, trayectoria: 'Dirigió FedEx Freight en 2018-2021 y volvió para la escisión; antes, cargos de dirección en FedEx [1]. Sin historial como consejero delegado de una cotizada.' },
      { nombre: 'Marshall Witt', cargo: 'Director financiero', desde: '2025', participacion_pct: null, trayectoria: 'Exdirector financiero de TD SYNNEX; en FedEx Freight desde octubre de 2025 [1].' },
    ],
    historial_guidance: [
      { anio: 'FY2026', guia: 'Objetivo interno del bonus: EBIT ajustado de 1.492 M', real: 'EBIT ajustado de 1.108 M', cumplida: 'No' },
      { anio: 'Jun-dic 2026', guia: 'Ingresos +4-6 %, EBIT ajustado 605-645 M, BPA 1,75-1,95 USD (2,40-2,60 ajustado)', real: 'En curso (resultados del trimestre jul-sep el 29-oct)', cumplida: 'Parcial' },
    ],
    comentario: 'Equipo nuevo como empresa cotizada: el consejero delegado conoce el negocio (lo dirigió en 2018-2021) y el director financiero viene de fuera del transporte [1]. No hay historial de guías públicas; el único dato es el objetivo interno del bonus de FY2026 (EBIT ajustado de 1.492 M), que se quedó lejos (1.108 M) [1, 2]. En septiembre se despidió al responsable comercial por violar el código de conducta y su área pasó al resto del equipo [3].',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      cons('R. Brad Martin', 'Presidente no ejecutivo (también presidente de FedEx)', 'Dominical', '2026', 'Nombramientos'),
      cons('John A. Smith', 'Consejero delegado', 'Ejecutivo', '2026'),
      cons('Sauerland', 'Consejero', 'Independiente', '2026', 'Auditoría (presidente)'),
      cons('Davis', 'Consejero', 'Independiente', '2026'),
      cons('Frieson', 'Consejera', 'Independiente', '2026'),
      cons('Gorman', 'Consejero', 'Independiente', '2026'),
      cons('King', 'Consejero (ex auditor interno de FedEx)', 'Independiente', '2026'),
      cons('Miller', 'Consejero', 'Independiente', '2026'),
      cons('Salcido', 'Consejero', 'Independiente', '2026'),
      cons('Samantha Smith', 'Consejera (empleada de FedEx)', 'Dominical', '2026'),
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: true, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: true,
    accionista_control: false, presidente_vinculado_control: true, cambios_cupula_24m: 1,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: 'FY2026', total: 9.32, fijo: 0.93, variable_corto: 3.84, variable_largo: 3.44, ratio_salario_medio: null },
    remuneracion: 'El consejero delegado cobró 9,32 M USD en FY2026: 0,93 M de fijo, 3,84 M de variable no en acciones y 3,44 M en acciones y opciones; el resto, pensión [1]. Para el periodo de transición, el bonus se mide con el EBIT ajustado (objetivo del 175 % del salario) y el incentivo a largo plazo TY26-CY28 (450 % del salario) es en un 75 % participaciones condicionadas a la caja libre ajustada y al BPA ajustado al 50 % y en un 25 % acciones restringidas [2]. Ligar el variable al BPA y la caja ajustados (sin costes de la separación) premia lo que la dirección controla, pero deja fuera el coste de la propia separación.',
    accionistas: [
      { nombre: 'FedEx Corporation', pct: 19.9, tipo: 'Corporativo', variacion: 'Debe venderlas antes del 1-jun-2028 para que la escisión siga libre de impuestos; vota en proporción al resto [5, 8]' },
      { nombre: 'BlackRock', pct: 5.6, tipo: 'Institucional', variacion: '13G de julio de 2026' },
      { nombre: 'The Vanguard Group', pct: 5.5, tipo: 'Institucional', variacion: '13G de julio de 2026' },
    ],
    insiders: [
      { fecha: '2026-10-16', persona: 'Consejeros y directivos (formularios 3 y 4 desde el 27-may-2026)', operacion: 'Concesión', acciones: null, importe: null },
    ],
    control_y_defensas: 'Sin accionista de control: FedEx conserva el 19,9 % pero ha pactado votar en proporción al resto y debe venderlo en 24 meses [5, 8]. El presidente, R. Brad Martin, es también presidente de FedEx, y una consejera es empleada de FedEx: hay dos consejeros vinculados al vendedor de las acciones y a la contraparte de los contratos de transición [1]. Consejo escalonado hasta la quinta junta anual; la primera será el 5-may-2027 [1, 4]. Contratos relevantes con FedEx: servicios transitorios (≈100 M anualizados, hasta dos años), licencia de marca y acuerdos comerciales [1].',
    alertas: [
      'Presidente del consejo que preside también FedEx, accionista del 19,9 % y contraparte de los contratos de transición [1].',
      'Consejo escalonado durante los primeros años [1].',
      'Despido del responsable comercial por violar el código de conducta (2-sep-2026) [3].',
      'Ninguna compra de acciones en mercado de consejeros o directivos desde la salida a bolsa [6].',
    ],
    confianza: 'Media',
  },
  fuentes: fC,
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = lista(['bolsa', 'ms', 'sa', 'dam', 'tes', 'sacomp', 'aaa', 'mme', 'ups', 'pr', 'g13', 'ir', 'k8sep', 'salpha', 'fw']);
// [nombre, ticker, pais, cap, EV, EV/EBITDA LTM, PER próximos 12 m (consenso 2026 × 0,21 + 2027 × 0,79), margen EBITDA, ROIC, rent. FCF, crecimiento de ventas 2026e]
// EBITDA de consenso 2026 y 2027 (MarketScreener) para el EV/EBITDA de los próximos 12 meses con los mismos pesos.
const ebitdaCons = { ODFL: [1990, 2217], SAIA: [664, 778], XPO: [1537, 1697], ARCB: [383, 466], TFII: [1287, 1490], KNX: [1305, 1666] };
const comps = [
  ['Old Dominion Freight Line', 'ODFL', 'US', 39170, 38900, 21.69, 29.0, 32.0, 25.36, 2.85, 8.5],
  ['Saia', 'SAIA', 'US', 9080, 9270, 15.06, 25.1, 18.15, 9.53, 2.81, 12.7],
  ['XPO', 'XPO', 'US', 22110, 25860, 18.72, 32.2, null, 11.03, 2.66, 11.3],
  ['ArcBest', 'ARCB', 'US', 2970, 3270, 11.30, 16.5, null, 5.42, 6.29, 12.4],
  ['TFI International', 'TFII', 'CA', 9390, 12230, 12.30, 16.5, null, 8.06, 7.02, 9.4],
  ['Knight-Swift', 'KNX', 'US', 10620, 13120, 12.50, 19.3, null, 1.68, 5.13, 10.4],
].map(([nombre, ticker, pais, capitalizacion, ev, ev_ebitda_ltm, per_ntm, margen_ebitda_pct, roic_pct, fcf_yield_pct, crecimiento_pct]) => {
  const ebitda = ev / ev_ebitda_ltm;
  const ventas = margen_ebitda_pct ? ebitda / (margen_ebitda_pct / 100) : null;
  return { nombre, ticker, pais, capitalizacion, ev_ventas: ventas ? Math.round((ev / ventas) * 100) / 100 : null, ev_ebitda_ltm, ev_ebitda_ntm: Math.round((ev / (0.21 * ebitdaCons[ticker][0] + 0.79 * ebitdaCons[ticker][1])) * 10) / 10, per_ntm, crecimiento_pct, margen_ebitda_pct, roic_pct, dn_ebitda: Math.round(((ev - capitalizacion) / ebitda) * 100) / 100, fcf_yield_pct };
});
const D = {
  _estado: 'completa',
  identificacion: {
    nombre: 'FedEx Freight Holding Company, Inc.', nombre_corto: 'FedEx Freight', ticker: 'FDXF', isin: null, mercado: 'New York Stock Exchange', indice_referencia: 'S&P 500',
    pais: 'Estados Unidos', pais_iso: 'US', sector: 'Industria', industria: 'Transporte por carretera (carga fraccionada, LTL)', sede: 'Memphis, Tennessee (EE. UU.)', fundacion: '1998 (primera compra de FedEx); cotiza desde 2026', empleados: 40000, web: 'fedexfreight.com',
    precio: 110.5, fecha_precio: '2026-10-15', acciones: 149.5, capitalizacion_publicada: null, free_float_pct: 80.1,
    max_52s: 200, min_52s: 105.75, volumen_medio_diario: '≈ 179 M USD/día (3 meses)', proximos_resultados: '2026-10-29',
  },
  consenso: {
    guidance: 'Guía del periodo de transición (1-jun a 31-dic-2026, dada el 25-jun-2026): ingresos +4-6 % sobre 5.100 M USD, EBIT de 475-515 M (ajustado 605-645 M), intereses de ≈135 M, tipo del 26 % y BPA de 1,75-1,95 USD (2,40-2,60 sin costes de la separación) sobre 149,5 M de acciones [10]. Objetivos de medio plazo del día del inversor (8-abr-2026): ingresos +4-6 % anual, EBIT ajustado +10-12 % anual, margen operativo ajustado del ≈12 % al 15 %, caja libre de más de 1.000 M al año, capex de ≈5 % de las ventas y apalancamiento bruto de 2,5 veces en 12 meses [15]. El ejercicio pasa a cerrar en diciembre: el próximo informe anual (10-KT) cubrirá junio-diciembre de 2026. Próximos resultados (trimestre jul-sep): 29-oct-2026, tras el cierre del mercado [12].',
    estimaciones: [
      { periodo: 'FY2027e', ingresos: 9350, ebitda: null, ebit: null, bpa: 4.62, dpa: null, fuente: 'Guía de jun-dic 2026 (punto medio, BPA ajustado 2,50 USD) + 5/12 del consenso de 2027 de MarketScreener; estimación propia [2, 10]' },
      { periodo: 'FY2028e', ingresos: 9823, ebitda: 1832, ebit: 1315, bpa: 5.57, dpa: 1.22, fuente: 'MarketScreener, 14 analistas: 7/12 de 2027 + 5/12 de 2028 (BPA ajustado) [2]' },
      { periodo: 'FY2029e', ingresos: 10231, ebitda: 2045, ebit: 1490, bpa: 6.51, dpa: null, fuente: 'MarketScreener: 7/12 de 2028 + 5/12 de 2029 [2]' },
    ],
    recomendaciones: { n_analistas: 14, comprar: null, mantener: null, vender: null, po_medio: 146.5, po_min: 108, po_max: 200 },
    revisiones: 'Los objetivos bajan con fuerza en septiembre y octubre: Goldman Sachs 186 → 171 USD (Comprar, 21-sep), Bank of America 157 → 140 (Comprar, 29-sep; además la saca de su lista de favoritas), JPMorgan 160 → 149 (Comprar, 5-oct), Bernstein 133 (Mantener, 5-oct), BMO 163 → 130 y Truist 155 → 115 (Mantener, 7-oct), Stifel 160 → 129 (Mantener, 8-oct) y Raymond James 180 → 165 (Comprar, 15-oct) [3]. El objetivo medio es de 146,5 USD (mediana 140,5; mínimo 108, máximo 200) con consenso de Comprar [3]. El consenso de MarketScreener está en años naturales (2027: ventas 9.588 M, EBITDA 1.717 M, BPA 5,08 USD; 2028: 10.145 M, 1.993 M y 6,27 USD; 2029: 10.345 M, 2.118 M y 6,84 USD) y lo pasamos a ejercicios a mayo con pesos de 7/12 y 5/12; el EBITDA de consenso excluye los costes de la separación, que a partir de FY2028e son residuales, por lo que lo tratamos como contable [2].',
    base_ebitda: 'contable', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    ...(({ tramo_drawdown, ...r }) => r)(BOLSA.bolsa),
    beta: null, volatilidad_pct: 61.8, max_drawdown_pct: -42.3, posicion_corta_pct: null,
    comentario: 'Cotiza desde el 1-jun-2026 (antes, en «when-issued» desde el 27-may): sin historia anual ni beta propia [1]. Abrió el 1-jun a 149,53 USD, subió a 188,46 el 9-jun y desde entonces ha caído un 42 % hasta 110,50 (cierre del 15-oct), con un mínimo de 105,75 el 14-oct [1]. Desde el 1-jun pierde un 26,1 % frente al −4,6 % del índice de transporte (IYT) y el +1,7 % del S&P 500; desde el 1-sep, un 13,4 % mientras los comparables LTL suben un 0-3 % [1, 6].',
    contexto: {
      movimiento: { fecha: '2026-10-15', var_1m_pct: -9.2, var_3m_pct: -27.4, var_6m_pct: null, var_12m_pct: null, dist_max_52s_pct: -41.4, dist_min_52s_pct: 1.7, dist_max_historico_pct: -41.4, tendencia: 'bajista', volatilidad_60d_pct: 39, avisos: ['P4: en mínimos de 52 semanas'] },
      movimientos_fuertes: [
        { periodo: '9-jun a 10-jul 2026', var_pct: -20.7, causa: 'Caída de todo el sector LTL tras el arranque de la cotización (Saia −29 %, TFI −27 % desde el 1-jun) por el volumen débil y la presión de los vendedores naturales de la escisión (fondos de FedEx que no quieren un transportista pequeño) [1, 6].', veredicto: 'no cambia', condicion: null },
        { periodo: 'sep-oct 2026', var_pct: -13.4, causa: 'Caída propia frente a un sector plano: recortes de objetivo de ocho bancos, Bank of America la saca de su lista de favoritas, despido del responsable comercial y gasoil caro; los artículos hablan de una acción «valorada para un trimestre limpio que aún no ha tenido» [3, 13, 14].', veredicto: 'no cambia', condicion: null },
      ],
      noticias: [
        { fecha: '2026-06-01', tipo: 'accionista', hecho: 'Escisión: FedEx reparte el 80,1 % y conserva el 19,9 % (29,75 M de acciones, ≈3.300 M USD al precio de hoy), que debe vender antes del 1-jun-2028 para no perder la exención fiscal [11].', veredicto: 'retrasa', condicion: 'Hasta que FedEx coloque o canjee su 19,9 % (o anuncie cómo y cuándo), o hasta que el precio baje lo bastante para descontar esa venta.' },
        { fecha: '2026-06-25', tipo: 'resultados', hecho: '4T FY26: ingresos +4,8 %, EBIT ajustado −23,9 %, envíos −5,9 %; guía de jun-dic 2026 con EBIT ajustado plano [10].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-09-02', tipo: 'directivos', hecho: 'Despido del vicepresidente ejecutivo comercial por violar el código de conducta; sin efecto en las cuentas según la empresa [13].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-07', tipo: 'recomendación', hecho: 'Ocho recortes de objetivo en septiembre-octubre (Truist 115, Stifel 129, BMO 130, BofA 140); el objetivo medio sigue en 146,5 USD [3].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-29', tipo: 'resultados', hecho: 'Primeros resultados trimestrales como empresa independiente (jul-sep 2026) y actualización del coste de los contratos de transición [12].', veredicto: 'no cambia', condicion: null },
      ],
      proximos_resultados: '2026-10-29',
      veredicto: 'retrasa',
      condicion: 'FedEx debe vender 29,75 M de acciones (19,9 %, ≈18 sesiones de volumen medio) antes del 1-jun-2028: hasta que anuncie la colocación o el canje, o hasta un precio que la descuente, no se abre una compra aunque la regla la diera.',
      comentario: 'La acción está en mínimos (−41 % desde el máximo de junio) con un movimiento en dos tramos: junio-julio, con todo el sector LTL; septiembre-octubre, propio, con recortes de objetivo y dudas sobre los costes de ser independiente. Hay un hecho pendiente con fecha que puede mover el precio: FedEx tiene que vender su 19,9 % antes de junio de 2028 por motivos fiscales, y esa oferta (≈3.300 M USD, unas 18 sesiones de volumen) pesa sobre la cotización, como en el precedente de Rai Way con la participación de la RAI. Los resultados del 29-oct no retrasan la decisión (regla 11). Veredicto: retrasa, hasta que FedEx anuncie cómo y cuándo vende o el precio lo descuente.',
    },
    confianza: 'Media',
  },
  multiplos_historicos: {
    serie: [],
    comentario: 'Sin historia: la acción cotiza desde el 1-jun-2026. Hoy cotiza a ≈24,5 veces nuestro BPA ajustado del ejercicio a mayo de 2027 (4,50 USD) y a ≈13,5 veces el EBITDA de FY2026 sin costes de la separación [1]. La referencia son los comparables: Old Dominion ≈29x, Saia ≈25x y XPO ≈32x el beneficio de los próximos 12 meses; ArcBest y TFI, ≈16,5x [6].',
    confianza: 'Baja',
  },
  comparables: {
    criterio: 'Los cuatro grandes LTL cotizados de EE. UU. (Old Dominion, Saia, XPO, ArcBest), más TFI International (TForce Freight) y Knight-Swift (AAA Cooper y MME), que tienen LTL pero también camión completo. Cifras de Stock Analysis del 16-oct-2026 (capitalización, EV, EV/EBITDA, ROIC y rentabilidad de la caja libre) y consenso de MarketScreener para el PER de los próximos 12 meses (BPA de 2026 × 0,21 + 2027 × 0,79) y el crecimiento de ventas de 2026 [2, 6]. La deuda neta sobre EBITDA es (EV − capitalización) ÷ EBITDA implícito; el EV/EBITDA de los próximos 12 meses usa el EBITDA de consenso de 2026 y 2027 con los mismos pesos. Margen EBITDA solo donde Stock Analysis lo publica.',
    empresas: comps,
    comentario: 'La mediana del PER de los próximos 12 meses es de 22,2x; solo los LTL puros, ≈27x (Old Dominion 29x, Saia 25x, XPO 32x) [2, 6]. FedEx Freight cotiza a ≈24,5x nuestro BPA de 2027e, entre ArcBest y TFI (16,5x) y los LTL puros: el mercado le da prima sobre los más débiles y descuento sobre los mejores. Old Dominion merece su prima (margen EBIT del 25 %, caja neta); FedEx Freight tiene un margen intermedio (15,8 % en FY2025) y más deuda (2,8 veces el EBITDA frente a caja neta de Old Dominion y 0,3 veces de Saia).',
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2021-07', objetivo: 'AAA Cooper Transportation', comprador: 'Knight-Swift', ev: 1350, ev_ventas: null, ev_ebitda: 9.6, prima_pct: null, excluir: false, comentario: 'EBITDA 2021e de 140 M; ventas de 780 M [7].' },
      { fecha: '2021-12', objetivo: 'Midwest Motor Express (MME)', comprador: 'Knight-Swift', ev: 150, ev_ventas: null, ev_ebitda: 5.6, prima_pct: null, excluir: false, comentario: 'EBITDA ajustado 2021e de 27 M; ventas de 137 M [8].' },
      { fecha: '2021-04', objetivo: 'UPS Freight (TForce Freight)', comprador: 'TFI International', ev: 800, ev_ventas: 0.27, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Negocio con pérdidas; ventas de ≈3.000 M [9].' },
    ],
    comentario: 'Las compras de LTL se pagaron a 6-10 veces el EBITDA en 2021, antes de la subida de múltiplos del sector y de la quiebra de Yellow [7-9]. FedEx Freight cotiza a ≈13,5 veces su EBITDA sin costes de la separación. No es objetivo realista de una compra (17.000 M USD de capitalización).',
    confianza: 'Baja',
  },
  fuentes: fD,
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = lista(['st', 'salpha', 'sa']);
const Ent = {
  _estado: 'completa',
  sentimiento: {
    tono: 'Negativo', tendencia: 'Empeorando',
    revisadas: [
      { plataforma: 'Stocktwits ($FDXF)', fecha: '2026-10', n_comentarios: 30, tono: 'Negativo', resumen: 'Frustración por la caída continua («cotiza como si fuera a cerrar»), quejas por el gasoil caro y comentarios sobre las opiniones de Jim Cramer; pocos mensajes de fondo [1].' },
      { plataforma: 'Seeking Alpha (artículos y titulares)', fecha: '2026-06 a 2026-10', n_comentarios: 8, tono: 'Dividido', resumen: 'De «37 veces el beneficio adelantado en el cuarto año de recesión» (15-jun) y «buena historia a precio completo» (13-jul) a «la capacidad libre hace atractiva una recuperación temprana» (17-jul) y «valorada para un trimestre limpio que aún no ha tenido» (25-sep); Jefferies la llamó «la historia más atractiva del LTL» (23-jun) y JPMorgan ve «recorrido» (8-sep) [2].' },
      { plataforma: 'Stock Analysis (cambios de objetivo)', fecha: '2026-10', n_comentarios: 8, tono: 'Negativo', resumen: 'Ocho recortes de objetivo en un mes; cuatro bancos en Mantener [3].' },
    ],
    temas: [
      { tema: 'Costes de ser independiente', postura: 'Bajista', peso: 'Alto', contraste: 'Cierto: ≈600 M anualizados más 100 M de contratos de transición y 150 M más de costes de separación hasta mayo de 2027 (transcripción del 4T FY26).' },
      { tema: 'Recuperación del ciclo LTL', postura: 'Alcista', peso: 'Medio', contraste: 'Aún sin pruebas en el volumen (envíos −5,9 % en el 4T FY26); la capacidad libre es real.' },
      { tema: 'Valoración frente a Old Dominion y Saia', postura: 'Dividida', peso: 'Medio', contraste: 'A ≈24,5x el BPA de 2027e, más barata que los LTL puros pero con peor margen y más deuda.' },
    ],
    lectura: 'El inversor particular está desanimado tras una caída del 42 % en cuatro meses y los analistas recortan objetivos sin cambiar la recomendación. Es el ánimo típico de una escisión que los accionistas originales venden; no aporta un riesgo nuevo, pero sí indica que el precio puede seguir presionado hasta que haya un trimestre limpio y se aclare la venta del 19,9 % de FedEx.',
    confianza: 'Baja',
  },
  fuentes: fE,
};
guarda('E', Ent);
console.log('Notas A-E escritas');
