// Escribe las notas A-E de Everpure (antes Pure Storage; corte 2026-10-15) a partir del XBRL de la SEC (cuentas-xbrl.json),
// las notas de prensa de resultados (8-K 99.1), el 10-K FY2026, el 10-Q del 2T FY27, el proxy de 2026, bolsa.mjs, form4.mjs,
// MarketScreener, Stock Analysis y foros. Cada nota cita solo con [n] de su propia lista. Ejecutar: node notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const X = JSON.parse(fs.readFileSync(path.join(dir, 'cuentas-xbrl.json'), 'utf8'));
const BOLSA = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const E8 = 'https://www.sec.gov/Archives/edgar/data/1474432';
const r1 = (v) => (v == null ? null : Math.round(v * 10) / 10);
const ANIOS = ['FY2021', 'FY2022', 'FY2023', 'FY2024', 'FY2025', 'FY2026'];

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Form 10-K del ejercicio fiscal 2026 (cerrado el 1-feb-2026): cuentas auditadas, ingresos por producto y suscripción, geografías, competencia, empleados', editor: 'Everpure, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-03-25', url: `${E8}/000147443226000027/pstg-20260201.htm` },
  { id: 2, titulo: 'Hechos XBRL (companyfacts): cuenta, balance y flujos FY2017-FY2026, ingresos diferidos, pagos en acciones, retenciones fiscales', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0001474432.json' },
  { id: 3, titulo: 'Everpure Announces Second Quarter Fiscal 2027 Financial Results (8-K, anexo 99.1)', editor: 'Everpure, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-26', url: `${E8}/000147443226000084/everpure-ex991q2fy2027xpre.htm` },
  { id: 4, titulo: 'Form 10-Q del 2T FY27 (balance a 2-ago-2026; compra de 1touch; anticipos a proveedores)', editor: 'Everpure, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-09-04', url: `${E8}/000147443226000088/pstg-20260802.htm` },
  { id: 5, titulo: 'Everpure Announces First Quarter Fiscal 2027 Financial Results (8-K, anexo 99.1)', editor: 'Everpure, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-05-27', url: `${E8}/000147443226000046/pstg-ex991q1fy2027xpressre.htm` },
  { id: 6, titulo: 'Fourth Quarter and Full Year Fiscal 2026 Financial Results (8-K, anexo 99.1)', editor: 'Everpure, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-25', url: `${E8}/000147443226000015/pstg-ex991q4fy2026.htm` },
  { id: 7, titulo: 'Pure Storage Third Quarter Fiscal 2026 Financial Results (8-K, anexo 99.1)', editor: 'Pure Storage, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2025-12-02', url: `${E8}/000147443225000062/pstg-ex991q3fy2026xpressre.htm` },
  { id: 8, titulo: 'Pure Storage Second Quarter Fiscal 2026 Financial Results (8-K, anexo 99.1)', editor: 'Pure Storage, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2025-08-27', url: `${E8}/000147443225000038/pstg-ex991q2fy2026xpressre.htm` },
  { id: 9, titulo: 'Pure Storage First Quarter Fiscal 2026 Financial Results (8-K, anexo 99.1)', editor: 'Pure Storage, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2025-05-28', url: `${E8}/000162828025028151/pstg-ex991q1fy2026xpressre.htm` },
  { id: 10, titulo: 'Pure Storage Fourth Quarter and Full Year Fiscal 2025 Financial Results (8-K, anexo 99.1)', editor: 'Pure Storage, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2025-02-26', url: `${E8}/000162828025008136/pstg-ex991q4fy2025.htm` },
  { id: 11, titulo: 'Forms 10-K FY2022-FY2024 (valores negociables al cierre de cada ejercicio)', editor: 'Pure Storage, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2024-04-01', url: `${E8}/000162828024013860/0001628280-24-013860-index.htm` },
];
const cx = Object.fromEntries(X.financieros.cuenta.map((r) => [r.periodo, r]));
const bx = Object.fromEntries(X.balance.historico.map((r) => [r.periodo, r]));
const fx = Object.fromEntries(X.flujos.historico.map((r) => [r.periodo, r]));
// Valores negociables (corrientes) al cierre: la caja del XBRL no los incluye (10-K de cada año)
const valores = { FY2021: 916.4, FY2022: 947.1, FY2023: 1001.4, FY2024: 828.6, FY2025: 798.2, FY2026: 692.4 };
// Ingresos diferidos no corrientes (XBRL ContractWithCustomerLiabilityNoncurrent)
const difNC = { FY2021: 405.4, FY2022: 517.3, FY2023: 667.5, FY2024: 742.3, FY2025: 841.5, FY2026: 1046.4 };
// Deuda: convertibles 2023 (valor contable) y préstamo de 100 M; sin deuda al cierre de FY2026
const deuda = { FY2021: 755.8, FY2022: 786.8, FY2023: 574.5, FY2024: 100.0, FY2025: 100.0, FY2026: 0 };
// Retenciones fiscales por la liquidación neta de acciones de empleados (XBRL): se suman a las recompras
const retenciones = { FY2021: 8.3, FY2022: 10.8, FY2023: 19.6, FY2024: 30.0, FY2025: 206.6, FY2026: 270.9 };
const compras = { FY2021: 340.0, FY2022: 0, FY2023: 2.0, FY2024: 0, FY2025: 0, FY2026: 4.3 };

