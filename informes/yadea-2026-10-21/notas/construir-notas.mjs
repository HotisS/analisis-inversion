// Escribe las notas A-E de Yadea Group Holdings Ltd. (1585.HK; corte 2026-10-21; Hong Kong ya ha cerrado: precio del cierre de hoy).
// Fuentes primarias: HKEXnews (informes anuales 2021-2025, anuncios de resultados 2025 y 1S26, informes semestrales 2024-2026,
// declaración mensual de acciones de sep-2026, juntas 2024-2026, circular 2026, cambio de auditor, compra de Jinjian, alertas de beneficio).
// Bolsa y comparables: Yahoo Finance; consenso: MarketScreener y Yahoo; bono: ChinaBond. Foro: Guba (Eastmoney).
// Cada nota cita solo con [n] de su propia lista. Ejecutar: node informes/yadea-2026-10-21/notas/construir-notas.mjs
// Ejercicio natural (31-dic). Cifras en millones de RMB salvo que se diga otra cosa; la acción cotiza en HKD.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const H = 'https://www1.hkexnews.hk/listedco/listconews/sehk';
const bolsa = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const yd = JSON.parse(fs.readFileSync(path.join(dir, 'yahoo-datos.json'), 'utf8')).datos;
// Tipos de cambio (Yahoo Finance, 21-oct-2026): RMB por unidad.
const FX = { CNY: 1, HKD: 0.8502, JPY: 0.042103, INR: 0.066997, USD: 6.6643 };
const r1 = (x) => (x == null || !isFinite(x) ? null : Math.round(x * 10) / 10);
const r2 = (x) => (x == null || !isFinite(x) ? null : Math.round(x * 100) / 100);

