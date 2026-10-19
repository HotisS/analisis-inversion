// Escribe las notas A-E de d'Alba Global Co., Ltd. (483650.KS, KOSPI; corte 2026-10-19, cierre del 19-oct en Seúl).
// Fuentes primarias: DART (dart.fss.or.kr, visor de secciones, que SÍ respondió desde este entorno): informe anual (사업보고서)
// de 2025 corregido (rcp 20260407001978) y original (20260323000282), informe semestral de 2026 (20260814001262), folleto de la
// salida a bolsa (증권신고서, 20250508000654), informe de auditoría consolidado de 2023 reemitido (20241210000517, con 2022
// comparativo) y avisos sueltos (dividendos, bloqueos, recompras, junta extraordinaria, participaciones, plan de valor). Web de
// inversores de la empresa (dalbaglobal.com): informes de negocio trimestrales de 2025, IR Books 2Q25-2Q26 y presentaciones de
// resultados 4Q25-2Q26. Consenso y objetivos: FnGuide (Naver WiseReport). Bolsa y comparables: Yahoo Finance. Foro de Naver.
// Cada nota cita solo con [n] de su propia lista. Ejecutar: node informes/dalba-2026-10-19/notas/construir-notas.mjs
// Ejercicio natural (31-dic). Cifras en millones de KRW salvo que se diga otra cosa.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const W = 'https://www.dalbaglobal.com/_upload_files';
const DART = (rcp) => `https://dart.fss.or.kr/dsaf001/main.do?rcpNo=${rcp}`;
const bolsa = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const compsRaw = JSON.parse(fs.readFileSync(path.join(dir, 'comparables-yahoo-raw.json'), 'utf8'));
const USDKRW = 1329.13; // Yahoo KRW=X, 19-oct-2026
const JPYKRW = 8.376; // Yahoo JPYKRW=X, 19-oct-2026

// ================================================================ A. Cuentas
const fA = [
  { id: 1, titulo: '사업보고서 2025 (informe anual, corregido): estados consolidados K-IFRS de 2025, 2024 y 2023 auditados por EY Hanyoung, notas, ventas por producto y canal, dividendos, consejo y remuneración', editor: "d'Alba Global / DART (FSS)", tipo: 'Primaria', fecha: '2026-04-07', url: DART('20260407001978') },
  { id: 2, titulo: '사업보고서 2025 (versión original): cuenta de resultados consolidada de tres ejercicios y nota de ingresos y gastos financieros', editor: "d'Alba Global / DART (FSS)", tipo: 'Primaria', fecha: '2026-03-23', url: DART('20260323000282') },
  { id: 3, titulo: '반기보고서 2026 (informe semestral, revisión limitada): estados consolidados a 30-jun-2026, 2T26 y 1S26, ventas por canal y producto, accionistas y autocartera', editor: "d'Alba Global / DART (FSS)", tipo: 'Primaria', fecha: '2026-08-14', url: DART('20260814001262') },
  { id: 4, titulo: 'Informe de auditoría consolidado de 2023 (reemitido): estados de 2023 y 2022 (comparativo) con notas', editor: "d'Alba Global / DART (FSS)", tipo: 'Primaria', fecha: '2024-12-10', url: DART('20241210000517') },
  { id: 5, titulo: '증권신고서 (folleto de la salida a bolsa): cuentas 2022-2024, riesgos, accionistas, bloqueos y valoración por PER de comparables', editor: "d'Alba Global / DART (FSS)", tipo: 'Primaria', fecha: '2025-05-08', url: DART('20250508000654') },
  { id: 6, titulo: 'Earnings Release 2Q26 (inglés): cuenta del trimestre, gastos de marketing, ventas por región y canal, tiendas físicas fuera de Corea', editor: "d'Alba Global", tipo: 'Primaria', fecha: '2026-08-13', url: `${W}/20260813102909_85.pdf` },
  { id: 7, titulo: 'Earnings Release 1Q26 (inglés): resultados del 1T26 y canales', editor: "d'Alba Global", tipo: 'Primaria', fecha: '2026-05-12', url: `${W}/20260512100625_QM.pdf` },
  { id: 8, titulo: '2025년 4분기 실적발표 (resultados del 4T25 y de 2025, coreano)', editor: "d'Alba Global", tipo: 'Primaria', fecha: '2026-02-20', url: `${W}/20260220122012_Ap.pdf` },
  { id: 9, titulo: 'IR Book 2Q26 (inglés): visión 2027-2028 (1 billón de ventas en 2027, 70 % fuera, margen operativo del 25 % en 2028), trimestres desde 1T24', editor: "d'Alba Global", tipo: 'Primaria', fecha: '2026-08-18', url: `${W}/20260818150934_0x.pdf` },
  { id: 10, titulo: 'Business Report 3Q25 (informe trimestral de negocio): 3T25 y 9M25', editor: "d'Alba Global", tipo: 'Primaria', fecha: '2025-11-14', url: `${W}/20251120165645_qR.pdf` },
  { id: 11, titulo: '현금ㆍ현물 배당 결정 (dividendo a cuenta de 2.226 KRW, 18-nov-2025; complementario de 403 KRW, 26-feb-2026)', editor: "d'Alba Global / DART (KRX)", tipo: 'Primaria', fecha: '2026-02-26', url: DART('20260226800556') },
  { id: 12, titulo: 'Consenso trimestral y anual (3T25-2T26 reales con BPA básico por trimestre)', editor: 'FnGuide (Naver WiseReport)', tipo: 'Analistas', fecha: '2026-10-16', url: 'https://navercomp.wisereport.co.kr/v2/company/c1050001.aspx?cmp_cd=483650' },
  { id: 13, titulo: '잘나가던 달바글로벌 \'삐끗\'…결국 미스트에 발목 잡히나 (3T25 por debajo de lo esperado)', editor: 'The Fact', tipo: 'Prensa', fecha: '2025-11-06', url: 'https://news.tf.co.kr/read/economy/2254663.htm' },
  { id: 14, titulo: "d'Alba Global (483650) Q2 2026 earnings summary (guía del 3T26 de 170.000 M y 21 % de margen; guía anual de 725.000 M)", editor: 'Quartr', tipo: 'Analistas', fecha: '2026-08-14', url: 'https://quartr.com/events/d-alba-global-co-ltd-483650-q2-2026_F1i5PCnm' },
];

// Cuenta por función (K-IFRS). EBITDA = beneficio operativo + amortización (depreciación del inmovilizado y del derecho de uso
// más intangibles, de la nota de flujos). resultado_financiero = BAI − beneficio operativo (ingresos y gastos financieros y otros).
// El resultado financiero de 2022-2024 es negativo por la valoración a mercado de las acciones preferentes rescatables y
// convertibles (RCPS), que se convirtieron antes de la salida a bolsa. BPA diluido publicado (ajustado por el desdoblamiento);
// acciones diluidas = beneficio ÷ BPA diluido. DPA del ejercicio: 2025 = 2.226 a cuenta + 403 complementario.
const cuenta = [
  { periodo: '2022', ingresos: 145205, coste_ventas: 39733, gastos_generales: 90856, ebitda: 14820, amortizaciones: 204, ebit: 14616, resultado_financiero: -10604, bai: 4012, impuestos: 3121, minoritarios: 0, beneficio_neto: 891, gastos_financieros: 11032, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 103, dpa: null, dpa_extraordinario: 0, acciones_diluidas: 8.65 },
  { periodo: '2023', ingresos: 200802, coste_ventas: 53939, gastos_generales: 114418, ebitda: 32872, amortizaciones: 426, ebit: 32446, resultado_financiero: -17125, bai: 15321, impuestos: 1716, minoritarios: 0, beneficio_neto: 13605, gastos_financieros: 18357, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 1526, dpa: 267, dpa_extraordinario: 0, acciones_diluidas: 8.92 },
  { periodo: '2024', ingresos: 309063, coste_ventas: 74686, gastos_generales: 174532, ebitda: 60574, amortizaciones: 729, ebit: 59845, resultado_financiero: -30780, bai: 29065, impuestos: 13656, minoritarios: 0, beneficio_neto: 15409, gastos_financieros: 36660, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 1445, dpa: 305, dpa_extraordinario: 0, acciones_diluidas: 10.66 },
  { periodo: '2025', ingresos: 519735, coste_ventas: 125306, gastos_generales: 292960, ebitda: 102841, amortizaciones: 1372, ebit: 101469, resultado_financiero: 1459, bai: 102928, impuestos: 23875, minoritarios: 0, beneficio_neto: 79054, gastos_financieros: 6293, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 6315, dpa: 2629, dpa_extraordinario: 0, acciones_diluidas: 12.52 },
];
// Balance. caja = efectivo + otros activos financieros a corto (depósitos). deuda_financiera = RCPS (pasivo financiero) en
// 2022-2023; sin préstamos desde 2024. Sin fondo de comercio.
const balanceHist = [
  { periodo: '2022', activo_total: 39356, activo_corriente: 36368, pasivo_corriente: 34281, pasivo_total: 37664, fondo_comercio: 0, intangibles: 81, inmovilizado_material: 480, existencias: 7162, clientes: 8613, proveedores: 4240, activos_contrato: null, pasivos_contrato: null, caja: 19701, deuda_financiera: 21983, arrendamientos: 1281, patrimonio_neto: 1692, minoritarios: 0, reservas: -3765 },
  { periodo: '2023', activo_total: 78004, activo_corriente: 73535, pasivo_corriente: 56038, pasivo_total: 62490, fondo_comercio: 0, intangibles: 81, inmovilizado_material: 481, existencias: 16966, clientes: 13724, proveedores: 6493, activos_contrato: null, pasivos_contrato: null, caja: 41317, deuda_financiera: 38878, arrendamientos: 1433, patrimonio_neto: 15514, minoritarios: 0, reservas: 13057 },
  { periodo: '2024', activo_total: 136108, activo_corriente: 128309, pasivo_corriente: 31320, pasivo_total: 34039, fondo_comercio: 0, intangibles: 362, inmovilizado_material: 1130, existencias: 47900, clientes: 20123, proveedores: 7969, activos_contrato: null, pasivos_contrato: null, caja: 54003, deuda_financiera: 0, arrendamientos: 2819, patrimonio_neto: 102069, minoritarios: 0, reservas: 25802 },
  { periodo: '2025', activo_total: 255335, activo_corriente: 239110, pasivo_corriente: 53587, pasivo_total: 56780, fondo_comercio: 0, intangibles: 377, inmovilizado_material: 1151, existencias: 66197, clientes: 39942, proveedores: 14826, activos_contrato: null, pasivos_contrato: null, caja: 126453, deuda_financiera: 0, arrendamientos: 2944, patrimonio_neto: 198555, minoritarios: 0, reservas: 101430 },
];
const flujosHist = [
  { periodo: '2022', flujo_operativo: 14168, capex: 495, pagos_arrendamientos: 129, adquisiciones: 0, desinversiones: 0, dividendos: 0, recompras: 0, emision_acciones: 3012, intereses_en_financiacion: 0 },
  { periodo: '2023', flujo_operativo: 24301, capex: 79, pagos_arrendamientos: 234, adquisiciones: 0, desinversiones: 0, dividendos: 2372, recompras: 0, emision_acciones: 444, intereses_en_financiacion: 0 },
  { periodo: '2024', flujo_operativo: 15809, capex: 1137, pagos_arrendamientos: 401, adquisiciones: 0, desinversiones: 0, dividendos: 2372, recompras: 0, emision_acciones: 593, intereses_en_financiacion: 0 },
  { periodo: '2025', flujo_operativo: 68482, capex: 380, pagos_arrendamientos: 862, adquisiciones: 0, desinversiones: 0, dividendos: 30975, recompras: 0, emision_acciones: 40913, intereses_en_financiacion: 0 },
];

