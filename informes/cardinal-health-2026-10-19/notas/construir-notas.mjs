// Escribe las notas A-E de Cardinal Health (corte 2026-10-19) a partir de los documentos de notas/docs (EDGAR), del XBRL
// de la SEC (cuentas-xbrl.json), de bolsa.json, de yahoo-datos.json (Yahoo quoteSummary del 19-oct-2026, 14:04 UTC) y de la
// ficha sectorial de distribución farmacéutica (15-oct-2026). Cada nota cita solo con [n] de su propia lista de fuentes.
// Ejecutar: node informes/cardinal-health-2026-10-19/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const raiz = path.join(dir, '..', '..', '..');
const lee = (f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const r1 = (x) => (x == null ? null : Math.round(x * 10) / 10);
const r2 = (x) => (x == null ? null : Math.round(x * 100) / 100);
const n2 = (x) => String(x).replace('.', ',');
const X = lee('cuentas-xbrl.json');
const B = lee('bolsa.json');
const Y = lee('yahoo-datos.json').datos;
const SEC = JSON.parse(fs.readFileSync(path.join(raiz, 'sectores', 'distribucion-farmaceutica-2026-10-15-comparables.json'), 'utf8'));
const ED = 'https://www.sec.gov/Archives/edgar/data/721371';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Form 10-K del ejercicio FY2026 (cerrado el 30-jun-2026): cuentas, segmentos, clientes, deuda, opioides, Specialty Alliance, riesgos', editor: 'Cardinal Health, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-08-11', url: `${ED}/000072137126000038/cah-20260630.htm` },
  { id: 2, titulo: 'Cardinal Health Reports Fourth Quarter and Fiscal Year 2026 Results (conciliación GAAP-ajustado, segmentos, guía FY2027)', editor: 'Cardinal Health, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-08-11', url: `${ED}/000072137126000037/a26q4_x063026xex991xnewsre.htm` },
  { id: 3, titulo: 'Cardinal Health Reports Fourth Quarter and Fiscal Year 2025 Results (BPA ajustado 8,24 USD; guía FY2026)', editor: 'Cardinal Health, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2025-08-14', url: 'https://www.sec.gov/Archives/edgar/data/721371/000072137125000075/a25q4_x063025xex991xnewsre.htm' },
  { id: 4, titulo: 'Notas de resultados anuales FY2018-FY2024 (BPA ajustado, resultado operativo ajustado, deterioros de GMPD y cargos de opioides)', editor: 'Cardinal Health, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2024-08-14', url: 'https://www.sec.gov/Archives/edgar/data/721371/000072137124000054/a24q4_x063024xex991xnewsre.htm' },
  { id: 5, titulo: 'Notas de resultados del 1T, 2T y 3T FY2026 (trimestres, subidas de guía)', editor: 'Cardinal Health, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-04-30', url: 'https://www.sec.gov/Archives/edgar/data/721371/000072137126000017/a26q3_x033126xex991xnewsre.htm' },
  { id: 6, titulo: 'Form 10-Q del 3T FY2026 (31-mar-2026): deterioro de Navista e ION, Solaris', editor: 'Cardinal Health, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-04-30', url: 'https://www.sec.gov/Archives/edgar/data/721371/000072137126000018/cah-20260331.htm' },
  { id: 7, titulo: 'XBRL company facts de Cardinal Health (amortización de intangibles, depreciación, intereses pagados)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-19', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0000721371.json' },
  { id: 8, titulo: 'Cardinal Health Q4 FY2026 earnings call transcript (IEEPA, genéricos, Biopharma Solutions, recompras)', editor: 'Cardinal Health, Inc. (relación con inversores)', tipo: 'Primaria', fecha: '2026-08-11', url: 'https://s201.q4cdn.com/566741227/files/doc_financials/2026/q4/Q4-FY26-CAH-Earnings-Transcript.pdf' },
  { id: 9, titulo: 'Form 8-K: nueva línea de crédito de 4.000 M USD hasta agosto de 2031', editor: 'Cardinal Health, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-08-07', url: 'https://www.sec.gov/Archives/edgar/data/721371/000072137126000036/cah-20260807.htm' },
  { id: 10, titulo: 'Form 8-K: emisión de bonos de agosto de 2025 (600 M al 4,5 % 2030 y 400 M al 5,15 % 2035) para Solaris', editor: 'Cardinal Health, Inc. (SEC)', tipo: 'Primaria', fecha: '2025-08-27', url: 'https://www.sec.gov/Archives/edgar/data/721371/000119312525189845/d51052d8k.htm' },
  { id: 11, titulo: 'Form 8-K y carta de intenciones vinculante con CVS Health (extensión hasta el 30-jun-2032)', editor: 'Cardinal Health, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-10-01', url: `${ED}/000072137126000041/draftcvsloi101v4.htm` },
];

// Ajustados [2, 3, 4]: resultado operativo no GAAP (incluye en FY2026 +100 M del reembolso de aranceles IEEPA, no recurrente);
// amortización de intangibles comprados y depreciación del XBRL [7].
const ADJ_OI = { 2021: 2255, 2022: 1990, 2023: 2057, 2024: 2414, 2025: 2786, 2026: 3624 };
const AMORT_INT = { 2021: 428, 2022: 311, 2023: 281, 2024: 264, 2025: 303, 2026: 361 };
const anios = ['2021', '2022', '2023', '2024', '2025', '2026'];
const cuenta = X.financieros.cuenta.filter((c) => anios.includes(c.periodo.replace('FY', ''))).map((c) => {
  const a = c.periodo.replace('FY', '');
  const o = { ...c, periodo: 'FY' + a, participadas_en_ebitda: null, no_recurrentes_en_ebitda: ADJ_OI[a] - c.ebit - AMORT_INT[a], dpa_extraordinario: 0 };
  delete o.fin; return o;
});
const balance = X.balance.historico.filter((b) => anios.includes(b.periodo.replace('FY', ''))).map((b) => {
  const a = b.periodo.replace('FY', '');
  const o = { ...b, periodo: 'FY' + a, arrendamientos: 0, activos_contrato: null, pasivos_contrato: null };
  delete o.fin; return o;
});
const flujos = X.flujos.historico.filter((f) => anios.includes(f.periodo.replace('FY', ''))).map((f) => {
  const a = f.periodo.replace('FY', '');
  const o = { ...f, periodo: 'FY' + a, emision_acciones: 0, pagos_arrendamientos: f.pagos_arrendamientos ?? 0 };
  delete o.fin; return o;
});

// Trimestres: EBITDA ajustado = resultado operativo no GAAP + depreciación (D&A del trimestre − amortización de intangibles
// repartida por igual; estimación propia que suma 596 M en FY2026 frente a 589 del XBRL).
const trim = (p, ing, g, ebitda, bpa, vs) => ({ periodo: p, ingresos: ing, crecimiento_pct: g, crecimiento_organico_pct: null, ebitda, margen_ebitda_pct: r2(ebitda / ing * 100), bpa, vs_consenso: vs });
const A = {
  _estado: 'Completa. Cuentas del XBRL de la SEC comprobadas con el 10-K FY2026 y las notas de resultados. Minoritarios del balance = participaciones no dominantes (159 M); las Specialty Alliance Units (1.277 M, parte económica de los médicos socios) ya están en el pasivo y se restan como minoritarios solo en el puente de valoración. No recurrentes = resultado operativo no GAAP − EBIT GAAP − amortización de intangibles comprados. Arrendamientos operativos fuera (US GAAP). El XBRL da un EBIT de FY2022-FY2023 algo distinto del publicado entonces (−607 frente a −596; 752 frente a 727): cifras reexpresadas.',
  financieros: {
    cuenta, ltm: null,
    cambios_perimetro: [
      { periodo: 'FY2026', descripcion: 'Solaris Health (urología, ≈ 1.900 M USD, mayoría desde noviembre de 2025) y el negocio de diabetes de AdaptHealth; meses completos de GIA (enero de 2025) y ADS (abril de 2025) [1, 6].' },
      { periodo: 'FY2025', descripcion: 'Specialty Networks (≈ 1.200 M), GIA (73 % por ≈ 2.800 M), ION (≈ 1.100 M) y ADS (≈ 1.000 M); pérdida del contrato de OptumRx (vencido en junio de 2024), que restó ventas de bajo margen [3, 1].' },
    ],
    comentario: 'Los ingresos pasaron de 162.467 M USD en FY2021 a 254.248 M en FY2026 (TCAC del 9,4 %) [1]. El motor es el segmento farmacéutico (Pharmaceutical and Specialty Solutions, 92 % de las ventas): volumen de recetas, GLP-1, especialidad (más de 50.000 M en FY2026, +25 %) y las consultas compradas de The Specialty Alliance [2]. En FY2025 las ventas bajaron un 1,9 % por la salida de OptumRx, un cliente de margen casi nulo [3]. El resultado operativo no GAAP subió de 2.255 M en FY2021 a 3.624 M en FY2026 (TCAC del 9,9 %; 3.524 M sin los 100 M no recurrentes del reembolso de aranceles IEEPA) [2, 4]. El margen operativo ajustado es del 1,4 %: farmacéutico 1,19 %, productos médicos (GMPD) 2,0 % y «Otros» (at-Home, Nuclear, OptiFreight) 10,4 % [2]. Años no comparables: FY2020 (cargo de opioides de 5.630 M) y FY2022-FY2024 (deterioros de fondo de comercio de GMPD de 2.100, 1.200 y 675 M) [4].',
    ajustes: 'El BPA ajustado excluye la amortización de intangibles comprados (361 M USD en FY2026), los costes de compras y la remuneración en caja y acciones ligada a ellas (287 M: sobre todo las Specialty Alliance Units de los médicos socios), la reestructuración (106 M), los deterioros (177 M, con 184 M de fondo de comercio de Navista e ION en el 3T), el deterioro de la participación en Outcomes (122 M), litigios (−10 M) y la reversión de la tasa estatal de opioides (−17 M) [2]. En FY2026 el BPA GAAP fue de 7,23 USD y el ajustado de 11,26 (10,95 sin los 0,31 del reembolso IEEPA, que la dirección llama no recurrente) [2, 8]. La reestructuración y la remuneración ligada a compras se repiten todos los años (407 M de coste aún no reconocido de las unidades de los médicos, a ≈ 4 años [1]): el DCF resta 0,10 puntos de margen por ellas.',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      trim('1T25', 52277, null, 625 + 106, 1.88, null),
      trim('2T25', 55264, null, 635 + 116, 1.93, null),
      trim('3T25', 54878, null, 807 + 131, 2.35, null),
      trim('4T25', 60159, null, 719 + 133, 2.08, null),
      trim('1T26', 64009, 22.4, 857 + 143, 2.55, null),
      trim('2T26', 65627, 18.8, 877 + 144, 2.63, null),
      trim('3T26', 60940, 11.0, 956 + 158, 3.17, 'Superior'),
      trim('4T26', 63672, 5.8, 935 + 151, 2.91, 'Superior'),
    ],
    ultima_presentacion: 'Trimestres fiscales (el 4T26 es abr-jun 2026). EBITDA ajustado = resultado operativo no GAAP + depreciación (estimación propia: D&A del trimestre menos la amortización de intangibles repartida por igual) y BPA ajustado de la empresa [2, 5]. En el 4T26 (11-ago-2026) el BPA ajustado fue de 2,91 USD, 0,49 por encima del consenso, con ventas de 63.672 M por debajo de lo esperado; el 3T26 dio 3,17 frente a 2,79 [2, 5]. Guía de FY2027 (11-ago-2026, reafirmada el 1-oct con el acuerdo de CVS): BPA ajustado de 12,40-12,60 USD (+13-15 % sobre los 10,95 sin IEEPA); farmacéutico ventas +3-5 % y resultado +8-11 %; GMPD ventas +2-4 % y resultado de 200-220 M; «Otros» ventas +11-13 % y resultado +15-18 %; intereses y otros 240-290 M; tipo del 19-20 %; ≈ 233 M de acciones; al menos 1.000 M de recompras; inversión ≈ 700 M; flujo libre ajustado de 3.500-4.000 M [2, 11]. Objetivo a largo plazo: BPA ajustado +12-14 % anual [2]. En la conferencia, la dirección explicó que los 100 M de IEEPA no se repiten, que la conversión de genéricos y la especialidad siguen fuertes, que Biopharma Solutions apunta a 1.000 M de ventas en FY2028 y que las compras ya hechas aportan 2-3 puntos del crecimiento del resultado; los analistas preguntaron por la normalización del flujo libre (5.000 M en FY2026 frente a 3.500-4.000 guiados), los aranceles a genéricos y el riesgo del conflicto de Irán para los costes de GMPD [8].',
    confianza: 'Alta',
  },
  balance: {
    historico: balance,
    vencimientos: [
      { anio: 'FY2027', importe: 1835 }, { anio: 'FY2028-FY2029', importe: 1345 }, { anio: 'FY2030-FY2031', importe: 1339 }, { anio: 'FY2032+', importe: 4171 },
    ],
    liquidez: 'Caja de 4.856 M USD a 30-jun-2026; línea sindicada no dispuesta de 4.000 M hasta agosto de 2031 (covenant: deuda neta ≤ 3,75 veces el EBITDA) [9], más programas de titulización de cuentas a cobrar y una línea de 364 días de octubre de 2025 [1].',
    rating: 'Grado de inversión (calificaciones de S&P, Moody\'s y Fitch sin comprobar en fuente primaria)',
    coste_deuda_pct: 4.6,
    vida_media_anios: 7.0,
    otros_pasivos: 'Opioides: pasivo de 4.300 M USD a 30-jun-2026 (468 M a corto) por el acuerdo nacional de 2022 y otros; 417 M pagados en FY2026, el sexto pago (374 M) en julio de 2026 y hasta ≈ 3.700 M más hasta 2038 [1]. Abiertos: Cabell County/Huntington (el Cuarto Circuito anuló en octubre de 2025 la sentencia favorable a los distribuidores; pendiente), ≈ 73 demandas privadas, una investigación civil del Departamento de Justicia (antisoborno, consultas de reumatología) y filtros de vena cava (29 M provisionados) [1]. Hacienda (IRS) propone ajustes por la aseguradora cautiva y la devolución de pérdidas (≈ 400 M de gasto y ≈ 1.400 M de impuesto más intereses) y por Patient Recovery (≈ 160 M); la empresa los recurre y dice estar provisionada [1]. Specialty Alliance Units: 1.277 M (843 M un año antes), la parte económica de los médicos socios de The Specialty Alliance, valorada con flujos descontados [1].',
    comentario: 'El circulante comercial es negativo: existencias + clientes − proveedores = −7.171 M USD en FY2026 (−2,8 % de las ventas) [1]; los proveedores (38.283 M) financian existencias y cobros, así que crecer libera caja. El patrimonio es negativo (−2.883 M) por recompras y por los cargos de opioides y de GMPD de 2020-2024 [1]. La deuda financiera (8.886 M, con arrendamientos financieros) menos la caja deja 4.030 M de deuda neta, ≈ 1,0 veces el EBITDA ajustado; con los opioides después de impuestos (≈ 3.400 M) y las unidades de los médicos (1.277 M), ≈ 2,1 veces [1, 2].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'El flujo operativo depende del circulante y de los pagos de opioides (≈ 400 M al año dentro del operativo): 2.397 M USD en FY2025 y 5.174 M en FY2026 frente a un beneficio ajustado de 2.667 M en FY2026 [1, 2]. El flujo libre ajustado de la empresa fue de ≈ 5.000 M en FY2026, por un circulante favorable que no se repite: la guía de FY2027 es de 3.500-4.000 M [2]. La inversión es mínima: 649 M en FY2026 (0,26 % de las ventas; inmovilizado y software) [1]. La caja se ha ido a compras de consultas y de negocios de especialidad (1.991 M en FY2026 y 5.250 M en FY2025), recompras (1.358 M) y dividendos (491 M) [1].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'Ernst & Young LLP', anios_auditor: 24, opinion: 'Favorable (sin salvedades) en FY2026, también sobre el control interno [1]',
    comentario: 'Las cuentas son limpias pero el BPA publicado ha sido muy ruidoso: pérdida de 12,61 USD por acción en FY2020 por el cargo de opioides de 5.630 M y de 3,37 USD en FY2022 por los deterioros de GMPD (2.100 M), a los que siguieron 1.200 M en FY2023 y 675 M en FY2024 [4]. El ajustado excluye partidas que se repiten (reestructuración, remuneración ligada a compras) y otras que no (deterioros, IEEPA) [2]. Señal reciente: el deterioro de 184 M del fondo de comercio de Navista e ION en el 3T26, comprados en 2024, y el de 122 M de la participación en Outcomes: algunas compras de especialidad no rinden lo previsto [6, 2]. Los indicadores del motor (Altman, Beneish) pierden sentido con patrimonio negativo y circulante negativo; se leen con cuidado.',
    senales: [
      { senal: 'BPA ajustado frente a GAAP', nivel: 'Media', comentario: 'En FY2026, 11,26 USD ajustado frente a 7,23 GAAP: 4,03 USD de diferencia (amortizaciones, remuneración ligada a compras, deterioros) [2].' },
      { senal: 'Remuneración ligada a compras fuera del ajustado', nivel: 'Media', comentario: '287 M USD en FY2026 y 407 M aún por reconocer: es coste real de comprar consultas con médicos socios [1, 2]; el DCF lo resta.' },
      { senal: 'Deterioros de compras recientes', nivel: 'Media', comentario: '184 M de Navista e ION (3T26) y 122 M de Outcomes en FY2026; antes, 3.975 M de GMPD en FY2022-FY2024 [2, 4].' },
      { senal: 'Patrimonio negativo', nivel: 'Baja', comentario: '−2.883 M USD en FY2026; no es un problema de solvencia (flujo libre ajustado de 5.000 M) pero invalida ROE y Altman [1].' },
      { senal: 'Disputas fiscales con el IRS', nivel: 'Media', comentario: 'Ajustes propuestos de ≈ 1.400 M de impuesto más intereses por la aseguradora cautiva; recurridos y, según la empresa, provisionados [1].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Prioridades declaradas: invertir en el negocio (especialidad, Biopharma Solutions, at-Home, Nuclear), compras que lo refuercen, un dividendo que crece poco (0,5158 USD trimestrales, +1 % al año) y recompras: al menos 1.000 M en FY2027 con 6.400 M disponibles tras ampliar el programa en 5.000 M en agosto de 2026 [2]. Objetivo a largo plazo: BPA ajustado +12-14 % anual [2].',
    adquisiciones: [
      { anio: 'FY2025', objetivo: 'Specialty Networks (plataforma de consultas de urología, digestivo y reumatología)', importe: 1200, ev_ebitda: null, financiacion: 'Caja', resultado: 'Base de The Specialty Alliance [3, 1].' },
      { anio: 'FY2025', objetivo: 'Integrated Oncology Network (ION)', importe: 1100, ev_ebitda: null, financiacion: 'Caja', resultado: 'Deterioro de fondo de comercio (con Navista) de 184 M en el 3T26 [6].' },
      { anio: 'FY2025', objetivo: 'GI Alliance (73 %; digestivo)', importe: 2800, ev_ebitda: null, financiacion: 'Caja y bonos', resultado: 'Integrada en The Specialty Alliance; derecho de compra del resto desde el tercer año [1].' },
      { anio: 'FY2025', objetivo: 'Advanced Diabetes Supply (ADS)', importe: 1000, ev_ebitda: null, financiacion: 'Caja', resultado: 'Integrada en at-Home; «Otros» sube su resultado un 37 % en FY2026 [2].' },
      { anio: 'FY2026', objetivo: 'Solaris Health (urología, mayoría)', importe: 1900, ev_ebitda: null, financiacion: 'Bonos de agosto de 2025 (1.000 M) y caja', resultado: 'Consolidada desde noviembre de 2025; 210 M de unidades de médicos al cierre [10, 1].' },
    ],
    comentario: 'La asignación de capital ha mejorado con Hollar: el resultado operativo no GAAP sube de 1.990 M USD en FY2022 a 3.624 M en FY2026 con una inversión fija del 0,26 % de las ventas y circulante negativo, y las acciones diluidas bajan de 294 M a 237 M (−4 % al año) [1, 4]. La década anterior fue mala: Cordis (1.900 M en 2015) y el negocio de Medtronic (6.100 M en 2017) acabaron en 3.975 M de deterioros de GMPD y en la venta de Cordis con pérdidas [4]. Desde 2024 la empresa ha comprometido ≈ 8.000 M en consultas de especialidad (The Specialty Alliance) y at-Home: más margen, pero más riesgo de ejecución y de reembolso, y ya con un deterioro de 184 M [6].',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'Pharmaceutical and Specialty Solutions', descripcion: 'Distribución de medicamentos de marca, genéricos y especialidad (oncología, biosimilares), The Specialty Alliance (consultas de urología, digestivo, oncología), Red Oak Sourcing (compras de genéricos con CVS), Biopharma Solutions y Nuclear y Precision Health no incluida.', tipo_resultado: 'EBIT', historico: [{ periodo: 'FY2024', ingresos: 210019, resultado: 2015 }, { periodo: 'FY2025', ingresos: 204644, resultado: 2258 }, { periodo: 'FY2026', ingresos: 234833, resultado: 2783 }] },
      { nombre: 'Global Medical Products and Distribution (GMPD)', descripcion: 'Fabricación y distribución de productos médicos de marca propia (guantes, batas, jeringas, sondas) y de terceros a hospitales y centros.', tipo_resultado: 'EBIT', historico: [{ periodo: 'FY2024', ingresos: 12381, resultado: 92 }, { periodo: 'FY2025', ingresos: 12636, resultado: 135 }, { periodo: 'FY2026', ingresos: 12719, resultado: 258 }] },
      { nombre: 'Otros (at-Home Solutions, Nuclear and Precision Health, OptiFreight)', descripcion: 'Material médico a domicilio (diabetes), radiofármacos y teranósticos, y logística para hospitales.', tipo_resultado: 'EBIT', historico: [{ periodo: 'FY2024', ingresos: 4512, resultado: 423 }, { periodo: 'FY2025', ingresos: 5382, resultado: 516 }, { periodo: 'FY2026', ingresos: 6792, resultado: 707 }] },
      { nombre: 'Corporativo y eliminaciones', descripcion: 'Gastos corporativos y partidas excluidas del resultado de segmento (amortizaciones, deterioros, litigios, reestructuración).', tipo_resultado: 'EBIT', historico: [{ periodo: 'FY2024', ingresos: -85, resultado: -1287 }, { periodo: 'FY2025', ingresos: -84, resultado: -634 }, { periodo: 'FY2026', ingresos: -96, resultado: -1135 }] },
    ],
    geografias: [{ nombre: 'Estados Unidos', peso_pct: 99.3 }, { nombre: 'Internacional', peso_pct: 0.7 }],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'BPA ajustado (USD)', valor_anterior: '8,24', valor_actual: '11,26', variacion: '+37 %', comentario: '10,95 sin IEEPA; guía FY2027 12,40-12,60 [2].' },
      { kpi: 'Resultado del segmento farmacéutico (M USD)', valor_anterior: '2.258', valor_actual: '2.783', variacion: '+23 %', comentario: 'Margen del 1,10 % al 1,19 % [2].' },
      { kpi: 'Ventas de especialidad (M USD)', valor_anterior: '≈ 40.000', valor_actual: '> 50.000', variacion: '+25 %', comentario: 'Oncología, biosimilares y The Specialty Alliance [2].' },
      { kpi: 'Resultado de GMPD (M USD)', valor_anterior: '135', valor_actual: '258', variacion: '+91 %', comentario: '158 sin los 100 M de IEEPA; guía FY2027 200-220; el objetivo de 650 M para FY2025 no se cumplió [2].' },
      { kpi: 'Resultado de «Otros» (M USD)', valor_anterior: '516', valor_actual: '707', variacion: '+37 %', comentario: 'ADS en at-Home y teranósticos en Nuclear (+30 %) [2, 8].' },
      { kpi: 'Acciones diluidas medias (M)', valor_anterior: '242', valor_actual: '237', variacion: '−2 %', comentario: '232,6 M en circulación el 31-jul-2026 [1].' },
    ],
    clientes: 'Concentración alta: CVS Health es el 28 % de las ventas de FY2026 (22 % de las cuentas a cobrar) y los cinco primeros clientes el 43 %; las centrales de compra Vizient y Premier canalizan el 29 % [1]. El 1-oct-2026 Cardinal firmó con CVS una carta de intenciones vinculante para extender la distribución hasta el 30-jun-2032; Red Oak Sourcing, la sociedad de compras de genéricos con CVS, sigue hasta junio de 2029 [11, 1]. Kroger renovó y el mayor cliente de GMPD firmó a largo plazo [8]. El contrato de OptumRx venció en junio de 2024 [3]. Poder de precios limitado y pactado: en marcas cobra una comisión por servicio sobre el precio de lista; en genéricos gana el diferencial de compra (Red Oak). Los cinco primeros proveedores son el 39 % de las compras y el mayor el 13 % [1].',
    confianza: 'Alta',
  },
  huecos: [],
  fuentes: fA,
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Form 10-K FY2026 de Cardinal Health: negocio, competencia, regulación, clientes, aranceles', editor: 'Cardinal Health, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-08-11', url: `${ED}/000072137126000038/cah-20260630.htm` },
  { id: 2, titulo: 'Distribución farmacéutica mayorista: ficha sectorial corta (tamaño, cuotas, márgenes, comparables)', editor: 'Repositorio de análisis (sectores/distribucion-farmaceutica-2026-10-15.md)', tipo: 'Sectorial', fecha: '2026-10-15', url: 'sectores/distribucion-farmaceutica-2026-10-15.md' },
  { id: 3, titulo: 'Form 10-K FY2025 de Cencora (previsión de IQVIA del gasto farmacéutico de EE. UU.)', editor: 'Cencora, Inc. (SEC)', tipo: 'Primaria', fecha: '2025-11-25', url: 'https://www.sec.gov/Archives/edgar/data/1140859/000114085925000131/cor-20250930.htm' },
  { id: 4, titulo: 'Fichas de competidores (ventas, márgenes) de Yahoo Finance', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com' },
  { id: 5, titulo: 'Cardinal Health Reports Fourth Quarter and Fiscal Year 2026 Results (segmentos)', editor: 'Cardinal Health, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-08-11', url: `${ED}/000072137126000037/a26q4_x063026xex991xnewsre.htm` },
  { id: 6, titulo: 'Form 8-K: carta de intenciones con CVS Health hasta 2032', editor: 'Cardinal Health, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-10-01', url: `${ED}/000072137126000041/draftcvsloi101v4.htm` },
  { id: 7, titulo: 'Cardinal Health en la conferencia J.P. Morgan Healthcare 2026 (transición de los contratos de marcas afectados por los precios negociados de Medicare)', editor: 'Cardinal Health, Inc. (nota de prensa)', tipo: 'Primaria', fecha: '2026-01-12', url: 'https://www.sec.gov/Archives/edgar/data/721371/000072137126000003/a2026jpmpressrelease.htm' },
  { id: 8, titulo: 'Cardinal Health Q4 FY2026 earnings call transcript (IRA, GLP-1, aranceles)', editor: 'Cardinal Health, Inc. (relación con inversores)', tipo: 'Primaria', fecha: '2026-08-11', url: 'https://s201.q4cdn.com/566741227/files/doc_financials/2026/q4/Q4-FY26-CAH-Earnings-Transcript.pdf' },
];
const B_ = {
  _estado: 'Completa. Perímetro, tamaño y comparables de la ficha sectorial del 15-oct-2026, comprobados con el 10-K de Cardinal.',
  sector: {
    definicion: 'Mercado relevante: la distribución mayorista de medicamentos con receta en EE. UU. (marca, genéricos, especialidad y biosimilares) a farmacias, hospitales, consultas y gestores de farmacia, que da el 92 % de las ventas de Cardinal (Pharmaceutical and Specialty Solutions) [5]. Se mide con las ventas de los segmentos farmacéuticos de EE. UU. de los tres grandes (McKesson, Cencora y Cardinal), que mueven más del 90 % del volumen: ≈ 866.000 M USD en los últimos ejercicios (estimación propia de la ficha sectorial) [2]. GMPD (5 % de las ventas) compite en otro mercado, el de productos médicos para hospitales (Medline, Owens & Minor, McKesson Medical-Surgical), y «Otros» en atención domiciliaria y radiofármacos [1].',
    tamano: '≈ 866.000 M USD de ventas de distribución farmacéutica en EE. UU. de los tres grandes (último ejercicio de cada uno) [2]',
    unidad_serie: 'millones de USD (ventas de los segmentos de EE. UU. de los tres grandes; estimación propia de la ficha sectorial)',
    serie: [{ anio: '2024', tamano: 769000 }, { anio: '2025', tamano: 856000 }, { anio: '2026e', tamano: 905000 }, { anio: '2027e', tamano: 950000 }, { anio: '2028e', tamano: 1000000 }],
    tcac_historico_pct: 10, tcac_previsto_pct: 6, cr5_pct: 95, estructura: 'Concentrada',
    drivers: [
      { driver: 'Volumen de recetas y envejecimiento', efecto: '+', horizonte: 'Estructural', evidencia: 'La población de 65 años o más llegará a ≈ 71 millones en 2029 [3]; el segmento farmacéutico de Cardinal creció un 15 % en FY2026 [5].' },
      { driver: 'GLP-1 (diabetes y obesidad)', efecto: '+/−', horizonte: 'Estructural', evidencia: 'Suben mucho las ventas con margen casi nulo; en el 4T26 compensaron los ≈ 500 pb de ventas que restaron los precios negociados de Medicare [8].' },
      { driver: 'Especialidad y oncología', efecto: '+', horizonte: 'Estructural', evidencia: 'Ventas de especialidad de más de 50.000 M USD en FY2026 (+25 %) y teranósticos +30 % [5, 8].' },
      { driver: 'Precio de lista de las marcas (IRA, nación más favorecida)', efecto: '−', horizonte: 'Estructural', evidencia: 'Los precios negociados de Medicare restan ventas pero no beneficio: Cardinal renegoció los contratos de todas las marcas afectadas [7, 8].' },
      { driver: 'Genéricos y aranceles', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Genéricos fuertes en FY2026 (Red Oak); amenaza de aranceles del 100 % a genéricos desde 2028 y del 200 % desde 2029 según la Casa Blanca [8, 1].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Oligopolio estable de tres que compiten por contratos de grandes cuentas: márgenes operativos ajustados del 1,0-1,2 % en EE. UU. [2].' },
      { fuerza: 'Poder de los clientes', intensidad: 5, justificacion: 'CVS es el 28 % de las ventas de Cardinal y los cinco primeros clientes el 43 % [1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'El mayor laboratorio es el 13 % de las compras; las comisiones están pactadas [1].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Escala, licencias por estado y de la DEA, red de almacenes y el sistema de control de opioides común del acuerdo de 2022 [1].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 2, justificacion: 'Venta directa del laboratorio al paciente y gestores de farmacia integrados afectan a nichos; el grueso pasa por el mayorista [1, 2].' },
    ],
    ciclo: { posicion: 'Expansión', comentario: 'La demanda de medicamentos no depende del ciclo económico: las ventas de los tres grandes crecieron en 2009, 2020 y 2022 [2]. Lo que se mueve es la inflación o deflación de precios, la mezcla (GLP-1, especialidad) y, en GMPD, los costes de materias primas y fletes (petróleo, conflicto de Irán) y los aranceles [8]. Hoy el volumen crece y los genéricos van bien.' },
    regulacion: 'La Ley de Reducción de la Inflación fija precios negociados en Medicare para diez fármacos desde enero de 2026 y quince más desde 2027; Cardinal renegoció los contratos de distribución de todas las marcas afectadas para cobrar por servicio [7]. La orden ejecutiva de «nación más favorecida» presiona los precios de lista. Aranceles: desde abril de 2026 a medicamentos de marca importados y anuncio de aranceles a genéricos (100 % desde 2028, 200 % desde 2029); el Supremo anuló los aranceles IEEPA y Cardinal cobrará ≈ 200 M de devoluciones [1, 8]. El acuerdo de opioides de 2022 obliga a pagos hasta 2038 y a un sistema común de control de pedidos [1].',
    tendencias: 'La especialidad crece más que la distribución general: los tres grandes compran consultas de oncología, urología, digestivo y retina para asegurar el volumen de fármacos caros y vender servicios a laboratorios (Cardinal: The Specialty Alliance con GIA, Specialty Networks, Solaris e ION) [1]. Los GLP-1 y los biosimilares suben el volumen. Los radiofármacos y teranósticos son un nicho de crecimiento rápido (Nuclear and Precision Health). La IA se aplica a previsión de demanda, almacenes y atención a pacientes de at-Home [1].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 27, posicion: '3.º en distribución farmacéutica en EE. UU. (≈ 27 % del volumen de los tres grandes, estimación con las ventas de segmento); fabricante y distribuidor relevante de productos médicos de marca propia; líder en radiofármacos [2, 1]',
    competidores: [
      { nombre: 'McKesson', pais: 'EE. UU.', ticker: 'MCK', ingresos: 403430, cuota_pct: 39, margen_ebit_pct: 1.5, comentario: 'Primero; CVS es el 24 % de sus ventas (también extendido a 2032); oncología con US Oncology Network y Florida Cancer Specialists [2, 6].' },
      { nombre: 'Cencora', pais: 'EE. UU.', ticker: 'COR', ingresos: 321333, cuota_pct: 34, margen_ebit_pct: 0.83, comentario: 'Segundo; Walgreens es el 25 % de sus ventas; compra consultas de retina y oncología [2, 3].' },
      { nombre: 'Henry Schein', pais: 'EE. UU.', ticker: 'HSIC', ingresos: 13184, cuota_pct: null, margen_ebit_pct: 5.18, comentario: 'Distribución a dentistas y médicos; compite con GMPD en consultas, no en la mayorista farmacéutica [2, 4].' },
      { nombre: 'Medline (privada)', pais: 'EE. UU.', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Mayor rival de GMPD en productos médicos de marca propia para hospitales [1].' },
      { nombre: 'Owens & Minor', pais: 'EE. UU.', ticker: 'OMI', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Rival de GMPD en distribución de productos médicos y at-Home (cifras no tomadas: Yahoo no respondió) [1].' },
    ],
    foso: {
      veredicto: 'Amplio', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'Red Oak (compras de genéricos con CVS) da escala de compra, pero no hay red de usuarios [1].' },
        { fuente: 'Costes de cambio', puntuacion: 3, evidencia: 'Contratos de varios años con integración de sistemas; CVS extendió hasta 2032 y Kroger renovó [6, 8].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 2, evidencia: 'Licencias de la DEA y de cada estado; licencias nucleares de radiofármacos [1].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Margen operativo ajustado del farmacéutico del 1,19 %, el mejor de los tres en su segmento [5, 2].' },
        { fuente: 'Escala eficiente', puntuacion: 5, evidencia: 'Tres distribuidores con más del 90 % del mercado y márgenes del 1 %: no cabe un cuarto [2].' },
      ],
    },
    amenazas: 'Lo que más puede erosionar el foso es la concentración de clientes: CVS es el 28 % de las ventas; la carta de intenciones vinculante hasta 2032 quita el riesgo de vencimiento, pero las condiciones no se conocen [6]. Segundo, la regulación de precios (nación más favorecida, Medicare negociado) si pasa de restar ventas a restar comisiones. Tercero, los aranceles a genéricos importados de 2028-2029, que pueden cambiar el negocio de genéricos (Red Oak). Cuarto, en GMPD, Medline y los fabricantes asiáticos en productos básicos.',
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'Cardinal Health es el tercer distribuidor de medicamentos de EE. UU.: compra a los laboratorios medicamentos de marca, genéricos y de especialidad y los entrega a farmacias, hospitales y consultas, con ≈ 63.900 empleados [1]. Tiene tres partes: Pharmaceutical and Specialty Solutions (92 % de las ventas: distribución, especialidad, The Specialty Alliance de consultas de urología, digestivo y oncología, Red Oak con CVS y Biopharma Solutions), Global Medical Products and Distribution (5 %: guantes, batas, jeringas y otros productos médicos de marca propia y distribución a hospitales) y «Otros» (3 %: at-Home Solutions, radiofármacos de Nuclear and Precision Health y OptiFreight) [5].',
    como_gana_dinero: 'Gana poco por unidad y mucho por volumen: 254.248 M USD de ventas con un margen operativo ajustado del 1,4 % [5]. En marcas cobra una comisión por servicio pactada con el laboratorio; en genéricos gana el diferencial de compra (Red Oak con CVS), donde está buena parte del margen. La especialidad, las consultas propias y «Otros» (10,4 % de margen) dan más beneficio por cada dólar vendido: «Otros» es el 19 % del resultado de los segmentos con el 3 % de las ventas [5]. GMPD fabrica y distribuye productos médicos con un margen del 2 %, muy expuesto a costes de materias primas, fletes y aranceles. El circulante es negativo: los proveedores financian existencias y cobros.',
  },
  huecos: [],
  fuentes: fB,
};
guarda('B', B_);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Proxy statement 2026 (DEF 14A): consejo, remuneración, accionistas', editor: 'Cardinal Health, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-09-21', url: 'https://www.sec.gov/Archives/edgar/data/721371/000130817926000402/cah-20260921.htm' },
  { id: 2, titulo: 'Form 8-K: resultados de la junta de noviembre de 2025 (votos)', editor: 'Cardinal Health, Inc. (SEC)', tipo: 'Primaria', fecha: '2025-11-05', url: 'https://www.sec.gov/Archives/edgar/data/721371/000072137125000133/cah-20251105.htm' },
  { id: 3, titulo: 'Form 8-K: retiro de Gregory B. Kenny como presidente del consejo (20-mar-2026)', editor: 'Cardinal Health, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-03-17', url: 'https://www.sec.gov/Archives/edgar/data/721371/000072137126000013/cah-20260317.htm' },
  { id: 4, titulo: 'Cardinal Health appoints Patricia A. Hemingway Hall as Chair of the Board', editor: 'Cardinal Health, Inc. (nota de prensa)', tipo: 'Primaria', fecha: '2026-03-23', url: 'https://www.sec.gov/Archives/edgar/data/721371/000072137126000013/finalpressrelease323.htm' },
  { id: 5, titulo: 'Form 4 de directivos y consejeros de Cardinal Health (19-oct-2025 a 19-oct-2026), herramienta form4.mjs', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-19', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000721371&type=4' },
  { id: 6, titulo: 'Notas de resultados anuales FY2022-FY2026 (guías y resultados de BPA ajustado)', editor: 'Cardinal Health, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-08-11', url: `${ED}/000072137126000037/a26q4_x063026xex991xnewsre.htm` },
  { id: 7, titulo: 'Form 8-K: retiro de la directora de contabilidad (Mary Scherer, feb-2027) y nombramiento de Anita Zielinski (5-nov-2026)', editor: 'Cardinal Health, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-08-04', url: 'https://www.sec.gov/Archives/edgar/data/721371/000072137126000026/cah-20260804.htm' },
  { id: 8, titulo: 'Form 10-K FY2026: litigios, investigaciones del Departamento de Justicia, IRS', editor: 'Cardinal Health, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-08-11', url: `${ED}/000072137126000038/cah-20260630.htm` },
];
const C = {
  _estado: 'Completa. Proxy 2026, 8-K de la junta de 2025 y de cambios de consejo y directivos, Form 4 de 12 meses. La junta de 2026 es el 12-nov-2026: el último voto sobre remuneración es el de 2025.',
  directivos: {
    equipo: [
      { nombre: 'Jason M. Hollar', cargo: 'Consejero delegado', desde: '2022', participacion_pct: 0.03, trayectoria: 'Director financiero de 2020 a 2022 y consejero delegado desde septiembre de 2022. Con él el BPA ajustado pasó de 5,06 USD (FY2022) a 11,26 (FY2026), se estabilizó GMPD y se creó The Specialty Alliance [6, 1].' },
      { nombre: 'Aaron E. Alt', cargo: 'Director financiero', desde: '2023', participacion_pct: null, trayectoria: 'Director financiero desde febrero de 2023 [1].' },
      { nombre: 'Deborah Weitzman', cargo: 'Consejera delegada de Pharmaceutical and Specialty Solutions', desde: '2023', participacion_pct: null, trayectoria: 'Dirige el segmento que da el 92 % de las ventas [1].' },
      { nombre: 'Stephen M. Mason', cargo: 'Consejero delegado de GMPD', desde: '2022', participacion_pct: null, trayectoria: 'Lleva el plan de mejora de productos médicos [1].' },
      { nombre: 'Jessica L. Mayer', cargo: 'Directora jurídica y de cumplimiento', desde: '2020', participacion_pct: null, trayectoria: 'Lleva opioides, Departamento de Justicia e IRS [1].' },
    ],
    historial_guidance: [
      { anio: 'FY2022', guia: 'BPA ajustado 5,60-5,90 USD', real: '5,06', cumplida: 'No' },
      { anio: 'FY2023', guia: '5,05-5,40 USD', real: '5,79', cumplida: 'Sí' },
      { anio: 'FY2024', guia: '6,50-6,75 USD', real: '7,53', cumplida: 'Sí' },
      { anio: 'FY2025', guia: '7,55-7,70 USD', real: '8,24', cumplida: 'Sí' },
      { anio: 'FY2026', guia: '9,30-9,50 USD (subida tres veces, a 10,70-10,80)', real: '11,26 (10,95 sin IEEPA)', cumplida: 'Sí' },
      { anio: 'GMPD FY2025', guia: 'Resultado de segmento ≥ 650 M USD (día del inversor de 2022)', real: '135 M', cumplida: 'No' },
    ],
    comentario: 'Equipo creíble desde 2023: cuatro años seguidos batiendo la guía inicial de BPA ajustado, en los cuatro por más de un 5 % [6]. Lo que no cumplió fue GMPD: el objetivo de 650 M USD de resultado para FY2025 quedó en 135 M [6]. Hollar (53 años) llegó en plena crisis de GMPD y con Elliott en el consejo, y ha recuperado la confianza del mercado. El consejo cambió de presidente en marzo de 2026 (Kenny se retiró y lo sustituyó Patricia Hemingway Hall, independiente) [3, 4]; la directora de contabilidad se retira en febrero de 2027 [7].',
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      { nombre: 'Patricia A. Hemingway Hall', cargo: 'Presidenta del consejo (independiente)', tipo: 'Independiente', desde: '2013', comisiones: 'Gobierno y Sostenibilidad' },
      { nombre: 'Jason M. Hollar', cargo: 'Consejero delegado', tipo: 'Ejecutivo', desde: '2022', comisiones: '—' },
      { nombre: 'Robert W. Azelby', cargo: 'Consejero', tipo: 'Independiente', desde: '2024', comisiones: 'Auditoría' },
      { nombre: 'Michelle M. Brennan', cargo: 'Consejera', tipo: 'Independiente', desde: '2022', comisiones: 'Gobierno y Sostenibilidad (presidenta); Remuneración' },
      { nombre: 'Sheri H. Edison', cargo: 'Consejera', tipo: 'Independiente', desde: '2020', comisiones: 'Riesgos (presidenta); Gobierno y Sostenibilidad' },
      { nombre: 'David C. Evans', cargo: 'Consejero', tipo: 'Independiente', desde: '2020', comisiones: 'Auditoría (presidente); Remuneración' },
      { nombre: 'Akhil Johri', cargo: 'Consejero', tipo: 'Independiente', desde: '2018', comisiones: 'Auditoría; Gobierno y Sostenibilidad' },
      { nombre: 'Nancy Killefer', cargo: 'Consejera', tipo: 'Independiente', desde: '2015', comisiones: 'Gobierno y Sostenibilidad; Remuneración' },
      { nombre: 'Christine A. Mundkur', cargo: 'Consejera', tipo: 'Independiente', desde: '2022', comisiones: 'Auditoría; Riesgos' },
      { nombre: 'Robert W. Musslewhite', cargo: 'Consejero', tipo: 'Independiente', desde: '2025', comisiones: 'Remuneración (presidente); Riesgos' },
      { nombre: 'Sudhakar Ramakrishna', cargo: 'Consejero', tipo: 'Independiente', desde: '2025', comisiones: 'Auditoría; Riesgos' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 1,
    voto_remuneracion_pct: 90.0, voto_remuneracion_contra_pct: 9.2, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: 'FY2026', total: 22.57, fijo: 1.5, variable_corto: 4.28, variable_largo: 16.26, ratio_salario_medio: 288 },
    remuneracion: 'El consejero delegado cobró 22,6 M USD en FY2026: 1,5 M de fijo, 4,3 M de variable anual y 16,3 M en acciones [1]. Las acciones por objetivos se ligan al crecimiento del BPA ajustado, a la rentabilidad por dividendo y al flujo libre ajustado, con un modificador de ±20 % por la rentabilidad para el accionista frente al índice sanitario del S&P 500 [1]. Premia el BPA ajustado, que excluye la remuneración ligada a compras y la reestructuración que se repiten: es el punto débil. Ratio frente al empleado mediano (78.316 USD): 288 veces [1]. En la junta de 2025 el voto consultivo sobre la remuneración tuvo ≈ 90 % a favor y 9,2 % en contra [2].',
    accionistas: [
      { nombre: 'Vanguard (Capital Management y Portfolio Management)', pct: 13.6, tipo: 'Institucional', variacion: '7,6 % + 6,0 % (proxy 2026)' },
      { nombre: 'Wellington Management', pct: 6.4, tipo: 'Institucional', variacion: 'Proxy 2026' },
      { nombre: 'State Street', pct: 6.3, tipo: 'Institucional', variacion: 'Proxy 2026' },
      { nombre: 'Consejeros y directivos', pct: 0.3, tipo: 'Internos', variacion: 'Ventas netas de 61,6 M USD en 12 meses' },
    ],
    insiders: [
      { fecha: '2026-08-18', persona: 'Jason M. Hollar (consejero delegado)', operacion: 'Venta', acciones: 124529, importe: 29.38 },
      { fecha: '2026-08-18', persona: 'Aaron E. Alt (director financiero)', operacion: 'Venta', acciones: 44328, importe: 10.45 },
      { fecha: '2026-08-18', persona: 'Stephen M. Mason (GMPD)', operacion: 'Venta', acciones: 35000, importe: 8.27 },
      { fecha: '2026-08-18', persona: 'Jessica L. Mayer (jurídica)', operacion: 'Venta', acciones: 29436, importe: 6.95 },
      { fecha: '2026-08-19', persona: 'Michelle D. Greene (sistemas)', operacion: 'Venta', acciones: 14396, importe: 3.37 },
      { fecha: '2026-02-17', persona: 'Patricia Hemingway Hall (presidenta)', operacion: 'Venta', acciones: 4000, importe: 0.92 },
    ],
    control_y_defensas: 'Sin accionista de control: el mayor es Vanguard (13,6 % sumando sus dos gestoras), seguido de Wellington y State Street [1]. Una acción, un voto; consejo elegido cada año por mayoría; presidenta independiente separada del consejero delegado; 10 de 11 consejeros independientes y todas las comisiones independientes [1]. Sin operaciones vinculadas relevantes [1].',
    alertas: [
      'Ventas de directivos por 61,6 M USD en 12 meses (29,4 M del consejero delegado), ninguna compra y ninguna con plan 10b5-1: casi todas el 18-19 de agosto de 2026, tras la entrega de acciones por objetivos y en máximos [5].',
      'Investigación civil del Departamento de Justicia (antisoborno en consultas de reumatología) y ajustes propuestos por el IRS de ≈ 1.400 M USD más intereses [8].',
      'Cambio de presidente del consejo en marzo de 2026 y de directora de contabilidad en noviembre de 2026 [3, 7].',
    ],
    confianza: 'Alta',
  },
  huecos: [],
  fuentes: fC,
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de CAH, SPY y XLV (precio, rango, rentabilidades, beta, cierres de ejercicio): herramienta bolsa.mjs', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://finance.yahoo.com/quote/CAH/history' },
  { id: 2, titulo: 'Consenso de CAH y comparables (estimaciones de BPA y ventas, objetivos, recomendaciones, precio de la sesión del 19-oct a las 10:04 de Nueva York): quoteSummary', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/CAH/analysis' },
  { id: 3, titulo: 'Cardinal Health: cambios de recomendación y objetivos (UBS 295 USD el 16-oct; RBC, Leerink, JPMorgan, Jefferies…; 19 analistas, objetivo medio 267,50)', editor: 'MarketBeat', tipo: 'Analistas', fecha: '2026-10-16', url: 'https://www.marketbeat.com/stocks/NYSE/CAH/news/' },
  { id: 4, titulo: 'Daily Treasury Par Yield Curve Rates 2026 (10 años: 5,09 % el 16-oct-2026)', editor: 'U.S. Department of the Treasury', tipo: 'Primaria', fecha: '2026-10-16', url: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve&field_tdr_date_value=2026' },
  { id: 5, titulo: 'Implied ERP by month (ERPbymonth.xlsx): octubre de 2026, 4,20 %', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 6, titulo: 'Comparables de distribución farmacéutica (14/15-oct-2026), llevados al precio del 19-oct con la capitalización de Yahoo', editor: 'Repositorio de análisis (sectores/distribucion-farmaceutica-2026-10-15-comparables.json) y Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'sectores/distribucion-farmaceutica-2026-10-15-comparables.json' },
  { id: 7, titulo: 'Form 8-K y carta de intenciones vinculante con CVS Health hasta el 30-jun-2032 (resultados del 1T FY2027 el 5-nov-2026)', editor: 'Cardinal Health, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-10-01', url: `${ED}/000072137126000041/draftcvsloi101v4.htm` },
  { id: 8, titulo: 'Cardinal Health Reports Fourth Quarter and Fiscal Year 2026 Results (guía FY2027)', editor: 'Cardinal Health, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-08-11', url: `${ED}/000072137126000037/a26q4_x063026xex991xnewsre.htm` },
  { id: 9, titulo: 'Titulares de Seeking Alpha sobre CAH (RSS, ago-oct 2026)', editor: 'Seeking Alpha', tipo: 'Prensa', fecha: '2026-10-19', url: 'https://seekingalpha.com/api/sa/combined/CAH.xml' },
  { id: 10, titulo: 'Movimiento del precio de CAH (1-12 meses, máximos, media de 200, avisos P1-P5): herramienta movimiento.mjs', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/CAH/history' },
  { id: 11, titulo: 'Form 4 de directivos (form4.mjs): ventas de 61,6 M USD en 12 meses, sin compras', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-19', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000721371&type=4' },
  { id: 12, titulo: 'Notas de resultados del 1T, 2T y 3T FY2026 (30-oct-2025, 5-feb-2026, 30-abr-2026)', editor: 'Cardinal Health, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-04-30', url: 'https://www.sec.gov/Archives/edgar/data/721371/000072137126000017/a26q3_x033126xex991xnewsre.htm' },
  { id: 13, titulo: 'Form 10-K FY2026 (opioides, Cabell County, Departamento de Justicia, IRS, aranceles)', editor: 'Cardinal Health, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-08-11', url: `${ED}/000072137126000038/cah-20260630.htm` },
  { id: 14, titulo: 'Form 8-K: retiro de Gregory B. Kenny; nueva presidenta Patricia Hemingway Hall', editor: 'Cardinal Health, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-03-23', url: 'https://www.sec.gov/Archives/edgar/data/721371/000072137126000013/finalpressrelease323.htm' },
];
const c = Y.CAH;
const t = Object.fromEntries(c.trend.map((x) => [x.periodo, x]));
const bol = B.bolsa;
// Comparables: los de la ficha sectorial (14/15-oct), llevados al precio de Yahoo del 19-oct con su capitalización.
const FX = { USD: 1, JPY: 0.006318316794931889, CHF: 1.2119890451431274, AUD: 0.6987631916999817 };
const comps = SEC.empresas.filter((e) => e.ticker !== 'CAH').map((e) => {
  const y = Y[e.ticker];
  const capN = y.cap * FX[y.divisa] / 1e6, r = capN / e.capitalizacion;
  const evOld = e.capitalizacion / (1 - (e.dn_ebitda ?? 0) / e.ev_ebitda_ltm), evNew = evOld + e.capitalizacion * (r - 1), k = evNew / evOld;
  return { nombre: e.nombre, ticker: e.ticker, pais: e.pais, capitalizacion: Math.round(capN), ev_ventas: r2(e.ev_ventas * k), ev_ebitda_ltm: r1(e.ev_ebitda_ltm * k), ev_ebitda_ntm: r1(e.ev_ebitda_ntm * k),
    per_ntm: r1(e.per_ntm * r), crecimiento_pct: e.crecimiento_pct, margen_ebitda_pct: e.margen_ebitda_pct, roic_pct: e.roic_pct, dn_ebitda: e.dn_ebitda, fcf_yield_pct: e.fcf_yield_pct == null ? null : r1(e.fcf_yield_pct / r) };
});
// Cencora: de su informe del 15-oct (precio 336,17 USD, PER NTM 17,0) llevado al precio de Yahoo del 19-oct [6].
const rc = Y.COR.precio / 336.17;
comps.unshift({ nombre: 'Cencora', ticker: 'COR', pais: 'US', capitalizacion: Math.round(Y.COR.cap / 1e6), ev_ventas: r2(Y.COR.ev / 1e6 / 332771), ev_ebitda_ltm: null, ev_ebitda_ntm: null, per_ntm: r1(17.0 * rc), crecimiento_pct: 4.4, margen_ebitda_pct: 1.5, roic_pct: 16.7, dn_ebitda: 1.7, fcf_yield_pct: null });
const perMed = (() => { const v = comps.map((x) => x.per_ntm).sort((a, b) => a - b); const n = v.length; return n % 2 ? v[(n - 1) / 2] : (v[n / 2 - 1] + v[n / 2]) / 2; })();
const hora = new Date(c.hora * 1000).toISOString().slice(11, 16);
const D = {
  _estado: `Completa. Precio de cierre del 16-oct-2026 (254,06 USD); la sesión del 19-oct estaba abierta (252,46 USD a las ${hora} UTC). Mediana del PER NTM de los comparables: ${perMed}.`,
  _per_mediana_comparables: perMed,
  identificacion: {
    nombre: 'Cardinal Health, Inc.', nombre_corto: 'Cardinal Health', ticker: 'CAH', isin: 'US14149Y1082', mercado: 'Bolsa de Nueva York (NYSE)', indice_referencia: 'S&P 500',
    pais: 'Estados Unidos', pais_iso: 'US', sector: 'Salud', industria: 'Distribuidores sanitarios', sede: 'Dublin (Ohio)', fundacion: '1971', empleados: 63900, web: 'https://www.cardinalhealth.com',
    precio: B.identificacion.precio, fecha_precio: B.identificacion.fecha_precio, acciones: 232.6, capitalizacion_publicada: Math.round(c.cap / 1e6), free_float_pct: 99.7,
    max_52s: B.identificacion.max_52s, min_52s: B.identificacion.min_52s, volumen_medio_diario: `≈ ${Math.round(B.volumen_3m.importe_dia_millones)} M USD/día (3 meses)`, proximos_resultados: '2026-11-05',
  },
  consenso: {
    guidance: 'Guía de FY2027 (a 30-jun-2027), dada el 11-ago-2026 y reafirmada el 1-oct-2026: BPA ajustado de 12,40-12,60 USD (+13-15 % sobre 10,95), farmacéutico ventas +3-5 % y resultado +8-11 %, GMPD resultado de 200-220 M, «Otros» resultado +15-18 %, intereses y otros 240-290 M, tipo del 19-20 %, ≈ 233 M de acciones, recompras de al menos 1.000 M, inversión ≈ 700 M y flujo libre ajustado de 3.500-4.000 M [8, 7]. Objetivo a largo plazo: BPA ajustado +12-14 % anual [8].',
    estimaciones: [
      { periodo: 'FY2027e', ingresos: Math.round(t['0y'].ventas / 1e6), ebitda: null, ebit: null, bpa: r2(t['0y'].bpa), dpa: 2.07, fuente: `Yahoo Finance, ${t['0y'].n} analistas [2]` },
      { periodo: 'FY2028e', ingresos: Math.round(t['+1y'].ventas / 1e6), ebitda: null, ebit: null, bpa: r2(t['+1y'].bpa), dpa: null, fuente: `Yahoo Finance, ${t['+1y'].n} analistas [2]` },
    ],
    recomendaciones: { n_analistas: c.reco.strongBuy + c.reco.buy + c.reco.hold + c.reco.sell + c.reco.strongSell, comprar: c.reco.strongBuy + c.reco.buy, mantener: c.reco.hold, vender: c.reco.sell + c.reco.strongSell, po_medio: r2(c.po_medio), po_min: c.po_min, po_max: c.po_max },
    revisiones: `El BPA de FY2027 del consenso subió de ${n2(r2(t['0y'].bpa_hace90))} USD hace 90 días a ${n2(r2(t['0y'].bpa))} hoy y el de FY2028 de ${n2(r2(t['+1y'].bpa_hace90))} a ${n2(r2(t['+1y'].bpa))}, tras la guía del 11-ago [2, 8]. Los objetivos de precio suben: UBS 280 → 295 USD el 16-oct, RBC empezó con «mejor que el mercado» y 276 en agosto, Leerink 292, JPMorgan 215 → 260 (neutral), BofA 240 → 260 en julio; Zacks bajó de «compra fuerte» a «mantener» en junio [3]. MarketBeat da 19 analistas (16 comprar, 3 mantener) con un objetivo medio de 267,50 USD; Yahoo, ${c.n_analistas} objetivos con media ${n2(r2(c.po_medio))} USD (235-295) [3, 2]. Sin consenso gratuito de FY2029.`,
    base_ebitda: 'sin consenso de EBITDA (solo BPA y ventas)', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    ...bol,
    beta: bol.beta, posicion_corta_pct: r1(c.corto_pct * 100),
    comentario: 'La acción ha batido al índice en el último año y en tres, no en diez: rentabilidad total del +64,0 % en 12 meses, +41,9 % anual en tres años y +16,1 % anual en diez [1]. Lo explica el BPA ajustado (+19 % anual entre FY2023 y FY2026) más la subida del múltiplo, del ≈ 9x adelantado en 2022 a ≈ 20x hoy [1, 8]. Beta baja (0,53 mensual a cinco años; 0,69 ajustada) y volatilidad del 29 % en el último año, alta para un distribuidor por los saltos en resultados (+15,4 % el 30-oct-2025) y la caída de mayo de 2026 (−15 % en un mes) [1, 10].',
    contexto: {
      movimiento: { fecha: '2026-10-19', var_1m_pct: 12.0, var_3m_pct: 11.2, var_6m_pct: 19.5, var_12m_pct: 64.7, dist_max_52s_pct: -0.6, dist_min_52s_pct: 61.4, dist_max_historico_pct: -0.6, tendencia: 'alcista', volatilidad_60d_pct: 23.0, avisos: [] },
      movimientos_fuertes: [
        { periodo: 'oct-nov 2025', var_pct: 15.4, causa: 'Resultados del 1T FY2026 (30-oct-2025): BPA ajustado de 2,55 USD (+36 %) y guía subida a 9,65-9,85; +15,4 % ese día [12, 9].', veredicto: 'no cambia', condicion: null },
        { periodo: 'feb 2026', var_pct: 9.8, causa: 'Resultados del 2T FY2026 (5-feb-2026): BPA de 2,63 USD y guía subida a 10,15-10,35; −5,1 % el día anterior con el sector y +9,8 % el 5-feb [12].', veredicto: 'no cambia', condicion: null },
        { periodo: 'may 2026', var_pct: -15.3, causa: 'Pese a batir en el 3T (3,17 USD frente a 2,79), −4,9 % el 30-abr por la guía de GMPD y los aranceles, y caída del sector el 6/7-may (Cencora rebajó su guía de ingresos por bajadas de precio de marcas); mínimo del mes el 11-may [12, 9].', veredicto: 'no cambia', condicion: null },
        { periodo: 'may-jul 2026', var_pct: 22.6, causa: 'Recuperación sin nota de la empresa: rebote del sector tras la caída de mayo y fallo del Supremo contra los aranceles IEEPA (devoluciones a importadores); causa concreta no encontrada en tres búsquedas (8-K, titulares de Seeking Alpha, MarketBeat) [9, 3].', veredicto: 'no cambia', condicion: null },
        { periodo: 'ago 2026', var_pct: 6.0, causa: 'Resultados de FY2026 y guía de FY2027 por encima del objetivo a largo plazo (11-ago): máximo de 52 semanas de 258,30 USD ese día; ampliación de recompras en 5.000 M [8, 9].', veredicto: 'no cambia', condicion: null },
        { periodo: 'oct 2026', var_pct: 12.0, causa: 'Carta de intenciones vinculante con CVS hasta 2032 (1-oct, +3,4 %: quita el mayor riesgo de cliente) y subidas de objetivos (UBS 295 USD el 16-oct) [7, 3].', veredicto: 'no cambia', condicion: null },
      ],
      noticias: [
        { fecha: '2026-10-01', tipo: 'resultados', hecho: 'Carta de intenciones vinculante para extender la distribución a CVS (28 % de las ventas) hasta el 30-jun-2032; guía de FY2027 reafirmada; resultados del 1T FY2027 el 5-nov [7].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-16', tipo: 'recomendación', hecho: 'UBS sube el objetivo de 280 a 295 USD; objetivo medio de los analistas ≈ 267-271 USD, un 5-7 % sobre el precio [3, 2].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-08-18', tipo: 'directivos', hecho: 'Ventas de directivos por 61,6 M USD en 12 meses (29,4 M del consejero delegado) tras la entrega de acciones por objetivos, sin planes 10b5-1 y sin compras [11].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-08-11', tipo: 'resultados', hecho: 'FY2026: BPA ajustado de 11,26 USD (10,95 sin IEEPA); guía de FY2027 12,40-12,60 y ampliación de recompras en 5.000 M [8].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-08-07', tipo: 'deuda o capital', hecho: 'Nueva línea de crédito de 4.000 M USD hasta 2031 [13].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-04-30', tipo: 'resultados', hecho: 'Deterioro de 184 M USD del fondo de comercio de Navista e ION (oncología comprada en 2024) [12].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-03-20', tipo: 'directivos', hecho: 'Retiro del presidente del consejo (Gregory Kenny); le sustituye Patricia Hemingway Hall, independiente [14].', veredicto: 'no cambia', condicion: null },
        { fecha: '2025-10-01', tipo: 'demanda o regulador', hecho: 'El Cuarto Circuito anula la sentencia favorable a los distribuidores en Cabell County/Huntington (opioides); sigue pendiente, sin fecha [13].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-11-05', tipo: 'resultados', hecho: 'Resultados del 1T FY2027 el 5-nov-2026 [7].', veredicto: 'no cambia', condicion: null },
      ],
      proximos_resultados: '2026-11-05',
      veredicto: 'no cambia',
      condicion: null,
      comentario: 'La acción está a un 0,6 % de su máximo histórico tras subir un 12 % en un mes y un 65 % en un año; no salta ningún aviso P de la herramienta (la subida de tres meses es del 11 %). La subida tiene causa en hechos de la empresa (resultados que baten, guía de FY2027 por encima del objetivo a largo plazo, CVS hasta 2032), no en especulación [8, 7]. El único tramo sin causa encontrada (mayo-julio de 2026, +23 %) recupera la caída de mayo. No hay colocaciones, ampliaciones ni decisiones judiciales con fecha que puedan mover el precio más de un 5 % en contra: Cabell County, el Departamento de Justicia y el IRS no tienen fecha. Los resultados del 5-nov no retrasan nada (regla 11). Veredicto: no cambia.',
    },
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: B.cierres_ejercicio.filter((x) => ['FY2021', 'FY2022', 'FY2023', 'FY2024', 'FY2025', 'FY2026'].includes(x.anio)).map((x) => ({ anio: x.anio, precio_cierre: x.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: x.anio === 'FY2022' })),
    comentario: 'Precio de cierre de cada ejercicio (30 de junio) de Yahoo [1]. El PER de los últimos 12 meses con el BPA GAAP no sirve en FY2022 (pérdida por los deterioros de GMPD): se excluye; en FY2023 el BPA GAAP (1,26 USD) también está deformado por los deterioros. En base ajustada adelantada (la de la regla a 12 meses), el múltiplo pasó de ≈ 9 veces en junio de 2022 a 19 en junio de 2026 y ≈ 20 hoy: el mercado ha revalorizado el negocio por la recuperación de GMPD, la especialidad, el fin de la incertidumbre de opioides y un crecimiento del BPA del 12-14 % anual frente al 0-5 % de 2018-2022.',
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Los otros dos grandes distribuidores de EE. UU. (McKesson y Cencora), un distribuidor sanitario de EE. UU. con más margen (Henry Schein), tres mayoristas japoneses (Medipal, Alfresa, Suzuken), uno suizo (Galenica) y uno australiano (EBOS) [6]. Solo McKesson y Cencora son comparables de verdad (mismo mercado, mismos clientes, mismo circulante negativo); los japoneses y europeos operan en mercados de precios regulados con más caja y menos crecimiento. No se incluyen fabricantes de productos médicos (GMPD es el 5 % de las ventas).',
    empresas: comps,
    comentario: `Cardinal cotiza a ≈ 20x el BPA ajustado de los próximos 12 meses, al nivel de McKesson (${n2(comps.find((x) => x.ticker === 'MCK').per_ntm)}x) y por encima de Cencora (${n2(comps[0].per_ntm)}x) [2, 6]. Hace dos años cotizaba con descuento frente a los dos por GMPD y los opioides; hoy el mercado le paga lo mismo que a McKesson, con un crecimiento guiado parecido (+13-15 % en FY2027) pero más concentración en un cliente (CVS 28 %). Frente a los mayoristas japoneses (13-18x con caja neta), la prima refleja el ROIC y el crecimiento. Múltiplo de referencia: la mediana de los comparables (${n2(perMed)}x), que el motor usa en el alcista; el EV/EBITDA se mira con cuidado porque el de Cencora no está en la misma base.`,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2025-11', objetivo: 'Solaris Health (urología, mayoría)', comprador: 'Cardinal Health', ev: 1900, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Precio de compra; sin EBITDA publicado [13].' },
      { fecha: '2025-01', objetivo: 'GI Alliance (73 %)', comprador: 'Cardinal Health', ev: r1(2800 / 0.73), ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '2.800 M USD por el 73 %; valor del 100 % por extrapolación [13].' },
      { fecha: '2024-12', objetivo: 'Integrated Oncology Network', comprador: 'Cardinal Health', ev: 1100, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Deteriorada en parte en el 3T26 [12].' },
      { fecha: '2025-04', objetivo: 'Advanced Diabetes Supply', comprador: 'Cardinal Health', ev: 1000, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Material para diabetes a domicilio [13].' },
      { fecha: '2026-10', objetivo: 'Option Care Health (100 %, con McKesson al 49 %)', comprador: 'CD&R y McKesson', ev: 5800, ev_ventas: null, ev_ebitda: 14.3, prima_pct: 37, excluir: false, comentario: 'Referencia de lo que paga un rival por servicios de infusión (informe de McKesson del 19-oct).' },
    ],
    comentario: 'Las compras del sector se hacen por consultas médicas y servicios de especialidad, casi nunca con EBITDA publicado: sirven para saber a qué precio compra Cardinal, no para valorarla. Con ≈ 59.000 M USD de capitalización y sin accionista de control, Cardinal no es objetivo realista de una compra; su valor de control no es relevante.',
    confianza: 'Baja',
  },
  huecos: [
    { seccion: 'consenso', campo: 'EBITDA y BPA de FY2029e del consenso', tipo: 'Complemento', intentos: '1) Yahoo quoteSummary (solo dos ejercicios); 2) MarketBeat (solo el año en curso y el siguiente); 3) MarketScreener no abre sin sesión', decision: 'Omitido' },
    { seccion: 'bolsa', campo: 'causa de la subida de mayo-julio de 2026', tipo: 'Complemento', intentos: '1) 8-K de la empresa de mayo-julio de 2026 (ninguno con hechos de negocio); 2) titulares de Seeking Alpha (RSS); 3) noticias de MarketBeat', decision: 'Se explica como rebote del sector, sin causa concreta' },
  ],
  fuentes: fD,
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Stocktwits, flujo de mensajes de $CAH (ago-oct 2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-19', url: 'https://api.stocktwits.com/api/2/streams/symbol/CAH.json' },
  { id: 2, titulo: 'Seeking Alpha: artículos y titulares sobre CAH (ago-oct 2026: «I\'m Still Buying After Checking The Numbers», «Precision Medicine Drives A Sustained Revenue Growth Path», «Q4 Presents Positive Signal»)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-19', url: 'https://seekingalpha.com/symbol/CAH/analysis' },
  { id: 3, titulo: 'MarketBeat: alertas y comentarios sobre Cardinal Health (ago-oct 2026)', editor: 'MarketBeat', tipo: 'Foros y redes', fecha: '2026-10-16', url: 'https://www.marketbeat.com/stocks/NYSE/CAH/news/' },
];
const E = {
  _estado: 'Completa. Stocktwits (30 mensajes del 14-ago al 19-oct-2026) y titulares de Seeking Alpha; Reddit no abre.',
  sentimiento: {
    tono: 'Positivo', tendencia: 'Estable',
    revisadas: [
      { plataforma: 'Stocktwits ($CAH)', fecha: '2026-10', n_comentarios: 30, tono: 'Positivo', resumen: '7 mensajes marcados alcistas y ninguno bajista: celebran el máximo histórico y el acuerdo con CVS («evento que despeja», según BofA); un servicio de opciones abre posiciones cortas y otros avisan de las ventas de directivos del 18-19 de agosto [1].' },
      { plataforma: 'Seeking Alpha (artículos y titulares)', fecha: '2026-10', n_comentarios: 6, tono: 'Positivo', resumen: 'Artículos alcistas («sigo comprando», especialidad y medicina de precisión, señal positiva del 4T) y la nota de RBC por los servicios de más margen; ninguno bajista en tres meses [2].' },
      { plataforma: 'MarketBeat', fecha: '2026-10', n_comentarios: 5, tono: 'Positivo', resumen: 'Alertas de máximos y subidas de objetivo; las ventas de directivos aparecen sin debate [3].' },
    ],
    temas: [
      { tema: 'CVS hasta 2032 como «evento que despeja»', postura: 'Alcista', peso: 'Alto', contraste: 'Correcto en lo esencial (CVS es el 28 % de las ventas), pero es una carta de intenciones: el contrato definitivo y sus condiciones no se conocen [1].' },
      { tema: 'Especialidad y servicios de más margen', postura: 'Alcista', peso: 'Alto', contraste: 'Los datos lo apoyan (especialidad +25 %, «Otros» +37 %), pero hubo un deterioro de 184 M en oncología comprada [2].' },
      { tema: 'Ventas de directivos en máximos', postura: 'Bajista', peso: 'Medio', contraste: 'Son ventas tras la entrega de acciones por objetivos, habituales, pero importantes (61,6 M USD) y sin ninguna compra [1].' },
      { tema: 'Valoración tras subir un 65 % en un año', postura: 'Dividida', peso: 'Medio', contraste: 'Es el punto clave del informe: la regla a 12 meses da rentabilidad negativa por el múltiplo, no por el negocio [1].' },
    ],
    lectura: 'El sentimiento es claramente positivo: los particulares y los autores de Seeking Alpha ven a Cardinal como valor defensivo con crecimiento, en máximos, y lo acompañan los analistas (14 de 17 comprar) [1, 2]. No hay capitulación ni miedo que aprovechar; el único ruido en contra son las ventas de directivos y algunos cortos de opciones. No anticipa ningún riesgo que el informe no tenga; lo que señala es que la valoración ya no es el argumento de compra. Opiniones, no datos: ninguna cifra sale de aquí.',
    confianza: 'Media',
  },
  huecos: [],
  fuentes: fE,
};
guarda('E', E);
console.log('Notas A-E escritas. Mediana PER comparables:', perMed, comps.map((x) => `${x.ticker} ${x.per_ntm}`).join(', '));
