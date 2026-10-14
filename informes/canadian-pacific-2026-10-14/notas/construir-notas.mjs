// Escribe las notas A-E de Canadian Pacific Kansas City (corte 2026-10-14) a partir de los documentos de notas/docs
// (10-K, 10-K/A, 10-Q y notas de resultados de la SEC; transcripción del 2T26) y de datos de mercado.
// Cada nota cita solo con [n] de su propia lista de fuentes. Ejecutar: node notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const SEC = 'https://www.sec.gov/Archives/edgar/data/16875';
const USDCAD = 1.4219; // BCE 14-oct-2026: 1,5918 CAD/EUR ÷ 1,1195 USD/EUR (Banco de Canadá 13-oct: 1,4222)
const AUDCAD = 1.5918 / 1.5971;

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Form 10-K 2025 (cuentas consolidadas, notas de deuda, pensiones, ingresos por línea de negocio y por país, conciliación del BPA core)', editor: 'Canadian Pacific Kansas City Limited (SEC)', tipo: 'Primaria', fecha: '2026-02-26', url: `${SEC}/000001687526000008/cp-20251231.htm` },
  { id: 2, titulo: 'Form 10-K 2023 (cuentas 2023-2021, toma de control de KCS, BPA core combinado 2023)', editor: 'Canadian Pacific Kansas City Limited (SEC)', tipo: 'Primaria', fecha: '2024-02-27', url: `${SEC}/000001687524000009/cp-20231231.htm` },
  { id: 3, titulo: 'Form 10-K 2021 (cuentas 2021-2019, inversión en KCS, comisión de ruptura de 845 M)', editor: 'Canadian Pacific Railway Limited (SEC)', tipo: 'Primaria', fecha: '2022-02-23', url: `${SEC}/000001687522000010/cp-20211231.htm` },
  { id: 4, titulo: 'Form 10-K 2022 (BPA ajustado y core 2018-2022)', editor: 'Canadian Pacific Railway Limited (SEC)', tipo: 'Primaria', fecha: '2023-02-24', url: `${SEC}/000001687523000008/cp-20221231.htm` },
  { id: 5, titulo: 'Q2 2026 earnings release (cuenta, balance y flujos del 2T26; conciliaciones no GAAP)', editor: 'CPKC (8-K, anexo 99.1)', tipo: 'Primaria', fecha: '2026-07-29', url: `${SEC}/000001687526000024/exhibit991-q22026earningsr.htm` },
  { id: 6, titulo: 'Q1 2026 earnings release', editor: 'CPKC (8-K, anexo 99.1)', tipo: 'Primaria', fecha: '2026-04-29', url: `${SEC}/000001687526000013/exhibit991-q12026earningsr.htm` },
  { id: 7, titulo: 'Q4 2025 earnings release y guía 2026', editor: 'CPKC (8-K, anexo 99.1)', tipo: 'Primaria', fecha: '2026-01-28', url: `${SEC}/000001687526000004/exhibit991-q42025earningsr.htm` },
  { id: 8, titulo: 'Q3 2025 earnings release', editor: 'CPKC (8-K, anexo 99.1)', tipo: 'Primaria', fecha: '2025-10-29', url: `${SEC}/000001687525000037/exhibit991-q32025earningsr.htm` },
  { id: 9, titulo: 'Form 10-Q 2T26 (acciones en circulación a 28-jul-2026, recompras, deuda)', editor: 'CPKC (SEC)', tipo: 'Primaria', fecha: '2026-07-30', url: `${SEC}/000001687526000026/cp-20260630.htm` },
  { id: 10, titulo: 'Q2 2026 earnings call transcript', editor: 'CPKC (web de inversores)', tipo: 'Primaria', fecha: '2026-07-29', url: 'https://s21.q4cdn.com/736796105/files/doc_financials/2026/q2/Q2-2026-Transcript_Website_vF.pdf' },
  { id: 11, titulo: 'XBRL companyfacts (CIK 16875): cuenta, balance y flujos 2017-2025', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-14', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0000016875.json' },
  { id: 12, titulo: 'Q4 2024 earnings release y guía 2025 (BPA core +12-18 %)', editor: 'CPKC (8-K, anexo 99.1)', tipo: 'Primaria', fecha: '2025-01-29', url: `${SEC}/000001687525000004/exhibit991-q42024earningsr.htm` },
  { id: 13, titulo: 'CPKC announces C$1.8 billion debt offering', editor: 'CPKC (8-K)', tipo: 'Primaria', fecha: '2026-09-28', url: `${SEC}/000119312526407607/d161842dex991.htm` },
];
const cta = (periodo, ingresos, ebitda, amort, ebit, rf, bai, imp, min, bn, gf, bpa, dpa, acc) => ({ periodo, ingresos, coste_ventas: null, gastos_generales: null, ebitda, amortizaciones: amort, ebit, resultado_financiero: rf, bai, impuestos: imp, minoritarios: min, beneficio_neto: bn, gastos_financieros: gf, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa, dpa, dpa_extraordinario: 0, acciones_diluidas: acc });
const bal = (periodo, at, ac, pc, pt, fc, int, ppe, ex, cl, pr, caja, deuda, pn, mi, res) => ({ periodo, activo_total: at, activo_corriente: ac, pasivo_corriente: pc, pasivo_total: pt, fondo_comercio: fc, intangibles: int, inmovilizado_material: ppe, existencias: ex, clientes: cl, proveedores: pr, activos_contrato: null, pasivos_contrato: null, caja, deuda_financiera: deuda, arrendamientos: 0, patrimonio_neto: pn, minoritarios: mi, reservas: res });
const flu = (periodo, fo, capex, arr, adq, desinv, div, rec, emi) => ({ periodo, flujo_operativo: fo, capex, pagos_arrendamientos: arr, adquisiciones: adq, desinversiones: desinv, dividendos: div, recompras: rec, emision_acciones: emi, intereses_en_financiacion: 0 });
const seg = (nombre, descripcion, hist) => ({ nombre, descripcion, tipo_resultado: null, historico: hist.map(([periodo, ingresos]) => ({ periodo, ingresos, resultado: null })) });
const lin = (v) => ['2021', '2022', '2023', '2024', '2025'].map((p, i) => [p, v[i]]);

