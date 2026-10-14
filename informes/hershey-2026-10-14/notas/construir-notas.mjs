// Escribe las notas A-E de The Hershey Company (corte 2026-10-14). USD, millones, ejercicio natural, US GAAP.
// Base del BPA: el AJUSTADO de la empresa (sin ganancias y pérdidas de valor razonable de los derivados de materias primas,
// sin costes de reorganización, de compras e integración ni deterioros). La cuenta (ventas, EBIT, beneficio neto) es la publicada (XBRL);
// `no_recurrentes_en_ebitda` = beneficio operativo ajustado − publicado de cada año (el motor lo devuelve al EBITDA y al EBIT).
// Deuda: corto (papel comercial y bancos) + parte corriente + largo plazo, con los arrendamientos financieros dentro (US GAAP: los operativos no).
// Ejecutar: node notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const E = 'https://www.sec.gov/Archives/edgar/data/47111';
const P = (id, titulo, fecha, url, tipo = 'Primaria', editor = 'The Hershey Company (SEC EDGAR)') => ({ id, titulo, editor, tipo, fecha, url });

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  P(1, 'Form 10-K 2025 (cuentas consolidadas y notas: 4 deuda, 13 segmentos, pensiones, compras; MD&A)', '2026-02-17', `${E}/000162828026008586/hsy-20251231.htm`),
  P(2, 'Form 10-Q del 2T26 (balance a 28-jun-2026, flujos del semestre, autocartera y recompras)', '2026-07-30', `${E}/000162828026050900/hsy-20260628.htm`),
  P(3, 'Press release: Second-Quarter 2026 Financial Results (guía 2026, conciliación del BPA ajustado)', '2026-07-30', `${E}/000162828026050769/exhibit991_2026xq2.htm`),
  P(4, 'Press release: Fourth-Quarter and Full-Year 2025 Results (BPA ajustado 2025 y 2024; guía 2026)', '2026-02-05', `${E}/000162828026005604/exhibit991-q42025.htm`),
  P(5, 'Press release: First-Quarter 2026 Results', '2026-04-30', `${E}/000162828026028569/exhibit991_2026xq1.htm`),
  P(6, 'Press release: Third-Quarter 2025 Results', '2025-10-30', `${E}/000162828025047294/exhibit991_2025xq3.htm`),
  P(7, 'Press release: Second-Quarter 2025 Results', '2025-07-30', `${E}/000004711125000109/exhibit991_2025xq2.htm`),
  P(8, 'Press release: First-Quarter 2025 Results', '2025-05-01', `${E}/000004711125000040/exhibit991_2025xq1.htm`),
  P(9, 'Press release: Fourth-Quarter and Full-Year 2024 Results (BPA ajustado 2024 y 2023)', '2025-02-06', `${E}/000004711125000011/exhibit991-q42024.htm`),
  P(10, 'Press release: Fourth-Quarter and Full-Year 2023 Results', '2024-02-08', `${E}/000004711124000004/exhibit991-q42023.htm`),
  P(11, 'Press release: Fourth-Quarter and Full-Year 2022 Results', '2023-02-02', `${E}/000004711123000003/exhibit991-q42022.htm`),
  P(12, 'Press release: Fourth-Quarter and Full-Year 2021 Results', '2022-02-03', `${E}/000004711122000008/exhibit991-q42021.htm`),
  P(13, 'Press release: Fourth-Quarter and Full-Year 2020 Results', '2021-02-04', `${E}/000004711121000004/exhibit991-q42020.htm`),
  P(14, 'Press release: Fourth-Quarter and Full-Year 2019 Results', '2020-01-30', `${E}/000004711120000003/exhibit9912019q4.htm`),
  P(15, 'Form 10-K 2022 (segmentos 2020-2022, compras de 2021, dividendos por acción)', '2023-02-17', `${E}/000004711123000012/hsy-20221231.htm`),
  P(16, 'Form 10-K 2020 (dividendos por acción 2018-2020)', '2021-02-17', `${E}/000004711121000007/hsy-20201231.htm`),
  P(17, 'XBRL companyfacts de Hershey (deuda a corto y largo, arrendamientos financieros, amortizaciones)', '2026-10-14', 'https://data.sec.gov/api/xbrl/companyfacts/CIK0000047111.json', 'Primaria', 'SEC EDGAR'),
  P(18, 'Press release: Hershey Unveils Strategy to Lead Next Generation Snacking at 2026 Investor Day', '2026-03-31', `${E}/000162828026022272/exhibit991-pressreleasedat.htm`),
  { id: 19, titulo: 'The Hershey Company (HSY) Q2 2026 Q&A: resumen de la conferencia (marco 2027, margen bruto, elasticidades)', editor: 'Quartr', tipo: 'Datos de mercado', fecha: '2026-07-30', url: 'https://quartr.com/events/the-hershey-company-hsy-q2-2026-q-a_3gheY3Oj' },
  { id: 20, titulo: 'Hershey Investor Day: objetivos a largo plazo (2-4 % orgánico, BPA +6-8 %, margen bruto ≈41 % en 2026 y ≈44 % en 2030)', editor: 'TIKR', tipo: 'Analistas', fecha: '2026-04', url: 'https://www.tikr.com/blog/hershey-investor-day-just-laid-out-a-path-to-312-what-is-the-market-missing' },
  { id: 21, titulo: 'Hershey completes acquisition of LesserEvil (precio de ≈750 M USD según la prensa; ventas de 165 M en 2024)', editor: 'Food Business News / NOSH', tipo: 'Prensa', fecha: '2025-11-19', url: 'https://www.nosh.com/news/2025/hershey-to-acquire-lesserevil-snacks' },
];

const c = (periodo, ingresos, coste_ventas, gastos_generales, ebitda, amortizaciones, ebit, rf, bai, impuestos, minoritarios, beneficio_neto, gastos_financieros, nr, bpa, dpa, acc) =>
  ({ periodo, ingresos, coste_ventas, gastos_generales, ebitda, amortizaciones, ebit, resultado_financiero: rf, bai, impuestos, minoritarios, beneficio_neto, gastos_financieros, participadas_en_ebitda: null, no_recurrentes_en_ebitda: nr, bpa, dpa, dpa_extraordinario: 0, acciones_diluidas: acc });
const cuenta = [
  c('2019', 7986.3, 4363.8, 1905.9, 1887.5, 291.5, 1596.0, -215.2, 1380.8, 234.0, -2.9, 1149.7, 152.1, 91.9, 5.78, 2.990, 210.8),
  c('2020', 8149.7, 4448.5, 1890.9, 2077.6, 294.9, 1782.7, -287.7, 1495.0, 219.6, -3.3, 1278.7, 153.5, 47.5, 6.29, 3.154, 209.3),
  c('2021', 8971.3, 4922.7, 2001.4, 2358.7, 315.0, 2043.7, -246.5, 1797.2, 314.4, 5.3, 1477.5, 129.8, 10.2, 7.19, 3.410, 207.6),
  c('2022', 10419.3, 5920.5, 2236.0, 2639.8, 379.0, 2260.8, -343.7, 1917.1, 272.3, 0, 1644.8, 140.1, 144.6, 8.52, 3.874, 206.6),
  c('2023', 11165.0, 6167.2, 2436.5, 2980.7, 419.8, 2560.9, -389.0, 2171.9, 310.1, 0, 1861.8, 161.5, 138.2, 9.59, 4.456, 205.5),
  c('2024', 11202.3, 5901.4, 2373.6, 3353.5, 455.3, 2898.2, -424.3, 2473.9, 252.7, 0, 2221.2, 174.3, -303.0, 9.37, 5.480, 203.5),
  c('2025', 11692.6, 7769.9, 2460.6, 1945.2, 503.7, 1441.5, -227.3, 1214.2, 330.9, 0, 883.3, 224.8, 528.9, 6.31, 5.480, 203.4),
];

const b = (periodo, activo_total, activo_corriente, pasivo_corriente, pasivo_total, fondo_comercio, intangibles, inmovilizado_material, existencias, clientes, proveedores, caja, deuda_financiera, patrimonio_neto, minoritarios, reservas) =>
  ({ periodo, activo_total, activo_corriente, pasivo_corriente, pasivo_total, fondo_comercio, intangibles, inmovilizado_material, existencias, clientes, proveedores, activos_contrato: null, pasivos_contrato: null, caja, deuda_financiera, arrendamientos: 0, patrimonio_neto, minoritarios, reservas });
const historicoB = [
  b('2019', 8140.4, 2117.1, 2008.8, 6395.4, 1986.0, 1341.2, 2153.1, 815.3, 568.5, 550.8, 493.3, 4266.5, 1739.2, 5.8, 1290.5),
  b('2020', 9131.8, 2977.9, 1891.7, 6894.0, 1988.2, 1295.2, 2285.3, 964.2, 615.2, 580.1, 1144.0, 4602.6, 2234.4, 3.5, 1928.7),
  b('2021', 10412.2, 2246.2, 2493.3, 7655.0, 2633.2, 2037.6, 2586.2, 988.5, 671.5, 692.3, 329.3, 5028.8, 2757.2, 0, 2719.9),
  b('2022', 10948.8, 2620.4, 3257.2, 7649.3, 2607.0, 1966.3, 2769.7, 1173.1, 711.2, 970.6, 463.9, 4791.4, 3299.5, 0, 3589.8),
  b('2023', 11902.9, 2912.1, 3008.4, 7803.9, 2696.1, 1879.2, 3309.7, 1341.0, 823.6, 1086.2, 401.9, 4814.0, 4099.1, 0, 4562.3),
  b('2024', 12946.9, 3759.5, 3929.5, 8232.2, 2705.8, 1873.9, 3458.9, 1254.1, 800.4, 1159.2, 730.7, 5102.2, 4714.7, 0, 5698.3),
  b('2025', 13741.3, 3588.9, 3011.9, 9104.5, 2996.0, 2475.7, 3529.6, 1429.3, 729.5, 1255.7, 925.9, 5403.0, 4636.8, 0, 5495.4),
];

