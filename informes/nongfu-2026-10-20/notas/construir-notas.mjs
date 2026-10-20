// Escribe las notas A-E de Nongfu Spring Co., Ltd. (9633.HK; corte 2026-10-20; Hong Kong ya ha cerrado: precio del cierre de hoy).
// Fuentes primarias: HKEXnews (informes anuales 2021-2025, anuncio de resultados 2025, anuncio e informe del 1S26, informes
// semestrales 2024 y 2025, declaración mensual de acciones de sep-2026, juntas de 2024-2026, operaciones vinculadas, avisos de
// participaciones del registro DI de HKEX). Bolsa y comparables: Yahoo Finance; consenso: MarketScreener y Yahoo; bono: ChinaBond.
// Foro: Guba (Eastmoney). Cada nota cita solo con [n] de su propia lista.
// Ejecutar: node informes/nongfu-2026-10-20/notas/construir-notas.mjs
// Ejercicio natural (31-dic). Cifras en millones de RMB salvo que se diga otra cosa; la acción H cotiza en HKD.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const H = 'https://www1.hkexnews.hk/listedco/listconews/sehk';
const bolsa = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const yd = JSON.parse(fs.readFileSync(path.join(dir, 'yahoo-datos.json'), 'utf8')).datos;
// Tipos de cambio (Yahoo Finance, 20-oct-2026): RMB por unidad.
const FX = { CNY: 1, HKD: 0.8507, JPY: 0.04219, EUR: 7.4879, USD: 6.6664, GBP: 8.8806 };
const r1 = (x) => (x == null || !isFinite(x) ? null : Math.round(x * 10) / 10);
const r2 = (x) => (x == null || !isFinite(x) ? null : Math.round(x * 100) / 100);

// ================================================================ A. Cuentas
const fA = [
  { id: 1, titulo: '2025 Annual Report: estados consolidados NIIF de 2025 y 2024 auditados por Ernst & Young, notas de segmentos, otros ingresos, impuestos, dividendos, remuneración y participaciones', editor: 'Nongfu Spring / HKEXnews', tipo: 'Primaria', fecha: '2026-04-17', url: `${H}/2026/0417/2026041701389.pdf` },
  { id: 2, titulo: 'Announcement of annual results for the year ended December 31, 2025 (ventas por categoría, margen bruto, gastos, dividendo final de 0,99 RMB)', editor: 'Nongfu Spring / HKEXnews', tipo: 'Primaria', fecha: '2026-03-24', url: `${H}/2026/0324/2026032401065.pdf` },
  { id: 3, titulo: 'Announcement of 2026 interim results (cuenta, balance y segmentos del 1S26; revisado por Ernst & Young)', editor: 'Nongfu Spring / HKEXnews', tipo: 'Primaria', fecha: '2026-08-25', url: `${H}/2026/0825/2026082501292.pdf` },
  { id: 4, titulo: '2026 Interim Report (estado de flujos del 1S26, plan de acciones, participaciones)', editor: 'Nongfu Spring / HKEXnews', tipo: 'Primaria', fecha: '2026-09-24', url: `${H}/2026/0924/2026092401877.pdf` },
  { id: 5, titulo: '2024 Annual Report: estados de 2024 y 2023 (flujos, otros ingresos) y explicación de la caída del agua en 2024', editor: 'Nongfu Spring / HKEXnews', tipo: 'Primaria', fecha: '2025-04-25', url: `${H}/2025/0425/2025042503151.pdf` },
  { id: 6, titulo: '2023 Annual Report: estados de 2023 y 2022 y segmentos', editor: 'Nongfu Spring / HKEXnews', tipo: 'Primaria', fecha: '2024-04-18', url: `${H}/2024/0418/2024041802052.pdf` },
  { id: 7, titulo: '2022 Annual Report: estados de 2022 y 2021, segmentos y otros ingresos', editor: 'Nongfu Spring / HKEXnews', tipo: 'Primaria', fecha: '2023-04-14', url: `${H}/2023/0414/2023041400852.pdf` },
  { id: 8, titulo: '2021 Annual Report: estados de 2021 y 2020', editor: 'Nongfu Spring / HKEXnews', tipo: 'Primaria', fecha: '2022-04-28', url: `${H}/2022/0428/2022042803673.pdf` },
  { id: 9, titulo: '2025 Interim Report (1S25 y 1S24: cuenta, flujos y otros ingresos)', editor: 'Nongfu Spring / HKEXnews', tipo: 'Primaria', fecha: '2025-09-23', url: `${H}/2025/0923/2025092300352.pdf` },
  { id: 10, titulo: '2024 Interim Report (1S24 y 1S23)', editor: 'Nongfu Spring / HKEXnews', tipo: 'Primaria', fecha: '2024-09-20', url: `${H}/2024/0920/2024092001250.pdf` },
  { id: 11, titulo: 'Monthly Return de septiembre de 2026 (5.034.666.400 acciones H y 6.211.800.000 domésticas; sin autocartera)', editor: 'Nongfu Spring / HKEXnews', tipo: 'Primaria', fecha: '2026-10-02', url: `${H}/2026/1002/2026100203295.pdf` },
];

// Cuenta (RMB M). EBIT = beneficio antes de impuestos − ingresos por intereses − ganancias de activos financieros a valor razonable
// − diferencias de cambio netas + gastos financieros. Subvenciones, venta de desechos y otros ingresos se quedan en el EBIT (recurrentes).
// EBITDA = EBIT + amortización de inmovilizado, derechos de uso e intangibles [A1, A5, A6, A7, A8].
const cuenta = [
  { periodo: '2021', ingresos: 29696.4, coste_ventas: 12040.2, gastos_generales: 8984.0, ebitda: 11559.2, amortizaciones: 2378.2, ebit: 9181.0, resultado_financiero: 173.3, bai: 9354.3, impuestos: 2192.5, minoritarios: 0, beneficio_neto: 7161.8, gastos_financieros: 52.9, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 0.64, dpa: 0.45, dpa_extraordinario: 0, acciones_diluidas: 11246.5 },
  { periodo: '2022', ingresos: 33239.2, coste_ventas: 14143.8, gastos_generales: 9655.8, ebitda: 12618.0, amortizaciones: 2486.9, ebit: 10131.1, resultado_financiero: 919.2, bai: 11050.3, impuestos: 2555.1, minoritarios: 0, beneficio_neto: 8495.3, gastos_financieros: 76.0, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 0.76, dpa: 0.68, dpa_extraordinario: 0, acciones_diluidas: 11246.5 },
  { periodo: '2023', ingresos: 42667.2, coste_ventas: 17260.4, gastos_generales: 11446.4, ebitda: 17382.1, amortizaciones: 2631.4, ebit: 14750.7, resultado_financiero: 937.5, bai: 15688.2, impuestos: 3608.7, minoritarios: 0, beneficio_neto: 12079.5, gastos_financieros: 99.7, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 1.07, dpa: 0.75, dpa_extraordinario: 0, acciones_diluidas: 11246.5 },
  { periodo: '2024', ingresos: 42896.0, coste_ventas: 17980.3, gastos_generales: 11135.8, ebitda: 17752.5, amortizaciones: 2874.7, ebit: 14877.8, resultado_financiero: 910.1, bai: 15787.9, impuestos: 3664.6, minoritarios: 0, beneficio_neto: 12123.3, gastos_financieros: 91.5, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 1.08, dpa: 0.76, dpa_extraordinario: 0, acciones_diluidas: 11246.5 },
  { periodo: '2025', ingresos: 52552.9, coste_ventas: 20744.8, gastos_generales: 12252.6, ebitda: 23824.7, amortizaciones: 3392.6, ebit: 20432.1, resultado_financiero: 485.5, bai: 20917.6, impuestos: 5049.3, minoritarios: 0, beneficio_neto: 15868.3, gastos_financieros: 66.9, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 1.41, dpa: 0.99, dpa_extraordinario: 0, acciones_diluidas: 11246.5 },
];
const seg = (nombre, descripcion, xs) => ({ nombre, descripcion, tipo_resultado: 'EBIT', historico: ['2021', '2022', '2023', '2024', '2025'].map((p, i) => ({ periodo: p, ingresos: xs[i][0], resultado: xs[i][1] })) });

