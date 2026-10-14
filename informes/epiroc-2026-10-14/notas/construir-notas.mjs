// Escribe las notas A-E de Epiroc AB (corte 2026-10-14) a partir de los documentos descargados en notas/docs
// (informes anuales 2021, 2023 y 2025, trimestrales 2T25-2T26, notas de prensa), del XBRL ESEF (cuentas-xbrl.json),
// de bolsa.json (Yahoo) y de MarketScreener (consenso y comparables). Cada nota cita solo con [n] de su lista.
// Ejecutar: node informes/epiroc-2026-10-14/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const bolsa = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const comps = JSON.parse(fs.readFileSync('/tmp/claude-0/-home-user/d126dcb0-bff8-5840-8dfd-057758ea68be/scratchpad/calc/comps.json', 'utf8'));

const CIS = 'https://mb.cision.com/Main/16899';
// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Epiroc Annual and Sustainability Report 2025 (cuentas consolidadas, notas 3, 4, 13, 22, 23; resumen de diez años)', editor: 'Epiroc AB', tipo: 'Primaria', fecha: '2026-03-19', url: `${CIS}/4323601/3992085.pdf` },
  { id: 2, titulo: 'Epiroc Annual and Sustainability Report 2023 (notas de arrendamientos e intangibles 2022-2023; segmentos)', editor: 'Epiroc AB', tipo: 'Primaria', fecha: '2024-03', url: `${CIS}/3942400/2654456.pdf` },
  { id: 3, titulo: 'Epiroc Annual and Sustainability Report 2021 (notas de arrendamientos, intangibles y segmentos 2020-2021)', editor: 'Epiroc AB', tipo: 'Primaria', fecha: '2022-03', url: `${CIS}/3517772/1543872.pdf` },
  { id: 4, titulo: 'Epiroc interim report Q2 2026', editor: 'Epiroc AB', tipo: 'Primaria', fecha: '2026-07-17', url: `${CIS}/4375716/4197580.pdf` },
  { id: 5, titulo: 'Epiroc interim report Q1 2026', editor: 'Epiroc AB', tipo: 'Primaria', fecha: '2026-04-29', url: `${CIS}/4341697/4066139.pdf` },
  { id: 6, titulo: 'Epiroc interim report Q4 2025', editor: 'Epiroc AB', tipo: 'Primaria', fecha: '2026-01-26', url: `${CIS}/4297572/3896941.pdf` },
  { id: 7, titulo: 'Epiroc interim report Q3 2025', editor: 'Epiroc AB', tipo: 'Primaria', fecha: '2025-10-29', url: `${CIS}/4258152/3750117.pdf` },
  { id: 8, titulo: 'Epiroc interim report Q2 2025', editor: 'Epiroc AB', tipo: 'Primaria', fecha: '2025-07-18', url: `${CIS}/4208784/3585253.pdf` },
  { id: 9, titulo: 'Epiroc Aktiebolag: informes anuales ESEF 2021-2024 (xBRL-JSON; cuenta, balance y flujos 2020-2024)', editor: 'filings.xbrl.org (ESEF, Finansinspektionen)', tipo: 'Primaria', fecha: '2025-03', url: 'https://filings.xbrl.org/5493004Q73OEYW1SPE91/2024-12-31/ESEF/SE/0/epirocab-2024-12-31-0-sv/reports/epirocab-2024-12-31-0-sv.xhtml' },
  { id: 10, titulo: 'Epiroc Capital Markets Day: Innovation and global presence for profitable growth', editor: 'Epiroc AB', tipo: 'Primaria', fecha: '2026-06-08', url: `${CIS}/4358787/4137733.pdf` },
];

// Cuenta: XBRL ESEF 2020-2024 comprobado con el resumen de diez años del informe anual 2025; 2025 del informe anual 2025.
// gastos_generales = administración + comercial (sin I+D). EBITDA = el publicado (EBIT + amortizaciones y deterioros).
const c = (periodo, ingresos, coste_ventas, adm, mkt, ebitda, ebit, rf, bai, imp, mino, bn, gf, bpa, dpa, acc) => ({
  periodo, ingresos, coste_ventas, gastos_generales: adm + mkt, ebitda, amortizaciones: ebitda - ebit, ebit,
  resultado_financiero: rf, bai, impuestos: imp, minoritarios: mino, beneficio_neto: bn, gastos_financieros: gf,
  participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa, dpa, dpa_extraordinario: 0, acciones_diluidas: acc,
});
const cuenta = [
  c('2020', 36122, 22418, 2817, 2225, 9128, 7382, -295, 7087, 1677, 11, 5399, 439, 4.48, 2.50, 1205),
  c('2021', 39645, 24192, 3166, 2313, 10740, 8995, -31, 8964, 1895, 11, 7058, 197, 5.84, 3.00, 1208),
  c('2022', 49694, 30675, 3628, 3042, 13276, 11147, -369, 10778, 2367, 14, 8397, 607, 6.95, 3.40, 1208),
  c('2023', 60343, 37197, 4105, 3959, 15843, 13183, -948, 12235, 2777, 27, 9431, 1297, 7.81, 3.80, 1207),
  c('2024', 63604, 40658, 4531, 4250, 15827, 12385, -946, 11439, 2683, 25, 8731, 1416, 7.23, 3.80, 1208),
  c('2025', 61998, 39024, 4498, 4021, 15011, 11925, -689, 11236, 2637, -3, 8602, 1165, 7.11, 3.80, 1209),
];
// LTM jun-26 = 2025 + 1S26 − 1S25
const ltm = { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 61998 + 31053 - 30666, ebitda: 15011 + (6162 + 1559) - (5919 + 1547), ebit: 11925 + 6162 - 5919, beneficio_neto: 8602 + 4535 - 4298, bpa: 7.12 + 3.75 - 3.56, dpa: 3.8, dpa_extraordinario: 0, fcf: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null };

