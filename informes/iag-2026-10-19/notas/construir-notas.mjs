// Construye las notas A-E de IAG (corte 2026-10-19). Cada nota lleva sus propias fuentes [n].
// node informes/iag-2026-10-19/notas/construir-notas.mjs
// Cifras en millones de EUR salvo indicación. La acción cotiza en peniques (GBp) en Londres y en EUR en Madrid.
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const DIR = dirname(fileURLToPath(import.meta.url));
const w = (n, o) => writeFileSync(join(DIR, `${n}.json`), JSON.stringify(o, null, 2));
const INV = 'https://www.investegate.co.uk/announcement/rns/international-consolidated-airlines-group-sa-cdi---iag/';
const ESEF = 'https://filings.xbrl.org/959800TZHQRUSH1ESL13/2025-12-31/ESEF/GB/0/959800TZHQRUSH1ESL13-2025-12-31/reports/959800TZHQRUSH1ESL13-2025-12-31-T01.html';

// ───────────── A: cuentas, balance, flujos, calidad, capital, negocio ─────────────
// Cuenta estatutaria (ESEF para 2021-2025 [1]); EBITDA = EBIT + amortizaciones (incluida la de derechos de uso);
// coste_ventas = combustible y derechos de emisión (cuenta por naturaleza). Los no recurrentes dentro del EBIT van en positivo si son gasto.
const fila = (periodo, ingresos, fuel, amort, ebit, bai, imp, neto, gf, nr, bpa, dpa, acc) => ({
  periodo, ingresos, coste_ventas: fuel, gastos_generales: null, ebitda: ebit + amort, amortizaciones: amort, ebit,
  resultado_financiero: bai - ebit, bai, impuestos: imp, minoritarios: 0, beneficio_neto: neto, gastos_financieros: gf,
  participadas_en_ebitda: null, no_recurrentes_en_ebitda: nr, bpa, dpa, dpa_extraordinario: 0, acciones_diluidas: acc,
});
const cuenta = [
  fila('2021', 8455, 1935, 1932, -2765, -3507, -574, -2933, 830, -205, -0.59, 0, 4964),
  fila('2022', 23066, 6120, 2070, 1278, 415, -16, 431, 1017, -31, 0.06, 0, 5344),
  fila('2023', 29453, 7557, 2063, 3507, 3056, 401, 2655, 1113, null, 0.51, 0, 5277),
  fila('2024', 32100, 7608, 2364, 4283, 3563, 831, 2732, 917, 160, 0.56, 0.09, 5260),
  fila('2025', 33213, 7083, 2628, 5024, 4505, 1163, 3342, 861, null, 0.70, 0.098, 5032),
];
// LTM a 30-jun-2026 = 2025 + 1S26 − 1S25 [1, 2, 3]
const ltm = {
  periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 33213 + 16064 - 15906, ebitda: (5024 + 1608 - 1878) + (2628 + 1366 - 1257),
  ebit: 5024 + 1608 - 1878, beneficio_neto: 3342 + 1033 - 1301, bpa: 0.66, dpa: 0.098, dpa_extraordinario: 0,
  fcf: (6588 + 4196 - 3787) - (3442 + 1291 - 1690) - 1344, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 149,
};

