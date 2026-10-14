// Escribe las notas A-E de Aon plc (NYSE: AON), corte 2026-10-14. USD, ejercicio natural, US GAAP (10-K en la SEC; domicilio en Irlanda).
// Fuentes: EDGAR (10-K 2025, 2023, 2021 y 2019; 10-Q 2T26; notas de resultados 3T25-2T26 y de los cierres 2017-2024; 8-K de USI, bonos y créditos; proxy 2026),
// XBRL (cuentas.mjs), Yahoo (bolsa.mjs y estimaciones), MarketScreener (consenso), ficha sectorial de corredores (14-oct-2026) y foros.
// Ejecutar: node notas/construir-notas.mjs. Cada nota cita solo su propia lista de fuentes.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify({ _estado: 'completo', ...obj }, null, 2) + '\n', 'utf8');
const E = 'https://www.sec.gov/Archives/edgar/data/315293/';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Form 10-K 2025 (cuentas, segmentos Risk Capital y Human Capital, deuda, rating, plantilla, auditor)', editor: 'Aon plc', tipo: 'Primaria', fecha: '2026-02-13', url: E + '000162828026008116/aon-20251231.htm' },
  { id: 2, titulo: 'XBRL companyfacts (serie 2016-2025 de cuenta, balance y flujos)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-14', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0000315293.json' },
  { id: 3, titulo: 'Form 10-K 2023 (balance 2022-2023: activos fiduciarios, inversiones a corto, deuda a corto)', editor: 'Aon plc', tipo: 'Primaria', fecha: '2024-02-16', url: E + '000162828024005392/aon-20231231.htm' },
  { id: 4, titulo: 'Form 10-K 2021 (balance 2020-2021)', editor: 'Aon plc', tipo: 'Primaria', fecha: '2022-02-18', url: E + '000162828022003180/aon-20211231.htm' },
  { id: 5, titulo: 'Form 10-K 2019 (balance 2018-2019)', editor: 'Aon plc', tipo: 'Primaria', fecha: '2020-02-14', url: E + '000162828020001607/aonplc201910-k.htm' },
  { id: 6, titulo: 'Nota de resultados 2T26 (Exhibit 99.1): cuenta, balance a 30-jun-2026 y flujos del semestre; guía 2026', editor: 'Aon plc', tipo: 'Primaria', fecha: '2026-07-29', url: E + '000162828026050367/ex991prq22026.htm' },
  { id: 7, titulo: 'Nota de resultados 1T26 (Exhibit 99.1)', editor: 'Aon plc', tipo: 'Primaria', fecha: '2026-05-01', url: E + '000162828026029093/ex991prq12026.htm' },
  { id: 8, titulo: 'Nota de resultados 4T25 y ejercicio 2025 (Exhibit 99.1)', editor: 'Aon plc', tipo: 'Primaria', fecha: '2026-01-30', url: E + '000162828026004273/ex991prq42025.htm' },
  { id: 9, titulo: 'Nota de resultados 3T25 (Exhibit 99.1)', editor: 'Aon plc', tipo: 'Primaria', fecha: '2025-10-31', url: E + '000162828025047660/ex991prq32025.htm' },
  { id: 10, titulo: 'Presentación de la compra de USI (8-K, Exhibit 99.2), con la conciliación del BPA ajustado 2015-2025 y del apalancamiento', editor: 'Aon plc', tipo: 'Primaria', fecha: '2026-08-31', url: E + '000119312526375328/d108801dex992.htm' },
  { id: 11, titulo: 'Información financiera pro forma combinada Aon + USI (8-K, Exhibit 99.3)', editor: 'Aon plc', tipo: 'Primaria', fecha: '2026-09-11', url: E + '000119312526388699/d67980dex993.htm' },
  { id: 12, titulo: '8-K: emisión de 13.500 M USD de bonos en siete tramos (5,35 %-6,45 %, 2029-2056)', editor: 'Aon plc', tipo: 'Primaria', fecha: '2026-09-17', url: E + '000119312526394533/d105587d8k.htm' },
  { id: 13, titulo: '8-K: préstamo a plazo de 4.000 M USD (Citibank) y nueva línea de crédito de 3.000 M USD', editor: 'Aon plc', tipo: 'Primaria', fecha: '2026-09-22', url: E + '000119312526397203/d38875d8k.htm' },
  { id: 14, titulo: 'Notas de resultados de los cierres 2017-2024 (BPA ajustado y crecimiento orgánico)', editor: 'Aon plc', tipo: 'Primaria', fecha: '2025-01-31', url: E + '000162828025003243/ex991prq42024.htm' },
  { id: 15, titulo: 'Nota de prensa: Aon to acquire USI (8-K, Exhibit 99.1)', editor: 'Aon plc', tipo: 'Primaria', fecha: '2026-08-31', url: E + '000119312526375328/d108801dex991.htm' },
];

