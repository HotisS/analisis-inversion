// Escribe las notas A-E de DLocal Limited (Nasdaq: DLO; corte 2026-10-19, precio del 16-oct-2026) a partir de los documentos de
// notas/docs (20-F 2025, 2023 y 2022; 6-K de resultados 4T24-2T26 con sus anexos; 13D/A y 13G/A; Form 4), del XBRL de la SEC
// (cuentas-xbrl.json), de Yahoo Finance (bolsa y comparables), MarketScreener y Stock Analysis (consenso) y de foros.
// Cada nota cita con [n] de su propia lista. Cifras en millones de USD salvo que se diga otra cosa. Ejercicio natural.
// Ejecutar: node informes/dlocal-2026-10-19/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const SEC = 'https://www.sec.gov/Archives/edgar/data/1846832';
const r1 = (x) => Math.round(x * 10) / 10;
const r2 = (x) => Math.round(x * 100) / 100;

// ================================================================ A. Cuentas
const fA = [
  { id: 1, titulo: 'Form 20-F 2025 (cuentas consolidadas auditadas NIIF 2025-2023 con notas 5, 6, 13, 14, 16, 21, 22, 25-28 y 32; Item 5)', editor: 'DLocal Limited (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-03-18', url: `${SEC}/000207097926000113/dlo-20251231.htm` },
  { id: 2, titulo: 'Form 20-F 2023 (cuentas 2023-2021: ingresos por región, clientes y proveedores, concentración)', editor: 'DLocal Limited (SEC EDGAR)', tipo: 'Primaria', fecha: '2024-03-19', url: `${SEC}/000095017024033510/dlo-20231231.htm` },
  { id: 3, titulo: 'Form 20-F 2022 (cuentas 2022-2020: ingresos por región, deuda, salida a bolsa)', editor: 'DLocal Limited (SEC EDGAR)', tipo: 'Primaria', fecha: '2023-04-05', url: `${SEC}/000095017023011942/dlo-20221231.htm` },
  { id: 4, titulo: 'Datos XBRL de los 20-F (companyfacts): cuenta, balance y flujos 2019-2025', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-19', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0001846832.json' },
  { id: 5, titulo: 'dLocal Reports Second Quarter 2026 Financial Results (6-K, anexo 99.1)', editor: 'DLocal Limited (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-08-13', url: `${SEC}/000184683226000031/ex_991-dlocalxearningsxres.htm` },
  { id: 6, titulo: 'Unaudited Consolidated Condensed Interim Financial Statements at June 30, 2026 (6-K, notas 5, 14, 17, 18 y 22)', editor: 'DLocal Limited (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-08-13', url: `${SEC}/000184683226000031/dlo-20260630.htm` },
  { id: 7, titulo: 'dLocal Reports First Quarter 2026 Financial Results (6-K, anexo 99.1)', editor: 'DLocal Limited (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-05-14', url: `${SEC}/000184683226000019/ex_991-dlocalearningsresul.htm` },
  { id: 8, titulo: 'dLocal Reports 2025 Fourth Quarter Financial Results y guía 2026 (6-K, anexo 99.1)', editor: 'DLocal Limited (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-03-18', url: `${SEC}/000207097926000110/a991dlocal4q25_earningsres.htm` },
  { id: 9, titulo: '4Q25 Earnings Release y presentación (6-K, anexos 99.2 y 99.3): TPV por producto y flujo, ingresos y margen bruto por país, NRR, TAM', editor: 'DLocal Limited (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-03-18', url: `${SEC}/000207097926000110/a993dlocal_4q25xearnings.htm` },
  { id: 10, titulo: 'dLocal Reports Third Quarter 2025 Financial Results (6-K, anexo 99.1)', editor: 'DLocal Limited (SEC EDGAR)', tipo: 'Primaria', fecha: '2025-11-12', url: `${SEC}/000119312525277539/dlo-ex99_1.htm` },
  { id: 11, titulo: 'dLocal Reports Second Quarter 2025 Financial Results (6-K, anexo 99.1)', editor: 'DLocal Limited (SEC EDGAR)', tipo: 'Primaria', fecha: '2025-08-13', url: `${SEC}/000095017025108015/dlo-ex99_1.htm` },
  { id: 12, titulo: 'dLocal Reports First Quarter 2025 Financial Results (6-K, anexo 99.1)', editor: 'DLocal Limited (SEC EDGAR)', tipo: 'Primaria', fecha: '2025-05-14', url: `${SEC}/000095017025071516/dlo-ex99_1.htm` },
  { id: 13, titulo: 'dLocal Reports 2024 Fourth Quarter Financial Results (6-K, anexo 99.1)', editor: 'DLocal Limited (SEC EDGAR)', tipo: 'Primaria', fecha: '2025-02-27', url: `${SEC}/000095017025029045/dlo-ex99_1.htm` },
  { id: 14, titulo: 'DLocal (DLO) Q2 2026 earnings call transcript (resumen de la conferencia del 13-ago-2026)', editor: 'Earnings Whispers', tipo: 'Prensa', fecha: '2026-08-14', url: 'https://earningswhispers.com/transcript/DLO/Q22026' },
  { id: 15, titulo: 'DLocal Limited Declares Dividend Distribution (6-K, anexo 99.4)', editor: 'DLocal Limited (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-03-18', url: `${SEC}/000207097926000110/a994exdividendsannoucement2.htm` },
  { id: 16, titulo: 'dLocal posts mixed Q2 results with earnings miss, while revenue and payment volume beat', editor: 'Seeking Alpha (noticias)', tipo: 'Prensa', fecha: '2026-08-13', url: 'https://seekingalpha.com/news/4632769-dlocal-posts-mixed-q2-results-with-earnings-miss-while-revenue-and-payment-volume-beat' },
];

// Balance «limpio»: los fondos de comerciantes se netean (caja + cuentas a cobrar comerciales a procesadores − cuentas a pagar a comerciantes
// = caja propia, que cuadra con la «corporate cash» que publica la empresa: 427,9 frente a 424,5 en 2025 y 319,7 frente a 317,8 en 2024 [A1, A8]).
// Activo y pasivo se reducen en las cuentas a pagar a comerciantes. Clientes = anticipos y otras cuentas a cobrar; proveedores = otras cuentas a pagar.
const bruto = {
  // caja total, cuentas a cobrar comerciales netas, anticipos y otras, cuentas a pagar a comerciantes, otras a pagar (devengos + otras)
  2021: { at: 583.0, ac: 529.5, pc: 298.4, pt: 302.7, caja: 336.2, tr: 178.9, adv: 12.1, tp: 269.2, otp: 7.9, int: 47.0, ppe: 2.5, deuda: 27.0, arr: 3.9, pn: 280.3, mino: 0, res: 109.9 },
  2022: { at: 826.3, ac: 767.8, pc: 422.3, pt: 426.7, caja: 468.1, tr: 218.6, adv: 21.8, tp: 395.1, otp: 12.7, int: 51.4, ppe: 2.7, deuda: 20.2, arr: 4.1, pn: 399.6, mino: 0, res: 220.0 },
  2023: { at: 1084.5, ac: 1016.0, pc: 625.2, pt: 629.3, caja: 536.2, tr: 319.5, adv: 43.9, tp: 572.4, otp: 30.1, int: 57.9, ppe: 2.9, deuda: 0, arr: 4.0, pn: 455.0, mino: 0.1, res: 369.6 },
  2024: { at: 1171.3, ac: 1072.9, pc: 677.6, pt: 682.3, caja: 425.2, tr: 457.2, adv: 39.5, tp: 562.7, otp: 35.0, int: 63.3, ppe: 3.4, deuda: 50.5, arr: 4.0, pn: 488.9, mino: 0.1, res: 490.0 },
  2025: { at: 1541.0, ac: 1420.8, pc: 965.9, pt: 971.5, caja: 719.9, tr: 520.9, adv: 51.1, tp: 812.9, otp: 41.5, int: 74.0, ppe: 4.0, deuda: 86.9, arr: 3.4, pn: 569.3, mino: 0.2, res: 534.8 },
};
const balanceHist = Object.entries(bruto).map(([p, b]) => ({
  periodo: p, activo_total: r1(b.at - b.tp), activo_corriente: r1(b.ac - b.tp), pasivo_corriente: r1(b.pc - b.tp), pasivo_total: r1(b.pt - b.tp),
  fondo_comercio: 0, intangibles: b.int, inmovilizado_material: b.ppe, existencias: 0, clientes: b.adv, proveedores: b.otp,
  activos_contrato: null, pasivos_contrato: null, caja: r1(b.caja + b.tr - b.tp), deuda_financiera: b.deuda, arrendamientos: b.arr,
  patrimonio_neto: b.pn, minoritarios: b.mino, reservas: b.res,
}));
// Flujo operativo sin los fondos de comerciantes: flujo publicado − (Δ cuentas a pagar a comerciantes − Δ cuentas a cobrar comerciales).
const fo = { 2021: 108.5 - 16.1, 2022: 154.5 - 86.2, 2023: 293.5 - 76.4, 2024: -32.8 + 147.4, 2025: 415.5 - 186.5 };

