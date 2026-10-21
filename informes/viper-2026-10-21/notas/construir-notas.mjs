// Escribe las notas A-E de Viper Energy (VNOM, corte 2026-10-21) a partir de los documentos de notas/docs (EDGAR: 10-K 2020,
// 2022, 2024 y 2025 de los dos CIK de Viper, 10-Q del 2T26, notas de resultados 3T24-2T26, 8-K de 2025-2026, proxy 2026,
// Form 4), del XBRL de la SEC (cuentas-xbrl.json y xbrl-antiguo/), de bolsa.json, de yahoo-datos.json (Yahoo, 21-oct-2026)
// y de la EIA (STEO de octubre de 2026). Cada nota cita solo con [n] de su propia lista de fuentes.
// Ejecutar: node informes/viper-2026-10-21/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const lee = (f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const r1 = (x) => (x == null ? null : Math.round(x * 10) / 10);
const r2 = (x) => (x == null ? null : Math.round(x * 100) / 100);
const B = lee('bolsa.json');
const Y = lee('yahoo-datos.json');
const NUEVO = 'https://www.sec.gov/Archives/edgar/data/2074176';
const VIEJO = 'https://www.sec.gov/Archives/edgar/data/1602065';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Form 10-K 2025 de Viper Energy, Inc. (cuentas 2023-2025, reservas, Sitio, desinversión no pérmica, deuda, Diamondback, riesgos)', editor: 'Viper Energy, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-02-25', url: `${NUEVO}/000207417626000010/vnom-20251231.htm` },
  { id: 2, titulo: 'Form 10-K 2022 de Viper Energy Partners LP (cuentas 2020-2022, distribuciones, Diamondback)', editor: 'Viper Energy Partners LP (SEC)', tipo: 'Primaria', fecha: '2023-02-23', url: `${VIEJO}/000160206523000007/vnom-20221231.htm` },
  { id: 3, titulo: 'Form 10-K 2024 de Viper Energy, Inc. (balance 2023-2024, dividendos 2022-2024)', editor: 'Viper Energy, Inc. (SEC)', tipo: 'Primaria', fecha: '2025-02-26', url: `${VIEJO}/000160206525000010/vnom-20241231.htm` },
  { id: 4, titulo: 'Form 10-Q del 2T26 (30-jun-2026): accionariado de OpCo, Riverbend, recompras, deuda', editor: 'Viper Energy, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-08-05', url: `${NUEVO}/000207417626000053/vnom-20260630.htm` },
  { id: 5, titulo: 'Viper Energy reports second quarter 2026 results; increases base dividend (cuentas, CAD, guía, coberturas, pozos)', editor: 'Viper Energy, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-08-03', url: `${NUEVO}/000207417626000050/viperex991-8x3x26.htm` },
  { id: 6, titulo: 'Notas de resultados del 1T26 y del 4T25 (guía 2026, dividendos, BPA ajustado)', editor: 'Viper Energy, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-05-04', url: `${NUEVO}/000207417626000025/viperex991-5x4x26.htm` },
  { id: 7, titulo: 'Notas de resultados del 3T24, 4T24, 1T25, 2T25 y 3T25 (trimestres, EBITDA ajustado, deterioros)', editor: 'Viper Energy, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2025-11-03', url: `${NUEVO}/000207417625000048/viperex991-11x3x25.htm` },
  { id: 8, titulo: 'XBRL company facts de Viper Energy (CIK 2074176 y CIK 1602065)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0002074176.json' },
  { id: 9, titulo: 'Form 8-K: recompra de 1 M de OpCo Units a Kimmeridge (40,65 USD) y programa de recompras', editor: 'Viper Energy, Inc. (SEC)', tipo: 'Primaria', fecha: '2025-12-12', url: `${NUEVO}/000110465925120446/tm2533341d1_8k.htm` },
  { id: 10, titulo: 'Form 8-K: cierre de la compra a Diamondback de 933 acres netos de regalía por 3.815.459 OpCo Units (1-sep-2026)', editor: 'Viper Energy, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-09-08', url: `${NUEVO}/000110465926105890/tm2624863d1_8k.htm` },
  { id: 11, titulo: 'Form 8-K: modificación del crédito revolving (2.000 M USD, vencimiento 2031)', editor: 'Viper Energy, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-06-15', url: `${NUEVO}/000110465926074042/tm2617785d1_8k.htm` },
];
const cuenta = [
  { periodo: '2021', ingresos: 504.9, coste_ventas: 32.6, gastos_generales: 7.8, ebitda: 464.6, amortizaciones: 103.0, ebit: 361.6, resultado_financiero: -103.4, bai: 258.2, impuestos: 1.5, minoritarios: 198.7, beneficio_neto: 57.9, gastos_financieros: 34.0, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 0.85, dpa: 1.43, dpa_extraordinario: 0, acciones_diluidas: 68.4 },
  { periodo: '2022', ingresos: 866.5, coste_ventas: 56.4, gastos_generales: 8.5, ebitda: 801.6, amortizaciones: 121.1, ebit: 680.5, resultado_financiero: -58.1, bai: 622.4, impuestos: -32.7, minoritarios: 503.3, beneficio_neto: 151.7, gastos_financieros: 40.4, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 2.00, dpa: 2.46, dpa_extraordinario: 0, acciones_diluidas: 75.7 },
  { periodo: '2023', ingresos: 827.7, coste_ventas: 50.0, gastos_generales: 11.0, ebitda: 766.3, amortizaciones: 146.1, ebit: 620.2, resultado_financiero: -72.9, bai: 547.3, impuestos: 46.0, minoritarios: 301.3, beneficio_neto: 200.1, gastos_financieros: 47.0, participadas_en_ebitda: null, no_recurrentes_en_ebitda: -108, bpa: 2.69, dpa: 1.82, dpa_extraordinario: 0, acciones_diluidas: 74.2 },
  { periodo: '2024', ingresos: 860.4, coste_ventas: 61.0, gastos_generales: 19.0, ebitda: 780.8, amortizaciones: 214.4, ebit: 566.4, resultado_financiero: -62.5, bai: 503.9, impuestos: -99.7, minoritarios: 244.4, beneficio_neto: 359.2, gastos_financieros: 74.0, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 3.82, dpa: 2.49, dpa_extraordinario: 0, acciones_diluidas: 93.9 },
  { periodo: '2025', ingresos: 1395, coste_ventas: 94, gastos_generales: 35, ebitda: 467, amortizaciones: 607, ebit: -140, resultado_financiero: -85, bai: -225, impuestos: -19, minoritarios: -138, beneficio_neto: -68, gastos_financieros: 96, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 768, bpa: -0.48, dpa: 2.20, dpa_extraordinario: 0, acciones_diluidas: 142.5 },
];
const balance = [
  { periodo: '2021', activo_total: 3034.0, activo_corriente: 111.1, pasivo_corriente: 24.5, pasivo_total: 801.2, fondo_comercio: 0, intangibles: 0, inmovilizado_material: 2920.1, existencias: 0, clientes: 70.7, proveedores: 0.1, activos_contrato: null, pasivos_contrato: null, caja: 39.4, deuda_financiera: 776.7, arrendamientos: 0, patrimonio_neto: 814.8, minoritarios: 1418.0, reservas: null },
  { periodo: '2022', activo_total: 2920.4, activo_corriente: 118.6, pasivo_corriente: 21.9, pasivo_total: 598.8, fondo_comercio: 0, intangibles: 0, inmovilizado_material: 2750.3, existencias: 0, clientes: 87.9, proveedores: 1.4, activos_contrato: null, pasivos_contrato: null, caja: 18.2, deuda_financiera: 576.9, arrendamientos: 0, patrimonio_neto: 690.7, minoritarios: 1630.9, reservas: null },
  { periodo: '2023', activo_total: 3974, activo_corriente: 144, pasivo_corriente: 33.3, pasivo_total: 1117, fondo_comercio: 0, intangibles: 0, inmovilizado_material: 3768, existencias: 0, clientes: 112.0, proveedores: 0, activos_contrato: null, pasivos_contrato: null, caja: 25.9, deuda_financiera: 1083, arrendamientos: 0, patrimonio_neto: 1014, minoritarios: 1843, reservas: -16.8 },
  { periodo: '2024', activo_total: 5069, activo_corriente: 238, pasivo_corriente: 49, pasivo_total: 1162, fondo_comercio: 0, intangibles: 0, inmovilizado_material: 4638, existencias: 0, clientes: 180, proveedores: 0, activos_contrato: null, pasivos_contrato: null, caja: 27, deuda_financiera: 1083, arrendamientos: 0, patrimonio_neto: 1687, minoritarios: 2220, reservas: 118 },
  { periodo: '2025', activo_total: 12671, activo_corriente: 413, pasivo_corriente: 111, pasivo_total: 2308, fondo_comercio: 0, intangibles: 0, inmovilizado_material: 12209, existencias: 0, clientes: 350, proveedores: 0, activos_contrato: null, pasivos_contrato: null, caja: 13, deuda_financiera: 2186, arrendamientos: 0, patrimonio_neto: 4448, minoritarios: 5915, reservas: -278 },
];
// Dividendos = a accionistas de la clase A + a Diamondback + a otros minoritarios de OpCo (todo sale de la caja consolidada).
const flujos = [
  { periodo: '2021', flujo_operativo: 307.1, capex: 0, pagos_arrendamientos: 0, adquisiciones: 281.2, desinversiones: 0, dividendos: 176.6, recompras: 46.0, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: '2022', flujo_operativo: 699.8, capex: 0, pagos_arrendamientos: 0, adquisiciones: 62.9, desinversiones: 111.7, dividendos: 417.0, recompras: 150.6, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: '2023', flujo_operativo: 638, capex: 0, pagos_arrendamientos: 0, adquisiciones: 905, desinversiones: 0, dividendos: 325, recompras: 95.2, emision_acciones: 200, intereses_en_financiacion: 0 },
  { periodo: '2024', flujo_operativo: 620, capex: 0, pagos_arrendamientos: 0, adquisiciones: 696, desinversiones: 88, dividendos: 481, recompras: 0, emision_acciones: 476, intereses_en_financiacion: 0 },
  { periodo: '2025', flujo_operativo: 1053, capex: 0, pagos_arrendamientos: 0, adquisiciones: 2424, desinversiones: 0, dividendos: 745, recompras: 194, emision_acciones: 1232, intereses_en_financiacion: 0 },
];
const trim = (p, ing, g, ebitda, bpa) => ({ periodo: p, ingresos: ing, crecimiento_pct: g, crecimiento_organico_pct: null, ebitda, margen_ebitda_pct: r2(ebitda / ing * 100), bpa, vs_consenso: null });
const A = {
  _estado: 'Completa. Cuentas 2021-2025 de los 10-K (2020-2022 del CIK antiguo de Viper Energy Partners LP; 2023-2025 del 10-K 2025 de la nueva Viper tras Sitio), contrastadas con el XBRL de la SEC. Consolidado al 100 % (OpCo); el beneficio neto y el BPA son los de la clase A. Deterioro de techo del método de coste completo (full cost) de 2025 (768 M) en no recurrentes; bono de arrendamiento de Diamondback de 2023 (108 M, puntual) restado como no recurrente con signo negativo.',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 2041, ebitda: 1068, ebit: 251, beneficio_neto: 59, bpa: 0.14, dpa: 2.45, dpa_extraordinario: 0.45, fcf: 1495, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 768 },
    cambios_perimetro: [
      { periodo: '2025', descripcion: 'Compra a Diamondback de 1979 Royalties (1-may-2025: 873 M en caja + 69,6 M de OpCo Units) y compra de Sitio Royalties (19-ago-2025, toda en acciones, ≈ 4.000 M con deuda): la cuenta de 2025 solo recoge 8 y 4,5 meses; el balance de cierre, todo [A1]' },
      { periodo: '2024', descripcion: 'Compra de TWR IV (oct-2024) y otras compras de derechos (696 M en caja) [A3]' },
      { periodo: '2023', descripcion: 'Compra de derechos de GRP Energy Capital (nov-2023; 905 M en caja en el año) [A3]' },
    ],
    comentario: 'Los ingresos pasan de 505 M en 2021 a 1.395 M en 2025 y a 2.041 M en los doce meses a junio de 2026 [A1, A2, A5], casi todo por compras: la producción media de petróleo era de 27.156 bo/d en 2024 y 65.077 bo/d en el 2T26 [A5, A6]. El precio también pesa: el petróleo realizado fue de 75,48 USD/bbl en 2024, ≈ 64 en 2025 y 98,28 en el 2T26 por el cierre de Ormuz [A5, A7]. El margen EBITDA ronda el 91-93 % todos los años porque Viper no paga pozos ni costes de operación: solo impuestos de producción (≈ 7 % de los ingresos) y gastos generales (0,65-0,94 USD/boe en caja) [A5]. Lo que sí sube es la amortización por agotamiento (depletion): de 10,20 USD/boe en 2023 a 15,95-17,51 en 2026 [A5, A7], porque las compras entran en el balance a valor razonable; por eso el BPA crece menos que el EBITDA. 2025 no es comparable: deterioro de techo de 768 M (método de coste completo, con el petróleo a ≈ 65 USD) y 32 M de pérdida por amortización anticipada de bonos [A1].',
    ajustes: 'Cifras publicadas. Ajustes: (1) 2025: deterioro de techo de 360 M en el 3T25 y 408 M en el 4T25 (no caja, por la caída del precio medio de 12 meses de la SEC), en no recurrentes [A1, A7]; (2) 2023: 108 M de bono de arrendamiento pagado por Diamondback, puntual [A3]; (3) 2024: el beneficio neto (359 M) incluye un ingreso fiscal de 99,7 M por la liberación de una provisión de activos fiscales diferidos, que infla el BPA (3,82 USD) [A1]; (4) la empresa publica un «beneficio neto ajustado» que quita las coberturas no realizadas y el deterioro (2T26: 1,78 USD consolidado por acción de clase A, 0,76 USD atribuible) [A5]. El BPA publicado es el de la clase A (beneficio atribuible ÷ acciones A); el beneficio de OpCo que corresponde a las clases B va a minoritarios.',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      trim('3T24', 209.6, -28.5, 191.0, 0.52),
      trim('4T24', 228.7, 11.7, 207.9, 2.04),
      trim('1T25', 245, 19.5, 232, 0.62),
      trim('2T25', 297, 37.5, 274, 0.28),
      trim('3T25', 418, 99.4, 393, -0.52),
      trim('4T25', 435, 90.2, 403, -0.61),
      trim('1T26', 511, 108.6, 485, 0.53),
      trim('2T26', 677, 127.9, 642, 0.73),
    ],
    ultima_presentacion: 'En el 2T26 (3-ago-2026) la dirección subió la guía de producción de 2026 a 66.000-67.250 bo/d (antes 64.500-66.500 sin Riverbend) y dio 67.500-68.500 bo/d para el 3T26 [A5]. El mensaje cambió respecto al 1T26: Viper sube el dividendo base un 32 %, a 2,00 USD anuales por acción de clase A («protegido hasta ≈ 30 USD/bbl»), y abandona el compromiso de devolver cada trimestre al menos el 75 % de la caja disponible; la caja retenida irá a recompras «oportunistas», deuda y compras [A5]. En el 1T26 el énfasis estaba en Riverbend (≈ 339 M en caja + 3,69 M de acciones) y en recomprar acciones por debajo de su valor [A4, A6]. En el 2T26 el realizado del petróleo fue de 98,28 USD/bbl frente a 73,16 en el 1T26 y 63,64 un año antes [A5]. Sobre el ritmo de Diamondback: 146 de los 691 pozos brutos puestos en producción en el 2T26 eran suyos (7,0 % de regalía media) y 12 de los 106 equipos que perforaban en las tierras de Viper [A5]. No tenemos la transcripción de la conferencia: lo que preguntaron los analistas no está en las fuentes primarias leídas.',
    confianza: 'Media',
  },
  balance: {
    historico: balance,
    vencimientos: [{ anio: '2030', importe: 500 }, { anio: '2031', importe: 95 }, { anio: '2035', importe: 1100 }],
    liquidez: 'Caja de 77 M y ≈ 1.900 M disponibles del crédito revolving de 2.000 M (vence en junio de 2031), ≈ 2.000 M de liquidez total a 30-jun-2026 [A5, A11]',
    rating: 'BBB- (S&P, perspectiva positiva desde sep-2026), BBB- (Fitch), Ba1 (Moody\'s) [A1]',
    coste_deuda_pct: 5.6,
    vida_media_anios: 6.8,
    otros_pasivos: 'Sin pensiones, sin arrendamientos relevantes ni factoring: Viper no tiene empleados (Diamondback le presta el personal) ni pozos que operar [A1]. Deuda a 30-jun-2026: 500 M de bonos al 4,900 % 2030, 1.100 M al 5,700 % 2035 y 95 M del revolving [A5]. El crédito tiene compromisos de apalancamiento con mucha holgura (deuda neta ≈ 0,7 veces el EBITDA de los últimos doce meses) [A1, A5]. Hechos posteriores al balance: Riverbend se pagó el 1-jul-2026 con ≈ 314 M de caja nueva (339 M menos 25 M que ya estaban en depósito) más 3,69 M de acciones A, y se recompraron 29 M de acciones en julio [A4, A5]. La compra a Diamondback de 933 acres netos (1-sep-2026) se pagó con 3,82 M de OpCo Units, sin caja [A10]. TWR IV tiene una opción sobre 6,75 M de acciones B ligadas a sus OpCo Units [A4].',
    comentario: 'La deuda bruta pasó de 1.083 M a 2.186 M en 2025 por la compra de 1979 Royalties y la deuda que se retiró de Sitio; bajó a 1.695 M en junio de 2026 con los 617 M de la venta de los activos fuera del Pérmico (9-feb-2026) [A1, A5]. Con un EBITDA de ≈ 2.000 M anuales al precio de 2026, el apalancamiento es bajo (≈ 0,8 veces) y la agencia S&P puso la nota en perspectiva positiva [A1]. El circulante es casi todo cuentas a cobrar por regalías (488 M en junio: 2,2 meses de ingresos), que suben y bajan con el precio del petróleo [A5].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'La conversión en caja es muy alta: flujo operativo de 1.053 M en 2025 frente a un EBITDA ajustado consolidado de 1.302 M (81 %, por intereses e impuestos) y 815 M en el 1S26 [A1, A5, A6]. No hay capex de mantenimiento: los operadores pagan la perforación [A1]. El «capex» real de Viper son las compras de derechos: 905 M en 2023, 696 M en 2024 y 2.424 M en caja en 2025 (más acciones por Sitio y OpCo Units por las compras a Diamondback) [A1, A3]. Sin compras, la producción de una regalía cae a medida que se agota cada pozo; la mantienen los pozos nuevos que perforan Diamondback y los demás operadores en sus tierras (1.798 pozos en desarrollo y 1.589 a la vista a 1-jul-2026) [A5]. Dividendos en la tabla = a la clase A más las distribuciones de OpCo a Diamondback y a otros socios (745 M en 2025).',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'Grant Thornton LLP', anios_auditor: 13, opinion: 'Favorable (con asunto crítico de auditoría: estimación de reservas para el agotamiento, el deterioro y la valoración de Sitio)',
    comentario: 'Método de coste completo (full cost): todas las compras van a un único fondo que se amortiza por unidades producidas sobre las reservas probadas y se prueba cada trimestre contra el valor de esas reservas a precios de la SEC (media de 12 meses), descontadas al 10 % [A1]. Con el petróleo de 2025 (≈ 65 USD) el techo saltó y hubo 768 M de deterioro; con el de 2026, más alto, no se espera otro [A1, A5]. Las reservas las prepara el personal de Diamondback y las audita Ryder Scott (100 %) [A1]. Los pagos en acciones son pequeños (0,25 USD/boe en el 2T26) [A5]. La partida que más distorsiona es fiscal: Viper paga impuestos solo por su parte de OpCo y su base fiscal es inferior a la contable, así que el tipo en caja es del 27-30 % del beneficio antes de impuestos atribuible [A5]. Lectura de los indicadores del motor: Altman y Piotroski salen distorsionados por el deterioro de 2025 y por el salto de balance de Sitio; el Beneish puede marcar crecimiento de ventas por las compras, no por manipulación.',
    senales: [
      { senal: 'Reservas estimadas por personal de la matriz', nivel: 'Media', comentario: 'Las prepara Diamondback y las audita Ryder Scott; afectan al agotamiento y al deterioro [A1].' },
      { senal: 'Deterioros de techo recurrentes en precios bajos', nivel: 'Media', comentario: '69 M en 2020 y 768 M en 2025 [A1, A2]: el beneficio contable cae justo cuando cae el petróleo.' },
      { senal: 'Ingresos y bonos de partes vinculadas', nivel: 'Baja', comentario: '108 M de bono de Diamondback en 2023 y 24 M en 2025, aprobados por el comité de auditoría [A1].' },
    ],
    confianza: 'Media',
  },
  capital: {
    politica: 'Hasta el dividendo del 2T26, Viper repartía al menos el 75 % de la caja disponible (dividendo base + variable + recompras) [A5]. Desde el 3T26 paga un dividendo base de 2,00 USD anuales por acción A (0,50 trimestral), un 32 % más, y deja de comprometer el variable; la caja sobrante irá a recompras, deuda y compras [A5]. Programa de recompras ampliado a 1.750 M el 18-feb-2026, con ≈ 984 M disponibles a 31-jul-2026; desde 2020 ha recomprado 24,3 M de acciones a 31,50 USD de media [A4, A5]. También recompra OpCo Units a socios que salen (Kimmeridge a 40,65 USD; Oaktree, 1 M a 45,90 USD) [A9, A4].',
    adquisiciones: [
      { anio: '2026', objetivo: 'Derechos de Diamondback (933 acres netos)', importe: 160, ev_ebitda: null, financiacion: '3.815.459 OpCo Units (≈ 160 M al precio de agosto, estimación propia)', resultado: 'Cerrada el 1-sep-2026 [A10].' },
      { anio: '2026', objetivo: 'Riverbend Oil & Gas IX (2.772 acres netos, ≈ 2.000 bo/d)', importe: 505, ev_ebitda: null, financiacion: '≈ 339 M en caja + 3,69 M de acciones A', resultado: 'Cerrada el 1-jul-2026; añade ≈ 1.000 bo/d a la guía de 2026 [A4].' },
      { anio: '2026', objetivo: 'Venta de los activos fuera del Pérmico (9.400 acres netos, 4.750 bo/d)', importe: -617, ev_ebitda: null, financiacion: 'Cobro en caja', resultado: 'Cerrada el 9-feb-2026; reduce deuda [A1].' },
      { anio: '2025', objetivo: 'Sitio Royalties (34.300 acres netos)', importe: 4000, ev_ebitda: 7.1, financiacion: 'Toda en acciones; retiro de ≈ 1.200 M de deuda neta de Sitio', resultado: 'Cerrada el 19-ago-2025; seis meses después se vendió la parte no pérmica. Deterioro de techo de 768 M en 2025 en el fondo común [A1].' },
      { anio: '2025', objetivo: '1979 Royalties de Diamondback-Endeavor (24.446 acres netos, 69 % operados por Diamondback)', importe: 4450, ev_ebitda: null, financiacion: '873 M en caja + 69,6 M de OpCo Units', resultado: 'Cerrada el 1-may-2025; triplica el peso de Diamondback como operador [A1].' },
      { anio: '2024', objetivo: 'TWR IV y otras compras', importe: 696, ev_ebitda: null, financiacion: 'Caja y OpCo Units', resultado: 'Integradas [A3].' },
      { anio: '2023', objetivo: 'GRP Energy Capital (derechos en el Pérmico)', importe: 905, ev_ebitda: null, financiacion: 'Caja, deuda y emisión de 200 M a Diamondback', resultado: 'Integradas [A3].' },
    ],
    comentario: 'Viper crece comprando: 9.000 M en compras desde 2023 frente a un capital invertido de 12.200 M [A1]. Lo hace pagando en parte con acciones (Sitio, Riverbend) y OpCo Units a Diamondback: las clases A+B pasaron de ≈ 165 M en 2023 a ≈ 370 M hoy [A1, A4, A10]. El BPA de la clase A no ha subido con ello (2,69 USD en 2023; 1,27 en el 1S26) [A1, A5]. La prueba de que crean valor por acción es la producción de petróleo por acción, que la empresa dice que sube; con el balance a valor razonable, el rendimiento contable del capital ha caído. Las recompras se hacen cerca de 45 USD, el precio de la colocación de Diamondback de marzo [A4].',
    confianza: 'Media',
  },
  negocio: {
    segmentos: [
      { nombre: 'Petróleo', descripcion: 'Regalías sobre el petróleo producido en sus tierras', tipo_resultado: null, historico: [{ periodo: '2023', ingresos: 619, resultado: null }, { periodo: '2024', ingresos: 750, resultado: null }, { periodo: '2025', ingresos: 1131, resultado: null }] },
      { nombre: 'Líquidos del gas (NGL)', descripcion: 'Regalías sobre etano, propano y otros líquidos', tipo_resultado: null, historico: [{ periodo: '2023', ingresos: 67, resultado: null }, { periodo: '2024', ingresos: 89, resultado: null }, { periodo: '2025', ingresos: 159, resultado: null }] },
      { nombre: 'Gas natural', descripcion: 'Regalías sobre gas (precio de Waha muy bajo)', tipo_resultado: null, historico: [{ periodo: '2023', ingresos: 31, resultado: null }, { periodo: '2024', ingresos: 15, resultado: null }, { periodo: '2025', ingresos: 56, resultado: null }] },
      { nombre: 'Bonos de arrendamiento y otros', descripcion: 'Pagos por arrendar tierras a operadores (puntuales)', tipo_resultado: null, historico: [{ periodo: '2023', ingresos: 111, resultado: null }, { periodo: '2024', ingresos: 7, resultado: null }, { periodo: '2025', ingresos: 49, resultado: null }] },
    ],
    geografias: [{ nombre: 'Cuenca de Midland (Texas)', peso_pct: 78.3 }, { nombre: 'Cuenca de Delaware (Texas y Nuevo México)', peso_pct: 20.0 }, { nombre: 'Otras (vendidas en feb-2026)', peso_pct: 1.7 }],
    geografias_criterio: 'origen',
    kpis: [
      { kpi: 'Producción media de petróleo (bo/d)', valor_anterior: '41.615 (2T25)', valor_actual: '65.077 (2T26)', variacion: '+56,4 %', comentario: 'Por 1979 Royalties y Sitio [A5]' },
      { kpi: 'Producción total (boe/d)', valor_anterior: '79.286 (2T25)', valor_actual: '134.363 (2T26)', variacion: '+69,5 %', comentario: '48 % petróleo [A5]' },
      { kpi: 'Precio realizado del petróleo (USD/bbl)', valor_anterior: '63,64 (2T25)', valor_actual: '98,28 (2T26)', variacion: '+54,4 %', comentario: 'Cierre de Ormuz [A5]' },
      { kpi: 'Agotamiento (USD/boe)', valor_anterior: '17,19 (2T25)', valor_actual: '15,95 (2T26)', variacion: '−7,2 %', comentario: 'Tras el deterioro de 2025 [A5]' },
      { kpi: 'Pozos en desarrollo en sus tierras (brutos)', valor_anterior: 'n. d.', valor_actual: '1.798 (1-jul-2026)', variacion: null, comentario: '2,2 % de regalía neta media [A5]' },
      { kpi: 'Acres netos de regalía', valor_anterior: '96.003 (dic-2025, con lo no pérmico)', valor_actual: '90.212 (jul-2026)', variacion: '−6,0 %', comentario: 'Venta no pérmica y Riverbend [A1, A5]' },
    ],
  },
  huecos: [
    { seccion: 'trimestres', campo: 'vs_consenso', tipo: 'Complemento', intentos: '1) notas de resultados de la empresa (no comparan con el consenso); 2) Yahoo Finance (solo la estimación vigente, no la previa de cada trimestre); 3) titulares de Seeking Alpha (solo el 1T26 y el 2T26 «baten» en BPA ajustado, sin el consenso de EBITDA)', decision: 'Omitido' },
  ],
  fuentes: fA,
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Form 10-K 2025 de Viper Energy (Pérmico, operadores, competencia en compras de derechos, regulación)', editor: 'Viper Energy, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-02-25', url: `${NUEVO}/000207417626000010/vnom-20251231.htm` },
  { id: 2, titulo: 'Short-Term Energy Outlook, octubre de 2026: producción y precios de EE. UU.', editor: 'U.S. Energy Information Administration (EIA)', tipo: 'Sectorial', fecha: '2026-10-07', url: 'https://www.eia.gov/outlooks/steo/report/petro_prod.php' },
  { id: 3, titulo: 'Short-Term Energy Outlook, octubre de 2026: mercado mundial del petróleo, Ormuz, previsión del Brent', editor: 'U.S. Energy Information Administration (EIA)', tipo: 'Sectorial', fecha: '2026-10-07', url: 'https://www.eia.gov/outlooks/steo/report/global_oil.php' },
  { id: 4, titulo: 'Diamondback Energy reports second quarter 2026 results (producción, capex de 3.900 M, guía)', editor: 'Diamondback Energy, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-08-03', url: 'https://www.sec.gov/Archives/edgar/data/1539838/000153983826000137/' },
  { id: 5, titulo: 'Diamondback Energy, 8-K: precios realizados del 3T26 (petróleo 87,30 USD/bbl)', editor: 'Diamondback Energy, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-10-08', url: 'https://www.sec.gov/Archives/edgar/data/1539838/000153983826000177/fang-20261008.htm' },
  { id: 6, titulo: 'Datos de mercado de Texas Pacific Land, Black Stone Minerals, Kimbell Royalty, Dorchester Minerals, PrairieSky y Freehold (ventas, EBITDA, márgenes)', editor: 'Yahoo Finance (quoteSummary)', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/TPL/' },
  { id: 7, titulo: 'Sitio Royalties reports fourth quarter and full year 2024 results', editor: 'Sitio Royalties Corp. (SEC, 8-K)', tipo: 'Primaria', fecha: '2025-02-26', url: 'https://www.sec.gov/Archives/edgar/data/1949543/000162828025008142/str-q42024xex991.htm' },
  { id: 8, titulo: 'Viper Energy reports second quarter 2026 results (pozos, equipos, Diamondback)', editor: 'Viper Energy, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-08-03', url: `${NUEVO}/000207417626000050/viperex991-8x3x26.htm` },
  { id: 9, titulo: 'Oil gains as Middle East conflict and tanker attacks lift Brent (12-oct-2026)', editor: 'Nation Thailand / Reuters', tipo: 'Prensa', fecha: '2026-10-12', url: 'https://www.nationthailand.com/news/world/40072133' },
  { id: 10, titulo: 'Brent tops $105 as Hormuz disruption persists (28-abr-2026)', editor: 'Anadolu Agency', tipo: 'Prensa', fecha: '2026-04-28', url: 'https://www.aa.com.tr/en/energy/oil/brent-tops-105-as-hormuz-disruption-persists-us-iran-uncertainty-lingers/56668' },
];
const B_ = {
  _estado: 'Completa con limitaciones: no hay un tamaño publicado del mercado de derechos mineros del Pérmico; se estima con la producción de la EIA (estimación propia, explicada). Sin ficha sectorial previa en sectores/ (el encargo no permite escribir fuera de la carpeta del informe).',
  sector: {
    definicion: 'Mercado relevante: los ingresos por regalías del petróleo, el gas y los líquidos que se producen en la cuenca Pérmica (Texas y Nuevo México), es decir, la parte de la producción que cobran los dueños del subsuelo sin pagar costes. Se estima como producción del Pérmico × precio × regalía media. No hay estadística oficial de ese «fondo de regalías»: usamos la producción de la EIA [B2] y una regalía media del 18-20 % (las tierras privadas de Texas suelen arrendarse a 1/8-1/4), estimación propia. Viper ingresa ≈ 2.500 M al año: ≈ 5-6 % de ese fondo.',
    tamano: '≈ 43.000 M USD en 2026 (estimación propia: 6,8 M bbl/d de petróleo × 88 USD × 365 × 19 % de regalía media ≈ 41.500 M, más ≈ 1.500 M de gas y líquidos) [B2]',
    unidad_serie: 'millones de USD (estimación propia)',
    serie: [{ anio: '2023', tamano: 32000 }, { anio: '2024', tamano: 33000 }, { anio: '2025', tamano: 30000 }, { anio: '2026', tamano: 43000 }, { anio: '2027e', tamano: 40000 }],
    tcac_historico_pct: 3.0,
    tcac_previsto_pct: -2.0,
    cr5_pct: 15.0,
    estructura: 'Fragmentada',
    drivers: [
      { driver: 'Precio del petróleo (WTI)', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'WTI medio de 64,7 USD en 2025, 84,6 en lo que va de 2026 y 97,8 el 21-oct; la EIA prevé 88 en 2026 y 80 en 2027 [B2, B3].' },
      { driver: 'Conflicto en el golfo Pérsico (Ormuz)', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Brent récord de 126,41 USD el 30-abr-2026; 114 de media en septiembre por los ataques al oleoducto saudí Este-Oeste; la EIA supone producción cortada de 4,5 M b/d en el 4T26 que vuelve a la normalidad a mediados de 2027 [B3, B9, B10].' },
      { driver: 'Ritmo de perforación en el Pérmico', efecto: '+', horizonte: 'Estructural', evidencia: '106 equipos perforaban en las tierras de Viper en julio de 2026, 12 de Diamondback; 1.798 pozos en desarrollo [B8].' },
      { driver: 'Disciplina de capital de los operadores', efecto: '−', horizonte: 'Estructural', evidencia: 'Diamondback mantiene el capex de 2026 en ≈ 3.900 M y la producción en ≈ 522 Mbo/d pese al petróleo por encima de 90 USD [B4].' },
      { driver: 'Precio del gas en Waha (oeste de Texas)', efecto: '−', horizonte: 'Cíclico', evidencia: 'Viper realizó 0,05 USD/Mcf en el 2T26 sin coberturas; el gas pesa ≈ 26 % del volumen y < 5 % de los ingresos [B8].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'En la venta del producto no hay rivalidad (cobra su parte del precio); la hay en las compras de derechos, con TPL, Black Stone, Kimbell y fondos de capital privado [B1].' },
      { fuerza: 'Poder de los clientes', intensidad: 2, justificacion: 'Los operadores pagan la regalía fijada en el contrato de arrendamiento; deciden cuándo perforar, pero no el porcentaje [B1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 1, justificacion: 'Viper no tiene costes de operación ni capex; Diamondback le presta el personal por contrato [B1].' },
      { fuerza: 'Amenaza de entrada', intensidad: 3, justificacion: 'Cualquier fondo puede comprar derechos; el freno es la escala y los datos para evaluar acres [B1].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'A largo plazo, la electrificación del transporte reduce la demanda de petróleo; a cinco años, poco efecto [B3].' },
    ],
    ciclo: { posicion: 'Expansión', comentario: 'El precio está en un pico de oferta: el WTI cotiza a 97,8 USD con una curva de futuros muy invertida (81,6 USD en dic-2027 y 74,5 en dic-2028) [B2]. En 2008-09 el WTI cayó de 147 a 34 USD; en 2020 llegó a precios negativos y Viper recortó el dividendo de 0,45 a 0,03 USD [A-B1]; en 2022, tras la invasión de Ucrania, el WTI pasó de 100 USD y volvió a ≈ 75 en un año. Los indicadores: la curva de futuros, la producción cortada en el golfo (4,5 M b/d según la EIA) y los inventarios de la OCDE [B3].' },
    regulacion: 'Texas regula la perforación (Railroad Commission): moratoria de nuevos pozos de inyección de agua producida en zonas sísmicas del Pérmico, que puede encarecer la operación de los operadores [B1]. A escala federal, las tierras de Nuevo México incluyen algo de suelo federal, sujeto a permisos del Departamento de Interior. Fiscalmente, Viper tributa como sociedad desde 2018; la ley de 2025 mantuvo la deducción por agotamiento [B1].',
    tendencias: 'Los pozos horizontales son más largos (laterales de 3-4 km) y se perforan en más capas, lo que aumenta la producción por acre de regalía sin coste para Viper [B8]. La consolidación entre operadores (Diamondback-Endeavor en 2024) concentra la actividad en pocos operadores con planes a largo plazo. En el lado de la demanda, la IA aumenta el consumo eléctrico y de gas, pero no cambia la del petróleo a cinco años [B3].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 5.5,
    posicion: '2.º propietario cotizado de derechos mineros del Pérmico por producción (134 Mboe/d frente a ≈ 32 Mboe/d de producción equivalente de regalías de TPL); ≈ 5-6 % del fondo de regalías del Pérmico (estimación propia)',
    competidores: [
      { nombre: 'Texas Pacific Land', pais: 'EE. UU.', ticker: 'TPL', ingresos: 898, cuota_pct: 1.5, margen_ebit_pct: 76.0, comentario: 'Dueño de ≈ 880.000 acres de superficie en el Pérmico; además del petróleo cobra agua y servidumbres. Margen EBITDA del 82,6 % [B6].' },
      { nombre: 'Black Stone Minerals', pais: 'EE. UU.', ticker: 'BSM', ingresos: 424, cuota_pct: null, margen_ebit_pct: null, comentario: 'Más gas (Haynesville) que Pérmico; margen EBITDA 79,1 % [B6].' },
      { nombre: 'Kimbell Royalty Partners', pais: 'EE. UU.', ticker: 'KRP', ingresos: 345, cuota_pct: null, margen_ebit_pct: null, comentario: 'Diversificada en varias cuencas; margen EBITDA 75,2 % [B6].' },
      { nombre: 'Dorchester Minerals', pais: 'EE. UU.', ticker: 'DMLP', ingresos: 186, cuota_pct: null, margen_ebit_pct: null, comentario: 'Sociedad sin deuda que reparte todo; margen EBITDA 85,3 % [B6].' },
      { nombre: 'PrairieSky Royalty', pais: 'Canadá', ticker: 'PSK.TO', ingresos: 357, cuota_pct: null, margen_ebit_pct: null, comentario: 'Regalías en Alberta (no compite por tierras del Pérmico); margen EBITDA 96,1 % [B6].' },
      { nombre: 'Sitio Royalties (comprada por Viper en 2025)', pais: 'EE. UU.', ticker: null, ingresos: 624, cuota_pct: null, margen_ebit_pct: null, comentario: 'Era el mayor rival en compras del Pérmico; ingresos de 624 M en 2024 [B7].' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'No aplica: los derechos no ganan valor por tener más usuarios.' },
        { fuente: 'Costes de cambio', puntuacion: 1, evidencia: 'El operador no puede dejar de pagar la regalía del acre que perfora, pero puede perforar otros acres [B1].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'La propiedad del subsuelo es perpetua y no la puede quitar un competidor; 90.212 acres netos en el núcleo de Midland y Delaware [B8].' },
        { fuente: 'Ventaja en costes', puntuacion: 4, evidencia: 'Sin capex ni costes de operación: margen EBITDA del 91-95 % (94,8 % en el 2T26 con coberturas) frente al 72,5 % de Diamondback [B6, B8].' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'Diamondback opera el 38 % de sus acres y le da información de primera mano para comprar; 146 de 691 pozos del 2T26 eran suyos [B8].' },
      ],
    },
    amenazas: 'El foso protege el margen, no el precio: la regalía cobra un porcentaje de lo que vale el barril. Lo que lo erosiona es (1) que el operador perfore menos en sus tierras (Diamondback mantiene el capex plano en 2026 pese al petróleo alto [B4]); (2) pagar demasiado en las compras, donde compite con TPL, Black Stone y fondos [B1]; (3) el agotamiento: sin pozos nuevos, la producción de una regalía cae ≈ 30-40 % el primer año de cada pozo horizontal. Probabilidad media a cinco años.',
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'Viper Energy es dueña de derechos mineros y de regalías sobre petróleo y gas en la cuenca Pérmica, en el oeste de Texas: 90.212 acres netos de regalía a julio de 2026 [B8]. No perfora ni opera pozos: arrienda el subsuelo a petroleras (Diamondback, su matriz, opera el 38 % de los acres; Exxon, Chevron, Oxy y otros, el resto) y cobra un porcentaje de lo que producen. Había 25.560 pozos horizontales en producción en sus tierras a 1-jul-2026, 4.485 de Diamondback [B8]. Desde la venta de febrero de 2026 todo está en el Pérmico [B1]. Diamondback controla el 39,2 % del capital económico y le presta el equipo directivo; Viper no tiene empleados [B1].',
    como_gana_dinero: 'Cada pozo que un operador pone en producción en sus tierras paga a Viper su regalía (2,9 % neto de media en los del 2T26; 7,0 % en los de Diamondback y 1,8 % en los de terceros) del valor de lo producido, sin coste de perforación ni de operación [B8]. Por eso el margen EBITDA es del 91-95 %. Los ingresos dependen de tres cosas: el precio (el petróleo da ≈ 86 % de los ingresos por regalías), el volumen (cuántos pozos nuevos ponen los operadores) y las compras. Recurrente: los pozos ya perforados siguen pagando durante décadas, aunque caen mucho los primeros años. Apalancamiento operativo casi total: una subida de 10 USD del petróleo añade ≈ 240 M de ingresos y casi lo mismo de EBITDA. Sin estacionalidad relevante.',
    clientes: 'Los «clientes» son los operadores que pagan la regalía. Diamondback opera el 38 % de los acres netos y pesa más en los pozos nuevos: 146 de los 691 del 2T26, con el 52 % de los pozos netos (10,2 de 19,8) [B8]. Las regalías por cobrar de partes vinculadas eran 88 M en diciembre de 2025 [B1]. No hay contratos de venta que negociar: la regalía la fija el arrendamiento, normalmente perpetuo mientras haya producción. Poder de precios: ninguno sobre el barril, que cotiza en Nueva York; el poder está en el porcentaje fijo de regalía y en no pagar costes.',
  },
  huecos: [
    { seccion: 'sector', campo: 'tamano (dos fuentes independientes)', tipo: 'Núcleo', intentos: '1) EIA: solo producción, no ingresos por regalías; 2) informes de TPL y Viper: no publican el tamaño del mercado de derechos; 3) estimación propia con producción × precio × regalía media', decision: 'Calculado y marcado como estimación' },
  ],
  fuentes: fB,
};
guarda('B', B_);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Proxy statement 2026 (DEF 14A): consejo, retribución, voto de 2025, accionistas, operaciones vinculadas', editor: 'Viper Energy, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-04-08', url: 'https://www.sec.gov/Archives/edgar/data/2074176/000119312526146417/d78130ddef14a.htm' },
  { id: 2, titulo: 'Form 10-K 2025: relación con Diamondback, contrato de servicios, conflictos de interés', editor: 'Viper Energy, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-02-25', url: `${NUEVO}/000207417626000010/vnom-20251231.htm` },
  { id: 3, titulo: 'Form 4 de Viper Energy (21-oct-2025 a 21-oct-2026): ventas de Diamondback y concesiones', editor: 'SEC EDGAR (herramientas/form4.mjs)', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0002074176&type=4' },
  { id: 4, titulo: 'Form 8-K: colocación de 17,4 M de acciones A por Diamondback, EnCap y Oaktree a 45,90 USD', editor: 'Viper Energy, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-03-04', url: `${NUEVO}/000110465926023479/tm267705d4_8k.htm` },
  { id: 5, titulo: 'Form 8-K: nombramiento de John Grotzinger como consejero (15-sep-2026)', editor: 'Viper Energy, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-09-16', url: `${NUEVO}/000110465926108245/tm2625491d1_8k.htm` },
  { id: 6, titulo: 'Form 10-Q del 2T26: accionariado económico de OpCo a 30-jun-2026', editor: 'Viper Energy, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-08-05', url: `${NUEVO}/000207417626000053/vnom-20260630.htm` },
  { id: 7, titulo: 'Notas de resultados 1T25-2T26 (guías trimestrales de producción y lo logrado)', editor: 'Viper Energy, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-08-03', url: `${NUEVO}/000207417626000050/viperex991-8x3x26.htm` },
];
const C = {
  _estado: 'Completa. Proxy 2026, 10-K 2025, 10-Q 2T26, Form 4 de 12 meses y 8-K de consejo y colocación. La retribución de los directivos la paga casi toda Diamondback (no Viper).',
  directivos: {
    equipo: [
      { nombre: "Kaes Van't Hof", cargo: 'Consejero delegado (CEO) de Viper y de Diamondback', desde: '2025', participacion_pct: 0.01, trayectoria: 'Presidente de Viper de 2017 a 2025 y director financiero de Diamondback de 2019 a 2025; dirigió la compra de Sitio y las compras a Diamondback. Desde mayo de 2025 es también CEO de Diamondback, la matriz que vende derechos a Viper [C1].' },
      { nombre: 'Austen Gilfillian', cargo: 'Presidente', desde: '2025', participacion_pct: 0.01, trayectoria: 'Único directivo dedicado en exclusiva a Viper (cedido por Diamondback); su retribución de 2,54 M USD la paga Viper [C1].' },
      { nombre: 'Teresa L. Dick', cargo: 'Directora financiera', desde: '2014', participacion_pct: 0.01, trayectoria: 'Directora financiera de Viper desde su salida a bolsa y responsable contable de Diamondback [C1].' },
      { nombre: 'Steven E. West', cargo: 'Presidente del consejo', desde: '2014', participacion_pct: null, trayectoria: 'Fundador y antiguo CEO de Diamondback (2009-2011) y consejero de Diamondback; antes en Wexford Capital [C1].' },
      { nombre: 'Travis D. Stice', cargo: 'Consejero (designado por Diamondback)', desde: '2014', participacion_pct: null, trayectoria: 'CEO de Viper hasta febrero de 2025 y de Diamondback hasta mayo de 2025; presidente del consejo de Diamondback [C1].' },
    ],
    historial_guidance: [
      { anio: '1T25', guia: '30.000-31.000 bo/d', real: '31.311 bo/d', cumplida: 'Sí' },
      { anio: '2T25', guia: '40.000-43.000 bo/d', real: '41.615 bo/d', cumplida: 'Sí' },
      { anio: '4T25', guia: '65.000-67.000 bo/d', real: '66.413 bo/d', cumplida: 'Sí' },
      { anio: '1T26', guia: '62.500-64.500 bo/d', real: '65.000 bo/d', cumplida: 'Sí' },
      { anio: '2026 (año)', guia: '61.000-67.000 bo/d (feb-2026)', real: 'Subida a 66.000-67.250 bo/d en agosto (con Riverbend)', cumplida: 'Parcial' },
    ],
    comentario: "El equipo cumple las guías de producción trimestrales [C7]. El problema no es la credibilidad sino la doble función: Kaes Van't Hof es CEO de Viper y de Diamondback, y Viper compra derechos a Diamondback a precios que acuerdan las dos partes (el comité de auditoría aprueba las operaciones vinculadas) [C1, C2]. Los directivos tienen participaciones pequeñas en Viper (Van't Hof, 35.362 acciones A) y grandes en Diamondback [C1]. La sucesión está ligada a la de Diamondback, que hizo el relevo de Stice a Van't Hof en 2025 con un año de aviso [C1].",
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      { nombre: 'Steven E. West', cargo: 'Presidente', tipo: 'Otro externo', desde: '2014', comisiones: '—' },
      { nombre: "Kaes Van't Hof", cargo: 'Consejero delegado', tipo: 'Ejecutivo', desde: '2023', comisiones: '—' },
      { nombre: 'Travis D. Stice', cargo: 'Consejero', tipo: 'Dominical', desde: '2014', comisiones: '—' },
      { nombre: 'Laurie H. Argo', cargo: 'Consejera', tipo: 'Independiente', desde: '2023', comisiones: 'Auditoría, Nombramientos' },
      { nombre: 'Spencer D. Armour III', cargo: 'Consejero', tipo: 'Independiente', desde: '2017', comisiones: 'Retribuciones' },
      { nombre: 'Frank C. Hu', cargo: 'Consejero', tipo: 'Independiente', desde: '2022', comisiones: 'Auditoría' },
      { nombre: 'W. Wesley Perry', cargo: 'Consejero', tipo: 'Independiente', desde: '2014', comisiones: 'Auditoría (presidente), Retribuciones' },
      { nombre: 'James L. Rubin', cargo: 'Consejero', tipo: 'Independiente', desde: '2014', comisiones: 'Nombramientos, Retribuciones' },
      { nombre: 'John Grotzinger', cargo: 'Consejero', tipo: 'Independiente', desde: '2026', comisiones: '—' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: true, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: true, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: true, presidente_vinculado_control: true, cambios_cupula_24m: 1,
    voto_remuneracion_pct: 79.4, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 1.83, fijo: 0, variable_corto: 0, variable_largo: 1.83, ratio_salario_medio: null },
    remuneracion: "Viper solo paga a sus directivos acciones por objetivos (PSU), ligadas al rendimiento total para el accionista frente a un grupo de petroleras y de regalías, con un modificador por rendimiento absoluto: 1,83 M USD a Van't Hof en 2025 [C1]. El sueldo y el bonus los paga Diamondback, salvo al presidente Gilfillian (2,54 M en 2025, todo cargado a Viper) [C1]. El voto consultivo de 2025 fue del 79,4 % a favor, bajo para un consejo controlado: casi el 40 % del voto es de Diamondback, así que el rechazo entre los accionistas libres fue mucho mayor (no se puede calcular sin el acta) [C1]. Hay política de recuperación (clawback) [C1].",
    accionistas: [
      { nombre: 'Diamondback Energy (clase B y OpCo Units)', pct: 39.2, tipo: 'Accionista de control', variacion: 'Vendió 12,9 M de acciones A en marzo de 2026 (589 M USD) y recibió 3,82 M de OpCo Units en septiembre [C3, C4, C6]' },
      { nombre: 'Antiguos socios de Sitio OpCo (Kimmeridge, Blackstone y otros)', pct: 5.9, tipo: 'Financiero (clase B)', variacion: 'Kimmeridge vendió 1 M de OpCo Units a Viper en diciembre de 2025 [C6]' },
      { nombre: 'Capital World Investors', pct: 5.2, tipo: 'Institucional (clase A)', variacion: '18,75 M de acciones A (13G/A de feb-2026) [C1]' },
      { nombre: 'T. Rowe Price', pct: 3.0, tipo: 'Institucional (clase A)', variacion: '10,8 M de acciones A (13G de nov-2025) [C1]' },
      { nombre: 'TWR IV (Tumbleweed)', pct: 1.8, tipo: 'Financiero (OpCo Units)', variacion: 'Vendió en la colocación de marzo de 2026 [C4, C6]' },
      { nombre: 'Consejeros y directivos', pct: 0.1, tipo: 'Directivos', variacion: 'Concesiones de acciones; sin compras [C3]' },
    ],
    insiders: [
      { fecha: '2026-03-04', persona: 'Diamondback Energy (accionista de control)', operacion: 'Venta', acciones: 12391304, importe: 566.16 },
      { fecha: '2026-03-19', persona: 'Diamondback Energy (accionista de control)', operacion: 'Venta', acciones: 510071, importe: 23.31 },
    ],
    control_y_defensas: 'Diamondback tiene el 39,2 % del capital económico y del voto (clase B, una acción un voto, canjeables 1:1 por clase A) y el derecho a designar consejeros (Stice y Van\'t Hof) [C1, C6]. El presidente del consejo es el fundador de Diamondback y consejero suyo [C1]. Viper no tiene empleados: un contrato de servicios con Diamondback le da directivos y personal (17 M de gastos generales vinculados en 2025) [C2]. Diamondback no está obligada a ofrecer sus derechos a Viper y puede competir con ella por compras; las operaciones vinculadas las aprueba el comité de auditoría, de independientes [C2]. Hasta marzo de 2024 Viper era una «controlled company» del Nasdaq con menos protecciones [C1].',
    alertas: [
      "Kaes Van't Hof es a la vez CEO de Viper y de Diamondback, que le vende derechos (2025: 1979 Royalties por 4.450 M; 2026: 933 acres por 3,82 M de OpCo Units) [C1, C2].",
      'Diamondback vendió 12,9 M de acciones A (589 M USD) en marzo de 2026; puede volver a colocar [C3, C4].',
      'Voto consultivo de retribución del 79,4 % en 2025, con ≈ 40 % del voto en manos de Diamondback [C1].',
    ],
    confianza: 'Alta',
  },
  huecos: [
    { seccion: 'gobierno', campo: 'voto_remuneracion_contra_pct', tipo: 'Complemento', intentos: '1) proxy 2026 (solo da el % a favor de 2025); 2) 8-K de resultados de la junta de mayo de 2026 (vnom-20260519, ítem 5.07) no descargado por presupuesto; 3) no hay voto de 2026 sobre retribución (la próxima consulta es en 2027)', decision: 'Omitido' },
  ],
  fuentes: fC,
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const FX_CAD = 0.709; // USD por CAD, cierre del 20-oct-2026 (Yahoo CADUSD=X)
const yd = Y.datos;
const tr = (t, p) => yd[t].trend.find((x) => x.periodo === p);
const ntm = (a, b) => (2 / 12) * a + (10 / 12) * b; // a 21-oct quedan ≈ 2 meses de 2026
const comp = (t, nombre, pais, fx = 1) => {
  const d = yd[t]; const cap = d.cap / 1e6 * fx; const deuda = (d.deuda ?? 0) / 1e6 * fx; const caja = (d.caja ?? 0) / 1e6 * fx;
  const ev = cap + deuda - caja; const ventas = d.ventas / 1e6 * fx; const ebitda = d.ebitda / 1e6 * fx;
  const t0 = tr(t, '0y'), t1 = tr(t, '+1y');
  const vN = t0?.ventas && t1?.ventas ? ntm(t0.ventas, t1.ventas) / 1e6 * fx : null;
  const bN = t0?.bpa && t1?.bpa ? ntm(t0.bpa, t1.bpa) : null;
  const ebN = vN ? vN * (d.margen_ebitda ?? 0) : null;
  return {
    nombre, ticker: t, pais, capitalizacion: Math.round(cap), ev_ventas: r2(ev / ventas), ev_ebitda_ltm: r1(ev / ebitda), ev_ebitda_ntm: ebN ? r1(ev / ebN) : null,
    per_ntm: bN ? r1(d.precio / bN) : null, crecimiento_pct: vN ? r1((vN / ventas - 1) * 100) : null, margen_ebitda_pct: r1(d.margen_ebitda * 100), roic_pct: null,
    dn_ebitda: r2((deuda - caja) / ebitda), fcf_yield_pct: d.fcf && d.fcf > 0 ? r1(d.fcf / d.cap * 100) : null,
  };
};
const comps = [
  comp('TPL', 'Texas Pacific Land', 'US'), comp('BSM', 'Black Stone Minerals', 'US'), comp('KRP', 'Kimbell Royalty Partners', 'US'),
  comp('DMLP', 'Dorchester Minerals', 'US'), comp('PSK.TO', 'PrairieSky Royalty', 'CA', FX_CAD), comp('FRU.TO', 'Freehold Royalties', 'CA', FX_CAD),
  comp('FANG', 'Diamondback Energy (operador, matriz)', 'US'),
];
const perv = comps.map((c) => c.per_ntm).filter((x) => x != null).sort((a, b) => a - b);
const perMed = perv.length % 2 ? perv[(perv.length - 1) / 2] : r1((perv[perv.length / 2 - 1] + perv[perv.length / 2]) / 2);
const v = yd.VNOM; const t0 = tr('VNOM', '0y'), t1 = tr('VNOM', '+1y');
const bol = B.bolsa;
const fD = [
  { id: 1, titulo: 'Históricos diarios de VNOM, SPY y XLE (precio, rentabilidades, beta, volatilidad, cierres de ejercicio)', editor: 'Yahoo Finance (herramientas/bolsa.mjs)', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/VNOM/history' },
  { id: 2, titulo: 'Consenso de VNOM: BPA y ventas 2026-2027, recomendaciones y precio objetivo (21 analistas)', editor: 'Yahoo Finance (quoteSummary)', tipo: 'Analistas', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/VNOM/analysis' },
  { id: 3, titulo: 'Datos de mercado de los comparables (capitalización, deuda, ventas, EBITDA, BPA estimado)', editor: 'Yahoo Finance (quoteSummary)', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/BSM/' },
  { id: 4, titulo: 'Curva de futuros de WTI (CL dic-2026 a dic-2029) y Henry Hub (NG dic-2027 y dic-2028), y medias trimestrales del WTI', editor: 'Yahoo Finance (NYMEX)', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/CL%3DF/' },
  { id: 5, titulo: 'Daily Treasury Par Yield Curve Rates (10 años: 5,12 % el 20-oct-2026)', editor: 'U.S. Department of the Treasury', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve&field_tdr_date_value=2026' },
  { id: 6, titulo: 'Implied ERP by month (T12m with sustainable payout), octubre de 2026: 4,20 %', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10-01', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 7, titulo: 'Form 10-Q del 2T26 (acciones A y B, OpCo Units, opción de TWR IV) y 8-K de la compra de septiembre (3,82 M OpCo Units)', editor: 'Viper Energy, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-09-08', url: `${NUEVO}/000207417626053/vnom-20260630.htm` },
  { id: 8, titulo: 'Sitio Royalties: resultados del 4T24 (EBITDA ajustado 141,2 M) y 10-K 2025 de Viper (precio de Sitio ≈ 4.000 M con deuda)', editor: 'Sitio Royalties Corp. y Viper Energy (SEC)', tipo: 'Primaria', fecha: '2025-02-26', url: 'https://www.sec.gov/Archives/edgar/data/1949543/000162828025008142/str-q42024xex991.htm' },
  { id: 9, titulo: 'Viper Energy: Better Royalty Yields Are Elsewhere (Downgrade); Hedge Structure Allows For Full Participation In Oil Pricing Upside', editor: 'Seeking Alpha (titulares)', tipo: 'Analistas', fecha: '2026-10-21', url: 'https://seekingalpha.com/symbol/VNOM' },
  { id: 10, titulo: 'Viper Energy (VNOM): objetivos de Barclays (58 USD), Roth (50) y Mizuho (56) tras el 2T26', editor: 'Stock Analysis', tipo: 'Analistas', fecha: '2026-08-10', url: 'https://stockanalysis.com/stocks/vnom/' },
  { id: 11, titulo: 'Notas de resultados y 8-K de Viper (próximos resultados del 3T26: 2-nov-2026, según calendarios de mercado)', editor: 'Unusual Whales / Viper Energy', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://unusualwhales.com/stock/VNOM/earnings' },
  { id: 12, titulo: 'Form 8-K: colocación de Diamondback, EnCap y Oaktree (17,4 M de acciones A a 45,90 USD; 798 M brutos)', editor: 'Viper Energy, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-03-04', url: `${NUEVO}/000110465926023479/tm267705d4_ex99-1.htm` },
  { id: 13, titulo: 'Viper Energy reports second quarter 2026 results (dividendo base de 2,00 USD; recompras)', editor: 'Viper Energy, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-08-03', url: `${NUEVO}/000207417626000050/viperex991-8x3x26.htm` },
  { id: 14, titulo: 'Oil prices gain on attacks in Saudi Arabia, Iran\'s new tactics to target tankers (14-oct-2026)', editor: 'GV Wire / Reuters', tipo: 'Prensa', fecha: '2026-10-14', url: 'https://gvwire.com/2026/10/14/oil-prices-gain-on-attacks-in-saudi-arabia-irans-new-tactics-to-target-tankers/' },
];
const D = {
  _estado: `Completa. Precio de cierre del 20-oct-2026 (45,85 USD); el 21-oct Nueva York cotizaba (46,10 USD, Yahoo, ${new Date(v.hora * 1000).toISOString().slice(11, 16)} UTC). Mediana del PER NTM de los comparables: ${perMed}. Consenso solo de Yahoo (2026-2027; sin 2028).`,
  _per_mediana_comparables: perMed,
  identificacion: {
    nombre: 'Viper Energy, Inc.', nombre_corto: 'Viper', ticker: 'VNOM', isin: 'US92764N1028', mercado: 'Nasdaq Global Select', indice_referencia: 'S&P 500 (SPY); sector: Energy Select (XLE)',
    pais: 'Estados Unidos', pais_iso: 'US', sector: 'Energía', industria: 'Petróleo y gas: exploración y producción (derechos mineros y regalías)', sede: 'Midland (Texas)', fundacion: '2014', empleados: 0, web: 'https://www.viperenergy.com',
    precio: 45.85, fecha_precio: '2026-10-20', acciones: 369.7, capitalizacion_publicada: Math.round(v.cap / 1e6), free_float_pct: 52.7,
    max_52s: B.identificacion.max_52s, min_52s: B.identificacion.min_52s, volumen_medio_diario: `≈ ${String(B.volumen_3m.importe_dia_millones).replace('.', ',')} M USD/día (3 meses)`, proximos_resultados: '2026-11-02',
  },
  consenso: {
    guidance: 'Guía de producción de 2026 (3-ago-2026): 66.000-67.250 bo/d (132.500-135.000 boe/d), subida desde 61.000-67.000 en febrero; 3T26: 67.500-68.500 bo/d [D13]. Agotamiento de 14,75-17,25 USD/boe, gastos generales en caja de 0,70-0,90 USD/boe, intereses de 1,90-2,40 USD/boe, impuestos de producción ≈ 7 % y tipo fiscal en caja del 27-30 % [D13]. Dividendo base de 2,00 USD anuales desde el 3T26 [D13]. No hay guía para 2027.',
    estimaciones: [
      { periodo: '2026e', ingresos: Math.round(t0.ventas / 1e6), ebitda: Math.round(t0.ventas / 1e6 * 0.915), ebit: null, bpa: r2(t0.bpa), dpa: 2.5, fuente: `Yahoo Finance, ${t0.n} analistas de BPA; EBITDA = ventas × 91,5 % (estimación propia: margen de 2025-2026) [D2]` },
      { periodo: '2027e', ingresos: Math.round(t1.ventas / 1e6), ebitda: Math.round(t1.ventas / 1e6 * 0.915), ebit: null, bpa: r2(t1.bpa), dpa: 2.0, fuente: `Yahoo Finance, ${t1.n} analistas de BPA; EBITDA = ventas × 91,5 % (estimación propia) [D2]` },
    ],
    recomendaciones: { n_analistas: v.n_analistas, comprar: (v.reco?.strongBuy ?? 0) + (v.reco?.buy ?? 0), mantener: v.reco?.hold ?? 0, vender: (v.reco?.sell ?? 0) + (v.reco?.strongSell ?? 0), po_medio: r2(v.po_medio), po_min: v.po_min, po_max: v.po_max },
    revisiones: `El BPA de 2027 del consenso sube de ${r2(t1.bpa_hace90)} USD hace 90 días a ${r2(t1.bpa)} hoy (+${r1((t1.bpa / t1.bpa_hace90 - 1) * 100)} %) y el de 2026 de ${r2(t0.bpa_hace90)} a ${r2(t0.bpa)}, por el petróleo más caro [D2]. Los objetivos de precio se han movido poco: tras el 2T26 Barclays bajó a 58 USD, Roth a 50 y Mizuho a 56 [D10]; hay ${(v.reco?.strongBuy ?? 0) + (v.reco?.buy ?? 0)} recomendaciones de compra y ninguna de venta [D2]. Seeking Alpha publicó una rebaja de recomendación el 16-oct («mejores rentabilidades por regalías en otros sitios») [D9]. Solo hay una fuente gratuita con estimaciones completas (Yahoo): las de 2028 no están.`,
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    tipo_rentabilidad: bol.tipo_rentabilidad, rentabilidades: bol.rentabilidades, anual: bol.anual,
    beta: bol.beta, volatilidad_pct: bol.volatilidad_pct, max_drawdown_pct: bol.max_drawdown_pct, posicion_corta_pct: r1(v.corto_pct * 100),
    comentario: 'VNOM ha ganado un 32,2 % en un año (con dividendos) frente al 15,8 % del S&P 500, pero la mitad que el sector energético (XLE, +60,9 %) [D1]: la acción no ha seguido al petróleo. En marzo de 2026, con el WTI a ≈ 73 USD, cotizaba a ≈ 46 USD (precio de la colocación de Diamondback) y hoy, con el WTI a ≈ 98, a 45,85 [D1, D12]. El mercado la valora por el precio a largo plazo, no por el de hoy. La caída de 2025 (−16,6 %) vino del petróleo a ≈ 65 USD y de la dilución por Sitio [D1]. Beta mensual de 5 años de 0,52 frente al S&P 500 (0,68 ajustada) [D1].',
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: [
      { anio: '2021', precio_cierre: 21.31, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2022', precio_cierre: 31.79, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2023', precio_cierre: 31.38, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2024', precio_cierre: 49.07, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2025', precio_cierre: 38.63, ev_ebitda_ntm: null, per_ntm: null, excluir: true },
    ],
    comentario: 'Los múltiplos LTM que calcula el motor sobre el BPA de la clase A no sirven solos: hasta 2023 Viper era una sociedad comanditaria con asignaciones especiales de beneficio y en 2024-2025 el BPA lleva un ingreso fiscal (2024) y un deterioro (2025). Por eso 2025 se excluye. La historia útil del PER es la adelantada que construimos en la sección de valoración con un beneficio por unidad normalizado (sin deterioros y con impuesto completo).',
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Propietarios cotizados de derechos mineros y regalías de petróleo y gas en Norteamérica (TPL, Black Stone, Kimbell, Dorchester, PrairieSky, Freehold), con el mismo modelo sin capex; y Diamondback, el operador que perfora sus tierras, como referencia de cómo valora el mercado el mismo barril con costes. Sitio ya no cotiza (la compró Viper). No se incluyen fideicomisos (Permian Basin Royalty Trust, Sabine) porque se liquidan con el agotamiento y no hay estimaciones. EBITDA de los próximos 12 meses = ventas estimadas × margen de los últimos 12 meses (estimación propia, mismo proveedor); el «per adelantado» que publica Yahoo para TPL (4,8x) está mal y se recalcula con el BPA estimado. Canadienses convertidas a USD a 0,709 USD/CAD.',
    empresas: comps,
    comentario: `Los propietarios de regalías cotizan con prima sobre el operador: mediana del PER de los próximos 12 meses de ${perMed}x en el grupo, con TPL (34,7x) y PrairieSky (32,3x) muy por encima y Black Stone (13,0x) y Kimbell (15,9x) cerca de Viper; Diamondback, a 9,6x. Viper cotiza a ≈ 17x el BPA de consenso de los próximos 12 meses, en la parte baja de las regalías puras pese a su margen (91-95 %) y su concentración en el núcleo del Pérmico. La prima de TPL se explica por el agua y las servidumbres (ingresos sin agotamiento) y por no tener deuda. Usaríamos el rango de Black Stone-Kimbell-Freehold (13-23x) como referencia.`,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2025-08', objetivo: 'Sitio Royalties (34.300 acres netos)', comprador: 'Viper Energy', ev: 4000, ev_ventas: 6.41, ev_ebitda: 7.1, prima_pct: null, excluir: false, comentario: 'EV ≈ 4.000 M con la deuda de Sitio [D8]; ventas de Sitio de 624 M en 2024 y EBITDA ajustado del 4T24 de 141,2 M anualizado (565 M): estimación propia del múltiplo [D8].' },
      { fecha: '2025-05', objetivo: '1979 Royalties (Endeavor, 24.446 acres netos)', comprador: 'Viper Energy (a su matriz Diamondback)', ev: 4450, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Operación vinculada: 873 M en caja + 69,6 M de OpCo Units; sin múltiplo publicado [D7].' },
      { fecha: '2026-07', objetivo: 'Riverbend Oil & Gas IX (2.772 acres netos, ≈ 2.000 bo/d)', comprador: 'Viper Energy', ev: 505, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '≈ 339 M en caja + 3,69 M de acciones A (≈ 166 M a 45 USD, estimación propia); ≈ 250.000 USD por barril diario de petróleo [D7].' },
      { fecha: '2026-02', objetivo: 'Activos de Viper fuera del Pérmico (9.400 acres netos, 4.750 bo/d)', comprador: 'GRP Energy Capital y Warwick Capital', ev: 617, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '≈ 130.000 USD por barril diario: las regalías fuera del Pérmico valen la mitad por barril que Riverbend [D7].' },
      { fecha: '2026-09', objetivo: 'Derechos de Diamondback (933 acres netos)', comprador: 'Viper Energy (a su matriz)', ev: 160, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '3,82 M de OpCo Units; operación vinculada [D7].' },
    ],
    comentario: 'Las compras de derechos del Pérmico se pagan a ≈ 7 veces el EBITDA (Sitio) o 250.000 USD por barril diario de petróleo (Riverbend), por debajo de las ≈ 8,3 veces a las que cotiza Viper sobre el EBITDA de los últimos 12 meses (Yahoo) [D3]. Con Diamondback en el 39 % y con derecho a designar consejeros, una opa de un tercero no es probable; la operación posible es que Diamondback compre el resto, como hizo con Rattler Midstream en 2022 [D7].',
    confianza: 'Baja',
  },
  huecos: [
    { seccion: 'consenso', campo: 'estimaciones de 2028e', tipo: 'Complemento', intentos: '1) Yahoo Finance (solo 2026-2027); 2) MarketScreener (no abierto por presupuesto); 3) Stock Analysis (solo objetivo de precio)', decision: 'Omitido' },
    { seccion: 'transacciones', campo: 'múltiplos de 1979 Royalties, Riverbend y la venta no pérmica', tipo: 'Complemento', intentos: '1) 8-K y 10-Q de Viper (sin EBITDA de lo comprado); 2) notas de prensa de la operación (solo producción y acres); 3) cálculo con producción × precio, descartado por mezclar supuestos', decision: 'Omitido' },
  ],
  fuentes: fD,
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Stocktwits, flujo de mensajes de $VNOM (27-may a 18-oct-2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-18', url: 'https://api.stocktwits.com/api/2/streams/symbol/VNOM.json' },
  { id: 2, titulo: 'Seeking Alpha, artículos y noticias de VNOM (titulares de mar-oct 2026)', editor: 'Seeking Alpha (RSS)', tipo: 'Foros y redes', fecha: '2026-10-21', url: 'https://seekingalpha.com/api/sa/combined/VNOM.xml' },
  { id: 3, titulo: 'Top Wall Street analysts like these dividend stocks for steady income (VNOM entre ellas)', editor: 'CNBC', tipo: 'Prensa', fecha: '2026-08-16', url: 'https://www.cnbc.com/2026/08/16/top-wall-street-analysts-like-these-dividend-stocks-for-steady-income.html' },
];
const E = {
  _estado: 'Completa con poco volumen: Stocktwits (≈ 30 mensajes) y titulares de Seeking Alpha; Reddit no abre.',
  sentimiento: {
    tono: 'Positivo', tendencia: 'Estable',
    revisadas: [
      { plataforma: 'Stocktwits ($VNOM)', fecha: '2026-10', n_comentarios: 30, tono: 'Positivo', resumen: 'Inversores de dividendo que compran en caídas hacia 40-42 USD y venden opciones; celebran la subida del dividendo base y la caja disponible; dudan de comprar con las noticias de Irán cambiando cada semana [E1].' },
      { plataforma: 'Seeking Alpha (artículos)', fecha: '2026-10', n_comentarios: 8, tono: 'Dividido', resumen: 'Dos artículos de octubre: uno alcista (las coberturas de suelo dejan subir con el petróleo) y una rebaja («mejores rentabilidades por regalías en otros sitios»); en agosto, «el mercado ya descuenta mucho riesgo» [E2].' },
      { plataforma: 'Prensa (CNBC)', fecha: '2026-08', n_comentarios: 3, tono: 'Positivo', resumen: 'Incluida en listas de valores de dividendo recomendados por analistas [E3].' },
    ],
    temas: [
      { tema: 'El petróleo de la guerra y si durará', postura: 'Dividida', peso: 'Alto', contraste: 'La curva de futuros ya descuenta la caída (74,5 USD en dic-2028) y el precio de la acción también: no ha subido con el petróleo [D-1].' },
      { tema: 'El nuevo dividendo base de 2,00 USD', postura: 'Alcista', peso: 'Alto', contraste: 'Es un 4,4 % al precio de hoy; la empresa dice que se cubre hasta ≈ 30 USD/bbl [A-5]; a cambio, desaparece el variable.' },
      { tema: 'Diamondback como vendedor y como operador', postura: 'Dividida', peso: 'Medio', contraste: 'Diamondback vendió 589 M en marzo y sigue con el 39 %: un riesgo de colocación que los foros apenas mencionan [C-3].' },
      { tema: 'Comprar por debajo de 40-42 USD', postura: 'Alcista', peso: 'Medio', contraste: 'Coincide con los precios de las recompras de la empresa (42,82-44,34 USD) [A-5].' },
    ],
    lectura: 'El sentimiento es positivo pero templado y lo dominan inversores de dividendo. No hay euforia pese al petróleo cerca de 100 USD: la gente compra en caídas a 40-42 USD y vende opciones por encima de 45. Lo que no ve el foro es el riesgo de una nueva colocación de Diamondback, que ya vendió en marzo. No contradice a los analistas (21 recomendaciones de compra), pero sí a la tesis de crecimiento: el debate es de renta, no de revalorización.',
    confianza: 'Baja',
  },
  huecos: [],
  fuentes: fE,
};
guarda('E', E);
console.log('Notas A-E escritas. Mediana PER comparables:', perMed, comps.map((c) => `${c.ticker}:${c.per_ntm}/${c.ev_ebitda_ntm}`).join(' '));