// ================================================================ A. Cuentas
const fA = [
  { id: 1, titulo: '2025 Annual Report: estados consolidados HKFRS de 2025 y 2024 auditados por Deloitte, notas de segmentos, intangibles y fondo de comercio, préstamos públicos, remuneraciones y participaciones', editor: 'Yadea Group / HKEXnews', tipo: 'Primaria', fecha: '2026-04-24', url: `${H}/2026/0424/2026042401612.pdf` },
  { id: 2, titulo: 'Announcement of annual results for the year ended 31 December 2025 (cuenta, balance, ventas y unidades por producto, otros ingresos, gastos por naturaleza)', editor: 'Yadea Group / HKEXnews', tipo: 'Primaria', fecha: '2026-03-30', url: `${H}/2026/0330/2026033000323.pdf` },
  { id: 3, titulo: 'Announcement of interim results for the six months ended 30 June 2026 (cuenta, balance, flujos, segmentos, unidades)', editor: 'Yadea Group / HKEXnews', tipo: 'Primaria', fecha: '2026-08-25', url: `${H}/2026/0825/2026082500215.pdf` },
  { id: 4, titulo: 'Interim Report 2026 (participaciones, plan de acciones, notas del 1S26)', editor: 'Yadea Group / HKEXnews', tipo: 'Primaria', fecha: '2026-09-24', url: `${H}/2026/0924/2026092400916.pdf` },
  { id: 5, titulo: '2023 Annual Report: estados de 2023 y 2022, otros ingresos, gastos por naturaleza, unidades', editor: 'Yadea Group / HKEXnews', tipo: 'Primaria', fecha: '2024-04-24', url: `${H}/2024/0424/2024042400408.pdf` },
  { id: 6, titulo: '2021 Annual Report: estados de 2021 y 2020 y resumen de cinco años 2017-2021', editor: 'Yadea Group / HKEXnews', tipo: 'Primaria', fecha: '2022-04-27', url: `${H}/2022/0427/2022042701816.pdf` },
  { id: 7, titulo: '2022 Annual Report: compra de Huayu (nota 40) y de sus minoritarios (nota 41)', editor: 'Yadea Group / HKEXnews', tipo: 'Primaria', fecha: '2023-04-26', url: `${H}/2023/0426/2023042601737.pdf` },
  { id: 8, titulo: 'Announcement of interim results for the six months ended 30 June 2025 (1S25 y 1S24)', editor: 'Yadea Group / HKEXnews', tipo: 'Primaria', fecha: '2025-08-26', url: `${H}/2025/0826/2025082600307.pdf` },
  { id: 9, titulo: 'Interim Report 2024 (1S24 y 1S23)', editor: 'Yadea Group / HKEXnews', tipo: 'Primaria', fecha: '2024-09-26', url: `${H}/2024/0926/2024092600801.pdf` },
  { id: 10, titulo: '2024 Annual Report: compra de Wuxi Lingbo (nota 38), red de distribuidores a 31-dic-2024', editor: 'Yadea Group / HKEXnews', tipo: 'Primaria', fecha: '2025-04-24', url: `${H}/2025/0424/2025042402045.pdf` },
  { id: 11, titulo: 'Monthly Return de septiembre de 2026 (3.112.647.294 acciones emitidas, sin autocartera; 4.232.100 opciones)', editor: 'Yadea Group / HKEXnews', tipo: 'Primaria', fecha: '2026-10-02', url: `${H}/2026/1002/2026100200700.pdf` },
  { id: 12, titulo: 'Discloseable transaction: acquisition of the target company (Jinjian/Garow, 1.020 M RMB en efectivo)', editor: 'Yadea Group / HKEXnews', tipo: 'Primaria', fecha: '2026-08-25', url: `${H}/2026/0825/2026082501305.pdf` },
  { id: 13, titulo: 'Change of auditor (renuncia de PwC el 12-ago-2025; propuesta de Deloitte)', editor: 'Yadea Group / HKEXnews', tipo: 'Primaria', fecha: '2025-08-13', url: `${H}/2025/0813/2025081300449.pdf` },
  { id: 14, titulo: 'Positive profit alert (beneficio de 2025 no inferior a 2.900 M RMB)', editor: 'Yadea Group / HKEXnews', tipo: 'Primaria', fecha: '2026-01-06', url: `${H}/2026/0106/2026010601006.pdf` },
  { id: 15, titulo: 'MarketScreener: estimaciones de Yadea 2025-2028 (ventas, EBITDA, EBIT, beneficio, BPA, dividendo), 12 analistas', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://www.marketscreener.com/quote/stock/YADEA-GROUP-HOLDINGS-LTD-27546367/finances/' },
  { id: 16, titulo: 'Huachuang Securities: nota sobre los resultados del 1S26 de Yadea (电摩延续高增 新国标切换致业绩承压); previsiones 2026-2028', editor: 'Gelonghui / Huachuang Securities', tipo: 'Analistas', fecha: '2026-09-24', url: 'https://m.gelonghui.com/news/5318051' },
  { id: 17, titulo: 'Guosen Securities: nota sobre el 1S26 (业绩符合预期; previsiones rebajadas; demanda adelantada por las subvenciones de 2025)', editor: 'Gelonghui / Guosen Securities', tipo: 'Analistas', fecha: '2026-09-09', url: 'https://m.gelonghui.com/news/5309079' },
];

// Cuenta: EBIT = beneficio de explotación publicado − intereses bancarios − ganancias de activos a valor razonable (productos de tesorería),
// que pasan al resultado financiero porque la caja que los genera está en el puente. Subvenciones y deducción adicional de IVA se quedan en el EBIT.
const cuenta = [
  { periodo: '2021', ingresos: 26967.5, coste_ventas: 22866.0, gastos_generales: 2100.8, ebitda: 1462.1, amortizaciones: 238.6, ebit: 1223.5, resultado_financiero: 283.5, bai: 1507.0, impuestos: 140.3, minoritarios: -2.9, beneficio_neto: 1369.5, gastos_financieros: 15.3, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 0.470, dpa: 0.229, dpa_extraordinario: 0, acciones_diluidas: 2913.8 },
  { periodo: '2022', ingresos: 31059.4, coste_ventas: 25445.4, gastos_generales: 2254.3, ebitda: 2805.8, amortizaciones: 355.8, ebit: 2450.0, resultado_financiero: 165.3, bai: 2615.3, impuestos: 432.3, minoritarios: 21.9, beneficio_neto: 2161.1, gastos_financieros: 59.4, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 0.729, dpa: 0.357, dpa_extraordinario: 0, acciones_diluidas: 2964.4 },
  { periodo: '2023', ingresos: 34762.8, coste_ventas: 28877.5, gastos_generales: 2540.9, ebitda: 3125.2, amortizaciones: 402.5, ebit: 2722.7, resultado_financiero: 297.3, bai: 3020.0, impuestos: 379.8, minoritarios: 0, beneficio_neto: 2640.2, gastos_financieros: 44.2, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 0.880, dpa: 0.435, dpa_extraordinario: 0, acciones_diluidas: 3000.2 },
  { periodo: '2024', ingresos: 28236.2, coste_ventas: 23947.3, gastos_generales: 2119.8, ebitda: 1785.9, amortizaciones: 460.4, ebit: 1325.5, resultado_financiero: 257.9, bai: 1583.4, impuestos: 311.0, minoritarios: 0, beneficio_neto: 1272.4, gastos_financieros: 36.0, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 0.421, dpa: 0.411, dpa_extraordinario: 0.210, acciones_diluidas: 3019.4 },
  { periodo: '2025', ingresos: 37008.2, coste_ventas: 29936.8, gastos_generales: 2738.2, ebitda: 3762.1, amortizaciones: 483.6, ebit: 3278.5, resultado_financiero: 315.9, bai: 3594.4, impuestos: 682.8, minoritarios: 0, beneficio_neto: 2911.6, gastos_financieros: 46.2, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 0.955, dpa: 0.468, dpa_extraordinario: 0, acciones_diluidas: 3048.8 },
];
const prod = (nombre, descripcion, xs) => ({ nombre, descripcion, tipo_resultado: null, historico: ['2021', '2022', '2023', '2024', '2025'].map((p, i) => ({ periodo: p, ingresos: xs[i], resultado: null })) });
const A = {
  _estado: 'completa',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 36058.4, ebitda: 3156.3, ebit: 2637.5, beneficio_neto: 2463.5, bpa: 0.806, dpa: 0.468, dpa_extraordinario: 0, fcf: 2281.8, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [
      { periodo: '2022', descripcion: 'Huayu (baterías de plomo y sodio), comprada en enero de 2022 (70 % por 311,5 M y el 30 % restante por 139,5 M en el año): entra desde el inicio del ejercicio y crea el segmento de baterías.' },
      { periodo: '2024', descripcion: 'Wuxi Lingbo (controladores), comprada en marzo de 2024 por 351,5 M; efecto pequeño en ventas.' },
    ],
    comentario: 'Las ventas pasaron de 26.967,5 M en 2021 a 37.008,2 M en 2025 (TCAC del 8,2 %), con dos años muy distintos: 2024 cayó un 18,8 % (unidades de 16,5 a 13,0 millones) por la espera del nuevo estándar nacional y la guerra de precios, y 2025 subió un 31,1 % (16,3 millones de unidades) con las subvenciones de renovación [A1, A2]. El margen bruto fue del 15,2 % en 2021, 18,1 % en 2022, 16,9 % en 2023, 15,2 % en 2024 y 19,1 % en 2025; la dirección atribuye la subida de 2025 a la mezcla y a la integración vertical de baterías [A2]. En el 1S26 las ventas bajaron un 5,0 %, el margen bruto cayó al 17,7 % y el beneficio un 27,2 %: las bicicletas eléctricas cayeron un 37,8 % en unidades y las motos eléctricas subieron un 63,7 % tras el cambio de estándar [A3]. Lo orgánico domina: Huayu (2022) y Lingbo (2024) son proveedores de baterías y controladores comprados para integrarse hacia atrás [A7, A10].',
    ajustes: 'Usamos las cifras publicadas. Única reclasificación: los intereses bancarios y las ganancias de los productos de tesorería (360,3 M en 2025; 339,8 M en 2024; 409,4 M en 2023; 257,6 M en 2022; 313,8 M en 2021) salen del beneficio de explotación y van al resultado financiero, porque la caja que los genera se suma en el puente [A1, A2, A5, A6]. Las subvenciones públicas (228,5 M en 2025) y la deducción adicional de IVA (172,6 M) se quedan en el EBIT: se repiten todos los años, aunque la deducción de IVA bajó a 38,4 M en el 1S26 [A3]. En el 1S26 la empresa revirtió 47,3 M de gasto en acciones por objetivos que no se cumplirán (beneficio puntual) [A3]. No hay deterioros ni reestructuraciones.',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '1S23', ingresos: 17041.1, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 1503.1, margen_ebitda_pct: 8.8, bpa: 0.395, vs_consenso: null },
      { periodo: '2S23', ingresos: 17721.7, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 1622.1, margen_ebitda_pct: 9.2, bpa: 0.485, vs_consenso: null },
      { periodo: '1S24', ingresos: 14413.8, crecimiento_pct: -15.4, crecimiento_organico_pct: null, ebitda: 1359.5, margen_ebitda_pct: 9.4, bpa: 0.344, vs_consenso: null },
      { periodo: '2S24', ingresos: 13822.4, crecimiento_pct: -22.0, crecimiento_organico_pct: null, ebitda: 426.4, margen_ebitda_pct: 3.1, bpa: 0.077, vs_consenso: 'Inferior' },
      { periodo: '1S25', ingresos: 19185.9, crecimiento_pct: 33.1, crecimiento_organico_pct: null, ebitda: 2224.7, margen_ebitda_pct: 11.6, bpa: 0.543, vs_consenso: 'Superior' },
      { periodo: '2S25', ingresos: 17822.4, crecimiento_pct: 28.9, crecimiento_organico_pct: null, ebitda: 1537.4, margen_ebitda_pct: 8.6, bpa: 0.412, vs_consenso: null },
      { periodo: '1S26', ingresos: 18236.1, crecimiento_pct: -5.0, crecimiento_organico_pct: null, ebitda: 1618.8, margen_ebitda_pct: 8.9, bpa: 0.394, vs_consenso: 'En línea' },
    ],
    ultima_presentacion: 'Yadea publica semestres y no cuelga transcripciones de sus conferencias en HKEXnews; el discurso sale de los anuncios y de las notas de los analistas. En los resultados de 2025 (30-mar-2026) la dirección habló de una demanda impulsada por «políticas públicas» y de un 2026 visto con «optimismo prudente», con el foco en el sudeste asiático y la fábrica de Vietnam de 100 M USD (un millón de unidades de capacidad inicial) [A2]. En el 1S26 (25-ago-2026) el tono cambió: «periodo de ajuste» tras el paso completo al nuevo estándar, presión «a corto plazo» en las bicicletas eléctricas, Año Nuevo tardío y recuperación en mayo y junio; espera que la demanda interior se recupere «gradualmente» en el 2S [A3]. No dio cifras de ventas en el extranjero ni de existencias en los distribuidores, que es lo que más preguntan los analistas; Guosen atribuye la caída de 2026 a la demanda adelantada por las subvenciones de 2025 [A17]. Huachuang y Guosen consideraron el semestre «en línea» con lo esperado, pero recortaron sus previsiones de beneficio de 2026 un 26 % y un 14 % [A16, A17]. El mismo día Yadea anunció la compra de Jinjian por 1.020 M en efectivo, que el mercado recibió con una caída cercana al 4 % [A12].',
    confianza: 'Media',
  },
  balance: {
    historico: [
      { periodo: '2021', activo_total: 19407.8, activo_corriente: 15014.5, pasivo_corriente: 14327.9, pasivo_total: 14895.4, fondo_comercio: 0, intangibles: 47.6, inmovilizado_material: 2211.6, existencias: 1194.2, clientes: 392.6, proveedores: 12758.2, activos_contrato: null, pasivos_contrato: null, caja: 9943.4, deuda_financiera: 398.4, arrendamientos: 127.5, patrimonio_neto: 4500.2, minoritarios: 12.2, reservas: 4631.8 },
      { periodo: '2022', activo_total: 24952.7, activo_corriente: 17395.0, pasivo_corriente: 17520.4, pasivo_total: 18310.1, fondo_comercio: 683.9, intangibles: 313.1, inmovilizado_material: 3291.2, existencias: 1458.0, clientes: 388.3, proveedores: 13592.9, activos_contrato: null, pasivos_contrato: null, caja: 11191.1, deuda_financiera: 1781.9, arrendamientos: 129.3, patrimonio_neto: 6642.4, minoritarios: 0.2, reservas: 6763.8 },
      { periodo: '2023', activo_total: 25660.1, activo_corriente: 16841.9, pasivo_corriente: 16396.3, pasivo_total: 17258.9, fondo_comercio: 683.9, intangibles: 273.4, inmovilizado_material: 3940.3, existencias: 955.4, clientes: 545.9, proveedores: 13672.2, activos_contrato: null, pasivos_contrato: null, caja: 11903.6, deuda_financiera: 832.5, arrendamientos: 153.4, patrimonio_neto: 8401.0, minoritarios: 0.2, reservas: 8424.2 },
      { periodo: '2024', activo_total: 24618.9, activo_corriente: 15672.9, pasivo_corriente: 15046.6, pasivo_total: 15860.8, fondo_comercio: 706.7, intangibles: 333.3, inmovilizado_material: 4904.5, existencias: 1279.4, clientes: 457.7, proveedores: 11871.4, activos_contrato: null, pasivos_contrato: null, caja: 10480.1, deuda_financiera: 1440.1, arrendamientos: 149.4, patrimonio_neto: 8757.9, minoritarios: 0.2, reservas: 8426.7 },
      { periodo: '2025', activo_total: 29996.7, activo_corriente: 16994.8, pasivo_corriente: 18872.5, pasivo_total: 19534.8, fondo_comercio: 706.7, intangibles: 286.5, inmovilizado_material: 5280.6, existencias: 1426.6, clientes: 470.3, proveedores: 14099.5, activos_contrato: null, pasivos_contrato: null, caja: 14580.2, deuda_financiera: 1823.5, arrendamientos: 128.7, patrimonio_neto: 10461.7, minoritarios: 0.2, reservas: 10486.1 },
    ],
    vencimientos: [{ anio: '2026', importe: 796.8 }, { anio: '2027', importe: 112.2 }, { anio: '2028', importe: 103.8 }, { anio: '2029', importe: 145.1 }],
    liquidez: 'A 30-jun-2026: efectivo 7.122,8 M + depósitos a plazo 3.333,7 M + productos de tesorería y depósitos estructurados 4.317,0 M (más 155,9 M de acciones, bonos y participaciones a valor razonable) = 14.929,4 M de caja que usamos en el puente; aparte, 3.557,2 M de depósitos pignorados que garantizan los efectos a pagar [A3].',
    rating: 'Sin rating',
    coste_deuda_pct: 1.5,
    vida_media_anios: null,
    otros_pasivos: 'El pasivo que importa no es la deuda (796,8 M de préstamos bancarios a tipo fijo del 0,6-1,25 % y 272,1 M de préstamos públicos sin interés para fábricas a 30-jun-2026) sino el comercial: 13.670,4 M de proveedores, de ellos 6.858,2 M en efectos (bills payable) garantizados con 3.557,2 M de depósitos pignorados [A3]. Los efectos son financiación de proveedores sin interés explícito: los dejamos en el circulante y excluimos los depósitos pignorados de la caja del puente (estimación prudente; sumarlos daría ≈ 1,15 RMB más por acción). Hay 1.408,0 M de dividendo de 2025 por pagar a 30-jun (en otros_ajustes) y un compromiso de 1.020 M por Jinjian firmado el 25-ago-2026 [A3, A12]. Sin pensiones de prestación definida, garantías ni contingencias relevantes según la empresa [A2]. Edificios por 674,9 M pignorados por la financiación pública [A3].',
    comentario: 'Yadea trabaja con circulante muy negativo: a 31-dic-2025 existencias 1.426,6 M + clientes 470,3 M frente a 14.099,5 M de proveedores, −33,0 % de las ventas [A1]. Cobra por adelantado a los distribuidores (pasivos por contratos de 492,6 M a 30-jun-2026) y paga a 30-90 días o con efectos [A3]. Esa financiación de proveedores es la mitad de la caja: si las ventas bajan, el circulante devuelve caja a los proveedores (2024: flujo operativo de solo 298,9 M) [A1]. En el 1S26 los clientes subieron a 1.007,3 M (615,9 M un año antes, +64 % con ventas −5 %) y las existencias a 1.795,6 M: más crédito a los distribuidores en un mercado flojo [A3, A8]. Deuda financiera de 1.068,9 M frente a 14.929,4 M de caja: caja neta de unos 13.860 M antes del dividendo y de Jinjian.',
    confianza: 'Alta',
  },
  flujos: {
    historico: [
      { periodo: '2021', flujo_operativo: 3693.0, capex: 1408.7, pagos_arrendamientos: 40.9, adquisiciones: 66.0, desinversiones: 45.1, dividendos: 453.5, recompras: 33.7, emision_acciones: 18.1, intereses_en_financiacion: 0 },
      { periodo: '2022', flujo_operativo: 3078.4, capex: 664.9, pagos_arrendamientos: 50.0, adquisiciones: 507.5, desinversiones: 79.6, dividendos: 705.3, recompras: 0, emision_acciones: 743.8, intereses_en_financiacion: 35.6 },
      { periodo: '2023', flujo_operativo: 3580.1, capex: 1335.5, pagos_arrendamientos: 61.4, adquisiciones: 39.6, desinversiones: 29.8, dividendos: 1094.6, recompras: 11.7, emision_acciones: 93.1, intereses_en_financiacion: 10.6 },
      { periodo: '2024', flujo_operativo: 298.9, capex: 1504.2, pagos_arrendamientos: 81.6, adquisiciones: 185.2, desinversiones: 21.0, dividendos: 859.5, recompras: 132.1, emision_acciones: 62.7, intereses_en_financiacion: 11.7 },
      { periodo: '2025', flujo_operativo: 5989.8, capex: 787.4, pagos_arrendamientos: 59.4, adquisiciones: 0, desinversiones: 63.4, dividendos: 1250.6, recompras: 49.0, emision_acciones: 0, intereses_en_financiacion: 20.9 },
    ],
    comentario: 'La conversión depende del circulante: en cinco años el flujo operativo sumó 16.640 M frente a 10.355 M de beneficio, pero año a año oscila de 298,9 M (2024, ventas −18,8 % y proveedores −1.800 M) a 5.989,8 M (2025, ventas +31,1 % y proveedores +2.228 M) [A1, A5, A6]. En el 1S26 fue de 1.626,0 M (4.726,6 M en el 1S25) por el menor beneficio, más clientes y existencias y más impuestos pagados [A3]. El capex (incluye terrenos) fue del 2,1 % al 5,3 % de las ventas; 2023-2024 fueron años de fábricas nuevas (Chongqing, Indonesia, Vietnam) y 2025-1S26 bajan al 2 %. Estimación propia: mantenimiento ≈ amortización (≈ 1,3-1,6 % de las ventas); el resto, crecimiento. Las compras de productos de tesorería (40.215 M brutos en 2025) son gestión de caja, no inversión.',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'Deloitte Touche Tohmatsu (desde el 22-sep-2025; antes PricewaterhouseCoopers)',
    anios_auditor: 1,
    opinion: 'Favorable (2025, sin salvedades); asunto clave: reconocimiento de ingresos con distribuidores (descuentos y devoluciones)',
    comentario: 'PwC, auditor desde la salida a bolsa, dimitió el 12-ago-2025 «teniendo en cuenta la situación actual del negocio y las necesidades futuras de auditoría» antes de empezar la auditoría de 2025; el consejo dice que no hubo desacuerdos y nombró a Deloitte [A13, A1]. Deloitte dio opinión favorable y señaló como asunto clave los ingresos: muchos distribuidores, gran volumen de descuentos y devoluciones descontados de la venta, y visitas para comprobar que los distribuidores existen [A1]. No se capitaliza I+D (1.404,5 M a gastos en 2025) [A2]. El gasto en acciones fue de 179,0 M en 2025 y se revirtieron 47,3 M en el 1S26 [A1, A3]. El beneficio de 2025 incluye 360,3 M de intereses y productos de tesorería y 401,1 M de subvenciones y deducción de IVA [A2]. Señales a vigilar: el cambio de auditor a mitad de año, los clientes que crecen un 64 % con ventas a la baja en el 1S26 y la red de distribuidores que pasó de más de 3.660 a 5.122 en 2025, el año de las subvenciones (riesgo de existencias en el canal) [A10, A1, A3]. Lectura de los indicadores del motor en la sección de calidad.',
    senales: [
      { senal: 'Cambio de auditor a mitad de año (PwC → Deloitte, ago-sep 2025)', nivel: 'Media', comentario: 'Sin desacuerdos declarados; PwC no había empezado la auditoría de 2025. Deloitte firmó sin salvedades [A13, A1].' },
      { senal: 'Clientes +64 % con ventas −5 % (30-jun-2026 frente a 30-jun-2025)', nivel: 'Media', comentario: '1.007,3 M frente a 615,9 M: más crédito a distribuidores en plena caída del mercado; posible empuje de existencias al canal [A3, A8].' },
      { senal: 'Red de distribuidores de 3.660 a 5.122 en 2025', nivel: 'Baja', comentario: 'Crecimiento rápido de la red en el año de las subvenciones; no se publican existencias del canal [A10, A1].' },
      { senal: 'Beneficio apoyado en tesorería y subvenciones', nivel: 'Baja', comentario: 'Intereses y productos de tesorería (360,3 M) y subvenciones e IVA (401,1 M) suman el 21 % del beneficio antes de impuestos de 2025 [A2].' },
    ],
    confianza: 'Media',
  },
  capital: {
    politica: 'Sin política escrita de reparto. En la práctica, dividendo final anual: 28 céntimos de HKD por 2021, 40 por 2022, 48 por 2023, 22 más 23 extraordinarios por 2024 y 53 por 2025 (≈ 49 % del beneficio de 2025) [A1, A2]. No paga dividendo a cuenta (tampoco en el 1S26) [A3]. No recompra para amortizar: el plan de acciones compra en el mercado (4,3 M de acciones por 53,0 M HKD en 2025 y 2,8 M por 30,2 M HKD en el 1S26) [A2, A3]. Prioridades declaradas: fábricas en el sudeste asiático, I+D en baterías (sodio) y conectividad, y compras para integrarse [A2, A12].',
    adquisiciones: [
      { anio: '2022', objetivo: 'Huayu New Energy (baterías de plomo y sodio), 100 % en dos pasos', importe: 451.0, ev_ebitda: null, financiacion: 'Caja (311,5 M el 70 % y 139,5 M el 30 %); asumió 1.990,5 M de deuda de Huayu', resultado: 'Integración vertical de baterías: el segmento de baterías dio 621,3 M de beneficio bruto en 2025; fondo de comercio de 683,9 M sin deterioro [A1, A7].' },
      { anio: '2024', objetivo: 'Wuxi Lingbo Electronic (controladores)', importe: 351.5, ev_ebitda: null, financiacion: 'Caja (incluye 24,3 M contingentes)', resultado: 'Fondo de comercio de 22,8 M sin deterioro; demasiado pequeña para medir [A10, A1].' },
      { anio: '2026', objetivo: 'Jinjian/Garow (bicicletas y motos eléctricas para repartidores; ventas de 2.680 M y beneficio antes de impuestos de 139,0 M en 2025, sin auditar)', importe: 1020.0, ev_ebitda: null, financiacion: 'Caja; pago de 25 % a cuenta en depósito, 70 % al cierre y 5 % a los 12 meses; precio rebajable si el beneficio del 2S26 es menor de 50 M', resultado: 'Pendiente de cierre: ≈ 7,3 veces el beneficio antes de impuestos de 2025 y 0,38 veces las ventas [A12].' },
    ],
    comentario: 'Asignación prudente: la caja creció de 9.943 M (2021) a 14.580 M (2025) mientras se pagaron 4.363 M de dividendos en cinco años y se invirtieron 5.700 M en capex [A1, A6]. Las compras son pequeñas e integradoras (baterías, controladores) y la de Jinjian, a 7,3 veces el beneficio antes de impuestos, es más barata que la propia Yadea. La única dilución fue la colocación de 68,8 M de acciones a 12,58 HKD en 2022 (727,8 M RMB) para el extranjero, ya gastada [A2]. Lo discutible: la caja es grande para un negocio con circulante negativo y la empresa no recompra a 9 HKD; el dividendo del 49 % es razonable.',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      prod('Bicicletas eléctricas', 'Bicicletas eléctricas (estándar GB 17761), ≤ 25 km/h; desde sep-2025, con el nuevo estándar.', [9767.7, 12827.5, 15952.1, 12244.2, 16208.7]),
      prod('Motos eléctricas (e-scooters)', 'Ciclomotores y motos eléctricas ligeras que se matriculan; ganan peso tras el nuevo estándar.', [10208.6, 9145.2, 8635.3, 7090.6, 9045.9]),
      prod('Baterías y cargadores', 'Baterías de plomo, litio y sodio (Huayu) y cargadores, vendidas con los vehículos y como recambio.', [6583.8, 8397.8, 9249.6, 7995.5, 10523.1]),
      prod('Piezas', 'Recambios y piezas de vehículos de dos ruedas.', [407.5, 689.0, 925.7, 906.0, 1230.5]),
    ],
    geografias: [{ nombre: 'China', peso_pct: 98.0 }, { nombre: 'Extranjero (sudeste asiático y otros)', peso_pct: 2.0 }],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Vehículos vendidos (millones)', valor_anterior: '13,02 (2024)', valor_actual: '16,27 (2025)', variacion: '+25,0 %', comentario: '1S26: 7,63 millones (−13,2 %) [A2, A3].' },
      { kpi: 'Bicicletas eléctricas (millones)', valor_anterior: '9,09 (2024)', valor_actual: '11,45 (2025)', variacion: '+26,0 %', comentario: '1S26: 4,15 millones (−37,8 %) [A2, A3].' },
      { kpi: 'Motos eléctricas (millones)', valor_anterior: '3,93 (2024)', valor_actual: '4,82 (2025)', variacion: '+22,5 %', comentario: '1S26: 3,48 millones (+63,7 %) [A2, A3].' },
      { kpi: 'Ingreso medio por vehículo (RMB)', valor_anterior: '1.485 (2024)', valor_actual: '1.552 (2025)', variacion: '+4,5 %', comentario: '1S26: 1.663 RMB por la mezcla hacia motos (estimación propia con ventas y unidades) [A2, A3].' },
      { kpi: 'Margen bruto', valor_anterior: '15,2 % (2024)', valor_actual: '19,1 % (2025)', variacion: '+3,9 puntos', comentario: '1S26: 17,7 % (19,6 % en el 1S25) [A2, A3].' },
      { kpi: 'Distribuidores en China', valor_anterior: '> 3.660 (2024)', valor_actual: '5.122 (2025)', variacion: '+40 %', comentario: 'Más de 40.000 puntos de venta en los dos años [A10, A1].' },
    ],
  },
  fuentes: fA,
  huecos: [
    { seccion: 'negocio', campo: 'geografias (cifra exacta del extranjero)', tipo: 'Complemento', intentos: '1) Informe anual 2025: no da geografías porque más del 90 % es China; 2) informe semestral 2026: igual; 3) prensa (FT vía Guancha): ≈ 2 % de las ventas en 2025', decision: 'Calculado y marcado como estimación' },
  ],
};
guarda('A', A);