const A = {
  _estado: 'completa',
  financieros: {
    cuenta,
    // LTM jun-26 = 2025 − 1S25 + 1S26 [A1, A3]. EBITDA con la amortización del 2S25 + 1S26 estimada (≈ 1.700 M). BPA = 2S25 (6.315 − 3.724) + 1S26 (5.806).
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 635705, ebitda: 136200, ebit: 134519, beneficio_neto: 108899, bpa: 8397, dpa: 2629, dpa_extraordinario: 0, fcf: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [
      { periodo: '2023-2024', descripcion: 'Filiales comerciales de nueva creación en Rusia (2023), Japón (2024) y EE. UU. (2024): crecimiento orgánico, sin compras [A1].' },
      { periodo: '2026', descripcion: 'Compra del 33,61 % de Kuoca Skin (perfumes y jabones) por 9.600 M el 31-jul-2026: participada por puesta en equivalencia, sin efecto en ventas [A3].' },
    ],
    comentario: "Las ventas pasaron de 145.205 M KRW en 2022 a 519.735 M en 2025: un crecimiento anual del 52,8 %, todo orgánico [A1, A4]. El motor es una sola línea, la bruma con trufa blanca «First Spray Serum» (el 46 % de las ventas de 2025), más la protección solar (22 %) [A1]. El salto de 2025 (+68,2 %) vino de fuera de Corea: el exterior pasó al 62,7 % de las ventas (75,7 % en el 2T26), con la venta online en Amazon, Qoo10, Shopee, TikTok Shop y Ozon como canal principal (40,6 % de las ventas) [A1, A6]. El margen bruto subió del 72,6 % (2022) al 75,9 % (2025) y el operativo del 10,1 % al 19,5 %, con el marketing como gran partida variable (22 % de las ventas en el 2T25, 18 % en el 2T26) [A6]. En 2026 el margen dio otro salto: 25,8 % en el 1S26 (ventas +47,9 %, beneficio operativo +55,7 %) por la escala del marketing [A3]. Los últimos doce meses suman 635.705 M de ventas y 134.519 M de beneficio operativo (21,2 %).",
    ajustes: 'Cifras publicadas K-IFRS, sin ajustes. Partida no recurrente principal: el gasto financiero de 2022-2024 (11.032 M, 18.357 M y 36.660 M) es casi todo la valoración a mercado de las RCPS (acciones preferentes rescatables y convertibles de los fondos de capital riesgo), que el folleto excluye del beneficio de 2024 al valorar la salida a bolsa (beneficio ajustado de 48.382 M frente a 15.409 M publicados) [A2, A5]. En 2025 el resultado financiero es positivo (+1.459 M: 8.147 M de ingresos y 6.293 M de gastos, sobre todo diferencias de cambio) [A2]. El 3T25 se reexpresó (ventas de 117.340 a 114.200 M) al reclasificar como menos ingreso los incentivos de las ventas online en Rusia [A6]. Pagos en acciones: opciones y acciones a empleados y al primer ejecutivo (bonus en acciones de 7.970 títulos en junio de 2026) [A3].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '3T24', ingresos: 73672, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 14226, margen_ebitda_pct: 19.3, bpa: 961, vs_consenso: null },
      { periodo: '4T24', ingresos: 95330, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 13659, margen_ebitda_pct: 14.3, bpa: null, vs_consenso: null },
      { periodo: '1T25', ingresos: 113760, crecimiento_pct: 71.9, crecimiento_organico_pct: 71.9, ebitda: 30394, margen_ebitda_pct: 26.7, bpa: null, vs_consenso: null },
      { periodo: '2T25', ingresos: 128373, crecimiento_pct: 73.8, crecimiento_organico_pct: 73.8, ebitda: 29573, margen_ebitda_pct: 23.0, bpa: null, vs_consenso: null },
      { periodo: '3T25', ingresos: 114200, crecimiento_pct: 55.0, crecimiento_organico_pct: 55.0, ebitda: 16995, margen_ebitda_pct: 14.9, bpa: 1140, vs_consenso: 'Inferior' },
      { periodo: '4T25', ingresos: 163400, crecimiento_pct: 71.4, crecimiento_organico_pct: 71.4, ebitda: 25843, margen_ebitda_pct: 15.8, bpa: 1659, vs_consenso: null },
      { periodo: '1T26', ingresos: 171242, crecimiento_pct: 50.5, crecimiento_organico_pct: 50.5, ebitda: 45500, margen_ebitda_pct: 26.6, bpa: 2932, vs_consenso: 'Superior' },
      { periodo: '2T26', ingresos: 186861, crecimiento_pct: 45.6, crecimiento_organico_pct: 45.6, ebitda: 47641, margen_ebitda_pct: 25.5, bpa: 3054, vs_consenso: 'Superior' },
    ],
    ultima_presentacion: 'Ventas y beneficio operativo de cada trimestre de las presentaciones y del IR Book [A6, A9]; EBITDA = beneficio operativo + la amortización anual prorrateada (182 M por trimestre en 2024, 343 M en 2025 y ≈ 400 M en 2026: estimación); BPA básico de FnGuide [A12]. En el 3T25 el beneficio operativo (16.652 M) quedó muy por debajo de lo esperado (≈ 31.300 M tres meses antes) por el marketing de la entrada en EE. UU. y Europa [A13]. El 1T26 (45.100 M) y el 2T26 (47.241 M, frente a 42.300 M de Hana y 41.000 M de Yuanta) superaron [A7, A14]. La presentación del 13-ago-2026 tuvo dos mensajes: (1) récord de ventas (+46 %) con el exterior al 75,7 % (Norteamérica +174 %, Europa +242 %, ASEAN +99 %, Japón +39 %, Rusia −34 %) y el marketing al 18 % de las ventas (22 % un año antes) [A6]; (2) Corea cayó un 3,8 % por tres motivos temporales: menos emisiones de teletienda, falta de tubos de protección solar y un hueco de mes y medio en Olive Young por la renovación del First Spray Serum [A6]. Dio una guía prudente para el 3T26 (170.000 M de ventas y 21 % de margen operativo) y subió la anual a 725.000 M [A14]; la acción cayó un 9,9 % al día siguiente. Lo que se explicó a medias: por qué la guía del 3T implica ventas por debajo del 2T con tantas tiendas nuevas, y cuánto pesa Amazon (no se publica).',
    confianza: 'Media',
  },
  balance: {
    historico: balanceHist,
    vencimientos: [],
    liquidez: 'Caja de 92.703 M y otros activos financieros a corto de 109.021 M a 30-jun-2026 (201.724 M en total) y 3.648 M a largo; sin deuda financiera; 4.334 M de arrendamientos [A3]. Después del cierre del semestre pagó 9.600 M por Kuoca Skin y tiene en marcha una recompra de 15.000 M (29-sep-2026 a 28-mar-2027) [A3].',
    rating: 'Sin rating público',
    coste_deuda_pct: null,
    vida_media_anios: null,
    otros_pasivos: 'Pasivo neto por pensiones de prestación definida de 1.564 M a 30-jun-2026 e impuesto a pagar de 22.040 M [A3]. La compra de Kuoca Skin lleva opciones de compra y de venta sobre más acciones, sin importe publicado. Sin garantías ni litigios relevantes [A3].',
    comentario: 'El balance es de caja neta desde la salida a bolsa (39.557 M captados en mayo de 2025) y crece con el beneficio: el patrimonio pasó de 1.692 M (2022) a 251.813 M (jun-2026) [A1, A3]. Antes de la salida a bolsa las RCPS de los fondos figuraban como deuda financiera (38.878 M en 2023) y comprimían el patrimonio. El circulante comercial (existencias + clientes − proveedores) fue de 91.313 M en 2025, el 17,6 % de las ventas, y de 93.469 M a jun-2026 (≈ 13 % de las ventas anualizadas del 2T26) [A1, A3]. Las existencias de 2024 (47.900 M, 15,5 % de las ventas) fueron altas por la preparación de la expansión; bajaron a 57.564 M en jun-2026 pese a crecer un 46 % [A3].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujosHist,
    comentario: 'El flujo operativo pasó de 14.168 M en 2022 a 68.482 M en 2025 [A1, A4]; en 2024 fue bajo (15.809 M frente a un beneficio operativo de 59.845 M) porque las existencias se triplicaron (de 16.966 a 47.900 M). En el 1S26 fue de 81.305 M (53.296 M en el 1S25), más que el beneficio del semestre [A3]. El capex es mínimo (0,1-0,4 % de las ventas): la empresa no fabrica, encarga la producción a Kolmar Korea, Cosmax y otros fabricantes por encargo, y no tiene fábricas ni tiendas propias [A1]. Usos de la caja en 2025: dividendos de 30.975 M (el final de 2024 y el de 2.226 KRW a cuenta de 2025) y caja acumulada; entradas por la salida a bolsa (39.557 M) [A1]. En 2026: recompra de 20.000 M (abril-julio), complementario de 403 KRW, Kuoca Skin (9.600 M) y nueva recompra de 15.000 M en curso [A3].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'EY Hanyoung (desde 2025); antes Samil PwC (designado por el regulador para 2024) y Taesung',
    anios_auditor: 1,
    opinion: 'Favorable (2025)',
    comentario: 'EY Hanyoung auditó 2025 con opinión favorable; la cuestión clave de auditoría fue el corte de las ventas de exportación (que la venta se registre en el periodo en que pasa el riesgo al cliente) [A1]. 2023 y 2024 los auditó el auditor designado por el regulador antes de la salida a bolsa, con opinión favorable, y el informe de 2023 se reemitió en diciembre de 2024 al pasar a K-IFRS [A4, A5]. Criterios a vigilar: (1) el reconocimiento de ventas a distribuidores y plataformas de exportación, con incentivos y devoluciones (el 3T25 se reexpresó por los incentivos de Rusia) [A6]; (2) los clientes subieron de 20.123 M a 53.091 M en dieciocho meses, algo más rápido que las ventas, por el peso de la venta B2B a distribuidores y a Costco [A3]; (3) la empresa no fabrica: la calidad depende de los fabricantes por encargo. El flujo operativo de los últimos doce meses (≈ 96.500 M) cubre el 89 % del beneficio, una conversión buena.',
    senales: [
      { senal: 'Reexpresión de ventas del 3T25 por incentivos de Rusia', nivel: 'Baja', comentario: 'De 117.340 a 114.200 M; cambio de criterio contable comunicado [A6].' },
      { senal: 'Auditor nuevo en 2025 (tercero en tres años)', nivel: 'Baja', comentario: 'Rotación por la designación obligatoria del regulador antes de cotizar; opinión favorable [A1].' },
      { senal: 'Clientes que crecen más que las ventas', nivel: 'Baja', comentario: 'De 20.123 M (2024) a 53.091 M (jun-2026) por la venta B2B fuera de Corea [A3].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Desde la salida a bolsa reparte mucho: 2.629 KRW por acción de 2025 (2.226 a cuenta en diciembre y 403 complementarios en abril), un 41,1 % del beneficio, frente a 305 KRW (22,7 %) de 2024 y 267 KRW (22,0 %) de 2023 [A1, A11]. El plan de valor del 31-mar-2026 promete repartir al menos el 25 % del beneficio en 2026-2028 (dividendos y recompras amortizadas) y un ROE de al menos el 20 % [A3]. La junta extraordinaria del 2-jun-2026 aprobó pasar 20.000 M de reserva de capital a reservas libres para pagar dividendos exentos del impuesto al accionista [A3]. Recompras: 20.000 M por fideicomiso entre abril y julio de 2026 (para planes de acciones de empleados) y 15.000 M con NH Investment desde el 29-sep-2026 para amortizar (≈ 81.922 acciones a 183.100 KRW) [A3].',
    adquisiciones: [
      { anio: '2026', objetivo: 'Kuoca Skin (33,61 %; perfumes y jabones)', importe: 9600, ev_ebitda: null, financiacion: 'Caja', resultado: 'Participada por puesta en equivalencia, con opciones de compra y de venta sobre más acciones; diversificación hacia perfume [A3].' },
    ],
    comentario: 'Asignación de capital sencilla y sin compras grandes: el negocio apenas necesita capital (capex del 0,1-0,4 % de las ventas) y la caja se acumula. Con ROE del 52,6 % en 2025 (FnGuide) y caja de 201.724 M a jun-2026 sin deuda, el reto es devolver el exceso: el 41 % de reparto de 2025 y las dos recompras de 2026 van en esa línea [A1, A3]. La única inversión fuera del negocio es Kuoca Skin (9.600 M), pequeña.',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'Brumas (First Spray Serum)', descripcion: 'Bruma facial con trufa blanca de Alba, el producto estrella', tipo_resultado: null, historico: [{ periodo: '2025', ingresos: 239103, resultado: null }] },
      { nombre: 'Protección solar', descripcion: 'Cremas y sticks de protección solar con tono', tipo_resultado: null, historico: [{ periodo: '2025', ingresos: 115697, resultado: null }] },
      { nombre: 'Cremas', descripcion: 'Cremas faciales y bálsamos multiuso', tipo_resultado: null, historico: [{ periodo: '2025', ingresos: 51191, resultado: null }] },
      { nombre: 'Mascarillas', descripcion: 'Mascarillas faciales', tipo_resultado: null, historico: [{ periodo: '2025', ingresos: 27038, resultado: null }] },
      { nombre: 'Otros', descripcion: 'Limpiadoras, tónicos, aparatos d\'Alba Signature, Veganery (suplementos), Piedmont y d\'Alba Professional (pelo)', tipo_resultado: null, historico: [{ periodo: '2025', ingresos: 86706, resultado: null }] },
    ],
    geografias: [
      { nombre: 'Corea', peso_pct: 37.3 },
      { nombre: 'Japón', peso_pct: 18.8 },
      { nombre: 'Norteamérica', peso_pct: 12.5 },
      { nombre: 'ASEAN', peso_pct: 10.7 },
      { nombre: 'Rusia', peso_pct: 10.3 },
      { nombre: 'Europa', peso_pct: 5.1 },
      { nombre: 'Gran China', peso_pct: 3.8 },
      { nombre: 'Otros', peso_pct: 1.5 },
    ],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Peso de las ventas fuera de Corea', valor_anterior: '62,7 % (2025)', valor_actual: '75,7 % (2T26)', variacion: '+13,0 puntos', comentario: 'Récord trimestral [A6].' },
      { kpi: 'Tiendas físicas fuera de Corea', valor_anterior: '≈ 6.070 (2S25)', valor_actual: '≈ 9.700 (2T26)', variacion: '+60 %', comentario: 'Japón 5.040, Norteamérica 1.889 (Ulta 1.450, Costco 225 en EE. UU.), China 883, ASEAN 726, Europa 635, Rusia 434 [A6].' },
      { kpi: 'Gastos de marketing sobre ventas', valor_anterior: '22 % (2T25)', valor_actual: '18 % (2T26)', variacion: '−4 puntos', comentario: 'La escala explica la subida del margen operativo [A6].' },
      { kpi: 'Peso de la bruma (First Spray Serum)', valor_anterior: '46 % (2025)', valor_actual: '41,4 % (2T26)', variacion: '−4,6 puntos', comentario: 'Diversificación hacia protección solar (26,3 % en el 2T26) [A1, A6].' },
      { kpi: 'Ventas en Corea', valor_anterior: '2T25', valor_actual: '45.300 M (2T26)', variacion: '−3,8 %', comentario: 'Olive Young, teletienda y falta de tubos de protección solar [A6].' },
    ],
  },
  fuentes: fA,
  huecos: [
    { seccion: 'financieros', campo: 'Cuentas de 2021 completas', tipo: 'Complemento', intentos: '1) Folleto de la salida a bolsa (solo 2022-2024 en K-IFRS; 2021 en K-GAAP sin desglose); 2) informe de auditoría de 2023 (2022-2023); 3) DART, informes de auditoría anteriores (empresa no obligada a auditoría externa completa)', decision: 'Omitido; serie desde 2022' },
    { seccion: 'trimestres', campo: 'BPA de 4T24-2T25 y consenso previo de 4T25 y 1T26', tipo: 'Complemento', intentos: '1) FnGuide (solo desde 3T25); 2) presentaciones de la empresa (no dan BPA trimestral); 3) prensa (solo 3T25 y 2T26)', decision: 'Omitido' },
    { seccion: 'flujos', campo: 'Capex y FCF del 1S26', tipo: 'Complemento', intentos: '1) Informe semestral de DART (estado de flujos leído sin el desglose de inversión); 2) presentaciones (sin flujos); 3) FnGuide (sin flujos trimestrales)', decision: 'Omitido' },
  ],
};
guarda('A', A);

