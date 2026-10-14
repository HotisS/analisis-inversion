// Escribe las notas A-E de MSCI Inc. (corte 2026-10-14) a partir de los documentos de notas/docs (EDGAR: 10-K 2025,
// 10-Q 2T26, notas de resultados 2018-2026, proxy 2026, 8-K), del XBRL (notas/cuentas-xbrl.json), de bolsa.json y form4.json,
// de la ficha sectorial sectores/bolsas-datos-financieros-2026-10-14 y de páginas web leídas (consenso, foros).
// Cada nota cita solo con [n] de su propia lista de fuentes. Ejecutar: node informes/msci-2026-10-14/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const raiz = path.resolve(dir, '..', '..', '..');
const leer = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const r1 = (x) => (x == null ? null : Math.round(x * 10) / 10);
const r2 = (x) => (x == null ? null : Math.round(x * 100) / 100);

const X = leer(path.join(dir, 'cuentas-xbrl.json'));
const BOLSA = leer(path.join(dir, 'bolsa.json'));
const F4 = leer(path.join(dir, 'form4.json'));
const SECT = leer(path.join(raiz, 'sectores', 'bolsas-datos-financieros-2026-10-14-comparables.json'));
const EDGAR = 'https://www.sec.gov/Archives/edgar/data/1408198';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Form 10-K del ejercicio 2025 (cuentas, notas de segmentos, deuda, ingresos por geografía, clientes)', editor: 'MSCI Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-02-06', url: `${EDGAR}/000140819826000011/msci-20251231.htm` },
  { id: 2, titulo: 'Form 10-Q del segundo trimestre de 2026 (balance, flujos del semestre, deuda, adquisiciones)', editor: 'MSCI Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-07-21', url: `${EDGAR}/000140819826000046/msci-20260630.htm` },
  { id: 3, titulo: 'MSCI Reports Financial Results for Second Quarter and Six Months 2026 (8-K, anexo 99.1)', editor: 'MSCI Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-07-21', url: `${EDGAR}/000140819826000044/exhibit991earningsrelease-.htm` },
  { id: 4, titulo: 'MSCI Reports Financial Results for First Quarter 2026 (8-K, anexo 99.1)', editor: 'MSCI Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-04-21', url: `${EDGAR}/000140819826000032/earningsrelease-20260331xe.htm` },
  { id: 5, titulo: 'MSCI Reports Financial Results for Fourth Quarter and Full Year 2025 (8-K, anexo 99.1)', editor: 'MSCI Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-01-28', url: `${EDGAR}/000140819826000005/exhibit991earningsrelease-.htm` },
  { id: 6, titulo: 'MSCI Reports Financial Results for Third Quarter 2025 (8-K, anexo 99.1)', editor: 'MSCI Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2025-10-28', url: `${EDGAR}/000140819825000194/exhibit991earningsrelease-.htm` },
  { id: 7, titulo: 'MSCI Reports Financial Results for Second Quarter 2025 (8-K, anexo 99.1)', editor: 'MSCI Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2025-07-22', url: `${EDGAR}/000140819825000175/exhibit991earningsrelease-.htm` },
  { id: 8, titulo: 'Company Facts XBRL de MSCI Inc. (series anuales y trimestrales 2016-2026)', editor: 'SEC EDGAR (data.sec.gov)', tipo: 'Primaria', fecha: '2026-10-14', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0001408198.json' },
  { id: 9, titulo: 'Resultados del 4T y del ejercicio 2024, 2022, 2020 y 2018 (8-K, anexos 99.1: BPA y EBITDA ajustados)', editor: 'MSCI Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2025-01-29', url: `${EDGAR}/000140819825000014/earningsrelease-20241231xf.htm` },
  { id: 10, titulo: '8-K: enmienda del contrato de licencia de índices para ETF con BlackRock (hasta 2035)', editor: 'MSCI Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-01-28', url: `${EDGAR}/000140819826000008/msci-20260127.htm` },
  { id: 11, titulo: 'Pricing term sheet de los bonos 5,25 % 2035 (FWP; ratings Baa3/BBB−/BBB−)', editor: 'MSCI Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2025-08-05', url: 'https://www.sec.gov/Archives/edgar/data/1408198/000119312525173577/d945235dfwp.htm' },
  { id: 12, titulo: 'MSCI misses top-line and bottom-line estimates; updates FY2026 outlook / MSCI signals S&C net new sales roughly flat (titulares del 21-jul-2026)', editor: 'Seeking Alpha (RSS de MSCI)', tipo: 'Prensa', fecha: '2026-07-21', url: 'https://seekingalpha.com/api/sa/combined/MSCI.xml' },
  { id: 13, titulo: 'MSCI Stock Tumbles 10% After Q2 Earnings and Revenue Miss Wall Street Targets (consenso previo: BPA 4,99 USD, ingresos 870,7 M)', editor: 'TIKR', tipo: 'Prensa', fecha: '2026-07-21', url: 'https://www.tikr.com/blog/msci-nyse-stock-tumbles-after-second-quarter-earnings-and-revenue-miss-wall-street-targets' },
  { id: 15, titulo: '8-K: dimisión del director contable (Jack Read), 27-mar-2026', editor: 'MSCI Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-03-31', url: `${EDGAR}/000140819826000027/msci-20260327.htm` },
  { id: 16, titulo: '8-K: el director financiero, responsable contable interino', editor: 'MSCI Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-08-07', url: `${EDGAR}/000140819826000049/msci-20260807.htm` },
  { id: 14, titulo: 'Resultados del 4T y del ejercicio 2018 (8-K, anexo 99.1: BPA ajustado 2017-2018)', editor: 'MSCI Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2019-01-31', url: `${EDGAR}/000115752319000193/a51933098ex99_1.htm` },
];

const fy = X.financieros.cuenta;
const amortInt = { 2016: 47.0, 2017: 44.5, 2018: 54.2, 2019: 49.4, 2020: 56.9, 2021: 80.6, 2022: 91.1, 2023: 114.4, 2024: 164.0, 2025: 169.5 };
const costeSinDA = { 2019: 295.0, 2020: 291.7, 2021: 358.7, 2022: 404.3, 2023: 446.6, 2024: 514.4, 2025: 550.4 };
const noRec = { 2023: 2.9, 2024: 7.0 };
const cuenta = fy.map((c) => {
  const am = r1(c.amortizaciones + amortInt[c.periodo]);
  const nr = noRec[c.periodo] ?? null;
  return {
    periodo: c.periodo, ingresos: c.ingresos, coste_ventas: costeSinDA[c.periodo] ?? c.coste_ventas, gastos_generales: c.gastos_generales,
    ebitda: r1(c.ebit + am), amortizaciones: am, ebit: c.ebit, resultado_financiero: c.resultado_financiero, bai: c.bai, impuestos: c.impuestos,
    minoritarios: 0, beneficio_neto: c.beneficio_neto, gastos_financieros: c.gastos_financieros, participadas_en_ebitda: null, no_recurrentes_en_ebitda: nr,
    bpa: c.bpa, dpa: c.dpa, dpa_extraordinario: 0, acciones_diluidas: c.acciones_diluidas,
  };
});

const clientes = { 2023: 839.6, 2024: 820.7, 2025: 986.7 };
const balance = X.balance.historico.map((b) => ({
  periodo: b.periodo, activo_total: b.activo_total, activo_corriente: b.activo_corriente, pasivo_corriente: b.pasivo_corriente, pasivo_total: b.pasivo_total,
  fondo_comercio: b.fondo_comercio, intangibles: b.intangibles, inmovilizado_material: b.inmovilizado_material, existencias: 0,
  clientes: clientes[b.periodo] ?? b.clientes, proveedores: b.proveedores, activos_contrato: null, pasivos_contrato: b.pasivos_contrato ?? null,
  caja: b.caja, deuda_financiera: b.deuda_financiera, arrendamientos: 0, patrimonio_neto: b.patrimonio_neto, minoritarios: 0, reservas: b.reservas,
}));

const softw = { 2016: 10.3, 2017: 15.6, 2018: 18.7, 2019: 24.7, 2020: 29.1, 2021: 39.3, 2022: 59.3, 2023: 68.1, 2024: 81.4, 2025: 90.5 };
const flujos = X.flujos.historico.map((f) => ({
  periodo: f.periodo, flujo_operativo: f.flujo_operativo, capex: r1(f.capex + softw[f.periodo]), pagos_arrendamientos: 0,
  adquisiciones: f.adquisiciones ?? 0, desinversiones: f.desinversiones ?? 0, dividendos: f.dividendos, recompras: f.recompras,
  emision_acciones: f.emision_acciones ?? 0, intereses_en_financiacion: 0,
}));

