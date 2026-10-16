// Escribe las notas A-E de TMX Group (corte 2026-10-16). Sin XBRL público en Canadá (SEDAR+ no abre): cuentas de los
// informes anuales 2025 y 2024 (estados auditados) y de las notas de resultados del 4T22 (2022 y 2021), comprobadas entre sí;
// mercado de bolsa.mjs; resto de documentos de notas/docs y de la web. Cada nota cita solo con [n] de su propia lista.
// Ejecutar: node informes/tmx-group-2026-10-16/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const bolsa = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));

const Q4 = 'https://s21.q4cdn.com/671813756/files';
const URL = {
  ar25: `${Q4}/doc_financials/2025/ar/TMX_2025_Annual-Report_EN_Web.pdf`,
  mda25: `${Q4}/doc_financials/2025/q4/TMX-Group-Limited-YE-2025-MD-A_EN_Final.pdf`,
  ar24: `${Q4}/doc_financials/2024/ar/TMX_2024_Annual-Report_EN_Web.pdf`,
  mda24: `${Q4}/doc_financials/2024/q4/TMX-Group-Limited-YE-2024-MD-A-EN.pdf`,
  q422: `${Q4}/doc_news/2023/02/1/TMX-Group-Limited-Reports-Results-for-Fourth-Quarter-of-2022-2023.pdf`,
  q421: `${Q4}/doc_news/2022/02/1/q4-release-2022-02-07-en.pdf`,
  pr226: `${Q4}/doc_financials/2026/q2/TMX-Group-Limited-Q2-2026-Press-Release_EN-FINAL.pdf`,
  fs226: `${Q4}/doc_financials/2026/q2/EN-_-TMX-Group-Limited-Q2-2026-Financial-Statements.pdf`,
  qr226: `${Q4}/doc_financials/2026/q2/TMX_2026_Q2_Quarterly-Report_EN_Web.pdf`,
  mda126: `${Q4}/doc_financials/2026/q1/TMX-Group-Limited-Q1-2026-MDA-EN.pdf`,
  tr425: `${Q4}/doc_financials/2025/q4/Q4-2025-Analyst-Call-Transcript-docx.pdf`,
  cboe: `${Q4}/doc_events/2026/Apr/22/TMX-Group-to-Expand-into-Australia-and-Strengthen-Canadian-Market.pdf`,
  rafi: `${Q4}/doc_news/TMX-Group-Limited-Completes-Acquisition-of-RAFI-Indices-from-Research-Affiliates-2026.pdf`,
  rafiAnuncio: 'https://www.newsfilecorp.com/release/301158/TMX-Group-Limited-Announces-Agreement-to-Acquire-RAFI-Indices-from-Research-Affiliates',
  fechaQ3: `${Q4}/doc_news/TMX-Group-Limited-Announces-Release-Date-for-Q3-2026-Financial-Results-and-Analyst-Conference-Call-2026.pdf`,
  circ: `${Q4}/doc_financials/2025/ar/Management-Information-Circular_EN_Web.pdf`,
};

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Informe anual 2025: estados financieros consolidados auditados 2025 y 2024 (balance, cuenta, flujos), notas de segmentos, geografías y empleados', editor: 'TMX Group Limited', tipo: 'Primaria', fecha: '2026-03-16', url: URL.ar25 },
  { id: 2, titulo: 'MD&A anual 2025 (conciliación del beneficio ajustado, objetivos, precios 2026, segmentos por línea de negocio)', editor: 'TMX Group Limited', tipo: 'Primaria', fecha: '2026-02-05', url: URL.mda25 },
  { id: 3, titulo: 'Informe anual 2024: estados financieros consolidados auditados 2024 y 2023', editor: 'TMX Group Limited', tipo: 'Primaria', fecha: '2025-03', url: URL.ar24 },
  { id: 4, titulo: 'MD&A anual 2024 (información trimestral 2023-2024, beneficio ajustado 2024 y 2023)', editor: 'TMX Group Limited', tipo: 'Primaria', fecha: '2025-02-03', url: URL.mda24 },
  { id: 5, titulo: 'TMX Group Limited Reports Results for Fourth Quarter of 2022 (estados consolidados de 2022 y 2021, beneficio ajustado)', editor: 'TMX Group Limited', tipo: 'Primaria', fecha: '2023-02-06', url: URL.q422 },
  { id: 6, titulo: 'TMX Group Limited Reports Results for Fourth Quarter of 2021 (cifras anuales 2021 y 2020)', editor: 'TMX Group Limited', tipo: 'Primaria', fecha: '2022-02-07', url: URL.q421 },
  { id: 7, titulo: 'TMX Group Limited Reports Results for the Second Quarter of 2026 (nota de resultados)', editor: 'TMX Group Limited', tipo: 'Primaria', fecha: '2026-07-30', url: URL.pr226 },
  { id: 8, titulo: 'Estados financieros consolidados intermedios a 30-jun-2026 (balance, cuenta, flujos, deuda, recompras, hechos posteriores)', editor: 'TMX Group Limited', tipo: 'Primaria', fecha: '2026-07-30', url: URL.fs226 },
  { id: 9, titulo: 'Q2 2026 Report to Shareholders (MD&A del 2T26: iniciativas, acciones en circulación a 27-jul-2026)', editor: 'TMX Group Limited', tipo: 'Primaria', fecha: '2026-08-20', url: URL.qr226 },
  { id: 10, titulo: 'Q4 2025 Analyst Call Transcript', editor: 'TMX Group Limited', tipo: 'Primaria', fecha: '2026-02-06', url: URL.tr425 },
];

// Cuenta publicada (NIIF; presentación por naturaleza: personal, sistemas, generales y amortización). BPA diluido de 2021 y
// 2022 dividido entre 5 por el desdoblamiento 5×1 de jun-2023; acciones diluidas medias ×5 en esos años.
// resultado_financiero = BAI − EBIT: incluye costes financieros netos, la participación en asociadas y «otros ingresos»
// (2022: plusvalía de 177,9 M por la toma de control de BOX; 2024: 57,1 M por la revalorización de VettaFi).
// gastos_financieros = intereses pagados (estado de flujos): la empresa no separa el gasto por intereses en la cuenta.
const cuenta = [
  { periodo: '2021', ingresos: 980.7, coste_ventas: null, gastos_generales: null, ebitda: 578.3, amortizaciones: 87.1, ebit: 491.2, resultado_financiero: -11.9, bai: 479.3, impuestos: 140.8, minoritarios: 0, beneficio_neto: 338.5, gastos_financieros: 34.6, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 1.198, dpa: 0.616, dpa_extraordinario: 0, acciones_diluidas: 282.4 },
  { periodo: '2022', ingresos: 1116.6, coste_ventas: null, gastos_generales: null, ebitda: 638.3, amortizaciones: 113.8, ebit: 524.5, resultado_financiero: 145.8, bai: 670.3, impuestos: 88.5, minoritarios: 39.1, beneficio_neto: 542.7, gastos_financieros: 37.0, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 1.938, dpa: 0.664, dpa_extraordinario: 0, acciones_diluidas: 280.0 },
  { periodo: '2023', ingresos: 1194.1, coste_ventas: null, gastos_generales: null, ebitda: 652.5, amortizaciones: 112.5, ebit: 540.0, resultado_financiero: -22.6, bai: 517.4, impuestos: 129.2, minoritarios: 32.2, beneficio_neto: 356.0, gastos_financieros: 47.2, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 1.28, dpa: 0.71, dpa_extraordinario: 0, acciones_diluidas: 279.0 },
  { periodo: '2024', ingresos: 1460.1, coste_ventas: null, gastos_generales: null, ebitda: 807.9, amortizaciones: 165.6, ebit: 642.3, resultado_financiero: 27.3, bai: 669.6, impuestos: 142.7, minoritarios: 45.4, beneficio_neto: 481.5, gastos_financieros: 83.9, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 1.9, bpa: 1.73, dpa: 0.75, dpa_extraordinario: 0, acciones_diluidas: 278.7 },
  { periodo: '2025', ingresos: 1717.2, coste_ventas: null, gastos_generales: null, ebitda: 951.7, amortizaciones: 180.7, ebit: 771.0, resultado_financiero: -129.2, bai: 641.8, impuestos: 163.8, minoritarios: 62.3, beneficio_neto: 415.7, gastos_financieros: 89.9, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 33.4, bpa: 1.49, dpa: 0.84, dpa_extraordinario: 0, acciones_diluidas: 279.6 },
];

