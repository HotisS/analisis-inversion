// Escribe las notas A-E de The Sage Group plc (SGE, corte 2026-10-15) a partir de los documentos de notas/docs
// (RNS de resultados FY18, FY21, FY22, FY24, FY25, 1S26 y 3T26; informe anual 2025 en ESEF), del XBRL (cuentas-xbrl.json),
// de bolsa.json y de páginas web leídas el 15-oct-2026. Cada nota cita con [n] de su propia lista. Ejecutar: node notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const raiz = path.resolve(dir, '..', '..', '..');
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const bolsa = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const USD_GBP = 1.1195 / 0.84385; // USD por GBP, BCE 14-oct-2026 (1,3267)
const EUR_GBP = 0.84385; // GBP por EUR, BCE 14-oct-2026

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Results for the year ended 30 September 2025 (audited), RNS 0746I', editor: 'The Sage Group plc', tipo: 'Primaria', fecha: '2025-11-19', url: 'https://data.fca.org.uk/artefacts/NSM/RNS/3331551a-5060-4fad-88d1-730e3d45176b.html' },
  { id: 2, titulo: 'Annual Report and Accounts 2025 (ESEF, xhtml)', editor: 'The Sage Group plc', tipo: 'Primaria', fecha: '2025-12', url: 'https://filings.xbrl.org/2138005RN5XYLTF8G138/2025-09-30/ESEF/GB/0/2138005RN5XYLTF8G138-2025-09-30/reports/2138005RN5XYLTF8G138-2025-09-30-T01.xhtml' },
  { id: 3, titulo: 'Results for the six months to 31 March 2026 (unaudited), RNS 1676F', editor: 'The Sage Group plc', tipo: 'Primaria', fecha: '2026-05-21', url: 'https://data.fca.org.uk/artefacts/NSM/RNS/3eb4885b-7af6-48bc-b314-aad22e14d785.html' },
  { id: 4, titulo: 'Trading update for the nine months ended 30 June 2026', editor: 'The Sage Group plc (RNS vía Investegate)', tipo: 'Primaria', fecha: '2026-07-29', url: 'https://www.investegate.co.uk/announcement/rns/sage-group--sge/trading-update-for-nine-months-ended-30-june-2026/9692278' },
  { id: 5, titulo: 'Results for the year ended 30 September 2024 (audited), RNS 8753M', editor: 'The Sage Group plc', tipo: 'Primaria', fecha: '2024-11-20', url: 'https://data.fca.org.uk/artefacts/NSM/RNS/5436201.html' },
  { id: 6, titulo: 'Results for the year ended 30 September 2022 (audited), RNS 5296G', editor: 'The Sage Group plc', tipo: 'Primaria', fecha: '2022-11-16', url: 'https://data.fca.org.uk/artefacts/NSM/RNS/4580613.html' },
  { id: 7, titulo: 'Audited results for the year ended 30 September 2021, RNS 6030S', editor: 'The Sage Group plc', tipo: 'Primaria', fecha: '2021-11-17', url: 'https://data.fca.org.uk/artefacts/NSM/RNS/4180346.html' },
  { id: 8, titulo: 'Audited results for the year ended 30 September 2018, RNS 9691H', editor: 'The Sage Group plc', tipo: 'Primaria', fecha: '2018-11-21', url: 'https://data.fca.org.uk/artefacts/NSM/data-migration/LSE20181121070005_13874323.html' },
  { id: 9, titulo: 'Informes anuales 2022-2025 en xBRL-JSON (cuenta, balance y flujos)', editor: 'XBRL International, repositorio ESEF (filings.xbrl.org)', tipo: 'Primaria', fecha: '2025-12', url: 'https://filings.xbrl.org/2138005RN5XYLTF8G138/2025-09-30/ESEF/GB/0/2138005RN5XYLTF8G138-2025-09-30-T01.json' },
  { id: 10, titulo: 'Total Voting Rights a 28-ago-2026 (959,08 M emitidas; 53,69 M en autocartera; 6,76 M en el EBT; 905,39 M con voto)', editor: 'The Sage Group plc (RNS vía Investegate)', tipo: 'Primaria', fecha: '2026-08-28', url: 'https://www.investegate.co.uk/announcement/rns/sage-group--sge/total-voting-rights/9745983' },
];

// Cuenta publicada (XBRL [9] comprobada con los RNS). EBITDA = EBIT + amortizaciones totales (subyacentes + intangibles de compras):
// FY21 49+31, FY22 55+42, FY23 53+54, FY24 48+48, FY25 48+42 [1, 5, 6, 7]. BPA diluido estatutario; acciones diluidas medias.
const c = (periodo, ingresos, cv, gg, amort, ebit, rf, bai, imp, bn, gf, nr, bpa, dpa, acc) => ({
  periodo, ingresos, coste_ventas: cv, gastos_generales: gg, ebitda: ebit + amort, amortizaciones: amort, ebit, resultado_financiero: rf, bai, impuestos: imp,
  minoritarios: 0, beneficio_neto: bn, gastos_financieros: gf, participadas_en_ebitda: null, no_recurrentes_en_ebitda: nr, bpa, dpa, dpa_extraordinario: 0, acciones_diluidas: acc,
});
const cuenta = [
  c('FY2021', 1846, 131, 1342, 80, 373, -26, 347, 62, 285, 27, -55, 0.2608, 0.1768, 1090),
  c('FY2022', 1947, 138, 1442, 97, 367, -30, 337, 77, 260, 31, null, 0.2517, 0.184, 1032),
  c('FY2023', 2184, 156, 1713, 107, 315, -33, 282, 71, 211, 45, 44, 0.2043, 0.193, 1036),
  c('FY2024', 2332, 168, 1712, 96, 452, -26, 426, 103, 323, 45, -5, 0.3155, 0.2045, 1025),
  c('FY2025', 2513, 183, 1800, 90, 530, -46, 484, 115, 369, 58, -3, 0.3716, 0.2185, 993),
];
const bal = (periodo, at, ac, pc, pt, fc, intg, inm, cli, prov, caja, deuda, arr, pn, res) => ({
  periodo, activo_total: at, activo_corriente: ac, pasivo_corriente: pc, pasivo_total: pt, fondo_comercio: fc, intangibles: intg, inmovilizado_material: inm,
  existencias: 0, clientes: cli, proveedores: prov, activos_contrato: null, pasivos_contrato: null, caja, deuda_financiera: deuda, arrendamientos: arr, patrimonio_neto: pn, minoritarios: 0, reservas: res,
});
const balance = [
  bal('FY2021', 3329, 924, 1380, 2218, 1877, null, 164, 295, 592, 567, 714, 100, 1111, 448),
  bal('FY2022', 3897, 883, 1326, 2500, 2391, null, 152, 355, 368, 489, 1127, 95, 1397, 570),
  bal('FY2023', 3936, 1114, 1185, 2529, 2245, null, 104, 376, 378, 696, 1171, 86, 1407, 658),
  bal('FY2024', 3639, 928, 1226, 2546, 2122, null, 108, 404, 405, 508, 1156, 90, 1093, 963),
  bal('FY2025', 3713, 863, 1355, 2993, 2213, 212, 144, 471, 433, 390, 1476, 103, 720, 530),
];
const flu = (periodo, fo, capex, arr, adq, des, div, rec) => ({ periodo, flujo_operativo: fo, capex, pagos_arrendamientos: arr, adquisiciones: adq, desinversiones: des, dividendos: div, recompras: rec, emision_acciones: 0, intereses_en_financiacion: 0 });
const flujos = [
  flu('FY2021', 376, 56, 22, 0, 135, 189, 353),
  flu('FY2022', 285, 52, 19, 285, 42, 183, 249),
  flu('FY2023', 387, 22, 18, 26, 0, 190, 0),
  flu('FY2024', 491, 37, 16, 30, 9, 199, 348),
  flu('FY2025', 528, 59, 17, 82, 1, 207, 605),
];

