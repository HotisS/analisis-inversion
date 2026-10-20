// Escribe las notas A-E de Orion Oyj (corte 2026-10-20) a partir de los documentos de notas/docs (web de Orion, Bayer,
// EFPIA, BCE, Bundesbank), del XBRL ESEF (cuentas-xbrl.json), de bolsa.json, movimiento.json y yahoo-datos.json
// (Yahoo quoteSummary del 20-oct-2026, 16:48 UTC). Cada nota cita solo con [n] de su propia lista de fuentes.
// Ejecutar: node informes/orion-2026-10-20/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const lee = (f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const r1 = (x) => (x == null ? null : Math.round(x * 10) / 10);
const r2 = (x) => (x == null ? null : Math.round(x * 100) / 100);
const X = lee('cuentas-xbrl.json');
const B = lee('bolsa.json');
const M = lee('movimiento.json')['ORNBV.HE'];
const Y = lee('yahoo-datos.json').datos;
const W = 'https://www.orionpharma.com';
const MAN = lee('docs/_manifest.json');
const u = (k) => MAN[k].url;

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Financial Statement documents 2025 (informe del consejo, cuentas consolidadas auditadas, notas, informe de auditoría, accionistas)', editor: 'Orion Oyj', tipo: 'Primaria', fecha: '2025-12', url: u('orion-fs-documents-2025') },
  { id: 2, titulo: 'Financial Statement Release 1-12/2025 (cuenta, balance, flujos, trimestres, divisiones, perspectivas 2026)', editor: 'Orion Oyj', tipo: 'Primaria', fecha: '2026-02-12', url: u('orion-fs-release-2025') },
  { id: 3, titulo: 'Half-Year Financial Report 1-6/2026', editor: 'Orion Oyj', tipo: 'Primaria', fecha: '2026-07-17', url: u('orion-h1-2026') },
  { id: 4, titulo: 'Interim Report 1-3/2026', editor: 'Orion Oyj', tipo: 'Primaria', fecha: '2026-04-23', url: u('orion-q1-2026') },
  { id: 5, titulo: 'Interim Report 1-9/2025', editor: 'Orion Oyj', tipo: 'Primaria', fecha: '2025-10', url: u('orion-q3-2025') },
  { id: 6, titulo: 'Financial Statement Release 1-12/2024', editor: 'Orion Oyj', tipo: 'Primaria', fecha: '2024-12', url: u('orion-fs-release-2024') },
  { id: 7, titulo: 'Financial Statement Release 1-12/2023', editor: 'Orion Oyj', tipo: 'Primaria', fecha: '2023-12', url: u('orion-fs-release-2023') },
  { id: 8, titulo: 'Financial Statement Release 2022', editor: 'Orion Oyj', tipo: 'Primaria', fecha: '2022-12', url: u('orion-fy-2022') },
  { id: 9, titulo: 'Financial Statement Release 2021', editor: 'Orion Oyj', tipo: 'Primaria', fecha: '2021-12', url: u('orion-fy-2021') },
  { id: 10, titulo: 'Financial Statement Release 2020', editor: 'Orion Oyj', tipo: 'Primaria', fecha: '2020-12', url: u('orion-fy-2020') },
  { id: 11, titulo: 'Financial Statement Release 2019', editor: 'Orion Oyj', tipo: 'Primaria', fecha: '2019-12', url: u('orion-fy-2019') },
  { id: 12, titulo: 'Cuentas anuales ESEF (XBRL) de Orion Oyj, ejercicios 2019-2025 (LEI 74370029VAHCXDR7B745)', editor: 'filings.xbrl.org (ESEF)', tipo: 'Primaria', fecha: '2026-10-20', url: 'https://filings.xbrl.org/74370029VAHCXDR7B745' },
  { id: 13, titulo: 'Presentación de resultados del 2T 2026', editor: 'Orion Oyj', tipo: 'Primaria', fecha: '2026-07-17', url: u('orion-q2-2026-pres') },
  { id: 14, titulo: 'Interim Report 1-3/2025', editor: 'Orion Oyj', tipo: 'Primaria', fecha: '2025-03', url: u('orion-q1-2025') },
  { id: 15, titulo: 'Interim Report 1-9/2024 (abandono de ODM-111)', editor: 'Orion Oyj', tipo: 'Primaria', fecha: '2024-09', url: u('orion-q3-2024') },
  { id: 16, titulo: 'Orion Corporation completed share acquisitions (recompra de 500.000 acciones B)', editor: 'Orion Oyj', tipo: 'Primaria', fecha: '2026-09-30', url: u('rel-buyback-done') },
  { id: 17, titulo: 'Orion Corporation to commence acquisition of own shares for its share-based incentive plans', editor: 'Orion Oyj', tipo: 'Primaria', fecha: '2026-08-27', url: u('rel-buyback-lti') },
];
const xc = Object.fromEntries(X.financieros.cuenta.map((c) => [c.periodo, c]));
const xb = Object.fromEntries(X.balance.historico.map((c) => [c.periodo, c]));
const xf = Object.fromEntries(X.flujos.historico.map((c) => [c.periodo, c]));
const anios = ['2019', '2020', '2021', '2022', '2023', '2024', '2025'];
// Del informe de cada año [A1, A2, A6-A11]: EBITDA, amortizaciones (con deterioros), gastos comerciales + administración,
// hitos (no recurrentes en sentido económico, pero dentro del EBITDA publicado), DPA del ejercicio y acciones medias.
const EBITDA = { 2019: 308.9, 2020: 336.5, 2021: 289.1, 2022: 487.1, 2023: 326.4, 2024: 509.4, 2025: 688.3 };
const AMORT = { 2019: 56.1, 2020: 56.5, 2021: 45.8, 2022: 47.5, 2023: 51.5, 2024: 92.8, 2025: 56.7 };
const COMERC = { 2019: 215.7, 2020: 204.3, 2021: 191.0, 2022: 209.1, 2023: 224.8, 2024: 278.1, 2025: 289.5 };
const ADMIN = { 2019: 47.8, 2020: 48.9, 2021: 47.9, 2022: 75.4, 2023: 74.8, 2024: 81.7, 2025: 86.8 };
const DPA = { 2019: 1.50, 2020: 1.50, 2021: 1.50, 2022: 1.60, 2023: 1.62, 2024: 1.64, 2025: 1.80 };
const ACC = { 2019: 140.5, 2020: 140.6, 2021: 140.6, 2022: 140.4, 2023: 140.4, 2024: 140.5, 2025: 140.7 };
const GFIN = { 2019: 2.6, 2020: 2.0, 2021: null, 2022: null, 2023: null, 2024: 7.6, 2025: 8.2 };
// Deterioros dentro del EBIT (no del EBITDA): 2024, 41 M (ODM-111 17,5 y ganaxolona 23,5). En el EBITDA de 2023 hay +30,7 de
// pensiones (ingreso no recurrente): se resta como «no recurrente» negativo.
const NOREC = { 2019: null, 2020: null, 2021: null, 2022: null, 2023: -30.7, 2024: null, 2025: null };
const cuenta = anios.map((a) => ({
  periodo: a, ingresos: xc[a].ingresos, coste_ventas: xc[a].coste_ventas, gastos_generales: r1(COMERC[a] + ADMIN[a]), ebitda: EBITDA[a], amortizaciones: AMORT[a],
  ebit: xc[a].ebit, resultado_financiero: xc[a].resultado_financiero, bai: xc[a].bai, impuestos: xc[a].impuestos, minoritarios: 0, beneficio_neto: xc[a].beneficio_neto,
  gastos_financieros: GFIN[a], participadas_en_ebitda: null, no_recurrentes_en_ebitda: NOREC[a], bpa: xc[a].bpa, dpa: DPA[a], dpa_extraordinario: 0, acciones_diluidas: ACC[a],
}));
const INTANG = { 2019: 37.6, 2020: 29.5, 2021: 55.5, 2022: 103.8, 2023: 112.9, 2024: 87.9, 2025: 100.3 };
const PPE = { 2019: 320.9, 2020: 319.6, 2021: 332.6, 2022: 373.3, 2023: 400.9, 2024: 417.6, 2025: 457.4 };
const RES = { 2019: 684.2, 2020: 635.7, 2021: 652.3, 2022: 823.3, 2023: 802.9, 2024: 918.0, 2025: 1199.8 };
const balance = anios.map((a) => ({
  periodo: a, activo_total: xb[a].activo_total, activo_corriente: xb[a].activo_corriente, pasivo_corriente: xb[a].pasivo_corriente, pasivo_total: xb[a].pasivo_total,
  fondo_comercio: xb[a].fondo_comercio, intangibles: INTANG[a], inmovilizado_material: PPE[a], existencias: xb[a].existencias, clientes: xb[a].clientes, proveedores: xb[a].proveedores,
  activos_contrato: null, pasivos_contrato: null, caja: xb[a].caja,
  // 2025: 305,4 de deuda con intereses = 296,0 de préstamos + 9,4 de arrendamientos [A1]; antes, la deuda con intereses incluye arrendamientos.
  deuda_financiera: a === '2025' ? 296.0 : xb[a].deuda_financiera, arrendamientos: a === '2025' ? 9.4 : 0,
  patrimonio_neto: xb[a].patrimonio_neto, minoritarios: 0, reservas: RES[a],
}));
const LEASE = { 2019: null, 2020: null, 2021: null, 2022: null, 2023: 4.5, 2024: 5.2, 2025: 6.9 };
const ADQ = { 2019: 0, 2020: 0, 2021: 0, 2022: 82, 2023: 0, 2024: 0, 2025: 4 };
const flujos = anios.map((a) => ({
  periodo: a, flujo_operativo: xf[a].flujo_operativo, capex: xf[a].capex, pagos_arrendamientos: LEASE[a] ?? xf[a].pagos_arrendamientos ?? 0, adquisiciones: ADQ[a],
  desinversiones: xf[a].desinversiones ?? 0, dividendos: xf[a].dividendos, recompras: xf[a].recompras ?? 0, emision_acciones: 0, intereses_en_financiacion: 0,
}));