const A = {
  _estado: 'completa',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 56648.8, ebitda: 25804.7, ebit: 22190.6, beneficio_neto: 17133.0, bpa: 1.52, dpa: 0.99, dpa_extraordinario: 0, fcf: 14266, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [],
    comentario: 'Las ventas pasaron de 29.696 M en 2021 a 52.553 M en 2025 (+15,3 % anual), todo orgánico y sin compras [A1, A8]. El año 2024 fue la excepción: +0,5 %, porque el agua cayó un 21,3 % (de 20.262 M a 15.952 M) tras la campaña en redes contra la empresa y su fundador desde febrero de 2024, mientras el té subía un 32 % [A5]. En 2025 el grupo creció un 22,5 % (agua +17,3 %, té +29,0 %) y en el 1S26 un 16,0 % (agua +2,1 %, té +30,1 %) [A2, A3]. El margen EBITDA subió de 38,9 % (2021) a 45,3 % (2025) y 45,0 % en el 1S26: más peso del té (margen de segmento del 48 % frente al 34-37 % del agua), PET y azúcar más baratos en 2025 y menos publicidad tras el año olímpico (gasto comercial del 21,4 % al 18,6 % de las ventas) [A1, A2]. En 2024 el margen bruto bajó 1,4 puntos por el agua purificada «verde» lanzada en abril y la menor absorción de costes fijos [A5].',
    ajustes: 'Cifras publicadas NIIF, sin ajustes de la empresa (no publica beneficio ajustado). Nuestro EBIT saca del resultado los intereses de depósitos (580 M en 2025; 866 M en 2024; 991 M en 2023), las ganancias de productos financieros (171 M en 2025) y las diferencias de cambio (−199 M en 2025, +75 M en 2024, +370 M en 2022), que pasan al resultado financiero; las subvenciones públicas (606 M en 2025, 786 M en 2024) se quedan en el EBIT porque llegan todos los años [A1, A5, A7]. Las donaciones de 2025 (68 M) son pequeñas y no se tratan como no recurrentes. Los BPA de 2021-2023 están redondeados a dos decimales en las cuentas [A6, A7].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '1S24', ingresos: 22173.1, crecimiento_pct: 8.4, crecimiento_organico_pct: 8.4, ebitda: 8976.2, margen_ebitda_pct: 40.5, bpa: 0.55, vs_consenso: null },
      { periodo: '2S24', ingresos: 20722.9, crecimiento_pct: -6.7, crecimiento_organico_pct: -6.7, ebitda: 8776.3, margen_ebitda_pct: 42.4, bpa: 0.52, vs_consenso: null },
      { periodo: '1S25', ingresos: 25622.2, crecimiento_pct: 15.6, crecimiento_organico_pct: 15.6, ebitda: 11392.7, margen_ebitda_pct: 44.5, bpa: 0.68, vs_consenso: null },
      { periodo: '2S25', ingresos: 26930.7, crecimiento_pct: 30.0, crecimiento_organico_pct: 30.0, ebitda: 12432.0, margen_ebitda_pct: 46.2, bpa: 0.73, vs_consenso: null },
      { periodo: '1S26', ingresos: 29718.1, crecimiento_pct: 16.0, crecimiento_organico_pct: 16.0, ebitda: 13372.7, margen_ebitda_pct: 45.0, bpa: 0.79, vs_consenso: 'Superior' },
    ],
    ultima_presentacion: 'La empresa publica semestres y no da guía numérica ni celebra una conferencia con transcripción pública en HKEXnews. En los resultados de 2025 (24-mar-2026) la dirección habló de una «mejora gradual» del agua, de un 2025 de «competencia excepcionalmente intensa» y atribuyó la subida del margen bruto (del 58,1 % al 60,5 %) al PET y al azúcar más baratos y a «regular la proporción de ventas por comercio electrónico» para mantener la disciplina de precios de los distribuidores [A2]. En el 1S26 (25-ago-2026) el mensaje cambió de tono: «más estable, más lento y más lejos» (lema del 30.º aniversario), el agua solo creció un 2,1 % y el té un 30,1 %, y la empresa avisó de que el PET sube por el petróleo [A3]. No respondió en el documento a la pregunta que más pesa: por qué el agua no vuelve al nivel de 2023 (9.641 M en el 1S26 frente a un 2023 de 20.262 M en el año) ni cuánto le cuesta en precio la guerra con las marcas de agua purificada [A3]. El 1S26 batió el consenso (29.300 M de ventas y 8.630 M de beneficio esperados) [B11].',
    confianza: 'Alta',
  },
  balance: {
    historico: [
      { periodo: '2021', activo_total: 32896.1, activo_corriente: 17835.7, pasivo_corriente: 11588.9, pasivo_total: 12154.5, fondo_comercio: 0, intangibles: 65.1, inmovilizado_material: 12800.1, existencias: 1809.2, clientes: 476.3, proveedores: 1153.1, activos_contrato: null, pasivos_contrato: null, caja: 16113.5, deuda_financiera: 2500.1, arrendamientos: 90.0, patrimonio_neto: 20741.6, minoritarios: 0, reservas: 10620.0 },
      { periodo: '2022', activo_total: 39254.9, activo_corriente: 18361.5, pasivo_corriente: 14601.4, pasivo_total: 15170.8, fondo_comercio: 0, intangibles: 58.1, inmovilizado_material: 15397.6, existencias: 2108.4, clientes: 478.6, proveedores: 1425.1, activos_contrato: null, pasivos_contrato: null, caja: 19315.9, deuda_financiera: 2425.1, arrendamientos: 99.9, patrimonio_neto: 24084.1, minoritarios: 0, reservas: 14054.4 },
      { periodo: '2023', activo_total: 49137.1, activo_corriente: 28461.4, pasivo_corriente: 19876.6, pasivo_total: 20566.2, fondo_comercio: 0, intangibles: 74.2, inmovilizado_material: 17179.6, existencias: 3091.7, clientes: 547.0, proveedores: 1770.1, activos_contrato: null, pasivos_contrato: null, caja: 25638.6, deuda_financiera: 3120.6, arrendamientos: 89.3, patrimonio_neto: 28570.9, minoritarios: 0, reservas: 18486.3 },
      { periodo: '2024', activo_total: 53160.3, activo_corriente: 19071.9, pasivo_corriente: 19984.7, pasivo_total: 20873.1, fondo_comercio: 0, intangibles: 71.6, inmovilizado_material: 21083.2, existencias: 5013.0, clientes: 581.4, proveedores: 1499.4, activos_contrato: null, pasivos_contrato: null, caja: 22890.0, deuda_financiera: 3625.4, arrendamientos: 121.6, patrimonio_neto: 32287.2, minoritarios: 0, reservas: 22174.7 },
      { periodo: '2025', activo_total: 65169.1, activo_corriente: 26563.6, pasivo_corriente: 24822.8, pasivo_total: 25699.1, fondo_comercio: 0, intangibles: 80.9, inmovilizado_material: 24719.3, existencias: 5846.5, clientes: 598.2, proveedores: 1654.2, activos_contrato: null, pasivos_contrato: null, caja: 29848.7, deuda_financiera: 4390.0, arrendamientos: 102.7, patrimonio_neto: 39470.0, minoritarios: 0, reservas: 29495.7 },
    ],
    vencimientos: [{ anio: '2026', importe: 5185.5 }],
    liquidez: 'A 30-jun-2026: efectivo y depósitos a corto de 21.080 M, depósitos bancarios a largo de 5.426 M, productos financieros a valor razonable de 11.110 M y 28 M restringidos o pignorados (≈ 37.645 M en total); líneas de crédito de 22.033 M [A3]. De esa caja salieron 11.134 M de dividendo el 19-ago-2026 [A3].',
    rating: 'Sin rating',
    coste_deuda_pct: 1.2,
    vida_media_anios: 0.5,
    otros_pasivos: 'La deuda (5.186 M a jun-2026, toda en RMB y a tipo variable) es casi toda descuento de efectos comerciales a menos de un año, no financiación estructural: la empresa la usa porque es más barata que lo que rinde su caja [A3]. Arrendamientos NIIF 16 de 88 M. Pasivos por contrato (anticipos de distribuidores) de 3.439 M y otras cuentas a pagar de 25.672 M, que a 30-jun incluyen los 11.134 M del dividendo de 2025 aprobado el 19-may y pagado el 19-ago-2026 [A3]. Compromisos de inversión de 3.970 M (fábricas y líneas) [A3]. Planes de pensiones de aportación definida, sin déficit. Sin pasivos contingentes significativos ni activos pignorados, según la empresa [A3]. Subvenciones diferidas de 384 M.',
    comentario: 'El balance tiene caja neta: ≈ 32.370 M a jun-2026 antes del dividendo (≈ 21.240 M después) frente a un activo de 76.573 M [A3]. El circulante comercial (existencias + clientes − proveedores) pasó del 3,8 % de las ventas en 2021 al 9,1 % en 2025, por las existencias (de 1.809 M a 5.846 M; 95 días en 2025), que la empresa acumula antes del verano y que se dispararon en 2024 con el agua invendida [A1, A5]. Pero el circulante real es negativo: los distribuidores pagan por adelantado (pasivos por contrato de 4.195 M a dic-2025) y las otras cuentas a pagar (11.962 M) superan a las existencias [A1]. Los depósitos a largo bajaron de 11.088 M a 5.426 M en el 1S26 al pasar a productos de tesorería a corto [A3].',
    confianza: 'Alta',
  },
  flujos: {
    historico: [
      { periodo: '2021', flujo_operativo: 11400.3, capex: 2488.1, pagos_arrendamientos: 67.6, adquisiciones: 0, desinversiones: 0, dividendos: 1911.9, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
      { periodo: '2022', flujo_operativo: 12041.5, capex: 4352.0, pagos_arrendamientos: 81.7, adquisiciones: 0, desinversiones: 0, dividendos: 5059.1, recompras: 225.4, emision_acciones: 71.4, intereses_en_financiacion: 0 },
      { periodo: '2023', flujo_operativo: 17304.9, capex: 4862.8, pagos_arrendamientos: 81.0, adquisiciones: 0, desinversiones: 0, dividendos: 7646.3, recompras: 0, emision_acciones: 9.7, intereses_en_financiacion: 0 },
      { periodo: '2024', flujo_operativo: 11022.1, capex: 6460.8, pagos_arrendamientos: 135.2, adquisiciones: 0, desinversiones: 0, dividendos: 8434.9, recompras: 0, emision_acciones: 3.3, intereses_en_financiacion: 0 },
      { periodo: '2025', flujo_operativo: 21141.7, capex: 6796.1, pagos_arrendamientos: 130.5, adquisiciones: 0, desinversiones: 0, dividendos: 8547.3, recompras: 221.6, emision_acciones: 76.5, intereses_en_financiacion: 0 },
    ],
    comentario: 'El flujo operativo es después de impuestos e intereses pagados; la mayor parte de los intereses cobrados entra por inversión, con la retirada de depósitos [A1]. La conversión del beneficio en flujo operativo fue del 133 % en 2025, del 91 % en 2024 (existencias +1.921 M con el agua invendida) y del 143 % en 2023 [A1, A5]. El capex (inmovilizado, intangibles y derechos sobre suelo) subió de 2.488 M en 2021 a 6.796 M en 2025 (12,9 % de las ventas): nuevas fuentes de agua (17 a jun-2026), fábricas de té y zumo y líneas en el oeste del país [A1, A3]. La amortización es de 3.393 M (6,5 % de las ventas): estimación propia, la mitad del capex es de crecimiento. En el 1S26 el capex fue de 3.820 M y el flujo operativo de 10.712 M [A4]. Las «recompras» son compras de acciones H del fideicomiso del plan de incentivos, no amortizaciones [A1].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'Ernst & Young Hua Ming (China) y Ernst & Young (Hong Kong)',
    anios_auditor: 6,
    opinion: 'Favorable (2025)',
    comentario: 'Cuentas NIIF auditadas por Ernst & Young con opinión favorable; EY revisó también el 1S26 y la junta de 2026 lo renovó [A1, A3]. No hay cambios de criterio relevantes en 2021-2026 (las enmiendas de NIIF 9 y 7 de 2026 no tienen efecto) [A3]. No se capitaliza I+D (311 M de gasto en 2025) ni intereses. Los pagos en acciones son mínimos (77 M en 2025, el 0,5 % del beneficio) [A1]. El ingreso se reconoce al entregar a distribuidores que suelen pagar por adelantado; existen devoluciones y rápels por volumen como contraprestación variable [A3]. Tipo impositivo efectivo del 24,1 % en 2025 (oficial del 25 %, con filiales del oeste al 15 % y al 9 %) [A3]. Puntos que vigilar: las subvenciones (606 M en 2025, el 3 % del beneficio antes de impuestos) y las compras de tapones y otros productos a empresas del fundador (255 M en el 1S26; tope de 1.000 M en 2028) [A1, C4].',
    senales: [
      { senal: 'Existencias altas', nivel: 'Baja', comentario: '95 días en 2025 (89 en el 1S26) frente a 55 días en 2021; en 2024 se dispararon con el agua invendida (+1.921 M) [A1, A3, A5].' },
      { senal: 'Compras a empresas del fundador con topes al alza', nivel: 'Baja', comentario: 'Tapones y envases de Yangshengtang: 255 M en el 1S26; topes subidos a 520 / 700 / 1.000 M en 2026-2028 [C4].' },
      { senal: 'Subvenciones públicas recurrentes', nivel: 'Baja', comentario: '606 M en 2025 y 786 M en 2024, dentro del EBIT [A1].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Dividendo en efectivo de alrededor del 70 % del beneficio, una vez al año (final): 0,45 RMB por 2021, 0,68 por 2022, 0,75 por 2023, 0,76 por 2024 y 0,99 por 2025 (11.134 M, el 70 % del beneficio de 2025, pagado el 19-ago-2026); sin dividendo a cuenta en 2026 [A1, A3]. No hay programa de recompra de acciones; el fideicomiso del plan de incentivos compra acciones H en el mercado (222 M en 2025, 122 M en el 1S26) [A1, A4]. La prioridad declarada de la caja es el capex en fuentes de agua y fábricas [A3].',
    adquisiciones: [],
    comentario: 'La dirección invierte en el negocio propio y reparte el resto: 6.796 M de capex y 8.547 M de dividendos en 2025, sin compras de empresas en diez años [A1]. El capex ha crecido rápido (de 2.488 M en 2021 a 6.796 M en 2025) y sigue rindiendo: las ventas crecieron 22.857 M en ese periodo. Diluye poco (plan de incentivos con acciones compradas en el mercado). Lo discutible es el exceso de caja: ≈ 21.000 M de caja neta tras el dividendo, que rinde un 1-2 % con los tipos chinos en mínimos, y una deuda de descuento de efectos que solo existe porque es más barata que esa caja [A3].',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      seg('Agua envasada', 'Agua natural de 17 fuentes (marca 农夫山泉, botella roja), agua purificada (botella verde, desde abril de 2024), agua mineral y para bebés, hielo', [[17058.5, 6575.3], [18262.6, 6443.4], [20262.3, 7347.2], [15952.4, 4970.5], [18709.0, 7001.3]]),
      seg('Té listo para beber', 'Té sin azúcar 东方树叶 (Oriental Leaf) y té con fruta 茶π, té con gas', [[4578.9, 1832.4], [6906.0, 2753.3], [12658.9, 5622.3], [16744.5, 7562.6], [21595.9, 10374.4]]),
      seg('Bebidas funcionales', 'Bebidas para deportistas 尖叫 (Scream), agua con vitaminas, electrolitos', [[3695.0, 1595.0], [3837.6, 1534.0], [4901.6, 2067.7], [4932.1, 2082.0], [5762.3, 2695.9]]),
      seg('Zumos', 'Zumos NFC y 17.5°, 水溶C100, 农夫果园', [[2613.6, 503.3], [2878.8, 580.0], [3533.6, 945.6], [4084.9, 1017.1], [5176.3, 1776.9]]),
      seg('Otros', 'Soda, café 炭仌, bebidas vegetales, fruta fresca', [[1750.4, 225.7], [1354.2, 280.3], [1310.9, 396.2], [1182.1, 392.1], [1309.5, 469.6]]),
    ],
    geografias: [{ nombre: 'China continental', peso_pct: 99.0 }, { nombre: 'Otros', peso_pct: 1.0 }],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Ventas de agua envasada', valor_anterior: '15.952 M (2024)', valor_actual: '18.709 M (2025); 9.641 M en el 1S26 (+2,1 %)', variacion: '+17,3 %', comentario: 'Aún por debajo de los 20.262 M de 2023 [A1, A3]' },
      { kpi: 'Ventas de té', valor_anterior: '16.745 M (2024)', valor_actual: '21.596 M (2025); 13.122 M en el 1S26 (+30,1 %)', variacion: '+29,0 %', comentario: 'Primera línea del grupo desde 2025 [A1, A3]' },
      { kpi: 'Margen bruto', valor_anterior: '58,1 % (2024)', valor_actual: '60,5 % (2025); 60,9 % en el 1S26', variacion: '+2,4 pp', comentario: 'PET y azúcar más baratos y mezcla hacia el té [A2, A3]' },
      { kpi: 'Gasto comercial sobre ventas', valor_anterior: '21,4 % (2024)', valor_actual: '18,6 % (2025); 19,7 % en el 1S26', variacion: '−2,8 pp', comentario: 'Menos publicidad tras el año olímpico y logística más barata [A2, A3]' },
      { kpi: 'Fuentes de agua en explotación', valor_anterior: '12 (dic-2024)', valor_actual: '17 (jun-2026)', variacion: '+5', comentario: '[A3, A5]' },
      { kpi: 'Días de existencias', valor_anterior: '95,5 (2025)', valor_actual: '94,7 (1S26)', variacion: '−0,8', comentario: '[A3]' },
    ],
    confianza: 'Alta',
  },
  fuentes: fA,
  huecos: [],
};
guarda('A', A);

