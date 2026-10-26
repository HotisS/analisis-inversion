// Escribe las notas A-E de Sandvik AB (corte 2026-10-26, iteración tras el 3T26 del 22-oct) a partir de los documentos de notas/docs
// (informe anual 2025, trimestrales 4T22, 4T23, 4T25, 2T26 y 3T26, presentación y transcripción del 3T26), del XBRL ESEF (cuentas-xbrl.json),
// de bolsa.json y movimiento.json (Yahoo), del registro de la Finansinspektionen y de MarketScreener (consenso).
// Comparables de la ficha sectorial del 14-oct llevados al cierre del 23-oct (precio y tipo de cambio).
// Ejecutar: node informes/sandvik-2026-10-26/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(dir, '../../..');
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const bolsa = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const ficha = JSON.parse(fs.readFileSync(path.join(repo, 'sectores/equipos-mineria-2026-10-14-comparables.json'), 'utf8'));
const comps = ficha.empresas.filter((e) => e.nombre !== 'Sandvik');

const CIS = 'https://mb.cision.com/Main/208';
// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Sandvik Annual Report 2025 (cuentas consolidadas, notas G12 de intangibles, remuneración, resumen de diez años)', editor: 'Sandvik AB', tipo: 'Primaria', fecha: '2026-03', url: `${CIS}/4318236/3973881.pdf` },
  { id: 2, titulo: 'Sandvik interim report second quarter 2026', editor: 'Sandvik AB', tipo: 'Primaria', fecha: '2026-07-17', url: `${CIS}/4375736/4197623.pdf` },
  { id: 3, titulo: 'Sandvik interim report first quarter 2026', editor: 'Sandvik AB', tipo: 'Primaria', fecha: '2026-04-29', url: `${CIS}/4338427/4051668.pdf` },
  { id: 4, titulo: 'Sandvik interim report fourth quarter 2025 (cuentas anuales 2024-2025, deuda neta, circulante)', editor: 'Sandvik AB', tipo: 'Primaria', fecha: '2026-01-27', url: `${CIS}/4298079/3899244.pdf` },
  { id: 5, titulo: 'Sandvik interim report third quarter 2025', editor: 'Sandvik AB', tipo: 'Primaria', fecha: '2025-10-20', url: `${CIS}/4252871/3731210.pdf` },
  { id: 6, titulo: 'Sandvik interim report second quarter 2025', editor: 'Sandvik AB', tipo: 'Primaria', fecha: '2025-07-16', url: `${CIS}/4207760/3582224.pdf` },
  { id: 7, titulo: 'Sandvik interim report fourth quarter 2023 (cuentas 2022-2023 de operaciones continuadas)', editor: 'Sandvik AB', tipo: 'Primaria', fecha: '2024-01-25', url: `${CIS}/3915138/2561817.pdf` },
  { id: 8, titulo: 'Sandvik interim report fourth quarter 2022 (2021 reexpresado sin Alleima; deuda neta 2021-2022)', editor: 'Sandvik AB', tipo: 'Primaria', fecha: '2023-01-20', url: `${CIS}/3700562/1793247.pdf` },
  { id: 9, titulo: 'Sandvik Aktiebolag: informes anuales ESEF 2020-2024 (xBRL-JSON)', editor: 'filings.xbrl.org (ESEF, Finansinspektionen)', tipo: 'Primaria', fecha: '2025-03', url: 'https://filings.xbrl.org/' },
  { id: 10, titulo: 'Sandvik provides proforma numbers for Machining and Intelligent Manufacturing (2025)', editor: 'Sandvik AB', tipo: 'Primaria', fecha: '2026-02', url: `${CIS}/4303348/3919790.pdf` },
  { id: 11, titulo: 'Sandvik interim report third quarter 2026 (cuenta, balance y flujos a 30-sep-26, áreas, deuda neta, circulante, compras)', editor: 'Sandvik AB', tipo: 'Primaria', fecha: '2026-10-22', url: `${CIS}/4413645/4331953.pdf` },
  { id: 12, titulo: 'Interim report third quarter 2026: presentación de resultados (puentes, tungsteno, guía del 4T26)', editor: 'Sandvik AB', tipo: 'Primaria', fecha: '2026-10-22', url: 'https://www.home.sandvik/siteassets/investors/reports--presentations/interim-presentations/2026/q3-2026-earnings-call-presentation-1.pdf' },
  { id: 13, titulo: 'Sandvik Q3 2026: transcripción de la conferencia con analistas del 22-oct-2026', editor: 'Sandvik AB (Datablocks / Monitor)', tipo: 'Primaria', fecha: '2026-10-22', url: 'https://widget.datablocks.se/api/rose/widgets/transcript/v2/47c29bbf-a93a-4740-8308-8d99b95ffc8a/4340355' },
];
// Para la cita de una nota sobre la otra: la Q3 está en A11.

// Cuenta de operaciones continuadas (sin Alleima, escindida el 31-ago-2022): 2021 reexpresado del 4T22, 2022-2023 del 4T23, 2024-2025 del 4T25.
// gastos_generales = comerciales + administración + I+D + otros resultados de explotación (así cuadra con el EBIT publicado).
// EBITDA = EBIT + amortizaciones y deterioros del estado de flujos (incluye la amortización de los excedentes de compras).
const c = (periodo, ingresos, coste_ventas, gg, ebit, da, rf, bai, imp, mino, bn, gf, bpa, dpa) => ({
  periodo, ingresos, coste_ventas, gastos_generales: gg, ebitda: ebit + da, amortizaciones: da, ebit,
  resultado_financiero: rf, bai, impuestos: imp, minoritarios: mino, beneficio_neto: bn, gastos_financieros: gf,
  participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa, dpa, dpa_extraordinario: 0, acciones_diluidas: 1255,
});
const cuenta = [
  c('2021', 85700, 48995, 10690 + 5022 + 3468 + 250, 17275, 5253, -457, 16818, 3731, 23, 13064, 1043, 10.41, 4.75),
  c('2022', 112332, 66962, 14635 + 7918 + 4185 + 40, 18592, 6643, -854, 17738, 4884, 13, 12841, 1790, 10.24, 5.00),
  c('2023', 126503, 74456, 15876 + 8794 + 4489 + 470, 22418, 7459, -2623, 19794, 4493, 1, 15300, 3431, 12.18, 5.50),
  c('2024', 122878, 73742, 15832 + 8915 + 4808 + 1160, 18420, 7981, -1959, 16461, 4216, 2, 12243, 2787, 9.75, 5.75),
  c('2025', 120680, 71678, 14987 + 8624 + 4542 + 39, 20809, 7415, -1351, 19458, 4767, 1, 14690, 1991, 11.70, 6.00),
];
// LTM sep-26 = 2025 + 9M26 − 9M25 (informe del 3T26: ingresos 105.164 / 88.219; EBITDA 26.523 / 20.453; EBIT 20.491 / 14.924;
// beneficio atribuido 14.883 / 10.490; BPA diluido 11,86 / 8,36).
const ltm = { periodo: 'LTM sep-26', fecha_fin: '2026-09-30', ingresos: 120680 + 105164 - 88219, ebitda: 28224 + 26523 - 20453, ebit: 20809 + 20491 - 14924, beneficio_neto: 14690 + 14883 - 10490, bpa: Math.round((11.70 + 11.86 - 8.36) * 100) / 100, dpa: 6.0, dpa_extraordinario: 0, fcf: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null };

