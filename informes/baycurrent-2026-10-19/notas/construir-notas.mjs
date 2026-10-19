// Escribe las notas A-E de BayCurrent (6532.T, corte 2026-10-19) a partir de los documentos de notas/docs (tanshin,
// suplementos, yuho y planes descargados de eir-parts), de bolsa.json (bolsa.mjs, cierres hasta el 16-oct), de
// yahoo-datos.json (Yahoo quoteSummary del 19-oct-2026, cierre de Tokio a las 15:30) y de la prensa japonesa.
// Cada nota cita solo con [n] de su propia lista de fuentes. No hay XBRL público en Japón: cifras copiadas a mano.
// Ejecutar: node informes/baycurrent-2026-10-19/notas/construir-notas.mjs
// Etiqueta de ejercicio «inicio» (la de la empresa desde el 15-oct-2026): FY2025 = mar-2025 a feb-2026. Los documentos
// antiguos de la empresa usan la otra etiqueta (su «FY2026» es nuestro FY2025): se convierte siempre.
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
const EIR = 'https://ssl4.eir-parts.net/doc/6532';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Consolidated Financial Results for the Fiscal Year Ended February 28, 2026 [IFRS] (tanshin anual: cuenta, balance, flujos, guía del año a feb-2027)', editor: 'Baycurrent, Inc. (TDnet)', tipo: 'Primaria', fecha: '2026-04-14', url: `${EIR}/tdnet/2790371/00.pdf` },
  { id: 2, titulo: 'Supplement to Financial Results for the Fiscal Year Ended February 28, 2026 (KPI, trimestres, EBITDA, mercado)', editor: 'Baycurrent, Inc. (TDnet)', tipo: 'Primaria', fecha: '2026-04-14', url: `${EIR}/tdnet/2790682/00.pdf` },
  { id: 3, titulo: 'Consolidated Financial Results for the Second Quarter (Interim) of the Fiscal Year Ending February 28, 2027 [IFRS]', editor: 'Baycurrent, Inc. (TDnet)', tipo: 'Primaria', fecha: '2026-10-15', url: `${EIR}/tdnet/2895268/00.pdf` },
  { id: 4, titulo: 'Supplement to Financial Results for the First Half of the Fiscal Year Ending February 28, 2027 (KPI, consultores, ingresos por consultor, IA, ciberseguridad y defensa)', editor: 'Baycurrent, Inc. (TDnet)', tipo: 'Primaria', fecha: '2026-10-15', url: `${EIR}/tdnet/2895269/00.pdf` },
  { id: 5, titulo: '有価証券報告書 (informe anual auditado del ejercicio a feb-2026: notas, segmento único, clientes, auditor, consejo, remuneración)', editor: 'Baycurrent, Inc. (EDINET, vía eir-parts)', tipo: 'Primaria', fecha: '2026-05', url: `${EIR}/yuho_pdf/S100Y69G/00.pdf` },
  { id: 6, titulo: 'Consolidated Financial Results for the fiscal years ended February 2024 and February 2025 [IFRS] (tanshin anuales en inglés)', editor: 'Baycurrent Consulting / Baycurrent, Inc.', tipo: 'Primaria', fecha: '2025-04-10', url: `${EIR}/ir_material_for_fiscal_ym3/176759/00.pdf` },
  { id: 7, titulo: '決算短信 de los ejercicios a feb-2020, feb-2021, feb-2022, feb-2023 y feb-2024 (cuentas y guías iniciales)', editor: 'Baycurrent Consulting (TDnet)', tipo: 'Primaria', fecha: '2024-04', url: `${EIR}/tdnet/2420523/00.pdf` },
  { id: 8, titulo: 'Consolidated Financial Results and Supplement for the First Quarter of the Fiscal Year Ending February 28, 2027', editor: 'Baycurrent, Inc. (TDnet)', tipo: 'Primaria', fecha: '2026-07', url: `${EIR}/tdnet/2852185/00.pdf` },
  { id: 9, titulo: 'Consolidated Financial Results and Supplement for the Third Quarter of the Fiscal Year Ended February 28, 2026', editor: 'Baycurrent, Inc. (TDnet)', tipo: 'Primaria', fecha: '2026-01-14', url: `${EIR}/tdnet/2740571/00.pdf` },
  { id: 10, titulo: 'Driving Sustainable Corporate Value Creation (Growth Roadmap toward 2035 and Performance Plan toward 2030) y su FAQ', editor: 'Baycurrent, Inc.', tipo: 'Primaria', fecha: '2026-10-15', url: `${EIR}/ir_material_for_fiscal_ym8/214207/00.pdf` },
  { id: 11, titulo: 'Notice on Partial Revision of Basic Policy on Shareholder Returns (Change in Capital Allocation Policy)', editor: 'Baycurrent, Inc. (TDnet)', tipo: 'Primaria', fecha: '2026-10-15', url: `${EIR}/tdnet/2895613/00.pdf` },
  { id: 12, titulo: 'Notice on recompra (18-mar-2026) y Notice of completion and cancellation of treasury shares (6-ago-2026)', editor: 'Baycurrent, Inc. (TDnet)', tipo: 'Primaria', fecha: '2026-08-06', url: `${EIR}/tdnet/2864674/00.pdf` },
  { id: 13, titulo: 'FAQ (Results for the First Half of the Fiscal Year Ending February 2027): IA, ciberseguridad, defensa, costes de contratación', editor: 'Baycurrent, Inc.', tipo: 'Primaria', fecha: '2026-10-15', url: `${EIR}/ir_material_for_fiscal_ym9/214126/00.pdf` },
  { id: 14, titulo: 'Mid-term Management Plan 2024 (objetivo de 250.000 M JPY de ingresos en el ejercicio a feb-2029)', editor: 'Baycurrent Consulting', tipo: 'Primaria', fecha: '2024-04', url: `${EIR}/ir_material_for_fiscal_ym8/159322/00.pdf` },
];

// Cuenta (M JPY). EBITDA del motor = resultado operativo + toda la amortización (con la de derechos de uso). El EBITDA
// que publica la empresa es otro: resultado operativo + amortización SIN derechos de uso ± otros ajustes (52.125 en FY2025).
const C_ = [
  // periodo, ingresos, coste, generales, ebit, finanzas, bai, impuestos, bn, bpa, dpa, amort, gastoFin, acciones
  ['FY2020', 42873, 22648, 6676, 13551, -74, 13477, 3463, 10014, 65.45, 17, 989, 74, 153.0],
  ['FY2021', 57642, 27069, 9057, 21518, -49, 21469, 5925, 15544, 101.39, 26, 841, 49, 153.3],
  ['FY2022', 76090, 33669, 12506, 29916, -41, 29875, 7965, 21910, 142.96, 37, 1064, 41, 153.26],
  ['FY2023', 93909, 42643, 17048, 34219, -59, 34160, 8778, 25382, 166.04, 43, 2415, 59, 152.87],
  ['FY2024', 116056, 53601, 19845, 42615, -69, 42546, 11786, 30760, 202.16, 62, 2489, 69, 152.15],
  ['FY2025', 148332, 64346, 33069, 50931, 57, 50988, 13148, 37840, 249.16, 100, 2525, 63, 151.87],
];
const cuenta = C_.map(([periodo, ingresos, coste_ventas, gastos_generales, ebit, resultado_financiero, bai, impuestos, beneficio_neto, bpa, dpa, amortizaciones, gastos_financieros, acciones_diluidas]) => ({
  periodo, ingresos, coste_ventas, gastos_generales, ebitda: ebit + amortizaciones, amortizaciones, ebit, resultado_financiero, bai, impuestos, minoritarios: 0, beneficio_neto,
  gastos_financieros, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa, dpa, dpa_extraordinario: 0, acciones_diluidas,
}));
// Balance al cierre (28/29 de febrero siguiente al inicio del ejercicio). Sin línea de proveedores: «otros pasivos
// corrientes» (gastos de personal devengados, impuesto sobre el consumo, otros) hace de proveedores.
const B_ = [
  // periodo, activo, act.corr, pas.corr, pas.total, fc, intang, inmov, exist, clientes, otrosPasCorr, caja, deuda, arrend, patrimonio, reservas
  ['FY2020', 46003, 22764, 10653, 15985, 19187, 88, 2027, 543, 5801, 5600, 16295, 5478, 1499, 30018, 22826],
  ['FY2021', 58136, 35173, 12750, 16435, 19187, 69, 1323, 436, 8558, 6027, 26056, 4440, 767, 41701, 35228],
  ['FY2022', 75265, 49705, 15204, 17924, 19187, 60, 1621, 463, 12117, 7488, 36606, 3399, 740, 57341, 52382],
  ['FY2023', 99883, 64011, 17840, 25756, 19187, 73, 11949, 669, 16068, 8222, 45778, 2356, 7299, 74127, 71489],
  ['FY2024', 124665, 88599, 24159, 30264, 19187, 58, 11620, 919, 22699, 12335, 60552, 1311, 6771, 94401, 94624],
  ['FY2025', 157485, 114292, 35486, 40447, 19187, 95, 13631, 624, 36610, 20146, 72308, 262, 6313, 117038, 119245],
];
const balance = B_.map(([periodo, activo_total, activo_corriente, pasivo_corriente, pasivo_total, fondo_comercio, intangibles, inmovilizado_material, existencias, clientes, proveedores, caja, deuda_financiera, arrendamientos, patrimonio_neto, reservas]) => ({
  periodo, activo_total, activo_corriente, pasivo_corriente, pasivo_total, fondo_comercio, intangibles, inmovilizado_material, existencias, clientes, proveedores,
  activos_contrato: null, pasivos_contrato: null, caja, deuda_financiera, arrendamientos, patrimonio_neto, minoritarios: 0, reservas,
}));
const F_ = [
  ['FY2020', 12135, 204, 704, 1758, 1],
  ['FY2021', 16018, 75, 732, 3141, 1206],
  ['FY2022', 21635, 386, 929, 4753, 2097],
  ['FY2023', 24348, 3632, 1093, 6273, 3006],
  ['FY2024', 32648, 866, 2066, 7618, 3608],
  ['FY2025', 37616, 2645, 2078, 13218, 3006],
];
const flujos = F_.map(([periodo, flujo_operativo, capex, pagos_arrendamientos, dividendos, recompras]) => ({
  periodo, flujo_operativo, capex, pagos_arrendamientos, adquisiciones: 0, desinversiones: 0, dividendos, recompras, emision_acciones: 0, intereses_en_financiacion: 0,
}));
// Trimestres (etiqueta «inicio»: 1T25 = mar-may 2025). EBITDA = el de la empresa (sin derechos de uso) [2, 4].
const trim = (p, ing, prev, ebitda, bpa) => ({ periodo: p, ingresos: ing, crecimiento_pct: prev ? r1((ing / prev - 1) * 100) : null, crecimiento_organico_pct: prev ? r1((ing / prev - 1) * 100) : null, ebitda, margen_ebitda_pct: r1(ebitda / ing * 100), bpa, vs_consenso: null });