const A = {
  _estado: 'Completa. Cuentas 2021-2025 del ESEF (filings.xbrl.org, informe anual 2025 y comparativos) comprobadas con los comunicados de resultados de 2022, 2023 y 2025; semestre a 30-jun-2026 del informe semestral del 31-jul-2026 (PDF íntegro). Arrendamientos, depósitos e ingresos diferidos separados a mano de las notas.',
  financieros: {
    cuenta,
    ltm,
    cambios_perimetro: [
      { periodo: '2021', descripcion: 'Año COVID: capacidad al ≈ 43 % de 2019; ingresos de 8.455 M frente a 25.506 M en 2019. No comparable [5].' },
      { periodo: '2022', descripcion: 'Recuperación: capacidad al ≈ 79 % de 2019. No comparable en márgenes [5].' },
    ],
    comentario: 'Los ingresos pasaron de 8.455 M en 2021 a 33.213 M en 2025, todo orgánico (sin compras: la de Air Europa se abandonó en 2024). De 2023 a 2025 crecen un 6,2 % anual con capacidad +4-5 % y precio por asiento-kilómetro estable o al alza. El margen operativo subió de 11,9 % (2023) a 13,8 % (2024) y 15,1 % (2025): +320 puntos básicos por precio (demanda transatlántica premium y ocio), combustible más barato en 2025 (7.083 M, −6,9 %) y coste unitario sin combustible contenido. En 2026 el margen baja: primer semestre al 10,9 % antes de extraordinarios (11,8 % un año antes) por el queroseno de la guerra de Irán (+12,3 % de gasto en combustible), la capacidad plana (motores, Oriente Medio cerrado) y la competencia de las aerolíneas de EE. UU. en el Atlántico Norte e Irlanda. 2021-2022 no son comparables (COVID) [1, 2, 3, 5].',
    ajustes: 'IAG publica resultados «antes de extraordinarios». 2021: +205 M a favor (reversión de provisiones de reestructuración); 2022: +31 M a favor; 2024: −160 M (reestructuración del handling de Iberia, ruptura con Air Europa e impuestos); 2025: ninguno; 1S26: −149 M de reestructuración de plantilla en Iberia (114) y British Airways (35), con más cargos anunciados para el 2S26 (BA y Aer Lingus). El BPA ajustado de la empresa (69,5 céntimos en 2025, 56,8 en 2024, 50,6 en 2023, 5,6 en 2022) usa el beneficio antes de extraordinarios y las acciones diluidas con la conversión del bono convertible; es la base de la historia del PER. Las reestructuraciones se repiten (2024 y 2026): no son del todo extraordinarias [1, 2, 3, 5].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '2T25', ingresos: 8862, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 1680 + 639, margen_ebitda_pct: 26.2, bpa: 0.236, vs_consenso: 'Semestre de 2025: EBIT de 1.878 M (+38 %) [11]' },
      { periodo: '3T25', ingresos: 9328, crecimiento_pct: 0.0, crecimiento_organico_pct: null, ebitda: 2053 + 663, margen_ebitda_pct: 29.1, bpa: 0.302, vs_consenso: 'Ligeramente por debajo en ingresos (debilidad de la clase turista en EE. UU.); la acción cayó un 11,5 % el 7-nov-2025 [10]' },
      { periodo: '4T25', ingresos: 7979, crecimiento_pct: -0.8, crecimiento_organico_pct: null, ebitda: 1093 + 708, margen_ebitda_pct: 22.6, bpa: 0.141, vs_consenso: null },
      { periodo: '1T26', ingresos: 7181, crecimiento_pct: 1.9, crecimiento_organico_pct: null, ebitda: 351 + 672, margen_ebitda_pct: 14.2, bpa: 0.065, vs_consenso: null },
      { periodo: '2T26', ingresos: 8883, crecimiento_pct: 0.2, crecimiento_organico_pct: null, ebitda: 1406 + 694, margen_ebitda_pct: 23.6, bpa: 0.164, vs_consenso: 'EBIT antes de extraordinarios de 1.406 M frente a ≈ 1.368 M esperados (Renta 4)' },
    ],
    ultima_presentacion: 'Semestral del 31-jul-2026: ingresos 16.064 M (+1,0 %), EBIT antes de extraordinarios 1.757 M (−6,4 %), margen 10,9 %; beneficio antes de extraordinarios 1.146 M; BPA ajustado 23,6 céntimos. Capacidad −0,1 %, ingreso unitario por asiento-kilómetro +2,4 % (+6,2 % a cambio constante), coste unitario sin combustible −1,3 %. Guía 2026: capacidad plana, combustible de 8.300-8.600 M, se recupera ≈ 60 % del sobrecoste del combustible; margen dentro del objetivo del 12-15 %. 2T26 con EBIT antes de extraordinarios de 1.406 M (−16,3 %). Siguiente: resultados del tercer trimestre el 6-nov-2026 [3, 4]. EBITDA trimestral = EBIT antes de extraordinarios + amortizaciones; BPA = básico publicado.',
    confianza: 'Alta',
  },
  balance: {
    historico: [
      { periodo: '2021', activo_total: 34406, activo_corriente: 10551, pasivo_corriente: 13278, pasivo_total: 33560, fondo_comercio: 347, intangibles: 2892, inmovilizado_material: 17161, existencias: 334, clientes: 735, proveedores: 3712, activos_contrato: null, pasivos_contrato: null, caja: 7943, deuda_financiera: 9973, arrendamientos: 9637, patrimonio_neto: 840, minoritarios: 6, reservas: -7403 },
      { periodo: '2022', activo_total: 39303, activo_corriente: 13244, pasivo_corriente: 16661, pasivo_total: 37281, fondo_comercio: 347, intangibles: 3209, inmovilizado_material: 18346, existencias: 353, clientes: 1330, proveedores: 5209, activos_contrato: null, pasivos_contrato: null, caja: 9599, deuda_financiera: 10365, arrendamientos: 9619, patrimonio_neto: 2016, minoritarios: 6, reservas: -6223 },
      { periodo: '2023', activo_total: 37680, activo_corriente: 10951, pasivo_corriente: 17705, pasivo_total: 34402, fondo_comercio: 347, intangibles: 2985, inmovilizado_material: 19776, existencias: 494, clientes: 1559, proveedores: 5590, activos_contrato: null, pasivos_contrato: null, caja: 6837, deuda_financiera: 7115, arrendamientos: 8967, patrimonio_neto: 3272, minoritarios: 6, reservas: -4895 },
      { periodo: '2024', activo_total: 43804, activo_corriente: 15186, pasivo_corriente: 19361, pasivo_total: 37628, fondo_comercio: 349, intangibles: 3293, inmovilizado_material: 21132, existencias: 617, clientes: 1774, proveedores: 6149, activos_contrato: null, pasivos_contrato: null, caja: 9828, deuda_financiera: 8699, arrendamientos: 8646, patrimonio_neto: 6170, minoritarios: 6, reservas: -1810 },
      { periodo: '2025', activo_total: 42849, activo_corriente: 13006, pasivo_corriente: 18548, pasivo_total: 35255, fondo_comercio: 346, intangibles: 3424, inmovilizado_material: 21445, existencias: 699, clientes: 1344, proveedores: 5721, activos_contrato: null, pasivos_contrato: null, caja: 8319, deuda_financiera: 7272, arrendamientos: 6995, patrimonio_neto: 7588, minoritarios: 6, reservas: 784 },
    ],
    vencimientos: [
      { anio: '2026', importe: 1764 },
      { anio: '2027', importe: 2059 },
      { anio: '2028-2030', importe: 5879 },
      { anio: '2031+', importe: 7854 },
    ],
    liquidez: 'Caja y depósitos de 9.175 M a 30-jun-2026 (8.747 de caja y 428 de depósitos) más líneas comprometidas sin disponer: liquidez total de 11.873 M, con una línea revolvente de 3.000 M USD ligada a sostenibilidad. 196 aviones libres de cargas que pueden servir de garantía [3].',
    rating: "S&P BBB (estable) y Moody's Baa2 (estable): grado de inversión [3].",
    coste_deuda_pct: 5.4,
    vida_media_anios: null,
    otros_pasivos: 'Ingresos diferidos por billetes y Avios de 10.782 M a 30-jun-2026 (8.739 M a 31-dic-2025): el cliente paga antes de volar; la parte estacional (≈ 2.066 M sobre diciembre) infla la caja de junio. Provisiones de 4.795 M (mantenimiento de aviones y motores arrendados, reestructuración, reclamaciones). Pensiones: superávit contable de 2.115 M (activos de 2.172, obligaciones de 57), sobre todo en los planes de British Airways (NAPS y APS), no disponible para el accionista. Litigio del IVA de IAG Loyalty con HMRC: 512 M pagados y activados (vista en el 4T26, decisión en 2027). Liquidación fiscal española de la fusión (máximo 108 M) y multa de Consumo por el equipaje de mano, no provisionada. Sin covenants financieros relevantes en bonos; pasivos financiados con activos de 5.217 M garantizados con aviones [1, 3].',
    comentario: 'La deuda neta bajó de 11.667 M (2021, con arrendamientos) a 5.948 M en 2025 y 4.692 M en junio de 2026 (0,6 veces el EBITDA de 12 meses), porque el flujo libre (3.100 M en 2025) superó con creces a los dividendos y a las recompras. Los arrendamientos bajan (9.637 → 6.907 M) porque IAG compra más aviones con financiación propia (pasivos garantizados con aviones). El circulante es estructuralmente negativo por los ingresos diferidos de billetes y Avios (≈ 26 % de las ventas): crecer genera caja y una caída de reservas la consume. En junio la caja está inflada por la estacionalidad; el puente de valoración lo corrige [1, 3].',
    confianza: 'Alta',
  },
  flujos: {
    historico: [
      { periodo: '2021', flujo_operativo: -141, capex: 744, pagos_arrendamientos: 1481, adquisiciones: null, desinversiones: null, dividendos: 0, recompras: 24, emision_acciones: null, intereses_en_financiacion: 0 },
      { periodo: '2022', flujo_operativo: 4854, capex: 3875, pagos_arrendamientos: 1455, adquisiciones: null, desinversiones: null, dividendos: 0, recompras: 23, emision_acciones: null, intereses_en_financiacion: 0 },
      { periodo: '2023', flujo_operativo: 4602, capex: 3282, pagos_arrendamientos: 1731, adquisiciones: null, desinversiones: null, dividendos: 0, recompras: 77, emision_acciones: null, intereses_en_financiacion: 0 },
      { periodo: '2024', flujo_operativo: 6372, capex: 2816, pagos_arrendamientos: 1737, adquisiciones: null, desinversiones: null, dividendos: 149, recompras: 202, emision_acciones: null, intereses_en_financiacion: 0 },
      { periodo: '2025', flujo_operativo: 6588, capex: 3442, pagos_arrendamientos: 1344, adquisiciones: null, desinversiones: null, dividendos: 471, recompras: 1243, emision_acciones: null, intereses_en_financiacion: 0 },
    ],
    comentario: 'El flujo operativo ya incluye los intereses pagados (IAG los presenta dentro de operaciones). Flujo libre después de capex y del principal de los arrendamientos: −2.366 M (2021), −476 (2022), −411 (2023), 1.819 (2024) y 1.802 M (2025); la empresa da 3.100 M en 2025 con su definición (sin arrendamientos y con ventas de aviones). En el 1S26: flujo operativo de 4.196 M (incluye la entrada estacional de reservas, 1.436 M de circulante) y capex de 1.291 M. El capex sube: ≈ 3.400 M en 2026, ≈ 4.900 M al año en 2027-2028 y ≈ 5.600 M en 2029-2031 por el pedido de largo radio; además entran aviones arrendados (altas de derechos de uso de 543 M en 2025 y 988 M en 2024) [1, 3, 5].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'KPMG Auditores, S.L.',
    anios_auditor: 5,
    opinion: 'Favorable (sin salvedades) en 2025. KPMG audita a IAG desde 2021 (antes, EY) [1].',
    comentario: 'Cuentas fiables y conservadoras: grado de inversión, sin compras que ensucien el balance, y extraordinarios explicados. Las zonas de juicio son las propias del sector: ingresos diferidos y caducidad de billetes y Avios (breakage), provisiones de mantenimiento, coberturas de combustible y divisas contabilizadas en patrimonio hasta que vencen (ganancias de 769 M en el 1S26), el superávit de pensiones de BA y el activo de 512 M del IVA de Loyalty, que depende de un juicio [1, 3].',
    senales: [
      { senal: 'Reestructuraciones repetidas', nivel: 'Baja', comentario: '160 M en 2024 y 149 M en el 1S26 (más en el 2S): la empresa las saca del resultado ajustado [3, 5].' },
      { senal: 'Activo del IVA de IAG Loyalty', nivel: 'Media', comentario: '512 M pagados a HMRC y activados como cobro; si IAG pierde en 2027, cargo a resultados [3].' },
      { senal: 'Coberturas en patrimonio', nivel: 'Baja', comentario: 'Las coberturas de combustible y divisa pasan por patrimonio y llegan al resultado al vencer: suavizan el coste, no lo eliminan [3].' },
      { senal: 'Superávit de pensiones', nivel: 'Baja', comentario: '2.115 M netos de activo de pensiones; no es caja disponible para el accionista [3].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Desde 2025: dividendo ordinario de ≈ 25 % del beneficio antes de extraordinarios (0,098 € por acción por 2025: 0,048 a cuenta y 0,05 final) y devolución de la caja sobrante cuando la deuda neta quede bajo 1,0-1,5 veces el EBITDA, con deuda neta/EBITDA objetivo por debajo de 1,8 veces. Recompras: 1.000 M en 2025, 500 M (feb-may 2026), 500 M (may-sep 2026; 97,7 M de acciones) y un tercer programa de hasta 500 M del 5-oct-2026 al 26-feb-2027 (Qatar Airways vende en proporción, 126 M). El dividendo a cuenta de 2026 se anunciará con el tercer trimestre [3, 6, 7, 8].',
    adquisiciones: [
      { anio: '2015', objetivo: 'Aer Lingus', importe: 1360, ev_ebitda: null, financiacion: 'Caja', resultado: 'Integrada; ganó dinero hasta 2025, pero en 2026 pierde con la competencia de EE. UU. en Irlanda (EBIT antes de extraordinarios de −34 M en el 1S26) [3].' },
      { anio: '2024', objetivo: 'Air Europa (100 %; abandonada)', importe: null, ev_ebitda: null, financiacion: 'Caja y acciones', resultado: 'Retirada por los remedios de la Comisión Europea; conserva el 20 % (234 M a valor razonable) y pagó ruptura [3, 5].' },
      { anio: '2026', objetivo: 'TAP (privatización; en proceso)', importe: null, ev_ebitda: null, financiacion: null, resultado: 'IAG compite con Lufthansa y Air France-KLM por una participación minoritaria; valoración de TAP de 1.900-2.100 M según la prensa portuguesa [9].' },
    ],
    comentario: 'Asignación de capital disciplinada desde 2024: reparto de dividendos y recompras de ≈ 1.700 M en 2025 y ≈ 1.500-2.000 M en 2026, a la vez que sube la inversión en flota. Las recompras se hacen a 4-7 veces el beneficio, baratas por definición, y reducen el número de acciones (4.611,7 M emitidas, ≈ 4.352 M en circulación a mediados de octubre) [3, 6, 7, 8].',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'British Airways', descripcion: 'Aerolínea de red de Londres (Heathrow, Gatwick), la mayor del grupo; fuerte en el Atlántico Norte premium.', tipo_resultado: 'EBIT', historico: [{ periodo: '2023', ingresos: 16028, resultado: 1650 }, { periodo: '2024', ingresos: 16457, resultado: 2422 }, { periodo: '2025', ingresos: 16679, resultado: 2597 }] },
      { nombre: 'Iberia', descripcion: 'Aerolínea de red de Madrid; líder entre Europa y Latinoamérica.', tipo_resultado: 'EBIT', historico: [{ periodo: '2023', ingresos: 6434, resultado: 940 }, { periodo: '2024', ingresos: 7091, resultado: 1027 }, { periodo: '2025', ingresos: 7687, resultado: 1313 }] },
      { nombre: 'Vueling', descripcion: 'Bajo coste de Barcelona, corto radio.', tipo_resultado: 'EBIT', historico: [{ periodo: '2023', ingresos: 3197, resultado: 396 }, { periodo: '2024', ingresos: 3259, resultado: 400 }, { periodo: '2025', ingresos: 3263, resultado: 393 }] },
      { nombre: 'Aer Lingus', descripcion: 'Aerolínea de Dublín; transatlántica con preautorización de EE. UU.', tipo_resultado: 'EBIT', historico: [{ periodo: '2023', ingresos: 2259, resultado: 225 }, { periodo: '2024', ingresos: 2362, resultado: 205 }, { periodo: '2025', ingresos: 2505, resultado: 282 }] },
      { nombre: 'IAG Loyalty', descripcion: 'Programa Avios y BA Holidays: vende puntos a bancos (American Express) y socios; margen alto y poco capital.', tipo_resultado: 'EBIT', historico: [{ periodo: '2023', ingresos: 1191, resultado: 321 }, { periodo: '2024', ingresos: 2512, resultado: 495 }, { periodo: '2025', ingresos: 2652, resultado: 548 }] },
      { nombre: 'Otros (LEVEL, IAG Cargo, centro)', descripcion: 'Largo radio de bajo coste, carga y servicios del grupo.', tipo_resultado: 'EBIT', historico: [{ periodo: '2023', ingresos: 344, resultado: -25 }, { periodo: '2024', ingresos: 419, resultado: -106 }, { periodo: '2025', ingresos: 427, resultado: -109 }] },
    ],
    geografias: [
      { nombre: 'Reino Unido', peso_pct: 35.5 },
      { nombre: 'España', peso_pct: 19.2 },
      { nombre: 'EE. UU.', peso_pct: 16.5 },
      { nombre: 'Resto del mundo', peso_pct: 28.9 },
    ],
    geografias_criterio: 'ingresos por lugar de venta del billete, 2025 [1]',
    kpis: [
      { kpi: 'Capacidad (millones de asientos-kilómetro)', valor_anterior: '351.435 (2025, +4,4 %)', valor_actual: '1S26 −0,1 %', variacion: 'plana', comentario: 'Guía 2026 plana (≈ +3 % al empezar el año): motores en revisión y Oriente Medio cerrado [2, 3].' },
      { kpi: 'Ingreso unitario de pasaje (PRASK)', valor_anterior: '2025 +1,1 %', valor_actual: '1S26 +2,4 % (+6,2 % a cambio constante)', variacion: '+2,4 %', comentario: 'Se repercute parte del queroseno; débil en el Atlántico Norte en clase turista [3].' },
      { kpi: 'Coste unitario sin combustible (céntimos por AKO)', valor_anterior: '6,18 (1S25)', valor_actual: '6,10 (1S26)', variacion: '−1,3 %', comentario: 'Guía 2026 plana [3].' },
      { kpi: 'Gasto en combustible', valor_anterior: '7.083 M (2025)', valor_actual: 'Guía 8.300-8.600 M (2026)', variacion: '+17-21 %', comentario: 'Cubierto ≈ 70 % del 2S26 [3].' },
      { kpi: 'Margen operativo antes de extraordinarios', valor_anterior: '15,1 % (2025)', valor_actual: '10,9 % (1S26)', variacion: '−0,9 puntos frente al 1S25', comentario: 'Objetivo a medio plazo del 12-15 % [2, 3].' },
      { kpi: 'ROIC (definición de la empresa)', valor_anterior: '17,3 % (2024)', valor_actual: '18,5 % (2025)', variacion: '+1,2 puntos', comentario: 'Objetivo del 13-16 % [2].' },
    ],
    clientes: 'Millones de pasajeros particulares y empresas; ninguna concentración. American Express y otros bancos compran Avios a IAG Loyalty con contratos plurianuales. ≈ 31 % de la capacidad está en el Atlántico Norte, donde BA, Iberia y Aer Lingus comparten ingresos con American Airlines en una empresa conjunta (≈ 49 % de cuota con socios) [2, 3].',
    confianza: 'Alta',
  },
  huecos: [],
  fuentes: [
    { id: 1, titulo: 'Annual Report and Accounts 2025 (ESEF; cuentas consolidadas 2025 y comparativos, notas, gobierno, remuneración)', editor: 'International Consolidated Airlines Group, S.A. (filings.xbrl.org)', tipo: 'Primaria', fecha: '2026-03-31', url: ESEF },
    { id: 2, titulo: 'IAG FY 2025 Results (comunicado y PDF íntegro con estados financieros)', editor: 'IAG (RNS, London Stock Exchange)', tipo: 'Primaria', fecha: '2026-02-26', url: 'https://www.rns-pdf.londonstockexchange.com/rns/6078U_1-2026-2-26.pdf' },
    { id: 3, titulo: 'IAG Half Year Financial Report 2026 (enero-junio, PDF íntegro)', editor: 'IAG (RNS, London Stock Exchange)', tipo: 'Primaria', fecha: '2026-07-31', url: 'https://www.rns-pdf.londonstockexchange.com/rns/6982O_1-2026-7-31.pdf' },
    { id: 4, titulo: 'IAG 1st Quarter Results 2026 y 3rd Quarter Results 2025', editor: 'IAG (RNS)', tipo: 'Primaria', fecha: '2026-05-07', url: 'https://www.rns-pdf.londonstockexchange.com/rns/4939D_1-2026-5-7.pdf' },
    { id: 5, titulo: 'IAG FY 2023, FY 2022 y FY 2024 Results (comparativos 2021-2024, segmentos, extraordinarios)', editor: 'IAG (RNS vía Investegate)', tipo: 'Primaria', fecha: '2024-02-29', url: `${INV}iag-fy-2023-results-/8062077` },
    { id: 6, titulo: 'Final dividend and return of excess cash; Interim dividend declaration', editor: 'IAG (RNS vía Investegate)', tipo: 'Primaria', fecha: '2026-02-26', url: `${INV}final-dividend-and-return-of-excess-cash-/9449580` },
    { id: 7, titulo: 'Launch of €500 million share buyback programme (5-oct-2026) y Completion of €500 million share buyback programme (10-sep-2026)', editor: 'IAG (RNS vía Investegate)', tipo: 'Primaria', fecha: '2026-10-05', url: `${INV}launch-of-500-million-share-buyback-programme-/9805075` },
    { id: 8, titulo: 'Total voting rights (1-oct-2026) y Transaction in own shares (hasta el 16-oct-2026)', editor: 'IAG (RNS vía Investegate)', tipo: 'Primaria', fecha: '2026-10-16', url: `${INV}transaction-in-own-shares/9830283` },
    { id: 9, titulo: 'Privatización de TAP: valoración y candidatos (Lufthansa, Air France-KLM, IAG)', editor: 'Prensa portuguesa (eco.sapo.pt)', tipo: 'Prensa', fecha: '2026-09', url: 'https://eco.sapo.pt/' },
    { id: 10, titulo: 'IAG 3rd Quarter Results 2025 (PDF íntegro)', editor: 'IAG (RNS)', tipo: 'Primaria', fecha: '2025-11-06', url: 'https://www.rns-pdf.londonstockexchange.com/rns/5744G_1-2025-11-6.pdf' },
    { id: 11, titulo: 'IAG Half Year Report 2025', editor: 'IAG (RNS vía Investegate)', tipo: 'Primaria', fecha: '2025-08-01', url: `${INV}half-year-report/9018031` },
  ],
};
w('A', A);