// ================================================================ B. Sector y competencia
const fB = [
  { id: 1, titulo: '사업보고서 2025: historia, negocio, productos, canales, fabricantes por encargo, mercado y competencia', editor: "d'Alba Global / DART (FSS)", tipo: 'Primaria', fecha: '2026-04-07', url: DART('20260407001978') },
  { id: 2, titulo: '증권신고서 (folleto de la salida a bolsa): riesgos del sector, dependencia de un producto, fabricantes por encargo y comparables', editor: "d'Alba Global / DART (FSS)", tipo: 'Primaria', fecha: '2025-05-08', url: DART('20250508000654') },
  { id: 3, titulo: 'Earnings Release 2Q26: ventas por región y canal, tiendas, rankings de Amazon, Qoo10, Shopee y TikTok Shop', editor: "d'Alba Global", tipo: 'Primaria', fecha: '2026-08-13', url: `${W}/20260813102909_85.pdf` },
  { id: 4, titulo: '식약처가 분석한 2025년 대한민국 화장품 수출 실적 (exportaciones de cosmética coreana de 2025: 11.400 M USD, +12,3 %)', editor: 'Cosmorning', tipo: 'Sectorial', fecha: '2026-01-10', url: 'https://www.cosmorning.com/mobile/article.html?no=51971' },
  { id: 5, titulo: 'Ficha sectorial «Higiene personal y cosmética de gran consumo» (este repositorio): mercado mundial de belleza de ≈ 300.000 M EUR en 2025 según L\'Oréal (2025 Universal Registration Document, 1.2 Beauty market), ≈ 4 % anual, CR5 ≈ 40 %', editor: 'Análisis propio / L\'Oréal', tipo: 'Sectorial', fecha: '2026-10-14', url: 'sectores/higiene-cosmetica-2026-10-14.md' },
  { id: 6, titulo: 'Fichas de APR, VT, Silicon2, Amorepacific, LG H&H, Clio, Kolmar Korea, Cosmax, Cosmecca, e.l.f. y Shiseido', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/278470.KS' },
  { id: 7, titulo: '닥터자르트 지난해 232억 적자 (Dr.Jart, comprada por Estée Lauder en 2019 por ≈ 1,3 billones, pierde dinero; Dr.G estancada tras la compra de L\'Oréal)', editor: 'Hankyung', tipo: 'Prensa', fecha: '2026-06-23', url: 'https://www.hankyung.com/article/2026062336511' },
  { id: 8, titulo: '에이피알 버티는데… 왜 \'제2의 에이피알\' 달바글로벌은 뒷걸음질치나', editor: 'Daum (agencia)', tipo: 'Prensa', fecha: '2025-09-28', url: 'https://v.daum.net/v/20250928060146018' },
  { id: 9, titulo: 'IR Book 2Q26: posicionamiento premium vegano, segmentación de clientes y visión de marca mundial', editor: "d'Alba Global", tipo: 'Primaria', fecha: '2026-08-18', url: `${W}/20260818150934_0x.pdf` },
];
const B = {
  _estado: 'completa',
  historia: {
    resumen: "d'Alba Global nació en marzo de 2016 en Seúl como Bmonument (비모뉴먼트), fundada por Ban Sung-yeon, y en agosto de 2016 lanzó la marca d'Alba, con la trufa blanca de Alba (Italia) como ingrediente y un posicionamiento de cosmética vegana «premium accesible» [B1]. Su producto estrella, la bruma First Spray Serum, se hizo popular con la teletienda coreana y después en Olive Young y en plataformas online de Japón y el Sudeste Asiático [B1, B2]. Se financió con fondos de capital riesgo (rondas de 2019 y 2022) [B1]. En 2023 lanzó Veganery (suplementos veganos) y abrió filial en Rusia; en 2024 cambió el nombre a d'Alba Global, abrió filiales en Japón y EE. UU., lanzó los aparatos d'Alba Signature y superó los 300.000 M de ventas [B1]. Salió a bolsa en el KOSPI el 22-may-2025 a 66.300 KRW y cerró 2025 con 519.735 M de ventas [B1].",
    hitos: [
      { anio: '2016', hito: 'Fundación como Bmonument (marzo) y lanzamiento de la marca d\'Alba (agosto) [B1].' },
      { anio: '2019', hito: 'Rondas de financiación A y B; premio presidencial al exportador de 1 M USD [B1].' },
      { anio: '2022', hito: 'Ronda C; premio al exportador de 5 M USD [B1].' },
      { anio: '2023', hito: 'Lanzamiento de Veganery y filial en Rusia; premio al exportador de 10 M USD [B1].' },
      { anio: '2024', hito: 'Cambio de nombre a d\'Alba Global; filiales en Japón y EE. UU.; aparatos d\'Alba Signature; ventas de más de 300.000 M [B1].' },
      { anio: '2025', hito: 'Salida a bolsa en el KOSPI (22-may); entrada en Ulta y Costco en EE. UU.; ventas de más de 500.000 M y premio al exportador de 70 M USD [B1, B3].' },
      { anio: '2026', hito: 'Exterior al 75,7 % de las ventas en el 2T26; ≈ 9.700 tiendas físicas fuera de Corea; 33,61 % de Kuoca Skin [B3].' },
    ],
    confianza: 'Alta',
  },
  negocio: {
    descripcion: "d'Alba Global diseña y comercializa cosmética coreana de cuidado de la piel con su marca d'Alba: brumas faciales (First Spray Serum, el 46 % de las ventas de 2025), protección solar (22 %), cremas (10 %), mascarillas (5 %) y otros (limpiadoras, tónicos, aparatos de belleza d'Alba Signature, suplementos Veganery y cuidado del pelo d'Alba Professional) [B1]. No fabrica: encarga la producción a fabricantes coreanos (Kolmar Korea, Cosmax, B&B Korea y otros) y se queda con la marca, la formulación, el marketing y la distribución [B1, B2]. Vende en Corea (37 % en 2025: online propio y de terceros, teletienda, Olive Young y tiendas libres de impuestos) y fuera (63 %: Japón, Norteamérica, ASEAN, Rusia, Europa y China), con la venta online en plataformas (Amazon, Qoo10, Shopee, TikTok Shop, Ozon) como canal principal y una red física que crece (Ulta, Costco, Matsumoto Kiyoshi, Watsons) [B1, B3].",
    como_gana_dinero: "Vende un producto barato de fabricar (coste de ventas del 24 % de las ventas en 2025) a un precio de marca, y gasta mucho en darlo a conocer: el marketing (influencers, anuncios en plataformas, teletienda) es la partida que decide el margen, entre el 17 % y el 22 % de las ventas por trimestre [B1, B3]. El margen operativo pasó del 10 % (2022) al 19,5 % (2025) y al 25,8 % (1S26) a medida que la marca ganó escala. Capital mínimo: no tiene fábricas y el circulante es del 13-18 % de las ventas. La venta online directa al consumidor fuera de Corea (40,6 % de las ventas de 2025) deja más margen que la venta a distribuidores (22,1 %) [B1]. Estacionalidad: el 4T es el más fuerte en ventas (Black Friday, Navidad, Qoo10 Megawari) pero con más marketing; el 3T, el más flojo.",
    clientes: 'Consumidoras de 25-45 años que buscan cosmética vegana premium a precio razonable [B9]. Canales en 2025: exportación online directa al consumidor 40,6 % (Amazon, Qoo10, Shopee, TikTok Shop, Ozon), exportación a distribuidores 22,1 %, online en Corea 11,9 %, Olive Young y otras cadenas de salud y belleza 10,2 %, teletienda 9,8 % y online B2B en Corea 4,5 % [B1]. La empresa no publica cuánto pesa Amazon ni Olive Young por separado; Amazon EE. UU. creció un 96 % en el 2T26 y un hueco de mes y medio en Olive Young bastó para que Corea cayera un 3,8 % en el trimestre [B3]. Poder de precios: limitado y apoyado en la marca; el margen bruto ha subido del 72,6 % al 75,9 % en tres años [B1].',
    confianza: 'Media',
  },
  sector: {
    definicion: "El mercado relevante es el mundial de belleza (cuidado de la piel, pelo, maquillaje, perfume e higiene) a precio neto de fabricante, que L'Oréal cifra en ≈ 300.000 M EUR en 2025, con crecimiento previsto de ≈ 4 % anual (ficha sectorial del repositorio) [B5]. Dentro, la cosmética coreana («K-beauty») es el segmento que más crece: las exportaciones coreanas de cosmética fueron 11.400 M USD en 2025 (+12,3 %, récord), con EE. UU. como primer destino (2.200 M USD) por delante de China (2.000 M) y Japón (1.100 M) [B4]. Usamos el mercado mundial de belleza como mercado final (prudente y amplio) y vigilamos el de la cosmética coreana como indicador de la moda.",
    tamano: "≈ 300.000 M EUR en 2025 (≈ 446 billones de KRW a 1.488 KRW/EUR) [B5]; exportaciones coreanas de cosmética 11.400 M USD en 2025 [B4]",
    unidad_serie: 'millones de EUR',
    serie: [
      { anio: '2021', tamano: 244000 }, { anio: '2025', tamano: 300000 }, { anio: '2026e', tamano: 312000 }, { anio: '2027e', tamano: 324500 }, { anio: '2028e', tamano: 337500 }, { anio: '2030e', tamano: 365000 },
    ],
    tcac_historico_pct: 5.3,
    tcac_previsto_pct: 4.0,
    cr5_pct: 40.0,
    estructura: 'Moderadamente concentrada arriba y muy fragmentada por debajo de los diez primeros; las marcas coreanas independientes ganan cuota en online',
    drivers: [
      { driver: 'Moda de la cosmética coreana en EE. UU., Europa y Japón', efecto: '+', horizonte: 'Cíclico', evidencia: 'Exportaciones de cosmética coreana +12,3 % en 2025, con EE. UU. primer destino [B4]; Norteamérica +174 % y Europa +242 % para d\'Alba en el 2T26 [B3].' },
      { driver: 'Venta en plataformas y redes (Amazon, TikTok Shop)', efecto: '+', horizonte: 'Estructural', evidencia: 'Permite a marcas pequeñas llegar a todo el mundo sin red física; 40,6 % de las ventas de d\'Alba [B1].' },
      { driver: 'Fabricantes por encargo coreanos (Kolmar, Cosmax)', efecto: '+/−', horizonte: 'Estructural', evidencia: 'Bajan la barrera de entrada: cualquier marca nueva puede lanzar productos de calidad en meses [B2].' },
      { driver: 'Aranceles de EE. UU. y tipo de cambio', efecto: '−', horizonte: 'Cíclico', evidencia: 'Aranceles a las importaciones coreanas desde 2025; el won fuerte reduce las ventas en KRW (Kyobo, oct-2026) [B6].' },
      { driver: 'Sustitución de marcas: la moda pasa', efecto: '−', horizonte: 'Estructural', evidencia: 'Dr.Jart (Estée Lauder) pierde dinero seis años después de su compra y Dr.G se estanca [B7].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 5, justificacion: 'Cientos de marcas coreanas compiten en Amazon y Olive Young con productos parecidos (APR/Medicube, Beauty of Joseon, Torriden, Anua, Skin1004, COSRX) [B6, B8].' },
      { fuerza: 'Poder de los clientes', intensidad: 4, justificacion: 'Las plataformas (Amazon, Olive Young, Qoo10) y las cadenas (Ulta, Costco) controlan el acceso al cliente y cobran por visibilidad [B1, B3].' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Varios fabricantes por encargo compiten por los pedidos; el margen bruto ha subido [B1].' },
      { fuerza: 'Amenaza de entrada', intensidad: 5, justificacion: 'Con fabricantes por encargo y redes sociales, lanzar una marca cuesta poco [B2].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'Las marcas globales (L\'Oréal, Estée Lauder) y la dermocosmética compiten por el mismo gasto.' },
    ],
    ciclo: { posicion: 'Expansión', comentario: 'La cosmética es defensiva en volumen (en 2009 y 2020 cayó poco) [B5], pero la cosmética coreana fuera de Corea vive una fase de moda con crecimientos del 50-100 % en algunos mercados. d\'Alba no ha vivido un ciclo bajista como cotizada: el más cercano fue la caída de China en 2017-2022 (veto por el THAAD y confinamientos), que hundió a Amorepacific y LG H&H. Indicadores: exportaciones mensuales de cosmética coreana (aduanas), rankings de Amazon y ventas de Olive Young.' },
    regulacion: 'Cosmética: MFDS en Corea; en EE. UU., la ley MoCRA (registro y farmacovigilancia) y la FDA para los protectores solares, que allí son medicamentos sin receta y exigen filtros aprobados; en la UE, el reglamento 1223/2009 [B5]. Aranceles de EE. UU. a las importaciones coreanas desde 2025. En Rusia, sanciones y pagos: canal expuesto a cambios bruscos (−34 % en el 2T26) [B3].',
    tendencias: 'Tres tendencias. (1) La cosmética coreana pasa de moda a categoría: entra en cadenas físicas (Ulta, Costco, Sephora Canadá) y deja de depender solo de Amazon [B3]. (2) Las ventas se deciden en redes y plataformas: TikTok Shop y Amazon premian a la marca que más invierte en contenido y anuncios, lo que hace subir el gasto de marketing de todas. (3) Los grandes compran marcas coreanas (Estée Lauder-Dr.Jart en 2019, Amorepacific-COSRX en 2021-2024, L\'Oréal-Dr.G en 2024), pero algunas compras han salido mal cuando pasó la moda [B7]. La IA entra en el marketing y la recomendación de productos (agentes de compra), un riesgo para las marcas sin un atributo claro.',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 0.1,
    posicion: "Marca mediana de la cosmética coreana: 519.735 M KRW de ventas en 2025 (≈ 0,1 % del mercado mundial de belleza y ≈ 2 % de las exportaciones coreanas de cosmética) [B1, B4]. Líder en su nicho de brumas faciales (First Spray Serum, más de 100 millones de unidades como objetivo) y número uno en rankings de Qoo10 Japón y Shopee Vietnam en su categoría [B3].",
    competidores: [
      { nombre: 'APR (Medicube)', pais: 'Corea', ticker: '278470.KS', ingresos: 2294000, cuota_pct: null, margen_ebit_pct: 24.2, comentario: 'La marca coreana que más crece fuera (aparatos y cosmética); cotiza a más del doble del múltiplo de d\'Alba en EV/EBITDA [B6].' },
      { nombre: 'Silicon2 (Stylekorean)', pais: 'Corea', ticker: '257720.KQ', ingresos: 1354000, cuota_pct: null, margen_ebit_pct: 20.6, comentario: 'Distribuidor de cosmética coreana en el mundo; vende marcas de terceros (incluida d\'Alba en algunos mercados) [B6].' },
      { nombre: 'Amorepacific', pais: 'Corea', ticker: '090430.KS', ingresos: 4492000, cuota_pct: null, margen_ebit_pct: 10.0, comentario: 'Grupo grande (Sulwhasoo, Laneige, COSRX); se recupera fuera de China [B6].' },
      { nombre: 'LG H&H', pais: 'Corea', ticker: '051900.KS', ingresos: 6287000, cuota_pct: null, margen_ebit_pct: 6.2, comentario: 'Cosmética de lujo dependiente de China; ventas planas [B6].' },
      { nombre: 'VT Cosmetics', pais: 'Corea', ticker: '018290.KQ', ingresos: 471000, cuota_pct: null, margen_ebit_pct: 8.1, comentario: 'Marca coreana de tamaño parecido; margen hundido tras el pico de su producto estrella (Reedle Shot) [B6].' },
      { nombre: 'Clio Cosmetics', pais: 'Corea', ticker: '237880.KQ', ingresos: 330000, cuota_pct: null, margen_ebit_pct: 13.4, comentario: 'Maquillaje y cuidado (Goodal); crece poco [B6].' },
      { nombre: 'Goodai Global (Beauty of Joseon, Tirtir, Skin1004)', pais: 'Corea', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'No cotiza; agrupa varias de las marcas coreanas más vendidas en Amazon.' },
      { nombre: 'e.l.f. Beauty', pais: 'EE. UU.', ticker: 'ELF', ingresos: 2342068, cuota_pct: null, margen_ebit_pct: 14.3, comentario: 'Cosmética de masas «premium accesible» en EE. UU., el mismo cliente que d\'Alba busca en Ulta y Amazon [B6].' },
    ],
    foso: {
      veredicto: 'Sin foso',
      tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'Reseñas y rankings en plataformas ayudan, pero no impiden que otra marca escale.' },
        { fuente: 'Costes de cambio', puntuacion: 1, evidencia: 'Cambiar de bruma o de protector solar no cuesta nada al consumidor.' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'Marca d\'Alba con producto icónico (First Spray Serum) y posicionamiento vegano premium; número uno de su categoría en Qoo10 y Shopee [B3].' },
        { fuente: 'Ventaja en costes', puntuacion: 2, evidencia: 'Escala de marketing frente a marcas pequeñas: el marketing bajó del 22 % al 18 % de las ventas [B3].' },
        { fuente: 'Escala eficiente', puntuacion: 1, evidencia: 'Mercado enorme y fragmentado.' },
      ],
    },
    amenazas: 'Lo más probable es la competencia de otras marcas coreanas por el mismo cliente y el mismo espacio en Amazon y Olive Young: la entrada cuesta poco con fabricantes por encargo y el marketing es lo que decide (probabilidad alta, impacto en margen). Segunda: que la moda de la cosmética coreana se enfríe en EE. UU. o Japón, como le pasó a Dr.Jart (probabilidad media en 3-5 años, impacto alto) [B7]. Tercera: depender de un producto (la bruma, 41-46 % de las ventas): si sale de los rankings, la empresa pierde la mitad del motor (media). Cuarta: aranceles y won fuerte.',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Lo que toca las cifras: (1) la seguridad de producto (protectores solares, regulados como medicamento en EE. UU.; una retirada o un problema con un fabricante por encargo dañaría la marca) [B1]; (2) el posicionamiento vegano y sin crueldad animal es parte de la marca: una controversia sobre ingredientes o certificaciones la dañaría; (3) gobierno: el fundador controla el 21 % y los fondos de capital riesgo ya han salido. Impacto ambiental bajo: envases (la falta de tubos de protección solar del 2T26 muestra la dependencia de proveedores) [B3].',
    controversias: 'No hemos encontrado sanciones, retiradas ni litigios relevantes en los últimos tres años en DART ni en la prensa revisada.',
    confianza: 'Baja',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'esg', campo: 'Calificaciones ESG', tipo: 'Complemento', intentos: '1) KCGS (sin calificación publicada para 2025 encontrada); 2) MSCI (sin ficha pública); 3) informe anual 2025 (no menciona calificaciones)', decision: 'Omitido' },
    { seccion: 'competencia', campo: 'Ventas y margen de Goodai Global, Torriden y Anua', tipo: 'Complemento', intentos: '1) No cotizan; 2) DART, informes de auditoría (no leídos por tiempo); 3) prensa (cifras dispersas)', decision: 'Omitido' },
  ],
};
guarda('B', B);

// ================================================================ C. Equipo y gobierno
const fC = [
  { id: 1, titulo: '사업보고서 2025: consejo, comisiones, directivos, remuneración del primer ejecutivo y accionistas', editor: "d'Alba Global / DART (FSS)", tipo: 'Primaria', fecha: '2026-04-07', url: DART('20260407001978') },
  { id: 2, titulo: '반기보고서 2026: accionistas a 30-jun-2026 (Ban Sung-yeon 18,24 %, con relacionados 21,03 %; NPS 9,43 %), autocartera y opciones', editor: "d'Alba Global / DART (FSS)", tipo: 'Primaria', fecha: '2026-08-14', url: DART('20260814001262') },
  { id: 3, titulo: '주식등의 대량보유상황보고서 de Ban Sung-yeon (bonus en acciones de 7.970 títulos el 5-jun y venta en bloque de 76.616 a 250.417 KRW el 28-jul-2026; 20,56 % con relacionados)', editor: "d'Alba Global / DART (FSS)", tipo: 'Primaria', fecha: '2026-08-26', url: DART('20260826000317') },
  { id: 4, titulo: '임원ㆍ주요주주 특정증권등 거래계획보고서 (plan de venta del fundador presentado el 26-jun-2026)', editor: "d'Alba Global / DART (FSS)", tipo: 'Primaria', fecha: '2026-06-26', url: DART('20260626000114') },
  { id: 5, titulo: '주식등의 대량보유상황보고서 de FIL Limited (baja al 4,98 %)', editor: 'DART (FSS)', tipo: 'Primaria', fecha: '2026-10-12', url: DART('20261012000090') },
  { id: 6, titulo: 'Accionistas principales a 16-oct-2026 (Ban Sung-yeon y 6 relacionados 21,14 %, NPS 8,48 %, autocartera 0,91 %), capital flotante y extranjeros', editor: 'FnGuide (Naver WiseReport)', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://navercomp.wisereport.co.kr/v2/company/c1010001.aspx?cmp_cd=483650' },
  { id: 7, titulo: 'Avisos de fin de bloqueo de la salida a bolsa (1.955.709 acciones el 22-ago-2025, 1.293.136 el 22-nov-2025 y 637.758 el 22-may-2026)', editor: "d'Alba Global / KRX", tipo: 'Primaria', fecha: '2026-05-19', url: DART('20260519800212') },
  { id: 8, titulo: '임원ㆍ주요주주 특정증권등 소유상황보고서 (ventas de dos directivos no consejeros, sep-2026)', editor: 'DART (FSS)', tipo: 'Primaria', fecha: '2026-09-09', url: DART('20260909000365') },
  { id: 9, titulo: 'IR Books 2Q25 y 2Q26: objetivo de 1 billón de ventas «en 2028» (2Q25) adelantado a «2027» (4Q25 y siguientes)', editor: "d'Alba Global", tipo: 'Primaria', fecha: '2026-08', url: `${W}/20251030144526_ql.pdf` },
  { id: 10, titulo: '기업가치 제고 계획 (plan de valor: reparto ≥ 25 % en 2026-2028 y ROE ≥ 20 %)', editor: "d'Alba Global / KRX", tipo: 'Primaria', fecha: '2026-03-31', url: DART('20260331803324') },
  { id: 11, titulo: '임시주주총회 결과 (junta extraordinaria del 2-jun-2026)', editor: "d'Alba Global / KRX", tipo: 'Primaria', fecha: '2026-06-02', url: DART('20260602800860') },
];
const C = {
  _estado: 'completa',
  directivos: {
    equipo: [
      { nombre: 'Ban Sung-yeon', cargo: 'Fundador y primer ejecutivo (representative director)', desde: '2016', participacion_pct: 17.74, trayectoria: 'Fundó la empresa en 2016 tras trabajar en consultoría estratégica; la dirige desde entonces. Tiene 2.201.134 acciones a título personal tras vender 76.616 en julio de 2026 (17,74 %) y un 20,56 % con sus relacionados y opciones [C3].' },
      { nombre: 'Yoo Myung-han', cargo: 'Director de operaciones (COO), consejero ejecutivo', desde: '2024', participacion_pct: null, trayectoria: 'Consejero desde la junta de marzo de 2024; parte del grupo de control del fundador [C1, C3].' },
      { nombre: 'Yang Se-hoon', cargo: 'Director financiero (CFO), consejero ejecutivo', desde: null, participacion_pct: 0.6, trayectoria: 'Responsable de las cuentas y de la relación con inversores; tenía 75.150 acciones en agosto de 2026 tras ejercer 32.000 opciones [C3].' },
    ],
    historial_guidance: [
      { anio: '2026', guia: 'Ventas de más de 700.000 M y 70 % fuera de Corea (febrero); subida a 725.000 M el 13-ago-2026', real: '1S26: 358.103 M (49 % de la guía) con el exterior al 75,7 % en el 2T26', cumplida: 'Parcial' },
      { anio: '3T26', guia: 'Ventas de 170.000 M y 21 % de margen operativo (13-ago-2026)', real: 'Pendiente (12-nov-2026)', cumplida: 'Parcial' },
      { anio: '2027-2028', guia: '1 billón de ventas «en 2028» (IR Book 2Q25), adelantado a «2027» desde el IR Book 4Q25; 25 % de margen operativo en 2028', real: '635.705 M en los últimos doce meses', cumplida: 'Parcial' },
    ],
    comentario: 'La empresa la dirige su fundador desde 2016, con un equipo pequeño (248 empleados en jun-2026) que ha llevado las ventas de 145.205 M a 635.705 M en cuatro años [C1, C2]. Como cotizada solo tiene año y medio de historia: el único tropiezo fue el 3T25, con un margen operativo del 14,6 % por el marketing de entrada en EE. UU. y Europa, que la acción castigó (−20,5 % el 6-nov-2025). Desde entonces ha cumplido: 1T26 y 2T26 por encima del consenso y guía anual subida [nota A]. La ambición es alta: adelantó un año el objetivo de 1 billón de ventas [C9]. El riesgo es de persona clave: la marca, la estrategia y el control dependen del fundador, de 44 años. No hay plan de sucesión publicado.',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Ban Sung-yeon', cargo: 'Presidente del consejo y primer ejecutivo', tipo: 'Ejecutivo', desde: '2016', comisiones: null },
      { nombre: 'Yoo Myung-han', cargo: 'Consejero ejecutivo (COO)', tipo: 'Ejecutivo', desde: '2024', comisiones: null },
      { nombre: 'Yang Se-hoon', cargo: 'Consejero ejecutivo (CFO)', tipo: 'Ejecutivo', desde: null, comisiones: null },
      { nombre: 'Jang Sung-yeop', cargo: 'Consejero no ejecutivo', tipo: 'Otro externo', desde: '2022', comisiones: null },
      { nombre: 'Lee Min-hee', cargo: 'Consejera externa', tipo: 'Independiente', desde: '2024', comisiones: 'Auditoría; Retribución' },
      { nombre: 'Lee Hoon-seok', cargo: 'Consejero externo', tipo: 'Independiente', desde: '2024', comisiones: 'Auditoría; Transparencia' },
      { nombre: 'Yook Hyun-jin', cargo: 'Consejera externa', tipo: 'Independiente', desde: '2025', comisiones: 'Auditoría' },
    ],
    presidente_ceo_separados: false,
    presidente_ejecutivo: true,
    consejero_coordinador: false,
    una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false,
    variable_ligado_rentabilidad: false,
    auditoria_independiente: true,
    insiders_sin_operaciones: false,
    accionista_control: true,
    presidente_vinculado_control: true,
    cambios_cupula_24m: 0,
    voto_remuneracion_pct: null,
    voto_remuneracion_contra_pct: null,
    voto_remuneracion_contra_libre_pct: null,
    voto_cupula_pct: null,
    remuneracion_ceo: 1398,
    remuneracion: 'El primer ejecutivo cobró 1.398 M KRW en 2025: 392 M fijos y un bonus de 1.000 M (el tope), ligado al crecimiento de las ventas y del beneficio operativo, no a la rentabilidad sobre el capital [C1]. Además declaró 39.976 M de ingresos por ejercer opciones sobre acciones concedidas antes de la salida a bolsa [C1]; para pagar el impuesto vendió 76.616 acciones en bloque en julio de 2026 (≈ 19.186 M) [C3, C4]. En junio de 2026 recibió 7.970 acciones como bonus [C3]. En Corea la junta vota un límite global para los consejeros, no la política individual. La junta extraordinaria de junio de 2026 aprobó 2.000 opciones nuevas para empleados [C11].',
    accionistas: [
      { nombre: 'Ban Sung-yeon (fundador) y 6 relacionados', pct: 21.14, tipo: 'Fundador; accionista de control', variacion: '21,03 % a 30-jun-2026; 17,74 % a título personal tras la venta de julio [C2, C3, C6]' },
      { nombre: 'Servicio Nacional de Pensiones (NPS)', pct: 8.48, tipo: 'Institucional (Corea)', variacion: 'Del 9,43 % (jun-2026) al 8,48 % (oct-2026) [C2, C6]' },
      { nombre: 'M&G', pct: 7.67, tipo: 'Institucional (Reino Unido)', variacion: 'Declaración de más del 5 % [C2]' },
      { nombre: 'FIL (Fidelity International)', pct: 4.98, tipo: 'Institucional', variacion: 'Bajó del 5,09 % al 4,98 % el 18-sep-2026 [C5]' },
      { nombre: 'Autocartera', pct: 0.91, tipo: 'Autocartera', variacion: '114.076 acciones (oct-2026); recompra de 15.000 M en curso para amortizar [C6]' },
      { nombre: 'Capital flotante restante (extranjeros 44,2 % del total)', pct: 56.82, tipo: 'Flotante', variacion: 'Flotante total del 73 % según FnGuide [C6]' },
    ],
    insiders: [
      { fecha: '2026-07-28', persona: 'Ban Sung-yeon (fundador y primer ejecutivo)', operacion: 'Venta', acciones: 76616, importe: 19186 },
      { fecha: '2026-06-05', persona: 'Ban Sung-yeon (bonus en acciones)', operacion: 'Otra', acciones: 7970, importe: 1579 },
      { fecha: '2026-09-04', persona: 'Dos directivos no consejeros (Ahn Hyeon-ho y Myeong Jae-hoon)', operacion: 'Venta', acciones: 13568, importe: null },
    ],
    control_y_defensas: 'El fundador controla con el 21 % junto a sus relacionados, y 1.944.780 de sus acciones están bloqueadas voluntariamente hasta mayo de 2028 (tres años desde la salida a bolsa) [C2, C7]. Los demás bloqueos de la salida a bolsa ya vencieron: 1.955.709 acciones el 22-ago-2025, 1.293.136 (fondos de capital riesgo, KTBN y otros) el 22-nov-2025 y 637.758 (Kolmar Holdings y directivos) el 22-may-2026 [C7]. Los fondos de capital riesgo ya no aparecen entre los accionistas de más del 5 %. Una acción, un voto; sin blindajes. Tres de los siete consejeros son independientes y forman la comisión de auditoría.',
    alertas: [
      'Venta en bloque del fundador de 76.616 acciones en julio de 2026, para pagar impuestos de opciones [C3, C4].',
      'Presidente y primer ejecutivo en la misma persona, que es además el accionista de control [C1].',
      'Bonus del primer ejecutivo ligado a crecimiento, no a rentabilidad [C1].',
    ],
    confianza: 'Media',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'Votos de la junta de marzo de 2026 (remuneración y consejeros)', tipo: 'Complemento', intentos: '1) DART, resultados de la junta ordinaria (no localizados en la búsqueda por empresa); 2) web de inversores (no publica votos); 3) prensa (sin datos)', decision: 'Omitido' },
  ],
};
guarda('C', C);

