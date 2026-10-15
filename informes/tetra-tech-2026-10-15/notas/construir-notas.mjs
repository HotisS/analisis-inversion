// Escribe las notas A-E de Tetra Tech (TTEK, corte 2026-10-15) desde los documentos de notas/docs (EDGAR),
// el XBRL de la SEC (cuentas-xbrl.json), bolsa.json (Yahoo), form4.json y páginas web leídas el 15-oct-2026.
// Cada nota cita solo con [n] de su propia lista. Ejecutar: node informes/tetra-tech-2026-10-15/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const bolsa = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const xbrl = JSON.parse(fs.readFileSync(path.join(dir, 'cuentas-xbrl.json'), 'utf8'));
const E = 'https://www.sec.gov/Archives/edgar/data/831641/';
const r1 = (x) => Math.round(x * 10) / 10;
const r3 = (x) => Math.round(x * 1000) / 1000;

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Form 10-K del ejercicio cerrado el 28-sep-2025 (negocio, clientes, contratos, riesgos, notas)', editor: 'Tetra Tech, Inc.', tipo: 'Primaria', fecha: '2025-11-20', url: E + '000083164125000032/ttek-20250928.htm' },
  { id: 2, titulo: 'Form 10-Q del 3T del ejercicio 2026 (trimestre a 28-jun-2026; clientes, segmentos, compras, deuda, litigios)', editor: 'Tetra Tech, Inc.', tipo: 'Primaria', fecha: '2026-07-31', url: E + '000083164126000017/ttek-20260628.htm' },
  { id: 3, titulo: 'Nota de resultados del 3T del ejercicio 2026 (Exhibit 99.1; cuenta, balance, flujos, ingresos netos por segmento, EBITDA ajustado)', editor: 'Tetra Tech', tipo: 'Primaria', fecha: '2026-07-29', url: E + '000110465926088213/tm2621536d1_ex99-1.htm' },
  { id: 4, titulo: 'Nota de resultados del 2T del ejercicio 2026', editor: 'Tetra Tech', tipo: 'Primaria', fecha: '2026-04-29', url: E + '000110465926051486/tm2613029d1_ex99-1.htm' },
  { id: 5, titulo: 'Nota de resultados del 1T del ejercicio 2026', editor: 'Tetra Tech', tipo: 'Primaria', fecha: '2026-01-28', url: E + '000110465926007481/tm264341d1_ex99-1.htm' },
  { id: 6, titulo: 'Nota de resultados del 4T y del ejercicio 2025 (guía 2026)', editor: 'Tetra Tech', tipo: 'Primaria', fecha: '2025-11-12', url: E + '000110465925110537/tm2530975d1_ex99-1.htm' },
  { id: 7, titulo: 'Nota de resultados del 4T y del ejercicio 2024 (trimestres de FY2023-FY2024)', editor: 'Tetra Tech', tipo: 'Primaria', fecha: '2024-11-13', url: E + '000110465924117683/tm2428315d1_ex99-1.htm' },
  { id: 8, titulo: 'Notas de resultados del 1T, 2T y 3T del ejercicio 2025 (USAID, deterioro del fondo de comercio, guía)', editor: 'Tetra Tech', tipo: 'Primaria', fecha: '2025-07-30', url: E + '000110465925072237/tm2522044d1_ex99-1.htm' },
  { id: 9, titulo: 'Notas de resultados anuales de FY2017-FY2022 (BPA ajustado, partidas no recurrentes)', editor: 'Tetra Tech', tipo: 'Primaria', fecha: '2022-11-09', url: E + '000110465922116502/tm2230107d1_ex99-1.htm' },
  { id: 10, titulo: 'Hechos XBRL de la SEC (companyfacts) de Tetra Tech, FY2016-FY2025', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0000831641.json' },
  { id: 11, titulo: 'Ampliación del programa de recompra en 500 M (8-K)', editor: 'Tetra Tech', tipo: 'Primaria', fecha: '2026-09-10', url: E + '000110465926106564/tm2625143d1_ex99-1.htm' },
];

const DIV = { '2017': 5, '2018': 5, '2019': 5, '2020': 5, '2021': 5 }; // split 5:1 de feb-2024: años sin reexpresar en el XBRL
// No recurrentes dentro del EBITDA publicado (positivo = gasto): EBITDA ajustado de la empresa − EBIT − amortizaciones del XBRL.
// FY2017 RCM 14,7 y ganancia de earn-out −6,9; FY2018 earn-out 5,8, RCM 17,0, ventas no estratégicas 3,4; FY2019 earn-out 3,1, RCM 19,6,
// salidas no estratégicas 18,7 (con deterioro 7,8), compra de WYG 10,4; FY2020 deterioro 15,8, COVID 8,2, earn-out −13,4 (neto con definiciones ≈2,1);
// FY2021-22 ganancias de earn-out; FY2023 compra de RPS 49,6 (con 16,4 de alquileres) y earn-out 12,3; FY2024 earn-out 2,5 y compra 7,1;
// FY2025 litigio de Hunters Point 115,0 + deterioro del fondo de comercio de USAID 92,4 − earn-out 12,2.
const NR = { '2017': 7.8, '2018': 26.2, '2019': 51.6, '2020': 2.1, '2021': -3.3, '2022': -6.4, '2023': 61.8, '2024': 9.7, '2025': 195.0 };
const GP = { '2017': 353.6, '2018': 384.5, '2019': 408.2, '2020': 446.5, '2021': 498.4, '2022': 575.6, '2023': 725.0, '2024': 866.4, '2025': 961.3 };
const anios = ['2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'];
const cX = Object.fromEntries(xbrl.financieros.cuenta.map((c) => [c.periodo, c]));
const bX = Object.fromEntries(xbrl.balance.historico.map((c) => [c.periodo, c]));
const fX = Object.fromEntries(xbrl.flujos.historico.map((c) => [c.periodo, c]));