const A = {
  _estado: 'Completa. Sin XBRL público en Japón: cuenta, balance y flujos copiados de los tanshin (NIIF) de cada ejercicio y comprobados con el yuho del ejercicio a feb-2026. Etiqueta del ejercicio por el año en que EMPIEZA (la de la empresa desde el 15-oct-2026): FY2025 = mar-2025 a feb-2026. Crecimiento orgánico = el publicado (la empresa no hace compras desde 2014).',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM ago-26', fecha_fin: '2026-08-31', ingresos: 172783, ebitda: 57553 + 3324, ebit: 57553, beneficio_neto: 42820, bpa: 284.35, dpa: 115, dpa_extraordinario: 0, fcf: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [
      { periodo: 'FY2024', descripcion: 'Holding desde el 1-sep-2024: Baycurrent Consulting, Inc. pasa a llamarse Baycurrent, Inc. y la consultoría y la tecnología operan en dos filiales nuevas; sin cambio de perímetro económico [5].' },
    ],
    comentario: 'Los ingresos pasaron de 42.873 M JPY en FY2020 a 148.332 M en FY2025 (TCAC del 28,2 %) sin ninguna compra: todo es crecimiento orgánico por más consultores y más precio por consultor [1, 7]. El resultado operativo subió de 13.551 M a 50.931 M (TCAC del 30,3 %), con un margen del 31,6 % al 34,3 % [1, 7]. En FY2025 el margen operativo bajó 2,4 puntos (del 36,7 % al 34,3 %) porque los gastos generales casi se duplicaron (de 19.845 M a 33.069 M: contratación masiva de comerciales, publicidad y la nueva sede) [1, 2]. En el primer semestre de FY2026 (mar-ago 2026) los ingresos crecieron un 35,7 % (92.913 M) y el resultado operativo un 28,5 % (29.892 M), con un margen del 32,2 % [3]. No hay partidas no recurrentes relevantes en el EBITDA. El EBITDA que publica la empresa (52.125 M en FY2025, 35,1 %) no incluye la amortización de los derechos de uso de oficinas (≈ 2.000 M); el del informe sí la incluye (53.456 M).',
    ajustes: 'Sin ajustes: la empresa no publica beneficio «ajustado»; el BPA es el NIIF básico (el diluido es igual: no hay opciones relevantes). Split 10:1 el 1-nov-2022: todos los BPA y DPA están ya divididos por 10 [7]. El EBITDA de la empresa = resultado operativo + amortización sin derechos de uso ± otros ajustes NIIF [2].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      trim('3T24', 29431, 23991, 10812, null),
      trim('4T24', 32531, 26192, 14071, null),
      trim('1T25', 34307, 27297, 12455, 59.32),
      trim('2T25', 34155, 26797, 11299, 54.12),
      trim('3T25', 37474, 29431, 12155, 58.04),
      trim('4T25', 42396, 32531, 16216, 77.68),
      trim('1T26', 44576, 34307, 14888, 70.99),
      trim('2T26', 48336, 34155, 15838, 77.64),
    ],
    ultima_presentacion: 'Resultados del primer semestre de FY2026 (15-oct-2026): ingresos de 92.913 M JPY (+35,7 %), EBITDA de la empresa de 30.726 M (33,1 %) y beneficio de 22.209 M (+28,9 %) [3, 4]. La dirección confirmó la guía anual (190.000 M de ingresos, 66.500 M de EBITDA, BPA de 323,79 JPY) y dijo que la superará en ingresos y beneficio: el semestre lleva el 48,9 % de los ingresos y el 46,2 % del EBITDA anual, frente al 46,4 % y el 44,4 % de media histórica [4]. KPI: proyectos +25,5 %, ingresos por consultor +6,6 %, 6.339 consultores (+30,9 %) y ocupación en la parte media del 80-90 % [4]. Para el 3T espera 7.000-7.200 consultores y proyectos +25-28 % [4]. La IA es ya el 50-60 % de los ingresos; ciberseguridad y defensa ≈ 10 %, con un objetivo del 20 % en FY2027 [13]. A la pregunta repetida de los analistas sobre si la IA reduce la demanda de consultores, la dirección respondió que las grandes empresas japonesas están en una fase temprana de adopción y que la demanda de transformación crecerá 3-5 años; no dio cifras de precio por hora ni de ocupación por proyecto de IA [13]. Los costes de contratación del semestre fueron ≈ 30 % superiores al plan [13]. El mismo día presentó el plan a 2030 (500.000 M de ingresos y 40 % de margen EBITDA) y un cambio de política de caja [10, 11]. En el 1T (julio) el discurso era el mismo, con menos ambición: no había plan nuevo [8].',
    confianza: 'Alta',
  },
  balance: {
    historico: balance,
    vencimientos: [{ anio: 'FY2026', importe: 262 }],
    liquidez: 'Caja de 54.483 M JPY a 31-ago-2026, más 3.020 M de depósitos a plazo a corto y 6.335 M de otros activos financieros no corrientes (fianzas de oficinas y préstamos); sin deuda bancaria tras devolver los últimos 262 M en el semestre [3]. La caja bajó desde 72.308 M en febrero por la recompra de 30.000 M (mar-jul 2026) y el dividendo [3, 12]. Nueva política: mantener una caja ≈ 25 % de los ingresos previstos (antes ≈ 40 %) y usar el exceso en crecimiento y recompras [11].',
    rating: 'Sin calificación crediticia pública',
    coste_deuda_pct: 0.5,
    vida_media_anios: null,
    otros_pasivos: 'Arrendamientos (NIIF 16) de 8.873 M JPY a 31-ago-2026 (3.201 a corto y 5.672 a largo), casi todo oficinas; subieron por las nuevas plantas alquiladas para la plantilla que crece un 30 % al año [3]. Provisiones de 1.387 M (restauración de oficinas). Impuestos a pagar de 8.716 M [3].',
    comentario: 'Balance sin deuda y con caja neta: 72.308 M JPY de caja en febrero de 2026 frente a 262 M de préstamos y 6.313 M de arrendamientos [1]. El fondo de comercio (19.187 M, el 12 % del activo) viene de la compra de la consultora por sus directivos con un fondo (MBO) en 2014 y no se ha deteriorado nunca [5]. El circulante es sobre todo cuentas a cobrar (36.610 M en febrero, 90 días de ventas del 4T, que es el trimestre fuerte) frente a gastos devengados y otros pasivos corrientes (20.146 M) [1]. El patrimonio pasó de 117.038 M en febrero a 102.304 M en agosto de 2026 por la recompra [3].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'La conversión de beneficio en caja es alta: flujo operativo de 37.616 M JPY en FY2025 frente a un beneficio de 37.840 M, con un 1,8 % de las ventas en inversión (2.645 M, oficinas) y 2.078 M de pagos de arrendamientos [1]. El flujo libre (operativo − inversión − arrendamientos) fue de 32.893 M en FY2025 (22,2 % de las ventas) [1]. En FY2025 el circulante restó ≈ 9.000 M por el salto de las cuentas a cobrar (de 22.699 M a 36.610 M), más que los ingresos [1]. En el primer semestre de FY2026: flujo operativo de 22.195 M, inversión de 585 M, arrendamientos de 1.171 M; la caja se fue en la recompra (30.031 M) y el dividendo (7.591 M) [3].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'Taiyo LLC (太陽有限責任監査法人)', anios_auditor: null, opinion: 'Favorable (sin salvedades) en el ejercicio a feb-2026, también sobre el control interno [5]',
    comentario: 'Cuentas sencillas: un solo segmento (consultoría), ingresos casi todos en Japón y reconocidos por horas o por avance, sin compras, sin deuda y sin ajustes al beneficio [5]. La caja sigue al beneficio. Dos puntos a vigilar: las cuentas a cobrar subieron un 61 % en FY2025 con ingresos +27,8 % (efecto del 4T y de clientes más grandes con plazos más largos) y volvieron a 32.967 M en agosto; y la amortización de derechos de uso se ha duplicado con las oficinas nuevas, lo que separa el EBITDA de la empresa del real [1, 3]. El auditor, Taiyo, es una firma mediana, no una de las cuatro grandes [5].',
    senales: [
      { senal: 'Cuentas a cobrar creciendo más que las ventas', nivel: 'Media', comentario: '+61 % en FY2025 frente a ingresos +27,8 %; 32.967 M en agosto de 2026 (normalizado en parte) [1, 3].' },
      { senal: 'EBITDA de la empresa sin derechos de uso', nivel: 'Baja', comentario: 'El EBITDA publicado excluye ≈ 2.000 M de amortización de oficinas alquiladas; el informe usa el resultado operativo + toda la amortización [2].' },
      { senal: 'Auditor mediano', nivel: 'Baja', comentario: 'Taiyo LLC, sin salvedades [5].' },
      { senal: 'Fondo de comercio de la compra apalancada de 2014', nivel: 'Baja', comentario: '19.187 M sin deterioro; el 12 % del activo [5].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Hasta octubre de 2026: dividendo con un payout ≈ 40 %, recompras y caja ≈ 40 % de los ingresos [6]. Desde el 15-oct-2026: caja ≈ 25 % de los ingresos previstos; el exceso va a crecimiento (fusiones y compras, empresas conjuntas con clientes, extranjero) y a recompras flexibles; payout del 40 % [11]. DPA de FY2026 guiado en 130 JPY (65 + 65) [3]. Recompra de mar-jul 2026: 5.184.200 acciones por 30.000 M (≈ 5.787 JPY de media), amortizadas el 19-ago-2026 [12].',
    adquisiciones: [],
    comentario: 'Asignación de capital disciplinada hasta hoy: crecimiento sin compras, dividendo creciente (de 17 JPY en FY2020 a 100 en FY2025) y recompras (≈ 43.000 M desde 2021, 30.000 M solo en 2026 a ≈ 5.787 JPY, la mitad del precio de hoy) [1, 12]. El riesgo nuevo es el plan de octubre de 2026: abre la puerta a compras, empresas conjuntas y expansión al extranjero, que la empresa nunca ha hecho, y el propio plan estima la capitalización de 2030 con un PER de 30-40 veces [10, 11]. Las acciones en circulación bajaron de 153,0 M (FY2020) a 146,98 M (agosto de 2026).',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'Consultoría (segmento único)', descripcion: 'Estrategia, digital/IA, ciberseguridad, defensa y operaciones para grandes empresas japonesas y administraciones; se factura por consultor y mes.', tipo_resultado: 'EBIT', historico: [{ periodo: 'FY2023', ingresos: 93909, resultado: 34219 }, { periodo: 'FY2024', ingresos: 116056, resultado: 42615 }, { periodo: 'FY2025', ingresos: 148332, resultado: 50931 }] },
    ],
    geografias: [{ nombre: 'Japón', peso_pct: 100 }],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Consultores', valor_anterior: '5.590 (feb-26)', valor_actual: '6.339 (ago-26)', variacion: '+30,9 % interanual', comentario: 'Guía de 7.000-7.200 en el 3T [4].' },
      { kpi: 'Proyectos', valor_anterior: '+20,7 % (FY2025)', valor_actual: '+25,5 % (1S FY2026)', variacion: '+4,8 puntos', comentario: 'Guía del 3T: +25-28 % [4].' },
      { kpi: 'Ingresos por consultor', valor_anterior: 'n. d.', valor_actual: '+6,6 % (1S FY2026)', variacion: '+6,6 %', comentario: 'Guía del 3T: +5-7 % [4].' },
      { kpi: 'Ocupación', valor_anterior: 'Media del 80-90 %', valor_actual: 'Media del 80-90 %', variacion: 'Estable', comentario: 'Objetivo del 80-90 % [2, 4].' },
      { kpi: 'Peso de DX/IA en los ingresos', valor_anterior: 'n. d.', valor_actual: '≈ 50-60 %', variacion: 'n. d.', comentario: 'Respuesta de la dirección [13].' },
      { kpi: 'Empleados', valor_anterior: '6.768 (feb-26)', valor_actual: '8.115 (ago-26)', variacion: '+29,9 %', comentario: '≈ 8.500 previstos en el 3T [4].' },
    ],
    clientes: 'Ningún cliente supera el 10 % de los ingresos (nota de segmentos del yuho), y la empresa no publica el peso de sus mayores clientes [5]. Su estrategia es de «clientes clave» (core clients): las empresas líderes de cada sector con las que amplía contratos; no da cuántos son ni qué parte de las ventas suman [2, 14]. Clientes: grandes empresas japonesas de finanzas, industria, telecomunicaciones, energía y la administración (Ministerio de Defensa) [4]. Poder de precios: el ingreso por consultor sube un 5-7 % al año, por mezcla de proyectos más caros y subidas de tarifa [4].',
    confianza: 'Alta',
  },
  huecos: [
    { seccion: 'negocio', campo: 'peso de los mayores clientes', tipo: 'Complemento', intentos: '1) yuho del ejercicio a feb-2026 (solo dice que ninguno supera el 10 %); 2) suplementos y FAQ (estrategia de clientes clave sin cifras); 3) plan a medio plazo de 2024', decision: 'Omitido' },
    { seccion: 'calidad', campo: 'años del auditor', tipo: 'Complemento', intentos: '1) yuho (texto extraído con pdfminer, no legible la tabla); 2) informe de gobierno corporativo; 3) convocatoria de junta', decision: 'Omitido' },
  ],
  fuentes: fA,
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Supplement to Financial Results for the Fiscal Year Ended February 28, 2026 (Appendix: mercado de consultoría de Japón y EE. UU., estimación propia con datos de IDC Japan)', editor: 'Baycurrent, Inc.', tipo: 'Primaria', fecha: '2026-04-14', url: `${EIR}/tdnet/2790682/00.pdf` },
  { id: 2, titulo: 'Driving Sustainable Corporate Value Creation (plan a 2030 y hoja de ruta a 2035)', editor: 'Baycurrent, Inc.', tipo: 'Primaria', fecha: '2026-10-15', url: `${EIR}/ir_material_for_fiscal_ym8/214207/00.pdf` },
  { id: 3, titulo: 'コンサル業界、「アンソロピック・ショック」で株価半減 (caída de las consultoras por la IA)', editor: 'Toyo Keizai', tipo: 'Prensa', fecha: '2026-04-17', url: 'https://toyokeizai.net/articles/-/941598' },
  { id: 4, titulo: 'Fichas de comparables (ventas, EBITDA, estimaciones) de Yahoo Finance', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com' },
  { id: 5, titulo: '有価証券報告書 del ejercicio a feb-2026 (historia, negocio, riesgos, empleados)', editor: 'Baycurrent, Inc. (EDINET)', tipo: 'Primaria', fecha: '2026-05', url: `${EIR}/yuho_pdf/S100Y69G/00.pdf` },
  { id: 6, titulo: 'FAQ del primer semestre del ejercicio a feb-2027 (IA, ciberseguridad, defensa)', editor: 'Baycurrent, Inc.', tipo: 'Primaria', fecha: '2026-10-15', url: `${EIR}/ir_material_for_fiscal_ym9/214126/00.pdf` },
  { id: 7, titulo: 'Supplement to Financial Results for the First Half of the Fiscal Year Ending February 28, 2027', editor: 'Baycurrent, Inc.', tipo: 'Primaria', fecha: '2026-10-15', url: `${EIR}/tdnet/2895269/00.pdf` },
];
const B__ = {
  _estado: 'Completa con una sola fuente de tamaño de mercado con cifras (la estimación de la empresa con IDC Japan) y una de prensa (Toyo Keizai) para 2030. Cuotas de competidores privados (Accenture Japón, las Big 4) sin cifras públicas.',
  sector: {
    definicion: 'Mercado relevante: la consultoría de gestión y de tecnología para grandes empresas y administraciones en Japón (estrategia, transformación digital e IA, operaciones, ciberseguridad), sin la externalización de sistemas ni el desarrollo de software a medida. Es donde BayCurrent hace prácticamente el 100 % de sus ventas [5]. Tamaño ≈ 2 billones de JPY según la estimación de la empresa con datos de IDC Japan, con ≈ 70.000 consultores, frente a ≈ 30 billones y 1 millón de consultores en EE. UU. [1].',
    tamano: '≈ 2.000.000 M JPY (≈ 2 billones) en 2024, estimación de la empresa con IDC Japan [1]',
    unidad_serie: 'millones de JPY (estimación de la empresa con IDC Japan: ≈ 2 billones en 2024 y TCAC ≈ 10 % hasta 2029; años intermedios interpolados por el analista)',
    serie: [{ anio: '2024', tamano: 2000000 }, { anio: '2025e', tamano: 2200000 }, { anio: '2026e', tamano: 2420000 }, { anio: '2027e', tamano: 2662000 }, { anio: '2028e', tamano: 2928000 }, { anio: '2029e', tamano: 3221000 }],
    tcac_historico_pct: null, tcac_previsto_pct: 10, cr5_pct: null, estructura: 'Fragmentada',
    drivers: [
      { driver: 'Inversión en transformación digital e IA de las grandes empresas', efecto: '+', horizonte: 'Estructural', evidencia: 'Inversión en DX de ≈ 14,4 billones de JPY en Japón frente a 133 en EE. UU.; en IA, 144.000 M frente a 17,4 billones [1].' },
      { driver: 'Falta de personal técnico en las empresas japonesas', efecto: '+', horizonte: 'Estructural', evidencia: 'La empresa lo cita como razón para externalizar en consultoras [1].' },
      { driver: 'IA generativa y agentes que hacen el trabajo de analistas y consultores junior', efecto: '−', horizonte: 'Estructural', evidencia: 'La «sacudida Anthropic» de febrero de 2026 hundió a las consultoras japonesas: casi la mitad de su valor desde agosto de 2025 [3].' },
      { driver: 'Ciberseguridad, defensa, energía y semiconductores (política nacional)', efecto: '+', horizonte: 'Estructural', evidencia: 'Mercado de ciberseguridad ≈ 2 billones de JPY con TCAC ≈ 10 % hasta 2030 y consultoría de seguridad +20 % [6].' },
      { driver: 'Ciclo de inversión empresarial', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Los proyectos de consultoría se recortan antes que otros gastos en una recesión; BayCurrent creció en 2020 (+31 %) [5].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 4, justificacion: 'Accenture, las Big 4 (Deloitte, PwC, EY, KPMG), NRI, Abeam y consultoras nuevas compiten por los mismos consultores y clientes [5].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Grandes empresas con departamentos de compras, pero ningún cliente pesa más del 10 % [5].' },
      { fuerza: 'Poder de los proveedores', intensidad: 4, justificacion: 'El «proveedor» es el consultor: salarios altos y crecientes, costes de contratación un 30 % por encima del plan en 2026 [6].' },
      { fuerza: 'Amenaza de entrada', intensidad: 3, justificacion: 'Barrera baja en capital, alta en marca, relaciones con la alta dirección y capacidad de contratar 1.500 consultores al año.' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 4, justificacion: 'La IA generativa y los agentes sustituyen parte del trabajo de análisis, documentación y programación; también los equipos internos de las empresas [3].' },
    ],
    ciclo: { posicion: 'Expansión', comentario: 'La demanda de consultoría en Japón crece por la transformación digital y la IA, la ciberseguridad y la defensa; BayCurrent crece un 36 % en 2026 [7]. Una recesión cortaría primero los proyectos discrecionales, pero el negocio creció incluso en 2020.' },
    regulacion: 'Sin regulación sectorial específica. Le afectan la ley laboral japonesa (horas extra, contratos), la protección de datos y las reglas de contratación pública para los proyectos de defensa y administración [5].',
    tendencias: 'Tres tendencias: 1) la IA pasa de pruebas a transformación de toda la empresa, que necesita consultores durante 3-5 años según BayCurrent [6]; 2) la IA abarata y acelera el trabajo de consultoría y presiona el modelo de cobrar por horas: los clientes pueden pedir menos consultores o precio por resultado; el mercado lo vio así en febrero de 2026 [3]; 3) nuevas áreas por política nacional (ciberseguridad, defensa, energía, semiconductores) [2].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 7.4, posicion: 'Entre las mayores consultoras japonesas independientes; ≈ 7 % del mercado de consultoría de Japón con ingresos de 148.332 M JPY en FY2025 frente a ≈ 2 billones (estimación propia con la cifra de mercado de la empresa) [1, 5]',
    competidores: [
      { nombre: 'Nomura Research Institute', pais: 'Japón', ticker: '4307.T', ingresos: Math.round(Y['4307.T'].ventas / 1e6), cuota_pct: null, margen_ebit_pct: null, comentario: 'Consultoría y sobre todo sistemas; la consultoría es una parte pequeña de sus ventas [4].' },
      { nombre: 'Accenture (Japón)', pais: 'EE. UU./Japón', ticker: 'ACN', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Mayor consultora de Japón por personal; cifras de Japón no publicadas.' },
      { nombre: 'Deloitte, PwC, EY y KPMG (consultoría en Japón)', pais: 'Japón', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Privadas; compiten por los mismos consultores.' },
      { nombre: 'Sigmaxyz', pais: 'Japón', ticker: '6088.T', ingresos: Math.round(Y['6088.T'].ventas / 1e6), cuota_pct: null, margen_ebit_pct: null, comentario: 'Consultora independiente cotizada, mucho más pequeña [4].' },
      { nombre: 'Future', pais: 'Japón', ticker: '4722.T', ingresos: Math.round(Y['4722.T'].ventas / 1e6), cuota_pct: null, margen_ebit_pct: null, comentario: 'Consultoría de TI y desarrollo [4].' },
      { nombre: 'Rise Consulting Group', pais: 'Japón', ticker: '9168.T', ingresos: Math.round(Y['9168.T'].ventas / 1e6), cuota_pct: null, margen_ebit_pct: null, comentario: 'Consultora pequeña con el mismo modelo [4].' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'En riesgo',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'No hay red de usuarios.' },
        { fuente: 'Costes de cambio', puntuacion: 2, evidencia: 'Proyectos largos con equipos que conocen al cliente; pero los contratos son por meses y se pueden cambiar [5].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 2, evidencia: 'Marca reconocida en Japón y relación con la alta dirección de grandes empresas; patrocinio del «Baycurrent Classic» del PGA Tour [2].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Modelo «one pool» (consultores generalistas sin divisiones por sector) con ocupación del 80-90 % y margen EBITDA del 35 %, muy por encima de las rivales cotizadas (8-15 %) [1, 4].' },
        { fuente: 'Escala eficiente', puntuacion: 1, evidencia: 'Mercado fragmentado con grandes rivales mundiales.' },
      ],
    },
    amenazas: 'La mayor amenaza es la IA: si los clientes hacen con agentes de IA parte del trabajo que hoy pagan por consultor y mes, o exigen cobrar por resultado, el número de consultores facturables o su precio bajan [3]. Segundo, el mercado laboral: BayCurrent crece contratando ≈ 1.500-2.000 consultores al año y los costes de contratación subieron ≈ 30 % sobre el plan en 2026 [6]. Tercero, las grandes rivales (Accenture, Big 4) y las nuevas consultoras de IA.',
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'BayCurrent es una consultora japonesa que asesora a grandes empresas y administraciones en estrategia, transformación digital e IA, ciberseguridad, defensa y operaciones [5]. Tiene 6.339 consultores (agosto de 2026) en un único «pool»: los consultores no se dividen por sector ni por servicio, sino que se asignan a cada proyecto, lo que mantiene la ocupación alta [7]. Vende casi todo en Japón y no tiene segmentos [5].',
    como_gana_dinero: 'Cobra por consultor y mes de trabajo en proyectos para grandes empresas japonesas: ingresos = consultores × ocupación (80-90 %) × precio por consultor [7]. Crece contratando consultores (≈ 30 % al año) y subiendo el precio por consultor (+5-7 % al año) [7]. El margen EBITDA del 35 % viene de la alta ocupación, de tarifas altas para proyectos de dirección general y de no tener oficinas en el extranjero ni compras [1]. El riesgo del modelo es que vende horas de personas: la IA puede reducir las horas que el cliente necesita [3].',
  },
  huecos: [
    { seccion: 'sector', campo: 'segunda fuente del tamaño del mercado de consultoría de Japón con cifras', tipo: 'Complemento', intentos: '1) suplementos de BayCurrent (estimación con IDC Japan); 2) IDC Japan (nota de prensa sin cifra abierta); 3) Toyo Keizai (≈ 4 billones en 2030, sin año base comprobado)', decision: 'Omitido; se usa la estimación de la empresa' },
  ],
  fuentes: fB,
};
guarda('B', B__);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: '有価証券報告書 del ejercicio a feb-2026: consejo, remuneración, mayores accionistas, participaciones de consejeros', editor: 'Baycurrent, Inc. (EDINET)', tipo: 'Primaria', fecha: '2026-05', url: `${EIR}/yuho_pdf/S100Y69G/00.pdf` },
  { id: 2, titulo: 'コーポレート・ガバナンス報告書 (informe de gobierno corporativo, 2026)', editor: 'Baycurrent, Inc. (TSE)', tipo: 'Primaria', fecha: '2026-05', url: `${EIR}/tdnet/2824868/00.pdf` },
  { id: 3, titulo: 'Notice on change of Representative Director (dimisión de Daisuke Kitakaze por salud; Yoshiyuki Abe vuelve a consejero delegado)', editor: 'Baycurrent, Inc. (TDnet)', tipo: 'Primaria', fecha: '2025-11-19', url: `${EIR}/tdnet/2722485/00.pdf` },
  { id: 4, titulo: 'Notice on changes in directors and officers', editor: 'Baycurrent, Inc. (TDnet)', tipo: 'Primaria', fecha: '2026-02-27', url: `${EIR}/tdnet/2769450/00.pdf` },
  { id: 5, titulo: '主要株主の異動に関するお知らせ (el fundador Arata Eguchi baja del 10 %)', editor: 'Baycurrent, Inc. (TDnet)', tipo: 'Primaria', fecha: '2025-05-20', url: `${EIR}/tdnet/2622220/00.pdf` },
  { id: 6, titulo: 'Tanshin anuales de los ejercicios a feb-2021 a feb-2026 (guías iniciales y resultados)', editor: 'Baycurrent (TDnet)', tipo: 'Primaria', fecha: '2026-04-14', url: `${EIR}/tdnet/2790371/00.pdf` },
  { id: 7, titulo: 'Lista de informes de participaciones significativas (大量保有報告書) de 6532', editor: 'Kabutore', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://www.kabutore.biz/genzaikabuka/6532.html' },
  { id: 8, titulo: 'Convocatoria de la junta de accionistas de mayo de 2026 (consejeros propuestos)', editor: 'Baycurrent, Inc.', tipo: 'Primaria', fecha: '2026-05', url: `${EIR}/tdnet/2798384/00.pdf` },
  { id: 9, titulo: '代表取締役の異動 (Daisuke Kitakaze consejero delegado y Abe presidente del consejo desde mayo de 2025)', editor: 'Baycurrent Consulting (TDnet)', tipo: 'Primaria', fecha: '2025-02-19', url: `${EIR}/tdnet/2571150/00.pdf` },
];
const C = {
  _estado: 'Completa salvo los votos de la junta (no hay voto consultivo de remuneración en Japón y el informe de votos no se descargó). En Japón no hay registro de operaciones de directivos tipo Form 4: se usan los informes de participaciones significativas y los cambios de mayores accionistas.',
  directivos: {
    equipo: [
      { nombre: 'Yoshiyuki Abe', cargo: 'Presidente y consejero delegado', desde: '2016', participacion_pct: r2(756330 / 146.98e6 * 100), trayectoria: 'Consejero delegado de 2016 a mayo de 2025, presidente del consejo de mayo a noviembre de 2025 y de nuevo consejero delegado desde el 19-nov-2025, tras la dimisión de su sucesor por salud [3, 9]. Con él los ingresos pasaron de ≈ 20.000 M JPY a 148.332 M.' },
      { nombre: 'Kentaro Ikehira', cargo: 'Vicepresidente y consejero', desde: '2016', participacion_pct: r2(1023010 / 146.98e6 * 100), trayectoria: 'Dirige la parte comercial y de consultores [1].' },
      { nombre: 'Kosuke Nakamura', cargo: 'Director financiero y consejero', desde: '2016', participacion_pct: r2(851459 / 146.98e6 * 100), trayectoria: 'Director financiero desde antes de la salida a bolsa (2016) [1].' },
    ],
    historial_guidance: [
      { anio: 'FY2021', guia: 'Ingresos 51.000 M JPY; resultado operativo 16.000 M', real: '57.642; 21.518', cumplida: 'Sí' },
      { anio: 'FY2022', guia: 'Ingresos 71.100 M; resultado operativo 26.000 M', real: '76.090; 29.916', cumplida: 'Sí' },
      { anio: 'FY2023', guia: 'Ingresos 94.600 M; resultado operativo 35.500 M', real: '93.909; 34.219', cumplida: 'No' },
      { anio: 'FY2024', guia: 'Ingresos 115.000 M; resultado operativo 41.100 M', real: '116.056; 42.615', cumplida: 'Sí' },
      { anio: 'FY2025', guia: 'Ingresos 143.000 M; EBITDA 52.000 M; beneficio 37.300 M', real: '148.332; 52.125; 37.840', cumplida: 'Sí' },
      { anio: 'Plan 2024', guia: 'Ingresos de 250.000 M en FY2028', real: 'La empresa espera alcanzarlo en FY2027, un año antes', cumplida: 'Sí' },
    ],
    comentario: 'Equipo fundador de la etapa cotizada (Abe, Ikehira y Nakamura, desde 2016) que ha cumplido la guía inicial en cuatro de cinco años; solo falló por poco en FY2023, el año en que bajó la ocupación [6]. La sucesión falló: Daisuke Kitakaze fue consejero delegado de mayo a noviembre de 2025 y dimitió por salud; Abe volvió al cargo [3, 9]. Los tres directivos tienen ≈ 1,8 % de la empresa entre los tres [1].',
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      { nombre: 'Yoshiyuki Abe', cargo: 'Presidente y consejero delegado', tipo: 'Ejecutivo', desde: '2016', comisiones: 'Nombramientos y retribuciones' },
      { nombre: 'Kentaro Ikehira', cargo: 'Vicepresidente', tipo: 'Ejecutivo', desde: '2016', comisiones: '—' },
      { nombre: 'Kosuke Nakamura', cargo: 'Director financiero', tipo: 'Ejecutivo', desde: '2016', comisiones: '—' },
      { nombre: 'Toshimune Koji', cargo: 'Consejero externo (abogado)', tipo: 'Independiente', desde: null, comisiones: 'Nombramientos y retribuciones' },
      { nombre: 'Shintaro Sato', cargo: 'Consejero externo (abogado)', tipo: 'Independiente', desde: null, comisiones: 'Nombramientos y retribuciones' },
      { nombre: 'Yoshitaka Okuyama', cargo: 'Consejero externo (ex Nomura)', tipo: 'Independiente', desde: null, comisiones: 'Auditoría' },
      { nombre: 'Yuichiro Kasuya', cargo: 'Consejero externo (contable)', tipo: 'Independiente', desde: null, comisiones: 'Auditoría' },
      { nombre: 'Tetsuya Fujimoto', cargo: 'Consejero externo (asesor fiscal)', tipo: 'Independiente', desde: null, comisiones: 'Auditoría' },
      { nombre: 'Yoshie Midorikawa', cargo: 'Consejera externa (abogada)', tipo: 'Independiente', desde: null, comisiones: 'Auditoría' },
    ],
    presidente_ceo_separados: false, presidente_ejecutivo: true, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: false, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 2,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: 'FY2025', total: 321, fijo: 40, variable_corto: 175, variable_largo: 106, ratio_salario_medio: r1(321 / 13.31) },
    remuneracion: 'El consejo ejecutivo cobró 1.339 M JPY en FY2025, 401 M en acciones restringidas [1]. Abe cobró 321 M JPY: 40 M de fijo, 175 M de variable ligado al EBITDA del año y 106 M en acciones restringidas; Ikehira 439 M y Nakamura 430 M, más que el consejero delegado [1]. El variable premia el EBITDA, no el rendimiento sobre el capital ni el precio de la acción. Ratio frente al salario medio del holding (13,31 M JPY): ≈ 24 veces [1]. En Japón no hay voto consultivo de la remuneración. La comisión de nombramientos y retribuciones la forman Abe y dos externos [2].',
    accionistas: [
      { nombre: 'The Master Trust Bank of Japan (fiduciario)', pct: 24.36, tipo: 'Institucional', variacion: 'Custodio de fondos japoneses (feb-26)' },
      { nombre: 'Custody Bank of Japan (fiduciario)', pct: 10.64, tipo: 'Institucional', variacion: 'Custodio (feb-26)' },
      { nombre: 'Arata Eguchi (fundador)', pct: 5.31, tipo: 'Particular', variacion: 'De 15,56 M de acciones (feb-25) a 8,06 M (feb-26): vendió casi la mitad' },
      { nombre: 'Nomura Asset Management', pct: 9.45, tipo: 'Institucional', variacion: 'Informe de participación de octubre de 2025' },
      { nombre: 'Mitsubishi UFJ (grupo)', pct: 5.36, tipo: 'Institucional', variacion: 'Informe del 7-sep-2026' },
      { nombre: 'Daiwa Asset Management', pct: 5.27, tipo: 'Institucional', variacion: 'Informe del 4-sep-2026' },
      { nombre: 'Capital Group', pct: 5.06, tipo: 'Institucional', variacion: 'Informe del 23-jul-2026' },
      { nombre: 'Fidelity', pct: 3.62, tipo: 'Institucional', variacion: 'Bajó del 8,21 % (informe del 18-jun-2026)' },
      { nombre: 'Consejeros ejecutivos (Abe, Ikehira, Nakamura)', pct: r2((756330 + 1023010 + 851459) / 146.98e6 * 100), tipo: 'Internos', variacion: 'Sin cambios relevantes conocidos' },
    ],
    insiders: [
      { fecha: '2025-05-12', persona: 'Arata Eguchi (fundador, no consejero)', operacion: 'Venta', acciones: 1500000, importe: null },
      { fecha: '2026-02-28', persona: 'Arata Eguchi (fundador, no consejero)', operacion: 'Venta', acciones: 6000000, importe: null },
    ],
    control_y_defensas: 'Sin accionista de control: el fundador Arata Eguchi tiene el 5,31 % y vende; el resto son fiduciarios y gestoras [1, 5]. Una acción, un voto. Sociedad con comisión de auditoría y supervisión (監査等委員会設置会社): nueve consejeros, seis externos [2]. El consejero delegado preside el consejo y la comisión de nombramientos [2]. Sin medidas antiopa conocidas.',
    alertas: [
      'El fundador vendió ≈ 7,5 M de acciones entre febrero de 2025 y febrero de 2026 (del 10,2 % al 5,3 %); le quedan 8,06 M, un posible lastre de oferta [1, 5].',
      'Sucesión fallida: el consejero delegado nombrado en mayo de 2025 dimitió en noviembre por salud y volvió Abe [3].',
      'El plan de 2030 estima la capitalización futura (≈ 5 billones de JPY con un PER de 30-40 veces): un objetivo de precio de la propia empresa [7].',
    ],
    confianza: 'Media',
  },
  huecos: [
    { seccion: 'gobierno', campo: 'votos de la junta de mayo de 2026', tipo: 'Complemento', intentos: '1) feed de TDnet de eir-parts (臨時報告書 no listado); 2) convocatoria (solo propuestas); 3) informe de gobierno', decision: 'Omitido' },
    { seccion: 'gobierno', campo: 'año de entrada de los consejeros externos', tipo: 'Complemento', intentos: '1) yuho (tabla mal extraída); 2) convocatoria; 3) informe de gobierno', decision: 'Omitido' },
  ],
  fuentes: fC,
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de 6532.T, 1306.T (TOPIX) y 1626.T (sector servicios): precio, rentabilidades, beta, cierres de ejercicio; herramienta bolsa.mjs', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://finance.yahoo.com/quote/6532.T/history' },
  { id: 2, titulo: 'Consenso de 6532.T y comparables (estimaciones de BPA y ventas, objetivos, recomendaciones) y cierre del 19-oct-2026 (15:30 de Tokio): quoteSummary y chart', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/6532.T/analysis' },
  { id: 3, titulo: 'Noticias de BayCurrent en Kabutan (resultados, stop-high, subida de objetivo de un gran broker a 11.200 JPY, servicio de ciberincidentes)', editor: 'Kabutan', tipo: 'Prensa', fecha: '2026-10-19', url: 'https://kabutan.jp/stock/news?code=6532&page=1' },
  { id: 4, titulo: 'Interest Rate (rendimiento del bono japonés a 10 años: 2,958 % el 16-oct-2026)', editor: 'Ministerio de Hacienda de Japón', tipo: 'Primaria', fecha: '2026-10-16', url: 'https://www.mof.go.jp/english/policy/jgbs/reference/interest_rate/jgbcme.csv' },
  { id: 5, titulo: 'Implied ERP by month (ERPbymonth.xlsx): octubre de 2026, 4,20 %', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 6, titulo: 'Tanshin del primer semestre del ejercicio a feb-2027 (balance a 31-ago-2026, acciones, guía)', editor: 'Baycurrent, Inc. (TDnet)', tipo: 'Primaria', fecha: '2026-10-15', url: `${EIR}/tdnet/2895268/00.pdf` },
  { id: 7, titulo: 'コンサル業界、「アンソロピック・ショック」で株価半減', editor: 'Toyo Keizai', tipo: 'Prensa', fecha: '2026-04-17', url: 'https://toyokeizai.net/articles/-/941598' },
  { id: 8, titulo: 'Movimiento del precio de 6532.T (1-12 meses, máximos, media de 200, avisos P1-P5): herramienta movimiento.mjs', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/6532.T/history' },
  { id: 9, titulo: 'Lista de informes de participaciones significativas de 6532 (MUFG, Daiwa, Capital, Fidelity, Nomura)', editor: 'Kabutore', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://www.kabutore.biz/genzaikabuka/6532.html' },
  { id: 10, titulo: 'Consenso de analistas de BayCurrent (objetivo medio y su evolución)', editor: 'Minkabu', tipo: 'Analistas', fecha: '2026-10-19', url: 'https://minkabu.jp/stock/6532/analyst_consensus' },
  { id: 11, titulo: 'Plan a 2030 y política de capital (15-oct-2026)', editor: 'Baycurrent, Inc.', tipo: 'Primaria', fecha: '2026-10-15', url: `${EIR}/ir_material_for_fiscal_ym8/214207/00.pdf` },
  { id: 12, titulo: 'Recompra de 30.000 M JPY (mar-jul 2026) y amortización de 5.184.200 acciones', editor: 'Baycurrent, Inc. (TDnet)', tipo: 'Primaria', fecha: '2026-08-06', url: `${EIR}/tdnet/2864674/00.pdf` },
  { id: 13, titulo: 'Cambio de accionista principal (el fundador baja del 10 %)', editor: 'Baycurrent, Inc. (TDnet)', tipo: 'Primaria', fecha: '2025-05-20', url: `${EIR}/tdnet/2622220/00.pdf` },
  { id: 14, titulo: 'Tipos de cambio USD/JPY (158,47) y EUR/JPY (177,74) del 19-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/JPY=X' },
];
const c = Y['6532.T'];
const t = Object.fromEntries(c.trend.map((x) => [x.periodo, x]));
const bol = B.bolsa;
// Comparables: PER de los próximos 12 meses = precio ÷ (mezcla de los dos ejercicios del consenso según los meses que quedan
// del ejercicio en curso a 19-oct-2026). Los PER «adelantados» de Yahoo para Japón no son fiables (usan otra base).
const FX = { JPY: 1, USD: 158.468, EUR: 177.736 };
const corte = new Date('2026-10-19T00:00:00Z');
const compsDef = [
  ['Nomura Research Institute', '4307.T', 'JP'], ['Sigmaxyz Holdings', '6088.T', 'JP'], ['Rise Consulting Group', '9168.T', 'JP'], ['Future Corporation', '4722.T', 'JP'],
  ['SHIFT', '3697.T', 'JP'], ['ULS Group', '3798.T', 'JP'], ['Alpha Systems', '4719.T', 'JP'], ['Accenture', 'ACN', 'US'], ['Capgemini', 'CAP.PA', 'FR'], ['Booz Allen Hamilton', 'BAH', 'US'],
];
const comps = compsDef.map(([nombre, tk, pais]) => {
  const y = Y[tk]; const tt = Object.fromEntries(y.trend.map((x) => [x.periodo, x]));
  const fin0 = new Date(tt['0y'].fin + 'T00:00:00Z'); const m = Math.max(0, Math.min(12, (fin0 - corte) / (30.44 * 864e5)));
  const bpaNtm = tt['0y'].bpa != null && tt['+1y'].bpa != null ? (m / 12) * tt['0y'].bpa + (1 - m / 12) * tt['+1y'].bpa : null;
  const crec = tt['0y'].ventas && tt['+1y'].ventas ? (tt['+1y'].ventas / tt['0y'].ventas - 1) * 100 : null;
  const dn = y.ev != null && y.cap != null ? (y.ev - y.cap) : null;
  return {
    nombre, ticker: tk, pais, capitalizacion: Math.round(y.cap * FX[y.divisa] / 1e6), ev_ventas: y.ev && y.ventas ? r2(y.ev / y.ventas) : null,
    ev_ebitda_ltm: y.ev && y.ebitda ? r1(y.ev / y.ebitda) : null, ev_ebitda_ntm: null, per_ntm: bpaNtm ? r1(y.precio / bpaNtm) : null,
    crecimiento_pct: r1(crec), margen_ebitda_pct: y.ebitda && y.ventas ? r1(y.ebitda / y.ventas * 100) : null, roic_pct: null,
    dn_ebitda: dn != null && y.ebitda ? r1(dn / y.ebitda) : null, fcf_yield_pct: null,
  };
});
const perMed = (() => { const v = comps.map((x) => x.per_ntm).filter((x) => x != null).sort((a, b) => a - b); const n = v.length; return n % 2 ? v[(n - 1) / 2] : r1((v[n / 2 - 1] + v[n / 2]) / 2); })();
const PRECIO = c.precio; // 10.740 JPY, cierre del 19-oct-2026 (15:30 JST)
const D = {
  _estado: `Completa. Precio de cierre del 19-oct-2026 (10.740 JPY, Yahoo chart, 15:30 de Tokio); bolsa.mjs solo llegaba al 16-oct (10.195). Mediana del PER de los próximos 12 meses de los comparables: ${perMed}. Transacciones sin múltiplos publicados (hueco).`,
  _per_mediana_comparables: perMed,
  identificacion: {
    nombre: 'Baycurrent, Inc.', nombre_corto: 'BayCurrent', ticker: '6532.T', isin: null, mercado: 'Bolsa de Tokio (Prime)', indice_referencia: 'TOPIX',
    pais: 'Japón', pais_iso: 'JP', sector: 'Servicios profesionales', industria: 'Consultoría de gestión y tecnología', sede: 'Tokio', fundacion: '1998', empleados: 8115, web: 'https://www.baycurrent.co.jp',
    precio: PRECIO, fecha_precio: '2026-10-19', acciones: 146.98, capitalizacion_publicada: Math.round(c.cap / 1e6), free_float_pct: null,
    max_52s: PRECIO, min_52s: B.identificacion.min_52s, volumen_medio_diario: `≈ ${Math.round(B.volumen_3m.importe_dia_millones).toLocaleString('es-ES')} M JPY/día (3 meses)`, proximos_resultados: '2027-01-14',
  },
  consenso: {
    guidance: 'Guía de FY2026 (mar-2026 a feb-2027), dada el 14-abr-2026 y confirmada el 15-oct-2026: ingresos de 190.000 M JPY (+28,1 %), EBITDA de 66.500 M (35,0 %), resultado operativo de 64.800 M, beneficio de 48.100 M y BPA de 323,79 JPY; DPA de 130 JPY (65 + 65). La dirección dice que la superará en ingresos y beneficio [6]. Plan a 2030 (15-oct-2026): 500.000 M de ingresos y 200.000 M de EBITDA (40 %) en FY2030, BPA ≈ 1.000 JPY; a 2035, 1 billón de ingresos y margen del 45 % [11].',
    estimaciones: [
      { periodo: 'FY2026e', ingresos: Math.round(t['0y'].ventas / 1e6), ebitda: null, ebit: null, bpa: r2(t['0y'].bpa), dpa: 130, fuente: `Yahoo Finance, ${t['0y'].n} analistas [2]` },
      { periodo: 'FY2027e', ingresos: Math.round(t['+1y'].ventas / 1e6), ebitda: null, ebit: null, bpa: r2(t['+1y'].bpa), dpa: null, fuente: `Yahoo Finance, ${t['+1y'].n} analistas [2]` },
    ],
    recomendaciones: { n_analistas: c.reco.strongBuy + c.reco.buy + c.reco.hold + c.reco.sell + c.reco.strongSell, comprar: c.reco.strongBuy + c.reco.buy, mantener: c.reco.hold, vender: c.reco.sell + c.reco.strongSell, po_medio: Math.round(c.po_medio), po_min: Y['6532.T'].po_min ?? 8000, po_max: Y['6532.T'].po_max ?? 11200 },
    revisiones: `El BPA de FY2026 del consenso subió de ${n2(r2(t['0y'].bpa_hace90))} JPY hace 90 días a ${n2(r2(t['0y'].bpa))} hoy y el de FY2027 de ${n2(r2(t['+1y'].bpa_hace90))} a ${n2(r2(t['+1y'].bpa))} [2]. Los objetivos de precio suben tras los resultados: un gran broker japonés subió el suyo a 11.200 JPY el 19-oct [3]; el objetivo medio de Yahoo es de ${Math.round(c.po_medio).toLocaleString('es-ES')} JPY con ${c.n_analistas} analistas, por debajo del precio [2]. En Minkabu el objetivo medio era de ≈ 7.200 JPY en junio y ≈ 7.800 en julio [10]. Sin consenso gratuito de FY2028.`,
    base_ebitda: 'sin consenso de EBITDA (solo BPA y ventas)', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    ...bol,
    beta: 0.77, posicion_corta_pct: null,
    comentario: 'Acción muy volátil: +164 % desde el mínimo de febrero de 2026 (3.780 JPY) y −57,5 % entre octubre de 2025 y febrero de 2026 [1]. La rentabilidad total ha sido del +60,1 % en el año y del +18,7 % anual a cinco años, frente al +17,8 % del TOPIX [1]. La beta mensual a cinco años frente al ETF del TOPIX sale negativa (−0,13) porque el ETF tiene cierres anómalos; la semanal a cinco años es 0,77 [1]. Volatilidad del 57 % en el último año. Liquidez alta: ≈ 9.565 M JPY negociados al día [1].',
    contexto: {
      movimiento: { fecha: '2026-10-19', var_1m_pct: 46.4, var_3m_pct: 60.0, var_6m_pct: 124.0, var_12m_pct: 26.0, dist_max_52s_pct: 0, dist_min_52s_pct: 184.1, dist_max_historico_pct: 0, tendencia: 'alcista', volatilidad_60d_pct: 53.0, avisos: ['P1', 'P2'] },
      movimientos_fuertes: [
        { periodo: 'oct 2025-feb 2026', var_pct: -57.5, causa: 'Ventas de fondos de cobertura desde el otoño de 2025 y, en febrero de 2026, la «sacudida Anthropic»: las herramientas de agentes de IA (Claude Cowork) hicieron temer que la IA sustituya horas de consultor; caídas del −8 al −14 % en un día (29-ene, 4-feb, 12-feb, 24-feb) [7, 1].', veredicto: 'no cambia', condicion: null },
        { periodo: 'abr 2026', var_pct: -9.7, causa: 'Caída del 23-abr con el sector, tras la guía anual (+28 %) del 14-abr [1, 6].', veredicto: 'no cambia', condicion: null },
        { periodo: 'mar-sep 2026', var_pct: 95.0, causa: 'Recuperación con resultados del 1T por encima del plan, la recompra de 30.000 M (mar-jul) y la entrada de gestoras (Capital, Daiwa, MUFG) [12, 9].', veredicto: 'no cambia', condicion: null },
        { periodo: 'oct 2026', var_pct: 46.4, causa: 'Resultados del 1S (+35,7 % de ingresos) y plan a 2030 del 15-oct: stop-high el 16-oct (+1.500 JPY, +17,3 %) y +5,4 % el 19-oct con subidas de objetivos; antes, servicio de respuesta a ciberincidentes (8-oct) y rebote del sector [3, 11].', veredicto: 'no cambia', condicion: null },
      ],
      noticias: [
        { fecha: '2026-10-19', tipo: 'recomendación', hecho: 'Un gran broker japonés sube el objetivo de 7.500 a 11.200 JPY; el objetivo medio de 13 analistas en Yahoo (9.342) queda por debajo del precio [3, 2].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-15', tipo: 'resultados', hecho: 'Primer semestre: ingresos +35,7 %, beneficio +28,9 %; guía confirmada con la dirección esperando superarla; plan a 2030 (500.000 M de ingresos) y caja objetivo del 25 % de los ingresos [6, 11].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-09-07', tipo: 'deuda o capital', hecho: 'Informes de participaciones significativas: MUFG 5,36 % (7-sep), Daiwa AM 5,27 % (4-sep), Capital 5,06 % (23-jul); Fidelity bajó del 8,21 % al 3,62 % (18-jun) [9].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-08-06', tipo: 'deuda o capital', hecho: 'Fin de la recompra de 30.000 M JPY (5.184.200 acciones a ≈ 5.787 JPY) y amortización el 19-ago [12].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-02-28', tipo: 'directivos', hecho: 'El fundador Arata Eguchi tiene 8,06 M de acciones (5,31 %) frente a 15,56 M un año antes: vendió ≈ 7,5 M en 12 meses; puede seguir vendiendo (≈ 87.000 M JPY al precio de hoy, ≈ 9 sesiones de volumen) [13].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-02-24', tipo: 'otros', hecho: '«Sacudida Anthropic»: las consultoras japonesas caen casi a la mitad desde agosto de 2025 por el miedo a que la IA sustituya consultores; BayCurrent toca 3.780 JPY [7].', veredicto: 'no cambia', condicion: null },
        { fecha: '2025-11-19', tipo: 'directivos', hecho: 'Dimisión por salud del consejero delegado Daisuke Kitakaze, seis meses después de su nombramiento; vuelve Yoshiyuki Abe [3].', veredicto: 'no cambia', condicion: null },
        { fecha: '2027-01-14', tipo: 'resultados', hecho: 'Resultados de los nueve meses hacia mediados de enero de 2027 (el año pasado, 14-ene) [6].', veredicto: 'no cambia', condicion: null },
      ],
      proximos_resultados: '2027-01-14',
      veredicto: 'no cambia',
      condicion: null,
      comentario: 'Saltan dos avisos: P1 (subida fuerte: +39 % en un mes al cierre del 16-oct y ≈ +46 % con el del 19-oct) y P2 (en máximos tras subir un 52 % en tres meses) [8]. La subida tiene causa en hechos de la empresa —un semestre que bate la guía y un plan nuevo— y en la vuelta del sector tras el miedo a la IA de febrero, no en una operación corporativa ni en un rumor [6, 11, 7]. No hay colocaciones, ampliaciones ni litigios con fecha. Las ventas del fundador (5,31 % restante) son un lastre de oferta posible pero sin fecha ni anuncio. Los próximos resultados (mediados de enero) están a casi tres meses. Veredicto: no cambia; los avisos P1 y P2 se tratan con la volatilidad del precio en el escenario bajista, no como causa de espera.',
    },
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: B.cierres_ejercicio.filter((x) => ['FY2020', 'FY2021', 'FY2022', 'FY2023', 'FY2024', 'FY2025'].includes(x.anio)).map((x) => ({ anio: x.anio, precio_cierre: x.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    comentario: 'Precio de cierre de cada ejercicio (último día de febrero) de Yahoo [1]. En base adelantada (cierre ÷ BPA real del año siguiente), BayCurrent cotizó a 21 veces en febrero de 2021, 32 en 2022 y 2023, 17 en 2024, 25,5 en 2025 y ≈ 13-14 en febrero de 2026, el mínimo de la «sacudida Anthropic». Hoy, a ≈ 29 veces el BPA de los próximos 12 meses, está en la parte alta de su historia: el mercado ha pasado en ocho meses de descontar que la IA destruye el negocio a pagar el crecimiento de 2021-2022.',
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Consultoras y servicios de TI japoneses cotizados (NRI, Sigmaxyz, Rise, Future, SHIFT, ULS, Alpha Systems) y las grandes consultoras cotizadas del mundo (Accenture, Capgemini, Booz Allen) [2]. Ninguna es igual: las japonesas son más pequeñas o con más sistemas y menos margen; las extranjeras crecen un 3-6 %. No se incluyen las Big 4 ni Abeam, que no cotizan.',
    empresas: comps,
    comentario: `BayCurrent cotiza a ≈ 29 veces el BPA de los próximos 12 meses frente a una mediana de comparables de ${n2(perMed)} veces [2]. La prima se explica por el crecimiento (≈ 25 % frente al 3-10 % de los demás) y el margen EBITDA (≈ 35 % frente al 10-25 %). Accenture cotiza a ≈ 15 veces con crecimiento del 5 %: el mercado mundial ya descuenta que la IA presiona a las consultoras grandes. NRI, el comparable japonés más líquido, cotiza a ≈ 25 veces.`,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [],
    comentario: 'No hay compras de consultoras comparables con múltiplos publicados en los últimos años en Japón: las operaciones (Mamezo por EQT, consultoras compradas por NTT Data o Accenture) no publican EBITDA. BayCurrent, con ≈ 1,6 billones de JPY de capitalización y sin accionista de control, no es objetivo realista de compra.',
    confianza: 'Baja',
  },
  huecos: [
    { seccion: 'transacciones', campo: 'operaciones con múltiplo publicado', tipo: 'Complemento', intentos: '1) búsqueda de compras de consultoras en Japón (NTT Data, Fuji Soft); 2) Mamezo/EQT (sin múltiplo); 3) informe sectorial de Aventis (10,7 veces global, no una operación concreta)', decision: 'Omitido' },
    { seccion: 'consenso', campo: 'BPA de FY2028e del consenso', tipo: 'Complemento', intentos: '1) Yahoo quoteSummary (dos ejercicios); 2) Minkabu (objetivo medio, sin BPA a tres años); 3) MarketScreener (no abre)', decision: 'Omitido' },
    { seccion: 'bolsa', campo: 'beta fiable frente al TOPIX', tipo: 'Complemento', intentos: '1) 1306.T mensual a 5 años (−0,13, cierres anómalos); 2) 1305.T; 3) semanal a 5 años (0,77)', decision: 'Se usa la semanal (0,77) y en el WACC una beta de 1,0 con prima adicional' },
  ],
  fuentes: fD,
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Foro de BayCurrent (6532) en Yahoo! Finance Japón: mensajes y votos de la semana', editor: 'Yahoo! Finance Japan', tipo: 'Foros y redes', fecha: '2026-10-19', url: 'https://finance.yahoo.co.jp/quote/6532.T/forum' },
  { id: 2, titulo: 'Noticias y comentarios de mercado sobre BayCurrent (stop-high, «se disipa el miedo a la IA»)', editor: 'Kabutan', tipo: 'Foros y redes', fecha: '2026-10-19', url: 'https://kabutan.jp/stock/news?code=6532&page=1' },
  { id: 3, titulo: 'Toyo Keizai: «Consultoras, cotización a la mitad por la sacudida Anthropic»', editor: 'Toyo Keizai', tipo: 'Foros y redes', fecha: '2026-04-17', url: 'https://toyokeizai.net/articles/-/941598' },
];
const E = {
  _estado: 'Completa. Foro de Yahoo! Japón del 19-oct-2026 y prensa económica japonesa de los últimos meses. Reddit y Stocktwits casi no tienen mensajes sobre 6532.',
  sentimiento: {
    tono: 'Positivo', tendencia: 'Mejorando',
    revisadas: [
      { plataforma: 'Yahoo! Finance Japón (foro de 6532)', fecha: '2026-10', n_comentarios: 40, tono: 'Positivo', resumen: 'Votos de la semana: 54 % «comprar fuerte» y 19 % «vender fuerte». Celebran el stop-high y el máximo histórico; los cortos con pérdidas y las posiciones a crédito se comentan mucho; varios recuerdan la caída del 58 % del año pasado y piden prudencia [1].' },
      { plataforma: 'Kabutan (noticias y comentarios)', fecha: '2026-10', n_comentarios: 10, tono: 'Positivo', resumen: '«Se valora el buen resultado y el plan nuevo»; subidas de objetivo; aparece en las listas de máximos históricos y de ruptura de bandas [2].' },
      { plataforma: 'Toyo Keizai (lectores y artículo)', fecha: '2026-04', n_comentarios: 5, tono: 'Negativo', resumen: 'En abril el tono era de miedo: la IA haría innecesarios muchos consultores y los fondos de cobertura vendían el sector [3].' },
    ],
    temas: [
      { tema: 'El miedo a la IA «se ha disipado»', postura: 'Alcista', peso: 'Alto', contraste: 'Los resultados lo apoyan a corto plazo (IA = 50-60 % de los ingresos y ventas +36 %), pero el riesgo de que la IA reduzca las horas facturables no se ha ido: llegará con retraso a los contratos [2].' },
      { tema: 'Plan a 2030 (500.000 M de ingresos)', postura: 'Alcista', peso: 'Alto', contraste: 'Exige un 27 % anual durante cuatro años más; la empresa nunca ha fallado mucho su guía anual, pero el plan incluye compras y extranjero, que no ha hecho nunca.' },
      { tema: 'Cortos y crédito al margen', postura: 'Dividida', peso: 'Medio', contraste: 'Explica parte de la violencia de la subida (stop-high); no dice nada del valor.' },
      { tema: 'Recuerdo de la caída del 58 %', postura: 'Bajista', peso: 'Medio', contraste: 'La volatilidad del 57 % es real: el escenario bajista del informe la recoge.' },
    ],
    lectura: 'El sentimiento ha pasado del miedo de febrero-abril (la IA acabaría con las consultoras) a la euforia de octubre (stop-high, máximos, «el miedo a la IA se ha disipado») [3, 2]. Los particulares del foro japonés votan mayoritariamente comprar y comentan el apuro de los cortos [1]. No hay capitulación que aprovechar; la euforia y la subida del 46 % en un mes piden prudencia con el múltiplo. Opiniones, no datos: ninguna cifra sale de aquí.',
    confianza: 'Media',
  },
  huecos: [],
  fuentes: fE,
};
guarda('E', E);
console.log('Notas A-E escritas. Mediana PER comparables:', perMed, comps.map((x) => `${x.ticker} ${x.per_ntm}`).join(', '));
