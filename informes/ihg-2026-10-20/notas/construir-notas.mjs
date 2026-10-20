// Escribe las notas A-E de InterContinental Hotels Group (corte 2026-10-20) a partir de los documentos de notas/docs
// (notas de resultados de IHG, informe anual y 20-F 2025, 6-K de la SEC), del XBRL de la SEC (cuentas-xbrl.json), de
// bolsa-adr.json (Yahoo, ADR de NYSE: la línea de Londres cotiza en USD solo desde el 2-ene-2026 y Yahoo convierte su
// historia en GBp al cambio de hoy) y de yahoo-datos.json (Yahoo quoteSummary del 20-oct-2026, 10:43 UTC).
// Cada nota cita solo con [n] de su propia lista de fuentes. Ejecutar: node informes/ihg-2026-10-20/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const lee = (f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const r1 = (x) => (x == null ? null : Math.round(x * 10) / 10);
const r2 = (x) => (x == null ? null : Math.round(x * 100) / 100);
const X = lee('cuentas-xbrl.json');
const B = lee('bolsa-adr.json');
const Y = lee('yahoo-datos.json').datos;
const IR = 'https://www.ihgplc.com/~/media/Files/I/Ihg-Plc';
const ED = 'https://www.sec.gov/Archives/edgar/data/858446';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Full Year Results to 31 December 2025 (cuentas, segmentos, medidas no NIIF, flujos, deuda neta)', editor: 'InterContinental Hotels Group PLC', tipo: 'Primaria', fecha: '2026-02-17', url: `${IR}/results/2026/full-year-2025/full-year-results-for-the-year-to-31-dec-2025.pdf` },
  { id: 2, titulo: 'Half Year Results to 30 June 2026 (cuenta, balance, deuda neta, recompras, perspectivas)', editor: 'InterContinental Hotels Group PLC', tipo: 'Primaria', fecha: '2026-08-11', url: `${IR}/results/2026/half-year-results-2026/stock-exchange-announcement.pdf` },
  { id: 3, titulo: 'Annual Report and Form 20-F 2025 (notas, KPI, historial de dividendos, auditor)', editor: 'InterContinental Hotels Group PLC', tipo: 'Primaria', fecha: '2026-02-26', url: `${IR}/investors/annual-report/2025/ihg-ar25-interactive.pdf` },
  { id: 4, titulo: 'Full Year Results to 31 December 2023 (cifras de 2022 y 2023 por segmentos y BPA ajustado)', editor: 'InterContinental Hotels Group PLC', tipo: 'Primaria', fecha: '2024-02-20', url: `${IR}/results/2024/full-year-2023/full-year-results-for-the-year-to-31-dec-2023.pdf` },
  { id: 5, titulo: 'Final results 2021 (cifras de 2020 y 2021: segmentos, interés y BPA ajustados)', editor: 'InterContinental Hotels Group PLC', tipo: 'Primaria', fecha: '2022-02-22', url: `${IR}/results/2022/prelims-2021/stock-exchange-announcement-prelim-2021.pdf` },
  { id: 6, titulo: 'Preliminary results 2019 (cifras de 2018 reexpresadas con NIIF 16 y de 2019)', editor: 'InterContinental Hotels Group PLC', tipo: 'Primaria', fecha: '2020-02-18', url: `${IR}/results/2020/prelims2020/stock-exchange-announcement.pdf` },
  { id: 7, titulo: 'Full investor pack, March 2026 (ingresos y resultado por región 2019-2025, capex, algoritmo de crecimiento)', editor: 'InterContinental Hotels Group PLC', tipo: 'Primaria', fecha: '2026-03-01', url: `${IR}/investors/ihg-full-investor-pack-march-2026.pdf` },
  { id: 8, titulo: 'XBRL company facts de IHG (20-F): balance, flujos y deuda 2016-2025', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-20', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0000858446.json' },
  { id: 9, titulo: 'Transcripción de la presentación y preguntas de los resultados del 1S 2026', editor: 'InterContinental Hotels Group PLC', tipo: 'Primaria', fecha: '2026-08-11', url: `${IR}/results/2026/half-year-results-2026/ihg-hy26-presentation-and-q-a-transcript.pdf` },
  { id: 10, titulo: 'Transcripción de los resultados de 2025', editor: 'InterContinental Hotels Group PLC', tipo: 'Primaria', fecha: '2026-02-17', url: `${IR}/results/2026/full-year-2025/transcript-2025-full-year-results.pdf` },
  { id: 11, titulo: 'Half Year Results to 30 June 2025 (cifras del 1S24 y 1S25)', editor: 'InterContinental Hotels Group PLC', tipo: 'Primaria', fecha: '2025-08-07', url: `${IR}/results/2025/2025-half-year/half-year-results-to-30-june-2025.pdf` },
  { id: 12, titulo: 'Total Voting Rights a 30-sep-2026 (6-K)', editor: 'InterContinental Hotels Group PLC (SEC)', tipo: 'Primaria', fecha: '2026-10-01', url: `${ED}/000165495426008728/a2681x.htm` },
  { id: 13, titulo: 'Q1 2026 Trading Update y transcripción', editor: 'InterContinental Hotels Group PLC', tipo: 'Primaria', fecha: '2026-05-07', url: `${IR}/results/2026/q1-trading-update/stock-exchange-announcement.pdf` },
  { id: 14, titulo: 'Admission to Trading: emisión de bonos de 850 M EUR (6-K)', editor: 'InterContinental Hotels Group PLC (SEC)', tipo: 'Primaria', fecha: '2026-09-28', url: `${ED}/000165495426008593/a6254w.htm` },
];

// Base «resultados de segmentos reportables» (sin Fondo del Sistema, reembolsos ni excepcionales), la que usan la empresa,
// la guía y el consenso. EBITDA = resultado de segmentos + amortizaciones (definición del EBITDA ajustado de IHG).
// Interés e impuesto ajustados y beneficio ajustado de las conciliaciones de cada año [1, 4, 5, 6].
const C = [
  // periodo, ingresos, ebit, amort, interes, impuesto, minor, benef, gfin, bpa, dpa, dpaExtra, acc
  ['2018', 1933, 832, 115, -115, 159, 1, 557, 101, 2.932, 1.144, 2.621, 190],
  ['2019', 2083, 865, 116, -133, 176, 1, 555, 121, 3.033, 0.399, 0, 183],
  ['2020', 992, 219, 110, -130, 32, 0, 57, 144, 0.313, 0, 0, 182],
  ['2021', 1390, 534, 98, -142, 123, 0, 269, 147, 1.470, 0.859, 0, 183],
  ['2022', 1843, 828, 68, -122, 194, 1, 511, 118, 2.823, 1.384, 0, 181],
  ['2023', 2164, 1019, 67, -131, 253, 0, 635, 126, 3.757, 1.523, 0, 169],
  ['2024', 2312, 1124, 65, -165, 262, 0, 697, 178, 4.324, 1.676, 0, 161.2],
  ['2025', 2468, 1265, 67, -200, 290, 1, 774, 202, 5.013, 1.845, 0, 154.4],
];
const cuenta = C.map(([periodo, ingresos, ebit, amortizaciones, rf, impuestos, minoritarios, beneficio_neto, gastos_financieros, bpa, dpa, dpa_extraordinario, acciones_diluidas]) => ({
  periodo, ingresos, coste_ventas: null, gastos_generales: null, ebitda: ebit + amortizaciones, amortizaciones, ebit, resultado_financiero: rf,
  bai: ebit + rf, impuestos, minoritarios, beneficio_neto, gastos_financieros, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null,
  bpa, dpa, dpa_extraordinario, acciones_diluidas,
}));
const anios = C.map((c) => c[0]);
const INTANG = { 2024: 711, 2025: 820 };
const balance = X.balance.historico.filter((b) => anios.includes(b.periodo)).map((b) => {
  const o = { ...b, activos_contrato: null, pasivos_contrato: null, intangibles: INTANG[b.periodo] ?? null };
  delete o.fin; return o;
});
const CAPEX = { 2018: 158, 2019: 179, 2020: 76, 2021: 52, 2022: 99, 2023: 82, 2024: 78, 2025: 77 };
const ARR = { 2018: 35, 2019: 59, 2020: 65, 2021: 32, 2022: 36, 2023: 28, 2024: 46, 2025: 30 };
const ADQ = { 2018: 34, 2019: 292, 2025: 120 };
const DIV = { 2018: 199, 2019: 721, 2020: 0, 2021: 0, 2022: 233, 2023: 245, 2024: 259, 2025: 270 };
const REC = { 2022: 482, 2023: 790, 2024: 804, 2025: 897 };
const flujos = X.flujos.historico.filter((f) => anios.includes(f.periodo)).map((f) => ({
  periodo: f.periodo, flujo_operativo: f.flujo_operativo, capex: CAPEX[f.periodo], pagos_arrendamientos: ARR[f.periodo], adquisiciones: ADQ[f.periodo] ?? 0,
  desinversiones: f.desinversiones ?? 0, dividendos: DIV[f.periodo], recompras: REC[f.periodo] ?? 0, emision_acciones: 0, intereses_en_financiacion: 0,
}));
const trim = (p, ing, g, ebitda, bpa, vs) => ({ periodo: p, ingresos: ing, crecimiento_pct: g, crecimiento_organico_pct: null, ebitda, margen_ebitda_pct: r2(ebitda / ing * 100), bpa, vs_consenso: vs });

