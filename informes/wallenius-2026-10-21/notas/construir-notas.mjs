// Escribe las notas A-E de Wallenius Wilhelmsen (corte 2026-10-21) a partir de los documentos de notas/docs (informes
// anuales y trimestrales, comunicados de Oslo Børs), del ESEF de filings.xbrl.org (cuentas-xbrl.json, 2020-2024), de
// bolsa.json, de yahoo-datos.json y yahoo-extra.json (Yahoo quoteSummary del 21-oct-2026, tras el cierre de Oslo) y de
// MarketScreener (consenso). Cada nota cita solo con [n] de su propia lista de fuentes.
// Ejecutar: node informes/wallenius-2026-10-21/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const lee = (f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const r1 = (x) => (x == null ? null : Math.round(x * 10) / 10);
const r2 = (x) => (x == null ? null : Math.round(x * 100) / 100);
const n2 = (x) => String(x).replace('.', ',');
const B = lee('bolsa.json');
const Y = lee('yahoo-datos.json').datos;
const YX = lee('yahoo-extra.json').datos;
const NW = (id) => `https://newsweb.oslobors.no/message/${id}`;
const ATT = (m, a) => `https://api3.oslo.oslobors.no/v1/newsreader/attachment?messageId=${m}&attachmentId=${a}`;
const IR = 'https://www.walleniuswilhelmsen.com/storage/images/Investor-relations';
// Tipo de cambio del 21-oct-2026 (Norges Bank: 9,3573 NOK por USD) y cruces para los comparables (USD por unidad).
const FX = { USD: 1, NOK: 0.106868, EUR: 1.1234, JPY: 0.006334, KRW: 0.00075438, DKK: 0.1503, HKD: 0.12743, CNY: 0.149786 };
const TC = FX.NOK;

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Annual Report 2025 (cuentas consolidadas NIIF, notas de segmentos, arrendamientos, opción de venta de EUKOR, auditoría)', editor: 'Wallenius Wilhelmsen ASA (Oslo Børs)', tipo: 'Primaria', fecha: '2026-03-19', url: ATT(668797, 321619) },
  { id: 2, titulo: 'Quarterly report Q2 2026 (cuenta, balance a 30-jun-2026, revaloración de la opción de EUKOR, deuda, inversión pendiente)', editor: 'Wallenius Wilhelmsen ASA', tipo: 'Primaria', fecha: '2026-08-11', url: `${IR}/Wallenius-Wilhelmsen-Quarterly-report-Q2-2026.pdf` },
  { id: 3, titulo: 'Quarterly report Q1 2026', editor: 'Wallenius Wilhelmsen ASA (Oslo Børs)', tipo: 'Primaria', fecha: '2026-05-06', url: ATT(672451, 325017) },
  { id: 4, titulo: 'Quarterly report Q4 2025 (tasas portuarias USTR del 4T25, guía 2026)', editor: 'Wallenius Wilhelmsen ASA (Oslo Børs)', tipo: 'Primaria', fecha: '2026-02-11', url: ATT(665330, 318562) },
  { id: 5, titulo: 'Quarterly report Q3 2025', editor: 'Wallenius Wilhelmsen ASA (Oslo Børs)', tipo: 'Primaria', fecha: '2025-11-05', url: ATT(658737, 313862) },
  { id: 6, titulo: 'Annual Report 2024', editor: 'Wallenius Wilhelmsen ASA', tipo: 'Primaria', fecha: '2025-03-20', url: `${IR}/WAWI_2024-Annual-report.pdf` },
  { id: 7, titulo: 'Informes ESEF 2020-2024 de Wallenius Wilhelmsen (XBRL NIIF), herramienta cuentas.mjs', editor: 'filings.xbrl.org', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://filings.xbrl.org/?entity=549300NBN0URT3RA3Y54' },
  { id: 8, titulo: 'Contemplated private placement and trading update; private placement successfully completed (17,145 M de acciones a 168 NOK; 4 barcos LNG grandes y 8 opciones)', editor: 'Wallenius Wilhelmsen ASA (Oslo Børs)', tipo: 'Primaria', fecha: '2026-10-06', url: NW(683662) },
  { id: 9, titulo: 'Agreement around the put and call options related to HMG’s 20 % ownership in EUKOR', editor: 'Wallenius Wilhelmsen ASA (Oslo Børs)', tipo: 'Primaria', fecha: '2026-04-07', url: NW(670006) },
  { id: 10, titulo: 'Annual Report 2020 y Annual Report 2019 (ejercicios 2019-2020, historia del grupo)', editor: 'Wallenius Wilhelmsen ASA', tipo: 'Primaria', fecha: '2021-03-18', url: `${IR}/Wallenius-Wilhelmsen-Annual-Report-2020.pdf` },
  { id: 11, titulo: '2026 Financial Year Outlook (EBITDA ajustado 1.650-1.750 M USD) y US port fees impact 2025 outlook', editor: 'Wallenius Wilhelmsen ASA (Oslo Børs)', tipo: 'Primaria', fecha: '2025-12-15', url: NW(661948) },
  { id: 12, titulo: 'Quarterly reports Q4 2022 y Q4 2024 (ejercicios 2021-2024, trimestres de 2024)', editor: 'Wallenius Wilhelmsen ASA', tipo: 'Primaria', fecha: '2025-02-12', url: `${IR}/Wallenius-Wilhelmsen-Q4-2024-report.pdf` },
  { id: 13, titulo: 'Wallenius Wilhelmsen pays high dividends in a strong market (2T26: dividendo de 0,61 USD, 50 % del beneficio más 100 M extraordinarios)', editor: 'Wallenius Wilhelmsen ASA (Oslo Børs)', tipo: 'Primaria', fecha: '2026-08-11', url: NW(679374) },
];

// Cuenta (M USD). EBITDA = EBIT + amortizaciones (incluida la de derechos de uso) [7, 1]; «no recurrentes» = EBITDA ajustado
// de la empresa − EBITDA publicado, menos las ganancias no recurrentes que quedan en el EBIT (plusvalía de MIRRAT de 135 M en
// 2025, dentro de «otros resultados» por encima del EBIT). Resultado financiero sin participadas (resultado de asociadas ≈ 0).
const fila = (periodo, ingresos, ebitda, amort, resFin, imp, minor, bn, bpa, dpa, dpaX, acc, gfin, noRec) => {
  const ebit = ebitda - amort;
  return { periodo, ingresos, coste_ventas: null, gastos_generales: null, ebitda, amortizaciones: amort, ebit, resultado_financiero: resFin, bai: ebit + resFin, impuestos: imp, minoritarios: minor, beneficio_neto: bn, gastos_financieros: gfin, participadas_en_ebitda: null, no_recurrentes_en_ebitda: noRec, bpa, dpa, dpa_extraordinario: dpaX, acciones_diluidas: acc };
};
const cuenta = [
  fila('2020', 2958, 457, 541, -222, -4, -16, -286, -0.68, 0, 0, 422.36, 257, 16),
  fila('2021', 3884, 851, 545, -107, 23, 43, 133, 0.32, 0.15, 0, 422.40, 203, -21),
  fila('2022', 5045, 1501, 570, -102, 35, 116, 679, 1.60, 0.85, 0, 422.45, 288, 47),
  fila('2023', 5149, 1807, 582, -183, 68, 121, 853, 2.00, 1.14, 0, 422.69, 309, null),
  fila('2024', 5308, 1869, 580, -151, 73, 93, 973, 2.30, 1.85, 0.59, 422.65, 325, 32),
  fila('2025', 5240, 1936, 651, -139, 42, 86, 1017, 2.41, 2.11, 0.80, 422.76, 265, -125),
];
// Balance (M USD). Minoritarios = participaciones no dominantes contables + pasivo de la opción de venta de Hyundai Motor
// Group sobre su 20 % de EUKOR (se resta del pasivo corriente y del total: es la parte económica del socio). Intangibles =
// total (con fondo de comercio: 162 M en 2025, 201 en 2023-2024). Reservas = patrimonio − capital (28) − prima (1.085).
const bal = (periodo, at, ac, pc, pt, intang, inm, ex, cl, pr, caja, deuda, arr, pat, min) => ({ periodo, activo_total: at, activo_corriente: ac, pasivo_corriente: pc, pasivo_total: pt, fondo_comercio: null, intangibles: intang, inmovilizado_material: inm, existencias: ex, clientes: cl, proveedores: pr, activos_contrato: null, pasivos_contrato: null, caja, deuda_financiera: deuda, arrendamientos: arr, patrimonio_neto: pat, minoritarios: min, reservas: pat - 28 - 1085 });
const balance = [
  bal('2020', 7628, 1237, 1094, 5013, 571, 4175, 79, 363, 142, 654, 2731, 1350, 2391, 224),
  bal('2021', 7794, 1479, 1395, 4990, 455, 4033, 147, 457, 154, 710, 2673, 1456, 2539, 266),
  bal('2022', 8289, 2151, 1226, 4885, 395, 3943, 139, 605, 112, 1216, 2516, 1571, 2826, 578),
  bal('2023', 8543, 2690, 1423, 4585, 360, 3871, 138, 616, 103, 1705, 2303, 1410, 3051, 907),
  bal('2024', 8400, 2650, 1520, 4248, 319, 3889, 139, 655, 142, 1393, 1776, 1375, 3313, 840),
  bal('2025', 7817, 2037, 1496, 3618, 241, 3906, 142, 558, 141, 1071, 1263, 1538, 3293, 906),
];
const flu = (periodo, cfo, capex, arr, adq, des, div, rec, int) => ({ periodo, flujo_operativo: cfo, capex, pagos_arrendamientos: arr, adquisiciones: adq, desinversiones: des, dividendos: div, recompras: rec, emision_acciones: 0, intereses_en_financiacion: int });
const flujos = [
  flu('2020', 615, 135, 181, 0, 8, 0, 0, 166),
  flu('2021', 623, 141, 204, 0, 5, 0, 0, 165),
  flu('2022', 1297, 112, 352, 11, 45, 63, 0, 189),
  flu('2023', 1771, 163, 319, 13, 2, 362, 4, 218),
  flu('2024', 1778, 195, 327, 0, 2, 738, 0, 203),
  flu('2025', 1744, 245, 360, 0, 220, 989, 0, 164),
];
const trim = (p, ing, g, ebitda, bpa) => ({ periodo: p, ingresos: ing, crecimiento_pct: g, crecimiento_organico_pct: null, ebitda, margen_ebitda_pct: r2(ebitda / ing * 100), bpa, vs_consenso: null });

