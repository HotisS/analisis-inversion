// Escribe las notas A-E de Lindt & Sprüngli (corte 2026-10-14). Unidad de análisis: el certificado de participación (LISP).
// 1 acción nominativa (LISN, nominal 100 CHF) = 10 certificados (LISP, nominal 10 CHF) en derechos económicos; BPA y DPA por certificado
// = cifras publicadas «por acción / 10 PC» ÷ 10. Acciones = equivalentes en certificados (nominativas × 10 + certificados), en millones.
// Cada nota cita solo su propia lista de fuentes. Ejecutar: node notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const L = 'https://www.lindt-spruengli.com/media';
const P = (id, titulo, fecha, url, tipo = 'Primaria', editor = 'Chocoladefabriken Lindt & Sprüngli AG') => ({ id, titulo, editor, tipo, fecha, url });

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  P(1, 'Integrated Annual Report 2025 (cuentas consolidadas, notas 6, 9, 10, 11, 17, 18, 19; resumen de cinco años)', '2026-03-10', `${L}/gxvdv4s2/integrated-annual-report-2025.pdf`),
  P(2, 'Media Release: Financial Year 2025 (ventas 5.915,8 M, EBIT 971,0 M, flujo libre 446,3 M, dividendo 180 CHF por certificado)', '2026-03-10', `${L}/ohcfso2i/financial-year-2025-media-release.pdf`),
  P(3, 'Half-Year Report January-June 2026 (balance, cuenta, flujos y notas sin auditar)', '2026-07-21', `${L}/qgadvhmc/half-year-report-2026.pdf`),
  P(4, 'Media Release: Half-year results 2026', '2026-07-21', `${L}/l5nhjcnj/media-release-half-year-results-2026.pdf`),
  P(5, 'Half-year results 2026: transcripción de la presentación a analistas', '2026-07-21', `${L}/1qzbfo1p/half-year-results-2026-transcript.pdf`),
  P(6, 'Half-Year Report 2025 (cuenta y segmentos del 1S25 y del 1S24)', '2025-07-22', `${L}/akmcm0tw/half-year-report-2025_.pdf`),
  P(7, 'Media Release: Revised full-year guidance 2026 (ad hoc: crecimiento orgánico 0-2 %)', '2026-09-29', `${L}/hhamtolb/sales-guidance-media-release-english.pdf`),
  { id: 8, titulo: 'Lindt & Sprüngli (SWX:LISN): balance anual 2021-2025', editor: 'Stock Analysis (S&P Global Market Intelligence)', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/quote/swx/LISN/financials/balance-sheet/' },
  { id: 9, titulo: 'Lindt & Sprüngli (SWX:LISN): estado de flujos anual 2021-2025', editor: 'Stock Analysis (S&P Global Market Intelligence)', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/quote/swx/LISN/financials/cash-flow-statement/' },
  { id: 10, titulo: 'Lindt & Sprüngli (SWX:LISN): resumen de la cuenta 2021-2025 (BPA diluido, coste de materiales, margen antes de impuestos)', editor: 'Stock Analysis (S&P Global Market Intelligence)', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/quote/swx/LISN/financials/' },
  P(11, 'Full-Year Results 2025: presentación a inversores (cuota de mercado Euromonitor, canales, GLP-1)', '2026-03-10', `${L}/0dqprjgx/20260310_ls_fy2025_results_presentation.pdf`),
  P(12, 'Half-year results 2025: transcripción de la presentación a analistas', '2025-07-22', `${L}/0wsndp5c/hy_2025_transcript.pdf`),
  P(13, 'Media Release: Share Buyback Program 2024-2026 y 2026-2029 (hasta 1.000 M CHF)', '2026-04-10', `${L}/zpubobnw/20260410_sbb_2026-2029_en.pdf`),
  P(14, 'Share buyback program May 4, 2026 - April 30, 2029: informe semanal al 9-oct-2026', '2026-10-12', `${L}/r1sjybwc/20261009-lindt-sbb.pdf`),
  { id: 15, titulo: 'Ad hoc: Lindt & Sprüngli with double-digit organic sales growth and a further margin improvement (ejercicio 2023)', editor: 'EQS News', tipo: 'Primaria', fecha: '2024-03-05', url: 'https://eqs-news.com/news/adhoc/lindt-sprungli-with-double-digit-organic-sales-growth-and-a-further-margin-improvement/2007977' },
];

const cuenta = [
  { periodo: '2021', ingresos: 4585.5, coste_ventas: 1518, gastos_generales: null, ebitda: 921.5, amortizaciones: 276.6, ebit: 644.9, resultado_financiero: -23.4, bai: 621.5, impuestos: 131.0, minoritarios: 0, beneficio_neto: 490.5, gastos_financieros: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 201.94, dpa: 120, dpa_extraordinario: 0, acciones_diluidas: 2.4289 },
  { periodo: '2022', ingresos: 4970.2, coste_ventas: 1677, gastos_generales: null, ebitda: 1017.7, amortizaciones: 273.1, ebit: 744.6, resultado_financiero: -23.2, bai: 721.4, impuestos: 151.7, minoritarios: 0, beneficio_neto: 569.7, gastos_financieros: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 238.71, dpa: 130, dpa_extraordinario: 0, acciones_diluidas: 2.3866 },
  { periodo: '2023', ingresos: 5201.2, coste_ventas: 1706, gastos_generales: null, ebitda: 1093.9, amortizaciones: 280.8, ebit: 813.1, resultado_financiero: -25.9, bai: 787.2, impuestos: 115.8, minoritarios: 0, beneficio_neto: 671.4, gastos_financieros: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 285.91, dpa: 140, dpa_extraordinario: 0, acciones_diluidas: 2.3483 },
  { periodo: '2024', ingresos: 5468.5, coste_ventas: 1904.0, gastos_generales: null, ebitda: 1181.5, amortizaciones: 297.3, ebit: 884.2, resultado_financiero: -32.9, bai: 851.3, impuestos: 179.0, minoritarios: 0, beneficio_neto: 672.3, gastos_financieros: 46.6, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 289.77, dpa: 150, dpa_extraordinario: 0, acciones_diluidas: 2.3201 },
  { periodo: '2025', ingresos: 5915.8, coste_ventas: 2214.5, gastos_generales: null, ebitda: 1270.8, amortizaciones: 299.8, ebit: 971.0, resultado_financiero: -47.5, bai: 923.5, impuestos: 196.8, minoritarios: -0.5, beneficio_neto: 727.2, gastos_financieros: 59.2, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 313.68, dpa: 180, dpa_extraordinario: 0, acciones_diluidas: 2.3183 },
];

const A = {
  _estado: 'completo',
  negocio: {
    descripcion: 'Lindt & Sprüngli fabrica y vende chocolate prémium con las marcas Lindt, Ghirardelli, Russell Stover y Whitman\'s (EE. UU.), Caffarel (Italia), Hofbauer y Küfferle (Austria) y Pangburn\'s [1]. Produce en once fábricas propias (seis en Europa y cinco en EE. UU.) y vende a través de 41 filiales y unos 100 distribuidores, sobre todo a la gran distribución (cuentas clave locales e internacionales), y de forma directa en 648 tiendas propias y webs (Global Retail: 986,3 M CHF en 2025, el 16,7 % de las ventas) [1, 4]. Ningún cliente supera el 10 % de las ventas [1]. Los productos estrella son Lindor, las tabletas Excellence (chocolate negro), los productos de temporada (Gold Bunny de Pascua, Teddy y Navidad) y, desde 2025, el chocolate «estilo Dubái» [2]. El negocio es muy estacional: menos del 40 % de las ventas cae en el primer semestre, que soporta la mitad de los costes fijos [3].',
    como_gana_dinero: 'Margen bruto alto por marca y mezcla prémium: tras materiales (consumos netos de existencias) le quedaba el 62,6 % de las ventas en 2025 (65,2 % en 2024) [1]. El cacao, la manteca de cacao, la leche, el azúcar y los frutos secos son el coste que mueve el margen; la empresa cubre las compras de cacao con 12-24 meses de antelación y traslada el coste a precio con retraso: subió precios un 19,0 % en 2025 y un 11,8 % en el 1S26, con volumen/mezcla del −6,6 % y del −7,5 % [2, 4]. Personal (19 % de las ventas) y gastos operativos (23 %, incluida la publicidad) dan apalancamiento operativo: la dirección promete +20-40 pb de margen EBIT al año [2]. El EBIT se concentra en el segundo semestre (Navidad): 11,2 % de margen en el 1S26 frente al 16,4 % del año 2025 [3, 2].',
    segmentos: [
      { nombre: 'Europa', descripcion: 'Filiales europeas y unidades de negocio; incluye activos corporativos', tipo_resultado: 'EBIT', historico: [{ periodo: '2024', ingresos: 2589.6, resultado: 500.2 }, { periodo: '2025', ingresos: 2955.5, resultado: 594.0 }] },
      { nombre: 'Norteamérica', descripcion: 'EE. UU. (Lindt USA, Ghirardelli, Russell Stover), Canadá y México', tipo_resultado: 'EBIT', historico: [{ periodo: '2024', ingresos: 2154.6, resultado: 279.6 }, { periodo: '2025', ingresos: 2183.8, resultado: 299.0 }] },
      { nombre: 'Resto del mundo', descripcion: 'Australia, Japón, Sudáfrica, China, Brasil, Chile, India, Arabia Saudí, EAU, distribuidores y Global Travel Retail', tipo_resultado: 'EBIT', historico: [{ periodo: '2024', ingresos: 724.3, resultado: 104.4 }, { periodo: '2025', ingresos: 776.5, resultado: 78.0 }] },
    ],
    geografias: [
      { nombre: 'EE. UU.', peso_pct: 32.1 },
      { nombre: 'Alemania', peso_pct: 14.8 },
      { nombre: 'Suiza', peso_pct: 9.0 },
      { nombre: 'Resto de Europa', peso_pct: 26.0 },
      { nombre: 'Canadá y México', peso_pct: 4.8 },
      { nombre: 'Resto del mundo', peso_pct: 13.3 },
    ],
    geografias_criterio: 'origen',
    clientes: 'Clientes atomizados: ningún cliente pasa del 10 % de las ventas [1]; los grandes son las cadenas de distribución de Alemania, EE. UU., Suiza y Reino Unido, y el 16,7 % se vende directamente al consumidor en tiendas y webs propias [1]. El poder de precios está demostrado con cifras: con el cacao en máximos subió precios un 19,0 % en 2025 y un 11,8 % en el 1S26 y aun así amplió el margen EBIT (16,2 → 16,4 %) [2, 4]. El límite apareció en 2026: el volumen/mezcla cayó un 7,5 % en el semestre, sobre todo en Alemania, Suiza y Austria, y la empresa ha tenido que anunciar rebajas selectivas de precio en Alemania y Suiza [4, 5, 7].',
    kpis: [
      { kpi: 'Crecimiento orgánico', valor_anterior: '7,8 % (2024)', valor_actual: '12,4 % (2025); 4,3 % (1S26); guía 2026: 0-2 %', variacion: 'Fuerte desaceleración', comentario: 'Dos recortes de guía en 2026 (marzo: 6-8 → 4-6 %; septiembre: 4-6 → 0-2 %) [2, 7]' },
      { kpi: 'Efecto precio', valor_anterior: '19,0 % (2025)', valor_actual: '11,8 % (1S26)', variacion: '−7,2 pp', comentario: 'El precio se apaga en el 2S26; rebajas selectivas en Alemania y Suiza [2, 4, 5]' },
      { kpi: 'Volumen/mezcla', valor_anterior: '−6,6 % (2025)', valor_actual: '−7,5 % (1S26)', variacion: '−0,9 pp', comentario: 'Elasticidad alta en Europa; la empresa promete volumen positivo en 2027 [2, 4, 7]' },
      { kpi: 'Margen EBIT', valor_anterior: '16,2 % (2024)', valor_actual: '16,4 % (2025); guía 2026 +20-40 pb', variacion: '+20 pb', comentario: 'Guía de margen confirmada el 29-sep-2026 pese al recorte de ventas [2, 7]' },
      { kpi: 'Tiendas propias', valor_anterior: '621 (dic-25)', valor_actual: '648 (jun-26)', variacion: '+27', comentario: 'Global Retail creció un 4,3 % orgánico en el 1S26 [4]' },
      { kpi: 'Flujo libre (definición de la empresa)', valor_anterior: '635,3 M (2024)', valor_actual: '446,3 M (2025)', variacion: '−29,7 %', comentario: 'Más existencias valoradas a cacao caro; 1S26: 61,1 M frente a −79,7 M [2, 4]' },
    ],
    confianza: 'Alta',
  },
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 5895.3, ebitda: 1284.8, ebit: 972.0, beneficio_neto: 730.5, bpa: 317.01, dpa: 180, dpa_extraordinario: 0, fcf: 587.1, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [],
    comentario: 'Las ventas crecieron de 4.585,5 M CHF en 2021 a 5.915,8 M en 2025 (8,2 % en 2025 en francos con un 12,4 % orgánico y un −3,9 % de divisa) [1, 2]. El crecimiento es orgánico (sin compras relevantes desde Russell Stover en 2014) y en 2024-2026 casi todo es precio: +19,0 % en 2025 y +11,8 % en el 1S26, con volumen/mezcla negativo [2, 4]. El margen EBIT subió de 14,1 % (2021) a 16,4 % (2025), +230 pb, porque personal y gastos operativos ganaron escala (personal del 19,5 % al 19,0 % de las ventas en 2025) mientras el coste de materiales netos pasó del 34,8 % al 37,4 % de las ventas por el cacao [1]. En el 1S26 los materiales subieron 220 pb más (35,5 % de las ventas) y el EBIT se sostuvo con recortes de personal y gastos operativos (−100 y −130 pb) [5]. El divisa resta cada año: −3,9 % en 2025 y −5,2 % en el 1S26 [2, 5].',
    ajustes: 'Lindt no publica cifras ajustadas: usamos las reportadas. Partidas que no se repiten: en 2023 el beneficio neto incluye un ingreso fiscal único de 69,7 M CHF por la reforma fiscal suiza (sin él, 601,7 M) [1]; en el 1S26, otros ingresos incluyen 11,7 M de devolución de aranceles de EE. UU. [3]. El flujo de explotación de 2024 y 2025 incluye márgenes de variación de derivados de cacao (+232,7 M recibidos en 2024; −23,7 M depositados en 2025): sin ellos sería 949,3 M y 544,1 M [1]. Las cifras de 2021-2023 de coste de materiales, resultado financiero e impuestos son derivadas de Stock Analysis (margen antes de impuestos publicado), no de las cuentas [10].',
    confianza: 'Media',
  },
  trimestres: {
    items: [
      { periodo: '1S24', ingresos: 2158.4, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 93.66, vs_consenso: null },
      { periodo: '2S24', ingresos: 3310.1, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 196.11, vs_consenso: null },
      { periodo: '1S25', ingresos: 2352.6, crecimiento_pct: 9.0, crecimiento_organico_pct: 11.2, ebitda: 401.8, margen_ebitda_pct: 17.1, bpa: 80.65, vs_consenso: null },
      { periodo: '2S25', ingresos: 3563.2, crecimiento_pct: 7.6, crecimiento_organico_pct: null, ebitda: 869.0, margen_ebitda_pct: 24.4, bpa: 233.03, vs_consenso: null },
      { periodo: '1S26', ingresos: 2332.1, crecimiento_pct: -0.9, crecimiento_organico_pct: 4.3, ebitda: 415.8, margen_ebitda_pct: 17.8, bpa: 83.98, vs_consenso: null },
    ],
    ultima_presentacion: 'En el 1S26 (21-jul-2026) la dirección presentó un «plan de recuperación del volumen»: el precio deja de ser la palanca, se anuncian rebajas selectivas en Alemania y Suiza, nuevos formatos y puntos de precio de Lindor y más inversión en marca, con el objetivo de estabilizar el volumen en el 2S26 y volver a crecer en volumen en 2027 [5]. El director financiero avisó de que el efecto precio «se apaga» en el segundo semestre y de que el coste de materiales, 35,5 % de las ventas en el semestre (+220 pb), terminaría el año en línea con 2025, con un efecto positivo del cacao más barato en 2027 [5]. Frente a la presentación de 2025, cuando el discurso era la baja elasticidad en Europa y el crecimiento del 11,2 % [12], el tono pasó a defensivo. El 29-sep la empresa recortó la guía de ventas a 0-2 % orgánico por pedidos de temporada más débiles en Alemania, Suiza y Austria y una ola de calor, mantuvo la de margen y aplazó a «desde 2028» el objetivo de 6-8 % [7]. La transcripción publicada solo recoge la presentación; no incluye el turno de preguntas.',
    confianza: 'Alta',
  },
  balance: {
    historico: [
      { periodo: '2021', activo_total: 8956.1, activo_corriente: 3024.8, pasivo_corriente: 1486, pasivo_total: 3732.5, fondo_comercio: null, intangibles: 1308.8, inmovilizado_material: 1783, existencias: 761.6, clientes: 922.6, proveedores: 237.9, activos_contrato: null, pasivos_contrato: null, caja: 937.2, deuda_financiera: 1013.2, arrendamientos: 468.9, patrimonio_neto: 5223.6, minoritarios: 0, reservas: 5709 },
      { periodo: '2022', activo_total: 7945.1, activo_corriente: 2889.8, pasivo_corriente: 1577, pasivo_total: 3544.5, fondo_comercio: null, intangibles: 1321.2, inmovilizado_material: 1768, existencias: 875.6, clientes: 973.5, proveedores: 290.5, activos_contrato: null, pasivos_contrato: null, caja: 864.6, deuda_financiera: 1006.1, arrendamientos: 432.1, patrimonio_neto: 4400.6, minoritarios: 0, reservas: 5029 },
      { periodo: '2023', activo_total: 7860.0, activo_corriente: 2609.0, pasivo_corriente: 1843, pasivo_total: 3602.4, fondo_comercio: null, intangibles: 1237.2, inmovilizado_material: 1745, existencias: 921.5, clientes: 1017.3, proveedores: 305.9, activos_contrato: null, pasivos_contrato: null, caja: 462.2, deuda_financiera: 1011.6, arrendamientos: 395.8, patrimonio_neto: 4257.6, minoritarios: 0, reservas: 5054.2 },
      { periodo: '2024', activo_total: 9156.9, activo_corriente: 3560.3, pasivo_corriente: 2011.5, pasivo_total: 4317.3, fondo_comercio: 722.0, intangibles: 594.3, inmovilizado_material: 1936.5, existencias: 941.3, clientes: 1184.4, proveedores: 415.1, activos_contrato: null, pasivos_contrato: null, caja: 1015.2, deuda_financiera: 1194.3, arrendamientos: 470.2, patrimonio_neto: 4839.6, minoritarios: 0, reservas: 5006.7 },
      { periodo: '2025', activo_total: 9098.7, activo_corriente: 3227.7, pasivo_corriente: 1759.9, pasivo_total: 4142.0, fondo_comercio: 636.4, intangibles: 551.3, inmovilizado_material: 2007.9, existencias: 1190.1, clientes: 1184.8, proveedores: 343.0, activos_contrato: null, pasivos_contrato: null, caja: 668.8, deuda_financiera: 1239.2, arrendamientos: 525.8, patrimonio_neto: 4956.2, minoritarios: 0.5, reservas: 5538.5 },
    ],
    vencimientos: [
      { anio: '2026', importe: 127.1 }, { anio: '2027', importe: 250 }, { anio: '2028', importe: 250 }, { anio: '2030', importe: 225 }, { anio: '2032', importe: 250 }, { anio: '2034', importe: 200 },
    ],
    liquidez: 'Caja de 406,6 M CHF a 30-jun-2026 (668,2 M a cierre de 2025) [3, 1]; deuda bruta de 1.301,1 M (bonos 1.174,0 M y préstamos bancarios 127,1 M) más 545,1 M de arrendamientos [3].',
    rating: 'Sin rating público (los bonos en CHF cotizan sin calificación de agencia en las cuentas)',
    coste_deuda_pct: 1.0,
    vida_media_anios: 4.3,
    otros_pasivos: 'Pensiones: el balance recoge un activo por planes de prestación definida de 2.530,7 M CHF a cierre de 2025 (2.119,1 M a jun-26) y un pasivo de 88,8 M [1, 3]. Ese superávit sale en gran parte de las acciones nominativas de Lindt que poseen las dos fundaciones de pensiones del grupo (20.884 acciones, 15,6 % del capital nominativo) [1]: cae cuando cae la acción (−312,8 M de revalorización negativa en el 1S26) [3] y no lo contamos como valor en el puente. No hay covenants financieros relevantes en los bonos (todos en CHF, cupones del 0,01 % al 1,3 %) [1]. Pasivos devengados de 1.021,7 M a cierre de 2025, sobre todo descuentos y promociones a clientes de la campaña de Navidad [1].',
    comentario: 'La deuda financiera es baja: 1.239,2 M de bonos y préstamos y 668,8 M de caja a cierre de 2025, a menos de una vez el EBITDA [1]. Las existencias subieron de 941,3 M a 1.190,1 M en 2025 (+26 %) por el cacao caro, y a 1.480,1 M en junio de 2026 por la estacionalidad [1, 3]. La deuda neta sube por la retribución al accionista, no por el negocio: dividendos de 413,9 M y recompras de 100,1 M en el 1S26 [3]. El patrimonio cayó a 4.393,2 M en junio por el dividendo y la revalorización negativa de las pensiones [3].',
    confianza: 'Media',
  },
  flujos: {
    historico: [
      { periodo: '2021', flujo_operativo: 826.8, capex: 240.8, pagos_arrendamientos: 73.0, adquisiciones: 1.5, desinversiones: 0, dividendos: 264.1, recompras: 433.3, emision_acciones: 133.7, intereses_en_financiacion: 0 },
      { periodo: '2022', flujo_operativo: 756.0, capex: 229.9, pagos_arrendamientos: 75.4, adquisiciones: 0, desinversiones: 0, dividendos: 284.1, recompras: 551.4, emision_acciones: 83.5, intereses_en_financiacion: 0 },
      { periodo: '2023', flujo_operativo: 778.6, capex: 301.8, pagos_arrendamientos: 74.2, adquisiciones: 0, desinversiones: 0, dividendos: 303.6, recompras: 593.9, emision_acciones: 110.6, intereses_en_financiacion: 0 },
      { periodo: '2024', flujo_operativo: 1182.0, capex: 314.0, pagos_arrendamientos: 77.0, adquisiciones: 0, desinversiones: 2.3, dividendos: 321.7, recompras: 304.9, emision_acciones: 188.4, intereses_en_financiacion: 0 },
      { periodo: '2025', flujo_operativo: 520.4, capex: 330.5, pagos_arrendamientos: 80.8, adquisiciones: 0, desinversiones: 0.7, dividendos: 344.8, recompras: 332.9, emision_acciones: 200.5, intereses_en_financiacion: 0 },
    ],
    comentario: 'La conversión de beneficio en caja es buena en años normales y la tuerce el cacao: el flujo de explotación pasó de 1.182,0 M en 2024 a 520,4 M en 2025 porque las existencias subieron 320,6 M (cacao más caro) y se devolvieron 232,7 M de márgenes de variación recibidos en 2024 [1]. Sin los márgenes de variación, 949,3 M y 544,1 M [1]. El capex (inmovilizado e intangibles) es de 230-330 M al año, 5-6 % de las ventas, algo por encima de la amortización de inmovilizado; la fábrica nueva de chocolate (operativa en 2027) explica parte del aumento [1, 5]. Desde 2021 la empresa ha devuelto 5.400 M (dividendos y recompras), más que su flujo libre, compensado en parte por el ejercicio de opciones de empleados (emisión de 717 M) [9, 1].',
    confianza: 'Media',
  },
  calidad: {
    auditor: 'PricewaterhouseCoopers AG, Zúrich',
    anios_auditor: 24,
    opinion: 'Favorable',
    comentario: 'Cuentas NIIF auditadas por PwC desde 2002; en 2025 hubo concurso de auditoría y el consejo propuso mantener a PwC para 2026 (el socio firmante, desde 2020, cumple siete años en 2026) [1]. Desde el 1-ene-2025 la empresa aplica la exención de «uso propio» de la NIIF 9 a los futuros de cacao, lo que cambia la contabilización de coberturas (−178,3 M en la reserva de coberturas en 2025) [1]. No capitaliza I+D relevante. Los pagos en acciones (opciones sobre certificados) cuestan 24,1 M al año, un 3 % del beneficio, y diluyen alrededor de un 1 % anual antes de recompras [1]. Partidas no recurrentes visibles: el ingreso fiscal de 69,7 M de 2023 y la devolución de aranceles de 11,7 M en el 1S26 [1, 3]. El gran activo de pensiones (2.530,7 M) es el punto delicado: está invertido en buena parte en acciones de la propia Lindt, de modo que el balance y el resultado global dependen de la cotización [1, 3].',
    senales: [
      { senal: 'Activo de pensiones invertido en acciones propias', nivel: 'Media', comentario: 'Las fundaciones de pensiones tienen el 15,6 % del capital nominativo; el superávit (2.530,7 M) baja con la acción (−312,8 M en el 1S26) [1, 3].' },
      { senal: 'Cambio de criterio en coberturas de cacao (uso propio, NIIF 9, 2025)', nivel: 'Baja', comentario: 'Altera la comparabilidad de la reserva de coberturas y de los derivados en balance, no del EBIT [1].' },
      { senal: 'Auditor con 24 años de mandato', nivel: 'Baja', comentario: 'Concurso hecho en 2025 y PwC propuesta de nuevo [1].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Dividendo creciente 30 años seguidos: 180 CHF por certificado (1.800 por nominativa) sobre 2025, un 57,7 % del beneficio [2, 1]. Recompras para amortizar: programa de 997,8 M (2022-2024) y de 499,3 M (2024-2026, terminado el 9-abr-2026) [1, 13]; desde el 4-may-2026 un programa de hasta 1.000 M hasta abril de 2029, con 191,6 M ejecutados al 9-oct-2026 [14]. Prioridades declaradas: inversión en capacidad (fábrica nueva en 2027), expansión de tiendas y retribución al accionista con un balance sin rating y deuda neta inferior a una vez el EBITDA [1, 5].',
    adquisiciones: [
      { anio: '2014', objetivo: 'Russell Stover Candies (EE. UU.)', importe: null, ev_ebitda: null, financiacion: 'Caja y deuda', resultado: 'Dio escala en EE. UU. pero exigió años de reestructuración; el fondo de comercio de EE. UU. es la mayor parte de los 636,4 M de 2025 y no ha tenido deterioros recientes [1].' },
    ],
    comentario: 'Asignación disciplinada y conservadora: no compra empresas desde 2014 y devuelve el exceso de caja. Entre 2021 y 2025 pagó 1.518 M en dividendos y 2.216 M en recompras, más que el flujo libre acumulado, lo que ha subido algo la deuda neta [9]. Las acciones equivalentes diluidas bajaron de 2,43 a 2,32 millones (−4,6 % en cuatro años) pese a la dilución de las opciones [1, 10]. Recomprar a 36-39 veces beneficios (2021-2025) fue caro; el programa actual compra a unas 24 veces, mucho mejor uso del dinero [14].',
    confianza: 'Alta',
  },
  fuentes: fA,
  huecos: [
    { seccion: 'negocio', campo: 'segmentos 2021-2023', tipo: 'Complemento', intentos: '1) Informe anual 2025 (solo 2024-2025); 2) informes anuales 2021-2023 en la web de inversores (ya no se publican; la biblioteca solo tiene 2025-2026); 3) sustainabilityreports.com y EQS (sin notas de segmentos)', decision: 'Omitido' },
    { seccion: 'balance', campo: 'deuda, arrendamientos corrientes y clientes 2021-2023', tipo: 'Complemento', intentos: '1) Informes anuales 2021-2023 (no accesibles en la web de la empresa); 2) resumen de cinco años del informe 2025 (solo totales); 3) Stock Analysis: deuda a corto y largo, arrendamientos a largo y cuentas a cobrar totales', decision: 'Calculado y marcado como estimación' },
  ],
};

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  P(1, 'Integrated Annual Report 2025 (mercado mundial del chocolate +7,4 % en valor y −5,9 % en volumen en 2025)', '2026-03-10', `${L}/gxvdv4s2/integrated-annual-report-2025.pdf`),
  P(2, 'Full-Year Results 2025: presentación (cuotas Euromonitor 2025: Mars 12,6 %, Mondelez 12,3 %, Ferrero 10,6 %, Nestlé 8,2 %, Hershey 7,8 %, Lindt 5,8 %)', '2026-03-10', `${L}/0dqprjgx/20260310_ls_fy2025_results_presentation.pdf`),
  { id: 3, titulo: 'Cocoa futures (CC=F, ICE): históricos mensuales y diarios 2021-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/CC%3DF/history/' },
  { id: 4, titulo: 'Chocolate Confectionery Market (87.500 M USD en 2023; 146.100 M USD en 2035; TCAC 4,1 %)', editor: 'Allied Market Research', tipo: 'Sectorial', fecha: '2024', url: 'https://alliedmarketresearch.com/press-release/chocolate-confectionery-market.html' },
  { id: 5, titulo: 'Chocolate Confectionery Market Report (123.700 M USD en 2030; TCAC 2,5 % 2024-2030)', editor: 'Lucintel', tipo: 'Sectorial', fecha: '2025', url: 'https://www.lucintel.com/chocolate-confectionery-market.aspx' },
  P(6, 'Half-year results 2026: transcripción (cacao, coste de materiales, plan de volumen)', '2026-07-21', `${L}/1qzbfo1p/half-year-results-2026-transcript.pdf`),
  P(7, 'Media Release: Revised full-year guidance 2026', '2026-09-29', `${L}/hhamtolb/sales-guidance-media-release-english.pdf`),
  P(8, 'Half-year results 2025: transcripción (mercado −5 % en volumen; marca blanca y prémium ganan cuota)', '2025-07-22', `${L}/0wsndp5c/hy_2025_transcript.pdf`),
  { id: 9, titulo: 'Hershey, Mondelez, Nestlé, Barry Callebaut y Meiji: ventas y margen operativo (financialData)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/HSY/' },
  P(10, 'Media Release: Half-year results 2026 (Kantar BrandZ: Lindt, marca de chocolate más valiosa, 11.700 M USD; fundación TogetherCocoa)', '2026-07-21', `${L}/l5nhjcnj/media-release-half-year-results-2026.pdf`),
  { id: 11, titulo: 'Swiss chocolate maker Lindt sued in US over cocoa child labor allegations', editor: 'Seeking Alpha', tipo: 'Prensa', fecha: '2026-07-23', url: 'https://seekingalpha.com/api/sa/combined/LDSVF.xml' },
];
const B = {
  _estado: 'completo',
  historia: {
    resumen: 'Lindt & Sprüngli nace de la fusión en 1899 de la chocolatería de Rudolf Sprüngli (Zúrich, 1845) con la de Rodolphe Lindt (Berna), inventor de la conchadora en 1879, que dio el chocolate fundente [1]. Cotiza en la SIX desde 1986 con dos líneas: la acción nominativa (LISN) y el certificado de participación sin voto (LISP) [1]. La compañía moderna la hizo Ernst Tanner, consejero delegado desde 1993 y presidente desde 1994: internacionalizó la marca Lindt, compró Ghirardelli (1998), Caffarel (1997), Hofbauer y Küfferle y, en 2014, Russell Stover en EE. UU. [1]. Desde 2022 la dirige Adalbert Lechner, con Tanner como presidente ejecutivo [1]. En 2024-2026 superó el choque del cacao a récord con subidas de precio de dos dígitos [2].',
    hitos: [
      { anio: '1845', hito: 'Rudolf Sprüngli abre su confitería en Zúrich [1].' },
      { anio: '1879', hito: 'Rodolphe Lindt inventa la conchadora (chocolate fundente) [1].' },
      { anio: '1899', hito: 'Sprüngli compra la fábrica de Lindt: nace Chocoladefabriken Lindt & Sprüngli [1].' },
      { anio: '1986', hito: 'Salida a bolsa en la SIX con acciones nominativas y certificados de participación [1].' },
      { anio: '1993', hito: 'Ernst Tanner, consejero delegado (presidente desde 1994) [1].' },
      { anio: '1998', hito: 'Compra de Ghirardelli (EE. UU.) [1].' },
      { anio: '2014', hito: 'Compra de Russell Stover: EE. UU. pasa a ser el primer mercado [1].' },
      { anio: '2022', hito: 'Adalbert Lechner, consejero delegado; Tanner sigue como presidente ejecutivo [1].' },
      { anio: '2024-2025', hito: 'Cacao a récord: subidas de precio del 19 % en 2025 y margen EBIT del 16,4 % [2].' },
      { anio: '2026', hito: 'Dos recortes de la guía de ventas (4-6 % en marzo; 0-2 % en septiembre); la acción pierde un 40 % en un año [7].' },
    ],
    confianza: 'Media',
  },
  sector: {
    definicion: 'Mercado mundial de chocolate de consumo (tabletas, bombones, productos de temporada y regalo), en valor a precio de venta al público, según Euromonitor, que es la fuente de las cuotas que publica la empresa [2]. Lindt compite en el segmento prémium, que no tiene tamaño publicado de forma independiente. Usamos como mercado relevante el chocolate en conjunto, con su tamaño derivado de la cuota de Lindt (5,8 % del valor mundial en 2025 con 5.915,8 M CHF de ventas): unos 102.000 M CHF (estimación propia) [2]. Lo contrastamos con dos casas de estudios: Allied Market Research (87.500 M USD en 2023) y Lucintel (123.700 M USD en 2030) [4, 5].',
    tamano: '≈ 102.000 M CHF en 2025 (estimación propia a partir de la cuota de Euromonitor) [2]; 87.500 M USD en 2023 según Allied [4]',
    unidad_serie: 'millones de CHF (estimación propia a partir de la cuota; previsiones con el TCAC del 4 %)',
    serie: [
      { anio: '2025', tamano: 102000 }, { anio: '2026e', tamano: 104000 }, { anio: '2027e', tamano: 108000 }, { anio: '2028e', tamano: 112500 }, { anio: '2029e', tamano: 117000 }, { anio: '2030e', tamano: 121500 },
    ],
    tcac_historico_pct: 6.0,
    tcac_previsto_pct: 4.0,
    cr5_pct: 51.5,
    estructura: 'Moderadamente concentrada',
    drivers: [
      { driver: 'Precio del cacao', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'El futuro de ICE pasó de unos 2.500 USD/t en 2022 a casi 12.000 en ene-2025, cayó a unos 3.000 en abr-2026 y vuelve a 5.746 el 14-oct-2026 [3].' },
      { driver: 'Premiumización (de cantidad a calidad)', efecto: '+', horizonte: 'Estructural', evidencia: 'En 2025 el mercado creció un 7,4 % en valor con un −5,9 % de volumen y el prémium ganó cuota [1].' },
      { driver: 'Elasticidad al precio', efecto: '−', horizonte: 'Cíclico', evidencia: 'Volumen/mezcla de Lindt −7,5 % en el 1S26; el mercado perdió cerca de un 5 % de volumen en el 1S25 [6, 8].' },
      { driver: 'Fármacos GLP-1', efecto: '+/−', horizonte: 'Estructural', evidencia: 'Según Circana, los hogares con GLP-1 (15 % en EE. UU.) compran un 6,5 % más de chocolate prémium; el chocolate total crece menos [2].' },
      { driver: 'Marca blanca', efecto: '−', horizonte: 'Cíclico', evidencia: 'La marca blanca ganó cuota con los consumidores sensibles al precio en 2024-2025 [8].' },
      { driver: 'Turismo y viajes', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Menos turistas de Asia y Oriente Medio en Europa restaron al 1S26 de Lindt [6].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Seis grupos tienen el 57 % del mercado (Mars 12,6 %, Mondelez 12,3 %, Ferrero 10,6 %) y compiten en marca e innovación, con el precio contenido por la marca blanca [2].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'La gran distribución negocia fuerte (Alemania, Suiza), pero ningún cliente pasa del 10 % de las ventas de Lindt y un 17 % es venta directa [A1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 4, justificacion: 'Costa de Marfil y Ghana concentran la mayor parte del cacao, con precios regulados en origen y cosechas castigadas por clima y enfermedades; el cacao se multiplicó por cuatro en dos años [3].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Marca, distribución en estantería y escala industrial son barreras; las marcas nuevas (Dubái, artesanas) entran en nichos [2].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 2, justificacion: 'Otros dulces y snacks sustituyen al chocolate de diario, menos al de regalo y temporada, donde Lindt es más fuerte [2].' },
    ],
    ciclo: {
      posicion: 'Contracción',
      comentario: 'El volumen del mercado mundial cayó un 5,9 % en 2025 y siguió cayendo en 2026 por las subidas de precio del cacao [1, 6]. El chocolate es defensivo en recesiones (en 2009 y 2020 los volúmenes aguantaron; en 2020 la caída de Lindt vino del cierre de tiendas y del turismo), pero muy sensible a la inflación de materias primas: en 2022-2023 y 2024-2026 el sector subió precios y perdió volumen. El cacao más barato desde 2026 y las rebajas de precio son la palanca de la recuperación que la industria espera para 2027 [7].',
    },
    regulacion: 'El Reglamento europeo de deforestación (EUDR) obliga a demostrar el origen libre de deforestación del cacao; su aplicación se aplazó a finales de 2025-2026 para las grandes empresas, con costes de trazabilidad que Lindt dice tener cubiertos con su Farming Program [1]. En EE. UU., los aranceles de 2025 encarecieron las importaciones desde Europa (Lindt cobró en el 1S26 una devolución de 11,7 M) [A3]. Costa de Marfil y Ghana fijan el precio en origen y han subido el precio al productor. En julio de 2026 Lindt fue demandada en EE. UU. por presunto trabajo infantil en su cadena de cacao [11].',
    tendencias: 'De cantidad a calidad: el consumidor compra menos chocolate pero más caro, lo que favorece al prémium y a la marca blanca a la vez [1, 8]. Productos virales (chocolate estilo Dubái en 2025) dan picos de demanda [A2]. Los GLP-1 reducen las porciones pero, según los datos de la propia Lindt, no castigan al prémium [2]. La venta directa (tiendas propias y web) crece más que la distribución. La industria creó en 2026 la fundación TogetherCocoa (Lindt, Mars, Mondelez, Nestlé, Hershey) para la renta de los productores [10]. Lindt gana con la premiumización y pierde con la elasticidad de Europa.',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 5.8,
    posicion: '6.º grupo mundial de chocolate por valor (5,8 %; 7 % en Europa y Norteamérica) y líder del chocolate prémium; cuota del 10-22 % en sus mercados maduros [2]',
    competidores: [
      { nombre: 'Mars', pais: 'EE. UU.', ticker: null, ingresos: null, cuota_pct: 12.6, margen_ebit_pct: null, comentario: 'Privada; M&M\'s, Snickers, Galaxy; compró Hotel Chocolat (2023) y Kellanova (2025) [2].' },
      { nombre: 'Mondelez', pais: 'EE. UU.', ticker: 'MDLZ', ingresos: 33174, cuota_pct: 12.3, margen_ebit_pct: 22.0, comentario: 'Milka, Cadbury, Toblerone; chocolate ≈ un tercio de sus ventas; margen operativo del último trimestre [2, 9].' },
      { nombre: 'Ferrero', pais: 'Italia/Luxemburgo', ticker: null, ingresos: null, cuota_pct: 10.6, margen_ebit_pct: null, comentario: 'Privada; Ferrero Rocher, Kinder, Nutella; rival directo en regalo y temporada [2].' },
      { nombre: 'Nestlé', pais: 'Suiza', ticker: 'NESN', ingresos: 88775, cuota_pct: 8.2, margen_ebit_pct: 16.1, comentario: 'KitKat, Cailler; la confitería es una parte pequeña del grupo [2, 9].' },
      { nombre: 'Hershey', pais: 'EE. UU.', ticker: 'HSY', ingresos: 10171, cuota_pct: 7.8, margen_ebit_pct: 23.1, comentario: 'Líder del chocolate en EE. UU.; compite con Russell Stover y Ghirardelli [2, 9].' },
      { nombre: 'Barry Callebaut', pais: 'Suiza', ticker: 'BARN', ingresos: 14254, cuota_pct: null, margen_ebit_pct: 4.6, comentario: 'Proveedor industrial de chocolate y cacao (no compite en marca); termómetro del precio del cacao [9].' },
    ],
    foso: {
      veredicto: 'Amplio',
      tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'No aplica a un fabricante de alimentos de marca.' },
        { fuente: 'Costes de cambio', puntuacion: 1, evidencia: 'Ninguno para el consumidor; algo de hábito en regalo y temporada.' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 5, evidencia: 'Lindt es la marca de chocolate más valiosa del mundo (11.700 M USD, +24 %) y subió precios un 19 % en 2025 ampliando el margen [10, A2].' },
        { fuente: 'Ventaja en costes', puntuacion: 2, evidencia: 'Fabricación propia de la semilla a la tableta, pero sin la escala de compra de Mars o Mondelez; el margen viene del precio, no del coste [A1].' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'Red de 648 tiendas propias y estantería en la gran distribución difícil de replicar en el prémium [A4].' },
      ],
    },
    amenazas: 'Lo que puede erosionar el foso es la elasticidad del precio en los mercados maduros: después de dos años de subidas de dos dígitos, el consumidor alemán y suizo ha dejado de comprar (volumen/mezcla −7,5 % en el 1S26) y la marca blanca ganó cuota [A4, 8]. Probabilidad media de que el margen bruto no vuelva a niveles de 2024 si el cacao se queda por encima de 5.000 USD/t. Riesgo de reputación por la demanda de trabajo infantil de julio de 2026 [11]. Baja probabilidad de que un competidor de marca le quite el prémium: Ferrero y Mars compiten en regalo, pero Lindt sigue ganando cuota en EE. UU. [A5].',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'El asunto que mueve las cifras es el cacao: abastecimiento responsable (todo el cacao certificado Rainforest Alliance desde 2026 y Farming Program propio desde 2008), deforestación (EUDR) y trabajo infantil en África occidental [1]. El segundo, las emisiones: compromiso de cero neto en 2050 con objetivos validados por SBTi [1]. El tercero, el envase reciclable. Más del 90 % de las materias primas con riesgo estaban cubiertas por un estándar de abastecimiento en 2025 [1].',
    controversias: 'En julio de 2026 Lindt fue demandada en EE. UU. por presuntamente beneficiarse de trabajo infantil en la cadena del cacao [11]. En 2022-2023 hubo pleitos de consumidores en EE. UU. por metales pesados (plomo y cadmio) en las tabletas Excellence de chocolate negro. No constan sanciones firmes.',
    confianza: 'Media',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'esg', campo: 'calificaciones ESG (MSCI, Sustainalytics, CDP)', tipo: 'Complemento', intentos: '1) Informe anual 2025 (cita SBTi y Rainforest Alliance, no calificaciones); 2) web de sostenibilidad de la empresa; 3) páginas públicas de MSCI y Sustainalytics (requieren registro)', decision: 'Omitido' },
  ],
};
// Las citas [A1], [A2]… dentro de B no se traducen entre notas: se sustituyen por fuentes propias de B.
const fixB = (s) => s.replace(/\[A1\]/g, '[1]').replace(/\[A2\]/g, '[1]').replace(/\[A3\]/g, '[6]').replace(/\[A4\]/g, '[10]').replace(/\[A5\]/g, '[6]').replace(/\[A1, 8\]/g, '[1, 8]').replace(/\[A4, 8\]/g, '[10, 8]').replace(/\[10, A2\]/g, '[10, 1]');
const Bfix = JSON.parse(fixB(JSON.stringify(B)));

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  P(1, 'Integrated Annual Report 2025: gobierno corporativo, informe de remuneraciones y participaciones (auditadas)', '2026-03-10', `${L}/gxvdv4s2/integrated-annual-report-2025.pdf`),
  P(2, 'Media Release: Financial Year 2025 (propuesta de Ricarda Demarmels como consejera; guía 2026)', '2026-03-10', `${L}/ohcfso2i/financial-year-2025-media-release.pdf`),
  P(3, 'Media Release: Revised full-year guidance 2026', '2026-09-29', `${L}/hhamtolb/sales-guidance-media-release-english.pdf`),
  { id: 4, titulo: 'Notificaciones de participaciones significativas: Chocoladefabriken Lindt & Sprüngli AG', editor: 'SIX Exchange Regulation', tipo: 'Primaria', fecha: '2026-10-14', url: 'https://www.ser-ag.com/en/resources/notifications-market-participants/significant-shareholders.html?issuedBy=LINDT' },
  { id: 5, titulo: 'Lindt fond en Bourse après l\'abaissement des objectifs (Vontobel: segundo recorte en seis meses)', editor: 'AWP / Vermögenszentrum', tipo: 'Prensa', fecha: '2026-09-29', url: 'https://www.vermoegenszentrum.ch/fr/bourses-et-marches/news/lindt-fond-en-bourse-apres-labaissement-des-objectifs' },
  { id: 6, titulo: 'Ad hoc: Lindt & Sprüngli with double-digit organic sales growth and a further margin improvement (2023)', editor: 'EQS News', tipo: 'Primaria', fecha: '2024-03-05', url: 'https://eqs-news.com/news/adhoc/lindt-sprungli-with-double-digit-organic-sales-growth-and-a-further-margin-improvement/2007977' },
  P(7, 'Media Release: Half-year results 2026 (guía 4-6 % confirmada el 21-jul)', '2026-07-21', `${L}/l5nhjcnj/media-release-half-year-results-2026.pdf`),
];
const C = {
  _estado: 'completo',
  directivos: {
    equipo: [
      { nombre: 'Ernst Tanner', cargo: 'Presidente ejecutivo', desde: '1993', participacion_pct: 1.5, trayectoria: 'Ex Johnson & Johnson (presidente de grupo en Europa). Consejero delegado de 1993 a 2016 y presidente desde 1994: multiplicó la empresa con la internacionalización de Lindt y las compras de Ghirardelli y Russell Stover. Posee 3.045 nominativas y 3.400 certificados (≈ 1,5 % del capital) [1].' },
      { nombre: 'Adalbert Lechner', cargo: 'Consejero delegado', desde: '2022', participacion_pct: 0.01, trayectoria: 'En el grupo desde 1993; fue director financiero y responsable de Europa. Como consejero delegado llevó el crecimiento orgánico al 12,4 % en 2025 con el margen al 16,4 %, pero en 2026 recortó dos veces la guía de ventas [1, 3].' },
      { nombre: 'Martin Hug', cargo: 'Director financiero', desde: '2015', participacion_pct: 0.0, trayectoria: 'Director financiero del grupo; antes en Lindt Suiza. 10 nominativas y 4.300 opciones [1].' },
      { nombre: 'Dieter Weisskopf', cargo: 'Vicepresidente', desde: '2022', participacion_pct: 0.07, trayectoria: 'Consejero delegado de 2016 a 2022 y antes director financiero desde 1995; preside la comisión de sostenibilidad [1].' },
    ],
    historial_guidance: [
      { anio: '2023', guia: 'Crecimiento orgánico 8-10 % y +20-40 pb de margen EBIT', real: '10,3 % y margen 15,6 % (+60 pb)', cumplida: 'Sí' },
      { anio: '2024', guia: 'Crecimiento orgánico 6-8 % y +20-40 pb de margen EBIT', real: '7,8 % y margen 16,2 % (+60 pb)', cumplida: 'Sí' },
      { anio: '2025', guia: 'Crecimiento orgánico 7-9 % y +20-40 pb', real: '12,4 % y margen 16,4 % (+20 pb)', cumplida: 'Sí' },
      { anio: '2026', guia: 'Inicial 6-8 %; marzo 4-6 %; septiembre 0-2 %; margen +20-40 pb', real: '1S26: 4,3 % orgánico y margen 11,2 % (+20 pb); año en curso', cumplida: 'No' },
    ],
    comentario: 'Equipo muy estable y de la casa: Tanner lleva 33 años en el consejo y los tres últimos consejeros delegados (Tanner, Weisskopf, Lechner) salieron de dentro [1]. Hasta 2025 cumplió la guía con holgura [6, 1]; en 2026 la recortó dos veces en seis meses, y Vontobel dice que daña su reputación de fiabilidad [3, 5]. La sucesión del presidente ejecutivo, de 77 años, no está anunciada: es el principal asunto de gobierno pendiente.',
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      { nombre: 'Ernst Tanner', cargo: 'Presidente ejecutivo', tipo: 'Ejecutivo', desde: '1993', comisiones: 'Sostenibilidad' },
      { nombre: 'Dieter Weisskopf', cargo: 'Vicepresidente', tipo: 'Otro externo', desde: '2022', comisiones: 'Sostenibilidad (presidente), Auditoría' },
      { nombre: 'Rudolf K. Sprüngli', cargo: 'Consejero', tipo: 'Otro externo', desde: '1988', comisiones: 'Remuneraciones y nombramientos' },
      { nombre: 'Elisabeth Gürtler', cargo: 'Consejera', tipo: 'Independiente', desde: '2009', comisiones: 'Sostenibilidad' },
      { nombre: 'Thomas Rinderknecht', cargo: 'Consejero', tipo: 'Independiente', desde: '2016', comisiones: 'Auditoría (presidente)' },
      { nombre: 'Silvio Denz', cargo: 'Consejero', tipo: 'Independiente', desde: '2018', comisiones: 'Auditoría, Remuneraciones y nombramientos' },
      { nombre: 'Monique Bourquin', cargo: 'Consejera', tipo: 'Independiente', desde: '2023', comisiones: 'Remuneraciones y nombramientos (presidenta)' },
      { nombre: 'Ricarda Demarmels', cargo: 'Consejera (propuesta en la junta de abril de 2026)', tipo: 'Independiente', desde: '2026', comisiones: null },
    ],
    presidente_ceo_separados: true,
    presidente_ejecutivo: true,
    consejero_coordinador: false,
    una_accion_un_voto: false,
    operaciones_vinculadas_relevantes: false,
    variable_ligado_rentabilidad: false,
    auditoria_independiente: false,
    insiders_sin_operaciones: false,
    accionista_control: false,
    presidente_vinculado_control: false,
    cambios_cupula_24m: 0,
    voto_remuneracion_pct: 67,
    voto_remuneracion_contra_pct: null,
    voto_remuneracion_contra_libre_pct: null,
    voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 4.80, fijo: 1.50, variable_corto: 1.33, variable_largo: 1.96, ratio_salario_medio: null },
    remuneracion: 'El consejero delegado cobró 4,80 M CHF en 2025: 1,40 M de fijo, 1,33 M de bonus anual y 1,96 M en opciones sobre certificados [1]. El bonus mide ventas, EBIT, flujo y objetivos ESG; el largo plazo son opciones con bloqueo de 3-5 años, sin métrica de rentabilidad (ROIC o TSR): premia la subida de la acción, no la rentabilidad del capital [1]. Hay cláusulas de pérdida y recuperación (malus y clawback) [1]. El presidente ejecutivo cobra un fijo de 1,2 M sin variable [1]. El informe de remuneraciones de 2023 solo tuvo el 67 % a favor y el de 2024 el 86 % [1]; la junta vota además importes máximos (21,0 M para la dirección en 2025, se pagaron 17,2 M) [1].',
    accionistas: [
      { nombre: 'Fundaciones de pensiones del grupo (Fonds für Pensionsergänzungen y Finanzierungsstiftung)', pct: 15.6, tipo: 'Estable (pensiones de la empresa)', variacion: '20.884 nominativas a dic-25 (20.784 en 2023) [1]' },
      { nombre: 'UBS Fund Management (Switzerland)', pct: 5.01, tipo: 'Institucional', variacion: 'Notificación de dic-24 [1, 4]' },
      { nombre: 'BlackRock Inc.', pct: 4.96, tipo: 'Institucional', variacion: 'Notificación de dic-25 [1, 4]' },
      { nombre: 'Ernst Tanner', pct: 2.3, tipo: 'Consejero (nominativas)', variacion: '3.045 nominativas y 3.400 certificados (4.900 en 2024) [1]' },
      { nombre: 'Autocartera (recompras)', pct: 0.3, tipo: 'Autocartera', variacion: '≈ 362 nominativas y ≈ 20.190 certificados estimados al 9-oct-2026 [1]' },
    ],
    insiders: [
      { fecha: '2025-12-31', persona: 'Ernst Tanner (presidente ejecutivo)', operacion: 'Venta', acciones: 1500, importe: 17.4 },
    ],
    control_y_defensas: 'No hay accionista de control: el mayor es el bloque de las fundaciones de pensiones del grupo (15,6 % del capital nominativo), que vota con el consejo [1]. Defensas fuertes: el consejo puede negarse a inscribir con voto a quien supere el 4 % de las nominativas, hay un límite estatutario de voto del 6 % (con excepciones para las fundaciones y UBS), revocarlo exige tres cuartos de la junta, y los certificados (≈ 42 % del capital económico) no votan [1]. Una opa hostil es prácticamente imposible. El presidente es ejecutivo y no hay consejero coordinador independiente [1].',
    alertas: ['Dos recortes de la guía de ventas en 2026 (marzo y septiembre) [3, 7].', 'Sucesión del presidente ejecutivo (en el consejo desde 1993) sin anunciar.', 'Comisión de auditoría sin mayoría clara de independientes (el vicepresidente fue consejero delegado hasta 2022) [1].'],
    confianza: 'Media',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'operaciones de directivos con fecha exacta', tipo: 'Complemento', intentos: '1) Informe de remuneraciones 2025 (solo saldos a cierre); 2) registro de operaciones de directivos de la SIX (anónimo: cargo e importe); 3) prensa suiza', decision: 'Calculado y marcado como estimación' },
  ],
};

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de LISP.SW, LISN.SW, ^SSMI y EXH3.DE (precio, rango, volumen, betas, cierres de año)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/LISP.SW/history/' },
  { id: 2, titulo: 'Lindt & Sprüngli (LISP): estimaciones 2026-2028 (ventas, EBITDA, EBIT, BPA, DPA, deuda neta)', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/LINDT-73889/finances/' },
  { id: 3, titulo: 'Lindt & Sprüngli (LISP): consenso (17 analistas, Mantener, objetivo medio 96.280,62 CHF por nominativa)', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/LINDT-73889/consensus/' },
  { id: 4, titulo: 'Comparables: cotización, capitalización, valor empresa, EBITDA, estimaciones de BPA y ventas (HSY, MDLZ, NESN, BARN, 2269.T, 2206.T, 271560.KS, LISP)', editor: 'Yahoo Finance (quoteSummary)', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/HSY/key-statistics/' },
  { id: 5, titulo: 'Tipos de cambio USD/CHF, JPY/CHF, KRW/CHF y EUR/CHF del 14-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/USDCHF%3DX/' },
  P(6, 'Integrated Annual Report 2025: resumen de cinco años por certificado (cotización de cierre, PER, capitalización)', '2026-03-10', `${L}/gxvdv4s2/integrated-annual-report-2025.pdf`),
  { id: 7, titulo: 'Mars to acquire Kellanova in $35.9 billion deal (16,4 veces el EBITDA ajustado LTM)', editor: 'Bakery Production / Mars', tipo: 'Prensa', fecha: '2024-08-14', url: 'https://bakeryproduction.co.uk/mars-to-acquire-kellanova-in-35-9-billion-deal/' },
  { id: 8, titulo: 'Swiss chocolate crisis: Lindt cuts sales forecast, shares plunge 8%', editor: 'XTB', tipo: 'Prensa', fecha: '2026-09-29', url: 'https://www.xtb.com/en/market-analysis/swiss-chocolate-crisis-lindt-cuts-sales-forecast-shares-plunge-8' },
  P(9, 'Share buyback program 2026-2029: informe semanal al 9-oct-2026', '2026-10-12', `${L}/r1sjybwc/20261009-lindt-sbb.pdf`),
  { id: 10, titulo: 'Lindt & Sprüngli: consenso de 19 analistas (7 comprar, 6 mantener, 6 vender)', editor: 'getquin', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://app.getquin.com/de/aktie/CH0010570759/lindt-spruengl' },
  P(11, 'Half-Year Report 2026 (acciones emitidas y autocartera a 30-jun-2026)', '2026-07-21', `${L}/qgadvhmc/half-year-report-2026.pdf`),
];
const comps = [
  { nombre: 'Hershey', ticker: 'HSY', pais: 'US', capitalizacion: 27563, ev_ventas: 3.12, ev_ebitda_ltm: 13.9, ev_ebitda_ntm: 13.5, per_ntm: 17.2, crecimiento_pct: 3.0, margen_ebitda_pct: 22.4, roic_pct: null, dn_ebitda: 1.9, fcf_yield_pct: 5.3 },
  { nombre: 'Mondelez', ticker: 'MDLZ', pais: 'US', capitalizacion: 66913, ev_ventas: 2.49, ev_ebitda_ltm: 16.3, ev_ebitda_ntm: 15.7, per_ntm: 19.0, crecimiento_pct: 3.4, margen_ebitda_pct: 15.3, roic_pct: null, dn_ebitda: 3.3, fcf_yield_pct: 2.8 },
  { nombre: 'Nestlé', ticker: 'NESN', pais: 'CH', capitalizacion: 202922, ev_ventas: 2.88, ev_ebitda_ltm: 15.5, ev_ebitda_ntm: 15.0, per_ntm: 16.6, crecimiento_pct: 3.8, margen_ebitda_pct: 18.5, roic_pct: null, dn_ebitda: 3.4, fcf_yield_pct: 2.2 },
  { nombre: 'Barry Callebaut', ticker: 'BARN', pais: 'CH', capitalizacion: 5751, ev_ventas: 0.66, ev_ebitda_ltm: 10.7, ev_ebitda_ntm: 12.4, per_ntm: 25.8, crecimiento_pct: -13.7, margen_ebitda_pct: 6.1, roic_pct: null, dn_ebitda: 4.1, fcf_yield_pct: null },
  { nombre: 'Meiji Holdings', ticker: '2269', pais: 'JP', capitalizacion: 6042, ev_ventas: 1.04, ev_ebitda_ltm: 8.2, ev_ebitda_ntm: 7.8, per_ntm: 16.6, crecimiento_pct: 4.0, margen_ebitda_pct: 12.8, roic_pct: null, dn_ebitda: 0.3, fcf_yield_pct: -2.6 },
  { nombre: 'Ezaki Glico', ticker: '2206', pais: 'JP', capitalizacion: 1592, ev_ventas: 0.69, ev_ebitda_ltm: 8.8, ev_ebitda_ntm: 8.5, per_ntm: 29.9, crecimiento_pct: 3.5, margen_ebitda_pct: 7.9, roic_pct: null, dn_ebitda: -1.7, fcf_yield_pct: 5.2 },
  { nombre: 'Orion', ticker: '271560', pais: 'KR', capitalizacion: 2580, ev_ventas: 0.86, ev_ebitda_ltm: 4.0, ev_ebitda_ntm: 3.6, per_ntm: 8.0, crecimiento_pct: 10.8, margen_ebitda_pct: 21.7, roic_pct: null, dn_ebitda: -1.6, fcf_yield_pct: 8.5 },
];
const D = {
  _estado: 'completo',
  identificacion: {
    nombre: 'Chocoladefabriken Lindt & Sprüngli AG', nombre_corto: 'Lindt', ticker: 'LISP', isin: 'CH0010570767', mercado: 'SIX Swiss Exchange (certificado de participación; la nominativa LISN, CH0010570759, equivale a 10 certificados)', indice_referencia: 'SMI',
    pais: 'Suiza', pais_iso: 'CH', sector: 'Consumo básico', industria: 'Alimentación envasada (chocolate prémium)', sede: 'Kilchberg (Zúrich, Suiza)', fundacion: '1845', empleados: 15351, web: 'https://www.lindt-spruengli.com',
    precio: 7840, fecha_precio: '2026-10-14', acciones: 2.282, capitalizacion_publicada: 17907, free_float_pct: 82,
    max_52s: 13360, min_52s: 7420, volumen_medio_diario: '≈ 30,2 M CHF/día en certificados (3.508 al día, 3 meses)', proximos_resultados: '2027-01-19',
  },
  consenso: {
    guidance: 'Guía 2026 del 29-sep-2026: crecimiento orgánico del 0-2 % (antes 4-6 %, y 6-8 % al empezar el año) y mejora del margen EBIT de 20-40 pb (confirmada) [8]. Objetivos a medio plazo (6-8 % orgánico y +20-40 pb al año) aplazados a «desde 2028»; la guía de 2027 se publicará en el primer trimestre de 2027, y la empresa promete volumen positivo en 2027 [8]. Ventas de 2026 el 19-ene-2027; resultados el 9-mar-2027 [11].',
    estimaciones: [
      { periodo: '2026e', ingresos: 5954, ebitda: 1292, ebit: 984.1, bpa: 316.7, dpa: 186.6, fuente: 'MarketScreener (por nominativa ÷ 10) [2]' },
      { periodo: '2027e', ingresos: 6185, ebitda: 1364, ebit: 1045, bpa: 339.7, dpa: 199.0, fuente: 'MarketScreener [2]' },
      { periodo: '2028e', ingresos: 6514, ebitda: 1450, ebit: 1114, bpa: 364.8, dpa: 209.9, fuente: 'MarketScreener [2]' },
    ],
    recomendaciones: { n_analistas: 17, comprar: 7, mantener: 6, vender: 6, po_medio: 9628, po_min: 7226, po_max: 12500 },
    revisiones: 'El consenso de ventas de 2026 de MarketScreener (5.954 M, +0,6 %) no parece recoger del todo el recorte del 29-sep ni el efecto divisa (−5,2 % en el 1S26): esperamos revisiones a la baja de ventas, no tanto de BPA porque la guía de margen se mantuvo [2, 8]. Yahoo da 316,5 CHF por certificado para 2026 y 333,4 para 2027, en línea [4]. Los objetivos de precio se han recortado durante todo 2026 (Berenberg a Vender en febrero, Goldman Sachs en Vender, UBS recorta en septiembre) y la media, 96.281 CHF por nominativa (≈ 9.628 por certificado), está un 18 % por encima de la cotización [3]. El reparto de recomendaciones va de 7 comprar, 6 mantener y 6 vender en getquin a «Mantener» de media en MarketScreener [3, 10].',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    tipo_rentabilidad: 'de precio (sin dividendos)',
    rentabilidades: [
      { periodo: 'En el año', accion_pct: -32.4, indice_pct: 6.5, sector_pct: 4.6 },
      { periodo: '1 año', accion_pct: -39.9, indice_pct: 13.6, sector_pct: 6.7 },
      { periodo: '3 años (anual.)', accion_pct: -7.0, indice_pct: 9.0, sector_pct: -2.9 },
      { periodo: '5 años (anual.)', accion_pct: -6.5, indice_pct: 3.5, sector_pct: -4.2 },
      { periodo: '10 años (anual.)', accion_pct: 3.9, indice_pct: 5.7, sector_pct: 0.2 },
    ],
    anual: [
      { anio: '2016', accion_pct: -15.7, indice_pct: -6.8 }, { anio: '2017', accion_pct: 12.8, indice_pct: 14.1 }, { anio: '2018', accion_pct: 2.5, indice_pct: -10.2 }, { anio: '2019', accion_pct: 23.2, indice_pct: 26 }, { anio: '2020', accion_pct: 14.8, indice_pct: 0.8 },
      { anio: '2021', accion_pct: 46.3, indice_pct: 20.3 }, { anio: '2022', accion_pct: -25.3, indice_pct: -16.7 }, { anio: '2023', accion_pct: 7.0, indice_pct: 3.8 }, { anio: '2024', accion_pct: -0.2, indice_pct: 4.2 }, { anio: '2025', accion_pct: 15.1, indice_pct: 14.4 },
    ],
    beta: 0.89, volatilidad_pct: 25.5, max_drawdown_pct: -44.3, posicion_corta_pct: null,
    comentario: 'El certificado cae un 39,9 % en un año frente al +13,6 % del SMI y el +6,7 % del sector europeo de alimentación y bebidas [1]. La caída tiene dos fechas: el 10-mar-2026 (−10,3 %, resultados de 2025 y primer recorte de la guía a 4-6 %) y el 29-sep-2026 (−8,7 %, segundo recorte a 0-2 %), y tocó el mínimo de 7.420 CHF el 5-oct-2026, el nivel más bajo desde febrero de 2021 [1, 8]. Caída máxima del 44,3 % desde el máximo de jun-2025 [1]. La nominativa cotiza a 81.600 CHF, un 4,1 % por encima de diez certificados (78.400): es la prima del voto [1]. Suiza no tiene registro público de posiciones cortas.',
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: [
      { anio: '2021', precio_cierre: 12630, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2022', precio_cierre: 9430, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2023', precio_cierre: 10090, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2024', precio_cierre: 10070, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2025', precio_cierre: 11590, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
    ],
    comentario: 'Con los cierres de cada año y el BPA publicado, el certificado cotizó a 61,6 veces en 2021, 39,0 en 2022, 34,9 en 2023, 34,5 en 2024 y 36,6 en 2025 (PER del propio informe anual) [6]. Hoy cotiza a 24,7 veces el BPA de los últimos doce meses y a unas 23 veces el de 2027: el descuento frente a su historia es de un tercio [1, 4]. Lo que ha cambiado: el crecimiento esperado bajó de 6-8 % a 0-2 % en 2026, la acción perdió la etiqueta de «compuesto infalible» con dos recortes de guía, y todo el sector de alimentación de marca se ha desrateado (Nestlé a 16,6 veces, Hershey a 17,2) [4, 8].',
    confianza: 'Alta',
  },
  comparables: {
    criterio: 'Fabricantes cotizados de chocolate y confitería de marca: Hershey y Mondelez (rivales directos en chocolate), Nestlé (KitKat, Cailler), Meiji y Ezaki Glico (chocolate y confitería en Japón), Orion (confitería en Corea) y Barry Callebaut (proveedor industrial de chocolate, referencia del ciclo del cacao). Ferrero y Mars no cotizan. Todas con datos de Yahoo del 14-oct-2026, convertidos a CHF al tipo del día; PER y EV/EBITDA de los próximos 12 meses ponderando los dos ejercicios estimados por meses [4, 5]. Barry Callebaut tiene un flujo libre anómalo por la liberación de circulante del cacao (se deja en blanco).',
    empresas: comps,
    comentario: 'Lindt cotiza a 23,8 veces el BPA de los próximos 12 meses, con prima sobre la mediana del grupo (17,2 veces) y por encima de Hershey (17,2) y Mondelez (19,0) [4]. La prima se ha estrechado mucho: en 2021-2025 Lindt cotizaba a 35-60 veces y el sector a 20-25. Se justifica en parte por el balance (deuda neta inferior a una vez el EBITDA frente a 1,9-3,4 veces de Hershey, Mondelez y Nestlé), el margen EBITDA del 21,5 % y la posición prémium; deja de justificarse si el crecimiento orgánico se queda en el 0-2 % de 2026 [4, 8]. Los comparables japoneses y Orion cotizan barato por mercado y sesgan la mediana a la baja.',
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2024-08', objetivo: 'Kellanova (snacks: Pringles, Cheez-It)', comprador: 'Mars', ev: 30017, ev_ventas: null, ev_ebitda: 16.4, prima_pct: 44, excluir: false, comentario: 'Valor total de 35.900 M USD con la deuda asumida; 16,4 veces el EBITDA ajustado LTM; cerró en diciembre de 2025 [7].' },
    ],
    comentario: 'La única operación grande del sector con múltiplo publicado es la compra de Kellanova por Mars a 16,4 veces el EBITDA, un 44 % de prima [7]. Otras compras recientes (Hotel Chocolat por Mars en 2023, WK Kellogg por Ferrero en 2025) no publicaron múltiplos fiables. Lindt no es comprable de forma hostil: limita la inscripción con voto al 4 % de las nominativas y el voto al 6 %, y las fundaciones de pensiones tienen el 15,6 % [6].',
    confianza: 'Baja',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'transacciones', campo: 'múltiplos de Hotel Chocolat (Mars, 2023), WK Kellogg (Ferrero, 2025) y Clif Bar (Mondelez, 2022)', tipo: 'Complemento', intentos: '1) Comunicados de los compradores (sin EBITDA); 2) búsqueda en prensa sectorial (solo importes); 3) notas de analistas públicas (no accesibles)', decision: 'Omitido' },
    { seccion: 'comparables', campo: 'ROIC de los comparables', tipo: 'Complemento', intentos: '1) Yahoo (solo ROE); 2) Stock Analysis (bloqueado); 3) MarketScreener (no lo da)', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Seeking Alpha: feed de análisis y noticias de Lindt (LDSVF/CHLSY), jul-oct 2026', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-14', url: 'https://seekingalpha.com/api/sa/combined/LDSVF.xml' },
  { id: 2, titulo: 'Lindt & Sprüngli Aktie: Margenziel in Gefahr?', editor: 'Börse Global', tipo: 'Foros y redes', fecha: '2026-10-06', url: 'https://www.boerse-global.de/lindt-spruengli-aktie-margenziel-in-gefahr/831208' },
  { id: 3, titulo: 'getquin: ficha y foro de la comunidad sobre Lindt & Sprüngli', editor: 'getquin', tipo: 'Foros y redes', fecha: '2026-10-14', url: 'https://app.getquin.com/de/aktie/CH0010570759/lindt-spruengl/forum' },
  { id: 4, titulo: 'Lindt & Sprüngli Aktie: Gegenbewegung nach Kurssturz', editor: 'Trading-Treff', tipo: 'Foros y redes', fecha: '2026-10', url: 'https://trading-treff.de/wirtschaft/lindt-spruengli-aktie-gegenbewegung-nach-kurssturz' },
  { id: 5, titulo: 'Swiss chocolate crisis: Lindt cuts sales forecast, shares plunge 8% (comentario de mercado)', editor: 'XTB', tipo: 'Foros y redes', fecha: '2026-09-29', url: 'https://www.xtb.com/en/market-analysis/swiss-chocolate-crisis-lindt-cuts-sales-forecast-shares-plunge-8' },
];
const E = {
  _estado: 'completo',
  sentimiento: {
    tono: 'Negativo', tendencia: 'Empeora',
    revisadas: [
      { plataforma: 'Seeking Alpha (artículos de autores independientes)', fecha: '2026-07', n_comentarios: 3, tono: 'Dividido', resumen: 'Tres análisis en mayo-julio: buena marca, pero la recuperación del volumen «aún tiene que verse» y la valoración «deja poco margen»; otro destaca el riesgo de que el cacao barato obligue a bajar precios [1].' },
      { plataforma: 'Börse Global (artículo con debate)', fecha: '2026-10', n_comentarios: 1, tono: 'Negativo', resumen: 'La pregunta del mercado tras el recorte es si el objetivo de margen está en peligro: «el mercado pide la prueba de que la marca tiene poder de precios» [2].' },
      { plataforma: 'getquin (comunidad de inversores particulares)', fecha: '2026-10', n_comentarios: 9, tono: 'Neutro', resumen: 'La comunidad la ve como valor de dividendo de calidad pero cara; un hilo sobre trabajo infantil en el cacao; pocas entradas recientes [3].' },
      { plataforma: 'Trading-Treff y XTB (comentario de mercado)', fecha: '2026-10', n_comentarios: 2, tono: 'Negativo', resumen: 'Rebote técnico tras la caída a mínimos de 2021; los bajistas ven el recorte como prueba de que el consumidor rechaza el chocolate caro [4, 5].' },
    ],
    temas: [
      { tema: 'Poder de precios y volumen en Europa', postura: 'Bajista', peso: 'Alto', contraste: 'Tienen razón en el dato: volumen/mezcla −7,5 % en el 1S26 y pedidos de temporada flojos en Alemania, Suiza y Austria; Norteamérica crece al 12,7 % [A4, A7].' },
      { tema: 'Credibilidad de la guía', postura: 'Bajista', peso: 'Alto', contraste: 'Dos recortes en seis meses tras años de cumplir; la guía de margen se mantiene [A7].' },
      { tema: 'Valoración: ¿ya barata?', postura: 'Dividida', peso: 'Medio', contraste: 'A 23-24 veces los beneficios es su múltiplo más bajo en más de una década, pero aún con prima sobre Hershey o Nestlé [D4].' },
      { tema: 'Cacao más barato en 2027', postura: 'Alcista', peso: 'Medio', contraste: 'El cacao cayó de casi 12.000 a 5.746 USD/t, pero rebotó desde 3.000 en abril; la mejora de margen se compensa en parte con rebajas de precio [B3].' },
    ],
    lectura: 'El sentimiento es negativo y empeora, sin llegar a capitulación: no hay euforia que desmontar, sino desconfianza en la guía. El foro coincide con el informe en el riesgo principal (elasticidad en Europa) y no añade un riesgo que no tengamos; recuerda el de reputación por el cacao (trabajo infantil). Va en la misma dirección que los analistas, que han recortado objetivos todo el año. El debate de particulares sobre Lindt es escaso: confianza baja.',
    confianza: 'Baja',
  },
  fuentes: fE,
  huecos: [
    { seccion: 'sentimiento', campo: 'foros con volumen (Reddit, cash.ch, finanzen.net)', tipo: 'Complemento', intentos: '1) Reddit (bloqueado); 2) Stocktwits LDSVF (404); 3) getquin y prensa con debate', decision: 'Omitido' },
  ],
};
const fixE = (s) => s.replace(/\[A4, A7\]/g, '[1, 2]').replace(/\[A7\]/g, '[2]').replace(/\[D4\]/g, '[1]').replace(/\[B3\]/g, '[1]');
const Efix = JSON.parse(fixE(JSON.stringify(E)));

guarda('A', A); guarda('B', Bfix); guarda('C', C); guarda('D', D); guarda('E', Efix);
console.log('Notas A-E escritas');
