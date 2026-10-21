// Escribe las notas A-E de Marriott International (corte 2026-10-21) a partir de los documentos de notas/docs (EDGAR), del
// XBRL de la SEC (cuentas-xbrl.json), de bolsa.json (cierre del 20-oct-2026), de yahoo-datos.json (Yahoo quoteSummary del
// 21-oct-2026, 15:55 UTC), de movimiento.json, de docs/stocktwits.json y docs/sa.xml, y de búsquedas web del 21-oct-2026.
// Cada nota cita solo con [n] de su propia lista de fuentes.
// BASE DE INGRESOS: «Adjusted total revenues» de la empresa = ingresos totales − ingresos de costes reembolsados (los costes
// que Marriott repercute a los propietarios de los hoteles sin margen: 19.204 M USD en 2025, el 73 % de las ventas GAAP).
// Con las ventas GAAP el margen operativo sale del 15,8 % y no dice nada del negocio de comisiones.
// Ejecutar: node informes/marriott-2026-10-21/notas/construir-notas.mjs
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
const MOV = lee('movimiento.json').MAR;
const ED = 'https://www.sec.gov/Archives/edgar/data/1048286';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Form 10-K 2025: cuentas, segmentos, Marriott Bonvoy, deuda, riesgos (incluida la IA), auditoría', editor: 'Marriott International, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-02-10', url: `${ED}/000104828626000007/mar-20251231.htm` },
  { id: 2, titulo: 'Marriott International Reports Fourth Quarter 2025 Results (conciliaciones de ingresos ajustados, resultado operativo ajustado, BPA ajustado y EBITDA ajustado; guía 2026)', editor: 'Marriott International, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-02-10', url: `${ED}/000104828626000005/mar-2025q4xex99earningsrel.htm` },
  { id: 3, titulo: 'Notas de resultados del 4T de 2020, 2021, 2022, 2023 y 2024 (conciliaciones anuales y guías del año siguiente)', editor: 'Marriott International, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2025-02-11', url: `${ED}/000162828025004772/mar-2024q4xearningsrelease.htm` },
  { id: 4, titulo: 'Marriott International Reports Second Quarter 2026 Results (RevPAR, comisiones, guía 2026 y del 3T)', editor: 'Marriott International, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-08-03', url: `${ED}/000104828626000033/mar-2026q2xex99earningsrel.htm` },
  { id: 5, titulo: 'Notas de resultados del 3T de 2025 y del 1T de 2026', editor: 'Marriott International, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-05-06', url: `${ED}/000104828626000012/mar-2026q1xex99earningsrel.htm` },
  { id: 6, titulo: 'Form 10-Q del 2T de 2026 (balance a 30-jun-2026, flujos del semestre, deuda, acciones en circulación)', editor: 'Marriott International, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-08-03', url: `${ED}/000104828626000035/mar-20260630.htm` },
  { id: 7, titulo: 'XBRL company facts de Marriott (cuenta, balance y flujos 2016-2025): herramienta cuentas.mjs', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0001048286.json' },
  { id: 8, titulo: 'Form 8-K: línea de crédito ampliada a 5.000 M USD hasta el 23-sep-2031', editor: 'Marriott International, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-09-24', url: `${ED}/000119312526401051/d145370d8k.htm` },
  { id: 9, titulo: 'Folleto (424B5) y 8-K de la emisión de agosto de 2026: 250 M al 4,875 % 2029 y 1.000 M al 5,65 % 2036; calificación Baa2 (Moody\'s) y BBB (S&P)', editor: 'Marriott International, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-08-13', url: `${ED}/000119312526347066/d158956d424b5.htm` },
  { id: 10, titulo: 'Marriott International Reports Fourth Quarter 2019 Results (BPA ajustado de 2019, 6,00 USD, y de 2018, 6,21 USD con 0,65 de plusvalías)', editor: 'Marriott International, Inc. (relación con inversores)', tipo: 'Primaria', fecha: '2020-02-26', url: 'https://marriott.gcs-web.com/node/30021' },
  { id: 11, titulo: 'Marriott International Reports Fourth Quarter 2023 Results (beneficios fiscales de 0,77 y 0,75 USD por acción en el BPA ajustado de 2023)', editor: 'Marriott International, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2024-02-13', url: `${ED}/000162828024004335/mar-2023q4xearningsrelease.htm` },
];

// Ingresos ajustados (sin ingresos de costes reembolsados) [2, 3]; resultado operativo ajustado de la empresa [2, 3];
// depreciación, amortización y otros + amortización de la inversión en contratos («key money», que Marriott resta de los
// ingresos) [1, 3].
const ADJ_ING = { 2021: 3415, 2022: 5361, 2023: 6300, 2024: 6618, 2025: 6997 };
const ADJ_OI = { 2021: 1649, 2022: 3203, 2023: 3935, 2024: 4161, 2025: 4476 };
const DA = { 2021: 220, 2022: 193, 2023: 189, 2024: 183, 2025: 213 };
const CIA = { 2021: 75, 2022: 89, 2023: 88, 2024: 103, 2025: 135 };
const DPA = { 2021: 0, 2022: 1.00, 2023: 1.96, 2024: 2.41, 2025: 2.64 };
const anios = ['2021', '2022', '2023', '2024', '2025'];
const cuenta = X.financieros.cuenta.filter((c) => anios.includes(c.periodo)).map((c) => {
  const a = c.periodo;
  const am = DA[a] + CIA[a];
  const o = { ...c, periodo: a, ingresos: ADJ_ING[a], coste_ventas: null, amortizaciones: am, ebitda: c.ebit + am,
    participadas_en_ebitda: null, no_recurrentes_en_ebitda: c.ebit - ADJ_OI[a], dpa: DPA[a], dpa_extraordinario: 0 };
  // no_recurrentes_en_ebitda (positivo = gasto) = resultado operativo ajustado − GAAP; el motor lo devuelve al EBIT.
  o.no_recurrentes_en_ebitda = ADJ_OI[a] - c.ebit;
  delete o.fin; return o;
});
// Circulante de explotación: clientes = cuentas a cobrar + gastos anticipados; proveedores = cuentas a pagar + nóminas
// devengadas + gastos devengados y otros [A1]. Sin el pasivo de fidelidad ni los ingresos diferidos (ver otros_pasivos).
const CLI = { 2024: 2795 + 294, 2025: 2909 + 317 }, PROV = { 2024: 763 + 1449 + 1641, 2025: 814 + 1438 + 1440 };
const balance = X.balance.historico.filter((b) => anios.includes(b.periodo)).map((b) => {
  const o = { ...b, periodo: b.periodo, arrendamientos: 0, clientes: CLI[b.periodo] ?? null, proveedores: PROV[b.periodo] ?? null, existencias: 0, minoritarios: 0, activos_contrato: null, pasivos_contrato: null };
  delete o.fin; return o;
});
const flujos = X.flujos.historico.filter((f) => anios.includes(f.periodo)).map((f) => {
  const o = { ...f, periodo: f.periodo, pagos_arrendamientos: f.pagos_arrendamientos ?? 0, adquisiciones: f.periodo === '2025' ? 350 : (f.periodo === '2023' ? 100 : (f.adquisiciones ?? 0)) };
  delete o.fin; return o;
});