const f = (periodo, flujo_operativo, capex, pagos_arrendamientos, adquisiciones, desinversiones, dividendos, recompras, emision_acciones) =>
  ({ periodo, flujo_operativo, capex, pagos_arrendamientos, adquisiciones, desinversiones, dividendos, recompras, emision_acciones, intereses_en_financiacion: 0 });
const historicoF = [
  f('2019', 1763.9, 318.2, 4.0, 402.2, 28.1, 610.3, 527.2, 240.8),
  f('2020', 1699.7, 441.6, 4.5, 0, 1.1, 640.7, 211.2, 46.4),
  f('2021', 2082.9, 495.9, 4.4, 1601.1, 0, 686.0, 457.9, 49.8),
  f('2022', 2327.8, 519.5, 4.7, 0, 0, 775.0, 389.0, 34.2),
  f('2023', 2323.2, 771.1, 5.4, 165.8, 0, 889.1, 264.9, 26.0),
  f('2024', 2531.6, 605.9, 6.5, 75.5, 0, 1084.8, 494.2, 14.7),
  f('2025', 2277.4, 528.2, 6.3, 756.1, 0, 1085.3, 0, 21.3),
];

const seg = (nombre, descripcion, h) => ({ nombre, descripcion, tipo_resultado: 'EBIT', historico: h.map(([periodo, ingresos, resultado]) => ({ periodo, ingresos, resultado })) });

