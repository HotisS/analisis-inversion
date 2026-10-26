// Escribe las notas A-E de Munters (corte 2026-10-26). Hechos con fuente; los juicios van en propio.mjs.
import { writeFileSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const DIR = dirname(fileURLToPath(import.meta.url));
const w = (letra, obj) => writeFileSync(join(DIR, `${letra}.json`), JSON.stringify({ _estado: 'completa', ...obj }, null, 1));

const AR = { titulo: 'Annual and Sustainability Report 2025 (cuentas consolidadas, notas, gobierno corporativo y cifras clave de cinco años)', editor: 'Munters Group AB', tipo: 'Primaria', fecha: '2026-03-05', url: 'https://mb.cision.com/Main/15490/4319008/3975210.pdf' };
const AR24 = { titulo: 'Annual and Sustainability Report 2024 (cifras de 2023 y 2024 antes de reexpresar, cifras clave de las áreas de negocio 2020-2024)', editor: 'Munters Group AB', tipo: 'Primaria', fecha: '2025-03', url: 'https://mb.cision.com/Main/15490/4115873/3307846.pdf' };
const Q2 = { titulo: 'Interim report January-June 2026 (Q2 2026): «Exceptional demand - external headwinds currently affecting profitability»', editor: 'Munters Group AB', tipo: 'Primaria', fecha: '2026-07-17', url: 'https://mb.cision.com/Main/15490/4375573/4196815.pdf' };
const Q1 = { titulo: 'Interim report January-March 2026: «Good momentum across all business areas»', editor: 'Munters Group AB', tipo: 'Primaria', fecha: '2026-04-28', url: 'https://mb.cision.com/Main/15490/4340911/4061390.pdf' };
const Q4 = { titulo: 'Fourth quarter and full year report 2025: «Exceptional demand while earnings weakened»', editor: 'Munters Group AB', tipo: 'Primaria', fecha: '2026-01-29', url: 'https://mb.cision.com/Main/15490/4299489/3904792.pdf' };
const Q3 = { titulo: 'Interim report January-September 2025: «Strong performance driven by growth in key industries»', editor: 'Munters Group AB', tipo: 'Primaria', fecha: '2025-10-24', url: 'https://mb.cision.com/Main/15490/4255894/3742764.pdf' };
const ESEF = { titulo: 'Informes anuales 2020-2024 en formato ESEF (XBRL), repositorio filings.xbrl.org (herramientas/cuentas.mjs)', editor: 'Munters Group AB / XBRL International', tipo: 'Primaria', fecha: '2025-03', url: 'https://filings.xbrl.org/' };
const FOOD = { titulo: 'Munters to explore a potential divestment of its FoodTech business area (asesor Evercore; FoodTech 1.753 M de ventas y 297 M de EBITA ajustado en 2025)', editor: 'Munters Group AB (MFN)', tipo: 'Primaria', fecha: '2026-06-16', url: 'https://www.mfn.se/cis/a/munters-group/munters-group-ab-munters-to-explore-a-potential-divestment-of-its-foodtech-business-area-6f12930f' };
const ORD2 = { titulo: 'Munters wins order of BSEK 2.0 for a modular AI cooling solution (CDU y CRAH para un colocalizador de EE. UU.; entregas de 2027 al 1T28)', editor: 'Munters Group AB (MFN)', tipo: 'Primaria', fecha: '2026-04-24', url: 'https://www.mfn.se/cis/a/munters-group/munters-group-ab-munters-wins-order-of-bsek-2-0-for-a-modular-ai-cooling-solution-f6ab87f4' };
const CEO = { titulo: 'Munters accelerates CEO transition and announces changes to Group Management (Stefan Aspman consejero delegado desde el 14-sep-2026)', editor: 'Munters Group AB (MFN)', tipo: 'Primaria', fecha: '2026-09-14', url: 'https://www.mfn.se/cis/a/munters-group/munters-group-ab-munters-accelerates-ceo-transition-and-announces-changes-to-group-management-1e022242' };
const DALE = { titulo: 'Munters completes expansion of data center cooling campus in Daleville, Virginia (52.000 m², cerca de 600 empleados, enfriadoras fabricadas en EE. UU.)', editor: 'Munters Group AB (MFN)', tipo: 'Primaria', fecha: '2026-09', url: 'https://www.mfn.se/cis/a/munters-group/munters-group-ab-munters-completes-expansion-of-data-center-cooling-campus-in-daleville-virginia-a436ad3f' };
const CMD = { titulo: 'Invitation to Munters Capital Markets Day 2026 (11-nov-2026, Estocolmo)', editor: 'Munters Group AB (MFN)', tipo: 'Primaria', fecha: '2026-09', url: 'https://www.mfn.se/cis/a/munters-group/munters-group-ab-invitation-to-munters-capital-markets-day-2026-d3255036' };
const AGM = { titulo: 'Annual General Meeting in Munters Group AB, 30-abr-2026 (dividendo 1,60 SEK en dos pagos, consejo, auditor, autorización de emisión de hasta 18.445.781 acciones)', editor: 'Munters Group AB (MFN)', tipo: 'Primaria', fecha: '2026-04-30', url: 'https://www.mfn.se/cis/a/munters-group/annual-general-meeting-in-munters-group-ab-e6749e62' };
const MFNCAL = { titulo: 'Calendario financiero y comunicados de Munters en MFN (3T26 publicado el 23-oct-2026; anual el 28-ene-2027; segundo pago del dividendo, 0,80 SEK, con fecha ex el 4-nov-2026; junta el 29-abr-2027)', editor: 'Modular Finance (MFN)', tipo: 'Datos de mercado', fecha: '2026-10-26', url: 'https://www.mfn.se/all/a/munters-group' };
const Q3N = { titulo: 'Interim report January-September 2026 (Q3 2026): «Significant order growth as operational improvements progress» (cuenta, balance y flujos a 30-sep-2026, áreas de negocio, partidas no recurrentes, informe de revisión de EY)', editor: 'Munters Group AB', tipo: 'Primaria', fecha: '2026-10-23', url: 'https://mb.cision.com/Main/15490/4414224/4335471.pdf' };
const Q3PR = { titulo: 'Munters Group AB: Significant order growth as operational improvements progress (comunicado en MFN con los datos de la conferencia del 23-oct-2026, 09:00 CEST)', editor: 'Munters Group AB (MFN)', tipo: 'Primaria', fecha: '2026-10-23', url: 'https://www.mfn.se/cis/a/munters-group/munters-group-ab-significant-order-growth-as-operational-improvements-progress-1524bc51' };
const CALL = { titulo: 'Munters Group AB (MMNNF) Q3 2026 Earnings Call Highlights (preguntas y respuestas de la conferencia del 23-oct-2026)', editor: 'GuruFocus', tipo: 'Prensa', fecha: '2026-10-23', url: 'https://www.gurufocus.com/news/9139813/munters-group-ab-mmnnf-q3-2026-earnings-call-highlights-record-order-intake-and-backlog-surge-signal-strong-momentum' };
const CALLT = { titulo: 'Earnings call transcript: Munters Q3 2026 stock jumps on strong order growth (transcripción de la conferencia del 23-oct-2026; consenso previo de BPA 1,24 y ventas 4.360 M)', editor: 'Investing.com', tipo: 'Prensa', fecha: '2026-10-23', url: 'https://www.investing.com/news/transcripts/earnings-call-transcript-munters-q3-2026-stock-jumps-on-strong-order-growth-93CH-4968295' };
const INFR = { titulo: 'Munters redovisar orderingång på drygt 7 miljarder (consenso Infront de 8 analistas para el 3T26: EBITA ajustado 473 M, ventas 4.203 M, margen 11,3 %, pedidos 4.993 M)', editor: 'Privata Affärer (Direkt)', tipo: 'Prensa', fecha: '2026-10-23', url: 'https://www.privataaffarer.se/placeringar/aktier/orderkross-fran-munters/' };

// ---------------- A. Cuentas ----------------
// 2020-2023: operaciones totales tal como se publicaron (XBRL ESEF, con FoodTech Equipment). 2024-2025: operaciones continuadas, reexpresadas en el informe anual 2025.
const cuenta = [
  { periodo: '2020', ingresos: 7015, coste_ventas: 4665, gastos_generales: null, ebitda: 1015, amortizaciones: 308, ebit: 707, resultado_financiero: -155, bai: 552, impuestos: 120, minoritarios: 6, beneficio_neto: 420, gastos_financieros: 157, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 2.32, dpa: 0.70, dpa_extraordinario: 0, acciones_diluidas: 182.4 },
  { periodo: '2021', ingresos: 7348, coste_ventas: 4994, gastos_generales: null, ebitda: 1056, amortizaciones: 303, ebit: 753, resultado_financiero: -85, bai: 668, impuestos: 153, minoritarios: 3, beneficio_neto: 513, gastos_financieros: 86, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 2.81, dpa: 0.85, dpa_extraordinario: 0, acciones_diluidas: 182.6 },
  { periodo: '2022', ingresos: 10386, coste_ventas: 7368, gastos_generales: null, ebitda: 1258, amortizaciones: 377, ebit: 881, resultado_financiero: -142, bai: 739, impuestos: 162, minoritarios: 0, beneficio_neto: 577, gastos_financieros: 150, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 3.17, dpa: 0.95, dpa_extraordinario: 0, acciones_diluidas: 182.5 },
  { periodo: '2023', ingresos: 13930, coste_ventas: 9508, gastos_generales: 2387, ebitda: 2070, amortizaciones: 484, ebit: 1586, resultado_financiero: -331, bai: 1255, impuestos: 463, minoritarios: 8, beneficio_neto: 784, gastos_financieros: 357, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 4.30, dpa: 1.30, dpa_extraordinario: 0, acciones_diluidas: 182.5 },
  { periodo: '2024', ingresos: 13587, coste_ventas: 8795, gastos_generales: 2564, ebitda: 2314, amortizaciones: 568, ebit: 1746, resultado_financiero: -359, bai: 1388, impuestos: 434, minoritarios: 48, beneficio_neto: 906, gastos_financieros: 404, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 128, bpa: 4.96, dpa: 1.60, dpa_extraordinario: 0, acciones_diluidas: 182.5 },
  { periodo: '2025', ingresos: 14712, coste_ventas: 10091, gastos_generales: 2845, ebitda: 1979, amortizaciones: 751, ebit: 1228, resultado_financiero: -412, bai: 815, impuestos: 253, minoritarios: 12, beneficio_neto: 550, gastos_financieros: 454, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 324, bpa: 3.01, dpa: 1.60, dpa_extraordinario: 0, acciones_diluidas: 182.54 },
];
const bal = (periodo, activo_total, activo_corriente, pasivo_corriente, pasivo_total, fondo_comercio, intangibles, inmovilizado_material, existencias, clientes, proveedores, activos_contrato, pasivos_contrato, caja, deuda_financiera, arrendamientos, patrimonio_neto, minoritarios, reservas) =>
  ({ periodo, activo_total, activo_corriente, pasivo_corriente, pasivo_total, fondo_comercio, intangibles, inmovilizado_material, existencias, clientes, proveedores, activos_contrato, pasivos_contrato, caja, deuda_financiera, arrendamientos, patrimonio_neto, minoritarios, reservas });
const historicoBalance = [
  bal('2020', 9574, 3123, 2299, 5823, 3952, 1356, null, null, 935, 529, null, null, 970, 2787, null, 3746, 5, -1745),
  bal('2021', 10742, 3639, 2833, 6379, 4248, 1586, 611, 1073, 1394, 771, null, null, 674, 2373, 376, 4360, 3, -1401),
  bal('2022', 15204, 5828, 4580, 9897, null, null, 825, 1956, 2020, 1288, null, null, 914, 3721, 775, 5303, 3, -943),
  bal('2023', 16731, 6469, 5337, 11473, 5822, 2259, 1097, 1726, 2038, 1294, null, null, 1532, 5131, 720, 5257, 1, -715),
  bal('2024', 21979, 7395, 9677, 16071, 7769, 3380, 1789, 2283, 2567, 1789, 256, 1821, 1530, 6514, 1084, 5894, 14, -527),
  bal('2025', 19728, 6727, 6680, 14862, 5458, 3361, 1846, 1884, 1912, 1461, 595, 2462, 1492, 6177, 1742, 4858, 8, -362),
];
const flu = (periodo, flujo_operativo, capex, pagos_arrendamientos, adquisiciones, desinversiones, dividendos, recompras) =>
  ({ periodo, flujo_operativo, capex, pagos_arrendamientos, adquisiciones, desinversiones, dividendos, recompras, emision_acciones: 0, intereses_en_financiacion: 0 });
const historicoFlujos = [
  flu('2020', 959, 217, 112, 9, 14, 0, 43),
  flu('2021', 519, 342, 105, 0, 2, 127, 69),
  flu('2022', 772, 539, 122, 721, 27, 154, 0),
  flu('2023', 1066, 670, 156, 744, 0, 173, 0),
  flu('2024', 2089, 1036, 155, 1806, 0, 237, 0),
  flu('2025', 1718, 858, 202, 1172, 0, 308, 0),
];
const seg = (nombre, descripcion, h) => ({ nombre, descripcion, tipo_resultado: 'EBIT', historico: h.map(([periodo, ingresos, resultado]) => ({ periodo, ingresos, resultado })) });

w('A', {
  negocio: {
    segmentos: [
      seg('AirTech', 'Tratamiento de aire de precisión: deshumidificación por rotor desecante, control de humedad y temperatura para fábricas de baterías, farmacia, alimentación, supermercados e infraestructuras; Clean Technologies (purificación y tratamiento de gases), Service y Components (rotores, paneles evaporativos). Resultado = EBITA ajustado [A1, A11].', [['2021', 4664, 682], ['2022', 6830, 1014], ['2023', 8226, 1278], ['2024', 8204, 1113], ['2025', 7191, 453], ['LTM sep-26', 7838, 759]]),
      seg('Data Center Technologies (DCT)', 'Refrigeración de centros de datos: economizadores por aire, SyCool Split, CRAH, matrices de ventiladores, unidades de distribución de refrigerante (CDU) para refrigeración líquida y enfriadoras (Geoclima, fabricadas en Italia y desde 2026 en Virginia). Resultado = EBITA ajustado [A1, A11].', [['2021', 702, 92], ['2022', 1401, 84], ['2023', 3408, 519], ['2024', 4392, 920], ['2025', 5906, 1149], ['LTM sep-26', 5870, 712]]),
      seg('FoodTech (Speria)', 'Controladores, sensores y software de la cadena alimentaria (MTech Systems, Hotraco, Optifarm); hasta 2024 incluía Equipment (ventiladores y equipos para granjas), vendido en mayo de 2025: las cifras de 2021-2023 son con Equipment y las de 2024-2025 sin él. Resultado = EBITA ajustado [A1, A6, A7].', [['2021', 2028, 210], ['2022', 2211, 128], ['2023', 2363, 222], ['2024', 1015, 238], ['2025', 1753, 297], ['LTM sep-26', 1830, 288]]),
      seg('Corporativo y eliminaciones', 'Gastos centrales y ventas entre áreas; resultado de 2021-2023 no publicado con la misma base [A1].', [['2021', -46, null], ['2022', -56, null], ['2023', -67, null], ['2024', -24, -167], ['2025', -138, -37], ['LTM sep-26', -85, -49]]),
    ],
    geografias: [
      { nombre: 'EE. UU.', peso_pct: 54.4 }, { nombre: 'China', peso_pct: 6.9 }, { nombre: 'Alemania', peso_pct: 4.3 }, { nombre: 'India', peso_pct: 3.8 },
      { nombre: 'Brasil', peso_pct: 3.1 }, { nombre: 'Resto de Europa (Italia, Países Bajos, Reino Unido, España, Irlanda, Suecia, Francia, Bélgica, Polonia, Dinamarca)', peso_pct: 15.5 }, { nombre: 'Resto del mundo', peso_pct: 12.0 },
    ],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Pedidos recibidos (M SEK)', valor_anterior: '22.984 (2025)', valor_actual: '32.073 en los 12 meses a sep-26; 7.070 en el 3T26', variacion: '+70 % en el 3T26; +80 % en enero-septiembre', comentario: 'DCT 4.907 M en el trimestre (+127 %) y 21.267 M en 12 meses; AirTech +13 %; FoodTech −8 %. Relación pedidos/ventas de 1,6 en el trimestre [A11, A12].' },
      { kpi: 'Cartera de pedidos (M SEK)', valor_anterior: '17.282 (dic-25); 24.542 (jun-26)', valor_actual: '27.851 (sep-26)', variacion: '+178 % interanual', comentario: 'DCT 22.927 M, AirTech 4.135 M y FoodTech 789 M; equivale a 1,8 años de ventas. La empresa dice que «gran parte de 2027 está ya llena» [A11, A13].' },
      { kpi: 'Margen EBITA ajustado', valor_anterior: '13,5 % (3T25)', valor_actual: '12,2 % (3T26); 11,4 % en enero-septiembre', variacion: '−1,3 puntos interanual; +1,2 puntos frente al 2T26', comentario: 'DCT del 19,5 % al 9,7 % (puesta en marcha en Virginia, mezcla, escasez de componentes, aranceles ≈2 puntos); AirTech del 7,0 % al 12,9 % (≈2,5 puntos de una penalización por cancelación de ≈50 M); objetivo > 14 % [A11, A12].' },
      { kpi: 'Circulante operativo / ventas (media 12 meses)', valor_anterior: '8,3 % (sep-25)', valor_actual: '4,2 % (sep-26)', variacion: '−4,1 puntos', comentario: 'Anticipos de clientes de 4.094 M frente a 3.791 M de existencias (+654 M en el trimestre); objetivo de la empresa 10-13 % [A11].' },
      { kpi: 'Servicio y componentes, % de ventas', valor_anterior: '24 % (3T25)', valor_actual: '28 % (3T26)', variacion: '+4 puntos', comentario: 'Ambición: más de un tercio a largo plazo; el servicio solo es el 14 % [A11].' },
      { kpi: 'Deuda neta / EBITDA ajustado', valor_anterior: '2,8x (sep-25); 3,2x (jun-26)', valor_actual: '3,4x (sep-26)', variacion: '+0,6 veces interanual', comentario: 'Deuda neta de 7.412 M por el flujo operativo negativo (−216 M) y 257 M más de arrendamientos de Virginia; objetivo de la empresa 1,5-2,5x [A11, A13].' },
      { kpi: 'Rentabilidad del capital empleado (ROCE)', valor_anterior: '11,9 % (sep-25)', valor_actual: '9,6 % (sep-26)', variacion: '−2,3 puntos', comentario: 'Capital empleado medio de 11.981 M [A11].' },
    ],
  },
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM sep-26', fecha_fin: '2026-09-30', ingresos: 15453, ebitda: 1938, ebit: 1146, beneficio_neto: 527, bpa: 2.89, dpa: 1.60, dpa_extraordinario: 0, fcf: 202, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 226 },
    cambios_perimetro: [
      { periodo: '2024', descripcion: 'FoodTech Equipment (≈1.900 M de ventas en 2024) pasa a actividad interrumpida y se vende en mayo de 2025 por 97,5 M EUR: 2024 y 2025 son operaciones continuadas; 2020-2023 incluyen Equipment. El crecimiento de 2024 no es comparable.' },
      { periodo: '2025', descripcion: 'MTech Systems pasa al 100 % (marzo de 2025; 1.150 M de salida de caja por compras) y Geoclima consolidada todo el año.' },
      { periodo: '2022', descripcion: 'Compra de la mayoría de MTech Systems (software avícola) y otras; 721 M de salida de caja por compras.' },
    ],
    confianza: 'Media',
  },
  trimestres: {
    items: [
      { periodo: '4T24', ingresos: 3923, crecimiento_pct: 20.9, crecimiento_organico_pct: 11, ebitda: 607, margen_ebitda_pct: 15.5, bpa: 0.85, vs_consenso: null },
      { periodo: '1T25', ingresos: 3714, crecimiento_pct: 17.8, crecimiento_organico_pct: 5, ebitda: 615, margen_ebitda_pct: 16.6, bpa: 1.05, vs_consenso: null },
      { periodo: '2T25', ingresos: 3606, crecimiento_pct: 10.7, crecimiento_organico_pct: 10, ebitda: 600, margen_ebitda_pct: 16.6, bpa: 0.97, vs_consenso: null },
      { periodo: '3T25', ingresos: 3798, crecimiento_pct: 16.7, crecimiento_organico_pct: 15, ebitda: 614, margen_ebitda_pct: 16.2, bpa: 1.05, vs_consenso: null },
      { periodo: '4T25', ingresos: 3594, crecimiento_pct: -8.4, crecimiento_organico_pct: -3, ebitda: 474, margen_ebitda_pct: 13.2, bpa: -0.06, vs_consenso: 'Inferior' },
      { periodo: '1T26', ingresos: 3580, crecimiento_pct: -3.6, crecimiento_organico_pct: 9, ebitda: 498, margen_ebitda_pct: 13.9, bpa: 0.68, vs_consenso: null },
      { periodo: '2T26', ingresos: 3805, crecimiento_pct: 5.5, crecimiento_organico_pct: 8, ebitda: 530, margen_ebitda_pct: 13.9, bpa: 1.11, vs_consenso: null },
      { periodo: '3T26', ingresos: 4473, crecimiento_pct: 17.8, crecimiento_organico_pct: 17, ebitda: 663, margen_ebitda_pct: 14.8, bpa: 1.16, vs_consenso: 'Superior' },
    ],
    confianza: 'Alta',
  },
  balance: {
    historico: historicoBalance,
    vencimientos: null,
    liquidez: 'Caja de 1.368 M SEK a 30-sep-26 (1.427 M a 30-jun); deuda con interés de 6.487 M (5.559 M a largo y 928 M a corto) más 2.029 M de arrendamientos (1.772 M en junio: Virginia); vida media de 2,5 años (2,9 en junio); programa de pagarés a medio plazo (MTN) de 5.000 M con dos bonos verdes de 1.000 M cada uno [A11, A1].',
    rating: 'Sin rating público (financiación bancaria y bonos verdes sin calificar en lo leído).',
    coste_deuda_pct: 5.5,
    vida_media_anios: 2.5,
    confianza: 'Alta',
  },
  flujos: { historico: historicoFlujos, confianza: 'Alta' },
  calidad: { auditor: 'Ernst & Young AB (socio firmante Andreas Troberg desde 2023)', anios_auditor: null, opinion: 'Favorable', confianza: 'Media' },
  capital: {
    politica: null,
    adquisiciones: [
      { anio: '2025', objetivo: 'MTech Systems (resto del capital; software avícola de la cadena alimentaria)', importe: 1150, ev_ebitda: null, financiacion: 'Deuda', resultado: 'FoodTech pasó de 553 M de ventas en 2022 a 1.753 M en 2025 con un margen EBITA ajustado del 17 %; 207 M de pagos contingentes como partidas no recurrentes en 2025 [A1, A7].' },
      { anio: '2024', objetivo: 'Geoclima (enfriadoras, Italia), AirPro Tech, Hotraco y la mayoría de Automated Environments', importe: 1680, ev_ebitda: null, financiacion: 'Deuda', resultado: 'Geoclima trajo las enfriadoras que hoy son el grueso de los pedidos de DCT, pero su traslado a Virginia y los aranceles han bajado el margen EBITA ajustado de DCT del 21 % al 9,7 % (3T26) [A1, A11].' },
      { anio: '2023', objetivo: 'Zeco (India) y otras', importe: 744, ev_ebitda: null, financiacion: 'Caja y deuda', resultado: 'Pequeñas; sin deterioros publicados [A3].' },
      { anio: '2022', objetivo: 'MTech Systems (mayoría) y otras', importe: 721, ev_ebitda: null, financiacion: 'Caja y deuda', resultado: 'Base del giro digital de FoodTech, que ahora se quiere vender [A3, A7].' },
      { anio: '2025', objetivo: 'Venta de FoodTech Equipment', importe: -1100, ev_ebitda: null, financiacion: 'Desinversión (97,5 M EUR en caja)', resultado: 'Pérdida de las actividades interrumpidas de 444 M en 2025 (deterioro de 346 M de fondo de comercio): la compra antigua no recuperó lo invertido [A1].' },
    ],
    confianza: 'Media',
  },
  fuentes: [{ id: 1, ...AR }, { id: 2, ...Q2 }, { id: 3, ...ESEF }, { id: 4, ...Q1 }, { id: 5, ...Q4 }, { id: 6, ...AR24 }, { id: 7, ...FOOD }, { id: 8, ...Q3 }, { id: 9, ...MFNCAL }, { id: 10, ...ORD2 }, { id: 11, ...Q3N }, { id: 12, ...CALL }, { id: 13, ...CALLT }, { id: 14, ...INFR }, { id: 15, ...Q3PR }],
  huecos: [
    { seccion: 'balance', campo: 'vencimientos', tipo: 'Complemento', intentos: '1) Nota 24 del informe anual 2025 (tabla de vencimientos no legible en el texto extraído); 2) informe del 3T26 (solo vida media de 2,5 años); 3) comunicados de los bonos verdes (solo plazos de cuatro años)', decision: 'Omitido' },
    { seccion: 'financieros', campo: 'serie reexpresada sin FoodTech Equipment de 2020-2023', tipo: 'Complemento', intentos: '1) Informe anual 2025 (solo ventas, EBITA y EBIT de 2022-2023 reexpresados, sin cuenta completa); 2) informe anual 2024 (sin reexpresar); 3) XBRL 2020-2024 (operaciones totales)', decision: 'Omitido' },
  ],
});

