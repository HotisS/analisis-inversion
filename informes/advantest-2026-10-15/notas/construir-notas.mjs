// Escribe las notas A-E de Advantest (6857.T, corte 2026-10-15) a partir de los resultados anuales y trimestrales
// (IFRS, JPY), el informe integrado 2025, la guía del inversor de julio de 2026, bolsa.mjs, MarketScreener,
// Stock Analysis y foros. Cada nota cita solo con [n] de su propia lista. Ejecutar: node notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const BOLSA = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const R = 'https://www.advantest.com/document/en/investors/ir-library/result';
const N = 'https://www.advantest.com/en/news/2026';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'FY2025 Consolidated Financial Results (ejercicio a 31-mar-2026; cuenta, balance, flujos, segmentos, geografías, guía FY2026)', editor: 'Advantest Corporation', tipo: 'Primaria', fecha: '2026-04-27', url: `${R}/E_FR_FY2025_FN.pdf` },
  { id: 2, titulo: 'FY2024 Consolidated Financial Results (ejercicio a 31-mar-2025)', editor: 'Advantest Corporation', tipo: 'Primaria', fecha: '2025-04-25', url: `${R}/E_FR_FY2024_FN.pdf` },
  { id: 3, titulo: 'FY2023 Consolidated Financial Results (ejercicio a 31-mar-2024)', editor: 'Advantest Corporation', tipo: 'Primaria', fecha: '2024-04-26', url: `${R}/E_FR_FY2023_FN.pdf` },
  { id: 4, titulo: 'FY2022 Consolidated Financial Results (ejercicio a 31-mar-2023)', editor: 'Advantest Corporation', tipo: 'Primaria', fecha: '2023-04-26', url: `${R}/E_FR_FY2022_FN.pdf` },
  { id: 5, titulo: 'FY2021 Consolidated Financial Results (ejercicios a 31-mar-2021 y 31-mar-2022)', editor: 'Advantest Corporation', tipo: 'Primaria', fecha: '2022-04-27', url: `${R}/E_FR_FY2021_FN.pdf` },
  { id: 6, titulo: 'Integrated Annual Report 2025 (resumen financiero de 11 años, historia, gobierno, mercado de testers)', editor: 'Advantest Corporation', tipo: 'Primaria', fecha: '2025-09', url: 'https://www.advantest.com/document/en/investors/ir-library/annual/E_all_IAR2025.pdf' },
  { id: 7, titulo: 'FY2026 First Quarter Consolidated Financial Results (1T a 30-jun-2026; guía revisada)', editor: 'Advantest Corporation', tipo: 'Primaria', fecha: '2026-07-29', url: `${R}/E_FR_FY2026_1Q.pdf` },
  { id: 8, titulo: 'Q1 FY2026 Presentation (slides and notes)', editor: 'Advantest Corporation', tipo: 'Primaria', fecha: '2026-07-29', url: `${R}/JE_BIZ_260729_note.pdf` },
  { id: 9, titulo: 'Q1 FY2026 Financial Briefing, Q&A Summary', editor: 'Advantest Corporation', tipo: 'Primaria', fecha: '2026-07-29', url: `${R}/JE_BIZ_260729_QA.pdf` },
  { id: 10, titulo: 'FY2025 Q4 Presentation (slides and notes): mercado de testers CY2025 y cuotas', editor: 'Advantest Corporation', tipo: 'Primaria', fecha: '2026-04-27', url: `${R}/JE_BIZ_260427_note.pdf` },
  { id: 11, titulo: 'FY2025 Third Quarter Consolidated Financial Results', editor: 'Advantest Corporation', tipo: 'Primaria', fecha: '2026-01-28', url: `${R}/E_FR_FY2025_3Q.pdf` },
  { id: 12, titulo: 'FY2025 Second Quarter Consolidated Financial Results', editor: 'Advantest Corporation', tipo: 'Primaria', fecha: '2025-10-28', url: `${R}/E_FR_FY2025_2Q.pdf` },
  { id: 13, titulo: 'FY2025 First Quarter Consolidated Financial Results', editor: 'Advantest Corporation', tipo: 'Primaria', fecha: '2025-07-29', url: `${R}/E_FR_FY2025_1Q.pdf` },
  { id: 14, titulo: 'FY2024 Second Quarter Consolidated Financial Results', editor: 'Advantest Corporation', tipo: 'Primaria', fecha: '2024-10-30', url: `${R}/E_FR_FY2024_2Q.pdf` },
  { id: 15, titulo: 'FY2024 Third Quarter Consolidated Financial Results', editor: 'Advantest Corporation', tipo: 'Primaria', fecha: '2025-01-29', url: `${R}/E_FR_FY2024_3Q.pdf` },
  { id: 16, titulo: 'Investors Guide (julio de 2026)', editor: 'Advantest Corporation', tipo: 'Primaria', fecha: '2026-07-29', url: 'https://www.advantest.com/document/en/investors/ir-library/investors-guide/Investors_Guide_2607E.pdf' },
  { id: 17, titulo: 'Status of Share Repurchase and its Completion', editor: 'Advantest Corporation', tipo: 'Primaria', fecha: '2026-08-20', url: `${N}/qnpuno0000000dx4-att/E_Info_20260820.pdf` },
];

const c = (periodo, ingresos, coste, gg, amort, ebit, fin, bai, imp, bn, gf, bpa, dpa, acc, nr = null) => ({
  periodo, ingresos, coste_ventas: coste, gastos_generales: gg, ebitda: ebit + amort, amortizaciones: amort, ebit,
  resultado_financiero: fin, bai, impuestos: imp, minoritarios: 0, beneficio_neto: bn, gastos_financieros: gf,
  participadas_en_ebitda: null, no_recurrentes_en_ebitda: nr, bpa, dpa, dpa_extraordinario: 0, acciones_diluidas: acc,
});
const cuenta = [
  c('FY2020', 312789, 144498, 105870, 11756, 70726, -1108, 69618, -169, 69787, 183, 87.96, 29.5, 793.4),
  c('FY2021', 416901, 180994, 121132, 14968, 114734, 1609, 116343, 29042, 87301, 220, 111.82, 30.0, 780.7),
  c('FY2022', 560191, 241130, 152042, 21396, 167687, 3583, 171270, 40870, 130400, 593, 173.68, 33.75, 750.8),
  c('FY2023', 486507, 240477, 158963, 26104, 81628, -3458, 78170, 15880, 62290, 2305, 84.16, 34.25, 740.1),
  c('FY2024', 779707, 334622, 195392, 27075, 228161, -3387, 224774, 63597, 161177, 2522, 218.01, 39.0, 739.3, 21393),
  c('FY2025', 1128610, 402503, 229628, 25612, 499120, 17600, 516720, 141367, 375353, 2400, 513.30, 59.0, 731.3, -2504),
];

const b = (periodo, at, ac, pc, pt, intang, inm, ex, cl, pr, caja, deuda, arr, pn, res) => ({
  periodo, activo_total: at, activo_corriente: ac, pasivo_corriente: pc, pasivo_total: pt, fondo_comercio: null, intangibles: intang,
  inmovilizado_material: inm, existencias: ex, clientes: cl, proveedores: pr, activos_contrato: null, pasivos_contrato: null,
  caja, deuda_financiera: deuda, arrendamientos: arr, patrimonio_neto: pn, minoritarios: 0, reservas: res,
});
const balance = [
  b('FY2020', 422641, 279095, 89811, 142272, 54543, 41613, 64340, 57028, 58558, 149164, 0, 11850, 280369, 214858),
  b('FY2021', 494696, 304945, 150882, 200075, 85307, 51392, 95013, 82155, 70352, 116582, 30598, 12865, 294621, 279828),
  b('FY2022', 600224, 374695, 174689, 231530, 95767, 64046, 169082, 102152, 89262, 85537, 33357, 17487, 368694, 319171),
  b('FY2023', 671229, 420261, 126277, 240051, 98514, 78884, 204389, 88855, 76863, 106702, 75143, 19300, 431178, 355299),
  b('FY2024', 854210, 599753, 309424, 347671, 78365, 78602, 209707, 113031, 107093, 262544, 74955, 18548, 506539, 489850),
  b('FY2025', 1171816, 836407, 330284, 376090, 84250, 101628, 231718, 228731, 142061, 339966, 0, 20192, 795726, 655566),
];
const f = (periodo, fo, capex, arr, adq, des, div, rec) => ({ periodo, flujo_operativo: fo, capex, pagos_arrendamientos: arr, adquisiciones: adq, desinversiones: des, dividendos: div, recompras: rec, emision_acciones: 0, intereses_en_financiacion: 0 });
const flujos = [
  f('FY2020', 67830, 13277, 2208, 156, 0, 15594, 14028),
  f('FY2021', 78889, 18219, 2555, 28976, 0, 25456, 70148),
  f('FY2022', 70224, 23588, 3140, 3505, 0, 25418, 50042),
  f('FY2023', 32668, 20543, 5207, 8260, 0, 24881, 17),
  f('FY2024', 285971, 19431, 5323, 3815, 0, 27320, 50080),
  f('FY2025', 335182, 36030, 4982, 0, 2902, 35754, 114328),
];

