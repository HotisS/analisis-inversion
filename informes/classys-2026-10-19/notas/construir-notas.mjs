// Escribe las notas A-E de CLASSYS Inc. (214150.KQ, KOSDAQ; corte 2026-10-19, cierre del 19-oct en Seúl).
// Fuentes: informes anuales en inglés 2023, 2024 y 2025 (estados consolidados K-IFRS auditados, tres ejercicios cada uno),
// informe de auditoría consolidado de 2022 (Nexia Samduk), informe anual de negocio FY2022 (consejo, dividendos, auditor),
// hojas de datos («Fact Sheet») 4Q23, 4Q24 y 2Q26 e «IR Book» 4Q25, 1Q26 y 2Q26 de la web de inversores, presentación de la
// compra de MedSystems (24-oct-2025), FnGuide/WiseReport (consenso, accionistas, informes de analistas), Yahoo Finance
// (bolsa y comparables), prensa coreana (Seoul Economic Daily, Edaily, Newsis, Asiae, SmartToday, Hansbiz) y el foro de Naver.
// DART (dart.fss.or.kr) no responde desde este entorno (respuesta vacía, código 52): los informes trimestrales coreanos
// (분기보고서) no se han podido abrir; las cifras trimestrales salen de las hojas de datos de la propia empresa.
// Cada nota cita solo con [n] de su propia lista. Ejecutar: node informes/classys-2026-10-19/notas/construir-notas.mjs
// Ejercicio natural (31-dic). Cifras en millones de KRW salvo que se diga otra cosa.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const W = 'https://classys.com/wp-content/uploads/sites/2';
const bolsa = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const compsRaw = JSON.parse(fs.readFileSync(path.join(dir, 'comparables-yahoo-raw.json'), 'utf8'));
const USDKRW = 1329.83; // Yahoo KRW=X, 19-oct-2026
const CNYKRW = 199.06; // Yahoo CNYKRW=X, 19-oct-2026

// ================================================================ A. Cuentas
const fA = [
  { id: 1, titulo: 'Annual Report 2025: estados consolidados K-IFRS de 2025, 2024 y 2023 (situación, resultados, gastos generales, aplicación del resultado, flujos y cambios en el patrimonio), estructura accionarial, dividendos y recompras', editor: 'CLASSYS Inc.', tipo: 'Primaria', fecha: '2026-04-22', url: `${W}/2026/04/CLASSYS_AR-2025_eng_v2-1_0422-1.pdf` },
  { id: 2, titulo: 'Annual Report 2023: balance, cuenta y flujos consolidados de 2023, 2022 y 2021', editor: 'CLASSYS Inc.', tipo: 'Primaria', fecha: '2024-04-24', url: `${W}/2024/04/2023-Annual-Report_Eng_vF_240424-2.pdf` },
  { id: 3, titulo: 'Annual Report 2024: estados consolidados de 2024, 2023 y 2022 (amortizaciones, intereses, inversiones)', editor: 'CLASSYS Inc.', tipo: 'Primaria', fecha: '2025-05-07', url: `${W}/2025/04/Annual-Report_CLASSYS_2024_Eng_vS_250507.pdf` },
  { id: 4, titulo: 'Audit Report on Consolidated Financial Statements FY2022 (Nexia Samduk): estados de 2022 y 2021 y notas', editor: 'CLASSYS Inc. / Nexia Samduk', tipo: 'Primaria', fecha: '2023-03-20', url: `${W}/2024/02/CLASSYS-Audit-Report-on-Consolidated-Financial-Statements-FY2022_vF.pdf` },
  { id: 5, titulo: 'Fact Sheet 2Q26 (xlsx): cuenta trimestral 1Q25-2Q26, ventas por línea y región, balance trimestral desde 2018 con desglose de clientes por antigüedad y provisión', editor: 'CLASSYS Inc.', tipo: 'Primaria', fecha: '2026-08-12', url: `${W}/2026/08/FactSheet_2Q26_260812_vF.xlsx` },
  { id: 6, titulo: 'IR Book (Finance) 2Q26: resultados del 2T26, ventas por línea, gastos, situación financiera, base instalada e iniciativas del 2S26', editor: 'CLASSYS Inc.', tipo: 'Primaria', fecha: '2026-08-12', url: `${W}/2026/08/Classys-IR-Book_2Q26_Eng_vF_260812-2.pdf` },
  { id: 7, titulo: 'IR Book (Finance) 1Q26: resultados del 1T26, dividendo de 65.153 M, hoja de ruta y guía de 2026', editor: 'CLASSYS Inc.', tipo: 'Primaria', fecha: '2026-05-13', url: `${W}/2026/05/Classys-IR-Book_1Q26_Eng_vF_260513-1.pdf` },
  { id: 8, titulo: 'IR Book (Finance) 4Q25: resultados de 2025, base instalada y guía de 2026 (490.000 M, banda 470.000-510.000 M)', editor: 'CLASSYS Inc.', tipo: 'Primaria', fecha: '2026-02-13', url: `${W}/2026/02/Classys-IR-Book_4Q25_Eng_vF_260213.pdf` },
  { id: 9, titulo: 'Fact Sheet 4Q24 (xlsx): cuenta trimestral 2017-2024', editor: 'CLASSYS Inc.', tipo: 'Primaria', fecha: '2025-02-13', url: `${W}/2025/02/FactSheet_4Q24_vF.xlsx` },
  { id: 10, titulo: 'Fact Sheet 4Q23 (xlsx): cuenta anual 2014-2023 y ventas por marca', editor: 'CLASSYS Inc.', tipo: 'Primaria', fecha: '2024-02-14', url: `${W}/2024/02/FactSheet_4Q23_vF_240214-1.xlsx` },
  { id: 11, titulo: 'Annual Business Report FY2022 (traducción del 사업보고서): dividendos por acción 2019-2022, auditor, consejo', editor: 'CLASSYS Inc.', tipo: 'Primaria', fecha: '2023-03-21', url: `${W}/2024/02/CLASSYS-Annual-Business-Report-FY2022_vF.pdf` },
  { id: 12, titulo: 'Direct Expansion into South America through the Agreement to acquire MedSystems (presentación de la compra)', editor: 'CLASSYS Inc.', tipo: 'Primaria', fecha: '2025-10-24', url: `${W}/2025/10/Classys-IR-BOOK_Brazil_vF_251024_Eng.pdf` },
  { id: 13, titulo: '클래시스, 브라질 법인 편입 효과에도…국내 부진에 전망치 하회 [Why 바이오] (2T26 frente al consenso)', editor: 'Seoul Economic Daily', tipo: 'Prensa', fecha: '2026-08-13', url: 'https://www.sedaily.com/article/20078860' },
  { id: 14, titulo: '클래시스, 매출 신기록에도 목표 축소…결국 ‘브라질’이 핵심 변수 (guía de 2026 rebajada a 445.000 M)', editor: 'Edaily', tipo: 'Prensa', fecha: '2026-08-14', url: 'https://www.edaily.co.kr/News/Read?newsId=03952406645547320&mediaCodeNo=257' },
  { id: 15, titulo: '"7개월만 수장 교체"…\'K-뷰티\' 클래시스에 무슨일? (1T26: ventas 87.200 M, beneficio operativo 37.200 M)', editor: 'Newsis', tipo: 'Prensa', fecha: '2026-07-15', url: 'https://www.newsis.com/view/NISX20260715_0003710804' },
];

// Cuenta por función (K-IFRS). EBITDA = beneficio operativo + amortización del inmovilizado + de inversiones inmobiliarias +
// de intangibles (notas de flujos). resultado_financiero = ingresos − gastos financieros + otros ingresos − otros gastos
// − puesta en equivalencia (todo lo que hay entre el beneficio operativo y el BAI). BPA diluido publicado; acciones diluidas
// = beneficio atribuido ÷ BPA diluido. DPA del ejercicio (se paga en abril del año siguiente).
const cuenta = [
  { periodo: '2021', ingresos: 100596.9, coste_ventas: 22744.3, gastos_generales: 26139.9, ebitda: 54236.2, amortizaciones: 2523.0, ebit: 51712.7, resultado_financiero: 3911.9, bai: 55624.6, impuestos: 11819.9, minoritarios: 0, beneficio_neto: 43804.7, gastos_financieros: 93.1, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 676, dpa: 66, dpa_extraordinario: 0, acciones_diluidas: 64.80 },
  { periodo: '2022', ingresos: 141803.2, coste_ventas: 33636.2, gastos_generales: 39290.8, ebitda: 72775.3, amortizaciones: 3899.1, ebit: 68876.2, resultado_financiero: 27882.2, bai: 96758.4, impuestos: 21379.8, minoritarios: 0, beneficio_neto: 75378.6, gastos_financieros: 2609.8, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 1165, dpa: 116, dpa_extraordinario: 0, acciones_diluidas: 64.70 },
  { periodo: '2023', ingresos: 180122.8, coste_ventas: 39673.7, gastos_generales: 50826.7, ebitda: 93899.6, amortizaciones: 4277.2, ebit: 89622.4, resultado_financiero: 4219.5, bai: 93841.8, impuestos: 19616.6, minoritarios: 0, beneficio_neto: 74225.2, gastos_financieros: 1958.7, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 1152, dpa: 200, dpa_extraordinario: 0, acciones_diluidas: 64.43 },
  { periodo: '2024', ingresos: 242939.0, coste_ventas: 51811.0, gastos_generales: 68685.0, ebitda: 129662.6, amortizaciones: 7219.0, ebit: 122443.6, resultado_financiero: 5489.0, bai: 127932.6, impuestos: 30387.0, minoritarios: -332.0, beneficio_neto: 97875.0, gastos_financieros: 2040.6, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 1509, dpa: 257, dpa_extraordinario: 0, acciones_diluidas: 64.86 },
  { periodo: '2025', ingresos: 336820.0, coste_ventas: 75728.0, gastos_generales: 90491.0, ebitda: 185242.0, amortizaciones: 14641.0, ebit: 170601.0, resultado_financiero: -1970.0, bai: 168631.0, impuestos: 36661.0, minoritarios: 34.0, beneficio_neto: 131936.0, gastos_financieros: 2421.0, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 2005, dpa: 1000, dpa_extraordinario: 0, acciones_diluidas: 65.80 },
];
// Balance. caja = efectivo + instrumentos financieros a corto + activos financieros a valor razonable corrientes (la empresa
// los llama «Cash & Cash Equivalents» en su IR Book). deuda_financiera = préstamos a corto y largo + bonos convertibles.
// intangibles incluye el fondo de comercio y los intangibles de la fusión con Iruda (la empresa no los separa en el informe
// anual en inglés). 2023: inventarios y clientes del Annual Report 2023 (el de 2025 los presenta desplazados en esa columna).
const balanceHist = [
  { periodo: '2021', activo_total: 216379.2, activo_corriente: 73140.0, pasivo_corriente: 16793.0, pasivo_total: 52634.8, fondo_comercio: 0, intangibles: 1124.0, inmovilizado_material: 80704.6, existencias: 16465.4, clientes: 2115.9, proveedores: 1762.7, activos_contrato: null, pasivos_contrato: null, caja: 47913.3, deuda_financiera: 35000.0, arrendamientos: 805.6, patrimonio_neto: 163744.4, minoritarios: 0, reservas: 133123.0 },
  { periodo: '2022', activo_total: 331411.1, activo_corriente: 147788.7, pasivo_corriente: 36225.2, pasivo_total: 101857.3, fondo_comercio: 0, intangibles: 1478.4, inmovilizado_material: 104241.6, existencias: 23397.7, clientes: 8004.0, proveedores: 2125.0, activos_contrato: null, pasivos_contrato: null, caja: 111580.6, deuda_financiera: 66800.0, arrendamientos: 1098.6, patrimonio_neto: 229553.9, minoritarios: 0, reservas: 204230.3 },
  { periodo: '2023', activo_total: 375443.0, activo_corriente: 185737.5, pasivo_corriente: 29246.4, pasivo_total: 91942.5, fondo_comercio: 0, intangibles: 2822.3, inmovilizado_material: 138988.7, existencias: 19434.3, clientes: 17710.8, proveedores: 2374.6, activos_contrato: null, pasivos_contrato: null, caja: 136856.8, deuda_financiera: 64400.0, arrendamientos: 1228.1, patrimonio_neto: 283500.5, minoritarios: 0, reservas: 270984.1 },
  { periodo: '2024', activo_total: 608379.0, activo_corriente: 234202.0, pasivo_corriente: 128904.0, pasivo_total: 155735.0, fondo_comercio: 0, intangibles: 140948.0, inmovilizado_material: 193173.0, existencias: 30000.0, clientes: 36937.0, proveedores: 3921.0, activos_contrato: null, pasivos_contrato: null, caja: 158041.0, deuda_financiera: 90326.0, arrendamientos: 787.0, patrimonio_neto: 453965.0, minoritarios: -1321.0, reservas: 336059.0 },
  { periodo: '2025', activo_total: 704650.0, activo_corriente: 295772.0, pasivo_corriente: 80204.0, pasivo_total: 152975.0, fondo_comercio: 0, intangibles: 139635.0, inmovilizado_material: 199716.0, existencias: 30096.0, clientes: 48372.0, proveedores: 4594.0, activos_contrato: null, pasivos_contrato: null, caja: 207561.0, deuda_financiera: 86515.0, arrendamientos: 277.0, patrimonio_neto: 552974.0, minoritarios: -1299.0, reservas: 547533.0 },
];
// Flujos. capex = inmovilizado material + intangibles + inversiones inmobiliarias (edificios de la sede comprados en 2021-2022
// como inversión inmobiliaria y pasados después a uso propio). Intereses pagados en explotación. 2024: adquisiciones =
// compra de acciones de Iruda antes de la fusión (30.853) − caja recibida en la fusión (5.088). 2025: «otros pagos de
// inversión» de 8.500 (anticipo de la compra de JL Health / MedSystems, que cerró el 4-mar-2026).
const flujosHist = [
  { periodo: '2021', flujo_operativo: 36367.0, capex: 91315.7, pagos_arrendamientos: 411.7, adquisiciones: 0, desinversiones: 61.6, dividendos: 3882.6, recompras: 0, emision_acciones: 14.0, intereses_en_financiacion: 0 },
  { periodo: '2022', flujo_operativo: 54754.5, capex: 71758.3, pagos_arrendamientos: 618.7, adquisiciones: 0, desinversiones: 60027.6, dividendos: 4271.3, recompras: 5422.0, emision_acciones: 108.8, intereses_en_financiacion: 0 },
  { periodo: '2023', flujo_operativo: 64632.0, capex: 6112.5, pagos_arrendamientos: 876.5, adquisiciones: 0, desinversiones: 120.8, dividendos: 7471.5, recompras: 14578.0, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: '2024', flujo_operativo: 102800.4, capex: 10783.7, pagos_arrendamientos: 831.0, adquisiciones: 25765.0, desinversiones: 67.0, dividendos: 12799.9, recompras: 30.0, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: '2025', flujo_operativo: 114215.0, capex: 19343.0, pagos_arrendamientos: 534.0, adquisiciones: 8500.0, desinversiones: 2401.0, dividendos: 16834.0, recompras: 18142.0, emision_acciones: 66.0, intereses_en_financiacion: 0 },
];

