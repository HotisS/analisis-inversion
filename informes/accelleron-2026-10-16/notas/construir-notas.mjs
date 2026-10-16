// Escribe las notas A-E de Accelleron Industries (corte 2026-10-16) a partir de los documentos de notas/docs
// (informes anuales 2022-2025, semestral 1S26, presentaciones, actas de junta, programa de recompra) y de fuentes web.
// Cuentas en millones de USD (US GAAP). Cada nota cita solo con [n] de su propia lista. Ejecutar: node notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => {
  let txt = JSON.stringify(obj, null, 2);
  txt = txt.replace(/\[([A-E]\d+(?:[,–-]\s*[A-E]?\d+)*)\]/g, (m, dentro) => {
    const otras = (dentro.match(/[A-E]/g) || []).filter((l) => l !== letra);
    if (otras.length) console.warn(`${letra}: cita a otra nota ${m}`);
    return '[' + dentro.replace(new RegExp(letra, 'g'), '') + ']';
  });
  fs.writeFileSync(path.join(dir, `${letra}.json`), txt + '\n', 'utf8');
};
const AI = 'https://accelleron.com/content/dam/accelleronind/documents/investors/';
const r1 = (x) => Math.round(x * 10) / 10;

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Annual Report 2025: cuentas consolidadas (US GAAP), notas (segmentos, ingresos por geografía, deuda, pensiones, garantías, conciliación del Operational EBITA) y revisión financiera', editor: 'Accelleron Industries AG', tipo: 'Primaria', fecha: '2026-03-12', url: AI + 'accelleron-annual-report-2025.pdf' },
  { id: 2, titulo: 'Annual Report 2024, Financial reporting (cuentas 2024 y 2023, compras de OMC2 y TNM, conciliación del Operational EBITA)', editor: 'Accelleron Industries AG', tipo: 'Primaria', fecha: '2025-03-13', url: AI + 'accelleron-industries-annual-report-2024-financal-reporting.pdf' },
  { id: 3, titulo: 'Annual Report 2023, Financial reporting (cuentas 2023 y 2022, compra de OMT, costes de puesta en marcha tras la escisión)', editor: 'Accelleron Industries AG', tipo: 'Primaria', fecha: '2024-03', url: AI + 'accelleron-industries-annual-report-2023-financal-reporting.pdf' },
  { id: 4, titulo: 'Annual Report 2022, Financial reporting (cuentas consolidadas y combinadas 2022 y 2021, escisión de ABB)', editor: 'Accelleron Industries AG', tipo: 'Primaria', fecha: '2023-03-28', url: AI + 'Accelleron_Annual_Report%202022_Financal_reporting.pdf' },
  { id: 5, titulo: 'Half-Year Report 2026 (enero-junio 2026, sin auditar): cuenta, balance, flujos, segmentos, deuda neta y guía 2026 elevada', editor: 'Accelleron Industries AG', tipo: 'Primaria', fecha: '2026-08-27', url: AI + 'Accelleron-Half-Year-Report-2026.pdf' },
  { id: 6, titulo: 'Half-year results 2026, presentación a inversores (centros de datos ~9 % de las ventas, capex 5-6 %, producto +30 % y servicio +15 %)', editor: 'Accelleron Industries AG', tipo: 'Primaria', fecha: '2026-08-27', url: AI + 'Accelleron-Half-Year-Results-Conference-2026.pdf' },
  { id: 7, titulo: 'Full-year 2025 results, presentación (12-mar-2026): guía 2026, marco de asignación de capital, recompra de 100 M CHF', editor: 'Accelleron Industries AG', tipo: 'Primaria', fecha: '2026-03-12', url: AI + 'Accelleron_Analyst_and_Investor_Conference_FY_2025.pdf' },
  { id: 8, titulo: 'Half-Year Report 2023 (ventas y beneficio del 1S23)', editor: 'Accelleron Industries AG', tipo: 'Primaria', fecha: '2023-07', url: AI + 'Accelleron_Industries_Half_Year_Report_2023.pdf' },
  { id: 9, titulo: 'Invitación a la junta 2026 (dividendo de 1,50 CHF) e invitación a la junta 2025 (reparto de 1,25 CHF: 0,86 de dividendo y 0,39 de reservas de capital)', editor: 'Accelleron Industries AG', tipo: 'Primaria', fecha: '2026-03-24', url: AI + '24032026%20AGM%202026%20Invite%20-%20EN.pdf' },
  { id: 10, titulo: 'Capital Markets Day 2022, presentación (objetivos a medio plazo, base instalada, ~75 % de ingresos recurrentes de servicio)', editor: 'Accelleron Industries AG', tipo: 'Primaria', fecha: '2022-08-31', url: 'https://accelleron.com/content/dam/accelleronind/documents/Accelleron-CMD-2022-presentation.pdf' },
];
const cuenta = [
  { periodo: '2021', ingresos: 756.5, coste_ventas: 400.8, gastos_generales: 121.0, ebitda: 209.1, amortizaciones: 23.5, ebit: 185.6, resultado_financiero: -1.4, bai: 184.2, impuestos: 39.9, minoritarios: 5.8, beneficio_neto: 138.5, gastos_financieros: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 1.48, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: 93.6 },
  { periodo: '2022', ingresos: 780.5, coste_ventas: 427.7, gastos_generales: 149.6, ebitda: 179.8, amortizaciones: 22.7, ebit: 157.0, resultado_financiero: -0.6, bai: 156.5, impuestos: 26.7, minoritarios: 7.0, beneficio_neto: 122.8, gastos_financieros: 3.8, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 37.0, bpa: 1.31, dpa: 0.79, dpa_extraordinario: 0, acciones_diluidas: 93.8 },
  { periodo: '2023', ingresos: 914.9, coste_ventas: 528.9, gastos_generales: 192.5, ebitda: 171.4, amortizaciones: 30.1, ebit: 141.3, resultado_financiero: -4.1, bai: 137.2, impuestos: 27.2, minoritarios: 8.8, beneficio_neto: 101.2, gastos_financieros: 8.4, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 77.4, bpa: 1.08, dpa: 1.01, dpa_extraordinario: 0, acciones_diluidas: 93.8 },
  { periodo: '2024', ingresos: 1022.5, coste_ventas: 551.3, gastos_generales: 177.8, ebitda: 274.2, amortizaciones: 36.3, ebit: 237.9, resultado_financiero: -12.1, bai: 225.8, impuestos: 46.4, minoritarios: 9.3, beneficio_neto: 170.1, gastos_financieros: 9.1, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 15.8, bpa: 1.81, dpa: 1.38, dpa_extraordinario: 0, acciones_diluidas: 93.8 },
  { periodo: '2025', ingresos: 1263.1, coste_ventas: 710.0, gastos_generales: 185.4, ebitda: 342.3, amortizaciones: 39.4, ebit: 302.9, resultado_financiero: -0.3, bai: 302.6, impuestos: 58.8, minoritarios: 10.8, beneficio_neto: 232.9, gastos_financieros: 5.8, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 2.48, dpa: 1.89, dpa_extraordinario: 0, acciones_diluidas: 93.9 },
];
const balance = [
  { periodo: '2021', activo_total: 686.1, activo_corriente: 436.9, pasivo_corriente: 326.1, pasivo_total: 379.0, fondo_comercio: null, intangibles: 10.7, inmovilizado_material: 145.6, existencias: 154.8, clientes: 182.6, proveedores: 76.8, activos_contrato: 14.3, pasivos_contrato: 22.6, caja: 73.2, deuda_financiera: 92.1, arrendamientos: 0, patrimonio_neto: 288.8, minoritarios: 18.2, reservas: null },
  { periodo: '2022', activo_total: 981.6, activo_corriente: 614.9, pasivo_corriente: 286.4, pasivo_total: 685.0, fondo_comercio: null, intangibles: 10.5, inmovilizado_material: 150.1, existencias: 186.3, clientes: 199.6, proveedores: 130.7, activos_contrato: 16.4, pasivos_contrato: 23.6, caja: 189.4, deuda_financiera: 322.8, arrendamientos: 0, patrimonio_neto: 283.8, minoritarios: 12.7, reservas: 122.8 },
  { periodo: '2023', activo_total: 1206.8, activo_corriente: 763.3, pasivo_corriente: 327.0, pasivo_total: 903.9, fondo_comercio: null, intangibles: 82.7, inmovilizado_material: 183.6, existencias: 251.2, clientes: 222.4, proveedores: 153.5, activos_contrato: 18.8, pasivos_contrato: 24.8, caja: 234.1, deuda_financiera: 477.6, arrendamientos: 0, patrimonio_neto: 287.3, minoritarios: 15.6, reservas: 224.0 },
  { periodo: '2024', activo_total: 1233.8, activo_corriente: 765.8, pasivo_corriente: 300.8, pasivo_total: 884.6, fondo_comercio: null, intangibles: 109.5, inmovilizado_material: 196.8, existencias: 242.7, clientes: 205.7, proveedores: 110.7, activos_contrato: 20.8, pasivos_contrato: 34.0, caja: 272.5, deuda_financiera: 478.6, arrendamientos: 0, patrimonio_neto: 331.9, minoritarios: 17.3, reservas: 317.5 },
  { periodo: '2025', activo_total: 1540.7, activo_corriente: 982.0, pasivo_corriente: 373.7, pasivo_total: 1042.4, fondo_comercio: null, intangibles: 117.2, inmovilizado_material: 246.5, existencias: 306.8, clientes: 278.6, proveedores: 148.7, activos_contrato: 15.9, pasivos_contrato: 55.3, caja: 356.0, deuda_financiera: 543.5, arrendamientos: 0, patrimonio_neto: 477.2, minoritarios: 21.1, reservas: 422.0 },
];
const flujos = [
  { periodo: '2021', flujo_operativo: 163.3, capex: 28.9, pagos_arrendamientos: 0, adquisiciones: 0, desinversiones: 1.1, dividendos: 153.8, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: '2022', flujo_operativo: 133.4, capex: 34.4, pagos_arrendamientos: 0, adquisiciones: 0, desinversiones: 0.3, dividendos: 178.4, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: '2023', flujo_operativo: 145.2, capex: 36.2, pagos_arrendamientos: 0, adquisiciones: 92.8, desinversiones: 0.1, dividendos: 86.7, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: '2024', flujo_operativo: 216.1, capex: 38.5, pagos_arrendamientos: 0, adquisiciones: 58.8, desinversiones: 0.1, dividendos: 88.2, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: '2025', flujo_operativo: 272.7, capex: 58.8, pagos_arrendamientos: 0, adquisiciones: 4.6, desinversiones: 0.4, dividendos: 143.5, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
];
const segmentos = [
  { nombre: 'Medium & Low Speed', descripcion: 'Turbocompresores de 0,6 a 30 MW (y 80+ MW en baja velocidad) para motores de barco y centrales, más servicio, ferrocarril, inyección de combustible (OMT, OMC2) y la división digital.', tipo_resultado: 'EBITA', historico: [
    { periodo: '2021', ingresos: 550.6, resultado: 138.0 }, { periodo: '2022', ingresos: 566.7, resultado: 150.9 }, { periodo: '2023', ingresos: 664.9, resultado: 163.8 },
    { periodo: '2024', ingresos: 773.5, resultado: 199.1 }, { periodo: '2025', ingresos: 929.6, resultado: 239.4 }] },
  { nombre: 'High Speed', descripcion: 'Turbocompresores de 0,5 a 5 MW para motores de generación (respaldo y generación principal de centros de datos), compresión de gas, barcos y maquinaria fuera de carretera, y su servicio.', tipo_resultado: 'EBITA', historico: [
    { periodo: '2021', ingresos: 205.9, resultado: 49.6 }, { periodo: '2022', ingresos: 213.8, resultado: 41.0 }, { periodo: '2023', ingresos: 249.9, resultado: 59.3 },
    { periodo: '2024', ingresos: 249.0, resultado: 62.8 }, { periodo: '2025', ingresos: 333.5, resultado: 81.6 }] },
];
const A = {
  _estado: 'completa',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 1392.4, ebitda: 386.2, ebit: 347.6, beneficio_neto: 267.1, bpa: 2.84, dpa: 1.89, dpa_extraordinario: 0, fcf: 217.9, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [
      { periodo: '2023', descripcion: 'Compra de OMT (inyección de combustible, Turín) el 20-jul-2023 por 106,6 M USD: entra medio año en la cuenta y entero en el balance [3].' },
      { periodo: '2024', descripcion: 'Compras de OMC2 (Brescia) y TNM el 29-ago-2024: un tercio del año en la cuenta [2].' },
    ],
    comentario: 'Las ventas pasaron de 756,5 M USD en 2021 a 1.263,1 M en 2025 (+13,7 % anual), con 2025 a +23,5 % (+20,9 % orgánico) por cuota en turbocompresores para barcos nuevos, servicio marino (actualizaciones y retrofit) y la generación para centros de datos en EE. UU. [1]. Las compras (OMT en 2023; OMC2 y TNM en 2024) aportaron 5,6 puntos en 2024 y 0,8 en 2025 [1]. El margen bruto bajó de 46,1 % a 43,8 % en 2025 por más producto nuevo (menos margen que el servicio), aranceles y garantías, y se compensó con apalancamiento de gastos: los gastos comerciales y generales cayeron del 17,4 % al 14,7 % de las ventas [1]. El 1S26 siguió igual: ventas +21,3 % (+17,2 % orgánico), margen bruto del 44,3 % y beneficio +31,5 % [5]. 2022-2023 no son comparables con el resto: llevan 37,0 M y 77,4 M de costes de montar las funciones propias tras salir de ABB [3, 4]; 2021 es un perímetro combinado de ABB sin deuda ni costes de cotizada [4].',
    ajustes: 'Usamos las cifras publicadas en US GAAP. La empresa da un «Operational EBITA» que suma los costes no operativos y la amortización de intangibles comprados: 321,0 M en 2025 (25,4 %), frente a un EBIT publicado de 302,9 M [1]. Como no recurrentes solo se devuelven los costes de puesta en marcha tras la escisión, que no se repiten: 37,0 M en 2022, 77,4 M en 2023 y 15,8 M en 2024 [1-3]; los 12,3 M de 2025 (7,7 M de otros costes no operativos y 4,5 M de compras) se dejan dentro porque costes de compras y otros ajustes aparecen casi todos los años. El resultado financiero incluye un ingreso por pensiones no operativo de 13,7 M en 2025 (11,9 M en 2024) que compensa los intereses (5,8 M) y las diferencias de cambio [1]. El BPA es el publicado (diluido = básico).',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '1S24', ingresos: 506.0, crecimiento_pct: 12.8, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: null },
      { periodo: '2S24', ingresos: 516.5, crecimiento_pct: 10.8, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: null },
      { periodo: '1S25', ingresos: 608.0, crecimiento_pct: 20.2, crecimiento_organico_pct: null, ebitda: 162.4, margen_ebitda_pct: 26.7, bpa: 1.17, vs_consenso: null },
      { periodo: '2S25', ingresos: 655.1, crecimiento_pct: 26.8, crecimiento_organico_pct: null, ebitda: 179.9, margen_ebitda_pct: 27.5, bpa: 1.31, vs_consenso: null },
      { periodo: '1S26', ingresos: 737.3, crecimiento_pct: 21.3, crecimiento_organico_pct: 17.2, ebitda: 206.3, margen_ebitda_pct: 28.0, bpa: 1.53, vs_consenso: 'Superior' },
    ],
    ultima_presentacion: 'En marzo de 2026 la dirección presentó 2025 como un año de récord por encima de su guía y dio para 2026 un crecimiento orgánico del 9-14 % con margen de Operational EBITA del 25-26 %, avisando de que el aplazamiento del Marco Net Zero de la OMI frenaba los retrofit y actualizaciones [7]. En agosto el tono subió: elevó el crecimiento orgánico al 14-17 % y mantuvo el margen, con el producto creciendo ~30 % y el servicio ~15 % [5, 6]. Los centros de datos pasaron del ~5 % al «algo menos del 9 %» de las ventas; la potencia instalada en generación principal se duplicó a ~5 GW, mientras el respaldo diésel siguió plano porque los fabricantes de motores priorizan la generación principal [5, 6]. Dos novedades del discurso: el capex sube al 5-6 % de las ventas en 2026 porque las fábricas suizas están cerca del límite, con un enfoque «mantener-invertir-comprar» para no sobredimensionar [6]; y la dirección admite que «el ritmo y la duración» del crecimiento ligado a centros de datos son inciertos y que las actualizaciones marinas se estabilizarán [5]. El flujo de caja libre convirtió solo el 58 % del beneficio (70 % un año antes) por clientes, existencias e impuestos [5]. No publica cartera de pedidos ni el peso exacto del servicio; no hemos podido leer la transcripción de la conferencia (Seeking Alpha la tiene de pago), así que no sabemos qué preguntaron los analistas.',
    confianza: 'Media',
  },
  balance: {
    historico: balance,
    vencimientos: [{ anio: '2026', importe: 0.7 }, { anio: '2028', importe: 302.0 }, { anio: '2030', importe: 229.0 }],
    liquidez: 'Caja de 252,9 M USD a 30-jun-2026 más 100 M CHF de crédito revolvente sin disponer (de un préstamo sindicado de 450 M CHF con UBS) [1, 5].',
    rating: 'Sin rating público (el bono de 180 M CHF se colocó sin calificación) [1].',
    coste_deuda_pct: 1.2,
    vida_media_anios: 2.9,
    otros_pasivos: 'Arrendamientos operativos de 46,2 M USD (US GAAP: su gasto ya está dentro del EBITDA, así que no van al puente) [1]. Plan de pensiones suizo con superávit: activos de 633,9 M frente a obligaciones de 564,6 M a fin de 2025 (activo neto de 69,3 M) [1]. Provisiones de 60,7 M, de ellas 46,9 M de garantías, que subieron con fuerza en 2025 (+18,9 M de dotación por nuevas garantías y revisiones) por el volumen de producto nuevo [1]. Los pasivos de contrato (55,3 M) son anticipos de clientes que se compensan con entregas: van al circulante. La deuda está en francos (préstamo SARON y bono al 1,375 % hasta 2030) y tiene cláusulas de impago cruzado; no hay covenants de apalancamiento publicados [1].',
    comentario: 'La deuda neta bajó de 244 M USD a fin de 2023 a 187,6 M a fin de 2025 (0,5 veces el EBITDA) y subió a 278,9 M en junio de 2026 por el dividendo de 178,9 M pagado en mayo [1, 5]. La deuda bruta (543,5 M) es toda en francos: su valor en dólares sube cuando el franco se aprecia (de 478,6 M a 543,5 M en 2025 sin pedir más) [1]. El circulante comercial (existencias + clientes − proveedores) pasó del 30 % de las ventas en 2024 al 34,6 % en 2025, por clientes (+35 %) y existencias (+26 %) que crecen con el producto nuevo [1]. El patrimonio es bajo para el tamaño del negocio porque la escisión dejó a ABB 332 M de transferencias en 2021-2022 [3, 4]: el ROE y el ROIC salen altos también por eso.',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'De 2021 a 2025 el flujo operativo sumó 930,7 M USD frente a 765,5 M de beneficio atribuido, y el capex 196,8 M (4,4 % de las ventas en 2025, 2,6-4,2 % antes) [1-4]. La conversión de 2025 fue del 88 % del beneficio (99 % en 2024) por el aumento de clientes y existencias [1, 7]; en el 1S26, del 58 % [5]. 2021 y 2022 llevan 153,8 M y 178,4 M de transferencias a ABB antes y durante la escisión, que anotamos como dividendos porque son caja entregada al antiguo dueño [4]. Las compras de OMT (92,8 M netos) y de OMC2/TNM (58,8 M) se pagaron con caja y deuda [2, 3]. La empresa no separa capex de mantenimiento y de crecimiento; para 2026-2028 dice que ~50 % es renovación de equipos, ~20 % mejora de fábricas e I+D en Suiza y ~30 % capacidad nueva [6]: con la amortización en el 3 % de las ventas, el capex de mantenimiento ronda el 3 % (estimación propia).',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'KPMG AG', anios_auditor: 5, opinion: 'Favorable',
    comentario: 'Cuentas en US GAAP auditadas por KPMG desde la constitución en 2021 (y antes como auditor de ABB) [1]. Lo que más afecta a la lectura es la escisión: 2021 es un perímetro combinado sin costes de cotizada ni deuda, y 2022-2024 llevan 130 M de costes de puesta en marcha que la empresa saca de su Operational EBITA [1-4]. No capitaliza I+D (67,9 M de gasto en 2025, el 5,4 % de las ventas) [1]. La provisión de garantías subió de 32,3 M a 46,9 M en 2025: una señal de que el volumen de producto nuevo trae más reclamaciones, que conviene vigilar [1]. El ingreso por pensiones (13,7 M) es contable y no operativo; la empresa no lo mete en el EBITA [1]. La remuneración en acciones es pequeña (3,3 M en 2025) [1]. Lectura de los indicadores del motor: el Altman Z sale muy alto por el poco patrimonio y la mucha caja; el Piotroski es alto con márgenes y caja al alza; el Beneish de 2023 se distorsiona por la compra de OMT y los costes de la escisión.',
    senales: [
      { senal: 'Provisión de garantías +45 % en 2025', nivel: 'Media', comentario: 'Dotación de 18,9 M frente a 5,7 M en 2024; ligada al mayor volumen de producto nuevo [1].' },
      { senal: 'Conversión de caja a la baja (99 % → 88 % → 58 % en el 1S26)', nivel: 'Media', comentario: 'Clientes y existencias crecen más que las ventas en el producto nuevo [1, 5].' },
      { senal: 'Dos clientes concentran el 25 % de las ventas', nivel: 'Media', comentario: 'Un cliente de High Speed el 15 % (12 % en 2024) y otro de Medium & Low Speed el 10 % [1].' },
      { senal: 'Años 2021-2024 afectados por la escisión', nivel: 'Baja', comentario: 'Perímetro combinado en 2021 y costes de puesta en marcha en 2022-2024, explicados y conciliados [1-4].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Marco de asignación de capital de marzo de 2026: invertir en crecimiento (capex de ~5-7 % de las ventas), dividendo «atractivo y creciente» (1,50 CHF por 2025, +20 %, un 76 % del beneficio), compras selectivas y apalancamiento conservador (0,5 veces) [7]. En mayo de 2026 empezó una recompra de hasta 100 M CHF en dos años para amortizar acciones: a 13-oct-2026 llevaba 333.396 acciones (0,35 % del capital) por 25,5 M CHF a 76,48 CHF de media [5, 7]. La política de la salida a bolsa era repartir el 50-70 % del beneficio [10].',
    adquisiciones: [
      { anio: '2023', objetivo: 'OMT (Officine Meccaniche Torino): inyección de combustible para motores marinos de dos tiempos, Italia', importe: 106.6, ev_ebitda: null, financiacion: 'Caja y préstamo de 50 M CHF', resultado: 'Integrada en Medium & Low Speed; la inyección de combustible facturó 97,6 M en 2025 tras sumar OMC2; amplía la oferta a motores de combustibles alternativos [1, 3].' },
      { anio: '2024', objetivo: 'OMC2 Diesel (Brescia; inyección para motores de cuatro tiempos) y TNM (servicio)', importe: 58.8, ev_ebitda: null, financiacion: 'Caja', resultado: 'Deterioro de 1,0 M en relaciones con clientes de OMC2 en 2024 y amortización acelerada en 2025 por la salida de clientes [1, 2].' },
    ],
    comentario: 'La dirección ha asignado bien el capital desde la escisión: con el EBIT pasando de 157 M a 303 M y un capex del 4-5 % de las ventas, ha financiado dos compras pequeñas, ha subido el dividendo de 0,73 a 1,50 CHF y ha bajado la deuda neta a 0,5 veces el EBITDA [1, 7]. El punto débil es la inyección de combustible: OMC2 ya tuvo un deterioro y salida de clientes [1, 2], y las compras de 165 M han aportado unos 98 M de ventas sin que la empresa publique su margen. La recompra de 100 M CHF es pequeña (1,3 % del valor en bolsa) y llega a precios de 70-86 CHF, por encima de los de hace un año [5]. El reparto del 76 % del beneficio deja poco margen si el capex sube al 6 % y la conversión sigue en el 60-90 %.',
    confianza: 'Alta',
  },
  negocio: {
    segmentos,
    geografias: [
      { nombre: 'Asia, Oriente Medio y África (China 13,0 %, Japón 7,2 %)', peso_pct: 43.1 },
      { nombre: 'Europa (Suiza 2,8 %)', peso_pct: 34.9 },
      { nombre: 'América (EE. UU. 16,9 %)', peso_pct: 22.0 },
    ],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Ventas ligadas a centros de datos (% del total)', valor_anterior: '~5 % (1S25)', valor_actual: 'algo menos del 9 % (1S26)', variacion: '+4 pp', comentario: 'Generación principal a gas y respaldo diésel en EE. UU. [5, 6].' },
      { kpi: 'Potencia instalada de generación principal para centros de datos', valor_anterior: '<2 GW (1S25)', valor_actual: '~5 GW (1S26)', variacion: '×2,5', comentario: 'El respaldo, estable en ~3 GW [6].' },
      { kpi: 'Margen de Operational EBITA', valor_anterior: '25,6 % (2024)', valor_actual: '25,4 % (2025); 25,7 % (1S26)', variacion: '−0,2 pp / +0,2 pp', comentario: 'Guía 2026: 25-26 % [1, 5].' },
      { kpi: 'Conversión de caja libre sobre beneficio', valor_anterior: '99 % (2024)', valor_actual: '88 % (2025); 58 % (1S26)', variacion: '−11 pp', comentario: 'Más circulante con el producto nuevo [1, 5].' },
      { kpi: 'Base instalada de turbocompresores', valor_anterior: '>180.000 (2022)', valor_actual: '>190.000 (2025)', variacion: '+6 %', comentario: 'Fuente del negocio de servicio [1, 10].' },
      { kpi: 'Pedidos de la serie A100-L/A200-L', valor_anterior: 'n.d.', valor_actual: '>10.000 pedidos; 110 GW instalados (1S26)', variacion: null, comentario: 'Su sucesora ACCX300-L tiene ya pedidos para más de 50 barcos [6].' },
    ],
  },
  fuentes: fA,
  huecos: [
    { seccion: 'negocio', campo: 'cartera de pedidos y peso del servicio en las ventas', tipo: 'Complemento', intentos: '1) Informe anual 2025 y semestral 2026 (no publican pedidos ni el reparto producto/servicio); 2) presentaciones de resultados (solo crecimientos: producto ~30 %, servicio ~15 % en el 1S26); 3) Capital Markets Day 2022 (~75 % de ingresos ligados al servicio, dato viejo)', decision: 'Omitido' },
    { seccion: 'trimestres', campo: 'EBITDA y BPA del 1S24 y 2S24', tipo: 'Complemento', intentos: '1) Informe semestral 2024 (no localizado en la web: enlace HTML sin PDF); 2) presentación del 1S24 y del 1S25 (PDF escaneado sin texto); 3) comparativas del semestral 2025 (no localizado)', decision: 'Omitido' },
  ],
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Capital Markets Day 2022: tamaño de los segmentos de turbocompresores (Medium & Low Speed ~1.300 M USD y High Speed ~720 M USD en 2020), competidores y cuotas', editor: 'Accelleron Industries AG', tipo: 'Primaria', fecha: '2022-08-31', url: 'https://accelleron.com/content/dam/accelleronind/documents/Accelleron-CMD-2022-presentation.pdf' },
  { id: 2, titulo: 'Annual Report 2025 (informe de sostenibilidad y revisión del negocio: mercados, regulación OMI y UE, >190.000 turbocompresores en servicio)', editor: 'Accelleron Industries AG', tipo: 'Primaria', fecha: '2026-03-12', url: AI + 'accelleron-annual-report-2025.pdf' },
  { id: 3, titulo: 'Half-year results 2026, presentación: cartera de pedidos de astilleros (Clarksons), cobertura >4 años, entregas récord en 2027-2028, centros de datos y compresión de gas', editor: 'Accelleron Industries AG', tipo: 'Primaria', fecha: '2026-08-27', url: AI + 'Accelleron-Half-Year-Results-Conference-2026.pdf' },
  { id: 4, titulo: 'Marine Turbocharger Market Size & Share 2025-2034 (875 M USD en 2024, +5,3 % anual)', editor: 'Global Market Insights', tipo: 'Sectorial', fecha: '2025', url: 'https://www.gminsights.com/industry-analysis/marine-turbocharger-market' },
  { id: 5, titulo: 'Marine Turbocharger Market Size, Share & Growth Analysis 2026-2033 (0,85 mil M USD en 2024; 1,39 mil M en 2033)', editor: 'SkyQuest (vía GII)', tipo: 'Sectorial', fecha: '2026', url: 'https://www.gii.tw/report/sky1899931-marine-turbocharger-market-size-share-growth.html' },
  { id: 6, titulo: 'Half-Year Report 2026: carta a los accionistas (aplazamiento del Marco Net Zero de la OMI, capacidad de los fabricantes de motores, centros de datos)', editor: 'Accelleron Industries AG', tipo: 'Primaria', fecha: '2026-08-27', url: AI + 'Accelleron-Half-Year-Report-2026.pdf' },
  { id: 7, titulo: 'Yahoo Finance: cuentas de los últimos 12 meses de Garrett Motion, IHI, Wärtsilä, Cummins y Burckhardt (16-oct-2026)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://finance.yahoo.com/' },
  { id: 8, titulo: 'Full-year 2025 results, presentación: impacto del aplazamiento del Marco Net Zero, centros de datos limitados por la potencia disponible', editor: 'Accelleron Industries AG', tipo: 'Primaria', fecha: '2026-03-12', url: AI + 'Accelleron_Analyst_and_Investor_Conference_FY_2025.pdf' },
  { id: 9, titulo: 'Presentación del 1S24: cuotas por aplicación de energía (respaldo <5 %; generación principal y balance >>50 %)', editor: 'Accelleron Industries AG', tipo: 'Primaria', fecha: '2024-08', url: AI + 'Accelleron-Half-Year-Results-Conference-2024.pdf' },
];
const B = {
  _estado: 'completa',
  sector: {
    definicion: 'El mercado relevante es el de turbocompresores para motores de más de 0,5 MW (barcos, generación eléctrica, compresión de gas, ferrocarril y maquinaria pesada) y su servicio a lo largo de 20-30 años de vida, no el de turbos de automóvil. Accelleron lo divide en Medium & Low Speed (~1.300 M USD en 2020, de producto y servicio) y High Speed (~720 M USD) [1]. Como contraste, los estudios de mercado que solo miden turbos marinos nuevos dan 850-875 M USD en 2024 [4, 5]: no incluyen el servicio ni la energía. Usamos el perímetro de la empresa (~2.000 M USD en 2020), que es el que cuadra con su cuota; no hay serie pública después de 2020.',
    tamano: '≈ 2.000 M USD en 2020 entre Medium & Low Speed (~1.300 M) y High Speed (~720 M), producto y servicio [1]; solo turbos marinos nuevos: 875 M USD en 2024 [4].',
    unidad_serie: 'millones de USD (turbos marinos nuevos, Global Market Insights y SkyQuest)',
    serie: [{ anio: '2024', tamano: 875 }, { anio: '2025', tamano: 890 }, { anio: '2033e', tamano: 1390 }],
    tcac_historico_pct: null, tcac_previsto_pct: 5.3, cr5_pct: null, estructura: 'Concentrada',
    drivers: [
      { driver: 'Construcción naval', efecto: '+', horizonte: 'Cíclico', evidencia: 'La cartera de pedidos de los astilleros cubre más de 4 años de producción y las entregas de 2027-2028 serán récord en toneladas (Clarksons) [3].' },
      { driver: 'Centros de datos en EE. UU. (generación principal a gas y respaldo)', efecto: '+', horizonte: 'Estructural', evidencia: 'Ventas ligadas a centros de datos del ~5 % al ~9 % del total en un año; potencia instalada de generación principal ×2,5 hasta ~5 GW [3, 6].' },
      { driver: 'Utilización de la flota y servicio', efecto: '+', horizonte: 'Estructural', evidencia: 'Más de 190.000 turbocompresores en servicio; contratos de servicio integral al alza y alta utilización en mercante y cruceros [2, 6].' },
      { driver: 'Descarbonización naval (OMI, ETS de la UE, FuelEU)', efecto: '+/−', horizonte: 'Estructural', evidencia: 'Impulsa actualizaciones y turbos para combustibles alternativos, pero el aplazamiento del Marco Net Zero de la OMI frenó la demanda a corto plazo [6, 8].' },
      { driver: 'Compresión de gas en Norteamérica', efecto: '+', horizonte: 'Cíclico', evidencia: 'Más gasoductos y exportación de GNL: remanufactura de turbos en alza en 2026 [3].' },
      { driver: 'Electrificación y motores sin combustión', efecto: '−', horizonte: 'Estructural', evidencia: 'Amenaza a 15-30 años en buques cortos y en respaldo; hoy los motores grandes no tienen sustituto en barcos de alta mar [1, 2].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 2, justificacion: 'Tres grandes en turbos de baja y media velocidad (Accelleron, MAN/Everllence y Mitsubishi) más Napier y KBB; márgenes de EBITA del 25 % en Accelleron muestran poca guerra de precios [1, 2].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Los fabricantes de motores son pocos y grandes: un cliente de High Speed pesa el 15 % de las ventas y otro de Medium & Low Speed el 10 %; algunos (MAN) fabrican sus propios turbos [2].' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Fundición, mecanizado y aleaciones especiales con varios proveedores; los aranceles y la inflación de costes en 2025 se repercutieron en parte [2].' },
      { fuerza: 'Amenaza de entrada', intensidad: 1, justificacion: 'Hay que homologar cada turbo con el motor y con las sociedades de clasificación, y tener una red de servicio en más de 100 puertos: ningún entrante relevante en décadas [1].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 2, justificacion: 'Baterías y pilas de combustible solo sustituyen en buques cortos; los combustibles alternativos siguen necesitando motor y turbo [1, 2].' },
    ],
    ciclo: { posicion: 'Expansión', comentario: 'La construcción naval está en máximos de cartera (más de 4 años de cobertura) y las entregas de 2027-2028 serán récord [3]; la generación para centros de datos crece por la falta de potencia en la red de EE. UU. [3]. El negocio de servicio amortigua: en la crisis de 2020, con los cruceros parados, Accelleron (entonces ABB Turbocharging) siguió con márgenes altos según su Capital Markets Day, aunque no hay cifras públicas separadas de 2008-09 y 2020 [1]. Lo que más se mueve con el ciclo es el producto nuevo, que ahora crece el doble que el servicio [3].' },
    regulacion: 'La OMI aprobó en 2023 reducir las emisiones de la navegación un 20-30 % en 2030 y llegar a cero hacia 2050; el Marco Net Zero que debía ponerle precio al carbono se aplazó en 2025, lo que frenó retrofit y actualizaciones [2, 6]. En la UE, el comercio de emisiones se aplica a la navegación desde 2024 (100 % de las emisiones desde 2026) y FuelEU Maritime obliga a reducir la intensidad de carbono del combustible desde 2025 [2]. Las normas de emisiones (IMO Tier III, EPA) exigen turbos de más presión, lo que favorece a quien tiene la tecnología de dos etapas [1].',
    tendencias: 'Tres cambios favorecen a Accelleron: motores de combustibles alternativos (GNL, metanol, amoniaco), que necesitan turbos nuevos y actualizaciones [2]; la generación distribuida con motores a gas para centros de datos y redes con renovables [3]; y el servicio digital y los contratos de servicio integral, que fijan al cliente durante la vida del motor [2]. La amenaza a largo plazo es la electrificación de barcos cortos y la sustitución del respaldo diésel por baterías; la IA aparece sobre todo como demanda (centros de datos) [3].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: null,
    posicion: '1.º mundial en turbocompresores para motores de más de 0,5 MW según la empresa, en baja, media y alta velocidad de gas [1, 2]. En generación principal y balance con motores medianos tiene «bastante más del 50 %»; en respaldo diésel de alta velocidad, menos del 5 % [9]. Ganó cuota en barcos nuevos y en motores diésel de alta velocidad en 2025 [2].',
    competidores: [
      { nombre: 'Everllence (antes MAN Energy Solutions; turbos TCA/TCR)', pais: 'Alemania', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Fabricante de motores de dos tiempos que también hace turbos; compite y es cliente a la vez [1].' },
      { nombre: 'Mitsubishi Heavy Industries (turbos MET)', pais: 'Japón', ticker: '7011.T', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Fuerte en baja velocidad para astilleros japoneses y coreanos; no publica cifras del negocio de turbos [1].' },
      { nombre: 'Napier Turbochargers', pais: 'Reino Unido', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Turbos de media velocidad para barcos, ferrocarril y generación [1].' },
      { nombre: 'KBB (Kompressorenbau Bannewitz)', pais: 'Alemania', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Turbos de media velocidad para motores de gas y ferrocarril [1].' },
      { nombre: 'IHI', pais: 'Japón', ticker: '7013.T', ingresos: 10408, cuota_pct: null, margen_ebit_pct: 11.8, comentario: 'Grupo diversificado; turbos sobre todo de automóvil y algunos marinos; margen del grupo [7].' },
      { nombre: 'Garrett Motion', pais: 'EE. UU.', ticker: 'GTX', ingresos: 3754, cuota_pct: null, margen_ebit_pct: 14.8, comentario: 'Turbos de automóvil y camión (menos de 0,5 MW): referencia de lo que vale un turbo de serie frente a uno a medida [7].' },
    ],
    foso: {
      veredicto: 'Amplio', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'La red de más de 100 estaciones de servicio vale más cuanta más base instalada hay, pero no es un efecto de red entre usuarios [1].' },
        { fuente: 'Costes de cambio', puntuacion: 5, evidencia: 'El turbo se homologa con el motor y dura 20-30 años; los recambios y el servicio quedan con el fabricante original: ~75 % de los ingresos ligados al servicio en 2021 [1].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 4, evidencia: 'Cien años de tecnología (desde BBC en 1924), turbos de dos etapas y para combustibles alternativos; I+D del 5,4 % de las ventas [1, 2].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Unos 10.000 turbos al año y escala en compras; margen de EBITA del 25 % frente al ~15 % de los fabricantes de motores [1, 7].' },
        { fuente: 'Escala eficiente', puntuacion: 4, evidencia: 'Mercado de ~2.000 M USD repartido entre tres grandes: poco atractivo para un entrante que tendría que montar red de servicio global [1].' },
      ],
    },
    amenazas: 'Tres amenazas, todas lentas. Primera, que los fabricantes de motores integren el turbo (MAN ya lo hace) o presionen precios aprovechando que dos clientes son el 25 % de las ventas [2]. Segunda, la transición energética: si los barcos nuevos pasan a propulsión eléctrica o a pilas de combustible, la base instalada envejecerá sin reponerse; hoy no ocurre en alta mar (probabilidad baja a 10 años) [1]. Tercera, competidores chinos ligados a los astilleros, que ya fabrican motores bajo licencia: probabilidad media en barcos de gama baja.',
    confianza: 'Media',
  },
  historia: {
    resumen: 'Accelleron nace del negocio de turbocompresores de Brown Boveri (BBC), que fabricó su primer turbo en Baden en 1924 y pasó a ABB con la fusión de 1988 [2]. Durante décadas fue ABB Turbocharging, una división muy rentable con base instalada mundial. ABB decidió en 2022 escindirla y repartir sus acciones a los accionistas: cotiza en la SIX desde el 3-oct-2022 [2]. Desde entonces montó funciones propias (130 M USD de costes en 2022-2024), compró la inyección de combustible de OMT (2023) y OMC2 (2024) y entró en la generación para centros de datos; en 2026 cambió de presidente (Monika Krüsi sustituyó a Oliver Riemenschneider) [2, 6].',
    hitos: [
      { anio: '1924', hito: 'Primer turbocompresor de Brown Boveri (BBC) en Baden, Suiza [2].' },
      { anio: '1988', hito: 'Fusión de ASEA y BBC: el negocio pasa a ABB Turbocharging [2].' },
      { anio: '2022', hito: 'Escisión de ABB y salida a la SIX el 3 de octubre; nombre Accelleron [2].' },
      { anio: '2023', hito: 'Compra de OMT (inyección de combustible, Turín) por 106,6 M USD [2].' },
      { anio: '2024', hito: 'Compras de OMC2 y TNM; bono de 180 M CHF al 1,375 % hasta 2030 [2].' },
      { anio: '2025', hito: 'Ventas de 1.263 M USD (+23,5 %); entrada fuerte en generación para centros de datos [2].' },
      { anio: '2026', hito: 'Recompra de 100 M CHF; guía elevada al 14-17 % orgánico; primeros pedidos del ACCX300-L; nueva presidenta [3, 6].' },
    ],
    confianza: 'Alta',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Dos asuntos mueven las cifras. El primero es la descarbonización naval: los turbos y actualizaciones que ahorran combustible (un 3,5 % de media con su software, según la empresa) y la preparación para metanol, amoniaco e hidrógeno son su argumento de venta frente al comercio de emisiones de la UE y FuelEU [2]. El segundo es la seguridad laboral en fábricas y talleres: el índice de accidentes con baja de 2025 fue de 2,78, por encima del objetivo de 2,51 [2]. Sus objetivos de clima (−50 % en alcance 1 y 2 y −25 % en alcance 3 a 2030 frente a 2023) están validados por SBTi [2].',
    controversias: 'No hemos encontrado sanciones, litigios relevantes ni incidentes graves en los tres últimos años en el informe anual ni en la prensa revisada [2].',
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'Accelleron diseña, fabrica y mantiene turbocompresores para motores de 0,5 a más de 80 MW: el turbo usa los gases de escape para comprimir el aire de entrada y sube la potencia y la eficiencia del motor [2]. Sus clientes directos son los fabricantes de motores (que montan el turbo en barcos, centrales, compresores de gas y locomotoras) y, durante la vida del motor, los armadores y operadores, a los que vende recambios, revisiones, actualizaciones y contratos de servicio integral desde más de 100 estaciones [2]. Fabrica en Suiza (Baden, la mayor planta y sede), Italia (inyección de combustible) y China, con un fabricante bajo contrato en Corea [2]. Más de la mitad de las ventas son marinas y más del 40 % de energía [3].',
    como_gana_dinero: 'Vende el turbo nuevo con poco margen y gana durante 20-30 años con el servicio: recambios propios, revisiones obligatorias y actualizaciones, que dan más margen que el producto (la empresa dice que su margen bruto bajó en 2025 porque el producto creció más que el servicio) [2]. Los ingresos dependen del número de motores nuevos (construcción naval, centros de datos) y de las horas de funcionamiento de la base instalada, que marca las revisiones. El margen depende de la mezcla producto/servicio, del precio (subidas en 2025-2026 «directas e indirectas») y de la absorción de costes fijos en Suiza [3]. Hay apalancamiento operativo: los gastos comerciales y generales crecieron un 4 % en 2025 con ventas +23,5 % [2].',
    clientes: 'Muy concentrados en el producto: un cliente de High Speed (un fabricante de motores para generación) fue el 15 % de las ventas de 2025 y otro de Medium & Low Speed el 10 % [2]. En el servicio la base es muy dispersa (miles de armadores y centrales). Los contratos de servicio integral, a varios años, crecen en número [3]. Poder de precios demostrado: en 2025 absorbió aranceles e inflación de garantías y mantuvo el margen de EBITA en el 25,4 % con ventas +23,5 %, y en el 1S26 parte del crecimiento orgánico vino de precios [2, 3].',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'sector', campo: 'serie de tamaño del mercado de turbos >0,5 MW (producto y servicio) después de 2020', tipo: 'Complemento', intentos: '1) Informe anual 2025 y presentaciones 2026 (sin tamaño de mercado); 2) estudios de mercado (solo turbos marinos nuevos: 850-875 M USD); 3) Capital Markets Day 2022 (solo 2020 y previsión a 2026 en gráfico)', decision: 'Omitido' },
    { seccion: 'competencia', campo: 'cuota de mercado de Accelleron y CR5', tipo: 'Núcleo', intentos: '1) Informe anual y presentaciones (solo «n.º 1» y cuotas por aplicación); 2) Capital Markets Day 2022 (gráficos de reparto sin cifras legibles); 3) estudios de mercado (no dan cuotas)', decision: 'Omitido' },
    { seccion: 'esg', campo: 'calificaciones ESG (MSCI, Sustainalytics)', tipo: 'Complemento', intentos: '1) Informe de sostenibilidad 2025 (solo SBTi y EcoVadis sin nota); 2) webs de MSCI y Sustainalytics (requieren registro); 3) prensa (sin dato)', decision: 'Omitido' },
  ],
};
guarda('B', B);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Annual Report 2025, Corporate governance report (consejo, comisiones, comité ejecutivo, accionistas significativos, auditor)', editor: 'Accelleron Industries AG', tipo: 'Primaria', fecha: '2026-03-12', url: AI + 'accelleron-annual-report-2025-04-corporate-governance-report.pdf' },
  { id: 2, titulo: 'Annual Report 2025, Compensation report (remuneración del CEO y del comité, STI, PSU, participaciones de consejeros y directivos, respuesta al voto de 2025)', editor: 'Accelleron Industries AG', tipo: 'Primaria', fecha: '2026-03-12', url: AI + 'accelleron-annual-report-2025-05-compensation-report.pdf' },
  { id: 3, titulo: 'Results of the 4th Ordinary General Meeting (28-abr-2026)', editor: 'Accelleron Industries AG', tipo: 'Primaria', fecha: '2026-04-28', url: AI + 'Annual_General_Meeting_2026_Results_EN.pdf' },
  { id: 4, titulo: 'Results of the 3rd Ordinary General Meeting (6-may-2025): informe de remuneración aprobado con el 57,25 %', editor: 'Accelleron Industries AG', tipo: 'Primaria', fecha: '2025-05-06', url: AI + 'Accelleron_General_Meeting_2025_Results_EN.pdf' },
  { id: 5, titulo: 'Invitación a la junta 2026 (elecciones, máximos de remuneración)', editor: 'Accelleron Industries AG', tipo: 'Primaria', fecha: '2026-03-24', url: AI + '24032026%20AGM%202026%20Invite%20-%20EN.pdf' },
  { id: 6, titulo: 'Full-year 2025 results (guía 2025 de 16-19 % a tipo constante; guía 2026)', editor: 'Accelleron Industries AG', tipo: 'Primaria', fecha: '2026-03-12', url: AI + 'Accelleron_Analyst_and_Investor_Conference_FY_2025.pdf' },
  { id: 7, titulo: 'Half-Year Report 2026 (guía 2026 elevada; firma de la presidenta y del CEO)', editor: 'Accelleron Industries AG', tipo: 'Primaria', fecha: '2026-08-27', url: AI + 'Accelleron-Half-Year-Report-2026.pdf' },
  { id: 8, titulo: 'Accelleron Capital Markets Day (31-ago-2022): objetivos a medio plazo (crecimiento orgánico 2-4 %, margen de Operational EBITA 23-26 %, reparto del 50-70 %)', editor: 'ABB Ltd', tipo: 'Primaria', fecha: '2022-08-31', url: 'https://new.abb.com/news/detail/94372/accelleron-capital-markets-day-turbochargers-helping-the-world-to-move-further-more-efficiently-and-more-sustainably' },
  { id: 9, titulo: 'Annual Report 2024 y 2023, Financial reporting (resultados frente a la guía de cada año)', editor: 'Accelleron Industries AG', tipo: 'Primaria', fecha: '2025-03-13', url: AI + 'accelleron-industries-annual-report-2024-financal-reporting.pdf' },
];
const C = {
  _estado: 'completa',
  directivos: {
    equipo: [
      { nombre: 'Daniel Bischofberger', cargo: 'Consejero delegado (CEO)', desde: '2022', participacion_pct: 0.03, trayectoria: 'Dirigía ABB Turbocharging desde 2016 y llevó la escisión; con él las ventas han pasado de 780 M USD (2022) a 1.263 M (2025) y el EBIT de 157 M a 303 M [1, 2]. 32.017 acciones y 43.155 PSU sin consolidar a fin de 2025 [2].' },
      { nombre: 'Adrian Grossenbacher', cargo: 'Director financiero (CFO)', desde: '2022', participacion_pct: 0.01, trayectoria: 'Antes, controller global de grupo de producto en ABB [1]. Ha bajado la deuda neta a 0,5 veces el EBITDA y refinanció con un bono de 180 M CHF al 1,375 % [1, 2]. 8.677 acciones [2].' },
      { nombre: 'Monika Krüsi', cargo: 'Presidenta del consejo (desde abr-2026)', desde: '2022', participacion_pct: 0.01, trayectoria: 'Consejera independiente desde 2022 y presidenta de la comisión de auditoría hasta 2026; consultora y antigua auditora y asesora fiscal [1, 3]. 8.138 acciones [2].' },
      { nombre: 'Roland Schwarz', cargo: 'Presidente de la división Service', desde: '2022', participacion_pct: 0.01, trayectoria: 'Dirige el servicio, el negocio de más margen; 8.496 acciones [1, 2].' },
      { nombre: 'Christoph Rofka', cargo: 'Presidente de la división Medium Speed, Low Speed y Rail', desde: '2022', participacion_pct: 0.01, trayectoria: 'Responsable del segmento que más vende (929,6 M USD en 2025, margen de EBITA del 25,8 %) [1, 2].' },
      { nombre: 'Herbert Müller', cargo: 'Presidente de la división High Speed', desde: '2022', participacion_pct: 0.01, trayectoria: 'Ha llevado High Speed de 213,8 M USD (2022) a 333,5 M (2025) con la entrada en centros de datos [1, 2].' },
    ],
    historial_guidance: [
      { anio: '2022 (plan a medio plazo)', guia: 'Crecimiento orgánico del 2-4 % anual y margen de Operational EBITA del 23-26 % [8]', real: 'Crecimiento de las ventas del 17,1 % (2023), 11,8 % (2024) y 23,5 % (2025); margen del 25,6 % y 25,4 % en 2024-2025 [6, 9]', cumplida: 'Sí' },
      { anio: '2025', guia: 'Crecimiento de las ventas del 16-19 % a tipo constante (guía elevada durante el año) [6]', real: '+21,6 % a tipo constante (+20,9 % orgánico); margen del 25,4 % [6]', cumplida: 'Sí' },
      { anio: '2026', guia: 'Crecimiento orgánico del 9-14 % (marzo), elevado al 14-17 % en agosto; margen del 25-26 % [6, 7]', real: '1S26: +17,2 % orgánico y margen del 25,7 % [7]', cumplida: 'Parcial' },
    ],
    comentario: 'Equipo estable desde la escisión: el CEO, el CFO y los presidentes de división siguen desde 2022; en 2025 el comité bajó de siete a seis miembros al suprimir el puesto de director técnico [1]. La credibilidad es alta: ha superado cada año su guía y su plan a medio plazo de 2022 se quedó corto [6, 8, 9]. El punto débil es la alineación: la dirección tiene en conjunto 66.839 acciones (unos 5,6 M USD), muy poco para el tamaño de la empresa, aunque la exigencia de tener acciones obliga a acumular [2]. No hay plan de sucesión público; el relevo de la presidencia en 2026 se anunció con la convocatoria de la junta [5].',
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      { nombre: 'Monika Krüsi', cargo: 'Presidenta (desde abr-2026)', tipo: 'Independiente', desde: '2022', comisiones: 'Nombramientos y Remuneración (hasta 2026); presidió Auditoría hasta 2026' },
      { nombre: 'Bo Cerup-Simonsen', cargo: 'Consejero', tipo: 'Independiente', desde: '2022', comisiones: 'Nombramientos y Remuneración' },
      { nombre: 'Stefano Pampalone', cargo: 'Consejero', tipo: 'Independiente', desde: '2022', comisiones: 'Nombramientos y Remuneración (desde 2026); Auditoría' },
      { nombre: 'Detlef Trefzger', cargo: 'Consejero', tipo: 'Independiente', desde: '2022', comisiones: 'Auditoría' },
      { nombre: 'Reto Suter', cargo: 'Consejero (nuevo en 2026)', tipo: 'Independiente', desde: '2026', comisiones: 'n.d.' },
      { nombre: 'Mieke Van de Capelle', cargo: 'Consejera (nueva en 2026)', tipo: 'Independiente', desde: '2026', comisiones: 'Nombramientos y Remuneración' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 1,
    voto_remuneracion_pct: 57.25, voto_remuneracion_contra_pct: 42.75, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 2.19, fijo: 1.12, variable_corto: 0.61, variable_largo: 0.46, ratio_salario_medio: null },
    remuneracion: 'El CEO cobró 1,74 M CHF en 2025 (2,19 M USD al cambio de fin de año): 0,60 M de fijo, 0,29 M de prestaciones, 0,48 M de variable anual y 0,37 M de largo plazo [2]. El variable anual depende de ventas (30 %), margen de Operational EBITA (20 %), flujo de caja operativo (20 %) y objetivos individuales y de sostenibilidad; el largo plazo, de PSU a tres años con BPA (40 %), rentabilidad relativa para el accionista (40 %) y emisiones de CO₂ por ventas (20 %); desde 2026, BPA y rentabilidad relativa al 50 % cada uno [2]. Hay cláusulas de malus y recuperación [2]. **En la junta de 2025 el informe de remuneración solo obtuvo el 57,25 % (42,75 % en contra)** porque los inversores no veían clara la relación entre pago y resultados; el consejo habló con ellos, publicó más detalle de los objetivos y en 2026 el informe sacó el 94,99 % [2-4].',
    accionistas: [
      { nombre: 'UBS Fund Management (Switzerland)', pct: 5.06, tipo: 'Fondo', variacion: 'Comunicada a la SIX; sin cambio relevante en 2025 [1].' },
      { nombre: 'BlackRock Inc.', pct: 5.06, tipo: 'Gestora', variacion: 'Comunicada a la SIX [1].' },
      { nombre: 'Swisscanto Fondsleitung', pct: 4.99, tipo: 'Fondo', variacion: 'Comunicada a la SIX [1].' },
      { nombre: 'Norges Bank', pct: 3.46, tipo: 'Fondo soberano', variacion: 'Comunicada a la SIX [1].' },
      { nombre: 'Autocartera y recompra', pct: 0.84, tipo: 'Autocartera', variacion: '453.751 acciones para planes de empleados a 30-jun-2026 y 333.396 recompradas para amortizar a 13-oct-2026 [7].' },
    ],
    insiders: [],
    control_y_defensas: 'No hay accionista de control: el capital está repartido entre institucionales (cuatro por encima del 3 %, ninguno del 6 %) [1]. Una acción, un voto; los estatutos limitan la inscripción de nominees al 3 % del capital salvo acuerdo, lo habitual en Suiza, y no hay límite de voto para el accionista directo [1]. No hay cláusulas de exclusión ni de elevación del umbral de OPA (opting-out u opting-up) [1]. Los planes de incentivos de la dirección tienen aceleración en caso de cambio de control [1]. No constan operaciones vinculadas relevantes. Todo el consejo es independiente; la presidencia cambió en abril de 2026 [1, 3].',
    alertas: [
      'Voto en contra del 42,75 % del informe de remuneración en la junta de 2025 (corregido en 2026 con un 94,99 % a favor) [2-4].',
      'Cambio de presidente del consejo en abril de 2026 (Oliver Riemenschneider deja el puesto tras la etapa de escisión) [3, 5].',
      'Las operaciones de directivos en la SIX son anónimas: no hemos podido comprobar compras o ventas de los últimos 12 meses.',
    ],
    confianza: 'Media',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'operaciones de consejeros y directivos de los últimos 12 meses', tipo: 'Complemento', intentos: '1) Web de la empresa (página de operaciones de directivos sin tabla en el HTML); 2) registro de la SIX (operaciones anónimas: solo cargo e importe); 3) prensa suiza (sin noticias de compras o ventas relevantes)', decision: 'Omitido' },
    { seccion: 'gobierno', campo: 'ratio de la remuneración del CEO sobre el coste medio por empleado', tipo: 'Complemento', intentos: '1) Informe de remuneración (no lo publica); 2) gastos de personal del informe anual (no desglosados); 3) cálculo con empleados y gastos (dato de personal no disponible)', decision: 'Omitido' },
  ],
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Yahoo Finance: históricos diarios de ACLN.SW, ^SSMI y EXH4.DE hasta el 14-oct-2026 (rango, volumen, rentabilidades, betas, cierres de ejercicio)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://finance.yahoo.com/quote/ACLN.SW/history/' },
  { id: 2, titulo: 'Accelleron Industries AG: estimaciones anuales 2026-2028 (11 analistas; ventas, EBITDA, EBIT, beneficio, BPA, DPA, deuda neta, capex)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://www.marketscreener.com/quote/stock/ACCELLERON-INDUSTRIES-AG-141526850/finances/' },
  { id: 3, titulo: 'Accelleron Industries AG: consenso («Outperform», 11 analistas, objetivo medio 101,04 USD, máximo 116,27, mínimo 74,55) y cambios de recomendación', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-16', url: 'https://www.marketscreener.com/quote/stock/ACCELLERON-INDUSTRIES-AG-141526850/consensus/' },
  { id: 4, titulo: 'Accelleron: cotizaciones de cinco sesiones en la SIX (cierre del 15-oct-2026 a 68,80 CHF; 366.879 acciones)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://www.marketscreener.com/quote/stock/ACCELLERON-INDUSTRIES-AG-141526850/quotes/' },
  { id: 5, titulo: 'Accelleron Ind N: ficha y AWP Analyser (12 analistas: 4 comprar, 7 neutral, 1 vender; objetivo medio 81,67 CHF, máximo 94, mínimo 62; venta el 29-sep-2026 y neutral el 17-sep-2026)', editor: 'cash.ch', tipo: 'Analistas', fecha: '2026-10-16', url: 'https://www.cash.ch/aktien/accelleron-industries-n-116936091/swx/chf' },
  { id: 6, titulo: 'Yahoo Finance: cuentas, mercado y estimaciones de los comparables, en USD con el cambio del día (16-oct-2026)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://finance.yahoo.com/' },
  { id: 7, titulo: 'Daily Treasury Par Yield Curve Rates: bono a 10 años al 5,10 % (15-oct-2026)', editor: 'U.S. Department of the Treasury', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve' },
  { id: 8, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026: 4,20 % (T12m with sustainable payout)', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 9, titulo: 'Tipos de cambio de referencia del BCE: 15-oct-2026 (1,1208 USD y 0,9305 CHF por EUR) e histórico de fin de año 2022-2025', editor: 'Banco Central Europeo', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml' },
  { id: 10, titulo: 'Transaction report del programa de recompra 2026-2028 (333.396 acciones a 13-oct-2026)', editor: 'Accelleron Industries AG', tipo: 'Primaria', fecha: '2026-10-13', url: AI + 'share-buyback/ACLNE_May_2026_to_date.pdf' },
  { id: 11, titulo: 'Half-Year Report 2026: balance a 30-jun-2026 (deuda, caja, minoritarios, autocartera) y guía 2026', editor: 'Accelleron Industries AG', tipo: 'Primaria', fecha: '2026-08-27', url: AI + 'Accelleron-Half-Year-Report-2026.pdf' },
  { id: 12, titulo: 'Chart Industries, Inc. to Acquire Howden (8-K, Ex. 99.1): 4.400 M USD, 12,9 veces el EBITDA ajustado de 12 meses', editor: 'Chart Industries (SEC)', tipo: 'Primaria', fecha: '2022-11-09', url: 'https://www.sec.gov/Archives/edgar/data/892553/000119312522280686/d411515dex991.htm' },
  { id: 13, titulo: 'Colfax to sell Air & Gas Handling (Howden) to KPS for 1.800 M USD (8-K, Ex. 99.1)', editor: 'Colfax Corporation (SEC)', tipo: 'Primaria', fecha: '2019-05-16', url: 'https://www.sec.gov/Archives/edgar/data/1420800/000119312519150551/d746282dex991.htm' },
  { id: 14, titulo: 'Baker Hughes to Acquire Chart Industries: valor empresa 13.600 M USD, ~9 veces el EBITDA 2025e con sinergias (8-K, Ex. 99.2)', editor: 'Baker Hughes (SEC)', tipo: 'Primaria', fecha: '2025-07-29', url: 'https://www.sec.gov/Archives/edgar/data/1701605/000119312525167118/d912206dex992.htm' },
  { id: 15, titulo: 'Annual Report 2023: compra de OMT por 106,6 M USD (sin múltiplo publicado)', editor: 'Accelleron Industries AG', tipo: 'Primaria', fecha: '2024-03', url: AI + 'accelleron-industries-annual-report-2023-financal-reporting.pdf' },
  { id: 16, titulo: 'Accelleron-Aktien nach Zahlen und Prognosenerhöhung im Aufwind (27-ago-2026; UBS, Vontobel y ZKB sobre el 1S26)', editor: 'Vermögenszentrum (AWP)', tipo: 'Prensa', fecha: '2026-08-27', url: 'https://www.vermoegenszentrum.ch/boersen-und-maerkte/news/accelleron-aktien-nach-zahlen-und-prognosenerhoehung-im-aufwind' },
  { id: 17, titulo: 'Corporate calendar: Annual Report 2026 el 17-mar-2027; junta el 27-abr-2027', editor: 'Accelleron Industries AG', tipo: 'Primaria', fecha: '2026-10-16', url: 'https://accelleron.com/investors/corporate-calendar' },
  { id: 18, titulo: 'Annual Report 2025: datos por acción (cierre de 2025 a 61,55 CHF; 93.901.241 acciones en circulación; capitalización de 5.780 M CHF)', editor: 'Accelleron Industries AG', tipo: 'Primaria', fecha: '2026-03-12', url: AI + 'accelleron-annual-report-2025.pdf' },
];
const comps = JSON.parse(fs.readFileSync(path.join(dir, 'comparables-yahoo.json'), 'utf8')).empresas
  .filter((e) => !e.nombre.startsWith('Accelleron'))
  .map(({ _control, ...e }) => {
    if (e.ticker === 'RR.L') return { ...e, per_ntm: r1(_control.precio / 100 / _control.eps_next), roic_pct: null };
    return e;
  });
const D = {
  _estado: 'completa',
  identificacion: {
    nombre: 'Accelleron Industries AG', nombre_corto: 'Accelleron', ticker: 'ACLN', isin: 'CH1169360919', mercado: 'SIX Swiss Exchange', indice_referencia: 'SMI (SMIM)',
    pais: 'Suiza', pais_iso: 'CH', sector: 'Industria', industria: 'Maquinaria industrial (turbocompresores)', sede: 'Baden (Suiza)', fundacion: '1924', empleados: 3219, web: 'https://accelleron.com',
    precio: 82.87, fecha_precio: '2026-10-15', acciones: 93.71, capitalizacion_publicada: null, free_float_pct: 99.2,
    max_52s: 109.01, min_52s: 73.11, volumen_medio_diario: '≈ 15,6 M CHF/día (3 meses; 209.524 acciones)', proximos_resultados: '2027-03-17',
  },
  consenso: {
    guidance: 'Guía 2026 dada el 12-mar-2026 y elevada el 27-ago-2026: crecimiento orgánico de las ventas del 14-17 % (antes 9-14 %) y margen de Operational EBITA del 25-26 % (confirmado) [11]. Capex de ~5-6 % de las ventas en 2026 [11]. No hay plan a medio plazo vigente: el de 2022 (crecimiento orgánico del 2-4 % y margen del 23-26 %) quedó superado y la empresa no ha publicado otro [2, 11].',
    estimaciones: [
      { periodo: '2026e', ingresos: 1500.0, ebitda: 427.5, ebit: 382.7, bpa: 3.13, dpa: 2.14, fuente: 'MarketScreener, 11 analistas [2]' },
      { periodo: '2027e', ingresos: 1671.0, ebitda: 480.9, ebit: 426.9, bpa: 3.55, dpa: 2.38, fuente: 'MarketScreener [2]' },
      { periodo: '2028e', ingresos: 1804.0, ebitda: 524.7, ebit: 458.6, bpa: 3.90, dpa: 2.69, fuente: 'MarketScreener [2]' },
    ],
    recomendaciones: { n_analistas: 12, comprar: 4, mantener: 7, vender: 1, po_medio: 98.37, po_min: 74.68, po_max: 113.22 },
    revisiones: 'MarketScreener (11 analistas) da el consenso completo en USD; cash.ch (AWP, 12 analistas) da el reparto y los objetivos en francos: 4 comprar, 7 neutral y 1 vender, objetivo medio de 81,67 CHF (98,37 USD), entre 62 y 94 CHF [2, 3, 5]. Tras los resultados de agosto las estimaciones de ventas subieron con la guía (UBS anticipaba revisiones al alza) [16], pero desde el 1-sep-2026 cash.ch marca una tendencia negativa de los analistas, con un paso a «vender» el 29-sep y otro a «neutral» el 17-sep, y BPA esperados algo menores que siete semanas antes [5]. El objetivo medio en dólares de MarketScreener (101,04 USD) es más alto que el de AWP en francos convertidos: son muestras distintas [3, 5].',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  multiplos_historicos: {
    serie: [
      { anio: '2022', precio_cierre: 20.74, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2023', precio_cierre: 31.34, ev_ebitda_ntm: null, per_ntm: null, excluir: true },
      { anio: '2024', precio_cierre: 51.55, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2025', precio_cierre: 77.65, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
    ],
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Diez cotizadas de equipos para motores, barcos y energía con negocio de servicio: Wärtsilä (motores marinos y de generación, cliente y rival en servicio), Burckhardt (compresores para barcos y gas, mismo modelo de base instalada), Garrett Motion (único fabricante puro de turbos cotizado, pero de automóvil), Cummins y Caterpillar (motores de generación para centros de datos), Rolls-Royce (motores de avión y mtu), IHI (turbos y maquinaria), Alfa Laval (equipos marinos), Atlas Copco y Sulzer (máquinas rotativas con servicio). MAN/Everllence, Mitsubishi Heavy (diversificada) y Napier no cotizan aparte. Cifras de Yahoo del 16-oct-2026 en USD [6]; el PER de Rolls-Royce se corrige de peniques a libras y su ROIC se omite (patrimonio negativo).',
    empresas: comps,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2022-11', objetivo: 'Howden (compresores y ventiladores de proceso con servicio)', comprador: 'Chart Industries', ev: 4400, ev_ventas: null, ev_ebitda: 12.9, prima_pct: null, excluir: false, comentario: 'EBITDA ajustado de 12 meses a ago-2022; 8,5 veces con 175 M USD de sinergias [12].' },
      { fecha: '2019-05', objetivo: 'Howden (Air & Gas Handling de Colfax)', comprador: 'KPS Capital Partners', ev: 1800, ev_ventas: null, ev_ebitda: 9.0, prima_pct: null, excluir: false, comentario: 'Estimación propia: 1.800 M USD entre ~200 M de EBITDA ajustado de 12 meses publicado por Colfax [13].' },
      { fecha: '2025-07', objetivo: 'Chart Industries (equipos criogénicos y compresores)', comprador: 'Baker Hughes', ev: 13600, ev_ventas: null, ev_ebitda: 9.0, prima_pct: null, excluir: false, comentario: '~9 veces el EBITDA 2025e con 325 M USD de sinergias de costes [14].' },
      { fecha: '2023-07', objetivo: 'OMT (inyección de combustible para motores marinos)', comprador: 'Accelleron', ev: 106.6, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Precio con 6,2 M de pago aplazado; múltiplo no publicado [15].' },
    ],
    confianza: 'Baja',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'comparables', campo: 'EV/EBITDA de los próximos 12 meses de los comparables', tipo: 'Complemento', intentos: '1) Yahoo (no da EBITDA estimado); 2) MarketScreener (de pago por comparable); 3) fichas sectoriales del repo (sin turbocompresores)', decision: 'Omitido' },
    { seccion: 'transacciones', campo: 'compras de fabricantes de turbocompresores con múltiplo', tipo: 'Complemento', intentos: '1) Informes de Accelleron (OMT y OMC2 sin múltiplo); 2) prensa (no hay ventas de turbos grandes desde la escisión); 3) operaciones de equipos con servicio (Howden, Chart), usadas como aproximación', decision: 'Calculado y marcado como estimación' },
    { seccion: 'bolsa', campo: 'posición corta', tipo: 'Complemento', intentos: '1) SIX (Suiza no publica registro de cortos); 2) Stock Analysis (sin dato para la SIX); 3) prensa (sin dato)', decision: 'Omitido' },
  ],
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Accelleron-Aktien nach Zahlen und Prognosenerhöhung im Aufwind (comentarios de UBS, Vontobel y ZKB)', editor: 'Vermögenszentrum (AWP)', tipo: 'Foros y redes', fecha: '2026-08-27', url: 'https://www.vermoegenszentrum.ch/boersen-und-maerkte/news/accelleron-aktien-nach-zahlen-und-prognosenerhoehung-im-aufwind' },
  { id: 2, titulo: 'Ficha de Accelleron con tendencia de los analistas (AWP Analyser) y titulares de septiembre-octubre de 2026', editor: 'cash.ch', tipo: 'Foros y redes', fecha: '2026-10-16', url: 'https://www.cash.ch/aktien/accelleron-industries-n-116936091/swx/chf' },
  { id: 3, titulo: 'Accelleron Executing At A High Level, And Priced Accordingly', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2025-11-20', url: 'https://seekingalpha.com/article/4845978-accelleron-executing-at-a-high-level-and-priced-accordingly' },
  { id: 4, titulo: 'Narrativa de inversores «Digitalization and decarbonization will open global marine markets»', editor: 'Simply Wall St', tipo: 'Foros y redes', fecha: '2026', url: 'https://www.simplywall.st/narratives/rwzvfk88-digitalization-and-decarbonization-will-open-global-marine-markets-na5j' },
  { id: 5, titulo: 'Accelleron Industries: debate y valoraciones de la comunidad', editor: 'getquin', tipo: 'Foros y redes', fecha: '2026-10', url: 'https://app.getquin.com/de/aktie/CH1169360919/accelleron-industries' },
];
const E = {
  _estado: 'completa',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Empeora',
    revisadas: [
      { plataforma: 'Vermögenszentrum / AWP (prensa con analistas)', fecha: '2026-08', n_comentarios: 0, tono: 'Positivo', resumen: 'Tras el 1S26, UBS ve revisiones al alza, ZKB mantiene intacta la perspectiva a medio plazo y Vontobel avisa de que el consenso ya estaba en la parte alta [1].' },
      { plataforma: 'cash.ch (ficha y titulares)', fecha: '2026-10', n_comentarios: 0, tono: 'Negativo', resumen: 'Tendencia negativa de los analistas desde el 1-sep, con una recomendación de venta el 29-sep en un artículo titulado como «ruptura de un tabú» con un valor estrella de la bolsa suiza [2].' },
      { plataforma: 'Seeking Alpha (artículo de análisis)', fecha: '2025-11', n_comentarios: 0, tono: 'Neutro', resumen: 'Reconoce la ejecución pero ve la acción «al precio que toca» (artículo de fuera de la ventana de tres meses: solo contexto) [3].' },
      { plataforma: 'Simply Wall St y getquin (comunidad)', fecha: '2026-10', n_comentarios: 10, tono: 'Dividido', resumen: 'La comunidad discute la descarbonización naval y los centros de datos como motores frente a una valoración exigente; poco debate y sin datos nuevos [4, 5].' },
    ],
    temas: [
      { tema: 'Centros de datos como nuevo motor', postura: 'Alcista', peso: 'Alto', contraste: 'Cierto pero acotado: algo menos del 9 % de las ventas en el 1S26 y la propia empresa dice que el ritmo y la duración son inciertos [1, 2].' },
      { tema: 'Valoración exigente tras triplicar desde la salida a bolsa', postura: 'Bajista', peso: 'Alto', contraste: 'Coincide con nuestro DCF y con un PER adelantado de unas 24 veces frente a una mediana histórica corta de ~21 [2, 3].' },
      { tema: 'Supercycle naval y su final', postura: 'Dividida', peso: 'Medio', contraste: 'Las entregas de 2027-2028 serán récord; el riesgo es lo que venga después, cuando el producto nuevo pesa más que nunca [1, 4].' },
    ],
    lectura: 'Hay muy poco debate de particulares: no encontramos hilos activos en Reddit, Stocktwits o foros suizos; lo que circula son artículos de prensa con analistas y comunidades con pocos mensajes [2, 4, 5]. El tono ha pasado de positivo en agosto a negativo desde septiembre, con la primera recomendación de venta y una caída del 15 % desde el 27-ago, sin un dato nuevo de la empresa [1, 2]. No es capitulación: el precio sigue un 13 % por encima de su mínimo de 52 semanas. Para la decisión, el sentimiento confirma la duda sobre la valoración pero no añade un riesgo que el informe no recoja.',
    confianza: 'Baja',
  },
  fuentes: fE,
  huecos: [],
};
guarda('E', E);
console.log('Notas A-E escritas');