// ---------------- B. Sector y competencia ----------------
const MNM = { titulo: 'Data Center Cooling Market Estimated to Reach $29.6 billion by 2030 Globally at a CAGR of 12.8% (12.700 M USD en 2023)', editor: 'MarketsandMarkets (GlobeNewswire)', tipo: 'Sectorial', fecha: '2024-11-04', url: 'https://www.globenewswire.com/news-release/2024/11/04/2973741/0/en/Data-Center-Cooling-Market-Estimated-to-Reach-29-6-billion-by-2030-Globally-at-a-CAGR-of-12-8-says-MarketsandMarkets.html' };
const RNM = { titulo: 'Data Center Cooling Market Outlook 2030 (32.900 M USD en 2030; 13,1 % anual en 2025-2030)', editor: 'ResearchAndMarkets (GlobeNewswire)', tipo: 'Sectorial', fecha: '2025-03-05', url: 'https://www.globenewswire.com/news-release/2025/03/05/3037662/28124/en/Data-Center-Cooling-Market-Outlook-2030-Cooling-Technologies-Evolve-for-AI-HPC-Workloads-Market-Report-Future-Trends.html' };
const FICHA = { titulo: 'Ficha sectorial «Componentes de climatización (HVAC) y control de edificios» (sectores/climatizacion-hvac-2026-10-14.md)', editor: 'Análisis propio', tipo: 'Sectorial', fecha: '2026-10-14', url: 'https://github.com/HotisS/analisis-inversion/blob/main/sectores/climatizacion-hvac-2026-10-14.md' };
const EFN1 = { titulo: 'Förvaltaren positiv till Munters – trots smällarna (comentarios de Nvidia sobre chips que no necesitan enfriadoras; Carnegie rebaja)', editor: 'EFN', tipo: 'Prensa', fecha: '2026-01-10', url: 'https://efn.se/forvaltaren-positiv-till-munters-trots-smallarna' };
w('B', {
  historia: {
    resumen: null,
    hitos: [
      { anio: '1955', hito: 'Carl Munters funda la empresa en Estocolmo sobre su invento del rotor desecante, base de la deshumidificación de AirTech [B1].' },
      { anio: '2010', hito: 'Nordic Capital compra la compañía y la saca de bolsa [B1].' },
      { anio: '2017', hito: 'Vuelve a Nasdaq Estocolmo (mayo); FAM, el brazo inversor de las fundaciones Wallenberg, entra después como primer accionista [B1, B2].' },
      { anio: '2019', hito: 'Klas Forsström, de Sandvik, es nombrado consejero delegado [B1].' },
      { anio: '2022', hito: 'Compra de la mayoría de MTech Systems: FoodTech gira hacia el software [B1].' },
      { anio: '2024', hito: 'Compra de Geoclima (enfriadoras) y entrada en refrigeración líquida (CDU); fábrica nueva en Amesbury (EE. UU.) [B1].' },
      { anio: '2025', hito: 'Venta de FoodTech Equipment (97,5 M EUR); pedidos récord de DCT (13.889 M) [B1, A1].' },
      { anio: '2026', hito: 'Pedido de ≈2.000 M para una «fábrica de IA» (abril), estudio de venta de FoodTech (junio), Stefan Aspman consejero delegado (14-sep), pedidos récord de 7.070 M en el 3T (cartera de 27.851 M) y día del inversor el 11-nov [A10, A7, B3, A11, B4].' },
    ],
    confianza: 'Media',
  },
  sector: {
    definicion: null,
    tamano: 'Refrigeración de centros de datos: 12.700 M USD en 2023 y 29.600 M USD en 2030 [B5]; 32.900 M USD en 2030 según otra fuente [B6]. ≈160.000 M SEK en 2025 (estimación propia).',
    unidad_serie: 'millones de USD (refrigeración de centros de datos, MarketsandMarkets)',
    serie: [{ anio: '2023', tamano: 12700 }, { anio: '2030e', tamano: 29600 }],
    tcac_historico_pct: null,
    tcac_previsto_pct: 12.8,
    cr5_pct: null,
    estructura: 'Moderadamente concentrada',
    confianza: 'Media',
  },
  competencia: { cuota_pct: 3.7, competidores: null, confianza: 'Media' },
  esg: { calificaciones: [], confianza: 'Media' },
  fuentes: [{ id: 1, ...AR }, { id: 2, ...Q2 }, { id: 3, ...CEO }, { id: 4, ...CMD }, { id: 5, ...MNM }, { id: 6, ...RNM }, { id: 7, ...FICHA }, { id: 8, ...EFN1 }, { id: 9, ...DALE }],
  huecos: [
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) Informe de sostenibilidad 2025 (sin calificaciones de terceros, solo objetivos validados por SBTi); 2) MSCI/Sustainalytics (sin acceso gratuito); 3) prensa (nada fechado)', decision: 'Omitido' },
    { seccion: 'sector', campo: 'cr5_pct', tipo: 'Complemento', intentos: '1) MarketsandMarkets (lista de jugadores sin cuotas); 2) ResearchAndMarkets (sin cuotas en el resumen); 3) ficha sectorial propia (sin CR5)', decision: 'Omitido' },
  ],
});

