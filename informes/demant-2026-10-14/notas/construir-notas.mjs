// Escribe las notas A-E de Demant (corte 2026-10-14) a partir de los documentos de notas/docs, del XBRL ESEF
// (filings.xbrl.org: informes 2022, 2023, 2025 y 1S26) y de las fuentes de mercado. Cada nota cita solo con [n] de su lista.
// Ejecutar: node informes/demant-2026-10-14/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const RZ = 'https://via.ritzau.dk/ir-files/13560112';
const XB = 'https://filings.xbrl.org/213800RM6L9LN78BVA56';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Demant Annual Report 2025 (cifras clave 2021-2025, notas 2.1, 5.2, 5.3 y remuneración)', editor: 'Demant A/S', tipo: 'Primaria', fecha: '2026-02-03', url: `${RZ}/14774039/17104/Demant%20Annual%20Report%202025.pdf` },
  { id: 2, titulo: 'Informe anual 2025 en ESEF (xBRL-JSON): cuenta, balance y flujos 2024-2025, deuda a corto (ShorttermBorrowings)', editor: 'Demant A/S vía XBRL International', tipo: 'Primaria', fecha: '2026-02-03', url: `${XB}/2025-12-31/ESEF/DK/0/DEMANT-2025-12-31-en.json` },
  { id: 3, titulo: 'Informe anual 2023 en ESEF (xBRL-JSON): 2022-2023 reexpresados, deuda a corto', editor: 'Demant A/S vía XBRL International', tipo: 'Primaria', fecha: '2024-02-06', url: `${XB}/2023-12-31/ESEF/DK/0/DEMANT-2023-12-31-en.json` },
  { id: 4, titulo: 'Informe anual 2022 en ESEF (xBRL-JSON): 2021-2022 con implantes como actividad interrumpida', editor: 'Demant A/S vía XBRL International', tipo: 'Primaria', fecha: '2023-02-07', url: `${XB}/2022-12-31/ESEF/DK/0/DEMANT-2022-12-31-en.json` },
  { id: 5, titulo: 'Interim Report 2026 (1S26): cifras clave, cuenta, balance, flujos', editor: 'Demant A/S', tipo: 'Primaria', fecha: '2026-08-11', url: `${RZ}/15085908/25128/Interim%20Report%202026.pdf` },
  { id: 6, titulo: 'Company announcement 2026-09: Interim Report 2026 and upgraded financial outlook for 2026', editor: 'Demant A/S', tipo: 'Primaria', fecha: '2026-08-11', url: `${RZ}/15086142/25127/2026-09%20Interim%20Report%202026%20and%20upgraded%20financial%20outlook%20for%202026.pdf` },
  { id: 7, titulo: 'Company announcement 2026-12: Upgraded financial outlook for 2026 and resumption of share buy-backs (cifras preliminares del 3T26)', editor: 'Demant A/S', tipo: 'Primaria', fecha: '2026-10-09', url: `${RZ}/15199920/30935/2026-12%20Upgraded%20financial%20outlook%20for%202026%20and%20resumption%20of%20share%20buy-backs.pdf` },
  { id: 8, titulo: 'Interim Management Statement for Q1 2026', editor: 'Demant A/S', tipo: 'Primaria', fecha: '2026-05-05', url: `${RZ}/14914364/19235/2026-08%20Interim%20Management%20Statement%20for%20Q1%202026.pdf` },
  { id: 9, titulo: 'Interim Management Statement for Q3 2025', editor: 'Demant A/S', tipo: 'Primaria', fecha: '2025-11-04', url: `${RZ}/14655735/16520/2025-12%20Interim%20Management%20Statement%20for%20Q3%202025.pdf` },
  { id: 10, titulo: 'Company announcement 2026-02: Annual Report 2025 and review of H2 2025', editor: 'Demant A/S', tipo: 'Primaria', fecha: '2026-02-03', url: `${RZ}/14774035/17102/2026-02%20Annual%20Report%202025%20and%20review%20of%20H2%202025.pdf` },
  { id: 11, titulo: 'Company announcement 2025-13: Demant closes the acquisition of KIND', editor: 'Demant A/S', tipo: 'Primaria', fecha: '2025-12-01', url: `${RZ}/14698764/16746/2025-13%20Demant%20closes%20the%20acquisiton%20of%20KIND.pdf` },
  { id: 12, titulo: 'Company announcement 2025-15: Demant sells EPOS to ACCO Brands', editor: 'Demant A/S', tipo: 'Primaria', fecha: '2025-12-20', url: `${RZ}/14735247/16877/2025-15%20Demant%20sells%20EPOS%20to%20ACCO%20Brands.pdf` },
  { id: 13, titulo: 'Investor news: Demant completes divestment of Oticon Medical', editor: 'Demant A/S', tipo: 'Primaria', fecha: '2026-03-31', url: `${RZ}/14859215/17547/Investor%20news%20-%20Demant%20completes%20divestment%20of%20Oticon%20Medical.pdf` },
  { id: 14, titulo: 'Interim Report 2026 en ESEF (xBRL-JSON): balance a 30-jun-2026 (deuda a largo 10.571 M y a corto 6.337 M)', editor: 'Demant A/S vía XBRL International', tipo: 'Primaria', fecha: '2026-08-11', url: `${XB}/2026-06-30/ESEF/DK/0/213800RM6L9LN78BVA56-2026-06-30-1-en.json` },
  { id: 15, titulo: 'Company announcement 2026-07: Completion of capital reduction (211.753.291 derechos de voto)', editor: 'Demant A/S', tipo: 'Primaria', fecha: '2026-04-08', url: `${RZ}/14866768/17593/2026-07%20Completion%20of%20capital%20reduction.pdf` },
];