const A = {
  _estado: 'Completa. Cuentas 2019-2025 del XBRL ESEF del regulador [12] comprobadas con los informes de cada año [1, 2, 6-11]; EBITDA, amortizaciones, gastos comerciales, intangibles y reservas que faltan en el XBRL, de los informes. LTM a junio de 2026 [3].',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 2057.8, ebitda: 800.4, ebit: 740.4, beneficio_neto: 587.1, bpa: 4.18, dpa: 1.80, dpa_extraordinario: 0, fcf: 373, participadas_en_ebitda: null, no_recurrentes_en_ebitda: -180 },
    cambios_perimetro: [
      { periodo: '2022', descripcion: 'Compra de Inovet (salud animal, Bélgica) por ≈ 82 M EUR: fondo de comercio de 13,5 a 87,2 M [8].' },
      { periodo: '2026', descripcion: 'Rusia: actividad liquidada, −3,3 M EUR en el 2T26; sin efecto material [3].' },
    ],
    comentario: 'Las ventas pasaron de 1.051 M EUR en 2019 a 1.890 M en 2025 (+10,3 % anual) y el beneficio neto de 200 a 500 M [12]. Casi todo el salto viene de Nubeqa (darolutamida, cáncer de próstata, vendida por Bayer): Orion registró 87 M en 2022 y 610 M en 2025 entre regalías (432,5) y venta de pastillas a Bayer (177,3) [2]. Los pagos por hitos distorsionan cada año: 233,7 M en 2022 (sobre todo el pago inicial de MSD por ODM-208, hoy opevesostat), 133,8 en 2024 y 183,4 en 2025 (180 de Bayer por las ventas de Nubeqa, cobrado en el 2T26) [2, 6, 8]; no se repiten y el BPA de 2025 (3,56 EUR) los lleva dentro (≈ 1,04 EUR por acción). 2023 lleva un ingreso de 30,7 M de pensiones, que se resta como no recurrente, y 2024 deterioros de 41 M (ODM-111 17,5 y ganaxolona 23,5) en las amortizaciones [6, 7]. El LTM a junio de 2026 incluye el hito de 180 M (registrado en el 4T25): se marca como no recurrente.',
    ajustes: 'El EBITDA es el publicado por Orion (resultado de explotación + amortizaciones y deterioros) [2]. Los hitos van dentro de las ventas y del EBITDA publicados; para el PER histórico y el BPA comparable se restan después de impuestos (hitos × 0,8 ÷ acciones). Orion no publica un BPA ajustado.',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '3T24', ingresos: 471.3, crecimiento_pct: 56.5, crecimiento_organico_pct: null, ebitda: 215.0, margen_ebitda_pct: r1(215.0 / 471.3 * 100), bpa: 1.14, vs_consenso: null },
      { periodo: '4T24', ingresos: 434.4, crecimiento_pct: 35.3, crecimiento_organico_pct: null, ebitda: 147.1, margen_ebitda_pct: r1(147.1 / 434.4 * 100), bpa: 0.52, vs_consenso: null },
      { periodo: '1T25', ingresos: 354.6, crecimiento_pct: 14.9, crecimiento_organico_pct: null, ebitda: 91.5, margen_ebitda_pct: r1(91.5 / 354.6 * 100), bpa: 0.44, vs_consenso: null },
      { periodo: '2T25', ingresos: 416.5, crecimiento_pct: 26.9, crecimiento_organico_pct: null, ebitda: 118.6, margen_ebitda_pct: r1(118.6 / 416.5 * 100), bpa: 0.59, vs_consenso: null },
      { periodo: '3T25', ingresos: 423.2, crecimiento_pct: -10.2, crecimiento_organico_pct: null, ebitda: 135.1, margen_ebitda_pct: r1(135.1 / 423.2 * 100), bpa: 0.68, vs_consenso: null },
      { periodo: '4T25', ingresos: 695.3, crecimiento_pct: 60.1, crecimiento_organico_pct: null, ebitda: 343.0, margen_ebitda_pct: r1(343.0 / 695.3 * 100), bpa: 1.85, vs_consenso: null },
      { periodo: '1T26', ingresos: 417.7, crecimiento_pct: 17.8, crecimiento_organico_pct: null, ebitda: 130.4, margen_ebitda_pct: r1(130.4 / 417.7 * 100), bpa: 0.64, vs_consenso: null },
      { periodo: '2T26', ingresos: 521.6, crecimiento_pct: 25.2, crecimiento_organico_pct: null, ebitda: 191.9, margen_ebitda_pct: r1(191.9 / 521.6 * 100), bpa: 1.00, vs_consenso: null },
    ],
    ultima_presentacion: 'El 2T26 (17-jul-2026) creció un 25,2 % con Nubeqa +69 % (236,8 M EUR) porque se alcanzó en el trimestre el tramo más alto de la escala anual de regalías; Orion subió la guía a ventas de 2.000-2.100 M y resultado de explotación de 650-750 M [3, 13]. El 3T24 llevaba 130 M de hitos y el 4T25 el de 180 M de Bayer: los trimestres no son comparables entre sí. El 3T26 se publica el 28-oct-2026 [A3].'.replace(' [A3]', ''),
    confianza: 'Alta',
  },
  balance: {
    historico: balance,
    vencimientos: [{ anio: '2026', importe: 190.1 }, { anio: '2027-2030', importe: 115.3 }],
    liquidez: 'Caja de 130,2 M EUR a 30-jun-2026 frente a 132,7 M de deuda con intereses (deuda neta de 2,5 M); ratio de solvencia (patrimonio sobre activo) del 67,9 % [3]. El préstamo que vencía en 2026 se devolvió en el primer semestre con el cobro del hito de Bayer (deuda con intereses de 305,4 a 132,7 M) [1, 3].',
    rating: 'Sin calificación crediticia publicada.',
    coste_deuda_pct: r1(8.2 / ((305.4 + 357.5) / 2) * 100),
    vida_media_anios: 1.7,
    otros_pasivos: 'Pensiones: activo neto de 12,8 M y pasivo de 2,6 M EUR (planes finlandeses casi cerrados) [1]. Pago aplazado de compras de 6,5 M [3]. Sin litigios materiales provisionados.',
    comentario: 'Balance muy sólido: deuda neta casi nula, patrimonio de 1.268,9 M EUR y el circulante como principal uso de caja. Existencias (525 M) y clientes (318 M) crecen con Nubeqa: Orion fabrica las pastillas para Bayer y cobra las regalías trimestrales a crédito; a diciembre, «otras cuentas a cobrar» (374 M) incluían el hito de 180 M [1, 3].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'El flujo operativo fue de 317 M EUR en 2025 (menos que el beneficio de 500 M porque el hito de 180 M se cobró en 2026) y de 311,8 M en el 1S26 (+98,7 %) [2, 3]. El dividendo (≈ 230 M al año) absorbe la mayor parte del flujo libre; la inversión subió a 85-117 M desde 2021 (capacidad para Nubeqa en Turku y Kuopio, Fermion) [1, 2]. Recompra de 500.000 acciones B por 40,5 M EUR entre el 28-ago y el 29-sep-2026 para los planes de incentivos [16, 17].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'KPMG Oy Ab (socio firmante Toni Aaltonen)', anios_auditor: 8,
    opinion: 'Favorable, sin salvedades, sobre las cuentas de 2025 [1].',
    comentario: 'Cuentas limpias y sencillas: sin minoritarios, sin deuda relevante ni ajustes «no GAAP». La calidad del beneficio depende de entender dos cosas: los hitos (ingresos reales pero irregulares) y la estacionalidad de las regalías de Nubeqa, que suben de tramo dentro de cada año y concentran el beneficio en la segunda mitad [2, 3].',
    senales: [
      { senal: 'Hitos dentro de las ventas', nivel: 'Media', comentario: '183 M EUR en 2025 (10 % de las ventas y ≈ 29 % del beneficio): sin ellos el BPA de 2025 sería ≈ 2,52 EUR [2].' },
      { senal: 'Flujo operativo frente a beneficio', nivel: 'Baja', comentario: '2025: 317 frente a 500 M por el hito cobrado en 2026; en el LTM a junio, 472 frente a 587 M [2, 3].' },
      { senal: 'Concentración de ingresos en un socio', nivel: 'Alta', comentario: 'Bayer paga las regalías y compra las pastillas: ≈ 32 % de las ventas de 2025 y más de la mitad del resultado de explotación (estimación propia) [2].' },
      { senal: 'Deterioros de I+D', nivel: 'Baja', comentario: '41 M EUR en 2024 (ODM-111 y ganaxolona) [6, 15].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Dividendo creciente cada año que reparte entre el 50 % y el 100 % del beneficio del grupo, teniendo en cuenta la solidez financiera; objetivos de la estrategia 2024-2028: ventas +8 % anual desde 2023, resultado de explotación creciendo más que las ventas, ratio de solvencia ≥ 50 % y rentabilidad sobre fondos propios ≥ 25 % [1, 2]. Dividendo de 2025: 1,80 EUR en dos plazos de 0,90 (el segundo, con registro el 20-oct-2026 y pago el 27-oct) [1].',
    adquisiciones: [
      { anio: '2022', objetivo: 'Inovet (medicamentos veterinarios, Bélgica)', importe: 82, ev_ebitda: null, financiacion: 'Caja', resultado: 'Integrada en salud animal (141 M EUR de ventas en 2025) [8, 2].' },
      { anio: '2026', objetivo: 'Recompra de 500.000 acciones B para incentivos', importe: 40.5, ev_ebitda: null, financiacion: 'Caja', resultado: 'Terminada el 29-sep-2026 a ≈ 80,98 EUR de media [16].' },
    ],
    comentario: 'Asignación prudente: dividendo como uso principal, compras pequeñas y licencias (biosimilares de nivolumab con Shilpa y de pembrolizumab con Qilu) en vez de grandes adquisiciones. Desde 2019 ha repartido ≈ 1.530 M EUR de dividendos y no ha emitido acciones [12].',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'Medicamentos innovadores', descripcion: 'Nubeqa (regalías y pastillas para Bayer), Stalevo/Comtess (entacapona), Dexdor, Simdax, hitos de socios', tipo_resultado: 'EBIT', historico: [{ periodo: '2023', ingresos: 235.1, resultado: null }, { periodo: '2024', ingresos: 525.2, resultado: null }, { periodo: '2025', ingresos: 812.7, resultado: null }] },
      { nombre: 'Productos de marca (Branded Products)', descripcion: 'Easyhaler (asma y EPOC) y medicamentos de marca propios en Europa', tipo_resultado: 'EBIT', historico: [{ periodo: '2023', ingresos: 260.9, resultado: null }, { periodo: '2024', ingresos: 287.5, resultado: null }, { periodo: '2025', ingresos: 314.6, resultado: null }] },
      { nombre: 'Genéricos y salud de consumo', descripcion: 'Genéricos de receta y productos sin receta, sobre todo en Finlandia, Escandinavia y Europa del Este', tipo_resultado: 'EBIT', historico: [{ periodo: '2023', ingresos: 517.6, resultado: null }, { periodo: '2024', ingresos: 528.4, resultado: null }, { periodo: '2025', ingresos: 552.8, resultado: null }] },
      { nombre: 'Salud animal', descripcion: 'Medicamentos veterinarios (Dexdomitor, Domosedan, Inovet)', tipo_resultado: 'EBIT', historico: [{ periodo: '2023', ingresos: 103.9, resultado: null }, { periodo: '2024', ingresos: 128.2, resultado: null }, { periodo: '2025', ingresos: 140.9, resultado: null }] },
      { nombre: 'Fermion (principios activos)', descripcion: 'Fabricación de principios activos para terceros', tipo_resultado: 'EBIT', historico: [{ periodo: '2023', ingresos: 73.7, resultado: null }, { periodo: '2024', ingresos: 72.3, resultado: null }, { periodo: '2025', ingresos: 68.7, resultado: null }] },
    ],
    geografias: [
      { nombre: 'Finlandia', peso_pct: 19.3 }, { nombre: 'Escandinavia', peso_pct: 10.0 }, { nombre: 'Resto de Europa', peso_pct: 28.1 },
      { nombre: 'Norteamérica', peso_pct: 25.5 }, { nombre: 'Resto del mundo', peso_pct: 17.1 },
    ],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Ventas de Nubeqa registradas por Orion (M EUR)', valor_anterior: '368,3 (2024)', valor_actual: '609,8 (2025)', variacion: '+66 %', comentario: '1S26: 381,8 (+64,9 %) [3]' },
      { kpi: 'Regalías totales (M EUR)', valor_anterior: '271,0', valor_actual: '436,6', variacion: '+61 %', comentario: 'Regalía media ≈ 25 % de las ventas de Bayer [2]' },
      { kpi: 'Easyhaler (M EUR)', valor_anterior: '166,4', valor_actual: '177,4', variacion: '+6,6 %', comentario: '1S26: 95,3 (+7,2 %) [3]' },
      { kpi: 'Entacapona (Stalevo, Comtess) (M EUR)', valor_anterior: '84,1', valor_actual: '90,5', variacion: '+7,6 %', comentario: '1S26: 44,4 (−4 %), genéricos [3]' },
      { kpi: 'Gasto en I+D (M EUR)', valor_anterior: '179,6', valor_actual: '210,4', variacion: '+17 %', comentario: '11 % de las ventas [2]' },
      { kpi: 'Hitos (M EUR)', valor_anterior: '133,8', valor_actual: '183,4', variacion: '+37 %', comentario: 'Guía 2026: sin hitos relevantes [3]' },
    ],
    clientes: 'Bayer es con diferencia el mayor cliente: paga las regalías de Nubeqa (432,5 M EUR en 2025) y compra las pastillas que fabrica Orion (177,3 M), ≈ 32 % de las ventas de 2025 sin contar el hito de 180 M [2]. El resto se vende a mayoristas, farmacias y hospitales de Europa, muy repartido.',
    confianza: 'Alta',
  },
  huecos: [],
  fuentes: fA,
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Financial Statement documents 2025: estrategia, divisiones, I+D, acuerdos con Bayer y MSD', editor: 'Orion Oyj', tipo: 'Primaria', fecha: '2025-12', url: u('orion-fs-documents-2025') },
  { id: 2, titulo: 'The Pharmaceutical Industry in Figures, Key Data 2026 (mercado europeo y mundial a precio de fábrica)', editor: 'EFPIA (datos de IQVIA MIDAS)', tipo: 'Sectorial', fecha: '2026-06', url: 'https://www.efpia.eu/media/owqczcqz/the-pharmaceutical-industry-in-figures-2026.pdf' },
  { id: 3, titulo: 'Bayer Annual Report 2025: ventas de Nubeqa (2.385 M EUR), tabla de patentes, efecto de la IRA en EE. UU.', editor: 'Bayer AG', tipo: 'Primaria', fecha: '2025-12', url: u('bayer-annual-report-2025') },
  { id: 4, titulo: 'Half-Year Financial Report 1-6/2026', editor: 'Orion Oyj', tipo: 'Primaria', fecha: '2026-07-17', url: u('orion-h1-2026') },
  { id: 5, titulo: 'Investor presentation Q2 2026 (cartera de I+D, calendario de lecturas)', editor: 'Orion Oyj', tipo: 'Primaria', fecha: '2026-07', url: u('orion-investor-q2-2026') },
  { id: 6, titulo: 'Inside information: Orion provides outlook for 2026 and estimates that the annual Nubeqa net sales recorded by Orion has potential to exceed EUR 1 billion', editor: 'Orion Oyj', tipo: 'Primaria', fecha: '2026-01-14', url: u('rel-outlook-2026-nubeqa-1bn') },
  { id: 7, titulo: 'Orion updates time estimate for the potential related to the annual Nubeqa net sales recorded by Orion', editor: 'Orion Oyj', tipo: 'Primaria', fecha: '2026-01-14', url: u('rel-nubeqa-time-estimate') },
  { id: 8, titulo: 'Tenax Therapeutics: el ensayo de fase 3 LEVEL de levosimendán oral no alcanzó su objetivo principal', editor: 'Orion Oyj', tipo: 'Primaria', fecha: '2026-08-10', url: u('rel-tenax-level') },
  { id: 9, titulo: 'Acuerdo con Qilu Pharma Europe para un biosimilar de pembrolizumab en Europa', editor: 'Orion Oyj', tipo: 'Primaria', fecha: '2026-10-06', url: u('rel-qilu-pembro') },
  { id: 10, titulo: 'Primer paciente en la fase 1/2 de ODM-216, el primer biológico de Orion', editor: 'Orion Oyj', tipo: 'Primaria', fecha: '2026-10-05', url: u('rel-odm216') },
  { id: 11, titulo: 'Datos de cotización y estimaciones de los comparables (UCB, Ipsen, Recordati, Almirall, Hikma, Lundbeck, Virbac, Royalty Pharma)', editor: 'Yahoo Finance (quoteSummary)', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/UCB.BR/' },
  { id: 12, titulo: 'Financial Statement Release 1-12/2023: demanda de Bayer y Orion contra la ANDA de Hetero (patentes de 2036 y 2038)', editor: 'Orion Oyj', tipo: 'Primaria', fecha: '2023-12', url: u('orion-fs-release-2023') },
  { id: 13, titulo: 'Interim Report 1-9/2024: fin del desarrollo de ODM-111', editor: 'Orion Oyj', tipo: 'Primaria', fecha: '2024-09', url: u('orion-q3-2024') },
  { id: 14, titulo: 'Financial Statement Release 1-12/2025: acuerdo con MSD (opevesostat), regalía media de Nubeqa, cartera de I+D', editor: 'Orion Oyj', tipo: 'Primaria', fecha: '2026-02-12', url: u('orion-fs-release-2025') },
];
const fx = { EUR: 1, USD: 1.1215, DKK: 7.4746, GBP: 0.84028, GBp: 84.028 };
const comp = (k, nombre, pais, extra = {}) => {
  const x = Y[k]; const t = x.trend; const y0 = t.find((a) => a.periodo === '0y'), y1 = t.find((a) => a.periodo === '+1y');
  const f = fx[x.divisa];
  const cap = x.divisa === 'GBp' ? x.cap / 1e6 / 0.84028 : x.cap / 1e6 / f;
  const ev = x.ev / 1e6 / (x.divisa === 'GBp' ? 0.84028 : f);
  const ebitda = x.ebitda / 1e6 / (x.divisa === 'GBp' ? 1.1215 : f), ventas = x.ventas / 1e6 / (x.divisa === 'GBp' ? 1.1215 : f);
  const bpaNtm = 0.2 * y0.bpa + 0.8 * y1.bpa;
  let per = x.precio / bpaNtm;
  if (x.divisa === 'GBp') per = (x.precio / 100) / (bpaNtm / (1.1215 / 0.84028));
  return { nombre, ticker: k, pais, capitalizacion: Math.round(cap), ev_ventas: extra.sinEv ? null : r2(ev / ventas), ev_ebitda_ltm: extra.sinEv ? null : r1(x.ev_ebitda), ev_ebitda_ntm: null, per_ntm: r1(per), crecimiento_pct: r1(y1.crec_ventas * 100), margen_ebitda_pct: r1(x.ebitda / x.ventas * 100), roic_pct: null, dn_ebitda: extra.sinEv ? null : r2((x.ev - x.cap) / x.ebitda), fcf_yield_pct: null };
};
const COMPS = [
  comp('UCB.BR', 'UCB', 'BE'), comp('IPN.PA', 'Ipsen', 'FR'), comp('REC.MI', 'Recordati', 'IT'), comp('ALM.MC', 'Almirall', 'ES'),
  comp('HIK.L', 'Hikma Pharmaceuticals', 'GB', { sinEv: true }), comp('HLUN-B.CO', 'H. Lundbeck', 'DK'), comp('VIRP.PA', 'Virbac', 'FR'), comp('RPRX', 'Royalty Pharma', 'US'),
];
const B_ = {
  _estado: 'Completa. Tamaño del mercado de EFPIA (IQVIA) [2]; ventas y patentes de Nubeqa del informe de Bayer [3]; cartera y acuerdos de Orion [1, 4, 5, 14]. Sin cifra primaria del mercado mundial de antiandrógenos para el cáncer de próstata (hueco).',
  sector: {
    definicion: 'Mercado relevante: el farmacéutico de receta europeo (marcas propias, genéricos e inhaladores, donde Orion vende con su red) más el mercado mundial de inhibidores del receptor de andrógenos para el cáncer de próstata, del que Orion cobra regalías a través de Bayer. Se excluyen los biológicos de gran tamaño, donde Orion apenas empieza (ODM-216, biosimilares con socios).',
    tamano: '≈ 330.000 M EUR de ventas farmacéuticas a precio de fábrica en Europa en 2025 (estimación de EFPIA) y 1.475.815 M EUR en el mundo, de los que Norteamérica es el 54,7 % [2]. Nubeqa vendió 2.385 M EUR en 2025 (+62,4 %) [3].',
    unidad_serie: 'millones de EUR (mercado farmacéutico europeo a precio de fábrica; EFPIA)',
    serie: [{ anio: '2020', tamano: 216064 }, { anio: '2024', tamano: 301968 }, { anio: '2025', tamano: 330000 }],
    tcac_historico_pct: 8.9, tcac_previsto_pct: 5.0, cr5_pct: null, estructura: 'Fragmentada en Europa (cientos de laboratorios, ninguno con más del 5-6 %); concentrada en cada clase terapéutica',
    drivers: [
      { driver: 'Envejecimiento y cáncer de próstata', efecto: '+', horizonte: 'Estructural', evidencia: 'Nubeqa crece en todas las regiones con nuevas indicaciones (mHSPC, ARANOTE, aprobación de la FDA en junio de 2025) [3].' },
      { driver: 'Regulación de precios (IRA en EE. UU., referencias en Europa)', efecto: '−', horizonte: 'Estructural', evidencia: 'Bayer dice que la IRA ya rebajó los precios de Nubeqa en EE. UU. en 2025 [3].' },
      { driver: 'Vencimiento de patentes', efecto: '−', horizonte: 'Estructural', evidencia: 'Principio activo de Nubeqa: EE. UU. 2033, Europa y Japón 2035, China y Brasil 2030 [3].' },
      { driver: 'Genéricos y precios de referencia en los países nórdicos', efecto: '−', horizonte: 'Cíclico', evidencia: 'Entacapona −4 % en el 1S26 por genéricos y bajadas de precio [4].' },
      { driver: 'Licencias de la cartera de I+D', efecto: '+', horizonte: 'Estructural', evidencia: 'Opevesostat con MSD: hasta 1.630 M USD en hitos y regalías del 10-20 % [14].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Nubeqa compite con enzalutamida (Xtandi) y apalutamida (Erleada) en el mismo paciente; en genéricos, competencia por precio.' },
      { fuerza: 'Amenaza de nuevos entrantes', intensidad: 2, justificacion: 'Patentes y ensayos de fase 3 protegen los productos propios hasta 2033-2035 [3].' },
      { fuerza: 'Poder de los clientes', intensidad: 4, justificacion: 'Pagadores públicos fijan precios (subastas nórdicas, IRA); Bayer controla la comercialización de Nubeqa.' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Fermion fabrica principios activos propios; dependencia baja.' },
      { fuerza: 'Sustitutivos', intensidad: 3, justificacion: 'Nuevos mecanismos en próstata (radioligandos, opevesostat de MSD, que es de la propia Orion) [5].' },
    ],
    ciclo: { posicion: 'Expansión', comentario: 'La demanda de medicamentos no depende del ciclo económico; el riesgo es regulatorio y de patentes, no de demanda.' },
    regulacion: 'En EE. UU., la Ley de Reducción de la Inflación (IRA) permite a Medicare negociar el precio de los fármacos de molécula pequeña a partir de los 7 años de su aprobación y aplicarlo a los 9: Nubeqa se aprobó en julio de 2019, así que podría ser elegida en 2027 con precio negociado desde 2029 (estimación propia sobre las reglas de la ley; ni Orion ni Bayer lo han confirmado). En Europa, los precios se fijan por país y los genéricos entran al vencer las patentes. Hetero presentó en EE. UU. una solicitud de genérico (ANDA) contra patentes de 2036 y 2038 que no pide entrar antes del vencimiento de la patente del compuesto [12].',
    tendencias: 'La oncología crece más que el mercado; los genéricos de molécula pequeña presionan precios; los biosimilares se abren como nueva línea para laboratorios medianos europeos (Orion firmó nivolumab con Shilpa y pembrolizumab con Qilu) [9]. Orion pasa de laboratorio regional a uno con un gran producto global por regalías.',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 0.6,
    posicion: 'Laboratorio mediano europeo: líder en Finlandia (≈ 365 M EUR de ventas en 2025) y con ≈ 0,6 % del mercado europeo; su peso global viene de las regalías de Nubeqa, tercer antiandrógeno de nueva generación tras Xtandi y Erleada [2, 3].',
    competidores: COMPS.slice(0, 5).map((c) => {
      const x = Y[c.ticker];
      const f = x.divisa === 'GBp' ? 1.1215 : fx[x.divisa];
      return { nombre: c.nombre, pais: c.pais, ticker: c.ticker, ingresos: Math.round(x.ventas / 1e6 / f), cuota_pct: null, margen_ebit_pct: null, comentario: { 'UCB.BR': 'Biofarma belga; neurología e inmunología', 'IPN.PA': 'Oncología y enfermedades raras; Somatuline ya con genéricos', 'REC.MI': 'Enfermedades raras y atención primaria en Europa', 'ALM.MC': 'Dermatología', 'HIK.L': 'Genéricos e inyectables (cifras en USD convertidas)' }[c.ticker] + ' [11].' };
    }),
    foso: {
      veredicto: 'Estrecho', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'No aplica.' },
        { fuente: 'Costes de cambio', puntuacion: 2, evidencia: 'Easyhaler: los pacientes y médicos no cambian de inhalador con facilidad [1].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 4, evidencia: 'Patente del compuesto de darolutamida hasta 2033 en EE. UU. y 2035 en Europa y Japón [3]; know-how en inhaladores de polvo seco.' },
        { fuente: 'Ventaja en costes', puntuacion: 2, evidencia: 'Fabricación propia de principios activos (Fermion) [1].' },
        { fuente: 'Escala eficiente', puntuacion: 2, evidencia: 'Red comercial nórdica sin rival local de su tamaño [1].' },
      ],
    },
    amenazas: 'Lo que más erosiona el foso es el tiempo: la patente del compuesto de Nubeqa vence en EE. UU. en 2033 y en Europa en 2035 [3], y la IRA puede recortar el precio en EE. UU. desde 2029. Después, que la cartera propia no sustituya a Nubeqa: ODM-111 se abandonó en 2024 [13] y el levosimendán de Tenax falló en fase 3 [8]; la esperanza es opevesostat (MSD, fase 3 hasta 2028) [5].',
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'Orion es un laboratorio finlandés fundado en 1917 que desarrolla, fabrica y vende medicamentos de receta, genéricos, productos sin receta y veterinarios, y principios activos (Fermion). Su producto más importante es Nubeqa (darolutamida), un fármaco para el cáncer de próstata que descubrió Orion y vende Bayer en todo el mundo: Orion fabrica las pastillas y cobra regalías escalonadas [1, 14].',
    como_gana_dinero: 'Dos negocios distintos: (1) las regalías y pastillas de Nubeqa (610 M EUR en 2025, margen muy alto porque Bayer paga la comercialización) y (2) un laboratorio europeo de genéricos, marcas e inhaladores Easyhaler (≈ 1.100 M EUR, margen bajo una vez cargado todo el I+D) [14]. Además, cobra hitos irregulares por licencias (183 M en 2025).',
  },
  huecos: [
    { seccion: 'sector', campo: 'Tamaño del mercado mundial de antiandrógenos (darolutamida, enzalutamida, apalutamida) con fuente primaria', tipo: 'Complemento', intentos: '1) Informe anual de Bayer 2025 (solo Nubeqa); 2) EFPIA Key Data 2026 (sin desglose por clase); 3) búsqueda de las ventas de Xtandi y Erleada en informes de Astellas y J&J (la nota de J&J dio 403)', decision: 'Omitido' },
  ],
  fuentes: fB,
};
guarda('B', B_);