const A = {
  _estado: 'completa',
  financieros: {
    cuenta,
    // LTM jun-26 = 3T25 + 4T25 + 1T26 + 2T26 de la hoja de datos 2Q26 (miles de millones con un decimal). BPA LTM = 137.600 ÷ 65,15 M.
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 369100, ebitda: 185300, ebit: 169900, beneficio_neto: 137600, bpa: 2112, dpa: 1000, dpa_extraordinario: 0, fcf: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [
      { periodo: '2024', descripcion: 'Fusión por absorción de Iruda (microagujas y radiofrecuencia, controlada también por Bain Capital) con efecto 1-oct-2024: entra en el balance de 2024 (intangibles de 2.822 a 140.948 M) y solo un trimestre en la cuenta.' },
    ],
    comentario: 'Las ventas pasaron de 100.597 M KRW en 2021 a 336.820 M en 2025: un crecimiento anual del 35 %, que la empresa atribuye al aumento de la base instalada de equipos (más de 45.000 unidades acumuladas en 2025) y a los consumibles que estos generan [1, 8]. Casi todo es orgánico salvo el cuarto trimestre de 2024 y los tres primeros de 2025, que llevan Iruda (fusionada el 1-oct-2024) [1, 5]. El margen bruto se mantuvo entre el 76 % y el 78 % y el EBIT entre el 48,6 % y el 51,4 %: 51,4 % en 2021, 48,6 % en 2022 (más gastos comerciales), 49,8 % en 2023, 50,4 % en 2024 y 50,7 % en 2025 [2, 1]. La amortización saltó de 4.277 M en 2023 a 14.641 M en 2025 por los intangibles de Iruda (7.985 M de amortización de intangibles en 2025). En 2026 el margen cae: el 2T26 dejó un EBIT del 41,6 % (51,6 % un año antes) por la consolidación de los distribuidores de Brasil, Colombia y Argentina desde marzo (15.100 M de ventas con margen bajo, eliminación de beneficios no realizados y 12.000 M de nóminas), por el mercado coreano (ventas en Corea −25,3 %) y por la publicidad (+104 %) [6]. Los últimos doce meses suman 369.100 M de ventas y 169.900 M de EBIT (46,0 %) [5].',
    ajustes: 'Cifras publicadas K-IFRS, sin ajustes. Partidas no recurrentes por debajo del EBIT: en 2022, 30.374 M de otros ingresos (plusvalía de la venta de edificios: 60.028 M cobrados por venta de inmovilizado) que explican que el beneficio de 2022 (75.379 M) supere al de 2023 (74.225 M) [2]; en 2024, 11.689 M de pérdida por la baja de la participación en Iruda al fusionarla, dentro de los 12.003 M de otros gastos [1]. En 2025 los gastos financieros (10.871 M) incluyen 2.649 M de diferencias de cambio y 2.331 M de derivados [1]. En el 1S26 el resultado financiero neto fue +1.200 M (15.600 M de ingresos y 14.400 M de gastos), con 12.000 M de gastos financieros solo en el 2T26 [6]. La empresa publica el EBITDA en sus hojas de datos con la misma definición que aquí (beneficio operativo más amortizaciones) [5].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '3T24', ingresos: 59400, crecimiento_pct: 23.2, crecimiento_organico_pct: 23.2, ebitda: 30200, margen_ebitda_pct: 50.8, bpa: 254, vs_consenso: null },
      { periodo: '4T24', ingresos: 74400, crecimiento_pct: 58.3, crecimiento_organico_pct: null, ebitda: 39500, margen_ebitda_pct: 53.1, bpa: 437, vs_consenso: null },
      { periodo: '1T25', ingresos: 77100, crecimiento_pct: 53.0, crecimiento_organico_pct: null, ebitda: 42300, margen_ebitda_pct: 54.9, bpa: 458, vs_consenso: null },
      { periodo: '2T25', ingresos: 83300, crecimiento_pct: 41.9, crecimiento_organico_pct: null, ebitda: 46700, margen_ebitda_pct: 56.1, bpa: 408, vs_consenso: null },
      { periodo: '3T25', ingresos: 83000, crecimiento_pct: 39.7, crecimiento_organico_pct: null, ebitda: 41300, margen_ebitda_pct: 49.8, bpa: 507, vs_consenso: null },
      { periodo: '4T25', ingresos: 93400, crecimiento_pct: 25.5, crecimiento_organico_pct: 25.5, ebitda: 54900, margen_ebitda_pct: 58.8, bpa: 654, vs_consenso: null },
      { periodo: '1T26', ingresos: 87200, crecimiento_pct: 13.1, crecimiento_organico_pct: 10.8, ebitda: 41000, margen_ebitda_pct: 47.0, bpa: 516, vs_consenso: 'Inferior' },
      { periodo: '2T26', ingresos: 105500, crecimiento_pct: 26.7, crecimiento_organico_pct: 8.6, ebitda: 48100, margen_ebitda_pct: 45.6, bpa: 436, vs_consenso: 'Inferior' },
    ],
    ultima_presentacion: 'Las dos últimas presentaciones (13-may y 12-ago-2026) cambian de tono. En mayo la empresa mantuvo la guía de 2026 (490.000 M de ventas, +45 %, banda 470.000-510.000 M) y la presentó como «en curso», con la compra de MedSystems cerrada el 4-mar y el lanzamiento de Quadessy en EE. UU. y Tailandia [7]. El 1T26 había quedado por debajo del consenso: ventas 87.200 M (+13,1 %) frente a 90.400 M esperados y beneficio operativo 37.200 M (−4,1 %) frente a 43.600 M, con el margen del 50,3 % al 42,7 % [15, 7]. En agosto bajó la guía a 445.000 M «de forma más conservadora a la vista del semestre» [14]. El 2T26 dejó 105.500 M de ventas (+26,7 %, primer trimestre por encima de 100.000 M) y 43.900 M de beneficio operativo (+2,2 %), un 3,5 % y un 9,1 % por debajo del consenso (109.400 M y 48.400 M) [13, 6]. La dirección defendió que el margen individual de la matriz sigue por encima del 50 % (50,8 %) y que la caída consolidada viene de Sudamérica (beneficios no realizados de 3.000 M en el 1T y 1.700 M en el 2T) y de Japón [6, 14]. Lo que más se preguntó y se explicó a medias: el mercado coreano (equipos −39,4 %, consumibles −15,1 %), que la empresa atribuye a una base alta y al efecto de Reepot, y el calendario de normalización de Brasil; no dio margen objetivo ni cifra de cobros de la cartera brasileña [6, 14].',
    confianza: 'Media',
  },
  balance: {
    historico: balanceHist,
    vencimientos: [{ anio: '2026-27', importe: 141079 }, { anio: '2027+', importe: 5581 }],
    liquidez: 'Caja, depósitos y activos financieros a corto de 136.101 M a 30-jun-2026 (78.701 M de efectivo, 56.461 M de instrumentos a corto y 939 M a valor razonable), frente a 146.660 M de préstamos (141.079 M a corto: el préstamo de la sede reclasificado a corto y las deudas de Sudamérica) [5, 6]. Deuda neta de 10.559 M sin arrendamientos.',
    rating: 'Sin rating público',
    coste_deuda_pct: 2.8,
    vida_media_anios: null,
    otros_pasivos: 'Sin pensiones de prestación definida relevantes (1.038 M de gasto por jubilación en 2025) [1]. Provisiones por garantías de 2.839 M a junio de 2026 [5]. La compra de JL Health (77,5 %) incluye una opción de venta de los vendedores sobre el 22,5 % restante y un pago condicionado según resultados, sin importe publicado [12]. El punto delicado son los clientes: a 30-jun-2026 la cartera bruta era de 109.668 M con una provisión de 62.314 M (1.739 M a cierre de 2025), y 41.879 M tienen más de 12 meses; además hay 7.715 M de clientes a largo plazo y en 2025 apareció una cuenta a cobrar a largo plazo de 29.507 M [5]. La empresa lo explica como la consolidación de las cuentas a cobrar de Sudamérica «con una gestión del riesgo de crédito reforzada» [6]. Impuesto diferido activo de 27.640 M desde la consolidación [5].',
    comentario: 'Hasta 2025 el balance era de caja neta: 207.561 M de caja y depósitos frente a 86.515 M de deuda (121.046 M netos) [1]. En el 1S26 la caja bajó a 136.101 M y la deuda subió a 146.660 M: se pagó el dividendo de 65.153 M en abril [7], se pagó la compra de Sudamérica y la deuda de los distribuidores pasó al balance [6]. El circulante comercial se duplicó en seis meses: existencias de 30.096 a 64.897 M y clientes de 48.372 a 98.395 M (netos) [5]. Con unas ventas anualizadas del 2T26 de 422.000 M, el circulante es del 37 % de las ventas, frente al 22 % de 2025: el negocio directo en Brasil cobra a plazos a las clínicas (MedSystems tiene una filial de financiación, MB) [12]. La deuda bruta equivale a 0,8 veces el EBITDA de los últimos doce meses.',
    confianza: 'Media',
  },
  flujos: {
    historico: flujosHist,
    comentario: 'El flujo operativo pasó de 36.367 M en 2021 a 114.215 M en 2025 [2, 1]. La conversión empeoró en 2025: el beneficio fue de 131.970 M y el flujo operativo de 114.215 M porque los clientes subieron 40.519 M [1]. El capex de 2021-2022 (91.316 M y 71.758 M) fue sobre todo la compra de edificios para la sede de Teherán-ro (inversiones inmobiliarias de 58.279 M y 43.760 M), en parte compensada por la venta de otros edificios en 2022 (60.028 M) [2]. Sin esos edificios el capex recurrente es pequeño: 6.113 M en 2023, 10.784 M en 2024 y 19.343 M en 2025 (5,7 % de las ventas, con 6.385 M de intangibles: desarrollo y ensayos clínicos) [1]. Estimación propia: capex de mantenimiento del 2-3 % de las ventas, el resto ampliación de fábrica y aprobaciones. Usos de la caja en 2025: dividendos 16.834 M, recompras 18.142 M (después amortizadas por 17.100 M el 19-feb-2026) y anticipo de la compra de Brasil 8.500 M [1]. Los flujos trimestrales no se publican en las hojas de datos.',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'Nexia Samduk (designado por el regulador desde 2022; el de 2023-2025 no se ha podido confirmar en DART)',
    anios_auditor: null,
    opinion: 'Favorable (2022)',
    comentario: 'El auditor de 2022 fue Nexia Samduk, nombrado por designación periódica del regulador coreano tras Dasan Accounting; la opinión fue favorable y la cuestión clave de auditoría, el inmovilizado y las inversiones inmobiliarias [4, 11]. No hemos podido leer los informes de auditoría de 2023-2025 porque DART no responde desde este entorno. Criterios a vigilar: (1) se capitalizan desarrollos y ensayos clínicos (intangibles en desarrollo de 14.805 M a junio de 2026, frente a 6.671 M a cierre de 2024) [5]; (2) la fusión con Iruda creó 135.000 M de intangibles que se amortizan (7.985 M en 2025) [1]; (3) los pagos en acciones son pequeños (1.225 M en 2025, un 0,9 % del beneficio) [1]; (4) lo más importante: la calidad de los cobros. La provisión de clientes pasó de 1.739 M a 62.314 M en seis meses y la cartera de más de un año de 685 M (2024) a 41.879 M (jun-2026), casi todo de los distribuidores sudamericanos que ahora consolida [5]. Antes de comprarlos, las ventas a MedSystems eran el 19 % de las ventas del grupo y el cobro se alargaba (la empresa redujo envíos a Brasil en 2025 para controlar la antigüedad de la cartera) [12]. Parte de las ventas de 2024-2025 a Brasil pudo ser llenado de canal: es la señal contable más relevante. Los indicadores del motor (Altman, Piotroski, Beneish) se leen con el salto de perímetro de 2024.',
    senales: [
      { senal: 'Cartera de clientes vencida y provisión disparada tras consolidar Sudamérica', nivel: 'Alta', comentario: 'Provisión de 62.314 M sobre 109.668 M brutos a jun-2026; 41.879 M con más de 12 meses [5].' },
      { senal: 'Ventas a un distribuidor que después se compra (MedSystems, 19 % de las ventas)', nivel: 'Media', comentario: 'El cobro a ese cliente se alargó en 2025; tras la compra, las ventas a Brasil ya no se reconocen hasta que se venden al cliente final [12, 6].' },
      { senal: 'Capitalización de desarrollo y ensayos clínicos en aumento', nivel: 'Baja', comentario: 'Intangibles en desarrollo de 6.671 M (2024) a 14.805 M (jun-2026) [5].' },
      { senal: 'Informes de auditoría de 2023-2025 no revisados', nivel: 'Media', comentario: 'DART no accesible; auditor y opinión de los últimos tres años sin confirmar.' },
    ],
    confianza: 'Media',
  },
  capital: {
    politica: 'La empresa paga dividendo una vez al año y lo ha subido cada año: 66 KRW por acción en 2021, 116 en 2022, 200 en 2023, 257 en 2024 y 1.000 en 2025 (65.153 M, un 49,4 % del beneficio) [11, 1]. Recompras: 20.000 M en 2022-2023 (777.183 acciones, amortizadas en marzo de 2024) y 18.300 M en 2025, amortizadas por 17.100 M el 19-feb-2026 [1]. Prioridades declaradas: crecer con productos y mercados nuevos (China, EE. UU., Sudamérica directa) y «remuneración al accionista sostenible» [1]. No hay una política de reparto con porcentaje fijo publicada.',
    adquisiciones: [
      { anio: '2024', objetivo: 'Iruda (fusión por absorción; microagujas con radiofrecuencia, láser y Secret RF), vendedora una sociedad de Bain Capital', importe: 30853, ev_ebitda: null, financiacion: 'Compra previa de acciones en efectivo (30.853 M) y fusión con acciones nuevas (capital de 6.478 a 6.628 M)', resultado: 'Aporta Quadessy y Secret; 135.000 M de intangibles; pérdida de 11.689 M al dar de baja la participación previa [1].' },
      { anio: '2026', objetivo: 'JL Health (77,5 %; MedSystems, primer distribuidor de estética de Brasil) y 100 % de MedSystems Colombia y Argentina', importe: 18270, ev_ebitda: null, financiacion: 'Caja y deuda; BRL 69 M (18.270 M KRW) ajustables, más opción de venta del 22,5 % restante y pago condicionado', resultado: 'Cerrada el 4-mar-2026. Aportó 15.100 M de ventas en el 2T26 pero rebaja el margen; la dirección prioriza «recuperar ventas» en Sudamérica [12, 6].' },
    ],
    comentario: 'Hasta 2025 la asignación de capital fue buena: crecimiento con poco capital (capex recurrente del 2-6 % de las ventas), dividendos crecientes y recompras amortizadas. Dos decisiones recientes están por demostrar y benefician también al accionista de control: la fusión con Iruda, comprada a otra sociedad del propio Bain, que trajo 135.000 M de intangibles; y la compra de su distribuidor brasileño, al que había vendido a plazo y que llega con una cartera de cobro deteriorada [1, 5, 12]. El dividendo de 1.000 KRW (65.153 M) se pagó con deuda en parte: la caja neta pasó de 121.046 M a −10.559 M en seis meses [5].',
    confianza: 'Media',
  },
  negocio: {
    segmentos: [
      { nombre: 'Equipos', descripcion: 'Plataformas de HIFU (Ultraformer III/Shurink, Ultraformer MPT/Shurink Universe), radiofrecuencia monopolar (Volnewmer/Everesse), microagujas con RF (Quadessy, Secret), láser (Reepot, Fortra) y otras', tipo_resultado: null, historico: [
        { periodo: '2021', ingresos: 54100, resultado: null }, { periodo: '2022', ingresos: 82000, resultado: null }, { periodo: '2023', ingresos: 95100, resultado: null }, { periodo: '2024', ingresos: 124300, resultado: null }, { periodo: '2025', ingresos: 174000, resultado: null } ] },
      { nombre: 'Consumibles', descripcion: 'Cartuchos de HIFU y puntas de radiofrecuencia que se usan en cada sesión', tipo_resultado: null, historico: [
        { periodo: '2021', ingresos: 45300, resultado: null }, { periodo: '2022', ingresos: 55600, resultado: null }, { periodo: '2023', ingresos: 81000, resultado: null }, { periodo: '2024', ingresos: 112900, resultado: null }, { periodo: '2025', ingresos: 154600, resultado: null } ] },
      { nombre: 'Cuidado en casa', descripcion: 'Aparatos domésticos (Shurink Home Lift2Glow, Skederm)', tipo_resultado: null, historico: [
        { periodo: '2021', ingresos: 1100, resultado: null }, { periodo: '2022', ingresos: 2000, resultado: null }, { periodo: '2023', ingresos: 2400, resultado: null }, { periodo: '2024', ingresos: 4700, resultado: null }, { periodo: '2025', ingresos: 7300, resultado: null } ] },
      { nombre: 'Alquileres y otros', descripcion: 'Alquiler de locales de la sede y otros ingresos', tipo_resultado: null, historico: [
        { periodo: '2021', ingresos: 97, resultado: null }, { periodo: '2022', ingresos: 2203, resultado: null }, { periodo: '2023', ingresos: 1623, resultado: null }, { periodo: '2024', ingresos: 1039, resultado: null }, { periodo: '2025', ingresos: 920, resultado: null } ] },
    ],
    geografias: [
      { nombre: 'Corea', peso_pct: 31.2 },
      { nombre: 'Europa', peso_pct: 10.7 },
      { nombre: 'Brasil', peso_pct: 8.6 },
      { nombre: 'Tailandia', peso_pct: 8.6 },
      { nombre: 'Japón', peso_pct: 5.9 },
      { nombre: 'Norteamérica', peso_pct: 5.3 },
      { nombre: 'Otros (resto de Asia-Pacífico, CEI, Taiwán, Australia, Oriente Medio, Turquía y resto de Latinoamérica)', peso_pct: 29.7 },
    ],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Base instalada acumulada (unidades)', valor_anterior: '45.000 (2025)', valor_actual: '48.000 (jun-2026)', variacion: '+3.000 en seis meses', comentario: 'HIFU unas 800 y MRF 350 en el 2T26 [6].' },
      { kpi: 'Ventas de consumibles (millones de KRW)', valor_anterior: '112.900 (2024)', valor_actual: '154.600 (2025)', variacion: '+36,9 %', comentario: 'El 46 % de las ventas; en el 1S26 +5,3 % (fuera de Corea +13,7 %, Corea −7,6 %) [5, 6].' },
      { kpi: 'Ventas en Corea (millones de KRW)', valor_anterior: '54.500 (1S25)', valor_actual: '45.800 (1S26)', variacion: '−15,8 %', comentario: 'Equipos −34,8 % y consumibles −7,6 % en el semestre [6].' },
      { kpi: 'Ventas fuera de Corea, negocio previo (millones de KRW)', valor_anterior: '105.900 (1S25)', valor_actual: '130.000 (1S26)', variacion: '+22,7 %', comentario: 'Europa, Norteamérica y Tailandia; sin Sudamérica consolidada [6].' },
      { kpi: 'Margen operativo de la matriz', valor_anterior: '51,6 % (2T25, consolidado)', valor_actual: '50,8 % (2T26, matriz) / 41,6 % consolidado', variacion: '−10,0 puntos consolidado', comentario: 'La diferencia es Sudamérica, Japón y la eliminación de beneficios no realizados [6].' },
      { kpi: 'Plantilla', valor_anterior: '528 (dic-2025)', valor_actual: '537 matriz + 256 Sudamérica (jun-2026)', variacion: '+265', comentario: '[6]' },
    ],
  },
  fuentes: fA,
  huecos: [
    { seccion: 'trimestres', campo: 'Consenso previo de 3T24-4T25', tipo: 'Complemento', intentos: '1) FnGuide/WiseReport (solo da el consenso vigente y el histórico anual); 2) prensa coreana de cada publicación (solo 1T26 y 2T26 encontrados); 3) informes de analistas de Samsung Securities (solo el 1T26 previo)', decision: 'Omitido' },
    { seccion: 'flujos', campo: 'FCF de los últimos doce meses', tipo: 'Complemento', intentos: '1) Hojas de datos 2Q26 (no traen flujos); 2) informe trimestral coreano en DART (no accesible); 3) IR Book 2Q26 (solo saldos de caja)', decision: 'Omitido' },
    { seccion: 'calidad', campo: 'Auditor y opinión de 2023-2025', tipo: 'Complemento', intentos: '1) DART (sin respuesta desde este entorno); 2) informes anuales en inglés 2023-2025 (no incluyen el informe del auditor); 3) búsqueda en prensa coreana (sin resultado)', decision: 'Omitido' },
  ],
};
guarda('A', A);

