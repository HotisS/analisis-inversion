// Escribe las notas A-E de Paycom Software (corte 2026-10-15) a partir del XBRL de la SEC (cuentas-xbrl.json),
// los documentos de EDGAR descargados en notas/docs, bolsa.json, MarketScreener/Stock Analysis y el informe de Paychex del 12-oct (comparables y transacciones).
// Cada nota cita con [n] de su propia lista de fuentes. Ejecutar: node informes/paycom-2026-10-15/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const lee = (f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const X = lee('cuentas-xbrl.json');
const BOLSA = lee('bolsa.json');
const SEC = 'https://www.sec.gov/Archives/edgar/data/1590955';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Form 10-K del ejercicio 2025', editor: 'Paycom Software, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-02-19', url: `${SEC}/000119312526059372/payc-20251231.htm` },
  { id: 2, titulo: 'Form 10-Q del segundo trimestre de 2026', editor: 'Paycom Software, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-08-06', url: `${SEC}/000119312526338010/payc-20260630.htm` },
  { id: 3, titulo: 'Paycom Software, Inc. Reports Second Quarter 2026 Results (anexo 99.1 del 8-K)', editor: 'Paycom Software, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-08-05', url: `${SEC}/000119312526335105/payc-ex99_1.htm` },
  { id: 4, titulo: 'Paycom Software, Inc. Reports First Quarter 2026 Results (anexo 99.1 del 8-K)', editor: 'Paycom Software, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-05-06', url: `${SEC}/000119312526208968/payc-ex99_1.htm` },
  { id: 5, titulo: 'Paycom Software, Inc. Reports Fourth Quarter and Year-End 2025 Results (anexo 99.1 del 8-K)', editor: 'Paycom Software, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-02-11', url: `${SEC}/000119312526046562/payc-ex99_1.htm` },
  { id: 6, titulo: 'Paycom Software, Inc. Reports Third Quarter 2025 Results (anexo 99.1 del 8-K)', editor: 'Paycom Software, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2025-11-05', url: `${SEC}/000119312525266939/payc-ex99_1.htm` },
  { id: 7, titulo: 'Paycom Software: series XBRL de los 10-K y 10-Q (companyfacts)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-06', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0001590955.json' },
  { id: 8, titulo: 'Second Quarter 2026 Quarterly Results Prepared Remarks', editor: 'Paycom Software, Inc.', tipo: 'Primaria', fecha: '2026-08-05', url: 'https://s201.q4cdn.com/761236765/files/doc_financials/2026/q2/PAYC-Q2-2026-Earnings-Final.pdf' },
  { id: 9, titulo: 'Paycom (PAYC) Q2 2026 Earnings Call Transcript', editor: 'The Motley Fool', tipo: 'Prensa', fecha: '2026-08-12', url: 'https://www.fool.com/earnings/call-transcripts/2026/08/12/paycom-payc-q2-2026-earnings-call-transcript/' },
  { id: 10, titulo: '8-K: Amended and Restated Credit Agreement (línea renovable de 2.125 M USD)', editor: 'Paycom Software, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-04-23', url: `${SEC}/000119312526173704/payc-20260423.htm` },
  { id: 11, titulo: '8-K: nuevo programa de recompra de 2.000 M USD y dividendo', editor: 'Paycom Software, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-05-04', url: `${SEC}/000119312526204311/payc-20260504.htm` },
];

const dpa = { 2023: 1.125, 2024: 1.5, 2025: 1.5 };
const cuenta = X.financieros.cuenta.map((c) => {
  const r = { ...c };
  delete r.fin;
  r.dpa = dpa[c.periodo] ?? 0;
  r.dpa_extraordinario = 0;
  r.participadas_en_ebitda = null;
  r.no_recurrentes_en_ebitda = c.periodo === '2024' ? -117.5 : null; // reversión de pagos en acciones (renuncia del paquete de 2020)
  return r;
});

const balance = X.balance.historico.map((b) => {
  const r = { ...b };
  delete r.fin;
  if (r.periodo === '2024') r.inmovilizado_material = 561.4;
  if (r.periodo === '2025') r.inmovilizado_material = 687.3;
  if (['2023', '2024', '2025'].includes(r.periodo)) r.deuda_financiera = 0;
  r.arrendamientos = 0; // US GAAP: arrendamientos operativos, su gasto ya está en el EBITDA
  r.activos_contrato = null; r.pasivos_contrato = null; r.minoritarios = 0;
  return r;
});

const flujos = X.flujos.historico.map((f) => {
  const r = { ...f };
  delete r.fin;
  r.pagos_arrendamientos = 0; r.adquisiciones = 0; r.emision_acciones = 0; r.intereses_en_financiacion = 0;
  for (const k of ['desinversiones', 'dividendos', 'recompras']) if (r[k] == null) r[k] = 0;
  return r;
});