// ---------------- C. Equipo y gobierno ----------------
const ROBUR = { titulo: 'Swedbank Robur cuts stake in Munters (4,83 % del capital y de los votos a 2-oct-2026, por debajo del umbral del 5 %)', editor: 'MarketScreener (Finwire)', tipo: 'Prensa', fecha: '2026-10-05', url: 'https://www.marketscreener.com/news/swedbank-robur-cuts-stake-in-munters-ce785dd8d98af425' };
const FI = { titulo: 'Registro de operaciones de directivos (Insynshandel) de Finansinspektionen, Munters Group AB, oct-2025 a oct-2026 (última operación el 10-ago-2026; ninguna tras el 3T26; consultado el 26-oct)', editor: 'Finansinspektionen', tipo: 'Primaria', fecha: '2026-10-26', url: 'https://marknadssok.fi.se/publiceringsklient/en-GB/Search/Search?SearchFunctionType=Insyn&Utgivare=Munters%20Group%20AB' };
w('C', {
  directivos: {
    equipo: [
      { nombre: 'Stefan Aspman', cargo: 'Consejero delegado', desde: '2026', participacion_pct: 0.01, trayectoria: 'Antes presidente de DCT, la división que pasó de 702 M de ventas en 2021 a 5.906 M en 2025; sustituye a Forsström desde el 14-sep-2026, un mes antes de lo anunciado. Compró 2.200 acciones a 179,60 SEK el 17-jul-26. Su primer trimestre completo (3T26) trajo pedidos récord de 7.070 M y un margen de DCT del 9,7 % [C2, C3, C6].' },
      { nombre: 'Katharina Fischer', cargo: 'Directora financiera', desde: '2023', participacion_pct: 0.0, trayectoria: 'Casi 20 años en Electrolux (última responsabilidad: contabilidad del grupo); compró 2.491 acciones a 183,11 SEK en jul-26 [C1, C3].' },
      { nombre: 'Magnus Nicolin', cargo: 'Presidente del consejo', desde: '2022', participacion_pct: 0.16, trayectoria: 'Antiguo consejero delegado de Ansell; consejero de FAM. 30.000 acciones y opciones de compra sobre 267.522 [C1].' },
      { nombre: 'Klas Forsström', cargo: 'Consejero delegado saliente', desde: '2019', participacion_pct: 0.11, trayectoria: 'De Sandvik; con él las ventas pasaron de 7.015 M (2020) a 14.712 M (2025) y la cartera de pedidos a 24.542 M, pero el margen EBITA ajustado cayó al 12,7 % en 2025 frente al objetivo de más del 14 %. 195.600 acciones [C1].' },
      { nombre: 'Frank Pellegrino', cargo: 'Presidente de DCT', desde: '2026', participacion_pct: 0.0, trayectoria: 'Más de 13 años en Munters; construyó el negocio de centros de datos desde 2016 [A2].' },
      { nombre: 'Andrew Cook', cargo: 'Presidente de AirTech', desde: '2026', participacion_pct: 0.0, trayectoria: '26 años en Munters, antes responsable de AirTech en América; sustituye a Henrik Teiwik [C2].' },
    ],
    historial_guidance: [
      { anio: '2023', guia: 'Objetivo a medio plazo de margen EBITA ajustado > 14 % y crecimiento sin divisa > 10 %', real: 'Margen 14,1 % y crecimiento sin divisa del 40 % (con compras)', cumplida: 'Sí' },
      { anio: '2024', guia: 'Crecimiento sin divisa > 14 % (objetivo elevado) y margen > 14 %', real: 'Margen 15,5 %; crecimiento sin divisa de las continuadas ≈ +12 %', cumplida: 'Parcial' },
      { anio: '2025', guia: 'Margen EBITA ajustado > 14 %', real: '12,7 %', cumplida: 'No' },
      { anio: '2026', guia: 'Ventas al alza y margen EBITA ajustado mejor en el 2S26 (jul-26; mantenida el 23-oct)', real: '3T26: ventas +18 % y margen del 12,2 % (11,0 % en el 2T y 13,5 % en el 3T25); falta el 4T', cumplida: 'Parcial' },
    ],
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Magnus Nicolin', cargo: 'Presidente', tipo: 'Dominical', desde: '2022', comisiones: 'Remuneraciones (presidente), Inversiones' },
      { nombre: 'Kristian Sildeby', cargo: 'Consejero', tipo: 'Dominical', desde: '2017', comisiones: 'Auditoría, Remuneraciones, Inversiones' },
      { nombre: 'Helen Fasth Gillstedt', cargo: 'Consejera', tipo: 'Independiente', desde: '2017', comisiones: 'Auditoría (presidenta)' },
      { nombre: 'Anders Lindqvist', cargo: 'Consejero', tipo: 'Independiente', desde: '2022', comisiones: 'Remuneraciones' },
      { nombre: 'Maria Håkansson', cargo: 'Consejera', tipo: 'Independiente', desde: '2022', comisiones: 'Auditoría' },
      { nombre: 'Sabine Simeon-Aissaoui', cargo: 'Consejera', tipo: 'Independiente', desde: '2023', comisiones: 'Inversiones (presidenta)' },
      { nombre: 'Elizabeth Carey Nugent', cargo: 'Consejera', tipo: 'Independiente', desde: '2024', comisiones: 'Inversiones' },
      { nombre: 'Stephanie Dismore', cargo: 'Consejera', tipo: 'Independiente', desde: '2026', comisiones: '' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: false, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: true, presidente_vinculado_control: true, cambios_cupula_24m: 1,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 26.45, fijo: 8.93, variable_corto: 14.06, variable_largo: null, ratio_salario_medio: null },
    accionistas: [
      { nombre: 'FAM AB (fundaciones Wallenberg)', pct: 28.3, tipo: 'Referencia', variacion: 'Estable' },
      { nombre: 'Swedbank Robur Fonder', pct: 5.3, tipo: 'Institucional', variacion: 'Del 6,9 % del informe anual al 4,83 % el 2-oct-2026 (aviso por bajar del 5 %) [C5]; 5,3 % a 30-sep según la lista de Modular Finance del informe del 3T [C6]' },
      { nombre: 'Cuarto Fondo de Pensiones (AP4)', pct: 6.1, tipo: 'Institucional', variacion: 'n.d.' },
      { nombre: 'ODIN Fonder', pct: 3.1, tipo: 'Institucional', variacion: 'n.d.' },
      { nombre: 'Vanguard', pct: 3.0, tipo: 'Institucional', variacion: 'n.d.' },
      { nombre: 'Nordea Fonder', pct: 2.8, tipo: 'Institucional', variacion: 'n.d.' },
      { nombre: 'Tercer Fondo de Pensiones (AP3)', pct: 2.9, tipo: 'Institucional', variacion: 'n.d.' },
      { nombre: 'Autocartera', pct: 1.04, tipo: 'Autocartera', variacion: '1.916.377 acciones de 184.457.817' },
    ],
    insiders: [
      { fecha: '2026-08-10', persona: 'Grete Solvang Stoltz (dirección)', operacion: 'Compra', acciones: 2065, importe: 0.37 },
      { fecha: '2026-07-29', persona: 'Henrik Teiwik (dirección)', operacion: 'Compra', acciones: 1300, importe: 0.21 },
      { fecha: '2026-07-24', persona: 'Henrik Teiwik (dirección)', operacion: 'Compra', acciones: 800, importe: 0.14 },
      { fecha: '2026-07-23', persona: 'Katharina Fischer (directora financiera)', operacion: 'Compra', acciones: 2491, importe: 0.46 },
      { fecha: '2026-07-20', persona: 'Elizabeth Carey (consejera)', operacion: 'Compra', acciones: 500, importe: 0.09 },
      { fecha: '2026-07-20', persona: 'Susann Johnsson (dirección)', operacion: 'Compra', acciones: 1095, importe: 0.20 },
      { fecha: '2026-07-17', persona: 'Stefan Aspman (consejero delegado entrante)', operacion: 'Compra', acciones: 2200, importe: 0.40 },
      { fecha: '2026-07-17', persona: 'Henrik Teiwik (dirección)', operacion: 'Compra', acciones: 850, importe: 0.15 },
      { fecha: '2026-07-17', persona: 'Kaspar Kirchmann (dirección)', operacion: 'Compra', acciones: 1229, importe: 0.22 },
    ],
    alertas: [
      'Cambio de consejero delegado adelantado al 14-sep-2026 y salida del presidente de AirTech y de la directora de comunicación el mismo día [C2].',
      'La junta de 2026 autorizó emitir hasta 18.445.781 acciones (10 % del capital) sin derecho de suscripción preferente: dilución posible si hay compras [C4].',
    ],
    confianza: 'Media',
  },
  fuentes: [{ id: 1, ...AR }, { id: 2, ...CEO }, { id: 3, ...FI }, { id: 4, ...AGM }, { id: 5, ...ROBUR }, { id: 6, ...Q3N }],
  huecos: [
    { seccion: 'gobierno', campo: 'voto de la junta sobre remuneraciones', tipo: 'Complemento', intentos: '1) Boletín de la junta de 2026 (no da porcentajes); 2) informe de gobierno 2025 (sin recuento); 3) acta de la junta (no localizada)', decision: 'Omitido' },
  ],
});