// Balance. deuda_financiera = pasivos con interés SIN pensiones ni arrendamientos (tabla de deuda neta de cada 4T); arrendamientos aparte.
// 2021 incluye Alleima (balance no reexpresado). fondo_comercio solo 2024-2025 (nota G12 del informe anual 2025).
const b = (periodo, at, ac, pc, pt, fc, intang, imm, exi, cli, prov, caja, deuda, arr, pn, mino, res) => ({
  periodo, activo_total: at, activo_corriente: ac, pasivo_corriente: pc, pasivo_total: pt, fondo_comercio: fc, intangibles: fc == null ? intang : intang - fc,
  inmovilizado_material: imm, existencias: exi, clientes: cli, proveedores: prov, activos_contrato: null, pasivos_contrato: null,
  caja, deuda_financiera: deuda, arrendamientos: arr, patrimonio_neto: pn, minoritarios: mino, reservas: res,
});
const balance_hist = [
  b('2021', 155517, 70374, 42285, 78185, null, 47809, 26076, 29910, 17341, 12011, 13585, 30433, 3917, 77332, 132, 61872),
  b('2022', 176682, 74993, 43226, 95412, null, 66134, 21683, 35019, 18685, 11746, 10489, 46954, 5102, 81270, 43, 58346),
  b('2023', 174210, 72117, 43878, 86513, null, 64495, 22234, 34301, 18499, 9595, 4363, 39578, 5503, 87697, 66, 67028),
  b('2024', 184384, 73502, 41026, 87385, 51181, 70323, 24678, 34827, 19836, 10077, 4528, 36644, 6111, 96999, 75, 71779),
  b('2025', 169860, 33219 + 31720 + 4958, 5094 + 31019, 169860 - 93237, 46206, 62594, 22339, 33219, 19595, 10795, 4958, 31474, 5647, 93237, 71, null),
];
// Flujos de operaciones continuadas. capex = inmovilizado + intangibles − ventas de inmovilizado (los equipos de alquiler van en el flujo operativo).
const f = (periodo, fo, capex, arr, adq, des, div, rec) => ({ periodo, flujo_operativo: fo, capex, pagos_arrendamientos: arr, adquisiciones: adq, desinversiones: des, dividendos: div, recompras: rec, emision_acciones: 0, intereses_en_financiacion: 0 });
const flujos_hist = [
  f('2021', 12001, 2465 + 620 - 524, 888, 23518, 558, 8140, 0),
  f('2022', 11092, 3288 + 946 - 728, 1157, 15542, 0, 5955, 270),
  f('2023', 18797, 3872 + 1482 - 315, 1323, 1877, 0, 6261, 242),
  f('2024', 20607, 3565 + 1276 - 257, 1439, 3187, 0, 6880, 61),
  f('2025', 19189, 2835 + 972 - 376, 1433, 2997, 336, 7203, 6),
];
const seg = (nombre, descripcion, filas) => ({ nombre, descripcion, tipo_resultado: 'EBIT', historico: filas.map(([periodo, ingresos, resultado]) => ({ periodo, ingresos, resultado })) });

