// Notas A-E de Hammond Power Solutions Inc. (TSX: HPS.A; Yahoo HPS-A.TO). Corte 2026-10-19 (lunes; la sesión de Toronto
// no había cerrado al hacer el análisis: último cierre, 16-oct-2026). Cifras en millones de CAD salvo que se diga otra cosa.
// Fuentes: informes anuales 2021-2025 y trimestrales de la empresa (SEDAR+ da 403; los mismos PDF en la web de inversores),
// presentaciones, comunicados, Yahoo Finance, MarketScreener, MarketBeat, Banco de Canadá, Stockchase, Stocktwits.
// Ejecutar: node informes/hammond-power-2026-10-19/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const lee = (f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
const IR = 'https://americas.hammondpowersolutions.com/-/media/Project/HPS/shared/Investor-Relations';
const bolsa = lee('bolsa.json');
const comps = lee('comparables-yahoo.json');
const mov = lee('movimiento.json')['HPS-A.TO'];
const k = (x) => Math.round(x) / 1000; // miles → millones

// ================================================================ A. Cuentas
const fA = [
  { id: 1, titulo: 'Annual Report 2025: MD&A, estados consolidados auditados 2025 y 2024 y notas (ventas por geografía, arrendamientos, impuestos, pagos en acciones, partes vinculadas, segmento único)', editor: 'Hammond Power Solutions Inc.', tipo: 'Primaria', fecha: '2026-03-19', url: `${IR}/2025-Annual-Report-and-Q4-2024-PR/2025-HPS-Annual-Report-031926-FP.pdf` },
  { id: 2, titulo: 'Annual Report 2024: estados consolidados 2024 y 2023 (pago en acciones separado) y compra de Micron (nota 30)', editor: 'Hammond Power Solutions Inc.', tipo: 'Primaria', fecha: '2025-03-20', url: `${IR}/2024-Annual-Report---Hammond-Power-Solutions-Inc---March-20-2025.pdf` },
  { id: 3, titulo: 'Annual Report 2023: estados consolidados 2023 y 2022 y ventas por geografía reexpresadas', editor: 'Hammond Power Solutions Inc.', tipo: 'Primaria', fecha: '2024-03', url: `${IR}/HPS-ANNUAL-REPORT-2023---FINAL.pdf` },
  { id: 4, titulo: 'Annual Report 2022: estados 2022 y 2021 y separación de la empresa conjunta Corefficient', editor: 'Hammond Power Solutions Inc.', tipo: 'Primaria', fecha: '2023-03', url: `${IR}/HPS-Annual-Report-2022_FINAL.pdf` },
  { id: 5, titulo: 'Annual Report 2021: estados 2021 y 2020 y compra de Mesta Electronics', editor: 'Hammond Power Solutions Inc.', tipo: 'Primaria', fecha: '2022-03', url: `${IR}/HPS-Annual-Report-FINAL-2021.pdf` },
  { id: 6, titulo: 'Q2 Report 2026: MD&A y estados intermedios a 27-jun-2026 (balance, flujos, pagos en acciones, cierre de AEG como hecho posterior)', editor: 'Hammond Power Solutions Inc.', tipo: 'Primaria', fecha: '2026-07-30', url: `${IR}/2026-YEAR-ITEMS/Q2-2026/2026-HPS-Q2-Report_FINAL.pdf` },
  { id: 7, titulo: 'Q1 Report 2026: MD&A y estados intermedios a 28-mar-2026', editor: 'Hammond Power Solutions Inc.', tipo: 'Primaria', fecha: '2026-05-05', url: `${IR}/2026-YEAR-ITEMS/Q1-2026/2026-HPS-Q1-Report_FINAL.pdf` },
  { id: 8, titulo: 'Q3 Report 2025: MD&A y estados intermedios', editor: 'Hammond Power Solutions Inc.', tipo: 'Primaria', fecha: '2025-10-23', url: `${IR}/HPS-Q3-2025-Report---102325-FP.pdf` },
  { id: 9, titulo: 'Q2 Report 2025 y Q1 Report 2025: EBITDA ajustado trimestral', editor: 'Hammond Power Solutions Inc.', tipo: 'Primaria', fecha: '2025-07-31', url: `${IR}/2025-HPS-Q2-Report.pdf` },
  { id: 10, titulo: 'Q3 Report 2024: ventas trimestrales de 2023 y 2024 y EBITDA ajustado', editor: 'Hammond Power Solutions Inc.', tipo: 'Primaria', fecha: '2024-10', url: `${IR}/HPS-Q3-2024-REPORT.pdf` },
  { id: 11, titulo: 'Investor presentation Q2 2026 (canales, mezcla de clientes, cuota y tamaño de mercado, ventas y EBITDA ajustado 2019-2026)', editor: 'Hammond Power Solutions Inc.', tipo: 'Primaria', fecha: '2026-08', url: `${IR}/2026-YEAR-ITEMS/Q2-2026/Hammond-Aug-2026---Q2-IR-Presentation.pdf` },
  { id: 12, titulo: 'Accelerating Our Power Quality Platform: presentación de la compra de AEG Power Solutions (365 M CAD de valor empresa, ventas proforma, apalancamiento 2,7x)', editor: 'Hammond Power Solutions Inc.', tipo: 'Primaria', fecha: '2026-02-17', url: `${IR}/HPS-AEG-INVESTOR-PRESENTATION.pdf` },
  { id: 13, titulo: 'Earnings call transcript: Hammond Power Solutions tops Q2 2026 forecasts (conferencia del 31-jul-2026)', editor: 'Investing.com', tipo: 'Prensa', fecha: '2026-07-31', url: 'https://www.investing.com/news/transcripts/earnings-call-transcript-hammond-power-solutions-tops-q2-2026-forecasts-93CH-4828577' },
];

// Ejercicios reales 2021-2025 (NIIF, informes anuales [A1-A5]). gastos_generales = venta y distribución + administración (con pagos en acciones).
// EBITDA = resultado de explotación + amortizaciones (incluidos derechos de uso). no_recurrentes_en_ebitda: exceso del pago en acciones (liquidado en
// caja y revalorizado con la cotización) sobre un nivel normal del 1 % de las ventas (estimación propia; se explica en financieros.ajustes).
const cuenta = [
  { periodo: '2021', ingresos: 380.202, coste_ventas: 277.771, gastos_generales: 79.28, ebitda: 30.714, amortizaciones: 7.563, ebit: 23.151, resultado_financiero: -1.901, bai: 21.25, impuestos: 6.074, minoritarios: 0, beneficio_neto: 15.176, gastos_financieros: 1.301, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 1.28, dpa: 0.34, dpa_extraordinario: 0, acciones_diluidas: 11.825 },
  { periodo: '2022', ingresos: 558.464, coste_ventas: 393.279, gastos_generales: 105.744, ebitda: 70.422, amortizaciones: 10.981, ebit: 59.441, resultado_financiero: -2.272, bai: 57.169, impuestos: 12.341, minoritarios: 0, beneficio_neto: 44.828, gastos_financieros: 1.596, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 3.77, dpa: 0.385, dpa_extraordinario: 0, acciones_diluidas: 11.876 },
  { periodo: '2023', ingresos: 710.064, coste_ventas: 479.053, gastos_generales: 144.29, ebitda: 97.402, amortizaciones: 10.681, ebit: 86.721, resultado_financiero: -2.727, bai: 83.994, impuestos: 20.595, minoritarios: 0, beneficio_neto: 63.399, gastos_financieros: 1.32, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 12.853, bpa: 5.33, dpa: 0.55, dpa_extraordinario: 0, acciones_diluidas: 11.905 },
  { periodo: '2024', ingresos: 788.34, coste_ventas: 530.062, gastos_generales: 159.518, ebitda: 113.465, amortizaciones: 14.705, ebit: 98.76, resultado_financiero: -1.838, bai: 96.922, impuestos: 25.391, minoritarios: 0, beneficio_neto: 71.531, gastos_financieros: 1.246, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 9.209, bpa: 6.01, dpa: 0.975, dpa_extraordinario: 0, acciones_diluidas: 11.905 },
  { periodo: '2025', ingresos: 898.255, coste_ventas: 625.936, gastos_generales: 168.3, ebitda: 124.69, amortizaciones: 20.671, ebit: 104.019, resultado_financiero: -7.123, bai: 96.896, impuestos: 24.655, minoritarios: 0, beneficio_neto: 72.241, gastos_financieros: 3.876, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 6.07, dpa: 1.1, dpa_extraordinario: 0, acciones_diluidas: 11.905 },
];
// LTM a 27-jun-2026 = 2025 − 1S25 + 1S26 [A1, A6]. Pago en acciones LTM 40,27 M (8,78 + 1,75 + 29,74): exceso sobre el 1 % de las ventas = 29,65 M.
const ltm = { periodo: 'LTM jun-26', fecha_fin: '2026-06-27', ingresos: 1062.075, ebitda: 123.178, ebit: 99.125, beneficio_neto: 61.602, bpa: 5.17, dpa: 1.1, dpa_extraordinario: 0, fcf: -7.081, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 29.645 };