// ───────────── B: sector y competencia ─────────────
const B = {
  _estado: 'Completa. Datos del sector de los informes de IAG (cuotas, capacidad, combustible) y de los comparables cotizados (Yahoo); sin fuente de pago para el tamaño del mercado europeo.',
  sector: {
    definicion: 'Mercado relevante: el transporte aéreo de pasajeros desde y hacia Europa occidental (Reino Unido, España, Irlanda), con tres negocios distintos: el largo radio de red (Atlántico Norte y Latinoamérica, ≈ 60 % del resultado de IAG), el corto radio europeo frente a las de bajo coste (Ryanair, easyJet, Wizz) y la fidelización (Avios). IAG compite por rutas y aeropuertos, no por un mercado único [1, 2].',
    tamano: 'La capacidad mundial ronda los 10 billones de asientos-kilómetro; IAG ofrece ≈ 351.000 millones (2025), ≈ 3,5 % del mundo. En el Atlántico Norte, la empresa conjunta de IAG con American Airlines tiene ≈ 49 % de cuota con socios [1, 2].',
    unidad_serie: 'miles de millones de asientos-kilómetro ofrecidos por IAG',
    serie: [
      { anio: '2019', tamano: 337 }, { anio: '2023', tamano: 323 }, { anio: '2024', tamano: 337 }, { anio: '2025', tamano: 351 },
    ],
    tcac_historico_pct: 1.0,
    tcac_previsto_pct: 3.0,
    cr5_pct: 70,
    estructura: 'Oligopolio',
    drivers: [
      { driver: 'Precio del queroseno', efecto: '−', horizonte: 'Corto plazo', evidencia: 'Guerra de EE. UU. con Irán desde el 28-feb-2026 y cierres de Ormuz: Brent de 109,7 USD el 19-oct-2026 (86 en julio, 83-84 en agosto); el gasóleo de calefacción a 4,76 USD/galón al contado y 3,58 en dic-27. El combustible pasa de 7.083 M en 2025 a 8.300-8.600 M en 2026; IAG recupera ≈ 60 % con precio y cubre ≈ 70 % del 2S26 [2, 3, 4].' },
      { driver: 'Capacidad transatlántica', efecto: '−', horizonte: 'Medio plazo', evidencia: 'Las aerolíneas de EE. UU. crecen hacia el sur de Europa e Irlanda (Aer Lingus: +45 % de capacidad de EE. UU. en 12 meses y PRASK −3,8 % en el 1S26); el Atlántico Norte es el 30,6 % de los AKO de IAG [2].' },
      { driver: 'Disponibilidad de motores (Pratt & Whitney GTF, Rolls-Royce Trent)', efecto: '−', horizonte: 'Medio plazo', evidencia: 'Inspecciones del GTF de los A320neo/A321neo dejan aviones en tierra (Vueling arrendó 9 A320ceo usados); la durabilidad de los Trent 1000 y XWB de los 787 y A350 limita la capacidad de largo radio desde 2025. IAG pasó de +3 % a 0 % de capacidad en 2026 [1, 2].' },
      { driver: 'Demanda premium y de ocio', efecto: '+', horizonte: 'Medio plazo', evidencia: 'Ingreso unitario estable o al alza con demanda de clase premium y vacacional; la clase turista en EE. UU. se debilitó desde el 3T25 [2, 4].' },
      { driver: 'Escasez de aviones nuevos', efecto: '+', horizonte: 'Largo plazo', evidencia: 'Airbus y Boeing van con años de retraso; la oferta del sector crece menos de lo que querría y sostiene los precios [1].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 4, justificacion: 'Alta en corto radio (bajo coste) y creciente en el Atlántico Norte (Delta, United, American y Norse); limitada en los aeropuertos saturados (Heathrow).' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Los slots de Heathrow y Madrid, la flota y las licencias limitan la entrada; el bajo coste entra en corto radio con facilidad.' },
      { fuerza: 'Poder de los proveedores', intensidad: 5, justificacion: 'Dos fabricantes de aviones (Airbus, Boeing), tres de motores (CFM, Pratt & Whitney, Rolls-Royce), aeropuertos regulados y petroleras: todos con poder de precio.' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'El pasajero compara precios en segundos; la empresa y el viajero premium son menos sensibles, y los Avios atan.' },
      { fuerza: 'Sustitutos', intensidad: 2, justificacion: 'Tren de alta velocidad en rutas cortas (Madrid-Barcelona) y videoconferencia en viajes de empresa; nada en largo radio.' },
    ],
    ciclo: {
      posicion: 'Pico',
      comentario: 'Los márgenes de 2024-2025 (13,8 % y 15,1 % de EBIT) son los más altos de la historia de IAG, por encima de 2015-2019 (12-14 %), con oferta escasa por la falta de aviones y motores. 2026 ya muestra el giro: queroseno de guerra, capacidad transatlántica de EE. UU. y margen del 1S26 del 10,9 %. Las aerolíneas son de las industrias más cíclicas: el beneficio de IAG se hundió en 2009 y en 2020 [1, 2, 3].',
    },
    regulacion: 'Derechos de emisión europeos (EU ETS) y británicos, mandato de combustible sostenible (2 % en 2025, 6 % en 2030 en la UE y el Reino Unido), tasas aeroportuarias reguladas (Heathrow H7), impuesto de pasajeros británico (APD, 1.099 M en 2025). Propiedad y control: IAG debe seguir siendo europea y británica a la vez para conservar las licencias y los derechos de tráfico; limita el voto extranjero [1].',
    tendencias: 'Consolidación europea (Lufthansa con ITA, Air France-KLM con SAS, privatización de TAP), crecimiento de las de bajo coste en largo radio, combustible sostenible y renovación de flota (IAG tiene 71 aviones de largo radio pedidos para 2028-2033), e IA en precios, mantenimiento y atención al cliente [1, 2, 9].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 3.5,
    posicion: 'Uno de los tres grandes grupos de red europeos (con Lufthansa y Air France-KLM) y el más rentable: margen operativo del 15,1 % en 2025 frente al ≈ 7-8 % de Lufthansa y Air France-KLM [1, 3].',
    competidores: [
      { nombre: 'Lufthansa Group', pais: 'Alemania', ticker: 'LHA', ingresos: 41101, cuota_pct: null, margen_ebit_pct: 4.5, comentario: 'Mayor grupo europeo por ingresos; menos rentable por costes laborales y huelgas; compró el 41 % de ITA.' },
      { nombre: 'Air France-KLM', pais: 'Francia', ticker: 'AF', ingresos: 34155, cuota_pct: null, margen_ebit_pct: 6.0, comentario: 'Rival en París y Ámsterdam; balance más débil; entra en SAS.' },
      { nombre: 'Ryanair', pais: 'Irlanda', ticker: 'RYA', ingresos: 15591, cuota_pct: null, margen_ebit_pct: 16, comentario: 'Bajo coste dominante en corto radio europeo; compite con Vueling, Iberia Express y BA Euroflyer.' },
      { nombre: 'easyJet', pais: 'Reino Unido', ticker: 'EZJ', ingresos: 10526, cuota_pct: null, margen_ebit_pct: 6, comentario: 'Rival en Gatwick y en el corto radio británico.' },
      { nombre: 'Delta, United y American', pais: 'EE. UU.', ticker: 'DAL/UAL/AAL', ingresos: 193039, cuota_pct: null, margen_ebit_pct: 8, comentario: 'Delta (con Virgin Atlantic y Air France-KLM) y United (con Lufthansa) compiten en el Atlántico Norte; American es socia de IAG.' },
    ],
    foso: {
      veredicto: 'Estrecho',
      tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 3, evidencia: 'Redes de conexión en Heathrow y Madrid, alianza oneworld y empresa conjunta transatlántica con American: más destinos y frecuencias atraen más pasajeros de conexión.' },
        { fuente: 'Costes de cambio', puntuacion: 2, evidencia: 'Avios y estatus de viajero frecuente; contratos con American Express y bancos.' },
        { fuente: 'Intangibles', puntuacion: 3, evidencia: 'Slots de Heathrow (≈ 50 % de los de BA) y de Madrid, escasos y valiosos; marcas.' },
        { fuente: 'Ventaja en costes', puntuacion: 1, evidencia: 'Vueling y LEVEL son de bajo coste, pero BA e Iberia no; el combustible y los aviones cuestan lo mismo para todos.' },
        { fuente: 'Escala eficiente', puntuacion: 2, evidencia: 'Hubs dominados (BA en Heathrow, Iberia en Madrid) donde un rival no puede replicar la red.' },
      ],
    },
    amenazas: 'Lo que más puede erosionar el resultado es la capacidad: las aerolíneas de EE. UU. abren rutas a Europa del sur e Irlanda, las de bajo coste empiezan el largo radio y la recuperación de los motores devolverá oferta al mercado en 2027-2028. Si a eso se suma un queroseno caro o una recesión, el margen vuelve hacia el 8-10 % [2, 3].',
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'IAG es el grupo dueño de British Airways, Iberia, Vueling, Aer Lingus y LEVEL, y del programa de puntos Avios (IAG Loyalty). Con 627 aviones y ≈ 76.000 empleados, transporta ≈ 125 millones de pasajeros al año desde Londres, Madrid, Barcelona y Dublín; ingresó 33.213 M de euros en 2025 [A].',
    como_gana_dinero: 'Vende billetes (85 % de los ingresos), carga (4 %) y puntos Avios y vacaciones (≈ 8 %). Gana sobre todo en largo radio (Atlántico Norte con American y Latinoamérica con Iberia), con clientes premium y de conexión en sus hubs. Los billetes se cobran antes de volar: el negocio se financia con los anticipos de los clientes.',
  },
  huecos: [
    { seccion: 'sector', campo: 'Serie del tamaño del mercado europeo (asientos-kilómetro de todas las aerolíneas)', tipo: 'Complemento', intentos: '1) IATA (informes públicos sin serie por región); 2) Eurocontrol (vuelos, no AKO); 3) informes de IAG (solo su capacidad)', decision: 'Se da la capacidad de IAG como serie y la cuota aproximada; el crecimiento esperado del 3 % es la guía de IAG (2-4 % al año).' },
  ],
  fuentes: [
    { id: 1, titulo: 'Annual Report and Accounts 2025 (estrategia, riesgos, mercado, flota)', editor: 'IAG (filings.xbrl.org)', tipo: 'Primaria', fecha: '2026-03-31', url: ESEF },
    { id: 2, titulo: 'IAG Half Year Financial Report 2026', editor: 'IAG (RNS)', tipo: 'Primaria', fecha: '2026-07-31', url: 'https://www.rns-pdf.londonstockexchange.com/rns/6982O_1-2026-7-31.pdf' },
    { id: 3, titulo: 'Datos de mercado de comparables (ingresos, EBITDA, valor de empresa)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/IAG.L/' },
    { id: 4, titulo: 'Futuros del Brent (BZ) y del gasóleo de calefacción (HO), curva a dic-27 y dic-28', editor: 'Yahoo Finance (NYMEX/ICE)', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/BZ=F/' },
    { id: 9, titulo: 'Lufthansa e ITA; privatización de TAP', editor: 'Prensa (eco.sapo.pt)', tipo: 'Prensa', fecha: '2026-09', url: 'https://eco.sapo.pt/' },
  ],
};
w('B', B);

