// Escribe las notas A-E de Mycronic (corte 2026-10-20) a partir de los documentos de notas/docs (informes anuales 2021,
// 2023, 2024 y 2025; informes trimestrales del 3T24 al 2T26; comunicados de MFN), del XBRL ESEF (cuentas-xbrl.json), de
// bolsa.json, de yahoo-datos.json y competidores-yahoo.json (Yahoo, 20-oct-2026 ≈ 09:42 UTC). Cada nota cita solo con [n]
// de su propia lista de fuentes. Ejecutar: node informes/mycronic-2026-10-20/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const lee = (f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const r1 = (x) => (x == null ? null : Math.round(x * 10) / 10);
const r2 = (x) => (x == null ? null : Math.round(x * 100) / 100);
const B = lee('bolsa.json');
const Y = lee('yahoo-datos.json').datos;
const CY = lee('competidores-yahoo.json').datos;
const MFN = 'https://storage.mfn.se';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Annual Report 2025 (cuentas consolidadas, notas 6, 7, 19, 21, 23, 26, 34 y 35; resumen de diez años)', editor: 'Mycronic AB (publ)', tipo: 'Primaria', fecha: '2026-04-01', url: `${MFN}/74466bcb-9f6d-45f8-9c6a-71c20d3e0d6e/annual-report-2025.pdf` },
  { id: 2, titulo: 'Interim Report January-June 2026 (cuentas del semestre, divisiones, cartera de pedidos de Pattern Generators, compras de ETZ y Cowin DST, datos trimestrales)', editor: 'Mycronic AB (publ)', tipo: 'Primaria', fecha: '2026-07-14', url: `${MFN}/c8f3d92b-f205-4f1a-9552-77f0d11afede/interim-report-january-june-2026.pdf` },
  { id: 3, titulo: 'Interim Report January-March 2026', editor: 'Mycronic AB (publ)', tipo: 'Primaria', fecha: '2026-04-24', url: `${MFN}/fc37436b-e2f2-4f49-9f06-cc710a20f428/interim-report-january-march-2026.pdf` },
  { id: 4, titulo: 'Year-end Report January-December 2025', editor: 'Mycronic AB (publ)', tipo: 'Primaria', fecha: '2026-02-05', url: `${MFN}/41c3f8b1-a8ec-44f6-9e70-2c87b6e2c154/year-end-report-january-december-2025.pdf` },
  { id: 5, titulo: 'Interim Report January-September 2025', editor: 'Mycronic AB (publ)', tipo: 'Primaria', fecha: '2025-10-23', url: `${MFN}/4187001e-7585-471a-99df-a05da8c2a81a/interim-report-january-september-2025.pdf` },
  { id: 6, titulo: 'Interim Report January-June 2025', editor: 'Mycronic AB (publ)', tipo: 'Primaria', fecha: '2025-07-11', url: `${MFN}/20ebf2ea-548e-4ebd-b63e-1ca3cd5ab9ff/interim-report-january-june-2025.pdf` },
  { id: 7, titulo: 'Interim Report January-March 2025', editor: 'Mycronic AB (publ)', tipo: 'Primaria', fecha: '2025-04-25', url: `${MFN}/5230bfda-11ee-4dc6-b008-a7c32b1a0457/interim-report-january-march-2025.pdf` },
  { id: 8, titulo: 'Year-end Report January-December 2024', editor: 'Mycronic AB (publ)', tipo: 'Primaria', fecha: '2025-02-06', url: `${MFN}/38f354ea-44e6-4b34-86d2-2f3ce946d3d3/year-end-report-january-december-2024.pdf` },
  { id: 9, titulo: 'Interim Report January-September 2024', editor: 'Mycronic AB (publ)', tipo: 'Primaria', fecha: '2024-10-24', url: `${MFN}/a33f0c8b-0e01-46a9-b3fb-41781fb25e04/interim-report-january-september-2024.pdf` },
  { id: 10, titulo: 'Annual and Sustainability Report 2024 (divisiones 2022-2024)', editor: 'Mycronic AB (publ)', tipo: 'Primaria', fecha: '2025-04-01', url: `${MFN}/a/mycronic/9886c5d7-0cee-4544-bb56-c531ef7da1bc/annual-and-sustainability-report-2024.pdf` },
  { id: 11, titulo: 'Annual and Sustainability Report 2023 (cuenta 2022-2023, nota 19 de intangibles y fondo de comercio, divisiones 2021-2023)', editor: 'Mycronic AB (publ)', tipo: 'Primaria', fecha: '2024-04', url: `${MFN}/13cdbaea-e787-4cb7-99cf-bb350135e30b/annual-and-sustainability-report-2023.pdf` },
  { id: 12, titulo: 'Årsredovisning 2021 (ESEF): cuenta, balance y notas de 2020-2021', editor: 'Mycronic AB (publ) / filings.xbrl.org', tipo: 'Primaria', fecha: '2022-03', url: 'https://filings.xbrl.org/549300S5CCFESE4C6Y07/2021-12-31/ESEF/SE/0/mycr-2021-12-31-sv/reports/mycr-2021-12-31-sv.xhtml' },
  { id: 13, titulo: 'Informes anuales ESEF 2021-2024 en XBRL (cuenta, balance, flujos, existencias, anticipos de clientes)', editor: 'XBRL International, filings.xbrl.org (LEI 549300S5CCFESE4C6Y07)', tipo: 'Primaria', fecha: '2025-04', url: 'https://filings.xbrl.org/549300S5CCFESE4C6Y07/2024-12-31/ESEF/SE/0/Mycronic-2024-12-31-0-sv.json' },
  { id: 14, titulo: 'Mycronic executes share split and determines record date (desdoblamiento 2 por 1, 195.833.018 acciones)', editor: 'Mycronic AB (publ)', tipo: 'Primaria', fecha: '2025-05-27', url: `${MFN}/f549412e-e8a8-4084-ab36-a78ef700b2cb/mycronic-executes-share-split-and-determines-record-date.pdf` },
  { id: 15, titulo: 'Modular Finance IR Consensus: consenso de Mycronic antes de los resultados del 1T25 al 3T26 (ventas y EBIT trimestrales)', editor: 'Modular Finance (vía Inderes)', tipo: 'Analistas', fecha: '2026-10-19', url: 'https://www.inderes.se/en/releases/modular-finance-ir-consensus-mycronic-consensus-estimates-q3-2026' },
  { id: 16, titulo: 'Mycronic lyfter tvåsiffrigt – analyshuset upprepar Neutral (2T26: ventas 7 % y pedidos 37 % sobre lo esperado)', editor: 'Aktiespararna', tipo: 'Prensa', fecha: '2026-07-14', url: 'https://www.aktiespararna.se/nyheter/mycronic-lyfter-tvasiffrigt-analyshuset-upprepar-neutral' },
  { id: 17, titulo: 'Global Technologies acquires Surfx in the US; Pattern Generators makes acquisition in South Korea (Cowin DST); Global Technologies makes acquisition in Germany (ETZ)', editor: 'Mycronic AB (publ)', tipo: 'Primaria', fecha: '2026-01-02', url: `${MFN}/81679e42-404f-480c-b9c1-a0b65d1097ee/global-technologies-makes-acquisition-in-germany.pdf` },
];

