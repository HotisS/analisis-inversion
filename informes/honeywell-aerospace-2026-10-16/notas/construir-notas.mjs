// Escribe las notas A-E de Honeywell Aerospace (HONA, corte 2026-10-16) con los estados combinados (carve-out) auditados
// del S-4 de jul-2026 (2023-2025), el 10-Q y la nota de prensa del 2T26, el 8-K de cierre de la escisión (datos trimestrales
// 2024-2025), el folleto informativo final (8-K 15-jun-2026), los 10-K de Honeywell (segmento Aerospace 2018-2022),
// form4.mjs, bolsa.mjs, MarketScreener, Stock Analysis y foros. Cada nota cita solo con [n] de su propia lista.
// Ejecutar: node informes/honeywell-aerospace-2026-10-16/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const BOLSA = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const E = 'https://www.sec.gov/Archives/edgar/data/2089271';
const EH = 'https://www.sec.gov/Archives/edgar/data/773840';
const ACC = 317.0; // acciones repartidas en la escisión (316,94 M) y en circulación a 25-jul-2026 (316,95 M)

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Form S-4 (oferta de canje de bonos): estados combinados auditados 2023-2025 (Deloitte), información pro forma, capitalización y notas', editor: 'Honeywell Aerospace Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-07-06', url: `${E}/000119312526296207/d132076ds4.htm` },
  { id: 2, titulo: 'Form 10-Q del 2T26 (trimestre cerrado el 27-jun-2026): estados combinados, deuda, contingencias, segmentos y hechos posteriores', editor: 'Honeywell Aerospace Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-05', url: `${E}/000208927126000021/hona-20260627.htm` },
  { id: 3, titulo: 'Honeywell Aerospace reports second quarter results; updates 2026 outlook (8-K, anexo 99.1)', editor: 'Honeywell Aerospace Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-05', url: `${E}/000208927126000020/exhibit991q22026earningsre.htm` },
  { id: 4, titulo: 'Información trimestral complementaria 2024-2025 (8-K de cierre de la escisión, anexo 99.1)', editor: 'Honeywell Aerospace Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-06-29', url: `${E}/000162828026045874/exhibit991-closing8xk.htm` },
  { id: 5, titulo: 'Folleto informativo final (Information Statement), 8-K del 15-jun-2026, anexo 99.1', editor: 'Honeywell Aerospace Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-06-15', url: `${E}/000162828026043193/exhibit991-informationstat.htm` },
  { id: 6, titulo: 'Honeywell International, Form 10-K 2022 (segmento Aerospace 2020-2022)', editor: 'Honeywell International / SEC EDGAR', tipo: 'Primaria', fecha: '2023-02-10', url: `${EH}/000077384023000013/hon-20221231.htm` },
  { id: 7, titulo: 'Honeywell International, Form 10-K 2020 (segmento Aerospace 2018-2020)', editor: 'Honeywell International / SEC EDGAR', tipo: 'Primaria', fecha: '2021-02-12', url: `${EH}/000077384021000015/hon-20201231.htm` },
  { id: 8, titulo: 'Registro confidencial del Form 10 (DRS), estados combinados 2023-2024 con el perímetro anterior', editor: 'Honeywell Aerospace LLC / SEC EDGAR', tipo: 'Primaria', fecha: '2025-10-01', url: `${E}/000162827925000665/filename2.htm` },
];

const cuenta = [
  // Estados combinados auditados (carve-out). Sin deuda ni intereses atribuidos antes de la escisión. BPA sobre 317 M de acciones (criterio de la propia empresa para los periodos anteriores).
  { periodo: '2023', ingresos: 13790, coste_ventas: 8507, gastos_generales: 1213, ebitda: 3773, amortizaciones: 302, ebit: 3471, resultado_financiero: 0, bai: 3471, impuestos: 557, minoritarios: 28, beneficio_neto: 2886, gastos_financieros: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 9.10, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: ACC },
  { periodo: '2024', ingresos: 15445, coste_ventas: 9943, gastos_generales: 1426, ebitda: 3714, amortizaciones: 346, ebit: 3368, resultado_financiero: 0, bai: 3368, impuestos: 519, minoritarios: 32, beneficio_neto: 2817, gastos_financieros: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 8.89, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: ACC },
  { periodo: '2025', ingresos: 17404, coste_ventas: 11341, gastos_generales: 1670, ebitda: 3761, amortizaciones: 412, ebit: 3349, resultado_financiero: 0, bai: 3349, impuestos: 627, minoritarios: 35, beneficio_neto: 2687, gastos_financieros: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 330, bpa: 8.48, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: ACC },
];