const balanceH = [
  { periodo: '2021', activo_total: 235.099, activo_corriente: 159.698, pasivo_corriente: 101.993, pasivo_total: 109.097, fondo_comercio: 12.216, intangibles: 10.503, inmovilizado_material: 30.96, existencias: 62.467, clientes: 72.004, proveedores: 75.76, activos_contrato: null, pasivos_contrato: null, caja: 20.905, deuda_financiera: 19.267, arrendamientos: 7.98, patrimonio_neto: 126.002, minoritarios: 0, reservas: 106.575 },
  { periodo: '2022', activo_total: 302.673, activo_corriente: 230.123, pasivo_corriente: 117.678, pasivo_total: 125.779, fondo_comercio: 12.024, intangibles: 7.65, inmovilizado_material: 41.742, existencias: 106.353, clientes: 86.701, proveedores: 92.301, activos_contrato: null, pasivos_contrato: 10.607, caja: 28.126, deuda_financiera: 6.154, arrendamientos: 8.593, patrimonio_neto: 176.894, minoritarios: 0, reservas: 146.847 },
  { periodo: '2023', activo_total: 408.343, activo_corriente: 309.438, pasivo_corriente: 165.465, pasivo_total: 177.965, fondo_comercio: 11.736, intangibles: 6.59, inmovilizado_material: 65.841, existencias: 114.59, clientes: 128.03, proveedores: 126.36, activos_contrato: null, pasivos_contrato: 5.721, caja: 52.591, deuda_financiera: 18.471, arrendamientos: 16.421, patrimonio_neto: 230.378, minoritarios: 0, reservas: 203.698 },
  { periodo: '2024', activo_total: 493.141, activo_corriente: 333.727, pasivo_corriente: 167.484, pasivo_total: 185.104, fondo_comercio: 16.004, intangibles: 13.73, inmovilizado_material: 110.323, existencias: 143.276, clientes: 140.4, proveedores: 134.919, activos_contrato: null, pasivos_contrato: 4.277, caja: 34.085, deuda_financiera: 12.983, arrendamientos: 22.402, patrimonio_neto: 308.037, minoritarios: 0, reservas: 263.622 },
  { periodo: '2025', activo_total: 586.265, activo_corriente: 399.24, pasivo_corriente: 214.283, pasivo_total: 234.208, fondo_comercio: 14.994, intangibles: 11.633, inmovilizado_material: 136.965, existencias: 172.381, clientes: 168.074, proveedores: 143.048, activos_contrato: null, pasivos_contrato: 5.946, caja: 40.91, deuda_financiera: 55.933, arrendamientos: 25.49, patrimonio_neto: 352.057, minoritarios: 0, reservas: 322.768 },
];
const flujosH = [
  { periodo: '2021', flujo_operativo: 20.447, capex: 6.067, pagos_arrendamientos: 2.724, adquisiciones: 4.776, desinversiones: 0.185, dividendos: 4.009, recompras: 0, emision_acciones: 0.329, intereses_en_financiacion: 1.047 },
  { periodo: '2022', flujo_operativo: 37.013, capex: 9.332, pagos_arrendamientos: 3.004, adquisiciones: 0.773, desinversiones: 0.173, dividendos: 4.556, recompras: 0, emision_acciones: 0.298, intereses_en_financiacion: 1.277 },
  { periodo: '2023', flujo_operativo: 44.108, capex: 20.553, pagos_arrendamientos: 3.906, adquisiciones: 0.675, desinversiones: 1.193, dividendos: 6.548, recompras: 0, emision_acciones: 0.434, intereses_en_financiacion: 0.867 },
  { periodo: '2024', flujo_operativo: 64.751, capex: 40.704, pagos_arrendamientos: 5.305, adquisiciones: 25.173, desinversiones: 1.545, dividendos: 11.607, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0.458 },
  { periodo: '2025', flujo_operativo: 26.948, capex: 35.73, pagos_arrendamientos: 5.448, adquisiciones: 3.12, desinversiones: 0, dividendos: 13.095, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 3.876 },
];
// Trimestres: EBITDA AJUSTADO de la empresa (sin pagos en acciones, diferencias de cambio ni costes de compra) y BPA publicado [A6-A10, A1].
const trimestres = [
  { periodo: '3T24', ingresos: 191.972, crecimiento_pct: 6.9, crecimiento_organico_pct: null, ebitda: 34.377, margen_ebitda_pct: 17.9, bpa: 1.37, vs_consenso: null },
  { periodo: '4T24', ingresos: 208.476, crecimiento_pct: 11.5, crecimiento_organico_pct: null, ebitda: 32.548, margen_ebitda_pct: 15.6, bpa: 1.99, vs_consenso: null },
  { periodo: '1T25', ingresos: 201.403, crecimiento_pct: 5.6, crecimiento_organico_pct: null, ebitda: 30.916, margen_ebitda_pct: 15.4, bpa: 2.2, vs_consenso: null },
  { periodo: '2T25', ingresos: 224.419, crecimiento_pct: 13.8, crecimiento_organico_pct: null, ebitda: 33.396, margen_ebitda_pct: 14.9, bpa: 1.12, vs_consenso: null },
  { periodo: '3T25', ingresos: 218.341, crecimiento_pct: 13.7, crecimiento_organico_pct: null, ebitda: 30.29, margen_ebitda_pct: 13.9, bpa: 1.46, vs_consenso: null },
  { periodo: '4T25', ingresos: 254.092, crecimiento_pct: 21.9, crecimiento_organico_pct: null, ebitda: 38.727, margen_ebitda_pct: 15.2, bpa: 1.28, vs_consenso: null },
  { periodo: '1T26', ingresos: 264.84, crecimiento_pct: 31.5, crecimiento_organico_pct: null, ebitda: 41.041, margen_ebitda_pct: 15.5, bpa: 1.64, vs_consenso: null },
  { periodo: '2T26', ingresos: 324.802, crecimiento_pct: 44.7, crecimiento_organico_pct: 42.2, ebitda: 53.247, margen_ebitda_pct: 16.4, bpa: 0.79, vs_consenso: 'Superior' },
];