// ================================================================ D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de 483650.KS, del KOSPI (^KS11) y del ETF TIGER 화장품 (228790.KS); cierres, betas y volatilidad', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/483650.KS' },
  { id: 2, titulo: 'Consenso anual 2026e-2028e y trimestral (media de tres meses de 18 casas coreanas)', editor: 'FnGuide (Naver WiseReport)', tipo: 'Analistas', fecha: '2026-10-16', url: 'https://navercomp.wisereport.co.kr/v2/company/c1050001.aspx?cmp_cd=483650' },
  { id: 3, titulo: 'Objetivos y recomendaciones de 18 casas (agosto-octubre de 2026): Daol, Shinhan, Hana, DB, KIS, Meritz, Eugene, LS, NH, Sangsangin, Shinyoung, Hanwha, BNK, KB, Kyobo, Samsung, Hyundai Motor, IBK', editor: 'FnGuide (Naver WiseReport)', tipo: 'Analistas', fecha: '2026-10-16', url: 'https://navercomp.wisereport.co.kr/v2/company/c1010001.aspx?cmp_cd=483650' },
  { id: 4, titulo: 'Fichas de comparables (precio, capitalización, valor empresa, ventas, EBITDA, estimaciones de BPA)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/278470.KS' },
  { id: 5, titulo: 'Long-Term Government Bond Yields: 10-year for Korea (IRLTLT01KRM156N), septiembre de 2026: 4,454 %', editor: 'OECD vía FRED', tipo: 'Datos de mercado', fecha: '2026-10-01', url: 'https://fred.stlouisfed.org/series/IRLTLT01KRM156N' },
  { id: 6, titulo: 'Tipos de cambio KRW=X (1.329,13) y JPYKRW=X (8,376), 19-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/KRW=X' },
  { id: 7, titulo: 'Implied ERP by month: octubre de 2026, 4,20 %', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 8, titulo: '증권신고서: valoración de la salida a bolsa (PER de 20,99x de LG H&H, APR, Hankook Cosmetics y VT sobre un beneficio ajustado de 2024 de 48.382 M; precio final 66.300 KRW)', editor: "d'Alba Global / DART (FSS)", tipo: 'Primaria', fecha: '2025-05-08', url: DART('20250508000654') },
  { id: 9, titulo: '‘신성장 동력 확보’ 아모레퍼시픽, 7551억원에 코스알엑스 인수 (54,8 % de COSRX)', editor: 'Etoday', tipo: 'Prensa', fecha: '2023-10-31', url: 'https://www.etoday.co.kr/news/view/2297611' },
  { id: 10, titulo: '[IB토마토] 아모레퍼시픽, 현금 부족에도 코스알엑스 인수 (ventas de COSRX: 204.400 M en 2022; 190.200 M y 71.700 M de beneficio operativo en el 1S23)', editor: 'News Tomato', tipo: 'Prensa', fecha: '2023-11', url: 'https://newstomato.com/ReadNews.aspx?no=1208885' },
  { id: 11, titulo: 'Hankyung: Dr.Jart, comprada por Estée Lauder en 2019 por 1.100 M USD (≈ 1,3 billones KRW), pierde 23.200 M en 2025', editor: 'Hankyung', tipo: 'Prensa', fecha: '2026-06-23', url: 'https://www.hankyung.com/article/2026062336511' },
  { id: 12, titulo: 'Bizwatch: recortes de objetivo tras el 3T25 (DB a 180.000, NH 240.000→200.000, Kiwoom 250.000→210.000, KB 200.000)', editor: 'Bizwatch', tipo: 'Prensa', fecha: '2025-11-07', url: 'https://news.bizwatch.co.kr/article/market/2025/11/07/0029' },
];
const blend = (e0, e1) => 0.2 * e0 + 0.8 * e1; // próximos 12 meses desde el 19-oct: 2,4 meses de 2026 y 9,6 de 2027
const r1 = (x) => (x == null || !isFinite(x) ? null : Math.round(x * 10) / 10);
const r2 = (x) => (x == null || !isFinite(x) ? null : Math.round(x * 100) / 100);
const fxDe = (c) => (c === 'USD' ? USDKRW : c === 'JPY' ? JPYKRW : 1);
const nombres = { '278470.KS': ['APR', 'KR'], '018290.KQ': ['VT', 'KR'], '257720.KQ': ['Silicon2', 'KR'], '090430.KS': ['Amorepacific', 'KR'], '051900.KS': ['LG H&H', 'KR'], '237880.KQ': ['Clio Cosmetics', 'KR'], '161890.KS': ['Kolmar Korea', 'KR'], '192820.KS': ['Cosmax', 'KR'], '241710.KQ': ['Cosmecca Korea', 'KR'], ELF: ['e.l.f. Beauty', 'US'], '4911.T': ['Shiseido', 'JP'] };
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
    nombre: "d'Alba Global Co., Ltd.", nombre_corto: "d'Alba Global", ticker: '483650', isin: 'KR7483650008', mercado: 'KOSPI (Korea Exchange)', indice_referencia: 'KOSPI',
    pais: 'Corea del Sur', pais_iso: 'KR', sector: 'Consumer Staples', industria: 'Personal Care Products', sede: 'Seúl (Mapo-daero 78, Mapo-gu)', fundacion: '2016', empleados: 248, web: 'https://www.dalbaglobal.com',
    precio: bolsa.identificacion.precio, fecha_precio: bolsa.identificacion.fecha_precio, acciones: 12.8, capitalizacion_publicada: 2101000, free_float_pct: 73.0,
    max_52s: 283000, min_52s: 116200, volumen_medio_diario: '≈ 34.770 M KRW/día (3 meses; 164.402 acciones)', proximos_resultados: '2026-11-12',
  },
  consenso: {
    guidance: 'Guía de 2026: ventas de más de 700.000 M con el 70 % fuera de Corea (febrero), subida a 725.000 M el 13-ago-2026; para el 3T26, 170.000 M de ventas y un margen operativo del 21 % [nota A: 14]. A medio plazo: 1 billón de ventas en 2027, el 70 % fuera de Corea y un margen operativo del 25 % en 2028 [nota C: 9]. Plan de valor: reparto de al menos el 25 % y ROE de al menos el 20 % en 2026-2028 [nota C: 10].',
    estimaciones: [
      { periodo: '2026e', ingresos: 756030, ebitda: null, ebit: 166770, bpa: 10592, dpa: 2835, fuente: 'FnGuide, media de 3 meses a 16-oct-2026 [D2]' },
      { periodo: '2027e', ingresos: 983110, ebitda: null, ebit: 222280, bpa: 13882, dpa: null, fuente: 'FnGuide [D2]' },
      { periodo: '2028e', ingresos: 1203660, ebitda: null, ebit: 279220, bpa: 17428, dpa: null, fuente: 'FnGuide [D2]' },
    ],
    recomendaciones: { n_analistas: 18, comprar: 18, mantener: 0, vender: 0, po_medio: 289167, po_min: 220000, po_max: 350000 },
    revisiones: 'Mixtas a la baja en octubre. Tras el 3T25 los objetivos bajaron con fuerza (DB a 180.000, NH a 200.000, Kiwoom a 210.000) [D12]. Tras el 1T26 y el 2T26 subieron a 260.000-350.000 KRW. En octubre de 2026, antes del 3T26, cuatro casas recortan (Daol 340.000→310.000, Hana 260.000→220.000, DB 300.000→260.000, Yuanta/Eugene 320.000→280.000) por el won fuerte, que reduce las ventas en KRW, y una sube (Meritz 236.000→280.000) [D3]. El consenso del 3T26 es de 174.120 M de ventas y 32.750 M de beneficio operativo (18,8 %), por debajo de la guía de margen de la empresa (21 %) [D2]. El BPA de 2027e (13.882 KRW) supone un 31 % de crecimiento; todas las recomendaciones son de compra.',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    ...bolsa.bolsa,
    posicion_corta_pct: null,
    comentario: 'La acción salió a bolsa a 66.300 KRW el 22-may-2025, cerró ese día por encima de 100.000 y llegó a 283.000 KRW el 12-ago-2026; hoy cotiza a 169.600, un 36 % por debajo del máximo y un 156 % por encima del precio de salida [D1]. En el año sube un 15,0 % frente al +36,9 % del KOSPI (empujado por Samsung y SK Hynix) y el +23,1 % del ETF de cosmética coreana [D1]. Es muy volátil (68 % anual): cayó un 49 % entre agosto y noviembre de 2025 (3T25 flojo y fin de bloqueos) y subió un 68 % en un mes en abril-mayo de 2026 (1T26). Desde agosto de 2026 cae por la guía prudente del 3T26 y el won fuerte. A 169.600 KRW cotiza a 20,2 veces el BPA de los últimos doce meses y a 16,0 veces el BPA de 2026e del consenso.',
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: ['2025'].map((a) => ({ anio: a, precio_cierre: cl[a], ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    comentario: 'Solo hay un cierre de ejercicio como cotizada (2025: 147.500 KRW, 23,4 veces el BPA diluido de 2025 y ≈ 15 veces el de 2026). En la salida a bolsa se valoró a 20,99 veces el beneficio ajustado de 2024 con un descuento del 17-32 %: el precio final, 66.300 KRW, fue 17,4 veces ese beneficio [D8]. Con un año de historia no hay mediana útil: el método aplica la regla de historia corta.',
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Marcas y grupos de cosmética coreanos cotizados (APR, VT, Clio, Amorepacific, LG H&H), el distribuidor Silicon2, los fabricantes por encargo de d\'Alba (Kolmar Korea, Cosmax, Cosmecca) y dos referencias fuera de Corea con el mismo cliente o canal (e.l.f. Beauty en EE. UU. y Shiseido en Japón). PER de los próximos 12 meses = precio ÷ (0,2 × BPA 2026e + 0,8 × BPA 2027e); en e.l.f., ejercicios a marzo de 2027 y 2028. EV/EBITDA de los próximos 12 meses en blanco: Yahoo no da un EBITDA futuro homogéneo.',
    empresas: comparables,
    comentario: 'La cosmética coreana cotiza en dos grupos: las marcas que crecen mucho fuera (APR a ≈ 16-17 veces el BPA de los próximos doce meses) y los grupos maduros, los fabricantes por encargo y las marcas cuyo producto estrella ya pasó (VT, Clio y Silicon2 a 8-10 veces). Amorepacific y LG H&H cotizan a 17-21 veces por la recuperación esperada de China. d\'Alba, a 169.600 KRW, cotiza a ≈ 13 veces el BPA de 2027e del consenso y a ≈ 14 veces el nuestro: por debajo de APR y en la mitad del grupo, con crecimiento parecido a APR y margen algo menor. El riesgo de la moda se ve en VT: su margen operativo cayó al 8 % cuando su producto estrella perdió tirón y cotiza a 9 veces.',
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2025-05', objetivo: "d'Alba Global (salida a bolsa)", comprador: 'Mercado (oferta pública)', ev: 706000, ev_ventas: 2.28, ev_ebitda: 11.7, prima_pct: null, excluir: true, comentario: 'Precio de 66.300 KRW por 12,07 M de acciones (≈ 800.000 M de capitalización) menos ≈ 94.000 M de caja tras la ampliación; ventas de 2024 de 309.063 M y EBITDA de 60.574 M. PER sobre el beneficio ajustado de 2024: 17,4x. No es una compra de control [D8].' },
      { fecha: '2023-10', objetivo: 'COSRX (54,8 %, hasta el 93,2 %)', comprador: 'Amorepacific', ev: 1378000, ev_ventas: 3.6, ev_ebitda: 9.6, prima_pct: null, excluir: false, comentario: '755.100 M por el 54,8 % = ≈ 1,38 billones por el 100 % (capital, aproximación al valor empresa). Múltiplos sobre el 1S23 anualizado (ventas ≈ 380.400 M, beneficio operativo ≈ 143.400 M, usado como EBITDA) [D9, D10].' },
      { fecha: '2019-12', objetivo: 'Have & Be (Dr.Jart)', comprador: 'Estée Lauder', ev: 1300000, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '1.100 M USD (≈ 1,3 billones KRW) por la marca; sin múltiplo publicado en las fuentes leídas. En 2025 perdió 23.200 M: ejemplo de moda que pasa [D11].' },
    ],
    comentario: 'Las marcas coreanas de éxito se han comprado a 3-4 veces las ventas y unas 10 veces el beneficio operativo (COSRX, 2023) [D9, D10]. d\'Alba vale hoy en bolsa ≈ 1,9 billones de valor empresa, 3,0 veces las ventas y 14 veces el EBITDA de los últimos doce meses: algo por encima de COSRX. El fundador controla y tiene bloqueadas sus acciones hasta 2028: una compra no es probable a corto plazo.',
    confianza: 'Media',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'bolsa', campo: 'Posición corta', tipo: 'Complemento', intentos: '1) KRX (data.krx.co.kr sin acceso desde este entorno); 2) FnGuide (no la publica); 3) foro de Naver (solo comentarios sobre compras a crédito)', decision: 'Omitido' },
    { seccion: 'multiplos_historicos', campo: 'Historia de múltiplos de más de un año', tipo: 'Complemento', intentos: '1) Salida a bolsa en mayo de 2025: no existe; 2) FnGuide (solo 2025); 3) folleto (valoración de 2024 por comparables)', decision: 'Omitido; regla de historia corta' },
    { seccion: 'transacciones', campo: 'Precio y múltiplos de L\'Oréal-Dr.G (2024) y Goodai-Tirtir/Skin1004', tipo: 'Complemento', intentos: '1) L\'Oréal (no publica el precio); 2) prensa coreana («miles de millones» sin cifra); 3) DART (no son cotizadas)', decision: 'Omitido' },
  ],
};
guarda('D', D);