// Cuenta: 2020-2021 del informe anual 2021 (ESEF) [12]; 2022-2023 del informe anual 2023 [11]; 2024-2025 del informe
// anual 2025 [1]; EBITDA y BPA (reexpresado por el desdoblamiento 2x1 de junio de 2025 [14]) del resumen de diez años [1].
// gastos_generales = ventas + administración. Signos del prompt (gastos en positivo; minoritarios = resultado atribuido).
const cuenta = [
  { periodo: '2020', ingresos: 3882, coste_ventas: 1802, gastos_generales: 671, ebitda: 1112, amortizaciones: 214, ebit: 898, resultado_financiero: -8, bai: 890, impuestos: 187, minoritarios: 9, beneficio_neto: 694, gastos_financieros: 14, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 3.55, dpa: 1.50, dpa_extraordinario: 0, acciones_diluidas: 195.5 },
  { periodo: '2021', ingresos: 4635, coste_ventas: 2351, gastos_generales: 769, ebitda: 1254, amortizaciones: 205, ebit: 1049, resultado_financiero: -3, bai: 1046, impuestos: 219, minoritarios: -1, beneficio_neto: 828, gastos_financieros: 14, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 4.24, dpa: 1.50, dpa_extraordinario: 0, acciones_diluidas: 195.4 },
  { periodo: '2022', ingresos: 5119, coste_ventas: 2831, gastos_generales: 889, ebitda: 1147, amortizaciones: 253, ebit: 894, resultado_financiero: -4, bai: 890, impuestos: 154, minoritarios: -4, beneficio_neto: 741, gastos_financieros: 13, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 3.80, dpa: 1.75, dpa_extraordinario: 0, acciones_diluidas: 195.2 },
  { periodo: '2023', ingresos: 5706, coste_ventas: 2850, gastos_generales: 996, ebitda: 1499, amortizaciones: 264, ebit: 1235, resultado_financiero: 27, bai: 1262, impuestos: 266, minoritarios: -2, beneficio_neto: 998, gastos_financieros: 13, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 5.11, dpa: 2.25, dpa_extraordinario: 0, acciones_diluidas: 195.3 },
  { periodo: '2024', ingresos: 7057, coste_ventas: 3338, gastos_generales: 989, ebitda: 2287, amortizaciones: 266, ebit: 2021, resultado_financiero: 63, bai: 2084, impuestos: 396, minoritarios: 5, beneficio_neto: 1683, gastos_financieros: 15, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 8.62, dpa: 3.75, dpa_extraordinario: 1.00, acciones_diluidas: 195.3 },
  { periodo: '2025', ingresos: 7938, coste_ventas: 3775, gastos_generales: 1205, ebitda: 2270, amortizaciones: 330, ebit: 1940, resultado_financiero: 30, bai: 1970, impuestos: 410, minoritarios: 0, beneficio_neto: 1560, gastos_financieros: 17, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 7.99, dpa: 3.25, dpa_extraordinario: 0, acciones_diluidas: 195.3 },
];
// Balance al cierre: 2020-2021 [12], 2022-2023 [11, 13], 2024-2025 [1]. deuda_financiera = pasivos con interés que no son
// arrendamientos; arrendamientos = pasivos por arrendamiento (nota 35: 336 en 2025, 215 en 2024, 227 en 2023, 263 en 2022;
// en 2020-2021 la empresa dice que los pasivos con interés «son en su mayoría arrendamientos»). pasivos_contrato = anticipos
// de clientes (sobre todo pedidos de máscaras de Pattern Generators), que se compensan con entregas: van al circulante.
const balance = [
  { periodo: '2020', activo_total: 5319, activo_corriente: 3433, pasivo_corriente: 1434, pasivo_total: 1941, fondo_comercio: 963, intangibles: 290, inmovilizado_material: 236, existencias: 1181, clientes: 601, proveedores: 261, activos_contrato: null, pasivos_contrato: 559, caja: 1303, deuda_financiera: 0, arrendamientos: 264, patrimonio_neto: 3364, minoritarios: 14, reservas: 1938 },
  { periodo: '2021', activo_total: 6136, activo_corriente: 3024, pasivo_corriente: 1544, pasivo_total: 2139, fondo_comercio: 1740, intangibles: 556, inmovilizado_material: 206, existencias: 1363, clientes: 658, proveedores: 295, activos_contrato: null, pasivos_contrato: 364, caja: 683, deuda_financiera: 0, arrendamientos: 243, patrimonio_neto: 3955, minoritarios: 42, reservas: 2417 },
  { periodo: '2022', activo_total: 7340, activo_corriente: 4195, pasivo_corriente: 2062, pasivo_total: 2637, fondo_comercio: 1866, intangibles: 508, inmovilizado_material: 265, existencias: 1433, clientes: 1143, proveedores: 310, activos_contrato: null, pasivos_contrato: 711, caja: 1274, deuda_financiera: 7, arrendamientos: 263, patrimonio_neto: 4663, minoritarios: 40, reservas: 2853 },
  { periodo: '2023', activo_total: 8340, activo_corriente: 5319, pasivo_corriente: 2507, pasivo_total: 3058, fondo_comercio: 1803, intangibles: 489, inmovilizado_material: 288, existencias: 1602, clientes: 1270, proveedores: 388, activos_contrato: null, pasivos_contrato: 1039, caja: 2140, deuda_financiera: 0, arrendamientos: 227, patrimonio_neto: 5247, minoritarios: 36, reservas: 3487 },
  { periodo: '2024', activo_total: 10412, activo_corriente: 6879, pasivo_corriente: 3205, pasivo_total: 3837, fondo_comercio: 2105, intangibles: 581, inmovilizado_material: 373, existencias: 2056, clientes: 1507, proveedores: 557, activos_contrato: null, pasivos_contrato: 1253, caja: 3014, deuda_financiera: 4, arrendamientos: 215, patrimonio_neto: 6532, minoritarios: 43, reservas: 4709 },
  { periodo: '2025', activo_total: 10922, activo_corriente: 6449, pasivo_corriente: 2798, pasivo_total: 3813, fondo_comercio: 2646, intangibles: 878, inmovilizado_material: 371, existencias: 2150, clientes: 1336, proveedores: 465, activos_contrato: null, pasivos_contrato: 1038, caja: 2323, deuda_financiera: 12, arrendamientos: 336, patrimonio_neto: 7109, minoritarios: 0, reservas: 5573 },
];
// Flujos: 2020-2024 del XBRL [13] (capex = inmaterial + material), 2025 del informe anual [1]. pagos_arrendamientos =
// «amortización de préstamos y pasivos por arrendamiento» (casi todo arrendamientos). Adquisiciones 2025: 920 de compras +
// 32 del minoritario de HC Xin [1].
const flujos = [
  { periodo: '2020', flujo_operativo: 1126, capex: 135, pagos_arrendamientos: 76, adquisiciones: 4, desinversiones: 0, dividendos: 196, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: '2021', flujo_operativo: 998, capex: 90, pagos_arrendamientos: 83, adquisiciones: 1117, desinversiones: 0, dividendos: 294, recompras: 23, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: '2022', flujo_operativo: 853, capex: 141, pagos_arrendamientos: 84, adquisiciones: 0, desinversiones: 216, dividendos: 294, recompras: 16, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: '2023', flujo_operativo: 1608, capex: 192, pagos_arrendamientos: 88, adquisiciones: 6, desinversiones: 1, dividendos: 343, recompras: 26, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: '2024', flujo_operativo: 1874, capex: 238, pagos_arrendamientos: 95, adquisiciones: 258, desinversiones: 0, dividendos: 441, recompras: 19, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: '2025', flujo_operativo: 1407, capex: 165, pagos_arrendamientos: 109, adquisiciones: 952, desinversiones: 1, dividendos: 734, recompras: 19, emision_acciones: 0, intereses_en_financiacion: 0 },
];
// Trimestres (datos trimestrales de [2] y de los informes de cada trimestre [3-9]); BPA reexpresado por el desdoblamiento.
// vs_consenso: EBIT frente al consenso de Modular Finance publicado antes de cada informe [15].
const trimestres = [
  { periodo: '3T24', ingresos: 1780, crecimiento_pct: 39.7, crecimiento_organico_pct: 45, ebitda: 613, margen_ebitda_pct: 34.4, bpa: 2.30, vs_consenso: null },
  { periodo: '4T24', ingresos: 2059, crecimiento_pct: 4.6, crecimiento_organico_pct: 2, ebitda: 599, margen_ebitda_pct: 29.1, bpa: 2.35, vs_consenso: null },
  { periodo: '1T25', ingresos: 2142, crecimiento_pct: 26.6, crecimiento_organico_pct: 25, ebitda: 851, margen_ebitda_pct: 39.7, bpa: 3.18, vs_consenso: 'Superior' },
  { periodo: '2T25', ingresos: 2066, crecimiento_pct: 35.3, crecimiento_organico_pct: 44, ebitda: 646, margen_ebitda_pct: 31.3, bpa: 2.28, vs_consenso: 'En línea' },
  { periodo: '3T25', ingresos: 1709, crecimiento_pct: -4.0, crecimiento_organico_pct: -4, ebitda: 341, margen_ebitda_pct: 20.0, bpa: 1.11, vs_consenso: 'En línea' },
  { periodo: '4T25', ingresos: 2021, crecimiento_pct: -1.8, crecimiento_organico_pct: 3, ebitda: 433, margen_ebitda_pct: 21.4, bpa: 1.42, vs_consenso: 'Inferior' },
  { periodo: '1T26', ingresos: 2503, crecimiento_pct: 16.9, crecimiento_organico_pct: 28, ebitda: 1031, margen_ebitda_pct: 41.2, bpa: 3.66, vs_consenso: 'Superior' },
  { periodo: '2T26', ingresos: 2416, crecimiento_pct: 16.9, crecimiento_organico_pct: 15, ebitda: 796, margen_ebitda_pct: 32.9, bpa: 2.70, vs_consenso: 'Superior' },
];

