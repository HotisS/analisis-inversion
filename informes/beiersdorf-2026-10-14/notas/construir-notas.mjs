// Escribe las notas A-E de Beiersdorf (corte 2026-10-14). Hechos con fuente; cada nota cita con [n] de su propia lista.
// Fuentes primarias descargadas en notas/docs (descargar.mjs). Sin XBRL: Alemania no está en filings.xbrl.org (cuentas.mjs --esef falla).
// Ejecutar: node informes/beiersdorf-2026-10-14/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const bolsa = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const URL_PUB = 'https://www.beiersdorf.com/~/media/Beiersdorf/investors/financial-publication';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Annual Report 2025 (cuenta, balance, flujos, segmentos, notas 29-31, resumen de diez años)', editor: 'Beiersdorf AG', tipo: 'Primaria', fecha: '2026-03-02', url: `${URL_PUB}/2026/annual-report/Beiersdorf-2025-Annual-Report.pdf` },
  { id: 2, titulo: 'Annual Report 2024 (pasivos financieros 2022-2024)', editor: 'Beiersdorf AG', tipo: 'Primaria', fecha: '2025-02-27', url: `${URL_PUB}/2025/annual-report/Beiersdorf-Annual-Report-2024.pdf` },
  { id: 3, titulo: 'Annual Report 2023 (cuentas 2022-2023, deterioro de Chantecaille)', editor: 'Beiersdorf AG', tipo: 'Primaria', fecha: '2024-02-29', url: `${URL_PUB}/2024/annual-report-2023/Beiersdorf-annual-report-2023-en.pdf` },
  { id: 4, titulo: 'Annual Report 2022 (cuentas 2021-2022, compra de Chantecaille)', editor: 'Beiersdorf AG', tipo: 'Primaria', fecha: '2023-03-01', url: `${URL_PUB}/2023/annual-report-2022/Beiersdorf-Annual-Report-2022-final.pdf` },
  { id: 5, titulo: 'Half-Year Report 2026 (cuenta, balance, flujos y segmentos a 30-jun-2026; guía rebajada)', editor: 'Beiersdorf AG', tipo: 'Primaria', fecha: '2026-08-05', url: `${URL_PUB}/2026/half-year-report-2026/Beiersdorf-Half-Year-Report-2026.pdf` },
  { id: 6, titulo: 'Conference Call H1 Results 2026 – Speech (Warnery, Hermann)', editor: 'Beiersdorf AG', tipo: 'Primaria', fecha: '2026-08-05', url: `${URL_PUB}/2026/half-year-report-2026/Beiersdorf-h1-2026-speech.pdf` },
  { id: 7, titulo: 'Beiersdorf delivers Q1 2026 in line with expectations (nota de prensa)', editor: 'Beiersdorf AG', tipo: 'Primaria', fecha: '2026-04-21', url: `${URL_PUB}/2026/quarterly-statement-jan-march-2026/Beiersdorf-delivers-q1-2026-in-line-with-expectations.pdf` },
  { id: 8, titulo: 'Full Year Results 2025 – Speech (guía 2026 y recompra de hasta 750 M EUR)', editor: 'Beiersdorf AG', tipo: 'Primaria', fecha: '2026-03-02', url: `${URL_PUB}/2026/annual-report/Beiersdorf-Speech-2026-new.pdf` },
  { id: 9, titulo: 'Beiersdorf delivers 9M 2025 results in line with expectations (guía 2025 ajustada)', editor: 'Beiersdorf AG', tipo: 'Primaria', fecha: '2025-10-23', url: 'https://www.beiersdorf.com/~/media/Beiersdorf/newsroom/press-releases/2025/2025-10-23-beiersdorf-delivers-9M-2025-results-in-line-with-expectations/Beiersdorf-delivers-9M-2025-results-in-line-with-expectations.pdf' },
  { id: 10, titulo: 'Half-Year Report 2025 (primer semestre de 2024 y 2025)', editor: 'Beiersdorf AG', tipo: 'Primaria', fecha: '2025-08-06', url: `${URL_PUB}/2025/half-year-report-2025/Beiersdorf-Half-Year-Report-2025.pdf` },
];

const cuenta = [
  // gastos_generales = marketing y ventas + administración (I+D aparte). Cuenta por función.
  { periodo: '2021', ingresos: 7627, coste_ventas: 3267, gastos_generales: 3123, ebitda: 1220, amortizaciones: 287, ebit: 933, resultado_financiero: -26, bai: 907, impuestos: 252, minoritarios: 17, beneficio_neto: 638, gastos_financieros: 14, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 2.81, dpa: 0.70, dpa_extraordinario: 0, acciones_diluidas: 226.8 },
  { periodo: '2022', ingresos: 8799, coste_ventas: 3842, gastos_generales: 3522, ebitda: 1379, amortizaciones: 287, ebit: 1092, resultado_financiero: 4, bai: 1096, impuestos: 325, minoritarios: 16, beneficio_neto: 755, gastos_financieros: 16, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 3.33, dpa: 0.70, dpa_extraordinario: 0, acciones_diluidas: 226.8 },
  { periodo: '2023', ingresos: 9447, coste_ventas: 4031, gastos_generales: 3820, ebitda: 1554, amortizaciones: 449, ebit: 1105, resultado_financiero: 0, bai: 1105, impuestos: 356, minoritarios: 13, beneficio_neto: 736, gastos_financieros: 26, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 3.24, dpa: 1.00, dpa_extraordinario: 0, acciones_diluidas: 226.8 },
  { periodo: '2024', ingresos: 9850, coste_ventas: 4090, gastos_generales: 4066, ebitda: 1651, amortizaciones: 357, ebit: 1294, resultado_financiero: 32, bai: 1326, impuestos: 398, minoritarios: 16, beneficio_neto: 912, gastos_financieros: 45, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 4.05, dpa: 1.00, dpa_extraordinario: 0, acciones_diluidas: 225.2 },
  { periodo: '2025', ingresos: 9852, coste_ventas: 4166, gastos_generales: 4047, ebitda: 1648, amortizaciones: 328, ebit: 1320, resultado_financiero: 28, bai: 1348, impuestos: 393, minoritarios: 16, beneficio_neto: 939, gastos_financieros: 24, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 4.25, dpa: 1.00, dpa_extraordinario: 0, acciones_diluidas: 221.0 },
];

