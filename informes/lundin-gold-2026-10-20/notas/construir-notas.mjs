// Escribe las notas A-E de Lundin Gold (corte 2026-10-20) a partir de los documentos de notas/docs (informes anuales y
// trimestrales de la empresa, notas de prensa, circular 2026, AIF 2025), de bolsa.json, de yahoo-datos.json y
// yahoo-comparables.json (Yahoo quoteSummary, cierre del 19-oct-2026) y de las tablas de Damodaran, del Tesoro de EE. UU.
// y del Banco de Canadá. Cada nota cita solo con [n] de su propia lista de fuentes.
// Las cuentas están en USD (la empresa publica en USD); la acción cotiza en CAD: precios y cierres se pasan a USD con el
// tipo del Banco de Canadá de cada fecha.
// Ejecutar: node informes/lundin-gold-2026-10-20/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const lee = (f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const r1 = (x) => (x == null ? null : Math.round(x * 10) / 10);
const r2 = (x) => (x == null ? null : Math.round(x * 100) / 100);
const B = lee('bolsa.json');
const YC = lee('yahoo-comparables.json').datos;
const Y = lee('yahoo-datos.json').datos;
const BASE = 'https://lundingold.com/site/assets/files';
const NEWS = 'https://lundingold.com/news';

// Tipos USDCAD del Banco de Canadá (CAD por 1 USD) [D10]
export const USDCAD = { 2018: 1.3642, 2019: 1.2988, 2020: 1.2732, 2021: 1.2678, 2022: 1.3544, 2023: 1.3226, 2024: 1.4389, 2025: 1.3706, corte: 1.4097 };

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Informe anual 2025: carta, MD&A y estados financieros auditados (2025 y 2024), notas de impuestos, partes vinculadas y compromisos', editor: 'Lundin Gold Inc.', tipo: 'Primaria', fecha: '2026-02-19', url: `${BASE}/111721/lug_2025_annual_report_final_23apr.pdf` },
  { id: 2, titulo: 'Informe anual 2024: MD&A y estados financieros (2024 y 2023); recompra del stream y del offtake a Newmont', editor: 'Lundin Gold Inc.', tipo: 'Primaria', fecha: '2025-02-20', url: `${BASE}/111335/2024_annual_report.pdf` },
  { id: 3, titulo: 'Informe anual 2023: MD&A y estados financieros (2023 y 2022)', editor: 'Lundin Gold Inc.', tipo: 'Primaria', fecha: '2024-02-22', url: `${BASE}/111106/lug-2023-annual-report-final-revised.pdf` },
  { id: 4, titulo: 'Informe anual 2022: MD&A y estados financieros (2022 y 2021); guía 2023', editor: 'Lundin Gold Inc.', tipo: 'Primaria', fecha: '2023-02-23', url: `${BASE}/110885/lug-2022-annual-report.pdf` },
  { id: 5, titulo: 'Informe anual 2021: MD&A y estados financieros (2021 y 2020); guía 2021', editor: 'Lundin Gold Inc.', tipo: 'Primaria', fecha: '2022-02-24', url: `${BASE}/110193/2021_lundin_gold_shareholder_report.pdf` },
  { id: 6, titulo: 'Informe del 2T 2026: MD&A y estados financieros intermedios a 30-jun-2026 (stream de plata con LunR, dividendo en especie, ajuste soberano)', editor: 'Lundin Gold Inc.', tipo: 'Primaria', fecha: '2026-08-06', url: `${BASE}/111814/q2-2026-shareholder-report.pdf` },
  { id: 7, titulo: 'Informe del 1T 2026: MD&A y estados financieros intermedios a 31-mar-2026', editor: 'Lundin Gold Inc.', tipo: 'Primaria', fecha: '2026-05-06', url: `${BASE}/111781/lug_q1_2026_shareholder_report.pdf` },
  { id: 8, titulo: 'Informes del 3T 2024, 2T 2025 y 3T 2025: MD&A y estados intermedios (EBITDA y BPA ajustado trimestrales)', editor: 'Lundin Gold Inc.', tipo: 'Primaria', fecha: '2025-11-05', url: `${BASE}/111646/q3_2025_shareholder_report.pdf` },
  { id: 9, titulo: 'Lundin Gold Reports Second Quarter 2026 Results', editor: 'Lundin Gold Inc. (nota de prensa)', tipo: 'Primaria', fecha: '2026-08-06', url: `${NEWS}/lundin-gold-reports-second-quarter-2026-results-122856/` },
  { id: 10, titulo: 'Lundin Gold Reports Q3 2026 Production of 153,736 Ounces of Gold (ventas, precio realizado, resultados el 4-nov)', editor: 'Lundin Gold Inc. (nota de prensa)', tipo: 'Primaria', fecha: '2026-10-08', url: `${NEWS}/lundin-gold-reports-q3-2026-production-of-153-736-122861/` },
  { id: 11, titulo: 'Lundin Gold Provides 2026 Guidance and Strategic Three-Year Outlook', editor: 'Lundin Gold Inc. (nota de prensa)', tipo: 'Primaria', fecha: '2025-12-08', url: `${NEWS}/lundin-gold-provides-2026-guidance-and-strategic-t-122826/` },
  { id: 12, titulo: 'Lundin Gold Reports Record Mineral Reserves (reservas y recursos a 31-dic-2025)', editor: 'Lundin Gold Inc. (nota de prensa)', tipo: 'Primaria', fecha: '2026-02-17', url: `${NEWS}/lundin-gold-reports-record-mineral-reserves-and-ex-122831/` },
  { id: 13, titulo: 'Lundin Gold Declares Quarterly Dividends of US$1.08 per Share (cálculo del dividendo variable)', editor: 'Lundin Gold Inc. (nota de prensa)', tipo: 'Primaria', fecha: '2026-08-06', url: `${NEWS}/lundin-gold-declares-quarterly-dividends-of-us-1-0-122855/` },
  { id: 14, titulo: 'Lundin Gold Reports Fourth Quarter and Full Year 2025 Results', editor: 'Lundin Gold Inc. (nota de prensa)', tipo: 'Primaria', fecha: '2026-02-19', url: `${NEWS}/lundin-gold-reports-fourth-quarter-and-full-year-2-122834/` },
  { id: 15, titulo: 'Lundin Gold Reports First Quarter 2026 Results', editor: 'Lundin Gold Inc. (nota de prensa)', tipo: 'Primaria', fecha: '2026-05-06', url: `${NEWS}/lundin-gold-reports-first-quarter-2026-results-122846/` },
  { id: 16, titulo: 'Lundin Gold Receives Notice of Assessment Regarding Sovereign Adjustment (SRI, ejercicio 2023)', editor: 'Lundin Gold Inc. (nota de prensa)', tipo: 'Primaria', fecha: '2026-09-08', url: `${NEWS}/lundin-gold-receives-notice-of-assessment-regardin-122858/` },
  { id: 17, titulo: 'Annual Information Form 2025 (riesgos, plan de mina, empleados, acuerdos con Ecuador)', editor: 'Lundin Gold Inc.', tipo: 'Primaria', fecha: '2026-03-20', url: `${BASE}/111751/f2025-lug-aif-final.pdf` },
  { id: 18, titulo: 'Lundin Gold Share Capital and Voting Rights Update (241.788.662 acciones a 30-sep-2026; recompra de 28.400)', editor: 'Lundin Gold Inc. (nota de prensa)', tipo: 'Primaria', fecha: '2026-09-30', url: `${NEWS}/lundin-gold-share-capital-and-voting-rights-update-122860/` },
  { id: 19, titulo: 'Lundin Gold Announces TSX Approval for Renewal of its Normal Course Issuer Bid (hasta 12.086.020 acciones)', editor: 'Lundin Gold Inc. (nota de prensa)', tipo: 'Primaria', fecha: '2026-02-26', url: `${NEWS}/lundin-gold-announces-tsx-approval-for-renewal-of-122836/` },
];

