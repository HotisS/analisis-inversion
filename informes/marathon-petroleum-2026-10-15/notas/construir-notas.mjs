// Escribe las notas A-E de Marathon Petroleum (MPC, corte 2026-10-15) a partir del XBRL de la SEC (cuentas-xbrl.json),
// las notas de prensa de resultados (8-K 99.1), el 10-K 2025, el 10-Q del 2T26, el proxy 2026, form4.json, bolsa.json,
// MarketScreener, Stock Analysis, prensa y foros. Cada nota cita solo con [n] de su propia lista. Ejecutar: node notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const X = JSON.parse(fs.readFileSync(path.join(dir, 'cuentas-xbrl.json'), 'utf8'));
const BOLSA = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const E = 'https://www.sec.gov/Archives/edgar/data/1510295';
const ANIOS = ['2020', '2021', '2022', '2023', '2024', '2025'];

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Form 10-K 2025 (cuentas auditadas, segmentos, márgenes por barril, sensibilidades, deuda y vencimientos)', editor: 'Marathon Petroleum Corp. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-26', url: `${E}/000151029526000009/mpc-20251231.htm` },
  { id: 2, titulo: 'Hechos XBRL (companyfacts): cuenta, balance y flujos 2016-2025, operaciones continuadas, minoritarios', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0001510295.json' },
  { id: 3, titulo: 'Marathon Petroleum Corp. Reports Second-Quarter 2026 Results (8-K, anexo 99.1)', editor: 'Marathon Petroleum Corp. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-04', url: `${E}/000151029526000060/mpcq22026earningsrelease.htm` },
  { id: 4, titulo: 'Form 10-Q del 2T26 (balance a 30-jun-2026, participación del 64 % en MPLX, recompras, ratings)', editor: 'Marathon Petroleum Corp. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-04', url: `${E}/000151029526000061/mpc-20260630.htm` },
  { id: 5, titulo: 'Marathon Petroleum Corp. Reports First-Quarter 2026 Results (8-K, anexo 99.1)', editor: 'Marathon Petroleum Corp. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-05-05', url: `${E}/000151029526000039/mpcq12026earningsrelease.htm` },
  { id: 6, titulo: 'Marathon Petroleum Corp. Reports Fourth-Quarter and Full-Year 2025 Results (8-K, anexo 99.1)', editor: 'Marathon Petroleum Corp. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-03', url: `${E}/000151029526000003/mpcq42025earningsrelease.htm` },
  { id: 7, titulo: 'Marathon Petroleum Corp. Reports Third-Quarter 2025 Results (8-K, anexo 99.1)', editor: 'Marathon Petroleum Corp. / SEC EDGAR', tipo: 'Primaria', fecha: '2025-11-04', url: `${E}/000151029525000059/mpcq32025earningsrelease.htm` },
  { id: 8, titulo: 'Marathon Petroleum Corp. Reports Second-Quarter 2025 Results (8-K, anexo 99.1)', editor: 'Marathon Petroleum Corp. / SEC EDGAR', tipo: 'Primaria', fecha: '2025-08-05', url: `${E}/000151029525000052/mpcq22025earningsrelease.htm` },
  { id: 9, titulo: 'Marathon Petroleum Q2 Earnings Call Highlights (margen capturado del 112 %, EBITDA por barril por región)', editor: 'MarketBeat', tipo: 'Prensa', fecha: '2026-08-05', url: 'https://www.marketbeat.com/instant-alerts/marathon-petroleum-q2-earnings-call-highlights-2026-08-05/' },
];
const cx = Object.fromEntries(X.financieros.cuenta.map((r) => [r.periodo, r]));
const bx = Object.fromEntries(X.balance.historico.map((r) => [r.periodo, r]));
const fx = Object.fromEntries(X.flujos.historico.map((r) => [r.periodo, r]));
// Minoritarios de operaciones continuadas (XBRL IncomeLossFromContinuingOperationsAttributableToNoncontrollingEntity; 2025 = ProfitLoss − NetIncomeLoss)
const nci = { 2020: -151, 2021: 1263, 2022: 1534, 2023: 1491, 2024: 1622, 2025: 1831 };
// Beneficio atribuido de operaciones continuadas (2020-2022 con Speedway como discontinuada) y BPA diluido continuado
const bn = { 2020: -11031, 2021: 1290, 2022: 14444, 2023: 9681, 2024: 3445, 2025: 4047 };
const bpa = { 2020: -16.99, 2021: 2.02, 2022: 27.98, 2023: 23.63, 2024: 10.08, 2025: 13.22 };
// Deterioros dentro del resultado de explotación (2020: fondo de comercio 7.394 M + activos y participadas; XBRL AssetImpairmentCharges)
const deterioros = { 2020: 8426 };
const cuenta = ANIOS.map((y) => {
  const c = cx[y];
  return { periodo: y, ingresos: c.ingresos, coste_ventas: c.coste_ventas, gastos_generales: c.gastos_generales, ebitda: c.ebitda, amortizaciones: c.amortizaciones, ebit: c.ebit, resultado_financiero: c.resultado_financiero, bai: c.bai, impuestos: c.impuestos, minoritarios: nci[y], beneficio_neto: bn[y], gastos_financieros: c.gastos_financieros, participadas_en_ebitda: null, no_recurrentes_en_ebitda: deterioros[y] ?? null, bpa: bpa[y], dpa: c.dpa, dpa_extraordinario: 0, acciones_diluidas: c.acciones_diluidas };
});
const historico = ANIOS.map((y) => {
  const b = bx[y];
  return { periodo: y, activo_total: b.activo_total, activo_corriente: b.activo_corriente, pasivo_corriente: b.pasivo_corriente, pasivo_total: b.pasivo_total, fondo_comercio: b.fondo_comercio, intangibles: b.intangibles, inmovilizado_material: b.inmovilizado_material, existencias: b.existencias, clientes: b.clientes, proveedores: b.proveedores, activos_contrato: null, pasivos_contrato: null, caja: b.caja, deuda_financiera: b.deuda_financiera, arrendamientos: 0, patrimonio_neto: b.patrimonio_neto, minoritarios: b.minoritarios, reservas: b.reservas };
});
const flujos = ANIOS.map((y) => {
  const f = fx[y];
  return { periodo: y, flujo_operativo: f.flujo_operativo, capex: f.capex, pagos_arrendamientos: f.pagos_arrendamientos ?? 0, adquisiciones: f.adquisiciones, desinversiones: 0, dividendos: f.dividendos, recompras: f.recompras, emision_acciones: f.emision_acciones, intereses_en_financiacion: 0 };
});
const seg = (nombre, descripcion, filas) => ({ nombre, descripcion, tipo_resultado: 'EBITDA', historico: filas.map(([periodo, ingresos, resultado]) => ({ periodo, ingresos, resultado })) });
guarda('A', {
  _estado: 'completo',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 153577, ebitda: 17449, ebit: 14133, beneficio_neto: 8554, bpa: 28.84, dpa: 3.91, dpa_extraordinario: 0, fcf: 12899, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [
      { periodo: '2021', descripcion: 'Venta de Speedway (gasolineras) a 7-Eleven en mayo de 2021: 2020 y 2021 se presentan con Speedway como operación discontinuada; el beneficio de 2021 (9.738 M) incluye 8.448 M de la venta, fuera de esta serie.' },
      { periodo: '2025', descripcion: 'MPLX compra Northwind Midstream (2.375 M, agosto) y el 55 % restante de BANGL (julio); vende los activos de las Rocosas.' },
    ],
    comentario: 'La cuenta está en operaciones continuadas: refino y comercialización (R&M), midstream (MPLX) y diésel renovable [A1, A2]. Los ingresos siguen al precio del crudo (177.453 M en 2022, 132.699 M en 2025) y no dicen nada del negocio; lo que manda es el margen por barril. El EBITDA contable fue de 7.664 M en 2021, 24.684 M en 2022, 17.821 M en 2023, 10.133 M en 2024 y 11.542 M en 2025, con un margen de R&M de 23,00 USD/barril en 2023, 16,01 en 2024 y 16,87 en 2025 [A1]. 2026 es un año de pico: el margen de R&M subió a 36,33 USD/barril en el 2T26 (17,58 un año antes) por la guerra entre EE. UU. e Irán, y el beneficio atribuido del semestre fue de 5.649 M (19,30 USD por acción) [A3]. El midstream crece de forma estable (6.544 M de EBITDA ajustado en 2024, 6.750 M en 2025, 3.376 M en el 1S26) y hoy pesa la mitad del EBITDA en un año normal [A1, A3]. 2020 lleva 8.426 M de deterioros (7.394 M de fondo de comercio).',
    ajustes: 'Se usan las cifras publicadas (US GAAP) de operaciones continuadas. La empresa da un EBITDA ajustado que excluye las paradas programadas (1.553 M en 2025, 1.404 M en 2024) y partidas no asignadas: plusvalías por 897 M en 2025 (BANGL 484 M, etanol 254 M, Rocosas 159 M), acuerdos judiciales por 253 M y créditos fiscales de biocombustibles [A1]. Nuestro EBITDA es el contable (después de paradas), así que queda por debajo del ajustado: 11.542 M frente a 11.956 M en 2025 [A6]. El EBITDA incluye el resultado de participadas (1.622 M en 2025, con las plusvalías de revaluación), porque así lo presentan las cuentas y el consenso. En 2026 el BPA ajustado del semestre (19,22 USD) apenas difiere del publicado (19,30 USD) [A3].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '3T24', ingresos: 35107, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 2507, margen_ebitda_pct: 7.1, bpa: 1.87, vs_consenso: null },
      { periodo: '4T24', ingresos: 33137, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 2120, margen_ebitda_pct: 6.4, bpa: 1.15, vs_consenso: null },
      { periodo: '1T25', ingresos: 31517, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 1975, margen_ebitda_pct: 6.3, bpa: -0.24, vs_consenso: null },
      { periodo: '2T25', ingresos: 33799, crecimiento_pct: -10.9, crecimiento_organico_pct: null, ebitda: 3286, margen_ebitda_pct: 9.7, bpa: 3.96, vs_consenso: null },
      { periodo: '3T25', ingresos: 34809, crecimiento_pct: -0.8, crecimiento_organico_pct: null, ebitda: 3206, margen_ebitda_pct: 9.2, bpa: 4.51, vs_consenso: null },
      { periodo: '4T25', ingresos: 32574, crecimiento_pct: -1.7, crecimiento_organico_pct: null, ebitda: 3489, margen_ebitda_pct: 10.7, bpa: 5.12, vs_consenso: null },
      { periodo: '1T26', ingresos: 34200, crecimiento_pct: 8.5, crecimiento_organico_pct: null, ebitda: 2763, margen_ebitda_pct: 8.1, bpa: 1.73, vs_consenso: 'Superior' },
      { periodo: '2T26', ingresos: 51994, crecimiento_pct: 53.8, crecimiento_organico_pct: null, ebitda: 8460, margen_ebitda_pct: 16.3, bpa: 17.73, vs_consenso: 'Superior' },
    ],
    ultima_presentacion: 'EBITDA ajustado de la empresa (antes de paradas). En el 2T26 la dirección habló de ejecución: utilización del 94 %, margen capturado del 112 % y EBITDA de R&M de 24,84 USD por barril (27,01 en la costa del Golfo, 20,96 en el Medio Continente y 27,26 en la costa oeste) [A3, A9]. El BPA de 17,73 USD batió el consenso en 3,57 USD; el del 1T26 (1,65 USD ajustado) casi dobló lo esperado (0,75) [A9]. Entre la conferencia del 1T y la del 2T el discurso pasó de la utilización y las paradas a la asignación de capital: recompra adicional de 5.000 M aprobada en mayo, 2.800 M devueltos en el trimestre y una MPLX que sube un 12,5 % su distribución en 2026 y 2027 [A3, A5]. Los analistas preguntaron sobre todo cuánto dura el margen; la dirección habló de mercados «ajustados» hasta 2027 sin cuantificar la normalización, y no dio una cifra de margen de ciclo medio ni respondió si habrá recompras extraordinarias con la caja del pico.',
    confianza: 'Media',
  },
  balance: {
    historico,
    vencimientos: [
      { anio: '2026', importe: 2263 }, { anio: '2027', importe: 2014 }, { anio: '2028', importe: 1764 }, { anio: '2029', importe: 764 }, { anio: '2030', importe: 2614 }, { anio: '2031+', importe: 23600 },
    ],
    liquidez: 'Caja 7.768 M a 30-jun-2026 (1.000 M en MPLX) y línea de crédito de 5.000 M sin disponer [A3]',
    rating: 'Moody\'s Baa2, S&P BBB y Fitch BBB, todas con perspectiva estable [A4]',
    coste_deuda_pct: 4.9,
    vida_media_anios: 13,
    otros_pasivos: 'De los 32.816 M de deuda consolidada a 30-jun-2026, 25.640 M son de MPLX, sin recurso contra MPC, y 7.176 M de MPC [A3]. Pensiones y otros planes: 1.288 M de obligaciones a largo plazo [A4]. Pasivos por arrendamiento operativo de 1.476 M (US GAAP: fuera de la deuda). Provisiones y litigios medioambientales habituales del refino; en 2025 cobró 253 M por acuerdos judiciales [A1]. Sin factoring relevante declarado. La caja de junio está inflada por el circulante: proveedores subieron de 12.974 M a 19.227 M y clientes de 10.317 M a 15.740 M con el precio del producto [A4].',
    comentario: 'La deuda neta consolidada (deuda bruta menos caja) es de unos 25.000 M, pero el 78 % de la deuda es de MPLX y la sirve su propio flujo; MPC por sí sola tiene 7.176 M de deuda frente a 6.768 M de caja propia, prácticamente sin deuda neta [A3]. El circulante de un refinador oscila con el precio: en el 1S26 dio 2.314 M de caja (proveedores +6.253 M frente a clientes +5.394 M) que se devolverá cuando bajen los precios [A4]. La recompra de acciones se financió con caja y con la venta de Speedway: la autocartera pasó de 699 M a 712 M de acciones en el semestre [A4].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'La conversión en caja es alta en los años buenos (flujo operativo de 16.361 M en 2022 y 14.117 M en 2023) y cae con el margen (8.253 M en 2025) [A2]. El capex consolidado de 3.486 M en 2025 mezcla el de MPC (la empresa guía 1.500 M para 2026: el 65 % de mejora de rendimiento y el 35 % de mantenimiento) y el de crecimiento de MPLX (2.900 M en 2026, más de un 90 % en gas y LGN del Pérmico y Marcellus) [A3]. Estimación propia: el capex de mantenimiento ronda los 1.500-1.700 M al año (las paradas programadas, 1.400-1.550 M al año, van a gasto). Entre 2021 y 2025 la empresa recompró 46.811 M de acciones (las acciones diluidas bajaron de 638 M a 306 M) con la caja de Speedway y del pico de 2022-23 [A2]. En el 1S26 el flujo operativo fue de 11.448 M, con 2.314 M de circulante a favor [A4].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'PricewaterhouseCoopers LLP', anios_auditor: 16, opinion: 'Favorable',
    comentario: 'PwC audita a MPC desde 2010 con opinión favorable [A1]. El inventario va a LIFO: en un año de precios al alza el coste de ventas recoge los costes nuevos y la reserva LIFO amortigua los resultados; los ajustes LIFO fueron pequeños (72 M en 2025, 161 M en 2024) [A1]. Las paradas programadas se llevan a gasto (algunos competidores las activan y amortizan), lo que hace el EBITDA contable más prudente que el de Valero o Phillips 66. Partidas no recurrentes recientes: plusvalías de 897 M en 2025, deterioros de 8.426 M en 2020 [A1, A2]. Los pagos en acciones son pequeños frente al beneficio. El Altman Z, el Piotroski F y el Beneish M del motor se leen con cuidado: los ingresos y el circulante se mueven con el precio del crudo, y el Beneish puede marcar crecimientos de ventas y de cuentas a cobrar que son precio, no manipulación. Con la consolidación de MPLX el balance parece más endeudado de lo que está MPC.',
    senales: [
      { senal: 'Beneficio de 2026 dependiente de un margen excepcional', nivel: 'Media', comentario: 'No es una señal contable sino de calidad del beneficio: el 2T26 ganó 17,73 USD por acción con un margen de 36,33 USD/barril, el doble que un año antes [A3].' },
      { senal: 'Circulante a favor en el 1S26', nivel: 'Baja', comentario: 'Proveedores +6.253 M frente a clientes +5.394 M: caja que se devolverá cuando bajen los precios [A4].' },
      { senal: 'Plusvalías en 2025', nivel: 'Baja', comentario: '897 M de ventas y revaluaciones (BANGL, etanol, Rocosas) dentro del resultado de 2025 [A1].' },
    ],
    confianza: 'Media',
  },
  capital: {
    politica: 'Prioridades declaradas: mantener el negocio, el dividendo (1,00 USD trimestral desde julio de 2026, anual 4,00), proyectos de alta rentabilidad en el refino (1.500 M en 2026) y devolver el resto con recompras [A3]. El 5-may-2026 el consejo aprobó otros 5.000 M de recompra; a 30-jun quedaban 6.130 M disponibles, sin vencimiento [A4]. MPLX, que paga a MPC unos 2.790 M al año por sus 647 M de unidades, financia sola su crecimiento y su objetivo es subir la distribución un 12,5 % en 2026 y 2027 [A3, A4].',
    adquisiciones: [
      { anio: '2018', objetivo: 'Andeavor (refino y logística en el oeste)', importe: 23300, ev_ebitda: null, financiacion: 'Acciones y caja', resultado: 'Duplicó la capacidad y añadió la costa oeste; deterioros de 7.394 M de fondo de comercio en 2020 [A2].' },
      { anio: '2021', objetivo: 'Venta de Speedway a 7-Eleven', importe: 21000, ev_ebitda: null, financiacion: 'Desinversión en caja', resultado: 'Financió recompras masivas a precios de 60-150 USD por acción; buena decisión vista hoy.' },
      { anio: '2025', objetivo: 'Northwind Midstream (MPLX, Pérmico, gas ácido)', importe: 2375, ev_ebitda: null, financiacion: 'Bonos de MPLX', resultado: 'Integrada en el midstream; 360 M de fondo de comercio [A4].' },
      { anio: '2025', objetivo: 'BANGL (55 % restante, MPLX)', importe: 715, ev_ebitda: null, financiacion: 'Caja de MPLX', resultado: 'Plusvalía de 484 M por la revaluación de la parte que ya tenía [A1].' },
    ],
    comentario: 'La dirección ha sido buena asignadora de capital: vendió Speedway en el momento alto (21.000 M) y recompró más de la mitad de las acciones entre 2021 y 2025 a una fracción del precio de hoy. La compra de Andeavor fue cara (deterioros en 2020). El riesgo ahora es el contrario: recomprar en el pico del ciclo a 485 USD por acción; con el margen normalizado, cada dólar de recompra a este precio rinde menos que los de 2022-2024.',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      seg('Refino y comercialización', '13 refinerías, 2.986 mbpcd de capacidad de crudo', [['2023', null, 13705], ['2024', null, 5703], ['2025', null, 6138]]),
      seg('Midstream (MPLX)', 'Oleoductos, terminales, recogida y procesado de gas y LGN', [['2023', null, 6171], ['2024', null, 6544], ['2025', null, 6750]]),
      seg('Diésel renovable', 'Dickinson y Martinez (50 % con Neste)', [['2023', null, -64], ['2024', null, -150], ['2025', null, -110]]),
    ],
    kpis: [
      { kpi: 'Margen de R&M (USD/barril)', valor_anterior: '17,58 (2T25)', valor_actual: '36,33 (2T26)', variacion: '+107 %', comentario: 'Diferenciales de crack en máximos por la guerra con Irán [A3].' },
      { kpi: 'EBITDA de R&M por barril (USD)', valor_anterior: '5,63 (2025)', valor_actual: '24,84 (2T26)', variacion: '×4,4', comentario: '12,94 USD en 2023 [A1, A3].' },
      { kpi: 'Utilización de la capacidad de crudo', valor_anterior: '94 % (2025)', valor_actual: '94 % (2T26)', variacion: '=', comentario: 'Paradas en el Medio Continente en el 2T26 [A3].' },
      { kpi: 'Coste operativo del refino (USD/barril)', valor_anterior: '5,59 (2025)', valor_actual: '5,72 (2T26)', variacion: '+2 %', comentario: 'Guía de 5,60 para el 3T26 [A3].' },
      { kpi: 'EBITDA ajustado de midstream (M)', valor_anterior: '6.544 (2024)', valor_actual: '6.750 (2025)', variacion: '+3,1 %', comentario: '1.778 M en el 2T26 (+8,3 %) [A1, A3].' },
      { kpi: 'Acciones en circulación (M)', valor_anterior: '295,2 (1-feb-2026)', valor_actual: '280,8 (30-jul-2026)', variacion: '−4,9 %', comentario: 'Recompras [A4].' },
    ],
  },
  fuentes: fA,
  huecos: [
    { seccion: 'negocio', campo: 'ingresos por segmento', tipo: 'Complemento', intentos: '1) 10-K 2025: da el EBITDA ajustado por segmento pero los ingresos con ventas entre segmentos; 2) notas de prensa trimestrales: solo EBITDA; 3) XBRL: ingresos de terceros sin las ventas intersegmento', decision: 'Omitido' },
    { seccion: 'trimestres', campo: 'consenso previo de 3T24-4T25', tipo: 'Complemento', intentos: '1) Notas de prensa de la empresa: no lo dan; 2) Seeking Alpha (titulares): solo 2T26; 3) prensa: solo 1T26 y 2T26', decision: 'Omitido' },
  ],
});

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Refinery Capacity Report 2026 (capacidad operable a 1-ene-2026)', editor: 'U.S. Energy Information Administration', tipo: 'Sectorial', fecha: '2026-06', url: 'https://www.eia.gov/petroleum/refinerycapacity/refcap26.pdf' },
  { id: 2, titulo: 'Opinion: Iran war ushers in oil refining golden era. It won\'t last (Bousso)', editor: 'Hydrocarbon Processing / Reuters', tipo: 'Prensa', fecha: '2026-08-03', url: 'https://hydrocarbonprocessing.com/news/2026/08/opinion-iran-war-ushers-in-oil-refining-golden-era-it-won-t-last/' },
  { id: 3, titulo: 'Diesel Margins Top $100 a Barrel to Reach Record High as Supply Crunch Grows', editor: 'Energy News Beat', tipo: 'Prensa', fecha: '2026-08-18', url: 'https://energynewsbeat.co/diesel/diesel-margins-top-100-a-barrel-to-reach-record-high-as-supply-crunch-grows/' },
  { id: 4, titulo: 'Form 10-K 2025 (competencia, regulación, RFS, sensibilidades)', editor: 'Marathon Petroleum Corp. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-26', url: `${E}/000151029526000009/mpc-20251231.htm` },
  { id: 5, titulo: 'Valero Energy (VLO): estadísticas', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/vlo/statistics/' },
  { id: 6, titulo: 'Phillips 66 (PSX): estadísticas', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/psx/statistics/' },
  { id: 7, titulo: 'HF Sinclair (DINO): estadísticas', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/dino/statistics/' },
  { id: 8, titulo: 'PBF Energy (PBF): estadísticas', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/pbf/statistics/' },
  { id: 9, titulo: 'Trump to consider diesel export restrictions amid political pressure', editor: 'S&P Global Commodity Insights', tipo: 'Prensa', fecha: '2026-09-22', url: 'https://www.spglobal.com/energy/en/news-research/latest-news/crude-oil/092226-trump-to-consider-diesel-export-restrictions-amid-political-pressure' },
  { id: 10, titulo: 'Iran war disruptions send US refining margins to multi-year highs', editor: 'Baird Maritime / Reuters', tipo: 'Prensa', fecha: '2026-04', url: 'https://www.bairdmaritime.com/offshore/refining-processing/iran-war-disruptions-send-us-refining-margins-to-multi-year-highs' },
];
guarda('B', {
  _estado: 'completo',
  sector: {
    definicion: 'El mercado relevante es el refino de crudo en EE. UU.: convertir crudo en gasolina, destilados (diésel y queroseno de aviación) y otros productos, y venderlos al por mayor o a las marcas. Se mide en capacidad de destilación (barriles por día) porque el margen por barril es global y muy volátil, y el valor monetario del mercado depende del precio del crudo. Fuentes: la EIA (capacidad operable a 1 de enero) [B1] y el 10-K de MPC (márgenes de referencia y sensibilidades) [B4]. El midstream de MPLX (gas, LGN, oleoductos) es un negocio distinto, regulado o con contratos de tarifa, que se valora aparte (suma de partes).',
    tamano: '≈ 18,2 millones de barriles por día de capacidad operable en EE. UU. a 1-ene-2026, 130 refinerías [B1]',
    unidad_serie: 'miles de barriles por día de capacidad operable (1 de enero)',
    serie: [{ anio: '2025', tamano: 18450 }, { anio: '2026', tamano: 18200 }],
    tcac_historico_pct: -0.8, tcac_previsto_pct: -0.5, cr5_pct: 55, estructura: 'Moderadamente concentrada',
    drivers: [
      { driver: 'Guerra EE. UU.-Irán y cierre de Ormuz', efecto: '+', horizonte: 'Cíclico', evidencia: 'En el 2T26 la interrupción quitó ≈5 M de barriles/día, un 6 % del refino mundial anterior a la guerra; el indicador de bp pasó de 12 USD/barril a 30 en el 2T26 y 42 en lo que iba del 3T [B2].' },
      { driver: 'Refinerías rusas dañadas y veto ruso a la exportación de diésel', efecto: '+', horizonte: 'Cíclico', evidencia: 'Rusia prorrogó la prohibición de exportar diésel al menos hasta enero; el diferencial del diésel en EE. UU. tocó 102,20 USD/barril el 17-ago-2026 frente a 15-25 USD antes de la crisis [B3].' },
      { driver: 'Inventarios de destilados en mínimos', efecto: '+', horizonte: 'Cíclico', evidencia: '107,1 M de barriles el 7-ago-2026, el nivel más bajo para esa época desde 1996 [B3].' },
      { driver: 'Cierres de capacidad en EE. UU.', efecto: '+', horizonte: 'Estructural', evidencia: 'LyondellBasell Houston (264 mbpd), Phillips 66 Los Ángeles (139 mbpd) y Valero Benicia (145 mbpd) cerraron en 2025-2026; la capacidad bajó un 1 % en 2025 [B1].' },
      { driver: 'Nueva capacidad en Asia, Oriente Medio y África', efecto: '−', horizonte: 'Estructural', evidencia: 'Varios países revisan si necesitan refino propio tras la crisis, y esas inversiones pueden acabar en exceso de capacidad [B2].' },
      { driver: 'Electrificación y biocombustibles', efecto: '−', horizonte: 'Estructural', evidencia: 'El RFS obliga a comprar RIN (1.330 M de gasto en 2025 para MPC) y el vehículo eléctrico erosiona la gasolina a largo plazo [B4].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 4, justificacion: 'Producto indiferenciado y margen fijado por el mercado mundial; las refinerías marginales de Europa y Asia marcan el precio.' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Mayoristas y marcas compran por precio; MPC tiene canal propio (marca Marathon y ARCO) que da algo de salida.' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'El crudo es una materia prima global con muchos vendedores; EE. UU. tiene crudo propio barato (diferencial dulce y ácido: 520 M por dólar) [B4].' },
      { fuerza: 'Amenaza de entrada', intensidad: 1, justificacion: 'No se construye una refinería nueva en EE. UU. desde 1977 por permisos y coste; la capacidad baja [B1].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'Vehículo eléctrico y biocombustibles a largo plazo; el queroseno y el diésel tienen menos sustitutos que la gasolina.' },
    ],
    ciclo: { posicion: 'Madurez del ciclo', comentario: 'El margen está en máximos históricos (diésel a 102 USD/barril, tres a seis veces lo normal) por un choque de oferta, no por demanda [B3]. Los precedentes dicen que estos picos duran 12-24 meses: tras 2022 (Ucrania), el margen de MPC pasó de 23,00 USD/barril en 2023 a 16,01 en 2024 [B4]. En 2008-09 y 2020 el refino perdió dinero (MPC −9.826 M en 2020). La opinión de Reuters es que la edad de oro no durará; Wood Mackenzie espera márgenes fuertes hasta el final de la década [B2].' },
    regulacion: 'El Renewable Fuel Standard (RFS) obliga a mezclar biocombustibles o comprar RIN; en agosto de 2026 la EPA concedió el mayor número de exenciones a refinerías pequeñas desde 2017 (positivo para el sector). California impone penalizaciones por margen máximo, inventarios mínimos y un sistema de cap and invest [B4]. El riesgo nuevo es político: en septiembre de 2026 el presidente apoyó prohibir la exportación de diésel durante 90 días para bajar el precio interior; a principios de octubre no había decisión y se negociaban límites voluntarios [B9].',
    tendencias: 'La guerra ha cambiado el mapa: EE. UU. pasó a ser el proveedor de último recurso de diésel y queroseno, con refinerías al 97 % de su capacidad [B2, B10]. MPC gana con eso porque tiene crudo barato y capacidad de exportación en la costa del Golfo (Galveston Bay y Garyville). A largo plazo el vehículo eléctrico erosiona la gasolina (el 49 % de su producción), y el diésel renovable es un negocio pequeño y sin margen fuera de los créditos. La IA no cambia el negocio, salvo en la optimización de las plantas.',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 16.4,
    posicion: '1.º refinador de EE. UU. por capacidad (2.986 mbpcd de 18.200, ≈16 %) [B1, B4]; MPLX es uno de los mayores midstream del país',
    competidores: [
      { nombre: 'Valero Energy', pais: 'EE. UU.', ticker: 'VLO', ingresos: 132430, cuota_pct: null, margen_ebit_pct: null, comentario: 'Mayor refinador independiente; EBITDA de 13.380 M en los últimos 12 meses (10,1 % de las ventas), sin midstream comparable [B5].' },
      { nombre: 'Phillips 66', pais: 'EE. UU.', ticker: 'PSX', ingresos: 152170, cuota_pct: null, margen_ebit_pct: null, comentario: 'Refino, midstream y química (CPChem con Chevron); EBITDA de 9.930 M en 12 meses (6,5 %) [B6].' },
      { nombre: 'HF Sinclair', pais: 'EE. UU.', ticker: 'DINO', ingresos: 31230, cuota_pct: null, margen_ebit_pct: null, comentario: 'Refino en el interior y las Rocosas, lubricantes y marca Sinclair; EBITDA de 3.210 M (10,3 %) [B7].' },
      { nombre: 'PBF Energy', pais: 'EE. UU.', ticker: 'PBF', ingresos: 34370, cuota_pct: null, margen_ebit_pct: null, comentario: 'Refinador puro de costa este y oeste; EBITDA de 969 M (2,8 %) en 12 meses [B8].' },
      { nombre: 'ExxonMobil (refino de EE. UU.)', pais: 'EE. UU.', ticker: 'XOM', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Baytown y Beaumont; integrado, no comparable en valoración.' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'La red de oleoductos y terminales de MPLX conecta las refinerías con el crudo y los mercados; no es un efecto de red con clientes.' },
        { fuente: 'Costes de cambio', puntuacion: 1, evidencia: 'Los clientes del refino cambian de proveedor por precio; los contratos de MPLX con productores sí tienen plazo y compromisos mínimos.' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 2, evidencia: 'Permisos de refinerías que ya no se conceden en EE. UU. (ninguna nueva desde 1977) y marcas Marathon y ARCO [B1].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Crudo estadounidense y canadiense con descuento (50 % ácido), escala y margen capturado del 105 % en 2025 y 112 % en el 2T26 [B4].' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'Mayor sistema de refino del país (13 refinerías) y logística integrada con MPLX, que cobra 3,69 USD por barril a MPC [B4].' },
      ],
    },
    amenazas: 'El foso no protege el margen: el precio lo pone la refinería marginal del mundo, y cuando se reparen las refinerías de Oriente Medio y Rusia y se reabra Ormuz, el margen volverá hacia 15-17 USD/barril (2024-2025) [B2, B4]. Probabilidad alta en 2027-2028. La segunda amenaza es política: una prohibición de exportar diésel recortaría el margen del Golfo, el más alto del sistema [B9]. La tercera, a largo plazo, es la caída de la demanda de gasolina.',
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'Marathon Petroleum es el mayor refinador de EE. UU.: 13 refinerías con 2.986 mbpcd de capacidad de crudo en la costa del Golfo (Galveston Bay, Garyville), el Medio Continente y la costa oeste (Los Ángeles, Anacortes) [B4]. Vende gasolina (49 % de lo que produce), destilados (38 %) y otros productos a mayoristas, a su red de marca (Marathon y ARCO) y a la exportación. Además controla MPLX (64 % de las unidades y el socio general), una sociedad cotizada de oleoductos, terminales, recogida y procesado de gas y fraccionamiento de LGN en el Pérmico y Marcellus, y tiene dos plantas de diésel renovable (Dickinson y Martinez, esta al 50 % con Neste).',
    como_gana_dinero: 'En el refino gana la diferencia entre el precio de los productos y el del crudo (el margen de R&M, 16,87 USD/barril en 2025 y 36,33 en el 2T26), menos el coste operativo (≈5,6 USD) y el de distribución (≈5,7 USD, de los que 3,69 son tarifas a MPLX) [B4]. Cada dólar de diferencial de crack mueve el EBITDA anual en 1.125 M, y cada dólar de diferencial ácido o dulce en 520 M: el apalancamiento operativo es enorme. Nada es recurrente en el refino. El midstream sí: tarifas de oleoducto y procesado con contratos y compromisos mínimos, 6.750 M de EBITDA en 2025 y crecimiento de un dígito alto [B4]. Estacionalidad: el 2T y el 3T son los fuertes (gasolina de verano); las paradas se concentran en el 1T.',
    geografias: [{ nombre: 'Estados Unidos', peso_pct: 88 }, { nombre: 'Exportación y otros', peso_pct: 12 }],
    geografias_criterio: 'destino',
    clientes: 'No hay concentración relevante: miles de clientes mayoristas, marcas independientes y exportadores; ninguno pesa más del 10 % de los ingresos [B4]. El poder de precios es nulo en el refino (el margen lo fija el mercado mundial) y alto en el midstream, donde las tarifas suben con la inflación y los contratos tienen volúmenes mínimos. La ventaja de MPC no es cobrar más sino capturar más del margen de referencia: 105 % en 2025 y 112 % en el 2T26, gracias al crudo con descuento y a la logística propia.',
  },
  historia: {
    resumen: 'Marathon Petroleum nació en 2011 al separarse el negocio de refino de Marathon Oil, la petrolera fundada en Ohio en 1887. En 2012 sacó a bolsa MPLX para sus activos logísticos y en 2015 MPLX compró MarkWest, entrando en el gas del Marcellus. En 2018 compró Andeavor por unos 23.300 M en acciones y caja y se convirtió en el mayor refinador del país. En 2020 perdió 9.826 M con la pandemia y deterioros, y en 2021 vendió Speedway a 7-Eleven por 21.000 M, dinero que dedicó a recomprar la mitad de sus acciones. Desde 2024 la dirige Maryann Mannen, antes directora financiera.',
    hitos: [
      { anio: '2011', hito: 'Escisión de Marathon Oil; cotiza en la Bolsa de Nueva York.' },
      { anio: '2012', hito: 'Salida a bolsa de MPLX.' },
      { anio: '2015', hito: 'MPLX compra MarkWest: gas y LGN en el Marcellus.' },
      { anio: '2018', hito: 'Compra de Andeavor: costa oeste y mayor refinador de EE. UU.' },
      { anio: '2020', hito: 'Pandemia: pérdida de 9.826 M con 7.394 M de deterioro del fondo de comercio.' },
      { anio: '2021', hito: 'Venta de Speedway a 7-Eleven por 21.000 M; inicio de las recompras masivas.' },
      { anio: '2022', hito: 'Pico de márgenes por la guerra de Ucrania: beneficio de 14.516 M.' },
      { anio: '2024', hito: 'Maryann Mannen, consejera delegada.' },
      { anio: '2026', hito: 'Guerra EE. UU.-Irán: margen de R&M de 36,33 USD/barril en el 2T26; la acción triplica.' },
    ],
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Lo material es el carbono y la seguridad. El RFS le costó 1.330 M en RIN en 2025 [B4]. California obliga a inventarios mínimos y castiga márgenes altos, y su cap and invest añade coste a Los Ángeles y Martinez. La seguridad de procesos (incendios y escapes) es el riesgo operativo con más coste potencial. El negocio de diésel renovable no da dinero sin créditos (EBITDA de −110 M en 2025) [B4].',
    controversias: 'Litigios medioambientales habituales del sector y demandas climáticas de estados y municipios contra petroleras, en las que MPC figura como demandada junto a otras; en 2025 cobró 253 M netos por acuerdos judiciales [B4]. No consta ninguna sanción grande en los últimos tres años.',
    confianza: 'Baja',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) Informe de sostenibilidad de MPC: no publica sus notas; 2) MSCI y Sustainalytics: de pago; 3) prensa: sin cifras recientes', decision: 'Omitido' },
    { seccion: 'sector', campo: 'serie larga de capacidad', tipo: 'Complemento', intentos: '1) EIA Refinery Capacity Report 2026: da 2025 y 2026; 2) tabla histórica de la EIA: no abierta; 3) prensa sectorial: solo el récord de mayo de 2020 (18,98 M)', decision: 'Omitido' },
  ],
});

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Proxy Statement 2026 (DEF 14A): consejo, comisiones, remuneración, accionistas', editor: 'Marathon Petroleum Corp. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-03-16', url: `${E}/000151029526000023/mpc-20260316.htm` },
  { id: 2, titulo: 'Form 8-K: resultados de la junta de 2026 (votos)', editor: 'Marathon Petroleum Corp. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-05-01', url: `${E}/000151029526000033/mpc-20260429.htm` },
  { id: 3, titulo: 'Marathon Petroleum Corp. Elects Maryann T. Mannen as Chairman of the Board', editor: 'Marathon Petroleum Corp. / SEC EDGAR', tipo: 'Primaria', fecha: '2025-11-04', url: `${E}/000151029525000065/mpcex991mpcchairman.htm` },
  { id: 4, titulo: 'Marathon Petroleum Corp. Names Maria A. Khoury as Chief Financial Officer', editor: 'Marathon Petroleum Corp. / SEC EDGAR', tipo: 'Primaria', fecha: '2025-12-18', url: `${E}/000151029525000070/mpcex991mpcdec12.htm` },
  { id: 5, titulo: 'Form 4 de MPC presentados entre 15-oct-2025 y 15-oct-2026 (form4.mjs)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001510295&type=4' },
  { id: 6, titulo: 'Form 8-K: fallecimiento del consejero Abdulaziz F. Alkhayyal', editor: 'Marathon Petroleum Corp. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-06-29', url: `${E}/000151029526000055/mpc-20260626.htm` },
  { id: 7, titulo: 'Notas de prensa de resultados 2T25-2T26 (guía trimestral de producción frente a lo real)', editor: 'Marathon Petroleum Corp. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-04', url: `${E}/000151029526000060/mpcq22026earningsrelease.htm` },
];
const ins = (fecha, persona, acciones, importe) => ({ fecha, persona, operacion: 'Venta', acciones, importe });
guarda('C', {
  _estado: 'completo',
  directivos: {
    equipo: [
      { nombre: 'Maryann T. Mannen', cargo: 'Presidenta del consejo y consejera delegada', desde: '2024', participacion_pct: 0.04, trayectoria: 'Directora financiera de MPC (2021-2024) y antes de TechnipFMC y FMC Technologies. Consejera delegada desde agosto de 2024 y presidenta desde enero de 2026 [C3]. Con ella la empresa ha mantenido la utilización del 94 % y la captura de margen por encima del 100 %.' },
      { nombre: 'Maria A. Khoury', cargo: 'Directora financiera', desde: '2026', participacion_pct: 0, trayectoria: 'Viene de Danaher (directora financiera de biotecnología: Cytiva y Pall) y antes de GE Oil & Gas; incorporada el 19-ene-2026 [C4]. Sin historial en el refino.' },
      { nombre: 'Rick D. Hessling', cargo: 'Director comercial', desde: '2021', participacion_pct: 0, trayectoria: 'Responsable de la captura de margen (105 % en 2025) [C1].' },
      { nombre: 'Molly R. Benson', cargo: 'Directora jurídica y secretaria del consejo', desde: '2021', participacion_pct: 0.02, trayectoria: 'Abogada de la casa; vendió 17.196 acciones en agosto de 2026 con un plan 10b5-1 [C5].' },
      { nombre: 'Michael A. Henschen', cargo: 'Vicepresidente ejecutivo de Refino', desde: '2024', participacion_pct: 0, trayectoria: 'Responsable de las 13 refinerías; vendió 17.636 acciones en 2026 [C5].' },
      { nombre: 'John P. Surma', cargo: 'Consejero independiente coordinador', desde: '2011', participacion_pct: 0.02, trayectoria: 'Antiguo presidente y consejero delegado de U.S. Steel [C1].' },
    ],
    historial_guidance: [
      { anio: '3T25', guia: 'Carga total de refino de 2.940 mbpd', real: '≈3,0 M bpd, utilización del 95 %', cumplida: 'Sí' },
      { anio: '4T25', guia: 'Carga total de 2.905 mbpd', real: '≈3,0 M bpd, utilización del 95 %', cumplida: 'Sí' },
      { anio: '1T26', guia: 'Carga total de 2.740 mbpd (paradas)', real: '≈2,9 M bpd, utilización del 89 %', cumplida: 'Sí' },
      { anio: '2T26', guia: 'Carga total de 2.990 mbpd', real: '2.944 mbpd, utilización del 94 %', cumplida: 'Parcial' },
      { anio: '2025-2026', guia: 'MPLX: subir la distribución un 12,5 % al año', real: '1,0765 USD trimestrales en 2026 (+12,5 %)', cumplida: 'Sí' },
    ],
    comentario: 'Equipo creíble en la ejecución: cumple la guía de carga casi siempre, mantiene la utilización en el 94 % y captura más margen que el de referencia [C7]. La dirección cambió mucho en 2024-2026: Mannen pasó de directora financiera a consejera delegada y presidenta (el antiguo presidente ejecutivo Hennigan se retiró en enero de 2026), y llegó una directora financiera de fuera del sector [C3, C4]. No hay plan de sucesión público. Los directivos venden y nadie compra: 13,9 M de ventas en 12 meses, sin una sola compra [C5].',
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      { nombre: 'Maryann T. Mannen', cargo: 'Presidenta y consejera delegada', tipo: 'Ejecutivo', desde: '2024', comisiones: 'Ejecutiva' },
      { nombre: 'John P. Surma', cargo: 'Consejero coordinador', tipo: 'Independiente', desde: '2011', comisiones: 'Ejecutiva; Remuneración' },
      { nombre: 'Evan Bayh', cargo: 'Consejero', tipo: 'Independiente', desde: '2011', comisiones: 'Sostenibilidad y políticas públicas (presidente)' },
      { nombre: 'Jonathan Z. Cohen', cargo: 'Consejero', tipo: 'Independiente', desde: '2019', comisiones: 'Gobierno; Finanzas' },
      { nombre: 'Frank M. Semple', cargo: 'Consejero', tipo: 'Independiente', desde: '2021', comisiones: 'Remuneración' },
      { nombre: 'J. Michael Stice', cargo: 'Consejero', tipo: 'Independiente', desde: '2017', comisiones: 'Auditoría; Sostenibilidad' },
      { nombre: 'Kim K.W. Rucker', cargo: 'Consejera', tipo: 'Independiente', desde: '2018', comisiones: 'Gobierno' },
      { nombre: 'Jeffrey C. Campbell', cargo: 'Consejero', tipo: 'Independiente', desde: '2024', comisiones: 'Auditoría' },
      { nombre: 'Kimberly N. Ellison-Taylor', cargo: 'Consejera', tipo: 'Independiente', desde: '2024', comisiones: 'Auditoría' },
      { nombre: 'Eileen P. Paterson', cargo: 'Consejera', tipo: 'Independiente', desde: '2024', comisiones: 'Sostenibilidad' },
    ],
    presidente_ceo_separados: false, presidente_ejecutivo: true, consejero_coordinador: true, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: true, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false, accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 1,
    voto_remuneracion_pct: 97.0, voto_remuneracion_contra_pct: 2.5, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 19.02, fijo: 1.4, variable_corto: 3.3, variable_largo: 13.39, ratio_salario_medio: 102 },
    remuneracion: 'La consejera delegada cobró 19,02 M en 2025: 1,40 M de fijo, 3,30 M de bonus anual y 13,39 M en acciones [C1]. El 60 % del incentivo a largo plazo son acciones por objetivos ligadas a la rentabilidad total para el accionista frente a un grupo de comparables (tres años: 67 %, percentil 83), y el bonus anual mide, con un 30 %, el EBITDA por barril frente a otros refinadores [C1]. Premia batir a los competidores, no el nivel del margen, lo que está bien en un negocio cíclico. Ratio frente al empleado medio: 102 veces (186.132 USD) [C1]. En la junta de 2026 el voto consultivo sobre la remuneración tuvo un 97,0 % a favor y un 2,5 % en contra de los votos emitidos [C2].',
    accionistas: [
      { nombre: 'The Vanguard Group', pct: 13.2, tipo: 'Institucional', variacion: 'Estable (13G)' },
      { nombre: 'State Street', pct: 8.5, tipo: 'Institucional', variacion: 'Estable' },
      { nombre: 'BlackRock', pct: 7.1, tipo: 'Institucional', variacion: 'Estable' },
      { nombre: 'Consejeros y directivos (18)', pct: 0.17, tipo: 'Insiders', variacion: '490.661 acciones a 1-feb-2026' },
    ],
    insiders: [
      ins('2026-08-17', 'Molly R. Benson (directora jurídica), plan 10b5-1', 17196, 6.17),
      ins('2026-08-12', 'Michael A. Henschen (refino), feb-ago 2026', 17636, 4.83),
      ins('2026-08-31', 'Shawn M. Lyon (MPLX), ago 2026', 3925, 1.41),
      ins('2026-05-13', 'Rick D. Hessling (comercial), mar-may 2026', 5473, 1.27),
      ins('2026-08-27', 'Erin M. Brzezinski (controller)', 570, 0.21),
    ],
    control_y_defensas: 'Sin accionista de control: los tres primeros son gestoras indexadas (28,8 % entre las tres) [C1]. Una acción, un voto. Las defensas son las del consejo clasificado y las mayorías reforzadas de los estatutos: en la junta de 2026 la propuesta de la propia empresa para desclasificar el consejo tuvo 206 M de votos a favor y solo 1,4 M en contra, pero no llegó al 80 % de las acciones en circulación que exigen los estatutos, y lo mismo pasó con la eliminación de las mayorías reforzadas [C2]. Operaciones vinculadas: MPC y MPLX se cobran tarifas y se venden activos entre sí (3,69 USD por barril de tarifas a MPLX en 2025), con un comité de conflictos en MPLX.',
    alertas: [
      'Directivos solo venden: 13,9 M en 12 meses, 6,2 M con plan 10b5-1, y ninguna compra [C5].',
      'El consejo sigue clasificado y con mayorías reforzadas: las propuestas para eliminarlos no alcanzaron el 80 % en 2026 [C2].',
      'Directora financiera nueva (enero de 2026) sin experiencia en refino [C4].',
    ],
    confianza: 'Alta',
  },
  fuentes: fC,
  huecos: [],
});

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de MPC, SPY y XLE (bolsa.mjs) y movimiento del precio (movimiento.mjs)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/quote/MPC/history' },
  { id: 2, titulo: 'Marathon Petroleum Corporation: finanzas y estimaciones 2026-2028, objetivo medio', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-15', url: 'https://www.marketscreener.com/quote/stock/MARATHON-PETROLEUM-CORPOR-8251813/finances/' },
  { id: 3, titulo: 'MPC: previsiones de analistas (19 analistas, objetivo 442,33 USD, BPA 2026 y 2027)', editor: 'Stock Analysis', tipo: 'Analistas', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/mpc/forecast/' },
  { id: 4, titulo: 'MPC: estadísticas (capitalización, valor empresa, posición corta, accionistas)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/mpc/statistics/' },
  { id: 5, titulo: 'Rentabilidad del bono del Tesoro a 10 años (DGS10): 5,21 % el 13-oct-2026', editor: 'FRED, Banco de la Reserva Federal de San Luis', tipo: 'Primaria', fecha: '2026-10-13', url: 'https://fred.stlouisfed.org/series/DGS10' },
  { id: 6, titulo: 'Implied ERP by month (ERPbymonth.xlsx): 4,20 % en octubre de 2026', editor: 'Aswath Damodaran, NYU Stern', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 7, titulo: 'Valero Energy (VLO): estadísticas', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/vlo/statistics/' },
  { id: 8, titulo: 'Phillips 66 (PSX): estadísticas', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/psx/statistics/' },
  { id: 9, titulo: 'HF Sinclair (DINO): estadísticas', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/dino/statistics/' },
  { id: 10, titulo: 'PBF Energy (PBF): estadísticas', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/pbf/statistics/' },
  { id: 11, titulo: 'Delek US (DK): estadísticas', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/dk/statistics/' },
  { id: 12, titulo: 'Par Pacific (PARR): estadísticas', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/parr/statistics/' },
  { id: 13, titulo: 'CVR Energy (CVI): estadísticas', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/cvi/statistics/' },
  { id: 14, titulo: 'Exclusive: Phillips 66, Marathon held now-scuttled merger talks', editor: 'Semafor', tipo: 'Prensa', fecha: '2026-08-14', url: 'https://semafor.com/article/08/14/2026/phillips-66-marathon-held-now-scuttled-merger-talks' },
  { id: 15, titulo: 'Titulares de MPC (Jefferies rebaja a Valero y Marathon el 22-sep; apoyo a la prohibición de exportar diésel; exenciones de la EPA)', editor: 'Seeking Alpha', tipo: 'Prensa', fecha: '2026-09-25', url: 'https://seekingalpha.com/symbol/MPC/news' },
  { id: 16, titulo: 'White House edges closer to 90-day US diesel export ban despite cabinet pushback', editor: 'investingLive', tipo: 'Prensa', fecha: '2026-09-23', url: 'https://investinglive.com/commodities/white-house-edges-closer-to-90-day-us-diesel-export-ban-despite-cabinet-pushback/' },
  { id: 17, titulo: 'Marathon Petroleum Corp. to Report Third-Quarter Financial Results on November 3, 2026', editor: 'Marathon Petroleum Corp. (vía Finviz)', tipo: 'Primaria', fecha: '2026-09-17', url: 'https://finviz.com/news/393371/marathon-petroleum-corp-to-report-third-quarter-financial-results-on-november-3-2026' },
  { id: 18, titulo: 'Form 10-Q del 2T26 (647 M de unidades de MPLX, acciones a 30-jul-2026)', editor: 'Marathon Petroleum Corp. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-04', url: `${E}/000151029526000061/mpc-20260630.htm` },
  { id: 19, titulo: 'Trump pushes Treasury for diesel price relief as export ban threat lingers', editor: 'roic.ai (noticias)', tipo: 'Prensa', fecha: '2026-10-05', url: 'https://www.roic.ai/news/trump-pushes-treasury-for-diesel-price-relief-as-export-ban-threat-lingers-10-05-2026' },
];
const B = BOLSA.bolsa;
const comp = (nombre, ticker, capitalizacion, ev_ventas, ev_ebitda_ltm, per_ntm, margen, roic, dn, fcf) => ({ nombre, ticker, pais: 'US', capitalizacion, ev_ventas, ev_ebitda_ltm, ev_ebitda_ntm: null, per_ntm, crecimiento_pct: null, margen_ebitda_pct: margen, roic_pct: roic, dn_ebitda: dn, fcf_yield_pct: fcf });
guarda('D', {
  _estado: 'completo',
  identificacion: {
    nombre: 'Marathon Petroleum Corporation', nombre_corto: 'Marathon Petroleum', ticker: 'MPC', isin: 'US56585A1025', mercado: 'Bolsa de Nueva York (NYSE)', indice_referencia: 'S&P 500',
    pais: 'Estados Unidos', pais_iso: 'US', sector: 'Energía', industria: 'Refino y comercialización de petróleo y gas', sede: 'Findlay (Ohio)', fundacion: '2011', empleados: 18500, web: 'www.marathonpetroleum.com',
    precio: BOLSA.identificacion.precio, fecha_precio: BOLSA.identificacion.fecha_precio, acciones: 281.0, capitalizacion_publicada: 133500, free_float_pct: 99.7,
    max_52s: BOLSA.identificacion.max_52s, min_52s: BOLSA.identificacion.min_52s, volumen_medio_diario: '≈ 937 M USD/día (3 meses)', proximos_resultados: '2026-11-03',
  },
  consenso: {
    guidance: 'MPC no da guía de beneficio, solo operativa: para el 3T26, carga de 3.005 mbpd, coste operativo de 5,60 USD/barril, distribución de 1.650 M y paradas de 290 M; capex de 2026 de 1.500 M sin MPLX y de 2.900 M en MPLX (subido 500 M en agosto) [A3]. MPLX sube su distribución un 12,5 % en 2026 y 2027. Confirmado el 4-ago-2026.',
    estimaciones: [
      { periodo: '2026e', ingresos: 171706, ebitda: 30454, ebit: 27080, bpa: 64.86, dpa: 4.08, fuente: 'MarketScreener [D2]' },
      { periodo: '2027e', ingresos: 152312, ebitda: 25929, ebit: 22594, bpa: 62.38, dpa: 4.41, fuente: 'MarketScreener [D2]' },
      { periodo: '2028e', ingresos: 154549, ebitda: 16990, ebit: 12804, bpa: 41.96, dpa: 4.66, fuente: 'MarketScreener [D2]' },
    ],
    recomendaciones: { n_analistas: 19, comprar: null, mantener: null, vender: null, po_medio: 442.33, po_min: 236, po_max: 560 },
    revisiones: 'Las estimaciones se han disparado en 2026 con el margen: el BPA del 2T26 batió en 3,57 USD y el del 1T26 casi dobló el esperado [A9]. Stock Analysis da un BPA de 63,34 USD para 2026 y 55,19 para 2027 (11 analistas) y MarketScreener 64,86 y 62,38; el objetivo medio de 19 analistas es de 442,33 USD (mediana 451,5, rango 236-560), por debajo del precio [D2, D3]. Tendencia de 3 meses: subidas de objetivos, aunque Jefferies rebajó la recomendación de Valero y Marathon el 22-sep por la subida acumulada [D15]. El consenso sigue bajando el BPA hacia 2028 (41,96), es decir, también espera normalización. El EBITDA del consenso es el ajustado de la empresa (sin paradas).',
    base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: 1.1,
    confianza: 'Media',
  },
  bolsa: {
    tipo_rentabilidad: B.tipo_rentabilidad, rentabilidades: B.rentabilidades, anual: B.anual,
    beta: B.beta, volatilidad_pct: B.volatilidad_pct, max_drawdown_pct: B.max_drawdown_pct, posicion_corta_pct: 2.51,
    comentario: 'La acción ha subido un 201,6 % en 2026 (S&P 500 +13,7 %, energía +54,3 %) y un 168,2 % en un año, siguiendo el margen de refino: subió con los ataques a refinerías de Oriente Medio y el cierre de Ormuz, cayó en junio con el acuerdo de paz (la energía bajó en bloque el 15-jun) y volvió a subir en verano con los diferenciales del diésel por encima de 100 USD/barril [D1, D15]. En diez años ha dado un 31,7 % anual frente al 15,5 % del S&P 500, ayudada por la recompra de más de la mitad de las acciones. La beta es baja (0,54) pero la volatilidad alta (35,8 %): el riesgo es del ciclo del margen, no del mercado. Posición corta del 2,51 % [D4].',
  },
  multiplos_historicos: {
    serie: BOLSA.cierres_ejercicio.filter((c) => ANIOS.includes(c.anio)).map((c) => ({ anio: c.anio, precio_cierre: c.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: c.anio === '2020' })),
    comentario: 'Los múltiplos de un refinador engañan: el PER de los últimos 12 meses es bajo en los picos (en 2022, 116,39 USD frente a un BPA de 27,98: 4,2 veces) y alto en los valles. Por eso la historia del PER a 12 meses se construye con los años de margen normal y se excluye 2020 (pérdidas). El mercado paga hoy unas 11 veces nuestro BPA de 2027 y unas 17,6 veces el de ciclo medio de 2028, frente a 10-15 veces en los años normales (2017, 2018, 2023, 2024).',
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Refinadores cotizados en EE. UU. con datos del mismo proveedor y del mismo día (Stock Analysis, 15-oct-2026): Valero, Phillips 66, HF Sinclair, PBF, Delek, Par Pacific y CVR Energy [D7-D13]. Fuera las integradas (ExxonMobil, Chevron), donde pesa la producción de crudo. Ninguno tiene un midstream del tamaño de MPLX salvo Phillips 66. El PER adelantado y el EV/EBITDA de los últimos 12 meses están en el pico del ciclo, así que no sirven para valorar a ciclo medio: los comparables pesan 0.',
    empresas: [
      comp('Valero Energy', 'VLO', 128130, 1.0, 9.88, 7.2, 10.1, 25.15, 0.26, 7.86),
      comp('Phillips 66', 'PSX', 116190, 0.88, 13.43, 7.73, 6.5, 12.23, 1.66, 5.47),
      comp('HF Sinclair', 'DINO', 22290, 0.76, 7.42, 5.9, 10.3, 17.27, 0.34, 10.18),
      comp('PBF Energy', 'PBF', 10330, 0.35, 12.35, 3.03, 2.8, 6.15, 1.67, 7.18),
      comp('Delek US', 'DK', 4710, 0.63, 7.19, 4.51, 8.8, 18.54, 2.65, 14.09),
      comp('Par Pacific', 'PARR', 4280, 0.63, 4.21, 3.88, 14.8, 30.6, 0.74, 9.28),
      comp('CVR Energy', 'CVI', 6150, 0.86, 9.45, 8.94, 9.1, 13.61, 1.37, 5.53),
    ],
    comentario: 'MPC cotiza a 6,4 veces el beneficio de los próximos 12 meses según Stock Analysis, por encima de la mediana de los refinadores (5,9 veces) y en línea con Valero (7,2) y Phillips 66 (7,7) [D4, D7, D8]. La prima se explica por MPLX: la mitad del EBITDA normal de MPC es midstream estable, que el mercado paga a 11-12 veces. Los múltiplos de todos están calculados sobre beneficios de pico: aplicar el PER de 5,9 veces a nuestro BPA de ciclo medio de 2028 (27,6 USD) daría unos 160 USD, una cifra sin sentido porque ese PER solo existe porque el mercado ya descuenta la caída del beneficio. Por eso no pesan en el valor.',
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2018-10', objetivo: 'Andeavor', comprador: 'Marathon Petroleum', ev: 35600, ev_ventas: null, ev_ebitda: null, prima_pct: 24, excluir: false, comentario: 'Fusión en acciones y caja; prima del 24 % anunciada.' },
      { fecha: '2021-05', objetivo: 'Speedway (gasolineras)', comprador: '7-Eleven', ev: 21000, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: true, comentario: 'Comercio minorista de carburante, no refino.' },
      { fecha: '2025-08', objetivo: 'Northwind Midstream', comprador: 'MPLX', ev: 2375, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: true, comentario: 'Midstream (gas ácido en el Pérmico) [D18].' },
      { fecha: '2026-08', objetivo: 'Phillips 66 + Marathon (conversaciones rotas)', comprador: 'n.d.', ev: null, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: true, comentario: 'Fusión de ≈180.000 M estudiada en 2026 y abandonada por la competencia y por MPLX [D14].' },
    ],
    comentario: 'Hay pocas transacciones de refino con múltiplo publicado: las refinerías cambian de manos por precios por barril de capacidad, a menudo con el inventario aparte, y las grandes fusiones (Andeavor en 2018) se hicieron en acciones. Lo relevante para MPC es que en 2026 estudió fusionarse con Phillips 66, una operación de unos 180.000 M que se abandonó por la competencia (las dos suman cerca de una cuarta parte del refino del país) y por la estructura de MPLX [D14]. No esperamos una oferta: no pesan en el valor.',
    confianza: 'Baja',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'transacciones', campo: 'múltiplos EV/EBITDA pagados', tipo: 'Complemento', intentos: '1) Notas de las operaciones de MPC y MPLX: sin múltiplo; 2) prensa sectorial: precios por barril de capacidad sin EBITDA; 3) Andeavor: EV de 35.600 M sin EBITDA comparable', decision: 'Omitido' },
    { seccion: 'comparables', campo: 'EV/EBITDA de los próximos 12 meses y crecimiento esperado', tipo: 'Complemento', intentos: '1) Stock Analysis: solo LTM y PER adelantado; 2) MarketScreener: no abre las páginas de comparables; 3) consenso de cada uno: de pago', decision: 'Omitido' },
    { seccion: 'consenso', campo: 'reparto de recomendaciones', tipo: 'Complemento', intentos: '1) MarketScreener: solo «Outperform» medio; 2) Stock Analysis: «Buy» sin reparto; 3) prensa: datos de 2025', decision: 'Omitido' },
  ],
});

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Stream de mensajes de $MPC (últimos 30, 9-15 oct 2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-15', url: 'https://stocktwits.com/symbol/MPC' },
  { id: 2, titulo: 'Análisis de lectores de Seeking Alpha sobre MPC (jul-sep 2026: «Crack Spreads And Marathon Petroleum\'s Explosive Rally», «Further Upside With Refining Boom Likely Set To Last Through 2027», «Why Stock Plummeted After A Massive Beat»)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-09-15', url: 'https://seekingalpha.com/api/sa/combined/MPC.xml' },
  { id: 3, titulo: 'SA Asks: How would a U.S. diesel export ban impact the oil sector? (debate de lectores)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-09-25', url: 'https://seekingalpha.com/symbol/MPC/news' },
  { id: 4, titulo: 'Marathon Petroleum: comunidad y estimaciones de valor razonable', editor: 'Simply Wall St', tipo: 'Foros y redes', fecha: '2026-09', url: 'https://www.simplywall.st/stocks/us/energy/nyse-mpc/marathon-petroleum' },
];
guarda('E', {
  _estado: 'completo',
  sentimiento: {
    tono: 'Positivo', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Stocktwits', fecha: '2026-10', n_comentarios: 30, tono: 'Positivo', resumen: 'Euforia por los máximos («absolute heater», «¿cuándo 500?»), algunos que recogen beneficios para rotar a otras ideas y avisos de una posible tormenta en la costa del Golfo [E1].' },
      { plataforma: 'Seeking Alpha (análisis de lectores)', fecha: '2026-09', n_comentarios: 6, tono: 'Dividido', resumen: 'Dos alcistas (el auge del refino durará hasta 2027; Rusia fuera del mercado de productos) y dos de rebaja por valoración tras la subida [E2].' },
      { plataforma: 'Seeking Alpha (debate sobre la prohibición del diésel)', fecha: '2026-09', n_comentarios: 20, tono: 'Negativo', resumen: 'Los lectores ven la prohibición de exportar diésel como el mayor riesgo a corto plazo para los refinadores de la costa del Golfo [E3].' },
      { plataforma: 'Simply Wall St', fecha: '2026-09', n_comentarios: 10, tono: 'Dividido', resumen: 'Las narrativas de la comunidad dan valores razonables muy por debajo del precio (≈300-380 USD) aunque las han ido subiendo [E4].' },
    ],
    temas: [
      { tema: 'Cuánto dura el margen', postura: 'Dividida', peso: 'Alto', contraste: 'El consenso de analistas ya baja el BPA de 64,86 USD en 2026 a 41,96 en 2028; nosotros a 27,6 (ciclo medio). Los alcistas de los foros extrapolan el margen de hoy.' },
      { tema: 'Prohibición de exportar diésel', postura: 'Bajista', peso: 'Alto', contraste: 'Riesgo real y pendiente: el gobierno la estudió en septiembre y a principios de octubre seguía sobre la mesa [D16, D19].' },
      { tema: 'Momento y máximos', postura: 'Alcista', peso: 'Medio', contraste: 'La acción está a un 1,6 % de su máximo tras subir un 52,7 % en tres meses: el precio descuenta márgenes altos varios años.' },
      { tema: 'Recompras', postura: 'Alcista', peso: 'Medio', contraste: 'Ciertas (6.130 M disponibles a junio), pero recomprar en el pico rinde menos [A4].' },
    ],
    lectura: 'El sentimiento es eufórico entre los particulares (Stocktwits) y más dividido entre los analistas de Seeking Alpha, que empiezan a rebajar por valoración. Es una señal contraria clásica de techo cíclico: nadie en los foros discute el margen de ciclo medio y la conversación se centra en el precio. El único riesgo que los foros añaden y que pesa a corto plazo es la prohibición de exportar diésel. El sentimiento no cambia la tesis, pero refuerza que el precio ya descuenta lo bueno.',
    confianza: 'Media',
  },
  fuentes: fE,
  huecos: [],
});
console.log('Notas A-E escritas.');