// ================================================================ B. Sector y competencia
const fB = [
  { id: 1, titulo: '中国软饮行业现状 (mercado chino de bebidas sin alcohol 2024: 12.502 億 RMB, +7,56 %; agua envasada 2.688 億, té 1.941 億; CR3 por categoría)', editor: '观研天下 (chinabaogao)', tipo: 'Sectorial', fecha: '2025-10-21', url: 'https://www.chinabaogao.com/jingzheng/202510/767812.html' },
  { id: 2, titulo: 'Mercado de agua envasada según 灼识咨询 (CIC): agua purificada 1.206 億 RMB en 2023 (56,1 % del total) y 1.798 億 en 2028e (57,2 %); mercado +2,5 % en 2024', editor: 'Jiemian (界面新闻)', tipo: 'Prensa', fecha: '2025-03-24', url: 'https://www.jiemian.com/article/12512428.html' },
  { id: 3, titulo: 'Cuotas del agua envasada en 2023 por ventas minoristas (CIC, folleto de CR Beverage): Nongfu 23,6 %, CR Beverage 18,4 %, 乐百氏 6,1 %', editor: '投资界 (pedaily)', tipo: 'Prensa', fecha: '2024-05-10', url: 'https://news.pedaily.cn/202405/533622.shtml' },
  { id: 4, titulo: 'Cuota del té listo para beber (马上赢): Nongfu del 23,7 % (1T25) al 31,1 % (1T26); Master Kong del 27,4 % al 26,8 %', editor: '牛刀财经 / 36Kr', tipo: 'Prensa', fecha: '2026-08-06', url: 'https://www.36kr.com/p/3927486246304136' },
  { id: 5, titulo: 'Guerra de precios del agua: Nielsen 1S26 (volumen −4,9 %, importe −7,3 %), precios por botella de las marcas (Nongfu verde 8,9 RMB el paquete de 12)', editor: '财经天下 WEEKLY / 36Kr', tipo: 'Prensa', fecha: '2026-09-08', url: 'https://eu.36kr.com/zh/p/3974040426819849' },
  { id: 6, titulo: 'China Resources Beverage: interim results 2026 (agua envasada C\'estbon 4.837,9 M, −7,9 %; bebidas −35,4 %; beneficio −26,2 %)', editor: 'China Resources Beverage / HKEXnews', tipo: 'Primaria', fecha: '2026-08-26', url: `${H}/2026/0826/2026082601377.pdf` },
  { id: 7, titulo: 'Tingyi, Uni-President China, CR Beverage, Eastroc, Coca-Cola, PepsiCo, Monster, Danone, Suntory BF, Ito En: ventas y márgenes de los últimos 12 meses (ficha de Yahoo Finance)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com' },
  { id: 8, titulo: '2024 Annual Report: campaña en redes contra la empresa y el fundador, caída del agua (−21,3 %), agua purificada', editor: 'Nongfu Spring / HKEXnews', tipo: 'Primaria', fecha: '2025-04-25', url: `${H}/2025/0425/2025042503151.pdf` },
  { id: 9, titulo: '2025 Annual Report / anuncio de resultados 2025 (fuentes de agua, entorno sectorial, ley de seguridad alimentaria)', editor: 'Nongfu Spring / HKEXnews', tipo: 'Primaria', fecha: '2026-03-24', url: `${H}/2026/0324/2026032401065.pdf` },
  { id: 10, titulo: 'Announcement of 2026 interim results (17 fuentes, normas de 2026, PET al alza)', editor: 'Nongfu Spring / HKEXnews', tipo: 'Primaria', fecha: '2026-08-25', url: `${H}/2026/0825/2026082501292.pdf` },
  { id: 11, titulo: 'Nongfu 1S26: ventas 29.718 M frente a 29.300 M esperados; té 44,2 % de las ventas', editor: 'Wallstreetcn (华尔街见闻)', tipo: 'Prensa', fecha: '2026-08-25', url: 'https://wallstreetcn.com/articles/3780263' },
];
const yb = (t) => yd[t];
const ventasLtm = (t) => Math.round(yb(t).ventas * FX[yb(t).divisa_cuentas] / 1e6);
const B = {
  _estado: 'completa',
  negocio: {
    descripcion: 'Nongfu Spring (农夫山泉, Hangzhou) embotella y vende bebidas sin alcohol en China: agua envasada (35,6 % de las ventas de 2025), té listo para beber (41,1 %), bebidas funcionales (11,0 %), zumos (9,8 %) y otros (2,5 %) [A1]. Embotella en origen en 17 fuentes naturales (Qiandao, Changbai, Emei, Wanlv…) y produce también té, zumo y café en fábricas propias [B10]. Vende a través de una red de miles de distribuidores que pagan por adelantado y llegan a millones de tiendas de barrio, supermercados, gasolineras y canales digitales; Sam\'s Club es su escaparate de productos nuevos (té frío Longjing, café 炭仌) [B10]. Más del 99 % de las ventas es en China continental y ningún cliente supera el 10 % [A3].',
    como_gana_dinero: 'Margen bruto del 60,5 % en 2025 (60,9 % en el 1S26) y margen EBITDA del 45 %: es el más alto de las bebidas chinas, el doble que Tingyi o Uni-President (márgenes operativos del 9-10 %) [A1, B7]. El coste principal es el PET, el azúcar, el zumo y la logística; el agua es barata, pero pesa y se transporta mal, y por eso cuentan las fuentes repartidas por el país [A2]. El té sin azúcar es el negocio más rentable (margen de segmento del 48 % frente al 37 % del agua en 2025) y el que más crece [A1]. Casi todo es recurrente (consumo diario) con estacionalidad de verano. El apalancamiento operativo es alto: en 2024 las ventas de agua cayeron un 21 % y el margen de su segmento bajó de 36,3 % a 31,2 % [A1, A6].',
    clientes: 'Clientes directos: distribuidores (sin datos públicos de cuántos) y grandes cadenas; consumidores finales en todo el país. Ningún cliente llega al 10 % de las ventas [A3]. Los distribuidores pagan por adelantado (pasivos por contrato de 4.195 M a dic-2025) [A1]. Poder de precios demostrado en el té (35 % de crecimiento de 2023 a 2025 sin bajar precio; margen de segmento del 44 % al 48 %) y perdido en el agua barata: en 2024 la empresa respondió a la campaña en redes y a C\'estbon con el agua purificada verde, que se vendió a 9,9 RMB el paquete de 12 en algunos canales y hoy a 8,9 RMB [B5, B8].',
    confianza: 'Media',
  },
  sector: {
    definicion: 'Bebidas sin alcohol envasadas en China continental (agua, té, zumos, funcionales, refrescos, café listo para beber), por ventas minoristas: es donde Nongfu vende el 99 % [A3]. Usamos la serie de 观研天下 (12.502 億 RMB en 2024) [B1]; para el agua, el dato de CIC del folleto de CR Beverage (≈ 2.150 億 RMB en 2023, estimación propia a partir del 56,1 % del agua purificada) [B2] da un mercado de agua algo menor que el de 观研天下 (2.688 億 en 2024), por diferencias de perímetro (agua en garrafa, canales).',
    tamano: '≈ 1,25 billones de RMB en 2024 (+7,56 %) [B1]; agua envasada 268.800 M y té 194.100 M [B1]; agua según CIC ≈ 215.000 M en 2023 y ≈ 314.000 M en 2028e (estimación propia con sus porcentajes) [B2]',
    unidad_serie: 'millones de RMB (ventas minoristas de bebidas sin alcohol; 2025e-2030e, estimación propia al 5 %)',
    serie: [{ anio: '2023', tamano: 1162300 }, { anio: '2024', tamano: 1250200 }, { anio: '2025e', tamano: 1312700 }, { anio: '2026e', tamano: 1378300 }, { anio: '2027e', tamano: 1447300 }, { anio: '2028e', tamano: 1519600 }, { anio: '2029e', tamano: 1595600 }, { anio: '2030e', tamano: 1675400 }],
    tcac_historico_pct: null,
    tcac_previsto_pct: 5.0,
    cr5_pct: null,
    estructura: 'Moderadamente concentrada',
    drivers: [
      { driver: 'Salud: bebidas sin azúcar y té natural', efecto: '+', horizonte: 'Estructural', evidencia: 'Té de Nongfu +29 % en 2025 y +30,1 % en el 1S26; cuota de Nongfu en té del 23,7 % al 31,1 % en un año (马上赢) [A1, A3, B4]' },
      { driver: 'Guerra de precios en el agua barata', efecto: '−', horizonte: 'Cíclico', evidencia: 'Agua: Nielsen 1S26 volumen −4,9 % e importe −7,3 %; C\'estbon −7,9 %; paquetes a menos de 1 RMB por botella [B5, B6]' },
      { driver: 'Consumo chino débil', efecto: '−', horizonte: 'Cíclico', evidencia: 'Ventas minoristas totales +1,3 % en el 1S26 y bebidas de empresas grandes +1,0 % en 2025 [A2, A3]' },
      { driver: 'Coste del PET (petróleo)', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'PET más barato subió el margen bruto 2,4 puntos en 2025; en el 1S26 vuelve a subir por la tensión geopolítica [A2, A3]' },
      { driver: 'Agua natural frente a purificada', efecto: '+', horizonte: 'Estructural', evidencia: 'La purificada pesa el 56,1 % del agua (CIC) y se prevé que pierda peso; Nongfu es la marca de agua natural [B2, B3]' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 4, justificacion: 'Guerra de precios del agua desde 2024 (Nongfu verde, C\'estbon, Wahaha, Master Kong, 今麦郎) y muchas marcas nuevas de té sin azúcar; el mercado del agua cae un 7,3 % en importe en el 1S26 [B5].' },
      { fuerza: 'Poder de los clientes', intensidad: 2, justificacion: 'Consumidor atomizado; los distribuidores pagan por adelantado y ninguno pesa un 10 % [A1, A3].' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'PET, azúcar y zumo son materias primas con precio de mercado; parte de los tapones y envases los compra a empresas del fundador [C4].' },
      { fuerza: 'Amenaza de entrada', intensidad: 3, justificacion: 'Fabricar es fácil; la barrera es la distribución nacional, las fuentes y la marca. Wahaha recuperó cuota en agua purificada en 2025-2026 [B5].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 2, justificacion: 'Agua del grifo hervida, té recién hecho y cafeterías (Mixue, Luckin) compiten por la ocasión de consumo.' },
    ],
    ciclo: { posicion: 'Madurez del ciclo', comentario: 'Las bebidas crecieron un 7,56 % en 2024 según 观研天下 [B1], pero las de empresas grandes solo un 1,0 % en 2025 según la estadística oficial [A2], y el agua cae en el 1S26 (−7,3 % en importe) [B5]. El sector aguantó 2020 (Nongfu −0,3 % de ventas en 2020 y +29,8 % en 2021) y 2022 (+11,9 %) [A7, A8]: es consumo básico, con ciclo de precios más que de volumen. Hoy hay dos ciclos: el agua barata en guerra de precios y el té sin azúcar en expansión.' },
    regulacion: 'Ley de Seguridad Alimentaria reformada el 1-dic-2025 (transporte a granel de líquidos alimentarios) [B9]. Medidas de producción por encargo y de retirada de alimentos, en vigor el 1-dic-2026, y normas de venta online de alimentos de mayo de 2026 [B10]. Fiscalidad: tipo del 25 % con rebajas al 15 % o 9 % para filiales del oeste (Desarrollo del Oeste hasta 2030; Xizang hasta 2027) [A3]. No hay impuesto sobre bebidas azucaradas en China.',
    tendencias: 'Gana el té sin azúcar y lo natural; pierde el agua barata purificada, donde se reparten el volumen Wahaha, C\'estbon y Nongfu verde a menos de 1 RMB la botella [B5]. Nongfu gana con el té (cuota del 31,1 %) y con el agua natural; pierde precio en el agua de masas. Los canales de descuento (tiendas de snacks a granel, Sam\'s Club, comercio online) aprietan los precios de catálogo [B5, B10].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 4.0,
    posicion: '1.ª en agua envasada en China (23,6 % del valor minorista en 2023, CIC) y 1.ª en té listo para beber (31,1 % en el 1T26 según 马上赢) [B3, B4]; ≈ 4,0 % del mercado total de bebidas sin alcohol (estimación propia: 52.553 M de ventas en 2025 frente a ≈ 1,31 billones de mercado en 2025e, precios de fábrica frente a minoristas) [A1, B1]',
    competidores: [
      { nombre: 'Tingyi (Master Kong)', pais: 'China', ticker: '0322.HK', ingresos: ventasLtm('0322.HK'), cuota_pct: 26.8, margen_ebit_pct: r1(yb('0322.HK').margen_op * 100), comentario: 'Té con azúcar (冰红茶), agua, zumos y fideos; cuota de té del 26,8 % en el 1T26 [B4, B7]' },
      { nombre: 'Uni-President China', pais: 'China', ticker: '0220.HK', ingresos: ventasLtm('0220.HK'), cuota_pct: null, margen_ebit_pct: r1(yb('0220.HK').margen_op * 100), comentario: 'Té, zumos y fideos (统一, 小茗同学) [B7]' },
      { nombre: 'China Resources Beverage (C\'estbon)', pais: 'China', ticker: '2460.HK', ingresos: ventasLtm('2460.HK'), cuota_pct: 18.4, margen_ebit_pct: r1(yb('2460.HK').margen_op * 100), comentario: 'N.º 2 del agua (18,4 % en 2023, CIC), 88,7 % de ventas en agua purificada; −12,1 % en el 1S26 [B3, B6]' },
      { nombre: 'Eastroc Beverage', pais: 'China', ticker: '605499.SS', ingresos: ventasLtm('605499.SS'), cuota_pct: null, margen_ebit_pct: r1(yb('605499.SS').margen_op * 100), comentario: 'Energéticas y electrolitos; entra en té y agua [B7]' },
      { nombre: 'Coca-Cola (grupo)', pais: 'EE. UU.', ticker: 'KO', ingresos: ventasLtm('KO'), cuota_pct: null, margen_ebit_pct: r1(yb('KO').margen_op * 100), comentario: 'En China vía embotelladores COFCO y Swire; referencia de margen de marca [B7]' },
      { nombre: 'Wahaha (娃哈哈)', pais: 'China', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'No cotiza; recupera cuota en agua purificada en 2025-2026 [B5]' },
    ],
    foso: {
      veredicto: 'Amplio', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'No aplica: producto de consumo.' },
        { fuente: 'Costes de cambio', puntuacion: 0, evidencia: 'Nulos: el consumidor cambia de marca en cada compra.' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 4, evidencia: 'Marca n.º 1 en agua y té; el té sin azúcar 东方树叶 ganó 7,4 puntos de cuota en un año y mantiene margen de segmento del 48 % [A1, B4]; 17 derechos de fuentes naturales difíciles de replicar [A3].' },
        { fuente: 'Ventaja en costes', puntuacion: 4, evidencia: 'Margen operativo del 39 % frente al 9-12 % de Tingyi, Uni-President y CR Beverage con los mismos canales [A1, B7]; fuentes repartidas que abaratan el transporte del agua.' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'Red nacional de distribución y fábricas que un entrante no replica en pocos años; pero Wahaha y C\'estbon tienen escala parecida en agua [B3, B5].' },
      ],
    },
    amenazas: 'Tres amenazas, de más a menos probable: (1) que la guerra de precios del agua dure y pase al té sin azúcar, donde ya hay decenas de marcas (Master Kong, Uni-President, Suntory, marcas de canal) [B4, B5]; (2) otra campaña en redes contra la marca o el fundador, como la de 2024, que hundió el agua un 21 % en un año [B8]; (3) un problema de calidad o de fuente de agua, que en una marca de agua natural es letal. Probabilidad media de la primera, baja de las otras dos.',
    confianza: 'Media',
  },
  historia: {
    resumen: 'Zhong Shanshan, periodista y vendedor de bebidas, fundó en 1993 Yangshengtang y en 1996 Nongfu Spring en Qiandao (Zhejiang), con agua del lago y la publicidad de «农夫山泉有点甜» [C1]. En 2000 dejó de producir agua purificada y se quedó solo con la natural, en guerra abierta con las marcas de purificada [B8]. Diversificó en zumos (农夫果园, 2003), funcionales (尖叫, 2003), té (东方树叶, 2011, demasiado pronto: tardó una década en despegar) y café. Salió a bolsa en Hong Kong el 8-sep-2020 [A3]. En 2024 sufrió una campaña en redes contra la empresa y el fundador, volvió a lanzar agua purificada en abril de 2024 y vio caer el agua un 21 % [B8]; en 2025 recuperó crecimiento con el té [A1].',
    hitos: [
      { anio: '1996', hito: 'Fundación en Qiandao (Zhejiang) por Zhong Shanshan [C1]' },
      { anio: '2000', hito: 'Deja el agua purificada y se queda con la natural [B8]' },
      { anio: '2003', hito: 'Lanza 农夫果园 (zumo) y 尖叫 (funcional) [A3]' },
      { anio: '2011', hito: 'Lanza 东方树叶, té sin azúcar [A3]' },
      { anio: '2020', hito: 'Salida a bolsa en Hong Kong (8-sep) [A3]' },
      { anio: '2024', hito: 'Campaña en redes contra la empresa y el fundador; agua −21,3 %; agua purificada verde (abril) [B8]' },
      { anio: '2025', hito: 'Ventas +22,5 %; el té supera al agua en ventas [A1]' },
      { anio: '2026', hito: '30.º aniversario; 17 fuentes; té +30,1 % y agua +2,1 % en el 1S [A3]' },
    ],
    confianza: 'Alta',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Tres asuntos con cifras: (1) el plástico, porque el PET es la materia prima clave y su precio movió el margen bruto 2,4 puntos en 2025 [A2]; (2) el agua de las fuentes, que es el activo y la licencia social del negocio (17 fuentes, campañas de «fábricas transparentes» con 700.000 visitas en 2025) [B9]; (3) la seguridad alimentaria y las nuevas normas de 2025-2026 [B9, B10]. El informe de sostenibilidad de 2025 se publicó el 17-abr-2026 en HKEXnews.',
    controversias: 'Febrero-diciembre de 2024: campaña en redes contra la empresa y su fundador (supuestos símbolos japoneses en el envase, el hijo con pasaporte estadounidense y críticas a Wahaha); la empresa la llamó «difamación maliciosa», algunas cuentas fueron sancionadas por las autoridades y el agua cayó un 21,3 % en el año [B8]. No hemos encontrado sanciones de reguladores a la empresa en 2024-2026.',
    confianza: 'Media',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'sector', campo: 'tcac_historico_pct y cr5_pct', tipo: 'Complemento', intentos: '1) Informes anuales de Nongfu y de CR Beverage: solo cuotas de agua de 2023 [B3]; 2) 观研天下: solo 2024 y CR3 por categoría [B1]; 3) Euromonitor y Nielsen: de pago, solo resúmenes de prensa', decision: 'Omitido' },
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) Informe de sostenibilidad 2025 (HKEXnews, 20 MB): no descargado por tamaño; 2) web de MSCI (requiere registro); 3) prensa: sin calificación con fecha', decision: 'Omitido' },
  ],
};
guarda('B', B);