// ================================================================ E. Sentimiento
const fE = [
  { id: 1, titulo: 'Foro de Naver (종목토론실) de 483650: 400 mensajes del 18-sep al 19-oct-2026', editor: 'Naver Pay Securities', tipo: 'Prensa', fecha: '2026-10-19', url: 'https://m.stock.naver.com/domestic/stock/483650/discussion' },
  { id: 2, titulo: '에이피알 버티는데… 왜 \'제2의 에이피알\' 달바글로벌은 뒷걸음질치나', editor: 'Daum (agencia)', tipo: 'Prensa', fecha: '2025-09-28', url: 'https://v.daum.net/v/20250928060146018' },
  { id: 3, titulo: '달바글로벌, 2분기 실적 발표, 매출 영업이익 시간외 주가 급락이유 (blog)', editor: 'thecheck.co.kr', tipo: 'Prensa', fecha: '2026-08-13', url: 'https://thecheck.co.kr/?p=746' },
];
const E = {
  _estado: 'completa',
  sentimiento: {
    tono: 'Dividido',
    tendencia: 'Empeora',
    revisadas: [
      { plataforma: 'Foro de Naver (종목토론실), octubre de 2026', fecha: '2026-10', n_comentarios: 200, tono: 'Negativo', resumen: 'Quejas por las ventas forzosas de compras a crédito («mientras no se limpien las 200.000 acciones a crédito no sube»), «150.000 es el suelo», miedo a un 3T26 flojo con el won fuerte y comparaciones con APR; una minoría compra por la recompra y la gira con inversores en Europa [E1].' },
      { plataforma: 'Foro de Naver, finales de septiembre de 2026', fecha: '2026-09', n_comentarios: 200, tono: 'Dividido', resumen: 'Debate sobre si la bolsa coreana solo sube con Samsung y SK Hynix, sobre la venta del fundador en julio («si el dueño vende, por qué comprar») y sobre la recompra de 15.000 M para amortizar [E1].' },
      { plataforma: 'Prensa y blogs coreanos', fecha: '2026-08', n_comentarios: 5, tono: 'Neutro', resumen: 'Tras el 2T26: récord de ventas y margen, pero la guía del 3T se ve conservadora y la acción cae en el mercado fuera de hora [E3]; antes, en 2025, comparaciones con APR («la segunda APR que retrocede») [E2].' },
    ],
    temas: [
      { tema: 'Compras a crédito y ventas forzosas', postura: 'Bajista', peso: 'Alto', contraste: 'Plausible: la acción cayó un 8,4 % el 13-oct con el mercado y se habla de liquidaciones; es flujo, no negocio. No hay dato oficial de saldo de crédito en las fuentes leídas.' },
      { tema: 'El fundador vende', postura: 'Bajista', peso: 'Medio', contraste: 'Vendió 76.616 acciones (≈ 3 % de las suyas) para pagar el impuesto de unas opciones y sigue con el 17,7 %, con 1,94 M de acciones bloqueadas hasta 2028 (nota C). No es una salida.' },
      { tema: 'El won fuerte y el 3T26', postura: 'Bajista', peso: 'Medio', contraste: 'Cierto en parte: Kyobo y Hana recortan por el cambio; el 75 % de las ventas es fuera de Corea (nota D).' },
      { tema: 'Recompra y amortización', postura: 'Alcista', peso: 'Medio', contraste: 'Cierto: 15.000 M (≈ 0,7 % del capital) hasta marzo de 2027 (nota A).' },
      { tema: 'Es la «segunda APR»', postura: 'Dividida', peso: 'Bajo', contraste: 'APR es cuatro veces mayor y con aparatos; las dos dependen de la moda coreana fuera (nota B).' },
    ],
    lectura: 'Los particulares coreanos están cansados tras la caída desde 283.000 KRW: hablan de flujos (crédito, ventas forzosas, la rotación hacia Samsung y SK Hynix) más que del negocio, que sigue batiendo previsiones. Coincide con los analistas en el miedo a un 3T26 flojo por el won, pero no en el fondo: los 18 analistas recomiendan comprar con objetivos de 220.000-350.000 KRW. No hay euforia; el riesgo de compra masiva de particulares que después vende parece ya descontado en la caída de agosto-octubre.',
    confianza: 'Media',
  },
  fuentes: fE,
  huecos: [],
};
guarda('E', E);
console.log('Notas A-E escritas;', comparables.length, 'comparables:', comparables.map((c) => `${c.nombre} PER ${c.per_ntm}`).join(', '));
