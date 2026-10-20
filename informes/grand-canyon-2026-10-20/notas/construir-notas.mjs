// Escribe las notas A-E de Grand Canyon Education (LOPE, corte 2026-10-20) a partir de los documentos de notas/docs (EDGAR),
// del XBRL de la SEC (cuentas-xbrl.json), de bolsa.json (cierre del 19-oct-2026), de yahoo-datos.json (Yahoo quoteSummary del
// 20-oct-2026, precio del cierre del 19-oct), de form4.txt, movimiento.txt y noticias.txt. Cada nota cita solo con [n] de su lista.
// Ejecutar: node informes/grand-canyon-2026-10-20/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const lee = (f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const r1 = (x) => (x == null ? null : Math.round(x * 10) / 10);
const r2 = (x) => (x == null ? null : Math.round(x * 100) / 100);
const n2 = (x) => String(x).replace('.', ',');
const X = lee('cuentas-xbrl.json');
const B = lee('bolsa.json');
const Y = lee('yahoo-datos.json').datos;
const ED = 'https://www.sec.gov/Archives/edgar/data/1434588';
const K10 = `${ED}/000110465926017047/lope-20251231x10k.htm`;
const Q2 = `${ED}/000110465926088674/lope-20260630x10q.htm`;
const PR2T26 = `${ED}/000110465926088669/lope-20260730xex99d1.htm`;
const PR4T25 = `${ED}/000110465926017038/lope-20260218xex99d1.htm`;

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Form 10-K del ejercicio 2025: cuentas, nota de concentración (GCU 89,5 % de los ingresos), MSA, regulación, litigios', editor: 'Grand Canyon Education, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-02-18', url: K10 },
  { id: 2, titulo: 'Grand Canyon Education Reports Fourth Quarter 2025 Results (conciliaciones no GAAP de 2025 y 2024; guía 2026)', editor: 'Grand Canyon Education, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-02-18', url: PR4T25 },
  { id: 3, titulo: 'Grand Canyon Education Reports Second Quarter 2026 Results (cuentas del 2T26, guía 3T, 4T y 2026)', editor: 'Grand Canyon Education, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-07-30', url: PR2T26 },
  { id: 4, titulo: 'Form 10-Q del 2T26 (30-jun-2026): MSA modificado y reformulado con GCU, litigios, recompras', editor: 'Grand Canyon Education, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-07-30', url: Q2 },
  { id: 5, titulo: 'Notas de resultados anuales 2020-2024 (BPA ajustado, EBITDA ajustado, caja e inversiones, guías)', editor: 'Grand Canyon Education, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2025-02-19', url: `${ED}/000155837025001146/lope-20250219xex99d1.htm` },
  { id: 6, titulo: 'Notas de resultados del 2T25, 3T25 y 1T26', editor: 'Grand Canyon Education, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-04-30', url: `${ED}/000110465926052881/lope-20260430xex99d1.htm` },
  { id: 7, titulo: 'Form 8-K (7.01): resumen de los litigios con el Gobierno y acuerdo de 35 M USD del qui tam Mackillop', editor: 'Grand Canyon Education, Inc. (SEC)', tipo: 'Primaria', fecha: '2025-10-30', url: `${ED}/000110465925104492/lope-20251030x8k.htm` },
  { id: 8, titulo: 'Form 8-K: línea de crédito revolving de 100 M USD (Zions) para recompras', editor: 'Grand Canyon Education, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-10-01', url: `${ED}/000110465926112835/lope-20260928x8k.htm` },
  { id: 9, titulo: 'Grand Canyon Education Q2 2026 Earnings Call Transcript', editor: 'The Motley Fool (vía Mitrade)', tipo: 'Prensa', fecha: '2026-07-31', url: 'https://www.mitrade.com/insights/news/live-news/article-8-1948973-20260731' },
  { id: 10, titulo: 'Form 8-K (7.01 y 8.01): ED reconoce a GCU como entidad sin ánimo de lucro; ampliación de recompras en 300 M USD', editor: 'Grand Canyon Education, Inc. (SEC)', tipo: 'Primaria', fecha: '2025-12-15', url: `${ED}/000110465925120898/lope-20251210x8k.htm` },
];

const anios = ['2019', '2020', '2021', '2022', '2023', '2024', '2025'];
// Amortización de intangibles de Orbis (comprada en enero de 2019) ≈ 8,4 M USD al año: el XBRL (DepreciationDepletionAndAmortization)
// no la incluye; se suma para que el EBITDA sea EBIT + toda la amortización (2025: 31,5 + 8,4, como la conciliación de la empresa [2]).
const AMORT_INT = { 2019: 8.4, 2020: 8.4, 2021: 8.4, 2022: 8.4, 2023: 8.4, 2024: 8.4, 2025: 8.4 };
// No recurrentes dentro del resultado operativo [2, 5]: 2025 acuerdo qui tam 35,0 + arrendamientos y deterioros 2,4 + indemnizaciones 0,3 +
// pérdidas en bajas 0,9; 2024 deterioros 1,9 + indemnización 1,1 + bajas 0,1.
const NOREC = { 2024: 3.1, 2025: 38.6 };
// Caja + inversiones sin restricciones del cierre de cada año [5, 2] (el XBRL solo da la caja).
const CAJA = { 2019: 143.9, 2020: 256.6, 2021: 600.9, 2022: 181.7, 2023: 244.5, 2024: 324.6, 2025: 300.1 };
const cuenta = X.financieros.cuenta.filter((c) => anios.includes(c.periodo)).map((c) => {
  const o = { ...c, coste_ventas: null, gastos_generales: c.gastos_generales, amortizaciones: r1(c.amortizaciones + AMORT_INT[c.periodo]),
    ebitda: r1(c.ebit + c.amortizaciones + AMORT_INT[c.periodo]), participadas_en_ebitda: null, no_recurrentes_en_ebitda: NOREC[c.periodo] ?? null,
    gastos_financieros: c.gastos_financieros ?? 0, dpa: 0, dpa_extraordinario: 0 };
  delete o.fin; return o;
});
const balance = X.balance.historico.filter((b) => anios.includes(b.periodo)).map((b) => {
  const o = { ...b, existencias: 0, intangibles: b.intangibles ?? 0, deuda_financiera: b.deuda_financiera ?? 0, arrendamientos: 0, caja: CAJA[b.periodo], minoritarios: 0, activos_contrato: null, pasivos_contrato: null };
  delete o.fin; return o;
});
const flujos = X.flujos.historico.filter((f) => anios.includes(f.periodo)).map((f) => {
  const o = { ...f, pagos_arrendamientos: 0, adquisiciones: f.adquisiciones ?? 0, desinversiones: 0, dividendos: 0, emision_acciones: f.emision_acciones ?? 0 };
  delete o.fin; return o;
});
const trim = (p, ing, g, ebitda, bpa, vs) => ({ periodo: p, ingresos: ing, crecimiento_pct: g, crecimiento_organico_pct: null, ebitda, margen_ebitda_pct: r1(ebitda / ing * 100), bpa, vs_consenso: vs });

