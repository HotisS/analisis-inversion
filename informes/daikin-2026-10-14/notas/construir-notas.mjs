// Escribe las notas A-E de Daikin Industries (corte 2026-10-14) a partir de los documentos de notas/docs
// (resúmenes de resultados «Kessan Tanshin» en inglés, presentaciones y transcripciones, convocatoria de la junta 123,
// informe integrado 2026), de Yahoo Finance (consenso y comparables) y de herramientas/bolsa.mjs.
// Cada nota cita solo con [n] de su propia lista de fuentes. Ejecutar: node notas/construir-notas.mjs
// Ejercicio: cierre a 31 de marzo; etiqueta «fin» (FY2026 = abr-2025 a mar-2026; Daikin lo llama «fiscal 2025»).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const man = JSON.parse(fs.readFileSync(path.join(dir, 'docs', '_manifest.json'), 'utf8'));
const u = (k) => man[k].url;
const bolsa = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Brief Report on the Settlement of Accounts (Consolidated) for the Business Year Ended March 31, 2026 (J-GAAP): cuenta, balance, flujos y segmentos de FY2025 y FY2026', editor: 'Daikin Industries, Ltd.', tipo: 'Primaria', fecha: '2026-05-12', url: u('t26q4') },
  { id: 2, titulo: 'Brief Report on the Settlement of Accounts (Consolidated) for the Three Months Ended June 30, 2026 (J-GAAP)', editor: 'Daikin Industries, Ltd.', tipo: 'Primaria', fecha: '2026-08-04', url: u('t27q1') },
  { id: 3, titulo: 'Brief Report on the Settlement of Accounts (Consolidated) for the Business Year Ended March 31, 2024 (J-GAAP): FY2023 y FY2024', editor: 'Daikin Industries, Ltd.', tipo: 'Primaria', fecha: '2024-05-13', url: u('t24q4') },
  { id: 4, titulo: 'Brief Report on the Settlement of Accounts (Consolidated) for the Business Year Ended March 31, 2022 (J-GAAP): FY2021 y FY2022', editor: 'Daikin Industries, Ltd.', tipo: 'Primaria', fecha: '2022-05-12', url: u('t22q4') },
  { id: 5, titulo: 'Presentation of Financial Results for FY2025 and FUSION 30 (análisis del beneficio operativo, previsión de FY2026)', editor: 'Daikin Industries, Ltd.', tipo: 'Primaria', fecha: '2026-05-12', url: u('p26q4') },
  { id: 6, titulo: 'Presentation of Financial Results for the First Quarter Ended in June 2026 (regiones, efecto divisa, aranceles)', editor: 'Daikin Industries, Ltd.', tipo: 'Primaria', fecha: '2026-08-04', url: u('p27q1') },
  { id: 7, titulo: 'Transcript: FY2025 Financial Results and FUSION 30 briefing (preguntas y respuestas)', editor: 'Daikin Industries, Ltd.', tipo: 'Primaria', fecha: '2026-05-12', url: u('tr26q4') },
  { id: 8, titulo: 'Transcript: FY2026 Q1 Financial Results briefing', editor: 'Daikin Industries, Ltd.', tipo: 'Primaria', fecha: '2026-08-04', url: u('tr27q1') },
  { id: 9, titulo: 'Brief Report … Six Months Ended September 30, 2025 (J-GAAP)', editor: 'Daikin Industries, Ltd.', tipo: 'Primaria', fecha: '2025-11-06', url: u('t26q2') },
  { id: 10, titulo: 'Brief Report … Nine Months Ended December 31, 2025 (J-GAAP)', editor: 'Daikin Industries, Ltd.', tipo: 'Primaria', fecha: '2026-02-04', url: u('t26q3') },
  { id: 11, titulo: 'Brief Report … Six Months Ended September 30, 2024 (J-GAAP)', editor: 'Daikin Industries, Ltd.', tipo: 'Primaria', fecha: '2024-11-06', url: u('t25q2') },
  { id: 12, titulo: 'Brief Report … Nine Months Ended December 31, 2024 (J-GAAP)', editor: 'Daikin Industries, Ltd.', tipo: 'Primaria', fecha: '2025-02-05', url: u('t25q3') },
  { id: 13, titulo: 'Notice of Convocation of the 123rd Ordinary General Meeting of Shareholders (informe de gestión: empleados, auditor, accionistas, retribución)', editor: 'Daikin Industries, Ltd.', tipo: 'Primaria', fecha: '2026-06-03', url: u('junta123') },
  { id: 14, titulo: 'Brief Report on the Settlement of Accounts (Consolidated) for the Business Year Ended March 31, 2025 (dividendo de 330 JPY con 50 JPY conmemorativos)', editor: 'Daikin Industries, Ltd.', tipo: 'Primaria', fecha: '2025-05-13', url: u('t25q4') },
  { id: 15, titulo: 'Integrated Report 2026 (FUSION 30, D-ROIC, mercados)', editor: 'Daikin Industries, Ltd.', tipo: 'Primaria', fecha: '2026-08', url: u('ia2026') },
];

const fila = (periodo, ingresos, cv, sga, ebit, dep, fcgw, bai, imp, mino, neto, gfin, bpa, dpa, dext, acc) => ({
  periodo, ingresos, coste_ventas: cv, gastos_generales: sga, ebitda: ebit + dep + fcgw, amortizaciones: dep + fcgw, ebit,
  resultado_financiero: bai - ebit, bai, impuestos: imp, minoritarios: mino, beneficio_neto: neto, gastos_financieros: gfin,
  participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa, dpa, dpa_extraordinario: dext, acciones_diluidas: acc,
});
// Amortizaciones = depreciación (inmovilizado, intangibles y derechos de uso) + amortización del fondo de comercio (J-GAAP lo amortiza).
const cuenta = [
  fila('FY2021', 2493386, 1629250, 625513, 238623, 103543, 30050, 238543, 75797, 6496, 156249, 8791, 533.66, 160, 0, 292.8),
  fila('FY2022', 3109106, 2051767, 740987, 316350, 115378, 32684, 328056, 102786, 7560, 217709, 8824, 743.46, 200, 0, 292.8),
  fila('FY2023', 3981578, 2650102, 954443, 377032, 142728, 39496, 373384, 107941, 7688, 257754, 20293, 880.05, 240, 0, 292.9),
  fila('FY2024', 4395317, 2885644, 1117536, 392137, 169979, 45585, 385294, 115459, 9523, 260311, 44900, 888.64, 250, 0, 292.9),
  fila('FY2025', 4752335, 3125646, 1225019, 401669, 197443, 48572, 376095, 100647, 10690, 264757, 43030, 903.65, 330, 50, 293.0),
  fila('FY2026', 5015036, 3282519, 1317524, 414991, 224835, 51371, 403628, 117281, 11117, 275229, 38976, 939.14, 340, 0, 293.1),
];

const bal = (periodo, at, ac, pc, pt, fc, intg, inm, exi, cli, prov, caja, deuda, arr, pn, mino, res) => ({
  periodo, activo_total: at, activo_corriente: ac, pasivo_corriente: pc, pasivo_total: pt, fondo_comercio: fc, intangibles: intg,
  inmovilizado_material: inm, existencias: exi, clientes: cli, proveedores: prov, activos_contrato: null, pasivos_contrato: null,
  caja, deuda_financiera: deuda, arrendamientos: arr, patrimonio_neto: pn, minoritarios: mino, reservas: res,
});
const balance = [
  bal('FY2021', 3239662, 1733361, 765984, 1541167, 268684, 274077, 647410, 469396, 468330, 229746, 736098, 665835, 85375, 1665689, 30787, 1363505),
  bal('FY2022', 3823998, 2165623, 1306239, 1815888, 270467, 307821, 743364, 671461, 595076, 302621, 817619, 722430, 102384, 1969687, 35876, 1530107),
  bal('FY2023', 4303682, 2427082, 1449321, 2024587, 304331, 354123, 900944, 993383, 706315, 352647, 617663, 760589, 127039, 2235032, 40947, 1712165),
  bal('FY2024', 4880230, 2726598, 1566990, 2192927, 306627, 377099, 1134982, 1047741, 815305, 326033, 737961, 811988, 156197, 2637537, 45994, 1896173),
  bal('FY2025', 5133416, 2853654, 1543047, 2266723, 266337, 371530, 1279327, 1052866, 856542, 362158, 802663, 812293, 174556, 2801281, 61199, 2068308),
  bal('FY2026', 5809240, 3262880, 1688870, 2492702, 274767, 394774, 1464475, 1137901, 1011104, 419985, 933484, 883162, 211423, 3249840, 61884, 2252762),
];

const flu = (periodo, fo, capex, arr, adq, desinv, div, emis) => ({
  periodo, flujo_operativo: fo, capex, pagos_arrendamientos: arr, adquisiciones: adq, desinversiones: desinv, dividendos: div, recompras: 0, emision_acciones: emis, intereses_en_financiacion: 0,
});
const flujos = [
  flu('FY2021', 374691, 104971, 28085, 28915, 5329, 46721, 0),
  flu('FY2022', 245071, 114106, 27507, 45108, 14228, 49746, 0),
  flu('FY2023', 158896, 175076, 40953, 110651, 47449, 61468, 0),
  flu('FY2024', 399567, 242633, 47189, 20429, 71795, 76083, 0),
  flu('FY2025', 514450, 245985, 56073, 24727, 26170, 92192, 0),
  flu('FY2026', 465848, 209081, 64690, 55566, 25056, 90749, 0),
];

