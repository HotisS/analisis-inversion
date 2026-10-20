// Escribe las notas A-E de Philip Morris International (corte 2026-10-20) a partir de los documentos de notas/docs (EDGAR),
// del XBRL de la SEC (cuentas-xbrl.json y companyfacts), de bolsa.json, de yahoo-datos.json y comparables-yahoo.json
// (Yahoo quoteSummary del 20-oct-2026, 13:43 UTC) y de la prensa leída. Cada nota cita solo con [n] de su propia lista.
// Ejecutar: node informes/philip-morris-2026-10-20/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const lee = (f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const r1 = (x) => (x == null ? null : Math.round(x * 10) / 10);
const r2 = (x) => (x == null ? null : Math.round(x * 100) / 100);
const X = lee('cuentas-xbrl.json');
const B = lee('bolsa.json');
const Y = lee('yahoo-datos.json').datos;
const C = lee('comparables-yahoo.json');
const E = 'https://www.sec.gov/Archives/edgar/data/1413329';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Form 10-K del ejercicio 2025: cuentas, notas de deuda, pensiones, intangibles, contingencias (RBH, ZYN), riesgos', editor: 'Philip Morris International Inc. (SEC)', tipo: 'Primaria', fecha: '2026-02-06', url: `${E}/000162828026005939/pm-20251231.htm` },
  { id: 2, titulo: 'PMI Reports 2025 Fourth-Quarter & Full-Year Results; Provides 2026-2028 Growth Targets (conciliación de ajustados, guía 2026)', editor: 'Philip Morris International Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-02-06', url: `${E}/000162828026005932/earningsreleasepm-ex991xq4.htm` },
  { id: 3, titulo: 'Form 10-Q del 2T26 (30-jun-2026): balance, deuda, RBH, participadas, regulación (TED, FDA, Reino Unido)', editor: 'Philip Morris International Inc. (SEC)', tipo: 'Primaria', fecha: '2026-07-24', url: `${E}/000162828026049493/pm-20260630.htm` },
  { id: 4, titulo: 'PMI Reports 2026 Second-Quarter & First Six-Months Results (deterioro de RBH, guía 2026)', editor: 'Philip Morris International Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-07-22', url: `${E}/000162828026049107/earningsreleasepm-ex991xq2.htm` },
  { id: 5, titulo: 'PMI Reports 2026 First-Quarter Results', editor: 'Philip Morris International Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-04-22', url: `${E}/000162828026026385/earningsreleasepm-ex991xq1.htm` },
  { id: 6, titulo: 'Cuentas reexpresadas 2024-2025 con los segmentos nuevos (International Smoke-Free, International Combustibles, U.S.)', editor: 'Philip Morris International Inc. (SEC, 8-K, anexos 99.1 y 99.2)', tipo: 'Primaria', fecha: '2026-03-13', url: `${E}/000162828026017497/ex991recastschedules_2025v.htm` },
  { id: 7, titulo: 'Nota de resultados de 2024 (BPA ajustado 6,57 USD, deterioro de RBH de 2024, venta de Vectura)', editor: 'Philip Morris International Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2025-02-06', url: `${E}/000141332925000011/earningsreleasepm-ex991xfy.htm` },
  { id: 8, titulo: 'Nota de resultados de 2023 (BPA ajustado 6,01 USD; Corea, Fundación, deterioros)', editor: 'Philip Morris International Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2024-02-08', url: `${E}/000141332924000012/earningsreleasepm-ex991xfy.htm` },
  { id: 9, titulo: 'Nota de resultados de 2022 (BPA ajustado 5,98 USD; Swedish Match, Ucrania)', editor: 'Philip Morris International Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2023-02-09', url: `${E}/000141332923000020/earningsreleasepm-ex991xfy.htm` },
  { id: 10, titulo: 'Notas de resultados de 2020 y 2021 (BPA ajustado 5,17 y 6,08 USD; aduanas de Arabia Saudí)', editor: 'Philip Morris International Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2022-02-10', url: `${E}/000141332922000007/earningsreleasepm-ex991xq4.htm` },
  { id: 11, titulo: 'Nota de resultados del 3T25 (BPA ajustado 2,24 USD)', editor: 'Philip Morris International Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2025-10-21', url: `${E}/000162828025045579/earningsreleasepm-ex991xq3.htm` },
  { id: 12, titulo: 'XBRL company facts (deuda con vencimientos corrientes, depreciación, amortización de intangibles, pagos de intangibles)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-20', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0001413329.json' },
  { id: 13, titulo: 'PMI en la conferencia de Barclays: guía de BPA ajustado 2026 de 8,35-8,50 USD y 3T de 2,29-2,34', editor: 'Philip Morris International Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-09-08', url: `${E}/000162828026060806/a2026barclaysrelease.htm` },
  { id: 14, titulo: 'Presentación CAGNY 2026: objetivos 2026-2028, ROIC, flujo operativo previsto', editor: 'Philip Morris International Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-02-18', url: `${E}/000162828026008831/a2026cagnyslides.htm` },
  { id: 15, titulo: 'Form 8-K: amortización anticipada de 1.000 M EUR del préstamo de Swedish Match', editor: 'Philip Morris International Inc. (SEC)', tipo: 'Primaria', fecha: '2026-06-29', url: `${E}/000110465926078814/tm2618983d1_8k.htm` },
  { id: 16, titulo: 'PMI sube el dividendo un 8,8 % a 6,40 USD anuales', editor: 'Philip Morris International Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-09-18', url: `${E}/000162828026062621/september2026dividend.htm` },
];

// No recurrentes dentro del resultado operativo (sin la amortización de intangibles, que ya está en amortizaciones) [2, 7-10].
const NOREC = { 2020: 30, 2021: 513, 2022: 503, 2023: 1284, 2024: 451, 2025: 533 };
// Gastos de marketing, administración e investigación [2, 7, 9, 10] (2021 reexpresado en la nota de 2022).
const MAR = { 2020: 7384, 2021: 8400, 2022: 8114, 2023: 10060, 2024: 11147, 2025: 12349 };
// Deuda financiera = deuda a largo con vencimientos corrientes + préstamos a corto [12]: el XBRL de cuentas.mjs omitía el corriente.
const DEUDA = { 2020: 31536, 2021: 27806, 2022: 43123, 2023: 47909, 2024: 45695, 2025: 48835 };
const anios = ['2020', '2021', '2022', '2023', '2024', '2025'];
const cuenta = X.financieros.cuenta.filter((c) => anios.includes(c.periodo)).map((c) => {
  const o = { ...c, gastos_generales: MAR[c.periodo], participadas_en_ebitda: null, no_recurrentes_en_ebitda: NOREC[c.periodo], dpa_extraordinario: 0 };
  delete o.fin; return o;
});
// Gastos financieros de 2024-2025: InterestExpense del XBRL de cuentas.mjs (1.763 y 1.587).
const balance = X.balance.historico.filter((b) => anios.includes(b.periodo)).map((b) => {
  const o = { ...b, deuda_financiera: DEUDA[b.periodo], arrendamientos: 0, activos_contrato: null, pasivos_contrato: null };
  delete o.fin; return o;
});
const flujos = X.flujos.historico.filter((f) => anios.includes(f.periodo)).map((f) => {
  const o = { ...f, adquisiciones: f.adquisiciones ?? 0, desinversiones: f.desinversiones ?? 0, recompras: f.recompras ?? 0, emision_acciones: 0, pagos_arrendamientos: f.pagos_arrendamientos ?? 0 };
  delete o.fin; return o;
});

// Trimestres: ingresos y resultado operativo publicados [6, 5, 4]; EBITDA = resultado operativo + D&A del año repartida por igual
// (estimación propia: 447 M por trimestre en 2024, 499 en 2025 y 512 en 2026); BPA AJUSTADO de la empresa.
const trim = (p, ing, g, go, oi, da, bpa, vs) => ({ periodo: p, ingresos: ing, crecimiento_pct: g, crecimiento_organico_pct: go, ebitda: oi + da, margen_ebitda_pct: r1((oi + da) / ing * 100), bpa, vs_consenso: vs });

