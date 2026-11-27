// Escribe las notas A-E de Fortinet (corte 2026-11-27; iteración tras el 3T26, partiendo del script del 15-oct con cada dato comprobado a hoy) a partir del XBRL de la SEC (cuentas-xbrl.json), las notas de prensa
// de resultados (8-K 99.1), el 10-K 2025, el 10-Q del 2T26, el proxy de 2026, el 8-K de la junta, form4.mjs, bolsa.mjs,
// Stock Analysis, Dell'Oro y foros. Cada nota cita solo con [n] de su propia lista. Ejecutar: node notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const X = JSON.parse(fs.readFileSync(path.join(dir, 'cuentas-xbrl.json'), 'utf8'));
const BOLSA = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const E8 = 'https://www.sec.gov/Archives/edgar/data/1262039';
const r1 = (v) => (v == null ? null : Math.round(v * 10) / 10);
const r2 = (v) => (v == null ? null : Math.round(v * 100) / 100);
const ANIOS = ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'];

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Form 10-K 2025 (cuentas auditadas; notas de ingresos por geografía, distribuidores, deuda, recompras, Linksys, plantilla)', editor: 'Fortinet, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-25', url: `${E8}/000126203926000007/ftnt-20251231.htm` },
  { id: 2, titulo: 'Hechos XBRL (companyfacts): cuenta, balance y flujos 2016-2025, inversiones financieras, ingresos diferidos, comisiones activadas, retenciones fiscales', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0001262039.json' },
  { id: 3, titulo: 'Fortinet Reports Strong Second Quarter 2026 Financial Results (8-K, anexo 99.1)', editor: 'Fortinet, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-07-29', url: `${E8}/000126203926000018/ftntq2-2026ex991.htm` },
  { id: 4, titulo: 'Form 10-Q del 2T26 (balance a 30-jun-2026, obligaciones de desempeño 7.730 M, compromisos de compra 1.667 M, recompras, demandas)', editor: 'Fortinet, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-07-30', url: `${E8}/000126203926000021/ftnt-20260630.htm` },
  { id: 5, titulo: 'Fortinet Reports Strong First Quarter 2026 Financial Results (8-K, anexo 99.1)', editor: 'Fortinet, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-05-06', url: `${E8}/000126203926000010/ftntq1-2026ex991.htm` },
  { id: 6, titulo: 'Fortinet Reports Strong Fourth Quarter and Full Year 2025 Financial Results (8-K, anexo 99.1)', editor: 'Fortinet, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-05', url: `${E8}/000126203926000003/ftntq4-2025ex991.htm` },
  { id: 7, titulo: 'Fortinet Reports Third Quarter 2025 Financial Results (8-K, anexo 99.1)', editor: 'Fortinet, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2025-11-05', url: `${E8}/000126203925000036/ftntq3-2025ex991.htm` },
  { id: 8, titulo: 'Fortinet Reports Second Quarter 2025 Financial Results (8-K, anexo 99.1)', editor: 'Fortinet, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2025-08-06', url: `${E8}/000126203925000025/ftntq2-2025ex991.htm` },
  { id: 9, titulo: 'Fortinet Reports First Quarter 2025 Financial Results (8-K, anexo 99.1)', editor: 'Fortinet, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2025-05-07', url: `${E8}/000126203925000014/ftntq1-2025ex991.htm` },
  { id: 10, titulo: 'Fortinet Reports Fourth Quarter and Full Year 2024 Financial Results (8-K, anexo 99.1)', editor: 'Fortinet, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2025-02-06', url: `${E8}/000126203925000007/ftntq4-2024ex991.htm` },
  { id: 11, titulo: 'Fortinet Reports Strong Third Quarter 2026 Financial Results (8-K, anexo 99.1: cuenta, balance y flujos a 30-sep-2026, facturación, guía del 4T y de 2026)', editor: 'Fortinet, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-28', url: `${E8}/000126203926000024/ftntq3-2026ex991.htm` },
  { id: 12, titulo: 'Form 10-Q del 3T26 (RPO 7.980 M, ingresos por línea y región, distribuidores, 734,7 M de acciones a 27-oct, recompras, compromisos de compra 1.929,5 M, memoria, litigios)', editor: 'Fortinet, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-30', url: `${E8}/000126203926000027/ftnt-20260930.htm` },
  { id: 13, titulo: 'Fortinet (FTNT) Q3 2026 Earnings Call Transcript', editor: 'The Motley Fool', tipo: 'Primaria', fecha: '2026-10-29', url: 'https://www.fool.com/earnings/call-transcripts/2026/10/29/fortinet-ftnt-q3-2026-earnings-call-transcript/' },
];
const cx = Object.fromEntries(X.financieros.cuenta.map((r) => [r.periodo, r]));
const bx = Object.fromEntries(X.balance.historico.map((r) => [r.periodo, r]));
const fx = Object.fromEntries(X.flujos.historico.map((r) => [r.periodo, r]));
// Split 5:1 de junio de 2022: BPA y acciones de 2018-2019 tal como se publicaron; se reexpresan (los de 2020-2021 ya vienen reexpresados en el 10-K 2022).
const split = { 2018: 5, 2019: 5 };
// Inversiones financieras a corto (OtherShortTermInvestments / ShortTermInvestments) y largo plazo (LongTermInvestments), XBRL: la «caja» las incluye.
const inversiones = { 2018: 537.2 + 67.0, 2019: 843.1 + 144.3, 2020: 775.5 + 118.3, 2021: 1194.0 + 440.8, 2022: 502.6 + 45.5, 2023: 1021.5 + 0, 2024: 1190.6 + 0, 2025: 1087.2 + 339.7 };
// Ingresos diferidos corrientes + no corrientes (DeferredRevenueCurrent / Noncurrent)
const diferidos = { 2018: 965.9 + 720.9, 2019: 1155.8 + 953.3, 2020: 1392.8 + 1212.5, 2021: 1777.4 + 1675.5, 2022: 2349.3 + 2291.0, 2023: 2848.7 + 2886.3, 2024: 3276.2 + 3084.7, 2025: 3636.0 + 3479.8 };
// Aumento neto de comisiones activadas (IncreaseDecreaseInDeferredCharges − CapitalizedContractCostAmortization): se suma al capex
const comisiones = { 2018: 136.4 - 90.9, 2019: 162.3 - 107.9, 2020: 205.1 - 137.4, 2021: 294.5 - 175.9, 2022: 318.2 - 223.3, 2023: 353.5 - 266.3, 2024: 311.1 - 293.7, 2025: 449.0 - 336.3 };
// Retenciones fiscales pagadas al liquidar acciones de empleados (PaymentsRelatedToTaxWithholdingForShareBasedCompensation): se suman a las recompras
const retenciones = { 2018: 67.2, 2019: 96.0, 2020: 108.2, 2021: 167.9, 2022: 160.4, 2023: 112.5, 2024: 100.9, 2025: 126.3 };