// ================================================================ B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Annual Report 2025: perspectivas del mercado de equipos de estética (Bain & Company para la empresa), ventas por región y país, cartera de productos e hitos', editor: 'CLASSYS Inc.', tipo: 'Primaria', fecha: '2026-04-22', url: `${W}/2026/04/CLASSYS_AR-2025_eng_v2-1_0422-1.pdf` },
  { id: 2, titulo: 'Presentación de la compra de MedSystems: mercado brasileño de equipos de estética (The Insight Partners, Bain & Co.)', editor: 'CLASSYS Inc.', tipo: 'Primaria', fecha: '2025-10-24', url: `${W}/2025/10/Classys-IR-BOOK_Brazil_vF_251024_Eng.pdf` },
  { id: 3, titulo: 'Energy-Based Aesthetic Devices Market (6.955 M USD en 2024; +13 % anual 2025-2030)', editor: 'P&S Intelligence', tipo: 'Sectorial', fecha: '2025', url: 'https://psmarketresearch.com/market-analysis/energy-based-aesthetic-devices-market' },
  { id: 4, titulo: 'Energy-Based Aesthetic Devices Market Size (5.000 M USD en 2024; +17,9 % anual hasta 2034)', editor: 'Global Market Insights', tipo: 'Sectorial', fecha: '2025', url: 'https://www.gminsights.com/industry-analysis/energy-based-aesthetic-devices-market' },
  { id: 5, titulo: 'Fichas de InMode, Sisram, Imeik, Hugel, PharmaResearch, Wontech, Hironic y Medytox (ventas y márgenes de los últimos doce meses)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/INMD' },
  { id: 6, titulo: 'IR Book (Finance) 2Q26: ventas por línea y región, base instalada por región e iniciativas', editor: 'CLASSYS Inc.', tipo: 'Primaria', fecha: '2026-08-12', url: `${W}/2026/08/Classys-IR-Book_2Q26_Eng_vF_260812-2.pdf` },
  { id: 7, titulo: 'Edaily: guía rebajada; competencia de Ulthera Prime en Corea y menos aperturas de clínicas tras la huelga médica', editor: 'Edaily', tipo: 'Prensa', fecha: '2026-08-14', url: 'https://www.edaily.co.kr/News/Read?newsId=03952406645547320&mediaCodeNo=257' },
  { id: 8, titulo: 'IR Book (Finance) 4Q25: base instalada en Corea y fuera, guía y estrategia 2026', editor: 'CLASSYS Inc.', tipo: 'Primaria', fecha: '2026-02-13', url: `${W}/2026/02/Classys-IR-Book_4Q25_Eng_vF_260213.pdf` },
  { id: 9, titulo: 'Annual Report 2023: estrategia, Volnewmer, procedimientos de Shurink en Corea', editor: 'CLASSYS Inc.', tipo: 'Primaria', fecha: '2024-04-24', url: `${W}/2024/04/2023-Annual-Report_Eng_vF_240424-2.pdf` },
  { id: 10, titulo: 'Newspim: «클래시스, 4분기 신제품 출시로 실적 반등 기대» (Daol, 3T26 previsto, competencia de Solta en Corea)', editor: 'Newspim', tipo: 'Prensa', fecha: '2026-10-15', url: 'https://www.newspim.com/news/view/20261015000090' },
];
const B = {
  _estado: 'completa',
  historia: {
    resumen: 'CLASSYS nació en enero de 2007 en Seúl, fundada por Jung Sung-jae, para fabricar equipos de estética médica. Su producto clave, el HIFU (ultrasonidos focalizados de alta intensidad) Ultraformer, fue aprobado en Corea en 2012 y lanzado allí como Shurink en 2014; obtuvo el marcado CE en 2015 [1]. Salió a bolsa en el KOSDAQ en diciembre de 2017 por fusión con una SPAC [1]. En marzo de 2022 Bain Capital compró el 60,84 % al fundador y su entorno por unos 670.000 M KRW y puso gestores profesionales [1]. Desde entonces lanzó la radiofrecuencia monopolar Volnewmer (Corea 2022, FDA de EE. UU. en 2024 como Everesse, CE en 2025), absorbió en 2024 a Iruda, otra empresa de Bain (microagujas con radiofrecuencia y láser), y en 2025-2026 compró a su distribuidor en Brasil y los de Colombia y Argentina para vender directamente [1, 2]. Bain intenta vender su participación desde 2024 y ha colocado bloques en mayo de 2025 y febrero de 2026.',
    hitos: [
      { anio: '2007', hito: 'Fundación por Jung Sung-jae en Seúl [1].' },
      { anio: '2012', hito: 'Aprobación del HIFU Ultraformer en Corea [1].' },
      { anio: '2014', hito: 'Lanzamiento de Shurink (Ultraformer III) en Corea; se convierte en el HIFU más usado del país [1].' },
      { anio: '2017', hito: 'Salida a bolsa en el KOSDAQ (diciembre) [1].' },
      { anio: '2021', hito: 'Aprobación de Shurink Universe (Ultraformer MPT), la plataforma de segunda generación [1].' },
      { anio: '2022', hito: 'Bain Capital (BCPE Centur) pasa a ser el accionista de control; aprobación de Volnewmer en Corea [1].' },
      { anio: '2024', hito: 'FDA aprueba Everesse (Volnewmer); filial en Japón; fusión con Iruda (1-oct) [1].' },
      { anio: '2025', hito: 'CE-MDR de Volnewmer y Ultraformer MPT; lanzamiento de Quadessy; filial en Brasil y acuerdo para comprar MedSystems [1].' },
      { anio: '2026', hito: 'Cierre de la compra de JL Health/MedSystems (4-mar); dos cambios de primer ejecutivo (dic-2025 y jul-2026); guía rebajada en agosto [1, 7].' },
    ],
    confianza: 'Alta',
  },
  negocio: {
    descripcion: 'CLASSYS diseña y fabrica en Corea equipos de estética basados en energía para clínicas de dermatología y estética: HIFU para tensar y reafirmar la piel sin cirugía (Ultraformer III y MPT, vendidos en Corea como Shurink y Shurink Universe), radiofrecuencia monopolar (Volnewmer, Everesse en EE. UU.), microagujas con radiofrecuencia (Quadessy, Secret), láseres (Reepot, Fortra) y otros [1]. Vende los equipos y, sobre todo, los consumibles que cada sesión necesita (cartuchos y puntas), y una pequeña línea de aparatos para casa [1]. En 2025 el 52 % de las ventas fueron plataformas, el 46 % consumibles y el 2 % hogar [1]. Llega a más de 80 países, con distribuidores en la mayoría y venta directa en Corea, Japón y, desde 2026, Brasil, Colombia y Argentina [1, 6]. En 2025 Corea fue el 31 % de las ventas; el resto, Europa, Brasil, Tailandia, Japón, Norteamérica y otros mercados de Asia, Oriente Medio y la CEI [1].',
    como_gana_dinero: 'Es un modelo de «cuchilla y maquinilla»: el equipo (decenas de millones de KRW) se vende con margen alto y fija una base instalada que compra consumibles de forma recurrente; cada cartucho de HIFU da un número limitado de disparos [1, 8]. Los consumibles son el 46 % de las ventas y crecen con la base instalada (más de 45.000 equipos acumulados) y con el número de sesiones por equipo [1, 6]. El margen bruto es del 76-78 % y el operativo de la matriz supera el 50 % porque fabrica en Corea con poco capital y vende a distribuidores que asumen el coste comercial [6]. La venta directa en Sudamérica sube los ingresos (se factura al precio final) pero baja el margen consolidado [6]. Los equipos son más cíclicos que los consumibles: dependen de que abran clínicas y de su financiación. Estacionalidad: el tercer trimestre es el más flojo (verano en Corea) y el cuarto el más fuerte [10].',
    clientes: 'Clientes finales: clínicas de dermatología, cirugía estética y, en algunos países, centros de belleza; en Corea más de 17.000 clínicas tienen algún equipo HIFU y más de 5.500 usan Shurink [8]. En el extranjero vende a través de distribuidores exclusivos; el mayor era MedSystems (Brasil), el 19 % de las ventas del grupo, que ahora es filial [2]. No publica la concentración de los diez primeros clientes. Poder de precios: los consumibles mantienen un margen bruto estable del 76-78 % durante cinco años de inflación de costes [1]; en Corea el precio de la sesión de Shurink es bajo y compite con copias locales y con Ulthera (Merz), por lo que la empresa vende en paquetes de tratamientos combinados (Volnewmer + Shurink Universe + Fortra) [8, 7]. Las bajas no se publican; la caída del 15 % de los consumibles en Corea en el 2T26 indica menos sesiones por equipo o pérdida de cuota frente a Ulthera Prime [6, 7].',
    confianza: 'Media',
  },
  sector: {
    definicion: 'El mercado relevante es el de equipos de estética basados en energía para tratamientos no invasivos de la piel (HIFU, radiofrecuencia monopolar y microagujas con radiofrecuencia), incluidos sus consumibles, en todo el mundo. La empresa, con datos de Bain & Company, lo cifra en 3.300 M USD en 2024 y 9.700 M en 2030 (+20 % anual) [1]. Los estudios independientes miden un perímetro más amplio, que incluye láser, depilación, criolipólisis y contorno corporal: P&S Intelligence 6.955 M USD en 2024 con un +13 % anual hasta 2030 [3]; Global Market Insights 5.000 M USD en 2024 y +17,9 % anual hasta 2034 [4]. Usamos la cifra de la empresa, que es la de su perímetro, pero tomamos el crecimiento de los independientes (13-18 %) como más prudente que el 20 % de Bain, que es además el accionista de control.',
    tamano: '≈ 3.300 M USD en 2024 (HIFU, MRF y MNRF; Bain & Company para la empresa) [1]; 5.000-6.955 M USD el perímetro amplio [3, 4]',
    unidad_serie: 'millones de USD',
    serie: [
      { anio: '2024', tamano: 3300 }, { anio: '2025e', tamano: 3960 }, { anio: '2026e', tamano: 4750 }, { anio: '2027e', tamano: 5700 }, { anio: '2028e', tamano: 6840 }, { anio: '2029e', tamano: 8080 }, { anio: '2030e', tamano: 9700 },
    ],
    tcac_historico_pct: null,
    tcac_previsto_pct: 15.0,
    cr5_pct: null,
    estructura: 'Moderadamente concentrada',
    drivers: [
      { driver: 'Tratamientos no invasivos frente a cirugía y rellenos', efecto: '+', horizonte: 'Estructural', evidencia: 'Mercado de HIFU, MRF y MNRF de 3.300 a 9.700 M USD en 2024-2030 según la empresa [1]; +13-18 % anual según independientes [3, 4].' },
      { driver: 'Base instalada que consume cartuchos', efecto: '+', horizonte: 'Estructural', evidencia: 'Consumibles del 46 % de las ventas; fuera de Corea +31,3 % en el 2T26 [1, 6].' },
      { driver: 'Saturación y competencia en Corea', efecto: '−', horizonte: 'Cíclico', evidencia: 'Ventas en Corea −25,3 % en el 2T26; Ulthera Prime y menos aperturas de clínicas tras la huelga médica [6, 7].' },
      { driver: 'Aprobaciones en mercados grandes (EE. UU., China)', efecto: '+', horizonte: 'Estructural', evidencia: 'Everesse aprobado por la FDA en 2024; Ultraformer en EE. UU. esperado en 2027; Volnewmer pendiente en China [1, 8].' },
      { driver: 'Gasto discrecional y financiación de clínicas', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Las ventas cayeron un 5,6 % en 2020 (COVID) y crecieron un 31 % en 2021 [10 del anexo A: Fact Sheet 4Q23 en la nota A].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 4, justificacion: 'Muchos fabricantes coreanos (Jeisys, Wontech, Hironic) y occidentales (Merz/Ulthera, Solta/Thermage, InMode, Candela, Lutronic-Cynosure); en Corea las copias de HIFU presionan el precio [7, 10].' },
      { fuerza: 'Poder de los clientes', intensidad: 2, justificacion: 'Clínicas fragmentadas; los distribuidores grandes tenían poder (MedSystems, 19 % de las ventas) hasta su compra [2].' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Componentes electrónicos y transductores estándar; margen bruto estable del 76-78 % [1].' },
      { fuerza: 'Amenaza de entrada', intensidad: 3, justificacion: 'Las aprobaciones (FDA, CE-MDR, NMPA) y la red de médicos de referencia son la barrera; en Corea la barrera es menor [1].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'Toxina, rellenos y bioestimuladores (Hugel, PharmaResearch) compiten por el mismo gasto, aunque se combinan [5].' },
    ],
    ciclo: { posicion: 'Madurez del ciclo', comentario: 'Corea, el mercado más penetrado, está en contracción (ventas −15,8 % en el 1S26, equipos −34,8 %) mientras fuera sigue la expansión (+22,7 %) [6]. En 2020 las ventas de la empresa bajaron un 5,6 % y el beneficio operativo un 2,6 %, con recuperación de +31 % en 2021 (Fact Sheet 4Q23, nota A); en 2022 las ventas subieron un 41 % pese a la caída de las bolsas. No hay datos de 2008-09 (la empresa era muy pequeña). Los indicadores: aperturas de clínicas en Corea, ventas de equipos frente a consumibles y el KOSDAQ de cuidado de la salud, que lleva −26,3 % en el año.' },
    regulacion: 'Son productos sanitarios: necesitan aprobación por país. En Corea, MFDS; en EE. UU., FDA (Everesse aprobado en abril de 2024; Ultraformer en trámite, esperado en 2027); en la UE, el nuevo reglamento CE-MDR (Volnewmer en mayo de 2025, Ultraformer MPT en agosto de 2025); en China, NMPA (Volnewmer pendiente; la empresa preveía la aprobación en septiembre de 2026 y el primer envío a final de año) [1, 8]. En Brasil, ANVISA. Un retraso de una aprobación desplaza ventas, como se ve en China [6].',
    tendencias: 'Tres tendencias. (1) Tratamientos combinados: las clínicas usan varias energías en la misma sesión; la empresa tiene la cartera más completa del sector coreano (HIFU, MRF, MNRF y láser) y gana con ello [1, 8]. (2) Venta directa y servicios: los fabricantes compran distribuidores para capturar margen y datos, como hizo con Brasil; sube ventas y baja márgenes [6]. (3) Aparatos para casa y marketing a consumidor (B2C), con poco peso todavía (2 % de las ventas) [1]. La inteligencia artificial entra en marketing, diagnóstico de la piel y gestión de clínicas, no en el equipo en sí. Pierde con la competencia de bajo precio en Corea y gana con la entrada en EE. UU. y China.',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 6.0,
    posicion: 'Primer fabricante de HIFU estético del mundo por unidades (más de 3.000 Ultraformer al año) y líder en Corea, donde más de 5.500 clínicas usan Shurink; cuota estimada del 6 % del mercado mundial de HIFU, MRF y MNRF (ventas de 2025 de 336.820 M KRW, ≈ 237 M USD, frente a un mercado de ≈ 3.960 M USD); en Brasil, primera en HIFU con más de 3.700 equipos [1, 2, 8].',
    competidores: [
      { nombre: 'InMode', pais: 'Israel', ticker: 'INMD', ingresos: 498200, cuota_pct: null, margen_ebit_pct: 12.8, comentario: 'Radiofrecuencia y microagujas; ventas planas y margen hundido desde el 40 % de 2022 [5].' },
      { nombre: 'Sisram Medical (Alma Lasers)', pais: 'Israel / China', ticker: '1696.HK', ingresos: 493800, cuota_pct: null, margen_ebit_pct: 1.4, comentario: 'Láser y RF; margen operativo del 1,4 % [5].' },
      { nombre: 'Imeik Technology', pais: 'China', ticker: '300896.SZ', ingresos: 471600, cuota_pct: null, margen_ebit_pct: 49.3, comentario: 'Inyectables y equipos en China; ventas −8,5 % [5].' },
      { nombre: 'Wontech', pais: 'Corea', ticker: '336570.KQ', ingresos: 167400, cuota_pct: null, margen_ebit_pct: 23.3, comentario: 'Radiofrecuencia Oligio y láseres; competidor directo en Corea [5].' },
      { nombre: 'Hironic', pais: 'Corea', ticker: '149980.KQ', ingresos: 37100, cuota_pct: null, margen_ebit_pct: 10.2, comentario: 'HIFU Doublo; competidor directo pequeño [5].' },
      { nombre: 'Merz Aesthetics (Ultherapy, Ulthera Prime)', pais: 'Alemania', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'El HIFU de referencia en EE. UU.; Ulthera Prime le quita cuota en Corea en 2026 [7].' },
      { nombre: 'Jeisys Medical', pais: 'Corea', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Microagujas (Potenza) y RF (Density); excluida de bolsa por Archimed en 2024.' },
      { nombre: 'Solta Medical (Thermage)', pais: 'EE. UU.', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Radiofrecuencia monopolar de referencia; filial de Bausch Health [10].' },
    ],
    foso: {
      veredicto: 'Estrecho',
      tendencia: 'Se estrecha',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 2, evidencia: 'Red de médicos de referencia y formación (MedSystems Academy, más de 60 eventos al año en Brasil); la marca Shurink conocida por el consumidor coreano [2, 9].' },
        { fuente: 'Costes de cambio', puntuacion: 3, evidencia: 'Los consumibles solo sirven en su equipo: el 46 % de las ventas es recurrente sobre una base de 48.000 equipos [1, 6].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'Aprobaciones FDA (Everesse), CE-MDR y en más de 80 países; marca Shurink. Las copias en Corea muestran que la patente no impide competir [1].' },
        { fuente: 'Ventaja en costes', puntuacion: 4, evidencia: 'Margen operativo del 50 % frente al 13 % de InMode, el 23 % de Wontech y el 1 % de Sisram [5].' },
        { fuente: 'Escala eficiente', puntuacion: 2, evidencia: 'Mayor fabricante de HIFU por unidades, pero el mercado es suficiente para varios competidores.' },
      ],
    },
    amenazas: 'Lo más probable es la erosión en Corea, que ya ocurre: la competencia de Ulthera Prime, las copias locales de HIFU y menos aperturas de clínicas bajaron las ventas coreanas un 25 % en el 2T26 [6, 7]; probabilidad alta de que el margen de Corea no vuelva al de 2025. Segunda: que los distribuidores sustituyan a CLASSYS por fabricantes chinos baratos en Asia y Latinoamérica (media). Tercera: que la venta directa en Sudamérica destruya margen y cobros (media-alta, por la cartera vencida). La entrada en EE. UU. con Ultraformer depende de la FDA (2027) y allí Merz domina el HIFU.',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [
      { agencia: 'MSCI', calificacion: 'BBB', fecha: '2023' },
      { agencia: 'KCGS (Korea Institute of Corporate Governance and Sustainability)', calificacion: 'B+', fecha: '2023' },
      { agencia: 'Sustinvest', calificacion: 'AA', fecha: '2023' },
    ],
    materialidad: 'Los asuntos ESG que tocan las cifras son tres. (1) Seguridad de los pacientes y calidad: un efecto adverso grave en un tratamiento HIFU (quemaduras, daños nerviosos) sería un problema de marca y de aprobaciones; la empresa publica ensayos clínicos y tiene 2.839 M de provisión de garantías [9; nota A]. (2) Gobierno: accionista de control de capital privado con intención de vender, dos primeros ejecutivos en siete meses y operaciones con partes vinculadas a Bain (Iruda) [1]. (3) Publicidad y ética comercial en la venta directa a clínicas y consumidores. El impacto ambiental es pequeño: fabricación de electrónica ligera en Corea.',
    controversias: 'No hemos encontrado sanciones, retiradas de producto ni litigios relevantes en los últimos tres años en la prensa ni en la web de la empresa. En el foro de Naver se menciona una posible designación como «empresa de divulgación desleal» en agosto de 2026, que no hemos podido confirmar en KIND ni en DART (no accesibles) ni en la prensa: no se cita como hecho.',
    confianza: 'Baja',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'sector', campo: 'TCAC histórico del mercado y CR5', tipo: 'Complemento', intentos: '1) Annual Report 2025 (solo 2024 y 2030F); 2) P&S Intelligence y GMI (solo resumen público, sin serie histórica ni cuotas); 3) presentación de Brasil (solo mercado brasileño)', decision: 'Omitido' },
    { seccion: 'competencia', campo: 'Ventas y margen de Merz, Jeisys y Solta', tipo: 'Complemento', intentos: '1) No cotizan (Jeisys excluida en 2024, Merz privada, Solta dentro de Bausch Health); 2) DART para Jeisys (no accesible); 3) prensa (sin cifras de 2025)', decision: 'Omitido' },
  ],
};
guarda('B', B);

// ================================================================ C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Annual Report 2025: equipo directivo y estructura accionarial a 31-mar-2026 (BCPE 46,1 %, fundador 10,5 %)', editor: 'CLASSYS Inc.', tipo: 'Primaria', fecha: '2026-04-22', url: `${W}/2026/04/CLASSYS_AR-2025_eng_v2-1_0422-1.pdf` },
  { id: 2, titulo: 'Annual Business Report FY2022: consejo de administración, comisiones, auditor y nombramientos de 2020-2022', editor: 'CLASSYS Inc.', tipo: 'Primaria', fecha: '2023-03-21', url: `${W}/2024/02/CLASSYS-Annual-Business-Report-FY2022_vF.pdf` },
  { id: 3, titulo: '"7개월만 수장 교체"…\'K-뷰티\' 클래시스에 무슨일? (Yoon Jun-oh sustituye a Choi Yoon-seok)', editor: 'Newsis', tipo: 'Prensa', fecha: '2026-07-15', url: 'https://www.newsis.com/view/NISX20260715_0003710804' },
  { id: 4, titulo: 'Nombramiento de Bae Jung-hee (ex socia de Bain & Company) como CCO; CEO Yoon Jun-oh y CTO Kim Taek-su', editor: 'Asia Economy', tipo: 'Prensa', fecha: '2026-10-12', url: 'https://core.asiae.co.kr/article/2026101208323125370' },
  { id: 5, titulo: '클래시스, 최대주주 베인캐피탈 지분 6% 매각 확인..전액 주담보 상환 (bloque de mayo de 2025 y préstamo con prenda de acciones)', editor: 'SmartToday', tipo: 'Prensa', fecha: '2025-05-16', url: 'https://www.smarttoday.co.kr/ko-kr/articles/81005' },
  { id: 6, titulo: '‘6만 클래시스’ 무너뜨린 베인캐피털의 블록딜 (venta del 8,25 % a 60.000 KRW)', editor: 'Seoul Economic Daily', tipo: 'Prensa', fecha: '2026-02-25', url: 'https://www.sedaily.com/article/20012543' },
  { id: 7, titulo: 'WiseReport/FnGuide: accionistas principales a 16-oct-2026 (BCPE Centur 49,08 %, Jung Sung-jae 9,86 %, Capital Research 5,10 %, autocartera 0,13 %)', editor: 'FnGuide (Naver WiseReport)', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://navercomp.wisereport.co.kr/v2/company/c1010001.aspx?cmp_cd=214150' },
  { id: 8, titulo: '클래시스, 성장 가속…기업가치 제고 발목잡는 베인캐피털 이슈 (Bain en el 54 % tras mayo de 2025)', editor: 'Hansbiz', tipo: 'Prensa', fecha: '2025-07-14', url: 'http://www.hansbiz.co.kr/news/articleView.html?idxno=760955' },
  { id: 9, titulo: 'IR Book 4Q25 (guía de 2026) y Annual Report 2023-2024 (cumplimiento de guías anteriores)', editor: 'CLASSYS Inc.', tipo: 'Primaria', fecha: '2026-02-13', url: `${W}/2026/02/Classys-IR-Book_4Q25_Eng_vF_260213.pdf` },
  { id: 10, titulo: 'Edaily: guía de 2026 rebajada de 490.000 a 445.000 M (12-ago-2026)', editor: 'Edaily', tipo: 'Prensa', fecha: '2026-08-14', url: 'https://www.edaily.co.kr/News/Read?newsId=03952406645547320&mediaCodeNo=257' },
  { id: 11, titulo: 'Annual Report 2023 (mensaje del primer ejecutivo: guía superada dos años; objetivo 2024 de más del 25 %) y Annual Report 2024 (objetivos superados)', editor: 'CLASSYS Inc.', tipo: 'Primaria', fecha: '2024-04-24', url: `${W}/2024/04/2023-Annual-Report_Eng_vF_240424-2.pdf` },
];
const C = {
  _estado: 'completa',
  directivos: {
    equipo: [
      { nombre: 'Yoon Jun-oh', cargo: 'Primer ejecutivo (representative executive officer)', desde: '2026', participacion_pct: 0.0, trayectoria: 'Ex vicepresidente de Samsung Electronics, donde llevó fusiones y adquisiciones y la estrategia de cartera (compra de Harman). Nombrado el 15-jul-2026, siete meses después de su antecesor; sin experiencia previa en productos sanitarios [3, 4]. Opciones sobre 200.000 acciones ejercitables desde julio de 2028 según el foro (sin confirmar en registro oficial).' },
      { nombre: 'Choi Yoon-seok', cargo: 'Director financiero (primer ejecutivo dic-2025 a jul-2026)', desde: '2025', participacion_pct: 0.0, trayectoria: 'Ex director financiero de Gong Cha Korea y Ecobit (también participadas de capital privado). Fue primer ejecutivo siete meses; sigue como director financiero [1, 3].' },
      { nombre: 'Bae Jung-hee', cargo: 'Directora comercial (CCO, vicepresidenta)', desde: '2026', participacion_pct: 0.0, trayectoria: 'Ex socia de Bain & Company (estrategia digital y de IA); dirige el centro de ventas y marketing creado en julio de 2026 [4].' },
      { nombre: 'Kim Taek-su', cargo: 'Director de tecnología (CTO)', desde: null, participacion_pct: 0.0, trayectoria: 'Doctor por el Samsung Advanced Institute of Technology y Stanford [4].' },
      { nombre: 'Soo-man Park', cargo: 'Director de I+D', desde: null, participacion_pct: 0.0, trayectoria: 'Ex director de tecnología de ultrasonidos en Siemens Healthineers y Samsung GE [1].' },
      { nombre: 'Jung Sung-jae', cargo: 'Fundador (fuera de la gestión desde 2022)', desde: '2007', participacion_pct: 9.86, trayectoria: 'Fundó la empresa y la dirigió hasta la venta a Bain en 2022; conserva el 9,86 % (10,5 % con su entorno) [1, 7].' },
    ],
    historial_guidance: [
      { anio: '2022', guia: 'Objetivos de ventas anuales (no publicados en cifra en inglés)', real: 'Ventas +41,0 % (141.803 M)', cumplida: 'Sí' },
      { anio: '2023', guia: 'Objetivos de ventas anuales («superada la guía dos años seguidos»)', real: 'Ventas +27,0 % (180.123 M)', cumplida: 'Sí' },
      { anio: '2024', guia: 'Crecimiento de ventas de más del 25 %', real: '+34,9 % (242.939 M), con un trimestre de Iruda', cumplida: 'Sí' },
      { anio: '2026', guia: 'Ventas de 490.000 M (banda 470.000-510.000 M, +45 %), febrero de 2026', real: 'Rebajada a 445.000 M el 12-ago-2026; 1S26 192.700 M', cumplida: 'No' },
    ],
    comentario: 'La credibilidad de la dirección se ha deteriorado en 2026. Hasta 2024 la empresa superaba sus objetivos [11]. En 2026 dio una guía de 490.000 M en febrero, la mantuvo en mayo con un primer trimestre ya por debajo y la recortó un 9 % en agosto [9, 10]. La estabilidad es mala: tres primeros ejecutivos en cuatro años (Baek Seung-han de 2022 a 2025, Choi Yoon-seok de diciembre de 2025 a julio de 2026 y Yoon Jun-oh desde julio) [3]. El nuevo equipo viene de fusiones y adquisiciones (Samsung) y de consultoría (Bain & Company), un perfil que encaja con preparar la venta de la empresa, no con el oficio del sector. Los directivos de producto (I+D, fábrica, calidad) vienen de Siemens, GE y Samsung y son estables [1]. No hay plan de sucesión publicado.',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Lee Jung-woo', cargo: 'Consejero no ejecutivo (Bain Capital)', tipo: 'Dominical', desde: '2022', comisiones: null },
      { nombre: 'Kim Dong-wook', cargo: 'Consejero no ejecutivo (Bain Capital)', tipo: 'Dominical', desde: '2022', comisiones: null },
      { nombre: 'Kim Hyun-seung', cargo: 'Consejero no ejecutivo (Bain Capital)', tipo: 'Dominical', desde: '2022', comisiones: null },
      { nombre: 'Park Wan-jin', cargo: 'Consejero no ejecutivo (Bain Capital)', tipo: 'Dominical', desde: '2022', comisiones: null },
      { nombre: 'Park Jun-hong', cargo: 'Consejero externo', tipo: 'Independiente', desde: '2022', comisiones: 'Auditoría' },
      { nombre: 'Kim Dong-ju', cargo: 'Consejero externo', tipo: 'Independiente', desde: '2022', comisiones: 'Auditoría' },
      { nombre: 'Kwon Hyuk-jin', cargo: 'Consejero externo', tipo: 'Independiente', desde: '2022', comisiones: 'Auditoría' },
    ],
    presidente_ceo_separados: true,
    presidente_ejecutivo: false,
    consejero_coordinador: false,
    una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: true,
    variable_ligado_rentabilidad: false,
    auditoria_independiente: true,
    insiders_sin_operaciones: false,
    accionista_control: true,
    presidente_vinculado_control: true,
    cambios_cupula_24m: 2,
    voto_remuneracion_pct: null,
    voto_remuneracion_contra_pct: null,
    voto_remuneracion_contra_libre_pct: null,
    voto_cupula_pct: null,
    remuneracion_ceo: null,
    remuneracion: 'No hemos podido leer el informe de negocio de 2025 (DART no accesible), que es donde Corea publica la remuneración de los consejeros que cobran más de 500 M KRW. En Corea la junta vota un límite global de remuneración de los consejeros, no la política individual. El único dato del variable es indirecto: el nuevo primer ejecutivo tendría opciones sobre 200.000 acciones ejercitables desde julio de 2028 (según el foro de Naver, sin confirmar en el registro), un incentivo ligado al precio de la acción a dos años, no al ROIC. Los pagos en acciones de la empresa fueron de 1.225 M en 2025 [1 de la nota A].',
    accionistas: [
      { nombre: 'BCPE Centur Investments, LP (Bain Capital) y una parte vinculada', pct: 46.1, tipo: 'Capital privado; accionista de control', variacion: 'Del 60,84 % (2022) al 54,16 % (mayo de 2025, venta del 6 % a 57.915 KRW) y ≈ 46 % (febrero de 2026, venta del 8,25 % a 60.000 KRW); FnGuide da 49,08 % con una parte vinculada [1, 6, 7, 8]' },
      { nombre: 'Jung Sung-jae (fundador) y entorno', pct: 10.5, tipo: 'Fundador', variacion: '9,86 % a título personal [1, 7]' },
      { nombre: 'Capital Research and Management Company', pct: 5.1, tipo: 'Institucional', variacion: 'Declaración de más del 5 % [7]' },
      { nombre: 'Autocartera', pct: 0.13, tipo: 'Autocartera', variacion: '82.170 acciones tras amortizar 17.100 M el 19-feb-2026 [1, 7]' },
      { nombre: 'Capital flotante (minoristas 21,0 %, extranjeros 17,7 %, instituciones 4,6 %)', pct: 40.3, tipo: 'Flotante', variacion: 'A 31-mar-2026 [1]' },
    ],
    insiders: [
      { fecha: '2025-05-16', persona: 'BCPE Centur Investments (Bain Capital, accionista de control)', operacion: 'Venta', acciones: 3930339, importe: 227627 },
      { fecha: '2026-02-25', persona: 'BCPE Centur Investments (Bain Capital, accionista de control)', operacion: 'Venta', acciones: 5380000, importe: 322800 },
    ],
    control_y_defensas: 'Bain Capital controla la empresa con alrededor del 46 % (49 % con una parte vinculada según FnGuide) y nombra cuatro de los ocho consejeros del último consejo que hemos podido verificar (2022); el primer ejecutivo lo propone el consejo que domina [2, 1, 7]. Bain busca vender: contrató a JP Morgan y Citi en 2024 para vender el control, no encontró comprador al precio pedido (una prima del 25 % sobre la cotización de entonces) y desde entonces vende en bloques con descuento: 6 % en mayo de 2025 y 8,25 % en febrero de 2026 [6, 8]. Sus acciones respaldan un préstamo con prenda de hasta 760.000 M KRW (Hana Bank, Korea Investment y Samsung Securities, abril de 2024) que se refinanció a final de 2024 y se ha ido amortizando con las ventas [5]. Operaciones vinculadas: la fusión con Iruda, comprada a otro fondo de Bain [1 de la nota A]. Una acción, un voto; sin blindajes conocidos. En Corea la ley obliga a una OPA solo en casos limitados: un comprador del control no tendría por qué ofrecer el mismo precio a los minoritarios.',
    alertas: [
      'Dos cambios de primer ejecutivo en siete meses (diciembre de 2025 y julio de 2026) [3].',
      'Accionista de control de capital privado vendiendo en bloques con descuento (mayo de 2025 y febrero de 2026) y con préstamo garantizado con las acciones [5, 6].',
      'Fusión con Iruda, empresa de otro fondo de Bain (operación vinculada) [1].',
      'Guía de 2026 recortada un 9 % en agosto tras mantenerse en mayo [10].',
    ],
    confianza: 'Baja',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'Consejo actual, comisiones y votos de la junta de 2026', tipo: 'Núcleo', intentos: '1) DART: informe de negocio 2025 y convocatoria de la junta de marzo de 2026 (sin respuesta desde este entorno); 2) web de inversores en inglés (no publica el consejo); 3) prensa coreana sobre la junta de 2026 (sin resultados)', decision: 'Omitido; se usa el último consejo verificado (informe de negocio FY2022)' },
    { seccion: 'gobierno', campo: 'Remuneración del primer ejecutivo', tipo: 'Complemento', intentos: '1) DART, informe de negocio 2025 (no accesible); 2) Annual Report 2025 en inglés (no la publica); 3) prensa (sin cifras)', decision: 'Omitido' },
  ],
};
guarda('C', C);