const A = {
  _estado: 'completa',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 9616, ebitda: 1610, ebit: 1264, beneficio_neto: 938, bpa: 4.30, dpa: 1.00, dpa_extraordinario: 0, fcf: 592, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [
      { periodo: '2022', descripcion: 'Chantecaille (cosmética selectiva, EE. UU.) consolidada desde el 1-feb-2022 por 553 M EUR, con 452 M de fondo de comercio [4]; S-Biomedic (92,5 %) en diciembre.' },
    ],
    comentario: 'De 2021 a 2025 las ventas pasaron de 7.627 a 9.852 M EUR (TCAC del 6,6 %), casi todo orgánico: +9,7 %, +10,2 %, +10,8 %, +6,5 % y +2,4 % [1]. La única compra relevante fue Chantecaille en 2022 (553 M EUR) [4]. El margen EBIT sin factores especiales subió del 13,0 % de 2021 al 14,0 % de 2025, con un margen bruto que bajó en 2025 (57,7 % frente al 58,5 %) y se compensó con eficiencia en gastos generales [1]. 2026 rompe la serie: en el primer semestre las ventas caen un 3,5 % orgánico (NIVEA −6,8 %, Derma +7,8 %, La Prairie −6,9 %, tesa −0,9 %) y el margen bruto del grupo baja 110 pb, al 58,3 %, por materias primas, menor uso de fábricas y divisa [5, 6]. La dirección guía para el año un margen EBIT sin especiales de al menos el 11,8 % (14,0 % en 2025) porque invierte 100 M EUR más en marketing en el segundo semestre [6].',
    ajustes: 'Usamos las cifras publicadas. La empresa da además el EBIT «sin factores especiales» (reestructuraciones, litigios, deterioros): la diferencia en el EBITDA fue de 60 M EUR en 2021, 66 M en 2022, 163 M en 2023, 76 M en 2024 y 58 M en 2025 [1]. Como aparecen todos los años no se tratan como no recurrentes. La excepción es 2023, con un deterioro de 160 M EUR del fondo de comercio de Chantecaille dentro de las amortizaciones (BPA 3,24 publicado frente a 3,80 sin especiales) [3]; en 2025 hubo otro deterioro de 38 M EUR de Chantecaille [1]. El flujo de caja libre que publica cambió de definición en el semestre de 2026 (flujo operativo menos inversión) [5].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '1S24', ingresos: 5175, crecimiento_pct: null, crecimiento_organico_pct: 7.1, ebitda: 1000, margen_ebitda_pct: 19.3, bpa: 2.57, vs_consenso: null },
      { periodo: '2S24', ingresos: 4675, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 651, margen_ebitda_pct: 13.9, bpa: 1.48, vs_consenso: null },
      { periodo: '1S25', ingresos: 5188, crecimiento_pct: 0.3, crecimiento_organico_pct: 2.1, ebitda: 964, margen_ebitda_pct: 18.6, bpa: 2.47, vs_consenso: null },
      { periodo: '2S25', ingresos: 4664, crecimiento_pct: -0.2, crecimiento_organico_pct: null, ebitda: 684, margen_ebitda_pct: 14.7, bpa: 1.78, vs_consenso: null },
      { periodo: '1S26', ingresos: 4952, crecimiento_pct: -4.5, crecimiento_organico_pct: -3.5, ebitda: 926, margen_ebitda_pct: 18.7, bpa: 2.52, vs_consenso: 'Inferior' },
    ],
    ultima_presentacion: 'En marzo (resultados de 2025) la dirección guió 2026 con ventas planas o algo al alza y un margen algo inferior, y anunció una recompra de hasta 750 M EUR en dos años [8]; el primer trimestre cayó un 4,6 % orgánico (NIVEA −7,0 %, Derma +8,2 %, La Prairie −14,9 %) y aun así confirmó la guía [7]. El 3 de agosto la rebajó: el negocio de consumo caerá en ventas «en el rango bajo de un dígito» y su margen EBIT sin especiales será de al menos el 11,0 % (13,6 % en 2025); el grupo, al menos el 11,8 % [5, 6]. El consejero delegado atribuye la caída de NIVEA a conflictos con distribuidores en Europa, la temporada solar y el desalmacenamiento, pero admite que el «portafolio central» no crece y que la demanda final crece por debajo del mercado; abre un plan de 18 meses con más inversión en precios accesibles y 100 M EUR más de marketing en el segundo semestre [6]. Promete volver a crecer en 2027 con el margen estabilizado y, desde 2028, crecer por encima del mercado con mejora gradual del margen y un flujo libre de al menos el 50 % del EBITDA [6]. Lo que no cuantificó: el margen objetivo a medio plazo, cuánto del descenso de NIVEA es pérdida de cuota y qué parte de los 100 M EUR será recurrente. Los analistas preguntaron por el riesgo de nuevas rebajas y por si la tesis de Derma compensa; la respuesta fue la hoja de ruta de 2027-2028, sin cifras [6].',
    confianza: 'Media',
  },
  balance: {
    historico: [
      // caja = efectivo + valores negociables a corto y largo plazo (bonos líquidos). deuda_financiera = préstamos (incluye el pasivo con TROMA en 2021-2022).
      { periodo: '2021', activo_total: 11299, activo_corriente: 4631, pasivo_corriente: 3325, pasivo_total: 4405, fondo_comercio: 244, intangibles: 294, inmovilizado_material: 1845, existencias: 1144, clientes: 1306, proveedores: 1973, activos_contrato: null, pasivos_contrato: null, caja: 5589, deuda_financiera: 341, arrendamientos: 182, patrimonio_neto: 6871, minoritarios: 23, reservas: 6879 },
      { periodo: '2022', activo_total: 12348, activo_corriente: 5542, pasivo_corriente: 3761, pasivo_total: 4543, fondo_comercio: 766, intangibles: 345, inmovilizado_material: 2201, existencias: 1557, clientes: 1508, proveedores: 2328, activos_contrato: null, pasivos_contrato: null, caja: 5035, deuda_financiera: 367, arrendamientos: 191, patrimonio_neto: 7785, minoritarios: 20, reservas: 7725 },
      { periodo: '2023', activo_total: 12629, activo_corriente: 6112, pasivo_corriente: 3504, pasivo_total: 4290, fondo_comercio: 585, intangibles: 353, inmovilizado_material: 2541, existencias: 1514, clientes: 1598, proveedores: 2234, activos_contrato: null, pasivos_contrato: null, caja: 5035, deuda_financiera: 183, arrendamientos: 233, patrimonio_neto: 8322, minoritarios: 17, reservas: 8315 },
      { periodo: '2024', activo_total: 13011, activo_corriente: 6441, pasivo_corriente: 3696, pasivo_total: 4516, fondo_comercio: 569, intangibles: 319, inmovilizado_material: 2719, existencias: 1612, clientes: 1792, proveedores: 2571, activos_contrato: null, pasivos_contrato: null, caja: 4832, deuda_financiera: 30, arrendamientos: 235, patrimonio_neto: 8475, minoritarios: 20, reservas: 8508 },
      { periodo: '2025', activo_total: 12758, activo_corriente: 6661, pasivo_corriente: 3509, pasivo_total: 4140, fondo_comercio: 516, intangibles: 306, inmovilizado_material: 2845, existencias: 1609, clientes: 1910, proveedores: 2484, activos_contrato: null, pasivos_contrato: null, caja: 4305, deuda_financiera: 23, arrendamientos: 194, patrimonio_neto: 8601, minoritarios: 17, reservas: 8839 },
    ],
    vencimientos: null,
    liquidez: 'Liquidez neta de 4.045 M EUR a 30-jun-2026: efectivo 1.282 M + valores a corto 1.435 M + valores a largo 1.566 M, menos préstamos a corto y arrendamientos [5].',
    rating: 'Sin rating (no tiene bonos emitidos)',
    coste_deuda_pct: null,
    vida_media_anios: null,
    otros_pasivos: 'Pensiones: provisión de 145 M EUR a 30-jun-2026 (163 M a cierre de 2025), cubierta en Alemania por TROMA y Metzler Trust [5, 1]. Provisiones no corrientes de 123 M y corrientes de 513 M (sobre todo personal, ventas y litigios) [5]. Litigio por la construcción de una planta en México en 2015, con 9 M EUR de factor especial en 2025 [5]. Sin covenants relevantes ni factoring declarado. La autocartera (23,0 M de acciones a 30-jun-2026) se excluye de las acciones en circulación [5].',
    comentario: 'Beiersdorf no tiene deuda financiera relevante: 23 M EUR de préstamos y 194 M de arrendamientos a cierre de 2025, frente a 4.305 M de efectivo y valores [1]. La caja neta bajó desde 5.066 M en 2021 por la compra de Chantecaille (2022) y las recompras de 501 M en 2024 y 2025 [1, 4]. El circulante comercial (existencias + clientes − proveedores) pasó del 6,1 % de las ventas en 2021 al 10,5 % en 2025, por el aumento de clientes (1.910 M) y unos proveedores que no crecen al mismo ritmo [1]. En junio de 2026 los clientes subieron a 2.432 M por la estacionalidad [5].',
    confianza: 'Alta',
  },
  flujos: {
    historico: [
      { periodo: '2021', flujo_operativo: 993, capex: 413, pagos_arrendamientos: 66, adquisiciones: 0, desinversiones: 18, dividendos: 177, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 12 },
      { periodo: '2022', flujo_operativo: 797, capex: 548, pagos_arrendamientos: 68, adquisiciones: 545, desinversiones: 10, dividendos: 175, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 15 },
      { periodo: '2023', flujo_operativo: 941, capex: 517, pagos_arrendamientos: 68, adquisiciones: 0, desinversiones: 23, dividendos: 173, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 19 },
      { periodo: '2024', flujo_operativo: 1231, capex: 437, pagos_arrendamientos: 75, adquisiciones: 115, desinversiones: 0, dividendos: 241, recompras: 501, emision_acciones: 0, intereses_en_financiacion: 30 },
      { periodo: '2025', flujo_operativo: 785, capex: 463, pagos_arrendamientos: 77, adquisiciones: 0, desinversiones: 0, dividendos: 237, recompras: 501, emision_acciones: 0, intereses_en_financiacion: 11 },
    ],
    comentario: 'La conversión en caja es irregular: el flujo operativo fue de 993, 797, 941, 1.231 y 785 M EUR de 2021 a 2025 [1, 3, 4]. 2022 y 2025 llevan una salida de circulante (existencias en 2022, −395 M; clientes y proveedores en 2025, −290 M) y en 2025 los impuestos pagados (477 M) superaron al gasto (393 M) [1]. La inversión fue alta en 2022-2023 (548 y 517 M, 6,2 % y 5,5 % de las ventas) por fábricas en Leipzig, Polonia, México y Brasil, y el centro de distribución de Leipzig; en 2025 bajó al 4,7 % [1]. La dirección promete llevar el flujo libre a al menos el 50 % del EBITDA a medio plazo, frente al 20 % de 2025 con la definición nueva (785 − 463 = 322 M) [6]. Estimación propia: el capex de mantenimiento es del orden de la amortización (≈3,3-3,6 % de las ventas); el resto es capacidad.',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'PricewaterhouseCoopers GmbH WPG',
    anios_auditor: 2,
    opinion: 'Favorable',
    comentario: null,
    senales: [
      { senal: 'Deterioros repetidos de Chantecaille', nivel: 'Media', comentario: 'Comprada por 553 M EUR en 2022; deterioro de 160 M en 2023 y de 38 M en 2025 [3, 1]. La compra no ha cumplido el plan.' },
      { senal: 'Factores especiales todos los años', nivel: 'Baja', comentario: 'Entre 58 y 163 M EUR en el EBITDA de 2021-2025 [1]; se usan las cifras publicadas.' },
      { senal: 'Cambio de definición del flujo libre (1S26)', nivel: 'Baja', comentario: 'El flujo libre del 1S25 pasó de 501 M a −71 M con la nueva definición, que ya no suma la venta neta de valores [5]. La nueva es la estándar.' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Dividendo fijo por acción: 0,70 EUR de 2016 a 2022 y 1,00 EUR desde 2023, propuesto también para 2025 (219 M EUR) [1]. Recompras: 501 M EUR en 2024 y otros 501 M en 2025, con amortización de las acciones; en marzo de 2026 anunció otro programa de hasta 750 M EUR en dos años, iniciado el 6-may-2026 (32 M EUR comprados hasta el 30-jun) [5, 8]. La dirección dice que la compra de empresas sigue siendo un uso prioritario de la caja [6].',
    adquisiciones: [
      { anio: '2019', objetivo: 'Coppertone (protección solar, EE. UU.)', importe: null, ev_ebitda: null, financiacion: 'Caja', resultado: 'Ventas por debajo del año anterior en 2025 y en el 1S26; es uno de los lastres citados en Norteamérica [1, 6].' },
      { anio: '2022', objetivo: 'Chantecaille (cosmética selectiva)', importe: 553, ev_ebitda: null, financiacion: 'Caja', resultado: 'Deterioros de 160 M EUR (2023) y 38 M (2025): un tercio del precio [3, 1].' },
      { anio: '2022', objetivo: 'S-Biomedic (microbioma, 92,5 %)', importe: null, ev_ebitda: null, financiacion: 'Caja', resultado: 'Tecnología para Derma; sin cifras separadas [4].' },
    ],
    comentario: null,
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'Consumer', descripcion: 'NIVEA, Labello, Eucerin, Aquaphor, Hansaplast, La Prairie, Chantecaille, Coppertone', tipo_resultado: 'EBIT', historico: [ { periodo: '2021', ingresos: 6129, resultado: 680 }, { periodo: '2022', ingresos: 7131, resultado: 828 }, { periodo: '2023', ingresos: 7780, resultado: 834 }, { periodo: '2024', ingresos: 8162, resultado: 1027 }, { periodo: '2025', ingresos: 8176, resultado: 1069 } ] },
      { nombre: 'tesa', descripcion: 'Cintas adhesivas técnicas (electrónica, automóvil, industria) y de consumo', tipo_resultado: 'EBIT', historico: [ { periodo: '2021', ingresos: 1498, resultado: 253 }, { periodo: '2022', ingresos: 1668, resultado: 264 }, { periodo: '2023', ingresos: 1667, resultado: 271 }, { periodo: '2024', ingresos: 1688, resultado: 267 }, { periodo: '2025', ingresos: 1676, resultado: 251 } ] },
    ],
    geografias: [ { nombre: 'Europa', peso_pct: 44.1 }, { nombre: 'América', peso_pct: 25.4 }, { nombre: 'África, Asia y Australia', peso_pct: 30.5 } ],
    geografias_criterio: 'origen',
    kpis: [
      { kpi: 'Ventas de NIVEA (incl. Labello)', valor_anterior: '5.601 M EUR (2024)', valor_actual: '5.529 M EUR (2025); 1S26 2.703 M', variacion: '+0,9 % orgánico en 2025; −6,8 % en 1S26', comentario: 'El crecimiento de 2025 fue solo precio; volumen negativo [1, 5].' },
      { kpi: 'Ventas de Derma (Eucerin, Aquaphor)', valor_anterior: '1.372 M EUR (2024)', valor_actual: '1.492 M EUR (2025); 1S26 837 M', variacion: '+11,7 % orgánico en 2025; +7,8 % en 1S26', comentario: 'Se ha duplicado en cinco años [1, 6].' },
      { kpi: 'Ventas de La Prairie', valor_anterior: '509 M EUR (2024)', valor_actual: '478 M EUR (2025); 1S26 224 M', variacion: '−4,5 % orgánico en 2025; −6,9 % en 1S26', comentario: 'China y venta en aeropuertos [1, 5].' },
      { kpi: 'Ventas de Health Care (Hansaplast)', valor_anterior: '282 M EUR (2024)', valor_actual: '299 M EUR (2025)', variacion: '+9,3 % orgánico', comentario: 'Tres años ganando cuota [1, 6].' },
      { kpi: 'Margen EBIT sin especiales del grupo', valor_anterior: '13,9 % (2024)', valor_actual: '14,0 % (2025); 15,5 % en 1S26', variacion: 'Guía 2026: ≥ 11,8 %', comentario: 'Rebajado en agosto de 2026 [5].' },
      { kpi: 'Margen bruto de Consumer', valor_anterior: '62,0 % (1S25)', valor_actual: '61,0 % (1S26)', variacion: '−100 pb', comentario: 'Costes, menor uso de fábricas y divisa (−60 pb) [6].' },
    ],
    confianza: 'Alta',
  },
  fuentes: fA,
  huecos: [
    { seccion: 'balance', campo: 'vencimientos', tipo: 'Complemento', intentos: '1) Nota 29 del informe anual 2025: solo préstamos a corto (23 M EUR); 2) informe semestral 2026: sin calendario; 3) no hay bonos ni rating', decision: 'Omitido: la deuda es irrelevante (23 M EUR de préstamos)' },
    { seccion: 'trimestres', campo: 'vs_consenso', tipo: 'Complemento', intentos: '1) Notas de prensa de la empresa: no publican el consenso; 2) prensa (Börsen-Zeitung, cash.ch) solo para el 1S26; 3) sin consenso semestral gratuito anterior', decision: 'Solo el 1S26 (rebaja de la guía: inferior)' },
  ],
};

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Annual Report 2025: Sales Market Trends y posición de NIVEA, Eucerin y La Prairie', editor: 'Beiersdorf AG', tipo: 'Primaria', fecha: '2026-03-02', url: `${URL_PUB}/2026/annual-report/Beiersdorf-2025-Annual-Report.pdf` },
  { id: 2, titulo: 'Ficha sectorial «Higiene personal y cosmética de gran consumo» (este repositorio)', editor: 'Análisis propio', tipo: 'Sectorial', fecha: '2026-10-14', url: 'sectores/higiene-cosmetica-2026-10-14.md' },
  { id: 3, titulo: 'L’Oréal 2025 Universal Registration Document, 1.2 Beauty market (≈300.000 M EUR en 2025)', editor: 'L’Oréal', tipo: 'Sectorial', fecha: '2026-03', url: 'https://www.loreal-finance.com/eng/2025-universal-registration-document/en/article/23/' },
  { id: 4, titulo: 'Conference Call H1 Results 2026 – Speech', editor: 'Beiersdorf AG', tipo: 'Primaria', fecha: '2026-08-05', url: `${URL_PUB}/2026/half-year-report-2026/Beiersdorf-h1-2026-speech.pdf` },
  { id: 5, titulo: 'Yahoo Finance: ingresos, EBITDA y márgenes de los últimos 12 meses de Colgate, P&G, Kenvue, Haleon y Estée Lauder', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/CL/key-statistics' },
  { id: 6, titulo: 'Informes de L’Oréal y Unilever de este repositorio (cifras de 2025 de sus cuentas)', editor: 'Análisis propio', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'informes/loreal-2026-10-14/datos-v2.json' },
  { id: 7, titulo: 'Half-Year Report 2026', editor: 'Beiersdorf AG', tipo: 'Primaria', fecha: '2026-08-05', url: `${URL_PUB}/2026/half-year-report-2026/Beiersdorf-Half-Year-Report-2026.pdf` },
  { id: 8, titulo: 'Annual Report 2022 (historia, Chantecaille)', editor: 'Beiersdorf AG', tipo: 'Primaria', fecha: '2023-03-01', url: `${URL_PUB}/2023/annual-report-2022/Beiersdorf-Annual-Report-2022-final.pdf` },
  { id: 9, titulo: 'Kimberly-Clark to acquire Kenvue (valor empresa 48.700 M USD, 14,3 veces el EBITDA ajustado)', editor: 'Kirkland & Ellis / Kimberly-Clark', tipo: 'Prensa', fecha: '2025-11-03', url: 'https://www.kirkland.com/news/press-release/2025/10/kirkland-advises-kimberly-clark-on-487-billion-acquisition-of-kenvue' },
];

