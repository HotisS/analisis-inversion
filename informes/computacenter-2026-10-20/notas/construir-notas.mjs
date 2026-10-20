// Escribe las notas A-E de Computacenter (corte 2026-10-20) a partir de los documentos de notas/docs (ESEF de
// filings.xbrl.org, RNS del NSM de la FCA, resultados del 1S26), de cuentas-xbrl.json, bolsa.json y yahoo-datos.json
// (Yahoo quoteSummary del 20-oct-2026, 07:32 UTC). Cada nota cita solo con [n] de su propia lista de fuentes.
// Ejecutar: node informes/computacenter-2026-10-20/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const lee = (f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const r1 = (x) => (x == null ? null : Math.round(x * 10) / 10);
const r2 = (x) => (x == null ? null : Math.round(x * 100) / 100);
const B = lee('bolsa.json');
const Y = lee('yahoo-datos.json').datos;
const FCA = 'https://data.fca.org.uk/artefacts/NSM/RNS';
const XB = 'https://filings.xbrl.org/549300XSXUZ1I19DB105';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Annual Report and Accounts 2025 (ESEF): cuentas consolidadas, notas de segmentos (4), intangibles y deterioro (16-17), flujos, caja neta, factoring y principal cliente', editor: 'Computacenter plc (repositorio ESEF filings.xbrl.org)', tipo: 'Primaria', fecha: '2026-03-11', url: `${XB}/2025-12-31/ESEF/GB/0/549300XSXUZ1I19DB105-2025-12-31/reports/549300XSXUZ1I19DB105-2025-12-31-T01.xhtml` },
  { id: 2, titulo: 'Annual Report and Accounts 2024 (ESEF): cuentas, segmentos 2023-2024 y flujos', editor: 'Computacenter plc (repositorio ESEF filings.xbrl.org)', tipo: 'Primaria', fecha: '2025-03-18', url: `${XB}/2024-12-31/ESEF/GB/0/549300XSXUZ1I19DB105-2024-12-31/reports/549300XSXUZ1I19DB105-2024-12-31-T01.xhtml` },
  { id: 3, titulo: 'Annual Report and Accounts 2023 (ESEF): balance reexpresado 2022, flujos y fondo de comercio', editor: 'Computacenter plc (repositorio ESEF filings.xbrl.org)', tipo: 'Primaria', fecha: '2024-03-19', url: `${XB}/2023-12-31/ESEF/GB/0/549300XSXUZ1I19DB105-2023-12-31/reports/549300XSXUZ1I19DB105-2023-12-31-T01.xhtml` },
  { id: 4, titulo: 'Annual Report and Accounts 2022 (ESEF): conciliación de medidas ajustadas 2021-2022, historial 2018-2022 y cambio de criterio de ingresos (agente/principal)', editor: 'Computacenter plc (repositorio ESEF filings.xbrl.org)', tipo: 'Primaria', fecha: '2023-03-14', url: `${XB}/2022-12-31/ESEF/GB/0/549300XSXUZ1I19DB105-2022-12-31/reports/549300XSXUZ1I19DB105-2022-12-31-T01.xhtml` },
  { id: 5, titulo: '2026 Half Year Results (RNS 7571T): cuenta, balance y flujos del 1S26, segmentos, cartera de pedidos, guía de 2026 (BPA ajustado antes de impuestos ≥ 380 M GBP)', editor: 'Computacenter plc (RNS; copia en directorstalkinterviews.com)', tipo: 'Primaria', fecha: '2026-09-08', url: 'https://www.directorstalkinterviews.com/wp-content/uploads/2026/09/Computacenter-2026-Half-Year-Results.pdf' },
  { id: 6, titulo: '2025 Full Year Results (RNS 3274W): perspectivas para 2026 y guía técnica', editor: 'Computacenter plc (FCA National Storage Mechanism)', tipo: 'Primaria', fecha: '2026-03-12', url: `${FCA}/0f9a28be-df92-4f33-b285-7145b98e7652.html` },
  { id: 7, titulo: '2024 Full Year Results (RNS 0178B): perspectivas para 2025', editor: 'Computacenter plc (FCA National Storage Mechanism)', tipo: 'Primaria', fecha: '2025-03-18', url: `${FCA}/5577626.html` },
];
// Amortizaciones totales = inmovilizado + derechos de uso + intangibles (el XBRL solo daba los intangibles) [A1-A4].
const DA = { 2021: 24.8 + 50.6 + 15.3, 2022: 21.5 + 50.5 + 18.9, 2023: 20.4 + 41.4 + 18.9, 2024: 21.5 + 41.0 + 18.8, 2025: 22.4 + 45.1 + 20.1 };
const cuentaBase = [
  // periodo, ingresos, coste_ventas, gastos_generales, ebit, res_fin, bai, impuestos, minoritarios, BN, gastos_fin, bpa, dpa, acciones, no_rec
  ['2021', 5034.5, 4166.7, 612.0, 255.2, -7.2, 248.0, 61.5, 1.2, 185.3, 7.5, 1.609, 0.663, 115.2, 0],
  ['2022', 6470.5, 5523.4, 691.8, 256.4, -7.4, 249.0, 64.8, 1.4, 182.8, 9.8, 1.591, 0.679, 114.9, 1.8],
  ['2023', 6922.8, 5878.8, 783.3, 268.8, 3.3, 272.1, 72.7, 1.8, 197.6, 10.5, 1.730, 0.700, 114.1, -8.1],
  ['2024', 6964.8, 5929.8, 798.9, 237.9, 6.7, 244.6, 72.7, 1.1, 170.8, 7.8, 1.529, 0.707, 111.7, -1.8],
  ['2025', 9193.9, 8049.8, 879.5, 241.2, -2.7, 238.5, 81.4, 3.4, 153.7, 15.1, 1.455, 0.746, 105.6, 23.4],
];
const cuenta = cuentaBase.map(([p, ing, cv, gg, ebit, rf, bai, imp, mi, bn, gf, bpa, dpa, acc, nr]) => ({
  periodo: p, ingresos: ing, coste_ventas: cv, gastos_generales: gg, ebitda: r1(ebit + DA[p]), amortizaciones: r1(DA[p]), ebit,
  resultado_financiero: rf, bai, impuestos: imp, minoritarios: mi, beneficio_neto: bn, gastos_financieros: gf,
  participadas_en_ebitda: null, no_recurrentes_en_ebitda: nr === 0 ? null : nr, bpa, dpa, dpa_extraordinario: 0, acciones_diluidas: acc,
}));
const balanceHist = [
  // periodo, activo, act_corr, pas_corr, pas_total, FdC, intang, inmov, exist, clientes, proveedores, act_contr, pas_contr, caja, deuda, arrend, PN, minor, reservas
  ['2021', 2693.4, 2144.7, 1763.2, 1948.6, 155.8, 117.9, 90.0, 341.3, 1254.7, 1410.4, 148.1, 257.6, 273.2, 31.8, 146.1, 740.5, 4.3, 762.3],
  ['2022', 3244.0, 2647.7, 2210.6, 2372.0, 178.9, 163.2, 94.1, 417.7, 1683.8, 1857.5, 129.2, 273.2, 264.4, 20.1, 127.1, 865.7, 6.3, 854.4],
  ['2023', 3058.0, 2491.9, 1976.6, 2108.6, 174.6, 147.8, 96.1, 216.0, 1498.1, 1674.5, 151.9, 234.6, 471.2, 12.2, 115.4, 941.7, 7.7, 1041.6],
  ['2024', 3366.0, 2792.0, 2409.7, 2547.0, 174.5, 143.0, 90.7, 307.2, 1656.8, 2054.3, 137.5, 285.7, 489.6, 7.4, 129.5, 810.2, 8.8, 1033.7],
  ['2025', 4063.9, 3461.7, 2959.7, 3166.0, 156.7, 128.3, 86.0, 482.8, 1926.6, 2479.2, 212.3, 392.8, 628.5, 22.5, 179.8, 897.9, 0, 1123.6],
].map(([periodo, activo_total, activo_corriente, pasivo_corriente, pasivo_total, fondo_comercio, intangibles, inmovilizado_material, existencias, clientes, proveedores, activos_contrato, pasivos_contrato, caja, deuda_financiera, arrendamientos, patrimonio_neto, minoritarios, reservas]) => ({
  periodo, activo_total, activo_corriente, pasivo_corriente, pasivo_total, fondo_comercio, intangibles, inmovilizado_material, existencias, clientes, proveedores, activos_contrato, pasivos_contrato, caja, deuda_financiera, arrendamientos, patrimonio_neto, minoritarios, reservas,
}));
const flujosHist = [
  // periodo, FO, capex, arrend, adq, desinv, div, recompras, emision, intereses (bancarios + de arrendamientos)
  ['2021', 224.3, 30.3, 50.2, 2.5, 7.5, 62.4, 25.5, 6.2, 2.3 + 5.2],
  ['2022', 242.1, 35.5, 50.3, 28.3, 1.1, 80.5, 34.4, 6.2, 2.9 + 4.9],
  ['2023', 410.6, 35.1, 41.4, 19.3, 0, 77.3, 38.0, 9.2, 2.6 + 4.7],
  ['2024', 417.1, 31.5, 41.6, 18.7, 0.3, 78.9, 23.1 + 198.7 + 1.5, 6.0, 1.3 + 5.8],
  ['2025', 293.6, 36.0, 43.4, 1.7, 0.1, 74.6, 21.9, 12.1, 5.8 + 9.3],
].map(([periodo, flujo_operativo, capex, pagos_arrendamientos, adquisiciones, desinversiones, dividendos, recompras, emision_acciones, intereses]) => ({
  periodo, flujo_operativo, capex, pagos_arrendamientos, adquisiciones, desinversiones, dividendos, recompras: r1(recompras), emision_acciones, intereses_en_financiacion: r1(intereses),
}));