// Balance. deuda_financiera = pasivos con interés (corto + largo; XBRL LongtermBorrowings + CurrentBorrowings…) MENOS arrendamientos,
// que Epiroc incluye dentro de los pasivos con interés (nota 22-23). caja = efectivo (los «financial assets» corrientes no).
const b = (periodo, at, ac, pc, pt, fc, intang, imm, exi, cli, prov, caja, ibl, arr, pn, mino, res) => ({
  periodo, activo_total: at, activo_corriente: ac, pasivo_corriente: pc, pasivo_total: pt, fondo_comercio: fc, intangibles: intang - fc,
  inmovilizado_material: imm, existencias: exi, clientes: cli, proveedores: prov, activos_contrato: null, pasivos_contrato: null,
  caja, deuda_financiera: ibl - arr, arrendamientos: arr, patrimonio_neto: pn, minoritarios: mino, reservas: res,
});
const balance_hist = [
  b('2020', 43886, 32313, 8867, 20147, 2049, 4111, 4150 + 999, 8930, 6045, 3605, 15053, 10155, 1442 + 371, 23693, 46, 24220),
  b('2021', 48583, 32902, 12438, 22798, 4089, 7233, 4587 + 1279, 11861, 7174, 5512, 10792, 9190, 1528 + 424, 25729, 56, 25137),
  b('2022', 61780, 38475, 17379, 28272, 8275, 13073, 5429 + 1458, 16945, 9581, 6375, 7326, 10876, 1842 + 538, 33020, 488, 30228),
  b('2023', 67784, 41120, 17003, 30574, 10222, 15843, 6032 + 1582, 18747, 10455, 5902, 6401, 13975, 1808 + 596, 36822, 388, 35452),
  b('2024', 83589, 45204, 18252, 40409, 16699, 25075, 7932 + 1543, 19191, 12424, 5756, 7179, 22017, 2336 + 792, 42757, 423, 39947),
  b('2025', 80377, 45533, 19156, 38105, 14531, 21923, 7449 + 1300, 18100, 11155, 5683, 9574, 16776 + 4247, 2015 + 754, 42261, 11, 44167),
];
// Flujos: capex = inmovilizado material (InvestmentsInOtherPropertyPlantAndEquipment, concepto propio que cuentas.mjs no recogía en 2022-2024) + intangibles.
// La inversión neta en equipos de alquiler va dentro del flujo operativo (así lo presenta Epiroc).
const f = (periodo, fo, capex, arr, adq, des, div, rec, emi) => ({ periodo, flujo_operativo: fo, capex, pagos_arrendamientos: arr, adquisiciones: adq, desinversiones: des, dividendos: div, recompras: rec, emision_acciones: emi, intereses_en_financiacion: 0 });
const flujos_hist = [
  f('2020', 8334, 1005, 457, 63, 72, 2892, 0, 0),
  f('2021', 7607, 437 + 489, 444, 2358, 7, 3016, 284, 0),
  f('2022', 5558, 414 + 600, 470, 4696, 10, 3619, 0, 0),
  f('2023', 7143, 643 + 1044, 573, 3666, 62, 4103, 0, 0),
  f('2024', 10460, 966 + 890, 667, 9658, 16, 4591, 0, 290),
  f('2025', 10675, 1120 + 875, 782, 88 + 355, 26, 4594, 0, 142),
];
const seg = (nombre, descripcion, filas) => ({ nombre, descripcion, tipo_resultado: 'EBIT', historico: filas.map(([periodo, ingresos, resultado]) => ({ periodo, ingresos, resultado })) });