// ================================================================ D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de 214150.KQ, del índice KOSDAQ (^KQ11) y del ETF TIGER Healthcare (143860.KS); cierres de cada ejercicio, betas y volatilidad', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/214150.KQ' },
  { id: 2, titulo: 'Consenso anual 2026e-2028e (media de tres meses de las casas coreanas) e indicadores', editor: 'FnGuide (Naver WiseReport)', tipo: 'Analistas', fecha: '2026-10-16', url: 'https://navercomp.wisereport.co.kr/v2/company/c1050001.aspx?cmp_cd=214150' },
  { id: 3, titulo: 'Informes de analistas de agosto-octubre de 2026 con recomendación y objetivo (Shinhan, Kiwoom, Yuanta, Mirae, Hyundai, Kyobo, DB, Eugene, KIS, NH, Samsung, Daol)', editor: 'FnGuide (Naver WiseReport)', tipo: 'Analistas', fecha: '2026-10-16', url: 'https://navercomp.wisereport.co.kr/v2/company/c1080001.aspx?cmp_cd=214150' },
  { id: 4, titulo: 'Newspim: Daol Investment rebaja el objetivo de 60.000 a 40.000 KRW; 3T26 previsto 97.100 M de ventas y 37.500 M de beneficio operativo', editor: 'Newspim', tipo: 'Analistas', fecha: '2026-10-15', url: 'https://www.newspim.com/news/view/20261015000090' },
  { id: 5, titulo: 'Samsung Securities, «클래시스: 노이즈는 아쉽지만 중장기 성장 모멘텀 이상 무» (objetivo 81.000 KRW, estimaciones 2026e-2028e, valoración por EV/EBITDA)', editor: 'Samsung Securities', tipo: 'Analistas', fecha: '2026-04-14', url: 'https://www.samsungpop.com/common.do?cmd=down&contentType=application%2Fpdf&inlineYn=Y&saveKey=research.pdf&fileName=2010%2F2026041308361388K_02_02.pdf' },
  { id: 6, titulo: 'Fichas de comparables (precio, capitalización, valor empresa, ventas y EBITDA de los últimos doce meses, estimaciones de BPA y ventas)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/145020.KQ' },
  { id: 7, titulo: 'Long-Term Government Bond Yields: 10-year for Korea (IRLTLT01KRM156N), septiembre de 2026: 4,454 %', editor: 'OECD vía FRED (Federal Reserve Bank of St. Louis)', tipo: 'Datos de mercado', fecha: '2026-10-01', url: 'https://fred.stlouisfed.org/series/IRLTLT01KRM156N' },
  { id: 8, titulo: 'Tipos de cambio KRW=X (1.329,83) y CNYKRW=X (199,06), 19-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/KRW=X' },
  { id: 9, titulo: 'Implied ERP by month (ERPbymonth.xlsx): octubre de 2026, 4,20 % (T12m with sustainable payout)', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 10, titulo: 'Seoul Economic Daily: Bain vende el 8,25 % a 60.000 KRW (−11 % sobre el cierre); la acción cae un 11,3 %', editor: 'Seoul Economic Daily', tipo: 'Prensa', fecha: '2026-02-25', url: 'https://www.sedaily.com/article/20012543' },
  { id: 11, titulo: 'Bloter / Hansbiz: bloque del 6 % a 57.915 KRW (mayo de 2025); Bain compró el 60,84 % en 2022 por 670.000 M', editor: 'Hansbiz', tipo: 'Prensa', fecha: '2025-07-14', url: 'http://www.hansbiz.co.kr/news/articleView.html?idxno=760955' },
  { id: 12, titulo: 'SmartToday: Hahn & Company compra Lutronic a 36.700 KRW por acción (OPA por el 77,85 % y 19,33 % del fundador); ventas de 2022 de 264.100 M', editor: 'SmartToday', tipo: 'Prensa', fecha: '2023-06-09', url: 'https://www.smarttoday.co.kr/ko-kr/articles/30799' },
  { id: 13, titulo: 'Douglas Research Insights: OPA de Archimed sobre Jeisys Medical a 13.000 KRW (junio de 2024), ≈ 1 billón KRW por el 100 %', editor: 'Douglas Research Insights', tipo: 'Analistas', fecha: '2024-06-10', url: 'https://douglasresearch.substack.com/p/tender-offer-of-jeisys-medical-by' },
  { id: 14, titulo: 'Presentación de la compra de MedSystems: BRL 69 M (18.270 M KRW) por el 77,5 % de JL Health; ventas 2024 de BRL 510 M y EBITDA normalizado de BRL 64 M', editor: 'CLASSYS Inc.', tipo: 'Primaria', fecha: '2025-10-24', url: `${W}/2025/10/Classys-IR-BOOK_Brazil_vF_251024_Eng.pdf` },
  { id: 15, titulo: 'Annual Report 2023: estados de 2021 (ventas 100.597 M, EBITDA 54.236 M, caja) para el múltiplo de la compra de Bain', editor: 'CLASSYS Inc.', tipo: 'Primaria', fecha: '2024-04-24', url: `${W}/2024/04/2023-Annual-Report_Eng_vF_240424-2.pdf` },
  { id: 16, titulo: 'Fact Sheet 4Q23: beneficio neto 2018-2020 (para el PER histórico)', editor: 'CLASSYS Inc.', tipo: 'Primaria', fecha: '2024-02-14', url: `${W}/2024/02/FactSheet_4Q23_vF_240214-1.xlsx` },
];
const blend = (e0, e1) => 0.2 * e0 + 0.8 * e1; // próximos 12 meses desde el 19-oct: 2,4 meses de 2026 y 9,6 de 2027
const r1 = (x) => (x == null || !isFinite(x) ? null : Math.round(x * 10) / 10);
const r2 = (x) => (x == null || !isFinite(x) ? null : Math.round(x * 100) / 100);
const fxDe = (c) => (c === 'USD' ? USDKRW : c === 'CNY' ? CNYKRW : c === 'HKD' ? USDKRW / 7.77 : 1);
const nombres = { INMD: ['InMode', 'IL'], '300896.SZ': ['Imeik Technology', 'CN'], '145020.KQ': ['Hugel', 'KR'], '214450.KQ': ['PharmaResearch', 'KR'], '336570.KQ': ['Wontech', 'KR'], '149980.KQ': ['Hironic', 'KR'], '086900.KQ': ['Medytox', 'KR'] };
const comparables = compsRaw.filter((c) => nombres[c.s]).map((c) => {
  const fxP = fxDe(c.cur); const fxF = fxDe(c.fcur);
  const e0 = c.et.find((t) => t.p === '0y'); const e1 = c.et.find((t) => t.p === '+1y');
  const epsN = e0?.eps && e1?.eps ? blend(e0.eps, e1.eps) : null;
  const revN = e0?.rev && e1?.rev ? blend(e0.rev, e1.rev) : null;
  return {
    nombre: nombres[c.s][0], ticker: c.s, pais: nombres[c.s][1],
    capitalizacion: Math.round((c.mcap * fxP) / 1e6),
    ev_ventas: r2(c.evRev), ev_ebitda_ltm: r1(c.evEbitda), ev_ebitda_ntm: null,
    per_ntm: epsN ? r1(c.price * (fxP / fxF) / epsN) : null,
    crecimiento_pct: revN && c.rev ? r1((revN / c.rev - 1) * 100) : null,
    margen_ebitda_pct: c.ebitda && c.rev ? r1((c.ebitda / c.rev) * 100) : null,
    roic_pct: null,
    dn_ebitda: c.ebitda ? r2((c.debt - c.cash) / c.ebitda) : null,
    fcf_yield_pct: c.fcf != null ? r1((c.fcf * fxF) / (c.mcap * fxP) * 100) : null,
  };
});
const cl = Object.fromEntries(bolsa.cierres_ejercicio.map((x) => [x.anio, x.precio_cierre]));
const D = {
  _estado: 'completa',
  identificacion: {
    nombre: 'CLASSYS Inc.', nombre_corto: 'CLASSYS', ticker: '214150', isin: 'KR7214150002', mercado: 'KOSDAQ (Korea Exchange)', indice_referencia: 'KOSDAQ',
    pais: 'Corea del Sur', pais_iso: 'KR', sector: 'Health Care', industria: 'Health Care Equipment & Supplies', sede: 'Seúl (208 Teheran-ro, Gangnam-gu)', fundacion: '2007', empleados: 793, web: 'https://www.classys.com',
    precio: bolsa.identificacion.precio, fecha_precio: bolsa.identificacion.fecha_precio, acciones: 65.15, capitalizacion_publicada: 1953330, free_float_pct: 40.3,
    max_52s: 77600, min_52s: 26550, volumen_medio_diario: '≈ 8.620 M KRW/día (3 meses; 243.240 acciones)', proximos_resultados: '2026-11-10',
  },
  consenso: {
    guidance: 'Guía de 2026 dada el 13-feb-2026: ventas de 490.000 M KRW (+45 %), con una banda de 470.000-510.000 M, apoyada en la venta directa en Brasil, Latinoamérica y Japón, el crecimiento en EE. UU. y Europa, Volnewmer como próximo producto estrella (más de 2.000 unidades al año), Quadessy y la entrada en China tras la aprobación de Volnewmer. Se confirmó el 13-may y se rebajó a 445.000 M el 12-ago-2026 (−9 %) [nota A: 8, 7, 14]. No da guía de margen. A medio plazo, el objetivo es 1.000 M USD de ventas en 2030 (≈ 1,33 billones de KRW al cambio de hoy), que el nuevo equipo quiere adelantar [nota C: 4].',
    estimaciones: [
      { periodo: '2026e', ingresos: 435230, ebitda: 203510, ebit: 189590, bpa: 2309, dpa: 924, fuente: 'FnGuide, media de 3 meses a 16-oct-2026 [2]' },
      { periodo: '2027e', ingresos: 543990, ebitda: null, ebit: 248780, bpa: 2962, dpa: null, fuente: 'FnGuide [2]' },
      { periodo: '2028e', ingresos: 664570, ebitda: null, ebit: 313290, bpa: 3766, dpa: null, fuente: 'FnGuide [2]' },
    ],
    recomendaciones: { n_analistas: 12, comprar: 12, mantener: 0, vender: 0, po_medio: 58250, po_min: 40000, po_max: 67000 },
    revisiones: 'Recortes fuertes. En abril de 2026 Samsung Securities esperaba un BPA de 2.931 KRW en 2026e y 3.562 en 2027e con objetivo de 81.000 [5]. Tras el 2T26 (12-ago) los doce informes de agosto-octubre bajaron sus objetivos a 50.000-67.000 KRW y Daol, el 15-oct, a 40.000 con un BPA de 2026e de 1.844 KRW (−8 %), un 3T26 previsto de 97.100 M de ventas y 37.500 M de beneficio operativo (25 % por debajo del consenso) y ventas de 404.200 M en 2026e y 490.300 M en 2027e [3, 4]. El consenso de FnGuide (2.309 KRW en 2026e) es la media de tres meses e incluye estimaciones previas a los recortes: está desfasado al alza. Yahoo da 2.325 KRW (13 analistas) y 3.162 KRW en 2027e (17) [6]. Todas las recomendaciones siguen en comprar.',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    ...bolsa.bolsa,
    posicion_corta_pct: null,
    comentario: 'La acción subió de 18.400 KRW (fin de 2022) a un máximo de cierre de 75.600 KRW el 29-ene-2026 y desde entonces ha caído un 60 %, hasta 29.950 KRW [1]. En el año pierde un 45 % frente al −12,6 % del KOSDAQ y el −26,3 % del ETF de salud coreano [1]. Tres causas encadenadas: (1) las ventas en bloque de Bain con descuento (8,25 % a 60.000 KRW el 25-feb, −11,1 % ese día) y el temor a más ventas [10]; (2) dos trimestres por debajo del consenso con el margen operativo del 51 % al 42 % y la guía recortada el 12-ago (−27,9 % en las cinco sesiones siguientes) [3]; (3) la caída general del sector estético coreano (Hugel, PharmaResearch) [6]. A 29.950 KRW cotiza a 13,7 veces el BPA de 2025 y a 14 veces el de los últimos doce meses.',
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: ['2021', '2022', '2023', '2024', '2025'].map((a) => ({ anio: a, precio_cierre: cl[a], ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    comentario: 'De 2021 a 2025 la acción cotizó entre 16 y 33 veces el beneficio del año y entre 16 y 28 veces el del año siguiente; hoy, a 13,7 veces el de 2025 y unas 12-15 veces el previsto para 2026-2027, está en el mínimo de su historia como empresa de crecimiento. Lo que ha cambiado: el crecimiento orgánico ha bajado del 30-40 % al 9-11 % (1S26), el margen consolidado del 51 % al 42 %, la caja neta se ha convertido en deuda neta y hay un vendedor de casi la mitad del capital. Parte del descuento es estructural.',
    confianza: 'Alta',
  },
  comparables: {
    criterio: 'Fabricantes cotizados de equipos de estética basados en energía (InMode, Wontech, Hironic) y empresas de estética médica coreanas y chinas que compiten por el mismo gasto de las clínicas y comparten inversores (Hugel y Medytox en toxina, PharmaResearch en bioestimuladores, Imeik en inyectables y equipos en China). Quitamos Sisram (Alma Lasers): su margen operativo es del 1,4 % y su consenso de BPA no es comparable. No están Jeisys, Lutronic ni Cutera porque ya no cotizan. EV/EBITDA de los próximos 12 meses en blanco: Yahoo no da un EBITDA futuro homogéneo. PER de los próximos 12 meses = precio ÷ (0,2 × BPA 2026e + 0,8 × BPA 2027e).',
    empresas: comparables,
    comentario: 'El sector estético coreano entero cotiza barato: Hugel y PharmaResearch a 12 veces el BPA de los próximos doce meses con márgenes operativos del 37-41 % y crecimientos del 25 %; Wontech a 7 veces. CLASSYS, con un margen mayor (EBITDA del 50 % en los últimos doce meses) y menos crecimiento esperado, debería cotizar en línea con ellos o algo por encima; a 29.950 KRW cotiza a unas 12-13 veces nuestro BPA de 2027e, en la mediana. InMode, el competidor occidental más parecido, cotiza a 10 veces con ventas planas y un margen hundido: es el precedente de lo que pasa cuando un fabricante de equipos estéticos deja de crecer. La regresión múltiplo-crecimiento no tiene poder explicativo con tan pocos datos.',
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2022-03', objetivo: 'CLASSYS (60,84 %)', comprador: 'Bain Capital (BCPE Centur)', ev: 1085000, ev_ventas: 10.79, ev_ebitda: 20.0, prima_pct: null, excluir: false, comentario: '670.000 M por el 60,84 % = 1,10 billones por el 100 %, menos ≈ 13.000 M de caja neta de 2021; ventas 100.597 M y EBITDA 54.236 M de 2021 [11, 15].' },
      { fecha: '2023-06', objetivo: 'Lutronic (100 %)', comprador: 'Hahn & Company', ev: 977000, ev_ventas: 3.7, ev_ebitda: null, prima_pct: 15.4, excluir: false, comentario: '36.700 KRW por acción (prima del 15,4 %); ventas de 2022 de 264.100 M y beneficio operativo de 55.300 M (EV/EBIT ≈ 17,7x). Capitalización por el 100 % como aproximación al valor empresa [12].' },
      { fecha: '2024-06', objetivo: 'Jeisys Medical (100 %)', comprador: 'Archimed', ev: 1000000, ev_ventas: null, ev_ebitda: null, prima_pct: 20.8, excluir: false, comentario: 'OPA a 13.000 KRW (prima del 20,8 %) para excluirla de bolsa; ≈ 1 billón KRW por el 100 % [13]. Sin múltiplo publicado.' },
      { fecha: '2024-10', objetivo: 'Iruda (fusión por absorción)', comprador: 'CLASSYS', ev: null, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: true, comentario: 'Operación vinculada (Iruda era de otro fondo de Bain); pagada con acciones y 30.853 M de compra previa. Sin múltiplo publicado.' },
      { fecha: '2025-10', objetivo: 'JL Health / MedSystems (77,5 %) y MedSystems Colombia y Argentina', comprador: 'CLASSYS', ev: null, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: true, comentario: 'BRL 69 M (18.270 M KRW) por el 77,5 % del capital; ventas de 2024 de BRL 510 M (135.000 M KRW) y EBITDA normalizado de BRL 64 M. El precio es de un distribuidor con mucha deuda y cartera vencida: el capital vale 1,4 veces el EBITDA, pero el valor empresa no se publica [14].' },
    ],
    comentario: 'Las compras de fabricantes coreanos de equipos estéticos por capital privado se pagaron a 3,7 veces las ventas (Lutronic, 2023) y a ≈ 1 billón KRW por Jeisys (2024); Bain pagó por CLASSYS 20 veces el EBITDA en 2022. Hoy CLASSYS vale en bolsa ≈ 1,8 billones de valor empresa, 9,8 veces el EBITDA de los últimos doce meses: la mitad de lo que pagó Bain. Es candidata natural a una operación (Bain quiere salir), pero el intento de 2024 fracasó porque nadie pagó la prima pedida, y la ley coreana no obliga a extender el precio de control a los minoritarios [11].',
    confianza: 'Media',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'bolsa', campo: 'Posición corta', tipo: 'Complemento', intentos: '1) KRX, saldo de préstamo y posición corta (kind.krx.co.kr devuelve 403); 2) FnGuide (no da posición corta); 3) foro de Naver habla de un 29-38 % de las ventas diarias en corto, cifra no verificable', decision: 'Omitido' },
    { seccion: 'multiplos_historicos', campo: 'EV/EBITDA y PER de los próximos 12 meses históricos', tipo: 'Complemento', intentos: '1) FnGuide (solo PER de cierre); 2) Yahoo (sin histórico de estimaciones); 3) informes de Samsung Securities (solo banda 2022-2024)', decision: 'Omitido' },
  ],
};
guarda('D', D);

// ================================================================ E. Sentimiento
const fE = [
  { id: 1, titulo: 'Foro de Naver (종목토론실) de 214150: 400 mensajes del 29-ago al 19-oct-2026', editor: 'Naver Pay Securities', tipo: 'Foros y redes', fecha: '2026-10-19', url: 'https://m.stock.naver.com/domestic/stock/214150/discussion' },
  { id: 2, titulo: 'Blog de inversión «클래시스 - 2026년 2분기 후속 점검» (seguimiento del 2T26, flujos y precio objetivo)', editor: 'keyzard.cc', tipo: 'Foros y redes', fecha: '2026-08', url: 'https://keyzard.cc/views/nb/Ky02PTAxOGVlbW1rbGZqa21pbmZo' },
  { id: 3, titulo: 'Blog «클래시스 주가 전망 2026, 매출 성장에도 이익률이 낮아진 이유»', editor: 'Equity Room (Blogspot)', tipo: 'Foros y redes', fecha: '2026-07', url: 'https://equityroom-cm.blogspot.com/2026/07/classys-214150-2026-stock-analysis.html' },
  { id: 4, titulo: 'Douglas Research Insights: «Classys: Block Deal Sale of 6% by Bain» (comentarios de lectores)', editor: 'Substack', tipo: 'Foros y redes', fecha: '2025-05', url: 'https://douglasresearch.substack.com/p/classys-block-deal-sale-of-6-by-bain' },
];
const E = {
  _estado: 'completa',
  sentimiento: {
    tono: 'Negativo',
    tendencia: 'Empeora',
    revisadas: [
      { plataforma: 'Foro de Naver (종목토론실), octubre de 2026', fecha: '2026-10', n_comentarios: 150, tono: 'Negativo', resumen: 'Rabia contra Bain («el fondo ya recuperó su dinero y no le importa el precio»), contra los vendedores en corto y contra el informe de Daol (objetivo de 40.000 y tercer trimestre flojo); minoría que compra «por debajo de 30.000» pensando en una venta de la empresa [1].' },
      { plataforma: 'Foro de Naver, septiembre de 2026', fecha: '2026-09', n_comentarios: 200, tono: 'Dividido', resumen: 'Compras escalonadas de particulares con crédito («28.000 es el suelo») frente a quienes temen nuevas ventas del accionista de control y una venta forzosa de su prenda si la acción sigue bajando [1].' },
      { plataforma: 'Foro de Naver, finales de agosto de 2026', fecha: '2026-08', n_comentarios: 50, tono: 'Negativo', resumen: 'Tras los resultados del 2T26: «la caja se va a Brasil», dudas sobre la cartera de cobro y sobre la aprobación de Volnewmer en China, que se esperaba en septiembre [1].' },
      { plataforma: 'Blogs de inversión coreanos', fecha: '2026-08', n_comentarios: 10, tono: 'Neutro', resumen: 'Explican la caída de márgenes por Sudamérica y Japón y señalan que la acción cayó un 27,9 % en las cinco sesiones tras el 2T26; ven el suelo en los 30.000 KRW [2, 3].' },
    ],
    temas: [
      { tema: 'Bain vende y puede vender más (o venderá la empresa barata)', postura: 'Bajista', peso: 'Alto', contraste: 'Cierto: dos bloques con descuento en nueve meses y préstamo con prenda de acciones (nota C). Con la acción a la mitad del precio de la última colocación, otra venta en bloque sería muy cara para Bain; la venta del control con prima sigue siendo la salida natural.' },
      { tema: 'Brasil: cartera vencida y caja que se va', postura: 'Bajista', peso: 'Alto', contraste: 'Tienen razón en el dato: la provisión de clientes pasó de 1.739 M a 62.314 M en seis meses y la deuda neta es positiva por primera vez (nota A). No hay indicio de desvío de caja: es la consolidación del distribuidor.' },
      { tema: 'Aprobación de Volnewmer en China', postura: 'Dividida', peso: 'Medio', contraste: 'Samsung Securities la esperaba en septiembre de 2026 con primer envío a fin de año; no hay anuncio a 19-oct (nota D). Es un catalizador sin fecha.' },
      { tema: 'Está muy barata («una empresa que gana esto no vale 2 billones»)', postura: 'Alcista', peso: 'Medio', contraste: 'Cotiza a 14 veces el beneficio de los últimos doce meses y a 9,8 veces el EBITDA; barata frente a su historia, pero en línea con el sector estético coreano (nota D).' },
      { tema: 'Ventas en corto', postura: 'Bajista', peso: 'Medio', contraste: 'Las cifras del foro (29-38 % de las ventas diarias en corto) no se han podido verificar; no se usan.' },
    ],
    lectura: 'El sentimiento de los particulares coreanos es de capitulación: insultos al accionista de control, crédito para promediar y la idea de que la acción no sube mientras Bain no salga. Coincide con lo que dicen los datos en dos puntos que el informe recoge como riesgos principales (venta del control o nuevos bloques, y la calidad de los cobros de Sudamérica). Va en contra del consenso de analistas, que mantiene doce recomendaciones de compra con objetivos de 40.000-67.000 KRW. La subida del 8,5 % del 19-oct se atribuye en el foro a un inversor particular famoso, sin fuente. No hay euforia: el riesgo de compra masiva de particulares que después vende es menor que el de nuevas ventas del control.',
    confianza: 'Media',
  },
  fuentes: fE,
  huecos: [],
};
guarda('E', E);
console.log('Notas A-E escritas;', comparables.length, 'comparables:', comparables.map((c) => `${c.nombre} PER ${c.per_ntm}`).join(', '));
