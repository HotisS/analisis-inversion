// Escribe las notas A-E de Unicharm (8113, Tokio; corte 2026-10-15) a partir de los documentos de notas/docs
// (Kessan Tanshin en inglés FY2017-FY2025 y 1T-2T 2026, informe de valores 2025, informe integrado 2026,
// presentaciones y resúmenes de preguntas y respuestas) y de fuentes web. JPY, NIIF, ejercicio natural.
// Cada nota cita solo con [n] de su propia lista de fuentes. Ejecutar: node notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => {
  let txt = JSON.stringify(obj, null, 2);
  txt = txt.replace(/\[([A-E]\d+(?:[,–-]\s*[A-E]?\d+)*)\]/g, (m, dentro) => {
    const otras = (dentro.match(/[A-E]/g) || []).filter((l) => l !== letra);
    if (otras.length) console.warn(`${letra}: cita a otra nota ${m}`);
    return '[' + dentro.replace(new RegExp(letra, 'g'), '') + ']';
  });
  fs.writeFileSync(path.join(dir, `${letra}.json`), txt + '\n', 'utf8');
};
const UC = 'https://www.unicharm.co.jp/content/dam/sites/www_unicharm_co_jp/pdf/ir/library/';
const E = UC + 'earnings/';
const r1 = (x) => Math.round(x * 10) / 10;

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Consolidated Financial Results for the Fiscal Year Ended December 31, 2025 (Kessan Tanshin, NIIF): cuenta, balance, flujos, segmentos, deterioros, IVA indio, recompra 2026', editor: 'Unicharm Corporation', tipo: 'Primaria', fecha: '2026-02-12', url: E + 'Consolidated%20Financial%20Results%20for%20the%20Fiscal%20Year%20Ended%20December%2031%2C%202025.pdf' },
  { id: 2, titulo: 'Consolidated Financial Results for the Six Months Ended June 30, 2026 (1S26): estados resumidos, segmentos, revisión a la baja de la guía 2026, compra de Nutrire', editor: 'Unicharm Corporation', tipo: 'Primaria', fecha: '2026-08-05', url: E + '20260805_Consolidated%20Financial%20Results%20for%20the%20Six%20Months%20Ended%20June%2030%2C%202026%20.pdf' },
  { id: 3, titulo: 'Consolidated Financial Results for the Three Months Ended March 31, 2026 (1T26)', editor: 'Unicharm Corporation', tipo: 'Primaria', fecha: '2026-05-08', url: E + 'Consolidated%20Financial%20Results%20for%20the%20Three%20Months%20Ended%20March%2031%2C%202026.pdf' },
  { id: 4, titulo: 'Consolidated Financial Results for the Nine Months Ended September 30, 2025 (9M25)', editor: 'Unicharm Corporation', tipo: 'Primaria', fecha: '2025-11-07', url: E + 'Consolidated%20Financial%20Results%20for%20the%20Nine%20Months%20Ended%20September%2030%2C%202025.pdf' },
  { id: 5, titulo: 'Consolidated Financial Results for the Fiscal Year Ended December 31, 2024 (Kessan Tanshin; balance 2023 reexpresado)', editor: 'Unicharm Corporation', tipo: 'Primaria', fecha: '2025-02-14', url: E + 'E_UC_%E7%AC%AC65%E6%9C%9F_%E6%B1%BA%E7%AE%97%E7%9F%AD%E4%BF%A1_202502.pdf' },
  { id: 6, titulo: 'Consolidated Financial Results for the Fiscal Year Ending December 31, 2023 (columnas 2022 y 2023)', editor: 'Unicharm Corporation', tipo: 'Primaria', fecha: '2024-02', url: E + 'UC_Consolidated%20Financial%20Results%20for%20the%20Fiscal%20Year%20Ending%20December%2031%2C%202023.pdf' },
  { id: 7, titulo: 'Consolidated Financial Results for the Fiscal Year Ended December 31, 2021 (columnas 2020 y 2021; incendio de Ahmedabad)', editor: 'Unicharm Corporation', tipo: 'Primaria', fecha: '2022-02', url: E + 'E_Financial_Report_2021Q4.pdf' },
  { id: 8, titulo: 'Annual Securities Report for the 66th Fiscal Year ended December 31, 2025 (notas: arrendamientos, instrumentos financieros, fondo de comercio, auditor, remuneración, accionistas)', editor: 'Unicharm Corporation', tipo: 'Primaria', fecha: '2026-03-23', url: UC + 'securities/Annual%20Securities%20Report%20for%20the%2066th%20Fiscal%20Year%20ended%20December%2031%2C%202025.pdf' },
  { id: 9, titulo: 'Interim Financial Results Briefing FY2026, presentación con guion (6-ago-2026): regiones, márgenes, divisas', editor: 'Unicharm Corporation', tipo: 'Primaria', fecha: '2026-08-06', url: UC + 'investors/E_202606_Presentation%20Materials%20with%20Script.pdf' },
  { id: 10, titulo: 'Financial Results Briefing FY2025, presentación con guion: política de retribución (65 % de reparto total), recompras', editor: 'Unicharm Corporation', tipo: 'Primaria', fecha: '2026-02-13', url: UC + 'investors/E_202512_Presentation%20Materials%20with%20Script.pdf' },
  { id: 11, titulo: 'Consolidated Financial Results for the Fiscal Year Ending December 31, 2022 (guía 2023)', editor: 'Unicharm Corporation', tipo: 'Primaria', fecha: '2023-02', url: E + 'E_Consolidated%20Financial%20Results%20for%20the%20Fiscal%20Year%20Ending%20December%2031%2C%202022.pdf' },
  { id: 12, titulo: 'Consolidated Financial Results FY2020 (Financial Report 2020Q4; guía 2021)', editor: 'Unicharm Corporation', tipo: 'Primaria', fecha: '2021-02', url: E + 'E_Unicharm_Financial_Report_2020Q4.pdf' },
  { id: 13, titulo: 'Unicharm Financial Report FY2019 (BPA 2018-2019, guía 2020)', editor: 'Unicharm Corporation', tipo: 'Primaria', fecha: '2020-02', url: E + 'Unicharm_Financial_Report_FY2019.pdf' },
  { id: 14, titulo: 'Flash Report FY2017 (BPA 2016-2017)', editor: 'Unicharm Corporation', tipo: 'Primaria', fecha: '2018-02-16', url: E + '180216_E_Flash_Report.pdf' },
  { id: 15, titulo: 'Interim Financial Results Briefing FY2026: Q&A Summary (precios, SAP con prima, China)', editor: 'Unicharm Corporation', tipo: 'Primaria', fecha: '2026-08-06', url: UC + 'investors/E_202606_QA_Summary.pdf' },
  { id: 16, titulo: 'Q1 Financial Results Briefing FY2026: Q&A Summary', editor: 'Unicharm Corporation', tipo: 'Primaria', fecha: '2026-05-08', url: UC + 'investors/E_202603_QA_Summary.pdf' },
];
// Millones de JPY. EBIT = resultado operativo básico (core) + otros ingresos − otros gastos (cuadra con el BAI publicado).
// EBITDA = EBIT + amortizaciones (estado de flujos, con derechos de uso). no_recurrentes = deterioros, incendio, IVA indio − seguro.
// BPA y DPA divididos por 3 (desdoblamiento 3×1 del 1-ene-2025). Acciones medias en millones (beneficio ÷ BPA).
const c = (periodo, ingresos, cv, gg, oi, oe, am, fin, imp, min, bn, gf, nr, bpa, dpa, acc) => {
  const core = ingresos - cv - gg; const ebit = core + oi - oe;
  return { periodo, ingresos, coste_ventas: cv, gastos_generales: gg, ebitda: ebit + am, amortizaciones: am, ebit, resultado_financiero: fin, bai: ebit + fin, impuestos: imp, minoritarios: min, beneficio_neto: bn, gastos_financieros: gf, participadas_en_ebitda: null, no_recurrentes_en_ebitda: nr, bpa, dpa, dpa_extraordinario: 0, acciones_diluidas: acc };
};
const cuenta = [
  c('2020', 727475, 434866, 177865, 2664, 21818, 36165, 259, 33268, 10237, 52344, 1330, 15929, 29.20, 10.67, 1792.6),
  c('2021', 782723, 469078, 191162, 3235, 7445, 37926, 3704, 38372, 10860, 72745, 1276, 4757, 40.59, 12.00, 1792.0),
  c('2022', 898022, 569422, 209034, 3052, 7395, 41486, 485, 37333, 10767, 67608, 2462, 4312, 37.87, 12.67, 1785.2),
  c('2023', 941790, 590261, 223555, 8655, 5920, 43253, 1599, 34326, 11929, 86053, 3195, 3560, 48.47, 13.33, 1775.4),
  c('2024', 988981, 599072, 251446, 1872, 5572, 46538, -226, 39309, 13386, 81842, 2864, 912, 46.41, 14.67, 1763.6),
  c('2025', 945268, 575710, 260674, 9505, 16410, 47808, 3407, 34529, 5645, 65212, 2282, 6064, 37.30, 18.00, 1748.1),
];
// Balance al 31-dic. caja = efectivo + otros activos financieros corrientes (depósitos a plazo de más de 3 meses, sobre todo).
// arrendamientos: 2024-2025 de la nota 17 del informe de valores; 2020-2023 = otros pasivos financieros (corrientes + no corrientes), casi todo arrendamientos.
// 2020-2021: fondo de comercio no separado en los Tanshin (intangibles incluye el fondo de comercio).
const b = (periodo, at, ac, pc, pt, fc, int, ppe, ex, cl, pr, caja, deuda, arr, pn, mi, res) => ({ periodo, activo_total: at, activo_corriente: ac, pasivo_corriente: pc, pasivo_total: pt, fondo_comercio: fc, intangibles: int, inmovilizado_material: ppe, existencias: ex, clientes: cl, proveedores: pr, activos_contrato: null, pasivos_contrato: null, caja, deuda_financiera: deuda, arrendamientos: arr, patrimonio_neto: pn, minoritarios: mi, reservas: res });
const balance = [
  b('2020', 893413, 490962, 233215, 330760, null, 90006, 258814, 61617, 112698, 145316, 297110, 33177, 42508, 493002, 69651, 547259),
  b('2021', 987655, 547743, 274450, 352217, null, 85407, 271689, 89811, 129367, 167241, 307299, 38314, 38182, 557639, 77799, 599946),
  b('2022', 1049218, 603756, 256663, 340605, 44979, 45544, 271662, 117590, 152971, 171035, 307603, 27022, 31579, 618883, 89730, 644859),
  b('2023', 1133627, 638902, 270073, 345377, 45325, 50402, 285585, 102965, 151561, 210965, 360215, 28565, 31446, 695719, 92531, 710792),
  b('2024', 1239973, 671040, 301585, 366263, 50116, 50975, 293230, 121133, 168631, 231399, 368749, 26851, 31456, 773062, 100649, 766342),
  b('2025', 1223176, 641644, 263933, 331917, 50499, 46560, 275748, 123344, 154762, 221583, 353371, 11055, 29575, 794705, 96554, 801367),
];
const f = (periodo, fo, capex, arr, adq, des, div, rec, em) => ({ periodo, flujo_operativo: fo, capex, pagos_arrendamientos: arr, adquisiciones: adq, desinversiones: des, dividendos: div, recompras: rec, emision_acciones: em, intereses_en_financiacion: 0 });
const flujos = [
  f('2020', 150254, 35507, 5149, 106, 0, 17895, 7193, 0),
  f('2021', 105253, 34671, 5235, 318, 0, 20301, 16001, 0),
  f('2022', 92216, 32950, 5641, 0, 0, 22053, 17001, 0),
  f('2023', 162415, 38412, 6728, 11117, 0, 23095, 17004, 0),
  f('2024', 137099, 39326, 7194, 0, 0, 24704, 19001, 0),
  f('2025', 131470, 28627, 7535, 1610, 483, 28646, 22002, 0),
];
const seg = (nombre, descripcion, filas) => ({ nombre, descripcion, tipo_resultado: 'EBIT', historico: filas.map(([periodo, ingresos, resultado]) => ({ periodo, ingresos, resultado })) });
const segmentos = [
  seg('Cuidado personal', 'Bienestar (pañales de adulto e incontinencia leve, Lifree), cuidado femenino (Sofy, Charm) y cuidado infantil (Moony, MamyPoko). Resultado = beneficio operativo básico.', [['2020', 624758, 100005], ['2021', 672039, 107322], ['2022', 764908, 100863], ['2023', 793845, 104481], ['2024', 826100, 110883], ['2025', 774428, 83197]]),
  seg('Mascotas', 'Comida y productos de higiene para perros y gatos (Japón, Hartz en Norteamérica, China con JIA PETS y Brasil con Nutrire desde 2026).', [['2020', 95693, 14174], ['2021', 104541, 14619], ['2022', 125312, 18352], ['2023', 139446, 23083], ['2024', 148673, 25840], ['2025', 156084, 24067]]),
  seg('Otros', 'Materiales industriales de no tejidos y absorbentes.', [['2020', 7024, 565], ['2021', 6143, 542], ['2022', 7802, 351], ['2023', 8498, 409], ['2024', 14208, 1740], ['2025', 14755, 1620]]),
];
const geo = [['Japón', 342504], ['China', 78024], ['Resto de Asia', 311269], ['Otros (Norteamérica, Oriente Medio, Brasil…)', 213469]];
const A = {
  _estado: 'completa',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 968231, ebitda: 152334, ebit: 104863, beneficio_neto: 64430, bpa: 37.21, dpa: 20.00, dpa_extraordinario: 0, fcf: 101199, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 6064 },
    cambios_perimetro: [
      { periodo: '2026', descripcion: 'Nutrire Indústria de Alimentos (Brasil, comida para mascotas, marca Monello) consolidada desde el 1S26; 21.965 M JPY pagados netos de caja [2]. Fuera de los ejercicios reales.' },
    ],
    comentario: 'Las ventas pasaron de 727.475 M JPY en 2020 a 988.981 M en 2024 (TCAC del 8,0 %, con la depreciación del yen a favor) y cayeron un 4,4 % en 2025, a 945.268 M [1, 5, 7]. El margen operativo básico bajó del 15,8 % de 2020 al 11,5 % de 2025: China pasó de ganar 21.805 M en 2021 a perder 5.364 M en 2025 por el daño reputacional del cuidado femenino y la guerra de precios en comercio electrónico, y el resto de Asia de 30.739 M a 16.748 M por la bajada de gama en pañales infantiles y la restricción de envíos en Indonesia [1, 7]. Japón aguanta: 67.350 M de beneficio, el 19,7 % de sus ventas. Mascotas crece (156.084 M, +5,0 %) con un margen del 15,4 % [1]. En el 1S26 las ventas subieron un 4,9 % y el beneficio básico un 14,1 % (13,3 % de margen), pero la empresa recortó la guía del año de 136.000 a 113.000 M por el coste del polímero superabsorbente y la logística tras la crisis de Ormuz [2, 15].',
    ajustes: 'Se usan las cifras NIIF publicadas. El EBIT del informe es el beneficio operativo básico (ventas − coste − gastos generales) más otros ingresos y gastos; la empresa da como cifra recurrente el beneficio básico, sin esos otros. Partidas no recurrentes dentro del EBITDA (en no_recurrentes_en_ebitda): 2020, pérdida por el incendio de Ahmedabad (15.929 M); 2021-2024, deterioros de fondo de comercio y activos en Malasia, Indonesia y otros (912-4.757 M); 2025, deterioros de 6.015 M y pérdida de 6.920 M por el IVA indio prepagado que ya no se recupera, menos 6.871 M de indemnización del seguro del incendio [1, 7]. Los deterioros se repiten cada año en importes pequeños: el BPA normalizado de 2025 sale ≈ 1,5 JPY por encima del publicado, no más.',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '4T24', ingresos: 266929, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 46885, margen_ebitda_pct: 17.6, bpa: 12.67, vs_consenso: null },
      { periodo: '1T25', ingresos: 227520, crecimiento_pct: -3.7, crecimiento_organico_pct: null, ebitda: 41031, margen_ebitda_pct: 18.0, bpa: 14.18, vs_consenso: null },
      { periodo: '2T25', ingresos: 236650, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 39621, margen_ebitda_pct: 16.7, bpa: 9.66, vs_consenso: null },
      { periodo: '3T25', ingresos: 230055, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 41383, margen_ebitda_pct: 18.0, bpa: 10.84, vs_consenso: null },
      { periodo: '4T25', ingresos: 251043, crecimiento_pct: -6.0, crecimiento_organico_pct: null, ebitda: 34657, margen_ebitda_pct: 13.8, bpa: 2.62, vs_consenso: 'Inferior' },
      { periodo: '1T26', ingresos: 234185, crecimiento_pct: 2.9, crecimiento_organico_pct: null, ebitda: 43392, margen_ebitda_pct: 18.5, bpa: 11.40, vs_consenso: null },
      { periodo: '2T26', ingresos: 252948, crecimiento_pct: 6.9, crecimiento_organico_pct: null, ebitda: 44941, margen_ebitda_pct: 17.8, bpa: 12.35, vs_consenso: null },
    ],
    ultima_presentacion: 'En el 1T26 (8-may-2026) la dirección decía que no había «casi ningún riesgo» de aprovisionamiento por Oriente Medio, que la venta al consumidor en China había vuelto al nivel previo al daño reputacional y que la caída de Indonesia (−9 %) era logística por el Ramadán [16]. Tres meses después (6-ago-2026) recortó la guía de beneficio básico un 16,9 % (136.000 → 113.000 M) y la de BPA de 50,26 a 40,68 JPY: compró polímero superabsorbente con prima para asegurar el suministro, la logística se encareció y China siguió con envíos restringidos [2, 15]. Las preguntas se repitieron en tres temas: cuánto aportarán las subidas de precio (Japón «un dígito alto» desde julio, ≈ 2.000 M de mejora; Asia solo 1-2 % del beneficio), si la prima de compra desaparece en 2027 (la dirección dice que sí) y cuándo vuelve China (cuota urbana del 15 % al 20 % en cuatro años y medio) [15]. Un analista preguntó si la guía es un suelo o un objetivo justo: «el mínimo absoluto» [15]. No dio cifras de la prima pagada ni del efecto de la guerra de promociones en China.',
    confianza: 'Media',
  },
  balance: {
    historico: balance,
    vencimientos: [{ anio: '2026', importe: 3488 }, { anio: '2027+', importe: 7567 }],
    liquidez: 'Efectivo de 254.470 M JPY a 30-jun-2026, más 80.363 M de otros activos financieros corrientes (depósitos a plazo) y unos 100.000 M de bonos y fondos de renta fija a largo plazo; deuda bancaria de 13.322 M [2, 8].',
    rating: 'Sin rating publicado (no emite bonos)',
    coste_deuda_pct: 2.5,
    vida_media_anios: null,
    otros_pasivos: 'Arrendamientos (NIIF 16) de 29.575 M a dic-25, con vencimientos hasta 2043; a jun-26 los otros pasivos financieros suben a 38.779 M por la compra de Nutrire [2, 8]. Pasivo por pensiones de 15.942 M (16.112 M a jun-26) [2]. Minoritarios de 95.388 M a valor contable en filiales de Asia y Oriente Medio (PT Uni-Charm Indonesia, que cotiza en Yakarta; Unicharm Gulf en Arabia Saudí; DSG en Tailandia, entre otras) [8]. Sin covenants relevantes ni garantías significativas. El riesgo fiscal indio (IVA prepagado) ya se ha cargado en 2025 (6.920 M) [1].',
    comentario: 'El balance es de caja neta: 334.833 M de efectivo y depósitos a corto frente a 13.322 M de deuda bancaria y unos 35.000 M de arrendamientos a jun-26, más unos 100.000 M en renta fija a largo plazo y 44.396 M en acciones [2, 8]. El circulante comercial (existencias + clientes − proveedores) es el 6,0 % de las ventas en 2025 (5,9 % en 2024); los proveedores incluyen desde 2023 gastos devengados que antes iban en otros pasivos corrientes (2023 reexpresado: 210.965 M frente a 168.867 M; 2020-2022 sin reexpresar) [5, 6]. El patrimonio atribuido es el 65,9 % del activo [2].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'El flujo operativo acumulado de 2020-2025 fue de 778.707 M JPY frente a 425.804 M de beneficio atribuido: la conversión es alta porque la amortización (≈ 47.000 M) supera al capex (28.627-39.326 M) y el circulante es pequeño [1, 5, 6, 7]. 2021-2022 fueron flojos (105.253 y 92.216 M) por la subida de existencias con la inflación de la pulpa y el petróleo; 2023 recuperó (162.415 M). La caja va sobre todo a los accionistas: dividendos de la dominante de 28.646 M y recompras de 22.002 M en 2025, más 13.942 M de dividendos a minoritarios [1]. El capex de 2025 (28.627 M, 3,0 % de las ventas) es el más bajo de la serie; el plan 2026-2030 prevé ≈ 400.000 M de inversión de crecimiento (capex y digitalización) en cinco años [10]. Estimación propia: el capex de mantenimiento ronda la amortización del inmovilizado material (≈ 35.000 M).',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'KPMG AZSA LLC', anios_auditor: 3, opinion: 'Favorable',
    comentario: 'Cuentas NIIF desde hace años, auditadas por KPMG AZSA desde 2023 (rotación obligatoria) [8]. No hay capitalización relevante de I+D (13.611 M de gasto en 2025, el 1,4 % de las ventas) ni pagos en acciones significativos (166 M) [1, 8]. Los deterioros aparecen todos los años (Malasia, Indonesia, China) y la empresa los saca del beneficio básico: hay que mirarlos como coste recurrente pequeño, no como excepcional. El salto del tipo efectivo (32,8 % en 2025 frente a 29,2 % en 2024) viene de pérdidas sin crédito fiscal en China e India. El resultado financiero vive de los intereses de la caja (5.714 M en 2025). Calidad del beneficio: el flujo operativo supera al beneficio todos los años. Lectura de los indicadores del motor en la síntesis.',
    senales: [
      { senal: 'Deterioros recurrentes fuera del beneficio básico', nivel: 'Media', comentario: '912-6.015 M al año en 2021-2025 (Malasia, Indonesia, China): reflejan que las compras y fábricas de Asia rinden menos de lo previsto [1, 7].' },
      { senal: 'Guía de beneficio incumplida cinco años seguidos', nivel: 'Media', comentario: 'Beneficio básico frente a la guía inicial: 2022 119.566 frente a 127.000; 2023 127.974 frente a 141.000; 2024 138.463 frente a 144.000; 2025 108.884 frente a 146.000; 2026 recortada de 136.000 a 113.000 [1, 2, 5, 6, 11].' },
      { senal: 'Objetivos de la remuneración variable rebajados a mitad de año', nivel: 'Baja', comentario: 'Los objetivos de 2025 son los de la previsión revisada de agosto de 2025, no los iniciales [8].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Desde 2026 (13.º plan a medio plazo, 2026-2030), retribución total de al menos el 65 % del beneficio (antes, 50 % o más) con dividendo creciente: 22 JPY en 2026 (25 años seguidos de subida) y recompras de 19.000 M en 2026, ya ejecutadas en el 1S [1, 2, 10]. Prioridades del plan: hasta 1 billón de JPY de flujo operativo en cinco años, ≈ 400.000 M para inversión de crecimiento (capex y digitalización), ≈ 150.000 M de reserva para compras y el resto a los accionistas [10].',
    adquisiciones: [
      { anio: '2011', objetivo: 'Diana Joint Stock Company (Vietnam), 95 %', importe: null, ev_ebitda: null, financiacion: 'Caja', resultado: 'Fondo de comercio de 18.506 M a dic-25 sin deterioro; Vietnam crece (+8 % en el 1S26) [1, 9].' },
      { anio: '2011', objetivo: 'The Hartz Mountain Corporation (EE. UU., mascotas), 51 %', importe: null, ev_ebitda: null, financiacion: 'Caja', resultado: 'Base de mascotas en Norteamérica; ventas +10 % en el 1S26 con margen alto [8, 9].' },
      { anio: '2018', objetivo: 'DSG (Cayman), pañales en Tailandia, Malasia e Indonesia', importe: null, ev_ebitda: null, financiacion: 'Caja', resultado: 'Fondo de comercio de Malasia deteriorado por completo en 2023-2025 (1.784 M el último tramo); el de Tailandia (29.387 M) sigue [1].' },
      { anio: '2023', objetivo: 'Jiangsu Jijia Pet Products (JIA PETS, China), participación por puesta en equivalencia', importe: 11117, ev_ebitda: null, financiacion: 'Caja', resultado: 'Asociada (21.205 M a jun-26); en pérdidas (−906 M de participadas en 2025) [1, 2, 6].' },
      { anio: '2026', objetivo: 'Nutrire Indústria de Alimentos (Brasil, comida para mascotas Monello), 100 %', importe: 21965, ev_ebitda: null, financiacion: 'Caja', resultado: 'Consolidada desde el 1S26; intangibles +16.759 M en el balance [2].' },
    ],
    comentario: 'La dirección reparte mucho y compra poco: en 2020-2025 pagó 136.694 M de dividendos y 98.204 M de recompras (234.898 M, el 55 % del beneficio atribuido) y solo 13.151 M en compras [1, 5, 6, 7]. Las compras grandes de la década pasada dieron resultados desiguales: Vietnam y Tailandia sostienen su fondo de comercio, Malasia se ha deteriorado entero y China, donde se invirtió en fábricas propias, pierde dinero [1]. Las acciones en circulación bajaron de 1.792,6 M (media de 2020) a 1.720,8 M a jun-26 (−4,0 %) [2]. La nueva política del 65 % de reparto y el balance de caja neta dan margen para seguir recomprando ≈ 1 % del capital al año.',
    confianza: 'Alta',
  },
  negocio: {
    segmentos,
    geografias: geo.map(([nombre, v]) => ({ nombre, peso_pct: r1(v / 945268 * 100) })), geografias_criterio: 'origen',
    kpis: [
      { kpi: 'Margen operativo básico del grupo', valor_anterior: '14,0 % (2024)', valor_actual: '11,5 % (2025); 13,3 % en el 1S26', variacion: '−2,5 pp', comentario: 'China en pérdidas y Asia a la mitad [1, 2].' },
      { kpi: 'Beneficio básico de China (M JPY)', valor_anterior: '12.166', valor_actual: '−5.364', variacion: '−17.530', comentario: 'Daño reputacional en cuidado femenino y guerra de precios en comercio electrónico [1].' },
      { kpi: 'Margen de Japón', valor_anterior: '20,0 % (2024)', valor_actual: '19,7 % (2025); 20,7 % en el 1S26', variacion: 'estable', comentario: 'Base de beneficio: n.º 1 en las tres categorías [1, 9].' },
      { kpi: 'Ventas de mascotas (M JPY)', valor_anterior: '148.673', valor_actual: '156.084', variacion: '+5,0 %', comentario: 'Margen del 15,4 %; +9,6 % en el 1S26 con Nutrire [1, 2].' },
      { kpi: 'Ventas de China en moneda local (1S26)', valor_anterior: '—', valor_actual: '−14 %', variacion: '—', comentario: 'Restricción voluntaria de envíos; Indonesia +3 %, India +3 %, Vietnam +8 %, Norteamérica +10 % [9].' },
      { kpi: 'Retribución total al accionista', valor_anterior: '50 % o más', valor_actual: '65 % o más', variacion: '+15 pp', comentario: 'Nuevo plan 2026-2030 [10].' },
    ],
  },
  fuentes: fA,
  huecos: [
    { seccion: 'trimestres', campo: 'crecimiento interanual de 2T25 y 3T25 y consenso previo de cada trimestre', tipo: 'Complemento', intentos: '1) Tanshin de 9M25 y 1S25 (solo acumulados del año anterior); 2) presentaciones trimestrales (cifras de 2024 por trimestre no publicadas en las que se descargaron); 3) Yahoo y MarketScreener (sin consenso trimestral histórico gratuito)', decision: 'Omitido' },
  ],
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Absorbent Hygiene Products Market: 123.500 M USD en 2025, 129.100 M en 2026 y 177.500 M en 2036 (TCAC del 3,9 %); pañales infantiles el mayor; incontinencia de adultos el que más crece; Asia-Pacífico el mayor', editor: 'Meticulous Research', tipo: 'Sectorial', fecha: '2026-04-27', url: 'https://meticulousresearch.com/pressrelease/1390/absorbent-hygiene-products-market' },
  { id: 2, titulo: 'Annual Securities Report 66th FY 2025: historia, descripción del negocio, cuotas, riesgos', editor: 'Unicharm Corporation', tipo: 'Primaria', fecha: '2026-03-23', url: UC + 'securities/Annual%20Securities%20Report%20for%20the%2066th%20Fiscal%20Year%20ended%20December%2031%2C%202025.pdf' },
  { id: 3, titulo: 'Integrated Report 2026: entrevista con el presidente, 13.º plan a medio plazo, objetivos de 2030, Kyo-sei Life Vision 2035', editor: 'Unicharm Corporation', tipo: 'Primaria', fecha: '2026-07', url: UC + 'annual/E_Integrated_Report_2026_all_view.pdf' },
  { id: 4, titulo: 'Consolidated Financial Results FY2025 (Kessan Tanshin): entorno por región y perspectivas 2026', editor: 'Unicharm Corporation', tipo: 'Primaria', fecha: '2026-02-12', url: E + 'Consolidated%20Financial%20Results%20for%20the%20Fiscal%20Year%20Ended%20December%2031%2C%202025.pdf' },
  { id: 5, titulo: 'Consolidated Financial Results 1S26: negocios, India, China, Oriente Medio, mascotas', editor: 'Unicharm Corporation', tipo: 'Primaria', fecha: '2026-08-05', url: E + '20260805_Consolidated%20Financial%20Results%20for%20the%20Six%20Months%20Ended%20June%2030%2C%202026%20.pdf' },
  { id: 6, titulo: 'Yahoo Finance: cuentas de los competidores (ventas y EBIT de los últimos 12 meses), 15-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/' },
  { id: 7, titulo: 'Interim Financial Results Briefing FY2026: Q&A Summary (promociones agresivas de la competencia en China, cuota urbana)', editor: 'Unicharm Corporation', tipo: 'Primaria', fecha: '2026-08-06', url: UC + 'investors/E_202606_QA_Summary.pdf' },
  { id: 8, titulo: 'The sanitary pad scandal causing uproar on Chinese social media (longitud real de las compresas frente a la del envase)', editor: 'Sixth Tone', tipo: 'Prensa', fecha: '2024-11', url: 'https://www.sixthtone.com/news/1016259/the-sanitary-pad-scandal-causing-uproar-on-chinese-social-media' },
  { id: 9, titulo: 'Interim Financial Results Briefing FY2026, presentación con guion: cuotas récord en Arabia Saudí, márgenes por región', editor: 'Unicharm Corporation', tipo: 'Primaria', fecha: '2026-08-06', url: UC + 'investors/E_202606_Presentation%20Materials%20with%20Script.pdf' },
];
const B = {
  _estado: 'completa',
  negocio: {
    descripcion: 'Unicharm fabrica y vende productos absorbentes desechables de no tejido en unos 80 países: pañales de adulto e incontinencia leve (Lifree), compresas y salvaslips (Sofy, Charm), pañales infantiles (Moony y MamyPoko, con el formato braguita como especialidad) y, desde 1998, comida e higiene para mascotas (Gran Deli, Silver Spoon, Hartz en EE. UU., Monello en Brasil) [2, 5]. Cuidado personal pesa el 82 % de las ventas de 2025 y mascotas el 16,5 % [4]. Vende a través de supermercados, droguerías, tiendas de conveniencia y, cada vez más, comercio electrónico (TikTok Shop, plataformas chinas); fabrica en Japón y en plantas propias de Tailandia, Indonesia, China, India, Vietnam, Arabia Saudí, Egipto y Brasil [2, 5]. El 64 % de las ventas se hace fuera de Japón [4].',
    como_gana_dinero: 'Margen bruto del 39 % en 2025 (36,9 % en 2020 sin contar la inflación de 2022); el coste lo marcan la pulpa de celulosa, el polímero superabsorbente (SAP, derivado del petróleo) y el polipropileno de los no tejidos, más la logística [4]. El beneficio sale de la escala y de la mezcla: Japón, con productos de alto valor añadido y cuota n.º 1, gana el 19,7 % de sus ventas; Asia, donde compite con marcas baratas, el 5,4 %, y China pierde dinero [4]. La demanda es diaria y poco cíclica; el riesgo es de precio relativo (bajada de gama) y de coste de materias primas con 6-9 meses de retraso en las subidas de precio. Estacionalidad baja (el 4T carga deterioros y promociones). Mascotas añade crecimiento con margen del 15 % [4, 5].',
    clientes: 'Clientes muy repartidos: minoristas y mayoristas en cada país, ninguno relevante por sí solo (no se publica un cliente por encima del 10 % de las ventas) [2]. El consumidor final cambia de marca con facilidad en los pañales infantiles y en el bajo precio, menos en incontinencia (la elección depende del grado de dependencia) y en compresas (fidelidad alta) [5]. Poder de precios demostrado solo en Japón: en 2022-2023 subió precios con la inflación de la pulpa y en el 2S26 sube «un dígito alto» en la mayor parte de la gama; en Asia la subida aporta solo un 1-2 % del beneficio y en China la empresa evita seguir las promociones «2 por 1» de la competencia [7].',
  },
  sector: {
    definicion: 'Productos higiénicos absorbentes desechables (pañales infantiles y braguitas, compresas y salvaslips, incontinencia de adultos y toallitas), mundial, a precio de fabricante. Es el mercado que usamos para la cuota y el crecimiento; las mascotas (16,5 % de las ventas) son otro mercado y se tratan aparte. Fuente de tamaño: Meticulous Research (abril de 2026); no hay una segunda fuente gratuita con el mismo perímetro, así que se contrasta con la suma de ventas de los grandes (estimación propia en la ficha sectorial) [1].',
    tamano: '≈ 123.500 M USD en 2025 (≈ 19,6 billones de JPY a 158,45 JPY/USD) [1]',
    unidad_serie: 'miles de millones de USD',
    serie: [{ anio: '2025', tamano: 123.5 }, { anio: '2026e', tamano: 129.1 }, { anio: '2030e', tamano: 150.4 }, { anio: '2036e', tamano: 177.5 }],
    tcac_historico_pct: null, tcac_previsto_pct: 3.9, cr5_pct: null, estructura: 'Moderadamente concentrada',
    drivers: [
      { driver: 'Envejecimiento (incontinencia de adultos)', efecto: '+', horizonte: 'Estructural', evidencia: 'El segmento que más crece; China envejece más deprisa que Japón y apenas usa productos específicos [1, 5].' },
      { driver: 'Natalidad en Japón y China', efecto: '−', horizonte: 'Estructural', evidencia: 'Mercado infantil japonés «encogiendo con la baja natalidad»; bajada de gama en Asia [4, 5].' },
      { driver: 'Penetración en India, Indonesia, Oriente Medio y África', efecto: '+', horizonte: 'Estructural', evidencia: 'India con uso de pañales «todavía bajo»; Egipto +15 % y Arabia Saudí con cuota récord en el 1S26 [5, 9].' },
      { driver: 'Precio de la pulpa, el SAP y el petróleo', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Guía 2026 recortada 23.000 M por SAP comprado con prima y logística tras la crisis de Ormuz [5, 7].' },
      { driver: 'Comercio electrónico y promociones', efecto: '−', horizonte: 'Estructural', evidencia: 'En China, «2 por 1» de la competencia en las plataformas; Unicharm invierte en marketing digital [7].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 4, justificacion: 'P&G, Kimberly-Clark, Kao, Essity y marcas locales baratas (Hengan en China) compiten con promociones; en Asia el precio manda [5, 7].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'La gran distribución y las plataformas digitales negocian; el consumidor cambia de marca fácilmente en pañales infantiles [7].' },
      { fuerza: 'Poder de los proveedores', intensidad: 3, justificacion: 'SAP y pulpa en pocas manos (químicas y papeleras); la prima pagada en 2026 lo muestra [7].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Hacen falta líneas de alta velocidad y distribución; las marcas blancas y las locales entran por precio, no por tecnología [2].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 2, justificacion: 'Pañales de tela, copas y braguitas menstruales reutilizables crecen desde una base pequeña (el segmento reutilizable es el de mayor crecimiento según [1]).' },
    ],
    ciclo: { posicion: 'Madurez del ciclo', comentario: 'Demanda de primera necesidad: en 2020 las ventas de Unicharm subieron (+1,9 %) y en 2022-2023 la inflación se trasladó con retraso (margen básico del 15,6 % al 13,3 %) [4]. El ciclo que importa es el de costes: SAP, pulpa y petróleo, hoy al alza por Oriente Medio, y el del yen (un yen débil infla las ventas exteriores). En China y el sudeste asiático la demanda sufre por la confianza del consumidor y la natalidad, no por el PIB.' },
    regulacion: 'Normas de producto sanitario para incontinencia en algunos países y de etiquetado (China endureció la vigilancia tras el escándalo de longitud de compresas de 2024) [8]. Reforma del IVA indio de septiembre de 2025, que dejó sin recuperar 6.920 M de impuestos prepagados [4]. Normas de envases y plásticos de un solo uso en la UE y Japón: Unicharm recicla pañales usados (RefF) [3]. Aranceles de EE. UU. sobre importaciones de 2025 (afectan poco: la producción es local).',
    tendencias: 'Tres tendencias: el paso de los pañales infantiles a la incontinencia de adultos (Unicharm es n.º 1 en Japón y tiene la marca Lifree en Asia), la venta por comercio electrónico y redes sociales (más promoción y precios más visibles, donde las marcas locales chinas ganan cuota) y la premiumización de mascotas. Gana con la primera y la tercera; pierde con la segunda en China [3, 5, 7].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 4.0,
    posicion: 'N.º 1 en Japón en las tres categorías de cuidado personal y líder en el sudeste asiático; ≈ 4 % del mercado mundial de absorbentes (estimación propia: 774.428 M JPY de cuidado personal entre ≈ 19,6 billones de mercado) [1, 4, 5]',
    competidores: [
      { nombre: 'Procter & Gamble (Pampers, Always)', pais: 'EE. UU.', ticker: 'PG', ingresos: 13790000, cuota_pct: null, margen_ebit_pct: 24.4, comentario: 'Líder mundial en pañales y compresas; grupo con detergentes y cuidado personal (bebé, femenino y familia ≈ 25 % de sus ventas) [6].' },
      { nombre: 'Kimberly-Clark (Huggies, Kotex, Depend)', pais: 'EE. UU.', ticker: 'KMB', ingresos: 2627400, cuota_pct: null, margen_ebit_pct: 14.9, comentario: 'Se centra en cuidado personal tras ceder el papel internacional a Suzano; compra Kenvue [6].' },
      { nombre: 'Essity (TENA, Libresse)', pais: 'Suecia', ticker: 'ESSITY-B', ingresos: 2187100, cuota_pct: null, margen_ebit_pct: 13.6, comentario: 'N.º 1 mundial en incontinencia profesional; fuerte en Europa y Latinoamérica [6].' },
      { nombre: 'Kao (Merries, Laurier)', pais: 'Japón', ticker: '4452', ingresos: 1751545, cuota_pct: null, margen_ebit_pct: null, comentario: 'Rival directo en Japón y China; ha reducido los pañales infantiles en China [6].' },
      { nombre: 'Hengan International', pais: 'China', ticker: '1044', ingresos: 546200, cuota_pct: null, margen_ebit_pct: 15.2, comentario: 'Líder chino en compresas y pañuelos; compite por precio [6].' },
      { nombre: 'Daio Paper (GOO.N)', pais: 'Japón', ticker: '3880', ingresos: 666770, cuota_pct: null, margen_ebit_pct: 4.2, comentario: 'Papel y pañales; endeudada y con margen bajo [6].' },
      { nombre: 'Ontex', pais: 'Bélgica', ticker: 'ONTEX', ingresos: 307900, cuota_pct: null, margen_ebit_pct: -3.8, comentario: 'Marca blanca en Europa; reestructuración y desinversiones [6].' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Se estrecha',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'No aplica a productos de consumo.' },
        { fuente: 'Costes de cambio', puntuacion: 1, evidencia: 'Bajos en pañales infantiles; algo mayores en incontinencia de adultos, donde el producto depende del grado de dependencia y del cuidador [5].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'N.º 1 en Japón en las tres categorías con un margen del 19,7 %; cuota récord en Arabia Saudí; pero la marca no evitó la caída en China tras el daño reputacional (beneficio de 21.805 M en 2021 a −5.364 M en 2025) [4, 5, 9].' },
        { fuente: 'Ventaja en costes', puntuacion: 2, evidencia: 'Escala en no tejidos y líneas propias; el margen de Asia (5,4 %) muestra que no basta frente a las marcas baratas [4].' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'Distribución densa en Japón y el sudeste asiático difícil de replicar; mercado maduro con pocos fabricantes grandes [2].' },
      ],
    },
    amenazas: 'Lo que más erosiona el foso es la bajada de gama en Asia y la competencia por promociones en las plataformas digitales chinas, donde la marca pesa menos que el precio y la reseña (probabilidad alta: ya está pasando) [7]. La natalidad reduce el mercado infantil en Japón y China. En incontinencia, Essity y Kimberly-Clark pueden entrar con fuerza en Asia. Un nuevo episodio reputacional en redes sociales chinas (como el de la longitud de las compresas de 2024) puede repetirse [8].',
    confianza: 'Media',
  },
  historia: {
    resumen: 'Keiichiro Takahara fundó Taisei Kako en 1961 (materiales de construcción) y en 1963 empezó a fabricar compresas; en 1974 adoptó el nombre Unicharm y en 1981 lanzó pañales infantiles [2]. La expansión exterior empezó en Taiwán (1984) y Tailandia (1987), siguió con China (1995) e Indonesia (1997) y se aceleró con compras en Oriente Medio (2005), Vietnam y EE. UU. (Hartz, mascotas, 2011) y el sudeste asiático (DSG, 2018) [2]. Takahisa Takahara, hijo del fundador, es presidente desde 2001 y primer ejecutivo desde 2004. En 2014 cambió el cierre a diciembre y en 2025 desdobló las acciones tres por una [2, 4].',
    hitos: [
      { anio: '1961', hito: 'Fundación de Taisei Kako por Keiichiro Takahara [2].' },
      { anio: '1963', hito: 'Primeras compresas [2].' },
      { anio: '1981', hito: 'Lanzamiento de pañales infantiles (Moony) [2].' },
      { anio: '1987', hito: 'Filial en Tailandia, primera gran base en el sudeste asiático [2].' },
      { anio: '1995', hito: 'Shanghai Unicharm: entrada en China [2].' },
      { anio: '2001', hito: 'Takahisa Takahara, presidente (primer ejecutivo desde 2004) [2].' },
      { anio: '2011', hito: 'Compra del 95 % de Diana (Vietnam) y del 51 % de Hartz (mascotas, EE. UU.) [2].' },
      { anio: '2018', hito: 'Compra de DSG (Tailandia, Malasia, Indonesia) [2].' },
      { anio: '2020', hito: 'Incendio en la fábrica de Ahmedabad (India): pérdida de 15.929 M [4].' },
      { anio: '2025', hito: 'Desdoblamiento 3×1; caída del beneficio básico del 21,4 % por China y Asia [4].' },
      { anio: '2026', hito: '13.º plan (ventas de 1,3 billones en 2030), compra de Nutrire (Brasil) y recorte de la guía en agosto [3, 5].' },
    ],
    confianza: 'Alta',
  },
  esg: {
    calificaciones: [
      { agencia: 'CDP (clima, bosques y agua)', calificacion: 'A List en tres categorías (2024)', fecha: '2025-02' },
      { agencia: 'FTSE JPX Blossom Japan Index', calificacion: 'Incluida', fecha: '2025-12' },
    ],
    materialidad: 'Los tres asuntos que mueven las cifras: (1) el plástico y la pulpa de los productos desechables, con presión regulatoria sobre envases y residuos; Unicharm recicla pañales usados y vende en guarderías un pañal con pulpa reciclada (RefF) [3, 5]; (2) la deforestación en la cadena de la pulpa, con calificación A de CDP en bosques [2]; (3) la seguridad y el etiquetado del producto, donde un escándalo en redes sociales cuesta cuota (China) [8].',
    controversias: 'Daño reputacional en cuidado femenino en China (2024-2025), que la empresa reconoce como causa de la caída de ventas [4, 8]. Sin multas ni litigios relevantes publicados en los últimos tres años [2].',
    confianza: 'Media',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'sector', campo: 'segunda fuente de tamaño del mercado y CR5', tipo: 'Complemento', intentos: '1) Informe integrado y presentaciones de Unicharm (sin tamaño de mercado); 2) búsqueda de informes de Euromonitor, Grand View y Essity (sin cifra abierta con el mismo perímetro); 3) suma de ventas de los grandes como contraste (estimación propia en la ficha sectorial)', decision: 'Calculado y marcado como estimación' },
  ],
};
guarda('B', B);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Annual Securities Report 66th FY 2025: consejo, comisiones, remuneración, accionistas, auditor', editor: 'Unicharm Corporation', tipo: 'Primaria', fecha: '2026-03-23', url: UC + 'securities/Annual%20Securities%20Report%20for%20the%2066th%20Fiscal%20Year%20ended%20December%2031%2C%202025.pdf' },
  { id: 2, titulo: 'Kessan Tanshin FY2020-FY2025: guías anuales y resultados', editor: 'Unicharm Corporation', tipo: 'Primaria', fecha: '2026-02-12', url: E + 'Consolidated%20Financial%20Results%20for%20the%20Fiscal%20Year%20Ended%20December%2031%2C%202025.pdf' },
  { id: 3, titulo: 'Consolidated Financial Results 1S26: guía 2026 revisada', editor: 'Unicharm Corporation', tipo: 'Primaria', fecha: '2026-08-05', url: E + '20260805_Consolidated%20Financial%20Results%20for%20the%20Six%20Months%20Ended%20June%2030%2C%202026%20.pdf' },
  { id: 4, titulo: 'Integrated Report 2026: entrevista con el presidente y objetivos 2030', editor: 'Unicharm Corporation', tipo: 'Primaria', fecha: '2026-07', url: UC + 'annual/E_Integrated_Report_2026_all_view.pdf' },
  { id: 5, titulo: 'Informe de votación de ISS para la junta del 25-mar-2022 (recomendación en contra de la reelección del presidente por falta de mayoría independiente)', editor: 'Amundi / ISS', tipo: 'Analistas', fecha: '2022-03', url: 'https://abglobal.com/content/dam/corporate/corporate-srdii-pdfs-2022/Unicharm%20Corp-8113.pdf' },
  { id: 6, titulo: 'Consolidated Financial Results FY2022, FY2023 y FY2024 (guías anuales)', editor: 'Unicharm Corporation', tipo: 'Primaria', fecha: '2025-02-14', url: E + 'E_UC_%E7%AC%AC65%E6%9C%9F_%E6%B1%BA%E7%AE%97%E7%9F%AD%E4%BF%A1_202502.pdf' },
];
const C = {
  _estado: 'completa',
  directivos: {
    equipo: [
      { nombre: 'Takahisa Takahara', cargo: 'Consejero delegado representante, presidente y primer ejecutivo; preside el consejo', desde: '2001', participacion_pct: 0.68, trayectoria: 'Hijo del fundador; en la empresa desde 1991, presidente desde 2001 y primer ejecutivo desde 2004 [1]. Con él las ventas pasaron de unos 300.000 M a 945.268 M JPY y el 64 % fuera de Japón, pero el margen básico cayó del 15,8 % (2020) al 11,5 % (2025) y la guía se ha incumplido cuatro años seguidos [1, 2]. Su familia controla un 31,6 % adicional a través de Unitec y Takahara Kikin [1].' },
      { nombre: 'Kenji Takaku', cargo: 'Consejero, director general sénior (marketing y ventas)', desde: '2023', participacion_pct: 0.01, trayectoria: 'En la empresa desde 1983; dirigió Brasil e India y el marketing global [1].' },
      { nombre: 'Tetsuya Shite', cargo: 'Consejero', desde: '2025', participacion_pct: null, trayectoria: 'Nombrado consejero en la junta de marzo de 2025 [1].' },
      { nombre: 'Hirotatsu Shimada', cargo: 'Director general ejecutivo sénior, director financiero (contabilidad y finanzas)', desde: null, participacion_pct: null, trayectoria: 'Responsable de las cuentas y del contacto con inversores [2].' },
    ],
    historial_guidance: [
      { anio: '2020', guia: 'Beneficio básico 100.000 M', real: '114.744 M', cumplida: 'Sí' },
      { anio: '2021', guia: 'Beneficio básico 119.000 M', real: '122.482 M', cumplida: 'Sí' },
      { anio: '2022', guia: 'Beneficio básico 127.000 M', real: '119.566 M', cumplida: 'No' },
      { anio: '2023', guia: 'Beneficio básico 141.000 M; ventas 963.500 M', real: '127.974 M; 941.790 M', cumplida: 'No' },
      { anio: '2024', guia: 'Beneficio básico 144.000 M; ventas 1.006.000 M', real: '138.463 M; 988.981 M', cumplida: 'No' },
      { anio: '2025', guia: 'Beneficio básico 146.000 M; ventas 1.025.000 M', real: '108.884 M; 945.268 M', cumplida: 'No' },
      { anio: '2026', guia: 'Beneficio básico 136.000 M (feb); 113.000 M (ago)', real: '1S26: 65.032 M', cumplida: 'Parcial' },
    ],
    comentario: 'La dirección es estable y muy ligada a la familia fundadora: Takahara lleva 25 años al frente y preside a la vez el consejo [1]. Su credibilidad en previsiones es baja: cuatro años seguidos de beneficio por debajo de la guía inicial (2022-2025) y un recorte del 16,9 % en agosto de 2026, después de decir en mayo que el riesgo de aprovisionamiento era casi nulo [2, 3, 6]. No hay plan de sucesión público; el consejo tiene seis miembros y solo dos externos [1].',
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      { nombre: 'Takahisa Takahara', cargo: 'Presidente del consejo y primer ejecutivo', tipo: 'Ejecutivo', desde: '1995', comisiones: 'Nombramientos, Remuneración' },
      { nombre: 'Kenji Takaku', cargo: 'Consejero', tipo: 'Ejecutivo', desde: '2023', comisiones: '—' },
      { nombre: 'Tetsuya Shite', cargo: 'Consejero', tipo: 'Ejecutivo', desde: '2025', comisiones: '—' },
      { nombre: 'Shigeru Asada', cargo: 'Consejero (miembro de auditoría a tiempo completo)', tipo: 'Otro externo', desde: null, comisiones: 'Auditoría y supervisión, Nombramientos, Remuneración' },
      { nombre: 'Hiroaki Sugita', cargo: 'Consejero externo', tipo: 'Independiente', desde: null, comisiones: 'Auditoría y supervisión, Nombramientos (preside), Remuneración (preside)' },
      { nombre: 'Noriko Rzonca', cargo: 'Consejera externa', tipo: 'Independiente', desde: null, comisiones: 'Auditoría y supervisión (preside), Nombramientos, Remuneración' },
    ],
    presidente_ceo_separados: false, presidente_ejecutivo: true, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: false, auditoria_independiente: true, insiders_sin_operaciones: false, accionista_control: true, presidente_vinculado_control: true, cambios_cupula_24m: 0,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 390, fijo: 150, variable_corto: 111, variable_largo: 129, ratio_salario_medio: null },
    remuneracion: 'El primer ejecutivo cobró 390 M JPY en 2025: 150 M fijos, 111 M de variable anual y 129 M en acciones restringidas a tres años [1]. El variable depende al 50 % de ventas, beneficio básico y beneficio neto frente al plan del año y al 50 % de estrategias y calificaciones ESG; no hay ROIC, ROE ni rentabilidad para el accionista [1]. En 2025 los objetivos fueron los de la previsión revisada en agosto (beneficio básico de 120.000 M), no los iniciales (146.000 M): la rebaja del objetivo suaviza el castigo por incumplir [1]. Hay cláusula de recuperación de las acciones por fraude o pérdidas sustanciales. La cuantía individual la decide el propio presidente por delegación del consejo, tras informar a la comisión de remuneración [1].',
    accionistas: [
      { nombre: 'Unitec Corporation (sociedad de la familia Takahara)', pct: 26.72, tipo: 'Familia fundadora', variacion: 'Estable' },
      { nombre: 'The Master Trust Bank of Japan (fideicomisos)', pct: 10.06, tipo: 'Custodio institucional', variacion: 'n.d.' },
      { nombre: 'Takahara Kikin K.K.', pct: 4.84, tipo: 'Familia fundadora', variacion: 'Estable' },
      { nombre: 'Custody Bank of Japan (fideicomisos)', pct: 3.53, tipo: 'Custodio institucional', variacion: 'n.d.' },
      { nombre: 'The Iyo Bank', pct: 2.64, tipo: 'Banco', variacion: 'n.d.' },
      { nombre: 'Nippon Life Insurance', pct: 2.10, tipo: 'Aseguradora', variacion: 'n.d.' },
      { nombre: 'Autocartera', pct: 7.61, tipo: 'Autocartera', variacion: '122,6 M de acciones a dic-25 y 141,7 M a jun-26 (sobre 1.862,5 M emitidas)' },
    ],
    insiders: [],
    control_y_defensas: 'La familia Takahara controla de hecho la junta con un 31,6 % (Unitec 26,72 % y Takahara Kikin 4,84 %) más el 0,68 % directo del presidente [1]. Una acción, un voto; sin blindajes estatutarios publicados. El presidente del consejo es el primer ejecutivo y miembro de la familia, y el consejo tiene solo dos independientes de seis (33 %); ISS recomendó votar en contra de su reelección en 2022 por esa razón [1, 5]. Las comisiones de nombramientos y remuneración las presiden independientes, pero el presidente forma parte de ellas y decide la remuneración individual [1].',
    alertas: [
      'Consejo con un tercio de independientes y presidente ejecutivo de la familia de control [1].',
      'Remuneración individual decidida por el propio presidente por delegación del consejo [1].',
      'Objetivos del variable fijados con la previsión ya rebajada [1].',
    ],
    confianza: 'Media',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'voto_cupula_pct (aprobación de la reelección del presidente en las tres últimas juntas)', tipo: 'Complemento', intentos: '1) Informe de valores 2025 y web de la junta (sin resultados en inglés); 2) búsqueda del informe extraordinario de resultados de voto (臨時報告書) en EDINET (no localizado en inglés); 3) informes de asesores de voto (solo la recomendación de 2022, sin porcentaje)', decision: 'Omitido' },
    { seccion: 'gobierno', campo: 'operaciones de directivos de los últimos 12 meses', tipo: 'Complemento', intentos: '1) Informe de valores (participaciones a fin de año, sin operaciones); 2) Japón no tiene registro público de operaciones de directivos (lecciones del repositorio); 3) informes de grandes participaciones de EDINET (solo por encima del 5 %)', decision: 'Omitido' },
  ],
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const comps = JSON.parse(fs.readFileSync(path.join(dir, 'tmp', 'comps.json'), 'utf8')).map(({ _w0, ...x }) => x);
// Kao, Lion y Colgate: el EBITDA de Yahoo de los últimos 12 meses no es fiable (igual al EBIT o con deterioros): fuera de EV/EBITDA y del margen.
for (const x of comps) if (['4452.T', '4912.T', 'CL'].includes(x.ticker)) { x.ev_ebitda_ltm = null; x.margen_ebitda_pct = null; }
const fD = [
  { id: 1, titulo: 'Yahoo Finance: históricos diarios de 8113.T, 1306.T (TOPIX) y 4452.T hasta el 15-oct-2026 (rango, volumen, rentabilidades, beta, cierres de ejercicio)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/quote/8113.T/history/' },
  { id: 2, titulo: 'Unicharm Corporation: estimaciones anuales 2026-2028 y consenso de 14 analistas («Outperform», objetivo medio 1.120,57 JPY)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://www.marketscreener.com/quote/stock/UNICHARM-CORPORATION-6491263/finances/' },
  { id: 3, titulo: 'Yahoo Finance quoteSummary 8113.T: tendencia de estimaciones de BPA (hace 30 y 90 días), recomendaciones (4 compra fuerte, 3 compra, 7 mantener), objetivos 980-1.450 JPY, fecha de resultados 6-nov-2026', editor: 'Yahoo Finance', tipo: 'Analistas', fecha: '2026-10-15', url: 'https://finance.yahoo.com/quote/8113.T/analysis/' },
  { id: 4, titulo: 'Yahoo Finance: cuentas y mercado de los comparables, pasados a JPY con el BCE del 14-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/' },
  { id: 5, titulo: 'Kimberly-Clark to Acquire Kenvue: valor empresa ≈ 48.700 M USD, 14,3 veces el EBITDA ajustado de 12 meses (8,8 con sinergias)', editor: 'Kirkland & Ellis (nota de la operación)', tipo: 'Prensa', fecha: '2025-11-03', url: 'https://www.kirkland.com/news/press-release/2025/10/kirkland-advises-kimberly-clark-on-487-billion-acquisition-of-kenvue' },
  { id: 6, titulo: 'RGE to acquire and privatize Vinda: 23,50 HKD por acción, 28.300 M HKD de capital', editor: 'Yicai Global', tipo: 'Prensa', fecha: '2023-12-15', url: 'https://yicaiglobal.com/news/singapores-rge-to-aquire-privatize-chinese-tissue-giant-vinda' },
  { id: 7, titulo: 'Suzano and Kimberly-Clark announce US$3.4B joint venture (papel internacional; ventas ≈ 3.300 M USD y EBITDA ≈ 500 M USD de 2024)', editor: 'Packaging Insights', tipo: 'Prensa', fecha: '2025-06-05', url: 'https://www.packaginginsights.com/news/suzano-kimberly-clark-joint-venture.html' },
  { id: 8, titulo: 'Interest Rate (October 2026): JGB a 10 años al 3,015 % (14-oct-2026)', editor: 'Ministerio de Hacienda de Japón', tipo: 'Primaria', fecha: '2026-10-14', url: 'https://www.mof.go.jp/english/policy/jgbs/reference/interest_rate/jgbcme.csv' },
  { id: 9, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026: 4,20 % (T12m with sustainable payout)', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 10, titulo: 'Tipos de cambio de referencia del BCE, 14-oct-2026 (177,39 JPY, 1,1195 USD, 11,158 SEK, 8,7859 HKD y 7,4925 CNY por EUR)', editor: 'Banco Central Europeo', tipo: 'Primaria', fecha: '2026-10-14', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml' },
  { id: 11, titulo: 'Consolidated Financial Results 1S26: acciones emitidas y autocartera a 30-jun-2026; balance para el puente', editor: 'Unicharm Corporation', tipo: 'Primaria', fecha: '2026-08-05', url: E + '20260805_Consolidated%20Financial%20Results%20for%20the%20Six%20Months%20Ended%20June%2030%2C%202026%20.pdf' },
  { id: 12, titulo: 'Annual Securities Report 66th FY 2025: instrumentos financieros (bonos, fondos y acciones a largo plazo), arrendamientos', editor: 'Unicharm Corporation', tipo: 'Primaria', fecha: '2026-03-23', url: UC + 'securities/Annual%20Securities%20Report%20for%20the%2066th%20Fiscal%20Year%20ended%20December%2031%2C%202025.pdf' },
  { id: 13, titulo: 'Calendar of IR Events: resultados del 3T26 a principios de noviembre', editor: 'Unicharm Corporation', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://www.unicharm.co.jp/en/ir/calendar.html' },
];
const D = {
  _estado: 'completa',
  identificacion: {
    nombre: 'Unicharm Corporation', nombre_corto: 'Unicharm', ticker: '8113', isin: 'JP3951600000', mercado: 'Bolsa de Tokio (Prime Market)', indice_referencia: 'TOPIX',
    pais: 'Japón', pais_iso: 'JP', sector: 'Consumo básico', industria: 'Productos para el hogar y personales', sede: 'Tokio (Minato-ku); domicilio social en Shikokuchuo, Ehime', fundacion: '1961', empleados: 16542, web: 'https://www.unicharm.co.jp/en/',
    precio: 1000.0, fecha_precio: '2026-10-15', acciones: 1720.8, capitalizacion_publicada: 1720800, free_float_pct: 67.4,
    max_52s: 1104.0, min_52s: 874.7, volumen_medio_diario: '≈ 4.900 M JPY/día (≈ 28 M EUR; 3 meses)', proximos_resultados: '2026-11-06',
  },
  consenso: {
    guidance: 'Guía 2026 revisada el 5-ago-2026: ventas de 1.015.000 M JPY (+7,4 %), beneficio básico de 113.000 M (+3,8 %), beneficio atribuido de 70.000 M y BPA de 40,68 JPY; la de febrero era 136.000 M y 50,26 JPY [11]. Dividendo de 22 JPY (11 + 11). Objetivos fijos del plan 2026-2030: ventas de 1,3 billones en 2030 (aspiración, 1,5 billones con margen básico y ROE del 17 %) y retribución total ≥ 65 % [11].',
    estimaciones: [
      { periodo: '2026e', ingresos: 1004480, ebitda: 164099, ebit: 117865, bpa: 42.69, dpa: 21.85, fuente: 'MarketScreener, 14 analistas [2]' },
      { periodo: '2027e', ingresos: 1056218, ebitda: 181016, ebit: 133771, bpa: 50.02, dpa: 23.77, fuente: 'MarketScreener, 14 analistas [2]' },
      { periodo: '2028e', ingresos: 1104972, ebitda: 192963, ebit: 145334, bpa: 54.70, dpa: 25.84, fuente: 'MarketScreener [2]' },
    ],
    recomendaciones: { n_analistas: 14, comprar: 7, mantener: 7, vender: 0, po_medio: 1120.57, po_min: 980.0, po_max: 1450.0 },
    revisiones: 'El BPA de 2026 del consenso bajó de 46,76 JPY hace 90 días a 45,46 hace 30 y 42,69 hoy (−8,7 %), y el de 2027 de 50,77 a 50,02 (−1,5 %): los analistas han recogido el recorte de la guía de agosto en el año en curso, pero apenas en 2027 [3]. El consenso de 2026 (42,69) sigue por encima de la guía (40,68). Dos proveedores (MarketScreener y Yahoo) dan las mismas cifras de BPA y el mismo objetivo medio (1.120,57 JPY) [2, 3].',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  multiplos_historicos: {
    serie: [
      { anio: '2020', precio_cierre: 1630.67, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2021', precio_cierre: 1666.33, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2022', precio_cierre: 1689.33, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2023', precio_cierre: 1699.33, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2024', precio_cierre: 1302.5, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2025', precio_cierre: 895.0, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
    ],
    confianza: 'Alta',
  },
  comparables: { empresas: comps, confianza: 'Media' },
  transacciones: {
    operaciones: [
      { fecha: '2025-11', objetivo: 'Kenvue (cuidado personal y salud de consumo)', comprador: 'Kimberly-Clark', ev: 7716000, ev_ventas: null, ev_ebitda: 14.3, prima_pct: null, excluir: false, comentario: '48.700 M USD; 14,3 veces el EBITDA ajustado (8,8 con sinergias) [5].' },
      { fecha: '2024-03', objetivo: 'Vinda International (papel y absorbentes, China)', comprador: 'Royal Golden Eagle (RGE)', ev: 638000, ev_ventas: null, ev_ebitda: 11.7, prima_pct: null, excluir: false, comentario: 'Capital de 28.300 M HKD más deuda neta de ≈ 3.300 M HKD; múltiplo sobre el EBITDA estimado de 2023 (2.700 M HKD): estimación propia [6].' },
      { fecha: '2025-06', objetivo: 'Negocio internacional de papel de Kimberly-Clark (51 %)', comprador: 'Suzano', ev: 538700, ev_ventas: 1.03, ev_ebitda: 6.8, prima_pct: null, excluir: true, comentario: 'Papel tisú, no absorbentes: solo como suelo de referencia; múltiplo estimado con el EBITDA de 2024 publicado en prensa [7].' },
      { fecha: '2026-06', objetivo: 'Nutrire Indústria de Alimentos (comida para mascotas, Brasil)', comprador: 'Unicharm', ev: 21965, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Pago neto de caja; múltiplos no publicados [11].' },
    ],
    confianza: 'Baja',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'comparables', campo: 'EV/EBITDA de los próximos 12 meses', tipo: 'Complemento', intentos: '1) Yahoo (sin EBITDA estimado); 2) MarketScreener (EV/EBITDA no mostrado para Unicharm ni gratis para comparables); 3) derivarlo con márgenes supuestos mezclaría definiciones', decision: 'Omitido' },
    { seccion: 'bolsa', campo: 'posicion_corta_pct', tipo: 'Complemento', intentos: '1) JPX publica solo posiciones ≥ 0,5 % por gestor; 2) Yahoo (sin dato para Tokio); 3) foros: comentan que las posiciones de los gestores bajaron del umbral de publicación en octubre (opinión, no dato)', decision: 'Omitido' },
  ],
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Yahoo! Finance Japón, foro de 8113 (ユニ・チャーム), mensajes del 13 al 15-oct-2026', editor: 'Yahoo! Finance Japón', tipo: 'Foros y redes', fecha: '2026-10-15', url: 'https://finance.yahoo.co.jp/quote/8113.T/forum' },
  { id: 2, titulo: 'Seeking Alpha: noticias y análisis de Unicharm (UNICY), RSS', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-15', url: 'https://seekingalpha.com/api/sa/combined/UNICY.xml' },
  { id: 3, titulo: 'Stocktwits: flujo de UNICY', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-15', url: 'https://api.stocktwits.com/api/2/streams/symbol/UNICY.json' },
  { id: 4, titulo: 'Interim Financial Results Briefing FY2026: Q&A Summary (preguntas de analistas)', editor: 'Unicharm Corporation', tipo: 'Primaria', fecha: '2026-08-06', url: UC + 'investors/E_202606_QA_Summary.pdf' },
];
const EE = {
  _estado: 'completa',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Yahoo! Finance Japón (foro de 8113)', fecha: '2026-10', n_comentarios: 30, tono: 'Dividido', resumen: 'Euforia contenida por la subida de siete sesiones seguidas y el paso de los 1.000 JPY el día que el Nikkei cayó un 4,9 %; unos lo ven como refugio defensivo y especulan con una opa de la familia, otros temen que el 3T decepcione y que el valor vuelva a los 890 JPY [1].' },
      { plataforma: 'Seeking Alpha (UNICY)', fecha: '2026-08', n_comentarios: 8, tono: 'Neutro', resumen: 'Solo noticias de resultados y transcripciones (1S26 del 6-ago-2026), sin debate de lectores; una noticia sobre Kimberly-Clark y la caída de la natalidad en Vietnam [2].' },
      { plataforma: 'Preguntas de analistas en la presentación del 1S26', fecha: '2026-08', n_comentarios: 12, tono: 'Negativo', resumen: 'Escepticismo sobre la guía recortada (¿suelo u objetivo?), sobre la recuperación de China y sobre la prima pagada por el SAP [4].' },
    ],
    temas: [
      { tema: 'Refugio defensivo en la caída del mercado', postura: 'Alcista', peso: 'Alto', contraste: 'La beta mensual frente al TOPIX es de 0,34: el valor se comporta como defensivo, pero eso no cambia el beneficio [1].' },
      { tema: 'Posible opa de exclusión de la familia Takahara', postura: 'Dividida', peso: 'Medio', contraste: 'La familia tiene el 31,6 % y no ha anunciado nada; con un 65 % de reparto en recompras y dividendos no necesita excluir la empresa. Especulación sin hechos [1].' },
      { tema: 'Resultados del 3T (6-nov-2026) como prueba', postura: 'Dividida', peso: 'Alto', contraste: 'La guía ya recortada supone un 2S peor que el de 2025 (≈ 48.000 M de beneficio básico frente a 51.870 M); un 3T en línea confirmaría el suelo [1, 4].' },
      { tema: 'Cierre de posiciones cortas de los gestores', postura: 'Alcista', peso: 'Medio', contraste: 'No comprobado en el registro de JPX; no entra en el análisis [1].' },
    ],
    lectura: 'El inversor particular japonés pasó de la capitulación (mínimo de 874,7 JPY en enero) a una euforia prudente con la subida de octubre, sobre todo como refugio frente a la caída del Nikkei. Los analistas son más escépticos tras el recorte de agosto. Ni unos ni otros discuten lo que decide la tesis: si el margen de Asia y China vuelve en 2027. La especulación sobre una opa de la familia no tiene base publicada. No cambia la decisión; avisa de que una parte de la subida reciente es flujo defensivo que puede darse la vuelta si el mercado rebota.',
    confianza: 'Baja',
  },
  fuentes: fE,
  huecos: [],
};
guarda('E', EE);
console.log('Notas A-E escritas');