const A = {
  _estado: 'Completa. Cuentas del XBRL ESEF 2021-2025 comprobadas con los informes anuales 2022-2025 (amortizaciones completadas con inmovilizado y derechos de uso; fondo de comercio, activos y pasivos de contrato, deuda bancaria, adquisiciones e intereses de arrendamientos añadidos de las notas); 2020 fuera por no estar reexpresado (cambio de criterio agente/principal de 2022). LTM a junio de 2026 con el semestral del 8-sep-2026.',
  financieros: {
    cuenta,
    ltm: {
      periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 12050.3, ebitda: 402.7, ebit: 310.7, beneficio_neto: 204.3, bpa: 1.937, dpa: 0.781, dpa_extraordinario: 0, fcf: 271.8,
      participadas_en_ebitda: null, no_recurrentes_en_ebitda: 21.2,
    },
    cambios_perimetro: [
      { periodo: '2026', descripcion: 'AgreeYa Solutions (servicios profesionales en EE. UU. e India; valor empresa 120 M USD, ≈ 120 M USD de ventas y 14 M USD de EBITDA ajustado en 2025), consolidada desde enero de 2026, y GAI (revendedor para la Administración federal de EE. UU.; hasta 92 M USD; ≈ 390 M USD de facturación bruta), desde junio de 2026: 124,2 M GBP pagados en el 1S26 [5].' },
    ],
    comentario: 'Las ventas NIIF pasan de 5.034,5 M GBP en 2021 a 9.193,9 M en 2025 (+16,3 % anual) y a 12.050 M en los doce meses a junio de 2026, pero la cifra engaña: desde 2022 el software y los servicios de terceros revendidos se contabilizan solo por su margen (agente), y la facturación bruta, la medida de gestión, fue de 12.988 M en 2025 [1, 4]. El beneficio bruto, que no depende de ese criterio, creció del 867,8 M de 2021 al 1.144,1 M de 2025 (+7,2 % anual) y el margen bruto sobre ventas cayó del 17,2 % al 12,4 % por la mezcla: crecen los grandes proyectos de hardware para centros de datos de clientes de hiperescala en Norteamérica, de margen bajo [1]. El resultado operativo ajustado estuvo plano en 2021-2025 (262,8 → 274,7 M) y se dispara en 2026: 153,1 M en el 1S26 (+87 %) con ventas +71,6 % y margen bruto del 9,6 % (−303 puntos básicos) [5]. Norteamérica pasa del 44 % al 62 % del resultado de los segmentos; Francia arrastra pérdidas (deterioro de 20,2 M en 2025) [1, 5].',
    ajustes: 'La empresa publica medidas ajustadas que excluyen la amortización de intangibles comprados (10,1 M en 2025; 8,8 M solo en el 1S26 por AgreeYa) y las partidas excepcionales: en 2025, deterioro de Francia y del fondo de comercio de Europa Occidental (20,2 M) y gastos de una compra fallida (3,2 M); en 2024, una ganancia de 1,8 M por la liberación de un pago aplazado de BITS; en 2023, ganancias de 8,1 M ligadas a compras; en 2022, 1,8 M de gastos de compra [1, 2, 4]. Esas partidas se tratan como no recurrentes en el EBITDA; la amortización de lo comprado se repite y no se trata como no recurrente en el EBITDA (está en las amortizaciones). El BPA ajustado diluido (175,1 peniques en 2025 frente a 145,5 publicado) es la base del consenso y de la guía [1].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '1S25', ingresos: 3988.8, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 116.9, margen_ebitda_pct: 2.9, bpa: 0.525, vs_consenso: 'En línea' },
      { periodo: '2S25', ingresos: 5205.1, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 211.9, margen_ebitda_pct: 4.1, bpa: 1.226, vs_consenso: null },
      { periodo: '1S26', ingresos: 6845.2, crecimiento_pct: 71.6, crecimiento_organico_pct: null, ebitda: 190.8, margen_ebitda_pct: 2.8, bpa: 1.019, vs_consenso: 'Superior' },
    ],
    ultima_presentacion: 'En marzo de 2026 la dirección cerró 2025 con una cartera de pedidos de producto de 7.100 M GBP (+200 % interanual) y solo prometió «progreso» en 2026, prudente por la escasez de componentes [6]. Seis meses después el discurso es otro: 1S26 «récord», cartera de 9.300 M (+323 %) y guía de beneficio antes de impuestos ajustado de al menos 380 M, un 11 % sobre el consenso que la propia empresa había recopilado (340,9 M; rango 332-354) [5]. El motor es Norteamérica: clientes de hiperescala y «neocloud» que construyen centros de datos para IA, con un 62 % del resultado de los segmentos. La dirección reconoce tres cosas que el mercado vigila: el margen bruto baja por la mezcla (9,6 % sobre ventas), la inflación de componentes por la demanda de IA hace que algunos clientes «reprioricen» su gasto, y Servicios Gestionados cae un 4,5 % con provisiones de contratos que suben de 14,8 a 24,8 M [5]. Alemania pierde beneficio (−13 %) por costes de eficiencia y la Administración pública no despega. Lo que la dirección no cuantifica es el peso del mayor cliente en 2026 (en 2025, 2.731 M GBP de ventas, el 30 % del grupo [1]) ni cuánto de la cartera es de unos pocos proyectos.',
    confianza: 'Media',
  },
  balance: {
    historico: balanceHist,
    vencimientos: [{ anio: '2026', importe: 10.6 }, { anio: '2027+', importe: 14.1 }],
    liquidez: 'Caja de 333,4 M GBP a 30-jun-2026 (628,5 M al cierre de 2025) y una línea de crédito multidivisa no dispuesta de 200 M GBP con vencimiento el 8-dic-2029; deuda bancaria de 24,7 M (financiación de un cliente en Norteamérica, la sede de Kerpen e India) [1, 5].',
    rating: 'Sin rating',
    coste_deuda_pct: null,
    vida_media_anios: null,
    otros_pasivos: 'La caja de cierre de año está inflada por cobros anticipados de clientes que se deshacen en el primer semestre (salida de circulante de 245 M en el 1S26 y de 251 M en el 1S25) [5]. Hay dos financiaciones de clientes fuera de la deuda: venta de cuentas a cobrar sin recurso a petición de clientes que piden plazos largos (43,4 M a junio de 2026; 50,4 M a diciembre de 2025) y un programa de «invoice financing» sin recurso para proyectos concretos que sube de 38,8 a 140,5 M en seis meses [1, 5]. Inventario de 1.260 M a junio (482,8 M en diciembre), casi todo de pedidos comprometidos y en parte pagado por adelantado (ingresos diferidos de 1.109 M) [5]. Obligación por pensiones de 21,2 M, provisiones de 37,1 M (de ellas 24,8 M de contratos de servicios deficitarios) y arrendamientos de 175,7 M [5]. Sin covenants relevantes ni pagos aplazados de compras pendientes conocidos.',
    comentario: 'El circulante comercial (existencias + clientes − proveedores, con activos y pasivos de contrato) es negativo al cierre de cada año desde 2023 (−250 M en 2025) porque proveedores y anticipos financian el inventario de los grandes proyectos; en junio vuelve a casi cero (−31 M en 2026) [1, 5]. La caja neta sin arrendamientos («adjusted net funds») fue de 606 M a diciembre de 2025 y de 308,7 M a junio de 2026, tras pagar 124,2 M por AgreeYa y GAI y 38 M en acciones para los planes de empleados [5]. El riesgo del balance no es la deuda sino el tamaño del circulante bruto: 3.999 M de existencias y clientes frente a 4.030 M de proveedores e ingresos diferidos a junio, con el mayor cliente pesando un 30 % de las ventas: un impago o un retraso de un gran proyecto se notaría en la caja antes que en la cuenta.',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujosHist,
    comentario: 'El flujo operativo de 2021-2025 suma 1.588 M GBP frente a un beneficio neto de 890 M: la conversión es alta porque el circulante es negativo y crece con el negocio, pero es volátil (410,6 M en 2023 y 417,1 M en 2024 frente a 293,6 M en 2025) y estacional: los primeros semestres consumen caja (−82,6 M de flujo operativo en el 1S26) y los segundos la devuelven [1, 5]. La inversión es pequeña: 36 M en 2025 (0,4 % de las ventas), que sube a unos 70-75 M en 2026 por el nuevo centro de integración de Atlanta y el diseño del nuevo ERP; con los pagos de arrendamientos (43,4 M de principal y 9,3 M de intereses) la inversión de mantenimiento ronda 80-90 M al año (estimación propia) [1, 5]. En 2024 se recompraron 200 M con una recompra en bolsa (5 M de acciones amortizadas) y en 2021-2025 se pagaron 374 M de dividendos [1].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'Grant Thornton UK LLP',
    anios_auditor: 4,
    opinion: 'Favorable (2025); revisión limitada sin salvedades del 1S26',
    comentario: 'Cuentas sin salvedades de Grant Thornton, auditor desde el ejercicio 2023 (antes KPMG) [1, 5]. Tres puntos de juicio. Primero, el reconocimiento de ingresos como agente o principal: el cambio de 2022 sacó de las ventas 2.582 M de facturación (2022) y hace que el margen sobre ventas suba o baje con la mezcla sin que cambie el beneficio [4]. Segundo, la caja de cierre depende de cobros anticipados, de la venta de cuentas a cobrar (43,4 M) y del «invoice financing» (140,5 M a junio), que crece rápido con los proyectos grandes [5]. Tercero, las medidas ajustadas excluyen la amortización de lo comprado (que crece con AgreeYa) y las excepcionales, que en 2023-2024 fueron ganancias y en 2025 un deterioro: no hay sesgo sistemático a favor del ajustado [1, 2]. La remuneración en acciones es pequeña (9,0 M en 2025, un 4 % del beneficio ajustado) [1]. Lectura de los indicadores del motor: Altman alto por la rotación del activo, Piotroski y Beneish sin señales (ver tabla), aunque el Beneish es poco útil con ventas que cambian de criterio.',
    senales: [
      { senal: 'Financiación de circulante fuera de la deuda creciendo', nivel: 'Media', comentario: '«Invoice financing» sin recurso de 38,8 a 140,5 M en el 1S26 más 43,4 M de venta de cuentas a cobrar: se tratan como deuda asimilada en el puente [5].' },
      { senal: 'Concentración en un cliente', nivel: 'Media', comentario: 'El mayor cliente aportó 2.731 M GBP de ventas en 2025 (30 %; 1.096 M en 2024) [1].' },
      { senal: 'Provisiones de contratos de servicios al alza', nivel: 'Baja', comentario: 'De 14,8 a 24,8 M en el 1S26 por unos pocos contratos de Servicios Gestionados por debajo de lo previsto [5].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Dividendo con cobertura de 2 a 2,5 veces el BPA ajustado diluido; el a cuenta suele ser un tercio del total del año anterior, pero en 2026 se subió un 14,8 % (27,1 peniques) por el semestre [1, 5]. La caja sobrante se devuelve cuando se acumula: recompra de 200 M en 2024 (5 M de acciones) y, antes, ofertas de recompra y devoluciones especiales; desde la salida a bolsa ha devuelto 1.350 M GBP [1, 5]. Las prioridades declaradas son invertir en sistemas (26,6 M de gasto en el 1S26 y 70-75 M de inversión en 2026), compras selectivas que amplíen el mercado (Norteamérica) y devolver el excedente [5]. El fondo de los empleados compra acciones en bolsa para los planes (38 M en el 1S26), de modo que la dilución es casi nula.',
    adquisiciones: [
      { anio: '2026', objetivo: 'GAI (Government Acquisitions Inc., revendedor para la Administración federal de EE. UU.)', importe: 68.9, ev_ebitda: 11.5, financiacion: 'Caja', resultado: 'Cerrada en junio de 2026: hasta 92 M USD por ≈ 8 M USD de EBITDA ajustado y ≈ 390 M USD de facturación bruta; abre el mercado federal [5].' },
      { anio: '2026', objetivo: 'AgreeYa Solutions (servicios profesionales, EE. UU. e India)', importe: 89.9, ev_ebitda: 8.6, financiacion: 'Caja', resultado: 'Cerrada en enero de 2026: 120 M USD por ≈ 14 M USD de EBITDA ajustado; la dirección dice que va según lo previsto [5].' },
      { anio: '2022', objetivo: 'BITS (Business IT Source, EE. UU.)', importe: 28.3, ev_ebitda: null, financiacion: 'Caja y pagos aplazados', resultado: 'Pagos aplazados liquidados en 2023-2024 (17,4 y 18,7 M) con una liberación de 2,2 M a favor en 2024 [1, 2].' },
      { anio: '2025', objetivo: 'Compra no cerrada (sin nombre publicado)', importe: null, ev_ebitda: null, financiacion: null, resultado: '3,2 M de gastos llevados a resultados como excepcionales [1].' },
    ],
    comentario: 'La asignación de capital es conservadora y ha funcionado: 1.588 M de flujo operativo en 2021-2025 frente a 168 M de inversión, 70 M de compras, 374 M de dividendos y 343 M de recompras, sin deuda [1]. Las compras en EE. UU. (FusionStorm en 2018, Pivot en 2021, BITS en 2022) construyeron el negocio que hoy da el 62 % del beneficio de los segmentos, y las de 2026 se pagan a 8,6 y 11,5 veces el EBITDA, por debajo de las 18 veces que cotiza el grupo [5]. El punto débil es Francia: deterioro de 20,2 M en 2025 tras años de pérdidas [1]. La recompra de 2024 se hizo a 26-29 GBP por acción, la mitad del precio de hoy.',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'Norteamérica', descripcion: 'EE. UU. y Canadá: reventa de hardware para centros de datos, redes y puestos de trabajo; servicios profesionales (montaje de racks, cableado) y desde 2026 AgreeYa y GAI.', tipo_resultado: 'EBIT', historico: [{ periodo: '2023', ingresos: 2748.7, resultado: 65.0 }, { periodo: '2024', ingresos: 2971.4, resultado: 72.3 }, { periodo: '2025', ingresos: 4860.0, resultado: 129.6 }] },
      { nombre: 'Alemania', descripcion: 'Reventa y servicios profesionales y gestionados para grandes empresas y Administración pública; incluye Suiza desde su integración.', tipo_resultado: 'EBIT', historico: [{ periodo: '2023', ingresos: 2027.5, resultado: 163.0 }, { periodo: '2024', ingresos: 1986.7, resultado: 156.9 }, { periodo: '2025', ingresos: 2109.3, resultado: 157.3 }] },
      { nombre: 'Reino Unido', descripcion: 'Reventa (con proyectos de IA para «neoclouds» europeos desde 2025), servicios profesionales y gestionados; sede del grupo.', tipo_resultado: 'EBIT', historico: [{ periodo: '2023', ingresos: 1213.7, resultado: 58.8 }, { periodo: '2024', ingresos: 1158.1, resultado: 40.7 }, { periodo: '2025', ingresos: 1419.2, resultado: 42.3 }] },
      { nombre: 'Europa Occidental', descripcion: 'Francia, Bélgica, Países Bajos y Suiza; Francia en pérdidas.', tipo_resultado: 'EBIT', historico: [{ periodo: '2023', ingresos: 901.3, resultado: 14.9 }, { periodo: '2024', ingresos: 819.3, resultado: 13.7 }, { periodo: '2025', ingresos: 779.2, resultado: -7.8 }] },
      { nombre: 'Internacional', descripcion: 'Centros de servicio en otros países (India, Sudáfrica, Polonia, Malasia…) que dan soporte al resto.', tipo_resultado: 'EBIT', historico: [{ periodo: '2023', ingresos: 31.6, resultado: 13.6 }, { periodo: '2024', ingresos: 29.3, resultado: 14.0 }, { periodo: '2025', ingresos: 26.2, resultado: 15.1 }] },
      { nombre: 'Costes centrales', descripcion: 'Consejo, costes de sociedad cotizada y proyectos de sistemas comunes del grupo.', tipo_resultado: 'EBIT', historico: [{ periodo: '2023', ingresos: 0, resultado: -43.8 }, { periodo: '2024', ingresos: 0, resultado: -50.9 }, { periodo: '2025', ingresos: 0, resultado: -61.8 }] },
    ],
    geografias: [
      { nombre: 'Norteamérica', peso_pct: 52.9 }, { nombre: 'Alemania', peso_pct: 22.9 }, { nombre: 'Reino Unido', peso_pct: 15.4 },
      { nombre: 'Europa Occidental', peso_pct: 8.5 }, { nombre: 'Otros', peso_pct: 0.3 },
    ],
    geografias_criterio: 'origen',
    kpis: [
      { kpi: 'Facturación bruta (M GBP)', valor_anterior: '9.916,5 (2024)', valor_actual: '12.988,3 (2025); 8.927,5 en el 1S26', variacion: '+31,0 %; +57,6 % en el 1S26', comentario: 'Medida de gestión: incluye el software revendido como agente [1, 5].' },
      { kpi: 'Cartera de pedidos de producto comprometida (M GBP)', valor_anterior: '7.100 (dic-25)', valor_actual: '9.300 (jun-26)', variacion: '+29,5 % en seis meses; +323 % interanual', comentario: '6.936 M de Norteamérica [5, 6].' },
      { kpi: 'Clientes con más de 1 M GBP de beneficio bruto al año', valor_anterior: '198 (jun-25)', valor_actual: '216 (jun-26)', variacion: '+18 (8 por compras)', comentario: 'El objetivo estratégico de la empresa [5].' },
      { kpi: 'Ventas al mayor cliente (M GBP)', valor_anterior: '1.095,5 (2024)', valor_actual: '2.731,2 (2025)', variacion: '+149 %', comentario: 'Un cliente de Norteamérica, el 30 % de las ventas del grupo [1].' },
      { kpi: 'Margen bruto sobre ventas', valor_anterior: '14,9 % (2024)', valor_actual: '12,4 % (2025); 9,6 % en el 1S26', variacion: '−242 y −303 pb', comentario: 'Mezcla de hardware de gran volumen para hiperescala [1, 5].' },
      { kpi: 'Ingresos de Servicios (M GBP)', valor_anterior: '1.638,4 (2024)', valor_actual: '1.690,8 (2025); 935,1 en el 1S26', variacion: '+3,2 %; +9,0 % orgánico en el 1S26', comentario: 'Profesionales +23,9 % orgánico, Gestionados −4,5 % [5].' },
    ],
    clientes: 'Grandes empresas y Administraciones públicas de Reino Unido, Alemania, Francia, Benelux y EE. UU., más, desde 2024, clientes de hiperescala y «neoclouds» que construyen centros de datos de IA. La concentración ha cambiado de escala: el mayor cliente, en Norteamérica, compró 2.731 M GBP en 2025 (30 % de las ventas; 1.096 M en 2024) [1]. En Servicios Gestionados los contratos son de 3-5 años y se pierden con la renovación (un cliente farmacéutico en EE. UU. y contratos en Francia en el 1S26) [5]. El poder de precios es bajo en la reventa (el margen bruto de Technology Sourcing cae cuando crecen los grandes clientes) y la ventaja está en la escala logística, los centros de integración y la relación de décadas con 216 clientes de más de 1 M GBP de beneficio bruto anual [5].',
    confianza: 'Alta',
  },
  huecos: [
    { seccion: 'trimestres', campo: 'crecimiento del 1S25 y 2S25', tipo: 'Complemento', intentos: '1) Semestral de 2025 y de 2024 en la web de inversores (bloqueada por antibot, HTTP 403); 2) NSM de la FCA (sin buscador accesible; solo los RNS anuales de 2024 y 2025) y Investegate/LSE (403); 3) prensa: cifras del 1S24 solo en resúmenes de buscador, no válidos por la regla 0', decision: 'Omitido' },
  ],
  fuentes: fA,
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const usd = Y['GBPUSD=X'].precio, eur = Y['GBPEUR=X'].precio, nok = Y['GBPNOK=X'].precio;
const aGBP = (x, div) => (x == null ? null : div === 'USD' ? x / usd : div === 'EUR' ? x / eur : div === 'NOK' ? x / nok : x);
const fB = [
  { id: 1, titulo: 'Gartner: previsión del gasto mundial en TI, abril de 2026 (tabla por segmentos 2025-2026: centros de datos, dispositivos, servicios de TI)', editor: 'Gartner (vía Channelwise)', tipo: 'Sectorial', fecha: '2026-04-30', url: 'https://channelwise.co.za/global-it-spend-set-to-surge-135-to-631trn/' },
  { id: 2, titulo: 'Gartner Estimates Worldwide IT Spending at $6.31T for 2026', editor: 'The Journal (Gartner)', tipo: 'Sectorial', fecha: '2026-05-20', url: 'https://thejournal.com/articles/2026/05/20/gartner-worldwide-it-spending-estimated-at-6-31t-for-2026.aspx' },
  { id: 3, titulo: 'Annual Report and Accounts 2025: estrategia, mercados, riesgos principales y segmentos', editor: 'Computacenter plc', tipo: 'Primaria', fecha: '2026-03-11', url: `${XB}/2025-12-31/ESEF/GB/0/549300XSXUZ1I19DB105-2025-12-31/reports/549300XSXUZ1I19DB105-2025-12-31-T01.xhtml` },
  { id: 4, titulo: '2026 Half Year Results (RNS 7571T)', editor: 'Computacenter plc', tipo: 'Primaria', fecha: '2026-09-08', url: 'https://www.directorstalkinterviews.com/wp-content/uploads/2026/09/Computacenter-2026-Half-Year-Results.pdf' },
  { id: 5, titulo: 'Yahoo Finance quoteSummary: ventas, márgenes y capitalización de CDW, Insight, TD SYNNEX, Arrow, Bechtle, Cancom, Atea, Softcat, Bytes y ePlus', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/CCC.L/' },
  { id: 6, titulo: 'Dell stock plunges 11%, leading data center sell-off on AI concerns (rebaja de Barclays, 14-oct-2026)', editor: 'Crypto Briefing', tipo: 'Prensa', fecha: '2026-10-14', url: 'https://cryptobriefing.com/dell-stock-plunges-data-center-selloff/' },
];
const compDef = [
  ['CDW', 'CDW Corporation', 'EE. UU.', 'Mayor revendedor de TI de EE. UU. y Reino Unido (CDW UK); competidor directo en grandes cuentas y sector público.'],
  ['NSIT', 'Insight Enterprises', 'EE. UU.', 'Revendedor y servicios en EE. UU. y Europa; más software y nube, menos centros de datos de IA.'],
  ['BC8.DE', 'Bechtle', 'Alemania', 'Primer competidor en Alemania (sistema de casas de sistemas y comercio electrónico); fuerte en Administración pública.'],
  ['ATEA.OL', 'Atea', 'Noruega', 'Líder nórdico en infraestructura y reventa; modelo similar al de Computacenter.'],
  ['COK.DE', 'Cancom', 'Alemania', 'Revendedor y servicios gestionados en Alemania, Austria y Reino Unido; margen más bajo.'],
  ['SCT.L', 'Softcat', 'Reino Unido', 'Rival en el Reino Unido, sobre todo en medianas empresas y software; ventas netas (agente) que inflan su margen sobre ventas.'],
  ['SNX', 'TD SYNNEX', 'EE. UU.', 'Mayorista: proveedor y a veces competidor en grandes despliegues de hiperescala (Hyve).'],
];
const competidores = compDef.map(([t, nombre, pais, comentario]) => {
  const y = Y[t];
  return { nombre, pais, ticker: t, ingresos: Math.round(aGBP(y.ventas / 1e6, y.divisa_fin || y.divisa)), cuota_pct: null, margen_ebit_pct: r1(y.margen_operativo * 100), comentario: `${comentario} Ventas de los últimos 12 meses y margen operativo de Yahoo [5].` };
});
const Bn = {
  _estado: 'Completa. Tamaño del mercado de Gartner (abril y mayo de 2026); competidores con datos de Yahoo del 20-oct-2026; sin ficha sectorial previa en sectores/ (revendedores de TI).',
  sector: {
    definicion: 'El mercado relevante es el gasto en infraestructura de TI de grandes empresas y Administraciones que se compra a través de revendedores con servicios (VAR): sistemas de centros de datos (servidores, almacenamiento, redes), dispositivos de puesto de trabajo y los servicios de infraestructura asociados, en EE. UU., Reino Unido y Europa continental. Gartner no publica ese perímetro: usamos su gasto mundial en sistemas de centros de datos y dispositivos (1.644.000 M USD en 2026) como techo y el gasto en servicios de TI (1.870.000 M USD) como referencia de servicios [1, 2]. La cuota de Computacenter sobre el hardware mundial es inferior al 1 %; la prueba de cuota se hace sobre ese perímetro.',
    tamano: '≈ 1.644.000 M USD en 2026 (centros de datos 787.990 + dispositivos 856.189; ≈ 1.231.000 M GBP) según Gartner, abril de 2026 [1]; la versión de mayo confirma 6,31 billones de gasto total y +55,8 % en centros de datos [2].',
    unidad_serie: 'miles de millones de USD (Gartner: centros de datos + dispositivos)',
    serie: [
      { anio: '2024', tamano: r1(505.634 / 1.516 + 791.663 / 1.097) },
      { anio: '2025', tamano: r1(505.634 + 791.663) },
      { anio: '2026e', tamano: r1(787.990 + 856.189) },
    ],
    tcac_historico_pct: r1((Math.sqrt((787.990 + 856.189) / (505.634 / 1.516 + 791.663 / 1.097)) - 1) * 100),
    tcac_previsto_pct: null,
    cr5_pct: null,
    estructura: 'Fragmentada',
    drivers: [
      { driver: 'Inversión de hiperescala y «neoclouds» en centros de datos para IA', efecto: '+', horizonte: 'Cíclico', evidencia: 'Gasto en sistemas de centros de datos +51,6 % en 2025 y +55,8 % en 2026 (787.990 M USD) [1]; cartera de Computacenter en Norteamérica de 6.936 M GBP, +414 % interanual [4].' },
      { driver: 'Renovación de puestos de trabajo y redes en empresas', efecto: '+', horizonte: 'Cíclico', evidencia: 'Dispositivos +8,2 % en 2026 (856.189 M USD), frenados por el encarecimiento de la memoria [1].' },
      { driver: 'Inflación y escasez de componentes por la demanda de IA', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Sube el precio facturado pero hace que algunos clientes reprioricen su gasto [4]; Barclays rebajó a Dell el 14-oct-2026 por la normalización esperada de los precios de la memoria [6].' },
      { driver: 'Externalización de servicios gestionados y automatización', efecto: '−', horizonte: 'Estructural', evidencia: 'Servicios Gestionados de Computacenter −4,5 % en el 1S26; servicios de TI mundiales +9,0 % en 2026, impulsados por la nube y no por el soporte tradicional [1, 4].' },
      { driver: 'Gasto público en digitalización (Alemania, Reino Unido, EE. UU. federal)', efecto: '+', horizonte: 'Estructural', evidencia: 'Alemania con la Administración pública «contenida» en 2026; compra de GAI para el mercado federal de EE. UU. [4].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 4, justificacion: 'Mercado fragmentado con rivales grandes (CDW 23.500 M USD de ventas, Insight, Bechtle, SHI y WWT sin cotizar) y margen operativo del 2-7 % sobre ventas [5].' },
      { fuerza: 'Poder de los clientes', intensidad: 5, justificacion: 'Un cliente de hiperescala compró el 30 % de las ventas de Computacenter en 2025 y los grandes proyectos se licitan: el margen bruto de Technology Sourcing cae al crecer esos clientes [3, 4].' },
      { fuerza: 'Poder de los proveedores', intensidad: 4, justificacion: 'Pocos fabricantes (Nvidia, Dell, HPE, Cisco) controlan la oferta y la asignación de producto en escasez; los incentivos de los fabricantes pesan en el margen [4].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Hace falta escala logística, centros de integración, crédito de los fabricantes y capacidad de financiar circulante de miles de millones [3].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'Compra directa al fabricante o al mayorista (TD SYNNEX/Hyve) en hiperescala; nube pública frente a infraestructura propia; IA en soporte técnico [1, 4].' },
    ],
    ciclo: { posicion: 'Expansión', comentario: 'El gasto en centros de datos crece por encima del 50 % dos años seguidos [1], la cartera de Computacenter está en máximos (9.300 M GBP) y los márgenes brutos bajan por mezcla, no por precio: es una fase alta del ciclo de inversión en IA. La reventa de TI es cíclica: en 2009 y 2020 las ventas de hardware cayeron con la inversión empresarial, y en 2024, tras el auge de 2023, el resultado operativo ajustado de Computacenter cayó un 31,6 % en el primer semestre y un 9 % en el año [3]. La rebaja de Dell del 14-oct-2026 muestra que el mercado ya descuenta un techo [6].' },
    regulacion: 'Pocas normas afectan a los ingresos. Las que pesan: compras públicas (marcos de contratación del Reino Unido y Alemania, que deciden la cuota en la Administración), aranceles de EE. UU. sobre hardware importado (se repercuten al cliente, pero encarecen proyectos), controles a la exportación de chips de IA a determinados países (afectan a proyectos fuera de EE. UU. y Europa) y la ciberseguridad (NIS2 en la UE desde 2024), que genera demanda de servicios [3].',
    tendencias: 'La IA cambia el negocio en dos direcciones. Gana el hardware: la construcción de centros de datos de IA ha triplicado la cartera y ha puesto a Computacenter en el FTSE 100 [4]. Pierde el trabajo repetible: el soporte técnico y los servicios gestionados (44 % de los ingresos de Servicios) son lo que la IA generativa y los agentes automatizan antes, y Servicios Gestionados ya cae [4]. Los fabricantes venden cada vez más directo a hiperescala, y los «neoclouds» dependen de financiación cara, lo que añade riesgo de crédito y de cancelación [6].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: r2(13850 / (1231000) * 100),
    posicion: 'Uno de los mayores revendedores independientes con servicios de Europa (1.º-2.º en Reino Unido y Alemania con Softcat y Bechtle) y top 5 en EE. UU. tras CDW, WWT, SHI e Insight; cuota inferior al 1 % del gasto mundial en hardware [1, 5].',
    competidores,
    foso: {
      veredicto: 'Estrecho', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'No hay efecto de red: cada cliente compra por su cuenta.' },
        { fuente: 'Costes de cambio', puntuacion: 3, evidencia: 'Servicios gestionados de varios años y relaciones de décadas: 216 clientes de más de 1 M GBP de beneficio bruto; pero los proyectos de hardware se licitan [4].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 1, evidencia: 'Certificaciones de los fabricantes (socio de Nvidia, Cisco, Dell…) que tienen también los rivales.' },
        { fuente: 'Ventaja en costes', puntuacion: 2, evidencia: 'Centros de integración propios y sistemas comunes (26,6 M de inversión en el 1S26); margen operativo del 2,1 % sobre ventas, por debajo de CDW (7,3 %) [4, 5].' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'Capacidad de financiar y entregar proyectos de miles de millones a la velocidad que pide la hiperescala; pocos rivales independientes pueden en Europa [4].' },
      ],
    },
    amenazas: 'La mayor amenaza es la compra directa: los clientes de hiperescala pueden comprar al fabricante o al ensamblador (Dell, Supermicro, Hyve) y dejar al revendedor solo el montaje, como ya hacen con parte de su gasto. Probabilidad media en 3-5 años. Segunda: que el ciclo de inversión en IA se frene con la normalización de los precios de la memoria y la financiación cara de los «neoclouds» (rebaja de Dell del 14-oct-2026), lo que dejaría capacidad ociosa y presión de precios [6]. Tercera: la IA en el soporte técnico, que abarata lo que Computacenter cobra por persona en Servicios Gestionados [1, 4].',
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'Computacenter es un revendedor de tecnología con servicios, fundado en 1981 por Philip Hulme y Peter Ogden, con sede en Hatfield (Reino Unido) y unos 21.000 empleados. Tiene tres líneas: Technology Sourcing (compra, configura y entrega hardware y software de terceros: servidores y redes para centros de datos, portátiles, licencias), el 82 % de las ventas en 2025; Professional Services (proyectos de instalación, migración y despliegue, como el montaje y cableado de racks de IA); y Managed Services (soporte técnico, centros de atención y gestión de puestos de trabajo y centros de datos con contratos de varios años) [3, 4]. Vende a grandes empresas y Administraciones de EE. UU. (53 % de las ventas), Alemania (23 %), Reino Unido (15 %) y Francia, Bélgica, Países Bajos y Suiza (8,5 %) [3].',
    como_gana_dinero: 'Gana un margen pequeño sobre lo que revende (margen bruto de Technology Sourcing de un solo dígito en hiperescala, más alto en empresas) y uno mayor en servicios, cobrado por horas o por contrato [4]. La facturación bruta de 2025 fue de 12.988 M GBP y el beneficio bruto de 1.144 M: el negocio es de volumen. El resultado depende de la mezcla (los grandes proyectos de IA suben ventas y bajan el margen porcentual), de la productividad de la plantilla de servicios y del apalancamiento operativo sobre los gastos de estructura (869 M en 2025): en el 1S26 el beneficio bruto subió un 30,5 % y el operativo ajustado un 86,5 % [3, 4]. Solo los servicios gestionados son recurrentes (≈ 9 % de las ventas). Estacionalidad: segundos semestres más fuertes en beneficio y en caja.',
  },
  huecos: [
    { seccion: 'sector', campo: 'tcac_previsto_pct y cr5_pct', tipo: 'Complemento', intentos: '1) Gartner solo publica 2025-2026 en sus notas de prensa; 2) IDC y Canalys sin cifras gratuitas del perímetro VAR; 3) cuota de los cinco primeros: no hay fuente que sume CDW, WWT, SHI, Insight y Computacenter sobre el mismo mercado', decision: 'Omitido' },
  ],
  fuentes: fB,
};
guarda('B', Bn);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Annual Report and Accounts 2025: informe de gobierno, consejo, comisiones, remuneración de consejeros, participaciones, accionistas significativos', editor: 'Computacenter plc', tipo: 'Primaria', fecha: '2026-03-11', url: `${XB}/2025-12-31/ESEF/GB/0/549300XSXUZ1I19DB105-2025-12-31/reports/549300XSXUZ1I19DB105-2025-12-31-T01.xhtml` },
  { id: 2, titulo: 'Director/PDMR Shareholding (RNS 0061O): Philip Hulme transfiere 125.000 acciones a The Hadley Trust', editor: 'Computacenter plc (FCA National Storage Mechanism)', tipo: 'Primaria', fecha: '2026-07-27', url: `${FCA}/560fa440-425b-452f-a517-a8cb010d9d88.html` },
  { id: 3, titulo: '2026 Half Year Results (RNS 7571T)', editor: 'Computacenter plc', tipo: 'Primaria', fecha: '2026-09-08', url: 'https://www.directorstalkinterviews.com/wp-content/uploads/2026/09/Computacenter-2026-Half-Year-Results.pdf' },
  { id: 4, titulo: '2025 Full Year Results (RNS 3274W)', editor: 'Computacenter plc (FCA NSM)', tipo: 'Primaria', fecha: '2026-03-12', url: `${FCA}/0f9a28be-df92-4f33-b285-7145b98e7652.html` },
  { id: 5, titulo: '2024 Full Year Results (RNS 0178B)', editor: 'Computacenter plc (FCA NSM)', tipo: 'Primaria', fecha: '2025-03-18', url: `${FCA}/5577626.html` },
  { id: 6, titulo: 'Annual Report and Accounts 2024: resultado del segundo semestre y del año frente al anterior', editor: 'Computacenter plc', tipo: 'Primaria', fecha: '2025-03-18', url: `${XB}/2024-12-31/ESEF/GB/0/549300XSXUZ1I19DB105-2024-12-31/reports/549300XSXUZ1I19DB105-2024-12-31-T01.xhtml` },
];
const C = {
  _estado: 'Completa. Informe anual 2025 (gobierno y remuneración), RNS de operaciones de consejeros del NSM de la FCA y RNS de resultados 2024-2026. Votos de la junta de mayo de 2026 no localizados.',
  directivos: {
    equipo: [
      { nombre: 'Mike Norris', cargo: 'Consejero delegado', desde: '1994', participacion_pct: 1.02, trayectoria: 'En Computacenter desde 1984 y primer ejecutivo desde 1994: llevó la empresa de revendedor británico a grupo con 13.000 M GBP de facturación y el 53 % de las ventas en EE. UU.; 1.079.214 acciones [1].' },
      { nombre: 'Keith Mortimer', cargo: 'Director financiero', desde: '2025', participacion_pct: 0.0, trayectoria: 'Director financiero desde el 1-sep-2025, tras la salida de Chris Jehle (junio de 2023-diciembre de 2024) y la jubilación de Tony Conophy en 2023 [1].' },
      { nombre: 'Pauline Campbell', cargo: 'Presidenta no ejecutiva', desde: '2021', participacion_pct: 0.01, trayectoria: 'Consejera desde agosto de 2021, presidió la comisión de auditoría y preside el consejo desde el 14-may-2024 [1].' },
      { nombre: 'Philip Hulme', cargo: 'Consejero fundador no ejecutivo', desde: '1981', participacion_pct: 7.57, trayectoria: 'Cofundador; tras su última donación a The Hadley Trust (de la que es patrono) conserva 8.041.695 acciones (7,57 %), y la fundación 7,21 % [2].' },
      { nombre: 'Peter Ogden', cargo: 'Consejero fundador no ejecutivo', desde: '1981', participacion_pct: 22.3, trayectoria: 'Cofundador; participación con personas vinculadas del 22,3 % (26.240.461 acciones en la tabla de consejeros) [1].' },
    ],
    historial_guidance: [
      { anio: '2026', guia: 'Marzo: «progreso estratégico y financiero» orgánico más AgreeYa [4]; septiembre: beneficio antes de impuestos ajustado ≥ 380 M GBP, «muy por encima» del consenso de 340,9 M [3]', real: 'En curso: 152,4 M en el 1S26 (+87 %)', cumplida: 'Parcial' },
      { anio: '2025', guia: '«Progreso» en 2025, con el BPA ayudado por la recompra [5]', real: 'BPA ajustado diluido +9,5 % (175,1 peniques); beneficio ajustado antes de impuestos +7,1 % [4]', cumplida: 'Sí' },
      { anio: '2024', guia: 'Cartera de pedidos al alza y mejor segundo semestre tras un primero flojo [6]', real: 'Beneficio ajustado antes de impuestos −8,6 % pese al récord del segundo semestre (165,6 M de resultado operativo ajustado) [6]', cumplida: 'Parcial' },
    ],
    comentario: 'El equipo tiene una continuidad rara: el consejero delegado lleva 32 años en el cargo y los fundadores siguen en el consejo con cerca del 37 % entre ambos con sus vinculados [1]. Lo que resta es la rotación de la dirección financiera: tres directores financieros en tres años (Conophy, Jehle, que salió «de mutuo acuerdo» en diciembre de 2024, y Mortimer desde septiembre de 2025) [1]. La guía es prudente y se ha batido en 2025 y 2026. El plan de sucesión del consejero delegado no está publicado y es la principal pregunta de gobierno: Mike Norris tiene más de 60 años y la política de 2025 se aprobó con un 77,7 % precisamente para retenerlo [1].',
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      { nombre: 'Pauline Campbell', cargo: 'Presidenta', tipo: 'Independiente', desde: '2021', comisiones: 'Nombramientos (presidenta)' },
      { nombre: 'Mike Norris', cargo: 'Consejero delegado', tipo: 'Ejecutivo', desde: '1994', comisiones: '—' },
      { nombre: 'Keith Mortimer', cargo: 'Director financiero', tipo: 'Ejecutivo', desde: '2025', comisiones: '—' },
      { nombre: 'Adam Walker', cargo: 'Consejero independiente coordinador', tipo: 'Independiente', desde: '2024', comisiones: 'Auditoría y riesgos (presidente), remuneración, nombramientos' },
      { nombre: 'René Carayol', cargo: 'Consejero', tipo: 'Independiente', desde: '2022', comisiones: 'Remuneración (presidente), auditoría, nombramientos' },
      { nombre: 'Kelly Kuhn', cargo: 'Consejera', tipo: 'Independiente', desde: '2024', comisiones: 'Auditoría, remuneración, nombramientos' },
      { nombre: 'Simon McNamara', cargo: 'Consejero', tipo: 'Independiente', desde: '2025', comisiones: 'Auditoría, remuneración, nombramientos' },
      { nombre: 'Ljiljana Mitic', cargo: 'Consejera', tipo: 'Independiente', desde: null, comisiones: 'ESG (presidenta), auditoría, remuneración, nombramientos' },
      { nombre: 'Philip Hulme', cargo: 'Consejero fundador', tipo: 'Dominical', desde: '1981', comisiones: '—' },
      { nombre: 'Peter Ogden', cargo: 'Consejero fundador', tipo: 'Dominical', desde: '1981', comisiones: '—' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: true, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: false, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 77.71, voto_remuneracion_contra_pct: 22.29, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 1.745, fijo: 0.773, variable_corto: 0.973, variable_largo: 0, ratio_salario_medio: 30 },
    remuneracion: 'El consejero delegado cobró 1,75 M GBP en 2025: 0,77 M de fijo y 0,97 M de bonus, sin acciones de largo plazo que consolidaran [1]. La política de 2025 subió su salario un 13,4 % y añadió un plan de acciones restringidas con condición mínima para retenerlo; se aprobó con el 77,71 % de los votos, por debajo del 80 % del Código, y el consejo escribió a accionistas con más del 18 % del capital que votaron en contra [1]. El plan de acciones por resultados mide el BPA ajustado diluido, no el ROIC ni la rentabilidad para el accionista, y el bonus mide el beneficio antes de impuestos ajustado (50 %) y la contribución de Servicios [1]: premia crecer el beneficio, y el BPA ajustado excluye la amortización de lo comprado. La ratio con el empleado mediano del Reino Unido es de 30 a 1 [1].',
    accionistas: [
      { nombre: 'Peter Ogden y personas vinculadas', pct: 22.3, tipo: 'Fundador (consejero)', variacion: 'Sin cambios comunicados en 12 meses [1]' },
      { nombre: 'Philip Hulme', pct: 7.57, tipo: 'Fundador (consejero)', variacion: 'Donaciones a The Hadley Trust: 125.000 acciones el 24-jul-2026 [2]' },
      { nombre: 'The Hadley Trust', pct: 7.21, tipo: 'Fundación benéfica vinculada a Philip Hulme', variacion: 'Recibe las donaciones de Hulme [2]' },
      { nombre: 'Autocartera', pct: 9.72, tipo: 'Autocartera (11.444.039 acciones a 31-dic-2025; sin voto)', variacion: '5 M de acciones amortizadas en 2025 tras la recompra de 2024 [1]' },
    ],
    insiders: [
      { fecha: '2026-07-24', persona: 'Philip Hulme (consejero fundador)', operacion: 'Venta', acciones: 125000, importe: 0 },
    ],
    control_y_defensas: 'No hay accionista de control: los dos fundadores suman cerca del 37 % con sus vinculados y la fundación de Hulme, pero no actúan concertados ni nombran al presidente, y el consejo los declara no independientes y fuera de las comisiones [1]. Una acción, un voto; sin blindajes. El peso de los fundadores protege frente a una opa hostil y alinea a largo plazo, pero también es un «overhang» potencial: Hulme transfiere acciones a su fundación cada año (125.000 en julio de 2026, 260.000 en julio de 2025) [2]. No hay operaciones vinculadas relevantes.',
    alertas: [
      'Tres directores financieros en tres años (Conophy hasta 2023, Jehle de junio de 2023 a diciembre de 2024, Mortimer desde septiembre de 2025) [1].',
      'Política de remuneración aprobada con el 77,71 % en 2025, por debajo del 80 % del Código [1].',
      'Sucesión del consejero delegado, en el cargo desde 1994, sin plan publicado [1].',
    ],
    confianza: 'Media',
  },
  huecos: [
    { seccion: 'gobierno', campo: 'votos de la junta del 19-may-2026', tipo: 'Complemento', intentos: '1) Web de inversores (403); 2) NSM de la FCA sin buscador accesible; 3) prensa: sin resultado de votaciones publicado', decision: 'Omitido' },
  ],
  fuentes: fC,
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de CCC.L, ^FTSE y EXV3.DE (herramienta bolsa.mjs) hasta el 16-oct-2026; cierres de cada ejercicio', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://finance.yahoo.com/quote/CCC.L/history/' },
  { id: 2, titulo: 'Yahoo Finance quoteSummary de CCC.L y comparables (precio de la sesión, cierre anterior, consenso de BPA, recomendaciones, objetivos)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/CCC.L/analysis/' },
  { id: 3, titulo: 'Computacenter plc: estimaciones anuales 2026-2028 y objetivo medio de 11 analistas', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-20', url: 'https://uk.marketscreener.com/quote/stock/COMPUTACENTER-PLC-38481129/finances/' },
  { id: 4, titulo: '2026 Half Year Results (RNS 7571T)', editor: 'Computacenter plc', tipo: 'Primaria', fecha: '2026-09-08', url: 'https://www.directorstalkinterviews.com/wp-content/uploads/2026/09/Computacenter-2026-Half-Year-Results.pdf' },
  { id: 5, titulo: 'Converge Technology Solutions to be Acquired by H.I.G. Capital (valor empresa ≈ 1.300 M CAD, ≈ 7,4 veces el EBITDA ajustado, prima del 56 %)', editor: 'Converge Technology Solutions', tipo: 'Primaria', fecha: '2025-02-07', url: 'https://convergetp.com/2025/02/07/converge-technology-solutions-to-be-acquired-by-h-i-g-capital/' },
  { id: 6, titulo: 'Rentabilidad nominal a 10 años de la deuda pública británica (serie IUDMNPY)', editor: 'Bank of England, Interactive Database', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://www.bankofengland.co.uk/boeapps/database/' },
  { id: 7, titulo: 'Noticias de 12 meses de Computacenter (herramienta noticias.mjs: Google News; recomendaciones, compras, resultados)', editor: 'Varios medios (Sharecast, Yahoo Finance UK, Investing.com, CRN, ad-hoc-news)', tipo: 'Prensa', fecha: '2026-10-20', url: 'https://news.google.com/' },
  { id: 8, titulo: 'Dell stock plunges 11%, leading data center sell-off on AI concerns', editor: 'Crypto Briefing', tipo: 'Prensa', fecha: '2026-10-14', url: 'https://cryptobriefing.com/dell-stock-plunges-data-center-selloff/' },
  { id: 9, titulo: 'ii view: Computacenter results rally is short-lived', editor: 'interactive investor', tipo: 'Prensa', fecha: '2026-09-08', url: 'https://www.ii.co.uk/analysis-commentary/ii-view-computacenter-results-rally-short-lived-ii540213' },
  { id: 10, titulo: 'Director/PDMR Shareholding (RNS 0061O)', editor: 'Computacenter plc (FCA NSM)', tipo: 'Primaria', fecha: '2026-07-27', url: `${FCA}/560fa440-425b-452f-a517-a8cb010d9d88.html` },
  { id: 11, titulo: 'Gilt y precios intradía de CCC.L, Softcat, Dell, Super Micro y Nvidia del 7 al 20-oct-2026 (gráfico diario y de 15 minutos)', editor: 'Yahoo Finance (chart API)', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/CCC.L/chart/' },
];
// Comparables: precio y consenso de Yahoo (20-oct-2026, 07:32 UTC), convertidos a GBP con el cambio de Yahoo.
// PER NTM = precio ÷ (BPA de los dos ejercicios estimados ponderados por los meses que caen en los próximos 12).
const mesesFin = { 'SCT.L': 9.4, 'BYIT.L': 4.3, PLUS: 5.4, SNX: 1.4 }; // meses que quedan del ejercicio en curso; resto (diciembre) 2,4
const comps = [];
for (const t of ['SCT.L', 'BYIT.L', 'BC8.DE', 'COK.DE', 'ATEA.OL', 'CDW', 'NSIT', 'PLUS', 'SNX', 'ARW']) {
  const y = Y[t];
  const div = y.divisa_fin || y.divisa;
  const pre = y.divisa === 'GBp' ? y.precio / 100 : y.precio;
  const e0 = y.trend.find((x) => x.periodo === '0y'), e1 = y.trend.find((x) => x.periodo === '+1y');
  const m = mesesFin[t] ?? 2.4;
  const bpaNtm = (m / 12) * e0.bpa + ((12 - m) / 12) * e1.bpa;
  const ventasNtm = (m / 12) * e0.ventas + ((12 - m) / 12) * e1.ventas;
  const ev = aGBP(y.ev / 1e6, div);
  const capOrig = y.cap ? y.cap / 1e6 : (y.ev - y.deuda + y.caja) / 1e6;
  const cap = aGBP(capOrig, div);
  const ebitda = y.ebitda / 1e6;
  comps.push({
    nombre: { 'SCT.L': 'Softcat', 'BYIT.L': 'Bytes Technology', 'BC8.DE': 'Bechtle', 'COK.DE': 'Cancom', 'ATEA.OL': 'Atea', CDW: 'CDW', NSIT: 'Insight Enterprises', PLUS: 'ePlus', SNX: 'TD SYNNEX', ARW: 'Arrow Electronics' }[t],
    ticker: t, pais: { 'SCT.L': 'GB', 'BYIT.L': 'GB', 'BC8.DE': 'DE', 'COK.DE': 'DE', 'ATEA.OL': 'NO' }[t] ?? 'US',
    capitalizacion: Math.round(cap), ev_ventas: r2(y.ev / y.ventas), ev_ebitda_ltm: r1(y.ev / y.ebitda), ev_ebitda_ntm: null,
    per_ntm: r1(pre / bpaNtm), crecimiento_pct: r1((ventasNtm / y.ventas - 1) * 100),
    margen_ebitda_pct: r1(y.margen_ebitda * 100), roic_pct: null, dn_ebitda: r1((y.deuda - y.caja) / y.ebitda), fcf_yield_pct: y.fcf != null ? r1(y.fcf / 1e6 / capOrig * 100) : null,
  });
}
const pers = comps.map((c) => c.per_ntm).sort((a, b) => a - b);
const medPer = (pers[4] + pers[5]) / 2;
const cierres = Object.fromEntries(B.cierres_ejercicio.map((c) => [c.anio, c.precio_cierre / 100]));
const D = {
  _estado: `Completa. Precio del informe: cierre del 19-oct-2026 (50,25 GBP; «previousClose» de Yahoo [D2] y último cierre de MarketScreener [D3]: la serie diaria de Yahoo no trae aún esa sesión). Sesión del 20-oct en curso: 49,10 GBP a las 07:30 UTC [D2]. Mediana del PER NTM de comparables: ${r1(medPer)}.`,
  _per_mediana_comparables: r1(medPer),
  identificacion: {
    nombre: 'Computacenter plc', nombre_corto: 'Computacenter', ticker: 'CCC', isin: 'GB00BV9FP302', mercado: 'London Stock Exchange (Main Market)', indice_referencia: 'FTSE 100',
    pais: 'Reino Unido', pais_iso: 'GB', sector: 'Tecnologías de la información', industria: 'Servicios de TI / distribución de tecnología', sede: 'Hatfield (Reino Unido)', fundacion: '1981', empleados: 21000, web: 'https://www.computacenter.com',
    precio: 50.25, fecha_precio: '2026-10-19', acciones: 105.4, capitalizacion_publicada: Math.round(Y['CCC.L'].cap / 1e6), free_float_pct: 61.0,
    max_52s: 60.45, min_52s: 26.02, volumen_medio_diario: `≈ ${r1(B.volumen_3m.importe_dia_millones / 100)} M GBP/día (3 meses)`, proximos_resultados: null,
  },
  consenso: {
    guidance: 'El 8-sep-2026 la empresa elevó su previsión de 2026: beneficio antes de impuestos ajustado «muy por encima» del consenso que ella misma recopila (340,9 M GBP; rango 332-354) y no inferior a 380 M; tipo impositivo ajustado del 28,5-30,5 %, costes centrales de 75-80 M, inversión de 70-75 M y efecto divisa de −3 M en el resultado operativo [4]. En marzo solo prometía «progreso» [4]. No hay plan a medio plazo con cifras. El avance del tercer trimestre se publica a finales de octubre (sin fecha anunciada; el de 2025 fue el 30-oct).',
    estimaciones: [
      { periodo: '2026e', ingresos: 13827, ebitda: 482.9, ebit: 393.9, bpa: 2.545, dpa: 1.034, fuente: 'MarketScreener, 11 analistas [3]; BPA ajustado de Yahoo 2,61 (9 analistas) [2]' },
      { periodo: '2027e', ingresos: 15433, ebitda: 521.2, ebit: 431.2, bpa: 2.829, dpa: 1.114, fuente: 'MarketScreener [3]; Yahoo 2,84 [2]' },
      { periodo: '2028e', ingresos: 16090, ebitda: 543.7, ebit: 447.1, bpa: 2.917, dpa: 1.149, fuente: 'MarketScreener [3]' },
    ],
    recomendaciones: { n_analistas: 11, comprar: 8, mantener: 3, vender: 0, po_medio: 62.37, po_min: 52.5, po_max: 70.0 },
    revisiones: 'Las estimaciones suben con cada publicación: el BPA de 2026 de Yahoo pasó de 2,19 a 2,61 GBP en 90 días (+19 %) y el de 2027 de 2,37 a 2,84 (+20 %) [2]. En el año, Stifel (julio), Berenberg (julio) y Peel Hunt (agosto) subieron a comprar; en octubre Berenberg elevó su objetivo a 65 GBP y Bank of America a 69,51 [7]. El consenso de 2028 (2,917) apenas crece un 3 % sobre 2027: los analistas ya suponen que el ciclo de centros de datos se aplana. El BPA de MarketScreener mezcla bases (2025 publicado, 1,455; las estimaciones parecen ajustadas): usamos el de Yahoo como contraste del ajustado.',
    base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: 0.11,
    confianza: 'Media',
  },
  bolsa: {
    ...B.bolsa,
    posicion_corta_pct: null,
    comentario: `La acción multiplicó casi por dos en un año (+93,9 % en precio frente al +15,1 % del FTSE 100) y entró en el FTSE 100 en junio de 2026 [D1, D7]. La subida tiene tres saltos con causa: el avance de enero (resultados de 2025 por encima de lo esperado), los resultados de marzo y el primer trimestre (cartera de 7.100 M y subida de abril del 35 % en un mes) y el avance del 9-jul (beneficio del semestre que se dobla) [7]. Desde el máximo de 60,45 GBP del 8-sep, el día de los resultados, cae un 17 %: la acción se dio la vuelta ese mismo día pese a la subida de la guía [9] y bajó otro 10 % en octubre con la rebaja de Dell por Barclays y la venta de valores de hardware para IA [8, 11]. La volatilidad (35 %) es la de un valor de crecimiento, no la de un revendedor.`,
    contexto: {
      movimiento: { fecha: '2026-10-20', var_1m_pct: -9.8, var_3m_pct: 0.7, var_6m_pct: 41.7, var_12m_pct: 84.6, dist_max_52s_pct: -14.0, dist_min_52s_pct: 83.5, dist_max_historico_pct: -14.0, tendencia: 'alcista', volatilidad_60d_pct: 37.0, avisos: [] },
      movimientos_fuertes: [
        { periodo: 'ene-2026', var_pct: 13.6, causa: 'Avance de resultados de 2025 por encima de lo esperado (22-ene) y compra de AgreeYa (8-ene) [7].', veredicto: 'no cambia', condicion: null },
        { periodo: 'mar-abr-2026', var_pct: 44.2, causa: 'Resultados de 2025 con cartera de 7.100 M GBP (12-mar) y avance del primer trimestre por encima de lo esperado (24-abr; mayor subida de un mes en seis, +35,4 %) [7].', veredicto: 'no cambia', condicion: null },
        { periodo: 'jul-2026', var_pct: 23.3, causa: 'Avance del 9-jul: beneficio del semestre que se dobla; subidas a comprar de Stifel y Berenberg [7].', veredicto: 'no cambia', condicion: null },
        { periodo: '2026-09-08', var_pct: -7.8, causa: 'Día de resultados: abrió +6 % con la guía de ≥ 380 M y cerró en negativo; el mercado leyó margen bruto a la baja, demanda adelantada por la escasez de componentes y comparables más difíciles en el segundo semestre [9].', veredicto: 'no cambia', condicion: null },
        { periodo: '2026-10-14 a 2026-10-20', var_pct: -13.8, causa: 'Venta de valores de hardware para IA tras la rebaja de Dell por Barclays (normalización de precios de la memoria) y el IPC de EE. UU.: Dell −21 % y Super Micro −19 % del 13 al 16-oct, Softcat −10,7 % el 14-oct [8, 11]. No hay noticia propia de Computacenter.', veredicto: 'no cambia', condicion: null },
        { periodo: '2026-02-04 y 2026-06-09', var_pct: -5.0, causa: 'Caídas de −5,0 % y −5,4 % en un día sin noticia propia localizada (tres búsquedas en noticias de 12 meses) [7].', veredicto: 'no cambia', condicion: null },
      ],
      noticias: [
        { fecha: '2026-10-17', tipo: 'recomendación', hecho: 'Bank of America eleva su objetivo a 69,51 GBP; Berenberg a 65 GBP el 13-oct [7].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-14', tipo: 'rumor', hecho: 'Barclays rebaja a Dell, HPE y NetApp por la valoración y la normalización esperada de los precios de la memoria; arrastra a los valores de infraestructura de IA [8].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-09-08', tipo: 'resultados', hecho: 'Resultados del 1S26 y guía de beneficio ajustado antes de impuestos ≥ 380 M GBP [4].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-07-24', tipo: 'directivos', hecho: 'Philip Hulme dona 125.000 acciones a su fundación The Hadley Trust (sin precio); conserva el 7,57 % [10].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-08-27', tipo: 'recomendación', hecho: 'Peel Hunt sube a comprar (objetivo de 44 a 60 GBP); Stifel (13-jul) y Berenberg (20-jul) ya habían subido a comprar [7].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-05-28', tipo: 'fusión u oferta', hecho: 'Compra de GAI (hasta 92 M USD), revendedor para la Administración federal de EE. UU.; cerrada en junio [4, 7].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-01-08', tipo: 'fusión u oferta', hecho: 'Compra de AgreeYa Solutions (120 M USD) [4, 7].', veredicto: 'no cambia', condicion: null },
        { fecha: '2025-10-28', tipo: 'demanda o regulador', hecho: 'Computacenter demanda a Broadcom y Dell en el pleito de Tesco por las licencias de VMware (Tesco reclama a Computacenter como revendedor) [7].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-30', tipo: 'resultados', hecho: 'Avance del tercer trimestre previsto para finales de octubre (sin fecha anunciada; el 30-oct en 2025) [7].', veredicto: 'no cambia', condicion: null },
      ],
      proximos_resultados: null,
      veredicto: 'no cambia',
      condicion: null,
      comentario: 'La caída de un mes (−9,8 %) y de −14 % desde máximos no tiene una causa propia: coincide con la venta de valores de hardware para IA tras la rebaja de Dell del 14-oct [8, 11]. No hay colocaciones anunciadas, ampliaciones ni decisiones con fecha que puedan mover el precio más de un 5 % en contra; las donaciones de Hulme a su fundación son periódicas y pequeñas (0,1 % del capital) [10]. El avance del tercer trimestre de finales de octubre no retrasa una decisión (regla 11). Veredicto global: no cambia.',
    },
    confianza: 'Media',
  },
  multiplos_historicos: {
    serie: ['2021', '2022', '2023', '2024', '2025'].map((a) => ({ anio: a, precio_cierre: r2(cierres[a]), ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    comentario: 'Con el BPA ajustado del año siguiente, Computacenter cotizó entre 10,9 y 17,5 veces en 2021-2025 (mediana 12,1) y hoy cotiza a unas 18 veces el de los próximos doce meses: máximo de diez años, justo cuando el beneficio está en su pico de ciclo y la mezcla es de menor calidad (hardware de hiperescala con un cliente del 30 %). El mercado paga hoy un múltiplo de crecimiento por un negocio que siempre se valoró como cíclico; la prima solo se sostiene si el beneficio de 2026 es un escalón y no un pico.',
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Revendedores de TI con servicios de Europa (Bechtle, Cancom, Atea, Softcat, Bytes) y EE. UU. (CDW, Insight, ePlus), más dos mayoristas con exposición a centros de datos de IA (TD SYNNEX, Arrow) como referencia de margen bajo. Softcat y Bytes publican ventas casi netas (software como agente), por lo que su EV/ventas y su margen no son comparables; para el objetivo a 12 meses se usa solo el PER. Fuera SHI y WWT (no cotizan) y Dell o Super Micro (fabricantes).',
    empresas: comps,
    comentario: `Computacenter cotiza a unas 18 veces el BPA ajustado de los próximos doce meses frente a una mediana de ${r1(medPer)} veces de los comparables: prima de en torno al 20 %, a pesar de un margen EBITDA (3,0 %) de los más bajos del grupo. La prima se explica por el crecimiento: las ventas de los próximos doce meses crecen más del 25 % frente a un dígito en Bechtle, CDW o Insight; solo TD SYNNEX y Arrow crecen parecido y cotizan a 9-10 veces. El mercado está pagando la cartera de IA. Como múltiplo usaríamos el PER (ventas no comparables por el criterio de agente): a la mediana de comparables, el precio sería un 15-20 % menor.`,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2026-06', objetivo: 'GAI (Government Acquisitions Inc.)', comprador: 'Computacenter', ev: 68.9, ev_ventas: null, ev_ebitda: 11.5, prima_pct: null, excluir: false, comentario: 'Hasta 92 M USD por ≈ 8 M USD de EBITDA ajustado; ≈ 390 M USD de facturación bruta (0,24 veces) [4].' },
      { fecha: '2026-01', objetivo: 'AgreeYa Solutions', comprador: 'Computacenter', ev: 89.9, ev_ventas: 1.0, ev_ebitda: 8.6, prima_pct: null, excluir: false, comentario: '120 M USD por ≈ 120 M USD de ventas y 14 M USD de EBITDA ajustado de servicios profesionales [4].' },
      { fecha: '2025-02', objetivo: 'Converge Technology Solutions', comprador: 'H.I.G. Capital (con Mainline)', ev: 727, ev_ventas: null, ev_ebitda: 7.4, prima_pct: 56, excluir: false, comentario: 'Revendedor y servicios de Canadá y EE. UU.: ≈ 1.300 M CAD, ≈ 7,4 veces el EBITDA ajustado; prima del 56 % [5]. Valor convertido a ≈ 1,79 CAD por GBP (estimación propia).' },
    ],
    comentario: 'Las transacciones del sector se pagan a 7-12 veces el EBITDA: la opa de H.I.G. sobre Converge (7,4 veces, con prima del 56 %) y las dos compras de Computacenter en 2026 (8,6 y 11,5 veces) [4, 5]. Computacenter cotiza a unas 14 veces el EBITDA de los últimos doce meses, por encima de cualquier precio de control reciente del sector. Con los fundadores en torno al 37 % y una capitalización de 5.300 M GBP, una opa es poco probable; el valor de las transacciones es una referencia de lo que paga un comprador por un revendedor «normal», sin el ciclo de IA.',
    confianza: 'Media',
  },
  huecos: [],
  fuentes: fD,
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'ii view: Computacenter results rally is short-lived', editor: 'interactive investor', tipo: 'Foros y redes', fecha: '2026-09-08', url: 'https://www.ii.co.uk/analysis-commentary/ii-view-computacenter-results-rally-short-lived-ii540213' },
  { id: 2, titulo: 'Notas de Kalkine Media sobre Computacenter (7, 8, 12, 13, 15, 18 y 19-oct-2026: «Rides Hyperscaler Demand», «Why Shares Slipped After Upgrade»)', editor: 'Kalkine Media', tipo: 'Foros y redes', fecha: '2026-10-19', url: 'https://kalkinemedia.com/uk/stocks/growth/is-computacenter-lseccc-the-stock-to-watch-after-its-ai-driven-profit-upgrade-today' },
  { id: 3, titulo: 'Titulares de 12 meses sobre Computacenter (This is Money, Proactive, Sharecast, ad-hoc-news, IT Channel Oxygen), herramienta noticias.mjs', editor: 'Google News', tipo: 'Foros y redes', fecha: '2026-10-20', url: 'https://news.google.com/' },
];
const E = {
  _estado: 'Parcial. Sin foros abiertos: Stocktwits no tiene el símbolo (404), LSE Chat da 403 y Motley Fool UK redirige; se usan comentario de interactive investor, notas de Kalkine y titulares de prensa financiera de los últimos tres meses.',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Empeora',
    revisadas: [
      { plataforma: 'interactive investor (comentario «ii view»)', fecha: '2026-09', n_comentarios: 1, tono: 'Dividido', resumen: 'Resultados récord y guía al alza, pero la acción «no es obviamente barata» (PER por encima de su media de 3 y 10 años), con margen de Technology Sourcing a la baja y demanda quizá adelantada por la escasez de componentes [1].' },
      { plataforma: 'Kalkine Media (notas para particulares)', fecha: '2026-10', n_comentarios: 7, tono: 'Positivo', resumen: 'Tratan a Computacenter como «ganador silencioso» del gasto en IA tras entrar en el FTSE 100; la del 18-oct se pregunta por qué cae tras una mejora de recomendación [2].' },
      { plataforma: 'Titulares de prensa financiera (This is Money, Proactive, Sharecast, IT Channel Oxygen)', fecha: '2026-09', n_comentarios: 40, tono: 'Positivo', resumen: '«Récord» y «boom de la IA» dominan; Proactive y Pluang destacan que la acción cayó pese a las subidas de previsiones; IT Channel Oxygen recoge la pugna por cuota con Softcat en el Reino Unido [3].' },
    ],
    temas: [
      { tema: 'Demanda de centros de datos para IA', postura: 'Alcista', peso: 'Alto', contraste: 'Los datos lo confirman: cartera de 9.300 M GBP y 62 % del beneficio de los segmentos en Norteamérica [A5]. Lo que los comentarios no recogen es que el mayor cliente es el 30 % de las ventas [A1].' },
      { tema: 'Valoración exigente', postura: 'Bajista', peso: 'Medio', contraste: 'Cierto: unas 18 veces el BPA de los próximos doce meses frente a una mediana histórica de 12,1 [D1].' },
      { tema: 'Margen y demanda adelantada', postura: 'Dividida', peso: 'Medio', contraste: 'El margen bruto baja (9,6 % en el 1S26) pero el beneficio bruto sube un 30 % [A5]; la demanda adelantada por la escasez de componentes es una hipótesis razonable que la empresa no cuantifica.' },
      { tema: 'Contagio del hardware de IA (Dell, Super Micro)', postura: 'Bajista', peso: 'Medio', contraste: 'La caída de octubre coincide con la de Dell tras la rebaja de Barclays; el negocio de Computacenter no ha cambiado desde el 8-sep [D8].' },
    ],
    lectura: 'El sentimiento es positivo sobre el negocio y dividido sobre el precio, y empeora desde los resultados: la acción no ha subido con ninguna buena noticia desde el 8-sep. No hay euforia en foros de particulares (casi no hay debate abierto), sino en la prensa de mercados. El riesgo que la conversación no recoge es la concentración en un cliente de hiperescala; el que sí recoge, la valoración, coincide con nuestro análisis. No contradice al consenso de analistas (8 de 11 en comprar), pero sugiere que el mercado ya duda de que 2026 se repita.',
    confianza: 'Baja',
  },
  huecos: [
    { seccion: 'sentimiento', campo: 'foros de particulares (LSE Chat, Stocktwits, Reddit)', tipo: 'Complemento', intentos: '1) Stocktwits API: símbolo no encontrado (404); 2) LSE Chat y Reddit: 403; 3) Motley Fool UK: redirige a otro dominio; Investors Chronicle de pago', decision: 'Omitido' },
  ],
  fuentes: fE,
};
guarda('E', E);
console.log('Notas A-E escritas. Mediana PER NTM comparables:', r1(medPer), comps.map((c) => `${c.ticker} ${c.per_ntm}`).join(' · '));