const cuenta = ANIOS.map((y) => {
  const c = cx[y];
  return { periodo: y, ingresos: c.ingresos, coste_ventas: c.coste_ventas, gastos_generales: c.gastos_generales, ebitda: c.ebitda, amortizaciones: c.amortizaciones, ebit: c.ebit, resultado_financiero: c.resultado_financiero, bai: c.bai, impuestos: c.impuestos, minoritarios: 0, beneficio_neto: c.beneficio_neto, gastos_financieros: c.gastos_financieros, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: c.bpa, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: c.acciones_diluidas };
});
const historico = ANIOS.map((y) => {
  const b = bx[y];
  return { periodo: y, activo_total: b.activo_total, activo_corriente: b.activo_corriente, pasivo_corriente: b.pasivo_corriente, pasivo_total: b.pasivo_total, fondo_comercio: b.fondo_comercio, intangibles: b.intangibles, inmovilizado_material: b.inmovilizado_material, existencias: b.existencias, clientes: b.clientes, proveedores: b.proveedores, activos_contrato: null, pasivos_contrato: r1(b.pasivos_contrato + difNC[y]), caja: r1(b.caja + valores[y]), deuda_financiera: deuda[y], arrendamientos: 0, patrimonio_neto: b.patrimonio_neto, minoritarios: 0, reservas: b.reservas };
});
const flujos = ANIOS.map((y) => {
  const f = fx[y];
  return { periodo: y, flujo_operativo: f.flujo_operativo, capex: f.capex, pagos_arrendamientos: f.pagos_arrendamientos ?? 0, adquisiciones: compras[y], desinversiones: 0, dividendos: 0, recompras: r1(f.recompras + retenciones[y]), emision_acciones: f.emision_acciones, intereses_en_financiacion: 0 };
});
const A = {
  _estado: 'Completo. Cuentas FY2021-FY2026 del XBRL de la SEC comprobadas con el 10-K FY2026 y las notas de resultados; LTM a 2-ago-2026 con el 10-Q del 2T FY27.',
  negocio: {
    segmentos: [
      { nombre: 'Producto', descripcion: 'Cabinas FlashArray y FlashBlade con software Purity, regalías por los envíos a hiperescaladores y licencias de Portworx', tipo_resultado: null, historico: [{ periodo: 'FY2024', ingresos: 1622.9, resultado: null }, { periodo: 'FY2025', ingresos: 1699.5, resultado: null }, { periodo: 'FY2026', ingresos: 1971.7, resultado: null }] },
      { nombre: 'Servicios de suscripción', descripcion: 'Evergreen//Forever y //Flex, Evergreen//One (almacenamiento como servicio), Pure1 y Everpure Cloud', tipo_resultado: null, historico: [{ periodo: 'FY2024', ingresos: 1207.8, resultado: null }, { periodo: 'FY2025', ingresos: 1468.7, resultado: null }, { periodo: 'FY2026', ingresos: 1691.2, resultado: null }] },
    ],
    geografias: [{ nombre: 'Estados Unidos', peso_pct: 67.3 }, { nombre: 'Resto del mundo', peso_pct: 32.7 }],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'ARR de suscripción', valor_anterior: '1.800 M USD (2T FY26)', valor_actual: '2.100 M USD (2T FY27)', variacion: '+20 %', comentario: 'Aceleración desde el +16 % del 4T FY26 [3, 6].' },
      { kpi: 'Obligaciones de desempeño pendientes (RPO)', valor_anterior: '2.800 M USD', valor_actual: '4.100 M USD', variacion: '+44 %', comentario: 'Incluye contratos plurianuales de hiperescala y Evergreen//One [3, 8].' },
      { kpi: 'Ingresos de producto (trimestre)', valor_anterior: '446,3 M USD', valor_actual: '686,8 M USD', variacion: '+54 %', comentario: 'Hiperescala, IA y subidas de precio por el coste de la memoria flash [3].' },
      { kpi: 'Margen bruto GAAP', valor_anterior: '70,2 % (2T FY26)', valor_actual: '68,4 % (2T FY27)', variacion: '−1,8 puntos', comentario: 'Margen de producto del 66,3 % al 65,3 % por el encarecimiento de la flash [3].' },
      { kpi: 'Pagos en acciones (% de ingresos)', valor_anterior: '13,3 % (FY2025)', valor_actual: '13,2 % (FY2026); 12,6 % en el 1S FY27', variacion: '≈ estable', comentario: '481,7 M USD en FY2026 y 281,9 M en el 1S FY27 [2, 3].' },
      { kpi: 'Clientes del Fortune 500', valor_anterior: 'n.d.', valor_actual: '≈64 %', variacion: null, comentario: 'NPS certificado de 84 a dic-2025 [1].' },
    ],
    confianza: 'Alta',
  },
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM ago-26', fecha_fin: '2026-08-02', ingresos: 4262.2, ebitda: 384.1, ebit: 224.2, beneficio_neto: 253.3, bpa: 0.73, dpa: 0, dpa_extraordinario: 0, fcf: 128.4, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [],
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '3T FY25', ingresos: 831.1, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 87.4, margen_ebitda_pct: 10.5, bpa: 0.19, vs_consenso: null },
      { periodo: '4T FY25', ingresos: 879.8, crecimiento_pct: 11.4, crecimiento_organico_pct: null, ebitda: 71.6, margen_ebitda_pct: 8.1, bpa: 0.12, vs_consenso: null },
      { periodo: '1T FY26', ingresos: 778.5, crecimiento_pct: 12.3, crecimiento_organico_pct: null, ebitda: 2.6, margen_ebitda_pct: 0.3, bpa: -0.04, vs_consenso: null },
      { periodo: '2T FY26', ingresos: 861.0, crecimiento_pct: 12.7, crecimiento_organico_pct: null, ebitda: 40.8, margen_ebitda_pct: 4.7, bpa: 0.14, vs_consenso: null },
      { periodo: '3T FY26', ingresos: 964.5, crecimiento_pct: 16.0, crecimiento_organico_pct: null, ebitda: 91.7, margen_ebitda_pct: 9.5, bpa: 0.16, vs_consenso: null },
      { periodo: '4T FY26', ingresos: 1058.9, crecimiento_pct: 20.4, crecimiento_organico_pct: null, ebitda: 127.5, margen_ebitda_pct: 12.0, bpa: 0.29, vs_consenso: null },
      { periodo: '1T FY27', ingresos: 1052.9, crecimiento_pct: 35.2, crecimiento_organico_pct: null, ebitda: 60.1, margen_ebitda_pct: 5.7, bpa: 0.07, vs_consenso: 'Superior' },
      { periodo: '2T FY27', ingresos: 1185.9, crecimiento_pct: 37.7, crecimiento_organico_pct: null, ebitda: 104.8, margen_ebitda_pct: 8.8, bpa: 0.21, vs_consenso: 'Superior' },
    ],
    confianza: 'Alta',
  },
  balance: {
    historico,
    vencimientos: [],
    liquidez: 'Caja y equivalentes 385,7 M USD + valores negociables 622,2 M = 1.007,9 M USD a 2-ago-2026; sin deuda financiera; línea de crédito de 500 M USD sin disponer hasta junio de 2030 [4, 1].',
    rating: 'Sin rating',
    coste_deuda_pct: null, vida_media_anios: null,
    confianza: 'Alta',
  },
  flujos: { historico: flujos, confianza: 'Alta' },
  calidad: { auditor: 'Deloitte & Touche LLP', anios_auditor: null, opinion: 'Favorable (cuentas y control interno a 1-feb-2026)', confianza: 'Alta' },
  fuentes: fA,
  huecos: [
    { seccion: 'negocio', campo: 'ingresos de producto y suscripción de FY2021-FY2023', tipo: 'Complemento', intentos: '1) 10-K FY2026 (solo tres ejercicios); 2) XBRL (miembros de producto sin serie descargada); 3) notas de prensa antiguas (no descargadas por tiempo)', decision: 'Omitido' },
    { seccion: 'trimestres', campo: 'crecimiento interanual del 3T FY25', tipo: 'Complemento', intentos: '1) Nota del 3T FY26 (solo el trimestre del año anterior); 2) XBRL trimestral no descargado; 3) prensa sin cifra primaria', decision: 'Omitido' },
    { seccion: 'calidad', campo: 'años con el mismo auditor', tipo: 'Complemento', intentos: '1) 10-K FY2026 (informe de Deloitte sin año de inicio visible en el texto extraído); 2) proxy 2026 (ratificación); 3) búsqueda en el texto «since 20..» sin resultado', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Form 10-K FY2026: Business (plataforma, hiperescala, FlashBlade//EXA, competencia, estacionalidad)', editor: 'Everpure, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-03-25', url: `${E8}/000147443226000027/pstg-20260201.htm` },
  { id: 2, titulo: 'Global storage market hits record $33bn as firms upgrade systems (IDC, almacenamiento externo empresarial 2025: 33.000 M USD, +3,9 %)', editor: 'Cyprus Mail (IDC)', tipo: 'Sectorial', fecha: '2026-03-23', url: 'https://cyprus-mail.com/2026/03/23/global-storage-market-hits-record-33bn-as-firms-upgrade-systems' },
  { id: 3, titulo: 'Markt für Enterprise-Storage wächst um 5,5 Prozent (IDC 4T25: 9.700 M USD; flash +18,1 %, híbridos −6,7 %)', editor: 'IT Reseller (IDC)', tipo: 'Sectorial', fecha: '2026-03', url: 'https://www.itreseller.ch/Artikel/105085/Markt_fuer_Enterprise-Storage_waechst_um_55_Prozent.html' },
  { id: 4, titulo: 'IDC storage tracker shows Pure and Huawei growing fastest', editor: 'Blocks & Files', tipo: 'Prensa', fecha: '2025-12-12', url: 'https://blocksandfiles.com/2025/12/12/idc-storage-tracker-shows-pure-and-huawei-growing-fastest/' },
  { id: 5, titulo: 'NetApp: estadísticas (ingresos LTM 7.390 M USD, margen EBITDA 28,4 %)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/ntap/statistics/' },
  { id: 6, titulo: 'Dell Technologies: estadísticas (ingresos LTM 151.200 M USD, margen EBITDA 11,7 %)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/dell/statistics/' },
  { id: 7, titulo: 'Hewlett Packard Enterprise: estadísticas (ingresos LTM 41.870 M USD, margen EBITDA 16,5 %)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/hpe/statistics/' },
  { id: 8, titulo: 'Nutanix: estadísticas (ingresos LTM 2.850 M USD, margen EBITDA 13,0 %)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/ntnx/statistics/' },
  { id: 9, titulo: 'Everpure Announces Second Quarter Fiscal 2027 Financial Results (segundo hiperescalador entre los cinco primeros; Gartner)', editor: 'Everpure, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-26', url: `${E8}/000147443226000084/everpure-ex991q2fy2027xpre.htm` },
  { id: 10, titulo: 'Data storage to data intelligence: Everpure\'s big AI-era rebrand', editor: 'Barchart', tipo: 'Prensa', fecha: '2026-01', url: 'https://www.barchart.com/story/news/795029/data-storage-to-data-intelligence-everpure-s-big-ai-era-rebrand' },
];
const B = {
  _estado: 'Completo. Tamaño de mercado de IDC (dos publicaciones que lo recogen); competidores con cifras de Stock Analysis a 15-oct.',
  historia: {
    hitos: [
      { anio: '2009', hito: 'Fundación en Mountain View por John Colgrove y John Hayes con la idea de cabinas solo de memoria flash para empresas [1].' },
      { anio: '2015', hito: 'Salida a bolsa en la Bolsa de Nueva York como Pure Storage (PSTG) [1].' },
      { anio: '2017', hito: 'Charles Giancarlo, ex Cisco y Silver Lake, sustituye a Scott Dietzen como consejero delegado [1].' },
      { anio: '2020', hito: 'Compra Portworx (almacenamiento para contenedores Kubernetes) por unos 370 M USD [1].' },
      { anio: '2024', hito: 'Primera victoria de diseño con un hiperescalador (Meta): sus discos DirectFlash sustituyen a discos duros en sus centros de datos [1].' },
      { anio: '2026', hito: 'Enero: cambia su nombre a Everpure y su símbolo a «P» para presentarse como empresa de gestión de datos para la era de la IA [10]; agosto: segunda victoria con un hiperescalador de los cinco mayores [9].' },
    ],
    confianza: 'Media',
  },
  negocio: { confianza: 'Alta' },
  sector: {
    tamano: '≈33.000 M USD en 2025 (almacenamiento externo empresarial, mundial, IDC) [2, 3]',
    unidad_serie: 'millones de USD',
    serie: [{ anio: '2024', tamano: 31760 }, { anio: '2025', tamano: 33000 }],
    tcac_historico_pct: null, tcac_previsto_pct: null,
    cr5_pct: null, estructura: 'Moderadamente concentrada',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 11.1,
    competidores: [
      { nombre: 'Dell Technologies (Dell EMC: PowerStore, PowerMax, PowerScale)', pais: 'EE. UU.', ticker: 'DELL', ingresos: 151200, cuota_pct: null, margen_ebit_pct: null, comentario: 'Líder del almacenamiento externo; el almacenamiento es una parte pequeña de un grupo que vive de servidores de IA (margen EBITDA del grupo 11,7 %) [6, 1].' },
      { nombre: 'NetApp', pais: 'EE. UU.', ticker: 'NTAP', ingresos: 7390, cuota_pct: null, margen_ebit_pct: null, comentario: 'Rival más parecido (flash y nube); crece ≈10 % al año con margen EBITDA del 28,4 % [5].' },
      { nombre: 'Hewlett Packard Enterprise (Alletra)', pais: 'EE. UU.', ticker: 'HPE', ingresos: 41870, cuota_pct: null, margen_ebit_pct: null, comentario: 'Almacenamiento dentro de un grupo de servidores y redes (margen EBITDA 16,5 %) [7].' },
      { nombre: 'Huawei (OceanStor)', pais: 'China', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Crece deprisa fuera de EE. UU. según IDC [4].' },
      { nombre: 'IBM y Hitachi Vantara', pais: 'EE. UU. / Japón', ticker: 'IBM', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Proveedores tradicionales de cabinas para grandes cuentas [1].' },
      { nombre: 'Nutanix', pais: 'EE. UU.', ticker: 'NTNX', ingresos: 2850, cuota_pct: null, margen_ebit_pct: null, comentario: 'Hiperconvergencia: compite en virtualización tras la compra de VMware por Broadcom [8, 1].' },
    ],
    confianza: 'Media',
  },
  esg: { calificaciones: [], confianza: 'Baja' },
  fuentes: fB,
  huecos: [
    { seccion: 'sector', campo: 'CR5, cuotas y serie larga del mercado', tipo: 'Complemento', intentos: '1) IDC Worldwide Quarterly Enterprise Storage Systems Tracker (de pago); 2) prensa que lo resume (solo totales 2025 y trimestres); 3) Gartner (de pago)', decision: 'Omitido' },
    { seccion: 'esg', campo: 'calificaciones ESG', tipo: 'Complemento', intentos: '1) 10-K y proxy (sin calificaciones); 2) MSCI ESG Ratings (requiere JavaScript); 3) Sustainalytics (sin acceso)', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Proxy statement 2026 (DEF 14A): consejo, remuneración FY2026, ratio salarial 90:1, participaciones, voto de 2024 y 2025', editor: 'Everpure, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-05-01', url: `${E8}/000147443226000041/pstg-20260430.htm` },
  { id: 2, titulo: 'Form 8-K: resultados de la junta del 10-jun-2026 (consejeros, auditor y voto de remuneración)', editor: 'Everpure, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-06-12', url: `${E8}/000147443226000066/pstg-20260610.htm` },
  { id: 3, titulo: 'Form 4 de consejeros y directivos (15-oct-2025 a 15-oct-2026), herramientas/form4.mjs', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001474432&type=4' },
  { id: 4, titulo: 'Notas de resultados FY2025-FY2027 con la guía anual (8-K, anexo 99.1)', editor: 'Everpure, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-26', url: `${E8}/000147443226000084/everpure-ex991q2fy2027xpre.htm` },
  { id: 5, titulo: 'Form 10-K FY2026 (resultados anuales)', editor: 'Everpure, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-03-25', url: `${E8}/000147443226000027/pstg-20260201.htm` },
];
const cons = (nombre, cargo, tipo, desde, comisiones) => ({ nombre, cargo, tipo, desde, comisiones });
const C = {
  _estado: 'Completo. Proxy de 2026, 8-K de la junta y Form 4 de 12 meses.',
  directivos: {
    equipo: [
      { nombre: 'Charles Giancarlo', cargo: 'Presidente del consejo y consejero delegado', desde: '2017', participacion_pct: 0.8, trayectoria: 'Ex Cisco (director de desarrollo) y Silver Lake. Desde 2017 los ingresos han pasado de 1.025 a 3.663 M USD (FY2018-FY2026) y la empresa ha pasado a ganar dinero en GAAP desde FY2023 [1, 5].' },
      { nombre: 'Tarek Robbiati', cargo: 'Director financiero', desde: '2025', participacion_pct: 0.01, trayectoria: 'Entró en junio de 2025 desde Lumen y antes HPE; sustituye a Kevan Krysler [1].' },
      { nombre: 'John Colgrove', cargo: 'Fundador, Chief Visionary Officer y consejero', desde: '2009', participacion_pct: 3.8, trayectoria: 'Cofundador y arquitecto de la tecnología DirectFlash; ha vendido 240 M USD en acciones en 12 meses con plan 10b5-1 [1, 3].' },
      { nombre: 'Ajay Singh', cargo: 'Director de producto', desde: '2019', participacion_pct: 0.06, trayectoria: 'Responsable de la cartera FlashArray, FlashBlade y de la plataforma de datos [1].' },
      { nombre: 'Patrick Finn', cargo: 'Director comercial (CRO)', desde: '2025', participacion_pct: null, trayectoria: 'Fichado en FY2026 con prima de entrada de 1 M USD en efectivo [1].' },
    ],
    historial_guidance: [
      { anio: 'FY2025', guia: 'Ingresos 3.515 M USD (guía inicial) [4]', real: 'Ingresos 3.168 M USD (la guía se rehízo por el paso a suscripción) [5]', cumplida: 'Parcial' },
      { anio: 'FY2026', guia: 'Ingresos 3.515 M USD (+11 %) en mayo de 2025; 3.600-3.630 M en diciembre [4]', real: 'Ingresos 3.662,8 M USD (+16 %) [5]', cumplida: 'Sí' },
      { anio: 'FY2027', guia: 'Ingresos 4.300-4.400 M USD en febrero; 4.410-4.510 M en mayo; 5.030-5.070 M en agosto [4]', real: 'En curso: 1S 2.238,8 M USD (+37 %)', cumplida: 'Parcial' },
    ],
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      cons('Charles Giancarlo', 'Presidente y consejero delegado', 'Ejecutivo', '2017', null),
      cons('Scott Dietzen', 'Vicepresidente del consejo (ex consejero delegado)', 'Otro externo', '2010', 'Riesgos'),
      cons('John Colgrove', 'Consejero (fundador, Chief Visionary Officer)', 'Ejecutivo', '2009', null),
      cons('Andrew Brown', 'Consejero', 'Independiente', '2019', 'Auditoría'),
      cons('Roxanne Taylor', 'Consejera', 'Independiente', '2019', 'Nombramientos'),
      cons('John Murphy', 'Consejero', 'Independiente', '2021', 'Auditoría'),
      cons('Greg Tomb', 'Consejero', 'Independiente', '2020', 'Auditoría'),
      cons('Jeff Rothschild', 'Consejero', 'Independiente', '2018', 'Riesgos'),
      cons('Susan Taylor', 'Consejera', 'Independiente', '2018', 'Retribuciones'),
      cons('Mallun Yen', 'Consejera', 'Independiente', '2021', null),
    ],
    presidente_ceo_separados: false, presidente_ejecutivo: true, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: false, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 40.0, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: 'FY2026', total: 18.43, fijo: 0.85, variable_corto: 1.57, variable_largo: 16.01, ratio_salario_medio: 90 },
    accionistas: [
      { nombre: 'FMR (Fidelity)', pct: 14.1, tipo: 'Institucional', variacion: 'Según 13G/A de febrero de 2024' },
      { nombre: 'BlackRock, Inc.', pct: 10.0, tipo: 'Institucional', variacion: '13G/A de diciembre de 2025' },
      { nombre: 'John Colgrove (fundador)', pct: 3.8, tipo: 'Dirección', variacion: 'Vende ≈2,43 M de acciones en 12 meses (plan 10b5-1)' },
      { nombre: 'Consejeros y directivos (14 personas)', pct: 5.1, tipo: 'Dirección', variacion: 'Baja por ventas' },
    ],
    insiders: [
      { fecha: '2026-10-13', persona: 'John Colgrove (fundador)', operacion: 'Venta', acciones: 2434265, importe: 240.49 },
      { fecha: '2026-10-12', persona: 'Charles Giancarlo (consejero delegado)', operacion: 'Venta', acciones: 930000, importe: 86.44 },
      { fecha: '2026-09-24', persona: 'Ajay Singh (director de producto)', operacion: 'Venta', acciones: 59895, importe: 6.58 },
      { fecha: '2026-10-06', persona: 'Mallun Yen (consejera)', operacion: 'Venta', acciones: 16677, importe: 2.12 },
      { fecha: '2026-10-09', persona: 'Mona Chu (directora contable)', operacion: 'Venta', acciones: 7964, importe: 1.17 },
      { fecha: '2026-10-08', persona: 'Andrew Brown (consejero)', operacion: 'Venta', acciones: 9003, importe: 1.01 },
    ],
    alertas: [
      'Ventas de la dirección por 338,8 M USD en 12 meses y ninguna compra; el 97 % con plan 10b5-1. Colgrove (240,5 M) y Giancarlo (86,4 M, 930.000 acciones desde mayo de 2026) son los mayores [3].',
      'La junta de 2024 rechazó la remuneración de la dirección (solo algo más del 40 % a favor); en 2025 la aprobó con más del 73 % y en 2026 con el 88,7 % de los votos emitidos [1, 2].',
      'Roxanne Taylor fue reelegida en 2026 con solo el 54,5 % de los votos emitidos (119,2 M de votos retenidos) [2].',
      'Consejo escalonado en tres clases y sin consejero independiente coordinador, con presidente ejecutivo [1].',
      'Pagos en acciones del 13 % de los ingresos: diluyen ≈1,5 % al año antes de recompras [1].',
    ],
    confianza: 'Alta',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'porcentaje en contra exacto de la junta de 2024', tipo: 'Complemento', intentos: '1) proxy 2026 (solo «algo más del 40 % a favor»); 2) 8-K de la junta de 2024 (no descargado por tiempo); 3) prensa sin cifra primaria', decision: 'Omitido: se da el a favor' },
  ],
};

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de P, SPY y XLK (herramientas/bolsa.mjs y movimiento.mjs), hasta el 14/15-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/P/history' },
  { id: 2, titulo: 'Everpure, Inc.: Financial data, forecasts, estimates (consenso FY2026-FY2029; EBIT ajustado, BPA GAAP; 20 analistas, objetivo medio 151,11 USD)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://www.marketscreener.com/quote/stock/EVERPURE-INC-24203395/finances/' },
  { id: 3, titulo: '10-Year Treasury Constant Maturity Rate (DGS10): 5,21 % el 13-oct-2026', editor: 'FRED, Federal Reserve Bank of St. Louis', tipo: 'Primaria', fecha: '2026-10-13', url: 'https://fred.stlouisfed.org/series/DGS10' },
  { id: 4, titulo: 'Implied ERP by month (ERPbymonth.xlsx): 4,20 % en octubre de 2026', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 5, titulo: 'Everpure: estadísticas (333,2 M acciones, posición corta 2,57 % del flotante, próximos resultados 18-nov-2026)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/p/statistics/' },
  { id: 6, titulo: 'Estadísticas de NetApp, Dell, HPE, Nutanix, Arista y Seagate (15-oct-2026)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/ntap/statistics/' },
  { id: 7, titulo: 'Everpure stock surges after FY28 revenue outlook (objetivos FY2028: ingresos 7.000-7.300 M USD, resultado operativo ajustado 1.700-1.900 M)', editor: 'Parameter', tipo: 'Prensa', fecha: '2026-09-24', url: 'https://parameter.io/everpure-p-stock-surges-7-following-aggressive-ai-revenue-forecast/' },
  { id: 8, titulo: 'Everpure Announces Second Quarter Fiscal 2027 Financial Results (guía FY2027 y 3T)', editor: 'Everpure, Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-26', url: `${E8}/000147443226000084/everpure-ex991q2fy2027xpre.htm` },
  { id: 9, titulo: 'Everpure, Inc. noticias (S&P 500 desde septiembre, subidas de objetivo de Needham, Guggenheim y Evercore en octubre)', editor: 'Seeking Alpha / MarketScreener', tipo: 'Prensa', fecha: '2026-10-13', url: 'https://seekingalpha.com/symbol/P' },
  { id: 10, titulo: 'Pure Storage tumbles after Q3 results, analysts show mixed sentiment (márgenes y reinversión del negocio de hiperescala)', editor: 'Seeking Alpha', tipo: 'Prensa', fecha: '2025-12-03', url: 'https://seekingalpha.com/news/4527996-pure-storage-tumbles-after-q3-results-analysts-show-mixed-sentiment' },
  { id: 11, titulo: 'Why Everpure (P) shares are trading lower today (guía del 2T por debajo de lo esperado tras el 1T FY27)', editor: 'StockStory', tipo: 'Prensa', fecha: '2026-05-28', url: 'https://stocks.observer-reporter.com/observerreporter/article/stockstory-2026-5-28-why-everpure-p-shares-are-trading-lower-today' },
  { id: 12, titulo: 'A look at Everpure Inc (P) after 9.9% decline (cierre de 141,49 USD el 14-oct-2026)', editor: 'GuruFocus', tipo: 'Prensa', fecha: '2026-10-14', url: 'https://www.gurufocus.com/news/9124156/a-look-at-everpure-inc-p-after-99-decline-gf-value-8279-vs-price-14149' },
];
const D = {
  _estado: 'Completo. Precio de bolsa.mjs: cierre del 14-oct (el del 15-oct no había cerrado; a las 12:40 de Nueva York cotizaba a ≈131 USD). Comparables de Stock Analysis (PER adelantado ajustado).',
  identificacion: {
    nombre: 'Everpure, Inc. (antes Pure Storage, Inc.)', nombre_corto: 'Everpure', ticker: 'P', isin: 'US74624M1027', mercado: 'Bolsa de Nueva York (NYSE)', indice_referencia: 'S&P 500',
    pais: 'Estados Unidos', pais_iso: 'US', sector: 'Tecnologías de la información', industria: 'Hardware y almacenamiento de datos', sede: 'Santa Clara (California)', fundacion: '2009', empleados: 6400, web: 'https://www.everpuredata.com',
    precio: BOLSA.identificacion.precio, fecha_precio: BOLSA.identificacion.fecha_precio, acciones: 345.6, capitalizacion_publicada: 43740, free_float_pct: 95.6,
    max_52s: BOLSA.identificacion.max_52s, min_52s: BOLSA.identificacion.min_52s, volumen_medio_diario: `≈ ${BOLSA.volumen_3m.importe_dia_millones.toFixed(0)} M USD/día (3 meses)`, proximos_resultados: '2026-11-18',
  },
  consenso: {
    estimaciones: [
      { periodo: 'FY2027e', ingresos: 5055, ebitda: 1147, ebit: 959.8, bpa: 0.97, dpa: 0, fuente: 'MarketScreener (20 analistas; EBITDA y EBIT ajustados, sin pagos en acciones; BPA GAAP) [2]' },
      { periodo: 'FY2028e', ingresos: 7026, ebitda: 1896, ebit: 1791, bpa: 2.24, dpa: 0, fuente: 'MarketScreener [2]' },
      { periodo: 'FY2029e', ingresos: 8397, ebitda: 2423, ebit: 2311, bpa: 3.06, dpa: 0, fuente: 'MarketScreener [2]' },
    ],
    recomendaciones: { n_analistas: 20, comprar: null, mantener: null, vender: null, po_medio: 151.11, po_min: null, po_max: null },
    base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: 12.6,
    confianza: 'Media',
  },
  bolsa: { ...BOLSA.bolsa, posicion_corta_pct: 2.57, confianza: 'Alta' },
  multiplos_historicos: {
    serie: ANIOS.map((y) => ({ anio: y, precio_cierre: BOLSA.cierres_ejercicio.find((c) => c.anio === y).precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: ['FY2021', 'FY2022'].includes(y) })),
    confianza: 'Media',
  },
  comparables: {
    empresas: [
      { nombre: 'NetApp', ticker: 'NTAP', pais: 'US', capitalizacion: 42180, ev_ventas: 5.54, ev_ebitda_ltm: 19.5, ev_ebitda_ntm: null, per_ntm: 22.4, crecimiento_pct: null, margen_ebitda_pct: 28.4, roic_pct: null, dn_ebitda: -0.5, fcf_yield_pct: 3.9 },
      { nombre: 'Dell Technologies', ticker: 'DELL', pais: 'US', capitalizacion: 295920, ev_ventas: 2.29, ev_ebitda_ltm: 19.6, ev_ebitda_ntm: null, per_ntm: 18.1, crecimiento_pct: null, margen_ebitda_pct: 11.7, roic_pct: 29.4, dn_ebitda: 1.3, fcf_yield_pct: 2.7 },
      { nombre: 'Hewlett Packard Enterprise', ticker: 'HPE', pais: 'US', capitalizacion: 78310, ev_ventas: 2.34, ev_ebitda_ltm: 14.2, ev_ebitda_ntm: null, per_ntm: 13.6, crecimiento_pct: null, margen_ebitda_pct: 16.5, roic_pct: 8.3, dn_ebitda: 2.0, fcf_yield_pct: 5.0 },
      { nombre: 'Nutanix', ticker: 'NTNX', pais: 'US', capitalizacion: 18760, ev_ventas: 6.13, ev_ebitda_ltm: 47.1, ev_ebitda_ntm: null, per_ntm: 30.0, crecimiento_pct: null, margen_ebitda_pct: 13.0, roic_pct: 33.3, dn_ebitda: -2.3, fcf_yield_pct: 4.6 },
      { nombre: 'Arista Networks', ticker: 'ANET', pais: 'US', capitalizacion: 231570, ev_ventas: 21.35, ev_ebitda_ltm: 48.5, ev_ebitda_ntm: null, per_ntm: 42.0, crecimiento_pct: null, margen_ebitda_pct: 44.0, roic_pct: null, dn_ebitda: -2.9, fcf_yield_pct: 2.2 },
      { nombre: 'Seagate Technology', ticker: 'STX', pais: 'US', capitalizacion: 153640, ev_ventas: 13.48, ev_ebitda_ltm: 36.5, ev_ebitda_ntm: null, per_ntm: 19.7, crecimiento_pct: null, margen_ebitda_pct: 36.9, roic_pct: 85.9, dn_ebitda: 0.5, fcf_yield_pct: 1.9 },
    ],
    confianza: 'Baja',
  },
  transacciones: null,
  fuentes: fD,
  huecos: [
    { seccion: 'transacciones', campo: 'múltiplos de operaciones de almacenamiento', tipo: 'Complemento', intentos: '1) Notas de prensa de las operaciones (solo valor y precio por acción); 2) S&P Global y prensa (sin múltiplos de EBITDA del objetivo); 3) bases de operaciones de pago', decision: 'Sección omitida; peso de transacciones 0' },
    { seccion: 'consenso', campo: 'reparto de recomendaciones y objetivos mínimo y máximo', tipo: 'Complemento', intentos: '1) MarketScreener (solo media de 151,11 USD y 20 analistas, consenso Comprar); 2) Gotrade (16 comprar, 1 mantener, 1 vender; tabla anterior a las subidas de octubre); 3) Investing (requiere JavaScript)', decision: 'Omitido' },
    { seccion: 'comparables', campo: 'EV/EBITDA NTM y crecimiento esperado de los comparables', tipo: 'Complemento', intentos: '1) Stock Analysis (solo LTM y PER adelantado); 2) MarketScreener (no abre sin sesión); 3) informes del repositorio (otra fecha)', decision: 'Omitido; comparables con peso 0' },
  ],
};

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Everpure, Inc.: noticias y análisis (titulares de agosto a octubre de 2026, RSS)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-13', url: 'https://seekingalpha.com/api/sa/combined/P.xml' },
  { id: 2, titulo: 'Stream $P (30 mensajes, 14 y 15-oct-2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-15', url: 'https://api.stocktwits.com/api/2/streams/symbol/P.json' },
  { id: 3, titulo: 'What are Everpure investors betting on?', editor: 'Trefis', tipo: 'Foros y redes', fecha: '2026-10-08', url: 'https://www.trefis.com/stock/p/articles/617930/what-are-everpure-investors-betting-on/2026-10-08' },
  { id: 4, titulo: 'Everpure stock fell 12% after earnings. Is the selloff an opportunity?', editor: 'TIKR', tipo: 'Foros y redes', fecha: '2026-05', url: 'https://www.tikr.com/blog/everpure-stock-rises-after-q1-2027-earnings-beat-what-a-129-target-means-for-investors' },
];
const E = {
  _estado: 'Completo. Reddit da 403; se leen Seeking Alpha (titulares), Stocktwits y comentarios de mercado.',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Empeora',
    revisadas: [
      { plataforma: 'Seeking Alpha (artículos y noticias)', fecha: '2026-10', n_comentarios: 20, tono: 'Positivo', resumen: 'Desde agosto, titulares de demanda «sin precedentes», victorias con hiperescaladores, entrada en el S&P 500 y subidas de objetivo; el 13-oct, «podría casi doblar su beneficio, pero la valoración sigue alta» [1].' },
      { plataforma: 'Stocktwits', fecha: '2026-10', n_comentarios: 30, tono: 'Dividido', resumen: 'Tras la caída del 14-oct domina el corto plazo: cierre de huecos, «liquidez de salida» tras la subida y quejas por las ventas de consejeros; los alcistas la ven como la gran apuesta de datos para la IA [2].' },
      { plataforma: 'Comentarios de mercado (Trefis, TIKR)', fecha: '2026-10', n_comentarios: 4, tono: 'Neutro', resumen: 'El mercado descuenta que el negocio de hiperescala convierta a la empresa en otra de crecimiento alto; la duda es el margen y el precio de la memoria flash [3, 4].' },
    ],
    confianza: 'Media',
  },
  fuentes: fE,
  huecos: [],
};

guarda('A', A); guarda('B', B); guarda('C', C); guarda('D', D); guarda('E', E);
console.log('Notas A-E escritas');