const A = {
  _estado: 'Completo con tres ejercicios: solo hay estados combinados auditados de 2023-2025 (S-4 y folleto); 2018-2022 solo como segmento de Honeywell (ventas y beneficio de segmento, en el texto). LTM a junio de 2026 con el 10-Q del 2T26.',
  negocio: {
    segmentos: [
      { nombre: 'Electronic Solutions', descripcion: 'Aviónica, navegación, comunicaciones por satélite, radares y electrónica de defensa (con CAES y Civitanavi).', tipo_resultado: 'EBIT', historico: [{ periodo: '2023', ingresos: 5098, resultado: 1580 }, { periodo: '2024', ingresos: 6025, resultado: 1912 }, { periodo: '2025', ingresos: 6816, resultado: 1988 }] },
      { nombre: 'Engines & Power Systems', descripcion: 'Motores auxiliares (APU), motores de aviación de negocios (HTF7000, TFE731), motores de helicóptero y defensa, y sus reparaciones.', tipo_resultado: 'EBIT', historico: [{ periodo: '2023', ingresos: 4595, resultado: 1021 }, { periodo: '2024', ingresos: 4731, resultado: 692 }, { periodo: '2025', ingresos: 5411, resultado: 691 }] },
      { nombre: 'Control Systems', descripcion: 'Control ambiental y de presión de cabina, control de motor, frenos y ruedas, sensores y actuadores.', tipo_resultado: 'EBIT', historico: [{ periodo: '2023', ingresos: 4097, resultado: 1267 }, { periodo: '2024', ingresos: 4689, resultado: 1226 }, { periodo: '2025', ingresos: 5177, resultado: 1523 }] },
      { nombre: 'Corporativo y otros', descripcion: 'Costes centrales no asignados.', tipo_resultado: 'EBIT', historico: [{ periodo: '2023', ingresos: 0, resultado: -93 }, { periodo: '2024', ingresos: 0, resultado: -122 }, { periodo: '2025', ingresos: 0, resultado: -117 }] },
    ],
    geografias: [
      { nombre: 'Estados Unidos (incluye exportaciones por 4.665 M)', peso_pct: 73.2 },
      { nombre: 'Suiza (centro comercial internacional)', peso_pct: 15.2 },
      { nombre: 'Resto de Europa, Oriente Medio, África e India', peso_pct: 2.3 },
      { nombre: 'Resto del mundo', peso_pct: 9.3 },
    ],
    geografias_criterio: 'origen',
    kpis: [
      { kpi: 'Cartera de pedidos (backlog)', valor_anterior: '16.600 M USD (2T25)', valor_actual: '18.154 M USD (2T26)', variacion: '+9 %', comentario: 'Pedidos de 12 meses +8 %, tirados por defensa y espacio [3].' },
      { kpi: 'Ventas de posventa comercial', valor_anterior: '7.146 M USD (2024)', valor_actual: '7.661 M USD (2025)', variacion: '+7 % (+11 % sin el acuerdo Flexjet)', comentario: '44 % de las ventas; 2T26 +8 % [4, 3].' },
      { kpi: 'Ventas de defensa y espacio', valor_anterior: '6.138 M USD (2024)', valor_actual: '7.149 M USD (2025)', variacion: '+16 %', comentario: 'Con CAES desde jul-2024; 2T26 solo +3 % por suministro internacional y el fin de un programa restringido [4, 3].' },
      { kpi: 'Ventas de equipo original comercial', valor_anterior: '2.161 M USD (2024)', valor_actual: '2.594 M USD (2025)', variacion: '+20 %', comentario: '2024 rebajado en 372 M por el acuerdo con Bombardier [4].' },
      { kpi: 'Ventas al Gobierno de EE. UU.', valor_anterior: '4.143 M USD (2024)', valor_actual: '4.604 M USD (2025)', variacion: '+11 %', comentario: '26 % de las ventas; 4.129 M al Departamento de Guerra [5].' },
      { kpi: 'Retrofits, modificaciones y mejoras (RMU)', valor_anterior: 'n.d.', valor_actual: '1.600 M USD (2025)', variacion: '≈ +18 % anual desde 2021', comentario: '9 % de las ventas [5].' },
    ],
  },
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-27', ingresos: 17915, ebitda: 3256, ebit: 2823, beneficio_neto: 1946, bpa: 6.14, dpa: 0, dpa_extraordinario: 0, fcf: 2496, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 835 },
    cambios_perimetro: [
      { periodo: '2024', descripcion: 'CAES (1.900 M USD, cerrada en jul-2024) y Civitanavi (2024): +332 M de ventas en 2024 y ≈ +3 puntos de crecimiento en 2025 [1].' },
      { periodo: '2026', descripcion: 'Escisión del 29-jun-2026: deuda de 16.006 M USD emitida en mar-2026, 15.087 M transferidos a Honeywell; activo neto de pensiones de 2.727 M y pasivos fiscales diferidos transferidos al cierre [2, 1].' },
    ],
  },
  trimestres: {
    items: [
      { periodo: '3T24', ingresos: 3876, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 2.30, vs_consenso: null },
      { periodo: '4T24', ingresos: 4027, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 1.78, vs_consenso: null },
      { periodo: '1T25', ingresos: 4074, crecimiento_pct: 10.0, crecimiento_organico_pct: 5.0, ebitda: 1035, margen_ebitda_pct: 25.4, bpa: 2.45, vs_consenso: null },
      { periodo: '2T25', ingresos: 4289, crecimiento_pct: 11.7, crecimiento_organico_pct: 7.0, ebitda: 1110, margen_ebitda_pct: 25.9, bpa: 2.66, vs_consenso: null },
      { periodo: '3T25', ingresos: 4533, crecimiento_pct: 17.0, crecimiento_organico_pct: 14.0, ebitda: null, margen_ebitda_pct: null, bpa: 2.03, vs_consenso: null },
      { periodo: '4T25', ingresos: 4508, crecimiento_pct: 11.9, crecimiento_organico_pct: 20.0, ebitda: null, margen_ebitda_pct: null, bpa: 1.33, vs_consenso: null },
      { periodo: '1T26', ingresos: 4352, crecimiento_pct: 6.8, crecimiento_organico_pct: null, ebitda: 940, margen_ebitda_pct: 21.6, bpa: 2.00, vs_consenso: null },
      { periodo: '2T26', ingresos: 4522, crecimiento_pct: 5.4, crecimiento_organico_pct: 5.0, ebitda: 700, margen_ebitda_pct: 15.5, bpa: 0.78, vs_consenso: 'Inferior' },
    ],
    confianza: 'Alta',
  },
  balance: {
    historico: [
      { periodo: '2024', activo_total: 16845, activo_corriente: 7670, pasivo_corriente: 5819, pasivo_total: 8017, fondo_comercio: 3028, intangibles: 2135, inmovilizado_material: 2033, existencias: 3889, clientes: 2019, proveedores: 2667, activos_contrato: 1210, pasivos_contrato: 2401, caja: 244, deuda_financiera: 0, arrendamientos: 0, patrimonio_neto: 8736, minoritarios: 92, reservas: null },
      { periodo: '2025', activo_total: 17685, activo_corriente: 8390, pasivo_corriente: 6577, pasivo_total: 9189, fondo_comercio: 3025, intangibles: 2177, inmovilizado_material: 2101, existencias: 4311, clientes: 2156, proveedores: 2883, activos_contrato: 1366, pasivos_contrato: 2680, caja: 213, deuda_financiera: 9, arrendamientos: 0, patrimonio_neto: 8399, minoritarios: 97, reservas: null },
    ],
    vencimientos: [
      { anio: '2027', importe: 4 }, { anio: '2028', importe: 1251 }, { anio: '2029', importe: 1751 }, { anio: '2030', importe: 0 }, { anio: '2031', importe: 2000 }, { anio: '2032+', importe: 11000 },
    ],
    liquidez: 'Caja de 1.057 M USD (27-jun-2026) + líneas de crédito no dispuestas de 4.000 M (3.000 M a cinco años y 1.000 M a 364 días, sin covenants financieros) + programa de pagarés de 4.000 M (respaldado por las líneas) [2].',
    rating: 'S&P BBB+ (perspectiva positiva), Fitch A- (estable), Moody\'s A3 (estable), a 28-mar-2026 [5].',
    coste_deuda_pct: 5.1,
    vida_media_anios: 15.6,
    confianza: 'Alta',
  },
  flujos: {
    historico: [
      { periodo: '2023', flujo_operativo: 2984, capex: 387, pagos_arrendamientos: 0, adquisiciones: 0, desinversiones: 0, dividendos: 0, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
      { periodo: '2024', flujo_operativo: 2538, capex: 488, pagos_arrendamientos: 0, adquisiciones: 2130, desinversiones: 0, dividendos: 0, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
      { periodo: '2025', flujo_operativo: 3705, capex: 504, pagos_arrendamientos: 0, adquisiciones: 0, desinversiones: 0, dividendos: 0, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
    ],
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'Deloitte & Touche LLP (Tempe, Arizona)',
    anios_auditor: 1,
    opinion: 'Favorable (estados combinados 2023-2025), con párrafo de énfasis: los estados se derivan de la contabilidad de Honeywell y pueden no reflejar una empresa independiente; cuestiones clave de auditoría: integridad de los ajustes de carve-out y pasivos medioambientales [1].',
    confianza: 'Media',
  },
  fuentes: fA,
  huecos: [
    { seccion: 'financieros', campo: 'Cuenta, balance y flujos de 2019-2022 (cinco ejercicios)', tipo: 'Núcleo', intentos: '1) Folleto informativo y S-4: solo estados combinados auditados de 2023-2025 (balance de 2024-2025); 2) registro confidencial (DRS) del Form 10 (oct-2025): 2023-2024 con otro perímetro; 3) 10-K de Honeywell 2020 y 2022: solo ventas, beneficio de segmento, amortizaciones y capex del segmento Aerospace, no comparables con la cuenta del carve-out', decision: 'Omitido' },
    { seccion: 'balance', campo: 'Balance de 2023', tipo: 'Complemento', intentos: '1) S-4 y folleto (solo 2024-2025); 2) DRS de oct-2025 (solo 2024); 3) 10-K de Honeywell (no publica balance por segmento)', decision: 'Omitido' },
  ],
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Global Fleet and MRO Market Forecast 2026-2036, resumen ejecutivo', editor: 'Oliver Wyman (publicado por ARSA)', tipo: 'Sectorial', fecha: '2026-03', url: 'https://arsa.org/wp-content/uploads/2026/03/ARSA-OW-2026FleetMROMarketReport-ExecSum-2026.pdf' },
  { id: 2, titulo: 'Trends in World Military Expenditure, 2025 (nota de prensa)', editor: 'SIPRI', tipo: 'Sectorial', fecha: '2026-04-27', url: 'https://www.sipri.org/media/press-release/2026/world-military-expenditure' },
  { id: 3, titulo: 'Folleto informativo final de Honeywell Aerospace (negocio, competencia, clientes, regulación)', editor: 'Honeywell Aerospace Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-06-15', url: `${E}/000162828026043193/exhibit991-informationstat.htm` },
  { id: 4, titulo: 'GE Aerospace: estadísticas y previsiones', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/ge/statistics/' },
  { id: 5, titulo: 'RTX: estadísticas y previsiones', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/rtx/statistics/' },
  { id: 6, titulo: 'Safran: estadísticas y previsiones', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://stockanalysis.com/quote/epa/SAF/statistics/' },
  { id: 7, titulo: 'TransDigm: estadísticas y previsiones', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/tdg/statistics/' },
  { id: 8, titulo: 'Woodward: estadísticas y previsiones', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/wwd/statistics/' },
  { id: 9, titulo: 'HEICO: estadísticas y previsiones', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/hei/statistics/' },
  { id: 10, titulo: 'Honeywell International, Form 10-K 2020 (segmento Aerospace 2018-2020: caída de 2020)', editor: 'Honeywell International / SEC EDGAR', tipo: 'Primaria', fecha: '2021-02-12', url: `${EH}/000077384021000015/hon-20201231.htm` },
];
const B = {
  _estado: 'Completo. Sin cuotas de mercado publicadas con el perímetro de la empresa: cuota a mano con el gasto MRO de Oliver Wyman y el gasto de defensa de SIPRI.',
  competencia: {
    competidores: [
      { nombre: 'RTX (Collins Aerospace, Pratt & Whitney)', pais: 'EE. UU.', ticker: 'RTX', ingresos: 93500, cuota_pct: null, margen_ebit_pct: null, comentario: 'El rival directo en aviónica, control ambiental, frenos y APU de Pratt & Whitney Canada; EBITDA del 17,0 % del grupo [5].' },
      { nombre: 'Safran', pais: 'Francia', ticker: 'SAF', ingresos: 37630, cuota_pct: null, margen_ebit_pct: null, comentario: 'Equipos y sistemas (trenes, frenos, potencia eléctrica, cableado) además de motores; EBITDA del 18,2 % (33.570 M EUR LTM convertidos a 1,1208) [6].' },
      { nombre: 'GE Aerospace', pais: 'EE. UU.', ticker: 'GE', ingresos: 50640, cuota_pct: null, margen_ebit_pct: 20.2, comentario: 'Motores y sistemas de aviónica y potencia (antigua GE Aviation Systems); compite en posventa de motores y en sistemas [4].' },
      { nombre: 'TransDigm', pais: 'EE. UU.', ticker: 'TDG', ingresos: 10010, cuota_pct: null, margen_ebit_pct: null, comentario: 'Componentes propietarios con posventa en exclusiva; EBITDA del 50,9 %: el techo de rentabilidad del sector [7].' },
      { nombre: 'HEICO', pais: 'EE. UU.', ticker: 'HEI', ingresos: 5180, cuota_pct: null, margen_ebit_pct: null, comentario: 'Repuestos alternativos certificados (PMA) que compiten en precio con los del fabricante original; EBITDA del 28,5 % [9].' },
      { nombre: 'Woodward', pais: 'EE. UU.', ticker: 'WWD', ingresos: 4190, cuota_pct: null, margen_ebit_pct: null, comentario: 'Control de combustible y actuadores; EBITDA del 19,2 % [8].' },
    ],
    confianza: 'Media',
  },
  fuentes: fB,
};
guarda('B', B);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Folleto informativo final: directivos, consejo, remuneración (2023-2025) y accionistas previstos', editor: 'Honeywell Aerospace Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-06-15', url: `${E}/000162828026043193/exhibit991-informationstat.htm` },
  { id: 2, titulo: 'Form 8-K de cierre de la escisión (consejo, comisiones, directivos, estatutos)', editor: 'Honeywell Aerospace Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-06-29', url: `${E}/000162828026045874/hona-20260625.htm` },
  { id: 3, titulo: 'Form 8-K del 5-ago-2026 (resultados, recompra de 3.500 M y concesión puente de 9 M al consejero delegado)', editor: 'Honeywell Aerospace Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-05', url: `${E}/000208927126000020/hona-20260723.htm` },
  { id: 4, titulo: 'Form 4 presentados desde el 29-jun-2026 (herramientas/form4.mjs)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-16', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0002089271&type=4' },
  { id: 5, titulo: 'Honeywell Aerospace Inc. agrees to pay over $2M to settle False Claims Act allegations (ciberseguridad)', editor: 'Departamento de Justicia de EE. UU.', tipo: 'Primaria', fecha: '2026-09-01', url: 'https://justice.gov/opa/pr/honeywell-aerospace-inc-agrees-pay-over-2m-settle-false-claims-act-allegations-failing' },
  { id: 6, titulo: 'Aviso de demanda colectiva Green v. Honeywell Aerospace (D. Arizona, 26-cv-06779)', editor: 'Kahn Swick & Foti (nota de bufete demandante)', tipo: 'Prensa', fecha: '2026-10-10', url: 'https://placera.se/pressmeddelanden/honeywell-aerospace-inc-notice-of-november-23-2026-application-deadline-for-class-action-lawsuit-contact-lewis-kahn-esq-at-kahn-swick-foti-llc-before-application-deadline-20261010' },
  { id: 7, titulo: 'Nota de prensa del 2T26 (guía de 2026 anterior y revisada)', editor: 'Honeywell Aerospace Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-05', url: `${E}/000208927126000020/exhibit991q22026earningsre.htm` },
  { id: 8, titulo: 'Información trimestral complementaria 2024-2025 (crecimiento orgánico de 2025)', editor: 'Honeywell Aerospace Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-06-29', url: `${E}/000162828026045874/exhibit991-closing8xk.htm` },
];
const C = {
  _estado: 'Completo salvo votos en junta (la primera junta será en 2027) y remuneración de 2026 como empresa independiente (sin proxy todavía).',
  directivos: {
    equipo: [
      { nombre: 'James (Jim) Currier', cargo: 'Presidente y consejero delegado', desde: '2023', participacion_pct: 0.01, trayectoria: 'En Honeywell Aerospace desde 2006 (antes, motores de cohete en United Technologies); consejero delegado del segmento desde ago-2023. Con él, ventas de 13.790 M (2023) a 17.404 M (2025) y beneficio de segmento ajustado de 3.775 M a 4.458 M, pero recorte de la guía de 2026 cinco semanas después de la escisión [1, 7].' },
      { nombre: 'Joshua Jepsen', cargo: 'Director financiero', desde: '2026', participacion_pct: 0.0, trayectoria: 'Director financiero de Deere & Company de sep-2022 a ene-2026 (antes, relaciones con inversores); en Honeywell Aerospace desde feb-2026 [1].' },
      { nombre: 'Craig Arnold', cargo: 'Presidente no ejecutivo', desde: '2026', participacion_pct: 0.0, trayectoria: 'Presidente y consejero delegado de Eaton de 2016 a 2025, donde llevó el margen de segmentos por encima del 20 % y la cotización a máximos; compró 6.400 acciones a 156 USD (998.400 USD) el 1-sep-2026 [1, 4].' },
      { nombre: 'Robert Buddecke', cargo: 'Consejero delegado de Electronic Solutions', desde: '2024', participacion_pct: 0.0, trayectoria: '28 años en Honeywell; vicepresidente de cadena de suministro integrada del segmento en 2022-2024 [1].' },
      { nombre: 'David Marinick', cargo: 'Consejero delegado de Engines & Power Systems', desde: '2020', participacion_pct: 0.0, trayectoria: '37 años en Honeywell; su segmento bajó el margen de 22 % (2023) a 13 % (2025, 20 % sin Flexjet) y 12 % en el 2T26 [1, 7].' },
      { nombre: 'Richard DeGraff', cargo: 'Consejero delegado de Control Systems', desde: '2023', participacion_pct: 0.0, trayectoria: 'Volvió a Honeywell en 2023 tras tres años en Salesforce; margen de su segmento del 29 % en 2025 y el 2T26 [1, 7].' },
    ],
    historial_guidance: [
      { anio: '2025', guia: 'Como segmento de Honeywell: crecimiento orgánico alto de un dígito o bajo de dos (guía de grupo)', real: 'Crecimiento orgánico del 12 % y beneficio de segmento ajustado de 4.458 M', cumplida: 'Sí' },
      { anio: '2026', guia: 'Crecimiento orgánico del 7-9 %, EBIT ajustado pro forma de 4.650-4.750 M (guía del folleto, jun-2026)', real: 'Rebajada el 5-ago-2026 a 4-5 % y 4.350-4.450 M; flujo libre del 2S26 mantenido en 1.000-1.500 M', cumplida: 'No' },
    ],
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Craig Arnold', cargo: 'Presidente', tipo: 'Independiente', desde: '2026', comisiones: 'Supervisión de programas especiales (presidente)' },
      { nombre: 'James Currier', cargo: 'Consejero delegado', tipo: 'Ejecutivo', desde: '2026', comisiones: 'Supervisión de programas especiales' },
      { nombre: 'William Ayer', cargo: 'Consejero', tipo: 'Independiente', desde: '2026', comisiones: 'Nombramientos y gobierno (presidente); retribuciones' },
      { nombre: 'D. Scott Davis', cargo: 'Consejero', tipo: 'Independiente', desde: '2026', comisiones: 'Retribuciones; nombramientos y gobierno' },
      { nombre: 'David Denton', cargo: 'Consejero', tipo: 'Independiente', desde: '2026', comisiones: 'Retribuciones (presidente); auditoría' },
      { nombre: 'Pascal Desroches', cargo: 'Consejero', tipo: 'Independiente', desde: '2026', comisiones: 'Auditoría (presidente); retribuciones' },
      { nombre: 'Deborah Flint', cargo: 'Consejera', tipo: 'Independiente', desde: '2026', comisiones: 'Retribuciones; nombramientos y gobierno' },
      { nombre: 'Gral. (ret.) David Goldfein', cargo: 'Consejero', tipo: 'Independiente', desde: '2026', comisiones: 'Nombramientos y gobierno; programas especiales' },
      { nombre: 'Mark Reuss', cargo: 'Consejero', tipo: 'Independiente', desde: '2026', comisiones: 'Auditoría; programas especiales' },
      { nombre: 'Dr. William B. Roper Jr.', cargo: 'Consejero', tipo: 'Independiente', desde: '2026', comisiones: 'Auditoría; programas especiales' },
      { nombre: 'Michelle Seitz', cargo: 'Consejera', tipo: 'Independiente', desde: '2026', comisiones: 'Auditoría; nombramientos y gobierno' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: true, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 6.39, fijo: 0.83, variable_corto: 1.16, variable_largo: 4.00, ratio_salario_medio: null },
    accionistas: [
      { nombre: 'Vanguard', pct: 7.51, tipo: 'Gestora indexada', variacion: 'Estimación del folleto con su posición en Honeywell (13G de abr-2026); presentó 13G propio en jul-2026' },
      { nombre: 'BlackRock', pct: 6.68, tipo: 'Gestora', variacion: 'Estimación del folleto con su 13G/A en Honeywell de ene-2024' },
    ],
    insiders: [
      { fecha: '2026-09-01', persona: 'Craig Arnold (presidente)', operacion: 'Compra', acciones: 6400, importe: 1.0 },
      { fecha: '2026-08-03', persona: 'James Currier (consejero delegado)', operacion: 'Venta', acciones: 650, importe: 0.14 },
    ],
    alertas: [
      'Recorte de la guía de 2026 el 5-ago-2026, cinco semanas después de la escisión y dos meses después del día del inversor (3-jun) en el que se fijaron los objetivos de 2030 [7].',
      'Demanda colectiva de valores (Green v. Honeywell Aerospace, D. Arizona, periodo 29-jun a 1-sep-2026) por no informar de restricciones de proveedores y de una investigación de la Ley de Reclamaciones Falsas [6].',
      'Acuerdo con el Departamento de Justicia por 2,04 M USD (1-sep-2026) por incumplimientos de ciberseguridad NIST SP 800-171 en un contrato de defensa de 2020-2023, sin admisión de responsabilidad [5].',
      'Consejo escalonado hasta la junta de 2030 y destitución de consejeros solo con causa y mayoría de 2/3 hasta entonces [2].',
      'Pago a Honeywell de 1.125 M USD por la licencia de la marca en menos de cinco años (18,75 M al mes), más acuerdos de servicios transitorios de hasta dos años [2].',
    ],
    confianza: 'Media',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'Votos de remuneración y de la cúpula en junta', tipo: 'Complemento', intentos: '1) EDGAR: sin DEF 14A (la primera junta será en 2027); 2) folleto informativo: sin votos propios; 3) votos de Honeywell: no aplican a la nueva sociedad', decision: 'Omitido' },
    { seccion: 'gobierno', campo: 'Ratio de la remuneración del consejero delegado sobre el salario medio', tipo: 'Complemento', intentos: '1) Folleto: no la publica para la nueva empresa; 2) proxy de Honeywell 2026: es la del grupo; 3) cálculo con gasto de personal: el carve-out no lo desglosa', decision: 'Omitido' },
  ],
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de HONA, SPY e ITA (herramientas/bolsa.mjs y movimiento.mjs)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/quote/HONA/history' },
  { id: 2, titulo: 'Honeywell Aerospace: consenso (17 analistas, objetivo medio, alto y bajo, cambios de objetivo jul-oct 2026)', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-15', url: 'https://www.marketscreener.com/quote/stock/HONEYWELL-AEROSPACE-INC-209671119/consensus/' },
  { id: 3, titulo: 'Honeywell Aerospace: estimaciones 2026-2028 (ventas, EBITDA, EBIT, beneficio, BPA, dividendo, deuda neta)', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-15', url: 'https://www.marketscreener.com/quote/stock/HONEYWELL-AEROSPACE-INC-209671119/finances/' },
  { id: 4, titulo: 'Honeywell Aerospace: previsiones (ventas y BPA 2026, 17 analistas, recomendaciones)', editor: 'Stock Analysis', tipo: 'Analistas', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/hona/forecast/' },
  { id: 5, titulo: 'Honeywell Aerospace: estadísticas (capitalización, valor empresa, acciones, posición corta)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/hona/statistics/' },
  { id: 6, titulo: 'Comparables: estadísticas y previsiones de GE, RTX, TDG, HEI, HWM, WWD, CW y SAF', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/ge/statistics/' },
  { id: 7, titulo: 'Tipos de cambio de referencia del euro (15-oct-2026)', editor: 'Banco Central Europeo', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml' },
  { id: 8, titulo: 'Rentabilidad del bono del Tesoro a 10 años (DGS10)', editor: 'FRED, Reserva Federal de San Luis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://fred.stlouisfed.org/series/DGS10' },
  { id: 9, titulo: 'Implied ERP by month (ERPbymonth.xlsx)', editor: 'Aswath Damodaran, NYU Stern', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 10, titulo: 'Honeywell Aerospace Set to Join S&P 500 & S&P 100', editor: 'S&P Dow Jones Indices', tipo: 'Primaria', fecha: '2026-06-23', url: 'https://press.spglobal.com/2026-06-23-Honeywell-Aerospace-Set-to-Join-S-P-500-S-P-100-Others-to-Join-S-P-MidCap-400-and-S-P-SmallCap-600' },
  { id: 11, titulo: 'Honeywell to Acquire CAES to Enhance Defense Technologies (≈ 14x el EBITDA estimado de 2024 ajustado por impuestos)', editor: 'Honeywell International', tipo: 'Primaria', fecha: '2024-06-20', url: 'https://www.honeywell.com/us/en/news/press-releases/2024/06/honeywell-to-acquire-caes-to-enhance-defense-technologies-across-land-sea-air-space' },
  { id: 12, titulo: 'Kaman to be acquired by Arcline for $1.8 billion (16x EBITDA LTM)', editor: 'PE Professional', tipo: 'Prensa', fecha: '2024-01-19', url: 'https://peprofessional.com/2024/01/kaman-to-be-acquired-by-arcline-for-1-8-billion/' },
  { id: 13, titulo: 'TransDigm completes acquisition of the Simmonds Precision Products business (≈ 765 M USD; ≈ 350 M de ventas 2025)', editor: 'Airframer / TransDigm', tipo: 'Prensa', fecha: '2025-10', url: 'https://www.airframer.com/news/release/transdigm-completes-acquisition-of-the-simmonds-precision-products-inc-business' },
  { id: 14, titulo: 'Honeywell Aerospace to release third quarter financial results on Wednesday, October 28', editor: 'Honeywell Aerospace (vía Finviz)', tipo: 'Primaria', fecha: '2026-09-29', url: 'https://finviz.com/news/396372/honeywell-aerospace-to-release-third-quarter-financial-results-and-hold-its-investor-conference-call-on-wednesday-october-28' },
  { id: 15, titulo: 'Form 10-Q del 2T26 (balance a 27-jun-2026: deuda, caja, minoritarios, pasivos medioambientales, intereses devengados)', editor: 'Honeywell Aerospace Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-05', url: `${E}/000208927126000021/hona-20260627.htm` },
  { id: 16, titulo: 'Form S-4: activo neto de pensiones de 2.727 M transferido en la escisión (nota pro forma c)', editor: 'Honeywell Aerospace Inc. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-07-06', url: `${E}/000119312526296207/d132076ds4.htm` },
];
const id = BOLSA.identificacion;
const D = {
  _estado: 'Completo. Precio: cierre del 15-oct-2026 (la sesión del 16-oct no había abierto a la hora del análisis). Sin historia de cotización anterior a la escisión: beta, rentabilidades a 1-10 años y múltiplos históricos no existen.',
  identificacion: {
    nombre: 'Honeywell Aerospace Inc.', nombre_corto: 'Honeywell Aerospace', ticker: 'HONA', isin: 'US43849R1059', mercado: 'Nasdaq Global Select Market', indice_referencia: 'S&P 500',
    pais: 'Estados Unidos', pais_iso: 'US', sector: 'Industria', industria: 'Aeroespacial y defensa', sede: 'Phoenix, Arizona', fundacion: '1914', empleados: 36000, web: 'https://www.honeywellaerospace.com',
    precio: id.precio, fecha_precio: id.fecha_precio, acciones: ACC, capitalizacion_publicada: 51700, free_float_pct: 99.9,
    max_52s: 247.15, min_52s: 149.19, volumen_medio_diario: '≈ 627 M USD/día (3 meses)', proximos_resultados: '2026-10-28',
  },
  consenso: {
    estimaciones: [
      { periodo: '2026e', ingresos: 18357, ebitda: 4577, ebit: 4269, bpa: 6.65, dpa: 0.81, fuente: 'MarketScreener (17 analistas; BPA de base mixta GAAP/ajustada) [3]' },
      { periodo: '2027e', ingresos: 19802, ebitda: 5109, ebit: 4796, bpa: 8.66, dpa: 2.44, fuente: 'MarketScreener [3]' },
      { periodo: '2028e', ingresos: 21361, ebitda: 5602, ebit: 5246, bpa: 9.80, dpa: 2.71, fuente: 'MarketScreener [3]' },
    ],
    recomendaciones: { n_analistas: 17, comprar: 6, mantener: 11, vender: 0, po_medio: 199.2, po_min: 160.0, po_max: 256.0 },
    base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: 2.3,
    confianza: 'Media',
  },
  bolsa: {
    tipo_rentabilidad: 'total (con dividendos)',
    rentabilidades: [],
    anual: [],
    beta: null, volatilidad_pct: 70.0, max_drawdown_pct: -39.6, posicion_corta_pct: 2.72,
    confianza: 'Media',
  },
  multiplos_historicos: null,
  comparables: {
    empresas: [
      { nombre: 'GE Aerospace', ticker: 'GE', pais: 'US', capitalizacion: 323720, ev_ventas: 6.60, ev_ebitda_ltm: 29.1, ev_ebitda_ntm: 26.2, per_ntm: 36.9, crecimiento_pct: 11.1, margen_ebitda_pct: 22.7, roic_pct: 31.0, dn_ebitda: 0.9, fcf_yield_pct: 2.6 },
      { nombre: 'RTX', ticker: 'RTX', pais: 'US', capitalizacion: 251960, ev_ventas: 3.02, ev_ebitda_ltm: 17.8, ev_ebitda_ntm: 16.6, per_ntm: 25.2, crecimiento_pct: 7.5, margen_ebitda_pct: 17.0, roic_pct: 9.4, dn_ebitda: 1.9, fcf_yield_pct: 4.5 },
      { nombre: 'Safran', ticker: 'SAF', pais: 'FR', capitalizacion: 148120, ev_ventas: 3.89, ev_ebitda_ltm: 20.0, ev_ebitda_ntm: 18.1, per_ntm: 27.1, crecimiento_pct: 10.3, margen_ebitda_pct: 18.2, roic_pct: 23.6, dn_ebitda: -0.3, fcf_yield_pct: 4.0 },
      { nombre: 'Howmet Aerospace', ticker: 'HWM', pais: 'US', capitalizacion: 87620, ev_ventas: 10.06, ev_ebitda_ltm: 32.8, ev_ebitda_ntm: 28.7, per_ntm: 37.2, crecimiento_pct: 14.2, margen_ebitda_pct: 30.7, roic_pct: 23.0, dn_ebitda: 1.5, fcf_yield_pct: 2.0 },
      { nombre: 'TransDigm', ticker: 'TDG', pais: 'US', capitalizacion: 62700, ev_ventas: 9.33, ev_ebitda_ltm: 18.3, ev_ebitda_ntm: 16.4, per_ntm: 24.3, crecimiento_pct: 11.4, margen_ebitda_pct: 50.9, roic_pct: 15.4, dn_ebitda: 6.0, fcf_yield_pct: 3.1 },
      { nombre: 'HEICO', ticker: 'HEI', pais: 'US', capitalizacion: 43130, ev_ventas: 8.78, ev_ebitda_ltm: 30.8, ev_ebitda_ntm: 27.6, per_ntm: 44.5, crecimiento_pct: 11.4, margen_ebitda_pct: 28.5, roic_pct: 13.1, dn_ebitda: 1.6, fcf_yield_pct: 2.4 },
      { nombre: 'Woodward', ticker: 'WWD', pais: 'US', capitalizacion: 19680, ev_ventas: 4.91, ev_ebitda_ltm: 25.6, ev_ebitda_ntm: 23.6, per_ntm: 32.5, crecimiento_pct: 8.7, margen_ebitda_pct: 19.2, roic_pct: 16.6, dn_ebitda: 1.1, fcf_yield_pct: 1.9 },
      { nombre: 'Curtiss-Wright', ticker: 'CW', pais: 'US', capitalizacion: 18520, ev_ventas: 5.25, ev_ebitda_ltm: 22.8, ev_ebitda_ntm: 21.1, per_ntm: 31.2, crecimiento_pct: 8.3, margen_ebitda_pct: 23.1, roic_pct: 16.5, dn_ebitda: 0.8, fcf_yield_pct: 3.4 },
    ],
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2024-06', objetivo: 'CAES Systems (electrónica de defensa, RF)', comprador: 'Honeywell (hoy Honeywell Aerospace)', ev: 1900, ev_ventas: null, ev_ebitda: 14.0, prima_pct: null, excluir: false, comentario: '≈ 14x el EBITDA estimado de 2024 con las ventajas fiscales; comprada a Advent [11].' },
      { fecha: '2024-01', objetivo: 'Kaman (componentes aeroespaciales y de ingeniería)', comprador: 'Arcline Investment Management', ev: 1800, ev_ventas: 2.34, ev_ebitda: 16.0, prima_pct: null, excluir: false, comentario: '16x EBITDA LTM a sep-2023 (112 M) y 2,3x ventas (769 M) [12].' },
      { fecha: '2025-10', objetivo: 'Simmonds Precision Products (sensores y sistemas de combustible, de RTX)', comprador: 'TransDigm', ev: 765, ev_ventas: 2.19, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '≈ 765 M USD con ventajas fiscales sobre ≈ 350 M de ventas de 2025; sin EBITDA publicado [13].' },
    ],
    confianza: 'Media',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'multiplos_historicos', campo: 'Serie de múltiplos históricos (5-10 años)', tipo: 'Complemento', intentos: '1) bolsa.mjs: cotiza desde el 29-jun-2026 (antes, solo «cuando se emita» con volúmenes de cientos de acciones); 2) Honeywell: múltiplos del grupo, otro negocio; 3) estimación con comparables: no es historia propia', decision: 'Omitido' },
    { seccion: 'bolsa', campo: 'Beta, rentabilidades a 1-10 años y rentabilidad anual', tipo: 'Complemento', intentos: '1) bolsa.mjs: 75 sesiones, sin beta mensual ni semanal; 2) Stock Analysis: beta n.d.; 3) beta de los comparables (mediana 0,96) reapalancada: usada en el WACC como estimación', decision: 'Calculado y marcado como estimación' },
    { seccion: 'transacciones', campo: 'Múltiplos de Parker-Meggitt, Safran-actuación de Collins y TransDigm-CPI', tipo: 'Complemento', intentos: '1) Notas de los compradores: sin EBITDA del objetivo; 2) prensa: solo importes; 3) TransDigm 10-K 2025: precio sin EBITDA', decision: 'Omitido' },
  ],
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Seeking Alpha: titulares y análisis de HONA (RSS, ago-oct 2026)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-14', url: 'https://seekingalpha.com/api/sa/combined/HONA.xml' },
  { id: 2, titulo: 'Stocktwits: flujo de mensajes de $HONA (26-sep a 15-oct-2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-15', url: 'https://api.stocktwits.com/api/2/streams/symbol/HONA.json' },
  { id: 3, titulo: 'Honeywell Aerospace: Strong Buy As Headwinds Should Be Temporary', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-09-17', url: 'https://seekingalpha.com/symbol/HONA/analysis' },
  { id: 4, titulo: 'Honeywell Aerospace: A Tier-1 Moat Already Priced For Perfection', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-09-13', url: 'https://seekingalpha.com/symbol/HONA/analysis' },
  { id: 5, titulo: 'Honeywell Aerospace: 2026 Is A Year Of Reset - I\'ll Keep Watching', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-09-11', url: 'https://seekingalpha.com/symbol/HONA/analysis' },
  { id: 6, titulo: 'Honeywell Aerospace Q2: The Spinoff Spinout', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-08-07', url: 'https://seekingalpha.com/symbol/HONA/analysis' },
];
const E_ = {
  _estado: 'Completo con lo que abre: RSS de Seeking Alpha (titulares y artículos de opinión) y API de Stocktwits; Reddit da 403.',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Stocktwits ($HONA)', fecha: '2026-10', n_comentarios: 30, tono: 'Dividido', resumen: 'Los mensajes de octubre se reparten entre quien ve el suelo hecho («bottom appears to be in», compras de opciones de largo plazo entre 160 y 210) y quien da la escisión por fracasada para el accionista de toda la vida; aparecen avisos de la demanda colectiva [2].' },
      { plataforma: 'Seeking Alpha (artículos de opinión)', fecha: '2026-09', n_comentarios: 4, tono: 'Dividido', resumen: 'Cuatro artículos en un mes: dos alcistas (problemas temporales de suministro, defensa para 2027) y dos neutrales o bajistas («moat ya pagado», «2026 es un año de reajuste») [3, 4, 5].' },
      { plataforma: 'Seeking Alpha (titulares de noticias)', fecha: '2026-08', n_comentarios: 12, tono: 'Negativo', resumen: 'Agosto dominado por el fallo de ventas y beneficio del 2T26 y la rebaja de guía; después, la subida de Morgan Stanley a sobreponderar el 19-ago («la caída crea un punto de entrada») [1, 6].' },
    ],
    temas: [
      { tema: 'Cadena de suministro y recorte de la guía', postura: 'Dividida', peso: 'Alto', contraste: 'Los datos dan la razón a los dos lados: la demanda está (cartera +9 %, pedidos +8 %), pero el margen del 2T26 cayó 3 puntos y la guía de EBIT bajó un 6 %; el informe trata 2026 como año perdido y no extrapola la caída.' },
      { tema: 'Escisión y deuda', postura: 'Bajista', peso: 'Medio', contraste: 'Fundado: la sociedad nace con 16.006 M de deuda y patrimonio negativo para financiar un pago de 15.087 M a Honeywell; el rating sigue en BBB+/A-/A3 y la deuda neta pro forma es ≈ 3,4 veces el EBITDA.' },
      { tema: 'Demanda colectiva', postura: 'Bajista', peso: 'Bajo', contraste: 'Existe (D. Arizona), pero la multa de origen es de 2 M USD; el riesgo económico es pequeño frente a 51.700 M de capitalización.' },
      { tema: 'Valoración frente a comparables', postura: 'Alcista', peso: 'Medio', contraste: 'Cierto en múltiplos (PER adelantado 18x frente a 32x de mediana), pero con más deuda y menos crecimiento que GE, Howmet o HEICO; el DCF no da el descuento por hecho.' },
    ],
    confianza: 'Media',
  },
  fuentes: fE,
};
guarda('E', E_);
console.log('Notas A-E escritas en', dir);