const A = {
  _estado: 'completo',
  financieros: {
    cuenta, ltm,
    cambios_perimetro: [
      { periodo: '2024', descripcion: 'Micron Industries (control y baja tensión en EE. UU.), comprada el 7-oct-2024 por 21,2 M; entra en el balance de 2024 y solo con un trimestre en la cuenta [A2].' },
    ],
    comentario: 'Las ventas pasaron de 380,2 M en 2021 a 898,3 M en 2025 (+24 % anual) y a 1.062,1 M en los 12 meses a junio de 2026 [A1, A6]. Casi todo es orgánico: Micron aportó el 3,2 % de las ventas de 2025 y el 2,5 % del crecimiento del 2T26; Mesta (2021) es pequeña [A1, A6]. El motor fue EE. UU. y México (de 231,7 M a 631,9 M), por los centros de datos, los fabricantes de cuadros y la marca blanca; las subidas de precio explican 4,4 puntos del +13,9 % de 2025 y el dólar 2,2 [A1]. El margen bruto subió del 26,9 % (2021) al 32,8 % (2024) con precio, mezcla de producto a medida y absorción de fábrica, y bajó al 30,3 % en 2025 por aranceles, cobre y 140 pb de arranque de Monterrey 4 [A1]; en el 2T26 volvió al 31,5 % [A6]. El margen EBIT publicado está deformado por el pago en acciones liquidado en caja, que se revaloriza con la cotización: 20,0 M en 2023, 17,1 M en 2024, 8,8 M en 2025 y 29,7 M en el 1S26 [A1, A2, A6]. Ningún año es no comparable salvo 2024 por Micron; desde el 29-jun-2026 entra AEG (≈326 M de ventas anuales), que cambia el perímetro de 2026 [A6, A12].',
    ajustes: 'La empresa publica EBITDA ajustado y BPA ajustado sin pagos en acciones, diferencias de cambio y, en 2026, costes de la compra de AEG (4,99 M) [A6]. EBITDA ajustado: 30,7 M (2021), 73,4 M (2022), 117,2 M (2023), 130,5 M (2024) y 133,3 M (2025) [A1]. Usamos las cifras publicadas y solo tratamos como no recurrente el exceso del pago en acciones sobre un 1 % de las ventas (estimación propia del nivel normal: media 2021-2022 del 0,4 % y planes ampliados desde 2023): 12,9 M en 2023, 9,2 M en 2024 y 29,6 M en los últimos 12 meses. Los DSU y PSU se pagan en efectivo y son un coste real, pero su importe depende del precio de la acción, no del negocio; el pasivo acumulado (39,0 M a junio de 2026) va al puente [A6]. Las diferencias de cambio y los costes de compra están por debajo del EBIT.',
    confianza: 'Alta',
  },
  trimestres: {
    items: trimestres,
    ultima_presentacion: 'En la conferencia del 1T26 (6-may) la dirección habló de demanda sana, cartera un 94,6 % mayor que un año antes y la recuperación del margen bruto al 30,1 % tras el golpe arancelario del 4T25 (29,2 %) [A7]. En la del 2T26 (31-jul) el tono subió: ventas récord de 324,8 M (+44,7 %), margen bruto del 31,5 % y EBITDA ajustado del 16,4 %; Monterrey 4 ya trabaja a plena capacidad y Monterrey 3 sube rápido, con capacidad para unos 1.300 M de ventas [A6, A13]. El cambio de discurso: la cartera bajó un 6,9 % en el trimestre porque se fabrica más deprisa de lo que entra, y la dirección admitió que las ofertas están «en línea con finales del año pasado», sin aceleración, y que el precio «empieza a ser un factor más competitivo» [A13]. Los analistas (Canaccord, RBC, ATB, Paradigm, J.P. Morgan, Raymond James) preguntaron por el peso de los centros de datos (algo más del 30 % de las ventas), el reparto precio-volumen del +45 %, el margen y las sinergias de AEG y la arquitectura de 800 V en corriente continua; la dirección no dio el desglose precio-volumen, ni cifras de sinergias, ni el margen de AEG, y reconoció que AEG tuvo un primer semestre flojo por Oriente Medio [A13]. Superó el consenso: BPA ajustado de 2,76 frente a 2,13 y ventas de 324,8 M frente a 294,2 M [A13].',
    confianza: 'Alta',
  },
  balance: {
    historico: balanceH,
    vencimientos: [{ anio: '2026', importe: 70.109 }, { anio: '2030', importe: 365 }],
    liquidez: 'A 27-jun-2026: caja de 33,6 M y líneas de crédito dispuestas por 70,1 M (deuda neta de explotación 36,5 M) [A6]. Al cerrar AEG (29-jun) firmó un crédito sindicado garantizado de hasta 300 M USD a plazo y 150 M USD revolving con vencimiento en 2030; el préstamo a plazo pagó los ≈365 M CAD de AEG [A6]. El importe de 2030 del calendario es la estimación propia del préstamo dispuesto (≈ precio de AEG).',
    rating: 'Sin rating',
    coste_deuda_pct: null,
    vida_media_anios: null,
    otros_pasivos: 'Pagos en acciones liquidables en caja: DSU por 32,2 M y PSU/RSU por 6,8 M a 27-jun-2026, dentro de proveedores y acreedores; suben y bajan con la cotización [A6]. Pago aplazado de compras de 0,9 M. Compromisos de inversión de 12,9 M [A6]. Provisiones de garantías y saneamiento de un terreno en Georgetown (2,7 M en total) [A1]. Sin pensiones de prestación definida relevantes (solo una provisión de la filial india) [A1]. Cumple todos los covenants bancarios [A6]. Inversiones en SmartD y Verdyn (6,3 M a valor razonable) y compromiso de invertir 3 M más en SmartD si cumple hitos [A6].',
    comentario: 'El circulante comercial (existencias + clientes − acreedores) pasó de 58,7 M en 2021 a 197,4 M en 2025 y 243,1 M en junio de 2026, en torno al 22 % de las ventas, porque los pedidos a medida para centros de datos inmovilizan más existencias y cobros [A1, A6]. Con capex de 40,7 M en 2024 y 35,7 M en 2025, la caja neta de 21,1 M de 2024 se convirtió en deuda neta de explotación de 15,0 M en 2025 y 36,5 M en junio de 2026 [A1, A6]. La compra de AEG cambia el perfil: la deuda neta proforma pasa de ≈36 M a ≈400 M, unas 2,7 veces el EBITDA que la empresa calculó al anunciarla [A12]. Los arrendamientos (24,6 M) son naves y vehículos [A6].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujosH,
    comentario: 'La conversión en caja es floja en plena expansión: el flujo operativo fue de 64,8 M en 2024 y de 26,9 M en 2025 (impuestos pagados de 42,6 M y circulante de −64,1 M), y de 5,0 M en el 1S26, con 68,2 M absorbidos por el circulante [A1, A6]. El FCF después de capex, arrendamientos e intereses fue negativo en 2025 y en los últimos 12 meses (−7,1 M). El capex se multiplicó por siete entre 2021 (6,1 M) y 2024 (40,7 M) por el programa de ≈85-90 M de 2023-2026 para Monterrey 3 y 4 y otras plantas [A6, A11]; la empresa espera 35-40 M en 2026 [A13] y otros ≈50 M para la primera fase de Fort Worth (2027) [D15]. Estimación propia del mantenimiento: la amortización de 2025 (20,7 M, 2,3 % de las ventas); el resto es crecimiento.',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'KPMG LLP', anios_auditor: null, opinion: 'Favorable',
    comentario: 'KPMG audita las cuentas de 2021 a 2025 con opinión favorable sin salvedades [A1, A5]. La partida que más distorsiona es el pago en acciones: los DSU (consejeros y alta dirección) y PSU/RSU se liquidan en efectivo y se valoran a precio de mercado, de modo que el gasto fue de 20,0 M en 2023 y 29,7 M en el 1S26 y hubo una recuperación de 1,75 M en el 1S25 cuando cayó la cotización [A1, A6]. No hay capitalización de I+D relevante (intangibles de 11,6 M, sobre todo de compras) ni fondo de comercio significativo (15,0 M) [A1]. El tipo impositivo efectivo es estable (24,5-26,2 % en 2023-2025) y subió al 30,7 % en el 1S26 por los costes de compra no deducibles [A1, A6]. El circulante crece más deprisa que las ventas en 2025-2026 (clientes +35,6 % en el 1S26), algo que el Beneish penaliza pero que tiene causa: entregas concentradas en junio y pedidos grandes a medida [A6]. Desde el 3T26 llega la contabilidad de AEG (asignación del precio aún no hecha), con amortización de intangibles que bajará el beneficio publicado [A6].',
    senales: [
      { senal: 'Pago en acciones en efectivo ligado a la cotización', nivel: 'Media', comentario: '29,7 M en el 1S26 (5,0 % de las ventas); hace ruido en el beneficio y es salida de caja cuando se liquida [A6].' },
      { senal: 'Circulante al alza y FCF negativo en los últimos 12 meses', nivel: 'Media', comentario: 'Clientes +59,9 M y existencias +18,1 M en el 1S26 [A6].' },
      { senal: 'Asignación del precio de AEG pendiente', nivel: 'Baja', comentario: 'Sin cifras de activos ni fondo de comercio de AEG hasta el 3T26 [A6].' },
    ],
    confianza: 'Media',
  },
  capital: {
    politica: 'Dividendo trimestral de 0,275 CAD por acción A y B (1,10 al año) desde 2025, frente a 0,34 en 2021; el dividendo de la clase B no puede superar al de la A [A1, A6]. No hay recompras. Prioridades declaradas: ampliar capacidad, compras que aporten tecnología y mercados (calidad de energía) y subir el dividendo de forma constante [A11]. La compra de AEG (365 M) se financió con deuda bancaria y la empresa prevé desapalancarse con su flujo de caja en tres años [A12].',
    adquisiciones: [
      { anio: '2021', objetivo: 'Mesta Electronics (filtros activos de armónicos e inversores de calentamiento por inducción, EE. UU.)', importe: 5.03, ev_ebitda: null, financiacion: 'Caja', resultado: 'Ventas de 16,0 M en 2025; los filtros activos crecen con los centros de datos y la nave de Pensilvania se vende (activo mantenido para la venta en 2026) [A1, A6].' },
      { anio: '2022', objetivo: 'Separación de Corefficient (empresa conjunta de núcleos en Monterrey con National Material)', importe: 0.12, ev_ebitda: null, financiacion: 'Caja (neto de la caja adquirida)', resultado: 'HPS se quedó con equipos y personal; base de la expansión en Monterrey [A4].' },
      { anio: '2024', objetivo: 'Micron Industries (transformadores de control y baja tensión, EE. UU.)', importe: 21.22, ev_ebitda: null, financiacion: 'Caja', resultado: 'Ventas de 26,7-30,6 M antes de la compra (0,7 veces); 3,2 % de las ventas de 2025 e integrada en el ERP en noviembre de 2025 [A1, A2].' },
      { anio: '2026', objetivo: 'AEG Power Solutions (SAI industriales, rectificadores y conversión de potencia; Europa y Asia)', importe: 365, ev_ebitda: null, financiacion: 'Préstamo sindicado a plazo (hasta 300 M USD)', resultado: 'Cerrada el 29-jun-2026; ≈326 M CAD de ventas en 2025 (1,1 veces) y 2026 «parecido»; primer semestre flojo por Oriente Medio; EBITDA no publicado [A6, A12, A13].' },
    ],
    comentario: null,
    confianza: 'Media',
  },
  negocio: {
    segmentos: [
      { nombre: 'EE. UU. y México', descripcion: 'Distribución, OEM y marca blanca; incluye Mesta, Micron y LatAm.', tipo_resultado: null, historico: [{ periodo: '2021', ingresos: 231.738, resultado: null }, { periodo: '2022', ingresos: 383.137, resultado: null }, { periodo: '2023', ingresos: 489.579, resultado: null }, { periodo: '2024', ingresos: 534.888, resultado: null }, { periodo: '2025', ingresos: 631.921, resultado: null }] },
      { nombre: 'Canadá', descripcion: 'Distribución y proyectos (eléctricas, infraestructura, minería, centros de datos).', tipo_resultado: null, historico: [{ periodo: '2021', ingresos: 130.184, resultado: null }, { periodo: '2022', ingresos: 151.058, resultado: null }, { periodo: '2023', ingresos: 175.619, resultado: null }, { periodo: '2024', ingresos: 215.394, resultado: null }, { periodo: '2025', ingresos: 233.981, resultado: null }] },
      { nombre: 'India', descripcion: 'Transformadores en aceite para India y el sudeste asiático.', tipo_resultado: null, historico: [{ periodo: '2021', ingresos: 18.28, resultado: null }, { periodo: '2022', ingresos: 24.269, resultado: null }, { periodo: '2023', ingresos: 44.866, resultado: null }, { periodo: '2024', ingresos: 38.058, resultado: null }, { periodo: '2025', ingresos: 32.353, resultado: null }] },
    ],
    geografias: [{ nombre: 'EE. UU. y México', peso_pct: 70.4 }, { nombre: 'Canadá', peso_pct: 26.0 }, { nombre: 'India', peso_pct: 3.6 }],
    geografias_criterio: 'origen',
    kpis: [
      { kpi: 'Cartera de pedidos (variación interanual)', valor_anterior: '+122 % (dic-25)', valor_actual: '+96,9 % (jun-26)', variacion: '−6,9 % frente a mar-26', comentario: 'Se fabrica más de lo que entra; la empresa no publica el importe [A1, A6].' },
      { kpi: 'Margen bruto', valor_anterior: '30,7 % (2T25)', valor_actual: '31,5 % (2T26)', variacion: '+80 pb', comentario: 'Precio, mezcla a medida y absorción de fábrica [A6].' },
      { kpi: 'EBITDA ajustado / ventas', valor_anterior: '14,9 % (2T25)', valor_actual: '16,4 % (2T26)', variacion: '+150 pb', comentario: 'Sin pagos en acciones, cambio ni costes de compra [A6].' },
      { kpi: 'Producto a medida / ventas de producto', valor_anterior: '55-60 % (2025)', valor_actual: 'casi el 70 % (2T26)', variacion: '≈ +10 pp', comentario: 'Pedidos grandes de centros de datos [A6, A11].' },
      { kpi: 'Centros de datos / ventas', valor_anterior: '≈ 30 %', valor_actual: 'algo más del 30 % (2T26)', variacion: '—', comentario: 'Dicho en la conferencia, sin cifra exacta [A13].' },
      { kpi: 'Ventas en EE. UU. y México (USD)', valor_anterior: '113,6 M USD (2T25)', valor_actual: '197,4 M USD (2T26)', variacion: '+73,8 %', comentario: 'Canadá −23,7 % en el mismo trimestre [A6].' },
    ],
    confianza: 'Alta',
  },
  fuentes: fA,
  huecos: [
    { seccion: 'trimestres', campo: 'vs_consenso de los trimestres anteriores al 2T26', tipo: 'Complemento', intentos: '1) Notas de resultados de la empresa (no comparan con consenso); 2) Seeking Alpha (titulares sin cifras fiables: «beats by $81,09M» en el 4T25 no cuadra); 3) Investing.com (solo el 2T26)', decision: 'Omitido' },
    { seccion: 'balance', campo: 'coste de la deuda y vida media', tipo: 'Complemento', intentos: '1) Nota de deuda del informe anual 2025 (líneas de crédito sin tipo publicado; los intereses incluyen comisiones); 2) Q2 2026 (crédito sindicado sin margen publicado); 3) presentación de AEG (sin coste)', decision: 'Omitido' },
  ],
};
guarda('A', A);