// Cuenta (miles → millones; estados auditados [1-5]). EBIT = resultado de explotación minera − exploración − gastos
// corporativos − otros gastos (los de la propia cuenta); EBITDA = EBIT + agotamiento y amortización. Resultado financiero =
// ingresos financieros − gastos financieros ± derivados (stream y offtake hasta junio de 2024).
const cuenta = [
  { periodo: '2021', ingresos: 733.3, coste_ventas: 377.6, gastos_generales: 34.6, ebitda: 426.3, amortizaciones: 107.5, ebit: 318.7, resultado_financiero: -61.6, bai: 257.1, impuestos: 35.7, minoritarios: 0, beneficio_neto: 221.4, gastos_financieros: 50.9, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 0.94, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: 234.6 },
  { periodo: '2022', ingresos: 815.7, coste_ventas: 445.9, gastos_generales: 34.9, ebitda: 467.3, amortizaciones: 130.6, ebit: 336.7, resultado_financiero: -159.4, bai: 177.3, impuestos: 103.7, minoritarios: 0, beneficio_neto: 73.6, gastos_financieros: 240.8, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 0.31, dpa: 0.20, dpa_extraordinario: 0, acciones_diluidas: 236.7 },
  { periodo: '2023', ingresos: 902.5, coste_ventas: 467.3, gastos_generales: 44.8, ebitda: 526.0, amortizaciones: 136.6, ebit: 389.4, resultado_financiero: -104.4, bai: 285.0, impuestos: 105.6, minoritarios: 0, beneficio_neto: 179.5, gastos_financieros: 85.3, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 0.75, dpa: 0.40, dpa_extraordinario: 0, acciones_diluidas: 239.2 },
  { periodo: '2024', ingresos: 1193.1, coste_ventas: 489.7, gastos_generales: 75.7, ebitda: 777.6, amortizaciones: 137.0, ebit: 640.6, resultado_financiero: -6.5, bai: 634.1, impuestos: 208.1, minoritarios: 0, beneficio_neto: 426.1, gastos_financieros: 266.5, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 1.76, dpa: 0.60, dpa_extraordinario: 0, acciones_diluidas: 241.4 },
  { periodo: '2025', ingresos: 1782.9, coste_ventas: 556.6, gastos_generales: 123.9, ebitda: 1235.7, amortizaciones: 135.0, ebit: 1100.7, resultado_financiero: 22.9, bai: 1123.5, impuestos: 331.4, minoritarios: 0, beneficio_neto: 792.2, gastos_financieros: 0, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 3.27, dpa: 2.75, dpa_extraordinario: 0, acciones_diluidas: 242.5 },
];
const balance = [
  { periodo: '2021', activo_total: 1685.1, activo_corriente: 528.2, pasivo_corriente: 311.0, pasivo_total: 870.6, fondo_comercio: 0, intangibles: 0, inmovilizado_material: 1042.2, existencias: 84.9, clientes: 167.7, proveedores: 68.0, activos_contrato: null, pasivos_contrato: null, caja: 262.6, deuda_financiera: 740.0, arrendamientos: 0, patrimonio_neto: 814.5, minoritarios: 0, reservas: -180.7 },
  { periodo: '2022', activo_total: 1668.9, activo_corriente: 635.3, pasivo_corriente: 440.5, pasivo_total: 816.8, fondo_comercio: 0, intangibles: 0, inmovilizado_material: 964.8, existencias: 89.8, clientes: 169.1, proveedores: 71.4, activos_contrato: null, pasivos_contrato: null, caja: 363.4, deuda_financiera: 668.0, arrendamientos: 0, patrimonio_neto: 852.1, minoritarios: 0, reservas: -154.2 },
  { periodo: '2023', activo_total: 1468.2, activo_corriente: 533.9, pasivo_corriente: 187.0, pasivo_total: 512.4, fondo_comercio: 0, intangibles: 0, inmovilizado_material: 878.9, existencias: 89.4, clientes: 163.5, proveedores: 74.8, activos_contrato: null, pasivos_contrato: null, caja: 268.0, deuda_financiera: 305.6, arrendamientos: 0, patrimonio_neto: 955.8, minoritarios: 0, reservas: -69.6 },
  { periodo: '2024', activo_total: 1527.5, activo_corriente: 674.5, pasivo_corriente: 215.5, pasivo_total: 311.2, fondo_comercio: 0, intangibles: 0, inmovilizado_material: 828.7, existencias: 88.2, clientes: 233.6, proveedores: 109.9, activos_contrato: null, pasivos_contrato: null, caja: 349.2, deuda_financiera: 0, arrendamientos: 0, patrimonio_neto: 1216.3, minoritarios: 0, reservas: 212.6 },
  { periodo: '2025', activo_total: 1787.2, activo_corriente: 983.2, pasivo_corriente: 388.5, pasivo_total: 423.0, fondo_comercio: 0, intangibles: 0, inmovilizado_material: 774.8, existencias: 92.9, clientes: 260.1, proveedores: 159.7, activos_contrato: null, pasivos_contrato: null, caja: 630.2, deuda_financiera: 0, arrendamientos: 0, patrimonio_neto: 1364.1, minoritarios: 0, reservas: 340.9 },
];
// Flujos: capex = inmovilizado + IVA pagado en inversión; intereses en financiación = intereses + «finance charge» del stream
// y el offtake (pagos en oro valorados, clasificados en financiación por la empresa).
const flujos = [
  { periodo: '2021', flujo_operativo: 417.8, capex: 63.1, pagos_arrendamientos: 0, adquisiciones: 0, desinversiones: 0, dividendos: 0, recompras: 0, emision_acciones: 18.6, intereses_en_financiacion: 86.3 },
  { periodo: '2022', flujo_operativo: 426.1, capex: 60.1, pagos_arrendamientos: 0, adquisiciones: 0, desinversiones: 0, dividendos: 47.0, recompras: 0, emision_acciones: 11.3, intereses_en_financiacion: 96.6 },
  { periodo: '2023', flujo_operativo: 519.4, capex: 53.5, pagos_arrendamientos: 0, adquisiciones: 0, desinversiones: 0, dividendos: 94.9, recompras: 0, emision_acciones: 14.2, intereses_en_financiacion: 202.4 },
  { periodo: '2024', flujo_operativo: 662.4, capex: 93.5, pagos_arrendamientos: 0, adquisiciones: 0, desinversiones: 0, dividendos: 143.8, recompras: 0, emision_acciones: 22.1, intereses_en_financiacion: 264.7 },
  { periodo: '2025', flujo_operativo: 1023.0, capex: 97.2, pagos_arrendamientos: 0, adquisiciones: 0, desinversiones: 0, dividendos: 663.8, recompras: 0, emision_acciones: 18.9, intereses_en_financiacion: 0 },
];
const trim = (p, ing, ant, ebitda, bpa, vs) => ({ periodo: p, ingresos: ing, crecimiento_pct: r1((ing / ant - 1) * 100), crecimiento_organico_pct: null, ebitda, margen_ebitda_pct: r1(ebitda / ing * 100), bpa, vs_consenso: vs });