const B = {
  _estado: 'completa',
  historia: {
    resumen: 'Beiersdorf nace en 1882 cuando el farmacéutico Paul C. Beiersdorf patenta en Hamburgo un emplasto medicinal; en 1911 lanza la crema NIVEA, en 1936 tesa y en 1957 Hansaplast se consolida en Europa. La familia Herz (Tchibo) toma el control a través de maxingvest en 2004, y desde entonces la empresa ha sido conservadora en balance (caja neta) y dividendo. En 2019-2022 compró Coppertone y Chantecaille; en 2021 Vincent Warnery sustituyó a Stefan De Loecker y lanzó la estrategia C.A.R.E.+ centrada en el cuidado de la piel, con Derma y La Prairie como motores. 2025-2026 marcan el primer tropiezo serio de NIVEA en una década [1, 8].',
    hitos: [
      { anio: '1882', hito: 'Paul C. Beiersdorf patenta el emplasto medicinal en Hamburgo.' },
      { anio: '1911', hito: 'Lanzamiento de la crema NIVEA.' },
      { anio: '1936', hito: 'Nace la marca tesa (cintas adhesivas).' },
      { anio: '2004', hito: 'Tchibo (hoy maxingvest, familia Herz) pasa a controlar Beiersdorf.' },
      { anio: '2019', hito: 'Compra de Coppertone (protección solar en EE. UU.).' },
      { anio: '2021', hito: 'Vincent Warnery, consejero delegado; estrategia C.A.R.E.+.' },
      { anio: '2022', hito: 'Compra de Chantecaille por 553 M EUR [8].' },
      { anio: '2024', hito: 'Ventas récord y primera recompra de acciones (501 M EUR).' },
      { anio: '2026', hito: 'Dos rebajas de la guía; plan de 18 meses para devolver NIVEA al crecimiento [4].' },
    ],
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'Dos negocios. **Consumer** (83 % de las ventas, 8.176 M EUR en 2025): cuidado de la piel de gran consumo con NIVEA y Labello (5.529 M), dermocosmética con Eucerin y Aquaphor (1.492 M), apósitos Hansaplast/Elastoplast (299 M), lujo con La Prairie (478 M) y Chantecaille, y Coppertone [1]. Vende a través de supermercados, droguerías, farmacias, perfumerías, venta en aeropuertos y comercio electrónico en más de 150 países, con fábricas propias (Alemania, Polonia, México, Brasil…). **tesa** (17 %, 1.676 M EUR): cintas adhesivas técnicas para electrónica (teléfonos y tabletas), automóvil, impresión y embalaje, y una línea de consumo [1].',
    como_gana_dinero: 'Marca y distribución: un margen bruto de consumo del ≈62 % financia un gasto de marketing y ventas del ≈38 % de las ventas de Consumer (3.139 M EUR en 2025) [1, 4]. El margen depende de la mezcla: Derma y La Prairie tienen márgenes superiores a NIVEA, y el plan de 2026 de dar a NIVEA precios más accesibles diluye la mezcla [4]. Casi todo son compras repetidas de bajo importe (sin contratos). La estacionalidad la marca el verano (protección solar) y el cuarto trimestre (regalo y La Prairie). tesa vende a fabricantes con más apalancamiento operativo: la electrónica de consumo china mueve su margen [7].',
    clientes: 'Sin concentración publicada: el cliente es la gran distribución (en Europa, cadenas como Edeka, Rewe, dm o Carrefour) y la farmacia. En 2025-2026 hubo «conflictos con clientes» en Europa (retiradas de producto por negociaciones de precio) que restaron ventas a NIVEA [4]. **Poder de precios**: en 2022-2024 Beiersdorf subió precios por encima de la inflación de costes y amplió el margen; en 2025 el crecimiento de NIVEA fue solo precio con volumen negativo, y en el 1S26 el precio aportó apenas 10 pb al margen bruto de consumo frente a 100 pb de deterioro [1, 4]. Es la señal de que el poder de precios de NIVEA se ha agotado; el de Derma sigue (Thiamidol, Epigenetics).',
    confianza: 'Alta',
  },
  sector: {
    definicion: 'Mercado mundial de belleza y cuidado personal (piel, pelo, maquillaje, perfume e higiene) a precios netos de fabricante, que es el perímetro de la ficha sectorial [2] y el que usa L’Oréal para medir cuotas: ≈300.000 M EUR en 2025 [3]. Beiersdorf compite sobre todo en cuidado de la piel (de masas, dermocosmética y lujo), el mayor segmento del mercado; su cuota sobre el total es del ≈2,7 % (Consumer). tesa es un mercado distinto (cintas adhesivas técnicas) y no entra en este perímetro.',
    tamano: '≈ 300.000 M EUR en 2025 a precios netos de fabricante, con un crecimiento previsto del 4,5-5 % en 2026 según L’Oréal [3]; Beiersdorf describe en 2025 un mercado de cuidado de la piel con crecimiento «bajo de un dígito» [1].',
    unidad_serie: 'millones de EUR',
    serie: [ { anio: '2021', tamano: 244000 }, { anio: '2022', tamano: 259000 }, { anio: '2023', tamano: 280000 }, { anio: '2024', tamano: 290000 }, { anio: '2025', tamano: 300000 }, { anio: '2026e', tamano: 314000 } ],
    tcac_historico_pct: 3.4, tcac_previsto_pct: 4.0, cr5_pct: 40, estructura: 'Moderadamente concentrada',
    drivers: [
      { driver: 'Dermocosmética y activos con respaldo científico', efecto: '+', horizonte: 'Estructural', evidencia: 'Derma de Beiersdorf +11,7 % en 2025 y +7,8 % en 1S26 [1, 7].' },
      { driver: 'Marcas locales e independientes en redes sociales', efecto: '−', horizonte: 'Estructural', evidencia: 'Beiersdorf reconoce que las marcas locales e «indie» ganaron cuota en 2025 y los grandes perdieron [1].' },
      { driver: 'Renta disponible y precios (inflación, Oriente Medio)', efecto: '−', horizonte: 'Cíclico', evidencia: 'La crisis de Oriente Medio restó 160 pb al crecimiento de África/Asia en 1S26 [4].' },
      { driver: 'Lujo en China y venta en aeropuertos', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'La Prairie −4,5 % en 2025 por la caída de dos dígitos del lujo en aeropuertos chinos; China nacional crece [1, 4].' },
      { driver: 'Comercio electrónico', efecto: '+', horizonte: 'Estructural', evidencia: 'El canal crece más rápido que el físico en Derma y tesa Consumer [1, 7].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 4, justificacion: 'L’Oréal, Unilever, P&G y Kenvue gastan entre el 20 % y el 35 % de las ventas en marketing; NIVEA perdió cuota con volumen negativo en 2025 [1].' },
      { fuerza: 'Poder de los clientes', intensidad: 4, justificacion: 'La gran distribución europea retiró producto en 2025-2026 en negociaciones de precio («customer conflicts») [4].' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Materias primas químicas y envases genéricos; el coste sube con el petróleo pero no hay proveedor dominante [7].' },
      { fuerza: 'Amenaza de entrada', intensidad: 3, justificacion: 'Las redes sociales abaratan lanzar marcas y la marca blanca de las cadenas compite en precio; la escala de distribución y la investigación (Thiamidol) siguen siendo barreras [1].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 2, justificacion: 'El cuidado de la piel no tiene sustituto funcional; la estética médica compite solo en el lujo antiedad.' },
    ],
    ciclo: { posicion: 'Madurez del ciclo', comentario: 'Es un sector defensivo: en 2009 y 2020 el volumen cayó poco (Beiersdorf −5,7 % orgánico en 2020 por protección solar y aeropuertos) y se recuperó al año siguiente [1]. En 2022-2023 la inflación permitió subir precios y crecer a dos dígitos; desde 2025 el precio ya no empuja y el crecimiento de la categoría ha bajado a un dígito bajo, con consumidores que buscan precio [1]. Los indicadores: crecimiento de la categoría en Circana/NielsenIQ y la diferencia entre precio y volumen en los resultados de los grandes.' },
    regulacion: 'Reglamento europeo de cosméticos 1223/2009 (seguridad, notificación y prohibición de sustancias) y la ley MoCRA de EE. UU. de 2022, que endurece registro y farmacovigilancia [2]. En protección solar, los filtros UV están en revisión en la UE y la FDA no aprueba filtros nuevos desde hace dos décadas, lo que limita la innovación de Coppertone en EE. UU. Normas de envases (reglamento europeo de envases de 2025) elevan el coste de materiales reciclados. Aranceles de EE. UU. de 2025 sobre importaciones europeas [2].',
    tendencias: 'Tres cambios: (1) el consumidor se reparte entre la ciencia (dermocosmética, activos patentados) y el precio (marca blanca y marcas locales), y castiga el «medio premium» donde estaba NIVEA Face; (2) las marcas nativas de redes sociales ganan cuota con lanzamientos rápidos; (3) China pasa del lujo en aeropuertos al consumo nacional y a marcas chinas. Beiersdorf gana en (1) con Eucerin y pierde en el medio de NIVEA, de ahí el giro a precios accesibles [1, 4].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 2.7,
    posicion: 'NIVEA es la mayor marca mundial de cuidado de la piel de masas; Eucerin es la segunda marca de dermocosmética del mundo por ventas netas [1]. Sobre el mercado total de belleza (≈300.000 M EUR), Consumer tiene ≈2,7 %; en tesa, uno de los líderes mundiales en cintas técnicas para electrónica.',
    competidores: [
      { nombre: 'L’Oréal', pais: 'Francia', ticker: 'OR', ingresos: 44053, cuota_pct: 14.7, margen_ebit_pct: 20.2, comentario: 'Líder mundial; L’Oréal Paris y La Roche-Posay/CeraVe compiten con NIVEA y Eucerin [6].' },
      { nombre: 'Unilever (Beauty & Wellbeing y Personal Care)', pais: 'Reino Unido', ticker: 'ULVR', ingresos: 50503, cuota_pct: null, margen_ebit_pct: 17.9, comentario: 'Dove, Vaseline, Rexona: el rival directo de NIVEA en cuerpo y desodorante [6].' },
      { nombre: 'Procter & Gamble', pais: 'EE. UU.', ticker: 'PG', ingresos: 77700, cuota_pct: null, margen_ebit_pct: null, comentario: 'Olay y SK-II en piel; escala y gasto en marketing superiores [5].' },
      { nombre: 'Kenvue', pais: 'EE. UU.', ticker: 'KVUE', ingresos: 13760, cuota_pct: null, margen_ebit_pct: null, comentario: 'Neutrogena, Aveeno: rival de Aquaphor y Eucerin en EE. UU.; en compra por Kimberly-Clark [5, 9].' },
      { nombre: 'Estée Lauder', pais: 'EE. UU.', ticker: 'EL', ingresos: 13440, cuota_pct: null, margen_ebit_pct: null, comentario: 'La Mer y Estée Lauder frente a La Prairie en lujo; sufrió la misma caída de aeropuertos en China [5].' },
      { nombre: 'Colgate-Palmolive', pais: 'EE. UU.', ticker: 'CL', ingresos: 18800, cuota_pct: null, margen_ebit_pct: null, comentario: 'Palmolive y Sanex en higiene; Elta MD/PCA en dermocosmética [5].' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Se estrecha',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'No aplica a un producto de consumo.' },
        { fuente: 'Costes de cambio', puntuacion: 1, evidencia: 'Cambiar de crema no cuesta nada; la fidelidad es hábito.' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 4, evidencia: 'NIVEA y Eucerin entre las primeras marcas mundiales; Thiamidol patentado; margen bruto de consumo del 61-62 % [1, 4]. Pero NIVEA perdió volumen en 2025-2026.' },
        { fuente: 'Ventaja en costes', puntuacion: 2, evidencia: 'Fábricas propias de gran escala; la menor utilización en 2026 subió el coste unitario [4].' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'Distribución en más de 150 países y gasto de marketing de 3.139 M EUR en Consumer; solo un puñado de rivales lo iguala [1].' },
      ],
    },
    amenazas: 'Tres amenazas, de más a menos probable. (1) Pérdida estructural de cuota de NIVEA frente a la marca blanca y las marcas locales en el segmento medio: alta probabilidad; es lo que muestran 2025 (volumen negativo) y 2026 (−6,8 %) [1, 7]. (2) Que la competencia en dermocosmética (CeraVe, La Roche-Posay) frene a Eucerin en EE. UU. y China, donde hoy crece más del 40 % y el 60 %: media [4]. (3) Que el lujo chino no vuelva a los aeropuertos y La Prairie siga en declive: media.',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Lo material para las cifras: (1) coste del plástico y de los materiales reciclados (envases), que sube con el petróleo y con el reglamento europeo de envases; (2) emisiones de alcance 3 de materias primas (aceite de palma, derivados del petróleo), con objetivos validados por SBTi [1]; (3) seguridad de producto y filtros solares, que pueden obligar a reformular. Beiersdorf publica su estado no financiero conforme a la directiva europea (ESRS) con verificación limitada de PwC [1].',
    controversias: 'No se han encontrado sanciones relevantes en los tres últimos años. El único litigio que aparece en las cuentas es el de la construcción de una planta en México en 2015 (9 M EUR de factor especial en el 1S25) [7].',
    confianza: 'Baja',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) Informe anual 2025: no publica las notas de MSCI ni Sustainalytics; 2) web de sostenibilidad (descargas): sin calificaciones con fecha; 3) búsqueda web: solo agregadores sin fecha', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Annual Report 2025: órganos de gobierno, declaración de gobierno corporativo, informe de remuneraciones y partes vinculadas', editor: 'Beiersdorf AG', tipo: 'Primaria', fecha: '2026-03-02', url: `${URL_PUB}/2026/annual-report/Beiersdorf-2025-Annual-Report.pdf` },
  { id: 2, titulo: 'Directors’ Dealings 2026 (compras de BBG Holding, entorno de Wolfgang Herz)', editor: 'Beiersdorf AG', tipo: 'Primaria', fecha: '2026-03-09', url: 'https://www.beiersdorf.com/~/media/Beiersdorf/investors/corporate-governance/directors-dealings/Beiersdorf-Directors-Dealings-2026-en.pdf' },
  { id: 3, titulo: 'Stimmrechtsmitteilungen de la familia Herz y la Max und Ingeburg Herz Stiftung (51,19 % de 252 M de votos)', editor: 'EQS / Der Aktionär', tipo: 'Primaria', fecha: '2023-06', url: 'https://www.deraktionaer.de/nachricht/eqs-stimmrechte-beiersdorf-aktiengesellschaft-deutsch-296274.html' },
  { id: 4, titulo: 'Half-Year Report 2026 (autocartera y recompra)', editor: 'Beiersdorf AG', tipo: 'Primaria', fecha: '2026-08-05', url: `${URL_PUB}/2026/half-year-report-2026/Beiersdorf-Half-Year-Report-2026.pdf` },
  { id: 5, titulo: 'Positive start to the year: Beiersdorf confirms full year guidance (guía 2025: +4-6 % orgánico)', editor: 'Beiersdorf AG', tipo: 'Primaria', fecha: '2025-04-15', url: 'https://www.beiersdorf.com/~/media/Beiersdorf/newsroom/press-releases/2025/2025-04-15-positive-start-to-the-year-beiersdorf-confirms-full-year-guidance/Beiersdorf-positive-start-to-the-year-beiersdorf-confirms-full-year-guidance.pdf' },
  { id: 6, titulo: 'Beiersdorf delivers 9M 2025 results (guía 2025 ajustada a ≈2,5 % en Consumer)', editor: 'Beiersdorf AG', tipo: 'Primaria', fecha: '2025-10-23', url: 'https://www.beiersdorf.com/~/media/Beiersdorf/newsroom/press-releases/2025/2025-10-23-beiersdorf-delivers-9M-2025-results-in-line-with-expectations/Beiersdorf-delivers-9M-2025-results-in-line-with-expectations.pdf' },
  { id: 7, titulo: 'Beiersdorf AGM: Nivea reset, 750M buyback (todas las propuestas aprobadas, incluido el informe de remuneraciones)', editor: 'Yahoo Finance', tipo: 'Prensa', fecha: '2026-04-23', url: 'https://finance.yahoo.com/markets/stocks/articles/beiersdorf-agm-nivea-reset-750m-050844612.html' },
  { id: 8, titulo: 'Vincent Warnery appointed to LEGO Group Board of Directors', editor: 'Global Toy News', tipo: 'Prensa', fecha: '2026-05-12', url: 'https://globaltoynews.com/2026/05/12/vincent-warnery-appointed-to-lego-group-board-of-directors/' },
  { id: 9, titulo: 'Half-Year Report 2026: Outlook for 2026 (guía rebajada)', editor: 'Beiersdorf AG', tipo: 'Primaria', fecha: '2026-08-03', url: `${URL_PUB}/2026/half-year-report-2026/Beiersdorf-Half-Year-Report-2026.pdf` },
];