const cuenta = anios.map((a) => {
  const c = cX[a]; const d = DIV[a] ?? 1;
  return {
    periodo: 'FY' + a, ingresos: c.ingresos, coste_ventas: r1(c.ingresos - GP[a]),
    // Gastos generales = beneficio bruto − EBIT − partidas no recurrentes de explotación (el XBRL no da la línea de G&A)
    gastos_generales: r1(GP[a] - c.ebit - Math.max(0, NR[a] ?? 0)),
    ebitda: c.ebitda, amortizaciones: c.amortizaciones, ebit: c.ebit, resultado_financiero: c.resultado_financiero, bai: c.bai,
    impuestos: c.impuestos, minoritarios: c.minoritarios, beneficio_neto: c.beneficio_neto, gastos_financieros: c.gastos_financieros,
    participadas_en_ebitda: null, no_recurrentes_en_ebitda: NR[a] ?? null,
    bpa: r3(c.bpa / d), dpa: r3(c.dpa / d), dpa_extraordinario: 0, acciones_diluidas: r1(c.acciones_diluidas * d),
  };
});
const balanceH = anios.map((a) => {
  const b = bX[a];
  return {
    periodo: 'FY' + a, activo_total: b.activo_total, activo_corriente: b.activo_corriente, pasivo_corriente: b.pasivo_corriente, pasivo_total: b.pasivo_total,
    fondo_comercio: b.fondo_comercio, intangibles: b.intangibles, inmovilizado_material: b.inmovilizado_material, existencias: 0, clientes: b.clientes, proveedores: b.proveedores,
    activos_contrato: b.activos_contrato ?? null, pasivos_contrato: b.pasivos_contrato ?? null, caja: b.caja, deuda_financiera: b.deuda_financiera, arrendamientos: 0,
    patrimonio_neto: b.patrimonio_neto, minoritarios: b.minoritarios, reservas: b.reservas,
  };
});
const flujosH = anios.map((a) => {
  const f = fX[a];
  return {
    periodo: 'FY' + a, flujo_operativo: f.flujo_operativo, capex: f.capex, pagos_arrendamientos: f.pagos_arrendamientos ?? 0, adquisiciones: f.adquisiciones ?? 0,
    desinversiones: f.desinversiones ?? 0, dividendos: f.dividendos, recompras: f.recompras, emision_acciones: f.emision_acciones, intereses_en_financiacion: 0,
  };
});