// ───────────── C: directivos y gobierno ─────────────
const C = {
  _estado: 'Completa. Consejo, remuneración y accionistas del informe anual 2025; cambios de 2026 de los comunicados (RNS); votos de la junta de 2025.',
  directivos: {
    equipo: [
      { nombre: 'Luis Gallego', cargo: 'Consejero delegado', desde: '2020', participacion_pct: 0.03, trayectoria: 'Ingeniero aeronáutico; dirigió Iberia Express y después Iberia (2014-2020), donde hizo la reestructuración; consejero delegado de IAG desde septiembre de 2020, en plena COVID. Ha llevado el grupo a márgenes récord y a devolver caja [1].' },
      { nombre: 'José Antonio Barrionuevo', cargo: 'Director financiero', desde: '2026', participacion_pct: null, trayectoria: 'Sustituye a Nicholas Cadbury (anunciado el 9-ene-2026) desde junio de 2026; venía de dirigir la estrategia y las finanzas del grupo [2].' },
    ],
    historial_guidance: [
      { anio: '2023', guia: 'Beneficio operativo de 3.200-3.400 M (subida de julio)', real: '3.507 M', cumplida: 'Sí' },
      { anio: '2024', guia: 'Crecimiento de capacidad ≈ 6 % y margen en el objetivo', real: '+4,8 % de capacidad (motores) y margen del 13,8 %', cumplida: 'En parte' },
      { anio: '2025', guia: 'Capacidad ≈ +3 %, margen 12-15 %', real: 'Capacidad +4,4 %, margen del 15,1 %', cumplida: 'Sí' },
      { anio: '2026', guia: 'Capacidad ≈ +3 %, combustible de 7.000-7.400 M (febrero)', real: 'Capacidad plana y combustible de 8.300-8.600 M (julio): guerra de Irán y motores', cumplida: 'No' },
    ],
    comentario: 'Equipo con buen historial: sacó a IAG de la COVID sin ampliación adicional tras la de 2020, recuperó márgenes récord y empezó a devolver caja. Fallos fuera de su control (motores, guerra) en 2024 y 2026, y uno propio: la compra de Air Europa, abandonada tras años de intentos. Relevo ordenado del director financiero en 2026 [1, 2].',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Javier Ferrán', cargo: 'Presidente (no ejecutivo)', tipo: 'Independiente', desde: '2021', comisiones: 'Nombramientos' },
      { nombre: 'Luis Gallego', cargo: 'Consejero delegado', tipo: 'Ejecutivo', desde: '2020', comisiones: null },
      { nombre: 'Heather Ann McSharry', cargo: 'Consejera independiente coordinadora', tipo: 'Independiente', desde: null, comisiones: 'Remuneración' },
      { nombre: 'Eva Castillo', cargo: 'Consejera', tipo: 'Independiente', desde: null, comisiones: null },
      { nombre: 'Margaret Ewing', cargo: 'Consejera', tipo: 'Independiente', desde: null, comisiones: 'Auditoría' },
      { nombre: 'Maurice Lam', cargo: 'Consejero', tipo: 'Independiente', desde: null, comisiones: null },
      { nombre: 'Simone Menne', cargo: 'Consejera (presidenta de Auditoría desde jun-2026)', tipo: 'Independiente', desde: '2025', comisiones: 'Auditoría' },
      { nombre: 'Päivi Rekonen', cargo: 'Consejera', tipo: 'Independiente', desde: '2025', comisiones: null },
      { nombre: 'Daniel Pinto', cargo: 'Consejero', tipo: 'Independiente', desde: '2026', comisiones: null },
      { nombre: 'Bruno Matheu', cargo: 'Consejero', tipo: 'Dominical', desde: null, comisiones: null },
      { nombre: 'Robin Phillips', cargo: 'Consejero', tipo: 'Dominical', desde: null, comisiones: null },
    ],
    presidente_ceo_separados: true,
    presidente_ejecutivo: false,
    consejero_coordinador: true,
    una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: true,
    variable_ligado_rentabilidad: true,
    auditoria_independiente: true,
    insiders_sin_operaciones: false,
    accionista_control: false,
    presidente_vinculado_control: false,
    cambios_cupula_24m: 1,
    voto_remuneracion_pct: 93.37,
    voto_remuneracion_contra_pct: 1.25,
    voto_remuneracion_contra_libre_pct: null,
    voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 7.25, fijo: 1.26, variable_corto: 2.02, variable_largo: 3.97, ratio_salario_medio: 89 },
    remuneracion: 'El consejero delegado cobró 6,11 M GBP en 2025 (≈ 7,25 M EUR a 1,186): fijo de 1,06 M, variable anual de 1,70 M y plan a largo plazo de 3,34 M (este último sube con la cotización: la acción se multiplicó por 2,7 en 2024-2025). Ratio frente a la mediana de la plantilla: 89 a 1. El plan a largo plazo mide beneficio por acción, rentabilidad total frente al sector y sostenibilidad. En la junta de 2025, el informe de remuneración tuvo un 93,37 % a favor y la política un 83,86 % (10,97 % en contra) [1, 3].',
    accionistas: [
      { nombre: 'Qatar Airways', pct: 25.14, tipo: 'Corporativo', variacion: 'Estable (24,995 % del voto declarado); vende en proporción a las recompras; dos consejeros dominicales' },
      { nombre: 'Capital Research and Management', pct: 5.03, tipo: 'Fondo', variacion: 'Estable' },
      { nombre: 'BlackRock', pct: 3.45, tipo: 'Fondo', variacion: 'Estable' },
      { nombre: 'Autocartera', pct: 5.6, tipo: 'Empresa', variacion: '≈ 260 M de acciones en autocartera tras las recompras; se amortizan periódicamente' },
    ],
    insiders: [
      { fecha: '2026-06-18', persona: 'Jorge Saco (directivo)', operacion: 'Venta', acciones: null, importe: null },
      { fecha: '2026-05-29', persona: 'Nicholas Cadbury (director financiero saliente)', operacion: 'Venta', acciones: null, importe: null },
    ],
    control_y_defensas: 'Sin accionista de control: Qatar Airways tiene ≈ 25 %, con dos consejeros, y vende en proporción a las recompras para no superar ese nivel. Los estatutos permiten limitar el voto y la propiedad de los no europeos (y no británicos) para conservar las licencias de vuelo: es una defensa de hecho frente a una opa extranjera. Las operaciones con Qatar Airways (código compartido, empresa conjunta de carga y arrendamientos) son vinculadas [1].',
    alertas: [
      'Qatar Airways (25 %) es a la vez accionista, socia comercial y competidora en el Golfo; su peso limita la capacidad de una opa.',
      'Ventas de directivos en 2026 (Jorge Saco a 4,491 GBP el 18-jun; Nicholas Cadbury a 4,072 GBP el 29-may) y ninguna compra relevante; la política de remuneración tuvo un 11 % en contra en 2025 [3, 4].',
    ],
    confianza: 'Alta',
  },
  huecos: [
    { seccion: 'gobierno', campo: 'Acciones e importe de las ventas de directivos de 2026', tipo: 'Complemento', intentos: '1) RNS de PDMR de Investegate (precio, sin tabla legible de acciones); 2) informe anual; 3) Yahoo insider', decision: 'Se dan la fecha, la persona y el precio (Saco a 4,491 GBP; Cadbury a 4,072 GBP) sin importe.' },
  ],
  fuentes: [
    { id: 1, titulo: 'Annual Report and Accounts 2025 (gobierno corporativo, remuneración, participaciones)', editor: 'IAG (filings.xbrl.org)', tipo: 'Primaria', fecha: '2026-03-31', url: ESEF },
    { id: 2, titulo: 'Chief Financial Officer Transition; Directorate change', editor: 'IAG (RNS vía Investegate)', tipo: 'Primaria', fecha: '2026-01-09', url: `${INV}chief-financial-officer-transition-/9343608` },
    { id: 3, titulo: 'Result of AGM 2025', editor: 'IAG (RNS vía Investegate)', tipo: 'Primaria', fecha: '2025-06-19', url: `${INV}result-of-agm/9625917` },
    { id: 4, titulo: 'Director/PDMR shareholding (ventas de 2026)', editor: 'IAG (RNS vía Investegate)', tipo: 'Primaria', fecha: '2026-06-18', url: `${INV}director-pdmr-shareholding/9635150` },
  ],
};
w('C', C);