const A = {
  _estado: 'Completa. 2020-2024 del ESEF (filings.xbrl.org) contrastado con los informes anuales; 2025 y el primer semestre de 2026 del informe anual 2025 y de los trimestrales (el ESEF de 2025 no estaba publicado en filings.xbrl.org). Cuenta por naturaleza: coste de ventas y gastos generales en null. EBITDA = EBIT + amortizaciones (la empresa deja en el EBITDA las «otras ganancias y pérdidas»; en 2025 la plusvalía de MIRRAT, 135 M, va por encima del EBIT: se trata como no recurrente con signo negativo). Minoritarios del balance = no dominantes contables + pasivo de la opción de venta de EUKOR.',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 5151, ebitda: 1597, ebit: 925, beneficio_neto: 696, bpa: 1.64, dpa: 1.62, dpa_extraordinario: 0.71, fcf: 560, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 30 },
    cambios_perimetro: [
      { periodo: '2025', descripcion: 'Venta de MIRRAT (logística de maquinaria en Australia) a Qube por 332,5 M AUD, cerrada el 2-may-2025: ≈ 210 M USD cobrados y 135 M de plusvalía; restó ≈ 80 M de ingresos de logística frente a 2024 [1].' },
    ],
    comentario: 'Los ingresos pasaron de 2.958 M USD en 2020 (covid) a 5.308 M en 2024 y 5.240 M en 2025; en los últimos doce meses a junio de 2026, 5.151 M (−3,4 % interanual en el 2T26) [1, 2]. El EBITDA ajustado de la empresa subió de 457 M en 2020 a un máximo de 1.869 M en 2024 y 1.811 M en 2025 (margen del 34,6 %), y cae a ≈ 1.600 M en 2026 (guía rebajada el 6-may desde 1.650-1.750 M) [1, 3, 11]: márgenes del 35 % en 2023-2025 frente al 16-22 % de 2019-2021. Es un negocio cíclico: el beneficio neto pasó de −286 M en 2020 a 1.017 M en 2025 y vuelve a ≈ 700 M en los últimos doce meses [1, 2]. El transporte marítimo (Shipping services) da ≈ 75 % de los ingresos y ≈ 85 % del EBITDA; la logística en tierra (procesado de vehículos, terminales) ≈ 21 % de los ingresos con un margen del 12-16 %; y Government services (transporte para el Gobierno de EE. UU. con bandera estadounidense) el resto [1]. En 2025, la plusvalía de MIRRAT (135 M) está dentro del EBIT publicado; se trata como no recurrente (−125 M = 10 M de reestructuración y transformación digital − 135 M de plusvalía) [1].',
    ajustes: 'La empresa da un «EBITDA ajustado» que excluye reestructuración, costes de transformación digital y ventas de activos: 1.811 M USD en 2025 frente a 1.801 publicado sin MIRRAT (1.936 con ella), y 1.627 M en los últimos doce meses frente a 1.597 publicado [1, 2]. Los dividendos extraordinarios (0,59 USD en 2024, 0,80 en 2025 y 0,24 en el primer semestre de 2026) se tratan aparte para no deformar el reparto [1, 13]. El impuesto es el de tonelaje noruego y de otros regímenes de tonelaje: tipo efectivo del 4-6 % del beneficio antes de impuestos [1]. Los arrendamientos (NIIF 16) están en el EBITDA como amortización e intereses: 1.538 M USD de pasivo a 31-dic-2025 y 1.490 M a 30-jun-2026, sobre todo barcos fletados por tiempo [1, 2].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      trim('3T24', 1353, null, 471, 0.55),
      trim('4T24', 1341, null, 452, 0.63),
      trim('1T25', 1297, null, 462, 0.53),
      trim('2T25', 1350, null, 472, 0.90),
      trim('3T25', 1331, -1.6, 477, 0.60),
      trim('4T25', 1261, -6.0, 400, 0.37),
      trim('1T26', 1253, -3.4, 389, 0.38),
      trim('2T26', 1305, -3.3, 361, 0.29),
    ],
    ultima_presentacion: 'EBITDA ajustado de la empresa por trimestre; BPA publicado (el del 2T25 lleva la plusvalía de MIRRAT) [2, 3, 4, 5, 12]. 2T26 (11-ago-2026): ingresos de 1.305 M USD (−3 % interanual), EBITDA ajustado de 361 M (−24 %; margen del 27,6 % frente al 35,0 %) por el combustible más caro con el conflicto de Oriente Medio (se recupera con retraso por las cláusulas BAF), beneficio de 138 M y BPA de 0,29 USD [2, 13]. Volumen de 13,6 M de m³ (13,7 un año antes) y flete neto de 61,4 USD/m³ (64,9); la cartera de contratos de transporte baja a 6.500 M USD (2,9 años) desde 8.700 M [2]. Guía 2026: EBITDA ajustado de ≈ 1.600 M (rebajada el 6-may desde 1.650-1.750 M) y, el 6-oct, 420-450 M para el 3T26 [3, 8]. La dirección dice que la flota está «vendida» desde Asia, que el 40 % del volumen de 2027 se renegocia en el segundo semestre de 2026 a tarifas más altas y que la logística tuvo su mejor trimestre desde el covid (46 M de EBITDA) [13, 8]. Resultados del 3T26: 4-nov-2026.',
    confianza: 'Alta',
  },
  balance: {
    historico: balance,
    vencimientos: [
      { anio: '2026 (2S)', importe: 130 }, { anio: '2027', importe: 250 }, { anio: '2028', importe: 230 }, { anio: '2029', importe: 260 }, { anio: '2030+', importe: 277 },
    ],
    liquidez: 'Caja de 627 M USD a 30-jun-2026 y 552 M de líneas de crédito sin disponer (liquidez de 1.179 M frente a un mínimo propio de 1.000 M) [2]. El 6-oct-2026 entraron ≈ 295 M netos de la colocación y el 16-sep salieron 258 M de dividendo [8, 13]. Quedan 1.400 M de inversión para los 14 Shaper (financiación bancaria posterior a la entrega firmada para 11) más los 4 barcos LNG grandes que se contratan con la colocación [2, 8]. 43 barcos sin cargas con un valor contable de 1.146 M [2].',
    rating: 'Sin calificación pública de agencia; financiación bancaria garantizada con barcos y bonos noruegos (el WAWI01 se amortizó en marzo de 2026) [2]',
    coste_deuda_pct: 6.0,
    vida_media_anios: 4.0,
    otros_pasivos: 'Opción de venta de Hyundai Motor Group (HMG) sobre su 20 % de EUKOR: 897 M USD de pasivo corriente a 31-dic-2025; tras el acuerdo del 7-abr-2026 (no se ejerce mientras el contrato de transporte con HMG cubra al menos el 50 % de su volumen; el actual vence el 31-dic-2029) se mide al valor actual del precio estimado en la primera fecha de ejercicio y baja a 386 M no corrientes a 30-jun-2026 (−465 M contra patrimonio) [9, 2]. Es la parte económica del socio en EUKOR: el informe la trata como minoritarios. Pensiones netas de 34 M [2]. Compromisos de construcción de 1.400 M [2].',
    comentario: 'La deuda neta con arrendamientos (deuda que devenga intereses: 1.147 M de deuda financiera + 1.490 M de arrendamientos − 627 M de caja) es de 2.011 M USD a 30-jun-2026, 1,2 veces el EBITDA ajustado de doce meses; en 2020 era de 3.427 M y 7,5 veces [2, 1]. La empresa ha usado el pico del ciclo para bajar deuda (2.731 M de deuda financiera en 2020, 1.147 en junio de 2026) y pagar dividendos [1, 2]. El circulante comercial es pequeño (existencias + clientes − proveedores ≈ 10,7 % de las ventas en 2025) [1]. El patrimonio subió a 3.660 M a 30-jun-2026 por la revaloración de la opción de EUKOR [2]; ratio de patrimonio del 48,8 % (objetivo > 35 %).',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'El flujo operativo pasó de 615 M USD en 2020 a 1.744-1.778 M en 2023-2025 [1, 7]. La inversión en inmovilizado propio fue baja hasta 2025 (112-245 M) porque la flota se renovó poco en 2019-2023; desde 2026 sube con los 14 Shaper (≈ 1.400 M pendientes) y los 4 barcos LNG grandes [2, 8]. Los pagos de arrendamientos (capital) suman 327-360 M al año y las altas de derechos de uso (contratos de fletamento nuevos o renovados) 467 M en 2024 y 505 M en 2025: son inversión de hecho y el DCF las cuenta como tal [1]. En 2023-2025 casi todo el flujo libre se repartió: 362, 738 y 989 M de dividendos, más amortización de deuda [1]. Flujo libre de doce meses a junio de 2026 ≈ 560 M (operativo − inversión − arrendamientos) [2].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'EY (Ernst & Young AS)', anios_auditor: 2, opinion: 'Favorable (sin salvedades) en 2025 [1]',
    comentario: 'Las cuentas son limpias y sencillas (NIIF-UE, sin capitalización agresiva: el inmovilizado son barcos a coste amortizado a 25-30 años). Lo que distorsiona es el ciclo: el BPA pasó de −0,68 USD en 2020 a 2,41 en 2025 y 1,64 en los últimos doce meses [1, 2]. Partidas que vigilar: la opción de venta de EUKOR, que cambia de valor con el beneficio previsto de EUKOR (−465 M contra patrimonio en el 2T26; un pasivo de 386 M con una estimación muy incierta, dice la propia empresa) [2, 9]; la plusvalía de MIRRAT de 2025 (135 M) dentro del EBIT [1]; y los costes de las tasas portuarias USTR (≈ 22 M en el 4T25 antes de repercutirlos) [11]. El auditor cambió a EY en 2024 (antes PwC).',
    senales: [
      { senal: 'Beneficio de pico de ciclo', nivel: 'Alta', comentario: 'Margen EBITDA del 35 % en 2023-2025 frente al 16-22 % de 2019-2021; el 2T26 ya baja al 27,6 % [1, 2].' },
      { senal: 'Opción de venta de EUKOR fuera del balance de deuda', nivel: 'Media', comentario: '386 M USD a valor actual (897 M al precio estipulado de 2025); el informe la resta como minoritarios [2, 9].' },
      { senal: 'Plusvalías dentro del EBIT', nivel: 'Baja', comentario: 'MIRRAT, 135 M en 2025; se quita como no recurrente [1].' },
      { senal: 'Arrendamientos de barcos', nivel: 'Media', comentario: '1.490 M de pasivo por fletamentos: es deuda de hecho y se resta en el puente [2].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Política de dividendo: 30-50 % del beneficio neto de cada semestre, en USD y pagado en NOK; desde 2024 se suman dividendos extraordinarios (100 M en el primer semestre de 2026: 0,61 USD por acción en total, el 82 % del beneficio) [1, 13]. Objetivos financieros a lo largo del ciclo: ROCE > 12 %, deuda neta < 3 veces el EBITDA, patrimonio > 35 % del activo y liquidez > 1.000 M [1]. En octubre de 2026 la empresa amplió capital (300 M brutos, 4 % del capital) para pagar más barcos: el programa pasa a 26 barcos con opciones (14 Shaper de 2026-2028, 4 LNG grandes para 2030 y 8 opciones desde 2031) [8].',
    adquisiciones: [
      { anio: '2025', objetivo: 'Venta de MIRRAT (logística de maquinaria, Australia)', importe: -210, ev_ebitda: null, financiacion: 'Venta a Qube por 332,5 M AUD', resultado: 'Plusvalía de 135 M USD [1].' },
      { anio: '2023-2024', objetivo: '14 barcos Shaper (PCTC de 9.350 CEU, metanol listo)', importe: 1400, ev_ebitda: null, financiacion: 'Caja y deuda bancaria posterior a la entrega', resultado: 'Entregas del 3T26 a 2028; 1.400 M pendientes a 30-jun-2026 [2].' },
      { anio: '2026', objetivo: '4 barcos LNG grandes (entrega en 2030) y 8 opciones', importe: null, ev_ebitda: null, financiacion: 'Colocación de 300 M USD y deuda', resultado: 'En negociación avanzada con astilleros a 6-oct-2026 [8].' },
    ],
    comentario: 'Desde la fusión de 2017 el capital se ha usado en tres cosas: bajar deuda (de 3.427 M de deuda neta con arrendamientos en 2020 a 2.011 en junio de 2026), pagar dividendos crecientes (2.089 M en 2023-2025) y renovar flota [1, 2]. La asignación ha sido prudente hasta 2025; en 2026 cambia de signo: pide 300 M al mercado tras pagar 989 M de dividendos en 2025 y 1.07 USD por acción más en 2026, para encargar barcos en un momento de cartera de pedidos mundial del 20 % de la flota [8, 1]. Pagar dividendos extraordinarios y a la vez ampliar capital es una señal ambigua: devuelve caja a los dos grandes accionistas mientras diluye al flotante.',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'Shipping services (transporte marítimo ro-ro)', descripcion: 'Transporte de coches, camiones, maquinaria y carga rodada en ≈ 129 barcos PCTC (91 propios) en 15 rutas oceánicas, con las marcas WW Ocean, EUKOR (80 %) y ARC.', tipo_resultado: 'EBITDA', historico: [{ periodo: '2023', ingresos: 3881, resultado: 1527 }, { periodo: '2024', ingresos: 3937, resultado: 1561 }, { periodo: '2025', ingresos: 3989, resultado: 1560 }] },
      { nombre: 'Logistics services (logística en tierra)', descripcion: 'Procesado de vehículos, terminales marítimas, transporte interior y servicios a fabricantes, sobre todo en EE. UU. y México.', tipo_resultado: 'EBITDA', historico: [{ periodo: '2023', ingresos: 1148, resultado: 174 }, { periodo: '2024', ingresos: 1205, resultado: 197 }, { periodo: '2025', ingresos: 1087, resultado: 128 }] },
      { nombre: 'Government services', descripcion: 'Transporte y logística para el Gobierno de EE. UU. (ARC, bandera estadounidense).', tipo_resultado: 'EBITDA', historico: [{ periodo: '2023', ingresos: 324, resultado: 130 }, { periodo: '2024', ingresos: 427, resultado: 183 }, { periodo: '2025', ingresos: 411, resultado: 153 }] },
      { nombre: 'Holding y eliminaciones', descripcion: 'Gastos centrales y eliminaciones entre segmentos.', tipo_resultado: 'EBITDA', historico: [{ periodo: '2023', ingresos: -204, resultado: -25 }, { periodo: '2024', ingresos: -260, resultado: -72 }, { periodo: '2025', ingresos: -248, resultado: -39 }] },
    ],
    geografias: [{ nombre: 'Américas', peso_pct: 44 }, { nombre: 'Europa', peso_pct: 33 }, { nombre: 'Asia', peso_pct: 16 }, { nombre: 'Oceanía', peso_pct: 6 }, { nombre: 'África', peso_pct: 1 }],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Volumen transportado (M m³, 2T)', valor_anterior: '13,7', valor_actual: '13,6', variacion: '−1 %', comentario: 'Flota llena desde Asia [2].' },
      { kpi: 'Flete neto (USD/m³, 2T)', valor_anterior: '64,9', valor_actual: '61,4', variacion: '−5 %', comentario: 'Mezcla de rutas y contratos renovados a tarifas algo menores [2].' },
      { kpi: 'Resultado del fletamento de flota (miles de USD/día, 2T)', valor_anterior: '58', valor_actual: '51', variacion: '−12 %', comentario: 'Con combustible más caro [2].' },
      { kpi: 'Cartera de contratos de transporte (miles de M USD)', valor_anterior: '8,7', valor_actual: '6,5', variacion: '−25 %', comentario: '2,9 años de duración media; la de logística, 2.700 M (8,1 años) [2].' },
      { kpi: 'ROCE ajustado de doce meses', valor_anterior: '19,9 %', valor_actual: '15,6 %', variacion: '−4,3 pp', comentario: 'Objetivo > 12 % a lo largo del ciclo [2].' },
    ],
    clientes: 'Clientes fabricantes de coches y de maquinaria con contratos de 1 a 5 años: dos clientes de transporte de 452 y 460 M USD (≈ 9 % de las ventas cada uno; Hyundai Motor Group es el principal a través de EUKOR) y uno de logística de 153 M en 2025 [1]. En los últimos doce meses se renovaron o firmaron contratos por ≈ 190 M (mar-2026), ≈ 500 M (dic-2025), 130 M con un fabricante asiático (ene-2026) y 600 M con un fabricante europeo hasta 2031 (jun-2026) [1, 2]. Poder de precio cíclico: en 2022-2024 la escasez de barcos permitió subir mucho las tarifas de los contratos renovados; con la flota mundial creciendo un 8 % en 2026, las renovaciones de 2026-2027 son la prueba [2].',
    confianza: 'Alta',
  },
  huecos: [
    { seccion: 'balance', campo: 'vencimientos de deuda por año exactos a 30-jun-2026', tipo: 'Complemento', intentos: '1) nota 10 del informe del 2T26 (solo movimientos); 2) nota de liquidez del informe anual 2025; 3) presentación del 2T26', decision: 'Estimación propia a partir del perfil de 2025 y de las refinanciaciones del 2T26' },
  ],
  fuentes: fA,
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Annual Report 2025: mercado ro-ro, flota mundial, cartera de pedidos, competencia, regulación (EU ETS, IMO)', editor: 'Wallenius Wilhelmsen ASA (Oslo Børs)', tipo: 'Primaria', fecha: '2026-03-19', url: ATT(668797, 321619) },
  { id: 2, titulo: 'Market update presentation (flota de 5,2 M CEU, cartera de pedidos del 20,6 %, crecimiento de capacidad del 8,1 % en 2026 y 6,4 % en 2027, exportaciones chinas)', editor: 'Wallenius Wilhelmsen ASA (Oslo Børs)', tipo: 'Primaria', fecha: '2026-09-24', url: ATT(682966, 333777) },
  { id: 3, titulo: 'Quarterly report Q2 2026 (mercado: exportaciones chinas +58 % en el 2T, tasas portuarias USTR, aranceles, Oriente Medio)', editor: 'Wallenius Wilhelmsen ASA', tipo: 'Primaria', fecha: '2026-08-11', url: `${IR}/Wallenius-Wilhelmsen-Quarterly-report-Q2-2026.pdf` },
  { id: 4, titulo: 'US port fees impact 2025 outlook (USTR sección 301: 46 USD por tonelada neta desde el 14-oct-2025)', editor: 'Wallenius Wilhelmsen ASA (Oslo Børs)', tipo: 'Primaria', fecha: '2025-10-13', url: NW(657023) },
  { id: 5, titulo: 'Contemplated private placement and trading update (mercado, fletamentos, flota)', editor: 'Wallenius Wilhelmsen ASA (Oslo Børs)', tipo: 'Primaria', fecha: '2026-10-06', url: ATT(683650, 334223) },
  { id: 6, titulo: 'Fichas de competidores cotizados (ventas, márgenes, capitalización)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/HAUTO.OL' },
  { id: 7, titulo: 'Annual Report 2024 (mercado y competencia 2024)', editor: 'Wallenius Wilhelmsen ASA', tipo: 'Primaria', fecha: '2025-03-20', url: `${IR}/WAWI_2024-Annual-report.pdf` },
];
const B_ = {
  _estado: 'Completa con fuentes de la empresa y datos de mercado; no hay ficha sectorial del repo para el ro-ro (no se pidió: es la primera empresa del sector). Tamaño del mercado medido en flota (CEU), no en ingresos: no hay estadística pública de ingresos del sector.',
  sector: {
    definicion: 'Mercado relevante: el transporte marítimo oceánico de carga rodada (coches, camiones, maquinaria agrícola y de construcción, carga sobre ruedas) en barcos PCTC/PCC de alta mar, más la logística de vehículos en puertos y en tierra que lo acompaña [1]. Es un nicho del transporte marítimo: ≈ 800 barcos y 5,2 M CEU (unidades equivalentes a un coche) de capacidad mundial [2]. Wallenius Wilhelmsen es el mayor operador junto con los japoneses (NYK, MOL, K Line) y las navieras chinas, que crecen muy rápido con la exportación de coches de su país [2].',
    tamano: '≈ 5,2 M CEU de flota mundial de alta mar (≈ 800 barcos) a mediados de 2026; ingresos mundiales del sector sin estadística pública (estimación propia: 25.000-30.000 M USD) [2]',
    unidad_serie: 'millones de CEU de capacidad de la flota mundial de alta mar (presentación de mercado de la empresa con datos de Clarksons y Veson)',
    serie: [{ anio: '2023', tamano: 4.1 }, { anio: '2024', tamano: 4.4 }, { anio: '2025', tamano: 4.9 }, { anio: '2026e', tamano: 5.3 }, { anio: '2027e', tamano: 5.6 }],
    tcac_historico_pct: 6, tcac_previsto_pct: 7, cr5_pct: 55, estructura: 'Fragmentada',
    drivers: [
      { driver: 'Exportaciones de coches chinos', efecto: '+', horizonte: 'Estructural', evidencia: 'Exportaciones chinas de vehículos ligeros +58 % interanual en el 2T26 y más de 1 M al mes en junio y julio de 2026; la flota de WAWI va llena desde Asia [3, 2].' },
      { driver: 'Oferta de barcos (cartera de pedidos)', efecto: '−', horizonte: 'Cíclico', evidencia: 'Cartera de pedidos del 20,6 % de la flota; la capacidad crece un 8,1 % en 2026 y un 6,4 % en 2027, tras el 13 % de 2025 [2, 1].' },
      { driver: 'Ventas de maquinaria agrícola y de construcción (High & Heavy)', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Carga de más margen; débil en 2025 y recuperación gradual según la empresa [1].' },
      { driver: 'Ineficiencia de rutas (Mar Rojo, Ormuz)', efecto: '+', horizonte: 'Cíclico', evidencia: 'Mar Rojo cerrado y conflicto en Oriente Medio desde febrero de 2026: viajes más largos absorben capacidad [3].' },
      { driver: 'Proteccionismo (aranceles a coches, tasas portuarias)', efecto: '−', horizonte: 'Estructural', evidencia: 'Aranceles de la sección 232 de EE. UU. a coches importados; tasas USTR a operadores de barcos de construcción china (suspendidas hasta el 9-nov-2026); la UE estudia ampliar medidas sobre coches chinos [4, 3].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 4, justificacion: 'Las navieras chinas (BYD, SAIC Anji, COSCO) pasan de 0 a una parte relevante de la flota y de la cartera de pedidos; los japoneses compiten por contratos de los mismos fabricantes [2].' },
      { fuerza: 'Poder de los clientes', intensidad: 4, justificacion: 'Pocos fabricantes grandes (Hyundai-Kia, Toyota, VW, Stellantis, BYD, John Deere) con contratos de varios años; dos clientes son ≈ 18 % de las ventas de WAWI [1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 3, justificacion: 'Astilleros chinos y coreanos con cartera llena; combustible con cláusulas BAF que lo repercuten con retraso [3].' },
      { fuerza: 'Amenaza de entrada', intensidad: 4, justificacion: 'Los propios fabricantes chinos (BYD, SAIC, Chery) encargan sus barcos; un PCTC cuesta ≈ 100-150 M USD y se construye en 2-3 años [2].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 2, justificacion: 'Contenedores para coches y producción local (fábricas chinas en Europa, México, Hungría) reducen el transporte oceánico a largo plazo [2].' },
    ],
    ciclo: { posicion: 'Pico', comentario: 'El ro-ro vivió un ciclo excepcional en 2022-2025 por la escasez de barcos (pocos pedidos en 2015-2021) y el salto de las exportaciones chinas: el fletamento a un año de un PCTC llegó a ≈ 115.000 USD/día (2023-2024) desde ≈ 15.000 en 2019-2020 y hoy está en ≈ 73.000 (3T26) [2, 5]. La flota crece un 13 % en 2025, un 8 % en 2026 y un 6 % en 2027 [1, 2]. El mercado al contado desde Asia está fuerte por las exportaciones chinas y la ineficiencia de rutas, pero los contratos de WAWI se renuevan a tarifas algo menores (flete neto −5 % en el 2T26) y el margen ya baja del 35 % al 28 %. Posición del ciclo: pico que empieza a girar.' },
    regulacion: 'Tasas portuarias de la USTR (sección 301) a operadores de barcos de construcción china: 46 USD por tonelada neta para el ro-ro desde el 14-oct-2025, suspendidas hasta el 9-nov-2026; en el 4T25 costaron a WAWI ≈ 22 M USD antes de repercutirlas [4, 3]. Aranceles de la sección 232 de EE. UU. a los coches importados (25 % y acuerdos bilaterales del 15 % con Japón, Corea y la UE) reducen el volumen hacia EE. UU. [3]. Medioambiente: EU ETS para el transporte marítimo desde 2024, FuelEU Maritime desde 2025 y el marco de cero emisiones de la OMI (aplazado en 2025): favorecen barcos nuevos de combustible dual como los Shaper [1].',
    tendencias: 'Las navieras chinas y los fabricantes chinos (BYD, SAIC Anji, Chery, COSCO) encargan decenas de barcos para llevar sus coches: parte de la demanda nueva no llegará a los operadores tradicionales [2]. Los fabricantes chinos abren fábricas fuera de China (Hungría, Turquía, Brasil, México), lo que a largo plazo reduce el transporte de coches terminados. La descarbonización obliga a renovar flota (metanol, amoniaco, LNG) y favorece a los que tienen balance para hacerlo. La IA y la digitalización se aplican a planificación de flota y logística; no cambian el negocio físico [1].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 15, posicion: 'Uno de los dos o tres mayores operadores de ro-ro de alta mar del mundo (≈ 129 barcos de ≈ 800; ≈ 15 % de la capacidad, estimación propia), y el mayor en logística de vehículos integrada con el transporte en EE. UU. [1, 2]',
    competidores: [
      { nombre: 'NYK Line (Nippon Yusen)', pais: 'Japón', ticker: '9101.T', ingresos: Math.round(YX['9101.T'].ventas * FX.JPY / 1e6), cuota_pct: null, margen_ebit_pct: r1(YX['9101.T'].margen_operativo * 100), comentario: 'Mayor flota de PCTC del mundo junto con WAWI; conglomerado (contenedores vía ONE, graneles, logística) [6].' },
      { nombre: 'Mitsui O.S.K. Lines', pais: 'Japón', ticker: '9104.T', ingresos: Math.round(YX['9104.T'].ventas * FX.JPY / 1e6), cuota_pct: null, margen_ebit_pct: r1(YX['9104.T'].margen_operativo * 100), comentario: 'Gran operador de PCTC dentro de un grupo diversificado [6].' },
      { nombre: 'K Line (Kawasaki Kisen)', pais: 'Japón', ticker: '9107.T', ingresos: Math.round(YX['9107.T'].ventas * FX.JPY / 1e6), cuota_pct: null, margen_ebit_pct: r1(YX['9107.T'].margen_operativo * 100), comentario: 'Operador de PCTC y graneles; participa en ONE [6].' },
      { nombre: 'Höegh Autoliners', pais: 'Noruega', ticker: 'HAUTO.OL', ingresos: Math.round(YX['HAUTO.OL'].ventas / 1e6), cuota_pct: null, margen_ebit_pct: r1(YX['HAUTO.OL'].margen_operativo * 100), comentario: 'El comparable más puro: solo ro-ro, cotiza en Oslo, renueva flota con 12 barcos Aurora [6].' },
      { nombre: 'Hyundai Glovis', pais: 'Corea', ticker: '086280.KS', ingresos: Math.round(YX['086280.KS'].ventas * FX.KRW / 1e6), cuota_pct: null, margen_ebit_pct: r1(YX['086280.KS'].margen_operativo * 100), comentario: 'Logística y transporte del grupo Hyundai; compite con EUKOR por los volúmenes de HMG fuera del contrato [6, 1].' },
      { nombre: 'Navieras chinas (BYD Shipping, SAIC Anji, COSCO, China Merchants)', pais: 'China', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'La mayor parte de la cartera de pedidos mundial; llevan coches de sus propios fabricantes [2].' },
      { nombre: 'Grimaldi (privada)', pais: 'Italia', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Ro-ro de corta y larga distancia; ≈ 10 % de Höegh (2024) [6].' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 2, evidencia: '15 rutas regulares y red de terminales y procesado en EE. UU.: los fabricantes valoran la frecuencia y el servicio de puerta a puerta [1].' },
        { fuente: 'Costes de cambio', puntuacion: 2, evidencia: 'Contratos de 1-5 años integrados con la logística en tierra; pero se licitan y renuevan a precio de mercado [1].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 1, evidencia: 'Bandera estadounidense de ARC para el Gobierno de EE. UU.; nada más relevante [1].' },
        { fuente: 'Ventaja en costes', puntuacion: 2, evidencia: 'Escala de flota y de compra de combustible; los Shaper son más grandes y eficientes, pero los competidores encargan barcos parecidos [2].' },
        { fuente: 'Escala eficiente', puntuacion: 2, evidencia: 'Nicho con pocos operadores grandes, pero la entrada de navieras chinas lo desmiente [2].' },
      ],
    },
    amenazas: 'La mayor amenaza es la oferta: la flota mundial crece ≈ 30 % entre 2025 y 2027 y buena parte de los barcos nuevos los encargan navieras y fabricantes chinos para sus propios coches [2]. Si las exportaciones chinas se frenan (aranceles en la UE y EE. UU., fábricas en el exterior) o se las llevan barcos chinos, las tarifas vuelven al nivel de antes de 2021. Segundo, las tasas portuarias USTR y los aranceles a coches importados en EE. UU., que reducen el volumen hacia el principal mercado de WAWI [4, 3].',
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'Wallenius Wilhelmsen (Lysaker, Noruega) transporta por mar coches, camiones, maquinaria agrícola y de construcción y otra carga rodada en ≈ 129 barcos ro-ro (91 en propiedad) por 15 rutas oceánicas, y presta servicios logísticos en tierra (procesado de vehículos en puertos, 8 terminales marítimas, transporte interior) sobre todo en EE. UU. y México [1, 3]. Nació en 2017 de la fusión de las sociedades que tenían en común la sueca Wallenius Lines (familia Soya) y la noruega Wilh. Wilhelmsen Holding, que siguen teniendo ≈ 73 % del capital. Tiene el 80 % de EUKOR (el transportista de Hyundai y Kia; el 20 % restante es de Hyundai Motor Group) y ARC, con bandera estadounidense, para el Gobierno de EE. UU. [1]. ≈ 8.400 empleados equivalentes a tiempo completo [1].',
    como_gana_dinero: 'Cobra un flete por metro cúbico transportado, pactado en contratos de 1-5 años con los fabricantes (61 USD/m³ netos en el 2T26) más recargos por combustible (cláusulas BAF) [3]. El margen depende de la ocupación de los barcos y de la tarifa media de la cartera de contratos frente al coste del barco (propio o fletado) y del combustible: con la flota llena y tarifas renovadas en el pico, el margen EBITDA llegó al 35 % en 2023-2025 frente al 16-22 % de 2019-2021 [1]. La logística en tierra gana menos (12-16 % de margen EBITDA) pero con contratos más largos (8 años de media) [3]. Reparte casi todo: 50 % del beneficio más extraordinarios [3].',
  },
  huecos: [
    { seccion: 'sector', campo: 'tamaño del mercado en ingresos y cuotas por operador', tipo: 'Complemento', intentos: '1) informe anual 2025 (solo flota y crecimiento); 2) presentación de mercado de sep-2026 (flota por operador sin ingresos); 3) búsqueda web (Clarksons y Veson, de pago)', decision: 'Se mide en CEU de flota y la cuota es una estimación propia' },
  ],
  fuentes: fB,
};
guarda('B', B_);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Annual Report 2025: consejo, dirección, gobierno corporativo, accionistas, remuneración', editor: 'Wallenius Wilhelmsen ASA (Oslo Børs)', tipo: 'Primaria', fecha: '2026-03-19', url: ATT(668797, 321619) },
  { id: 2, titulo: 'Minutes of Annual General Meeting 2026 y resultado de votaciones (punto 6: directrices de remuneración 89,26 % a favor y 9,70 % en contra)', editor: 'Wallenius Wilhelmsen ASA (Oslo Børs)', tipo: 'Primaria', fecha: '2026-04-29', url: NW(671881) },
  { id: 3, titulo: 'Remuneration report 2024 (consejero delegado: 1,489 M USD)', editor: 'Wallenius Wilhelmsen ASA', tipo: 'Primaria', fecha: '2025-04-04', url: NW(643065) },
  { id: 4, titulo: 'Guidelines for remuneration of leading persons 2026', editor: 'Wallenius Wilhelmsen ASA', tipo: 'Primaria', fecha: '2026-04-01', url: NW(669927) },
  { id: 5, titulo: 'Recommendation of the nomination committee 2026 (Lieve Logghe sustituye a Marianne Lie / Alestig)', editor: 'Wallenius Wilhelmsen ASA', tipo: 'Primaria', fecha: '2026-04-01', url: NW(669927) },
  { id: 6, titulo: 'Mandatory notifications of trade: WWH suscribe 2,85 M de acciones a 168 NOK (6-oct-2026); Groth y Hestvik compran (13-may-2025); transferencia del consejero delegado (19-sep-2025); LTI (18-may-2026)', editor: 'Wallenius Wilhelmsen ASA (Oslo Børs)', tipo: 'Primaria', fecha: '2026-10-06', url: NW(683663) },
  { id: 7, titulo: 'Contemplated private placement (Wallenius Lines no participa; WWH 37,9 %)', editor: 'Wallenius Wilhelmsen ASA (Oslo Børs)', tipo: 'Primaria', fecha: '2026-10-06', url: NW(683650) },
  { id: 8, titulo: 'Guías anuales y resultados 2023-2026 (comunicados de resultados y de perspectivas)', editor: 'Wallenius Wilhelmsen ASA (Oslo Børs)', tipo: 'Primaria', fecha: '2026-08-11', url: NW(661948) },
];
const C = {
  _estado: 'Completa. Informe anual 2025, acta y votos de la junta de 2026 (escaneados, leídos como imagen), informe de remuneración 2024 (el de 2025 no se encontró), notificaciones de operaciones de 12 meses.',
  directivos: {
    equipo: [
      { nombre: 'Lasse Kristoffersen', cargo: 'Consejero delegado', desde: '2021', participacion_pct: 0.01, trayectoria: 'Antes consejero delegado de Tschudi Shipping y de Wilh. Wilhelmsen Holding en distintos puestos. Llegó en 2021 al final del covid y ha llevado la empresa por el mejor ciclo de su historia: deuda neta de 7,5 a 1,2 veces el EBITDA y dividendos de 2.089 M en tres años [1].' },
      { nombre: 'Bjørnar Bukholm', cargo: 'Director financiero', desde: '2024', participacion_pct: null, trayectoria: 'Director financiero desde 2024; antes en el área financiera del grupo [1].' },
      { nombre: 'John Felitto', cargo: 'Director comercial (CCO)', desde: '2026', participacion_pct: null, trayectoria: 'Nombrado el 15-oct-2026; sustituye a Pia Synnerman [1].' },
      { nombre: 'Michael Hart', cargo: 'Responsable de Shipping services', desde: '2023', participacion_pct: null, trayectoria: 'Dirige el transporte marítimo [1].' },
    ],
    historial_guidance: [
      { anio: '2025', guia: 'EBITDA ajustado por encima de 2024 (suspendida el 13-oct-2025 por las tasas USTR); el 15-dic, ≈ 50 M menos en el 4T que en el 3T', real: '1.811 M USD ajustado', cumplida: 'Parcial' },
      { anio: '2026', guia: 'EBITDA ajustado de 1.650-1.750 M (15-dic-2025), rebajada a ≈ 1.600 M el 6-may-2026', real: 'En curso: 750 M en el primer semestre y 420-450 M guiados para el 3T', cumplida: 'Parcial' },
    ],
    comentario: 'Equipo con buena ejecución operativa y financiera en el pico: bajó deuda, renovó contratos largos y mejoró la logística (mejor trimestre desde el covid en el 2T26) [1, 8]. La guía de 2026 se rebajó a los cuatro meses por el combustible y el conflicto de Oriente Medio, y la de 2025 se suspendió por las tasas USTR: la visibilidad es limitada, como en cualquier naviera [8]. Cambios: nuevo director comercial (octubre de 2026) y nueva consejera (Lieve Logghe) que sustituye a quien presidía la comisión de auditoría [1, 5].',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Rune Bjerke', cargo: 'Presidente', tipo: 'Independiente', desde: '2020', comisiones: 'Remuneración (presidente)' },
      { nombre: 'Thomas Wilhelmsen', cargo: 'Consejero', tipo: 'Dominical', desde: '2017', comisiones: 'Remuneración' },
      { nombre: 'Hans Åkervall', cargo: 'Consejero', tipo: 'Dominical', desde: '2022', comisiones: 'Auditoría' },
      { nombre: 'Yngvil Eriksson Åsheim', cargo: 'Consejera', tipo: 'Independiente', desde: '2021', comisiones: '—' },
      { nombre: 'Magnus Groth', cargo: 'Consejero', tipo: 'Independiente', desde: '2023', comisiones: 'Auditoría' },
      { nombre: 'Line Hestvik', cargo: 'Consejera', tipo: 'Independiente', desde: '2024', comisiones: '—' },
      { nombre: 'Lieve Logghe', cargo: 'Consejera', tipo: 'Otro', desde: '2026', comisiones: 'Auditoría' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: true, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: true, presidente_vinculado_control: false, cambios_cupula_24m: 1,
    voto_remuneracion_pct: 89.26, voto_remuneracion_contra_pct: 9.70, voto_remuneracion_contra_libre_pct: 61, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2024', total: 1.49, fijo: 0.67, variable_corto: 0.37, variable_largo: 0.31, ratio_salario_medio: 19 },
    remuneracion: 'El consejero delegado cobró 1,49 M USD en 2024: 0,67 M de fijo, 0,14 M de beneficios y pensión, 0,37 M de variable anual (ligado a dividendo, EBITDA y ROCE) y 0,31 M de incentivo a largo plazo en acciones (ROCE, capitalización, estrategia y sostenibilidad) [3, 4]. Es poco para una empresa de 8.000 M USD de capitalización: unas 19 veces el coste medio por empleado (79.300 USD) [3]. El variable premia el EBITDA y el ROCE de cada año, que dependen del ciclo más que de la gestión. En la junta de 2026 las directrices de remuneración tuvieron el 89,26 % a favor y el 9,70 % en contra del capital representado; como los dos grandes accionistas (320 M de acciones) votan a favor, ese 9,70 % es el 61 % del capital libre presente: el flotante votó mayoritariamente en contra [2]. El informe de remuneración tuvo un 2,17 % en contra (13,6 % del libre) [2].',
    accionistas: [
      { nombre: 'Wilh. Wilhelmsen Holding ASA (familia Wilhelmsen)', pct: 37.0, tipo: 'Estratégico', variacion: '37,87 % antes de la colocación; suscribió 2,85 M de acciones nuevas' },
      { nombre: 'Wallenius Lines AB (Rederi AB Soya, familia Wallenius-Soya)', pct: 36.3, tipo: 'Estratégico', variacion: '37,82 % antes de la colocación; no participó' },
      { nombre: 'Folketrygdfondet y otros fondos noruegos', pct: null, tipo: 'Institucional', variacion: 'Sin dato del registro a la fecha' },
      { nombre: 'Flotante', pct: 26.7, tipo: 'Institucional', variacion: '+4 puntos con la colocación' },
    ],
    insiders: [
      { fecha: '2026-10-06', persona: 'Wilh. Wilhelmsen Holding (asociada a Thomas Wilhelmsen, consejero)', operacion: 'Compra', acciones: 2850000, importe: 51.2 },
      { fecha: '2026-05-18', persona: 'Lasse Kristoffersen (consejero delegado) y directivos', operacion: 'Entrega LTI', acciones: 76555, importe: null },
      { fecha: '2025-09-18', persona: 'Lasse Kristoffersen (consejero delegado)', operacion: 'Traspaso a sociedad propia', acciones: 28100, importe: null },
      { fecha: '2025-05-13', persona: 'Magnus Groth (consejero)', operacion: 'Compra', acciones: 13000, importe: null },
      { fecha: '2025-05-13', persona: 'Line Hestvik (consejera)', operacion: 'Compra', acciones: 4000, importe: null },
    ],
    control_y_defensas: 'Dos familias navieras controlan juntas ≈ 73 % del capital: Wilh. Wilhelmsen Holding (≈ 37 %) y Wallenius Lines, de Rederi AB Soya (≈ 36 %) [1, 7]. No hay un pacto de sindicación publicado, pero cada una tiene un consejero (Thomas Wilhelmsen y Hans Åkervall) y juntas deciden cualquier operación; una OPA sin su acuerdo es imposible. Una acción, un voto. El presidente (Rune Bjerke) y cuatro de siete consejeros son independientes [1]. Operaciones vinculadas: servicios de gestión técnica de barcos, seguros y agencia con sociedades del grupo Wilhelmsen (Wilhelmsen Ship Management, Wilhelmsen Ships Service) y fletamentos con Wallenius Marine; la empresa dice que son a precio de mercado [1]. En la colocación de octubre de 2026 Wallenius Lines no participó «por el tamaño de su inversión en transporte marítimo dentro de su cartera», una señal de que una de las dos familias no quiere aumentar su exposición [7].',
    alertas: [
      'El flotante votó en contra de las directrices de remuneración en la junta de 2026 (61 % del capital libre presente) [2].',
      'Wallenius Lines (≈ 36 %) no acudió a la ampliación de octubre de 2026 y WWH prestó acciones para liquidarla; ninguna compra de los grandes accionistas en mercado [7, 6].',
      'Ampliación de capital sin derecho de suscripción preferente al 4 % del capital, días después de pagar un dividendo de 258 M [6, 1].',
    ],
    confianza: 'Media',
  },
  huecos: [
    { seccion: 'gobierno', campo: 'informe de remuneración 2025 y votos de la junta de 2024', tipo: 'Complemento', intentos: '1) web de inversores (sección de gobierno); 2) comunicados de Oslo Børs de abr-2026; 3) búsqueda web', decision: 'Se usan el informe de 2024 y los votos de 2025-2026' },
  ],
  fuentes: fC,
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de WAWI.OL, OSEBX y SEA (precio, rango, rentabilidades, beta, cierres de ejercicio): herramienta bolsa.mjs', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/WAWI.OL/history' },
  { id: 2, titulo: 'Wallenius Wilhelmsen: consenso de analistas (5 analistas: ingresos, EBITDA, EBIT, BPA y dividendo 2026-2028; objetivo medio 17,46 USD)', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-21', url: 'https://www.marketscreener.com/quote/stock/WALLENIUS-WILHELMSEN-ASA-6340571/finances/' },
  { id: 3, titulo: 'Consenso de WAWI y comparables (BPA por ejercicio, recomendaciones, objetivos, capitalización, deuda, caja): quoteSummary', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/WAWI.OL/analysis' },
  { id: 4, titulo: 'Daily Treasury Par Yield Curve Rates 2026 (10 años: 5,12 % el 20-oct-2026)', editor: 'U.S. Department of the Treasury', tipo: 'Primaria', fecha: '2026-10-20', url: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve&field_tdr_date_value=2026' },
  { id: 5, titulo: 'Implied ERP by month (ERPbymonth.xlsx): octubre de 2026, 4,20 %', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 6, titulo: 'Tipos de cambio diarios USD/NOK (9,3573 NOK por USD el 21-oct-2026; cierres de cada año)', editor: 'Norges Bank', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://www.norges-bank.no/en/topics/Statistics/exchange_rates/?tab=currency&id=USD' },
  { id: 7, titulo: 'Private placement successfully completed (17,145 M de acciones a 168 NOK; 440.249.938 acciones)', editor: 'Wallenius Wilhelmsen ASA (Oslo Børs)', tipo: 'Primaria', fecha: '2026-10-06', url: NW(683662) },
  { id: 8, titulo: 'Quarterly report Q2 2026 y comunicado de resultados (guía 2026 ≈ 1.600 M; dividendo de 0,61 USD)', editor: 'Wallenius Wilhelmsen ASA', tipo: 'Primaria', fecha: '2026-08-11', url: NW(679374) },
  { id: 9, titulo: 'Cambios de objetivo y recomendación de los analistas noruegos (Nordea 200 NOK, Pareto 204, SB1 155, Fearnley 159, SEB 150, DNB Carnegie 150, Arctic 149)', editor: 'MarketScreener / Finansavisen', tipo: 'Analistas', fecha: '2026-10-15', url: 'https://www.marketscreener.com/quote/stock/WALLENIUS-WILHELMSEN-ASA-6340571/consensus/' },
  { id: 10, titulo: 'Movimiento del precio de WAWI.OL (1-12 meses, máximos, media de 200, avisos P1-P5): herramienta movimiento.mjs', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/WAWI.OL/history' },
  { id: 11, titulo: 'US port fees impact 2025 outlook; 2026 Financial Year Outlook', editor: 'Wallenius Wilhelmsen ASA (Oslo Børs)', tipo: 'Primaria', fecha: '2025-12-15', url: NW(661948) },
  { id: 12, titulo: 'Comunicados de Oslo Børs de oct-2025 a oct-2026 (contratos, dividendos, EUKOR, Ormuz, colocación)', editor: 'Wallenius Wilhelmsen ASA (Oslo Børs)', tipo: 'Primaria', fecha: '2026-10-19', url: 'https://newsweb.oslobors.no/search?issuer=WAWI' },
  { id: 13, titulo: 'Quarterly report Q1 2026 (rebaja de la guía 2026 a ≈ 1.600 M)', editor: 'Wallenius Wilhelmsen ASA (Oslo Børs)', tipo: 'Primaria', fecha: '2026-05-06', url: NW(672451) },
  { id: 14, titulo: 'Quarterly report Q3 2025 (tasas USTR, suspensión de un año desde el 10-nov-2025)', editor: 'Wallenius Wilhelmsen ASA (Oslo Børs)', tipo: 'Primaria', fecha: '2025-11-05', url: NW(658737) },
  { id: 15, titulo: 'Quarterly report Q4 2025 y comunicado (dividendo de 1,01 USD; guía 2026)', editor: 'Wallenius Wilhelmsen ASA (Oslo Børs)', tipo: 'Primaria', fecha: '2026-02-11', url: NW(665330) },
];
// Comparables: PER de los próximos 12 meses con el BPA del consenso de Yahoo (ejercicio en curso y siguiente; pesos 0,19/0,81
// con cierre en diciembre y 0,44/0,56 para los japoneses, que cierran en marzo), todo en la divisa de cada cotización.
const comp = (nombre, ticker, pais, precio, divP, b0, b1, divB, w0, nota) => {
  const ntmUSD = (w0 * b0 + (1 - w0) * b1) * FX[divB];
  const pUSD = precio * FX[divP];
  const x = YX[ticker] ?? {};
  const capUSD = x.cap ? x.cap * FX[divP] / 1e6 : null;
  const fxC = FX[x.divisa_cuentas ?? divP];
  const ev = capUSD != null && x.deuda != null ? capUSD + (x.deuda - (x.caja ?? 0)) * fxC / 1e6 : null;
  const ebitda = x.ebitda ? x.ebitda * fxC / 1e6 : null;
  return { nombre, ticker, pais, capitalizacion: capUSD == null ? null : Math.round(capUSD), ev_ventas: null, ev_ebitda_ltm: ev && ebitda && divP !== 'JPY' ? r1(ev / ebitda) : null, ev_ebitda_ntm: null, per_ntm: r1(pUSD / ntmUSD), crecimiento_pct: x.crec_ventas != null ? r1(x.crec_ventas * 100) : null, margen_ebitda_pct: x.margen_ebitda != null ? r1(x.margen_ebitda * 100) : null, roic_pct: null, dn_ebitda: ebitda && x.deuda != null ? r1((x.deuda - (x.caja ?? 0)) * fxC / 1e6 / ebitda) : null, fcf_yield_pct: x.fcf != null && capUSD ? r1(x.fcf * fxC / 1e6 / capUSD * 100) : null, _nota: nota };
};
const comps = [
  comp('Höegh Autoliners', 'HAUTO.OL', 'NO', 184.2, 'NOK', 1.949, 2.095, 'USD', 0.19, 'ro-ro puro'),
  comp('Hyundai Glovis', '086280.KS', 'KR', 183300, 'KRW', 22037, 25283, 'KRW', 0.19, 'logística y ro-ro'),
  comp('NYK Line', '9101.T', 'JP', 7325, 'JPY', 675, 584, 'JPY', 0.44, 'conglomerado naviero'),
  comp('Mitsui O.S.K. Lines', '9104.T', 'JP', 7469, 'JPY', 910, 685, 'JPY', 0.44, 'conglomerado naviero'),
  comp('K Line', '9107.T', 'JP', 3434, 'JPY', 293, 227, 'JPY', 0.44, 'conglomerado naviero'),
  comp('A.P. Møller-Mærsk', 'MAERSK-B.CO', 'DK', 23730, 'DKK', 485.6, 166.3, 'USD', 0.19, 'contenedores (ciclo marítimo)'),
  comp('COSCO Shipping Holdings', '1919.HK', 'CN', 16.79, 'HKD', 2.70, 1.276, 'CNY', 0.19, 'contenedores (naviera china)'),
].map(({ _nota, ...c }) => c);
const perMed = (() => { const v = comps.map((x) => x.per_ntm).sort((a, b) => a - b); const n = v.length; return n % 2 ? v[(n - 1) / 2] : r1((v[n / 2 - 1] + v[n / 2]) / 2); })();
const precioUSD = r2(174.8 * TC);
const cierresNOK = Object.fromEntries(B.cierres_ejercicio.map((x) => [x.anio, x.precio_cierre]));
const usdnokFin = { 2020: 8.5326, 2021: 8.8194, 2022: 9.8573, 2023: 10.1724, 2024: 11.3534, 2025: 10.0791 };
const cierresUSD = Object.fromEntries(Object.keys(usdnokFin).map((a) => [a, r2(cierresNOK[a] / usdnokFin[a])]));
const D = {
  _estado: `Completa. Precio de cierre del 21-oct-2026 en Oslo (174,80 NOK = ${n2(precioUSD)} USD con 9,3573 NOK por USD de Norges Bank). Mediana del PER NTM de los comparables: ${perMed}.`,
  _per_mediana_comparables: perMed,
  _cierres_usd: cierresUSD,
  identificacion: {
    nombre: 'Wallenius Wilhelmsen ASA', nombre_corto: 'Wallenius Wilhelmsen', ticker: 'WAWI', isin: 'NO0010571680', mercado: 'Euronext Oslo Børs', indice_referencia: 'Oslo Børs Benchmark Index (OSEBX)',
    pais: 'Noruega', pais_iso: 'NO', sector: 'Industria', industria: 'Transporte marítimo (ro-ro) y logística de vehículos', sede: 'Lysaker (Noruega)', fundacion: '2017 (fusión; raíces de 1861 y 1934)', empleados: 8376, web: 'https://www.walleniuswilhelmsen.com',
    precio: precioUSD, fecha_precio: '2026-10-21', acciones: 440.02, capitalizacion_publicada: Math.round(Y['WAWI.OL'].cap * TC / 1e6), free_float_pct: 26.7,
    max_52s: r2(186 * TC), min_52s: r2(75.1 * TC), volumen_medio_diario: `≈ ${Math.round(B.volumen_3m.importe_dia_millones)} M NOK/día (≈ ${Math.round(B.volumen_3m.importe_dia_millones * TC)} M USD; 3 meses)`, proximos_resultados: '2026-11-04',
  },
  consenso: {
    guidance: 'Guía 2026: EBITDA ajustado de ≈ 1.600 M USD (15-dic-2025: 1.650-1.750 M; rebajada el 6-may-2026 por el combustible y la incertidumbre) y 420-450 M para el 3T26 (6-oct-2026) [13, 7, 11]. Sin guía de 2027. La dirección dice que el mercado sigue «muy tenso», que la flota va llena desde Asia y que el 40 % del volumen de 2027 se renegocia en el segundo semestre de 2026 con tarifas al contado ≈ 80 % por encima de hace un año en Asia-Europa [8, 7]. Tasas USTR suspendidas hasta el 9-nov-2026 [14].',
    estimaciones: [
      { periodo: '2026e', ingresos: 5332, ebitda: 1605, ebit: 923, bpa: 1.63, dpa: 1.35, fuente: 'MarketScreener, 5 analistas [2]' },
      { periodo: '2027e', ingresos: 5408, ebitda: 1660, ebit: 977, bpa: 1.75, dpa: 1.28, fuente: 'MarketScreener, 5 analistas [2]' },
      { periodo: '2028e', ingresos: 5250, ebitda: 1528, ebit: 817, bpa: 1.43, dpa: 1.12, fuente: 'MarketScreener [2]' },
    ],
    recomendaciones: { n_analistas: 5, comprar: 2, mantener: 3, vender: 0, po_medio: 17.46, po_min: 12.54, po_max: 21.97 },
    revisiones: 'El BPA de 2027 del consenso de Yahoo subió de 1,29 USD hace 90 días a 1,75 hoy, tras el 2T26 y la tensión del mercado desde Asia [3]. Objetivos (NOK): Nordea 200 (comprar, 15-oct), Pareto 204 (comprar, 14-sep); tras el 2T26 (12-ago) SB1 155 (neutral), Fearnley 159 (mantener), SEB 150 (mantener), DNB Carnegie 150 (mantener) y Arctic 149 (baja a mantener) [9]. MarketScreener da 5 analistas con «outperform» y objetivo medio de 17,46 USD (≈ 163 NOK), un 7 % bajo el precio [2]. Yahoo: 1 compra fuerte, 1 compra y 3 mantener [3]. La acción salió del OBX (índice de las 25 más líquidas) el 20-sep-2026 [12].',
    base_ebitda: 'misma base que las cuentas del informe (EBITDA sin no recurrentes ni participadas)', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    ...B.bolsa,

    beta: 1.2, posicion_corta_pct: null,
    comentario: 'La acción ha multiplicado por 7,5 su precio desde el cierre de 2020 (23,2 NOK) y sube un 130 % con dividendos en un año frente al 29 % del OSEBX [1]. Rentabilidad total anual del 50 % a cinco años, con caídas fuertes en medio (−43 % de septiembre de 2024 a abril de 2025, con los aranceles de EE. UU. y las tasas USTR) [1]. Beta mensual de 1,2 frente al OSEBX (1,54 semanal a dos años) y volatilidad del 33 % [1]. En el último año la subida se apoya en tres cosas: la suspensión de las tasas USTR (noviembre de 2025), el mercado tenso desde Asia (exportaciones chinas) y las subidas de objetivo; las caídas fuertes son los días de dividendo y la colocación [10, 12].',
    contexto: {
      movimiento: { fecha: '2026-10-21', var_1m_pct: -3.7, var_3m_pct: 20.1, var_6m_pct: 50.9, var_12m_pct: 128.8, dist_max_52s_pct: -5.1, dist_min_52s_pct: 130.3, dist_max_historico_pct: -5.1, tendencia: 'alcista', volatilidad_60d_pct: 34, avisos: [] },
      movimientos_fuertes: [
        { periodo: 'nov 2025', var_pct: 15.0, causa: 'EE. UU. suspende un año las tasas portuarias USTR (desde el 10-nov-2025) tras el acuerdo comercial con China, y resultados del 3T25 mejores de lo esperado (5-nov) [14, 12].', veredicto: 'no cambia', condicion: null },
        { periodo: 'feb 2026', var_pct: 17.7, causa: 'Resultados del 4T25 y dividendo de 1,01 USD (11-feb); mercado tenso desde Asia [15].', veredicto: 'no cambia', condicion: null },
        { periodo: 'may 2026', var_pct: -12.3, causa: 'Rebaja de la guía de 2026 a ≈ 1.600 M por el combustible y el conflicto de Oriente Medio (6-may) [13].', veredicto: 'no cambia', condicion: null },
        { periodo: 'jul-sep 2026', var_pct: 38, causa: 'Tres meses de +10-12,5 %: exportaciones chinas récord (más de 1 M de coches al mes), tarifas al contado al alza, resultados del 2T26 y dividendo de 0,61 USD (11-ago), presentación de mercado (24-sep) y subidas de objetivo (Pareto 204 NOK) [8, 9, 12].', veredicto: 'no cambia', condicion: null },
        { periodo: 'oct 2026', var_pct: -7.2, causa: 'Colocación de 17,1 M de acciones a 168 NOK (6-oct) para encargar 4 barcos LNG grandes: −7,2 % el 7-oct [7].', veredicto: 'no cambia', condicion: null },
      ],
      noticias: [
        { fecha: '2026-11-09', tipo: 'demanda o regulador', hecho: 'Vence la suspensión de un año de las tasas portuarias USTR a barcos de construcción china (46 USD por tonelada neta); vuelven el 10-nov si no se prorroga [14].', veredicto: 'retrasa', condicion: 'Esperar a saber si EE. UU. prorroga la suspensión de las tasas USTR (vence el 9-nov-2026)' },
        { fecha: '2026-11-04', tipo: 'resultados', hecho: 'Resultados del 3T26 (guía de 420-450 M de EBITDA ajustado) y primeras señales de las renovaciones del 40 % del volumen de 2027 [7].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-15', tipo: 'directivos', hecho: 'Nuevo director comercial (John Felitto) [12].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-06', tipo: 'deuda o capital', hecho: 'Colocación de 17,145 M de acciones a 168 NOK (≈ 300 M USD; 4 % del capital) para 4 barcos LNG grandes con entrega en 2030 y 8 opciones; Wallenius Lines no participa; bloqueo de 6 meses de la empresa [7].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-09-20', tipo: 'otro', hecho: 'Sale del índice OBX [12].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-08-11', tipo: 'resultados', hecho: '2T26: EBITDA ajustado de 361 M (−24 %), dividendo de 0,61 USD (82 % del beneficio), guía de 2026 mantenida [8].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-06-30', tipo: 'otro', hecho: 'El Morning Concert sale del estrecho de Ormuz tras quedar atrapado por el conflicto de Oriente Medio [12].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-06-24', tipo: 'otro', hecho: 'Extensión de contrato con un fabricante europeo hasta 2031 (≈ 420 M USD más) [12].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-05-06', tipo: 'resultados', hecho: 'Rebaja de la guía de 2026 de 1.650-1.750 M a ≈ 1.600 M [13].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-04-07', tipo: 'deuda o capital', hecho: 'Acuerdo con Hyundai Motor Group: su opción de venta del 20 % de EUKOR no se ejerce mientras dure el contrato de transporte; el pasivo baja de 897 a 386 M [12].', veredicto: 'no cambia', condicion: null },
        { fecha: '2025-10-13', tipo: 'demanda o regulador', hecho: 'Tasas USTR de 46 USD por tonelada neta desde el 14-oct-2025; la empresa suspende la guía de 2025 [11].', veredicto: 'no cambia', condicion: null },
      ],
      proximos_resultados: '2026-11-04',
      veredicto: 'retrasa',
      condicion: 'Esperar a los resultados del 4-nov-2026 y a la decisión de EE. UU. sobre las tasas portuarias USTR (la suspensión vence el 9-nov-2026)',
      comentario: 'La acción sube un 129 % en doce meses y un 51 % en seis, a un 5 % del máximo de cinco años y un 27 % sobre la media de 200 sesiones; la herramienta no da avisos P (la subida de tres meses, +20 %, queda justo por debajo del umbral) [10]. La subida tiene causa: suspensión de las tasas USTR, exportaciones chinas récord y tarifas al contado al alza [14, 8]. Pero hay un hecho con fecha que puede mover el precio más de un 5 %: la suspensión de las tasas portuarias USTR vence el 9-nov-2026, cinco días después de los resultados del 3T (4-nov). Si vuelven, costarían de nuevo ≈ 20-25 M al trimestre antes de repercutirlos y cambiarían rutas [11, 14]. Veredicto: retrasa cualquier compra hasta conocer las dos cosas; no cambia una señal de venta.',
    },
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: ['2020', '2021', '2022', '2023', '2024', '2025'].map((a) => ({ anio: a, precio_cierre: cierresUSD[a], ev_ebitda_ntm: null, per_ntm: null, excluir: a === '2020' })),
    comentario: `Precio de cierre de cada ejercicio en Oslo (Yahoo [1]) pasado a USD con el tipo de Norges Bank del último día hábil del año [6]: ${Object.entries(cierresUSD).map(([a, p]) => `${a} ${n2(p)}`).join('; ')} USD. El PER al cierre de 2020 no tiene sentido (pérdida de 0,68 USD por acción). En base adelantada (precio de cierre ÷ BPA real del año siguiente), la acción cotizó a 3,4-4,9 veces en 2021-2024, cuando el mercado ya veía beneficios de pico y descontaba que no durarían; al cierre de 2025, a ≈ 6 veces nuestro 2026e, y hoy a ≈ 11 veces nuestro 2027e: el múltiplo se ha más que duplicado mientras el beneficio baja.`,
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Navieras con negocio ro-ro (Höegh Autoliners, el único puro y cotizado; NYK, MOL y K Line, que tienen las otras grandes flotas de PCTC dentro de conglomerados; Hyundai Glovis, logística y ro-ro del grupo Hyundai) y dos navieras de contenedores como referencia del ciclo marítimo (Maersk, COSCO) [3]. Hapag-Lloyd queda fuera (BPA de 2027 negativo). PER de los próximos 12 meses con el BPA del consenso de Yahoo en la divisa de cada empresa; EV/EBITDA con la capitalización, deuda y caja de Yahoo ; en los japoneses el EBITDA de Yahoo no incluye su parte de ONE (contenedores), el grueso de su beneficio, y su EV/EBITDA no se usa. El EV/ventas no se usa: mezcla logística de margen bajo (Glovis) y transporte.',
    empresas: comps,
    comentario: `WAWI cotiza a ≈ 10,7 veces el BPA de los próximos 12 meses del consenso (≈ 11 veces el nuestro), por encima de Höegh (${n2(comps[0].per_ntm)}x), de Hyundai Glovis (${n2(comps[1].per_ntm)}x) y de la mediana de los comparables (${n2(perMed)}x) [3]. Los japoneses (${n2(comps[2].per_ntm)}-${n2(comps[4].per_ntm)}x) mezclan negocios. Höegh es el comparable más limpio: misma exposición, mismas exportaciones chinas, y el mercado le da un PER algo menor con un margen EBITDA más alto (${n2(comps[0].margen_ebitda_pct)} %). La prima de WAWI puede reflejar la logística en tierra y la cartera de contratos más larga, pero también un precio que ya descuenta mucho. Mediana de los comparables: ${n2(perMed)}x.`,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2025-05', objetivo: 'MIRRAT (logística de maquinaria, Australia)', comprador: 'Qube Holdings', ev: 210, ev_ventas: r2(210 / 80), ev_ebitda: null, prima_pct: null, excluir: true, comentario: '332,5 M AUD; ventas anuales ≈ 80 M USD; sin EBITDA publicado [12].' },
      { fecha: '2026-10', objetivo: '4,0 % del capital de WAWI (colocación)', comprador: 'Inversores institucionales y WWH', ev: null, ev_ventas: null, ev_ebitda: null, prima_pct: -4.0, excluir: true, comentario: '168 NOK por acción, un 4 % bajo el cierre previo; no es una compra de control [7].' },
    ],
    comentario: 'No hay compras recientes de navieras ro-ro con múltiplo publicado: el sector se mueve por compras de barcos sueltos (valor de segunda mano y de nuevos), no de empresas. Con dos familias que controlan el 73 %, una OPA sobre WAWI es improbable; el valor de control no es relevante.',
    confianza: 'Baja',
  },
  huecos: [
    { seccion: 'transacciones', campo: 'compras de navieras ro-ro con EV/EBITDA publicado', tipo: 'Complemento', intentos: '1) informes anuales de WAWI y Höegh; 2) búsqueda web de operaciones 2020-2026; 3) notas de prensa de Qube (MIRRAT, sin EBITDA)', decision: 'Peso cero en la valoración' },
    { seccion: 'consenso', campo: 'BPA de 2029e', tipo: 'Complemento', intentos: '1) MarketScreener (hasta 2028); 2) Yahoo (dos ejercicios); 3) informes de analistas noruegos (de pago)', decision: 'Omitido' },
  ],
  fuentes: fD,
};

guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Nordnet Social: mensajes sobre Wallenius Wilhelmsen (oct-2026)', editor: 'Nordnet', tipo: 'Foros y redes', fecha: '2026-10-21', url: 'https://www.nordnet.no/aksjer/kurser/wallenius-wilhelmsen-wawi-xosl' },
  { id: 2, titulo: 'TradingView: ideas y comentarios sobre OSL:WAWI', editor: 'TradingView', tipo: 'Foros y redes', fecha: '2026-10-21', url: 'https://www.tradingview.com/symbols/OSL-WAWI/' },
  { id: 3, titulo: 'Simply Wall St: valores razonables de la comunidad (70-163 NOK)', editor: 'Simply Wall St', tipo: 'Foros y redes', fecha: '2025-12', url: 'https://simplywall.st/stocks/no/transportation/ob-wawi/wallenius-wilhelmsen-shares' },
];
const E = {
  _estado: 'Completa con pocas fuentes: el debate de particulares sobre WAWI es escaso y en noruego; Reddit y Stocktwits sin mensajes útiles.',
  sentimiento: {
    tono: 'Mixto', tendencia: 'Mejorando',
    revisadas: [
      { plataforma: 'Nordnet Social', fecha: '2026-10', n_comentarios: 5, tono: 'Mixto', resumen: 'Comentan el objetivo de Nordea (200 NOK), la colocación («venta de un gran accionista»), comprar en caídas hacia 167 NOK y el riesgo de aranceles de la UE a coches chinos [1].' },
      { plataforma: 'TradingView', fecha: '2026-10', n_comentarios: 4, tono: 'Positivo', resumen: 'Una idea alcista técnica (ruptura de máximos) y tres comentarios breves [2].' },
      { plataforma: 'Simply Wall St (comunidad)', fecha: '2025-12', n_comentarios: 6, tono: 'Negativo', resumen: 'Valores razonables de la comunidad de 70 a 163 NOK, todos por debajo del precio actual, con el argumento del ciclo y la cartera de pedidos [3].' },
    ],
    temas: [
      { tema: 'Exportaciones chinas y mercado tenso', postura: 'Alcista', peso: 'Alto', contraste: 'Los datos lo apoyan a corto plazo (flota llena, +58 % en el 2T26), pero la cartera de pedidos es del 20 % de la flota y la mitad es china [1].' },
      { tema: 'Colocación y familias', postura: 'Bajista', peso: 'Medio', contraste: 'Wallenius Lines no acudió y WWH prestó acciones: se lee como señal de que el precio es bueno para vender capital [1].' },
      { tema: 'Aranceles (UE, EE. UU.) y tasas USTR', postura: 'Bajista', peso: 'Medio', contraste: 'Riesgo real y con fecha (9-nov-2026) [1].' },
    ],
    lectura: 'Sentimiento mixto que mejora con el precio: los particulares noruegos siguen la acción por el dividendo y las exportaciones chinas, y los analistas suben objetivos (Nordea, Pareto) [1]. No hay euforia visible ni capitulación; el debate es pequeño. Opiniones, no datos: ninguna cifra sale de aquí.',
    confianza: 'Baja',
  },
  huecos: [],
  fuentes: fE,
};
guarda('E', E);
console.log('Notas A-E escritas. Precio USD', precioUSD, 'Mediana PER comparables:', perMed, comps.map((x) => `${x.ticker} ${x.per_ntm} EV/EBITDA ${x.ev_ebitda_ltm}`).join(', '));
console.log('Cierres USD', cierresUSD);