const seg = (nombre, descripcion, h) => ({ nombre, descripcion, tipo_resultado: 'EBIT', historico: h.map(([periodo, ingresos, resultado]) => ({ periodo, ingresos, resultado })) });
const A = {
  _estado: 'Completo. Cuentas de los Kessan Tanshin en inglés (J-GAAP) de FY2021 a FY2026 y del 1T FY2027; Japón no tiene XBRL en cuentas.mjs.',
  negocio: {
    segmentos: [
      seg('Aire acondicionado y refrigeración', 'Equipos residenciales, comerciales (VRV, SKY) y «applied» (enfriadoras, unidades de tratamiento de aire), servicio, filtros (AAF, Flanders), refrigeración comercial (AHT) y contenedores frigoríficos.', [
        ['FY2021', 2265255, 223110], ['FY2022', 2815099, 282404], ['FY2023', 3631923, 324452], ['FY2024', 4030828, 333303], ['FY2025', 4387234, 350987], ['FY2026', 4624148, 376991]]),
      seg('Química', 'Fluoroquímicos: gases refrigerantes, fluoropolímeros, fluoroelastómeros y química fina (semiconductores, automoción, centros de datos).', [
        ['FY2021', 173783, 11371], ['FY2022', 224647, 27301], ['FY2023', 284946, 45411], ['FY2024', 291718, 51470], ['FY2025', 288657, 46119], ['FY2026', 307464, 33089]]),
      seg('Otros', 'Hidráulica, sistemas de defensa (concentradores de oxígeno médico) y electrónica (software de diseño).', [
        ['FY2021', 56282, 4132], ['FY2022', 69360, 6647], ['FY2023', 89999, 7182], ['FY2024', 103652, 7335], ['FY2025', 106180, 4543], ['FY2026', 113610, 4925]]),
      seg('Eliminaciones', 'Ventas entre segmentos.', [
        ['FY2021', -12177, 9], ['FY2022', -15567, -3], ['FY2023', -25290, -12], ['FY2024', -30881, 28], ['FY2025', -29736, 19], ['FY2026', -30187, -13]]),
    ],
    geografias: [
      { nombre: 'Estados Unidos', peso_pct: 35.6 }, { nombre: 'Japón', peso_pct: 16.1 }, { nombre: 'Europa', peso_pct: 17.1 },
      { nombre: 'Asia y Oceanía', peso_pct: 14.2 }, { nombre: 'China', peso_pct: 9.4 }, { nombre: 'Otros (Oriente Medio, África, Latinoamérica)', peso_pct: 7.6 },
    ],
    geografias_criterio: 'origen',
    kpis: [
      { kpi: 'Cuota de Daikin en equipos residenciales con conductos de EE. UU.', valor_anterior: '≈ 20 % (1T FY2026)', valor_actual: '≈ 23 % (1T FY2027); 24 % en FY2026', variacion: '+3 pp', comentario: 'Recupera la cuota perdida en FY2024 por el cambio de refrigerante [8, 7].' },
      { kpi: 'Ventas a centros de datos en Norteamérica', valor_anterior: '≈ 23.000 M JPY (2023)', valor_actual: '≈ 100.000 M JPY (FY2026)', variacion: '×4', comentario: 'Objetivo de 300.000 M JPY o más en 2030 con un 15 % de margen [7].' },
      { kpi: 'Margen operativo del grupo', valor_anterior: '8,5 % (FY2025)', valor_actual: '8,3 % (FY2026); 9,2 % en el 1T FY2027 (10,0 % un año antes)', variacion: '−0,2 pp', comentario: 'Objetivo de FUSION 30: 10 % en el ejercicio que cierra en marzo de 2029 y más del 12 % en el de 2031 [7].' },
      { kpi: 'Ventas del negocio applied en EE. UU. (DAA), divisa local', valor_anterior: '—', valor_actual: '117 % del 1T anterior', variacion: '+17 %', comentario: 'Centros de datos y servicio; el margen bajó por aranceles, peso mexicano y desarrollo [6].' },
      { kpi: 'China (divisa local)', valor_anterior: '—', valor_actual: 'residencial 86 %, comercial 88 %, applied 87 % del 1T anterior', variacion: '−12 a −14 %', comentario: 'Crisis inmobiliaria; Daikin mantiene un margen alto concentrándose en multisplit residencial premium [6].' },
      { kpi: 'Química: ventas del 1T', valor_anterior: '59.900 M JPY', valor_actual: '77.200 M JPY', variacion: '+29 %', comentario: 'Margen operativo del 10,9 % al 14,8 % por semiconductores y cables de centros de datos [6].' },
    ],
  },
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 5228025, ebitda: 712323, ebit: 424251, beneficio_neto: 273839, bpa: 941.86, dpa: 340, dpa_extraordinario: 0, fcf: 266200, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [],
    comentario: 'Las ventas pasaron de 2,49 a 5,02 billones de JPY entre FY2021 y FY2026 (+15 % anual), con tres motores: la debilidad del yen (el dólar de 106 a 151 JPY), las compras en EE. UU. (Goodman en 2012, y desde 2023 fabricantes de unidades de tratamiento de aire y representantes de ventas para centros de datos) y el precio [1, 3, 4]. El margen operativo subió del 9,6 % de FY2021 al 10,2 % de FY2022 y desde entonces cae: 9,5 % en FY2023, 8,9 % en FY2024, 8,5 % en FY2025 y 8,3 % en FY2026 [1, 3]. Las causas, según la propia empresa: el cambio de refrigerante y el exceso de existencias en EE. UU., la competencia china en Asia, la crisis inmobiliaria china, el retraso de las bombas de calor en Europa y unos costes fijos que crecieron más que las ventas; en FY2026 los aranceles de EE. UU. costaron unos 41.000 M JPY directos, compensados con 120.500 M de precio y 81.000 M de ahorro de costes [5, 7]. En el 1T FY2027 las ventas crecieron un 17,5 % (8 % sin divisa) y el beneficio operativo un 7,6 %, con el margen del 10,0 % al 9,2 % [2, 6].',
    ajustes: 'Daikin presenta en J-GAAP: el fondo de comercio se amortiza (51.371 M JPY en FY2026, ≈ 175 JPY por acción) y va dentro del beneficio operativo; los comparables en NIIF o US GAAP no lo amortizan [1]. El EBITDA del informe es el beneficio operativo más la depreciación y la amortización del fondo de comercio. Entre el beneficio operativo y el antes de impuestos hay partidas no operativas (intereses, divisa, ajuste por hiperinflación en Turquía: +14.519 M en FY2026 y −9.023 M en FY2025) y extraordinarias (plusvalías por venta de participaciones cruzadas: 13.831 M en FY2026, 12.162 M en FY2025 y 46.259 M en FY2024; deterioros de 11.849 M en FY2026); el campo «resultado financiero» las recoge todas (beneficio antes de impuestos − beneficio operativo). Las plusvalías por venta de participaciones cruzadas se repiten cada año pero se agotarán: no se proyectan [1, 3].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '3T FY2025', ingresos: 1100160, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 119.72, vs_consenso: null },
      { periodo: '4T FY2025', ingresos: 1159111, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 266.55, vs_consenso: null },
      { periodo: '1T FY2026', ingresos: 1213821, crecimiento_pct: -3.0, crecimiento_organico_pct: null, ebitda: 184363, margen_ebitda_pct: 15.2, bpa: 278.43, vs_consenso: null },
      { periodo: '2T FY2026', ingresos: 1264977, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 271.18, vs_consenso: null },
      { periodo: '3T FY2026', ingresos: 1187531, crecimiento_pct: 7.9, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 117.61, vs_consenso: null },
      { periodo: '4T FY2026', ingresos: 1348707, crecimiento_pct: 16.4, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 272.7, vs_consenso: null },
      { periodo: '1T FY2027', ingresos: 1426810, crecimiento_pct: 17.5, crecimiento_organico_pct: 8.0, ebitda: 205489, margen_ebitda_pct: 14.4, bpa: 280.6, vs_consenso: null },
    ],
    ultima_presentacion: 'En mayo de 2026 la dirección presentó FUSION 30 reconociendo que FUSION 25 no cumplió sus objetivos de margen ni de rentabilidad sobre fondos propios pese a superar el de ventas (5,0 billones frente a 4,5): fija un margen operativo del 10 % y un ROE del 12 % para el ejercicio que cierra en marzo de 2029, y del 12 % y el 15 % para el de 2031; nombra director financiero, añade un consejero externo, liga la retribución al ROE y al D-ROIC y anuncia una recompra de 350.000 M JPY [7]. Los analistas (UBS, Nomura) preguntaron sobre todo cómo se pasa del 8 % al 13 % de margen en EE. UU. en tres años; la respuesta fue el producto «Fit» con inversor y los centros de datos, sin cifras intermedias [7]. En agosto, el 1T mostró récord de ventas y beneficio operativo, pero el margen cayó 0,8 puntos: los costes de Oriente Medio, materias primas y aranceles superaron lo previsto y la rentabilidad bajó en América (más producto barato, «Fit» por debajo de lo previsto) y Asia; la empresa mantuvo la previsión anual y prometió mejora desde el 2T con subidas de precio [6, 8]. La dirección evitó dar el margen del negocio residencial de EE. UU. y la cifra de servicios y soluciones, que dijo publicará más adelante [6].',
    confianza: 'Alta',
  },
  balance: {
    historico: balance,
    vencimientos: [],
    liquidez: 'Caja y depósitos de 925.534 M JPY a 30-jun-2026 frente a una deuda con intereses de 1.206.598 M (préstamos a corto 500.297 M y pagarés 143.382 M, que subieron 330.000 M en el trimestre para pagar la recompra de 350.000 M) [2]. En julio emitió bonos domésticos (serie 36) [2].',
    rating: 'n.d. en los documentos leídos (la dirección habla de mantener el rating actual) [7]',
    coste_deuda_pct: 3.7,
    vida_media_anios: null,
    otros_pasivos: 'Provisión de garantías de producto de 132.908 M JPY (2,7 % de las ventas), que crece con la base instalada en EE. UU. [1]. Pensiones con superávit neto (activo de 36.878 M frente a pasivo de 23.418 M) [1]. Arrendamientos de 211.423 M (las filiales extranjeras aplican NIIF 16 y ASC 842) [1]. Inversiones en valores de 199.020 M a mar-26 y 212.415 M a jun-26, sobre todo participaciones cruzadas que la empresa va vendiendo [1, 2]. Sin pasivos por compras aplazadas relevantes en el balance resumido.',
    comentario: 'La deuda neta financiera era casi nula a mar-26 (883.162 M de deuda frente a 933.484 M de caja y depósitos) y pasó a 281.064 M a jun-26 por la recompra [1, 2]. El circulante comercial (existencias + clientes − proveedores) fue del 34,5 % de las ventas en FY2026, frente al 28 % de FY2021: las existencias pasaron de 469.396 M a 1.137.901 M por la estrategia de fabricar cerca del mercado y las compras previas al cambio de refrigerante [1, 4]. Esa inmovilización es la principal palanca del nuevo indicador D-ROIC [15].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'El flujo operativo fue irregular: 158.896 M en FY2023 por la acumulación de existencias y 514.450 M en FY2025 al liberarlas [3, 1]. El capex de la tabla es solo inmovilizado material (209.081 M en FY2026); la inversión en intangibles va dentro de «otros» de inversión (unos 21.000-32.000 M al año). Daikin no separa mantenimiento y crecimiento; FUSION 30 prevé 1,3 billones de capex en cinco años (≈ 260.000 M al año, el 5 % de las ventas) y 500.000 M de compras [7]. Adquisiciones: suma de compras de filiales, aportaciones a filiales y compras de negocios. Desinversiones: ventas de valores (participaciones cruzadas) y de inmovilizado. En el 1T FY2027 compró acciones propias por 349.999 M [2].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'Deloitte Touche Tohmatsu LLC', anios_auditor: null, opinion: 'Favorable (sin salvedades en los documentos leídos)',
    comentario: null,
    senales: [],
    confianza: 'Media',
  },
  capital: {
    politica: 'Hasta FY2026, dividendo con un objetivo de rentabilidad sobre fondos propios del 3 % (DOE) y prioridad a reducir deuda [7]. Con FUSION 30 (mayo 2026): prioridad a la inversión en crecimiento, dividendo estable y creciente (360 JPY previstos en FY2027, desde 340) y recompras «flexibles y continuas»: 350.000 M JPY ejecutados de una vez en el 1T FY2027 (14,5 M de acciones, ≈ 5 % del capital) dentro de un cupo de más de 700.000 M para «recompras o compras adicionales» en cinco años, además de 500.000 M para compras ya identificadas [7, 2].',
    adquisiciones: [
      { anio: '2012', objetivo: 'Goodman Global (EE. UU., equipos residenciales con conductos)', importe: 296000, ev_ebitda: null, financiacion: 'Deuda', resultado: 'Base del negocio de EE. UU. (35,6 % de las ventas del grupo hoy); el fondo de comercio se amortiza en J-GAAP; el residencial de EE. UU. perdió cuota en FY2024 con el cambio de refrigerante y la recuperó en FY2026 (24 %) [7].' },
      { anio: '2016', objetivo: 'Flanders (EE. UU., filtros)', importe: 50700, ev_ebitda: null, financiacion: 'Caja', resultado: 'El negocio de filtros está entre los de «baja rentabilidad» que FUSION 30 quiere reestructurar [6].' },
      { anio: '2019', objetivo: 'AHT Cooling Systems (Austria, vitrinas frigoríficas)', importe: 114500, ev_ebitda: null, financiacion: 'Caja', resultado: 'La refrigeración europea también figura entre los negocios «preocupantes» que se están reestructurando [6].' },
      { anio: 'FY2023-FY2026', objetivo: 'Fabricantes de unidades de tratamiento de aire a medida (Alliance Air), representantes de ventas, empresas de instrumentación y DDC Solutions y Chilldyne (refrigeración de centros de datos) en EE. UU.', importe: 211373, ev_ebitda: null, financiacion: 'Caja y deuda', resultado: 'Las ventas a centros de datos en Norteamérica pasaron de ≈ 23.000 M (2023) a ≈ 100.000 M JPY (FY2026) [7].' },
    ],
    comentario: null,
    confianza: 'Media',
  },
  fuentes: fA,
  huecos: [
    { seccion: 'balance', campo: 'vencimientos', tipo: 'Complemento', intentos: '1) Kessan Tanshin de FY2026 y del 1T (sin nota de vencimientos); 2) convocatoria de la junta 123 (solo prestamistas principales); 3) informe integrado 2026 (sin calendario)', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'HVAC System Market: tamaño mundial de 299.280 M USD en 2025 y 407.770 M en 2030 (6,4 % anual); principales: Carrier, Daikin, Trane, LG, Midea', editor: 'MarketsandMarkets', tipo: 'Sectorial', fecha: '2025', url: 'https://www.marketsandmarkets.com/market-reports/hvac-system-market-202111288.html' },
  { id: 2, titulo: 'Global HVAC systems market seen reaching USD 250.77 B by 2032 (169.000 M USD en 2025, 5,8 % anual; Maximize Market Research)', editor: 'Refindustry', tipo: 'Sectorial', fecha: '2025', url: 'https://refindustry.com/news/market-research/global-hvac-systems-market-seen-reaching-usd-250-77b-by-2032/' },
  { id: 3, titulo: 'Integrated Report 2026: mercado de refrigeración de centros de datos 1,4 billones JPY (FY2025) → 2,7 billones (FY2030); cuota y posición por región', editor: 'Daikin Industries, Ltd.', tipo: 'Primaria', fecha: '2026-08', url: u('ia2026') },
  { id: 4, titulo: 'Transcript: Data Center Strategy briefing (ventas a centros de datos en Norteamérica; objetivo de 300.000 M JPY en 2030)', editor: 'Daikin Industries, Ltd.', tipo: 'Primaria', fecha: '2025-11-27', url: u('dc2025') },
  { id: 5, titulo: 'Presentation of Financial Results for the First Quarter Ended in June 2026', editor: 'Daikin Industries, Ltd.', tipo: 'Primaria', fecha: '2026-08-04', url: u('p27q1') },
  { id: 6, titulo: 'Transcript: FY2025 Financial Results and FUSION 30 briefing', editor: 'Daikin Industries, Ltd.', tipo: 'Primaria', fecha: '2026-05-12', url: u('tr26q4') },
  { id: 7, titulo: 'Yahoo Finance: ventas, márgenes y múltiplos de los últimos 12 meses de Carrier, Trane, Johnson Controls, Lennox, Midea, Gree, Mitsubishi Electric y Belimo (14-oct-2026)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com' },
  { id: 8, titulo: 'Ficha sectorial: componentes de climatización (HVAC) y control de edificios', editor: 'Repositorio analisis-inversion (sectores/climatizacion-hvac-2026-10-14.md)', tipo: 'Sectorial', fecha: '2026-10-14', url: 'https://github.com' },
  { id: 9, titulo: 'Goodman acquisition (presentación de la compra: mercado norteamericano de 4 billones JPY; 3.700 M USD)', editor: 'Daikin Industries, Ltd.', tipo: 'Primaria', fecha: '2012-08', url: u('goodman') },
  { id: 10, titulo: 'Brief Report on the Settlement of Accounts for the Business Year Ended March 31, 2026 (comentario por regiones)', editor: 'Daikin Industries, Ltd.', tipo: 'Primaria', fecha: '2026-05-12', url: u('t26q4') },
];
const B = {
  _estado: 'Completo con fuentes primarias de Daikin, dos estudios de mercado y Yahoo para los competidores.',
  historia: {
    resumen: 'Daikin nació en Osaka en 1924 como fabricante de tubos para radiadores de aviones (Osaka Kinzoku Kogyo) y fabricó su primer aire acondicionado en 1951; tomó el nombre actual en 1963 [3]. En los ochenta y noventa creó el sistema VRV (1982), que hoy define el aire acondicionado comercial, y salió de Japón con fábricas en Europa (Bélgica) y Asia. El salto de escala llegó con dos compras: OYL (Malasia, con McQuay) en 2006 y Goodman en EE. UU. en 2012 por 3.700 M USD [9]. Desde entonces es, por ventas, el mayor fabricante de climatización del mundo, con el 84 % de las ventas fuera de Japón. Desde 2023 compra en EE. UU. para la refrigeración de centros de datos, y en 2026 presentó FUSION 30, con objetivos de rentabilidad y recompras tras la entrada de un fondo activista [3, 6].',
    hitos: [
      { anio: '1924', hito: 'Fundación en Osaka (Osaka Kinzoku Kogyo).' },
      { anio: '1951', hito: 'Primer aire acondicionado de Japón para uso comercial.' },
      { anio: '1982', hito: 'Lanza el sistema multisplit VRV.' },
      { anio: '2006', hito: 'Compra OYL Industries (Malasia; McQuay en EE. UU.).' },
      { anio: '2012', hito: 'Compra Goodman Global por 3.700 M USD: entra en el residencial con conductos de EE. UU. [9].' },
      { anio: '2019', hito: 'Compra AHT Cooling (refrigeración comercial, Austria) por 881 M EUR.' },
      { anio: '2023-2025', hito: 'Compras para centros de datos en EE. UU. (Alliance Air, DDC Solutions, Chilldyne) [4].' },
      { anio: '2026', hito: 'FUSION 30: margen del 10 % y ROE del 12 % en 2028, recompra de 350.000 M JPY y director financiero [6].' },
    ],
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'Daikin fabrica y vende climatización en más de 170 países: equipos residenciales (split, multisplit y, en EE. UU., sistemas con conductos de Goodman y Amana), comerciales (VRV, SKY), «applied» para edificios grandes, fábricas y centros de datos (enfriadoras, unidades de tratamiento de aire), bombas de calor para calefacción y agua caliente en Europa, refrigeración comercial y de contenedores, filtros de aire, y un negocio químico de fluoropolímeros y gases refrigerantes [10, 3]. Vende a través de distribuidores e instaladores (en EE. UU., unos 190 mayoristas propios), y en applied directamente a ingenierías e hiperescaladores. Fabrica cerca de cada mercado (EE. UU., México, Europa, China, India, Tailandia) [5].',
    como_gana_dinero: 'El margen sale del equipo (margen bruto del 34,5 % en FY2026) y, cada vez más, del servicio y las soluciones (en applied de EE. UU., el 57 % de las ventas del 1T FY2027) [10, 5]. Depende del precio (subidas de 120.500 M JPY en FY2026), de la mezcla (inversores y bombas de calor frente a equipos básicos), del coste del cobre y el aluminio y del yen: el 84 % de las ventas está fuera de Japón y un yen más débil sube ventas y beneficio en JPY [6, 5]. Es estacional: el 1S (abril-septiembre, verano del hemisferio norte) concentra casi el 60 % del beneficio operativo [6]. Los costes fijos son altos (fábricas y redes de venta en cada región), así que el volumen mueve mucho el margen.',
    clientes: 'Sin cliente que supere el 10 % de las ventas [10]. En residencial y comercial vende a distribuidores e instaladores con rotación anual; en applied, a constructoras, ingenierías e hiperescaladores por proyectos. El poder de precios existe pero es limitado: en FY2026 repercutió 120.500 M JPY frente a 88.000 M de materias primas y aranceles y 57.000 M de costes fijos, y aun así el margen operativo bajó 0,2 puntos [6]. En el 1T FY2027 las subidas (25.000 M) no compensaron las materias primas (38.000 M) [5]. En China y Asia la competencia de Midea, Gree y otros fabricantes chinos limita el precio de los equipos básicos [6].',
  },
  sector: {
    definicion: 'Mercado mundial de climatización (calefacción, ventilación y aire acondicionado: equipos residenciales, comerciales y applied, con su servicio). Se usa la cifra de MarketsandMarkets (299.280 M USD en 2025, ≈ 47,4 billones JPY al cambio de hoy) porque incluye sistemas y es coherente con el tamaño de los cinco grandes; Maximize Market Research da 169.000 M USD con una definición más estrecha de equipos [1, 2]. Daikin estimaba el mercado mundial de climatización y refrigeración en 18 billones JPY en 2010 [9]. La parte que más crece es la refrigeración de centros de datos: 1,4 billones JPY en FY2025 y 2,7 billones en FY2030 según Daikin (14 % anual) [3].',
    tamano: '≈ 299.280 M USD en 2025 (≈ 47,4 billones JPY) [1]; 169.000 M USD con una definición de equipos [2]',
    unidad_serie: 'millones de JPY (USD a 158,45 JPY)',
    serie: [{ anio: '2025', tamano: 47421000 }, { anio: '2030e', tamano: 64611000 }],
    tcac_historico_pct: null, tcac_previsto_pct: 6.4, cr5_pct: null, estructura: 'Moderadamente concentrada',
    drivers: [
      { driver: 'Calor extremo y penetración del aire acondicionado (India, Sudeste Asiático, Europa)', efecto: '+', horizonte: 'Estructural', evidencia: 'India +28 % y Tailandia +28 % en divisa local en el 1T FY2027; en Europa solo el 20 % de las viviendas tienen aire acondicionado [5].' },
      { driver: 'Centros de datos e IA', efecto: '+', horizonte: 'Estructural', evidencia: 'Mercado de refrigeración de centros de datos de 1,4 a 2,7 billones JPY en 2025-2030 [3]; ventas de Daikin en Norteamérica de 23.000 M a 100.000 M JPY en dos años [4].' },
      { driver: 'Regulación de refrigerantes y eficiencia (AIM Act en EE. UU., F-gas en la UE, normas japonesas de 2027)', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'En EE. UU. el adelanto de compras antes del cambio a R-454B/R32 dejó existencias altas y un FY2026 débil en residencial [10]; en Japón, compras anticipadas en el 1T FY2027 [5].' },
      { driver: 'Vivienda e inmobiliario (tipos hipotecarios en EE. UU., crisis en China)', efecto: '−', horizonte: 'Cíclico', evidencia: 'China −12/−14 % en divisa local en el 1T FY2027 [5].' },
      { driver: 'Electrificación de la calefacción (bombas de calor)', efecto: '+/−', horizonte: 'Estructural', evidencia: 'En Europa la demanda se recupera con el gas caro tras la crisis de Oriente Medio, pero las ayudas son inestables y FUSION 25 no recuperó las inversiones en bombas de calor [10, 6].' },
      { driver: 'Aranceles de EE. UU. y costes de materias primas', efecto: '−', horizonte: 'Cíclico', evidencia: '−41.000 M JPY de efecto directo de aranceles en FY2026 y −38.000 M de materias primas en el 1T FY2027 [6, 5].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 4, justificacion: 'Cinco grandes globales (Carrier, Daikin, Trane, Midea, Gree) más LG, Samsung, Mitsubishi Electric y Johnson Controls; en equipos básicos compiten los chinos con precio (Gree con margen operativo del 16,5 %, Midea del 10 %) [7].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Distribuidores e instaladores fragmentados, pero en applied los hiperescaladores negocian proyectos grandes [4].' },
      { fuerza: 'Poder de los proveedores', intensidad: 3, justificacion: 'Cobre, aluminio, acero y compresores; Daikin fabrica sus propios compresores y refrigerantes [6].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Hacen falta redes de instaladores y servicio en cada país; los nuevos entran por compra (Bosch-JCI/Hitachi, Carrier-Viessmann) [8].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 2, justificacion: 'La refrigeración líquida directa al chip sustituye parte de la refrigeración por aire en centros de datos; Daikin compró Chilldyne y DDC para cubrirla [4].' },
    ],
    ciclo: { posicion: 'Recuperación', comentario: 'Indicadores: envíos de AHRI en EE. UU. (el residencial salió del bache del cambio de refrigerante en 2026), inicio de obra en Japón, inmobiliario chino y pedidos de centros de datos [10, 5]. En 2008-09 las ventas de Daikin cayeron un 15 %; en 2020 (FY2021), un 2,2 %, y el beneficio operativo un 10 % [8]. 2022 fue un año de precios y existencias altas, y 2024-2025 de digestión de existencias en EE. UU. y de caída en China. Hoy EE. UU. residencial se recupera despacio, China sigue a la baja, Europa mejora con el gas caro y los centros de datos crecen a doble dígito.' },
    regulacion: 'EE. UU.: la AIM Act obligó a dejar el R-410A en equipos nuevos desde el 1-ene-2025; Daikin apostó por el R32, que la competencia no usa (eligió R-454B), lo que le hizo perder cuota en 2024 y recuperarla en 2025-2026 [6]. UE: el reglamento F-gas reforzado (2024) reduce los HFC y prohíbe ciertos equipos con refrigerantes de alto potencial; la directiva de eficiencia de edificios y la ley alemana de energía de edificios favorecen las bombas de calor, aunque las ayudas han cambiado varias veces [10]. Japón: nuevas normas de eficiencia de 2027 que adelantan la renovación [5]. Aranceles de EE. UU. de 2025-2026 (en parte devueltos: +10.500 M JPY en el 1T FY2027) [5].',
    tendencias: 'Tres tendencias favorecen a Daikin: la penetración del aire acondicionado en India y Europa por el calor, la refrigeración de centros de datos (aunque allí Trane, Vertiv y Carrier tienen más cuota en EE. UU.) y el paso de equipo a servicio y soluciones, donde Daikin aún va por detrás de Trane y Johnson Controls [4, 6]. Dos le perjudican: los fabricantes chinos (Midea, Gree, Haier) ganan cuota fuera de China con precio, y la refrigeración líquida directa al chip desplaza parte de la refrigeración por aire en los centros de datos [6, 4]. El riesgo de que la IA sustituya el negocio es bajo: vende equipos físicos y servicio in situ; la IA es sobre todo una fuente de demanda.',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 10.6,
    posicion: '1.º o 2.º mundial en climatización por ventas (con Midea y Carrier); 1.º en Japón y Europa; ≈ 24 % del residencial con conductos de EE. UU. [3, 6]; cuota calculada como ventas del grupo entre el mercado de MarketsandMarkets.',
    competidores: [
      { nombre: 'Midea Group', pais: 'China', ticker: '000333.SZ', ingresos: 11018000, cuota_pct: null, margen_ebit_pct: 10.0, comentario: 'Líder en China, crece fuera (Arbonia, Teka, Clivet); precio y escala en equipos básicos [7].' },
      { nombre: 'Gree Electric', pais: 'China', ticker: '000651.SZ', ingresos: 3847800, cuota_pct: null, margen_ebit_pct: 16.5, comentario: 'Mayor fabricante de split residencial; muy rentable en China, poco presente en applied [7].' },
      { nombre: 'Carrier Global', pais: 'EE. UU.', ticker: 'CARR', ingresos: 3503000, cuota_pct: null, margen_ebit_pct: 13.1, comentario: 'Residencial y comercial en EE. UU. y bombas de calor en Europa (Viessmann) [7].' },
      { nombre: 'Trane Technologies', pais: 'Irlanda/EE. UU.', ticker: 'TT', ingresos: 3519200, cuota_pct: null, margen_ebit_pct: 19.3, comentario: 'Líder en applied comercial y centros de datos en EE. UU., con gran negocio de servicio [7].' },
      { nombre: 'Johnson Controls', pais: 'Irlanda/EE. UU.', ticker: 'JCI', ingresos: 3960500, cuota_pct: null, margen_ebit_pct: 15.9, comentario: 'Applied (York), control de edificios y servicio; vendió el residencial a Bosch [7].' },
      { nombre: 'Lennox International', pais: 'EE. UU.', ticker: 'LII', ingresos: 840100, cuota_pct: null, margen_ebit_pct: 22.9, comentario: 'Residencial y comercial ligero en Norteamérica, venta directa a instaladores [7].' },
      { nombre: 'Mitsubishi Electric', pais: 'Japón', ticker: '6503.T', ingresos: 6079000, cuota_pct: null, margen_ebit_pct: 9.3, comentario: 'Conglomerado; su climatización compite en split y VRV en Japón y Europa (cifras del grupo) [7].' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'La red de instaladores y distribuidores formados en sus equipos crea algo de inercia, pero no hay efecto de red propiamente dicho.' },
        { fuente: 'Costes de cambio', puntuacion: 2, evidencia: 'El VRV y los contratos de servicio de applied fijan al cliente durante la vida del edificio; en residencial, el instalador cambia de marca con facilidad (Daikin perdió cuota en EE. UU. en FY2024) [6].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'Marca líder en Japón y Europa, patentes de inversores, compresores y refrigerantes (R32) [3].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Escala mundial, compresores propios y fabricación local; pero los chinos son más baratos en equipos básicos y el margen de Daikin (8,3 %) está por debajo de Trane o Lennox (19-23 %) [7].' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'Redes de venta y servicio en más de 170 países, difíciles de replicar [3].' },
      ],
    },
    amenazas: 'Primero, los fabricantes chinos: con márgenes del 10-17 % y escala, Midea y Gree pueden llevar a Asia, Oriente Medio y Europa la guerra de precios que ya hay en China; probabilidad media-alta [6, 7]. Segundo, en EE. UU. residencial (el mayor mercado de Daikin), Carrier, Trane y Lennox tienen marcas y canales fuertes, y el producto premium «Fit» avanza más despacio de lo previsto (4 % de las ventas residenciales) [5]. Tercero, en centros de datos compite con Vertiv, Trane, Carrier y Schneider, que integran la refrigeración líquida; Daikin compró dos especialistas pero llega tarde [4]. El foso es real pero se refleja en volumen y cuota, no en margen.',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Lo material para Daikin son los refrigerantes y la eficiencia: los HFC tienen un potencial de calentamiento alto, y la regulación (AIM Act, F-gas) obliga a cambiar de refrigerante; Daikin fabrica refrigerantes y defiende el R32, de menor potencial, lo que le dio ventaja de coste y en 2026 cuota en EE. UU. [6]. Las bombas de calor y los inversores son parte de su oferta de descarbonización (FUSION 30: neutralidad de carbono en 2050). En química, los PFAS (fluoropolímeros) son un riesgo regulatorio en la UE y EE. UU. [3].',
    controversias: 'No se han encontrado sanciones relevantes en los documentos leídos de los tres últimos años. La pérdida extraordinaria por deterioros de FY2026 (11.849 M JPY) es contable, no una controversia [10]. El riesgo PFAS de la química fluorada está abierto (restricción en estudio en la UE).',
    confianza: 'Baja',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'sector', campo: 'cr5_pct', tipo: 'Complemento', intentos: '1) MarketsandMarkets (solo nombra a los líderes); 2) informe integrado 2026 de Daikin; 3) presentación de la compra de Goodman (cuotas de 2010)', decision: 'Omitido' },
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) informe integrado 2026; 2) sesión de sostenibilidad de enero 2026 (no descargada); 3) búsqueda web no hecha por presupuesto', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Notice of Convocation of the 123rd Ordinary General Meeting of Shareholders (candidatos, comités, accionistas, retribución de FY2026)', editor: 'Daikin Industries, Ltd.', tipo: 'Primaria', fecha: '2026-06-03', url: u('junta123') },
  { id: 2, titulo: 'Extraordinary Report: results of voting at the 123rd Ordinary General Meeting (26-jun-2026)', editor: 'Daikin Industries, Ltd.', tipo: 'Primaria', fecha: '2026-06-29', url: u('voto123') },
  { id: 3, titulo: 'Extraordinary Report: results of voting at the 122nd Ordinary General Meeting (27-jun-2025)', editor: 'Daikin Industries, Ltd.', tipo: 'Primaria', fecha: '2025-06-30', url: u('voto122') },
  { id: 4, titulo: 'Extraordinary Report: results of voting at the 121st Ordinary General Meeting (27-jun-2024)', editor: 'Daikin Industries, Ltd.', tipo: 'Primaria', fecha: '2024-06-28', url: u('voto121') },
  { id: 5, titulo: 'Transcript: FY2025 Financial Results and FUSION 30 briefing (gobierno, director financiero, retribución, recompra)', editor: 'Daikin Industries, Ltd.', tipo: 'Primaria', fecha: '2026-05-12', url: u('tr26q4') },
  { id: 6, titulo: 'Brief Report … Three Months Ended June 30, 2026 (recompra de 14.516.700 acciones por 349.997 M JPY)', editor: 'Daikin Industries, Ltd.', tipo: 'Primaria', fecha: '2026-08-04', url: u('t27q1') },
  { id: 7, titulo: 'Seeking Alpha: «Daikin Industries: Eyes On Re-Rating Potential After Activist Investor Involvement» y «New Medium-Term Program Reflects Potential Activist Influence»', editor: 'Seeking Alpha', tipo: 'Analistas', fecha: '2026-06-30', url: 'https://seekingalpha.com/api/sa/combined/DKILY.xml' },
  { id: 8, titulo: 'Brief Reports on the Settlement of Accounts FY2022-FY2026 (guía anual y resultado de cada ejercicio)', editor: 'Daikin Industries, Ltd.', tipo: 'Primaria', fecha: '2026-05-12', url: u('t26q4') },
];
const C = {
  _estado: 'Completo salvo la retribución individual del primer ejecutivo (no se publica en la convocatoria) y las operaciones de directivos (Japón no tiene registro público).',
  directivos: {
    equipo: [
      { nombre: 'Masanori Togawa', cargo: 'Presidente del consejo y CEO (consejero delegado representante)', desde: '2014', participacion_pct: null, trayectoria: 'Presidente ejecutivo desde 2014 y presidente del consejo y CEO desde 2024; dirigió FUSION 25, que superó el objetivo de ventas pero no los de margen y ROE [5]. Su reelección tuvo el 89,9 % a favor en 2025 y el 95,0 % en 2026 [3, 2].' },
      { nombre: 'Naofumi Takenaka', cargo: 'Presidente y COO (consejero delegado representante)', desde: '2024', participacion_pct: null, trayectoria: 'COO desde 2024; responsable de ejecutar FUSION 30 (margen del 10 % en 2028) [5].' },
      { nombre: 'Koichi Takahashi', cargo: 'Consejero y director financiero de hecho (contabilidad, finanzas, presupuesto)', desde: '2026', participacion_pct: null, trayectoria: 'Director general de Finanzas y Contabilidad; FUSION 30 crea el puesto de director financiero para la política de capital y las recompras [1, 5].' },
      { nombre: 'Kanwal Jeet Jawa', cargo: 'Consejero; director regional de India y África', desde: '2024', participacion_pct: null, trayectoria: 'CEO de Daikin India, el mercado que más crece del grupo (+28 % en el 1T FY2027) [1].' },
    ],
    historial_guidance: [
      { anio: 'FY2022', guia: 'Previsión inicial de beneficio operativo de 280.000 M JPY (aprox.)', real: '316.350 M', cumplida: 'Sí' },
      { anio: 'FY2023', guia: 'Beneficio operativo de 360.000 M JPY (aprox.)', real: '377.032 M', cumplida: 'Sí' },
      { anio: 'FY2024', guia: 'Beneficio operativo de 410.000 M JPY (aprox.)', real: '392.137 M', cumplida: 'No' },
      { anio: 'FY2025', guia: 'Beneficio operativo de 430.000 M JPY (aprox.)', real: '401.669 M', cumplida: 'No' },
      { anio: 'FY2026', guia: 'Beneficio operativo de 415.000 M JPY', real: '414.991 M', cumplida: 'Sí' },
      { anio: 'FUSION 25 (FY2021-FY2026)', guia: 'Ventas de 4,5 billones, margen y ROE más altos', real: 'Ventas de 5,0 billones; margen del 8,3 % y ROE del 9,1 %', cumplida: 'Parcial' },
    ],
    comentario: 'Equipo estable y de casa: Togawa lleva doce años al frente, con un relevo ordenado en 2024 (Takenaka como COO) [1]. La credibilidad en márgenes es la debilidad: dos ejercicios seguidos (FY2024 y FY2025) por debajo de la guía de beneficio y FUSION 25 sin cumplir el margen ni el ROE, lo que la propia dirección reconoce [5, 8]. FUSION 30 llega con un cambio de discurso (de crecer en ventas a rentabilidad y capital) tras la entrada de Elliott (3,0 % del capital) [1, 7]. Las cifras de guía anteriores a FY2026 son aproximadas (de los Kessan Tanshin de cada año) y se marcan como tales.',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Masanori Togawa', cargo: 'Presidente y CEO', tipo: 'Ejecutivo', desde: '2014', comisiones: 'Comité asesor de nombramientos (HRM) y de retribución (miembro)' },
      { nombre: 'Naofumi Takenaka', cargo: 'Presidente y COO', tipo: 'Ejecutivo', desde: '2024', comisiones: 'Comité de control interno (presidente)' },
      { nombre: 'Tatsuo Kawada', cargo: 'Consejero externo', tipo: 'Independiente', desde: '2016', comisiones: 'Presidente de los comités asesores de nombramientos y de retribución' },
      { nombre: 'Akiji Makino', cargo: 'Consejero externo', tipo: 'Independiente', desde: '2016', comisiones: 'Nombramientos y retribución' },
      { nombre: 'Shingo Torii', cargo: 'Consejero externo', tipo: 'Independiente', desde: '2020', comisiones: 'Nombramientos y retribución' },
      { nombre: 'Yuko Arai', cargo: 'Consejera externa', tipo: 'Independiente', desde: '2021', comisiones: 'Nombramientos y retribución' },
      { nombre: 'Gerhard Korbinian Wiesheu', cargo: 'Consejero externo', tipo: 'Independiente', desde: '2026', comisiones: '—' },
      { nombre: 'Koichi Takahashi', cargo: 'Consejero y responsable de finanzas', tipo: 'Ejecutivo', desde: '2026', comisiones: '—' },
      { nombre: 'Keiko Mori', cargo: 'Consejera ejecutiva (recursos humanos)', tipo: 'Ejecutivo', desde: '2024', comisiones: '—' },
      { nombre: 'Kanwal Jeet Jawa', cargo: 'Consejero ejecutivo (India y África)', tipo: 'Ejecutivo', desde: '2024', comisiones: '—' },
    ],
    presidente_ceo_separados: false, presidente_ejecutivo: true, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 98.1, voto_remuneracion_contra_pct: 1.7, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: 89.93,
    remuneracion_ceo: null,
    remuneracion: 'La retribución de los 13 consejeros de FY2026 sumó 1.201 M JPY: 446 M fijos, 520 M variables ligados a resultados y 234 M en opciones sobre acciones [1]. La junta de 2026 aprobó (98-99,7 % a favor) un sistema nuevo: fijo de hasta 800 M al año, bonus de hasta 1.200 M y acciones diferidas (RSU por permanencia y PSU ligadas a objetivos), con el ROE y el D-ROIC de FUSION 30 entre los indicadores [2, 5]. Daikin no publica la retribución individual del primer ejecutivo en la convocatoria. El comité de retribución lo preside un independiente y lo asesora WTW [1]. Japón no vota la retribución cada año: el voto de referencia es el de reelección del primer ejecutivo (89,9 % a favor en 2025, el más bajo de las tres últimas juntas) [3].',
    accionistas: [
      { nombre: 'The Master Trust Bank of Japan (cuenta fiduciaria)', pct: 18.4, tipo: 'Custodio (fondos y planes de pensiones)', variacion: 'n.d.' },
      { nombre: 'Custody Bank of Japan (cuenta fiduciaria)', pct: 7.3, tipo: 'Custodio', variacion: 'n.d.' },
      { nombre: 'State Street Bank and Trust 505001', pct: 3.8, tipo: 'Custodio', variacion: 'n.d.' },
      { nombre: 'Elliott International, L.P.', pct: 3.0, tipo: 'Fondo activista', variacion: 'Entrada en 2025-2026; no estaba entre los diez primeros antes' },
      { nombre: 'Sumitomo Mitsui Banking Corporation', pct: 2.4, tipo: 'Banco (participación cruzada)', variacion: 'n.d.' },
      { nombre: 'MUFG Bank', pct: 1.3, tipo: 'Banco (participación cruzada)', variacion: 'n.d.' },
      { nombre: 'Autocartera', pct: 5.0, tipo: 'Autocartera', variacion: '14,78 M de acciones a jun-26 tras la recompra de 350.000 M (0,27 M a mar-26)' },
    ],
    insiders: [],
    control_y_defensas: 'Sin accionista de control: los mayores son custodios fiduciarios y el primer inversor con nombre es Elliott, con el 3,0 % [1]. Una acción, un voto; sin blindajes conocidos. Quedan participaciones cruzadas pequeñas de bancos (SMBC 2,4 %, MUFG 1,3 %) y Daikin vende las suyas (plusvalías de 12.000-46.000 M al año) [1]. El presidente del consejo es a la vez CEO: el contrapeso son cinco consejeros externos independientes de diez (desde 2026) y los comités asesores presididos por un independiente [1, 2]. Japón no tiene registro público de operaciones de directivos.',
    alertas: [
      'Voto del 89,9 % a favor de la reelección del presidente y CEO en 2025 (el 10 % en contra es alto para Japón), que subió al 95,0 % en 2026 tras FUSION 30 [3, 2].',
      'Fondo activista (Elliott) con el 3,0 %: presiona por rentabilidad y recompras [1, 7].',
    ],
    confianza: 'Media',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'remuneracion_ceo', tipo: 'Complemento', intentos: '1) convocatoria de la junta 123 (solo totales del consejo); 2) informe integrado 2026 (política, sin cifras individuales); 3) informe de valores (yuho) en japonés, que solo da individuales por encima de 100 M: no descargado', decision: 'Omitido' },
    { seccion: 'gobierno', campo: 'insiders', tipo: 'Complemento', intentos: '1) Japón no tiene registro público de operaciones de directivos; 2) convocatoria (sin datos de operaciones); 3) Kessan Tanshin (no aplica)', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Yahoo Finance, históricos diarios de 6367.T, ^N225 y 1306.T (herramientas/bolsa.mjs)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/6367.T/history' },
  { id: 2, titulo: 'Yahoo Finance: consenso de Daikin (6367.T): BPA y ventas de FY2027 y FY2028, recomendaciones y precio objetivo', editor: 'Yahoo Finance', tipo: 'Analistas', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/6367.T/analysis' },
  { id: 3, titulo: 'Yahoo Finance: capitalización, valor empresa, márgenes, deuda, PER adelantado y estimaciones de Carrier, Trane, Johnson Controls, Lennox, Midea, Gree, Mitsubishi Electric y Belimo', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com' },
  { id: 4, titulo: 'BCE: tipos de cambio de referencia del euro (14-oct-2026: 177,39 JPY, 1,1195 USD, 7,4925 CNY, 0,9330 CHF)', editor: 'Banco Central Europeo', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml' },
  { id: 5, titulo: 'Interest Rate (JGB): bono a 10 años del 13-oct-2026, 3,019 %', editor: 'Ministerio de Finanzas de Japón', tipo: 'Primaria', fecha: '2026-10-13', url: u('mof') },
  { id: 6, titulo: 'Implied ERP by month (ERPbymonth.xlsx): 4,20 % en octubre de 2026', editor: 'A. Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 7, titulo: 'Brief Report … Three Months Ended June 30, 2026 (acciones emitidas 293,11 M y autocartera 14,78 M; balance de jun-26)', editor: 'Daikin Industries, Ltd.', tipo: 'Primaria', fecha: '2026-08-04', url: u('t27q1') },
  { id: 8, titulo: 'Brief Report for the Business Year Ended March 31, 2026 (previsión de FY2027: ventas 5,15 billones, beneficio operativo 436.000 M, neto 278.000 M; tipo de cambio 145 JPY/USD)', editor: 'Daikin Industries, Ltd.', tipo: 'Primaria', fecha: '2026-05-12', url: u('t26q4') },
  { id: 9, titulo: 'Brief Reports FY2018 y FY2020 (BPA de FY2017 a FY2020)', editor: 'Daikin Industries, Ltd.', tipo: 'Primaria', fecha: '2020-05-12', url: u('t20q4') },
  { id: 10, titulo: 'Goodman acquisition presentation (3.700 M USD; ventas de 2.050 M USD en 2011)', editor: 'Daikin Industries, Ltd.', tipo: 'Primaria', fecha: '2012-08-29', url: u('goodman') },
  { id: 11, titulo: 'Acquisition of AHT Cooling Systems (881 M EUR; ventas de 62.500 M JPY en 2017)', editor: 'Daikin Industries, Ltd.', tipo: 'Primaria', fecha: '2019-01', url: u('aht') },
  { id: 12, titulo: 'Acquisition of Flanders (430 M USD; ventas de 32.000 M JPY en 2014)', editor: 'Daikin Industries, Ltd.', tipo: 'Primaria', fecha: '2016-01', url: u('flanders') },
  { id: 13, titulo: 'Eaton Signs Agreement to Acquire Boyd Thermal (9.500 M USD, 22,5 veces el EBITDA ajustado estimado de 2026)', editor: 'Eaton (Business Wire)', tipo: 'Primaria', fecha: '2025-11-03', url: 'https://www.businesswire.com/news/home/20251103856036/en/' },
  { id: 14, titulo: 'Carrier announces portfolio transformation … to acquire Viessmann Climate Solutions (12.000 M EUR, ≈ 13 veces el EBITDA 2023 con sinergias; ≈ 17 sin ellas)', editor: 'Carrier (nota de prensa)', tipo: 'Primaria', fecha: '2023-04-25', url: 'https://www.tipranks.com/news/press-releases/carrier-announces-portfolio-transformation-to-create-global-leader-in-intelligent-climate-and-energy-solutions' },
  { id: 15, titulo: 'Schneider Electric to acquire controlling interest in Motivair (75 % por 850 M USD)', editor: 'Schneider Electric (vía prensa)', tipo: 'Prensa', fecha: '2024-10-17', url: 'https://www.rfp.wiki/cloud-computing/data-center-outsourcing-services/data-center-cooling/eaton/motivair' },
  { id: 16, titulo: 'Pentair to acquire Manitowoc Ice (EX-99.1: 1.600 M USD)', editor: 'Pentair (SEC EDGAR)', tipo: 'Primaria', fecha: '2022-03-03', url: 'https://www.sec.gov/Archives/edgar/data/77360/000007736022000008/exhibit991manitowocdefinit.htm' },
];
const id = bolsa.identificacion;
const R = (x, d = 1) => Math.round(x * 10 ** d) / 10 ** d;
const JPY = { USD: 177.39 / 1.1195, CNY: 177.39 / 7.4925, CHF: 177.39 / 0.9330, EUR: 177.39 };
const D = {
  _estado: 'Completo. Precio, rango y bolsa de bolsa.mjs; consenso y comparables de Yahoo Finance al 14-oct-2026; tipos del BCE.',
  identificacion: {
    nombre: 'Daikin Industries, Ltd.', nombre_corto: 'Daikin', ticker: '6367', isin: 'JP3481800005', mercado: 'Bolsa de Tokio (Prime)', indice_referencia: 'Nikkei 225',
    pais: 'Japón', pais_iso: 'JP', sector: 'Industria', industria: 'Productos de construcción (climatización)', sede: 'Osaka', fundacion: '1924', empleados: 104095, web: 'https://www.daikin.com',
    precio: id.precio, fecha_precio: id.fecha_precio, acciones: 278.34, capitalizacion_publicada: 6005102, free_float_pct: null,
    max_52s: id.max_52s, min_52s: id.min_52s, volumen_medio_diario: `≈ ${R(bolsa.volumen_3m.importe_dia_millones / 1000, 1).toLocaleString('es-ES')} miles de M JPY/día (3 meses)`, proximos_resultados: '2026-11-05',
  },
  consenso: {
    guidance: 'Previsión de FY2027 (12-may-2026, mantenida el 4-ago-2026): ventas de 5,15 billones JPY (+2,7 %), beneficio operativo de 436.000 M (+5,1 %; margen del 8,5 %), beneficio neto de 278.000 M (+1,0 %) y BPA de 949,32 JPY (calculado antes de la recompra), con el dólar a 145 JPY y el euro a 170; 1S: ventas de 2,61 billones y beneficio operativo de 258.000 M [8]. Plan FUSION 30: margen operativo del 10 % y ROE del 12 % en el ejercicio que cierra en marzo de 2029, y del 12 % y el 15 % en el de 2031 [8].',
    estimaciones: [
      { periodo: 'FY2027e', ingresos: 5358278, ebitda: null, ebit: null, bpa: 996.06, dpa: 360, fuente: 'Yahoo Finance, 15 analistas [2]; DPA: previsión de la empresa [8]' },
      { periodo: 'FY2028e', ingresos: 5604450, ebitda: null, ebit: null, bpa: 1150.45, dpa: null, fuente: 'Yahoo Finance, 15 analistas [2]' },
    ],
    recomendaciones: { n_analistas: 14, comprar: 5, mantener: 9, vender: 0, po_medio: 24638.15, po_min: 20700, po_max: 28800 },
    revisiones: 'Hace 90 días el consenso de BPA era de 1.003,61 JPY para FY2027 y 1.153,05 para FY2028: recortes leves del 0,8 % y el 0,2 % tras el 1T, que batió en ventas pero no en margen [2]. Una sola fuente gratuita con estimaciones completas (Yahoo Finance); MarketScreener no abrió. El precio objetivo medio (24.638 JPY, 13 analistas) supone un 14,2 % sobre el precio. Sin consenso de EBITDA comparable.',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    ...bolsa.bolsa,
    posicion_corta_pct: null,
    comentario: 'Daikin ha ido muy por detrás del mercado japonés: −2,7 % anual en cinco años frente al +18,9 % del Nikkei y el +15,9 % del TOPIX (ETF 1306), todo de precio [1]. Cotizó a 30 veces beneficios en 2021 y se desrateó con tres años de márgenes a la baja (cambio de refrigerante en EE. UU., China) [1]. En 2026 sube un 7,4 % (el Nikkei, un 34,6 %, tirado por tecnología e IA) [1]. La caída máxima en cinco años fue del 50 % y la beta mensual frente al Nikkei es baja (0,62) [1]. El 1T FY2027 (agosto) y la recompra no cambiaron la tendencia: máximo de 26.440 JPY en julio y 21.575 hoy [1].',
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: bolsa.cierres_ejercicio.filter((c) => ['FY2021', 'FY2022', 'FY2023', 'FY2024', 'FY2025', 'FY2026'].includes(c.anio)).map((c) => ({ anio: c.anio, precio_cierre: c.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: c.anio === 'FY2021' })),
    comentario: null,
    confianza: 'Alta',
  },
  comparables: {
    criterio: 'Fabricantes de climatización cotizados: los cinco rivales globales con datos completos (Carrier, Trane, Johnson Controls, Midea, Gree), Lennox (residencial de EE. UU., el mayor mercado de Daikin), Mitsubishi Electric (rival japonés, aunque conglomerado) y Belimo (componentes, solo como referencia de lo que paga el mercado por la exposición a centros de datos). Fuera LG y Samsung (conglomerados de electrónica) y Haier (electrodomésticos). Todas en JPY al cambio del BCE del 14-oct; PER de los próximos 12 meses de Yahoo (para Mitsubishi Electric, ponderado de FY2027 y FY2028).',
    empresas: [
      { nombre: 'Carrier Global', ticker: 'CARR', pais: 'US', capitalizacion: 7084729, ev_ventas: 2.57, ev_ebitda_ltm: 18.3, ev_ebitda_ntm: null, per_ntm: 16.4, crecimiento_pct: 5.7, margen_ebitda_pct: 14.0, roic_pct: 6.1, dn_ebitda: 3.57, fcf_yield_pct: 1.9 },
      { nombre: 'Trane Technologies', ticker: 'TT', pais: 'IE', capitalizacion: 16430914, ev_ventas: 4.88, ev_ebitda_ltm: 25.2, ev_ebitda_ntm: null, per_ntm: 26.7, crecimiento_pct: 9.8, margen_ebitda_pct: 19.4, roic_pct: 24.2, dn_ebitda: 0.77, fcf_yield_pct: 3.0 },
      { nombre: 'Johnson Controls', ticker: 'JCI', pais: 'IE', capitalizacion: 14631581, ev_ventas: 4.15, ev_ebitda_ltm: 24.0, ev_ebitda_ntm: null, per_ntm: 24.9, crecimiento_pct: 8.2, margen_ebitda_pct: 17.3, roic_pct: 11.3, dn_ebitda: 2.04, fcf_yield_pct: 3.2 },
      { nombre: 'Lennox International', ticker: 'LII', pais: 'US', capitalizacion: 1910353, ev_ventas: 2.65, ev_ebitda_ltm: 12.0, ev_ebitda_ntm: null, per_ntm: 13.5, crecimiento_pct: 6.0, margen_ebitda_pct: 22.1, roic_pct: 34.0, dn_ebitda: 1.68, fcf_yield_pct: 2.3 },
      { nombre: 'Midea Group', ticker: '000333.SZ', pais: 'CN', capitalizacion: 15120258, ev_ventas: 1.11, ev_ebitda_ltm: 9.8, ev_ebitda_ntm: null, per_ntm: 12.9, crecimiento_pct: 8.5, margen_ebitda_pct: 11.4, roic_pct: null, dn_ebitda: -3.24, fcf_yield_pct: null },
      { nombre: 'Gree Electric', ticker: '000651.SZ', pais: 'CN', capitalizacion: 5267550, ev_ventas: 0.70, ev_ebitda_ltm: 3.3, ev_ebitda_ntm: null, per_ntm: 7.9, crecimiento_pct: 3.8, margen_ebitda_pct: 21.0, roic_pct: null, dn_ebitda: -3.27, fcf_yield_pct: 9.3 },
      { nombre: 'Mitsubishi Electric', ticker: '6503.T', pais: 'JP', capitalizacion: 10608723, ev_ventas: 1.67, ev_ebitda_ltm: 17.0, ev_ebitda_ntm: null, per_ntm: 18.4, crecimiento_pct: 2.4, margen_ebitda_pct: 9.8, roic_pct: null, dn_ebitda: -0.99, fcf_yield_pct: 1.6 },
      { nombre: 'Belimo', ticker: 'BEAN.SW', pais: 'CH', capitalizacion: 1870861, ev_ventas: 7.99, ev_ebitda_ltm: 34.3, ev_ebitda_ntm: null, per_ntm: 34.0, crecimiento_pct: 15.0, margen_ebitda_pct: 23.3, roic_pct: 37.2, dn_ebitda: 0.10, fcf_yield_pct: 0.3 },
    ],
    comentario: null,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2025-11', objetivo: 'Boyd Thermal (refrigeración líquida)', comprador: 'Eaton', ev: R(9500 * JPY.USD, 0), ev_ventas: 5.59, ev_ebitda: 22.5, prima_pct: null, excluir: false, comentario: '9.500 M USD; múltiplo sobre el EBITDA estimado de 2026 [13].' },
      { fecha: '2024-10', objetivo: 'Motivair (refrigeración líquida; 75 %)', comprador: 'Schneider Electric', ev: R(1133 * JPY.USD, 0), ev_ventas: 5.0, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '850 M USD por el 75 % (≈ 1.133 M el 100 %); «un dígito medio» de las ventas de 2025 (5x, estimación) [15].' },
      { fecha: '2023-04', objetivo: 'Viessmann Climate Solutions (bombas de calor, calderas)', comprador: 'Carrier', ev: R(12000 * JPY.EUR, 0), ev_ventas: 3.0, ev_ebitda: 17.1, prima_pct: null, excluir: false, comentario: '12.000 M EUR; 13x con sinergias según Carrier, ≈ 17x sin ellas [14].' },
      { fecha: '2022-03', objetivo: 'Manitowoc Ice', comprador: 'Pentair', ev: R(1600 * JPY.USD, 0), ev_ventas: 5.19, ev_ebitda: 17.4, prima_pct: null, excluir: false, comentario: 'Refrigeración comercial (hielo); 1.600 M USD sobre ventas de 308 M; EBITDA estimado del ≈ 30 % [16].' },
      { fecha: '2019-01', objetivo: 'AHT Cooling Systems', comprador: 'Daikin', ev: 114500, ev_ventas: 1.83, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '881 M EUR (114.500 M JPY a 130); ventas de 62.500 M JPY en 2017 [11].' },
      { fecha: '2016-01', objetivo: 'Flanders (filtros)', comprador: 'Daikin', ev: 50700, ev_ventas: 1.58, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '430 M USD (50.700 M JPY); ventas de 32.000 M JPY en 2014 [12].' },
      { fecha: '2012-08', objetivo: 'Goodman Global', comprador: 'Daikin', ev: 296000, ev_ventas: 1.80, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '3.700 M USD (296.000 M JPY a 80); ventas de 2.050 M USD en 2011 [10].' },
    ],
    comentario: null,
    confianza: 'Media',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'bolsa', campo: 'posicion_corta_pct', tipo: 'Complemento', intentos: '1) JPX publica solo posiciones por encima del 0,5 % por gestora; 2) Yahoo (sin dato para Japón); 3) foros: hablan de crédito comprador alto, no de cortos', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Yahoo!ファイナンス 掲示板 de ダイキン工業 (6367): unos 140 mensajes del 6 al 14-oct-2026', editor: 'Yahoo! Japan Finance', tipo: 'Foros y redes', fecha: '2026-10-14', url: 'https://finance.yahoo.co.jp/quote/6367.T/forum' },
  { id: 2, titulo: 'Seeking Alpha: flujo de análisis de DKILY (09-sep-2026 «Daikin: 18 % Revenue Growth Hides An Underlying Profit Decline»; 30-jun-2026 «New Medium-Term Program Reflects Potential Activist Influence»; 17-abr-2026 «Eyes On Re-Rating Potential After Activist Investor Involvement»)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-09-09', url: 'https://seekingalpha.com/api/sa/combined/DKILY.xml' },
  { id: 3, titulo: 'Stocktwits: flujo de mensajes de DKILY (mayo-octubre 2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-07', url: 'https://api.stocktwits.com/api/2/streams/symbol/DKILY.json' },
  { id: 4, titulo: 'Kabutan: noticias de ダイキン工業 (6367) (calificaciones de analistas al alza, señales técnicas; septiembre-octubre 2026)', editor: 'Kabutan', tipo: 'Foros y redes', fecha: '2026-10-07', url: 'https://kabutan.jp/stock/news?code=6367' },
];
const E = {
  _estado: 'Completo con Yahoo! Japón (el foro con más debate), Seeking Alpha, Stocktwits y Kabutan.',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Yahoo!ファイナンス 掲示板 (Japón)', fecha: '2026-10', n_comentarios: 140, tono: 'Dividido', resumen: 'Mucho pequeño accionista atrapado desde los 30.000 JPY; unos celebran seis sesiones al alza y ven a Daikin como la gran rezagada de la IA (centros de datos); otros se quejan de la poca retribución al accionista y anuncian que se pasan a las casas comerciales; se comentan la salida del índice TOPIX Core30 y el crédito comprador alto [1].' },
      { plataforma: 'Seeking Alpha', fecha: '2026-09', n_comentarios: 3, tono: 'Dividido', resumen: 'El análisis más reciente sostiene que el crecimiento del 18 % de las ventas esconde una caída del beneficio subyacente (divisa y aranceles); los de abril y junio ven potencial de revalorización por la presión del activista y FUSION 30 [2].' },
      { plataforma: 'Stocktwits (DKILY)', fecha: '2026-09', n_comentarios: 12, tono: 'Positivo', resumen: 'Pocos mensajes y alcistas: cartera de pedidos de centros de datos, «infravalorada», compra junto a Carrier y Vertiv [3].' },
      { plataforma: 'Kabutan (Japón)', fecha: '2026-10', n_comentarios: 12, tono: 'Neutro', resumen: 'Noticias de mejoras de recomendación de casas de análisis a finales de septiembre y señales técnicas de giro; sin debate de fondo [4].' },
    ],
    temas: [
      { tema: 'Centros de datos e IA como catalizador', postura: 'Alcista', peso: 'Alto', contraste: 'Las ventas a centros de datos en Norteamérica rondan los 100.000 M JPY, el 2 % de las ventas del grupo; aunque se tripliquen en 2030 serán el 5-6 %: no bastan para mover el beneficio del grupo a corto plazo.' },
      { tema: 'Retribución al accionista escasa', postura: 'Bajista', peso: 'Medio', contraste: 'Ya no es cierto: la recompra de 350.000 M JPY (≈ 5 % del capital) se hizo en el 1T FY2027 y FUSION 30 reserva más de 700.000 M para recompras o compras; el foro no lo tiene en cuenta.' },
      { tema: 'Márgenes que no despegan (crecimiento de ventas por divisa)', postura: 'Bajista', peso: 'Medio', contraste: 'Cierto: margen operativo del 9,2 % en el 1T frente al 10,0 % un año antes; las ventas sin divisa crecieron un 8 % y el beneficio operativo un 3 %.' },
      { tema: 'Activista (Elliott) y FUSION 30', postura: 'Alcista', peso: 'Medio', contraste: 'Elliott tiene el 3,0 %; los objetivos (margen del 10 % en 2028) piden una subida de 1,7 puntos que Daikin no ha logrado en cinco años.' },
      { tema: 'Liquidez y flujos de índices (salida del TOPIX Core30, precio por acción alto)', postura: 'Bajista', peso: 'Bajo', contraste: 'Afecta a flujos pasivos a corto plazo; no al valor.' },
    ],
    lectura: 'El particular japonés está cansado tras cinco años de pérdidas y divide su ánimo entre la esperanza de la IA y la queja por la retribución; no hay euforia ni capitulación. Los dos argumentos alcistas del foro (centros de datos y activista) son reales pero pequeños frente al tamaño del grupo, y el bajista más sólido (el crecimiento es divisa y el margen baja) coincide con lo que dicen las cuentas del 1T. No contradice al consenso de analistas, mayoritariamente en mantener (9 de 14).',
    confianza: 'Media',
  },
  fuentes: fE,
  huecos: [],
};

for (const [l, o] of Object.entries({ A, B, C, D, E })) guarda(l, o);
console.log('Notas A-E escritas');