// ---------------- D. Mercado y valoración ----------------
const YB = { titulo: 'Históricos diarios de MTRS.ST, ^OMX y EXH4.DE (precio, rango, volumen, betas, cierres de ejercicio; cierre del viernes 23-oct-2026, primer cierre tras el 3T26)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-23', url: 'https://finance.yahoo.com/quote/MTRS.ST/history' };
const YC = { titulo: 'Fichas de Munters y de los comparables (quoteSummary y series fundamentales; PER adelantado, objetivo medio de los analistas; consulta del 26-oct-2026: EE. UU. al cierre del 23-oct, suecas en sesión)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-26', url: 'https://finance.yahoo.com/quote/MTRS.ST/analysis' };
const MS = { titulo: 'Munters Group AB: finances (estimaciones 2026-2028 de ventas, EBITDA, EBIT, beneficio, BPA, dividendo y deuda neta; 8 analistas, objetivo medio 206,25 SEK; página con datos al 16-oct, sin actualizar tras el 3T26)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-26', url: 'https://www.marketscreener.com/quote/stock/MUNTERS-GROUP-AB-34973373/finances/' };
const RB = { titulo: 'Rendimiento del bono del Estado sueco a 10 años (SEGVB10YC), 23-oct-2026: 3,112 %', editor: 'Sveriges Riksbank', tipo: 'Primaria', fecha: '2026-10-23', url: 'https://api.riksbank.se/swea/v1/Observations/SEGVB10YC/2026-10-15/2026-10-26' };
const ECB = { titulo: 'Tipos de cambio de referencia del euro, 23-oct-2026 (11,131 SEK; 1,1193 USD)', editor: 'Banco Central Europeo', tipo: 'Primaria', fecha: '2026-10-23', url: 'https://data-api.ecb.europa.eu/service/data/EXR/D.SEK.EUR.SP00.A' };
const DAM = { titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026: 4,20 %', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' };
const VRT = { titulo: 'Informe value de Vertiv (7-oct-2026): transacciones de refrigeración y energía de centros de datos con múltiplos (Boyd, Fibrebond, PurgeRite, UIG, Motivair)', editor: 'Análisis propio', tipo: 'Analistas', fecha: '2026-10-07', url: 'https://github.com/HotisS/analisis-inversion/tree/main/informes/vertiv-2026-10-07' };
const DAI = { titulo: 'Informe value de Daikin (14-oct-2026): transacciones de climatización (Viessmann Climate Solutions, Boyd Thermal)', editor: 'Análisis propio', tipo: 'Analistas', fecha: '2026-10-14', url: 'https://github.com/HotisS/analisis-inversion/tree/main/informes/daikin-2026-10-14' };
const SEB = { titulo: 'Munters: SEB sänker riktkursen (230 → 210 SEK, compra; subida de producción de DCT en EE. UU. más incierta)', editor: 'Placera (Nyhetsbyrån Direkt)', tipo: 'Prensa', fecha: '2026-09-28', url: 'https://www.placera.se/telegram/munters-seb-sanker-riktkurs-ser-osakrare-dct-produktionsokning-usa-20260928' };
const SHB = { titulo: 'Handelsbanken sänker riktkursen för Munters, men tror på återhämtning i DCT-marginalerna (230 → 200 SEK, compra)', editor: 'Placera', tipo: 'Prensa', fecha: '2026-09-30', url: 'https://www.placera.se/telegram/munters-handelsbanken-sanker-riktkursen-for-munters-men-tror-pa-aterhamtning-i-dct-marginalerna-20260930' };
const SB1 = { titulo: 'Munters: högre riskpremie DCT-marginal bakom sänkt riktkurs (SB1 Markets, 230 → 200 SEK)', editor: 'Placera', tipo: 'Prensa', fecha: '2026-10-07', url: 'https://www.placera.se/telegram/munters-hogre-riskpremie-dct-marginal-bakom-sankt-riktkurs-sb1-20261007' };
const PAR = { titulo: 'Pareto upprepar köp för Munters men sänker riktkursen till 240 kronor (260 → 240; 3T: margen EBITA esperado del 12,5 %)', editor: 'Placera (Finwire)', tipo: 'Prensa', fecha: '2026-10-12', url: 'https://www.placera.se/telegram/munters-pareto-upprepar-kop-for-munters-men-sanker-riktkursen-till-240-kronor-20261012' };
const UBS = { titulo: 'UBS flags Swedish industrial favorites ahead of earnings (UBS reitera compra en Munters con objetivo de 245 SEK)', editor: 'MarketScreener (Finwire)', tipo: 'Prensa', fecha: '2026-10-14', url: 'https://www.marketscreener.com/news/ubs-flags-swedish-industrial-favorites-ahead-of-earnings-ce785dd2df8cf123' };
const SPER = { titulo: 'Reports: Munters sets deadline for indicative bids for Speria - EFN (ofertas indicativas a finales de octubre; valoraciones de 4.000-6.000 M SEK de Pareto, 4.100-5.500 M de Nordea y 3.900-5.100 M de Bloomberg Intelligence)', editor: 'MarketScreener (Finwire, según EFN)', tipo: 'Prensa', fecha: '2026-10-16', url: 'https://www.marketscreener.com/news/reports-munters-sets-deadline-for-indicative-bids-for-speria-efn-ce785cdad880f420' };
const CORT = { titulo: 'Blankningsregistret: Munters Group AB, suma de posiciones cortas netas 5,4 % del capital a 21-oct-2026 (nominativas ≥ 0,5 %: Eleva Capital 0,71 % a 1-oct-2026; Millennium 0,59 % a 19-oct-2026)', editor: 'Finansinspektionen', tipo: 'Primaria', fecha: '2026-10-26', url: 'https://www.fi.se/sv/vara-register/blankningsregistret/emittent?id=549300KYCB37YAVUV523' };
const B = JSON.parse(readFileSync(join(DIR, 'bolsa.json'), 'utf8'));
const C = JSON.parse(readFileSync(join(DIR, 'comparables-yahoo.json'), 'utf8'));
const cierres = Object.fromEntries(B.cierres_ejercicio.map((c) => [c.anio, c.precio_cierre]));
const comps = C.empresas.filter((e) => e.nombre !== 'Munters').map(({ _precio, _divisa, _objetivo, _n, _rec, _beta, ...e }) => e);
const USD = 9.945, EUR = 11.131;
w('D', {
  identificacion: {
    nombre: 'Munters Group AB (publ)', nombre_corto: 'Munters', ticker: 'MTRS', isin: 'SE0009806607', mercado: 'Nasdaq Stockholm (Large Cap)', indice_referencia: 'OMX Stockholm 30',
    pais: 'Suecia', pais_iso: 'SE', sector: 'Industria', industria: 'Productos de construcción (climatización)', sede: 'Kista, Estocolmo (Suecia)', fundacion: '1955', empleados: 5511, web: 'www.munters.com',
    precio: 131.45, fecha_precio: '2026-10-23', acciones: 182.541, capitalizacion_publicada: 23922, free_float_pct: 71.0,
    max_52s: 212.4, min_52s: 124.5, volumen_medio_diario: '≈ 102 M SEK/día (3 meses)', proximos_resultados: '2027-01-28',
  },
  consenso: {
    estimaciones: [
      { periodo: '2026e', ingresos: 16850, ebitda: 2458, ebit: 1728, bpa: 4.94, dpa: 1.61, fuente: 'MarketScreener, 8 analistas, anterior al 3T26 (exige un BPA de 1,99 en el 4T frente a 2,95 en nueve meses) [D3, D18]' },
      { periodo: '2027e', ingresos: 21266, ebitda: 3709, ebit: 2851, bpa: 9.67, dpa: 2.83, fuente: 'MarketScreener [D3]; PER adelantado de Yahoo 13,1x el 26-oct (≈10,0 SEK de BPA a 12 meses) [D2]' },
      { periodo: '2028e', ingresos: 23700, ebitda: 4353, ebit: 3440, bpa: 12.17, dpa: 3.55, fuente: 'MarketScreener [D3]' },
    ],
    recomendaciones: { n_analistas: 8, comprar: null, mantener: null, vender: null, po_medio: 206.25, po_min: 155, po_max: 245 },
    base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: 1.5,
    confianza: 'Media',
  },
  bolsa: { ...B.bolsa, beta: 1.1, volatilidad_pct: 47.8, max_drawdown_pct: -62.5, posicion_corta_pct: 5.4, confianza: 'Alta' },
  multiplos_historicos: {
    serie: ['2020', '2021', '2022', '2023', '2024', '2025'].map((anio) => ({ anio, precio_cierre: cierres[anio], ev_ebitda_ntm: null, per_ntm: null, excluir: anio === '2025' })),
    confianza: 'Media',
  },
  comparables: { empresas: comps, confianza: 'Media' },
  transacciones: {
    operaciones: [
      { fecha: '2025-11', objetivo: 'Boyd Thermal (refrigeración líquida, EE. UU.)', comprador: 'Eaton', ev: Math.round(9500 * USD), ev_ventas: 5.59, ev_ebitda: 22.5, prima_pct: null, excluir: false, comentario: '9.500 M USD; 22,5x el EBITDA ajustado de 2026e; ventas de 1.700 M USD en 2026e [D7].' },
      { fecha: '2026-09', objetivo: 'UtilityInnovation Group (energía y refrigeración modular para centros de datos)', comprador: 'Vertiv', ev: Math.round(1450 * USD), ev_ventas: null, ev_ebitda: 13.0, prima_pct: null, excluir: false, comentario: '1.450 M USD más hasta 1.150 M de pago aplazado; ≈13x el EBITDA de 2027e [D7].' },
      { fecha: '2025-11', objetivo: 'PurgeRite (servicios de refrigeración líquida)', comprador: 'Vertiv', ev: Math.round(1000 * USD), ev_ventas: null, ev_ebitda: 10.0, prima_pct: null, excluir: false, comentario: '≈10x el EBITDA de 2026e con sinergias [D7].' },
      { fecha: '2025-03', objetivo: 'Fibrebond (salas eléctricas modulares)', comprador: 'Eaton', ev: Math.round(1400 * USD), ev_ventas: 3.7, ev_ebitda: 12.7, prima_pct: null, excluir: false, comentario: 'EBITDA ajustado de 2025e de 110 M USD [D7].' },
      { fecha: '2023-04', objetivo: 'Viessmann Climate Solutions (bombas de calor)', comprador: 'Carrier', ev: Math.round(12000 * EUR), ev_ventas: 3.0, ev_ebitda: 17.1, prima_pct: null, excluir: false, comentario: '12.000 M EUR; 13x con sinergias según Carrier, ≈17x sin ellas [D8].' },
      { fecha: '2025-05', objetivo: 'FoodTech Equipment (equipos para granjas)', comprador: 'Comprador financiero (venta de Munters)', ev: Math.round(97.5 * EUR), ev_ventas: 0.57, ev_ebitda: null, prima_pct: null, excluir: true, comentario: '97,5 M EUR en caja por un negocio con 1.900 M SEK de ventas en 2024: negocio con pérdidas, no comparable [A1].' },
    ],
    confianza: 'Media',
  },
  fuentes: [{ id: 1, ...YB }, { id: 2, ...YC }, { id: 3, ...MS }, { id: 4, ...RB }, { id: 5, ...ECB }, { id: 6, ...DAM }, { id: 7, ...VRT }, { id: 8, ...DAI }, { id: 9, ...MFNCAL }, { id: 10, ...SEB }, { id: 11, ...SHB }, { id: 12, ...SB1 }, { id: 13, ...PAR }, { id: 14, ...Q2 }, { id: 15, ...UBS }, { id: 16, ...SPER }, { id: 17, ...CORT }, { id: 18, ...Q3N }, { id: 19, ...INFR }, { id: 20, ...CALLT }],
  huecos: [
    { seccion: 'consenso', campo: 'estimaciones posteriores al 3T26', tipo: 'Complemento', intentos: '1) MarketScreener (finances y consensus: datos al 16-oct, 8 analistas, sin revisar tras el 23-oct); 2) Yahoo Finance (objetivo medio 206,25 con 8 analistas, igual); 3) prensa sueca e inglesa (Privata Affärer, Affärsvärlden, Placera, Börsvärlden: solo el consenso Infront del trimestre, sin cambios de objetivo publicados del 23 al 26-oct)', decision: 'Omitido' },
    { seccion: 'consenso', campo: 'reparto de recomendaciones', tipo: 'Complemento', intentos: '1) MarketScreener (solo «Comprar» de media y 8 analistas); 2) Yahoo (recomendación media sin reparto); 3) prensa sueca (SEB, Handelsbanken, Pareto y SB1 en compra; Carnegie en venta o mantener; Kepler mantener; Jefferies 155 SEK)', decision: 'Omitido' },
  ],
});