// Balance analítico: se restan de activo y pasivo los saldos de participantes y miembros compensadores de las cámaras
// (CDS, CDCC: 41.978,5 M en 2025) y las retenciones fiscales de participantes (efectivo restringido que se compensa con
// un pasivo igual). Fondo de comercio e intangibles van juntos (una sola línea en el balance). Caja = caja + valores negociables.
const balance = [
  { periodo: '2021', activo_total: 5905.9, activo_corriente: 506.8, pasivo_corriente: 225.5, pasivo_total: 2199.8, fondo_comercio: 5156.9, intangibles: 0, inmovilizado_material: null, existencias: 0, clientes: 132.6, proveedores: 152.8, activos_contrato: null, pasivos_contrato: null, caja: 341.6, deuda_financiera: 999.1, arrendamientos: 88.3, patrimonio_neto: 3706.1, minoritarios: 0, reservas: 817.1 },
  { periodo: '2022', activo_total: 6408.2, activo_corriente: 687.6, pasivo_corriente: 437.5, pasivo_total: 2200.8, fondo_comercio: 5517.6, intangibles: 0, inmovilizado_material: null, existencias: 0, clientes: 156.5, proveedores: 131.4, activos_contrato: null, pasivos_contrato: null, caja: 493.1, deuda_financiera: 1011.8, arrendamientos: 87.6, patrimonio_neto: 3987.2, minoritarios: 220.2, reservas: 1178.3 },
  { periodo: '2023', activo_total: 6606.9, activo_corriente: 657.9, pasivo_corriente: 834.2, pasivo_total: 2285.2, fondo_comercio: 5499.5, intangibles: 0, inmovilizado_material: null, existencias: 0, clientes: 191.0, proveedores: 182.6, activos_contrato: null, pasivos_contrato: null, caja: 419.6, deuda_financiera: 1055.1, arrendamientos: 85.1, patrimonio_neto: 4107.6, minoritarios: 214.1, reservas: 1340.1 },
  { periodo: '2024', activo_total: 8271.9, activo_corriente: 748.3, pasivo_corriente: 552.7, pasivo_total: 3449.8, fondo_comercio: 7276.9, intangibles: 0, inmovilizado_material: null, existencias: 0, clientes: 260.5, proveedores: 252.5, activos_contrato: null, pasivos_contrato: null, caja: 433.4, deuda_financiera: 2069.0, arrendamientos: 94.6, patrimonio_neto: 4577.4, minoritarios: 244.7, reservas: 1622.8 },
  { periodo: '2025', activo_total: 8498.0, activo_corriente: 899.7, pasivo_corriente: 897.5, pasivo_total: 3525.9, fondo_comercio: 7320.4, intangibles: 0, inmovilizado_material: null, existencias: 0, clientes: 313.2, proveedores: 301.4, activos_contrato: null, pasivos_contrato: null, caja: 512.9, deuda_financiera: 2057.2, arrendamientos: 100.5, patrimonio_neto: 4757.8, minoritarios: 214.3, reservas: 1814.7 },
];

// Flujos: TMX clasifica los intereses pagados en financiación (se restan con intereses_en_financiacion).
// dividendos = a los accionistas de TMX (los de BOX a minoritarios, aparte: 25,5 / 33,3 / 38,5 / 81,7 M en 2022-2025).
const flujos = [
  { periodo: '2021', flujo_operativo: 441.4, capex: 51.2, pagos_arrendamientos: 8.4, adquisiciones: 138.4, desinversiones: 0, dividendos: 168.9, recompras: 84.4, emision_acciones: 15.1, intereses_en_financiacion: 34.6 },
  { periodo: '2022', flujo_operativo: 444.1, capex: 51.9, pagos_arrendamientos: 9.7, adquisiciones: 11.2, desinversiones: 56.2, dividendos: 185.1, recompras: 74.3, emision_acciones: 26.6, intereses_en_financiacion: 37.0 },
  { periodo: '2023', flujo_operativo: 524.9, capex: 65.2, pagos_arrendamientos: 10.6, adquisiciones: 244.9, desinversiones: 0, dividendos: 196.9, recompras: 79.9, emision_acciones: 16.1, intereses_en_financiacion: 47.2 },
  { periodo: '2024', flujo_operativo: 623.4, capex: 73.7, pagos_arrendamientos: 14.4, adquisiciones: 1127.5, desinversiones: 0, dividendos: 208.1, recompras: 0, emision_acciones: 24.2, intereses_en_financiacion: 83.9 },
  { periodo: '2025', flujo_operativo: 764.8, capex: 121.2, pagos_arrendamientos: 9.5, adquisiciones: 81.8, desinversiones: 0, dividendos: 233.6, recompras: 0, emision_acciones: 8.6, intereses_en_financiacion: 89.9 },
];