const A = {
  _estado: 'completa',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 8649, ebitda: 2600, ebit: 2232, beneficio_neto: 1735, bpa: 8.88, dpa: 3.25, dpa_extraordinario: 0, fcf: 1701, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [
      { periodo: '2021', descripcion: 'Compras de atg Luther & Maelzer (jun-21) y del 75 % de Shenzhen Huan Cheng Xin (HC Xin, nov-21): 1.117 M de caja; el balance de 2021 las incluye y la cuenta solo una parte del año [12].' },
      { periodo: '2025', descripcion: 'Compras de Hprobe (mar-25), RoBAT (abr-25) y Surfx (jun-25) por 920 M de caja; aportaron 266 M de ventas en 2025 [1].' },
    ],
    comentario: 'Las ventas pasaron de 3.882 M SEK en 2020 a 7.938 M en 2025 (TCAC del 15,4 %) y a 8.649 M en los últimos doce meses a junio de 2026 [1, 2]. En 2025 el crecimiento fue del 12 %: 15 % orgánico, 4 % de compras y −7 % de divisa [1]. El margen EBIT va con la mezcla de Pattern Generators (máscaras, con margen EBIT del 50-57 %): 17,5 % en 2022, año sin entregas grandes, 28,6 % en 2024 y 24,4 % en 2025, cuando la división bajó del 56,5 % al 50,2 % y el grupo subió el gasto en I+D al 12,3 % de las ventas [1]. Los costes ligados a compras (amortización de intangibles comprados, retenciones y transacción) fueron 196 M en 2025 y 74 M en 2024 (margen subyacente del 26,9 % y 29,7 %) [1]. El primer semestre de 2026 llevó el margen al 33,2 % con la entrega del primer Prexision 8000 Evo (pedido de 45-48 M USD) y con Global Technologies en el 30,9 % [2]. Los años no comparables son 2021 y 2025 por las compras.',
    ajustes: 'Se usan cifras publicadas. La empresa da un EBIT «subyacente» sin costes ligados a compras: 2.136 M en 2025 frente a 1.940 publicados (196 M de diferencia: amortización de intangibles comprados, programas de retención y gastos de transacción), y 1.681 M en el primer semestre de 2026 frente a 1.636 [1, 2]. Se repiten todos los años porque el grupo compra empresas pequeñas casi cada año, así que no se tratan como no recurrentes. En el segundo trimestre de 2026 hay además 39 M de reestructuración en PCB Assembly Solutions (100 M previstos hasta 2027), 24 M del plan de opciones de los empleados de Axxon (High Volume) y +14 M por revaluar el pago aplazado de Surfx [2]. El BPA de 2020-2024 está reexpresado por el desdoblamiento de dos por una de junio de 2025 [1, 14].',
    confianza: 'Alta',
  },
  trimestres: {
    items: trimestres,
    ultima_presentacion: 'En el 2T26 (14-jul-2026) la dirección subió por segunda vez la previsión de ventas de 2026, de 8.750 a 9.250 M SEK (en febrero era 8.250 M), tras pedidos récord de 2.917 M (+119 %) [2, 3, 4]. El mensaje cambió respecto al 4T25: entonces el énfasis estaba en la caída de pedidos (−19 %) y en el gasto en I+D que bajó el margen al 17 % [4]; en 2026 el motor es Global Technologies (pedidos de 1.111 M en el trimestre, más de mil millones por primera vez) por la inversión en placas de servidores para IA, y High Volume por dispensado para disipar calor en servidores y montaje de módulos ópticos [2]. Pattern Generators recibió cuatro SLX, uno a medida de 27-30 M USD que la empresa pide no tomar como recurrente; su cartera bajó a 1.706 M (13 sistemas) y la dirección movió entregas de un trimestre a otro (un SLX del 2T al 3T26, un Prexision Lite 8 Evo y un MMS del 3T al 4T26) [2]. Los analistas preguntaron por la visibilidad de máscaras en 2027 (solo tres Prexision 8 Evo y un SLX en cartera para 2027) y por PCB Assembly Solutions, con margen EBIT del −14,5 % y un plan de reestructuración para volver al 10 % a finales de 2027 [2]. El EBIT del trimestre (698 M) superó en un 26 % al consenso de 554 M [15, 16]. Los resultados del 3T26 salen el 22-oct-2026; el consenso de siete analistas espera ventas de 2.171 M y EBIT de 418 M [15].',
    confianza: 'Alta',
  },
  balance: {
    historico: balance,
    vencimientos: [{ anio: '2026', importe: 106 }, { anio: '2027-2030', importe: 255 }, { anio: '2031+', importe: 12 }],
    liquidez: 'Caja de 2.687 M SEK a 30-jun-2026 y líneas de crédito de 2.000 M sin disponer; caja neta de 2.267 M (pasivos con interés de 421 M, sobre todo arrendamientos) [1, 2].',
    rating: 'Sin rating',
    coste_deuda_pct: 4.0,
    vida_media_anios: null,
    otros_pasivos: 'No hay deuda bancaria relevante: los pasivos con interés (348 M a cierre de 2025, 421 M en junio de 2026) son casi todos arrendamientos (336 M en 2025; vencimientos sin descontar de 374 M, 106 M a un año) [1, 2]. Los anticipos de clientes, 1.038 M en 2025 (1.253 M en 2024), se compensan con entregas de máscaras y no se devuelven en caja: son circulante, no deuda [1]. Pagos aplazados y contingentes de compras: hasta 57,8 M USD por Surfx en 2026-2028 (9,4 M de retención) y 19 M SEK aplazados por Cowin DST a tres años, en «otros pasivos no corrientes» (337 M en junio de 2026) [1, 2]. Provisiones de garantías y pensiones pequeñas (39 M a largo y 83 M a corto en 2025). El plan de opciones de Axxon puede dar a los empleados una parte minoritaria de la filial china de High Volume [2, 4].',
    comentario: 'El balance es de caja neta todos los años: 1.004 M en 2022, 2.795 M en 2024, 1.974 M en 2025 y 2.267 M en junio de 2026 [1, 2]. La caja bajó en 2025 por las compras (920 M) y el dividendo con extraordinario (734 M). El circulante crece con las ventas: existencias de 2.461 M en junio de 2026 (2.150 M en diciembre) por la cartera de sistemas de Global Technologies y High Volume y la fábrica nueva de Tailandia [2]. Los anticipos de clientes financian buena parte de las existencias de Pattern Generators y bajan cuando la cartera de máscaras se consume (de 1.253 M a 1.038 M en 2025) [1]: si en 2027 entran menos pedidos de máscaras, el circulante consumirá caja.',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'La conversión de beneficio en caja es irregular por los anticipos de las máscaras: flujo operativo de 1.874 M en 2024 (111 % del beneficio) y de 1.407 M en 2025 (90 %), cuando el circulante consumió 549 M por existencias y menos anticipos [1]. En los doce meses a junio de 2026 el flujo operativo fue de 2.051 M [2]. La inversión es baja: 165 M en 2025 (2,1 % de las ventas, 91 M material y 74 M de desarrollo capitalizado) más 109 M de arrendamientos [1]; en el primer semestre de 2026 subió a 128 M por la fábrica de Tailandia y Kista [2]. Estimación propia: casi todo el capex es de mantenimiento y capacidad ligera; el crecimiento se compra (952 M en 2025, 1.117 M en 2021). Los usos de la caja en 2021-2025: dividendos 2.106 M, compras 2.337 M, recompras 103 M [1, 13].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'Ernst & Young AB (Anna Svanberg)',
    anios_auditor: null,
    opinion: 'Favorable',
    comentario: 'Las cuentas son NIIF-UE con informe de auditoría sin salvedades de EY en 2025 [1]. El reconocimiento de ingresos es en el momento de la entrega o la aceptación para los sistemas (6.674 M de 7.938 en 2025) y a lo largo del tiempo para el servicio (1.264 M) [1]: por eso las ventas de Pattern Generators saltan con cada máscara entregada (1.291 M en el 1T26 frente a 577 M en el 4T25) [2]. La capitalización de desarrollo es modesta (64 M en 2025, 6,5 % del gasto en I+D) y la amortización de lo capitalizado parecida (54 M) [1]. El fondo de comercio subió a 2.646 M (37 % del patrimonio) por las compras de 2025; no ha habido deterioros [1]. La remuneración en acciones es pequeña (43 M de planes a largo plazo en 2025) [1]. El tipo impositivo efectivo es del 19-21 % [1]. Los indicadores del motor (Altman Z, Piotroski F y Beneish M) deben leerse con la irregularidad de la cuenta: un año de pocas entregas de máscaras mueve márgenes, existencias y anticipos a la vez.',
    senales: [
      { senal: 'Ventas concentradas en entregas grandes de Pattern Generators', nivel: 'Media', comentario: 'Un Prexision 8000 Evo de 45-48 M USD y los SLX a medida de 27-30 M USD mueven el trimestre: el EBIT del grupo fue de 938 M en el 1T26 y de 342 M en el 4T25 [2, 4].' },
      { senal: 'Existencias al alza', nivel: 'Baja', comentario: 'Existencias de 2.461 M en junio de 2026 (+14 % en seis meses) y bajas de existencias de 48 M en 2025 [1, 2].' },
      { senal: 'Costes de compras recurrentes', nivel: 'Baja', comentario: '196 M en 2025 fuera del EBIT subyacente; se tratan como recurrentes [1].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'La política de dividendos es repartir al menos un tercio del beneficio neto [1]. Dividendo de 3,25 SEK por acción con cargo a 2025 (41 % del beneficio), 2,75 SEK más 1,00 extraordinario con cargo a 2024 [1]. No hay recompras en marcha más allá de la cobertura de los planes de acciones (19 M en 2025) [1]. Prioridades declaradas: crecimiento orgánico con I+D (13 % de las ventas), compras de nichos tecnológicos dentro de Global Technologies y de las otras divisiones, y caja neta para aguantar los ciclos [1, 2].',
    adquisiciones: [
      { anio: '2021', objetivo: 'atg Luther & Maelzer (pruebas de placas, Alemania)', importe: null, ev_ebitda: null, financiacion: 'Caja', resultado: 'Base de la línea PCB Test, hoy la de más crecimiento por las placas de servidores de IA [1, 2].' },
      { anio: '2021', objetivo: 'Shenzhen Huan Cheng Xin (HC Xin, 75 %; dispensado en China)', importe: null, ev_ebitda: null, financiacion: 'Caja', resultado: 'Integrada en High Volume (Axxon); el 25 % restante se compró en 2025 por 32 M [1].' },
      { anio: '2024', objetivo: 'Vanguard Automation (Alemania; nanoimpresión 3D de interconexiones fotónicas)', importe: 196, ev_ebitda: null, financiacion: 'Caja (18 M EUR más hasta 8 M EUR aplazados)', resultado: 'Línea Photonic Interconnects, aún pequeña [1].' },
      { anio: '2025', objetivo: 'Hprobe (Francia; pruebas magnéticas de MRAM)', importe: 175, ev_ebitda: null, financiacion: 'Caja (16 M EUR)', resultado: 'Ventas de 75 M y EBIT de −9 M en 2025 [1].' },
      { anio: '2025', objetivo: 'RoBAT (Reino Unido; pruebas)', importe: 97, ev_ebitda: null, financiacion: 'Caja (7,5 M GBP más hasta 4 M GBP)', resultado: 'Ventas de 52 M y EBIT de −8 M en 2025 [1].' },
      { anio: '2025', objetivo: 'Surfx Technologies (EE. UU.; plasma atmosférico para encapsulado avanzado)', importe: 840, ev_ebitda: null, financiacion: 'Caja (87,5 M USD; hasta 57,8 M USD contingentes)', resultado: 'Ventas de 139 M y EBIT de −39 M en 2025 (con costes de compra); fondo de comercio de 596 M [1].' },
      { anio: '2026', objetivo: 'Cowin DST (Corea; reparación de pantallas y máscaras)', importe: 185, ev_ebitda: null, financiacion: 'Caja (20,5 M USD)', resultado: 'Ventas de 31 M y EBIT de −21 M en marzo-junio de 2026 [2].' },
    ],
    comentario: 'La dirección asigna bien el capital en el núcleo: el ROIC del grupo está por encima del 20 % con caja neta y el dividendo ronda el 40 % del beneficio [1]. Las compras son la parte dudosa: entre 2024 y 2026 se han gastado unos 1.300 M en empresas pequeñas que en 2025 restaron EBIT (Hprobe −9 M, RoBAT −8 M, Surfx −39 M) y en junio de 2026 Cowin DST −21 M [1, 2]; el fondo de comercio ya es el 37 % del patrimonio. La línea que salió bien, atg (PCB Test, 2021), explica gran parte del salto de Global Technologies en 2026 [2]. Sin dilución: 195,3 M de acciones desde 2017 (ajustadas por el desdoblamiento) [1].',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'Pattern Generators', descripcion: 'Máscaras fotográficas por láser para pantallas (Prexision) y semiconductores (SLX), metrología (MMX), reparación (Cowin DST) y servicio.', tipo_resultado: 'EBIT', historico: [{ periodo: '2021', ingresos: 1645, resultado: 832 }, { periodo: '2022', ingresos: 1369, resultado: 465 }, { periodo: '2023', ingresos: 2106, resultado: 1053 }, { periodo: '2024', ingresos: 2997, resultado: 1694 }, { periodo: '2025', ingresos: 3232, resultado: 1623 }] },
      { nombre: 'PCB Assembly Solutions', descripcion: 'Líneas flexibles de montaje de placas (impresión por chorro, colocación, inspección) para series cortas: defensa, médico e industria (antes High Flex).', tipo_resultado: 'EBIT', historico: [{ periodo: '2021', ingresos: 1176, resultado: 136 }, { periodo: '2022', ingresos: 1405, resultado: 161 }, { periodo: '2023', ingresos: 1535, resultado: 195 }, { periodo: '2024', ingresos: 1489, resultado: 156 }, { periodo: '2025', ingresos: 1372, resultado: 79 }] },
      { nombre: 'High Volume', descripcion: 'Dispensado y recubrimiento automáticos (Axxon) para electrónica de consumo, vehículo eléctrico, servidores y módulos ópticos; sobre todo China.', tipo_resultado: 'EBIT', historico: [{ periodo: '2021', ingresos: 1200, resultado: 231 }, { periodo: '2022', ingresos: 1479, resultado: 301 }, { periodo: '2023', ingresos: 1140, resultado: 173 }, { periodo: '2024', ingresos: 1434, resultado: 223 }, { periodo: '2025', ingresos: 1720, resultado: 267 }] },
      { nombre: 'Global Technologies', descripcion: 'Nichos comprados: pruebas eléctricas de placas (atg), unión de chips para óptica (MRSI), plasma (Surfx), pruebas magnéticas (Hprobe) e interconexión fotónica (Vanguard).', tipo_resultado: 'EBIT', historico: [{ periodo: '2021', ingresos: 657, resultado: -3 }, { periodo: '2022', ingresos: 865, resultado: 101 }, { periodo: '2023', ingresos: 928, resultado: 59 }, { periodo: '2024', ingresos: 1138, resultado: 113 }, { periodo: '2025', ingresos: 1632, resultado: 225 }] },
      { nombre: 'Grupo y eliminaciones', descripcion: 'Funciones centrales, efecto de NIIF 16 y ventas entre divisiones.', tipo_resultado: 'EBIT', historico: [{ periodo: '2021', ingresos: -43, resultado: -147 }, { periodo: '2022', ingresos: 1, resultado: -134 }, { periodo: '2023', ingresos: -3, resultado: -245 }, { periodo: '2024', ingresos: -1, resultado: -165 }, { periodo: '2025', ingresos: -18, resultado: -254 }] },
    ],
    geografias: [
      { nombre: 'China', peso_pct: 45.9 }, { nombre: 'Resto de Asia', peso_pct: 16.9 }, { nombre: 'Corea del Sur', peso_pct: 11.2 }, { nombre: 'EE. UU.', peso_pct: 12.4 },
      { nombre: 'Resto de Europa', peso_pct: 10.5 }, { nombre: 'Otras Américas', peso_pct: 2.0 }, { nombre: 'Suecia', peso_pct: 0.6 }, { nombre: 'Otros', peso_pct: 0.5 },
    ],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Pedidos del grupo (M SEK)', valor_anterior: '7.611 (2024)', valor_actual: '7.757 (2025); 9.815 en los 12 meses a jun-26', variacion: '+2 %; +27 %', comentario: 'Récord trimestral de 2.917 M en el 2T26 [1, 2].' },
      { kpi: 'Cartera de pedidos (M SEK)', valor_anterior: '4.702 (2024)', valor_actual: '4.681 (2025); 5.255 (jun-26)', variacion: '0 %; +12 %', comentario: 'La de Pattern Generators bajó de 3.334 a 1.706 M; la de Global Technologies subió de 514 a 2.099 M [1, 2].' },
      { kpi: 'Sistemas en la cartera de Pattern Generators', valor_anterior: '—', valor_actual: '13 (jun-26): 5 en 3T26, 3 en 4T26, 4 en 2027, 1 en 2028', variacion: '—', comentario: 'Más dos SLX pedidos en oct-26 para el 1T28 [2, 17].' },
      { kpi: 'Margen bruto del grupo (%)', valor_anterior: '52,7 (2024)', valor_actual: '52,4 (2025); 58,8 (1S26)', variacion: '−0,3 p.p.', comentario: 'Pattern Generators 68,3 % en 2025 [1, 2].' },
      { kpi: 'Ventas de posventa (% del grupo)', valor_anterior: '25 (2024)', valor_actual: '25 (2025)', variacion: '0 p.p.', comentario: '1.977 M en 2025; 29 % en Pattern Generators [1].' },
      { kpi: 'Gasto en I+D (% de ventas)', valor_anterior: '10,6 (2024)', valor_actual: '12,3 (2025)', variacion: '+1,7 p.p.', comentario: 'Nuevo producto de inspección de máscaras de semiconductores [1].' },
    ],
    clientes: 'Pattern Generators vende a pocos clientes: talleres de máscaras independientes (Photronics, Tekscend, LG Innotek, Dai Nippon, entre otros) y fabricantes de pantallas y chips con taller propio, el 95 % en Asia [1]. Todos los fabricantes de pantallas usan máscaras escritas con máquinas de Mycronic [1]. Un pedido puede valer 3-8 M USD (SLX), 27-30 M USD (SLX a medida) o 45-48 M USD (Prexision 8000 Evo) [1, 2]. La empresa no publica el peso del primer cliente; cinco clientes suman el 13 % (17 % en 2024) de las cuentas a cobrar [1]. Las demás divisiones venden a miles de fabricantes de electrónica y subcontratistas, en parte por distribuidores [1]. El poder de precio de Pattern Generators se ve en un margen bruto del 66-77 % trimestral y en los pedidos de anticipo; en PCB Assembly Solutions, con rivales japoneses y coreanos, el margen bruto bajó del 41,7 % en 2023 al 34,8 % en el 2T26 [1, 2].',
    confianza: 'Alta',
  },
  huecos: [
    { seccion: 'calidad', campo: 'anios_auditor', tipo: 'Complemento', intentos: '1) Informe anual 2025, informe de gobierno y nota 9: dice que la junta de 2025 reelegió a EY, sin año de primera elección; 2) comunicados de las juntas de 2025 y 2026 en MFN: solo la reelección; 3) informe anual 2021 (ESEF): EY ya era auditor, sin fecha de primer nombramiento', decision: 'Omitido' },
    { seccion: 'balance', campo: 'vida_media_anios', tipo: 'Complemento', intentos: '1) Nota 35 del informe anual 2025: solo arrendamientos, sin vida media; 2) nota 21: vencimientos sin descontar; 3) sin deuda bancaria: no aplica', decision: 'Omitido' },
  ],
  fuentes: fA,
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Annual Report 2025: divisiones (posición de mercado, competidores, ventas por región) y objetivos 2027-2030', editor: 'Mycronic AB (publ)', tipo: 'Primaria', fecha: '2026-04-01', url: `${MFN}/74466bcb-9f6d-45f8-9c6a-71c20d3e0d6e/annual-report-2025.pdf` },
  { id: 2, titulo: 'Interim Report January-June 2026: mercados (Prismark jun-26, Omdia abr y jun-26, TechInsights ene-26, Protec MDC, Lightcounting abr-26)', editor: 'Mycronic AB (publ)', tipo: 'Primaria', fecha: '2026-07-14', url: `${MFN}/c8f3d92b-f205-4f1a-9552-77f0d11afede/interim-report-january-june-2026.pdf` },
  { id: 3, titulo: 'Mycronic presents new financial targets (20.000 M SEK de ventas en 2032-2035, margen EBIT en torno al 25 %)', editor: 'Mycronic AB (publ)', tipo: 'Primaria', fecha: '2026-08-31', url: `${MFN}/9994b3bd-d046-4bc7-8801-089184d16e47/260831-mycronic-presents-new-financial-targets.pdf` },
  { id: 4, titulo: 'Mycronic receives order for two SLX mask writers (14-16 M USD, cliente de EE. UU., entrega 1T28)', editor: 'Mycronic AB (publ)', tipo: 'Primaria', fecha: '2026-10-14', url: `${MFN}/c002cbab-59b6-47c0-a769-78d8210c396a/mycronic-receives-order-for-two-slx-mask-writers.pdf` },
  { id: 5, titulo: 'Ingresos y margen operativo de los últimos 12 meses de competidores (Applied Materials, Nordson, ASMPT, BESI, Fuji, Koh Young, Hioki, Lasertec, KLA, Photronics)', editor: 'Yahoo Finance (quoteSummary, financialData)', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/NDSN/' },
  { id: 6, titulo: 'Year-end Report January-December 2025 (IA y máscaras de capa doble; pedidos de SLX por modernización)', editor: 'Mycronic AB (publ)', tipo: 'Primaria', fecha: '2026-02-05', url: `${MFN}/41c3f8b1-a8ec-44f6-9e70-2c87b6e2c154/year-end-report-january-december-2025.pdf` },
  { id: 7, titulo: 'Annual and Sustainability Report 2023 (Pattern Generators: ciclo de 2022 sin entregas grandes)', editor: 'Mycronic AB (publ)', tipo: 'Primaria', fecha: '2024-04', url: `${MFN}/13cdbaea-e787-4cb7-99cf-bb350135e30b/annual-and-sustainability-report-2023.pdf` },
];
const usd = Y['USDSEK=X'].precio, jpy = Y['JPYSEK=X'].precio, hkd = Y['HKDSEK=X'].precio, eur = Y['EURSEK=X'].precio, krw = 0.007461;
const fx = { USD: usd, JPY: jpy, HKD: hkd, EUR: eur, KRW: krw };
const comp = (t, nombre, pais, coment) => { const c = CY[t]; return { nombre, pais, ticker: t, ingresos: Math.round(c.ventas * fx[c.divisa] / 1e6), cuota_pct: null, margen_ebit_pct: r1(c.margen_operativo * 100), comentario: coment }; };
const B_ = {
  _estado: 'completa',
  sector: {
    definicion: 'Mycronic no tiene un mercado único: vende equipos de producción para electrónica en cuatro nichos [1]. El que decide el beneficio es el de **escritoras láser de máscaras fotográficas** (Pattern Generators: 41 % de las ventas y 84 % del EBIT de las divisiones en 2025) [1]. No hay estadística pública de ese nicho; se usa como referencia el mercado de máscaras que fabrican sus clientes: máscaras para pantallas, 994 M USD en 2025 (Omdia), y para semiconductores, 10.600 M USD (TechInsights) [2]. Los otros nichos son equipos SMT (unos 4.700 M USD; Protec MDC), dispensado (800 M USD; Prismark), pruebas eléctricas de placas (sobre un mercado de placas de 85.800 M USD) y unión de chips para óptica (sobre componentes ópticos de 40.800 M USD; Lightcounting) [2]. La serie de abajo es el mercado de máscaras para pantallas, el más ligado a las Prexision.',
    tamano: '≈ 994 M USD (≈ 9.850 M SEK) de máscaras para pantallas en 2025 (Omdia) y ≈ 10.600 M USD de máscaras para semiconductores (TechInsights) [2]',
    unidad_serie: 'millones de USD (máscaras para pantallas, Omdia)',
    serie: [{ anio: '2023', tamano: 908 }, { anio: '2024', tamano: 921 }, { anio: '2025', tamano: 994 }, { anio: '2026e', tamano: 1024 }],
    tcac_historico_pct: 4.6,
    tcac_previsto_pct: 3.0,
    cr5_pct: null,
    estructura: 'Concentrada',
    drivers: [
      { driver: 'Pantallas OLED más grandes y avanzadas (G8.6)', efecto: '+', horizonte: 'Estructural', evidencia: 'Área de máscaras OLED +5,0 % anual en 2025-2030 frente a +1,6 % del total; primer Prexision 8000 Evo en producción en Photronics Corea [2].' },
      { driver: 'Chips de IA y memoria avanzada', efecto: '+', horizonte: 'Estructural', evidencia: 'Máscaras para semiconductores +17,9 % en 2025 y +15 % previsto en 2026; las capas menos críticas y la segunda capa de las más avanzadas se escriben con láser [2, 6].' },
      { driver: 'Inversión en servidores de IA (placas de muchas capas, óptica)', efecto: '+', horizonte: 'Cíclico', evidencia: 'Pedidos de Global Technologies de 1.111 M en el 2T26 (+176 %); componentes ópticos +50,4 % en 2025 [2].' },
      { driver: 'Precio de las pantallas y capacidad china', efecto: '−', horizonte: 'Cíclico', evidencia: 'Mercado de pantallas −4,7 % previsto en 2026 por presión de precios [2]; pedidos de SLX frenados en 2025 por menos inversión china en capacidad de chips [1].' },
      { driver: 'Electrónica industrial europea', efecto: '−', horizonte: 'Cíclico', evidencia: 'PCB Assembly Solutions con ventas −8 % en 2025 y margen EBIT del −14,5 % en el 2T26 [1, 2].' },
      { driver: 'Defensa y aeroespacial', efecto: '+', horizonte: 'Estructural', evidencia: 'Los dos mayores pedidos de la historia de PCB Assembly Solutions, de defensa en EE. UU. y Europa, en el 2T26 [2].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 2, justificacion: 'En escritoras láser de máscaras para pantallas no hay rival relevante (todas las fábricas usan máscaras de Mycronic); en láser para chips compite con Applied Materials y Heidelberg Instruments [1].' },
      { fuerza: 'Poder de los clientes', intensidad: 4, justificacion: 'Pocos talleres de máscaras y fabricantes asiáticos (95 % de las ventas de la división) deciden cuándo invierten; un pedido puede ser de 45-48 M USD [1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Dependencia de proveedores únicos en algunos componentes (riesgo declarado), sin efecto visible en márgenes brutos del 66-77 % [1, 2].' },
      { fuerza: 'Amenaza de entrada', intensidad: 1, justificacion: 'Décadas de I+D (445 M SEK al año en la división), más de 400 patentes y base instalada con servicio [1].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'Las escritoras de haz de electrones (NuFlare, IMS) dominan las capas más críticas de chips; el láser conserva la mayoría de las máscaras de chips y todas las de pantallas [2, 6].' },
    ],
    ciclo: { posicion: 'Expansión', comentario: 'Los indicadores son los pedidos y la cartera: pedidos del grupo de 9.815 M en 12 meses (+27 %) y cartera de 5.255 M [2]. Pero el ciclo es doble: Global Technologies y High Volume están en expansión por la inversión en IA, mientras que la cartera de máscaras bajó de 3.334 M a 1.706 M y solo tiene cuatro sistemas para 2027 [2]. En 2022 Pattern Generators casi no entregó máquinas grandes y su EBIT cayó de 832 a 465 M [7]; en 2020 el grupo bajó ventas un 10 % [1]; en 2008-09 la empresa (entonces Micronic Mydata) tuvo pérdidas.' },
    regulacion: 'Las máquinas de Mycronic están sujetas a control de exportación de productos de doble uso y a las listas de entidades de EE. UU.; China fue el 45,9 % de las ventas de 2025 [1]. La empresa trata los aranceles y las barreras comerciales como riesgo principal y en 2025 rebajó un trimestre su previsión por los aranceles de EE. UU. [1, 2]. Un endurecimiento de los controles sobre equipos de máscaras o de montaje hacia China pesaría sobre todo en High Volume (82 % de sus ventas en China) y en los SLX vendidos a talleres chinos [1]. No hay cambios regulatorios con fecha que afecten a las cifras; la empresa responde con producción en Tailandia («China+N») [2].',
    tendencias: 'La IA es la tendencia dominante: en chips sube la demanda de máscaras (también de capas escritas por láser) y en servidores la de placas de muchas capas, pruebas eléctricas, dispensado para disipar calor y montaje de módulos ópticos, donde Mycronic gana con Global Technologies y High Volume [2, 6]. En pantallas, el paso a OLED grandes (G8.6) exige máscaras más avanzadas, que solo escribe el Prexision 8000 Evo [2]. La amenaza tecnológica es el haz de electrones en las capas críticas y, a largo plazo, la litografía sin máscara; la empresa responde con un producto nuevo de inspección de máscaras de chips [1].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: null,
    posicion: '1.º mundial en escritoras láser de máscaras para pantallas (todas las fábricas usan máscaras de sus máquinas); líder en láser para máscaras de chips junto a Applied Materials; 1.º mundial en dispensado y recubrimiento según la empresa; nicho en montaje flexible de placas frente a Fuji y Koh Young [1].',
    competidores: [
      comp('AMAT', 'Applied Materials (ALTA, escritoras láser)', 'EE. UU.', 'Rival en escritoras láser de máscaras para chips; su negocio de máscaras es una parte mínima del grupo [1, 5].'),
      { nombre: 'Heidelberg Instruments', pais: 'Alemania', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Escritoras láser de menor tamaño; no cotiza ni publica cuentas [1].' },
      comp('NDSN', 'Nordson (dispensado)', 'EE. UU.', 'Rival de High Volume en dispensado y recubrimiento [1, 5].'),
      comp('0522.HK', 'ASMPT', 'Hong Kong', 'Rival en unión de chips (Die Bonding) y montaje SMT [1, 5].'),
      comp('BESI.AS', 'BE Semiconductor', 'Países Bajos', 'Rival en unión de chips para encapsulado avanzado [1, 5].'),
      comp('6134.T', 'Fuji Corporation', 'Japón', 'Rival de PCB Assembly Solutions en colocación de componentes [1, 5].'),
      comp('098460.KQ', 'Koh Young', 'Corea del Sur', 'Rival en inspección 3D de placas [1, 5].'),
      comp('6866.T', 'Hioki', 'Japón', 'Rival de PCB Test en pruebas eléctricas de placas [1, 5].'),
    ],
    foso: {
      veredicto: 'Amplio', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'No aplica más allá de la base instalada que estandariza los procesos de los talleres de máscaras [1].' },
        { fuente: 'Costes de cambio', puntuacion: 4, evidencia: 'Las máscaras de cada fábrica de pantallas se escriben con sus máquinas; el posventa es el 29 % de la división y crece con los SLX que salen de garantía [1].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 4, evidencia: 'Más de 400 patentes y 445 M SEK de I+D al año solo en Pattern Generators; el Prexision 8000 Evo es la única máquina para máscaras G8.6 [1, 2].' },
        { fuente: 'Ventaja en costes', puntuacion: 2, evidencia: 'Margen bruto del 68-77 % en Pattern Generators, frente al 35-44 % en las demás divisiones, donde no hay ventaja de coste [1, 2].' },
        { fuente: 'Escala eficiente', puntuacion: 5, evidencia: 'Mercado de escritoras para pantallas pequeño (pocas máquinas al año) que no justifica un segundo proveedor; margen EBIT de la división del 50-57 % [1].' },
      ],
    },
    amenazas: 'El foso de máscaras para pantallas es amplio, pero el mercado es pequeño y depende de pocas inversiones al año: lo que lo erosionaría no es un rival sino la falta de pedidos (2022, y ahora una cartera de 2027 con cuatro sistemas) [2, 7]. En chips, el haz de electrones gana las capas críticas y Applied Materials compite en láser (probabilidad media de perder cuota en nodos nuevos) [1]. En las otras tres divisiones el foso es estrecho: PCB Assembly Solutions perdió margen frente a japoneses y coreanos (EBIT del 12,7 % en 2023 al −14,5 % en el 2T26) y High Volume depende de China [1, 2]. Global Technologies crece con la IA, con rivales grandes (ASMPT, BESI, Hioki) [1].',
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'Mycronic AB, de Täby (Suecia), diseña y fabrica equipos de producción de alta precisión para la industria electrónica [1]. Cuatro divisiones: **Pattern Generators** (escritoras láser de máscaras fotográficas para pantallas —Prexision— y para semiconductores —SLX—, más metrología, reparación y servicio; 3.232 M SEK y EBIT de 1.623 M en 2025), **PCB Assembly Solutions** (líneas flexibles de montaje de placas para series cortas; 1.372 M), **High Volume** (dispensado y recubrimiento automáticos, fabricados en China y desde 2025 en Tailandia; 1.720 M) y **Global Technologies** (pruebas eléctricas de placas, unión de chips para óptica, plasma, pruebas magnéticas e interconexión fotónica; 1.632 M) [1]. Clientes: talleres de máscaras y fabricantes de pantallas y chips en Asia, y fabricantes de electrónica y subcontratistas en todo el mundo. China fue el 45,9 % de las ventas de 2025 y Asia el 74 % [1]. Plantilla media de 2.772 personas en el primer semestre de 2026 [2].',
    como_gana_dinero: 'El beneficio sale casi todo de las máscaras: Pattern Generators hizo el 41 % de las ventas y el 84 % del EBIT de las divisiones en 2025, con margen bruto del 68 % y EBIT del 50 % [1]. Cada máquina se vende con anticipo y se reconoce al entregarla, así que el trimestre depende de cuántas se entregan (EBIT de 831 M en el 1T26 con el primer Prexision 8000 Evo, de 173 M en el 4T25) [2]. El posventa (servicio, piezas, mejoras del láser) es el 25 % de las ventas del grupo y el 29 % de la división, y es la parte recurrente [1]. Las otras divisiones tienen márgenes brutos del 35-56 % y EBIT del 5-36 %; Global Technologies pasó del 3,5 % al 35,6 % en un año por volumen y mezcla de pruebas de placas de IA [2]. Apalancamiento operativo alto: el gasto fijo en I+D (12,3 % de las ventas) y estructura no baja cuando faltan entregas [1].',
  },
  huecos: [
    { seccion: 'competencia', campo: 'cuota_pct', tipo: 'Núcleo', intentos: '1) Informe anual 2025, páginas de divisiones: «posición número uno» sin cifra de cuota; 2) informes trimestrales 2025-2026 (sección de mercados): tamaño de los mercados de máscaras, no de las escritoras; 3) búsqueda de estudios del mercado de escritoras de máscaras: sin cifra pública fiable', decision: 'Omitido' },
    { seccion: 'sector', campo: 'cr5_pct', tipo: 'Complemento', intentos: '1) Informe anual 2025: solo nombra competidores; 2) Omdia y TechInsights citados por la empresa: mercado de máscaras, no de escritoras; 3) competidores no cotizados (Heidelberg Instruments) sin cuentas', decision: 'Omitido' },
  ],
  fuentes: fB,
};
// Serie de máscaras para pantallas: 2025 = 994 M USD, 2026e = 1.024 M (+3,0 %), 2024 = 994 / 1,079 = 921, 2023 = 921 / 1,014 = 908 [2].
guarda('B', B_);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Annual Report 2025: informe de gobierno corporativo, consejo, dirección, remuneraciones (nota 8) y accionistas', editor: 'Mycronic AB (publ)', tipo: 'Primaria', fecha: '2026-04-01', url: `${MFN}/74466bcb-9f6d-45f8-9c6a-71c20d3e0d6e/annual-report-2025.pdf` },
  { id: 2, titulo: 'Communiqué from the Annual General Meeting 2026', editor: 'Mycronic AB (publ)', tipo: 'Primaria', fecha: '2026-05-06', url: `${MFN}/b9bcc931-5d0a-46a3-b7b0-a4a2d0645553/communique-from-the-annual-general-meeting-and-statutory-meeting-of-the-board-of-directors-of-mycronic-ab-publ.pdf` },
  { id: 3, titulo: 'Notice to the Annual General Meeting 2026 (propuestas de remuneración y planes de acciones)', editor: 'Mycronic AB (publ)', tipo: 'Primaria', fecha: '2026-03-25', url: `${MFN}/5cf9f847-5d1a-4891-9bd3-a9c80dd19efc/notice-to-the-annual-general-meeting-in-mycronic-ab-publ.pdf` },
  { id: 4, titulo: 'Mycronic appoints Nomination Committee (Bure, SEB Fonder, Cuarto Fondo de Pensiones)', editor: 'Mycronic AB (publ)', tipo: 'Primaria', fecha: '2026-09-15', url: `${MFN}/86a562bb-556a-4b92-885e-79620347d4d9/mycronic-appoints-nomination-committee.pdf` },
  { id: 5, titulo: 'Insynsregistret: operaciones de directivos de Mycronic (20-oct-2025 a 20-oct-2026)', editor: 'Finansinspektionen', tipo: 'Primaria', fecha: '2026-10-20', url: 'https://marknadssok.fi.se/publiceringsklient/sv-SE/Search/Search?SearchFunctionType=Insyn&Utgivare=Mycronic+AB' },
  { id: 6, titulo: 'Management change at Mycronic (salida de la directora de personas, nov-25; nombramiento de Annika Haaker, feb-26)', editor: 'Mycronic AB (publ)', tipo: 'Primaria', fecha: '2026-02-26', url: `${MFN}/c6952c2d-8b63-4911-8c3d-7199506bc1d8/management-change-at-mycronic.pdf` },
  { id: 7, titulo: 'Previsiones de ventas en los informes trimestrales 2024-2026 (3T24, 4T24, 1T25, 2T25, 3T25, 4T25, 1T26, 2T26)', editor: 'Mycronic AB (publ)', tipo: 'Primaria', fecha: '2026-07-14', url: `${MFN}/c8f3d92b-f205-4f1a-9552-77f0d11afede/interim-report-january-june-2026.pdf` },
  { id: 8, titulo: 'Annual and Sustainability Report 2023 (objetivos 2023; resultados 2023)', editor: 'Mycronic AB (publ)', tipo: 'Primaria', fecha: '2024-04', url: `${MFN}/13cdbaea-e787-4cb7-99cf-bb350135e30b/annual-and-sustainability-report-2023.pdf` },
];
const C = {
  _estado: 'completa',
  directivos: {
    equipo: [
      { nombre: 'Anders Lindqvist', cargo: 'Consejero delegado', desde: '2019', participacion_pct: 0.03, trayectoria: 'Consejero delegado de Piab (2013-2019) y directivo de Atlas Copco (2004-2013, entre otros presidente en China). Con él las ventas pasaron de 4.307 M SEK en 2019 a 7.938 M en 2025 y el EBIT de 1.124 a 1.940 M [1].' },
      { nombre: 'Pierre Brorsson', cargo: 'Director financiero y de desarrollo corporativo', desde: '2021', participacion_pct: 0.0, trayectoria: 'Antes director financiero de Ramirent y cargos en Atlas Copco. Lleva las compras de Global Technologies [1].' },
      { nombre: 'Patrik Tigerschiöld', cargo: 'Presidente del consejo', desde: '2012', participacion_pct: 0.10, trayectoria: 'Presidente de Bure Equity (primer accionista, 22,75 %), antiguo consejero delegado de Bure (2010-2013); consejero desde 2009 [1].' },
      { nombre: 'Charlott Samuelsson', cargo: 'Directora de Pattern Generators', desde: '1996', participacion_pct: 0.02, trayectoria: 'Toda su carrera en Mycronic (posventa, desarrollo); bajo su dirección la división llegó a 3.232 M de ventas y EBIT del 50 % en 2025 [1].' },
      { nombre: 'Magnus Marthinsson', cargo: 'Director de Global Technologies', desde: '2004', participacion_pct: 0.01, trayectoria: 'Posventa y desarrollo en Mycronic; la división pasó de 928 M de ventas en 2023 a 1.632 M en 2025 [1].' },
      { nombre: 'Clemens Jargon', cargo: 'Director de PCB Assembly Solutions', desde: '2015', participacion_pct: 0.0, trayectoria: 'Telecomunicaciones y semiconductores (Infineon, Siemens); la división cayó de EBIT del 12,7 % en 2023 al 5,8 % en 2025 y está en reestructuración [1].' },
    ],
    historial_guidance: [
      { anio: '2024', guia: 'Ventas «al nivel de 6.500 M SEK» (mantenida en el 3T24)', real: '7.057 M', cumplida: 'Sí' },
      { anio: '2025', guia: '7.500 M (feb-25), rebajada a 7.000-7.500 M (abr-25) y devuelta a 7.500 M (jul-25)', real: '7.938 M', cumplida: 'Sí' },
      { anio: '2026', guia: '8.250 M (feb-26), subida a 8.750 M (abr-26) y a 9.250 M (jul-26)', real: '4.919 M en el primer semestre', cumplida: 'Parcial' },
      { anio: '2027-2030', guia: 'Objetivo: 10.000 M de ventas y EBIT de 2.000 M con margen > 20 %', real: '8.649 M de ventas y 2.232 M de EBIT en 12 meses a jun-26; sustituido en ago-26 por 20.000 M en 2032-2035', cumplida: 'Parcial' },
    ],
    comentario: 'Equipo estable y creíble: la previsión anual de ventas se ha cumplido o superado en 2024 y 2025, y en 2026 se ha subido dos veces [7]. El consejero delegado y el director financiero vienen de Atlas Copco y han llevado el grupo hacia compras de nichos, con la parte buena (PCB Test) y la floja (Surfx, Hprobe y RoBAT con EBIT negativo en 2025) [1]. La directora de Pattern Generators lleva 30 años en la empresa, lo que da continuidad técnica pero concentra conocimiento [1]. La única salida en 24 meses fue la de la directora de personas (nov-25), ya sustituida [6]. No hay plan de sucesión público del consejero delegado.',
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      { nombre: 'Patrik Tigerschiöld', cargo: 'Presidente', tipo: 'Dominical', desde: '2009', comisiones: 'Remuneraciones (presidente)' },
      { nombre: 'Arun Bansal', cargo: 'Consejero', tipo: 'Independiente', desde: '2020', comisiones: 'Remuneraciones' },
      { nombre: 'Anna Belfrage', cargo: 'Consejera', tipo: 'Independiente', desde: '2018', comisiones: 'Auditoría (presidenta)' },
      { nombre: 'Katarina Bonde', cargo: 'Consejera', tipo: 'Independiente', desde: '2010', comisiones: 'Auditoría' },
      { nombre: 'Staffan Dahlström', cargo: 'Consejero', tipo: 'Independiente', desde: '2019', comisiones: 'Auditoría' },
      { nombre: 'Jens Hinrichsen', cargo: 'Consejero', tipo: 'Independiente', desde: '2024', comisiones: '—' },
      { nombre: 'Bo Risberg', cargo: 'Consejero', tipo: 'Independiente', desde: '2022', comisiones: 'Remuneraciones' },
      { nombre: 'Jörgen Lundberg', cargo: 'Representante de los empleados', tipo: 'Otro externo', desde: '2019', comisiones: '—' },
      { nombre: 'Sahar Raouf', cargo: 'Representante de los empleados', tipo: 'Otro externo', desde: '2022', comisiones: '—' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: false, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: true, presidente_vinculado_control: true, cambios_cupula_24m: 0,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 24.3, fijo: 8.3, variable_corto: 9.2, variable_largo: 3.9, ratio_salario_medio: null },
    remuneracion: 'El consejero delegado cobró 24,3 M SEK en 2025: 8,0 M de salario, 0,3 M de otras retribuciones, 9,2 M de variable anual, 3,9 M de variable a largo plazo en acciones y 2,8 M de pensión (19,9 M en 2024) [1]. El variable anual puede llegar a una parte alta del salario y se liga a objetivos financieros del grupo (EBIT y crecimiento) [1, 3]; los planes de acciones a largo plazo dan acciones gratuitas según el resultado y la permanencia (en septiembre de 2026 se entregaron 13.948 acciones al consejero delegado) [5]. No hay métrica de ROIC ni de rentabilidad para el accionista en el variable, por eso `variable_ligado_rentabilidad` es «no». La junta de 2026 aprobó el informe de remuneraciones y las directrices; los comunicados no dan el porcentaje de votos [2].',
    accionistas: [
      { nombre: 'Bure Equity', pct: 22.75, tipo: 'Sociedad de inversión (accionista de referencia)', variacion: 'Estable' },
      { nombre: 'SEB Fonder', pct: 8.72, tipo: 'Fondos', variacion: 'n.d.' },
      { nombre: 'Swedbank Robur Fonder', pct: 7.57, tipo: 'Fondos', variacion: 'n.d.' },
      { nombre: 'Cuarto Fondo de Pensiones (AP4)', pct: 7.24, tipo: 'Fondo de pensiones', variacion: 'n.d.' },
      { nombre: 'Handelsbanken Fonder', pct: 5.32, tipo: 'Fondos', variacion: 'n.d.' },
      { nombre: 'Lannebo Kapitalförvaltning', pct: 3.89, tipo: 'Fondos', variacion: 'n.d.' },
      { nombre: 'Vanguard', pct: 3.21, tipo: 'Fondos', variacion: 'n.d.' },
      { nombre: 'Autocartera', pct: 0.29, tipo: 'Autocartera', variacion: '562.876 acciones' },
    ],
    insiders: [
      { fecha: '2026-09-02', persona: 'Anders Lindqvist (consejero delegado)', operacion: 'Venta', acciones: 8073, importe: 2.46 },
      { fecha: '2026-09-02', persona: 'Lena Båvegård (dirección)', operacion: 'Venta', acciones: 3028, importe: 0.92 },
      { fecha: '2026-09-02', persona: 'Clemens Jargon (dirección)', operacion: 'Venta', acciones: 2484, importe: 0.76 },
      { fecha: '2026-09-02', persona: 'Charlott Samuelsson (dirección)', operacion: 'Compra', acciones: 5230, importe: 1.58 },
    ],
    control_y_defensas: 'Una acción, un voto, sin blindajes [1]. Bure Equity tiene el 22,75 % y es de hecho el accionista de control: el presidente del consejo, Patrik Tigerschiöld, preside también Bure, y el consejero delegado de Bure, Henrik Blomquist, está en el comité de nombramientos con SEB Fonder y AP4 (36,6 % de los votos entre los tres) [1, 4]. Con los fondos suecos (más del 60 % del capital entre los diez primeros) el minoritario institucional pesa mucho en las juntas [1]. No hay operaciones vinculadas relevantes. Las operaciones de directivos de 2026 son entregas de acciones de los planes de incentivos y la venta de parte de ellas para pagar impuestos (2 de septiembre, a 304,85 SEK) [5].',
    alertas: ['Ninguna relevante detectada tras revisar el informe de gobierno de 2025, los comunicados de las juntas de 2025 y 2026, el registro de operaciones de directivos de la Finansinspektionen y los comunicados de 12 meses. Las ventas de directivos de septiembre de 2026 son para pagar impuestos de acciones recibidas en planes de incentivos.'],
    confianza: 'Media',
  },
  huecos: [
    { seccion: 'gobierno', campo: 'voto_remuneracion_pct', tipo: 'Complemento', intentos: '1) Comunicado de la junta de 2026: «aprobó el informe de remuneraciones», sin votos; 2) comunicado de la junta de 2025: igual; 3) acta de la junta en la web de la empresa: no localizada en los documentos descargables', decision: 'Omitido' },
    { seccion: 'gobierno', campo: 'remuneracion_ceo.ratio_salario_medio', tipo: 'Complemento', intentos: '1) Nota 8 del informe anual 2025: remuneración y número medio de empleados, sin coste medio por empleado; 2) informe de remuneraciones: no descargado de la web (solo HTML dinámico); 3) cálculo con gastos de personal totales: la nota mezcla países y no da el total comparable', decision: 'Omitido' },
  ],
  fuentes: fC,
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de MYCR.ST, ^OMXSPI y EXV3.DE (precio, rango, volumen, rentabilidades, beta, volatilidad, caída máxima, cierres de cada ejercicio)', editor: 'Yahoo Finance (herramientas/bolsa.mjs)', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/MYCR.ST/history' },
  { id: 2, titulo: 'Consenso de Mycronic y comparables: BPA y ventas por ejercicio, objetivos de precio, recomendaciones (quoteSummary, 20-oct-2026 09:42 UTC)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/MYCR.ST/analysis' },
  { id: 3, titulo: 'Mycronic AB: estimaciones anuales 2026-2028 (ventas, EBITDA, EBIT, beneficio, BPA, dividendo) y objetivo medio', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://www.marketscreener.com/quote/stock/MYCRONIC-AB-6491366/finances/' },
  { id: 4, titulo: 'Modular Finance IR Consensus: Mycronic, consenso del 3T26 (7 analistas: ventas 2.171 M, EBIT 418 M)', editor: 'Modular Finance (vía Inderes)', tipo: 'Analistas', fecha: '2026-10-19', url: 'https://www.inderes.se/en/releases/modular-finance-ir-consensus-mycronic-consensus-estimates-q3-2026' },
  { id: 5, titulo: 'SEB sänker Mycronic till behåll (objetivo 360 SEK, antes 385)', editor: 'Placera (Nordnet)', tipo: 'Prensa', fecha: '2026-10-15', url: 'https://www.placera.se/telegram/mycronic-seb-sanker-mycronic-till-behall-20261015' },
  { id: 6, titulo: 'SB1 höjer riktkursen för Mycronic till 350 kronor – upprepar neutral (EBIT 2027 un 21,5 % bajo el consenso por entregas de Prexision aplazadas)', editor: 'Placera (Nordnet)', tipo: 'Prensa', fecha: '2026-10-14', url: 'https://www.placera.se/telegram/mycronic-sb1-hojer-riktkursen-for-mycronic-till-350-kronor-upprepar-neutral-20261014' },
  { id: 7, titulo: 'Köpråd för Mycronic – här är morgonens aktierekar (DNB Carnegie sube a comprar, objetivo 385 SEK)', editor: 'Placera (Nordnet)', tipo: 'Prensa', fecha: '2026-07-15', url: 'https://placera.se/nyheter/koprad-for-mycronic--har-ar-morgonens-aktierekar-2026-07-15' },
  { id: 8, titulo: 'Mycronic lyfter tvåsiffrigt – analyshuset upprepar Neutral (+13 % el 14-jul-2026)', editor: 'Aktiespararna', tipo: 'Prensa', fecha: '2026-07-14', url: 'https://www.aktiespararna.se/nyheter/mycronic-lyfter-tvasiffrigt-analyshuset-upprepar-neutral' },
  { id: 9, titulo: 'Bono del Estado sueco a 10 años (SEGVB10YC): 3,22 % el 19-oct-2026', editor: 'Sveriges Riksbank (API SWEA)', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://api.riksbank.se/swea/v1/Observations/SEGVB10YC/2026-10-08/2026-10-20' },
  { id: 10, titulo: 'Implied ERP by month (ERP T12m with sustainable payout, oct-2026: 4,20 %)', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 11, titulo: 'Blankningsregistret: posiciones cortas significativas vigentes (ninguna ≥ 0,5 % en Mycronic)', editor: 'Finansinspektionen', tipo: 'Primaria', fecha: '2026-10-20', url: 'https://www.fi.se/sv/vara-register/blankningsregistret/' },
  { id: 12, titulo: 'Annual Report 2025: compras de 2024-2025 (nota 23), acciones y capitalización', editor: 'Mycronic AB (publ)', tipo: 'Primaria', fecha: '2026-04-01', url: `${MFN}/74466bcb-9f6d-45f8-9c6a-71c20d3e0d6e/annual-report-2025.pdf` },
  { id: 13, titulo: 'Interim Report January-June 2026: compras de ETZ y Cowin DST (nota 8), acciones, caja neta y calendario', editor: 'Mycronic AB (publ)', tipo: 'Primaria', fecha: '2026-07-14', url: `${MFN}/c8f3d92b-f205-4f1a-9552-77f0d11afede/interim-report-january-june-2026.pdf` },
  { id: 14, titulo: 'Movimiento del precio de MYCR.ST (1, 3, 6 y 12 meses, máximos, media de 200 sesiones, tendencia): sesión del 20-oct-2026', editor: 'Yahoo Finance (herramientas/movimiento.mjs)', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/MYCR.ST/' },
  { id: 15, titulo: 'Mycronic presents new financial targets (día del inversor, 31-ago-2026)', editor: 'Mycronic AB (publ)', tipo: 'Primaria', fecha: '2026-08-31', url: `${MFN}/9994b3bd-d046-4bc7-8801-089184d16e47/260831-mycronic-presents-new-financial-targets.pdf` },
  { id: 16, titulo: 'Mycronic receives order for two SLX mask writers', editor: 'Mycronic AB (publ)', tipo: 'Primaria', fecha: '2026-10-14', url: `${MFN}/c002cbab-59b6-47c0-a769-78d8210c396a/mycronic-receives-order-for-two-slx-mask-writers.pdf` },
  { id: 17, titulo: 'Year-end Report January-December 2025 (pedidos −19 %, EBIT 342 M en el 4T25)', editor: 'Mycronic AB (publ)', tipo: 'Primaria', fecha: '2026-02-05', url: `${MFN}/41c3f8b1-a8ec-44f6-9e70-2c87b6e2c154/year-end-report-january-december-2025.pdf` },
  { id: 18, titulo: 'Interim Report January-March 2026 (EBIT récord de 938 M; previsión a 8.750 M)', editor: 'Mycronic AB (publ)', tipo: 'Primaria', fecha: '2026-04-24', url: `${MFN}/fc37436b-e2f2-4f49-9f06-cc710a20f428/interim-report-january-march-2026.pdf` },
];
const M = Y['MYCR.ST'];
// Comparables: Yahoo 20-oct-2026 (cierres del 19-oct en EE. UU.; sesión del 20-oct en Europa y Asia). Capitalización en
// M SEK con el tipo de Yahoo del 20-oct. PER de los próximos 12 meses = precio ÷ (BPA ponderado por los meses de los dos
// ejercicios estimados que caen en los 12 meses siguientes). EV/EBITDA de los últimos 12 meses (EBITDA de Yahoo). Sin
// EV/EBITDA adelantado (Yahoo no da el EBITDA estimado; mezclar proveedores rompe la base).
const ntm = (t, w0) => { const tr = Y[t].trend; const e0 = tr.find((x) => x.periodo === '0y'), e1 = tr.find((x) => x.periodo === '+1y'); return { bpa: w0 * e0.bpa + (1 - w0) * e1.bpa, ventas: w0 * e0.ventas + (1 - w0) * e1.ventas }; };
const pesos0 = { '6920.T': 8.3 / 12, KLAC: 8.3 / 12, NVMI: 2.4 / 12, CAMT: 2.4 / 12, ONTO: 2.4 / 12, 'BESI.AS': 2.4 / 12, '0522.HK': 2.4 / 12, KLIC: 0, NDSN: 0.4 / 12, 'AIXA.DE': 2.4 / 12 };
const divisaDe = { '6920.T': 'JPY', KLAC: 'USD', NVMI: 'USD', CAMT: 'USD', ONTO: 'USD', 'BESI.AS': 'EUR', '0522.HK': 'HKD', KLIC: 'USD', NDSN: 'USD', 'AIXA.DE': 'EUR' };
const paisDe = { '6920.T': 'JP', KLAC: 'US', NVMI: 'IL', CAMT: 'IL', ONTO: 'US', 'BESI.AS': 'NL', '0522.HK': 'HK', KLIC: 'US', NDSN: 'US', 'AIXA.DE': 'DE' };
const nombreDe = { '6920.T': 'Lasertec', KLAC: 'KLA', NVMI: 'Nova', CAMT: 'Camtek', ONTO: 'Onto Innovation', 'BESI.AS': 'BE Semiconductor', '0522.HK': 'ASMPT', KLIC: 'Kulicke & Soffa', NDSN: 'Nordson', 'AIXA.DE': 'Aixtron' };
const empresas = Object.keys(pesos0).map((t) => {
  const y = Y[t]; const f = fx[divisaDe[t]]; const n = ntm(t, pesos0[t]);
  return {
    nombre: nombreDe[t], ticker: t, pais: paisDe[t], capitalizacion: Math.round(y.cap * f / 1e6),
    ev_ventas: r2(y.ev / y.ventas), ev_ebitda_ltm: r1(y.ev / y.ebitda), ev_ebitda_ntm: null, per_ntm: r1(y.precio / n.bpa),
    crecimiento_pct: r1((n.ventas / y.ventas - 1) * 100), margen_ebitda_pct: r1(y.ebitda / y.ventas * 100), roic_pct: null,
    dn_ebitda: r1((y.ev - y.cap) / y.ebitda), fcf_yield_pct: null,
  };
});
const perMed = (() => { const s = empresas.map((e) => e.per_ntm).sort((a, b) => a - b); const m = s.length / 2; return s.length % 2 ? s[Math.floor(m)] : r1((s[m - 1] + s[m]) / 2); })();
const ctx = {
  movimiento: { fecha: '2026-10-20', var_1m_pct: -12.6, var_3m_pct: -15.7, var_6m_pct: 9.0, var_12m_pct: 45.5, dist_max_52s_pct: -18.3, dist_min_52s_pct: 55.2, dist_max_historico_pct: -18.3, tendencia: 'alcista', volatilidad_60d_pct: 36, avisos: [] },
  movimientos_fuertes: [
    { periodo: 'feb-2026', var_pct: -9.6, causa: 'Caída del 5-feb-2026 (un día) con los resultados del 4T25: pedidos −19 % y EBIT de 342 M frente a 376 M esperados [17].', veredicto: 'no cambia', condicion: null },
    { periodo: 'mar-abr-2026', var_pct: 42.5, causa: 'Subida de un mes hasta el 24-abr-2026: EBIT récord de 938 M en el 1T26 (consenso 898 M) con el primer Prexision 8000 Evo, y previsión de ventas subida a 8.750 M [18].', veredicto: 'no cambia', condicion: null },
    { periodo: 'jul-2026', var_pct: 13, causa: 'Subida del 14-jul-2026 (≈ +13 % en el día) con el 2T26: pedidos récord de 2.917 M (37 % sobre lo esperado), EBIT de 698 M y previsión a 9.250 M [8].', veredicto: 'no cambia', condicion: null },
    { periodo: 'sep-oct-2026', var_pct: -12.6, causa: 'Caída del 12,6 % en el último mes desde el máximo de 364,40 SEK (6-oct): SEB bajó la recomendación a mantener el 15-oct (−8,1 % ese día; objetivo de 385 a 360 SEK) por la incertidumbre de Pattern Generators en 2027 y la valoración en línea con el sector, y SB1 avisó el 14-oct de un EBIT de 2027 un 21,5 % bajo el consenso por entregas de Prexision aplazadas [5, 6].', veredicto: 'no cambia', condicion: null },
  ],
  noticias: [
    { fecha: '2026-10-22', tipo: 'resultados', hecho: 'Resultados del 3T26 el jueves 22-oct a las 8:00; consenso de siete analistas: ventas de 2.171 M y EBIT de 418 M [4, 13].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-10-15', tipo: 'recomendación', hecho: 'SEB baja a mantener (de comprar) con objetivo de 360 SEK (385): sube un 2-5 % el EBIT ajustado de 2026-2028 por divisa, pero ve incertidumbre en Pattern Generators en 2027 y la acción a 22 veces EV/EBIT de 2027, como el sector [5].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-10-14', tipo: 'recomendación', hecho: 'SB1 Markets mantiene neutral y sube el objetivo a 350 SEK (335); su EBIT de 2027 queda un 21,5 % bajo el consenso por entregas de Prexision aplazadas [6].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-10-14', tipo: 'resultados', hecho: 'Pedido de dos SLX de un cliente de EE. UU. por 14-16 M USD, entrega en el 1T28 [16].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-09-02', tipo: 'directivos', hecho: 'Entrega de acciones de los planes de incentivos al consejero delegado y a la dirección, y venta de una parte para pagar impuestos (consejero delegado: 8.073 acciones a 304,85 SEK) [12].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-08-31', tipo: 'resultados', hecho: 'Día del inversor: objetivo de 20.000 M de ventas en 2032-2035 con margen EBIT en torno al 25 % [15].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-07-15', tipo: 'recomendación', hecho: 'DNB Carnegie sube a comprar con objetivo de 385 SEK (320) tras el 2T26 [7].', veredicto: 'no cambia', condicion: null },
  ],
  proximos_resultados: '2026-10-22',
  veredicto: 'no cambia',
  condicion: null,
  comentario: 'La acción subió un 45,5 % en 12 meses por tres resultados mejores de lo esperado (1T26 y 2T26 con previsiones al alza) y cayó un 18,3 % desde el máximo del 6-oct por dos informes de bancos que ven un 2027 flojo en máscaras [5, 6, 14]. Esa caída tiene causa y la tesis del informe ya la recoge (cartera de Pattern Generators para 2027 con cuatro sistemas). No hay colocaciones, ampliaciones, litigios ni ofertas pendientes; Bure no ha anunciado ventas. Los resultados del 3T26 (22-oct) no aplazan la decisión (regla 11). Veredicto: no cambia.',
};
const D = {
  _estado: 'completa',
  _per_mediana_comparables: perMed,
  identificacion: {
    nombre: 'Mycronic AB (publ)', nombre_corto: 'Mycronic', ticker: 'MYCR', isin: 'SE0025158629', mercado: 'Nasdaq Stockholm (Large Cap)', indice_referencia: 'OMX Stockholm All-Share (OMXSPI)',
    pais: 'Suecia', pais_iso: 'SE', sector: 'Tecnología de la información', industria: 'Equipos para semiconductores y electrónica', sede: 'Täby (Estocolmo)', fundacion: '1984', empleados: 2772, web: 'https://www.mycronic.com',
    precio: B.identificacion.precio, fecha_precio: B.identificacion.fecha_precio, acciones: 195.35, capitalizacion_publicada: Math.round(M.cap / 1e6), free_float_pct: 77.0,
    max_52s: B.identificacion.max_52s, min_52s: B.identificacion.min_52s, volumen_medio_diario: `≈ ${B.volumen_3m.importe_dia_millones.toFixed(1).replace('.', ',')} M SEK/día (3 meses)`, proximos_resultados: '2026-10-22',
  },
  consenso: {
    guidance: 'Previsión de 2026: ventas «al nivel de 9.250 M SEK», subida el 14-jul-2026 desde 8.750 M (24-abr) y 8.250 M (5-feb) [13, 18, 17]. No da previsión de márgenes. Objetivo a medio plazo presentado el 31-ago-2026: 20.000 M de ventas en 2032-2035 con margen EBIT en torno al 25 % y cada división por encima del 10 % [15]; sustituye al de 10.000 M y 2.000 M de EBIT en 2027-2030. PCB Assembly Solutions debe volver a un margen EBIT > 10 % a finales de 2027 [13].',
    estimaciones: [
      { periodo: '2026e', ingresos: 9377, ebitda: 2840, ebit: 2476, bpa: 9.90, dpa: 3.83, fuente: 'MarketScreener (4 analistas) [3]; Yahoo da BPA de 10,28 y ventas de 9.377 M [2]' },
      { periodo: '2027e', ingresos: 10048, ebitda: 2961, ebit: 2595, bpa: 10.70, dpa: 3.97, fuente: 'MarketScreener [3]; Yahoo BPA 11,00 [2]' },
      { periodo: '2028e', ingresos: 11478, ebitda: 3562, ebit: 3150, bpa: 12.93, dpa: 5.06, fuente: 'MarketScreener [3]' },
    ],
    recomendaciones: { n_analistas: 4, comprar: 1, mantener: 2, vender: 1, po_medio: M.po_medio, po_min: M.po_min, po_max: M.po_max },
    revisiones: 'En 90 días el BPA de 2026 de Yahoo pasó de 10,22 a 10,28 y el de 2027 de 11,01 a 11,00: estable [2]. En 12 meses las estimaciones subieron mucho por los pedidos de Global Technologies y las dos subidas de la previsión (DNB Carnegie llevó su objetivo de 320 a 385 SEK en julio) [7]. En octubre el sesgo es a la baja para 2027: SB1 está un 21,5 % bajo el consenso en EBIT de 2027 por entregas de Prexision aplazadas y SEB bajó a mantener [5, 6]. Solo hay estimaciones completas de cuatro analistas en las fuentes gratuitas (MarketScreener y Yahoo, que coinciden en ventas); Modular Finance reúne a siete para el trimestre [4]. Los objetivos van de 230 a 385 SEK.',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    ...B.bolsa,
    posicion_corta_pct: null,
    comentario: 'La acción ha batido con claridad al índice sueco: +49,4 % en un año frente al +12,0 % del OMXSPI y +36,7 % anual a tres años frente al +14,1 % (rentabilidades de precio) [1]. Los años malos coinciden con los valles de pedidos de máscaras (2021 −14 % y 2022 −7 %) [1]. La caída máxima en cinco años fue del −43,4 % (nov-21 a sep-22) [1]. Volatilidad del 39 % y beta de 0,93 frente al OMXSPI (1,02 semanal) [1]. No hay posiciones cortas declaradas de 0,5 % o más en el registro de la Finansinspektionen [11]. Desde el máximo del 6-oct-2026 (364,40 SEK) ha caído un 18 % por las rebajas de SEB y SB1 [5, 6].',
    contexto: ctx,
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: B.cierres_ejercicio.filter((c) => +c.anio >= 2020).map((c) => ({ anio: c.anio, precio_cierre: c.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    comentario: null,
    confianza: 'Alta',
  },
  comparables: {
    criterio: 'Fabricantes cotizados de equipos de semiconductores y electrónica con nichos de alta precisión y margen alto: inspección y metrología de máscaras y obleas (Lasertec, KLA, Nova, Camtek, Onto), unión de chips y encapsulado (BESI, ASMPT, Kulicke & Soffa), dispensado (Nordson) y deposición (Aixtron). No hay ningún fabricante cotizado de escritoras láser de máscaras: Applied Materials las fabrica dentro de un grupo de 30.800 M USD y no se usa; Photronics es cliente, no comparable [2].',
    empresas,
    comentario: null,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2026-03', objetivo: 'Cowin DST (Corea; reparación de pantallas y máscaras)', comprador: 'Mycronic', ev: 185, ev_ventas: 2.37, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Ventas de 78 M SEK en 2025 [13].' },
      { fecha: '2026-01', objetivo: 'ETZ (Alemania; sondas de prueba)', comprador: 'Mycronic', ev: 38, ev_ventas: 0.86, ev_ebitda: null, prima_pct: null, excluir: true, comentario: 'El 85 % de sus ventas eran a Mycronic: proveedor integrado, no comparable [13].' },
      { fecha: '2025-06', objetivo: 'Surfx Technologies (EE. UU.; plasma atmosférico)', comprador: 'Mycronic', ev: 840, ev_ventas: 7.29, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '87,5 M USD sobre ventas de 12 M USD en 2024 (25-30 M USD previstos para 2025: ≈ 3,2x) [12].' },
      { fecha: '2025-04', objetivo: 'RoBAT (Reino Unido; pruebas)', comprador: 'Mycronic', ev: 97, ev_ventas: 2.5, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '7,5 M GBP sobre ventas de 3 M GBP en 2024, más hasta 4 M GBP contingentes [12].' },
      { fecha: '2025-03', objetivo: 'Hprobe (Francia; pruebas magnéticas)', comprador: 'Mycronic', ev: 175, ev_ventas: 4.0, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '16 M EUR sobre ventas de 4 M EUR en 2024 [12].' },
    ],
    comentario: 'Son compras pequeñas de la propia Mycronic, todas en efectivo y sin EBITDA publicado: pagó entre 2,4 y 7,3 veces las ventas por empresas que restaban EBIT [12, 13]. Sirven para ver la disciplina de compra, no para valorar el grupo, que no tiene operaciones comparables recientes con múltiplo público. Con Bure al 22,75 % y una capitalización de unos 57.000 M SEK, una oferta por el grupo es poco probable a corto plazo.',
    confianza: 'Media',
  },
  huecos: [
    { seccion: 'multiplos_historicos', campo: 'ev_ebitda_ntm / per_ntm', tipo: 'Complemento', intentos: '1) Informe anual 2025: solo PER al cierre sobre el BPA del año; 2) Yahoo: sin series históricas de múltiplos adelantados; 3) MarketScreener: series de pago', decision: 'Omitido' },
    { seccion: 'bolsa', campo: 'posicion_corta_pct', tipo: 'Complemento', intentos: '1) Registro de cortos de la Finansinspektionen (vigentes): ninguna posición ≥ 0,5 %; 2) Yahoo: sin dato para Estocolmo; 3) no hay dato agregado por debajo del umbral de publicación', decision: 'Omitido' },
  ],
  fuentes: fD,
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const E = {
  _estado: 'completa',
  sentimiento: null,
  huecos: [
    { seccion: 'sentimiento', campo: 'sección entera', tipo: 'Complemento', intentos: '1) Stocktwits (API, MYCR.ST): símbolo no encontrado; Simply Wall St (narrativas de usuarios): 403; 2) foros nórdicos: el foro de Inderes no tiene hilo propio de Mycronic (solo menciones sueltas) y el foro de Nordnet y Onvista no muestran mensajes sin sesión; 3) búsqueda de debates en Reddit, Flashback y Placera de los últimos tres meses: ningún hilo con debate real', decision: 'Omitido' },
  ],
  fuentes: [],
};
guarda('E', E);
console.log('Notas A-E escritas. PER mediano de comparables:', perMed, empresas.map((e) => `${e.nombre} ${e.per_ntm}`).join(', '));
