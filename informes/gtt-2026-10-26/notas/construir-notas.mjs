// Escribe las notas A-E de GTT (Gaztransport & Technigaz), corte 2026-10-26 (iteración tras la actividad del 3T26 del 23-oct),
// con los documentos de notas/docs (XBRL ESEF 2020-2025, URD 2025, notas y presentaciones de resultados 2021-2026, comunicado y
// presentación de 9M26, BDIF de la AMF, Yahoo, Stock Analysis, MarketScreener). Parte de la nota de gtt-2026-10-16, con cada dato
// vuelto a comprobar. Cada nota cita solo con [n] de su propia lista. Ejecutar: node informes/gtt-2026-10-26/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const G = 'https://www.gtt.fr/sites/default/files/';
const URD = G + 'GTT%20-%202025%20Universal%20Registration%20Document%202_0.pdf';
const H126 = G + 'GTT%20-%20First%20Half%202026%20results%20-%20Press%20Release_0.pdf';
const FY25 = G + 'GTT%20-%20FY%202025%20results%20-%20Press%20Release.pdf';
const Q326 = G + 'GTT%20-%20Q3%202026%20Activity%20Update%20-%20Press%20Release.pdf';
const Q326P = G + 'GTT%20-%20Q3%202026%20Activity%20Update%20-%20Presentation.pdf';
const RONGE = 'https://www.gtt.fr/news/gtt-announces-appointment-ms-catherine-ronge-chairwoman-its-board-directors';
// Precio del informe: lo fija bolsa.json (cierre de la fecha de corte o el último disponible)
const BOLSA = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const PRECIO = BOLSA.identificacion.precio;
const FPRECIO = BOLSA.identificacion.fecha_precio;

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Universal Registration Document 2025 (cuentas consolidadas NIIF y notas)', editor: 'GTT', tipo: 'Primaria', fecha: '2026-04-27', url: URD },
  { id: 2, titulo: 'FY 2025 results – Press release (cuenta, balance y flujos 2024-2025, guía 2026)', editor: 'GTT', tipo: 'Primaria', fecha: '2026-02-19', url: FY25 },
  { id: 3, titulo: 'First half 2026 results – Press release (estados financieros a 30-jun-2026, cartera, guía)', editor: 'GTT', tipo: 'Primaria', fecha: '2026-07-28', url: H126 },
  { id: 4, titulo: 'FY 2024 Results – Presentation (cuentas 2023-2024, BPA 2018-2024, guía 2025)', editor: 'GTT', tipo: 'Primaria', fecha: '2025-02-21', url: G + 'GTT%20-%20FY%202024%20Results%20-%20Presentation.pdf' },
  { id: 5, titulo: 'FY 2023 Investor Presentation (cuentas 2022-2023, guía 2024)', editor: 'GTT', tipo: 'Primaria', fecha: '2024-02-27', url: G + 'IR%20-%20Investor%20Presentation%20-%20FY2023_26022024-3_4.pdf' },
  { id: 6, titulo: 'FY 2022 Investor Presentation (cuentas 2021-2022, desglose de ingresos, guía 2023)', editor: 'GTT', tipo: 'Primaria', fecha: '2023-02-17', url: G + 'IR%20-%20Investor%20Presentation%20-%20FY%202022_1.pdf' },
  { id: 7, titulo: 'FY 2021 Investor Presentation (cuentas 2020-2021, guía 2022)', editor: 'GTT', tipo: 'Primaria', fecha: '2022-02-18', url: G + '20220218%20-%20FY%202021%20-%20Investor%20Presentation.pdf' },
  { id: 8, titulo: 'First half 2025 results – Press release (1S25 y 1S24)', editor: 'GTT', tipo: 'Primaria', fecha: '2025-07-29', url: G + 'GTT%20-%20First%20Half%202025%20results%20-%20press%20release.pdf' },
  { id: 9, titulo: 'Estados financieros XBRL (ESEF) 2020-2025 de GTT (LEI 969500BVOHVZUUFWDT54)', editor: 'XBRL International / AMF', tipo: 'Primaria', fecha: '2026-04', url: 'https://filings.xbrl.org/969500BVOHVZUUFWDT54/2025-12-31/ESEF/FR/0/969500BVOHVZUUFWDT54-2025-12-31-1-FR/reports/969500BVOHVZUUFWDT54-2025-12-31-1-FR.xhtml' },
  { id: 10, titulo: 'Revenue of 600 million euros for the first nine months of 2025; annual objectives revised upwards', editor: 'GTT', tipo: 'Primaria', fecha: '2025-10-23', url: 'https://www.gtt.fr/news/revenue-600-million-euros-first-nine-months-2025-strong-growth-29-annual-objectives-revised' },
  { id: 11, titulo: 'Strong commercial momentum in the first quarter of 2026: revenues of 193 million euros', editor: 'GTT', tipo: 'Primaria', fecha: '2026-04-22', url: 'https://www.gtt.fr/news/strong-commercial-momentum-first-quarter-2026-revenues-193-million-euros-line-expectations' },
  { id: 12, titulo: 'H1 2026 Results – Presentation (pedidos, FID de licuefacción, previsiones de pedidos a 10 años)', editor: 'GTT', tipo: 'Primaria', fecha: '2026-07-29', url: G + 'GTT%20-%20H1%202026%20Results%20-%20Presentation.pdf' },
  { id: 13, titulo: 'Revenues for the first nine months of 2026; Excellent commercial performance; Objectives confirmed for 2026 (comunicado)', editor: 'GTT', tipo: 'Primaria', fecha: '2026-10-23', url: Q326 },
  { id: 14, titulo: 'Q3 2026 Activity Update – Presentation (ingresos de 9M por línea, cartera, FID, situación en Oriente Medio)', editor: 'GTT', tipo: 'Primaria', fecha: '2026-10-23', url: Q326P },
  { id: 15, titulo: 'Earnings call transcript: GTT Q3 2026 (resumen de la conferencia con analistas)', editor: 'Investing.com', tipo: 'Prensa', fecha: '2026-10-23', url: 'https://www.investing.com/news/transcripts/earnings-call-transcript-gtt-q3-2026-order-surge-lifts-shares-33-93CH-4970160' },
];

// cuenta por naturaleza: coste_ventas = compras de mercaderías; EBIT publicado incluye el resultado no corriente
// (2023 +8,9; 2024 +21,0 reversión del deterioro de una indemnización por uso no autorizado de patentes; 2025 −48,7 Elogen)
const c = (periodo, ingresos, cv, ebit, am, nr, rf, imp, nb, bpa, dpa, acc, gf) => ({
  periodo, ingresos, coste_ventas: cv, gastos_generales: null, ebitda: Math.round((ebit + am) * 10) / 10, amortizaciones: am, ebit,
  resultado_financiero: rf, bai: Math.round((ebit + rf) * 10) / 10, impuestos: imp, minoritarios: 0, beneficio_neto: nb,
  gastos_financieros: gf, participadas_en_ebitda: null, no_recurrentes_en_ebitda: nr, bpa, dpa, dpa_extraordinario: 0, acciones_diluidas: acc,
});
const cuenta = [
  c('2020', 396.4, 8.7, 236.3, 6.4, null, -0.2, 37.2, 198.9, 5.34, 4.29, 37.2, 0.2),
  c('2021', 314.7, 12.7, 164.6, 7.6, null, 0.2, 30.7, 134.1, 3.62, 3.10, 37.1, 0.1),
  c('2022', 307.3, 13.5, 152.2, 8.9, null, 0.5, 24.4, 128.3, 3.46, 3.10, 37.0, 0.1),
  c('2023', 427.7, 17.8, 232.4, 11.0, -8.9, 3.8, 34.9, 201.4, 5.43, 4.36, 37.1, 0.2),
  c('2024', 641.4, 28.1, 395.3, 13.8, -21.0, 11.5, 59.0, 347.8, 9.37, 7.50, 37.14, 0.5),
  c('2025', 803.0, 20.2, 472.6, 20.5, 48.7, 7.8, 66.9, 413.6, 11.12, 8.94, 37.18, 0.8),
];