const A = {
  _estado: 'completo',
  negocio: {
    segmentos: [
      { nombre: 'Index', descripcion: 'Índices de renta variable ponderados por capitalización, factoriales, temáticos y a medida; licencias por suscripción y comisiones sobre los activos de ETF y fondos indexados.', tipo_resultado: 'EBITDA', historico: [
        { periodo: '2023', ingresos: 1451.8, resultado: 1107.0 }, { periodo: '2024', ingresos: 1596.1, resultado: 1222.1 }, { periodo: '2025', ingresos: 1786.8, resultado: 1366.0 }] },
      { nombre: 'Analytics', descripcion: 'Modelos de riesgo (Barra), analítica de carteras multiactivo y de renta variable para gestoras, hedge funds y bancos.', tipo_resultado: 'EBITDA', historico: [
        { periodo: '2023', ingresos: 616.0, resultado: 274.9 }, { periodo: '2024', ingresos: 675.1, resultado: 328.3 }, { periodo: '2025', ingresos: 714.4, resultado: 342.5 }] },
      { nombre: 'Sustainability and Climate', descripcion: 'Calificaciones ESG, datos y modelos de riesgo climático; desde 2026 incluirá First Street (riesgo físico).', tipo_resultado: 'EBITDA', historico: [
        { periodo: '2023', ingresos: 287.6, resultado: 91.7 }, { periodo: '2024', ingresos: 326.6, resultado: 104.7 }, { periodo: '2025', ingresos: 353.9, resultado: 128.5 }] },
      { nombre: 'Otros: activos privados (Private Capital Solutions y Real Assets)', descripcion: 'Datos y referencias de capital privado (antes Burgiss) e inmobiliario (antes RCA e IPD).', tipo_resultado: 'EBITDA', historico: [
        { periodo: '2023', ingresos: 173.6, resultado: 49.4 }, { periodo: '2024', ingresos: 258.3, resultado: 61.4 }, { periodo: '2025', ingresos: 279.3, resultado: 69.4 }] },
    ],
    geografias: [
      { nombre: 'Estados Unidos', peso_pct: 40.4 }, { nombre: 'Resto de América', peso_pct: 4.5 }, { nombre: 'Reino Unido', peso_pct: 17.3 },
      { nombre: 'Resto de EMEA', peso_pct: 22.3 }, { nombre: 'Japón', peso_pct: 4.1 }, { nombre: 'Resto de Asia y Australia', peso_pct: 11.4 },
    ],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Run rate total (M USD)', valor_anterior: '3.106 (jun-25)', valor_actual: '3.480 (jun-26)', variacion: '+12,0 %', comentario: 'Ingreso anualizado contratado; el de comisiones sobre activos sube con los mercados [3].' },
      { kpi: 'Crecimiento orgánico del run rate de suscripciones', valor_anterior: '7,4 % (2T25)', valor_actual: '8,1 % (2T26)', variacion: '+0,7 p.', comentario: 'Index 11,1 %, Analytics 6,6 %, S&C 3,2 %, activos privados 8,3 % [3, 7].' },
      { kpi: 'Tasa de retención', valor_anterior: '94,4 % (2T25)', valor_actual: '95,3 % (2T26)', variacion: '+0,9 p.', comentario: 'En el 4T25 bajó al 93,4 % por cancelaciones en S&C [3, 5].' },
      { kpi: 'Run rate de comisiones sobre activos (M USD)', valor_anterior: '≈ 757 (jun-25)', valor_actual: '≈ 948 (jun-26)', variacion: '+25 %', comentario: 'Récord por los activos de ETF ligados a índices MSCI; +190,9 M en un año [3].' },
      { kpi: 'Peso de BlackRock en los ingresos', valor_anterior: '10,2 % (2024)', valor_actual: '10,8 % (2025)', variacion: '+0,6 p.', comentario: 'El 96,5 % de lo que paga BlackRock son comisiones sobre activos de sus ETF; contrato prorrogado hasta 2035 con rebaja de tarifas en 2026 y 2027 [1, 10].' },
      { kpi: 'Empleados', valor_anterior: '6.268 (dic-25)', valor_actual: '6.327 (jun-26)', variacion: '+1,9 % interanual', comentario: '71 % en países emergentes (India, México, Filipinas…), base del margen [1, 3].' },
    ],
    confianza: 'Alta',
  },
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 3333.8, ebitda: 2048.7, ebit: 1855.7, beneficio_neto: 1358.0, bpa: 18.29, dpa: 7.7, dpa_extraordinario: 0, fcf: 1492.5, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [
      { periodo: '2021', descripcion: 'Real Capital Analytics (RCA), comprada por ≈ 950 M USD en septiembre de 2021 [1].' },
      { periodo: '2023', descripcion: 'Burgiss: compra del 66,4 % restante por 696,8 M el 2-oct-2023; consolida desde el 4T23 y la revalorización del 33,6 % previo dio una plusvalía no recurrente de 143,0 M fuera del EBIT [1].' },
    ],
    comentario: 'Ingresos de 1.150,7 M en 2016 a 3.134,5 M en 2025 (TCAC del 11,8 %) y 3.333,8 M en los últimos 12 meses [1, 3, 8]. El crecimiento es casi todo orgánico salvo 2021 (RCA) y 2023-2024 (Burgiss): el orgánico fue del 9,0-9,5 % en 2025 y del 12,2-13,3 % en el 1S26, empujado por las comisiones sobre activos (+26,6 % en los dos trimestres) [3, 4]. El margen EBITDA (EBIT + todas las amortizaciones) pasó del 45,4 % de 2016 al 60,8 % de 2025 y al 61,5 % en los últimos 12 meses: apalancamiento operativo puro, porque el 71 % de la plantilla está en países emergentes y el coste crece la mitad que los ingresos (gastos del EBITDA ajustado +10,1 % frente a ingresos +12,2 % en el 2T26) [3]. Años no comparables: 2023 (plusvalía de Burgiss de 143 M en el resultado financiero: BPA 14,39 USD frente a 14,05 de 2024), 2025 (cargo fiscal por la reestructuración societaria en el 4T25) y 1S26 (beneficio fiscal de 88 M en el 1T26) [1, 3, 5].',
    ajustes: 'Usamos el EBIT y el BPA publicados (US GAAP). El EBITDA de la cuenta es EBIT + depreciación + amortización de intangibles (incluye software activado y activos comprados) y coincide con el EBITDA ajustado de la empresa salvo los costes de integración de compras (2,9 M en 2023 y 7,0 M en 2024, en no_recurrentes_en_ebitda) [1]. El BPA ajustado de la empresa excluye la amortización de intangibles comprados y las partidas fiscales y financieras puntuales: 17,28 USD en 2025 frente a 15,69 publicado; 9,49 en el 1S26 frente a 10,23 (el beneficio fiscal de 88 M sube el publicado) [3, 5]. La diferencia recurrente es la amortización de intangibles comprados, ≈ 1,0 USD por acción al año. La rentabilidad a 12 meses usa el BPA ajustado, la base del consenso y de la historia del PER.',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '3T24', ingresos: 724.7, crecimiento_pct: 15.9, crecimiento_organico_pct: null, ebitda: 450.7, margen_ebitda_pct: 62.2, bpa: 3.57, vs_consenso: null },
      { periodo: '4T24', ingresos: 743.5, crecimiento_pct: 7.7, crecimiento_organico_pct: null, ebitda: 452.3, margen_ebitda_pct: 60.8, bpa: 3.90, vs_consenso: null },
      { periodo: '1T25', ingresos: 745.8, crecimiento_pct: 9.7, crecimiento_organico_pct: null, ebitda: 425.6, margen_ebitda_pct: 57.1, bpa: 3.71, vs_consenso: null },
      { periodo: '2T25', ingresos: 772.7, crecimiento_pct: 9.1, crecimiento_organico_pct: 8.3, ebitda: 474.4, margen_ebitda_pct: 61.4, bpa: 3.92, vs_consenso: null },
      { periodo: '3T25', ingresos: 793.4, crecimiento_pct: 9.5, crecimiento_organico_pct: 9.0, ebitda: 494.4, margen_ebitda_pct: 62.3, bpa: 4.25, vs_consenso: null },
      { periodo: '4T25', ingresos: 822.5, crecimiento_pct: 10.6, crecimiento_organico_pct: 10.2, ebitda: 512.0, margen_ebitda_pct: 62.2, bpa: 3.81, vs_consenso: null },
      { periodo: '1T26', ingresos: 850.8, crecimiento_pct: 14.1, crecimiento_organico_pct: 13.3, ebitda: 504.7, margen_ebitda_pct: 59.3, bpa: 5.53, vs_consenso: null },
      { periodo: '2T26', ingresos: 867.0, crecimiento_pct: 12.2, crecimiento_organico_pct: 12.2, ebitda: 538.5, margen_ebitda_pct: 62.1, bpa: 4.69, vs_consenso: 'Inferior' },
    ],
    ultima_presentacion: 'EBITDA ajustado de la empresa y BPA diluido publicado [3-8]. En el 2T26 (21-jul) los ingresos crecieron un 12,2 % y el BPA ajustado un 18,5 % (4,94 USD), pero quedaron por debajo del consenso previo (4,99 USD y 870,7 M) y la acción cayó un 10,1 % en la sesión [13]. La dirección destacó el récord del run rate de comisiones sobre activos y su mejor trimestre con hedge funds, y habló de IA: «hemos lanzado el doble de productos en 2026 que en todo 2024» [3]. Lo que pesó: subió la guía de gastos del año (gastos del EBITDA ajustado 1.340-1.370 M frente a 1.305-1.335 M), por la compra de First Street, la retribución variable y más inversión; y avisó de que las ventas netas recurrentes de Sustainability and Climate serán nulas o algo negativas en los dos próximos trimestres por cancelaciones en América [3, 12, 13]. Analytics bajó su margen del 52,1 % al 46,5 % [3]. En el 1T26 (21-abr) el mensaje fue de aceleración (+14,1 %) con la rebaja de tarifas a BlackRock ya en vigor desde enero; la dirección no cuantificó en ninguna de las dos el efecto de la segunda rebaja de enero de 2027 [4, 10]. Consenso previo de trimestres anteriores no verificado en fuente con fecha: vs_consenso en blanco.',
    confianza: 'Alta',
  },
  balance: {
    historico: balance,
    vencimientos: [{ anio: '2026', importe: 0 }, { anio: '2027', importe: 0 }, { anio: '2028', importe: 0 }, { anio: '2029', importe: 1000 }, { anio: '2030', importe: 1375 }, { anio: '2031', importe: 1600 }, { anio: '2033', importe: 700 }, { anio: '2035+', importe: 1750 }],
    liquidez: 'Caja 356,4 M (jun-26; mínimo operativo de 225-275 M) + 1.125 M disponibles de la línea de crédito de 1.600 M hasta ago-2030 [2, 3].',
    rating: "Moody's Baa3 (estable, desde may-2024), S&P BBB− y Fitch BBB− [11]",
    coste_deuda_pct: 4.3,
    vida_media_anios: 6.1,
    otros_pasivos: 'Deuda bruta de 6.425 M de principal a 30-jun-2026: siete bonos sin garantía al 3,25-5,25 % con vencimientos de 2029 a 2036 y 475 M de la línea revolving a SOFR + 1,50 % (5,1 %) [2]. Sin covenants financieros relevantes en los bonos; la línea pide un apalancamiento máximo (la empresa se fija 3,0-3,5 veces deuda/EBITDA ajustado y está en 3,1) [2, 3]. Arrendamientos operativos de 163,8 M (US GAAP: su gasto ya está en el EBITDA; no van al puente) [2]. Pagos contingentes de compras: 33,9 M (Vantager, Compass, PM Insights) [2]; First Street, 120 M al cierre (previsto en el 3T26) más pagos ligados a ingresos en dos años [3]. Ingresos diferidos de 1.136,9 M: cobros por adelantado que financian el circulante [2]. Sin pensiones de prestación definida relevantes.',
    comentario: 'El patrimonio es negativo desde 2018 (−2.689,5 M en jun-26) porque las recompras (7.400 M en 2016-2025) superan el beneficio retenido: no es un problema de solvencia sino una decisión de estructura de capital, financiada con deuda hasta 3-3,5 veces el EBITDA [1, 2, 8]. La deuda bruta subió de 4.511 M en 2024 a 6.202 M en 2025 por los bonos de 2035 y 2036, que pagaron 2.484 M de recompras ese año [1]. El circulante comercial es negativo: clientes 884,4 M frente a 1.136,9 M de ingresos diferidos en jun-26 [2]; las suscripciones se facturan por adelantado, sobre todo en el 4T. Deuda neta de ≈ 6.070 M a jun-26, 3,0 veces el EBITDA de 12 meses.',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'Conversión excelente: flujo operativo de 1.588 M en 2025 frente a un beneficio de 1.202 M (132 %) y caja libre de 1.459 M tras 129,9 M de inversión (39,3 M en inmovilizado y 90,5 M de software activado, incluido aquí en el capex) [1]. La guía de 2026 da 1.485-1.545 M de caja libre con 160-170 M de capex [3]. Casi toda la inversión es de mantenimiento y desarrollo de producto (software de datos y plataformas); el software activado ha pasado del 0,9 % de las ventas en 2016 al 2,9 % en 2025, señal de más desarrollo interno y de la apuesta por IA [8]. Usos de la caja en 2016-2025: 7.400 M de recompras, 3.000 M de dividendos y 1.700 M de compras (RCA, Burgiss, Carbon Delta, Fabric…) [1, 8]. Años anómalos: 2021 y 2023 por las compras; 2025 por recompras de 2.484 M financiadas con deuda [1].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'PricewaterhouseCoopers LLP', anios_auditor: 12, opinion: 'Favorable, sin salvedades; control interno eficaz a 31-dic-2025 [1]',
    senales: [
      { senal: 'Salida del director contable (CAO) en agosto de 2026, sin sustituto', nivel: 'Media', comentario: 'Jack Read dimitió en marzo para otro puesto, «sin desacuerdo» con las cuentas; el director financiero asume interinamente la función contable desde el 10-ago [15, 16].' },
      { senal: 'Partidas fiscales puntuales grandes (cargo en el 4T25, beneficio de 88 M en el 1T26)', nivel: 'Baja', comentario: 'Reestructuración societaria interna en dos fases; distorsiona el BPA publicado de 2025 y 2026; el ajustado las excluye [3, 5].' },
      { senal: 'Software activado creciente', nivel: 'Baja', comentario: 'De 10 M en 2016 a 90,5 M en 2025 (2,9 % de ventas): su amortización entra en la de intangibles; lo tratamos como capex [8].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Dividendo trimestral de 2,05 USD (+13,9 % en 2026; 8,20 USD al año, ≈ 40 % del BPA ajustado) y recompras oportunistas: programa de 3.000 M aprobado el 25-oct-2025, con ≈ 1.600 M disponibles a 20-jul-2026 [3, 6]. La dirección se fija 3,0-3,5 veces deuda/EBITDA ajustado y reinvierte sobre todo en producto (software activado) y en compras pequeñas de datos y tecnología (Compass, Vantager, PM Insights en 2026; First Street por 120 M + variable) [2, 3].',
    adquisiciones: [
      { anio: '2026', objetivo: 'First Street Technology (riesgo climático físico)', importe: 120, ev_ebitda: null, financiacion: 'Caja', resultado: 'Pendiente de cierre en el 3T26; más pagos ligados a ingresos durante dos años [3].' },
      { anio: '2026', objetivo: 'Vantager, Compass y PM Insights', importe: 95.5, ev_ebitda: null, financiacion: 'Caja y pagos contingentes (33,9 M)', resultado: 'Integradas en el 1S26; aportan 3,2 M de gasto trimestral sin cifra de ingresos [2, 3].' },
      { anio: '2023', objetivo: 'Burgiss (66,4 % restante)', importe: 696.8, ev_ebitda: null, financiacion: 'Caja y deuda', resultado: 'Ahora Private Capital Solutions: el segmento de activos privados crece un 8 % en run rate pero su margen cayó del 28 % al 22,9 % (2T26) [1, 3].' },
      { anio: '2021', objetivo: 'Real Capital Analytics', importe: 949, ev_ebitda: null, financiacion: 'Caja y bonos', resultado: 'Real Assets crece poco; sin deterioros del fondo de comercio [1, 8].' },
    ],
    confianza: 'Alta',
  },
  fuentes: fA,
  huecos: [
    { seccion: 'trimestres', campo: 'vs_consenso de 3T24-1T26', tipo: 'Complemento', intentos: '1) notas de resultados (no lo dan); 2) RSS de Seeking Alpha (solo titulares del 2T26); 3) Stocktwits y prensa (sin cifra de consenso fechada)', decision: 'Omitido' },
    { seccion: 'negocio', campo: 'segmentos 2021-2022 en la segmentación vigente', tipo: 'Complemento', intentos: '1) 10-K 2025 (solo 2023-2025); 2) 10-K 2023 (segmentación anterior: ESG and Climate, Real Assets, Burgiss); 3) notas de resultados (sin reexpresión)', decision: 'Omitido' },
  ],
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Form 10-K del ejercicio 2025 (competencia, clientes, BlackRock, empleados)', editor: 'MSCI Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-02-06', url: `${EDGAR}/000140819826000011/msci-20251231.htm` },
  { id: 2, titulo: 'Indexing industry revenues hit record $7.2bn (estudio Burton-Taylor 2026: S&P DJI 1.850 M, MSCI 1.790 M, FTSE Russell 1.290 M)', editor: 'ETF Trends / ETFdb', tipo: 'Sectorial', fecha: '2026-05-19', url: 'https://etfdb.com/news/2026/05/19/indexing-industry-revenues-hit-record-7-2bn/' },
  { id: 3, titulo: 'Global index revenues increase 5.9% to $5.3 billion in 2022 (Burton-Taylor)', editor: 'Mondo Visione', tipo: 'Sectorial', fecha: '2023-04-26', url: 'https://mondovisione.com/media-and-resources/news/global-index-revenues-increase-59-to-53-billion-in-2022-as-surging-demand-fo-2023426/' },
  { id: 4, titulo: 'Infraestructura de mercados y datos financieros: ficha sectorial corta (14-oct-2026; Burton-Taylor, SEC, FIA, MarketScreener)', editor: 'Repositorio de análisis (ficha de LSEG)', tipo: 'Sectorial', fecha: '2026-10-14', url: 'sectores/bolsas-datos-financieros-2026-10-14.md' },
  { id: 5, titulo: 'MSCI Reports Financial Results for Second Quarter 2026 (8-K, anexo 99.1)', editor: 'MSCI Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-07-21', url: `${EDGAR}/000140819826000044/exhibit991earningsrelease-.htm` },
  { id: 6, titulo: '8-K: enmienda del contrato de licencia de índices para ETF con BlackRock (hasta 2035)', editor: 'MSCI Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-01-28', url: `${EDGAR}/000140819826000008/msci-20260127.htm` },
  { id: 7, titulo: 'Market data spend hits $49.2bn as AI, volatility and algos drive growth (Burton-Taylor)', editor: 'FOW', tipo: 'Sectorial', fecha: '2026-04-08', url: 'https://www.fow.com/insights/market-data-spend-hits-usd49-2bn-as-ai-volatility-and-algos-drive-growth' },
  { id: 8, titulo: 'Informes del repositorio: S&P Global (12-oct), Moody\'s (14-oct) y LSEG (14-oct): márgenes y cifras de competidores', editor: 'Repositorio de análisis', tipo: 'Analistas', fecha: '2026-10-14', url: 'informes/moodys-2026-10-14/' },
  { id: 9, titulo: 'Proxy statement 2026 (DEF 14A: historia, asignación de capital)', editor: 'MSCI Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-03-11', url: `${EDGAR}/000140819826000023/msci-20260310.htm` },
  { id: 10, titulo: 'Morningstar Inc. (MORN): estadísticas (capitalización, EV, ingresos y EBITDA de 12 meses)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/morn/statistics/' },
  { id: 11, titulo: 'MSCI ESG Ratings / calificaciones de la empresa (MSCI, Sustainalytics) y regulación de calificaciones ESG de la UE (Reglamento 2024/3005)', editor: 'Diario Oficial de la UE', tipo: 'Primaria', fecha: '2024-12-12', url: 'https://eur-lex.europa.eu/eli/reg/2024/3005/oj' },
];
const B = {
  _estado: 'completo',
  historia: {
    resumen: 'MSCI nació en 1969 como Capital International, que publicó los primeros índices mundiales de renta variable; Morgan Stanley compró la licencia en 1986 y creó Morgan Stanley Capital International (MSCI) [1, 9]. Henry Fernandez la dirige desde 1998. Salió a bolsa en noviembre de 2007 y Morgan Stanley vendió su participación en 2009 [1]. Compró Barra (modelos de riesgo, 2004, por Morgan Stanley) y RiskMetrics (2010), base de Analytics y de la actual división ESG, y vendió negocios no estratégicos (ISS en 2014) [1]. Desde 2019 ha comprado datos de clima (Carbon Delta), inmobiliario (RCA, 2021) y capital privado (Burgiss, 2023) [1]. La palanca de los últimos diez años fue el boom de los ETF: los activos ligados a sus índices multiplicaron las comisiones y el margen pasó del 45 % al 61 %.',
    hitos: [
      { anio: '1969', hito: 'Capital International publica los primeros índices mundiales de acciones [1].' },
      { anio: '1986', hito: 'Morgan Stanley licencia los índices: nace MSCI [1].' },
      { anio: '1998', hito: 'Henry Fernandez, primer ejecutivo [9].' },
      { anio: '2004', hito: 'Compra de Barra (modelos de riesgo, base de Analytics) [1].' },
      { anio: '2007', hito: 'Salida a bolsa en la NYSE; separación total de Morgan Stanley en 2009 [1].' },
      { anio: '2010', hito: 'Compra de RiskMetrics (y de su negocio ESG, origen de Sustainability and Climate) [1].' },
      { anio: '2014', hito: 'Venta de ISS; empieza la política de recompras con deuda [1].' },
      { anio: '2021', hito: 'Compra de Real Capital Analytics por ≈ 950 M USD [1].' },
      { anio: '2023', hito: 'Control total de Burgiss (capital privado) por 696,8 M [1].' },
      { anio: '2026', hito: 'Contrato de ETF con BlackRock prorrogado hasta 2035 con tarifas más bajas; compras de Compass, Vantager, PM Insights y First Street [5, 6].' },
    ],
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'MSCI vende herramientas de decisión a la industria de inversión: 6.800 clientes en más de 100 países [1]. **Index** (57 % de los ingresos de 2025) calcula índices de renta variable de referencia (MSCI World, Emerging Markets, ACWI) que se licencian a gestoras, bancos y bolsas por suscripción y por comisión sobre los activos de los ETF y fondos que los replican [1]. **Analytics** (23 %) vende modelos de riesgo y analítica de carteras (Barra, RiskMetrics) a gestoras, hedge funds y bancos. **Sustainability and Climate** (11 %) vende calificaciones ESG y datos y modelos de clima. **Activos privados** (9 %) vende datos de rentabilidad de fondos de capital privado (Burgiss) e inmobiliario (RCA). Clientes tipo: gestoras (≈ la mitad del run rate), propietarios de activos, hedge funds, bancos e intermediarios, gestores patrimoniales [1, 5].',
    como_gana_dinero: 'El 97 % de los ingresos de 2025 es recurrente: 72,7 % suscripciones anuales (2.278,7 M) y 24,6 % comisiones sobre activos (770,7 M); solo el 2,7 % es puntual [1]. Las comisiones sobre activos son puntos básicos sobre el patrimonio de los ETF y fondos indexados: suben con la bolsa y con las entradas de dinero, y caen con ellas (un 22 % de caída de los mercados en 2022 recortó los ingresos de Index) [1, 5]. Las suscripciones suben con el número de usuarios y módulos y con subidas de precio anuales; la retención está en el 93-95 % [5]. Como los índices y modelos se calculan una vez y se venden muchas, el coste marginal es casi nulo: el margen EBITDA de Index es del 77,8 % frente al 46,5 % de Analytics y el 22,9 % de activos privados (2T26) [5]. Estacionalidad baja; el 4T concentra las renovaciones y las ventas nuevas.',
    clientes: 'Concentración moderada con un cliente crítico: BlackRock supuso el 10,8 % de los ingresos de 2025 (10,2 % en 2024 y 9,8 % en 2023) y el 18,7 % de los de Index, casi todo comisiones de sus iShares [1]. El contrato de ETF con BlackRock se prorrogó en enero de 2026 hasta marzo de 2035, con renovaciones automáticas de tres años, a cambio de **rebajar las tarifas de ciertos fondos desde enero de 2026 y otra vez desde enero de 2027**, según el TER y los activos de cada fondo («intercambio de precio por volumen») [6]. Es la prueba de los límites del poder de precios en las comisiones sobre activos; en suscripciones, la retención del 95,3 % y el run rate orgánico del 8,1 % muestran poder de precios sostenido [5]. Ningún otro cliente llega al 10 % [1].',
    confianza: 'Alta',
  },
  sector: {
    definicion: 'El mercado relevante es el de **proveedores de índices** (licencias de índices y comisiones sobre activos indexados), que da el 57 % de los ingresos y el 74 % del EBITDA de segmentos de MSCI; ámbito mundial [1, 2]. Analytics y S&C compiten en el mercado más amplio de datos y analítica financiera (≈ 49.200 M USD en 2025, +6,5 %, Burton-Taylor), del que MSCI tiene menos del 3 % [4, 7]. Usamos la serie de ingresos de la industria de índices de Burton-Taylor (2022 y 2025 publicados; 2021 y 2024 deducidos de los crecimientos publicados) y la contrastamos con la del gasto en datos de la ficha sectorial [2, 3, 4].',
    tamano: '≈ 7.200 M USD de ingresos mundiales de proveedores de índices en 2025, +13,4 % (Burton-Taylor) [2]; 49.200 M de gasto en datos y analítica financiera [7].',
    unidad_serie: 'millones de USD (ingresos mundiales de proveedores de índices; 2021 y 2024 deducidos de los crecimientos publicados; 2030e, estimación propia al 8 %)',
    serie: [{ anio: '2021', tamano: 5000 }, { anio: '2022', tamano: 5300 }, { anio: '2024', tamano: 6350 }, { anio: '2025', tamano: 7200 }, { anio: '2030e', tamano: 10580 }],
    tcac_historico_pct: 9.5,
    tcac_previsto_pct: 8.0,
    cr5_pct: 75.0,
    estructura: 'Concentrada',
    drivers: [
      { driver: 'Paso de la gestión activa a la indexada (ETF)', efecto: '+', horizonte: 'Estructural', evidencia: 'Run rate de comisiones sobre activos de MSCI +25 % interanual en jun-26, con récord de activos en ETF ligados a sus índices [5]; la industria de índices creció un 13,4 % en 2025 [2].' },
      { driver: 'Nivel de los mercados de renta variable', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Las comisiones sobre activos (24,6 % de los ingresos) siguen al valor de los activos: en 2022 la acción cayó un 24 % con el mercado y las comisiones bajaron [1, 4].' },
      { driver: 'Presión de tarifas de las grandes gestoras', efecto: '−', horizonte: 'Estructural', evidencia: 'Rebaja de tarifas a BlackRock en 2026 y 2027 a cambio de prorrogar hasta 2035 [6]; los ETF compiten por TER y las comisiones son un % del TER [1].' },
      { driver: 'Mercados privados', efecto: '+', horizonte: 'Estructural', evidencia: 'Run rate de activos privados +8,0 % (Private Capital Solutions); S&P compró With Intelligence por 1.800 M y BlackRock Preqin por 3.200 M [4, 5].' },
      { driver: 'Demanda de ESG y clima', efecto: '−', horizonte: 'Cíclico', evidencia: 'Run rate de S&C +1,9 % en jun-26 frente a +10 % en 2025; ventas netas nulas o negativas previstas por cancelaciones en América [1, 5].' },
      { driver: 'IA generativa', efecto: '+/−', horizonte: 'Estructural', evidencia: 'MSCI ha lanzado el doble de productos en 2026 que en todo 2024 con IA [5]; a la vez abarata la analítica genérica (Analytics, margen 46,5 % en el 2T26 frente al 52,1 %) [5, 4].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 2, justificacion: 'Tres proveedores reúnen más de dos tercios de los ingresos de índices: S&P DJI 1.850 M, MSCI 1.790 M y FTSE Russell 1.290 M en 2025 [2]. Compiten por nuevos productos, no por precio en los índices de referencia.' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'BlackRock es el 18,7 % de Index y consiguió rebajas en 2026 y 2027 [1, 6]; Vanguard ya cambió de MSCI a FTSE y CRSP en 2012 para ahorrar costes [1]. En suscripciones el cliente está atomizado y la retención es del 95 % [5].' },
      { fuerza: 'Poder de los proveedores', intensidad: 1, justificacion: 'Insumos: personal (71 % en países emergentes) y datos de bolsas; el margen de Index del 77,8 % muestra que no capturan valor [5].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Un índice de referencia tarda décadas en ganar activos replicados y mandatos; los autoindexados de gestoras y los índices de bajo coste (Solactive, CRSP) entran por la parte baja [1, 2].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'Índices propios de gestoras, gestión directa indexada y analítica construida con IA por los clientes sustituyen parte de Analytics y S&C; los índices de referencia son difíciles de sustituir por los mandatos que los citan [1, 4].' },
    ],
    ciclo: { posicion: 'Expansión', comentario: 'Mercados de acciones en máximos (S&P 500 +17,5 % en 12 meses a 13-oct-2026) y entradas récord en ETF: las comisiones sobre activos crecen un 26,6 % [5]. Es la parte cíclica: en 2022 (bolsas −19 %) la acción de MSCI cayó un 24 % y el crecimiento de Index se frenó; en 2020 el sector aguantó por las suscripciones; 2008-2009 no lo verificamos con documentos primarios. Las suscripciones (73 % de los ingresos) apenas notan el ciclo [1, 4].' },
    regulacion: 'Reglamento de Índices de Referencia (BMR) de la UE, revisado en 2025-2026, que exige autorización a los administradores de índices; MSCI está autorizado en la UE y en el Reino Unido [1, 4]. Reglamento europeo de calificaciones ESG (2024/3005), aplicable desde julio de 2026: autorización y supervisión de la ESMA, separación de actividades y transparencia de métodos; sube el coste de S&C [11]. En EE. UU., la SEC estudió regular a los proveedores de índices como asesores (2022) sin norma final [1]. Riesgo político en ESG en EE. UU. (estados que limitan su uso) [4].',
    tendencias: 'Tres tendencias: (1) la indexación sigue ganando cuota a la gestión activa, y MSCI gana con los índices de mercados mundiales y emergentes y los índices a medida (run rate de suscripciones de Index +11,1 %) [5]; (2) la IA abarata construir analítica y datos, lo que presiona a Analytics y S&C pero permite a MSCI lanzar productos más rápido [5]; (3) los mercados privados piden referencias y datos de rentabilidad, donde MSCI tiene la base de Burgiss y compite con Preqin (BlackRock) y With Intelligence (S&P) [4, 5].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 24.9,
    posicion: '2.º proveedor mundial de índices por ingresos (1.790 M USD de 7.200 M en 2025, 24,9 %; S&P DJI 25,7 %, FTSE Russell 17,9 %) [2]; en analítica de riesgo, uno de los cuatro grandes con Bloomberg, Axioma (SimCorp) y FactSet [1].',
    competidores: [
      { nombre: 'S&P Global (S&P Dow Jones Indices)', pais: 'EE. UU.', ticker: 'SPGI', ingresos: 1850, cuota_pct: 25.7, margen_ebit_pct: 69.0, comentario: 'Líder en índices (S&P 500, Dow Jones); S&P DJI es una empresa conjunta con CME (27 %). Ingresos y cuota de índices de Burton-Taylor; margen ajustado de su división de índices [2, 8].' },
      { nombre: 'LSEG (FTSE Russell)', pais: 'Reino Unido', ticker: 'LSEG', ingresos: 1290, cuota_pct: 17.9, margen_ebit_pct: null, comentario: 'Tercero en índices (Russell 2000, FTSE All-World); compite en índices mundiales y de renta fija [2].' },
      { nombre: 'Bloomberg (índices y terminales)', pais: 'EE. UU.', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Privada; líder en índices de renta fija y en analítica de carteras (PORT); competidor de Analytics [1].' },
      { nombre: 'FactSet', pais: 'EE. UU.', ticker: 'FDS', ingresos: 2300, cuota_pct: null, margen_ebit_pct: 31.0, comentario: 'Compite con Analytics en analítica de carteras y riesgo; ventas y margen aproximados de la ficha sectorial [1, 4].' },
      { nombre: "Moody's", pais: 'EE. UU.', ticker: 'MCO', ingresos: 7718, cuota_pct: null, margen_ebit_pct: 43.4, comentario: 'Compite en datos de riesgo, clima y ESG (Moody\'s Analytics); ventas y EBIT de 2025 del informe del 14-oct [8].' },
      { nombre: 'Morningstar (Sustainalytics, índices Morningstar)', pais: 'EE. UU.', ticker: 'MORN', ingresos: 2570, cuota_pct: null, margen_ebit_pct: null, comentario: 'Rival directo en calificaciones ESG (Sustainalytics) e índices para gestores patrimoniales; ventas de 12 meses de Stock Analysis [10].' },
    ],
    foso: {
      veredicto: 'Amplio', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 5, evidencia: 'Cuantos más activos y mandatos usan el MSCI World o el Emerging Markets como referencia, más difícil es cambiarlo: los gestores activos se miden contra él y los ETF lo replican [1, 2].' },
        { fuente: 'Costes de cambio', puntuacion: 4, evidencia: 'Retención del 95,3 % en suscripciones; cambiar de índice obliga a reescribir folletos y mandatos, y de modelo de riesgo a revalidar procesos [5].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 5, evidencia: 'Marca de referencia desde 1969 y autorizaciones de administrador de índices (BMR) en la UE y el Reino Unido [1].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: '71 % de la plantilla en países emergentes; margen EBITDA del 61 % frente al 51 % de S&P Global y Moody\'s [4, 5].' },
        { fuente: 'Escala eficiente', puntuacion: 4, evidencia: 'Un índice de referencia se calcula una vez y se vende muchas: margen de Index del 77,8 % [5].' },
      ],
    },
    amenazas: 'La amenaza principal no es un nuevo proveedor sino la presión de tarifas de las grandes gestoras: BlackRock (18,7 % de Index) arrancó rebajas en 2026 y 2027, y Vanguard ya se fue en 2012 [1, 6]. Probabilidad media de nuevas rebajas cuando venzan otros contratos. Segunda: la IA y los índices propios de las gestoras abaratan Analytics y S&C (≈ 34 % de los ingresos), donde el foso es más estrecho (margen del 46,5 % y del 38,7 %) [5]. Tercera: un cambio político o regulatorio contra el ESG reduce la demanda de S&C (run rate +1,9 %) [5].',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [{ agencia: 'MSCI ESG (calificación propia no aplicable)', calificacion: 'n.d.', fecha: '2026-10' }],
    materialidad: 'Lo material para MSCI es (1) la gobernanza de los índices y de las calificaciones ESG, regulados en la UE (BMR, Reglamento 2024/3005): un fallo de método o de independencia es un riesgo de multa y de reputación [1, 11]; (2) la seguridad de los datos y la ciberseguridad, por la dependencia de sus clientes del cálculo diario de índices [1]; (3) el capital humano: 6.327 empleados, rotación voluntaria del 7 % en 2025 [1, 5].',
    controversias: 'Sin multas ni litigios materiales en los últimos tres años según el 10-K 2025 [1]. La controversia es reputacional: críticas políticas en EE. UU. a las calificaciones ESG y a la inclusión de empresas chinas en sus índices de emergentes (comité de la Cámara de Representantes, 2023-2024) [1, 4].',
    confianza: 'Media',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'esg', campo: 'calificaciones ESG de terceros', tipo: 'Complemento', intentos: '1) 10-K y proxy (no las publican); 2) ficha sectorial del repo (sin dato); 3) búsqueda no hecha por presupuesto', decision: 'Omitido' },
  ],
};
guarda('B', B);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Proxy statement 2026 (DEF 14A: consejo, remuneración, participaciones)', editor: 'MSCI Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-03-11', url: `${EDGAR}/000140819826000023/msci-20260310.htm` },
  { id: 2, titulo: '8-K: resultados de la junta de 2026 (say-on-pay 59,08 M a favor, 4,06 M en contra)', editor: 'MSCI Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-04-23', url: `${EDGAR}/000140819826000038/msci-20260421.htm` },
  { id: 3, titulo: '8-K: jubilación de Baer Pettit (presidente y director de operaciones)', editor: 'MSCI Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2025-11-17', url: `${EDGAR}/000140819825000199/msci-20251112.htm` },
  { id: 4, titulo: '8-K: dimisión del director contable (Jack Read)', editor: 'MSCI Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-03-31', url: `${EDGAR}/000140819826000027/msci-20260327.htm` },
  { id: 5, titulo: '8-K: director financiero como responsable contable interino', editor: 'MSCI Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-08-07', url: `${EDGAR}/000140819826000049/msci-20260807.htm` },
  { id: 6, titulo: 'Form 4 de MSCI Inc. presentados entre el 14-oct-2025 y el 14-oct-2026 (herramienta form4.mjs)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-14', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001408198&type=4' },
  { id: 7, titulo: 'Notas de resultados del 4T de 2018, 2020, 2022, 2024 y 2025 (BPA ajustado y guías)', editor: 'MSCI Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-01-28', url: `${EDGAR}/000140819826000005/exhibit991earningsrelease-.htm` },
  { id: 8, titulo: 'MSCI Reports Financial Results for Second Quarter 2026 (guía de 2026)', editor: 'MSCI Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-07-21', url: `${EDGAR}/000140819826000044/exhibit991earningsrelease-.htm` },
];
const comprasF = F4.operaciones.filter((o) => o.codigo === 'P' || o.codigo === 'S');
const porPersonaMes = {};
for (const o of comprasF) {
  const k = `${o.persona}|${o.fecha.slice(0, 7)}|${o.codigo}`;
  porPersonaMes[k] ??= { fecha: o.fecha, persona: `${o.persona} (${o.cargo})`, operacion: o.codigo === 'P' ? 'Compra' : 'Venta', acciones: 0, importe: 0 };
  porPersonaMes[k].acciones += o.acciones; porPersonaMes[k].importe += o.importe / 1e6;
}
const insiders = Object.values(porPersonaMes).map((x) => ({ ...x, importe: r2(x.importe) })).sort((a, b) => a.fecha.localeCompare(b.fecha));
const C = {
  _estado: 'completo',
  directivos: {
    equipo: [
      { nombre: 'Henry A. Fernandez', cargo: 'Presidente del consejo, primer ejecutivo y presidente ejecutivo (desde mar-2026)', desde: '1998', participacion_pct: 3.08, trayectoria: 'Fundador de la MSCI independiente; la dirige desde 1998 y preside el consejo desde 2007 [1]. Bajo su mando los ingresos pasaron de 1.151 M en 2016 a 3.134 M en 2025 y el BPA ajustado creció a doble dígito 11 años seguidos [1, 7]. Ha comprado 12,5 M USD de acciones en el mercado en los últimos 12 meses [6].' },
      { nombre: 'Andrew C. Wiechmann', cargo: 'Director financiero (y responsable contable interino desde ago-2026)', desde: '2021', participacion_pct: 0.04, trayectoria: 'En MSCI desde 2008 (estrategia, relación con inversores); director financiero desde 2021 [1]. Lleva la política de deuda de 3-3,5 veces el EBITDA y las recompras [8].' },
      { nombre: 'Alvise J. Munari', cargo: 'Responsable de segmentos de clientes (antes director de producto)', desde: '2025', participacion_pct: 0.06, trayectoria: 'Director de producto; desde nov-2025 al frente de los segmentos de clientes tras la salida de Pettit [1]. Vendió 5,9 M USD de acciones en abril de 2026 [6].' },
      { nombre: 'Scott A. Crum', cargo: 'Director de recursos humanos', desde: '2014', participacion_pct: 0.03, trayectoria: 'En el cargo desde 2014 [1].' },
      { nombre: 'Robert J. Gutowski', cargo: 'Director jurídico', desde: '2018', participacion_pct: null, trayectoria: 'Director jurídico; vendió 0,35 M USD de acciones en el periodo [6].' },
    ],
    historial_guidance: [
      { anio: '2025', guia: 'Caja libre 1.450-1.510 M y gastos del EBITDA ajustado dentro de la guía de enero', real: 'Caja libre 1.459 M; BPA ajustado 17,28 USD (+13,7 %)', cumplida: 'Sí' },
      { anio: '2024', guia: 'Crecimiento a doble dígito del BPA ajustado', real: 'BPA ajustado 15,20 USD (+12,4 %)', cumplida: 'Sí' },
      { anio: '2022', guia: 'Crecimiento a doble dígito del BPA ajustado', real: 'BPA ajustado 11,45 USD (+15,1 %) pese a la caída de los mercados', cumplida: 'Sí' },
      { anio: '2020', guia: 'Crecimiento a doble dígito del BPA ajustado', real: 'BPA ajustado 7,83 USD (+21,6 %)', cumplida: 'Sí' },
      { anio: '2026', guia: 'Gastos del EBITDA ajustado 1.305-1.335 M (abril), subida a 1.340-1.370 M en julio; caja libre 1.485-1.545 M', real: 'Pendiente; gasto al alza por First Street y retribución variable', cumplida: 'Parcial' },
    ],
    comentario: 'Equipo muy estable y con mucho capital propio: Fernandez tiene el 3,08 % (≈ 1.270 M USD) y compra en mercado [1, 6]. La debilidad es la sucesión: con la jubilación de Baer Pettit (presidente y director de operaciones, en marzo de 2026) Fernandez, de 67 años, vuelve a acumular presidente del consejo, primer ejecutivo y presidente ejecutivo, sin número dos designado [1, 3]. A eso se suma la salida del director contable en agosto, cubierta en interino por el director financiero [4, 5]. Credibilidad alta: once años seguidos de BPA ajustado creciendo a doble dígito [1, 7]; el primer fallo frente al consenso trimestral en años llegó en el 2T26.',
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      { nombre: 'Henry A. Fernandez', cargo: 'Presidente y primer ejecutivo', tipo: 'Ejecutivo', desde: '2007', comisiones: '—' },
      { nombre: 'Robert G. Ashe', cargo: 'Consejero coordinador independiente', tipo: 'Independiente', desde: '2013', comisiones: 'Auditoría y riesgos; nombramientos' },
      { nombre: 'Robin Matlock', cargo: 'Consejera', tipo: 'Independiente', desde: '2022', comisiones: 'Remuneración' },
      { nombre: 'Jacques P. Perold', cargo: 'Consejero', tipo: 'Independiente', desde: '2017', comisiones: 'Auditoría y riesgos' },
      { nombre: 'Sandy C. Rattray', cargo: 'Consejero', tipo: 'Independiente', desde: '2020', comisiones: 'Estrategia' },
      { nombre: 'Linda H. Riefler', cargo: 'Consejera', tipo: 'Independiente', desde: '2007', comisiones: 'Remuneración' },
      { nombre: 'Michelle Seitz', cargo: 'Consejera', tipo: 'Independiente', desde: '2024', comisiones: 'Estrategia' },
      { nombre: 'Marcus L. Smith', cargo: 'Consejero', tipo: 'Independiente', desde: '2017', comisiones: 'Auditoría y riesgos' },
      { nombre: 'Rajat Taneja', cargo: 'Consejero', tipo: 'Independiente', desde: '2021', comisiones: 'Nombramientos' },
      { nombre: 'Paula Volent', cargo: 'Consejera', tipo: 'Independiente', desde: '2020', comisiones: 'Auditoría y riesgos' },
      { nombre: 'June Yang', cargo: 'Consejera', tipo: 'Independiente', desde: '2024', comisiones: 'Estrategia' },
    ],
    presidente_ceo_separados: false, presidente_ejecutivo: true, consejero_coordinador: true, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 93.4, voto_remuneracion_contra_pct: 6.4, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 33.32, fijo: 1.0, variable_corto: 1.35, variable_largo: 29.6, ratio_salario_medio: 592 },
    remuneracion: 'El primer ejecutivo cobró 33,3 M USD en 2025: 1,0 M de fijo, 1,35 M de variable anual y 29,6 M en acciones y opciones, de ellos 15,0 M de una concesión especial de opciones con precio de ejercicio por encima del de mercado (PPO); sin ella, 18,3 M y 325 veces el salario mediano (592 con ella) [1]. El variable a largo plazo depende de la TSR absoluta anual compuesta (PSU) y, a partes iguales, de los ingresos y el BPA ajustado acumulados en tres años (PSO) [1]: premia crecer y recomprar, no el ROIC. El variable anual pasó a ser 100 % por fórmula en 2026 [1]. Say-on-pay: 94,0 % a favor en 2025 y 93,4 % en 2026 (6,4 % en contra) [1, 2].',
    accionistas: [
      { nombre: 'The Vanguard Group', pct: 12.82, tipo: 'Institucional (13G/A)', variacion: 'Estable (13G/A de abril de 2025)' },
      { nombre: 'BlackRock, Inc.', pct: 8.13, tipo: 'Institucional y principal cliente (13G/A)', variacion: '7,3 % de derechos de voto según el 8-K de enero de 2026' },
      { nombre: 'Henry A. Fernandez y su familia', pct: 3.08, tipo: 'Directivo', variacion: 'Compras en mercado de 12,5 M USD en 12 meses' },
      { nombre: 'Consejeros y directivos (16 personas)', pct: 3.76, tipo: 'Directivos', variacion: '—' },
    ],
    insiders,
    control_y_defensas: 'Sin accionista de control: el mayor es Vanguard (12,8 %), pasivo; BlackRock (8,1 %) es a la vez accionista, distribuidor y primer cliente, conflicto que el propio 10-K reconoce [1]. Una acción, un voto; consejo elegido cada año; consejero coordinador independiente (Robert Ashe). El punto débil es la concentración de poder: Fernandez es presidente del consejo, primer ejecutivo y presidente ejecutivo desde marzo de 2026 [1, 3]. Sin operaciones vinculadas relevantes más allá del contrato con BlackRock, a precios de mercado [1].',
    alertas: [
      'Salida del director contable (agosto de 2026) sin sustituto; el director financiero lo cubre en interino [4, 5].',
      'Concentración de cargos en Fernandez (67 años) tras la jubilación de Pettit, sin sucesor designado [3].',
      'Concesión especial de opciones de 15 M USD al primer ejecutivo en 2025 [1].',
    ],
    confianza: 'Alta',
  },
  fuentes: fC,
  huecos: [],
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'MSCI, ^GSPC y XLF: históricos diarios (precio, rango, volumen, betas, cierres de ejercicio) con bolsa.mjs', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-13', url: 'https://finance.yahoo.com/quote/MSCI/history' },
  { id: 2, titulo: 'MSCI Inc.: finanzas y estimaciones 2024-2028 (ventas, EBITDA, EBIT, BPA, dividendo, flujo libre, deuda neta)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/MSCI-INC-3021165/finances/' },
  { id: 3, titulo: 'MSCI Inc. (MSCI) stock forecast: 18 analistas, objetivo medio 677,65 USD (570-755); BPA 2026e 19,69 y del año siguiente 22,43', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/msci/forecast/' },
  { id: 4, titulo: 'Are Wall Street analysts bullish on MSCI stock? (recortes de objetivo tras el 2T26: JPMorgan a 700 USD)', editor: 'Barchart', tipo: 'Prensa', fecha: '2026-08', url: 'https://www.barchart.com/story/news/4001735/are-wall-street-analysts-bullish-on-msci-stock' },
  { id: 5, titulo: 'Daily Treasury Par Yield Curve Rates 2026 (10 años: 5,21 % el 13-oct-2026)', editor: 'U.S. Department of the Treasury', tipo: 'Primaria', fecha: '2026-10-13', url: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/daily-treasury-rates.csv/2026/all?type=daily_treasury_yield_curve&field_tdr_date_value=2026' },
  { id: 6, titulo: 'Implied ERP by month (ERPbymonth.xlsx): 4,20 % en octubre de 2026', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 7, titulo: 'Comparables de infraestructura de mercados y datos financieros a 13/14-oct-2026 (MarketScreener y Stock Analysis vía informes del repo)', editor: 'Repositorio de análisis (ficha sectorial de LSEG)', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'sectores/bolsas-datos-financieros-2026-10-14-comparables.json' },
  { id: 8, titulo: 'Morningstar Inc. (MORN): estadísticas', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/morn/statistics/' },
  { id: 9, titulo: 'MarketAxess: folleto definitivo de la fusión con ICE (DEFM14A)', editor: 'MarketAxess Holdings', tipo: 'Primaria', fecha: '2026-09-18', url: 'https://www.sec.gov/Archives/edgar/data/1278021/000119312526395678/d171374ddefm14a.htm' },
  { id: 10, titulo: 'S&P Global agrees to acquire With Intelligence for $1.8 billion', editor: 'Motive Partners', tipo: 'Primaria', fecha: '2025-10-15', url: 'https://motivepartners.com/news/s-p-global-agrees-to-acquire-with-intelligence-from-motive-partners-for-1-8-billion-establishing-its-leadership-in-private-markets-intelligence' },
  { id: 11, titulo: 'Nasdaq to Acquire Adenza (8-K, anexo 99.1)', editor: 'Nasdaq, Inc.', tipo: 'Primaria', fecha: '2023-06-12', url: 'https://www.sec.gov/Archives/edgar/data/1120193/000119312523164839/d476077dex991.htm' },
  { id: 12, titulo: 'S&P Global and IHS Markit to Merge (8-K, anexo 99.1)', editor: 'IHS Markit', tipo: 'Primaria', fecha: '2020-11-30', url: 'https://www.sec.gov/Archives/edgar/data/1598014/000095010320023248/dp141981_ex9901.htm' },
  { id: 13, titulo: 'Proposed all-share acquisition of Refinitiv (RNS)', editor: 'London Stock Exchange Group', tipo: 'Primaria', fecha: '2019-08-01', url: 'https://www.lseg.com/content/dam/lseg/en_us/documents/investor-relations/mergers-and-acquisitions/refinitiv/lseg-refinitiv-acquisition-all-share-proposed-rns-01aug2019.pdf' },
  { id: 14, titulo: 'Form 10-K 2025 de MSCI (compra de Burgiss: 696,8 M por el 66,4 %)', editor: 'MSCI Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-02-06', url: `${EDGAR}/000140819826000011/msci-20251231.htm` },
  { id: 15, titulo: 'MSCI announces 2026 quarterly earnings reporting dates (3T26: 20-oct-2026, 11:00 ET)', editor: 'MSCI Inc.', tipo: 'Primaria', fecha: '2026-04-06', url: 'https://ir.msci.com/node/22526' },
  { id: 16, titulo: 'Yahoo Finance: cierres del 9 y 13-oct-2026 de los comparables (SPGI, MCO, FDS, MORN, LSEG.L, VRSK, TRI, NDAQ, ICE)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-13', url: 'https://query1.finance.yahoo.com/v8/finance/chart/MORN' },
  { id: 17, titulo: 'Form 10-Q 2T26 de MSCI (72,7 M de acciones a 30-jun-2026; 72,9 M diluidas de media en el 2T)', editor: 'MSCI Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-07-21', url: `${EDGAR}/000140819826000046/msci-20260630.htm` },
];
const elige = ['SPGI', 'MCO', 'LSEG', 'FDS', 'VRSK', 'TRI', 'NDAQ', 'ICE'];
const comps = SECT.empresas.filter((e) => elige.includes(e.ticker)).map((e) => ({ ...e }));
comps.push({ nombre: 'Morningstar', ticker: 'MORN', pais: 'US', capitalizacion: 7620, ev_ventas: 3.53, ev_ebitda_ltm: 13.3, ev_ebitda_ntm: null, per_ntm: 15.7, crecimiento_pct: 6.8, margen_ebitda_pct: 26.5, roic_pct: 18.2, dn_ebitda: 2.03, fcf_yield_pct: 6.5 });
const b = BOLSA;
const D = {
  _estado: 'completo',
  identificacion: {
    nombre: 'MSCI Inc.', nombre_corto: 'MSCI', ticker: 'MSCI', isin: 'US55354G1004', mercado: 'New York Stock Exchange', indice_referencia: 'S&P 500',
    pais: 'Estados Unidos', pais_iso: 'US', sector: 'Financials', industria: 'Capital Markets (Financial Exchanges & Data)', sede: 'Nueva York', fundacion: '1969', empleados: 6327, web: 'https://www.msci.com',
    precio: b.identificacion.precio, fecha_precio: b.identificacion.fecha_precio, acciones: 72.9, capitalizacion_publicada: 40800, free_float_pct: 96.2,
    max_52s: b.identificacion.max_52s, min_52s: b.identificacion.min_52s, volumen_medio_diario: '≈ 351 M USD/día (3 meses)', proximos_resultados: '2026-10-20',
  },
  consenso: {
    guidance: 'Guía de 2026 actualizada el 21-jul-2026: gastos operativos 1.535-1.575 M (antes 1.490-1.530), gastos del EBITDA ajustado 1.340-1.370 M (antes 1.305-1.335), intereses 282-286 M, amortizaciones 195-205 M, tipo fiscal 18-20 %, capex 160-170 M, flujo operativo 1.655-1.705 M y caja libre 1.485-1.545 M [17]. Incluye First Street desde el 3T26. La subida de gastos se explica por compras, más retribución variable y más inversión, con unos activos ligados a índices por encima del supuesto de mercados planos [17]. No hay plan a medio plazo con cifras; la empresa repite el objetivo de crecer a doble dígito el BPA ajustado.',
    estimaciones: [
      { periodo: '2026e', ingresos: 3520, ebitda: 2162, ebit: 1967, bpa: 19.91, dpa: 8.23, fuente: 'MarketScreener [2]; 18 analistas (Stock Analysis da 19,69 USD de BPA ajustado con 15 analistas) [3]' },
      { periodo: '2027e', ingresos: 3829, ebitda: 2376, ebit: 2181, bpa: 21.66, dpa: 9.3, fuente: 'MarketScreener [2]; Stock Analysis: 22,43 USD de BPA ajustado y 3.830 M de ingresos [3]' },
      { periodo: '2028e', ingresos: 4147, ebitda: 2600, ebit: 2400, bpa: 24.63, dpa: 10.59, fuente: 'MarketScreener [2]' },
    ],
    recomendaciones: { n_analistas: 18, comprar: 12, mantener: 6, vender: 0, po_medio: 677.65, po_min: 570, po_max: 755 },
    revisiones: 'Tras el 2T26 (21-jul) los analistas bajaron objetivos (JPMorgan a 700 USD desde 742, Morgan Stanley a 700 desde 727) sin cambiar recomendaciones, por más gasto y ventas netas por debajo de lo esperado [4]. El BPA de 2026 del consenso (19,69-19,91) no se movió apenas porque las comisiones sobre activos compensan el gasto [2, 3]. Fuente única de estimaciones completas (MarketScreener); objetivo y recomendaciones contrastados con Stock Analysis. Reparto entre comprar y mantener estimado a partir de la recomendación media «Comprar» [3].',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: { ...b.bolsa, posicion_corta_pct: null, comentario: 'MSCI va muy por detrás del mercado: −2,3 % en el año y +1,3 % en 12 meses frente al +14,0 % y +17,5 % del S&P 500, y −1,8 % anual en cinco años, aunque en diez años gana (+21,1 % anual frente a +13,9 %) [1]. El múltiplo se ha desinflado desde el máximo de noviembre de 2021 (caída máxima del 43,7 % hasta mayo de 2022) aunque el BPA ajustado se ha multiplicado por 1,7 desde entonces. En 2026 pesaron la rebaja de tarifas a BlackRock (enero, −6,9 % el 3-feb y −7,8 % el 10-feb, en plena venta de empresas de datos y software por la IA) y el fallo del 2T26 (−10,1 % el 21-jul) [1]. Volatilidad del 30,3 % y beta mensual de 1,23 (0,85 semanal a dos años) [1].', confianza: 'Alta' },
  multiplos_historicos: {
    serie: b.cierres_ejercicio.map((c) => ({ anio: c.anio, precio_cierre: c.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: c.anio === '2020' || c.anio === '2021' })),
    comentario: null,
    confianza: 'Alta',
  },
  comparables: {
    criterio: 'Nueve cotizadas de índices, datos y analítica financiera con ingresos recurrentes: S&P Global (rival directo en índices con S&P DJI), Moody\'s (datos, riesgo y ESG), LSEG (FTSE Russell y datos), FactSet (analítica de carteras, rival de Analytics), Morningstar (Sustainalytics e índices), Verisk y Thomson Reuters (datos por suscripción), Nasdaq e ICE (índices y datos junto a sus bolsas). Fuera CME, Deutsche Börse y Tradeweb: su negocio es la negociación. Cifras de la ficha sectorial del repo, llevadas al cierre del 13-oct-2026 [7]; Morningstar, de Stock Analysis del 14-oct, sin EV/EBITDA de los próximos 12 meses (no hay estimación del mismo proveedor) [8].',
    empresas: comps,
    comentario: null,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2026-07', objetivo: 'MarketAxess Holdings', comprador: 'Intercontinental Exchange', ev: 5580, ev_ventas: 6.41, ev_ebitda: 13.0, prima_pct: 33, excluir: false, comentario: 'Pendiente, en efectivo; ventas (870 M) y EBITDA (430 M) de 12 meses a jun-26 [9].' },
      { fecha: '2025-10', objetivo: 'With Intelligence', comprador: 'S&P Global', ev: 1800, ev_ventas: 13.8, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Datos de mercados privados; múltiplo sobre ≈ 130 M de ingresos previstos de 2025 [10].' },
      { fecha: '2023-10', objetivo: 'Burgiss (66,4 % restante)', comprador: 'MSCI', ev: 1050, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '696,8 M por el 66,4 %; el 33,6 % previo valía 353,2 M: ≈ 1.050 M por el 100 %. Sin ventas ni EBITDA publicados de Burgiss [14].' },
      { fecha: '2023-06', objetivo: 'Adenza', comprador: 'Nasdaq', ev: 10500, ev_ventas: 17.8, ev_ebitda: 30.7, prima_pct: null, excluir: false, comentario: 'Software de riesgo y cumplimiento; múltiplos sobre la previsión de 2023 (≈ 590 M de ingresos, margen del 58 %): estimación sobre datos de Nasdaq [11].' },
      { fecha: '2020-11', objetivo: 'IHS Markit', comprador: 'S&P Global', ev: 44000, ev_ventas: 10.26, ev_ebitda: 24.0, prima_pct: null, excluir: false, comentario: 'Fusión en acciones; ventas de 4.288 M y EBITDA ajustado de 1.837 M [12].' },
      { fecha: '2019-08', objetivo: 'Refinitiv', comprador: 'London Stock Exchange Group', ev: 27000, ev_ventas: 4.35, ev_ebitda: 13.1, prima_pct: null, excluir: false, comentario: 'En acciones; ingresos de 6.204 M y EBITDA ajustado de 2.054 M de 2018 [13].' },
    ],
    comentario: 'Las compras de datos e índices se pagan a 13-31 veces el EBITDA (mediana ≈ 18,5 veces) y 4-18 veces las ventas: los activos de suscripción con márgenes altos cotizan caros también en privado [9-13]. MSCI, con 41.000 M de capitalización y sin accionista de control, solo podría comprarla un rival muy grande (S&P Global, LSEG) o capital privado con mucha deuda, y una compra por S&P chocaría con competencia en índices (los dos primeros suman el 50 % del mercado). Las transacciones sirven de referencia, no de catalizador.',
    confianza: 'Media',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'bolsa', campo: 'posicion_corta_pct', tipo: 'Complemento', intentos: '1) FINRA (sin descarga en el presupuesto); 2) Stock Analysis (403 con curl); 3) prensa (sin dato fechado)', decision: 'Omitido' },
    { seccion: 'multiplos_historicos', campo: 'ev_ebitda_ntm y per_ntm históricos de proveedor', tipo: 'Complemento', intentos: '1) MarketScreener (solo años recientes); 2) Stock Analysis (403); 3) cálculo propio con BPA ajustado (en la rentabilidad a 12 meses)', decision: 'Omitido' },
  ],
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Stocktwits: flujo de mensajes de $MSCI (jul-oct 2026, ≈ 30 mensajes)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-08', url: 'https://api.stocktwits.com/api/2/streams/symbol/MSCI.json' },
  { id: 2, titulo: 'Seeking Alpha: artículos y titulares de MSCI (jul-sep 2026: «Investors\' Fears Are Justified», «Even After The Sell-Off, MSCI Is Not A Bargain», «The Wait Is Over, The Growth Is Coming After 5 Years», «The Market Can\'t Settle On A Stable Price»)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-09-14', url: 'https://seekingalpha.com/api/sa/combined/MSCI.xml' },
  { id: 3, titulo: 'MSCI Stock Tumbles 10% After Q2 Earnings (comentario sobre cancelaciones en S&C y ventas de directivos)', editor: 'TIKR', tipo: 'Prensa', fecha: '2026-07-21', url: 'https://www.tikr.com/blog/msci-nyse-stock-tumbles-after-second-quarter-earnings-and-revenue-miss-wall-street-targets' },
  { id: 4, titulo: 'The Do Nothing Club: 10 S&P 500 giants that haven\'t gone anywhere in a year', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-08-18', url: 'https://seekingalpha.com/api/sa/combined/MSCI.xml' },
];
const E = {
  _estado: 'completo',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Empeora',
    revisadas: [
      { plataforma: 'Stocktwits ($MSCI)', fecha: '2026-10', n_comentarios: 30, tono: 'Dividido', resumen: 'Tras el −10 % del 21-jul, mensajes que lo ven como compra en soporte técnico y defienden el foso («los proveedores de datos propios de confianza ganarán a la IA»), frente a la frustración por una acción que no se mueve; se repite que fue el primer fallo frente al consenso en muchos trimestres [1].' },
      { plataforma: 'Seeking Alpha (artículos y comentarios)', fecha: '2026-09', n_comentarios: 25, tono: 'Dividido', resumen: 'Dos artículos bajistas tras el 2T26 («los miedos están justificados», «ni tras la caída está barata») y tres alcistas («el crecimiento llega tras cinco años», el ecosistema de índices sigue componiendo) [2].' },
      { plataforma: 'Seeking Alpha (listas y mercado)', fecha: '2026-08', n_comentarios: 10, tono: 'Negativo', resumen: 'MSCI aparece entre los «gigantes del S&P 500 que no se han movido en un año» [4].' },
      { plataforma: 'Prensa con comentarios (TIKR)', fecha: '2026-07', n_comentarios: 5, tono: 'Negativo', resumen: 'Pone el foco en las cancelaciones de clientes de sostenibilidad en América y en las ventas de directivos [3].' },
    ],
    temas: [
      { tema: 'IA: amenaza o palanca para los datos financieros', postura: 'Dividida', peso: 'Alto', contraste: 'Los datos dan razón a las dos partes: Index (77,8 % de margen, +17,5 %) no lo nota, mientras Analytics bajó su margen del 52,1 % al 46,5 % en el 2T26 [A3].' },
      { tema: 'Gastos al alza y primer fallo frente al consenso', postura: 'Bajista', peso: 'Alto', contraste: 'Cierto pero pequeño: BPA ajustado de 4,94 frente a 4,99 (−1 %) y guía de gastos +35 M; el BPA ajustado creció un 18,5 % [A3, A13].' },
      { tema: 'Sostenibilidad y clima en caída', postura: 'Bajista', peso: 'Medio', contraste: 'Run rate de S&C +1,9 % y ventas netas nulas o negativas previstas; pesa el 11 % de los ingresos [A3].' },
      { tema: 'Recompras y compras del primer ejecutivo', postura: 'Alcista', peso: 'Medio', contraste: 'Correcto: 2.484 M de recompras en 2025 y compras de Fernandez por 12,5 M USD en 12 meses [A1, C6].' },
      { tema: 'Rebaja de tarifas a BlackRock', postura: 'Bajista', peso: 'Bajo', contraste: 'Rebajas en 2026 y 2027 a cambio de prórroga hasta 2035; las comisiones sobre activos crecen aun así un 26,6 % por el volumen [A3, A10].' },
    ],
    lectura: 'El inversor particular está dividido y más cansado que asustado: la acción lleva cinco años plana y los foros discuten si la IA y las rebajas de tarifas justifican el múltiplo más bajo en una década. No hay euforia ni capitulación. Anticipa el mismo riesgo que nuestro análisis (Analytics y S&C pierden margen y crecen poco) y no ve el positivo de los activos indexados. Va algo por detrás del consenso de analistas (12 de 18 recomiendan comprar), que bajó objetivos pero no recomendaciones. No cambia la decisión.',
    confianza: 'Media',
  },
  fuentes: fE,
  huecos: [],
};
guarda('E', E);
console.log('Notas A-E escritas;', comps.length, 'comparables;', insiders.length, 'filas de insiders');