// ---------------- E. Sentimiento ----------------
const PLAC = { titulo: 'Placera: telegramas y debate de lectores sobre Munters (recortes de objetivo de SEB, Handelsbanken, SB1, Nordea y Pareto, sep-oct 2026; «Munters: Med en rejäl att-göra-lista», 18-sep)', editor: 'Placera', tipo: 'Foros y redes', fecha: '2026-10', url: 'https://www.placera.se/telegram/munters-pareto-upprepar-kop-for-munters-men-sanker-riktkursen-till-240-kronor-20261012' };
const TITU = { titulo: 'Titulares de prensa y blogs sobre Munters del 23 al 24-oct-2026 (Di: «Placerarna gjorde bort sig i Munters», «Munters lyfter efter orderkross»; EFN: «Storbanken om Munters: Köp vid nedgång», «Munters nya vd: Inte vaccinerade mot AI-turbulens»; Simply Wall St: «What Munters Group Investors Missed Before The Fall»), recogidos con herramientas/noticias.mjs', editor: 'Google Noticias (varios medios)', tipo: 'Foros y redes', fecha: '2026-10-24', url: 'https://news.google.com/search?q=Munters' };
const SUBS = { titulo: 'Munters Group ($MTRS) Deep Dive: «The AI Cooling Boom Is Real. The Valuation Is Harder.»', editor: 'Critical Nodes (Substack)', tipo: 'Foros y redes', fecha: '2026-07-21', url: 'https://criticalnodes.substack.com/p/munters-group-mtrs-deep-dive' };
const TRD = { titulo: 'Munters aktie 2026/2027: riktkurs, teknisk analys y blankning (señal técnica «starkt sälj», 35/100; cortos del 5,4 %)', editor: 'TradeDesk', tipo: 'Foros y redes', fecha: '2026-10-26', url: 'https://tradedesk.se/aktier/mtrs.st' };
const SAF = { titulo: 'Seeking Alpha, canal de Munters (MMNNF): transcripción del 3T26 (23-oct) y «Munters: FoodTech Divestment Could Turbocharge Its Data Center Growth Engine» (14-jul)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-23', url: 'https://seekingalpha.com/api/sa/combined/MMNNF.xml' };
w('E', {
  sentimiento: {
    tono: 'Dividido', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Prensa y blogs suecos tras el 3T26 (Di, EFN, Simply Wall St)', fecha: '2026-10', n_comentarios: 0, tono: 'Positivo', resumen: 'Los titulares del 23-24 de octubre leen el trimestre como un «aplastamiento» de pedidos que deja en mal lugar a quienes vendieron; un banco recomienda comprar en las caídas y el nuevo consejero delegado admite que no están «vacunados» contra los vaivenes de la IA [E2].' },
      { plataforma: 'Placera (telegramas y comentarios)', fecha: '2026-10', n_comentarios: 0, tono: 'Dividido', resumen: 'Antes del 3T los analistas rebajaron objetivos manteniendo la compra; el debate giraba en torno a una «lista de tareas» larga (Virginia, componentes, aranceles) [E1].' },
      { plataforma: 'TradeDesk (análisis técnico y cortos)', fecha: '2026-10', n_comentarios: 0, tono: 'Negativo', resumen: 'Señal técnica de venta fuerte (bajo las medias de 50 y 200 sesiones) y posiciones cortas del 5,4 %, que el portal califica de altas [E4].' },
      { plataforma: 'Seeking Alpha y Substack (inversores en inglés)', fecha: '2026-07', n_comentarios: 0, tono: 'Dividido', resumen: 'La tesis de la refrigeración para IA se da por buena, pero «la recuperación del margen por la que pagan los inversores no ha llegado»; otro autor ve en la venta de FoodTech el dinero para crecer en DCT [E3, E5].' },
    ],
    temas: [
      { tema: 'Pedidos récord frente a márgenes', postura: 'Dividida', peso: 'Alto', contraste: 'Los pedidos son reales (7.070 M en el trimestre, cartera de 27.851 M), pero el margen de DCT bajó al 9,7 % y el flujo operativo fue de −216 M [A11].' },
      { tema: 'Posiciones cortas altas', postura: 'Bajista', peso: 'Medio', contraste: 'El registro de FI suma un 5,4 % del capital en corto a 21-oct (solo dos fondos por encima del 0,5 %): es una apuesta contra la ejecución de Virginia, no contra la demanda [D17].' },
      { tema: 'IA y enfriadoras', postura: 'Dividida', peso: 'Medio', contraste: 'Las enfriadoras y las CDU son el grueso de la cartera de DCT; la empresa dice que los clientes que no han pedido ya llegan tarde para 2027 [A12, A13].' },
      { tema: 'Venta de FoodTech (Speria)', postura: 'Alcista', peso: 'Medio', contraste: 'Ofertas indicativas a final de octubre y cierre previsto a fin de año «según plan»; a 15-20 veces su EBITA de 288 M cubriría buena parte de la deuda neta de 7.412 M [A11, A13, D16].' },
    ],
    confianza: 'Baja',
  },
  fuentes: [{ id: 1, ...PLAC }, { id: 2, ...TITU }, { id: 3, ...SUBS }, { id: 4, ...TRD }, { id: 5, ...SAF }],
  huecos: [
    { seccion: 'sentimiento', campo: 'foros de particulares', tipo: 'Complemento', intentos: '1) Reddit y Stocktwits (bloqueado / símbolo MMNNF no encontrado); 2) foro de Avanza y comentarios de Placera (no abren sin sesión); 3) Affärsvärlden y EFN (muro de pago; solo titulares)', decision: 'Calculado y marcado como estimación' },
  ],
});
console.log('Notas A-E escritas');