const A = {
  _estado: 'Completa. Cuentas del XBRL de la SEC comprobadas con el 10-K de 2025, el 10-Q del 2T26 y las notas de resultados. Corregido: deuda financiera con los vencimientos corrientes (el XBRL de cuentas.mjs daba 45.302 en 2025 en vez de 48.835). Gastos de marketing, administración e investigación copiados de las notas (el XBRL no los etiqueta). No recurrentes = resultado operativo ajustado − resultado operativo − amortización de intangibles. Arrendamientos operativos fuera (US GAAP).',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 42545, ebitda: 18108, ebit: 16059, beneficio_neto: 10874, bpa: 6.95, dpa: 5.90, dpa_extraordinario: 0, fcf: 12722, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 267 },
    cambios_perimetro: [
      { periodo: '2022', descripcion: 'Swedish Match (ZYN, snus, cigarros), consolidada desde el 11-nov-2022 tras una oferta en efectivo de ≈ 16.000 M USD; el balance de 2022 la incluye entera y la cuenta solo siete semanas [1, 9].' },
    ],
    comentario: 'Los ingresos netos (sin impuestos especiales) pasaron de 28.694 M USD en 2020 a 40.648 M en 2025 (TCAC del 7,2 %) y a 42.545 M en los doce meses a junio de 2026 [1, 3]. El crecimiento orgánico de 2025 fue del 6,5 %: precio de los cigarrillos (+1.771 M en el año en International Combustibles) y mezcla hacia los productos sin humo, que ya son el 41,5 % de los ingresos y el 43 % del margen bruto [2, 6]. Swedish Match aportó desde 2023 el negocio de ZYN en EE. UU. (3.216 M de ingresos en 2025) [6]. El margen operativo ajustado subió del 37,8 % en 2023 al 40,4 % en 2025 y al 41,9 % en el 1S26 por precio, escala de IQOS y productividad [2, 4]. Años no comparables: 2023 (deterioros de 680 M, cargo fiscal en Corea de 204 M y la integración de Swedish Match), 2024 (deterioro de 2.316 M de la participación en RBH, por debajo del resultado operativo, que dejó el BPA publicado en 4,52 USD) y el 2T26 (otro deterioro de RBH de 511 M) [7, 8, 4].',
    ajustes: 'El BPA ajustado de la empresa excluye la amortización de intangibles comprados (1.003 M USD en 2025, 0,50 USD por acción, casi toda de Swedish Match), la reestructuración (241 M en 2025, fábricas de Alemania), los deterioros, el litigio de clasificación fiscal en Alemania (176 M), la pérdida por la venta prevista de accesorios (94 M), el efecto fiscal de la financiación de Swedish Match, los ajustes de valor razonable de participaciones y, en 2026, el deterioro de RBH (0,33 USD) [2, 4]. BPA ajustado: 5,17 USD en 2020, 6,08 en 2021, 5,98 en 2022, 6,01 en 2023, 6,57 en 2024 y 7,54 en 2025 (publicado 7,26) [10, 9, 8, 7, 2]. Las partidas excluidas del resultado operativo (sin amortización) sumaron 513, 503, 1.284, 451 y 533 M de 2021 a 2025: casi todos los años hay alguna, así que el DCF resta 0,3 puntos de margen por ellas.',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      trim('3T24', 9911, 8.4, 11.6, 3654, 447, 1.91, null),
      trim('4T24', 9706, 7.3, 7.3, 3259, 447, 1.55, null),
      trim('1T25', 9301, 5.8, 10.2, 3544, 499, 1.69, null),
      trim('2T25', 10140, 7.1, 6.8, 3712, 499, 1.91, null),
      trim('3T25', 10845, 9.4, 5.9, 4263, 499, 2.24, 'Superior'),
      trim('4T25', 10362, 6.8, 3.7, 3373, 499, 1.70, null),
      trim('1T26', 10146, 9.1, 2.7, 3893, 512, 1.96, 'Superior'),
      trim('2T26', 11192, 10.4, 7.6, 4530, 512, 2.20, 'Superior'),
    ],
    ultima_presentacion: 'En el 2T26 (22-jul-2026) los ingresos superaron por primera vez los 11.000 M USD (+10,4 %, +7,6 % orgánico) y el BPA ajustado fue de 2,20 USD (+15,2 %), por encima de la guía de 1,97-2,02 dada en junio [4]. IQOS creció un 7,6 % en volumen pese a Japón (subida de impuestos del 1 de abril y desalmacenamiento) y a la prohibición de sabores en Polonia; los cigarrillos subieron un 1,1 % con un precio del 10 % [4]. EE. UU. fue lo débil: ingresos −0,7 % y beneficio bruto −9,2 %; las ventas de ZYN al consumidor quedaron planas en una categoría que crece, «por un entorno competitivo desigual» (rivales con sabores y potencias que ZYN no tiene autorizados) [4]. La dirección lanzó ZYN ULTRA (más barata por bolsa) y anunció más inversión en EE. UU. en el 2S [4]. En el 1T26 ya había avisado de que ZYN no tenía acceso a los segmentos más dinámicos [5]. Guía 2026 (8-sep-2026): BPA ajustado de 8,35-8,50 USD (+7,5-9,5 % sin divisa), crecimiento orgánico de ingresos del 5-7 % y del resultado operativo del 7-9 %, flujo operativo ≈ 13.500 M, inversión de 1.400-1.600 M, sin recompras y deuda neta ≈ 2 veces el EBITDA a final de año; 3T26 de 2,29-2,34 USD [13, 4]. Los resultados del 3T26 se publican el 21-oct-2026.',
    confianza: 'Alta',
  },
  balance: {
    historico: balance,
    vencimientos: [
      { anio: '2026', importe: 3540 }, { anio: '2027', importe: 6816 }, { anio: '2028', importe: 4968 }, { anio: '2029', importe: 4968 }, { anio: '2030', importe: 5903 }, { anio: '2031-2035', importe: 14199 }, { anio: '2036+', importe: 8611 },
    ],
    liquidez: 'Caja de 5.999 M USD a 30-jun-2026; líneas de crédito comprometidas de 6.300 M sin disponer y programas de pagarés de 8.000 M (sin saldo a 31-dic-2025) [3, 1].',
    rating: 'Moody\'s A2 (estable), S&P A- (positiva), Fitch A (estable), a 6-feb-2026 [1]',
    coste_deuda_pct: 3.7,
    vida_media_anios: 7.0,
    otros_pasivos: 'Pensiones: déficit neto de 318 M USD en pensiones y 260 M en asistencia médica de jubilados a 31-dic-2025 (el plan suizo es el 71 % de las obligaciones) [1]. RBH (Canadá): desconsolidada desde 2019; el plan de arreglo de las demandas del tabaco canadiense entró en vigor el 29-ago-2025 y RBH paga su parte con sus flujos; PMI la lleva como participación (51 M tras deterioros acumulados de 3.060 M) y no garantiza los pagos [3]. Litigios de ZYN en EE. UU. (cinco demandas colectivas por adicción y publicidad), demandas de salud en otros países y el pleito fiscal de Alemania (176 M provisionados en 2025) [3, 2]. Garantías de deuda de Eastern Company (Egipto) por hasta 385 M hasta 2034 [3]. Participación del 23 % en Megapolis, el distribuidor ruso (0,8 bn de valor contable) [3].',
    comentario: 'El patrimonio atribuido es negativo (−9.994 M USD a 31-dic-2025 y −8.583 M a 30-jun-2026) por 35.459 M de autocartera recomprada antes de 2022 y por los dividendos, no por pérdidas [3]. La deuda financiera subió de 27.806 M en 2021 a 48.835 M en 2025 por la compra de Swedish Match (préstamo en euros de 2022) y los pagos a Altria por los derechos de IQOS en EE. UU.; el préstamo de Swedish Match baja de 2.944 a 1.711 M en el 1S26 tras amortizar 1.000 M EUR por anticipado [3, 15]. Deuda neta a 30-jun-2026: 49.113 − 5.999 = 43.114 M, ≈ 2,3 veces el EBITDA ajustado de doce meses; la empresa apunta a ≈ 2 veces a final de 2026 [3, 13]. El circulante comercial es alto (28,6 % de las ventas: hoja de tabaco que se cura más de un año y producto terminado en 90 mercados) [1].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'El flujo operativo ha ido de 9.812 M USD en 2020 a 12.233 M en 2025 y 14.264 M en los doce meses a junio de 2026; la guía de 2026 es ≈ 13.500 M y la de 2026-2028, ≈ 45.000 M acumulados [1, 3, 14]. La inversión publicada en 2022 (2.079 M) y 2023 (3.096 M) incluye 1.002 y 1.775 M de pagos por intangibles (sobre todo los derechos de IQOS en EE. UU. comprados a Altria); la inversión en inmovilizado fue de 1.321-1.569 M en 2023-2025 y la guía es de 1.300-1.500 M al año en 2026-2028, casi toda para los productos sin humo [12, 14]. Conversión: flujo libre de 10.664 M en 2025 frente a un beneficio atribuido de 11.348 M. Usos de la caja: dividendos (8.624 M en 2025, 70 % del flujo operativo) y reducción de deuda; no hay recompras desde 2022 ni previstas en 2026 [1, 13].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'PricewaterhouseCoopers SA', anios_auditor: 18, opinion: 'Favorable (sin salvedades) en 2025, también sobre el control interno [1]',
    comentario: 'Las cuentas son limpias y el BPA ajustado se concilia línea a línea [2]. La distancia entre publicado y ajustado es grande en 2024 (4,52 frente a 6,57 USD por el deterioro de RBH) y moderada en 2025 (7,26 frente a 7,54) [7, 2]. Lo que más pesa en el ajuste recurrente es la amortización de intangibles de Swedish Match (≈ 0,50 USD por acción al año): es un coste contable sin salida de caja y los comparables suelen excluirlo. Partidas que se repiten: reestructuraciones (109-241 M al año en 2023-2025) y cargos fiscales y de litigios por país (Corea, Egipto, Alemania, Arabia Saudí) [2, 7, 8, 10]. Riesgo de valoración en participaciones: Megapolis (Rusia), STAEM (Argelia) e Eastern (Egipto) [3]. El patrimonio negativo invalida el ROE y desfigura el Altman Z; el Beneish y el Piotroski se leen con normalidad.',
    senales: [
      { senal: 'Patrimonio negativo', nivel: 'Baja', comentario: '−9.994 M USD en 2025 por recompras y dividendos, no por pérdidas; rating A [1].' },
      { senal: 'Deterioros de RBH (Canadá)', nivel: 'Media', comentario: '2.316 M en 2024 y 511 M en el 2T26, por debajo del resultado operativo; quedan 51 M en balance [3, 7].' },
      { senal: 'Cargos «no recurrentes» que se repiten', nivel: 'Media', comentario: 'Entre 451 y 1.284 M al año en 2021-2025 (reestructuración, impuestos indirectos, litigios) [2, 7, 8, 9, 10].' },
      { senal: 'Participaciones en mercados de riesgo', nivel: 'Media', comentario: 'Megapolis (Rusia, 23 %, 0,8 bn) y STAEM (Argelia, 0,7 bn), con pérdidas de conversión acumuladas [3].' },
      { senal: 'Ajuste de divisa en el BPA', nivel: 'Baja', comentario: 'La guía de 2026 incluye +0,24 USD de divisa y, en el 2T26, ganancias transaccionales por el rublo en impuestos diferidos [13, 4].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Prioridades declaradas: invertir en los productos sin humo (1.300-1.500 M USD al año en 2026-2028), dividendo progresivo (subido todos los años desde 2008; 6,40 USD anuales desde septiembre de 2026, +8,8 %) y reducir deuda hasta ≈ 2 veces el EBITDA ajustado a final de 2026; sin recompras en 2026 [16, 13, 14]. Objetivos 2026-2028: ingresos orgánicos +6-8 % anual, resultado operativo orgánico +8-10 % y BPA ajustado sin divisa +9-11 % (sin recompras y con los tipos fiscales actuales) [14].',
    adquisiciones: [
      { anio: '2021', objetivo: 'Fertin Pharma (chicles y bolsas de nicotina, Dinamarca)', importe: 820, ev_ebitda: null, financiacion: 'Caja', resultado: 'Integrada en Wellness y oral; parte del bienestar acabó en deterioros (Aspeya) [1].' },
      { anio: '2021', objetivo: 'Vectura Group (inhaladores, Reino Unido)', importe: 1400, ev_ebitda: null, financiacion: 'Caja', resultado: 'Fracaso: deterioros y venta en 2024 con una pérdida de 199 M USD [7].' },
      { anio: '2022', objetivo: 'Swedish Match (ZYN, snus, cigarros)', importe: 16000, ev_ebitda: null, financiacion: 'Préstamo en euros, bonos y caja', resultado: 'Éxito comercial: ZYN pasó de 385 a 794 M de latas en EE. UU. entre 2023 y 2025; fondo de comercio de ≈ 13.000 M y amortización de 0,50 USD por acción al año [6, 1].' },
      { anio: '2022-2024', objetivo: 'Derechos de IQOS en EE. UU. (fin del acuerdo con Altria)', importe: 2777, ev_ebitda: null, financiacion: 'Caja', resultado: 'Pendiente: IQOS ILUMA sigue sin autorización de la FDA (solicitud de oct-2023) [3, 12].' },
    ],
    comentario: 'La asignación de capital se juzga sobre todo por Swedish Match: pagó ≈ 16.000 M USD por un negocio que en 2025 aportó 3.216 M de ingresos en EE. UU. con un resultado operativo ajustado de 1.124 M, y que ahora crece poco [6, 1]. Al precio pagado, el rendimiento antes de impuestos es del 7 %: por debajo de lo prometido, aunque ZYN es la marca líder de la categoría [6]. Vectura fue un error (vendida con pérdidas en 2024) [7]. Los dividendos absorben el 70 % del flujo operativo y no ha habido recompras desde 2022, así que las acciones diluidas apenas se mueven (1.558 M en 2020 y en 2025) [1]. El ROIC operativo (con fondo de comercio) ronda el 25 %: la base sigue siendo excelente.',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'International Smoke-Free', descripcion: 'IQOS (tabaco calentado), ZYN fuera de EE. UU., snus nórdico y VEEV (vapeo), en 106 mercados.', tipo_resultado: null, historico: [{ periodo: '2023', ingresos: 11102, resultado: null }, { periodo: '2024', ingresos: 12126, resultado: null }, { periodo: '2025', ingresos: 13996, resultado: null }] },
      { nombre: 'International Combustibles', descripcion: 'Cigarrillos fuera de EE. UU. (Marlboro, L&M, Chesterfield, Sampoerna en Indonesia).', tipo_resultado: null, historico: [{ periodo: '2023', ingresos: 21903, resultado: null }, { periodo: '2024', ingresos: 22807, resultado: null }, { periodo: '2025', ingresos: 23436, resultado: null }] },
      { nombre: 'U.S.', descripcion: 'ZYN y snus en EE. UU., IQOS (venta limitada), cigarros y Wellness (Aspeya).', tipo_resultado: null, historico: [{ periodo: '2023', ingresos: 2169, resultado: null }, { periodo: '2024', ingresos: 2944, resultado: null }, { periodo: '2025', ingresos: 3216, resultado: null }] },
    ],
    geografias: null,
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Unidades totales (M de millones de equivalentes)', valor_anterior: '775,7', valor_actual: '786,5', variacion: '+1,4 %', comentario: 'Quinto año seguido de volumen al alza [6, 2].' },
      { kpi: 'Unidades de tabaco calentado (HTU, M de millones)', valor_anterior: '139,7', valor_actual: '155,1', variacion: '+11,0 %', comentario: 'IQOS: 76 % del volumen mundial de la categoría [6, 2].' },
      { kpi: 'Cigarrillos (M de millones)', valor_anterior: '616,8', valor_actual: '607,4', variacion: '−1,5 %', comentario: 'Cuota del 25,3 % de la categoría (sin China ni EE. UU.) en el 2T26 [6, 4].' },
      { kpi: 'Latas de ZYN en EE. UU. (millones)', valor_anterior: '580,5', valor_actual: '793,7', variacion: '+36,7 %', comentario: 'En el 1S26: −10 % en envíos y ventas al consumidor planas en el 2T [6, 4].' },
      { kpi: 'Peso de los productos sin humo en los ingresos', valor_anterior: '38,7 %', valor_actual: '41,5 %', variacion: '+2,8 pp', comentario: '42 % en el 2T26 [2, 4].' },
      { kpi: 'BPA ajustado (USD)', valor_anterior: '6,57', valor_actual: '7,54', variacion: '+14,8 %', comentario: 'Guía 2026: 8,35-8,50 [2, 13].' },
    ],
    clientes: 'Vende a distribuidores y mayoristas, no al fumador: en 2025 un distribuidor de Europa y otro de Asia superaron cada uno el 10 % de los ingresos, y Megapolis (participada al 23 %, Rusia) compró 1.487 M USD en el 1S26 [1, 3]. El poder de precios es la clave del negocio: el precio aportó +1.771 M de ingresos en International Combustibles en 2025 con volúmenes a la baja, y el 10 % en el 2T26 [6, 4]. La recurrencia es casi total (consumo diario adictivo). En EE. UU., ZYN mantiene ≈ dos tercios del valor de la categoría en 2025 con precio superior, pero en 2026 tuvo que lanzar ZYN ULTRA a menor precio por bolsa [2, 4].',
    confianza: 'Alta',
  },
  huecos: [
    { seccion: 'negocio', campo: 'resultado por segmento', tipo: 'Complemento', intentos: '1) Cuentas reexpresadas de marzo de 2026: dan el resultado de las empresas operativas solo para International (agregado) y U.S.; 2) nota del 2T26: igual; 3) 10-Q: beneficio bruto por segmento, no resultado', decision: 'Omitido (ingresos por segmento sí; resultado de International 15.956 M y de U.S. 1.124 M ajustados en 2025 en el texto)' },
    { seccion: 'negocio', campo: 'geografias', tipo: 'Complemento', intentos: '1) 10-K 2025: ingresos por segmento y por producto, sin reparto por país completo; 2) cuentas reexpresadas: solo segmentos; 3) presentación CAGNY: volúmenes por región sin ingresos', decision: 'Omitido' },
  ],
  fuentes: fA,
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Form 10-K de 2025: negocio, competencia, regulación', editor: 'Philip Morris International Inc. (SEC)', tipo: 'Primaria', fecha: '2026-02-06', url: `${E}/000162828026005939/pm-20251231.htm` },
  { id: 2, titulo: 'Form 10-Q del 2T26: revisión de la directiva de impuestos especiales (TED), prohibición generacional del Reino Unido, FDA (ZYN, ILUMA, guía del 8-may-2026)', editor: 'Philip Morris International Inc. (SEC)', tipo: 'Primaria', fecha: '2026-07-24', url: `${E}/000162828026049493/pm-20260630.htm` },
  { id: 3, titulo: 'Presentación CAGNY 2026: volúmenes de la industria, cuota de los productos sin humo, crecimiento por categoría', editor: 'Philip Morris International Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-02-18', url: `${E}/000162828026008831/a2026cagnyslides.htm` },
  { id: 4, titulo: 'Tobacco Market Size, 2025-2035 (978 bn USD en 2025, TCAC del 2,9 %)', editor: 'Reports and Data', tipo: 'Sectorial', fecha: '2025', url: 'https://reportsanddata.com/report-detail/tobacco-market' },
  { id: 5, titulo: 'Heated Tobacco Products Market (33,3 bn USD en 2024)', editor: 'IMARC Group', tipo: 'Sectorial', fecha: '2025', url: 'https://imarcgroup.com/heated-tobacco-products-market' },
  { id: 6, titulo: 'Is the EU cracking down on tobacco? (revisión de la directiva de impuestos: +139 % en el mínimo de cigarrillos, mínimos para vapeo, calentado y bolsas; sin acuerdo en el Consejo)', editor: 'Euronews', tipo: 'Prensa', fecha: '2026-08-17', url: 'https://www.euronews.com/my-europe/2026/08/17/is-the-eu-cracking-down-on-tobacco-ask-the-euronews-chatbot' },
  { id: 7, titulo: 'FDA nicotine pouch review delay report knocks tobacco shares lower (1-abr-2026)', editor: '2Firsts', tipo: 'Prensa', fecha: '2026-04-01', url: 'https://www.2firsts.com/news/fda-nicotine-pouch-review-delay-report-knocks-tobacco-shares-lower' },
  { id: 8, titulo: 'PMI Reports 2026 Second-Quarter Results (ZYN en EE. UU., IQOS en Japón y Europa, VEEV)', editor: 'Philip Morris International Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-07-22', url: `${E}/000162828026049107/earningsreleasepm-ex991xq2.htm` },
  { id: 9, titulo: 'Cuentas reexpresadas 2024-2025 por segmentos y volúmenes por categoría', editor: 'Philip Morris International Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-03-13', url: `${E}/000162828026017497/ex991recastschedules_2025v.htm` },
  { id: 10, titulo: 'Datos de mercado de Altria, BAT, Imperial, Japan Tobacco, KT&G, ITC, Turning Point y Scandinavian Tobacco (ingresos y márgenes de los últimos doce meses)', editor: 'Yahoo Finance (quoteSummary), 20-oct-2026', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/MO/' },
  { id: 11, titulo: 'PMI Reports 2025 Fourth-Quarter & Full-Year Results (cuota de IQOS, ZYN, Japón)', editor: 'Philip Morris International Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-02-06', url: `${E}/000162828026005932/earningsreleasepm-ex991xq4.htm` },
  { id: 12, titulo: 'PMI anuncia un acuerdo de fabricación por contrato de cigarrillos con Altria (PM USA)', editor: 'Philip Morris International Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-08-24', url: `${E}/000162828026058513/a2026-08x24pressrelease.htm` },
];
const fx = { USD: 1, GBP: 1.3336, JPY: 1 / 157.81, KRW: 1 / 1333.4, INR: 1 / 94.98, DKK: 1 / 6.6588 };
const usd = (t, x) => (x == null ? null : Math.round(x * fx[C.datos[t].divisa_fin] / 1e6));
const comp = (nombre, pais, ticker, t, comentario) => ({ nombre, pais, ticker, ingresos: usd(t, C.datos[t].ventas), cuota_pct: null, margen_ebit_pct: null, comentario: `${comentario} Ingresos de doce meses de ${usd(t, C.datos[t].ventas).toLocaleString('es-ES')} M USD y margen EBITDA del ${r1(C.datos[t].margen_ebitda * 100).toString().replace('.', ',')} % (Yahoo) [10].` });
const B_ = {
  _estado: 'Completa. Tamaño del mercado con dos fuentes de pago resumidas (Reports and Data, IMARC) y los volúmenes de la propia PMI; competidores con datos de Yahoo (márgenes EBITDA, no EBIT).',
  sector: {
    definicion: 'El mercado relevante es el de la nicotina legal de consumo fuera de China (cigarrillos, tabaco calentado, bolsas de nicotina, snus y vapeo). Hay dos formas de medirlo: en valor de venta al público con impuestos, ≈ 978.000 M USD en 2025 según Reports and Data [4], y en volumen, ≈ 2,9 billones de unidades equivalentes según las estimaciones de PMI (los productos sin humo son el 19 % del volumen y el 32 % del consumo en 2025) [3]. Usamos el volumen como medida principal porque la cifra en valor incluye impuestos especiales (≈ dos tercios del precio en Europa) y PMI publica sus ingresos netos de ellos [1].',
    tamano: '≈ 978.000 M USD a precio de venta con impuestos en 2025 (Reports and Data) [4]; el tabaco calentado, ≈ 33.300 M USD en 2024 (IMARC) [5].',
    unidad_serie: 'miles de millones de USD (venta al público con impuestos)',
    serie: [{ anio: '2025', tamano: 978 }, { anio: '2035e', tamano: 1299 }],
    tcac_historico_pct: null, tcac_previsto_pct: 2.9, cr5_pct: null, estructura: 'Concentrada',
    drivers: [
      { driver: 'Caída del volumen de cigarrillos', efecto: '−', horizonte: 'Estructural', evidencia: 'Industria sin China ni EE. UU.: −2 % anual en 2022-2025; −3,1 % en los mercados con productos sin humo [3].' },
      { driver: 'Paso a productos sin humo (calentado, bolsas, vapeo)', efecto: '+', horizonte: 'Estructural', evidencia: 'Volumen sin humo +19 % anual en 2022-2025; bolsas +54 %, calentado +12 % [3].' },
      { driver: 'Poder de precios de los cigarrillos', efecto: '+', horizonte: 'Estructural', evidencia: 'Precio del +10 % en International Combustibles en el 2T26 con volumen +1,1 % [8].' },
      { driver: 'Impuestos especiales', efecto: '−', horizonte: 'Estructural', evidencia: 'Japón subió el impuesto del calentado el 1-abr-2026; la UE negocia mínimos para calentado y bolsas [8, 6].' },
      { driver: 'Regulación de la FDA en EE. UU.', efecto: '+/−', horizonte: 'Estructural', evidencia: 'ZYN autorizada en ene-2025 y con declaración de riesgo reducido en jun-2026; ILUMA pendiente desde oct-2023 [2].' },
      { driver: 'Divisas de emergentes', efecto: '+/−', horizonte: 'Cíclico', evidencia: '−0,77 USD de BPA por divisa en 2022 y +0,24 en la guía de 2026 [3].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Cuatro grandes (PMI, BAT, JT, Imperial) más Altria en EE. UU.; en bolsas de nicotina la rivalidad sube: ZYN ha tenido que bajar precio por bolsa (ZYN ULTRA) ante Velo, on! y productos sin autorizar [8].' },
      { fuerza: 'Poder de los clientes', intensidad: 1, justificacion: 'El consumidor es fiel y poco sensible al precio; los distribuidores son muchos y el producto es de marca [1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 1, justificacion: 'Hoja de tabaco y componentes electrónicos de muchos proveedores; PMI fabrica sus dispositivos con contratistas [1].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Barreras regulatorias (autorizaciones de la FDA de años y millones de USD) y de distribución; las bolsas de nicotina sin autorizar bajan la barrera en EE. UU. [2].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'El vapeo desechable y las bolsas baratas sustituyen al cigarrillo y al calentado; el ilícito es ≈ 10 % del mercado europeo (estimación de la industria) [3].' },
    ],
    ciclo: { posicion: 'Madurez del ciclo', comentario: 'El tabaco es poco cíclico: en 2008-09 PMI mantuvo el volumen y subió precios; en 2020 la pandemia restó viajes y duty-free pero el BPA ajustado solo cayó un 0,4 % (+7 % sin divisa) [3]. En 2022 el golpe vino de la divisa y de Rusia (BPA −2,4 % en USD) [3]. Lo cíclico es el tipo de cambio de los emergentes y, en 2026, los costes de transporte y energía por el conflicto de Oriente Medio [8].' },
    regulacion: 'UE: la Comisión propuso en julio de 2025 revisar la directiva de impuestos especiales del tabaco (+139 % en el mínimo de los cigarrillos e inclusión del calentado, el vapeo y las bolsas, con entrada en vigor el 1-ene-2028 y cuatro años de transición), pero exige unanimidad y en agosto de 2026 seguía sin acuerdo en el Consejo ni dictamen del Parlamento [2, 6]. Reino Unido: ley del 29-abr-2026 que prohíbe vender tabaco, también calentado, a los nacidos desde 2009 [2]. EE. UU.: la FDA autorizó 20 variedades de ZYN (ene-2025) y su declaración de riesgo reducido (jun-2026); el 8-may-2026 dijo que no perseguirá productos con solicitudes avanzadas, y ILUMA sigue en revisión [2]. Sabores: prohibidos en el calentado en la UE desde 2023 y en Polonia desde enero de 2026 [8].',
    tendencias: 'El consumo se desplaza hacia productos sin combustión: en 2025 el 32 % de los consumidores de nicotina fuera de China ya usaba alguno [3]. PMI gana con ello en calentado (IQOS supera a Marlboro como primera marca en sus mercados en el 1T26) y en vapeo cerrado (VEEV, primero en Europa), pero pierde terreno relativo en bolsas de EE. UU., la categoría que más crece, donde los rivales venden sabores y potencias que ZYN no tiene autorizados [8]. PMI fabricará cigarrillos para Altria fuera de EE. UU. desde 2027, señal de que los dos optimizan un negocio que se encoge [12].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 25.3,
    posicion: '1.º mundial sin China ni EE. UU.: 25,3 % del volumen de cigarrillos (Marlboro 11,0 %) [8]; ≈ 76 % del tabaco calentado mundial con IQOS [11]; ≈ dos tercios del valor de las bolsas de nicotina de EE. UU. con ZYN en 2025 [11].',
    competidores: [
      comp('British American Tobacco', 'Reino Unido', 'BATS', 'BATS.L', 'Segundo grupo mundial; Velo en bolsas (rival directo de ZYN), glo en calentado y Vuse en vapeo.'),
      comp('Altria', 'EE. UU.', 'MO', 'MO', 'Marlboro en EE. UU. (licencia de la marca separada de PMI desde 2008) y on! en bolsas.'),
      comp('Japan Tobacco', 'Japón', '2914', '2914.T', 'Rival de IQOS en Japón con Ploom; compró Vector Group en 2024.'),
      comp('Imperial Brands', 'Reino Unido', 'IMB', 'IMB.L', 'Cigarrillos en EE. UU., Reino Unido, Alemania y España; pequeño en productos nuevos.'),
      comp('KT&G', 'Corea del Sur', '033780', '033780.KS', 'Líder en Corea; fabrica lil, el calentado que PMI vende fuera de Corea por acuerdo.'),
      comp('ITC', 'India', 'ITC', 'ITC.NS', 'Líder de cigarrillos en India; conglomerado con alimentación y hoteles.'),
      comp('Turning Point Brands', 'EE. UU.', 'TPB', 'TPB', 'Zig-Zag, Stoker\'s y FRE, bolsas de nicotina que ganan cuota en EE. UU.'),
    ],
    foso: {
      veredicto: 'Amplio', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'Poco relevantes: el dispositivo IQOS crea una base instalada (43 millones de usuarios de productos sin humo) pero no hay red entre usuarios [11].' },
        { fuente: 'Costes de cambio', puntuacion: 3, evidencia: 'Dispositivo propio (IQOS solo usa TEREA, SENTIA o LEVIA) y fidelidad a la marca: IQOS gana cuota pese a subir precios [8].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 5, evidencia: 'Marlboro con récord del 11,0 % de cuota, IQOS con el 76 % del calentado, ZYN con autorización y declaración de riesgo reducido de la FDA, la primera en bolsas [8, 11, 2].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Margen operativo ajustado del 40,4 % en 2025 frente al 21 % de EBITDA de Imperial [10].' },
        { fuente: 'Escala eficiente', puntuacion: 4, evidencia: '786.500 M de unidades en 2025 y presencia en ≈ 170 mercados; más de 16.000 M USD invertidos en productos sin humo desde 2008 [11, 1].' },
      ],
    },
    amenazas: 'Las amenazas reales son tres. Primera, las bolsas de nicotina en EE. UU.: la categoría crece y ZYN no, porque Velo Plus, on! PLUS y productos importados sin autorizar ofrecen sabores y potencias que ZYN no tiene; la FDA relajó en mayo de 2026 la persecución de productos pendientes, lo que ayuda a ZYN ULTRA pero también a los rivales [8, 2]. Segunda, los impuestos al calentado (Japón en 2026, la UE desde 2028 si hay unanimidad), que estrechan la ventaja fiscal de IQOS frente al cigarrillo [6, 8]. Tercera, prohibiciones de sabores y generacionales (Polonia, Reino Unido) [2]. Probabilidad media; el foso de marca y de autorizaciones aguanta.',
    confianza: 'Media',
  },
  historia: {
    resumen: 'Philip Morris nació en Londres en 1847 como estanco de Philip Morris; la rama estadounidense creó Marlboro, que desde 1972 es la marca de cigarrillos más vendida del mundo. Philip Morris International se separó de Altria en marzo de 2008 con el negocio fuera de EE. UU. y la sede operativa en Lausana. Desde 2014 vende IQOS, el tabaco calentado, y en 2016 anunció su objetivo de dejar los cigarrillos. En 2022 compró Swedish Match (ZYN) y en 2024 recuperó de Altria los derechos de IQOS en EE. UU.; en 2026 se reorganizó en una unidad internacional y otra de EE. UU. [1].',
    hitos: [
      { anio: '1847', hito: 'Philip Morris abre su estanco en Londres [1].' },
      { anio: '2008', hito: 'Escisión de Altria: PMI se queda con el negocio fuera de EE. UU. [1].' },
      { anio: '2014', hito: 'Lanzamiento de IQOS en Japón e Italia [1].' },
      { anio: '2019', hito: 'RBH (Canadá) entra en concurso por las demandas del tabaco y se desconsolida [1].' },
      { anio: '2020', hito: 'La FDA autoriza IQOS como producto de exposición reducida [1].' },
      { anio: '2022', hito: 'Compra de Swedish Match (ZYN) por ≈ 16.000 M USD [1].' },
      { anio: '2024', hito: 'PMI recupera de Altria los derechos de IQOS en EE. UU.; vende Vectura con pérdidas [1].' },
      { anio: '2025', hito: 'La FDA autoriza 20 variedades de ZYN; entra en vigor el plan de arreglo de RBH [1, 2].' },
      { anio: '2026', hito: 'Nueva organización (International y U.S.); ZYN obtiene la declaración de riesgo reducido; Massimo Andolina, director financiero [2].' },
    ],
    confianza: 'Alta',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Lo material es la salud: PMI sostiene que sus productos sin humo reducen el daño frente al cigarrillo y lo respaldan las autorizaciones de la FDA (IQOS y ZYN como productos de riesgo o exposición reducidos) [2]. El 58 % de sus ingresos sigue viniendo del cigarrillo en el 2T26 [8]. El segundo asunto es el ilícito y la regulación: las bolsas de nicotina son más fáciles de falsificar y PMI amplía sus controles [2]. Muchos fondos excluyen el tabaco por política, lo que limita la base de accionistas y puede explicar parte del descuento histórico frente al consumo básico.',
    controversias: 'Italia multó a PMI con 7 M EUR en junio de 2026 por la publicidad «libre de humo» (Reuters, según el rastreador de noticias) [2]; cinco demandas colectivas en EE. UU. contra ZYN por adicción y publicidad dirigida a jóvenes [2]; el litigio fiscal de clasificación en Alemania (176 M USD en 2025) [1].',
    confianza: 'Media',
  },
  huecos: [
    { seccion: 'sector', campo: 'cr5_pct y serie histórica del tamaño', tipo: 'Complemento', intentos: '1) 10-K y CAGNY: cuotas de PMI pero no de los cinco primeros; 2) informes sectoriales (Reports and Data, IMARC): solo cifras resumidas; 3) Euromonitor: de pago', decision: 'Omitido' },
    { seccion: 'competencia', campo: 'margen EBIT de los competidores', tipo: 'Complemento', intentos: '1) Yahoo: margen EBITDA, no EBIT; 2) informes anuales de BAT, Altria y JT: no leídos por tiempo; 3) prensa: no fiable', decision: 'Omitido (margen EBITDA en el comentario)' },
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) Informe de sostenibilidad de PMI: no descargado; 2) MSCI y Sustainalytics: requieren registro; 3) prensa: sin fecha fiable', decision: 'Omitido' },
  ],
  fuentes: fB,
};
guarda('B', B_);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Proxy statement 2026 (DEF 14A): consejo, comités, remuneración, participaciones', editor: 'Philip Morris International Inc. (SEC)', tipo: 'Primaria', fecha: '2026-03-26', url: `${E}/000162828026021169/pmi-20260325.htm` },
  { id: 2, titulo: 'Form 8-K: resultados de la junta del 6-may-2026', editor: 'Philip Morris International Inc. (SEC)', tipo: 'Primaria', fecha: '2026-05-08', url: `${E}/000162828026032644/pm-20260506.htm` },
  { id: 3, titulo: 'Form 8-K: resultados de la junta de 2025', editor: 'Philip Morris International Inc. (SEC)', tipo: 'Primaria', fecha: '2025-05-09', url: `${E}/000141332925000104/pm-20250507.htm` },
  { id: 4, titulo: 'Form 8-K: resultados de la junta de 2024', editor: 'Philip Morris International Inc. (SEC)', tipo: 'Primaria', fecha: '2024-05-09', url: `${E}/000141332924000100/pm-20240508.htm` },
  { id: 5, titulo: 'PMI Announces Group CFO Succession (Massimo Andolina sustituye a Emmanuel Babeau desde el 1-ago-2026)', editor: 'Philip Morris International Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-05-20', url: `${E}/000162828026036721/a2026-05x20release.htm` },
  { id: 6, titulo: 'PMI Evolves Organizational Model (unidades International y U.S. desde el 1-ene-2026)', editor: 'Philip Morris International Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2025-11-04', url: `${E}/000162828025048526/november4pressrelease.htm` },
  { id: 7, titulo: 'Formularios 4 de directivos y consejeros, 20-oct-2025 a 20-oct-2026 (herramientas/form4.mjs)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-20', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001413329&type=4' },
  { id: 8, titulo: 'Notas de resultados anuales 2020-2025 con la guía de cada año', editor: 'Philip Morris International Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-02-06', url: `${E}/000162828026005932/earningsreleasepm-ex991xq4.htm` },
  { id: 9, titulo: 'Form 8-K: separación del director financiero saliente (acuerdo de salida de E. Babeau)', editor: 'Philip Morris International Inc. (SEC)', tipo: 'Primaria', fecha: '2026-07-09', url: `${E}/000162828026047782/pm-20260706.htm` },
];
const C_ = {
  _estado: 'Completa. Proxy 2026, votaciones de las juntas 2024-2026, Form 4 de 12 meses y comunicados de cambios en la dirección.',
  directivos: {
    equipo: [
      { nombre: 'Jacek Olczak', cargo: 'Group CEO', desde: '2021', participacion_pct: 0.03, trayectoria: 'En PMI desde 1993; director financiero (2012-2017) y director de operaciones (2018-2021). Con él al frente, el BPA ajustado pasó de 6,08 USD en 2021 a 7,54 en 2025 y los productos sin humo del 29 % al 41,5 % de los ingresos; compró Swedish Match [1, 8].' },
      { nombre: 'Massimo Andolina', cargo: 'Group CFO', desde: '2026', participacion_pct: 0.003, trayectoria: 'En PMI desde 2008; operaciones globales (2018-2023) y presidente de Europa (2023-2026), la región más avanzada en productos sin humo. Director financiero desde el 1-ago-2026 [5].' },
      { nombre: 'André Calantzopoulos', cargo: 'Presidente del consejo (no ejecutivo desde 2024)', desde: '2013', participacion_pct: 0.06, trayectoria: 'Consejero delegado de 2013 a 2021 y presidente ejecutivo hasta mayo de 2024; lanzó IQOS [1].' },
      { nombre: 'Frederic de Wilde', cargo: 'CEO PMI International', desde: '2026', participacion_pct: 0.006, trayectoria: 'Dirigía Asia del Sur y Sudeste, CEI, Oriente Medio y África; responsable de 37.400 M USD de ingresos [6, 1].' },
      { nombre: 'Stacey Kennedy', cargo: 'CEO PMI U.S.', desde: '2023', participacion_pct: 0.002, trayectoria: 'Lleva ZYN e IQOS en EE. UU.; en su etapa ZYN pasó de 385 a 794 M de latas, pero en 2026 las ventas al consumidor se estancaron [1, 6].' },
    ],
    historial_guidance: [
      { anio: '2021', guia: 'BPA ajustado 5,90-6,00 USD', real: '6,08 USD', cumplida: 'Sí' },
      { anio: '2022', guia: 'BPA ajustado 6,12-6,30 USD (6,57-6,75 sin divisa)', real: '5,98 USD (+10,1 % sin divisa, dentro del +8-11 %)', cumplida: 'Parcial' },
      { anio: '2023', guia: 'BPA ajustado 6,25-6,37 USD', real: '6,01 USD (+11,0 % sin divisa)', cumplida: 'Parcial' },
      { anio: '2024', guia: 'BPA ajustado 6,32-6,44 USD (6,43-6,55 sin divisa)', real: '6,57 USD', cumplida: 'Sí' },
      { anio: '2025', guia: 'BPA ajustado 7,04-7,17 USD (7,26-7,39 sin divisa)', real: '7,54 USD', cumplida: 'Sí' },
      { anio: '2024-2026', guia: 'Objetivos trienales de resultado operativo y BPA', real: 'Alcanzados en dos años según la empresa', cumplida: 'Sí' },
    ],
    comentario: 'Equipo estable y de la casa: Olczak lleva 33 años en PMI y el nuevo director financiero, 18 [1, 5]. La guía en divisa local se cumple siempre; en USD falló en 2022-2023 por la divisa y Rusia [8]. El relevo del director financiero (Babeau, tras seis años, sigue de asesor hasta marzo de 2027) es ordenado [5, 9]. Riesgo: la unidad de EE. UU., que concentra la apuesta de crecimiento, ha incumplido sus expectativas en 2026 [6].',
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      { nombre: 'André Calantzopoulos', cargo: 'Presidente', tipo: 'Otro externo', desde: '2013', comisiones: 'Ciencia y tecnología' },
      { nombre: 'Jacek Olczak', cargo: 'Consejero delegado', tipo: 'Ejecutivo', desde: '2021', comisiones: 'Ciencia y tecnología' },
      { nombre: 'Lisa A. Hook', cargo: 'Consejera independiente coordinadora', tipo: 'Independiente', desde: '2018', comisiones: 'Auditoría y riesgos; Remuneración; Nombramientos; Ciencia y tecnología' },
      { nombre: 'Michel Combes', cargo: 'Consejero', tipo: 'Independiente', desde: '2020', comisiones: 'Auditoría y riesgos (presidente); Nombramientos' },
      { nombre: 'Werner Geissler', cargo: 'Consejero', tipo: 'Independiente', desde: '2015', comisiones: 'Remuneración (presidente); Auditoría y riesgos; Nombramientos' },
      { nombre: 'Kalpana Morparia', cargo: 'Consejera', tipo: 'Independiente', desde: '2011', comisiones: 'Nombramientos (presidenta); Remuneración; Ciencia y tecnología' },
      { nombre: 'Robert B. Polet', cargo: 'Consejero', tipo: 'Independiente', desde: '2011', comisiones: 'Remuneración; Ciencia y tecnología' },
      { nombre: 'Victoria Harker', cargo: 'Consejera', tipo: 'Independiente', desde: '2024', comisiones: 'Auditoría y riesgos' },
      { nombre: 'Bonin Bough', cargo: 'Consejero', tipo: 'Independiente', desde: '2021', comisiones: 'Auditoría y riesgos; Ciencia y tecnología' },
      { nombre: 'Shlomo Yanai', cargo: 'Consejero', tipo: 'Independiente', desde: '2021', comisiones: 'Remuneración; Ciencia y tecnología' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: true, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 92.3, voto_remuneracion_contra_pct: 7.1, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 29.07, fijo: 1.81, variable_corto: 5.22, variable_largo: 18.03, ratio_salario_medio: 672 },
    remuneracion: 'El consejero delegado cobró 29,1 M USD en 2025 (20,2 M en 2024): 1,8 M de fijo, 5,2 M de variable anual, 18,0 M en acciones y 4,0 M de pensión [1]. El 60 % de las acciones son PSU a tres años ligadas al TSR frente a un grupo de comparables (40 %), al crecimiento del BPA sin divisa y a métricas de transformación hacia los productos sin humo; el variable anual mide ingresos, resultado operativo ajustado y flujo de caja, con un modificador que penaliza si el crecimiento en USD queda muy por debajo del de divisa local [1]. Ratio frente al empleado mediano: 672 a 1 sin ajuste de poder adquisitivo [1]. El voto en contra más alto de las tres últimas juntas fue del 7,1 % (2024) [4, 3, 2].',
    accionistas: [
      { nombre: 'The Vanguard Group', pct: 8.57, tipo: 'Gestora indexada', variacion: 'Estable (13G)' },
      { nombre: 'Capital World Investors', pct: 8.17, tipo: 'Gestora activa', variacion: 'n.d.' },
      { nombre: 'Capital International Investors', pct: 6.61, tipo: 'Gestora activa', variacion: 'n.d.' },
      { nombre: 'BlackRock', pct: 6.22, tipo: 'Gestora indexada', variacion: 'Estable (13G)' },
      { nombre: 'Consejeros y directivos (17)', pct: 0.13, tipo: 'Insiders', variacion: 'Ventas de 28,8 M USD en feb-2026' },
    ],
    insiders: [
      { fecha: '2026-02-19', persona: 'Jacek Olczak (CEO)', operacion: 'Venta', acciones: 80000, importe: 14.57 },
      { fecha: '2026-02-19', persona: 'Emmanuel Babeau (CFO)', operacion: 'Venta', acciones: 33800, importe: 6.14 },
      { fecha: '2026-02-19', persona: 'Frederic de Wilde (CEO International)', operacion: 'Venta', acciones: 20000, importe: 3.65 },
      { fecha: '2026-02-20', persona: 'Stacey Kennedy (CEO U.S.)', operacion: 'Venta', acciones: 14350, importe: 2.63 },
      { fecha: '2026-02-20', persona: 'Reginaldo Dobrowolski (Controller)', operacion: 'Venta', acciones: 6000, importe: 1.10 },
      { fecha: '2026-02-19', persona: 'Yann Guerin (Legal)', operacion: 'Venta', acciones: 4000, importe: 0.73 },
    ],
    control_y_defensas: 'Sin accionista de control: los cuatro mayores son gestoras (Vanguard 8,6 %, Capital World 8,2 %, Capital International 6,6 %, BlackRock 6,2 %) [1]. Una acción, un voto; sociedad de Virginia; consejo elegido cada año por mayoría; todos los consejeros salvo el presidente y el consejero delegado son independientes, con una consejera coordinadora con poderes amplios [1]. El presidente es el anterior consejero delegado (no ejecutivo desde 2024), lo que resta algo de independencia al consejo [1]. Sin operaciones vinculadas relevantes con consejeros; las ventas a Megapolis (participada) y a socios en Egipto e India se declaran como vinculadas en las cuentas [1].',
    alertas: [
      'Ventas de seis directivos por 28,8 M USD el 19-20 de febrero de 2026 a 181-184 USD, sin plan 10b5-1 y sin ninguna compra en 12 meses [7]. Coinciden con la entrega anual de acciones y la ventana tras resultados; el CEO conserva ≈ 500.800 acciones [1].',
      'Cambio de director financiero (1-ago-2026) en un año de presión en EE. UU. [5].',
    ],
    confianza: 'Alta',
  },
  huecos: [],
  fuentes: fC,
};
guarda('C', C_);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de PM, SPY y XLP (precio, rango, rentabilidades, beta, cierres de ejercicio): herramientas/bolsa.mjs', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/PM/history/' },
  { id: 2, titulo: 'Consenso de PM (BPA 2026-2027, ventas, recomendaciones y precio objetivo) y de los comparables: quoteSummary', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/PM/analysis/' },
  { id: 3, titulo: 'Philip Morris International: estimaciones 2026-2028 (ventas, EBITDA, EBIT, beneficio, BPA, dividendo)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://www.marketscreener.com/quote/stock/PHILIP-MORRIS-INTERNATION-2836703/finances/' },
  { id: 4, titulo: 'Daily Treasury Par Yield Curve Rates 2026 (10 años: 5,15 % el 19-oct-2026)', editor: 'U.S. Department of the Treasury', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve' },
  { id: 5, titulo: 'Implied Equity Risk Premium by month (ERPbymonth.xlsx; oct-2026: 4,20 %)', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 6, titulo: 'Form 10-Q del 2T26: balance a 30-jun-2026, deuda, participaciones, acciones en circulación', editor: 'Philip Morris International Inc. (SEC)', tipo: 'Primaria', fecha: '2026-07-24', url: `${E}/000162828026049493/pm-20260630.htm` },
  { id: 7, titulo: 'Notas de resultados anuales 2017-2025 (BPA ajustado de cada año)', editor: 'Philip Morris International Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-02-06', url: `${E}/000162828026005932/earningsreleasepm-ex991xq4.htm` },
  { id: 8, titulo: 'Tipos de cambio GBP, JPY, KRW, INR y DKK frente al USD (19-20 oct-2026)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/GBPUSD=X/' },
  { id: 9, titulo: 'JT Group acquires Vector Group for 2.4 billion in cash', editor: 'Inside Arbitrage', tipo: 'Prensa', fecha: '2024-08-21', url: 'https://www.insidearbitrage.com/2024/08/jt-group-acquires-vector-group-for-2-4-billion-in-cash/' },
  { id: 10, titulo: 'Form 10-K de 2025: Swedish Match, acuerdo con Altria, pensiones', editor: 'Philip Morris International Inc. (SEC)', tipo: 'Primaria', fecha: '2026-02-06', url: `${E}/000162828026005939/pm-20251231.htm` },
  { id: 11, titulo: 'Movimiento del precio (1-12 meses, máximos, media de 200, tendencia): herramientas/movimiento.mjs PM', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/PM/' },
  { id: 12, titulo: 'Philip Morris International to Host Webcast of 2026 Third-Quarter and First Nine-Months Results (21-oct-2026, 7:00 ET)', editor: 'Business Wire (vía Finviz)', tipo: 'Primaria', fecha: '2026-10-14', url: 'https://finviz.com/news/402345/philip-morris-international-to-host-webcast-of-2026-third-quarter-and-first-nine-months-results' },
  { id: 13, titulo: 'Why Philip Morris (PM) stock is up today (11-may-2026: guía de la FDA)', editor: 'StockStory', tipo: 'Prensa', fecha: '2026-05-11', url: 'https://stockstory.org/us/stocks/nyse/pm/news/why-up-down/why-philip-morris-pm-stock-is-up-today-2' },
  { id: 14, titulo: 'FDA nicotine pouch review delay report knocks tobacco shares lower (1-abr-2026)', editor: '2Firsts', tipo: 'Prensa', fecha: '2026-04-01', url: 'https://www.2firsts.com/news/fda-nicotine-pouch-review-delay-report-knocks-tobacco-shares-lower' },
  { id: 15, titulo: 'Titulares de PM de los últimos 12 meses (herramientas/noticias.mjs: Google Noticias, Yahoo y 8-K de la SEC)', editor: 'Rastreador del repositorio', tipo: 'Prensa', fecha: '2026-10-20', url: 'https://news.google.com/search?q=Philip%20Morris%20International' },
  { id: 16, titulo: 'Seeking Alpha: titulares de PM (rebaja de recomendación del 4-sep-2026, avance del 3T «Competition Heating Up»)', editor: 'Seeking Alpha (RSS)', tipo: 'Prensa', fecha: '2026-10-19', url: 'https://seekingalpha.com/symbol/PM' },
  { id: 17, titulo: 'PMI Reports 2026 First-Quarter Results y 2025 Fourth-Quarter Results', editor: 'Philip Morris International Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-04-22', url: `${E}/000162828026026385/earningsreleasepm-ex991xq1.htm` },
  { id: 18, titulo: 'PMI Reports 2026 Second-Quarter Results', editor: 'Philip Morris International Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-07-22', url: `${E}/000162828026049107/earningsreleasepm-ex991xq2.htm` },
];
const PM = Y.PM;
// Comparables en USD (tipos de cambio [8]); PER de los próximos 12 meses = precio ÷ (2,4/12 del BPA del ejercicio en curso
// + 9,6/12 del siguiente) del consenso de Yahoo [2]; Imperial (sep) e ITC (mar) ponderan sus ejercicios por los meses que caen.
const precioLocal = { 'MO': 75.32, 'BATS.L': 44.02, 'IMB.L': 28.26, '2914.T': 7518, '033780.KS': 194000, 'ITC.NS': 260.8, 'TPB': 63.98, 'STG.CO': 78.6 };
const bpaNtm = {
  'MO': 0.2 * 5.677 + 0.8 * 5.864, 'BATS.L': 0.2 * 3.647 + 0.8 * 3.868, 'IMB.L': (1 / 12) * 3.355 + (11 / 12) * 3.686, '2914.T': 0.2 * 368.4 + 0.8 * 410.7,
  '033780.KS': 0.2 * 12829 + 0.8 * 14006, 'ITC.NS': (5 / 12) * 14.50 + (7 / 12) * 16.83, 'TPB': 0.2 * 1.757 + 0.8 * 2.247, 'STG.CO': 0.2 * 9.942 + 0.8 * 10.105,
};
const crec = { 'MO': 0.8, 'BATS.L': 3.6, 'IMB.L': 1.7, '2914.T': 4.2, '033780.KS': 5.5, 'ITC.NS': 8.9, 'TPB': 12.7, 'STG.CO': -1.4 };
const compEmp = (nombre, ticker, pais, t) => {
  const d = C.datos[t]; const cap = usd(t, d.cap); const ev = usd(t, d.ev); const eb = usd(t, d.ebitda);
  return { nombre, ticker, pais, capitalizacion: cap, ev_ventas: r2(ev / usd(t, d.ventas)), ev_ebitda_ltm: r1(ev / eb), ev_ebitda_ntm: null, per_ntm: r1(precioLocal[t] / bpaNtm[t]), crecimiento_pct: crec[t], margen_ebitda_pct: r1(d.margen_ebitda * 100), roic_pct: null, dn_ebitda: r1((usd(t, d.deuda) - usd(t, d.caja)) / eb), fcf_yield_pct: d.fcf == null ? null : r1(usd(t, d.fcf) / cap * 100) };
};
const D_ = {
  _estado: 'Completa. Precio del 19-oct-2026 (la sesión del 20-oct abrió a las 13:30 UTC y no había cerrado). Consenso de Yahoo (BPA ajustado) y MarketScreener (ventas y EBITDA a 3 años; su BPA es el publicado). Comparables con datos de Yahoo convertidos a USD; EV/EBITDA de los próximos 12 meses no disponible gratis para los comparables.',
  identificacion: {
    nombre: 'Philip Morris International Inc.', nombre_corto: 'Philip Morris', ticker: 'PM', isin: 'US7181721090', mercado: 'New York Stock Exchange', indice_referencia: 'S&P 500',
    pais: 'Estados Unidos (sede operativa en Lausana, Suiza)', pais_iso: 'US', sector: 'Consumo básico', industria: 'Tabaco', sede: 'Stamford, Connecticut (EE. UU.)', fundacion: '1847', empleados: 84900, web: 'https://www.pmi.com',
    precio: B.identificacion.precio, fecha_precio: B.identificacion.fecha_precio, acciones: 1559.0, capitalizacion_publicada: Math.round(PM.cap / 1e6), free_float_pct: 99.9,
    max_52s: B.identificacion.max_52s, min_52s: B.identificacion.min_52s, volumen_medio_diario: '≈ 899 M USD/día (4,7 M de acciones; 3 meses)', proximos_resultados: '2026-10-21',
  },
  consenso: {
    guidance: 'Guía 2026 (subida el 8-sep-2026 solo por divisa): BPA ajustado de 8,35-8,50 USD (+10,7-12,7 %; +7,5-9,5 % sin divisa), ingresos orgánicos +5-7 %, resultado operativo orgánico +7-9 %, volumen total estable o algo al alza (cigarrillos −2-3 %, sin humo +alto un dígito), flujo operativo ≈ 13.500 M, inversión 1.400-1.600 M, deuda neta ≈ 2,0 veces el EBITDA a final de año y sin recompras; 3T26 de 2,29-2,34 USD [18]. Objetivos 2026-2028 (CAGNY, 18-feb-2026): ingresos orgánicos +6-8 % anual, resultado operativo +8-10 % y BPA ajustado sin divisa +9-11 % [7].',
    estimaciones: [
      { periodo: '2026e', ingresos: 43573, ebitda: 19641, ebit: 17982, bpa: 8.41, dpa: 6.07, fuente: 'Yahoo (BPA ajustado, 12 analistas) [2]; MarketScreener (ventas, EBITDA, EBIT y dividendo) [3]' },
      { periodo: '2027e', ingresos: 45910, ebitda: 21350, ebit: 19336, bpa: 9.18, dpa: 6.40, fuente: 'Yahoo (BPA ajustado, 14 analistas) [2]; MarketScreener [3]' },
      { periodo: '2028e', ingresos: 48519, ebitda: 22587, ebit: 20635, bpa: null, dpa: 6.79, fuente: 'MarketScreener [3]; su BPA de 9,60 USD es el publicado (con amortizaciones), no el ajustado' },
    ],
    recomendaciones: { n_analistas: 15, comprar: 11, mantener: 4, vender: 0, po_medio: r2(PM.po_medio), po_min: PM.po_min, po_max: PM.po_max },
    revisiones: 'El BPA ajustado de 2026 apenas se ha movido: 8,39 USD hace 90 días y 8,41 hoy; el de 2027, de 9,14 a 9,18 [2]. Las revisiones de la guía en 2026 fueron solo por divisa: de 8,38-8,53 en febrero a 8,31-8,46 en junio (también por el deterioro de RBH en el publicado), 8,26-8,41 en julio y 8,35-8,50 en septiembre [18]. El 3T: el consenso espera 2,32 USD frente a 2,43 hace 90 días, recorte que sigue al aviso de más inversión en EE. UU. en el 2S [2, 18]. Objetivos: UBS subió a 193 USD (neutral) el 23-sep-2026 [15].',
    base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: 0.6,
    confianza: 'Media',
  },
  bolsa: {
    ...B.bolsa,
    posicion_corta_pct: null,
    comentario: 'La acción ha subido un 31,7 % en un año con dividendos frente al 15,4 % del S&P 500 y el 12,5 % del consumo básico (XLP), y un 34,9 % anual a tres años [1]. Lo explican tres cosas: el BPA ajustado crece a doble dígito (+14,8 % en 2025, +15,6 % en el 1S26), el paso de IQOS a primera marca en sus mercados y la búsqueda de defensivas cuando el mercado rota fuera de la tecnología (octubre de 2026) [17, 18, 16]. El PER adelantado ha pasado de ≈ 14 veces a final de 2023 a 22 veces: casi toda la subida desde 2024 es expansión del múltiplo. La caída máxima de cinco años es del −22,8 % (feb-sep 2022, Rusia y divisa) [1].',
    contexto: {
      movimiento: { fecha: '2026-10-20', var_1m_pct: 8.2, var_3m_pct: 4.4, var_6m_pct: 32.3, var_12m_pct: 28.3, dist_max_52s_pct: -1.4, dist_min_52s_pct: 40.5, dist_max_historico_pct: -1.4, tendencia: 'alcista', volatilidad_60d_pct: 24.3, avisos: [] },
      movimientos_fuertes: [
        { periodo: 'dic-2025 a ene-2026', var_pct: 10.3, causa: 'Rotación hacia defensivas y la expectativa de los objetivos 2026-2028; sin noticia concreta de la empresa [15].', veredicto: 'no cambia', condicion: null },
        { periodo: 'ene-feb 2026', var_pct: 12.2, causa: 'Resultados de 2025 (BPA ajustado 7,54 USD, +14,8 %) y objetivos 2026-2028 (6-feb-2026) [7].', veredicto: 'no cambia', condicion: null },
        { periodo: 'feb-abr 2026', var_pct: -11.6, causa: 'Tensión en Oriente Medio y petróleo (5-mar, −5,2 %) y, el 1-abr (−4,8 %), Reuters informa de retrasos de la FDA en las solicitudes de bolsas de nicotina (ZYN y Velo) el mismo día que sube el impuesto del calentado en Japón [13, 14].', veredicto: 'no cambia', condicion: null },
        { periodo: 'abr-may 2026', var_pct: 13.5, causa: 'Resultados del 1T26 (+7,0 % el 22-abr) y guía de la FDA del 8-may-2026 que no perseguirá productos con solicitudes avanzadas (+6,5 % el 11-may) [17, 13].', veredicto: 'no cambia', condicion: null },
        { periodo: 'jun-jul 2026', var_pct: 12.2, causa: 'Declaración de riesgo reducido de la FDA para ZYN (30-jun) y resultados del 2T26 por encima de la guía (22-jul) [18].', veredicto: 'no cambia', condicion: null },
      ],
      noticias: [
        { fecha: '2026-10-21', tipo: 'resultados', hecho: 'Resultados del 3T26 antes de la apertura; guía de 2,29-2,34 USD y consenso de 2,32 [12, 2].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-09-23', tipo: 'recomendación', hecho: 'UBS sube su objetivo de 182 a 193 USD con recomendación neutral; el 4-sep un análisis de Seeking Alpha rebaja a mantener por valoración [15, 16].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-09-18', tipo: 'resultados', hecho: 'Dividendo +8,8 % a 6,40 USD anuales [7].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-08-24', tipo: 'fusión u oferta', hecho: 'Acuerdo de fabricación de cigarrillos para Altria fuera de EE. UU. desde 2027; sin efecto material en 2026 [10].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-06-02', tipo: 'demanda o regulador', hecho: 'Deterioro de 511 M USD de la participación en RBH (Canadá) tras el nuevo plan de negocio; sin salida de caja [18].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-06-10', tipo: 'demanda o regulador', hecho: 'Italia multa a PMI con 7 M EUR por la publicidad «sin humo» [15].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-05-20', tipo: 'directivos', hecho: 'Massimo Andolina sustituye a Emmanuel Babeau como director financiero desde el 1-ago-2026 [6].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-02-19', tipo: 'directivos', hecho: 'Seis directivos venden 28,8 M USD (CEO 14,6 M) a 181-184 USD tras la entrega anual de acciones, sin plan 10b5-1 [15].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-04-01', tipo: 'demanda o regulador', hecho: 'Reuters: retrasos en la revisión acelerada de la FDA de bolsas de nicotina (ZYN, Velo); PM −4,8 % [14].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-12', tipo: 'demanda o regulador', hecho: 'Indonesia (≈ 29 % de la plantilla de PMI) estudia restringir sabores en tabaco y nicotina [16].', veredicto: 'no cambia', condicion: null },
      ],
      proximos_resultados: '2026-10-21',
      veredicto: 'no cambia',
      condicion: null,
      comentario: 'La acción cotiza a un 1,4 % de su máximo histórico, 12,5 % por encima de la media de 200 sesiones y en tendencia alcista, sin avisos P1-P5 [11]. Las subidas y bajadas de más de un 10 % en un mes tienen causa conocida (resultados, FDA, Oriente Medio) y ninguna contradice la tesis. No hay colocaciones, ampliaciones ni decisiones regulatorias con fecha que puedan mover el precio más de un 5 % en contra, salvo los resultados de mañana, que por la regla 11 no retrasan. Las ventas de directivos de febrero coinciden con la entrega anual de acciones y no se repitieron. Veredicto: no cambia.',
    },
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: B.cierres_ejercicio.filter((c) => +c.anio >= 2020).map((c) => ({ anio: c.anio, precio_cierre: c.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    comentario: null,
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Las grandes tabaqueras cotizadas con negocio de cigarrillos y productos nuevos (BAT, Altria, Japan Tobacco, Imperial, KT&G, ITC) más dos pequeñas de nicotina oral y cigarros (Turning Point, Scandinavian Tobacco). No hay comparable puro de PMI: ninguna tiene su peso en productos sin humo (42 % de los ingresos). ITC es conglomerado (hoteles y alimentación) y Turning Point cotiza con prima de crecimiento por sus bolsas; se dejan y se explica su efecto en la mediana.',
    empresas: [
      compEmp('Altria', 'MO', 'US', 'MO'),
      compEmp('British American Tobacco', 'BATS', 'GB', 'BATS.L'),
      compEmp('Imperial Brands', 'IMB', 'GB', 'IMB.L'),
      compEmp('Japan Tobacco', '2914', 'JP', '2914.T'),
      compEmp('KT&G', '033780', 'KR', '033780.KS'),
      compEmp('ITC', 'ITC', 'IN', 'ITC.NS'),
      compEmp('Turning Point Brands', 'TPB', 'US', 'TPB'),
      compEmp('Scandinavian Tobacco Group', 'STG', 'DK', 'STG.CO'),
    ],
    comentario: null,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2022-11', objetivo: 'Swedish Match', comprador: 'Philip Morris International', ev: 16000, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Oferta en efectivo de 116 SEK por acción tras una primera de 106; ≈ 16.000 M USD [10].' },
      { fecha: '2024-08', objetivo: 'Vector Group', comprador: 'Japan Tobacco', ev: 2400, ev_ventas: null, ev_ebitda: null, prima_pct: 7.2, excluir: false, comentario: '15 USD por acción en efectivo; Vector cotizaba a 8,4 veces su EBITDA antes de la oferta [9].' },
      { fecha: '2024-04', objetivo: 'Derechos de IQOS en EE. UU.', comprador: 'Philip Morris International (a Altria)', ev: 2777, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: true, comentario: 'Compra de derechos comerciales, no de una empresa: sin múltiplo [10].' },
    ],
    comentario: null,
    confianza: 'Baja',
  },
  huecos: [
    { seccion: 'transacciones', campo: 'múltiplos pagados', tipo: 'Complemento', intentos: '1) 10-K de PMI 2022-2025: precio de Swedish Match sin EBITDA del objetivo; 2) búsqueda de EV/EBITDA de Swedish Match y Vector: solo valor de la operación y múltiplo previo de Vector; 3) folletos de las ofertas: no leídos', decision: 'Omitido (transacciones sin peso en la valoración)' },
    { seccion: 'bolsa', campo: 'posicion_corta_pct', tipo: 'Complemento', intentos: '1) Yahoo quoteSummary: sin dato para PM; 2) MarketBeat: no abrió la ficha; 3) NYSE: de pago', decision: 'Omitido' },
  ],
  fuentes: fD,
};
guarda('D', D_);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Stocktwits: mensajes sobre $PM (29-sep a 20-oct-2026)', editor: 'Stocktwits (API pública)', tipo: 'Foros y redes', fecha: '2026-10-20', url: 'https://stocktwits.com/symbol/PM' },
  { id: 2, titulo: 'Seeking Alpha: titulares y artículos de opinión sobre PM (ago-oct 2026)', editor: 'Seeking Alpha (RSS)', tipo: 'Foros y redes', fecha: '2026-10-19', url: 'https://seekingalpha.com/symbol/PM' },
  { id: 3, titulo: 'Philip Morris (PM) Stock Looks Richly Valued After $16b Smoke Free Push y otros titulares de octubre', editor: 'Yahoo Finance (agregado por herramientas/noticias.mjs)', tipo: 'Foros y redes', fecha: '2026-10-13', url: 'https://finance.yahoo.com/quote/PM/news/' },
];
const E_ = {
  _estado: 'Completa con tres sitios (Reddit y foros con comentarios dan 403 desde aquí).',
  sentimiento: {
    tono: 'Positivo', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Stocktwits ($PM)', fecha: '2026-10', n_comentarios: 30, tono: 'Positivo', resumen: 'Euforia de particulares: «máximos de 52 semanas», «ruptura hacia 215», tabaco como refugio frente a los chips; alguna pregunta por la caída del 15-oct y quien teme vender antes de que siga subiendo [1].' },
      { plataforma: 'Seeking Alpha (análisis)', fecha: '2026-10', n_comentarios: 20, tono: 'Dividido', resumen: 'Mayoría de artículos favorables por dividendo y crecimiento («safe harbor ahead of Q3»), con una rebaja por valoración en septiembre y avisos de «competencia al alza» en ZYN y de prohibiciones generacionales en Europa [2].' },
      { plataforma: 'Prensa con comentarios (Yahoo Finance)', fecha: '2026-10', n_comentarios: 10, tono: 'Neutro', resumen: 'El titular dominante de octubre es que la acción «parece cara» tras invertir 16.000 M USD en productos sin humo [3].' },
    ],
    temas: [
      { tema: 'Valoración exigente', postura: 'Dividida', peso: 'Alto', contraste: 'Los datos dan la razón a los prudentes: PER de 22 veces el BPA de 2027 frente a una mediana histórica de 16 y un DCF por debajo del precio [3].' },
      { tema: 'ZYN frente a los rivales en EE. UU.', postura: 'Bajista', peso: 'Medio', contraste: 'Cierto: ventas al consumidor planas en el 2T26 en una categoría que crece [2].' },
      { tema: 'Dividendo creciente y defensiva', postura: 'Alcista', peso: 'Alto', contraste: 'Dividendo de 6,40 USD (+8,8 %), 3,2 % de rentabilidad; payout del 75 % del BPA ajustado [1, 2].' },
      { tema: 'Rotación desde la tecnología', postura: 'Alcista', peso: 'Medio', contraste: 'Explica parte de la subida de octubre; no es un motivo de negocio [1].' },
    ],
    lectura: 'El sentimiento es claramente positivo, rozando la euforia entre los particulares (máximos históricos, opciones con +250 %), mientras que los analistas de Seeking Alpha y la prensa empiezan a hablar de valoración exigente. Coincide con el consenso de bancos (11 de 15 recomiendan comprar) y va contra lo que dicen nuestros números a 12 meses. Un sentimiento así, a un 1,4 % del máximo y antes de los resultados, aumenta el riesgo de decepción si ZYN vuelve a flojear. No cambia la decisión.',
    confianza: 'Media',
  },
  huecos: [],
  fuentes: fE,
};
guarda('E', E_);
console.log('Notas A-E escritas.');