const A = {
  _estado: 'completa',
  financieros: {
    cuenta: [
      { periodo: '2021', ingresos: 244.1, coste_ventas: 113.7, gastos_generales: 46.6, ebitda: 88.5, amortizaciones: 4.7, ebit: 83.8, resultado_financiero: 1.7, bai: 85.5, impuestos: 7.6, minoritarios: 0, beneficio_neto: 77.9, gastos_financieros: 0.5, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 0.25, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: 308.9 },
      { periodo: '2022', ingresos: 418.9, coste_ventas: 216.8, gastos_generales: 74.2, ebitda: 136.0, amortizaciones: 8.1, ebit: 127.9, resultado_financiero: -7.6, bai: 120.3, impuestos: 11.6, minoritarios: 0, beneficio_neto: 108.7, gastos_financieros: 1.0, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 0.35, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: 313.1 },
      { periodo: '2023', ingresos: 650.4, coste_ventas: 373.5, gastos_generales: 97.2, ebitda: 191.9, amortizaciones: 12.2, ebit: 179.7, resultado_financiero: -1.1, bai: 178.5, impuestos: 29.4, minoritarios: 0.1, beneficio_neto: 149.0, gastos_financieros: 0.5, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 1.7, bpa: 0.49, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: 303.0 },
      { periodo: '2024', ingresos: 746.0, coste_ventas: 451.3, gastos_generales: 154.2, ebitda: 157.7, amortizaciones: 17.2, ebit: 140.5, resultado_financiero: 10.5, bai: 151.0, impuestos: 30.6, minoritarios: 0.1, beneficio_neto: 120.4, gastos_financieros: 2.3, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 1.6, bpa: 0.39, dpa: 0.52, dpa_extraordinario: 0.52, acciones_diluidas: 305.1 },
      { periodo: '2025', ingresos: 1093.6, coste_ventas: 690.8, gastos_generales: 182.9, ebitda: 246.2, amortizaciones: 26.3, ebit: 219.9, resultado_financiero: 8.7, bai: 228.7, impuestos: 31.8, minoritarios: 0.1, beneficio_neto: 196.8, gastos_financieros: 15.9, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 0.9, bpa: 0.65, dpa: 0.19, dpa_extraordinario: 0, acciones_diluidas: 301.7 },
    ],
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 1355.9, ebitda: 266.3, ebit: 235.2, beneficio_neto: 204.0, bpa: 0.68, dpa: 0.19, dpa_extraordinario: 0, fcf: 186.0, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 4.4 },
    cambios_perimetro: [],
    comentario: 'Los ingresos pasaron de 244,1 M USD en 2021 a 1.093,6 M en 2025 (TCAC del 45 %), casi todo orgánico: los comerciantes con más de dos años en la plataforma generaron el 98,8 % del volumen de 2025 y los nuevos solo el 1-2 % de los ingresos [A1]. El margen se ha estrechado porque el volumen crece más que la comisión: el margen bruto sobre ingresos bajó del 40 % en 2024 al 37 % en 2025 y al 32 % en el 2T26, y el margen bruto sobre volumen (net take rate) del 1,09 % del 4T24 al 0,72 % del 2T26, por más volumen local-a-local, grandes comerciantes con tramos de precio y menos diferencial cambiario en mercados volátiles [A5, A8, A9]. El EBITDA publicado (EBIT + amortizaciones) cayó en 2024 (157,7 M desde 191,9 M) por Egipto, Argentina y la inversión en plantilla, y se recuperó en 2025 (246,2 M; margen del 22,5 %). La serie usa las cifras publicadas NIIF; la empresa dejó de usar el EBITDA ajustado en 2026 y guía el beneficio operativo [A6, A8]. Ningún año tiene cambios de perímetro relevantes: la compra de NeWurth (Camerún, 23,0 M en febrero de 2026) es pequeña [A1].',
    ajustes: 'Las cifras son las publicadas. El EBITDA ajustado de la empresa (278,1 M en 2025; 188,7 M en 2024) suma al EBITDA publicado los pagos en acciones (24,1 M en 2025), el deterioro de activos financieros, las «otras pérdidas operativas» (4,7 M, sobre todo saldos de comerciantes y procesadores dados de baja), los costes del informe del bajista y de las demandas y los gastos de la colocación secundaria [A1]. Solo tratamos como no recurrentes estos dos últimos (0,9 M en 2025; 1,6 M en 2024; 1,7 M en 2023) y, en el LTM, el ajuste de impuestos indirectos de ejercicios anteriores registrado en gastos operativos en el 1T26 (4,4 M) [A7]; los pagos en acciones y las bajas de saldos se repiten todos los años y se quedan dentro. El BPA de 2026 lleva además 5,3 M de ese ajuste en el impuesto de sociedades [A7]. El 2024 fue el año atípico: cayó el margen y el resultado financiero incluyó diferencias de cambio de un préstamo intragrupo con Argentina (cancelado en septiembre de 2025) [A1, A6].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '3T24', ingresos: 185.8, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.09, vs_consenso: null },
      { periodo: '4T24', ingresos: 204.5, crecimiento_pct: 8.8, crecimiento_organico_pct: null, ebitda: 47.3, margen_ebitda_pct: 23.1, bpa: 0.10, vs_consenso: null },
      { periodo: '1T25', ingresos: 216.8, crecimiento_pct: 17.6, crecimiento_organico_pct: null, ebitda: 51.1, margen_ebitda_pct: 23.6, bpa: 0.15, vs_consenso: null },
      { periodo: '2T25', ingresos: 256.5, crecimiento_pct: 49.7, crecimiento_organico_pct: null, ebitda: 61.3, margen_ebitda_pct: 23.9, bpa: 0.14, vs_consenso: null },
      { periodo: '3T25', ingresos: 282.5, crecimiento_pct: 52.0, crecimiento_organico_pct: 63.0, ebitda: 62.4, margen_ebitda_pct: 22.1, bpa: 0.17, vs_consenso: null },
      { periodo: '4T25', ingresos: 337.9, crecimiento_pct: 65.2, crecimiento_organico_pct: 69.0, ebitda: 71.4, margen_ebitda_pct: 21.1, bpa: 0.18, vs_consenso: null },
      { periodo: '1T26', ingresos: 335.9, crecimiento_pct: 54.9, crecimiento_organico_pct: 52.0, ebitda: 60.5, margen_ebitda_pct: 18.0, bpa: 0.14, vs_consenso: 'Inferior' },
      { periodo: '2T26', ingresos: 399.7, crecimiento_pct: 55.8, crecimiento_organico_pct: 50.0, ebitda: 72.1, margen_ebitda_pct: 18.0, bpa: 0.18, vs_consenso: 'Inferior' },
    ],
    ultima_presentacion: 'En la conferencia del 1T26 (14-may) la dirección presentó el trimestre como de transición: gastos operativos +58 % interanuales por el arrastre de la inversión de 2025, un ajuste de impuestos de ejercicios anteriores de 9,7 M y un flujo de caja libre ajustado de solo 14,7 M por circulante (créditos fiscales y anticipos a comerciantes), con la promesa de apalancamiento operativo en el segundo semestre; la acción cayó un 13 % al día siguiente [A7]. En la del 2T26 (13-ago) el discurso pasó de inversión a escala: volumen +92 %, margen bruto récord de 127 M, beneficio operativo +22 % trimestral y FCF ajustado de 68,5 M; subió la guía de volumen (60-70 %) y de margen bruto (25-30 %) pero mantuvo la de beneficio operativo (27,5-32,5 %) [A5]. Los analistas (Goldman Sachs, JP Morgan, Truist, UBS, HSBC y otros) preguntaron sobre todo por el suelo de la comisión, la caída del margen bruto en México y la trayectoria de márgenes hacia 2027. El consejero delegado dijo que, sin un gran comerciante de VTC local-a-local, la comisión habría sido casi plana y que su caída es «asintótica»; que más del 60 % del código ya lo escribe la IA, y que el tipo efectivo subirá desde 2027 por el Pilar 2 de la OCDE. **No dio** suelo de la comisión, ni guía de 2027, ni el efecto del Pilar 2, ni cuantificó el efecto cambiario en la guía de beneficio operativo [A14]. El BPA de los dos trimestres de 2026 quedó por debajo del consenso (0,14 frente a 0,16 y 0,18 frente a 0,20) aunque los ingresos lo superaron [A16].',
    confianza: 'Alta',
  },
  balance: {
    historico: balanceHist,
    vencimientos: [{ anio: '2026', importe: 64.6 }, { anio: '2027', importe: 54.5 }, { anio: '2028', importe: 54.5 }, { anio: '2029', importe: 41.0 }],
    liquidez: 'Caja propia («corporate cash») de 369,1 M USD a 30-jun-2026 sobre una caja total de 794,9 M (los otros 425,9 M son de comerciantes), más 79,2 M en letras del Tesoro de EE. UU. y bonos argentinos, de los que 59,3 M garantizan préstamos en pesos; préstamo sindicado sin garantías de 150 M firmado el 12-ago-2026 (SOFR + 2,00 %, 11 cuotas trimestrales de 13,6 M desde febrero de 2027, vence en agosto de 2029) [A5, A6].',
    rating: 'Sin rating',
    coste_deuda_pct: 6.5,
    vida_media_anios: 1.5,
    otros_pasivos: 'El pasivo relevante no es deuda: son 1.555 M de cuentas a pagar comerciales a 30-jun-2026, casi todo dinero de comerciantes pendiente de liquidar, frente a 1.149 M de cuentas a cobrar (a procesadores y adquirentes) y 425,9 M de caja de comerciantes [A6]. Lo hemos neteado en el balance histórico y en el puente (caja propia = la que publica la empresa). Riesgos asociados: si un procesador o adquirente quiebra, dLocal paga igualmente al comerciante y no está asegurada (en 2025 dio de baja 2,1 M de un procesador y reclama el resto) [A1]. No hay pensiones. Provisiones laborales y civiles de solo 0,4 M; las demandas colectivas de Nueva York (OPV de 2021) se desestimaron en apelación en abril de 2026 y queda la federal de Laurenzi sin provisión [A1, C7]. Fondos en garantía y caja restringida de 24,6 M (Egipto y Marruecos) [A6]. Los préstamos en pesos argentinos (64,6 M a junio) financian anticipos a comerciantes y su coste va en el coste de los servicios [A6].',
    comentario: 'Con los fondos de comerciantes fuera, el balance es de caja neta: caja propia de 427,9 M a cierre de 2025 frente a 86,9 M de deuda en pesos de corto plazo, y de 369,1 M a junio de 2026 tras pagar 57,2 M de dividendo y recomprar 86,1 M en el semestre [A1, A5]. El circulante propio (anticipos menos otras cuentas a pagar) es pequeño, unos 10 M, pero la caja propia fluctúa con los anticipos a comerciantes y el calendario de créditos fiscales: por eso el FCF ajustado del 1T26 fue de 14,7 M y el del 2T26 de 68,5 M [A5, A7]. El balance bruto creció mucho más que el negocio en el 1S26 (cuentas a cobrar de 521 M a 1.085 M) por el volumen de grandes comerciantes, sin efecto en la caja propia.',
    confianza: 'Media',
  },
  flujos: {
    historico: Object.entries(fo).map(([p, v]) => ({
      periodo: p, flujo_operativo: r1(v), capex: { 2021: 48.0, 2022: 12.4, 2023: 18.2, 2024: 22.6, 2025: 36.8 }[p],
      pagos_arrendamientos: { 2021: 0.4, 2022: 0.4, 2023: 1.1, 2024: 0.6, 2025: 0.6 }[p], adquisiciones: 0, desinversiones: 0,
      dividendos: { 2021: 0, 2022: 0, 2023: 0, 2024: 0, 2025: 150.0 }[p], recompras: { 2021: 0, 2022: 2.0, 2023: 97.9, 2024: 101.1, 2025: 0 }[p],
      emision_acciones: { 2021: 150.3, 2022: 3.9, 2023: 0, 2024: 50.4, 2025: 51.8 }[p], intereses_en_financiacion: 0,
    })),
    comentario: 'El flujo operativo publicado mezcla el dinero de los comerciantes (415,5 M en 2025 y −32,8 M en 2024) y no sirve para medir la caja que genera el negocio. Lo hemos limpiado restando la variación de las cuentas a pagar a comerciantes menos la de las cuentas a cobrar comerciales: 229,0 M en 2025 y 114,6 M en 2024, que menos el capex dan 192,2 M y 92,0 M, casi lo mismo que el «FCF ajustado» de la empresa (191 M y unos 91 M) [A1, A8]. 2021 es una estimación propia con los saldos totales porque el 20-F 2022 no separa los de comerciantes de 2020. La conversión de beneficio en caja libre es de casi el 100 % (FCF ajustado del 97 % del beneficio en 2025; 86 % en el 1S26) [A8, A14]. El capex es software capitalizado (3,4 % de los ingresos en 2025, de los que 20,8 M se amortizan en el coste de los servicios) y no distinguimos mantenimiento de crecimiento: la empresa no lo publica. Los intereses de los préstamos en pesos (15,9 M pagados en 2025) se registran como coste de los anticipos dentro del coste de los servicios, por lo que no se restan otra vez [A1, A6].',
    confianza: 'Media',
  },
  calidad: {
    auditor: 'Price Waterhouse & Co. S.R.L. (PwC Argentina)', anios_auditor: 6, opinion: 'Favorable, también sobre el control interno a 31-dic-2025',
    comentario: 'PwC audita desde 2020 y emite opinión favorable sobre las cuentas y el control interno de 2025; los honorarios fueron de 2,47 M USD, con un sobrecoste de 0,125 M en la auditoría de 2024 [A1]. Los ingresos se reconocen en el momento de cada transacción y en bruto (dLocal actúa como principal), lo que hincha ingresos y costes frente a quienes contabilizan en neto: por eso miramos también el margen bruto y el volumen [A1]. Se capitaliza software (36,8 M en 2025, 3,4 % de los ingresos) y los pagos en acciones restan 24,1 M (2,2 % de los ingresos; 12,2 % del beneficio) [A1]. El 1T26 incluyó un ajuste de 9,7 M por impuestos de ejercicios anteriores sobre productos de pago a plazos: no material, pero muestra el riesgo fiscal de operar en 40-60 países [A7]. El informe del bajista de 2022-23 (Muddy Waters) motivó una revisión forense y demandas; la demanda de Nueva York se desestimó entera en apelación en abril de 2026 [A1, C7]. Los indicadores del motor (Altman, Piotroski, Beneish) se calculan sobre el balance neteado y deben leerse con cautela en un procesador de pagos.',
    senales: [
      { senal: 'Ingresos en bruto y cambio de presentación de la métrica de gestión', nivel: 'Baja', comentario: 'Desde 2026 la empresa abandona el EBITDA ajustado y guía el beneficio operativo publicado, una mejora de transparencia [A6, A8].' },
      { senal: 'Ajustes fiscales de ejercicios anteriores', nivel: 'Media', comentario: '9,7 M en el 1T26 (4,4 M en gastos operativos y 5,3 M en el impuesto); riesgo de repetición en jurisdicciones con normas cambiantes (Brasil, Argentina) [A7].' },
      { senal: 'Bajas de saldos con procesadores y comerciantes', nivel: 'Baja', comentario: '«Otras pérdidas operativas» de 4,7 M en 2025 y 5,3 M en 2024, más 2,1 M de un procesador en litigio [A1].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Desde 2025 la empresa reparte el 30 % del FCF ajustado del año anterior: 57,2 M (0,1939 USD por acción) pagados el 10-jun-2026 con cargo a 2025 [A1, A15]. En 2025 pagó además un dividendo extraordinario de 150 M [A1]. El 13-mar-2026 aprobó recomprar hasta 300 M en acciones de clase A hasta marzo de 2027; a 30-jun había comprado 6,9 M de acciones por 86,1 M (12,49 USD de media) y las amortizó [A6]. La prioridad declarada es no acumular caja por encima de la liquidez mínima operativa [A8].',
    adquisiciones: [
      { anio: '2021', objetivo: 'PrimeiroPay (Brasil, pagos)', importe: null, ev_ebitda: null, financiacion: 'Caja', resultado: 'Integrada; la directora jurídica actual procede de esa compra [A1]. Sin deterioros.' },
      { anio: '2022', objetivo: 'Demerge (Argentina y Brasil, servicios y activos virtuales)', importe: null, ev_ebitda: null, financiacion: 'Caja', resultado: 'Integrada como filiales de cobro; sin deterioros publicados [A1].' },
      { anio: '2026', objetivo: 'Mint Code Solutions (Camerún) y activos de NeWurth en África', importe: 23.0, ev_ebitda: null, financiacion: 'Ejercicio de una opción de compra; liberación de un crédito previo', resultado: 'Fondo de comercio de 6,6 M; refuerza África [A1, A6].' },
    ],
    comentario: 'La asignación de capital es buena en lo esencial y ha mejorado en 2025-26: el negocio necesita muy poco capital (capex del 3,4 % de los ingresos) y devuelve la caja sobrante con dividendo y recompras, sin compras grandes. Entre 2023 y 2025 recompró 199 M y en 2026 otros 86,1 M a precios medios de unos 12,5 USD, y pagó 207 M en dividendos [A1, A6]. La dilución por pagos en acciones es moderada (7,8 M de acciones potenciales sobre 288 M) [A6]. El punto débil fue 2022-24: entró en Nigeria, Egipto y Argentina con diferenciales cambiarios altos que luego se evaporaron, y el ROIC cayó [A1].',
    confianza: 'Media',
  },
  negocio_datos: true,
  huecos: [
    { seccion: 'trimestres', campo: 'EBITDA y crecimiento del 3T24', tipo: 'Complemento', intentos: '1) Nota de prensa del 3T25 (solo comparativos de ingresos y BPA); 2) nota del 4T24; 3) restar del año requiere el 3T23, no descargado', decision: 'Omitido' },
    { seccion: 'trimestres', campo: 'Consenso previo de los trimestres de 2024-2025', tipo: 'Complemento', intentos: '1) Notas de prensa (no lo dan); 2) Seeking Alpha y Earnings Whispers solo para 2026; 3) Nasdaq/Zacks solo 2T26', decision: 'Omitido' },
  ],
  fuentes: fA,
};
delete A.negocio_datos;

// ---------------------------------------------------------------- negocio (datos de A, texto de B)
const segmentos = [
  { nombre: 'Brasil', h: [59.7, 84.0, 159.0, 152.0, 207.2], d: 'Comercio electrónico, streaming, publicidad, VTC, viajes y remesas; 25 % del margen bruto de 2025 (101,0 M) [A9].' },
  { nombre: 'Argentina', h: [50.2, 77.6, 75.1, 85.5, 161.1], d: 'Hiperinflación y control de cambios: diferencial cambiario alto pero volátil; margen bruto 44,8 M en 2025 y 8,3 M en el 4T25 por las elecciones [A9].' },
  { nombre: 'México', h: [33.4, 68.0, 116.8, 149.2, 183.0], d: 'Grandes comerciantes «Tier 0» con precio por tramos: ingresos +64 % en el 2T26 pero margen bruto a la baja [A5, A9].' },
  { nombre: 'Resto de Latinoamérica', h: [80.4, 115.8, 141.7, 175.5, 322.8], d: 'Chile, Colombia, Perú, Ecuador, Bolivia y otros; Chile pesaba 55,7 M en 2023 [A2].' },
  { nombre: 'África y Asia', h: [20.5, 73.6, 157.7, 183.8, 219.4], d: 'Egipto (59,7 M en 2025; 94,0 M en 2024), Nigeria (84,0 M en 2023), Sudáfrica, Turquía, Vietnam, Mozambique, Marruecos y otros [A1, A2, A9].' },
];
const negocioDatos = {
  segmentos: segmentos.map((s) => ({ nombre: s.nombre, descripcion: s.d, tipo_resultado: null, historico: s.h.map((v, i) => ({ periodo: String(2021 + i), ingresos: v, resultado: null })) })),
  geografias: [
    { nombre: 'Brasil', peso_pct: 18.9 }, { nombre: 'México', peso_pct: 16.7 }, { nombre: 'Argentina', peso_pct: 14.7 },
    { nombre: 'Resto de Latinoamérica', peso_pct: 29.5 }, { nombre: 'Egipto', peso_pct: 5.5 }, { nombre: 'Resto de África y Asia', peso_pct: 14.7 },
  ],
  geografias_criterio: 'destino',
  kpis: [
    { kpi: 'Volumen de pagos (TPV)', valor_anterior: '25.575 M USD (2024)', valor_actual: '40.816 M USD (2025); 31.749 M en el 1S26', variacion: '+60 %; +83 % en el 1S26', comentario: 'Siete trimestres seguidos por encima del +50 % [A5, A8].' },
    { kpi: 'Margen bruto sobre volumen (net take rate)', valor_anterior: '1,15 % (2024)', valor_actual: '0,99 % (2025); 0,72 % en el 2T26', variacion: '−16 pb; −35 pb interanual en el 2T26', comentario: 'Cae por mezcla local-a-local, tramos de precio de grandes comerciantes y menos diferencial cambiario [A5, A9].' },
    { kpi: 'Retención neta de ingresos (NRR)', valor_anterior: '113 % (2024)', valor_actual: '145 % (2025)', variacion: '+32 puntos', comentario: 'El crecimiento sale de los comerciantes existentes [A1].' },
    { kpi: 'Peso de los 10 primeros comerciantes', valor_anterior: '62 % (2024)', valor_actual: '61 % (2025 y 1S26)', variacion: '−1 punto', comentario: 'Dos comerciantes superan el 10 % de los ingresos cada uno [A1, A6].' },
    { kpi: 'Volumen local-a-local', valor_anterior: '53 % (2024)', valor_actual: '50 % (2025); 61 % en el 2T26', variacion: '+11 puntos en el 2T26', comentario: 'Menos comisión por operación que el transfronterizo [A9, A14].' },
    { kpi: 'Empleados (FTE)', valor_anterior: '1.095 (2024)', valor_actual: '1.274 (2025)', variacion: '+16 %', comentario: 'Plantilla estable en 2026 según la dirección [A1, A14].' },
  ],
};

// ================================================================ B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Form 20-F 2025, Item 4 (negocio, competencia, licencias) e Item 5', editor: 'DLocal Limited (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-03-18', url: `${SEC}/000207097926000113/dlo-20251231.htm` },
  { id: 2, titulo: '4Q25 Earnings Presentation (6-K, anexo 99.3): TAM de pagos digitales en emergentes (Statista), cuota de cartera y vectores de crecimiento', editor: 'DLocal Limited (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-03-18', url: `${SEC}/000207097926000110/a993dlocal_4q25xearnings.htm` },
  { id: 3, titulo: 'Remittances nearly double in a decade: migrants send home US$729 billion in 2025 (informe Sending Money Home 2026 del FIDA)', editor: 'The Gleaner', tipo: 'Prensa', fecha: '2026-09-16', url: 'https://jamaica-gleaner.com/article/news/20260916/remittances-nearly-double-decade-migrants-send-home-us729-billion-2025' },
  { id: 4, titulo: 'Remittance flows to low-middle-income countries moderated in 2023, reaching $656 billion: World Bank', editor: 'WAM', tipo: 'Prensa', fecha: '2024-06-26', url: 'https://www.wam.ae/en/article/b3uyx4u-remittance-flows-low-middle-income-countries' },
  { id: 5, titulo: 'The 2025 McKinsey Global Payments Report', editor: 'McKinsey & Company (copia de finews.asia)', tipo: 'Sectorial', fecha: '2025-09-29', url: 'https://www.finews.asia/images/download/McKinsey_The_2025_Global_Payments_Report_DRAFT_EMBARGOv2914040.pdf' },
  { id: 6, titulo: 'Fichas de Yahoo Finance de Adyen, PayPal, Payoneer, Flywire, Remitly y Wise (ingresos y margen operativo de los últimos 12 meses)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/DLO/' },
  { id: 7, titulo: 'Adyen: informe value del 12-oct-2026 (cuenta 2025 de las cuentas anuales de Adyen)', editor: 'Repositorio propio (informes/adyen-2026-10-12)', tipo: 'Datos de mercado', fecha: '2026-10-12', url: 'https://www.adyen.com/investor-relations' },
  { id: 8, titulo: 'dLocal Reports Second Quarter 2026 Financial Results (6-K, anexo 99.1)', editor: 'DLocal Limited (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-08-13', url: `${SEC}/000184683226000031/ex_991-dlocalxearningsxres.htm` },
  { id: 9, titulo: 'DLocal (DLO) Q2 2026 earnings call transcript', editor: 'Earnings Whispers', tipo: 'Prensa', fecha: '2026-08-14', url: 'https://earningswhispers.com/transcript/DLO/Q22026' },
  { id: 10, titulo: 'Unaudited Interim Financial Statements at June 30, 2026 (nota 1: licencias, activos digitales)', editor: 'DLocal Limited (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-08-13', url: `${SEC}/000184683226000031/dlo-20260630.htm` },
  { id: 11, titulo: 'Form 20-F 2022 (salida a bolsa de 2021, Item 4)', editor: 'DLocal Limited (SEC EDGAR)', tipo: 'Primaria', fecha: '2023-04-05', url: `${SEC}/000095017023011942/dlo-20221231.htm` },
  { id: 12, titulo: 'DLocal Limited Announces Pricing of Secondary Offering (6-K, anexo 99.1)', editor: 'DLocal Limited (SEC EDGAR)', tipo: 'Primaria', fecha: '2025-09-03', url: `${SEC}/000095010325011217/dp233930_ex9901.htm` },
];
const B = {
  _estado: 'completa',
  historia: {
    resumen: 'dLocal nace en enero de 2016 en Montevideo como escisión de AstroPay, de la mano de Sergio Fogel y Andrés Bzurovski, para cobrar en mercados emergentes por cuenta de grandes comerciantes globales [B1, B11]. General Atlantic entró en 2020 y la empresa salió a bolsa en el Nasdaq en junio de 2021, con un pico de capitalización por encima de 20.000 M USD. En noviembre de 2022 un informe bajista (Muddy Waters) cuestionó sus cifras; siguieron demandas, una revisión forense y la salida del consejero delegado fundador. Pedro Arnt, ex director financiero de Mercado Libre, es consejero delegado desde abril de 2023. De 2022 a 2024 la comisión cayó y la acción perdió un 87 % desde máximos; desde 2025 el volumen se ha acelerado (+60 % en 2025) y la empresa reparte caja [B1, B8].',
    hitos: [
      { anio: '2016', hito: 'Fundación en Uruguay por los creadores de AstroPay; primer gran comerciante de comercio electrónico en 2018 [B1].' },
      { anio: '2021', hito: 'Salida a bolsa en el Nasdaq (junio); compra de PrimeiroPay en Brasil [B11].' },
      { anio: '2022', hito: 'Entrada fuerte en Nigeria y Egipto; informe bajista en noviembre [B1, B11].' },
      { anio: '2023', hito: 'Pedro Arnt, consejero delegado; caída de Nigeria por la devaluación del naira; primeras recompras [B1].' },
      { anio: '2024', hito: 'Egipto llega a 94 M de ingresos; la comisión cae y el EBITDA baja; licencia de entidad de pago en Reino Unido [B1, B10].' },
      { anio: '2025', hito: 'Volumen +60 %; dividendo extraordinario de 150 M; colocación secundaria de General Atlantic en septiembre; consejo con cinco independientes [B1, B12].' },
      { anio: '2026', hito: 'Política de dividendo del 30 % del FCF, recompra de 300 M, crédito sindicado de 150 M; volumen del 2T26 +92 %; entra en el Russell 2000 [B8, B10].' },
    ],
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'dLocal es una plataforma de pagos que conecta a comerciantes globales (Amazon, Uber, Spotify, Microsoft, Shopify y similares, según el 20-F «tecnológicos de alto crecimiento») con consumidores y proveedores de más de 40 países emergentes de Latinoamérica, África y Asia [B1]. Con un solo contrato y una sola API, el comerciante cobra en moneda local (pay-in: tarjetas locales, Pix, transferencias, efectivo, monederos) y paga en moneda local a conductores, vendedores o creadores (pay-out). dLocal cobra localmente, convierte la divisa, repatría el dinero y lo liquida al comerciante en dólares o euros (transfronterizo, 50 % del volumen de 2025) o en moneda local cuando el comerciante tiene filial (local-a-local, 50 %) [B1, B2]. Los pay-in son el 69 % del volumen. Tiene 1.274 empleados y licencias en decenas de países, incluida la de entidad de dinero electrónico en la UE y la de entidad de pago en Reino Unido [B1, B10].',
    como_gana_dinero: 'Cobra una comisión por operación aprobada (porcentaje o fijo) más un diferencial cambiario en las transfronterizas, y paga a bancos, adquirentes y métodos de pago locales una comisión que es su coste principal (655 M de los 691 M de coste de los servicios de 2025) [B1]. El margen bruto sobre volumen (0,99 % en 2025; 0,72 % en el 2T26) es la variable clave: depende de la mezcla transfronterizo/local, de los tramos de precio de los grandes comerciantes, del coste de expatriar divisa y de la volatilidad cambiaria (en Egipto, Nigeria o Argentina el diferencial se amplía con la crisis y se cierra al normalizarse) [B2, B9]. Casi todo es recurrente: el 98,8 % del volumen viene de comerciantes con más de dos años en la plataforma [B1]. Hay apalancamiento operativo: el gasto operativo es fijo a corto plazo (unos 63 M por trimestre) y la dirección busca un beneficio operativo de más del 50 % del margen bruto [B8].',
    clientes: 'Concentración alta: los diez primeros comerciantes son el 61 % de los ingresos (2025 y 1S26) y dos superan cada uno el 10 % [B1, B10]. Los contratos son indefinidos y se pueden rescindir con preaviso sin penalización, pero el coste real de cambiar es alto (licencias, integración en 40 países, conversión). La retención neta de ingresos fue del 145 % en 2025 (113 % en 2024) y la cuota de cartera en los comerciantes actuales ronda el 10 % [B1, B2]. **Poder de precios: negativo.** La comisión efectiva ha caído cada año (margen bruto sobre volumen del 1,15 % en 2024 al 0,99 % en 2025 y al 0,72 % en el 2T26) porque los grandes comerciantes pasan a tramos de volumen más baratos; la empresa lo presenta como «descuento estructural por volumen» [B2, B8]. En Egipto un gran comerciante redujo su cuota con dLocal en 2025 [B2].',
    confianza: 'Media',
  },
  sector: {
    definicion: 'El mercado relevante es el de los pagos digitales de comercio electrónico y remesas recibidas en los países emergentes donde opera dLocal, sin China: el volumen que los comerciantes globales y locales cobran o pagan en esos países. Usamos la estimación de la propia dLocal con datos de Statista (2,1 billones USD en 2025 y unos 4,2 billones en 2030), que es la que la empresa compara con su volumen [B2]. La contrastamos con las remesas a países de renta baja y media, una parte del perímetro: 656.000 M USD en 2023 según el Banco Mundial y 728.600 M en 2025 según el FIDA [B3, B4]. McKinsey da el marco de ingresos: el sector de pagos generó 2,5 billones USD de ingresos en 2024 y crecerá un 4 % anual hasta 2029 [B5]. Como dLocal cobra un porcentaje del volumen, la serie va en volumen y la cuota se mide sobre él.',
    tamano: '≈ 2,1 billones USD de volumen de pagos digitales (comercio electrónico y remesas recibidas) en los mercados emergentes de dLocal en 2025; ≈ 4,2 billones en 2030e (Statista, citado por dLocal) [B2].',
    unidad_serie: 'miles de millones de USD de volumen (estimación propia por interpolación geométrica entre 2025 y 2030e de la cifra de dLocal/Statista)',
    serie: [{ anio: '2025', tamano: 2100 }, { anio: '2026e', tamano: 2412 }, { anio: '2027e', tamano: 2771 }, { anio: '2028e', tamano: 3183 }, { anio: '2029e', tamano: 3656 }, { anio: '2030e', tamano: 4200 }],
    tcac_historico_pct: null, tcac_previsto_pct: 14.9, cr5_pct: null, estructura: 'Fragmentada',
    drivers: [
      { driver: 'Digitalización del pago y comercio electrónico en emergentes', efecto: '+', horizonte: 'Estructural', evidencia: 'El TAM de dLocal se duplica de 2,1 a 4,2 billones USD entre 2025 y 2030 (TCAC del 15 %) [B2].' },
      { driver: 'Comerciantes globales que localizan cobros y pagos (VTC, reparto, streaming, IA, cripto)', efecto: '+', horizonte: 'Estructural', evidencia: 'NRR del 145 % en 2025; los 50 primeros comerciantes operan de media en solo 12 de los 44 países [B1, B2].' },
      { driver: 'Remesas y pagos a trabajadores de plataformas', efecto: '+', horizonte: 'Estructural', evidencia: 'Remesas a países de renta baja y media de 728.600 M USD en 2025, casi el doble que en 2016 [B3].' },
      { driver: 'Normalización cambiaria y fin de los controles de capital', efecto: '−', horizonte: 'Cíclico', evidencia: 'Egipto pasó de 94,0 M de ingresos en 2024 a 59,7 M en 2025 al cerrarse el diferencial; Argentina se hundió en margen bruto en el 4T25 (8,3 M) por las elecciones [B2].' },
      { driver: 'Pagos instantáneos públicos (Pix, SPEI) y presión de precios', efecto: '−', horizonte: 'Estructural', evidencia: 'McKinsey prevé que los ingresos del sector crezcan solo un 4 % anual hasta 2029 por el paso a cuenta-a-cuenta [B5].' },
      { driver: 'Divisas y tipos de interés de los emergentes', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'En moneda constante el volumen del 2T26 creció un 80 % frente al 92 % publicado [B8].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 4, justificacion: 'Compite con Adyen, Stripe, EBANX, PayU (Prosus), Rapyd, Nuvei y bancos locales; la comisión efectiva de dLocal ha caído un 37 % en 6 trimestres [B1, B8].' },
      { fuerza: 'Poder de los clientes', intensidad: 5, justificacion: 'Diez comerciantes son el 61 % de los ingresos y negocian tramos de volumen; dos superan el 10 % cada uno [B1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 3, justificacion: 'Adquirentes, bancos y métodos de pago locales cobran el 60 % de los ingresos; el coste de procesamiento como % del volumen subió en México en el 2T26 [B1, B9].' },
      { fuerza: 'Amenaza de entrada', intensidad: 3, justificacion: 'Las licencias y conexiones en 40 países son una barrera; los grandes procesadores globales (Adyen, Stripe) entran país a país [B1].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'Los comerciantes pueden montar filiales locales y procesar con adquirentes locales; las monedas estables pueden abaratar la liquidación transfronteriza [B1, B10].' },
    ],
    ciclo: { posicion: 'Expansión', comentario: 'El volumen se acelera (+92 % en el 2T26, máximo de cuatro años) con el comercio electrónico y las plataformas en Latinoamérica, mientras los diferenciales cambiarios se estrechan [B8]. En 2020 el sector se benefició del cierre de tiendas (ingresos de dLocal +88 %); en 2022 sufrió la subida de tipos y los controles de capital de Argentina, Nigeria y Egipto. El ciclo de dLocal lo marcan más las crisis cambiarias de cada país que el consumo mundial [B1].' },
    regulacion: 'Cada país regula pagos, divisas e impuestos: dLocal es entidad de dinero electrónico en la UE, entidad de pago en Reino Unido, está registrada en FinCEN y tiene licencias locales en Brasil, México y otros [B10]. Afectan a las cifras: el control de cambios argentino (indagaciones administrativas desde 2023, sin sanciones), la restricción de repatriación en Egipto y Nigeria, la reforma tributaria de Brasil y el IOF sobre operaciones de cambio, y desde 2027 el impuesto mínimo global del Pilar 2 de la OCDE, que subirá su tipo efectivo del 14-16 % actual [B1, B9].',
    tendencias: 'Tres tendencias: los comerciantes globales pasan de liquidar en dólares a operar en local (el local-a-local llegó al 61 % del volumen en el 2T26), lo que da volumen a dLocal pero menos margen por operación [B9]; los pagos instantáneos públicos (Pix, SPEI) abaratan el cobro y dLocal los integra; y las monedas estables (USDC, USDT), que dLocal ya usa como activos de liquidación de tránsito, pueden abaratar la parte transfronteriza y la expatriación [B10]. La IA genera más del 60 % de su código y abre comerciantes nuevos (empresas de IA que cobran en emergentes) [B2, B9].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 2.4,
    posicion: 'Principal procesador independiente especializado en emergentes para comerciantes globales; menos del 2 % del TAM en 2025 y en torno al 2,4 % en los 12 meses a junio de 2026 (estimación propia: 55.200 M de volumen sobre ≈ 2,25 billones) [B2, B8].',
    competidores: [
      { nombre: 'Adyen', pais: 'Países Bajos', ticker: 'ADYEN.AS', ingresos: 2651, cuota_pct: null, margen_ebit_pct: 46.9, comentario: 'Procesador global con licencia bancaria; ingresos netos 2.364 M EUR en 2025, convertidos a 1,1213; crece en Latinoamérica con adquirencia local [B7].' },
      { nombre: 'PayPal (incluye Braintree)', pais: 'EE. UU.', ticker: 'PYPL', ingresos: 34128, cuota_pct: null, margen_ebit_pct: 17.0, comentario: 'Monedero y procesador; compite en pay-in transfronterizo y en pagos a autónomos (Hyperwallet) [B6].' },
      { nombre: 'Payoneer', pais: 'EE. UU.', ticker: 'PAYO', ingresos: 1081, cuota_pct: null, margen_ebit_pct: 6.2, comentario: 'Pagos transfronterizos a pymes y vendedores de marketplaces en emergentes [B6].' },
      { nombre: 'Flywire', pais: 'EE. UU.', ticker: 'FLYW', ingresos: 714, cuota_pct: null, margen_ebit_pct: -1.4, comentario: 'Pagos transfronterizos de educación, salud y viajes [B6].' },
      { nombre: 'Remitly', pais: 'EE. UU.', ticker: 'RELY', ingresos: 1810, cuota_pct: null, margen_ebit_pct: 14.3, comentario: 'Remesas digitales a emergentes; compite en pay-out [B6].' },
      { nombre: 'EBANX', pais: 'Brasil', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Rival directo no cotizado: pay-in local en Latinoamérica para comerciantes globales [B1].' },
      { nombre: 'Stripe', pais: 'EE. UU.', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'No cotiza; amplía métodos locales en Latinoamérica y monedas estables (Bridge) [B1].' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 2, evidencia: 'Más volumen da mejor liquidez de divisa y mejores datos de aprobación, que atraen más comerciantes («aggregation theory» de la guía 2026) [B2].' },
        { fuente: 'Costes de cambio', puntuacion: 3, evidencia: 'NRR del 145 % y 98,8 % del volumen de comerciantes con más de dos años; pero los contratos se rescinden sin penalización y un gran comerciante redujo su cuota en Egipto [B1, B2].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'Licencias y conexiones en más de 40 países y experiencia regulatoria difícil de copiar rápido [B1, B10].' },
        { fuente: 'Ventaja en costes', puntuacion: 2, evidencia: 'Gasto operativo de 63 M al trimestre para 17.700 M de volumen; pero la comisión cae más rápido que el coste unitario [B8].' },
        { fuente: 'Escala eficiente', puntuacion: 2, evidencia: 'Nichos país a país donde pocos procesadores tienen licencia; Adyen y Stripe tienen más escala global [B1].' },
      ],
    },
    amenazas: 'La mayor amenaza es que los grandes comerciantes (dos superan el 10 % de los ingresos) internalicen el cobro local o lo repartan entre varios procesadores, como ocurrió en Egipto en 2025; probabilidad media. Segunda: Adyen y Stripe con adquirencia local en Brasil y México, que presiona la comisión; ya visible en el margen bruto mexicano del 2T26. Tercera: que la normalización cambiaria (Argentina, Egipto, Nigeria) cierre los diferenciales que hoy dan margen. Cuarta, a más plazo: monedas estables y pagos instantáneos que abaraten la expatriación [B1, B2, B9].',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Los asuntos ESG que mueven las cifras son de gobierno y cumplimiento, no ambientales: prevención de blanqueo y sanciones en 40 países con controles de cambio (las indagaciones en Argentina desde 2023 son el ejemplo) [B1]; protección de datos y ciberseguridad de una plataforma que mueve 70.000 M al año, supervisadas por el comité de producto y tecnología creado en 2025 [B1]; e inclusión financiera, que es parte del negocio (pagos a conductores y vendedores con monederos locales) [B1].',
    controversias: 'Informe bajista de Muddy Waters (noviembre de 2022) y demandas colectivas por la salida a bolsa: la de Nueva York se desestimó en primera instancia (marzo de 2025) y en apelación por unanimidad (abril de 2026); sigue la federal (Laurenzi) sin provisión [B1, C7]. Indagaciones administrativas y judiciales en Argentina sobre cambios e impuestos, sin sanción [B1].',
    confianza: 'Media',
  },
  huecos: [
    { seccion: 'sector', campo: 'TCAC histórico y cuota de los cinco primeros', tipo: 'Complemento', intentos: '1) 20-F y presentación (solo TAM 2025 y 2030); 2) búsqueda de estudios de Statista y PCMI (de pago); 3) McKinsey solo da ingresos globales del sector', decision: 'Omitido' },
    { seccion: 'esg', campo: 'Calificaciones ESG', tipo: 'Complemento', intentos: '1) 20-F (no las cita); 2) web de inversores (sin informe ESG reciente); 3) no se gastaron búsquedas en Sustainalytics/MSCI (de pago)', decision: 'Omitido' },
  ],
  fuentes: fB,
};
B.negocio = { ...B.negocio, ...negocioDatos };
// La cita a la nota C en controversias no vale dentro de B: se reescribe sin ella
B.esg.controversias = 'Informe bajista de Muddy Waters (noviembre de 2022) y demandas colectivas por la salida a bolsa: la de Nueva York se desestimó en primera instancia (marzo de 2025) y en apelación por unanimidad (abril de 2026); sigue la federal (Laurenzi) sin provisión [B1]. Indagaciones administrativas y judiciales en Argentina sobre cambios e impuestos, sin sanción [B1].';

// ================================================================ C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Form 20-F 2025, Items 6 (consejo, directivos, retribución, comités), 7 (accionistas), 10 (estatutos) y 16 (gobierno)', editor: 'DLocal Limited (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-03-18', url: `${SEC}/000207097926000113/dlo-20251231.htm` },
  { id: 2, titulo: 'Schedule 13D/A de General Atlantic (venta de 9.842.559 acciones el 17-ago-2026)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-19', url: `${SEC}/000095014226002390/xslSCHEDULE_13D_X02/primary_doc.xml` },
  { id: 3, titulo: 'Schedule 13G/A de Alberto Eduardo Azar y Aqua Crystal Investments', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-05-04', url: `${SEC}/000095010326006779/xslSCHEDULE_13G_X02/primary_doc.xml` },
  { id: 4, titulo: 'Form 4 de consejeros y directivos (oct-2025 a oct-2026), extraídos con herramientas/form4.mjs', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-19', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001846832&type=4' },
  { id: 5, titulo: 'dLocal announces Board transition (6-K, anexo 99.1)', editor: 'DLocal Limited (SEC EDGAR)', tipo: 'Primaria', fecha: '2025-12-23', url: `${SEC}/000095010325016463/dp239080_ex9901.htm` },
  { id: 6, titulo: 'Results of Annual General Meeting 2025 (6-K, anexo 99.1)', editor: 'DLocal Limited (SEC EDGAR)', tipo: 'Primaria', fecha: '2025-12-15', url: `${SEC}/000119312525319349/dlo-ex99_1.htm` },
  { id: 7, titulo: 'Appellate Division affirms dismissal of New York State Action (6-K, anexo 99.1)', editor: 'DLocal Limited (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-04-20', url: `${SEC}/000184683226000004/a991exdismissalofsecuritie.htm` },
  { id: 8, titulo: 'Guías anuales en las notas de resultados del 4T24, 4T25 y 2T26', editor: 'DLocal Limited (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-08-13', url: `${SEC}/000184683226000031/ex_991-dlocalxearningsxres.htm` },
  { id: 9, titulo: 'DLocal Limited Announces Pricing of Secondary Offering (6-K)', editor: 'DLocal Limited (SEC EDGAR)', tipo: 'Primaria', fecha: '2025-09-03', url: `${SEC}/000095010325011217/dp233930_ex9901.htm` },
  { id: 10, titulo: 'Unaudited Interim Financial Statements at June 30, 2026 (nota 14: capital, clases de acciones, recompras)', editor: 'DLocal Limited (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-08-13', url: `${SEC}/000184683226000031/dlo-20260630.htm` },
];
const C = {
  _estado: 'completa',
  directivos: {
    equipo: [
      { nombre: 'Pedro Arnt', cargo: 'Consejero delegado y consejero', desde: '2023', participacion_pct: null, trayectoria: 'Doce años como director financiero de Mercado Libre, donde entró en 1999; consejero de Allegro.eu [C1]. En dLocal ha llevado el volumen de 17.677 M (2023) a 40.816 M (2025) y ha introducido dividendo y recompras; la comisión siguió bajando [C1, C8].' },
      { nombre: 'Guillermo López Pérez', cargo: 'Director financiero', desde: '2025', participacion_pct: null, trayectoria: 'Ex director financiero de Featurespace y de Visa Europa continental, 13 años en American Express y paso por Tink [C1].' },
      { nombre: 'Carlos Menéndez', cargo: 'Director de operaciones', desde: '2025', participacion_pct: null, trayectoria: 'Más de 30 años en Mastercard, Citibank y Procter & Gamble [C1].' },
      { nombre: 'Andrés Bzurovski Bay', cargo: 'Presidente (cofundador)', desde: '2016', participacion_pct: 17.0, trayectoria: 'Cofundador de AstroPay y de dLocal; presidente desde diciembre de 2025; 37,8 % de la clase B [C1, C5].' },
      { nombre: 'Sebastián Kanovich', cargo: 'Consejero (ex co-consejero delegado)', desde: '2016', participacion_pct: 4.3, trayectoria: 'Dirigió la empresa desde su creación; vendió 1,1 M de acciones por 16,2 M USD en 2026 con un plan 10b5-1 [C1, C4].' },
      { nombre: 'John O\'Brien', cargo: 'Director de ingresos', desde: '2024', participacion_pct: null, trayectoria: '14 años en la división de comercio electrónico de Worldpay [C1].' },
    ],
    historial_guidance: [
      { anio: '2025', guia: 'Volumen +35-50 %, margen bruto +25-40 %, EBITDA ajustado +25-40 % (guía de febrero de 2025)', real: 'Volumen +60 %, margen bruto +37 %, EBITDA ajustado +47 %', cumplida: 'Sí' },
      { anio: '2026', guia: 'Volumen +50-60 %, margen bruto +22,5-27,5 %, beneficio operativo +27,5-32,5 % (marzo); subida en agosto a volumen +60-70 % y margen bruto +25-30 %', real: '1S26: volumen +83 %, margen bruto +34 %, beneficio operativo +15 % (necesita un 2S de +44 %)', cumplida: 'Parcial' },
    ],
    comentario: 'Equipo profesionalizado tras la crisis de 2022-23: Arnt (ex Mercado Libre) y un director financiero, de operaciones y de ingresos fichados en Visa, Mastercard y Worldpay. La guía de 2025 se superó en las tres métricas; la de 2026 va por delante en volumen y margen bruto pero el beneficio operativo del 1S26 creció un 15 % frente a una guía del 27,5-32,5 %, que exige un segundo semestre de +44 % [C8]. Los fundadores se han ido apartando de la gestión (Fogel pasó a asesor en diciembre de 2025) pero controlan el voto. Sin plan de sucesión publicado [C1, C5].',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Andrés Bzurovski Bay', cargo: 'Presidente', tipo: 'Dominical', desde: '2016', comisiones: 'Nombramientos; Producto y Tecnología' },
      { nombre: 'Pedro Arnt', cargo: 'Consejero delegado', tipo: 'Ejecutivo', desde: '2023', comisiones: 'Producto y Tecnología' },
      { nombre: 'Sebastián Kanovich', cargo: 'Consejero', tipo: 'Dominical', desde: '2016', comisiones: 'Nombramientos; Producto y Tecnología' },
      { nombre: 'Luiz Ribeiro', cargo: 'Consejero (General Atlantic)', tipo: 'Dominical', desde: '2020', comisiones: 'Nombramientos; Retribuciones' },
      { nombre: 'William Pruett', cargo: 'Consejero', tipo: 'Independiente', desde: '2025', comisiones: 'Auditoría (experto financiero)' },
      { nombre: 'Hyman Bielsky', cargo: 'Consejero', tipo: 'Independiente', desde: '2021', comisiones: 'Auditoría; Retribuciones' },
      { nombre: 'Verónica Raffo', cargo: 'Consejera', tipo: 'Independiente', desde: '2021', comisiones: 'Auditoría; Nombramientos' },
      { nombre: 'Francisco Fernández de Ybarra del Rey', cargo: 'Consejero', tipo: 'Independiente', desde: '2025', comisiones: 'Retribuciones' },
      { nombre: 'Nelson Mattos', cargo: 'Consejero', tipo: 'Independiente', desde: '2025', comisiones: 'Producto y Tecnología' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: false,
    operaciones_vinculadas_relevantes: true, variable_ligado_rentabilidad: false, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: true, presidente_vinculado_control: true, cambios_cupula_24m: 1,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: null,
    remuneracion: 'Como emisor de las Islas Caimán no publica la retribución individual. La de todo el equipo directivo y el consejo fue de 22,5 M USD en 2025 (5,4 M en salarios y 17,1 M en pagos en acciones), frente a 19,8 M en 2024 y 9,0 M en 2023 [C1]. Los consejeros fundadores no cobran; los independientes, en efectivo o acciones. No se publican métricas del variable ni cláusulas de recuperación. Desde 2026 existe una comisión de retribuciones (Ribeiro, Bielsky, Fernández de Ybarra), de carácter consultivo [C1]. No hay voto consultivo de la retribución en la junta [C6].',
    accionistas: [
      { nombre: 'Sergio Fogel (clase A y B)', pct: 17.2, tipo: 'Fundador (clase B: 5 votos por acción)', variacion: 'Estable (dic-2025)' },
      { nombre: 'Andrés Bzurovski Bay (clase A y B)', pct: 17.0, tipo: 'Fundador y presidente (clase B)', variacion: 'Estable' },
      { nombre: 'General Atlantic', pct: 12.8, tipo: 'Fondo de capital riesgo', variacion: 'Vendió 9,8 M de acciones el 17-ago-2026 a 13,60 USD y en la colocación de septiembre de 2025; le quedan 36,8 M (21,4 % de la clase A) [C2, C9]' },
      { nombre: 'Alberto Eduardo Azar / Aqua Crystal', pct: 6.4, tipo: 'Inversor histórico (clase B)', variacion: '18,5 M de acciones (10,3 % de la clase A con conversión) a marzo de 2026 [C3]' },
      { nombre: 'Emiliano Fernández Balagué', pct: 4.6, tipo: 'Inversor', variacion: 'Sin cambios publicados' },
      { nombre: 'Sebastián Kanovich (clase B)', pct: 4.3, tipo: 'Fundador y consejero', variacion: 'Vendió 1,1 M de acciones en 2026 (plan 10b5-1) [C4]' },
      { nombre: 'Autocartera', pct: 0, tipo: 'Recompras amortizadas', variacion: '6,9 M de acciones recompradas y amortizadas en el 1S26 [C10]' },
    ],
    insiders: [
      { fecha: '2026-07-01', persona: 'Sebastián Kanovich', operacion: 'Venta', acciones: 1000506, importe: 14.63 },
      { fecha: '2026-07-07', persona: 'Sebastián Kanovich', operacion: 'Venta', acciones: 25700, importe: 0.40 },
      { fecha: '2026-08-05', persona: 'Sebastián Kanovich', operacion: 'Venta', acciones: 77453, importe: 1.20 },
      { fecha: '2026-05-29', persona: 'William Pruett', operacion: 'Compra', acciones: 20000, importe: 0.24 },
    ],
    control_y_defensas: 'Control por voto múltiple: las acciones de clase B (5 votos) de los fundadores e inversores originales (Bzurovski, Fogel, Azar, Kanovich y Singer) suman el 43,8 % del capital y el 79,6 % del voto, y mientras tengan clase B nombran al menos la mayoría del consejo [C1]. El voto múltiple dura mientras la clase B sea al menos el 10 % del capital (hoy 40,3 %: 116,2 M de 288,4 M) [C10]. Sociedad de las Islas Caimán, emisor extranjero que sigue prácticas del país de origen en lugar de algunas normas del Nasdaq [C1]. Operaciones vinculadas: entidades de cobro vinculadas facturaron 27,9 M de costes en 2025 (0,9 M en 2024) [C1]. Desde diciembre de 2025 hay cinco independientes de nueve y comités de nombramientos, retribuciones y producto [C5].',
    alertas: [
      'Ventas de accionistas de referencia: General Atlantic vendió 9,8 M de acciones el 17-ago-2026 y aún tiene 36,8 M (≈ 12,8 % del capital) [C2].',
      'Pagos a entidades de cobro vinculadas de 27,9 M en 2025, treinta veces los de 2024 [C1].',
      'Demanda colectiva federal (Laurenzi) por la salida a bolsa, sin provisión; la de Nueva York se desestimó en abril de 2026 [C1, C7].',
    ],
    confianza: 'Media',
  },
  huecos: [
    { seccion: 'gobierno', campo: 'Retribución individual del consejero delegado y votos de la junta sobre retribución', tipo: 'Complemento', intentos: '1) 20-F 2025 Item 6B (solo el total agregado: no se publica por persona en Caimán); 2) resultados de la junta de 2025 (6-K, sin voto de retribución); 3) 20-F 2024 (mismo criterio)', decision: 'Omitido' },
  ],
  fuentes: fC,
};

// ================================================================ D. Mercado y valoración
const bolsa = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const comp = JSON.parse(fs.readFileSync('/tmp/claude-0/-home-user/87f3ee2b-09e1-578b-aeb7-bb693956b780/scratchpad/dlo/comp.json', 'utf8'));
const FX = { USD: 1, EUR: 1.1213, GBP: 1.327, BRL: 0.1962 };
const NOMBRE = { 'ADYEN.AS': ['Adyen', 'NL'], PYPL: ['PayPal', 'US'], FOUR: ['Shift4 Payments', 'US'], FLYW: ['Flywire', 'US'], PAYO: ['Payoneer', 'US'], STNE: ['StoneCo', 'BR'], PAGS: ['PagSeguro', 'BR'], 'WISE.L': ['Wise', 'GB'], RELY: ['Remitly', 'US'], GPN: ['Global Payments', 'US'] };
const comparables = comp.filter((c) => NOMBRE[c.s]).map((c) => {
  const precioCot = c.cur === 'GBp' ? c.price / 100 : c.price; // en divisa de cotización (GBP para Wise)
  const fxCot = FX[c.cur === 'GBp' ? 'GBP' : c.cur];
  const fxCta = FX[c.fcur];
  const capUsd = (c.mcap / 1e6) * (c.cur === 'GBp' ? FX.GBP : fxCot); // Yahoo da la capitalización en la divisa de cotización (GBP para Wise)
  const t0 = c.trend.find((t) => t.per === '0y'), t1 = c.trend.find((t) => t.per === '+1y');
  const w0 = c.s === 'WISE.L' ? 5 / 12 : 2.5 / 12; // meses del ejercicio en curso dentro de los próximos 12 (Wise cierra en marzo)
  const epsNtm = (w0 * t0.eps + (1 - w0) * t1.eps) * fxCta; // en USD
  const revNtm = (w0 * t0.rev + (1 - w0) * t1.rev);
  const pxUsd = precioCot * fxCot;
  const dn = (c.debt - c.cash);
  const sinEv = ['STNE', 'PAGS', 'WISE.L', 'ADYEN.AS'].includes(c.s); // EV sin sentido: caja o deuda de clientes en balance
  return {
    nombre: NOMBRE[c.s][0], ticker: c.s, pais: NOMBRE[c.s][1], capitalizacion: Math.round(capUsd),
    ev_ventas: sinEv ? null : r2(c.evrev), ev_ebitda_ltm: sinEv ? null : r1(c.evebitda), ev_ebitda_ntm: null,
    per_ntm: r1(pxUsd / epsNtm), crecimiento_pct: r1((revNtm / c.rev - 1) * 100), margen_ebitda_pct: r1(c.ebm * 100), roic_pct: null,
    dn_ebitda: sinEv ? null : r2(dn / c.ebitda), fcf_yield_pct: sinEv || c.fcf < 0 ? null : r1((c.fcf * fxCta / 1e6) / capUsd * 100),
  };
});
const fD = [
  { id: 1, titulo: 'Históricos diarios de DLO, SPY e IPAY (herramientas/bolsa.mjs y movimiento.mjs): precio, rango, rentabilidades, beta, volatilidad, caída máxima y cierres anuales', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://finance.yahoo.com/quote/DLO/history/' },
  { id: 2, titulo: 'DLocal Limited: finances (estimaciones 2026-2028, deuda neta, FCF, analistas)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://www.marketscreener.com/quote/stock/DLOCAL-LIMITED-123219061/finances/' },
  { id: 3, titulo: 'dLocal (DLO) stock forecast & price target (consenso S&P Global)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-08', url: 'https://stockanalysis.com/stocks/dlo/forecast/' },
  { id: 4, titulo: 'Fichas de Yahoo Finance (quoteSummary: precio, capitalización, valor empresa, márgenes, estimaciones de BPA e ingresos) de Adyen, PayPal, Shift4, Flywire, Payoneer, StoneCo, PagSeguro, Wise, Remitly y Global Payments; tipos EURUSD, GBPUSD y BRLUSD', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/PYPL/' },
  { id: 5, titulo: 'Daily Treasury Par Yield Curve Rates 2026 (10 años: 5,09 % el 16-oct-2026)', editor: 'U.S. Department of the Treasury', tipo: 'Primaria', fecha: '2026-10-16', url: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve&field_tdr_date_value=2026' },
  { id: 6, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026: 4,20 % con payout sostenible', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10-01', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 7, titulo: 'Global Payments to divest Issuer Solutions to FIS and acquire Worldpay (8-K anexos 99.1 y 99.2)', editor: 'Global Payments Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2025-04-17', url: 'https://www.sec.gov/Archives/edgar/data/1123360/000110465925035771/tm2512552d1_ex99-1.htm' },
  { id: 8, titulo: 'Nexi e Nets: comunicato stampa sulla fusione', editor: 'Nexi S.p.A.', tipo: 'Primaria', fecha: '2020-11-15', url: 'https://emarketstorage.it/sites/default/files/comunicati/2022-05/20201115_87109.pdf' },
  { id: 9, titulo: 'Nuvei enters into agreement to be taken private by Advent International (6-K, anexo 99.1)', editor: 'Nuvei Corporation (SEC EDGAR)', tipo: 'Primaria', fecha: '2024-04-01', url: 'https://www.sec.gov/Archives/edgar/data/1765159/000095010324004743/dp209291_ex9901.htm' },
  { id: 10, titulo: 'FIS and Worldpay to Combine (8-K anexo 99.2)', editor: 'Worldpay, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2019-03-18', url: 'https://www.sec.gov/Archives/edgar/data/1533932/000119312519077546/d720414dex992.htm' },
  { id: 11, titulo: 'dLocal Reports Second Quarter 2026 Financial Results; interim financial statements June 30, 2026 (acciones, caja, deuda)', editor: 'DLocal Limited (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-08-13', url: `${SEC}/000184683226000031/dlo-20260630.htm` },
  { id: 12, titulo: 'DLocal (DLO) Q2 2026 earnings: EPS 0,18 frente a 0,20 de consenso; próximos resultados', editor: 'Earnings Whispers / Investing.com', tipo: 'Datos de mercado', fecha: '2026-08-14', url: 'https://www.investing.com/equities/dlocal-earnings' },
  { id: 13, titulo: 'Form 20-F 2025 (BPA y acciones diluidas 2023-2025)', editor: 'DLocal Limited (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-03-18', url: `${SEC}/000207097926000113/dlo-20251231.htm` },
  { id: 14, titulo: 'Investing.com: recomendaciones de analistas de DLO (UBS a Comprar, objetivo 20 USD, 1-jul-2026)', editor: 'Investing.com', tipo: 'Analistas', fecha: '2026-07-01', url: 'https://www.investing.com/equities/dlocal-consensus-estimates' },
  { id: 15, titulo: 'dLocal is set to join the small-cap Russell 2000 index (noticia en el canal RSS de DLO)', editor: 'Seeking Alpha', tipo: 'Prensa', fecha: '2026-06-26', url: 'https://seekingalpha.com/api/sa/combined/DLO.xml' },
  { id: 16, titulo: 'Schedule 13D/A de General Atlantic (17-ago-2026)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-19', url: `${SEC}/000095014226002390/xslSCHEDULE_13D_X02/primary_doc.xml` },
  { id: 17, titulo: 'dLocal Reports First Quarter 2026 Financial Results; noticia «GAAP EPS of $0.14 misses by $0.02»', editor: 'DLocal Limited (SEC EDGAR) / Seeking Alpha', tipo: 'Primaria', fecha: '2026-05-14', url: `${SEC}/000184683226000019/ex_991-dlocalearningsresul.htm` },
  { id: 18, titulo: 'dLocal Reports Third Quarter 2025 Financial Results (13-nov-2025: caída del 6,8 %)', editor: 'DLocal Limited (SEC EDGAR)', tipo: 'Primaria', fecha: '2025-11-12', url: `${SEC}/000119312525277539/dlo-ex99_1.htm` },
];
const D = {
  _estado: 'completa',
  identificacion: {
    nombre: 'DLocal Limited', nombre_corto: 'dLocal', ticker: 'DLO', isin: 'KYG290181018', mercado: 'Nasdaq Global Select Market (EE. UU.)', indice_referencia: 'S&P 500 (SPY) y Russell 2000',
    pais: 'Uruguay (sede operativa; sociedad de las Islas Caimán)', pais_iso: 'UY', sector: 'Financieros', industria: 'Servicios de transacciones y procesamiento de pagos', sede: 'Montevideo (Uruguay)', fundacion: '2016', empleados: 1274, web: 'https://www.dlocal.com',
    precio: bolsa.identificacion.precio, fecha_precio: bolsa.identificacion.fecha_precio, acciones: 295.9, capitalizacion_publicada: 4317, free_float_pct: 53.0,
    max_52s: bolsa.identificacion.max_52s, min_52s: bolsa.identificacion.min_52s, volumen_medio_diario: `≈ ${bolsa.volumen_3m.importe_dia_millones.toString().replace('.', ',')} M USD/día (3 meses)`, proximos_resultados: '2026-11-18',
  },
  consenso: {
    guidance: 'Guía 2026 (18-mar-2026): volumen +50-60 %, margen bruto +22,5-27,5 % (sobre 403 M) y beneficio operativo +27,5-32,5 % (sobre 220 M). El 13-ago-2026 subió el volumen a +60-70 % y el margen bruto a +25-30 % (≈ 504-524 M) y mantuvo el beneficio operativo (≈ 280-291 M), con la mejora del apalancamiento operativo concentrada en el 2S26 [D11, D17]. No hay plan a medio plazo con cifras ni guía de 2027; la dirección pidió no extrapolar el margen de salida del 4T [D12].',
    estimaciones: [
      { periodo: '2026e', ingresos: 1595, ebitda: 340.3, ebit: 284.5, bpa: 0.82, dpa: 0.20, fuente: 'MarketScreener, 10 analistas [D2]' },
      { periodo: '2027e', ingresos: 2077, ebitda: 435.7, ebit: 384.0, bpa: 1.08, dpa: 0.27, fuente: 'MarketScreener [D2]' },
      { periodo: '2028e', ingresos: 2542, ebitda: 523.9, ebit: 462.1, bpa: 1.27, dpa: 0.35, fuente: 'MarketScreener [D2]' },
    ],
    recomendaciones: { n_analistas: 10, comprar: 9, mantener: 1, vender: 0, po_medio: 18.8, po_min: 15, po_max: 21 },
    revisiones: 'Stock Analysis (S&P Global, 10 analistas) da un objetivo medio de 18,8 USD (15-21) y recomendación de compra: 6 compra fuerte, 3 compra y 1 mantener; su BPA de 2026 (0,85) y 2027 (1,14) es ajustado y algo mayor que el de MarketScreener (0,82 y 1,08) [D2, D3]. Los objetivos subieron en el verano: MarketBeat recogía 17,50 USD de media a finales de julio y UBS pasó a Comprar con 20 USD el 1-jul [D14]. Las estimaciones de ingresos subieron tras el 2T26 (2026e ≈ 1.595 M, +46 %), mientras el BPA de 2026 se mantuvo cerca de 0,82-0,85 por el gasto operativo y el ajuste fiscal del 1T [D2, D3].',
    base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: 2.6,
    confianza: 'Media',
  },
  bolsa: {
    ...bolsa.bolsa,
    posicion_corta_pct: null,
    comentario: null,
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: bolsa.cierres_ejercicio.map((c) => ({ anio: c.anio, precio_cierre: c.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: c.anio === '2021' })),
    comentario: null,
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Procesadores de pagos y plataformas transfronterizas cotizadas: Adyen (procesador global), PayPal, Shift4 y Global Payments (adquirencia), StoneCo y PagSeguro (adquirencia en Brasil, el primer mercado de dLocal), y Payoneer, Flywire, Wise y Remitly (pagos transfronterizos y pay-out a emergentes) [D4]. No hay ningún cotizado puro de pagos a emergentes para comerciantes globales: EBANX, Rapyd y Stripe no cotizan y Nuvei salió de bolsa en 2024. El PER de los próximos 12 meses mezcla BPA ajustado (Shift4, Global Payments, PayPal) y publicado; el EV/EBITDA de Adyen, Wise, StoneCo y PagSeguro no se usa porque su balance lleva caja o deuda de clientes.',
    empresas: comparables,
    comentario: null,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2019-03', objetivo: 'Worldpay (Vantiv)', comprador: 'FIS', ev: 43000, ev_ventas: null, ev_ebitda: null, prima_pct: 14, excluir: false, comentario: 'Valor empresa de unos 43.000 M USD con deuda; prima del 14 % sobre el cierre previo; la nota no da el múltiplo [D10].' },
      { fecha: '2020-11', objetivo: 'Nets', comprador: 'Nexi', ev: 9204, ev_ventas: null, ev_ebitda: 20, prima_pct: null, excluir: false, comentario: 'Valor empresa de 7.800 M EUR (≈ 9.200 M USD a 1,18) y ~20x el EBITDA 2020e según Nexi; pico de valoraciones [D8].' },
      { fecha: '2024-04', objetivo: 'Nuvei', comprador: 'Advent International', ev: 6300, ev_ventas: null, ev_ebitda: null, prima_pct: 56, excluir: false, comentario: 'Exclusión de bolsa a 34 USD por acción, prima del 56 % sobre el cierre no afectado del 15-mar-2024; procesador de pagos con fuerte presencia en Latinoamérica; la nota no da múltiplo [D9].' },
      { fecha: '2025-04', objetivo: 'Worldpay', comprador: 'Global Payments', ev: 22700, ev_ventas: null, ev_ebitda: 8.5, prima_pct: null, excluir: false, comentario: 'Precio neto de 22.700 M USD; ~8,5x el EBITDA ajustado 2025e con sinergias [D7].' },
      { fecha: '2025-04', objetivo: 'Issuer Solutions (de Global Payments)', comprador: 'FIS', ev: 13500, ev_ventas: null, ev_ebitda: 12.3, prima_pct: null, excluir: false, comentario: '13.500 M USD, ~12,3x el EBITDA ajustado 2025e; procesamiento para emisores, menos comparable [D7].' },
    ],
    comentario: null,
    confianza: 'Media',
  },
  huecos: [
    { seccion: 'bolsa', campo: 'Posición corta', tipo: 'Complemento', intentos: '1) Nasdaq short interest (requiere sesión); 2) Stock Analysis (no lo muestra en la página de previsiones); 3) no se gastaron más búsquedas', decision: 'Omitido' },
    { seccion: 'multiplos_historicos', campo: 'PER y EV/EBITDA de los próximos 12 meses históricos de proveedor', tipo: 'Complemento', intentos: '1) MarketScreener (sin serie histórica gratuita); 2) Stock Analysis (de pago); 3) calculados por el motor con el BPA real', decision: 'Omitido' },
  ],
  fuentes: fD,
};

// ================================================================ E. Sentimiento
const fE = [
  { id: 1, titulo: 'Stocktwits: flujo de mensajes de $DLO (30 mensajes del 22-sep al 18-oct-2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-18', url: 'https://api.stocktwits.com/api/2/streams/symbol/DLO.json' },
  { id: 2, titulo: 'DLocal: Margin Compression Is A Feature Of Scale, Not A Defect', editor: 'Seeking Alpha (autor independiente)', tipo: 'Foros y redes', fecha: '2026-10-07', url: 'https://seekingalpha.com/article/4952467-dlocal-margin-compression-is-a-feature-of-scale-not-a-defect' },
  { id: 3, titulo: 'dLocal: Why Lower Take Rates Do Not Break The Thesis', editor: 'Seeking Alpha (autor independiente)', tipo: 'Foros y redes', fecha: '2026-09-22', url: 'https://seekingalpha.com/article/4948781-dlocal-why-lower-take-rates-do-not-break-thesis' },
  { id: 4, titulo: 'DLocal: Early Innings Of Its Growth Story', editor: 'Seeking Alpha (autor independiente)', tipo: 'Foros y redes', fecha: '2026-08-07', url: 'https://seekingalpha.com/api/sa/combined/DLO.xml' },
  { id: 5, titulo: 'DLocal: Wall Street Is Turning More Bullish', editor: 'Seeking Alpha (autor independiente)', tipo: 'Foros y redes', fecha: '2026-07-03', url: 'https://seekingalpha.com/api/sa/combined/DLO.xml' },
  { id: 6, titulo: 'Simply Wall St: narrativa de la comunidad sobre dLocal y revisiones de objetivos', editor: 'Simply Wall St', tipo: 'Foros y redes', fecha: '2026-09', url: 'https://simplywall.st/community/narratives/us/diversified-financials/nasdaq-dlo/dlocal/a40l8khc-confidence-will-strengthen-as-digital-payment-momentum-grows-in-emerging-markets' },
];
const E = {
  _estado: 'completa',
  sentimiento: {
    tono: 'Positivo', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Stocktwits ($DLO)', fecha: '2026-10', n_comentarios: 30, tono: 'Positivo', resumen: 'Mayoría de mensajes alcistas o de corto plazo; tras la caída de septiembre varios ven la acción «en el suelo del rango» y esperan que la recompra la sostenga; alguno pregunta si las elecciones de Brasil la afectan y otro duda de que algo salvo una opa convenza a Wall Street [E1].' },
      { plataforma: 'Seeking Alpha (artículos de octubre y septiembre)', fecha: '2026-10', n_comentarios: 2, tono: 'Positivo', resumen: 'Los dos últimos artículos defienden que la caída de la comisión es efecto de la escala y no rompe la tesis: el margen bruto absoluto sigue creciendo un 25-30 % [E2, E3].' },
      { plataforma: 'Seeking Alpha (artículos de julio y agosto)', fecha: '2026-08', n_comentarios: 2, tono: 'Positivo', resumen: 'Tesis de «primeras entradas» del crecimiento y de analistas que se vuelven alcistas tras la entrada en el Russell 2000 y la subida de UBS [E4, E5].' },
      { plataforma: 'Simply Wall St (narrativa de la comunidad)', fecha: '2026-09', n_comentarios: 3, tono: 'Positivo', resumen: 'Registra varias subidas de objetivos de analistas en 2026 y una narrativa de crecimiento por digitalización de pagos en emergentes [E6].' },
    ],
    temas: [
      { tema: 'Caída de la comisión (take rate)', postura: 'Dividida', peso: 'Alto', contraste: 'Los datos dan la razón a los preocupados en el margen por operación (0,72 % en el 2T26 frente a 1,07 % un año antes) y a los optimistas en el absoluto (margen bruto +29 %) [A5].' },
      { tema: 'Recompras y precio bajo', postura: 'Alcista', peso: 'Medio', contraste: 'Cierto: 86,1 M recomprados en el 1S26 a 12,49 USD de media y quedan ≈ 214 M del programa hasta marzo de 2027 [D11].' },
      { tema: 'Ventas de General Atlantic y de fundadores', postura: 'Bajista', peso: 'Medio', contraste: 'General Atlantic vendió 9,8 M de acciones en agosto y le quedan 36,8 M; Kanovich vendió 1,1 M con un plan 10b5-1 [D16].' },
      { tema: 'Elecciones y política en Brasil y Argentina', postura: 'Dividida', peso: 'Bajo', contraste: 'La empresa cita la incertidumbre electoral y el tipo de cambio argentino como riesgos de su guía [A8].' },
    ],
    lectura: 'El sentimiento de los particulares es positivo y algo más optimista que hace seis meses, en línea con los analistas (9 de 10 en compra). La discusión gira en torno a la comisión: los foros la tratan como efecto de escala, y los datos dicen que el margen bruto absoluto sigue creciendo pero cada vez menos que el volumen. Nadie habla de la concentración en dos grandes comerciantes ni del Pilar 2 fiscal de 2027, dos riesgos que el informe sí recoge. No hay euforia ni capitulación: la acción sigue un 76 % por debajo del máximo de 2021.',
    confianza: 'Media',
  },
  huecos: [],
  fuentes: fE,
};

guarda('A', A); guarda('B', B); guarda('C', C); guarda('D', D); guarda('E', E);
console.log('Notas A-E escritas;', comparables.length, 'comparables');
console.log(JSON.stringify(comparables.map((c) => [c.nombre, c.capitalizacion, c.per_ntm, c.crecimiento_pct, c.ev_ebitda_ltm]), null, 0));