const A = {
  _estado: 'completo',
  negocio: {
    segmentos: [
      { nombre: 'Norteamérica', descripcion: 'EE. UU. (Sage Intacct, Sage 50, Sage 200, nómina y RR. HH. de Criterion) y Canadá.', tipo_resultado: 'EBIT', historico: [ { periodo: 'FY2023', ingresos: 973, resultado: 127 }, { periodo: 'FY2024', ingresos: 1052, resultado: 192 }, { periodo: 'FY2025', ingresos: 1138, resultado: 231 } ] },
      { nombre: 'UKIA (Reino Unido, Irlanda, África y Asia-Pacífico)', descripcion: 'Sage 50, Sage Accounting y Payroll para pequeñas empresas, Sage Intacct en expansión y Sudáfrica.', tipo_resultado: 'EBIT', historico: [ { periodo: 'FY2023', ingresos: 627, resultado: 80 }, { periodo: 'FY2024', ingresos: 670, resultado: 155 }, { periodo: 'FY2025', ingresos: 729, resultado: 182 } ] },
      { nombre: 'Europa', descripcion: 'Francia, Iberia y Centroeuropa: Sage 200, Sage X3, nómina y RR. HH. y soluciones para asesorías.', tipo_resultado: 'EBIT', historico: [ { periodo: 'FY2023', ingresos: 584, resultado: 108 }, { periodo: 'FY2024', ingresos: 610, resultado: 105 }, { periodo: 'FY2025', ingresos: 646, resultado: 117 } ] },
    ],
    geografias: [ { nombre: 'EE. UU.', peso_pct: 39.7 }, { nombre: 'Canadá', peso_pct: 5.6 }, { nombre: 'Reino Unido e Irlanda', peso_pct: 21.8 }, { nombre: 'África y Asia-Pacífico', peso_pct: 7.2 }, { nombre: 'Francia', peso_pct: 13.1 }, { nombre: 'Iberia', peso_pct: 6.6 }, { nombre: 'Centroeuropa', peso_pct: 6.0 } ],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Ingresos recurrentes anualizados (ARR, subyacente)', valor_anterior: '2.329 M GBP (FY24)', valor_actual: '2.574 M GBP (FY25); 2.727 M (1S26)', variacion: '+11 %', comentario: 'Crecimiento repartido entre clientes nuevos y existentes [1, 3].' },
      { kpi: 'Tasa de renovación por valor', valor_anterior: '101 % (FY24)', valor_actual: '101 % (FY25); 102 % (1S26)', variacion: '+1 pp', comentario: 'Incluye subidas de precio, ventas adicionales y módulos de IA [1, 3].' },
      { kpi: 'Ingresos de Sage Business Cloud', valor_anterior: '1.837 M GBP (FY24)', valor_actual: '2.083 M GBP (FY25)', variacion: '+13 %', comentario: 'De ellos, nativos de la nube 885 M (+23 %); 1.762 M en 9 meses de FY26 (+15 %) [1, 4].' },
      { kpi: 'Penetración de suscripción', valor_anterior: '82 % (FY24)', valor_actual: '83 % (FY25); 84 % (9M26)', variacion: '+1 pp', comentario: 'El 97 % de los ingresos es recurrente [1, 4].' },
      { kpi: 'Ingresos de Sage Intacct en EE. UU.', valor_anterior: '211 M GBP (1S25)', valor_actual: '267 M GBP (1S26)', variacion: '+26 %', comentario: 'Ya es la mitad de los ingresos de EE. UU. [3].' },
      { kpi: 'ARR nuevo por clientes nuevos (orgánico, 12 meses)', valor_anterior: '190 M GBP (1S25)', valor_actual: '200 M GBP (1S26)', variacion: '+5 %', comentario: 'Indicador adelantado de volumen [3].' },
    ],
    confianza: 'Alta',
  },
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM mar-26', fecha_fin: '2026-03-31', ingresos: 2634, ebitda: 658, ebit: 568, beneficio_neto: 385, bpa: 0.3971, dpa: 0.2245, dpa_extraordinario: 0, fcf: 512, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 0 },
    cambios_perimetro: [],
    comentario: 'Los ingresos pasaron de 1.846 M GBP en FY2021 a 2.513 M en FY2025 (+8,0 % anual), casi todo orgánico: las compras de 2022-2025 (Brightpearl, Lockstep, Infineo, ForceManager, Fyle) aportan menos de un punto al año [1, 6]. El crecimiento orgánico subió del 4-5 % de FY2021 al 9 % de FY2025 y al 10 % en los nueve primeros meses de FY2026 [4]. El margen EBIT publicado pasó del 20,2 % al 21,1 % con un bache en FY2023 (14,4 %) por 44 M de reestructuración de oficinas y la inversión en Sage Business Cloud; el subyacente de la empresa subió del 19,4 % de FY2021 al 23,9 % de FY2025 por el apalancamiento operativo de un modelo de suscripción con coste de ventas del 7 % [1, 7]. Años no comparables: FY2021 incluye 126 M de plusvalías por la venta de los negocios de Polonia, Australia y Asia (neto de 62 M de reestructuración) [7].',
    ajustes: 'Usamos cifras publicadas. Sage publica cifras «subyacentes» que excluyen la amortización de intangibles de compras (42 M en FY2025), los gastos de fusiones y adquisiciones (31 M, que se repiten cada año), los no recurrentes y el efecto divisa; su EBITDA subyacente además suma los pagos en acciones (46 M) [1]. Por eso el EBITDA subyacente de FY2025 (694 M) supera al nuestro (620 M) en 74 M, el 2,9 % de las ventas. No recurrentes dentro del EBIT: FY2021 −55 M (plusvalías netas de reestructuración), FY2023 +44 M (oficinas, nómina en Francia y reestructuración), FY2024 −5 M y FY2025 −3 M (reversiones) [1, 5, 7]. El BPA publicado de FY2023 (20,43 peniques) queda deprimido por esos 44 M; normalizado, unos 23,7 peniques (estimación propia: 44 M × 0,75 ÷ 1.036 M de acciones).',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '1S25', ingresos: 1242, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 301, margen_ebitda_pct: 24.2, bpa: 0.1786, vs_consenso: 'En línea' },
      { periodo: '2S25', ingresos: 1271, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 319, margen_ebitda_pct: 25.1, bpa: 0.193, vs_consenso: 'En línea' },
      { periodo: '1S26', ingresos: 1363, crecimiento_pct: 9.7, crecimiento_organico_pct: 10.0, ebitda: 339, margen_ebitda_pct: 24.9, bpa: 0.2041, vs_consenso: 'Superior' },
      { periodo: '3T26', ingresos: 699, crecimiento_pct: 11.5, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: 'En línea' },
    ],
    confianza: 'Media',
  },
  balance: {
    historico: balance,
    vencimientos: [ { anio: '2027', importe: 0 }, { anio: '2028', importe: 435 }, { anio: '2031', importe: 350 }, { anio: '2033', importe: 435 }, { anio: '2034', importe: 400 }, { anio: '2037', importe: 300 } ],
    liquidez: 'Caja de 518 M GBP y línea de crédito sindicada de 630 M sin disponer (vence en diciembre de 2029): 1.148 M de liquidez a 31-mar-2026 [3].',
    rating: 'S&P BBB+ (estable) [3]',
    coste_deuda_pct: 3.9,
    vida_media_anios: 6.5,
    otros_pasivos: 'Ingresos diferidos de 967 M GBP a 31-mar-2026 (845 + 5 M a 30-sep-2025): cobros por adelantado de suscripciones que no son deuda financiera pero sí financian el circulante [3]. Pensiones de 25 M. Pasivo financiero por la recompra en curso de 257 M a 31-mar-2026 (compromiso con el banco que ejecutó la recompra de hasta 300 M, terminada el 5-jun-2026) [3]. Pago aplazado de Criterion de hasta 16 M según resultados [1]. Sin covenants financieros relevantes en los bonos; la política es una deuda neta de 1-2 veces el EBITDA subyacente [3].',
    comentario: 'La deuda neta (con arrendamientos) subió de 738 M GBP en septiembre de 2024 a 1.189 M en septiembre de 2025 y 1.504 M en marzo de 2026, 2,0 veces el EBITDA subyacente de doce meses (742 M), en el techo de la política de 1-2 veces [3]. No es por el negocio: la caja libre fue de 517 M en FY2025, pero se recompraron acciones por 605 M y se pagaron 207 M de dividendos; en el 1S26 otros 353 M de recompras con bonos nuevos (500 M EUR al 3,821 % a 7 años) [1, 3]. El circulante es negativo por los ingresos diferidos (967 M), así que crecer libera caja. Vencimientos: bonos en euros de 2028 (500 M EUR) y de 2033 (500 M EUR), y en libras de 2031, 2034 y 2037 [3]; importes en EUR pasados a GBP a 0,87 (estimación).',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'El flujo operativo (después de intereses e impuestos) pasó de 376 M GBP en FY2021 a 528 M en FY2025 y la caja libre de la empresa fue de 517 M en FY2025 (524 M en FY2024), un 140 % del beneficio neto [1]. La conversión de beneficio operativo subyacente en caja fue del 110 % en FY2025 y del 116 % en el 1S26 [3]: los clientes pagan por adelantado. El capex es pequeño (59 M en FY2025, el 2,3 % de las ventas, más alto por la renovación de oficinas; 22 M en FY2023) y casi todo de mantenimiento; el desarrollo de producto se lleva a gastos (no se activa I+D). Usos de la caja en cinco años: 1.555 M de recompras y 968 M de dividendos frente a 423 M en compras [9].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'KPMG LLP (desde FY2025; antes EY)',
    anios_auditor: 1,
    opinion: 'Favorable, sin salvedades [2]',
    comentario: 'La contabilidad es sencilla: ingresos por suscripción reconocidos en el plazo del contrato, sin I+D activado y con un circulante que financian los clientes (ingresos diferidos de 850 M GBP a cierre de FY2025) [1, 2]. Las cifras «subyacentes» que destaca la empresa excluyen cada año los gastos de compras (31 M en FY2025) y los pagos en acciones del EBITDA (46 M, el 1,8 % de las ventas), que son costes recurrentes: por eso usamos el publicado. El cambio de auditor (EY por KPMG en FY2025) fue por rotación obligatoria tras concurso, no por discrepancias [2]. El fondo de comercio (2.213 M) es tres veces el patrimonio (720 M), que se ha reducido por las recompras: el patrimonio pequeño infla el ROE y no dice nada del negocio. El juicio sobre Altman, Piotroski y Beneish va en el texto propio tras el cálculo.',
    senales: [
      { senal: 'Métricas «subyacentes» por encima de las publicadas', nivel: 'Baja', comentario: 'El BPA subyacente de FY2025 (43,2 peniques) supera al publicado (37,7) en un 15 %: gastos de compras e intangibles amortizados que se repiten [1].' },
      { senal: 'Cambio de auditor', nivel: 'Baja', comentario: 'Rotación obligatoria a KPMG en FY2025, con EY en la sombra durante FY2024 [2].' },
      { senal: 'Recompras financiadas con deuda', nivel: 'Media', comentario: 'Deuda neta de 2,0 veces el EBITDA subyacente en marzo de 2026, en el techo de la política [3].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Dividendo progresivo (21,85 peniques en FY2025, +7 %; a cuenta de FY2026 8,05 peniques, +8 %) y devolución del exceso de caja con recompras: 600 M GBP en FY2025, 300 M terminados en febrero de 2026 y otros 300 M terminados en junio de 2026 [1, 3]. Prioridades declaradas: inversión orgánica, compras pequeñas que añaden producto a la plataforma y luego retribución; deuda neta de 1-2 veces el EBITDA subyacente [3].',
    adquisiciones: [
      { anio: '2017', objetivo: 'Intacct (EE. UU., contabilidad en la nube para empresas medianas)', importe: 640, ev_ebitda: null, financiacion: 'Caja y deuda (850 M USD)', resultado: 'Éxito: es el motor del grupo; 534 M GBP de ingresos anuales en EE. UU. al ritmo del 1S26 (+26 %) [3, 8].' },
      { anio: '2022', objetivo: 'Brightpearl (Reino Unido, gestión de comercio minorista)', importe: 221, ev_ebitda: null, financiacion: 'Caja', resultado: 'Pequeña dentro del grupo; sin deterioros [6].' },
      { anio: '2022', objetivo: 'Lockstep (EE. UU., automatización de cobros y pagos entre empresas)', importe: 80, ev_ebitda: null, financiacion: 'Caja', resultado: 'Integrada en la red de la Sage Platform [6].' },
      { anio: '2024', objetivo: 'Infineo (Francia) y Tritium Software / ForceManager (España)', importe: 64, ev_ebitda: null, financiacion: 'Caja', resultado: 'Aportan a Iberia; ForceManager fuera del orgánico en FY2025 [1].' },
      { anio: '2025', objetivo: 'Criterion (EE. UU., RR. HH. y nómina para empresas medianas)', importe: 49, ev_ebitda: null, financiacion: 'Caja: 33 M fijos y hasta 16 M variables', resultado: 'Demasiado reciente; 3 M de ingresos en el 1S26 [3].' },
    ],
    confianza: 'Alta',
  },
  fuentes: fA,
  huecos: [
    { seccion: 'negocio', campo: 'segmentos FY2021-FY2022', tipo: 'Complemento', intentos: '1) RNS FY2022 (segmentación anterior: Norteamérica, Norte de Europa, Centro y Sur de Europa e Internacional); 2) informe anual 2025 (solo FY2024-FY2025); 3) RNS FY2024 (FY2023 reexpresado)', decision: 'Omitido' },
    { seccion: 'balance', campo: 'otros intangibles 2021-2024', tipo: 'Complemento', intentos: '1) XBRL (no etiquetado en el mapa); 2) balances de los RNS; 3) informe anual 2025', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Ficha sectorial corta: software de aplicaciones (vertical y empresarial), con el mapa del riesgo de IA', editor: 'Este repositorio (sectores/software-2026-10-14.md)', tipo: 'Sectorial', fecha: '2026-10-14', url: 'sectores/software-2026-10-14.md' },
  { id: 2, titulo: 'Annual Report and Accounts 2025: estrategia, mercados, riesgos principales', editor: 'The Sage Group plc', tipo: 'Primaria', fecha: '2025-12', url: 'https://filings.xbrl.org/2138005RN5XYLTF8G138/2025-09-30/ESEF/GB/0/2138005RN5XYLTF8G138-2025-09-30/reports/2138005RN5XYLTF8G138-2025-09-30-T01.xhtml' },
  { id: 3, titulo: 'Results for the six months to 31 March 2026', editor: 'The Sage Group plc', tipo: 'Primaria', fecha: '2026-05-21', url: 'https://data.fca.org.uk/artefacts/NSM/RNS/3eb4885b-7af6-48bc-b314-aad22e14d785.html' },
  { id: 4, titulo: 'Results for the year ended 30 September 2025', editor: 'The Sage Group plc', tipo: 'Primaria', fecha: '2025-11-19', url: 'https://data.fca.org.uk/artefacts/NSM/RNS/3331551a-5060-4fad-88d1-730e3d45176b.html' },
  { id: 5, titulo: 'Informe value de Intuit (10-oct-2026): ingresos, margen y comparables', editor: 'Este repositorio (informes/intuit-2026-10-10)', tipo: 'Sectorial', fecha: '2026-10-10', url: 'informes/intuit-2026-10-10/' },
  { id: 6, titulo: 'Insider: FTSE 100 directors spot bargains after AI sell-off (Sage, opiniones de UBS y Deutsche Bank)', editor: 'interactive investor', tipo: 'Prensa', fecha: '2026-02-16', url: 'https://www.ii.co.uk/analysis-commentary/insider-ftse-100-directors-spot-bargains-after-ai-sell-ii538138' },
  { id: 7, titulo: 'Results for the year ended 30 September 2018 (adquisición e internacionalización de Intacct)', editor: 'The Sage Group plc', tipo: 'Primaria', fecha: '2018-11-21', url: 'https://data.fca.org.uk/artefacts/NSM/data-migration/LSE20181121070005_13874323.html' },
  { id: 8, titulo: 'Results for the year ended 30 September 2021 (desinversiones y simplificación)', editor: 'The Sage Group plc', tipo: 'Primaria', fecha: '2021-11-17', url: 'https://data.fca.org.uk/artefacts/NSM/RNS/4180346.html' },
];
const B = {
  _estado: 'completo',
  historia: {
    resumen: 'Sage nació en 1981 en Newcastle como programa de contabilidad para pequeñas empresas británicas y salió a bolsa en Londres en 1989. Creció durante dos décadas comprando programas locales de contabilidad y nómina en Europa, EE. UU., Sudáfrica y Asia, que vendía con licencia y mantenimiento a través de una red de asesorías y distribuidores. Desde 2014 (Stephen Kelly) y sobre todo desde 2018 (Steve Hare, consejero delegado) se transformó en un negocio de suscripción: compró Intacct en 2017 por 850 M USD, vendió los negocios no estratégicos (Sage Pay, Brasil, Polonia, Australia, Asia, Suiza) en 2019-2022 y se concentró en tres regiones y en la nube [7, 8]. Hoy el 97 % de los ingresos es recurrente y la mitad del negocio en EE. UU. es Intacct [3].',
    hitos: [
      { anio: '1981', hito: 'Fundación en Newcastle: contabilidad para pymes británicas.' },
      { anio: '1989', hito: 'Salida a la Bolsa de Londres; entra en el FTSE 100 en 1999.' },
      { anio: '2017', hito: 'Compra de Intacct (EE. UU.), contabilidad en la nube para medianas empresas, por 850 M USD [7].' },
      { anio: '2018', hito: 'Steve Hare, director financiero desde 2014, pasa a consejero delegado tras un aviso de resultados [7].' },
      { anio: '2019-2022', hito: 'Venta de Sage Pay, Brasil, Polonia, Australia, Asia y Suiza; reestructuración de 2021 [8].' },
      { anio: '2022', hito: 'Compras de Brightpearl y Lockstep para ampliar la red de pagos y cobros [4].' },
      { anio: '2024-2025', hito: 'Sage Copilot y agentes de IA en Intacct, X3, Sage Accounting y Sage 50 [4].' },
      { anio: '2026', hito: 'Caída de las acciones del software por el miedo a la IA (mínimo de 771,66 peniques el 24-feb); el crecimiento orgánico sube al 10 % [3].' },
    ],
    confianza: 'Media',
  },
  sector: {
    definicion: 'Software de gestión financiera, nómina y RR. HH. para pequeñas y medianas empresas (contabilidad, ERP para empresas medianas, nómina), vendido por suscripción en la nube o conectado a la nube, en EE. UU., Reino Unido, Francia, Iberia, Centroeuropa y Sudáfrica. Es la parte «pymes» del software empresarial horizontal de la ficha sectorial [1]: Sage compite en contabilidad simple (Intuit QuickBooks, Xero), en ERP para medianas (Intacct frente a NetSuite de Oracle, Microsoft Dynamics 365 Business Central, Acumatica) y en nómina (ADP, Paychex, empresas locales). No encontramos una cifra pública fiable del tamaño de este nicho con dos fuentes: usamos el ERP mundial como referencia (≈145.582 M USD en 2025, +7,1 % anual, Apps Run The World vía la ficha [1]) y hacemos la prueba de cuota con la propia empresa.',
    tamano: '≈ 109.700 M GBP de mercado mundial de ERP en 2025 (145.582 M USD, ARTW) [1]; el nicho de pymes de Sage es una fracción que no se publica con fuente fiable.',
    unidad_serie: null, serie: [],
    tcac_historico_pct: null, tcac_previsto_pct: 7.1, cr5_pct: null, estructura: 'Fragmentada',
    drivers: [
      { driver: 'Paso de licencia a suscripción y a la nube', efecto: '+', horizonte: 'Estructural', evidencia: 'Penetración de suscripción del 84 % (82 % en FY2024); nube nativa +25 % en el 1S26 [3].' },
      { driver: 'Digitalización obligatoria (factura electrónica, Making Tax Digital, nómina)', efecto: '+', horizonte: 'Estructural', evidencia: 'Iberia creció un 9 % con el impulso de la normativa a asesorías [3].' },
      { driver: 'Subidas de precio y módulos (IA, pagos, cuentas por pagar y cobrar)', efecto: '+', horizonte: 'Estructural', evidencia: 'Renovación por valor del 102 % con subidas de precio dirigidas [3].' },
      { driver: 'Agentes de IA y herramientas nativas de IA (Rillet, asistentes de los bancos)', efecto: '+/−', horizonte: 'Estructural', evidencia: 'Las herramientas de Anthropic del 3-feb-2026 hundieron todo el software; Deutsche Bank habla de competencia emergente de empresas nativas de IA en algunos verticales [1, 6].' },
      { driver: 'Ciclo de las pymes (altas y cierres de empresas, empleo)', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'En el estrés de liquidez de la empresa la baja de clientes sube un 75 % [3].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Intuit domina las microempresas en EE. UU. y Xero en Reino Unido, Australia y Nueva Zelanda; en medianas compiten NetSuite y Dynamics. La rivalidad es por canal (asesorías) más que por precio [1].' },
      { fuerza: 'Poder de los clientes', intensidad: 2, justificacion: 'Millones de pymes sin poder individual; el precio sube con la renovación (102 % por valor) [3].' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Nube pública (AWS) y modelos de IA: proveedores grandes, pero con alternativas; coste de ventas del 7 % [1, 3].' },
      { fuerza: 'Amenaza de entrada', intensidad: 4, justificacion: 'La IA abarata hacer software contable; bancos y fintechs dan contabilidad integrada; empresas nativas de IA (Rillet) atacan a las medianas [6].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'Un agente de IA puede llevar la contabilidad simple sobre el banco, pero el registro auditable, la normativa fiscal y la nómina de cada país siguen haciendo falta [1, 3].' },
    ],
    ciclo: { posicion: 'Madurez del ciclo', comentario: 'Negocio poco cíclico: en 2009 cayeron las licencias nuevas y aguantó el mantenimiento; en 2020 la pandemia frenó las altas pero el 90 % era ya recurrente; en 2022 cayeron los múltiplos del software por los tipos, no las ventas de Sage, que crecieron un 6 % [1]. Hoy el crecimiento orgánico se acelera (10 % en nueve meses) mientras el múltiplo se ha comprimido por el miedo a la IA: el ciclo del negocio y el de la bolsa van en sentido contrario [3].' },
    regulacion: 'La normativa empuja la demanda: factura electrónica obligatoria en Francia (calendario 2026-2027), Alemania, España (Verifactu) y la UE (ViDA), Making Tax Digital en Reino Unido para autónomos desde abril de 2026, y cambios de nómina constantes en cada país, que exigen un proveedor que mantenga el programa al día. En contra, la Ley de IA de la UE y la protección de datos (RGPD) imponen obligaciones a los agentes que tocan datos financieros [1].',
    tendencias: 'La IA es a la vez la amenaza y la palanca. Sage vende Copilot y agentes de cuentas por pagar, cobros y cierre, cobrados como módulos, sobre datos contables de millones de clientes [3]. El riesgo es que la contabilidad simple pase a ser una función gratuita de un banco o de un agente genérico y que el precio por cliente deje de subir. En la ficha del sector, el software de contabilidad simple y nómina para pymes es de riesgo «medio» y el ERP para medianas de riesgo «bajo-medio» [1].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: null,
    posicion: 'Uno de los tres grandes del software contable para pymes en sus mercados: n.º 1 en Reino Unido, Francia, Iberia y Sudáfrica en contabilidad y nómina de pymes; en EE. UU., Intacct es uno de los dos o tres primeros ERP en la nube para medianas junto a NetSuite (sin cuota con fuente) [2].',
    competidores: [
      { nombre: 'Intuit (QuickBooks)', pais: 'EE. UU.', ticker: 'INTU', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Líder de microempresas en EE. UU.; capitalización de 81.561 M USD y margen EBITDA del 32,7 % según su informe del repositorio [5].' },
      { nombre: 'Xero', pais: 'Nueva Zelanda', ticker: 'XRO.AX', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Rival directo en Reino Unido, Australia y Nueva Zelanda en contabilidad en la nube para pequeñas empresas; compró Melio (pagos, EE. UU.) en 2025.' },
      { nombre: 'Oracle NetSuite', pais: 'EE. UU.', ticker: 'ORCL', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Rival principal de Intacct en ERP en la nube para medianas.' },
      { nombre: 'Microsoft Dynamics 365 Business Central', pais: 'EE. UU.', ticker: 'MSFT', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'ERP para medianas vendido por integradores; integración con Copilot.' },
      { nombre: 'Paychex', pais: 'EE. UU.', ticker: 'PAYX', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Nómina para pymes en EE. UU. (rival de Sage HR y Criterion); margen EBITDA del 46,6 % según su informe del repositorio.' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 2, evidencia: 'La red de asesorías y la Sage Platform conectan clientes, bancos y proveedores; ARR por clientes nuevos de 200 M al año [3].' },
        { fuente: 'Costes de cambio', puntuacion: 4, evidencia: 'Cambiar de programa contable o de nómina exige migrar años de datos y reformar a la asesoría; renovación por valor del 101-102 % durante años [3, 4].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'Marca de 45 años y localización fiscal y de nómina en cada país [2].' },
        { fuente: 'Ventaja en costes', puntuacion: 2, evidencia: 'Margen EBIT subyacente del 23,9 %, por debajo de Intuit y de Paychex [3, 5].' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'Mercados nacionales donde mantener la normativa al día solo compensa a dos o tres proveedores [2].' },
      ],
    },
    amenazas: 'La amenaza principal es la IA: si un agente genérico o el banco de la pyme llevan la contabilidad simple y la nómina gratis o a menor precio, las subidas de precio que hoy explican la mitad del crecimiento dejarían de pasar, y las altas de pequeñas empresas irían a otros [1, 6]. Probabilidad media a cinco años en la contabilidad simple (≈ 30-35 % de los ingresos, estimación propia: Sage Accounting, parte de Sage 50 y nómina de pequeñas empresas) y baja en el ERP para medianas (Intacct, X3, Sage 200), donde el cliente necesita registro auditable, consolidación y normativa [3]. Segunda amenaza: NetSuite y Dynamics en medianas, y Xero e Intuit en pequeñas.',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [ { agencia: 'MSCI', calificacion: 'AAA', fecha: '2026-05' }, { agencia: 'CDP (clima)', calificacion: 'A', fecha: '2026-05' }, { agencia: 'EcoVadis', calificacion: 'Oro', fecha: '2026-05' } ],
    materialidad: 'Los asuntos ESG que mueven las cifras son tres: la seguridad y la privacidad de los datos financieros y de nómina de millones de pymes (un fallo grave costaría clientes y multas del RGPD de hasta el 4 % de las ventas), el uso responsable de la IA con datos de clientes (Ley de IA de la UE) y la retención de ingenieros. Las emisiones son pequeñas (oficinas y nube) y el objetivo es reducirlas a la mitad en 2030 frente a 2019 [2, 3].',
    controversias: 'No encontramos sanciones ni litigios relevantes en los últimos tres años en los RNS ni en el informe anual 2025; la única partida fue una regularización de cotizaciones de nómina en Francia (9 M GBP en FY2023, revertida en parte en FY2024) [4].',
    confianza: 'Media',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'sector', campo: 'tamaño del nicho de software contable para pymes y serie', tipo: 'Núcleo', intentos: '1) Informe anual 2025 (no da tamaño de mercado); 2) ficha sectorial del repo (solo ERP total, CRM y vertical); 3) búsqueda de Gartner/IDC (sin cifra abierta)', decision: 'Omitido' },
    { seccion: 'competencia', campo: 'cuotas de mercado e ingresos de Xero, NetSuite y Dynamics', tipo: 'Complemento', intentos: '1) Informe anual de Sage (no da cuotas); 2) MarketScreener de Xero (la página devolvió otra empresa); 3) ficha sectorial (sin cuotas de pymes)', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Annual Report and Accounts 2025: consejo, comités, informe de remuneraciones y participaciones significativas', editor: 'The Sage Group plc', tipo: 'Primaria', fecha: '2025-12', url: 'https://filings.xbrl.org/2138005RN5XYLTF8G138/2025-09-30/ESEF/GB/0/2138005RN5XYLTF8G138-2025-09-30/reports/2138005RN5XYLTF8G138-2025-09-30-T01.xhtml' },
  { id: 2, titulo: 'CFO transition at Sage as Howell prepares to exit (Jacqui Cartin, directora financiera desde el 1-ene-2026)', editor: 'The CFO', tipo: 'Prensa', fecha: '2025-03-27', url: 'https://the-cfo.io/2025/03/27/cfo-transition-at-sage-as-howell-prepares-to-exit/' },
  { id: 3, titulo: 'Insider: FTSE 100 directors spot bargains after AI sell-off (compras de D. Harding y J. Bates)', editor: 'interactive investor', tipo: 'Prensa', fecha: '2026-02-16', url: 'https://www.ii.co.uk/analysis-commentary/insider-ftse-100-directors-spot-bargains-after-ai-sell-ii538138' },
  { id: 4, titulo: 'Director/PDMR Shareholding: venta de 75.000 acciones del director de tecnología (28-may-2026)', editor: 'The Sage Group plc (RNS vía lse.co.uk)', tipo: 'Primaria', fecha: '2026-05-29', url: 'https://www.lse.co.uk/rns/SGE/directorpdmr-shareholding-eyhs2hifion617d.html' },
  { id: 5, titulo: 'Results for the year ended 30 September 2025 (guía de FY2025 y FY2026)', editor: 'The Sage Group plc', tipo: 'Primaria', fecha: '2025-11-19', url: 'https://data.fca.org.uk/artefacts/NSM/RNS/3331551a-5060-4fad-88d1-730e3d45176b.html' },
  { id: 6, titulo: 'Results for the year ended 30 September 2024 (guía de FY2024)', editor: 'The Sage Group plc', tipo: 'Primaria', fecha: '2024-11-20', url: 'https://data.fca.org.uk/artefacts/NSM/RNS/5436201.html' },
  { id: 7, titulo: 'Results for the six months to 31 March 2026 (guía elevada a «más del 9 %»)', editor: 'The Sage Group plc', tipo: 'Primaria', fecha: '2026-05-21', url: 'https://data.fca.org.uk/artefacts/NSM/RNS/3eb4885b-7af6-48bc-b314-aad22e14d785.html' },
  { id: 8, titulo: 'Trading update for the nine months ended 30 June 2026', editor: 'The Sage Group plc', tipo: 'Primaria', fecha: '2026-07-29', url: 'https://www.investegate.co.uk/announcement/rns/sage-group--sge/trading-update-for-nine-months-ended-30-june-2026/9692278' },
];
const C = {
  _estado: 'completo',
  directivos: {
    equipo: [
      { nombre: 'Steve Hare', cargo: 'Consejero delegado', desde: '2018', participacion_pct: null, trayectoria: 'Director financiero de Sage desde 2014 y consejero delegado desde 2018; antes en Invensys y socio de Apax. Con él la suscripción pasó al 84 % de los ingresos, se vendieron los negocios no estratégicos y el crecimiento orgánico subió del 4 % al 10 % [1, 8].' },
      { nombre: 'Jacqui Cartin', cargo: 'Directora financiera', desde: '2026', participacion_pct: null, trayectoria: 'En Sage desde 2018 (llegó de KPMG); fue directora de control financiero del grupo, con tesorería, impuestos y gestión del capital. Sustituyó a Jonathan Howell el 1-ene-2026 con un sueldo de 650.000 GBP [2].' },
      { nombre: 'Andrew Duff', cargo: 'Presidente (no ejecutivo)', desde: '2021', participacion_pct: null, trayectoria: 'Presidente de Elementis y de Severn Trent, consejero delegado de npower; presidente de Sage desde octubre de 2021 [1].' },
      { nombre: 'Aaron Harris', cargo: 'Director de tecnología', desde: '2017', participacion_pct: null, trayectoria: 'Llegó con Intacct; responsable de la plataforma y de Copilot; vendió 75.000 acciones a unos 8,51 GBP el 28-may-2026 [4].' },
    ],
    historial_guidance: [
      { anio: 'FY2024', guia: 'Crecimiento orgánico del 9 % o más y margen al alza', real: '9,3 % orgánico (2.332 M frente a 2.134 M); margen subyacente del 22,4 % [6]', cumplida: 'Sí' },
      { anio: 'FY2025', guia: 'Crecimiento orgánico del 9 % o más y margen al alza', real: '9 % orgánico; margen subyacente del 23,9 % (+1,5 pp) [5]', cumplida: 'Sí' },
      { anio: 'FY2026', guia: '9 % o más (nov-2025), elevada a «más del 9 %» en mayo de 2026', real: '10 % orgánico en nueve meses; margen del 1S del 23,9 % (+0,8 pp) [7, 8]', cumplida: 'Parcial' },
    ],
    comentario: 'La dirección ha cumplido la guía los tres últimos ejercicios y la ha subido este año; el discurso es estable y conservador (un número, «9 % o más», y margen al alza sin cifra) [5, 7]. Hare lleva doce años en el grupo y ocho como consejero delegado: no hay plan de sucesión público, y es el riesgo de continuidad más claro. El relevo de la dirección financiera fue interno y anunciado con nueve meses de antelación [2]. Los dos consejeros que compraron en febrero de 2026 son independientes; el director de tecnología vendió en mayo, a precios por debajo de los de hoy [3, 4].',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Andrew Duff', cargo: 'Presidente', tipo: 'Independiente', desde: '2021', comisiones: 'Nombramientos (presidente)' },
      { nombre: 'Steve Hare', cargo: 'Consejero delegado', tipo: 'Ejecutivo', desde: '2014', comisiones: '—' },
      { nombre: 'Jacqui Cartin', cargo: 'Directora financiera', tipo: 'Ejecutivo', desde: '2026', comisiones: '—' },
      { nombre: 'Annette Court', cargo: 'Consejera independiente coordinadora', tipo: 'Independiente', desde: '2019', comisiones: 'Nombramientos, remuneraciones' },
      { nombre: 'Jonathan Bewes', cargo: 'Consejero', tipo: 'Independiente', desde: '2019', comisiones: 'Auditoría y riesgos' },
      { nombre: 'John Bates', cargo: 'Consejero', tipo: 'Independiente', desde: '2019', comisiones: 'Nombramientos' },
      { nombre: 'Derek Harding', cargo: 'Consejero', tipo: 'Independiente', desde: '2021', comisiones: 'Auditoría y riesgos (presidente)' },
      { nombre: 'Roisin Donnelly', cargo: 'Consejera', tipo: 'Independiente', desde: '2023', comisiones: 'Remuneraciones (presidenta)' },
      { nombre: 'Maggie Chan Jones', cargo: 'Consejera (ESG)', tipo: 'Independiente', desde: '2022', comisiones: 'Remuneraciones' },
      { nombre: 'Lori Mitchell-Keller', cargo: 'Consejera', tipo: 'Independiente', desde: '2025', comisiones: 'Nombramientos' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: true, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 80.0, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: 'FY2025', total: 4.562, fijo: 1.175, variable_corto: 0.881, variable_largo: 2.506, ratio_salario_medio: 71 },
    remuneracion: 'El consejero delegado cobró 4,56 M GBP en FY2025 (5,32 M en FY2024): 1,03 M de sueldo, 0,88 M de bonus y 2,51 M del plan de acciones a largo plazo (PSP) [1]. El bonus se mide con el crecimiento de los ingresos totales (9,8 % logrado), la experiencia del cliente y objetivos personales; el PSP de FY2025 se consolidó al 89,7 % de penetración de Sage Business Cloud, al percentil 80 de rentabilidad total para el accionista y a objetivos ESG, con el ROCE como condición mínima [1]. Premia crecimiento con un suelo de rentabilidad, no crecimiento a cualquier precio. Ratio con el empleado británico medio: 71 a 1. Todas las propuestas de la junta de 2025 pasaron con más del 80 % a favor (no encontramos el porcentaje exacto de la votación de remuneraciones) [1].',
    accionistas: [
      { nombre: 'BlackRock, Inc.', pct: 5.9, tipo: 'Institucional', variacion: 'Notificación previa a 30-sep-2025' },
      { nombre: 'The Capital Group Companies', pct: 5.1, tipo: 'Institucional', variacion: 'Notificación previa a 30-sep-2025' },
      { nombre: 'Lindsell Train', pct: 4.97, tipo: 'Institucional', variacion: 'Notificación previa a 30-sep-2025' },
      { nombre: 'FIL Limited (Fidelity)', pct: 5.0, tipo: 'Institucional', variacion: 'Sube por encima del 5 % (3-oct-2025)' },
      { nombre: 'FMR LLC', pct: 4.22, tipo: 'Institucional', variacion: 'Sin cambios notificados' },
      { nombre: 'Aviva plc', pct: 2.99, tipo: 'Institucional', variacion: 'Sin cambios notificados' },
      { nombre: 'Autocartera y fideicomiso de empleados', pct: 6.3, tipo: 'Autocartera', variacion: '53,7 M en autocartera y 6,8 M en el EBT (28-ago-2026)' },
    ],
    insiders: [
      { fecha: '2026-02-09', persona: 'Derek Harding (consejero independiente)', operacion: 'Compra', acciones: 10000, importe: 0.086 },
      { fecha: '2026-02-12', persona: 'John Bates (consejero independiente)', operacion: 'Compra', acciones: 35000, importe: 0.283 },
      { fecha: '2026-05-28', persona: 'Aaron Harris (director de tecnología)', operacion: 'Venta', acciones: 75000, importe: 0.638 },
    ],
    control_y_defensas: 'Capital disperso: el mayor accionista (BlackRock) tiene el 5,9 % y ningún pacto [1]. Una sola clase de acciones, una acción un voto, sin límites de voto ni blindajes; todos los consejeros se someten a reelección cada año [1]. Presidente no ejecutivo e independiente al nombrarlo, separado del consejero delegado, y consejera coordinadora. Ocho de diez consejeros son independientes. Sin operaciones vinculadas relevantes. Una empresa así es comprable: el riesgo para el minoritario es más bien una opa de capital riesgo a un precio bajo en un momento de múltiplo deprimido.',
    alertas: [ 'Venta de 75.000 acciones del director de tecnología el 28-may-2026 a unos 8,51 GBP [4]; compras de dos consejeros independientes en febrero a 8,09-8,64 GBP [3].' ],
    confianza: 'Media',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'porcentaje exacto del voto de remuneraciones en las tres últimas juntas', tipo: 'Complemento', intentos: '1) Informe anual 2025 (solo «más del 80 % a favor» en todas las propuestas); 2) resultado de la junta de feb-2026 en investegate (no encontrado); 3) búsqueda web', decision: 'Omitido' },
    { seccion: 'directivos', campo: 'participación accionarial de los directivos', tipo: 'Complemento', intentos: '1) Informe de remuneraciones (tabla de participaciones ilegible en el texto extraído); 2) RNS de operaciones; 3) búsqueda web', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de SGE.L, ^FTSE y EXV3.DE (precio de cierre del 14-oct-2026: 1.073 peniques; cierres de cada ejercicio)', editor: 'Yahoo Finance (herramientas/bolsa.mjs)', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/SGE.L/history' },
  { id: 2, titulo: 'Sage Group plc: previsiones anuales FY2025-FY2028 (ingresos, EBITDA, EBIT, beneficio, BPA, dividendo, deuda neta)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://www.marketscreener.com/quote/stock/SAGE-GROUP-PLC-13421569/finances/' },
  { id: 3, titulo: 'Sage Group plc: consenso (19 analistas, Comprar; objetivo medio 11,43 GBP, mínimo 8,50, máximo 14,00; último cierre 10,73)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://www.marketscreener.com/quote/stock/SAGE-GROUP-PLC-13421569/consensus/' },
  { id: 4, titulo: 'Tipos de cambio de referencia del euro, 14-oct-2026 (USD 1,1195; GBP 0,84385)', editor: 'Banco Central Europeo', tipo: 'Primaria', fecha: '2026-10-14', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml' },
  { id: 5, titulo: 'Rendimiento del gilt a 10 años (IUDMNPY), 12-oct-2026: 5,39 % (tomado del informe de LSEG del repositorio)', editor: 'Bank of England, Statistical Interactive Database', tipo: 'Primaria', fecha: '2026-10-12', url: 'https://www.bankofengland.co.uk/boeapps/database/' },
  { id: 6, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026: 4,20 %', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 7, titulo: 'Comparables de software del 14-oct-2026 (Intuit, Constellation, Roper; USD)', editor: 'Este repositorio (sectores/software-2026-10-14-comparables.json)', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'sectores/software-2026-10-14-comparables.json' },
  { id: 8, titulo: 'Informes value de SAP (11-oct), Nemetschek (10-oct), Atoss (11-oct), Dassault (7-oct) y Paychex (12-oct): múltiplos calculados', editor: 'Este repositorio', tipo: 'Datos de mercado', fecha: '2026-10-12', url: 'informes/' },
  { id: 9, titulo: 'Insider: FTSE 100 directors spot bargains after AI sell-off (UBS: 13 veces el beneficio de 2028; récord de 1.335 peniques en feb-2025)', editor: 'interactive investor', tipo: 'Prensa', fecha: '2026-02-16', url: 'https://www.ii.co.uk/analysis-commentary/insider-ftse-100-directors-spot-bargains-after-ai-sell-ii538138' },
  { id: 10, titulo: 'Total Voting Rights a 28-ago-2026 (905,39 M de acciones con voto)', editor: 'The Sage Group plc', tipo: 'Primaria', fecha: '2026-08-28', url: 'https://www.investegate.co.uk/announcement/rns/sage-group--sge/total-voting-rights/9745983' },
  { id: 11, titulo: 'Results for the six months to 31 March 2026 (dilución: 12 M de acciones; puente a 31-mar-2026)', editor: 'The Sage Group plc', tipo: 'Primaria', fecha: '2026-05-21', url: 'https://data.fca.org.uk/artefacts/NSM/RNS/3eb4885b-7af6-48bc-b314-aad22e14d785.html' },
];
const b = bolsa.bolsa;
const cierres = Object.fromEntries(bolsa.cierres_ejercicio.map((x) => [x.anio, x.precio_cierre / 100]));
const g = (usd) => Math.round(usd / USD_GBP); const ge = (eur) => Math.round(eur * EUR_GBP);
const comps = [
  { nombre: 'Intuit', ticker: 'INTU', pais: 'US', capitalizacion: g(81561), ev_ventas: 3.83, ev_ebitda_ltm: 11.7, ev_ebitda_ntm: 9.5, per_ntm: 14.5, crecimiento_pct: 9.2, margen_ebitda_pct: 32.7, roic_pct: 23.1, dn_ebitda: 0.1, fcf_yield_pct: 10.6 },
  { nombre: 'Paychex', ticker: 'PAYX', pais: 'US', capitalizacion: g(37100), ev_ventas: 6.17, ev_ebitda_ltm: 13.2, ev_ebitda_ntm: 12.3, per_ntm: 18.3, crecimiento_pct: 8.4, margen_ebitda_pct: 46.6, roic_pct: 26.8, dn_ebitda: 1.2, fcf_yield_pct: 5.3 },
  { nombre: 'SAP', ticker: 'SAP', pais: 'DE', capitalizacion: ge(221940), ev_ventas: 5.65, ev_ebitda_ltm: 18.2, ev_ebitda_ntm: 15.1, per_ntm: 24.2, crecimiento_pct: 5.8, margen_ebitda_pct: 31.1, roic_pct: 15.5, dn_ebitda: -0.1, fcf_yield_pct: 3.6 },
  { nombre: 'Nemetschek', ticker: 'NEM', pais: 'DE', capitalizacion: ge(7784), ev_ventas: 8.18, ev_ebitda_ltm: 25.8, ev_ebitda_ntm: 19.2, per_ntm: 26.7, crecimiento_pct: 15.1, margen_ebitda_pct: 31.7, roic_pct: 19.2, dn_ebitda: 0.4, fcf_yield_pct: 4.2 },
  { nombre: 'Atoss Software', ticker: 'AOF', pais: 'DE', capitalizacion: ge(1389), ev_ventas: 6.35, ev_ebitda_ltm: 16.3, ev_ebitda_ntm: 14.3, per_ntm: 23.7, crecimiento_pct: 16.1, margen_ebitda_pct: 39.0, roic_pct: null, dn_ebitda: -1.5, fcf_yield_pct: 4.7 },
  { nombre: 'Dassault Systèmes', ticker: 'DSY', pais: 'FR', capitalizacion: ge(28507), ev_ventas: 4.34, ev_ebitda_ltm: 13.1, ev_ebitda_ntm: 11.9, per_ntm: 20.4, crecimiento_pct: 6.4, margen_ebitda_pct: 33.0, roic_pct: 13.8, dn_ebitda: -0.8, fcf_yield_pct: 5.2 },
  { nombre: 'Constellation Software', ticker: 'CSU', pais: 'CA', capitalizacion: g(44603), ev_ventas: 4.2, ev_ebitda_ltm: 15.3, ev_ebitda_ntm: 12.5, per_ntm: 34.8, crecimiento_pct: 17.9, margen_ebitda_pct: 27.6, roic_pct: 21.7, dn_ebitda: 0.5, fcf_yield_pct: 5.4 },
  { nombre: 'Roper Technologies', ticker: 'ROP', pais: 'US', capitalizacion: g(36730), ev_ventas: 5.57, ev_ebitda_ltm: 14.2, ev_ebitda_ntm: 13.0, per_ntm: 18.3, crecimiento_pct: 6.5, margen_ebitda_pct: 39.1, roic_pct: 6.4, dn_ebitda: 3.4, fcf_yield_pct: 7.1 },
];
const D = {
  _estado: 'completo',
  identificacion: {
    nombre: 'The Sage Group plc', nombre_corto: 'Sage', ticker: 'SGE', isin: 'GB00B8C3BL03', mercado: 'London Stock Exchange (cotiza en peniques; el informe va en GBP)', indice_referencia: 'FTSE 100',
    pais: 'Reino Unido', pais_iso: 'GB', sector: 'Tecnologías de la información', industria: 'Software de aplicaciones', sede: 'Newcastle upon Tyne (Reino Unido)', fundacion: '1981', empleados: null, web: 'www.sage.com',
    precio: 10.73, fecha_precio: '2026-10-14', acciones: 917.4, capitalizacion_publicada: null, free_float_pct: 99.0,
    max_52s: b ? bolsa.identificacion.max_52s / 100 : null, min_52s: bolsa.identificacion.min_52s / 100,
    volumen_medio_diario: '≈ 31 M GBP/día (3 meses; ≈ 3,0 M de acciones)', proximos_resultados: '2026-11-19',
  },
  consenso: {
    estimaciones: [
      { periodo: 'FY2026e', ingresos: 2762, ebitda: 743.9, ebit: 674.7, bpa: 0.4443, dpa: 0.235, fuente: 'MarketScreener, 19 analistas [2]' },
      { periodo: 'FY2027e', ingresos: 3015, ebitda: 824.4, ebit: 754.8, bpa: 0.5227, dpa: 0.2497, fuente: 'MarketScreener [2]' },
      { periodo: 'FY2028e', ingresos: 3287, ebitda: 916.1, ebit: 842.5, bpa: 0.6048, dpa: 0.2694, fuente: 'MarketScreener [2]' },
    ],
    recomendaciones: { n_analistas: 19, comprar: null, mantener: null, vender: null, po_medio: 11.43, po_min: 8.5, po_max: 14.0 },
    base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: 2.9,
    confianza: 'Media',
  },
  bolsa: {
    tipo_rentabilidad: b.tipo_rentabilidad, rentabilidades: b.rentabilidades, anual: b.anual,
    beta: bolsa.betas.semanal_5a, volatilidad_pct: b.volatilidad_pct, max_drawdown_pct: b.max_drawdown_pct, posicion_corta_pct: null,
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: [
      { anio: 'FY2021', precio_cierre: cierres.FY2021, ev_ebitda_ntm: null, per_ntm: null, excluir: true },
      { anio: 'FY2022', precio_cierre: cierres.FY2022, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: 'FY2023', precio_cierre: cierres.FY2023, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: 'FY2024', precio_cierre: cierres.FY2024, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: 'FY2025', precio_cierre: cierres.FY2025, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
    ],
    confianza: 'Media',
  },
  comparables: { empresas: comps, confianza: 'Media' },
  transacciones: null,
  fuentes: fD,
  huecos: [
    { seccion: 'transacciones', campo: 'operaciones comparables con múltiplo publicado', tipo: 'Complemento', intentos: '1) RNS de Sage (sus compras no publican múltiplos: Intacct, Brightpearl, Lockstep, Criterion); 2) informes del repo de Intuit y SAP (sin operaciones de software contable para pymes con múltiplo); 3) búsqueda de Xero-Melio e Intuit-Mailchimp (sin documento oficial con EBITDA)', decision: 'Omitido' },
    { seccion: 'consenso', campo: 'reparto de recomendaciones (comprar, mantener, vender)', tipo: 'Complemento', intentos: '1) MarketScreener (solo «Comprar» de media); 2) web de Sage (403); 3) búsqueda web', decision: 'Omitido' },
    { seccion: 'bolsa', campo: 'posición corta', tipo: 'Complemento', intentos: '1) FCA (registro de cortos sin posiciones públicas ≥ 0,5 % en la búsqueda); 2) Investegate «UK Short Positions» (no consultado por tiempo); 3) prensa', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Índice de artículos sobre LSE:SGE (jun-sep 2026): «Prediction: this FTSE 100 stock will be an AI winner, not a loser» (29-sep), «Here\'s why Sage, LSEG and RELX are charging higher today» (14-sep) y otros', editor: 'The Motley Fool UK', tipo: 'Foros y redes', fecha: '2026-09-29', url: 'https://www.twelfthmagpie.com/tickers/lse-sge/page/1' },
  { id: 2, titulo: 'Terry Smith\'s overhaul: what\'s behind it and what\'s changed? (Fundsmith vuelve a comprar Sage)', editor: 'interactive investor', tipo: 'Foros y redes', fecha: '2026-07-30', url: 'https://www-warranty.ii.co.uk/analysis-commentary/terry-smiths-overhaul-whats-behind-it-and-whats-changed-ii539821' },
  { id: 3, titulo: 'Sage Group consensus: cambios de recomendación de AlphaValue (ago-sep 2026), Investec (jun) y Peel Hunt (may)', editor: 'MarketScreener', tipo: 'Foros y redes', fecha: '2026-10-15', url: 'https://www.marketscreener.com/quote/stock/SAGE-GROUP-PLC-13421569/consensus/' },
  { id: 4, titulo: 'Insider: FTSE 100 directors spot bargains after AI sell-off', editor: 'interactive investor', tipo: 'Foros y redes', fecha: '2026-02-16', url: 'https://www.ii.co.uk/analysis-commentary/insider-ftse-100-directors-spot-bargains-after-ai-sell-ii538138' },
];
const E = {
  _estado: 'completo',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'The Motley Fool UK (artículos y comentarios de columnistas particulares)', fecha: '2026-09', n_comentarios: 12, tono: 'Positivo', resumen: 'Doce artículos entre junio y septiembre; la mayoría alcistas: «ganador y no perdedor de la IA», «dividendo creciente», caída del 31-33 % como oportunidad. El 14-sep la acción subió un 6,3 % con el rebote del software [1].' },
      { plataforma: 'interactive investor (análisis y lectores)', fecha: '2026-07', n_comentarios: 5, tono: 'Positivo', resumen: 'La vuelta de Fundsmith a Sage en el 1S26 se lee como señal de calidad a buen precio, junto con otras compras de software [2].' },
      { plataforma: 'MarketScreener (cambios de recomendación de analistas)', fecha: '2026-09', n_comentarios: 5, tono: 'Dividido', resumen: 'AlphaValue pasó a «reducir» en agosto y a «añadir» en septiembre; Investec mantiene con objetivo recortado (jun); Peel Hunt y Shore Capital subieron a comprar en mayo y febrero [3].' },
      { plataforma: 'Prensa de inversión para particulares (compras de consejeros)', fecha: '2026-02', n_comentarios: 3, tono: 'Dividido', resumen: 'Fuera de la ventana de tres meses, pero marca el suelo del debate: el miedo a que la IA quite poder de precios contra las compras de dos consejeros a 8,09-8,64 GBP [4].' },
    ],
    temas: [
      { tema: '¿Se come la IA la contabilidad de las pymes?', postura: 'Dividida', peso: 'Alto', contraste: 'Las cifras no lo muestran todavía: crecimiento orgánico del 10 % y renovación por valor del 102 % en 2026, con ARR nuevo de clientes nuevos de 200 M. El riesgo es a 3-5 años, no del trimestre.' },
      { tema: 'Recompras y dividendo', postura: 'Alcista', peso: 'Medio', contraste: 'Ciertas: 1.205 M de recompras en 18 meses, pero con la deuda neta ya en 2,0 veces el EBITDA subyacente, el ritmo no puede repetirse sin más deuda.' },
      { tema: 'Compra de Fundsmith y de consejeros', postura: 'Alcista', peso: 'Medio', contraste: 'Señal de calidad, no de precio: las compras fueron a 8,1-8,6 GBP, un 20-25 % por debajo de hoy.' },
      { tema: 'Rebote desde mínimos', postura: 'Alcista', peso: 'Bajo', contraste: 'La acción subió un 39 % desde el mínimo de febrero (771,66 peniques) y un 10 % desde el cierre de septiembre: parte del descuento ya se ha cerrado.' },
    ],
    confianza: 'Baja',
  },
  fuentes: fE,
  huecos: [ { seccion: 'sentimiento', campo: 'foros con debate directo (LSE Chat, ADVFN, Reddit)', tipo: 'Complemento', intentos: '1) LSE Chat (403 según lecciones); 2) búsqueda de hilos de foros de septiembre-octubre (sin resultados); 3) índices de Motley Fool e interactive investor (usados)', decision: 'Calculado y marcado como estimación' } ],
};

for (const [l, o] of Object.entries({ A, B, C, D, E })) guarda(l, o);
console.log('Notas A-E escritas en', dir);