// Trimestres en la misma base: ingresos ajustados, EBITDA ajustado y BPA ajustado de la empresa [4, 5, 2].
const trim = (p, ing, g, ebitda, bpa, vs) => ({ periodo: p, ingresos: ing, crecimiento_pct: g, crecimiento_organico_pct: null, ebitda, margen_ebitda_pct: r2(ebitda / ing * 100), bpa, vs_consenso: vs });
const A = {
  _estado: 'Completa. Cuentas del XBRL de la SEC comprobadas con el 10-K 2025, el 10-Q del 2T26 y las notas de resultados. Ingresos = ingresos ajustados de la empresa (sin los ingresos de costes reembolsados, que no dejan margen); EBIT = resultado operativo GAAP; no recurrentes = resultado operativo ajustado − GAAP (diferencia neta de costes reembolsados, reestructuración y fusiones, deterioros); amortizaciones = depreciación + amortización de la inversión en contratos. Arrendamientos operativos fuera (US GAAP); la deuda incluye los arrendamientos financieros. Clientes = cuentas a cobrar + gastos anticipados; proveedores = cuentas a pagar + nóminas y gastos devengados (circulante de −466 M en 2025, −6,7 % de los ingresos ajustados), sin el pasivo de fidelidad.',
  financieros: {
    cuenta, ltm: null,
    cambios_perimetro: [
      { periodo: '2025', descripcion: 'Compra de la marca citizenM (≈ 355 M USD) y acuerdos de gestión y franquicia de sus hoteles; la inversión en Sonder (licencia de 2024) se rompió en noviembre de 2025 con 38 M de deterioros y gastos [1, 2].' },
      { periodo: '2023', descripcion: 'Compra de la marca City Express (≈ 100 M USD, México y Latinoamérica) [3].' },
      { periodo: '2026', descripcion: 'Entrada en el bienestar de lujo con Lefay (participación y marca, junio de 2026); deterioro de 68 M por la venta de un hotel en el 2T26 [4].' },
    ],
    comentario: 'Marriott cobra comisiones: no tiene hoteles (51 propios o arrendados de 9.805) [1]. Por eso la base útil son los ingresos ajustados, que quitan los costes reembolsados (nóminas y gastos de los hoteles que la empresa paga y repercute al propietario sin margen: 19.204 M USD de 26.186 en 2025) [2]. En esa base, los ingresos subieron de 3.415 M en 2021 (aún con la pandemia) a 6.997 M en 2025 y el resultado operativo ajustado de 1.649 a 4.476 M, un 64 % de margen [2, 3]. Desde 2023 el crecimiento es del 5-6 % anual: comisiones de franquicia +7 %, gestión base +3 %, incentivos +3 % y la tarjeta de crédito Bonvoy, que crece más que todo lo demás [1]. En 2026 se acelera: las comisiones de franquicia y gestión base subieron un 14 % en el 2T26 por los nuevos contratos de tarjetas con JPMorgan Chase y American Express en EE. UU. [4]. El RevPAR (ingreso por habitación disponible) mundial creció un 2,0 % en 2025 (EE. UU. y Canadá +0,7 %; internacional +5,1 %) [1].',
    ajustes: 'El resultado operativo ajustado quita la diferencia entre ingresos y gastos reembolsados (−299 M USD en 2025: los gastos reembolsados superaron a los ingresos, sobre todo por el programa de fidelidad), la reestructuración y fusiones (−2 M) y los deterioros y gastos de Sonder (38 M) [2]. El BPA ajustado de 2025 fue de 10,02 USD frente a 9,51 GAAP [2]. El de 2023 (9,99) incluye 1,52 USD de beneficios fiscales que no se repiten (0,77 de una reestructuración de propiedad intelectual y 0,75 de la liberación de una provisión de activos fiscales) [11]: normalizado, ≈ 8,47. El de 2018 (6,21) incluye 0,65 de plusvalías por ventas de activos [10]. El ajustado NO quita los pagos en acciones (236 M en 2025), pero el EBITDA ajustado de la empresa (5.383 M) sí los suma: aquí se tratan como coste.',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      trim('3T24', 1638, null, 1229, 2.26, null),
      trim('4T24', 1725, null, 1286, 2.45, null),
      trim('1T25', 1608, null, 1217, 2.32, null),
      trim('2T25', 1812, null, 1415, 2.65, null),
      trim('3T25', 1729, r1((1729 / 1638 - 1) * 100), 1349, 2.47, null),
      trim('4T25', 1848, r1((1848 / 1725 - 1) * 100), 1402, 2.58, null),
      trim('1T26', 1810, r1((1810 / 1608 - 1) * 100), 1398, 2.72, 'Superior'),
      trim('2T26', 2013, r1((2013 / 1812 - 1) * 100), 1592, 3.19, 'Superior'),
    ],
    ultima_presentacion: 'Ingresos ajustados (sin costes reembolsados), EBITDA ajustado y BPA ajustado de la empresa [4, 5, 2]. En el 2T26 (3-ago-2026) el BPA ajustado fue de 3,19 USD, 0,11 sobre el consenso, con ventas totales de 7.070 M algo por debajo; el RevPAR mundial subió un 3,4 % (EE. UU. y Canadá +5,0 %, el mejor trimestre en 13; internacional −0,5 % por Oriente Medio, −43 % con la guerra de Irán; Gran China +3 %; Asia-Pacífico sin China +5 %) [4]. Guía 2026 subida: RevPAR +3-3,5 %, comisiones brutas 6.025-6.055 M, EBITDA ajustado 5.965-6.025 M, BPA ajustado 11,64-11,81 USD (11,32-11,57 en febrero), tipo del 26-26,5 %, inversión de 1.250-1.350 M y más de 4.500 M de devolución al accionista; habitaciones netas en la parte baja del +4,5-5 % [4, 2]. La acción cayó un 7 % el día por la guía del 3T (BPA ajustado 2,74-2,82 USD; RevPAR +3,5-4 %), por debajo de lo que esperaba el mercado [4]. Resultados del 3T26: 2-nov-2026.',
    confianza: 'Alta',
  },
  balance: {
    historico: balance,
    vencimientos: [
      { anio: '2026', importe: 1209 }, { anio: '2027', importe: 2581 }, { anio: '2028', importe: 1454 }, { anio: '2029', importe: 1297 }, { anio: '2030', importe: 1503 }, { anio: '2031+', importe: 8160 },
    ],
    liquidez: 'Caja de 462 M USD a 30-jun-2026 [6]. Línea de crédito multidivisa (respaldo del papel comercial) ampliada el 23-sep-2026 de 4.500 a 5.000 M y hasta el 23-sep-2031; covenant de deuda sobre EBITDA ≤ 4,5 veces [8]. Emisiones de 2026: 600 M al 4,5 % 2033 y 850 M al 5,1 % 2038 (febrero); 250 M al 4,875 % 2029 y 1.000 M al 5,65 % 2036 (agosto) [6, 9].',
    rating: 'Baa2 (Moody\'s) y BBB (S&P), grado de inversión, en los folletos de las emisiones de 2026 [9]',
    coste_deuda_pct: 4.5,
    vida_media_anios: 5.4,
    otros_pasivos: 'Pasivo del programa de fidelidad (Marriott Bonvoy): 7.992 M USD a 31-dic-2025 (3.497 a corto y 4.495 a largo) y 8.444 M a 30-jun-2026 [1, 6]. Son puntos emitidos y cobrados (a hoteles y a los bancos de las tarjetas) que se canjearán por noches: el programa está diseñado para ser neutro a largo plazo y el pasivo crece con el sistema (+473 M en 2025, +452 M en el 1S26), así que funciona como financiación de los clientes, no como deuda. Un punto menos de «breakage» (puntos que no se canjean) sumaría ≈ 50 M al pasivo [1]. Ingresos diferidos de 1.200 M (sobre todo cuotas de franquicia y de las tarjetas cobradas por adelantado) [1]. Arrendamientos operativos: 978 M de pasivo (fuera del puente, US GAAP) [1]. Garantías a propietarios de hasta 225 M (96 M provisionados) [1]. Fuga de datos de Starwood (2018): la apelación anuló en junio de 2025 la certificación de la acción colectiva; la provisión no es material [1].',
    comentario: 'El patrimonio es NEGATIVO (−3.771 M USD en 2025 y −4.525 M a 30-jun-2026) por las recompras: 27.900 M de autocartera acumulada frente a 18.414 M de reservas [1, 6]. No es un problema de solvencia sino de política (se devuelve más de lo que se gana y se financia con deuda); invalida el ROE, el Altman y el ROIC contable. La deuda financiera (16.915 M a 30-jun-2026, con arrendamientos financieros) menos la caja (462) deja 16.453 M de deuda neta, ≈ 2,9 veces el EBITDA ajustado de los últimos doce meses (≈ 5.750 M) y dentro del objetivo de la empresa de 3,0-3,5 veces; las emisiones de agosto (1.250 M) la subieron después [6, 4, 9]. Coste medio del 4,5 % y vida media de 5,4 años a fin de 2025; las emisiones nuevas pagan un 4,5-5,65 % [1, 9].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'El flujo operativo fue de 3.212 M USD en 2025 (2.749 en 2024), después de 434 M de inversión en contratos («key money» que Marriott paga a propietarios para firmar hoteles, dentro del flujo operativo) [1]. La inversión en inmovilizado y tecnología fue de 604 M (750 en 2024). Flujo libre ≈ 2.600 M después de ambos, frente a 4.018 M devueltos al accionista (3.300 de recompras y 718 de dividendos): la diferencia se pagó con deuda [1]. En el 1S26, 1.806 M de flujo operativo (el pasivo de fidelidad aportó 339 M) [6]. La guía de 2026 es de 1.250-1.350 M de inversión total (incluye inversión en contratos, préstamos y la entrada en Lefay) y más de 4.500 M de devolución [4].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'Ernst & Young LLP', anios_auditor: 24, opinion: 'Favorable (sin salvedades) en 2025, también sobre el control interno; asuntos clave: el programa de fidelidad (precio de cada punto y «breakage») y el reparto de gastos entre generales y reembolsados [1]',
    comentario: 'Las cuentas son limpias pero la cifra de ventas GAAP engaña: el 73 % son costes reembolsados sin margen. El juicio contable más importante es el programa de fidelidad (7.992 M USD de pasivo): el precio de cada punto y el porcentaje que nunca se canjea deciden cuánto ingreso se reconoce y cuándo [1]. El BPA ajustado se aleja poco del GAAP (10,02 frente a 9,51 en 2025) y no excluye los pagos en acciones [2]. Señales a vigilar: los gastos reembolsados superan a los ingresos reembolsados desde 2024 (−299 M en 2025), que la empresa excluye del ajustado porque dice que se compensan a largo plazo [2]; y el cambio de directora financiera en 2026 [1].',
    senales: [
      { senal: 'Ingresos reembolsados que inflan las ventas', nivel: 'Baja', comentario: '19.204 M USD de 26.186 en 2025; sin margen. Se usan los ingresos ajustados (6.997 M) [2].' },
      { senal: 'Gastos reembolsados por encima de los ingresos reembolsados', nivel: 'Media', comentario: '−299 M USD en 2025 y −317 M en 2024 fuera del ajustado: si no se compensan, el resultado ajustado sobrestima ≈ 6 % [2].' },
      { senal: 'Juicio contable de la fidelidad (breakage)', nivel: 'Media', comentario: 'Un punto menos de breakage = +50 M de pasivo; asunto clave de auditoría [1].' },
      { senal: 'Patrimonio negativo por recompras', nivel: 'Baja', comentario: '−3.771 M USD (−4.525 M en junio de 2026); invalida ROE y Altman, no la solvencia (grado de inversión) [1, 6, 9].' },
      { senal: 'BPA ajustado de 2023 con beneficios fiscales', nivel: 'Baja', comentario: '1,52 USD por acción que no se repiten; se normaliza en la historia del PER [11].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Prioridades declaradas: mantener el grado de inversión (deuda ajustada de 3,0-3,5 veces el EBITDA ajustado), invertir en el crecimiento del sistema (inversión en contratos, tecnología), un dividendo creciente (0,73 USD trimestrales desde mayo de 2026, +9 %) y devolver el resto con recompras: más de 4.500 M USD en 2026 [4, 2]. Recompras de 6,2 M de acciones por 2.200 M en lo que iba de 2026 hasta el 29-jul [4].',
    adquisiciones: [
      { anio: '2016', objetivo: 'Starwood Hotels & Resorts', importe: 13200, ev_ebitda: null, financiacion: 'Acciones y caja', resultado: 'Hizo de Marriott el mayor grupo hotelero del mundo; integración de los programas de fidelidad en Bonvoy (2019); fuga de datos de 2018 [1].' },
      { anio: '2023', objetivo: 'City Express (marca de gama media en México y Latinoamérica)', importe: 100, ev_ebitda: null, financiacion: 'Caja', resultado: 'Integrada como City Express by Marriott [3].' },
      { anio: '2025', objetivo: 'citizenM (marca y contratos)', importe: 355, ev_ebitda: null, financiacion: 'Caja', resultado: 'Compra de marca sin hoteles: 350 M de adquisiciones en el flujo de 2025 [1].' },
      { anio: '2026', objetivo: 'Lefay (marca de bienestar de lujo, participación)', importe: null, ev_ebitda: null, financiacion: 'Caja', resultado: 'Anunciada en abril-junio de 2026; importe no publicado [4].' },
    ],
    comentario: 'La asignación de capital es la de un negocio de comisiones maduro: invierte poco (≈ 1.000 M USD al año entre tecnología y contratos, 15 % de los ingresos ajustados) y devuelve más de lo que gana. Entre 2022 y 2025 recompró 13.581 M y pagó 2.308 M de dividendos; las acciones diluidas bajaron de 329 M (2021) a 274 M (2025), un 4,5 % anual [1, 7]. Las compras recientes son de marcas, no de hoteles (City Express, citizenM, Lefay), y la licencia con Sonder (2024) acabó mal en 2025 [1]. La deuda ha subido de 10.000 M en 2021 a 16.915 M en junio de 2026 para pagar recompras: el apalancamiento se mantiene en el objetivo porque el EBITDA crece, pero no hay margen para una recesión sin parar las recompras [6].',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'EE. UU. y Canadá', descripcion: '1.065.108 habitaciones; franquicia y gestión de todas las marcas; la mayor parte de las comisiones de incentivo vienen de fuera de aquí [1].', tipo_resultado: 'EBIT', historico: [{ periodo: '2024', ingresos: 2875, resultado: 2640 }, { periodo: '2025', ingresos: 2921, resultado: 2679 }] },
      { nombre: 'Europa, Oriente Medio y África (EMEA)', descripcion: '252.257 habitaciones; más hoteles gestionados y de lujo; Oriente Medio cayó un 43 % en el 2T26 [1, 4].', tipo_resultado: 'EBIT', historico: [{ periodo: '2024', ingresos: 575, resultado: 512 }, { periodo: '2025', ingresos: 621, resultado: 525 }] },
      { nombre: 'Gran China', descripcion: '188.596 habitaciones, casi todas gestionadas [1].', tipo_resultado: 'EBIT', historico: [{ periodo: '2024', ingresos: 249, resultado: 186 }, { periodo: '2025', ingresos: 260, resultado: 185 }] },
      { nombre: 'Asia-Pacífico sin China (APEC)', descripcion: '157.326 habitaciones; India, Japón, Australia, Sudeste Asiático [1].', tipo_resultado: 'EBIT', historico: [{ periodo: '2024', ingresos: 340, resultado: 280 }, { periodo: '2025', ingresos: 370, resultado: 301 }] },
      { nombre: 'Corporativo, tarjetas, propiedad y otros (no asignado)', descripcion: 'Comisiones de marca de las tarjetas de crédito Bonvoy y otras comisiones no asignadas, hoteles propios y arrendados, amortización de contratos, gastos generales (diferencia con el total ajustado, estimación propia) [1, 2].', tipo_resultado: 'EBIT', historico: [{ periodo: '2024', ingresos: 6618 - 2875 - 575 - 249 - 340, resultado: 4161 - 2640 - 512 - 186 - 280 }, { periodo: '2025', ingresos: 6997 - 2921 - 621 - 260 - 370, resultado: 4476 - 2679 - 525 - 185 - 301 }] },
    ],
    geografias: [{ nombre: 'EE. UU. y Canadá', peso_pct: 70 }, { nombre: 'Internacional', peso_pct: 30 }],
    geografias_criterio: 'Comisiones netas asignadas a segmentos en 2025 (2.921 de 4.172 M USD) [1]',
    kpis: [
      { kpi: 'BPA ajustado (USD)', valor_anterior: '9,33', valor_actual: '10,02', variacion: '+7 %', comentario: 'Guía 2026: 11,64-11,81 (+16-18 %) [2, 4].' },
      { kpi: 'Comisiones brutas (M USD)', valor_anterior: '5.170', valor_actual: '5.438', variacion: '+5 %', comentario: 'Guía 2026: 6.025-6.055 (+11 %), con los contratos nuevos de tarjetas [1, 4].' },
      { kpi: 'RevPAR mundial', valor_anterior: '+3,9 %', valor_actual: '+2,0 %', variacion: '−1,9 pp', comentario: 'Guía 2026 +3-3,5 %; 2T26 +3,4 % [1, 4].' },
      { kpi: 'Habitaciones (sistema)', valor_anterior: '≈ 1,71 M', valor_actual: '1,78 M', variacion: '+4,3 %', comentario: 'Cartera de proyectos de ≈ 629.000 habitaciones (44 % en construcción) a junio de 2026 [1, 4].' },
      { kpi: 'Socios de Marriott Bonvoy', valor_anterior: '≈ 260 M', valor_actual: '295 M (jun-2026)', variacion: '—', comentario: '75 % de las noches de EE. UU. y 68 % de las mundiales [1, 4].' },
      { kpi: 'Acciones diluidas medias (M)', valor_anterior: '285,2', valor_actual: '273,6', variacion: '−4 %', comentario: '260,8 M en circulación el 27-jul-2026 [6].' },
    ],
    clientes: 'Dos clientes distintos: los propietarios de los hoteles (que pagan comisiones de franquicia del 4-7 % de los ingresos por habitación, comisiones de gestión base y de incentivo sobre el beneficio del hotel) y los viajeros (que reservan, sobre todo por canales propios: el 75 % de las noches de EE. UU. son de socios Bonvoy) [1]. Ningún propietario pesa de forma relevante; la familia Marriott es dueña de 18 hoteles gestionados (13,4 M USD de comisiones) [1]. Los bancos de las tarjetas (JPMorgan Chase y American Express en EE. UU.) pagan comisiones de marca crecientes; los contratos nuevos de 2026 son el gran motor del año [4]. El poder de precio está en la marca y en Bonvoy: los propietarios aceptan comisiones del 4-7 % porque la marca les trae clientes más baratos que las agencias en línea.',
    confianza: 'Alta',
  },
  huecos: [],
  fuentes: fA,
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Form 10-K 2025 de Marriott: negocio, competencia, cuota de habitaciones, Bonvoy, intermediarios e IA', editor: 'Marriott International, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-02-10', url: `${ED}/000104828626000007/mar-20251231.htm` },
  { id: 2, titulo: 'IHG: análisis value del 20-oct-2026 (tamaño de la industria hotelera mundial ≈ 750.000 M USD según IHG/STR, 57 % de habitaciones de cadena, 24 % de los cinco grandes; ingresos y márgenes de comparables del XBRL)', editor: 'Repositorio de análisis (informes/ihg-2026-10-20)', tipo: 'Sectorial', fecha: '2026-10-20', url: 'informes/ihg-2026-10-20/' },
  { id: 3, titulo: 'Hotels 325 (The List 2026): ranking mundial de grupos hoteleros por habitaciones a fin de 2025', editor: 'HOTELS Magazine', tipo: 'Sectorial', fecha: '2026-07', url: 'https://hotelsmag.com/wp-content/uploads/2026/07/The-List-2026-4.pdf' },
  { id: 4, titulo: 'Marriott International Reports Second Quarter 2026 Results (RevPAR por región, cartera de proyectos)', editor: 'Marriott International, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-08-03', url: `${ED}/000104828626000033/mar-2026q2xex99earningsrel.htm` },
  { id: 5, titulo: 'Trump meets with travel industry CEOs on push to boost foreign tourism (llegadas internacionales −5,5 % en 2025 y −4,7 % hasta julio de 2026)', editor: 'Reuters (vía Devdiscourse)', tipo: 'Prensa', fecha: '2026-09-02', url: 'https://www.devdiscourse.com/article/international/3971709-trump-meets-with-travel-industry-ceos-on-push-to-boost-foreign-tourism' },
  { id: 6, titulo: 'Marriott Plans To Reward AI Travel Agents As It Fights To Control Your Hotel Bookings (entrevista de Capuano en el WSJ: 70 % de reservas directas, Ask Bonvoy, Google y OpenAI)', editor: 'View from the Wing', tipo: 'Prensa', fecha: '2026-07-30', url: 'https://viewfromthewing.com/marriott-plans-to-reward-ai-travel-agents-as-it-fights-to-control-your-hotel-bookings/' },
  { id: 7, titulo: 'Marriott debuts AI-powered hotel search tool Ask Bonvoy (beta en EE. UU., ≈ 10.000 hoteles); IHG, Wyndham y Accor con aplicaciones dentro de ChatGPT', editor: 'Hotel Dive', tipo: 'Prensa', fecha: '2026-06-17', url: 'https://www.hoteldive.com/news/marriott-debuts-ai-powered-hotel-search-tool-ask-bonvoy/823130/' },
  { id: 8, titulo: 'Marriott Hotel Owners Push Back Over Loyalty Program Economics (carta de 51 propietarios con ≈ 1.000 hoteles; comisiones de tarjetas ≈ 1.000 M USD en 2026, +35 %)', editor: 'Loyalty360 (sobre el Wall Street Journal)', tipo: 'Prensa', fecha: '2026-06-16', url: 'https://www.loyalty360.org/Content-Gallery/Daily-News/Marriott-Hotel-Owners-Push-Back-Over-Loyalty-Progr' },
  { id: 9, titulo: 'Hilton Worldwide Holdings (HLT) Up 4.6% (Freedom Broker: oferta nueva de habitaciones en EE. UU. del 0,4 % en 2026 y 0,6 % en 2027)', editor: 'Weiss Ratings', tipo: 'Prensa', fecha: '2026-10-14', url: 'https://weissratings.com/en/instant-news-alerts/hilton-worldwide-holdings-inc-hlt-up-4-6-should-i-catch-this-wave' },
  { id: 10, titulo: 'Cotizaciones, capitalización y múltiplos de comparables (quoteSummary, 21-oct-2026)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/MAR/' },
];
const B_ = {
  _estado: 'Completa. Sin ficha sectorial de hoteles en sectores/ (el encargo no permite escribir fuera de la carpeta del informe): perímetro, tamaño y márgenes de comparables tomados del análisis de IHG del 20-oct-2026 y comprobados con el 10-K de Marriott y el ranking de HOTELS.',
  sector: {
    definicion: 'Mercado relevante: la industria hotelera mundial, de la que Marriott cobra comisiones por marca, distribución (Bonvoy) y gestión. Se mide en ingresos de la industria (≈ 750.000 M USD en 2025 según IHG con datos de STR) y en habitaciones (≈ 19 M en el mundo; el 57 % afiliadas a una cadena y el 24 % a los cinco grandes) [2]. Marriott tiene el 17 % de las habitaciones de EE. UU. y el 4 % del resto del mundo según su 10-K [1]. Quedan fuera los alquileres de corta estancia (Airbnb, Vrbo), que compiten por la demanda de ocio y el 10-K cita como competidores [1].',
    tamano: '≈ 750.000 M USD de ingresos de la industria hotelera mundial en 2025 (IHG/STR) [2]; Marriott, 1,78 M de habitaciones (≈ 9 % de las ≈ 19 M del mundo) [1, 2]',
    unidad_serie: 'millones de USD (ingresos de la industria hotelera mundial; 2026-2028 estimación con +4 % anual)',
    serie: [{ anio: '2023', tamano: 690000 }, { anio: '2024', tamano: 720000 }, { anio: '2025', tamano: 750000 }, { anio: '2026e', tamano: 780000 }, { anio: '2027e', tamano: 810000 }, { anio: '2028e', tamano: 845000 }],
    tcac_historico_pct: 4.2, tcac_previsto_pct: 4, cr5_pct: 24, estructura: 'Fragmentada',
    drivers: [
      { driver: 'Ciclo de viajes y RevPAR (precio × ocupación)', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'RevPAR mundial +2,0 % en 2025 y +3,4 % en el 2T26 (EE. UU. y Canadá +5,0 %; Oriente Medio −43 %) [4, 1]. En 2009 y 2020 el RevPAR cayó un 17 % y un 60 %: las comisiones siguen al RevPAR casi uno a uno.' },
      { driver: 'Crecimiento de habitaciones de marca (conversiones, cartera)', efecto: '+', horizonte: 'Estructural', evidencia: 'Habitaciones netas +4,5 % anual; cartera de 629.000 habitaciones (≈ 35 % del sistema) [4]. Los hoteles independientes se pasan a una marca por la distribución.' },
      { driver: 'Oferta nueva de habitaciones en EE. UU.', efecto: '+', horizonte: 'Cíclico', evidencia: 'Crecimiento de la oferta del 0,4 % en 2026 y 0,6 % en 2027 según Freedom Broker: poca construcción sostiene el precio [9].' },
      { driver: 'Viajero internacional hacia EE. UU. y China', efecto: '−', horizonte: 'Cíclico', evidencia: 'Llegadas internacionales a EE. UU. −5,5 % en 2025 y −4,7 % hasta julio de 2026 (visados, aranceles, Canadá −20 %) [5]; Gran China +0,4 % de RevPAR en 2025 y +3 % en el 2T26 [1, 4].' },
      { driver: 'Tarjetas de crédito y fidelidad', efecto: '+', horizonte: 'Estructural', evidencia: 'Comisiones de tarjetas ≈ 1.000 M USD en 2026 (+35 %) con los contratos nuevos de JPMorgan y American Express [8, 4].' },
      { driver: 'IA en la búsqueda y reserva de viajes', efecto: '+/−', horizonte: 'Estructural', evidencia: 'El 10-K avisa de que la IA de los intermediarios puede erosionar la lealtad a la marca y subir los costes de distribución [1]; Marriott responde con Ask Bonvoy y acuerdos con Google y OpenAI [6, 7].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Cinco grandes con el 24 % de las habitaciones del mundo compiten por firmar hoteles (comisiones, «key money») y por el viajero (fidelidad) [2, 3].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Los propietarios negocian comisiones y «key money» y en 2026 51 de ellos pidieron más parte de las tarjetas [8]; el viajero compara precios en un clic.' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Marriott no tiene hoteles: los «proveedores» son los propietarios, que necesitan la marca para llenar habitaciones [1].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Una marca y un programa de 295 M de socios no se replican; sí entran las plataformas (Airbnb ofrece hoteles) [1, 4].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'Alquileres de corta estancia en ocio, agencias en línea y, ahora, agentes de IA que pueden intermediar la reserva [1, 7].' },
    ],
    ciclo: { posicion: 'Expansión', comentario: 'El RevPAR crece en EE. UU. (+5 % en el 2T26, el mejor en 13 trimestres) con poca oferta nueva y el Mundial de 2026, pero el viajero internacional hacia EE. UU. cae y Oriente Medio sufre la guerra de Irán [4, 5, 9]. Es una expansión madura: el RevPAR ya supera al de 2019 y su crecimiento real es bajo; una recesión lo bajaría con rapidez (−17 % en 2009).' },
    regulacion: 'La regulación pesa poco en el negocio de comisiones: franquicias (ley de franquicias de EE. UU.), protección de datos (multas por la fuga de Starwood en Reino Unido y EE. UU.), tarjetas de crédito (una ley de topes a las comisiones de intercambio, como la Credit Card Competition Act, recortaría las comisiones de las tarjetas) y la IA [1]. Los visados, aranceles y restricciones de viaje de EE. UU. afectan a la demanda [5].',
    tendencias: 'Las cadenas ganan cuota frente a los independientes con conversiones y marcas de gama media y alargada (City Express, Four Points Flex, StudioRes); el lujo y los «resorts» crecen más (RevPAR de lujo en EE. UU. +9 % en el 2T26) [4]. La fidelidad y las tarjetas se convierten en el segundo motor de comisiones. La distribución se mueve hacia la IA: buscadores conversacionales (Ask Bonvoy), aplicaciones dentro de ChatGPT de IHG, Wyndham y Accor, y agentes de reserva [7, 6].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 9, posicion: '1.º del mundo por habitaciones (1,78 M a fin de 2025; ≈ 9 % de las habitaciones del mundo, estimación con ≈ 19 M); 17 % de las de EE. UU. y 4 % fuera [1, 2, 3]',
    competidores: [
      { nombre: 'Hilton Worldwide', pais: 'EE. UU.', ticker: 'HLT', ingresos: 12039, cuota_pct: 7, margen_ebit_pct: 22.4, comentario: '1,35 M de habitaciones; el rival más directo (mismo modelo y gamas) y el que más crece en habitaciones netas (6-7 %) [2, 3].' },
      { nombre: 'Jin Jiang International', pais: 'China', ticker: '600754.SS', ingresos: null, cuota_pct: 8, margen_ebit_pct: null, comentario: '1,55 M de habitaciones, casi todas en China y gama económica; poco solapamiento con el lujo de Marriott [3].' },
      { nombre: 'InterContinental Hotels Group', pais: 'Reino Unido', ticker: 'IHG', ingresos: null, cuota_pct: 5, margen_ebit_pct: null, comentario: '1,03 M de habitaciones; más gama media (Holiday Inn) y China [3, 2].' },
      { nombre: 'Accor', pais: 'Francia', ticker: 'AC.PA', ingresos: 6324, cuota_pct: 5, margen_ebit_pct: 14.3, comentario: '0,88 M de habitaciones; líder en Europa y Oriente Medio [2, 3].' },
      { nombre: 'Wyndham Hotels & Resorts', pais: 'EE. UU.', ticker: 'WH', ingresos: 1429, cuota_pct: 5, margen_ebit_pct: 28.1, comentario: '0,87 M de habitaciones; franquicia económica de EE. UU. [2, 3].' },
      { nombre: 'Choice Hotels', pais: 'EE. UU.', ticker: 'CHH', ingresos: 1597, cuota_pct: 3, margen_ebit_pct: 28.1, comentario: '0,66 M de habitaciones; económica y media en EE. UU. [2, 3].' },
      { nombre: 'Hyatt Hotels', pais: 'EE. UU.', ticker: 'H', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Lujo y «todo incluido» (Playa, 2025); menos habitaciones pero el mismo cliente de alto gasto [10].' },
      { nombre: 'Airbnb', pais: 'EE. UU.', ticker: 'ABNB', ingresos: 12241, cuota_pct: null, margen_ebit_pct: 20.8, comentario: 'Sustituto en ocio y estancias largas; empieza a ofrecer hoteles [2, 1].' },
    ],
    foso: {
      veredicto: 'Amplio', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 4, evidencia: 'Bonvoy (295 M de socios) atrae viajeros que atraen propietarios que amplían el sistema: 75 % de las noches de EE. UU. son de socios [1, 4].' },
        { fuente: 'Costes de cambio', puntuacion: 4, evidencia: 'Contratos de franquicia de 20 años o más y de gestión de 20-30; cambiar de marca cuesta obras y pérdida de distribución [1].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 5, evidencia: 'Ritz-Carlton, St. Regis, JW Marriott, Westin, Sheraton y otras 30 marcas; 6.207 M USD de marcas en balance [1].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Escala en compras, tecnología y distribución propia (70 % de reservas por canales propios, más baratos que las agencias) [6].' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'El mayor sistema del mundo reparte la fidelidad y la tecnología entre 9.805 hoteles [1].' },
      ],
    },
    amenazas: 'Lo que más puede erosionar el foso es la distribución: si los agentes de IA (ChatGPT, Gemini, Perplexity) se convierten en la puerta de entrada del viajero, el poder de elegir el hotel pasa de la marca al algoritmo, y Marriott tendría que pagar por aparecer como paga a las agencias en línea [1, 6]. Segundo, la tensión con los propietarios por el reparto del dinero de las tarjetas y la fidelidad [8]. Tercero, Hilton crece más en habitaciones netas y compite por los mismos contratos [2].',
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'Marriott es el mayor grupo hotelero del mundo: 9.805 hoteles y 1,78 M de habitaciones con más de 30 marcas, del lujo (Ritz-Carlton, St. Regis, JW Marriott) a la gama media (Courtyard, Fairfield, City Express) [1]. Casi no tiene hoteles: el 78 % de los hoteles son franquiciados y el 20 % gestionados, y solo 51 propios o arrendados [1]. Une a todos con Marriott Bonvoy, el programa de fidelidad con 295 M de socios, y con su sistema de reservas [4].',
    como_gana_dinero: 'Cobra comisiones: de franquicia (4-7 % de los ingresos por habitación del hotel; 3.325 M USD en 2025, incluidas las de marca de las tarjetas de crédito), de gestión base (≈ 3 % de los ingresos del hotel; 1.322 M) y de incentivo (un porcentaje del beneficio del hotel; 791 M, dos tercios de fuera de EE. UU.) [1]. Las comisiones crecen con el RevPAR y con el número de habitaciones. Las tarjetas Bonvoy (JPMorgan Chase y American Express en EE. UU.) pagan por usar la marca y comprar puntos, y son el motor de 2026 [4]. El margen operativo ajustado es del 64 % sobre los ingresos sin reembolsos [1]. El resto de los ingresos (costes reembolsados, 73 % de las ventas GAAP) son gastos de los hoteles que Marriott paga y repercute sin margen.',
  },
  huecos: [],
  fuentes: fB,
};
guarda('B', B_);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Proxy statement 2026 (DEF 14A): consejo, retribución, accionistas, operaciones vinculadas', editor: 'Marriott International, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-03-27', url: `${ED}/000114036126011590/ny20062722x771_def14a.htm` },
  { id: 2, titulo: 'Form 8-K: resultados de la junta del 8-may-2026 (votos)', editor: 'Marriott International, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-05-13', url: `${ED}/000119312526220804/d152439d8k.htm` },
  { id: 3, titulo: 'Form 8-K: retiro de Liam Brown (EE. UU. y Canadá) y nuevos presidentes de región (Satya Anand, Neal Jones, Federico Greppi)', editor: 'Marriott International, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-01-09', url: `${ED}/000119312526008335/d31810d8k.htm` },
  { id: 4, titulo: 'Form 8-K: retiro de la directora financiera Kathleen (Leeny) Oberg tras el 10-K de 2025 y nombramiento de Jennifer C. Mason', editor: 'Marriott International, Inc. (SEC)', tipo: 'Primaria', fecha: '2025-07-14', url: `${ED}/000119312525158742/` },
  { id: 5, titulo: 'Form 4 de directivos y consejeros de Marriott (21-oct-2025 a 21-oct-2026), herramienta form4.mjs', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001048286&type=4' },
  { id: 6, titulo: 'Notas de resultados del 4T de 2022-2025 (guías iniciales de BPA ajustado y resultados)', editor: 'Marriott International, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-02-10', url: `${ED}/000104828626000005/mar-2025q4xex99earningsrel.htm` },
  { id: 7, titulo: 'Form 10-K 2025: litigios (fuga de datos de Starwood), auditor', editor: 'Marriott International, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-02-10', url: `${ED}/000104828626000007/mar-20251231.htm` },
];
const C = {
  _estado: 'Completa. Proxy 2026, 8-K de la junta de mayo de 2026 y de los cambios de directivos, Form 4 de 12 meses.',
  directivos: {
    equipo: [
      { nombre: 'Anthony G. Capuano', cargo: 'Consejero delegado', desde: '2021', participacion_pct: null, trayectoria: 'En Marriott desde 1995; dirigió el desarrollo mundial (la cartera de proyectos) antes de suceder a Arne Sorenson en febrero de 2021. Con él, el BPA ajustado pasó de 3,19 USD (2021) a 10,02 (2025) y la guía de 2026 es de 11,64-11,81 [6].' },
      { nombre: 'Jennifer C. Mason', cargo: 'Directora financiera', desde: '2026', participacion_pct: null, trayectoria: 'Nombrada en julio de 2025 para suceder a Leeny Oberg (directora financiera desde 2016) tras el 10-K de 2025 [4].' },
      { nombre: 'Satya Anand', cargo: 'Presidente del grupo para EE. UU. y Canadá (con CALA)', desde: '2026', participacion_pct: null, trayectoria: 'Antes presidente de EMEA; sustituye a Liam Brown, que dejó el cargo el 28-mar-2026 y se retira el 30-jun [3].' },
      { nombre: 'Neal Jones', cargo: 'Presidente de EMEA', desde: '2026', participacion_pct: null, trayectoria: 'Sustituye a Satya Anand en la región [3].' },
      { nombre: 'David S. Marriott', cargo: 'Presidente del consejo (no ejecutivo)', desde: '2021', participacion_pct: null, trayectoria: 'Nieto del fundador; presidente desde 2021, cuando J.W. Marriott Jr. pasó a presidente emérito [1].' },
    ],
    historial_guidance: [
      { anio: '2023', guia: 'BPA ajustado 7,23-7,91 USD', real: '9,99 (8,47 sin 1,52 de beneficios fiscales)', cumplida: 'Sí' },
      { anio: '2024', guia: '9,18-9,52 USD', real: '9,33', cumplida: 'Sí' },
      { anio: '2025', guia: '9,82-10,19 USD', real: '10,02', cumplida: 'Sí' },
      { anio: '2026', guia: '11,32-11,57 USD (febrero); subida a 11,64-11,81 en agosto', real: 'En curso (consenso 11,74)', cumplida: 'En curso' },
      { anio: 'EBITDA 2025', guia: 'EBITDA ajustado 5.295-5.435 M USD', real: '5.383', cumplida: 'Sí' },
    ],
    comentario: 'Equipo creíble: cumple la guía cada año, en general en la mitad del rango (2024 y 2025) y por encima en 2023 por el rebote de los viajes [6]. Capuano es un hombre de la casa que conoce la parte que da el crecimiento (desarrollo). En 2026 hay relevo amplio: directora financiera nueva (Mason, nombrada en julio de 2025) y nuevos presidentes de EE. UU. y Canadá, EMEA y CALA; la continuidad la da la familia en el consejo [3, 4]. La guía de 2026 se subió dos veces, aunque la del 3T decepcionó [6].',
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      { nombre: 'David S. Marriott', cargo: 'Presidente del consejo (familia)', tipo: 'Dominical', desde: '2021', comisiones: '—' },
      { nombre: 'Anthony G. Capuano', cargo: 'Consejero delegado', tipo: 'Ejecutivo', desde: '2021', comisiones: '—' },
      { nombre: 'Frederick A. Henderson', cargo: 'Consejero coordinador independiente', tipo: 'Independiente', desde: '2013', comisiones: 'Nombramientos y Gobierno (presidente)' },
      { nombre: 'Deborah M. Harrison', cargo: 'Consejera (familia)', tipo: 'Dominical', desde: '2014', comisiones: '—' },
      { nombre: 'Isabella D. Goren', cargo: 'Consejera', tipo: 'Independiente', desde: '2022', comisiones: 'Auditoría (presidenta)' },
      { nombre: 'Aylwin B. Lewis', cargo: 'Consejero', tipo: 'Independiente', desde: '2016', comisiones: 'Retribuciones (presidente)' },
      { nombre: 'Margaret M. McCarthy', cargo: 'Consejera', tipo: 'Independiente', desde: '2019', comisiones: 'Tecnología y Seguridad de la Información (presidenta)' },
      { nombre: 'Susan C. Schwab', cargo: 'Consejera', tipo: 'Independiente', desde: '2015', comisiones: 'Varias' },
      { nombre: 'Horacio D. Rozanski', cargo: 'Consejero', tipo: 'Independiente', desde: '2021', comisiones: 'Varias' },
      { nombre: 'Lauren R. Hobart', cargo: 'Consejera', tipo: 'Independiente', desde: '2023', comisiones: 'Varias' },
      { nombre: 'Grant F. Reid', cargo: 'Consejero', tipo: 'Independiente', desde: '2023', comisiones: 'Varias' },
      { nombre: 'Sean C. Tresvant', cargo: 'Consejero', tipo: 'Independiente', desde: '2025', comisiones: 'Varias' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: true, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: true, cambios_cupula_24m: 1,
    voto_remuneracion_pct: 92.7, voto_remuneracion_contra_pct: 7.0, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 22.97, fijo: 1.40, variable_corto: 4.53, variable_largo: 16.14, ratio_salario_medio: 474 },
    remuneracion: 'El consejero delegado cobró 22,97 M USD en 2025: 1,40 M de fijo, 4,53 M de bonus, 12,01 M en acciones y 4,13 M en derechos de revalorización, más 0,91 M de otros [1]. El bonus se liga en un 60 % al EBITDA ajustado y en un 40 % a objetivos de crecimiento y pagó el 162 %; las acciones por objetivos se ligan al EBITDA ajustado de 2027 con un modificador de ±20 % por la rentabilidad relativa para el accionista (el plan 2023-2025 pagó el 200 %) [1]. Premia el EBITDA, no el retorno sobre el capital; hay cláusula de recuperación. Ratio frente al empleado mediano: 474 veces [1]. En la junta del 8-may-2026 la remuneración tuvo un 92,7 % de apoyo y un ≈ 7 % en contra [2].',
    accionistas: [
      { nombre: 'Familia Marriott (incluida JWM Family Enterprises, 8,30 %)', pct: 17.57, tipo: 'Familia', variacion: 'Proxy 2026: 13,22 % en el grupo principal; 5,66 M de acciones pignoradas (2,13 %)' },
      { nombre: 'Vanguard', pct: 7.9, tipo: 'Institucional', variacion: 'Proxy 2026' },
      { nombre: 'BlackRock', pct: 5.73, tipo: 'Institucional', variacion: 'Proxy 2026' },
      { nombre: 'Consejeros y directivos (con la familia en el consejo)', pct: 11.43, tipo: 'Internos', variacion: 'Ventas de 66,4 M USD en 12 meses, ninguna compra' },
    ],
    insiders: [
      { fecha: '2025-11 a 2026-08', persona: 'Anthony G. Capuano (consejero delegado)', operacion: 'Venta', acciones: null, importe: 22.63 },
      { fecha: '2025-11 a 2026-08', persona: 'Deborah M. Harrison (consejera, familia)', operacion: 'Venta', acciones: null, importe: 21.65 },
      { fecha: '2025-11 a 2026-08', persona: 'William P. Brown (directivo)', operacion: 'Venta', acciones: null, importe: 5.25 },
      { fecha: '2025-11 a 2026-08', persona: 'Rena H. Reiss / Peggy Fang Roe / Benjamin Breland y otros directivos', operacion: 'Venta', acciones: null, importe: 9.0 },
      { fecha: '2025-11 a 2026-08', persona: 'David S. Marriott (presidente)', operacion: 'Venta', acciones: null, importe: 2.94 },
      { fecha: '2025-11 a 2026-08', persona: 'J.W. Marriott Jr. (presidente emérito)', operacion: 'Venta', acciones: null, importe: 1.23 },
    ],
    control_y_defensas: 'Sin accionista de control: la familia Marriott suma un 17,6 % con sus sociedades y está en el consejo con el presidente (David S. Marriott) y una consejera (Deborah Harrison) [1]. Una acción, un voto; consejo elegido cada año; presidente separado del consejero delegado y consejero coordinador independiente; 10 de 13 consejeros independientes y todas las comisiones independientes [1]. Operaciones vinculadas pequeñas: 18 hoteles de la familia gestionados (13,4 M USD de comisiones) y 13 de otros consejeros (6,2 M) [1]. La pignoración de 5,66 M de acciones de la sociedad familiar (2,1 %) es un riesgo menor de ventas forzosas [1].',
    alertas: [
      'Ventas de consejeros y directivos por 66,4 M USD en 12 meses (22,6 M del consejero delegado y 21,7 M de una consejera de la familia), ninguna compra y ninguna con plan 10b5-1 [5].',
      'Relevo amplio en 2026: directora financiera y presidentes de EE. UU. y Canadá, EMEA y CALA [3, 4].',
      'Retribución ligada al EBITDA ajustado, no al retorno sobre el capital: incentiva crecer con «key money» y deuda [1].',
    ],
    confianza: 'Alta',
  },
  huecos: [],
  fuentes: fC,
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de MAR, SPY y XLY (precio, rango, rentabilidades, beta, cierres de ejercicio): herramienta bolsa.mjs', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/MAR/history' },
  { id: 2, titulo: 'Consenso de MAR y comparables (estimaciones de BPA y ventas, objetivos, recomendaciones, cambios de objetivo, precio de la sesión del 21-oct a las 11:55 de Nueva York): quoteSummary', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/MAR/analysis' },
  { id: 3, titulo: 'Daily Treasury Par Yield Curve Rates 2026 (10 años: 5,12 % el 20-oct-2026)', editor: 'U.S. Department of the Treasury', tipo: 'Primaria', fecha: '2026-10-20', url: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve&field_tdr_date_value=2026' },
  { id: 4, titulo: 'Implied ERP by month (ERPbymonth.xlsx): octubre de 2026, 4,20 %', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 5, titulo: 'Marriott International Reports Second Quarter 2026 Results (guía 2026 y 3T)', editor: 'Marriott International, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-08-03', url: `${ED}/000104828626000033/mar-2026q2xex99earningsrel.htm` },
  { id: 6, titulo: 'Marriott International Announces Release Date For Third Quarter 2026 Earnings (2-nov-2026, 7:00 de Nueva York)', editor: 'Marriott International, Inc.', tipo: 'Primaria', fecha: '2026-10', url: 'https://marriott.gcs-web.com/node/37666' },
  { id: 7, titulo: 'Titulares de Seeking Alpha sobre MAR (RSS, mar-oct 2026)', editor: 'Seeking Alpha', tipo: 'Prensa', fecha: '2026-10-21', url: 'https://seekingalpha.com/api/sa/combined/MAR.xml' },
  { id: 8, titulo: 'Movimiento del precio de MAR, HLT, H, IHG, SPY y XLY (1-12 meses, máximos, media de 200, avisos P1-P5): herramienta movimiento.mjs', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/MAR/history' },
  { id: 9, titulo: 'Form 4 de directivos (form4.mjs): ventas de 66,4 M USD en 12 meses, sin compras', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001048286&type=4' },
  { id: 10, titulo: 'Hilton Worldwide Holdings (HLT) Up 4.6% (iniciación de Freedom Broker; subida del sector hotelero el 14-oct)', editor: 'Weiss Ratings', tipo: 'Prensa', fecha: '2026-10-14', url: 'https://weissratings.com/en/instant-news-alerts/hilton-worldwide-holdings-inc-hlt-up-4-6-should-i-catch-this-wave' },
  { id: 11, titulo: 'Notas de resultados del 4T de 2019, 2020-2025 (BPA ajustado de cada año)', editor: 'Marriott International, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-02-10', url: `${ED}/000104828626000005/mar-2025q4xex99earningsrel.htm` },
  { id: 12, titulo: 'Form 8-K: línea de crédito de 5.000 M USD hasta 2031; folleto de la emisión de agosto de 2026', editor: 'Marriott International, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-09-24', url: `${ED}/000119312526401051/d145370d8k.htm` },
  { id: 13, titulo: 'Trump meets with travel industry CEOs on push to boost foreign tourism', editor: 'Reuters (vía Devdiscourse)', tipo: 'Prensa', fecha: '2026-09-02', url: 'https://www.devdiscourse.com/article/international/3971709-trump-meets-with-travel-industry-ceos-on-push-to-boost-foreign-tourism' },
  { id: 15, titulo: 'IHG e Hilton: análisis value del 20-oct y 21-oct-2026 (crecimiento, margen EBITDA y deuda neta/EBITDA de los comparables)', editor: 'Repositorio de análisis (informes/ihg-2026-10-20, informes/hilton-2026-10-21)', tipo: 'Analistas', fecha: '2026-10-21', url: 'informes/ihg-2026-10-20/' },
  { id: 14, titulo: 'Marriott Hotel Owners Push Back Over Loyalty Program Economics', editor: 'Loyalty360 (sobre el Wall Street Journal)', tipo: 'Prensa', fecha: '2026-06-16', url: 'https://www.loyalty360.org/Content-Gallery/Daily-News/Marriott-Hotel-Owners-Push-Back-Over-Loyalty-Progr' },
];
const c = Y.MAR;
const t = Object.fromEntries(c.trend.map((x) => [x.periodo, x]));
const bol = B.bolsa;
// Comparables: grupos hoteleros de marca cotizados en EE. UU. y Europa, con el precio de Yahoo del 21-oct (Accor en EUR → USD a 1,1222).
const COMP = [['HLT', 'Hilton Worldwide', 'US'], ['IHG', 'InterContinental Hotels Group', 'GB'], ['H', 'Hyatt Hotels', 'US'], ['WH', 'Wyndham Hotels & Resorts', 'US'], ['CHH', 'Choice Hotels', 'US'], ['AC.PA', 'Accor', 'FR']];
// Crecimiento de ventas, margen EBITDA y deuda neta/EBITDA de los análisis de IHG (20-oct) e Hilton (21-oct) del repositorio [15].
const CRM = { HLT: [8.6, 60.5, 4.2], IHG: [5.7, 56, 2.6], H: [8.3, 24.7, 4.7], WH: [6.1, 39.7, 4.6], CHH: [3.5, 47.1, 4.4], 'AC.PA': [6.9, 18.3, 3.4] };
const comps = COMP.map(([tk, nombre, pais]) => {
  const y = Y[tk]; const fx = y.divisa === 'EUR' ? 1.1222 : 1;
  const evE = tk === 'IHG' ? null : r1(y.ev_ebitda);
  return { nombre, ticker: tk, pais, capitalizacion: Math.round(y.cap * fx / 1e6), ev_ventas: null, ev_ebitda_ltm: evE, ev_ebitda_ntm: null,
    per_ntm: r1(y.per_adelantado), crecimiento_pct: CRM[tk][0], margen_ebitda_pct: CRM[tk][1], roic_pct: null, dn_ebitda: CRM[tk][2], fcf_yield_pct: null };
});
const perMed = (() => { const v = comps.map((x) => x.per_ntm).sort((a, b) => a - b); const n = v.length; return n % 2 ? v[(n - 1) / 2] : r1((v[n / 2 - 1] + v[n / 2]) / 2); })();
const hora = new Date(c.hora * 1000).toISOString().slice(11, 16);
const D = {
  _estado: `Completa. Precio de cierre del 20-oct-2026 (397,31 USD); la sesión del 21-oct estaba abierta (${n2(r2(c.precio))} USD a las ${hora} UTC). Mediana del PER adelantado de los comparables: ${n2(perMed)}.`,
  _per_mediana_comparables: perMed,
  identificacion: {
    nombre: 'Marriott International, Inc.', nombre_corto: 'Marriott', ticker: 'MAR', isin: 'US5719032022', mercado: 'Nasdaq Global Select Market', indice_referencia: 'S&P 500',
    pais: 'Estados Unidos', pais_iso: 'US', sector: 'Consumo discrecional', industria: 'Hoteles, complejos y cruceros', sede: 'Bethesda (Maryland)', fundacion: '1927', empleados: 148000, web: 'https://www.marriott.com',
    precio: B.identificacion.precio, fecha_precio: B.identificacion.fecha_precio, acciones: 260.8, capitalizacion_publicada: Math.round(c.cap / 1e6), free_float_pct: 82.4,
    max_52s: B.identificacion.max_52s, min_52s: B.identificacion.min_52s, volumen_medio_diario: `≈ ${Math.round(B.volumen_3m.importe_dia_millones)} M USD/día (3 meses)`, proximos_resultados: '2026-11-02',
  },
  consenso: {
    guidance: 'Guía de 2026 (3-ago-2026): RevPAR mundial +3-3,5 %; habitaciones netas en la parte baja del +4,5-5 %; comisiones brutas de 6.025-6.055 M USD; gastos generales de 895-875 M; EBITDA ajustado de 5.965-6.025 M; BPA ajustado de 11,64-11,81 USD; tipo efectivo del 26-26,5 %; inversión de 1.250-1.350 M; más de 4.500 M de devolución al accionista. 3T26: RevPAR +3,5-4 %, EBITDA ajustado de 1.439-1.468 M y BPA ajustado de 2,74-2,82 USD [5].',
    estimaciones: [
      { periodo: '2026e', ingresos: Math.round(t['0y'].ventas / 1e6), ebitda: null, ebit: null, bpa: r2(t['0y'].bpa), dpa: 2.84, fuente: `Yahoo Finance, ${t['0y'].n} analistas (ventas totales, con reembolsos) [2]` },
      { periodo: '2027e', ingresos: Math.round(t['+1y'].ventas / 1e6), ebitda: null, ebit: null, bpa: r2(t['+1y'].bpa), dpa: null, fuente: `Yahoo Finance, ${t['+1y'].n} analistas [2]` },
    ],
    recomendaciones: { n_analistas: c.reco.strongBuy + c.reco.buy + c.reco.hold + c.reco.sell + c.reco.strongSell, comprar: c.reco.strongBuy + c.reco.buy, mantener: c.reco.hold, vender: c.reco.sell + c.reco.strongSell, po_medio: r2(c.po_medio), po_min: c.po_min, po_max: c.po_max },
    revisiones: `El BPA ajustado de 2026 del consenso pasó de ${n2(r2(t['0y'].bpa_hace90))} USD hace 90 días a ${n2(r2(t['0y'].bpa))} y el de 2027 de ${n2(r2(t['+1y'].bpa_hace90))} a ${n2(r2(t['+1y'].bpa))}: casi sin cambios tras la guía de agosto [2]. Los objetivos de precio suben en octubre con la acción: JPMorgan 388 → 406 USD (neutral, 21-oct), Evercore 400 → 420 (19-oct), Wells Fargo 425 → 426 (sobreponderar), Barclays 348 → 363 (igual que el mercado, 16-oct), Morgan Stanley 380 → 384 (sobreponderar, 12-oct); Freedom Broker empieza con comprar y 408 (14-oct) [2, 10]. Objetivo medio de ${c.n_analistas} analistas: ${n2(r2(c.po_medio))} USD (${c.po_min}-${c.po_max}), por debajo del precio. Sin consenso gratuito de 2028.`,
    base_ebitda: 'sin consenso de EBITDA (solo BPA y ventas totales)', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    ...bol,
    beta: bol.beta, posicion_corta_pct: r1(c.corto_pct * 100),
    comentario: 'La acción ha batido al índice en uno, tres, cinco y diez años: rentabilidad total del +49,2 % en 12 meses, +29,5 % anual en tres años, +21,6 % en cinco y +20,5 % en diez, frente al +15,8 %, 23,7 %, 12,6 % y 15,5 % del S&P 500 [1]. Lo explica el BPA ajustado (de 3,19 USD en 2021 a 10,02 en 2025), las recompras y la subida del múltiplo (de ≈ 18 veces el BPA del año siguiente a fin de 2022 a ≈ 30 hoy) [1, 11]. Beta de 1,17 mensual a cinco años (1,11 ajustada; 0,90 semanal a dos años) y volatilidad del 27 %; la mayor caída en el último año fue del −30,5 % entre febrero y abril de 2025 (aranceles) y la mayor de un día, −7 % el 3-ago-2026 por la guía del 3T [1].',
    contexto: {
      movimiento: { fecha: MOV.fecha, var_1m_pct: MOV.var_1m_pct, var_3m_pct: MOV.var_3m_pct, var_6m_pct: MOV.var_6m_pct, var_12m_pct: MOV.var_12m_pct, dist_max_52s_pct: MOV.dist_max_52s_pct, dist_min_52s_pct: MOV.dist_min_52s_pct, dist_max_historico_pct: MOV.dist_max_historico_pct, tendencia: MOV.tendencia, volatilidad_60d_pct: MOV.volatilidad_60d_pct, avisos: MOV.avisos },
      movimientos_fuertes: [
        { periodo: 'feb 2026', var_pct: 9.1, causa: 'Resultados del 4T25 y guía de 2026 con más de 4.000 M de devolución al accionista; +9,1 % el día [11, 7].', veredicto: 'no cambia', condicion: null },
        { periodo: 'mar-abr 2026', var_pct: 12.0, causa: 'Subida con el mercado al acercarse el fin de la guerra de Irán (petróleo a la baja) y la entrada en Lefay; máximos de abril con Hilton [7].', veredicto: 'no cambia', condicion: null },
        { periodo: 'ago 2026', var_pct: -9.1, causa: 'Resultados del 2T26 (3-ago): BPA por encima pero guía del 3T por debajo de lo esperado; −7 % el día [5, 7].', veredicto: 'no cambia', condicion: null },
        { periodo: 'sep-oct 2026', var_pct: MOV.var_1m_pct, causa: 'Subida de todo el sector hotelero (Hilton +17 %, Hyatt +13 %, IHG +11 % en un mes con el S&P 500 plano) con subidas de objetivo de los analistas y la tesis de poca oferta nueva en EE. UU.; sin noticia propia de Marriott [8, 10, 2].', veredicto: 'no cambia', condicion: null },
      ],
      noticias: [
        { fecha: '2026-11-02', tipo: 'resultados', hecho: 'Resultados del 3T26 el 2-nov antes de la apertura; guía de BPA ajustado de 2,74-2,82 USD y consenso de 2,84 [6, 2].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-21', tipo: 'recomendación', hecho: 'JPMorgan sube el objetivo a 406 USD (neutral); Evercore a 420; objetivo medio de los analistas ≈ 385 USD, por debajo del precio [2].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-09-24', tipo: 'deuda o capital', hecho: 'Línea de crédito ampliada a 5.000 M USD hasta 2031 [12].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-09-02', tipo: 'otro', hecho: 'Reunión de la Casa Blanca con directivos del turismo (Marriott incluida) por la caída del viajero internacional a EE. UU. (−4,7 % hasta julio) [13].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-08-13', tipo: 'deuda o capital', hecho: 'Emisión de 1.250 M USD de bonos (4,875 % 2029 y 5,65 % 2036) para fines generales y recompras [12].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-08-03', tipo: 'resultados', hecho: 'Resultados del 2T26: BPA ajustado de 3,19 USD (+0,11 sobre el consenso), guía anual subida y guía del 3T por debajo; −7 % el día [5].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-06-16', tipo: 'otro', hecho: '51 propietarios con ≈ 1.000 hoteles piden a Marriott más parte del dinero de las tarjetas Bonvoy [14].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-06-16', tipo: 'otro', hecho: 'Lanzamiento de Ask Bonvoy, buscador de hoteles con IA, en beta en EE. UU. [7].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-05-11', tipo: 'deuda o capital', hecho: 'Dividendo trimestral subido un 9 %, a 0,73 USD [7].', veredicto: 'no cambia', condicion: null },
        { fecha: '2025-10-21 a 2026-10-21', tipo: 'directivos', hecho: 'Ventas de consejeros y directivos por 66,4 M USD, ninguna compra [9].', veredicto: 'no cambia', condicion: null },
      ],
      proximos_resultados: '2026-11-02',
      veredicto: 'no cambia',
      condicion: null,
      comentario: `La acción está en máximos (${n2(MOV.var_1m_pct)} % en un mes, ${n2(MOV.var_12m_pct)} % en un año) y no salta ningún aviso P de la herramienta [8]. La subida del último mes no es de Marriott sino del sector: Hilton +17 %, Hyatt +13 % e IHG +11 % con el S&P 500 plano, empujados por subidas de objetivo de los analistas y la tesis de poca oferta nueva de habitaciones en EE. UU. [8, 10]. No hay ampliaciones, colocaciones ni decisiones con fecha que puedan mover el precio más de un 5 % en contra; los resultados del 2-nov no retrasan nada (regla 11). Una subida sectorial sin cambio del negocio no cambia la decisión, que ya es de no comprar por valoración. Veredicto: no cambia.`,
    },
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: B.cierres_ejercicio.filter((x) => ['2021', '2022', '2023', '2024', '2025'].includes(x.anio)).map((x) => ({ anio: x.anio, precio_cierre: x.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    comentario: 'Precio de cierre de cada año de Yahoo [1]. En base ajustada adelantada (la de la regla a 12 meses: cierre ÷ BPA ajustado real del año siguiente), Marriott cotizó a ≈ 24 veces a fin de 2017, 18 a fin de 2018, 25 a fin de 2021, 18 a fin de 2022 (con el BPA de 2023 sin beneficios fiscales), 24 a fin de 2023, 28 a fin de 2024 y 26 a fin de 2025; hoy, ≈ 30 veces nuestro BPA de 2027 [11]. Los cierres de 2019 y 2020 no sirven (BPA de la pandemia del año siguiente: 0,18 y 3,19 USD).',
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Grupos hoteleros de marca, con el modelo de franquicia y gestión: Hilton, IHG, Hyatt, Wyndham, Choice y Accor [2]. Hilton es el comparable más directo (mismo modelo, gamas y país); Wyndham y Choice son franquicia económica de EE. UU., más baratas; Hyatt y Accor tienen aún hoteles propios. No se incluyen Airbnb ni las agencias en línea (otro modelo).',
    empresas: comps,
    comentario: `Marriott cotiza a ≈ ${n2(r1(c.per_adelantado))} veces el BPA de 2027 del consenso, por debajo de Hilton (${n2(comps[0].per_ntm)}) y Hyatt (${n2(comps[2].per_ntm)}) y muy por encima de IHG (${n2(comps[1].per_ntm)}), Accor (${n2(comps[5].per_ntm)}), Wyndham (${n2(comps[3].per_ntm)}) y Choice (${n2(comps[4].per_ntm)}) [2]. La mediana (${n2(perMed)} veces) mezcla dos grupos: los grandes del lujo y la gama alta (Marriott, Hilton, Hyatt), que el mercado paga a 30-37 veces por el crecimiento de habitaciones y la fidelidad, y los de gama económica, a 15. El EV/EBITDA de IHG de Yahoo no es fiable y se deja en blanco; crecimiento, margen y deuda de los comparables, de los análisis de IHG e Hilton [15].`,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2016-09', objetivo: 'Starwood Hotels & Resorts', comprador: 'Marriott International', ev: 13200, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: true, comentario: 'Precio de compra (acciones y caja) de hace diez años; referencia histórica [11].' },
      { fecha: '2025', objetivo: 'citizenM (marca)', comprador: 'Marriott International', ev: 355, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: true, comentario: 'Compra de marca sin hoteles [11].' },
      { fecha: '2026-09', objetivo: '16 hoteles gestionados por Marriott en Japón', comprador: 'GIC', ev: 800, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: true, comentario: 'Compra de inmuebles, no de la marca: dice el precio de los hoteles, no el del negocio de comisiones [7].' },
    ],
    comentario: 'No hay transacciones recientes de grupos hoteleros de marca con múltiplos publicados que sirvan para valorar a Marriott. Con ≈ 104.000 M USD de capitalización y la familia con el 17,6 %, no es objetivo realista de compra.',
    confianza: 'Baja',
  },
  huecos: [
    { seccion: 'consenso', campo: 'BPA y EBITDA de 2028e del consenso', tipo: 'Complemento', intentos: '1) Yahoo quoteSummary (solo dos ejercicios); 2) titulares de Seeking Alpha; 3) búsqueda web de previsiones de 2028', decision: 'Omitido' },
  ],
  fuentes: fD,
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Stocktwits, flujo de mensajes de $MAR (2-sep a 20-oct-2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-21', url: 'https://api.stocktwits.com/api/2/streams/symbol/MAR.json' },
  { id: 2, titulo: 'Seeking Alpha: titulares y artículos sobre MAR (mar-oct 2026: «The Loyalty Engine Is Outgrowing The Hotel Cycle», «Solid Results Factored Into Its Elevated Valuation», «Its Upside Has Already Traveled Too Long, Too Far», «Proves Resilient To The Iran Shock»)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-21', url: 'https://seekingalpha.com/symbol/MAR/analysis' },
  { id: 3, titulo: 'Merlintrader (vía Stocktwits): «Can Fee Growth Outrun a $1.25 Billion August Bond Sale?»', editor: 'Merlintrader', tipo: 'Foros y redes', fecha: '2026-09-03', url: 'https://www.merlintrader.com/' },
];
const E = {
  _estado: 'Completa. Stocktwits (30 mensajes del 2-sep al 20-oct-2026, la mitad de ellos promoción de otro valor) y titulares de Seeking Alpha; Reddit no abre.',
  sentimiento: {
    tono: 'Mixto', tendencia: 'Mejorando',
    revisadas: [
      { plataforma: 'Stocktwits ($MAR)', fecha: '2026-10', n_comentarios: 30, tono: 'Positivo', resumen: 'Mensajes propios de MAR mayoritariamente alcistas (los 400 USD como soporte, «steam rolling»), con dos bajistas técnicos («hanging man» tras cinco semanas de subida) y uno que no entiende la subida con el mercado débil; en septiembre algunos veían la acción «para cortos» tras el «rally de la guerra de Irán». La mitad del flujo es spam de otra empresa (TGE) [1].' },
      { plataforma: 'Seeking Alpha (artículos y titulares)', fecha: '2026-10', n_comentarios: 8, tono: 'Mixto', resumen: 'Dividido: un alcista sobre la fidelidad que «crece más que el ciclo hotelero» y otro sobre la resistencia al choque de Irán, frente a dos que dicen que la valoración ya recoge los buenos resultados [2].' },
    ],
    temas: [
      { tema: 'Fidelidad y tarjetas como motor fuera del ciclo', postura: 'Alcista', peso: 'Alto', contraste: 'Correcto en 2026 (comisiones de franquicia y gestión base +14 % en el 2T26 por las tarjetas) [2]; pero es un salto por contratos nuevos que no se repite cada año y que los propietarios quieren compartir.' },
      { tema: 'Valoración exigente tras subir', postura: 'Bajista', peso: 'Alto', contraste: 'Es el punto clave del informe: 30 veces el BPA de 2027 frente a una mediana adelantada de ≈ 25 [2].' },
      { tema: 'Deuda para recompras', postura: 'Bajista', peso: 'Medio', contraste: 'Cierto: 1.250 M de bonos en agosto y patrimonio negativo, aunque dentro del objetivo de apalancamiento [3].' },
      { tema: 'Análisis técnico y rotación sectorial', postura: 'Dividida', peso: 'Bajo', contraste: 'Subida del sector entero en octubre; no aporta datos del negocio [1].' },
    ],
    lectura: 'El sentimiento es mixto tirando a positivo y mejora con el precio: los particulares celebran los máximos y Seeking Alpha se divide entre la tesis de la fidelidad y la de la valoración [1, 2]. Los analistas están más fríos que el precio (objetivo medio por debajo de la cotización, mitad comprar y mitad mantener). No hay miedo que aprovechar ni euforia extrema. No anticipa riesgos que el informe no tenga. Opiniones, no datos: ninguna cifra sale de aquí.',
    confianza: 'Media',
  },
  huecos: [],
  fuentes: fE,
};
guarda('E', E);
console.log('Notas A-E escritas. Mediana PER comparables:', perMed, comps.map((x) => `${x.ticker} ${x.per_ntm}`).join(', '));