// ───────────── D: identificación, consenso, bolsa, múltiplos, comparables, transacciones ─────────────
const TCGBP = 1.186, TCUSD = 1 / 1.1216;
const comp = [
  ['Ryanair', 'RYA', 'IE', 23566, 21051 / 15591, 6.15, 13.6, 3422 / 15591],
  ['easyJet', 'EZJ', 'GB', 5110 * TCGBP, 4712 / 10526, 5.66, 18.3, 832 / 10526],
  ['Lufthansa', 'LHA', 'DE', 8540, 15399 / 41101, 4.85, 6.1, 3174 / 41101],
  ['Air France-KLM', 'AF', 'FR', 2712, 14311 / 34155, 3.83, 2.5, 3740 / 34155],
  ['Jet2', 'JET2', 'GB', 2536 * TCGBP, 704 / 7482, 1.15, 8.6, 610 / 7482],
  ['Delta Air Lines', 'DAL', 'US', 49511 * TCUSD, 65467 / 71800, 8.72, 10.9, 7507 / 71800],
  ['United Airlines', 'UAL', 'US', 31309 * TCUSD, 48224 / 62902, 6.80, 8.3, 7091 / 62902],
  ['American Airlines', 'AAL', 'US', 7881 * TCUSD, 35232 / 58337, 10.45, 13.1, 3372 / 58337],
].map(([nombre, ticker, pais, cap, evv, eve, per, m]) => ({
  nombre, ticker, pais, capitalizacion: Math.round(cap), ev_ventas: Math.round(evv * 100) / 100, ev_ebitda_ltm: eve, ev_ebitda_ntm: null,
  per_ntm: per, crecimiento_pct: null, margen_ebitda_pct: Math.round(m * 1000) / 10, roic_pct: null, dn_ebitda: null, fcf_yield_pct: null,
}));
const pers = comp.map((c) => c.per_ntm).sort((a, b) => a - b);
const medPer = (pers[3] + pers[4]) / 2;

