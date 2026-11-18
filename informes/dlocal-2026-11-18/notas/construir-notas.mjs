// Escribe las notas A-E de DLocal Limited (Nasdaq: DLO; corte 2026-11-18, precio del 17-nov-2026; iteración tras el 3T26 sobre la base del informe del 19-oct) a partir de los documentos de
// notas/docs (20-F 2025, 2023 y 2022; 6-K de resultados 4T24-2T26 con sus anexos; 13D/A y 13G/A; Form 4), del XBRL de la SEC
// (cuentas-xbrl.json), de Yahoo Finance (bolsa y comparables), MarketScreener y Stock Analysis (consenso) y de foros.
// Cada nota cita con [n] de su propia lista. Cifras en millones de USD salvo que se diga otra cosa. Ejercicio natural.
// Ejecutar: node informes/dlocal-2026-11-18/notas/construir-notas.mjs
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
  { id: 17, titulo: 'dLocal Reports Third Quarter 2026 Financial Results (6-K, anexo 99.1: cuenta, balance y flujos del 3T26 y 9M26, FCF ajustado, guía 2026)', editor: 'DLocal Limited (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-11-12', url: `${SEC}/000184683226000037/ex_991-dlocalxearningsxres.htm` },
  { id: 18, titulo: 'Unaudited Consolidated Condensed Interim Financial Statements at September 30, 2026 (6-K, anexo 99.2: notas 5, 6, 14, 15, 23, 26 y 27)', editor: 'DLocal Limited (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-11-12', url: `${SEC}/000184683226000037/dlo-20260930.htm` },
  { id: 19, titulo: 'Quarterly Report 3Q26 (6-K, anexo 99.3: carta a los accionistas, NRR, retención de volumen, licencias, plantilla)', editor: 'DLocal Limited (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-11-12', url: `${SEC}/000184683226000037/ex_99-3xdlocalx3qx26xearni.htm` },
  { id: 20, titulo: 'dLocal Q3 earnings call highlights (resumen de la conferencia del 12-nov-2026: guía, efecto cambiario del 4T, México, Asia, recompras)', editor: 'Nasdaq / MarketBeat', tipo: 'Prensa', fecha: '2026-11-13', url: 'https://www.nasdaq.com/articles/dlocal-q3-earnings-call-highlights' },
  { id: 21, titulo: 'dLocal Q3 2026 earnings (volumen transfronterizo y local, verticales, margen bruto por país, comentarios de la conferencia)', editor: 'FXC Intelligence', tipo: 'Prensa', fecha: '2026-11-13', url: 'https://www.fxcintel.com/research/analysis/dlocal-q3-2026-earnings' },
  { id: 22, titulo: 'dLocal (DLO) Q3 2026: EPS Beat, Revenue Miss, and a Take-Rate Squeeze (BPA 0,23 frente a 0,21; ingresos 398 frente a 403 M)', editor: '24/7 Wall St.', tipo: 'Prensa', fecha: '2026-11-12', url: 'https://247wallst.com/cards/dlocal-q3-2026-earnings-dlo-01m78tk5tnrdfcmacg62nwwc1r' },
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
    ltm: { periodo: 'LTM sep-26', fecha_fin: '2026-09-30', ingresos: 1471.5, ebitda: 288.4, ebit: 255.8, beneficio_neto: 219.9, bpa: 0.74, dpa: 0.19, dpa_extraordinario: 0, fcf: 247.5, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 4.4 },
    cambios_perimetro: [],
    comentario: 'Los ingresos pasaron de 244,1 M USD en 2021 a 1.093,6 M en 2025 (TCAC del 45 %), casi todo orgánico: los comerciantes con más de dos años en la plataforma generaron el 98,8 % del volumen de 2025 y los nuevos solo el 1-2 % de los ingresos [A1]. El margen se ha estrechado porque el volumen crece más que la comisión: el margen bruto sobre ingresos bajó del 40 % en 2024 al 37 % en 2025 y al 32 % en el 2T26, y el margen bruto sobre volumen (net take rate) del 1,09 % del 4T24 al 0,72 % del 2T26, por más volumen local-a-local, grandes comerciantes con tramos de precio y menos diferencial cambiario en mercados volátiles [A5, A8, A9]. El EBITDA publicado (EBIT + amortizaciones) cayó en 2024 (157,7 M desde 191,9 M) por Egipto, Argentina y la inversión en plantilla, y se recuperó en 2025 (246,2 M; margen del 22,5 %). La serie usa las cifras publicadas NIIF; la empresa dejó de usar el EBITDA ajustado en 2026 y guía el beneficio operativo [A6, A8]. Ningún año tiene cambios de perímetro relevantes: la compra de NeWurth (Camerún, 23,0 M en febrero de 2026) es pequeña [A1].',
    ajustes: 'Las cifras son las publicadas. El EBITDA ajustado de la empresa (278,1 M en 2025; 188,7 M en 2024) suma al EBITDA publicado los pagos en acciones (24,1 M en 2025), el deterioro de activos financieros, las «otras pérdidas operativas» (4,7 M, sobre todo saldos de comerciantes y procesadores dados de baja), los costes del informe del bajista y de las demandas y los gastos de la colocación secundaria [A1]. Solo tratamos como no recurrentes estos dos últimos (0,9 M en 2025; 1,6 M en 2024; 1,7 M en 2023) y, en el LTM, el ajuste de impuestos indirectos de ejercicios anteriores registrado en gastos operativos en el 1T26 (4,4 M) [A7]; los pagos en acciones y las bajas de saldos se repiten todos los años y se quedan dentro. El BPA de 2026 lleva además 5,3 M de ese ajuste en el impuesto de sociedades [A7]. El 2024 fue el año atípico: cayó el margen y el resultado financiero incluyó diferencias de cambio de un préstamo intragrupo con Argentina (cancelado en septiembre de 2025) [A1, A6].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '4T24', ingresos: 204.5, crecimiento_pct: 8.8, crecimiento_organico_pct: null, ebitda: 47.3, margen_ebitda_pct: 23.1, bpa: 0.10, vs_consenso: null },
      { periodo: '1T25', ingresos: 216.8, crecimiento_pct: 17.6, crecimiento_organico_pct: null, ebitda: 51.1, margen_ebitda_pct: 23.6, bpa: 0.15, vs_consenso: null },
      { periodo: '2T25', ingresos: 256.5, crecimiento_pct: 49.7, crecimiento_organico_pct: null, ebitda: 61.3, margen_ebitda_pct: 23.9, bpa: 0.14, vs_consenso: null },
      { periodo: '3T25', ingresos: 282.5, crecimiento_pct: 52.0, crecimiento_organico_pct: 63.0, ebitda: 62.4, margen_ebitda_pct: 22.1, bpa: 0.17, vs_consenso: null },
      { periodo: '4T25', ingresos: 337.9, crecimiento_pct: 65.2, crecimiento_organico_pct: 69.0, ebitda: 71.4, margen_ebitda_pct: 21.1, bpa: 0.18, vs_consenso: null },
      { periodo: '1T26', ingresos: 335.9, crecimiento_pct: 54.9, crecimiento_organico_pct: 52.0, ebitda: 60.5, margen_ebitda_pct: 18.0, bpa: 0.14, vs_consenso: 'Inferior' },
      { periodo: '2T26', ingresos: 399.7, crecimiento_pct: 55.8, crecimiento_organico_pct: 50.0, ebitda: 72.1, margen_ebitda_pct: 18.0, bpa: 0.18, vs_consenso: 'Inferior' },
      { periodo: '3T26', ingresos: 398.0, crecimiento_pct: 40.9, crecimiento_organico_pct: 36.0, ebitda: 84.5, margen_ebitda_pct: 21.2, bpa: 0.23, vs_consenso: 'Superior' },
    ],
    ultima_presentacion: 'En la conferencia del 2T26 (13-ago) el discurso pasó de inversión a escala: volumen +92 %, margen bruto récord y FCF ajustado de 68,5 M; subió la guía de volumen (60-70 %) y de margen bruto (25-30 %) y mantuvo la de beneficio operativo (27,5-32,5 %), con la promesa de apalancamiento operativo en el segundo semestre [A5, A14]. En la del 3T26 (12-nov) la dirección presentó ese apalancamiento como cumplido: gastos operativos −11 % trimestral (menos plantilla y terceros, automatización con IA), beneficio operativo de 76,2 M (+37 %) y 58 % del margen bruto, FCF ajustado de 99,1 M [A17, A19]. Pero cambió el tono sobre la guía: el volumen irá al extremo alto (60-70 %), el margen bruto a la mitad (25-30 %) y el beneficio operativo al **extremo bajo** (27,5-32,5 %), por «vientos de cara cambiarios no previstos» en Brasil, México y Argentina que restarán unos 6 puntos al crecimiento interanual del margen bruto del 4T, y por menos negocio en mercados pequeños de comisión alta de África y Asia [A17, A20]. Los ingresos quedaron planos frente al 2T (398 M; −1,3 % frente al consenso) por más local-a-local y pay-out y menos Argentina tras el Hot Sale [A17, A22]. Las preguntas se centraron en México (margen bruto −17 % trimestral por costes de procesamiento atrasados y grandes comerciantes en los tramos de precio más bajos; la dirección espera mejora en 2027 o al cierre de 2026), en la publicidad electoral de Brasil, que se normalizará, y en 2027, que Arnt describió como un año de **inversión** en infraestructura, métodos de pago y equipo comercial [A20, A21]. **No dio** guía de 2027 ni suelo de la comisión, ni cuantificó el efecto del real tras la victoria de Lula del 25-oct [A20].',
    confianza: 'Alta',
  },
  balance: {
    historico: balanceHist,
    vencimientos: [{ anio: '2026', importe: 13.6 }, { anio: '2027', importe: 54.5 }, { anio: '2028', importe: 54.5 }, { anio: '2029', importe: 40.9 }],
    liquidez: 'Caja propia («corporate cash») de 536,9 M USD a 30-sep-2026 sobre una caja total de 1.033,9 M (los otros 497,0 M son de comerciantes), más 80,1 M de activos financieros (letras y bonos), de los que 12,4 M garantizan préstamos en pesos; préstamo sindicado sin garantías de 150 M dispuesto en agosto de 2026 (SOFR + 2,00 %, 11 cuotas trimestrales de 13,6 M desde el 12-feb-2027, vence en agosto de 2029; covenants: deuda/EBITDA ≤ 3, EBITDA/intereses ≥ 3,5 y liquidez mínima de 75 M, todos cumplidos) [A17, A18].',
    rating: 'Sin rating',
    coste_deuda_pct: 6.5,
    vida_media_anios: 1.5,
    otros_pasivos: 'El pasivo relevante no es deuda: son 1.580,6 M de cuentas a pagar comerciales y otras a 30-sep-2026, casi todo dinero de comerciantes pendiente de liquidar, frente a 1.088,0 M de cuentas a cobrar (a procesadores y adquirentes) y 497,0 M de caja de comerciantes [A17, A18]. Lo hemos neteado en el balance histórico y en el puente (caja propia = la que publica la empresa). Riesgos asociados: si un procesador o adquirente quiebra, dLocal paga igualmente al comerciante y no está asegurada (en 2025 dio de baja 2,1 M de un procesador y reclama el resto) [A1]. No hay pensiones. Provisiones de solo 0,8 M; las demandas colectivas de Nueva York (OPV de 2021) se desestimaron en apelación en abril de 2026 y queda la federal de Laurenzi sin provisión [A1, A18]. Las indagaciones administrativas y judiciales en Argentina sobre cambios e impuestos siguen sin novedades en 2026 [A18]. Los préstamos en pesos argentinos (13,6 M a septiembre, 86,9 M a diciembre) financian anticipos a comerciantes y su coste (8,0 M en 9M26) va en el coste de los servicios [A18].',
    comentario: 'Con los fondos de comerciantes fuera, el balance es de caja neta: caja propia de 427,9 M a cierre de 2025 frente a 86,9 M de deuda en pesos, y de 536,9 M a septiembre de 2026 frente a 163,5 M de deuda (150 M del préstamo sindicado, de los que 148,5 M netos entraron en agosto, más 13,6 M en pesos) [A1, A17, A18]. En 9M26 pagó 57,2 M de dividendo y recompró 120,1 M; el préstamo financia la recompra sin tocar la liquidez operativa, y la caja neta propia más activos financieros (≈ 454 M) es similar a la de diciembre [A17, A20]. El circulante propio es pequeño, pero la caja propia fluctúa con los anticipos y los créditos fiscales: FCF ajustado de 14,7 M en el 1T26, 68,5 M en el 2T26 y 99,1 M en el 3T26, con la reversión del circulante del 1T [A5, A7, A17].',
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
    politica: 'Desde 2025 la empresa reparte el 30 % del FCF ajustado del año anterior: 57,2 M (0,1939 USD por acción) pagados el 10-jun-2026 con cargo a 2025 [A1, A15]. En 2025 pagó además un dividendo extraordinario de 150 M [A1]. El 13-mar-2026 aprobó recomprar hasta 300 M en acciones de clase A hasta el 19-mar-2027; a 30-sep había comprado 9,13 M de acciones por 120,1 M (12,99 USD de media; 34,0 M en el 3T) y las amortizó; quedan ≈ 180 M [A18]. El préstamo de 150 M de agosto da liquidez a la sociedad holding, también para recompras [A20]. La prioridad declarada es no acumular caja por encima de la liquidez mínima operativa [A8].',
    adquisiciones: [
      { anio: '2021', objetivo: 'PrimeiroPay (Brasil, pagos)', importe: null, ev_ebitda: null, financiacion: 'Caja', resultado: 'Integrada; la directora jurídica actual procede de esa compra [A1]. Sin deterioros.' },
      { anio: '2022', objetivo: 'Demerge (Argentina y Brasil, servicios y activos virtuales)', importe: null, ev_ebitda: null, financiacion: 'Caja', resultado: 'Integrada como filiales de cobro; sin deterioros publicados [A1].' },
      { anio: '2026', objetivo: 'Mint Code Solutions (Camerún) y activos de NeWurth en África', importe: 23.0, ev_ebitda: null, financiacion: 'Ejercicio de una opción de compra; liberación de un crédito previo', resultado: 'Fondo de comercio de 6,6 M; refuerza África [A1, A6].' },
    ],
    comentario: 'La asignación de capital es buena en lo esencial y ha mejorado en 2025-26: el negocio necesita muy poco capital (capex del 3,4 % de los ingresos) y devuelve la caja sobrante con dividendo y recompras, sin compras grandes. Entre 2023 y 2025 recompró 199 M y en 2026 otros 120,1 M a 12,99 USD de media (financiados en parte con el préstamo de 150 M) [A18], y pagó 207 M en dividendos [A1, A6]. La dilución por pagos en acciones es moderada (7,8 M de acciones potenciales sobre 288 M) [A6]. El punto débil fue 2022-24: entró en Nigeria, Egipto y Argentina con diferenciales cambiarios altos que luego se evaporaron, y el ROIC cayó [A1].',
    confianza: 'Media',
  },
  negocio_datos: true,
  huecos: [
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
    { kpi: 'Volumen de pagos (TPV)', valor_anterior: '25.575 M USD (2024)', valor_actual: '40.816 M USD (2025); 50.094 M en 9M26', variacion: '+60 %; +81 % en 9M26 (+77 % en el 3T26)', comentario: 'Ocho trimestres seguidos por encima del +50 %; +68 % en moneda constante en el 3T26 [A8, A17].' },
    { kpi: 'Margen bruto sobre volumen (net take rate)', valor_anterior: '1,15 % (2024)', valor_actual: '0,99 % (2025); 0,72 % en el 2T26 y en el 3T26', variacion: '−16 pb; −27 pb interanual en el 3T26, plano frente al 2T', comentario: 'Cae por mezcla local-a-local, tramos de precio de grandes comerciantes y menos diferencial cambiario; en el 3T lo sostuvieron costes de anticipo más bajos en Argentina y una recuperación puntual en Nigeria [A9, A17].' },
    { kpi: 'Retención neta de ingresos (NRR)', valor_anterior: '113 % (2024)', valor_actual: '145 % (2025); 140 % en el 3T26', variacion: '+32 puntos; −5 en el 3T26', comentario: 'El crecimiento sale de los comerciantes existentes; la retención de volumen fue del 173 % en el 3T26 [A1, A19].' },
    { kpi: 'Peso de los 10 primeros comerciantes', valor_anterior: '61 % (2025)', valor_actual: '62 % (9M26)', variacion: '+1 punto', comentario: 'Dos comerciantes superan el 10 % de los ingresos cada uno [A1, A18].' },
    { kpi: 'Volumen local-a-local', valor_anterior: '53 % (2024)', valor_actual: '50 % (2025); 62 % en el 3T26', variacion: '+12 puntos', comentario: 'Menos comisión por operación que el transfronterizo; el local-a-local creció un 124 % en el 3T26 y el transfronterizo un 32 % [A9, A21].' },
    { kpi: 'Empleados (FTE)', valor_anterior: '1.095 (2024)', valor_actual: '1.274 (2025); máximo en el 2T26 y −3 % en el 3T26', variacion: '+16 %', comentario: 'El margen bruto por empleado superó los 100.000 USD por primera vez en el 3T26 [A1, A19].' },
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
  { id: 10, titulo: 'Unaudited Interim Financial Statements at September 30, 2026 (nota 14: capital, clases de acciones, recompras)', editor: 'DLocal Limited (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-11-12', url: `${SEC}/000184683226000037/dlo-20260930.htm` },
  { id: 11, titulo: 'Form 144 de General Atlantic DO B.V. (aviso de venta de 12.813.179 acciones de clase A por medio de J.P. Morgan, 17-nov-2026)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-11-17', url: `${SEC}/000095014226003102/xsl144X01/primary_doc.xml` },
  { id: 12, titulo: 'Schedule 13G/A (enmienda 3) de Alberto Eduardo Azar y Aqua Crystal Investments (15.114.490 acciones a 30-sep-2026)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-11-12', url: `${SEC}/000095010326017380/xslSCHEDULE_13G_X02/primary_doc.xml` },
  { id: 13, titulo: 'Notice of 2026 Annual General Meeting y Proxy Statement (6-K, anexos 99.1 y 99.2: junta del 2-dic-2026, 286,5 M de acciones a 23-oct)', editor: 'DLocal Limited (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-11-04', url: `${SEC}/000095010326016904/dp256216_ex9902.htm` },
  { id: 14, titulo: 'dLocal Reports Third Quarter 2026 Financial Results (guía 2026: dónde estamos)', editor: 'DLocal Limited (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-11-12', url: `${SEC}/000184683226000037/ex_991-dlocalxearningsxres.htm` },
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
      { anio: '2026', guia: 'Volumen +50-60 %, margen bruto +22,5-27,5 %, beneficio operativo +27,5-32,5 % (marzo); subida en agosto a volumen +60-70 % y margen bruto +25-30 %', real: '9M26: volumen +81 %, margen bruto +32 %, beneficio operativo +23 %; en noviembre la empresa sitúa el volumen en el extremo alto, el margen bruto en la mitad y el beneficio operativo en el extremo bajo (≈ +27,5 %, unos 280 M) [C14]', cumplida: 'Parcial' },
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
      { nombre: 'General Atlantic', pct: 12.8, tipo: 'Fondo de capital riesgo', variacion: 'Vendió 9,8 M de acciones el 17-ago-2026 y en la colocación de septiembre de 2025; tenía 36,8 M y el 17-nov-2026 avisó (Form 144) de la venta de 12,8 M más (≈ 165 M USD) por medio de J.P. Morgan: si se ejecuta entera le quedan ≈ 24 M (≈ 8,4 % del capital) [C2, C9, C11]' },
      { nombre: 'Alberto Eduardo Azar / Aqua Crystal', pct: 5.3, tipo: 'Inversor histórico', variacion: '15,1 M de acciones (8,5 % de la clase A) a 30-sep-2026, frente a 18,5 M en marzo: ha vendido ≈ 3,4 M [C3, C12]' },
      { nombre: 'Emiliano Fernández Balagué', pct: 4.6, tipo: 'Inversor', variacion: 'Sin cambios publicados' },
      { nombre: 'Sebastián Kanovich (clase B)', pct: 4.3, tipo: 'Fundador y consejero', variacion: 'Vendió 1,1 M de acciones en 2026 (plan 10b5-1) [C4]' },
      { nombre: 'Autocartera', pct: 0, tipo: 'Recompras amortizadas', variacion: '9,13 M de acciones recompradas y amortizadas en 9M26; 286,5 M de acciones en circulación a 23-oct-2026 (177,5 M de clase A y 109,0 M de clase B) [C10, C13]' },
    ],
    insiders: [
      { fecha: '2026-07-01', persona: 'Sebastián Kanovich', operacion: 'Venta', acciones: 1000506, importe: 14.63 },
      { fecha: '2026-07-07', persona: 'Sebastián Kanovich', operacion: 'Venta', acciones: 25700, importe: 0.40 },
      { fecha: '2026-08-05', persona: 'Sebastián Kanovich', operacion: 'Venta', acciones: 77453, importe: 1.20 },
      { fecha: '2026-05-29', persona: 'William Pruett', operacion: 'Compra', acciones: 20000, importe: 0.24 },
    ],
    control_y_defensas: 'Control por voto múltiple: las acciones de clase B (5 votos) de los fundadores e inversores originales (Bzurovski, Fogel, Azar, Kanovich y Singer) suman 109,0 M de acciones, el 38,0 % del capital y el 75,4 % del voto a 23-oct-2026 (544,8 M de 722,3 M votos), y mientras tengan clase B nombran al menos la mayoría del consejo [C1, C13]. El voto múltiple dura mientras la clase B sea al menos el 10 % del capital [C1]. En la junta del 2-dic-2026 solo se votan dos consejeros independientes (Fernández de Ybarra y Mattos) y las cuentas de 2025 [C13]. Sociedad de las Islas Caimán, emisor extranjero que sigue prácticas del país de origen en lugar de algunas normas del Nasdaq [C1]. Operaciones vinculadas: entidades de cobro vinculadas facturaron 27,9 M de costes en 2025 (0,9 M en 2024) [C1]. Desde diciembre de 2025 hay cinco independientes de nueve y comités de nombramientos, retribuciones y producto [C5].',
    alertas: [
      'Ventas de accionistas de referencia: General Atlantic vendió 9,8 M de acciones en agosto y el 17-nov-2026 avisó de la venta de otros 12,8 M (Form 144, J.P. Morgan); la acción cayó un 6,6 % ese día con 10,9 M de acciones negociadas, casi cinco veces lo normal. Tras ella le quedarían ≈ 24 M [C2, C11].',
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
const comp = JSON.parse(fs.readFileSync(path.join(dir, 'docs', 'yahoo-comparables-2026-11-18.json'), 'utf8'));
// Tipos del BCE del 17-nov-2026: EURUSD 1,0989; EURGBP 0,83305; EURBRL 6,3539
const FX = { USD: 1, EUR: 1.0989, GBP: 1.3191, BRL: 0.1730 };
const NOMBRE = { 'ADYEN.AS': ['Adyen', 'NL'], PYPL: ['PayPal', 'US'], FOUR: ['Shift4 Payments', 'US'], FLYW: ['Flywire', 'US'], PAYO: ['Payoneer', 'US'], STNE: ['StoneCo', 'BR'], PAGS: ['PagSeguro', 'BR'], 'WISE.L': ['Wise', 'GB'], RELY: ['Remitly', 'US'], GPN: ['Global Payments', 'US'] };
const comparables = comp.filter((c) => NOMBRE[c.s]).map((c) => {
  const precioCot = c.cur === 'GBp' ? c.price / 100 : c.price; // en divisa de cotización (GBP para Wise)
  const fxCot = FX[c.cur === 'GBp' ? 'GBP' : c.cur];
  const fxCta = FX[c.fcur];
  const capUsd = (c.mcap / 1e6) * (c.cur === 'GBp' ? FX.GBP : fxCot); // Yahoo da la capitalización en la divisa de cotización (GBP para Wise)
  const t0 = c.trend.find((t) => t.per === '0y'), t1 = c.trend.find((t) => t.per === '+1y');
  const w0 = c.s === 'WISE.L' ? 4.5 / 12 : 1.5 / 12; // meses del ejercicio en curso dentro de los próximos 12 (Wise cierra en marzo)
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
  { id: 1, titulo: 'Históricos diarios de DLO, SPY e IPAY (herramientas/bolsa.mjs y movimiento.mjs): precio, rango, rentabilidades, beta, volatilidad, caída máxima, cierres anuales y sesiones del 19-oct al 17-nov-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-11-17', url: 'https://finance.yahoo.com/quote/DLO/history/' },
  { id: 2, titulo: 'DLocal Limited: finances (estimaciones 2026-2028; página con datos al 23-oct-2026, anterior a los resultados del 3T26)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-23', url: 'https://www.marketscreener.com/quote/stock/DLOCAL-LIMITED-123219061/finances/' },
  { id: 3, titulo: 'Ficha quoteSummary de DLO (earningsTrend, recommendationTrend, earningsHistory, objetivos de 10 analistas) tras los resultados', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-11-17', url: 'https://finance.yahoo.com/quote/DLO/analysis/' },
  { id: 4, titulo: 'Fichas de Yahoo Finance (quoteSummary: precio, capitalización, valor empresa, márgenes, estimaciones de BPA e ingresos) de Adyen, PayPal, Shift4, Flywire, Payoneer, StoneCo, PagSeguro, Wise, Remitly y Global Payments; tipos del BCE del 17-nov-2026', editor: 'Yahoo Finance y BCE', tipo: 'Datos de mercado', fecha: '2026-11-17', url: 'https://finance.yahoo.com/quote/PYPL/' },
  { id: 5, titulo: 'Daily Treasury Par Yield Curve Rates 2026 (10 años: 5,10 % el 17-nov-2026)', editor: 'U.S. Department of the Treasury', tipo: 'Primaria', fecha: '2026-11-17', url: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve&field_tdr_date_value=2026' },
  { id: 6, titulo: 'Implied ERP by month (ERPbymonth.xlsx), noviembre de 2026: 4,41 % con payout sostenible', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-11-01', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 7, titulo: 'Global Payments to divest Issuer Solutions to FIS and acquire Worldpay (8-K anexos 99.1 y 99.2)', editor: 'Global Payments Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2025-04-17', url: 'https://www.sec.gov/Archives/edgar/data/1123360/000110465925035771/tm2512552d1_ex99-1.htm' },
  { id: 8, titulo: 'Nexi e Nets: comunicato stampa sulla fusione', editor: 'Nexi S.p.A.', tipo: 'Primaria', fecha: '2020-11-15', url: 'https://emarketstorage.it/sites/default/files/comunicati/2022-05/20201115_87109.pdf' },
  { id: 9, titulo: 'Nuvei enters into agreement to be taken private by Advent International (6-K, anexo 99.1)', editor: 'Nuvei Corporation (SEC EDGAR)', tipo: 'Primaria', fecha: '2024-04-01', url: 'https://www.sec.gov/Archives/edgar/data/1765159/000095010324004743/dp209291_ex9901.htm' },
  { id: 10, titulo: 'FIS and Worldpay to Combine (8-K anexo 99.2)', editor: 'Worldpay, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2019-03-18', url: 'https://www.sec.gov/Archives/edgar/data/1533932/000119312519077546/d720414dex992.htm' },
  { id: 11, titulo: 'dLocal Reports Third Quarter 2026 Financial Results; interim financial statements September 30, 2026 (acciones, caja, deuda, guía)', editor: 'DLocal Limited (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-11-12', url: `${SEC}/000184683226000037/dlo-20260930.htm` },
  { id: 12, titulo: 'DLocal (DLO) Q2 2026 earnings: EPS 0,18 frente a 0,20 de consenso; próximos resultados', editor: 'Earnings Whispers / Investing.com', tipo: 'Datos de mercado', fecha: '2026-08-14', url: 'https://www.investing.com/equities/dlocal-earnings' },
  { id: 13, titulo: 'Form 20-F 2025 (BPA y acciones diluidas 2023-2025)', editor: 'DLocal Limited (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-03-18', url: `${SEC}/000207097926000113/dlo-20251231.htm` },
  { id: 14, titulo: 'Investing.com: recomendaciones de analistas de DLO (UBS a Comprar, objetivo 20 USD, 1-jul-2026)', editor: 'Investing.com', tipo: 'Analistas', fecha: '2026-07-01', url: 'https://www.investing.com/equities/dlocal-consensus-estimates' },
  { id: 15, titulo: 'dLocal is set to join the small-cap Russell 2000 index (noticia en el canal RSS de DLO)', editor: 'Seeking Alpha', tipo: 'Prensa', fecha: '2026-06-26', url: 'https://seekingalpha.com/api/sa/combined/DLO.xml' },
  { id: 16, titulo: 'Schedule 13D/A de General Atlantic (17-ago-2026)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-19', url: `${SEC}/000095014226002390/xslSCHEDULE_13D_X02/primary_doc.xml` },
  { id: 17, titulo: 'dLocal Reports First Quarter 2026 Financial Results; noticia «GAAP EPS of $0.14 misses by $0.02»', editor: 'DLocal Limited (SEC EDGAR) / Seeking Alpha', tipo: 'Primaria', fecha: '2026-05-14', url: `${SEC}/000184683226000019/ex_991-dlocalearningsresul.htm` },
  { id: 18, titulo: 'dLocal Reports Third Quarter 2025 Financial Results (13-nov-2025: caída del 6,8 %)', editor: 'DLocal Limited (SEC EDGAR)', tipo: 'Primaria', fecha: '2025-11-12', url: `${SEC}/000119312525277539/dlo-ex99_1.htm` },
  { id: 19, titulo: 'Form 144 de General Atlantic DO B.V. (12.813.179 acciones de clase A, 17-nov-2026)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-11-17', url: `${SEC}/000095014226003102/xsl144X01/primary_doc.xml` },
  { id: 20, titulo: 'Brazil’s real sinks after Lula’s re-election victory (26-oct-2026)', editor: 'Al Jazeera', tipo: 'Prensa', fecha: '2026-10-26', url: 'https://aljazeera.com/economy/2026/10/26/brazils-real-sinks-after-lulas-re-election-victory' },
  { id: 21, titulo: 'The Brazilian stock exchange sinks 17 %, debt yields jump and the real loses 11 % against the dollar (Lula 51,79 % frente a 48,21 %)', editor: 'Demócrata', tipo: 'Prensa', fecha: '2026-10-26', url: 'https://www.democrata.es/en/economy/the-brazilian-stock-exchange-sinks-17-debt-yields-jump-and-the-real-loses-11-against-the-dollar/amp/' },
  { id: 22, titulo: 'dLocal GAAP EPS of $0.23 beats by $0.01, revenue of $398.05M misses (noticia en el canal RSS de DLO) y Q3 2026 earnings call transcript', editor: 'Seeking Alpha', tipo: 'Prensa', fecha: '2026-11-12', url: 'https://seekingalpha.com/api/sa/combined/DLO.xml' },
  { id: 23, titulo: 'dLocal Q3 earnings call highlights (guía 2026 en extremos, efecto cambiario de 6 puntos en el 4T)', editor: 'Nasdaq / MarketBeat', tipo: 'Prensa', fecha: '2026-11-13', url: 'https://www.nasdaq.com/articles/dlocal-q3-earnings-call-highlights' },
  { id: 24, titulo: 'Notice of 2026 Annual General Meeting (6-K del 4-nov-2026: 286.469.957 acciones a 23-oct-2026)', editor: 'DLocal Limited (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-11-04', url: `${SEC}/000095010326016904/dp256216_ex9901.htm` },
];
const D = {
  _estado: 'completa',
  identificacion: {
    nombre: 'DLocal Limited', nombre_corto: 'dLocal', ticker: 'DLO', isin: 'KYG290181018', mercado: 'Nasdaq Global Select Market (EE. UU.)', indice_referencia: 'S&P 500 (SPY) y Russell 2000',
    pais: 'Uruguay (sede operativa; sociedad de las Islas Caimán)', pais_iso: 'UY', sector: 'Financieros', industria: 'Servicios de transacciones y procesamiento de pagos', sede: 'Montevideo (Uruguay)', fundacion: '2016', empleados: 1274, web: 'https://www.dlocal.com',
    precio: bolsa.identificacion.precio, fecha_precio: bolsa.identificacion.fecha_precio, acciones: 293.8, capitalizacion_publicada: 3569, free_float_pct: 53.0,
    max_52s: bolsa.identificacion.max_52s, min_52s: bolsa.identificacion.min_52s, volumen_medio_diario: `≈ ${bolsa.volumen_3m.importe_dia_millones.toString().replace('.', ',')} M USD/día (3 meses)`, proximos_resultados: '2027-03-17',
  },
  consenso: {
    guidance: 'Guía 2026 (18-mar-2026): volumen +50-60 %, margen bruto +22,5-27,5 % (sobre 403 M) y beneficio operativo +27,5-32,5 % (sobre 220 M). El 13-ago-2026 subió el volumen a +60-70 % y el margen bruto a +25-30 % y mantuvo el beneficio operativo [D11, D17]. El 12-nov-2026 la mantuvo, pero situó el volumen en el extremo alto, el margen bruto en la mitad (≈ +27,5 %, unos 514 M) y el beneficio operativo en el **extremo bajo** (≈ +27,5 %, unos 280 M: el 4T26 necesita unos 87 M frente a 76 M del 3T), por vientos de cara cambiarios no previstos en Brasil, México y Argentina (unos 6 puntos menos de crecimiento del margen bruto en el 4T) y menos negocio en mercados pequeños de comisión alta [D11, D23]. No hay guía de 2027; la dirección lo describe como un año de inversión en infraestructura y equipo comercial [D23].',
    estimaciones: [
      { periodo: '2026e', ingresos: 1568, ebitda: 340.3, ebit: 282.6, bpa: 0.86, dpa: 0.20, fuente: 'Yahoo, ingresos y BPA tras resultados (17-nov); EBITDA y EBIT de MarketScreener (23-oct) [D3, D2]' },
      { periodo: '2027e', ingresos: 2063, ebitda: 435.7, ebit: 382.2, bpa: 1.12, dpa: 0.27, fuente: 'Yahoo (17-nov) y MarketScreener (23-oct) [D3, D2]' },
      { periodo: '2028e', ingresos: 2532, ebitda: 523.9, ebit: 462.0, bpa: 1.26, dpa: 0.35, fuente: 'MarketScreener (23-oct, antes del 3T26) [D2]' },
    ],
    recomendaciones: { n_analistas: 10, comprar: 9, mantener: 1, vender: 0, po_medio: 18.5, po_min: 15, po_max: 21 },
    revisiones: 'Tras los resultados (Yahoo, 17-nov-2026) el BPA medio de 2026 es de 0,86 USD (0,85 hace 30 días y 0,86 hace 90) y el de 2027 de 1,12 (1,14 hace 30 días y 1,13 hace 90): recorte pequeño en 2027; ingresos de 1.568 M en 2026 y 2.063 M en 2027 [D3]. El BPA del 3T26 (0,23) superó el consenso (0,206) y los ingresos (398 M) quedaron por debajo (≈ 403-408 M) [D3, D22]. MarketScreener (datos del 23-oct, antes de los resultados) daba 0,81 / 1,07 / 1,26 USD para 2026-2028 [D2]. Objetivo medio de 10 analistas: 18,50 USD (15-21), frente a 18,80 hace un mes; 3 compra fuerte, 6 compra y 1 mantener, sin cambios en tres meses [D3].',
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
  { id: 1, titulo: 'Stocktwits: flujo de mensajes de $DLO (30 mensajes del 9 al 18-nov-2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-11-18', url: 'https://api.stocktwits.com/api/2/streams/symbol/DLO.json' },
  { id: 2, titulo: 'DLocal: The Next Payment Giant Or Melting Ice Cube', editor: 'Seeking Alpha (autor independiente)', tipo: 'Foros y redes', fecha: '2026-11-16', url: 'https://seekingalpha.com/article/4968486-dlocal-the-next-payment-giant-or-melting-ice-cube' },
  { id: 3, titulo: "DLocal's Q3 Miss Masks Powerful Upside", editor: 'Seeking Alpha (autor independiente)', tipo: 'Foros y redes', fecha: '2026-11-13', url: 'https://seekingalpha.com/article/4967718-dlocals-q3-miss-masks-powerful-upside' },
  { id: 4, titulo: 'DLocal: Wall Street Is Missing The Bigger Picture, I See Double-Digit Upside', editor: 'Seeking Alpha (autor independiente)', tipo: 'Foros y redes', fecha: '2026-10-27', url: 'https://seekingalpha.com/article/4957949-dlocal-wall-street-is-missing-the-bigger-picture-i-see-double-digit-upside' },
  { id: 5, titulo: 'DLocal: Margin Compression Is A Feature Of Scale, Not A Defect', editor: 'Seeking Alpha (autor independiente)', tipo: 'Foros y redes', fecha: '2026-10-07', url: 'https://seekingalpha.com/article/4952467-dlocal-margin-compression-is-a-feature-of-scale-not-a-defect' },
];
const E = {
  _estado: 'completa',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Empeora',
    revisadas: [
      { plataforma: 'Stocktwits ($DLO)', fecha: '2026-11', n_comentarios: 30, tono: 'Dividido', resumen: 'Tras los resultados, mensajes de que «imprimen dinero» y no entienden que la acción no suba; el 17-nov, desconcierto por la «venta rara» con casi cinco veces el volumen normal (sin mencionar el aviso de General Atlantic) y algún accionista antiguo que duda de seguir; otros celebran la recompra del 3 % del capital a 12,99 USD [E1].' },
      { plataforma: 'Seeking Alpha (artículos de noviembre)', fecha: '2026-11', n_comentarios: 2, tono: 'Dividido', resumen: 'Uno ve en el fallo de ingresos del 3T una oportunidad por el apalancamiento operativo; otro plantea si dLocal es un futuro gigante o un «cubito de hielo que se derrite» por la comisión que cae [E2, E3].' },
      { plataforma: 'Seeking Alpha (artículos de octubre)', fecha: '2026-10', n_comentarios: 2, tono: 'Positivo', resumen: 'Antes de los resultados, tesis de potencial de dos dígitos y de que la caída de la comisión es efecto de la escala [E4, E5].' },
    ],
    temas: [
      { tema: 'Caída de la comisión (take rate)', postura: 'Dividida', peso: 'Alto', contraste: 'El margen bruto sobre volumen se quedó plano en el 0,72 % en el 3T26 tras seis trimestres de caída, pero con ayudas puntuales (Argentina y Nigeria); los ingresos no crecieron frente al 2T [A17].' },
      { tema: 'Recompras y dividendo', postura: 'Alcista', peso: 'Medio', contraste: 'Cierto: 120,1 M recomprados a 12,99 USD en 9M26 y quedan ≈ 180 M del programa hasta marzo de 2027 [D11].' },
      { tema: 'Ventas de General Atlantic', postura: 'Bajista', peso: 'Medio', contraste: 'El Form 144 del 17-nov avisa de la venta de 12,8 M de acciones (≈ 4,5 % del capital); los foros no lo enlazan con la caída de ese día [D19].' },
      { tema: 'Brasil tras la reelección de Lula', postura: 'Bajista', peso: 'Bajo', contraste: 'El real perdió un 11 % el 26-oct y la empresa cita vientos de cara cambiarios en Brasil para el 4T; Brasil es el 21 % de los ingresos de 9M26 [A18, D21].' },
    ],
    lectura: 'El sentimiento de los particulares ha pasado de positivo a dividido: valoran los resultados (BPA récord, FCF de 99 M) pero no entienden la caída, y casi nadie relaciona el desplome del 17-nov con el aviso de venta de General Atlantic ni la caída de finales de octubre con el real. Los analistas siguen 9 de 10 en compra. No hay euforia ni capitulación: el sentimiento confirma que la caída es de flujo y de divisa más que de negocio, que es lo que el informe sostiene.',
    confianza: 'Media',
  },
  huecos: [],
  fuentes: fE,
};

guarda('A', A); guarda('B', B); guarda('C', C); guarda('D', D); guarda('E', E);
console.log('Notas A-E escritas;', comparables.length, 'comparables');
console.log(JSON.stringify(comparables.map((c) => [c.nombre, c.capitalizacion, c.per_ntm, c.crecimiento_pct, c.ev_ebitda_ltm]), null, 0));