const A = {
  _estado: 'Completo. Cuenta de operaciones continuadas 2021-2025 de los informes del 4T (sin Alleima); balance y flujos cotejados con el XBRL ESEF 2021-2024 y el 2025 con el informe del 4T25 y el anual; 9M26 y balance a 30-sep-26 del informe del 3T26.',
  negocio: {
    segmentos: [
      seg('Mining', 'Equipos de perforación, carga y transporte subterráneo y de superficie, herramientas de roca, recambios y servicio, automatización y software minero (Deswik). Resultado = EBITA publicado.', [['2024', 63607, 12443], ['2025', 62971, 13140]]),
      seg('Rock Processing', 'Trituración y cribado móviles y fijos, demolición y reciclaje, piezas de desgaste; filtración (Diemme, 2026). Resultado = EBITA publicado.', [['2024', 10704, 1150], ['2025', 10435, 1557]]),
      seg('Machining e Intelligent Manufacturing', 'Herramientas de corte de metal duro (Sandvik Coromant, Seco, Walter, Dormer Pramet), polvo de tungsteno y software CAD/CAM (Mastercam, Cimatron, GibbsCAM). Desde 2026 son dos áreas: Machining (44.003 M en 2025) e Intelligent Manufacturing (3.117 M). Resultado = EBITA publicado.', [['2024', 48567, 7614], ['2025', 47273, 8586]]),
      seg('Funciones comunes', 'Costes de la sede.', [['2024', 0, -715], ['2025', 0, -667]]),
    ],
    geografias: [
      { nombre: 'Norteamérica', peso_pct: 25.6 }, { nombre: 'Europa', peso_pct: 25.2 }, { nombre: 'Asia', peso_pct: 17.5 },
      { nombre: 'África/Oriente Medio', peso_pct: 12.3 }, { nombre: 'Australia', peso_pct: 12.2 }, { nombre: 'Sudamérica', peso_pct: 7.2 },
    ],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Pedidos recibidos (M SEK)', valor_anterior: '95.738 en 9M25', valor_actual: '111.503 en 9M26 (+16 %; orgánico +19 %)', variacion: '+17 % orgánico en el 3T26', comentario: 'Libro-facturación del 98 % en el 3T26 (36.948 M de pedidos y 37.728 M de ingresos) [11].' },
      { kpi: 'Margen EBITA ajustado del grupo', valor_anterior: '19,0 % (3T25)', valor_actual: '22,5 % (3T26)', variacion: '+3,5 pp', comentario: 'El efecto temporal del tungsteno fue de solo 104 M (30 pb del grupo) frente a 550 M en el 2T26; 12 meses: 21,3 % [11, 12].' },
      { kpi: 'Posventa de Mining sobre sus ingresos', valor_anterior: '71 % (3T25)', valor_actual: '67 % (3T26)', variacion: '−4 pp', comentario: 'Los equipos crecen más en ventas; pedidos de posventa +16 % orgánico, equipos planos sobre una base alta [11].' },
      { kpi: 'Circulante / ingresos (12 meses, definición de Sandvik)', valor_anterior: '29,3 % (sep-25)', valor_actual: '27,2 % (sep-26)', variacion: '−2,1 pp', comentario: 'En valor sube a 44.122 M (34.041 M hace un año): existencias de 44.257 M [11].' },
      { kpi: 'ROCE (12 meses)', valor_anterior: '15,1 % (3T25)', valor_actual: '19,1 % (3T26)', variacion: '+4,0 pp', comentario: 'Mining 26,6 %, Machining 19,9 %, Rock Processing 9,1 %, Intelligent Manufacturing −0,1 % [11].' },
      { kpi: 'Deuda financiera neta / EBITDA', valor_anterior: '1,2 (sep-25)', valor_actual: '0,9 (sep-26)', variacion: '−0,3', comentario: 'Deuda financiera neta de 30.387 M tras pagar 4.653 M netos por Diemme; objetivo < 1,5 [11].' },
      { kpi: 'Caja libre operativa (M SEK)', valor_anterior: '5.603 (3T25)', valor_actual: '7.167 (3T26)', variacion: '+28 %', comentario: 'Récord trimestral, conversión del 87 %; en 9M26 14.371 M (−1 %) por el circulante [11, 12].' },
    ],
    confianza: 'Alta',
  },
  financieros: {
    cuenta, ltm,
    cambios_perimetro: [
      { periodo: '2022', descripcion: 'Escisión de Alleima (antigua Sandvik Materials Technology) el 31-ago-2022: la cuenta de 2021-2022 es la de operaciones continuadas reexpresada; el balance de 2021 aún incluye Alleima.' },
      { periodo: '2022', descripcion: 'Compras de 2021-2022 por unos 39.000 M SEK (DSI Underground, CGTech, Deswik, SP Mining, Cambrio/GibbsCAM): parte del salto de ingresos de 2022.' },
    ],
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '4T24', ingresos: 32151, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 7736, margen_ebitda_pct: null, bpa: 3.42, vs_consenso: null },
      { periodo: '1T25', ingresos: 29301, crecimiento_pct: 1.0, crecimiento_organico_pct: null, ebitda: 13469 - 6374, margen_ebitda_pct: null, bpa: 2.98, vs_consenso: null },
      { periodo: '2T25', ingresos: 29700, crecimiento_pct: -5.5, crecimiento_organico_pct: null, ebitda: 6374, margen_ebitda_pct: null, bpa: 2.56, vs_consenso: null },
      { periodo: '3T25', ingresos: 29218, crecimiento_pct: -3.6, crecimiento_organico_pct: null, ebitda: 6984, margen_ebitda_pct: null, bpa: 2.82, vs_consenso: null },
      { periodo: '4T25', ingresos: 32461, crecimiento_pct: 1.0, crecimiento_organico_pct: 12, ebitda: 7770, margen_ebitda_pct: null, bpa: 3.35, vs_consenso: null },
      { periodo: '1T26', ingresos: 30685, crecimiento_pct: 4.7, crecimiento_organico_pct: 15, ebitda: 16653 - 9506, margen_ebitda_pct: null, bpa: 3.09, vs_consenso: null },
      { periodo: '2T26', ingresos: 36752, crecimiento_pct: 23.7, crecimiento_organico_pct: 23, ebitda: 9506, margen_ebitda_pct: null, bpa: 4.17, vs_consenso: 'Superior' },
      { periodo: '3T26', ingresos: 37728, crecimiento_pct: 29.1, crecimiento_organico_pct: 25, ebitda: 9870, margen_ebitda_pct: null, bpa: 4.60, vs_consenso: 'Superior' },
    ].map((t) => ({ ...t, margen_ebitda_pct: Math.round((t.ebitda / t.ingresos) * 1000) / 10 })),
    confianza: 'Alta',
  },
  balance: {
    historico: balance_hist,
    // Vencimientos: flujos no descontados (principal e intereses) de préstamos bancarios y bonos/MTN a 31-dic-25, nota de riesgos financieros del informe anual 2025.
    vencimientos: [{ anio: '2026', importe: 134 + 130 + 4044 + 374 }, { anio: '2027-2030', importe: 2654 + 18219 }, { anio: '2031+', importe: 7219 + 2474 }],
    liquidez: 'Caja de 4.034 M SEK a 30-sep-26 y deuda financiera neta de 30.387 M (0,9 veces el EBITDA) tras pagar 7.514 M de dividendo en mayo y 4.653 M netos por Diemme en septiembre [11]; línea de crédito comprometida sin disponer de 11.000 M y vida media de los bonos de 3,5 años a cierre de 2025 [1].',
    rating: 'S&P: BBB+ a largo plazo, perspectiva estable; A-2 a corto (cierre de 2025) [1]',
    coste_deuda_pct: 3.9, vida_media_anios: 3.5,
    confianza: 'Media',
  },
  flujos: { historico: flujos_hist, confianza: 'Alta' },
  calidad: { auditor: 'Öhrlings PricewaterhouseCoopers AB (auditor desde abril de 2018; socia firmante Anna Rosendal)', anios_auditor: 8, opinion: 'Favorable', confianza: 'Media' },
  capital: {
    adquisiciones: [
      { anio: '2021', objetivo: 'DSI Underground (sostenimiento de roca; ventas 518 M EUR)', importe: Math.round(943 * 10.1), ev_ebitda: null, financiacion: 'Caja y deuda', resultado: 'Integrada en Mining; base del negocio de sostenimiento [8].' },
      { anio: '2022', objetivo: 'Deswik (software de planificación minera) y SP Mining', importe: 6187 + 6832, ev_ebitda: null, financiacion: 'Deuda', resultado: 'Deswik es el software minero del grupo; fondo de comercio y excedentes de 6.447 M y 6.965 M [8].' },
      { anio: '2021-2022', objetivo: 'Software CAD/CAM (CGTech, Cambrio/GibbsCAM, Mastercam ya desde 2021)', importe: null, ev_ebitda: null, financiacion: 'Deuda', resultado: 'Hoy Intelligent Manufacturing: 3.117 M de ventas y ROCE de −0,5 % en jun-26 (10,3 % sin la amortización de excedentes) [2].' },
      { anio: '2026', objetivo: 'Diemme Filtration (Italia, filtros prensa para minería; ventas estimadas de 1.100 M en 2026) y ocho compras pequeñas de software y herramientas', importe: 5545, ev_ebitda: null, financiacion: 'Caja y deuda', resultado: 'Nueve compras en 9M26 por 5.545 M libres de caja y deuda (3.821 M de fondo de comercio provisional); Diemme, cerrada el 1-sep, costó 4.736 M (3.391 M de fondo de comercio) y es la división Filtration de Rock Processing [11].' },
    ],
    confianza: 'Media',
  },
  fuentes: fA,
  huecos: [
    { seccion: 'balance', campo: 'fondo_comercio 2021-2023', tipo: 'Complemento', intentos: '1) XBRL ESEF (sin concepto); 2) trimestrales del 4T (solo intangibles totales); 3) informe anual 2025, nota G12 (solo 2024-2025: 51.181 y 46.206 M)', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Sandvik Annual Report 2025: estrategia, mercados finales, competencia, sostenibilidad', editor: 'Sandvik AB', tipo: 'Primaria', fecha: '2026-03', url: `${CIS}/4318236/3973881.pdf` },
  { id: 2, titulo: 'Global Mining Machinery Market (USD 133.090 M en 2025; 184.556 M en 2031; TCAC 5,6 %)', editor: 'Ken Research', tipo: 'Sectorial', fecha: '2026', url: 'https://www.kenresearch.com/global-mining-machinery-market' },
  { id: 3, titulo: 'Sandvik interim report Q2 2026 (mercados, tungsteno, perspectivas por área)', editor: 'Sandvik AB', tipo: 'Primaria', fecha: '2026-07-17', url: `${CIS}/4375736/4197623.pdf` },
  { id: 4, titulo: 'Epiroc: informe de análisis del 14-oct-2026 (datos de Epiroc, comparables y ciclo del sector)', editor: 'Análisis propio (informes/epiroc-2026-10-14)', tipo: 'Sectorial', fecha: '2026-10-14', url: 'informes/epiroc-2026-10-14/' },
  { id: 5, titulo: 'Futuros de oro (GC=F) y cobre (HG=F)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/HG%3DF/history' },
  { id: 6, titulo: 'Sandvik to divest the business unit Additive Manufacturing', editor: 'Sandvik AB', tipo: 'Primaria', fecha: '2026-05-29', url: 'https://www.mfn.se/cis/a/sandvik/sandvik-to-divest-the-business-unit-additive-manufacturing-ca568bfc' },
  { id: 7, titulo: 'Sandvik wins large mining equipment order in the Democratic Republic of the Congo (Kamoa-Kakula)', editor: 'Sandvik AB', tipo: 'Primaria', fecha: '2026-08-25', url: 'https://www.mfn.se/cis/a/sandvik/sandvik-wins-large-mining-equipment-order-in-the-democratic-republic-of-the-congo-fbca14f7' },
  { id: 8, titulo: 'Sandvik interim report third quarter 2026 (mercados, áreas, tungsteno, compras)', editor: 'Sandvik AB', tipo: 'Primaria', fecha: '2026-10-22', url: `${CIS}/4413645/4331953.pdf` },
  { id: 9, titulo: 'Sandvik Q3 2026: transcripción de la conferencia con analistas', editor: 'Sandvik AB (Datablocks / Monitor)', tipo: 'Primaria', fecha: '2026-10-22', url: 'https://widget.datablocks.se/api/rose/widgets/transcript/v2/47c29bbf-a93a-4740-8308-8d99b95ffc8a/4340355' },
  { id: 10, titulo: 'Interim report third quarter 2026: presentación (modelo de precio del tungsteno, fuentes de materia prima)', editor: 'Sandvik AB', tipo: 'Primaria', fecha: '2026-10-22', url: 'https://www.home.sandvik/siteassets/investors/reports--presentations/interim-presentations/2026/q3-2026-earnings-call-presentation-1.pdf' },
];
const SEK_USD25 = 9.86;
const B = {
  _estado: 'Completo; mercado y competidores de la ficha sectorial del 14-oct, actualizado con el 3T26 (mercados, tungsteno, Diemme).',
  historia: {
    resumen: 'Sandvik nace en 1862 en Sandviken (Suecia), cuando Göran Fredrik Göransson aplica a escala industrial el procedimiento Bessemer para el acero. Durante un siglo fue una acería; desde los años cuarenta creció con el metal duro (Sandvik Coromant, 1942) y después con la minería. En 2022 escindió su negocio de aceros y aleaciones especiales, Sandvik Materials Technology, que salió a bolsa como Alleima el 31-ago-2022: lo que queda es un grupo de minería, procesado de roca y herramientas de corte. Stefan Widing es consejero delegado desde febrero de 2020 y ha comprado sobre todo software (Deswik, Mastercam, CGTech, GibbsCAM) y posventa minera. Industrivärden es su primer accionista [1].',
    hitos: [
      { anio: '1862', hito: 'Fundación en Sandviken (acero Bessemer) [1].' },
      { anio: '1942', hito: 'Primeras herramientas de metal duro: origen de Sandvik Coromant [1].' },
      { anio: '2020', hito: 'Stefan Widing, consejero delegado (antes en Assa Abloy) [1].' },
      { anio: '2021', hito: 'Compra de DSI Underground y de Mastercam (CAD/CAM) [1].' },
      { anio: '2022', hito: 'Escisión y salida a bolsa de Alleima (31-ago); compras de Deswik y SP Mining; salida de Rusia [1].' },
      { anio: '2025', hito: 'Día del inversor (20-may): nueva estructura con cuatro áreas desde el 1-ene-26 y objetivos 2025-2030 [1].' },
      { anio: '2026', hito: 'Pedidos y beneficios récord en el 2T26 y el 3T26 (EBITA ajustado del 22,5 %); venta de Additive Manufacturing y de ZeroTouch, compra de Diemme Filtration (1-sep); día del inversor el 24-25 de noviembre [3, 6, 8].' },
    ],
    confianza: 'Alta',
  },
  negocio: {
    descripcion: 'Sandvik tiene dos negocios. El 61 % de los ingresos de 2025 es minería e infraestructura: equipos de perforación, carga y transporte subterráneo (el área Mining, 62.971 M SEK) y trituración, cribado y demolición (Rock Processing, 10.435 M), con sus recambios, herramientas de roca, servicio, automatización (AutoMine) y software de planificación (Deswik); desde el 1-sep-26 también filtración (Diemme) [3, 1, 8]. El 39 % es fabricación: herramientas de corte de metal duro para tornear, fresar y taladrar metal (Sandvik Coromant, Seco, Walter, Dormer Pramet), polvo de tungsteno de su propia mina en Austria y software CAD/CAM (Mastercam, Cimatron), que desde 2026 se reportan en dos áreas, Machining (44.003 M) e Intelligent Manufacturing (3.117 M) [3]. Por mercado final, la minería es el 52 % de los ingresos, la industria general el 25 %, aeroespacial y defensa el 5 % y automóvil el 4 % [3]. Unos 41.800 empleados [1].',
    como_gana_dinero: 'En minería, la posventa (recambios, servicio, herramientas de roca, digital) es el 67 % de los ingresos de Mining en el 3T26 y crece con las horas de trabajo de un parque envejecido y más automatizado, que necesita más servicio propio por máquina; los equipos dependen del ciclo de inversión de las mineras [8, 9]. En herramientas de corte el negocio es casi todo consumible: una plaquita de metal duro dura horas, y la demanda sigue a la producción industrial (PMI, aeroespacial, automóvil) con poca visibilidad, porque se piden día a día [3]. El margen depende del volumen (apalancamiento operativo del 55 % en Machining en el 2T26), del precio y del tungsteno: Sandvik traslada su precio con retraso (unos 9 meses de desfase en coste de herramientas y 2 en el polvo), y el efecto temporal sumó 550 M en el 2T26 y 104 M en el 3T26 [3, 8, 10]. El software cobra licencias y suscripciones.',
    clientes: 'Clientes muy dispersos: mineras grandes y contratistas en minería (Kamoa Copper, LKAB, Khoemacau, contratistas mexicanos) y decenas de miles de talleres, fabricantes aeroespaciales y de automoción en herramientas [7, 1]. Ningún cliente es significativo en las cuentas [1]. El poder de precio se ve en que todas las áreas compensan ya la inflación de costes y en las subidas de precio de herramientas por el tungsteno, que los clientes aceptan «porque las razones están claras» y que estrechan la distancia con la gama media [8, 9]. Margen bruto ajustado del 40,8 % en el 3T26, igual que un año antes [8]. La compra de metal duro es pequeña para el cliente frente al coste de parar una máquina: decide el rendimiento, no el precio.',
    confianza: 'Media',
  },
  sector: {
    definicion: 'Sandvik juega en dos mercados distintos. Minería: maquinaria y servicio para minería y obra en roca (ficha sectorial «Equipos y servicios para minería»), con la cifra de Ken Research de maquinaria minera mundial (133.090 M USD en 2025) como techo amplio [2]. Herramientas de corte de metal duro: mercado mundial de unos 25.000-30.000 M USD según estimaciones de la industria que no hemos podido confirmar con una fuente primaria; lo lidera Sandvik (Coromant, Seco, Walter), seguido de IMC (Iscar, de Berkshire Hathaway), Kennametal, Mitsubishi Materials y Kyocera. La serie usa solo minería.',
    tamano: '≈ 133.090 M USD en 2025 en maquinaria minera (≈ 1.312.000 M SEK) [2]; herramientas de corte sin cifra primaria',
    unidad_serie: 'millones de SEK (Ken Research, maquinaria minera, a 9,86 SEK/USD)',
    serie: [
      { anio: '2025', tamano: Math.round(133090 * SEK_USD25) },
      { anio: '2026e', tamano: Math.round(133090 * 1.056 * SEK_USD25) },
      { anio: '2027e', tamano: Math.round(133090 * 1.056 ** 2 * SEK_USD25) },
      { anio: '2028e', tamano: Math.round(133090 * 1.056 ** 3 * SEK_USD25) },
      { anio: '2029e', tamano: Math.round(133090 * 1.056 ** 4 * SEK_USD25) },
      { anio: '2030e', tamano: Math.round(133090 * 1.056 ** 5 * SEK_USD25) },
      { anio: '2031e', tamano: Math.round(184556 * SEK_USD25) },
    ],
    tcac_historico_pct: null, tcac_previsto_pct: 5.6, cr5_pct: null, estructura: 'Moderadamente concentrada',
    drivers: [
      { driver: 'Precio del cobre y del oro (inversión minera)', efecto: '+', horizonte: 'Cíclico', evidencia: 'Pedidos de Mining de 19.402 M en el 3T26 (+11 % orgánico; +18 % sin pedidos grandes), con ampliaciones de minas existentes como primer motor [8].' },
      { driver: 'Producción industrial, aeroespacial y defensa', efecto: '+', horizonte: 'Cíclico', evidencia: 'Pedidos de herramientas de corte +19 % orgánico en el 3T26 (Norteamérica +46 % en Machining) con PMI en recuperación gradual y aeroespacial y defensa al alza; un 2 % del crecimiento fue compra anticipada [8, 9].' },
      { driver: 'Precio del tungsteno', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'El polvo de tungsteno duplicó pedidos e ingresos en el 3T26 por precio, con volúmenes cayendo a doble dígito; efecto temporal de +104 M en el 3T26 (guía 200 M) y «limitado» en el 4T26; APT y chatarra bajaron frente al 2T [8, 9].' },
      { driver: 'Automatización, electrificación y software', efecto: '+', horizonte: 'Estructural', evidencia: 'AutoMine Aura (2T26), perforadoras eléctricas y suscripciones de software creciendo a doble dígito alto [3].' },
      { driver: 'Corona sueca', efecto: '−', horizonte: 'Cíclico', evidencia: 'La divisa restó 8 puntos a los ingresos de 2025; en el 3T26 sumó 3 puntos y 158 M de EBITA, y Sandvik espera +600 M en el 4T26 [1, 8].' },
      { driver: 'Aranceles de EE. UU.', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Devolución de aranceles de EE. UU.: −400 M de pedidos e ingresos en el 4T26, sin efecto en el EBITA [8].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Duopolio con Epiroc en perforación subterránea; IMC (Iscar), Kennametal y fabricantes japoneses y chinos en herramientas de corte. Margen EBITA ajustado del 19,3 % en 2025 frente al 19,6 % de Epiroc [1, 4].' },
      { fuerza: 'Poder de los clientes', intensidad: 2, justificacion: 'Clientes muy dispersos en herramientas; en minería, mineras grandes que pagan por disponibilidad [1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Integración vertical en tungsteno (mina propia en Austria y reciclaje), la materia prima crítica con oferta controlada por China [3].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Red de servicio minero y décadas de I+D en metal duro; los chinos entran por la gama media en ambos negocios [1].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 2, justificacion: 'La fabricación aditiva (que Sandvik vende) no sustituye al mecanizado en series; la roca hay que perforarla [1, 6].' },
    ],
    ciclo: { posicion: 'Madurez del ciclo', comentario: 'Ingresos y beneficios récord en el 3T26 (+25 % orgánico), materias primas caras y PMI en recuperación: los dos ciclos de Sandvik están arriba a la vez, aunque Rock Processing ya cae en equipos (−27 % orgánico) y los pedidos de equipos de Mining no crecen sobre una base alta [8]. En 2020 los ingresos de Sandvik cayeron un 17 % (−11 % orgánico) y el EBITA ajustado bajó al 17 %; en 2009 la caída fue mayor en herramientas que en minería; en 2015-2016 sufrió la minería; en 2024 los ingresos orgánicos cayeron un 2 % con herramientas débiles [1].' },
    regulacion: 'Seguridad minera y emisiones de diésel en minas subterráneas empujan los equipos eléctricos y automatizados [1]. Restricciones chinas a la exportación de tungsteno (2025-2026) encarecen la materia prima; Sandvik tiene mina propia en Europa [3]. Aranceles de EE. UU. que Sandvik repercute con recargos [3].',
    tendencias: 'Automatización y digitalización de la minería (AutoMine, Deswik), electrificación de flotas y software de fabricación (CAD/CAM con IA). En herramientas, la tendencia es a materiales más duros (aeroespacial, defensa) y a la sostenibilidad (reciclaje de metal duro). Los fabricantes chinos ganan cuota en gama media de herramientas y equipos [1, 3].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: null,
    posicion: 'Uno de los dos líderes mundiales en equipos subterráneos con Epiroc y el primer fabricante mundial de herramientas de corte de metal duro (Coromant, Seco, Walter, Dormer Pramet) por delante de IMC (Iscar) y Kennametal [1]. Cuota sin cifra homogénea: Mining y Rock Processing (73.406 M SEK en 2025) son el 5,6 % del mercado de maquinaria minera de Ken Research (estimación propia).',
    competidores: [
      { nombre: 'Epiroc', pais: 'Suecia', ticker: 'EPI A', ingresos: 61998, cuota_pct: null, margen_ebit_pct: 19.2, comentario: 'Rival directo en minería subterránea y perforación; 82 % minería, 66 % posventa; no tiene herramientas de corte [4].' },
      { nombre: 'Caterpillar', pais: 'EE. UU.', ticker: 'CAT', ingresos: Math.round(67589 * SEK_USD25), cuota_pct: null, margen_ebit_pct: 16.5, comentario: 'Carga y transporte de cielo abierto y subterráneo [4].' },
      { nombre: 'Komatsu', pais: 'Japón', ticker: '6301', ingresos: null, cuota_pct: null, margen_ebit_pct: 13.7, comentario: 'Equipos subterráneos (Joy Global) y de cielo abierto [4].' },
      { nombre: 'Metso', pais: 'Finlandia', ticker: 'METSO', ingresos: Math.round(5240 * 11.07), cuota_pct: null, margen_ebit_pct: 15.8, comentario: 'Trituración y procesado: rival de Rock Processing [4].' },
      { nombre: 'Weir', pais: 'Reino Unido', ticker: 'WEIR', ingresos: null, cuota_pct: null, margen_ebit_pct: 20.2, comentario: 'Desgaste y bombas; compró Micromine (software minero, rival de Deswik) [4].' },
      { nombre: 'IMC (Iscar)', pais: 'Israel (Berkshire Hathaway)', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Segundo fabricante de herramientas de corte; no cotiza.' },
      { nombre: 'Kennametal', pais: 'EE. UU.', ticker: 'KMT', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Herramientas de corte y piezas de desgaste de metal duro; menor y con márgenes muy inferiores.' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'Software CAD/CAM con base instalada de usuarios (Mastercam) y datos de flotas conectadas; efecto pequeño [1].' },
        { fuente: 'Costes de cambio', puntuacion: 3, evidencia: 'Parque minero con recambios propios y automatización integrada (67 % posventa en Mining); las máquinas nuevas, más avanzadas, solo las puede mantener Sandvik; en herramientas, programas CNC y procesos homologados en aeroespacial [8, 9].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 4, evidencia: 'Coromant y la metalurgia del metal duro; I+D del 3,8 % de las ventas; margen bruto del 40,6 % en 2025 [1].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Integración vertical en tungsteno: 10-15 % de mina propia, 55 % de chatarra reciclada (más barata que el virgen) y 30-35 % de virgen fuera de China [10].' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'Duopolio con Epiroc en minería subterránea y liderazgo mundial en metal duro; ROCE de Mining del 26,6 % en el 3T26 [8].' },
      ],
    },
    amenazas: 'En minería, los fabricantes chinos (SANY, XCMG) y la alianza de Epiroc con SANY; en herramientas, la competencia china en gama media y una caída de la industria europea y del automóvil. A más largo plazo, que la IA y el software de fabricación desplacen el valor del hierro y la plaquita al programa: Sandvik lo cubre con Mastercam, pero Intelligent Manufacturing aún rinde poco (ROCE −0,1 % en el 3T26) [8].',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Seguridad (TRIFR) y emisiones del uso de los equipos mineros (alcance 3); reciclaje de metal duro (recompra de herramientas usadas) y suministro responsable de tungsteno y cobalto [1]. Exposición pequeña al carbón.',
    controversias: 'Salida de Rusia en 2022 con deterioros; sin sanciones relevantes recientes según el informe anual 2025 [1].',
    confianza: 'Baja',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'sector', campo: 'tamaño del mercado de herramientas de corte', tipo: 'Complemento', intentos: '1) Informe anual 2025 (no lo cuantifica); 2) trimestrales 2026 (solo crecimientos); 3) estimaciones de la industria sin fuente primaria', decision: 'Omitido' },
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) Informe anual 2025 (grep sin rating ESG); 2) web de Sandvik no descargada; 3) sin búsqueda web por presupuesto', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Sandvik Annual Report 2025: gobierno corporativo, consejo, remuneración y accionistas', editor: 'Sandvik AB', tipo: 'Primaria', fecha: '2026-03', url: `${CIS}/4318236/3973881.pdf` },
  { id: 2, titulo: 'Sandvik appoints new President of business area Mining (Patrick Murphy, desde el 1-jul-26)', editor: 'Sandvik AB', tipo: 'Primaria', fecha: '2026-04-27', url: 'https://www.mfn.se/cis/a/sandvik/sandvik-appoints-new-president-of-business-area-mining-ea6c8c77' },
  { id: 3, titulo: 'Nadine Crauwels, President Machining, to leave Sandvik', editor: 'Sandvik AB', tipo: 'Primaria', fecha: '2026-09-09', url: 'https://www.mfn.se/cis/a/sandvik/nadine-crauwels-president-machining-to-leave-sandvik-4656495d' },
  { id: 4, titulo: 'Sandvik interim report Q2 2026 (objetivos financieros 2025-2030 y guía)', editor: 'Sandvik AB', tipo: 'Primaria', fecha: '2026-07-17', url: `${CIS}/4375736/4197623.pdf` },
  { id: 5, titulo: 'Registro de operaciones de personas con responsabilidades de dirección (Insynshandel): Sandvik, 26-oct-2025 a 26-oct-2026', editor: 'Finansinspektionen', tipo: 'Primaria', fecha: '2026-10-26', url: 'https://marknadssok.fi.se/publiceringsklient/en-GB/Search/Search?SearchFunctionType=Insyn&Utgivare=Sandvik' },
  { id: 6, titulo: 'Sandvik interim report third quarter 2026 (objetivos 2025-2030 reconfirmados, sucesión en Machining, junta de 2027)', editor: 'Sandvik AB', tipo: 'Primaria', fecha: '2026-10-22', url: `${CIS}/4413645/4331953.pdf` },
  { id: 7, titulo: 'Sandvik AB – Nomination Committee for the 2027 Annual General Meeting', editor: 'Sandvik AB', tipo: 'Primaria', fecha: '2026-09-21', url: `${CIS}/4398561/4278551.pdf` },
];
const C = {
  _estado: 'Completo salvo votos de la junta; operaciones de directivos del registro de la Finansinspektionen (12 meses).',
  directivos: {
    equipo: [
      { nombre: 'Stefan Widing', cargo: 'Presidente y consejero delegado', desde: '2020', participacion_pct: 0.009, trayectoria: 'Ingeniero; 14 años en Assa Abloy (HID Global) y antes en Saab. Con él Sandvik escindió Alleima, compró software y posventa por unos 40.000 M SEK y reorganizó el grupo en cuatro áreas. Tiene 112.753 acciones [1].' },
      { nombre: 'Cecilia Felton', cargo: 'Directora financiera', desde: '2022', participacion_pct: null, trayectoria: 'En Sandvik desde 2013, antes directora financiera en funciones; directora financiera desde 2022 [1].' },
      { nombre: 'Patrick Murphy', cargo: 'Presidente del área Mining', desde: '2026', participacion_pct: null, trayectoria: 'Sustituye a Mats Eriksson (que se jubila en 2027) desde el 1-jul-26 [2].' },
      { nombre: 'Nadine Crauwels', cargo: 'Presidenta del área Machining (de salida)', desde: '2024', participacion_pct: null, trayectoria: 'En Sandvik desde 2000; anunció su salida el 9-sep-26 y sigue hasta que llegue un sucesor, que Sandvik quiere tener antes de final de 2026 [3, 6].' },
      { nombre: 'Johan Molin', cargo: 'Presidente del consejo', desde: '2015', participacion_pct: null, trayectoria: 'Ex consejero delegado de Assa Abloy; independiente [1].' },
    ],
    historial_guidance: [
      { anio: '2022-2025', guia: 'Crecimiento del 7 % anual a lo largo del ciclo (orgánico y compras, divisa constante)', real: 'Orgánico +3 %, +5 %, −2 % y +5 % en 2022-2025 más compras; +19 % orgánico en el 1S26 [1, 4]', cumplida: 'Parcial' },
      { anio: '2022-2025', guia: 'Margen EBITA ajustado del 20-22 % a lo largo del ciclo', real: '20 %, 20 %, 19 % y 19 % en 2022-2025; 21,8 % en 9M26 y 21,3 % en 12 meses [1, 6]', cumplida: 'Parcial' },
      { anio: '3T26', guia: 'Guía del 3T26: +200 M de divisa y +200 M de efecto temporal del tungsteno en el EBITA ajustado; intereses netos de −600 M en 2026', real: '+158 M de divisa y +104 M de tungsteno; intereses netos revisados a −700 M [6]', cumplida: 'Parcial' },
      { anio: '2022-2025', guia: 'Dividendo del 50 % del BPA ajustado', real: '48 % en 2024 y 49 % en 2025 [1]', cumplida: 'Sí' },
      { anio: '2022-2025', guia: 'Deuda financiera neta / EBITDA < 1,5 sin compras transformadoras', real: '1,3 / 1,2 / 1,2 / 0,9 en 2022-2025 [1]', cumplida: 'Sí' },
    ],
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Johan Molin', cargo: 'Presidente', tipo: 'Independiente', desde: '2015', comisiones: 'Remuneración; auditoría' },
      { nombre: 'Helena Stjernholm', cargo: 'Consejera', tipo: 'Dominical', desde: '2016', comisiones: 'Auditoría; remuneración' },
      { nombre: 'Marika Fredriksson', cargo: 'Consejera', tipo: 'Dominical', desde: '2017', comisiones: '—' },
      { nombre: 'Claes Boustedt', cargo: 'Consejero', tipo: 'Independiente', desde: '2015', comisiones: 'Auditoría; remuneración' },
      { nombre: 'Andreas Nordbrandt', cargo: 'Consejero', tipo: 'Independiente', desde: '2021', comisiones: '—' },
      { nombre: 'Susanna Schneeberger', cargo: 'Consejera', tipo: 'Independiente', desde: '2024', comisiones: '—' },
      { nombre: 'Kai Wärn', cargo: 'Consejero', tipo: 'Independiente', desde: '2020', comisiones: '—' },
      { nombre: 'Stefan Widing', cargo: 'Consejero delegado', tipo: 'Ejecutivo', desde: '2020', comisiones: '—' },
      { nombre: 'Thomas Lilja', cargo: 'Representante de los empleados', tipo: 'Otro externo', desde: '2016', comisiones: '—' },
      { nombre: 'Fredrik Håf', cargo: 'Representante de los empleados', tipo: 'Otro externo', desde: '2022', comisiones: '—' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: Math.round((17503200 + 11266076 + 162009 + 2208243 + 6332794) / 1e4) / 100, fijo: 17.5, variable_corto: 11.27, variable_largo: 2.21, ratio_salario_medio: null },
    remuneracion: 'El consejero delegado devengó unos 37,5 M SEK en 2025: 17,5 M de fijo, 11,27 M de variable anual (el 88 % del máximo, que es el 75 % del fijo), 2,21 M de incentivo a largo plazo y 6,33 M de pensión (37,5 % del fijo) [1]. El plan a largo plazo da acciones según el BPA ajustado frente al del año anterior: el de 2024 no pagó nada porque el BPA bajó [1]. Preaviso y despido de 12 meses cada uno.',
    accionistas: [
      { nombre: 'Industrivärden', pct: 14.9, tipo: 'Industrial (sociedad de cartera sueca)', variacion: '+0,3 pp en 2025' },
      { nombre: 'BlackRock', pct: 5.0, tipo: 'Institucional', variacion: '+1,5 pp' },
      { nombre: 'Vanguard', pct: 3.8, tipo: 'Institucional', variacion: '+0,5 pp' },
      { nombre: 'Swedbank Robur Fonder', pct: 3.7, tipo: 'Institucional', variacion: '+0,3 pp' },
      { nombre: 'Lundbergföretagen', pct: 3.3, tipo: 'Industrial', variacion: '+0,2 pp' },
      { nombre: 'Alecta', pct: 2.6, tipo: 'Institucional', variacion: '−1,9 pp' },
      { nombre: 'Handelsbanken Fonder', pct: 2.1, tipo: 'Institucional', variacion: '−0,6 pp' },
      { nombre: 'Norges Bank Investment Management', pct: 2.1, tipo: 'Institucional', variacion: '+0,2 pp' },
    ],
    insiders: [
      { fecha: '2026-10-23', persona: 'Johan Molin (presidente del consejo)', operacion: 'Compra', acciones: 35000, importe: Math.round(35000 * 342.70 / 1e4) / 100 },
      { fecha: '2026-09-10', persona: 'Nadine Crauwels (presidenta de Machining, de salida)', operacion: 'Venta', acciones: 16889, importe: Math.round(16889 * 392.10 / 1e4) / 100 },
      { fecha: '2026-07-20', persona: 'Persona vinculada a Claes Boustedt (consejero)', operacion: 'Compra', acciones: 1000000, importe: Math.round(1000000 * 338.9323 / 1e4) / 100 },
      { fecha: '2026-05-21', persona: 'Stefan Widing (consejero delegado)', operacion: 'Compra', acciones: 10000, importe: Math.round(10000 * 372.40426 / 1e4) / 100 },
      { fecha: '2026-05-07', persona: 'Stefan Widing (consejero delegado)', operacion: 'Venta', acciones: 28576, importe: Math.round((21230 * 393.3592 + 7346 * 374.4488) / 1e4) / 100 },
      { fecha: '2026-05-07', persona: 'Cecilia Felton (directora financiera)', operacion: 'Venta', acciones: 11000, importe: Math.round((3829 * 384.7043 + 7171 * 386.2309) / 1e4) / 100 },
      { fecha: '2026-05-07', persona: 'Richard Harris (dirección)', operacion: 'Venta', acciones: 10000, importe: Math.round(10000 * 402.1041 / 1e4) / 100 },
    ],
    // El comité de nombramientos para 2027 lo forman Industrivärden (preside), Swedbank Robur, Lundbergs, Handelsbanken Fonder y el presidente [7].
    control_y_defensas: 'Una sola clase de acciones (un voto por acción) y sin accionista de control: Industrivärden, con el 14,9 %, dirige de hecho la comisión de nombramientos (para la junta de 2027 la preside Fredrik Lundberg, por Industrivärden, con Swedbank Robur, Lundbergs, Handelsbanken Fonder y el presidente Johan Molin) [7] y tiene dos consejeras no independientes de los accionistas (Stjernholm, su consejera delegada, y Fredriksson) [1]. Sin blindajes estatutarios ni operaciones vinculadas relevantes [1, 4]. Los diez primeros accionistas suman el 41 % [1].',
    alertas: ['Rotación en la dirección de las dos áreas grandes en 2026: Mining cambió de presidente el 1-jul y la presidenta de Machining se va (sep-26); el relevo se busca para antes de final de año [2, 3, 6].'],
    confianza: 'Media',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'voto_remuneracion_pct', tipo: 'Complemento', intentos: '1) Comunicado de la junta 2026 (sin recuento); 2) acta no descargada; 3) prensa (sin cifra)', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de SAND.ST y ^OMX (precio, rango, volumen, betas, cierres de ejercicio) y de los comparables', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-23', url: 'https://finance.yahoo.com/quote/SAND.ST/history' },
  { id: 2, titulo: 'Sandvik AB: estimaciones 2026-2028', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-26', url: 'https://www.marketscreener.com/quote/stock/SANDVIK-29421239/finances/' },
  { id: 3, titulo: 'Sandvik AB: consenso de analistas (21) y cambios de precio objetivo hasta el 26-oct-2026', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-26', url: 'https://www.marketscreener.com/quote/stock/SANDVIK-29421239/consensus/' },
  { id: 4, titulo: 'Comparables del sector (Epiroc, Atlas Copco, Caterpillar, Komatsu, Metso, Weir): estimaciones del 14-oct-2026 llevadas al cierre del 23-oct con Yahoo y los tipos del BCE', editor: 'Ficha sectorial propia (sectores/equipos-mineria-2026-10-14-comparables.json), con MarketScreener, Yahoo y BCE', tipo: 'Datos de mercado', fecha: '2026-10-23', url: 'sectores/equipos-mineria-2026-10-14-comparables.json' },
  { id: 5, titulo: 'Rendimiento del bono del Estado sueco a 10 años (SEGVB10YC), 23-oct-2026: 3,112 %', editor: 'Sveriges Riksbank', tipo: 'Primaria', fecha: '2026-10-23', url: 'https://api.riksbank.se/swea/v1/Observations/SEGVB10YC/2026-10-01/2026-10-26' },
  { id: 6, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026: 4,20 %', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 7, titulo: 'Weir to acquire Micromine (EV 657 M GBP; c.20x EBITDA 2025)', editor: 'The Weir Group PLC', tipo: 'Primaria', fecha: '2025-02-28', url: 'https://www.global.weir/globalassets/investors/reporting-centre/2025/weir-to-acquire-micromine-press-release.pdf' },
  { id: 8, titulo: 'Weir investor presentation: acquisition of ESCO (12,6x EV/EBITDA 2018e)', editor: 'The Weir Group PLC', tipo: 'Primaria', fecha: '2018-04-18', url: 'https://global.weir/siteassets/pdfs/weir-investor-presentation_20180418_vfinal-website.pdf' },
  { id: 9, titulo: 'Investor presentation: Sandvik to acquire DSI Underground (EV 943 M EUR; ventas 518 M EUR)', editor: 'Sandvik AB', tipo: 'Primaria', fecha: '2021-01', url: 'https://www.home.sandvik/siteassets/investors/reports--presentations/acqusition-presentations/investor-presentation-sandvik-to-acquire-dsi-underground.pdf' },
  { id: 10, titulo: 'Epiroc completes acquisition of STANLEY Infrastructure (760 M USD; ventas ~450 M USD)', editor: 'Epiroc AB', tipo: 'Primaria', fecha: '2024-04-01', url: 'https://www.epirocgroup.com/en/media/corporate-press-releases/2024/20240401-epiroc-completes-acquisition-of-stanley-infrastructure-to-strengthen-infrastructure-and-construction-business' },
  { id: 11, titulo: 'Sandvik interim report third quarter 2026 (acciones, deuda neta a 30-sep-26, guía del 4T26 y calendario)', editor: 'Sandvik AB', tipo: 'Primaria', fecha: '2026-10-22', url: `${CIS}/4413645/4331953.pdf` },
  { id: 12, titulo: 'Sandvik en MFN: comunicados y calendario (4T26 el 27-ene-2027; día del inversor el 24-25-nov-2026)', editor: 'MFN', tipo: 'Primaria', fecha: '2026-10-26', url: 'https://www.mfn.se/all/a/sandvik' },
  { id: 13, titulo: 'Sandvik interim reports Q4 2022, Q4 2023 y Q4 2025 (BPA ajustado diluido de operaciones continuadas 2021-2025)', editor: 'Sandvik AB', tipo: 'Primaria', fecha: '2026-01-27', url: `${CIS}/4298079/3899244.pdf` },
  { id: 14, titulo: 'Sandvik AB (STO: SAND) forecast: objetivo medio, mínimo y máximo (21 analistas, S&P Global) y BPA 2026', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-26', url: 'https://stockanalysis.com/quote/sto/SAND/forecast/' },
  { id: 15, titulo: 'Sandvik väntas redovisa 8 265 miljoner kronor i justerat ebita – Factset (consenso del 3T26)', editor: 'Placera (Finwire)', tipo: 'Analistas', fecha: '2026-10-20', url: 'https://www.placera.se/telegram/sandvik-sandvik-vantas-redovisa-8-265-miljoner-kronor-i-justerat-ebita-factset-20261020' },
  { id: 16, titulo: 'Sandviks vinstestimat har sänkts efter rapporten (consenso FactSet de EBITA ajustado 2026-2027 tras el 2T26)', editor: 'Börsvärlden (Finwire)', tipo: 'Analistas', fecha: '2026-08-21', url: 'https://borsvarlden.com/artiklar/sandviks-vinstestimat-har-sankts-efter-rapporten' },
  { id: 17, titulo: 'Tipos de cambio de referencia del euro, 14 y 23-oct-2026', editor: 'Banco Central Europeo', tipo: 'Primaria', fecha: '2026-10-23', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist-90d.xml' },
];
// Comparables: la ficha del 14-oct llevada al cierre del 23-oct. Capitalización × (precio 23-oct ÷ precio 14-oct) × (tipo SEK por unidad de divisa 23-oct ÷ 14-oct);
// valor empresa = capitalización + deuda neta (constante en SEK); múltiplos de EV escalan con el EV y el PER con el precio en divisa local.
const BCE = { '14': { SEK: 11.158, USD: 1.1195, JPY: 177.39, GBP: 0.84385, EUR: 1 }, '23': { SEK: 11.131, USD: 1.1193, JPY: 175.51, GBP: 0.83728, EUR: 1 } };
const sekPor = (div, d) => BCE[d].SEK / BCE[d][div];
const PRECIOS = { // [divisa, cierre 14-oct, cierre 23-oct] (Yahoo)
  Epiroc: ['SEK', 269.4, 250.7], 'Atlas Copco': ['SEK', 208.9, 176.3], Caterpillar: ['USD', 748.98, 687.0],
  Komatsu: ['JPY', 7388, 6708], Metso: ['EUR', 16.94, 16.41], Weir: ['GBP', 2722, 2502],
};
const r1 = (x) => Math.round(x * 10) / 10;
const compsAl23 = comps.map((e) => {
  const [div, p0, p1] = PRECIOS[e.nombre];
  const fp = p1 / p0, fx = sekPor(div, '23') / sekPor(div, '14');
  const ev0 = e.capitalizacion / (1 - e.dn_ebitda / e.ev_ebitda_ltm);
  const cap1 = e.capitalizacion * fp * fx;
  const ev1 = cap1 + (ev0 - e.capitalizacion) ;
  const k = ev1 / ev0 / fx; // múltiplos en divisa local: el EBITDA en SEK también se mueve con el tipo
  return { ...e, capitalizacion: Math.round(cap1), ev_ventas: Math.round(e.ev_ventas * k * 100) / 100, ev_ebitda_ltm: r1(e.ev_ebitda_ltm * k), ev_ebitda_ntm: r1(e.ev_ebitda_ntm * k), per_ntm: r1(e.per_ntm * fp), fcf_yield_pct: r1(e.fcf_yield_pct / fp) };
});
const id = bolsa.identificacion;
const D = {
  _estado: 'Completo.',
  identificacion: {
    nombre: 'Sandvik AB (publ)', nombre_corto: 'Sandvik', ticker: 'SAND', isin: 'SE0000667891', mercado: 'Nasdaq Stockholm (Large Cap)', indice_referencia: 'OMX Stockholm 30',
    pais: 'Suecia', pais_iso: 'SE', sector: 'Industria', industria: 'Maquinaria industrial', sede: 'Estocolmo', fundacion: '1862', empleados: 42831, web: 'https://www.home.sandvik',
    precio: id.precio, fecha_precio: id.fecha_precio, acciones: 1254.4, capitalizacion_publicada: null, free_float_pct: 85.0,
    max_52s: id.max_52s, min_52s: id.min_52s, volumen_medio_diario: `≈ ${String(bolsa.volumen_3m.importe_dia_millones).replace('.', ',')} M SEK/día (3 meses)`, proximos_resultados: '2027-01-27',
  },
  consenso: {
    guidance: 'Sandvik no da previsiones de negocio. Para el 4T26 avisa de +600 M de efecto divisa en el EBITA ajustado frente al 4T25, un efecto temporal del tungsteno «limitado» y −400 M de pedidos e ingresos por la devolución de aranceles de EE. UU. (sin efecto en el EBITA); capex en efectivo de 4.000-4.500 M en 2026, intereses netos de −700 M (antes −600 M) y tipo impositivo normalizado del 23-25 % [11]. Objetivos 2025-2030 reconfirmados: crecimiento del 7 % anual a lo largo del ciclo (orgánico y compras, a divisa constante), EBITA ajustado del 20-22 %, dividendo del 50 % del BPA ajustado y deuda financiera neta inferior a 1,5 veces el EBITDA [11]. Día del inversor el 24-25 de noviembre de 2026, donde revisará el corredor de margen de Machining (22-24 %, fijado antes del tungsteno) [12].',
    estimaciones: [
      { periodo: '2026e', ingresos: 144943, ebitda: 37147, ebit: 29382, bpa: 16.81, dpa: 7.43, fuente: 'MarketScreener [2]' },
      { periodo: '2027e', ingresos: 165488, ebitda: 41245, ebit: 33407, bpa: 19.65, dpa: 8.35, fuente: 'MarketScreener [2]' },
      { periodo: '2028e', ingresos: 170362, ebitda: 42779, ebit: 34563, bpa: 20.93, dpa: 8.74, fuente: 'MarketScreener [2]' },
    ],
    recomendaciones: { n_analistas: 21, comprar: null, mantener: null, vender: null, po_medio: 395.86, po_min: 290, po_max: 465 },
    revisiones: 'Consenso medio «Sobreponderar» en MarketScreener con 21 analistas y objetivo medio de 395,86 SEK (mín. 290, máx. 465) [3]; Stock Analysis (S&P Global, 21 analistas) da «Mantener» y 389,71 SEK [14]. Tras el 3T26 suben las recomendaciones: Pareto a Comprar (400 SEK) y Nordea de Vender a Comprar (375) el 22-23 oct, Deutsche Bank sube a 436 y Morgan Stanley pasó a Sobreponderar (440) el 19-oct; Oddo baja a 370 (Neutral) y Citi espera revisiones de estimaciones a la baja [3]. El 3T26 batió al consenso de FactSet en ingresos (37.728 frente a 36.807 M) y EBITA ajustado (8.477 frente a 8.265 M), con pedidos en línea (36.948 frente a 36.950) [15]. Tras el 2T26 FactSet había recortado un 1 % el EBITA ajustado de 2026 y 2027 (31.292 y 33.839 M) [16]. Las estimaciones de MarketScreener del 26-oct apenas se mueven frente a las del 14-oct (BPA 2026 16,81 frente a 16,76) y pueden no recoger aún el 3T26 [2].',
    base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: 0.5,
    confianza: 'Media',
  },
  bolsa: { ...bolsa.bolsa, beta: bolsa.betas.mensual_5a, posicion_corta_pct: null, confianza: 'Alta' },
  multiplos_historicos: {
    serie: bolsa.cierres_ejercicio.filter((x) => +x.anio >= 2021).map((x) => ({ anio: x.anio, precio_cierre: x.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    confianza: 'Alta',
  },
  comparables: { empresas: compsAl23, confianza: 'Media' },
  transacciones: {
    operaciones: [
      { fecha: '2025-02', objetivo: 'Micromine (software de minería, Australia)', comprador: 'Weir', ev: Math.round(657 * 13.22), ev_ventas: 10.0, ev_ebitda: 20.0, prima_pct: null, excluir: true, comentario: 'Software: otro múltiplo; fuera de la media [7].' },
      { fecha: '2024-04', objetivo: 'Stanley Infrastructure (implementos hidráulicos, EE. UU.)', comprador: 'Epiroc', ev: 8200, ev_ventas: 1.74, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'EV/ventas con las ventas de 2023 [10].' },
      { fecha: '2021-07', objetivo: 'DSI Underground (sostenimiento de roca)', comprador: 'Sandvik', ev: Math.round(943 * 10.1), ev_ventas: 1.82, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'EV 943 M EUR sobre ventas de 518 M EUR [9].' },
      { fecha: '2018-07', objetivo: 'ESCO (piezas de desgaste para minería)', comprador: 'Weir', ev: Math.round(1285 * 8.7), ev_ventas: null, ev_ebitda: 12.6, prima_pct: null, excluir: false, comentario: '12,6 veces el EBITDA de 2018e sin sinergias [8].' },
    ],
    confianza: 'Media',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'bolsa', campo: 'posicion_corta_pct', tipo: 'Complemento', intentos: '1) Registro de posiciones cortas de la Finansinspektionen (la página del registro da 404 por curl y requiere navegador); 2) Stock Analysis (sin dato); 3) prensa sueca (sin cifra)', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Foro de Sandvik en Nordnet: mensajes del 15 al 23-oct-2026', editor: 'Nordnet', tipo: 'Foros y redes', fecha: '2026-10', url: 'https://www.nordnet.se/marknaden/aktiekurser/16100423-sandvik' },
  { id: 2, titulo: 'Sandvik AB: cambios de recomendación y precio objetivo (oct-2026)', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-26', url: 'https://www.marketscreener.com/quote/stock/SANDVIK-29421239/consensus/' },
  { id: 3, titulo: 'Seeking Alpha: artículos y noticias de Sandvik (SDVKY), may-oct 2026 (RSS)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10', url: 'https://seekingalpha.com/api/sa/combined/SDVKY.xml' },
  { id: 4, titulo: 'Reacción de la acción en los días de resultados (2T26 −9,3 %, 1T26 −0,1 %, 4T25 +1,9 %)', editor: 'Placera (Finwire)', tipo: 'Prensa', fecha: '2026-10-20', url: 'https://www.placera.se/telegram/sandvik-sandvik-vantas-redovisa-8-265-miljoner-kronor-i-justerat-ebita-factset-20261020' },
];
const E = {
  _estado: 'Completo con debate escaso: Nordnet (8 mensajes desde los resultados), titulares de Seeking Alpha y notas de bancos; Reddit y Stocktwits sin hilos recientes de Sandvik.',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Nordnet, foro de Sandvik', fecha: '2026-10', n_comentarios: 8, tono: 'Positivo', resumen: 'Tras el 3T26 dominan los mensajes al alza: resultados fuertes, subidas de recomendación y la compra del presidente; un usuario compró a unos 332 SEK. Los escépticos hablan de recogida de beneficios, de la corona, el petróleo y la política, y el mensaje más elaborado pregunta si el margen de Machining aguanta sin el tungsteno [1].' },
      { plataforma: 'MarketScreener (notas de bancos)', fecha: '2026-10', n_comentarios: 18, tono: 'Positivo', resumen: 'Tras el 3T26 Pareto y Nordea pasan a Comprar y Deutsche Bank sube el objetivo; Oddo baja el suyo y Citi espera recortes de estimaciones; BNP había bajado a Neutral el 1-oct [2].' },
      { plataforma: 'Seeking Alpha (artículos de autores)', fecha: '2026-10', n_comentarios: 4, tono: 'Dividido', resumen: 'Titulares de mayo y julio bajistas («sobrevaloración», «el tungsteno distorsiona el beneficio», con rebaja de recomendación) y uno alcista del 10-oct sobre la cadena de suministro y el ciclo de beneficios [3].' },
    ],
    temas: [
      { tema: 'Margen de Machining sin el tungsteno', postura: 'Dividida', peso: 'Alto', contraste: 'El efecto temporal se redujo a 104 M en el 3T26 y el margen de Machining siguió en el 25,7 %, por encima de su corredor del 22-24 %; parte es polvo de tungsteno caro que se normalizará. Lo recoge nuestro base (EBITA ajustado del grupo del 21,5 % en 2027).' },
      { tema: 'Ciclo minero y del cobre', postura: 'Alcista', peso: 'Medio', contraste: 'Pedidos de Mining +11 % orgánico (+18 % sin pedidos grandes) y posventa +16 %: los datos dan la razón a los alcistas, aunque los equipos ya no crecen.' },
      { tema: 'Compra del presidente tras los resultados', postura: 'Alcista', peso: 'Medio', contraste: 'Cierto: 35.000 acciones a 342,70 SEK el 23-oct (12 M SEK), registro de la Finansinspektionen; es una señal, no un cambio de cifras.' },
      { tema: 'Valoración (PER de unas 20 veces)', postura: 'Dividida', peso: 'Medio', contraste: 'Cotiza a unas 19 veces nuestro BPA ajustado de 2027, por encima de su mediana adelantada de cinco años (17,9).' },
    ],
    lectura: 'El tono de los particulares mejora tras el 3T26, apoyado en las subidas de recomendación y la compra del presidente, pero el debate es escaso y no hay euforia: la acción sigue un 15 % bajo su máximo. La duda que más se repite, si el margen de Machining aguanta sin el tungsteno, es la misma que separa nuestro BPA del consenso. No añade un riesgo que el informe no recoja.',
    confianza: 'Baja',
  },
  fuentes: fE,
  huecos: [],
};

guarda('A', A); guarda('B', B); guarda('C', C); guarda('D', D); guarda('E', E);
console.log('Notas A-E escritas en', dir);