const A = {
  _estado: 'Completo. Cuenta, balance y flujos FY2017-FY2025 del XBRL de la SEC [10], comprobados con las notas de resultados (BPA, DPA y acciones de FY2017-FY2021 pasados a acciones de hoy por el split 5:1 de 2024). Trimestres y LTM a jun-2026 de las notas de resultados y el 10-Q.',
  negocio: {
    segmentos: [
      { nombre: 'GSG (Government Services Group)', descripcion: 'Consultoría e ingeniería para el Gobierno de EE. UU. (federal, estatal y local) y organismos de desarrollo: agua, medio ambiente, catástrofes, datos y TI federal [1].', tipo_resultado: null,
        historico: [{ periodo: 'FY2023', ingresos: 2300.7, resultado: null }, { periodo: 'FY2024', ingresos: 2624.2, resultado: null }, { periodo: 'FY2025', ingresos: 2828.6, resultado: null }] },
      { nombre: 'CIG (Commercial/International Services Group)', descripcion: 'Clientes comerciales de EE. UU. y clientes públicos y privados de Reino Unido, Australia, Canadá y Europa: agua, energía, infraestructuras, remediación [1].', tipo_resultado: null,
        historico: [{ periodo: 'FY2023', ingresos: 2292.7, resultado: null }, { periodo: 'FY2024', ingresos: 2634.4, resultado: null }, { periodo: 'FY2025', ingresos: 2680.2, resultado: null }] },
      { nombre: 'Eliminaciones', descripcion: 'Ventas entre segmentos.', tipo_resultado: null,
        historico: [{ periodo: 'FY2023', ingresos: -70.8, resultado: null }, { periodo: 'FY2024', ingresos: -59.9, resultado: null }, { periodo: 'FY2025', ingresos: -66.2, resultado: null }] },
    ],
    geografias: [
      { nombre: 'EE. UU.: Gobierno federal (incluye trabajos en el extranjero)', peso_pct: 31.6 },
      { nombre: 'EE. UU.: estados y municipios', peso_pct: 14.5 },
      { nombre: 'EE. UU.: clientes comerciales', peso_pct: 16.5 },
      { nombre: 'Internacional (sobre todo Australia, Canadá y Reino Unido)', peso_pct: 37.4 },
    ],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Cartera de pedidos (backlog)', valor_anterior: '4.140 M (sep-2025)', valor_actual: '4.490 M (jun-2026)', variacion: '+8,5 %', comentario: 'Récord dos trimestres seguidos; 2.100 M en GSG y 2.400 M en CIG [2].' },
      { kpi: 'Ingresos netos de subcontratas', valor_anterior: '3.454 M (9M FY2025)', valor_actual: '3.195 M (9M FY2026)', variacion: '−7,5 % (+8 % sin USAID/DOS ni catástrofes)', comentario: 'La medida que sigue la empresa: el trabajo de su propia plantilla [3].' },
      { kpi: 'Ingresos de USAID / Departamento de Estado', valor_anterior: '≈550 M (9M FY2025)', valor_actual: '≈190 M (9M FY2026)', variacion: '−65 %', comentario: 'Casi todos los contratos de USAID se cancelaron en feb-2025; queda Ucrania vía Estado [2].' },
      { kpi: 'Peso de los contratos a precio fijo', valor_anterior: '40,8 % (9M FY2025)', valor_actual: '48,0 % (9M FY2026)', variacion: '+7,2 pp', comentario: 'Sube con la salida de USAID (coste más margen); horas y materiales 43,2 %, coste más margen 8,8 % [2].' },
      { kpi: 'Margen EBITDA ajustado sobre ingresos netos', valor_anterior: '13,8 % (9M FY2025)', valor_actual: '14,6 % (9M FY2026)', variacion: '+0,8 pp', comentario: 'Objetivo del plan 2030: +50 pb al año [3].' },
      { kpi: 'Días de cobro (DSO)', valor_anterior: '55 (FY2024)', valor_actual: '56 (3T26)', variacion: '+1', comentario: 'Entre los más bajos del sector [3, 7].' },
    ],
    confianza: 'Alta',
  },
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-28', ingresos: 5069.5, ebitda: 668.8, ebit: 611.1, beneficio_neto: 435.9, bpa: 1.66, dpa: 0.274, dpa_extraordinario: 0, fcf: 539.0, participadas_en_ebitda: null, no_recurrentes_en_ebitda: -17.3 },
    cambios_perimetro: [{ periodo: 'FY2023', descripcion: 'RPS Group (Reino Unido), comprada en ene-2023 por ≈854 M en caja: consolidada desde el 2T23.' }],
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '4T24', ingresos: 1374.5, crecimiento_pct: 9.0, crecimiento_organico_pct: null, ebitda: 169.5, margen_ebitda_pct: 12.3, bpa: 0.35, vs_consenso: null },
      { periodo: '1T25', ingresos: 1420.6, crecimiento_pct: 15.7, crecimiento_organico_pct: null, ebitda: 153.2, margen_ebitda_pct: 10.8, bpa: 0.00, vs_consenso: null },
      { periodo: '2T25', ingresos: 1322.1, crecimiento_pct: 5.6, crecimiento_organico_pct: null, ebitda: 143.9, margen_ebitda_pct: 10.9, bpa: 0.02, vs_consenso: null },
      { periodo: '3T25', ingresos: 1369.8, crecimiento_pct: 1.9, crecimiento_organico_pct: null, ebitda: 178.6, margen_ebitda_pct: 13.0, bpa: 0.43, vs_consenso: null },
      { periodo: '4T25', ingresos: 1330.1, crecimiento_pct: -3.2, crecimiento_organico_pct: null, ebitda: 185.9, margen_ebitda_pct: 14.0, bpa: 0.48, vs_consenso: 'Superior' },
      { periodo: '1T26', ingresos: 1210.7, crecimiento_pct: -14.8, crecimiento_organico_pct: null, ebitda: 147.3, margen_ebitda_pct: 12.2, bpa: 0.40, vs_consenso: 'Superior' },
      { periodo: '2T26', ingresos: 1220.2, crecimiento_pct: -7.7, crecimiento_organico_pct: null, ebitda: 145.6, margen_ebitda_pct: 11.9, bpa: 0.36, vs_consenso: 'Superior' },
      { periodo: '3T26', ingresos: 1308.6, crecimiento_pct: -4.5, crecimiento_organico_pct: null, ebitda: 172.6, margen_ebitda_pct: 13.2, bpa: 0.42, vs_consenso: 'Superior' },
    ],
    confianza: 'Alta',
  },
  balance: {
    historico: balanceH,
    vencimientos: [{ anio: '2027', importe: 0 }, { anio: '2028', importe: 595 }, { anio: '2029', importe: 25 }, { anio: '2030', importe: 190 }],
    liquidez: 'Caja de 230,8 M y 564,3 M disponibles en la línea de crédito renovable (964,3 M de capacidad total con el acordeón) a 28-jun-2026 [2].',
    rating: 'Sin rating público (deuda bancaria garantizada y bonos convertibles sin calificación).',
    coste_deuda_pct: 3.6, vida_media_anios: 2.3,
    confianza: 'Alta',
  },
  flujos: { historico: flujosH, confianza: 'Alta' },
  calidad: { auditor: 'PricewaterhouseCoopers LLP', anios_auditor: 22, opinion: 'Favorable', confianza: 'Alta' },
  capital: {
    adquisiciones: [
      { anio: '2026', objetivo: 'Halvik (EE. UU., datos y ciberseguridad federal, 600 personas) y Providence (Australia, gestión de proyectos)', importe: 232, ev_ebitda: null, financiacion: 'Caja y línea de crédito; 39 M de earn-out (máximo 108 M)', resultado: 'Halvik aporta ≈85 M de ventas en 9M FY2026; fondo de comercio de 179 M [2].' },
      { anio: '2025', objetivo: 'Carron + Walsh (Irlanda) y SAGE Group (Australia, automatización)', importe: 147, ev_ebitda: null, financiacion: 'Caja; 43 M de earn-out (máximo 60 M)', resultado: 'Fondo de comercio de 122 M; CIG crece un 3 % sin ellas en 9M FY2026 [2].' },
      { anio: '2023', objetivo: 'RPS Group (Reino Unido, consultoría de agua, energía y medio ambiente)', importe: 854, ev_ebitda: 16.0, financiacion: 'Préstamo a plazo de 500 M y línea de crédito; refinanciado con 575 M de convertibles en ago-2023', resultado: 'Llevó la parte internacional al 37 % de las ventas; sin deterioros; base del crecimiento del agua en Reino Unido.' },
      { anio: '2023', objetivo: 'Amyx (EE. UU., TI y ciberseguridad federal, 500 personas)', importe: null, ev_ebitda: null, financiacion: 'Caja', resultado: 'Integrada en GSG [1].' },
      { anio: '2025', objetivo: 'Venta de la filial de Noruega', importe: -40, ev_ebitda: null, financiacion: 'Cobro de 40,3 M', resultado: 'Plusvalía de 12,4 M no gravada en el 1S26 [2].' },
    ],
    confianza: 'Alta',
  },
  fuentes: fA,
  huecos: [
    { seccion: 'negocio', campo: 'segmentos.resultado', tipo: 'Complemento', intentos: '1) 10-Q del 3T26: solo nueve meses del resultado de cada segmento con la segmentación nueva; 2) 10-K FY2025: segmentación anterior (no comparable); 3) notas de resultados: solo ingresos netos reexpresados', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Form 10-K FY2025: negocio, competidores, clientes, regulación', editor: 'Tetra Tech, Inc.', tipo: 'Primaria', fecha: '2025-11-20', url: E + '000083164125000032/ttek-20250928.htm' },
  { id: 2, titulo: '2026 Top 500 Design Firms (ingresos de diseño de 2025: 158.700 M, +7,4 %; Tetra Tech n.º 3)', editor: 'Engineering News-Record', tipo: 'Sectorial', fecha: '2026-04', url: 'https://enr.com/toplists/2026-top-500-design-firms-preview' },
  { id: 3, titulo: 'Las consultoras de ingeniería caen por el temor a la IA (WSP −23,1 %, Stantec −23,7 %; Jacobs, Aecom y Tetra Tech también)', editor: 'The Globe and Mail (vía Stockwatch/Canjex)', tipo: 'Prensa', fecha: '2026-05-19', url: 'https://www.stockwatch.com/News/Item/Z-C!STN-3822059/C/STN' },
  { id: 4, titulo: 'Estadísticas de Jacobs, AECOM, Stantec, WSP, Arcadis, Exponent, ICF y Sweco (márgenes, ROIC, múltiplos) a 14-oct-2026', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/j/statistics/' },
  { id: 5, titulo: 'Transcripción de la conferencia del 3T26 (IA, PFAS, centros de datos, Reino Unido AMP8, Australia, Canadá)', editor: 'Mitrade (transcripción)', tipo: 'Prensa', fecha: '2026-07-30', url: 'https://www.mitrade.com/insights/news/live-news/article-8-1978181-20260808' },
  { id: 6, titulo: 'Form 10-Q 3T26 (USAID, federal, estatal y local, comercial e internacional)', editor: 'Tetra Tech, Inc.', tipo: 'Primaria', fecha: '2026-07-31', url: E + '000083164126000017/ttek-20260628.htm' },
  { id: 7, titulo: 'Tetra Tech lanza su visión 2030 en su primer día del inversor (ingresos +10-15 % anual, 6-10 % orgánico; margen EBITDA +50 pb al año)', editor: 'Business Wire', tipo: 'Primaria', fecha: '2024-05-14', url: 'https://www.businesswire.com/news/home/20240514397225/en/Tetra-Tech-Launched-Its-2030-Vision-at-Its-Inaugural-Investor-Day' },
  { id: 8, titulo: 'Nota de resultados del 3T del ejercicio 2025 (USAID, Departamento de Estado)', editor: 'Tetra Tech', tipo: 'Primaria', fecha: '2025-07-30', url: E + '000110465925072237/tm2522044d1_ex99-1.htm' },
];
const B = {
  _estado: 'Completo con fuentes propias; ficha sectorial reutilizable en sectores/ (ver diario). Mercado: ENR Top 500 como tamaño de los servicios de diseño; la cuota es estimación propia.',
  historia: {
    hitos: [
      { anio: '1966', hito: 'Fundación de Tetra Tech en Pasadena como consultora de ingeniería del agua [1].' },
      { anio: '1991', hito: 'Salida a bolsa en el Nasdaq (TTEK).' },
      { anio: '2005', hito: 'Dan Batrack, en la empresa desde 1980, primer ejecutivo; presidente del consejo desde 2008 [1].' },
      { anio: '2016', hito: 'Compra de Coffey (Australia): base del negocio internacional en Asia-Pacífico.' },
      { anio: '2019', hito: 'Compra de WYG (Reino Unido) y salida de negocios no estratégicos de construcción [A9].' },
      { anio: '2023', hito: 'Compra de RPS Group (Reino Unido) por ≈854 M, tras superar la oferta de WSP; la parte internacional sube al 37 % de las ventas [1].' },
      { anio: '2024', hito: 'Split 5:1 y día del inversor con la visión 2030: ventas +10-15 % anual y margen EBITDA +50 pb al año [7].' },
      { anio: '2025', hito: 'Cancelación de casi todos los contratos de USAID (10,6 % de las ventas de FY2025); deterioro de 92,4 M; acuerdo de 97 M con el Gobierno por Hunters Point [6].' },
      { anio: '2026', hito: 'Roger Argus sustituye a Batrack como primer ejecutivo (feb-2026); compra de Halvik y Providence; recompra ampliada a 898 M [6].' },
    ],
    confianza: 'Media',
  },
  sector: {
    tamano: '≈158.700 M USD de ingresos de diseño de las 500 mayores firmas con sede en EE. UU. en 2025, +7,4 % [2]',
    unidad_serie: 'millones de USD (ingresos de diseño, ENR Top 500)',
    serie: [{ anio: '2024', tamano: 147800 }, { anio: '2025', tamano: 158700 }],
    tcac_historico_pct: null, tcac_previsto_pct: 5.0, cr5_pct: null, estructura: 'Fragmentada',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 2.9,
    competidores: [
      { nombre: 'Jacobs Solutions', pais: 'EE. UU.', ticker: 'J', ingresos: 14230, cuota_pct: null, margen_ebit_pct: 5.9, comentario: 'N.º 1 del ENR; agua, infraestructuras y consultoría (PA Consulting) [2, 4].' },
      { nombre: 'AECOM', pais: 'EE. UU.', ticker: 'ACM', ingresos: 15330, cuota_pct: null, margen_ebit_pct: 4.7, comentario: 'N.º 2 del ENR; transporte, agua y gestión de programas [4].' },
      { nombre: 'WSP Global', pais: 'Canadá', ticker: 'WSP', ingresos: 13590, cuota_pct: null, margen_ebit_pct: 10.3, comentario: 'Comprador en serie (Golder, POWER Engineers); perdió RPS frente a Tetra Tech [4].' },
      { nombre: 'Stantec', pais: 'Canadá', ticker: 'STN', ingresos: 4810, cuota_pct: null, margen_ebit_pct: 12.3, comentario: 'Agua y edificación en Norteamérica y Reino Unido [4].' },
      { nombre: 'Arcadis', pais: 'Países Bajos', ticker: 'ARCAD', ingresos: 5460, cuota_pct: null, margen_ebit_pct: 6.6, comentario: 'Agua y resiliencia en Europa y EE. UU. [4].' },
      { nombre: 'Sweco', pais: 'Suecia', ticker: 'SWEC B', ingresos: 3250, cuota_pct: null, margen_ebit_pct: 11.0, comentario: 'Ingeniería y arquitectura en el norte de Europa [4].' },
    ],
    confianza: 'Media',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'sector', campo: 'cr5_pct', tipo: 'Complemento', intentos: '1) ENR Top 500 (solo ranking y total); 2) informes anuales de los cinco primeros (ingresos totales, no de diseño en EE. UU.); 3) estimación propia descartada por mezclar perímetros', decision: 'Omitido' },
    { seccion: 'sector', campo: 'tcac_historico_pct', tipo: 'Complemento', intentos: '1) ENR 2026 (solo el último año, +7,4 %); 2) series de ENR de años anteriores de pago; 3) EBI (Environmental Business International) de pago', decision: 'Omitido' },
  ],
};
// serie 2024 = 158.700 / 1,074 (crecimiento publicado por ENR)

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Proxy statement 2026 (DEF 14A): consejo, comisiones, remuneración, accionistas', editor: 'Tetra Tech, Inc.', tipo: 'Primaria', fecha: '2026-01-09', url: E + '000110465926002458/tm2533152-2_def14a.htm' },
  { id: 2, titulo: 'Form 10-K FY2025: directivos (Executive Officers of the Registrant)', editor: 'Tetra Tech, Inc.', tipo: 'Primaria', fecha: '2025-11-20', url: E + '000083164125000032/ttek-20250928.htm' },
  { id: 3, titulo: '8-K: Roger Argus será primer ejecutivo; Dan Batrack, presidente ejecutivo', editor: 'Tetra Tech', tipo: 'Primaria', fecha: '2026-01-06', url: E + '000110465926001352/tm262000d1_ex99-1.htm' },
  { id: 4, titulo: '8-K: resultados de la junta del 19-feb-2026 y nombramiento de Argus como consejero', editor: 'Tetra Tech', tipo: 'Primaria', fecha: '2026-02-20', url: E + '000110465926018205/tm266903d1_8k.htm' },
  { id: 5, titulo: 'Form 4 de consejeros y directivos (15-oct-2025 a 15-oct-2026), herramientas/form4.mjs', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000831641&type=4' },
  { id: 6, titulo: '8-K: nombramientos de Argus (presidente) y Weiss (CIG)', editor: 'Tetra Tech', tipo: 'Primaria', fecha: '2025-10-07', url: E + '000110465925097567/tm2528147d1_ex99-1.htm' },
  { id: 7, titulo: '8-K: M. Susan Hardwick (ex CEO de American Water) entra en el consejo', editor: 'Tetra Tech', tipo: 'Primaria', fecha: '2025-12-22', url: E + '000110465925123764/tm2534127d1_ex99-1.htm' },
  { id: 8, titulo: '8-K: Eric W. Thornburg (ex CEO de H2O America) entra en el consejo', editor: 'Tetra Tech', tipo: 'Primaria', fecha: '2026-03-26', url: E + '000110465926035179/tm269832d1_ex99-1.htm' },
  { id: 9, titulo: 'Notas de resultados de FY2024 y FY2025 (guías anuales) y anuales de FY2021-FY2022', editor: 'Tetra Tech', tipo: 'Primaria', fecha: '2025-11-12', url: E + '000110465925110537/tm2530975d1_ex99-1.htm' },
  { id: 10, titulo: 'Form 10-Q del 3T26, nota 16 (Hunters Point: acuerdo de 97 M y reclamaciones de terceros)', editor: 'Tetra Tech, Inc.', tipo: 'Primaria', fecha: '2026-07-31', url: E + '000083164126000017/ttek-20260628.htm' },
];
const f4 = JSON.parse(fs.readFileSync(path.join(dir, 'form4.json'), 'utf8'));
const insiders = f4.operaciones.filter((o) => o.codigo === 'P' || o.codigo === 'S').map((o) => ({
  fecha: o.fecha, persona: o.persona.replace('CARTER BRIAN N', 'Brian N. Carter (contralor)').replace('Feeler Jeffrey R', 'Jeffrey R. Feeler (consejero)'),
  operacion: o.codigo === 'P' ? 'Compra' : 'Venta', acciones: o.acciones, importe: Math.round(o.importe / 1e4) / 100,
}));
const C = {
  _estado: 'Completo con el proxy de 2026, la junta de febrero y los Form 4.',
  directivos: {
    equipo: [
      { nombre: 'Roger R. Argus', cargo: 'Primer ejecutivo (desde feb-2026) y consejero', desde: '2026', participacion_pct: 0.02, trayectoria: 'Ingeniero químico, más de 30 años en Tetra Tech: presidente de GSG (2018-2024), de CIG (2023-2025) y de desarrollo corporativo (compras, entre ellas RPS) [2, 3].' },
      { nombre: 'Dan L. Batrack', cargo: 'Presidente ejecutivo del consejo (primer ejecutivo 2005-2026)', desde: '2005', participacion_pct: 0.13, trayectoria: 'En la empresa desde 1980; como primer ejecutivo llevó las ventas de ≈1.000 M a 5.400 M y la parte internacional al 37 %. Seguirá al menos dos años como presidente ejecutivo [2, 3].' },
      { nombre: 'Steven M. Burdick', cargo: 'Director financiero (EVP, CFO)', desde: '2011', participacion_pct: 0.06, trayectoria: 'En Tetra Tech desde 2003 (contralor 2004-2011); ex Ernst & Young. Caja de explotación superior al beneficio neto más de 20 años seguidos [2].' },
      { nombre: 'Jonathan S. Weiss', cargo: 'Presidente de CIG', desde: '2025', participacion_pct: null, trayectoria: 'Más de 30 años en la empresa; dirigió la práctica de energía [6].' },
      { nombre: 'Leslie Shoemaker', cargo: 'EVP, innovación y sostenibilidad (Tetra Tech Delta)', desde: '1991', participacion_pct: null, trayectoria: 'Modelos de datos del agua y software de suscripción; antes presidenta de la empresa [2].' },
      { nombre: 'Preston Hopson', cargo: 'EVP, jurídico y capital humano', desde: '2018', participacion_pct: null, trayectoria: 'Ex AECOM y O\'Melveny & Myers [2].' },
    ],
    historial_guidance: [
      { anio: 'FY2021', guia: 'BPA 3,30-3,50 USD (antes del split) [9]', real: 'BPA ajustado 3,79', cumplida: 'Sí' },
      { anio: 'FY2022', guia: 'BPA 4,00-4,20 USD (antes del split) [9]', real: 'BPA ajustado 4,50', cumplida: 'Sí' },
      { anio: 'FY2023', guia: 'BPA 4,70-4,90 USD (antes del split) sin RPS [9]', real: 'BPA ajustado ≈5,19 (1,04 tras el split), con RPS', cumplida: 'Sí' },
      { anio: 'FY2025', guia: 'Ingresos netos 4.565-4.765 M, BPA 1,40-1,50 (nov-2024) [9]', real: 'Ingresos netos 4.617 M; BPA ajustado 1,56 pese a USAID', cumplida: 'Sí' },
      { anio: 'FY2026', guia: 'Ingresos netos 4.050-4.250 M, BPA 1,40-1,55 (nov-2025) [9]', real: 'Guía subida tres veces: 4.315-4.365 M y BPA ajustado 1,56-1,59 (jul-2026)', cumplida: 'Sí' },
    ],
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      { nombre: 'Dan L. Batrack', cargo: 'Presidente ejecutivo', tipo: 'Ejecutivo', desde: '2005', comisiones: '—' },
      { nombre: 'Roger R. Argus', cargo: 'Consejero delegado', tipo: 'Ejecutivo', desde: '2026', comisiones: '—' },
      { nombre: 'Kirsten M. Volpi', cargo: 'Consejera independiente coordinadora (presiding director)', tipo: 'Independiente', desde: '2013', comisiones: 'Auditoría' },
      { nombre: 'Gary R. Birkenbeuel', cargo: 'Consejero', tipo: 'Independiente', desde: '2018', comisiones: 'Auditoría (presidente)' },
      { nombre: 'Prashant Gandhi', cargo: 'Consejero', tipo: 'Independiente', desde: '2022', comisiones: 'Nombramientos y gobierno (presidente)' },
      { nombre: 'Jeffrey R. Feeler', cargo: 'Consejero', tipo: 'Independiente', desde: '2025', comisiones: 'Auditoría' },
      { nombre: 'M. Susan Hardwick', cargo: 'Consejera', tipo: 'Independiente', desde: '2025', comisiones: 'Auditoría; nombramientos y gobierno' },
      { nombre: 'Eric W. Thornburg', cargo: 'Consejero', tipo: 'Independiente', desde: '2026', comisiones: 'Retribuciones; nombramientos y gobierno' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: true, consejero_coordinador: true, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 1,
    voto_remuneracion_pct: 92.2, voto_remuneracion_contra_pct: 7.3, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: 'FY2025', total: 11.62, fijo: 1.25, variable_corto: 2.51, variable_largo: 7.80, ratio_salario_medio: 133 },
    accionistas: [
      { nombre: 'The Vanguard Group', pct: 10.1, tipo: 'Gestora indexada', variacion: 'Estable (13G)' },
      { nombre: 'BlackRock', pct: 9.7, tipo: 'Gestora indexada', variacion: 'Estable (13G)' },
      { nombre: 'Consejeros y directivos (conjunto)', pct: 0.3, tipo: 'Insiders', variacion: 'Sin cambios relevantes' },
    ],
    insiders,
    alertas: [
      'Acuerdo de 97 M con el Gobierno de EE. UU. (Ley de Reclamaciones Falsas y CERCLA) por la descontaminación de Hunters Point, con reclamaciones de terceros abiertas (provisión de 18 M) [10].',
      'Venta de 401.000 USD del contralor (feb-2026, a 40,2 USD) y compra de 50.000 USD de un consejero (may-2026, a 26,4 USD): importes pequeños [5].',
    ],
    confianza: 'Alta',
  },
  fuentes: fC,
  huecos: [],
};

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de TTEK, SPY y XLI (precio, rango, volumen, rentabilidades, beta, cierres de ejercicio), herramientas/bolsa.mjs', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/TTEK/history' },
  { id: 2, titulo: 'Tetra Tech: estimaciones anuales FY2026-FY2028 (ingresos netos, EBITDA ajustado, BPA, DPA)', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-14', url: 'https://uk.marketscreener.com/quote/stock/TETRA-TECH-INC-11172/finances/' },
  { id: 3, titulo: 'Tetra Tech: consenso (8 analistas, objetivo medio 40,33 USD, 36-46) y cambios de recomendación', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-14', url: 'https://uk.marketscreener.com/quote/stock/TETRA-TECH-INC-11172/consensus/' },
  { id: 4, titulo: 'Estadísticas de Tetra Tech (EV, ROIC, PER adelantado, posición corta 4,67 %)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/ttek/statistics/' },
  { id: 5, titulo: 'Estadísticas de Jacobs (J)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/j/statistics/' },
  { id: 6, titulo: 'Estadísticas de AECOM (ACM)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/acm/statistics/' },
  { id: 7, titulo: 'Estadísticas de Stantec (STN)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/stn/statistics/' },
  { id: 8, titulo: 'Estadísticas de WSP Global (WSP, TSX)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/quote/tsx/WSP/statistics/' },
  { id: 9, titulo: 'Estadísticas de Arcadis (ARCAD, Euronext Ámsterdam)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/quote/ams/ARCAD/statistics/' },
  { id: 10, titulo: 'Estadísticas de Exponent (EXPO)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/expo/statistics/' },
  { id: 11, titulo: 'Estadísticas de ICF International (ICFI)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/icfi/statistics/' },
  { id: 12, titulo: 'Estadísticas de Sweco (SWEC B, Nasdaq Estocolmo)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/quote/sto/SWEC.B/statistics/' },
  { id: 13, titulo: 'Previsiones de ingresos de los comparables (próximo ejercicio)', editor: 'Stock Analysis', tipo: 'Analistas', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/j/forecast/' },
  { id: 14, titulo: 'Tipos de cambio de referencia del 14-oct-2026 (USD 1,1195; CAD 1,5918; SEK 11,1580 por EUR)', editor: 'Banco Central Europeo', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml' },
  { id: 15, titulo: 'Curva de rendimientos del Tesoro de EE. UU.: bono a 10 años 5,19 % el 14-oct-2026', editor: 'U.S. Department of the Treasury', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/daily-treasury-rates.csv/2026/all?type=daily_treasury_yield_curve' },
  { id: 16, titulo: 'Prima de riesgo implícita del S&P 500 por meses (ERPbymonth.xlsx; oct-2026 4,20 %)', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 17, titulo: 'Oferta recomendada de Tetra Tech por RPS Group: 222 p/acción, ≈636 M GBP, 16,0x el EBITDA ajustado LTM pre-NIIF 16', editor: 'Tetra Tech (anuncio de la Regla 2.7)', tipo: 'Primaria', fecha: '2022-09-23', url: E + '000110465922102772/tm2226569d1_ex99-1.htm' },
  { id: 18, titulo: 'WSP comprará POWER Engineers por 1.780 M USD (15,2x el EBITDA ajustado 2024e pre-NIIF 16; 12,5x con sinergias)', editor: 'WSP Global', tipo: 'Primaria', fecha: '2024-09-04', url: 'https://www.wsp.com/en-us/news/2024/wsp-to-acquire-power-engineers' },
  { id: 19, titulo: 'Acuren y NV5 anuncian su fusión: ≈1.700 M USD, 10,3x el EBITDA ajustado 2025e de consenso', editor: 'Business Wire', tipo: 'Primaria', fecha: '2025-05-15', url: 'https://www.businesswire.com/news/home/20250515498193/en/Acuren-Corporation-and-NV5-Global-Inc.-Announce-Merger-with-$2-Billion-Combined-Revenue' },
  { id: 20, titulo: 'Form 10-Q del 3T26 (acciones en circulación 256,0 M; compras de Halvik y Providence)', editor: 'Tetra Tech, Inc.', tipo: 'Primaria', fecha: '2026-07-31', url: E + '000083164126000017/ttek-20260628.htm' },
];
const usdCAD = 1.1195 / 1.5918, usdSEK = 1.1195 / 11.158, usdEUR = 1.1195;
const cierres = Object.fromEntries(bolsa.cierres_ejercicio.map((c) => [c.anio, c.precio_cierre]));
const D = {
  _estado: 'Completo. Precio y bolsa de bolsa.mjs (cierre del 14-oct-2026; la sesión del 15-oct no había cerrado). Consenso de MarketScreener; comparables de Stock Analysis (PER adelantado sobre el BPA ajustado de cada empresa; capitalizaciones convertidas a USD al cambio del BCE del 14-oct).',
  identificacion: {
    nombre: 'Tetra Tech, Inc.', nombre_corto: 'Tetra Tech', ticker: 'TTEK', isin: 'US88162G1031', mercado: 'Nasdaq Global Select (EE. UU.)', indice_referencia: 'S&P MidCap 400',
    pais: 'Estados Unidos', pais_iso: 'US', sector: 'Industria', industria: 'Servicios profesionales: consultoría e ingeniería', sede: 'Pasadena (California)', fundacion: '1966', empleados: 25000, web: 'tetratech.com',
    precio: bolsa.identificacion.precio, fecha_precio: bolsa.identificacion.fecha_precio, acciones: 257.5, capitalizacion_publicada: 8610, free_float_pct: 99.5,
    max_52s: bolsa.identificacion.max_52s, min_52s: bolsa.identificacion.min_52s, volumen_medio_diario: '≈ 85 M USD/día (3 meses)', proximos_resultados: '2026-11-18',
  },
  consenso: {
    estimaciones: [
      { periodo: 'FY2026e', ingresos: null, ebitda: 654.4, ebit: 599.6, bpa: 1.62, dpa: 0.27, fuente: 'MarketScreener (8 analistas; ingresos netos 4.354 M; BPA ajustado) [2]' },
      { periodo: 'FY2027e', ingresos: null, ebitda: 698.6, ebit: 641.5, bpa: 1.73, dpa: 0.30, fuente: 'MarketScreener (ingresos netos 4.543 M) [2]' },
      { periodo: 'FY2028e', ingresos: null, ebitda: 736.6, ebit: 696.2, bpa: 1.88, dpa: 0.34, fuente: 'MarketScreener (ingresos netos 4.625 M) [2]' },
    ],
    recomendaciones: { n_analistas: 8, comprar: null, mantener: null, vender: null, po_medio: 40.33, po_min: 36.0, po_max: 46.0 },
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null, // El EBITDA ajustado de Tetra Tech solo quita no recurrentes (litigios, deterioros, earn-outs), que el motor también devuelve: misma base.
    confianza: 'Media',
  },
  bolsa: { ...bolsa.bolsa, posicion_corta_pct: 4.67, confianza: 'Alta' },
  multiplos_historicos: {
    serie: ['FY2017', 'FY2018', 'FY2019', 'FY2020', 'FY2021', 'FY2022', 'FY2023', 'FY2024', 'FY2025'].map((a) => ({ anio: a, precio_cierre: cierres[a], ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    confianza: 'Alta',
  },
  comparables: {
    empresas: [
      { nombre: 'Jacobs Solutions', ticker: 'J', pais: 'US', capitalizacion: 16620, ev_ventas: 1.37, ev_ebitda_ltm: 18.45, ev_ebitda_ntm: null, per_ntm: 17.85, crecimiento_pct: 4.2, margen_ebitda_pct: 7.43, roic_pct: 8.45, dn_ebitda: 3.44, fcf_yield_pct: 3.88 },
      { nombre: 'AECOM', ticker: 'ACM', pais: 'US', capitalizacion: 7500, ev_ventas: 0.64, ev_ebitda_ltm: 10.53, ev_ebitda_ntm: null, per_ntm: 9.52, crecimiento_pct: 8.7, margen_ebitda_pct: 6.05, roic_pct: 12.40, dn_ebitda: 2.99, fcf_yield_pct: 2.71 },
      { nombre: 'Stantec', ticker: 'STN', pais: 'CA', capitalizacion: 7520, ev_ventas: 1.91, ev_ebitda_ltm: 12.65, ev_ebitda_ntm: null, per_ntm: 14.60, crecimiento_pct: null, margen_ebitda_pct: 15.11, roic_pct: 11.12, dn_ebitda: 2.35, fcf_yield_pct: 6.23 },
      { nombre: 'WSP Global', ticker: 'WSP', pais: 'CA', capitalizacion: Math.round(21790 * usdCAD), ev_ventas: 1.55, ev_ebitda_ltm: 10.83, ev_ebitda_ntm: null, per_ntm: 13.28, crecimiento_pct: null, margen_ebitda_pct: 12.31, roic_pct: 7.83, dn_ebitda: 3.23, fcf_yield_pct: 8.25 },
      { nombre: 'Arcadis', ticker: 'ARCAD', pais: 'NL', capitalizacion: Math.round(3490 * usdEUR), ev_ventas: 0.93, ev_ebitda_ltm: 11.15, ev_ebitda_ntm: null, per_ntm: 12.42, crecimiento_pct: 4.0, margen_ebitda_pct: 6.96, roic_pct: 11.48, dn_ebitda: 3.28, fcf_yield_pct: 10.14 },
      { nombre: 'Sweco', ticker: 'SWEC B', pais: 'SE', capitalizacion: Math.round(47280 * usdSEK), ev_ventas: 1.66, ev_ebitda_ltm: 10.62, ev_ebitda_ntm: null, per_ntm: 17.16, crecimiento_pct: 6.4, margen_ebitda_pct: 12.56, roic_pct: 14.07, dn_ebitda: 1.40, fcf_yield_pct: 7.33 },
      { nombre: 'Exponent', ticker: 'EXPO', pais: 'US', capitalizacion: 3380, ev_ventas: 5.99, ev_ebitda_ltm: 24.63, ev_ebitda_ntm: null, per_ntm: 28.70, crecimiento_pct: 8.5, margen_ebitda_pct: 24.31, roic_pct: 30.32, dn_ebitda: 0.53, fcf_yield_pct: 3.21 },
      { nombre: 'ICF International', ticker: 'ICFI', pais: 'US', capitalizacion: 1550, ev_ventas: 1.16, ev_ebitda_ltm: 10.73, ev_ebitda_ntm: null, per_ntm: 11.64, crecimiento_pct: 5.9, margen_ebitda_pct: 10.82, roic_pct: 6.90, dn_ebitda: 2.63, fcf_yield_pct: 12.77 },
    ],
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2022-09', objetivo: 'RPS Group (Reino Unido)', comprador: 'Tetra Tech', ev: 711, ev_ventas: null, ev_ebitda: 16.0, prima_pct: 7.8, excluir: false, comentario: '222 p frente a los 206 p de WSP; 10,7x con sinergias [17].' },
      { fecha: '2024-09', objetivo: 'POWER Engineers (EE. UU.)', comprador: 'WSP Global', ev: 1780, ev_ventas: null, ev_ebitda: 15.2, prima_pct: null, excluir: false, comentario: 'Energía y transmisión; 12,5x con sinergias [18].' },
      { fecha: '2025-05', objetivo: 'NV5 Global (EE. UU.)', comprador: 'Acuren', ev: 1700, ev_ventas: null, ev_ebitda: 10.3, prima_pct: null, excluir: false, comentario: 'Ingeniería, ensayos e inspección; 9,2x con sinergias [19].' },
      { fecha: '2026-03', objetivo: 'Halvik y Providence', comprador: 'Tetra Tech', ev: 232, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Precio con earn-out; múltiplo no publicado [20].' },
    ],
    confianza: 'Media',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'consenso', campo: 'recomendaciones.comprar/mantener/vender', tipo: 'Complemento', intentos: '1) MarketScreener (solo media «Outperform» y 8 analistas); 2) Stock Analysis (de pago); 3) prensa de cambios de recomendación (RBC Outperform, Northcoast Comprar, National Bank Outperform)', decision: 'Omitido' },
    { seccion: 'comparables', campo: 'ev_ebitda_ntm', tipo: 'Complemento', intentos: '1) Stock Analysis (solo LTM); 2) MarketScreener (de pago para varios); 3) consenso de cada empresa en otra base', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Seeking Alpha: titulares y artículos sobre TTEK (RSS, jul-oct 2026: «Market Leadership In Water», «The Do Nothing Club»)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-15', url: 'https://seekingalpha.com/api/sa/combined/TTEK.xml' },
  { id: 2, titulo: 'Stocktwits: mensajes de $TTEK (ago-oct 2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-15', url: 'https://api.stocktwits.com/api/2/streams/symbol/TTEK.json' },
  { id: 3, titulo: 'Las consultoras de ingeniería caen por el temor a la IA (y comentarios de analistas en Stockchase)', editor: 'The Globe and Mail / Stockchase', tipo: 'Foros y redes', fecha: '2026-09', url: 'https://stockchase.com/STN-T/page/1' },
  { id: 4, titulo: 'Simply Wall St: «Tetra Tech slides as raised outlook meets profit quality doubts»', editor: 'Webull / Simply Wall St', tipo: 'Foros y redes', fecha: '2026-07', url: 'https://www.webull.com/news/15318848858498048' },
];
const Es = {
  _estado: 'Completo con cuatro sitios; Reddit no abre en la nube.',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Seeking Alpha (artículos y titulares)', fecha: '2026-09', n_comentarios: 12, tono: 'Positivo', resumen: 'Dos artículos alcistas («liderazgo en agua», «el mercado no ve la inflexión del 2T») y uno que la mete entre las medianas «que no se han movido en un año» [1].' },
      { plataforma: 'Stocktwits', fecha: '2026-10', n_comentarios: 30, tono: 'Positivo', resumen: 'Particulares que compraron en los 26-32 USD y ven el suelo hecho; algún mensaje bajista por compras de opciones de venta a 25 USD y la ruptura de la media de 200 sesiones [2].' },
      { plataforma: 'Stockchase y prensa canadiense (comentarios de gestores)', fecha: '2026-09', n_comentarios: 8, tono: 'Dividido', resumen: 'El sector «cotiza como si fuera software»: unos creen exagerado el miedo a la IA y otros que el modelo por horas está tocado [3].' },
      { plataforma: 'Simply Wall St (Webull)', fecha: '2026-07', n_comentarios: 5, tono: 'Negativo', resumen: 'Tras el 3T la acción cayó pese a subir la guía: dudas sobre la calidad del beneficio (Ucrania vía Estado, ganancias de earn-out) [4].' },
    ],
    temas: [
      { tema: 'La IA y el modelo por horas', postura: 'Dividida', peso: 'Alto', contraste: 'El 52 % de las ventas se factura por horas o costes y el sector cayó un 23 % por este miedo; la empresa dice que su trabajo de campo y de primera fase es menos sustituible. Tiene sentido como riesgo, no como certeza: ver riesgos.ia.' },
      { tema: 'Fin de USAID y dependencia federal', postura: 'Bajista', peso: 'Medio', contraste: 'USAID ya cayó del 10,6 % a ≈4 % de las ventas; queda Ucrania (66 M en el 3T), que puede desaparecer. Sin él, los ingresos netos crecen un 8 %.' },
      { tema: 'Agua: PFAS, AMP8 británico y agua digital', postura: 'Alcista', peso: 'Medio', contraste: 'Respaldado: municipal en EE. UU. +6 % sin catástrofes y Reino Unido creciendo a doble dígito; Dayton (mayor planta de PFAS municipal) es un ejemplo.' },
      { tema: 'Recompras y caja', postura: 'Alcista', peso: 'Bajo', contraste: 'Respaldado: 898 M de recompra disponible (10 % de la capitalización) y caja de explotación de 567 M en 12 meses.' },
    ],
    confianza: 'Media',
  },
  fuentes: fE,
  huecos: [],
};

guarda('A', A); guarda('B', B); guarda('C', C); guarda('D', D); guarda('E', Es);
console.log('Notas A-E escritas.');
