// Escribe las notas A-E de NextVision (corte 2026-10-19) a partir de los documentos de notas/docs (web de inversores de la
// empresa: MAYA devuelve 403), de bolsa.json (bolsa-corregida.mjs), de movimiento-corregido.json y de yahoo-datos.json
// (Yahoo quoteSummary del 19-oct-2026). Cuentas en MILLONES DE USD (la empresa publica en miles de USD); la acción cotiza en
// agorot (ILA, centésimas de shekel). Cada nota cita solo con [n] de su propia lista de fuentes.
// Ejecutar: node informes/nextvision-2026-10-19/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const lee = (f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const r1 = (x) => (x == null ? null : Math.round(x * 10) / 10);
const r2 = (x) => (x == null ? null : Math.round(x * 100) / 100);
const r3 = (x) => (x == null ? null : Math.round(x * 1000) / 1000);
const B = lee('bolsa.json');
const MV = lee('movimiento-corregido.json');
const Y = lee('yahoo-datos.json').datos;
const W = 'https://investor-relations.nextvision-sys.com/wp-content/uploads';
// Tipo de cambio de la fecha de corte: representativo del Banco de Israel del 19-oct-2026, 3,110 ILS por USD
// (Yahoo ILS=X a las 14:45 UTC: 3,1013). USD por agora = 1 / 311.
export const ILS_USD = 3.110;
export const USD_POR_AGORA = 1 / (ILS_USD * 100);
const usd = (agorot) => r2(agorot * USD_POR_AGORA);

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Periodic Report 2025 (informe anual con estados financieros auditados de 2025 y 2024, descripción del negocio, clientes, cartera, competencia, licencias, gobierno)', editor: 'NextVision Stabilized Systems Ltd. (traducción inglesa del informe a la ISA)', tipo: 'Primaria', fecha: '2026-03-10', url: `${W}/2025/03/Periodic_Report_2025_isa.pdf` },
  { id: 2, titulo: 'Estados financieros consolidados de 2024 (columnas 2024 y 2023), traducción inglesa', editor: 'NextVision Stabilized Systems Ltd.', tipo: 'Primaria', fecha: '2025-03', url: `${W}/2025/03/NextVision-FS-2024-%D7%92%D7%A8%D7%A1%D7%94-%D7%9C%D7%AA%D7%A8%D7%92%D7%95%D7%9D-V5-2.pdf` },
  { id: 3, titulo: 'Informe anual 2022 (hebreo; estados financieros de 2022 y 2021)', editor: 'NextVision Stabilized Systems Ltd. (ISA/TASE)', tipo: 'Primaria', fecha: '2023-03', url: `${W}/2025/03/%D7%93%D7%95%D7%97_%D7%A9%D7%A0%D7%AA%D7%99_%D7%9E%D7%A2%D7%95%D7%93%D7%9B%D7%9F_2022_isa.pdf` },
  { id: 4, titulo: 'Informe del consejo y estados financieros intermedios a 30-jun-2026 (1S26), traducción inglesa', editor: 'NextVision Stabilized Systems Ltd.', tipo: 'Primaria', fecha: '2026-08-10', url: `${W}/2026/05/ENG_-_Clean_ENG_isa.pdf` },
  { id: 5, titulo: 'Estados financieros intermedios a 31-mar-2026 (1T26), traducción inglesa', editor: 'NextVision Stabilized Systems Ltd.', tipo: 'Primaria', fecha: '2026-05-10', url: `${W}/2026/05/Q126_ENG_v4_isa.pdf` },
  { id: 6, titulo: 'Estados financieros intermedios a 30-sep-2025 (9M25), traducción inglesa', editor: 'NextVision Stabilized Systems Ltd.', tipo: 'Primaria', fecha: '2025-11-10', url: `${W}/2025/03/ENG_Q3_2025_isa.pdf` },
  { id: 7, titulo: 'Presentación a inversores de agosto de 2026 (resultados del 2T26, objetivo de ingresos de 355 M USD, cartera, capacidad)', editor: 'NextVision Stabilized Systems Ltd.', tipo: 'Primaria', fecha: '2026-08-10', url: `${W}/2026/08/Agu2026_En_isa.pdf` },
  { id: 8, titulo: 'Presentación a inversores de marzo de 2026 (resultados de 2025, cartera de 288 M USD por año de entrega)', editor: 'NextVision Stabilized Systems Ltd.', tipo: 'Primaria', fecha: '2026-03-10', url: `${W}/2026/03/NextVision_March2026_En_isa.pdf` },
  { id: 9, titulo: 'Informe inmediato: actualización del objetivo de crecimiento de 2026 (hebreo)', editor: 'NextVision Stabilized Systems Ltd. (ISA/TASE)', tipo: 'Primaria', fecha: '2026-08-09', url: `${W}/2026/08/%D7%93%D7%99%D7%95%D7%95%D7%97_%D7%9E%D7%99%D7%99%D7%93%D7%99_-_%D7%A2%D7%93%D7%9B%D7%95%D7%9F_%D7%99%D7%A2%D7%93_%D7%A6%D7%9E%D7%99%D7%97%D7%94_isa.pdf` },
  { id: 10, titulo: 'Nota de precio de la oferta global de septiembre de 2025 (9,5 M de acciones nuevas a 146 ILS)', editor: 'NextVision Stabilized Systems Ltd.', tipo: 'Primaria', fecha: '2025-09-16', url: `${W}/2025/09/Project-Noa-Pricing-Press-Release-Draft-9.16.2025-005.pdf` },
  { id: 11, titulo: 'Presentación a inversores de noviembre de 2025 (objetivo de ingresos de 2025: 160 M USD)', editor: 'NextVision Stabilized Systems Ltd.', tipo: 'Primaria', fecha: '2025-11-10', url: `${W}/2025/11/NextVisionPresentation_Nov2025_En.pdf` },
];

// Cuenta de resultados [1, 2, 3] en millones de USD. gastos_generales = comerciales + administración (I+D aparte, dentro del EBIT).
// 2021: 221 mil USD de gastos de la salida a bolsa dentro de administración (no recurrentes).
// DPA = dividendos pagados en el año ÷ acciones básicas medias (la empresa paga una vez al año, en marzo, sobre el beneficio del año anterior).
const fila = (periodo, ingresos, coste, gg, idi, amort, rfi, rfg, imp, bn, bpa, dpa, acc, nr = null) => {
  const ebit = r3(ingresos - coste - gg - idi);
  return { periodo, ingresos, coste_ventas: coste, gastos_generales: gg, ebitda: r3(ebit + amort), amortizaciones: amort, ebit, resultado_financiero: r3(rfi - rfg), bai: r3(ebit + rfi - rfg), impuestos: imp, minoritarios: 0, beneficio_neto: bn, gastos_financieros: rfg, participadas_en_ebitda: null, no_recurrentes_en_ebitda: nr, bpa, dpa, dpa_extraordinario: 0, acciones_diluidas: acc };
};
const cuenta = [
  fila('2021', 15.033, 5.621, 2.344, 0.701, 0.459, 0.091, 0.147, 0.569, 5.742, 0.0727, 0.018, 79.0, 0.221),
  fila('2022', 26.049, 8.790, 3.408, 0.988, 0.573, 1.236, 0.562, 2.388, 11.149, 0.1407, 0.036, 79.2),
  fila('2023', 51.944, 16.327, 4.889, 2.002, 1.012, 3.233, 0.079, 4.308, 27.572, 0.3411, 0.070, 80.85),
  fila('2024', 114.934, 32.044, 7.369, 2.517, 1.142, 4.330, 0.430, 10.508, 66.396, 0.8024, 0.173, 82.75),
  fila('2025', 168.354, 50.798, 10.541, 5.491, 2.317, 13.453, 0.313, 11.000, 103.664, 1.1064, 0.395, 93.69),
];
// LTM a 30-jun-2026 = 2025 − 1S25 + 1S26 [1, 4]: ingresos 168,354 − 73,243 + 155,541; EBIT 101,524 − 45,210 + 90,153;
// D&A 2,317 − 1,152 + 1,125; beneficio 103,664 − 43,796 + 91,911; BPA 1,1064 − 0,522 + 0,968; FCF = flujo operativo
// (63,640 − 16,314 + 75,157 = 122,483) − inmovilizado y desarrollo (2,836 − 1,345 + 2,564 = 4,055) − arrendamientos ≈ 0,25.
const ltm = { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 250.652, ebitda: 148.757, ebit: 146.467, beneficio_neto: 151.779, bpa: 1.552, dpa: 0.563, dpa_extraordinario: 0, fcf: 118.178, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null };