// Resultado de participadas por el método de la participación (Linksys y otra), debajo del BAI en el 10-K: se suma al resultado financiero y al BAI para que cuadre el beneficio neto.
const participadas = { 2021: -7.4, 2022: -66.7, 2023: -42.1, 2024: -29.4, 2025: 10.3 };
const cuenta = ANIOS.map((y) => {
  const c = cx[y]; const s = split[y] ?? 1;
  const pe = participadas[y] ?? 0;
  return { periodo: y, ingresos: c.ingresos, coste_ventas: c.coste_ventas, gastos_generales: c.gastos_generales, ebitda: c.ebitda, amortizaciones: c.amortizaciones, ebit: c.ebit, resultado_financiero: r1(c.resultado_financiero + pe), bai: r1(c.bai + pe), impuestos: c.impuestos, minoritarios: c.minoritarios ?? 0, beneficio_neto: c.beneficio_neto, gastos_financieros: c.gastos_financieros ?? 0, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: r2(c.bpa / s), dpa: 0, dpa_extraordinario: 0, acciones_diluidas: r1(c.acciones_diluidas * s) };
});
const historico = ANIOS.map((y) => {
  const b = bx[y];
  return { periodo: y, activo_total: b.activo_total, activo_corriente: b.activo_corriente, pasivo_corriente: b.pasivo_corriente, pasivo_total: b.pasivo_total, fondo_comercio: b.fondo_comercio, intangibles: b.intangibles, inmovilizado_material: b.inmovilizado_material, existencias: b.existencias, clientes: b.clientes, proveedores: b.proveedores, activos_contrato: null, pasivos_contrato: r1(diferidos[y]), caja: r1(b.caja + inversiones[y]), deuda_financiera: b.deuda_financiera ?? 0, arrendamientos: 0, patrimonio_neto: b.patrimonio_neto, minoritarios: 0, reservas: b.reservas };
});
const flujos = ANIOS.map((y) => {
  const f = fx[y];
  return { periodo: y, flujo_operativo: f.flujo_operativo, capex: r1(f.capex + comisiones[y]), pagos_arrendamientos: 0, adquisiciones: f.adquisiciones ?? 0, desinversiones: 0, dividendos: 0, recompras: r1(f.recompras + retenciones[y]), emision_acciones: f.emision_acciones ?? 0, intereses_en_financiacion: 0 };
});
const A = {
  _estado: 'Completo. Cuentas 2018-2025 del XBRL de la SEC (descargado el 27-nov) comprobadas con el 10-K 2025 y las notas de resultados; LTM a septiembre de 2026 con la nota y el 10-Q del 3T26; transcripción del 3T26.',
  negocio: {
    segmentos: [
      { nombre: 'Producto (equipos FortiGate y otros)', descripcion: 'Cortafuegos FortiGate con sus procesadores propios (ASIC), conmutadores, puntos de acceso, licencias de software y máquinas virtuales', tipo_resultado: null, historico: [{ periodo: '2023', ingresos: 1927.3, resultado: null }, { periodo: '2024', ingresos: 1908.7, resultado: null }, { periodo: '2025', ingresos: 2218.4, resultado: null }] },
      { nombre: 'Servicios (suscripciones de seguridad y soporte)', descripcion: 'Suscripciones FortiGuard (amenazas, filtrado web, SASE, SecOps) y soporte técnico FortiCare, cobrados por adelantado', tipo_resultado: null, historico: [{ periodo: '2023', ingresos: 3377.5, resultado: null }, { periodo: '2024', ingresos: 4047.1, resultado: null }, { periodo: '2025', ingresos: 4581.2, resultado: null }] },
    ],
    geografias: [{ nombre: 'Estados Unidos', peso_pct: 28.4 }, { nombre: 'Resto de América', peso_pct: 11.3 }, { nombre: 'Europa, Oriente Medio y África', peso_pct: 41.7 }, { nombre: 'Asia-Pacífico', peso_pct: 18.6 }],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Facturación (billings)', valor_anterior: '1.807,7 M USD (3T25)', valor_actual: '2.336,3 M USD (3T26)', variacion: '+29 %', comentario: 'Guía 2026 subida por tercera vez, a 9.568-9.718 M USD (+28 % en el punto medio); 4T26: 2.775-2.925 M (+20 %) [11, 13].' },
      { kpi: 'Ingresos de producto', valor_anterior: '559,3 M USD (3T25)', valor_actual: '765,0 M USD (3T26)', variacion: '+37 %', comentario: 'Precio medio más alto (modelos de más rendimiento y subidas por la memoria: ≈10 puntos de crecimiento según Ken Xie) y más unidades; +52 % en el 2T [12, 13].' },
      { kpi: 'Ingresos de servicios', valor_anterior: '1.165,6 M USD (3T25)', valor_actual: '1.313,4 M USD (3T26)', variacion: '+13 %', comentario: 'Suscripciones +12 % y soporte +13 %; por debajo de lo que esperaba el mercado; la facturación de servicios crece un 26 % y los diferidos a corto un 14,5 % [12, 13].' },
      { kpi: 'Obligaciones de desempeño pendientes (RPO)', valor_anterior: '7.180 M USD (dic-25)', valor_actual: '7.980 M USD (sep-26)', variacion: '+11,1 % en 9 meses', comentario: '3.980 M se reconocerán en 12 meses y 3.180 M en los años dos y tres [12, 1].' },
      { kpi: 'Margen operativo GAAP', valor_anterior: '31,7 % (3T25)', valor_actual: '33,9 % (3T26)', variacion: '+2,2 puntos', comentario: 'Ajustado (sin pagos en acciones), 38,2 %, récord de un tercer trimestre [11].' },
      { kpi: 'Pagos en acciones (% de ingresos)', valor_anterior: '4,1 % (2025)', valor_actual: '3,9 % (9M26)', variacion: '−0,2 puntos', comentario: '231,9 M USD en nueve meses; muy por debajo de CrowdStrike o Palo Alto [11, 2].' },
    ],
    confianza: 'Alta',
  },
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM sep-26', fecha_fin: '2026-09-30', ingresos: 7880.9, ebitda: 2759.3, ebit: 2599.2, beneficio_neto: 2282.3, bpa: 3.06, dpa: 0, dpa_extraordinario: 0, fcf: 3431.3, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [],
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '4T24', ingresos: 1660.1, crecimiento_pct: 17.3, crecimiento_organico_pct: null, ebitda: 609.3, margen_ebitda_pct: 36.7, bpa: 0.68, vs_consenso: null },
      { periodo: '1T25', ingresos: 1539.7, crecimiento_pct: 13.8, crecimiento_organico_pct: null, ebitda: 489.6, margen_ebitda_pct: 31.8, bpa: 0.56, vs_consenso: null },
      { periodo: '2T25', ingresos: 1630.0, crecimiento_pct: 13.6, crecimiento_organico_pct: null, ebitda: 496.3, margen_ebitda_pct: 30.4, bpa: 0.57, vs_consenso: null },
      { periodo: '3T25', ingresos: 1724.9, crecimiento_pct: 14.4, crecimiento_organico_pct: null, ebitda: 585.7, margen_ebitda_pct: 34.0, bpa: 0.62, vs_consenso: null },
      { periodo: '4T25', ingresos: 1905.0, crecimiento_pct: 14.8, crecimiento_organico_pct: null, ebitda: 665.1, margen_ebitda_pct: 34.9, bpa: 0.68, vs_consenso: 'Superior' },
      { periodo: '1T26', ingresos: 1849.6, crecimiento_pct: 20.1, crecimiento_organico_pct: null, ebitda: 619.8, margen_ebitda_pct: 33.5, bpa: 0.72, vs_consenso: 'Superior' },
      { periodo: '2T26', ingresos: 2047.9, crecimiento_pct: 25.6, crecimiento_organico_pct: null, ebitda: 730.7, margen_ebitda_pct: 35.7, bpa: 0.82, vs_consenso: 'Superior' },
      { periodo: '3T26', ingresos: 2078.4, crecimiento_pct: 20.5, crecimiento_organico_pct: null, ebitda: 743.7, margen_ebitda_pct: 35.8, bpa: 0.86, vs_consenso: 'Superior' },
    ],
    confianza: 'Alta',
  },
  balance: {
    historico,
    vencimientos: [{ anio: '2031', importe: 500 }],
    liquidez: 'Caja 3.750,6 M USD + inversiones a corto 1.048,4 M y a largo 519,4 M = 5.318,4 M USD a 30-sep-2026; deuda de 497,1 M (bono 2,2 % con vencimiento en marzo de 2031) tras devolver en marzo los 500 M del bono al 1 % [11, 12].',
    rating: "Moody's A3 (subido desde Baa1 en 2026)",
    coste_deuda_pct: 2.2, vida_media_anios: 4.4,
    confianza: 'Alta',
  },
  flujos: { historico: flujos, confianza: 'Alta' },
  calidad: { auditor: 'Deloitte & Touche LLP', anios_auditor: null, opinion: 'Favorable (cuentas y control interno a 31-dic-2025)', confianza: 'Alta' },
  fuentes: fA,
  huecos: [
    { seccion: 'calidad', campo: 'años con el mismo auditor', tipo: 'Complemento', intentos: '1) 10-K 2025 (informe de Deloitte sin año de inicio); 2) proxy 2026 (ratificación sin año); 3) búsqueda en el informe del auditor (no aparece)', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Form 10-K 2025: Business (Security Fabric, FortiASIC, canal de distribuidores, competencia)', editor: 'Fortinet, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-25', url: `${E8}/000126203926000007/ftnt-20251231.htm` },
  { id: 2, titulo: 'Network Security Market to Exceed $26 B in 2025 as SSE and WAF Lead Cloud-Delivered Expansion (≈29.000 M USD en 2026)', editor: "Dell'Oro Group", tipo: 'Sectorial', fecha: '2025-12-04', url: 'https://www.delloro.com/news/network-security-market-to-exceed-26-b-in-2025-as-sse-and-waf-lead-cloud-delivered-expansion/' },
  { id: 3, titulo: 'Network Security Market: 28.400 M USD en 2024, 32.910 M en 2025 y 117.720 M en 2035 (+13,59 % anual)', editor: 'Roots Analysis', tipo: 'Sectorial', fecha: '2025', url: 'https://www.rootsanalysis.com/network-security-market' },
  { id: 4, titulo: 'Palo Alto Networks: datos financieros (ingresos LTM 12.451 M USD, margen EBITDA 13,1 %)', editor: 'Yahoo Finance (quoteSummary)', tipo: 'Datos de mercado', fecha: '2026-11-27', url: 'https://finance.yahoo.com/quote/PANW/key-statistics' },
  { id: 5, titulo: 'Cisco Systems: datos financieros (ingresos LTM 66.959 M USD, margen EBITDA 30,9 %)', editor: 'Yahoo Finance (quoteSummary)', tipo: 'Datos de mercado', fecha: '2026-11-27', url: 'https://finance.yahoo.com/quote/CSCO/key-statistics' },
  { id: 6, titulo: 'Check Point Software: datos financieros (ingresos LTM 2.757 M USD, margen EBITDA 29,6 %)', editor: 'Yahoo Finance (quoteSummary)', tipo: 'Datos de mercado', fecha: '2026-11-27', url: 'https://finance.yahoo.com/quote/CHKP/key-statistics' },
  { id: 7, titulo: 'Zscaler: datos financieros (ingresos LTM 3.514 M USD, margen EBITDA 1,8 %)', editor: 'Yahoo Finance (quoteSummary)', tipo: 'Datos de mercado', fecha: '2026-11-27', url: 'https://finance.yahoo.com/quote/ZS/key-statistics' },
  { id: 8, titulo: 'CrowdStrike: datos financieros (ingresos LTM 5.745 M USD, margen EBITDA 3,3 %)', editor: 'Yahoo Finance (quoteSummary)', tipo: 'Datos de mercado', fecha: '2026-11-27', url: 'https://finance.yahoo.com/quote/CRWD/key-statistics' },
  { id: 9, titulo: 'Fortinet Reports Strong Second Quarter 2026 Financial Results (Intel SP6, FortiSOC, Project Glasswing, Moody\'s A3)', editor: 'Fortinet, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-07-29', url: `${E8}/000126203926000018/ftntq2-2026ex991.htm` },
  { id: 10, titulo: 'Fortinet Stock Jumped 9% on a Cybersecurity Rally (Gartner Magic Quadrant de Hybrid Mesh Firewall 2026; Goldman Sachs Communacopia)', editor: 'TIKR', tipo: 'Prensa', fecha: '2026-09-15', url: 'https://www.tikr.com/blog/fortinet-stock-jumped-9-on-a-cybersecurity-rally-heres-where-the-stock-could-go' },
  { id: 11, titulo: 'Fortinet: noticias (compra de Virtue AI, 17-ago-2026; TD Synnex como socio global, 15-jul-2026; Intel SP6, 21-jul-2026)', editor: 'Seeking Alpha (titulares)', tipo: 'Prensa', fecha: '2026-10-13', url: 'https://seekingalpha.com/symbol/FTNT/news' },
  { id: 12, titulo: 'Form 10-Q del 2T26: Business y riesgos (FortiAI, SASE unificado, SecOps; memoria y costes de componentes)', editor: 'Fortinet, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-07-30', url: `${E8}/000126203926000021/ftnt-20260630.htm` },
  { id: 13, titulo: 'Fortinet Reports Strong Third Quarter 2026 Financial Results (FortiGuard Inline AI Security, FortiLink SASE, socio de NVIDIA, Oracle y Microsoft)', editor: 'Fortinet, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-28', url: `${E8}/000126203926000024/ftntq3-2026ex991.htm` },
  { id: 14, titulo: 'Fortinet (FTNT) Q3 2026 Earnings Call Transcript (mercado de cortafuegos con SASE +16 %; facturación de SASE firewall +31 %; OT +40 %)', editor: 'The Motley Fool', tipo: 'Primaria', fecha: '2026-10-29', url: 'https://www.fool.com/earnings/call-transcripts/2026/10/29/fortinet-ftnt-q3-2026-earnings-call-transcript/' },
];
const B = {
  _estado: "Completo. Tamaño de mercado con dos fuentes (Dell'Oro y Roots Analysis), que difieren por perímetro; competidores con cifras de Yahoo Finance al 27-nov; novedades del 3T26 de la nota y la transcripción.",
  historia: {
    hitos: [
      { anio: '2000', hito: 'Ken y Michael Xie fundan Fortinet en Sunnyvale (California) tras vender NetScreen a Juniper; apuestan por un cortafuegos «todo en uno» con procesador propio (FortiASIC) [1].' },
      { anio: '2009', hito: 'Salida a bolsa en el Nasdaq (FTNT) [1].' },
      { anio: '2016', hito: 'Lanza la Security Fabric: todos los productos sobre un mismo sistema operativo (FortiOS) [1].' },
      { anio: '2021', hito: 'Emite 1.000 M USD en bonos (2026 y 2031) y toma el 50,8 % de Linksys por 160 M [1].' },
      { anio: '2022', hito: 'Desdoblamiento de 5 por 1 de las acciones (junio) y récord de recompras (1.991 M USD) [1].' },
      { anio: '2024', hito: 'Compra Lacework (seguridad en la nube) y Next DLP; récord de margen operativo GAAP del 30 % [1].' },
      { anio: '2025', hito: 'Agosto: dice que la renovación de cortafuegos de 2026 va al 40-50 % y la acción cae un 22 % en un día; demandas colectivas de accionistas [12]. Se queda el 100 % de Linksys [1].' },
      { anio: '2026', hito: 'Ingresos de producto +41 % y +52 % en el 1T y el 2T por la renovación y los centros de datos de IA; socio de Anthropic (Project Glasswing) y OpenAI; Moody\'s sube el rating a A3; la acción sube un 132 % en el año hasta el 14-oct [9, 10].' },
      { anio: '2026 (oct.)', hito: '3T26: facturación +29 % y tercera subida de la guía, pero servicios +13 % y guía de servicios rebajada; la acción cae un 20 % el 29-oct [13, 14].' },
    ],
    confianza: 'Alta',
  },
  negocio: { confianza: 'Alta' },
  sector: {
    tamano: "≈26.000 M USD en 2025 (seguridad de red: cortafuegos, SSE, WAF, ADC; ingresos de fabricantes) [2]; Roots Analysis da 32.910 M con un perímetro más amplio [3]",
    unidad_serie: 'millones de USD',
    serie: [{ anio: '2024', tamano: 23900 }, { anio: '2025', tamano: 26000 }, { anio: '2026e', tamano: 29000 }],
    tcac_historico_pct: null, tcac_previsto_pct: 11.0,
    cr5_pct: null, estructura: 'Moderadamente concentrada',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 26.2,
    competidores: [
      { nombre: 'Palo Alto Networks', pais: 'EE. UU.', ticker: 'PANW', ingresos: 12451, cuota_pct: null, margen_ebit_pct: null, comentario: 'Líder en cortafuegos de gama alta y plataforma (Prisma SASE, Cortex); margen EBITDA contable del 13,1 % [4].' },
      { nombre: 'Cisco (Secure Firewall, Meraki)', pais: 'EE. UU.', ticker: 'CSCO', ingresos: 66959, cuota_pct: null, margen_ebit_pct: null, comentario: 'Redes con seguridad integrada; su seguridad es una parte pequeña de 66.959 M de ingresos [5].' },
      { nombre: 'Check Point Software', pais: 'Israel', ticker: 'CHKP', ingresos: 2757, cuota_pct: null, margen_ebit_pct: null, comentario: 'Cortafuegos clásico, crece un 3-6 % y pierde cuota; margen EBITDA del 29,6 % [6].' },
      { nombre: 'Zscaler', pais: 'EE. UU.', ticker: 'ZS', ingresos: 3514, cuota_pct: null, margen_ebit_pct: null, comentario: 'Seguridad entregada desde la nube (SSE): la alternativa al cortafuegos en la sede [7].' },
      { nombre: 'CrowdStrike', pais: 'EE. UU.', ticker: 'CRWD', ingresos: 5745, cuota_pct: null, margen_ebit_pct: null, comentario: 'Endpoint y operaciones de seguridad (SecOps); compite con FortiEDR y FortiSIEM [8].' },
      { nombre: 'Juniper (HPE)', pais: 'EE. UU.', ticker: 'HPE', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Redes y cortafuegos SRX dentro de HPE; rival en operadores y SD-WAN [1].' },
    ],
    confianza: 'Media',
  },
  esg: { calificaciones: [], confianza: 'Baja' },
  fuentes: fB,
  huecos: [
    { seccion: 'sector', campo: 'CR5 y cuotas por fabricante', tipo: 'Complemento', intentos: "1) Dell'Oro (nota pública sin cuotas); 2) IDC Security Appliance Tracker (de pago); 3) Gartner (de pago) y prensa (solo la afirmación de Fortinet de ser el cortafuegos más instalado)", decision: 'Omitido' },
    { seccion: 'competencia', campo: 'margen EBIT de los competidores', tipo: 'Complemento', intentos: '1) Stock Analysis (solo EBITDA); 2) informes anuales de los competidores no descargados; 3) informe de Qualys del repositorio (otros márgenes)', decision: 'Omitido; se da el margen EBITDA en el comentario' },
    { seccion: 'esg', campo: 'calificaciones ESG', tipo: 'Complemento', intentos: '1) 10-K y proxy (sin calificaciones); 2) MSCI ESG Ratings Corporate Search (requiere JavaScript); 3) Sustainalytics (sin acceso)', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Proxy statement 2026 (DEF 14A): consejo, remuneración de 2025, ratio salarial 75:1, participaciones', editor: 'Fortinet, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-04-29', url: 'https://www.sec.gov/Archives/edgar/data/1262039/000207709626000106/ea0287420-01.htm' },
  { id: 2, titulo: 'Form 8-K: resultados de la junta del 12-jun-2026 (votos de consejeros y de remuneración)', editor: 'Fortinet, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-06-16', url: `${E8}/000126203926000015/ftnt-20260612.htm` },
  { id: 3, titulo: 'Form 4 de consejeros y directivos (27-nov-2025 a 27-nov-2026), herramientas/form4.mjs', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-11-27', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001262039&type=4' },
  { id: 4, titulo: 'Notas de resultados de febrero de 2025 y 2026 con la guía anual inicial, y de julio de 2026 con la guía revisada (8-K, anexo 99.1)', editor: 'Fortinet, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-07-29', url: `${E8}/000126203926000003/ftntq4-2025ex991.htm` },
  { id: 5, titulo: 'Form 10-K 2025 (resultados anuales reales)', editor: 'Fortinet, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-25', url: `${E8}/000126203926000007/ftnt-20251231.htm` },
  { id: 6, titulo: 'Form 10-Q del 3T26: demanda colectiva consolidada por la guía de la renovación de 2026 (moción de desestimación con los escritos cerrados) y demandas derivadas', editor: 'Fortinet, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-30', url: `${E8}/000126203926000027/ftnt-20260930.htm` },
  { id: 7, titulo: 'Fortinet Reports Strong Third Quarter 2026 Financial Results (guía de 2026 revisada) y nota del 2T26 (guía de julio)', editor: 'Fortinet, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-28', url: `${E8}/000126203926000024/ftntq3-2026ex991.htm` },
];
const cons = (nombre, cargo, tipo, desde, comisiones) => ({ nombre, cargo, tipo, desde, comisiones });
const C = {
  _estado: 'Completo. Proxy de 2026, 8-K de la junta, Form 4 de 12 meses hasta el 27-nov y guía del 3T26.',
  directivos: {
    equipo: [
      { nombre: 'Ken Xie', cargo: 'Fundador, presidente del consejo y consejero delegado', desde: '2000', participacion_pct: 9.8, trayectoria: 'Fundó NetScreen (vendida a Juniper en 2004) y Fortinet en 2000; consejero delegado desde entonces. Con él los ingresos han pasado de 1.805 M USD en 2018 a 6.800 M en 2025 y el margen operativo GAAP del 13 % al 31 % [1, 5].' },
      { nombre: 'Michael Xie', cargo: 'Cofundador, presidente ejecutivo de la compañía (President) y director de tecnología', desde: '2000', participacion_pct: 9.3, trayectoria: 'Hermano de Ken Xie; responsable de la arquitectura FortiOS y de los procesadores FortiASIC que dan a Fortinet su ventaja de coste [1].' },
      { nombre: 'Christiane Ohlgart', cargo: 'Directora financiera', desde: '2025', participacion_pct: 0.0, trayectoria: 'Directora financiera desde mayo de 2025, tras la salida de Keith Jensen; antes en Fortinet como directora contable [1].' },
      { nombre: 'John Whittle', cargo: 'Director de operaciones', desde: '2016', participacion_pct: 0.04, trayectoria: 'Director jurídico y después de operaciones; firma los 8-K de la compañía [1, 2].' },
    ],
    historial_guidance: [
      { anio: '2025', guia: 'Ingresos 6.650-6.850 M USD; BPA ajustado 2,41-2,47 (febrero de 2025) [4]', real: 'Ingresos 6.799,6 M; BPA GAAP 2,42 [5]', cumplida: 'Sí' },
      { anio: '2025 (renovación)', guia: 'Agosto de 2025: la renovación de cortafuegos de 2026 iba al 40-50 % [6]', real: 'La acción cayó un 22 % en un día y llegaron demandas colectivas; en 2026 el producto crece al 41-52 %', cumplida: 'Parcial' },
      { anio: '2026', guia: 'Ingresos 7.500-7.700 M USD; BPA ajustado 2,94-3,00 (febrero); subida a 7.710-7.870 M en mayo y a 8.020-8.180 M y 3,41-3,47 en julio [4]', real: 'En curso: 9M26 5.975,9 M (+22 %) y BPA GAAP 2,39; en octubre, ingresos 8.125-8.215 M y BPA ajustado 3,54-3,58, pero servicios rebajados de 5.180-5.220 M a 5.150-5.170 M [7]', cumplida: 'Parcial' },
    ],
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      cons('Ken Xie', 'Presidente y consejero delegado', 'Ejecutivo', '2000', null),
      cons('Michael Xie', 'Consejero, presidente ejecutivo y director de tecnología', 'Ejecutivo', '2001', 'Ciberseguridad'),
      cons('Judith Sim', 'Consejera independiente coordinadora', 'Independiente', '2015', 'Recursos Humanos; Gobierno'),
      cons('Kenneth A. Goldman', 'Consejero', 'Independiente', null, 'Recursos Humanos; Auditoría'),
      cons('Ming Hsieh', 'Consejero', 'Independiente', null, 'Auditoría; Gobierno'),
      cons('Jean Hu', 'Consejera', 'Independiente', null, 'Auditoría; Ciberseguridad'),
      cons('Janet Napolitano', 'Consejera', 'Independiente', null, 'Recursos Humanos; Ciberseguridad'),
      cons('James Stavridis', 'Consejero', 'Independiente', null, 'Gobierno; Ciberseguridad (preside)'),
      cons('Derek Kan', 'Consejero', 'Independiente', '2026', null),
    ],
    presidente_ceo_separados: false, presidente_ejecutivo: true, consejero_coordinador: true, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 88.6, voto_remuneracion_contra_pct: 11.3, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 11.46, fijo: 0.60, variable_corto: 0.71, variable_largo: 10.16, ratio_salario_medio: 75 },
    accionistas: [
      { nombre: 'Ken Xie (con familia y fideicomisos)', pct: 9.8, tipo: 'Fundador', variacion: 'Baja: vendió por 85,3 M USD en 12 meses con plan 10b5-1 (20,9 M el 2-nov-2026, tras ejercer 155.000 opciones) y donó 168.000 acciones el 20-nov' },
      { nombre: 'Michael Xie (con familia y fideicomisos)', pct: 9.3, tipo: 'Fundador', variacion: 'Baja: vendió por 29,6 M USD en 12 meses con plan 10b5-1' },
      { nombre: 'BlackRock, Inc.', pct: 7.4, tipo: 'Institucional', variacion: 'Último 13G/A de enero de 2024' },
      { nombre: 'Consejeros y directivos (10 personas)', pct: 17.6, tipo: 'Dirección', variacion: 'Incluye a los dos fundadores' },
    ],
    insiders: [
      { fecha: '2026-08-03', persona: 'Ken Xie (consejero delegado), ventas feb-26 a ago-26', operacion: 'Venta', acciones: 503206, importe: 64.44 },
      { fecha: '2026-11-02', persona: 'Ken Xie (consejero delegado), plan 10b5-1 tras ejercer 155.000 opciones', operacion: 'Venta', acciones: 161483, importe: 20.88 },
      { fecha: '2026-11-02', persona: 'Michael Xie (director de tecnología), ventas feb-26 a nov-26', operacion: 'Venta', acciones: 355733, importe: 29.64 },
      { fecha: '2026-09-15', persona: 'John Whittle (director de operaciones), ventas may-26 a sep-26', operacion: 'Venta', acciones: 202715, importe: 28.14 },
      { fecha: '2026-11-16', persona: 'Christiane Ohlgart (directora financiera), ventas de 12 meses', operacion: 'Venta', acciones: 3741, importe: 0.43 },
    ],
    alertas: [
      'Ventas de la dirección por 143,5 M USD en 12 meses (27-nov-2025 a 27-nov-2026), todas con plan 10b5-1 y ninguna compra; los dos fundadores venden de forma regular desde hace años; Ken Xie vendió 20,9 M el 2-nov, cuatro días después de la caída [3, 1].',
      'Demanda colectiva consolidada (In re Fortinet Securities Litigation) por las declaraciones sobre la renovación de cortafuegos de 2026; moción de desestimación presentada el 15-jun-2026 y con los escritos cerrados; sin provisión a 30-sep-2026 [6].',
      'Presidente y consejero delegado en la misma persona (fundador con el 9,8 %); lo compensa una consejera independiente coordinadora elegida cada año [1].',
      'Voto en contra del 15,4 % en la reelección de Kenneth Goldman y del 12,3 % en la de Ming Hsieh en la junta de 2026 [2].',
    ],
    confianza: 'Alta',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'votos de remuneración de 2024 y 2025', tipo: 'Complemento', intentos: '1) 8-K de la junta de 2026 (solo 2026); 2) 8-K de la junta de 2025 (no descargado por tiempo); 3) proxy 2026 (no resume los votos anteriores)', decision: 'Omitido: se usa el voto de 2026' },
    { seccion: 'gobierno', campo: 'año de entrada de cinco consejeros independientes', tipo: 'Complemento', intentos: '1) Proxy 2026 (biografías leídas solo para Sim y los fundadores); 2) 10-K; 3) sin búsqueda adicional por tiempo', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de FTNT, SPY y CIBR (herramientas/bolsa.mjs y movimiento.mjs), hasta el 25-nov-2026; cierres contrastados con el histórico del Nasdaq (184,05 el 14-oct, 174,08 el 28-oct, 139,10 el 29-oct, 134,96 el 25-nov)', editor: 'Yahoo Finance / Nasdaq', tipo: 'Datos de mercado', fecha: '2026-11-25', url: 'https://www.nasdaq.com/market-activity/stocks/ftnt/historical' },
  { id: 2, titulo: 'Fortinet (FTNT): consenso (earningsTrend: BPA ajustado 2026e 3,56 con 42 analistas y 2027e 3,90 con 43; ingresos 8.174 y 9.131 M) y objetivos (37 analistas, medio 144,68 USD, 110-190; 2 compra fuerte, 6 compra, 30 mantener, 4 venta, 1 venta fuerte)', editor: 'Yahoo Finance (quoteSummary)', tipo: 'Datos de mercado', fecha: '2026-11-27', url: 'https://finance.yahoo.com/quote/FTNT/analysis' },
  { id: 3, titulo: 'Daily Treasury Par Yield Curve Rates: 10 años al 4,85 % el 25-nov-2026', editor: 'U.S. Department of the Treasury', tipo: 'Primaria', fecha: '2026-11-25', url: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve&field_tdr_date_value=2026' },
  { id: 4, titulo: 'Implied ERP by month (ERPbymonth.xlsx): 4,41 % en noviembre de 2026 (T12m with sustainable payout)', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-11', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 5, titulo: 'Fortinet: estadísticas (capitalización 99.156 M USD, valor empresa 94.918 M, PER adelantado 34,6)', editor: 'Yahoo Finance (quoteSummary)', tipo: 'Datos de mercado', fecha: '2026-11-27', url: 'https://finance.yahoo.com/quote/FTNT/key-statistics' },
  { id: 6, titulo: 'Datos y consenso (earningsTrend) de Palo Alto, Check Point, Cisco, CrowdStrike, Zscaler y Okta al 25-27-nov-2026', editor: 'Yahoo Finance (quoteSummary)', tipo: 'Datos de mercado', fecha: '2026-11-27', url: 'https://finance.yahoo.com/quote/PANW/analysis' },
  { id: 7, titulo: 'Fortinet Reports Strong Third Quarter 2026 Financial Results (guía del 4T y de 2026) y nota del 2T26 (guía de julio)', editor: 'Fortinet, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-28', url: `${E8}/000126203926000024/ftntq3-2026ex991.htm` },
  { id: 8, titulo: 'Fortinet to Announce Third Quarter 2026 Financial Results (28-oct-2026)', editor: 'GlobeNewswire (vía Finviz)', tipo: 'Primaria', fecha: '2026-10-02', url: 'https://finviz.com/news/398289/fortinet-to-announce-third-quarter-2026-financial-results' },
  { id: 9, titulo: 'Thoma Bravo to buy cybersecurity firm Darktrace for $5.3 billion', editor: 'Security Boulevard', tipo: 'Prensa', fecha: '2024-04-26', url: 'https://securityboulevard.com/2024/04/thoma-bravo-to-buy-cybersecurity-firm-darktrace-for-5-3-billion' },
  { id: 10, titulo: 'SailPoint, Tufin go private in run of cybersecurity acquisitions by PE firms (SailPoint a 16,0 veces ventas LTM)', editor: 'S&P Global Market Intelligence (451 Research)', tipo: 'Analistas', fecha: '2022-04', url: 'https://www.spglobal.com/market-intelligence/en/news-insights/articles/2022/4/sailpoint-tufin-go-private-in-run-of-cybersecurity-acquisitions-by-pe-firms-69703930' },
  { id: 11, titulo: 'Thoma Bravo acquires Proofpoint for approximately $12.3 billion', editor: 'PrivSource', tipo: 'Prensa', fecha: '2021-04', url: 'https://www.privsource.com/acquisitions/deal/thoma-bravo-acquires-proofpoint-for-approximately-12-3-billion-D8SWX5' },
  { id: 12, titulo: 'Fortinet stock jumped 10% yesterday: here is what actually moved it (CrowdStrike, 27-ago-2026; objetivo medio 87 USD a fin de 2025 y 114 en junio)', editor: 'TIKR', tipo: 'Prensa', fecha: '2026-08-28', url: 'https://www.tikr.com/blog/fortinet-stock-jumped-10-yesterday-heres-what-actually-moved-it' },
  { id: 13, titulo: 'Fortinet Stock Jumped 9% on a Cybersecurity Rally (rebaja de Wedbush a Neutral el 10-sep-2026)', editor: 'TIKR', tipo: 'Prensa', fecha: '2026-09-15', url: 'https://www.tikr.com/blog/fortinet-stock-jumped-9-on-a-cybersecurity-rally-heres-where-the-stock-could-go' },
  { id: 14, titulo: 'Why Fortinet\'s stock just saw one of its worst drops on record (7-ago-2025, renovación de cortafuegos)', editor: 'MarketWatch (vía Morningstar)', tipo: 'Prensa', fecha: '2025-08-07', url: 'https://www.morningstar.com/news/marketwatch/20250807215/why-fortinets-stock-just-saw-one-of-its-worst-drops-on-record' },
  { id: 15, titulo: 'Update: Fortinet Q1 non-GAAP net income, sales surge; raises 2026 outlook; shares soar premarket', editor: 'MT Newswires (vía Placera)', tipo: 'Prensa', fecha: '2026-05-07', url: 'https://www.placera.se/telegram/fortinet-update-fortinet-q1-non-gaap-net-income-sales-surge-raises-2026-outlook-shares-soar-premarket-20260507' },
  { id: 16, titulo: 'Fortinet, Inc.: titulares de noticias y análisis (abril-noviembre de 2026: «Fortinet shares hit five month low; analysts flag services miss and slowing product growth», 29-oct)', editor: 'Seeking Alpha (RSS)', tipo: 'Prensa', fecha: '2026-11-23', url: 'https://seekingalpha.com/api/sa/combined/FTNT.xml' },
  { id: 17, titulo: 'Form 10-Q del 3T26 (734,7 M de acciones a 27-oct-2026; 742,6 M diluidas de media en el 3T)', editor: 'Fortinet, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-30', url: `${E8}/000126203926000027/ftnt-20260930.htm` },
  { id: 18, titulo: 'Cambios de recomendación y objetivo tras el 3T26: RBC 205 → 165 (29-oct), Susquehanna 160 → 145 (30-oct), Daiwa a Comprar con 150 (4-nov), Argus 147 (26-nov); Arete a Vender con 117 (21-oct)', editor: 'Expediente de noticias del escáner (Google News, MarketScreener, Investing)', tipo: 'Prensa', fecha: '2026-11-26', url: 'https://www.marketscreener.com/quote/stock/FORTINET-INC-58397/news/' },
];
const D = {
  _estado: 'Completo. Precio de bolsa.mjs: cierre del 25-nov (el 26-nov, Acción de Gracias, no hubo sesión y la del 27-nov no había cerrado), contrastado con el Nasdaq. Comparables rehechos con el consenso de Yahoo del 27-nov (BPA ajustado de los próximos 12 meses).',
  identificacion: {
    nombre: 'Fortinet, Inc.', nombre_corto: 'Fortinet', ticker: 'FTNT', isin: 'US34959E1091', mercado: 'Nasdaq Global Select', indice_referencia: 'S&P 500',
    pais: 'Estados Unidos', pais_iso: 'US', sector: 'Tecnologías de la información', industria: 'Software de sistemas (ciberseguridad de red)', sede: 'Sunnyvale (California)', fundacion: '2000', empleados: 15109, web: 'https://www.fortinet.com',
    precio: BOLSA.identificacion.precio, fecha_precio: BOLSA.identificacion.fecha_precio, acciones: 742.6, capitalizacion_publicada: 99156, free_float_pct: 84.4,
    max_52s: BOLSA.identificacion.max_52s, min_52s: BOLSA.identificacion.min_52s, volumen_medio_diario: `≈ ${BOLSA.volumen_3m.importe_dia_millones.toFixed(0)} M USD/día (3 meses)`, proximos_resultados: '2027-02',
  },
  consenso: {
    estimaciones: [
      { periodo: '2026e', ingresos: 8174, ebitda: null, ebit: null, bpa: 3.56, dpa: 0, fuente: 'Yahoo Finance, 27-nov (43 analistas de ingresos y 42 de BPA; BPA ajustado, sin pagos en acciones) [2]' },
      { periodo: '2027e', ingresos: 9131, ebitda: null, ebit: null, bpa: 3.90, dpa: 0, fuente: 'Yahoo Finance, 27-nov (43 analistas; BPA ajustado) [2]' },
    ],
    recomendaciones: { n_analistas: 43, comprar: 8, mantener: 30, vender: 5, po_medio: 144.68, po_min: 110, po_max: 190 },
    base_ebitda: null, ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: { ...BOLSA.bolsa, posicion_corta_pct: null, confianza: 'Alta' },
  multiplos_historicos: {
    serie: ANIOS.map((y) => ({ anio: y, precio_cierre: BOLSA.cierres_ejercicio.find((c) => c.anio === y).precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: y === '2021' })),
    confianza: 'Alta',
  },
  comparables: {
    empresas: [
      { nombre: 'Palo Alto Networks', ticker: 'PANW', pais: 'US', capitalizacion: 292391, ev_ventas: 23.46, ev_ebitda_ltm: null, ev_ebitda_ntm: null, per_ntm: 83.2, crecimiento_pct: 22.8, margen_ebitda_pct: 13.1, roic_pct: 1.7, dn_ebitda: -0.3, fcf_yield_pct: 1.5 },
      { nombre: 'Check Point Software', ticker: 'CHKP', pais: 'IL', capitalizacion: 16721, ev_ventas: 5.96, ev_ebitda_ltm: 20.1, ev_ebitda_ntm: null, per_ntm: 14.9, crecimiento_pct: 5.1, margen_ebitda_pct: 29.6, roic_pct: 36.0, dn_ebitda: -2.6, fcf_yield_pct: 4.3 },
      { nombre: 'Cisco Systems', ticker: 'CSCO', pais: 'US', capitalizacion: 371379, ev_ventas: 5.78, ev_ebitda_ltm: 18.7, ev_ebitda_ntm: null, per_ntm: 16.6, crecimiento_pct: 15.5, margen_ebitda_pct: 30.9, roic_pct: 20.4, dn_ebitda: 0.8, fcf_yield_pct: 2.8 },
      { nombre: 'CrowdStrike', ticker: 'CRWD', pais: 'US', capitalizacion: 215704, ev_ventas: 36.76, ev_ebitda_ltm: null, ev_ebitda_ntm: null, per_ntm: 131.5, crecimiento_pct: 26.8, margen_ebitda_pct: 3.3, roic_pct: -14.1, dn_ebitda: null, fcf_yield_pct: 1.0 },
      { nombre: 'Zscaler', ticker: 'ZS', pais: 'US', capitalizacion: 37891, ev_ventas: 10.14, ev_ebitda_ltm: null, ev_ebitda_ntm: null, per_ntm: 44.4, crecimiento_pct: 18.4, margen_ebitda_pct: 1.8, roic_pct: -1.8, dn_ebitda: null, fcf_yield_pct: 2.9 },
      { nombre: 'Okta', ticker: 'OKTA', pais: 'US', capitalizacion: 35274, ev_ventas: 10.75, ev_ebitda_ltm: 102.9, ev_ebitda_ntm: null, per_ntm: 46.9, crecimiento_pct: 13.8, margen_ebitda_pct: 10.4, roic_pct: 4.6, dn_ebitda: -7.0, fcf_yield_pct: 2.9 },
    ],
    confianza: 'Baja',
  },
  transacciones: {
    operaciones: [
      { fecha: '2025-03', objetivo: 'Wiz', comprador: 'Alphabet (Google)', ev: 32000, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: true, comentario: 'Seguridad de la nube; sin beneficios y creciendo a más del 50 %: no comparable en múltiplo.' },
      { fecha: '2024-04', objetivo: 'Darktrace', comprador: 'Thoma Bravo', ev: 5300, ev_ventas: null, ev_ebitda: null, prima_pct: 44, excluir: false, comentario: '7,75 USD por acción; prima del 44 % sobre la media de tres meses [9].' },
      { fecha: '2022-04', objetivo: 'SailPoint', comprador: 'Thoma Bravo', ev: 6900, ev_ventas: 16.0, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '16,0 veces las ventas LTM según 451 Research [10].' },
      { fecha: '2021-04', objetivo: 'Proofpoint', comprador: 'Thoma Bravo', ev: 12300, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '176 USD por acción en efectivo [11].' },
    ],
    confianza: 'Baja',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'transacciones', campo: 'múltiplos de Darktrace, Proofpoint y Wiz y operaciones de cortafuegos (HPE-Juniper, Cisco-Splunk, Palo Alto-CyberArk)', tipo: 'Complemento', intentos: '1) Notas de prensa de las operaciones (solo valor y precio por acción); 2) S&P Global/451 Research (solo SailPoint); 3) bases de operaciones (CapIQ, PitchBook: de pago)', decision: 'Omitido; peso de transacciones 0' },
    { seccion: 'consenso', campo: 'EBITDA del consenso y estimaciones de 2028', tipo: 'Complemento', intentos: '1) MarketScreener (la página no muestra la tabla sin sesión); 2) Stock Analysis (solo ingresos y BPA de 2026-2027); 3) Seeking Alpha (de pago)', decision: 'Omitido' },
    { seccion: 'comparables', campo: 'EV/EBITDA de los próximos 12 meses', tipo: 'Complemento', intentos: '1) Yahoo earningsTrend (solo ingresos y BPA); 2) Stock Analysis (solo LTM); 3) MarketScreener (sin sesión)', decision: 'Omitido; se usa sobre todo el PER' },
  ],
};

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Fortinet, Inc.: noticias y artículos de autores (septiembre-noviembre de 2026, RSS): «Q3 Earnings Showed Cracks In The Bull Case; Stock Is A Hold» (29-oct), «The Selloff Hasn\'t Broken The Bull Case» (16-nov), «An Excellent Business Whose Stock Has Run Ahead Of Its Value» (13-oct)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-11-23', url: 'https://seekingalpha.com/api/sa/combined/FTNT.xml' },
  { id: 2, titulo: 'Stream $FTNT (30 mensajes, 19 a 25-nov-2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-11-25', url: 'https://api.stocktwits.com/api/2/streams/symbol/FTNT.json' },
  { id: 3, titulo: 'Following Strong Q3 Results Is Fortinet (FTNT) Priced For Perfection?', editor: 'Simply Wall St (vía Google News)', tipo: 'Foros y redes', fecha: '2026-11-27', url: 'https://simplywall.st/stocks/us/software/nasdaq-ftnt/fortinet' },
  { id: 4, titulo: 'Titulares de mercado tras el 3T26: «Stock Plunges 20% Despite Third Annual Guidance Raise», «Q3 Results Overshadowed by Services, Wedbush Says», «Disappointing Slowdown Amid Tight Supply, BofA Says»', editor: 'Expediente de noticias del escáner (Google News)', tipo: 'Foros y redes', fecha: '2026-11-02', url: 'https://news.google.com/search?q=Fortinet%20Q3%202026' },
];
const E = {
  _estado: 'Completo. Reddit da 403; se leen Seeking Alpha (titulares y artículos de autores), Stocktwits y comentarios de mercado de los últimos tres meses, sobre todo desde el 28-oct.',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Empeora',
    revisadas: [
      { plataforma: 'Seeking Alpha (artículos de autores)', fecha: '2026-11', n_comentarios: 6, tono: 'Dividido', resumen: 'Antes de resultados ya se rebajaba por valoración («ha corrido por delante de su valor», 13-oct); tras el 3T, un autor ve «grietas en la tesis» y se queda en Mantener y otro defiende que la caída «no rompe la tesis» (16-nov) [1].' },
      { plataforma: 'Seeking Alpha (noticias de analistas)', fecha: '2026-10', n_comentarios: 8, tono: 'Negativo', resumen: 'El 29-oct la acción toca mínimos de cinco meses y los analistas señalan el fallo en servicios y la desaceleración del producto; recortes de objetivo en los días siguientes [1, 4].' },
      { plataforma: 'Stocktwits', fecha: '2026-11', n_comentarios: 30, tono: 'Dividido', resumen: 'Siete mensajes alcistas por uno bajista: soporte en la media de 50 semanas, especulación con compras en el sector tras la operación CrowdStrike-Zscaler y los ciberataques recientes; enfrente, quien recuerda que la guía de servicios bajó y que «crece con precio de perfección» [2].' },
      { plataforma: 'Prensa de inversión (Simply Wall St y titulares)', fecha: '2026-11', n_comentarios: 4, tono: 'Neutro', resumen: 'La pregunta repetida es si tras resultados fuertes la acción sigue «con precio de perfección»; los titulares de mercado atribuyen la caída a los servicios y al techo de suministro de memoria [3, 4].' },
    ],
    confianza: 'Media',
  },
  fuentes: fE,
  huecos: [],
};

guarda('A', A); guarda('B', B); guarda('C', C); guarda('D', D); guarda('E', E);
console.log('Notas A-E escritas');