// ---------------------------------------------------------------- C. Directivos y gobierno
const fC = [
  { id: 1, titulo: 'Financial Statement documents 2025: informe de gobierno corporativo, consejo, equipo directivo, accionistas', editor: 'Orion Oyj', tipo: 'Primaria', fecha: '2025-12', url: u('orion-fs-documents-2025') },
  { id: 2, titulo: 'Remuneration Report 2025', editor: 'Orion Oyj', tipo: 'Primaria', fecha: '2025-12', url: u('orion-remuneration-2025') },
  { id: 3, titulo: 'Decisiones de la junta general y del consejo del 24-mar-2026', editor: 'Orion Oyj', tipo: 'Primaria', fecha: '2026-03-24', url: u('rel-agm-2026') },
  { id: 4, titulo: 'Cambio en el equipo directivo: Berkeley Vincent, vicepresidente ejecutivo de medicamentos innovadores', editor: 'Orion Oyj', tipo: 'Primaria', fecha: '2026-04-01', url: u('rel-exec-vincent') },
  { id: 5, titulo: 'Operaciones de directivos (Managers’ transactions)', editor: 'Orion Oyj', tipo: 'Primaria', fecha: '2026-10-07', url: u('orion-managers-tx') },
  { id: 6, titulo: 'Comunicación de participación significativa de BlackRock, Inc. (5,11 %)', editor: 'Orion Oyj', tipo: 'Primaria', fecha: '2026-06-17', url: u('rel-flag-blackrock19') },
  { id: 7, titulo: 'Composición del comité de nombramientos', editor: 'Orion Oyj', tipo: 'Primaria', fecha: '2026-04-27', url: u('rel-nomination-committee') },
  { id: 8, titulo: 'Perspectivas y guías anuales 2020-2025 (releases de cada ejercicio)', editor: 'Orion Oyj', tipo: 'Primaria', fecha: '2026-02-12', url: u('orion-fs-release-2025') },
  { id: 9, titulo: 'René Lindell, director financiero', editor: 'Orion Oyj', tipo: 'Primaria', fecha: '2026-10', url: u('orion-rene-lindell') },
  { id: 10, titulo: 'Half-Year Financial Report 1-6/2026 (guía de 2026 elevada)', editor: 'Orion Oyj', tipo: 'Primaria', fecha: '2026-07-17', url: u('orion-h1-2026') },
];
const C = {
  _estado: 'Completa. Gobierno, consejo y accionistas del informe 2025 [1]; remuneración [2]; junta de 2026 [3]; operaciones de directivos [5]. La junta finlandesa no publica el porcentaje del voto consultivo de remuneración (hueco).',
  directivos: {
    equipo: [
      { nombre: 'Liisa Hurme', cargo: 'Presidenta y consejera delegada', desde: '2022', participacion_pct: 0.04, trayectoria: 'Doctora en bioquímica; en Orion desde 1999 (programas de terapias hormonales y urológicas, jefa del negocio de urología y oncología, productos propios, operaciones globales); consejera delegada desde el 1-nov-2022; 51.673 acciones B [1].' },
      { nombre: 'René Lindell', cargo: 'Director financiero', desde: '2024', participacion_pct: 0.0, trayectoria: 'Director financiero desde el 1-may-2024; antes director financiero de Rovio Entertainment (2017-2024), Nokia y Boston Consulting Group; 4.608 acciones B [1, 9].' },
      { nombre: 'Outi Vaarala', cargo: 'Vicepresidenta ejecutiva de I+D', desde: '2023', participacion_pct: 0.02, trayectoria: 'Responsable de I+D desde 2020 (vicepresidenta ejecutiva de medicamentos innovadores e I+D en 2023-2026); antes en AstraZeneca y la Agencia Europea del Medicamento; 22.380 acciones B [1].' },
      { nombre: 'Berkeley Vincent', cargo: 'Vicepresidente ejecutivo de medicamentos innovadores', desde: '2026', participacion_pct: null, trayectoria: 'Nombrado el 8-abr-2026 para la división que incluye Nubeqa [4].' },
      { nombre: 'Hao Pan', cargo: 'Vicepresidente ejecutivo de productos de marca', desde: '2023', participacion_pct: 0.01, trayectoria: 'En Orion desde 2002 (Reino Unido y jefe de región de Europa occidental); 14.913 acciones B [1].' },
    ],
    historial_guidance: [
      { anio: '2020', guia: 'Ventas similares a 2019 (1.051 M); resultado de explotación menor que 253 M', real: '1.078 / 280', cumplida: 'Sí' },
      { anio: '2021', guia: 'Ventas algo menores que 1.078; resultado menor o claramente menor que 280', real: '1.041 / 243', cumplida: 'Sí' },
      { anio: '2022', guia: 'Ventas y resultado similares a 2021 (1.041 / 243)', real: '1.113 / 232 sin el pago de ODM-208', cumplida: 'Sí' },
      { anio: '2023', guia: 'Ventas algo mayores que 1.113 y resultado algo mayor o mayor que 232 (sin ODM-208)', real: '1.190 / 275 (245 sin pensiones)', cumplida: 'Sí' },
      { anio: '2024', guia: 'Ventas 1.340-1.410; resultado 270-310', real: '1.542 / 417 (con 134 de hitos)', cumplida: 'Sí' },
      { anio: '2025', guia: 'Ventas 1.550-1.650; resultado 350-450', real: '1.890 / 632 (con 183 de hitos)', cumplida: 'Sí' },
    ],
    comentario: 'Equipo prudente con las guías: en los seis últimos años el dato real ha igualado o superado la guía inicial, aunque en 2024 y 2025 parte de la diferencia fueron hitos no previstos [8]. En 2026 subió dos veces la guía (enero 1.900-2.100 / 550-750; abril 1.950-2.100 / 600-750; julio 2.000-2.100 / 650-750) [10]. Liisa Hurme no viene del sector farmacéutico; su apuesta es invertir las regalías en I+D y biológicos.',
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      { nombre: 'Veli-Matti Mattila', cargo: 'Presidente del consejo', tipo: 'Independiente', desde: '2021', comisiones: 'Personal y remuneración (presidente)' },
      { nombre: 'Hilpi Rautelin', cargo: 'Vicepresidenta del consejo', tipo: 'Independiente', desde: '2017', comisiones: 'I+D (presidenta); comité de nombramientos (presidenta)' },
      { nombre: 'Henrik Stenqvist', cargo: 'Consejero', tipo: 'Independiente', desde: '2024', comisiones: 'Auditoría (presidente); director financiero de Sobi' },
      { nombre: 'Ari Lehtoranta', cargo: 'Consejero', tipo: 'Independiente', desde: '2017', comisiones: 'Auditoría' },
      { nombre: 'Kari Jussi Aho', cargo: 'Consejero', tipo: 'Independiente', desde: '2020', comisiones: 'Familia Aho (Aho Group, 1,9 % de los votos)' },
      { nombre: 'Karen Lykke Sørensen', cargo: 'Consejera', tipo: 'Independiente', desde: '2022', comisiones: 'Auditoría' },
      { nombre: 'Minna Maasilta', cargo: 'Consejera', tipo: 'Independiente', desde: '2026', comisiones: 'Auditoría' },
      { nombre: 'Sophie Papa', cargo: 'Consejera', tipo: 'Independiente', desde: '2026', comisiones: '—' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: false,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 1,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 3.05, fijo: 0.67, variable_corto: 0.47, variable_largo: 1.76, ratio_salario_medio: null },
    remuneracion: 'La consejera delegada cobró 3,05 M EUR en 2025: 0,67 M de fijo, 0,47 M de variable anual, 1,76 M de planes en acciones y 0,15 M de pensión [2]. Los objetivos del variable excluyen Nubeqa (ventas sin hitos ni ingresos de Nubeqa), para premiar el negocio que depende de la dirección; hay cláusula de recuperación y se exige mantener acciones por el 200 % del sueldo [2]. El consejo cobra 120.000 EUR el presidente, 73.000 el vicepresidente y 60.000 los demás, el 40 % en acciones B [3].',
    accionistas: [
      { nombre: 'BlackRock, Inc.', pct: 5.11, tipo: 'Institucional', variacion: 'Comunicación del 17-jun-2026 [6]' },
      { nombre: 'Ilmarinen (mutua de pensiones)', pct: 3.67, tipo: 'Institucional', variacion: '5,4 % de los votos (31-dic-2025) [1]' },
      { nombre: 'Varma (mutua de pensiones)', pct: 3.06, tipo: 'Institucional', variacion: 'Solo acciones B [1]' },
      { nombre: 'Erkki Etola y sociedades', pct: 2.0, tipo: 'Familia', variacion: '6,8 % de los votos, el primero por votos [1]' },
      { nombre: 'Land and Water Technology Foundation y sociedades', pct: 1.48, tipo: 'Fundación', variacion: '5,6 % de los votos [1]' },
      { nombre: 'Elo (mutua de pensiones)', pct: 1.62, tipo: 'Institucional', variacion: '1,1 % de los votos [1]' },
    ],
    insiders: [
      { fecha: '2026-05-04', persona: 'Veli-Matti Mattila (presidente)', operacion: 'Compra', acciones: null, importe: null },
      { fecha: '2026-05-04', persona: 'Hilpi Rautelin (vicepresidenta)', operacion: 'Compra', acciones: null, importe: null },
      { fecha: '2026-05-04', persona: 'Henrik Stenqvist (consejero)', operacion: 'Compra', acciones: null, importe: null },
      { fecha: '2026-05-04', persona: 'Karen Lykke Sørensen (consejera)', operacion: 'Compra', acciones: null, importe: null },
    ],
    control_y_defensas: 'Sin accionista de control: el primero por votos (Erkki Etola) tiene el 6,8 % [1]. Dos clases: las A (31,4 M, 22 % del capital) tienen 20 votos y las B (109,7 M) uno, con los mismos derechos económicos; ningún accionista puede votar más de 1/20 de los votos presentes en la junta [1]. Las familias fundadoras y las mutuas finlandesas controlan los votos (los particulares tienen ≈ 61 % de los votos con ≈ 37 % de las acciones), lo que hace casi imposible una opa hostil. Las A se convierten en B a petición (125.000 el 7-oct-2026) [5].',
    alertas: ['Doble clase de acciones con 20 votos por acción A: protege de compras hostiles y reduce el poder de los institucionales.'],
    confianza: 'Alta',
  },
  huecos: [
    { seccion: 'gobierno', campo: 'Porcentaje de votos a favor del informe de remuneración en la junta de 2026', tipo: 'Complemento', intentos: '1) Comunicado de decisiones de la junta del 24-mar-2026 (solo dice «aprobado»); 2) acta de la junta en la web (no publicada en HTML); 3) informe de remuneración 2025 (anterior a la junta)', decision: 'Omitido' },
    { seccion: 'gobierno', campo: 'Número de acciones e importe de las compras de los consejeros del 4-may-2026 (pago del 40 % de la remuneración en acciones)', tipo: 'Complemento', intentos: '1) Lista de operaciones de directivos (solo títulos); 2) comunicados individuales (no descargables como texto); 3) informe semestral', decision: 'Omitido' },
  ],
  fuentes: fC,
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado, consenso, comparables
const fD = [
  { id: 1, titulo: 'Históricos diarios de ORNBV.HE, EXSA.DE (STOXX Europe 600) y EXV4.DE (salud europea): precio, rentabilidad total, beta', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/ORNBV.HE/history' },
  { id: 2, titulo: 'Estimaciones de consenso (BPA y ventas 2026-2027, 3T26), recomendaciones y precio objetivo de ORNBV.HE', editor: 'Yahoo Finance (quoteSummary)', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/ORNBV.HE/analysis' },
  { id: 3, titulo: 'Orion: valoración y estimaciones de consenso (PER, EV/EBITDA, rentabilidad por dividendo 2026e-2028e)', editor: 'Inderes', tipo: 'Analistas', fecha: '2026-07-20', url: 'https://www.inderes.fi/companies/orion' },
  { id: 4, titulo: 'Rendimiento del bono federal alemán a 10 años (serie diaria)', editor: 'Deutsche Bundesbank', tipo: 'Datos de mercado', fecha: '2026-10-20', url: u('bundesbank-bund10') },
  { id: 5, titulo: 'Implied ERP by month (ERPbymonth.xlsx)', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 6, titulo: 'Tipos de cambio de referencia del euro', editor: 'Banco Central Europeo', tipo: 'Datos de mercado', fecha: '2026-10-20', url: u('bce-fx') },
  { id: 7, titulo: 'Orion publica el informe de enero-septiembre de 2026 el 28-oct-2026', editor: 'Orion Oyj', tipo: 'Primaria', fecha: '2026-10-14', url: u('rel-q3-2026-date') },
  { id: 8, titulo: 'Half-Year Financial Report 1-6/2026 y guía de 2026', editor: 'Orion Oyj', tipo: 'Primaria', fecha: '2026-07-17', url: u('orion-h1-2026') },
  { id: 9, titulo: 'Inside information: guía 2026 y potencial de Nubeqa de más de 1.000 M EUR', editor: 'Orion Oyj', tipo: 'Primaria', fecha: '2026-01-14', url: u('rel-outlook-2026-nubeqa-1bn') },
  { id: 10, titulo: 'Interim Report 1-9/2025', editor: 'Orion Oyj', tipo: 'Primaria', fecha: '2025-10', url: u('orion-q3-2025') },
  { id: 11, titulo: 'Interim Report 1-3/2026', editor: 'Orion Oyj', tipo: 'Primaria', fecha: '2026-04-23', url: u('orion-q1-2026') },
  { id: 12, titulo: 'Tenax Therapeutics: LEVEL no alcanzó su objetivo principal', editor: 'Orion Oyj', tipo: 'Primaria', fecha: '2026-08-10', url: u('rel-tenax-level') },
  { id: 13, titulo: 'Datos de los comparables (UCB, Ipsen, Recordati, Almirall, Hikma, Lundbeck, Virbac, Royalty Pharma, Bayer)', editor: 'Yahoo Finance (quoteSummary)', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/UCB.BR/' },
  { id: 14, titulo: 'Zentiva: venta a GTCR (≈ 4.100 M EUR; 10,25 veces el EBITDA) y Stada: venta a CapVest (≈ 10.000 M EUR; 11,29 veces)', editor: 'Inter Capital (análisis de transacciones del sector)', tipo: 'Analistas', fecha: '2025', url: 'https://www.intercapital.hr/' },
  { id: 15, titulo: 'Recompra terminada (500.000 acciones B, media ≈ 80,98 EUR)', editor: 'Orion Oyj', tipo: 'Primaria', fecha: '2026-09-30', url: u('rel-buyback-done') },
  { id: 16, titulo: 'Acuerdo con Qilu para el biosimilar de pembrolizumab', editor: 'Orion Oyj', tipo: 'Primaria', fecha: '2026-10-06', url: u('rel-qilu-pembro') },
  { id: 17, titulo: 'Primer paciente con ODM-216', editor: 'Orion Oyj', tipo: 'Primaria', fecha: '2026-10-05', url: u('rel-odm216') },
  { id: 18, titulo: 'Financial Statement Release 1-12/2025', editor: 'Orion Oyj', tipo: 'Primaria', fecha: '2026-02-12', url: u('orion-fs-release-2025') },
];
const yo = Y['ORNBV.HE'];
const cierres = Object.fromEntries(B.cierres_ejercicio.map((c) => [c.anio, c.precio_cierre]));
const D = {
  _estado: 'Completa. Precio de cierre del 20-oct-2026 (88,30 EUR; Helsinki cerró a las 15:30 UTC) [1]; consenso de Yahoo [2] contrastado con Inderes [3]; comparables de Yahoo convertidos con los tipos del BCE [6, 13]. Transacciones: solo dos con múltiplo (hueco).',
  _per_mediana_comparables: null,
  identificacion: {
    nombre: 'Orion Oyj', nombre_corto: 'Orion', ticker: 'ORNBV', isin: 'FI0009014377', mercado: 'Nasdaq Helsinki (acción B)', indice_referencia: 'OMX Helsinki 25 / STOXX Europe 600',
    pais: 'Finlandia', pais_iso: 'FI', sector: 'Salud', industria: 'Farmacéuticas', sede: 'Espoo (Finlandia)', fundacion: '1917', empleados: 4029, web: 'https://www.orionpharma.com',
    precio: 88.30, fecha_precio: '2026-10-20', acciones: 140.37, capitalizacion_publicada: Math.round(yo.cap / 1e6), free_float_pct: null,
    max_52s: B.identificacion.max_52s, min_52s: B.identificacion.min_52s, volumen_medio_diario: `≈ ${String(B.volumen_3m.importe_dia_millones).replace('.', ',')} M EUR/día (3 meses, solo la B)`, proximos_resultados: '2026-10-28',
  },
  consenso: {
    guidance: 'Guía de 2026 (elevada el 17-jul-2026): ventas de 2.000-2.100 M EUR y resultado de explotación de 650-750 M, sin hitos relevantes; supone que las regalías y ventas de pastillas de Nubeqa crecen con fuerza [8]. La de enero era 1.900-2.100 / 550-750 [9].',
    estimaciones: [
      { periodo: '2026e', ingresos: Math.round(yo.trend.find((t) => t.periodo === '0y').ventas / 1e6), ebitda: null, ebit: null, bpa: r2(yo.trend.find((t) => t.periodo === '0y').bpa), dpa: null, fuente: 'Yahoo Finance, 6 analistas [2]' },
      { periodo: '2027e', ingresos: Math.round(yo.trend.find((t) => t.periodo === '+1y').ventas / 1e6), ebitda: null, ebit: null, bpa: r2(yo.trend.find((t) => t.periodo === '+1y').bpa), dpa: null, fuente: 'Yahoo Finance, 6 analistas [2]' },
      { periodo: '2028e', ingresos: null, ebitda: null, ebit: null, bpa: 5.07, dpa: null, fuente: 'Inderes: PER 2028e de 17,4 veces al precio de 88,30 → BPA implícito ≈ 5,07 [3]' },
    ],
    recomendaciones: { n_analistas: 6, comprar: 3, mantener: 2, vender: 1, po_medio: r2(yo.po_medio), po_min: yo.po_min, po_max: yo.po_max },
    revisiones: 'Al alza: el BPA de 2026 del consenso pasó de 3,91 EUR hace 90 días a 4,06 y el de 2027 de 4,61 a 4,75 [2]. El precio objetivo medio (77,33 EUR) queda un 12 % bajo el precio: los analistas no han seguido a la acción. Para el 3T26 (28-oct) el consenso espera ventas de 537 M y BPA de 1,10 EUR [2, 7].',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    ...B.bolsa,
    beta: 0.71,
    posicion_corta_pct: null,
    comentario: 'La acción ha subido un 42 % en 2026 con dividendos (índice europeo +10,6 %, salud europea +3,6 %) y está en máximos históricos [1]. Bate al índice a 1, 3, 5 y 10 años. Volatilidad alta para una farmacéutica (33 %) por los saltos de los días de resultados: −10,6 % el 28-oct-2025 y −9,9 % el 12-feb-2026 [1]. Beta ajustada semanal de 5 años de 0,71 (la mensual de 0,24 es poco fiable).',
    contexto: {
      movimiento: { fecha: M.fecha, var_1m_pct: M.var_1m_pct, var_3m_pct: M.var_3m_pct, var_6m_pct: M.var_6m_pct, var_12m_pct: M.var_12m_pct, dist_max_52s_pct: M.dist_max_52s_pct, dist_min_52s_pct: M.dist_min_52s_pct, dist_max_historico_pct: M.dist_max_historico_pct, tendencia: M.tendencia, volatilidad_60d_pct: M.volatilidad_60d_pct, avisos: M.avisos },
      movimientos_fuertes: [
        { periodo: 'oct-nov 2025', var_pct: -19.0, causa: 'Resultados del 3T25 (octubre de 2025): ventas −10,2 % por menos hitos y regalías de Nubeqa por debajo de lo esperado; la acción cayó un 10,6 % ese día y hasta el mínimo de 56,50 EUR el 7-nov [10, 1].', veredicto: 'no cambia', condicion: null },
        { periodo: 'ene 2026', var_pct: 18.9, causa: 'Guía de 2026 y estimación de que Nubeqa puede superar 1.000 M EUR al año para Orion hacia el final de la década (14-ene-2026) [9].', veredicto: 'no cambia', condicion: null },
        { periodo: 'feb 2026', var_pct: -9.9, causa: 'Resultados de 2025 (presentación del 12-feb-2026): caída del 9,9 % en el día; el 4T25 llevaba el hito de 180 M y la guía no cambió (causa exacta no confirmada) [18, 1].', veredicto: 'no cambia', condicion: null },
        { periodo: 'abr 2026', var_pct: -5.2, causa: 'Resultados del 1T26 (23-abr): crecimiento del 17,8 % y guía elevada en la parte baja, pero el mercado esperaba más [11].', veredicto: 'no cambia', condicion: null },
        { periodo: 'jul-ago 2026', var_pct: 16.6, causa: 'Semestral (17-jul): Nubeqa +69 % en el 2T26 con el tramo alto de regalías y guía elevada a 2.000-2.100 / 650-750 [8].', veredicto: 'no cambia', condicion: null },
      ],
      noticias: [
        { fecha: '2026-08-10', tipo: 'resultados', hecho: 'El levosimendán oral de Tenax (licencia de Orion) falla en la fase 3 LEVEL; sin efecto en la guía [12].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-09-30', tipo: 'directivos', hecho: 'Recompra de 500.000 acciones B terminada para los planes de incentivos [15].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-05', tipo: 'resultados', hecho: 'Primer paciente con ODM-216, el primer biológico propio en ensayos [17].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-06', tipo: 'fusión u oferta', hecho: 'Licencia del biosimilar de pembrolizumab de Qilu para Europa [16].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-14', tipo: 'resultados', hecho: 'Fecha del 3T26: 28-oct-2026; no sale el 21 ni el 22 [7].', veredicto: 'no cambia', condicion: null },
      ],
      proximos_resultados: '2026-10-28',
      veredicto: 'no cambia',
      condicion: null,
      comentario: null,
    },
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: ['2019', '2020', '2021', '2022', '2023', '2024', '2025'].map((a) => ({ anio: a, precio_cierre: cierres[a], ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    comentario: null,
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Laboratorios europeos medianos con marcas propias y genéricos (UCB, Ipsen, Recordati, Almirall, Lundbeck, Hikma), un veterinario (Virbac, por salud animal) y Royalty Pharma, que cobra regalías como Orion con Nubeqa. Se excluye Bayer (socio de Nubeqa, conglomerado con agricultura y litigios del glifosato: 9,1 veces) y Gedeon Richter (Yahoo sin datos). PER de los próximos 12 meses = 0,2 × BPA 2026e + 0,8 × 2027e del consenso de Yahoo [13].',
    empresas: COMPS,
    comentario: null,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2025', objetivo: 'Zentiva (genéricos, República Checa)', comprador: 'GTCR', ev: 4100, ev_ventas: null, ev_ebitda: 10.25, prima_pct: null, excluir: false, comentario: 'Genéricos europeos; venta de Advent [14].' },
      { fecha: '2025', objetivo: 'Stada (genéricos y salud de consumo, Alemania)', comprador: 'CapVest', ev: 10000, ev_ventas: null, ev_ebitda: 11.29, prima_pct: null, excluir: false, comentario: 'Genéricos y consumo, como la división de Orion [14].' },
      { fecha: '2022-06', objetivo: 'Inovet (veterinaria, Bélgica)', comprador: 'Orion', ev: 82, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Sin múltiplo publicado [18].' },
    ],
    comentario: 'Las compras recientes de genéricos europeos se hicieron a 10-11 veces el EBITDA, por debajo de los 15,6 veces de Orion hoy, pero no incluyen un activo como Nubeqa. Pocas operaciones con múltiplo: peso cero en la valoración.',
    confianza: 'Baja',
  },
  huecos: [
    { seccion: 'transacciones', campo: 'Tercera transacción comparable con múltiplo (regalías farmacéuticas o laboratorio nórdico)', tipo: 'Complemento', intentos: '1) Comunicados de Royalty Pharma (sin múltiplos de EBITDA); 2) búsqueda de compras de laboratorios nórdicos 2023-2026; 3) MarketScreener (identificador equivocado)', decision: 'Omitido' },
  ],
  fuentes: fD,
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const E = {
  _estado: 'Completa. Foro de Inderes (≈ 12 mensajes del 10-ago al 6-oct-2026) [1]; Stocktwits sin el símbolo [2]; Seeking Alpha solo titulares de pago [3].',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Estable',
    revisadas: [
      { plataforma: 'Foro de Inderes (Orion)', fecha: '2026-10', n_comentarios: 12, tono: 'Dividido', resumen: 'Entusiasmo por los biológicos y Nubeqa frente a prudencia por la valoración y el fallo de LEVEL; debate sobre si la recompra para incentivos tiene sentido en máximos.' },
      { plataforma: 'Stocktwits (ORINY)', fecha: '2026-10', n_comentarios: 0, tono: 'Neutro', resumen: 'El símbolo no existe en la plataforma: sin conversación.' },
      { plataforma: 'Seeking Alpha (transcripciones)', fecha: '2026-07', n_comentarios: 0, tono: 'Neutro', resumen: 'Solo titulares de transcripciones de pago; sin artículos de opinión recientes.' },
    ],
    temas: [
      { tema: 'Nubeqa sigue sorprendiendo', postura: 'Alcista', peso: 'Alto', contraste: 'Correcto: +69 % en el 2T26 con el tramo alto de regalías [A3].' },
      { tema: 'Cara frente a su historia', postura: 'Bajista', peso: 'Medio', contraste: 'En parte: el PER sin hitos ha bajado de 30 a 16-21 veces mientras el beneficio se triplicaba.' },
      { tema: 'Genéricos de enzalutamida y la IRA', postura: 'Bajista', peso: 'Medio', contraste: 'Riesgo real para la clase, sin efecto visible aún en Nubeqa (Bayer +62 % en 2025).' },
      { tema: 'Biológicos (ODM-216, biosimilares)', postura: 'Alcista', peso: 'Bajo', contraste: 'Opciones a largo plazo; no aportan beneficio antes de 2030.' },
    ],
    lectura: 'Los particulares finlandeses, que dominan la conversación, están divididos: reconocen que Nubeqa sigue batiendo previsiones pero creen que la acción ya lo descuenta tras doblar desde noviembre de 2025. No hay euforia ni capitulación; el foro es pequeño y no mueve el precio.',
    confianza: 'Baja',
  },
  huecos: [],
  fuentes: [
    { id: 1, titulo: 'Foro de Inderes: hilo de Orion (ago-oct 2026)', editor: 'Inderes', tipo: 'Foros y redes', fecha: '2026-10-06', url: 'https://www.inderes.fi/forum/t/orion/' },
    { id: 2, titulo: 'Stocktwits, símbolo ORINY (no encontrado)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-20', url: 'https://api.stocktwits.com/api/2/streams/symbol/ORINY.json' },
    { id: 3, titulo: 'Seeking Alpha, RSS de Orion (ORINY)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-20', url: 'https://seekingalpha.com/api/sa/combined/ORINY.xml' },
  ],
};
// La cita [A3] del tema no es válida dentro de E (citas locales): se escribe sin cita.
E.sentimiento.temas[0].contraste = 'Correcto: +69 % en el 2T26 con el tramo alto de regalías (informe semestral).';
guarda('E', E);
console.log('Notas A-E escritas.', COMPS.map((c) => `${c.nombre} PER ${c.per_ntm} cap ${c.capitalizacion}`).join(' | '));