// ================================================================ C. Equipo y gobierno
const fC = [
  { id: 1, titulo: '2025 Annual Report: consejo, biografías, informe de gobierno, remuneración de consejeros, participaciones y operaciones vinculadas', editor: 'Nongfu Spring / HKEXnews', tipo: 'Primaria', fecha: '2026-04-17', url: `${H}/2026/0417/2026041701389.pdf` },
  { id: 2, titulo: 'Results of AGM; election of the ninth session of the Board (19-may-2026)', editor: 'Nongfu Spring / HKEXnews', tipo: 'Primaria', fecha: '2026-05-19', url: `${H}/2026/0519/2026051901101.pdf` },
  { id: 3, titulo: '2026 Interim Report: plan de incentivos, acciones de consejeros', editor: 'Nongfu Spring / HKEXnews', tipo: 'Primaria', fecha: '2026-09-24', url: `${H}/2026/0924/2026092401877.pdf` },
  { id: 4, titulo: 'Revision of annual caps for continuing connected transactions (compras a Yangshengtang: 520 / 700 / 1.000 M en 2026-2028)', editor: 'Nongfu Spring / HKEXnews', tipo: 'Primaria', fecha: '2026-09-11', url: `${H}/2026/0911/2026091101529.pdf` },
  { id: 5, titulo: 'Renewal of continuing connected transactions (acuerdos marco 2026-2028 con Yangshengtang)', editor: 'Nongfu Spring / HKEXnews', tipo: 'Primaria', fecha: '2025-12-16', url: `${H}/2025/1216/2025121601352.pdf` },
  { id: 6, titulo: 'Disclosure of Interests: avisos de Zhong Shanshan (compras de acciones H, jul-sep 2026) y de consejeros', editor: 'HKEXnews (DI)', tipo: 'Primaria', fecha: '2026-10-06', url: 'https://di.hkex.com.hk/di/NSSrchCorpList.aspx?sa1=cl&sc=9633&src=MAIN&lang=EN' },
  { id: 7, titulo: 'Voluntary announcement: proposed increase in shareholding by controlling shareholder (hasta 2.000 M HKD; 83,98 %)', editor: 'Nongfu Spring / HKEXnews', tipo: 'Primaria', fecha: '2024-07-09', url: `${H}/2024/0709/2024070900318.pdf` },
  { id: 8, titulo: 'Poll results of the AGM held on May 20, 2025', editor: 'Nongfu Spring / HKEXnews', tipo: 'Primaria', fecha: '2025-05-20', url: `${H}/2025/0520/2025052000684.pdf` },
  { id: 9, titulo: 'Circular de la junta de 2026 (supresión de la comisión de supervisión, estatutos, consejo nuevo)', editor: 'Nongfu Spring / HKEXnews', tipo: 'Primaria', fecha: '2026-04-17', url: `${H}/2026/0417/2026041701411.pdf` },
];
const C = {
  _estado: 'completa',
  directivos: {
    equipo: [
      { nombre: 'Zhong Shanshan (钟睒睒)', cargo: 'Fundador, presidente y director general', desde: '1996', participacion_pct: 84.04, trayectoria: 'Fundó Yangshengtang (1993) y Nongfu Spring (1996) y los preside; controla también Beijing Wantai (vacunas, cotizada en Shanghái). 71 años. Llevó a Nongfu de una fuente a 17 y de 29.696 M a 52.553 M de ventas en 2021-2025 [C1, A1].' },
      { nombre: 'Wu Limin (吴莉敏)', cargo: 'Consejera ejecutiva y directora financiera', desde: '2023', participacion_pct: 0.0, trayectoria: 'Directora financiera de Yonghui Superstores (2019-2022) y antes 20 años en Unilever China [C1].' },
      { nombre: 'Xiang Xiansong (向咸松)', cargo: 'Consejero ejecutivo y director comercial (centro de ventas y marketing)', desde: '2023', participacion_pct: 0.0, trayectoria: 'Hecho en la casa: de supervisor de ventas a director regional y del centro comercial; 43 años [C1].' },
      { nombre: 'Han Linyou (韩林攸)', cargo: 'Consejera ejecutiva y secretaria del consejo', desde: '2023', participacion_pct: 0.0, trayectoria: 'Abogada; vicepresidenta de Tibet Water Resources (2013-2019) antes de entrar en 2019 [C1].' },
      { nombre: 'Zhong Shu Zi (钟树子)', cargo: 'Consejero no ejecutivo; asistente del director general desde marzo de 2026', desde: '2017', participacion_pct: 0.0, trayectoria: 'Hijo del fundador, 38 años; director de marca de Yangshengtang desde 2020 y director regional de ventas de Nongfu en 2023-2025 [C1].' },
    ],
    historial_guidance: [
      { anio: '2024', guia: 'Sin guía numérica; tras la campaña en redes, «reforzar la marca y la conciencia de crisis» [A5]', real: 'Ventas +0,5 %, beneficio +0,4 % [A1]', cumplida: 'Parcial' },
      { anio: '2025', guia: 'Sin guía numérica [A5]', real: 'Ventas +22,5 %, beneficio +30,9 % [A1]', cumplida: 'Sí' },
      { anio: '2026', guia: 'Sin guía numérica; «más estable, más lento y más lejos» [A3]', real: '1S26: ventas +16,0 %, beneficio +16,6 % [A3]', cumplida: 'Sí' },
    ],
    comentario: 'Empresa de fundador: Zhong Shanshan, de 71 años, preside, dirige y controla el 84 %. El equipo profesional es estable (sin cambios de presidente ni de director general en 24 meses) y la directora financiera viene de multinacional y de una cadena cotizada. La empresa no publica guía numérica, así que no hay historial de cumplimiento que medir. La sucesión es el punto débil: no hay plan publicado, y el hijo, Zhong Shu Zi, pasó en marzo de 2026 a asistente del director general tras dos años como director regional de ventas [C1].',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Zhong Shanshan', cargo: 'Presidente y director general', tipo: 'Ejecutivo', desde: '1996', comisiones: 'Remuneraciones' },
      { nombre: 'Wu Limin', cargo: 'Consejera ejecutiva y directora financiera', tipo: 'Ejecutivo', desde: '2023', comisiones: '—' },
      { nombre: 'Xiang Xiansong', cargo: 'Consejero ejecutivo', tipo: 'Ejecutivo', desde: '2023', comisiones: '—' },
      { nombre: 'Han Linyou', cargo: 'Consejera ejecutiva', tipo: 'Ejecutivo', desde: '2023', comisiones: 'Nombramientos' },
      { nombre: 'Zhong Shu Zi', cargo: 'Consejero no ejecutivo', tipo: 'Dominical', desde: '2017', comisiones: '—' },
      { nombre: 'Gu Zhaoyang', cargo: 'Consejero independiente', tipo: 'Independiente', desde: '2025', comisiones: 'Auditoría (presidente)' },
      { nombre: 'Wen Ming', cargo: 'Consejera independiente', tipo: 'Independiente', desde: '2026', comisiones: 'Auditoría, Remuneraciones' },
      { nombre: 'Wang Yingzhe', cargo: 'Consejero independiente', tipo: 'Independiente', desde: '2026', comisiones: 'Auditoría, Nombramientos' },
    ],
    presidente_ceo_separados: false, presidente_ejecutivo: true, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: true, variable_ligado_rentabilidad: false, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: true, presidente_vinculado_control: true, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 100.0, voto_remuneracion_contra_pct: 0.0, voto_remuneracion_contra_libre_pct: 0.0, voto_cupula_pct: 98.93,
    remuneracion_ceo: { anio: '2025', total: 3.50, fijo: 2.04, variable_corto: 1.46, variable_largo: 0, ratio_salario_medio: 19 },
    remuneracion: 'Remuneración baja para el tamaño: el presidente y director general cobró 3,50 M RMB en 2025 (2,04 M fijos y 1,46 M de bonus), igual que en 2024, y no tiene acciones del plan [C1]. La directora financiera cobró 11,22 M (con 3,06 M de acciones del plan) y el director comercial 8,34 M [C1]. El bonus depende de ventas, beneficio y evaluación individual, sin métricas de ROIC ni de rentabilidad para el accionista [A3]. El plan de incentivos da acciones H compradas en el mercado a un 30 % del precio medio, con consolidación en tres años según resultados [A3]. Estimación propia del cociente con el empleado medio: 3,50 M frente a 5.100 M de gasto de personal entre 28.000 empleados (≈ 0,18 M), unas 19 veces [A1]. La junta de 2026 aprobó el plan de remuneración del consejo con el 100 % a favor [C2].',
    accionistas: [
      { nombre: 'Zhong Shanshan (directo, acciones H)', pct: 17.16, tipo: 'Control (fundador)', variacion: 'Compró 3,09 M de acciones H en julio-septiembre de 2026 a 38,7-40,0 HKD (≈ 121 M HKD) [C6]' },
      { nombre: 'Yangshengtang (100 % de Zhong Shanshan): 6.211,8 M domésticas + 1.310,3 M H', pct: 66.89, tipo: 'Control (fundador)', variacion: 'Plan de compra de hasta 2.000 M HKD anunciado en jul-2024 [C7]' },
      { nombre: 'Consejeros y directivos (plan de incentivos)', pct: 0.01, tipo: 'Consejeros', variacion: 'Consolidación de acciones del plan el 30-abr-2026 [C6]' },
      { nombre: 'Capital libre (acciones H)', pct: 15.96, tipo: 'Flotante', variacion: 'Sin colocaciones [A11]' },
    ],
    insiders: [
      { fecha: '2026-07-02', persona: 'Zhong Shanshan', operacion: 'Compra', acciones: 11200, importe: 0.38 },
      { fecha: '2026-07-07', persona: 'Zhong Shanshan', operacion: 'Compra', acciones: 170800, importe: 5.79 },
      { fecha: '2026-07-10', persona: 'Zhong Shanshan', operacion: 'Compra', acciones: 81800, importe: 2.77 },
      { fecha: '2026-09-17', persona: 'Zhong Shanshan', operacion: 'Compra', acciones: 490000, importe: 16.19 },
      { fecha: '2026-09-18', persona: 'Zhong Shanshan', operacion: 'Compra', acciones: 499000, importe: 16.42 },
      { fecha: '2026-09-21', persona: 'Zhong Shanshan', operacion: 'Compra', acciones: 212400, importe: 7.01 },
      { fecha: '2026-09-23', persona: 'Zhong Shanshan', operacion: 'Compra', acciones: 376600, importe: 12.49 },
      { fecha: '2026-09-24', persona: 'Zhong Shanshan', operacion: 'Compra', acciones: 352000, importe: 11.70 },
      { fecha: '2026-09-28', persona: 'Zhong Shanshan', operacion: 'Compra', acciones: 450000, importe: 15.07 },
      { fecha: '2026-09-29', persona: 'Zhong Shanshan', operacion: 'Compra', acciones: 300000, importe: 10.06 },
      { fecha: '2026-09-30', persona: 'Zhong Shanshan', operacion: 'Compra', acciones: 146200, importe: 4.91 },
      { fecha: '2026-06-12', persona: 'Han Linyou', operacion: 'Venta', acciones: 6000, importe: 0.23 },
    ],
    control_y_defensas: 'Zhong Shanshan controla el 84,04 % (17,15 % directo y 66,89 % por Yangshengtang, que es suyo al 100 %) [C1, C4]; preside y dirige, y su hijo es consejero. El capital libre es solo el ≈ 16 % (acciones H); las acciones domésticas (55,2 %) no cotizan y son todas de Yangshengtang [A11]. Hay operaciones vinculadas recurrentes: compras de tapones y envases a empresas de Yangshengtang (255 M en el 1S26; topes subidos a 520 / 700 / 1.000 M en 2026-2028, «por la subida del plástico y la expansión») y nueve empleados de Yangshengtang recibieron acciones del plan [C4, A3]. Una acción, un voto; la junta de 2026 suprimió la comisión de supervisión (nueva Ley de Sociedades) [C2, C9]. El 24 % del capital libre presente votó contra la reelección del fundador en la junta de 2026 (estimación propia: 1,07 % de los votos con un 3,92 % del capital libre presente) [C2].',
    alertas: [
      'Control del 84 % por el fundador, de 71 años, que preside y dirige; sucesión sin plan publicado [C1].',
      'Operaciones vinculadas con Yangshengtang al alza: topes de 520 M (2026) a 1.000 M (2028) [C4].',
      'Comisión de remuneraciones con el propio presidente como miembro [C1].',
    ],
    confianza: 'Media',
  },
  fuentes: fC,
  huecos: [],
};
guarda('C', C);