const A = {
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 2140.7, ebitda: 844.0, ebit: 648.4, beneficio_neto: 487.6, bpa: 9.45, dpa: 1.5, dpa_extraordinario: 0, fcf: 571.1, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [],
    comentario: 'Todo el crecimiento es orgánico: Paycom no ha comprado empresas desde la salida a bolsa de 2014 [1]. Los ingresos pasaron de 329,1 M USD en 2016 a 2.051,7 M en 2025, pero el ritmo se ha frenado: +30,6 % en 2022, +23,2 % en 2023, +11,2 % en 2024 y +9,0 % en 2025; la guía de 2026 es de un +7-8 % [1, 3]. Dentro de los ingresos hay dos negocios: los recurrentes (1.938,7 M USD en 2025, +10,3 %) y los **intereses de los fondos de clientes** (113,0 M en 2025, 124,9 M en 2024 y 108,0 M en 2023), que dependen de los tipos a corto y no tienen coste asociado [1]. El margen EBIT GAAP salta por los pagos en acciones: 33,7 % en 2024 con la reversión de 117,5 M USD del paquete de 2020 del fundador, 27,6 % en 2025 con 118,7 M de pagos en acciones; en el primer semestre de 2026 sube al 34,3 % porque la plantilla cayó (5.770 empleados a cierre de 2025, ~500 despidos en octubre de 2025 atribuidos a la automatización) y la I+D total bajó del 20,5 % al 13,9 % de las ventas [1, 3, 9].',
    ajustes: 'Se usan cifras GAAP publicadas. Partidas que no se repiten: (1) 2024, reversión de 117,5 M USD de pagos en acciones por la renuncia del fundador a su paquete especial de 2020, dentro de gastos generales (se resta como partida no recurrente del EBITDA); el BPA GAAP de 8,92 USD baja a unos 7,08 USD normalizado (BAI sin la reversión, tipo del 25 %) [1]; (2) 2025, plusvalía de 35,5 M USD antes de impuestos (26,3 M después) por la modificación del contrato de nombre del pabellón de Oklahoma City, en otros ingresos: BPA normalizado de 7,61 USD frente a 8,08 publicado [1, 6]; (3) 2026, otra plusvalía de 9,0 M por el mismo contrato en el 1T [3]; (4) 2017, tipo efectivo del 3 % por la reforma fiscal: BPA normalizado de 1,52 USD con un tipo del 30 % [7]. El BPA «non-GAAP» de la empresa excluye los pagos en acciones (118,7 M en 2025, 3 % de las ventas previsto en 2026): no se usa, porque es un coste real [5, 9].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '3T24', ingresos: 451.9, crecimiento_pct: 11.2, crecimiento_organico_pct: 11.2, ebitda: 171.3, margen_ebitda_pct: 37.9, bpa: 1.31, vs_consenso: null },
      { periodo: '4T24', ingresos: 493.8, crecimiento_pct: 14.4, crecimiento_organico_pct: 14.4, ebitda: 214.9, margen_ebitda_pct: 43.5, bpa: 2.02, vs_consenso: null },
      { periodo: '1T25', ingresos: 530.5, crecimiento_pct: 6.1, crecimiento_organico_pct: 6.1, ebitda: 253.2, margen_ebitda_pct: 47.7, bpa: 2.48, vs_consenso: null },
      { periodo: '2T25', ingresos: 483.6, crecimiento_pct: 10.5, crecimiento_organico_pct: 10.5, ebitda: 198.3, margen_ebitda_pct: 41.0, bpa: 1.58, vs_consenso: null },
      { periodo: '3T25', ingresos: 493.3, crecimiento_pct: 9.2, crecimiento_organico_pct: 9.2, ebitda: 194.3, margen_ebitda_pct: 39.4, bpa: 1.96, vs_consenso: null },
      { periodo: '4T25', ingresos: 544.3, crecimiento_pct: 10.2, crecimiento_organico_pct: 10.2, ebitda: 236.3, margen_ebitda_pct: 43.4, bpa: 2.07, vs_consenso: 'En línea' },
      { periodo: '1T26', ingresos: 571.9, crecimiento_pct: 7.8, crecimiento_organico_pct: 7.8, ebitda: 275.4, margen_ebitda_pct: 48.2, bpa: 3.04, vs_consenso: 'Superior' },
      { periodo: '2T26', ingresos: 531.2, crecimiento_pct: 9.8, crecimiento_organico_pct: 9.8, ebitda: 235.0, margen_ebitda_pct: 44.2, bpa: 2.34, vs_consenso: 'Superior' },
    ],
    ultima_presentacion: 'EBITDA de la tabla: el ajustado de la empresa (sin pagos en acciones), único publicado por trimestre; BPA diluido GAAP [3-6]. En el 2T26 (5-ago) Paycom batió con holgura: ingresos de 531,2 M USD (+9,8 %; recurrentes +11,0 %), BPA ajustado de 2,78 USD y subida de la guía anual a 2.197-2.212 M de ingresos y 1.007-1.022 M de EBITDA ajustado (46 % de margen) [3, 8]. El mensaje cambió de la conferencia del 1T, en la que solo se reafirmó la guía, a otro centrado en la eficiencia: el fundador atribuyó a los centros de datos propios para modelos de IA (más de 100 M USD invertidos en 2025) un ahorro de unos 100 M en I+D en 2026 y de más de 30 M en tarifas de terceros de IWant, y el director financiero anunció un flujo libre de más de 650 M en 2026 y un capex de ~6 % de las ventas [9]. Los analistas preguntaron cuatro veces por la productividad comercial y las reservas: la respuesta fue que las reservas «llegaron como se esperaba», sin cifras, y que la red comercial creció con más de 100 vendedores nuevos [9]. Tampoco se dio la plantilla actual (la última cifra es de 5.770 a cierre de 2025) ni el efecto de Beti en los ingresos por correcciones de nóminas [9].',
    confianza: 'Alta',
  },
  balance: {
    historico: balance,
    vencimientos: [{ anio: '2026', importe: 0 }, { anio: '2027', importe: 0 }, { anio: '2028', importe: 0 }, { anio: '2029', importe: 0 }, { anio: '2030', importe: 0 }, { anio: '2031', importe: 900 }],
    liquidez: 'Caja corporativa de 198,0 M USD a 30-jun-2026 y 1.225 M disponibles de la línea renovable de 2.125 M (900 M dispuestos), con vencimiento en abril de 2031 [2, 10].',
    rating: 'Sin rating',
    coste_deuda_pct: 6.0,
    vida_media_anios: 4.8,
    otros_pasivos: 'Los fondos de clientes (3.006,1 M USD a 30-jun-2026, 5.137,0 M a cierre de 2025 por la estacionalidad de fin de año) y su obligación (3.005,8 M) inflan el activo y el pasivo corrientes; se anulan entre sí y quedan fuera de la caja propia y de la deuda [2]. La deuda de 900 M es una línea renovable garantizada con todos los bienes muebles del grupo, a SOFR más un diferencial, sin amortización hasta abril de 2031 [2, 10]. Los arrendamientos operativos (82,8 M de pasivo) no se cuentan como deuda porque su gasto está en el EBITDA (US GAAP) [2]. Contingencias: una demanda colectiva de valores de 2023-2024 por las declaraciones sobre el efecto de Beti en los ingresos (pendiente de la moción de desestimación) y tres demandas derivadas suspendidas [1]. Obligación de patrocinio del pabellón de Oklahoma City hasta, como tarde, el 30-sep-2028, ya rebajada [2].',
    comentario: 'Hasta 2025 Paycom no tenía deuda (la hipoteca de la sede, unos 30 M USD, se canceló en 2023) y acumulaba caja [1, 7]. En 2026 cambió de política: recompró 10,9 millones de acciones por 1.389,7 M USD en el primer semestre, con 900 M de deuda nueva, y el patrimonio neto bajó de 1.731,5 M a 571,5 M [2]. La deuda neta corporativa de 702 M USD equivale a unas 0,7 veces el EBITDA ajustado previsto para 2026 (1.007-1.022 M) [3]. El circulante comercial es mínimo (clientes de 53,5 M y proveedores de 7,6 M): los clientes pagan cada nómina por adelantado y los costes de captación diferidos (1.038,1 M, corto más largo plazo) son la partida grande del activo operativo [2].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'El flujo operativo pasó de 98,8 M USD en 2016 a 679,0 M en 2025, pero el capex (sobre todo software desarrollado y centros de datos) se comió entre el 30 % y el 44 % de cada año: 275,0 M en 2025, con más de 100 M para preparar los centros de datos para modelos de IA propios [1, 9]. En el primer semestre de 2026 el flujo operativo fue de 427,6 M (con 74,8 M de devolución de impuestos que no se repite) y el capex bajó a 54,9 M, la mitad que un año antes; la empresa prevé un flujo libre de más de 650 M USD en 2026 y un capex de ~6 % de las ventas [2, 9]. Estimación propia: el capex de mantenimiento ronda el 5-6 % de las ventas (desarrollo de software capitalizado y equipos), y el resto de 2025 fue crecimiento (centros de datos). Uso de la caja: 1.389,7 M de recompras y 35,5 M de dividendos en el primer semestre de 2026 [2].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'Grant Thornton LLP', anios_auditor: 17, opinion: 'Favorable',
    comentario: 'Grant Thornton audita desde 2009, con opinión favorable sobre las cuentas y el control interno de 2025; la cuestión clave de auditoría fue la vida estimada de los clientes (10 años), que fija a qué ritmo se reconocen las cuotas de alta [1]. Tres asuntos contables pesan: (1) **capitalización**: la I+D capitalizada fue de 152,9 M USD en 2025 (436,3 M de I+D total frente a 283,4 M en gasto), una parte grande del capex, y se amortiza en pocos años [1]; (2) **pagos en acciones**: 118,7 M en 2025 (5,8 % de las ventas), −22,9 M en 2024 por la reversión del paquete del fundador y 31,6 M en el primer semestre de 2026 [1, 3]; la empresa prevé un 3 % de las ventas en 2026 [9]; (3) **costes de captación diferidos** (comisiones), 1.038,1 M a 30-jun-2026, que suavizan el gasto comercial [2]. El tipo efectivo sube al 29,3 % en 2026 por menos deducciones de pagos en acciones y de I+D [2]. Indicadores del motor: el Altman Z y el Piotroski se leen sin los fondos de clientes, que inflan el activo corriente; el Beneish de 2024 lo distorsiona la reversión de 117,5 M.',
    senales: [
      { senal: 'Reversión de pagos en acciones de 117,5 M USD en 2024', nivel: 'Media', comentario: 'Infla el BPA GAAP de 2024 (8,92 USD frente a ~7,08 normalizado) y la historia del PER; se normaliza [1].' },
      { senal: 'I+D capitalizada alta (≈35 % de la I+D total en 2025)', nivel: 'Media', comentario: 'Pasa gasto a capex y amortización; la caída de la capitalizada en 2026 (15,6 M en el 2T frente a 36,9 M) coincide con la de la I+D en gasto: es reducción real, no reclasificación [3].' },
      { senal: 'Demanda colectiva por las declaraciones sobre Beti', nivel: 'Baja', comentario: 'Pendiente de la moción de desestimación desde 2024; la empresa no prevé efecto material [1].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Dividendo trimestral de 0,375 USD desde 2023 (1,50 USD al año, rentabilidad del 0,6 %) y recompras como prioridad: el plan de julio de 2024 (1.500 M USD) se agotó en marzo de 2026 y el consejo aprobó otro de 2.000 M sin caducidad el 4-may-2026, con 1.655,5 M disponibles a 30-jun-2026 [2, 11]. Las recompras se financian con caja y con la línea renovable, ampliada de 1.000 M a 2.125 M en 2026 [2, 10]. No hay adquisiciones: todo el crecimiento es propio [1].',
    adquisiciones: [],
    comentario: 'La asignación de capital ha cambiado de golpe. Entre 2016 y 2025 Paycom recompró de forma moderada (unos 1.080 M USD en total) y reinvirtió en capex propio; en el primer semestre de 2026 recompró el 20 % de las acciones (10,9 millones a ~127 USD de media, 1.389,7 M) cuando cotizaba a 114-140 USD [2, 3]. Con el precio de hoy, 239 USD, la compra ha sido muy rentable para el accionista que se quedó. Lo discutible es que se haya hecho con deuda (900 M) en un negocio que guarda fondos de clientes y en el pico del endeudamiento del fundador como accionista del 13 %, que no vendió: su participación sube sin poner dinero [2]. La inversión en centros de datos para IA (más de 100 M en 2025) se ha traducido en un ahorro de 100 M de I+D en 2026, según la dirección [9]. Sin compras de empresas no hay riesgo de fondo de comercio (51,9 M desde 2014) [1].',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [{ nombre: 'Recurrentes y otros', descripcion: 'Cuotas por empleado y proceso de nóminas, RR. HH., tiempo, talento, verificaciones y relojes', tipo_resultado: null, historico: [{ periodo: '2023', ingresos: 1585.7, resultado: null }, { periodo: '2024', ingresos: 1758.3, resultado: null }, { periodo: '2025', ingresos: 1938.7, resultado: null }] },
      { nombre: 'Intereses de los fondos de clientes', descripcion: 'Rendimiento de los fondos de nóminas e impuestos que custodia entre el cobro y el pago', tipo_resultado: null, historico: [{ periodo: '2023', ingresos: 108.0, resultado: null }, { periodo: '2024', ingresos: 124.9, resultado: null }, { periodo: '2025', ingresos: 113.0, resultado: null }] }],
    geografias: [{ nombre: 'EE. UU.', peso_pct: 99.0 }, { nombre: 'Resto (Canadá, México, Reino Unido, Irlanda)', peso_pct: 1.0 }],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Retención anual de ingresos', valor_anterior: '90 % (2024)', valor_actual: '91 % (2025)', variacion: '+1 pp', comentario: 'Récord tras la caída de 2023-2024 por la canibalización de Beti [1].' },
      { kpi: 'Clientes', valor_anterior: 'n.d.', valor_actual: '≈39.200 (2025)', variacion: null, comentario: 'Empresas de 50 a más de 10.000 empleados [1].' },
      { kpi: 'Saldo medio de fondos de clientes', valor_anterior: '2.400 M USD (2024)', valor_actual: '2.700 M USD (2025); 2.900 M (2T26, +9 %)', variacion: '+12,5 %', comentario: 'Base de los intereses: 100 pb mueven 25,7 M USD al año [1, 2, 8].' },
      { kpi: 'Plantilla', valor_anterior: 'n.d.', valor_actual: '5.770 (dic-2025)', variacion: null, comentario: '~500 despidos en oct-2025 atribuidos a IA y automatización; sin cifra posterior [1, 9].' },
      { kpi: 'Margen EBITDA ajustado', valor_anterior: '41,2 % (2024)', valor_actual: '43,0 % (2025); 46 % guía 2026', variacion: '+1,8 pp', comentario: 'Sin pagos en acciones [3, 5].' },
      { kpi: 'Productos propios', valor_anterior: '44', valor_actual: '45 (Asset Management, jul-2026)', variacion: '+1', comentario: '[8]' },
    ],
  },
  fuentes: fA,
  huecos: [],
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Form 10-K del ejercicio 2025', editor: 'Paycom Software, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-02-19', url: `${SEC}/000119312526059372/payc-20251231.htm` },
  { id: 2, titulo: 'Paycom Software, Inc. Reports First Quarter 2026 Results (anexo 99.1 del 8-K)', editor: 'Paycom Software, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-05-06', url: `${SEC}/000119312526208968/payc-ex99_1.htm` },
  { id: 3, titulo: 'Paycom Software, Inc. Reports Fourth Quarter and Year-End 2025 Results (anexo 99.1 del 8-K)', editor: 'Paycom Software, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-02-11', url: `${SEC}/000119312526046562/payc-ex99_1.htm` },
  { id: 4, titulo: 'Second Quarter 2026 Quarterly Results Prepared Remarks', editor: 'Paycom Software, Inc.', tipo: 'Primaria', fecha: '2026-08-05', url: 'https://s201.q4cdn.com/761236765/files/doc_financials/2026/q2/PAYC-Q2-2026-Earnings-Final.pdf' },
  { id: 5, titulo: 'Paychex, Inc. Form 10-K del ejercicio cerrado el 31 de mayo de 2026', editor: 'Paychex, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-07-17', url: 'https://www.sec.gov/Archives/edgar/data/723531/000119312526307785/payx-20260531.htm' },
  { id: 6, titulo: 'Automatic Data Processing, Form 10-K del ejercicio cerrado el 30 de junio de 2026', editor: 'ADP (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-08-05', url: 'https://www.sec.gov/Archives/edgar/data/8670/000000867026000030/adp-20260630.htm' },
  { id: 7, titulo: 'Paylocity Holding, datos XBRL del Form 10-K de FY2026 (junio)', editor: 'SEC EDGAR (companyfacts)', tipo: 'Primaria', fecha: '2026-08-05', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0001591698.json' },
  { id: 8, titulo: 'Workday, datos XBRL del Form 10-K de FY2026 (enero de 2026)', editor: 'SEC EDGAR (companyfacts)', tipo: 'Primaria', fecha: '2026-03-06', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0001327811.json' },
  { id: 9, titulo: 'Intuit Inc. Form 10-K del ejercicio 2026', editor: 'Intuit Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-09-09', url: 'https://www.sec.gov/Archives/edgar/data/896878/000089687826000037/intu-20260731.htm' },
  { id: 10, titulo: 'Paycom lays off 500 employees, will replace jobs with AI', editor: 'KGOU', tipo: 'Prensa', fecha: '2025-10-01', url: 'https://www.kgou.org/business-and-economy/2025-10-01/paycom-lays-off-500-employees-will-replace-jobs-with-ai' },
  { id: 11, titulo: 'Total Revenue for Payroll Services, Employer Firms (REVEF541214TAXABL)', editor: 'U.S. Census Bureau vía FRED', tipo: 'Sectorial', fecha: '2024-01-31', url: 'https://fred.stlouisfed.org/series/REVEF541214TAXABL' },
  { id: 12, titulo: 'All Employees, Total Private (USPRIV)', editor: 'U.S. Bureau of Labor Statistics vía FRED', tipo: 'Sectorial', fecha: '2026-10', url: 'https://fred.stlouisfed.org/series/USPRIV' },
  { id: 13, titulo: 'Paycom vs. Rippling: Comparing Payroll and HR Systems', editor: 'Paycom Software, Inc.', tipo: 'Primaria', fecha: '2026', url: 'https://www.paycom.com/compare/paycom-vs-rippling/' },
  { id: 14, titulo: 'Paycom (PAYC) Q2 2026 Earnings Call Transcript', editor: 'The Motley Fool', tipo: 'Prensa', fecha: '2026-08-12', url: 'https://www.fool.com/earnings/call-transcripts/2026/08/12/paycom-payc-q2-2026-earnings-call-transcript/' },
  { id: 15, titulo: 'Dayforce Enters into US$12.3 Billion Definitive Agreement with Thoma Bravo (anexo 99.1 del 8-K)', editor: 'Dayforce, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2025-08-21', url: 'https://www.sec.gov/Archives/edgar/data/1725057/000119312525184632/d949165dex991.htm' },
];

const B = {
  historia: {
    resumen: 'Chad Richison fundó Paycom en Oklahoma City en 1998, tras trabajar como comercial de nóminas en ADP y en Ceridian; fue de las primeras en vender nóminas por internet y desarrolla todo en una sola base de datos [1]. Salió a bolsa en el NYSE en abril de 2014 y desde entonces ha crecido sin compras: de 150,9 M USD de ingresos en 2014 a 2.051,7 M en 2025 [1]. Dos giros recientes la definen: Beti (2021), que hace que el empleado revise su nómina antes de procesarla y que redujo las correcciones que Paycom cobraba, con una caída de la acción del 38 % el 1-nov-2023; y la apuesta de 2025-2026 por la automatización y la IA propia (IWant, despidos de ~500 personas, centros de datos), con una recompra del 20 % del capital en 2026 [1, 3, 10].',
    hitos: [
      { anio: '1998', hito: 'Fundación en Oklahoma City por Chad Richison [1].' },
      { anio: '2014', hito: 'Salida a bolsa en el NYSE (PAYC) [1].' },
      { anio: '2020', hito: 'Paquete especial de acciones para el fundador (2020 CEO Performance Award), muy contestado por los accionistas [1].' },
      { anio: '2021', hito: 'Lanzamiento de Beti: el empleado hace y aprueba su propia nómina [1].' },
      { anio: '2023', hito: 'Primer dividendo; la acción cae un 38 % el 1-nov por la canibalización de Beti; demandas de accionistas [1].' },
      { anio: '2024', hito: 'El fundador renuncia al paquete de 2020 (reversión de 117,5 M USD) y comparte el puesto con un consejero delegado adjunto de febrero a mayo [1].' },
      { anio: '2025', hito: 'Despido de ~500 empleados atribuido a la IA; lanzamiento de IWant; retención récord del 91 % [3, 10].' },
      { anio: '2026', hito: 'Recompra del 20 % de las acciones con 900 M USD de deuda; Shane Hadlock, presidente; subida de la guía en agosto [4].' },
    ],
    confianza: 'Alta',
  },
  negocio: {
    descripcion: 'Paycom vende un programa de gestión de personal (HCM) en la nube, con una sola base de datos para nóminas, impuestos sobre nóminas, tiempo y asistencia, contratación, gestión del talento, formación, beneficios y gastos [1]. Sus clientes son empresas de EE. UU. de 50 a más de 10.000 empleados (≈39.200 clientes en 2025), con un peso creciente de las de más de 1.000 [1]. Vende con una red comercial propia de alto contacto, organizada en oficinas regionales; en 2026 pasó de equipos de 8 a 10 vendedores y añadió más de 100 [14]. Tiene 45 productos propios, entre ellos Beti (nómina hecha por el empleado), GONE (vacaciones automáticas), IWant (asistente de IA para consultar y ejecutar) y Asset Management (julio de 2026) [4]. Tiene nómina nativa en Canadá, México, Reino Unido e Irlanda, pero casi todo el negocio está en EE. UU. [1].',
    como_gana_dinero: 'Cobra cuotas por empleado y por proceso de nómina (y por módulo), más la cuota de alta, que se reconoce en 10 años; los ingresos recurrentes y otros fueron el 94,5 % del total en 2025 [1]. El otro 5,5 % son los intereses de los fondos de clientes: Paycom cobra la nómina y los impuestos antes de pagarlos y retiene los fondos de 1 a 30 días (hasta 120), sin coste asociado; 100 pb de tipos mueven 25,7 M USD al año [1, 2]. El margen depende de la plantilla propia (servicio, desarrollo y comercial): la automatización ha subido el margen EBITDA ajustado del 41,2 % de 2024 al 46 % previsto en 2026 [3, 4]. Estacionalidad: el 1T es el trimestre fuerte (formularios W-2 y ACA) [1]. Es sensible al empleo de los clientes (cobra por empleado) [1].',
    clientes: 'No hay concentración: ningún cliente pesa de forma significativa entre unos 39.200 [1]. Los contratos se cancelan con 30 días de preaviso, pero la retención anual de ingresos es del 91 % en 2025 (90 % en 2024), que la empresa considera infravalorada porque cuenta las bajas por compra o cierre del cliente [1]. Poder de precios: limitado y bajo presión. Paycom advierte de que algunos competidores principales venden más barato y que eso ya ha causado presión de precios [1]; y Beti demostró que un producto que ahorra trabajo al cliente puede quitar ingresos por servicios (correcciones de nómina) a la propia Paycom [1]. La venta de módulos dentro de la aplicación, sin pasar por el comercial, gana peso [14].',
  },
  sector: {
    definicion: 'El mercado relevante es el software y los servicios de nóminas y gestión de personal (HCM) para empresas medianas de EE. UU., que Paycom sirve en menos de un 5 % según su dirección [2, 3]. La única serie oficial es la del Census Bureau de ingresos de las empresas de servicios de nóminas (NAICS 541214), que mide solo el núcleo de nóminas externalizadas y termina en 2022 [11]. El mercado direccionable de Paycom no se publica en dólares: con unos ingresos de 2.051,7 M USD y menos del 5 % del mercado, sería de al menos 41.000 M USD (estimación propia) [2, 3]. Paychex estima el suyo en más de 100.000 M USD contando PEO, jubilación y seguros [5].',
    tamano: 'Al menos 41.000 M USD de mercado direccionable para Paycom en 2025 (estimación propia con «menos del 5 %» servido) [2, 3]; 27.589 M USD de ingresos de las empresas de servicios de nóminas en 2022 (Census) [11].',
    unidad_serie: 'millones de USD (ingresos de las empresas de servicios de nóminas de EE. UU., NAICS 541214, Census)',
    serie: [{ anio: '2017', tamano: 21946 }, { anio: '2018', tamano: 21794 }, { anio: '2019', tamano: 23929 }, { anio: '2020', tamano: 24637 }, { anio: '2021', tamano: 26729 }, { anio: '2022', tamano: 27589 }],
    tcac_historico_pct: 4.7, tcac_previsto_pct: null, cr5_pct: null, estructura: 'Fragmentada',
    drivers: [
      { driver: 'Empleo de los clientes', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Paycom cobra por empleado; el empleo de sus clientes fue estable en 2026 y cayó ~14 % en 2020 [14]; el empleo privado de EE. UU. creció un 0,4 % en 2025 [12].' },
      { driver: 'Paso de sistemas antiguos o de varios proveedores a una sola plataforma en la nube', efecto: '+', horizonte: 'Estructural', evidencia: 'Paycom sirve menos del 5 % de su mercado y vende la base de datos única frente a ofertas que juntan sistemas de terceros [1, 3].' },
      { driver: 'Tipos de interés a corto', efecto: '+/−', horizonte: 'Cíclico', evidencia: '113,0 M USD de intereses de fondos en 2025 (5,5 % de los ingresos, ~15 % del EBITDA GAAP); 100 pb = 25,7 M al año [1, 2].' },
      { driver: 'Complejidad normativa laboral y fiscal', efecto: '+', horizonte: 'Estructural', evidencia: 'COBRA, salario mínimo, horas extra, ACA e impuestos federales, estatales y locales empujan a externalizar [2].' },
      { driver: 'IA y automatización', efecto: '+/−', horizonte: 'Estructural', evidencia: 'Reduce el trabajo administrativo que se cobra y puede reducir la plantilla de los clientes (Paycom cobra por empleado), pero abarata el coste de Paycom: ~100 M USD de ahorro en I+D en 2026 [1, 14].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 4, justificacion: 'Mercado «muy competitivo, cambiante y fragmentado», con presión de precios de rivales que venden más barato [1]; ADP, Paychex-Paycor, Paylocity, Workday, Dayforce (privada desde 2026), UKG, Rippling y Gusto [1, 5, 15].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Clientes atomizados (≈39.200), pero pueden irse con 30 días de preaviso y los medianos negocian en cada renovación [1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 1, justificacion: 'El coste principal es la plantilla propia; la infraestructura es propia (centros de datos) [1, 14].' },
      { fuerza: 'Amenaza de entrada', intensidad: 3, justificacion: 'Rippling y Deel, con capital riesgo, entran en empresas medianas con plataformas que suman TI y gastos [13]; la custodia de fondos y el cumplimiento fiscal en miles de jurisdicciones exigen escala [1].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'Nóminas integradas en otros programas («embedded payroll» y marca blanca), ERP con módulo de HCM y, a futuro, agentes de IA que hagan tareas de RR. HH. [1].' },
    ],
    ciclo: { posicion: 'Madurez del ciclo', comentario: 'El empleo privado crece poco (+0,4 % en 2025) [12] y el empleo de los clientes de Paycom está «estable» [14]. En 2008-09 los ingresos de servicios de nóminas del Census cayeron un 14 % entre 2008 y 2010 [11], pero Paycom crecía con fuerza desde una base pequeña. En 2020 el empleo de sus clientes cayó ~14 % y sus ingresos aún subieron un 14 % [1, 14]. En 2022 la subida de tipos disparó los intereses de los fondos (de casi nada a 108,0 M en 2023), y el ciclo de bajadas los recorta [1].' },
    regulacion: 'Paycom está sujeta a normas de privacidad (leyes estatales como la de California y la de biometría de Illinois, que ya ha generado demandas en el sector), a la regulación de las verificaciones de antecedentes (FCRA) y a la del dinero de clientes que custodia [1]. La Ley de IA de la UE (obligaciones principales desde el 2-ago-2026) y la interpretación del RGPD sobre decisiones automatizadas pueden limitar el uso de IA en decisiones de personal [1]. En EE. UU., normas estatales y locales sobre IA en contratación (Nueva York, Colorado) afectan a los módulos de selección. Paycom obtuvo la certificación ISO 42001 de gestión de IA en noviembre de 2025 [1].',
    tendencias: 'Tres tendencias: (1) **consolidación en una plataforma** (lo que vende Paycom) frente a soluciones de varios proveedores [1]; (2) **IA**: los proveedores se juegan el valor en automatizar la nómina y el trabajo de RR. HH.; Paycom lo usa para recortar su coste y vender IWant, pero la IA también reduce el trabajo que se cobra por servicios y amenaza con reducir plantillas de clientes [1, 14]; (3) **nuevos competidores con capital riesgo** (Rippling, Deel, Gusto) y nóminas integradas en otros programas, que presionan precios [1, 13]. Las compras de Paycor por Paychex y de Dayforce por Thoma Bravo concentran el mercado medio [5, 15].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 5.0,
    posicion: 'Proveedor mediano de HCM en la nube para empresas de 50 a 10.000 empleados en EE. UU.; sirve «menos del 5 %» de su mercado direccionable [3]. Por ingresos, detrás de ADP (21.947 M USD), Paychex (6.512 M) y Workday (9.552 M), y por delante de Paylocity (1.771 M) [5-8].',
    competidores: [
      { nombre: 'Automatic Data Processing (ADP)', pais: 'EE. UU.', ticker: 'ADP', ingresos: 21947.4, cuota_pct: null, margen_ebit_pct: 26.1, comentario: 'Líder; FY2026 (junio) ingresos +7 %; retención del 92,1 %; fondos de clientes como Paycom [6].' },
      { nombre: 'Paychex (con Paycor)', pais: 'EE. UU.', ticker: 'PAYX', ingresos: 6512.0, cuota_pct: null, margen_ebit_pct: 38.6, comentario: 'Pymes; compró Paycor (medianas, rival directo de Paycom) en 2025 por ~4.100 M USD [5].' },
      { nombre: 'Workday', pais: 'EE. UU.', ticker: 'WDAY', ingresos: 9552, cuota_pct: null, margen_ebit_pct: 7.5, comentario: 'HCM y finanzas para grandes empresas; solapa por arriba (más de 1.000 empleados) [8].' },
      { nombre: 'Paylocity', pais: 'EE. UU.', ticker: 'PCTY', ingresos: 1771.3, cuota_pct: null, margen_ebit_pct: 21.8, comentario: 'El rival más parecido: medianas empresas, ingresos +11,0 % en FY2026 [7].' },
      { nombre: 'Intuit (QuickBooks Payroll)', pais: 'EE. UU.', ticker: 'INTU', ingresos: 21448, cuota_pct: null, margen_ebit_pct: 27.4, comentario: 'Microempresas, por debajo del cliente de Paycom [9].' },
      { nombre: 'Dayforce', pais: 'EE. UU.', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Comprada por Thoma Bravo por 12.300 M USD (cerrada en febrero de 2026); compite en empresas medianas y grandes [15].' },
      { nombre: 'Rippling', pais: 'EE. UU.', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Privada con capital riesgo; plataforma de RR. HH., TI y gastos que Paycom compara con la suya [13].' },
    ],
    foso: { veredicto: 'Estrecho', tendencia: 'Estable', fuentes: [
      { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'No hay: cada cliente usa su propia instancia y no gana nada porque haya otros [1].' },
      { fuente: 'Costes de cambio', puntuacion: 3, evidencia: 'Nómina, impuestos, tiempo y talento en una sola base de datos; retención del 91 % en 2025 [1]. Pero los contratos se cancelan con 30 días de preaviso [1].' },
      { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 2, evidencia: 'Producto propio con una sola base de datos (45 productos), certificaciones ISO 27001/27701/42001; sin patentes decisivas [1, 4].' },
      { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Margen EBITDA ajustado del 46 % previsto en 2026, el más alto del software de HCM tras Paychex; infraestructura e IA propias [4, 14].' },
      { fuente: 'Escala eficiente', puntuacion: 2, evidencia: '≈39.200 clientes y ~2.900 M USD de fondos medios; escala inferior a ADP y Paychex [1, 4].' },
    ] },
    amenazas: 'Cuatro amenazas: (1) **IA** que reduzca plantillas de clientes (cobro por empleado) o que convierta la nómina en un servicio integrado en otros programas; (2) **Rippling, Deel y Gusto**, con capital riesgo y precios agresivos, y Paychex-Paycor, más grande, en empresas medianas [1, 5, 13]; (3) **canibalización** de sus propios productos de automatización (Beti redujo ingresos por correcciones en 2023-2024) [1]; (4) **bajadas de tipos**: cada 100 pb restan 25,7 M USD de ingresos sin coste [2]. Probabilidad media en los cuatro casos a cinco años.',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Para Paycom pesan tres asuntos: (1) **protección de datos personales** de millones de empleados de sus clientes (salarios, números de la Seguridad Social, biometría de relojes), con certificaciones ISO 27001 y 27701 [1]; (2) **capital humano**: ~500 despidos en octubre de 2025 atribuidos a la IA, con acuerdos de indemnización con cláusula de no desprestigio, en una empresa que presume de cultura [10]; (3) **gobierno**: fundador presidente y consejero delegado, consejo escalonado y remuneración contestada [1].',
    controversias: 'Demanda colectiva de valores (2023-2024) por las declaraciones sobre Beti y tres demandas derivadas, pendientes [1]. Críticas de prensa local a los despidos de octubre de 2025 y a su presentación como sustitución por IA [10]. Sin sanciones de reguladores publicadas en los últimos tres años [1].',
    confianza: 'Media',
  },
  fuentes: fB,
  huecos: [{ seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) informe de sostenibilidad y web de inversores de Paycom; 2) MSCI ESG Ratings y Sustainalytics (requieren registro); 3) proxy 2026 (solo resume la política ESG)', decision: 'Omitido' }],
};
guarda('B', B);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Definitive Proxy Statement (DEF 14A) de la junta de 2026', editor: 'Paycom Software, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-04-02', url: `${SEC}/000119312526140064/d44715ddef14a.htm` },
  { id: 2, titulo: '8-K: resultados de la junta de 4-may-2026 (Item 5.07)', editor: 'Paycom Software, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-05-07', url: `${SEC}/000119312526211919/payc-20260504.htm` },
  { id: 3, titulo: '8-K: resultados de la junta de 5-may-2025 (Item 5.07)', editor: 'Paycom Software, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2025-05-08', url: `${SEC}/000095017025066951/payc-20250505.htm` },
  { id: 4, titulo: '8-K: ampliación del consejo con Craig E. Boelte y William Kerber', editor: 'Paycom Software, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-07-09', url: `${SEC}/000119312526299695/payc-20260708.htm` },
  { id: 5, titulo: '8-K: nombramiento de Shane Hadlock como presidente', editor: 'Paycom Software, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-02-19', url: `${SEC}/000119312526058247/payc-20260218.htm` },
  { id: 6, titulo: '8-K: nuevo director comercial (Jeff York) y salida de Amy Walker', editor: 'Paycom Software, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-01-26', url: `${SEC}/000119312526021302/payc-20260120.htm` },
  { id: 7, titulo: '8-K: dimisión de la consejera Archana Vemulapalli', editor: 'Paycom Software, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-03-26', url: `${SEC}/000119312526126191/payc-20260326.htm` },
  { id: 8, titulo: 'Form 4 de directivos de Paycom presentados entre oct-2025 y oct-2026', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001590955&type=4' },
  { id: 9, titulo: 'Form 10-K del ejercicio 2025 (litigios y riesgos de personas clave)', editor: 'Paycom Software, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-02-19', url: `${SEC}/000119312526059372/payc-20251231.htm` },
  { id: 10, titulo: 'Paycom Software, Inc. Reports Fourth Quarter and Year-End 2025 Results (anexo 99.1 del 8-K)', editor: 'Paycom Software, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-02-11', url: `${SEC}/000119312526046562/payc-ex99_1.htm` },
  { id: 11, titulo: 'Paycom Software, Inc. Reports Third Quarter 2025 Results (anexo 99.1 del 8-K)', editor: 'Paycom Software, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2025-11-05', url: `${SEC}/000119312525266939/payc-ex99_1.htm` },
  { id: 12, titulo: 'Paycom Software, Inc. Reports Second Quarter 2026 Results (anexo 99.1 del 8-K)', editor: 'Paycom Software, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-08-05', url: `${SEC}/000119312526335105/payc-ex99_1.htm` },
  { id: 13, titulo: 'Paycom Software, Inc. Reports First Quarter 2026 Results (anexo 99.1 del 8-K)', editor: 'Paycom Software, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-05-06', url: `${SEC}/000119312526208968/payc-ex99_1.htm` },
];
const C = {
  directivos: {
    equipo: [
      { nombre: 'Chad Richison', cargo: 'Fundador, consejero delegado y presidente del consejo', desde: '1998', participacion_pct: 13.1, trayectoria: 'Fundó Paycom en 1998 tras ser comercial de ADP y Ceridian; la llevó de cero a 2.051,7 M USD de ingresos sin compras y a la bolsa en 2014. Compartió el cargo de febrero a mayo de 2024 y volvió como único consejero delegado [1]. Tiene 5.899.707 acciones (12,4 % en marzo de 2026, ≈13,1 % tras las recompras) y no ha vendido en 12 meses [1, 8].' },
      { nombre: 'Shane Hadlock', cargo: 'Presidente y director de clientes', desde: '2026', participacion_pct: 0.12, trayectoria: 'Catorce años en Paycom (TI y seguridad, director de clientes y de tecnología); presidente desde febrero de 2026 con la función de director de operaciones principal, ligado a la subida de la retención al 91 % [5].' },
      { nombre: 'Robert D. Foster', cargo: 'Director financiero', desde: '2025', participacion_pct: 0.03, trayectoria: 'En Paycom desde 2022; antes dirigió iiPay, una empresa de nóminas internacional (2014-2022). Sustituyó a Craig Boelte (director financiero de 2006 a 2025) [1].' },
      { nombre: 'Randy Peck', cargo: 'Director de operaciones', desde: '2024', participacion_pct: 0.09, trayectoria: 'Reporta al presidente desde febrero de 2026 [5].' },
      { nombre: 'Jeff York', cargo: 'Director comercial', desde: '2026', participacion_pct: null, trayectoria: 'Vuelve al cargo que ocupó de 2007 a 2021, en sustitución de Amy Walker (enero de 2026) [6].' },
    ],
    historial_guidance: [
      { anio: '2025', guia: 'Ingresos de 2.045-2.055 M USD y EBITDA ajustado de 872-882 M (guía de noviembre de 2025)', real: '2.051,7 M y 882,3 M', cumplida: 'Sí' },
      { anio: '2026', guia: 'Inicial (feb-2026): ingresos de 2.175-2.195 M y EBITDA ajustado de 950-970 M; elevada en agosto a 2.197-2.212 M y 1.007-1.022 M', real: 'Primer semestre: 1.103,1 M de ingresos y 510,4 M de EBITDA ajustado', cumplida: 'Parcial' },
      { anio: '2023', guia: 'Crecimiento de dos cifras sostenido; la guía del 4T23 se recortó el 31-oct-2023 por Beti', real: 'Ingresos 2023 de 1.693,7 M (+23,2 %), 2024 +11,2 %', cumplida: 'No' },
    ],
    comentario: 'La empresa es la de su fundador: Richison es consejero delegado y presidente desde 1998, tiene el 13 % y la empresa reconoce que depende de él [9]. El equipo ha rotado mucho en 24 meses: director financiero nuevo (febrero de 2025), presidente (febrero de 2026), director comercial (enero de 2026, vuelve el de 2007-2021) y salida del director de sistemas en 2025, casi todos promociones internas [1, 5, 6]. La credibilidad de la guía es buena en 2025-2026 (cumplida y elevada), tras el golpe de 2023, cuando la dirección tardó en reconocer que Beti recortaba ingresos [9-13]. No hay plan de sucesión público; el nombramiento de Hadlock como presidente con funciones operativas es el paso más claro.',
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      { nombre: 'Chad Richison', cargo: 'Presidente y consejero delegado', tipo: 'Ejecutivo', desde: '1998', comisiones: '—' },
      { nombre: 'Frederick C. Peters II', cargo: 'Consejero independiente coordinador', tipo: 'Independiente', desde: null, comisiones: 'Auditoría (presidente), Retribuciones' },
      { nombre: 'Joseph L. Binz', cargo: 'Consejero', tipo: 'Independiente', desde: null, comisiones: 'Auditoría' },
      { nombre: 'Henry C. Duques', cargo: 'Consejero', tipo: 'Independiente', desde: null, comisiones: 'Auditoría, Nombramientos' },
      { nombre: 'Sharen J. Turney', cargo: 'Consejera', tipo: 'Independiente', desde: null, comisiones: 'Retribuciones' },
      { nombre: 'J.C. Watts, Jr.', cargo: 'Consejero', tipo: 'Independiente', desde: null, comisiones: 'Retribuciones (presidente)' },
      { nombre: 'Craig E. Boelte', cargo: 'Consejero (exdirector financiero 2006-2025)', tipo: 'Otro externo', desde: '2026', comisiones: '—' },
      { nombre: 'William Kerber', cargo: 'Consejero (exdirector de sistemas 2007-2017)', tipo: 'Independiente', desde: '2026', comisiones: 'Auditoría' },
    ],
    presidente_ceo_separados: false, presidente_ejecutivo: true, consejero_coordinador: true, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: true, variable_ligado_rentabilidad: false, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 60.8, voto_remuneracion_contra_pct: 39.1, voto_remuneracion_contra_libre_pct: 47.1, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 22.84, fijo: 0.86, variable_corto: 1.73, variable_largo: 18.39, ratio_salario_medio: 220 },
    remuneracion: 'El fundador cobró 22,8 M USD en 2025 (3,5 M en 2024): 0,86 M de sueldo, 1,73 M de variable anual, 18,4 M en acciones y 1,86 M de otros (seguridad, avión privado con 75 horas de uso personal) [1]. El paquete especial de 2020, el «2020 CEO Performance Award», fue muy contestado y Richison renunció a él en febrero de 2024 (reversión de 117,5 M USD); en 2025 el comité de retribuciones diseñó un programa «alineado con el mercado» que incluye acciones con condiciones de mercado [1]. Las métricas más importantes son ingresos y EBITDA ajustado, no rentabilidad sobre capital ni flujo libre [1]. El voto consultivo de la junta de 2026 tuvo un 39,1 % en contra de los votos emitidos (47,1 % del capital libre, descontando las acciones del fundador), frente al 8,6 % de 2025 [2, 3]. Hay cláusula de recuperación (SOX 304) y el contrato del fundador no prevé pagos por cambio de control [1].',
    accionistas: [
      { nombre: 'Chad Richison (directo y Ernest Group)', pct: 12.4, tipo: 'Fundador', variacion: '≈13,1 % sobre 45,1 M de acciones tras las recompras, sin ventas [1, 8]' },
      { nombre: 'BlackRock', pct: 7.7, tipo: 'Institucional', variacion: '13G de enero de 2024 [1]' },
      { nombre: 'Harris Associates', pct: 6.7, tipo: 'Institucional', variacion: '13G de febrero de 2026 (entrada) [1]' },
      { nombre: 'Polen Capital Management', pct: 6.0, tipo: 'Institucional', variacion: '13G/A de julio de 2025 [1]' },
      { nombre: 'Autocartera', pct: 30.8, tipo: 'Autocartera', variacion: '19,7 M de acciones en autocartera sobre 64,0 M emitidas a 30-jun-2026 [12]' },
    ],
    insiders: [
      { fecha: '2026-08-27', persona: 'Shane Hadlock (presidente)', operacion: 'Venta', acciones: 2818, importe: 0.67 },
      { fecha: '2026-05-18', persona: 'Randy Peck (director de operaciones)', operacion: 'Venta', acciones: 2500, importe: 0.35 },
      { fecha: '2025-12-10', persona: 'Robert D. Foster (director financiero)', operacion: 'Venta', acciones: 1300, importe: 0.21 },
      { fecha: '2025-12-05', persona: 'Randy Peck (director de operaciones)', operacion: 'Venta', acciones: 2192, importe: 0.36 },
    ],
    control_y_defensas: 'No hay accionista de control: el fundador tiene ~13 %, una sola clase de acciones [1]. Pero hay defensas: consejo escalonado en tres clases con mandatos de tres años (que la empresa defiende por «estabilidad»), presidente y consejero delegado en la misma persona y un consejo que en julio de 2026 pasó de 6 a 8 miembros con dos antiguos directivos de la casa (el exdirector financiero Craig Boelte, que dejó el cargo en febrero de 2025 y no es independiente, y el exdirector de sistemas William Kerber) [1, 4]. Operación vinculada: Paycom pagó 1,7 M USD en 2025 a una sociedad del fundador que organiza un torneo universitario de lucha, por el patrocinio principal [1]. Elección por mayoría en elecciones no disputadas [1].',
    alertas: [
      'Voto en contra del 39,1 % a la remuneración y del 36,4 % a la reelección de la consejera Turney en la junta de 2026 [2].',
      'Consejo ampliado en julio de 2026 con dos antiguos directivos, uno de ellos (Boelte) demandado junto al fundador en la demanda colectiva de 2023 [4, 9].',
      'Pago de 1,7 M USD a una sociedad del fundador (patrocinio de un torneo de lucha) [1].',
      'Rotación alta de la alta dirección en 2025-2026 (director financiero, presidente, director comercial, director de sistemas) [1, 5, 6].',
    ],
    confianza: 'Alta',
  },
  fuentes: fC,
  huecos: [{ seccion: 'gobierno', campo: 'consejo.desde', tipo: 'Complemento', intentos: '1) proxy 2026 (las biografías del consejo no traen el año en el texto extraído); 2) 8-K de nombramientos; 3) web de gobierno corporativo de Paycom', decision: 'Omitido' }],
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de PAYC, SPY e IGV', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/PAYC/history/' },
  { id: 2, titulo: 'Paycom Software, Inc.: previsiones financieras', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://www.marketscreener.com/quote/stock/PAYCOM-SOFTWARE-INC-16253048/finances/' },
  { id: 3, titulo: 'Paycom Software, Inc.: consenso de analistas', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-15', url: 'https://www.marketscreener.com/quote/stock/PAYCOM-SOFTWARE-INC-16253048/consensus/' },
  { id: 4, titulo: 'Paycom Software (PAYC) Stock Forecast & Price Target', editor: 'Stock Analysis', tipo: 'Analistas', fecha: '2026-10-13', url: 'https://stockanalysis.com/stocks/payc/forecast/' },
  { id: 5, titulo: 'Market Yield on U.S. Treasury Securities at 10-Year Constant Maturity (DGS10)', editor: 'Federal Reserve Bank of St. Louis (FRED)', tipo: 'Datos de mercado', fecha: '2026-10-13', url: 'https://fred.stlouisfed.org/series/DGS10' },
  { id: 6, titulo: 'Implied ERP by month (ERPbymonth.xlsx)', editor: 'Aswath Damodaran, NYU Stern', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 7, titulo: 'Form 10-Q del segundo trimestre de 2026 (acciones en circulación a 28-jul-2026)', editor: 'Paycom Software, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-08-06', url: `${SEC}/000119312526338010/payc-20260630.htm` },
  { id: 8, titulo: 'Paycom Software, Inc. Reports Second Quarter 2026 Results (anexo 99.1 del 8-K)', editor: 'Paycom Software, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-08-05', url: `${SEC}/000119312526335105/payc-ex99_1.htm` },
  { id: 9, titulo: 'Informe value de Paychex (corte 12-oct-2026): comparables y transacciones de HCM y nóminas', editor: 'Repositorio analisis-inversion (informes/paychex-2026-10-12)', tipo: 'Analistas', fecha: '2026-10-12', url: 'https://github.com/' },
  { id: 10, titulo: 'Cotizaciones de cierre del 9 y 14-oct-2026 de ADP, PCTY, WDAY, INTU, TNET y PAYX', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/' },
  { id: 11, titulo: 'Automatic Data Processing, Inc.: previsiones financieras', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-12', url: 'https://www.marketscreener.com/quote/stock/AUTOMATIC-DATA-PROCESSING-11713/finances/' },
  { id: 12, titulo: 'Paylocity Holding Corporation: previsiones financieras', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-12', url: 'https://www.marketscreener.com/quote/stock/PAYLOCITY-HOLDING-CORPORA-16043784/finances/' },
  { id: 13, titulo: 'Workday Inc.: previsiones financieras', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-12', url: 'https://www.marketscreener.com/quote/stock/WORKDAY-INC-37866670/finances/' },
  { id: 14, titulo: 'TriNet Group, Inc.: previsiones financieras', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-12', url: 'https://www.marketscreener.com/quote/stock/TRINET-GROUP-INC-16113711/finances/' },
  { id: 15, titulo: 'Intuit Inc.: previsiones financieras', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-10', url: 'https://www.marketscreener.com/quote/stock/INTUIT-INC-23277275/finances/' },
  { id: 16, titulo: 'Paychex to Acquire Paycor (anexo 99.1 del 8-K)', editor: 'Paychex, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2025-01-07', url: 'https://www.sec.gov/Archives/edgar/data/723531/000095010325000267/dp223210_ex9901.htm' },
  { id: 17, titulo: 'Dayforce Enters into US$12.3 Billion Definitive Agreement with Thoma Bravo (anexo 99.1 del 8-K)', editor: 'Dayforce, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2025-08-21', url: 'https://www.sec.gov/Archives/edgar/data/1725057/000119312525184632/d949165dex991.htm' },
  { id: 18, titulo: 'Dayforce, Inc.: proxy definitivo de la fusión (DEFM14A), con la opinión de Evercore', editor: 'Dayforce, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2025-09-29', url: 'https://www.sec.gov/Archives/edgar/data/1725057/000114036125036413/ny20054883x2_defm14a.htm' },
  { id: 19, titulo: 'Ultimate Software to Be Acquired by Investor Group Led by Hellman & Friedman (anexo 99.1 del 8-K)', editor: 'Ultimate Software Group (SEC EDGAR)', tipo: 'Primaria', fecha: '2019-02-04', url: 'https://www.sec.gov/Archives/edgar/data/1016125/000089968119000030/p19-0028_ex991.htm' },
  { id: 20, titulo: 'Form 10-Q del trimestre cerrado el 31-dic-2024 (compra de WorkForce Software)', editor: 'Automatic Data Processing, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2025-01-29', url: 'https://www.sec.gov/Archives/edgar/data/8670/000000867025000007/adp-20241231.htm' },
];

// Comparables: los del informe de Paychex (cierre 9-oct-2026), llevados al 14-oct con la variación del precio; Paychex con su propio informe.
const precios = { ADP: [270.88, 280.32], PCTY: [153.96, 159.10], WDAY: [186.59, 188.77], INTU: [302.75, 310.44], TNET: [65.45, 67.06], PAYX: [103.98, 108.37] };
const PX = JSON.parse(fs.readFileSync(path.join(dir, '..', '..', 'paychex-2026-10-12', 'notas', 'D.json'), 'utf8'));
const dnPrev = { ADP: 873, PCTY: -191, WDAY: -2456, TNET: 608, INTU: null };
const r1 = (x) => Math.round(x * 10) / 10;
const r2 = (x) => Math.round(x * 100) / 100;
const comps = PX.comparables.empresas.filter((e) => ['ADP', 'PCTY', 'WDAY', 'INTU', 'TNET'].includes(e.ticker)).map((e) => {
  const f = precios[e.ticker][1] / precios[e.ticker][0];
  const cap = Math.round(e.capitalizacion * f);
  const evOld = e.ev_ventas && e.ev_ebitda_ltm ? null : null;
  const dn = dnPrev[e.ticker] ?? (e.dn_ebitda != null && e.ev_ebitda_ltm ? 0 : 0);
  const evViejo = e.capitalizacion + dn;
  const g = (cap + dn) / evViejo;
  return { ...e, nombre: e.nombre === 'Paycom Software' ? e.nombre : e.nombre, capitalizacion: cap,
    ev_ventas: r2(e.ev_ventas * g), ev_ebitda_ltm: r1(e.ev_ebitda_ltm * g), ev_ebitda_ntm: r1(e.ev_ebitda_ntm * g), per_ntm: r1(e.per_ntm * f), fcf_yield_pct: r1(e.fcf_yield_pct / f) };
});
const fx = precios.PAYX[1] / precios.PAYX[0];
comps.push({ nombre: 'Paychex', ticker: 'PAYX', pais: 'US', capitalizacion: Math.round(37100 * fx), ev_ventas: r2((37100 * fx + 3624) / 6603), ev_ebitda_ltm: r1((37100 * fx + 3624) / 3078), ev_ebitda_ntm: r1((37100 * fx + 3624) / 3313), per_ntm: r1(108.37 / 5.69), crecimiento_pct: 6.0, margen_ebitda_pct: 46.6, roic_pct: 26.8, dn_ebitda: 1.2, fcf_yield_pct: r1(5.3 / fx) });

const D = {
  identificacion: {
    nombre: 'Paycom Software, Inc.', nombre_corto: 'Paycom', ticker: 'PAYC', isin: 'US70432V1026', mercado: 'New York Stock Exchange', indice_referencia: 'S&P 500 (SPY)',
    pais: 'Estados Unidos', pais_iso: 'US', sector: 'Industria', industria: 'Servicios profesionales: proceso de nóminas y RR. HH. (software HCM)', sede: 'Oklahoma City (Oklahoma)', fundacion: '1998', empleados: 5770, web: 'https://www.paycom.com',
    precio: BOLSA.identificacion.precio, fecha_precio: BOLSA.identificacion.fecha_precio, acciones: 45.1, capitalizacion_publicada: null, free_float_pct: 86.8,
    max_52s: BOLSA.identificacion.max_52s, min_52s: BOLSA.identificacion.min_52s, volumen_medio_diario: '≈ 161 M USD/día (3 meses) [1]', proximos_resultados: '2026-11-04',
  },
  consenso: {
    guidance: 'Guía de 2026 elevada el 5-ago-2026: ingresos de 2.197-2.212 M USD (+7-8 %), recurrentes +8-9 %, intereses de los fondos de clientes de ~105 M (con los tipos de agosto) y EBITDA ajustado de 1.007-1.022 M (margen del ~46 %) [8]. En la conferencia: flujo libre de más de 650 M, capex de ~6 % de las ventas, tipo GAAP del 29 % y pagos en acciones del 3 % de las ventas [8]. No hay objetivos a medio plazo publicados; la dirección habla de «menos del 5 %» del mercado servido [8].',
    estimaciones: [
      { periodo: '2026e', ingresos: 2209, ebitda: 1014, ebit: 805.2, bpa: 10.68, dpa: 1.47, fuente: 'MarketScreener, 21 analistas [2]' },
      { periodo: '2027e', ingresos: 2374, ebitda: 1107, ebit: 885.4, bpa: 12.24, dpa: 1.5, fuente: 'MarketScreener [2]' },
      { periodo: '2028e', ingresos: 2561, ebitda: 1221, ebit: 992.7, bpa: 13.92, dpa: 1.51, fuente: 'MarketScreener [2]' },
    ],
    recomendaciones: { n_analistas: 21, comprar: 6, mantener: 13, vender: 2, po_medio: 222.59, po_min: 160, po_max: 286 },
    revisiones: 'Fuerte subida tras el 2T26: JP Morgan elevó su objetivo de 140 a 264 USD en agosto, KeyBanc de 270 a 280 en septiembre y Barclays de 210 a 250 el 12-oct; Bank of America empezó con Vender (200 USD) el 29-sep y Citi mantiene 194 USD [4]. El BPA ajustado de 2026 del consenso (12,10 USD en Stock Analysis) crece un 30,9 % por la recompra [4]. El BPA de MarketScreener (10,68 USD en 2026) es GAAP, el de Stock Analysis ajustado (sin pagos en acciones): una diferencia de ~1,4 USD [2, 4]. El EBITDA del consenso es el ajustado (sin pagos en acciones).',
    base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: 3.0,
    confianza: 'Media',
  },
  bolsa: {
    ...BOLSA.bolsa,
    posicion_corta_pct: null,
    comentario: 'La acción vivió dos ciclos opuestos. Hasta 2021 multiplicó su valor (+116 % en 2019, +71 % en 2020) como empresa que crecía al 25-30 %; de noviembre de 2021 a abril de 2026 perdió un 79 % por el freno del crecimiento, la canibalización de Beti (−38 % el 1-nov-2023) y el miedo a la IA en el software (mínimo de 104,90 USD el 12-feb-2026, tras la caída general del software del 3-feb) [1]. Desde abril ha subido más del 100 %: la recompra del 20 % del capital a 114-140 USD y unos resultados del 2T26 por encima de lo previsto (+31 % en la semana del 3-ago) [1, 8]. En el año, +51,0 % frente al +13,7 % del S&P 500 y al +1,9 % del ETF de software IGV [1].',
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: BOLSA.cierres_ejercicio.map((c) => ({ anio: c.anio, precio_cierre: c.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: ['2019', '2020', '2021'].includes(c.anio) })),
    comentario: 'Entre 2016 y 2021 Paycom cotizó a 30-130 veces el beneficio del año siguiente porque crecía al 25-30 % con tipos cero; 2019-2021 se excluyen como años de burbuja. Desde 2022 el PER adelantado cayó de 52,8x a 29,2x (2023), 26,9x (2024) y 14,9x (2025), al frenarse el crecimiento a un dígito alto y por el miedo a la IA [1]. Hoy, a 239 USD, cotiza a unas 19 veces nuestro BPA de 2027: por encima del mínimo de 2025 y por debajo de cualquier otro año. El cambio es estructural (de empresa de crecimiento a software maduro que recompra), no solo de tipos.',
    confianza: 'Alta',
  },
  comparables: {
    criterio: 'Seis cotizadas de EE. UU. de nóminas, HCM y software de gestión para empresas: ADP y Paychex (nóminas con fondos de clientes, como Paycom), Paylocity (el rival más parecido, en empresas medianas), Workday (HCM para grandes empresas), Intuit (QuickBooks Payroll) y TriNet (PEO). Son los del informe de Paychex del 12-oct, con los múltiplos al cierre del 9-oct llevados al 14-oct con la variación de cada precio [9, 10]. Insperity queda fuera (margen EBITDA del 1 %). Dayforce dejó de cotizar en 2026 y va en transacciones [17].',
    empresas: comps,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2025-08', objetivo: 'Dayforce', comprador: 'Thoma Bravo', ev: 12300, ev_ventas: 6.32, ev_ebitda: 19.8, prima_pct: 32.0, excluir: false, comentario: 'EBITDA ajustado de la guía de 2025 (sin pagos en acciones); cerrada en febrero de 2026 [17, 18].' },
      { fecha: '2025-01', objetivo: 'Paycor HCM', comprador: 'Paychex', ev: 4100, ev_ventas: 6.31, ev_ebitda: null, prima_pct: 19.0, excluir: false, comentario: 'Rival directo de Paycom en empresas medianas [16].' },
      { fecha: '2024-10', objetivo: 'WorkForce Software', comprador: 'ADP', ev: 1173, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Sin ingresos publicados [20].' },
      { fecha: '2019-02', objetivo: 'Ultimate Software', comprador: 'Consorcio de Hellman & Friedman', ev: 11000, ev_ventas: 10.0, ev_ebitda: null, prima_pct: 32.0, excluir: false, comentario: 'EV/ventas sobre «más de 1.100 M» de ingresos de 2018 [19].' },
    ],
    comentario: 'Las dos compras de HCM de 2025 se pagaron a unas 6,3 veces las ventas, con primas del 32 % (Dayforce) y del 19 % (Paycor) [16, 17]. La opinión de Evercore para Dayforce da una mediana de 19,1 veces el EBITDA ajustado de las transacciones de HCM desde 2019 [18]. Paycom vale hoy unas 5,4 veces sus ventas de los últimos 12 meses: por debajo de esos precios de control. Una compra es poco probable mientras el fundador, con el 13 % y el consejo escalonado, siga al mando.',
    confianza: 'Media',
  },
  valoracion: {
    puente: { fecha: '2026-06-30', deuda_financiera: 900, arrendamientos: 0, caja: 198.0, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 0 },
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERP (T12m with sustainable payout) [6]' },
  },
  fuentes: fD,
  huecos: [
    { seccion: 'bolsa', campo: 'posicion_corta_pct', tipo: 'Complemento', intentos: '1) FINRA (datos quincenales, no accesibles sin registro); 2) Stock Analysis (estadísticas); 3) MarketScreener', decision: 'Omitido' },
    { seccion: 'identificacion', campo: 'proximos_resultados', tipo: 'Complemento', intentos: '1) web de inversores de Paycom (sin anuncio a 15-oct); 2) calendario de AJ Bell (5-nov-2026, estimado); 3) patrón de 2025 (5-nov, tras el cierre)', decision: 'Calculado y marcado como estimación' },
  ],
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Stocktwits: flujo de mensajes de $PAYC (30 últimos, ago-oct 2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-14', url: 'https://stocktwits.com/symbol/PAYC' },
  { id: 2, titulo: 'Seeking Alpha: análisis y noticias de PAYC (feed, may-sep 2026)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-09-18', url: 'https://seekingalpha.com/symbol/PAYC' },
  { id: 3, titulo: 'Paycom Software cuts more than 500 jobs from Oklahoma City headquarters (y comentarios locales)', editor: 'FOX23 / The Lost Ogle', tipo: 'Foros y redes', fecha: '2025-10-01', url: 'https://www.thelostogle.com/2025/10/01/paycom-embarks-on-yet-another-employee-purge' },
];
const E = {
  sentimiento: {
    tono: 'Positivo', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Stocktwits ($PAYC)', fecha: '2026-10', n_comentarios: 30, tono: 'Positivo', resumen: 'Nueve mensajes alcistas por dos bajistas: celebran la subida de más del 100 % desde el mínimo y la «ruptura» técnica; uno avisa de que el empleo de septiembre fue débil y que Paycom cobra por empleado [1].' },
      { plataforma: 'Seeking Alpha (autores)', fecha: '2026-09', n_comentarios: 12, tono: 'Dividido', resumen: 'De «oportunidad tras la venta masiva» (febrero) y «bono con acciones» (junio) a una rebaja a mantener tras el 2T26 («buen resultado, pero subió demasiado rápido») y un «recuperación con más por venir» en septiembre [2].' },
      { plataforma: 'Prensa local y comentarios (Oklahoma City)', fecha: '2025-10', n_comentarios: 20, tono: 'Negativo', resumen: 'Críticas a los ~500 despidos presentados como sustitución por IA y a las cláusulas de no desprestigio; empleados que niegan que fueran puestos sin contacto con clientes (más de tres meses: contexto) [3].' },
    ],
    temas: [
      { tema: 'Recompra y beneficio por acción', postura: 'Alcista', peso: 'Alto', contraste: 'Correcto: el 20 % de las acciones recompradas a ~127 USD sube el BPA de 2026 un ~25-30 % [1, 2].' },
      { tema: 'La IA como amenaza para el software', postura: 'Dividida', peso: 'Alto', contraste: 'Exagerado a corto: la retención sube al 91 % y la IA está bajando los costes de Paycom; el riesgo real es la plantilla de los clientes y el precio a 3-5 años [1, 2].' },
      { tema: 'Valoración tras la subida', postura: 'Dividida', peso: 'Medio', contraste: 'Con 239 USD cotiza a ~19x nuestro BPA de 2027; el consenso de analistas (222,59 USD) queda por debajo del precio [1, 2].' },
      { tema: 'Empleo y ciclo', postura: 'Bajista', peso: 'Bajo', contraste: 'Relevante: Paycom cobra por empleado y el empleo privado creció un 0,4 % en 2025; la dirección ve el empleo de sus clientes «estable» [1].' },
    ],
    lectura: 'El sentimiento ha girado de la capitulación de febrero a un optimismo de impulso: los particulares celebran la subida y los autores de Seeking Alpha se dividen sobre si queda recorrido [1, 2]. No es euforia extrema (los analistas siguen mayoritariamente en mantener y el objetivo medio está por debajo del precio), pero el foro mira el precio y la recompra, no la tasa de crecimiento de los ingresos recurrentes, que es la variable que decide. El único riesgo que el foro señala y conviene vigilar es el empleo de los clientes; el de la IA lo discute en abstracto.',
    confianza: 'Baja',
  },
  fuentes: fE,
  huecos: [],
};
guarda('E', E);
console.log('Notas A-E escritas. Comparables:', comps.map((c) => `${c.ticker} ${c.per_ntm}`).join(', '));