// ================================================================ B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Investor presentation Q2 2026: mercado norteamericano de transformadores (3.700 M USD secos y 6.100 M USD en aceite), cuota del 23 %, canales y mercados finales', editor: 'Hammond Power Solutions Inc.', tipo: 'Primaria', fecha: '2026-08', url: `${IR}/2026-YEAR-ITEMS/Q2-2026/Hammond-Aug-2026---Q2-IR-Presentation.pdf` },
  { id: 2, titulo: 'Global transformers market to reach 89,34 mil M USD in 2030 (potencia 35,83 y distribución 53,51)', editor: 'GlobalData', tipo: 'Sectorial', fecha: '2025', url: 'https://www.globaldata.com/media/power/global-transformers-market-to-reach-89-34-billion-in-2030-led-by-asia-pacific-forecasts-globaldata/' },
  { id: 3, titulo: 'Power Transformer Market worth 41,62 mil M USD by 2030 (30,38 mil M en 2025, +6,5 % anual)', editor: 'MarketsandMarkets (GlobeNewswire)', tipo: 'Sectorial', fecha: '2025-09-29', url: 'https://www.globenewswire.com/news-release/2025/09/29/3157392/0/en/Power-Transformer-Market-Size-Projected-to-Grow-41-62-billion-by-2030-MarketsandMarkets.html' },
  { id: 4, titulo: 'Power transformers and distribution transformers will face supply deficits of 30 % and 10 % in 2025', editor: 'Wood Mackenzie', tipo: 'Sectorial', fecha: '2025-08-14', url: 'https://www.woodmac.com/press-releases/power-transformers-and-distribution-transformers-will-face-supply-deficits-of-30-and-10-in-2025/' },
  { id: 5, titulo: 'US transformer market faces severe bottlenecks (precios +45-95 % desde 2019)', editor: 'Transformers Magazine', tipo: 'Sectorial', fecha: '2025', url: 'https://transformers-magazine.com/tm-news/us-transformer-market-faces-severe-bottlenecks/' },
  { id: 6, titulo: 'Fichas de Yahoo Finance de Eaton, Vertiv, Powell, Hubbell, nVent, Schneider Electric, ABB, HD Hyundai Electric y Fortune Electric (ventas y EBIT del último ejercicio)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/ETN/financials/' },
  { id: 7, titulo: 'GE Vernova to acquire full ownership of Prolec GE (5.275 M USD por el 50 %; 3.000 M USD de ventas y ≈25 % de margen EBITDA ajustado en 2025)', editor: 'GE Vernova', tipo: 'Primaria', fecha: '2025-10-21', url: 'https://www.gevernova.com/sites/default/files/press-release-prolec-ge-acquisition.pdf' },
  { id: 8, titulo: 'Annual Report 2025: estrategia, canales, plantas, competencia y aranceles', editor: 'Hammond Power Solutions Inc.', tipo: 'Primaria', fecha: '2026-03-19', url: `${IR}/2025-Annual-Report-and-Q4-2024-PR/2025-HPS-Annual-Report-031926-FP.pdf` },
  { id: 9, titulo: 'ESG Report 2025', editor: 'Hammond Power Solutions Inc.', tipo: 'Primaria', fecha: '2025', url: `${IR}/2025-ESG-REPORT/2025-HPS-ESG-Report_Final.pdf` },
  { id: 10, titulo: 'Hammond Power Solutions increases North American manufacturing capacity (Fort Worth: ≈250 M CAD de capacidad inicial, ≈50 M de inversión, hasta 400 M)', editor: 'GlobeNewswire (BNN Bloomberg)', tipo: 'Primaria', fecha: '2026-09-22', url: 'https://www.bnnbloomberg.ca/press-releases/2026/09/22/hammond-power-solutions-increases-north-american-manufacturing-capacity' },
  { id: 11, titulo: 'Accelerating Our Power Quality Platform (AEG: SAI industriales, posventa del 59 % de sus ventas, mapa de mercados)', editor: 'Hammond Power Solutions Inc.', tipo: 'Primaria', fecha: '2026-02-17', url: `${IR}/HPS-AEG-INVESTOR-PRESENTATION.pdf` },
  { id: 12, titulo: 'Q2 Report 2026: riesgos (aranceles, competidores subvencionados, arquitecturas de centros de datos, cancelaciones de cartera)', editor: 'Hammond Power Solutions Inc.', tipo: 'Primaria', fecha: '2026-07-30', url: `${IR}/2026-YEAR-ITEMS/Q2-2026/2026-HPS-Q2-Report_FINAL.pdf` },
  { id: 13, titulo: 'Earnings call transcript Q2 2026 (precio más competitivo, 800 V CC, capacidad de 1.300 M)', editor: 'Investing.com', tipo: 'Prensa', fecha: '2026-07-31', url: 'https://www.investing.com/news/transcripts/earnings-call-transcript-hammond-power-solutions-tops-q2-2026-forecasts-93CH-4828577' },
];
const B = {
  _estado: 'completo',
  historia: {
    resumen: 'Hammond Power Solutions es la división de transformadores de la familia Hammond de Guelph (Ontario), que cotiza en Toronto y sigue controlada por William G. Hammond a través de las acciones B [C1, C2, B8]. Pasó de fabricante canadiense de transformadores secos estándar a líder norteamericano con plantas en Canadá, EE. UU., México e India. Las decisiones que la explican: concentrar la producción en Monterrey (México), crecer con los distribuidores NAED y la marca blanca en EE. UU., y desde 2021 ampliar hacia calidad de energía (Mesta, Micron) [B8]. En 2023 el fundador-presidente cedió la dirección ejecutiva a Adrian Thomas. Desde 2023 la demanda de centros de datos y la escasez de transformadores multiplicaron ventas y márgenes; en 2026 compró AEG Power Solutions (SAI industriales, 365 M) y anunció una planta en Fort Worth [B10, B11].',
    hitos: [
      { anio: '2001', hito: 'Salida a bolsa en Toronto (HPS.A); 25 años en bolsa en 2026 [B8].' },
      { anio: '2021', hito: 'Compra de Mesta Electronics: filtros activos de armónicos y calentamiento por inducción [A5].' },
      { anio: '2022', hito: 'Separación de la empresa conjunta Corefficient en Monterrey; HPS se queda con equipos y plantilla [A4].' },
      { anio: '2023', hito: 'Adrian Thomas, primer ejecutivo; William G. Hammond sigue de presidente. Programa de ≈85 M de capex para pasar de 1.200 M de capacidad [B1, C6].' },
      { anio: '2024', hito: 'Compra de Micron Industries (EE. UU.) por 21,2 M; Arathorn (Hammond) vende 500.000 acciones A [A2, C2].' },
      { anio: '2025', hito: 'Monterrey 4 en marcha (≈100 M de capacidad); centro logístico en Dallas; cartera +122 % a fin de año [B8].' },
      { anio: '2026', hito: 'Compra de AEG Power Solutions (365 M, cerrada el 29-jun) y nuevo crédito sindicado de hasta 450 M USD [A6].' },
      { anio: '2026', hito: 'Planta arrendada en Fort Worth (Texas): producción desde el 4T27, ≈250 M de capacidad inicial [B10].' },
    ],
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'HPS diseña y fabrica transformadores secos de baja y media tensión (distribución, encapsulados, de control, aislamiento de variadores, resina colada hasta 35 kV), reactancias, filtros pasivos y activos de armónicos e inversores de calentamiento por inducción; en India, transformadores en aceite [B8, B1]. Vende unos 500.000 transformadores al año con 9.000 referencias, el 55-60 % a medida [B1]. Sus clientes finales son centros de datos, construcción comercial e industrial, minería, petróleo y gas, renovables, recarga de vehículos y eléctricas; llega a ellos por distribuidores (61 % de las ventas), fabricantes de equipos (22 %) y marca blanca (17 %) [B1]. Tiene 18 centros propios y unos 2.700 empleados, con la mayor parte de la capacidad en México, después Canadá y EE. UU. [B1, B8]. Desde el 29-jun-2026 suma AEG Power Solutions: SAI industriales, cargadores, rectificadores y conversión de potencia para industria, nuclear, petróleo y gas, ferrocarril e hidrógeno, con 780 empleados, cinco fábricas, ventas de ≈326 M CAD y un 59 % de servicios y posventa [B11].',
    como_gana_dinero: 'Margen sobre el coste de materiales: acero eléctrico de grano orientado, cobre y aluminio son la mayor parte del coste, y el beneficio depende de pasar a precio esas subidas y los aranceles (subidas en abril y agosto de 2025 y en el 1T26) [B8, B12]. El producto estándar sigue la inversión general; el producto a medida, los ciclos de inversión de cada sector, hoy los centros de datos [B8]. El apalancamiento operativo es alto: con fábricas llenas el margen bruto sube por absorción de costes fijos (32,8 % en 2024) y con plantas nuevas a medio llenar baja (−140 pb en 2025) [B8]. Casi nada es recurrente en transformadores; AEG aporta posventa recurrente (59 % de sus ventas) [B11]. Estacionalidad suave, con el 4T más fuerte. La cartera de pedidos de producto a medida tarda unos seis meses en convertirse en ventas [A6].',
    clientes: 'Concentración baja: el gasto medio por cliente es de 213.000 USD al año y la empresa no declara ningún cliente que pese más del 10 % [B1, B8]. Los distribuidores (61 %) son los canales NAED de material eléctrico; la marca blanca vende a grandes grupos eléctricos con su marca [B1]. Los contratos son pedidos, no acuerdos plurianuales, y muchos se pueden cancelar sin penalización mientras no haya empezado la fabricación [B12]. Poder de precios demostrado en la escasez: el margen bruto pasó del 26,9 % en 2021 al 32,8 % en 2024 pese a la inflación del cobre, y las subidas de 2025-2026 recuperaron el margen tras los aranceles (31,5 % en el 2T26) [B8, A6]. Pero en Canadá y en los acuerdos marco de grandes clientes el precio ya es más competitivo [B13].',
    confianza: 'Alta',
  },
  sector: {
    definicion: 'El mercado relevante es el de transformadores secos de baja y media tensión en Norteamérica, donde HPS hace casi todas sus ventas [B1, B8]. La propia empresa lo cifra en 3.700 M USD, dentro de un mercado norteamericano de transformadores de unos 9.800 M USD (6.100 M en aceite) [B1]. No hay serie histórica pública de ese perímetro; para la tendencia usamos el mercado mundial de transformadores de GlobalData (89.340 M USD en 2030) y MarketsandMarkets (potencia, +6,5 % anual 2025-2030) [B2, B3], y Wood Mackenzie para la escasez en EE. UU. [B4]. Con AEG, HPS entra además en SAI industriales y conversión de potencia, un nicho fragmentado sin cifra pública [B11].',
    tamano: '≈ 3.700 M USD en Norteamérica, secos (empresa, 2026) [B1]; ≈ 65.200 M USD en el mundo en 2025 y 89.340 M en 2030 (estimación a partir de GlobalData y MarketsandMarkets) [B2, B3].',
    unidad_serie: 'millones de USD (transformadores de potencia y distribución, mundo)',
    serie: [{ anio: '2025e', tamano: 65200 }, { anio: '2030e', tamano: 89340 }],
    tcac_historico_pct: null, tcac_previsto_pct: 6.5, cr5_pct: null, estructura: 'Moderadamente concentrada',
    drivers: [
      { driver: 'Centros de datos e IA', efecto: '+', horizonte: 'Estructural', evidencia: 'Algo más del 30 % de las ventas de HPS; los pedidos grandes del 4T25 doblaron la cartera [B13, B8].' },
      { driver: 'Escasez de transformadores en EE. UU.', efecto: '+', horizonte: 'Cíclico', evidencia: 'Déficit del 10 % en distribución y del 30 % en potencia en 2025; precios +45-95 % desde 2019 [B4, B5].' },
      { driver: 'Electrificación industrial, renovables y red envejecida', efecto: '+', horizonte: 'Estructural', evidencia: 'Segmentos emergentes (renovables, recarga, centros de datos, semiconductores) = 36 % de las ventas [B1].' },
      { driver: 'Aranceles y reglas de origen (T-MEC)', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'La mayoría de sus productos cumplen el T-MEC; los aranceles sobre materias primas y transformadores pequeños bajaron el margen del 4T25 al 29,2 % [B13, B8].' },
      { driver: 'Capacidad nueva de los competidores', efecto: '−', horizonte: 'Cíclico', evidencia: 'Prolec GE, Siemens, Hitachi Energy, Eaton y los coreanos amplían en EE. UU. y México; HPS ve el precio «más competitivo» [B7, B13].' },
      { driver: 'Arquitecturas de 800 V en corriente continua en centros de datos', efecto: '+/−', horizonte: 'Estructural', evidencia: 'Las ofertas hasta 2027 aún usan diseño tradicional; AEG aporta conversión CC de hasta 1.500 V [B13].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Plataformas globales (Schneider, Eaton, ABB, Siemens, Hitachi) con el 51 % del mercado seco norteamericano y fabricantes pequeños con el 26 %; HPS 23 % [B1]. La escasez suaviza hoy la rivalidad.' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Clientes muy repartidos (213.000 USD de gasto medio), pero los grandes de centros de datos negocian acuerdos marco y pueden cancelar pedidos [B1, B12].' },
      { fuerza: 'Poder de los proveedores', intensidad: 4, justificacion: 'El acero de grano orientado lo fabrican pocas acerías en el mundo y HPS depende de él importado; cobre y aluminio en máximos [B12].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Hacen falta homologaciones UL/CSA, red de distribuidores y escala; la entrada real viene de importadores asiáticos con costes subvencionados, frenada por aranceles [B12].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 2, justificacion: 'El transformador no tiene sustituto en la distribución en alterna; el riesgo es de diseño (800 V CC en centros de datos) a largo plazo [B13].' },
    ],
    ciclo: { posicion: 'Madurez del ciclo', comentario: 'Los indicadores de escasez (plazos, precios +45-95 % desde 2019, déficit de oferta del 10-30 % en EE. UU.) siguen altos, pero la cartera de HPS ya baja en trimestres (−6,9 % en el 2T26), las ofertas no aceleran y el precio empieza a competirse [B4, B5, A6, B13]. En la anterior bajada (2015-2020) HPS vendía 300-360 M con márgenes EBITDA de un dígito alto [A11]; en 2020 las ventas cayeron un 10 % [A5]. En 2022 subió con la inflación de materiales gracias al precio. El ciclo de transformadores es muy largo en precio: tras 2005-2008 los márgenes del sector tardaron casi una década en volver.' },
    regulacion: 'Normas de eficiencia del Departamento de Energía de EE. UU. para transformadores de distribución (revisadas en 2024) y de Natural Resources Canada (NRCan 2019), que fijan los diseños [B8]. Aranceles de EE. UU. sobre importaciones y materias primas desde 2025, con reglas del T-MEC que protegen a las fábricas mexicanas de HPS si cumplen origen; la revisión del T-MEC de 2026 es un riesgo con fecha [B12, B13]. Homologaciones UL y CSA obligatorias para vender [B12].',
    tendencias: 'Centros de datos cada vez más grandes, con pedidos de mayor importe y producto a medida, donde HPS gana por capacidad y plazos [B13]. Electrificación de procesos industriales, renovables y almacenamiento, que piden filtros de armónicos y calidad de energía, el negocio que HPS quiere ampliar con Mesta, Micron y AEG [B8, B11]. A largo plazo, la distribución en corriente continua de 800 V en los centros de IA podría reducir transformadores de baja tensión en la sala y desplazar valor hacia la conversión de potencia; HPS dice que las ofertas hasta 2027 aún son tradicionales [B13]. Nuevos rivales: plantas de coreanos y de grandes grupos en EE. UU. y México.',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 23, posicion: '1.º fabricante de transformadores secos de Norteamérica, con el 23 % del mercado seco norteamericano según la empresa (sin India ni calidad de energía); con AEG, especialista en SAI industriales en Europa y Asia [B1, B11].',
    competidores: [
      { nombre: 'Eaton', pais: 'IE/EE. UU.', ticker: 'ETN', ingresos: 38850, cuota_pct: null, margen_ebit_pct: 18.8, comentario: 'Plataforma global de distribución eléctrica; transformadores secos dentro de su oferta para centros de datos [B6].' },
      { nombre: 'Schneider Electric (Square D)', pais: 'Francia', ticker: 'SU.PA', ingresos: 63874, cuota_pct: null, margen_ebit_pct: 16.7, comentario: 'Mayor grupo de gestión de energía; vende transformadores secos con cuadros y SAI [B6, B1].' },
      { nombre: 'ABB', pais: 'Suiza', ticker: 'ABBN.SW', ingresos: 47020, cuota_pct: null, margen_ebit_pct: 19.0, comentario: 'Electrificación y SAI; competidor de AEG en conversión de potencia [B6].' },
      { nombre: 'Hubbell (Acme)', pais: 'EE. UU.', ticker: 'HUBB', ingresos: 8273, cuota_pct: null, margen_ebit_pct: 20.2, comentario: 'Material eléctrico y de red; vende transformadores secos Acme por los mismos distribuidores [B6].' },
      { nombre: 'Powell Industries', pais: 'EE. UU.', ticker: 'POWL', ingresos: 1563, cuota_pct: null, margen_ebit_pct: 19.7, comentario: 'Cuadros y salas eléctricas a medida para industria y centros de datos [B6].' },
      { nombre: 'Vertiv', pais: 'EE. UU.', ticker: 'VRT', ingresos: 14480, cuota_pct: null, margen_ebit_pct: 17.9, comentario: 'Infraestructura de energía y frío para centros de datos (SAI, distribución); comprador de transformadores y rival de AEG [B6].' },
      { nombre: 'HD Hyundai Electric', pais: 'Corea', ticker: '267260.KS', ingresos: 4319, cuota_pct: null, margen_ebit_pct: 23.9, comentario: 'Transformadores de potencia con fábrica en Alabama; referencia de márgenes de pico [B6].' },
      { nombre: 'Prolec GE (GE Vernova)', pais: 'México', ticker: null, ingresos: 4246, cuota_pct: null, margen_ebit_pct: null, comentario: '3.000 M USD de ventas y ≈25 % de margen EBITDA ajustado en 2025; GE Vernova compró el 50 % restante [B7].' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'Unos 2.800 distribuidores le dan alcance, pero sin efecto de red real [B1].' },
        { fuente: 'Costes de cambio', puntuacion: 2, evidencia: 'Producto homologado y especificado en proyectos; en estándar el cliente cambia con facilidad [B12].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 2, evidencia: 'Marca conocida en el canal NAED; homologaciones UL/CSA comunes a todos los rivales [B8].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Fabricación en México con origen T-MEC y compras a escala; margen EBIT del 11,6 % en 2025 frente al 17-24 % de las plataformas globales (que no es comparable en mezcla) [A1, B6].' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'Mayor especialista en transformadores secos de Norteamérica (23 %) con capacidad de ≈1.300 M de ventas [B1, B13].' },
      ],
    },
    amenazas: 'La principal es la capacidad nueva: Prolec GE, Siemens, Hitachi Energy, Eaton y los coreanos invierten en EE. UU. y México, y cuando la escasez acabe el precio volverá a competirse (probabilidad media-alta en 2027-2029) [B7, B13]. Segunda, los importadores con costes subvencionados si se relajan los aranceles [B12]. Tercera, la concentración en centros de datos: un frenazo del capex de los grandes de la nube o un cambio de arquitectura (800 V CC) dejaría capacidad ociosa (probabilidad baja-media a 3 años) [B12, B13]. Cuarta, los grandes clientes en acuerdos marco ya aprietan el precio [B13].',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Lo material es la eficiencia energética de los transformadores (normas DOE y NRCan; las pérdidas en vacío son la mayor parte de su huella de uso), el consumo de acero eléctrico y cobre, y la seguridad laboral en fábricas con 2.700 empleados [B9, B8]. HPS publica informe ESG desde 2023 y certifica Great Place to Work en Canadá, EE. UU., India y México [B8, B9]. La venta a renovables, recarga y redes es una oportunidad de ingresos ligada a la transición, sin cifra de taxonomía publicada.',
    controversias: 'Sin sanciones, litigios relevantes ni incidentes graves en 2023-2026 en los informes anuales ni en los trimestrales; la dirección no tiene conocimiento de pasivos contingentes [B12, A6]. Única partida ambiental: una provisión pequeña por el saneamiento compartido de un terreno en Georgetown (Ontario) [A1].',
    confianza: 'Media',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'sector', campo: 'serie histórica del mercado norteamericano de transformadores secos', tipo: 'Complemento', intentos: '1) Presentación de HPS (solo un año, 3.700 M USD); 2) GMI Insights y Technavio (páginas caídas, 410 Gone, y cifras de pago); 3) GlobalData y MarketsandMarkets (mundo, no Norteamérica)', decision: 'Calculado y marcado como estimación' },
    { seccion: 'esg', campo: 'calificaciones ESG de agencias', tipo: 'Complemento', intentos: '1) Informe ESG 2025 de HPS (sin calificaciones externas); 2) MSCI y Sustainalytics (sin ficha pública de HPS); 3) prensa (nada)', decision: 'Omitido' },
    { seccion: 'competencia', campo: 'CR5 del mercado seco norteamericano', tipo: 'Complemento', intentos: '1) Presentación de HPS (51 % de las plataformas globales sin desglose); 2) informes anuales de los rivales (no desglosan transformadores secos); 3) informes de mercado de pago', decision: 'Omitido' },
  ],
};
guarda('B', B);

// ================================================================ C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Q2 Report 2026: consejeros y directivos (pág. 41) y partes vinculadas (nota 13: control de William G. Hammond)', editor: 'Hammond Power Solutions Inc.', tipo: 'Primaria', fecha: '2026-07-30', url: `${IR}/2026-YEAR-ITEMS/Q2-2026/2026-HPS-Q2-Report_FINAL.pdf` },
  { id: 2, titulo: 'Annual Report 2025: capital (nota 17: acciones B con cuatro votos), partes vinculadas y remuneración del personal clave (nota 23)', editor: 'Hammond Power Solutions Inc.', tipo: 'Primaria', fecha: '2026-03-19', url: `${IR}/2025-Annual-Report-and-Q4-2024-PR/2025-HPS-Annual-Report-031926-FP.pdf` },
  { id: 3, titulo: 'Hammond Power Solutions Appoints Gervais Jacques to its Board of Directors', editor: 'GlobeNewswire (Yahoo Finance)', tipo: 'Primaria', fecha: '2026-10-01', url: 'https://finance.yahoo.com/markets/stocks/articles/hammond-power-solutions-appoints-gervais-150000952.html' },
  { id: 4, titulo: 'Hammond Power Solutions Inc. to Acquire AEG Power Solutions', editor: 'Hammond Power Solutions Inc.', tipo: 'Primaria', fecha: '2026-02-17', url: 'https://americas.hammondpowersolutions.com/news/2026/february/hps-aeg-power-solutions-aquisition' },
  { id: 5, titulo: 'Insider trades HPS.A (sin operaciones en los últimos 12 meses en su base, actualizada el 29-jul-2025)', editor: 'MarketBeat', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://www.marketbeat.com/stocks/TSE/HPS.A/insider-trades/' },
  { id: 6, titulo: 'Hammond Power Solutions management (primer ejecutivo desde el 31-jul-2023; remuneración total de 2,53 M CAD, 44,2 % fijo; participación del 0,03 %)', editor: 'Simply Wall St', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://simplywall.st/stocks/ca/capital-goods/tsx-hps.a/hammond-power-solutions-shares/management' },
  { id: 7, titulo: 'Investor presentation Q2 2026 (asignación de capital: ≈85 M de capex 2023-2025 para superar 1.200 M de capacidad)', editor: 'Hammond Power Solutions Inc.', tipo: 'Primaria', fecha: '2026-08', url: `${IR}/2026-YEAR-ITEMS/Q2-2026/Hammond-Aug-2026---Q2-IR-Presentation.pdf` },
  { id: 8, titulo: 'Earnings call transcript Q2 2026 (capacidad de ≈1.300 M; Monterrey 4 a plena capacidad)', editor: 'Investing.com', tipo: 'Prensa', fecha: '2026-07-31', url: 'https://www.investing.com/news/transcripts/earnings-call-transcript-hammond-power-solutions-tops-q2-2026-forecasts-93CH-4828577' },
];
const C = {
  _estado: 'completo',
  directivos: {
    equipo: [
      { nombre: 'Adrian Thomas', cargo: 'Primer ejecutivo y consejero', desde: '2023', participacion_pct: 0.03, trayectoria: 'Primer ejecutivo desde el 31-jul-2023 [C6]. Con él las ventas pasaron de 710,1 M (2023) a 898,3 M (2025) y 1.062,1 M en los últimos 12 meses, la capacidad subió a ≈1.300 M y cerró la mayor compra de la historia (AEG, 365 M) [A1, A6, C8].' },
      { nombre: 'Richard Vollering', cargo: 'Director financiero', desde: null, participacion_pct: null, trayectoria: 'Director financiero; firma los informes y lleva la financiación de AEG (crédito sindicado de hasta 450 M USD) [C1, A6].' },
      { nombre: 'William G. Hammond', cargo: 'Presidente del consejo (accionista de control)', desde: null, participacion_pct: 26.92, trayectoria: 'Presidente y primer ejecutivo hasta 2023 (firmaba el informe de 2021 como «Chairman of the Board & Chief Executive Officer») [A5]. Controla la empresa con el 100 % de las acciones B y el 4,7 % de las A (57 % de los votos) [C1, C2].' },
      { nombre: 'John Bailey', cargo: 'Director de operaciones', desde: null, participacion_pct: null, trayectoria: 'Responsable de las plantas; puso en marcha Monterrey 4 antes de plazo y dentro de presupuesto en 2025 [C1, B8].' },
      { nombre: 'David Kinsella', cargo: 'Director comercial', desde: null, participacion_pct: null, trayectoria: 'Lleva los canales de distribución, OEM y marca blanca [C1].' },
      { nombre: 'Norman Bates', cargo: 'Vicepresidente ejecutivo de desarrollo de negocio y presidente de Power Quality Solutions', desde: null, participacion_pct: null, trayectoria: 'Responsable de las compras y de la plataforma de calidad de energía (Mesta, Micron, AEG) [C1].' },
    ],
    historial_guidance: [
      { anio: '2023', guia: '≈85 M de capex en 2023-2025 para superar 1.200 M de capacidad de ventas [C7]', real: 'Capacidad de ≈1.300 M en 2026; programa ampliado a ≈90 M en 2023-2026 [C8, A6]', cumplida: 'Sí' },
      { anio: '2024', guia: '20 M para capacidad de producto a medida en México (agosto de 2024) [A6]', real: 'Monterrey 4 en marcha en 2025, antes de plazo y en presupuesto; a plena capacidad en el 2T26 [B8, C8]', cumplida: 'Sí' },
      { anio: '2026', guia: 'Cierre de AEG en el 2T26 [C4]', real: 'Cerrada el 29-jun-2026 [A6]', cumplida: 'Sí' },
    ],
    comentario: 'Equipo estable y con historial de cumplir lo que anuncia en capacidad y compras, aunque la empresa no da guía numérica de ventas ni de márgenes, lo que limita la prueba de credibilidad [A1, A6]. El relevo de 2023 (del fundador-presidente a un primer ejecutivo profesional) se hizo sin ruido y con el presidente en el consejo. Lo que está por probar: integrar AEG, una empresa de un tamaño equivalente a un tercio de HPS, en otro continente y con otro negocio (SAI), sin sinergias cuantificadas [C8]. Sucesión: la familia Hammond controla el voto; no consta un plan de sucesión público de la presidencia.',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'William G. Hammond', cargo: 'Presidente', tipo: 'Dominical', desde: null, comisiones: '—' },
      { nombre: 'Adrian Thomas', cargo: 'Primer ejecutivo', tipo: 'Ejecutivo', desde: '2023', comisiones: '—' },
      { nombre: 'Frederick M. Jaques', cargo: 'Consejero coordinador', tipo: 'Independiente', desde: null, comisiones: 'Auditoría' },
      { nombre: 'David Wood', cargo: 'Consejero', tipo: 'Independiente', desde: null, comisiones: 'Auditoría (presidente)' },
      { nombre: 'Christopher R. Huether', cargo: 'Consejero', tipo: 'Independiente', desde: null, comisiones: 'Auditoría' },
      { nombre: 'Dahra Granovsky', cargo: 'Consejera', tipo: 'Independiente', desde: null, comisiones: 'Gobierno (presidenta)' },
      { nombre: 'Nathalie L. Pilon', cargo: 'Consejera', tipo: 'Independiente', desde: null, comisiones: 'Gobierno' },
      { nombre: 'Anne Marie Turnbull', cargo: 'Consejera', tipo: 'Independiente', desde: null, comisiones: 'Recursos humanos y remuneraciones (presidenta)' },
      { nombre: 'Gregory Yull', cargo: 'Consejero', tipo: 'Independiente', desde: null, comisiones: 'Recursos humanos y remuneraciones' },
      { nombre: 'Gervais Jacques', cargo: 'Consejero', tipo: 'Independiente', desde: '2026', comisiones: '—' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: true, una_accion_un_voto: false,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: false, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: true, presidente_vinculado_control: true, cambios_cupula_24m: 0,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 2.53, fijo: 1.12, variable_corto: null, variable_largo: null, ratio_salario_medio: 40 },
    remuneracion: 'La remuneración del personal clave (consejeros y alta dirección) fue de 13,4 M en 2025: 4,6 M de salarios y 8,8 M de pagos en acciones, frente a 21,6 M en 2024 (17,1 M en acciones) [C2]. El variable a largo plazo son PSU y RSU para el primer ejecutivo y la alta dirección, y DSU para consejeros y algunos directivos, todos liquidados en efectivo y revalorizados con la cotización [A6]. La parte en acciones dominó en 2023-2024 porque la acción se multiplicó; eso premia la cotización más que la rentabilidad. No hemos podido leer la circular de 2026 (SEDAR+ no abre), así que no constan las métricas de las PSU, el clawback ni las indemnizaciones; la remuneración del primer ejecutivo (2,53 M, 44 % fijo) es de un proveedor de datos [C6]. Ratio frente al coste medio por empleado (63.800 CAD: 159,5 M de personal entre 2.500 empleados) de unas 40 veces, estimación propia [A1].',
    accionistas: [
      { nombre: 'William G. Hammond (directamente y por Arathorn Investments)', pct: 26.92, tipo: 'Control (100 % de las B y 4,7 % de las A; ≈57 % de los votos)', variacion: 'Vendió 500.000 acciones A en 2024 (colocación pagada por la empresa: 0,35 M de comisiones); sin cambios en 2025-2026 [C2, C1].' },
      { nombre: 'Flotante (acciones A sin Hammond)', pct: 73.08, tipo: 'Flotante', variacion: '—' },
    ],
    insiders: [],
    control_y_defensas: 'William G. Hammond controla la junta: tiene las 2.778.300 acciones B (cuatro votos cada una) y 424.636 A, el 26,9 % del capital y en torno al 57 % de los votos (estimación propia: 11,54 M de 20,24 M de votos) [C1, C2]. Las B se convierten una a una en A y no pueden cobrar más dividendo que las A [C2]. No hay más clases ni límites de voto. La única operación vinculada es el dividendo (3,5 M a Hammond en 2025) y, en 2024, 0,35 M de comisiones de la colocación de sus acciones que pagó la empresa, un detalle de gobierno poco favorable al minoritario [C2]. El presidente y el primer ejecutivo están separados desde 2023 y hay consejero coordinador independiente (Jaques) [C1]. El consejo pasó de ocho a nueve miembros el 1-oct-2026 con Gervais Jacques (5N Plus, ex-Rio Tinto) [C3]. Con el control familiar, una OPA hostil es imposible; una venta amistosa dependería de Hammond.',
    alertas: [
      'La empresa pagó en 2024 0,35 M de comisiones de la venta de 500.000 acciones del accionista de control [C2].',
      'Pago en acciones en efectivo muy sensible a la cotización (29,7 M en el 1S26), sin métricas de rentabilidad verificadas en el variable [A6].',
    ],
    confianza: 'Media',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'operaciones de directivos (SEDI) de los últimos 12 meses', tipo: 'Complemento', intentos: '1) SEDI (antibot, no abre); 2) Canadian Insider (carga por JavaScript, sin datos); 3) MarketBeat (sin operaciones, base actualizada el 29-jul-2025)', decision: 'Omitido' },
    { seccion: 'gobierno', campo: 'circular de la junta de 2026 (votos, métricas del variable, antigüedad de consejeros)', tipo: 'Núcleo', intentos: '1) SEDAR+ (403); 2) web de inversores de HPS (no publica la circular); 3) búsqueda web (solo resúmenes de proveedores)', decision: 'Omitido' },
  ],
};
guarda('C', C);