const A = {
  _estado: 'completa',
  financieros: {
    cuenta: [
      cta('2019', 7792, 3830, 706, 3124, 22, 3146, 706, 0, 2440, 448, 3.50, 0.628, 696.3),
      cta('2020', 7710, 4090, 779, 3311, -109, 3202, 758, 0, 2444, 458, 3.59, 0.712, 679.9),
      cta('2021', 7995, 4017, 811, 3206, 414, 3620, 768, 0, 2852, 440, 4.18, 0.76, 682.8),
      cta('2022', 8814, 4182, 853, 3329, 816, 4145, 628, 0, 3517, 652, 3.77, 0.76, 932.9),
      cta('2023', 12555, 5931, 1543, 4388, -7441, -3053, -6976, -4, 3927, 771, 4.21, 0.76, 933.7),
      cta('2024', 14546, 7079, 1900, 5179, -407, 4772, 1059, -5, 3718, 801, 3.98, 0.76, 934.6),
      cta('2025', 15078, 7628, 2019, 5609, -127, 5482, 1345, -4, 4141, 876, 4.51, 0.874, 917.1),
    ],
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 15449, ebitda: 7732, ebit: 5679, beneficio_neto: 3867, bpa: 4.30, dpa: 0.952, dpa_extraordinario: 0, fcf: 2441, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [
      { periodo: '2021', descripcion: 'Compra de Kansas City Southern (14-dic-2021): CP paga 12.299 M en caja y emite acciones; KCS queda en un fideicomiso de voto y entra por puesta en equivalencia (inversión de 42.309 M en el balance, sin ingresos en la cuenta). Acciones diluidas de 682,8 M (media) a 933 M.' },
      { periodo: '2023', descripcion: 'Toma de control de KCS el 14-abr-2023 tras la aprobación del STB: consolidada desde esa fecha (ingresos de 8.814 M en 2022 a 12.555 M); revaloración de la participación con pérdida de 7.175 M y recuperación de impuestos diferidos de 7.885 M.' },
    ],
    comentario: 'Los ingresos pasan de 7.792 M en 2019 a 15.078 M en 2025 [1, 3]: casi todo el salto es inorgánico (KCS consolidada desde abril de 2023 [2]). En perímetro constante, 2024 creció un 16 % por el año completo de KCS y 2025 un 4 %, con las toneladas-milla (RTM) +4 % y el ingreso por RTM plano (6,73 céntimos) [1]. El margen EBITDA publicado sube del 47,2 % de 2023 al 50,6 % de 2025: el ratio operativo core baja del 61,3 % al 59,9 %, récord de la compañía, por productividad (velocidad de la red, trenes más pesados, plantilla −2 %) [1, 7]. La amortización salta de 853 M a 2.019 M por la revalorización de los activos de KCS (373 M al año de amortización de la contabilidad de compra en 2025) [1]. En el primer semestre de 2026 los ingresos suben un 5 % y el BPA core un 5,5 % (2,30 frente a 2,18), con el combustible (+21 % en gasto; diésel +70 % por la guerra con Irán) y la huelga de señalistas como lastres; el 2T26 ya creció un 13 % en ingresos y en BPA core [5, 6, 10].',
    ajustes: 'Usamos las cifras publicadas (US GAAP). La empresa da un «BPA core ajustado» que excluye partidas no recurrentes y la amortización de la contabilidad de compra de KCS: 3,77 (2022), 3,84 (2023), 4,25 (2024) y 4,61 (2025) frente a 3,77, 4,21, 3,98 y 4,51 publicados [1, 2]. Las partidas no recurrentes: 2021, comisión de ruptura cobrada a KCS (+845 M, +1,24 por acción) y costes de la compra [3]; 2023, pérdida de revaloración de KCS (−7.175 M) compensada por la liberación de impuestos diferidos (−8,42 por acción) [2]; 2024, bajadas de tipos estatales (+0,09) [1]; 2025, plusvalía por la venta de una participada (+333 M, +0,27 neto) y costes de integración (72 M) [1]; 2026, costes de integración y de asesoría sobre la fusión UP-NS (63 M en el semestre) [5]. Para la rentabilidad a 12 meses usamos un BPA normalizado que quita esas partidas pero deja la amortización de la compra (es amortización real de activos que hay que reponer): 3,60 (2022), 3,60 (2023), 3,98 (2024) y 4,30 (2025), unos 0,31 por acción por debajo del core [1, 2, 4].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '3T24', ingresos: 3549, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 1675, margen_ebitda_pct: 47.2, bpa: 0.90, vs_consenso: null },
      { periodo: '4T24', ingresos: 3874, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 2048, margen_ebitda_pct: 52.9, bpa: 1.28, vs_consenso: null },
      { periodo: '1T25', ingresos: 3795, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 1821, margen_ebitda_pct: 48.0, bpa: 0.97, vs_consenso: null },
      { periodo: '2T25', ingresos: 3699, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 1836, margen_ebitda_pct: 49.6, bpa: 1.33, vs_consenso: null },
      { periodo: '3T25', ingresos: 3661, crecimiento_pct: 3.2, crecimiento_organico_pct: null, ebitda: 1839, margen_ebitda_pct: 50.2, bpa: 1.01, vs_consenso: null },
      { periodo: '4T25', ingresos: 3923, crecimiento_pct: 1.3, crecimiento_organico_pct: null, ebitda: 2132, margen_ebitda_pct: 54.3, bpa: 1.20, vs_consenso: null },
      { periodo: '1T26', ingresos: 3701, crecimiento_pct: -2.5, crecimiento_organico_pct: null, ebitda: 1770, margen_ebitda_pct: 47.8, bpa: 0.94, vs_consenso: null },
      { periodo: '2T26', ingresos: 4164, crecimiento_pct: 12.6, crecimiento_organico_pct: 12.0, ebitda: 1991, margen_ebitda_pct: 47.8, bpa: 1.15, vs_consenso: 'Superior' },
    ],
    ultima_presentacion: 'En la conferencia del 2T26 (29-jul-2026) la dirección repitió que espera «otro año de crecimiento de doble dígito del beneficio» en 2026 y un segundo semestre de aceleración del volumen [10]; la guía de enero era un BPA core «low double-digit» sobre 4,61, RTM +mid-single digit e inversión de 2.650 M [7]. El trimestre batió: BPA core 1,27 frente a 1,12 (+13 %), con récords en grano (+24 % de ingresos), químicos y automóvil, y el carbón −18 % por problemas en las minas de los clientes [5, 10]. El director comercial cifró las sinergias de ingresos de KCS en 1.400-1.500 M USD de ritmo anual al cierre de 2026 (+300 M en el año) y el «puente terrestre» Canadá-México en 600 M a final de año con camino a 1.000 M [10]. Los costes de siniestros y la remuneración en acciones restaron un 4 % al BPA y el combustible 130 pb al ratio operativo [10]. Las preguntas se centraron en la fusión Union Pacific-Norfolk Southern y en el acuerdo de UP con CN (Memphis, EJ&E): el consejero delegado se opuso con dureza («si se aprueba, la consolidación es imparable») y no cuantificó el efecto en CPKC; tampoco actualizó cifras de la guía, solo la reafirmó de palabra [10]. El consenso previo esperaba un BPA core de 1,24 según la prensa financiera.',
    confianza: 'Alta',
  },
  balance: {
    historico: [
      bal('2019', 22367, 1210, 2292, 15298, 194, 12, 19156, null, 805, 1693, 133, 8757, 7069, 0, 7550),
      bal('2020', 23640, 1321, 2653, 16321, 329, 37, 20422, 208, 825, 1467, 147, 9771, 7319, 0, 8095),
      bal('2021', 68177, 1352, 3159, 34348, 328, 43, 21200, 235, 819, 1609, 69, 20127, 33829, 0, 10391),
      bal('2022', 73495, 1889, 3213, 34609, 344, 42, 22385, 284, 1016, 1703, 451, 19651, 38886, 0, 13201),
      bal('2023', 79902, 3002, 5710, 37491, 17729, 2974, 51744, 400, 1887, 2567, 464, 22494, 41492, 919, 16420),
      bal('2024', 87744, 3384, 5661, 38854, 19350, 3146, 56024, 457, 1968, 2842, 739, 22623, 47892, 998, 19429),
      bal('2025', 85945, 2939, 5991, 39120, 18436, 2911, 55323, 502, 2029, 2751, 184, 23188, 45877, 948, 19783),
    ],
    vencimientos: [
      { anio: '2026', importe: 3228 }, { anio: '2027', importe: 7 }, { anio: '2028', importe: 1893 }, { anio: '2029', importe: 990 }, { anio: '2030', importe: 1514 }, { anio: '2031+', importe: 16189 },
    ],
    liquidez: 'Caja de 366 M (30-jun-2026) + línea de crédito de 2.200 M USD (dos tramos de 1.100 M, a 2027 y 2030), que respalda un programa de papel comercial de hasta 1.500 M USD; papel comercial vivo de 850 M USD a cierre de 2025 [1, 5]. En octubre de 2026 colocó 1.800 M CAD en cuatro bonos (4,20 % a 2030 a 5,40 % a 2056) para refinanciar [13].',
    rating: "S&P BBB+ (perspectiva positiva, subida en el 4T25); Moody's Baa1 estable (subida en el 1T25) [1]",
    coste_deuda_pct: 3.8,
    vida_media_anios: null,
    otros_pasivos: 'Pensiones: superávit neto de 4.543 M a cierre de 2025 (activo de 5.129 M y planes con déficit de 155 M, más 431 M de otros beneficios) [1]; genera una «recuperación» contable de 441 M al año en la cuenta (por debajo del EBIT) [7]. No lo sumamos al puente (no se puede retirar), y lo decimos como potencial. Arrendamientos operativos de 437 M (US GAAP: su gasto ya está en el EBITDA, no van a la deuda) [1]. Provisiones medioambientales y litigios: el accidente de Lac-Mégantic (2013) sigue con reclamaciones residuales (6 M USD en Dakota del Norte) y hay un litigio fiscal en México (amparo de CPKCM) [5]. Compromisos de inversión y servicios de 1.758 M a 12 meses [1]. Impuestos diferidos de 12.165 M, sobre todo por la revalorización de KCS [5]. Recompras pendientes de cancelar e impuesto del 2 % sobre recompras en Canadá (36 M en el semestre) [9].',
    comentario: 'La deuda financiera bruta pasa de 8.757 M en 2019 a 20.127 M en 2021 por la compra de KCS y queda en 23.188 M a cierre de 2025 y 25.147 M en junio de 2026 [1, 3, 5]: la empresa la sube para recomprar acciones (3.942 M en 2025 y 1.963 M en el primer semestre de 2026) en vez de reducirla [1, 5]. La deuda neta ajustada que publica la empresa (con arrendamientos y déficit de pensiones) es de 25.787 M, 3,2 veces el EBITDA ajustado, frente a 3,0 un año antes [5]; la agencia la tolera porque S&P subió la nota a BBB+ positiva. El circulante es negativo: clientes y existencias (2.531 M) por debajo de proveedores (2.751 M) [1]. La deuda a corto (3.240 M en 2025) incluye el papel comercial; el XBRL de la SEC solo recoge el papel comercial en 2023-2025 y lo hemos corregido con el balance [1, 11].',
    confianza: 'Alta',
  },
  flujos: {
    historico: [
      flu('2019', 2990, 1647, 6, 174, 26, 412, 1134, 26),
      flu('2020', 2802, 1671, 8, 379, 22, 467, 1509, 52),
      flu('2021', 3688, 1532, 8, 12299, 96, 507, 0, 25),
      flu('2022', 4142, 1557, 104, 0, 58, 707, 0, 32),
      flu('2023', 4137, 2499, 13, 0, 355, 707, 0, 69),
      flu('2024', 5269, 2825, 13, 0, 0, 709, 0, 69),
      flu('2025', 5309, 3102, 11, 0, 493, 796, 3942, 73),
    ],
    comentario: 'El flujo operativo crece de 2.990 M (2019) a 5.309 M (2025) y la conversión del beneficio core en caja libre es baja en 2023-2025 porque la inversión subió al 19-21 % de las ventas (2.499-3.102 M) para integrar KCS: vía de Laredo, apartaderos, sistemas y locomotoras [1, 2]. La guía de 2026 baja la inversión a 2.650 M (−15 %) [7] y la caja libre ajustada del semestre sube un 25 %, a 1.300 M [10]. Estimación propia: el mantenimiento de un ferrocarril de clase I ronda 1,1-1,2 veces la amortización sin la contabilidad de compra (unos 1.650 M en 2025); el resto, 1.000-1.400 M, es crecimiento e integración. 2021 lleva la compra de KCS (12.299 M en caja) y 2023 la caja adquirida al tomar el control (298 M, como desinversión) [2, 3]. Desde 2025 la caja va a recompras: 3.942 M en 2025, más que la caja libre (2.207 M), con deuda [1].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'Ernst & Young LLP',
    anios_auditor: 9,
    opinion: 'Favorable, sin salvedades; control interno eficaz [1]',
    comentario: 'Cuentas en US GAAP y en CAD. Tres hechos que distorsionan los ratios: (1) KCS por puesta en equivalencia en 2021-2022 (42.309-45.091 M de inversión sin ingresos en la cuenta) y consolidada desde abril de 2023 [2]; (2) la revalorización de la participación al tomar el control dejó un fondo de comercio de 17.729 M, intangibles de 2.974 M y activos materiales revalorizados, que se amortizan a 373-391 M al año [1, 2]; (3) los impuestos de 2023 son negativos (−6.976 M) por la liberación del impuesto diferido sobre la inversión en KCS, de una vez [2]. La remuneración en acciones es pequeña (unos 70 M de PSU al año frente a 4.141 M de beneficio) [5]. El superávit de pensiones aporta 441 M de ingreso contable no monetario al año (unos 0,37 por acción después de impuestos), dentro del beneficio y del BPA core [7]. Altman, Piotroski y Beneish del motor: el Beneish de 2023 se distorsiona por la consolidación de KCS y el Altman es bajo por el tamaño del activo (no por riesgo: rating BBB+ positivo).',
    senales: [
      { senal: 'Ingreso contable de pensiones dentro del BPA', nivel: 'Media', comentario: '441 M en 2026 (expected return sobre el superávit), sin entrada de caja; forma parte del BPA core y del nuestro [7].' },
      { senal: 'BPA core excluye amortización recurrente de la compra de KCS', nivel: 'Media', comentario: 'Unos 0,31 por acción al año durante décadas: el «core» infla el BPA un 7 % respecto al publicado normalizado [1].' },
      { senal: 'Costes de integración que se repiten desde 2021', nivel: 'Baja', comentario: '72 M en 2025 y 36 M en el 1S26, a la baja; se excluyen del core [1, 5].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Dividendo trimestral de 0,268 CAD desde el 2T26 (+18 % sobre 0,228), con un pago del 20 % del beneficio core [5]. Recompra (NCIB) de hasta 44,9 M de acciones (5 %) entre el 2-feb-2026 y el 1-feb-2027, tras completar la de 37,3 M en octubre de 2025 [9]. Prioridades declaradas: inversión en la red (2.650 M en 2026), dividendo y recompras «oportunistas»; mantener el rating BBB+ con deuda neta ajustada de unas 3 veces el EBITDA [5, 10].',
    adquisiciones: [
      { anio: '2021', objetivo: 'Kansas City Southern (control efectivo desde abr-2023)', importe: 44079, ev_ebitda: 19.4, financiacion: 'Acciones (2,884 por acción de KCS) y 90 USD en caja; deuda de 3.800 M USD asumida', resultado: 'Integrada; sinergias de ingresos de 1.400-1.500 M USD de ritmo anual a final de 2026 y ratio operativo core récord; pero el ROIC del grupo cae por debajo del WACC por la prima pagada (fondo de comercio de 17.729 M) [1, 10].' },
      { anio: '2020', objetivo: 'Detroit River Tunnel Partnership (50 % restante)', importe: 398, ev_ebitda: null, financiacion: 'Caja', resultado: 'Integrada, sin deterioros [3].' },
      { anio: '2020', objetivo: 'Central Maine & Québec Railway', importe: 174, ev_ebitda: null, financiacion: 'Caja', resultado: 'Integrada en la red del este, sin deterioros [3].' },
    ],
    comentario: 'La asignación de capital de la última década se juzga por KCS: CP pagó unos 31.000 M USD de valor empresa, 19,4 veces el EBITDA ajustado de KCS según el folleto de la operación, y a cambio tiene la única red de Canadá a México y un ROIC que hoy no cubre el coste de capital en cifras publicadas. Las sinergias superan el plan (1.400-1.500 M USD de ingresos frente a 1.000 M del caso de la compra) [10], pero el ROIC incremental es bajo porque el capital invertido se multiplicó por 2,5. Desde 2025 la caja libre y deuda nueva van a recompras: 3.942 M en 2025 y 1.963 M en el 1S26, 51 M de acciones menos (−5,5 %) [1, 5]. Recomprar a 23-25 veces el beneficio con deuda al 4-5 % es razonable si el crecimiento de doble dígito se cumple.',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      seg('Grano', 'Grano canadiense y estadounidense hacia puertos (Vancouver, Thunder Bay), EE. UU. y México', lin([1684, 1776, 2496, 3012, 3217])),
      seg('Carbón', 'Carbón metalúrgico canadiense a Vancouver y térmico de la Powder River Basin en EE. UU.', lin([625, 577, 859, 943, 1025])),
      seg('Potasa, fertilizantes y azufre', 'Potasa de Saskatchewan (Canpotex) y fertilizantes', lin([768, 913, 951, 1020, 1063])),
      seg('Productos forestales', 'Madera y celulosa de Canadá hacia EE. UU. y México', lin([348, 403, 696, 816, 792])),
      seg('Energía, químicos y plásticos', 'Productos petrolíferos refinados, GLP, crudo, químicos y plásticos (sobre todo hacia México y el Golfo)', lin([1563, 1394, 2301, 2851, 2898])),
      seg('Metales, minerales y consumo', 'Acero, áridos, bienes de consumo', lin([728, 884, 1579, 1777, 1792])),
      seg('Automóvil', 'Vehículos terminados y piezas, con mucho tráfico entre México y EE. UU.', lin([376, 438, 934, 1280, 1310])),
      seg('Intermodal y otros', 'Contenedores internacionales (Vancouver, Saint John, Lázaro Cárdenas) y nacionales; ingresos no ferroviarios', lin([1903, 2429, 2739, 2847, 2981])),
    ],
    geografias: [{ nombre: 'Canadá', peso_pct: 48.0 }, { nombre: 'EE. UU.', peso_pct: 34.0 }, { nombre: 'México', peso_pct: 18.0 }],
    geografias_criterio: 'origen',
    kpis: [
      { kpi: 'Toneladas-milla (RTM, millones)', valor_anterior: '211.458', valor_actual: '219.420', variacion: '+4 %', comentario: '2025 frente a 2024 [1]; 1S26 +3 % (2T26 +4 %) [5]' },
      { kpi: 'Vagones (miles)', valor_anterior: '4.370', valor_actual: '4.514', variacion: '+3 %', comentario: '2025 [1]' },
      { kpi: 'Ingreso por vagón (CAD)', valor_anterior: '3.255', valor_actual: '3.273', variacion: '+1 %', comentario: 'Precio y mezcla, con el recargo de combustible a la baja en 2025 [1]' },
      { kpi: 'Ratio operativo core', valor_anterior: '61,3 %', valor_actual: '59,9 %', variacion: '−140 pb', comentario: '2025; 1S26 62,3 % por combustible y huelga [1, 5]' },
      { kpi: 'Plantilla a fin de año', valor_anterior: '19.924', valor_actual: '19.479', variacion: '−2 %', comentario: 'Productividad con volumen al alza [1]' },
      { kpi: 'Sinergias de ingresos de KCS (ritmo anual, USD)', valor_anterior: '≈ 1.100-1.200 M', valor_actual: '1.400-1.500 M (fin de 2026)', variacion: '+300 M', comentario: 'Según la dirección en el 2T26 [10]' },
    ],
  },
  fuentes: fA,
  huecos: [
    { seccion: 'trimestres', campo: 'consenso previo de cada trimestre (3T24-1T26)', tipo: 'Complemento', intentos: '1) Notas de resultados (no lo dan); 2) MarketScreener (gráficos sin texto); 3) Seeking Alpha RSS (solo el titular del 2T26)', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Form 10-K 2025 de CPKC (red de 20.000 millas, competencia, regulación del STB y de la ARTF en México, ingresos por país)', editor: 'CPKC (SEC)', tipo: 'Primaria', fecha: '2026-02-26', url: `${SEC}/000001687526000008/cp-20251231.htm` },
  { id: 2, titulo: 'Finanzas y previsiones de Canadian National (CNR)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/CANADIAN-NATIONAL-RAILWAY-1409526/finances/' },
  { id: 3, titulo: 'Finanzas y previsiones de Union Pacific (UNP)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/UNION-PACIFIC-CORPORATION-14754/finances/' },
  { id: 4, titulo: 'Finanzas y previsiones de CSX', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/CSX-CORPORATION-25500636/finances/' },
  { id: 5, titulo: 'Finanzas y previsiones de Norfolk Southern (NSC)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/NORFOLK-SOUTHERN-CORPORAT-13802/finances/' },
  { id: 6, titulo: 'For BNSF, 2025 revenue, volume flat (ingresos de 23.348 M USD, ratio operativo 65,5 %)', editor: 'Railway Age', tipo: 'Prensa', fecha: '2026-02', url: 'https://www.railwayage.com/freight/class-i/for-bnsf-2025-revenue-volume-flat/' },
  { id: 7, titulo: 'Union Pacific to acquire Norfolk Southern (presentación: 320 USD por acción, valor empresa de 85.000 M USD, prima del 25 %, sinergias de 2.750 M USD)', editor: 'Union Pacific (8-K)', tipo: 'Primaria', fecha: '2025-07-29', url: 'https://www.sec.gov/Archives/edgar/data/100885/000119312525167154/d64537dex991.htm' },
  { id: 8, titulo: 'STB acepta la solicitud revisada de fusión UP-NS (28-may-2026); decisión prevista en 2027', editor: 'American-Rails / Logistics Management', tipo: 'Prensa', fecha: '2026-05-28', url: 'https://www.american-rails.com/nsupstbaccept.html' },
  { id: 9, titulo: 'CUSMA Joint Review: U.S. triggers annual review process while pacts remain in force', editor: 'Willson International', tipo: 'Sectorial', fecha: '2026-07-02', url: 'https://www.willsonintl.com/news/cusma-joint-review-u-s-triggers-annual-review-process-while-pacts-remain-in-force/' },
  { id: 10, titulo: 'Q2 2026 earnings call transcript (sinergias, puente terrestre, fusión UP-NS, acuerdo UP-CN)', editor: 'CPKC', tipo: 'Primaria', fecha: '2026-07-29', url: 'https://s21.q4cdn.com/736796105/files/doc_financials/2026/q2/Q2-2026-Transcript_Website_vF.pdf' },
  { id: 11, titulo: 'Union Pacific, Norfolk Southern drop as state AGs raise concerns over combination', editor: 'Seeking Alpha (noticias)', tipo: 'Prensa', fecha: '2026-09-01', url: 'https://seekingalpha.com/symbol/CP' },
  { id: 12, titulo: 'Finanzas y previsiones de Aurizon (AZJ)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/AURIZON-HOLDINGS-LIMITED-12081981/finances/' },
];
const B = {
  _estado: 'completa',
  sector: {
    definicion: 'Transporte de mercancías por ferrocarril de clase I en Norteamérica: las seis grandes redes de EE. UU. y Canadá (Union Pacific, BNSF, CSX, Norfolk Southern, Canadian National y CPKC), con la red mexicana de CPKC incluida y sin GMéxico Transportes (sin datos comparables) ni los ferrocarriles regionales [1-6]. Es el mercado en el que CPKC compite por los mismos clientes y el perímetro de la prueba de cuota. Tamaño = suma de los ingresos publicados de las seis (estimación propia), en CAD al tipo medio de 2025 (1,398) para las de EE. UU. Fuente alternativa: la AAR publica solo EE. UU.; las cuotas son estables porque cada red es un monopolio local en buena parte de su trazado.',
    tamano: '≈ 136.000 M CAD en 2025 (suma de ingresos de las seis redes de clase I; estimación propia) [1-6]',
    unidad_serie: 'millones de CAD',
    serie: [{ anio: '2025', tamano: 136016 }, { anio: '2026e', tamano: 145300 }, { anio: '2027e', tamano: 151500 }, { anio: '2030e', tamano: 169500 }],
    tcac_historico_pct: 3.0,
    tcac_previsto_pct: 4.5,
    cr5_pct: 89.0,
    estructura: 'Concentrada',
    drivers: [
      { driver: 'Precio real por encima de la inflación', efecto: '+', horizonte: 'Estructural', evidencia: 'CPKC sube tarifas un 3-4 % al año (guía del día del inversor) [10]; el sector lleva dos décadas con precio > inflación por la escasez de alternativas.' },
      { driver: 'Comercio Canadá-EE. UU.-México (T-MEC)', efecto: '+/−', horizonte: 'Estructural', evidencia: 'El 18 % de los ingresos de CPKC es México y buena parte del tráfico cruza fronteras; la revisión de julio de 2026 no renovó el tratado y pasó a revisiones anuales, con aranceles de la sección 232 en acero, aluminio, coches y madera [9].' },
      { driver: 'Producción industrial y cosechas', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Grano de CPKC +24 % en el 2T26 por cosecha récord; carbón −18 % por problemas en las minas [10].' },
      { driver: 'Competencia del camión', efecto: '−', horizonte: 'Cíclico', evidencia: 'Con capacidad de camión sobrante (2023-2025) el intermodal pierde precio; con el diésel +70 % en 2026 el tren gana [10].' },
      { driver: 'Consolidación (fusión UP-NS)', efecto: '+/−', horizonte: 'Estructural', evidencia: 'Primera red transcontinental si el STB la aprueba en 2027; CPKC se opone y teme perder tráfico de enlace en Kansas City y Memphis [8, 10].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 2, justificacion: 'Seis redes, con duopolios regionales (CN-CPKC en Canadá, UP-BNSF en el oeste, CSX-NS en el este) y márgenes EBITDA del 45-53 % [2-5].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Cargadores cautivos (grano, potasa, químicos) con poca alternativa, pero con regulación de tarifas del STB y de la Agencia del Transporte de Canadá [1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 3, justificacion: 'Sindicatos fuertes (75 % de la plantilla de CPKC sindicada, huelgas de señalistas en 2026) y pocos fabricantes de locomotoras [1].' },
      { fuerza: 'Amenaza de entrada', intensidad: 1, justificacion: 'Nadie construye una red nueva: derechos de paso y 20.000 millas de vía no se replican [1].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'El camión compite en intermodal y distancias cortas; el gasoducto en crudo; la tubería y el barco en granel [1].' },
    ],
    ciclo: { posicion: 'Recuperación', comentario: 'Los volúmenes de carga ferroviaria de Norteamérica cayeron en 2009 (−15 % en EE. UU.), en 2020 (−8 %) y se estancaron en 2023-2025 por la recesión del transporte de mercancías; el precio aguantó en las tres. En 2026 hay recuperación del volumen (CPKC RTM +4 % en el 2T26; tráfico canadiense +7,6 % interanual en septiembre según los datos semanales) con cosecha récord y diésel caro que favorece al tren [10]. El riesgo cíclico es industrial y de comercio exterior (aranceles).' },
    regulacion: 'EE. UU.: el STB regula tarifas a cargadores cautivos, servicio y fusiones; su decisión sobre UP-NS (solicitud aceptada el 28-may-2026) se espera en 2027 [8], y fiscales generales de varios estados han objetado [11]. Canadá: la Agencia del Transporte regula el ingreso máximo del grano (MRE) y el intercambio obligatorio; las huelgas pueden acabar en arbitraje forzoso. México: concesión de KCSM (CPKC de México) hasta 2047, con la ARTF como regulador y la reforma de 2024 que permite trenes de pasajeros en las vías de mercancías [1]. T-MEC: en revisión anual desde julio de 2026 [9].',
    tendencias: 'Tres tendencias: (1) sinergias de redes de largo recorrido (CPKC Canadá-México; UP-NS costa a costa si se aprueba) que quitan camión de las carreteras; (2) PSR (ferrocarril programado) y automatización de inspecciones, que bajan el ratio operativo; (3) relocalización de la industria en México (nearshoring), que CPKC capta con sus servicios MMX y SMX [10]. CPKC gana con (1) y (3) mientras no se apruebe UP-NS; la IA sirve para planificación y mantenimiento predictivo, no sustituye la vía.',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 11.1,
    posicion: '6.º de los seis ferrocarriles de clase I por ingresos y el único con red en Canadá, EE. UU. y México; 2.º en Canadá (frente a CN) y único en el corredor de Kansas City a México por Laredo [1].',
    competidores: [
      { nombre: 'Union Pacific', pais: 'EE. UU.', ticker: 'UNP', ingresos: 34851, cuota_pct: 25.6, margen_ebit_pct: 40.2, comentario: 'Mayor red del oeste; puerta de Eagle Pass a México; compra pendiente de Norfolk Southern [3, 7].' },
      { nombre: 'BNSF (Berkshire Hathaway)', pais: 'EE. UU.', ticker: null, ingresos: 33197, cuota_pct: 24.4, margen_ebit_pct: 34.5, comentario: 'Oeste de EE. UU.; no cotiza; se opone a la fusión UP-NS [6].' },
      { nombre: 'Canadian National', pais: 'Canadá', ticker: 'CNR', ingresos: 17304, cuota_pct: 12.7, margen_ebit_pct: 38.4, comentario: 'Competidor directo en Canadá (grano, potasa, intermodal de Vancouver y Prince Rupert); acuerdo con UP para llegar a México por Memphis [2, 10].' },
      { nombre: 'CSX', pais: 'EE. UU.', ticker: 'CSX', ingresos: 20037, cuota_pct: 14.7, margen_ebit_pct: 33.2, comentario: 'Este de EE. UU.; socio de CPKC en el servicio SMX (sureste-México) [4, 10].' },
      { nombre: 'Norfolk Southern', pais: 'EE. UU.', ticker: 'NSC', ingresos: 17318, cuota_pct: 12.7, margen_ebit_pct: 35.0, comentario: 'Este de EE. UU.; objetivo de UP [5, 7].' },
    ],
    foso: {
      veredicto: 'Amplio', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 4, evidencia: 'Única red sencilla de tres países: el puente terrestre Canadá-México pasó de 100 M en 2023 a unos 600 M en 2026 [10].' },
        { fuente: 'Costes de cambio', puntuacion: 3, evidencia: 'Clientes con apartaderos propios y plantas junto a la vía; el 75 % de la carga es granel o industrial cautivo [1].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 4, evidencia: 'Derechos de paso y concesión mexicana hasta 2047, imposibles de replicar [1].' },
        { fuente: 'Ventaja en costes', puntuacion: 4, evidencia: 'Ratio operativo core del 59,9 % en 2025, entre los mejores del sector (BNSF 65,5 %) [1, 6].' },
        { fuente: 'Escala eficiente', puntuacion: 5, evidencia: 'Mercados que solo admiten una o dos redes; nadie construye una vía nueva desde hace un siglo [1].' },
      ],
    },
    amenazas: 'Tres amenazas: (1) la fusión UP-NS (decisión en 2027) crearía una red costa a costa que puede desviar tráfico de enlace que hoy pasa por CPKC en Kansas City, Chicago y Memphis; con el acuerdo UP-CN, CN llega también a México por Memphis y Eagle Pass [8, 10] (probabilidad de aprobación: media); (2) el T-MEC en revisión anual y los aranceles de la sección 232 sobre coches, acero y madera, que tocan el 18 % de ingresos mexicanos y el tráfico transfronterizo [9] (probabilidad media); (3) huelgas en Canadá, que en 2024 y 2026 pararon parte de la red [1].',
    confianza: 'Media',
  },
  historia: {
    resumen: 'Canadian Pacific se fundó en 1881 para unir Canadá de costa a costa y terminó la línea en 1885. Tras décadas como conglomerado (navieras, hoteles, minas), en 2001 se separó como ferrocarril puro. En 2012 el fondo Pershing Square forzó la entrada de Hunter Harrison, que aplicó el ferrocarril programado (PSR) y bajó el ratio operativo del 81 % al 60 %; Keith Creel le sucedió en 2017. En 2021 CP ganó a CN la puja por Kansas City Southern (31.000 M USD de valor empresa) y, tras la aprobación del STB, la integró el 14-abr-2023 como CPKC, la única red de Canadá, EE. UU. y México [1, 2].',
    hitos: [
      { anio: '1885', hito: 'Último clavo del ferrocarril transcontinental canadiense' },
      { anio: '2001', hito: 'Separación del conglomerado Canadian Pacific Limited' },
      { anio: '2012', hito: 'Pershing Square gana la batalla por el consejo; entra Hunter Harrison (PSR)' },
      { anio: '2017', hito: 'Keith Creel, consejero delegado' },
      { anio: '2021', hito: 'Compra de KCS por 31.000 M USD tras superar la oferta de CN; 845 M de comisión de ruptura cobrados' },
      { anio: '2023', hito: 'El STB aprueba la fusión (15-mar) y nace CPKC el 14-abr' },
      { anio: '2025', hito: 'Ratio operativo core récord (59,9 %); recompras de 3.942 M; UP anuncia la compra de NS' },
      { anio: '2026', hito: 'Huelga de señalistas (31-may a 24-ago) y arbitraje; Gordon Trafton, presidente del consejo' },
    ],
    confianza: 'Alta',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Lo material en cifras: (1) seguridad: CPKC tiene la menor frecuencia de accidentes de tren reportables a la FRA de las clase I por tercer año (0,85 por millón de trenes-milla en 2025), aunque el 1T26 subió a 0,93 [D?]; un descarrilamiento con mercancías peligrosas puede costar miles de millones (Lac-Mégantic 2013; East Palestine para NS en 2023); (2) emisiones: el tren emite unas 3-4 veces menos CO₂ por tonelada que el camión, y el precio del carbono en Canadá encarece el gasóleo; (3) relaciones laborales: 75 % de plantilla sindicada y huelgas en 2024 y 2026 [1].',
    controversias: 'Huelga de unos 300 señalistas (IBEW) del 31-may al 24-ago-2026, terminada con arbitraje vinculante, con 19 quejas ante el CIRB por uso de sustitutos [P]; paro nacional de CN y CPKC en agosto de 2024 por arbitraje del Gobierno. Sin sanciones relevantes en los últimos tres años según el 10-K [1].',
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'CPKC opera unas 20.000 millas de vía (3.300 con derechos de paso) entre Vancouver y Saint John en Canadá, el Medio Oeste y el Golfo de EE. UU., y el noreste de México hasta Lázaro Cárdenas y Veracruz. Transporta granel (grano, carbón, potasa: un tercio de los ingresos), mercancía industrial (químicos, plásticos, productos petrolíferos, metales, madera), automóviles e intermodal. Tiene 19.479 empleados y vende a cargadores industriales, agrícolas y navieras; ningún cliente supera el 10 % de los ingresos [1].',
    como_gana_dinero: 'Cobra por tonelada y distancia (6,73 céntimos por tonelada-milla en 2025) más un recargo por combustible que repercute el gasóleo con unos meses de retraso [1]. El coste es casi todo fijo (vía, locomotoras, plantilla): cada punto de volumen adicional sube el beneficio operativo más que proporcionalmente, y por eso el ratio operativo core bajó del 61,3 % al 59,9 % con volumen +4 % [1]. Los contratos suelen ser de uno a tres años con subidas del 3-4 % [10]. El primer trimestre es el más débil por el invierno; el cuarto, el más fuerte por la cosecha de grano [1]. La compra de KCS añadió tráfico de largo recorrido (Canadá-México) con más ingreso por vagón.',
    clientes: 'Sin concentración: ningún cliente supera el 10 % de los ingresos [1]. Los cargadores de granel (grano, potasa, carbón) están cautivos en buena parte de sus orígenes, lo que da poder de precio: el ingreso por vagón subió un 1 % en 2025 pese a un recargo de combustible menor y la dirección dice estar «en el alto» de su guía de precios del 3-4 % [1, 10]. En Canadá el ingreso máximo del grano lo fija la Agencia del Transporte (MRE). Los contratos con navieras (intermodal) son de varios años y se renegocian con competencia de CN.',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'esg', campo: 'calificaciones ESG (MSCI, Sustainalytics)', tipo: 'Complemento', intentos: '1) 10-K y web de sostenibilidad (no las publican); 2) MSCI ESG ratings corporate search (requiere JavaScript); 3) Sustainalytics (bloqueo antibot)', decision: 'Omitido' },
    { seccion: 'competencia', campo: 'ROIC de los comparables', tipo: 'Complemento', intentos: '1) MarketScreener (no lo da en la página abierta); 2) Stock Analysis (no consultado por tiempo); 3) cálculo propio (sin balances completos de los cinco)', decision: 'Omitido' },
  ],
};
// esg.materialidad lleva la fuente de seguridad del 10-K: sustituir el marcador.
B.esg.materialidad = B.esg.materialidad.replace('[D?]', '[1]');
B.esg.controversias = B.esg.controversias.replace(' [P]', ' [11]');

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Form 10-K/A 2025 (parte III: consejo, retribución, accionistas, ratio salarial)', editor: 'CPKC (SEC)', tipo: 'Primaria', fecha: '2026-04', url: 'https://www.sec.gov/Archives/edgar/data/0000016875/000119312526173665/d172022d10ka.htm' },
  { id: 2, titulo: 'CPKC announces results of director elections (junta del 29-abr-2026)', editor: 'CPKC (8-K)', tipo: 'Primaria', fecha: '2026-04-29', url: `${SEC}/000119312526197150/d125479dex991.htm` },
  { id: 3, titulo: 'CPKC announces retirement of Board Chair Isabelle Courville; Gordon Trafton appointed Chair', editor: 'CPKC (8-K)', tipo: 'Primaria', fecha: '2026-07-29', url: `${SEC}/000119312526324144/d112154dex991.htm` },
  { id: 4, titulo: 'CPKC announces Gordon Trafton appointed board vice-chair; two new members', editor: 'CPKC (8-K)', tipo: 'Primaria', fecha: '2026-01-28', url: `${SEC}/000119312526029569/d38530dex991.htm` },
  { id: 5, titulo: 'Q4 2023, Q4 2024 y Q4 2025 earnings releases (guías anuales)', editor: 'CPKC (8-K)', tipo: 'Primaria', fecha: '2026-01-28', url: `${SEC}/000001687526000004/exhibit991-q42025earningsr.htm` },
  { id: 6, titulo: 'Form 10-K 2025 (directivos)', editor: 'CPKC (SEC)', tipo: 'Primaria', fecha: '2026-02-26', url: `${SEC}/000001687526000008/cp-20251231.htm` },
  { id: 7, titulo: 'SEC EDGAR: Form 4 de CPKC desde el 14-oct-2025 (ninguno presentado: los directivos declaran en SEDI)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-14', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000016875&type=4' },
  { id: 8, titulo: 'Q4 2024 earnings release (guía 2025: BPA core +12-18 %)', editor: 'CPKC (8-K)', tipo: 'Primaria', fecha: '2025-01-29', url: `${SEC}/000001687525000004/exhibit991-q42024earningsr.htm` },
  { id: 9, titulo: 'Q4 2023 earnings release (guía 2024: BPA core de doble dígito sobre 3,84)', editor: 'CPKC (8-K)', tipo: 'Primaria', fecha: '2024-01-30', url: `${SEC}/000001687524000005/exhibit991-q42023earningsr.htm` },
];
const cons = (nombre, cargo, tipo, desde, comisiones) => ({ nombre, cargo, tipo, desde, comisiones });
const C = {
  _estado: 'completa',
  directivos: {
    equipo: [
      { nombre: 'Keith Creel', cargo: 'Presidente ejecutivo de operaciones y consejero delegado (President & CEO)', desde: '2017', participacion_pct: 0.18, trayectoria: 'Ferroviario de carrera (Burlington Northern, Illinois Central, CN) y mano derecha de Hunter Harrison; COO de CP desde 2013 y CEO desde 2017. Bajó el ratio operativo y cerró la compra de KCS; 1,63 M de acciones y opciones ejercitables [1].' },
      { nombre: 'Nadeem Velani', cargo: 'Director financiero (EVP & CFO)', desde: '2017', participacion_pct: 0.02, trayectoria: 'En CP desde 2015 (relación con inversores, planificación); CFO desde 2017. Financió la compra de KCS manteniendo el grado de inversión [1].' },
      { nombre: 'Mark Redd', cargo: 'Director de operaciones (EVP & COO)', desde: '2019', participacion_pct: 0.03, trayectoria: 'En CP desde 2013; vicepresidente ejecutivo de operaciones desde 2019; responsable de la integración operativa de KCS y de la seguridad (menor frecuencia de accidentes de clase I) [6].' },
      { nombre: 'John Brooks', cargo: 'Director comercial (EVP & CMO)', desde: '2017', participacion_pct: 0.03, trayectoria: 'Comercial en CP desde 2014; responsable de las sinergias de ingresos de KCS (1.400-1.500 M USD a final de 2026) [1, 6].' },
      { nombre: 'Gordon Trafton', cargo: 'Presidente del consejo (desde el 29-jul-2026)', desde: '2026', participacion_pct: 0, trayectoria: '33 años en ferrocarriles (CN, Illinois Central, Burlington Northern); vicepresidente de compras e integración de CN hasta 2009; consejero de CP desde 2017 [3].' },
    ],
    historial_guidance: [
      { anio: '2024', guia: 'BPA core combinado +doble dígito sobre 3,84; inversión 2.750 M', real: 'BPA core 4,25 (+10,7 %); inversión 2.825 M', cumplida: 'Sí' },
      { anio: '2025', guia: 'BPA core +12-18 % sobre 4,25; RTM +mid-single digit', real: 'BPA core 4,61 (+8 %); RTM +4 %', cumplida: 'No' },
      { anio: '2026', guia: 'BPA core +low double-digit sobre 4,61; RTM +mid-single digit; inversión 2.650 M', real: '1S26: BPA core 2,30 (+5,5 %); RTM +3 %; inversión 1.400 M; guía reafirmada el 29-jul', cumplida: 'Parcial' },
    ],
    comentario: 'Equipo estable y ferroviario: Creel, Velani y Brooks llevan nueve años juntos y el COO desde 2019 [1]. La credibilidad de la guía es mixta: cumplió 2024 y falló 2025 por 4-10 puntos (aranceles, Canadá débil) [5, 8, 9], y 2026 exige un segundo semestre +15 % de BPA core tras +5,5 % en el primero. La sucesión del consejero delegado no está anunciada: Creel tiene 57 años y no hay número dos designado públicamente; el consejo renovó la presidencia en 2026 (Courville por Trafton) siguiendo un plan anunciado en enero [3, 4].',
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      cons('Gordon Trafton', 'Presidente', 'Independiente', '2017', 'Riesgo y sostenibilidad; retribución'),
      cons('Keith Creel', 'Consejero delegado', 'Ejecutivo', '2015', '—'),
      cons('Hon. John Baird', 'Consejero', 'Independiente', '2015', 'n.d.'),
      cons('Amb. Antonio Garza', 'Consejero', 'Independiente', '2023', 'n.d.'),
      cons('Arturo Gutiérrez Hernández', 'Consejero', 'Independiente', '2024', 'n.d.'),
      cons('Hon. Edward Hamberger', 'Consejero', 'Independiente', '2019', 'n.d.'),
      cons('Janet Kennedy', 'Consejera', 'Independiente', '2023', 'n.d.'),
      cons('Henry Maier', 'Consejero', 'Independiente', '2023', 'n.d.'),
      cons('Marc Parent', 'Consejero', 'Independiente', '2026', 'n.d.'),
      cons('Matthew Paull', 'Consejero', 'Independiente', '2016', 'Auditoría y finanzas'),
      cons('Jane Peverett', 'Consejera', 'Independiente', '2016', 'n.d.'),
      cons('Andrea Robertson', 'Consejera', 'Independiente', '2019', 'n.d.'),
      cons('Katharine Stevenson', 'Consejera', 'Independiente', '2026', 'n.d.'),
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 1,
    voto_remuneracion_pct: 87.48, voto_remuneracion_contra_pct: 12.52, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 25.66, fijo: 1.89, variable_corto: 3.76, variable_largo: 18.80, ratio_salario_medio: 183 },
    remuneracion: 'El consejero delegado cobró 25,66 M CAD en 2025: 1,89 de fijo, 3,76 de variable anual y 18,80 en acciones y opciones (valor de concesión), más 0,88 de pensión [1]. El variable anual pesa ratio operativo core (35 %), beneficio operativo core (35 %) y seguridad; el corporativo pagó el 121 % y el consejo limitó el individual de Creel al 100 % [1]. El variable a largo plazo (PSU) mide caja libre acumulada a tres años (60 %) y rentabilidad para el accionista frente al S&P/TSX 60 y al S&P 500 Industrials (20 % cada uno) [1]: premia caja y no crecimiento a cualquier precio, aunque no mide el ROIC. Para 2026 el consejo subió su objetivo de retribución en 950.000 USD [1]. Ratio con el empleado medio de 183 a 1 [1]. El voto consultivo sobre retribución (say on pay) obtuvo el 87,48 % a favor en 2026 [2].',
    accionistas: [
      { nombre: 'TCI Fund Management (Christopher Hohn)', pct: 6.19, tipo: 'Fondo activista de largo plazo', variacion: 'Sin cambios declarados desde el 13G/A de feb-2024 (55,5 M de acciones)' },
      { nombre: 'Consejeros y directivos (24 personas)', pct: 0.30, tipo: 'Dirección', variacion: '2,70 M de acciones incluidas opciones ejercitables' },
    ],
    insiders: [],
    control_y_defensas: 'Sin accionista de control: el mayor es TCI con el 6,19 % [1]. Una acción, un voto; sin clases de acciones ni blindajes estatutarios. Como sociedad canadiense, no hay consejero independiente coordinador porque el presidente ya es independiente. La ley canadiense de transporte limita la propiedad extranjera de algunas aerolíneas, no de ferrocarriles. Plan de derechos de accionistas: no consta en el 10-K/A. Todos los consejeros fueron elegidos con más del 95,8 % de los votos en abril de 2026 [2].',
    alertas: ['El consejero delegado, Keith Creel (57 años), no tiene sucesor público y es la persona clave de la tesis; la presidenta del consejo, Isabelle Courville, se retiró en julio de 2026 tres meses después de ser reelegida [3].'],
    confianza: 'Media',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'operaciones de directivos de los últimos 12 meses', tipo: 'Complemento', intentos: '1) SEC EDGAR: sin Form 4 (los directivos de CPKC declaran en SEDI) [7]; 2) SEDI (antibot, no abre sin navegador); 3) InsiderTrades/MarketBeat (no consultados por tiempo)', decision: 'Omitido' },
    { seccion: 'gobierno', campo: 'comisiones de cada consejero', tipo: 'Complemento', intentos: '1) 10-K/A 2025 (perfiles sin tabla de comisiones legible); 2) circular de 2026 (PDF de la web, no leído por tiempo); 3) web de gobierno corporativo (no consultada)', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de CP.TO, ^GSPTSE y CNR.TO hasta el 14-oct-2026 (precio, rango, betas, cierres de año)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/CP.TO/history' },
  { id: 2, titulo: 'Canadian Pacific Kansas City: consenso (30 analistas, objetivo medio 139,74 CAD) y finanzas previstas 2026-2028', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/CANADIAN-PACIFIC-KANSAS-C-1409549/consensus/' },
  { id: 3, titulo: 'Canadian Pacific Kansas City: finanzas (estimaciones de ventas, EBITDA, EBIT y BPA 2026-2028)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/CANADIAN-PACIFIC-KANSAS-C-1409549/finances/' },
  { id: 4, titulo: 'Benchmark bond yield, 10-year (BD.CDN.10YR.DQ.YLD) y USD/CAD', editor: 'Bank of Canada (Valet)', tipo: 'Primaria', fecha: '2026-10-13', url: 'https://www.bankofcanada.ca/valet/observations/BD.CDN.10YR.DQ.YLD/json' },
  { id: 5, titulo: 'Tipos de cambio de referencia del euro (14-oct-2026)', editor: 'Banco Central Europeo', tipo: 'Primaria', fecha: '2026-10-14', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml' },
  { id: 6, titulo: 'Finanzas de CN, UNP, CSX, NSC y Aurizon (estimaciones 2026-2028)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/UNION-PACIFIC-CORPORATION-14754/finances/' },
  { id: 7, titulo: 'Cierres del 14-oct-2026 de CNR.TO, UNP, CSX, NSC, AZJ.AX y CP (NYSE)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/UNP/history' },
  { id: 8, titulo: 'Union Pacific / Norfolk Southern: presentación de la operación (valor empresa 85.000 M USD, prima del 25 % sobre la media de 30 sesiones)', editor: 'Union Pacific (8-K)', tipo: 'Primaria', fecha: '2025-07-29', url: 'https://www.sec.gov/Archives/edgar/data/100885/000119312525167154/d64537dex991.htm' },
  { id: 9, titulo: 'CPKC announces C$1.8 billion debt offering (4,20 %-5,40 %)', editor: 'CPKC (8-K)', tipo: 'Primaria', fecha: '2026-09-28', url: `${SEC}/000119312526407607/d161842dex991.htm` },
  { id: 10, titulo: 'Form F-4/A de CP sobre KCS: precedentes de Morgan Stanley y BofA (AV/EBITDA LTM de G&W, FEC, Pacific National, BNSF) y EBITDA ajustado de KCS de 1.600 M USD', editor: 'Canadian Pacific Railway (SEC)', tipo: 'Primaria', fecha: '2021-09', url: `${SEC}/000119312521315658/d877235df4a.htm` },
  { id: 11, titulo: 'Genesee & Wyoming to be acquired by Brookfield Infrastructure and GIC (8.400 M USD, prima del 39,5 %)', editor: 'Railway Age', tipo: 'Prensa', fecha: '2019-07-01', url: 'https://www.old.railwayage.com/?p=37476' },
  { id: 12, titulo: 'ERPbymonth.xlsx: prima de riesgo implícita del S&P 500 (oct-2026: 4,20 %)', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 13, titulo: 'CPKC to report third-quarter 2026 earnings results on October 28', editor: 'CPKC vía Finviz', tipo: 'Primaria', fecha: '2026-09-29', url: 'https://finviz.com/news/396653/cpkc-to-report-third-quarter-2026-earnings-results-on-october-28' },
  { id: 14, titulo: 'RBC eleva el objetivo de CP a 146 CAD (24-sep-2026); BMO 142, CIBC 140', editor: 'MarketScreener (noticias)', tipo: 'Analistas', fecha: '2026-09-24', url: 'https://www.marketscreener.com/quote/stock/CANADIAN-PACIFIC-KANSAS-C-1409549/consensus/' },
  { id: 15, titulo: 'CP Q2 2026: BPA core 1,27 frente a 1,24 esperado', editor: 'Investing / MarketBeat', tipo: 'Prensa', fecha: '2026-07-29', url: 'https://www.marketbeat.com/earnings/reports/2026-7-29-canadian-pacific-railway-limited-stock/' },
  { id: 16, titulo: 'Q4 2025 earnings release: guía 2026 y conciliación del BPA core', editor: 'CPKC (8-K)', tipo: 'Primaria', fecha: '2026-01-28', url: `${SEC}/000001687526000004/exhibit991-q42025earningsr.htm` },
  { id: 17, titulo: 'Q2 2026 earnings call transcript', editor: 'CPKC', tipo: 'Primaria', fecha: '2026-07-29', url: 'https://s21.q4cdn.com/736796105/files/doc_financials/2026/q2/Q2-2026-Transcript_Website_vF.pdf' },
];
// Comparables: precio Yahoo 14-oct × acciones implícitas (beneficio 2026e ÷ BPA 2026e de MarketScreener); NTM = 2,5/12 de 2026e + 9,5/12 de 2027e; LTM ≈ media de 2025 y 2026e.
const comp = (nombre, ticker, pais, precio, fx, bn26, bpa26, dn, e25, e26, e27, v25, v26, v27, p27, fcf26, ltmF = 0.5) => {
  const acc = bn26 / bpa26; const cap = precio * acc; const ev = cap + dn;
  const eL = e25 * (1 - ltmF) + e26 * ltmF; const eN = e26 * 2.5 / 12 + e27 * 9.5 / 12;
  const vL = v25 * (1 - ltmF) + v26 * ltmF; const vN = v26 * 2.5 / 12 + v27 * 9.5 / 12;
  const bN = bpa26 * 2.5 / 12 + p27 * 9.5 / 12;
  const r = (x, d = 1) => Math.round(x * 10 ** d) / 10 ** d;
  return { nombre, ticker, pais, capitalizacion: Math.round(cap * fx), ev_ventas: r(ev / vL, 2), ev_ebitda_ltm: r(ev / eL), ev_ebitda_ntm: r(ev / eN), per_ntm: r(precio / bN), crecimiento_pct: r((vN / vL - 1) * 100), margen_ebitda_pct: r(e25 / v25 * 100), roic_pct: null, dn_ebitda: r(dn / e25), fcf_yield_pct: r(fcf26 / cap * 100) };
};
const empresas = [
  comp('Canadian National', 'CNR', 'CA', 170.78, 1, 4939, 8.143, 21172, 8525, 8989, 9568, 17304, 18567, 19363, 8.933, 4188),
  comp('Union Pacific', 'UNP', 'US', 286.48, USDCAD, 7683, 12.89, 30548, 12311, 13615, 14572, 24510, 27072, 28345, 14.10, 7260),
  comp('CSX', 'CSX', 'US', 48.28, USDCAD, 3710, 2.001, 18198, 6365, 7285, 7886, 14092, 15259, 16041, 2.28, 3362),
  comp('Norfolk Southern', 'NSC', 'US', 323.77, USDCAD, 2771, 12.46, 15557, 5661, 5870, 6278, 12180, 13306, 13890, 14.12, 2358),
];
// Aurizon (ejercicio a junio): LTM = FY26 real; NTM = 9/12 FY27 + 3/12 FY28.
{
  const acc = 362 / 0.211, precio = 3.75, cap = precio * acc, dn = 5218, ev = cap + dn;
  const eN = 0.75 * 1748 + 0.25 * 1719, vN = 0.75 * 4236 + 0.25 * 4246, bN = 0.75 * 0.2549 + 0.25 * 0.241;
  const r = (x, d = 1) => Math.round(x * 10 ** d) / 10 ** d;
  empresas.push({ nombre: 'Aurizon', ticker: 'AZJ', pais: 'AU', capitalizacion: Math.round(cap * AUDCAD), ev_ventas: r(ev / 4194, 2), ev_ebitda_ltm: r(ev / 1724), ev_ebitda_ntm: r(ev / eN), per_ntm: r(precio / bN), crecimiento_pct: r((vN / 4194 - 1) * 100), margen_ebitda_pct: r(1724 / 4194 * 100), roic_pct: null, dn_ebitda: r(dn / 1724), fcf_yield_pct: r(467.9 / cap * 100) });
}
const D = {
  _estado: 'completa',
  identificacion: {
    nombre: 'Canadian Pacific Kansas City Limited', nombre_corto: 'CPKC', ticker: 'CP', isin: 'CA13646K1084', mercado: 'Bolsa de Toronto (TSX: CP) y NYSE (CP)', indice_referencia: 'S&P/TSX Composite',
    pais: 'Canadá', pais_iso: 'CA', sector: 'Industria', industria: 'Transporte terrestre (ferrocarril)', sede: 'Calgary (Alberta)', fundacion: '1881', empleados: 19479, web: 'https://www.cpkcr.com',
    precio: 122.70, fecha_precio: '2026-10-14', acciones: 879.8, capitalizacion_publicada: null, free_float_pct: 99.7,
    max_52s: 133.38, min_52s: 96.50, volumen_medio_diario: '≈ 156 M CAD/día en Toronto (3 meses), más la negociación en Nueva York', proximos_resultados: '2026-10-28',
  },
  consenso: {
    guidance: 'Guía 2026 (28-ene-2026): BPA core con crecimiento «low double-digit» sobre 4,61 (≈ 5,07-5,16), toneladas-milla +mid-single digit, inversión de 2.650 M (−15 %), tipo impositivo core del 24,75 % y recuperación de pensiones de 441 M [16]. Reafirmada de palabra el 29-jul-2026 («otro año de crecimiento de doble dígito del beneficio») [17]. A medio plazo, la guía del día del inversor de 2023 (precio +3-4 % al año) y la meta de sinergias de ingresos de KCS, ya superada [17]. Próximos resultados: 28-oct-2026 [13].',
    estimaciones: [
      { periodo: '2026e', ingresos: 16443, ebitda: 8350, ebit: 6452, bpa: 4.85, dpa: 1.00, fuente: 'MarketScreener, 14-oct-2026 [3]' },
      { periodo: '2027e', ingresos: 17439, ebitda: 9207, ebit: 7228, bpa: 5.79, dpa: 1.10, fuente: 'MarketScreener, 14-oct-2026 [3]' },
      { periodo: '2028e', ingresos: 18576, ebitda: 10023, ebit: 8033, bpa: 6.47, dpa: 1.12, fuente: 'MarketScreener, 14-oct-2026 [3]' },
    ],
    recomendaciones: { n_analistas: 30, comprar: null, mantener: null, vender: null, po_medio: 139.74, po_min: 104.0, po_max: 156.0 },
    revisiones: 'Los objetivos suben en 3 meses: RBC de 139 a 145 (30-jul) y a 146 CAD (24-sep), BMO a 142 y CIBC a 140 en junio [14]. El consenso de MarketScreener mezcla bases: el BPA 2026e de 4,85 parece publicado (el core de la guía sería 5,07-5,16) y el de 2027e-2028e (5,79 y 6,47) se acerca al core, que excluye unos 0,31 por acción de amortización de la compra de KCS [3, 16]. Solo hay una fuente gratuita con estimaciones completas; el objetivo medio se contrasta con los objetivos publicados por RBC, BMO y CIBC [14].',
    base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: 1.2,
    confianza: 'Media',
  },
  bolsa: {
    tipo_rentabilidad: 'de precio (sin dividendos)',
    rentabilidades: [
      { periodo: 'En el año', accion_pct: 21.4, indice_pct: 12.2, sector_pct: 25.8 },
      { periodo: '1 año', accion_pct: 14.6, indice_pct: 17.2, sector_pct: 26.9 },
      { periodo: '3 años (anual.)', accion_pct: 7.7, indice_pct: 22.3, sector_pct: 5.1 },
      { periodo: '5 años (anual.)', accion_pct: 6.7, indice_pct: 11.3, sector_pct: 2.6 },
      { periodo: '10 años (anual.)', accion_pct: 12.0, indice_pct: 9.3, sector_pct: 7.0 },
    ],
    anual: [
      { anio: '2017', accion_pct: 19.9, indice_pct: 6.0 }, { anio: '2018', accion_pct: 5.5, indice_pct: -11.6 }, { anio: '2019', accion_pct: 36.7, indice_pct: 19.1 },
      { anio: '2020', accion_pct: 33.4, indice_pct: 2.2 }, { anio: '2021', accion_pct: 3.0, indice_pct: 21.7 }, { anio: '2022', accion_pct: 11.0, indice_pct: -8.7 },
      { anio: '2023', accion_pct: 3.9, indice_pct: 8.1 }, { anio: '2024', accion_pct: -0.7, indice_pct: 18.0 }, { anio: '2025', accion_pct: -2.9, indice_pct: 28.2 },
    ],
    beta: 1.16, volatilidad_pct: 21.8, max_drawdown_pct: -21.6, posicion_corta_pct: null,
    comentario: 'La acción se quedó plana de 2021 a 2025 (90,98 a 101,05 CAD) mientras el S&P/TSX subía con fuerza: el mercado ya había pagado la compra de KCS en 2021 y el beneficio por acción tardó cuatro años en crecer por la dilución y la recesión del transporte [1]. En 2026 sube un 21,4 % (máximo de 133,38 el 21-ago) con la vuelta del volumen, el diésel caro que favorece al tren y el primer trimestre de crecimiento de doble dígito; corrigió un 8 % desde agosto con la huelga de señalistas y las dudas sobre la fusión UP-NS [1, 17]. CN (índice sectorial usado) sube aún más en el año. Sector: CNR.TO como aproximación (no hay índice ferroviario canadiense). Beta mensual de 5 años 1,16 frente al TSX, pero 0,78 semanal de 5 años y 0,68 semanal de 2 años [1].',
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: [
      { anio: '2019', precio_cierre: 66.21, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2020', precio_cierre: 88.31, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2021', precio_cierre: 90.98, ev_ebitda_ntm: null, per_ntm: null, excluir: true },
      { anio: '2022', precio_cierre: 100.95, ev_ebitda_ntm: null, per_ntm: null, excluir: true },
      { anio: '2023', precio_cierre: 104.84, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2024', precio_cierre: 104.08, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2025', precio_cierre: 101.05, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
    ],
    comentario: null,
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Las otras cuatro redes de clase I que cotizan (CN, Union Pacific, CSX y Norfolk Southern: mismo negocio, márgenes y regulación) y Aurizon, el mayor ferrocarril de mercancías cotizado de Australia, como quinto (carbón y red regulada: crece y cotiza menos, y baja la mediana). BNSF no cotiza (es de Berkshire) y GMéxico Transportes no tiene datos abiertos. Cifras de MarketScreener del 14-oct-2026 para todos (misma fuente para LTM y NTM; LTM ≈ media de 2025 y 2026e) y precios de Yahoo del 14-oct [6, 7]; capitalización en CAD al cambio del BCE [5]. NS cotiza ya con la oferta de UP dentro.',
    empresas,
    comentario: null,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2025-07', objetivo: 'Norfolk Southern', comprador: 'Union Pacific', ev: Math.round(85000 * USDCAD), ev_ventas: 7.01, ev_ebitda: 15.5, prima_pct: 25.0, excluir: false, comentario: 'Pendiente del STB (decisión en 2027). Múltiplos sobre ventas y EBITDA de 2024 de NS (12.123 y 5.499 M USD) [8, 6].' },
      { fecha: '2021-08', objetivo: 'Kansas City Southern', comprador: 'Canadian Pacific', ev: Math.round(31000 * USDCAD), ev_ventas: null, ev_ebitda: 19.4, prima_pct: 34.0, excluir: false, comentario: 'Sobre el EBITDA LTM ajustado de KCS a jun-2021 (1.600 M USD, con 128 M de ajuste COVID) [10].' },
      { fecha: '2021-05', objetivo: 'Kansas City Southern', comprador: 'Canadian National (oferta retirada)', ev: Math.round(33700 * USDCAD), ev_ventas: null, ev_ebitda: 21.1, prima_pct: null, excluir: true, comentario: 'No se cerró: el STB rechazó el fideicomiso de voto; se excluye.' },
      { fecha: '2019-07', objetivo: 'Genesee & Wyoming', comprador: 'Brookfield Infrastructure y GIC', ev: Math.round(8432 * USDCAD), ev_ventas: null, ev_ebitda: 13.4, prima_pct: 39.5, excluir: false, comentario: 'Ferrocarriles regionales de EE. UU., Australia y Reino Unido [10, 11].' },
      { fecha: '2017-03', objetivo: 'Florida East Coast Railway', comprador: 'GMéxico Transportes', ev: Math.round(2100 * USDCAD), ev_ventas: null, ev_ebitda: 13.6, prima_pct: null, excluir: false, comentario: 'Regional de Florida [10].' },
      { fecha: '2016-03', objetivo: 'Pacific National', comprador: 'Consorcio (CPP, GIP, CIC, GIC, BCI)', ev: Math.round(6594 * USDCAD), ev_ventas: null, ev_ebitda: 10.3, prima_pct: null, excluir: false, comentario: 'Mercancías en Australia [10].' },
      { fecha: '2009-11', objetivo: 'BNSF', comprador: 'Berkshire Hathaway', ev: Math.round(43847 * USDCAD), ev_ventas: null, ev_ebitda: 8.8, prima_pct: null, excluir: true, comentario: 'Fuera del plazo de 5-7 años; referencia histórica [10].' },
    ],
    comentario: null,
    confianza: 'Media',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'consenso', campo: 'reparto de recomendaciones (comprar/mantener/vender)', tipo: 'Complemento', intentos: '1) MarketScreener (solo media «BUY» y 30 analistas); 2) Investing (no abre sin JavaScript); 3) TipRanks (bloqueo)', decision: 'Omitido' },
    { seccion: 'bolsa', campo: 'posición corta', tipo: 'Complemento', intentos: '1) IIROC/CIRO (informe quincenal no abierto); 2) NYSE short interest (sin acceso gratuito); 3) Stock Analysis (no consultado)', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Stocktwits: flujo de mensajes de $CP (jun-oct 2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-14', url: 'https://api.stocktwits.com/api/2/streams/symbol/CP.json' },
  { id: 2, titulo: 'Seeking Alpha: artículos y noticias de CP (jun-oct 2026: «Wall Street says buy, I say wait», «Underperformance to market, despite results», «Incredible asset but price already reflects that», «Double-digit EPS growth is coming»)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-07', url: 'https://seekingalpha.com/api/sa/combined/CP.xml' },
  { id: 3, titulo: 'Canadian rail traffic (datos semanales, Raymond James, citados en foros)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-09-23', url: 'https://api.stocktwits.com/api/2/streams/symbol/CP.json' },
  { id: 4, titulo: 'CBC: huelga de señalistas IBEW en CPKC (comentarios de lectores)', editor: 'CBC News', tipo: 'Foros y redes', fecha: '2026-06-01', url: 'https://www.cbc.ca/news/canada/calgary/cpkc-rail-strike-ibew-9.7218655' },
];
const E = {
  _estado: 'completa',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Stocktwits ($CP)', fecha: '2026-10', n_comentarios: 30, tono: 'Positivo', resumen: 'Mensajes de seguimiento de tendencia y de opciones: máximos de 52 semanas en julio y agosto, «ruptura» de los transportes; algún mensaje negativo por la huelga [1].' },
      { plataforma: 'Seeking Alpha (artículos y comentarios)', fecha: '2026-10', n_comentarios: 25, tono: 'Dividido', resumen: 'Dos alcistas (crecimiento de doble dígito del BPA, activo único) y tres prudentes: «el precio ya lo refleja», «Wall Street dice comprar, yo espero» (7-oct) y peor evolución que el mercado pese a los resultados [2].' },
      { plataforma: 'Stocktwits (datos de tráfico y diésel)', fecha: '2026-09', n_comentarios: 10, tono: 'Positivo', resumen: 'Se comenta el tráfico ferroviario canadiense de CPKC (+7,6 % interanual en septiembre frente al +0,7 % de CN) y el diésel +70 % por la guerra con Irán como ventaja del tren frente al camión [3].' },
      { plataforma: 'CBC (comentarios de lectores sobre la huelga)', fecha: '2026-06', n_comentarios: 15, tono: 'Negativo', resumen: 'Críticas a la empresa por la huelga de señalistas y el uso de sustitutos; preocupación por la seguridad [4].' },
    ],
    temas: [
      { tema: 'Valoración: «buena empresa, precio justo»', postura: 'Dividida', peso: 'Alto', contraste: 'Coincide con nuestro análisis: el PER adelantado (unas 24 veces nuestro BPA de 2027) está cerca de su mediana de cinco años y la rentabilidad a 12 meses sale moderada.' },
      { tema: 'Fusión Union Pacific-Norfolk Southern', postura: 'Bajista', peso: 'Medio', contraste: 'Riesgo real pero lejano: decisión del STB en 2027 y CPKC no cuantifica el tráfico en juego; lo recogemos en el bajista.' },
      { tema: 'Volumen y diésel caro (ventaja frente al camión)', postura: 'Alcista', peso: 'Medio', contraste: 'Cierto en el 2T26 (RTM +4 %, ingresos +13 %), pero el recargo de combustible infla los ingresos y no tanto el margen.' },
      { tema: 'Huelgas y relaciones laborales', postura: 'Bajista', peso: 'Bajo', contraste: 'La huelga de señalistas terminó en arbitraje el 24-ago y hubo acuerdo con el sindicato de maquinistas en octubre: el efecto en cuentas es pequeño [2].' },
    ],
    lectura: 'El sentimiento acompaña al precio (máximos en agosto) pero no es eufórico: los artículos más recientes piden esperar por valoración, en línea con el consenso de analistas (objetivo medio 139,74 CAD, un 14 % sobre el precio) y con nuestras cifras. No anticipa un riesgo que el informe no recoja; confirma que la fusión UP-NS es la preocupación principal y que la tesis depende del segundo semestre de 2026 (resultados del 28-oct).',
    confianza: 'Media',
  },
  fuentes: fE,
  huecos: [],
};

guarda('A', A); guarda('B', B); guarda('C', C); guarda('D', D); guarda('E', E);
console.log('Notas A-E escritas. Comparables:', empresas.map((e) => `${e.ticker} PER ${e.per_ntm} EV/EBITDA ${e.ev_ebitda_ntm}`).join('; '));