// ================================================================ B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Guanyan Tianxia (观研天下): mercado chino de dos ruedas eléctricas, 63,7 millones de unidades vendidas en 2025; exportaciones a la ASEAN', editor: 'chinabaogao.com', tipo: 'Sectorial', fecha: '2026-07-24', url: 'https://www.chinabaogao.com/free/202607/808406.html' },
  { id: 2, titulo: 'Tailing (台铃) y su folleto en HKEX: cuotas por ingresos de Frost & Sullivan en 2024 (Yadea 26,8 % en China, Aima 17,9 %, Tailing 12,7 %)', editor: 'Jiemian / Bullet Finance', tipo: 'Prensa', fecha: '2026-03-11', url: 'https://www.jiemian.com/article/14095608.html' },
  { id: 3, titulo: 'NDRC y Ministerio de Finanzas: aviso sobre la renovación de bienes de consumo en 2026 (sin bicicletas eléctricas)', editor: 'NDRC', tipo: 'Primaria', fecha: '2025-12-30', url: 'https://www.ndrc.gov.cn/xwdt/tzgg/202512/t20251230_1402852.html' },
  { id: 4, titulo: '2026 «国补» continúa: categorías de 2026 (sin bicicletas eléctricas, que salen junto con el hogar)', editor: 'Wallstreetcn', tipo: 'Prensa', fecha: '2026-01', url: 'https://wallstreetcn.com/articles/3762313' },
  { id: 5, titulo: 'Ministerio de Comercio: 2025, más de 12,5 millones de bicicletas eléctricas renovadas con subvención (1,38 millones en 2024)', editor: 'Yangzi Evening News / Xinhua', tipo: 'Prensa', fecha: '2026-01-02', url: 'https://www.yzwb.net/news/ch/202601/t20260102_307126.html' },
  { id: 6, titulo: 'Nuevo estándar GB 17761-2024: producción desde el 1-sep-2025 y fin de la venta de bicicletas del estándar antiguo el 1-dic-2025', editor: 'The Paper (澎湃)', tipo: 'Prensa', fecha: '2025-11', url: 'https://www.thepaper.cn/newsDetail_forward_32178198' },
  { id: 7, titulo: 'Yicai (第一财经): ventas interiores −12,6 % en el 1S26 y −17,4 % en el 1T (AVC); descuentos de 400-800 RMB en tienda; fin de la subvención', editor: 'Eastmoney / Yicai', tipo: 'Prensa', fecha: '2026-09-11', url: 'https://finance.eastmoney.com/a/202609103870731742.html' },
  { id: 8, titulo: 'Yicai (第一财经): certificados 3C de bicicletas eléctricas suspendidos en Yadea, Tailing, Aima y Ninebot; reglas nuevas desde el 1-nov-2026', editor: 'Yicai', tipo: 'Prensa', fecha: '2026-10-16', url: 'https://www.yicai.com/news/103397150.html' },
  { id: 9, titulo: 'Guanyan Tianxia: motos eléctricas en China, 3,51 millones vendidas en 2025; Yadea primera con el 26,3 %; CR5 74,9 %', editor: 'chinabaogao.com', tipo: 'Sectorial', fecha: '2026-02-04', url: 'https://www.chinabaogao.com/jingzheng/202602/778531.html' },
  { id: 10, titulo: 'Observer.net: Yadea, ≈ 2 % de las ventas en el extranjero en 2025; objetivo de 450.000 unidades fuera en 2026; fábricas en seis países', editor: 'Guancha (观察者网)', tipo: 'Prensa', fecha: '2026-05-17', url: 'https://c.m.163.com/news/a/KT54JGL1051481US.html' },
  { id: 11, titulo: 'Yahoo Finance: cuentas anuales 2022-2025 de Aima, Ninebot, NIU y Xinri (fundamentals timeseries) y datos de mercado', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/603529.SS/' },
  { id: 12, titulo: 'Tailing: folleto de HKEX (resumen de prensa): ventas de 11.880 M (2023), 13.600 M (2024) y 14.840 M (9M25); margen bruto 14,6 %', editor: 'Beijing News', tipo: 'Prensa', fecha: '2026-02', url: 'https://www.bjnews.com.cn/detail-1770039210129337.html' },
  { id: 13, titulo: '2025 Annual Report de Yadea: perfil (8 fábricas, capacidad de más de 20 millones, 2.000 patentes, 5.122 distribuidores), riesgos', editor: 'Yadea Group / HKEXnews', tipo: 'Primaria', fecha: '2026-04-24', url: `${H}/2026/0424/2026042401612.pdf` },
  { id: 14, titulo: 'Announcement of interim results 1S26 de Yadea (perspectivas, extranjero, nuevo estándar)', editor: 'Yadea Group / HKEXnews', tipo: 'Primaria', fecha: '2026-08-25', url: `${H}/2026/0825/2026082500215.pdf` },
  { id: 15, titulo: 'Subida de precios de fábrica de Yadea del 1-abr-2026 (más de 300 RMB por vehículo) y metales +40 %, plásticos +80 %', editor: 'National Business Daily (每日经济新闻)', tipo: 'Prensa', fecha: '2026-04-01', url: 'https://www.nbd.com.cn/articles/2026-04-01/4320364.html' },
];
const B = {
  _estado: 'completa',
  negocio: {
    descripcion: 'Yadea diseña, fabrica y vende vehículos eléctricos de dos ruedas con su marca: bicicletas eléctricas (≤ 25 km/h, sin carné), motos eléctricas ligeras y sus baterías y cargadores. En 2025 vendió 16,3 millones de vehículos, el primer fabricante del mundo por unidades [B13, A2]. Tiene ocho fábricas propias (Wuxi, Qingyuan, Ningbo, Jinzhai, Chongqing, Tianjin, Bac Ninh en Vietnam e Indonesia) con más de 20 millones de unidades de capacidad, seis centros de I+D y más de 2.000 patentes [B13]. Vende casi todo en China a través de 5.122 distribuidores y más de 40.000 puntos de venta; el cliente final es el que usa la bici o la moto para ir al trabajo, a la compra o a repartir. Fuera de China vende en más de 100 países, con el sudeste asiático como prioridad; el extranjero fue ≈ 2 % de las ventas en 2025 [B10]. Desde 2022 fabrica sus baterías de plomo y de sodio (Huayu) [A7].',
    como_gana_dinero: 'Vende el vehículo al distribuidor, que paga por adelantado, y paga a los proveedores a 30-90 días o con efectos: el negocio se financia con proveedores (circulante del −33 % de las ventas) [A1]. El ingreso medio por vehículo es bajo (≈ 1.550 RMB en 2025) y el margen bruto del 15-19 %: el beneficio depende de volumen, mezcla (motos y modelos de gama alta, más caros) y del coste del plomo, el litio, el acero, el aluminio y los plásticos, que son ≈ 80 % del coste [A2]. Nada es recurrente salvo el recambio de baterías (28 % de las ventas con cargadores). La demanda es estacional (más en primavera y verano) y sensible a las normas: un cambio de estándar o una subvención mueven millones de unidades en un año [B5, B6]. El apalancamiento operativo es alto: en 2024 las ventas cayeron un 18,8 % y el EBIT un 51 %.',
    clientes: 'No hay concentración: ningún cliente llega al 10 % de las ventas [A2]. Los clientes directos son 5.122 distribuidores independientes, con contratos anuales, descuentos por volumen y obligación de pagar antes de recibir; el auditor revisa su existencia con visitas [A1]. El poder de precios es limitado: Yadea subió los precios de fábrica más de 300 RMB por vehículo desde el 1-abr-2026 cuando los metales subieron un 40 % y los plásticos un 80 % [B15], pero en septiembre de 2026 las tiendas hacían descuentos de 400-800 RMB y un modelo C09 bajó de 2.399 a 1.799 RMB [B7]. La marca permite cobrar algo más que Tailing (margen bruto de Yadea 19,6 % en el 1S25 frente a 14,6 % de Tailing en 9M25) [B2, B12].',
  },
  sector: {
    definicion: 'Mercado de vehículos eléctricos de dos ruedas en China (bicicletas eléctricas y motos eléctricas ligeras), medido en ingresos de los fabricantes. Es el mercado de la cuota del 26,8 % de Frost & Sullivan para Yadea en 2024 [B2]. No hay una cifra oficial en RMB: la estimamos a partir de esa cuota y de las ventas de Yadea en China (≈ 26.000 M en 2024 → ≈ 97.000 M) y la contrastamos con la de Tailing (12,7 % con 13.600 M de ventas → ≈ 107.000 M) [B2, B12]. En unidades, 59,1 millones en 2024 y 63,7 millones en 2025 [B1]. El extranjero (sudeste asiático) es un mercado aparte, sobre todo de motos de gasolina por electrificar.',
    tamano: '≈ 102.000 M RMB en 2024 (estimación propia con las cuotas de Frost & Sullivan) y 63,7 millones de unidades vendidas en 2025 [B1, B2]',
    unidad_serie: 'millones de RMB (estimación propia: unidades × ingreso medio de fábrica)',
    serie: [
      { anio: '2023', tamano: 94000 }, { anio: '2024', tamano: 102000 }, { anio: '2025', tamano: 115000 },
      { anio: '2026e', tamano: 104000 }, { anio: '2027e', tamano: 106000 }, { anio: '2028e', tamano: 109000 },
    ],
    tcac_historico_pct: 3.0,
    tcac_previsto_pct: 1.5,
    cr5_pct: 75.0,
    estructura: 'Concentrada',
    drivers: [
      { driver: 'Nuevo estándar GB 17761-2024', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Producción con el estándar nuevo desde el 1-sep-2025 y fin de la venta de las antiguas el 1-dic-2025 [B6]: adelantó compras en 2025 y deprimió las bicicletas en 2026 (Yadea −37,8 % en el 1S26) [A3].' },
      { driver: 'Subvenciones de renovación (以旧换新)', efecto: '−', horizonte: 'Cíclico', evidencia: '12,5 millones de bicicletas renovadas con subvención en 2025 (≈ 20 % del mercado) frente a 1,38 millones en 2024 [B5]; en 2026 las bicicletas eléctricas salen de la lista nacional [B3, B4].' },
      { driver: 'Parque y reposición', efecto: '+', horizonte: 'Estructural', evidencia: 'Unos 420 millones de vehículos en circulación (uno por cada tres habitantes) con baterías de vida corta: la reposición sostiene 55-60 millones de ventas al año [B2, B1].' },
      { driver: 'Electrificación del sudeste asiático', efecto: '+', horizonte: 'Estructural', evidencia: 'Exportaciones chinas a ocho países de la ASEAN de 2,34 millones de unidades en 2025, con TCAC del 29 % en 2020-2025; Indonesia 1,26 millones [B1].' },
      { driver: 'Costes de materias primas', efecto: '−', horizonte: 'Cíclico', evidencia: 'Metales +40 % y plásticos +80 % en 2026 según el sector [B15]; el margen bruto de Yadea bajó del 19,6 % al 17,7 % en el 1S26 [A3].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 4, justificacion: 'Descuentos de 400-800 RMB en tienda en septiembre de 2026 con el mercado interior −12,6 % en el 1S26 [B7]; Ninebot crece con producto conectado.' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Consumidor sensible al precio (ingreso medio ≈ 1.550 RMB) [A2], pero los distribuidores pagan por adelantado y están atomizados (5.122) [B13].' },
      { fuerza: 'Poder de los proveedores', intensidad: 3, justificacion: 'Plomo, litio, metales y plásticos ≈ 80 % del coste; Yadea se integró en baterías y controladores (Huayu, Lingbo) [A2, A7].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Certificación 3C más estricta, nuevo estándar y red de distribución; los pequeños salen del mercado (CR5 de motos eléctricas 74,9 %) [B8, B9].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 2, justificacion: 'Transporte público, bicicletas compartidas y coches pequeños; la moto eléctrica sigue siendo el transporte más barato para 420 millones de usuarios [B2].' },
    ],
    ciclo: { posicion: 'Contracción', comentario: 'Lo dicen tres indicadores: ventas interiores −12,6 % en el 1S26 (−17,4 % en el 1T) [B7], fin de la subvención nacional en 2026 [B3] y descuentos en tienda en septiembre [B7]. El sector ya vivió dos ciclos parecidos: el cambio de estándar de 2019 (Yadea +60 % en 2020, cuando se renovó el parque) y la caída de 2024 (ventas de Yadea −18,8 %, unidades −21 %) antes del nuevo estándar [A1, A6]. En 2008-09 y en 2022 el sector apenas notó la macro: lo mueven las normas, no el PIB.' },
    regulacion: 'GB 17761-2024: velocidad máxima de 25 km/h, peso máximo, prohibición de piezas que permitan la manipulación y más requisitos de seguridad; producción desde el 1-sep-2025 y venta desde el 1-dic-2025 [B6]. Baterías y cargadores de litio con 3C obligatoria desde el 1-nov-2025 [B6]. Reglas nuevas de certificación 3C de bicicletas eléctricas desde el 1-nov-2026, con certificados suspendidos en Yadea, Tailing, Aima y Ninebot desde septiembre por cambios no comunicados y muestras distintas de la producción [B8]. Subvención de renovación: 2024-2025 sí; 2026 fuera de la lista nacional [B3, B5].',
    tendencias: 'Tres cambios. (1) Mezcla hacia motos eléctricas y modelos conectados: las motos de Yadea pasaron del 19,8 % al 35,3 % de las ventas en un año [A3] y Ninebot gana cuota con producto inteligente [B7]. (2) Baterías de sodio y litio en lugar de plomo: Yadea produce en masa bicicletas con sodio desde enero de 2025 [A2]. (3) Salida al exterior: fábricas en Vietnam (un millón de unidades iniciales), Indonesia y Tailandia para competir con Honda y Yamaha en la electrificación de las motos [A2, B10]. Yadea gana con (2) y (3) por escala e integración, y pierde algo de cuota en (1) frente a Ninebot.',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 26.8,
    posicion: '1.º de China por ingresos en 2024 (26,8 % según Frost & Sullivan) y 1.º del mundo por unidades; 1.º en motos eléctricas en 2025 (26,3 %) [B2, B9]',
    competidores: [
      { nombre: 'Aima Technology (爱玛)', pais: 'China', ticker: '603529.SS', ingresos: 25095, cuota_pct: 17.9, margen_ebit_pct: 8.4, comentario: '2.º del mercado; más bicicletas y gama media, con margen bruto del 18,3 % en 2025 [B11, B2].' },
      { nombre: 'Tailing (台铃)', pais: 'China', ticker: null, ingresos: 13600, cuota_pct: 12.7, margen_ebit_pct: null, comentario: '3.º; ventas de 13.600 M y beneficio de 472 M en 2024 (3,5 % neto), margen bruto del 14,6 % en 9M25; prepara su salida a bolsa en Hong Kong [B12, B2].' },
      { nombre: 'Ninebot (九号)', pais: 'China', ticker: '689009.SS', ingresos: 21278, cuota_pct: null, margen_ebit_pct: 8.9, comentario: 'Producto conectado y más caro; incluye patinetes y robots cortacésped; ventas de dos ruedas +18,9 % en unidades en el 1S26 [B11, B7].' },
      { nombre: 'NIU Technologies (小牛)', pais: 'China', ticker: 'NIU', ingresos: 4308, cuota_pct: null, margen_ebit_pct: -2.0, comentario: 'Gama alta de litio; pérdidas de 196 M en el 1S26 [B11, B7].' },
      { nombre: 'Xinri (新日)', pais: 'China', ticker: '603787.SS', ingresos: 4113, cuota_pct: null, margen_ebit_pct: 1.1, comentario: 'Marca tradicional que pierde escala: ventas de 4.904 M en 2022 a 4.113 M en 2025 [B11].' },
      { nombre: 'Luyuan (绿源)', pais: 'China', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: '2.º en motos eléctricas en 2025 (16,9 %) [B9].' },
    ],
    foso: {
      veredicto: 'Estrecho',
      tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'Red de 5.122 distribuidores y 40.000 puntos de venta y servicio [B13]: densidad útil para el usuario, pero no es un efecto de red.' },
        { fuente: 'Costes de cambio', puntuacion: 0, evidencia: 'Un vehículo de ≈ 1.550-2.400 RMB que se cambia cada pocos años; nada ata al cliente.' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'Marca líder con 26,8 % de cuota; margen bruto 4-5 puntos por encima de Tailing [B2, B12]; más de 2.000 patentes [B13].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Mayor escala del mundo (16,3 millones) e integración en baterías y controladores; EBIT del 8,9 % en 2025 frente al 8,4 % de Aima con el doble de unidades [A2, B11].' },
        { fuente: 'Escala eficiente', puntuacion: 2, evidencia: 'El mercado se concentra con cada norma (3C, nuevo estándar) y los pequeños salen; pero Ninebot ha entrado con éxito en diez años [B8, B7].' },
      ],
    },
    amenazas: 'La amenaza principal es la competencia en precio en un mercado que se encoge: si el mercado interior se queda en ≈ 50-55 millones de unidades, Aima, Tailing y Ninebot pelearán por la misma reposición con descuentos (ya 400-800 RMB) [B7]. Probabilidad alta de un 2026-2027 con márgenes por debajo de 2025. Segunda: Ninebot y las marcas conectadas pueden quitar a Yadea la gama alta y joven (probabilidad media). Tercera: un endurecimiento de la certificación que pare modelos durante meses (los certificados suspendidos de octubre de 2026) [B8]. A favor de Yadea, cada norma nueva expulsa a fabricantes pequeños.',
  },
  historia: {
    resumen: 'Dong Jinggui y Qian Jinghong, matrimonio que había trabajado en una fábrica de motos, fundaron Jiangsu Yadea en Wuxi en 2001 [B13]. La empresa creció con la ola de las bicicletas eléctricas y salió a bolsa en Hong Kong el 19-may-2016 [A1]. El cambio de estándar de 2019 y la estrategia de gama alta la llevaron de 11.968 M de ventas en 2019 a 26.968 M en 2021 [A6]. En 2022 compró Huayu (baterías) y colocó 68,8 M de acciones para financiar fábricas fuera; en 2023 superó los 16,5 millones de unidades; 2024 fue un año de caída (−18,8 %) y 2025, con las subvenciones, el récord: 37.008 M de ventas y 2.912 M de beneficio [A1, A2]. En 2026 la abrumadora caída de las bicicletas tras el nuevo estándar y el fin de la subvención la devolvieron a un año de ajuste.',
    hitos: [
      { anio: '2001', hito: 'Fundación de Yadea en Wuxi por Dong Jinggui y Qian Jinghong.' },
      { anio: '2016', hito: 'Salida a bolsa en la bolsa de Hong Kong (19 de mayo).' },
      { anio: '2019', hito: 'Primer estándar nacional obligatorio y primera fábrica fuera (Vietnam); reposicionamiento hacia la gama alta.' },
      { anio: '2020', hito: 'Ventas +62 % hasta 19.360 M: renovación del parque con el estándar de 2019; la acción multiplica por ocho.' },
      { anio: '2022', hito: 'Compra de Huayu (baterías) y colocación de 68,8 M de acciones para la expansión exterior.' },
      { anio: '2024', hito: 'Ventas −18,8 %: espera del nuevo estándar y guerra de precios; compra de Lingbo (controladores).' },
      { anio: '2025', hito: 'Récord de 16,3 millones de vehículos y 2.912 M de beneficio con las subvenciones; bicicletas de sodio en serie; cambio de auditor.' },
      { anio: '2026', hito: 'Fábrica de Vietnam (Bac Ninh, 100 M USD); caída del 1S26; compra de Jinjian por 1.020 M.' },
    ],
    confianza: 'Alta',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Tres asuntos con cifras. (1) Seguridad del producto: los incendios de baterías de litio llevaron a la 3C obligatoria de baterías desde el 1-nov-2025 y al endurecimiento de la certificación de vehículos en 2026; certificados suspendidos pueden parar ventas durante meses [B6, B8]. (2) Plomo y reciclaje de baterías: las de plomo siguen siendo mayoría y Huayu las fabrica; el sodio reduce el riesgo [A2]. (3) Cadena de suministro y trabajo: 11.339 empleados, con quejas de horas extra en foros en septiembre de 2026 (opinión, sin cifra) [A3]. El informe ESG de 2025 se publicó en HKEXnews el 24-abr-2026.',
    controversias: 'Sin multas ni litigios relevantes publicados en tres años. La empresa declara no tener pasivos contingentes materiales [A2]. Lo más cercano a una controversia es la suspensión de certificados 3C de modelos de bicicletas eléctricas en septiembre-octubre de 2026, que comparte con Tailing, Aima y Ninebot [B8].',
    confianza: 'Media',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'sector', campo: 'tamano en RMB (cifra publicada)', tipo: 'Complemento', intentos: '1) Folleto de Tailing en HKEX vía prensa: solo cuotas de Frost & Sullivan; 2) Guanyan Tianxia: unidades, no RMB; 3) derivado de las cuotas y las ventas de Yadea y Tailing', decision: 'Calculado y marcado como estimación' },
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) Informe ESG 2025 (10 MB, no descargado por tamaño); 2) web de MSCI (requiere registro); 3) prensa: sin calificación con fecha', decision: 'Omitido' },
  ],
};
guarda('B', B);