const bal = (periodo, at, ac, pc, pt, intang, inm, ex, cl, pr, caja, arr, pn, res) => ({ periodo, activo_total: at, activo_corriente: ac, pasivo_corriente: pc, pasivo_total: pt, fondo_comercio: 0, intangibles: intang, inmovilizado_material: inm, existencias: ex, clientes: cl, proveedores: pr, activos_contrato: null, pasivos_contrato: null, caja, deuda_financiera: 0, arrendamientos: arr, patrimonio_neto: pn, minoritarios: 0, reservas: res });
// Caja = efectivo + depósitos a corto + activos financieros a valor razonable [1, 2, 3].
const balance = [
  bal('2021', 51.366, 49.839, 3.189, 3.560, 0.921, 0.206, 3.279, 2.900, 1.328, 42.835, 0.210, 47.806, 7.575),
  bal('2022', 64.265, 61.941, 7.291, 7.586, 1.739, 0.289, 5.177, 2.555, 2.606, 53.902, 0.069, 56.679, 15.886),
  bal('2023', 96.490, 93.030, 15.917, 16.556, 2.308, 0.448, 15.930, 7.473, 4.548, 68.631, 0.322, 79.934, 37.857),
  bal('2024', 159.156, 154.265, 20.866, 21.464, 3.628, 0.749, 22.386, 6.374, 5.842, 122.611, 0.111, 137.692, 90.451),
  bal('2025', 646.565, 637.993, 26.746, 30.875, 4.896, 0.906, 53.588, 12.087, 8.679, 562.297, 3.390, 615.690, 160.907),
];
const flu = (periodo, fo, capex, arr, div, em) => ({ periodo, flujo_operativo: fo, capex, pagos_arrendamientos: arr, adquisiciones: 0, desinversiones: 0, dividendos: div, recompras: 0, emision_acciones: em, intereses_en_financiacion: 0 });
// Capex = inmovilizado material + desarrollo capitalizado [1, 2, 3].
const flujos = [
  flu('2021', 4.467, 0.797, 0.152, 1.369, 38.207),
  flu('2022', 15.603, 1.287, 0.186, 2.855, 0.056),
  flu('2023', 21.798, 1.444, 0.272, 5.574, 0.055),
  flu('2024', 68.413, 2.401, 0.342, 13.786, 2.389),
  flu('2025', 63.640, 2.836, 0.414, 33.198, 402.101),
];
const trim = (p, ing, g, ebitda, bpa) => ({ periodo: p, ingresos: ing, crecimiento_pct: g, crecimiento_organico_pct: g, ebitda, margen_ebitda_pct: r1(ebitda / ing * 100), bpa, vs_consenso: null });
const A = {
  _estado: 'Completa. Cuentas auditadas de 2021-2025 tomadas de los informes anuales publicados en la web de inversores (MAYA, el sistema de la Autoridad de Valores de Israel, devuelve 403); intermedias del 1T26 y 1S26 revisadas por el auditor. Cifras en millones de USD (moneda funcional y de presentación). Sin deuda financiera; los arrendamientos (NIIF 16) van en «arrendamientos». La caja incluye depósitos a corto y activos financieros a valor razonable.',
  financieros: {
    cuenta, ltm,
    cambios_perimetro: [],
    comentario: 'Las ventas pasaron de 15,0 M USD en 2021 a 168,4 M en 2025 (TCAC del 85 %) y a 250,7 M en los 12 meses a junio de 2026; el 1S26 creció un 112 % (155,5 M frente a 73,2 M) [1, 4]. Todo es crecimiento orgánico de un solo producto: cámaras estabilizadas de día y noche (gimbals EO/IR) para drones pequeños, vendidas a fabricantes de drones (≈ 95 % de las ventas) [1]. El margen bruto pasó del 62,6 % de 2021 al 72,1 % de 2024 y bajó al 69,8 % en 2025 y al ≈ 65 % en el 2T26 por la mezcla y el volumen; el objetivo de la empresa es del 65-72 % [1, 4, 7]. El margen EBITDA fue del 61,7 % en 2025 y del 58,7 % en el 1S26 [1, 4]. El beneficio neto incluye unos ingresos financieros altos por la caja de la ampliación de 2025 (13,5 M en 2025 y 12,3 M en el 1S26) y un impuesto bajo (≈ 10-12 %: empresa tecnológica preferente) [1, 4].',
    ajustes: 'Sin ajustes al resultado: no hay amortización de intangibles comprados, deterioros ni reestructuración. Únicos no recurrentes: 0,221 M USD de gastos de la salida a bolsa en 2021. Los pagos en acciones (opciones a empleados y directivos) son gasto dentro del EBIT. El BPA es el diluido publicado; el de 2025 se diluye por las 9,5 M de acciones nuevas de septiembre de 2025 [10].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      trim('1T25', 36.163, null, 22.778, 0.2466),
      trim('2T25', 37.080, null, 23.584, 0.2754),
      trim('3T25', 47.290, 62.3, 28.871, 0.3280),
      trim('4T25', 47.821, 56.7, 28.609, 0.2566),
      trim('1T26', 67.389, 86.3, 38.911, 0.4034),
      trim('2T26', 88.152, 137.7, 52.368, 0.5646),
    ],
    ultima_presentacion: 'Trimestres naturales. EBITDA = resultado de explotación + amortizaciones (repartidas por igual dentro de cada semestre: estimación propia); BPA diluido publicado (2T25 y 4T25 por diferencia de acumulados) [4, 5, 6, 1]. En el 2T26 (10-ago-2026) las ventas fueron de 88,2 M USD (+138 %) y el beneficio de 53,6 M; la empresa subió el objetivo de ingresos de 2026 por segunda vez, de 315 a 355 M USD (era de 275 M en enero), con un margen bruto del ≈ 65 % (≈ 72 % un año antes) y una cartera de pedidos que bajó de 288,0 M (10-mar) a 265,2 M (9-ago) [4, 7, 9]. El 3T25 y el 4T25 crecieron un 62 % y un 57 %. No hay consenso trimestral publicado con el que comparar.',
    confianza: 'Alta',
  },
  balance: {
    historico: balance,
    vencimientos: [],
    liquidez: 'Caja, depósitos y activos financieros de 591,5 M USD a 30-jun-2026 (20,3 M de efectivo y 571,1 M de depósitos y activos financieros), sin deuda ni líneas de crédito dispuestas; arrendamientos de 5,2 M [4]. La caja viene sobre todo de la oferta global de septiembre de 2025: 9,5 M de acciones nuevas a 146 ILS (≈ 414 M USD brutos) [10].',
    rating: 'Sin calificación crediticia (no tiene deuda)',
    coste_deuda_pct: null,
    vida_media_anios: null,
    otros_pasivos: 'Anticipos de clientes dentro de otras cuentas a pagar: 34,1 M USD a 30-jun-2026 [4]. Sin litigios relevantes [1]. Compromisos de compra con proveedores por los pedidos en curso.',
    comentario: 'Balance de caja neta: 591,5 M USD a junio de 2026, el 10 % de la capitalización [4]. El circulante comercial (existencias + clientes − proveedores) es alto y crece: 33,9 % de las ventas en 2025 (57,0 M) y 89,9 M a junio de 2026 (35,9 % de las ventas de 12 meses), porque la empresa compra componentes por adelantado (sensores térmicos, placas) para asegurar el suministro y el plazo [1, 4]. Las existencias pasaron de 22,4 M en 2024 a 53,6 M en 2025 y 71,7 M en junio de 2026; los clientes, de 12,1 M a 40,5 M en seis meses [4]. Los anticipos de clientes (34,1 M) compensan parte. El patrimonio (671,9 M en junio de 2026) es casi todo caja más circulante [4].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'El flujo operativo fue de 63,6 M USD en 2025 frente a un beneficio de 103,7 M: el circulante consumió ≈ 45 M (existencias +31 M) [1]. En el 1S26 el flujo operativo subió a 75,2 M con 91,9 M de beneficio [4]. La inversión es mínima: 2,8 M en 2025 (1,7 % de las ventas, inmovilizado y desarrollo capitalizado) y 2,6 M en el 1S26 [1, 4]; la nueva nave y la planta europea se alquilan. El flujo libre de los 12 meses a junio de 2026 es de ≈ 118 M USD. Los dividendos (33,2 M en 2025 y 51,8 M en marzo de 2026, 0,563 USD por acción) siguen la política de repartir hasta el 50 % del beneficio [1, 4]. La emisión de 2025 (402 M netos) es la oferta global; no hay recompras.',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'Ziv Haft (BDO Israel)', anios_auditor: null, opinion: 'Favorable (sin salvedades) en 2025 [1]',
    comentario: 'Cuentas sencillas y limpias: ingresos por venta de producto reconocidos en la entrega, sin compras de empresas, sin deuda y sin ajustes al beneficio [1]. Lo que hay que vigilar es el circulante: existencias y clientes crecen más deprisa que las ventas (circulante del 23 % de las ventas en 2023, 20 % en 2024, 34 % en 2025 y 36 % en junio de 2026), y el flujo operativo de 2025 fue el 61 % del beneficio [1, 4]. La empresa lo explica por compras anticipadas de componentes ante la escasez de sensores; los anticipos de clientes (34,1 M) lo compensan en parte [4]. Concentración: un proveedor (placas electrónicas) es el 57,9 % de las compras de 2025 [1]. El ingreso financiero (13,5 M en 2025, 8 % del beneficio antes de impuestos) depende de la caja y de los tipos.',
    senales: [
      { senal: 'Circulante creciendo más que las ventas', nivel: 'Media', comentario: 'Existencias + clientes − proveedores: 20 % de las ventas en 2024, 34 % en 2025, 36 % en junio de 2026 [1, 4].' },
      { senal: 'Flujo operativo por debajo del beneficio', nivel: 'Media', comentario: '63,6 M frente a 103,7 M en 2025; 75,2 M frente a 91,9 M en el 1S26 [1, 4].' },
      { senal: 'Margen bruto a la baja', nivel: 'Media', comentario: 'Del 72,1 % (2024) al 69,8 % (2025) y ≈ 65 % (2T26) [1, 4].' },
      { senal: 'Dependencia de un proveedor', nivel: 'Media', comentario: 'Proveedor A (placas electrónicas) = 57,9 % de las compras de 2025 [1].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Dividendo de hasta el 50 % del beneficio anual (0,563 USD por acción pagados en marzo de 2026 sobre el beneficio de 2025) [1, 4]. Sin recompras. La caja de la oferta de 2025 se destina, según la empresa, a capacidad de producción (planta europea, nave nueva de ≈ 5.000 m²), inventario estratégico y posibles compras de empresas o tecnología [10, 7].',
    adquisiciones: [],
    comentario: 'La empresa ha crecido sin comprar empresas y con muy poca inversión: 2,8 M USD de capex en 2025 para 168 M de ventas [1]. La gran decisión de capital fue la oferta global de septiembre de 2025 (≈ 414 M USD a 146 ILS): diluyó un ≈ 11,6 % cuando la acción cotizaba a ≈ 3,5 veces menos que el máximo de marzo de 2026 y dejó 591,5 M de caja sin destino concreto, que hoy rinde ≈ 4 % [10, 4]. Desde entonces la empresa reparte la mitad del beneficio y no recompra pese a la caída del 52 % desde el máximo, mientras los fundadores venden [P1]. Ninguna compra anunciada en 12 meses; la dirección de desarrollo corporativo (Danielle Alexandrov) sugiere que se buscan [1].',
    confianza: 'Media',
  },
  negocio: {
    segmentos: [
      { nombre: 'Cámaras estabilizadas para drones y plataformas terrestres', descripcion: 'Un solo segmento operativo: cámaras de día y noche (térmicas sin refrigerar y refrigeradas) estabilizadas en gimbal, ordenador de vídeo TRIP y software de seguimiento e IA a bordo, para drones pequeños y medianos, municiones merodeadoras, robots terrestres y vehículos.', tipo_resultado: 'EBIT', historico: [{ periodo: '2023', ingresos: 51.944, resultado: 28.726 }, { periodo: '2024', ingresos: 114.934, resultado: 73.004 }, { periodo: '2025', ingresos: 168.354, resultado: 101.524 }] },
    ],
    geografias: [{ nombre: 'Europa', peso_pct: 56.3 }, { nombre: 'Norteamérica', peso_pct: 29.2 }, { nombre: 'Israel', peso_pct: 10.6 }, { nombre: 'Resto del mundo', peso_pct: 3.9 }],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Ventas (M USD)', valor_anterior: '114,9 (2024)', valor_actual: '168,4 (2025)', variacion: '+46 %', comentario: '1S26: 155,5 (+112 %); objetivo 2026: 355 [1, 4, 9].' },
      { kpi: 'Margen bruto', valor_anterior: '72,1 %', valor_actual: '69,8 %', variacion: '−2,3 pp', comentario: '≈ 65 % en el 2T26; objetivo 65-72 % [1, 4].' },
      { kpi: 'Cartera de pedidos (M USD)', valor_anterior: '217,8 (31-dic-25)', valor_actual: '265,2 (9-ago-26)', variacion: '+22 %', comentario: '288,0 M el 10-mar-26: bajó en el 2T; 110,4 M un año antes [1, 7].' },
      { kpi: 'Clientes activos', valor_anterior: '154 (1S25)', valor_actual: '150 (1S26)', variacion: '−3 %', comentario: '204 clientes en 38 países en 2025 [1, 4].' },
      { kpi: 'Peso de los tres mayores clientes', valor_anterior: '46,5 % (2025)', valor_actual: '65,9 % (1S26)', variacion: '+19 pp', comentario: 'A 26,7 %, B 20,6 %, C 18,6 % en el 1S26 [1, 4].' },
      { kpi: 'Capacidad (cámaras al mes)', valor_anterior: '≈ 2.000-2.400', valor_actual: 'plan > 4.000-5.000 a final de 2026', variacion: '≈ ×2', comentario: 'Planta europea y nave nueva [7].' },
    ],
    clientes: 'Concentración alta y creciente: en el 1S26 el cliente A fue el 26,7 % de las ventas, el B el 20,6 % y el C el 18,6 % (≈ 66 % los tres; 46,5 % en 2025) [4, 1]. Son fabricantes de drones europeos y norteamericanos que la empresa no nombra; ≈ 95 % de las ventas van a fabricantes (OEM) que integran la cámara en su plataforma, sin contratos a largo plazo: se vende por pedidos de semanas o meses [1]. 204 clientes en 38 países en 2025 y más de 400 a lo largo de los años [1]. Europa fue el 58 % de las ventas del 1S26 (demanda ligada a la guerra de Ucrania y al rearme europeo), Norteamérica el 27 % e Israel el 9 % [4]. Poder de precios: el margen bruto del 65-72 % muestra que el producto se cobra caro, pero la bajada del 2T26 apunta a descuentos por volumen a los grandes clientes [4, 7].',
    confianza: 'Alta',
  },
  huecos: [
    { seccion: 'trimestres', campo: 'vs_consenso de cada trimestre', tipo: 'Complemento', intentos: '1) Yahoo (solo consenso futuro); 2) Globes y Calcalist (sin cifra de consenso); 3) informes de la empresa (no lo dan)', decision: 'Se deja en null.' },
  ],
  fuentes: fA,
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Periodic Report 2025: mercado de cámaras para drones, competidores (tablas de producto), licencias de exportación, proveedores, riesgos', editor: 'NextVision Stabilized Systems Ltd.', tipo: 'Primaria', fecha: '2026-03-10', url: `${W}/2025/03/Periodic_Report_2025_isa.pdf` },
  { id: 2, titulo: 'Drone Camera Market (12.650 M USD en 2025; 14.870 M en 2026 a 54.380 M en 2034, +17,6 % anual), citado en el informe anual', editor: 'Fortune Business Insights', tipo: 'Sectorial', fecha: '2025', url: 'https://www.fortunebusinessinsights.com/drone-camera-market-115435' },
  { id: 3, titulo: 'Drone Camera Market (10.890 M USD en 2024; 110.310 M en 2033), citado en el informe anual', editor: 'Straits Research', tipo: 'Sectorial', fecha: '2025-06', url: 'https://straitsresearch.com/report/drone-camera-market' },
  { id: 4, titulo: 'Small Drones Market (21.340 M USD en 2024; 128.750 M en 2032), citado en el informe anual', editor: 'Fortune Business Insights', tipo: 'Sectorial', fecha: '2025-12', url: 'https://www.fortunebusinessinsights.com/small-drones-market-102227' },
  { id: 5, titulo: 'Defensa: ficha sectorial corta (perímetro, márgenes, comparables, mediana de PER de 19,6 veces)', editor: 'Repositorio de análisis (sectores/defensa-2026-10-15.md)', tipo: 'Sectorial', fecha: '2026-10-15', url: 'sectores/defensa-2026-10-15.md' },
  { id: 6, titulo: 'Fichas de Teledyne, AeroVironment, Elbit, Kratos, Hensoldt, Exosens, Theon, Mercury y OSI (ventas, EBITDA, consenso)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com' },
  { id: 7, titulo: 'Presentación a inversores de agosto de 2026 (capacidad, Europa, producto)', editor: 'NextVision Stabilized Systems Ltd.', tipo: 'Primaria', fecha: '2026-08-10', url: `${W}/2026/08/Agu2026_En_isa.pdf` },
  { id: 8, titulo: '«What\'s not to like about Next Vision\'s financials?» (margen, cartera, temor a la competencia)', editor: 'Globes', tipo: 'Prensa', fecha: '2026-08-11', url: 'https://en.globes.co.il/en/article-1001551935' },
];
const B_ = {
  _estado: 'Completa con límites: los competidores directos son privados (Trillium, Edge Autonomy/Octopus, Controp, Hood Tech, Micro-con, Workswell, Gremsy, Merio) y no publican cifras; las cuotas son estimaciones.',
  sector: {
    definicion: 'Mercado relevante: cámaras estabilizadas de día y noche (EO/IR) para drones pequeños y medianos, municiones merodeadoras y robots, sobre todo de uso militar y de seguridad. Se mide con el mercado de cámaras para drones de Fortune Business Insights que cita la empresa (12.650 M USD en 2025), que incluye cámaras civiles y de consumo: el nicho militar de alta gama en el que compite NextVision es una parte menor, sin cifra publicada [1, 2].',
    tamano: '12.650 M USD en 2025 (cámaras para drones, todos los usos) [2]',
    unidad_serie: 'millones de USD (Fortune Business Insights; 2027e-2028e interpolados al +17,6 % anual que prevé el estudio)',
    serie: [{ anio: '2025', tamano: 12650 }, { anio: '2026e', tamano: 14870 }, { anio: '2027e', tamano: 17487 }, { anio: '2028e', tamano: 20565 }],
    tcac_historico_pct: null, tcac_previsto_pct: 17.6, cr5_pct: null, estructura: 'Fragmentada',
    drivers: [
      { driver: 'Guerra de Ucrania y rearme europeo (drones baratos y desechables)', efecto: '+', horizonte: 'Cíclico', evidencia: 'Europa es el 56-58 % de las ventas; las ventas se multiplicaron por 11 entre 2021 y 2025 [1].' },
      { driver: 'Programas de drones de EE. UU. («Unleashing American Drone Dominance», junio de 2025)', efecto: '+', horizonte: 'Estructural', evidencia: 'Orden presidencial para comprar drones baratos a gran escala; Norteamérica es el 27-29 % de las ventas [1].' },
      { driver: 'Conflictos de Oriente Medio', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Demanda de Israel (9-11 % de las ventas) pero también riesgo para la producción en Israel [1].' },
      { driver: 'Competencia y precio (nuevos fabricantes, integración vertical de los fabricantes de drones)', efecto: '−', horizonte: 'Estructural', evidencia: 'Margen bruto del 72 % (2024) al ≈ 65 % (2T26); los inversores temen la competencia [1, 8].' },
      { driver: 'Alto el fuego o fin de la guerra de Ucrania', efecto: '−', horizonte: 'Cíclico', evidencia: 'Bajaría la urgencia de compra europea, aunque el rearme de la OTAN seguiría [P1].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Unos diez competidores principales, casi todos privados; NextVision gana en peso y tamaño por alcance [1].' },
      { fuerza: 'Poder de los clientes', intensidad: 4, justificacion: 'Tres clientes son el 66 % de las ventas del 1S26 y compran por pedidos, sin contratos largos [1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 4, justificacion: 'Un proveedor es el 58 % de las compras; los sensores térmicos están limitados por control de exportación [1].' },
      { fuerza: 'Amenaza de entrada', intensidad: 3, justificacion: 'Miniaturizar la estabilización y el sensor es difícil, pero la demanda atrae capital y fabricantes de drones que integran su propia cámara [1, 8].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 2, justificacion: 'Cámaras fijas baratas sin estabilizar en drones FPV de un solo uso; no sirven para vigilancia de largo alcance [P1].' },
    ],
    ciclo: { posicion: 'Expansión', comentario: 'El ciclo de defensa está en máximos: guerra de Ucrania en su quinto año, rearme europeo (objetivo de la OTAN del 3,5 % + 1,5 % del PIB) y programas de drones de EE. UU. [1, 5]. NextVision vende a fabricantes de drones que reciben esos pedidos, así que está al final de la cadena y amplifica el ciclo: cuando los fabricantes acumulan existencias, los pedidos de cámaras se frenan antes. La bajada de la cartera en el 2T26 es la primera señal a vigilar.' },
    regulacion: 'Las exportaciones necesitan licencia del Ministerio de Defensa de Israel (DECA) para los productos de defensa y del Ministerio de Economía para los de doble uso; la empresa dice que nunca le han denegado una licencia, pero cada pedido militar grande está sujeto a aprobación (el de 24 M USD del 6-oct-2026 lo está) [1]. Riesgos: que Israel restrinja exportaciones a ciertos países por razones políticas, que algunos países europeos limiten compras a Israel (España, Eslovenia, Países Bajos han restringido comercio de defensa) y que los sensores térmicos importados (Francia, EE. UU.) necesiten licencias de su origen [1, P1].',
    tendencias: 'Drones baratos y en masa (municiones merodeadoras, interceptores, enjambres), visión por computador e IA a bordo (seguimiento automático de objetivos, navegación sin GPS), fabricación cerca del cliente (planta europea) y exigencia de cadena de suministro «sin China» en EE. UU. y la OTAN [1, 7].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 1.3, posicion: 'Líder de nicho en cámaras estabilizadas ligeras para drones pequeños militares; cuota ≈ 1,3 % del mercado amplio de cámaras para drones (168 M de 12.650 M USD en 2025; estimación propia) [1, 2]',
    competidores: [
      { nombre: 'Trillium Engineering (privada)', pais: 'EE. UU.', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Gimbals HD25 y HD55; el competidor más citado en EE. UU. [1].' },
      { nombre: 'Edge Autonomy / Octopus (de Redwire)', pais: 'Letonia / EE. UU.', ticker: 'RDW', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Cámaras Octopus; integrada en un grupo de defensa espacial [1].' },
      { nombre: 'Controp (privada)', pais: 'Israel', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Cámaras refrigeradas de mayor tamaño [1].' },
      { nombre: 'Hood Tech Vision (privada)', pais: 'EE. UU.', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Cámaras refrigeradas y sin refrigerar [1].' },
      { nombre: 'Micro-con (privada)', pais: 'Israel', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Gimbals ligeros competidores directos en peso [1].' },
      { nombre: 'Teledyne FLIR', pais: 'EE. UU.', ticker: 'TDY', ingresos: Math.round(Y.TDY.ventas / 1e6), cuota_pct: null, margen_ebit_pct: null, comentario: 'Proveedor de sensores térmicos y fabricante de cámaras y drones pequeños; referencia cotizada [6].' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Débil',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'No hay red de usuarios [1].' },
        { fuente: 'Costes de cambio', puntuacion: 3, evidencia: 'La cámara se integra en el piloto automático y el enlace del dron (TRIP, «plug and play»); cambiarla exige recalificar la plataforma [1].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 2, evidencia: 'Patentes de estabilización hasta 2030-2031 y licencias de exportación israelíes; no impiden copiar el concepto [1].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Margen bruto del 65-72 % con 164 empleados: escala y diseño propio, pero el margen ya baja [1, 7].' },
        { fuente: 'Escala eficiente', puntuacion: 1, evidencia: 'Mercado grande y en crecimiento: caben muchos competidores [2].' },
      ],
    },
    amenazas: 'Lo que más puede erosionar la posición es la competencia en precio: el éxito (márgenes del 60 % sobre ventas) atrae a fabricantes europeos, estadounidenses y a los propios fabricantes de drones que integran su cámara, y el margen bruto ya ha bajado siete puntos [1, 8]. Segundo, la concentración: tres clientes son dos tercios de las ventas y compran sin contrato largo [1]. Tercero, los permisos: un cambio de política de exportación israelí o un veto europeo a proveedores israelíes [1].',
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'NextVision diseña y fabrica en Israel cámaras estabilizadas de día y noche muy ligeras (de decenas a pocos cientos de gramos) que se montan en drones pequeños, municiones merodeadoras, robots y vehículos, más el ordenador TRIP que procesa el vídeo con seguimiento automático e IA a bordo [1]. Fundada en 2009, salió a la bolsa de Tel Aviv en 2021; 164 empleados en marzo de 2026 [1].',
    como_gana_dinero: 'Vende cámaras a fabricantes de drones (≈ 95 % de las ventas) por pedidos sueltos, con un margen bruto del 65-72 %; los gastos de estructura son pequeños (I+D 5,5 M, comercial 1,9 M y administración 8,7 M USD en 2025), así que el margen operativo pasa del 60 % [1]. Subcontrata la fabricación de placas y compra los sensores: el capital necesario es circulante (existencias de componentes), no fábricas [1].',
  },
  huecos: [
    { seccion: 'sector', campo: 'tamaño del nicho militar de cámaras estabilizadas para drones pequeños y cuotas de los competidores', tipo: 'Complemento', intentos: '1) informe anual (la empresa dice no tener datos de cuotas: competidores privados); 2) estudios de mercado citados (solo mercado amplio de cámaras para drones); 3) prensa israelí', decision: 'Se usa el mercado amplio (12.650 M USD) y una cuota estimada.' },
  ],
  fuentes: fB,
};
guarda('B', B_);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Periodic Report 2025, parte D (consejo, directivos, remuneración, accionistas principales)', editor: 'NextVision Stabilized Systems Ltd.', tipo: 'Primaria', fecha: '2026-03-10', url: `${W}/2025/03/Periodic_Report_2025_isa.pdf` },
  { id: 2, titulo: 'Anuncio de la colocación secundaria de los fundadores (≈ 200 M USD, Jefferies, UBS, Needham; bloqueo de 90 días)', editor: 'NextVision Stabilized Systems Ltd.', tipo: 'Primaria', fecha: '2026-06-17', url: `${W}/2026/06/THIS-ANNOUNCEMENT-AND-THE-INFORMATION-CONTAINED-HEREIN-IS-RESTRICTED-AND-IS-NOT-FOR-RELEASE.pdf` },
  { id: 3, titulo: '«Next Vision founders sell shares for $200m»', editor: 'Globes', tipo: 'Prensa', fecha: '2026-06-18', url: 'https://en.globes.co.il/en/article-1001546291' },
  { id: 4, titulo: 'Presentaciones de marzo de 2024 y noviembre de 2025 (objetivos de ingresos de 2024 y 2025)', editor: 'NextVision Stabilized Systems Ltd.', tipo: 'Primaria', fecha: '2025-11-10', url: `${W}/2025/11/NextVisionPresentation_Nov2025_En.pdf` },
  { id: 5, titulo: 'Informe inmediato de actualización del objetivo de 2026 (355 M USD) y presentación de agosto de 2026', editor: 'NextVision Stabilized Systems Ltd.', tipo: 'Primaria', fecha: '2026-08-09', url: `${W}/2026/08/Agu2026_En_isa.pdf` },
  { id: 6, titulo: 'Prensa israelí sobre las ventas de los fundadores fuera de bolsa (enero de 2026, a 228 ILS) y su historial', editor: 'Calcalist (Ctech)', tipo: 'Prensa', fecha: '2026-01', url: 'https://www.calcalistech.com/ctechnews/article/mphngw37e' },
  { id: 7, titulo: '«Fidelity exits most of NextVision stake… sending shares lower»', editor: 'Dealroom', tipo: 'Prensa', fecha: '2026-10-06', url: 'https://dealroom.co/news/160236-fidelity-exits-most-of-nextvision-stake-for-425m-sending-shares-lower/' },
  { id: 8, titulo: 'NextVision execs cash in on soaring stock', editor: 'Globes', tipo: 'Prensa', fecha: '2025', url: 'https://en.globes.co.il/en/article-1001458354' },
];
const C = {
  _estado: 'Completa con límites: la parte D del informe anual da consejo, remuneración y participaciones; las ventas de los fundadores fuera de bolsa se reconstruyen con la prensa (MAYA, donde están los informes de cada operación, no abre).',
  directivos: {
    equipo: [
      { nombre: 'Chen Golan', cargo: 'Fundador y presidente ejecutivo (con contrato de gestión)', desde: '2009', participacion_pct: 4.4, trayectoria: 'Cofundador; preside el consejo y dirige la estrategia y la relación con los grandes clientes [1].' },
      { nombre: 'Michael Grosman', cargo: 'Consejero delegado', desde: '2016', participacion_pct: 0.71, trayectoria: 'Dirige las operaciones y la expansión de capacidad; cobra un bonus del 2,5 % del beneficio antes de impuestos [1].' },
      { nombre: 'Boris Kipnis', cargo: 'Cofundador, consejero y director técnico', desde: '2009', participacion_pct: 3.24, trayectoria: 'Responsable del diseño de las cámaras y del ordenador TRIP [1].' },
      { nombre: 'Alex Lavie', cargo: 'Director financiero', desde: null, participacion_pct: null, trayectoria: 'Lleva las cuentas en USD y la relación con inversores [1].' },
      { nombre: 'Liran Reller', cargo: 'Director de operaciones', desde: null, participacion_pct: null, trayectoria: 'Producción y cadena de suministro [1].' },
    ],
    historial_guidance: [
      { anio: '2024', guia: 'Objetivo de ingresos de 110 M USD (marzo de 2024)', real: '114,9 M', cumplida: 'Sí' },
      { anio: '2025', guia: 'Objetivo de ingresos de 160 M USD', real: '168,4 M', cumplida: 'Sí' },
      { anio: '2026', guia: '275 M USD (enero) → 315 M (mayo) → 355 M (agosto)', real: '155,5 M en el 1S26', cumplida: 'En curso' },
    ],
    comentario: 'El equipo ha cumplido y superado sus objetivos de ingresos tres años seguidos y ha multiplicado las ventas por 11 en cuatro años sin endeudarse [4, 5]. Los incentivos son muy fuertes a corto plazo: Golan, Kipnis y Grosman cobran cada uno un bonus del 2,5 % del beneficio antes de impuestos (7,5 % entre los tres), lo que en 2025 dio una remuneración de 9,9 M ILS a Grosman y 5,7 M a cada uno de los otros dos [1]. Eso premia vender más este año, no el margen a largo plazo ni la asignación de la caja. Los fundadores llevan años vendiendo acciones [3, 6, 8].',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Chen Golan', cargo: 'Presidente (ejecutivo)', tipo: 'Ejecutivo', desde: '2009', comisiones: '—' },
      { nombre: 'Boris Kipnis', cargo: 'Consejero y director técnico', tipo: 'Ejecutivo', desde: '2009', comisiones: '—' },
      { nombre: 'Yosef Sandler', cargo: 'Consejero (accionista fundador)', tipo: 'Dominical', desde: '2009', comisiones: '—' },
      { nombre: 'Nachman Benchaya', cargo: 'Consejero (inversor inicial)', tipo: 'Dominical', desde: '2011', comisiones: '—' },
      { nombre: 'Tamar Landa', cargo: 'Consejera', tipo: 'Independiente', desde: '2021', comisiones: 'Auditoría; Remuneración' },
      { nombre: 'Rita Baal Taxa', cargo: 'Consejera externa', tipo: 'Independiente', desde: '2021', comisiones: 'Auditoría; Remuneración' },
      { nombre: 'Sarit Cohen', cargo: 'Consejera externa', tipo: 'Independiente', desde: '2021', comisiones: 'Auditoría; Remuneración' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: true, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: true, variable_ligado_rentabilidad: false, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 2.88, fijo: null, variable_corto: null, variable_largo: null, ratio_salario_medio: null },
    remuneracion: 'Coste total de 2025 (informe anual, en ILS): Grosman 9,90 M ILS (≈ 2,9 M USD), Golan y Kipnis 5,74 M ILS cada uno (≈ 1,7 M USD) [1]. Casi todo es el bonus del 2,5 % del beneficio antes de impuestos de cada uno, sin objetivos de margen, de rentabilidad sobre el capital ni de plazo largo: es variable ligado al beneficio del año, no a la rentabilidad del accionista [1]. Los contratos de gestión de los fundadores son operaciones vinculadas aprobadas por la junta [1].',
    accionistas: [
      { nombre: 'Yosef Sandler (fundador)', pct: 6.02, tipo: 'Internos', variacion: 'Vendió 1 M de acciones en enero de 2026 [6]' },
      { nombre: 'Menora Mivtachim', pct: 5.92, tipo: 'Institucional', variacion: 'Informe anual 2025' },
      { nombre: 'Harel', pct: 5.2, tipo: 'Institucional', variacion: 'Informe anual 2025' },
      { nombre: 'Migdal', pct: 5.1, tipo: 'Institucional', variacion: 'Informe anual 2025' },
      { nombre: 'Chen Golan (presidente)', pct: 4.4, tipo: 'Internos', variacion: 'Antes de la colocación de junio de 2026 [1, 2]' },
      { nombre: 'FMR (Fidelity)', pct: 4.0, tipo: 'Institucional', variacion: 'Del 9,9 % al ≈ 4 % el 5-oct-2026 [7]' },
      { nombre: 'Boris Kipnis (director técnico)', pct: 3.24, tipo: 'Internos', variacion: '6,59 % de los votos; vendió en junio de 2026 [1, 2]' },
      { nombre: 'Nachman Benchaya', pct: 1.91, tipo: 'Internos', variacion: 'Vendió en junio de 2026 [2]' },
    ],
    insiders: [
      { fecha: '2026-06-18', persona: 'Golan, Grosman, Kipnis y Benchaya (colocación conjunta)', operacion: 'Venta', acciones: 2030000, importe: 200 },
      { fecha: '2026-01-11', persona: 'Yosef Sandler (consejero fundador)', operacion: 'Venta', acciones: 1000000, importe: 71.5 },
      { fecha: '2026-01-11', persona: 'Chen Golan (presidente)', operacion: 'Venta', acciones: 416667, importe: 29.8 },
      { fecha: '2026-01-11', persona: 'Michael Grosman (consejero delegado)', operacion: 'Venta', acciones: 350878, importe: 25.1 },
    ],
    control_y_defensas: 'Sin accionista de control: el bloque de fundadores (Sandler, Golan, Kipnis, Benchaya, Grosman) suma ≈ 15 % antes de la colocación de junio de 2026 y las aseguradoras israelíes (Menora, Harel, Migdal) ≈ 16 % [1]. Una acción, un voto (salvo acciones con más voto de Kipnis por un acuerdo de voto: 6,59 % de los votos). Tres consejeros independientes de siete; el presidente es ejecutivo y fundador [1].',
    alertas: [
      'Ventas de los fundadores en serie: bloques fuera de bolsa desde 2023, 1,77 M de acciones (≈ 126 M USD) en enero de 2026 a 228 ILS y una colocación de ≈ 200 M USD en junio de 2026, con «monetización parcial» y «liquidez» como únicos motivos declarados; el bloqueo de 90 días venció a mediados de septiembre [2, 3, 6].',
      'Fidelity, el mayor institucional extranjero, vendió el 5,5 % del capital fuera de bolsa el 5-oct-2026 con descuento (por un cambio de política del fondo, según fuentes de la operación) [7].',
      'Bonus del 2,5 % del beneficio antes de impuestos para cada uno de los tres ejecutivos fundadores: incentivo a corto plazo [1].',
    ],
    confianza: 'Media',
  },
  huecos: [
    { seccion: 'gobierno', campo: 'participaciones de los fundadores tras la colocación de junio de 2026 y votos de la junta', tipo: 'Complemento', intentos: '1) MAYA (403); 2) web de inversores (sin informes de tenencias); 3) Globes y Calcalist (no dan cifras por persona)', decision: 'Se dan las de marzo de 2026 y se dice.' },
  ],
  fuentes: fC,
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de NXSN.TA, ^TA125.TA e ITA (corregida la unidad de NXSN: ILS hasta el 15-may-2026, agorot después): bolsa-corregida.mjs', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/NXSN.TA/history' },
  { id: 2, titulo: 'Consenso de NXSN y comparables (BPA y ventas 2026-2027, objetivos, recomendaciones; precio de cierre del 19-oct-2026, 14:29 UTC): quoteSummary', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/NXSN.TA/analysis' },
  { id: 3, titulo: 'Tipo de cambio representativo ILS/USD (3,110 el 19-oct-2026; cierres de 2023-2025)', editor: 'Banco de Israel', tipo: 'Primaria', fecha: '2026-10-19', url: 'https://www.boi.org.il/en/economic-roles/financial-markets/exchange-rates/' },
  { id: 4, titulo: 'Daily Treasury Par Yield Curve Rates 2026 (10 años: 5,09 % el 16-oct-2026)', editor: 'U.S. Department of the Treasury', tipo: 'Primaria', fecha: '2026-10-16', url: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates' },
  { id: 5, titulo: 'Implied ERP by month (ERPbymonth.xlsx): octubre de 2026, 4,20 %', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 6, titulo: '«NextVision shares plunge… Fidelity sale» (−12,7 % el 6-oct y −11,4 % el 7-oct)', editor: 'Calcalist (Ctech)', tipo: 'Prensa', fecha: '2026-10-07', url: 'https://www.calcalistech.com/ctechnews/article/u0r0myniq' },
  { id: 7, titulo: '«Fidelity exits most of NextVision stake…» (5,5 % del capital, ≈ 4 % restante)', editor: 'Dealroom', tipo: 'Prensa', fecha: '2026-10-06', url: 'https://dealroom.co/news/160236-fidelity-exits-most-of-nextvision-stake-for-425m-sending-shares-lower/' },
  { id: 8, titulo: '«What\'s not to like about Next Vision\'s financials?» (−7 % tras el 2T26)', editor: 'Globes', tipo: 'Prensa', fecha: '2026-08-11', url: 'https://en.globes.co.il/en/article-1001551935' },
  { id: 9, titulo: 'Anuncio de la colocación secundaria de los fundadores', editor: 'NextVision Stabilized Systems Ltd.', tipo: 'Primaria', fecha: '2026-06-17', url: `${W}/2026/06/THIS-ANNOUNCEMENT-AND-THE-INFORMATION-CONTAINED-HEREIN-IS-RESTRICTED-AND-IS-NOT-FOR-RELEASE.pdf` },
  { id: 10, titulo: 'Informes inmediatos de pedidos: 24 M USD (6-oct-2026, entrega ene-jun 2027, pendiente de aprobación regulatoria), 3,5 M (29-sep) y aprobación de 2,7 M (8-sep)', editor: 'NextVision Stabilized Systems Ltd. (ISA/TASE)', tipo: 'Primaria', fecha: '2026-10-06', url: `${W}/2026/10/150-report-061026-002.pdf` },
  { id: 11, titulo: 'Freedom Broker sube el objetivo de NextVision a 421 ILS (Comprar)', editor: 'Freedom Broker', tipo: 'Analistas', fecha: '2026-08', url: 'https://fbroker.kz/en/news/51447-freedom-broker-povysil-celevuiu-cena-izrailskoi-texnokompanii-nextvision-ru-2' },
  { id: 12, titulo: 'Entrada de NextVision en el índice TA-35', editor: 'NextVision Stabilized Systems Ltd.', tipo: 'Primaria', fecha: '2025-11', url: `${W}/2025/11/NextVision-TA35.pdf` },
  { id: 13, titulo: 'Movimiento del precio (1-12 meses, máximos, media de 200, avisos P1-P5): movimiento.mjs con la serie corregida de unidad (movimiento-corregido.mjs)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/NXSN.TA/history' },
  { id: 14, titulo: '«Tue: Next Vision soars» (16-dic-2025) y pedido de 60 M USD (Calcalist)', editor: 'Globes', tipo: 'Prensa', fecha: '2025-12-16', url: 'https://en.globes.co.il/en/article-1001529374' },
  { id: 15, titulo: 'Informe del 1S26 y presentación de agosto de 2026 (resultados, objetivo de 355 M USD, cartera)', editor: 'NextVision Stabilized Systems Ltd.', tipo: 'Primaria', fecha: '2026-08-10', url: `${W}/2026/08/Agu2026_En_isa.pdf` },
  { id: 16, titulo: 'Defensa: ficha sectorial corta (comparables y mediana de PER NTM de 19,6 veces)', editor: 'Repositorio de análisis (sectores/defensa-2026-10-15.md)', tipo: 'Sectorial', fecha: '2026-10-15', url: 'sectores/defensa-2026-10-15.md' },
  { id: 18, titulo: 'Ventas de los fundadores fuera de bolsa (enero de 2026, a 228 ILS)', editor: 'Calcalist (Ctech)', tipo: 'Prensa', fecha: '2026-01', url: 'https://www.calcalistech.com/ctechnews/article/mphngw37e' },
  { id: 17, titulo: 'Trading Securities listed on Tel Aviv Stock Exchange (TASE): acceso de clientes no residentes en Israel', editor: 'Interactive Brokers (base de conocimiento)', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://ibkb.interactivebrokers.com/fr/node/3382' },
];
const n = Y['NXSN.TA'];
const t = Object.fromEntries(n.trend.map((x) => [x.periodo, x]));
const EUR = Y['EURUSD=X'].precio;
const FX = { USD: 1, EUR };
const COMPS = [['TDY', 'Teledyne Technologies', 'US'], ['AVAV', 'AeroVironment', 'US'], ['ESLT', 'Elbit Systems', 'IL'], ['KTOS', 'Kratos Defense', 'US'], ['HAG.DE', 'Hensoldt', 'DE'], ['EXENS.PA', 'Exosens', 'FR'], ['THEON.AS', 'Theon International', 'GR'], ['MRCY', 'Mercury Systems', 'US'], ['OSIS', 'OSI Systems', 'US']];
const comps = COMPS.map(([tk, nombre, pais]) => {
  const y = Y[tk], f = FX[y.divisa];
  const tt = Object.fromEntries(y.trend.map((x) => [x.periodo, x]));
  const v0 = tt['0y']?.ventas, v1 = tt['+1y']?.ventas;
  return { nombre, ticker: tk, pais, capitalizacion: Math.round(y.cap * f / 1e6), ev_ventas: r2(y.ev / y.ventas), ev_ebitda_ltm: r1(y.ev_ebitda), ev_ebitda_ntm: null, per_ntm: r1(y.per_adelantado),
    crecimiento_pct: v0 && v1 ? r1((v1 / v0 - 1) * 100) : null, margen_ebitda_pct: r1(y.ebitda / y.ventas * 100), roic_pct: null, dn_ebitda: r1((y.ev - y.cap) / y.ebitda), fcf_yield_pct: null };
});
const perMed = (() => { const v = comps.map((x) => x.per_ntm).sort((a, b) => a - b); const k = v.length; return k % 2 ? v[(k - 1) / 2] : (v[k / 2 - 1] + v[k / 2]) / 2; })();
const hora = new Date(n.hora * 1000).toISOString().slice(11, 16);
const ACC = 92.54;
const precioUSD = usd(n.precio);
// Cierres de fin de año (ILS) con el tipo representativo del Banco de Israel de ese día [1, 3].
const CIERRES = [{ anio: '2023', fecha: '2023-12-28', ils: 29.84, fx: 3.627 }, { anio: '2024', fecha: '2024-12-31', ils: 60.44, fx: 3.647 }, { anio: '2025', fecha: '2025-12-31', ils: 209.90, fx: 3.19 }];
const mfuerte = (periodo, var_pct, causa, veredicto = 'no cambia', condicion = null) => ({ periodo, var_pct, causa, veredicto, condicion });
const noticia = (fecha, tipo, hecho, veredicto = 'no cambia', condicion = null) => ({ fecha, tipo, hecho, veredicto, condicion });
const D = {
  _estado: `Completa. Precio de cierre del 19-oct-2026 en Tel Aviv (18.790 agorot = 187,90 ILS; Yahoo a las ${hora} UTC con 15 minutos de retraso) = ${String(precioUSD).replace('.', ',')} USD con el tipo del Banco de Israel (3,110). Cifras por acción en USD (divisa de las cuentas); el motor da también el precio en agorot. Mediana del PER adelantado de los comparables: ${perMed}.`,
  _per_mediana_comparables: perMed,
  identificacion: {
    nombre: 'NextVision Stabilized Systems Ltd.', nombre_corto: 'NextVision', ticker: 'NXSN', isin: 'IL0011765935', mercado: 'Bolsa de Tel Aviv (TASE)', indice_referencia: 'TA-125 (miembro del TA-35)',
    pais: 'Israel', pais_iso: 'IL', sector: 'Industria (defensa y aeroespacial)', industria: 'Electrónica de defensa: cámaras para drones', sede: 'Ra\'anana (Israel)', fundacion: '2009', empleados: 164, web: 'https://www.nextvision-sys.com',
    precio: precioUSD, fecha_precio: '2026-10-19', acciones: ACC, capitalizacion_publicada: Math.round(n.cap / ILS_USD / 1e6), free_float_pct: 82.4,
    max_52s: usd(B.identificacion.max_52s), min_52s: usd(B.identificacion.min_52s), volumen_medio_diario: `≈ ${Math.round(B.volumen_3m.importe_dia_millones / 100 / ILS_USD)} M USD/día (3 meses; ${Math.round(B.volumen_3m.importe_dia_millones / 100)} M ILS)`, proximos_resultados: '2026-11-10',
  },
  consenso: {
    guidance: 'Objetivo de ingresos de 2026 de 355 M USD (+111 %), fijado por el consejo el 9-ago-2026 tras subirlo de 275 M (enero) a 315 M (mayo); la empresa insiste en que es un objetivo, no una previsión. Margen bruto objetivo del 65-72 % [15]. No da guía de beneficio ni de 2027.',
    estimaciones: [
      { periodo: '2026e', ingresos: Math.round(t['0y'].ventas / 1e6), ebitda: null, ebit: null, bpa: r2(t['0y'].bpa), dpa: null, fuente: `Yahoo Finance, ${t['0y'].n} analistas [2]` },
      { periodo: '2027e', ingresos: Math.round(t['+1y'].ventas / 1e6), ebitda: null, ebit: null, bpa: r2(t['+1y'].bpa), dpa: null, fuente: `Yahoo Finance, ${t['+1y'].n} analistas (rango de BPA ${String(r2(t['+1y'].bpa_min)).replace('.', ',')}-${String(r2(t['+1y'].bpa_max)).replace('.', ',')}) [2]` },
    ],
    recomendaciones: { n_analistas: n.reco.strongBuy + n.reco.buy + n.reco.hold + n.reco.sell + n.reco.strongSell, comprar: n.reco.strongBuy + n.reco.buy, mantener: n.reco.hold, vender: n.reco.sell + n.reco.strongSell, po_medio: usd(n.po_medio), po_min: usd(n.po_min), po_max: usd(n.po_max) },
    revisiones: `El BPA de 2026 del consenso subió de 1,87 USD hace 90 días a 2,18 y el de 2027 de 2,45 a 3,18 (+30 %), tras el 2T26 y la subida del objetivo a 355 M [2]. El objetivo medio (38.680 agorot ≈ 124 USD) dobla el precio, pero son solo 4 analistas, casi todos locales; Freedom Broker subió el suyo a 421 ILS [2, 11]. Los bancos de la colocación de junio (Jefferies, UBS, Needham) no publican cobertura abierta [9].`,
    base_ebitda: 'sin consenso de EBITDA (solo BPA y ventas)', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    ...B.bolsa,
    beta: B.bolsa.beta, posicion_corta_pct: null,
    comentario: 'La acción se multiplicó por siete entre finales de 2023 y finales de 2025 (+102 % en 2024 y +247 % en 2025, frente al +29 % y +51 % del TA-125) y llegó a 394 ILS en marzo de 2026; desde entonces ha caído un 52 % hasta 187,90 ILS (−10,5 % en el año frente al +11,4 % del índice) [1, 13]. Rentabilidades de precio (el TA-125 no lleva dividendos). Volatilidad anual del 63 % y caída máxima del 54 % (2-mar a 15-oct-2026). Beta mensual de 1,23 frente al TA-125 con 41 meses (ajustada 1,15); la semanal de 2 años es de 1,45 [1]. La historia en Yahoo empieza en mayo de 2023: los datos de 3 años son de 3,4 años y no hay serie de 5.',
    contexto: {
      movimiento: { fecha: '2026-10-19', var_1m_pct: MV.var_1m_pct, var_3m_pct: MV.var_3m_pct, var_6m_pct: MV.var_6m_pct, var_12m_pct: MV.var_12m_pct, dist_max_52s_pct: MV.dist_max_52s_pct, dist_min_52s_pct: MV.dist_min_52s_pct, dist_max_historico_pct: MV.dist_max_historico_pct, tendencia: MV.tendencia, volatilidad_60d_pct: MV.volatilidad_60d_pct, avisos: MV.avisos.map((a) => a.codigo) },
      movimientos_fuertes: [
        mfuerte('dic 2025', 49.3, 'Pedido de 60 M USD, el segundo mayor de su historia (+7,7 % ese día, según Calcalist) y +17,5 % el 16-dic («Next Vision soars», Globes); aprobación regulatoria del pedido de 30 M a tres años el 31-dic; entrada en el TA-35 en noviembre [14, 12].'),
        mfuerte('ene 2026', 32.9, 'Objetivo de ingresos de 2026 de 275 M USD (+63 %) el 5-ene y nuevos pedidos; ventas de fundadores fuera de bolsa a 228 ILS el 11-ene sin efecto en el precio [15, 18].'),
        mfuerte('feb 2026', 28.3, 'Subida sin nota concreta de la empresa: compras de fondos y ETF de drones antes de los resultados de 2025, en pleno auge del sector de defensa europeo; causa concreta no encontrada en tres búsquedas [2].'),
        mfuerte('mar 2026', -14.8, 'Máximo de 394 ILS el 2-mar y caída tras los resultados de 2025 (10-mar, −8,7 % ese día): margen bruto del 69,8 % frente al 72,1 % y dividendo de 0,563 USD [15].'),
        mfuerte('may 2026', -11.2, 'Días de −7,4 % (6-may y 13-may) alrededor del 1T26 pese a subir el objetivo a 315 M: rotación del sector de defensa y temor a la competencia en precios [8].'),
        mfuerte('jun 2026', -19.8, 'Colocación de ≈ 200 M USD de los fundadores (Golan, Grosman, Kipnis, Benchaya) el 17-18-jun con descuento [9].', 'descarta', 'Que pasen seis meses sin ventas de directivos o fundadores, o que compren o la empresa recompre.'),
        mfuerte('jul 2026 (1 mes al 13-jul)', -24.5, 'Continuación de la caída tras la colocación (sobreoferta de papel recién colocado) y del sector de defensa europeo; sin noticia de la empresa [13].'),
        mfuerte('ago 2026', -11.8, 'Resultados del 2T26 (10-ago): ventas +138 % y objetivo subido a 355 M, pero margen bruto del ≈ 65 % y cartera de 265,2 M frente a 288,0 M en marzo: −6,7 % ese día [8, 15].'),
        mfuerte('sep 2026', 14.6, 'Rebote con pedidos (3,5 M el 29-sep, aprobación de 2,7 M el 8-sep) y del sector [10].'),
        mfuerte('oct 2026', -21.7, 'Fidelity vende el 5,5 % del capital fuera de bolsa con descuento el 5-oct (cambio de política del fondo, según fuentes de la operación): −12,7 % el 6-oct y −11,4 % el 7-oct [6, 7].'),
      ],
      noticias: [
        noticia('2026-11-10', 'resultados', 'Resultados del 3T26: fecha estimada (el 3T25 se publicó el 10-nov-2025); sin confirmar por la empresa [15].'),
        noticia('2026-10-06', 'resultados', 'Pedido de 24 M USD de un cliente existente para entregar de enero a junio de 2027, pendiente de aprobación regulatoria (licencia de exportación) [10].'),
        noticia('2026-10-05', 'accionista de referencia', 'Fidelity (FMR) vende el 5,5 % del capital fuera de bolsa con descuento y se queda con ≈ 4 %; motivo citado: cambio de política del fondo. Sigue siendo un posible vendedor del resto [7, 6].', 'no cambia'),
        noticia('2026-09-15', 'accionista de referencia', 'Vence el bloqueo de 90 días de la colocación de junio: los fundadores (≈ 13 % del capital) pueden volver a vender [9].', 'descarta', 'Seis meses sin ventas de fundadores o compras de directivos.'),
        noticia('2026-08-11', 'recomendación', 'Freedom Broker sube el objetivo a 421 ILS (Comprar); objetivo medio de 4 analistas de 386,80 ILS [11, 2].'),
        noticia('2026-08-10', 'resultados', '2T26: ventas de 88,2 M USD (+138 %), objetivo de 2026 subido a 355 M, margen bruto del ≈ 65 % y cartera a la baja (265,2 M); −7 % [8, 15].'),
        noticia('2026-06-17', 'directivos', 'Colocación de ≈ 200 M USD de acciones de los fundadores y del consejero delegado (≈ 2,2 % del capital), con «monetización parcial» y «ampliar la base de inversores» como motivos [9].', 'descarta', 'Seis meses sin ventas de fundadores o compras de directivos.'),
        noticia('2026-01-11', 'directivos', 'Ventas fuera de bolsa a 228 ILS: Sandler 1 M de acciones, Golan 416.667 y Grosman 350.878 (≈ 126 M USD) [18].', 'descarta', 'Seis meses sin ventas de fundadores o compras de directivos.'),
      ],
      proximos_resultados: '2026-11-10',
      veredicto: 'descarta',
      condicion: 'Que los fundadores y directivos pasen al menos seis meses sin vender (o compren, o la empresa recompre con su caja de 591 M USD), y rehacer el informe con los resultados del 3T26.',
      comentario: 'La acción está un 52 % por debajo del máximo de marzo y un 30 % bajo la media de 200 sesiones (aviso P5, tendencia bajista). La caída tiene tres causas con fuente: (1) las ventas de los fundadores (enero y junio de 2026), (2) los resultados del 2T26 con menos margen bruto y menos cartera, y (3) la salida de Fidelity en octubre. La (2) está en la tesis del informe (márgenes y crecimiento a la baja en el caso base). La (1) activa la regla de «descarta»: quienes mejor conocen la empresa (presidente, consejero delegado, director técnico y dos consejeros fundadores) han vendido en serie durante 2026 sin otro motivo que monetizar, y el bloqueo ya venció. La (3) es una venta institucional con motivo declarado: no cambia por sí sola. Los resultados del 3T26 (≈ 10-nov) no retrasan nada (regla 11).',
    },
    confianza: 'Media',
  },
  multiplos_historicos: {
    serie: CIERRES.map((c) => ({ anio: c.anio, precio_cierre: r2(c.ils / c.fx), ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    comentario: 'Cierres de fin de año en ILS de Yahoo (29,84, 60,44 y 209,90 ILS) pasados a USD con el tipo representativo del Banco de Israel de ese día (3,627, 3,647 y 3,19) [1, 3]. La serie solo tiene tres años útiles (Yahoo empieza en mayo de 2023 y no se encontraron cierres fiables de 2021-2022): la acción pasó de ≈ 10 veces el beneficio del año siguiente a finales de 2023 a ≈ 30 veces a finales de 2025, un cambio de percepción completo de empresa pequeña desconocida a «valor de drones» del TA-35.',
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Empresas cotizadas de sensores, cámaras y electrónica de defensa y de drones: Teledyne (FLIR, sensores térmicos), AeroVironment (drones pequeños y municiones merodeadoras), Elbit (Israel), Kratos (drones), Hensoldt (sensores ópticos y radar), Exosens (sensores de visión nocturna), Theon (visión nocturna y térmica), Mercury y OSI. Ninguna es igual: NextVision es más pequeña, mucho más rentable y depende de un solo producto. Ondas se excluye por pérdidas [2, 16].',
    empresas: comps,
    comentario: `La mediana del PER adelantado de los comparables es de ${String(perMed).replace('.', ',')} veces (rango de 15 a 41), por encima de la ficha de defensa (19,6) porque incluye las de sensores y drones que el mercado premia [2, 16]. NextVision cotiza a ≈ 26 veces nuestro BPA de los próximos 12 meses y a ≈ 19 veces el del consenso de 2027, con un margen EBITDA del 59 % frente al 10-25 % de los comparables y caja neta del 10 % de su capitalización; descuenta el riesgo de un solo producto, la concentración de clientes y el riesgo israelí.`,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [],
    comentario: 'No hay transacciones comparables útiles con múltiplos publicados: los fabricantes de cámaras para drones compran y se venden en privado (Redwire compró Edge Autonomy en 2025). No se usan.',
    confianza: 'Baja',
  },
  huecos: [
    { seccion: 'multiplos_historicos', campo: 'cierres y PER de 2021-2022', tipo: 'Complemento', intentos: '1) Yahoo (historia desde mayo de 2023); 2) MAYA (403); 3) prensa israelí (sin cierres)', decision: 'Historia de tres años; la regla de 12 meses aplica el selector de historia corta.' },
    { seccion: 'bolsa', campo: 'causa concreta de la subida de febrero de 2026', tipo: 'Complemento', intentos: '1) informes inmediatos de la empresa en su web; 2) Globes y Calcalist; 3) búsqueda general', decision: 'Se atribuye al sector y se dice.' },
  ],
  fuentes: fD,
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: '«Next Vision shares plunge… Fidelity» (cita de un directivo de una gestora: «los inversores no saben qué pasa»)', editor: 'Calcalist (Ctech)', tipo: 'Prensa', fecha: '2026-10-07', url: 'https://www.calcalistech.com/ctechnews/article/u0r0myniq' },
  { id: 2, titulo: '«What\'s not to like about Next Vision\'s financials?» (analistas: margen, cartera, competencia)', editor: 'Globes', tipo: 'Prensa', fecha: '2026-08-11', url: 'https://en.globes.co.il/en/article-1001551935' },
  { id: 3, titulo: 'DRNZ Spotlight: NextVision (comentario del ETF de drones de REX Shares; ≈ 12,8 % del fondo)', editor: 'REX Shares', tipo: 'Foros y redes', fecha: '2026', url: 'https://www.rexshares.com/?p=2849' },
  { id: 4, titulo: 'Narrativa de usuarios de Simply Wall St sobre NXSN («la demanda de defensa y la capacidad sostendrán el beneficio»)', editor: 'Simply Wall St', tipo: 'Foros y redes', fecha: '2026', url: 'https://www.simplywall.st/narratives/2gt2tork-long-term-defense-demand-and-capacity-expansion-will-support-future-earnings-power' },
  { id: 5, titulo: 'Dealroom: la venta de Fidelity «inquietó a los inversores»', editor: 'Dealroom', tipo: 'Prensa', fecha: '2026-10-06', url: 'https://dealroom.co/news/160236-fidelity-exits-most-of-nextvision-stake-for-425m-sending-shares-lower/' },
];
const E = {
  _estado: 'Parcial: no hay hilos en Reddit, Stocktwits ni Seeking Alpha (búsqueda del 19-oct-2026); el sentimiento sale de la prensa israelí, de un comentario de fondo y de una narrativa de Simply Wall St.',
  sentimiento: {
    tono: 'Negativo', tendencia: 'Empeora',
    revisadas: [
      { plataforma: 'Prensa económica israelí (Calcalist, Globes)', fecha: '2026-10', n_comentarios: 4, tono: 'Negativo', resumen: 'Tras la salida de Fidelity, un gestor institucional dice que «los inversores no saben qué pasa» y que, si los fundadores hubieran recomprado con lo que vendieron, «la sangría habría parado»; en agosto, temor a la competencia y al margen, aunque un gestor (Achord) llama a la empresa «excelente» y «no barata» [1, 2].' },
      { plataforma: 'REX Shares (ETF DRNZ) y Simply Wall St', fecha: '2026', n_comentarios: 2, tono: 'Positivo', resumen: 'Visión de largo plazo: demanda de defensa, capacidad nueva y márgenes del 55-60 % [3, 4].' },
    ],
    temas: [
      { tema: 'Los fundadores venden y no recompran', postura: 'Bajista', peso: 'Alto', contraste: 'Cierto: ≈ 326 M USD vendidos en 2026 sin ninguna compra ni recompra [1].' },
      { tema: 'Competencia y margen', postura: 'Bajista', peso: 'Alto', contraste: 'El margen bruto bajó del 72 % al ≈ 65 %, dentro del rango objetivo de la empresa (65-72 %) [2].' },
      { tema: 'Crecimiento y pedidos', postura: 'Alcista', peso: 'Medio', contraste: 'Ventas +112 % en el 1S26 y objetivo de 355 M; la cartera bajó en el 2T [2].' },
      { tema: 'Salida de fondos extranjeros (Fidelity)', postura: 'Bajista', peso: 'Medio', contraste: 'Motivo declarado (política del fondo); queda ≈ 4 % que podría venderse [5].' },
    ],
    lectura: 'El sentimiento ha pasado de euforia (diciembre-marzo) a desconfianza: la acción ha caído un 52 % y la prensa israelí habla de ventas de los fundadores y de fondos, no de resultados [1, 5]. Esto es lo contrario de la capitulación típica de una oportunidad: no hay un mal trimestre que asuste, sino información de quien mejor conoce la empresa. Para un inversor contrario, la señal útil sería una compra de directivos o una recompra.',
    confianza: 'Baja',
  },
  huecos: [
    { seccion: 'sentimiento', campo: 'foros de particulares (Reddit, Stocktwits, Seeking Alpha, foros israelíes)', tipo: 'Complemento', intentos: '1) búsqueda de Reddit/Stocktwits/Seeking Alpha; 2) getquin y Webull; 3) foros israelíes (sin acceso)', decision: 'Sentimiento con prensa y fondos; confianza baja.' },
  ],
  fuentes: fE,
};
guarda('E', E);
console.log('Notas A-E escritas. Precio USD', precioUSD, 'PER mediana comparables', perMed, comps.map((x) => `${x.ticker} ${x.per_ntm}`).join(', '));