const A = {
  _estado: 'Completa. Cuentas auditadas 2021-2025 de los informes anuales (NIIF, USD) y estados intermedios del 1T y 2T 2026. Canadá no tiene XBRL en cuentas.mjs: cifras copiadas de los estados (miles → millones). EBIT y EBITDA calculados desde la cuenta (la definición de EBITDA de la empresa incluye exploración y gastos corporativos). Propiedades mineras sumadas al inmovilizado material.',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 2018.8, ebitda: 1446.4, ebit: 1314.5, beneficio_neto: 917.2, bpa: 3.80, dpa: 7.04, dpa_extraordinario: 3.09, fcf: 963.8, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [],
    comentario: 'Los ingresos pasaron de 733,3 M USD en 2021 a 1.782,9 M en 2025 (TCAC del 24,9 %) con la producción casi plana: 428.514 onzas en 2021 y 498.315 en 2025 [5, 1]. El motor es el precio del oro: el realizado subió de 1.772 USD/oz en 2021 a 3.594 en 2025 y a 4.518 en los nueve primeros meses de 2026 [5, 1, 10]. El volumen subió por la ampliación de la planta (de 3.878 t/día en 2021 a 5.009 en 2025 y 5.614 en 2026), con la ley bajando de 10,6 a 9,5 g/t [5, 1, 10]. El EBITDA pasó del 58,1 % de los ingresos en 2021 al 69,3 % en 2025: el coste en efectivo por onza solo subió de 632 a 838 USD (regalías y participación de los trabajadores suben con el precio) mientras el precio se duplicaba [5, 1]. En 2025 los gastos corporativos (64,4 M) incluyen 48,5 M de pagos en acciones revalorizados por la subida de la acción [1]. El beneficio de 2022 (73,6 M) y 2024 está deformado por el coste del stream y el offtake con Newmont (gastos financieros de 240,8 M en 2022 y 266,5 M en 2024, compensados en parte por ganancias de derivados) [3, 2].',
    ajustes: 'Cifras publicadas. El BPA ajustado de la empresa excluye las variaciones de valor del stream y el offtake (hasta 2024), del stream de plata con LunR (desde 2026) y la pérdida de valor de las acciones de LunR repartidas: 1,07 USD en 2021, 0,53 en 2022, 0,86 en 2023, 1,76 en 2024 y 3,29 en 2025 (igual al publicado, sin ajustes) [5, 3, 2, 1]. En el 2T 2026 el publicado (0,91) incluye una ganancia de derivados de 126,7 M y una pérdida de 74,6 M en las acciones de LunR; el ajustado es 0,84 [6]. El LTM a junio de 2026 se da en base ajustada (EBITDA 1.446,4 M y beneficio 917,2 M; publicado 935,1 M) y el dividendo en especie de LunR (747 M, 3,09 USD por acción) va como extraordinario [6].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      trim('3T24', 323.1, 211.2, 220.5, 0.57, null),
      trim('4T24', 341.8, 190.7, 232.2, 0.54, null),
      trim('1T25', 356.3, 226.7, 241.5, 0.64, null),
      trim('2T25', 452.9, 301.4, 318.8, 0.82, null),
      trim('3T25', 447.1, 323.1, 311.7, 0.86, null),
      trim('4T25', 526.6, 341.8, 363.8, 0.97, null),
      trim('1T26', 567.4, 356.3, 423.9, 1.13, 'Inferior'),
      trim('2T26', 477.7, 452.9, 347.0, 0.84, null),
    ],
    ultima_presentacion: 'EBITDA ajustado y BPA ajustado de la empresa [8, 1, 6]. En el 1T26 los ingresos (567,4 M USD) quedaron 9,9 M por debajo de lo esperado según la prensa financiera; no se ha encontrado el consenso de BPA previo de los demás trimestres. En el 2T26 (6-ago-2026) vendió 110.385 onzas a 4.359 USD (el ajuste de las ventas a precio provisional restó 166 USD por onza), con coste en efectivo de 1.016 USD/oz y AISC de 1.176; el flujo libre cayó a 96 M por el pago anual de impuestos y participación del Estado (221 M, frente a 95 M en 2025) [9]. La dirección mantuvo la guía de 2026 (475.000-525.000 onzas; AISC de 1.110-1.170 USD/oz a 4.000 USD de oro), anunció que juntará la mina de FDNS y la ampliación de la planta en una sola decisión de inversión a finales de 2026 y que empezará a recomprar acciones [9]. El 8-oct-2026 publicó la producción del 3T: 153.736 onzas (récord), 148.326 vendidas a 4.299 USD; 392.472 onzas en nueve meses [10]. Resultados del 3T el 4-nov-2026 [10]. Las transcripciones de las conferencias no están abiertas (Seeking Alpha de pago): no se sabe qué evitó contestar la dirección.',
    confianza: 'Alta',
  },
  balance: {
    historico: balance,
    vencimientos: [],
    liquidez: 'Caja de 507,1 M USD a 30-jun-2026 y circulante de 444,7 M; sin deuda financiera desde 2024 [6]. La línea de crédito rotatoria no aparece dispuesta en el balance.',
    rating: 'Sin rating',
    coste_deuda_pct: null,
    vida_media_anios: null,
    otros_pasivos: 'Stream de plata con LunR (cerrado el 28-may-2026): pasivo financiero a valor razonable de 690,3 M USD a 30-jun-2026 (26,4 M a corto); se liquida entregando el 100 % de la plata pagable hasta 12,2 Moz, el 50 % hasta otros 7,8 Moz y el 7,5 % después, con un pago del 10 % del precio de contado (luego 20 % y 30 %) [6]. Las reservas tienen 8,9 Moz de plata, por debajo del primer tramo [12]. Impuestos a pagar de 178,5 M (pago anual en abril) [6]. Ajuste soberano: el SRI reclama 73 M más 81 M de multas (154 M sin intereses) por 2023; la empresa lo recurre y no lo ha provisionado [16]. Compromisos de capital de 47,6 M [6], provisión de restauración de 8,9 M [6] y regalías del 5 % al Estado y del 1 % a terceros [6].',
    comentario: 'La deuda del proyecto (préstamo, stream de oro y offtake, 740 M USD en 2021) se pagó entre 2021 y 2024; la recompra del stream y el offtake a Newmont en junio de 2024 costó 261 M de «finance charge» y 101 M de amortización [2, 1]. Desde entonces la caja neta crece (630,2 M a fin de 2025) y casi todo el flujo libre se reparte. El circulante comercial (clientes + existencias − proveedores) es de 193,3 M en 2025 (10,8 % de las ventas): los cobros de concentrado a precio provisional pesan. En 2026 el patrimonio cayó a 544 M por el dividendo en especie de LunR (747 M) y los dividendos en efectivo (571 M en el semestre) [6].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'La conversión en caja es alta: flujo operativo de 1.023,0 M USD en 2025 frente a un EBITDA de 1.235,7 M, con impuestos pagados al año siguiente (los de 2025, 221 M en abril de 2026) [1, 9]. La inversión es baja para una mina: 97,2 M en 2025 (5,5 % de las ventas), casi todo de mantenimiento (presas de relaves, equipos); el AISC incluye ≈ 75-95 M de inversión de mantenimiento al año en 2026-2028 [1, 11]. El flujo libre de la empresa fue de 925,8 M en 2025 (3,84 USD por acción) y de 444,5 M en el primer semestre de 2026 [1, 6]. De 2021 a 2024 la caja fue a pagar la deuda del proyecto (≈ 615 M de amortización y ≈ 650 M de intereses y cargos del stream); desde 2025, a dividendos (663,8 M en 2025 y 570,7 M en el semestre) [1, 6]. Lo que viene de crecimiento (FDNS, ampliación de la planta) no tiene presupuesto publicado.',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'PricewaterhouseCoopers LLP (Vancouver)', anios_auditor: null, opinion: 'Favorable (sin salvedades) sobre las cuentas de 2025 [1]',
    comentario: 'Cuentas sencillas: una mina, un país, sin fondo de comercio ni compras. Lo complejo son los instrumentos a valor razonable: el stream de oro y el offtake con Newmont hasta 2024 (ganancias y pérdidas de derivados de −137 a +244 M al año) y, desde mayo de 2026, el stream de plata con LunR, que cambiará de valor cada trimestre con el precio de la plata [3, 2, 6]. Los ingresos de concentrado se reconocen a precio provisional y se ajustan después (en el 2T26 restaron 166 USD/oz) [9]. Los pagos en acciones se liquidan en efectivo y se revalorizan con la acción (48,5 M en 2025) [1]. El tipo impositivo efectivo (29,5 % en 2025) incluye el 22 % de impuesto, el 12 % de participación del Estado y la retención del 5 % sobre dividendos [1]. Altman, Piotroski y Beneish del motor se leen con cuidado en 2021-2024 por los derivados del stream.',
    senales: [
      { senal: 'Ajuste soberano reclamado por el SRI', nivel: 'Media', comentario: '154 M USD por 2023 (73 M más multas); no provisionado; puede repetirse en 2024-2025 con más beneficio [16].' },
      { senal: 'Stream de plata a valor razonable', nivel: 'Baja', comentario: '690 M de pasivo que mueve el resultado cada trimestre; el BPA ajustado lo excluye [6].' },
      { senal: 'Ventas a precio provisional', nivel: 'Baja', comentario: 'Ajustes de −166 USD/oz (2T26) y +46 USD/oz (3T26) [9, 10].' },
      { senal: 'Pagos en acciones liquidados en efectivo', nivel: 'Baja', comentario: '48,5 M en 2025 por la revalorización de la acción; deforma los gastos corporativos [1].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Dividendo fijo de 0,30 USD por trimestre (≈ 300 M al año) más uno variable de al menos el 50 % del flujo libre normalizado del trimestre anterior menos el fijo; en 2026 ha pagado el 100 % [13, 9]. El 2T26 declaró 1,08 USD (0,30 + 0,78) [13]. Recompra (NCIB) de hasta 12.086.020 acciones hasta el 2-mar-2027; la de 2025 no se usó y en septiembre de 2026 se cancelaron las primeras 28.400 [19, 18]. En junio de 2026 repartió en especie las 50.505.051 acciones de LunR (747 M) que recibió por el stream de plata [6].',
    adquisiciones: [
      { anio: '2014', objetivo: 'Fruta del Norte (compra a Kinross)', importe: 240, ev_ebitda: null, financiacion: 'Ampliaciones de capital', resultado: 'Mina en producción comercial desde febrero de 2020; reservas de 5,85 Moz a fin de 2025 [17, 12].' },
    ],
    comentario: 'La dirección no ha comprado nada desde Fruta del Norte: el capital va a la mina, a exploración (85 M en 2026) y al accionista. La compra de 2014 por 240 M USD es una de las mejores del sector: la mina ha producido ≈ 2,9 Moz y tiene más reservas que al empezar [17, 12]. El ROIC de 2025 (EBIT tras impuestos sobre ≈ 1.000 M de capital invertido) supera el 70 %, porque el capital es el coste histórico de construcción ya amortizado en parte. La cesión del stream de plata a cambio de acciones de LunR repartidas al accionista no cambia el valor total: lo separa (y la plata deja de ser de Lundin Gold) [6]. Las acciones crecieron de 234,6 M diluidas en 2021 a 242,5 M en 2025 (+0,8 % al año) por opciones y los derechos antidilución de Newmont [5, 1].',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'Oro (concentrado y doré)', descripcion: 'Venta de concentrado de oro a fundiciones y de doré a refinerías, desde la mina de Fruta del Norte (Ecuador).', tipo_resultado: null, historico: [{ periodo: '2021', ingresos: 733.3 - 7.0, resultado: null }, { periodo: '2022', ingresos: 815.7 - 9.9, resultado: null }, { periodo: '2023', ingresos: 902.5 - 11.4, resultado: null }, { periodo: '2024', ingresos: 1193.1 - 14.8, resultado: null }, { periodo: '2025', ingresos: 1782.9 - 23.2, resultado: null }] },
      { nombre: 'Plata (subproducto)', descripcion: 'Plata contenida en el concentrado y el doré; desde marzo de 2026 se entrega a LunR por el stream.', tipo_resultado: null, historico: [{ periodo: '2021', ingresos: 7.0, resultado: null }, { periodo: '2022', ingresos: 9.9, resultado: null }, { periodo: '2023', ingresos: 11.4, resultado: null }, { periodo: '2024', ingresos: 14.8, resultado: null }, { periodo: '2025', ingresos: 23.2, resultado: null }] },
    ],
    geografias: [{ nombre: 'Ventas a fundiciones, refinerías y bancos fuera de Ecuador (origen: Ecuador)', peso_pct: 100 }],
    geografias_criterio: 'origen',
    kpis: [
      { kpi: 'Producción de oro (onzas)', valor_anterior: '502.029 (2024)', valor_actual: '498.315 (2025)', variacion: '−0,7 %', comentario: '392.472 en nueve meses de 2026; guía 475.000-525.000 [1, 10].' },
      { kpi: 'Precio realizado (USD/oz)', valor_anterior: '2.462', valor_actual: '3.594', variacion: '+46 %', comentario: '4.518 en nueve meses de 2026 [1, 10].' },
      { kpi: 'Coste en efectivo (USD/oz vendida)', valor_anterior: '712', valor_actual: '838', variacion: '+18 %', comentario: 'Guía 2026: 900-960 a 4.000 USD de oro [1, 11].' },
      { kpi: 'AISC (USD/oz vendida)', valor_anterior: '875', valor_actual: '1.015', variacion: '+16 %', comentario: 'Guía 2026: 1.110-1.170; 1.114 en el 1T26 y 1.176 en el 2T26 [1, 11, 15, 9].' },
      { kpi: 'Ritmo de la planta (t/día)', valor_anterior: '4.620', valor_actual: '5.009', variacion: '+8 %', comentario: '5.823 en el 3T26 (récord) [1, 10].' },
      { kpi: 'Ley de cabeza (g/t)', valor_anterior: '10,5', valor_actual: '9,5', variacion: '−10 %', comentario: 'Reservas a 7,09 g/t: la ley baja hacia la media [1, 12].' },
      { kpi: 'Reservas probadas y probables (Moz de oro)', valor_anterior: '5,52 (est.)', valor_actual: '5,85', variacion: '+6 %', comentario: 'Tras extraer 0,53 Moz en 2025; incluye 0,54 Moz de FDNS [12].' },
    ],
    clientes: 'Cuatro clientes principales: fundiciones que compran el concentrado (≈ 2/3 de las onzas) y refinerías y bancos que compran el doré; la empresa dice no depender de ellos porque el oro se vende en un mercado mundial líquido [1]. Hasta junio de 2024 el doré se vendía a Newmont por el offtake (177,9 M en 2024) [1]. No hay poder de precios: el precio es el del mercado (LBMA) y el concentrado paga tratamiento y refino (85 USD/oz en los supuestos de reservas) [12].',
    confianza: 'Alta',
  },
  huecos: [
    { seccion: 'calidad', campo: 'anios_auditor', tipo: 'Complemento', intentos: '1) Informe anual 2025 (informe del auditor); 2) circular 2026 (nombramiento del auditor); 3) AIF 2025', decision: 'Omitido' },
    { seccion: 'balance', campo: 'vencimientos', tipo: 'Complemento', intentos: '1) Nota de deuda del informe del 2T26 (no hay deuda financiera); 2) informe anual 2025; 3) MD&A, liquidez', decision: 'Omitido: sin deuda financiera' },
  ],
  fuentes: fA,
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Gold Demand Trends Q2 2026: resumen ejecutivo (oferta, demanda, producción minera, precio LBMA)', editor: 'World Gold Council', tipo: 'Sectorial', fecha: '2026-07-30', url: 'https://www.gold.org/download/file/20967/GDT-Q2-2026-Executive-Summary.pdf' },
  { id: 2, titulo: 'Mineral Commodity Summaries 2026: Gold (producción y reservas mundiales, precio medio)', editor: 'U.S. Geological Survey', tipo: 'Sectorial', fecha: '2026-01-30', url: 'https://pubs.usgs.gov/periodicals/mcs2026/mcs2026-gold.pdf' },
  { id: 3, titulo: 'Datos de Yahoo Finance (quoteSummary) de Agnico Eagle, Newmont, Barrick, Kinross, Alamos, Endeavour, Torex, OceanaGold y Gold Fields: ventas, EBITDA y márgenes de los últimos 12 meses', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/' },
  { id: 4, titulo: 'Annual Information Form 2025 de Lundin Gold (Ecuador: régimen fiscal y minero, riesgos, competencia, minería ilegal)', editor: 'Lundin Gold Inc.', tipo: 'Primaria', fecha: '2026-03-20', url: `${BASE}/111751/f2025-lug-aif-final.pdf` },
  { id: 5, titulo: 'Reservas y recursos a 31-dic-2025 (supuestos de coste, ley de corte, precio de 1.700 USD/oz)', editor: 'Lundin Gold Inc. (nota de prensa)', tipo: 'Primaria', fecha: '2026-02-17', url: `${NEWS}/lundin-gold-reports-record-mineral-reserves-and-ex-122831/` },
  { id: 6, titulo: 'Guía 2026 y perspectiva a tres años (2026-2028)', editor: 'Lundin Gold Inc. (nota de prensa)', tipo: 'Primaria', fecha: '2025-12-08', url: `${NEWS}/lundin-gold-provides-2026-guidance-and-strategic-t-122826/` },
  { id: 7, titulo: 'Notificación del SRI sobre el ajuste soberano de 2023 y resumen de los acuerdos de explotación y protección de inversiones', editor: 'Lundin Gold Inc. (nota de prensa)', tipo: 'Primaria', fecha: '2026-09-08', url: `${NEWS}/lundin-gold-receives-notice-of-assessment-regardin-122858/` },
  { id: 8, titulo: 'Lundin Gold Discovers Two New Copper-Gold Porphyries (siete pórfidos; recurso inicial de Sandia a principios de 2027)', editor: 'Lundin Gold Inc. (nota de prensa)', tipo: 'Primaria', fecha: '2026-07-21', url: `${NEWS}/lundin-gold-discovers-two-new-copper-gold-porphyri-122853/` },
  { id: 9, titulo: 'Country Risk Premiums (ctryprem.xlsx, enero de 2026): Ecuador Caa3, prima de riesgo país 12,9 %', editor: 'A. Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-01', url: 'https://pages.stern.nyu.edu/~adamodar/pc/datasets/ctryprem.xlsx' },
  { id: 10, titulo: 'Lundin Gold Reports Fourth Quarter and Full Year 2025 Results (producción, AISC de 1.015 USD/oz, ley)', editor: 'Lundin Gold Inc. (nota de prensa)', tipo: 'Primaria', fecha: '2026-02-19', url: `${NEWS}/lundin-gold-reports-fourth-quarter-and-full-year-2-122834/` },
];
// Mercado: valor de la producción minera mundial. USGS: 3.280 t en 2024 a 2.388 USD/oz y 3.300 t en 2025 a ≈ 3.300 USD/oz
// [2]; WGC: 3.881,6 t en los 12 meses a jun-2026 a precios trimestrales LBMA [1]. 1 t = 32.150,7 oz.
const OZ = 32150.7;
const serie = [
  { anio: '2024', tamano: Math.round(3280 * OZ * 2388 / 1e6) },
  { anio: '2025', tamano: Math.round(3300 * OZ * 3300 / 1e6) },
  { anio: 'LTM jun-26', tamano: Math.round((1028.1 * 3456.5 + 986.6 * 4135.2 + 901.3 * 4872.9 + 965.6 * 4506.3) * OZ / 1e6) },
];
const comp = (n, t, pais, cuota, c) => { const d = YC[t]; return { nombre: n, pais, ticker: t, ingresos: Math.round(d.ventas / 1e6), cuota_pct: cuota, margen_ebit_pct: null, comentario: `${c} Margen EBITDA de los últimos 12 meses: ${r1(d.margen_ebitda * 100)} % [3].` }; };
const B_ = {
  _estado: 'Completa. Mercado = valor de la producción minera de oro (USGS y WGC). Márgenes de los competidores de Yahoo (EBITDA, no EBIT: el EBIT de las cuentas de cada uno no se ha copiado).',
  sector: {
    definicion: 'El mercado relevante es el de la producción minera de oro: Lundin Gold vende onzas a precio de mercado y compite por capital, personal y yacimientos, no por clientes. Se mide como el valor de la producción minera mundial (toneladas × precio medio). Dos fuentes: el USGS da 3.280 t en 2024 y ≈ 3.300 t en 2025, con reservas mundiales de 66.000 t [2]; el World Gold Council, 3.881,6 t de producción minera en los 12 meses a junio de 2026 (965,6 t en el 2T26, +2 %) [1]. La diferencia entre las dos series es de cobertura (el WGC incluye la minería artesanal estimada); se usa el WGC para el dato reciente y el USGS para los años completos.',
    tamano: `≈ ${Math.round(serie[2].tamano / 1000)}.000 M USD en los 12 meses a junio de 2026 (3.881,6 t a precios LBMA trimestrales de 3.456-4.873 USD/oz) [1]; ≈ ${Math.round(serie[1].tamano / 1000)}.000 M en 2025 con los datos del USGS [2]`,
    unidad_serie: 'millones de USD (valor de la producción minera mundial)',
    serie,
    tcac_historico_pct: r1((Math.pow(serie[1].tamano / serie[0].tamano, 1) - 1) * 100),
    tcac_previsto_pct: null,
    cr5_pct: null,
    estructura: 'Fragmentada',
    drivers: [
      { driver: 'Compras de los bancos centrales', efecto: '+', horizonte: 'Estructural', evidencia: '288,9 t en el 2T26, +62 % sobre el trimestre anterior [1].' },
      { driver: 'Flujos de los ETF de oro', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Salidas de 44,8 t en el 2T26 tras entradas de 225,7 t en el 3T25 [1].' },
      { driver: 'Precio del oro', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'LBMA medio de 4.506 USD/oz en el 2T26 (+37 % interanual, −8 % trimestral) [1]; máximo de 5.318 USD en enero de 2026 [3].' },
      { driver: 'Oferta minera rígida', efecto: '+', horizonte: 'Estructural', evidencia: 'Producción mundial de 3.280-3.300 t al año en 2024-2025 pese a duplicarse el precio [2].' },
      { driver: 'Inflación de costes y regalías ligadas al precio', efecto: '−', horizonte: 'Cíclico', evidencia: 'La guía de Lundin Gold sube ≈ 150 USD/oz de coste por las regalías y la participación de los trabajadores al pasar de 2.500 a 4.000 USD de oro [6].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 2, justificacion: 'No se compite por precio: cada onza se vende al de mercado; la rivalidad es por yacimientos y personal [4].' },
      { fuerza: 'Poder de los clientes', intensidad: 1, justificacion: 'Mercado mundial líquido; solo el concentrado paga tratamiento y refino (85 USD/oz en los supuestos de reservas) [5].' },
      { fuerza: 'Poder de los proveedores', intensidad: 3, justificacion: 'El Estado ecuatoriano cobra el 5 % de regalía, el 12 % de los beneficios, el 22 % de impuesto y un ajuste soberano para quedarse al menos el 50 % [7]; energía, explosivos y mano de obra local.' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Una mina como Fruta del Norte tardó de 2006 (descubrimiento) a 2020 (producción comercial) [4].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 2, justificacion: 'Para la inversión, el oro compite con bonos y activos digitales; para la joyería, con otros metales. La demanda de bancos centrales no tiene sustituto cercano [1].' },
    ],
    ciclo: { posicion: 'Madurez del ciclo', comentario: 'El precio del oro se ha más que duplicado desde 2023 (1.945 USD/oz de media en 2023 [2]; 4.506 en el 2T26 [1]) y marcó máximos en enero de 2026 (5.318 USD) antes de caer a 4.071 en julio y quedar en 4.160 el 19-oct [3]. Las mineras viven márgenes récord. En 2008-09 el oro subió y las mineras cayeron con la bolsa; en 2013 el oro bajó un 28 % y las mineras perdieron más de la mitad; en 2020 subió; en 2022 las mineras cayeron con los tipos.' },
    regulacion: 'Ecuador: Ley de Minería y Acuerdo de Explotación de Fruta del Norte (diciembre de 2016) con un Acuerdo de Protección de Inversiones que fija el régimen fiscal para la vida de la mina: regalía del 5 % NSR, 12 % de participación del Estado, 22 % de impuesto de sociedades, retención del 5 % sobre dividendos, y un ajuste soberano anual para que el Estado reciba al menos el 50 % de los beneficios acumulados [7, 4]. En septiembre de 2026 el SRI reclamó 154 M USD por el ajuste de 2023; la empresa lo discute [7]. La prima de riesgo país de Ecuador (Caa3) es del 12,9 % [9].',
    tendencias: 'Las grandes mineras no tienen deuda y compran producción (Newmont y Barrick venden activos; Northern Star, Gold Fields y AngloGold compran) [3]. La exploración vuelve a crecer con el precio: Lundin Gold hace su mayor campaña (133.000 m) y ha encontrado siete pórfidos de cobre y oro cerca de la mina [8, 6]. La minería ilegal en Ecuador y la seguridad son el riesgo social del país [4].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: r2(15.5 / 3300 * 100),
    posicion: 'Mina de oro subterránea de las de mayor ley del mundo (9,5 g/t en 2025) y ≈ 0,5 % de la producción minera mundial (498.315 onzas, 15,5 t, frente a 3.300 t) [2, 10]. Por coste, en el primer cuartil del sector: AISC de 1.015 USD/oz en 2025 [10, 3].',
    competidores: [
      comp('Agnico Eagle', 'AEM', 'Canadá', null, 'Mayor productor de Canadá; minas de alta calidad en jurisdicciones seguras; cotiza con prima.'),
      comp('Newmont', 'NEM', 'EE. UU.', null, 'Mayor productor mundial; primer accionista de Lundin Gold (31,9 %).'),
      comp('Barrick Mining', 'B', 'Canadá', null, 'Segundo productor; minas en África, América y Asia; riesgo país alto (Malí).'),
      comp('Kinross Gold', 'KGC', 'Canadá', null, 'Vendió Fruta del Norte a Lundin en 2014; minas en EE. UU., Canadá y Mauritania.'),
      comp('Alamos Gold', 'AGI', 'Canadá', null, 'Productor mediano de Canadá y México; en crecimiento.'),
      comp('Endeavour Mining', 'EDV.L', 'Reino Unido', null, 'Productor de África occidental; riesgo país alto.'),
      comp('Torex Gold', 'TXG.TO', 'Canadá', null, 'Mina principal única en México (ELG y Media Luna): el comparable de una sola mina y un solo país.'),
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'No aplica a una mina.' },
        { fuente: 'Costes de cambio', puntuacion: 0, evidencia: 'Los clientes compran oro a precio de mercado.' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'Acuerdo de explotación con estabilidad fiscal para la vida de la mina y concesiones de ≈ 54.000 ha en el cinturón de Zamora [7, 8].' },
        { fuente: 'Ventaja en costes', puntuacion: 4, evidencia: 'Ley de 9,5 g/t frente a ≈ 1-3 g/t de las minas típicas; AISC de 1.015 USD/oz en 2025 y margen EBITDA del 69 % frente al 58-70 % de los grandes [10, 3].' },
        { fuente: 'Escala eficiente', puntuacion: 2, evidencia: 'Planta e infraestructura ya construidas (≈ 5.500-5.800 t/día) a las que se suman FDNS y FDN East sin una mina nueva [6].' },
      ],
    },
    amenazas: 'El foso es geológico y fiscal, no comercial: dura lo que duren la ley alta (la de reservas es 7,09 g/t, por debajo de lo que se extrae hoy) y el acuerdo con el Estado [5, 7]. Lo puede erosionar un cambio de régimen en Ecuador o una interpretación agresiva del ajuste soberano (ya hay una reclamación de 154 M), la minería ilegal en la concesión y un accidente en la presa de relaves o la mina subterránea [7, 4]. La probabilidad de un cambio fiscal grave en 3-5 años es media: el acuerdo tiene arbitraje internacional, pero el Estado ya ha discutido la cuenta.',
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'Lundin Gold (Vancouver) es dueña al 100 % de Fruta del Norte, una mina de oro subterránea en la provincia de Zamora Chinchipe, en el sureste de Ecuador, en producción comercial desde febrero de 2020 [4]. Extrae ≈ 1,8-2,0 Mt de mineral al año a 8-10 g/t de oro, lo muele en su planta (5.500-5.800 t/día) y vende dos productos: concentrado de oro (≈ dos tercios de las onzas) a fundiciones, y doré (oro casi puro) a refinerías [6]. Produce ≈ 500.000 onzas al año y la plata como subproducto, que desde marzo de 2026 es de LunR por un stream [6]. Tiene 2.013 empleados (1.862 fijos en Ecuador) [4] y una campaña de exploración de 85 M USD sobre una concesión con tres yacimientos epitermales de oro (FDN, FDNS, FDN East) y siete pórfidos de cobre y oro [8].',
    como_gana_dinero: 'Ingresos = onzas vendidas × precio del oro (no hay coberturas). El coste es casi fijo por tonelada (≈ 75 USD/t de planta y administración y ≈ 49 USD/t de minería en los supuestos de reservas [5]), así que el coste por onza depende de la ley y el margen, del precio: con oro a 4.000 USD el coste en efectivo es de 900-960 USD/oz y el AISC de 1.110-1.170 [6]. Las regalías (6 %) y la participación de los trabajadores (3 %) suben con el precio. Cada 100 USD de oro mueven ≈ 50 M USD de ingresos y ≈ 31 M de beneficio neto (estimación propia: 500.000 onzas, −9 % de regalías y participación, −31 % de impuestos). El Estado se queda con el 12 % de los beneficios más el 22 % de impuesto, y con un mínimo del 50 % de los beneficios acumulados [7]. Estacionalidad: el 2T tiene menos caja por el pago anual de impuestos en abril.',
  },
  huecos: [
    { seccion: 'sector', campo: 'cr5_pct', tipo: 'Complemento', intentos: '1) WGC Gold Demand Trends (sin producción por empresa); 2) USGS (por país, no por empresa); 3) Producción de los cinco grandes de sus cuentas (no reunida a la misma fecha)', decision: 'Omitido' },
    { seccion: 'sector', campo: 'tcac_previsto_pct', tipo: 'Complemento', intentos: '1) WGC (sin previsión de valor); 2) USGS (sin previsión); 3) Derivarlo exigiría suponer el precio del oro, que es la variable del análisis', decision: 'Omitido' },
  ],
  fuentes: fB,
};
guarda('B', B_);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Management Information Circular 2026 (accionistas > 10 %, consejo, comités, remuneración de directivos, tabla resumen)', editor: 'Lundin Gold Inc.', tipo: 'Primaria', fecha: '2026-03-20', url: `${BASE}/111741/2026_circular_-_conformed.pdf` },
  { id: 2, titulo: 'Lundin Gold Announces Voting Results from Annual Meeting (8-may-2026)', editor: 'Lundin Gold Inc. (nota de prensa)', tipo: 'Primaria', fecha: '2026-05-08', url: `${NEWS}/lundin-gold-announces-voting-results-from-annual-m-122847/` },
  { id: 3, titulo: 'Lundin Gold Announces CEO Transition (Ron Hochstein → Jamie Beck desde el 7-nov-2025)', editor: 'Lundin Gold Inc. (nota de prensa)', tipo: 'Primaria', fecha: '2025-09-11', url: `${NEWS}/lundin-gold-announces-ceo-transition-celebrating-122817/` },
  { id: 4, titulo: 'Informes anuales 2021-2025 (guías anuales y resultados reales)', editor: 'Lundin Gold Inc.', tipo: 'Primaria', fecha: '2026-02-19', url: `${BASE}/111721/lug_2025_annual_report_final_23apr.pdf` },
  { id: 5, titulo: 'Informe anual 2025: control de Newmont y Nemesia, partes vinculadas', editor: 'Lundin Gold Inc.', tipo: 'Primaria', fecha: '2026-02-19', url: `${BASE}/111721/lug_2025_annual_report_final_23apr.pdf` },
  { id: 6, titulo: 'Notificación del SRI sobre el ajuste soberano de 2023', editor: 'Lundin Gold Inc. (nota de prensa)', tipo: 'Primaria', fecha: '2026-09-08', url: `${NEWS}/lundin-gold-receives-notice-of-assessment-regardin-122858/` },
  { id: 7, titulo: 'Informe del 2T 2026 (equipo directivo, consejo, acciones y opciones en circulación)', editor: 'Lundin Gold Inc.', tipo: 'Primaria', fecha: '2026-08-06', url: `${BASE}/111814/q2-2026-shareholder-report.pdf` },
  { id: 8, titulo: 'Informe anual 2023 y 2021 (guías 2021 y 2023 revisada)', editor: 'Lundin Gold Inc.', tipo: 'Primaria', fecha: '2024-02-22', url: `${BASE}/111106/lug-2023-annual-report-final-revised.pdf` },
  { id: 9, titulo: 'Guía 2026 y perspectiva 2026-2028', editor: 'Lundin Gold Inc. (nota de prensa)', tipo: 'Primaria', fecha: '2025-12-08', url: `${NEWS}/lundin-gold-provides-2026-guidance-and-strategic-t-122826/` },
];
const C = {
  _estado: 'Completa salvo operaciones de directivos: SEDI (antibot) y CanadianInsider (sin datos sin anuncios) no abren; queda como hueco.',
  directivos: {
    equipo: [
      { nombre: 'Jamie Beck', cargo: 'Presidente y consejero delegado', desde: '2025', participacion_pct: null, trayectoria: 'Consejero delegado de Filo Corp. seis años: descubrimiento de Filo del Sol y venta a BHP y Lundin Mining por ≈ 4.500 M USD en enero de 2025. En el grupo Lundin desde 2009; participó en la compra de Fruta del Norte y en la negociación fiscal con Ecuador [3].' },
      { nombre: 'Chester See', cargo: 'Director financiero', desde: null, participacion_pct: null, trayectoria: 'Director financiero durante el pago de la deuda del proyecto (2021-2024) y la política de dividendos; remuneración total de 1,11 M USD en 2025 [1].' },
      { nombre: 'Terry Smith', cargo: 'Director de operaciones (persona cualificada de reservas)', desde: null, participacion_pct: null, trayectoria: 'Responsable de la ampliación de la planta a 5.500 t/día (terminada en el 1T25) y del récord de 5.823 t/día del 3T26; firma las reservas [1, 7].' },
      { nombre: 'Jack Lundin', cargo: 'Presidente del consejo (no ejecutivo)', desde: '2022', participacion_pct: null, trayectoria: 'Miembro de la familia Lundin (Nemesia, 26,3 %); consejero desde 2022; 93,4 % de votos a favor en 2026 [1, 2].' },
      { nombre: 'Andre Oliveira', cargo: 'Vicepresidente de exploración', desde: null, participacion_pct: null, trayectoria: 'Dirige la campaña de 133.000 m de 2026 y los descubrimientos de FDNS, FDN East y los pórfidos [7].' },
      { nombre: 'Ron Hochstein', cargo: 'Consejero delegado saliente (2015-2025)', desde: '2015', participacion_pct: null, trayectoria: 'Construyó la mina y la llevó a producción comercial en 2020; salió el 7-nov-2025 a otro puesto del grupo Lundin [3].' },
    ],
    historial_guidance: [
      { anio: '2021', guia: '380.000-420.000 oz; AISC 770-830 USD/oz', real: '428.514 oz; AISC 762', cumplida: 'Sí' },
      { anio: '2023', guia: '425.000-475.000 oz (revisada al alza a 450.000-485.000)', real: '481.274 oz', cumplida: 'Sí' },
      { anio: '2024', guia: 'Producción y AISC de la guía 2024', real: '502.029 oz (por encima); AISC 875 USD/oz, en línea', cumplida: 'Sí' },
      { anio: '2025', guia: '475.000-525.000 oz (elevada durante el año); costes con oro a 2.500 USD', real: '498.315 oz; AISC 1.015 USD/oz con oro realizado a 3.594', cumplida: 'Sí' },
      { anio: '2026', guia: '475.000-525.000 oz; AISC 1.110-1.170 USD/oz a 4.000 USD', real: '392.472 oz en nueve meses (en camino)', cumplida: 'Parcial' },
    ],
    comentario: 'La dirección cumple: ha alcanzado o superado la guía de producción todos los años desde 2021 [8, 4, 9]. El cambio de consejero delegado (Hochstein → Beck, noviembre de 2025) fue ordenado y dentro del grupo Lundin, con el apoyo de los dos grandes accionistas [3]; Beck viene de la exploración (Filo), lo que encaja con la estrategia de crecer por exploración, y suma un riesgo: más gasto en exploración y en una ampliación sin presupuesto publicado. El equipo técnico (operaciones, exploración) sigue. No hay plan de sucesión publicado.',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Jack Lundin', cargo: 'Presidente', tipo: 'Independiente', desde: '2022', comisiones: '—' },
      { nombre: 'Jamie Beck', cargo: 'Consejero delegado', tipo: 'Ejecutivo', desde: '2025', comisiones: '—' },
      { nombre: 'Ashley Heppenstall', cargo: 'Consejero coordinador (Lead Director)', tipo: 'Independiente', desde: '2015', comisiones: 'Auditoría, Remuneración, Gobierno (presidente)' },
      { nombre: 'Ian Gibbs', cargo: 'Consejero', tipo: 'Independiente', desde: '2005', comisiones: 'Auditoría (presidente), Remuneración (presidente), Gobierno' },
      { nombre: 'Carmel Daniele', cargo: 'Consejera', tipo: 'Independiente', desde: '2015', comisiones: 'Remuneración' },
      { nombre: 'Gillian Davidson', cargo: 'Consejera', tipo: 'Independiente', desde: '2021', comisiones: 'Gobierno; HSES (presidenta)' },
      { nombre: 'Melissa Harmon', cargo: 'Consejera', tipo: 'Independiente', desde: '2023', comisiones: 'Auditoría (desde mayo de 2026); HSES' },
      { nombre: 'Scott Langley', cargo: 'Consejero (empleado de Newmont)', tipo: 'Dominical', desde: '2023', comisiones: '—' },
      { nombre: 'Erin Workman', cargo: 'Consejera (empleada de Newmont)', tipo: 'Dominical', desde: '2026', comisiones: '—' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: true, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: true, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: true, presidente_vinculado_control: true, cambios_cupula_24m: 1,
    voto_remuneracion_pct: 98.37, voto_remuneracion_contra_pct: 1.63, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 2.27, fijo: 0.53, variable_corto: 0.55, variable_largo: 1.12, ratio_salario_medio: null },
    remuneracion: 'Remuneración de 2025 del consejero delegado saliente (año completo): 2,27 M USD (salario 0,53; variable anual 0,55; acciones y opciones 1,12; otros 0,07); Beck cobró 0,61 M por dos meses [1]. El variable a largo plazo son PSU que dependen del TSR relativo frente a un grupo de mineras (los de 2022 se pagaron al 180 % por estar en el cuartil alto) y RSU y opciones [1]. El coste total de los directivos es el 0,4 % de los ingresos de 2025 [1]. Voto consultivo: 98,37 % a favor en 2026 [2]. Premia el TSR relativo, que en una minera depende sobre todo del oro y de la ley; no hay métricas de reservas ni de coste por onza publicadas en la parte larga.',
    accionistas: [
      { nombre: 'Newmont Corporation', pct: 31.88, tipo: 'Industrial (persona de control)', variacion: 'Estable; ejerce derechos antidilución (252.592 acciones en 2025) [1, 5]' },
      { nombre: 'Nemesia S.à r.l. (trusts de la familia Lundin)', pct: 26.26, tipo: 'Familia (persona de control)', variacion: 'Sin cambios conocidos [1]' },
      { nombre: 'Capital libre', pct: 41.86, tipo: 'Flotante', variacion: '—' },
    ],
    insiders: [],
    control_y_defensas: 'Newmont (31,9 %) y Nemesia, de la familia Lundin (26,3 %), son personas de control: juntas tienen el 58,1 % y deciden la junta [1, 5]. Newmont nombra dos consejeros (Langley y Workman, no independientes) y tiene derechos antidilución [1]. El presidente, Jack Lundin, es de la familia de control aunque el consejo lo califica de independiente [1]. Hay una sola clase de acciones. Operaciones vinculadas: el stream y el offtake con Newmont (recomprados en 2024 por 330 M), alquiler de oficinas a una empresa ligada a un consejero (0,9 M en 2025) y el stream de plata con LunR, sociedad del entorno Lundin repartida a los accionistas [5, 1]. El propio informe anual avisa de que el control puede desanimar una OPA con prima [5].',
    alertas: [
      'Reclamación del SRI de 154 M USD por el ajuste soberano de 2023, recurrida y sin provisión [6].',
      'Accionistas de control (Newmont y familia Lundin, 58,1 %): el minoritario no decide y una OPA con prima es improbable sin ellos [1, 5].',
      'Cambio de consejero delegado en noviembre de 2025 [3].',
    ],
    confianza: 'Media',
  },
  huecos: [
    { seccion: 'gobierno', campo: 'insiders', tipo: 'Complemento', intentos: '1) SEDI (bloqueo antibot); 2) CanadianInsider.com (la tabla no carga sin anuncios); 3) Simply Wall St, propiedad (HTTP 403) y búsqueda de noticias de compras y ventas de directivos', decision: 'Omitido' },
    { seccion: 'directivos', campo: 'participacion_pct', tipo: 'Complemento', intentos: '1) Circular 2026 (participaciones de los consejeros en tablas por persona, sin porcentaje claro); 2) AIF 2025; 3) Yahoo (participación agregada de insiders 58,5 %, que incluye a Newmont y Nemesia)', decision: 'Omitido' },
  ],
  fuentes: fC,
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de LUG.TO, XIU.TO (S&P/TSX 60) y XGD.TO (S&P/TSX Global Gold), con dividendos', editor: 'Yahoo Finance (herramientas/bolsa.mjs)', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/LUG.TO/history' },
  { id: 2, titulo: 'Yahoo Finance quoteSummary de LUG.TO: consenso de BPA y ventas (en CAD), recomendaciones y objetivos', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/LUG.TO/analysis' },
  { id: 3, titulo: 'Lundin Gold Inc.: estimaciones anuales 2024-2028 (ventas, EBITDA, EBIT, beneficio, BPA, dividendo, en CAD); 13 analistas, objetivo medio 95,45 CAD', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-19', url: 'https://www.marketscreener.com/quote/stock/LUNDIN-GOLD-INC-1410059/finances/' },
  { id: 4, titulo: 'Yahoo Finance quoteSummary de los comparables (precio, capitalización, caja, deuda, EBITDA, ventas, FCF, BPA estimado)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/' },
  { id: 5, titulo: 'Implied ERP by month (ERPbymonth.xlsx): octubre de 2026, 4,20 % (T12m with sustainable payout)', editor: 'A. Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 6, titulo: 'Daily Treasury Par Yield Curve Rates 2026: 10 años 5,15 % el 19-oct-2026', editor: 'U.S. Department of the Treasury', tipo: 'Primaria', fecha: '2026-10-19', url: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/daily-treasury-rates.csv/2026/all?type=daily_treasury_yield_curve&field_tdr_date_value=2026' },
  { id: 7, titulo: 'Betas by sector, global (betaGlobal.xls, enero de 2026): Precious Metals, beta sin deuda corregida por caja 1,37; media 2020-2024 1,11', editor: 'A. Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-01', url: 'https://pages.stern.nyu.edu/~adamodar/pc/datasets/betaGlobal.xls' },
  { id: 8, titulo: 'Country Risk Premiums (ctryprem.xlsx): Ecuador Caa3, diferencial de impago 8,5 %, prima de riesgo país 12,9 %', editor: 'A. Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-01', url: 'https://pages.stern.nyu.edu/~adamodar/pc/datasets/ctryprem.xlsx' },
  { id: 9, titulo: 'Lundin Gold (TSE:LUG) stock jumps 8.6%: cambios de objetivo de CIBC (131), Desjardins (100), Jefferies (88) y RBC (89) en julio-septiembre de 2026', editor: 'MarketBeat', tipo: 'Analistas', fecha: '2026-10-09', url: 'https://www.marketbeat.com/instant-alerts/price-lundin-gold-tse-lug-stock-jumps-86-heres-why-2026-10-09/' },
  { id: 10, titulo: 'Valet API, FXUSDCAD (tipos diarios; cierres de 2018-2025 y 19-oct-2026: 1,4097)', editor: 'Banco de Canadá', tipo: 'Primaria', fecha: '2026-10-19', url: 'https://www.bankofcanada.ca/valet/observations/FXUSDCAD/json' },
  { id: 11, titulo: 'Producción del 3T 2026 y fecha de resultados (4-nov-2026)', editor: 'Lundin Gold Inc. (nota de prensa)', tipo: 'Primaria', fecha: '2026-10-08', url: `${NEWS}/lundin-gold-reports-q3-2026-production-of-153-736-122861/` },
  { id: 12, titulo: 'Guía 2026 y perspectiva 2026-2028', editor: 'Lundin Gold Inc. (nota de prensa)', tipo: 'Primaria', fecha: '2025-12-08', url: `${NEWS}/lundin-gold-provides-2026-guidance-and-strategic-t-122826/` },
  { id: 13, titulo: 'Share capital update: 241.788.662 acciones a 30-sep-2026', editor: 'Lundin Gold Inc. (nota de prensa)', tipo: 'Primaria', fecha: '2026-09-30', url: `${NEWS}/lundin-gold-share-capital-and-voting-rights-update-122860/` },
  { id: 14, titulo: 'Northern Star to buy De Grey in deal valued at A$5 billion (prima del 37,1 %)', editor: 'BNN Bloomberg', tipo: 'Prensa', fecha: '2024-12-01', url: 'https://bnnbloomberg.ca/business/international/2024/12/01/northern-star-to-buy-de-grey-in-deal-valued-at-a5-billion' },
  { id: 15, titulo: 'Mining M&A in 2024: gold dominates (AngloGold Ashanti–Centamin, 2.480 M USD)', editor: 'S&P Global Market Intelligence', tipo: 'Sectorial', fecha: '2025-02', url: 'https://spglobal.com/market-intelligence/en/news-insights/research/mining-mna-in-2024-gold-dominates-mna-space-for-2nd-consecutive-year' },
  { id: 16, titulo: 'A glittering year for M&A in the gold sector (Gold Fields–Gold Road, ≈ 3.700 M AUD)', editor: 'Corrs Chambers Westgarth', tipo: 'Sectorial', fecha: '2025-12', url: 'https://corrs.com.au/insights/a-glittering-year-for-m-a-in-the-gold-sector' },
  { id: 17, titulo: 'Globe says TD Cowen cuts Lundin Gold to hold (17-jul-2025) e historial de recomendaciones de 2025', editor: 'Stockwatch', tipo: 'Prensa', fecha: '2025-07-17', url: 'https://www.stockwatch.com/News/Item/Z-C!LUG-3710639/C/LUG' },
  { id: 18, titulo: 'Notas de prensa de Lundin Gold de 2025-2026 (dividendos, reservas, stream de plata, SRI, pórfidos, producción)', editor: 'Lundin Gold Inc.', tipo: 'Primaria', fecha: '2026-10-08', url: 'https://lundingold.com/news/2026/' },
  { id: 19, titulo: 'Rastreador de noticias del repositorio (herramientas/noticias.mjs --meses 12): titulares de 12 meses sobre LUG', editor: 'Repositorio de análisis', tipo: 'Prensa', fecha: '2026-10-20', url: 'informes/lundin-gold-2026-10-20/notas/noticias.txt' },
];
// Comparables en USD: capitalización = precio × acciones, en la divisa de cotización, pasada a USD con el cierre del 19-oct
// (CAD 1,4097 por USD [10]; GBP ≈ 1,34 USD, solo para Endeavour). Valor empresa = capitalización + deuda − caja (Yahoo, en USD).
// PER de los próximos 12 meses = precio ÷ (0,2 × BPA 2026e + 0,8 × BPA 2027e), en la divisa en que Yahoo da el consenso
// (CAD para las de Toronto; USD para el resto).
const GBPUSD = 1.34;
const fx = (d) => (d.divisa === 'CAD' ? 1 / USDCAD.corte : d.divisa === 'GBp' ? GBPUSD : 1); // Yahoo da la capitalización de Londres en GBP (el precio, en peniques)
const compsT = [['Agnico Eagle', 'AEM', 'CA'], ['Newmont', 'NEM', 'US'], ['Barrick Mining', 'B', 'CA'], ['Kinross Gold', 'KGC', 'CA'], ['Alamos Gold', 'AGI', 'CA'], ['Endeavour Mining', 'EDV.L', 'GB'], ['Torex Gold', 'TXG.TO', 'CA'], ['OceanaGold', 'OGC.TO', 'CA'], ['Gold Fields', 'GFI', 'ZA']];
const comps = compsT.map(([n, t, p]) => {
  const d = YC[t];
  const cap = d.cap * fx(d) / 1e6;
  const ev = cap + (d.deuda - d.caja) / 1e6;
  const t0 = d.trend.find((x) => x.p === '0y'), t1 = d.trend.find((x) => x.p === '+1y');
  const bpaNtm = 0.2 * t0.bpa + 0.8 * t1.bpa;
  const pxBpa = t === 'EDV.L' ? d.precio * GBPUSD / 100 : d.precio; // Endeavour: consenso en USD, cotiza en peniques
  return {
    nombre: n, ticker: t, pais: p, capitalizacion: Math.round(cap), ev_ventas: r2(ev / (d.ventas / 1e6)), ev_ebitda_ltm: r1(ev / (d.ebitda / 1e6)), ev_ebitda_ntm: null,
    per_ntm: r1(pxBpa / bpaNtm), crecimiento_pct: t1.crec != null && t !== 'GFI' ? r1(t1.crec * 100) : null, margen_ebitda_pct: r1(d.margen_ebitda * 100), roic_pct: null,
    dn_ebitda: r1((d.deuda - d.caja) / d.ebitda), fcf_yield_pct: r1(d.fcf / 1e6 / cap * 100),
  };
});
const pers = comps.map((c) => c.per_ntm).sort((a, b) => a - b);
const perMed = pers.length % 2 ? pers[(pers.length - 1) / 2] : r1((pers[pers.length / 2 - 1] + pers[pers.length / 2]) / 2);
const precioUsd = r2(91.25 / USDCAD.corte);
const cierres = B.cierres_ejercicio.filter((c) => +c.anio >= 2021);
const D = {
  _estado: 'Completa. Precio, rangos y cierres en CAD de bolsa.mjs pasados a USD con el Banco de Canadá. Consenso: MarketScreener (CAD, pasado a USD al 1,4097) y Yahoo (BPA en CAD). Sin múltiplos de transacciones publicados.',
  _per_mediana_comparables: perMed,
  identificacion: {
    nombre: 'Lundin Gold Inc.', nombre_corto: 'Lundin Gold', ticker: 'LUG', isin: 'CA5503711080', mercado: 'Toronto Stock Exchange (también Nasdaq Estocolmo y OTCQX: LUGDF)', indice_referencia: 'S&P/TSX Composite',
    pais: 'Canadá (mina en Ecuador)', pais_iso: 'CA', sector: 'Materiales', industria: 'Metales y minería (oro)', sede: 'Vancouver (Canadá)', fundacion: '1986', empleados: 2013, web: 'www.lundingold.com',
    precio: precioUsd, fecha_precio: '2026-10-19', acciones: 242.8, capitalizacion_publicada: Math.round(Y['LUG.TO'].cap / USDCAD.corte / 1e6), free_float_pct: 41.9,
    max_52s: r2(B.identificacion.max_52s / USDCAD.corte), min_52s: r2(B.identificacion.min_52s / USDCAD.corte),
    volumen_medio_diario: `≈ ${String(B.volumen_3m.importe_dia_millones).replace('.', ',')} M CAD/día en Toronto (3 meses) [1]`, proximos_resultados: '2026-11-04',
  },
  consenso: {
    guidance: 'Guía 2026 (8-dic-2025, mantenida el 6-ago y el 8-oct-2026): 475.000-525.000 onzas a 5.500 t/día y 8,3 g/t; coste en efectivo de 900-960 USD/oz y AISC de 1.110-1.170 a 4.000 USD de oro; inversión de mantenimiento de 75-90 M y exploración de 85 M [12, 11]. Perspectiva 2027-2028: 475.000-525.000 onzas cada año, AISC de 1.110-1.180 (2027) y 1.060-1.170 (2028) y mantenimiento de 80-95 M y 50-85 M [12]. Decisión conjunta sobre FDNS y la ampliación de la planta a finales de 2026, sin cifras de inversión todavía [12].',
    estimaciones: [
      { periodo: '2026e', ingresos: r1(3229 / USDCAD.corte), ebitda: r1(2297 / USDCAD.corte), ebit: r1(2150 / USDCAD.corte), bpa: r2(6.076 / USDCAD.corte), dpa: r2(5.355 / USDCAD.corte), fuente: 'MarketScreener (CAD pasados a USD al 1,4097) [3]' },
      { periodo: '2027e', ingresos: r1(3474 / USDCAD.corte), ebitda: r1(2402 / USDCAD.corte), ebit: r1(2339 / USDCAD.corte), bpa: r2(6.064 / USDCAD.corte), dpa: r2(4.595 / USDCAD.corte), fuente: 'MarketScreener (CAD pasados a USD al 1,4097) [3]' },
      { periodo: '2028e', ingresos: r1(3447 / USDCAD.corte), ebitda: r1(2481 / USDCAD.corte), ebit: r1(2338 / USDCAD.corte), bpa: r2(6.335 / USDCAD.corte), dpa: r2(4.539 / USDCAD.corte), fuente: 'MarketScreener (CAD pasados a USD al 1,4097) [3]' },
    ],
    recomendaciones: { n_analistas: 13, comprar: 3, mantener: 9, vender: 1, po_medio: r2(95.45 / USDCAD.corte), po_min: r2(82 / USDCAD.corte), po_max: r2(104 / USDCAD.corte) },
    revisiones: 'Las estimaciones bajan con el oro: el BPA de 2027 de Yahoo pasó de 6,37 CAD hace 90 días a 6,02 hace 30 y 5,84 hoy (−8 %), y el de 2026 de 5,99 a 5,75 (−4 %) [2]. Entre julio y septiembre de 2026 recortaron objetivo Jefferies (90 → 88 CAD), Desjardins (105 → 100, comprar), CIBC (137 → 131) y RBC (98 → 89) [9]; ATB Cormark subió a «outperform» en mayo [9] y UBS empezó con «comprar» en mayo. Recomendaciones de Yahoo: 1 compra fuerte, 2 compras, 9 mantener y 1 vender; MarketScreener da «mantener» con 13 analistas y objetivo medio de 95,45 CAD [2, 3]. Dos fuentes de estimaciones (MarketScreener y Yahoo); se usa MarketScreener porque da tres años y el dividendo.',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    ...B.bolsa,
    posicion_corta_pct: r2(1192871 / 241788662 * 100),
    contexto: {
      movimiento: { fecha: '2026-10-19', var_1m_pct: 0, var_3m_pct: 18.8, var_6m_pct: -18, var_12m_pct: -11.5, dist_max_52s_pct: -25.1, dist_min_52s_pct: 24.8, dist_max_historico_pct: -25.1, tendencia: 'bajista', volatilidad_60d_pct: 54, avisos: [] },
      movimientos_fuertes: [
        { periodo: 'ene 2026', var_pct: -13.9, causa: 'Desplome del oro del 30-ene-2026 (−10,8 % en el día tras el máximo de 5.318 USD); cayó todo el sector [1, 19].', veredicto: 'no cambia', condicion: null },
        { periodo: 'feb-may 2026', var_pct: -27.1, causa: 'Corrección del oro y de las mineras hasta el 19-may (mayor caída de un mes de la herramienta); el 21-abr bajaron el índice de oro un 5,8 % y el oro un 2,3 %. Sin hecho propio negativo: la producción del 1T fue según guía [1, 18].', veredicto: 'no cambia', condicion: null },
        { periodo: 'may-ago 2026', var_pct: 34.8, causa: 'Rebote del oro hasta ≈ 4.700 USD y resultados del 2T (6-ago) con dividendo de 1,08 USD y descubrimientos de pórfidos y FDNS [18, 19].', veredicto: 'no cambia', condicion: null },
        { periodo: 'oct 2026', var_pct: 10.5, causa: 'Producción récord del 3T (153.736 onzas, 8-oct) y subida del oro: +10,5 % el 13-oct y +5,4 % el 15-oct [11, 19].', veredicto: 'no cambia', condicion: null },
      ],
      noticias: [
        { fecha: '2026-09-08', tipo: 'regulatorio', hecho: 'El SRI de Ecuador notifica una liquidación de 154 M USD (73 + 81 de recargos) por el ajuste soberano de 2023; la empresa la recurre y no la provisiona. Pesa ≈ 1 % de la capitalización; el riesgo es que se repita en 2024-2025 [18].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-08', tipo: 'resultados', hecho: 'Producción del 3T de 153.736 onzas (récord) y 392.472 en nueve meses: guía 2026 de 475.000-525.000 onzas en la parte alta [11].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-07-21', tipo: 'otras', hecho: 'Dos pórfidos de cobre y oro nuevos (siete en el distrito) y primer recurso de Sandia previsto para principios de 2027 [18].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-06-12', tipo: 'recompra / dividendo', hecho: 'Reparto de LunR Royalties (stream de plata) a los accionistas como dividendo en especie (≈ 3,09 USD por acción) [18].', veredicto: 'no cambia', condicion: null },
      ],
      proximos_resultados: '2026-11-04',
      veredicto: 'no cambia',
      condicion: null,
      comentario: 'La acción está un 25 % por debajo de su máximo de 52 semanas (y de 5 años) y un 25 % por encima del mínimo, en tendencia bajista (−3 % bajo la media de 200 sesiones) y sin avisos P de la herramienta. Todos los movimientos fuertes de 12 meses los explica el oro, que la acción amplifica ≈ 2 veces, más la producción récord del 3T [1, 11]. No hay colocaciones, ampliaciones ni decisiones con fecha que puedan mover el precio más de un 5 % en contra: la reclamación del SRI va por la vía de recurso, sin fecha. Los resultados del 4-nov no retrasan nada (regla 11). Veredicto: no cambia.',
    },
    comentario: 'Rentabilidades en CAD con dividendos. La acción multiplicó por 12 en 2021-2025 (TSR de 1.208 sobre 100) frente a 182 del S&P/TSX [1]: subió un 291 % en 2025 con el oro (de 2.388 a 3.300 USD/oz de media) y el paso a repartir casi todo el flujo libre. En 2026 va un −11,2 % frente al +16,3 % del TSX 60 y el +7,5 % del índice de oro: el oro bajó de 5.318 USD (enero) a 4.160, y la acción amplifica el oro ≈ 2 veces (beta frente al TSX 60 de 1,32) [1]. Posición corta del 0,49 % de las acciones (1,19 M a 30-sep-2026, CanadianInsider).',
  },
  multiplos_historicos: {
    serie: cierres.map((c) => ({ anio: c.anio, precio_cierre: r2(c.precio_cierre / USDCAD[c.anio]), precio_cierre_cad: c.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    comentario: 'Cierres de Toronto en CAD pasados a USD con el tipo del Banco de Canadá de cada 31 de diciembre [1, 10]. El PER de los últimos 12 meses saltó de 11,5 veces en 2024 a 24,0 en 2025 porque el precio se multiplicó por 3,7 y el beneficio por 1,9: al cierre de 2025 el mercado ya descontaba el oro de 2026. El PER sobre el beneficio del año siguiente (la base de la regla a 12 meses) va de 6,1 (2024) a 17,8 (2025). La prima frente a la historia la explican la caja neta, el reparto del 100 % del flujo libre y los descubrimientos (FDNS, FDN East, pórfidos); el riesgo, que el precio del oro de hoy no se mantenga.',
    confianza: 'Media',
  },
  comparables: {
    criterio: `Productoras de oro cotizadas con datos completos en Yahoo: grandes (Agnico Eagle, Newmont, Barrick, Gold Fields), medianas (Kinross, Alamos, Endeavour, OceanaGold) y de una mina principal en un país (Torex, México). Fuera: DPM Metals (estimaciones incoherentes en Yahoo), AngloGold y Equinox (repetirían perfiles), las de royalties (Franco-Nevada, Wheaton: otro modelo) y las de cobre. Todas en USD al cierre del 19-oct-2026; PER de los próximos 12 meses en la divisa del consenso [4]. Mediana del PER: ${String(perMed).replace('.', ',')} veces.`,
    empresas: comps,
    comentario: `Lundin Gold cotiza a ≈ 16x el BPA de los próximos 12 meses con el oro a 4.150 USD, frente a una mediana de ${String(perMed).replace('.', ',')}x de las productoras de oro [4]. La prima la justifican la ley (≈ 8 g/t, de las más altas del mundo), el AISC bajo, la caja neta y el reparto del 100 % del flujo libre; la penalizan una sola mina en un solo país (Ecuador, Caa3) y una vida de reservas de ≈ 11-12 años. Torex (una mina principal en México) y OceanaGold son las más parecidas por concentración. El EV/EBITDA de los últimos 12 meses está más alineado con el grupo porque el de Lundin Gold incluye el oro alto del 1S26.`,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2024-12', objetivo: 'De Grey Mining (Hemi, Australia; proyecto sin producción)', comprador: 'Northern Star Resources', ev: null, ev_ventas: null, ev_ebitda: null, prima_pct: 37.1, excluir: false, comentario: '≈ 5.000 M AUD; sin EBITDA (proyecto) [14].' },
      { fecha: '2024-09', objetivo: 'Centamin (Sukari, Egipto)', comprador: 'AngloGold Ashanti', ev: 2480, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Valor de la operación de 2.480 M USD; múltiplo no publicado en la fuente [15].' },
      { fecha: '2025-05', objetivo: 'Gold Road Resources (50 % de Gruyere, Australia)', comprador: 'Gold Fields', ev: null, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '≈ 3.700 M AUD; múltiplo no publicado en la fuente [16].' },
      { fecha: '2014-12', objetivo: 'Fruta del Norte (proyecto)', comprador: 'Lundin Gold (Fortress Minerals)', ev: 240, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Compra a Kinross por 240 M USD; proyecto sin producción [18].' },
    ],
    comentario: 'Las compras de minas de oro se pagan por onzas y por valor neto de los activos, no por EBITDA: ninguna de las fuentes publica el múltiplo. Sirven para el control: con Newmont (31,9 %) y la familia Lundin (26,3 %) dentro, una OPA sobre Lundin Gold solo puede venir de ellos o con su acuerdo, y Newmont está vendiendo activos, no comprando [14, 15, 16]. Las transacciones no pesan en la valoración.',
    confianza: 'Baja',
  },
  huecos: [
    { seccion: 'transacciones', campo: 'ev_ebitda', tipo: 'Complemento', intentos: '1) Búsqueda de múltiplos EV/EBITDA de las compras de oro de 2024-2026; 2) Fuentes sectoriales (S&P Global, Corrs: solo importes); 3) Prensa (BNN Bloomberg: importe y prima)', decision: 'Omitido' },
    { seccion: 'comparables', campo: 'roic_pct y ev_ebitda_ntm', tipo: 'Complemento', intentos: '1) Yahoo quoteSummary (sin ROIC ni EBITDA estimado); 2) MarketScreener (solo la ficha de Lundin Gold abre); 3) Stock Analysis (no consultado por presupuesto)', decision: 'Omitido' },
  ],
  fuentes: fD,
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Stocktwits, flujo de mensajes de $LUGDF (ago-2025 a sep-2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-20', url: 'https://api.stocktwits.com/api/2/streams/symbol/LUGDF.json' },
  { id: 2, titulo: 'Seeking Alpha: titulares y artículos sobre Lundin Gold (jul-oct 2026: «Fair Value, Resource Conversion, And Improved Operations Offer Upside», «The Scarcity Value Of A Self-Funding Tier 1 Mine»)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-09-28', url: 'https://seekingalpha.com/api/sa/combined/LUGDF.xml' },
  { id: 3, titulo: 'Titulares de prensa financiera de 12 meses (Kalkine, Simply Wall St, Mining.com, BNamericas, Kitco) del rastreador de noticias', editor: 'Repositorio de análisis (noticias.mjs)', tipo: 'Foros y redes', fecha: '2026-10-20', url: 'informes/lundin-gold-2026-10-20/notas/noticias.txt' },
];
const E = {
  _estado: 'Completa con poco debate: Stocktwits (30 mensajes en 14 meses, 5 desde julio), titulares de Seeking Alpha y de la prensa financiera. Reddit y Stockhouse no abren.',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Empeora',
    revisadas: [
      { plataforma: 'Stocktwits ($LUGDF)', fecha: '2026-09', n_comentarios: 30, tono: 'Dividido', resumen: 'Entusiasmo en 2025 («la mina verde entre las rojas», +198 % en un año) y, en 2026, menos mensajes: uno celebra un +12,5 % en agosto y otro atribuye la caída del 15 % a dudas sobre el crecimiento y el oro [1].' },
      { plataforma: 'Seeking Alpha (artículos y titulares)', fecha: '2026-09', n_comentarios: 8, tono: 'Positivo', resumen: 'Dos artículos alcistas en tres meses (valor razonable con conversión de recursos; escasez de una mina de primer nivel que se financia sola) y noticias de resultados y dividendos [2].' },
      { plataforma: 'Prensa financiera y portales (Kalkine, Simply Wall St, Mining.com)', fecha: '2026-10', n_comentarios: 25, tono: 'Dividido', resumen: '«Presión vendedora persistente» y la reclamación fiscal de Ecuador frente a la producción récord del 3T y el dividendo del 6-7 % [3].' },
    ],
    temas: [
      { tema: 'Dividendo del 6-7 % y caja', postura: 'Alcista', peso: 'Alto', contraste: 'Correcto: el dividendo de 2026 se paga con el 100 % del flujo libre normalizado; baja con el oro (de 1,21 a 1,08 USD por trimestre) [2, 3].' },
      { tema: 'Producción récord y descubrimientos (FDNS, pórfidos)', postura: 'Alcista', peso: 'Medio', contraste: 'Los datos lo apoyan (153.736 onzas en el 3T26; 7 pórfidos), pero la guía 2027-2028 sigue plana en 475.000-525.000 onzas [3].' },
      { tema: 'Precio del oro', postura: 'Dividida', peso: 'Alto', contraste: 'Es la variable que decide: la acción ha subido y bajado el doble que el oro en 2026 [1].' },
      { tema: 'Ecuador y la reclamación del SRI', postura: 'Bajista', peso: 'Medio', contraste: 'Riesgo real (154 M por 2023, sin provisión), pequeño hoy frente a la capitalización (≈ 1 %); lo que importa es si se repite en 2024-2025 [3].' },
    ],
    lectura: 'El sentimiento ha pasado del entusiasmo de 2025 a la duda: menos mensajes y titulares de «presión vendedora», con el oro un 22 % por debajo del máximo de enero y la acción un 25 % por debajo del suyo [1, 3]. No hay capitulación: los artículos de Seeking Alpha siguen alcistas y el dividendo sostiene el interés. El sentimiento no aporta un riesgo que el informe no tenga (oro, Ecuador, mina única) y coincide con los analistas, mayoría en «mantener». Opiniones, no datos: ninguna cifra sale de aquí.',
    confianza: 'Baja',
  },
  huecos: [],
  fuentes: fE,
};
guarda('E', E);
console.log('Notas A-E escritas. Precio USD', precioUsd, 'Mediana PER comparables:', perMed, comps.map((x) => `${x.ticker} ${x.per_ntm} cap ${x.capitalizacion} ev/ebitda ${x.ev_ebitda_ltm}`).join(' | '));