const cuenta = [
  { periodo: '2021', ingresos: 17905, coste_ventas: 4447, gastos_generales: 8875, ebitda: 4730, amortizaciones: 1067, ebit: 3663, resultado_financiero: -202, bai: 3461, impuestos: 750, minoritarios: 15, beneficio_neto: 2696, gastos_financieros: 244, participadas_en_ebitda: 120, no_recurrentes_en_ebitda: null, bpa: 11.48, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: 234.8 },
  { periodo: '2022', ingresos: 19705, coste_ventas: 5036, gastos_generales: 10270, ebitda: 4383, amortizaciones: 1176, ebit: 3207, resultado_financiero: -280, bai: 2927, impuestos: 651, minoritarios: 2, beneficio_neto: 2274, gastos_financieros: 363, participadas_en_ebitda: 122, no_recurrentes_en_ebitda: null, bpa: 10.06, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: 226.0 },
  { periodo: '2023', ingresos: 21601, coste_ventas: 5281, gastos_generales: 10656, ebitda: 5799, amortizaciones: 1293, ebit: 4506, resultado_financiero: -761, bai: 3745, impuestos: 922, minoritarios: 3, beneficio_neto: 2820, gastos_financieros: 856, participadas_en_ebitda: 69, no_recurrentes_en_ebitda: null, bpa: 12.64, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: 223.1 },
  { periodo: '2024', ingresos: 22419, coste_ventas: 5329, gastos_generales: 11391, ebitda: 5963, amortizaciones: 1435, ebit: 4528, resultado_financiero: -812, bai: 3716, impuestos: 824, minoritarios: 1, beneficio_neto: 2891, gastos_financieros: 925, participadas_en_ebitda: 99, no_recurrentes_en_ebitda: -124, bpa: 13.31, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: 217.2 },
  { periodo: '2025', ingresos: 22971, coste_ventas: 5600, gastos_generales: 12046, ebitda: 5351, amortizaciones: 1519, ebit: 3832, resultado_financiero: -731, bai: 3101, impuestos: 734, minoritarios: -1, beneficio_neto: 2368, gastos_financieros: 833, participadas_en_ebitda: 36, no_recurrentes_en_ebitda: 128, bpa: 11.20, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: 211.3 },
];
const balanceH = [
  { periodo: '2021', activo_total: 24860, activo_corriente: 7886, pasivo_corriente: 10973, pasivo_total: 16879, fondo_comercio: null, intangibles: null, inmovilizado_material: 2277, existencias: 2366, clientes: 3203, proveedores: 808, activos_contrato: null, pasivos_contrato: null, caja: 1172, deuda_financiera: 9217, arrendamientos: 2121, patrimonio_neto: 7977, minoritarios: 4, reservas: null },
  { periodo: '2022', activo_total: 29857, activo_corriente: 10022, pasivo_corriente: 11569, pasivo_total: 21295, fondo_comercio: null, intangibles: null, inmovilizado_material: 2553, existencias: 2904, clientes: 3626, proveedores: 865, activos_contrato: null, pasivos_contrato: null, caja: 1130, deuda_financiera: 12696, arrendamientos: 2380, patrimonio_neto: 8561, minoritarios: 1, reservas: 8515 },
  { periodo: '2023', activo_total: 30546, activo_corriente: 9384, pasivo_corriente: 6862, pasivo_total: 21208, fondo_comercio: 12381, intangibles: null, inmovilizado_material: 2813, existencias: 2845, clientes: 3650, proveedores: 799, activos_contrato: null, pasivos_contrato: null, caja: 1138, deuda_financiera: 11768, arrendamientos: 2686, patrimonio_neto: 9256, minoritarios: 82, reservas: 9211 },
  { periodo: '2024', activo_total: 32450, activo_corriente: 9921, pasivo_corriente: 6095, pasivo_total: 22806, fondo_comercio: 13854, intangibles: 1212, inmovilizado_material: 2909, existencias: 2500, clientes: 3563, proveedores: 658, activos_contrato: null, pasivos_contrato: null, caja: 1112, deuda_financiera: 12910, arrendamientos: 2771, patrimonio_neto: 9564, minoritarios: 80, reservas: 9520 },
  { periodo: '2025', activo_total: 39074, activo_corriente: 10075, pasivo_corriente: 7423, pasivo_total: 29155, fondo_comercio: 19034, intangibles: 1345, inmovilizado_material: 3428, existencias: 2620, clientes: 3765, proveedores: 923, activos_contrato: null, pasivos_contrato: null, caja: 1330, deuda_financiera: 17605, arrendamientos: 3383, patrimonio_neto: 9842, minoritarios: 77, reservas: 9799 },
];
const flujosH = [
  { periodo: '2021', flujo_operativo: 3593, capex: 726, pagos_arrendamientos: 530, adquisiciones: 708, desinversiones: 0, dividendos: 0, recompras: 3200, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: '2022', flujo_operativo: 2622, capex: 924, pagos_arrendamientos: 614, adquisiciones: 2323, desinversiones: 16, dividendos: 0, recompras: 1840, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: '2023', flujo_operativo: 4458, capex: 835, pagos_arrendamientos: 687, adquisiciones: 935, desinversiones: 22, dividendos: 0, recompras: 846, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: '2024', flujo_operativo: 4080, capex: 779, pagos_arrendamientos: 750, adquisiciones: 1234, desinversiones: 31, dividendos: 0, recompras: 2301, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: '2025', flujo_operativo: 3852, capex: 857, pagos_arrendamientos: 777, adquisiciones: 6285, desinversiones: 47, dividendos: 0, recompras: 582, emision_acciones: 0, intereses_en_financiacion: 0 },
];