// ================================================================ C. Directivos y gobierno
const fC = [
  { id: 1, titulo: '2025 Annual Report: consejo, perfiles, informe de gobierno, remuneraciones (nota 9) y participaciones', editor: 'Yadea Group / HKEXnews', tipo: 'Primaria', fecha: '2026-04-24', url: `${H}/2026/0424/2026042401612.pdf` },
  { id: 2, titulo: 'Poll results of AGM held on 17 June 2026', editor: 'Yadea Group / HKEXnews', tipo: 'Primaria', fecha: '2026-06-17', url: `${H}/2026/0617/2026061700816.pdf` },
  { id: 3, titulo: 'Poll results of AGM held on 17 June 2025', editor: 'Yadea Group / HKEXnews', tipo: 'Primaria', fecha: '2025-06-17', url: `${H}/2025/0617/2025061700580.pdf` },
  { id: 4, titulo: 'Poll results of AGM held on 17 June 2024', editor: 'Yadea Group / HKEXnews', tipo: 'Primaria', fecha: '2024-06-17', url: `${H}/2024/0617/2024061700659.pdf` },
  { id: 5, titulo: 'Interim Report 2026 (participaciones a 30-jun-2026; comité de auditoría)', editor: 'Yadea Group / HKEXnews', tipo: 'Primaria', fecha: '2026-09-24', url: `${H}/2026/0924/2026092400916.pdf` },
  { id: 6, titulo: 'Resignation of independent non-executive director (Wong Lung Ming, 29-abr-2026)', editor: 'Yadea Group / HKEXnews', tipo: 'Primaria', fecha: '2026-04-27', url: `${H}/2026/0427/2026042701537.pdf` },
  { id: 7, titulo: 'Appointment of independent non-executive director (He Ping, 18-jun-2026)', editor: 'Yadea Group / HKEXnews', tipo: 'Primaria', fecha: '2026-06-17', url: `${H}/2026/0617/2026061700822.pdf` },
  { id: 8, titulo: 'Change of auditor (PwC dimite el 12-ago-2025)', editor: 'Yadea Group / HKEXnews', tipo: 'Primaria', fecha: '2025-08-13', url: `${H}/2025/0813/2025081300449.pdf` },
  { id: 9, titulo: 'Circular de la junta de 2026: mandatos de emisión y recompra, reelecciones', editor: 'Yadea Group / HKEXnews', tipo: 'Primaria', fecha: '2026-04-24', url: `${H}/2026/0424/2026042401652.pdf` },
  { id: 10, titulo: 'Positive profit alert de 17-jun-2025 y de 6-ene-2026 y profit warning de 27-dic-2024', editor: 'Yadea Group / HKEXnews', tipo: 'Primaria', fecha: '2026-01-06', url: `${H}/2026/0106/2026010601006.pdf` },
  { id: 11, titulo: 'Annual results 2025 announcement (perspectivas de 2026)', editor: 'Yadea Group / HKEXnews', tipo: 'Primaria', fecha: '2026-03-30', url: `${H}/2026/0330/2026033000323.pdf` },
];
const C = {
  _estado: 'completa',
  directivos: {
    equipo: [
      { nombre: 'Dong Jinggui', cargo: 'Presidente del consejo y cofundador', desde: '2001', participacion_pct: 62.96, trayectoria: 'Seis años en una fábrica de motos antes de fundar Yadea en 2001; preside el grupo desde la salida a bolsa. Llevó las ventas de 7.850 M (2017) a 37.008 M (2025) [C1].' },
      { nombre: 'Qian Jinghong', cargo: 'Consejera delegada y vicepresidenta; cofundadora', desde: '2019', participacion_pct: 62.96, trayectoria: 'Cofundadora (esposa de Dong Jinggui); consejera delegada desde el 14-may-2019. En su mandato las ventas se triplicaron y la empresa se integró en baterías [C1].' },
      { nombre: 'Shi Rui', cargo: 'Director financiero', desde: '2014', participacion_pct: null, trayectoria: 'En el grupo desde marzo de 2014; contable público certificado en China; antes en auditoría y finanzas corporativas [C1].' },
      { nombre: 'Shen Yu', cargo: 'Consejero ejecutivo y secretario del consejo', desde: '2005', participacion_pct: null, trayectoria: 'En el grupo desde 2005; asuntos públicos y relaciones externas [C1].' },
      { nombre: 'Wang Jiazhong', cargo: 'Vicepresidente sénior', desde: '1999', participacion_pct: null, trayectoria: 'En el grupo desde 1999; fue presidente del grupo hasta noviembre de 2024 [C1].' },
      { nombre: 'Zhou Chao', cargo: 'Vicepresidente sénior', desde: '2007', participacion_pct: null, trayectoria: 'En el grupo desde 2007; presidente del grupo entre octubre de 2022 y septiembre de 2023 [C1].' },
    ],
    historial_guidance: [
      { anio: '2024', guia: 'Sin guía numérica; aviso de beneficio a la baja el 27-dic-2024', real: 'Beneficio de 1.272,4 M (−51,8 %)', cumplida: 'Parcial' },
      { anio: '2025', guia: 'Sin guía numérica; avisos positivos el 17-jun-2025 y el 6-ene-2026 (beneficio ≥ 2.900 M)', real: 'Beneficio de 2.911,6 M', cumplida: 'Sí' },
      { anio: '2026', guia: '«Optimismo prudente» y recuperación gradual de la demanda interior en el 2S26 (sin cifra)', real: '1S26: ventas −5,0 %, beneficio −27,2 %', cumplida: 'Parcial' },
    ],
    comentario: 'Equipo fundador estable: el matrimonio fundador lleva 25 años al frente y controla el 62,96 % a través de un fideicomiso familiar [C1]. No hay guía numérica; la empresa avisa con «profit alerts» cuando el beneficio se mueve más de lo normal y esos avisos se cumplieron [C10]. La rotación está en la presidencia operativa (Wang Jiazhong y Zhou Chao se alternaron como presidentes del grupo) y no en la cúpula. No hay plan de sucesión publicado para los fundadores (57 y 54 años).',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Dong Jinggui', cargo: 'Presidente', tipo: 'Ejecutivo', desde: '2014', comisiones: 'Nombramientos (presidente)' },
      { nombre: 'Qian Jinghong', cargo: 'Consejera delegada', tipo: 'Ejecutivo', desde: '2014', comisiones: '—' },
      { nombre: 'Shen Yu', cargo: 'Consejero', tipo: 'Ejecutivo', desde: '2014', comisiones: '—' },
      { nombre: 'Chen Mingyu', cargo: 'Consejero independiente', tipo: 'Independiente', desde: '2023', comisiones: 'Auditoría (presidente)' },
      { nombre: 'Ma Chenguang', cargo: 'Consejera independiente', tipo: 'Independiente', desde: '2023', comisiones: 'Remuneraciones (presidenta), auditoría' },
      { nombre: 'Liang Qin', cargo: 'Consejera independiente', tipo: 'Independiente', desde: '2023', comisiones: 'Auditoría, remuneraciones, nombramientos' },
      { nombre: 'He Ping', cargo: 'Consejero independiente', tipo: 'Independiente', desde: '2026', comisiones: 'Auditoría, remuneraciones, nombramientos' },
    ],
    presidente_ceo_separados: true,
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
    voto_remuneracion_pct: 99.42,
    voto_remuneracion_contra_pct: 0.58,
    voto_remuneracion_contra_libre_pct: 2.0,
    voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 3.81, fijo: null, variable_corto: null, variable_largo: 0, ratio_salario_medio: 14 },
    remuneracion: 'En Hong Kong no se vota un informe de remuneraciones: la junta autoriza al consejo a fijar la de los consejeros (99,72 % a favor en 2026, 99,42 % en 2025) [C2, C3]. En 2025 el presidente cobró 5,04 M RMB y la consejera delegada 3,81 M (2,61 M y 1,14 M en 2024): sueldo y bonus discrecional «según mercado, rendimiento individual y contribución», sin métricas publicadas [C1]. Los fundadores no reciben acciones; el plan de RSU de directivos y empleados tiene condiciones de rendimiento no detalladas (en el 1S26 se revirtieron 47,3 M porque no se cumplirán) [C5]. Sin cláusulas de recuperación publicadas. Ratio frente al coste medio por empleado ≈ 14 veces (3,81 M frente a ≈ 0,28 M de 3.133,9 M entre 11.245 empleados; estimación propia) [C1].',
    accionistas: [
      { nombre: 'DQ Prosperity Group (fideicomiso de Dong Jinggui y Qian Jinghong)', pct: 62.96, tipo: 'Control (fundadores)', variacion: 'Sin cambios a 30-jun-2026; compró acciones en enero de 2024 [C1, C5]' },
      { nombre: 'Fideicomiso del plan de acciones', pct: 1.85, tipo: 'Autocartera consolidada', variacion: '76,5 M a 31-dic-2025 → 57,6 M a 30-jun-2026 (entregas a empleados) [C5]' },
      { nombre: 'Capital flotante', pct: 35.19, tipo: 'Libre', variacion: 'Ningún otro accionista declara más del 5 % [C1]' },
    ],
    insiders: [],
    control_y_defensas: 'Los fundadores controlan el 62,96 % mediante un fideicomiso discrecional (DQ Prosperity Trust; fiduciario Trident Trust) [C1]. Una clase de acciones, sin límites de voto ni blindajes; sociedad de las Islas Caimán. Tres de siete consejeros son ejecutivos y familia o colaboradores directos; cuatro independientes, todos con menos de cuatro años en el cargo [C1, C7]. No hay operaciones vinculadas relevantes declaradas en 2025 [C1]. En la junta de 2026 el mandato para emitir hasta un 20 % de acciones nuevas recibió un 23,06 % de votos en contra (≈ 79 % del capital libre presente) y el de reemitir recompradas un 20,55 % [C2]: los minoritarios rechazan la dilución, pero el voto de control lo aprueba.',
    alertas: [
      'Cambio de auditor a mitad de año: PwC dimitió el 12-ago-2025 antes de empezar la auditoría de 2025; Deloitte desde el 22-sep-2025 [C8].',
      'Rotación de independientes: Wong Lung Ming dimitió el 29-abr-2026 por otros compromisos y entró He Ping el 18-jun-2026 [C6, C7].',
      'El mandato de emisión del 20 % se aprobó con ≈ 79 % del capital libre presente en contra (junta de 2026) [C2].',
    ],
    confianza: 'Media',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'insiders (operaciones de 12 meses)', tipo: 'Complemento', intentos: '1) Registro DI de HKEX (di.hkex.com.hk): la búsqueda exige un formulario con estado de sesión que no se pudo automatizar; 2) informe semestral 2026: participación del fundador sin cambios (62,96 %); 3) HKEXnews: sin avisos voluntarios de compras en 12 meses (los últimos, enero de 2024)', decision: 'Omitido' },
    { seccion: 'gobierno', campo: 'remuneracion_ceo (fijo y variable por separado)', tipo: 'Complemento', intentos: '1) Nota 9 del anual 2025: «sueldos y otras asignaciones» sin separar el bonus; 2) informe de gobierno 2025: sin desglose; 3) circular de 2026: sin desglose', decision: 'Omitido' },
  ],
};
guarda('C', C);