const b = (periodo, at, ac, pc, pt, fc, int, im, ex, cl, pr, acx, pcx, caja, deuda, arr, pn, min) => ({
  periodo, activo_total: at, activo_corriente: ac, pasivo_corriente: pc, pasivo_total: pt, fondo_comercio: fc, intangibles: int,
  inmovilizado_material: im, existencias: ex, clientes: cl, proveedores: pr, activos_contrato: acx, pasivos_contrato: pcx, caja,
  deuda_financiera: deuda, arrendamientos: arr, patrimonio_neto: pn, minoritarios: min, reservas: pn != null ? Math.round((pn - 7.3) * 10) / 10 : null,
});
const balance = {
  historico: [
    b('2020', 364.6, 306.8, 99.8, 120.5, 15.4, 4.9, 29.2, null, 103.6, 18.2, null, null, 141.7, 0, 6.1, 244.1, 0),
    b('2021', 413.1, 348.4, 145.6, 165.4, 15.4, 10.4, 30.8, null, 70.8, 21.6, null, null, 203.8, 0, 4.5, 247.7, 0),
    b('2022', 484.4, 404.0, 207.9, 224.7, 15.4, 18.5, 34.1, null, 117.6, 23.8, null, null, 213.0, 0, 4.0, 259.7, 0),
    b('2023', 616.4, 518.5, 268.1, 280.1, 15.4, 23.1, null, null, 158.1, 32.4, null, null, 267.5, 0, 8.3, 336.3, 0),
    b('2024', 814.8, 678.2, 332.1, 353.3, 19.0, 37.3, 56.5, 29.8, 136.5, 44.6, 49.5, 219.2, 343.3, 5.4, 10.5, 461.4, 0.1),
    b('2025', 1045.8, 675.2, 337.6, 456.0, 104.8, 168.4, 62.7, 25.1, 130.7, 31.1, 59.1, 180.1, 346.7, 112.3, 16.3, 588.2, 1.5),
  ],
  vencimientos: [
    { anio: '2026', importe: 40.3 }, { anio: '2027', importe: 40.0 }, { anio: '2028', importe: 30.0 }, { anio: '2029+', importe: 18.3 },
  ],
  liquidez: 'Caja de 381,6 M EUR a 30-jun-2026 frente a 104,7 M de pasivos financieros (90 M del préstamo de Danelec y el resto arrendamientos y anticipos reembolsables): caja neta de 294,7 M según la empresa [3]',
  rating: 'Sin rating',
  coste_deuda_pct: 2.4,
  vida_media_anios: 1.5,
  otros_pasivos: 'Sin covenants relevantes publicados. Pensiones casi nulas: compromisos de 4,6 M EUR con 1,6 M de activos (3,0 M netos) [1]. Los pasivos por contrato (facturación de cánones por delante del avance de la obra) eran 180,1 M a cierre de 2025 frente a 219,2 M en 2024 y bajan cuando se acercan las entregas; los activos por contrato, 59,1 M [1]. Garantía matriz a Bpifrance por la financiación IPCEI de Elogen [1]. Ningún litigio significativo a 31-dic-2025 [1]. La decisión de la KFTC coreana (2020, firme en abril de 2023) permite a los astilleros coreanos pedir separar la licencia de la asistencia técnica; la empresa dice que no ha recibido ninguna petición [1].',
  comentario: 'GTT trabaja con circulante negativo o casi nulo: factura los cánones por hitos de construcción (corte del acero, quilla, botadura, entrega), y cuando entran muchos pedidos la facturación va por delante del ingreso reconocido (pasivos por contrato de 219,2 M en 2024) [1]. Al acercarse las entregas de los pedidos récord de 2022-2023 esos pasivos bajan (180,1 M en 2025) y la cuenta de clientes con activos por contrato sube: es el mismo ciclo, no un deterioro del cobro [1]. La deuda apareció en 2025 por primera vez desde la salida a bolsa: un préstamo de 120 M para comprar Danelec, del que quedan 90 M a 30-jun-2026 [2, 3]. Los años 2020-2023 se presentan sin el desglose de activos y pasivos por contrato, que el XBRL no publica por separado [9].',
  confianza: 'Alta',
};