const D = {
  _estado: 'Completa. Precio y consenso de Yahoo del 19-oct-2026 (cierre de Londres a las 15:30 UTC); bolsa de bolsa.mjs (IAG.MC en EUR frente al STOXX Europe 600 y su sector de viajes y ocio); movimiento.mjs de IAG.L.',
  _per_mediana_comparables: medPer,
  identificacion: {
    nombre: 'International Consolidated Airlines Group, S.A.', nombre_corto: 'IAG', ticker: 'IAG', isin: 'ES0177542018',
    mercado: 'Bolsa de Londres (LSE, segmento principal) y bolsas españolas (Mercado Continuo)', indice_referencia: 'FTSE 100 e IBEX 35',
    pais: 'España', pais_iso: 'ES', sector: 'Industria', industria: 'Aerolíneas', sede: 'Madrid (domicilio social); oficinas en Londres',
    fundacion: '2011 (fusión de British Airways e Iberia)', empleados: 75871, web: 'https://www.iairgroup.com',
    precio: 4.8887, fecha_precio: '2026-10-19', acciones: 4352.1, capitalizacion_publicada: 21277,
    free_float_pct: 70, max_52s: 5.72, min_52s: 3.82,
    volumen_medio_diario: '≈ 25,8 M EUR/día en Madrid, más el volumen de Londres (precio en EUR: 412,2 peniques × 0,01186; máximo y mínimo de 52 semanas en EUR de Madrid)',
    proximos_resultados: '2026-11-06 (tercer trimestre de 2026)',
  },
  consenso: {
    guidance: 'Guía de 2026 (31-jul-2026): capacidad plana, coste unitario sin combustible plano, combustible de 8.300-8.600 M (9.000 M en mayo), capex ≈ 3.400 M con 16 entregas; IAG espera recuperar ≈ 60 % del sobrecoste del combustible y un margen dentro del objetivo del 12-15 %. 57 % del 2S reservado, con ingreso reservado en línea con 2025. A medio plazo: margen del 12-15 %, ROIC del 13-16 %, deuda neta < 1,8 veces el EBITDA, capacidad +2-4 % al año [A3].',
    estimaciones: [
      { periodo: '2026e', ingresos: 34217, ebitda: null, ebit: null, bpa: 0.609, dpa: null, fuente: 'Yahoo (IAG.L), 11 analistas [2]' },
      { periodo: '2027e', ingresos: 36087, ebitda: null, ebit: null, bpa: 0.724, dpa: null, fuente: 'Yahoo (IAG.L), 12 analistas [2]' },
    ],
    recomendaciones: { n_analistas: 15, comprar: 13, mantener: 1, vender: 1, po_medio: 535, po_min: 407.6, po_max: 634.2 },
    revisiones: 'A la baja por el combustible: el BPA de 2026 del consenso de IAG.L pasó de 0,627 EUR hace 90 días a 0,609, y el de 2027 de 0,783 a 0,724 (−7,5 %). En Madrid (IAG.MC, 11 analistas) el consenso es 0,650 y 0,763 EUR, con objetivo medio de 6,00 EUR. Los objetivos de precio bajaron en marzo (Deutsche Bank de 500 a 460 peniques) y volvieron a subir en verano (Deutsche Bank 540, BofA 570); Renta 4 mantiene 5,20 EUR y sobreponderar tras el semestre [2, 6].',
    base_ebitda: 'EBITDA del consenso no disponible: se usa el BPA',
    ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    tipo_rentabilidad: 'total (con dividendos)',
    rentabilidades: [
      { periodo: 'En el año', accion_pct: 3.8, indice_pct: 10.6, sector_pct: -0.3 },
      { periodo: '1 año', accion_pct: 10.8, indice_pct: 15.9, sector_pct: 6.6 },
      { periodo: '3 años (anual)', accion_pct: 46.6, indice_pct: 16.5, sector_pct: 11.2 },
      { periodo: '5 años (anual)', accion_pct: 21.1, indice_pct: 9.4, sector_pct: 1.8 },
      { periodo: '10 años (anual)', accion_pct: 8.2, indice_pct: 9.4, sector_pct: 3.5 },
    ],
    anual: [
      { anio: '2020', accion_pct: -62.6, indice_pct: -1.8 }, { anio: '2021', accion_pct: -4.9, indice_pct: 24.6 },
      { anio: '2022', accion_pct: -18.4, indice_pct: -10.3 }, { anio: '2023', accion_pct: 28.1, indice_pct: 15.5 },
      { anio: '2024', accion_pct: 106.6, indice_pct: 8.5 }, { anio: '2025', accion_pct: 34.3, indice_pct: 20.5 },
    ],
    beta: 1.39,
    volatilidad_pct: 36.3,
    max_drawdown_pct: -49.2,
    tramo_drawdown: '2022-02 → 2022-09',
    posicion_corta_pct: null,
    comentario: 'Índice: STOXX Europe 600 (EXSA.DE); sector: STOXX Europe 600 Travel & Leisure (EXV9.DE); IAG.MC en euros. La acción se multiplicó en 2023-2025 (+28 %, +107 % y +34 %) al recuperar márgenes y devolver caja, y en 2026 va por detrás del índice (+3,8 % frente a +10,6 %) por el queroseno de la guerra de Irán. Beta semanal de 5 años de 1,58 (1,39 ajustada; la mensual, 2,18); volatilidad del 36 %. En diez años, la acción rinde un 8,2 % anual, por debajo del índice: 2020 borró la década anterior [1].',
    contexto: {
      movimiento: { fecha: '2026-10-19', var_1m_pct: -1.7, var_3m_pct: -6.7, var_6m_pct: 5.1, var_12m_pct: 4.1, dist_max_52s_pct: -15.5, dist_min_52s_pct: 20.4, dist_max_historico_pct: -15.5, tendencia: 'lateral', volatilidad_60d_pct: 24, avisos: [] },
      movimientos_fuertes: [
        { periodo: 'nov 2025', var_pct: -11.5, causa: 'Resultados del 3T25 (7-nov): ingresos planos y debilidad de la clase turista en EE. UU. [A4].', veredicto: 'no cambia', condicion: null },
        { periodo: 'feb-mar 2026', var_pct: -25, causa: 'Resultados de 2025 (27-feb, −7,8 %) y comienzo de la guerra de EE. UU. con Irán el 28-feb: queroseno disparado, cierre del espacio aéreo de Oriente Medio; mínimo de 342 peniques en marzo [6].', veredicto: 'no cambia', condicion: null },
        { periodo: 'may-jun 2026', var_pct: 28, causa: 'Reapertura de Ormuz y bajada del crudo; máximo de 52 semanas en junio (subida de un día del 21,8 % el 18-jun) [6].', veredicto: 'no cambia', condicion: null },
        { periodo: 'jul 2026', var_pct: -12.2, causa: 'Restablecimiento del bloqueo de Ormuz (14-jul) y crudo al alza; mayor caída de un mes hasta el 23-jul [6].', veredicto: 'no cambia', condicion: null },
      ],
      noticias: [
        { fecha: '2025-11-07', tipo: 'resultados', hecho: 'Resultados del 3T25: la acción cae un 11,5 % [A4].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-02-26', tipo: 'resultados', hecho: 'Resultados de 2025 (margen del 15,1 %) y devolución de caja sobrante; la acción cae un 7,8 % al día siguiente [A2].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-02-28', tipo: 'macro', hecho: 'Guerra de EE. UU. con Irán; Oriente Medio (≈ 3 % de la capacidad) suspendido el resto del año [A3].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-05-08', tipo: 'resultados', hecho: 'Primer trimestre y aviso de combustible (≈ 9.000 M en 2026) [A4].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-07-31', tipo: 'resultados', hecho: 'Semestre: EBIT antes de extraordinarios de 1.757 M, mejor de lo esperado en el 2T; combustible rebajado a 8.300-8.600 M [A3].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-09-10', tipo: 'macro', hecho: 'Nuevos ataques en Ormuz: Brent por encima de 100 USD (109,7 el 19-oct) [6].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-05', tipo: 'capital', hecho: 'Tercer programa de recompra de hasta 500 M (hasta el 26-feb-2027) [A7].', veredicto: 'no cambia', condicion: null },
      ],
      proximos_resultados: '2026-11-06 (tercer trimestre de 2026)',
      veredicto: 'no cambia',
      condicion: null,
      comentario: 'La acción no viene de una caída que cambie la tesis: está un 15,5 % bajo su máximo de 52 semanas, un 20 % sobre el mínimo y en tendencia lateral (−1,4 % frente a su media de 200 sesiones). Los movimientos fuertes del año los explican el queroseno y la guerra de Irán (marzo y julio a la baja, mayo-junio al alza) y los resultados trimestrales. Nada de eso es nuevo para la tesis: el precio del crudo ya está en nuestro modelo. El 6-nov-2026 publica el tercer trimestre, que puede mover el precio más de un 5 % en cualquier dirección (lo hizo el 7-nov-2025, −11,5 %); no hay ampliaciones ni decisiones regulatorias con fecha antes [A3, 1].',
    },
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: [
      { anio: '2017', precio_cierre: 7.34, ev_ebitda_ntm: null, per_ntm: 6.2, excluir: false },
      { anio: '2018', precio_cierre: 6.91, ev_ebitda_ntm: null, per_ntm: 5.9, excluir: false },
      { anio: '2021', precio_cierre: 1.70, ev_ebitda_ntm: null, per_ntm: 30.4, excluir: true },
      { anio: '2022', precio_cierre: 1.39, ev_ebitda_ntm: null, per_ntm: 2.75, excluir: false },
      { anio: '2023', precio_cierre: 1.78, ev_ebitda_ntm: null, per_ntm: 3.13, excluir: false },
      { anio: '2024', precio_cierre: 3.63, ev_ebitda_ntm: null, per_ntm: 5.22, excluir: false },
      { anio: '2025', precio_cierre: 4.75, ev_ebitda_ntm: null, per_ntm: 7.3, excluir: false },
    ],
    comentario: 'PER adelantado = cierre del año ÷ BPA ajustado real del año siguiente (2018: 1,177 EUR; 2019: 1,168; 2022: 0,056; 2023: 0,506; 2024: 0,568; 2025: 0,695; 2026e: 0,65, el nuestro). Cierres de 2017-2018 en peniques sin ajustar (651 y 618) pasados a euros con el cambio de fin de año (0,887 y 0,895), porque la ampliación de 2020 distorsiona los precios ajustados; 2021-2025, cierres de Madrid. Se excluye 2021 (BPA de 2022 aún de recuperación) y no hay dato útil para 2019-2020 (BPA de 2020-2021 en pérdidas). El mercado paga 3-7 veces el beneficio siguiente a IAG: nunca le ha dado múltiplo de empresa estable, porque el beneficio de pico se acaba [1, A2, A5].',
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Grupos de red europeos (Lufthansa, Air France-KLM), aerolíneas de bajo coste europeas (Ryanair, easyJet, Jet2) y las tres grandes de EE. UU. (Delta, United, American), que compiten en el Atlántico Norte. Precios del 19-oct-2026 y BPA del consenso de Yahoo de los próximos 12 meses; capitalización en millones de EUR (GBP a 1,186; USD a 1/1,1216). Wizz Air se excluye (pérdidas). Las europeas aplican NIIF 16 (arrendamientos en el EBITDA y en la deuda); las de EE. UU. no, y su EV/EBITDA no es comparable [2].',
    empresas: comp,
    comentario: `IAG cotiza a ≈ 6,5 veces nuestro BPA de los próximos 12 meses (≈ 0,75 EUR) y a ≈ 3,6 veces el EBITDA de 12 meses, frente a una mediana de ${String(medPer).replace('.', ',')} veces de PER de los comparables. El descuento frente a Ryanair (13,6) y las de EE. UU. es habitual: el mercado no paga por los márgenes de pico de un grupo de red con sindicatos, pensiones y exposición al Atlántico Norte. Frente a Lufthansa (6,1) y Air France-KLM (2,5), IAG cotiza con prima por ser más rentable y tener mejor balance.`,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2025', objetivo: 'ITA Airways (41 %)', comprador: 'Lufthansa', ev: null, ev_ventas: null, ev_ebitda: 2.26, prima_pct: null, excluir: true, comentario: 'Participación minoritaria (325 M EUR) en una aerolínea que salía de pérdidas; múltiplo poco representativo [3].' },
      { fecha: '2026', objetivo: 'TAP (privatización)', comprador: 'En concurso (IAG, Lufthansa, Air France-KLM)', ev: null, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: true, comentario: 'Valoración del 100 % de 1.900-2.100 M EUR según la prensa; sin cerrar [3].' },
      { fecha: '2015', objetivo: 'Aer Lingus', comprador: 'IAG', ev: 1360, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: true, comentario: 'Antigua y de otro ciclo [A1].' },
    ],
    comentario: 'Las compras de aerolíneas son raras, minoritarias o salen de crisis; no dan un múltiplo útil para IAG. Peso 0 en la valoración.',
    confianza: 'Baja',
  },
  huecos: [
    { seccion: 'comparables', campo: 'ROIC, deuda neta/EBITDA y flujo libre de los comparables', tipo: 'Complemento', intentos: '1) Yahoo quoteSummary; 2) informes anuales (ocho empresas, sin tiempo); 3) MarketScreener (de pago)', decision: 'Omitido: PER y EV/EBITDA bastan.' },
  ],
  fuentes: [
    { id: 1, titulo: 'Cotizaciones, rentabilidades y beta (bolsa.mjs: IAG.MC, EXSA.DE, EXV9.DE; movimiento.mjs: IAG.L)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/IAG.L/' },
    { id: 2, titulo: 'Consenso de BPA, objetivos y comparables (quoteSummary)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/IAG.L/analysis/' },
    { id: 3, titulo: 'Lufthansa-ITA (41 % por 325 M) y valoración de TAP', editor: 'eco.sapo.pt', tipo: 'Prensa', fecha: '2026-09', url: 'https://eco.sapo.pt/' },
    { id: 4, titulo: 'Rendimiento del Bund alemán a 10 años (BBSIS)', editor: 'Deutsche Bundesbank', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://api.statistiken.bundesbank.de/rest/data/BBSIS/D.I.ZST.ZI.EUR.S1311.B.A604.R10XX.R.A.A._Z._Z.A?format=csv&lastNObservations=5' },
    { id: 5, titulo: 'Implied ERP by month (ERPbymonth.xlsx)', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/' },
    { id: 6, titulo: 'Noticias de 12 meses: resultados, guerra de Irán, Ormuz, objetivos de precio (Deutsche Bank, BofA, Renta 4, Morgan Stanley)', editor: 'Prensa económica (Reuters, Expansión, Cinco Días, Proactive)', tipo: 'Prensa', fecha: '2026-10', url: 'https://www.marketscreener.com/quote/stock/INTERNATIONAL-CONSOLIDAT-9688436/news/' },
  ],
};
w('D', D);

// ───────────── E: sentimiento ─────────────
const E = {
  _estado: 'Completa. Seeking Alpha (RSS de ICAGY), Stocktwits e ii.co.uk revisados el 19-oct-2026.',
  sentimiento: {
    tono: 'Positivo',
    tendencia: 'Estable',
    revisadas: [
      { plataforma: 'Seeking Alpha (ICAGY)', fecha: '2026-09', n_comentarios: 5, tono: 'Positivo', resumen: 'Artículos mayoritariamente alcistas: «Lower Fuel Costs Strengthen The Upside Case» (3-sep-2026) y otros de abril y mayo; uno rebaja a comprar (de compra fuerte) por el combustible el 5-mar. Tesis común: barata a 6-7 veces el beneficio con recompras [1].' },
      { plataforma: 'Stocktwits (IAG / ICAGY)', fecha: '2026-10', n_comentarios: 30, tono: 'Mixto', resumen: 'Muy bajista en marzo (guerra, queroseno) y alcista en mayo-junio (Ormuz); sigue al crudo día a día [2].' },
      { plataforma: 'ii.co.uk (interactive investor)', fecha: '2026-07', n_comentarios: 2, tono: 'Positivo', resumen: '«Still look cheap» (7-jul) y «steers steady course» (31-jul): valor razonable del consenso por encima de 525 peniques y rentabilidad por dividendo ≈ 2,1 % [3].' },
    ],
    temas: [
      { tema: 'Barata por PER y por flujo libre, con recompras', postura: 'Alcista', peso: 'Alto', contraste: 'Cierto (6,5 veces el BPA adelantado), pero es lo normal en IAG: la mediana adelantada de cinco años es 4,2 veces.' },
      { tema: 'Queroseno y guerra de Irán', postura: 'Bajista', peso: 'Alto', contraste: 'Cierto: el combustible sube ≈ 1.300 M en 2026; la curva de futuros baja en 2027-2028 y las coberturas suavizan.' },
      { tema: 'Competencia transatlántica de EE. UU.', postura: 'Bajista', peso: 'Medio', contraste: 'Cierto en Aer Lingus (pérdidas en el 1S26); BA resiste con la empresa conjunta con American.' },
      { tema: 'Loyalty como joya escondida', postura: 'Alcista', peso: 'Medio', contraste: 'Cierto: 548 M de EBIT en 2025 con poco capital; objetivo de 1.000 M a medio plazo.' },
    ],
    lectura: 'El sentimiento de analistas y particulares es positivo (13 de 15 analistas en comprar, objetivo medio de 535 peniques, un 30 % sobre el precio), aunque los BPA se recortan desde hace tres meses por el combustible. Lo que nadie discute es que IAG es la mejor gestionada de las grandes europeas; lo que separa a alcistas y bajistas es si los márgenes de 2024-2025 son el nuevo normal o el pico del ciclo.',
    confianza: 'Media',
  },
  huecos: [],
  fuentes: [
    { id: 1, titulo: 'Seeking Alpha: artículos sobre ICAGY (RSS)', editor: 'Seeking Alpha', tipo: 'Foro', fecha: '2026-09-03', url: 'https://seekingalpha.com/symbol/ICAGY' },
    { id: 2, titulo: 'Stocktwits: IAG / ICAGY', editor: 'Stocktwits', tipo: 'Foro', fecha: '2026-10-19', url: 'https://stocktwits.com/symbol/ICAGY' },
    { id: 3, titulo: 'interactive investor: IAG shares still look cheap; IAG steers steady course', editor: 'ii.co.uk', tipo: 'Prensa', fecha: '2026-07-31', url: 'https://www.ii.co.uk/' },
  ],
};
w('E', E);
console.log('Notas A-E escritas. Mediana PER comparables:', medPer, 'LTM:', JSON.stringify(ltm));