// ================================================================ D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Yahoo Finance, históricos diarios (1585.HK, 2800.HK, 2828.HK): precio, rango, rentabilidades, betas, volatilidad, cierres de ejercicio', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/1585.HK/history/' },
  { id: 2, titulo: 'Yahoo Finance quoteSummary: comparables (precio, capitalización, valor empresa, EBITDA, estimaciones de ventas y BPA) y consenso de Yadea', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/1585.HK/analysis/' },
  { id: 3, titulo: 'MarketScreener: estimaciones 2026-2028 de Yadea, 12 analistas, objetivo medio 12,21 CNY, recomendación media Comprar', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://www.marketscreener.com/quote/stock/YADEA-GROUP-HOLDINGS-LTD-27546367/finances/' },
  { id: 4, titulo: 'Curva de la deuda pública china (中债国债收益率曲线), 10 años a 21-oct-2026: 1,6412 %', editor: 'ChinaBond (中央国债登记结算)', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://yield.chinabond.com.cn/' },
  { id: 5, titulo: 'Damodaran: prima implícita del S&P 500 (ERPbymonth, octubre de 2026: 4,20 %)', editor: 'NYU Stern', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 6, titulo: 'Yahoo Finance: tipos de cambio HKD/CNY, USD/CNY, JPY/CNY, INR/CNY (21-oct-2026) y HKD/CNY de fin de año 2019-2025', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/HKDCNY=X/' },
  { id: 7, titulo: 'Monthly Return de septiembre de 2026 (acciones emitidas)', editor: 'Yadea Group / HKEXnews', tipo: 'Primaria', fecha: '2026-10-02', url: `${H}/2026/1002/2026100200700.pdf` },
  { id: 8, titulo: 'Discloseable transaction: Jinjian/Garow (1.020 M RMB; ventas 2.680 M y beneficio antes de impuestos 139,0 M en 2025)', editor: 'Yadea Group / HKEXnews', tipo: 'Primaria', fecha: '2026-08-25', url: `${H}/2026/0825/2026082501305.pdf` },
  { id: 9, titulo: '2022 Annual Report, nota 40-41: compra de Huayu (311,5 M el 70 %; 139,5 M el 30 %)', editor: 'Yadea Group / HKEXnews', tipo: 'Primaria', fecha: '2023-04-26', url: `${H}/2023/0426/2023042601737.pdf` },
  { id: 10, titulo: '2024 Annual Report, nota 38: compra de Wuxi Lingbo (351,5 M)', editor: 'Yadea Group / HKEXnews', tipo: 'Primaria', fecha: '2025-04-24', url: `${H}/2025/0424/2025042402045.pdf` },
  { id: 11, titulo: '10jqka: caída de casi el 4 % tras la compra de Jinjian; Citi, BofA y UBS bajan sus objetivos', editor: '同花顺财经', tipo: 'Prensa', fecha: '2026-08-29', url: 'https://stock.10jqka.com.cn/20260829/c679415306.shtml' },
  { id: 12, titulo: 'Huachuang Securities: previsiones 2026-2028 de beneficio (2.410/2.860/3.180 M) y objetivo de 13 HKD', editor: 'Gelonghui / Huachuang', tipo: 'Analistas', fecha: '2026-09-24', url: 'https://m.gelonghui.com/news/5318051' },
  { id: 13, titulo: 'Guosen Securities: BPA 0,91/1,12/1,24 RMB en 2026-2028 (rebajados), «superar al mercado»', editor: 'Gelonghui / Guosen', tipo: 'Analistas', fecha: '2026-09-09', url: 'https://m.gelonghui.com/news/5309079' },
  { id: 14, titulo: 'Yicai: suspensión de certificados 3C de bicicletas eléctricas (Yadea, Tailing, Aima, Ninebot); reglas nuevas el 1-nov-2026', editor: 'Yicai', tipo: 'Prensa', fecha: '2026-10-16', url: 'https://www.yicai.com/news/103397150.html' },
  { id: 15, titulo: 'Caiwen: Yadea sube más de un 5 % el 12-oct-2026 (9,48 HKD)', editor: 'Caiwen News', tipo: 'Prensa', fecha: '2026-10-12', url: 'https://www.caiwennews.com/article/1645203.shtml' },
  { id: 16, titulo: 'HKEXnews: lista de documentos de Yadea (stockId 140627) del 1-ene-2021 al 21-oct-2026: sin anuncios desde la declaración mensual del 2-oct-2026', editor: 'HKEXnews', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://www1.hkexnews.hk/search/titlesearch.xhtml' },
];
// Comparables: per_ntm con el BPA de los próximos 12 meses (ejercicio natural: 2/12 de 2026e + 10/12 de 2027e; ejercicio a marzo: 5,3/12 del
// que acaba en mar-27 + 6,7/12 del de mar-28). Capitalización en millones de RMB. EV/EBITDA LTM de Yahoo (Honda incluye su financiera).
const sel = [
  ['Aima Technology', '603529.SS', 'CN', 'dic'], ['Ninebot', '689009.SS', 'CN', 'dic'], ['Loncin Motor', '603766.SS', 'CN', 'dic'], ['Zhejiang CFMoto', '603129.SS', 'CN', 'dic'],
  ['Honda Motor', '7267.T', 'JP', 'mar'], ['Hero MotoCorp', 'HEROMOTOCO.NS', 'IN', 'mar'], ['Bajaj Auto', 'BAJAJ-AUTO.NS', 'IN', 'mar'], ['TVS Motor', 'TVSMOTOR.NS', 'IN', 'mar'],
];
export const comparables = sel.map(([nombre, t, pais, fy]) => {
  const y = yd[t];
  const tr = Object.fromEntries((y.trend || []).map((x) => [x.periodo, x]));
  const [w0, w1] = fy === 'dic' ? [2 / 12, 10 / 12] : [5.3 / 12, 6.7 / 12];
  const bpaNtm = w0 * tr['0y'].bpa + w1 * tr['+1y'].bpa;
  const ventasNtm = w0 * tr['0y'].ventas + w1 * tr['+1y'].ventas;
  const fxc = FX[y.divisa_cuentas]; const fxp = FX[y.divisa];
  const cap = (y.cap ?? (y.acciones ? y.precio * y.acciones : (y.ev - (y.deuda ?? 0) + (y.caja ?? 0)))) * fxp / 1e6; // TVS: Yahoo sin cap; EV − deuda + caja
  const dn = ((y.deuda ?? 0) - (y.caja ?? 0)) * fxc / 1e6;
  return {
    nombre, ticker: t, pais, capitalizacion: Math.round(cap),
    ev_ventas: r2(y.ev_ventas), ev_ebitda_ltm: r1(y.ev_ebitda), ev_ebitda_ntm: null,
    per_ntm: r1(y.precio / bpaNtm), crecimiento_pct: r1((ventasNtm / y.ventas - 1) * 100),
    margen_ebitda_pct: r1(y.margen_ebitda * 100), roic_pct: null,
    dn_ebitda: y.ebitda > 0 ? r2(dn / (y.ebitda * fxc / 1e6)) : null,
    fcf_yield_pct: y.fcf != null && cap ? r1((y.fcf * fxc / 1e6) / cap * 100) : null,
  };
});
const precioHKD = bolsa.identificacion.precio;
const b = bolsa.bolsa;
const D = {
  _estado: 'completa',
  identificacion: {
    nombre: 'Yadea Group Holdings Ltd.', nombre_corto: 'Yadea', ticker: '1585.HK', isin: 'KYG9830F1063', mercado: 'Bolsa de Hong Kong (Main Board)', indice_referencia: 'Hang Seng (Tracker Fund 2800.HK)',
    pais: 'China', pais_iso: 'CN', sector: 'Consumo discrecional', industria: 'Motocicletas y vehículos de dos ruedas', sede: 'Wuxi (Jiangsu); sede legal en las Islas Caimán', fundacion: '2001', empleados: 11339, web: 'www.yadea.com.cn',
    precio: r2(precioHKD * FX.HKD), fecha_precio: bolsa.identificacion.fecha_precio, acciones: 3106.4, capitalizacion_publicada: Math.round(yd['1585.HK'].cap * FX.HKD / 1e6), free_float_pct: 35.2,
    max_52s: r2(bolsa.identificacion.max_52s * FX.HKD), min_52s: r2(bolsa.identificacion.min_52s * FX.HKD), volumen_medio_diario: `≈ ${bolsa.volumen_3m.importe_dia_millones} M HKD/día (3 meses)`, proximos_resultados: '2027-03-30',
  },
  consenso: {
    guidance: 'Yadea no da guía numérica. En marzo de 2026 la dirección se declaró «prudentemente optimista» y fijó un objetivo de 450.000 vehículos vendidos fuera de China en 2026 (310.000 antes) [D3]; en agosto habló de recuperación «gradual» de la demanda interior en el 2S26 [A3]. Sin plan a medio plazo publicado. Última confirmación: anuncio del 1S26, 25-ago-2026.',
    estimaciones: [
      { periodo: '2026e', ingresos: 38613, ebitda: 3628, ebit: 3046, bpa: 0.856, dpa: 0.41, fuente: 'MarketScreener, 12 analistas [D3]' },
      { periodo: '2027e', ingresos: 43471, ebitda: 4319, ebit: 3677, bpa: 1.032, dpa: 0.478, fuente: 'MarketScreener [D3]' },
      { periodo: '2028e', ingresos: 47321, ebitda: 4888, ebit: 4224, bpa: 1.169, dpa: 0.53, fuente: 'MarketScreener [D3]' },
    ],
    recomendaciones: { n_analistas: 12, comprar: null, mantener: null, vender: null, po_medio: 12.21, po_min: r2(yd['1585.HK'].po_min * FX.HKD), po_max: r2(yd['1585.HK'].po_max * FX.HKD) },
    revisiones: 'Recortes fuertes. El BPA de 2026e en Yahoo pasó de 1,047 RMB hace 90 días a 1,057 hace 30 y a 0,860 hoy (−18 %); el de 2027e, de 1,201 a 1,031 (−14 %) [D2]. Huachuang bajó su beneficio de 2026e de 3.270 a 2.410 M y Guosen de 3.276 a 2.829 M tras el 1S26 [D12, D13]. Citi, BofA y UBS bajaron sus objetivos tras la compra de Jinjian [D11]. Causa: la caída de las bicicletas eléctricas tras el nuevo estándar, el fin de la subvención y el margen bruto más bajo. Las ventas de 2026e del consenso (38.613 M, +4,3 %) parecen atrasadas frente a un 1S26 de −5,0 %; el BPA ya está corregido. Única fuente completa: MarketScreener, contrastada con Yahoo (9 analistas, BPA 0,860) y con dos casas chinas.',
    base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: 0.97,
    confianza: 'Media',
  },
  bolsa: {
    tipo_rentabilidad: b.tipo_rentabilidad,
    rentabilidades: b.rentabilidades,
    anual: b.anual.filter((x) => +x.anio >= 2019),
    beta: b.beta, volatilidad_pct: b.volatilidad_pct, max_drawdown_pct: b.max_drawdown_pct, posicion_corta_pct: null,
    comentario: 'La acción multiplicó por ocho en 2020 con la renovación del parque tras el estándar de 2019 y desde entonces cae: −4,3 % anual a cinco años frente a +1,7 % del Hang Seng, y −23,8 % en un año frente a −6,3 % [D1]. La caída máxima de cinco años es del −53,7 % (mar-2023 a oct-2026). En 2025 bajó un 9,1 % con un beneficio que se duplicó: el mercado no pagó el año de las subvenciones porque lo vio como pico. En 2026 cae un 16,0 % con la caída de las bicicletas, el recorte de previsiones y la compra de Jinjian [D1, D11]. Hoy, 21-oct, ha caído un 5,0 % (9,49 → 9,02 HKD) sin anuncio en HKEXnews; coincide con la suspensión de certificados 3C del sector [D14, D16].',
  },
  multiplos_historicos: {
    serie: bolsa.cierres_ejercicio.filter((x) => +x.anio >= 2021).map((x) => ({ anio: x.anio, precio_cierre: r2(x.precio_cierre * { 2021: 0.81615, 2022: 0.89188, 2023: 0.90350, 2024: 0.94003, 2025: 0.89912 }[x.anio]), ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    comentario: 'Cierres en HKD convertidos a RMB con el tipo de fin de año [D1, D6]. Yadea ha cotizado entre 12,5 y 29,5 veces el beneficio del año siguiente desde 2020; hoy, ≈ 9 veces nuestro BPA de 2027e. El descuento tiene causa: 2025 fue un año de subvenciones y el mercado lo trata como pico (en 2025 la acción cayó con el beneficio duplicado); 2024 mostró lo que pasa en un año malo (BPA −52 %); y la tasa libre china ha bajado, lo que no ha subido el múltiplo. Lo estructural: el mercado interior ya no crece y el extranjero es aún pequeño (≈ 2 % de las ventas).',
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Dos grupos: fabricantes chinos de dos ruedas (Aima, el rival directo; Ninebot, el que gana cuota; Loncin y CFMoto, motos de gasolina y eléctricas) y los grandes de motos de Asia con los que Yadea compite en el sudeste asiático (Honda) o que electrifican sus gamas (Hero, Bajaj, TVS). Fuera NIU y Xinri (pérdidas o beneficio residual: PER sin sentido), Tailing (no cotiza) y Eicher (motos de lujo). Las indias cotizan con prima por su mercado; por eso el peso de comparables es bajo.',
    empresas: comparables,
    comentario: null,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2026-08', objetivo: 'Jinjian/Garow (bicicletas y motos eléctricas)', comprador: 'Yadea', ev: 1020, ev_ventas: 0.38, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '7,3 veces el beneficio antes de impuestos de 2025 (139,0 M, sin auditar); precio rebajable [D8].' },
      { fecha: '2022-01', objetivo: 'Huayu New Energy (baterías)', comprador: 'Yadea', ev: null, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '451 M por el 100 % en dos pasos y 1.990,5 M de deuda asumida; sin cifras de ventas publicadas [D9].' },
      { fecha: '2024-03', objetivo: 'Wuxi Lingbo Electronic (controladores)', comprador: 'Yadea', ev: 351.5, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Integración hacia atrás; sin múltiplo publicado [D10].' },
    ],
    comentario: 'Pocas operaciones con múltiplo en el sector: casi todas son compras de proveedores o de marcas pequeñas. La única con cifras, Jinjian, se pagó a 0,38 veces las ventas y ≈ 7,3 veces el beneficio antes de impuestos: menos de lo que cotiza Yadea (0,5 veces las ventas de valor empresa). Yadea no es objeto probable de una oferta: los fundadores tienen el 62,96 %. El peso de este método es cero.',
    confianza: 'Baja',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'transacciones', campo: 'operaciones con múltiplo (mínimo 3)', tipo: 'Complemento', intentos: '1) Anuales de Yadea: Huayu y Lingbo sin múltiplo; 2) operaciones de rivales (Bajaj-KTM, Hero-Ather, Gogoro): sin cifras de valor empresa comparables o fuera del sector de dos ruedas eléctricas chino; 3) prensa: sin múltiplos publicados', decision: 'Omitido' },
    { seccion: 'bolsa', campo: 'posicion_corta_pct', tipo: 'Complemento', intentos: '1) HKEX, posiciones cortas agregadas (web dinámica); 2) Yahoo: no da el dato para Hong Kong; 3) prensa: sin dato', decision: 'Omitido' },
    { seccion: 'consenso', campo: 'recomendaciones (desglose)', tipo: 'Complemento', intentos: '1) MarketScreener: solo la media («Comprar»); 2) Yahoo: sin desglose para 1585.HK; 3) prensa: casas chinas en compra (Huachuang, Guosen)', decision: 'Omitido' },
  ],
};
guarda('D', D);

// ================================================================ E. Sentimiento
const fE = [
  { id: 1, titulo: 'Guba (东方财富股吧), foro de Yadea (hk01585): mensajes del 21-sep al 21-oct-2026', editor: 'Eastmoney Guba', tipo: 'Foros y redes', fecha: '2026-10-21', url: 'https://guba.eastmoney.com/list,hk01585.html' },
  { id: 2, titulo: 'Guba: hilos sobre la suspensión de certificados 3C (14-16 de octubre de 2026)', editor: 'Eastmoney Guba', tipo: 'Foros y redes', fecha: '2026-10-16', url: 'https://guba.eastmoney.com/list,hk01585.html' },
  { id: 3, titulo: 'Guba: hilos sobre Ninebot y el reparto del mercado («九号挤进第一梯队», 29-sep-2026)', editor: 'Eastmoney Guba', tipo: 'Foros y redes', fecha: '2026-09-29', url: 'https://guba.eastmoney.com/list,hk01585.html' },
];
const E = {
  _estado: 'completa',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Empeora',
    revisadas: [
      { plataforma: 'Guba (东方财富股吧), hk01585', fecha: '2026-10', n_comentarios: 60, tono: 'Dividido', resumen: 'Muchos mensajes cortos: unos compran «por debajo de 10» por el PER bajo y otros se quejan de la caída del 21-oct («一字断魂刀») y de que las bicicletas sin certificado «no se pueden matricular» [E1].' },
      { plataforma: 'Guba, hilos sobre la certificación 3C', fecha: '2026-10', n_comentarios: 15, tono: 'Negativo', resumen: 'Se comparten noticias de la suspensión de certificados («terremoto del sector») y un mensaje sostiene que la limpieza favorece a los grandes porque los pequeños no pasarán la inspección [E2].' },
      { plataforma: 'Guba, hilos sobre competidores', fecha: '2026-09', n_comentarios: 12, tono: 'Negativo', resumen: 'Se comenta que Ninebot entra en el primer grupo y que la ventaja de los líderes se estrecha; algún usuario compara con Aima y con una bicicleta de Tesla de 1.399 RMB [E3].' },
    ],
    temas: [
      { tema: 'Valoración baja («por debajo de 10 HKD, comprar»)', postura: 'Alcista', peso: 'Alto', contraste: 'Cierto en múltiplo (≈ 9 veces nuestro BPA de 2027e y caja neta de ≈ 40 % de la capitalización), pero el BPA de 2026 cae ≈ 24 % y el mercado descuenta que 2025 fue el pico (nota D).' },
      { tema: 'Certificados 3C suspendidos', postura: 'Bajista', peso: 'Alto', contraste: 'Cierto y sin cuantificar: Yicai confirma modelos de Yadea afectados; la empresa no ha publicado nada (notas B y D).' },
      { tema: 'Competencia de Ninebot', postura: 'Bajista', peso: 'Medio', contraste: 'Cierto: Ninebot +18,9 % en unidades en el 1S26 frente a −13,2 % de Yadea (nota B).' },
      { tema: 'Sudeste asiático y petróleo caro', postura: 'Alcista', peso: 'Medio', contraste: 'La dirección lo confirma pero sin cifras; ≈ 2 % de las ventas en 2025 y objetivo de 450.000 unidades en 2026 (nota B).' },
    ],
    lectura: 'El particular chino está dividido y cansado: compra en los mínimos por el PER bajo, pero cada noticia regulatoria lo asusta. No hay euforia ni capitulación clara. Aporta un riesgo que las cifras aún no recogen, la suspensión de certificados 3C de octubre, que el informe incorpora en el contexto de mercado. Va más cauto que los analistas, todos en «comprar» con objetivos ≈ 60 % por encima del precio.',
    confianza: 'Baja',
  },
  fuentes: fE,
  huecos: [],
};
guarda('E', E);
console.log('Notas A-E escritas;', comparables.length, 'comparables:', comparables.map((c) => `${c.nombre} cap ${c.capitalizacion} PER ${c.per_ntm} EV/EBITDA ${c.ev_ebitda_ltm} g ${c.crecimiento_pct} m ${c.margen_ebitda_pct}`).join('; '));