const seg = (nombre, descripcion, filas) => ({ nombre, descripcion, tipo_resultado: 'EBIT', historico: filas.map(([periodo, ingresos, resultado]) => ({ periodo, ingresos, resultado })) });
const A = {
  _estado: 'completa',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 1852.1, ebitda: 1053.1, ebit: 863.2, beneficio_neto: 602.9, bpa: 2.17, dpa: 0.92, dpa_extraordinario: 0, fcf: 559.1, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 26.6 },
    cambios_perimetro: [
      { periodo: '2021', descripcion: 'AST Canada (transferencia de valores), comprada el 12-ago-2021 por 138,4 M netos de caja: entra en balance y en cinco meses de la cuenta.' },
      { periodo: '2022', descripcion: 'BOX Options Market, consolidada desde el 3-ene-2022 al tomar el control de voto (47,9 % económico; 52,1 % minoritarios): plusvalía no monetaria de 177,9 M en «otros ingresos».' },
      { periodo: '2024', descripcion: 'VettaFi (índices y distribución digital), 100 % desde el 2-ene-2024 por 1.126,5 M netos de caja (antes participada al 22 %): revalorización de 57,1 M en «otros ingresos»; Newsfile desde el 7-ago-2024.' },
    ],
    comentario: 'Los ingresos crecieron de 980,7 M en 2021 a 1.717,2 M en 2025, un 15,0 % anual compuesto, con dos partes de compras: BOX añadió 118,5 M en 2022 y VettaFi la mayor parte de los 185,5 M que ganó Global Insights en 2024 [5, 4]. El orgánico fue del 15 % en 2025 (sin Bond Indices, ETF Stream, Verity y los índices nucleares) y del 12 % en el 2T26 [10, 7]. El margen EBITDA publicado bajó de 59,0 % en 2021 a 54,6 % en 2023 por la mezcla (BOX y VettaFi tienen márgenes menores que la bolsa canadiense) y la inflación de personal, y ha vuelto a 55,4 % en 2025 y 57,7 % en el 1S26 por apalancamiento operativo: los ingresos del 1S26 suben un 16 % y los gastos un 9 % [1, 8]. El beneficio neto publicado es ruidoso: 2022 lleva 177,9 M de plusvalía de BOX, 2024 57,1 M de VettaFi, 2025 38,5 M de pérdidas de cambio en préstamos internos en dólares y 26,5 M de ajustes de pagos contingentes, y el 1S26 83,8 M de un acuerdo judicial cobrado [5, 2, 8].',
    ajustes: 'Usamos cifras publicadas. TMX publica un BPA ajustado que suma la amortización de intangibles de compras (114,4 M antes de impuestos en 2025), los costes de compras e integración (10,1 M), litigios (14,1 M), la reorganización de 2025 (12,0 M), el cargo del registro de auditoría consolidado de BOX (7,3 M), los ajustes de pagos contingentes (26,5 M) y las diferencias de cambio de la financiación interna (38,5 M): 2,13 CAD en 2025 frente a 1,49 publicados [2]. En `no_recurrentes_en_ebitda` solo devolvemos litigios, reorganización y el cargo de BOX (33,4 M en 2025; 26,6 M en los 12 meses a junio de 2026): los costes de compras se repiten cada año en un comprador en serie y los dejamos dentro. El acuerdo judicial de 83,8 M del 1T26 está en «otros ingresos», fuera del EBITDA [8].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '3T24', ingresos: 353.8, crecimiento_pct: 23.1, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.30, vs_consenso: null },
      { periodo: '4T24', ingresos: 393.3, crecimiento_pct: 30.4, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.58, vs_consenso: null },
      { periodo: '1T25', ingresos: 419.1, crecimiento_pct: 21.2, crecimiento_organico_pct: null, ebitda: 225.2, margen_ebitda_pct: 53.7, bpa: 0.38, vs_consenso: null },
      { periodo: '2T25', ingresos: 421.7, crecimiento_pct: 14.9, crecimiento_organico_pct: null, ebitda: 236.7, margen_ebitda_pct: 56.1, bpa: 0.26, vs_consenso: null },
      { periodo: '3T25', ingresos: 418.6, crecimiento_pct: 18.3, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.43, vs_consenso: null },
      { periodo: '4T25', ingresos: 457.8, crecimiento_pct: 16.4, crecimiento_organico_pct: 13.0, ebitda: null, margen_ebitda_pct: null, bpa: 0.41, vs_consenso: null },
      { periodo: '1T26', ingresos: 488.2, crecimiento_pct: 16.5, crecimiento_organico_pct: null, ebitda: 287.4, margen_ebitda_pct: 58.9, bpa: 0.81, vs_consenso: null },
      { periodo: '2T26', ingresos: 487.5, crecimiento_pct: 15.6, crecimiento_organico_pct: 12.0, ebitda: 275.9, margen_ebitda_pct: 56.6, bpa: 0.51, vs_consenso: 'Superior' },
    ],
    ultima_presentacion: 'En la conferencia del 4T25 (6-feb-2026) la dirección vendió «el mejor año de la historia»: ingresos +18 %, orgánico +15 %, BPA ajustado +25 %, deuda sobre EBITDA ajustado de 2,2 veces (1,9 neta del exceso de caja) y dividendo +9 % [10]. Los analistas preguntaron sobre todo por Trayport (ingresos planos varios trimestres, aunque el ingreso recurrente anualizado sube un 17 % a 276 M CAD) y por las palancas de Montreal Exchange cuando se acaben los programas de creadores de mercado; la respuesta fue la de siempre: crecimiento «alto un dígito a doble dígito» a largo plazo, nuevos activos (petróleo refinado) y nuevas geografías, sin cifras de corto plazo [10]. El discurso cambió entre el 4T25 y el 2T26: de ejecutar a comprar. En seis meses TMX anunció Cboe Australia y Canadá (409,9 M), RAFI Indices (683,2 M) y la combinación de BOX con MEMX (unos 1.127 M de efectivo por el 59 %), y recompró 151,2 M de acciones [8, 9]. El 2T26 batió: ingresos +16 %, orgánico +12 %, BPA ajustado 0,62 CAD (+19 %) con todos los segmentos a doble dígito [7]. Lo que la dirección no detalla es la rentabilidad esperada de MEMX ni su efecto en la deuda: solo que el cierre será en el 2S27 y que el apalancamiento quedará en el rango de 1,5-2,5 veces [9].',
    confianza: 'Alta',
  },
  balance: {
    historico: balance,
    vencimientos: [
      { anio: '2026', importe: 118.3 }, { anio: '2027', importe: 300.0 }, { anio: '2028', importe: 200.0 }, { anio: '2029', importe: 350.0 },
      { anio: '2031', importe: 250.0 }, { anio: '2032', importe: 300.0 }, { anio: '2034+', importe: 450.0 },
    ],
    liquidez: 'A 30-jun-2026: caja 374,8 M + valores negociables 142,5 M (TMX retiene unos 240 M por motivos regulatorios); línea revolving de 700 M a 2031 sin disponer, que respalda el papel comercial (99,7 M emitidos); préstamo a plazo de 300 M a may-2027 con opción de ampliarlo en 490 M USD para RAFI [8, 10].',
    rating: 'Morningstar DBRS: AA (bajo), perspectiva estable (deuda sénior); papel comercial R-1 (medio) [8].',
    coste_deuda_pct: 4.4,
    vida_media_anios: 4.4,
    otros_pasivos: 'Fuera del balance analítico quedan los saldos de participantes y miembros compensadores de CDS y CDCC (42.509,4 M a 30-jun-2026), que se compensan activo con pasivo, y el colateral no monetario, que no figura en el balance [8, 1]. Pensiones: planes de prestación definida con ganancias actuariales cada año (8,0 M en el 1S26), sin déficit relevante [8]. Pagos contingentes de compras (Newsfile, iNDEX Research, ROBO Global) dentro de otros pasivos: generaron 26,5 M de gasto en 2025 y 6,8 M en el 1S26 [2, 7]. Compromisos posteriores al balance: RAFI Indices (683,2 M, cerrada el 18-ago-2026), Cboe Australia y Canadá (409,9 M; Australia cerrada en el 3T26, Canadá pendiente) y unos 1.126,6 M en efectivo para MEMX (cierre previsto en el 2S27) [8, 9]. Sin covenants financieros publicados; el objetivo interno es 1,5-2,5 veces la deuda sobre el EBITDA ajustado [10].',
    comentario: 'La deuda financiera pasó de 999 M en 2021 a 2.069 M en 2024 por VettaFi (1.126,5 M) y desde entonces se mantiene: 1.963,9 M a junio de 2026 tras devolver la serie J (300 M) con un préstamo a plazo [8]. El circulante comercial es casi nulo (clientes 313 M frente a proveedores 301 M en 2025) y los ingresos diferidos se cobran por adelantado en el 1T de cada año [1]. Lo que viene cambia el perfil: RAFI y Cboe suman 1.093 M en efectivo y MEMX otros 1.127 M; con todo, la deuda bruta rondaría los 4.200 M frente a un EBITDA ajustado de unos 1.100 M (estimación propia: 3,8 veces antes de sumar el EBITDA de MEMX), por encima del rango de 1,5-2,5 veces que la dirección dice mantener [8, 9].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'El flujo operativo (antes de intereses, que TMX clasifica en financiación) subió de 441 M en 2021 a 765 M en 2025; después de capex, arrendamientos e intereses el flujo libre fue de 544 M en 2025, un 131 % del beneficio neto atribuido publicado y un 91 % del ajustado [1, 2]. El capex saltó a 121,2 M (7,1 % de los ingresos) en 2025 por la modernización de CDS (149,9 M capitalizados desde 2019) y vuelve a la normalidad en 2026: 28,7 M en el 1S26 [2, 8]. Estimación propia: el capex de mantenimiento ronda el 3,5-4 % de los ingresos (la amortización sin la de intangibles de compras) y el resto es crecimiento (AlphaX US, Trayport, VettaFi). Los usos de la caja en cinco años: 2.596 M en compras, 993 M en dividendos, 239 M en recompras (más 151 M en el 1S26) [1, 3, 5, 8].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'KPMG LLP', anios_auditor: 14, opinion: 'Favorable',
    comentario: 'KPMG audita desde 2012 y su opinión de 2025 es favorable sin salvedades [1]. Las cifras tienen tres fuentes de ruido que hay que separar: plusvalías por revalorizar participadas al tomar el control (BOX 2022, VettaFi 2024), diferencias de cambio no monetarias de préstamos internos en dólares (−38,5 M en 2025, +29,4 M en el 1S26) y cambios de valor de pagos contingentes; todas van por debajo del EBIT. La amortización de intangibles de compras (114,4 M) es el 63 % de la amortización total: por eso el BPA ajustado (2,13) queda un 43 % por encima del publicado (1,49) [2]. La revisión de 2024 (nota 2(G)) movió impuestos diferidos y otros activos sin tocar el resultado [1]. Las remuneraciones en acciones son pequeñas (plan de opciones de 2,0 M al año; el nuevo plan ómnibus reserva 9,7 M de acciones) [8]. Lectura de los indicadores del motor en el texto de la sección: con un balance sin existencias y con saldos de cámara excluidos, el Altman Z no es representativo; el Beneish M y el Piotroski F sí aportan.',
    senales: [
      { senal: 'BPA ajustado muy por encima del publicado', nivel: 'Media', comentario: 'Diferencia del 43 % en 2025 (2,13 frente a 1,49): la amortización de compras es real como consumo del precio pagado; usamos el ajustado solo para la historia del PER y lo decimos [2].' },
      { senal: 'Ingresos de tesorería de clientes', nivel: 'Baja', comentario: 'TSX Trust y CDS cobran intereses de saldos de clientes; TMX Corporate Solutions bajó un 5 % en el 4T25 por menores tipos [10].' },
      { senal: 'Pagos contingentes y litigios recurrentes', nivel: 'Baja', comentario: '26,5 M de ajustes de pagos contingentes y 14,1 M de litigios en 2025; el 1S26 incluye un cobro judicial de 91,1 M que no se repetirá [2, 8].' },
    ],
    confianza: 'Media',
  },
  rentabilidad: { comentario: null, confianza: 'Media' },
  capital: {
    politica: 'Dividendo del 40-50 % del BPA ajustado: 0,26 CAD trimestrales desde el 3T26 (+8 %), tras +9 % en el 1T26 [8, 10]. Recompras: programa de 2026 (27-feb-2026 a 26-feb-2027) ampliado en mayo a 5,6 M de acciones (2 %); 2,97 M recompradas a 50,88 CAD en el 1S26 (151,2 M) [8]. Prioridades declaradas: crecer en mercados privados, posnegociación, ETF e índices y nuevas geografías (objetivo TM2X de duplicar los ingresos de 1.000 a 2.000 M en 5-7 años), con deuda de 1,5-2,5 veces el EBITDA ajustado [2].',
    adquisiciones: [
      { anio: '2021', objetivo: 'AST Canada (transferencia de valores)', importe: 138.4, ev_ebitda: null, financiacion: 'Caja y papel comercial', resultado: 'Integrada en TSX Trust; aportó 33,6 M de ingresos en 2022 [5]; el negocio de intereses de clientes cae con los tipos.' },
      { anio: '2022', objetivo: 'BOX Options Market (control, 47,9 % económico)', importe: null, ev_ebitda: null, financiacion: 'Opción de compra ejercida; plusvalía de 177,9 M', resultado: 'Ingresos de BOX +16 % en el 4T25 y volumen +27 % en 2025; se combinará con MEMX (59 % de TMX) en el 2S27 [10, 9].' },
      { anio: '2024', objetivo: 'VettaFi (78 % restante; índices y distribución digital)', importe: 1126.5, ev_ebitda: null, financiacion: 'Deuda (emisión de 1.892 M en obligaciones en 2024)', resultado: 'Ingresos de VettaFi +24 % en 2025 y +40 % en el 2T26; activos replicados de 77.000 M USD (+49 %) [10, 7].' },
      { anio: '2025', objetivo: 'Verity (gestión de análisis para gestoras)', importe: 136.2, ev_ebitda: null, financiacion: 'Caja (97,8 M USD)', resultado: 'Aportó 7,9 M de ingresos en el 4T25 [10].' },
      { anio: '2026', objetivo: 'RAFI Indices (índices fundamentales)', importe: 683.2, ev_ebitda: 12.9, financiacion: 'Préstamo a plazo y papel comercial', resultado: 'Cerrada el 18-ago-2026; triplica los activos replicados de VettaFi [9].' },
      { anio: '2026', objetivo: 'Cboe Australia y Cboe Canada', importe: 409.9, ev_ebitda: null, financiacion: 'Caja y deuda', resultado: 'Australia cerrada en el 3T26; Canadá pendiente de aprobación. Ingresos conjuntos de unos 87 M en 2025 [9].' },
    ],
    comentario: null,
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      seg('Global Insights', 'Datos (TMX Datalinx, Verity, WSH), índices y distribución digital (TMX VettaFi) y plataforma de negociación de energía europea (TMX Trayport).', [['2023', 419.0, 262.9], ['2024', 604.5, 367.3], ['2025', 701.8, 432.6]]),
      seg('Derivados: negociación y compensación', 'Montreal Exchange, la cámara CDCC y BOX Options Market (EE. UU.).', [['2023', 274.2, 147.4], ['2024', 329.0, 195.5], ['2025', 434.5, 278.0]]),
      seg('Captación de capital', 'Cotización en TSX y TSX Venture (admisión, mantenimiento y ampliaciones) y TMX Corporate Solutions (TSX Trust, Newsfile).', [['2023', 268.2, 104.8], ['2024', 272.8, 106.3], ['2025', 297.4, 119.0]]),
      seg('Renta variable y fija: negociación y compensación', 'TSX, TSXV, Alpha, AlphaX US, Shorcan y la cámara y depositario CDS.', [['2023', 232.6, 102.5], ['2024', 253.8, 105.7], ['2025', 283.4, 112.8]]),
      seg('Otros y corporativo', 'Costes no asignados y amortización de intangibles de compras.', [['2023', 0.1, -77.6], ['2024', 0, -132.5], ['2025', 0.1, -171.4]]),
    ],
    geografias: [ { nombre: 'Canadá', peso_pct: 49.2 }, { nombre: 'EE. UU.', peso_pct: 31.2 }, { nombre: 'Reino Unido', peso_pct: 6.5 }, { nombre: 'Alemania', peso_pct: 2.9 }, { nombre: 'Otros', peso_pct: 10.2 } ],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Licencias de Trayport', valor_anterior: '9.786 (dic-24)', valor_actual: '10.419 (dic-25)', variacion: '+6,5 %', comentario: 'Base de usuarios de la red de energía europea [1].' },
      { kpi: 'Conexiones de Trayport', valor_anterior: '27.507', valor_actual: '29.413', variacion: '+6,9 %', comentario: 'Conexiones entre operadores, brókeres y bolsas [1].' },
      { kpi: 'Ingreso recurrente anualizado de Trayport', valor_anterior: '≈ 236 M CAD (4T24)', valor_actual: '≈ 276 M CAD (4T25)', variacion: '+17 % (+14 % en GBP)', comentario: 'Precio ligado al IPC británico [10].' },
      { kpi: 'Activos replicados de VettaFi', valor_anterior: '≈ 52.000 M USD (dic-24)', valor_actual: '77.000 M USD (dic-25); ≈ 263.000 M con RAFI', variacion: '+49 %', comentario: 'Base de las comisiones de índices [10, 9].' },
      { kpi: 'Volumen de contratos de MX', valor_anterior: '1S25', valor_actual: '1S26', variacion: '+15 %', comentario: 'Interés abierto +33 % a dic-25 [9, 10].' },
      { kpi: 'Volumen de renta variable canadiense (TSX, TSXV, Alpha)', valor_anterior: '1S25', valor_actual: '1S26', variacion: '+32 %', comentario: 'TSX +27 %, TSXV +60 %, Alpha −4 % [9].' },
    ],
    confianza: 'Alta',
  },
  fuentes: fA,
  huecos: [
    { seccion: 'negocio', campo: 'segmentos (2021-2022)', tipo: 'Complemento', intentos: '1) Informes anuales 2022 y 2023 en q4cdn.com: URL no encontrada (404); 2) nota de resultados del 4T22: solo trae el trimestre por segmento; 3) SEDAR+: da 403 sin navegador', decision: 'Omitido' },
  ],
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Ficha sectorial: infraestructura de mercados y datos financieros (Burton-Taylor, FIA, SEC NRSRO; comparables a 13/14-oct-2026)', editor: 'Repo analisis-inversion (sectores/bolsas-datos-financieros-2026-10-14.md)', tipo: 'Sectorial', fecha: '2026-10-14', url: null },
  { id: 2, titulo: 'Informe anual 2025 (descripción de negocios, riesgos, geografías)', editor: 'TMX Group Limited', tipo: 'Primaria', fecha: '2026-03-16', url: URL.ar25 },
  { id: 3, titulo: 'MD&A anual 2025 (objetivos, precios 2026, cuota de negociación, entorno)', editor: 'TMX Group Limited', tipo: 'Primaria', fecha: '2026-02-05', url: URL.mda25 },
  { id: 4, titulo: 'Q2 2026 Report to Shareholders (condiciones de mercado, iniciativas)', editor: 'TMX Group Limited', tipo: 'Primaria', fecha: '2026-08-20', url: URL.qr226 },
  { id: 5, titulo: 'TMX Group to Expand into Australia and Strengthen Canadian Market (presentación de la compra de Cboe Australia y Canadá)', editor: 'TMX Group Limited', tipo: 'Primaria', fecha: '2026-04-22', url: URL.cboe },
  { id: 6, titulo: 'Q4 2025 Analyst Call Transcript', editor: 'TMX Group Limited', tipo: 'Primaria', fecha: '2026-02-06', url: URL.tr425 },
  { id: 7, titulo: 'Cuentas 2025 de ICE, CME, Deutsche Börse, Euronext y LSEG (informes del repo del 8 y 14-oct-2026)', editor: 'Repo analisis-inversion (informes/)', tipo: 'Datos de mercado', fecha: '2026-10-14', url: null },
  { id: 8, titulo: 'Notas de resultados de 2021 y 2022 (historia de compras)', editor: 'TMX Group Limited', tipo: 'Primaria', fecha: '2023-02-06', url: URL.q422 },
];
const B = {
  _estado: 'completa',
  historia: {
    resumen: 'TMX Group nace en 2008 de la unión de TSX Group (Bolsa de Toronto y TSX Venture) con la Bourse de Montréal, el mercado de derivados de Canadá. En 2012 la compró el consorcio de bancos y fondos canadienses Maple, que añadió el depositario CDS y Alpha; los acuerdos de nombramiento de Maple vencieron en 2018 [2, 3]. Desde 2017 se transforma en una empresa de datos y tecnología: Trayport (negociación de energía europea), AST Canada (2021), el control de BOX en EE. UU. (2022), Wall Street Horizon, VettaFi (2024), Newsfile, Verity (2025) y, en 2026, RAFI Indices, Cboe Australia y Canadá y la combinación de BOX con MEMX [8, 2, 4]. Hoy más del 50 % de los ingresos llega de fuera de Canadá [2].',
    hitos: [
      { anio: '2008', hito: 'Fusión de TSX Group y Bourse de Montréal: nace TMX Group.' },
      { anio: '2012', hito: 'Operación Maple: consorcio de bancos y pensiones canadienses compra TMX y añade CDS y Alpha.' },
      { anio: '2017', hito: 'Compra de Trayport, la red de negociación de energía de Europa, a ICE.' },
      { anio: '2021', hito: 'AST Canada (agente de transferencia) y Tradesignal.' },
      { anio: '2022', hito: 'Control de BOX Options Market (EE. UU.) y compra de Wall Street Horizon.' },
      { anio: '2023', hito: 'Desdoblamiento de la acción 5×1 (junio).' },
      { anio: '2024', hito: 'VettaFi al 100 % (1.126,5 M) y objetivo TM2X: duplicar los ingresos a 2.000 M en 5-7 años.' },
      { anio: '2025', hito: 'Lanza la posnegociación modernizada de CDS y AlphaX US; compra Verity, Bond Indices, ETF Stream e índices nucleares.' },
      { anio: '2026', hito: 'Compra RAFI Indices (683,2 M) y Cboe Australia y Canadá (409,9 M); acuerdo para combinar BOX con MEMX (59 % de TMX).' },
    ],
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'TMX opera la infraestructura de los mercados de capitales de Canadá y una cartera creciente de datos fuera de él. En Canadá: la Bolsa de Toronto (TSX) y TSX Venture, Alpha, el mercado de derivados de Montreal (MX), las cámaras CDCC (derivados y repos) y CDS (compensación, liquidación y depósito de acciones y renta fija), TSX Trust (agente de transferencia y fiduciario) y Shorcan [2]. Fuera: BOX Options Market (opciones de EE. UU.), AlphaX US, TMX Trayport (red de negociación de energía europea con 10.419 licencias), TMX VettaFi (índices y distribución digital para ETF), TMX Datalinx (datos de mercado, Verity y Wall Street Horizon) y, desde 2026, RAFI Indices y TMX Australia Exchange [2, 4]. Clientes: emisores cotizados (casi el 50 % de las mineras cotizadas del mundo), bancos e intermediarios, gestoras de ETF y operadores de energía [6].',
    como_gana_dinero: 'Cuatro motores de ingreso. Recurrente: datos, índices, licencias de Trayport, cuotas de mantenimiento de cotización y custodia (la mayor parte de Global Insights, el 41 % del total en 2025). Transaccional: comisiones por contrato en MX y BOX y por acción negociada en TSX, más las ampliaciones de capital, que dependen de la volatilidad y del ciclo de las mineras [3]. Intereses de saldos de clientes en TSX Trust y CDS, ligados a los tipos [6]. Los precios suben cada año: +3-4 % en Trayport (IPC británico), cuotas de mantenimiento de cotización +8-9 % en 2026 por el aumento del 28 % de la capitalización de los emisores, +1-2 % en Datalinx [3]. El apalancamiento operativo es alto: los gastos son personal y sistemas, y en el 1S26 los ingresos crecieron un 16 % con gastos +9 % [4].',
    clientes: 'Ningún cliente supera el 10 % de los ingresos [2]. En Trayport el precio se revisa cada diciembre con el IPC del país del contrato y las licencias crecen un 6 % anual; la dirección habla de crecimiento a largo plazo «alto un dígito a doble dígito» [6]. El poder de precios es visible en las cuotas de cotización (ligadas a la capitalización de los emisores) y en los datos regulados, aunque la autoridad canadiense revisa las tarifas: CDS propone bajar 4-5 M de comisiones y devolvió 23,9 M en 2025 a sus participantes [4]. La competencia en negociación de acciones existe (cuota combinada de TSX y TSXV del 61 % en el 4T25, −2 puntos), pero cotización, compensación y depósito son casi monopolios en Canadá [6].',
    confianza: 'Alta',
  },
  sector: {
    definicion: 'Infraestructura de mercados y datos financieros: bolsas y cámaras de acciones y derivados, posnegociación, datos e índices [1]. Para TMX el mercado relevante es doble: la infraestructura canadiense (cotización, negociación y compensación, donde es casi único proveedor) y el gasto mundial en datos y análisis de mercados financieros, donde compiten Trayport, VettaFi y Datalinx. Usamos el segundo para tamaño y crecimiento porque es el único con cifra de fuente independiente; no hay cifra de ingresos del sector de bolsas, solo volúmenes de la FIA [1].',
    tamano: '≈ 49.200 M USD en 2025 de gasto mundial en datos y análisis de mercados financieros, +6,5 % (Burton-Taylor) [1]',
    unidad_serie: 'millones de USD (gasto mundial en datos y análisis de mercados financieros)',
    serie: [ { anio: '2019', tamano: 32000 }, { anio: '2022', tamano: 37300 }, { anio: '2023', tamano: 42000 }, { anio: '2025', tamano: 49200 }, { anio: '2030e', tamano: 70000 } ],
    tcac_historico_pct: 7.4, tcac_previsto_pct: 7.0, cr5_pct: null, estructura: 'Concentrada',
    drivers: [
      { driver: 'Volatilidad y volumen negociado', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Volumen de renta variable canadiense +32 % y de MX +15 % en el 1S26; VIX medio de 19,4 [4].' },
      { driver: 'Financiación de mineras y ETF en Canadá', efecto: '+', horizonte: 'Estructural', evidencia: '239 ETF nuevos en TSX en 2025 (récord) y 125.800 M CAD de entradas netas; financiación minera +53 % [6].' },
      { driver: 'Crecimiento de la indexación y los ETF', efecto: '+', horizonte: 'Estructural', evidencia: 'Activos replicados de VettaFi +49 % en 2025; índices ≈ 7.200 M USD de mercado, +13,4 % [6, 1].' },
      { driver: 'Tipos de interés', efecto: '−', horizonte: 'Cíclico', evidencia: 'TMX Corporate Solutions −5 % en el 4T25 por menores tipos y saldos [6].' },
      { driver: 'Precio de los datos y regulación de tarifas', efecto: '+/−', horizonte: 'Estructural', evidencia: 'Subidas aprobadas en Datalinx para 2026 (+1-2 %); CDS propone rebajas de 4-5 M [3, 4].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 2, justificacion: 'Negociación de acciones con varios mercados en Canadá (cuota de TSX y TSXV del 61 %), pero cotización, compensación y depósito sin rival doméstico; TMX compra el tercer mercado (Cboe Canada) [6, 5].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Bancos canadienses concentrados y regulador que revisa tarifas; CDS devuelve 17-24 M al año a sus participantes [4].' },
      { fuerza: 'Poder de los proveedores', intensidad: 1, justificacion: 'Personal y sistemas; ningún proveedor crítico más allá de la nube.' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Licencias de bolsa y cámara reconocidas por la OSC y la AMF; efecto red en liquidez. Entrada posible en negociación (Cboe, Nasdaq CXC) y en criptoactivos y tokenización [2, 6].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'Mercados privados, doble cotización en EE. UU., negociación 24 horas y datos generados con IA [6, 2].' },
    ],
    ciclo: { posicion: 'Expansión', comentario: 'Volúmenes y ampliaciones en máximos: financiación en TSX +29 % y en TSXV +108 % en el 1S26, índice S&P/TSX por encima de 30.000 desde sep-2025 [4, 6]. El negocio de TMX es defensivo con bolsillos cíclicos: en 2022 los ingresos crecieron un 14 % (BOX incluido) aunque cayeron las ampliaciones; en 2020 subieron un 7 % [8]. Lo cíclico (ampliaciones adicionales, volúmenes) pesa alrededor de un tercio de los ingresos; lo recurrente, el resto.' },
    regulacion: 'TMX opera bajo órdenes de reconocimiento de la Comisión de Valores de Ontario y de la Autorité des marchés financiers de Quebec: ninguna persona puede tener más del 10 % de sus acciones sin aprobación, las tarifas de compensación y de datos regulados necesitan autorización y el consejo debe tener residentes de Quebec y expertos en derivados [2]. En tramitación: rebajas de comisiones de CDS (4-5 M al año, pendiente desde 2025), aprobaciones de Cboe Canada en Canadá y de MEMX en EE. UU. (SEC, 2S27), y la entrada del Banco de Canadá en la plataforma de colateral CCMS y en la cámara de repos de CDCC a principios de 2027 [4].',
    tendencias: 'Tres tendencias que la dirección nombra: IA, tokenización y negociación 24 horas, más el auge de los mercados privados [6]. TMX gana con la indexación (VettaFi, RAFI) y con la demanda de datos para IA, y podría perder si la negociación 24 horas o la tokenización desplazan liquidez fuera de TSX, o si los emisores pequeños prefieren capital privado. La compra de Cboe Canada elimina al tercer mercado doméstico y reduce la competencia en negociación [5].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 61.0,
    posicion: '1.º en Canadá en cotización, negociación (61 % del volumen de valores de TSX y TSXV en el 4T25), derivados (MX, único), compensación y depósito (CDS y CDCC, únicos); en datos e índices mundiales es un actor de nicho frente a Bloomberg, LSEG o MSCI [6, 1].',
    competidores: [
      { nombre: 'Intercontinental Exchange', pais: 'EE. UU.', ticker: 'ICE', ingresos: 14098, cuota_pct: null, margen_ebit_pct: 49.6, comentario: 'Bolsas, cámaras y datos hipotecarios; vendió Trayport a TMX en 2017.' },
      { nombre: 'CME Group', pais: 'EE. UU.', ticker: 'CME', ingresos: 9257, cuota_pct: null, margen_ebit_pct: 64.9, comentario: 'Futuros y opciones de tipos, índices, energía y agrícolas.' },
      { nombre: 'Deutsche Börse', pais: 'Alemania', ticker: 'DB1', ingresos: 9589, cuota_pct: null, margen_ebit_pct: 50.0, comentario: 'Eurex, Clearstream, datos e índices (STOXX), compite con Trayport en energía vía EEX.' },
      { nombre: 'London Stock Exchange Group', pais: 'Reino Unido', ticker: 'LSEG', ingresos: 16780, cuota_pct: null, margen_ebit_pct: 23.7, comentario: 'Datos (Workspace), FTSE Russell, LCH; margen EBIT bajo por la amortización de Refinitiv.' },
      { nombre: 'Euronext', pais: 'Países Bajos', ticker: 'ENX', ingresos: 2894, cuota_pct: null, margen_ebit_pct: 50.8, comentario: 'Bolsa europea de tamaño parecido; integra compensación y depositarios.' },
      { nombre: 'Cboe Global Markets (Canadá, en venta a TMX)', pais: 'EE. UU.', ticker: 'CBOE', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Tercer mercado de acciones de Canadá; su venta a TMX está pendiente de aprobación [5].' },
    ],
    foso: {
      veredicto: 'Amplio', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 5, evidencia: 'Liquidez concentrada en TSX y MX; Trayport conecta 29.413 terminales de energía europea [6, 2].' },
        { fuente: 'Costes de cambio', puntuacion: 4, evidencia: 'Emisores cotizados y participantes de CDS integrados en su infraestructura; licencias de Trayport con renovación anual [2].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 5, evidencia: 'Reconocimiento regulatorio como bolsa y cámara; límite legal del 10 % a la propiedad [2].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Plataformas compartidas (posnegociación modernizada en 2025) y margen EBIT de 45 % en 2025 [3].' },
        { fuente: 'Escala eficiente', puntuacion: 5, evidencia: 'El mercado canadiense solo sostiene un operador integrado; TMX compra al tercero (Cboe Canada) [5].' },
      ],
    },
    amenazas: 'Tres amenazas con probabilidad media: (1) que la autoridad canadiense recorte tarifas de compensación o de datos (la de CDS ya está en revisión); (2) que la negociación y la financiación se vayan a EE. UU. o a mercados privados, sobre todo si las mineras crecen con capital privado; (3) que los datos de mercado se abaraten con IA o con distribuidores nuevos (más expuestos Datalinx y Verity). La parte con más foso, cotización, compensación y depósito canadienses, es la menos amenazada [3, 6].',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Los asuntos ESG que tocan las cifras de TMX son de gobierno y de resiliencia: la continuidad operativa y la ciberseguridad de las cámaras (un fallo en CDS o CDCC tiene coste regulatorio y de reputación), la integridad del mercado y el gobierno exigido por las órdenes de reconocimiento (residentes de Quebec, independencia frente a los participantes) [2]. Por el lado de las oportunidades, los índices temáticos y sostenibles de VettaFi y el plan de reconciliación con pueblos indígenas de sep-2025 [3]. Emisiones bajas: oficinas y centros de datos.',
    controversias: 'Sin sanciones relevantes en tres años en los documentos leídos. Litigios fuera del curso ordinario: 14,1 M de costes en 2025 y un acuerdo cobrado de 91,1 M en el 1T26 (TMX como cobradora) [3, 4]. BOX asumió en el 4T25 un cargo regulatorio de 15,3 M del registro de auditoría consolidado de la SEC [6].',
    confianza: 'Baja',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) Informe anual 2025 y circular 2026: no publican calificaciones de terceros; 2) búsqueda de MSCI y Sustainalytics para TMX: sin página abierta; 3) informe de sostenibilidad: no descargado (web de inversores con antibot)', decision: 'Omitido' },
    { seccion: 'sector', campo: 'cr5_pct', tipo: 'Complemento', intentos: '1) Ficha sectorial: solo da el CR5 de datos de Burton-Taylor sin verificar; 2) FIA: volúmenes, no ingresos; 3) cálculo con las cotizadas: no cubre Bloomberg', decision: 'Omitido' },
  ],
};
guarda('B', B);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Management Information Circular 2026 (consejo, retribución, propiedad de acciones, votos de 2025, límites de voto)', editor: 'TMX Group Limited', tipo: 'Primaria', fecha: '2026-04-02', url: URL.circ },
  { id: 2, titulo: 'MD&A anual 2025 (cambios organizativos, objetivos)', editor: 'TMX Group Limited', tipo: 'Primaria', fecha: '2026-02-05', url: URL.mda25 },
  { id: 3, titulo: 'Notas de resultados de 2021, 2022 y 2T26 y MD&A 2024 (guías y objetivos cumplidos)', editor: 'TMX Group Limited', tipo: 'Primaria', fecha: '2026-07-30', url: URL.pr226 },
  { id: 4, titulo: 'Q2 2026 Report to Shareholders', editor: 'TMX Group Limited', tipo: 'Primaria', fecha: '2026-08-20', url: URL.qr226 },
];
const C = {
  _estado: 'completa',
  directivos: {
    equipo: [
      { nombre: 'John McKenzie', cargo: 'Consejero delegado', desde: '2020', participacion_pct: 0.05, trayectoria: 'En TMX desde hace 25 años, antes director financiero; consejero delegado interino desde ene-2020 y titular desde el 17-ago-2020. Con él los ingresos pasaron de 865 M (2020) a 1.717 M (2025) y el BPA ajustado de 1,18 a 2,13 CAD; el rendimiento para el accionista subió un 101 % frente al 83 % de su retribución [1, 3].' },
      { nombre: 'David Arnold', cargo: 'Director financiero (y estrategia y desarrollo corporativo desde abr-2025)', desde: null, participacion_pct: 0.00, trayectoria: 'Amplió su mandato en 2025 a estrategia, desarrollo corporativo, innovación e integración; lleva las compras de RAFI, Cboe y MEMX [2, 1].' },
      { nombre: 'Luc Bertrand', cargo: 'Presidente del consejo (independiente)', desde: '2011', participacion_pct: 1.10, trayectoria: 'Exconsejero delegado de la Bourse de Montréal (2000-2009) y vicepresidente de National Bank (2011-2023). Tiene 3.025.000 acciones (≈ 143,7 M CAD) [1].' },
      { nombre: 'Luc Fortin', cargo: 'Presidente y consejero delegado, mercados globales y posnegociación', desde: null, participacion_pct: 0.01, trayectoria: 'Responsable de MX, CDCC, CDS y la modernización de la posnegociación lanzada en abr-2025 [1, 2].' },
      { nombre: 'Peter Conroy', cargo: 'Consejero delegado, Global Insights', desde: '2025', participacion_pct: 0.00, trayectoria: 'Desde el 1-abr-2025 dirige Trayport, VettaFi y Datalinx; ingresos del segmento +16 % en 2025 y +18 % en el 2T26 [2, 3].' },
      { nombre: 'Judy Dinn', cargo: 'Directora de sistemas de información', desde: '2025', participacion_pct: 0.00, trayectoria: 'Más de 20 años en tecnología financiera; contratada en abr-2025 [2].' },
    ],
    historial_guidance: [
      { anio: '2024', guia: 'Objetivo TM2X: duplicar los ingresos de 1.000 M (2022) a 2.000 M en 5-7 años', real: '1.717 M en 2025 y 1.852 M en los 12 meses a jun-2026: en camino de cumplirlo en 2026-2027', cumplida: 'Parcial' },
      { anio: '2025', guia: 'Dividendo del 40-50 % del BPA ajustado', real: '42 % en los 12 meses a dic-2025', cumplida: 'Sí' },
      { anio: '2025', guia: 'Deuda / EBITDA ajustado de 1,5-2,5 veces', real: '2,2 veces a dic-2025 (1,9 neto del exceso de caja)', cumplida: 'Sí' },
      { anio: '2025', guia: 'Ahorro anual de unos 12 M por la reorganización, a ritmo completo en 2026', real: 'Ahorro empezado en el 3T25; gastos comparables +5 % en el 1S26', cumplida: 'Parcial' },
      { anio: '2025', guia: 'Objetivos del incentivo anual: beneficio operativo, ingresos recurrentes y transaccionales', real: 'Superados: puntuación del 149,3 % del objetivo', cumplida: 'Sí' },
    ],
    comentario: 'Equipo estable y con historial: McKenzie lleva seis años como consejero delegado y 25 en la empresa, y el rendimiento para el accionista desde 2020 ha superado al de su retribución (101 % frente a 83 %) [1]. En 2025 salió el director de operaciones y se repartieron sus funciones entre Arnold y Conroy [2]. La propiedad de la dirección es baja (McKenzie, 130.246 acciones; 17,5 veces su salario contando unidades) y la del presidente, alta (1,1 %) [1]. El plan de sucesión no se publica. El riesgo de ejecución está en la tanda de compras de 2026.',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Luc Bertrand', cargo: 'Presidente', tipo: 'Independiente', desde: '2011', comisiones: 'Presidencia del consejo' },
      { nombre: 'John McKenzie', cargo: 'Consejero delegado', tipo: 'Ejecutivo', desde: '2020', comisiones: null },
      { nombre: 'Stephanie Cuskley', cargo: 'Consejera', tipo: 'Independiente', desde: '2025', comisiones: null },
      { nombre: 'Nicolas Darveau-Garneau', cargo: 'Consejero', tipo: 'Independiente', desde: '2018', comisiones: null },
      { nombre: 'Tamara Finch', cargo: 'Consejera (nueva en 2026)', tipo: 'Independiente', desde: '2026', comisiones: null },
      { nombre: 'Moe Kermani', cargo: 'Consejero', tipo: 'Independiente', desde: '2020', comisiones: null },
      { nombre: 'William Linton', cargo: 'Consejero', tipo: 'Independiente', desde: '2012', comisiones: 'Auditoría (experto contable)' },
      { nombre: 'Monique Mercier', cargo: 'Consejera', tipo: 'Independiente', desde: '2022', comisiones: null },
      { nombre: 'Michael Ptasznik', cargo: 'Consejero', tipo: 'Independiente', desde: '2025', comisiones: null },
      { nombre: 'Peter Rockandel', cargo: 'Consejero', tipo: 'Independiente', desde: '2024', comisiones: null },
      { nombre: 'Claude Tessier', cargo: 'Consejero', tipo: 'Independiente', desde: '2020', comisiones: null },
      { nombre: 'Ava Yaskiel', cargo: 'Consejera', tipo: 'Independiente', desde: '2023', comisiones: null },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: 'limite_legal',
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 95.53, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 5.86, fijo: 0.85, variable_corto: 1.90, variable_largo: 2.98, ratio_salario_medio: null },
    remuneracion: 'Retribución total del consejero delegado de 5,86 M CAD en 2025 (4,76 M en 2024): salario 0,85 M, incentivo anual 1,90 M y largo plazo 2,98 M (acciones de rendimiento 60 %, restringidas 20 %, opciones 20 %) [1]. El incentivo anual mide beneficio operativo (70 %), ingresos recurrentes (20 %) y transaccionales (10 %); en 2025 pagó el 149,3 % del objetivo [1]. Las acciones de rendimiento vencen a tres años según el rendimiento total frente a un índice de referencia [1]. Hay cláusula de recuperación en el plan ómnibus de 2026 y exigencia de tenencia de 5 veces el salario para el consejero delegado (la cumple 17,5 veces) [1]. El voto consultivo de 2025 fue del 95,53 % a favor [1]. Premia el beneficio operativo, no el crecimiento por compras a cualquier precio, aunque ninguna métrica mide el rendimiento del capital invertido.',
    accionistas: [
      { nombre: 'Luc Bertrand (presidente)', pct: 1.10, tipo: 'Consejero', variacion: 'Sin cambios conocidos' },
      { nombre: 'Ningún accionista por encima del 10 % (límite legal)', pct: null, tipo: 'Institucional disperso', variacion: 'Recompras de 2,97 M de acciones en el 1S26' },
    ],
    insiders: [],
    control_y_defensas: 'Sin accionista de control: las órdenes de reconocimiento de Ontario y Quebec prohíben a cualquier persona, sola o concertada, tener o controlar más del 10 % de las acciones sin autorización previa de la OSC y de la AMF, y nadie puede votar más del 10 % [1]. Es una defensa legal frente a una opa hostil: cualquier comprador necesita a los reguladores. Una acción, un voto; consejo de 12 con 11 independientes (92 %), presidente independiente separado del consejero delegado, límite de mandato de 12 años [1]. Operaciones vinculadas: no hay relevantes; los participantes del mercado (bancos) no pueden ser consejeros independientes [1].',
    alertas: ['Ninguna relevante detectada tras revisar la circular de 2026, el MD&A de 2025 y los hechos relevantes del 2T26; el registro de operaciones de directivos (SEDI) no abre sin navegador.'],
    confianza: 'Media',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'insiders', tipo: 'Complemento', intentos: '1) SEDI: protección antibot, no abre; 2) SEDAR+: 403; 3) circular 2026: solo tenencias a 10-mar-2026, no operaciones', decision: 'Omitido' },
    { seccion: 'gobierno', campo: 'remuneracion_ceo.ratio_salario_medio', tipo: 'Complemento', intentos: '1) Circular 2026: no publica la ratio; 2) informe anual: gasto de personal y empleados; 3) cálculo: 464,6 M de personal entre 2.185 empleados da 0,21 M, pero incluye BOX y cargas', decision: 'Omitido' },
  ],
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const usdcad = 1.4196, eurcad = 1.5912;
const fD = [
  { id: 1, titulo: 'Históricos diarios de X.TO, XIC.TO y XFN.TO (precio, rango, volumen, rentabilidades, beta, cierres anuales)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/quote/X.TO/history' },
  { id: 2, titulo: 'TMX Group Limited: finanzas y estimaciones 2026-2028, objetivo medio y número de analistas', editor: 'Zonebourse (MarketScreener)', tipo: 'Analistas', fecha: '2026-10-15', url: 'https://www.zonebourse.com/cours/action/TMX-GROUP-LIMITED-1412264/finances/' },
  { id: 3, titulo: 'TMX Group (TSE:X) price target and analyst ratings (objetivos, recomendaciones y cambios)', editor: 'MarketBeat', tipo: 'Analistas', fecha: '2026-10-15', url: 'https://www.marketbeat.com/stocks/TSE/X/forecast/' },
  { id: 4, titulo: 'Benchmark bond yield, 10-year (BD.CDN.10YR.DQ.YLD)', editor: 'Bank of Canada', tipo: 'Primaria', fecha: '2026-10-14', url: 'https://www.bankofcanada.ca/valet/observations/BD.CDN.10YR.DQ.YLD/json?recent=10' },
  { id: 5, titulo: 'Tipos de cambio diarios USD/CAD y EUR/CAD', editor: 'Bank of Canada', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://www.bankofcanada.ca/valet/observations/FXUSDCAD,FXEURCAD/json?recent=3' },
  { id: 6, titulo: 'Comparables de infraestructura de mercados (ficha sectorial, 13/14-oct-2026) y fila de Euronext de su informe del 14-oct', editor: 'Repo analisis-inversion', tipo: 'Datos de mercado', fecha: '2026-10-14', url: null },
  { id: 7, titulo: 'Estados financieros intermedios a 30-jun-2026 (deuda, caja, minoritarios, acciones, RAFI, Cboe, MEMX)', editor: 'TMX Group Limited', tipo: 'Primaria', fecha: '2026-07-30', url: URL.fs226 },
  { id: 8, titulo: 'Q2 2026 Report to Shareholders (acciones en circulación a 27-jul-2026)', editor: 'TMX Group Limited', tipo: 'Primaria', fecha: '2026-08-20', url: URL.qr226 },
  { id: 9, titulo: 'TMX Group Limited Announces Agreement to Acquire RAFI Indices (ingresos de 49 M USD y EBITDA ajustado de 38 M USD)', editor: 'Newsfile / TMX Group', tipo: 'Primaria', fecha: '2026-06-11', url: URL.rafiAnuncio },
  { id: 10, titulo: 'TMX Group Limited Completes Acquisition of RAFI Indices', editor: 'TMX Group Limited', tipo: 'Primaria', fecha: '2026-08-18', url: URL.rafi },
  { id: 11, titulo: 'TMX Group to Expand into Australia and Strengthen Canadian Market (409,9 M; ingresos de 87 M en 2025)', editor: 'TMX Group Limited', tipo: 'Primaria', fecha: '2026-04-22', url: URL.cboe },
  { id: 12, titulo: 'Transacciones del sector en los informes del repo (ICE 8-oct, LSEG y Euronext 14-oct): MarketAxess, Adenza, IHS Markit, Refinitiv', editor: 'Repo analisis-inversion', tipo: 'Datos de mercado', fecha: '2026-10-14', url: null },
  { id: 13, titulo: 'TMX Group Limited Announces Release Date for Q3 2026 Financial Results (29-oct-2026)', editor: 'TMX Group Limited', tipo: 'Primaria', fecha: '2026-10-08', url: URL.fechaQ3 },
  { id: 14, titulo: 'Anthropic\'s new AI tools deepen selloff in data analytics and software stocks, investors say', editor: 'Reuters (Yahoo Finance)', tipo: 'Prensa', fecha: '2026-02-03', url: 'https://finance.yahoo.com/news/anthropics-ai-tools-deepen-selloff-054551832.html' },
  { id: 15, titulo: 'This TSX stock is making global moves (RAFI, caídas de feb y jun-2026, objetivos de analistas)', editor: 'Burnaby House (reproduce prensa canadiense)', tipo: 'Prensa', fecha: '2026-06-12', url: 'https://burnabyhouse.com/news/this-tsx-stock-is-making-global/' },
  { id: 16, titulo: 'TMX Group closes Cboe Australia acquisition', editor: 'The TRADE', tipo: 'Prensa', fecha: '2026-08-03', url: 'https://www.thetradenews.com/tmx-group-closes-cboe-australia-acquisition/' },
  { id: 17, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 18, titulo: 'Q2 2026: Non-GAAP EPS de 0,62 CAD frente a 0,58 esperado (resumen de resultados)', editor: 'AllInvestView', tipo: 'Datos de mercado', fecha: '2026-07-31', url: 'https://www.allinvestview.com/earnings/X.TO/q2-2026/' },
];
const comp = (nombre, ticker, pais, capUSD, evv, ltm, ntm, per, g, m, roic, dn, fcf, fx = usdcad) => ({ nombre, ticker, pais, capitalizacion: Math.round(capUSD * fx), ev_ventas: evv, ev_ebitda_ltm: ltm, ev_ebitda_ntm: ntm, per_ntm: per, crecimiento_pct: g, margen_ebitda_pct: m, roic_pct: roic, dn_ebitda: dn, fcf_yield_pct: fcf });
const D = {
  _estado: 'completa',
  identificacion: {
    nombre: 'TMX Group Limited', nombre_corto: 'TMX Group', ticker: 'X', isin: 'CA87262K1057', mercado: 'Toronto Stock Exchange (TSX)', indice_referencia: 'S&P/TSX Composite',
    pais: 'Canadá', pais_iso: 'CA', sector: 'Financials', industria: 'Financial Exchanges & Data', sede: 'Toronto (Ontario)', fundacion: '2008', empleados: 2185, web: 'https://www.tmx.com',
    precio: bolsa.identificacion.precio, fecha_precio: bolsa.identificacion.fecha_precio, acciones: 276.4, capitalizacion_publicada: null, free_float_pct: 98.0,
    max_52s: bolsa.identificacion.max_52s, min_52s: bolsa.identificacion.min_52s, volumen_medio_diario: '≈ 34,5 M CAD/día (3 meses)', proximos_resultados: '2026-10-29',
  },
  consenso: {
    guidance: 'TMX no da guía anual de beneficios. Objetivos a largo plazo (MD&A 2025, confirmados en el 2T26): crecimiento de ingresos «alto» en Global Insights y derivados (alto un dígito a doble dígito) y «fuerte» (5 % o más) en el resto, dividendo del 40-50 % del BPA ajustado y deuda de 1,5-2,5 veces el EBITDA ajustado; objetivo TM2X de 2.000 M de ingresos en 5-7 años desde 2022 [7, 8]. Para 2026 publica subidas de precio: +1 % en el conjunto, +3-4 % en Trayport y +8-9 % en cuotas de mantenimiento de cotización [8].',
    estimaciones: [
      { periodo: '2026e', ingresos: 1949, ebitda: 1122, ebit: 937.1, bpa: 2.253, dpa: 0.988, fuente: 'Zonebourse/MarketScreener, 7 analistas, 15-oct-2026 [2]' },
      { periodo: '2027e', ingresos: 2207, ebitda: 1271, ebit: 1131, bpa: 2.45, dpa: 1.074, fuente: 'Zonebourse/MarketScreener [2]' },
      { periodo: '2028e', ingresos: 2598, ebitda: 1432, ebit: null, bpa: null, dpa: 1.24, fuente: 'Zonebourse/MarketScreener [2]' },
    ],
    recomendaciones: { n_analistas: 10, comprar: 8, mantener: 2, vender: 0, po_medio: 65.55, po_min: 59.0, po_max: 71.0 },
    revisiones: 'Una sola fuente gratuita con estimaciones completas (Zonebourse/MarketScreener), contrastada con MarketBeat en objetivos y recomendaciones [2, 3]. Los objetivos se mueven poco: en octubre RBC bajó de 69 a 67 CAD y Canaccord subió de 64 a 65; en julio National Bank pasó de mantener a comprar con objetivo de 63 y Raymond James bajó de 65,25 a 64,50 [3]. El BPA de Zonebourse es el publicado (no el ajustado) y el EBITDA de 2028 (1.432 M) y los ingresos (2.598 M, +17,7 %) parecen incluir MEMX desde su cierre previsto; no hay serie de revisiones a 3 y 12 meses en fuente abierta.',
    base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: 1.5,
    confianza: 'Media',
  },
  bolsa: {
    tipo_rentabilidad: bolsa.bolsa.tipo_rentabilidad,
    rentabilidades: bolsa.bolsa.rentabilidades,
    anual: bolsa.bolsa.anual.filter((a) => Number(a.anio) >= 2017),
    beta: 0.41, volatilidad_pct: bolsa.bolsa.volatilidad_pct, max_drawdown_pct: bolsa.bolsa.max_drawdown_pct, posicion_corta_pct: null,
    comentario: null,
    contexto: {
      movimiento: { fecha: '2026-10-15', var_1m_pct: 1.7, var_3m_pct: 7.2, var_6m_pct: 1.3, var_12m_pct: 6.9, dist_max_52s_pct: -3.0, dist_min_52s_pct: 22.3, dist_max_historico_pct: -6.3, tendencia: 'alcista', volatilidad_60d_pct: 19.0, avisos: [] },
      movimientos_fuertes: [
        { periodo: 'feb-2026', var_pct: -8.6, causa: 'Caída del 8,6 % el 3-feb-2026, el día de la venta general de acciones de datos y software por el miedo a las herramientas de IA de Anthropic (Thomson Reuters −18 %, LSEG −13 %); mínimo de 52 semanas de 44,10 CAD el 18-feb [14, 1]. No hubo noticia propia de TMX.', veredicto: 'no cambia', condicion: null },
        { periodo: 'may-jun-2026', var_pct: -15.3, causa: 'De 57,27 CAD (5-may, máximo de 52 semanas) a menos de 48 a principios de junio, con un −6,7 % el 2-jun; la prensa recoge el temor a más deuda por las compras (Cboe en abril, RAFI anunciada el 11-jun) sin una noticia concreta del día [15, 1].', veredicto: 'no cambia', condicion: null },
        { periodo: 'jul-2026', var_pct: 14.4, causa: 'Subida de un mes hasta el 28-jul ante los resultados del 2T26 (BPA ajustado 0,62 frente a 0,58 esperado) y la mejora de National Bank a comprar [18, 3].', veredicto: 'no cambia', condicion: null },
      ],
      noticias: [
        { fecha: '2026-10-15', tipo: 'recomendación', hecho: 'RBC baja el objetivo de 69 a 67 CAD y mantiene «sobreponderar»; Canaccord sube de 64 a 65 el 14-oct [3].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-08', tipo: 'resultados', hecho: 'Resultados del 3T26 el 29-oct-2026 por la tarde; conferencia el 30-oct [13].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-08-18', tipo: 'fusión u oferta', hecho: 'Cierra la compra de RAFI Indices por 490 M USD (683,2 M CAD), unas 12,9 veces su EBITDA ajustado [10, 9].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-08-03', tipo: 'fusión u oferta', hecho: 'Cierra la compra de Cboe Australia; Cboe Canada sigue pendiente de aprobación [16].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-07-30', tipo: 'fusión u oferta', hecho: 'Acuerdo para combinar BOX con MEMX: TMX aporta unos 800 M USD y su participación en BOX y tendrá el 59 %; cierre previsto en el 2S27 con aprobación de la SEC [7].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-05-21', tipo: 'accionista de referencia', hecho: 'TMX amplía su programa de recompra al 2 % de las acciones (5,6 M); 2,97 M recompradas en el 1S26 [7].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-03-31', tipo: 'demanda o regulador', hecho: 'Cobro de 91,1 M CAD por un acuerdo judicial (TMX demandante), 83,8 M netos en «otros ingresos» del 1T26 [7].', veredicto: 'no cambia', condicion: null },
      ],
      proximos_resultados: '2026-10-29',
      veredicto: 'no cambia',
      condicion: null,
      comentario: 'La acción cotiza a 54,31 CAD, un 3 % por debajo del máximo de 52 semanas y un 22 % por encima del mínimo, con tendencia alcista (por encima de la media de 200 sesiones) y sin avisos de movimiento [1]. Las dos caídas fuertes del año tienen causa conocida y ajena al negocio de TMX: el miedo a la IA en las acciones de datos (3-feb) y el temor a la deuda de las compras (junio), que el informe recoge en sus escenarios. No hay colocaciones, ampliaciones ni ventas de directivos anunciadas; el único hecho pendiente con fecha son los resultados del 29-oct, que no retrasan una decisión (regla 11) [13].',
    },
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: bolsa.cierres_ejercicio.filter((c) => Number(c.anio) >= 2021).map((c) => ({ anio: c.anio, precio_cierre: c.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    comentario: null,
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Siete operadores de mercado con cámara, índices o datos de la ficha sectorial (ICE, CME, Nasdaq, Deutsche Börse, LSEG, Tradeweb y MSCI, por VettaFi y RAFI) más Euronext, la bolsa de tamaño más parecido. Cifras de MarketScreener y Stock Analysis llevadas al 13/14-oct-2026 en la ficha y al informe de Euronext; capitalización pasada a CAD a 1,4196 USD/CAD y 1,5912 EUR/CAD (Banco de Canadá, 15-oct) [6, 5]. Fuera: S&P Global, Moody\'s, Verisk, Thomson Reuters y FactSet (calificaciones y datos profesionales, otro modelo) y Cboe y ASX (sin estimaciones del mismo proveedor en el repo). El PER de los comparables es sobre BPA ajustado, como el de la historia de TMX.',
    empresas: [
      comp('Intercontinental Exchange', 'ICE', 'US', 87813, 10.22, 15.3, 13.8, 21.6, 8.1, 66.0, 8.6, 2.78, 4.4),
      comp('CME Group', 'CME', 'US', 99974, 14.51, 20.3, 19.0, 22.3, 5.9, 71.0, 12.2, -0.33, 4.2),
      comp('Nasdaq', 'NDAQ', 'US', 52253, 10.93, 18.5, 16.1, 24.3, 10.1, 58.4, 10.4, 2.65, 3.8),
      comp('Deutsche Börse', 'DB1', 'DE', 60769, 9.64, 16.6, 14.1, 22.7, 7.0, 58.3, 14.0, 1.07, 4.5),
      comp('London Stock Exchange Group', 'LSEG', 'GB', 53114, 5.14, 10.4, 9.4, 24.0, 6.5, 48.4, 6.5, 1.96, 6.6),
      comp('Tradeweb Markets', 'TW', 'US', 25739, 11.52, 21.3, 16.8, 28.8, 13.3, 54.0, 10.1, -1.88, 4.1),
      comp('MSCI', 'MSCI', 'US', 40771, 14.12, 23.0, 20.2, 26.4, 10.2, 60.8, 39.9, 3.04, 3.6),
      comp('Euronext', 'ENX', 'NL', 16887, 9.82, 15.7, 14.1, 20.8, 8.3, 62.6, 10.9, 1.4, 3.7, eurcad),
    ],
    comentario: null,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2026-06', objetivo: 'RAFI Indices', comprador: 'TMX Group', ev: 683.2, ev_ventas: 10.0, ev_ebitda: 12.9, prima_pct: null, excluir: false, comentario: '490 M USD sobre ingresos de 49 M USD y EBITDA ajustado de 38 M USD (anualizados a mar-2026, sin auditar); 393 M USD netos del ahorro fiscal [9].' },
      { fecha: '2026-04', objetivo: 'Cboe Australia y Cboe Canada', comprador: 'TMX Group', ev: 409.9, ev_ventas: 4.7, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '300 M USD sobre unos 87 M CAD de ingresos de 2025; sin EBITDA publicado [11].' },
      { fecha: '2026-07', objetivo: 'MarketAxess Holdings', comprador: 'Intercontinental Exchange', ev: Math.round(5580 * usdcad), ev_ventas: 6.41, ev_ebitda: 13.0, prima_pct: null, excluir: false, comentario: 'Plataforma de renta fija; pendiente de cierre (1S27); 5.580 M USD [12].' },
      { fecha: '2023-06', objetivo: 'Adenza', comprador: 'Nasdaq', ev: Math.round(10500 * usdcad), ev_ventas: 17.8, ev_ebitda: 30.7, prima_pct: null, excluir: false, comentario: 'Software de riesgo y regulación; múltiplos sobre previsiones de 2023 [12].' },
      { fecha: '2020-11', objetivo: 'IHS Markit', comprador: 'S&P Global', ev: Math.round(44000 * usdcad), ev_ventas: 10.26, ev_ebitda: 24.0, prima_pct: null, excluir: false, comentario: 'Fusión en acciones; datos e índices [12].' },
      { fecha: '2019-08', objetivo: 'Refinitiv', comprador: 'London Stock Exchange Group', ev: Math.round(27000 * usdcad), ev_ventas: 4.35, ev_ebitda: 13.1, prima_pct: null, excluir: false, comentario: 'En acciones; terminales y datos [12].' },
    ],
    comentario: null,
    confianza: 'Media',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'bolsa', campo: 'posicion_corta_pct', tipo: 'Complemento', intentos: '1) CIRO (informe de posiciones cortas): no abre sin navegador; 2) Stock Analysis: no da cortos de TSX; 3) prensa (Globe and Mail): sin dato reciente', decision: 'Omitido' },
  ],
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const E = {
  _estado: 'completa',
  sentimiento: null,
  fuentes: [],
  huecos: [
    { seccion: 'sentimiento', campo: 'sección completa', tipo: 'Complemento', intentos: '1) Stocktwits (API de X.TO: 404) y Stockhouse y Reddit (403); 2) Seeking Alpha (RSS de TMXXF): solo titulares y transcripciones, sin comentarios; 3) Simply Wall St (narrativa de la comunidad: 0 comentarios, última de nov-2025) y Stockchase (redirige sin contenido)', decision: 'Omitido' },
  ],
};
guarda('E', E);
console.log('Notas A-E escritas.');