const A = {
  _estado: 'completa',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 1232307, ebitda: 591809, ebit: 565158, beneficio_neto: 459953, bpa: 630.39, dpa: 59.0, dpa_extraordinario: 0, fcf: 379776, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [],
    comentario: 'Las ventas pasaron de 312.789 M JPY en FY2020 a 1.128.610 M en FY2025 (ejercicios de abril a marzo; FY2025 acaba el 31-mar-2026) [1, 5]. Todo orgánico: las compras de la etapa (Essai en 2020, R&D Altanova en 2021) suman menos de 35.000 M [5, 6]. El ciclo se ve en FY2023: ventas −13,2 % y resultado operativo −51,3 % por la corrección de inventarios del sector [3]. Después, la IA lo cambió de escala: FY2024 +60,3 % y FY2025 +44,7 %, con el margen operativo del 16,8 % al 44,2 % por mezcla (testers de SoC de gama alta para GPU y ASIC, DRAM de alto rendimiento) y apalancamiento operativo: los gastos generales y de I+D crecieron un 17,5 % con las ventas un 44,7 % [1]. El 1T FY2026 (abril-junio de 2026) dio ventas de 367.473 M (+39,3 %), margen bruto del 69,5 % y margen operativo del 51,7 % [7, 8]. La guía revisada del 29-jul para FY2026 es de 1.714.000 M de ventas, 846.000 M de resultado operativo y 660.000 M de beneficio neto (BPA 911,64 JPY) [7].',
    ajustes: 'Cifras publicadas NIIF. No recurrentes: FY2024 lleva un deterioro de 21.393 M del fondo de comercio y los intangibles de Essai (test a nivel de sistema) dentro del resultado operativo [1, 2], que se devuelve al EBITDA como no recurrente; FY2025 lleva una plusvalía de 2.504 M por la venta parcial de un negocio [1]. Por debajo del resultado operativo: FY2025 incluye 17.312 M de ingreso financiero por la valoración de opciones de compra de acciones de inversiones estratégicas [1] y el 1T FY2026 44.680 M de ingreso financiero, sobre todo por ganancias de valoración de un fondo de inversión estratégico [7, 8]; no se repiten por sí solas y se quitan del BPA normalizado del análisis. Los BPA anteriores a FY2023 están ajustados al desdoblamiento 4×1 de octubre de 2023 [6].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '2T FY24', ingresos: 190481, crecimiento_pct: 63.9, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 61.39, vs_consenso: null },
      { periodo: '3T FY24', ingresos: 218152, crecimiento_pct: 63.7, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 70.08, vs_consenso: null },
      { periodo: '4T FY24', ingresos: 232349, crecimiento_pct: 71.1, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 54.29, vs_consenso: null },
      { periodo: '1T FY25', ingresos: 263776, crecimiento_pct: 90.1, crecimiento_organico_pct: null, ebitda: 130064, margen_ebitda_pct: 49.3, bpa: 122.80, vs_consenso: null },
      { periodo: '2T FY25', ingresos: 262957, crecimiento_pct: 38.0, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 108.69, vs_consenso: null },
      { periodo: '3T FY25', ingresos: 273804, crecimiento_pct: 25.5, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 107.96, vs_consenso: null },
      { periodo: '4T FY25', ingresos: 328073, crecimiento_pct: 41.2, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 173.85, vs_consenso: null },
      { periodo: '1T FY26', ingresos: 367473, crecimiento_pct: 39.3, crecimiento_organico_pct: null, ebitda: 197141, margen_ebitda_pct: 53.6, bpa: 239.89, vs_consenso: null },
    ],
    ultima_presentacion: 'En la presentación del 1T FY2026 (29-jul-2026) la dirección habló de un «cambio estructural de la demanda»: la IA de inferencia empuja ASIC, CPU y DRAM, y el contenido de test por chip crece con cada generación (empaquetado avanzado, E/S de alta velocidad), no solo el número de unidades [8]. Subió el mercado de testers de 2026 un 19 % frente a abril, a 13.000-14.500 M USD (SoC 10.500-11.500 M y memoria 2.500-3.000 M) [8]. Frente a la presentación de abril, el tono pasó de «resultados récord» a «adelantar la capacidad»: el objetivo de 10.000 sistemas SoC al año, previsto para finales de 2028 o principios de 2029, se adelanta y se habla de 15.000 o más [9, 10]. Los analistas preguntaron por el reparto entre GPU, ASIC y CPU (no lo dio: «muchos dispositivos van juntos»), por la cuota en memoria (reconoce que puede bajar este año en NAND y en transiciones de velocidad), por la visibilidad (ahora conversa con previsiones de 18 meses frente a 6 antes) y por un margen bruto del 66-67 % para el año, inferior al 69,5 % del 1T, que la dirección atribuye a componentes de memoria más caros en la segunda mitad [8, 9]. No dio el dividendo de FY2026 ni detalló la capacidad a partir de 10.000 sistemas [7, 9]. Las cifras trimestrales salen de restar los acumulados de cada informe trimestral [11-15] y de los anuales [1, 2, 3, 4].',
    confianza: 'Alta',
  },
  balance: {
    historico: balance,
    vencimientos: [{ anio: '2031', importe: 100000 }],
    liquidez: 'Caja 413.124 M a 30-jun-2026 más 87.817 M en títulos de deuda comprados en el trimestre; sin préstamos bancarios (los 75.000 M de corto plazo se devolvieron en FY2025) [1, 7].',
    rating: 'Sin rating público localizado',
    coste_deuda_pct: 0.0,
    vida_media_anios: 4.5,
    otros_pasivos: 'Única deuda financiera: bonos convertibles cupón cero con vencimiento en 2031 por 100.000 M, emitidos en abril de 2026 (88.930 M en pasivo y el resto como componente de patrimonio, según NIIF) [7, 8]. Pensiones: 20.021 M de pasivo por prestaciones a 30-jun-2026 [7]. Provisiones (sobre todo garantías) 15.984 M [7]. Anticipos de clientes en «otros pasivos corrientes», que subieron de 42.756 M a 80.397 M en el 1T (cobros adelantados de 36.984 M) [7]: son circulante, se compensan con entregas. Inversiones estratégicas en «Investment securities» de 357.737 M (aportación a un fondo de inversión, acciones y deuda), registradas a valor razonable [7, 8]. Sin covenants, factoring ni pagos aplazados de compras publicados.',
    comentario: 'El balance pasó de caja neta ajustada pequeña en FY2023 (deuda de 75.143 M para financiar existencias de 204.389 M en la caída) a una caja de 339.966 M sin deuda en FY2025 [1, 3]. El circulante comercial (existencias + clientes − proveedores) bajó del 44,5 % de las ventas en FY2023 al 28,2 % en FY2025; en el 1T FY2026 los clientes cayeron 50.234 M por cobros y las existencias subieron 41.936 M para la ampliación de capacidad [7]. Los 100.000 M del convertible y los 113.900 M invertidos en el fondo estratégico y en acciones en el 1T cambian la composición del activo: hay 357.737 M en títulos que no generan EBITDA [8].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'La conversión de beneficio en caja es irregular por las existencias: en FY2023 el flujo operativo fue de 32.668 M con un beneficio de 62.290 M (existencias +30.923 M) y en FY2024 de 285.971 M con 161.177 M de beneficio, ayudado por solo 13.143 M de impuestos pagados [2, 3]. En FY2025 el flujo operativo de 335.182 M quedó por debajo del beneficio (375.353 M) por 110.770 M de impuestos y 105.858 M más de clientes [1]. El capex es pequeño: 36.030 M en FY2025 (3,2 % de las ventas), con la producción de sistemas en un fabricante contratado del Sudeste Asiático [1, 9]. Estimación propia: el mantenimiento es del orden de la amortización (≈25.600 M) y el resto, ampliación de capacidad. Usos de la caja en FY2025: recompras 114.328 M, devolución de préstamos 75.352 M y dividendos 35.754 M [1].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: null, anios_auditor: null, opinion: 'Favorable (cuentas anuales auditadas; los informes trimestrales no están revisados)',
    comentario: 'Cuentas NIIF desde FY2015 [1]. Señales revisadas: (1) ingresos financieros por valoración de inversiones estratégicas (17.312 M en FY2025 y 44.680 M en el 1T FY2026) que inflan el beneficio neto pero no el resultado operativo [1, 7]; (2) deterioro de 21.393 M de Essai en FY2024, que reconoce que la compra de 2020 no cumplió el plan [2]; (3) pagos en acciones pequeños (4.450 M en FY2025, 0,4 % de las ventas) [1]; (4) existencias altas en las caídas (272 días de ciclo de caja en FY2023) [6]. La guía de FY2026 incluye ya el ingreso financiero del 1T (beneficio neto 660.000 M) [7]. Lectura de los indicadores del motor en la sección de calidad.',
    senales: [
      { senal: 'Ingresos financieros por valoración de inversiones estratégicas', nivel: 'Media', comentario: '17.312 M en FY2025 y 44.680 M en el 1T FY2026; no recurrentes y volátiles; se quitan del BPA normalizado [1, 7].' },
      { senal: 'Deterioro de una compra (Essai)', nivel: 'Baja', comentario: '21.393 M en FY2024; el negocio de test a nivel de sistema no cumplió el plan [2].' },
      { senal: 'Existencias en la parte baja del ciclo', nivel: 'Media', comentario: 'Existencias de 204.389 M en FY2023 con ventas en caída; el riesgo de obsolescencia vuelve con la ampliación de capacidad (273.654 M a 30-jun-2026) [3, 7].' },
    ],
    confianza: 'Media',
  },
  capital: {
    politica: 'Dividendo: payout en torno al 30 % del beneficio como referencia del plan a medio plazo y recompras flexibles [6]; en FY2025 el dividendo fue de 59 JPY (payout 11,5 %) [1]. Recompra aprobada el 28-oct-2025 de hasta 150.000 M o 18 millones de acciones, terminada el 19-ago-2026 con 5.759.000 acciones y 149.997 M [17]. Amortizó 34,1 millones de acciones propias en FY2025 (172.106 M) [1]. Prioridades declaradas: capacidad, I+D, inversiones estratégicas y retribución [8].',
    adquisiciones: [
      { anio: '2020', objetivo: 'Essai (test a nivel de sistema, EE. UU.)', importe: null, ev_ebitda: null, financiacion: 'Caja', resultado: 'Deterioro de 21.393 M del fondo de comercio y los intangibles en FY2024 [2].' },
      { anio: '2021', objetivo: 'R&D Altanova (interfaces de dispositivo)', importe: null, ev_ebitda: null, financiacion: 'Caja', resultado: 'Integrada en la unidad de test de sistemas; sin deterioro publicado [6].' },
      { anio: '2026', objetivo: 'Aportación a un fondo de inversión y compra de acciones (inversiones estratégicas)', importe: 113900, ev_ebitda: null, financiacion: 'Caja y convertible de 100.000 M', resultado: 'Ganancias de valoración de 44.680 M en el 1T FY2026 [8].' },
    ],
    comentario: 'Ver propio.',
    confianza: 'Media',
  },
  negocio: {
    segmentos: [
      { nombre: 'Test System', descripcion: 'Testers de SoC (V93000) y de memoria, manipuladores e interfaces de dispositivo, test a nivel de sistema', tipo_resultado: 'EBIT', historico: [{ periodo: 'FY2024', ingresos: 682819, resultado: 262120 }, { periodo: 'FY2025', ingresos: 1019390, resultado: 518760 }] },
      { nombre: 'Services and Others', descripcion: 'Soporte y mantenimiento de la base instalada, consumibles (placas de interfaz, zócalos) y nanotecnología (CD-SEM)', tipo_resultado: 'EBIT', historico: [{ periodo: 'FY2024', ingresos: 96888, resultado: -16125 }, { periodo: 'FY2025', ingresos: 109230, resultado: 8758 }] },
      { nombre: 'Eliminaciones y corporativo', descripcion: 'Gastos generales y de I+D básica no asignados y pagos en acciones', tipo_resultado: 'EBIT', historico: [{ periodo: 'FY2024', ingresos: 0, resultado: -17834 }, { periodo: 'FY2025', ingresos: -10, resultado: -28398 }] },
    ],
    geografias: [
      { nombre: 'Asia (Taiwán, China, Corea, Malasia…)', peso_pct: 91.8 },
      { nombre: 'América', peso_pct: 3.9 },
      { nombre: 'Japón', peso_pct: 2.2 },
      { nombre: 'Europa', peso_pct: 2.1 },
    ],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Cuota en testers de SoC', valor_anterior: '≈56 % (CY2024)', valor_actual: '66 % (CY2025)', variacion: '+10 pp', comentario: 'Estimación de la empresa; objetivo de más del 70 % [10, 9].' },
      { kpi: 'Cuota en testers de memoria', valor_anterior: '≈62 % (CY2024)', valor_actual: '≈60 % (CY2025)', variacion: '−2 pp', comentario: 'Puede bajar en 2026 en NAND y en transiciones de velocidad [10, 9].' },
      { kpi: 'Mercado de testers (SoC + memoria)', valor_anterior: '6.000 M USD (CY2024)', valor_actual: '9.000 M USD (CY2025)', variacion: '+50 %', comentario: 'Previsión CY2026: 13.000-14.500 M USD [6, 10, 8].' },
      { kpi: 'Margen bruto', valor_anterior: '57,1 % (FY2024)', valor_actual: '64,3 % (FY2025); 69,5 % (1T FY2026)', variacion: '+7,2 pp', comentario: 'Guía de 66-67 % para FY2026 [1, 8].' },
      { kpi: 'Capacidad anual de sistemas SoC', valor_anterior: '≈1.000 (2020)', valor_actual: 'objetivo 5.000 (fin FY2026) → 10.000 adelantado', variacion: '×10', comentario: '10.000 sistemas de hoy equivalen a ≈20.000 de 2020 [9].' },
      { kpi: 'Ventas a clientes fuera de Japón', valor_anterior: '98,0 % (FY2024)', valor_actual: '97,8 % (FY2025)', variacion: '−0,2 pp', comentario: '[1]' },
    ],
    confianza: 'Alta',
  },
  fuentes: fA,
  huecos: [
    { seccion: 'calidad', campo: 'auditor', tipo: 'Complemento', intentos: '1) Informe integrado 2025 (gobierno); 2) resultados anuales (no lo citan); 3) búsqueda del informe de valores (Yuho) en inglés sin éxito', decision: 'Omitido' },
    { seccion: 'trimestres', campo: 'ebitda trimestral y vs_consenso', tipo: 'Complemento', intentos: '1) Informes trimestrales (no publican la amortización trimestral salvo en el 1T); 2) presentaciones (gráficos sin cifras extraíbles); 3) consenso trimestral previo no gratuito', decision: 'Omitido' },
  ],
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Investors Guide (julio de 2026): composición de ventas, modelo de negocio, competencia y plan a medio plazo', editor: 'Advantest Corporation', tipo: 'Primaria', fecha: '2026-07-29', url: 'https://www.advantest.com/document/en/investors/ir-library/investors-guide/Investors_Guide_2607E.pdf' },
  { id: 2, titulo: 'Integrated Annual Report 2025: historia, tamaño del mercado de testers CY2014-CY2024 (estimación de Advantest) y ventas mundiales de semiconductores (WSTS)', editor: 'Advantest Corporation', tipo: 'Primaria', fecha: '2025-09', url: 'https://www.advantest.com/document/en/investors/ir-library/annual/E_all_IAR2025.pdf' },
  { id: 3, titulo: 'FY2025 Q4 Presentation: mercado de testers CY2025 (9.000 M USD) y cuotas', editor: 'Advantest Corporation', tipo: 'Primaria', fecha: '2026-04-27', url: `${R}/JE_BIZ_260427_note.pdf` },
  { id: 4, titulo: 'Q1 FY2026 Presentation: previsión del mercado de testers CY2026', editor: 'Advantest Corporation', tipo: 'Primaria', fecha: '2026-07-29', url: `${R}/JE_BIZ_260729_note.pdf` },
  { id: 5, titulo: 'Q1 FY2026 Financial Briefing, Q&A Summary', editor: 'Advantest Corporation', tipo: 'Primaria', fecha: '2026-07-29', url: `${R}/JE_BIZ_260729_QA.pdf` },
  { id: 6, titulo: 'Teradyne (TER) statistics', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/ter/statistics/' },
  { id: 7, titulo: 'FormFactor (FORM) statistics', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/form/statistics/' },
  { id: 8, titulo: 'Advantest/Teradyne: Market Share Shifts In This Duopoly', editor: 'Seeking Alpha', tipo: 'Analistas', fecha: '2026-01', url: 'https://seekingalpha.com/symbol/ATEYY' },
  { id: 9, titulo: 'FY2025 Consolidated Financial Results', editor: 'Advantest Corporation', tipo: 'Primaria', fecha: '2026-04-27', url: `${R}/E_FR_FY2025_FN.pdf` },
];
const B = {
  _estado: 'completa',
  historia: {
    resumen: 'Advantest nació en 1954 (como Takeda Riken) fabricando instrumentos de medida electrónicos; en los años sesenta apostó por los sistemas de medida y comercializó el tester de semiconductores aprovechando el auge de los chips japoneses [2]. En 1979 salió al exterior con el tester más rápido del mundo y en 1985 ya era el primero del mercado mundial, dominante en memoria [2]. En los 2000, con el paso al modelo de diseñadores sin fábrica, fundiciones y ensambladores, compró Verigy (2011), tercera del mercado y fuerte en SoC, de donde viene la plataforma V93000 que hoy es su núcleo [1, 2]. Desde 2018 un plan a largo plazo (Grand Design) la llevó a los 400.000 M de ventas en 2021, adelantado a 2027, y la IA generativa la ha llevado a 1,13 billones en FY2025 [2, 9].',
    hitos: [
      { anio: '1954', hito: 'Fundación como fabricante de instrumentos de medida electrónicos [2].' },
      { anio: '1979', hito: 'Entrada en los mercados exteriores con el sistema de test de semiconductores más rápido del mundo [2].' },
      { anio: '1985', hito: 'Primera cuota del mercado mundial de testers [2].' },
      { anio: '2011', hito: 'Compra de Verigy (V93000), entrada fuerte en SoC y en el modelo diseñador-fundición-ensamblador [1, 2].' },
      { anio: '2018', hito: 'Grand Design y primer plan a medio plazo; objetivo de 400.000 M de ventas alcanzado en 2021 [2].' },
      { anio: '2020-2021', hito: 'Compras de Essai (test a nivel de sistema) y R&D Altanova (interfaces) [2].' },
      { anio: '2023', hito: 'Desdoblamiento 4×1 de las acciones [2].' },
      { anio: '2024', hito: 'Tercer plan a medio plazo (FY2024-FY2026); Douglas Lefever, primer consejero delegado no japonés del grupo [1, 2].' },
      { anio: 'FY2025', hito: 'Ventas de 1.128.610 M y resultado operativo de 499.120 M, récords; cuota en SoC del 66 % [3, 9].' },
    ],
    confianza: 'Alta',
  },
  negocio: {
    descripcion: 'Advantest diseña y vende las máquinas que comprueban que cada chip funciona antes de llegar al cliente: testers automáticos (ATE) para chips lógicos o SoC (procesadores, GPU, ASIC de IA, procesadores de móvil) y para memoria (DRAM, HBM, NAND), más los manipuladores que colocan los chips, las interfaces de dispositivo y el test a nivel de sistema [1]. El test es el único paso de los más de 1.000 de la fabricación que comprueba el chip con señales eléctricas [1]. Vende a fabricantes integrados, diseñadores sin fábrica (que eligen el tester), fundiciones y ensambladores de test externos (OSAT) [1]. El 91,8 % de las ventas va a Asia (Taiwán, Corea, China, Malasia) [9]. Fabrica con un socio contratado en el Sudeste Asiático, que abre una segunda planta [5].',
    clientes: 'Base de clientes la mayor del sector, con diseñadores, fundiciones y OSAT [1]. Cambiar de plataforma de tester equivale a rehacer el entorno de desarrollo, evaluación y producción del chip, con costes altos para el cliente [1]. La empresa no publica la concentración por cliente; en IA trabaja con los grandes diseñadores de aceleradores y CPU y con la fundición dominante en Taiwán, lo que sugiere concentración alta (estimación propia, sin cifra). Poder de precios: el margen bruto pasó del 50,6 % en FY2023 al 64,3 % en FY2025 y al 69,5 % en el 1T FY2026 con mezcla de gama alta [9, 4].',
    confianza: 'Media',
  },
  sector: {
    definicion: 'Mercado mundial de testers automáticos de semiconductores (ATE) de SoC y de memoria, estimado por Advantest, en USD [2, 3]. Es el núcleo de las ventas (Test System, 90 % del grupo) [9]. No incluye manipuladores, interfaces ni servicios, así que la cuota sobre ventas del grupo no es directa. Segunda referencia: el mercado mundial de semiconductores (WSTS), que pasó de 440.000 M USD en 2020 a 631.000 M USD en 2024 y se espera que supere el billón en 2026 [2, 9].',
    tamano: '≈ 9.000 M USD en CY2025 (SoC 6.900 M y memoria 2.100 M) [3]; previsión CY2026 de 13.000-14.500 M USD [4]',
    unidad_serie: 'millones de USD',
    serie: [
      { anio: '2019', tamano: 3350 }, { anio: '2020', tamano: 4200 }, { anio: '2021', tamano: 5600 }, { anio: '2022', tamano: 5200 },
      { anio: '2023', tamano: 4400 }, { anio: '2024', tamano: 6000 }, { anio: '2025', tamano: 9000 }, { anio: '2026e', tamano: 13750 },
    ],
    tcac_historico_pct: 21.8,
    tcac_previsto_pct: null,
    cr5_pct: 95.0,
    estructura: 'Concentrada (duopolio Advantest-Teradyne)',
    drivers: [
      { driver: 'Volumen de chips de IA (GPU, ASIC, CPU para inferencia)', efecto: '+', horizonte: 'Estructural', evidencia: 'Mercado de testers SoC +68 % en CY2025 a 6.900 M USD [3].' },
      { driver: 'Complejidad: más tiempo de test e inserciones por chip (empaquetado 2,5D/3D, HBM)', efecto: '+', horizonte: 'Estructural', evidencia: 'La dirección dice que el contenido de test crece con cada generación [4, 5].' },
      { driver: 'Ciclo de inversión de los fabricantes', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Mercado de 5.600 M USD en 2021 a 4.400 M en 2023 (−21 %) [2].' },
      { driver: 'Capacidad de empaquetado avanzado y de obleas', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'La capacidad de Advantest va ligada a la de empaquetado de fundiciones y OSAT [5].' },
      { driver: 'Restricciones a China', efecto: '−', horizonte: 'Estructural', evidencia: 'China es uno de los destinos principales de las ventas de SoC y memoria [4, 9].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 2, justificacion: 'Duopolio con Teradyne; Advantest gana cuota (SoC del 56 % al 66 %) con márgenes al alza [3].' },
      { fuerza: 'Poder de los clientes', intensidad: 4, justificacion: 'Pocos clientes grandes en IA (diseñadores de aceleradores, fundición dominante) que concentran las compras.' },
      { fuerza: 'Poder de los proveedores', intensidad: 3, justificacion: 'Componentes de memoria escasos y más caros en 2026; fabricación en un socio contratado [4, 5].' },
      { fuerza: 'Amenaza de entrada', intensidad: 1, justificacion: 'Plataformas con décadas de I+D y costes de cambio altos para el cliente [1].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 2, justificacion: 'Test integrado en el chip y test a nivel de sistema complementan, no sustituyen, al ATE [1].' },
    ],
    ciclo: { posicion: 'Expansión', comentario: 'Mercado de testers en máximos (9.000 M USD en 2025, previsión 13.000-14.500 M en 2026) tras dos años de subida [3, 4]. El sector es muy cíclico: en 2023 el mercado cayó un 15 % y las ventas de Advantest un 13 %, con el resultado operativo a la mitad [2, 9]; en 2019 la memoria cayó un 43 % [2]. 2020 no fue mala (digitalización). La señal de techo sería un recorte de la inversión en centros de datos o un exceso de capacidad de los clientes.' },
    regulacion: 'Controles de exportación de EE. UU. y Japón sobre equipos y chips avanzados hacia China; China es uno de los destinos principales de las ventas [4]. Aranceles de EE. UU. sobre semiconductores en discusión. Sin regulación sectorial propia del test.',
    tendencias: 'IA de inferencia (ASIC propios de los hiperescaladores, CPU), HBM y empaquetado avanzado aumentan el contenido de test; la fotónica de silicio da su primer pedido grande de ATE [3, 4]. Advantest gana con ellas por su posición en V93000 [4].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 65.0,
    posicion: '1.ª mundial en testers de semiconductores: ≈65 % del mercado ATE en CY2025 (66 % en SoC, ≈60 % en memoria) [3]',
    competidores: [
      { nombre: 'Teradyne', pais: 'EE. UU.', ticker: 'TER', ingresos: 705100, cuota_pct: 30.0, margen_ebit_pct: null, comentario: 'Segundo del duopolio; ventas de 4.460 M USD en 12 meses (incluye robótica), margen EBITDA del 33,7 % [6]. Cuota estimada por diferencia (estimación propia).' },
      { nombre: 'FormFactor', pais: 'EE. UU.', ticker: 'FORM', ingresos: 142600, cuota_pct: null, margen_ebit_pct: null, comentario: 'Tarjetas de prueba y sondas: complementario, no tester. Ventas de 902 M USD y margen EBITDA del 20,7 % [7].' },
    ],
    foso: {
      veredicto: 'Amplio', tendencia: 'Se amplía',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 3, evidencia: 'El diseñador elige el tester y la fundición y el OSAT lo replican; el mayor parque instalado atrae nuevos clientes [1].' },
        { fuente: 'Costes de cambio', puntuacion: 5, evidencia: 'Cambiar de plataforma equivale a rehacer el entorno de desarrollo y producción [1].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 4, evidencia: 'Arquitectura modular V93000 y décadas de I+D (71.399 M en FY2024) [1, 2].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Margen operativo del 44,2 % en FY2025 frente al EBITDA del 33,7 % de Teradyne [6, 9].' },
        { fuente: 'Escala eficiente', puntuacion: 4, evidencia: 'Mercado de 9.000 M USD con dos actores; el 95 % entre los dos [3].' },
      ],
    },
    amenazas: 'La erosión vendría de (1) un cliente grande que reparta compras con Teradyne para no depender de un proveedor, sobre todo en ASIC propios; (2) testers chinos subvencionados en el mercado local; (3) el test integrado en el propio chip o el test a nivel de sistema, que reducen inserciones; (4) pérdida de cuota en memoria, ya visible (−2 pp en 2025) [3, 5]. Analistas independientes describen el mercado como un duopolio en el que la cuota se ha movido a favor de Advantest con la IA [8]. Probabilidad moderada a 3-5 años para la primera; baja para las demás.',
    confianza: 'Media',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'competencia', campo: 'margen EBIT y cuota de los competidores', tipo: 'Complemento', intentos: '1) Stock Analysis (solo EBITDA); 2) informe de Teradyne no descargado por tiempo; 3) prensa especializada sin cifras primarias', decision: 'Omitido' },
    { seccion: 'sector', campo: 'tcac_previsto_pct', tipo: 'Complemento', intentos: '1) Advantest solo da CY2026; 2) Investors Guide sin previsión a 5 años; 3) SEMI da 403', decision: 'Omitido' },
  ],
};
guarda('B', B);

// ---------------------------------------------------------------- C. Gobierno
const fC = [
  { id: 1, titulo: 'Integrated Annual Report 2025: gobierno corporativo, consejo, remuneración, entrevista con consejeros externos', editor: 'Advantest Corporation', tipo: 'Primaria', fecha: '2025-09', url: 'https://www.advantest.com/document/en/investors/ir-library/annual/E_all_IAR2025.pdf' },
  { id: 2, titulo: 'Advantest Corporation: shareholders, board members and managers', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://www.marketscreener.com/quote/stock/ADVANTEST-CORPORATION-6492081/company/' },
  { id: 3, titulo: 'FY2025 Consolidated Financial Results (junta del 31-jul-2026, cambios de consejeros)', editor: 'Advantest Corporation', tipo: 'Primaria', fecha: '2026-04-27', url: `${R}/E_FR_FY2025_FN.pdf` },
  { id: 4, titulo: 'Status of Share Repurchase and its Completion', editor: 'Advantest Corporation', tipo: 'Primaria', fecha: '2026-08-20', url: `${N}/qnpuno0000000dx4-att/E_Info_20260820.pdf` },
  { id: 5, titulo: 'Advantest Sets Terms for 2031 Zero Coupon Convertible Bonds at 60% Premium (precio de conversión 36.000 JPY)', editor: 'TipRanks', tipo: 'Prensa', fecha: '2026-04-01', url: 'https://www.tipranks.com/news/company-announcements/advantest-sets-terms-for-2031-zero-coupon-convertible-bonds-at-60-premium' },
  { id: 6, titulo: 'Noticias 2026 de Advantest (convertible, recompras, entregas de acciones a directivos)', editor: 'Advantest Corporation', tipo: 'Primaria', fecha: '2026-09-30', url: 'https://www.advantest.com/en/news/2026/' },
  { id: 7, titulo: 'FY2025 Q4 Presentation (cumplimiento del plan MTP3)', editor: 'Advantest Corporation', tipo: 'Primaria', fecha: '2026-04-27', url: `${R}/JE_BIZ_260427_note.pdf` },
  { id: 8, titulo: 'FY2024 Consolidated Financial Results (guía FY2025 de abril de 2025)', editor: 'Advantest Corporation', tipo: 'Primaria', fecha: '2025-04-25', url: `${R}/E_FR_FY2024_FN.pdf` },
];
const C = {
  _estado: 'completa',
  directivos: {
    equipo: [
      { nombre: 'Douglas Lefever', cargo: 'Consejero representante, Group CEO', desde: '2024', participacion_pct: null, trayectoria: 'Estadounidense, en el grupo desde la compra de Verigy; dirigió el negocio de SoC antes de ser consejero (2020) y CEO del grupo (abril de 2024). Con él las ventas pasaron de 486.507 M (FY2023) a 1.128.610 M (FY2025) [1, 2, 3].' },
      { nombre: 'Koichi Tsukui', cargo: 'Consejero representante, presidente y Group COO', desde: '2024', participacion_pct: null, trayectoria: 'Consejero desde 2020; presidente y COO desde abril de 2024, a cargo de la cadena de suministro y la ampliación de capacidad [1, 2].' },
      { nombre: 'Hisako Takada', cargo: 'Senior Executive Officer, CFO', desde: null, participacion_pct: null, trayectoria: 'Directora financiera; firma los resultados y los comunicados de recompra [3, 4].' },
      { nombre: 'Yoshiaki Yoshida', cargo: 'Presidente del consejo (no ejecutivo)', desde: '2024', participacion_pct: null, trayectoria: 'CEO del grupo hasta marzo de 2024; dejó la función ejecutiva para presidir el consejo y separar supervisión y gestión [1].' },
      { nombre: 'Juergen Serrer', cargo: 'CTO', desde: '2023', participacion_pct: null, trayectoria: 'Responsable de tecnología [2].' },
    ],
    historial_guidance: [
      { anio: 'FY2025', guia: 'Abril de 2025: guía inicial muy inferior al resultado; se subió varias veces durante el año', real: 'Ventas 1.128.610 M y resultado operativo 499.120 M', cumplida: 'Sí' },
      { anio: 'FY2018-FY2021', guia: 'Grand Design: 400.000 M de ventas en FY2027', real: '416.901 M en FY2021, seis años antes', cumplida: 'Sí' },
      { anio: 'FY2024', guia: 'Plan MTP3 (FY2024-FY2026), metas elevadas en octubre de 2025 por los resultados récord', real: 'FY2024 ventas +60,3 %; FY2025 récord', cumplida: 'Sí' },
      { anio: 'FY2026', guia: '1.420.000 M de ventas en abril; 1.714.000 M en julio', real: '1T: 367.473 M (21 % de la guía nueva)', cumplida: 'Parcial' },
    ],
    comentario: 'Ver propio.',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Douglas Lefever', cargo: 'Consejero representante, Group CEO', tipo: 'Ejecutivo', desde: '2020', comisiones: null },
      { nombre: 'Koichi Tsukui', cargo: 'Consejero representante, presidente, Group COO', tipo: 'Ejecutivo', desde: '2020', comisiones: null },
      { nombre: 'Yoshiaki Yoshida', cargo: 'Presidente del consejo', tipo: 'Otro externo', desde: '2024', comisiones: null },
      { nombre: 'Yuichi Kurita', cargo: 'Consejero, miembro de la comisión de auditoría', tipo: 'Otro externo', desde: '2015', comisiones: 'Auditoría y supervisión (interno, a tiempo completo)' },
      { nombre: 'Toshimitsu Urabe', cargo: 'Consejero externo', tipo: 'Independiente', desde: '2019', comisiones: 'Nombramientos y retribuciones (presidente)' },
      { nombre: 'Nicholas Benes', cargo: 'Consejero externo', tipo: 'Independiente', desde: '2019', comisiones: 'Nombramientos y retribuciones' },
      { nombre: 'Naoto Nishida', cargo: 'Consejero externo', tipo: 'Independiente', desde: '2023', comisiones: 'Nombramientos y retribuciones' },
      { nombre: 'Sayaka Sumida', cargo: 'Consejera externa', tipo: 'Independiente', desde: '2020', comisiones: 'Auditoría y supervisión (presidenta)' },
      { nombre: 'Tomoko Nakada', cargo: 'Consejera externa', tipo: 'Independiente', desde: '2023', comisiones: 'Auditoría y supervisión' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: null,
    remuneracion: 'Estructura del Group CEO, a objetivo: fijo 1, bonus anual 1 (indicador: beneficio neto; de 0 % a 200 % del objetivo), acciones restringidas 1 y acciones por objetivos (PSU) 3, ligadas a las metas del plan a medio plazo con indicadores secundarios de rentabilidad total relativa frente al índice Nikkei de semiconductores y cinco indicadores de sostenibilidad [1]. Cláusula de reducción y recuperación (clawback) por infracciones o reexpresiones materiales [1]. Exigencia de tener acciones por 4 años de fijo para el CEO y 2 para el resto [1]. Premia beneficio y rentabilidad para el accionista; el bonus sobre beneficio neto incluye los ingresos financieros por valoración de inversiones (riesgo de premiar lo no operativo).',
    accionistas: [
      { nombre: 'Nomura Asset Management', pct: 12.18, tipo: 'Gestora (fondos índice incluidos)', variacion: 'n.d.' },
      { nombre: 'Amova Asset Management', pct: 6.07, tipo: 'Gestora', variacion: 'n.d.' },
      { nombre: 'BlackRock Fund Advisors', pct: 3.89, tipo: 'Gestora', variacion: 'n.d.' },
      { nombre: 'BlackRock Japan', pct: 2.48, tipo: 'Gestora', variacion: 'n.d.' },
      { nombre: 'Autocartera', pct: 1.37, tipo: 'Autocartera', variacion: 'Recompra de 5,76 millones de acciones terminada el 19-ago-2026 [4]' },
    ],
    insiders: [],
    control_y_defensas: 'Sin accionista de control: el mayor es una gestora con el 12,18 % (fondos índice) [2]. Una acción, un voto; sin clases ni blindajes conocidos. Sociedad con comisión de auditoría y supervisión; mayoría de consejeros externos (6 de 9) y presidente no ejecutivo separado del CEO [1]. Comisión de nombramientos y retribuciones voluntaria presidida por un externo [1]. Las entregas de acciones restringidas a directivos se comunican con hechos relevantes [6].',
    alertas: ['Ninguna relevante detectada tras revisar el informe integrado 2025 y las noticias de 2026; Japón no tiene registro público de operaciones de directivos.'],
    confianza: 'Media',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'remuneracion_ceo y votos de la junta', tipo: 'Complemento', intentos: '1) Informe integrado 2025 (solo estructura); 2) informe de valores (Yuho) en inglés no localizado; 3) resultados de la junta del 31-jul-2026 no localizados en inglés', decision: 'Omitido' },
    { seccion: 'gobierno', campo: 'insiders', tipo: 'Complemento', intentos: '1) Japón no tiene registro público de operaciones de directivos; 2) informes de grandes participaciones (EDINET) no consultados; 3) noticias de la empresa (solo entregas de acciones restringidas)', decision: 'Omitido' },
  ],
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const usd = 158.1; // JPY por USD, 15-oct-2026 [D14]
const comp = (nombre, ticker, pais, capUsdBn, evs, evebitda, per, crec, mebitda, roic, dn, fcfy, jpy = false) => ({
  nombre, ticker, pais, capitalizacion: Math.round(jpy ? capUsdBn * 1e6 : capUsdBn * usd * 1000), ev_ventas: evs, ev_ebitda_ltm: evebitda, ev_ebitda_ntm: null,
  per_ntm: per, crecimiento_pct: crec, margen_ebitda_pct: mebitda, roic_pct: roic, dn_ebitda: dn, fcf_yield_pct: fcfy,
});
const fD = [
  { id: 1, titulo: 'Históricos diarios de 6857.T, 1305.T (TOPIX) y 1625.T (TOPIX-17 eléctricas y precisión), hasta el 15-oct-2026 (bolsa.mjs y movimiento.mjs)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/quote/6857.T/history/' },
  { id: 2, titulo: 'Advantest Corporation: estimaciones anuales a 3 años, consenso y objetivo medio', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://www.marketscreener.com/quote/stock/ADVANTEST-CORPORATION-6492081/finances/' },
  { id: 3, titulo: 'Advantest Corp.: objetivo a 12 meses (medio 42.685,7, máximo 55.000, mínimo 23.000 JPY) y recomendaciones', editor: 'Investing.com', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://www.investing.com/equities/advantest-corp.' },
  { id: 4, titulo: 'Jefferies raises target for Advantest stock to JPY 41,000 (y próximos resultados el 28-oct-2026)', editor: 'ad-hoc-news', tipo: 'Prensa', fecha: '2026-10-07', url: 'https://www.ad-hoc-news.de/boerse/news/corporate-news/jefferies-raises-target-for-advantest-stock-to-jpy-41-000/70314480' },
  { id: 5, titulo: 'Interest Rate (JGB), jgbcme.csv: bono a 10 años del 14-oct-2026, 3,015 %', editor: 'Ministerio de Hacienda de Japón', tipo: 'Primaria', fecha: '2026-10-14', url: 'https://www.mof.go.jp/english/policy/jgbs/reference/interest_rate/jgbcme.csv' },
  { id: 6, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026: 4,20 %', editor: 'A. Damodaran, NYU Stern', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 7, titulo: 'Teradyne (TER) statistics', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/ter/statistics/' },
  { id: 8, titulo: 'Tokyo Electron (8035) statistics', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/quote/tyo/8035/statistics/' },
  { id: 9, titulo: 'Disco (6146) statistics', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/quote/tyo/6146/statistics/' },
  { id: 10, titulo: 'KLA (KLAC) statistics', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/klac/statistics/' },
  { id: 11, titulo: 'FormFactor (FORM) statistics', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/form/statistics/' },
  { id: 12, titulo: 'Lam Research (LRCX) statistics', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/lrcx/statistics/' },
  { id: 13, titulo: 'ASML Holding (ASML) statistics', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/asml/statistics/' },
  { id: 14, titulo: 'USD/JPY (JPY=X), 15-oct-2026: 158,1', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/quote/JPY=X/' },
  { id: 15, titulo: 'Nikkei 225 falls 5% on rate and AI concerns', editor: 'The Japan Times', tipo: 'Prensa', fecha: '2026-10-15', url: 'https://www.japantimes.co.jp/business/2026/10/15/nagata-nikkei-decline/' },
  { id: 16, titulo: "Japan's Nikkei plunges as tech stocks hammered by AI, rate hike worries", editor: 'Business Recorder (Reuters)', tipo: 'Prensa', fecha: '2026-10-15', url: 'https://www.brecorder.com/news/40444359/japans-nikkei-plunges-as-tech-stocks-hammered-by-ai-rate-hike-worries' },
  { id: 17, titulo: "Japan's Nikkei index falls amid selloff in AI-related shares (Advantest −9,95 %)", editor: 'The Peninsula (Reuters)', tipo: 'Prensa', fecha: '2026-07-02', url: 'https://www.thepeninsulaqatar.com/article/02/07/2026/japans-nikkei-index-falls-amid-selloff-in-ai-related-shares' },
  { id: 18, titulo: 'Nikkei drops 2.5% as chip stocks crater and bond yields hit multi-decade highs', editor: 'Crypto Briefing', tipo: 'Prensa', fecha: '2026-07-16', url: 'https://cryptobriefing.com/nikkei-declines-chip-stock-selloff-bond-yields/' },
  { id: 19, titulo: "Japan's Nikkei slips to one-month low as Middle East conflict intensifies", editor: 'Stockopedia (Reuters)', tipo: 'Prensa', fecha: '2026-03', url: 'https://www.stockopedia.com/share-prices/advantest-PNK:ATEYY/news/japan-apos-s-nikkei-slips-to-one-month-low-as-middle-east-conflict-intensifies-019e6a11-cc1e-764b-b503-3bb78c96aa48/' },
  { id: 20, titulo: 'Japan tech shares drag Nikkei to 3-week low as Advantest tumbles', editor: 'TradingView (Reuters)', tipo: 'Prensa', fecha: '2025-11', url: 'https://de.tradingview.com/news/reuters.com%2C2025%3Anewsml_L1N3UO053%3A0-japan-tech-shares-drag-nikkei-to-3-week-low-as-advantest-tumbles' },
  { id: 21, titulo: 'Q1 FY2026 Presentation (recompra, convertible, inversiones estratégicas)', editor: 'Advantest Corporation', tipo: 'Primaria', fecha: '2026-07-29', url: `${R}/JE_BIZ_260729_note.pdf` },
  { id: 22, titulo: 'Advantest stock keeps Buy rating with JPY 47,000 target (JPMorgan 51.000 el 10-sep; Goldman Hold 40.000 el 30-jul)', editor: 'ad-hoc-news / Investing.com', tipo: 'Prensa', fecha: '2026-10', url: 'https://www.ad-hoc-news.de/boerse/news/corporate-news/advantest-stock-keeps-buy-rating-with-jpy-47-000-target/70263583' },
];
const bo = BOLSA.bolsa;
const D = {
  _estado: 'completa',
  identificacion: {
    nombre: 'Advantest Corporation', nombre_corto: 'Advantest', ticker: '6857', isin: 'JP3122400009', mercado: 'Bolsa de Tokio (Prime)', indice_referencia: 'TOPIX (ETF 1305.T)',
    pais: 'Japón', pais_iso: 'JP', sector: 'Tecnología de la información', industria: 'Equipos de semiconductores', sede: 'Tokio (Chiyoda)', fundacion: '1954', empleados: 7241, web: 'https://www.advantest.com',
    precio: 34340, fecha_precio: '2026-10-15', acciones: 721.8, capitalizacion_publicada: null, free_float_pct: null,
    max_52s: 41990, min_52s: 16325, volumen_medio_diario: '≈ 354.700 M JPY/día (3 meses) [1]', proximos_resultados: '2026-10-28',
  },
  consenso: {
    guidance: 'Guía FY2026 (abril de 2026-marzo de 2027) revisada el 29-jul-2026: ventas 1.714.000 M (+51,9 %), resultado operativo 846.000 M (margen 49,4 %), beneficio antes de impuestos 891.000 M, beneficio neto 660.000 M y BPA 911,64 JPY, con 150 JPY/USD desde el 2T; margen bruto del 66-67 % [21]. La guía de abril era de 1.420.000 M de ventas y 627.500 M de resultado operativo [21]. Sensibilidad: +5.300 M de resultado operativo por cada yen que se deprecie frente al dólar [21]. Próxima revisión con los resultados del 2T el 28-oct-2026 [4].',
    estimaciones: [
      { periodo: 'FY2026e', ingresos: 1763345, ebitda: 906842, ebit: 886377, bpa: 933.2, dpa: 88.61, fuente: 'MarketScreener [2]' },
      { periodo: 'FY2027e', ingresos: 2247226, ebitda: 1144867, ebit: null, bpa: 1203, dpa: 108.2, fuente: 'MarketScreener [2]' },
      { periodo: 'FY2028e', ingresos: 2627776, ebitda: 1306600, ebit: null, bpa: 1390, dpa: 146.2, fuente: 'MarketScreener [2]' },
    ],
    recomendaciones: { n_analistas: 21, comprar: 18, mantener: 3, vender: 0, po_medio: 42685.71, po_min: 23000, po_max: 55000 },
    revisiones: 'Los objetivos subieron en septiembre y octubre: JPMorgan de 41.000 a 51.000 JPY (10-sep), Jefferies de 38.500 a 41.000 (6-7-oct), Goldman Sachs de 35.000 a 40.000 con Mantener (30-jul) [4, 22]. MarketScreener da 21 analistas, consenso Comprar y objetivo medio de 42.685,71 JPY [2]; Investing.com, 18 a favor de comprar y ninguno de vender, con un rango de 23.000 a 55.000 [3]. Las estimaciones de BPA de FY2026 (933,2) ya superan la guía de la empresa (911,64) [2, 21]. MarketScreener da para FY2027-FY2028 un EBIT mayor que el EBITDA, incoherente: se usa solo el BPA y las ventas. Solo una fuente con estimaciones completas gratuitas.',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    tipo_rentabilidad: bo.tipo_rentabilidad,
    rentabilidades: bo.rentabilidades,
    anual: bo.anual,
    beta: 1.57, volatilidad_pct: bo.volatilidad_pct, max_drawdown_pct: bo.max_drawdown_pct, posicion_corta_pct: null,
    comentario: null,
    contexto: {
      movimiento: { fecha: '2026-10-15', var_1m_pct: 13.9, var_3m_pct: 15.9, var_6m_pct: 20.0, var_12m_pct: 97.8, dist_max_52s_pct: -17.9, dist_min_52s_pct: 108.6, dist_max_historico_pct: -17.9, tendencia: 'alcista', volatilidad_60d_pct: 79.8, avisos: ['P2 A 4 % del máximo de 52 semanas tras subir un 39 % en tres meses (cierre del 14-oct, antes de la caída del 15-oct)'] },
      movimientos_fuertes: [
        { periodo: 'nov-2025', var_pct: -12.1, causa: 'Venta de valores de IA en Tokio por dudas sobre la rentabilidad de la inversión en IA tras caídas en Wall Street; Advantest fue la que más cayó del Nikkei varios días de noviembre [20].', veredicto: 'no cambia', condicion: null },
        { periodo: 'mar-2026', var_pct: -15.0, causa: 'Recrudecimiento del conflicto en Oriente Próximo (ataques de Israel y EE. UU. a Irán) y caída mundial de los semiconductores; −11 % el 9-mar [19, 1].', veredicto: 'no cambia', condicion: null },
        { periodo: 'abr-2026', var_pct: 42.7, causa: 'Resultados récord de FY2025 y guía FY2026 (27-abr) tras la recuperación del sector [1].', veredicto: 'no cambia', condicion: null },
        { periodo: 'jul-2026', var_pct: -21.4, causa: 'Venta de valores de IA (−9,95 % el 2-jul), rendimientos de los bonos japoneses en máximos de décadas (16-17-jul) y caída de las memorias tras el beneficio de SK hynix (28-29-jul) [17, 18].', veredicto: 'no cambia', condicion: null },
        { periodo: '15-oct-2026', var_pct: -15.0, causa: 'Caída del Nikkei del 4,9 % por noticias de deuda en dificultades de CoreWeave (un cliente final de la inversión en IA), inflación de EE. UU. mayor de lo esperado y miedo a subidas de tipos; Advantest −15 %, la mayor caída del índice [15, 16]. No hay noticia propia de la empresa.', veredicto: 'no cambia', condicion: null },
      ],
      noticias: [
        { fecha: '2026-10-28', tipo: 'resultados', hecho: 'Resultados del 2T FY2026 [4].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-07', tipo: 'recomendación', hecho: 'Jefferies sube el objetivo de 38.500 a 41.000 JPY y mantiene Comprar; JPMorgan lo subió a 51.000 el 10-sep [4, 22].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-08-20', tipo: 'accionista de referencia', hecho: 'Termina la recompra de 150.000 M (5,76 millones de acciones); no hay otra aprobada [21].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-04-01', tipo: 'ampliación o convertible', hecho: 'Convertible cupón cero 2031 de 100.000 M con conversión a 36.000 JPY (prima del 60 %): 2,78 millones de acciones si se convierte (0,4 %) [21].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-15', tipo: 'rumor', hecho: 'Dudas sobre la financiación de la inversión en IA (deuda de CoreWeave) que afectan a todo el sector [15, 16].', veredicto: 'no cambia', condicion: null },
      ],
      proximos_resultados: '2026-10-28',
      veredicto: 'no cambia',
      condicion: null,
      comentario: null,
    },
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: BOLSA.cierres_ejercicio.filter((x) => ['FY2020', 'FY2021', 'FY2022', 'FY2023', 'FY2024', 'FY2025'].includes(x.anio)).map((x) => ({ anio: x.anio, precio_cierre: x.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    comentario: null,
    confianza: 'Alta',
  },
  comparables: {
    criterio: null,
    empresas: [
      comp('Teradyne', 'TER', 'US', 52.44, 11.8, 34.99, 34.42, 34.5, 33.71, 38.24, -0.28, 1.51),
      comp('Tokyo Electron', '8035', 'JP', 23.56, 8.82, 29.64, 27.64, 27.13, 29.64, 32.1, -0.53, 1.66, true),
      comp('Disco', '6146', 'JP', 5.77, 13.05, 28.11, 30.73, 20.69, 46.4, 48.53, -1.33, 1.56, true),
      comp('KLA', 'KLAC', 'US', 225.61, 16.76, 37.59, 32.88, 22.51, 44.59, 66.75, 0.21, 1.66),
      comp('FormFactor', 'FORM', 'US', 8.68, 9.28, 44.81, 31.76, 23.56, 20.7, 16.5, -1.69, 1.57),
      comp('Lam Research', 'LRCX', 'US', 340.53, 15.39, 41.38, 30.28, 27.12, 37.19, 70.07, -0.17, 1.36),
      comp('ASML', 'ASML', 'NL', 648.21, 16.05, 42.03, 26.87, 29.3, 38.18, 65.98, -0.41, 1.72),
    ],
    comentario: null,
    confianza: 'Media',
  },
  transacciones: null,
  fuentes: fD,
  huecos: [
    { seccion: 'transacciones', campo: 'operaciones', tipo: 'Complemento', intentos: '1) Notas de las compras de Advantest (Essai, R&D Altanova): sin precio ni múltiplo publicados; 2) operaciones del sector (Cohu-Xcerra, FormFactor-Cascade) sin documento primario descargado; 3) prensa sin múltiplos verificables', decision: 'Omitido' },
    { seccion: 'bolsa', campo: 'posicion_corta_pct', tipo: 'Complemento', intentos: '1) JPX solo publica posiciones > 0,5 %; 2) sin registro agregado gratuito; 3) proveedores sin dato', decision: 'Omitido' },
    { seccion: 'comparables', campo: 'ev_ebitda_ntm y crecimiento a 12 meses', tipo: 'Complemento', intentos: '1) Stock Analysis da EV/EBITDA de 12 meses pasados y crecimiento a 3 años; 2) MarketScreener por empresa (sin tiempo); 3) se usa el crecimiento previsto a 3 años como aproximación', decision: 'Calculado y marcado como estimación' },
  ],
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Stocktwits, flujo de $ATEYY (junio-octubre de 2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-02', url: 'https://api.stocktwits.com/api/2/streams/symbol/ATEYY.json' },
  { id: 2, titulo: 'Seeking Alpha: artículos y noticias de ATEYY («More Than Enough AI Premium», 14-oct; «AI Inference Is Turning Semiconductor Test Into A Structural Toll Road», ago-2026)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-14', url: 'https://seekingalpha.com/api/sa/combined/ATEYY.xml' },
  { id: 3, titulo: 'Nikkei plunges 1,253 points, yet 70% of stocks rise in unusual session where only AI-related names get sold', editor: 'BigGo Finance', tipo: 'Prensa', fecha: '2026-10', url: 'https://finance.biggo.com/news/7fd77533-71f1-41ab-b7e3-830e43f1c6dc' },
];
const E = {
  _estado: 'completa',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Empeora',
    revisadas: [
      { plataforma: 'Stocktwits ($ATEYY)', fecha: '2026-10', n_comentarios: 11, tono: 'Positivo', resumen: 'Particulares estadounidenses que siguen el ADR: lamentan haber vendido pronto y celebran la fuerza del valor; ningún argumento de fondo [1].' },
      { plataforma: 'Seeking Alpha (artículos de autores independientes)', fecha: '2026-10', n_comentarios: 4, tono: 'Dividido', resumen: 'El 14-oct un autor argumenta que la prima de IA ya está más que pagada; en agosto otro defendía que la inferencia convierte el test en un «peaje estructural» [2].' },
      { plataforma: 'Prensa de mercados japonesa (comentario de la sesión del 15-oct)', fecha: '2026-10', n_comentarios: 3, tono: 'Negativo', resumen: 'Sesión en la que solo se vendían valores de IA mientras el 70 % del mercado subía: rotación, no pánico general [3].' },
    ],
    temas: [
      { tema: '¿Burbuja de inversión en IA?', postura: 'Dividida', peso: 'Alto', contraste: 'El precio cayó un 15 % el 15-oct por la deuda de CoreWeave, sin noticia propia; las cifras de la empresa (guía subida en julio, cobros adelantados de 36.984 M) no muestran todavía desaceleración [2, 3].' },
      { tema: 'Valoración ya exigente', postura: 'Bajista', peso: 'Medio', contraste: 'Coincide con el análisis: el PER adelantado de 36,9 veces sobre el BPA recurrente de FY2026 está por encima de la mediana de sus 5 años (23,9) [2].' },
      { tema: 'Duopolio y cuota en IA', postura: 'Alcista', peso: 'Medio', contraste: 'Cierto: cuota en SoC del 66 % y mayoría en aceleradores de IA según la empresa [2].' },
    ],
    lectura: 'El debate es escaso en inglés y las cifras de foros no se usan. El sentimiento pasó de euforia (septiembre-octubre, máximo de 41.990 JPY) a nervios con la caída del 15-oct. No señala riesgos que el informe no recoja: la cuestión de fondo es si la inversión en IA aguanta, que es el bajista del análisis.',
    confianza: 'Baja',
  },
  fuentes: fE,
  huecos: [],
};
guarda('E', E);
console.log('Notas A-E escritas');