const A = {
  _estado: 'Completo. Cuenta, balance y flujos 2020-2024 del XBRL ESEF, comprobados con los informes anuales; 2025 y 1S26 de los informes de la empresa.',
  negocio: {
    segmentos: [
      seg('Equipment & Service', 'Equipos de perforación, carga, transporte, sostenimiento, ventilación y exploración, con sus recambios y servicio; automatización y digital.', [['2020', 26927, 6639], ['2021', 29320, 7808], ['2022', 38904, 9491], ['2023', 47530, 11792], ['2024', 48914, 11310], ['2025', 47121, 10458]]),
      seg('Tools & Attachments', 'Herramientas de perforación (consumibles), sostenimiento de roca, implementos hidráulicos (Stanley Infrastructure desde abr-24).', [['2020', 9024, 1097], ['2021', 10205, 1784], ['2022', 10806, 1900], ['2023', 12723, 1780], ['2024', 14640, 1373], ['2025', 14788, 1810]]),
      seg('Funciones comunes y eliminaciones', 'Epiroc Financial Solutions, sede y eliminaciones entre segmentos.', [['2020', 171, -354], ['2021', 120, -597], ['2022', -16, -244], ['2023', 90, -389], ['2024', 50, -298], ['2025', 89, -343]]),
    ],
    geografias: [
      { nombre: 'Norteamérica', peso_pct: 28.7 }, { nombre: 'Asia/Australia', peso_pct: 29.3 }, { nombre: 'África/Oriente Medio', peso_pct: 16.1 },
      { nombre: 'Europa', peso_pct: 13.3 }, { nombre: 'Sudamérica', peso_pct: 12.6 },
    ],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Pedidos recibidos (M SEK)', valor_anterior: '62.213 (2024)', valor_actual: '62.974 (2025); 35.645 en 1S26 (+12 %)', variacion: '+1 % (orgánico +7 %)', comentario: 'Libro-facturación de 104 % en el 2T26 y 128 % en el 1T26 [4, 5].' },
      { kpi: 'Peso de la posventa (servicio + herramientas) en ingresos', valor_anterior: '67 % (2T25)', valor_actual: '64 % (2T26); 66 % en 2025', variacion: '−3 pp', comentario: 'Baja porque los equipos crecen más (pedidos de equipos +30 % orgánico en el 2T26) [4, 1].' },
      { kpi: 'Margen operativo ajustado', valor_anterior: '19,6 % (2025)', valor_actual: '20,1 % (2T26)', variacion: '+0,5 pp', comentario: 'Media de 20,3 % desde 2016; divisa −1,0 pp en el 2T26 [4, 1].' },
      { kpi: 'Capital circulante medio / ingresos', valor_anterior: '36,9 % (2025)', valor_actual: '37,1 % (2T26)', variacion: '+0,2 pp', comentario: 'Muy alto para un industrial: inventario de recambios en ~150 países [4].' },
      { kpi: 'ROCE (12 meses)', valor_anterior: '20,2 % (2T25)', valor_actual: '19,3 % (2T26)', variacion: '−0,9 pp', comentario: 'Media de 24,1 % desde 2016; cae por el fondo de comercio de las compras de 2022-2024 [4, 1].' },
      { kpi: 'Pedidos de minería sobre el total', valor_anterior: '79 % (2T25)', valor_actual: '82 % (2T26)', variacion: '+3 pp', comentario: 'Cobre 36 % y oro 29 % de los pedidos de minería en 2025 [4, 1].' },
    ],
    confianza: 'Alta',
  },
  financieros: {
    cuenta, ltm, cambios_perimetro: [{ periodo: '2024', descripcion: 'Stanley Infrastructure (ventas 4.725 M SEK), consolidada desde el 1-abr-24: nueve meses en la cuenta de 2024.' }],
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '3T24', ingresos: 15699, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 3277 + 1168, margen_ebitda_pct: null, bpa: 1.92, vs_consenso: null },
      { periodo: '4T24', ingresos: 17251, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 3427 + 815, margen_ebitda_pct: null, bpa: 1.96, vs_consenso: null },
      { periodo: '1T25', ingresos: 15536, crecimiento_pct: 9.8, crecimiento_organico_pct: null, ebitda: 3088 + 779, margen_ebitda_pct: null, bpa: 1.82, vs_consenso: null },
      { periodo: '2T25', ingresos: 15130, crecimiento_pct: -8.4, crecimiento_organico_pct: 1, ebitda: 2831 + 768, margen_ebitda_pct: null, bpa: 1.74, vs_consenso: null },
      { periodo: '3T25', ingresos: 15242, crecimiento_pct: -2.9, crecimiento_organico_pct: 5, ebitda: 2802 + 765, margen_ebitda_pct: null, bpa: 1.62, vs_consenso: null },
      { periodo: '4T25', ingresos: 16090, crecimiento_pct: -6.7, crecimiento_organico_pct: 4, ebitda: 3204 + 776, margen_ebitda_pct: null, bpa: 1.94, vs_consenso: null },
      { periodo: '1T26', ingresos: 14351, crecimiento_pct: -7.6, crecimiento_organico_pct: 2, ebitda: 2846 + 756, margen_ebitda_pct: null, bpa: 1.74, vs_consenso: null },
      { periodo: '2T26', ingresos: 16702, crecimiento_pct: 10.4, crecimiento_organico_pct: 11, ebitda: 3316 + 803, margen_ebitda_pct: null, bpa: 2.01, vs_consenso: null },
    ].map((t) => ({ ...t, margen_ebitda_pct: Math.round((t.ebitda / t.ingresos) * 1000) / 10 })),
    confianza: 'Alta',
  },
  balance: {
    historico: balance_hist,
    vencimientos: [{ anio: '2026', importe: 3368 }, { anio: '2027', importe: 3516 }, { anio: '2028', importe: 1905 }, { anio: '2029', importe: 856 }, { anio: '2030', importe: 3293 }, { anio: '2031+', importe: 7093 }],
    liquidez: 'Caja 6.928 M SEK y activos financieros corrientes 1.701 M a 30-jun-26 [4]; línea de crédito comprometida no dispuesta de 4.000 M (vence en 2030) y programa de pagarés de 2.000 M [1].',
    rating: 'S&P BBB+, perspectiva estable (confirmado en mayo de 2023; sin cambios en 2025) [1]',
    coste_deuda_pct: 4.1, vida_media_anios: 3.8,
    confianza: 'Alta',
  },
  flujos: { historico: flujos_hist, confianza: 'Alta' },
  calidad: { auditor: 'Ernst & Young AB (socio firmante Erik Sandström desde 2022; antes Deloitte)', anios_auditor: 4, opinion: 'Favorable', confianza: 'Alta' },
  capital: {
    adquisiciones: [
      { anio: '2024', objetivo: 'Stanley Infrastructure (EE. UU., implementos hidráulicos; ventas 4.725 M SEK)', importe: 8200, ev_ebitda: null, financiacion: 'Caja y crédito puente refinanciado con bonos', resultado: 'Mercado de construcción débil en 2024-2025; reestructuración de plantas; deterioro de intangibles de 347 M en 2024 en E&S (otra adquisición) y ajuste de fondo de comercio de −196 M en T&A en 2025 [1].' },
      { anio: '2025', objetivo: 'Radlink (47 % restante; redes de comunicación minera, ventas ~1.330 M)', importe: 355, ev_ebitda: null, financiacion: 'Caja', resultado: 'Consolidada desde 2022; base de la automatización [1].' },
      { anio: '2026', objetivo: 'Eventspec (Sudáfrica, recambios y reconstrucción; ventas ~160 M)', importe: null, ev_ebitda: null, financiacion: 'Caja', resultado: 'Cerrada en ago-26; refuerza el servicio [4].' },
    ],
    confianza: 'Media',
  },
  fuentes: fA,
  huecos: [
    { seccion: 'trimestres', campo: 'crecimiento 3T24-4T24', tipo: 'Complemento', intentos: '1) Informes del 3T25 y 4T25 (solo comparan con 2024); 2) informe anual 2025 (sin trimestres); 3) no se descargaron los del 3T24-4T24 por presupuesto', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Epiroc Annual and Sustainability Report 2025: mercado, clientes, competencia y exposición por mineral', editor: 'Epiroc AB', tipo: 'Primaria', fecha: '2026-03-19', url: `${CIS}/4323601/3992085.pdf` },
  { id: 2, titulo: 'Global Mining Machinery Market (USD 133.090 M en 2025; 184.556 M en 2031; TCAC 5,6 %)', editor: 'Ken Research', tipo: 'Sectorial', fecha: '2026', url: 'https://www.kenresearch.com/global-mining-machinery-market' },
  { id: 3, titulo: 'Mining equipment market (IMARC: 156.190 M USD en 2024)', editor: 'IMARC Group (vía HackMD)', tipo: 'Sectorial', fecha: '2025', url: 'https://hackmd.io/@Rwalker/Bk0KcUXOxe' },
  { id: 4, titulo: 'Sandvik AB: estimaciones y cuentas 2024-2028', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/SANDVIK-29421239/finances/' },
  { id: 5, titulo: 'Caterpillar Inc.: estimaciones y cuentas 2024-2028', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/CATERPILLAR-INC-4817/finances/' },
  { id: 6, titulo: 'Komatsu Ltd.: estimaciones y cuentas FY2025-FY2029', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/KOMATSU-LTD-6491329/finances/' },
  { id: 7, titulo: 'Metso Oyj: estimaciones y cuentas 2024-2028', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/OUTOTEC-39432775/finances/' },
  { id: 8, titulo: 'The Weir Group PLC: estimaciones y cuentas 2024-2028', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/WEIR-PLC-9590176/finances/' },
  { id: 9, titulo: 'Atlas Copco AB: estimaciones y cuentas 2024-2028', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/ATLAS-COPCO-AB-43306890/finances/' },
  { id: 10, titulo: 'Futuros de oro (GC=F) y cobre (HG=F): históricos mensuales 2021-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/HG%3DF/history' },
  { id: 11, titulo: 'Epiroc interim report Q2 2026 (mezcla minería/infraestructura, perspectivas)', editor: 'Epiroc AB', tipo: 'Primaria', fecha: '2026-07-17', url: `${CIS}/4375716/4197580.pdf` },
  { id: 12, titulo: 'Epiroc and SANY Group sign global partnership agreement', editor: 'Epiroc AB', tipo: 'Primaria', fecha: '2026-05-26', url: 'https://www.mfn.se/cis/a/epiroc/epiroc-and-sany-group-sign-global-partnership-agreement-dc21168a' },
];
const SEK_USD25 = 9.86, SEK_JPY = 11.158 / 177.39, SEK_EUR25 = 11.07, SEK_GBP = 11.158 / 0.84385;
const B = {
  _estado: 'Completo; tamaño de mercado de fuentes de pago leídas en su página pública (cifra de cabecera).',
  historia: {
    resumen: 'Epiroc nace en 2018 como escisión de la división de minería e infraestructura de Atlas Copco, que fabricaba perforadoras de roca desde 1873 (Atlas Diesel, AB Atlas, Atlas Copco). Salió a bolsa en Estocolmo el 18-jun-2018 con dos clases de acciones (A con un voto, B con una décima) e Investor AB como primer accionista. Desde entonces ha comprado más de 20 empresas, sobre todo de posventa, automatización y herramientas, y en 2024 hizo la mayor compra de su historia, Stanley Infrastructure (8.200 M SEK). Helena Hedblom es consejera delegada desde marzo de 2020 y en septiembre de 2025 la empresa se reorganizó en dos áreas de negocio [1].',
    hitos: [
      { anio: '1873', hito: 'Fundación de AB Atlas, origen de Atlas Copco y de su negocio de perforación de roca [1].' },
      { anio: '2018', hito: 'Escisión de Atlas Copco y salida a bolsa de Epiroc (18-jun) [1].' },
      { anio: '2020', hito: 'Helena Hedblom, consejera delegada; reparto extraordinario de 3,00 SEK por acción mediante amortización [1].' },
      { anio: '2022', hito: 'Compra del 53 % de Radlink (redes para minas automatizadas) y de varias empresas de herramientas y posventa [1].' },
      { anio: '2024', hito: 'Compra de Stanley Infrastructure (EE. UU., 760 M USD) [1].' },
      { anio: '2025', hito: 'Mayor contrato de su historia (Fortescue, 350 M AUD, equipos autónomos y eléctricos); dos áreas de negocio desde el 1-sep [1].' },
      { anio: '2026', hito: 'Alianza global con SANY (mayo) y día del inversor (8-jun) que reafirma los objetivos [12, 11].' },
    ],
    confianza: 'Alta',
  },
  negocio: {
    descripcion: 'Epiroc fabrica y mantiene equipos para minería subterránea y a cielo abierto y para obra civil en roca: perforadoras (Boomer, Pit Viper), cargadoras y camiones de mina, equipos de sostenimiento, ventilación y exploración, más herramientas de perforación, implementos hidráulicos para excavadoras y soluciones digitales y de automatización independientes del fabricante. El 82 % de los pedidos del 2T26 viene de la minería y el 18 % de infraestructura [11]. Vende sobre todo de forma directa (80 % de los ingresos de 2025) con unos 19.400 empleados y servicio en unos 150 países; entre sus clientes están Anglo American, Barrick, BHP, Freeport, Glencore, Newmont, Rio Tinto y Vale [1].',
    como_gana_dinero: 'Dos tercios de los ingresos son posventa: servicio y recambios (42 % en 2025) y herramientas y consumibles (24 %); el tercio restante son equipos nuevos (34 %) [1]. La posventa crece con el parque instalado y las horas de trabajo de las minas, que se mantienen aunque baje la inversión, y deja más margen; los equipos dependen del ciclo de inversión minera y de los pedidos grandes (> 150 M SEK). El margen depende de la mezcla (más equipos, menos margen), del aprovechamiento de las fábricas de Suecia, EE. UU., India y China y de la divisa: la corona fuerte restó 1,0 punto de margen en el 2T26 [11]. La demanda de infraestructura es más fuerte en el primer semestre [1].',
    clientes: 'Los diez primeros clientes, todos mineros, suman el 18 % de los ingresos de 2025 (20 % en 2024) y ninguno es dominante [1]. El 65 % de los pedidos de minería viene de minas de cobre (36 %) y oro (29 %); el hierro pesa un 14 % [1]. Los contratos de equipos se cierran pedido a pedido, salvo los grandes de flotas autónomas (Fortescue: 350 M AUD a cinco años) [1]. El poder de precio se ve en el margen bruto, que subió del 33,6 % de 2016 al 37,1 % de 2025 pese a la inflación de costes de 2022-2023 [1]. El coste de los equipos es una parte pequeña del coste de la mina, pero una parada cuesta mucho: el cliente paga por disponibilidad y servicio, no por precio [1].',
    confianza: 'Alta',
  },
  sector: {
    definicion: 'Maquinaria y servicios para minería (perforación, carga y transporte, trituración y procesado, sostenimiento) y equipos de perforación y demolición para obra civil, con su posventa. Usamos la cifra de Ken Research de maquinaria minera mundial (133.090 M USD en 2025) como techo amplio: incluye camiones y palas de cielo abierto y procesado, donde Epiroc no compite, por lo que su cuota en su nicho de roca dura es bastante mayor que la que sale sobre ese total [2]. IMARC da una cifra más alta (156.190 M USD en 2024) con un perímetro aún más amplio [3].',
    tamano: '≈ 133.090 M USD en 2025 (≈ 1.312.000 M SEK) [2]; 156.190 M USD en 2024 según IMARC [3]',
    unidad_serie: 'millones de SEK (Ken Research, a 9,86 SEK/USD)',
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
      { driver: 'Precio del cobre y del oro', efecto: '+', horizonte: 'Cíclico', evidencia: 'Cobre 6,64 USD/lb y oro 4.105 USD/oz en oct-26, frente a 4,28 y 1.774 en nov-21 [10]; el 65 % de los pedidos mineros de Epiroc es de cobre y oro [1].' },
      { driver: 'Leyes decrecientes y minas más profundas', efecto: '+', horizonte: 'Estructural', evidencia: 'Más roca movida por tonelada de metal y más minería subterránea, donde Epiroc es líder [1].' },
      { driver: 'Automatización, electrificación y digital', efecto: '+', horizonte: 'Estructural', evidencia: 'Contrato de Fortescue (350 M AUD) de equipos autónomos y eléctricos; objetivo de gama sin emisiones completa en 2030 [1].' },
      { driver: 'Electrificación y transición energética (demanda de cobre)', efecto: '+', horizonte: 'Estructural', evidencia: 'Pedidos de exploración de 3.100 M SEK en 12 meses (4,7 % del grupo) por precios récord [11].' },
      { driver: 'Inversión en infraestructura y construcción', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Débil en 2024-2025; fin del desabastecimiento de distribuidores a finales de 2025; Epiroc espera una mejora leve [1, 11].' },
      { driver: 'Corona sueca', efecto: '−', horizonte: 'Cíclico', evidencia: 'La divisa restó un 10-11 % a los ingresos en el 4T25 y el 1T26 y 1 punto al margen del 2T26 [11].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Sandvik es el gran rival en roca dura; Caterpillar y Komatsu en carga y transporte; chinos (SANY, XCMG) entrando por precio. Margen EBIT de Epiroc 19,2 % frente a 17,8 % de Sandvik y 15,8 % de Metso en 2025 [1, 4, 7].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Mineras grandes y concentradas, pero los diez primeros solo suponen el 18 % de los ingresos y la disponibilidad pesa más que el precio [1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Acero, componentes hidráulicos y baterías con varias fuentes; la inflación de 2022 se trasladó a precio (margen bruto 38,3 %) [1].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'La red de servicio global y el parque instalado son la barrera; los fabricantes chinos entran en gama baja y por alianzas (Epiroc-SANY) [1, 12].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 2, justificacion: 'La roca hay que perforarla y moverla; la minería continua y la voladura alternativa no desplazan a la perforación en roca dura [1].' },
    ],
    ciclo: { posicion: 'Madurez del ciclo', comentario: 'Pedidos récord (18.340 M SEK en el 1T26; libro-facturación 104-128 %), precios del cobre en máximos y del oro cerca de máximos [11, 10]. En 2009 los ingresos de la división de minería de Atlas Copco cayeron cerca de un 25 %; en 2015-2016 los de Epiroc (entonces dentro de Atlas Copco) bajaron un 5 % y el margen tocó el 16,8 %; en 2020 los ingresos cayeron un 12 % y el margen subió, porque la posventa aguantó [1]. 2022-2023 fueron años de crecimiento con inflación.' },
    regulacion: 'Seguridad minera (sistemas anticolisión obligatorios en Sudáfrica, Australia e India) y emisiones de diésel en minas subterráneas empujan la sustitución por equipos eléctricos y automatizados [1]. Aranceles de EE. UU. sobre importaciones (2025-2026) afectan a la cadena de suministro; Epiroc fabrica en EE. UU. (Pit Viper en Garland, Texas) [1].',
    tendencias: 'Autonomía de flotas mixtas (Roy Hill, mayor mina autónoma independiente del fabricante, oct-25), electrificación con baterías y trolley, y software de planificación minera: los rivales compran software (Weir-Micromine 2025, Sandvik-Deswik) [1]. Los fabricantes chinos ganan cuota en gama media; Epiroc responde con marcas locales (GIA en China) y la alianza con SANY [11, 12].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 4.7,
    posicion: 'Uno de los dos líderes mundiales en equipos de perforación y minería subterránea con Sandvik; 4,7 % sobre el total de maquinaria minera de Ken Research (estimación propia: 61.998 M SEK ÷ 1.312.000 M SEK), muy por encima en roca dura y subterránea.',
    competidores: [
      { nombre: 'Caterpillar', pais: 'EE. UU.', ticker: 'CAT', ingresos: Math.round(67589 * SEK_USD25), cuota_pct: null, margen_ebit_pct: 16.5, comentario: 'Líder en camiones y palas de cielo abierto y en carga subterránea; menos presente en perforación [5, 1].' },
      { nombre: 'Komatsu', pais: 'Japón', ticker: '6301', ingresos: Math.round(4132751 * SEK_JPY), cuota_pct: null, margen_ebit_pct: 13.7, comentario: 'Equipos subterráneos y de cielo abierto (Joy Global); ejercicio a marzo de 2026 [6, 1].' },
      { nombre: 'Atlas Copco', pais: 'Suecia', ticker: 'ATCO A', ingresos: 168343, cuota_pct: null, margen_ebit_pct: 20.7, comentario: 'Antigua matriz; compresores y vacío, no compite en minería; referencia de calidad del grupo Wallenberg [9].' },
      { nombre: 'Sandvik', pais: 'Suecia', ticker: 'SAND', ingresos: 120680, cuota_pct: null, margen_ebit_pct: 17.8, comentario: 'Rival directo en perforación, carga y transporte en roca dura (Mining and Rock Solutions) [4, 1].' },
      { nombre: 'Metso', pais: 'Finlandia', ticker: 'METSO', ingresos: Math.round(5240 * SEK_EUR25), cuota_pct: null, margen_ebit_pct: 15.8, comentario: 'Trituración, procesado y recambios de desgaste; compite poco en perforación [7].' },
      { nombre: 'Weir', pais: 'Reino Unido', ticker: 'WEIR', ingresos: Math.round(2564 * SEK_GBP), cuota_pct: null, margen_ebit_pct: 20.2, comentario: 'Bombas y piezas de desgaste (ESCO), 80 % posventa; compró Micromine en 2025 [8].' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'Los datos de flotas conectadas y la automatización independiente del fabricante crean algo de efecto red, aún pequeño [1].' },
        { fuente: 'Costes de cambio', puntuacion: 4, evidencia: 'Parque instalado con recambios propios, formación de operarios y sistemas de automatización integrados; posventa del 66 % de los ingresos [1].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'Marcas Pit Viper, Boomer, Scooptram; I+D del 3,2 % de las ventas; margen bruto del 37 % [1].' },
        { fuente: 'Ventaja en costes', puntuacion: 2, evidencia: 'Fábricas en India y China; escala similar a la de Sandvik; sin ventaja clara frente a los chinos [1].' },
        { fuente: 'Escala eficiente', puntuacion: 4, evidencia: 'Duopolio Epiroc-Sandvik en perforación de roca dura con red de servicio en ~150 países; margen EBIT medio del 20,3 % desde 2016 [1].' },
      ],
    },
    amenazas: 'La mayor amenaza es la entrada de fabricantes chinos (SANY, XCMG) con equipos un 20-30 % más baratos en Asia, África y Sudamérica; Epiroc ha optado por aliarse con SANY [12]. También que las mineras internalicen el servicio o compren posventa a terceros independientes, y que un competidor gane la carrera de la automatización de flotas mixtas (Caterpillar, Komatsu) [1]. Probabilidad media a cinco años.',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [{ agencia: 'EcoVadis', calificacion: 'Medalla de oro', fecha: '2026-09' }],
    materialidad: 'Seguridad: frecuencia de lesiones registrables (TRIFR) de 3,8 en el 2T26 frente a 4,2 un año antes [11]. Emisiones del uso de sus equipos (alcance 3), la mayoría del total: la gama eléctrica y el objetivo de oferta sin emisiones en 2030 son a la vez riesgo y oportunidad comercial [1]. Exposición a minería de carbón pequeña (2 % de los pedidos mineros) [1].',
    controversias: 'Sin sanciones relevantes en tres años según el informe anual 2025 [1].',
    confianza: 'Media',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'sector', campo: 'cr5_pct', tipo: 'Complemento', intentos: '1) Informe anual 2025 (no da cuotas); 2) Ken Research y MarkNtel (de pago); 3) estimación con los ingresos de las cotizadas (perímetros no comparables)', decision: 'Omitido' },
    { seccion: 'sector', campo: 'tcac_historico_pct', tipo: 'Complemento', intentos: '1) Ken Research (solo previsión); 2) IMARC (solo base 2024); 3) informe anual de Epiroc (no da serie)', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Epiroc Annual and Sustainability Report 2025: gobierno corporativo, consejo, remuneración (nota 5) y accionistas', editor: 'Epiroc AB', tipo: 'Primaria', fecha: '2026-03-19', url: `${CIS}/4323601/3992085.pdf` },
  { id: 2, titulo: 'Report from Epiroc’s Annual General Meeting 2026', editor: 'Epiroc AB', tipo: 'Primaria', fecha: '2026-05-05', url: `${CIS}/4344484/4077774.pdf` },
  { id: 3, titulo: 'Epiroc announces changes to Group Management', editor: 'Epiroc AB', tipo: 'Primaria', fecha: '2026-07-02', url: `${CIS}/4370218/4177536.pdf` },
  { id: 4, titulo: 'Registro de operaciones de directivos (Insynsregistret): Epiroc AB', editor: 'Finansinspektionen', tipo: 'Primaria', fecha: '2026-10-14', url: 'https://marknadssok.fi.se/publiceringsklient/en-GB/Search/Search?SearchFunctionType=Insyn&Utgivare=Epiroc+AB' },
  { id: 5, titulo: 'Epiroc interim reports Q4 2025 a Q2 2026 (guía cualitativa)', editor: 'Epiroc AB', tipo: 'Primaria', fecha: '2026-07-17', url: `${CIS}/4375716/4197580.pdf` },
  { id: 6, titulo: 'Epiroc Annual and Sustainability Report 2021 (objetivos y auditor)', editor: 'Epiroc AB', tipo: 'Primaria', fecha: '2022-03', url: `${CIS}/3517772/1543872.pdf` },
];
const C = {
  _estado: 'Completo salvo votos de la junta (el comunicado no da porcentajes).',
  directivos: {
    equipo: [
      { nombre: 'Helena Hedblom', cargo: 'Consejera delegada y presidenta ejecutiva', desde: '2020', participacion_pct: 0.002, trayectoria: 'Ingeniera de materiales (KTH); 20 años en Atlas Copco y Epiroc, antes responsable de Minería e Infraestructura. Con ella los ingresos pasaron de 36.122 M SEK en 2020 a 61.998 M en 2025 (TCAC 11 %) y el margen EBIT del 20,4 % al 19,2 % [1].' },
      { nombre: 'Håkan Folin', cargo: 'Director financiero', desde: '2021', participacion_pct: null, trayectoria: 'Antes en Atlas Copco y en el área financiera de Epiroc; ha comprado acciones en el mercado en 2022 y 2023 [1, 4].' },
      { nombre: 'Ronnie Leten', cargo: 'Presidente del consejo', desde: '2017', participacion_pct: 0.006, trayectoria: 'Exconsejero delegado de Atlas Copco (2009-2017) y expresidente de Ericsson y Electrolux; independiente [1].' },
      { nombre: 'Jess Kindler', cargo: 'Presidente del área Equipment & Service', desde: '2025', participacion_pct: null, trayectoria: 'Dirige el 76 % de los ingresos desde la reorganización de sep-25; compró acciones (ADR) en feb y mar-26 [1, 4].' },
      { nombre: 'José Manuel Sánchez', cargo: 'Presidente del área Tools & Attachments', desde: '2025', participacion_pct: null, trayectoria: 'Responsable del área que integró Stanley Infrastructure; margen del área del 9,4 % en 2024 al 12,2 % en 2025 [1].' },
    ],
    historial_guidance: [
      { anio: '2018-2025', guia: 'Crecimiento anual de ingresos del 8 % a lo largo del ciclo', real: 'TCAC del 10 % desde 2016; −3 % en 2025 por divisa', cumplida: 'Sí' },
      { anio: '2018-2025', guia: 'Margen operativo líder del sector', real: 'Media del 20,3 % desde 2016 frente a pares de equipos mineros y de construcción por debajo [1]', cumplida: 'Sí' },
      { anio: '2018-2025', guia: 'Dividendo del 50 % del beneficio a lo largo del ciclo', real: 'Media del 51 % desde 2018; 53 % en 2025', cumplida: 'Sí' },
      { anio: '2024-2025', guia: 'Recuperar el margen tras la caída de 2024 con medidas de eficiencia', real: 'Margen ajustado del 19,6 % en 2025 y del 20,1 % en el 2T26', cumplida: 'Parcial' },
      { anio: '2018-2025', guia: 'Mantener el rating de grado de inversión', real: 'BBB+ estable desde 2018', cumplida: 'Sí' },
    ],
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Ronnie Leten', cargo: 'Presidente', tipo: 'Independiente', desde: '2017', comisiones: 'Remuneración (presidente)' },
      { nombre: 'Johan Forssell', cargo: 'Consejero', tipo: 'Dominical', desde: '2017', comisiones: 'Remuneración' },
      { nombre: 'Ulla Litzén', cargo: 'Consejera', tipo: 'Independiente', desde: '2017', comisiones: 'Auditoría (presidenta)' },
      { nombre: 'Helena Hedblom', cargo: 'Consejera delegada', tipo: 'Ejecutivo', desde: '2020', comisiones: '—' },
      { nombre: 'Sigurd Mareels', cargo: 'Consejero', tipo: 'Independiente', desde: '2020', comisiones: '—' },
      { nombre: 'Anthea Bath', cargo: 'Consejera', tipo: 'Independiente', desde: '2022', comisiones: '—' },
      { nombre: 'Jenny Lindqvist', cargo: 'Consejera', tipo: 'Independiente', desde: '2025', comisiones: '—' },
      { nombre: 'Fredric Stahl', cargo: 'Consejero', tipo: 'Dominical', desde: '2025', comisiones: 'Auditoría' },
      { nombre: 'Eeva Sipilä', cargo: 'Consejera', tipo: 'Independiente', desde: '2026', comisiones: '—' },
      { nombre: 'Andrew Walker', cargo: 'Consejero', tipo: 'Independiente', desde: '2026', comisiones: '—' },
      { nombre: 'Kristina Kanestad', cargo: 'Representante de los empleados', tipo: 'Otro externo', desde: '2018', comisiones: '—' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: false,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: true, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 23.99, fijo: 13.65, variable_corto: 3.74, variable_largo: 1.69, ratio_salario_medio: 38 },
    remuneracion: 'La consejera delegada devengó 23,99 M SEK en 2025: 13,65 M de fijo, 3,74 M de variable anual, 4,78 M de pensión y 1,69 M de opciones [1]. El variable anual depende del beneficio operativo, el capital circulante y objetivos de sostenibilidad; el plan a largo plazo son opciones sobre acciones A con condición de rentabilidad (valor creado sobre el capital), que la junta de 2026 renovó [1, 2]. La consejera delegada debe invertir parte de su variable en acciones. El ratio frente al salario medio (38 veces) es una estimación propia con los sueldos y salarios de 12.082 M y 19.055 empleados [1]. La junta de 2026 aprobó el informe de remuneración; el comunicado no da el recuento [2].',
    accionistas: [
      { nombre: 'Investor AB', pct: 17.1, tipo: 'Industrial (grupo Wallenberg); 22,7 % de los votos', variacion: 'Estable' },
      { nombre: 'Swedbank Robur Fonder', pct: 4.2, tipo: 'Institucional', variacion: 'n.d.' },
      { nombre: 'Vanguard', pct: 3.7, tipo: 'Institucional', variacion: 'n.d.' },
      { nombre: 'BlackRock', pct: 3.7, tipo: 'Institucional', variacion: 'n.d.' },
      { nombre: 'Alecta Tjänstepension', pct: 2.9, tipo: 'Institucional', variacion: 'n.d.' },
      { nombre: 'Handelsbanken Fonder', pct: 2.8, tipo: 'Institucional', variacion: 'n.d.' },
      { nombre: 'Fidelity (FMR)', pct: 2.7, tipo: 'Institucional', variacion: 'n.d.' },
      { nombre: 'Autocartera (acciones A)', pct: 0.3, tipo: 'Autocartera', variacion: '4,70 M a dic-25; 3,80 M a jun-26 (cobertura de opciones)' },
    ],
    insiders: [
      { fecha: '2026-02-25', persona: 'Jess Kindler (presidente de Equipment & Service)', operacion: 'Compra', acciones: 125, importe: Math.round(125 * 30.02 * 9.9) / 1e6 },
      { fecha: '2026-03-18', persona: 'Jess Kindler (presidente de Equipment & Service)', operacion: 'Compra', acciones: 353, importe: Math.round(353 * 25.5 * 9.9) / 1e6 },
    ],
    control_y_defensas: 'Investor AB, del grupo Wallenberg, tiene el 17,1 % del capital y el 22,7 % de los votos gracias a las acciones A (un voto) frente a las B (una décima de voto): controla de hecho la comisión de nombramientos y tiene dos consejeros (Forssell y Stahl) [1]. No hay pactos ni blindajes estatutarios. No hay operaciones vinculadas relevantes; el presidente, Ronnie Leten, es independiente de Investor [1]. La doble clase deja a las B con un descuento del 16 % frente a las A (225,8 frente a 269,4 SEK el 14-oct-26).',
    alertas: ['Ninguna relevante detectada tras revisar el informe de gobierno 2025, el registro de directivos de la Finansinspektionen y los comunicados de 12 meses.'],
    confianza: 'Media',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'voto_remuneracion_pct', tipo: 'Complemento', intentos: '1) Comunicado de la junta 2026 (sin recuento); 2) acta de la junta en la web (no descargada: la web no abre sin navegador); 3) prensa sueca (sin cifra)', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de EPI-A.ST, ^OMX y EXH4.DE (precio, rango, volumen, betas, cierres de ejercicio)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/EPI-A.ST/history' },
  { id: 2, titulo: 'Epiroc AB (EPI A): estimaciones 2026-2028 (21 analistas)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/EPIROC-AB-44292455/finances/' },
  { id: 3, titulo: 'Epiroc AB: consenso de analistas y cambios de precio objetivo', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/EPIROC-AB-44292455/consensus/' },
  { id: 4, titulo: 'Sandvik, Atlas Copco, Caterpillar, Komatsu, Metso y Weir: estimaciones 2025-2028', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/SANDVIK-29421239/finances/' },
  { id: 5, titulo: 'Cierres del 14-oct-2026 de SAND.ST, ATCO-A.ST, CAT, 6301.T, METSO.HE, WEIR.L y EPI-B.ST', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/SAND.ST/history' },
  { id: 6, titulo: 'Tipos de cambio de referencia del euro, 14-oct-2026', editor: 'Banco Central Europeo', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml' },
  { id: 7, titulo: 'Rendimiento del bono del Estado sueco a 10 años (SEGVB10YC), 13-oct-2026: 3,174 %', editor: 'Sveriges Riksbank', tipo: 'Primaria', fecha: '2026-10-13', url: 'https://api.riksbank.se/swea/v1/Observations/SEGVB10YC/2026-09-25/2026-10-14' },
  { id: 8, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026: 4,20 %', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 9, titulo: 'Weir to acquire Micromine (EV 657 M GBP; c.10x ventas y c.20x EBITDA 2025)', editor: 'The Weir Group PLC', tipo: 'Primaria', fecha: '2025-02-28', url: 'https://www.global.weir/globalassets/investors/reporting-centre/2025/weir-to-acquire-micromine-press-release.pdf' },
  { id: 10, titulo: 'Weir investor presentation: acquisition of ESCO (EV 1.285 M USD; 12,6x EV/EBITDA 2018e)', editor: 'The Weir Group PLC', tipo: 'Primaria', fecha: '2018-04-18', url: 'https://global.weir/siteassets/pdfs/weir-investor-presentation_20180418_vfinal-website.pdf' },
  { id: 11, titulo: 'Investor presentation: Sandvik to acquire DSI Underground (EV 943 M EUR; ventas 518 M EUR)', editor: 'Sandvik AB', tipo: 'Primaria', fecha: '2021-01', url: 'https://www.home.sandvik/siteassets/investors/reports--presentations/acqusition-presentations/investor-presentation-sandvik-to-acquire-dsi-underground.pdf' },
  { id: 12, titulo: 'Epiroc completes acquisition of STANLEY Infrastructure (760 M USD, 8.200 M SEK; ventas 2023 ~450 M USD)', editor: 'Epiroc AB', tipo: 'Primaria', fecha: '2024-04-01', url: 'https://www.epirocgroup.com/en/media/corporate-press-releases/2024/20240401-epiroc-completes-acquisition-of-stanley-infrastructure-to-strengthen-infrastructure-and-construction-business' },
  { id: 13, titulo: 'Epiroc interim report Q2 2026 (balance a 30-jun-26, acciones, calendario)', editor: 'Epiroc AB', tipo: 'Primaria', fecha: '2026-07-17', url: `${CIS}/4375716/4197580.pdf` },
  { id: 14, titulo: 'Epiroc Annual and Sustainability Report 2025 (resumen de diez años: BPA y dividendos)', editor: 'Epiroc AB', tipo: 'Primaria', fecha: '2026-03-19', url: `${CIS}/4323601/3992085.pdf` },
];
const id = bolsa.identificacion;
const D = {
  _estado: 'Completo.',
  identificacion: {
    nombre: 'Epiroc AB (publ)', nombre_corto: 'Epiroc', ticker: 'EPI A', isin: 'SE0015658109', mercado: 'Nasdaq Stockholm (Large Cap)', indice_referencia: 'OMX Stockholm 30',
    pais: 'Suecia', pais_iso: 'SE', sector: 'Industria', industria: 'Maquinaria agrícola y de construcción pesada', sede: 'Nacka (Estocolmo)', fundacion: '1873', empleados: 19398, web: 'https://www.epirocgroup.com',
    precio: id.precio, fecha_precio: id.fecha_precio, acciones: 1209.9, capitalizacion_publicada: null, free_float_pct: 82.9,
    max_52s: id.max_52s, min_52s: id.min_52s, volumen_medio_diario: `≈ ${String(bolsa.volumen_3m.importe_dia_millones).replace('.', ',')} M SEK/día (3 meses, acción A)`, proximos_resultados: '2026-10-28',
  },
  consenso: {
    guidance: 'Epiroc no da cifras de guía: solo perspectiva cualitativa. En el 2T26 (17-jul-26) espera que la demanda minera siga alta y que la de infraestructura mejore algo; lo reafirmó en el día del inversor del 8-jun-26 con los objetivos a medio plazo: crecimiento del 8 % anual a lo largo del ciclo, margen operativo líder del sector, mejora del ROCE, dividendo del 50 % del beneficio y rating de grado de inversión [13, 14].',
    estimaciones: [
      { periodo: '2026e', ingresos: 67043, ebitda: 16812, ebit: 13691, bpa: 8.23, dpa: 4.11, fuente: 'MarketScreener, 21 analistas [2]' },
      { periodo: '2027e', ingresos: 76424, ebitda: 19717, ebit: 16459, bpa: 10.03, dpa: 4.78, fuente: 'MarketScreener, 21 analistas [2]' },
      { periodo: '2028e', ingresos: 82056, ebitda: 21468, ebit: 18088, bpa: 11.09, dpa: 5.27, fuente: 'MarketScreener, 21 analistas [2]' },
    ],
    recomendaciones: { n_analistas: 21, comprar: null, mantener: null, vender: null, po_medio: 284.86, po_min: 230, po_max: 340 },
    revisiones: 'Tras el 2T26 los objetivos bajaron (Goldman Sachs 319 → 295, Citigroup 305 → 301, Barclays 285 → 280) porque el margen ajustado (20,1 %) quedó algo por debajo de lo esperado; desde finales de septiembre suben con el cobre y el oro: Citigroup 317, Goldman 305, BNP Paribas 305, Pareto 290, Barclays 285, Deutsche Bank 270 y Danske 265; Oddo mantiene Infraponderar con 245 y SB1 Markets bajó a Neutral [3]. Consenso medio «Sobreponderar». Solo una fuente con estimaciones completas (MarketScreener); el precio objetivo se contrasta con las notas de cada banco que recoge la misma página.',
    base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: 0.3,
    confianza: 'Media',
  },
  bolsa: { ...bolsa.bolsa, beta: bolsa.betas.mensual_5a, posicion_corta_pct: null, confianza: 'Alta' },
  multiplos_historicos: {
    serie: [
      { anio: '2020', precio_cierre: 149.65, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2021', precio_cierre: 229.2, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2022', precio_cierre: 189.85, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2023', precio_cierre: 202.2, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2024', precio_cierre: 192.55, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2025', precio_cierre: 209.9, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
    ],
    confianza: 'Alta',
  },
  comparables: {
    empresas: comps,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2025-02', objetivo: 'Micromine (software de minería, Australia)', comprador: 'Weir', ev: Math.round(657 * SEK_GBP), ev_ventas: 10.0, ev_ebitda: 20.0, prima_pct: null, excluir: true, comentario: 'Software, no equipos: múltiplo de otra industria; fuera de la media [9].' },
      { fecha: '2024-04', objetivo: 'Stanley Infrastructure (implementos hidráulicos, EE. UU.)', comprador: 'Epiroc', ev: 8200, ev_ventas: 1.74, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'EV/ventas con las ventas de 2023 (4.725 M SEK); no se publicó el EBITDA [12].' },
      { fecha: '2021-07', objetivo: 'DSI Underground (sostenimiento de roca)', comprador: 'Sandvik', ev: Math.round(943 * 10.1), ev_ventas: 1.82, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'EV 943 M EUR sobre ventas de 518 M EUR (2020); SEK a 10,1 por euro [11].' },
      { fecha: '2018-07', objetivo: 'ESCO (piezas de desgaste para minería)', comprador: 'Weir', ev: Math.round(1285 * 8.7), ev_ventas: null, ev_ebitda: 12.6, prima_pct: null, excluir: false, comentario: 'Posventa minera pura; 12,6 veces el EBITDA de 2018e sin sinergias [10].' },
    ],
    confianza: 'Media',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'bolsa', campo: 'posicion_corta_pct', tipo: 'Complemento', intentos: '1) Registro de posiciones cortas de la Finansinspektionen (requiere navegador); 2) Stock Analysis (sin dato para EPI A); 3) prensa sueca (sin cifra)', decision: 'Omitido' },
    { seccion: 'comparables', campo: 'roic_pct', tipo: 'Complemento', intentos: '1) MarketScreener (solo ROE y ROA); 2) informes anuales de los comparables (no descargados por presupuesto); 3) Stock Analysis (no consultado)', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Foro de Epiroc B en Nordnet (Shareville): mensajes de mar a sep de 2026', editor: 'Nordnet', tipo: 'Foros y redes', fecha: '2026-09', url: 'https://www.nordnet.se/aktier/kurser/epiroc-b-epi-b-xsto' },
  { id: 2, titulo: 'Foro de Inderes: «Epiroc – gruvutrustning och infrastruktur»', editor: 'Inderes', tipo: 'Foros y redes', fecha: '2025-10', url: 'https://forum.inderes.com/t/epiroc-gruvutrustning-och-infrastruktur/69226/last' },
  { id: 3, titulo: 'Epiroc: narrativas de la comunidad y valor razonable (finales de julio de 2026)', editor: 'Simply Wall St', tipo: 'Foros y redes', fecha: '2026-07', url: 'https://simplywall.st/stocks/se/capital-goods/sto-epi-a/epiroc-shares' },
  { id: 4, titulo: 'Epiroc AB: cambios de recomendación y precio objetivo (jul-oct 2026)', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/EPIROC-AB-44292455/consensus/' },
  { id: 5, titulo: 'Foro de Epiroc A en Nordnet (sin mensajes en seis meses)', editor: 'Nordnet', tipo: 'Foros y redes', fecha: '2026-10', url: 'https://www.nordnet.se/marknaden/aktiekurser/16886538-epiroc-a' },
];
const E = {
  _estado: 'Completo con poco debate: Reddit, Stocktwits y Seeking Alpha sin hilos de Epiroc en tres meses.',
  sentimiento: {
    tono: 'Positivo', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Nordnet (Shareville), foro de Epiroc B', fecha: '2026-09', n_comentarios: 7, tono: 'Positivo', resumen: 'Pocos mensajes: el cobre como motor de largo plazo, «buena compra» tras la caída de julio y una pregunta sobre si está cara [1].' },
      { plataforma: 'Simply Wall St (narrativas de la comunidad)', fecha: '2026-07', n_comentarios: 5, tono: 'Dividido', resumen: 'La narrativa más seguida pone el valor razonable en 280 SEK con la acción en 243 tras el 2T26; otras la ven cara por PER [3].' },
      { plataforma: 'MarketScreener (notas de bancos recogidas)', fecha: '2026-10', n_comentarios: 15, tono: 'Positivo', resumen: 'Desde finales de septiembre suben objetivos con el cobre y el oro (Citigroup 317, Goldman 305, BNP 305); Oddo sigue en Infraponderar [4].' },
      { plataforma: 'Inderes (foro)', fecha: '2025-10', n_comentarios: 1, tono: 'Positivo', resumen: 'Solo la entrada del analista tras el 3T25 («calidad que se ha ganado una valoración alta»); sin debate en los últimos tres meses [2].' },
    ],
    temas: [
      { tema: 'Superciclo del cobre y del oro', postura: 'Alcista', peso: 'Alto', contraste: 'Los datos lo apoyan: 65 % de los pedidos mineros son de cobre y oro y los pedidos de equipos crecen un 30 % orgánico; el riesgo es comprar en lo alto del ciclo de precios.' },
      { tema: 'Valoración exigente', postura: 'Dividida', peso: 'Medio', contraste: 'PER adelantado de unas 29 veces nuestro BPA de 2027, por encima de su mediana de 27 y de los comparables (20); la gente tiene razón en que no está barata.' },
      { tema: 'Márgenes y divisa', postura: 'Bajista', peso: 'Medio', contraste: 'La corona restó 1 punto de margen en el 2T26 y el mercado castigó un 6 % el 17-jul; el margen ajustado aun así subió al 20,1 %.' },
    ],
    lectura: 'El debate de particulares sobre Epiroc es escaso y moderadamente positivo, apoyado en la tesis del cobre; no hay euforia ni capitulación. Los bancos van algo por delante de los foros: subidas de objetivo desde septiembre. El foro de la acción A en Nordnet no tiene mensajes en seis meses [5]. No aporta un riesgo que el informe no recoja: lo que más se discute (precio exigente y divisa) ya está en la valoración. Confirma que el mercado descuenta un ciclo minero largo.',
    confianza: 'Baja',
  },
  fuentes: fE,
  huecos: [],
};

guarda('A', A); guarda('B', B); guarda('C', C); guarda('D', D); guarda('E', E);
console.log('Notas A-E escritas en', dir);