guarda('A', {
  _estado: 'completo',
  negocio: {
    segmentos: [
      { nombre: 'Hearing Aids (ventas externas)', descripcion: 'Fabricación y venta mayorista de audífonos (Oticon, Philips Hearing Solutions bajo licencia, Bernafon, Sonic) a clínicas independientes, cadenas, VA y grandes minoristas.', tipo_resultado: null, historico: [{ periodo: '2024', ingresos: 10022, resultado: null }, { periodo: '2025', ingresos: 9841, resultado: null }] },
      { nombre: 'Hearing Care', descripcion: 'Red minorista propia de más de 4.500 clínicas (Audika, HearingLife, KIND, ACSHearing…), que vende audífonos y servicio al usuario final.', tipo_resultado: null, historico: [{ periodo: '2024', ingresos: 9932, resultado: null }, { periodo: '2025', ingresos: 10724, resultado: null }] },
      { nombre: 'Diagnostics', descripcion: 'Audiómetros, equipos de ajuste, ABR/OAE, balance y servicio (Interacoustics, MAICO, Grason-Stadler, Amplivox).', tipo_resultado: null, historico: [{ periodo: '2024', ingresos: 2465, resultado: null }, { periodo: '2025', ingresos: 2406, resultado: null }] },
    ],
    geografias: [
      { nombre: 'Europa', peso_pct: 44.5 }, { nombre: 'Norteamérica', peso_pct: 38.7 }, { nombre: 'Asia', peso_pct: 9.1 }, { nombre: 'Pacífico', peso_pct: 4.7 }, { nombre: 'Resto del mundo', peso_pct: 3.0 },
    ],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Crecimiento orgánico del grupo', valor_anterior: '2 % (2025)', valor_actual: '11 % (3T26)', variacion: '+9 pp', comentario: 'Aceleración por Oticon Zeal y el lanzamiento de Oticon Reveal en agosto de 2026 [7, 10].' },
      { kpi: 'Crecimiento orgánico Hearing Aids (externo)', valor_anterior: '0 % (2025)', valor_actual: '17 % (3T26)', variacion: '+17 pp', comentario: 'Muy por encima de un mercado que creció un 6-7 % en valor en el 3T [7].' },
      { kpi: 'Margen bruto', valor_anterior: '75,6 % (2025)', valor_actual: '77,1 % (1S26)', variacion: '+1,5 pp', comentario: 'Mejor precio medio por mezcla de producto y canal, y KIND [5].' },
      { kpi: 'Margen EBIT antes de partidas especiales', valor_anterior: '17,2 % (2025)', valor_actual: '16,5 % (1S26)', variacion: '−0,7 pp', comentario: 'Lastrado por divisa y una compra minorista en Reino Unido; sin ellos +0,6 pp [6].' },
      { kpi: 'Apalancamiento (DFN/EBITDA antes de especiales)', valor_anterior: '3,4x (dic-25)', valor_actual: '3,0x (jun-26)', variacion: '−0,4x', comentario: 'Objetivo 2,0-2,5x a finales de 2027 con recompras de al menos 3.000 M [6, 7].' },
      { kpi: 'Unidades de audífonos (crecimiento)', valor_anterior: '4 % (2024)', valor_actual: '6 % (2S25)', variacion: '+2 pp', comentario: 'Con precio medio −2 % por mezcla geográfica y de canal en 2S25 [10].' },
    ],
    confianza: 'Alta',
  },
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 24631, ebitda: 5563, ebit: 3901, beneficio_neto: 2424, bpa: 11.48, dpa: 0, dpa_extraordinario: 0, fcf: 3252, participadas_en_ebitda: 32, no_recurrentes_en_ebitda: 344 },
    cambios_perimetro: [
      { periodo: '2025', descripcion: 'KIND (unas 650 clínicas en Alemania, ≈ 2.000 M DKK de ventas) consolidada desde el 1-dic-2025: entra entera en el balance y solo un mes en la cuenta [11].' },
      { periodo: '2023', descripcion: 'Comunicaciones (EPOS) pasa a actividad interrumpida desde 2024; 2023 está reexpresado y 2021-2022 no (incluyen EPOS en la actividad continuada) [1].' },
    ],
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '1T25', ingresos: 5620, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: null },
      { periodo: '2T25', ingresos: 5633, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: null },
      { periodo: '3T25', ingresos: 5454, crecimiento_pct: 1, crecimiento_organico_pct: 3, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: null },
      { periodo: '4T25', ingresos: 6264, crecimiento_pct: 6, crecimiento_organico_pct: 5, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: null },
      { periodo: '1T26', ingresos: 6246, crecimiento_pct: 11, crecimiento_organico_pct: 6, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: null },
      { periodo: '2T26', ingresos: 6667, crecimiento_pct: 18, crecimiento_organico_pct: 9, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: 'Superior' },
      { periodo: '3T26', ingresos: 6624, crecimiento_pct: 21, crecimiento_organico_pct: 11, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: 'Superior' },
    ],
    confianza: 'Alta',
  },
  balance: {
    historico: balanceH,
    vencimientos: [{ anio: '2026', importe: 1683 }, { anio: '2027-2028', importe: 15275 }, { anio: '2029-2030', importe: 702 }, { anio: '2031+', importe: 1065 }],
    liquidez: 'Caja de 1.496 M a 30-jun-2026 más líneas comprometidas no dispuestas «considerables» (sin cifra publicada) [5, 1].',
    rating: 'Sin rating público (financiación bancaria, BEI y NIB) [1].',
    coste_deuda_pct: 2.7, vida_media_anios: null,
    confianza: 'Alta',
  },
  flujos: { historico: flujosH, confianza: 'Alta' },
  calidad: { auditor: 'PricewaterhouseCoopers (PwC), reelegido en la junta de 2026', anios_auditor: null, opinion: 'Favorable', confianza: 'Media' },
  capital: {
    adquisiciones: [
      { anio: '2025', objetivo: 'KIND Group (Alemania, ≈ 650 clínicas)', importe: 5225, ev_ebitda: null, financiacion: 'Deuda bancaria; apalancamiento 3,4x al cierre de 2025', resultado: 'Aporta 325 M de EBIT antes de especiales previsto en 2026 (antes 300 M); margen objetivo 20 % en 2028 [11, 6].' },
      { anio: '2022', objetivo: 'Compras minoristas (Hearing Care) y venta de implantes', importe: 2323, ev_ebitda: null, financiacion: 'Caja y deuda', resultado: 'Hearing Care crece por encima del mercado; la venta de Oticon Medical se cerró en 2026 a Impilo tras fracasar la de Cochlear [1, 13].' },
      { anio: '2025', objetivo: 'Venta de EPOS a ACCO Brands', importe: 75, ev_ebitda: null, financiacion: 'Desinversión', resultado: 'Pérdida contable de ≈ 650 M (sin caja) en actividades interrumpidas; cierra la salida de comunicaciones [12].' },
    ],
    confianza: 'Alta',
  },
  fuentes: fA,
  huecos: [
    { seccion: 'trimestres', campo: 'EBIT y BPA trimestrales', tipo: 'Complemento', intentos: '1) IMS 1T26 y 3T25 (solo ventas por trimestre); 2) nota preliminar del 3T26 (solo ventas); 3) presentaciones: Demant publica resultados por semestre', decision: 'Omitido' },
    { seccion: 'negocio', campo: 'Ventas por área de negocio 2021-2023', tipo: 'Complemento', intentos: '1) Informe anual 2025 (solo 2024-2025); 2) ESEF 2023 sin desglose por área; 3) informes anteriores con otra segmentación (Hearing Healthcare / Communications)', decision: 'Omitido' },
  ],
});

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Demant Annual Report 2025: Market trends and developments (mercado mayorista ≈ 7.000 M USD, minorista ≈ 20.000 M USD, 23 M de audífonos)', editor: 'Demant A/S', tipo: 'Primaria', fecha: '2026-02-03', url: `${RZ}/14774039/17104/Demant%20Annual%20Report%202025.pdf` },
  { id: 2, titulo: 'Company announcement 2026-12 (mercado de audífonos +6-7 % en valor en el 3T26; 4-5 % previsto en 2026)', editor: 'Demant A/S', tipo: 'Primaria', fecha: '2026-10-09', url: `${RZ}/15199920/30935/2026-12%20Upgraded%20financial%20outlook%20for%202026%20and%20resumption%20of%20share%20buy-backs.pdf` },
  { id: 3, titulo: 'GN Store Nord enters into agreement to sell its hearing business to Amplifon for DKK 17.0 billion', editor: 'GN Store Nord (vía Inderes)', tipo: 'Primaria', fecha: '2026-03-16', url: 'https://www.inderes.se/en/releases/gn-store-nord-as-enters-into-agreement-to-sell-its-hearing-business-to-amplifon-spa-for-dkk-170-billion' },
  { id: 4, titulo: 'Investor news: Oticon announces launch of new flagship hearing aids (Oticon Reveal, Dual AI)', editor: 'Demant A/S', tipo: 'Primaria', fecha: '2026-08-11', url: `${RZ}/15086161/25160/Investor%20news%20-%20Demant-owned%20Oticon%20announces%20launch%20of%20new%20flagship%20hearing%20aids.pdf` },
  { id: 5, titulo: 'FDA Authorizes First Over-the-Counter Hearing Aid Software (Apple AirPods Pro)', editor: 'U.S. Food and Drug Administration', tipo: 'Primaria', fecha: '2024-09-12', url: 'https://www.fda.gov/news-events/press-announcements/fda-authorizes-first-over-counter-hearing-aid-software' },
  { id: 6, titulo: 'Oticon Reveal launches with Dual AI for speech and surrounding sounds', editor: 'HearingTracker', tipo: 'Sectorial', fecha: '2026-08', url: 'https://www.hearingtracker.com/news/oticon-reveal-launches-with-dual-ai-for-speech-and-surrounding-sounds' },
  { id: 7, titulo: 'Company announcement 2025-13: Demant closes the acquisition of KIND', editor: 'Demant A/S', tipo: 'Primaria', fecha: '2025-12-01', url: `${RZ}/14698764/16746/2025-13%20Demant%20closes%20the%20acquisiton%20of%20KIND.pdf` },
  { id: 8, titulo: 'Amplifon S.p.A.: estimaciones y cuentas (MarketScreener)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/AMPLIFON-S-P-A-179254/finances/' },
  { id: 9, titulo: 'GN Store Nord: estimaciones y cuentas (MarketScreener)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/GN-STORE-NORD-A-S-1412917/finances/' },
  { id: 10, titulo: 'Análisis de Cochlear del repositorio (sector de implantes y comparables a 8-oct-2026)', editor: 'Repositorio analisis-inversion', tipo: 'Analistas', fecha: '2026-10-08', url: 'informes/cochlear-2026-10-08/' },
  { id: 11, titulo: 'Demant Annual Report 2025: Risk management (OTC, managed care, aranceles)', editor: 'Demant A/S', tipo: 'Primaria', fecha: '2026-02-03', url: `${RZ}/14774039/17104/Demant%20Annual%20Report%202025.pdf` },
];
guarda('B', {
  _estado: 'completo',
  historia: {
    resumen: 'Hans Demant fundó Oticon en Odense en 1904 para importar audífonos para su mujer sorda; su hijo William creó la fábrica. En 1957 la familia cedió el control a la Fundación William Demant, que hoy tiene el 59 % del capital [1]. Cotiza desde 1995. El grupo ha pasado de fabricante a «hearing healthcare» integrado: audífonos, una red de más de 4.500 clínicas propias y diagnóstico. Entre 2022 y 2026 vendió lo que no era audición (comunicaciones EPOS a ACCO; implantes Oticon Medical a Impilo tras el veto británico a Cochlear) y compró KIND, la mayor cadena alemana, por 700 M EUR [1, 7].',
    hitos: [
      { anio: '1904', hito: 'Hans Demant funda Oticon en Odense.' },
      { anio: '1957', hito: 'La familia transfiere el control a la Fundación William Demant.' },
      { anio: '1995', hito: 'Salida a bolsa en Copenhague (William Demant Holding).' },
      { anio: '2016', hito: 'Primer audífono con conexión a internet (Oticon Opn) y giro a la «BrainHearing».' },
      { anio: '2022', hito: 'Acuerdo para vender Oticon Medical a Cochlear (850 M DKK); la operación se frustra después en Reino Unido.' },
      { anio: '2025', hito: 'Lanzamiento de Oticon Zeal y compra de KIND (700 M EUR); venta de EPOS a ACCO Brands.' },
      { anio: '2026', hito: 'Venta de Oticon Medical a Impilo (marzo) y lanzamiento de Oticon Reveal con doble IA (agosto).' },
    ],
    confianza: 'Media',
  },
  sector: {
    definicion: 'El mercado relevante es la cadena del audífono con prescripción (fabricación mayorista y venta minorista con adaptación profesional) más el diagnóstico audiológico, mundial. La empresa da dos tamaños: mayorista ≈ 7.000 M USD y minorista ≈ 20.000 M USD, sin canales públicos, y diagnóstico ≈ 700 M USD [1]. Como Demant está en las tres capas, usamos como perímetro el valor minorista más diagnóstico (≈ 20.700 M USD, ≈ 138.200 M DKK al cambio del BCE del 14-oct-2026: 6,677 DKK/USD); la cuota mayorista se da aparte. Segunda fuente: la ficha sectorial del 14-oct (sectores/audifonos-2026-10-14.md) contrasta el tamaño con las ventas de los cinco fabricantes.',
    tamano: '≈ 138.200 M DKK en 2025 (minorista ≈ 20.000 M USD + diagnóstico ≈ 700 M USD) [1]; mayorista ≈ 46.700 M DKK (7.000 M USD) [1].',
    unidad_serie: 'millones de DKK (valor minorista + diagnóstico)',
    serie: [
      { anio: '2025', tamano: 138200 }, { anio: '2026e', tamano: 144400 }, { anio: '2027e', tamano: 151600 }, { anio: '2028e', tamano: 159200 }, { anio: '2029e', tamano: 167200 }, { anio: '2030e', tamano: 175500 },
    ],
    tcac_historico_pct: 4.0, tcac_previsto_pct: 5.0, cr5_pct: 90, estructura: 'Concentrada (fabricación); fragmentada (minorista)',
    drivers: [
      { driver: 'Demografía (envejecimiento) y mayor acceso', efecto: '+', horizonte: 'Estructural', evidencia: 'Unidades +6 % anual de media en diez años; la mitad del crecimiento estructural por demografía y la otra mitad por acceso [1].' },
      { driver: 'Precio medio estable y ciclo de producto', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Mercado +6-7 % en valor en el 3T26 empujado por lanzamientos, frente a solo +2-4 % previsto a principios de 2026 [2].' },
      { driver: 'Consolidación de la distribución y managed care en EE. UU.', efecto: '−', horizonte: 'Estructural', evidencia: 'Los grandes pagadores concentran volumen y presionan precio medio y honorarios de adaptación [11].' },
      { driver: 'OTC y auriculares con función de audífono', efecto: '−', horizonte: 'Estructural', evidencia: 'Regla OTC de la FDA (oct-2022) y autorización de la función de audífono de los AirPods Pro (sep-2024) para pérdida leve a moderada [5]; impacto en el mercado con receta «limitado» según Demant [11].' },
      { driver: 'IA en el procesado del sonido', efecto: '+', horizonte: 'Estructural', evidencia: 'Oticon Reveal combina dos redes de IA en un miniRITE; impulsó el 17 % orgánico de Hearing Aids en el 3T26 [4, 2].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Cinco fabricantes con ≈ 90 % del mayorista y ciclos de lanzamiento de 18-24 meses; Demant perdió cuota en EE. UU. en 2025 por un gran minorista y la recupera en 2026 con Zeal y Reveal [1, 2].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Los diez primeros clientes son el 11 % de las ventas; grandes cadenas, VA y managed care negocian volumen [1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Chips propios y pocos componentes críticos; el riesgo es de suministro y aranceles, no de precio [11].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Regulación de producto sanitario, I+D de más de 1.400 M DKK al año y acceso a las clínicas; los entrantes OTC no han conquistado el canal con receta [1, 11].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'AirPods Pro y audífonos OTC para pérdida leve a moderada [5]; los implantes solo para pérdidas profundas.' },
    ],
    ciclo: { posicion: 'Recuperación', comentario: 'El mercado se frenó en 2025 (crecimiento en valor por debajo del 4-6 % estructural por incertidumbre macro) y se recupera en 2026: +4 % en valor en el 1S y +6-7 % en el 3T [1, 2]. En 2008-09 el sector apenas cayó; en 2020 las ventas se hundieron un trimestre por el cierre de clínicas y rebotaron (orgánico de Demant +27 % en 2021); en 2022-23 la inflación no tocó la demanda [1].' },
    regulacion: 'En EE. UU., la regla OTC de la FDA (en vigor desde octubre de 2022) permite vender audífonos sin receta para pérdida leve a moderada en adultos, y en septiembre de 2024 la FDA autorizó el software de Apple que convierte los AirPods Pro en audífono OTC [5]. En Europa el reembolso público fija buena parte del volumen (Francia «100 % Santé», Alemania, Reino Unido NHS) [1]. Los aranceles de EE. UU. a importaciones costaron en 2025; Demant espera recuperar parte en el 2S26 [11].',
    tendencias: 'La IA en el chip (redes neuronales que separan habla y ruido) es hoy el argumento de venta del segmento premium: Oticon Reveal, primer audífono con doble IA, es la razón del salto del 3T26 [4, 6]. Los auriculares con función de audífono (Apple) atacan el tramo leve y la venta en línea; la regulación y la adaptación profesional protegen el tramo moderado a profundo, donde está el grueso del valor. La distribución se concentra: Amplifon compra GN Hearing por 17.000 M DKK y Demant compró KIND [3, 7].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 16.6,
    posicion: '2.º fabricante mundial de audífonos (≈ 27 % del mayorista medido con sus ventas totales de audífonos, 12.473 M DKK) y 2.º minorista tras Amplifon; 16,6 % del perímetro minorista + diagnóstico [1].',
    competidores: [
      { nombre: 'Sonova', pais: 'Suiza', ticker: 'SOON.SW', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Líder mundial (Phonak, Unitron, AudioNova, Sennheiser consumo); margen EBITDA ≈ 26 % según MarketScreener, recogido en el análisis de Cochlear [10].' },
      { nombre: 'WS Audiology', pais: 'Dinamarca/Singapur', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Signia y Widex; propiedad de EQT y las familias fundadoras de Widex; no cotiza ni publica cuentas completas.' },
      { nombre: 'GN Store Nord (GN Hearing)', pais: 'Dinamarca', ticker: 'GN.CO', ingresos: 7214, cuota_pct: null, margen_ebit_pct: null, comentario: 'ReSound y Beltone; GN Hearing (7.214 M DKK de ventas en 2025, EBITDA pro forma 1.185 M) se vende a Amplifon [3].' },
      { nombre: 'Amplifon', pais: 'Italia', ticker: 'AMP.MI', ingresos: 17910, cuota_pct: null, margen_ebit_pct: 11.7, comentario: 'Mayor minorista mundial (2.396 M EUR de ventas en 2025, EBIT 281 M) y, con GN, futuro fabricante integrado [8, 3].' },
      { nombre: 'Starkey', pais: 'EE. UU.', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Privado; fuerte en el canal independiente de EE. UU.' },
      { nombre: 'Cochlear', pais: 'Australia', ticker: 'COH.AX', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Implantes cocleares (pérdida profunda); complemento más que competidor [10].' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'Las clínicas propias dirigen volumen a las marcas del grupo, pero no hay red entre usuarios.' },
        { fuente: 'Costes de cambio', puntuacion: 3, evidencia: 'Los audioprotesistas trabajan con el software de ajuste del fabricante (Genie) y la reposición cada 4-5 años tiende a repetir marca [1].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'Oticon y plataforma de chip propia; I+D > 1.400 M DKK al año [1]; el 3T26 demuestra que un lanzamiento acertado gana cuota en meses [2].' },
        { fuente: 'Ventaja en costes', puntuacion: 2, evidencia: 'Margen bruto del 75-77 % similar al de Sonova; plan de ahorro de 500 M DKK anuales desde 2028 [1].' },
        { fuente: 'Escala eficiente', puntuacion: 4, evidencia: 'Cinco fabricantes con ≈ 90 % del mayorista; la I+D y la regulación hacen inviable un sexto fabricante con receta.' },
      ],
    },
    amenazas: 'La amenaza más citada es la sustitución por electrónica de consumo: los AirPods Pro ya son audífonos OTC autorizados por la FDA para pérdida leve a moderada [5]. Pesa poco en el valor porque el usuario típico de audífono con receta tiene más de 70 años y pérdida moderada o mayor, y Demant dice que el efecto en el mercado con receta de EE. UU. es «limitado» [11]. Más probable (30-40 % en cinco años) es la presión del canal: managed care y grandes cadenas (Amplifon con GN integrada) negocian precio medio. Un fallo de lanzamiento frente a Sonova (Phonak) cuesta cuota en uno o dos trimestres, como en EE. UU. en 2025 [1].',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Lo material para las cifras es la seguridad del producto y la privacidad de los datos de audición (audífonos conectados), el acceso al tratamiento (12,1 M de vidas mejoradas en 2025) y el consumo de electricidad de las fábricas: 53 % renovable en 2025 frente al 21 % en 2023 [1]. Las emisiones de alcance 1 y 2 son pequeñas (26.781 t CO2e) y no mueven el coste [1].',
    controversias: 'Sin multas ni litigios relevantes en tres años. El veto británico a la venta de Oticon Medical a Cochlear (2024) obligó a buscar otro comprador (Impilo, 2026) [1].',
    confianza: 'Media',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'esg', campo: 'calificaciones ESG con fecha', tipo: 'Complemento', intentos: '1) Informe anual 2025 (no las publica); 2) web de inversores (no accesible sin JavaScript); 3) prensa', decision: 'Omitido' },
  ],
});

// ---------------------------------------------------------------- C. Gobierno y directivos
const fC = [
  { id: 1, titulo: 'Demant Annual Report 2025: Corporate governance, Board of Directors, Executive Board, Shareholder information', editor: 'Demant A/S', tipo: 'Primaria', fecha: '2026-02-03', url: `${RZ}/14774039/17104/Demant%20Annual%20Report%202025.pdf` },
  { id: 2, titulo: 'Company announcement 2026-03: Changes to Demant’s Board of Directors', editor: 'Demant A/S', tipo: 'Primaria', fecha: '2026-02-03', url: `${RZ}/14774063/17107/2026-03%20Changes%20to%20Demant%E2%80%99s%20Board%20of%20Directors.pdf` },
  { id: 3, titulo: 'Company announcement 2026-05: Decisions of annual general meeting', editor: 'Demant A/S', tipo: 'Primaria', fecha: '2026-03-05', url: `${RZ}/14821734/17324/2026-05%20Decisions%20of%20annual%20general%20meeting.pdf` },
  { id: 4, titulo: 'Company announcement 2026-01: transactions with Demant shares by managers (S. Nielsen, plan de salario en acciones)', editor: 'Demant A/S', tipo: 'Primaria', fecha: '2026-01-13', url: `${RZ}/14750120/16979/2026-01%20Managers%20and%20closely%20related%20parties%20transactions%20with%20Demant%20shares.pdf` },
  { id: 5, titulo: 'Company announcement 2026-06: transactions by managers (entrega de RSU a S. Nielsen y R. Schneider)', editor: 'Demant A/S', tipo: 'Primaria', fecha: '2026-04-07', url: `${RZ}/14864943/17570/2026-06%20Managers%20and%20closely%20related%20parties%20transactions%20with%20Demant%20shares.pdf` },
  { id: 6, titulo: 'Company announcement 2026-10: compra de 17.224 acciones por T. Hofman-Bang', editor: 'Demant A/S', tipo: 'Primaria', fecha: '2026-08-13', url: `${RZ}/15090062/25556/2026-10%20Managers%20and%20closely%20associated%20parties%20transactions%20with%20Demant%20shares.pdf` },
  { id: 7, titulo: 'Company announcement 2026-11: venta de 5.000 acciones por N. Wagner', editor: 'Demant A/S', tipo: 'Primaria', fecha: '2026-08-19', url: `${RZ}/15100618/26051/2026-11%20Managers%20and%20closely%20associated%20parties%20transactions%20with%20Demant%20shares.pdf` },
  { id: 8, titulo: 'Investor news: Expansion of Demant’s Executive Leadership Team', editor: 'Demant A/S', tipo: 'Primaria', fecha: '2026-05', url: `${RZ}/14915693/19258/Investor%20news%20-%20Expansion%20of%20Demant%E2%80%99s%20Executive%20Leadership%20Team.pdf` },
  { id: 9, titulo: 'Company announcement 2026-04: Notice to annual general meeting', editor: 'Demant A/S', tipo: 'Primaria', fecha: '2026-02-11', url: `${RZ}/14774071/17109/2026-04%20Notice%20to%20annual%20general%20meeting.pdf` },
  { id: 10, titulo: 'Company announcement 2026-12: guía elevada y reanudación de recompras', editor: 'Demant A/S', tipo: 'Primaria', fecha: '2026-10-09', url: `${RZ}/15199920/30935/2026-12%20Upgraded%20financial%20outlook%20for%202026%20and%20resumption%20of%20share%20buy-backs.pdf` },
];
guarda('C', {
  _estado: 'completo',
  directivos: {
    equipo: [
      { nombre: 'Søren Nielsen', cargo: 'Presidente y consejero delegado (President & CEO)', desde: '2015', participacion_pct: 0.05, trayectoria: 'En Oticon desde 1995; dirigió la división de audífonos antes de suceder a Niels Jacobsen. Con él el grupo pasó de 12.000 a 23.000 M DKK de ventas y se integró en la venta minorista; recibió 36.749 acciones por RSU en abril de 2026 [1, 5].' },
      { nombre: 'René Schneider', cargo: 'Director financiero (CFO)', desde: '2015', participacion_pct: null, trayectoria: 'Antes en GN Store Nord y Novo Nordisk; responsable de la financiación de KIND y del regreso a 2,0-2,5x [1, 5].' },
      { nombre: 'Kristian Villumsen', cargo: 'Presidente del consejo', desde: '2026', participacion_pct: null, trayectoria: 'Consejero desde 2021; ex consejero delegado de Coloplast. Preside desde la junta de marzo de 2026 [2].' },
      { nombre: 'Niels Jacobsen', cargo: 'Vicepresidente del consejo', desde: '2017', participacion_pct: null, trayectoria: 'Consejero delegado de Demant hasta 2017 y de William Demant Invest, el vehículo de la Fundación [1].' },
      { nombre: 'Niels Wagner', cargo: 'Presidente de Hearing Care', desde: null, participacion_pct: null, trayectoria: 'Dirige la red minorista, que creció un 6 % orgánico en el 1S26 e integra KIND [7].' },
    ],
    historial_guidance: [
      { anio: '2026', guia: 'Inicial: orgánico 3-6 %, EBIT antes de especiales 4.100-4.500 M', real: 'Elevada dos veces: 7-8 % y 4.700-5.000 M (9-oct-2026)', cumplida: 'Sí' },
      { anio: '2025', guia: 'Inicial: orgánico 3-7 %, EBIT 4.500-4.900 M', real: 'Orgánico 2 %, EBIT antes de especiales 3.960 M (guía rebajada a mitad de año)', cumplida: 'No' },
      { anio: '2024', guia: 'EBIT 4.500-4.900 M (rebajada en julio)', real: 'EBIT antes de especiales 4.404 M', cumplida: 'Parcial' },
      { anio: '2023', guia: 'Orgánico y EBIT dentro de rangos', real: 'Orgánico 14 %, EBIT 4.506 M', cumplida: 'Sí' },
    ],
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Kristian Villumsen', cargo: 'Presidente', tipo: 'Independiente', desde: '2021', comisiones: 'Nombramientos y retribuciones' },
      { nombre: 'Niels Jacobsen', cargo: 'Vicepresidente', tipo: 'Dominical', desde: '2017', comisiones: 'Auditoría, nombramientos y retribuciones' },
      { nombre: 'Thomas Hofman-Bang', cargo: 'Consejero', tipo: 'Dominical', desde: '2026', comisiones: null },
      { nombre: 'Sisse Fjelsted Rasmussen', cargo: 'Consejera (presidenta de auditoría)', tipo: 'Independiente', desde: '2020', comisiones: 'Auditoría (presidenta)' },
      { nombre: 'Katrin Pucknat', cargo: 'Consejera', tipo: 'Independiente', desde: '2025', comisiones: null },
      { nombre: 'Thomas Duer', cargo: 'Consejero elegido por la plantilla', tipo: 'Otro externo', desde: '2015', comisiones: null },
      { nombre: 'Heidir Hørby', cargo: 'Consejera elegida por la plantilla', tipo: 'Otro externo', desde: '2023', comisiones: null },
      { nombre: 'Anders Højsgaard', cargo: 'Consejero elegido por la plantilla', tipo: 'Otro externo', desde: '2024', comisiones: null },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: false, auditoria_independiente: false, insiders_sin_operaciones: false,
    accionista_control: true, presidente_vinculado_control: false, cambios_cupula_24m: 1,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: null,
    accionistas: [
      { nombre: 'Fundación William Demant (directamente y vía William Demant Invest)', pct: 59, tipo: 'Control', variacion: 'Estable; intención declarada de mantener el 55-60 %' },
      { nombre: 'Autocartera', pct: 0.4, tipo: 'Autocartera', variacion: 'Amortizadas 2,04 M acciones en abril de 2026; recompras reanudadas el 9-oct-2026' },
      { nombre: 'Capital libre', pct: 40.6, tipo: 'Flotante', variacion: '≈ 40 % registrado en Dinamarca y 25 % en Norteamérica (excluida la Fundación)' },
    ],
    insiders: [
      { fecha: '2026-08-18', persona: 'Niels Wagner (presidente de Hearing Care)', operacion: 'Venta', acciones: 5000, importe: 1.47 },
      { fecha: '2026-08-12', persona: 'Thomas Hofman-Bang (consejero)', operacion: 'Compra', acciones: 17224, importe: 4.97 },
      { fecha: '2026-04-01', persona: 'Søren Nielsen (CEO), entrega de RSU', operacion: 'Compra', acciones: 36749, importe: 7.19 },
      { fecha: '2026-01-13', persona: 'Søren Nielsen (CEO), salario en acciones de 2025', operacion: 'Compra', acciones: 2231, importe: 0.55 },
    ],
    alertas: ['Ninguna relevante detectada tras revisar el informe anual, las comunicaciones de la junta y las operaciones de directivos de 12 meses.'],
    confianza: 'Media',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'remuneración individual del primer ejecutivo y votos de la junta', tipo: 'Complemento', intentos: '1) Informe anual 2025 (solo total de la dirección: 35,8 M DKK); 2) acta de la junta de 2026 (aprobado sin recuento publicado); 3) Remuneration Report 2025 no localizado en los comunicados descargados', decision: 'Omitido' },
  ],
});

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'DEMANT.CO, ^OMXC25 y EXV4.DE: históricos diarios (precio, rango, beta, volatilidad, cierres de ejercicio)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/DEMANT.CO/history' },
  { id: 2, titulo: 'Demant A/S: finances (consenso 2026-2028: ventas, EBITDA, EBIT, BPA, deuda neta)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/DEMANT-A-S-56225597/finances/' },
  { id: 3, titulo: 'Demant A/S: consensus (20 analistas, objetivo medio 334,45 DKK, máx. 429, mín. 220; cambios de objetivos)', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/DEMANT-A-S-56225597/consensus/' },
  { id: 4, titulo: 'Rendimiento del Bund a 10 años (serie BBSIS R10XX): 3,48 % el 14-oct-2026', editor: 'Deutsche Bundesbank', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://api.statistiken.bundesbank.de/rest/data/BBSIS/D.I.ZAR.ZI.EUR.S1311.B.A604.R10XX.R.A.A._Z._Z.A' },
  { id: 5, titulo: 'Implied ERP by month (ERPbymonth.xlsx): 4,20 % en octubre de 2026', editor: 'A. Damodaran, NYU Stern', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 6, titulo: 'Tipos de cambio de referencia del BCE (14-oct-2026: 7,4754 DKK/EUR; 1,1195 USD/EUR; 0,9330 CHF/EUR; 1,5971 AUD/EUR)', editor: 'Banco Central Europeo', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml' },
  { id: 7, titulo: 'Análisis de Cochlear (comparables de MarketScreener a 8-oct-2026: Sonova, Straumann)', editor: 'Repositorio analisis-inversion', tipo: 'Datos de mercado', fecha: '2026-10-08', url: 'informes/cochlear-2026-10-08/datos-v3.json' },
  { id: 8, titulo: 'Análisis de Straumann y de Coloplast (comparables de MarketScreener: Cochlear, Coloplast)', editor: 'Repositorio analisis-inversion', tipo: 'Datos de mercado', fecha: '2026-10-12', url: 'informes/coloplast-2026-10-12/datos-v2.json' },
  { id: 9, titulo: 'Amplifon S.p.A.: finances (MarketScreener)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/AMPLIFON-S-P-A-179254/finances/' },
  { id: 10, titulo: 'GN Store Nord: finances (MarketScreener)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/GN-STORE-NORD-A-S-1412917/finances/' },
  { id: 11, titulo: 'GN Store Nord sells its hearing business to Amplifon for DKK 17.0 billion (ventas 7.214 M, EBITDA pro forma 1.185 M)', editor: 'GN Store Nord (vía Inderes)', tipo: 'Primaria', fecha: '2026-03-16', url: 'https://www.inderes.se/en/releases/gn-store-nord-as-enters-into-agreement-to-sell-its-hearing-business-to-amplifon-spa-for-dkk-170-billion' },
  { id: 12, titulo: 'Demant to acquire KIND and significantly expand the Group’s hearing care footprint (700 M EUR libre de caja y deuda)', editor: 'Demant A/S (vía Placera)', tipo: 'Primaria', fecha: '2025-06-11', url: 'https://www.placera.se/pressmeddelanden/demant-demant-a-s-demant-to-acquire-kind-and-significantly-expand-the-groups-hearing-care-footprint-20250611' },
  { id: 13, titulo: 'Company announcement 2025-13: Demant closes the acquisition of KIND (ventas ≈ 2.000 M DKK, EBIT ≈ 300 M)', editor: 'Demant A/S', tipo: 'Primaria', fecha: '2025-12-01', url: `${RZ}/14698764/16746/2025-13%20Demant%20closes%20the%20acquisiton%20of%20KIND.pdf` },
  { id: 14, titulo: 'Demant Annual Report 2025: Shareholder information (cotización de cierre 2021-2025, acciones)', editor: 'Demant A/S', tipo: 'Primaria', fecha: '2026-02-03', url: `${RZ}/14774039/17104/Demant%20Annual%20Report%202025.pdf` },
  { id: 15, titulo: 'SOON.SW, COH.AX, STMN.SW, COLO-B.CO, AMP.MI, GN.CO: cierres diarios de octubre de 2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/' },
  { id: 16, titulo: 'Company announcement 2026-12: guía 2026 elevada (EBIT antes de especiales 4.700-5.000 M) y recompras ≥ 3.000 M hasta 2027', editor: 'Demant A/S', tipo: 'Primaria', fecha: '2026-10-09', url: `${RZ}/15199920/30935/2026-12%20Upgraded%20financial%20outlook%20for%202026%20and%20resumption%20of%20share%20buy-backs.pdf` },
  { id: 17, titulo: 'Company announcement 2025-14: Financial calendar 2026 (IMS del 3T26 el 3-nov-2026)', editor: 'Demant A/S', tipo: 'Primaria', fecha: '2025-12-03', url: `${RZ}/14703030/16764/2025-14%20Financial%20calendar%202026.pdf` },
];
const B = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
// Comparables en DKK al cierre del 14-oct-2026. Sonova y Straumann: múltiplos de MarketScreener del 8-oct (informe de Cochlear) llevados al 14-oct con la variación de precio
// (PER × p1/p0; EV/EBITDA y EV/ventas con la parte de capital del EV). Cochlear y Coloplast: del informe de Coloplast (12-oct). Amplifon: MarketScreener 14-oct
// (solo PER: su EV/EBITDA de 2027 incluye GN Hearing). GN fuera: tras vender GN Hearing pierde dinero en 2026 (PER negativo).
const comp = [
  { nombre: 'Sonova', ticker: 'SOON.SW', pais: 'CH', capitalizacion: 129130, ev_ventas: 4.67, ev_ebitda_ltm: 18.0, ev_ebitda_ntm: 15.1, per_ntm: 23.8, crecimiento_pct: 7.0, margen_ebitda_pct: 26.0, roic_pct: 17.0, dn_ebitda: 1.06, fcf_yield_pct: 3.8 },
  { nombre: 'Cochlear', ticker: 'COH.AX', pais: 'AU', capitalizacion: 39520, ev_ventas: 3.54, ev_ebitda_ltm: 15.4, ev_ebitda_ntm: 14.6, per_ntm: 27.4, crecimiento_pct: 2.0, margen_ebitda_pct: 23.0, roic_pct: null, dn_ebitda: -0.3, fcf_yield_pct: 3.3 },
  { nombre: 'Straumann', ticker: 'STMN.SW', pais: 'CH', capitalizacion: 118400, ev_ventas: 5.44, ev_ebitda_ltm: 17.6, ev_ebitda_ntm: 15.7, per_ntm: 25.8, crecimiento_pct: 8.7, margen_ebitda_pct: 30.6, roic_pct: null, dn_ebitda: -0.16, fcf_yield_pct: 2.7 },
  { nombre: 'Coloplast', ticker: 'COLO-B.CO', pais: 'DK', capitalizacion: 102580, ev_ventas: 4.80, ev_ebitda_ltm: 15.1, ev_ebitda_ntm: 14.4, per_ntm: 18.9, crecimiento_pct: 7.6, margen_ebitda_pct: 31.8, roic_pct: 11.9, dn_ebitda: 2.5, fcf_yield_pct: 5.3 },
  { nombre: 'Amplifon', ticker: 'AMP.MI', pais: 'IT', capitalizacion: 20780, ev_ventas: null, ev_ebitda_ltm: null, ev_ebitda_ntm: null, per_ntm: 18.3, crecimiento_pct: 1.5, margen_ebitda_pct: 22.6, roic_pct: null, dn_ebitda: 2.8, fcf_yield_pct: 8.3 },
];
guarda('D', {
  _estado: 'completo',
  identificacion: {
    nombre: 'Demant A/S', nombre_corto: 'Demant', ticker: 'DEMANT', isin: 'DK0060738599', mercado: 'Nasdaq Copenhague', indice_referencia: 'OMX Copenhagen 25 (C25)',
    pais: 'Dinamarca', pais_iso: 'DK', sector: 'Salud', industria: 'Equipos y suministros sanitarios (audífonos y audiología)', sede: 'Smørum (Dinamarca)', fundacion: '1904', empleados: 26616, web: 'https://www.demant.com',
    precio: B.identificacion.precio, fecha_precio: B.identificacion.fecha_precio, acciones: 210.9, capitalizacion_publicada: null, free_float_pct: 41,
    max_52s: B.identificacion.max_52s, min_52s: B.identificacion.min_52s, volumen_medio_diario: `≈ ${String(B.volumen_3m.importe_dia_millones).replace('.', ',')} M DKK/día (3 meses)`, proximos_resultados: '2026-11-03',
  },
  consenso: {
    guidance: 'Guía 2026 elevada el 9-oct-2026 (segunda subida): crecimiento orgánico del 7-8 % (antes 6-7 %; al principio del año 3-6 %) y EBIT antes de partidas especiales de 4.700-5.000 M DKK (antes 4.400-4.800; inicial 4.100-4.500), con un 9 % de crecimiento por compras, −1 % de divisa, partidas especiales de −400 M y un tipo efectivo del 23 % [16]. Recompras reanudadas el 9-oct: al menos 3.000 M DKK hasta finales de 2027, acabando 2027 con 2,0-2,5x de deuda neta sobre EBITDA [16]. A medio plazo: ventas +8-10 % anual en moneda local (6-8 % orgánico con un mercado al 5 %) y mejora gradual del margen EBIT [14].',
    estimaciones: [
      { periodo: '2026e', ingresos: 26547, ebitda: 6258, ebit: 4828, bpa: 13.25, dpa: 0, fuente: 'MarketScreener [2]' },
      { periodo: '2027e', ingresos: 28448, ebitda: 7043, ebit: 5322, bpa: 16.32, dpa: 0, fuente: 'MarketScreener [2]' },
      { periodo: '2028e', ingresos: 30354, ebitda: 7669, ebit: 5785, bpa: 19.02, dpa: 0, fuente: 'MarketScreener [2]' },
    ],
    recomendaciones: { n_analistas: 20, comprar: null, mantener: null, vender: null, po_medio: 334.45, po_min: 220, po_max: 429 },
    revisiones: 'Revisiones al alza fuertes y recientes: tras la nota del 9-oct, diez bancos subieron el objetivo el 12-oct (Morgan Stanley 399→429, Goldman 380→405, SEB 330→400, Nordea 350→400, Danske 285→340, Jyske 300→340, Deutsche Bank 281→343, BNP 305→330, Oddo 275→315), después de otra ronda tras el 1S26 en agosto (JP Morgan 250→315, Goldman 290→330) [3]. Aun así el objetivo medio (334,45) queda un 6 % por debajo del precio: los analistas van por detrás de la subida. AlphaValue/Baader rebajó a «reducir» el 13-oct [3]. Única fuente con estimaciones completas: MarketScreener; el EBIT del consenso es antes de partidas especiales (2025: 3.960) y su BPA es el publicado total (2025: 7,31, con las interrumpidas).',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: { ...B.bolsa, posicion_corta_pct: null, confianza: 'Alta' },
  multiplos_historicos: {
    serie: (B.cierres_ejercicio || []).filter((c) => ['2021', '2022', '2023', '2024', '2025'].includes(c.anio)).map((c) => ({ anio: c.anio, precio_cierre: c.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    confianza: 'Alta',
  },
  comparables: { empresas: comp, confianza: 'Media' },
  transacciones: {
    operaciones: [
      { fecha: '2026-03', objetivo: 'GN Hearing (ReSound, Beltone)', comprador: 'Amplifon', ev: 17000, ev_ventas: 2.36, ev_ebitda: 14.3, prima_pct: null, excluir: false, comentario: 'Libre de caja y deuda; 12.600 M en efectivo y 56 M de acciones de Amplifon; EBITDA pro forma 2025 de 1.185 M con costes de separación [11].' },
      { fecha: '2025-06', objetivo: 'KIND Group (≈ 650 clínicas en Alemania)', comprador: 'Demant', ev: 5225, ev_ventas: 2.61, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '700 M EUR libre de caja y deuda; ventas pro forma 2026 ≈ 2.000 M DKK y EBIT ≈ 300 M (≈ 17x EBIT) [12, 13].' },
    ],
    confianza: 'Media',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'transacciones', campo: 'tercera operación con múltiplo publicado', tipo: 'Complemento', intentos: '1) Venta de Oticon Medical a Impilo (hasta 600 M DKK, sin ventas ni EBITDA publicados); 2) EPOS a ACCO (no es audición); 3) fusión Sivantos-Widex (2019, sin múltiplo oficial)', decision: 'Omitido' },
    { seccion: 'bolsa', campo: 'posición corta', tipo: 'Complemento', intentos: '1) Finanstilsynet (xlsx mensual no descargado); 2) prensa; 3) proveedores', decision: 'Omitido' },
  ],
});

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Demant A/S (WILYY): news and analysis feed (transcripciones de las conferencias del 4T25 y del 2T26)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-08-12', url: 'https://seekingalpha.com/api/sa/combined/WILYY.xml' },
  { id: 2, titulo: 'HCA: «Red flag»: Demant opjusterer mere end analytikerne ventede (comentario con IA de HC Andersen Capital en Inderes)', editor: 'Inderes / HC Andersen Capital', tipo: 'Foros y redes', fecha: '2026-08-11', url: 'https://www.inderes.dk/analyst-comments/hca-red-flag-demant-opjusterer-mere-end-analytikerne-ventede-ai' },
  { id: 3, titulo: 'Foro de HearingTracker: «Oticon New Product: Oticon Reveal» (más de 110 respuestas)', editor: 'HearingTracker Forum', tipo: 'Foros y redes', fecha: '2026-09', url: 'https://forum.hearingtracker.com/t/-/135003/1' },
  { id: 4, titulo: 'Demant: cambios de recomendación y objetivo de 12-13 de octubre de 2026', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/DEMANT-A-S-56225597/consensus/' },
];
guarda('E', {
  _estado: 'completo',
  sentimiento: {
    tono: 'Positivo', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Foro de HearingTracker (usuarios y audioprotesistas)', fecha: '2026-09', n_comentarios: 110, tono: 'Positivo', resumen: 'Interés técnico alto por Oticon Reveal (ganancia de 25 dB con el nuevo control de realimentación, ajuste NAL-NL3 solo en Reveal); dudas sobre si sirve para pérdidas profundas frente a Phonak y Xceed [3].' },
      { plataforma: 'Inderes / HC Andersen Capital (comentario con debate en el foro de Inderes)', fecha: '2026-08', n_comentarios: 5, tono: 'Dividido', resumen: 'Lectura positiva de la subida de guía pero «bandera roja» por el margen EBIT casi plano (16,5 % frente a 16,4 %) con ventas +18 % y por depender de un Reveal aún no vendido [2].' },
      { plataforma: 'Seeking Alpha (WILYY)', fecha: '2026-08', n_comentarios: 6, tono: 'Neutro', resumen: 'Solo transcripciones y noticias; sin debate apreciable de lectores en el ADR [1].' },
      { plataforma: 'Notas de bancos recogidas por MarketScreener', fecha: '2026-10', n_comentarios: 12, tono: 'Positivo', resumen: 'Diez subidas de objetivo el 12-oct y una rebaja a «reducir» de AlphaValue el 13-oct: el mercado discute ya la valoración, no el crecimiento [4].' },
    ],
    temas: [
      { tema: 'Oticon Reveal y la IA como motor de cuota', postura: 'Alcista', peso: 'Alto', contraste: 'Los datos lo confirman: Hearing Aids +17 % orgánico en el 3T26 frente a un mercado del 6-7 % (nota del 9-oct).' },
      { tema: 'Margen que no acompaña al crecimiento', postura: 'Bajista', peso: 'Medio', contraste: 'Cierto en el 1S26 (16,5 %), pero la guía del 2S implica ≈ 19 % antes de especiales: es la prueba del 3-nov.' },
      { tema: 'Valoración tras +65 % en el año', postura: 'Dividida', peso: 'Medio', contraste: 'El PER adelantado (≈ 21x sobre nuestro BPA de 2027) está en su mediana de cinco años; el objetivo medio de los analistas, por debajo del precio.' },
      { tema: 'AirPods y audífonos OTC', postura: 'Dividida', peso: 'Bajo', contraste: 'En los foros de usuarios se ven como complemento para pérdidas leves; los datos de Demant no muestran efecto en el canal con receta.' },
    ],
    confianza: 'Baja',
  },
  fuentes: fE,
  huecos: [
    { seccion: 'sentimiento', campo: 'foros de inversores daneses y Reddit', tipo: 'Complemento', intentos: '1) Shareville y Euroinvestor (requieren sesión o JavaScript); 2) Reddit (403 en la nube); 3) Stocktwits WILYY (sin mensajes)', decision: 'Omitido' },
  ],
});
console.log('Notas A-E escritas');