// ================================================================ D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de HPS-A.TO, XIC.TO y XLI (precio, rango, volumen, rentabilidades, betas, volatilidad, caída máxima, cierres de ejercicio)', editor: 'Yahoo Finance (herramientas/bolsa.mjs)', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://finance.yahoo.com/quote/HPS-A.TO/history/' },
  { id: 2, titulo: 'Hammond Power Solutions: estimaciones 2026-2028 (8 analistas)', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-16', url: 'https://www.marketscreener.com/quote/stock/HAMMOND-POWER-SOLUTIONS-I-1410361/finances/' },
  { id: 3, titulo: 'Hammond Power Solutions: consenso (BUY; objetivo medio 383,50, máx. 405, mín. 350)', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-16', url: 'https://www.marketscreener.com/quote/stock/HAMMOND-POWER-SOLUTIONS-I-1410361/consensus/' },
  { id: 4, titulo: 'HPS.A price target (7 comprar, 0 mantener; objetivo medio 382,57, máx. 430, mín. 348)', editor: 'MarketBeat', tipo: 'Analistas', fecha: '2026-10-19', url: 'https://www.marketbeat.com/stocks/TSE/HPS.A/price-target/' },
  { id: 5, titulo: 'Fichas y earningsTrend de los comparables (precio, capitalización, deuda neta, EBITDA de 12 meses, BPA estimado)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/ETN/analysis/' },
  { id: 6, titulo: 'Benchmark bond yield, 10-year (BD.CDN.10YR.DQ.YLD) y USD/CAD, EUR/CAD', editor: 'Bank of Canada (Valet)', tipo: 'Primaria', fecha: '2026-10-16', url: 'https://www.bankofcanada.ca/valet/observations/BD.CDN.10YR.DQ.YLD,FXUSDCAD,FXEURCAD/json?recent=5' },
  { id: 7, titulo: 'Implied ERP by month (ERPbymonth.xlsx): 4,20 % en octubre de 2026', editor: 'Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 8, titulo: 'Hubbell to acquire DMC Power (825 M USD; ventas 2026e ≈130 M y EBITDA ≈60 M)', editor: 'Hubbell Inc. (SEC, 8-K, ex. 99.1)', tipo: 'Primaria', fecha: '2025-06', url: 'https://www.sec.gov/Archives/edgar/data/48898/000119312525180835/d941242dex991.htm' },
  { id: 9, titulo: 'GE Vernova to acquire full ownership of Prolec GE (5.275 M USD por el 50 %)', editor: 'GE Vernova', tipo: 'Primaria', fecha: '2025-10-21', url: 'https://www.gevernova.com/sites/default/files/press-release-prolec-ge-acquisition.pdf' },
  { id: 10, titulo: 'Eaton acquires manufacturer of enclosures for data center market (Fibrebond, 1.400 M USD; ventas de ≈378 M USD)', editor: 'Electrical Wholesaling', tipo: 'Prensa', fecha: '2025-03', url: 'https://ewweb.com/news/mergers-acquisitions/article/55274679/eaton-acquires-manufacturer-of-enclosures-for-data-center-market' },
  { id: 11, titulo: 'Hammond Power Solutions Inc. to Acquire AEG Power Solutions (365 M CAD; ventas 2025 ≈326 M CAD)', editor: 'Hammond Power Solutions Inc.', tipo: 'Primaria', fecha: '2026-02-17', url: 'https://americas.hammondpowersolutions.com/news/2026/february/hps-aeg-power-solutions-aquisition' },
  { id: 12, titulo: 'Annual Report 2024, nota 30: compra de Micron (21,2 M; ventas de 26,7-30,6 M)', editor: 'Hammond Power Solutions Inc.', tipo: 'Primaria', fecha: '2025-03-20', url: `${IR}/2024-Annual-Report---Hammond-Power-Solutions-Inc---March-20-2025.pdf` },
  { id: 13, titulo: 'Movimiento del precio (movimiento.mjs) y variaciones diarias y mensuales de HPS-A.TO, VRT, POWL y ETN', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://finance.yahoo.com/quote/HPS-A.TO/chart/' },
  { id: 14, titulo: 'National Bank lifts target for Hammond Power Solutions stock to CAD 380.00 (13-oct; resultados el 29-oct)', editor: 'ad-hoc-news', tipo: 'Prensa', fecha: '2026-10-16', url: 'https://www.ad-hoc-news.de/boerse/news/nebenwerte/national-bank-lifts-target-for-hammond-power-solutions-stock-to-cad-380-00/70349135' },
  { id: 15, titulo: 'Hammond Power Solutions increases North American manufacturing capacity (Fort Worth)', editor: 'GlobeNewswire (BNN Bloomberg)', tipo: 'Primaria', fecha: '2026-09-22', url: 'https://www.bnnbloomberg.ca/press-releases/2026/09/22/hammond-power-solutions-increases-north-american-manufacturing-capacity' },
  { id: 16, titulo: 'Q2 Report 2026: balance a 27-jun-2026, acciones (9.126.624 A + 2.778.300 B), pasivos por DSU y PSU, hecho posterior (AEG)', editor: 'Hammond Power Solutions Inc.', tipo: 'Primaria', fecha: '2026-07-30', url: `${IR}/2026-YEAR-ITEMS/Q2-2026/2026-HPS-Q2-Report_FINAL.pdf` },
  { id: 17, titulo: 'Hammond Power Solutions Appoints Gervais Jacques to its Board of Directors', editor: 'GlobeNewswire (Yahoo Finance)', tipo: 'Primaria', fecha: '2026-10-01', url: 'https://finance.yahoo.com/markets/stocks/articles/hammond-power-solutions-appoints-gervais-150000952.html' },
];
const b = bolsa.bolsa;
const compsSin = comps.empresas.filter((c) => c.ticker !== 'HPS-A.TO').map(({ nombre, ticker, pais, capitalizacion, ev_ventas, ev_ebitda_ltm, ev_ebitda_ntm, per_ntm, crecimiento_pct, margen_ebitda_pct, roic_pct, dn_ebitda, fcf_yield_pct }) => ({ nombre, ticker, pais, capitalizacion, ev_ventas, ev_ebitda_ltm, ev_ebitda_ntm, per_ntm, crecimiento_pct, margen_ebitda_pct, roic_pct, dn_ebitda, fcf_yield_pct }));
const D = {
  _estado: 'completo',
  identificacion: {
    nombre: 'Hammond Power Solutions Inc.', nombre_corto: 'Hammond Power', ticker: 'HPS.A', isin: null, mercado: 'Toronto Stock Exchange', indice_referencia: 'S&P/TSX Composite (XIC.TO)',
    pais: 'Canadá', pais_iso: 'CA', sector: 'Industria', industria: 'Equipos eléctricos', sede: 'Guelph (Ontario)', fundacion: null, empleados: 2700, web: 'https://www.hammondpowersolutions.com',
    precio: bolsa.identificacion.precio, fecha_precio: bolsa.identificacion.fecha_precio, acciones: 11.904924, capitalizacion_publicada: null, free_float_pct: 73.1,
    max_52s: bolsa.identificacion.max_52s, min_52s: bolsa.identificacion.min_52s, volumen_medio_diario: `≈ ${bolsa.volumen_3m.importe_dia_millones.toString().replace('.', ',')} M CAD/día (3 meses)`, proximos_resultados: '2026-10-29',
  },
  consenso: {
    guidance: 'HPS no publica guía de ventas ni de beneficio [A1, A6]. Lo que ha dicho: capex de 35-40 M en 2026 y ≈50 M para la primera fase de Fort Worth (producción desde el 4T27, ≈250 M de capacidad), sin más subidas de precio en 2026, AEG con ventas en 2026 parecidas a las de 2025 (≈326 M CAD) y que la compra elevará el BPA ajustado el primer año completo; cartera que da visibilidad para el resto de 2026 [A13, D15, D11]. Última confirmación: conferencia del 31-jul-2026 y comunicado de Fort Worth del 22-sep-2026.',
    estimaciones: [
      { periodo: '2026e', ingresos: 1412, ebitda: 216.1, ebit: 128, bpa: 7.675, dpa: 1.099, fuente: 'MarketScreener (8 analistas) [D2]' },
      { periodo: '2027e', ingresos: 1716, ebitda: 265.2, ebit: 172.4, bpa: 11.39, dpa: 1.098, fuente: 'MarketScreener (8 analistas) [D2]' },
      { periodo: '2028e', ingresos: 1920, ebitda: 316.6, ebit: 205.9, bpa: 12.88, dpa: 1.098, fuente: 'MarketScreener (8 analistas) [D2]' },
    ],
    recomendaciones: { n_analistas: 8, comprar: 7, mantener: 0, vender: 0, po_medio: 383.5, po_min: 350, po_max: 405 },
    revisiones: 'Solo MarketScreener da estimaciones completas; MarketBeat confirma el objetivo medio (382,57 frente a 383,50) y que todas las recomendaciones son de compra (7 de 7) [D2, D3, D4]. Yahoo da un BPA ajustado de 10,78 para 2026 y 11,88 para 2027 [D5]: el de MarketScreener para 2026 (7,68) parece en base publicada, con los pagos en acciones y los costes de AEG, y el de 2027 (11,39) ya casi ajustado. Los objetivos han subido todo el año: National Bank pasó de 235 (abril) a 325 (mayo), 355 (junio) y 380 (13-oct) [D3, D14]. El consenso de ventas de 2026 (1.412 M) incluye medio año de AEG.',
    base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: 1.0,
    confianza: 'Media',
  },
  bolsa: {
    tipo_rentabilidad: b.tipo_rentabilidad,
    rentabilidades: b.rentabilidades,
    anual: b.anual,
    beta: b.beta, volatilidad_pct: b.volatilidad_pct, max_drawdown_pct: b.max_drawdown_pct, posicion_corta_pct: null,
    comentario: null,
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: bolsa.cierres_ejercicio.filter((c) => +c.anio >= 2021).map((c) => ({ anio: c.anio, precio_cierre: c.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    comentario: null,
    confianza: 'Media',
  },
  comparables: {
    criterio: null,
    empresas: compsSin,
    comentario: null,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2026-02', objetivo: 'AEG Power Solutions (SAI industriales)', comprador: 'Hammond Power Solutions', ev: 365, ev_ventas: 1.12, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Ventas de 2025 ≈326 M CAD; EBITDA no publicado [D11].' },
      { fecha: '2025-10', objetivo: 'Prolec GE (50 % restante)', comprador: 'GE Vernova', ev: 14931, ev_ventas: 3.52, ev_ebitda: 14.1, prima_pct: null, excluir: false, comentario: '5.275 M USD por el 50 % → 10.550 M USD por el 100 % (sin deuda neta publicada), sobre 3.000 M USD de ventas y ≈750 M de EBITDA ajustado de 2025 [D9]. Estimación propia del múltiplo; 1,4154 CAD/USD.' },
      { fecha: '2025-06', objetivo: 'DMC Power (conectores de red)', comprador: 'Hubbell', ev: 1168, ev_ventas: 6.35, ev_ebitda: 13.8, prima_pct: null, excluir: false, comentario: '825 M USD sobre ventas de ≈130 M y EBITDA de ≈60 M previstos para 2026 [D8].' },
      { fecha: '2025-03', objetivo: 'Fibrebond (salas eléctricas modulares para centros de datos)', comprador: 'Eaton', ev: 1982, ev_ventas: 3.7, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '1.400 M USD sobre ≈378 M USD de ventas de 12 meses [D10].' },
      { fecha: '2024-10', objetivo: 'Micron Industries (transformadores de control)', comprador: 'Hammond Power Solutions', ev: 21.2, ev_ventas: 0.69, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Ventas de 26,7-30,6 M antes de la compra [D12].' },
    ],
    comentario: null,
    confianza: 'Media',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'bolsa', campo: 'posición corta', tipo: 'Complemento', intentos: '1) IIROC/CIRO (informes de cortos no abren sin navegador); 2) TMX Money (JavaScript); 3) MarketBeat (sin dato para HPS.A)', decision: 'Omitido' },
    { seccion: 'comparables', campo: 'EV/EBITDA de los próximos 12 meses de los comparables', tipo: 'Complemento', intentos: '1) Yahoo earningsTrend (solo BPA y ventas); 2) MarketScreener por comparable (bloqueo 403 por curl); 3) Stock Analysis (solo LTM)', decision: 'Omitido' },
    { seccion: 'identificacion', campo: 'ISIN', tipo: 'Complemento', intentos: '1) Informes anuales y trimestrales (no lo citan); 2) web de inversores; 3) MarketScreener (no lo muestra en texto)', decision: 'Omitido' },
  ],
};
guarda('D', D);

// ================================================================ E. Sentimiento
const fE = [
  { id: 1, titulo: 'Stockchase: opiniones de expertos sobre HPS.A (7 en 12 meses: 5 comprar, 2 mantener)', editor: 'Stockchase', tipo: 'Foros y redes', fecha: '2026-10-16', url: 'https://stockchase.com/company/view/3040/HPSA-T' },
  { id: 2, titulo: 'Stocktwits: mensajes de $HPS.A.TSX (mayo-octubre de 2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-15', url: 'https://stocktwits.com/symbol/HPS.A.CA' },
  { id: 3, titulo: 'Seeking Alpha: análisis y noticias de Hammond Power (RSS: «Capacity Has Arrived Just As AI Power Demand Accelerates», «Transformer Demand Makes The Premium Worth Paying», Fort Worth)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-09-22', url: 'https://seekingalpha.com/symbol/HMDPF' },
  { id: 4, titulo: 'Hammond Power Solutions stock could cash in big on the data centre boom', editor: 'The Motley Fool Canada', tipo: 'Foros y redes', fecha: '2026-09-28', url: 'https://www.fool.ca/2026/09/28/hammond-power-solutions-stock-could-cash-in-big-on-the-data-centre-boom/' },
];
const E = {
  _estado: 'completo',
  sentimiento: {
    tono: 'Positivo', tendencia: 'Estable',
    revisadas: [
      { plataforma: 'Stockchase (opiniones de gestores en televisión)', fecha: '2026-10', n_comentarios: 7, tono: 'Positivo', resumen: 'Cinco de siete opiniones de compra en 12 meses; la última (2-oct) la mantiene como «past top pick» por ser el mayor fabricante norteamericano ligado a la IA. Un gestor la vigila pero duda del historial de rentabilidad sobre el capital [1].' },
      { plataforma: 'Stocktwits ($HPS.A.TSX)', fecha: '2026-10', n_comentarios: 30, tono: 'Dividido', resumen: 'Mucho análisis técnico (medias de 50 y 200 sesiones, soportes en 200-224 y 290) y objetivos de 360-500; entusiasmo con Fort Worth («big for 2028») y quejas por la volatilidad («staircase up, elevator down») [2].' },
      { plataforma: 'Seeking Alpha (artículos)', fecha: '2026-09', n_comentarios: 5, tono: 'Positivo', resumen: 'Artículos que defienden pagar la prima por la demanda de transformadores y la capacidad que llega «justo cuando acelera la demanda de IA» [3].' },
      { plataforma: 'Motley Fool Canadá', fecha: '2026-09', n_comentarios: 1, tono: 'Positivo', resumen: 'Presenta la acción como beneficiada del auge de los centros de datos; en Stocktwits se le reprocha que «la sigue empujando» [4, 2].' },
    ],
    temas: [
      { tema: 'Beneficiaria de los centros de datos y la IA', postura: 'Alcista', peso: 'Alto', contraste: 'Cierto en ventas (algo más del 30 % de las ventas y cartera doblada), pero el margen EBITDA ajustado (16,4 %) sigue muy por debajo de los rivales y la cartera ya baja en trimestres [A6, A13].' },
      { tema: 'Volatilidad y análisis técnico', postura: 'Dividida', peso: 'Alto', contraste: 'La volatilidad de 60 sesiones es del 61 % y los movimientos fuertes coinciden con los de Vertiv y Powell: es un valor del tema IA más que de su propia noticia [D13].' },
      { tema: 'Fort Worth y la capacidad para 2028', postura: 'Alcista', peso: 'Medio', contraste: 'Añade ≈250 M de capacidad desde el 4T27 por ≈50 M de inversión, pero hay que llenarla en 2028, cuando entran también las plantas de los rivales [D15].' },
      { tema: 'Rentabilidad sobre el capital irregular', postura: 'Bajista', peso: 'Bajo', contraste: 'Fue de un dígito antes de 2022; hoy es alta, pero con AEG (365 M) el capital invertido casi se duplica [A1, A6].' },
    ],
    lectura: 'El tono de particulares y gestores es claramente positivo y coincide con el de los analistas (siete compras, objetivo medio un 56 % por encima del precio) [D3, D4]. No hay capitulación tras la caída del 32 % desde el máximo de junio: la conversación es técnica y de momento del tema IA. Eso es una señal de que el precio depende más del sentimiento sobre los centros de datos que de la empresa. Ningún dato del informe sale de los foros.',
    confianza: 'Media',
  },
  fuentes: fE,
  huecos: [
    { seccion: 'sentimiento', campo: 'Stockhouse y Reddit', tipo: 'Complemento', intentos: '1) Stockhouse (403); 2) Reddit (403); 3) Seeking Alpha comentarios (solo RSS de títulos)', decision: 'Omitido' },
  ],
};
guarda('E', E);
console.log('Notas A-E escritas.');