// ================================================================ D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de 9633.HK, 2800.HK y 2828.HK (herramientas/bolsa.mjs): precio, rango, betas, rentabilidades y cierres de ejercicio; cierre del 20-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/9633.HK/history/' },
  { id: 2, titulo: 'Nongfu Spring: estimaciones (ventas, EBITDA, EBIT, beneficio, BPA y DPA 2026e-2028e en CNY; 28 analistas; objetivo medio 45,24 CNY)', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-20', url: 'https://www.marketscreener.com/quote/stock/NONGFU-SPRING-CO-LTD-111379875/finances/' },
  { id: 3, titulo: 'quoteSummary de 9633.HK y comparables: recomendaciones, objetivos, tendencia de estimaciones, múltiplos', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/9633.HK/analysis/' },
  { id: 4, titulo: 'Curva de la deuda pública china (中债国债收益率曲线), 10 años a 20-oct-2026: 1,6354 %', editor: 'ChinaBond (中央国债登记结算)', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://yield.chinabond.com.cn/' },
  { id: 5, titulo: 'Implied ERP by month (ERPbymonth.xlsx): octubre de 2026, 4,20 % (T12m with sustainable payout)', editor: 'Damodaran Online', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 6, titulo: 'Tipos de cambio HKD/CNY, USD/CNY, EUR/CNY, JPY/CNY y GBP/CNY (20-oct-2026) y cierres de 2020-2025 de HKD/CNY', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/HKDCNY=X/' },
  { id: 7, titulo: 'Monthly Return de septiembre de 2026 (11.246.466.400 acciones)', editor: 'Nongfu Spring / HKEXnews', tipo: 'Primaria', fecha: '2026-10-02', url: `${H}/2026/1002/2026100203295.pdf` },
  { id: 8, titulo: 'Carlsberg: recommended offer to acquire Britvic plc (valor empresa ≈ 4.100 M GBP, 13,6 veces el EBITDA ajustado de 303 M GBP; prima del 36 %)', editor: 'Carlsberg Group', tipo: 'Primaria', fecha: '2024-07-08', url: 'https://www.carlsberggroup.com/media/ch3jhoji/33_08072024_recommended-offer-to-acquire-britvic-plc.pdf' },
  { id: 9, titulo: 'Celsius Holdings: acquisition of Alani Nu (1.800 M USD; ventas de ≈ 595 M y EBITDA de ≈ 137 M en 2024) (8-K)', editor: 'Celsius Holdings / SEC', tipo: 'Primaria', fecha: '2025-02-20', url: 'https://www.sec.gov/Archives/edgar/data/1341766/000134176625000018/a991pressreleasedatedfebru.htm' },
  { id: 10, titulo: 'Nestlé vende Nestlé Waters North America por 4.300 M USD (ventas de 2019 de ≈ 3.800 M USD)', editor: 'FoodNavigator-USA', tipo: 'Prensa', fecha: '2021-02-17', url: 'https://foodnavigator-usa.com/Article/2021/02/17/Nestle-sells-Nestle-Waters-North-America-for-4.3bn' },
  { id: 11, titulo: 'Cierre del 30-jun-2026: Nongfu −8,41 % con el sector de alimentación y bebidas a la baja', editor: '金吾财讯 / 证券之星', tipo: 'Prensa', fecha: '2026-06-30', url: 'https://wap.stockstar.com/detail/IG2026063000030056' },
  { id: 12, titulo: 'China Merchants Securities mantiene «compra fuerte» con objetivo de 55 HKD (mayo de 2026)', editor: 'Tonghuashun (10jqka)', tipo: 'Analistas', fecha: '2026-05-26', url: 'https://stock.10jqka.com.cn/20260526/c676980625.shtml' },
];
// Comparables: Yahoo (20-oct-2026), en millones de RMB. NTM = 2,4/12 de 2026e + 9,6/12 de 2027e (Ito En cierra en abril: aproximado).
const sel = [
  ['Tingyi (Master Kong)', '0322.HK', 'CN'], ['Uni-President China', '0220.HK', 'CN'], ['China Resources Beverage', '2460.HK', 'CN'], ['Eastroc Beverage', '605499.SS', 'CN'],
  ['Coca-Cola', 'KO', 'US'], ['PepsiCo', 'PEP', 'US'], ['Monster Beverage', 'MNST', 'US'], ['Danone', 'BN.PA', 'FR'], ['Suntory Beverage & Food', '2587.T', 'JP'], ['Ito En', '2593.T', 'JP'],
];
export const comparables = sel.map(([nombre, t, pais]) => {
  const d = yd[t];
  const fxp = FX[d.divisa]; const fxc = FX[d.divisa_cuentas];
  const cap = d.cap * fxp / 1e6;
  const caja = (d.caja ?? 0) * fxc / 1e6, deuda = (d.deuda ?? 0) * fxc / 1e6;
  const ev = cap + deuda - caja;
  const ventas = d.ventas * fxc / 1e6, ebitda = d.ebitda * fxc / 1e6;
  const y0 = d.trend.find((x) => x.periodo === '0y'), y1 = d.trend.find((x) => x.periodo === '+1y');
  const ntmV = (y0?.ventas && y1?.ventas) ? (y0.ventas * 2.4 / 12 + y1.ventas * 9.6 / 12) * fxc / 1e6 : null;
  const g = ntmV ? ntmV / ventas - 1 : null;
  return {
    nombre, ticker: t, pais, capitalizacion: Math.round(cap),
    ev_ventas: r2(ev / ventas), ev_ebitda_ltm: r1(ev / ebitda), ev_ebitda_ntm: g != null ? r1(ev / (ebitda * (1 + g))) : null,
    per_ntm: r1(d.per_adelantado), crecimiento_pct: g != null ? r1(g * 100) : null, margen_ebitda_pct: r1(d.margen_ebitda * 100),
    roic_pct: null, dn_ebitda: r1((deuda - caja) / ebitda), fcf_yield_pct: d.fcf != null ? r1(d.fcf * fxc / 1e6 / cap * 100) : null,
  };
});
const PRECIO_HKD = 41.88;
const D = {
  _estado: 'completa',
  identificacion: {
    nombre: 'Nongfu Spring Co., Ltd. (农夫山泉股份有限公司)', nombre_corto: 'Nongfu Spring', ticker: '9633.HK', isin: 'CNE100003TQ1', mercado: 'Bolsa de Hong Kong (Main Board), acciones H', indice_referencia: 'Hang Seng (Tracker Fund 2800.HK)',
    pais: 'China', pais_iso: 'CN', sector: 'Productos de consumo básico', industria: 'Bebidas sin alcohol', sede: 'Hangzhou (Zhejiang)', fundacion: '1996', empleados: 28000, web: 'https://www.nongfuspring.com',
    precio: r2(PRECIO_HKD * FX.HKD), fecha_precio: '2026-10-20', acciones: 11246.5, capitalizacion_publicada: Math.round(yd['9633.HK'].cap * FX.HKD / 1e6), free_float_pct: 16.0,
    max_52s: r2(56.25 * FX.HKD), min_52s: r2(37.9 * FX.HKD), volumen_medio_diario: '≈ 262 M HKD/día (3 meses)', proximos_resultados: '2027-03-23',
  },
  consenso: {
    guidance: 'La empresa no publica guía numérica de ventas ni de beneficio, ni objetivos a medio plazo. Su mensaje en los resultados del 1S26 (25-ago-2026) es cualitativo: crecer «más estable, más lento y más lejos», con 17 fuentes de agua y la innovación en té, funcionales y zumos (nota A). Dividendo: ≈ 70 % del beneficio en los últimos tres años.',
    estimaciones: [
      { periodo: '2026e', ingresos: 60138, ebitda: 26992, ebit: 23017, bpa: 1.594, dpa: 1.125, fuente: 'MarketScreener, 20-oct-2026 (EBITDA y EBIT con los ingresos financieros) [2]' },
      { periodo: '2027e', ingresos: 67436, ebitda: 30247, ebit: 25583, bpa: 1.792, dpa: 1.29, fuente: 'MarketScreener [2]' },
      { periodo: '2028e', ingresos: 74847, ebitda: 33669, ebit: 28433, bpa: 2.005, dpa: 1.446, fuente: 'MarketScreener [2]' },
    ],
    recomendaciones: { n_analistas: 28, comprar: 22, mantener: 4, vender: 2, po_medio: 45.20, po_min: 27.32, po_max: 52.38 },
    revisiones: 'El BPA de 2026e de Yahoo pasó de 1,575 a 1,599 RMB en 90 días y el de 2027e de 1,778 a 1,798 RMB, con 25-26 analistas: subidas pequeñas tras el 1S26, que batió lo esperado [3]. Las recomendaciones son estables (22 de compra, 4 de mantener y 2 de venta, igual que hace tres meses) [3]. China Merchants mantuvo en mayo «compra fuerte» con 55 HKD [12]. MarketScreener (28 analistas) da un BPA de 1,594 / 1,792 / 2,005 RMB para 2026e-2028e y un objetivo medio de 45,24 CNY [2]; Yahoo, 53,13 HKD de media (32,11-61,57 HKD) [3]. El EBITDA de MarketScreener incluye los ingresos financieros (24.377 M en 2025 frente a 23.825 M sin ellos): diferencia del 1,05 % de las ventas.',
    base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: 1.05,
    confianza: 'Media',
  },
  bolsa: {
    tipo_rentabilidad: bolsa.bolsa.tipo_rentabilidad,
    rentabilidades: bolsa.bolsa.rentabilidades,
    anual: bolsa.bolsa.anual,
    beta: bolsa.bolsa.beta, volatilidad_pct: bolsa.bolsa.volatilidad_pct, max_drawdown_pct: bolsa.bolsa.max_drawdown_pct, posicion_corta_pct: null,
    comentario: 'Rentabilidad total en HKD: −21,2 % en un año frente al −4,8 % del Tracker Fund (2800.HK) y −8,2 % en 2026 [1]. Tras subir un 40,8 % en 2025 (recuperación del agua y del té), la acción tocó máximos de 56,25 HKD el 12-nov-2025 y desde entonces cae un 25 %, con mínimo de 37,90 HKD el 25-sep-2026 [1]. La bajada no viene de los resultados (2025 +30,9 % de beneficio, 1S26 +16,6 %) sino del múltiplo: el mercado paga menos por un agua que no vuelve a crecer (+2,1 % en el 1S26) y por el miedo a la guerra de precios. Beta de 0,48 frente al Tracker Fund (mensual, 60 meses; 0,54 semanal a dos años) y volatilidad del 32,9 % [1]. No hay dato oficial de posición corta en las fuentes leídas.',
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: [
      { anio: '2021', precio_cierre: 41.99, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2022', precio_cierre: 39.33, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2023', precio_cierre: 40.79, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2024', precio_cierre: 31.96, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2025', precio_cierre: 42.11, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
    ],
    comentario: 'Precios de cierre de cada año en HKD (51,45; 44,10; 45,15; 34,00; 46,84) [1] convertidos a RMB con el tipo de cierre del año (0,8162; 0,8919; 0,9035; 0,9400; 0,8991) [6]. El PER de los últimos doce meses bajó de 66x (2021) a 52x (2022), 38x (2023), 30x (2024 y 2025) y ≈ 23x hoy: la compresión viene de 2020-2021, cuando Nongfu cotizaba como una empresa de crecimiento; desde 2024 el múltiplo es el de un consumo básico de calidad que crece al 10-15 %.',
    confianza: 'Alta',
  },
  comparables: {
    criterio: 'Bebidas envasadas chinas que venden en la misma red de tiendas (Tingyi, Uni-President China, CR Beverage, Eastroc) y grandes marcas mundiales de bebidas sin alcohol (Coca-Cola, PepsiCo, Monster, Danone por el agua Evian y Aqua, Suntory BF e Ito En por el té). Fuera Wahaha (no cotiza) y Keurig Dr Pepper (su PER lo deforma la compra de JDE Peet\'s). Datos de Yahoo del 20-oct-2026, en millones de RMB; PER NTM = PER adelantado de Yahoo [3, 6].',
    empresas: comparables,
    comentario: 'Nongfu cotiza a ≈ 22x el BPA del consenso de 2026e y ≈ 20x el de 2027e, por encima de las chinas (Tingyi 12,5x, Uni-President 12,2x, CR Beverage 14,1x, Eastroc 13,9x) y en línea con las mundiales de calidad (Coca-Cola 26,5x, Monster 35,7x, Ito En 19,6x) [3]. La prima frente a las chinas se explica por un margen EBITDA del 45 % (el triple que Tingyi) y un crecimiento del 14 % frente al 2-5 % de ellas; frente a Coca-Cola, Nongfu crece más pero es una sola marca en un solo país, con un fundador de control. Usaríamos el PER: la caja neta es una parte pequeña del valor (≈ 5 % de la capitalización).',
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2024-07', objetivo: 'Britvic (refrescos y zumos, Reino Unido)', comprador: 'Carlsberg', ev: Math.round(4100 * FX.GBP), ev_ventas: null, ev_ebitda: 13.6, prima_pct: 36, excluir: false, comentario: 'Valor empresa ≈ 4.100 M GBP; 13,6 veces el EBITDA ajustado de 12 meses (10,2 con sinergias) [8]' },
      { fecha: '2025-02', objetivo: 'Alani Nu (energéticas, EE. UU.)', comprador: 'Celsius Holdings', ev: Math.round(1800 * FX.USD), ev_ventas: 3.03, ev_ebitda: 13.1, prima_pct: null, excluir: false, comentario: '1.800 M USD sobre ≈ 595 M de ventas y ≈ 137 M de EBITDA de 2024 (12x según Celsius, con sinergias y neto de ventajas fiscales) [9]' },
      { fecha: '2021-02', objetivo: 'Nestlé Waters North America (agua: Poland Spring, Pure Life)', comprador: 'One Rock Capital y Metropoulos', ev: Math.round(4300 * FX.USD), ev_ventas: 1.13, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '4.300 M USD sobre ≈ 3.800 M de ventas de 2019; EBITDA no publicado [10]' },
    ],
    comentario: 'Las marcas de bebidas se compran a 13-14 veces el EBITDA [8, 9]; el agua de masas sin marca fuerte, a ≈ 1,1 veces las ventas [10]. Nongfu cotiza a ≈ 15 veces el EBITDA de los últimos doce meses (sin la caja), ya por encima de esas operaciones, que además llevan prima de control. Con el 84 % en manos del fundador no habrá operación: no ponderamos las transacciones. Montos convertidos a RMB al tipo del 20-oct-2026 [6].',
    confianza: 'Baja',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'bolsa', campo: 'posicion_corta_pct', tipo: 'Complemento', intentos: '1) HKEX: solo ventas en corto diarias, no posición; 2) Yahoo: sin dato para Hong Kong [3]; 3) SFC (posiciones cortas agregadas semanales): no consultado con éxito desde este entorno', decision: 'Omitido' },
  ],
};
guarda('D', D);

// ================================================================ E. Sentimiento
const fE = [
  { id: 1, titulo: 'Foro 农夫山泉 (hk09633), páginas de octubre de 2026', editor: 'Guba (Eastmoney)', tipo: 'Foros y redes', fecha: '2026-10-20', url: 'https://guba.eastmoney.com/list,hk09633.html' },
  { id: 2, titulo: 'Foro 农夫山泉 (hk09633), páginas de septiembre de 2026', editor: 'Guba (Eastmoney)', tipo: 'Foros y redes', fecha: '2026-09-23', url: 'https://guba.eastmoney.com/list,hk09633_2.html' },
  { id: 3, titulo: 'Foro 农夫山泉 (hk09633), páginas de mediados de septiembre de 2026', editor: 'Guba (Eastmoney)', tipo: 'Foros y redes', fecha: '2026-09-17', url: 'https://guba.eastmoney.com/list,hk09633_3.html' },
  { id: 4, titulo: 'Guerra de precios del agua y «agua grande» (财经天下 WEEKLY vía 36Kr)', editor: '36Kr', tipo: 'Prensa', fecha: '2026-09-08', url: 'https://eu.36kr.com/zh/p/3974040426819849' },
];
const E = {
  _estado: 'completa',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Estable',
    revisadas: [
      { plataforma: 'Guba (Eastmoney), foro de 9633', fecha: '2026-10', n_comentarios: 35, tono: 'Dividido', resumen: '«Buena empresa, acción demasiado cara» frente a «el PER más bajo desde la salida a bolsa, hay que entrar»; dudas sobre si comprar por Stock Connect por la retención del dividendo; moda del «agua grande» (botellas de 1,5 l) como señal alcista [1].' },
      { plataforma: 'Guba (Eastmoney), foro de 9633', fecha: '2026-09', n_comentarios: 40, tono: 'Negativo', resumen: 'Cansancio por la caída («ya no aguanto», «basura, no la toquéis») mezclado con la noticia de que el fundador compra acciones H (64,37-64,41 %) y con quejas sobre la promoción «abre el tapón y gana» [2].' },
      { plataforma: 'Guba (Eastmoney), foro de 9633', fecha: '2026-09', n_comentarios: 30, tono: 'Dividido', resumen: 'Debate sobre si el agua «ya no gana dinero» y el té carga con el grupo; algunos ven suelo en 38-40 HKD [3].' },
      { plataforma: 'Prensa con lectores (36Kr)', fecha: '2026-09', n_comentarios: 0, tono: 'Negativo', resumen: 'El agua barata a menos de 1 RMB por botella y el mercado del agua en caída en el 1S26 [4].' },
    ],
    temas: [
      { tema: 'Guerra de precios del agua', postura: 'Bajista', peso: 'Alto', contraste: 'Cierto en el sector (mercado del agua −7,3 % en importe en el 1S26; C\'estbon −7,9 %), pero Nongfu creció un 2,1 % en agua: gana cuota (nota B).' },
      { tema: 'Compras del fundador', postura: 'Alcista', peso: 'Medio', contraste: 'Cierto: 3,09 M de acciones H en julio-septiembre de 2026 a 38,7-40,0 HKD, unos 121 M HKD; pequeño frente a su 84 % (nota C).' },
      { tema: 'Valoración («cara» o «el PER más bajo de su historia»)', postura: 'Dividida', peso: 'Alto', contraste: 'Las dos cosas son ciertas: ≈ 20x el BPA de 2027e es el mínimo de su historia en bolsa, pero el doble que Tingyi (nota D).' },
      { tema: 'Té sin azúcar como motor', postura: 'Alcista', peso: 'Medio', contraste: 'Cierto: +30,1 % en el 1S26 y 44,2 % de las ventas (nota A).' },
    ],
    lectura: 'El particular chino está dividido y cansado, sin capitulación ni euforia: la caída del 25 % desde noviembre se lee como «buena empresa a precio que aún no es de ganga». Coincide con nuestra lectura de que el negocio va bien y el debate es el precio. No anticipa ningún riesgo que el informe no tenga; las compras del fundador son el único dato nuevo que circula, y está comprobado en HKEXnews. Va algo más cauto que los analistas (22 de 28 recomiendan comprar).',
    confianza: 'Media',
  },
  fuentes: fE,
  huecos: [],
};
guarda('E', E);
console.log('Notas A-E escritas;', comparables.length, 'comparables:', comparables.map((c) => `${c.nombre} PER ${c.per_ntm} EV/EBITDA ${c.ev_ebitda_ltm} g ${c.crecimiento_pct}`).join('; '));