const flujos = {
  historico: [
    { periodo: '2020', flujo_operativo: 153.6, capex: 13.7, pagos_arrendamientos: 2.2, adquisiciones: 8.0, desinversiones: 0, dividendos: 157.6, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0.2 },
    { periodo: '2021', flujo_operativo: 212.9, capex: 16.0, pagos_arrendamientos: 2.4, adquisiciones: 0, desinversiones: 0, dividendos: 115.7, recompras: 0.1, emision_acciones: 0, intereses_en_financiacion: 0.1 },
    { periodo: '2022', flujo_operativo: 138.9, capex: 20.5, pagos_arrendamientos: 0.8, adquisiciones: 2.3, desinversiones: 0, dividendos: 121.8, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
    { periodo: '2023', flujo_operativo: 216.2, capex: 43.1, pagos_arrendamientos: 1.3, adquisiciones: 4.1, desinversiones: 0, dividendos: 125.6, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0.2 },
    { periodo: '2024', flujo_operativo: 361.5, capex: 44.4, pagos_arrendamientos: 2.3, adquisiciones: 11.6, desinversiones: 0, dividendos: 228.9, recompras: 2.5, emision_acciones: 3.9, intereses_en_financiacion: 0.5 },
    { periodo: '2025', flujo_operativo: 423.2, capex: 40.3, pagos_arrendamientos: 4.5, adquisiciones: 194.1, desinversiones: 0, dividendos: 290.2, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0.8 },
  ],
  comentario: 'La conversión de beneficio en caja es alta y depende del calendario de facturación: el flujo operativo superó al beneficio neto en 2021 (212,9 frente a 134,1 M) por el cobro anticipado de los pedidos de 2021 y quedó por debajo en 2022 (138,9 frente a 128,3 M, con el circulante absorbiendo caja) [7, 6]. En 2025, 423,2 M de flujo operativo con 413,6 M de beneficio [2]. El capex es pequeño (40,3 M en 2025, 5 % de las ventas) y en 2023-2024 subió por la reforma de la sede y la gigafactoría de Elogen, ya parada; en 2024 se presenta neto de 17,3 M de subvenciones [4, 2]. Estimación propia: el capex de mantenimiento ronda las amortizaciones (unos 20-30 M). Los intereses cobrados por la caja (11,3 M en 2025) se clasifican en financiación y no entran en el FCF del informe [2].',
  confianza: 'Alta',
};

const A = {
  _estado: 'completo',
  negocio: {
    segmentos: [
      { nombre: 'Sistemas de contención (cánones de nuevas construcciones)', descripcion: 'Licencias y asistencia técnica para metaneros, etaneros, FSRU, FLNG, tanques en tierra y buques propulsados por GNL', tipo_resultado: null,
        historico: [{ periodo: '2021', ingresos: 292.4, resultado: null }, { periodo: '2022', ingresos: 279.5, resultado: null }, { periodo: '2023', ingresos: 389.5, resultado: null }, { periodo: '2024', ingresos: 591.1, resultado: null }, { periodo: '2025', ingresos: 739.3, resultado: null }] },
      { nombre: 'Servicios y soluciones marinas y digitales', descripcion: 'Servicios a la flota en operación (certificación, mantenimiento, formación) y GTT Marine (Ascenz Marorka, VPS, Danelec)', tipo_resultado: null,
        historico: [{ periodo: '2021', ingresos: 17.4, resultado: null }, { periodo: '2022', ingresos: 23.1, resultado: null }, { periodo: '2023', ingresos: 28.1, resultado: null }, { periodo: '2024', ingresos: 38.9, resultado: null }, { periodo: '2025', ingresos: 59.1, resultado: null }] },
      { nombre: 'Electrolizadores (Elogen)', descripcion: 'Electrolizadores PEM; desde 2025, solo I+D de pilas tras la revisión estratégica', tipo_resultado: null,
        historico: [{ periodo: '2021', ingresos: 5.0, resultado: null }, { periodo: '2022', ingresos: 4.7, resultado: null }, { periodo: '2023', ingresos: 10.1, resultado: null }, { periodo: '2024', ingresos: 11.4, resultado: null }, { periodo: '2025', ingresos: 4.6, resultado: null }] },
    ],
    geografias: [{ nombre: 'Corea del Sur', peso_pct: 68 }, { nombre: 'China', peso_pct: 25 }, { nombre: 'Otros', peso_pct: 7 }],
    geografias_criterio: 'origen',
    kpis: [
      { kpi: 'Pedidos de metaneros (unidades)', valor_anterior: '72 (2024)', valor_actual: '37 (2025); 71 en 9M26', variacion: '−49 % en 2025; 9M26 ya ×1,9 todo 2025', comentario: '80 pedidos en total en 9M26 frente a 27 en 9M25 [13, 14]' },
      { kpi: 'Cartera del negocio principal (unidades, sin GNL como combustible)', valor_anterior: '288 (dic-2025)', valor_actual: '299 (sep-2026)', variacion: '+4 %', comentario: '266 metaneros, 21 etaneros, 3 FSRU, 4 FLNG y 5 tanques en tierra; 306 en junio [13, 3]' },
      { kpi: 'Valor de la cartera del negocio principal', valor_anterior: '1.600 M EUR (dic-2025)', valor_actual: '1.800 M EUR (sep-2026)', variacion: '+13 %', comentario: 'Calendario a junio: 300 M en el 2S26, 655 M en 2027, 603 M en 2028 y 295 M en 2029 y después [14, 3]' },
      { kpi: 'Margen EBITDA', valor_anterior: '60,5 % (2024)', valor_actual: '67,5 % (2025); 68,1 % en el 1S26', variacion: '+7,0 puntos', comentario: 'Apalancamiento operativo sobre una base de costes casi fija; la guía de 2026 implica un 64-70 % [2, 3, 13]' },
      { kpi: 'Ingresos de GTT Marine', valor_anterior: '19,9 M EUR (9M25)', valor_actual: '47,4 M EUR (9M26)', variacion: '+138 %', comentario: 'Danelec desde el 1-ago-2025; el 8 % de los ingresos del grupo [13]' },
      { kpi: 'Cartera de buques propulsados por GNL (unidades)', valor_anterior: '48 (dic-2025)', valor_actual: '40 (sep-2026)', variacion: '−17 %', comentario: 'Ningún pedido nuevo en 9M26: competencia de tanques tipo C chinos [13, 2]' },
    ],
  },
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 801.6, ebitda: 540.4, ebit: 511.9, beneficio_neto: 444.0, bpa: 11.94, dpa: 8.94, dpa_extraordinario: 0, fcf: 468.0, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 0.5 },
    cambios_perimetro: [{ periodo: '2025', descripcion: 'Danelec, consolidada desde el 1-ago-2025 (194,1 M EUR en caja): entra entera en el balance y cinco meses en la cuenta (16,1 M de ingresos)' }],
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '1S24', ingresos: 294.8, crecimiento_pct: 65.8, crecimiento_organico_pct: null, ebitda: 177.2, margen_ebitda_pct: 60.1, bpa: 4.59, vs_consenso: null },
      { periodo: '2S24', ingresos: 346.6, crecimiento_pct: 38.7, crecimiento_organico_pct: null, ebitda: 210.9, margen_ebitda_pct: 60.8, bpa: 4.78, vs_consenso: null },
      { periodo: '1S25', ingresos: 388.7, crecimiento_pct: 31.9, crecimiento_organico_pct: null, ebitda: 264.5, margen_ebitda_pct: 68.0, bpa: 4.86, vs_consenso: null },
      { periodo: '2S25', ingresos: 414.3, crecimiento_pct: 19.5, crecimiento_organico_pct: null, ebitda: 277.3, margen_ebitda_pct: 66.9, bpa: 6.26, vs_consenso: null },
      { periodo: '1S26', ingresos: 387.3, crecimiento_pct: -0.4, crecimiento_organico_pct: null, ebitda: 263.6, margen_ebitda_pct: 68.1, bpa: 5.68, vs_consenso: null },
    ],
    confianza: 'Media',
  },
  balance,
  flujos,
  calidad: { auditor: 'Ernst & Young Audit y Cailliau Dedouit et Associés', anios_auditor: 28, opinion: 'Favorable', confianza: 'Alta' },
  capital: {
    politica: 'La política es repartir al menos el 80 % del beneficio neto consolidado, con un dividendo a cuenta en diciembre y el resto en junio, siempre que el resultado distribuible de la matriz lo permita [2, 1]. Dividendo de 2025: 8,94 EUR por acción (4,00 a cuenta pagados el 11-dic-2025 y 4,94 el 19-jun-2026), un 80 % del beneficio [2]. Para 2026, 4,30 EUR a cuenta el 10-dic-2026 [3]. No hay programa de recompra más allá del contrato de liquidez y de la cobertura de acciones gratuitas [1]. La caja restante se dedica a I+D (47,6 M EUR en 2025), a compras pequeñas en soluciones digitales y al fondo GTT Strategic Ventures [1, 2].',
    adquisiciones: [
      { anio: '2025', objetivo: 'Danelec (Dinamarca, registradores de datos de viaje y datos de buque)', importe: 194.1, ev_ebitda: null, financiacion: 'Préstamo bancario de 120 M EUR y caja', resultado: 'Integración según el plan; 16,1 M de ingresos en cinco meses de 2025 y contratos con Petrobras y Petronas en 2026 [2, 3]' },
      { anio: '2024', objetivo: 'VPS (Vessel Performance Solutions, Dinamarca)', importe: 11.6, ev_ebitda: null, financiacion: 'Caja', resultado: 'Integrada en GTT Marine [4]' },
      { anio: '2020', objetivo: 'Areva H2Gen (hoy Elogen), electrolizadores PEM', importe: null, ev_ebitda: null, financiacion: 'Caja', resultado: 'Fracaso: EBITDA de −33,3 M en 2024, gigafactoría de Vendôme abandonada y 48,7 M de gastos no corrientes en 2025 [2, 1]' },
      { anio: '2020', objetivo: 'Marorka (Islandia) y OSE Engineering (Francia)', importe: 8.0, ev_ebitda: null, financiacion: 'Caja', resultado: 'Base de Ascenz Marorka, integrada en GTT Marine [1]' },
    ],
    confianza: 'Alta',
  },
  fuentes: fA,
  huecos: [
    { seccion: 'trimestres', campo: 'comparación con el consenso de cada semestre', tipo: 'Complemento', intentos: '1) notas de resultados de GTT (no publican consenso); 2) MarketScreener (solo estimaciones actuales); 3) prensa (Investir, Les Echos: sin cifra de consenso previa citada)', decision: 'Omitido' },
    { seccion: 'negocio', campo: 'resultado por segmento', tipo: 'Complemento', intentos: '1) URD 2025, nota de segmentos (solo EBITDA de Elogen); 2) presentaciones de resultados (sin margen por línea); 3) notas de prensa', decision: 'Omitido' },
  ],
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Universal Registration Document 2025, cap. 1 (sector del gas licuado, tecnologías competidoras, pedidos 2016-2025)', editor: 'GTT', tipo: 'Primaria', fecha: '2026-04-27', url: URD },
  { id: 2, titulo: 'H1 2026 Results – Presentation (demanda de GNL de Shell y Wood Mackenzie, FID, capacidad de los astilleros, pedidos a 10 años)', editor: 'GTT', tipo: 'Primaria', fecha: '2026-07-29', url: G + 'GTT%20-%20H1%202026%20Results%20-%20Presentation.pdf' },
  { id: 3, titulo: 'First half 2026 results – Press release', editor: 'GTT', tipo: 'Primaria', fecha: '2026-07-28', url: H126 },
  { id: 4, titulo: 'FY 2025 results – Press release', editor: 'GTT', tipo: 'Primaria', fecha: '2026-02-19', url: FY25 },
  { id: 5, titulo: 'Investor presentation FY 2025 & Q1 2026 (mayo-junio de 2026)', editor: 'GTT', tipo: 'Primaria', fecha: '2026-05', url: G + 'GTT%20-%20IR%20-%20FY%202025%20%26%20Q1%202026%20-%20May%20%26%20June%202026.pdf' },
  { id: 6, titulo: 'Wärtsilä: estadísticas y previsiones (ingresos, márgenes)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/quote/hel/WRT1V/statistics/' },
  { id: 7, titulo: 'GTT signe une commande de cuves pour deux nouveaux méthaniers', editor: 'Investir – Les Echos', tipo: 'Prensa', fecha: '2026-10-14', url: 'https://investir.lesechos.fr/' },
  { id: 8, titulo: 'GTT, le champion qui règne sur les cuves de méthaniers', editor: 'Le Point', tipo: 'Prensa', fecha: '2026-09-23', url: 'https://www.lepoint.fr/' },
  { id: 9, titulo: 'Revenues for the first nine months of 2026 (comunicado: pedidos, cartera, Oriente Medio)', editor: 'GTT', tipo: 'Primaria', fecha: '2026-10-23', url: Q326 },
  { id: 10, titulo: 'Q3 2026 Activity Update – Presentation (FID 2025-2026, Ormuz, astilleros, renovación de la flota, demanda de GNL)', editor: 'GTT', tipo: 'Primaria', fecha: '2026-10-23', url: Q326P },
];
const B = {
  _estado: 'completo',
  historia: {
    resumen: 'GTT nace en 1994 de la fusión de Gaztransport (tecnología NO96) y Technigaz (tecnología Mark III), dos ingenierías francesas de los años sesenta, con Gaz de France (40 %), Total (30 %) y Bouygues Offshore (30 %) como accionistas [1]. Desde entonces vive de licenciar sus membranas criogénicas a los astilleros. Salió a bolsa en febrero de 2014; Engie, heredera de Gaz de France, bajó del 10 % en diciembre de 2022 y vendió el resto en mayo de 2025, y hoy el capital flota casi entero [1]. Desde 2015 todos los metaneros de más de 100.000 m3 encargados en el mundo usan su tecnología [1]. La diversificación ha ido por dos vías: soluciones digitales para la flota (Ascenz, Marorka, VPS y Danelec, hoy GTT Marine) e hidrógeno (Elogen, comprada en 2020 y reducida a I+D en 2025) [1, 4].',
    hitos: [
      { anio: '1994', hito: 'Fusión de Gaztransport y Technigaz en GTT [1]' },
      { anio: '2011', hito: 'Lanzamiento de Mark III Flex, la tecnología más vendida hoy [1]' },
      { anio: '2014', hito: 'Salida a bolsa en Euronext París (compartimento A) [1]' },
      { anio: '2015', hito: 'Desde ese año, el 100 % de los metaneros grandes encargados usan tecnología de GTT [1]' },
      { anio: '2020', hito: 'Compra de Areva H2Gen (Elogen), Marorka y OSE Engineering [1]' },
      { anio: '2022', hito: 'Récord de pedidos: 162 metaneros [1]' },
      { anio: '2023', hito: 'La KFTC coreana gana en el Supremo: los astilleros coreanos pueden pedir separar licencia y asistencia técnica [1]' },
      { anio: '2025', hito: 'Compra de Danelec (194 M EUR), reestructuración de Elogen y salida definitiva de Engie del capital [1, 4]' },
      { anio: '2026', hito: 'François Michel, consejero delegado desde el 5-ene; 71 metaneros encargados en 9M y primeros de tres tanques; Philippe Berterottière deja la presidencia (16-nov) a Catherine Ronge [3, 9]' },
    ],
    confianza: 'Alta',
  },
  sector: {
    definicion: 'El mercado relevante es el de los sistemas de contención de gas licuado para nuevas construcciones: sobre todo metaneros de gran tamaño, y además etaneros, unidades flotantes (FSRU y FLNG), tanques en tierra y buques que usan GNL como combustible [1]. Se mide en pedidos de unidades al año, porque GTT cobra un canon por cada buque (en torno al 5 % de su precio, estimación propia a partir de los ingresos por buque) y su cuota en metaneros grandes es del 100 % desde 2015 [1]. La demanda final es el comercio de GNL: 431 Mtpa de producción en 2025 y un crecimiento del 5 % anual previsto para 2026-2035 en los escenarios centrales de Shell y Wood Mackenzie [2]. La serie usa los pedidos de metaneros a GTT, que coinciden con los del mercado (Clarksons y GTT) [1].',
    tamano: '37 metaneros encargados en 2025 (575 entre 2016 y 2025) y 71 en los nueve primeros meses de 2026 [1, 9]; producción mundial de GNL de 431 Mtpa en 2025 [2]',
    unidad_serie: 'metaneros encargados al año (unidades)',
    serie: [
      { anio: '2018', tamano: 48 }, { anio: '2019', tamano: 57 }, { anio: '2020', tamano: 41 }, { anio: '2021', tamano: 68 },
      { anio: '2022', tamano: 162 }, { anio: '2023', tamano: 73 }, { anio: '2024', tamano: 72 }, { anio: '2025', tamano: 37 },
    ],
    tcac_historico_pct: null,
    tcac_previsto_pct: 5.0,
    cr5_pct: 100,
    estructura: 'Concentrada',
    drivers: [
      { driver: 'Decisiones de inversión en licuefacción (FID)', efecto: '+', horizonte: 'Cíclico', evidencia: '84 Mtpa decididas en 2025 (récord) y 51 Mtpa en 9M26 (tercer mejor año), 21 de ellas en EE. UU.; de los 71 metaneros de 2026 solo 21 van ligados a esas FID, así que la mayoría de los buques de esos proyectos está por encargar [10, 9]' },
      { driver: 'Crecimiento de la demanda de GNL en Asia y Europa', efecto: '+', horizonte: 'Estructural', evidencia: 'Crecimiento previsto del 5 % anual en 2026-2035; el 80 % del aumento, en Asia [2]' },
      { driver: 'Renovación de la flota (metaneros de vapor antiguos)', efecto: '+', horizonte: 'Estructural', evidencia: 'GTT estima unos 550 metaneros encargados en 2026-2035 (antes, 450 o más) [2, 4]' },
      { driver: 'Precio de construcción y fletes spot', efecto: '−', horizonte: 'Cíclico', evidencia: 'Fletes spot por debajo de 40.000 USD/día en 2025 y precios de construcción altos frenaron los pedidos del 1S25 [1]' },
      { driver: 'Geopolítica (Oriente Medio, China-EE. UU.)', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'El conflicto cerró temporalmente plantas en Qatar y Emiratos (dos trenes de 13 Mtpa dañados) y el paso por Ormuz sigue incierto; los fletes spot bajaron y algunas entregas vuelven a sus fechas contractuales, con efecto limitado según la empresa [9, 10]' },
      { driver: 'Capacidad de los astilleros', efecto: '+', horizonte: 'Estructural', evidencia: 'Huecos de metaneros de unos 55 al año en 2020 a más de 100 previstos en 2028 [2]' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 1, justificacion: 'Cuota del 100 % en metaneros grandes desde 2015; las alternativas (Moss, SPB, KC-1) no se han vuelto a encargar para metaneros estándar [1]' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Cinco astilleros suman el 80 % de las ventas y el mayor, el 21 %; los coreanos ganaron a GTT ante la KFTC [1]' },
      { fuerza: 'Poder de los proveedores', intensidad: 1, justificacion: 'Modelo de licencia: GTT no fabrica; las compras son el 2,5 % de las ventas (20,2 M en 2025) [4]' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Astilleros coreanos y chinos (Samsung, Hyundai, Hanwha, Jiangnan) desarrollan sistemas propios; sin pedidos de metaneros grandes hasta hoy [1]' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'Gasoductos, renovables y, a largo plazo, un pico de la demanda de gas; en GNL como combustible ya ganan los tanques tipo C [1, 4]' },
    ],
    ciclo: { posicion: 'Recuperación', comentario: 'Los pedidos de metaneros son muy cíclicos: 5 en 2016, 162 en 2022 y 37 en 2025 [1]. Tras el bache del 1S25 (aranceles, precio de construcción y fletes bajos), los pedidos repuntaron desde el 4T25 (18) y 9M26 suma 71, empujados por las 84 Mtpa de FID de 2025 y las 51 de 2026 [4, 9, 10]. En 2008-09 los pedidos cayeron por la crisis y el gas de esquisto; en 2020 bajaron a 41 sin dañar los ingresos, que reflejan pedidos de 2-3 años antes; en 2022 hubo récord por la crisis energética europea [1]. Los ingresos de 9M26 bajan un 4,9 % (el 3T, un 13,3 %) por el valle de pedidos de 2025 y vuelven a crecer con la cartera en 2027-2028 [9, 3].' },
    regulacion: 'Las normas de la OMI sobre emisiones (EEXI, CII) y el sistema europeo de comercio de emisiones (EU ETS, con el transporte marítimo desde 2024, y FuelEU Maritime desde 2025) favorecen buques más eficientes y la venta de soluciones digitales de GTT Marine [1]. Las normas de conexión eléctrica en puerto (cold ironing) impulsan el diseño de tanques de 1 barg [4]. En competencia, la KFTC coreana obliga a separar licencia y asistencia si un astillero lo pide (firme desde abril de 2023) [1]. En Francia, GTT tributa a un tipo reducido sobre los cánones de patentes (régimen de propiedad industrial), que podría cambiar [1].',
    tendencias: 'Metaneros más grandes y eficientes (tres tanques, 177.000 m3, un 6 % menos de evaporación; 200.000 m3 con Mark III Flex+) y unidades flotantes de licuefacción, donde GTT ganó el primer FLNG de EE. UU. (Delfin) [3, 9]. En tierra, cinco tanques encargados en 2026, los mayores del mundo con GST (240.000 m3 de GNL en China) [9]. GTT lanza servicios a la flota (LNG Performance Centre, ingresos relevantes desde finales de 2027 o 2028) [9, 10]. Los astilleros chinos ganan peso: el 25 % de los ingresos de GTT en 2025 frente al 21 % en 2024 [1]. Riesgo tecnológico: Samsung, Hyundai, Hanwha y Jiangnan tienen sistemas propios aprobados, y en GNL como combustible los tanques tipo C chinos han restado cuota (ingresos −36 % en 2025) [1, 4]. A largo plazo, el amoniaco y el etano abren mercados donde las membranas aún no dominan [1].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 100,
    posicion: '1.º mundial en sistemas de contención de metaneros grandes (100 % de los encargados desde 2015 y el 86 % de la flota mundial) [1]; en GNL como combustible compite con tanques tipo C y pierde cuota [4]',
    competidores: [
      { nombre: 'Moss Maritime (grupo Saipem)', pais: 'Noruega', ticker: null, ingresos: null, cuota_pct: 0, margen_ebit_pct: null, comentario: 'Tanques esféricos; el 14 % de la flota, sin pedidos de metaneros desde 2015 [1]' },
      { nombre: 'KC LNG Tech (Kogas y astilleros coreanos), KC-1 y KC-2', pais: 'Corea del Sur', ticker: null, ingresos: null, cuota_pct: 0, margen_ebit_pct: null, comentario: 'Los dos metaneros KC-1 de 2018 tuvieron que repararse y no operan; KC-2 solo en buques de bunkering pequeños [1]' },
      { nombre: 'IHI (SPB, tipo B prismático)', pais: 'Japón', ticker: '7013', ingresos: null, cuota_pct: 0, margen_ebit_pct: null, comentario: 'Usado en un FLNG de ENI en el astillero chino Wison (2025) [1]' },
      { nombre: 'Samsung Heavy Industries, Hyundai Heavy Industries, Hanwha Ocean y Jiangnan (sistemas propios)', pais: 'Corea del Sur y China', ticker: null, ingresos: null, cuota_pct: 0, margen_ebit_pct: null, comentario: 'Son a la vez clientes y competidores potenciales con tecnologías aprobadas y sin pedidos de metaneros estándar [1]' },
      { nombre: 'Wärtsilä', pais: 'Finlandia', ticker: 'WRT1V', ingresos: 6920, cuota_pct: null, margen_ebit_pct: null, comentario: 'Compite con GTT Marine en soluciones digitales y de eficiencia para buques [6]' },
    ],
    foso: {
      veredicto: 'Amplio', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 2, evidencia: 'Navieras, fletadores, sociedades de clasificación y terminales están acostumbrados a sus membranas: el 86 % de la flota las usa [1]' },
        { fuente: 'Costes de cambio', puntuacion: 4, evidencia: 'Un metanero cuesta más de 200 M USD y su contenedor no admite fallos: los KC-1 coreanos no han vuelto a operar [1]' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 5, evidencia: '68 patentes en 2025, 1.º entre las medianas empresas francesas del INPI; 60 años de historial operativo [3, 4]' },
        { fuente: 'Ventaja en costes', puntuacion: 4, evidencia: 'Un metanero Moss cuesta un 10-15 % más que uno con membrana GTT [1]' },
        { fuente: 'Escala eficiente', puntuacion: 4, evidencia: 'Mercado de unos 50-60 buques al año: no caben dos licenciadores con su base de I+D (47,6 M en 2025) [1]' },
      ],
    },
    amenazas: 'La amenaza principal es que un astillero coreano o chino imponga su propio sistema con el apoyo de su gobierno: Samsung, Hyundai, Hanwha y Jiangnan tienen sistemas aprobados, y China (25 % de los ingresos) añade riesgo de copia y de tensiones con EE. UU. [1]. Probabilidad baja a cinco años, porque las navieras y los fletadores eligen la tecnología y el fiasco del KC-1 pesa; mayor a diez [1]. Segunda amenaza: el precedente de la KFTC, que podría repetirse en otras jurisdicciones y presionar el canon [1]. En GNL como combustible la erosión ya ocurre: −36 % de ingresos en 2025 por los tanques tipo C chinos [4].',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [
      { agencia: 'MSCI ESG', calificacion: 'BBB', fecha: '2025' },
      { agencia: 'Sustainalytics', calificacion: '17,5 (riesgo bajo)', fecha: '2025' },
      { agencia: 'CDP Clima', calificacion: 'B', fecha: '2025' },
    ],
    materialidad: 'Lo material es la exposición al gas fósil: casi todo el negocio depende de que se construyan metaneros, y una transición más rápida hacia renovables bajaría la demanda de GNL a partir de 2035 [1]. Las taxonomías penalizan: solo el 2,4 % de los ingresos de 2025 eran elegibles y alineados con la taxonomía europea [1]. Como contrapeso, la tecnología reduce la evaporación del GNL y las emisiones de los buques (metaneros de tres tanques con un 6 % menos de evaporación; tanques preparados para amoniaco) [3, 4]. El hidrógeno (Elogen) se ha reducido a I+D tras perder 33 M de EBITDA en 2024 [4].',
    controversias: 'Sin sanciones ni litigios significativos en 2023-2025 según el URD [1]. La única decisión adversa es la de la KFTC coreana sobre la venta conjunta de licencia y asistencia técnica, firme desde abril de 2023 y sin efecto financiero según la empresa [1].',
    confianza: 'Media',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'sector', campo: 'tamaño del mercado en euros y segunda fuente independiente de pedidos', tipo: 'Complemento', intentos: '1) URD 2025 (pedidos según Clarksons y GTT, en unidades); 2) presentación del 1S26 (demanda en Mtpa de Shell y Wood Mackenzie); 3) Clarksons (de pago)', decision: 'Omitido' },
    { seccion: 'competencia', campo: 'ingresos y margen de los competidores en sistemas de contención', tipo: 'Complemento', intentos: '1) URD 2025 (no publica cifras de competidores); 2) Saipem e IHI (no desglosan Moss ni SPB); 3) Kogas (KC LNG Tech no publica cuentas)', decision: 'Omitido' },
  ],
};
guarda('B', B);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Universal Registration Document 2025, cap. 4 (gobierno corporativo y remuneraciones) y cap. 1 (equipo)', editor: 'GTT', tipo: 'Primaria', fecha: '2026-04-27', url: URD },
  { id: 2, titulo: 'Appointment of François Michel as Chief Executive Officer of the GTT Group', editor: 'GTT', tipo: 'Primaria', fecha: '2025-12-15', url: 'https://www.gtt.fr/news/appointment-francois-michel-chief-executive-officer-gtt-group' },
  { id: 3, titulo: 'First half 2026 results – Press release (junta de 2026 y cambios en el consejo)', editor: 'GTT', tipo: 'Primaria', fecha: '2026-07-28', url: H126 },
  { id: 4, titulo: 'AMF, BDIF: declaración de operación de directivo 2026DD1101511 (venta de 2.000 acciones)', editor: 'AMF', tipo: 'Primaria', fecha: '2026-03-17', url: 'https://bdif.amf-france.org/back/api/v1/documents/2026/2026DD1101511/FDD30501F39BB7B6A96115758529E1A3E7529C13388C9DA0C1B927B94420ED8A.pdf' },
  { id: 5, titulo: 'AMF: declaración de cruce de umbral 226C1709 (BlackRock, 5,01 %)', editor: 'AMF', tipo: 'Primaria', fecha: '2026-10-06', url: 'https://bdif.amf-france.org/back/api/v1/documents/2026/226C1709/D9F56E014BD33A86D4093714E25206C3072C94D673EB9AE5EE71FC6728D9580B.pdf' },
  { id: 6, titulo: 'AMF: declaración de cruce de umbral 226C1726 (BlackRock, 4,95 %)', editor: 'AMF', tipo: 'Primaria', fecha: '2026-10-08', url: 'https://bdif.amf-france.org/back/api/v1/documents/2026/226C1726/415F634D654206C2811C32411BBBBAF9F3EC3A28DC80C77848DA39012DB017F6.pdf' },
  { id: 7, titulo: 'AMF: declaración de cruce de umbral 226C0677 (FMR, 5,12 %)', editor: 'AMF', tipo: 'Primaria', fecha: '2026-05-18', url: 'https://bdif.amf-france.org/back/api/v1/documents/2026/226C0677/CA06A5F0E46035639516009170EE4CD631E2992608F091F1FACB5B3CF18B972B.pdf' },
  { id: 8, titulo: 'Presentaciones de resultados 2021-2024 (guías anuales de ingresos y EBITDA)', editor: 'GTT', tipo: 'Primaria', fecha: '2025-02-21', url: G + 'GTT%20-%20FY%202024%20Results%20-%20Presentation.pdf' },
  { id: 9, titulo: 'FY 2025 results – Press release', editor: 'GTT', tipo: 'Primaria', fecha: '2026-02-19', url: FY25 },
  { id: 10, titulo: 'Revenue of 600 million euros for the first nine months of 2025; annual objectives revised upwards', editor: 'GTT', tipo: 'Primaria', fecha: '2025-10-23', url: 'https://www.gtt.fr/news/revenue-600-million-euros-first-nine-months-2025-strong-growth-29-annual-objectives-revised' },
  { id: 11, titulo: 'GTT announces the appointment of Ms. Catherine Ronge as Chairwoman of its Board of Directors', editor: 'GTT', tipo: 'Primaria', fecha: '2026-10-23', url: RONGE },
  { id: 12, titulo: 'Revenues for the first nine months of 2026; Objectives confirmed for 2026 (comunicado)', editor: 'GTT', tipo: 'Primaria', fecha: '2026-10-23', url: Q326 },
  { id: 13, titulo: 'AMF, BDIF: búsqueda de declaraciones de directivos (DD) y de umbrales de GTT (última DD: 2026DD1101511)', editor: 'AMF', tipo: 'Primaria', fecha: '2026-10-26', url: 'https://bdif.amf-france.org/back/api/v1/informations?RechercheTexte=GAZTRANSPORT&TypesInformation=DD&From=0&Size=10' },
];
const C = {
  _estado: 'completo',
  directivos: {
    equipo: [
      { nombre: 'François Michel', cargo: 'Consejero delegado', desde: '2026', participacion_pct: null, trayectoria: 'Politécnico e ingeniero de Minas; Alstom (marina y energía), Ministerio de Economía, FMI, Elíseo y Saint-Gobain [2]. Consejero delegado de John Cockerill desde 2022 (energía, defensa, hidrógeno) [2]. Lleva nueve meses en el cargo: sin historial medible en GTT.' },
      { nombre: 'Philippe Berterottière', cargo: 'Presidente del consejo hasta el 16-nov-2026', desde: '2009', participacion_pct: 0.48, trayectoria: 'Dirigió GTT como presidente y consejero delegado de 2009 a 2024 (salida a bolsa en 2014 y ciclo récord de pedidos) y otra vez de forma interina en 2025, con la guía cumplida o superada [1, 8]. Dimite del consejo con efecto el 16-nov-2026, tras acompañar diez meses al nuevo consejero delegado [11].' },
      { nombre: 'Catherine Ronge', cargo: 'Presidenta del consejo desde el 16-nov-2026', desde: '2021', participacion_pct: null, trayectoria: 'Doctora en física cuántica; Air Liquide (1988-1999), Suez-Degrémont y Ondeo Industrial Solutions (presidenta y consejera delegada), fundadora de Weave Air; consejera independiente de GTT desde 2021 y presidenta de nombramientos y retribuciones desde 2023 [11].' },
      { nombre: 'Thierry Hochoa', cargo: 'Director financiero', desde: '2023', participacion_pct: null, trayectoria: 'En GTT desde septiembre de 2023; antes, cargos financieros y de dirección en el grupo industrial Fives (vidrio, innovación) [1].' },
      { nombre: 'David Colson', cargo: 'Director comercial', desde: null, participacion_pct: null, trayectoria: 'Responsable de la relación con astilleros y navieras; vendió 2.000 acciones el 2-ene-2026 [4].' },
      { nombre: 'Karim Chapot', cargo: 'Vicepresidente técnico', desde: null, participacion_pct: null, trayectoria: 'Ingeniero de GTT desde hace casi 30 años [1].' },
    ],
    historial_guidance: [
      { anio: '2022', guia: 'Ingresos 290-320 M EUR; EBITDA 140-170 M [8]', real: 'Ingresos 307,3 M; EBITDA 161,1 M [8]', cumplida: 'Sí' },
      { anio: '2023', guia: 'Ingresos 385-430 M; EBITDA 190-235 M [8]', real: 'Ingresos 427,7 M; EBITDA 234,5 M [8]', cumplida: 'Sí' },
      { anio: '2024', guia: 'Ingresos 600-640 M; EBITDA 345-385 M [8]', real: 'Ingresos 641,4 M; EBITDA 388,1 M (por encima) [8]', cumplida: 'Sí' },
      { anio: '2025', guia: 'Ingresos 750-800 M; EBITDA 490-540 M (subida en octubre a 790-820 M y 530-550 M) [8, 10]', real: 'Ingresos 803,0 M; EBITDA 541,8 M [9]', cumplida: 'Sí' },
      { anio: '2026', guia: 'Ingresos 740-780 M; EBITDA 490-530 M (confirmada el 28-jul y el 23-oct) [9, 3, 12]', real: '1S26: ingresos 387,3 M y EBITDA 263,6 M; 9M26: ingresos 570,1 M [3, 12]', cumplida: 'Parcial' },
    ],
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Philippe Berterottière', cargo: 'Presidente (dimite con efecto el 16-nov-2026)', tipo: 'Otro externo', desde: '2013', comisiones: 'Estrategia y RSC' },
      { nombre: 'François Michel', cargo: 'Consejero delegado (no consejero según el URD)', tipo: 'Ejecutivo', desde: '2026', comisiones: '—' },
      { nombre: 'Domitille Doat-Le Bigot', cargo: 'Consejera', tipo: 'Independiente', desde: '2023', comisiones: 'Auditoría y riesgos' },
      { nombre: 'Carolle Foissaud', cargo: 'Consejera', tipo: 'Independiente', desde: '2022', comisiones: 'Nombramientos y retribuciones' },
      { nombre: 'Luc Gillet', cargo: 'Consejero', tipo: 'Independiente', desde: '2023', comisiones: 'Estrategia y RSC; nombramientos y retribuciones (desde el 16-nov)' },
      { nombre: 'Pierre Guiollot', cargo: 'Consejero', tipo: 'Otro externo', desde: '2020', comisiones: 'Sale de nombramientos y retribuciones el 16-nov' },
      { nombre: 'Pascal Macioce', cargo: 'Consejero', tipo: 'Independiente', desde: '2022', comisiones: 'Preside auditoría y riesgos' },
      { nombre: 'Catherine Ronge', cargo: 'Consejera; presidenta del consejo desde el 16-nov-2026', tipo: 'Independiente', desde: '2021', comisiones: 'Estrategia y RSC; presidió nombramientos y retribuciones hasta el 16-nov' },
      { nombre: 'Antoine Rostand', cargo: 'Consejero', tipo: 'Independiente', desde: '2022', comisiones: 'Preside estrategia y RSC; auditoría y riesgos' },
      { nombre: 'Sandra Lagumina', cargo: 'Consejera (cooptada el 10-jun-2026)', tipo: 'Independiente', desde: '2026', comisiones: 'Preside nombramientos y retribuciones desde el 16-nov (deja auditoría)' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 3,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 1.58, fijo: 0.42, variable_corto: 0.31, variable_largo: 0.85, ratio_salario_medio: null },
    remuneracion: 'En 2025 dirigió la empresa Philippe Berterottière como presidente y consejero delegado interino (9-feb a 31-dic): 0,42 M EUR de fijo, 0,31 M de variable (objetivos cumplidos al 103,9 %) y acciones de rendimiento valoradas en 0,85 M [1]. La política de 2026 para François Michel: 0,70 M de fijo, variable de hasta el 100 % (76 % cuantitativo: EBITDA, cuota de mercado en el negocio principal, ingresos y EBITDA digitales, pedidos de actividades nuevas; 21 % ligado a RSC) y un plan a largo plazo de hasta el 100 % del fijo con tres criterios a tres años: beneficio neto (40 %), RSC (30 %) y rentabilidad total frente a un índice de comparables (30 %) [1]. Premia beneficio y cuota, no crecimiento a cualquier precio. El código AFEP-MEDEF se aplica sin excepciones [1].',
    accionistas: [
      { nombre: 'FMR (Fidelity)', pct: 5.12, tipo: 'Institucional', variacion: 'Cruzó al alza el 5 % el 7-may-2026 [7]' },
      { nombre: 'BlackRock', pct: 4.95, tipo: 'Institucional', variacion: 'Subió al 5,01 % el 2-oct-2026 y volvió al 4,95 % el 6-oct (acciones en garantía) [5, 6]' },
      { nombre: 'Directivos y empleados', pct: 1.0, tipo: 'Interno', variacion: 'A 31-mar-2026 [1]' },
      { nombre: 'Autocartera', pct: 0.1, tipo: 'Autocartera', variacion: 'Contrato de liquidez [1]' },
      { nombre: 'Engie', pct: 0, tipo: 'Antiguo accionista de referencia', variacion: 'Vendió el resto de su participación en mayo de 2025 [1]' },
    ],
    insiders: [{ fecha: '2026-01-02', persona: 'David Colson (director comercial)', operacion: 'Venta', acciones: 2000, importe: 0.31 }],
    control_y_defensas: 'No hay accionista de control: el 98,9 % del capital está en bolsa y los mayores tenedores son gestoras (FMR 5,12 %, BlackRock 4,95 %) [1, 5, 6, 7]. Una acción, un voto, sin derechos dobles en la práctica y sin pactos [1]. Engie, que llegó a tener el 40 %, salió del todo en mayo de 2025; su antiguo dominical, Pierre Guiollot, sigue como consejero no independiente hasta 2027 [1]. No se han identificado operaciones vinculadas relevantes ni blindajes. El tamaño (unos 7.700 M EUR) y la falta de un núcleo duro la hacen opable en teoría, pero el Estado francés vigila las tecnologías estratégicas y el ministro de Exteriores visitó la sede en septiembre de 2026.',
    alertas: [
      'Rotación en la cúpula: dimisión del consejero delegado Jean-Baptiste Choimet en febrero de 2025 tras ocho meses, interinidad del presidente y llegada de François Michel en enero de 2026 [1, 2].',
      'Sin consejero coordinador durante la interinidad de 2025, por decisión del consejo [1].',
      'Dimisión de la consejera independiente Virginie Banet en febrero de 2026, diez meses después de entrar [1, 3].',
      'Tercer cambio en la cúpula en 24 meses: Philippe Berterottière deja la presidencia y el consejo el 16-nov-2026 y le sustituye Catherine Ronge, según el plan de sucesión; el consejo queda con ocho miembros, siete independientes, y busca otro independiente [11].',
    ],
    confianza: 'Media',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'votos de la junta sobre remuneración (2024-2026)', tipo: 'Complemento', intentos: '1) URD 2025 (solo recoge los votos de la remuneración del consejo, 98,1 %); 2) web de la junta de GTT (sin acta de votaciones descargable); 3) BALO y prensa (sin cifras)', decision: 'Omitido' },
    { seccion: 'gobierno', campo: 'ratio de remuneración del primer ejecutivo sobre el salario medio', tipo: 'Complemento', intentos: '1) URD 2025, cap. 4 (no localizado en el texto extraído); 2) búsqueda de «ratio» en el URD; 3) informe de remuneraciones de la junta (no publicado aparte)', decision: 'Omitido' },
  ],
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const SA = (s, n) => ({ titulo: `${n}: estadísticas y previsiones (consenso a 15-oct; precio llevado al cierre del 23-oct con Yahoo)`, editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: `https://stockanalysis.com/quote/${s}/statistics/` });
const fD = [
  { id: 1, titulo: 'Históricos diarios de GTT.PA, EXSA.DE y EXH1.DE (precio, rentabilidades, beta, volatilidad) y de los comparables (TE.PA, WRT1V.HE, ALFA.ST, 010140.KS, 042660.KS, SBMO.AS)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: FPRECIO, url: 'https://finance.yahoo.com/quote/GTT.PA/history' },
  { id: 2, titulo: 'GTT: Financial Data Forecasts Estimates and Expectations (consenso 2026-2028)', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-26', url: 'https://www.marketscreener.com/quote/stock/GTT-GAZTRANSPORT-15821825/finances/' },
  { id: 3, titulo: 'GTT: Target Price Consensus and Analysts Recommendations (12 analistas, objetivo medio 234,25 EUR)', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-26', url: 'https://www.marketscreener.com/quote/stock/GTT-GAZTRANSPORT-15821825/consensus/' },
  { id: 4, titulo: 'Gaztransport & Technigaz (EPA:GTT): estadísticas, cierre del 23-oct-2026 y acciones en circulación (37,08 M)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-26', url: 'https://stockanalysis.com/quote/epa/GTT/statistics/' },
  { id: 5, titulo: 'Gaztransport & Technigaz: previsiones (S&P Global, 12 analistas, actualizado el 4-sep-2026)', editor: 'Stock Analysis (S&P Global)', tipo: 'Analistas', fecha: '2026-10-26', url: 'https://stockanalysis.com/quote/epa/GTT/forecast/' },
  { id: 6, titulo: 'Rendimiento del Bund a 10 años (3,39 % el 23-oct-2026)', editor: 'Deutsche Bundesbank', tipo: 'Datos de mercado', fecha: '2026-10-23', url: 'https://api.statistiken.bundesbank.de/rest/download/BBSIS/D.I.ZST.ZI.EUR.S1311.B.A604.R10XX.R.A.A._Z._Z.A?format=csv&lang=en' },
  { id: 7, titulo: 'Implied ERP by month (ERPbymonth.xlsx): 4,20 % en octubre de 2026', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 8, titulo: 'Tipos de cambio de referencia del euro (23-oct-2026: SEK 11,1310; KRW 1.482,46)', editor: 'Banco Central Europeo', tipo: 'Datos de mercado', fecha: '2026-10-23', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml' },
  { id: 9, ...SA('epa/TE', 'Technip Energies') },
  { id: 10, ...SA('hel/WRT1V', 'Wärtsilä') },
  { id: 11, ...SA('sto/ALFA', 'Alfa Laval') },
  { id: 12, ...SA('krx/010140', 'Samsung Heavy Industries') },
  { id: 13, ...SA('krx/042660', 'Hanwha Ocean') },
  { id: 14, ...SA('ams/SBMO', 'SBM Offshore') },
  { id: 15, titulo: 'Honeywell to acquire Air Products’ LNG process technology and equipment business (1.810 M USD, unas 13 veces el EBITDA estimado de 2024)', editor: 'Honeywell', tipo: 'Primaria', fecha: '2024-07-10', url: 'https://www.honeywell.com/us/en/press/2024/07/honeywell-to-acquire-air-products-liquefied-natural-gas-process-technology-and-equipment-business-to-expand-energy-transition-solutions-and-services' },
  { id: 16, titulo: 'Honeywell to acquire Sundyne (2.160 M USD, unas 14,5 veces el EBITDA de 2024 ajustado por impuestos)', editor: 'Honeywell', tipo: 'Primaria', fecha: '2025-03-04', url: 'https://www.honeywell.com/us/en/press/2025/03/honeywell-to-acquire-sundyne-to-expand-critical-equipment-portfolio-and-aftermarket-services' },
  { id: 17, titulo: 'Baker Hughes to acquire Chart Industries (valor empresa de 13.600 M USD; Chart: 4.200 M de ingresos y 1.000 M de EBITDA ajustado en 2024)', editor: 'LNG Industry', tipo: 'Prensa', fecha: '2025-07-30', url: 'https://www.lngindustry.com/liquid-natural-gas/30072025/baker-hughes-to-acquire-chart-industries' },
  { id: 18, titulo: 'AMF: posiciones cortas netas declaradas sobre GTT (Citadel 0,80 % a 20-oct; BlackRock Financial Management 0,72 % a 15-oct; AHL 0,70 % a 9-oct; BlackRock Institutional Trust 0,50 % a 22-oct-2026)', editor: 'AMF', tipo: 'Primaria', fecha: '2026-10-23', url: 'https://bdif.amf-france.org/back/api/v1/documents/2026/2026E1145976/DD0C43EF03EEA0BBA84DE726969D1ECC2DD1A9182A9F8DF334C304D860BDF3FE.pdf' },
  { id: 19, titulo: 'Revenues for the first nine months of 2026 (comunicado: guía confirmada y calendario financiero, anuales el 24-feb-2027)', editor: 'GTT', tipo: 'Primaria', fecha: '2026-10-23', url: Q326 },
  { id: 20, titulo: 'First half 2026 results – Press release (balance a 30-jun-2026)', editor: 'GTT', tipo: 'Primaria', fecha: '2026-07-28', url: H126 },
  { id: 21, titulo: 'FY 2025 results – Press release (acciones diluidas)', editor: 'GTT', tipo: 'Primaria', fecha: '2026-02-19', url: FY25 },
  { id: 22, titulo: 'Les changements de recommandations: Veolia, GTT, Safran… (Bernstein baja GTT a «performance du marché», objetivo 245 → 210 EUR)', editor: 'Boursorama (Reuters)', tipo: 'Prensa', fecha: '2026-10-26', url: 'https://www.boursorama.com/bourse/actualites/les-changements-de-recommandations-veolia-gtt-safran-eutelsat-interparfums-fdj-united-869bab014a34e5f269d2bdc6fa044384' },
  { id: 23, titulo: 'Gaztransport et Technigaz: consenso de analistas (10 comprar, 1 mantener, 1 vender; objetivo medio 232,08 EUR)', editor: 'Investing.com', tipo: 'Analistas', fecha: '2026-10-26', url: 'https://www.investing.com/equities/gtt-consensus-estimates' },
  { id: 24, titulo: 'Genmab porté par des avancées prometteuses, GTT pénalisé par des résultats décevants (GTT −12,6 %)', editor: 'Option Finance', tipo: 'Prensa', fecha: '2026-10-26', url: 'https://www.optionfinance.fr/info-financiere-en-continu/d/2026-10-26-genmab-porte-par-des-avancees-prometteuses-gtt-penalise-par-des-resultats-decevants.html' },
  { id: 25, titulo: 'Earnings call transcript: GTT Q3 2026 (resumen de la conferencia; ventas del 3T previstas de unos 190 M)', editor: 'Investing.com', tipo: 'Prensa', fecha: '2026-10-23', url: 'https://www.investing.com/news/transcripts/earnings-call-transcript-gtt-q3-2026-order-surge-lifts-shares-33-93CH-4970160' },
];
// comparables: consenso y cuentas de Stock Analysis a 15-oct-2026, llevados al cierre del 23-oct con la variación de precio de Yahoo
// (PER y EV/ventas y EV/EBITDA escalados por el precio: aproximación; capitalización a euros con el BCE del 23-oct: SEK 11,1310, KRW 1.482,46)
// margen EBITDA = (EV/ventas) / (EV/EBITDA); crecimiento NTM ≈ 0,2 × crecimiento 2026e + 0,8 × crecimiento 2027e
const comparables = [
  { nombre: 'Technip Energies', ticker: 'TE', pais: 'FR', capitalizacion: 5318, ev_ventas: 0.31, ev_ebitda_ltm: 4.8, ev_ebitda_ntm: null, per_ntm: 12.9, crecimiento_pct: 14.6, margen_ebitda_pct: 6.3, roic_pct: 6.1, dn_ebitda: -6.1, fcf_yield_pct: 18.8 },
  { nombre: 'Wärtsilä', ticker: 'WRT1V', pais: 'FI', capitalizacion: 16272, ev_ventas: 2.10, ev_ebitda_ltm: 15.5, ev_ebitda_ntm: null, per_ntm: 23.0, crecimiento_pct: 3.7, margen_ebitda_pct: 13.5, roic_pct: null, dn_ebitda: -1.8, fcf_yield_pct: 8.3 },
  { nombre: 'Alfa Laval', ticker: 'ALFA', pais: 'SE', capitalizacion: 20136, ev_ventas: 3.39, ev_ebitda_ltm: 16.6, ev_ebitda_ntm: null, per_ntm: 24.2, crecimiento_pct: 10.9, margen_ebitda_pct: 20.4, roic_pct: 14.2, dn_ebitda: 1.2, fcf_yield_pct: 2.9 },
  { nombre: 'Samsung Heavy Industries', ticker: '010140', pais: 'KR', capitalizacion: 9822, ev_ventas: 1.16, ev_ebitda_ltm: 9.5, ev_ebitda_ntm: null, per_ntm: 12.7, crecimiento_pct: 16.2, margen_ebitda_pct: 12.2, roic_pct: 20.6, dn_ebitda: -0.7, fcf_yield_pct: 23.5 },
  { nombre: 'Hanwha Ocean', ticker: '042660', pais: 'KR', capitalizacion: 11902, ev_ventas: 1.41, ev_ebitda_ltm: 11.6, ev_ebitda_ntm: null, per_ntm: 8.5, crecimiento_pct: 2.8, margen_ebitda_pct: 12.1, roic_pct: 14.1, dn_ebitda: 2.4, fcf_yield_pct: 3.8 },
  { nombre: 'SBM Offshore', ticker: 'SBMO', pais: 'NL', capitalizacion: 5861, ev_ventas: 2.53, ev_ebitda_ltm: 8.1, ev_ebitda_ntm: null, per_ntm: 7.8, crecimiento_pct: -16.2, margen_ebitda_pct: 31.3, roic_pct: 12.9, dn_ebitda: 3.3, fcf_yield_pct: null },
];
const D = {
  _estado: 'completo',
  identificacion: {
    nombre: 'Gaztransport & Technigaz SA', nombre_corto: 'GTT', ticker: 'GTT', isin: 'FR0011726835', mercado: 'Euronext París (compartimento A)', indice_referencia: 'STOXX Europe 600 (SBF 120, CAC Next 20)',
    pais: 'Francia', pais_iso: 'FR', sector: 'Energía', industria: 'Equipos y servicios de petróleo y gas', sede: 'Saint-Rémy-lès-Chevreuse (Francia)', fundacion: '1994', empleados: 862, web: 'https://www.gtt.fr',
    precio: PRECIO, fecha_precio: FPRECIO, acciones: 37.08, capitalizacion_publicada: 7600, free_float_pct: 98.9,
    max_52s: BOLSA.identificacion.max_52s, min_52s: BOLSA.identificacion.min_52s, volumen_medio_diario: `≈ ${String(BOLSA.volumen_3m.importe_dia_millones).replace('.', ',')} M EUR/día (3 meses)`, proximos_resultados: '2027-02-24',
  },
  consenso: {
    guidance: 'Guía de 2026 publicada el 19-feb-2026 y confirmada el 28-jul y el 23-oct-2026 «pese a un contexto geopolítico incierto»: ingresos consolidados de 740-780 M EUR (803,0 M en 2025) y EBITDA de 490-530 M (541,8 M), con la política de dividendo (al menos el 80 % del beneficio) mantenida [21, 20, 19]. Con 570,1 M en 9M26, el rango pide 170-210 M en el 4T (182,8 M en el 3T); la dirección no quiso adelantar el 4T ni estrechar el rango [19, 25]. La cartera vale 1.800 M a 30-sep; a junio aseguraba 300 M en el 2S26, 655 M en 2027, 603 M en 2028 y 295 M en 2029 y después [19, 20]. No hay plan a medio plazo con cifras; la empresa estima unos 550 metaneros encargados en 2026-2035 y lo llama prudente [20, 25].',
    estimaciones: [
      { periodo: '2026e', ingresos: 766.8, ebitda: 516.4, ebit: 488.6, bpa: 11.23, dpa: 9.15, fuente: 'MarketScreener, 12 analistas (sin actualizar tras el 3T) [2]' },
      { periodo: '2027e', ingresos: 813.8, ebitda: 547.9, ebit: 518.9, bpa: 12.08, dpa: 9.72, fuente: 'MarketScreener, 12 analistas [2]' },
      { periodo: '2028e', ingresos: 898.8, ebitda: 610.1, ebit: 579.2, bpa: 13.40, dpa: 10.81, fuente: 'MarketScreener [2]' },
    ],
    recomendaciones: { n_analistas: 12, comprar: 9, mantener: 2, vender: 1, po_medio: 234.25, po_min: 184.0, po_max: 275.0 },
    revisiones: 'El consenso no se ha actualizado aún tras la actividad del 3T: MarketScreener mantiene ingresos de 767 M en 2026 y 814 M en 2027 y BPA de 11,23 y 12,08 EUR, y Stock Analysis (S&P Global, 12 analistas, puesto al día el 4-sep) da 768 M y 11,30 EUR en 2026 [2, 5]. El reparto de Investing era de 10 comprar, 1 mantener y 1 vender con objetivo medio de 232,08 EUR; el 26-oct Bernstein bajó a «performance de marché» y recortó su objetivo de 245 a 210 EUR, así que hoy quedan 9 comprar, 2 mantener y 1 vender, y el objetivo medio de MarketScreener (234,25) baja a unos 231 con el nuevo de Bernstein (estimación propia) [3, 22, 23]. En los tres meses anteriores los objetivos habían subido (UBS 230, Berenberg 245, Barclays 275); Morgan Stanley sigue en vender (183-184) [3, 5]. Las ventas del 3T (182,8 M) quedaron por debajo de los unos 190 M que esperaba el mercado según Investing [25, 24].',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    tipo_rentabilidad: BOLSA.bolsa.tipo_rentabilidad,
    rentabilidades: BOLSA.bolsa.rentabilidades,
    anual: BOLSA.bolsa.anual,
    beta: BOLSA.bolsa.beta, volatilidad_pct: BOLSA.bolsa.volatilidad_pct, max_drawdown_pct: BOLSA.bolsa.max_drawdown_pct, posicion_corta_pct: 2.7,
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: [
      { anio: '2020', precio_cierre: 79.2, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2021', precio_cierre: 82.25, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2022', precio_cierre: 99.8, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2023', precio_cierre: 119.9, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2024', precio_cierre: 128.6, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2025', precio_cierre: 156.6, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
    ],
    confianza: 'Alta',
  },
  comparables: {
    criterio: 'No hay otro licenciador cotizado de sistemas de contención: GTT es única. Se usan dos grupos con exposición al ciclo del GNL y del transporte marítimo, todos con consenso en Stock Analysis a 15-oct-2026 y precio llevado al cierre del 23-oct (la variación de cada acción en Yahoo; aproximación en los múltiplos de valor empresa) [1]: equipos y tecnología para energía y buques (Technip Energies, Wärtsilä, Alfa Laval, SBM Offshore) y los astilleros coreanos que construyen los metaneros (Samsung Heavy Industries y Hanwha Ocean) [9-14]. Se excluyen HD Korea Shipbuilding (holding con un PER de 4,8x distorsionado por plusvalías) y Kongsberg (su perímetro cambia con la escisión de la división marítima). Ninguno tiene ni el margen ni el capital invertido de GTT: son referencia de múltiplo, no de calidad.',
    empresas: comparables,
    confianza: 'Baja',
  },
  transacciones: {
    operaciones: [
      { fecha: '2024-07', objetivo: 'Negocio de tecnología y equipos de licuefacción de GNL de Air Products', comprador: 'Honeywell', ev: 1615, ev_ventas: null, ev_ebitda: 13.0, prima_pct: null, excluir: false, comentario: 'Tecnología de proceso de GNL con equipos propios (intercambiadores) [15]' },
      { fecha: '2025-03', objetivo: 'Sundyne (bombas y compresores criogénicos y de proceso)', comprador: 'Honeywell', ev: 1927, ev_ventas: null, ev_ebitda: 14.5, prima_pct: null, excluir: false, comentario: 'Equipos críticos con mucho posventa; múltiplo ajustado por impuestos [16]' },
      { fecha: '2025-07', objetivo: 'Chart Industries (equipos criogénicos y de GNL)', comprador: 'Baker Hughes', ev: 12134, ev_ventas: 3.24, ev_ebitda: 13.6, prima_pct: null, excluir: false, comentario: 'EV/EBITDA sobre el EBITDA ajustado de 2024 (cálculo propio: 13.600 / 1.000 M USD); unas 9 veces el EBITDA de 2025 con sinergias según el comprador [17]' },
      { fecha: '2025-07', objetivo: 'Danelec (registradores de datos de viaje)', comprador: 'GTT', ev: 194, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Pago neto en caja de 194,1 M EUR; GTT no publicó múltiplo [21]' },
    ],
    confianza: 'Media',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'consenso', campo: 'estimaciones del consenso posteriores a la actividad del 3T26', tipo: 'Complemento', intentos: '1) MarketScreener (estimaciones sin cambio frente al 16-oct); 2) Stock Analysis (actualizado el 4-sep); 3) Investing (reparto y objetivo del 4-sep) y prensa del 26-oct (solo el cambio de Bernstein)', decision: 'Omitido: se usa el consenso previo y se dice' },
    { seccion: 'comparables', campo: 'EV/EBITDA de los próximos 12 meses de los comparables', tipo: 'Complemento', intentos: '1) Stock Analysis (solo EBITDA de los últimos 12 meses); 2) MarketScreener (403 sin navegador); 3) informes de cada comparable (sin consenso de EBITDA en la misma base)', decision: 'Omitido' },
    { seccion: 'multiplos_historicos', campo: 'PER y EV/EBITDA adelantados publicados por un proveedor', tipo: 'Complemento', intentos: '1) MarketScreener (solo 2026-2027); 2) Stock Analysis (PER adelantado de cada cierre, sin fuente del BPA); 3) informes anuales (no publican múltiplos)', decision: 'Omitido' },
  ],
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const BF = 'https://www.boursorama.com/bourse/forum/1rPGTT/detail/';
const fE = [
  { id: 1, titulo: 'Foro de GTT en Boursorama: hilo «C’est vraiment la chute libre avec + de 13% de baisse à 178»', editor: 'Boursorama', tipo: 'Foros y redes', fecha: '2026-10-26', url: BF + '468600777/' },
  { id: 2, titulo: 'Foro de GTT en Boursorama: hilo «GTT confirme ses objectifs alors pourquoi l’action baisse ce matin?»', editor: 'Boursorama', tipo: 'Foros y redes', fecha: '2026-10-26', url: BF + '468600754/' },
  { id: 3, titulo: 'Foro de GTT en Boursorama: hilo «RESULTATS» (comunicado del 3T y debate de la noche del 23-oct)', editor: 'Boursorama', tipo: 'Foros y redes', fecha: '2026-10-23', url: BF + '468597625/' },
  { id: 4, titulo: 'Foro de GTT en Boursorama: hilo «Pourquoi une telle baisse ?»', editor: 'Boursorama', tipo: 'Foros y redes', fecha: '2026-10-19', url: BF + '468578029/' },
  { id: 5, titulo: 'Foro de GTT en Boursorama: hilo «Estimation CA de GTT sur les 5 prochaines années ?»', editor: 'Boursorama', tipo: 'Foros y redes', fecha: '2026-10-16', url: BF + '468571228/' },
  { id: 6, titulo: 'Foro de GTT en Boursorama: hilos «Update positions short» y «Hengli Dalian», leídos para el informe del 16-oct', editor: 'Boursorama', tipo: 'Foros y redes', fecha: '2026-10-16', url: BF + '468568438/' },
  { id: 7, titulo: 'GTT : le creux des commandes de 2025 pèse sur les comptes, mais les perspectives restent intactes', editor: 'ABC Bourse', tipo: 'Prensa', fecha: '2026-10-26', url: 'https://www.abcbourse.com/analyses/gtt_le_creux_des_commandes_de_2025_pese_sur_les_comptes_mais_les_perspectives_restent_intactes-7162' },
];
const E = {
  _estado: 'completo',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Empeora',
    revisadas: [
      { plataforma: 'Boursorama (foro de GTT): la caída del 26-oct', fecha: '2026-10', n_comentarios: 15, tono: 'Dividido', resumen: 'Unos cuentan que compran o refuerzan entre 176 y 181 EUR y recuerdan el dividendo a cuenta de diciembre; otros preguntan si bajará de 170 y culpan a las posiciones cortas [1].' },
      { plataforma: 'Boursorama: por qué baja si confirma la guía', fecha: '2026-10', n_comentarios: 21, tono: 'Dividido', resumen: 'Debate entre quienes ven el valor caro (PER de 17, tipos al alza, expectativas altas tras los pedidos) y quienes ven una ocasión por el monopolio; algunos añaden la salida del presidente como motivo [2].' },
      { plataforma: 'Boursorama: hilo de resultados del 23-oct', fecha: '2026-10', n_comentarios: 15, tono: 'Neutro', resumen: 'Antes de la apertura, la mayoría leía los datos como esperados por la cartera y veía alcanzable la guía; una minoría anticipaba una caída fuerte por las posiciones cortas [3].' },
      { plataforma: 'Boursorama: caída de la semana anterior y previsiones de ventas', fecha: '2026-10', n_comentarios: 20, tono: 'Positivo', resumen: 'Accionistas antiguos compraban por debajo de 210 EUR y discutían ventas cercanas a 1.000 M en 2-3 años con más de 90 metaneros encargados en 2026 [4, 5].' },
    ],
    temas: [
      { tema: 'Monopolio y cartera de pedidos frente a la caída', postura: 'Alcista', peso: 'Alto', contraste: 'La cartera respalda los ingresos de 2027-2028 (655 y 603 M a junio, 1.800 M en total a septiembre), pero el 3T (−13,3 %) muestra que el valle de 2025 todavía pesa en 2026 [7].' },
      { tema: 'Valoración exigente', postura: 'Bajista', peso: 'Medio', contraste: 'Con razón en parte: antes de la caída cotizaba a unas 17 veces el beneficio esperado, por encima de su mediana adelantada de 5 años [7].' },
      { tema: 'Posiciones cortas', postura: 'Bajista', peso: 'Medio', contraste: 'Las cortas declaradas en la AMF suman en torno al 2,7 % del capital; no hay un informe bajista publicado y explican poco una caída del 13 % en un día [1, 3].' },
      { tema: 'Cambio de presidente', postura: 'Dividida', peso: 'Bajo', contraste: 'Es una sucesión prevista (la nueva presidenta es consejera desde 2021), pero suma tres cambios en la cúpula en 24 meses [2].' },
    ],
    confianza: 'Baja',
  },
  fuentes: fE,
  huecos: [
    { seccion: 'sentimiento', campo: 'foros en inglés (Reddit, Seeking Alpha, Stocktwits)', tipo: 'Complemento', intentos: '1) Seeking Alpha (RSS de GTTOF sin entradas, comprobado el 16-oct); 2) Reddit (403 en este entorno); 3) Stocktwits (sin flujo de GTT.PA)', decision: 'Omitido' },
  ],
};
guarda('E', E);
console.log('Notas A-E escritas en', dir);