const C = {
  _estado: 'completa',
  directivos: {
    equipo: [
      { nombre: 'Vincent Warnery', cargo: 'Consejero delegado', desde: '2021', participacion_pct: null, trayectoria: 'En el consejo de dirección desde 2017 (Derma) y consejero delegado desde mayo de 2021; antes Sanofi y P&G [1, 8]. Con él las ventas pasaron de 7.627 a 9.852 M EUR y Derma se duplicó, pero NIVEA lleva dos años sin crecer en volumen [1].' },
      { nombre: 'Astrid Hermann', cargo: 'Directora financiera (y tesa)', desde: '2021', participacion_pct: null, trayectoria: 'Responsable de finanzas, jurídico, tecnología y de la participación en tesa SE; consejera de Stora Enso [1].' },
      { nombre: 'Grita Loebsack', cargo: 'Consejo de dirección, NIVEA', desde: null, participacion_pct: null, trayectoria: 'Responsable de la marca NIVEA, marketing digital y China/Corea; dirige el plan de 18 meses [1].' },
      { nombre: 'Oswald Barckhahn', cargo: 'Consejo de dirección, Europa, EE. UU. y Lujo', desde: null, participacion_pct: null, trayectoria: 'Responsable de Europa, EE. UU. y Canadá, La Prairie y Chantecaille [1].' },
      { nombre: 'Prof. Dr. Reinhard Pöllath', cargo: 'Presidente del consejo de supervisión', desde: null, participacion_pct: null, trayectoria: 'Abogado (P+P Pöllath + Partners), de la confianza del accionista de control; ya superó la edad límite ordinaria [1].' },
    ],
    historial_guidance: [
      { anio: '2025', guia: 'Crecimiento orgánico del grupo y de Consumer del 4-6 % (confirmada en abril) [5]', real: '+2,4 % orgánico; guía rebajada en octubre al ≈2,5 % en Consumer; margen de Consumer +20 pb como se prometió (13,6 %) [6, 1]', cumplida: 'Parcial' },
      { anio: '2026', guia: 'Ventas planas o algo al alza y margen algo inferior (marzo) [4]', real: 'Rebajada el 3-ago-2026: caída orgánica baja de un dígito y margen EBIT ≥ 11,8 % [9]', cumplida: 'No' },
      { anio: '2024', guia: 'Crecimiento orgánico del grupo en la parte alta de un dígito medio, mejorada en abril [1]', real: '+6,5 % orgánico y margen sin especiales del 13,9 % [1]', cumplida: 'Sí' },
    ],
    comentario: 'Equipo estable desde 2021, con un consejero delegado que viene de Derma, el negocio que funciona. Su credibilidad ha caído: dos guías anuales seguidas no se cumplieron (2025 rebajada en octubre; 2026 rebajada en agosto tras ser confirmada en abril) [5, 6, 9]. El variable de 2025 lo refleja: bonus del 81 % del objetivo y 0 % de cumplimiento en la meta de superar al mercado de NIVEA [1]. No hay plan de sucesión público; en mayo de 2026 Warnery entró en el consejo de LEGO [8].',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Prof. Dr. Reinhard Pöllath', cargo: 'Presidente', tipo: 'Dominical', desde: null, comisiones: 'Presidencia, Nombramientos, Mediación, Auditoría, Finanzas' },
      { nombre: 'Frédéric Pflanz', cargo: 'Vicepresidente (director financiero de maxingvest)', tipo: 'Dominical', desde: null, comisiones: 'Finanzas (preside), Personal (preside), Auditoría, Presidencia' },
      { nombre: 'Wolfgang Herz', cargo: 'Consejero (accionista de control)', tipo: 'Dominical', desde: null, comisiones: 'Presidencia' },
      { nombre: 'Uta Kemmerich-Keil', cargo: 'Consejera', tipo: 'Independiente', desde: null, comisiones: 'Auditoría (preside), Finanzas, Nombramientos, Personal' },
      { nombre: 'Donya-Florence Amer', cargo: 'Consejera', tipo: 'Independiente', desde: null, comisiones: 'Digital y Tecnología (preside)' },
      { nombre: 'Hong Chow', cargo: 'Consejera', tipo: 'Independiente', desde: null, comisiones: 'Nombramientos, Personal' },
      { nombre: 'Barbara Wentzel', cargo: 'Vicepresidenta (trabajadores)', tipo: 'Otro externo', desde: null, comisiones: 'Presidencia, Mediación' },
      { nombre: 'Olaf Papier', cargo: 'Consejero (trabajadores)', tipo: 'Otro externo', desde: null, comisiones: 'Auditoría, Finanzas, Mediación, Personal' },
      { nombre: 'Jan Koltze', cargo: 'Consejero (sindicato IG BCE)', tipo: 'Otro externo', desde: null, comisiones: 'Auditoría, Finanzas' },
      { nombre: 'Hilde Cambier', cargo: 'Consejera (trabajadores, tesa)', tipo: 'Otro externo', desde: null, comisiones: 'Digital' },
      { nombre: 'Doris Robben', cargo: 'Consejera (trabajadores, tesa)', tipo: 'Otro externo', desde: null, comisiones: 'Personal, Digital' },
      { nombre: 'Kirstin Weiland', cargo: 'Consejera (trabajadores, tesa)', tipo: 'Otro externo', desde: null, comisiones: 'Personal' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: false, auditoria_independiente: false, insiders_sin_operaciones: false,
    accionista_control: true, presidente_vinculado_control: true, cambios_cupula_24m: 0,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 2.41, fijo: 2.00, variable_corto: 0.41, variable_largo: 0, ratio_salario_medio: null },
    remuneracion: 'Sistema de 2025: fijo de 2,0 M EUR para el consejero delegado, bonus anual con objetivo de 0,5 M (máximo el doble) y plan a largo plazo (LTP 2025-2028) con objetivo de 3,6 M y tope de 7,2 M; remuneración máxima de 12 M al año [1]. Las métricas son crecimiento de ventas, superación del mercado de cuidado de la piel por NIVEA (40 %) y objetivos de sostenibilidad y organización; no hay ninguna de rentabilidad sobre el capital ni de flujo de caja [1]. En 2025 cobró 2,41 M (bonus al 81,3 %) frente a 13,19 M en 2024, cuando se liquidó el LTP 2021-2024 (10,9 M) [1]. Hay cláusula de recuperación (clawback) según el código alemán. La junta de 2026 aprobó el informe de remuneraciones; no se ha encontrado el porcentaje de votos [7].',
    accionistas: [
      { nombre: 'maxingvest / BBG (familia Herz)', pct: 53.5, tipo: 'Control (dominical)', variacion: '128,99 M de votos notificados en 2023 (51,19 % de 252 M); con las amortizaciones de 2024-2026 el capital emitido baja a 241 M; compró 0,48 M de acciones más en marzo de 2026 [3, 2, 4]' },
      { nombre: 'Autocartera', pct: 9.55, tipo: 'Autocartera', variacion: '23,0 M de acciones a 30-jun-2026; recompra de hasta 750 M EUR en curso [4]' },
      { nombre: 'Capital libre', pct: 37.0, tipo: 'Flotante', variacion: 'Estimación propia: 100 − 53,5 − 9,55' },
    ],
    insiders: [
      { fecha: '2026-03-06', persona: 'BBG Holding GmbH & Co. KG (vinculada a Wolfgang Herz)', operacion: 'Compra', acciones: 237377, importe: 20.0 },
      { fecha: '2026-03-09', persona: 'BBG Holding GmbH & Co. KG (vinculada a Wolfgang Herz)', operacion: 'Compra', acciones: 241993, importe: 20.0 },
    ],
    control_y_defensas: 'La familia Herz controla Beiersdorf a través de maxingvest (Tchibo) y BBG: más del 50 % de los votos, y con la autocartera sin voto más del 59 % de los votos presentes [3, 4]. El presidente del consejo de supervisión (Pöllath) y el vicepresidente (Pflanz, director financiero de maxingvest) son de su confianza, y Wolfgang Herz se sienta en el consejo [1]. Una acción, un voto, sin blindajes estatutarios. Las operaciones vinculadas con Tchibo (servicios informáticos) son menores [1]. Para el minoritario, el accionista de control ha sido históricamente conservador (caja neta, dividendo bajo) y en marzo de 2026 compró 40 M EUR de acciones a 82-84 EUR [2]: alinea intereses, pero también descarta una OPA de terceros.',
    alertas: [
      'Dos rebajas de guía en 12 meses (oct-2025 y ago-2026) [6, 9].',
      'El presidente supera la edad límite ordinaria del código; la comisión de auditoría no tiene mayoría de independientes (2 de 5) [1].',
    ],
    confianza: 'Media',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'voto_remuneracion_contra_pct', tipo: 'Complemento', intentos: '1) Web de la junta de 2026 (resultados de votación no descargados: página sin PDF accesible); 2) prensa (Yahoo, Börsen-Zeitung): solo «todas aprobadas»; 3) informe anual 2025: no da el resultado de 2025', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Yahoo Finance, históricos diarios (BEI.DE, EXS1.DE, EXH7.DE), hasta 2026-10-14', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/BEI.DE/history' },
  { id: 2, titulo: 'Beiersdorf: Schätzungen (consenso de 2026-2028, 20 analistas; objetivo medio 79,90 EUR)', editor: 'finanzen.net', tipo: 'Analistas', fecha: '2026-10-14', url: 'https://www.finanzen.net/schaetzungen/beiersdorf' },
  { id: 3, titulo: 'Yahoo Finance: estimaciones, objetivo medio (81,05 EUR, 19 analistas, «hold») y estadísticas de BEI.DE y de los comparables', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/BEI.DE/analysis' },
  { id: 4, titulo: 'Half-Year Report 2026 (acciones en circulación, liquidez neta, guía)', editor: 'Beiersdorf AG', tipo: 'Primaria', fecha: '2026-08-05', url: `${URL_PUB}/2026/half-year-report-2026/Beiersdorf-Half-Year-Report-2026.pdf` },
  { id: 5, titulo: 'Annual Report 2025: resumen de diez años (precios de cierre y BPA 2016-2025)', editor: 'Beiersdorf AG', tipo: 'Primaria', fecha: '2026-03-02', url: `${URL_PUB}/2026/annual-report/Beiersdorf-2025-Annual-Report.pdf` },
  { id: 6, titulo: 'Bundesbank: rendimiento del Bund a 10 años (3,51 % el 14-oct-2026)', editor: 'Deutsche Bundesbank', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://api.statistiken.bundesbank.de/rest/data/BBSIS/D.I.ZST.ZI.EUR.S1311.B.A604.R10XX.R.A.A._Z._Z.A' },
  { id: 7, titulo: 'BCE: tipos de cambio de referencia del 14-oct-2026 (USD 1,1195; GBP 0,84385)', editor: 'Banco Central Europeo', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml' },
  { id: 8, titulo: 'Damodaran, ERPbymonth.xlsx (prima implícita del S&P 500, octubre de 2026: 4,20 %)', editor: 'NYU Stern', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 9, titulo: 'Informes de L’Oréal y Unilever de este repositorio (múltiplos al 9 y 13-oct-2026, llevados al 14-oct con el precio)', editor: 'Análisis propio', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'informes/unilever-2026-10-14/datos-v2.json' },
  { id: 10, titulo: 'Kimberly-Clark to acquire Kenvue (48.700 M USD; 14,3 veces el EBITDA ajustado LTM)', editor: 'Kirkland & Ellis', tipo: 'Prensa', fecha: '2025-11-03', url: 'https://www.kirkland.com/news/press-release/2025/10/kirkland-advises-kimberly-clark-on-487-billion-acquisition-of-kenvue' },
  { id: 11, titulo: 'Transacciones de belleza (Aesop, Byredo, Rhode, Wella, Creed) del informe de L’Oréal de este repositorio', editor: 'Análisis propio (fuentes en informes/loreal-2026-10-14)', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'informes/loreal-2026-10-14/datos-v2.json' },
  { id: 12, titulo: 'Annual Report 2022: asignación del precio de compra de Chantecaille (553 M EUR)', editor: 'Beiersdorf AG', tipo: 'Primaria', fecha: '2023-03-01', url: `${URL_PUB}/2023/annual-report-2022/Beiersdorf-Annual-Report-2022-final.pdf` },
  { id: 13, titulo: 'Beiersdorf senkt nach Ergebnisrückgang Jahresprognose – Aktie sinkt (cash.ch / AWP)', editor: 'cash.ch', tipo: 'Prensa', fecha: '2026-08-03', url: 'https://www.cash.ch/news/beiersdorf-senkt-nach-ergebnisruckgang-jahresprognose-aktie-sinkt-958158' },
  { id: 14, titulo: 'Aktie im Fokus: Beiersdorf schwer belastet von schwachem Ausblick (dpa-AFX)', editor: 'extraETF / dpa-AFX', tipo: 'Prensa', fecha: '2026-03-03', url: 'https://extraetf.com/de/news/dpa-afx/aktie-im-fokus-2-beiersdorf-schwer-belastet-von-schwachem-ausblick--1772530951-04050-1772530948691' },
];

const ib = bolsa.identificacion;
const D = {
  _estado: 'completa',
  identificacion: {
    nombre: 'Beiersdorf Aktiengesellschaft', nombre_corto: 'Beiersdorf', ticker: 'BEI', isin: 'DE0005200000', mercado: 'Xetra (Fráncfort)', indice_referencia: 'DAX',
    pais: 'Alemania', pais_iso: 'DE', sector: 'Productos de consumo básico', industria: 'Productos de cuidado personal', sede: 'Hamburgo', fundacion: '1882', empleados: 22326, web: 'https://www.beiersdorf.com',
    precio: ib.precio, fecha_precio: ib.fecha_precio, acciones: 218.07, capitalizacion_publicada: 17664, free_float_pct: 37.0,
    max_52s: ib.max_52s, min_52s: ib.min_52s, volumen_medio_diario: '≈ 27,2 M EUR/día (3 meses)', proximos_resultados: '2026-10-27',
  },
  consenso: {
    guidance: 'Guía 2026 rebajada el 3-ago-2026: Consumer con caída orgánica de ventas en el rango bajo de un dígito y margen EBIT sin especiales de al menos el 11,0 % (13,6 % en 2025); tesa plano o algo al alza con margen algo inferior al 16,1 %; grupo con caída baja de un dígito y margen de al menos el 11,8 % [4]. A medio plazo: volver a crecer en ventas en 2027 con el margen estabilizado, y desde 2028 crecer por encima del mercado con mejora gradual del margen y flujo libre ≥ 50 % del EBITDA [4]. Próxima cita: ventas de nueve meses el 27-oct-2026.',
    estimaciones: [
      { periodo: '2026e', ingresos: 9646, ebitda: 1470, ebit: 1144, bpa: 3.76, dpa: 1.00, fuente: 'finanzen.net, 20 analistas [2]' },
      { periodo: '2027e', ingresos: 9892, ebitda: 1519, ebit: 1181, bpa: 3.94, dpa: 1.02, fuente: 'finanzen.net, 20 analistas [2]' },
      { periodo: '2028e', ingresos: 10221, ebitda: 1593, ebit: 1246, bpa: 4.20, dpa: 1.05, fuente: 'finanzen.net [2]' },
    ],
    recomendaciones: { n_analistas: 20, comprar: null, mantener: null, vender: null, po_medio: 79.90, po_min: 67.00, po_max: 95.00 },
    revisiones: 'Fuerte recorte en 2026: tras la guía de marzo la acción cayó un 20 % en una sesión y tras la rebaja de agosto Bernstein estimó un recorte del consenso de beneficio de en torno al 15 % [13, 14]. El BPA de 2026 de consenso (3,76 EUR; Yahoo 3,79) queda un 11 % por debajo de los 4,25 de 2025 [2, 3]. El objetivo medio ha bajado a 79,90 EUR (finanzen.net) y 81,05 (Yahoo, 19 analistas, recomendación media «mantener») [2, 3]; según la empresa, más de la mitad de los 20 analistas tenía «mantener» a finales de junio [4]. Solo una fuente con estimaciones completas a tres años (finanzen.net); contrastada con Yahoo en BPA, ventas y objetivo.',
    base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: 0.4,
    confianza: 'Media',
  },
  bolsa: {
    ...bolsa.bolsa,
    posicion_corta_pct: null,
    comentario: 'Beiersdorf ha rendido un −11,9 % anual en tres años frente al +18,0 % del índice alemán, y un 0,7 % anual en diez [1]. La caída empezó tras el máximo de 2024 (cierre de 135,70 EUR en 2023) cuando NIVEA dejó de crecer; el 3-mar-2026 cayó un 20,1 % en una sesión por la guía de 2026, tocó 67,08 EUR el 4-jun y rebotó hasta ≈80 antes de perder un 3,5 % con la rebaja del 3 de agosto [1, 13, 14]. La beta es baja (0,45 mensual a cinco años; 0,73 semanal a dos), pero la volatilidad de un año (32,3 %) es la de un valor cíclico por esos saltos [1].',
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: bolsa.cierres_ejercicio.filter((c) => ['2021', '2022', '2023', '2024', '2025'].includes(c.anio)).map((c) => ({ anio: c.anio, precio_cierre: c.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: c.anio === '2023' })),
    comentario: null,
    confianza: 'Alta',
  },
  comparables: {
    criterio: 'Grandes de cuidado personal y belleza que compiten con NIVEA, Eucerin y La Prairie: L’Oréal y Unilever (de los informes de este repositorio, llevados al 14-oct con el precio), Colgate-Palmolive, Procter & Gamble, Kenvue, Haleon y Estée Lauder (Yahoo Finance, mismo proveedor para EBITDA de los últimos 12 meses y crecimiento previsto) [3, 9]. El EV/EBITDA de los próximos 12 meses es estimación propia: el de los últimos 12 dividido por el crecimiento de ventas previsto (margen constante). Kenvue cotiza ligada a la oferta de Kimberly-Clark (21,01 USD por acción en el anuncio) [10]: se mantiene pero baja la mediana. Fuera Coty y Puig (perfume) y Shiseido (pérdidas). tesa no tiene comparable cotizado puro.',
    empresas: [
      { nombre: 'L’Oréal', ticker: 'OR', pais: 'FR', capitalizacion: 210897, ev_ventas: 4.92, ev_ebitda_ltm: 20.0, ev_ebitda_ntm: 18.4, per_ntm: 27.2, crecimiento_pct: 8.9, margen_ebitda_pct: 24.6, roic_pct: 18.0, dn_ebitda: 1.1, fcf_yield_pct: 3.5 },
      { nombre: 'Unilever', ticker: 'ULVR', pais: 'GB', capitalizacion: 123291, ev_ventas: 3.14, ev_ebitda_ltm: 15.2, ev_ebitda_ntm: 14.6, per_ntm: 18.8, crecimiento_pct: 3.8, margen_ebitda_pct: 20.7, roic_pct: 15.9, dn_ebitda: 2.5, fcf_yield_pct: 5.1 },
      { nombre: 'Procter & Gamble', ticker: 'PG', pais: 'US', capitalizacion: 324759, ev_ventas: 4.39, ev_ebitda_ltm: 15.4, ev_ebitda_ntm: 15.0, per_ntm: 22.1, crecimiento_pct: 2.9, margen_ebitda_pct: 28.4, roic_pct: null, dn_ebitda: 1.0, fcf_yield_pct: 3.7 },
      { nombre: 'Colgate-Palmolive', ticker: 'CL', pais: 'US', capitalizacion: 66067, ev_ventas: 3.73, ev_ebitda_ltm: 15.7, ev_ebitda_ntm: 15.1, per_ntm: 22.9, crecimiento_pct: 4.2, margen_ebitda_pct: 23.7, roic_pct: null, dn_ebitda: 1.3, fcf_yield_pct: 4.7 },
      { nombre: 'Kenvue', ticker: 'KVUE', pais: 'US', capitalizacion: 30901, ev_ventas: 2.70, ev_ebitda_ltm: 12.0, ev_ebitda_ntm: 11.6, per_ntm: 14.7, crecimiento_pct: 3.1, margen_ebitda_pct: 22.6, roic_pct: null, dn_ebitda: 2.2, fcf_yield_pct: 5.5 },
      { nombre: 'Haleon', ticker: 'HLN', pais: 'GB', capitalizacion: 37741, ev_ventas: 3.50, ev_ebitda_ltm: 13.7, ev_ebitda_ntm: 13.0, per_ntm: 16.1, crecimiento_pct: 5.5, margen_ebitda_pct: 25.5, roic_pct: null, dn_ebitda: 2.6, fcf_yield_pct: 5.7 },
      { nombre: 'Estée Lauder', ticker: 'EL', pais: 'US', capitalizacion: 32879, ev_ventas: 2.78, ev_ebitda_ltm: 17.0, ev_ebitda_ntm: 16.1, per_ntm: 29.2, crecimiento_pct: 5.6, margen_ebitda_pct: 16.3, roic_pct: 5.9, dn_ebitda: 2.3, fcf_yield_pct: 4.9 },
    ],
    comentario: null,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2025-11', objetivo: 'Kenvue', comprador: 'Kimberly-Clark', ev: 42200, ev_ventas: 3.1, ev_ebitda: 14.3, prima_pct: null, excluir: false, comentario: '48.700 M USD (≈42.200 M EUR al cambio de entonces); 14,3 veces el EBITDA ajustado LTM, 8,8 con sinergias [10].' },
      { fecha: '2020-05', objetivo: 'Wella, Clairol, OPI y ghd (60 %)', comprador: 'KKR (a Coty)', ev: 3837, ev_ventas: 1.83, ev_ebitda: 12.3, prima_pct: null, excluir: false, comentario: 'Productos de pelo profesionales y de masas [11].' },
      { fecha: '2023-04', objetivo: 'Aesop', comprador: 'L’Oréal (a Natura &Co)', ev: 2253, ev_ventas: 4.7, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Cuidado de la piel y cuerpo de gama alta [11].' },
      { fecha: '2022-06', objetivo: 'Byredo (77 %)', comprador: 'Puig', ev: 1244, ev_ventas: 7.6, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Marca de nicho de alto crecimiento [11].' },
      { fecha: '2025-05', objetivo: 'Rhode', comprador: 'e.l.f. Beauty', ev: 714, ev_ventas: 3.8, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Marca nativa de redes sociales [11].' },
      { fecha: '2022-02', objetivo: 'Chantecaille', comprador: 'Beiersdorf', ev: 553, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Precio de 553 M EUR; sin ventas publicadas de la adquirida [12].' },
      { fecha: '2023-06', objetivo: 'Creed', comprador: 'Kering', ev: 3500, ev_ventas: 14, ev_ebitda: null, prima_pct: null, excluir: true, comentario: 'Perfume de nicho de alto margen: múltiplo atípico [11].' },
    ],
    comentario: null,
    confianza: 'Media',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'bolsa', campo: 'posicion_corta_pct', tipo: 'Complemento', intentos: '1) Bundesanzeiger (Netto-Leerverkaufspositionen ≥ 0,5 %): consulta con JavaScript; 2) agregadores (shortsell.nl, Fintel): sin fecha fiable; 3) prensa: sin cifra', decision: 'Omitido' },
    { seccion: 'consenso', campo: 'recomendaciones (desglose)', tipo: 'Complemento', intentos: '1) finanzen.net: sección vacía; 2) Yahoo: solo la media («hold»); 3) informe semestral de la empresa: «más de la mitad, mantener», sin cifras', decision: 'Omitido el desglose; se da el número de analistas y los objetivos' },
  ],
};

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Seeking Alpha: noticias, análisis y transcripciones de Beiersdorf (BDRFY), RSS', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-09-01', url: 'https://seekingalpha.com/api/sa/combined/BDRFY.xml' },
  { id: 2, titulo: 'Beiersdorf: Cutting The Stock In Half Made It A Cautious Buy (Rating Upgrade)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-06-10', url: 'https://seekingalpha.com/symbol/BDRFY' },
  { id: 3, titulo: 'Simply Wall St Community: narrativa de Beiersdorf y actualización «14 analysts have reduced their fair value estimate» (3-sep-2026)', editor: 'Simply Wall St', tipo: 'Foros y redes', fecha: '2026-09-03', url: 'https://simplywall.st/community/narratives/de/household/etr-bei/beiersdorf-shares/p9lvoeu7-bei-future-product-rollouts-will-drive-upside-despite-sector-headwinds/updates/14-analysts-have-reduced-their-fair-value-estimate-for-beiersdo' },
  { id: 4, titulo: 'Beiersdorf kappt Prognose: Nivea wird zum Sanierungsfall', editor: 'stock3', tipo: 'Foros y redes', fecha: '2026-08-03', url: 'https://stock3.com/news/beiersdorf-kappt-prognose-nivea-wird-zum-sanierungsfall-17219780' },
  { id: 5, titulo: 'Beiersdorf senkt 2026-Prognose wegen NIVEA-Krise: Turnaround ab 2028, Aktie fällt', editor: 'goldesel.de', tipo: 'Foros y redes', fecha: '2026-08', url: 'https://goldesel.de/aktien/news/beiersdorf-senkt-2026-prognose-wegen-nivea-krise-turnaround-ab-2028-aktie-fallt' },
  { id: 6, titulo: 'Beiersdorf Aktie: Tesa im Schatten', editor: 'boerse-express.com', tipo: 'Foros y redes', fecha: '2026-09', url: 'https://www.boerse-express.com/news/articles/beiersdorf-aktie-tesa-im-schatten-880117' },
];

const E = {
  _estado: 'completa',
  sentimiento: {
    tono: 'Negativo', tendencia: 'Empeora',
    revisadas: [
      { plataforma: 'Seeking Alpha (análisis, transcripciones y comentarios)', fecha: '2026-09', n_comentarios: 12, tono: 'Dividido', resumen: 'Tras la caída a la mitad, algún autor pasa a «compra prudente» por valoración y caja neta; las listas cuantitativas la sitúan entre los valores de consumo con peor momento [1, 2].' },
      { plataforma: 'Simply Wall St Community (narrativas)', fecha: '2026-09', n_comentarios: 6, tono: 'Negativo', resumen: 'La narrativa de consenso recorta el valor razonable de ≈86 a ≈82 EUR tras las dos rebajas y la vuelta de NIVEA a 2028 [3].' },
      { plataforma: 'stock3 (portal de inversores particulares)', fecha: '2026-08', n_comentarios: 10, tono: 'Negativo', resumen: '«NIVEA se convierte en caso de saneamiento»: se discute si la marca ha perdido su lugar frente a la marca blanca [4].' },
      { plataforma: 'goldesel.de y boerse-express.com', fecha: '2026-09', n_comentarios: 8, tono: 'Dividido', resumen: 'Lectura de que la rebaja muestra un problema de rentabilidad, no puntual; a la vez, quien defiende el valor señala tesa y Derma y las compras de la familia Herz [5, 6].' },
    ],
    temas: [
      { tema: 'NIVEA frente a la marca blanca', postura: 'Bajista', peso: 'Alto', contraste: 'Los datos lo confirman: volumen negativo en 2025 y −6,8 % en 1S26; la empresa baja precios y mezcla para recuperarlo [4].' },
      { tema: 'Valoración en mínimos de diez años', postura: 'Alcista', peso: 'Medio', contraste: 'Es cierto en múltiplo histórico (PER adelantado de ≈21 frente a una mediana de ≈29), pero el beneficio de 2026 baja un 12 % y la mediana es de una época de crecimiento [2].' },
      { tema: 'Derma (Eucerin, Aquaphor) como motor', postura: 'Alcista', peso: 'Medio', contraste: 'Crece al 7-12 %, pero pesa el 15 % de las ventas: no compensa sola la caída de NIVEA, que pesa el 56 % [1].' },
      { tema: 'Confianza en la dirección', postura: 'Bajista', peso: 'Medio', contraste: 'Dos guías incumplidas en doce meses; el accionista de control compró 40 M EUR en marzo, lo que algunos leen como apoyo.' },
    ],
    lectura: 'El sentimiento particular es negativo y va con el de los analistas (recomendación media «mantener», objetivo ≈80 EUR, igual al precio). No es capitulación: tras el suelo de 67 EUR en junio la acción ha rebotado un 20 %. Lo que aporta: el riesgo que más pesa en la conversación (pérdida estructural de NIVEA frente a la marca blanca) es el mismo que el informe pone primero; nadie discute la caja neta ni tesa. No contradice al consenso ni anticipa un catalizador distinto de los resultados del 27 de octubre. Las fuentes de foros abiertas son pocas (Reddit y los foros alemanes no abren sin navegador), por eso la confianza es baja.',
    confianza: 'Baja',
  },
  fuentes: fE,
  huecos: [],
};

for (const [l, o] of Object.entries({ A, B, C, D, E })) guarda(l, o);
console.log('Notas A-E escritas');