const A = {
  _estado: 'completo',
  negocio: {
    descripcion: 'Hershey es el mayor fabricante de chocolate de EE. UU. y uno de los grandes de snacks: Hershey\'s, Reese\'s, Kisses, Kit Kat (licencia de Nestlé en EE. UU.), Jolly Rancher, Twizzlers, Ice Breakers y Lily\'s en confitería; SkinnyPop, Dot\'s Homestyle Pretzels, Pirate\'s Booty y LesserEvil (comprada en noviembre de 2025) en snacks salados; y ONE y Fulfil en barritas de proteína [1]. Vende sobre todo a mayoristas y cadenas de EE. UU.: McLane, el distribuidor que sirve a Walmart y a las tiendas de conveniencia, compró el 27 % de las ventas de 2025 [1]. Fuera de EE. UU. (México, Brasil, India, Canadá, Reino Unido y exportación) factura el 12,3 % [1]. Tiene tres segmentos: Confitería de Norteamérica (81 % de las ventas de 2025), Snacks salados de Norteamérica (11 %) e Internacional (8 %) [1]. Es muy estacional: Halloween, Navidad, San Valentín y Pascua concentran buena parte de las ventas, y el tercer trimestre es el más fuerte [1].',
    como_gana_dinero: 'El beneficio sale de la confitería de Norteamérica: 2.493,8 M de los 2.738,9 M de resultado de los segmentos en 2025, con un margen del 26,3 % (34,2 % en 2023, antes del cacao caro) [1]. El coste que manda es el cacao (manteca, licor y polvo), seguido del azúcar, la leche y los frutos secos; Hershey cubre las compras con futuros y contratos a plazo desde una sociedad en Suiza y, como no aplica contabilidad de coberturas, la variación de valor de esos derivados pasa por la cuenta antes de que se use el cacao: en 2025 restó 423,2 M de beneficio operativo y en 2024 sumó 460,4 M [1]. Por eso la empresa publica un BPA ajustado que solo reconoce la ganancia o la pérdida cuando se vende el producto. El traslado a precio llega con retraso: subida del 6 % en 2025 y de unos 11-12 puntos en el 1S26, con volumen del −5 % en el semestre [1, 3]. Los snacks salados ganan menos (19,0 % de margen de segmento en 2025) pero crecen por volumen [1].',
    segmentos: [
      seg('Confitería de Norteamérica', 'Chocolate y caramelos, chicles y caramelos de menta, barritas de proteína, productos de despensa, licencias y tiendas propias en EE. UU. y Canadá', [['2020', 7084.9, 2274.6], ['2021', 7682.4, 2475.9], ['2022', 8536.5, 2811.1], ['2023', 9123.1, 3117.0], ['2024', 9118.6, 2945.7], ['2025', 9479.7, 2493.8]]),
      seg('Snacks salados de Norteamérica', 'SkinnyPop, Dot\'s, Pirate\'s Booty, LesserEvil (desde nov-2025) y venta a marca blanca', [['2020', 438.2, 75.8], ['2021', 555.4, 100.7], ['2022', 1029.4, 159.9], ['2023', 1092.7, 158.3], ['2024', 1135.7, 199.4], ['2025', 1271.3, 241.8]]),
      seg('Internacional', 'México, Brasil, India, Malasia, Reino Unido y exportación', [['2020', 626.6, 0], ['2021', 733.5, 74.2], ['2022', 853.4, 107.9], ['2023', 949.2, 148.3], ['2024', 948.0, 111.5], ['2025', 941.6, 3.3]]),
    ],
    geografias: [{ nombre: 'EE. UU.', peso_pct: 87.7 }, { nombre: 'Resto del mundo', peso_pct: 12.3 }],
    geografias_criterio: 'destino',
    clientes: 'Concentración alta: McLane Company compró el 27 % de las ventas en 2025, el 27 % en 2024 y el 28 % en 2023, y es el canal de Walmart y de la conveniencia [1]. No hay contratos de duración larga: se vende por pedido a mayoristas, cadenas, farmacias, tiendas de dólar y clubes. El poder de precios está demostrado: en 2022 subió precios un 8 % con volumen positivo, y en 2025-2026 trasladó el cacao (precio +6 % en 2025 y +11 % en el 1S26) [15, 1, 3]. El límite está a la vista: el volumen de confitería cayó un 10 % en el 2T26 y la cuota en caramelos, chicles y caramelos de menta (CMG) de EE. UU. bajó en el trimestre por la innovación de los rivales [3].',
    kpis: [
      { kpi: 'Crecimiento orgánico', valor_anterior: '4,0 % (2025, aprox.)', valor_actual: '5,8 % (1S26); guía 2026: 3-3,5 %', variacion: 'Precio, no volumen', comentario: 'Precio +11 puntos y volumen −5 en el semestre [3]' },
      { kpi: 'Volumen de Confitería de Norteamérica', valor_anterior: '−2 % (2025)', valor_actual: '−10 % (2T26)', variacion: 'Empeora', comentario: 'Elasticidad tras las subidas de precio de julio de 2025 [1, 3]' },
      { kpi: 'Margen bruto ajustado', valor_anterior: '37,2 % (2025)', valor_actual: '41,6 % (2T26)', variacion: '+350 pb en el 2T', comentario: 'Guía 2026: algo menos de +400 pb; objetivo ≈44 % en 2030 [3, 19, 20]' },
      { kpi: 'Cuota de CMG en EE. UU. (Circana)', valor_anterior: '−10 pb (2025)', valor_actual: 'Pierde cuota (12 semanas a 19-jul-2026)', variacion: 'Empeora', comentario: 'Venta al consumidor +3,7 % en el periodo [1, 3]' },
      { kpi: 'Venta al consumidor de snacks salados (sin LesserEvil)', valor_anterior: '+11,3 % (2025)', valor_actual: '+6,5 % (12 semanas a 28-jun-2026)', variacion: 'Se frena', comentario: 'Gana cuota; menos venta a marca blanca [1, 3]' },
      { kpi: 'BPA ajustado', valor_anterior: '9,37 USD (2024)', valor_actual: '6,31 USD (2025); guía 2026: 8,36-8,52', variacion: '−32,7 % y +32,5-35 %', comentario: 'El cacao caro de 2025 y su recuperación en 2026 [4, 3]' },
    ],
    confianza: 'Alta',
  },
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-28', ingresos: 12164.0, ebitda: 2692.2, ebit: 2162.8, beneficio_neto: 1489.2, bpa: 7.25, dpa: 5.644, dpa_extraordinario: 0, fcf: 2154.4, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 39.0 },
    cambios_perimetro: [
      { periodo: '2021', descripcion: 'Dot\'s Pretzels y Pretzels Inc., compradas el 13 y 14-dic-21 (y Lily\'s en junio): entran en el balance y casi nada en la cuenta del año; 1.601 M pagados en total' },
      { periodo: '2025', descripcion: 'LesserEvil, comprada el 18-nov-25 (≈750 M): entra en el balance y solo seis semanas en la cuenta' },
    ],
    comentario: 'Las ventas pasaron de 7.986,3 M en 2019 a 11.692,6 M en 2025 (+4,4 % en 2025, con precio +6 %, compras +1 % y volumen −1 %) [1]. Las compras de 2021 (Lily\'s, Dot\'s y Pretzels) aportaron 4,3 puntos en 2022 [15]. El margen operativo ajustado subió de 21,1 % (2019) a 24,2 % (2023) y cayó a 16,9 % en 2025 por el cacao (736,6 M más de coste de materias primas) y los aranceles (287,2 M de coste logístico y de fabricación, con aranceles dentro) [14, 10, 4, 1]. En 2026 se recupera: 21,2 % de margen operativo ajustado en el 1S26 frente al 18,8 % del 1S25 [3]. El BPA publicado salta mucho más que el negocio porque incluye la valoración a mercado de los derivados de cacao: 10,92 USD en 2024 frente a 9,37 ajustado, y 4,34 en 2025 frente a 6,31 ajustado [4].',
    ajustes: 'Usamos el BPA AJUSTADO de la empresa en toda la serie (columna BPA, historia del PER, consenso y escenarios), porque el publicado lleva la ganancia o pérdida de valor razonable de los derivados de materias primas antes de que el cacao se use: −2,08 USD por acción en 2025 (423,2 M antes de impuestos en el resultado no asignado) y +2,27 aprox. en 2024 [4, 1]. Las otras partidas excluidas son costes de reorganización (programa AAA: 0,29 USD en 2025), de compras e integración (0,20 USD) y deterioros (0,03 USD) [4]. La cuenta (ventas, EBIT, beneficio) es la publicada; `no_recurrentes_en_ebitda` devuelve al EBITDA la diferencia entre beneficio operativo ajustado y publicado de cada año (528,9 M en 2025; −303,0 M en 2024, ganancia) [4, 9, 10, 11, 12, 13, 14]. No ajustamos los pagos en acciones (≈ 70 M al año) ni las pérdidas de las inversiones en créditos fiscales (dentro de «otros gastos»: 258,6 M en 2024), que la propia empresa deja en el ajustado y compensa con un tipo efectivo bajo [1].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '4T24', ingresos: 2887.5, crecimiento_pct: 8.7, crecimiento_organico_pct: 9.0, ebitda: null, margen_ebitda_pct: null, bpa: 2.69, vs_consenso: null },
      { periodo: '1T25', ingresos: 2805.4, crecimiento_pct: -13.8, crecimiento_organico_pct: -13.2, ebitda: null, margen_ebitda_pct: null, bpa: 2.09, vs_consenso: null },
      { periodo: '2T25', ingresos: 2614.7, crecimiento_pct: 26.0, crecimiento_organico_pct: 26.3, ebitda: null, margen_ebitda_pct: null, bpa: 1.21, vs_consenso: null },
      { periodo: '3T25', ingresos: 3181.4, crecimiento_pct: 6.5, crecimiento_organico_pct: 6.2, ebitda: null, margen_ebitda_pct: null, bpa: 1.30, vs_consenso: null },
      { periodo: '4T25', ingresos: 3091.0, crecimiento_pct: 7.0, crecimiento_organico_pct: 5.7, ebitda: null, margen_ebitda_pct: null, bpa: 1.71, vs_consenso: null },
      { periodo: '1T26', ingresos: 3104.2, crecimiento_pct: 10.6, crecimiento_organico_pct: 7.9, ebitda: null, margen_ebitda_pct: null, bpa: 2.35, vs_consenso: null },
      { periodo: '2T26', ingresos: 2787.3, crecimiento_pct: 6.6, crecimiento_organico_pct: 3.6, ebitda: null, margen_ebitda_pct: null, bpa: 1.90, vs_consenso: 'Superior' },
    ],
    ultima_presentacion: 'En la presentación del 2T26 (30-jul-2026) la dirección habló de un «primer semestre fuerte» y de recuperación de beneficio: BPA ajustado de 1,90 USD (+57 %) con el margen bruto ajustado en el 41,6 % (+350 pb) por precio, cacao más barato y ahorros [3]. Estrechó la guía hacia arriba (ventas +4,5-5 %, orgánico +3-3,5 %, BPA ajustado +32,5-35 %, 8,36-8,52 USD) pero bajó algo la de margen bruto («algo menos de 400 pb») por logística y por los snacks salados, que se quedaron cortos de volumen por problemas de ejecución en multipacks y en Dot\'s [3, 19]. Las preguntas se repitieron sobre el volumen: −10 % en confitería, cuota de CMG a la baja por la innovación de la competencia y cuánto precio habrá que devolver cuando el cacao baje [3, 19]. Para 2027 la dirección fijó el punto de partida del crecimiento orgánico de confitería en el 2 %, la parte baja de su algoritmo del 2-4 %, por una Pascua más corta [19]. No cuantificó cuánto margen bruto ganará en 2027 ni cómo de cubierto está el cacao de ese año, más allá de hablar de «visibilidad de costes» [3]. En el día del inversor (31-mar-2026) había fijado el marco: crecimiento orgánico del 2-4 %, BPA +6-8 % y margen bruto hacia el 44 % en 2030 [18, 20].',
    confianza: 'Alta',
  },
  balance: {
    historico: historicoB,
    vencimientos: [
      { anio: '2026', importe: 500 }, { anio: '2027', importe: 193.6 }, { anio: '2028', importe: 850 }, { anio: '2029', importe: 300 }, { anio: '2030', importe: 850 }, { anio: '2031+', importe: 2450 },
    ],
    liquidez: 'Caja de 791,2 M al 28-jun-2026 y línea de crédito comprometida de 1.875 M hasta octubre de 2030 (ampliable en 1.000 M), que respalda el papel comercial; líneas bancarias de 517 M [2, 1].',
    rating: null,
    coste_deuda_pct: 4.0,
    vida_media_anios: null,
    otros_pasivos: 'Pensiones: superávit de 20,8 M en los planes de prestación definida y obligación de 107,6 M en otras prestaciones (sanidad de jubilados), sin fondos; neto, 86,8 M de déficit (≈ 66 M después de impuestos), que va al puente [1]. Arrendamientos operativos fuera de la deuda (US GAAP: su gasto está en el EBITDA); los financieros (73,5 M) están dentro de la deuda [17]. Covenants de la línea de crédito cumplidos a cierre de 2025 [1]. Compromisos de compra de materias primas y derivados de cacao: las pérdidas o ganancias pendientes se ven en el resultado no asignado y no son deuda. El 28 % de la plantilla tiene convenio colectivo; en 2026 se renegocian seis centros [1].',
    comentario: 'La deuda bruta pasó de 5.102,2 M a cierre de 2024 a 5.403,0 M a cierre de 2025 y 5.610,7 M en junio de 2026: en febrero de 2025 emitió 2.000 M en bonos (4,55-5,10 %) para devolver papel comercial, que bajó de 1.145,6 M a cero [1, 2]. Con un EBITDA ajustado de 2.474 M en 2025 la deuda neta era 1,8 veces el EBITDA; con el EBITDA de los últimos doce meses vuelve a unas 1,8 veces pese a las recompras del semestre (439,4 M) [2]. El circulante sube en verano por la estacionalidad y por el cacao caro: existencias de 1.743,3 M en junio frente a 1.429,3 M en diciembre [2]. El coste medio de la deuda subirá: los gastos por intereses previstos para 2026 son 200-210 M frente a 190 M en 2025 [3, 1].',
    confianza: 'Alta',
  },
  flujos: {
    historico: historicoF,
    comentario: 'El flujo de explotación fue de 2.277,4 M en 2025 (2.531,6 M en 2024) pese al beneficio publicado de 883,3 M, porque las pérdidas de valor razonable de los derivados no son caja; el capex bajó de 771,1 M en 2023 (pico del sistema informático y de nuevas líneas) a 528,2 M en 2025, y la guía de 2026 es de 425-475 M (≈ 3,7 % de las ventas) [1, 3]. Flujo libre de 1.749 M en 2025 y de 2.154 M en los últimos doce meses a junio [1, 2]. En 2021-2025 se pagaron 4.220 M en dividendos, se recompraron 1.606 M y se invirtieron 2.598 M en compras [1, 15]. Estimación propia: el capex de mantenimiento ronda la amortización del inmovilizado material (328,5 M en 2025, el 2,8 % de las ventas) [17].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'Ernst & Young LLP', anios_auditor: 10, opinion: 'Favorable (cuentas y control interno, ejercicio 2025)',
    comentario: 'Las cifras son de calidad alta pero con mucho ruido contable. El ruido viene de los derivados de materias primas sin contabilidad de coberturas: el BPA publicado fue de 10,92 USD en 2024 y de 4,34 en 2025 frente a 9,37 y 6,31 ajustados [4]. La diferencia es de calendario (la ganancia o la pérdida se reconoce en el ajustado cuando se vende el producto), no inventada, y la empresa concilia partida a partida [3, 4]. Hay que vigilar tres cosas. Los costes de reorganización se repiten (programa AAA 2024-2026: 0,30-0,35 USD por acción en 2026). Las compras de 2021 dejaron 2.996 M de fondo de comercio y 2.476 M de intangibles, el 39,8 % del activo. Y el tipo efectivo bajo de 2023-2024 (14,3 % y 10,2 %) sale de las inversiones en créditos fiscales, cuyo coste va a «otros gastos» [1]. Altman, Piotroski y Beneish del motor se leen con cuidado en 2024 y 2025 por los derivados: el EBIT publicado se movió −50 % y el ajustado −24 %.',
    senales: [
      { senal: 'BPA publicado y ajustado muy distintos por los derivados de cacao', nivel: 'Media', comentario: '2025: 4,34 frente a 6,31 USD; en 2026 al revés (2T26: 2,26 frente a 1,90) [4, 3]' },
      { senal: 'Costes de reorganización recurrentes excluidos del ajustado', nivel: 'Baja', comentario: '0,29 USD en 2025 y 0,30-0,35 USD previstos en 2026 [3]' },
      { senal: 'Fondo de comercio e intangibles del 39,8 % del activo', nivel: 'Baja', comentario: 'Sin deterioros relevantes de las compras de 2021; deterioro de 0,03 USD en 2025 [1, 4]' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Dividendo creciente y prioritario: 5,48 USD por acción en 2025 y 1,452 trimestral desde febrero de 2026 (5,81 anualizado, +6 %); 384 trimestres seguidos [1]. Recompras para compensar la dilución y con programas del consejo: quedan ≈270 M del programa de 2023 y en junio de 2026 se aprobaron 500 M más [2]. Prioridades declaradas: invertir en el negocio y en capacidad, dividendo, compras que encajen (snacks salados y «mejor para ti») y recompras [1, 18].',
    adquisiciones: [
      { anio: '2018', objetivo: 'Amplify Snack Brands (SkinnyPop)', importe: 1338.5, ev_ebitda: null, financiacion: 'Deuda', resultado: 'Base del segmento de snacks salados, que pasó de 438 M de ventas en 2020 a 1.271 M en 2025 con margen del 19 % [1, 15]' },
      { anio: '2019', objetivo: 'ONE Brands (barritas de proteína)', importe: 402.2, ev_ebitda: null, financiacion: 'Caja', resultado: 'Integrada en Confitería de Norteamérica; sin deterioro [1]' },
      { anio: '2021', objetivo: 'Lily\'s, Dot\'s Pretzels y Pretzels Inc.', importe: 1601.1, ev_ebitda: null, financiacion: 'Caja y papel comercial', resultado: 'Dot\'s es la marca que más crece del segmento salado; volumen +8 % en 2025 [1, 15]' },
      { anio: '2023', objetivo: 'Activos de Weaver Popcorn (capacidad)', importe: 165.8, ev_ebitda: null, financiacion: 'Caja', resultado: 'Integra la fabricación de SkinnyPop [1]' },
      { anio: '2024', objetivo: 'Sour Strips', importe: 75.5, ev_ebitda: null, financiacion: 'Caja', resultado: 'Pequeña; aporta en 2025 [1]' },
      { anio: '2025', objetivo: 'LesserEvil (palomitas y snacks orgánicos)', importe: 756.1, ev_ebitda: null, financiacion: 'Caja y bonos', resultado: '≈4,5 veces las ventas de 2024 [21]; aporta ≈22 puntos al crecimiento del segmento salado en el 2T26 [3]' },
    ],
    comentario: 'Asignador de capital correcto, sin errores grandes: en 2021-2025 devolvió 5.826 M (dividendos y recompras) y compró por 2.598 M, sobre todo snacks salados, que hoy dan el 11 % de las ventas y el 9 % del resultado de los segmentos [1]. El rendimiento de lo comprado es modesto: 241,8 M de resultado de segmento en 2025 sobre unos 3.600 M invertidos en el salado desde 2018 (≈ 6,7 % antes de impuestos y de costes centrales). El dividendo se mantuvo en 2025 con un BPA ajustado de 6,31 USD (87 % de reparto) y sube en 2026; el número de acciones cayó de 210,8 M diluidas en 2019 a 202,7 M en el 2T26 [4, 2].',
    confianza: 'Alta',
  },
  fuentes: fA,
  huecos: [
    { seccion: 'balance', campo: 'rating', tipo: 'Complemento', intentos: '1) 10-K 2025 (solo menciona la calificación en general); 2) 10-Q del 2T26 (sin dato); 3) comunicados de las emisiones de bonos de 2025 en EDGAR (no se leyeron por presupuesto)', decision: 'Omitido' },
    { seccion: 'trimestres', campo: 'consenso previo de cada trimestre salvo el 2T26', tipo: 'Complemento', intentos: '1) Comunicados (no lo dan); 2) búsqueda de prensa (solo el 2T26: 1,90 frente a 1,43 USD); 3) Stock Analysis (sin histórico gratuito)', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Ficha sectorial «Chocolate y confitería prémium» (tamaño del chocolate mundial, cuotas Euromonitor, ciclo del cacao)', editor: 'Elaboración propia (repositorio)', tipo: 'Sectorial', fecha: '2026-10-14', url: 'sectores/chocolate-2026-10-14.md' },
  { id: 2, titulo: 'Ficha sectorial «Galletas y snacks de marca» (márgenes de las marcas globales, riesgos GLP-1 y marca blanca)', editor: 'Elaboración propia (repositorio)', tipo: 'Sectorial', fecha: '2026-10-14', url: 'sectores/galletas-snacks-2026-10-14.md' },
  P(3, 'Form 10-K 2025 (competencia, materias primas, regulación, EUDR, cliente principal)', '2026-02-17', `${E}/000162828026008586/hsy-20251231.htm`),
  P(4, 'Press release: Second-Quarter 2026 Results (cuota de CMG y snacks salados, Circana)', '2026-07-30', `${E}/000162828026050769/exhibit991_2026xq2.htm`),
  { id: 5, titulo: 'Cocoa futures (CC=F), cierres mensuales 2024-2026: 10.987 USD/t en ene-2025, 3.494 en abr-2026, 6.650 en ago-2026 y 5.728 el 14-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/CC%3DF/history/' },
  { id: 6, titulo: 'Informe value de Lindt & Sprüngli (14-oct-2026): ventas, margen EBIT, volumen/mezcla y valoración', editor: 'Elaboración propia (repositorio)', tipo: 'Analistas', fecha: '2026-10-14', url: 'informes/lindt-2026-10-14/' },
  { id: 7, titulo: 'Mondelez International: ventas y beneficio operativo 2025 (XBRL)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-02', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0001103982.json' },
  { id: 8, titulo: 'PepsiCo: ventas y beneficio operativo 2025 (XBRL)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-02', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0000077476.json' },
  { id: 9, titulo: 'Hershey Investor Day: GLP-1 y escenarios de consumo (comentarios del director financiero)', editor: 'TIKR', tipo: 'Analistas', fecha: '2026-04', url: 'https://www.tikr.com/blog/hershey-investor-day-just-laid-out-a-path-to-312-what-is-the-market-missing' },
  P(10, 'Form 10-K 2022 (historia de las compras de 2021)', '2023-02-17', `${E}/000004711123000012/hsy-20221231.htm`),
  P(11, 'Definitive proxy statement 2026 (Milton Hershey School Trust y Hershey Trust Company)', '2026-03-25', `${E}/000162828026021065/hsy-20260325.htm`),
  { id: 12, titulo: 'Hershey rejects $23 billion Mondelez takeover offer; Mondelez\'s bid gaps in Hershey (bloqueo de 2002)', editor: 'CNBC / Fortune', tipo: 'Prensa', fecha: '2016-07-01', url: 'https://www.cnbc.com/2016/07/01/hershey-rejects-23-billion-mondelez-takeover-offer.html' },
];

const B = {
  _estado: 'completo',
  historia: {
    resumen: 'Milton S. Hershey fundó la empresa en 1894 en Pensilvania y en 1909 creó la Milton Hershey School, un internado gratuito para niños sin recursos; desde 1918 el fideicomiso de la escuela es el accionista de control, hoy con el 79 % de los votos a través de las acciones de clase B [11]. El negocio se construyó en EE. UU. con marcas propias y con licencias (Kit Kat, de Nestlé; Cadbury, de Mondelez). El fideicomiso ha bloqueado ventas: en 2002 y en 2016, cuando el consejo rechazó la oferta de Mondelez de 107 USD por acción (≈23.000 M USD) [12]. Desde 2018 la empresa diversifica hacia los snacks salados (Amplify, Dot\'s, LesserEvil) y en 2025 cambió de consejero delegado: Kirk Tanner, que venía de dirigir Wendy\'s y antes las bebidas de PepsiCo en Norteamérica, sustituyó a Michele Buck [3, 11].',
    hitos: [
      { anio: '1894', hito: 'Milton Hershey funda la empresa de chocolate en Pensilvania' },
      { anio: '1909', hito: 'Creación de la Milton Hershey School; su fideicomiso controla la empresa desde 1918 [11]' },
      { anio: '1970', hito: 'Licencia de Kit Kat en EE. UU. (Rowntree, hoy Nestlé) [3]' },
      { anio: '2002', hito: 'El fideicomiso bloquea una oferta de compra de la empresa [12]' },
      { anio: '2016', hito: 'El consejo rechaza la oferta de Mondelez de 107 USD por acción (≈23.000 M USD) [12]' },
      { anio: '2018', hito: 'Compra Amplify Snack Brands (SkinnyPop): entrada en snacks salados [3]' },
      { anio: '2021', hito: 'Compra Lily\'s, Dot\'s Pretzels y Pretzels Inc. por 1.601 M [10]' },
      { anio: '2024-2025', hito: 'El cacao pasa de ≈4.000 a cerca de 11.000 USD/t; el BPA ajustado cae un 33 % en 2025 [5, 3]' },
      { anio: '2025', hito: 'Kirk Tanner, consejero delegado desde el 18-ago-2025; compra de LesserEvil [11, 3]' },
      { anio: '2026', hito: 'Día del inversor (31-mar), venta de acciones ordinarias del fideicomiso y nuevo director financiero (sep) [11]' },
    ],
    confianza: 'Media',
  },
  sector: {
    definicion: 'El mercado de referencia es el chocolate de consumo mundial en valor a precio de venta al público (perímetro de la ficha sectorial y de las cuotas de Euromonitor que publican las empresas), en dólares [1]. Hershey compite además en caramelos, chicles y caramelos de menta y en snacks salados de EE. UU., que no entran en esa cifra: por eso la prueba de cuota del DCF se hace a mano con las ventas de chocolate y no con las del grupo. Usamos el tamaño de la ficha (estimación propia a partir de la cuota de Lindt) y lo contrastamos con dos casas de estudios (Allied: 87.500 M USD en 2023; Lucintel: 123.700 M USD en 2030) [1].',
    tamano: '≈ 122.200 M USD en 2025 (102.000 M CHF a 0,8349 CHF/USD) [1]',
    unidad_serie: 'millones de USD',
    serie: [{ anio: '2025', tamano: 122200 }, { anio: '2026e', tamano: 127100 }, { anio: '2027e', tamano: 132200 }, { anio: '2028e', tamano: 137500 }, { anio: '2029e', tamano: 143000 }, { anio: '2030e', tamano: 145500 }],
    tcac_historico_pct: null,
    tcac_previsto_pct: 4.0,
    cr5_pct: 51.5,
    estructura: 'Moderadamente concentrada',
    drivers: [
      { driver: 'Precio del cacao', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Futuro de 10.987 USD/t en ene-2025, 3.494 en abr-2026 y 5.728 el 14-oct-2026 [5]: sube el valor del mercado y hunde el volumen' },
      { driver: 'Elasticidad al precio tras dos años de subidas', efecto: '−', horizonte: 'Cíclico', evidencia: 'Volumen de confitería de Hershey −10 % en el 2T26 y −6,6 % en Lindt en 2025 [4, 6]' },
      { driver: 'Fármacos GLP-1 (semaglutida, tirzepatida) y salud', efecto: '−', horizonte: 'Estructural', evidencia: 'La dirección de Hershey dice que sus equipos «se obsesionan» con los escenarios de GLP-1 al planificar 2026-2027 [9]; sin cifra pública de efecto' },
      { driver: 'Snacks salados y «mejor para ti»', efecto: '+', horizonte: 'Estructural', evidencia: 'Venta al consumidor de snacks salados de Hershey +11,3 % en 2025 y +6,5 % en el 2T26 [3, 4]' },
      { driver: 'Marca blanca', efecto: '−', horizonte: 'Estructural', evidencia: 'Gana cuota en Europa y EE. UU. con el cacao caro [1, 2]; Hershey reduce sus ventas a marca blanca en salado [4]' },
      { driver: 'Estacionalidad y fiestas', efecto: '+', horizonte: 'Estructural', evidencia: 'Halloween, Navidad, San Valentín y Pascua; la Pascua corta de 2027 resta [3]' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Cuatro grandes (Mars, Mondelez, Ferrero, Hershey) en EE. UU. con marcas fuertes; la innovación de los rivales le quitó cuota de CMG en el 2T26 [4]' },
      { fuerza: 'Poder de los clientes', intensidad: 4, justificacion: 'McLane compra el 27 % de las ventas y Walmart pesa mucho; los distribuidores empujan la marca blanca [3]' },
      { fuerza: 'Poder de los proveedores', intensidad: 4, justificacion: 'El cacao se concentra en Costa de Marfil y Ghana, que fijan el precio en origen; el futuro se multiplicó por tres en 2023-2025 [5, 1]' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Escala de distribución y de publicidad en EE. UU.; las marcas nuevas acaban compradas (Lily\'s, LesserEvil) [10, 3]' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'Otros snacks, productos sin azúcar y menos apetito por los GLP-1 [9]' },
    ],
    ciclo: { posicion: 'Recuperación', comentario: 'El ciclo que importa es el del cacao, no el económico: el margen bruto ajustado de Hershey cayó al 37,2 % en 2025 y vuelve al 41,6 % en el 2T26 con el cacao a la mitad que en 2025 [3, 5]. El chocolate aguanta las recesiones: en 2008-09 y en 2020 Hershey creció (ventas +3,3 % y +2,0 % en 2020) [3]. En 2022 subió precios un 8 % con volumen positivo; el problema llegó en 2024-2026, con subidas de doble dígito y volumen a la baja [10, 4]. El rebote del cacao en agosto de 2026 (6.650 USD/t) por El Niño y la cosecha de Ghana es el riesgo para 2027-2028 [5].' },
    regulacion: 'Aranceles de EE. UU. de 2025 sobre el cacao y otros insumos importados: unos 160-170 M de coste en 2025; la guía de 2026 no incluye posibles devoluciones [3, 4]. Reglamento europeo de deforestación (EUDR), con diligencia sobre cacao, palma y soja, que afecta poco a Hershey (12 % de ventas fuera de EE. UU.) [3]. Etiquetado y publicidad de productos con azúcar, y estudios sobre metales pesados en el chocolate negro (2022-2023) [1]. Precio en origen fijado por Costa de Marfil y Ghana.',
    tendencias: 'Tres tendencias. La primera, la sustitución parcial del chocolate por snacks salados y de proteína, que Hershey sigue con sus compras: el salado y la proteína son ya el 11 % de sus ventas [3]. La segunda, los GLP-1: reducen el picoteo de los usuarios, y la dirección los trata como escenario de planificación sin cuantificar el efecto [9]. La tercera, la marca blanca y las promociones tras dos años de subidas de precio, más fuertes en Europa que en EE. UU. [1, 2]. Hershey gana con la primera, pierde con las dos siguientes y compensa con innovación (tamaños pequeños, Reese\'s y Kit Kat con sabores, sin azúcar con Lily\'s).',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 7.8,
    posicion: '5.º mundial en chocolate en valor (Euromonitor 2025), tras Mars, Mondelez, Ferrero y Nestlé; líder del chocolate en EE. UU. y n.º 1 o 2 en CMG en EE. UU. [1, 4]',
    competidores: [
      { nombre: 'Mars (Mars Wrigley)', pais: 'EE. UU.', ticker: null, ingresos: null, cuota_pct: 12.6, margen_ebit_pct: null, comentario: 'No cotiza; líder mundial; compró Kellanova (Pringles) y se refuerza en snacks [1]' },
      { nombre: 'Mondelez International', pais: 'EE. UU.', ticker: 'MDLZ', ingresos: 38537, cuota_pct: 12.3, margen_ebit_pct: 9.2, comentario: 'Milka, Cadbury, Oreo; margen operativo publicado con derivados dentro [7]' },
      { nombre: 'Ferrero', pais: 'Italia/Luxemburgo', ticker: null, ingresos: null, cuota_pct: 10.6, margen_ebit_pct: null, comentario: 'Kinder, Ferrero Rocher y el negocio de caramelos que compró a Nestlé en EE. UU. (2018) [1]' },
      { nombre: 'Nestlé', pais: 'Suiza', ticker: 'NESN', ingresos: null, cuota_pct: 8.2, margen_ebit_pct: null, comentario: 'Kit Kat fuera de EE. UU. (Hershey tiene la licencia en EE. UU.) [1]' },
      { nombre: 'Lindt & Sprüngli', pais: 'Suiza', ticker: 'LISP', ingresos: 7086, cuota_pct: 5.8, margen_ebit_pct: 16.4, comentario: 'Prémium; en EE. UU. con Lindor, Ghirardelli y Russell Stover; 5.915,8 M CHF en 2025 [6]' },
      { nombre: 'PepsiCo (Frito-Lay)', pais: 'EE. UU.', ticker: 'PEP', ingresos: 93925, cuota_pct: null, margen_ebit_pct: 12.2, comentario: 'Líder de los snacks salados en EE. UU., el segmento donde Hershey crece [8]' },
    ],
    foso: {
      veredicto: 'Amplio', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'No aplica a un fabricante de alimentos.' },
        { fuente: 'Costes de cambio', puntuacion: 1, evidencia: 'El consumidor cambia de marca sin coste; la lealtad es de hábito, no contractual.' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 5, evidencia: 'Hershey\'s, Reese\'s y la licencia de Kit Kat: margen de segmento de confitería del 32-34 % en 2022-2024 frente al 9-16 % de margen operativo de Mondelez y Lindt [3, 6, 7].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Escala de compra y fábricas en EE. UU.; el programa AAA ahorra ≈100 M en 2026 [3, 4].' },
        { fuente: 'Escala eficiente', puntuacion: 4, evidencia: 'Espacio en lineal y en caja de pago en conveniencia y Walmart; las marcas nuevas se integran en su distribución [3].' },
      ],
    },
    amenazas: 'Tres amenazas, de mayor a menor. Primera, que la caída de volumen deje de ser elasticidad pasajera y se convierta en pérdida de hábito: el volumen de confitería cayó un 10 % en el 2T26 y la cuota de CMG bajó por la innovación de los rivales [4]; probabilidad media. Segunda, los GLP-1: menos consumo de dulces entre los usuarios, que crecen cada año [9]; probabilidad media y efecto lento. Tercera, la marca blanca y Mars reforzada con Kellanova en el canal de conveniencia [1]; probabilidad baja-media. El foso de marca no se ha estrechado en precio, pero sí en volumen.',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Lo material es el cacao: abastecimiento de Costa de Marfil y Ghana con riesgo de trabajo infantil, deforestación (EUDR) y clima; Hershey compra desde su sociedad suiza y declara programas de origen sostenible [3]. Segundo, el azúcar y la salud: etiquetado, impuestos al azúcar y el efecto de los GLP-1 en el consumo [9]. Tercero, envases de plástico y emisiones de las fábricas, con menos peso en la cuenta.',
    controversias: 'Estudios de Consumer Reports de 2022-2023 sobre plomo y cadmio en el chocolate negro, que afectaron a Hershey y a otros fabricantes, con demandas colectivas en EE. UU.; demandas recurrentes por trabajo infantil en la cadena del cacao contra los grandes fabricantes [1]. En septiembre de 2026 ganó un pleito por el envase de las calabazas de Reese\'s de Halloween. Ninguna sanción relevante en los últimos tres años en el 10-K [3].',
    confianza: 'Media',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'esg', campo: 'calificaciones ESG', tipo: 'Complemento', intentos: '1) 10-K y proxy (no las publican); 2) web de la empresa (no consultada por presupuesto); 3) proveedores de calificaciones (de pago)', decision: 'Omitido' },
    { seccion: 'competencia', campo: 'ventas y margen de Mars, Ferrero y Nestlé (chocolate)', tipo: 'Complemento', intentos: '1) Mars y Ferrero no cotizan ni publican cuentas completas; 2) Nestlé no separa el chocolate; 3) ficha sectorial (solo cuotas)', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  P(1, 'Definitive proxy statement 2026 (consejo, comités, remuneración, accionistas, fideicomiso)', '2026-03-25', `${E}/000162828026021065/hsy-20260325.htm`),
  P(2, 'Form 8-K: resultados de la junta de 2026 (voto consultivo de remuneración)', '2026-05-08', `${E}/000162828026032947/hsy-20260505.htm`),
  P(3, 'Form 8-K y nota de prensa: Dave Hulays, director financiero', '2026-09-02', `${E}/000162828026060131/hsy-20260902.htm`),
  P(4, 'Form 8-K: salida del presidente de EE. UU. (Andrew Archambault)', '2026-04-14', `${E}/000162828026025076/hsy-20260414.htm`),
  P(5, 'Nota de prensa: Mitchell Arends, director de cadena de suministro', '2026-05-28', `${E}/000162828026038847/exhibit991-pressreleasedat.htm`),
  P(6, 'Form 8-K: nombramiento del consejero Joe Park', '2026-06-09', `${E}/000162828026041894/hsy-20260603.htm`),
  { id: 7, titulo: 'Form 4 de Hershey, 14-oct-2025 a 14-oct-2026 (herramienta form4.mjs sobre EDGAR)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-14', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000047111&type=4' },
  { id: 8, titulo: 'Hershey stakeholder sells 30,000 shares following profit shock (anuncio del fideicomiso del 17-mar-2026)', editor: 'FoodNavigator / BakeryandSnacks', tipo: 'Prensa', fecha: '2026-04-23', url: 'https://www.bakeryandsnacks.com/Article/2026/04/23/hershey-stakeholder-sells-30000-shares-following-profit-shock-and-share-price-drop/' },
  P(9, 'Press releases de resultados 4T21-4T25 (guías anuales y resultados)', '2026-02-05', `${E}/000162828026005604/exhibit991-q42025.htm`),
  P(10, 'Form 10-K 2022 (compras de acciones al fideicomiso en 2022 y 2023)', '2023-02-17', `${E}/000004711123000012/hsy-20221231.htm`),
];

const C = {
  _estado: 'completo',
  directivos: {
    equipo: [
      { nombre: 'Kirk Tanner', cargo: 'Presidente ejecutivo de la gestión (President) y consejero delegado', desde: '2025', participacion_pct: 0.0, trayectoria: 'Consejero delegado de Wendy\'s (2024-2025) y antes de PepsiCo Beverages North America; llegó el 18-ago-2025 [1]. Compró 2.000 acciones en noviembre de 2025 (≈0,37 M USD) [7]. Primer año: margen recuperado con el cacao y guía 2026 cumplida hasta ahora.' },
      { nombre: 'Dave Hulays', cargo: 'Director financiero', desde: '2026', participacion_pct: 0.0, trayectoria: 'En Hershey desde 2012 (finanzas de Canadá, EE. UU., compras de empresas, tesorería y transformación) y 15 años en Procter & Gamble; sustituye a Steve Voskuil, que se jubila en el 1T27 [3].' },
      { nombre: 'Huong Maria T. Kraus', cargo: 'Presidenta del consejo (no ejecutiva)', desde: '2023', participacion_pct: 0.0, trayectoria: 'Directora financiera de Wedgewood Pharmacy y presidenta de Hershey Trust Company y de la Milton Hershey School: representa al accionista de control [1].' },
      { nombre: 'Mitchell Arends', cargo: 'Director de cadena de suministro', desde: '2026', participacion_pct: 0.0, trayectoria: 'Venía de Utz Brands (director de operaciones) y antes de Kraft Heinz Norteamérica; sustituye a Jason Reiman, que se jubila en abril de 2027 [5].' },
      { nombre: 'Rohit Grover', cargo: 'Presidente de Internacional', desde: null, participacion_pct: 0.0, trayectoria: 'Dirige el segmento internacional, cuyo margen cayó del 15,6 % en 2023 al 0,4 % en 2025 y a pérdidas en el 2T26 [9].' },
    ],
    historial_guidance: [
      { anio: '2022', guia: 'BPA ajustado de 7,84-7,98 USD', real: '8,52 USD', cumplida: 'Sí' },
      { anio: '2023', guia: 'BPA ajustado de 9,29-9,46 USD', real: '9,59 USD', cumplida: 'Sí' },
      { anio: '2024', guia: 'BPA ajustado plano (9,59 USD)', real: '9,37 USD (−2,3 %)', cumplida: 'No' },
      { anio: '2025', guia: 'BPA ajustado de 6,00-6,18 USD', real: '6,31 USD', cumplida: 'Sí' },
      { anio: '2026', guia: 'BPA ajustado de 8,20-8,52 USD (feb); 8,36-8,52 (jul)', real: '4,25 USD en el 1S26 (+28,4 %)', cumplida: 'Parcial' },
    ],
    comentario: 'Equipo casi nuevo: consejero delegado desde agosto de 2025, presidente de EE. UU. que se fue en mayo de 2026 tras un año, director de cadena de suministro desde junio y director financiero desde septiembre de 2026 [1, 3, 4, 5]. La rotación es alta, pero los relevos de finanzas y suministro son ordenados (anunciados con meses de transición) [3, 5]. El historial de guías es bueno: cumplió o batió en 2022, 2023 y 2025, y falló por poco en 2024 [9]. El riesgo es de ejecución: el plan del día del inversor lo tiene que ejecutar un equipo que aún no ha cerrado un ejercicio completo junto.',
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      { nombre: 'Huong Maria T. Kraus', cargo: 'Presidenta', tipo: 'Dominical', desde: '2023', comisiones: 'Ejecutiva (presidenta), Auditoría, Remuneración y Finanzas (de oficio)' },
      { nombre: 'Kirk Tanner', cargo: 'Consejero delegado', tipo: 'Ejecutivo', desde: '2025', comisiones: '—' },
      { nombre: 'Cordel Robbin-Coker', cargo: 'Consejero', tipo: 'Dominical', desde: '2024', comisiones: 'Finanzas y Riesgos (presidente), Remuneración, Ejecutiva' },
      { nombre: 'Harold Singleton III', cargo: 'Consejero', tipo: 'Dominical', desde: '2025', comisiones: 'Remuneración, Gobierno' },
      { nombre: 'Kevin M. Ozan', cargo: 'Consejero', tipo: 'Independiente', desde: '2024', comisiones: 'Auditoría (presidente), Ejecutiva, Finanzas' },
      { nombre: 'Deirdre A. Mahlan', cargo: 'Consejera', tipo: 'Independiente', desde: '2025', comisiones: 'Gobierno (presidenta), Auditoría, Ejecutiva' },
      { nombre: 'Christopher W. Brandt', cargo: 'Consejero', tipo: 'Independiente', desde: '2025', comisiones: 'Remuneración, Finanzas' },
      { nombre: 'Timothy W. Curoe', cargo: 'Consejero', tipo: 'Independiente', desde: '2025', comisiones: 'Remuneración, Gobierno' },
      { nombre: 'Barry J. Nalebuff', cargo: 'Consejero', tipo: 'Independiente', desde: '2025', comisiones: 'Auditoría, Finanzas' },
      { nombre: 'Marie Quintero-Johnson', cargo: 'Consejera', tipo: 'Independiente', desde: '2025', comisiones: 'Auditoría, Finanzas' },
      { nombre: 'Guy Persaud', cargo: 'Consejero', tipo: 'Independiente', desde: '2026', comisiones: '—' },
      { nombre: 'Joe Park', cargo: 'Consejero', tipo: 'Independiente', desde: '2026', comisiones: 'Auditoría, Finanzas' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: false,
    operaciones_vinculadas_relevantes: true, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: true, presidente_vinculado_control: true, cambios_cupula_24m: 1,
    voto_remuneracion_pct: 96.6, voto_remuneracion_contra_pct: 3.4, voto_remuneracion_contra_libre_pct: 20.4, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 16.81, fijo: 0.46, variable_corto: 1.36, variable_largo: 14.67, ratio_salario_medio: 389 },
    remuneracion: 'El consejero delegado cobró 16,81 M USD en 2025 por cuatro meses y medio (0,46 M de fijo, 1,36 M de variable anual y 14,67 M en acciones, con la concesión de entrada); anualizada, 24,9 M, 389 veces el empleado mediano [1]. El variable a largo plazo es en un 65 % acciones por objetivos a tres años y en un 35 % acciones restringidas; el máximo es el 250 % del objetivo [1]. En 2025 el voto consultivo cayó: algo más del 72 % a favor entre las acciones ordinarias, por el acuerdo de salida de la anterior consejera delegada [1]. En 2026, con el voto del fideicomiso, 96,6 % a favor; sin él, calculamos un 20,4 % en contra sobre el capital libre presente [2].',
    accionistas: [
      { nombre: 'Hershey Trust Company (fideicomiso de la Milton Hershey School)', pct: 28.0, tipo: 'Control (54,6 M de clase B con 10 votos y ≈2,1 M ordinarias; 79 % de los votos)', variacion: 'Vende ordinarias desde marzo de 2026: ≈1,45 M acciones por 267 M USD hasta el 8-oct [7, 8]' },
      { nombre: 'Vanguard Group', pct: 12.8, tipo: 'Institucional (sobre ordinarias)', variacion: '13G/A de nov-2024 [1]' },
      { nombre: 'BlackRock', pct: 8.3, tipo: 'Institucional (sobre ordinarias)', variacion: '13G/A de nov-2024 [1]' },
      { nombre: 'Capital International Investors', pct: 6.1, tipo: 'Institucional (sobre ordinarias)', variacion: '13G/A de nov-2025 [1]' },
      { nombre: 'Autocartera', pct: 10.3, tipo: 'Autocartera (20,6 M acciones sobre 221,6 M emitidas)', variacion: '+1,9 M en el 1S26 [1]' },
    ],
    insiders: [
      { fecha: '2025-11', persona: 'Kirk Tanner (consejero delegado)', operacion: 'Compra', acciones: 2000, importe: 0.37 },
      { fecha: '2026-03 a 2026-10', persona: 'Hershey Trust Company (accionista de control)', operacion: 'Venta', acciones: 1450000, importe: 266.74 },
      { fecha: '2025-10 a 2026-08', persona: 'Steven Voskuil (director financiero hasta sep-2026; plan 10b5-1)', operacion: 'Venta', acciones: 16450, importe: 3.04 },
      { fecha: '2026-02', persona: 'Rohit Grover (presidente de Internacional; plan 10b5-1)', operacion: 'Venta', acciones: 3500, importe: 0.79 },
      { fecha: '2026-02', persona: 'Jason Reiman (cadena de suministro; plan 10b5-1)', operacion: 'Venta', acciones: 2000, importe: 0.45 },
    ],
    control_y_defensas: 'El fideicomiso de la Milton Hershey School, a través de Hershey Trust Company, tiene el 28 % del capital económico y el 79 % de los votos gracias a las acciones de clase B (10 votos cada una); las ordinarias eligen solo un sexto del consejo por separado [1]. Es un blindaje completo: rechazó la oferta de Mondelez en 2016 (consejo y fideicomiso) y ninguna compra es posible sin su acuerdo. La presidenta del consejo y otros dos consejeros (Robbin-Coker y Singleton) son a la vez consejeros del fideicomiso o de la escuela [1]. Hay operaciones vinculadas recurrentes: la empresa le compró 1 M de acciones en 2022 y otro en 2023, y la comisión ejecutiva aprueba las operaciones con el fideicomiso, Hershey Entertainment & Resorts y la escuela [10, 1]. Las clase B pasan a ordinarias si el fideicomiso baja del 50 % de las B o del 15 % del total [1].',
    alertas: [
      'Venta continuada de ordinarias del accionista de control: ≈1,45 M acciones (267 M USD) entre marzo y octubre de 2026, unas 70.000 por semana [7, 8].',
      'Rotación de la cúpula: consejero delegado (ago-2025), presidente de EE. UU. (salida en mayo de 2026), director de cadena de suministro (jun-2026) y director financiero (sep-2026) [1, 3, 4, 5].',
      'Voto contra la remuneración del capital libre del 20,4 % en 2026 y cerca del 28 % entre las ordinarias en 2025 [1, 2].',
    ],
    confianza: 'Alta',
  },
  fuentes: fC,
  huecos: [],
};

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de HSY, ^GSPC y XLP (herramientas/bolsa.mjs, cierre del 14-oct-2026)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/HSY/history/' },
  { id: 2, titulo: 'HSY forecast: estimaciones de ventas y BPA 2026-2027, 23 analistas y precio objetivo', editor: 'Stock Analysis (S&P Global)', tipo: 'Analistas', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/hsy/forecast/' },
  { id: 3, titulo: 'Comparables de la ficha «Chocolate y confitería prémium» (Yahoo, 14-oct-2026, CHF; pasados a USD a 0,8349 CHF/USD)', editor: 'Elaboración propia (repositorio)', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'sectores/chocolate-2026-10-14-comparables.json' },
  { id: 4, titulo: 'Tipos de cambio USD/CHF y USD/EUR, cierre del 14-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/CHF%3DX/' },
  { id: 5, titulo: 'J.M. Smucker confirms deal to buy Hostess Brands for $5.6bn (≈17,2 veces el EBITDA ajustado de 2023)', editor: 'Just Food', tipo: 'Prensa', fecha: '2023-09-11', url: 'https://www.just-food.com/news/j-m-smucker-confirms-deal-to-buy-hostess-brands-for-5-6bn' },
  { id: 6, titulo: 'Ficha sectorial «Chocolate»: Mars–Kellanova (35.900 M USD, 16,4 veces el EBITDA ajustado, prima del 44 %)', editor: 'Elaboración propia (repositorio)', tipo: 'Sectorial', fecha: '2026-10-14', url: 'sectores/chocolate-2026-10-14.md' },
  { id: 7, titulo: 'Hershey To Acquire LesserEvil Snacks For Reported $750M', editor: 'NOSH', tipo: 'Prensa', fecha: '2025-04', url: 'https://www.nosh.com/news/2025/hershey-to-acquire-lesserevil-snacks' },
  P(8, 'Form 10-K 2022 (compras de 2021: Lily\'s, Dot\'s y Pretzels por 1.601 M)', '2023-02-17', `${E}/000004711123000012/hsy-20221231.htm`),
  P(9, 'Form 10-Q del 2T26 (acciones en circulación a 27-jul-2026)', '2026-07-30', `${E}/000162828026050900/hsy-20260628.htm`),
  P(10, 'Press release: Second-Quarter 2026 Results (guía 2026)', '2026-07-30', `${E}/000162828026050769/exhibit991_2026xq2.htm`),
  { id: 11, titulo: 'Hershey Stock Drops as Earnings Beat Overshadows Volume Slide (2T26: BPA 1,90 frente a 1,43 de consenso)', editor: 'Webull / Benzinga', tipo: 'Prensa', fecha: '2026-07-30', url: 'https://www.webull.com/news/15317460641276928' },
  { id: 12, titulo: 'Informe value de Lindt & Sprüngli del 14-oct-2026 (múltiplos de Lindt)', editor: 'Elaboración propia (repositorio)', tipo: 'Analistas', fecha: '2026-10-14', url: 'informes/lindt-2026-10-14/' },
  { id: 13, titulo: 'Hershey to webcast third quarter conference call (resultados el 29-oct-2026)', editor: 'Finviz / PR Newswire', tipo: 'Prensa', fecha: '2026-10-09', url: 'https://finviz.com/news/400861/hershey-to-webcast-third-quarter-conference-call' },
];

const tcCHF = 0.8349;
const ficha = JSON.parse(fs.readFileSync(path.join(dir, '../../../sectores/chocolate-2026-10-14-comparables.json'), 'utf8'));
const comps = ficha.filter((x) => x.ticker !== 'HSY').map((x) => ({ ...x, capitalizacion: Math.round(x.capitalizacion / tcCHF) }));
comps.unshift({ nombre: 'Lindt & Sprüngli', ticker: 'LISP', pais: 'CH', capitalizacion: Math.round(17891 / tcCHF), ev_ventas: 3.31, ev_ebitda_ltm: 15.2, ev_ebitda_ntm: 14.5, per_ntm: 23.4, crecimiento_pct: 4.1, margen_ebitda_pct: 21.8, roic_pct: 13.2, dn_ebitda: 1.1, fcf_yield_pct: 3.3 });

const bj = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));

const D = {
  _estado: 'completo',
  identificacion: {
    nombre: 'The Hershey Company', nombre_corto: 'Hershey', ticker: 'HSY', isin: 'US4278661081', mercado: 'New York Stock Exchange (acción ordinaria; las de clase B no cotizan)', indice_referencia: 'S&P 500',
    pais: 'Estados Unidos', pais_iso: 'US', sector: 'Consumo básico', industria: 'Alimentación envasada (chocolate, confitería y snacks)', sede: 'Hershey (Pensilvania, EE. UU.)', fundacion: '1894', empleados: 19595, web: 'https://www.thehersheycompany.com',
    precio: 164.25, fecha_precio: '2026-10-14', acciones: 201.5, capitalizacion_publicada: null, free_float_pct: 71,
    max_52s: 239.48, min_52s: 156.16, volumen_medio_diario: '≈ 245 M USD/día (1,41 M acciones, 3 meses)', proximos_resultados: '2026-10-29',
  },
  consenso: {
    guidance: 'Guía 2026 del 30-jul-2026: ventas +4,5-5 % (1,5 puntos de LesserEvil), orgánico +3-3,5 %, BPA ajustado +32,5-35 % (8,36-8,52 USD), tipo efectivo del 25-27 %, intereses de 200-210 M, capex de 425-475 M y ≈100 M de ahorros del programa AAA [10]. Marco a largo plazo del día del inversor (31-mar-2026): crecimiento orgánico del 2-4 % y BPA +6-8 % al año, con 2027 empezando en la parte baja (2 %) por la Pascua corta [10].',
    estimaciones: [
      { periodo: '2026e', ingresos: 12300, ebitda: null, ebit: null, bpa: 8.48, dpa: null, fuente: 'Stock Analysis (S&P Global), 20 analistas [2]' },
      { periodo: '2027e', ingresos: 12590, ebitda: null, ebit: null, bpa: 9.85, dpa: null, fuente: 'Stock Analysis (S&P Global) [2]' },
    ],
    recomendaciones: { n_analistas: 23, comprar: null, mantener: null, vender: null, po_medio: 201.05, po_min: 170, po_max: 250 },
    revisiones: 'El consenso de BPA ajustado de 2026 (8,48 USD) está en la parte alta de la guía (8,36-8,52) tras el 2T26, que batió por mucho (1,90 frente a 1,43 USD) [2, 11]. Para 2027 el consenso espera 9,85 USD (+16 %), muy por encima del +6-8 % del algoritmo de la empresa: descuenta otro año de recuperación de margen con el cacao más barato [2, 10]. Solo una fuente gratuita da estimaciones completas; el precio objetivo medio (201,05 USD; mediana 198) y la recomendación «comprar» son de la misma [2]. Sin histórico gratuito de revisiones a 3 y 12 meses.',
    base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    ...bj.bolsa,
    beta: 0.09,
    posicion_corta_pct: null,
    comentario: 'La acción cae un 13,3 % en un año frente al +16,2 % del S&P 500 y el +8,8 % del ETF de consumo básico (XLP), y un 2,1 % anual en cinco años [1]. El máximo de 52 semanas (239,48 USD) fue el 2-mar-2026, con el mercado celebrando la recuperación del margen; desde entonces ha caído un 31 % [1]. Tres hechos: el volumen de confitería (−8 % en el 1S26 y −10 % en el 2T26), que hizo caer la acción tras unos resultados que batían [11]; el rebote del cacao en agosto (6.650 USD/t); y la venta continuada de ordinarias del accionista de control desde marzo, unas 70.000 por semana [1]. La beta mensual a cinco años es casi nula (0,09; 0,39 ajustada): el precio lo mueve el cacao, no el mercado [1].',
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: bj.cierres_ejercicio.filter((x) => +x.anio >= 2019).map((x) => ({ anio: x.anio, precio_cierre: x.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: x.anio === '2025' })),
    comentario: 'Con el BPA ajustado, Hershey cotizó a 19-27 veces el BPA del mismo año en 2019-2024 (mediana de cinco años de 24,2 veces) y a 19-24 veces el del año siguiente (mediana de 21,5 veces) [1]. Hoy cotiza a unas 17 veces nuestro BPA de 2027: un descuento del 20 % frente a su historia adelantada. Excluimos 2025 al cierre (28,8 veces sobre un BPA hundido por el cacao). El descuento tiene motivos: la tasa a 10 años está en el 5,2 % (1,5-2 % en 2019-2021), el volumen cae y los GLP-1 ponen en duda el crecimiento a largo plazo; no es todo oportunidad.',
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Fabricantes cotizados de chocolate y confitería de marca de la ficha sectorial: Lindt (prémium, rival en EE. UU.), Mondelez, Nestlé, Meiji, Ezaki Glico y Orion, y Barry Callebaut como termómetro del cacao [3, 12]. Fuera: Mars y Ferrero (no cotizan) y PepsiCo (snacks salados, otro perfil). Las capitalizaciones se pasan de CHF a USD a 0,8349 [4]. Los múltiplos de la ficha usan el BPA y el EBITDA de Yahoo (ajustados en las de EE. UU.).',
    empresas: comps,
    comentario: 'Hershey cotiza a 17,2 veces el BPA de los próximos 12 meses, por debajo de la mediana del grupo (19,0) y muy por debajo de Lindt (23,4), con un margen EBITDA más alto que todas (≈ 25 % ajustado en 2026 frente al 21,8 % de Lindt y el 15,3 % de Mondelez) [3, 12]. El descuento frente a Lindt se explica por el crecimiento (Lindt vende prémium y se expande fuera de Europa; Hershey depende de EE. UU. con volumen negativo) y por la tasa libre más alta en dólares. Frente a Mondelez (19,0) y Nestlé (16,6) está en línea. Barry Callebaut y Ezaki Glico tienen PER inflados por beneficios deprimidos; Orion (8,0) está en el otro extremo: la mediana no depende de ellas.',
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2024-08', objetivo: 'Kellanova (Pringles, Cheez-It)', comprador: 'Mars', ev: 35900, ev_ventas: null, ev_ebitda: 16.4, prima_pct: 44, excluir: false, comentario: 'La mayor compra de snacks; cerró en diciembre de 2025 [6]' },
      { fecha: '2023-09', objetivo: 'Hostess Brands (Twinkies)', comprador: 'J.M. Smucker', ev: 5600, ev_ventas: null, ev_ebitda: 17.2, prima_pct: null, excluir: false, comentario: '17,2 veces el EBITDA ajustado de 2023; 13,2 con sinergias [5]' },
      { fecha: '2025-11', objetivo: 'LesserEvil (snacks orgánicos)', comprador: 'Hershey', ev: 750, ev_ventas: 4.55, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Precio de prensa; ventas de 165 M en 2024 [7]' },
      { fecha: '2021-12', objetivo: 'Lily\'s, Dot\'s Pretzels y Pretzels Inc.', comprador: 'Hershey', ev: 1601, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Tres compras en 2021; sin múltiplos publicados [8]' },
    ],
    comentario: 'Las compras de marcas de snacks con escala se pagan a 16-17 veces el EBITDA (Kellanova, Hostess) [5, 6]; Hershey cotiza a unas 13 veces el EBITDA ajustado de los próximos 12 meses. El valor de control no es operativo: el fideicomiso, con el 79 % de los votos, ha rechazado ofertas antes (Mondelez en 2016) y su venta de ordinarias no toca las clase B. Por eso no damos peso a las transacciones en el valor objetivo.',
    confianza: 'Baja',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'consenso', campo: 'EBITDA y EBIT del consenso, estimaciones de 2028 y reparto de recomendaciones', tipo: 'Complemento', intentos: '1) MarketScreener (la ficha de Hershey sale como «Inactive Instrument»); 2) Stock Analysis (solo BPA y ventas 2026-2027); 3) búsqueda de prensa (solo objetivos sueltos)', decision: 'Omitido' },
    { seccion: 'comparables', campo: 'ROIC de los comparables salvo Lindt', tipo: 'Complemento', intentos: '1) Yahoo (no lo da); 2) Stock Analysis (de pago); 3) ficha sectorial (n.d.)', decision: 'Omitido' },
    { seccion: 'bolsa', campo: 'posición corta', tipo: 'Complemento', intentos: '1) NYSE (de pago); 2) Stock Analysis (de pago); 3) Finviz (no consultado)', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Seeking Alpha: titulares y análisis de HSY (RSS, jul-oct 2026)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-14', url: 'https://seekingalpha.com/symbol/HSY' },
  { id: 2, titulo: 'Stocktwits: mensajes de $HSY (ago-oct 2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-14', url: 'https://stocktwits.com/symbol/HSY' },
  { id: 3, titulo: 'Milton Hershey School Trust sells 30,000 Hershey shares: what investors should know', editor: 'The Motley Fool', tipo: 'Foros y redes', fecha: '2026-07-18', url: 'https://www.fool.com/coverage/filings/2026/07/18/milton-hershey-school-trust-sells-30-000-hershey-shares-for-usd5-2-million-here-s-what-investors-should-know/' },
  { id: 4, titulo: 'Hershey stakeholder sells 30,000 shares following profit shock (comentario y reacción)', editor: 'ConfectioneryNews', tipo: 'Prensa', fecha: '2026-04-23', url: 'https://confectionerynews.com/Article/2026/04/23/hershey-stakeholder-sells-30000-shares-following-profit-shock-and-share-price-drop' },
];
const Es = {
  _estado: 'completo',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Seeking Alpha (artículos y titulares)', fecha: '2026-10', n_comentarios: 20, tono: 'Positivo', resumen: 'Desde agosto casi todos los autores suben la recomendación («oportunidad de compra en la caída», «la tesis bajista se ha derretido») con la vuelta del margen; los titulares negativos son el rebote del cacao y del azúcar por El Niño y el impulso más débil del consumo básico [1].' },
      { plataforma: 'Stocktwits', fecha: '2026-10', n_comentarios: 30, tono: 'Dividido', resumen: 'Particulares que compran por rentabilidad por dividendo (≈3,5 %) y por el soporte técnico, frente a quienes ven valor intrínseco por debajo de 140 USD, señalan las ventas diarias del fideicomiso y temen el efecto de los GLP-1 [2].' },
      { plataforma: 'The Motley Fool (resúmenes de registros)', fecha: '2026-07', n_comentarios: 5, tono: 'Neutro', resumen: 'Explica las ventas del fideicomiso como diversificación sin pérdida de control (mantiene las clase B) [3].' },
      { plataforma: 'Prensa sectorial (ConfectioneryNews)', fecha: '2026-04', n_comentarios: 5, tono: 'Negativo', resumen: 'Relaciona la caída de la acción con el beneficio de 2025, la salida del presidente de EE. UU. y las ventas del fideicomiso [4].' },
    ],
    temas: [
      { tema: 'Recuperación del margen con el cacao más barato', postura: 'Alcista', peso: 'Alto', contraste: 'Cierto en 2026: margen bruto ajustado del 41,6 % en el 2T26; el riesgo es que el cacao rebotó a 5.728 USD/t y que parte se devuelve en precio.' },
      { tema: 'Ventas del fideicomiso de control', postura: 'Bajista', peso: 'Medio', contraste: 'Real: ≈1,45 M acciones (267 M USD) en siete meses, menos del 1 % del capital; no afecta a las clase B ni al control.' },
      { tema: 'GLP-1 y volumen', postura: 'Bajista', peso: 'Medio', contraste: 'El volumen cae (−10 % en confitería en el 2T26), pero la empresa lo atribuye a la elasticidad al precio; no hay cifra que separe el efecto de los GLP-1.' },
      { tema: 'Dividendo y valoración', postura: 'Alcista', peso: 'Alto', contraste: 'Dividendo de 5,81 USD anualizado (3,5 %) cubierto con el BPA de 2026; PER de 17 veces, el más bajo en diez años.' },
    ],
    lectura: 'El sentimiento ha girado de negativo (primavera: beneficio de 2025, rotación de directivos, ventas del fideicomiso) a dividido con sesgo comprador desde agosto, mientras la acción seguía cayendo hasta su mínimo del 1-oct. No es euforia: los particulares compran por dividendo y por precio, y los escépticos tienen dos argumentos que el informe recoge (volumen y GLP-1). La venta del fideicomiso es el único tema que el mercado sobrestima: es pequeña frente al volumen diario (≈1,4 M acciones). No contradice al consenso de analistas, que también es comprador.',
    confianza: 'Media',
  },
  fuentes: fE,
  huecos: [],
};

guarda('A', A); guarda('B', B); guarda('C', C); guarda('D', D); guarda('E', Es);
console.log('Notas A-E escritas');