const A = {
  _estado: 'Completa. Cuentas del XBRL de la SEC (2019-2025) comprobadas con el 10-K 2025 y las notas de resultados. Amortización de intangibles de Orbis (8,4 M al año) sumada a la del XBRL. Caja = caja + inversiones sin restricciones. Arrendamientos operativos fuera (US GAAP). 2018 fuera de la serie: medio año como dueña de GCU (venta el 1-jul-2018), no comparable.',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 1142.1, ebitda: 321.3, ebit: 279.7, beneficio_neto: 224.2, bpa: 8.28, dpa: 0, dpa_extraordinario: 0, fcf: 207.0, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 35.0 },
    cambios_perimetro: [
      { periodo: '2019', descripcion: 'Compra de Orbis Education (enero de 2019, 361 M USD): entran los programas de enfermería acelerada en sedes externas y 360 M de fondo de comercio e intangibles [1].' },
    ],
    comentario: 'Los ingresos por servicios pasaron de 778,6 M USD en 2019 a 1.106,1 M en 2025 (TCAC del 6,0 %), casi todo orgánico: matrículas de los socios +7,1 % en 2025 (136.239 alumnos) con ingreso por alumno plano [2]. GCU dio el 89,5 % de los ingresos en 2025 y el 89,4 % en el primer semestre de 2026 [1, 4]. El margen operativo cayó del 34,1 % de 2019 al 24,0 % de 2025 (28,3 % ajustado), por tres causas: desde 2022 ya no hay intereses del préstamo a GCU (49-56 M al año hasta 2021, que van debajo del resultado operativo), más gasto en captación y en las sedes híbridas de enfermería, que aún maduran, y en 2025 el acuerdo de 35 M del qui tam [5, 2, 7]. En 2026 la guía da un margen operativo del 28,0-28,2 % con ingresos de 1.165,3-1.172,3 M [3]. Años no comparables: 2019 (compra de Orbis) y 2025 (acuerdo judicial).',
    ajustes: 'El BPA ajustado de la empresa excluye la amortización de intangibles de Orbis (0,23 USD por acción en 2025), el acuerdo del qui tam (35 M USD, 1,03 USD por acción, con un efecto fiscal del 17,4 % por partes no deducibles), arrendamientos y deterioros (2,4 M), indemnizaciones y pérdidas en bajas: 9,08 USD en 2025 frente a 7,71 GAAP, y 8,04 frente a 7,73 en 2024 [2]. El EBITDA ajustado (368,6 M en 2025) excluye además los pagos en acciones (13,6 M), las aportaciones a fundaciones escolares de Arizona en lugar del impuesto estatal (5,0 M) y los costes legales (40,5 M con el acuerdo) [2]. En este informe el EBITDA es EBIT + amortizaciones, con el acuerdo y los deterioros como no recurrentes, y los pagos en acciones como coste.',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      trim('4T24', 292.6, null, 116.6, 2.95, null),
      trim('1T25', 289.3, null, 102.0, 2.57, null),
      trim('2T25', 247.5, null, 67.4, 1.53, null),
      trim('3T25', 261.1, null, 75.9, 1.78, 'En línea'),
      trim('4T25', 308.1, 5.3, 123.3, 3.21, 'En línea'),
      trim('1T26', 308.8, 6.7, 110.7, 2.86, 'Superior'),
      trim('2T26', 264.0, 6.7, 73.4, 1.81, 'Superior'),
    ],
    ultima_presentacion: 'EBITDA ajustado y BPA ajustado de la empresa [3, 6, 2]. En el 2T26 (30-jul-2026) los ingresos subieron un 6,7 % (264,0 M USD) con las matrículas de los socios +7,6 % (126.231) y el BPA ajustado fue de 1,81 USD, 0,14 por encima del consenso; el 1T26 dio 2,86 frente a 2,78 [3, 9]. La guía del 3T (BPA ajustado 1,74-1,78) quedó por debajo de los 1,83 que esperaba el mercado y la acción cayó un 5,8 % al día siguiente; la de 2026 es de 10,18-10,32 USD con ingresos de 1.165,3-1.172,3 M, ya con el MSA modificado (≈ 20 M menos de ingresos al año y efecto mínimo en el resultado) [3, 4]. En la conferencia, Mueller dijo que las nuevas matrículas en línea crecieron «a un dígito bajo» frente a una base exigente, que el segundo semestre irá «a un dígito medio-alto», que los nuevos límites de préstamos a posgrado «no han afectado a ninguno de nuestros programas» porque las matrículas están muy por debajo de lo que se puede pedir, y que el paso de las búsquedas a la IA «reduce la eficiencia del gasto en marketing»; la respuesta es captar con su propio equipo, que ya hace una parte creciente de los inicios [9]. Sedes híbridas: 47, al 60 % de capacidad, objetivo de 80, y 3-5 nuevas en 2027; facultad de Derecho en otoño de 2027 [9]. Los analistas preguntaron por el volumen de interesados con la IA generativa, los límites de préstamos y el margen de las sedes [9].',
    confianza: 'Alta',
  },
  balance: {
    historico: balance,
    vencimientos: [],
    liquidez: 'Caja e inversiones sin restricciones de 274,5 M USD a 30-jun-2026 (300,1 M a 31-dic-2025), sin deuda financiera [3]. El 28-sep-2026 firmó una línea revolving garantizada de 100 M USD a cinco años (SOFR + 1,50-2,00 %), ampliable a 200 M, para financiar recompras; covenants: deuda ≤ 2 veces el EBITDA, cobertura de cargos fijos ≥ 1,10 e inversión ≤ 50 M al año; es causa de vencimiento anticipado un cambio o incumplimiento del MSA con GCU que suponga un cambio material adverso [8].',
    rating: 'Sin rating',
    coste_deuda_pct: null,
    vida_media_anios: null,
    otros_pasivos: 'Arrendamientos operativos de 104,2 M USD a 30-jun-2026 (sedes híbridas y oficinas), fuera del puente por US GAAP [3]. Litigios abiertos sin provisión: dos demandas colectivas (Smith y Wang, RICO y consumo, con petición de certificación de clase; Ogdon, RICO y consumo en Nueva York, que incluye al consejero delegado, al director de operaciones y al director financiero) y la demanda de ≈ 300 alumnos de Valerio en Arizona, todas sobre la información del coste y la duración de los doctorados de GCU [4]. El qui tam de Mackillop se cerró con un pago de 35 M USD en 2025 [7]. Sin pensiones ni deuda asimilada.',
    comentario: 'El balance es de caja neta y casi sin capital circulante: cuentas a cobrar de 84,3 M USD al cierre de 2025 (34,2 M en junio, por la estacionalidad) y proveedores de 24,3 M [1, 3]. El patrimonio bajó de 1.574 M en 2020 a 670 M en junio de 2026 porque la empresa recompra acciones con todo el flujo libre y con la caja que devolvió GCU al cancelar su préstamo en 2021: 2.497 M USD de autocartera, 28,0 M de acciones [3]. Con la nueva línea de 100 M la empresa puede endeudarse por primera vez desde 2021 para seguir recomprando [8].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'La conversión es alta: flujo operativo de 273,5 M USD en 2025 (290,0 en 2024) frente a un beneficio neto de 216,2 M, con un capex de 34,8 M (3,1 % de las ventas) [2]. El capex de mantenimiento es pequeño (tecnología y el edificio de Phoenix); el de crecimiento son las sedes híbridas de enfermería, que la empresa desarrolla y amueblan (3-5 sedes nuevas en 2027) [9]. Usos de la caja: recompras de 264,8 M en 2025, 173,2 M en 2024 y 803,8 M en 2021, tras cobrar el préstamo a GCU; ningún dividendo [1, 2]. En el primer semestre de 2026, 196,9 M de flujo operativo y 203,2 M de recompras [3].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'KPMG LLP', anios_auditor: 14, opinion: 'Favorable (sin salvedades) en 2025, también sobre el control interno; asunto clave de auditoría: los ingresos dependen de la información de matrícula y tasas de los socios [1]',
    comentario: 'Las cuentas son sencillas: un solo segmento, ingresos como porcentaje de la matrícula de los socios, sin deuda ni existencias [1]. Lo delicado es que los ingresos se calculan con datos de GCU (asunto clave de auditoría) y que el auditor revisa a la empresa, no a GCU [1]. El BPA ajustado excluye solo amortización de Orbis y partidas sueltas; los pagos en acciones (13,6 M USD, 1,2 % de las ventas) sí cuentan en el BPA ajustado [2]. El 21-ago-2026 el consejo apartó con sueldo al director financiero por una investigación del Gobierno sobre operaciones con acciones de la empresa de un tercero no empleado; la empresa dice que no hay problemas en sus cuentas y que no es el objetivo de la investigación [1]. Altman, Piotroski y Beneish se leen con normalidad: caja neta, recompras y crecimiento estable.',
    senales: [
      { senal: 'Director financiero apartado (investigación de operaciones de un tercero)', nivel: 'Media', comentario: 'Daniel Bachus de baja con sueldo desde el 21-ago-2026; interina la directora de contabilidad, en la empresa desde 2008. Según la empresa, sin relación con las cuentas.' },
      { senal: 'Ingresos calculados con datos de un socio', nivel: 'Media', comentario: 'El 89,5 % de los ingresos sale de la matrícula de GCU; el auditor lo trata como asunto clave [1].' },
      { senal: 'Litigios de consumo sobre los doctorados de GCU', nivel: 'Media', comentario: 'Tres demandas abiertas sin provisión ni estimación de pérdida [4].' },
      { senal: 'Acuerdo del qui tam (35 M USD)', nivel: 'Baja', comentario: 'Cerrado en 2025; el Departamento de Educación aceptó que el plan de retribución actual de los asesores de matrícula es legal [7].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Sin dividendo. Toda la caja libre va a recompras: 2.545 M USD autorizados desde el inicio del programa (300 M más en diciembre de 2025, vigentes hasta el 1-mar-2027), 148,7 M disponibles a 30-jun-2026 y 124,1 M el 30-jul-2026 [10, 4, 9]. El consejo dice que la acción está «materialmente infravalorada» y en septiembre firmó una línea de 100 M para seguir recomprando [9, 8]. Prioridades: abrir sedes híbridas (objetivo 80), servicios a nuevos socios y la facultad de Derecho de GCU [9].',
    adquisiciones: [
      { anio: '2019', objetivo: 'Orbis Education (programas de enfermería acelerada con universidades en sedes externas)', importe: 361.2, ev_ebitda: null, financiacion: 'Caja y línea de crédito (devuelta en 2021)', resultado: 'Base de las 47 sedes híbridas; el ingreso por alumno de enfermería es más de tres veces el de un alumno en línea, pero las sedes aún están al 60 % [1, 9].' },
      { anio: '2018', objetivo: 'Venta de la universidad (GCU) a una entidad sin ánimo de lucro y MSA de servicios', importe: null, ev_ebitda: null, financiacion: 'Préstamo garantizado a GCU, cobrado en 2021', resultado: 'Convirtió a la empresa en proveedora de servicios con el 60 % de los ingresos de GCU; el préstamo cobrado pagó 1.400 M de recompras en 2021-2022 [5].' },
    ],
    comentario: 'Asignación disciplinada y concentrada en recompras: las acciones diluidas bajaron de 48,3 M en 2019 a 28,0 M en 2025 (−8,7 % al año) y a 26,2 M en el 2T26, con lo que el BPA ajustado creció un 8,6 % anual (5,48 a 9,08 USD) con un beneficio casi plano [5, 2, 3]. El único gran uso alternativo fue Orbis (361 M en 2019), que ha crecido pero aún no da el margen del resto. El riesgo de esta política es que se recompra a cualquier precio: en 2021-2022 se pagaron 1.400 M a 85-105 USD por acción, y ahora la empresa empieza a endeudarse para recomprar [8].',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'Servicios a GCU', descripcion: 'Servicios de marketing, captación, asesoría, ayudas, tecnología y apoyo académico a Grand Canyon University por el 60 % de su matrícula y tasas académicas (desde el 1-jul-2026, sin las tasas auxiliares).', tipo_resultado: null, historico: [{ periodo: '2024', ingresos: r1(1033.0 * 0.889), resultado: null }, { periodo: '2025', ingresos: r1(1106.1 * 0.895), resultado: null }] },
      { nombre: 'Otros socios (enfermería en sedes híbridas y programas en línea)', descripcion: 'Programas acelerados de enfermería y otros con 19 universidades en sedes externas, más servicios en línea.', tipo_resultado: null, historico: [{ periodo: '2024', ingresos: r1(1033.0 * 0.111), resultado: null }, { periodo: '2025', ingresos: r1(1106.1 * 0.105), resultado: null }] },
    ],
    geografias: [{ nombre: 'Estados Unidos', peso_pct: 100 }],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Alumnos de los socios', valor_anterior: '127.155 (dic-24)', valor_actual: '136.239 (dic-25)', variacion: '+7,1 %', comentario: '126.231 en junio de 2026 (+7,6 %) [2, 3].' },
      { kpi: 'Alumnos en línea de GCU', valor_anterior: '104.856 (jun-25)', valor_actual: '113.011 (jun-26)', variacion: '+7,8 %', comentario: 'Nuevas matrículas en línea a un dígito bajo en el 2T26 [3, 9].' },
      { kpi: 'Alumnos presenciales de GCU (verano)', valor_anterior: '8.579 (jun-25)', valor_actual: '8.910 (jun-26)', variacion: '+3,9 %', comentario: 'El semestre de primavera tuvo algo menos de alumnos tradicionales [3].' },
      { kpi: 'Alumnos de las sedes híbridas', valor_anterior: '4.991 (jun-25)', valor_actual: '5.829 (jun-26)', variacion: '+16,8 %', comentario: '47 sedes, al 60 % de capacidad [3, 9].' },
      { kpi: 'Peso de GCU en los ingresos', valor_anterior: '88,9 % (2024)', valor_actual: '89,5 % (2025)', variacion: '+0,6 pp', comentario: '89,4 % en el primer semestre de 2026 [1, 4].' },
      { kpi: 'Acciones diluidas medias (M)', valor_anterior: '29,3 (2024)', valor_actual: '28,0 (2025)', variacion: '−4,4 %', comentario: '26,1 M en circulación el 28-jul-2026 [4].' },
    ],
    clientes: 'Concentración extrema: GCU es el 89,5 % de los ingresos de 2025 y el 89,4 % del primer semestre de 2026; los otros 19 socios suman el 10 % [1, 4]. El MSA modificado y reformulado (firmado el 29-jul-2026, vigente desde el 1-jul) dura hasta el 30-jun-2041 con tres prórrogas automáticas de cinco años, quita a GCU el derecho a rescindir por conveniencia (antes, desde julio de 2025, pagando un año de comisiones), calcula la comisión como el 60 % de la matrícula y tasas académicas (sin vivienda, comida, deporte ni hotel), elimina el reembolso de costes académicos que pagaba la empresa y sustituye la indemnización por no renovar (el 50 % de un año) por 18 meses más de servicio [4]. Efecto: ≈ 20 M USD menos de ingresos al año y casi nada en el resultado [4]. El poder de precios no es de GCE sino de GCU, que congela la matrícula de grado presencial desde hace años; la comisión del 60 % es fija por contrato.',
    confianza: 'Alta',
  },
  huecos: [
    { seccion: 'trimestres', campo: 'crecimiento interanual de 4T24-3T25', tipo: 'Complemento', intentos: '1) notas de resultados de cada trimestre (dan el crecimiento del semestre o del año, no siempre el del trimestre); 2) 10-Q del periodo (no descargados); 3) cálculo con trimestres de 2024 que no están en las notas descargadas', decision: 'Omitido' },
  ],
  fuentes: fA,
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Form 10-K 2025 de Grand Canyon Education: competencia, regulación (OBBBA, «Do No Harm», 90/10, retribución de captadores), IA', editor: 'Grand Canyon Education, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-02-18', url: K10 },
  { id: 2, titulo: 'Fast Facts: Distance learning (alumnos de educación superior a distancia, otoño de 2019-2021)', editor: 'National Center for Education Statistics (NCES)', tipo: 'Sectorial', fecha: '2023', url: 'https://nces.ed.gov/fastfacts/display.asp?id=80' },
  { id: 3, titulo: 'Fichas de cotizadas de educación (Strategic Education, Perdoceo, American Public Education, Laureate, Stride, Universal Technical, Graham, Lincoln, Coursera, Chegg)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com' },
  { id: 4, titulo: 'Grand Canyon Education Q2 2026 Earnings Call Transcript', editor: 'The Motley Fool (vía Mitrade)', tipo: 'Prensa', fecha: '2026-07-31', url: 'https://www.mitrade.com/insights/news/live-news/article-8-1948973-20260731' },
  { id: 5, titulo: 'Form 10-Q del 2T26: MSA modificado con GCU, concentración', editor: 'Grand Canyon Education, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-07-30', url: Q2 },
  { id: 6, titulo: 'Form 8-K (7.01): reconocimiento de GCU como entidad sin ánimo de lucro por el Departamento de Educación', editor: 'Grand Canyon Education, Inc. (SEC)', tipo: 'Primaria', fecha: '2025-12-15', url: `${ED}/000110465925120898/lope-20251210x8k.htm` },
  { id: 7, titulo: 'Grand Canyon Education Reports Second Quarter 2026 Results', editor: 'Grand Canyon Education, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-07-30', url: PR2T26 },
];
const cmp = (t, nota) => { const d = Y[t]; return { nombre: d.nombre.replace(/,? Inc\.|Corporation| Company/g, '').trim(), pais: 'EE. UU.', ticker: t, ingresos: Math.round(d.ventas / 1e6), cuota_pct: null, margen_ebit_pct: null, comentario: nota }; };
const B_ = {
  _estado: 'Completa con limitaciones: no hay una fuente gratuita del tamaño del mercado de servicios a universidades (OPM); se mide con los alumnos a distancia del NCES.',
  sector: {
    definicion: 'Mercado relevante: la educación superior en línea e híbrida de EE. UU. financiada en buena parte con ayudas federales (Title IV), donde GCE presta servicios a universidades a cambio de un porcentaje de la matrícula [1]. Se mide en alumnos: en otoño de 2021, ≈ 4,4 millones de alumnos de grado y ≈ 1,3 millones de posgrado estudiaban solo a distancia [2]. GCU, con 113.011 alumnos en línea en junio de 2026, tendría ≈ 2 % de ese total (estimación propia) [7]. No hay una cifra gratuita fiable en dólares del negocio de servicios a universidades (OPM): el 10-K solo dice que hay «docenas» de empresas [1].',
    tamano: '≈ 5,7 millones de alumnos de educación superior solo a distancia en EE. UU. (otoño de 2021: 4,4 M de grado y 1,3 M de posgrado) [2]',
    unidad_serie: 'millones de alumnos solo a distancia (otoño)',
    serie: [{ anio: '2019', tamano: null }, { anio: '2021', tamano: 5.7 }],
    tcac_historico_pct: null, tcac_previsto_pct: null, cr5_pct: null, estructura: 'Fragmentada',
    drivers: [
      { driver: 'Adultos que estudian a distancia (posgrado, enfermería, educación)', efecto: '+', horizonte: 'Estructural', evidencia: 'El 40 % de los alumnos de posgrado estudiaba solo a distancia en 2021, frente al 33 % en 2019 [2]; GCU en línea +7,8 % en un año [7].' },
      { driver: 'Ayudas federales y límites de préstamos (OBBBA)', efecto: '−', horizonte: 'Estructural', evidencia: 'Desde julio de 2026, límite de 100.000 USD de préstamo de posgrado y fin de los préstamos Grad PLUS para nuevos alumnos [1]; GCE dice que sus matrículas están por debajo [4].' },
      { driver: 'Escasez de enfermeras', efecto: '+', horizonte: 'Estructural', evidencia: 'Sedes híbridas +16,8 % de alumnos; ingreso por alumno de enfermería más de tres veces el de uno en línea [7, 4].' },
      { driver: 'Coste de captar alumnos (búsqueda e IA)', efecto: '−', horizonte: 'Estructural', evidencia: 'Según Mueller, el paso de las búsquedas a la IA reduce la eficiencia del marketing [4].' },
      { driver: 'Empleo y ciclo', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'La matrícula de adultos sube cuando el paro sube; GCE creció en 2020 (+8,4 % de ingresos) [1].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 4, justificacion: 'Universidades públicas con programas en línea baratos (Western Governors, Southern New Hampshire, Arizona State) y empresas de servicios; 2U quebró en 2024 [1].' },
      { fuerza: 'Poder de los clientes', intensidad: 5, justificacion: 'GCU es el 89,5 % de los ingresos y renegoció el MSA en 2026 [5].' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Plataformas de anuncios (Google, Meta) y personal; los costes de captación suben [4].' },
      { fuerza: 'Amenaza de entrada', intensidad: 3, justificacion: 'Barreras regulatorias (Title IV, acreditación, retribución de captadores) y de escala; la IA abarata crear cursos [1].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 4, justificacion: 'Certificados cortos, aprendizaje con IA y formación de empresas sustituyen parte de los títulos; Chegg ha perdido el 51 % de las ventas en un año [3].' },
    ],
    ciclo: { posicion: 'Madurez del ciclo', comentario: 'La educación de adultos es contracíclica: sube con el paro (2009, 2020) y frena con el pleno empleo. Con un paro bajo, GCU en línea crece un 7-8 % en alumnos, pero las nuevas matrículas en línea solo a un dígito bajo en el 2T26 [7, 4]. Lo que mueve el sector hoy es la regulación (OBBBA desde julio de 2026, prueba de ingresos de los titulados desde julio de 2027) más que el ciclo [1].' },
    regulacion: 'La ley OBBBA (4-jul-2025) fija desde julio de 2026 límites de préstamo de posgrado (100.000 USD acumulados; 200.000 en profesionales), elimina el Grad PLUS para nuevos alumnos y crea la prueba «Do No Harm»: un programa pierde los préstamos federales si en dos de tres años sus titulados ganan menos que la mediana de referencia [1]. El comité de enero de 2026 acordó sustituir las reglas de empleo remunerado por esa prueba; si la norma final sale antes del 1-nov-2026, se aplicará desde el 1-jul-2027 [1]. El 15-dic-2025 el Departamento de Educación reconoció a GCU como entidad sin ánimo de lucro, con lo que deja de aplicarle la regla 90/10 [6, 1]. La prohibición de retribuir a los captadores por matrícula sigue en vigor; el reparto de ingresos con proveedores de servicios se permite por la excepción de servicios agrupados de 2011 [1].',
    tendencias: 'La educación en línea madura y se abarata: universidades públicas grandes ofrecen títulos en línea a bajo precio y la IA permite tutores y contenidos casi gratis. Los proveedores de servicios que vivían de captar alumnos con anuncios han sufrido (2U en quiebra en 2024; Coursera y Chegg hundidas por la IA) [1, 3]. GCE gana con la enfermería presencial (sedes híbridas con laboratorios), que la IA no sustituye, y con su propio equipo de captación; pierde si la IA reduce el valor percibido de un máster en línea en educación o empresa [4].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 2.0, posicion: 'Proveedor de servicios de la mayor universidad cristiana privada de EE. UU. (GCU, ≈ 2 % de los alumnos solo a distancia, estimación propia) y de 19 socios en enfermería acelerada [7, 2]',
    competidores: [
      cmp('STRA', 'Strategic Education (Capella, Strayer): universidades con ánimo de lucro en línea; crecimiento del 4-5 % [3].'),
      cmp('PRDO', 'Perdoceo (Colorado Tech, AIU): en línea con ánimo de lucro; mucha caja [3].'),
      cmp('APEI', 'American Public Education (APUS, Rasmussen enfermería): competidor directo en enfermería [3].'),
      cmp('LAUR', 'Laureate: universidades en México y Perú; no compite en EE. UU. [3].'),
      { nombre: 'Western Governors y Southern New Hampshire University (sin ánimo de lucro)', pais: 'EE. UU.', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Los mayores rivales en línea por número de alumnos, con matrículas bajas [1].' },
      { nombre: 'Academic Partnerships / Wiley University Services, Noodle, Keypath (privadas)', pais: 'EE. UU.', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Proveedores de servicios a universidades (OPM) que nombra el 10-K [1].' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'Antiguos alumnos y empleadores (distritos escolares, hospitales) refieren alumnos, sin red propiamente dicha [1].' },
        { fuente: 'Costes de cambio', puntuacion: 4, evidencia: 'GCU depende de la plataforma, el personal y los sistemas de GCE; el MSA llega a 2041 sin rescisión por conveniencia [5].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 2, evidencia: 'La marca es de GCU, no de GCE; la acreditación y el Title IV son de la universidad [1].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Margen operativo ajustado del 28,3 % frente al 19 % de margen EBITDA de Strategic Education; escala de 136.000 alumnos [7, 3].' },
        { fuente: 'Escala eficiente', puntuacion: 2, evidencia: 'Mercado fragmentado con rivales públicos baratos [1].' },
      ],
    },
    amenazas: 'Lo que más puede erosionarlo: (1) un deterioro de GCU (reputación, litigios de consumo sobre doctorados, prueba de ingresos de los titulados), porque GCE no tiene otro cliente de tamaño; (2) la IA, que abarata los títulos en línea y encarece la captación por búsqueda; (3) universidades públicas con títulos en línea a bajo precio; (4) la regulación de los proveedores de servicios (reparto de ingresos, retribución de captadores), que hoy es favorable pero ha cambiado con cada Gobierno [1, 4].',
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'Grand Canyon Education (GCE) es una empresa de servicios para universidades: hace por ellas el marketing, la captación y asesoría de alumnos, la gestión de las ayudas federales, la tecnología (plataforma Halo), el apoyo académico, la contratación de profesores y la operación de aulas y laboratorios [1]. Su gran cliente es Grand Canyon University (GCU), la universidad cristiana de Phoenix que GCE poseía hasta 2018 y vendió a una entidad sin ánimo de lucro: 121.921 alumnos en junio de 2026, 113.011 en línea [7]. Además presta servicios a 19 universidades, sobre todo en enfermería acelerada en 47 sedes híbridas con laboratorios cerca de hospitales [7, 4]. ≈ 2.700 empleados en su sede de Phoenix [1].',
    como_gana_dinero: 'Cobra el 60 % de la matrícula y tasas académicas de GCU (desde julio de 2026, sin vivienda, comida ni deporte) y un porcentaje mayor en los programas de enfermería de los otros socios, cuyo ingreso por alumno es más de tres veces el de un alumno en línea de GCU [5, 4]. Los ingresos dependen del número de alumnos (+7,6 % en el 2T26) y apenas del precio: GCU congela matrículas y el ingreso por alumno baja algo por la mezcla [7]. Los costes son sobre todo personal de asesoría (88 M USD en el 2T26), marketing (60 M) y tecnología y servicios académicos (46 M), en buena parte fijos: el margen sube en el 1T y el 4T, con el campus lleno, y baja en verano (22 % en el 2T26 frente al 37 % previsto para el 4T) [7, 3]. Las sedes híbridas pierden dinero hasta llenarse y dan márgenes de más del 20 % llenas [4].',
  },
  huecos: [
    { seccion: 'sector', campo: 'tamaño en dólares del mercado de servicios a universidades y serie de 5 años', tipo: 'Núcleo', intentos: '1) 10-K de GCE (solo describe a los competidores); 2) NCES (alumnos a distancia hasta 2021, sin dólares); 3) informes de mercado de OPM de pago, sin fuente gratuita fiable', decision: 'Se mide en alumnos (NCES 2021); serie omitida' },
  ],
  fuentes: fB,
};
guarda('B', B_);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Proxy statement 2026 (DEF 14A): consejo, remuneración 2025, accionistas', editor: 'Grand Canyon Education, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-04-23', url: `${ED}/000110465926047719/lope-20260610xdef14a.htm` },
  { id: 2, titulo: 'Form 8-K (5.07): resultados de la junta del 10-jun-2026', editor: 'Grand Canyon Education, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-06-10', url: `${ED}/000110465926072325/lope-20260610x8k.htm` },
  { id: 3, titulo: 'Form 8-K (5.02): baja administrativa del director financiero y nombramiento de Lori Browning como interina', editor: 'Grand Canyon Education, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-08-24', url: `${ED}/000110465926100299/lope-20260821x8k.htm` },
  { id: 4, titulo: 'Form 8-K (5.02): dimisión del consejero Jack A. Henry y cambios en las comisiones', editor: 'Grand Canyon Education, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-06-25', url: `${ED}/000110465926077768/lope-20260622x8k.htm` },
  { id: 5, titulo: 'Form 4 de directivos y consejeros (20-oct-2025 a 20-oct-2026), herramienta form4.mjs', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-20', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001434588&type=4' },
  { id: 6, titulo: 'Notas de resultados anuales 2021-2025 (guías anuales y resultados)', editor: 'Grand Canyon Education, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-02-18', url: PR4T25 },
  { id: 7, titulo: 'Form 8-K (5.02): Dilek Marsh directora de sistemas; salida de Kathy Claypatch (oct-2025)', editor: 'Grand Canyon Education, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-02-12', url: `${ED}/000110465926014301/lope-20260209x8k.htm` },
  { id: 8, titulo: 'Form 10-Q del 2T26: litigios (Smith y Wang, Ogdon, Valerio)', editor: 'Grand Canyon Education, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-07-30', url: Q2 },
  { id: 9, titulo: 'Form 8-K (7.01): FTC archiva su demanda contra GCE y Mueller (ago-2025); acuerdo del qui tam', editor: 'Grand Canyon Education, Inc. (SEC)', tipo: 'Primaria', fecha: '2025-10-30', url: `${ED}/000110465925104492/lope-20251030x8k.htm` },
];
const votos = { favor: 22695415, contra: 638918, abst: 18061 };
const C = {
  _estado: 'Completa. Proxy 2026, junta del 10-jun-2026, 8-K de cambios de consejo y directivos, Form 4 de 12 meses.',
  directivos: {
    equipo: [
      { nombre: 'Brian E. Mueller', cargo: 'Presidente del consejo y consejero delegado (y presidente de GCU)', desde: '2008', participacion_pct: 1.1, trayectoria: 'Consejero delegado desde 2008 y presidente del consejo desde 2017; antes presidió Apollo (University of Phoenix). Llevó a GCU de ≈ 1.000 alumnos presenciales a 121.921 alumnos y diseñó la venta de 2018; es a la vez presidente de GCU, lo que el 10-K señala como riesgo [1].' },
      { nombre: 'Lori Browning', cargo: 'Directora financiera interina (directora de contabilidad)', desde: '2026', participacion_pct: null, trayectoria: 'En la empresa desde 2008 y directora de contabilidad desde 2019; interina desde el 21-ago-2026 [3].' },
      { nombre: 'Daniel E. Bachus', cargo: 'Director financiero (de baja administrativa con sueldo desde el 21-ago-2026)', desde: '2008', participacion_pct: null, trayectoria: 'Director financiero desde 2008; apartado por una investigación del Gobierno sobre operaciones con acciones de la empresa de un tercero no empleado [3].' },
      { nombre: 'W. Stan Meyer', cargo: 'Director de operaciones', desde: null, participacion_pct: null, trayectoria: 'Dirige las operaciones de servicios; demandado junto a Mueller y Bachus en el caso Ogdon [1, 8].' },
      { nombre: 'Dilek Marsh', cargo: 'Directora de sistemas y de tecnología', desde: '2026', participacion_pct: null, trayectoria: 'Directora de tecnología desde 2021; asume sistemas en febrero de 2026 tras la salida de Kathy Claypatch [7].' },
    ],
    historial_guidance: [
      { anio: '2022', guia: 'Ingresos 905-930 M USD', real: '911,3 M', cumplida: 'Sí' },
      { anio: '2023', guia: 'Ingresos 939-965 M USD', real: '960,9 M', cumplida: 'Sí' },
      { anio: '2024', guia: 'BPA ajustado 7,39-7,91 USD', real: '8,04', cumplida: 'Sí' },
      { anio: '2025', guia: 'BPA ajustado 8,43-8,82 USD', real: '9,08', cumplida: 'Sí' },
      { anio: '2026', guia: 'BPA ajustado 9,79-10,40 USD (feb-26); 10,18-10,32 (jul-26)', real: 'En curso (4,69 en el primer semestre)', cumplida: 'Parcial' },
    ],
    comentario: 'Equipo muy estable y creíble en cifras: ha cumplido o superado la guía anual en 2022-2025 [6]. El punto débil es la persona clave: Mueller dirige a la vez GCE y GCU (su gran cliente), lo que crea un conflicto que el 10-K reconoce y una dependencia de un consejero delegado de 70 años sin sucesor anunciado [1]. En 2025-2026 se han movido piezas: salida de la directora de sistemas (octubre de 2025), dimisión del presidente de la comisión de auditoría (junio de 2026) y baja del director financiero por una investigación ajena a las cuentas (agosto de 2026) [7, 4, 3].',
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      { nombre: 'Brian E. Mueller', cargo: 'Presidente y consejero delegado', tipo: 'Ejecutivo', desde: '2009', comisiones: '—' },
      { nombre: 'Sara R. Ward', cargo: 'Consejera coordinadora independiente', tipo: 'Independiente', desde: '2013', comisiones: 'Auditoría; Nombramientos' },
      { nombre: 'Lisa Graham Keegan', cargo: 'Consejera', tipo: 'Independiente', desde: '2019', comisiones: 'Remuneración; Nombramientos' },
      { nombre: 'Chevy Humphrey', cargo: 'Consejera (presidenta de Auditoría desde junio de 2026)', tipo: 'Independiente', desde: '2019', comisiones: 'Auditoría (presidenta)' },
      { nombre: 'Kevin F. Warren', cargo: 'Consejero (presidente de Remuneración desde junio de 2026)', tipo: 'Independiente', desde: null, comisiones: 'Remuneración (presidente)' },
    ],
    presidente_ceo_separados: false, presidente_ejecutivo: true, consejero_coordinador: true, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: true, variable_ligado_rentabilidad: false, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: r1(votos.favor / (votos.favor + votos.contra + votos.abst) * 100), voto_remuneracion_contra_pct: r1(votos.contra / (votos.favor + votos.contra + votos.abst) * 100), voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 2.02, fijo: null, variable_corto: 0.48, variable_largo: null, ratio_salario_medio: 32.5 },
    remuneracion: 'La remuneración es baja para el tamaño: el consejero delegado cobró 2,02 M USD en 2025, 32,5 veces el empleado mediano (62.115 USD) [1]. El variable anual se fija con objetivos de ingresos y EBITDA ajustado (50 % cada uno) y objetivos personales; Mueller cobró 0,48 M de bonus [1]. No hay métricas de rentabilidad del capital ni de rentabilidad para el accionista en el variable. Cláusula de recuperación conforme a la norma 10D-1 desde 2023 [1]. En la junta de 2026 la remuneración tuvo un 97,2 % a favor; se aprobó un nuevo plan de acciones de 2026 [2].',
    accionistas: [
      { nombre: 'BlackRock', pct: 9.7, tipo: 'Institucional', variacion: 'Proxy 2026' },
      { nombre: 'FMR (Fidelity)', pct: 6.7, tipo: 'Institucional', variacion: 'Proxy 2026' },
      { nombre: 'Riverbridge Partners', pct: 5.4, tipo: 'Institucional', variacion: 'Proxy 2026' },
      { nombre: 'Consejeros y directivos (9 personas)', pct: 2.1, tipo: 'Internos', variacion: 'Mueller 1,1 %; ventas de 0,1 M USD en 12 meses' },
      { nombre: 'Autocartera', pct: 51.7, tipo: 'Autocartera', variacion: '28,0 M de 54,3 M de acciones emitidas a 30-jun-2026' },
    ],
    insiders: [
      { fecha: '2026-06-11', persona: 'Chevy Humphrey (consejera)', operacion: 'Venta', acciones: null, importe: 0.1 },
    ],
    control_y_defensas: 'Sin accionista de control: los mayores son BlackRock (9,7 %), Fidelity (6,7 %) y Riverbridge (5,4 %) [1]. Una acción, un voto; consejo de cinco miembros elegido cada año, cuatro independientes, con consejero coordinador [1, 2]. La operación vinculada que importa es la relación con GCU: Mueller es a la vez consejero delegado de GCE y presidente de GCU, la universidad que paga el 89,5 % de los ingresos y que acaba de renegociar el MSA; el consejo de GCU es independiente de GCE [1].',
    alertas: [
      'Director financiero de baja administrativa desde el 21-ago-2026 por una investigación del Gobierno sobre operaciones con acciones de la empresa de un tercero no empleado; la empresa dice que no es el objetivo y que no afecta a sus cuentas [3].',
      'Mueller preside GCU y es consejero delegado de GCE: conflicto de intereses en la negociación del MSA (renegociado en julio de 2026) [1].',
      'Dimisión del presidente de la comisión de auditoría (Jack Henry, consejero desde 2008) en junio de 2026 [4].',
      'Demandas colectivas y de ≈ 300 alumnos por la información de los doctorados de GCU, sin provisión; la FTC archivó la suya en agosto de 2025 [8, 9].',
    ],
    confianza: 'Alta',
  },
  huecos: [
    { seccion: 'gobierno', campo: 'remuneración fija y en acciones del consejero delegado en 2025', tipo: 'Complemento', intentos: '1) tabla resumen del proxy 2026 (el texto extraído no separa las columnas); 2) tabla de bonus (0,48 M) y ratio salarial (total 2,02 M); 3) proxy 2025', decision: 'Solo total y bonus' },
  ],
  fuentes: fC,
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de LOPE, SPY y XLY (precio, rango, rentabilidades, beta, cierres de ejercicio): herramienta bolsa.mjs', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/LOPE/history' },
  { id: 2, titulo: 'Consenso de LOPE y comparables (estimaciones de BPA y ventas, objetivos, recomendaciones): quoteSummary', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/LOPE/analysis' },
  { id: 3, titulo: 'Daily Treasury Par Yield Curve Rates 2026 (10 años: 5,15 % el 19-oct-2026)', editor: 'U.S. Department of the Treasury', tipo: 'Primaria', fecha: '2026-10-19', url: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve&field_tdr_date_value=2026' },
  { id: 4, titulo: 'Implied ERP by month (ERPbymonth.xlsx): octubre de 2026, 4,20 %', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 5, titulo: 'Movimiento del precio de LOPE (1-12 meses, máximos, media de 200, caídas diarias de más del 5 %): movimiento.mjs y movimiento-precio.mjs', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/LOPE/history' },
  { id: 6, titulo: 'Rastreador de noticias de 12 meses (noticias.mjs): BMO baja el objetivo a 182 USD (17-oct-2026), resultados del 3T el 4-nov-2026, línea de crédito, director financiero', editor: 'Google Noticias, Yahoo Finance, SEC (agregado)', tipo: 'Prensa', fecha: '2026-10-20', url: 'https://news.google.com/search?q=%22Grand%20Canyon%20Education%22' },
  { id: 7, titulo: 'Titulares de Seeking Alpha sobre LOPE (RSS, oct-2025 a oct-2026)', editor: 'Seeking Alpha', tipo: 'Prensa', fecha: '2026-10-18', url: 'https://seekingalpha.com/api/sa/combined/LOPE.xml' },
  { id: 8, titulo: 'Grand Canyon Education Reports Second Quarter 2026 Results (guía 3T, 4T y 2026)', editor: 'Grand Canyon Education, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-07-30', url: PR2T26 },
  { id: 9, titulo: 'Form 8-K (7.01): carta de intenciones para modificar el MSA con GCU (3-jun-2026)', editor: 'Grand Canyon Education, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-06-03', url: `${ED}/000110465926069570/lope-20260602x8k.htm` },
  { id: 10, titulo: 'Form 8-K (7.01): resumen de litigios con el Gobierno y acuerdo de 35 M USD del qui tam', editor: 'Grand Canyon Education, Inc. (SEC)', tipo: 'Primaria', fecha: '2025-10-30', url: `${ED}/000110465925104492/lope-20251030x8k.htm` },
  { id: 11, titulo: 'Form 8-K (5.02): director financiero de baja administrativa', editor: 'Grand Canyon Education, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-08-24', url: `${ED}/000110465926100299/lope-20260821x8k.htm` },
  { id: 12, titulo: 'Form 8-K: línea revolving de 100 M USD para recompras', editor: 'Grand Canyon Education, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-10-01', url: `${ED}/000110465926112835/lope-20260928x8k.htm` },
  { id: 13, titulo: 'Grand Canyon Education Reports Fourth Quarter 2025 Results (guía inicial 2026)', editor: 'Grand Canyon Education, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-02-18', url: PR4T25 },
  { id: 14, titulo: 'Form 4 de directivos (form4.mjs): sin compras; una venta de 0,1 M USD de una consejera', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-20', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001434588&type=4' },
  { id: 15, titulo: 'Grand Canyon Education Q2 2026 Earnings Call Transcript', editor: 'The Motley Fool (vía Mitrade)', tipo: 'Prensa', fecha: '2026-07-31', url: 'https://www.mitrade.com/insights/news/live-news/article-8-1948973-20260731' },
  { id: 16, titulo: 'Grand Canyon Education: price target cut to 185 USD from 198 at BMO (6-jul-2026) y página de recomendaciones', editor: 'Benzinga', tipo: 'Analistas', fecha: '2026-08-10', url: 'https://benzinga.com/quote/lope/analyst-ratings' },
];
const L = Y.LOPE;
const t = Object.fromEntries(L.trend.map((x) => [x.periodo, x]));
const bol = B.bolsa;
// Comparables cotizados de educación con beneficio (Yahoo, 20-oct-2026; precio del 19-oct). Coursera y Chegg fuera: pérdidas o
// PER sin sentido (se citan en el riesgo de IA). Adtalem: Yahoo no devolvió datos.
const COMP = ['STRA', 'PRDO', 'APEI', 'LAUR', 'LRN', 'UTI', 'GHC', 'LINC'];
const comps = COMP.map((tk) => {
  const d = Y[tk]; const tr = Object.fromEntries(d.trend.map((x) => [x.periodo, x]));
  const crec = tr['+1y'] && tr['0y'] ? r1((tr['+1y'].ventas / tr['0y'].ventas - 1) * 100) : null;
  return { nombre: d.nombre.replace(/,? Inc\.|Corporation| Company/g, '').trim(), ticker: tk, pais: 'US', capitalizacion: Math.round(d.cap / 1e6), ev_ventas: r2(d.ev / d.ventas), ev_ebitda_ltm: r1(d.ev_ebitda), ev_ebitda_ntm: null,
    per_ntm: r1(d.per_adelantado), crecimiento_pct: crec, margen_ebitda_pct: r1(d.ebitda_margen * 100), roic_pct: null, dn_ebitda: r1((d.deuda - d.caja) / d.ebitda), fcf_yield_pct: r1(d.fcf / d.cap * 100) };
});
const perMed = (() => { const v = comps.map((x) => x.per_ntm).sort((a, b) => a - b); const n = v.length; return n % 2 ? v[(n - 1) / 2] : r1((v[n / 2 - 1] + v[n / 2]) / 2); })();
const D = {
  _estado: `Completa. Precio de cierre del 19-oct-2026 (162,11 USD; la sesión del 20-oct no había abierto). Mediana del PER adelantado de los comparables: ${perMed}.`,
  _per_mediana_comparables: perMed,
  identificacion: {
    nombre: 'Grand Canyon Education, Inc.', nombre_corto: 'Grand Canyon Education', ticker: 'LOPE', isin: 'US38526M1062', mercado: 'Nasdaq Global Select Market', indice_referencia: 'S&P MidCap 400',
    pais: 'Estados Unidos', pais_iso: 'US', sector: 'Consumo discrecional', industria: 'Servicios de educación', sede: 'Phoenix (Arizona)', fundacion: '2008', empleados: null, web: 'https://www.gce.com',
    precio: B.identificacion.precio, fecha_precio: B.identificacion.fecha_precio, acciones: 26.07, capitalizacion_publicada: Math.round(L.cap / 1e6), free_float_pct: 97.9,
    max_52s: B.identificacion.max_52s, min_52s: B.identificacion.min_52s, volumen_medio_diario: `≈ ${Math.round(B.volumen_3m.importe_dia_millones)} M USD/día (3 meses)`, proximos_resultados: '2026-11-04',
  },
  consenso: {
    guidance: 'Guía de 2026 (30-jul-2026, con el MSA modificado): ingresos de 1.165,3-1.172,3 M USD, margen operativo del 28,0-28,2 %, tipo del 23,2 %, 26,1 M de acciones y BPA ajustado de 10,18-10,32 USD (GAAP 9,93-10,07); 3T: ingresos 268,5-270,5 M y BPA ajustado 1,74-1,78; 4T: 324,0-329,0 M y 3,75-3,85 [8]. La guía inicial de febrero era de 9,79-10,40 USD con ingresos de 1.167,5-1.189,0 M [13]. La empresa no da objetivos a medio plazo; Mueller habla de un crecimiento en línea del 6-7 % anual y de sedes híbridas creciendo «a dos dígitos» [15].',
    estimaciones: [
      { periodo: '2026e', ingresos: Math.round(t['0y'].ventas / 1e6), ebitda: null, ebit: null, bpa: r2(t['0y'].bpa), dpa: 0, fuente: `Yahoo Finance, ${t['0y'].n} analistas [2]` },
      { periodo: '2027e', ingresos: Math.round(t['+1y'].ventas / 1e6), ebitda: null, ebit: null, bpa: r2(t['+1y'].bpa), dpa: 0, fuente: `Yahoo Finance, ${t['+1y'].n} analistas [2]` },
    ],
    recomendaciones: { n_analistas: L.reco.strongBuy + L.reco.buy + L.reco.hold + L.reco.sell + L.reco.strongSell, comprar: L.reco.strongBuy + L.reco.buy, mantener: L.reco.hold, vender: L.reco.sell + L.reco.strongSell, po_medio: r2(L.po_medio), po_min: L.po_min, po_max: L.po_max },
    revisiones: `Cobertura escasa: tres analistas en Yahoo, los tres con compra [2]. El BPA de 2026 del consenso subió de ${n2(r2(t['0y'].bpa_hace90))} USD hace 90 días a ${n2(r2(t['0y'].bpa))} y el de 2027 de ${n2(r2(t['+1y'].bpa_hace90))} a ${n2(r2(t['+1y'].bpa))}, tras batir en el 2T [2]. Los objetivos bajan: BMO de 198 a 185 USD en julio y a 182 el 17-oct-2026; objetivo medio de 194 USD (182-200) [16, 6, 2]. El consenso del 3T (1,76 USD) quedó en la guía tras recortar desde 1,82-1,83 [2, 15]. Sin consenso gratuito de 2028.`,
    base_ebitda: 'sin consenso de EBITDA (solo BPA y ventas)', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    ...bol,
    beta: bol.beta, posicion_corta_pct: r1(L.corto_pct * 100),
    comentario: 'La acción se ha quedado atrás del índice en uno y tres años: −23,8 % en 12 meses frente al +15,4 % del S&P 500, y +11,8 % anual en tres años frente al +23,6 % [1]. Cayó un 38 % entre el máximo de octubre de 2025 (223 USD) y el mínimo de julio de 2026 (134 USD) con el BPA ajustado creciendo un 12-14 %: el ajuste es de múltiplo, del ≈ 22 veces el BPA adelantado a ≈ 15 [1, 2]. La causa: el acuerdo del qui tam y una guía de 2026 que crecía menos, el MSA modificado con GCU (menos ingresos) y, sobre todo, el miedo a que la IA y los límites de préstamo frenen la educación en línea, que ha arrastrado a todo el sector (Stride a 8,7 veces, Strategic Education a 9,6) [7, 9, 2]. Beta baja (0,65 mensual a cinco años; 0,77 ajustada) y volatilidad del 32 %.',
    contexto: {
      movimiento: { fecha: '2026-10-19', var_1m_pct: 7.2, var_3m_pct: 17.2, var_6m_pct: -7.2, var_12m_pct: -22.2, dist_max_52s_pct: -26.5, dist_min_52s_pct: 18.6, dist_max_historico_pct: -26.5, tendencia: 'lateral', volatilidad_60d_pct: 31.0, avisos: [] },
      movimientos_fuertes: [
        { periodo: 'oct-nov 2025', var_pct: -15.2, causa: 'El 31-oct-2025 (−8,9 %), tras el 8-K que anunció el acuerdo de 35 M USD del qui tam, y el 6-nov (−6,3 %), tras unos resultados del 3T con el beneficio GAAP hundido por el acuerdo y una guía del 4T moderada [10, 6].', veredicto: 'no cambia', condicion: null },
        { periodo: 'feb 2026', var_pct: -18.4, causa: 'Caídas del 3-feb (−6,1 %) y del 11-feb (−5,5 %) con el sector de educación y software por el miedo a la IA (causa concreta de LOPE no encontrada en tres búsquedas), y del 19-feb (−7,9 %) por la guía de 2026 (ingresos +5,6-7,5 %, con el 1T por debajo de lo esperado) [13, 7].', veredicto: 'no cambia', condicion: null },
        { periodo: 'jun 2026', var_pct: -11.6, causa: 'Carta de intenciones para modificar el MSA con GCU (3-jun): 10 M USD menos de ingresos en el segundo semestre y fin de la indemnización por rescisión; y caída del sector de educación del 15-jul [9, 7].', veredicto: 'no cambia', condicion: null },
        { periodo: 'jul 2026', var_pct: 12.4, causa: 'Rebote desde el mínimo del 22-jul (134,27 USD) ante los resultados del 2T; el 30-jul cayó un 5,8 % por la guía del 3T por debajo del consenso (1,74-1,78 frente a 1,83) [8, 15].', veredicto: 'no cambia', condicion: null },
        { periodo: 'ago-oct 2026', var_pct: 17.2, causa: 'Recuperación de tres meses pese a la baja del director financiero (21-ago): recompras, la línea de 100 M para recomprar (1-oct) y artículos que defienden que los fundamentales «calman» el miedo a la IA [11, 12, 7].', veredicto: 'no cambia', condicion: null },
      ],
      noticias: [
        { fecha: '2026-10-17', tipo: 'recomendación', hecho: 'BMO baja el objetivo a 182 USD (desde 185) y mantiene la recomendación de compra; objetivo medio de tres analistas de 194 USD [6, 2].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-01', tipo: 'ampliación o convertible', hecho: 'Línea revolving de 100 M USD a cinco años para recompras; vence anticipadamente si un cambio o incumplimiento del MSA con GCU supone un cambio material adverso [12].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-08-21', tipo: 'directivos', hecho: 'Director financiero de baja administrativa por una investigación del Gobierno sobre operaciones con acciones de la empresa de un tercero no empleado; la empresa dice que no es el objetivo ni afecta a las cuentas [11].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-07-29', tipo: 'fusión u oferta', hecho: 'MSA modificado y reformulado con GCU hasta 2041, sin rescisión por conveniencia y ≈ 20 M USD menos de ingresos al año [8].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-07-01', tipo: 'demanda o regulador', hecho: 'Entran en vigor los límites de préstamo de posgrado de la OBBBA; la prueba de ingresos de los titulados se aplicaría desde el 1-jul-2027 si la norma final sale antes del 1-nov-2026 [15].', veredicto: 'no cambia', condicion: null },
        { fecha: '2025-12-15', tipo: 'demanda o regulador', hecho: 'El Departamento de Educación reconoce a GCU como entidad sin ánimo de lucro; la FTC había archivado su demanda en agosto de 2025 y el Departamento retiró la multa de 37,7 M a GCU en mayo de 2025 [10].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-06-11', tipo: 'directivos', hecho: 'Única operación de directivos en 12 meses: venta de 0,1 M USD de una consejera; ninguna compra [14].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-11-04', tipo: 'resultados', hecho: 'Resultados del 3T26 y perspectivas el 4-nov-2026 [6].', veredicto: 'no cambia', condicion: null },
      ],
      proximos_resultados: '2026-11-04',
      veredicto: 'no cambia',
      condicion: null,
      comentario: 'La acción está un 26,5 % por debajo de su máximo de 52 semanas y un 18,6 % por encima del mínimo de julio, en tendencia lateral (2,5 % sobre la media de 200 sesiones); no salta ningún aviso P de la herramienta. Las caídas tienen causas conocidas (acuerdo judicial, guía, MSA, miedo sectorial a la IA) que el informe recoge en los escenarios; solo las de principios de febrero no tienen una causa propia encontrada. No hay colocaciones, ampliaciones ni decisiones judiciales o regulatorias con fecha que puedan mover el precio más de un 5 % en contra: la norma final de la prueba de ingresos no tiene fecha y los litigios no tienen juicio fijado. La investigación que afecta al director financiero no tiene fecha y la empresa dice no ser el objetivo. Los resultados del 4-nov no retrasan nada (regla 11). Veredicto: no cambia.',
    },
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: B.cierres_ejercicio.filter((x) => anios.includes(x.anio)).map((x) => ({ anio: x.anio, precio_cierre: x.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    comentario: 'Precio de cierre de cada año de Yahoo [1]. Con el BPA ajustado del año siguiente (la base de la regla a 12 meses), el PER adelantado osciló entre 14,4 veces (cierre de 2021, con la duda del estatus de GCU y la FTC) y 18,0 (cierre de 2024); hoy está en ≈ 15 con nuestro BPA de 2027. El mercado ha bajado el múltiplo a todo el sector por la IA y los límites de préstamo: Strategic Education cotiza a 9,6 veces, Perdoceo a 10,2 y Stride a 8,7 [2]. La prima de LOPE sobre ellos se apoya en su margen y en la ausencia de riesgo regulatorio directo (no participa en el Title IV), pero su dependencia de GCU es mayor.',
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Cotizadas de educación superior y técnica de EE. UU. con beneficio: Strategic Education, Perdoceo y American Public Education (universidades en línea con ánimo de lucro), Universal Technical y Lincoln (formación técnica), Stride (escuelas en línea), Laureate (universidades en Latinoamérica) y Graham (Kaplan) [2]. Ninguna es un proveedor de servicios puro como GCE: 2U quebró en 2024 y las demás OPM no cotizan. Fuera Coursera y Chegg (sin beneficio o con el negocio hundido por la IA) y Adtalem (Yahoo no dio datos). La mediana mezcla negocios desrateados (8-10 veces) con técnicos en auge (21-22 veces).',
    empresas: comps,
    comentario: `GCE cotiza a ${n2(r1(L.per_adelantado))} veces el BPA de 2027 del consenso (Yahoo), por encima de la mediana de los comparables (${n2(perMed)}) y muy por encima de las universidades en línea con ánimo de lucro (Strategic Education ${n2(comps.find((x) => x.ticker === 'STRA').per_ntm)}, Perdoceo ${n2(comps.find((x) => x.ticker === 'PRDO').per_ntm)}) [2]. La prima se explica por el margen (EBITDA del 31 % frente al 19-29 %), el crecimiento de alumnos (7 %) y porque GCE no arriesga directamente el Title IV; el descuento frente a las técnicas (UTI, Lincoln: 21-22 veces) refleja que esas crecen al 7-22 % con la demanda de oficios que la IA no sustituye. Múltiplo de referencia: la mediana, que el motor usa en el alcista.`,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2019-01', objetivo: 'Orbis Education', comprador: 'Grand Canyon Education', ev: 361.2, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Pago en caja del estado de flujos de 2019; sin EBITDA publicado [1].' },
    ],
    comentario: 'No hay transacciones comparables con múltiplos publicados en fuente primaria: las compras del sector de servicios a universidades (Wiley University Services por Academic Partnerships en 2023, edX y Trilogy por 2U) se hicieron con cifras parciales y 2U acabó en quiebra. Con 4.200 M USD de capitalización, caja neta y sin accionista de control, GCE podría interesar a un fondo, pero la dependencia de GCU (que tendría que aceptar al nuevo dueño en la práctica) hace poco probable una oferta.',
    confianza: 'Baja',
  },
  huecos: [
    { seccion: 'transacciones', campo: 'múltiplos de 3-5 transacciones del sector', tipo: 'Complemento', intentos: '1) 10-K y 8-K de GCE (solo Orbis, sin EBITDA); 2) notas de 2U y Wiley (operaciones sin EBITDA publicado); 3) prensa sectorial (cifras sin fuente primaria)', decision: 'Omitido (solo Orbis, sin múltiplo)' },
    { seccion: 'consenso', campo: 'BPA de 2028e y EBITDA del consenso', tipo: 'Complemento', intentos: '1) Yahoo quoteSummary (dos ejercicios, sin EBITDA); 2) MarketBeat (solo el año en curso y el siguiente); 3) MarketScreener no abre sin sesión', decision: 'Omitido' },
    { seccion: 'bolsa', campo: 'causa de las caídas del 3 y 11-feb-2026', tipo: 'Complemento', intentos: '1) 8-K de la empresa (ninguno esos días); 2) titulares de Seeking Alpha (RSS); 3) búsqueda en prensa (Barchart no abre; solo notas del sector)', decision: 'Se explica como caída del sector por la IA, sin causa propia' },
  ],
  fuentes: fD,
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Stocktwits, flujo de mensajes de $LOPE (feb-oct 2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-20', url: 'https://api.stocktwits.com/api/2/streams/symbol/LOPE.json' },
  { id: 2, titulo: 'Seeking Alpha: artículos sobre LOPE («Strong Fundamentals Quell AI Fears», 22-sep-2026; «Impressive Growth, But No Valuation Edge», 9-jul-2026; «The A Student That Got Punished For A C», 15-abr-2026; «Same Story, Lower Price», 4-feb-2026)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-18', url: 'https://seekingalpha.com/symbol/LOPE/analysis' },
  { id: 3, titulo: 'Simply Wall St y Yahoo: «How Interim CFO Appointment Amid Trading Probe Will Impact…» (1-sep-2026) y «A Steady Cash-Generating Business Ignored in a Speculative Market» (1-sep-2026)', editor: 'Simply Wall St / Yahoo Finance', tipo: 'Foros y redes', fecha: '2026-09-01', url: 'https://finance.yahoo.com/quote/LOPE/news' },
];
const E = {
  _estado: 'Completa. Stocktwits (30 mensajes, feb-oct 2026), titulares y resúmenes de artículos de Seeking Alpha y Simply Wall St; Reddit no abre.',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Stocktwits ($LOPE)', fecha: '2026-10', n_comentarios: 30, tono: 'Dividido', resumen: 'Poco debate: alertas de opciones, resúmenes de resultados y algunos bajistas tras la guía de febrero («por debajo de 150»); en septiembre, un mensaje sobre las reglas de la OBBBA que recortan préstamos federales y otro que la llama empresa bien gestionada; en marzo se la mencionaba junto a Duolingo y Chegg como víctima de la IA [1].' },
      { plataforma: 'Seeking Alpha (artículos)', fecha: '2026-09', n_comentarios: 6, tono: 'Dividido', resumen: 'Alcistas que ven una caja estable castigada por el miedo a la IA («los fundamentales calman los miedos») frente a otros que no ven margen de valoración («crecimiento impresionante, sin ventaja de valoración») [2].' },
      { plataforma: 'Simply Wall St y Yahoo (artículos y comentarios)', fecha: '2026-09', n_comentarios: 4, tono: 'Neutro', resumen: 'Preocupación por la baja del director financiero y argumentos de que es un negocio de caja «ignorado» en un mercado especulativo [3].' },
    ],
    temas: [
      { tema: 'IA: ¿sustituye la educación en línea?', postura: 'Dividida', peso: 'Alto', contraste: 'Las nuevas matrículas en línea de GCU crecieron solo a un dígito bajo en el 2T26 y la dirección admite que la IA encarece la captación; pero el total de alumnos sube un 7,6 % y la enfermería presencial un 16,8 % [1, 2].' },
      { tema: 'Límites de préstamos federales (OBBBA)', postura: 'Bajista', peso: 'Medio', contraste: 'La dirección dice que no afectan a ningún programa porque las matrículas de GCU están muy por debajo de los límites; la prueba de ingresos de los titulados (desde julio de 2027) es el riesgo real [1].' },
      { tema: 'Director financiero apartado', postura: 'Bajista', peso: 'Medio', contraste: 'Investigación sobre operaciones de un tercero; la empresa dice que no afecta a las cuentas. Sin novedades desde agosto [3].' },
      { tema: 'Recompras y valoración baja', postura: 'Alcista', peso: 'Medio', contraste: 'El BPA crece un 12-14 % con recompras del 4-7 % de las acciones al año y el PER adelantado está en la parte baja de su historia [2].' },
    ],
    lectura: 'El sentimiento es dividido y algo mejor que en primavera: tras caer un 38 %, los alcistas ven una caja estable castigada por el miedo a la IA y los bajistas, un sector en retirada y una empresa de un solo cliente con el director financiero apartado. No hay euforia; hay una mezcla de capitulación sectorial y de dudas concretas que el informe recoge (IA, regulación, GCU). No aporta ningún riesgo que el informe no tuviera. Opiniones, no datos: ninguna cifra sale de aquí.',
    confianza: 'Media',
  },
  huecos: [],
  fuentes: fE,
};
guarda('E', E);
console.log('Notas A-E escritas. Mediana PER comparables:', perMed, comps.map((x) => `${x.ticker} ${x.per_ntm}`).join(', '));