// Cuenta 2019-2025: XBRL (cuentas.mjs) con la amortización de intangibles añadida (el XBRL solo da la depreciación del inmovilizado desde 2019; la de intangibles sale de la conciliación de la empresa [10]).
const c = (periodo, ingresos, ebit, dep, amInt, rf, bai, imp, mino, bn, gf, bpa, dpa, acc, nr = null) => ({
  periodo, ingresos, coste_ventas: null, gastos_generales: null, ebitda: ebit + dep + amInt, amortizaciones: dep + amInt, ebit,
  resultado_financiero: rf, bai, impuestos: imp, minoritarios: mino, beneficio_neto: bn, gastos_financieros: gf,
  participadas_en_ebitda: null, no_recurrentes_en_ebitda: nr, bpa, dpa, dpa_extraordinario: 0, acciones_diluidas: acc,
});
const A = {
  negocio: {
    segmentos: [
      { nombre: 'Risk Capital (Commercial Risk Solutions y Reinsurance Solutions)', descripcion: 'Correduría de seguros para empresas, riesgos especiales, consultoría de riesgos, cautivas y correduría de reaseguro; incluye los intereses del dinero fiduciario.', tipo_resultado: 'EBIT', historico: [
        { periodo: '2023', ingresos: 9524, resultado: 2946 }, { periodo: '2024', ingresos: 10517, resultado: 3292 }, { periodo: '2025', ingresos: 11290, resultado: 3436 }] },
      { nombre: 'Human Capital (Health Solutions y Wealth Solutions)', descripcion: 'Consultoría y correduría de beneficios sociales y salud, análisis de talento, consultoría de pensiones y gestión patrimonial (NFP Wealth vendido en 2025).', tipo_resultado: 'EBIT', historico: [
        { periodo: '2023', ingresos: 3864, resultado: 1097 }, { periodo: '2024', ingresos: 5209, resultado: 1143 }, { periodo: '2025', ingresos: 5907, resultado: 1410 }] },
      { nombre: 'Corporativo y eliminaciones', descripcion: 'Eliminaciones entre segmentos y gastos centrales no asignados (incluye el programa Accelerating Aon United).', tipo_resultado: 'EBIT', historico: [
        { periodo: '2023', ingresos: -12, resultado: -258 }, { periodo: '2024', ingresos: -28, resultado: -600 }, { periodo: '2025', ingresos: -16, resultado: -502 }] },
    ],
    geografias: null,
    geografias_criterio: null,
    kpis: [
      { kpi: 'Crecimiento orgánico de los ingresos (grupo)', valor_anterior: '6 % (2024)', valor_actual: '6 % (2025); 5 % 1T26 y 5 % 2T26', variacion: '−1 pp', comentario: 'Sin divisa, compras ni intereses fiduciarios; la guía 2026 es «un dígito medio o más» [8, 6].' },
      { kpi: 'Crecimiento orgánico Commercial Risk Solutions', valor_anterior: '5 % (2024)', valor_actual: '6 % (2025); 5 % 2T26', variacion: '−1 pp', comentario: 'Negocio nuevo y retención; efecto mercado «modestamente positivo» en el 2T26 [1, 6].' },
      { kpi: 'Crecimiento orgánico Reinsurance Solutions', valor_anterior: '7 % (2024)', valor_actual: '6 % (2025); 5 % 2T26', variacion: '−2 pp', comentario: 'Efecto mercado desfavorable en el 2T26: el reaseguro abarata [6].' },
      { kpi: 'Margen operativo ajustado', valor_anterior: '31,5 % (2024)', valor_actual: '32,4 % (2025); 34,4 % 1S26', variacion: '+0,9 pp', comentario: 'Excluye amortización de intangibles, reestructuración y costes de operaciones; guía 2026 +70-80 pb [8, 6].' },
      { kpi: 'BPA ajustado', valor_anterior: '15,60 USD (2024)', valor_actual: '17,07 USD (2025); 10,29 1S26 (+12 %)', variacion: '+9 %', comentario: 'Base de la revisión a 12 meses de este informe [10, 6].' },
      { kpi: 'Intereses fiduciarios', valor_anterior: '315 M (2024)', valor_actual: '271 M (2025)', variacion: '−14 %', comentario: 'Bajan con los tipos; casi puro margen [1].' },
      { kpi: 'Apalancamiento (deuda total / EBITDA)', valor_anterior: '3,4x (2024)', valor_actual: '2,9x (2025); ≈4,5x al cierre de USI', variacion: 'sube', comentario: 'Objetivo 2,8-3,0x unos 24 meses después del cierre [10].' },
    ],
    confianza: 'Alta',
  },
  financieros: {
    cuenta: [
      c('2019', 11013, 2169, 172, 392, -299, 1870, 297, 41, 1532, 307, 6.37, 1.72, 241),
      c('2020', 11066, 2781, 167, 246, -315, 2466, 448, 49, 1969, 334, 8.45, 1.78, 233),
      c('2021', 12193, 2090, 179, 147, -159, 1931, 623, 53, 1255, 322, 5.55, 1.99, 226, 1436),
      c('2022', 12479, 3669, 151, 113, -513, 3156, 510, 57, 2589, 406, 12.14, 2.19, 213),
      c('2023', 13376, 3785, 167, 89, -616, 3169, 541, 64, 2564, 484, 12.51, 2.41, 205),
      c('2024', 15698, 3835, 183, 503, -373, 3462, 742, 66, 2654, 788, 12.49, 2.64, 213),
      c('2025', 17181, 4344, 188, 778, 415, 4759, 1009, 55, 3695, 815, 17.02, 2.91, 217),
    ],
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 17577, ebitda: 5548, ebit: 4654, beneficio_neto: 3918, bpa: 18.14, dpa: 3.06, dpa_extraordinario: 0, fcf: 3248, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [
      { periodo: '2024', descripcion: 'NFP, consolidada desde el 25-abr-2024 (13.400 M USD con deuda asumida): entra en ocho meses de la cuenta y en todo el balance.' },
      { periodo: '2025', descripcion: 'Venta de NFP Wealth (cuarto trimestre de 2025): plusvalía de 1.201 M en «otros ingresos»; sale del balance y de parte de la cuenta.' },
    ],
    comentario: 'Los ingresos pasan de 11.013 M (2019) a 17.181 M (2025), un 7,6 % anual: unos 6 puntos son crecimiento orgánico (6 % en 2023, 2024 y 2025) y el resto NFP (25-abr-2024), que añadió 11 puntos en 2024 y 2 en 2025, menos ventas pequeñas [1, 10]. El margen operativo ajustado sube de 27,5 % en 2019 a 32,4 % en 2025, 490 pb en seis años, por escala, la plataforma común de servicios (Aon Business Services) y el programa de reestructuración [10]. El margen publicado es mucho más bajo y errático (25,3 % en 2025) por la amortización de intangibles (778 M en 2025 frente a 89 M en 2023, por NFP), la reestructuración (365 M) y, en 2021, los 1.436 M de costes de la fusión fallida con WTW, incluida la indemnización de 1.000 M [10]. 2025 lleva además una plusvalía de 1.201 M por NFP Wealth fuera del resultado operativo: el BPA publicado (17,02) y el ajustado (17,07) coinciden por casualidad [8, 10].',
    ajustes: 'Las cifras de la cuenta son las publicadas (US GAAP). Para la revisión a 12 meses se usa el BPA ajustado de la empresa (17,07 USD en 2025), que excluye la amortización de intangibles comprados, la reestructuración, los costes de operaciones, las liquidaciones de pensiones y las plusvalías [10]. Motivo: la compra de USI (cierre previsto en el 4T26) añade unos 1.060 M al año de amortización de intangibles y el BPA publicado pro forma de 2025 cae a 11,24 USD (con la plusvalía) frente a 17,02 [11]; con el publicado, la historia del PER no es comparable. La reestructuración se repite (485 M en 2018, 451 M en 2019, 135-389 M en 2023-2025) y no es del todo extraordinaria: el informe la resta en el EBITDA del DCF.',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '1T25', ingresos: 4729, crecimiento_pct: 16.0, crecimiento_organico_pct: 5, ebitda: null, margen_ebitda_pct: null, bpa: 4.43, vs_consenso: null },
      { periodo: '2T25', ingresos: 4155, crecimiento_pct: 11.0, crecimiento_organico_pct: 6, ebitda: null, margen_ebitda_pct: null, bpa: 2.66, vs_consenso: null },
      { periodo: '3T25', ingresos: 3997, crecimiento_pct: 7.4, crecimiento_organico_pct: 7, ebitda: null, margen_ebitda_pct: null, bpa: 2.11, vs_consenso: null },
      { periodo: '4T25', ingresos: 4300, crecimiento_pct: 3.7, crecimiento_organico_pct: 5, ebitda: null, margen_ebitda_pct: null, bpa: 7.82, vs_consenso: null },
      { periodo: '1T26', ingresos: 5034, crecimiento_pct: 6.4, crecimiento_organico_pct: 5, ebitda: null, margen_ebitda_pct: null, bpa: 5.63, vs_consenso: null },
      { periodo: '2T26', ingresos: 4246, crecimiento_pct: 2.2, crecimiento_organico_pct: 5, ebitda: null, margen_ebitda_pct: null, bpa: 2.58, vs_consenso: null },
    ],
    ultima_presentacion: 'En el 2T26 (29-jul-2026) Aon creció un 5 % orgánico, un 2 % en total por la venta de NFP Wealth y Stroz Friedberg, amplió 70 pb el margen operativo ajustado (28,9 %) y subió un 9 % el BPA ajustado (3,81 USD); el publicado bajó un 3 % (2,58) [6]. Reafirmó la guía 2026: crecimiento orgánico de «un dígito medio o más», +70-80 pb de margen ajustado, «fuerte» crecimiento del BPA ajustado y crecimiento de dos dígitos del flujo libre; recompró 600 M en el trimestre y ya superaba el objetivo anual de 1.000 M [6]. Un mes después anunció la compra de USI por 17.000 M y suspendió las recompras «a corto plazo» para reducir deuda [15]. Los mensajes cambiaron: de «balance robusto y flexibilidad» en julio a «desapalancar a 2,8-3,0x en unos 24 meses» en agosto [6, 10]. El flujo de caja operativo del 2T26 cayó un 30 % (556 M) por el impuesto de la venta de NFP Wealth y el circulante [6]. El BPA de la tabla es el publicado (diluido); el ajustado fue 5,67, 3,49, 3,05, 4,85, 6,48 y 3,81 USD [6-9].',
    confianza: 'Alta',
  },
  balance: {
    historico: [
      // Sin los activos y pasivos fiduciarios (primas y siniestros de clientes, 11.834-17.889 M), que se compensan exactamente; caja = efectivo + inversiones a corto no fiduciarias; deuda = largo + corto (el XBRL de cuentas.mjs solo daba el largo).
      { periodo: '2019', activo_total: 17571, activo_corriente: 4642, pasivo_corriente: 3737, pasivo_total: 14122, fondo_comercio: 8165, intangibles: 783, inmovilizado_material: 621, existencias: 0, clientes: 3112, proveedores: 1939, activos_contrato: 335, pasivos_contrato: 270, caja: 928, deuda_financiera: 7339, arrendamientos: 0, patrimonio_neto: 3375, minoritarios: 74, reservas: 1254 },
      { periodo: '2020', activo_total: 18316, activo_corriente: 4886, pasivo_corriente: 3635, pasivo_total: 14733, fondo_comercio: 8666, intangibles: 640, inmovilizado_material: 599, existencias: 0, clientes: 3070, proveedores: 2016, activos_contrato: 339, pasivos_contrato: 296, caja: 1192, deuda_financiera: 7729, arrendamientos: 0, patrimonio_neto: 3495, minoritarios: 88, reservas: 1042 },
      { periodo: '2021', activo_total: 17531, activo_corriente: 4646, pasivo_corriente: 4687, pasivo_total: 16373, fondo_comercio: 8434, intangibles: 492, inmovilizado_material: 529, existencias: 0, clientes: 3094, proveedores: 2192, activos_contrato: 361, pasivos_contrato: 321, caja: 836, deuda_financiera: 9392, arrendamientos: 0, patrimonio_neto: 1061, minoritarios: 97, reservas: -1694 },
      { periodo: '2022', activo_total: 16804, activo_corriente: 4823, pasivo_corriente: 4406, pasivo_total: 17233, fondo_comercio: 8292, intangibles: 447, inmovilizado_material: 558, existencias: 0, clientes: 3035, proveedores: 2114, activos_contrato: 355, pasivos_contrato: 250, caja: 1142, deuda_financiera: 10770, arrendamientos: 0, patrimonio_neto: -529, minoritarios: 100, reservas: -2772 },
      { periodo: '2023', activo_total: 17652, activo_corriente: 5397, pasivo_corriente: 5344, pasivo_total: 18394, fondo_comercio: 8414, intangibles: 234, inmovilizado_material: 638, existencias: 0, clientes: 3254, proveedores: 2262, activos_contrato: 370, pasivos_contrato: 270, caja: 1147, deuda_financiera: 11199, arrendamientos: 0, patrimonio_neto: -826, minoritarios: 84, reservas: -3399 },
      { periodo: '2024', activo_total: 31399, activo_corriente: 5866, pasivo_corriente: 5429, pasivo_total: 24969, fondo_comercio: 15234, intangibles: 6743, inmovilizado_material: 637, existencias: 0, clientes: 3803, proveedores: 2905, activos_contrato: 424, pasivos_contrato: 280, caja: 1304, deuda_financiera: 17016, arrendamientos: 0, patrimonio_neto: 6121, minoritarios: 106, reservas: -2309 },
      { periodo: '2025', activo_total: 32895, activo_corriente: 7885, pasivo_corriente: 5337, pasivo_total: 23347, fondo_comercio: 15797, intangibles: 5727, inmovilizado_material: 702, existencias: 0, clientes: 4209, proveedores: 2861, activos_contrato: 450, pasivos_contrato: 259, caja: 2798, deuda_financiera: 15249, arrendamientos: 0, patrimonio_neto: 9352, minoritarios: 107, reservas: -245 },
    ],
    vencimientos: [{ anio: '2026', importe: 589 }, { anio: '2027', importe: 1723 }, { anio: '2028', importe: 352 }, { anio: '2029', importe: 1752 }, { anio: '2030', importe: 1000 }, { anio: '2031+', importe: 10006 }],
    liquidez: 'Caja 1.062 M e inversiones a corto 205 M a 30-jun-26 (2.798 M al cierre de 2025, inflado por la venta de NFP Wealth), programas de pagarés de ≈2.000 M y, desde el 18-sep-2026, una línea de crédito comprometida de 3.000 M que sustituye a dos de 1.000 M; no incluye 8.001 M de efectivo fiduciario de clientes [6, 1, 13].',
    rating: 'S&P A- (estable), Moody’s Baa2 (perspectiva positiva a feb-2026; rating confirmado tras anunciar USI), Fitch BBB+ (estable) [1, 15]',
    coste_deuda_pct: 5.0,
    vida_media_anios: null,
    otros_pasivos: 'Deuda de la compra de USI, posterior al último balance: 13.500 M de bonos emitidos el 17-sep-2026 en siete tramos (5,35 % a 2029 hasta 6,45 % a 2056; cupón medio supuesto en el pro forma, 5,92 %) y un préstamo a plazo de 4.000 M a dos y tres años (SOFR + margen) que se dispone al cierre [12, 13, 11]. El préstamo exige deuda neta/EBITDA ajustado ≤ 4,75x tras el cierre, con escalones hasta 3,50x en ocho trimestres, y cobertura de intereses ≥ 4x [13]. El pro forma a 30-jun-26 da 32.335 M de deuda bruta, 27.014 M de fondo de comercio y 13.136 M de intangibles [11]. Pensiones: pasivos de 1.002 M frente a un prepago de 596 M a 30-jun-26 (déficit neto ≈406 M) [6]. Arrendamientos operativos (730 M no corrientes) fuera del puente por US GAAP. Costes comprometidos de USI: 160 M de operación, 550 M de integración hasta 2028 y hasta 400 M de retención [10].',
    comentario: 'La deuda financiera pasa de 7.339 M (2019) a 17.016 M en 2024 por NFP y baja a 15.249 M en 2025 (1.900 M amortizados con la venta de NFP Wealth); a junio de 2026 es de 14.967 M [1, 6]. Con USI saltará a unos 32.300 M (≈4,5x el EBITDA, 4,8x con la reestructuración, frente al 2,9x de 2025) [10, 11]. El patrimonio fue negativo en 2022-2023 por las recompras (13.300 M en 2019-2023) y se recuperó con NFP, pagada en parte con acciones [2]. El circulante operativo es pequeño (clientes menos acreedores ≈8 % de las ventas) y estacional: el cobro de las renovaciones de enero consume caja en el primer semestre [6]. La herramienta del XBRL daba solo la deuda a largo: le faltaban entre 251 M y 1.204 M de deuda a corto y pagarés por año [1, 3, 4, 5].',
    confianza: 'Alta',
  },
  flujos: {
    historico: [
      { periodo: '2019', flujo_operativo: 1835, capex: 225, pagos_arrendamientos: 0, adquisiciones: 39, desinversiones: 52, dividendos: 410, recompras: 1960, emision_acciones: 0, intereses_en_financiacion: 0 },
      { periodo: '2020', flujo_operativo: 2783, capex: 141, pagos_arrendamientos: 0, adquisiciones: 368, desinversiones: 30, dividendos: 412, recompras: 1763, emision_acciones: 44, intereses_en_financiacion: 0 },
      { periodo: '2021', flujo_operativo: 2182, capex: 137, pagos_arrendamientos: 0, adquisiciones: 14, desinversiones: 218, dividendos: 447, recompras: 3543, emision_acciones: 55, intereses_en_financiacion: 0 },
      { periodo: '2022', flujo_operativo: 3219, capex: 196, pagos_arrendamientos: 0, adquisiciones: 162, desinversiones: 81, dividendos: 463, recompras: 3203, emision_acciones: 58, intereses_en_financiacion: 0 },
      { periodo: '2023', flujo_operativo: 3435, capex: 252, pagos_arrendamientos: 0, adquisiciones: 35, desinversiones: 5, dividendos: 489, recompras: 2700, emision_acciones: 72, intereses_en_financiacion: 0 },
      { periodo: '2024', flujo_operativo: 3035, capex: 218, pagos_arrendamientos: 0, adquisiciones: 3506, desinversiones: 700, dividendos: 562, recompras: 1000, emision_acciones: 79, intereses_en_financiacion: 0 },
      { periodo: '2025', flujo_operativo: 3481, capex: 263, pagos_arrendamientos: 0, adquisiciones: 394, desinversiones: 2349, dividendos: 629, recompras: 1000, emision_acciones: 70, intereses_en_financiacion: 0 },
    ],
    comentario: 'El flujo operativo pasa de 1.835 M (2019) a 3.481 M (2025); 2021 cae por el pago de 1.000 M a WTW y 2024 por los costes de NFP [1, 2]. El flujo libre de 2025 (3.218 M, +14 %) equivale al 87 % del beneficio publicado, que lleva 1.201 M de plusvalía; frente al beneficio ajustado (3.706 M) la conversión es del 87 % [8, 10]. El capex es pequeño (263 M, 1,5 % de las ventas) y casi todo tecnología. La caja ha ido sobre todo a recompras: 15.169 M en 2019-2025, más de cinco veces los dividendos (3.412 M) [2]. Las compras de 2024 aparecen netas: NFP se pagó con 3.506 M de caja, unos 6.300 M de acciones y deuda asumida [1].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'Ernst & Young LLP', anios_auditor: 39, opinion: 'Favorable (cuentas y control interno a 31-dic-2025)',
    comentario: 'Cuentas US GAAP sin salvedades de EY, auditor desde 1986 (39 años: rotación muy larga) [1]. Tres asuntos. Primero, el BPA ajustado que usa la empresa excluye cada año la reestructuración (135-485 M en cinco de los últimos ocho años), los costes de operaciones y la amortización de intangibles: lo recurrente se presenta como extraordinario, y este informe lo trata con cuidado (el DCF resta la reestructuración y los costes de integración de USI) [10]. Segundo, 2025 lleva una plusvalía de 1.201 M por NFP Wealth y 2024 otra de 337 M: el beneficio publicado de esos años no es repetible [2]. Tercero, la contabilidad de USI añadirá ≈7.400 M de fondo de comercio y ≈6.500 M de intangibles, con ≈1.060 M de amortización anual [11]. El balance de Aon incluye activos y pasivos fiduciarios iguales (17.889 M en 2025), que aquí se restan para que el circulante y el Altman Z no salgan deformados; con patrimonio negativo en 2022-2023 por las recompras, el Altman Z no es interpretable en esos años.',
    senales: [
      { senal: 'Reestructuración recurrente fuera del BPA ajustado', nivel: 'Media', comentario: 'Programas en 2017-2019 (≈1.430 M) y Accelerating Aon United en 2023-2026 (≈1.100 M en tres años) [10].' },
      { senal: 'Plusvalías en el beneficio publicado', nivel: 'Media', comentario: '1.201 M en 2025 (NFP Wealth) y 337 M en 2024 [2].' },
      { senal: 'Auditor con 39 años de mandato', nivel: 'Baja', comentario: 'EY desde 1986 [1].' },
      { senal: 'Fondo de comercio e intangibles crecientes', nivel: 'Media', comentario: '21.524 M en 2025 y ≈40.000 M pro forma con USI, más que el patrimonio [1, 11].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Prioridades declaradas: desapalancar hasta 2,8-3,0x de deuda/EBITDA unos 24 meses después del cierre de USI, dividendo «estable y creciente» (0,82 USD trimestrales desde el 2T26) y equilibrar compras con devolución de capital [10, 6]. Tras anunciar USI, la empresa no espera recomprar acciones «a corto plazo» [15]. Antes de NFP, Aon era una máquina de recompras (1.763-3.543 M al año en 2019-2023) [2]. Quedaban 7.700 M de autorización de recompra a junio de 2026 [6].',
    adquisiciones: [
      { anio: '2021', objetivo: 'Willis Towers Watson (fusión cancelada por la oposición del Departamento de Justicia de EE. UU.)', importe: 1000, ev_ebitda: null, financiacion: 'Caja (indemnización)', resultado: 'Fallida: 1.000 M de indemnización a WTW y 1.436 M de costes en 2021; Aon vendió activos y se volcó en el plan Aon United [10].' },
      { anio: '2024', objetivo: 'NFP (corredor de mediana empresa y patrimonios de EE. UU.)', importe: 13400, ev_ebitda: 22.0, financiacion: 'Caja y deuda (≈7.000 M) y acciones (≈19 millones)', resultado: 'Integrada; Aon cita 10 % más de captación de clientes; vendió NFP Wealth en 2025 con 1.201 M de plusvalía; amortización de intangibles de 503-778 M al año [10, 2].' },
      { anio: '2026', objetivo: 'USI (décimo corredor de EE. UU., ≈3.000 M de ingresos)', importe: 17000, ev_ebitda: 14.5, financiacion: '13.500 M de bonos y 4.000 M de préstamo a plazo', resultado: 'Pendiente de cierre (previsto en el 4T26). 14,5x el EBITDA «con sinergias» (1.151 M); sin sinergias, ≈22x los 756 M ajustados por el comprador; 395 M de sinergias netas hasta 2029 [10, 15].' },
    ],
    comentario: 'Aon ha devuelto 18.581 M a los accionistas en 2019-2025 (15.169 M en recompras), lo que redujo las acciones de 241 a 217 millones aun con la ampliación para NFP [2]. Hasta 2023 fue un asignador disciplinado: sin compras grandes, ROIC alto y BPA ajustado de 9,17 a 14,14 USD (+11 % anual) [10]. Desde 2024 cambia de modelo: NFP (22x el EBITDAC) y USI (≈22x sin sinergias, 14,5x con ellas) suman 30.400 M en compras de corredores de mediana empresa en EE. UU., el segmento que más se ha encarecido por el capital privado [10, 15]. NFP salió bien en lo financiero (venta de Wealth con plusvalía y crecimiento orgánico del 5-6 %), pero el ROIC con fondo de comercio baja y la deuda sube a 4,5x. El veredicto depende de que USI se integre como NFP.',
    confianza: 'Alta',
  },
  fuentes: fA,
  huecos: [
    { seccion: 'negocio', campo: 'geografias', tipo: 'Complemento', intentos: '1) 10-K 2025 (nota de ingresos: por línea de solución, la tabla geográfica no se extrajo con grep); 2) notas de resultados (sin geografía); 3) impuestos pagados por país (no son ingresos)', decision: 'Omitido' },
    { seccion: 'negocio', campo: 'segmentos 2019-2022', tipo: 'Complemento', intentos: '1) 10-K 2025 (reexpresa 2023-2025); 2) 10-K 2023 (un solo segmento hasta 2022); 3) sin cifras reexpresadas de la empresa', decision: 'Omitido' },
    { seccion: 'trimestres', campo: 'EBITDA trimestral y comparación con el consenso', tipo: 'Complemento', intentos: '1) notas de resultados 3T25-2T26 (sin EBITDA); 2) consenso previo de cada trimestre no archivado; 3) —', decision: 'Omitido' },
    { seccion: 'balance', campo: 'vida_media_anios', tipo: 'Complemento', intentos: '1) nota de deuda del 10-K 2025 (calendario de cinco años); 2) 8-K de bonos; 3) no se calcula sin la lista completa', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- B. Sector y competencia (reutiliza la ficha sectorial del 14-oct-2026)
const fB = [
  { id: 1, titulo: 'Form 10-K 2025: negocio, competencia y regulación', editor: 'Aon plc', tipo: 'Primaria', fecha: '2026-02-13', url: E + '000162828026008116/aon-20251231.htm' },
  { id: 2, titulo: 'Insurance Brokers and Agents Market Size (276.500 M USD en 2025; 9,1 % anual 2026-2035)', editor: 'Global Market Insights', tipo: 'Sectorial', fecha: '2026-08', url: 'https://www.gminsights.com/industry-analysis/insurance-brokers-and-agents-market' },
  { id: 3, titulo: 'Insurance Brokerage Market (359.270 M USD en 2026; 572.470 M en 2031)', editor: 'Mordor Intelligence', tipo: 'Sectorial', fecha: '2026', url: 'https://www.mordorintelligence.com/industry-reports/insurance-brokerage-market' },
  { id: 4, titulo: 'Global commercial insurance rates fall 6% in Q2 2026 (Global Insurance Market Index)', editor: 'Marsh', tipo: 'Sectorial', fecha: '2026-07-23', url: 'https://www.marsh.com/en/corp/about/news/global-commercial-insurance-falls-6-percent-q2-2026.html' },
  { id: 5, titulo: 'Insurance brokers plunge on AI fears', editor: "Leader's Edge (The Council)", tipo: 'Prensa', fecha: '2026-03', url: 'https://www.leadersedge.com/industry/insurance-brokers-plunge-on-ai-fears' },
  { id: 6, titulo: 'AI-Fueled Selloff in Insurance Brokers Overdone, Analysts Say', editor: 'Bloomberg Law', tipo: 'Prensa', fecha: '2026-02', url: 'https://news.bloomberglaw.com/insurance/ai-fueled-selloff-in-insurance-brokers-overdone-analysts-say' },
  { id: 7, titulo: 'Ficha sectorial corta: corredores de seguros (comparables y economía del sector)', editor: 'Repositorio de análisis (sectores/corredores-seguros-2026-10-14.md)', tipo: 'Sectorial', fecha: '2026-10-14', url: 'https://github.com/' },
  { id: 8, titulo: 'Nota de prensa y presentación de la compra de USI (mercado medio de EE. UU. de más de 40.000 M USD; E&S 26 % de las primas comerciales)', editor: 'Aon plc', tipo: 'Primaria', fecha: '2026-08-31', url: E + '000119312526375328/d108801dex991.htm' },
  { id: 9, titulo: 'Nota de resultados 2T26', editor: 'Aon plc', tipo: 'Primaria', fecha: '2026-07-29', url: E + '000162828026050367/ex991prq22026.htm' },
  { id: 10, titulo: 'Análisis value de Marsh del 14-oct-2026 (cifras de Marsh y competidores)', editor: 'Repositorio de análisis (informes/marsh-mclennan-2026-10-14)', tipo: 'Analistas', fecha: '2026-10-14', url: 'https://github.com/' },
];
const B = {
  historia: {
    resumen: 'Aon nace en 1982 cuando Combined International (seguros, de Patrick Ryan) se fusiona con Ryan Insurance Group; adopta el nombre Aon en 1987 [1]. En los noventa y dos mil compró Alexander & Alexander (1997) y Benfield (2008, reaseguro), y en 2010 Hewitt Associates (consultoría de recursos humanos) [1]. Trasladó la sede a Londres en 2012 y a Dublín en 2020 [1]. En 2017 vendió la externalización de beneficios a Blackstone (4.300 M) y se centró en asesoramiento. La fusión con Willis Towers Watson, anunciada en 2020, se canceló en 2021 por la oposición antimonopolio de EE. UU. y costó 1.000 M de indemnización [1]. Desde entonces la estrategia «Aon United» une los negocios y, desde 2024, compra en la mediana empresa de EE. UU.: NFP (2024) y USI (anunciada en agosto de 2026) [8].',
    hitos: [
      { anio: '1982', hito: 'Fusión de Combined International y Ryan Insurance Group; nombre Aon desde 1987.' },
      { anio: '2008', hito: 'Compra de Benfield (reaseguro).' },
      { anio: '2010', hito: 'Compra de Hewitt Associates (recursos humanos).' },
      { anio: '2017', hito: 'Venta de la externalización de beneficios a Blackstone.' },
      { anio: '2020', hito: 'Sede legal en Dublín (Irlanda); anuncio de la fusión con Willis Towers Watson.' },
      { anio: '2021', hito: 'Fusión con WTW cancelada; 1.000 M de indemnización.' },
      { anio: '2024', hito: 'Compra de NFP (13.400 M); plan 3x3.' },
      { anio: '2025', hito: 'Venta de NFP Wealth (plusvalía de 1.201 M).' },
      { anio: '2026', hito: 'Anuncio de la compra de USI por 17.000 M (31-ago).' },
    ],
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'Aon es el segundo corredor de seguros y consultor de riesgos y recursos humanos del mundo: 17.181 M USD de ingresos en 2025, unos 60.000 empleados (62.159 en diciembre de 2025) y clientes en más de 120 países [1]. Tiene dos segmentos. Risk Capital (66 % de los ingresos) agrupa Commercial Risk Solutions (49 %: correduría de seguros para empresas, riesgos especiales, consultoría de riesgos y cautivas) y Reinsurance Solutions (16 %: correduría de reaseguro y mercados de capitales, segundo del mundo tras Guy Carpenter de Marsh según la empresa) [1]. Human Capital (34 %) agrupa Health Solutions (22 %: beneficios de salud, talento) y Wealth Solutions (12 %: consultoría de pensiones e inversiones) [1]. Con USI (≈3.000 M de ingresos, 10.500 empleados, casi 200 oficinas en EE. UU.) la mediana empresa de EE. UU. pasará a pesar mucho más [8].',
    como_gana_dinero: 'En correduría cobra comisiones sobre la prima que coloca y honorarios en grandes cuentas; no asume el riesgo del seguro. El ingreso sube con las tarifas, el valor asegurado de los clientes y el negocio nuevo; 271 M salen de los intereses del dinero de clientes que custodia [1]. En Human Capital cobra honorarios y comisiones de beneficios. El coste es casi todo personal (compensación y beneficios = 52 % de los ingresos en 2025), así que el margen sale de crecer más que la plantilla y de la plataforma común Aon Business Services [1]. Es muy estacional: el primer trimestre concentra las renovaciones de enero (margen ajustado del 1S26: 34,4 %; del 2T26: 28,9 %) [9].',
    clientes: 'No hay concentración: ningún cliente relevante [1]. La retención es alta (la empresa habla de «fuerte retención» en todas las líneas y de 40 pb de mejora desde el plan 3x3) [8, 9]. El poder de precios es indirecto: la comisión sigue a la prima. En el 2T26 el efecto mercado fue «modestamente positivo» en seguros comerciales pero desfavorable en reaseguro [9], mientras el índice de tarifas comerciales de Marsh cayó un 6 % (octavo trimestre de bajadas) [4]. El crecimiento orgánico se sostiene en el 5 % gracias al negocio nuevo.',
    confianza: 'Alta',
  },
  sector: {
    definicion: 'El mercado relevante es la intermediación de seguros y reaseguros en todo el mundo (ficha sectorial del 14-oct-2026): corredores que colocan riesgos por comisión u honorario. Global Market Insights lo sitúa en 276.500 M USD en 2025 y Mordor Intelligence en 359.270 M en 2026 [2, 3]. Usamos la primera, más prudente, comparada solo con Risk Capital (11.290 M); Human Capital es en parte correduría de beneficios y en parte consultoría, otro mercado [7]. Para USI, el mercado medio de EE. UU. supera los 40.000 M USD según Aon [8].',
    tamano: '≈ 276.500 M USD en 2025 (Global Market Insights) [2]; 359.270 M en 2026 según Mordor Intelligence [3]',
    unidad_serie: 'millones de USD',
    serie: [{ anio: '2025', tamano: 276500 }, { anio: '2026e', tamano: 301700 }, { anio: '2027e', tamano: 329100 }, { anio: '2028e', tamano: 359100 }, { anio: '2030e', tamano: 427400 }],
    tcac_historico_pct: null, tcac_previsto_pct: 9.1, cr5_pct: null, estructura: 'Moderadamente concentrada',
    drivers: [
      { driver: 'Tarifas de los seguros comerciales y del reaseguro', efecto: '−', horizonte: 'Cíclico', evidencia: 'Índice de Marsh: −6 % en el 2T26, octavo trimestre de bajadas; daños −12 % [4]. Aon: efecto mercado desfavorable en reaseguro en el 2T26 [9].' },
      { driver: 'Valores asegurados y economía', efecto: '+', horizonte: 'Estructural', evidencia: 'Crecimiento orgánico de Aon del 5 % en el 2T26 pese a las tarifas [9].' },
      { driver: 'Consolidación de corredurías medianas', efecto: '+/−', horizonte: 'Estructural', evidencia: 'NFP (13.400 M), AssuredPartners (13.450 M), Accession (9.825 M), USI (17.000 M): más escala, pero a 14-22 veces el EBITDA [7, 8].' },
      { driver: 'Tipos de interés (intereses fiduciarios)', efecto: '−', horizonte: 'Cíclico', evidencia: 'Intereses fiduciarios de Aon: 315 M en 2024, 271 M en 2025 [1].' },
      { driver: 'IA y venta directa', efecto: '+/−', horizonte: 'Estructural', evidencia: 'Caída media del 9 % de los corredores el 9-feb-2026 por aplicaciones de cotización con ChatGPT; Aon cayó un 9,3 % ese día [5, 6].' },
      { driver: 'Riesgos excedentes (E&S) y mercados de capitales', efecto: '+', horizonte: 'Estructural', evidencia: 'E&S = 26 % de las primas comerciales de EE. UU., el segmento que más crece; capital alternativo en reaseguro [8].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Cuatro globales (Marsh, Aon, WTW, Gallagher) y una larga cola regional respaldada por capital privado; competencia intensa por equipos [7].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Las grandes cuentas negocian honorarios; la mediana empresa es menos sensible al precio [1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Las aseguradoras dependen de los corredores; el «proveedor» crítico es el talento (52 % de los ingresos en personal) [1].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Licencias, datos y relaciones; los nuevos entran comprando corredurías [7].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'Venta directa y digital en riesgos sencillos (particulares, pymes); poco probable en grandes riesgos y reaseguro [5, 6].' },
    ],
    ciclo: { posicion: 'Contracción', comentario: 'Las tarifas comerciales llevan ocho trimestres bajando (−6 % en el 2T26) por exceso de capacidad y reaseguro más barato [4]. El crecimiento orgánico de Aon pasó del 7 % del 3T25 al 5 % de 2026 [9]. En 2008-09 el sector creció casi cero (recesión y tarifas blandas); en 2020 Aon siguió creciendo (+2 % orgánico); en 2022-24, con tarifas duras, creció un 6-7 % [7]. Un año de grandes catástrofes endurecería el mercado.' },
    regulacion: 'La correduría está regulada por los supervisores de seguros de cada estado y país (FCA en Reino Unido) y la consultoría de inversión por la SEC y el Departamento de Trabajo [1]. Las comisiones contingentes siguen vigiladas desde 2004. USI necesita aprobaciones regulatorias (antimonopolio de EE. UU.); el acuerdo vence el 1-jun-2027 con prórroga de tres meses [8]. La experiencia de WTW (2021) muestra que el Departamento de Justicia puede bloquear, aunque USI es de mediana empresa y solapa menos.',
    tendencias: 'La IA abarata la colocación y el análisis (Aon habla de «ventaja de contexto»: datos propios y analítica) pero abre la puerta a la venta directa en riesgos sencillos [5, 8]. El capital privado consolida corredurías medianas y encarece las compras [7]. Los mercados de capitales sustituyen parte del reaseguro; Aon lo convierte en negocio (Strategy and Technology Group creció a doble dígito en el 2T26) [9]. Aon gana en grandes riesgos y datos; con USI y NFP se expone más a la mediana empresa, donde la IA puede presionar antes.',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 4.1,
    posicion: '2.º mundial en correduría de seguros y reaseguros (≈4 % de un mercado de ≈276.500 M USD con los 11.290 M de Risk Capital; ≈6 % contando la correduría de beneficios de Human Capital); 2.º en reaseguro y de los tres primeros en consultoría de beneficios.',
    competidores: [
      { nombre: 'Marsh', pais: 'EE. UU.', ticker: 'MRSH', ingresos: 26981, cuota_pct: 6.2, margen_ebit_pct: 23.1, comentario: 'El líder; 17.265 M en correduría; compró McGriff (7.750 M) en 2024; Comprar con convicción baja en el informe de hoy [10].' },
      { nombre: 'Arthur J. Gallagher', pais: 'EE. UU.', ticker: 'AJG', ingresos: 13751, cuota_pct: 5.0, margen_ebit_pct: 24.5, comentario: 'Comprador en serie de mediana empresa; AssuredPartners por 13.450 M [7].' },
      { nombre: 'WTW', pais: 'Irlanda/Reino Unido', ticker: 'WTW', ingresos: 9708, cuota_pct: 2.5, margen_ebit_pct: 25.2, comentario: 'Correduría y consultoría de recursos humanos; la fusión con Aon se canceló en 2021 [7].' },
      { nombre: 'Brown & Brown', pais: 'EE. UU.', ticker: 'BRO', ingresos: 5902, cuota_pct: 2.1, margen_ebit_pct: 28.7, comentario: 'Pymes y mayorista; Accession por 9.825 M [7].' },
      { nombre: 'Ryan Specialty', pais: 'EE. UU.', ticker: 'RYAN', ingresos: 3051, cuota_pct: 1.1, margen_ebit_pct: 16.2, comentario: 'Mayorista E&S [7].' },
      { nombre: 'Hub International', pais: 'EE. UU.', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Privada; rival directo de USI en la mediana empresa [7].' },
    ],
    foso: {
      veredicto: 'Amplio', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 3, evidencia: 'Más primas colocadas dan más datos y facilidades propias (Aon Client Treaty); el reaseguro exige escala [1].' },
        { fuente: 'Costes de cambio', puntuacion: 4, evidencia: 'Programas complejos y retención alta; crecimiento orgánico del 5-7 % durante ocho trimestres de tarifas a la baja [9, 4].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 4, evidencia: 'Marca global, licencias en 120 países, datos de colocación [1].' },
        { fuente: 'Ventaja en costes', puntuacion: 4, evidencia: 'Margen operativo ajustado del 32,4 % en 2025, el más alto de los globales (Marsh ≈ 26 % ajustado en su informe) [1, 10].' },
        { fuente: 'Escala eficiente', puntuacion: 4, evidencia: 'Dos globales en grandes riesgos y reaseguro; difícil de replicar [1].' },
      ],
    },
    amenazas: 'La IA puede abaratar la colocación de riesgos estándar (pymes, particulares) y empujar las comisiones a la baja; con NFP y USI, Aon aumenta su peso precisamente en la mediana empresa de EE. UU., más expuesta que los grandes riesgos [5, 6, 8]. Un ciclo blando largo en daños y reaseguro. Y la integración de dos compras grandes seguidas puede costar equipos comerciales a rivales de capital privado. Probabilidad de erosión significativa del foso a cinco años: baja-media.',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Lo material para las cifras es el capital humano (personal = 52 % de los ingresos; retener a los productores de USI, con hasta 400 M de incentivos de retención) y la ética comercial (remuneración de las aseguradoras, sanciones, anticorrupción) [1, 8]. El clima es riesgo y negocio: las catástrofes endurecen el mercado y suben las comisiones de reaseguro [4].',
    controversias: 'Sin sanciones relevantes localizadas en los últimos tres años en el 10-K 2025; la fusión con WTW (2021) acabó con una demanda antimonopolio del Departamento de Justicia y 1.000 M de indemnización [1].',
    confianza: 'Media',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'sector', campo: 'cr5_pct', tipo: 'Complemento', intentos: '1) 10-K 2025 (sin cuotas); 2) Mordor Intelligence (solo «concentración media»); 3) suma de ingresos de los cinco grandes (mezcla perímetros)', decision: 'Omitido' },
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) 10-K y proxy 2026; 2) búsqueda no hecha por presupuesto; 3) —', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Proxy statement 2026 (DEF 14A): consejo, remuneración, ratio salarial, accionistas', editor: 'Aon plc', tipo: 'Primaria', fecha: '2026-04-28', url: E + '000119312526187428/aon-20260428.htm' },
  { id: 2, titulo: '8-K: salida del director financiero Edmund Reese y nombramiento interino de Nadin Virani', editor: 'Aon plc', tipo: 'Primaria', fecha: '2026-08-17', url: E + '000119312526354083/d376816d8k.htm' },
  { id: 3, titulo: 'Form 4 de consejeros y directivos (oct-2025 a oct-2026; form4.mjs)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-14', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000315293&type=4' },
  { id: 4, titulo: 'Nota de prensa: Aon to acquire USI (Mike Sicard, presidente de Aon plc tras el cierre)', editor: 'Aon plc', tipo: 'Primaria', fecha: '2026-08-31', url: E + '000119312526375328/d108801dex991.htm' },
  { id: 5, titulo: 'Notas de resultados de los cierres 2023-2025 (guía y cumplimiento)', editor: 'Aon plc', tipo: 'Primaria', fecha: '2026-01-30', url: E + '000162828026004273/ex991prq42025.htm' },
  { id: 6, titulo: '8-K: junta de 2026 y prórroga del acuerdo de expatriación del consejero delegado', editor: 'Aon plc', tipo: 'Primaria', fecha: '2026-07-01', url: E + '000119312526292736/d76205d8k.htm' },
];
const cons = (nombre, tipo, desde, com, cargo = 'Consejero') => ({ nombre, cargo, tipo, desde, comisiones: com });
const C = {
  directivos: {
    equipo: [
      { nombre: 'Gregory C. Case', cargo: 'Presidente (President) y consejero delegado', desde: '2005', participacion_pct: 0.4, trayectoria: 'Antes socio de McKinsey. En 21 años ha llevado a Aon de conglomerado con seguros a corredor y consultor puro: margen ajustado de ≈20 % (2015) a 32,4 % (2025) y BPA ajustado de 6,18 a 17,07 USD [1, 5]. Firmó la fusión fallida con WTW y las compras de NFP y USI.' },
      { nombre: 'Nadin Virani', cargo: 'Director financiero interino', desde: '2026', participacion_pct: null, trayectoria: 'Jefe de planificación corporativa desde enero de 2025; antes Broadridge y American Express. Interino desde el 17-ago-2026 tras la salida de Edmund Reese, que llevaba dos años [2].' },
      { nombre: 'Lester B. Knight', cargo: 'Presidente no ejecutivo del consejo', desde: '1999', participacion_pct: null, trayectoria: 'Fundador de RoundTable Healthcare Partners, ex vicepresidente de Cardinal Health; preside el consejo desde 2008. Compró 6,5 M USD de acciones el 2-sep-2026 tras la caída por USI [1, 3].' },
      { nombre: 'Lisa Stevens', cargo: 'Directora de administración', desde: '2023', participacion_pct: null, trayectoria: 'Responsable de la plataforma común Aon Business Services, clave en la mejora del margen [1].' },
      { nombre: 'Andy Marcell', cargo: 'Consejero delegado de Global Solutions', desde: '2025', participacion_pct: null, trayectoria: 'Dirige las líneas de solución; antes al frente de Risk Capital [1].' },
      { nombre: 'Mike Sicard', cargo: 'Presidente de Aon plc y consejero delegado de Middle Market (tras el cierre de USI)', desde: '2026', participacion_pct: null, trayectoria: 'Casi dos décadas al frente de USI; posible sucesor de Case [4].' },
    ],
    historial_guidance: [
      { anio: '2023', guia: 'Crecimiento orgánico de un dígito medio o más, mejora del margen ajustado, crecimiento del flujo libre', real: 'Orgánico 6 %, margen ajustado 31,6 % (+80 pb), flujo libre 3.183 M', cumplida: 'Sí' },
      { anio: '2024', guia: 'Orgánico de un dígito medio o más, margen ajustado al alza sin NFP, crecimiento del BPA ajustado', real: 'Orgánico 6 %, margen 31,5 % con NFP, BPA ajustado 15,60 (+10 %)', cumplida: 'Sí' },
      { anio: '2025', guia: 'Orgánico de un dígito medio o más, mejora del margen, fuerte crecimiento del BPA ajustado y del flujo libre de dos dígitos', real: 'Orgánico 6 %, margen 32,4 % (+90 pb), BPA ajustado 17,07 (+9 %), flujo libre +14 %', cumplida: 'Sí' },
      { anio: '2026', guia: 'Orgánico de un dígito medio o más, +70-80 pb de margen ajustado, fuerte crecimiento del BPA ajustado, flujo libre de dos dígitos; recompras de al menos 1.000 M', real: '1S26: orgánico 5 %, margen +80 pb, BPA ajustado +12 %; recompras suspendidas tras USI', cumplida: 'Parcial' },
    ],
    comentario: 'La dirección cumple su guía de forma sistemática desde 2023 [5]. Dos señales a vigilar: el director financiero salió en agosto de 2026 tras dos años, en plena preparación de la mayor compra de la historia de Aon, y hay un interino [2]; y la sucesión de Greg Case (63 años, 21 en el cargo) gana un candidato con la llegada de Mike Sicard como presidente de Aon plc [4]. El acuerdo de expatriación de Case se prorrogó hasta junio de 2027 [6].',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      cons('Lester B. Knight', 'Independiente', '1999', 'Ejecutiva (presidente); Gobierno y Nombramientos (presidente)', 'Presidente no ejecutivo'),
      cons('Gregory C. Case', 'Ejecutivo', '2005', 'Ejecutiva', 'Consejero delegado'),
      cons('José Antonio Álvarez', 'Independiente', '2024', 'Auditoría; Retribuciones'),
      cons('Jin-Yong Cai', 'Independiente', '2016', 'Finanzas (presidente); Ejecutiva; Retribuciones'),
      cons('Jeffrey C. Campbell', 'Independiente', '2018', 'Auditoría (presidente); Ejecutiva; Retribuciones'),
      cons('Cheryl A. Francis', 'Independiente', '2010', 'Personas (presidenta); Gobierno; Finanzas; Retribuciones'),
      cons('Jo Ann Jenkins', 'Independiente', '2025', 'Auditoría'),
      cons('Adriana Karaboutis', 'Independiente', '2022', 'Auditoría; Gobierno'),
      cons('Richard C. Notebaert', 'Independiente', '1998', 'Ejecutiva; Finanzas; Gobierno; Retribuciones'),
      cons('Gloria Santona', 'Independiente', '2004', 'Auditoría; Gobierno'),
      cons('Sarah E. Smith', 'Independiente', '2023', 'Finanzas'),
      cons('Byron O. Spruell', 'Independiente', '2020', 'Retribuciones (presidente); Ejecutiva; Auditoría'),
      cons('James G. Stavridis', 'Independiente', '2024', 'Finanzas'),
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 89.0, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 73.74, fijo: 1.5, variable_corto: 2.44, variable_largo: 68.77, ratio_salario_medio: null },
    remuneracion: 'Greg Case devengó 73,74 M USD en 2025 (26,21 M en 2024): 1,5 M de fijo, 2,44 M de bonus en efectivo y 68,77 M en acciones, casi todo una concesión extraordinaria ligada al plan 3x3 [1]. El variable a largo plazo (PSU del plan LPP) se mide por el BPA ajustado acumulado de tres años: el LPP 18 (2023-2025) pagó el 120,1 % con 45,02 USD frente a 44,32 de objetivo, y el comité excluyó el efecto de los ahorros de reestructuración y, en 2023, el de los intereses fiduciarios [1]. Premiar el BPA ajustado favorece las compras financiadas con deuda (USI es «acretiva en 2028»), no el ROIC. Hay recuperación (clawback) por fraude o incumplimiento. El voto consultivo de 2025 fue del 89 % a favor [1].',
    accionistas: [
      { nombre: 'BlackRock', pct: 6.29, tipo: 'Institucional', variacion: 'n.d.' },
      { nombre: 'Capital World Investors', pct: 5.69, tipo: 'Institucional', variacion: 'n.d.' },
      { nombre: 'The Vanguard Group', pct: null, tipo: 'Institucional', variacion: 'Desagregado por la reorganización interna de Vanguard (13G/A de marzo de 2026)' },
      { nombre: 'Consejeros y directivos', pct: 1.0, tipo: 'Insiders', variacion: 'Menos del 1 % en conjunto' },
    ],
    insiders: [
      { fecha: '2026-09-02', persona: 'Lester B. Knight (presidente del consejo)', operacion: 'Compra', acciones: 20000, importe: 6.55 },
      { fecha: '2026-02-10', persona: 'Lester B. Knight (presidente del consejo)', operacion: 'Compra', acciones: 4000, importe: 1.28 },
      { fecha: '2026-07-28', persona: 'Darren Zeidel (secretario general)', operacion: 'Venta', acciones: 1900, importe: 0.72 },
      { fecha: '2026-02-26', persona: 'Darren Zeidel (secretario general)', operacion: 'Venta', acciones: 4300, importe: 1.42 },
      { fecha: '2025-11-05', persona: 'Darren Zeidel (secretario general)', operacion: 'Venta', acciones: 8800, importe: 3.03 },
    ],
    control_y_defensas: 'Capital disperso sin accionista de control: BlackRock (6,3 %) y Capital World (5,7 %) son los mayores declarados [1]. Una acción, un voto; 12 de 13 consejeros independientes, presidente no ejecutivo separado del consejero delegado, elección anual y mayoría de votos [1]. Sociedad irlandesa: las recompras y dividendos necesitan «beneficios distribuibles» según la ley irlandesa [1]. Consejo con mandatos muy largos (Notebaert desde 1998, Knight desde 1999, Santona desde 2004).',
    alertas: [
      'Salida del director financiero el 17-ago-2026, dos semanas antes de anunciar USI; interino en el cargo [2].',
      'Remuneración extraordinaria del consejero delegado en 2025 (73,7 M USD) [1].',
      'Compras del presidente del consejo por 7,8 M USD en 12 meses (señal positiva); ventas del secretario general por 7,8 M [3].',
    ],
    confianza: 'Alta',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'voto en contra de la remuneración y ratio salarial', tipo: 'Complemento', intentos: '1) proxy 2026 (solo «89 % a favor» en 2025); 2) 8-K de la junta de 2026 (no recoge el voto); 3) ratio salarial: no extraído del proxy por presupuesto', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- D. Mercado y valoración
const bolsa = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const fD = [
  { id: 1, titulo: 'Históricos diarios de AON, ^GSPC y KIE (precio, rango, volumen, beta, rentabilidades, cierres anuales)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/AON/history/' },
  { id: 2, titulo: 'Aon plc: Financial Data, Forecasts, Estimates (BPA publicado, EBITDA ajustado, deuda neta, FCF 2024-2028)', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/AON-PLC-11994390/finances/' },
  { id: 3, titulo: 'Aon plc: consensus and target prices (21 analistas; cambios de objetivo jul-oct 2026)', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/AON-PLC-11994390/consensus/' },
  { id: 4, titulo: 'AON Analysis: estimaciones de BPA normalizado 2026-2027, ingresos y tendencia de 90 días', editor: 'Yahoo Finance', tipo: 'Analistas', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/AON/analysis/' },
  { id: 5, titulo: 'Estimaciones de BPA normalizado 2026-2027 de WTW, Gallagher, Brown & Brown y Ryan Specialty', editor: 'Yahoo Finance', tipo: 'Analistas', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/WTW/analysis/' },
  { id: 6, titulo: 'Ficha sectorial de corredores de seguros y su tabla de comparables (MarketScreener y Yahoo, 14-oct-2026)', editor: 'Repositorio de análisis (sectores/corredores-seguros-2026-10-14)', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://github.com/' },
  { id: 7, titulo: 'Daily Treasury Par Yield Curve Rates 2026 (10 años: 5,21 % el 13-oct-2026)', editor: 'U.S. Department of the Treasury', tipo: 'Primaria', fecha: '2026-10-13', url: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve&field_tdr_date_value=2026' },
  { id: 8, titulo: 'Implied ERP by month (ERPbymonth.xlsx): 4,20 % en octubre de 2026', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 9, titulo: 'Aon Announces Third-Quarter 2026 Earnings Release and Conference Call Date (28-oct-2026)', editor: 'Aon plc (Cision, vía Placera)', tipo: 'Primaria', fecha: '2026-10-09', url: 'https://placera.se/pressmeddelanden/aon-announces-third-quarter-2026-earnings-release-and-conference-call-date-20261009' },
  { id: 10, titulo: 'Nota de resultados 2T26 (acciones, balance a 30-jun-2026)', editor: 'Aon plc', tipo: 'Primaria', fecha: '2026-07-29', url: E + '000162828026050367/ex991prq22026.htm' },
  { id: 11, titulo: 'Presentación de la compra de USI (precio, múltiplo, sinergias, apalancamiento)', editor: 'Aon plc', tipo: 'Primaria', fecha: '2026-08-31', url: E + '000119312526375328/d108801dex992.htm' },
  { id: 12, titulo: 'Gallagher set to ramp up M&A deals after $13B purchase of AssuredPartners (múltiplos de AssuredPartners, NFP y McGriff)', editor: 'Business Insurance', tipo: 'Prensa', fecha: '2024-12-09', url: 'https://www.businessinsurance.com/gallagher-set-to-ramp-up-ma-deals-after-13b-purchase-of-assuredpartners/' },
  { id: 13, titulo: 'What made this Boston agency worth $9.8 billion to buyers (Accession: ≈15,6 veces el EBITDA ajustado)', editor: 'Agency Checklists', tipo: 'Prensa', fecha: '2025-06-16', url: 'https://agencychecklists.com/2025/06/16/what-made-this-boston-agency-worth-9-8-billion-to-buyers-76080/' },
  { id: 14, titulo: 'Form 10-K 2025 (acciones en circulación)', editor: 'Aon plc', tipo: 'Primaria', fecha: '2026-02-13', url: E + '000162828026008116/aon-20251231.htm' },
];
// Comparables: filas de la ficha sectorial (MarketScreener + Yahoo, 14-oct-2026) con el PER NTM recalculado en BPA normalizado (Yahoo) para que esté en la misma base que el BPA ajustado de Aon.
// NTM = 0,21 × 2026 + 0,79 × 2027. Marsh: BPA ajustado de Stock Analysis (10,45 y 11,42) del informe de Marsh de hoy.
const ficha = JSON.parse(fs.readFileSync(path.join(dir, '..', '..', '..', 'sectores', 'corredores-seguros-2026-10-14-comparables.json'), 'utf8')).empresas;
const bpaN = { MRSH: [10.45, 11.42, 177.01], WTW: [19.82, 22.93, 298.43], AJG: [13.10, 14.81, 235.28], BRO: [4.48, 4.83, 64.41], RYAN: [2.16, 2.44, 37.72] };
const empresas = ficha.filter((e) => e.ticker !== 'AON').map((e) => { const [b1, b2, p] = bpaN[e.ticker]; return { ...e, per_ntm: Math.round(p / (0.21 * b1 + 0.79 * b2) * 10) / 10 }; });

const D = {
  identificacion: {
    nombre: 'Aon plc', nombre_corto: 'Aon', ticker: 'AON', isin: 'IE00BLP1HW54', mercado: 'New York Stock Exchange', indice_referencia: 'S&P 500',
    pais: 'Irlanda', pais_iso: 'IE', sector: 'Financiero', industria: 'Corredores de seguros', sede: 'Dublín (Irlanda); sede operativa en Londres', fundacion: '1982', empleados: 62159, web: 'https://www.aon.com',
    precio: bolsa.identificacion.precio, fecha_precio: bolsa.identificacion.fecha_precio, acciones: 212.4, capitalizacion_publicada: 58436, free_float_pct: 99.0,
    max_52s: bolsa.identificacion.max_52s, min_52s: bolsa.identificacion.min_52s, volumen_medio_diario: '≈ 503 M USD/día (1,58 M de acciones; 3 meses)', proximos_resultados: '2026-10-28',
  },
  consenso: {
    guidance: 'Guía 2026 (presentada el 30-ene-2026 y reafirmada el 29-jul-2026): crecimiento orgánico de «un dígito medio o más», +70-80 pb de margen operativo ajustado, «fuerte» crecimiento del BPA ajustado y crecimiento de dos dígitos del flujo libre [10]. Con USI (31-ago-2026): dilutiva para el BPA ajustado en 2027 y acretiva desde 2028; 395 M de sinergias netas de EBITDA hasta 2029; apalancamiento de ≈4,5x al cierre y 2,8-3,0x en unos 24 meses; sin recompras a corto plazo [11]. Resultados del 3T26 el 28-oct-2026 [9].',
    estimaciones: [
      { periodo: '2026e', ingresos: 17919, ebitda: 6129, ebit: 5940, bpa: 18.57, dpa: 3.18, fuente: 'Yahoo (BPA normalizado, 22 analistas) y MarketScreener (ingresos, EBITDA y EBIT ajustados, DPA) [4, 2]' },
      { periodo: '2027e', ingresos: 21662, ebitda: 7344, ebit: 7145, bpa: 20.21, dpa: 3.47, fuente: 'Yahoo (20 analistas, con USI) y MarketScreener [4, 2]' },
      { periodo: '2028e', ingresos: 22796, ebitda: 7985, ebit: 7819, bpa: null, dpa: 3.82, fuente: 'MarketScreener (sin BPA ajustado de 2028) [2]' },
    ],
    recomendaciones: { n_analistas: 21, comprar: null, mantener: null, vender: null, po_medio: 354.21, po_min: 229, po_max: 435 },
    revisiones: 'El BPA normalizado de 2027 ha bajado de 21,35 a 20,21 USD en 90 días (−5 %), casi todo por USI (deuda y fin de las recompras); el de 2026, de 19,10 a 18,57 [4]. Los objetivos van a la baja: desde el 1-sep, KBW (417 a 342), Wells Fargo (383 a 323), BofA (339 a 322), Evercore (423 a 375), Mizuho (366 a 324), Barclays (382 a 317), Morgan Stanley (410 a 350), BMO (360 a 286) y JPMorgan (412 a 362) recortaron [3]. El BPA de MarketScreener es el publicado (14,24 en 2026, 15,03 en 2027 con la amortización de USI) y no se usa [2].',
    base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: 2.1,
    confianza: 'Media',
  },
  bolsa: {
    ...bolsa.bolsa,
    beta: 0.65, volatilidad_pct: bolsa.bolsa?.volatilidad_pct ?? null, max_drawdown_pct: bolsa.bolsa?.max_drawdown_pct ?? null, posicion_corta_pct: null,
    comentario: 'La acción pierde un 23,6 % en un año frente al +16,2 % del S&P 500 y el +2,4 % del ETF de seguros KIE (todo de precio) [1]. Tres golpes: −9,3 % el 9-feb-2026 por el pánico a la IA en los corredores, −9,5 % el 31-ago-2026 por la compra de USI (más deuda, sin recompras) y una caída continua en septiembre y octubre hasta el mínimo de 266,33 USD del 5-oct [1]. Había marcado máximo de 52 semanas (382,34) el 28-jul, la víspera de los resultados del 2T26: en dos meses y medio pierde un 28 %. A cinco años va un −2,2 % anual frente al +11,7 % del índice. Beta mensual de 5 años de 0,65 (0,77 ajustada) [1].',
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: bolsa.cierres_ejercicio.filter((x) => +x.anio >= 2019).map((x) => ({ anio: x.anio, precio_cierre: x.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: x.anio === '2021' })),
    confianza: 'Alta',
  },
  comparables: {
    criterio: 'Los cinco corredores cotizados con negocio comparable: Marsh y WTW (globales con consultoría de recursos humanos, los más parecidos), Gallagher y Brown & Brown (mediana empresa y compradores en serie, el perfil al que se acerca Aon con NFP y USI) y Ryan Specialty (mayorista E&S). Fuera: Baldwin (pérdidas), Hub y Acrisure (privadas). Capitalización, EV/EBITDA, margen, ROIC y deuda de la ficha sectorial del 14-oct-2026 (MarketScreener y Yahoo); el PER NTM, recalculado con el BPA normalizado de Yahoo (Marsh, ajustado de Stock Analysis) para que esté en la misma base que el BPA ajustado de Aon [5, 6].',
    empresas,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2026-08', objetivo: 'USI', comprador: 'Aon', ev: 17000, ev_ventas: 5.67, ev_ebitda: 22.5, prima_pct: null, excluir: false, comentario: '16.700 M netos de créditos fiscales; 14,5x el EBITDA con sinergias (1.151 M), ≈22x los 756 M ajustados por el comprador; 17,1x los 995 M del vendedor [11].' },
      { fecha: '2024-12', objetivo: 'AssuredPartners', comprador: 'Arthur J. Gallagher', ev: 13450, ev_ventas: 4.6, ev_ebitda: 14.3, prima_pct: null, excluir: false, comentario: 'EBITDAC pro forma [12].' },
      { fecha: '2024-11', objetivo: 'McGriff Insurance Services', comprador: 'Marsh McLennan', ev: 7750, ev_ventas: null, ev_ebitda: 21.0, prima_pct: null, excluir: false, comentario: 'Según una nota de analistas citada por la prensa [12].' },
      { fecha: '2023-12', objetivo: 'NFP', comprador: 'Aon', ev: 13400, ev_ventas: null, ev_ebitda: 22.0, prima_pct: null, excluir: false, comentario: 'Incluye deuda asumida [12].' },
      { fecha: '2025-06', objetivo: 'Accession (Risk Strategies)', comprador: 'Brown & Brown', ev: 9825, ev_ventas: 5.8, ev_ebitda: 15.6, prima_pct: null, excluir: false, comentario: 'Unos 630 M de EBITDA ajustado de 2024 [13].' },
    ],
    comentario: 'Las plataformas de corretaje de mediana empresa se han pagado a 14-22 veces el EBITDA en 2023-2026 [12, 13]. Aon ha pagado dos veces en lo alto del rango (NFP 22x y USI ≈22x sin sinergias). Es valor de control y sirve de techo para la correduría, no de catalizador: Aon (58.400 M de capitalización y 32.000 M de deuda pro forma) no es objetivo plausible de una operación.',
    confianza: 'Media',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'bolsa', campo: 'posición corta', tipo: 'Complemento', intentos: '1) bolsa.mjs (no la da); 2) FINRA (no consultado por presupuesto); 3) Yahoo (sin dato)', decision: 'Omitido' },
    { seccion: 'consenso', campo: 'reparto de recomendaciones y BPA ajustado de 2028', tipo: 'Complemento', intentos: '1) MarketScreener («Outperform» sin desglose; BPA publicado); 2) Yahoo (solo 2026-2027); 3) Stock Analysis (bloqueo antibot)', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Feed de Seeking Alpha de AON (artículos y noticias, jul-oct 2026)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-14', url: 'https://seekingalpha.com/api/sa/combined/AON.xml' },
  { id: 2, titulo: 'Aon: A Pricey USI Acquisition Ironically Creates Appeal, Holding On For A Dip', editor: 'Seeking Alpha (autor externo)', tipo: 'Foros y redes', fecha: '2026-09-30', url: 'https://seekingalpha.com/article/4950912-aon-stock-pricey-usi-acquisition-ironically-creates-appeal' },
  { id: 3, titulo: 'Aon: Remaining Cautious Amid USI Acquisition', editor: 'Seeking Alpha (autor externo)', tipo: 'Foros y redes', fecha: '2026-08-31', url: 'https://seekingalpha.com/article/4941881-aon-remaining-cautious-amid-usi-acquisition' },
  { id: 4, titulo: 'Aon: Fundamentally Strong, But Needs To Become Cheaper', editor: 'Seeking Alpha (autor externo)', tipo: 'Foros y redes', fecha: '2026-08-10', url: 'https://seekingalpha.com/article/4934459-aon-stock-fundamentally-strong-but-needs-to-become-cheaper' },
  { id: 5, titulo: 'Stream de Stocktwits de AON (API pública, 30 mensajes de ago-oct 2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-14', url: 'https://api.stocktwits.com/api/2/streams/symbol/AON.json' },
];
const Ee = {
  sentimiento: {
    tono: 'Dividido', tendencia: 'Empeora',
    revisadas: [
      { plataforma: 'Seeking Alpha (artículos de autores externos)', fecha: '2026-09', n_comentarios: 3, tono: 'Dividido', resumen: 'Tres artículos en tres meses: «fundamentalmente fuerte, pero tiene que abaratarse» (agosto), «cautela con USI» (31-ago) y «la compra cara de USI crea atractivo; espero una caída para entrar» (30-sep) [2, 3, 4].' },
      { plataforma: 'Seeking Alpha (noticias y titulares)', fecha: '2026-10', n_comentarios: 18, tono: 'Negativo', resumen: 'Domina USI: caída del 10 % el día del anuncio, rebajas de la calificación cuantitativa en septiembre, salida del director financiero en agosto; dividendo de 0,82 USD mantenido [1].' },
      { plataforma: 'Stocktwits', fecha: '2026-10', n_comentarios: 30, tono: 'Negativo', resumen: 'Mensajes de «nuevo mínimo de 52 semanas» casi a diario en septiembre; quejas por la deuda y el fin de las recompras; algún comprador oportunista y eco de la compra de 6,5 M USD del presidente [5].' },
    ],
    temas: [
      { tema: 'USI: precio alto, deuda y fin de las recompras', postura: 'Bajista', peso: 'Alto', contraste: 'Cierto en cifras: ≈22x el EBITDA sin sinergias, apalancamiento a ≈4,5x y BPA ajustado de 2027 rebajado un 5 % por el consenso; la empresa promete acreción en 2028 [Ver A y D].' },
      { tema: 'La IA se come la intermediación', postura: 'Dividida', peso: 'Medio', contraste: 'El susto de febrero (−9,3 %) vino de seguros personales; el orgánico de Aon sigue en el 5 %; pero USI y NFP aumentan el peso de la mediana empresa, más expuesta.' },
      { tema: 'Valoración en mínimos de una década', postura: 'Alcista', peso: 'Medio', contraste: 'PER adelantado de ≈13,8 veces el BPA ajustado de 2027 frente a una mediana de 21 en cinco años.' },
      { tema: 'Compras del presidente del consejo', postura: 'Alcista', peso: 'Bajo', contraste: 'Confirmado en el Form 4: 6,55 M USD el 2-sep-2026 a ≈327 USD.' },
    ],
    lectura: 'El inversor particular pasó de ver a Aon como «buena pero cara» (agosto) a castigarla por USI: deuda, recompras suspendidas y una compra cara en el segmento más disputado. El tono es negativo y empeora, con mínimos de 52 semanas casi diarios en septiembre, mientras los analistas recortan objetivos pero mantienen sobreponderar (objetivo medio 354 USD). Hay rasgos de capitulación (−28 % en dos meses y medio) que no se corresponden con un deterioro del negocio actual (orgánico del 5 %, margen al alza). Ninguna cifra del informe sale de estas fuentes.',
    confianza: 'Baja',
  },
  fuentes: fE,
  huecos: [{ seccion: 'sentimiento', campo: 'Reddit y comentarios de lectores', tipo: 'Complemento', intentos: '1) Reddit (403, según lecciones); 2) comentarios de Seeking Alpha (requieren registro); 3) Stocktwits (leído)', decision: 'Omitido' }],
};

guarda('A', A); guarda('B', B); guarda('C', C); guarda('D', D); guarda('E', Ee);
console.log('Notas A-E escritas. Comparables:', JSON.stringify(empresas.map((e) => [e.ticker, e.per_ntm, e.ev_ebitda_ntm])));