const A = {
  _estado: 'Completa. Cuenta en la base de los «segmentos reportables» (sin Fondo del Sistema, reembolsos ni excepcionales), que es la de la guía y el consenso; balance y flujos NIIF del XBRL de la SEC comprobados con las notas de resultados.',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 2548, ebitda: 1392, ebit: 1326, beneficio_neto: 807, bpa: 5.333, dpa: 1.904, dpa_extraordinario: 0, fcf: 951, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [
      { periodo: '2019', descripcion: 'Compra de Six Senses (300 M USD, febrero de 2019) [6].' },
      { periodo: '2025', descripcion: 'Compra de la marca Ruby (120 M USD pagados; marca registrada por 136 M), sin hoteles en propiedad [1].' },
    ],
    comentario: 'Los ingresos de los segmentos reportables pasaron de 2.083 M USD en 2019 a 2.468 M en 2025 (+18 %) y el resultado de 865 a 1.265 M (+46 %): el margen subió del 41,5 % al 51,3 % [6, 1]. 2020 (992 M de ingresos y 219 M de resultado) y 2021 no son comparables por la pandemia [5]. La palanca es el negocio de comisiones: los ingresos por comisiones crecieron un 7 % en 2025 (1.897 M) con los costes del negocio un 3 % más bajos, y el margen de comisiones subió 3,6 puntos, al 64,8 %; en 2024-2025 se sumaron además dos escalones de ingresos auxiliares (≈ 40 M de la nueva tarjeta de crédito de EE. UU. y ≈ 25 M de venta de puntos) [1, 3]. En el 1S26 los ingresos subieron un 7 % (6 % subyacente) y el resultado un 10 %, con un margen de comisiones del 65,9 % (+1,2 puntos) [2]. Hoteles en propiedad o arrendados (544 M de ingresos, 43 M de resultado en 2025) diluyen el margen [7].',
    ajustes: 'La cuenta usa las medidas de la empresa: ingresos y resultado de los segmentos reportables, interés ajustado (sin el interés del Fondo del Sistema) e impuesto y beneficio ajustados [1]. Quedan fuera: el resultado del Fondo del Sistema y reembolsos (−46 M USD en 2025, −83 M en 2024, +19 M en 2023), que se gestiona para cerrar a cero a largo plazo con las aportaciones de los hoteles; los excepcionales (−21 M en 2025, 0 en 2024, +28 M en 2023); las diferencias de cambio intragrupo (+37 M en 2025) y la revalorización del precio aplazado de compras (−8 M) [1, 4]. En NIIF el BPA básico de 2025 fue 490,9 centavos frente a 501,3 del ajustado y los ingresos totales 5.189 M (con 2.721 M del Fondo y reembolsos) [1]. El Fondo pierde en contabilidad cuando crece el programa de fidelidad porque los puntos se cobran antes de reconocer el ingreso: no es un coste para el accionista mientras el saldo de ingresos diferidos siga creciendo [2].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      trim('1S24', 1108, null, 535 + 32, 2.039, null),
      trim('2S24', 1204, null, 589 + 33, 2.285, null),
      trim('1S25', 1175, 6.0, 604 + 33, 2.425, null),
      trim('2S25', 1293, 7.4, 661 + 34, 2.588, 'En línea'),
      trim('1S26', 1255, 6.8, 665 + 32, 2.747, 'Superior'),
    ],
    ultima_presentacion: 'IHG publica semestres y avances de actividad trimestrales; los semestres van en la base de segmentos reportables (EBITDA = resultado + la mitad de la amortización del año, estimación propia; el del 1S26 cuadra con el EBITDA ajustado de 12 meses de 1.392 M) [2, 11, 1]. En los resultados del 1S26 (11-ago-2026) el BPA ajustado subió un 13 %, a 274,7 centavos, el RevPAR global un 4,1 % (Américas +4,8 %, EMEAA +3,0 %, Gran China +3,1 %) y la red neta un 5,0 % [2]. La dirección reiteró que cumplirá el consenso de beneficio de 2026, estrechó el interés ajustado a 230-240 M y mantuvo el aumento de costes del negocio de comisiones en el 1-3 % [2]. Cambio de discurso frente a febrero: EE. UU. pasó de RevPAR negativo en el 3T y 4T25 (−1,6 % y −2,0 %) a +5,2 % en el 2T26, con el Mundial de fútbol aportando ≈ 1 punto al trimestre, mientras Oriente Medio cayó un 19 % en el 2T por el conflicto [1, 2]. Los analistas preguntaron por la sostenibilidad del RevPAR de EE. UU. tras el Mundial, el peso del dinero clave (83 M en el semestre), las bajas de hoteles (1,5 % anual), la IA en reservas y el contrato de alojamiento de la Fuerza Aérea; la dirección no dio guía de RevPAR para 2027 [9]. Próximo dato: avance del 3T el 22-oct-2026 [2].',
    confianza: 'Alta',
  },
  balance: {
    historico: balance,
    vencimientos: [
      { anio: '2026', importe: 470 }, { anio: '2027', importe: 585 }, { anio: '2028', importe: 535 },
      { anio: '2029', importe: 1050 }, { anio: '2030', importe: 990 }, { anio: '2031+', importe: 1400 },
    ],
    liquidez: 'Caja de 825 M USD (798 M netos de descubiertos y caja restringida) y línea de crédito sindicada de 1.500 M sin disponer hasta diciembre de 2030, sin covenants financieros, a 30-jun-2026 [2]. En septiembre de 2026 emitió 850 M EUR de bonos (uno de 350 M al 4,0 % a 2029) y en agosto venció el bono de 350 M GBP [14, 2].',
    rating: 'BBB (S&P) y Baa2 (Moody\'s), deuda sénior no garantizada [2]',
    coste_deuda_pct: 5.5,
    vida_media_anios: 3.8,
    otros_pasivos: 'Ingresos diferidos de 2.258 M USD a 30-jun-2026 (894 M a corto y 1.364 M a largo), sobre todo puntos de IHG One Rewards cobrados a los hoteles y aún no canjeados y cobros anticipados de la tarjeta de crédito de EE. UU.: pertenecen al Fondo del Sistema y se cancelan con estancias, no con caja del accionista [2, 1]. Pensiones: 67 M de obligaciones netas [2]. Planes de remuneración diferida: 337 M de pasivo cubiertos por 337 M de inversiones [2]. Precio contingente de Regent y Ruby y garantías de rendimiento a propietarios de hoteles gestionados (contingentes, pequeñas) [1, 3]. Dividendo a cuenta de 64,5 centavos (≈ 96 M) pagado el 1-oct-2026, posterior al balance [2]. Sin covenants financieros en la línea bancaria [2].',
    comentario: 'El patrimonio es negativo (−2.978 M USD a 30-jun-2026) porque IHG ha devuelto más de lo que gana: 5.000 M en cinco años entre dividendos y recompras, financiados en parte con deuda [2]. No es un problema de solvencia: la deuda neta (3.663 M con arrendamientos) es 2,63 veces el EBITDA ajustado de 12 meses, dentro del objetivo de 2,5-3,0 veces que mantiene el grado de inversión [2]. El circulante comercial (clientes + existencias − proveedores) es pequeño, 162 M en 2025 (6,6 % de los ingresos de segmentos); el Fondo del Sistema financia con sus ingresos diferidos parte del activo de contratos (dinero clave pagado a propietarios, 798 M) [1]. La deuda bruta subió de 3.274 M en 2024 a 4.201 M en 2025 por las recompras [8].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'La conversión es alta: el flujo libre ajustado de la empresa fue de 893 M USD en 2025 (655 M en 2024) frente a un beneficio ajustado de 774 M, y de 2016 a 2025 superó en conjunto el 100 % del beneficio [1, 7]. Ese flujo ya descuenta el dinero clave que IHG paga a propietarios para firmar hoteles (177 M en 2025, 206 M en 2024), que va dentro del flujo operativo y no en la inversión [1]. La inversión del estado de flujos (inmovilizado y software) es de 77 M; la inversión bruta total fue de 269 M (dinero clave 179, mantenimiento 31, reciclable 16 y Fondo del Sistema 43) y la neta de 185 M [1]. Guía: dinero clave y mantenimiento de 200-250 M al año y bruta de hasta 350 M [10]. En 2025 el flujo se usó en recompras (897 M), dividendos (270 M) y la marca Ruby (120 M) [1]. El flujo de 2025 incluye 107 M de ingresos diferidos (74 M de fidelidad y 37 M de la tarjeta) que se repiten mientras el programa crezca [1].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'PricewaterhouseCoopers LLP', anios_auditor: null, opinion: 'Favorable (sin salvedades) sobre las cuentas de 2025, firmada el 16-feb-2026 [3]',
    comentario: 'Las cifras son limpias pero hay que entender tres capas. Primera, el Fondo del Sistema: 2.721 M USD de ingresos y gastos en 2025 que entran en la cuenta NIIF sin ser del accionista; su resultado (−46 M en 2025) se excluye del ajustado y la empresa lo gestiona para cerrar a cero a largo plazo [1, 2]. Segunda, el dinero clave: los pagos a propietarios para firmar se activan como activos de contratos (798 M) y se amortizan restando ingresos (52 M en 2025), así que no aparecen como amortización [1]. Tercera, los excepcionales son pequeños y no recurrentes (21 M en 2025, sobre todo reorganización). El BPA ajustado se separa poco del básico (501,3 frente a 490,9 centavos en 2025) [1]. Los indicadores del motor (Altman, ROE) pierden sentido con patrimonio negativo; el Beneish no se calcula porque la cuenta va en base de segmentos sin coste de ventas.',
    senales: [
      { senal: 'Patrimonio negativo por recompras', nivel: 'Baja', comentario: '−2.741 M USD a fin de 2025 y −2.978 M a junio de 2026: invalida ROE y Altman; la solvencia la da el flujo libre (893 M) y la deuda neta de 2,6 veces el EBITDA [1, 2].' },
      { senal: 'Pérdidas recurrentes del Fondo del Sistema', nivel: 'Media', comentario: '−83 M USD en 2024 y −46 M en 2025, +9 M en el 1S26: si el Fondo no cerrara a cero, el accionista acabaría pagando la diferencia [1, 2].' },
      { senal: 'Dinero clave activado', nivel: 'Media', comentario: '177-206 M USD al año pagados a propietarios; se amortiza contra ingresos (52 M en 2025) y no como gasto: el EBITDA no lo recoge [1].' },
      { senal: 'Ingresos auxiliares con escalones contractuales', nivel: 'Baja', comentario: 'La tarjeta de crédito de EE. UU. y la venta de puntos aportaron ≈ 65 M de mejora en 2025; la empresa dice que su crecimiento se normaliza desde 2026 [2].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Marco declarado en 2024: dividendo ordinario que crece de forma sostenible (+10 % en cada uno de los últimos cuatro años: 184,5 centavos en 2025 y a cuenta de 64,5 en 2026), deuda neta de 2,5-3,0 veces el EBITDA ajustado para el grado de inversión, y devolución del exceso con recompras periódicas: 950 M USD en 2026 (42 % hecho a 30 de junio), tras 900 M en 2025, 800 M en 2024, 750 M en 2023 y 500 M en 2022 [2, 1]. Dinero clave y mantenimiento de 200-250 M anuales [10].',
    adquisiciones: [
      { anio: '2018', objetivo: 'Regent Hotels & Resorts (51 %, resto en 2026)', importe: 39, ev_ebitda: null, financiacion: 'Caja', resultado: 'De 9 hoteles abiertos y en cartera a 25 hoy [2].' },
      { anio: '2019', objetivo: 'Six Senses', importe: 300, ev_ebitda: null, financiacion: 'Caja', resultado: 'De 16 abiertos y 18 en cartera a 27 abiertos y 33 en cartera [6, 2].' },
      { anio: '2025', objetivo: 'Marca Ruby (hoteles urbanos de lujo asequible)', importe: 120, ev_ebitda: null, financiacion: 'Caja', resultado: 'De 30 a 42 hoteles abiertos y en cartera; primeras firmas en Nueva York y Chicago [1, 2].' },
    ],
    comentario: 'La dirección asigna bien el capital en un negocio que casi no lo necesita: en 2021-2025 el resultado de segmentos pasó de 534 a 1.265 M USD con una inversión neta de 185-253 M al año, y las acciones medias bajaron de 183 a 154 M (−16 %) por las recompras [1, 5]. Las compras han sido de marcas, pequeñas y sin deterioros relevantes (Kimpton 2015, Regent, Six Senses, Ruby) [2]. El riesgo es el apalancamiento: devolver más de lo que se gana dejó el patrimonio en −2.978 M y la deuda neta en 2,6 veces el EBITDA, sin margen si llega una recesión del turismo como la de 2020, cuando IHG suspendió el dividendo [2, 5].',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'Américas', descripcion: 'Franquicia (la mayoría) y gestión de hoteles en EE. UU., Canadá y Latinoamérica: Holiday Inn Express, Holiday Inn, Staybridge, Candlewood, Crowne Plaza, Kimpton; incluye hoteles arrendados.', tipo_resultado: 'EBIT', historico: [{ periodo: '2019', ingresos: 1040, resultado: 700 }, { periodo: '2020', ingresos: 512, resultado: 296 }, { periodo: '2021', ingresos: 774, resultado: 559 }, { periodo: '2022', ingresos: 1005, resultado: 761 }, { periodo: '2023', ingresos: 1105, resultado: 815 }, { periodo: '2024', ingresos: 1141, resultado: 828 }, { periodo: '2025', ingresos: 1129, resultado: 836 }] },
      { nombre: 'EMEAA', descripcion: 'Europa, Oriente Medio, Asia (sin China) y África: más gestión y comisiones de incentivo, y hoteles arrendados en Europa.', tipo_resultado: 'EBIT', historico: [{ periodo: '2019', ingresos: 723, resultado: 217 }, { periodo: '2020', ingresos: 221, resultado: -50 }, { periodo: '2021', ingresos: 303, resultado: 5 }, { periodo: '2022', ingresos: 552, resultado: 152 }, { periodo: '2023', ingresos: 677, resultado: 215 }, { periodo: '2024', ingresos: 748, resultado: 270 }, { periodo: '2025', ingresos: 811, resultado: 303 }] },
      { nombre: 'Gran China', descripcion: 'Gestión y franquicia en China continental, Hong Kong, Macao y Taiwán.', tipo_resultado: 'EBIT', historico: [{ periodo: '2019', ingresos: 135, resultado: 73 }, { periodo: '2020', ingresos: 77, resultado: 35 }, { periodo: '2021', ingresos: 116, resultado: 58 }, { periodo: '2022', ingresos: 87, resultado: 23 }, { periodo: '2023', ingresos: 161, resultado: 96 }, { periodo: '2024', ingresos: 161, resultado: 98 }, { periodo: '2025', ingresos: 165, resultado: 99 }] },
      { nombre: 'Central (ingresos auxiliares y gastos centrales)', descripcion: 'Tasas de tecnología, comisiones de la tarjeta de crédito y venta de puntos, menos los gastos centrales.', tipo_resultado: 'EBIT', historico: [{ periodo: '2019', ingresos: 185, resultado: -125 }, { periodo: '2020', ingresos: 182, resultado: -62 }, { periodo: '2021', ingresos: 197, resultado: -88 }, { periodo: '2022', ingresos: 199, resultado: -108 }, { periodo: '2023', ingresos: 200, resultado: -105 }, { periodo: '2024', ingresos: 239, resultado: -66 }, { periodo: '2025', ingresos: 336, resultado: 36 }] },
      { nombre: 'Seguros (cautiva)', descripcion: 'Actividad aseguradora cautiva separada desde la NIIF 17 (antes dentro de Central).', tipo_resultado: 'EBIT', historico: [{ periodo: '2023', ingresos: 21, resultado: -2 }, { periodo: '2024', ingresos: 23, resultado: -6 }, { periodo: '2025', ingresos: 27, resultado: -9 }] },
    ],
    geografias: [{ nombre: 'Américas', peso_pct: 45.7 }, { nombre: 'EMEAA', peso_pct: 32.9 }, { nombre: 'Gran China', peso_pct: 6.7 }, { nombre: 'Central y seguros (global)', peso_pct: 14.7 }],
    geografias_criterio: 'origen',
    kpis: [
      { kpi: 'RevPAR global (variación)', valor_anterior: '+3,0 % (2024)', valor_actual: '+1,5 % (2025); +4,1 % (1S26)', variacion: '−1,5 puntos', comentario: 'EE. UU. −1,6 % y −2,0 % en el 3T y 4T25; +5,2 % en el 2T26 [1, 2].' },
      { kpi: 'Habitaciones en el sistema (miles)', valor_anterior: '≈ 987 (2024)', valor_actual: '1.026 (2025); 1.049 (jun-26)', variacion: '+4,7 % neto ajustado', comentario: '+5,0 % interanual a junio de 2026 [1, 2].' },
      { kpi: 'Cartera de proyectos (miles de habitaciones)', valor_anterior: '≈ 327 (2024)', valor_actual: '340 (2025); 348 (jun-26)', variacion: '+4 %', comentario: '33 % del sistema actual; la mitad en construcción [1, 2].' },
      { kpi: 'Firmas (habitaciones)', valor_anterior: '106.242', valor_actual: '102.054', variacion: '−4 % (+9 % sin Ruby ni NOVUM)', comentario: '49.200 en el 1S26 (+8 % orgánico) [3, 2].' },
      { kpi: 'Margen de comisiones', valor_anterior: '61,2 %', valor_actual: '64,8 %', variacion: '+3,6 puntos', comentario: '65,9 % en el 1S26; objetivo +100-150 pb al año [1, 2].' },
      { kpi: 'Penetración de la fidelidad (noches)', valor_anterior: '66 % (2025)', valor_actual: '≈ 67 % (1S26)', variacion: '+1 punto', comentario: '73 % en EE. UU.; más de 160 M de socios [2, 3].' },
    ],
    clientes: 'IHG cobra a ≈ 7.100 hoteles de terceros: franquicia (73 % de las habitaciones), gestión (27 %) y menos del 1 % en propiedad o arrendamiento [3]. La franquicia paga una comisión sobre los ingresos por habitaciones y la gestión una base más un incentivo sobre el beneficio del hotel; los contratos duran 15-30 años y las bajas son del ≈ 1,5 % del sistema al año [3, 2]. Ningún propietario es relevante por sí solo. El poder de precios se ve en que los hoteles de la marca reciben del sistema de IHG el 83 % de sus ingresos por habitaciones (fidelidad, web, app, ventas) y en que la empresa sube las tasas de tecnología y servicios sin perder firmas (+8 % en el 1S26) [9, 2]. El huésped final paga al hotel, no a IHG: el riesgo de precio lo asume el propietario y llega a IHG vía RevPAR.',
    confianza: 'Alta',
  },
  huecos: [
    { seccion: 'trimestres', campo: 'crecimiento de 1S24 y 2S24', tipo: 'Complemento', intentos: '1) Notas de resultados 1S24/2S24 no descargadas (solo 1S25, que da el 1S24 como comparativo); 2) investor pack de marzo de 2026 (solo anuales); 3) informe anual 2024 no descargado', decision: 'Omitido' },
  ],
  fuentes: fA,
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Annual Report and Form 20-F 2025: industria hotelera (750.000 M USD, 57 % de marca, cinco grandes 24 %), modelo de negocio, riesgos', editor: 'InterContinental Hotels Group PLC', tipo: 'Primaria', fecha: '2026-02-26', url: `${IR}/investors/annual-report/2025/ihg-ar25-interactive.pdf` },
  { id: 2, titulo: 'Half Year Results to 30 June 2026: perspectivas del sector (Oxford Economics, STR, OMT), IA y canales', editor: 'InterContinental Hotels Group PLC', tipo: 'Primaria', fecha: '2026-08-11', url: `${IR}/results/2026/half-year-results-2026/stock-exchange-announcement.pdf` },
  { id: 3, titulo: 'Form 10-K 2025 de Marriott International (XBRL: ingresos y resultado)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-10', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0001048286.json' },
  { id: 4, titulo: 'Form 10-K 2025 de Hilton Worldwide (XBRL)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-06', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0001585689.json' },
  { id: 5, titulo: 'Form 10-K 2025 de Wyndham Hotels & Resorts y de Choice Hotels (XBRL)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-20', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0001722684.json' },
  { id: 6, titulo: 'Document d\'enregistrement universel 2025 de Accor (ESEF)', editor: 'Accor SA (filings.xbrl.org)', tipo: 'Primaria', fecha: '2026-03-20', url: 'https://filings.xbrl.org' },
  { id: 7, titulo: 'Form 10-K 2025 de Airbnb (XBRL)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-13', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0001559720.json' },
  { id: 8, titulo: 'Full investor pack, March 2026 (ingresos de la industria frente al PIB, crecimiento de la oferta, cuotas)', editor: 'InterContinental Hotels Group PLC', tipo: 'Primaria', fecha: '2026-03-01', url: `${IR}/investors/ihg-full-investor-pack-march-2026.pdf` },
  { id: 9, titulo: 'Full Year Results to 31 December 2025 (RevPAR por trimestre y región, EE. UU. y China)', editor: 'InterContinental Hotels Group PLC', tipo: 'Primaria', fecha: '2026-02-17', url: `${IR}/results/2026/full-year-2025/full-year-results-for-the-year-to-31-dec-2025.pdf` },
  { id: 10, titulo: 'Transcripción de los resultados de 2025 (plataforma de contenido para agentes de IA)', editor: 'InterContinental Hotels Group PLC', tipo: 'Primaria', fecha: '2026-02-17', url: `${IR}/results/2026/full-year-2025/transcript-2025-full-year-results.pdf` },
  { id: 11, titulo: 'Final results 2021 (RevPAR de 2020 y 2021 frente a 2019)', editor: 'InterContinental Hotels Group PLC', tipo: 'Primaria', fecha: '2022-02-22', url: `${IR}/results/2022/prelims-2021/stock-exchange-announcement-prelim-2021.pdf` },
];
const B_ = {
  _estado: 'Completa. Tamaño del mercado del informe anual de IHG (con STR) y de la propia serie de ingresos de la industria; competidores con XBRL (SEC y ESEF).',
  sector: {
    definicion: 'Mercado relevante: la industria hotelera mundial, de la que IHG cobra comisiones por marca, distribución y gestión. IHG la cifra en ≈ 750.000 M USD de ingresos, con un 57 % de las habitaciones afiliadas a una cadena y un 24 % en manos de los cinco grandes (IHG, Marriott, Hilton, Wyndham y Accor) según STR [1]. El perímetro útil para la cuota es el de habitaciones: IHG tiene 1,05 M de ≈ 19 M de habitaciones del mundo (≈ 5,5 %, estimación propia con la cuota de los cinco grandes) [1, 2]. Segunda fuente: los ingresos de la industria crecieron un 4,2 % anual de 2000 a 2025 frente al 2,9 % del PIB y superaron al PIB en 19 de 26 años [2, 8]. Por fuera quedan los alquileres turísticos (Airbnb), que compiten por la demanda de ocio.',
    tamano: '≈ 750.000 M USD de ingresos de la industria hotelera mundial en 2025 [1]',
    unidad_serie: 'millones de USD (ingresos de la industria hotelera mundial; 2025 de IHG/STR, resto con el 4,2 % anual histórico y el +3,6 % previsto de noches, estimación propia)',
    serie: [{ anio: '2023', tamano: 690000 }, { anio: '2024', tamano: 720000 }, { anio: '2025', tamano: 750000 }, { anio: '2026e', tamano: 780000 }, { anio: '2027e', tamano: 810000 }, { anio: '2028e', tamano: 845000 }],
    tcac_historico_pct: 4.2, tcac_previsto_pct: 4.0, cr5_pct: 24, estructura: 'Fragmentada',
    drivers: [
      { driver: 'Demanda de viajes (noches de hotel)', efecto: '+', horizonte: 'Estructural', evidencia: 'Noches consumidas +2,7 % anual en 2015-2025 y +3,6 % previsto hasta 2035 (Oxford Economics); EE. UU. +2,4 % y China +4,0 % [2].' },
      { driver: 'Penetración de las marcas', efecto: '+', horizonte: 'Estructural', evidencia: '57 % de las habitaciones de cadena y 79 % de la cartera mundial de proyectos (STR): las marcas ganan cuota de forma continua [1].' },
      { driver: 'Ciclo económico y RevPAR de EE. UU.', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'RevPAR de EE. UU. de IHG −1,6 % y −2,0 % en el 3T y 4T25 y +5,2 % en el 2T26; en 2009 la industria cayó ≈ 17 % y en 2020 IHG −52 % [9, 2, 11].' },
      { driver: 'Oferta nueva', efecto: '+', horizonte: 'Cíclico', evidencia: 'Oferta neta de EE. UU. +0,4 % en 2026 y +0,8 % en 2027 (STR): poca oferta sostiene el RevPAR y las conversiones a marca [2].' },
      { driver: 'China', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'RevPAR de Gran China −1,6 % en 2025 y +3,1 % en el 1S26; aperturas récord (15.200 habitaciones en el 1S26) con comisiones bajas [9, 2].' },
      { driver: 'Geopolítica y viaje internacional', efecto: '−', horizonte: 'Cíclico', evidencia: 'Oriente Medio −19 % de RevPAR en el 2T26 por el conflicto (5 % del sistema de IHG) [2].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Los grandes compiten por firmar propietarios con marcas, fidelidad y dinero clave; IHG paga 177-206 M USD al año en dinero clave [1, 9].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Los propietarios son muchos y pequeños, pero pueden cambiar de bandera al vencer el contrato (bajas del 1,5 % anual) [2].' },
      { fuerza: 'Poder de los proveedores', intensidad: 3, justificacion: 'Las agencias en línea (Booking, Expedia) cobran comisiones altas por la reserva que no llega por el canal propio; la fidelidad (67 % de las noches) lo limita [2].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Hace falta escala de fidelidad y tecnología: los cinco grandes tienen el 24 % del mundo y el 79 % de la cartera es de marca [1].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'Alquileres turísticos (Airbnb: 12.241 M USD de ingresos en 2025) en ocio; agentes de IA que reserven fuera del canal propio [7, 2].' },
    ],
    ciclo: { posicion: 'Madurez del ciclo', comentario: 'El RevPAR mundial creció un 1,5 % en 2025 y un 4,1 % en el 1S26, con EE. UU. saliendo de dos trimestres negativos gracias a una economía más fuerte y al Mundial de fútbol [9, 2]. Es un sector cíclico: en 2009 el RevPAR cayó en torno a un 17 %, en 2020 los ingresos de segmentos de IHG cayeron un 52 % y el resultado un 75 %, y en 2022 la recuperación fue completa [11, 5]. Indicadores para seguir: RevPAR de EE. UU. trimestral, ocupación (+1,0 punto en el 1S26) y oferta nueva (+0,4 % en EE. UU.) [2].' },
    regulacion: 'No hay regulación específica de precios; afectan las normas de franquicia de EE. UU. (FTC), las de comisiones y comparación de precios con las agencias en línea en Europa (Ley de Mercados Digitales, que obliga a Booking a eliminar la paridad de tarifas desde 2024), la fiscalidad de las tarjetas de crédito y del consumidor y las normas laborales en hoteles gestionados (IHG es empleador en los gestionados de EE. UU.) [1]. La reforma fiscal de EE. UU. de 2025 redujo los impuestos pagados en 2025 [9].',
    tendencias: 'Tres tendencias: (1) conversiones de hoteles independientes a marcas (43 % de las aperturas de IHG en el 1S26), que aceleran el crecimiento sin obra nueva [2]; (2) marcas de media gama y estancias largas en EE. UU. (Garner, avid, Atwell) y lujo y estilo de vida, que pagan más comisión por habitación [2]; (3) la IA: buscadores conversacionales y agentes de reserva (Google en modo IA, ChatGPT) que pueden desplazar la búsqueda y la reserva fuera del canal propio. IHG participa en el piloto de reserva con agentes de Google (las reservas siguen siendo directas) y lanzó un complemento para ChatGPT [2, 10].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 5.5, posicion: '4.º grupo hotelero del mundo por habitaciones (1,05 M) tras Marriott, Hilton y Wyndham; líder en media gama alta con Holiday Inn Express (3.300 hoteles) [1, 2]',
    competidores: [
      { nombre: 'Marriott International', pais: 'EE. UU.', ticker: 'MAR', ingresos: 26186, cuota_pct: null, margen_ebit_pct: 15.8, comentario: 'Mayor grupo (≈ 1,7 M de habitaciones); ingresos con reembolsos de costes, por eso el margen NIIF es bajo; mayor peso de lujo [3].' },
      { nombre: 'Hilton Worldwide', pais: 'EE. UU.', ticker: 'HLT', ingresos: 12039, cuota_pct: null, margen_ebit_pct: 22.4, comentario: 'Crecimiento neto de habitaciones del 6-7 % y la mayor prima en bolsa; modelo casi idéntico al de IHG [4].' },
      { nombre: 'Wyndham Hotels & Resorts', pais: 'EE. UU.', ticker: 'WH', ingresos: 1429, cuota_pct: null, margen_ebit_pct: 28.1, comentario: 'Franquicia pura de gama económica; más expuesta al viajero de bajo presupuesto de EE. UU. [5].' },
      { nombre: 'Choice Hotels International', pais: 'EE. UU.', ticker: 'CHH', ingresos: 1597, cuota_pct: null, margen_ebit_pct: 28.1, comentario: 'Franquicia de gama económica y media en EE. UU.; compró Radisson Américas en 2022 [5].' },
      { nombre: 'Accor', pais: 'Francia', ticker: 'AC', ingresos: 6324, cuota_pct: null, margen_ebit_pct: 14.3, comentario: 'Líder en Europa, Oriente Medio y Asia-Pacífico; separa los activos de Ennismore. Ingresos convertidos a 1,1215 USD/EUR (5.639 M EUR) [6].' },
      { nombre: 'Airbnb', pais: 'EE. UU.', ticker: 'ABNB', ingresos: 12241, cuota_pct: null, margen_ebit_pct: 20.8, comentario: 'Sustituto en ocio; empieza a ofrecer hoteles y servicios [7].' },
    ],
    foso: {
      veredicto: 'Amplio', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 4, evidencia: 'IHG One Rewards: más de 160 M de socios y ≈ 67 % de las noches; más hoteles atraen más socios y al revés. El sistema aporta el 83 % de los ingresos por habitaciones del hotel [2].' },
        { fuente: 'Costes de cambio', puntuacion: 4, evidencia: 'Contratos de 15-30 años con penalizaciones y bajas del ≈ 1,5 % anual del sistema [2, 1].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 4, evidencia: '21 marcas, Holiday Inn Express con 3.300 hoteles; firmas récord con propietarios (+8 % en el 1S26) [2].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'La escala reparte tecnología, reservas y fidelidad: costes del negocio de comisiones planos o a la baja (−3 % en 2025) con ingresos +7 % [1].' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'Los cinco grandes tienen el 24 % del mundo y el 79 % de la cartera mundial es de marca: pocos pueden igualar la fidelidad [1].' },
      ],
    },
    amenazas: 'Tres amenazas. La primera, que los agentes de IA (Google, OpenAI) se conviertan en el nuevo intermediario y cobren como una agencia en línea o rompan el vínculo con la fidelidad; IHG lo mitiga con la fidelidad (67 % de las noches) y con acuerdos para que la reserva siga siendo directa, pero la probabilidad a cinco años es media [2]. La segunda, la competencia por firmar propietarios: Hilton crece más deprisa en habitaciones y todos pagan más dinero clave. La tercera, un ciclo malo en EE. UU. (la mitad del sistema y el 66 % del resultado regional) [1].',
    confianza: 'Media',
  },
  huecos: [],
  fuentes: fB,
};
guarda('B', B_);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Annual Report and Form 20-F 2025: consejo, comisiones, remuneración, accionistas significativos', editor: 'InterContinental Hotels Group PLC', tipo: 'Primaria', fecha: '2026-02-26', url: `${IR}/investors/annual-report/2025/ihg-ar25-interactive.pdf` },
  { id: 2, titulo: 'Results of 2026 Annual General Meeting (7-may-2026)', editor: 'InterContinental Hotels Group PLC', tipo: 'Primaria', fecha: '2026-05-07', url: `${IR}/investors/agm/2026/results-of-annual-general-meeting-2026.pdf` },
  { id: 3, titulo: 'Results of 2025 Annual General Meeting (6-K): política de remuneración 69,51 % a favor', editor: 'InterContinental Hotels Group PLC (SEC)', tipo: 'Primaria', fecha: '2025-05-08', url: `${ED}/000165495425005254/a9347h.htm` },
  { id: 4, titulo: 'Director/PDMR Shareholding: compra de ADR de Byron Grote (6-K)', editor: 'InterContinental Hotels Group PLC (SEC)', tipo: 'Primaria', fecha: '2026-09-14', url: `${ED}/000165495426008338/a6669u.htm` },
  { id: 5, titulo: 'Director/PDMR Shareholding: venta de Tejas Katre (6-K)', editor: 'InterContinental Hotels Group PLC (SEC)', tipo: 'Primaria', fecha: '2026-08-18', url: `${ED}/000165495426007715/a1704r.htm` },
  { id: 6, titulo: 'Holding(s) in Company: PineStone (6,99 %), Fiera (2,70 %) y RBC (2,99 %) (6-K)', editor: 'InterContinental Hotels Group PLC (SEC)', tipo: 'Primaria', fecha: '2026-10-16', url: `${ED}/000165495426008975/a3617z.htm` },
  { id: 7, titulo: 'Non-Executive Chair update: baja temporal (21-oct-2025) y vuelta (11-feb-2026) de la presidenta', editor: 'InterContinental Hotels Group PLC (SEC)', tipo: 'Primaria', fecha: '2026-02-11', url: `${ED}/000165495426001101/a5989s.htm` },
  { id: 8, titulo: 'Half Year Results to 30 June 2026 (algoritmo de crecimiento y su cumplimiento)', editor: 'InterContinental Hotels Group PLC', tipo: 'Primaria', fecha: '2026-08-11', url: `${IR}/results/2026/half-year-results-2026/stock-exchange-announcement.pdf` },
  { id: 9, titulo: 'Full Year Results to 31 December 2025', editor: 'InterContinental Hotels Group PLC', tipo: 'Primaria', fecha: '2026-02-17', url: `${IR}/results/2026/full-year-2025/full-year-results-for-the-year-to-31-dec-2025.pdf` },
  { id: 10, titulo: 'Non-Executive Director Appointment: Nicholas Cadbury (6-K)', editor: 'InterContinental Hotels Group PLC (SEC)', tipo: 'Primaria', fecha: '2025-12-15', url: `${ED}/000165495425013939/a5638l.htm` },
  { id: 11, titulo: 'Holding(s) in Company: PineStone 6,99 % (6-K, 15-sep-2026) y Fiera 2,70 % (18-sep-2026)', editor: 'InterContinental Hotels Group PLC (SEC)', tipo: 'Primaria', fecha: '2026-09-18', url: `${ED}/000165495426008458/a4573v.htm` },
];
const C_ = {
  _estado: 'Completa. Consejo y remuneración del informe anual 2025; votos de las juntas de 2025 y 2026; operaciones de directivos de los 6-K (emisor extranjero: sin Form 4).',
  directivos: {
    equipo: [
      { nombre: 'Elie Maalouf', cargo: 'Consejero delegado', desde: '2023', participacion_pct: 0.11, trayectoria: 'Consejero delegado de Américas de 2015 a 2023 y en el consejo desde 2018; antes presidente de HMSHost. Con él el BPA ajustado subió de 375,7 centavos (2023) a 501,3 (2025) y el margen de comisiones de 59,3 % a 64,8 % [1, 9]. Participación estimada con su tenencia de 1.843 % del salario en acciones propias (≈ 160.000 acciones; estimación propia).' },
      { nombre: 'Michael Glover', cargo: 'Director financiero', desde: '2023', participacion_pct: null, trayectoria: 'En IHG desde 2012 (finanzas de Américas y control); consejero desde marzo de 2023. Ha llevado el apalancamiento al objetivo de 2,5-3,0 veces con recompras de 900-950 M al año [1, 8].' },
      { nombre: 'Deanna Oppenheimer', cargo: 'Presidenta no ejecutiva', desde: '2022', participacion_pct: null, trayectoria: 'Ex directiva de Barclays y Washington Mutual; presidenta desde junio de 2022. Baja médica de octubre de 2025 a febrero de 2026, con Graham Allan de presidente en funciones [1, 7].' },
      { nombre: 'Jolyon Bulley', cargo: 'Consejero delegado de Américas', desde: '2023', participacion_pct: null, trayectoria: 'Antes consejero delegado de Gran China; responsable de la región que da el 66 % del resultado regional [1].' },
      { nombre: 'Kenneth Macpherson', cargo: 'Consejero delegado de EMEAA', desde: '2019', participacion_pct: null, trayectoria: 'Antes en Rentokil y Sedexo; EMEAA pasó de 217 M USD de resultado en 2019 a 303 M en 2025 [1].' },
    ],
    historial_guidance: [
      { anio: '2024', guia: 'Algoritmo de 2024: BPA ajustado +12-15 % anual de media; comisiones +un dígito alto; margen de comisiones +100-150 pb', real: 'BPA +15 % (432,4 centavos); margen +190 pb (61,2 %)', cumplida: 'Sí' },
      { anio: '2025', guia: 'Mismo algoritmo; costes del negocio de comisiones planos o a la baja', real: 'BPA +16 % (501,3); margen +360 pb; costes −3 %', cumplida: 'Sí' },
      { anio: '2026', guia: 'Cumplir el consenso de beneficio (1.401 M de resultado de segmentos); interés ajustado 230-240 M; costes +1-3 %', real: '1S26: resultado +10 %, BPA +13 %; guía reiterada en agosto', cumplida: 'Parcial' },
      { anio: '2023', guia: 'Recuperar el nivel de 2019 y seguir con recompras de 750 M', real: 'Resultado de segmentos 1.019 M (+18 % sobre 2019); BPA 375,7 centavos', cumplida: 'Sí' },
    ],
    comentario: 'Equipo estable y creíble: el algoritmo publicado en 2024 se ha cumplido o superado dos años seguidos (BPA +15 % y +16 % frente al +12-15 %) [9, 8]. Maalouf y Glover llevan desde 2023 y la mayoría de la dirección viene de dentro. Riesgo de sucesión menor: la presidenta estuvo de baja médica cuatro meses y Sir Ron Kalifa dejó el consejo en mayo de 2026 [7, 2]. El consejo incorporó a Nicholas Cadbury (finanzas de IAG y ex Whitbread) en marzo de 2026 [10].',
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      { nombre: 'Deanna Oppenheimer', cargo: 'Presidenta', tipo: 'Independiente', desde: '2022', comisiones: 'Nombramientos (presidenta), Remuneración' },
      { nombre: 'Elie Maalouf', cargo: 'Consejero delegado', tipo: 'Ejecutivo', desde: '2018', comisiones: '—' },
      { nombre: 'Michael Glover', cargo: 'Director financiero', tipo: 'Ejecutivo', desde: '2023', comisiones: '—' },
      { nombre: 'Graham Allan', cargo: 'Consejero independiente sénior', tipo: 'Independiente', desde: '2020', comisiones: 'Auditoría, Nombramientos, Negocio responsable' },
      { nombre: 'Arthur de Haast', cargo: 'Consejero', tipo: 'Independiente', desde: '2020', comisiones: 'Auditoría, Negocio responsable' },
      { nombre: 'Duriya Farooqui', cargo: 'Consejera', tipo: 'Independiente', desde: '2020', comisiones: 'Auditoría, Negocio responsable, voz del empleado' },
      { nombre: 'Byron Grote', cargo: 'Consejero', tipo: 'Independiente', desde: '2022', comisiones: 'Auditoría, Nombramientos, Remuneración' },
      { nombre: 'Angie Risley', cargo: 'Consejera', tipo: 'Independiente', desde: '2023', comisiones: 'Remuneración (presidenta), Nombramientos, Negocio responsable' },
      { nombre: 'Sharon Rothstein', cargo: 'Consejera', tipo: 'Independiente', desde: '2020', comisiones: 'Remuneración, Negocio responsable' },
      { nombre: 'Nicholas Cadbury', cargo: 'Consejero', tipo: 'Independiente', desde: '2026', comisiones: 'Auditoría, Negocio responsable' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: true, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 69.51, voto_remuneracion_contra_pct: 30.49, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 13.87, fijo: 2.17, variable_corto: 2.50, variable_largo: 9.19, ratio_salario_medio: 214 },
    remuneracion: 'Remuneración total del consejero delegado en 2025: 10,317 M GBP (13,87 M USD a 1,345 USD/GBP de media de 2025, conversión propia): salario de 1,082 M, beneficios y pensión 0,533 M, bonus anual de 1,863 M (169,3 % del salario) y plan a largo plazo de 6,839 M [1]. El plan a largo plazo mide el crecimiento del BPA ajustado, el flujo libre, el crecimiento del sistema y la rentabilidad total para el accionista frente a un grupo de comparables globales [1]. La política de 2025 subió la cuantía y el grupo de comparables pasó a ser global (Marriott, Hilton): obtuvo solo el 69,51 % de votos a favor (30,49 % en contra) y el informe de remuneración el 79,0 %, ambos por debajo del 80 % del Código británico, lo que obligó a consultar a los accionistas [3, 1]. En 2026 el informe obtuvo el 94,50 % y la presidenta de la comisión, Angie Risley, solo el 80,12 % en su reelección [2]. Hay recuperación (malus y clawback) y una tenencia mínima de acciones del 1.000 % del salario [1]. Ratio con el empleado mediano: 214 a 1 [1].',
    accionistas: [
      { nombre: 'PineStone Asset Management', pct: 6.99, tipo: 'Institucional', variacion: 'Baja del 7,93 % al 6,99 % (11-sep-2026) [11]' },
      { nombre: 'BlackRock', pct: 6.14, tipo: 'Institucional', variacion: 'Sin cambios notificados desde 2024 [1]' },
      { nombre: 'Boron Investments B.V.', pct: 5.01, tipo: 'Institucional', variacion: 'Sin cambios notificados [1]' },
      { nombre: 'FMR (Fidelity)', pct: 5.01, tipo: 'Institucional', variacion: 'Entró en 2025 [1]' },
      { nombre: 'The Capital Group', pct: 4.90, tipo: 'Institucional', variacion: 'Baja del 5,12 % al 4,90 % [1]' },
      { nombre: 'Royal Bank of Canada (gestoras)', pct: 2.99, tipo: 'Institucional', variacion: 'Baja del 3,88 % al 2,99 % (9-oct-2026) [6]' },
      { nombre: 'Autocartera', pct: 3.56, tipo: 'Autocartera', variacion: '5,43 M de acciones de 152,6 M emitidas a 30-sep-2026 [6]' },
    ],
    insiders: [
      { fecha: '2026-09-11', persona: 'Byron Grote (consejero)', operacion: 'Compra', acciones: 250, importe: 0.04 },
      { fecha: '2026-08-14', persona: 'Tejas Katre (directora de personas)', operacion: 'Venta', acciones: 804, importe: 0.13 },
    ],
    control_y_defensas: 'Sin accionista de control: el mayor (PineStone) tiene el 6,99 % y los seis primeros notificados suman ≈ 31 % [11, 1]. Una acción, un voto; sin blindajes ni límites de voto. Cotiza en Londres (FTSE 100) y en Nueva York con ADR 1:1. Operaciones vinculadas no relevantes. La autorización de recompra de la junta de 2026 obtuvo el 99,88 % [2].',
    alertas: [
      'Política de remuneración de 2025 aprobada con solo el 69,51 % y el informe con el 79,0 %; en 2026 la presidenta de la comisión de remuneración, reelegida con el 80,12 % [3, 2].',
      'Baja médica de la presidenta de octubre de 2025 a febrero de 2026 y salida de Sir Ron Kalifa del consejo en mayo de 2026 [7, 2].',
    ],
    confianza: 'Alta',
  },
  huecos: [
    { seccion: 'gobierno', campo: 'anios_auditor (fecha de nombramiento de PwC)', tipo: 'Complemento', intentos: '1) Informe anual 2025, informe de la comisión de auditoría (grep «appointed», «tender»): no da el año; 2) 20-F Item 16C: no descargado aparte; 3) búsqueda en las notas de resultados: sin dato', decision: 'Omitido' },
  ],
  fuentes: fC,
};
guarda('C', C_);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de Yahoo Finance: IHG (ADR, NYSE), IHG.L (Londres, en USD desde el 2-ene-2026), ACWI y PEJ', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/IHG.L' },
  { id: 2, titulo: 'Analyst consensus and coverage (consenso recopilado por la empresa, 16 analistas, 15-oct-2026)', editor: 'InterContinental Hotels Group PLC', tipo: 'Analistas', fecha: '2026-10-15', url: 'https://www.ihgplc.com/en/investors/analyst-consensus' },
  { id: 3, titulo: 'InterContinental Hotels Group: estimaciones 2026-2028 y objetivo medio (16 analistas)', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-20', url: 'https://www.marketscreener.com/quote/stock/INTERCONTINENTAL-HOTELS-G-50387540/finances/' },
  { id: 4, titulo: 'Yahoo Finance quoteSummary de IHG y comparables (precio, capitalización, valor empresa, EBITDA, PER adelantado, recomendaciones)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://query2.finance.yahoo.com/v10/finance/quoteSummary/IHG.L' },
  { id: 5, titulo: 'Change in trading currency of IHG\'s Ordinary Shares to US Dollars', editor: 'InterContinental Hotels Group PLC', tipo: 'Primaria', fecha: '2025-12-17', url: `${IR}/investors/change-in-trading-currency-of-ihgs-ordinary-shares-to-us-dollars.pdf` },
  { id: 6, titulo: 'Total Voting Rights a 30-sep-2026 (147.161.314 derechos de voto)', editor: 'InterContinental Hotels Group PLC (SEC)', tipo: 'Primaria', fecha: '2026-10-01', url: `${ED}/000165495426008728/a2681x.htm` },
  { id: 7, titulo: 'Half Year Results to 30 June 2026 (deuda neta, acciones diluidas medias)', editor: 'InterContinental Hotels Group PLC', tipo: 'Primaria', fecha: '2026-08-11', url: `${IR}/results/2026/half-year-results-2026/stock-exchange-announcement.pdf` },
  { id: 8, titulo: 'Form 8-K de Choice Hotels: compra de Radisson Hotels Americas (675 M USD)', editor: 'Choice Hotels International (SEC)', tipo: 'Primaria', fecha: '2022-06-13', url: 'https://www.sec.gov/Archives/edgar/data/1046311/000119312522172398/d358861dex991.htm' },
  { id: 9, titulo: 'Hyatt to Acquire Apple Leisure Group (2.700 M USD)', editor: 'Business Wire', tipo: 'Prensa', fecha: '2021-08-15', url: 'https://www.businesswire.com/news/home/20210815005011/en/Hyatt-to-Acquire-Apple-Leisure-Group-Expanding-Global-Brand-Presence-in-Luxury-Leisure-Travel' },
  { id: 10, titulo: 'Preliminary results 2019 (compra de Six Senses por 300 M USD)', editor: 'InterContinental Hotels Group PLC', tipo: 'Primaria', fecha: '2020-02-18', url: `${IR}/results/2020/prelims2020/stock-exchange-announcement.pdf` },
  { id: 11, titulo: 'Full Year Results to 31 December 2025 (compra de Ruby por 120 M USD)', editor: 'InterContinental Hotels Group PLC', tipo: 'Primaria', fecha: '2026-02-17', url: `${IR}/results/2026/full-year-2025/full-year-results-for-the-year-to-31-dec-2025.pdf` },
  { id: 12, titulo: 'Daily Treasury Par Yield Curve Rates 2026 (10 años: 5,15 % el 19-oct-2026)', editor: 'U.S. Department of the Treasury', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/daily-treasury-rates.csv/2026/all?type=daily_treasury_yield_curve' },
  { id: 13, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026: 4,20 %', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10-01', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 14, titulo: 'Zacks Research rebaja IHG a «strong sell» (28-jul-2026)', editor: 'MarketBeat', tipo: 'Prensa', fecha: '2026-07-30', url: 'https://www.marketbeat.com/instant-alerts/intercontinental-hotels-group-nyseihg-downgraded-to-strong-sell-rating-by-zacks-research-2026-07-30/' },
  { id: 15, titulo: 'Stocktwits IHG: UBS sube a Comprar con objetivo de 188 USD (2-sep-2026); Jefferies a Comprar (dic-2025)', editor: 'Stocktwits (titulares de Briefing.com)', tipo: 'Prensa', fecha: '2026-09-02', url: 'https://api.stocktwits.com/api/2/streams/symbol/IHG.json' },
  { id: 16, titulo: 'Seeking Alpha: «Cruise operators, airlines, and hotels fall on renewed geopolitical tensions» (8-jul-2026) y «Travel stocks move higher as oil tumbles on US-Iran deal talks» (6-may-2026)', editor: 'Seeking Alpha', tipo: 'Prensa', fecha: '2026-07-08', url: 'https://seekingalpha.com/api/sa/combined/IHG.xml' },
  { id: 17, titulo: '2026 Q3 Trading Update Webcast and Q&A (22-oct-2026)', editor: 'InterContinental Hotels Group PLC', tipo: 'Primaria', fecha: '2026-10-01', url: `${IR}/results/2026/q3-trading-update/2026-q3-trading-update-webcast-and-q-and-a.pdf` },
  { id: 18, titulo: 'Holding(s) in Company: PineStone 6,99 %, RBC 2,99 % (6-K)', editor: 'InterContinental Hotels Group PLC (SEC)', tipo: 'Primaria', fecha: '2026-10-16', url: `${ED}/000165495426008975/a3617z.htm` },
  { id: 19, titulo: 'Director/PDMR Shareholding: compra de ADR de Byron Grote (14-sep) y venta de Tejas Katre (18-ago) (6-K)', editor: 'InterContinental Hotels Group PLC (SEC)', tipo: 'Primaria', fecha: '2026-09-14', url: `${ED}/000165495426008338/a6669u.htm` },
];
const EURUSD = 1.1215, USDCNY = 6.6664;
const conv = (t, x) => (x == null ? null : Y[t].divisa === 'EUR' ? x * EURUSD : Y[t].divisa === 'CNY' ? x / USDCNY : x);
const comp = (t, nombre, pais) => {
  const d = Y[t]; const tr0 = d.trend.find((x) => x.periodo === '0y'); const tr1 = d.trend.find((x) => x.periodo === '+1y');
  return {
    nombre, ticker: t, pais, capitalizacion: Math.round(conv(t, d.cap) / 1e6), ev_ventas: r2(d.ev / d.ventas), ev_ebitda_ltm: r1(d.ev / d.ebitda), ev_ebitda_ntm: null,
    per_ntm: r1(d.per_adelantado), crecimiento_pct: tr0?.ventas && tr1?.ventas ? r1((tr1.ventas / tr0.ventas - 1) * 100) : null,
    margen_ebitda_pct: r1(d.ebitda / d.ventas * 100), roic_pct: null, dn_ebitda: r1((d.deuda - d.caja) / d.ebitda), fcf_yield_pct: d.fcf != null ? r1(d.fcf / d.cap * 100) : null,
  };
};
const empresas = [
  comp('MAR', 'Marriott International', 'US'), comp('HLT', 'Hilton Worldwide', 'US'), comp('H', 'Hyatt Hotels', 'US'),
  comp('WH', 'Wyndham Hotels & Resorts', 'US'), comp('CHH', 'Choice Hotels', 'US'), comp('AC.PA', 'Accor', 'FR'),
  comp('HTHT', 'H World Group', 'CN'), comp('600754.SS', 'Jin Jiang Hotels', 'CN'), comp('MEL.MC', 'Meliá Hotels', 'ES'),
];
const pers = empresas.map((e) => e.per_ntm).filter((x) => x != null).sort((a, b) => a - b);
const perMed = pers.length % 2 ? pers[(pers.length - 1) / 2] : (pers[pers.length / 2 - 1] + pers[pers.length / 2]) / 2;
const bolsa = B.bolsa;
const D = {
  _estado: 'Completa. Precio de la línea de Londres (en USD desde el 2-ene-2026) al cierre del 19-oct-2026; historia con el ADR de NYSE (1:1, en USD) porque Yahoo convierte la serie antigua de Londres en GBp al cambio de hoy.',
  _per_mediana_comparables: r1(perMed),
  identificacion: {
    nombre: 'InterContinental Hotels Group PLC', nombre_corto: 'IHG', ticker: 'IHG (LSE)', isin: 'GB00BHJYC057', mercado: 'London Stock Exchange (en USD desde el 2-ene-2026); ADR 1:1 en NYSE', indice_referencia: 'FTSE 100',
    pais: 'Reino Unido', pais_iso: 'GB', sector: 'Consumo discrecional (GICS)', industria: 'Hoteles, complejos y cruceros', sede: 'Windsor (Reino Unido)', fundacion: '2003', empleados: null, web: 'www.ihgplc.com',
    precio: 167.75, fecha_precio: '2026-10-19', acciones: 148.3, capitalizacion_publicada: Math.round(Y['IHG.L'].cap / 1e6), free_float_pct: 99.9,
    max_52s: B.identificacion.max_52s, min_52s: B.identificacion.min_52s, volumen_medio_diario: '≈ 58 M USD/día en Londres y ≈ 34 M USD/día en el ADR (3 meses)', proximos_resultados: '2026-10-22',
  },
  consenso: {
    guidance: 'Sin guía numérica de beneficio: la empresa dice que cumplirá el consenso de beneficio y BPA de 2026 (reiterado el 11-ago-2026) y da partidas: costes del negocio de comisiones +1-3 %, interés ajustado de 230-240 M USD (estrechado en agosto), tipo ajustado del 26-27 %, dinero clave y mantenimiento de 200-250 M y recompra de 950 M en 2026 [7]. A medio plazo, el algoritmo de 2024: ingresos por comisiones +un dígito alto al año, margen de comisiones +100-150 pb al año, conversión del ≈ 100 % del beneficio en flujo libre y BPA ajustado +12-15 % anual de media [7]. Próximo dato: avance del 3T el 22-oct-2026 [17].',
    estimaciones: [
      { periodo: '2026e', ingresos: 2642, ebitda: 1471, ebit: 1401, bpa: 5.79, dpa: 2.09, fuente: 'Consenso recopilado por IHG, 16 analistas, 15-oct-2026 [2]' },
      { periodo: '2027e', ingresos: 2799, ebitda: 1599, ebit: 1524, bpa: 6.56, dpa: 2.35, fuente: 'Consenso recopilado por IHG, 16 analistas, 15-oct-2026 [2]' },
      { periodo: '2028e', ingresos: 2945, ebitda: 1723, ebit: 1638, bpa: 7.34, dpa: 2.64, fuente: 'MarketScreener, 16 analistas [3]' },
    ],
    recomendaciones: { n_analistas: 16, comprar: 9, mantener: 4, vender: 3, po_medio: 164.67, po_min: 120, po_max: 195 },
    revisiones: 'El consenso de BPA de 2026 recopilado por la empresa subió de 566 centavos (14-ene-2026, 15 analistas) a 579 (15-oct-2026) y el resultado de segmentos de 1.370 a 1.401 M USD (+2 %) [2]. En 3 meses (Yahoo) el BPA de 2026 pasó de 5,71 a 5,77 USD y el de 2027 de 6,46 a 6,53 (+1 %) [4]. Las subidas vienen del RevPAR de EE. UU. del 2T y de la mejora del margen; el objetivo medio (164,67 USD en Yahoo y MarketScreener) está un 2 % por debajo del precio, con una horquilla de 120-195 [4, 3]. Cambios recientes: UBS a Comprar con 188 USD (2-sep-2026), Bernstein mantiene Mantener (23-sep), Zacks a «strong sell» (28-jul) [15, 14].',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Alta',
  },
  bolsa: {
    tipo_rentabilidad: bolsa.tipo_rentabilidad, rentabilidades: bolsa.rentabilidades, anual: bolsa.anual,
    beta: bolsa.beta, volatilidad_pct: bolsa.volatilidad_pct, max_drawdown_pct: bolsa.max_drawdown_pct, posicion_corta_pct: null,
    comentario: 'Rentabilidades del ADR en USD frente al MSCI ACWI (ACWI) y al sector ocio de EE. UU. (PEJ), con dividendos [1]. IHG ha batido al mundo en 3, 5 y 10 años (35,5 %, 21,5 % y 16,6 % anual frente a 22,5 %, 10,5 % y 12,5 %): pasó de 91 USD a fin de 2023 a 168,92 por la subida del BPA (+33 % en 2025 sobre 2023) y del múltiplo [1]. En 12 meses sube un 42,2 % frente al 14,7 % del ACWI, con dos tramos: +30 % de abril a junio de 2026 (aceleración del RevPAR de EE. UU., Mundial y avance del 1T) y −10 % en julio [1]. La línea de Londres cotiza en USD desde el 2-ene-2026 [5]; su historia anterior en Yahoo está convertida al cambio de hoy y no se usa.',
    contexto: {
      movimiento: { fecha: '2026-10-20', var_1m_pct: 8.9, var_3m_pct: 7.7, var_6m_pct: 18.9, var_12m_pct: 37.9, dist_max_52s_pct: -3.0, dist_min_52s_pct: 35.4, dist_max_historico_pct: -3.0, tendencia: 'alcista', volatilidad_60d_pct: 22.0, avisos: [] },
      movimientos_fuertes: [
        { periodo: 'feb-mar 2026', var_pct: -11.0, causa: 'Caída con el mercado y con todo el sector de viajes por el conflicto de Oriente Medio y el petróleo; los resultados de 2025 (17-feb) batieron y anunciaron 950 M USD de recompra; sin hecho propio negativo [1, 16].', veredicto: 'no cambia', condicion: null },
        { periodo: 'abr-jun 2026', var_pct: 30.0, causa: 'Alza general del 8-abr (+7 %, ACWI +3,2 %), avance del 1T con RevPAR de EE. UU. mejor de lo temido (7-may), conversaciones EE. UU.-Irán que bajaron el petróleo (6-may) y el Mundial de fútbol en EE. UU.; mayor subida de un mes +14,3 % (17-jun) [13, 16, 1].', veredicto: 'no cambia', condicion: null },
        { periodo: 'jul 2026', var_pct: -10.7, causa: 'Caída de los valores de viajes por tensiones geopolíticas (8-jul) y rebaja de Zacks a «strong sell» (28-jul); IHG cayó más que Marriott e Hilton (−1 a −5 %) ante el temor a un 2S más flojo en EE. UU.; los resultados del 1S (11-ago) batieron y la caída se recuperó [16, 14, 7].', veredicto: 'no cambia', condicion: null },
      ],
      noticias: [
        { fecha: '2026-10-22', tipo: 'resultados', hecho: 'Avance del 3T (RevPAR, aperturas, recompras) el 22-oct-2026 a las 7:00 de Londres; sin cuenta de resultados [17].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-16', tipo: 'accionista de referencia', hecho: 'Avisos de participaciones: PineStone 6,99 %, RBC 2,99 % y Fiera 2,70 %; son gestoras con cambios pequeños por encima y por debajo de los umbrales, sin colocación anunciada ni probable [18].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-09-28', tipo: 'ampliación o convertible', hecho: 'Emisión de bonos de 850 M EUR para refinanciar vencimientos; deuda ordinaria, sin acciones ni convertibles [14].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-09-23', tipo: 'recomendación', hecho: 'UBS sube a Comprar con objetivo de 188 USD (2-sep); Bernstein mantiene Mantener (23-sep); Jefferies en Comprar desde dic-2025; objetivo medio de 16 analistas 164,67 USD, un 2 % bajo el precio [15, 4].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-09-14', tipo: 'directivos', hecho: 'El consejero Byron Grote compra ADR; en agosto vendió acciones Tejas Katre (directivo) tras la entrega de acciones por objetivos: importes pequeños, sin señal [19].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-08-11', tipo: 'resultados', hecho: 'Resultados del 1S 2026: BPA ajustado de 2,747 USD (+13 %), RevPAR mundial +4,1 %, recompra de 950 M en curso y cumplimiento del consenso del año reiterado [7].', veredicto: 'no cambia', condicion: null },
      ],
      proximos_resultados: '2026-10-22',
      veredicto: 'no cambia',
      condicion: null,
      comentario: 'La acción está a un 3 % de su máximo de cinco años, en tendencia alcista (11 % sobre la media de 200 sesiones), tras subir un 38 % en 12 meses; la herramienta no da avisos P [1]. Las tres subidas y bajadas fuertes tienen causa conocida: el ciclo de viajes, la geopolítica y el petróleo, y resultados que baten; ninguna viene de un hecho propio pendiente. No hay colocaciones, ampliaciones, ofertas ni litigios abiertos: el bono de 850 M EUR es deuda ordinaria y los avisos de participación son de gestoras. El avance del 3T del 22-oct puede mover el precio, pero los resultados cercanos no aplazan una decisión (regla 11). Veredicto: no cambia.',
    },
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: [
      { anio: '2018', precio_cierre: 57.52, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2019', precio_cierre: 68.67, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2020', precio_cierre: 65.12, ev_ebitda_ntm: null, per_ntm: null, excluir: true },
      { anio: '2021', precio_cierre: 65.21, ev_ebitda_ntm: null, per_ntm: null, excluir: true },
      { anio: '2022', precio_cierre: 58.34, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2023', precio_cierre: 91.18, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2024', precio_cierre: 124.92, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2025', precio_cierre: 140.83, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
    ],
    comentario: 'Cierres del ADR de NYSE (1:1 con la acción, en USD) [1]. Se excluyen 2020 y 2021: el beneficio hundido por la pandemia da PER de más de 40 veces que no dicen nada. El cierre de 2018 es anterior a la consolidación de acciones y al dividendo extraordinario de 262,1 centavos pagado en enero de 2019; el efecto neto en el precio comparable es menor del 1 % (estimación propia). IHG cotiza hoy por encima de su mediana histórica: la acción ha subido más que el beneficio desde 2023, porque el mercado paga ya el algoritmo de crecimiento (BPA +12-15 % anual) y la recompra del 4-5 % del capital al año, como hace con Hilton y Marriott.',
    confianza: 'Alta',
  },
  comparables: {
    criterio: 'Grupos hoteleros cotizados que cobran comisiones de marca, franquicia o gestión: Marriott, Hilton y Hyatt (los más parecidos en modelo y mezcla), Wyndham y Choice (franquicia pura de gama económica en EE. UU.), Accor (Europa y Oriente Medio), H World y Jin Jiang (China) y Meliá (más propietaria). Cifras de Yahoo del 20-oct-2026 en USD (EUR a 1,1215 y CNY a 6,6664) [4]. Ojo: Marriott, Hilton e Hyatt incluyen en sus ingresos los reembolsos de costes de los hoteles, así que su EV/ventas y su margen no son comparables con los de IHG en base de segmentos; Airbnb queda fuera (otro modelo).',
    empresas,
    comentario: `La mediana del PER de los próximos 12 meses es de ${String(r1(perMed)).replace('.', ',')} veces, pero la muestra tiene dos grupos: los tres grandes de EE. UU. (Marriott 29,7, Hilton 33,2 e Hyatt 35,5 veces) y el resto, con más propiedad inmobiliaria, más gama económica o más China (12,7-17,1 veces) [4]. IHG, a ≈ 26 veces su BPA de los próximos 12 meses, cotiza con descuento frente a Marriott y Hilton y con prima frente al resto: su modelo es el de los primeros (98 % de comisiones, margen de comisiones del 65 %, crecimiento del BPA del 12-15 % con recompras), pero tiene más peso de media gama, de EMEAA y de China. Por EV/EBITDA de 12 meses (≈ 21 veces) pasa lo mismo. El múltiplo de referencia útil es el de Hilton y Marriott menos un descuento, no la mediana del grupo.`,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2025-02', objetivo: 'Ruby (marca, sin hoteles en propiedad)', comprador: 'IHG', ev: 120, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Compra de marca; múltiplo no publicado [11].' },
      { fecha: '2022-08', objetivo: 'Radisson Hotels Americas (franquicia, 624 hoteles)', comprador: 'Choice Hotels', ev: 674, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Incluye tres hoteles en propiedad; múltiplo no publicado [8].' },
      { fecha: '2021-11', objetivo: 'Apple Leisure Group (marcas de resorts y distribución)', comprador: 'Hyatt', ev: 2700, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Pagado en caja a KKR y KSL; múltiplo no publicado en la nota [9].' },
      { fecha: '2019-02', objetivo: 'Six Senses Hotels Resorts Spas', comprador: 'IHG', ev: 300, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Marca de lujo con 16 hoteles abiertos; múltiplo no publicado [10].' },
    ],
    comentario: 'Las compras del sector son de marcas y plataformas de franquicia, pequeñas frente a IHG y casi nunca con múltiplo publicado: no sirven para valorar el control de IHG y pesan 0 en la síntesis. IHG no tiene accionista de control, capitaliza ≈ 25.000 M USD y su mayor accionista tiene el 7 %: una oferta es posible (Marriott o Hilton por tamaño) pero chocaría con la competencia en EE. UU. y no se descuenta.',
    confianza: 'Baja',
  },
  huecos: [
    { seccion: 'transacciones', campo: 'múltiplos pagados (EV/EBITDA)', tipo: 'Complemento', intentos: '1) Notas de prensa y 8-K de Choice (Radisson) e Hyatt (ALG): sin múltiplo; 2) resultados de IHG de 2019 y 2025 (Six Senses, Ruby): sin múltiplo; 3) búsqueda en prensa del sector: múltiplos sin fuente primaria', decision: 'Omitido' },
    { seccion: 'bolsa', campo: 'posicion_corta_pct', tipo: 'Complemento', intentos: '1) Registro de posiciones cortas de la FCA (no consultado: hoja diaria); 2) Yahoo (corto del ADR, no representativo); 3) prensa: sin dato', decision: 'Omitido' },
  ],
  fuentes: fD,
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Seeking Alpha: canal RSS de IHG (artículos de 3 meses: «Japan Fits The K-Shaped Thesis», «Strong Pipeline And Capital Returns», «Positioned For Further Upside»)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-09-29', url: 'https://seekingalpha.com/api/sa/combined/IHG.xml' },
  { id: 2, titulo: 'Stocktwits: flujo de mensajes de IHG', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-04', url: 'https://api.stocktwits.com/api/2/streams/symbol/IHG.json' },
  { id: 3, titulo: 'Simply Wall St: «InterContinental Hotels Group (LSE:IHG) Is Drawing Fresh Attention» y valor razonable tras subidas de objetivos', editor: 'Simply Wall St (vía Yahoo Finance)', tipo: 'Foros y redes', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/IHG.L/news' },
  { id: 4, titulo: 'Kalkine Media: «Is softer travel demand weighing on InterContinental Hotels?» y «IHG faces renewed selling pressure as travel sector caution weighs»', editor: 'Kalkine Media', tipo: 'Foros y redes', fecha: '2026-07-24', url: 'https://kalkine.co.uk/news/consumer/is-softer-travel-demand-weighing-on-intercontinental-hotels' },
  { id: 5, titulo: 'The Globe and Mail: gestor que vende IHG para comprar Constellation Software (31-may-2026)', editor: 'The Globe and Mail (vía Stocktwits)', tipo: 'Foros y redes', fecha: '2026-05-31', url: 'https://www.theglobeandmail.com/investing/' },
  { id: 6, titulo: 'Seeking Alpha: «Trump meets executives from American Airlines, Marriott, and MGM on tourism decline» (3-sep-2026)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-09-03', url: 'https://seekingalpha.com/api/sa/combined/IHG.xml' },
];
const E = {
  _estado: 'Completa con poco debate: IHG se sigue poco en foros de particulares; Reddit y LSE Chat no abren.',
  sentimiento: {
    tono: 'Positivo', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Seeking Alpha (artículos y comentarios)', fecha: '2026-09', n_comentarios: 25, tono: 'Positivo', resumen: 'Tres artículos alcistas en tres meses (cartera de proyectos, recompras, entrada en Japón con la tesis de consumo en «K»); el de marzo pedía prudencia por valoración [1].' },
      { plataforma: 'Stocktwits', fecha: '2026-10', n_comentarios: 30, tono: 'Neutro', resumen: 'Poco debate propio: titulares de recomendaciones (UBS a Comprar), máximos de 52 semanas en junio y quejas de socios de la fidelidad sobre el estatus vitalicio [2].' },
      { plataforma: 'Simply Wall St y Yahoo (noticias con comentarios)', fecha: '2026-10', n_comentarios: 10, tono: 'Positivo', resumen: 'Atención renovada en octubre y subidas del valor razonable de los analistas tras los resultados del 1S [3].' },
      { plataforma: 'Kalkine Media (Reino Unido)', fecha: '2026-07', n_comentarios: 5, tono: 'Negativo', resumen: 'En julio, presión vendedora por la prudencia sobre el viaje y la geopolítica [4].' },
      { plataforma: 'Prensa con debate de gestores (Globe and Mail)', fecha: '2026-05', n_comentarios: 5, tono: 'Dividido', resumen: 'Un gestor vendió IHG por valoración para comprar Constellation Software [5].' },
    ],
    temas: [
      { tema: 'Recompras y crecimiento del BPA', postura: 'Alcista', peso: 'Alto', contraste: 'Cierto: 950 M USD de recompra en 2026 (4 % del capital) y BPA +13 % en el 1S26; pero se financia en parte con deuda (2,6 veces el EBITDA).' },
      { tema: 'Valoración exigente tras la subida', postura: 'Dividida', peso: 'Medio', contraste: 'Cierto: ≈ 26 veces el BPA de 12 meses frente a una mediana histórica de 23; el objetivo medio de los analistas (164,67) está por debajo del precio.' },
      { tema: 'Turismo en EE. UU. y geopolítica', postura: 'Bajista', peso: 'Medio', contraste: 'En parte: caída del turismo internacional a EE. UU. (reunión en la Casa Blanca en septiembre) y Oriente Medio −19 % en el 2T26, pero el RevPAR de EE. UU. de IHG creció un 5,2 % en el 2T26 [6].' },
      { tema: 'Programa de fidelidad (estatus, desayuno)', postura: 'Bajista', peso: 'Bajo', contraste: 'Quejas de socios; la penetración de la fidelidad siguió subiendo (≈ 67 % de las noches).' },
    ],
    lectura: 'El sentimiento es moderadamente positivo y sigue a los resultados: recompras, crecimiento del BPA y RevPAR de EE. UU. Nadie en los foros habla del riesgo de que los agentes de IA desintermedien la reserva, que es el riesgo estructural que el informe recoge; el debate de particulares es escaso y no hay euforia ni capitulación. La duda más repetida es la valoración, coherente con un objetivo medio de los analistas por debajo del precio. No aporta un riesgo nuevo ni contradice al consenso.',
    confianza: 'Media',
  },
  huecos: [],
  fuentes: fE,
};
guarda('E', E);
console.log('Notas A-E escritas. Mediana PER comparables:', r1(perMed), empresas.map((e) => `${e.ticker} ${e.per_ntm}`).join(', '));
