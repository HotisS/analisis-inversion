// Escribe las notas A-E de McKesson (corte 2026-10-19) a partir de los documentos de notas/docs (EDGAR), del XBRL de la
// SEC (cuentas-xbrl.json), de bolsa.json, de yahoo-datos.json (Yahoo quoteSummary del 16/19-oct-2026) y de la ficha
// sectorial de distribución farmacéutica (15-oct-2026). Cada nota cita solo con [n] de su propia lista de fuentes.
// Ejecutar: node informes/mckesson-2026-10-19/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const raiz = path.join(dir, '..', '..', '..');
const lee = (f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const r1 = (x) => (x == null ? null : Math.round(x * 10) / 10);
const r2 = (x) => (x == null ? null : Math.round(x * 100) / 100);
const X = lee('cuentas-xbrl.json');
const B = lee('bolsa.json');
const Y = lee('yahoo-datos.json').datos;
const SEC = JSON.parse(fs.readFileSync(path.join(raiz, 'sectores', 'distribucion-farmaceutica-2026-10-15-comparables.json'), 'utf8'));
const ED = 'https://www.sec.gov/Archives/edgar/data/927653';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Form 10-K del ejercicio FY2026 (cerrado el 31-mar-2026): cuentas, segmentos, clientes, deuda, opioides, riesgos', editor: 'McKesson Corporation (SEC)', tipo: 'Primaria', fecha: '2026-05-08', url: `${ED}/000092765326000069/mck-20260331.htm` },
  { id: 2, titulo: 'McKesson Reports Fiscal 2026 Fourth Quarter and Full Year Results (conciliación GAAP-ajustado, guía FY2027 y objetivos a largo plazo)', editor: 'McKesson Corporation (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-05-07', url: `${ED}/000092765326000066/mck_exhibit991x3312026.htm` },
  { id: 3, titulo: 'McKesson Reports Fiscal 2027 First Quarter Results and Raises Full Year Adjusted EPS Guidance', editor: 'McKesson Corporation (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-08-05', url: `${ED}/000092765326000232/mck_exhibit991x6302026.htm` },
  { id: 4, titulo: 'Form 10-Q del 1T FY2027 (30-jun-2026): balance, deuda, Apollo en Medical-Surgical, minoritarios rescatables', editor: 'McKesson Corporation (SEC)', tipo: 'Primaria', fecha: '2026-08-05', url: `${ED}/000092765326000234/mck-20260630.htm` },
  { id: 5, titulo: 'McKesson Reports Fiscal 2025 Fourth Quarter and Full Year Results (BPA ajustado 33,05 USD; guía FY2026)', editor: 'McKesson Corporation (SEC, 8-K)', tipo: 'Primaria', fecha: '2025-05-08', url: `${ED}/000092765325000034/mck_exhibit991x3312025.htm` },
  { id: 6, titulo: 'McKesson Reports Fiscal 2024 Fourth Quarter and Full Year Results (BPA ajustado 27,44 USD)', editor: 'McKesson Corporation (SEC, 8-K)', tipo: 'Primaria', fecha: '2024-05-07', url: `${ED}/000092765324000033/mck_exhibit991x3312024.htm` },
  { id: 7, titulo: 'McKesson Reports Fiscal 2023 Fourth Quarter and Full Year Results (BPA ajustado 25,94 USD)', editor: 'McKesson Corporation (SEC, 8-K)', tipo: 'Primaria', fecha: '2023-05-08', url: `${ED}/000092765323000036/mck_exhibit991x3312023.htm` },
  { id: 8, titulo: 'McKesson Reports Fiscal 2022 Fourth Quarter and Full Year Results (BPA ajustado 23,69 USD)', editor: 'McKesson Corporation (SEC, 8-K)', tipo: 'Primaria', fecha: '2022-05-05', url: `${ED}/000092765322000047/mck_exhibit991x3312022.htm` },
  { id: 9, titulo: 'McKesson Reports Fiscal 2021 Fourth Quarter and Full Year Results (cargo de opioides de 8.100 M; BPA ajustado 17,21 USD)', editor: 'McKesson Corporation (SEC, 8-K)', tipo: 'Primaria', fecha: '2021-05-06', url: `${ED}/000092765321000033/mck_exhibit991x3312021.htm` },
  { id: 10, titulo: 'McKesson Reports Fiscal 2020 Fourth Quarter and Full Year Results (BPA ajustado 14,95 USD)', editor: 'McKesson Corporation (SEC, 8-K)', tipo: 'Primaria', fecha: '2020-05-20', url: `${ED}/000092765320000028/mckexhibit9913312020.htm` },
  { id: 11, titulo: 'McKesson Reports Fiscal 2019 Fourth Quarter and Full Year Results (BPA ajustado 13,57 USD)', editor: 'McKesson Corporation (SEC, 8-K)', tipo: 'Primaria', fecha: '2019-05-08', url: `${ED}/000119312519140444/d743681dex991.htm` },
  { id: 12, titulo: 'McKesson Reports Fiscal 2018 Fourth Quarter and Full Year Results (BPA ajustado 12,62 USD)', editor: 'McKesson Corporation (SEC, 8-K)', tipo: 'Primaria', fecha: '2018-05-24', url: `${ED}/000119312518172737/d576052dex991.htm` },
  { id: 13, titulo: 'Supplemental historical segment financial information (nuevos segmentos, FY2024-FY2025 y trimestres)', editor: 'McKesson Corporation (SEC, 8-K)', tipo: 'Primaria', fecha: '2025-09-18', url: `${ED}/000092765325000121/mck_ex991resegementation.htm` },
  { id: 14, titulo: 'XBRL company facts de McKesson (amortizaciones, software capitalizado, deuda, minoritarios rescatables)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-19', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0000927653.json' },
  { id: 15, titulo: 'McKesson Reports Fiscal 2026 Second Quarter Results (guía 38,35-38,85 USD)', editor: 'McKesson Corporation (SEC, 8-K)', tipo: 'Primaria', fecha: '2025-11-05', url: `${ED}/000092765325000138/mck_exhibit991x9302025.htm` },
  { id: 16, titulo: 'McKesson Reports Fiscal 2026 Third Quarter Results (guía 38,80-39,20 USD)', editor: 'McKesson Corporation (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-02-04', url: `${ED}/000092765326000015/mck_exhibit991x12312025.htm` },
  { id: 17, titulo: 'McKesson Reports Fiscal 2026 First Quarter Results', editor: 'McKesson Corporation (SEC, 8-K)', tipo: 'Primaria', fecha: '2025-08-06', url: `${ED}/000092765325000105/mck_exhibit991x6302025.htm` },
  { id: 18, titulo: 'McKesson (MCK) Q4 2026 Earnings Call Transcript (guía detallada de FY2027 por segmento)', editor: 'The Motley Fool', tipo: 'Prensa', fecha: '2026-05-08', url: 'https://fool.com/earnings/call-transcripts/2026/05/08/mckesson-mck-q4-2026-earnings-transcript/' },
  { id: 19, titulo: 'McKesson Corporation Highlights Strategic Growth Strategies and Unveils Updated Long-Term Financial Targets at Investor Day', editor: 'McKesson Corporation (SEC, 8-K)', tipo: 'Primaria', fecha: '2025-09-23', url: `${ED}/000092765325000125/mck_ex991investordaypressr.htm` },
];

// Ajustados por ejercicio [9, 8, 7, 6, 5, 2]: resultado operativo ajustado (margen bruto ajustado − gastos operativos
// ajustados, sin otros ingresos) y amortización de intangibles comprados [14].
const ADJ_OI = { 2021: 11932 - 8267, 2022: 13208 - 8577, 2023: 12230 - 7504, 2024: 12427 - 7658, 2025: 13036 - 7749, 2026: 14322 - 8093 };
const AMORT_INT = { 2021: 422, 2022: 332, 2023: 236, 2024: 249, 2025: 226, 2026: 276 };
const DA = { 2021: 887, 2022: 760, 2023: 608, 2024: 635, 2025: 636, 2026: 729 }; // DepreciationAndAmortization (flujos)
const GF = { 2021: 217, 2022: 178, 2023: 248, 2024: 252, 2025: 265, 2026: 247 };
const SOFT = { 2021: 190, 2022: 147, 2023: 168, 2024: 256, 2025: 322, 2026: 309 };
const PPE = { 2021: 451, 2022: 388, 2023: 390, 2024: 431, 2025: 537, 2026: 436 };
const DESINV = { 2021: 400, 2022: 578, 2023: 1077, 2024: 47, 2025: 179, 2026: 830 };
const RNCI = { 2021: 1271, 2022: 0, 2023: 0, 2024: 0, 2025: 0, 2026: 943 };
const anios = ['2021', '2022', '2023', '2024', '2025', '2026'];
const cuenta = X.financieros.cuenta.filter((c) => anios.includes(c.periodo.replace('FY', ''))).map((c) => {
  const a = c.periodo.replace('FY', '');
  const o = { ...c, periodo: 'FY' + a, amortizaciones: DA[a], ebitda: c.ebit + DA[a], gastos_financieros: GF[a], participadas_en_ebitda: null,
    no_recurrentes_en_ebitda: ADJ_OI[a] - c.ebit - AMORT_INT[a], dpa_extraordinario: 0 };
  delete o.fin; return o;
});
const balance = X.balance.historico.filter((b) => anios.includes(b.periodo.replace('FY', ''))).map((b) => {
  const a = b.periodo.replace('FY', '');
  const o = { ...b, periodo: 'FY' + a, arrendamientos: 0, minoritarios: (b.minoritarios ?? 0) + RNCI[a], activos_contrato: null, pasivos_contrato: null };
  delete o.fin; return o;
});
const flujos = X.flujos.historico.filter((f) => anios.includes(f.periodo.replace('FY', ''))).map((f) => {
  const a = f.periodo.replace('FY', '');
  const o = { ...f, periodo: 'FY' + a, capex: PPE[a] + SOFT[a], desinversiones: DESINV[a], emision_acciones: 0, pagos_arrendamientos: f.pagos_arrendamientos ?? 0 };
  delete o.fin; return o;
});
// LTM a 30-jun-2026 = FY2026 + 1T FY2027 − 1T FY2026 [2, 3].
const ltm = { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 410983, ebitda: 6495 + 767, ebit: 6495, beneficio_neto: 4592, bpa: 37.28, dpa: 3.28, dpa_extraordinario: 0, fcf: 6145,
  participadas_en_ebitda: null, no_recurrentes_en_ebitda: (6229 + 1587 - 1360) - 6495 - 300 };

const trim = (p, ing, g, ebitda, bpa, vs) => ({ periodo: p, ingresos: ing, crecimiento_pct: g, crecimiento_organico_pct: null, ebitda, margen_ebitda_pct: r2(ebitda / ing * 100), bpa, vs_consenso: vs });
const A = {
  _estado: 'Completa. Cuentas del XBRL de la SEC comprobadas con el 10-K FY2026 y las notas de resultados; amortizaciones = depreciación + amortización del estado de flujos (el XBRL daba solo 287 M); capex = inmovilizado + software capitalizado; minoritarios = participaciones + minoritarios rescatables; no recurrentes = resultado operativo ajustado − GAAP − amortización de intangibles comprados.',
  financieros: {
    cuenta, ltm,
    cambios_perimetro: [
      { periodo: 'FY2026', descripcion: 'Core Ventures (Florida Cancer Specialists, 70 % por 2.500 M USD) desde el 2-jun-2025 y PRISM Vision (80 % por 875 M) desde el 1-abr-2025: diez y doce meses en la cuenta; venta de Noruega (ene-2026), último negocio europeo.' },
      { periodo: 'FY2023', descripcion: 'Venta de los negocios europeos (Alemania, Austria, Bélgica, Francia, Italia, Irlanda, Portugal, Reino Unido) entre 2021 y 2023: ingresos y balance de FY2021-FY2022 los incluyen.' },
    ],
    comentario: 'Los ingresos pasaron de 238.228 M USD en FY2021 a 403.430 M en FY2026 (TCAC del 11,1 %) [1, 9], pese a vender casi toda Europa: el motor es el volumen de recetas de EE. UU., los fármacos de especialidad y los GLP-1, y desde FY2026 las consultas de oncología y retina compradas (Core Ventures y PRISM) [1, 2]. El margen bruto es mínimo (3,61 % GAAP en FY2026) porque el grueso son medicamentos de marca revendidos con una comisión pactada [2]. El resultado operativo ajustado creció de 3.665 M en FY2021 a 6.229 M en FY2026 (TCAC del 11,2 %), y el margen ajustado sobre ventas se mantuvo en el 1,5-1,8 % [9, 2]: lo que sube la mezcla de oncología (margen ajustado del 2,96 %) y de soluciones tecnológicas de recetas (19,45 %) lo compensa la dilución de los GLP-1, de margen casi nulo [2]. Años no comparables: FY2021 (cargo de opioides de 8.100 M) y FY2022 (salida de Europa) [9, 8].',
    ajustes: 'La empresa publica un BPA ajustado que excluye la amortización de intangibles comprados (276 M USD en FY2026), los costes de transacciones y su revalorización de minoritarios (−251 M netos en FY2026 por plusvalías de ventas), el crédito o cargo LIFO (crédito de 210 M en FY2026, cargo de 82 M en FY2025), las ganancias de demandas antimonopolio (23 M; 444 M en FY2025), la reestructuración y deterioros (245 M; 344 M) y los cargos de litigios de opioides (108 M en FY2025) [2, 5]. En FY2026 el BPA GAAP (38,38 USD) y el ajustado (39,11) casi coinciden porque las plusvalías y el crédito LIFO compensaron la reestructuración [2]. La reestructuración se repite todos los años (245-344 M): el DCF resta 0,05 puntos de margen por ella.',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      trim('2T25', 93651, null, 1257 + 103, 7.07, null),
      trim('3T25', 95294, null, 1394 + 103, 8.03, null),
      trim('4T25', 90823, 19.0, 1503 + 103, 10.12, null),
      trim('1T26', 97827, 23.4, 1360 + 113, 8.26, null),
      trim('2T26', 103150, 10.1, 1570 + 113, 9.86, null),
      trim('3T26', 106158, 11.4, 1578 + 113, 9.34, 'Superior'),
      trim('4T26', 96295, 6.0, 1721 + 113, 11.69, 'Superior'),
      trim('1T27', 105380, 7.7, 1587 + 121, 9.93, 'Superior'),
    ],
    ultima_presentacion: 'Trimestres fiscales (el 1T27 es abr-jun 2026). EBITDA ajustado = resultado operativo ajustado + depreciación y amortización de software (estimación propia: el reparto trimestral de la amortización es la media del año) y BPA ajustado de la empresa [3, 2, 16, 15, 17, 5]. En la presentación de FY2026 (7-may-2026) la dirección guió para FY2027 ingresos +5-9 %, resultado operativo ajustado +8-12 %, flujo libre de 4.500-4.900 M, recompras de ≈ 5.000 M, 116-118 M de acciones, intereses de 380-420 M, minoritarios de 295-325 M y un tipo del 17-19 % [18]. Las preguntas de los analistas se centraron en el frenazo de ingresos de soluciones tecnológicas (logística para laboratorios, ≈ 55 % del segmento), en cuánto del crecimiento de oncología es orgánico y en GLP-1 y biosimilares; la dirección no cuantificó el efecto de los biosimilares ni el de los GLP-1 en el negocio de autorizaciones previas, ni desglosó la caída del flujo libre [18]. En el 1T27 (5-ago-2026) batió (BPA ajustado 9,93 USD, +20 %), subió la guía a 44,20-45,00 USD y la del resultado operativo a +9-13 % [3]. Las bajadas de precio de lista de marcas de enero de 2026 restaron ventas pero, según la dirección, no margen, porque más del 95 % de la distribución de marcas cobra una comisión por servicio [3].',
    confianza: 'Alta',
  },
  balance: {
    historico: balance,
    vencimientos: [
      { anio: 'FY2027', importe: 1267 }, { anio: 'FY2028', importe: 390 }, { anio: 'FY2029', importe: 1030 }, { anio: 'FY2030', importe: 723 },
      { anio: 'FY2031', importe: 676 }, { anio: 'FY2032+', importe: 2440 },
    ],
    liquidez: 'Caja de 5.164 M USD a 30-jun-2026; línea sindicada no dispuesta de 5.000 M (abril de 2026, cinco años) que respalda los pagarés; Medical-Surgical tiene su propia línea de 1.000 M [1, 4].',
    rating: 'Grado de inversión (nota de S&P, Moody\'s y Fitch sin comprobar en fuente primaria)',
    coste_deuda_pct: 4.3,
    vida_media_anios: 6.0,
    otros_pasivos: 'El pasivo por opioides (acuerdo nacional de 2022 con 48 estados y acuerdos con Alabama, subdivisiones de Virginia Occidental y tribus) era de 5.692 M USD a 31-mar-2026 (601 M a corto) y 5.658 M a 30-jun-2026, a pagar hasta 2038 (512 M pagados en FY2026) [1, 4]. Siguen abiertos el caso de Baltimore (sentencia de 109 M anulada por el Supremo de Maryland el 24-abr-2026 y devuelta al tribunal), el de Cabell County y Huntington (reabierto en apelación el 28-oct-2025) y demandas de subdivisiones y privados no incluidas en el acuerdo [1]. Minoritarios rescatables de 2.563 M a 30-jun-2026: Apollo (≈ 13 % de Medical-Surgical por 1.250 M), Core Ventures (30 %) y PRISM (20 %), con opciones de venta [4]. Operaciones pendientes: Precision Medicine Group (≈ 2.250 M en caja) y 49 % de Option Care Health (≈ 1.400 M).',
    comentario: 'El circulante comercial es negativo y crece en valor absoluto: existencias + clientes − proveedores = −7.781 M USD en FY2026 (−1,9 % de las ventas) [1]; los proveedores (59.973 M) financian existencias y cobros, así que crecer libera caja. El patrimonio es negativo (−2.172 M) por las recompras: 32.005 M de autocartera acumulada [2]. La deuda bruta subió de 6.526 M en marzo a 9.729 M en junio de 2026 por los préstamos de Medical-Surgical (1.000 M de tramo A y 2.250 M de tramo B), destinados a recompras y a la futura sociedad separada [4]. Con la caja, la deuda neta es de 4.565 M, ≈ 0,6 veces el EBITDA ajustado; con el pasivo de opioides después de impuestos, ≈ 1,2 veces.',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'El flujo operativo depende del calendario de cobros y pagos: 6.085 M USD en FY2025 y 6.155 M en FY2026 frente a un beneficio ajustado de 4.853 M en FY2026 [1, 2]. El flujo libre de la empresa (operativo − inmovilizado − software) fue de 5.410 M en FY2026 [2]; la guía de FY2027 es menor, 4.500-4.900 M, por el calendario del circulante y más inversión [18]. En el 1T27 fue de −372 M, estacional [3]. La inversión es mínima: 745 M en FY2026 (0,18 % de las ventas), algo más de la mitad en software [1]. Los pagos de opioides (≈ 500 M al año) van en el flujo operativo. La caja se ha ido a recompras (4.750 M en FY2026 y 2.530 M en el 1T27) y a compras de consultas (3.416 M en FY2026) [1, 3].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'Deloitte & Touche LLP', anios_auditor: null, opinion: 'Favorable (sin salvedades) en FY2026, también sobre el control interno [1]',
    comentario: 'Las cuentas son limpias pero el BPA publicado ha sido muy ruidoso: pérdida de 28,26 USD por acción en FY2021 por el cargo de opioides de 8.100 M, plusvalías y deterioros por la salida de Europa y de Change Healthcare, y la venta de Rexall en Canadá con una pérdida de 667 M en FY2025 [9, 1]. El ajustado excluye partidas que se repiten (reestructuración de 245-344 M al año, amortización de compras) y otras que no (LIFO, demandas antimonopolio) [2, 5]. Señal reciente: la revalorización de los minoritarios rescatables (293 M de Medical-Surgical y 81 M de Core Ventures en el 1T27) va contra el beneficio atribuido GAAP y fuera del ajustado [3]. Asunto crítico de auditoría: la posición fiscal incierta de los pagos de opioides [1]. Los indicadores del motor (Altman, Beneish) pierden sentido con patrimonio negativo y circulante negativo; se leen con cuidado.',
    senales: [
      { senal: 'BPA ajustado frente a GAAP', nivel: 'Media', comentario: 'En FY2025 el ajustado (33,05 USD) superó al GAAP (25,72) en 7,33 USD; en FY2026 casi coinciden por plusvalías y el crédito LIFO [2, 5].' },
      { senal: 'Reestructuración todos los años', nivel: 'Baja', comentario: '245 M USD en FY2026 y 344 M en FY2025, fuera del ajustado [2]; el DCF la resta.' },
      { senal: 'Revalorización de minoritarios rescatables', nivel: 'Media', comentario: '374 M USD en el 1T27 fuera del ajustado: el coste real de las compras con socios médicos y de Apollo sube con el valor de esos negocios [3, 4].' },
      { senal: 'Patrimonio negativo', nivel: 'Baja', comentario: '−2.172 M USD en FY2026 por recompras acumuladas de 32.005 M; no es un problema de solvencia (flujo libre de 5.410 M) pero invalida ROE y Altman [2].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Prioridades declaradas: invertir en oncología, especialidades y servicios a laboratorios, recompras con el exceso de caja y un dividendo que crece (+15 % en julio de 2026, a 0,94 USD trimestrales, décimo año seguido de subidas) [3, 2]. En abril de 2026 el consejo amplió el programa de recompras en 5.000 M, hasta 7.700 M disponibles; en el 1T27 recompró 2.530 M (2.250 M con una recompra acelerada) y guía ≈ 5.000 M para FY2027 [2, 3, 18]. El objetivo a largo plazo es un BPA ajustado que crezca un 13-16 % al año [19].',
    adquisiciones: [
      { anio: 'FY2023', objetivo: 'Rx Savings Solutions (software de ahorro en recetas)', importe: 875, ev_ebitda: null, financiacion: 'Caja', resultado: 'Integrada en soluciones tecnológicas de recetas; el segmento sube su margen ajustado del 17,6 % al 19,5 % entre FY2024 y FY2026 [13, 2].' },
      { anio: 'FY2026', objetivo: 'PRISM Vision (80 %; oftalmología y retina)', importe: 875, ev_ebitda: null, financiacion: 'Caja', resultado: 'Consolidada desde el 1-abr-2025; 510 M de intangibles y 437 M de fondo de comercio [4].' },
      { anio: 'FY2026', objetivo: 'Core Ventures (70 %; Florida Cancer Specialists)', importe: 2500, ev_ebitda: null, financiacion: 'Caja y bonos de mayo de 2025', resultado: 'Consolidada desde el 2-jun-2025; 2.300 M de intangibles y 752 M de fondo de comercio; oncología +53 % de resultado ajustado en FY2026 [4, 2].' },
      { anio: 'FY2027', objetivo: 'Venta del ≈ 13 % de Medical-Surgical a Apollo', importe: 1250, ev_ebitda: null, financiacion: 'Cobro en caja (preferentes convertibles)', resultado: 'Cerrada el 1-jun-2026; valora el negocio en ≈ 13.000 M de valor empresa según la dirección [4, 18].' },
      { anio: 'FY2027', objetivo: 'Precision Medicine Group (servicios clínicos y de comercialización para laboratorios)', importe: 2250, ev_ebitda: null, financiacion: 'Caja', resultado: 'Pendiente de autorizaciones (anunciada en agosto de 2026).' },
      { anio: 'FY2027', objetivo: 'Option Care Health (49 %, con CD&R)', importe: 1400, ev_ebitda: null, financiacion: 'Caja', resultado: 'Pendiente (cierre previsto en el primer semestre de 2027); puesta en equivalencia, con marco para comprar el 51 % de CD&R más adelante.' },
    ],
    comentario: 'La dirección asigna bien el capital en el negocio central: el resultado operativo ajustado sube de 3.665 M USD en FY2021 a 6.229 M en FY2026 con una inversión fija del 0,2 % de las ventas y circulante negativo [9, 2], y las acciones diluidas bajan de 161 M a 124 M (−5 % al año) [1]. Las compras recientes cambian el perfil: 3.375 M en consultas de oncología y retina con socios médicos que conservan el 20-30 % y opciones de venta, y en 2026 otros 3.650 M comprometidos (Precision Medicine y Option Care) [4]. Son negocios de más margen pero con más riesgo de ejecución y de regulación (reembolsos de Medicare). La venta de Europa y de Rexall, con pérdidas contables, cerró apuestas de diversificación de la década pasada [1].',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'North American Pharmaceutical', descripcion: 'Distribución de medicamentos de marca, genéricos y especialidad a farmacias, hospitales y cadenas en EE. UU. y Canadá.', tipo_resultado: 'EBIT', historico: [{ periodo: 'FY2024', ingresos: 261368, resultado: 2841 }, { periodo: 'FY2025', ingresos: 304507, resultado: 3145 }, { periodo: 'FY2026', ingresos: 336652, resultado: 3452 }] },
      { nombre: 'Oncology & Multispecialty', descripcion: 'Distribución de especialidad, US Oncology Network, Core Ventures (Florida Cancer Specialists), PRISM Vision, compras de grupo y servicios a consultas.', tipo_resultado: 'EBIT', historico: [{ periodo: 'FY2024', ingresos: 30490, resultado: 808 }, { periodo: 'FY2025', ingresos: 36862, resultado: 936 }, { periodo: 'FY2026', ingresos: 48423, resultado: 1435 }] },
      { nombre: 'Prescription Technology Solutions', descripcion: 'Acceso y asequibilidad (autorizaciones previas, programas de copago), logística para laboratorios y software de recetas (CoverMyMeds, RxSS).', tipo_resultado: 'EBIT', historico: [{ periodo: 'FY2024', ingresos: 4769, resultado: 837 }, { periodo: 'FY2025', ingresos: 5216, resultado: 961 }, { periodo: 'FY2026', ingresos: 5805, resultado: 1129 }] },
      { nombre: 'Medical-Surgical Solutions (Wellverse, en separación)', descripcion: 'Distribución de material médico y quirúrgico a consultas, residencias y atención domiciliaria; 13 % de Apollo desde junio de 2026.', tipo_resultado: 'EBIT', historico: [{ periodo: 'FY2024', ingresos: 11309, resultado: 1018 }, { periodo: 'FY2025', ingresos: 11380, resultado: 1022 }, { periodo: 'FY2026', ingresos: 11507, resultado: 1029 }] },
      { nombre: 'Otros (Noruega, vendida) y gastos corporativos', descripcion: 'Negocio de Noruega hasta su venta en enero de 2026 y gastos corporativos netos (en el resultado).', tipo_resultado: 'EBIT', historico: [{ periodo: 'FY2024', ingresos: 1015, resultado: 45 - 648 }, { periodo: 'FY2025', ingresos: 1086, resultado: 48 - 494 }, { periodo: 'FY2026', ingresos: 1043, resultado: 74 - 654 }] },
    ],
    geografias: [{ nombre: 'Estados Unidos', peso_pct: 96 }, { nombre: 'Canadá y resto', peso_pct: 4 }],
    geografias_criterio: 'origen',
    kpis: [
      { kpi: 'BPA ajustado (USD)', valor_anterior: '33,05', valor_actual: '39,11', variacion: '+18 %', comentario: 'Guía FY2027: 44,20-45,00 [2, 3].' },
      { kpi: 'Ingresos de Oncology & Multispecialty (M USD)', valor_anterior: '36.862', valor_actual: '48.423', variacion: '+31 %', comentario: 'Con Core Ventures y PRISM; margen ajustado del 2,54 % al 2,96 % [2].' },
      { kpi: 'Margen ajustado de North American Pharmaceutical', valor_anterior: '1,03 %', valor_actual: '1,03 %', variacion: '0 pb', comentario: 'Estable pese a los GLP-1; 1T27 1,03 % [2, 3].' },
      { kpi: 'Margen ajustado de Prescription Technology Solutions', valor_anterior: '18,42 %', valor_actual: '19,45 %', variacion: '+103 pb', comentario: 'Más demanda de soluciones de acceso [2].' },
      { kpi: 'Flujo libre (M USD)', valor_anterior: '5.226', valor_actual: '5.410', variacion: '+4 %', comentario: 'Guía FY2027 4.500-4.900 [2, 18].' },
      { kpi: 'Acciones diluidas medias (M)', valor_anterior: '128,1', valor_actual: '124,1', variacion: '−3 %', comentario: '119,2 en el 1T27; 116,6 M en circulación el 31-jul-2026 [2, 3, 4].' },
    ],
    clientes: 'Concentración alta: los diez primeros clientes (incluidas centrales de compra) son el 73 % de las ventas de FY2026 y el primero, CVS Health, el 24 % (21 % de las cuentas a cobrar); el segundo y el tercero, el 11 % y el 10 % [1]. El contrato con CVS vencía en junio de 2027; el 1-oct-2026 se firmó un acuerdo de principio para extenderlo hasta junio de 2032 (pendiente del contrato definitivo). El poder de precios es limitado y está pactado: en marcas, más del 95 % es comisión por servicio sobre el precio de lista, así que una bajada de precio resta ventas y apenas margen [3]. En genéricos el margen depende del abastecimiento propio (ClarusONE) y de la inflación o deflación (crédito LIFO de 210 M en FY2026) [2]. El mayor proveedor es el 11 % de las compras [1].',
    confianza: 'Alta',
  },
  huecos: [],
  fuentes: fA,
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Form 10-K FY2026 de McKesson: negocio, competencia, regulación, clientes', editor: 'McKesson Corporation (SEC)', tipo: 'Primaria', fecha: '2026-05-08', url: `${ED}/000092765326000069/mck-20260331.htm` },
  { id: 2, titulo: 'Distribución farmacéutica mayorista: ficha sectorial corta (tamaño, cuotas, márgenes, comparables)', editor: 'Repositorio de análisis (sectores/distribucion-farmaceutica-2026-10-15.md)', tipo: 'Sectorial', fecha: '2026-10-15', url: 'sectores/distribucion-farmaceutica-2026-10-15.md' },
  { id: 3, titulo: 'Form 10-K FY2025 de Cencora (cuota, clientes, previsión de IQVIA del gasto farmacéutico)', editor: 'Cencora, Inc. (SEC)', tipo: 'Primaria', fecha: '2025-11-25', url: 'https://www.sec.gov/Archives/edgar/data/1140859/000114085925000131/cor-20250930.htm' },
  { id: 4, titulo: 'Fichas de competidores (ventas, EBIT y márgenes del último ejercicio) de Yahoo Finance', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com' },
  { id: 5, titulo: 'McKesson Reports Fiscal 2026 Fourth Quarter and Full Year Results (segmentos)', editor: 'McKesson Corporation (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-05-07', url: `${ED}/000092765326000066/mck_exhibit991x3312026.htm` },
  { id: 6, titulo: 'Cardinal Health, McKesson extend CVS distribution deals to 2032', editor: 'Pharmaceutical Commerce', tipo: 'Prensa', fecha: '2026-10-02', url: 'https://www.pharmaceuticalcommerce.com/view/cardinal-health-mckesson-extend-cvs-distribution-deals-to-2032' },
  { id: 7, titulo: 'McKesson Reports Fiscal 2027 First Quarter Results (GLP-1, marcas, segmentos)', editor: 'McKesson Corporation (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-08-05', url: `${ED}/000092765326000232/mck_exhibit991x6302026.htm` },
  { id: 8, titulo: 'McKesson Q1 earnings call highlights (GLP-1 de 15.000 M USD en el trimestre, +24 %; comisión por servicio > 95 % en marcas)', editor: 'Nasdaq / MarketBeat (resumen de la conferencia)', tipo: 'Prensa', fecha: '2026-08-08', url: 'https://www.nasdaq.com/articles/mckesson-q1-earnings-call-highlights' },
];
const B_ = {
  _estado: 'Completa. Perímetro, tamaño y comparables de la ficha sectorial del 15-oct-2026, comprobados con el 10-K de McKesson.',
  sector: {
    definicion: 'Mercado relevante: la distribución mayorista de medicamentos con receta en EE. UU. (marca, genéricos, especialidad y biosimilares) a farmacias, hospitales, consultas y gestores de farmacia, que da ≈ 83 % de las ventas de McKesson (North American Pharmaceutical, con Canadá dentro) más la distribución de especialidad de Oncology & Multispecialty [1, 5]. Se mide con las ventas de los segmentos farmacéuticos de EE. UU. de los tres grandes (McKesson, Cencora y Cardinal), que mueven más del 90 % del volumen: ≈ 866.000 M USD en los últimos ejercicios (estimación propia de la ficha sectorial; ejercicios a marzo, junio y septiembre) [2]. IQVIA, citado por Cencora, mide gasto neto, no ventas mayoristas; su previsión de crecimiento se usa como segunda referencia [3].',
    tamano: '≈ 866.000 M USD de ventas de distribución farmacéutica en EE. UU. de los tres grandes (último ejercicio de cada uno) [2]',
    unidad_serie: 'millones de USD (ventas de los segmentos de EE. UU. de los tres grandes; estimación propia de la ficha sectorial)',
    serie: [{ anio: '2024', tamano: 769000 }, { anio: '2025', tamano: 856000 }, { anio: '2026e', tamano: 905000 }, { anio: '2027e', tamano: 950000 }, { anio: '2028e', tamano: 1000000 }],
    tcac_historico_pct: 10, tcac_previsto_pct: 6, cr5_pct: 95, estructura: 'Concentrada',
    drivers: [
      { driver: 'Volumen de recetas y envejecimiento', efecto: '+', horizonte: 'Estructural', evidencia: 'La población de 65 años o más llegará a ≈ 71 millones en 2029 [3]; el volumen de recetas impulsó el +11 % de North American Pharmaceutical en FY2026 [5].' },
      { driver: 'GLP-1 (diabetes y obesidad)', efecto: '+/−', horizonte: 'Estructural', evidencia: '≈ 15.000 M USD de ventas de GLP-1 en el 1T27 (+24 %), con margen casi nulo: suben ventas, apenas beneficio [8].' },
      { driver: 'Especialidad y oncología', efecto: '+', horizonte: 'Estructural', evidencia: 'Oncology & Multispecialty +31 % en ventas y +53 % en resultado ajustado en FY2026 [5].' },
      { driver: 'Precio de lista de las marcas (IRA, nación más favorecida, TrumpRx)', efecto: '−', horizonte: 'Estructural', evidencia: 'Las bajadas de precio de enero de 2026 restaron ventas a North American Pharmaceutical; > 95 % de la distribución de marcas cobra comisión por servicio, así que el margen apenas cambia [7, 8].' },
      { driver: 'Genéricos y biosimilares', efecto: '+', horizonte: 'Cíclico', evidencia: 'La conversión a genéricos baja ventas y sube margen; crédito LIFO de 210 M USD en FY2026 por deflación [5].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Oligopolio estable de tres que compiten por contratos de grandes cuentas: márgenes operativos ajustados del 1,0-1,2 % en EE. UU. [2].' },
      { fuerza: 'Poder de los clientes', intensidad: 5, justificacion: 'CVS es el 24 % de las ventas de McKesson y los diez primeros el 73 % [1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'El mayor laboratorio es el 11 % de las compras de McKesson; la comisión por servicio está pactada [1].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Escala, licencias por estado y de la DEA, red de almacenes y el sistema de control de opioides común del acuerdo de 2022 [1].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 2, justificacion: 'Venta directa del laboratorio al paciente (TrumpRx) y gestores de farmacia integrados afectan a nichos; el grueso pasa por el mayorista [1, 2].' },
    ],
    ciclo: { posicion: 'Expansión', comentario: 'La demanda de medicamentos no depende del ciclo económico: las ventas de los tres grandes crecieron en 2009, 2020 y 2022 [2]. Lo que se mueve es la inflación o deflación de precios (crédito o cargo LIFO) y el volumen de GLP-1 y especialidad. Hoy el volumen crece (+5 % en North American Pharmaceutical en el 1T27) y la deflación de genéricos da crédito LIFO [7, 5].' },
    regulacion: 'La Ley de Reducción de la Inflación fija precios negociados en Medicare para diez fármacos desde enero de 2026 y quince más desde 2027. En diciembre de 2025 los CMS propusieron modelos obligatorios de reembolso de los laboratorios ligados a precios internacionales en las partes B y D de Medicare [1]. La política de «nación más favorecida» y los acuerdos directos (TrumpRx) presionan los precios de lista, que restan ventas pero poco margen por la comisión por servicio [7]. El programa 340B está en revisión. El acuerdo de opioides de 2022 obliga a pagos hasta 2038 y a un sistema común de control de pedidos [1].',
    tendencias: 'La especialidad crece más que la distribución general: los tres grandes compran consultas de oncología, retina, urología y digestivo (McKesson: Core Ventures y PRISM en 2025; Option Care Health y Precision Medicine anunciadas en 2026) para asegurar el volumen de fármacos caros y vender servicios a laboratorios [1]. Los GLP-1 y los biosimilares suben el volumen. La venta directa del laboratorio al paciente es una amenaza aún pequeña. La IA se aplica a autorizaciones previas (CoverMyMeds) y a la previsión de demanda en almacenes [1].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 39, posicion: '1.º en distribución farmacéutica en EE. UU. (≈ 39 % del volumen de los tres grandes, estimación con las ventas de segmento); líder en distribución a oncología comunitaria con US Oncology Network y Florida Cancer Specialists [2, 1]',
    competidores: [
      { nombre: 'Cencora', pais: 'EE. UU.', ticker: 'COR', ingresos: 321333, cuota_pct: 34, margen_ebit_pct: 0.83, comentario: 'Segundo; Walgreens es el 25 % de sus ventas; compra consultas de retina y oncología (RCA, OneOncology) [2, 3, 4].' },
      { nombre: 'Cardinal Health', pais: 'EE. UU.', ticker: 'CAH', ingresos: 254248, cuota_pct: 27, margen_ebit_pct: 0.99, comentario: 'Tercero; CVS es el 28 % de sus ventas (extendido a 2032); también productos médicos [2, 4, 6].' },
      { nombre: 'Henry Schein', pais: 'EE. UU.', ticker: 'HSIC', ingresos: 13184, cuota_pct: null, margen_ebit_pct: 5.18, comentario: 'Distribución a dentistas y médicos; compite con Medical-Surgical, no en la mayorista farmacéutica [2, 4].' },
      { nombre: 'Medipal Holdings', pais: 'Japón', ticker: '7459.T', ingresos: 24049, cuota_pct: null, margen_ebit_pct: 2.14, comentario: 'Mayor mayorista japonés; mercado regulado aparte [2, 4].' },
      { nombre: 'Galenica', pais: 'Suiza', ticker: 'GALE.SW', ingresos: 4988, cuota_pct: null, margen_ebit_pct: 5.7, comentario: 'Farmacias y mayorista en Suiza [2, 4].' },
    ],
    foso: {
      veredicto: 'Amplio', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 2, evidencia: 'CoverMyMeds conecta médicos, farmacias, aseguradoras y laboratorios en autorizaciones previas: el segmento gana un 19,45 % de margen ajustado [5].' },
        { fuente: 'Costes de cambio', puntuacion: 3, evidencia: 'Contratos de 5 años con integración de sistemas; CVS renovó con McKesson hasta 2032 y es cliente desde hace décadas [1, 6].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 2, evidencia: 'Licencias de la DEA y de cada estado; sin patentes relevantes [1].' },
        { fuente: 'Ventaja en costes', puntuacion: 4, evidencia: 'Gastos operativos ajustados del 2,0 % de las ventas en FY2026 frente a ventas que crecen el 12 % [2, 5].' },
        { fuente: 'Escala eficiente', puntuacion: 5, evidencia: 'Tres distribuidores con > 90 % del mercado y márgenes del 1 %: no cabe un cuarto [2].' },
      ],
    },
    amenazas: 'Lo que más puede erosionar el foso es la concentración de clientes: si CVS (24 % de las ventas) no firma el contrato definitivo o lo firma con peores condiciones, el resultado de North American Pharmaceutical caería con fuerza; la probabilidad es baja tras el acuerdo de principio del 1-oct-2026 [1, 6]. Segundo, la regulación de precios (reembolsos ligados a precios internacionales, nación más favorecida) si pasa de restar ventas a restar comisiones. Tercero, la venta directa de laboratorios al paciente y la integración vertical de los gestores de farmacia. Cuarto, en oncología, cambios en el reembolso de la parte B de Medicare a las consultas compradas.',
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'McKesson es el mayor distribuidor de medicamentos de EE. UU. y uno de los mayores de Canadá: compra a los laboratorios medicamentos de marca, genéricos y de especialidad y los entrega cada día a farmacias, hospitales, consultas y gestores de farmacia, con 43.000 empleados [1]. Desde septiembre de 2025 reporta cuatro segmentos: North American Pharmaceutical (83 % de las ventas), Oncology & Multispecialty (12 %: distribución de especialidad, la red US Oncology, Florida Cancer Specialists y PRISM Vision), Prescription Technology Solutions (1,4 %: CoverMyMeds, programas de acceso y logística para laboratorios) y Medical-Surgical Solutions (2,9 %: material médico, en proceso de separación como Wellverse) [5, 1]. Vendió todos sus negocios europeos entre 2021 y enero de 2026 [5].',
    como_gana_dinero: 'Gana poco por unidad y mucho por volumen: 403.430 M USD de ventas con un margen bruto del 3,6 % y un resultado operativo ajustado del 1,5 % [5]. En medicamentos de marca cobra una comisión por servicio pactada con el laboratorio sobre el precio de lista (más del 95 % del negocio de marcas), así que el beneficio depende del volumen y no del precio [8]. En genéricos gana el diferencial de compra (ClarusONE) y es donde está el margen. Oncología y especialidades ganan el 2,96 % y los servicios tecnológicos el 19,45 % sobre ventas, y ya dan el 36 % del resultado ajustado de los segmentos con el 13 % de las ventas [5]. El circulante es negativo: los proveedores financian existencias y cobros. Apalancamiento operativo alto: los gastos crecen menos que las ventas.',
  },
  huecos: [],
  fuentes: fB,
};
guarda('B', B_);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Proxy statement 2026 (DEF 14A): consejo, remuneración, accionistas', editor: 'McKesson Corporation (SEC)', tipo: 'Primaria', fecha: '2026-06-12', url: `${ED}/000092765326000169/mck-20260612.htm` },
  { id: 2, titulo: 'Form 8-K: resultados de la junta del 22-jul-2026 (votos)', editor: 'McKesson Corporation (SEC)', tipo: 'Primaria', fecha: '2026-07-24', url: `${ED}/000092765326000215/mck-20260722.htm` },
  { id: 3, titulo: 'McKesson Announces Planned CFO Transition (Kenny Cheung, de Sysco, sustituye a Britt Vitalone)', editor: 'McKesson Corporation (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-03-05', url: `${ED}/000092765326000035/ex991-502newsreleaseissued.htm` },
  { id: 4, titulo: 'Form 8-K: retiro de Thomas Rodgers; Ramesh Srinivasan, director de estrategia', editor: 'McKesson Corporation (SEC)', tipo: 'Primaria', fecha: '2026-07-01', url: `${ED}/000092765326000185/mck-20260629.htm` },
  { id: 5, titulo: 'Form 4 de directivos y consejeros de McKesson (19-oct-2025 a 19-oct-2026), herramienta form4.mjs', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-19', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000927653&type=4' },
  { id: 6, titulo: 'Notas de resultados anuales FY2019-FY2026 (guías y resultados de BPA ajustado)', editor: 'McKesson Corporation (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-05-07', url: `${ED}/000092765326000066/mck_exhibit991x3312026.htm` },
  { id: 7, titulo: 'Form 8-K: incidente de ciberseguridad descubierto el 25-ago-2026', editor: 'McKesson Corporation (SEC)', tipo: 'Primaria', fecha: '2026-08-28', url: `${ED}/000092765326000247/mck-20260825.htm` },
  { id: 8, titulo: 'Form 10-K FY2026: litigios, investigaciones del Departamento de Justicia', editor: 'McKesson Corporation (SEC)', tipo: 'Primaria', fecha: '2026-05-08', url: `${ED}/000092765326000069/mck-20260331.htm` },
];
const C = {
  _estado: 'Completa. Proxy 2026, 8-K de la junta y de cambios de directivos, Form 4 de 12 meses.',
  directivos: {
    equipo: [
      { nombre: 'Brian S. Tyler', cargo: 'Presidente y consejero delegado', desde: '2019', participacion_pct: 0.02, trayectoria: 'En McKesson desde 1997; consejero delegado desde abril de 2019 y presidente desde mayo de 2026. Con él, el BPA ajustado pasó de 14,95 USD (FY2020) a 39,11 (FY2026), salió de Europa y de Change Healthcare y giró hacia oncología [6, 1].' },
      { nombre: 'Kenny Cheung', cargo: 'Director financiero', desde: '2026', participacion_pct: null, trayectoria: 'Antes director financiero de Sysco; sustituye a Britt Vitalone (ocho años en el cargo) desde el 29-may-2026 [3].' },
      { nombre: 'Michele Lau', cargo: 'Directora jurídica', desde: '2023', participacion_pct: null, trayectoria: 'Lleva los litigios de opioides y la separación de Medical-Surgical [1].' },
      { nombre: 'Ramesh Srinivasan', cargo: 'Director de estrategia', desde: '2026', participacion_pct: null, trayectoria: 'Sustituye a Thomas Rodgers (retirado el 1-ago-2026) [4].' },
      { nombre: 'Britt J. Vitalone', cargo: 'Asesor estratégico (ex director financiero)', desde: '2018', participacion_pct: null, trayectoria: 'Director financiero de 2018 a mayo de 2026; sigue como asesor para la separación de Medical-Surgical [3].' },
    ],
    historial_guidance: [
      { anio: 'FY2020', guia: 'BPA ajustado 13,85-14,45 USD', real: '14,95', cumplida: 'Sí' },
      { anio: 'FY2021', guia: '13,95-14,75 USD (con la COVID)', real: '17,21', cumplida: 'Sí' },
      { anio: 'FY2022', guia: '18,85-19,45 USD', real: '23,69', cumplida: 'Sí' },
      { anio: 'FY2023', guia: '22,90-23,60 USD', real: '25,94', cumplida: 'Sí' },
      { anio: 'FY2024', guia: '26,10-26,90 USD', real: '27,44', cumplida: 'Sí' },
      { anio: 'FY2025', guia: '31,25-32,05 USD', real: '33,05', cumplida: 'Sí' },
      { anio: 'FY2026', guia: '36,75-37,55 USD (subida tres veces)', real: '39,11', cumplida: 'Sí' },
    ],
    comentario: 'Equipo creíble: siete años seguidos batiendo la guía inicial de BPA ajustado, en cuatro de ellos por más de un 5 % [6]. La estabilidad baja algo en 2026: cambia el director financiero (Vitalone, que sigue de asesor) y el de estrategia, y el consejero delegado pasa a ser también presidente, con un consejero independiente coordinador (Dominic Caruso) [3, 4, 1]. La sucesión del consejero delegado no está anunciada; Tyler tiene 59 años.',
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      { nombre: 'Brian S. Tyler', cargo: 'Presidente y consejero delegado', tipo: 'Ejecutivo', desde: '2019', comisiones: '—' },
      { nombre: 'Dominic J. Caruso', cargo: 'Consejero independiente coordinador', tipo: 'Independiente', desde: '2018', comisiones: 'Auditoría; Finanzas' },
      { nombre: 'Lynne M. Doughtie', cargo: 'Consejera', tipo: 'Independiente', desde: '2025', comisiones: 'Auditoría' },
      { nombre: 'W. Roy Dunbar', cargo: 'Consejero', tipo: 'Independiente', desde: '2022', comisiones: 'Cumplimiento' },
      { nombre: 'Deborah Dunsire', cargo: 'Consejera', tipo: 'Independiente', desde: '2024', comisiones: 'Cumplimiento' },
      { nombre: 'Julie L. Gerberding', cargo: 'Consejera', tipo: 'Independiente', desde: '2025', comisiones: 'Gobierno y Sostenibilidad' },
      { nombre: 'James H. Hinton', cargo: 'Consejero', tipo: 'Independiente', desde: '2022', comisiones: 'Remuneración' },
      { nombre: 'Bradley E. Lerman', cargo: 'Consejero', tipo: 'Independiente', desde: '2018', comisiones: 'Cumplimiento' },
      { nombre: 'Maria N. Martinez', cargo: 'Consejera', tipo: 'Independiente', desde: '2019', comisiones: 'Remuneración' },
      { nombre: 'Kevin M. Ozan', cargo: 'Consejero', tipo: 'Independiente', desde: '2024', comisiones: 'Auditoría; Finanzas' },
      { nombre: 'Kathleen Wilson-Thompson', cargo: 'Consejera', tipo: 'Independiente', desde: '2022', comisiones: 'Remuneración; Gobierno y Sostenibilidad' },
    ],
    presidente_ceo_separados: false, presidente_ejecutivo: true, consejero_coordinador: true, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 91.0, voto_remuneracion_contra_pct: 8.2, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: 'FY2026', total: 24.21, fijo: 1.59, variable_corto: 4.46, variable_largo: 17.20, ratio_salario_medio: 357 },
    remuneracion: 'El consejero delegado cobró 24,2 M USD en FY2026 (20,2 M en FY2025): 1,6 M de fijo, 4,5 M de variable anual (149 % del objetivo) y 17,2 M en acciones [1]. El variable a largo plazo es en un 60 % acciones por objetivos ligadas al BPA ajustado acumulado a tres años y al ROIC medio de tres años, con un modificador de ±20 % por rentabilidad para el accionista frente a sus comparables (nuevo en FY2026); el resto, acciones restringidas [1]. Premia el BPA ajustado, que excluye la reestructuración que se repite y la revalorización de minoritarios: es el punto débil. Ratio frente al empleado mediano: 357 veces [1]. En la junta de 2026 el voto consultivo sobre la remuneración tuvo un 91,4 % a favor y un 8,2 % en contra (91 % a favor en 2025) [2, 1].',
    accionistas: [
      { nombre: 'BlackRock', pct: 7.9, tipo: 'Institucional', variacion: 'Estable (13G/A de abr-2025)' },
      { nombre: 'Vanguard Capital Management', pct: 7.8, tipo: 'Institucional', variacion: '13G de abr-2026' },
      { nombre: 'Consejeros y directivos', pct: 0.1, tipo: 'Internos', variacion: 'Ventas netas con planes 10b5-1' },
      { nombre: 'Autocartera', pct: 58.6, tipo: 'Autocartera (sobre emitidas)', variacion: '164 M de 280 M emitidas a 30-jun-2026' },
    ],
    insiders: [
      { fecha: '2026-05-15', persona: 'Brian S. Tyler (consejero delegado)', operacion: 'Venta', acciones: 20900, importe: 17.04 },
      { fecha: '2026-05-15', persona: 'Michele Lau (directora jurídica)', operacion: 'Venta', acciones: 6500, importe: 5.68 },
      { fecha: '2026-05-15', persona: 'Thomas L. Rodgers (estrategia)', operacion: 'Venta', acciones: 3000, importe: 2.65 },
      { fecha: '2026-06-15', persona: 'LeAnn B. Smith (recursos humanos)', operacion: 'Venta', acciones: 1800, importe: 1.51 },
      { fecha: '2026-08-10', persona: 'Bradley E. Lerman (consejero)', operacion: 'Venta', acciones: 301, importe: 0.27 },
    ],
    control_y_defensas: 'Sin accionista de control: los dos mayores son gestoras indexadas (BlackRock 7,9 % y Vanguard 7,8 %) [1]. Una acción, un voto; consejo elegido cada año por mayoría. El consejero delegado preside el consejo desde mayo de 2026, con un consejero independiente coordinador con funciones definidas; 10 de 11 consejeros son independientes [1]. Los estatutos fijan tribunales exclusivos para pleitos de accionistas [8]. Sin operaciones vinculadas relevantes [1].',
    alertas: [
      'Concentración de poder: el consejero delegado es también presidente desde el 1-may-2026 [1].',
      'Incidente de ciberseguridad descubierto el 25-ago-2026, sin efecto material determinado [7].',
      'Investigaciones civiles del Departamento de Justicia (programas de copago, ciberseguridad de NDCHealth) y demandas qui tam abiertas [8].',
      'Ventas de directivos con planes 10b5-1 por 27,7 M USD en 12 meses y ninguna compra en mercado [5].',
    ],
    confianza: 'Alta',
  },
  huecos: [{ seccion: 'calidad', campo: 'anios_auditor', tipo: 'Complemento', intentos: '1) 10-K FY2026 (informe del auditor): no da el año de inicio; 2) proxy 2026, propuesta de ratificación de Deloitte: sin año; 3) búsqueda del año de inicio en EDGAR: no encontrado sin abrir proxies antiguos', decision: 'Omitido' }],
  fuentes: fC,
};
// Insiders: totales por persona de form4.mjs; fechas representativas (mes con más ventas) e importes en M USD [5].
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de MCK, SPY y XLV (precio, rango, rentabilidades, beta, cierres de ejercicio): herramienta bolsa.mjs', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://finance.yahoo.com/quote/MCK/history' },
  { id: 2, titulo: 'Consenso de MCK y comparables (estimaciones de BPA y ventas, objetivos, recomendaciones): quoteSummary', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/MCK/analysis' },
  { id: 3, titulo: 'McKesson sets new 1-year high (objetivo medio de 19 analistas 983,29 USD; Leerink 1.070; PER; consenso FY2027 44,73)', editor: 'MarketBeat', tipo: 'Analistas', fecha: '2026-10-15', url: 'https://www.marketbeat.com/instant-alerts/price-mckesson-nyse-mck-sets-new-1-year-high-heres-why-2026-10-15/' },
  { id: 4, titulo: 'Daily Treasury Par Yield Curve Rates 2026 (10 años: 5,09 % el 16-oct-2026)', editor: 'U.S. Department of the Treasury', tipo: 'Primaria', fecha: '2026-10-16', url: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve&field_tdr_date_value=2026' },
  { id: 5, titulo: 'Implied ERP by month (ERPbymonth.xlsx): octubre de 2026, 4,20 %', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 6, titulo: 'Comparables de distribución farmacéutica (14/15-oct-2026), llevados al cierre del 16-oct con el precio de Yahoo', editor: 'Repositorio de análisis (sectores/distribucion-farmaceutica-2026-10-15-comparables.json) y Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'sectores/distribucion-farmaceutica-2026-10-15-comparables.json' },
  { id: 7, titulo: 'CD&R and McKesson Corporation Sign Agreement to Acquire Option Care Health (valor empresa ≈ 5.800 M USD, prima del 37 %)', editor: 'McKesson Corporation (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-10-06', url: `${ED}/000092765326000253/ex991pressreleaseoctober62.htm` },
  { id: 8, titulo: 'Form 10-Q del 1T FY2027 (acciones en circulación el 31-jul-2026; venta del 13 % de Medical-Surgical a Apollo)', editor: 'McKesson Corporation (SEC)', tipo: 'Primaria', fecha: '2026-08-05', url: `${ED}/000092765326000234/mck-20260630.htm` },
  { id: 9, titulo: 'Cardinal Health, McKesson extend CVS distribution deals to 2032', editor: 'Pharmaceutical Commerce', tipo: 'Prensa', fecha: '2026-10-02', url: 'https://www.pharmaceuticalcommerce.com/view/cardinal-health-mckesson-extend-cvs-distribution-deals-to-2032' },
  { id: 10, titulo: 'McKesson makes major $2.25B oncology drug development acquisition (Precision Medicine Group)', editor: 'HealthExec', tipo: 'Prensa', fecha: '2026-08-26', url: 'https://healthexec.com/topics/healthcare-management/mergers-and-acquisitions/mckesson-makes-major-225b-oncology-drug-development-acquisition' },
  { id: 11, titulo: 'McKesson Corp stock rises 16 % (5-feb-2026, tras el 3T FY2026)', editor: 'finanzen.ch / RTTNews', tipo: 'Prensa', fecha: '2026-02-05', url: 'https://script.finanzen.ch/nachrichten/aktien/mckesson-corp-stock-rises-16percent-1035790615' },
  { id: 12, titulo: 'Titulares de Seeking Alpha sobre MCK (RSS, oct-2025 a oct-2026)', editor: 'Seeking Alpha', tipo: 'Prensa', fecha: '2026-10-19', url: 'https://seekingalpha.com/api/sa/combined/MCK.xml' },
  { id: 13, titulo: 'McKesson Announces Planned CFO Transition (5-mar-2026)', editor: 'McKesson Corporation (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-03-05', url: `${ED}/000092765326000035/ex991-502newsreleaseissued.htm` },
  { id: 14, titulo: 'Movimiento del precio de MCK (1-12 meses, máximos, media de 200, avisos P1-P5): herramienta movimiento.mjs', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://finance.yahoo.com/quote/MCK/history' },
  { id: 15, titulo: 'Form 8-K: incidente de ciberseguridad (25-ago-2026)', editor: 'McKesson Corporation (SEC)', tipo: 'Primaria', fecha: '2026-08-28', url: `${ED}/000092765326000247/mck-20260825.htm` },
  { id: 16, titulo: 'McKesson Reports Fiscal 2026 Fourth Quarter and Full Year Results (guía FY2027)', editor: 'McKesson Corporation (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-05-07', url: `${ED}/000092765326000066/mck_exhibit991x3312026.htm` },
  { id: 17, titulo: 'McKesson Reports Fiscal 2027 First Quarter Results (guía 44,20-45,00 USD)', editor: 'McKesson Corporation (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-08-05', url: `${ED}/000092765326000232/mck_exhibit991x6302026.htm` },
  { id: 18, titulo: 'Form 4 de directivos (form4.mjs): ventas de 28,3 M USD en 12 meses, sin compras', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-19', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000927653&type=4' },
];
const m = Y.MCK;
const t = Object.fromEntries(m.trend.map((x) => [x.periodo, x]));
const bol = B.bolsa;
// Comparables: los de la ficha sectorial (14/15-oct), llevados al cierre del 16-oct con la capitalización de Yahoo.
const FX = { USD: 1, JPY: 0.006318316794931889, CHF: 1.2119890451431274, AUD: 0.6987631916999817 };
const comps = SEC.empresas.filter((e) => e.ticker !== 'MCK').map((e) => {
  const y = Y[e.ticker];
  const capN = y.cap * FX[y.divisa] / 1e6, r = capN / e.capitalizacion;
  const evOld = e.capitalizacion / (1 - (e.dn_ebitda ?? 0) / e.ev_ebitda_ltm), evNew = evOld + e.capitalizacion * (r - 1), k = evNew / evOld;
  return { nombre: e.nombre, ticker: e.ticker, pais: e.pais, capitalizacion: Math.round(capN), ev_ventas: r2(e.ev_ventas * k), ev_ebitda_ltm: r1(e.ev_ebitda_ltm * k), ev_ebitda_ntm: r1(e.ev_ebitda_ntm * k),
    per_ntm: r1(e.per_ntm * r), crecimiento_pct: e.crecimiento_pct, margen_ebitda_pct: e.margen_ebitda_pct, roic_pct: e.roic_pct, dn_ebitda: e.dn_ebitda, fcf_yield_pct: e.fcf_yield_pct == null ? null : r1(e.fcf_yield_pct / r) };
});
// Cencora: de su informe del 15-oct (precio 336,17 USD) llevado a 340,92 [6].
const rc = Y.COR.precio / 336.17;
comps.unshift({ nombre: 'Cencora', ticker: 'COR', pais: 'US', capitalizacion: Math.round(Y.COR.cap / 1e6), ev_ventas: r2(Y.COR.ev / 1e6 / 332771), ev_ebitda_ltm: null, ev_ebitda_ntm: null, per_ntm: r1(17.0 * rc), crecimiento_pct: 4.4, margen_ebitda_pct: 1.5, roic_pct: 16.7, dn_ebitda: 1.7, fcf_yield_pct: null });
const perMed = (() => { const v = comps.map((c) => c.per_ntm).sort((a, b) => a - b); const n = v.length; return n % 2 ? v[(n - 1) / 2] : (v[n / 2 - 1] + v[n / 2]) / 2; })();
const D = {
  _estado: `Completa. Precio de cierre del 16-oct-2026 (la sesión del 19-oct no había cerrado al cortar). Mediana del PER NTM de los comparables: ${perMed}.`,
  _per_mediana_comparables: perMed,
  identificacion: {
    nombre: 'McKesson Corporation', nombre_corto: 'McKesson', ticker: 'MCK', isin: 'US58155Q1031', mercado: 'Bolsa de Nueva York (NYSE)', indice_referencia: 'S&P 500',
    pais: 'Estados Unidos', pais_iso: 'US', sector: 'Salud', industria: 'Distribuidores sanitarios', sede: 'Irving (Texas)', fundacion: '1833', empleados: 43000, web: 'https://www.mckesson.com',
    precio: B.identificacion.precio, fecha_precio: B.identificacion.fecha_precio, acciones: 117.3, capitalizacion_publicada: Math.round(m.cap / 1e6), free_float_pct: 99.9,
    max_52s: B.identificacion.max_52s, min_52s: B.identificacion.min_52s, volumen_medio_diario: `≈ ${String(Math.round(B.volumen_3m.importe_dia_millones)).replace(/\B(?=(\d{3})+(?!\d))/g, '.')} M USD/día (3 meses)`, proximos_resultados: '2026-11-04',
  },
  consenso: {
    guidance: 'Guía de FY2027 (a 31-mar-2027), subida el 5-ago-2026: BPA ajustado de 44,20-45,00 USD (+13-15 %), ingresos +5-9 % y resultado operativo ajustado +9-13 % [17]. Detalle de mayo: flujo libre de 4.500-4.900 M, recompras de ≈ 5.000 M, 116-118 M de acciones, intereses de 380-420 M, minoritarios de 295-325 M y tipo del 17-19 % [16]. Objetivo a largo plazo (sept-2025, reafirmado en mayo de 2026): BPA ajustado +13-16 % anual; resultado de segmento North American Pharmaceutical +5-8 %, Oncology & Multispecialty +13-16 %, Prescription Technology Solutions +10-13 % [16]. Reafirmada el 1-oct-2026 con el acuerdo de CVS [9].',
    estimaciones: [
      { periodo: 'FY2027e', ingresos: Math.round(t['0y'].ventas / 1e6), ebitda: null, ebit: null, bpa: r2(t['0y'].bpa), dpa: 3.64, fuente: `Yahoo Finance, ${t['0y'].n} analistas [2]` },
      { periodo: 'FY2028e', ingresos: Math.round(t['+1y'].ventas / 1e6), ebitda: null, ebit: null, bpa: r2(t['+1y'].bpa), dpa: null, fuente: `Yahoo Finance, ${t['+1y'].n} analistas [2]` },
    ],
    recomendaciones: { n_analistas: m.reco.strongBuy + m.reco.buy + m.reco.hold + m.reco.sell + m.reco.strongSell, comprar: m.reco.strongBuy + m.reco.buy, mantener: m.reco.hold, vender: m.reco.sell + m.reco.strongSell, po_medio: r2(m.po_medio), po_min: m.po_min, po_max: m.po_max },
    revisiones: `El BPA de FY2027 del consenso subió de ${String(r2(t['0y'].bpa_hace90)).replace('.', ',')} USD hace 90 días a ${String(r2(t['0y'].bpa)).replace('.', ',')} hoy y el de FY2028 de ${String(r2(t['+1y'].bpa_hace90)).replace('.', ',')} a ${String(r2(t['+1y'].bpa)).replace('.', ',')} (+0,6 %), tras la subida de la guía del 5-ago [2, 17]. Los objetivos de precio suben: Leerink 1.030 → 1.070 USD el 7-oct, Citigroup 945 → 1.000 en julio, Argus 850 → 970 en septiembre; Evercore lo bajó de 1.000 a 950 en agosto [3]. Contraste: MarketBeat da 19 analistas (15 comprar, 4 mantener) con un objetivo medio de 983,29 USD y un consenso de FY2027 de 44,73 [3]; Yahoo, ${m.n_analistas} objetivos con media ${String(r2(m.po_medio)).replace('.', ',')} USD [2]. Sin consenso gratuito de FY2029.`,
    base_ebitda: 'sin consenso de EBITDA (solo BPA y ventas)', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    ...bol,
    beta: bol.beta, posicion_corta_pct: r1(m.corto_pct * 100),
    comentario: 'La acción ha batido con holgura al índice: +38,5 % anual en cinco años frente al +12,6 % del S&P 500 y al +8,3 % del sector sanitario (rentabilidad total) [1]. Lo explica el BPA ajustado (+21 % anual entre FY2021 y FY2026) más la subida del múltiplo, del ≈ 8x adelantado en 2021 a ≈ 20x hoy [1, 16]. Beta muy baja (0,29 mensual a cinco años; 0,52 ajustada) y volatilidad del 30 % en el último año, alta para un distribuidor por los saltos en resultados (+16,5 % el 5-feb-2026) y la caída de marzo-mayo de 2026 (−27 % desde el máximo) [1, 11].',
    contexto: {
      movimiento: { fecha: '2026-10-16', var_1m_pct: 14.2, var_3m_pct: 20.9, var_6m_pct: 16.0, var_12m_pct: 26.9, dist_max_52s_pct: 0.0, dist_min_52s_pct: 38.6, dist_max_historico_pct: 0.0, tendencia: 'alcista', volatilidad_60d_pct: 30.0, avisos: ['P2 A −0 % del máximo de 52 semanas tras subir un 21 % en tres meses'] },
      movimientos_fuertes: [
        { periodo: 'oct-nov 2025', var_pct: 13.6, causa: 'Día del inversor (23-sep: objetivo de BPA a largo plazo subido al 13-16 %, +6,4 % ese día) y resultados del 2T26 con subida de guía (5-nov) [12].', veredicto: 'no cambia', condicion: null },
        { periodo: 'feb 2026', var_pct: 19.4, causa: 'Resultados del 3T26 (4-feb): BPA ajustado +16 %, guía subida a 38,80-39,20 USD; +16,5 % el 5-feb [11].', veredicto: 'no cambia', condicion: null },
        { periodo: 'mar-may 2026', var_pct: -16.2, causa: 'Anuncio del retiro del director financiero (−4,8 % el 5-mar), corrección tras la subida de febrero, caída del sector el 6-may (−7,2 %; Cencora rebajó su guía de ingresos por bajadas de precio de marcas y pérdida de clientes) y guía de FY2027 (+12-14 %) por debajo del objetivo a largo plazo; mínimo de 723,68 USD el 11-may [13, 12, 16].', veredicto: 'no cambia', condicion: null },
        { periodo: 'jul-ago 2026', var_pct: 18.9, causa: 'Subida del dividendo (+15 %), resultados del 1T27 con BPA +20 % y guía subida (+5,6 % el 5-ago) [17, 12].', veredicto: 'no cambia', condicion: null },
        { periodo: 'oct 2026', var_pct: 14.2, causa: 'Acuerdo de principio con CVS hasta 2032 (1-oct, +5,3 %: quita el mayor riesgo de cliente), compra del 49 % de Option Care Health (6-oct) y subidas de objetivos (Leerink 1.070 USD); máximo histórico de 1.004,84 USD el 16-oct [9, 7, 3].', veredicto: 'no cambia', condicion: null },
      ],
      noticias: [
        { fecha: '2026-10-06', tipo: 'fusión u oferta', hecho: 'Compra del 49 % de Option Care Health con CD&R (≈ 1.400 M USD; valor empresa total ≈ 5.800 M, 14,3 veces el EBITDA de 12 meses), con marco para comprar después el 51 % de CD&R; cierre en el primer semestre de 2027 [7].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-01', tipo: 'resultados', hecho: 'Acuerdo de principio para extender la distribución a CVS (24 % de las ventas) hasta junio de 2032; contrato definitivo pendiente; guía de FY2027 reafirmada [9].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-08-25', tipo: 'fusión u oferta', hecho: 'Compra de Precision Medicine Group por ≈ 2.250 M USD en caja (servicios clínicos y de comercialización para laboratorios), pendiente de autorizaciones [10].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-08-25', tipo: 'demanda o regulador', hecho: 'Incidente de ciberseguridad descubierto; la empresa no lo considera material a la fecha del 8-K [15].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-07', tipo: 'recomendación', hecho: 'Leerink sube el objetivo de 1.030 a 1.070 USD; objetivo medio de los analistas ≈ 983-1.001 USD, ya en el precio [3, 2].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-06-01', tipo: 'accionista de referencia', hecho: 'Apollo compra ≈ 13 % de Medical-Surgical por 1.250 M USD; la separación (Wellverse, escisión o canje sin impuestos) sigue sin fecha [8].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-05-15', tipo: 'directivos', hecho: 'Ventas de directivos con planes 10b5-1 por 27,7 M USD en 12 meses (17,0 M del consejero delegado), ninguna compra; ventas programadas ligadas a la entrega de acciones [18].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-11-04', tipo: 'resultados', hecho: 'Resultados del 2T FY2027 el 4-nov-2026 (fecha según la nota de CVS) [9].', veredicto: 'no cambia', condicion: null },
      ],
      proximos_resultados: '2026-11-04',
      veredicto: 'no cambia',
      condicion: null,
      comentario: 'La acción está en máximos históricos (1.004,84 USD) tras subir un 21 % en tres meses (aviso P2): la subida tiene causa en hechos de la empresa (resultados que baten, guía subida, CVS hasta 2032), no en especulación [17, 9]. No hay colocaciones, ampliaciones ni decisiones judiciales con fecha que puedan mover el precio más de un 5 % en contra; la separación de Medical-Surgical no tiene fecha y las compras pendientes (Option Care, Precision Medicine) son pequeñas frente a una capitalización de 117.000 M USD. Los resultados del 4-nov no retrasan nada (regla 11). Veredicto: no cambia.',
    },
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: bol.cierres_ejercicio ? B.cierres_ejercicio.filter((c) => ['FY2021', 'FY2022', 'FY2023', 'FY2024', 'FY2025', 'FY2026'].includes(c.anio)).map((c) => ({ anio: c.anio, precio_cierre: c.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: c.anio === 'FY2021' })) : B.cierres_ejercicio.filter((c) => ['FY2021', 'FY2022', 'FY2023', 'FY2024', 'FY2025', 'FY2026'].includes(c.anio)).map((c) => ({ anio: c.anio, precio_cierre: c.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: c.anio === 'FY2021' })),
    comentario: 'Precio de cierre de cada ejercicio (31 de marzo) de Yahoo [1]. El PER de los últimos 12 meses con el BPA GAAP no sirve en FY2021 (pérdida por el cargo de opioides): se excluye. En base ajustada adelantada (la de la regla a 12 meses), el múltiplo pasó de 8,2x en marzo de 2021 a 19,3x en marzo de 2026 y ≈ 20x hoy: el mercado ha revalorizado el negocio por el giro a oncología y servicios, la salida de Europa, la desaparición de la incertidumbre de opioides (acuerdo de 2022) y la mejora del crecimiento (BPA +13-16 % anual previsto frente a +8-10 % antes).',
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Los otros dos grandes distribuidores de EE. UU. (Cencora y Cardinal), un distribuidor sanitario de EE. UU. con más margen (Henry Schein), tres mayoristas japoneses (Medipal, Alfresa, Suzuken), uno suizo (Galenica) y uno australiano (EBOS) [6]. Solo Cencora y Cardinal son comparables de verdad (mismo mercado, mismos clientes, mismo circulante negativo); los japoneses y europeos operan en mercados de precios regulados con más caja y menos crecimiento, y Henry Schein en dental. No se incluye Option Care (infusión, en proceso de compra) ni Sinopharm (otro mercado).',
    empresas: comps,
    comentario: `McKesson cotiza a ≈ 20x el BPA ajustado de los próximos 12 meses, por encima de Cencora (${String(comps[0].per_ntm).replace('.', ',')}x) y de Cardinal (${String(comps.find((c) => c.ticker === 'CAH').per_ntm).replace('.', ',')}x) [2, 6]. La prima frente a ellos (≈ 10-15 %) se justifica en parte por más crecimiento previsto del BPA (guía +13-15 % frente a +11-13 % de Cencora) y menos dependencia de un solo cliente desde la renovación de CVS; la de Cardinal es menor por su mezcla con productos médicos. Frente a los mayoristas japoneses (13-18x con caja neta), la prima refleja el ROIC y el crecimiento. Múltiplo de referencia: la mediana de los comparables (${String(perMed).replace(".", ",")}x), que el motor usa en el alcista; el EV/EBITDA se mira con cuidado porque el de Cencora no está en la misma base.`,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2026-10', objetivo: 'Option Care Health (infusión a domicilio)', comprador: 'CD&R (51 %) y McKesson (49 %)', ev: 5800, ev_ventas: r2(5800 / (Y.OPCH.ventas / 1e6)), ev_ebitda: r1(5800 / (Y.OPCH.ebitda / 1e6)), prima_pct: 37, excluir: false, comentario: 'Múltiplos sobre las ventas y el EBITDA de 12 meses de Yahoo [7, 2].' },
      { fecha: '2026-06', objetivo: '≈ 13 % de Medical-Surgical Solutions', comprador: 'Apollo Funds', ev: 13000, ev_ventas: r2(13000 / 11507), ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Valor empresa implícito según la dirección; preferentes convertibles [8, 16].' },
      { fecha: '2025-06', objetivo: 'Core Ventures (70 %; Florida Cancer Specialists)', comprador: 'McKesson', ev: r1(2500 / 0.7), ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '2.500 M USD por el 70 %; valor del 100 % por extrapolación [8].' },
      { fecha: '2025-04', objetivo: 'PRISM Vision (80 %; retina)', comprador: 'McKesson', ev: r1(875 / 0.8), ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '875 M USD por el 80 % [8].' },
      { fecha: '2026-08', objetivo: 'Precision Medicine Group', comprador: 'McKesson', ev: 2250, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Precio en caja; pendiente de cierre [10].' },
    ],
    comentario: 'Las operaciones del sector se pagan por encima del múltiplo de McKesson en servicios de infusión (14,3x el EBITDA de Option Care) y por debajo en distribución de material médico (≈ 1,1 veces ventas por Medical-Surgical) [7, 16]. Casi ninguna publica EBITDA: sirven para saber a qué precio compra McKesson, no para valorarla. Con 117.000 M USD de capitalización y sin accionista de control, McKesson no es objetivo de una compra; su valor de control no es relevante.',
    confianza: 'Baja',
  },
  huecos: [{ seccion: 'consenso', campo: 'EBITDA y BPA de FY2029e del consenso', tipo: 'Complemento', intentos: '1) Yahoo quoteSummary (solo dos ejercicios); 2) MarketBeat (solo el año en curso); 3) MarketScreener no abre sin sesión', decision: 'Omitido' }],
  fuentes: fD,
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Stocktwits, flujo de mensajes de $MCK (sept-oct 2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-16', url: 'https://api.stocktwits.com/api/2/streams/symbol/MCK.json' },
  { id: 2, titulo: 'Seeking Alpha: artículos de análisis sobre MCK (jul-oct 2026: «Re-Rated Again Amidst Increased M&A Efforts», «Underestimating The Moat», «Checks All The Boxes… But There\'s A Big Catch»)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-13', url: 'https://seekingalpha.com/symbol/MCK/analysis' },
  { id: 3, titulo: 'Option Care Stock Trades Below McKesson\'s Deal Price (comentarios de lectores)', editor: 'Benzinga', tipo: 'Foros y redes', fecha: '2026-10-06', url: 'https://www.benzinga.com/trading-ideas/movers/26/10/62203209/option-' },
  { id: 4, titulo: 'MarketBeat: alertas y comentarios sobre McKesson (oct-2026)', editor: 'MarketBeat', tipo: 'Foros y redes', fecha: '2026-10-15', url: 'https://www.marketbeat.com/stocks/NYSE/MCK/news/' },
];
const E = {
  _estado: 'Completa. Stocktwits (30 mensajes) y titulares de análisis de Seeking Alpha; Reddit no abre.',
  sentimiento: {
    tono: 'Positivo', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Stocktwits ($MCK)', fecha: '2026-10', n_comentarios: 30, tono: 'Positivo', resumen: 'Celebran el máximo histórico cerca de 1.000 USD y el acuerdo con CVS; alguno vende para pasar a tecnología y otro avisa del hueco en el gráfico de octubre [1].' },
      { plataforma: 'Seeking Alpha (artículos de análisis)', fecha: '2026-10', n_comentarios: 6, tono: 'Dividido', resumen: 'Mayoría alcista (foso, oncología, recompras; subidas de recomendación tras el 1T27), con una nota de «mantener» en mayo y otra que pide cautela por la valoración [2].' },
      { plataforma: 'Benzinga / Stocktwits sobre Option Care', fecha: '2026-10', n_comentarios: 8, tono: 'Neutro', resumen: 'Debate sobre el diferencial de la oferta por Option Care y sobre si McKesson paga caro por entrar en infusión [3].' },
      { plataforma: 'MarketBeat', fecha: '2026-10', n_comentarios: 5, tono: 'Positivo', resumen: 'Alertas de máximos y subidas de objetivo; las ventas de directivos aparecen sin debate [4].' },
    ],
    temas: [
      { tema: 'Calidad y foso («Big Moat», «impervious to inflation»)', postura: 'Alcista', peso: 'Alto', contraste: 'Los datos lo apoyan: siete años batiendo la guía y ROIC muy por encima del WACC; pero el precio ya lo descuenta (≈ 20x el BPA adelantado frente a una mediana de 16x) [1, 2].' },
      { tema: 'CVS hasta 2032 como «evento que despeja»', postura: 'Alcista', peso: 'Alto', contraste: 'Correcto en lo esencial, pero el contrato definitivo aún no está firmado y las condiciones no se conocen [1].' },
      { tema: 'Compras (Option Care, Precision Medicine): más riesgo', postura: 'Dividida', peso: 'Medio', contraste: 'Son pequeñas frente a la empresa (≈ 3.650 M USD, 3 % de la capitalización) pero alejan a McKesson de la distribución pura; lo recoge el informe en capital y riesgos [3, 2].' },
      { tema: 'Valoración tras subir un 32 % desde mayo', postura: 'Dividida', peso: 'Medio', contraste: 'Es el punto clave del informe: la regla a 12 meses da rentabilidad negativa por el múltiplo, no por el negocio [1].' },
    ],
    lectura: 'El sentimiento es claramente positivo y mejora: los particulares ven a McKesson como valor defensivo de calidad en máximos, y los análisis de Seeking Alpha hablan de «re-rating» y de foso infravalorado [1, 2]. No hay capitulación ni miedo que aprovechar; al contrario, el entusiasmo va con el consenso de analistas (13 de 16 comprar). No anticipa ningún riesgo que el informe no tenga; lo que señala es que la valoración ya no es el argumento de compra. Opiniones, no datos: ninguna cifra sale de aquí.',
    confianza: 'Media',
  },
  huecos: [],
  fuentes: fE,
};
guarda('E', E);
console.log('Notas A-E escritas. Mediana PER comparables:', perMed, comps.map((c) => `${c.ticker} ${c.per_ntm}`).join(', '));
