// Escribe las notas A-E de Tyler Technologies (corte 2026-10-14) a partir de los documentos de notas/docs
// (10-K 2025, 10-Q 2T26, notas de resultados 4T21-4T25, 1T26 y 2T26, proxy 2026, 8-K, Form 4, XBRL) y de los informes
// del repo (Roper y Veeva 14-oct, Constellation 10-oct, Intuit 10-oct, Salesforce 12-oct, ServiceNow 14-oct: comparables y transacciones).
// Cada nota cita solo con [n] de su propia lista. Ejecutar: node notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const X = JSON.parse(fs.readFileSync(path.join(dir, 'cuentas-xbrl.json'), 'utf8'));
const SEC = 'https://www.sec.gov/Archives/edgar/data/860731';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Tyler Technologies, Form 10-K 2025 (cuentas, segmentos, ingresos por tipo, adquisiciones)', editor: 'Tyler Technologies / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-18', url: `${SEC}/000086073126000016/tyl-20251231.htm` },
  { id: 2, titulo: 'Tyler Technologies Reports Earnings for Fourth Quarter 2025 (nota de resultados y guía 2026)', editor: 'Tyler Technologies / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-11', url: `${SEC}/000086073126000013/a991earningsrelease12312025.htm` },
  { id: 3, titulo: 'Tyler Technologies Reports Earnings for Second Quarter 2026 (cuenta, balance, flujos, guía y recompra de 1.500 M)', editor: 'Tyler Technologies / SEC EDGAR', tipo: 'Primaria', fecha: '2026-07-29', url: `${SEC}/000086073126000048/a991earningsrelease-6302026.htm` },
  { id: 4, titulo: 'Tyler Technologies, Form 10-Q 2T26 (bonos convertibles 2031, For The Record, recompras, acciones a 27-jul-2026)', editor: 'Tyler Technologies / SEC EDGAR', tipo: 'Primaria', fecha: '2026-07-29', url: `${SEC}/000086073126000050/tyl-20260630.htm` },
  { id: 5, titulo: 'Tyler Technologies Reports Earnings for First Quarter 2026', editor: 'Tyler Technologies / SEC EDGAR', tipo: 'Primaria', fecha: '2026-04-29', url: `${SEC}/000086073126000031/a991earningsrelease-3312026.htm` },
  { id: 6, titulo: 'Tyler Technologies: hechos XBRL (companyfacts), series anuales y trimestrales', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-14', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0000860731.json' },
  { id: 7, titulo: 'Tyler Technologies Reports Earnings for Fourth Quarter 2024', editor: 'Tyler Technologies / SEC EDGAR', tipo: 'Primaria', fecha: '2025-02-12', url: `${SEC}/000086073125000003/a991earningsrelease12312024.htm` },
  { id: 8, titulo: 'Tyler Technologies Q2 2026 Earnings Call Transcript', editor: 'Webull (transcripción)', tipo: 'Prensa', fecha: '2026-07-30', url: 'https://www.webull.com/news/15364343868957697' },
  { id: 9, titulo: 'Tyler Technologies Reports Earnings for Fourth Quarter 2021 (NIC, crecimiento orgánico)', editor: 'Tyler Technologies / SEC EDGAR', tipo: 'Primaria', fecha: '2022-02-16', url: `${SEC}/000086073122000008/a991earningsrelease12312021.htm` },
  { id: 10, titulo: 'Form 8-K: plan de recompra 10b5-1 de hasta 260 M USD (16-sep a 29-oct-2026)', editor: 'Tyler Technologies / SEC EDGAR', tipo: 'Primaria', fecha: '2026-09-15', url: `${SEC}/000086073126000052/tyl-20260915.htm` },
];

// Cuenta del XBRL 2018-2025 (comprobada con las notas de resultados: EBITDA 2025 = 495,2 M y amortización total 138,4 M [2]).
const C = Object.fromEntries(X.financieros.cuenta.map((r) => [r.periodo, r]));
const anios = ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'];
const cuenta = anios.map((p) => {
  const r = C[p];
  return { periodo: p, ingresos: r.ingresos, coste_ventas: r.coste_ventas, gastos_generales: r.gastos_generales, ebitda: r.ebitda, amortizaciones: r.amortizaciones, ebit: r.ebit,
    resultado_financiero: r.resultado_financiero, bai: r.bai, impuestos: r.impuestos, minoritarios: 0, beneficio_neto: r.beneficio_neto, gastos_financieros: r.gastos_financieros,
    participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: r.bpa, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: r.acciones_diluidas };
});
// Sin deuda financiera 2018-2020 (la primera deuda es la de la compra de NIC en 2021). Arrendamientos operativos (US GAAP) fuera de la deuda.
const balance = X.balance.historico.filter((r) => r.periodo >= '2018').map((r) => ({
  periodo: r.periodo, activo_total: r.activo_total, activo_corriente: r.activo_corriente, pasivo_corriente: r.pasivo_corriente, pasivo_total: r.pasivo_total,
  fondo_comercio: r.fondo_comercio, intangibles: r.intangibles, inmovilizado_material: r.inmovilizado_material, existencias: 0, clientes: r.clientes,
  proveedores: r.proveedores, activos_contrato: null, pasivos_contrato: r.pasivos_contrato, caja: r.caja, deuda_financiera: r.deuda_financiera ?? 0,
  arrendamientos: 0, patrimonio_neto: r.patrimonio_neto, minoritarios: 0, reservas: r.reservas }));
// Capex = inmovilizado + software activado (PaymentsForSoftware del XBRL) [1, 6].
const softw = { 2018: 0, 2019: 4.8, 2020: 5.8, 2021: 21.7, 2022: 27.6, 2023: 32.5, 2024: 29.4, 2025: 16.8 };
const F = Object.fromEntries(X.flujos.historico.map((r) => [r.periodo, r]));
const flujos = anios.map((p) => ({ periodo: p, flujo_operativo: F[p].flujo_operativo, capex: +(F[p].capex + softw[p]).toFixed(1), pagos_arrendamientos: 0,
  adquisiciones: F[p].adquisiciones, desinversiones: 0, dividendos: 0, recompras: F[p].recompras ?? 0, emision_acciones: F[p].emision_acciones ?? 0, intereses_en_financiacion: 0 }));

const A = {
  _estado: 'Completo.',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 2429.7, ebitda: 505.6, ebit: 367.8, beneficio_neto: 305.6, bpa: 7.22, dpa: 0, dpa_extraordinario: 0, fcf: 705.8, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [
      { periodo: '2021', descripcion: 'Compra de NIC (2.090 M USD netos de caja, consolidada desde el 22-abr-2021): pagos digitales para administraciones; financiada con 600 M de convertibles y préstamos bancarios.' },
    ],
    comentario: 'Los ingresos pasan de 935 M USD en 2018 a 2.332 M en 2025 (TCAC del 13,9 %): la compra de NIC (2021) explica unos 5 puntos de esa tasa y el orgánico ha sido del 7-9 % anual (8,9 % en 2021, 8,2 % en 2022 sin ingresos COVID, 7,4 % en 2023) [9, 1]. En 2025 crecieron un 9,1 %, con los ingresos de SaaS +20,6 % (778 M) y las transacciones +15,8 % (808 M), mientras el mantenimiento cae un 3,8 % porque los clientes pasan a la nube [2]. El margen EBITDA contable (con la remuneración en acciones como gasto, 151 M en 2025) sube del 20,2 % de 2023 al 21,2 % de 2025, y el EBIT del 11,2 % al 15,3 %, porque la amortización de lo comprado con NIC baja y el coste del paso a la nube ya se ha absorbido [1]. En el 1S26 los ingresos crecen un 8,4 % (unos 2 puntos por compras) y la guía 2026 es de 2.535-2.575 M [3, 8].',
    ajustes: 'Usamos las cifras GAAP. La empresa publica un BPA no GAAP que suma la remuneración en acciones (151 M en 2025) y la amortización de intangibles comprados (~94 M), con un tipo fijo del 22,5-23 %: 11,31 USD en 2025 frente a 7,20 GAAP [2]. El tipo GAAP es bajo y volátil por las ventajas fiscales del ejercicio de opciones (negativo en 2020-2021, 14,6 % en 2024, 19,1 % en 2025) [6]; para la historia del PER y el objetivo a 12 meses normalizamos el BPA con un tipo del 23 %. El 1S26 incluye una ganancia de 25,0 M por la revalorización de una participación (no operativa) y 5,8 M de reestructuración de oficinas [3]. En el 4T25 hubo una provisión de 9,7 M por un litigio contractual que redujo ingresos [2]. El LTM a junio de 2026 se deriva de las cuentas anuales y semestrales; el beneficio LTM excluye la ganancia de 25 M.',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '3T24', ingresos: 543.3, crecimiento_pct: 9.8, crecimiento_organico_pct: null, ebitda: 117.3, margen_ebitda_pct: 21.6, bpa: 1.74, vs_consenso: null },
      { periodo: '4T24', ingresos: 541.1, crecimiento_pct: 12.5, crecimiento_organico_pct: null, ebitda: 105.7, margen_ebitda_pct: 19.5, bpa: 1.49, vs_consenso: null },
      { periodo: '1T25', ingresos: 565.2, crecimiento_pct: 10.3, crecimiento_organico_pct: null, ebitda: 123.8, margen_ebitda_pct: 21.9, bpa: 1.84, vs_consenso: null },
      { periodo: '2T25', ingresos: 596.1, crecimiento_pct: 10.2, crecimiento_organico_pct: null, ebitda: 129.8, margen_ebitda_pct: 21.8, bpa: 1.93, vs_consenso: null },
      { periodo: '3T25', ingresos: 595.9, crecimiento_pct: 9.7, crecimiento_organico_pct: null, ebitda: 132.9, margen_ebitda_pct: 22.3, bpa: 1.93, vs_consenso: null },
      { periodo: '4T25', ingresos: 575.2, crecimiento_pct: 6.3, crecimiento_organico_pct: null, ebitda: 109.1, margen_ebitda_pct: 19.0, bpa: 1.50, vs_consenso: 'Inferior' },
      { periodo: '1T26', ingresos: 613.5, crecimiento_pct: 8.6, crecimiento_organico_pct: null, ebitda: 133.7, margen_ebitda_pct: 21.8, bpa: 1.88, vs_consenso: 'Superior' },
      { periodo: '2T26', ingresos: 645.1, crecimiento_pct: 8.2, crecimiento_organico_pct: 6.2, ebitda: 129.9, margen_ebitda_pct: 20.1, bpa: 2.23, vs_consenso: 'En línea' },
    ],
    ultima_presentacion: 'En febrero de 2026 (4T25) la dirección guio un 2026 de 2.500-2.550 M de ingresos y 12,40-12,65 USD de BPA no GAAP, con las transacciones frenadas al 5-7 % por el fin del contrato de pagos de Texas (10-12 % sin él) y el mantenimiento cayendo un 5-7 % [2]; la acción cayó un 15,4 % el día de la conferencia, en plena venta masiva del software por la IA. En abril subió la guía a 12,50-12,75 USD e incorporó For The Record (~30 M de ventas en 2026) [5]. En julio (2T26) la volvió a subir a 12,95-13,20 USD con ingresos sin cambios: SaaS +21,7 %, reservas de SaaS y totales en máximo trimestral, nuevo valor anual de contratos SaaS +22 % y crecimiento orgánico unos 2 puntos por debajo del total [3, 8]. El discurso cambió hacia la recompra («prioridad mayor»; el 5,6 % del capital en el año) [3, 8]. Sobre la IA, el consejero delegado dijo no ver «ningún impacto» en el negocio principal, que las funciones de IA solo estarán en la versión en la nube y que los ingresos de IA serán relevantes en el 2S27-2028; no dio precios ni cifras de productividad de soporte («no estoy listo para publicarlas») [8]. Los analistas preguntaron por la IA, el ritmo de paso a la nube y los contratos estatales de vehículos [8].',
    confianza: 'Alta',
  },
  balance: {
    historico: balance,
    vencimientos: [{ anio: '2031', importe: 1437.5 }],
    liquidez: 'Caja 895,4 M USD e inversiones a corto 74,7 M y a largo 45,2 M a 30-jun-2026 (1.015 M en total) y una línea de crédito revolvente nueva de 1.000 M a cinco años, sin disponer [3, 4].',
    rating: null,
    coste_deuda_pct: 0.5,
    vida_media_anios: 4.8,
    otros_pasivos: 'La única deuda son 1.437,5 M USD de bonos convertibles al 0,5 % con vencimiento el 15-jul-2031 (emitidos en mayo de 2026; precio de conversión 405,94 USD), con una opción comprada («capped call») que eleva el precio efectivo de conversión a 655,77 USD: no hay dilución económica hasta ese precio [4]. Con ellos se devolvieron en marzo los 600 M de convertibles de 2026 y se recompraron 1,03 M de acciones por 320,7 M [4]. Arrendamientos operativos de 46,3 M, que en US GAAP no sumamos a la deuda [3]. Ingresos diferidos de 816,9 M (el 97 % se reconoce en 12 meses) [1, 3]. Impuestos diferidos pasivos de 108,6 M [3]. Litigio contractual con un cliente estatal ya provisionado en 2025 [1].',
    comentario: 'El circulante es negativo de forma estructural: los ingresos diferidos (781 M a cierre de 2025) superan a clientes menos proveedores (464 M), así que crecer libera caja [1]. La deuda neta pasó de 1.032 M tras NIC (2021) a caja neta en 2024 (−147 M) y 2025 (−415 M, con los convertibles de 2026 aún vivos) [6]. En 2026 la empresa reapalancó un poco para recomprar: emitió 1.437,5 M, devolvió 600 M y recompró 755 M de acciones en el 1S26; a junio la deuda neta es de unos 422 M, menos de una vez el EBITDA [3, 4].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'La caja es mejor que el beneficio: el flujo operativo de 2025 (654 M) es el 207 % del beneficio neto porque la remuneración en acciones (151 M) y la amortización (138 M) no son salidas de caja y los clientes pagan por adelantado [1, 2]. La caja libre de la empresa (flujo operativo menos inmovilizado y software activado) fue de 621 M en 2025 (26,6 % de las ventas) y de 706 M en los 12 meses a junio de 2026; la guía 2026 es del 26-28 % [2, 3]. El capex más el software activado cae del 2,7 % de las ventas en 2021 al 1,4 % en 2025 porque ya no desarrolla en propio la nube (usa AWS) [1]. La caja se ha ido a pagar NIC (2.090 M en 2021) y a devolver su deuda (2022-2024), y desde 2025 a recompras (175 M en 2025 y 755 M en el 1S26) [1, 3]. La caja libre no descuenta la remuneración en acciones: restándola, la de 2025 baja a unos 470 M.',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'Ernst & Young LLP', anios_auditor: null, opinion: 'Favorable (sin salvedades; control interno eficaz a 31-dic-2025)',
    comentario: 'Ernst & Young audita las cuentas y el control interno sin salvedades [1]. No hay cambios de criterio contable relevantes. La remuneración en acciones es alta: 151 M en 2025 (6,5 % de las ventas y el 48 % del beneficio neto), y el 20 % de los empleados recibe acciones [1, 2]. El tipo impositivo GAAP depende del ejercicio de opciones (negativo en 2020-2021, 19,1 % en 2025), lo que hace volátil el BPA publicado. Los intangibles comprados suman 3.601 M a junio de 2026 (fondo de comercio 2.755 M e intangibles 846 M), el 62 % del activo; no ha habido deterioros [3]. El software activado es pequeño (16,8 M en 2025, frente a 212 M de I+D en gasto) [1]. Los ingresos de servicios profesionales llevan provisiones por contratos con dos administraciones estatales (10,7 M en 2025) y un litigio (9,7 M en el 4T25) [1, 2].',
    senales: [
      { senal: 'Remuneración en acciones elevada', nivel: 'Media', comentario: '6,5 % de las ventas; el BPA no GAAP de la empresa la excluye y la caja libre la suma, por eso la caja libre parece un 25 % mayor que el beneficio económico [1, 2].' },
      { senal: 'Tipo impositivo GAAP volátil', nivel: 'Baja', comentario: 'Ventajas fiscales del ejercicio de opciones; normalizamos el BPA de la historia con un 23 % [6].' },
      { senal: 'Provisiones en contratos públicos', nivel: 'Baja', comentario: '10,7 M en dos contratos estatales y 9,7 M por un litigio en 2025; pequeñas frente a 2.332 M de ventas [1, 2].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Tyler no reparte dividendo. Usa la caja en compras de software para el sector público, en recompras y, en 2022-2024, en devolver la deuda de NIC [1]. En febrero de 2026 el consejo aprobó un programa de recompra de 1.000 M y en julio otro de 1.500 M; a 29-jul-2026 quedaban 1.745 M autorizados [3]. En el 1S26 recompró 2,4 M de acciones por 761 M (el 5,6 % del capital) y en septiembre firmó un plan 10b5-1 de hasta 260 M hasta el 29-oct [3, 4, 10]. El director financiero dice que la recompra tiene ahora «prioridad mayor» [8].',
    adquisiciones: [
      { anio: '2021', objetivo: 'NIC Inc. (portales y pagos digitales para administraciones)', importe: 2090, ev_ebitda: null, financiacion: '600 M de convertibles 2026 y préstamos bancarios', resultado: 'Hoy es el núcleo de Platform Technologies (629 M de ventas en 2025); el margen de ese segmento cae del 20,9 % de 2023 al 16,9 % de 2025 y perdió el contrato de pagos de Texas [1, 2].' },
      { anio: '2022', objetivo: 'Rapid Financial Solutions, ARInspect, US eSolutions y otras', importe: 164, ev_ebitda: null, financiacion: 'Caja', resultado: 'Pequeñas compras integradas en ES y PT; sin deterioros [6].' },
      { anio: '2025', objetivo: 'MyGov, Emergency Networking, CloudGavel y Edulink', importe: 91.5, ev_ebitda: null, financiacion: 'Caja', resultado: 'SaaS para urbanismo, bomberos, órdenes judiciales electrónicas y escuelas; integradas en ES [1].' },
      { anio: '2026', objetivo: 'For The Record (grabación y transcripción con IA en tribunales)', importe: 212.7, ev_ebitda: null, financiacion: 'Caja', resultado: 'Su tercera mayor compra; fondo de comercio de 162,6 M e intangibles de 114,6 M; ~30 M de ventas en 2026 [4, 5].' },
    ],
    comentario: null,
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'Enterprise Software (ES)', descripcion: 'Software de gestión para administraciones: finanzas y RR. HH. públicos, tribunales y seguridad pública, educación, catastro y registros.', tipo_resultado: 'EBIT', historico: [{ periodo: '2023', ingresos: 1349.7, resultado: 443.8 }, { periodo: '2024', ingresos: 1511.6, resultado: 546.4 }, { periodo: '2025', ingresos: 1694.4, resultado: 660.6 }] },
      { nombre: 'Platform Technologies (PT)', descripcion: 'Pagos digitales, portales y servicios por transacción (antigua NIC), procesado de datos.', tipo_resultado: 'EBIT', historico: [{ periodo: '2023', ingresos: 594.8, resultado: 124.4 }, { periodo: '2024', ingresos: 619.2, resultado: 116.5 }, { periodo: '2025', ingresos: 628.6, resultado: 106.1 }] },
      { nombre: 'Corporativo', descripcion: 'Ingresos de la conferencia de usuarios y gastos centrales: remuneración en acciones de todo el grupo y amortización de intangibles comprados.', tipo_resultado: 'EBIT', historico: [{ periodo: '2023', ingresos: 7.3, resultado: -349.0 }, { periodo: '2024', ingresos: 7.0, resultado: -363.4 }, { periodo: '2025', ingresos: 9.4 , resultado: -409.0 }] },
    ],
    geografias: null,
    kpis: [
      { kpi: 'Ingresos de SaaS', valor_anterior: '644,8 M (2024)', valor_actual: '777,8 M (2025)', variacion: '+20,6 %', comentario: '+21,7 % en el 2T26; 22 trimestres seguidos por encima del 20 % [2, 3].' },
      { kpi: 'Ingresos recurrentes anualizados (ARR)', valor_anterior: '2,07 mil M (2T25)', valor_actual: '2,24 mil M (2T26)', variacion: '+8,2 %', comentario: 'Frena desde el +10,9 % del 4T25 por Texas y el mantenimiento [2, 3].' },
      { kpi: 'Peso de los ingresos recurrentes', valor_anterior: '84,5 % (2024)', valor_actual: '87,1 % (2025)', variacion: '+2,6 p', comentario: 'Objetivo de más del 90 % en 2030 [2].' },
      { kpi: 'Ingresos de mantenimiento (licencias en local)', valor_anterior: '463,1 M (2024)', valor_actual: '445,6 M (2025)', variacion: '−3,8 %', comentario: 'Guía 2026: −5 a −7 %; cada cliente que pasa a la nube paga ~1,7 veces más [2, 8].' },
      { kpi: 'Caja libre', valor_anterior: '574,7 M (2024)', valor_actual: '620,8 M (2025)', variacion: '+8,0 %', comentario: 'Margen del 26,6 %; guía 2026 del 26-28 % [2].' },
      { kpi: 'Acciones en circulación', valor_anterior: '43,0 M (dic-25, aprox.)', valor_actual: '40,95 M (27-jul-2026)', variacion: '−4,8 %', comentario: 'Recompras de 2026 [4].' },
    ],
  },
  huecos: [
    { seccion: 'negocio', campo: 'geografías', tipo: 'Complemento', intentos: '1) 10-K 2025, nota de segmentos (solo por segmento y tipo de ingreso); 2) 10-Q 2T26; 3) XBRL (sin desglose geográfico); casi todo es EE. UU.', decision: 'Omitido' },
    { seccion: 'calidad', campo: 'años del auditor', tipo: 'Complemento', intentos: '1) 10-K 2025, informe del auditor (no da el año de inicio en el texto extraído); 2) proxy 2026; 3) no se buscó en el registro PCAOB por presupuesto', decision: 'Omitido' },
    { seccion: 'balance', campo: 'rating', tipo: 'Complemento', intentos: '1) 10-K 2025; 2) 10-Q 2T26 y 8-K de los convertibles (sin rating); 3) 8-K de la línea de crédito de mayo de 2026', decision: 'Omitido' },
  ],
  fuentes: fA,
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Top 10 Government Software Vendors and Market Forecast 2024-2029', editor: 'Apps Run The World', tipo: 'Sectorial', fecha: '2025-07', url: 'https://www.appsruntheworld.com/top-10-government-software-vendors-and-market-forecast/' },
  { id: 2, titulo: "Tyler's Modernizing Its Market (estimación de Gartner del mercado de Tyler: ~30.000 M USD, +7 % anual; TAM propio de 18.000 M)", editor: 'Morningstar (resumen de búsqueda; página no accesible)', tipo: 'Analistas', fecha: '2024', url: 'https://www.morningstar.com/stocks/tylers-modernizing-its-market' },
  { id: 3, titulo: 'Tyler Technologies, Form 10-K 2025 (Item 1: negocio y competencia; Item 1A: riesgos, IA)', editor: 'Tyler Technologies / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-18', url: `${SEC}/000086073126000016/tyl-20251231.htm` },
  { id: 4, titulo: 'Tyler Technologies Investor Day 2026: objetivos 2030 (resumen de la presentación)', editor: 'Quartr', tipo: 'Analistas', fecha: '2026-06-09', url: 'https://quartr.com/events/tyler-technologies-inc-tyl-investor-presentation_3gH3zz1e' },
  { id: 5, titulo: 'Tyler Technologies Q2 2026 Earnings Call Transcript', editor: 'Webull (transcripción)', tipo: 'Prensa', fecha: '2026-07-30', url: 'https://www.webull.com/news/15364343868957697' },
  { id: 6, titulo: 'US stocks: Anthropic AI tool sparks software selloff', editor: 'CNN', tipo: 'Prensa', fecha: '2026-02-04', url: 'https://edition.cnn.com/2026/02/04/investing/us-stocks-anthropic-software' },
  { id: 7, titulo: 'Roper Technologies: informe del repo (14-oct-2026), cuentas 2025 y riesgo de IA', editor: 'Roper Technologies / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-24', url: 'https://www.sec.gov/Archives/edgar/data/882835/000088283526000009/rop-20251231.htm' },
  { id: 8, titulo: 'Constellation Software, Consolidated Financial Statements 2025', editor: 'Constellation Software Inc.', tipo: 'Primaria', fecha: '2026-03-09', url: 'https://www.csisoftware.com/wp-content/uploads/2026/04/CSI-Financial-Statement-Q425-Final.pdf' },
  { id: 9, titulo: 'Oracle Corporation: estimaciones anuales y consenso', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/ORACLE-CORPORATION-13620698/finances/' },
  { id: 10, titulo: 'Veeva Systems, resultados del 4T del ejercicio 2026 (Exhibit 99.1)', editor: 'Veeva Systems / SEC EDGAR', tipo: 'Primaria', fecha: '2026-03', url: 'https://www.sec.gov/Archives/edgar/data/1393052/000139305226000007/veev-20260131q426xex991.htm' },
  { id: 11, titulo: 'Tyler Technologies is down over 50% as investors flee software stocks', editor: 'The Motley Fool', tipo: 'Prensa', fecha: '2026-07-05', url: 'https://www.fool.com/investing/2026/07/05/tyler-technologies-is-down-over-50-as-investors-fl/' },
  { id: 12, titulo: 'Tyler Technologies Reports Earnings for Second Quarter 2026', editor: 'Tyler Technologies / SEC EDGAR', tipo: 'Primaria', fecha: '2026-07-29', url: `${SEC}/000086073126000048/a991earningsrelease-6302026.htm` },
];
const B = {
  _estado: 'Completo.',
  historia: {
    resumen: 'Tyler nació en 1966 en Tyler (Texas) como conglomerado industrial (tuberías, imprenta). En 1998-1999, con John Marr, vendió lo industrial y se convirtió en proveedor de software para administraciones locales de EE. UU. a base de compras de programas de nicho (catastro, tribunales, finanzas municipales) [3]. Creció con una estrategia de «ventanilla única» para ayuntamientos, condados, escuelas y estados; en 2015 compró New World Systems (seguridad pública) y en 2021 NIC (pagos digitales, 2.090 M), su mayor compra. Lynn Moore es consejero delegado desde 2019 y, tras la salida de Marr en mayo de 2026, también preside el consejo. Entró en el S&P 500 en 2020. Desde 2019 traslada a sus clientes a la nube (SaaS en AWS) [3, 12].',
    hitos: [
      { anio: '1966', hito: 'Fundación como Tyler Corporation, conglomerado industrial en Texas.' },
      { anio: '1998', hito: 'Giro al software para el sector público con John Marr; venta de los negocios industriales.' },
      { anio: '2015', hito: 'Compra de New World Systems (seguridad pública y finanzas municipales).' },
      { anio: '2019', hito: 'Lynn Moore, consejero delegado; acuerdo con AWS y comienzo del paso de clientes a la nube.' },
      { anio: '2020', hito: 'Entrada en el S&P 500.' },
      { anio: '2021', hito: 'Compra de NIC (pagos digitales y portales estatales) por 2.090 M netos [3].' },
      { anio: '2026', hito: 'Convertibles de 1.437,5 M, recompra del 5,6 % del capital, compra de For The Record y objetivos 2030 elevados; John Marr deja el consejo [12, 4].' },
    ],
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'Tyler vende software de gestión y pagos digitales solo al sector público: ayuntamientos, condados, distritos escolares, tribunales, policía y bomberos, y gobiernos estatales, en los 50 estados de EE. UU. y algo en Canadá y Australia, con más de 50.000 instalaciones en 16.000 clientes [12]. Enterprise Software (73 % de las ventas de 2025) cubre las funciones administrativas críticas: contabilidad y RR. HH. públicos (Munis, ERP Pro), tribunales y justicia (Odyssey, Enterprise Justice), seguridad pública (Enterprise CAD), educación, catastro e impuestos sobre la propiedad y registros. Platform Technologies (27 %) son los pagos y servicios digitales que se cobran por transacción (portales estatales, multas, licencias, vehículos), procedentes sobre todo de NIC [3]. Tiene unos 7.800 empleados, el 93 % en EE. UU. [3].',
    como_gana_dinero: 'El 87 % de los ingresos de 2025 es recurrente: SaaS (778 M, +20,6 %), comisiones por transacción (808 M, +15,8 %) y mantenimiento de licencias en local (446 M, −3,8 %) [12, 3]. El resto son servicios de implantación (243 M), licencias y equipos. El motor del crecimiento es el paso de clientes de licencia con mantenimiento a SaaS: cada cliente que cambia paga unas 1,7 veces más al año, y el objetivo es pasar el 85 % del mantenimiento de 2023 a la nube en 2030 [5]. Las transacciones crecen con el volumen de pagos digitales y con contratos estatales nuevos. El margen sube con la escala de la nube (margen bruto no GAAP del 50,4 % en el 2T26 frente al 48,9 % un año antes) y es estacional: el 4T es el trimestre más flojo en margen [12].',
    clientes: 'Ningún cliente pesa de forma relevante; son miles de administraciones pequeñas y medianas, más contratos estatales grandes en pagos y tribunales [3]. Los contratos de software son plurianuales (3-10 años en SaaS) con renovación; la retención bruta de clientes es del 98 % según la propia empresa [4]. Los clientes eligen por concurso público (RFP), lo que alarga los ciclos de venta pero hace muy caro cambiar de proveedor: una migración de un sistema de tribunales o de contabilidad municipal dura años. El poder de precios se ve en las subidas anuales de los contratos y en la prima de la nube; el riesgo es que dependen de presupuestos públicos, aunque en 2020 y 2023 no cayeron. En 2026 perdió el contrato de pagos de Texas, que frena las transacciones unos 5 puntos [12].',
    confianza: 'Alta',
  },
  sector: {
    definicion: 'El mercado relevante es el software para administraciones públicas (estatales, locales, educación y justicia), con peso de EE. UU. No hay estadística oficial. Usamos Apps Run The World, que mide el software para gobiernos en todo el mundo (26.676 M USD en 2024, +11,8 %) con previsión del 6 % anual hasta 2029 y sitúa a Tyler como segundo proveedor tras Microsoft [1], y lo contrastamos con la estimación de Gartner del mercado de Tyler (unos 30.000 M USD, +7 % anual) que cita Morningstar, frente a un mercado direccionable propio de 18.000 M [2]. Las dos dan un orden de magnitud de 25.000-30.000 M y un crecimiento del 6-7 %; incluyen software de propósito general (Microsoft, Zoom) que Tyler no vende, y no incluyen del todo los pagos por transacción de Tyler.',
    tamano: '≈ 26.676 M USD en 2024 según Apps Run The World (software para gobiernos, mundial) [1]; ≈ 30.000 M USD según Gartner para el mercado de Tyler [2].',
    unidad_serie: 'millones de USD (Apps Run The World; 2025-2029 previsión al 6 %)',
    serie: [{ anio: '2022', tamano: 21742 }, { anio: '2023', tamano: 23853 }, { anio: '2024', tamano: 26676 }, { anio: '2025e', tamano: 28277 }, { anio: '2029e', tamano: 35600 }],
    tcac_historico_pct: 10.8, tcac_previsto_pct: 6.0, cr5_pct: null, estructura: 'Moderadamente concentrada',
    drivers: [
      { driver: 'Modernización de sistemas antiguos de las administraciones (paso a la nube)', efecto: '+', horizonte: 'Estructural', evidencia: 'SaaS de Tyler +20,6 % en 2025 y objetivo de pasar a la nube el 85 % del mantenimiento de 2023 antes de 2030 [3, 5].' },
      { driver: 'Digitalización de pagos y trámites a los ciudadanos', efecto: '+', horizonte: 'Estructural', evidencia: 'Transacciones de Tyler +15,8 % en 2025; +10 % sin Texas en el 2T26 [5, 12].' },
      { driver: 'Escasez de funcionarios: la IA como sustituto de personal', efecto: '+/−', horizonte: 'Estructural', evidencia: 'Tyler vende automatización documental y asistentes como ahorro de plantilla; también puede abaratar programas a medida [5].' },
      { driver: 'Presupuestos estatales y locales', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Los impuestos sobre la propiedad sostienen los presupuestos locales; los recortes federales de fondos pueden frenar proyectos [3].' },
      { driver: 'IA generativa: menor coste de escribir software', efecto: '−', horizonte: 'Estructural', evidencia: 'El 3-feb-2026 los complementos de IA de Anthropic hundieron el software (Thomson Reuters −16 %) [6]; Tyler perdió un 51 % desde su máximo [11].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 2, justificacion: 'Tyler es líder en EE. UU. en la mayoría de sus nichos; compite con Oracle, Workday, SAP e Infor en ERP de grandes clientes y con CentralSquare, Motorola y Axon en seguridad pública [3].' },
      { fuerza: 'Poder de los clientes', intensidad: 2, justificacion: 'Clientes fragmentados que compran por concurso; su poder está en el concurso inicial, no en la renovación, porque migrar un sistema de tribunales o de contabilidad lleva años [3].' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'El coste principal es el personal (7.800 empleados); la nube es de AWS, un proveedor con poder pero sustituible [3].' },
      { fuerza: 'Amenaza de entrada', intensidad: 3, justificacion: 'La IA abarata escribir software, pero la entrada exige referencias de otros clientes públicos, certificaciones (CJIS en justicia, FedRAMP) y años de concurso: la barrera es la confianza y la regulación, no el código [3, 5].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 2, justificacion: 'Los departamentos de informática propios y las consultoras desarrollan a medida en grandes gobiernos; la IA puede hacerlo más barato, pero el sector público adopta despacio y exige trazabilidad [3, 5].' },
    ],
    ciclo: { posicion: 'Madurez del ciclo', comentario: 'El software para administraciones es poco cíclico: los ingresos de Tyler crecieron en 2009, en 2020 (+2,8 %, con pocos proyectos presenciales) y en 2022-2023, porque los presupuestos locales dependen del impuesto sobre la propiedad, que se ajusta con retraso [3]. Lo que mueve hoy la acción no es el ciclo sino la percepción de la IA y el ritmo de paso a la nube. Los presupuestos estatales de 2026 están sanos según la empresa, con reservas de contratos en máximos [12].' },
    regulacion: 'Las compras públicas van por concurso (RFP) con plazos largos. Los sistemas de justicia y policía exigen las normas CJIS del FBI; los federales, FedRAMP. La regulación de la IA en el sector público avanza por estados (leyes de uso responsable y de transparencia) y obliga a explicar las decisiones automatizadas, lo que favorece a proveedores con datos trazables [3]. En el Item 1A Tyler cita como riesgo el cambio de la regulación de la IA y su coste de cumplimiento [3].',
    tendencias: 'Dos tendencias deciden: el paso a la nube (lo que más crece, con 1,7 veces más ingresos por cliente que cambia) y la IA generativa. Tyler la usa para vender módulos (automatización documental, transcripción judicial con For The Record, asistentes a ciudadanos) solo en su versión en la nube, y espera ingresos relevantes en 2027-2028 [5]. La amenaza es que la IA reduzca el coste de desarrollar software a medida o de entrar con un producto nuevo; en el sector público, la confianza, la certificación y el coste de migrar frenan ese efecto más que en el software de productividad [5, 11].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 8.2,
    posicion: 'Segundo proveedor de software para gobiernos del mundo según Apps Run The World (tras Microsoft, que vende software general) y primero especializado en administraciones locales de EE. UU.; cuota estimada del ~8 % del mercado mundial de software para gobiernos (2.332 M sobre ~28.300 M en 2025) [1, 3].',
    competidores: [
      { nombre: 'Oracle', pais: 'EE. UU.', ticker: 'ORCL', ingresos: 57399, cuota_pct: null, margen_ebit_pct: 43.6, comentario: 'ERP y nube para estados y grandes ciudades; el negocio público es una parte pequeña de sus ventas [9].' },
      { nombre: 'Constellation Software (Harris Computer)', pais: 'Canadá', ticker: 'CSU', ingresos: 11623, cuota_pct: null, margen_ebit_pct: 16.3, comentario: 'Su división Harris compra programas municipales y de servicios públicos; principal rival en ayuntamientos pequeños [8].' },
      { nombre: 'Roper Technologies', pais: 'EE. UU.', ticker: 'ROP', ingresos: 7903, cuota_pct: null, margen_ebit_pct: 28.0, comentario: 'Software vertical (Deltek para contratistas públicos, Frontline en educación); compite en escuelas [7].' },
      { nombre: 'CentralSquare Technologies', pais: 'EE. UU.', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'De capital riesgo (Bain, Vista); rival directo en seguridad pública y finanzas municipales; no publica cuentas [3].' },
      { nombre: 'Veeva Systems', pais: 'EE. UU.', ticker: 'VEEV', ingresos: 3195, cuota_pct: null, margen_ebit_pct: 28.7, comentario: 'No compite con Tyler: referencia de software vertical en la nube con nicho regulado [10].' },
    ],
    foso: {
      veredicto: 'Amplio', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 2, evidencia: 'Débiles: los datos de tribunales, policía y pagos se integran entre agencias del mismo estado cuando todas usan Tyler [3].' },
        { fuente: 'Costes de cambio', puntuacion: 5, evidencia: 'Retención bruta del 98 % y migraciones de varios años por concurso; ingresos recurrentes del 87 % [4, 12].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'Referencias de miles de administraciones y certificaciones (CJIS) que un recién llegado tarda años en reunir [3].' },
        { fuente: 'Ventaja en costes', puntuacion: 2, evidencia: 'Escala en implantación y soporte; margen operativo no GAAP del 26,4 % frente a rivales de capital riesgo sin cifras públicas [12].' },
        { fuente: 'Escala eficiente', puntuacion: 4, evidencia: 'Nichos (tribunales, catastro) con dos o tres proveedores; la cuota de Tyler en tribunales estatales es la mayor de EE. UU. [3].' },
      ],
    },
    amenazas: 'La amenaza que más pesa es la IA: si abarata el desarrollo a medida, los grandes gobiernos podrían sustituir partes del programa por herramientas propias, y un competidor nativo en IA podría ganar concursos con precios menores. En Tyler la probabilidad nos parece baja a cinco años en los sistemas de registro (tribunales, contabilidad pública, catastro), que exigen trazabilidad y certificaciones, y media en las funciones de atención al ciudadano y documentales. La segunda amenaza es la pérdida de contratos estatales de pagos (Texas en 2026) y la presión sobre las comisiones; la tercera, que el paso a la nube se agote hacia 2030 y el crecimiento baje al ritmo del mercado (6-7 %) [1, 5].',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Lo material para Tyler es la ciberseguridad y la privacidad: guarda datos judiciales, policiales y fiscales de millones de ciudadanos, y un incidente tendría coste legal, de reputación y de contratos [3]. Tiene un equipo propio de seguridad, pruebas de intrusión y seguros cibernéticos, y la comisión de auditoría supervisa desde 2025 los riesgos de la IA [3]. El segundo asunto es el capital humano: rotación voluntaria del 7 % y antigüedad media de ocho años [3].',
    controversias: 'En 2020 sufrió un ataque de ransomware en su red interna sin afectar a los sistemas de clientes alojados [3]. Hay un litigio contractual con un cliente estatal desde 2022, provisionado en 2025 (9,7 M) [3]. No hemos encontrado sanciones.',
    confianza: 'Baja',
  },
  huecos: [
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) 10-K 2025 (no las cita); 2) proxy 2026 (sin calificaciones); 3) no se buscó en las agencias por presupuesto', decision: 'Omitido' },
    { seccion: 'sector', campo: 'CR5', tipo: 'Complemento', intentos: '1) Apps Run The World (cuotas de pago; solo el 44,6 % de los diez primeros); 2) 10-K de Tyler (sin cuotas); 3) prensa sectorial', decision: 'Omitido' },
  ],
  fuentes: fB,
};
guarda('B', B);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Tyler Technologies, Proxy Statement 2026 (DEF 14A)', editor: 'Tyler Technologies / SEC EDGAR', tipo: 'Primaria', fecha: '2026-03-23', url: `${SEC}/000086073126000022/tyl-20260323.htm` },
  { id: 2, titulo: 'Form 8-K: resultados de la junta del 5-may-2026 (Item 5.07)', editor: 'Tyler Technologies / SEC EDGAR', tipo: 'Primaria', fecha: '2026-05-05', url: `${SEC}/000086073126000034/tyl-20260505.htm` },
  { id: 3, titulo: 'Form 4 de Tyler Technologies (CIK 860731), oct-2025 a oct-2026', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-14', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000860731&type=4' },
  { id: 4, titulo: 'Tyler Technologies Reports Earnings for Fourth Quarter 2021 (guía 2022)', editor: 'Tyler Technologies / SEC EDGAR', tipo: 'Primaria', fecha: '2022-02-16', url: `${SEC}/000086073122000008/a991earningsrelease12312021.htm` },
  { id: 5, titulo: 'Tyler Technologies Reports Earnings for Fourth Quarter 2022 (guía 2023)', editor: 'Tyler Technologies / SEC EDGAR', tipo: 'Primaria', fecha: '2023-02-15', url: `${SEC}/000086073123000004/a991earningsrelease12312022.htm` },
  { id: 6, titulo: 'Tyler Technologies Reports Earnings for Fourth Quarter 2023 (guía 2024)', editor: 'Tyler Technologies / SEC EDGAR', tipo: 'Primaria', fecha: '2024-02-14', url: `${SEC}/000086073124000003/a991earningsrelease12312023.htm` },
  { id: 7, titulo: 'Tyler Technologies Reports Earnings for Fourth Quarter 2024 (guía 2025)', editor: 'Tyler Technologies / SEC EDGAR', tipo: 'Primaria', fecha: '2025-02-12', url: `${SEC}/000086073125000003/a991earningsrelease12312024.htm` },
  { id: 8, titulo: 'Tyler Technologies Reports Earnings for Fourth Quarter 2025 (guía 2026)', editor: 'Tyler Technologies / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-11', url: `${SEC}/000086073126000013/a991earningsrelease12312025.htm` },
  { id: 9, titulo: 'Tyler Technologies Reports Earnings for Second Quarter 2026 (guía 2026 elevada)', editor: 'Tyler Technologies / SEC EDGAR', tipo: 'Primaria', fecha: '2026-07-29', url: `${SEC}/000086073126000048/a991earningsrelease-6302026.htm` },
  { id: 10, titulo: 'Tyler Technologies, Form 10-Q 2T26 (acciones en circulación)', editor: 'Tyler Technologies / SEC EDGAR', tipo: 'Primaria', fecha: '2026-07-29', url: `${SEC}/000086073126000050/tyl-20260630.htm` },
];
const cons = (nombre, tipo, desde, comisiones, cargo = 'Consejero') => ({ nombre, cargo, tipo, desde, comisiones });
const Cn = {
  _estado: 'Completo.',
  directivos: {
    equipo: [
      { nombre: 'H. Lynn Moore, Jr.', cargo: 'Presidente ejecutivo del consejo, presidente y consejero delegado', desde: '2019', participacion_pct: 0.59, trayectoria: 'En Tyler desde 1998 (director jurídico, director de operaciones); consejero delegado desde 2019 y presidente del consejo desde mayo de 2026. Ha dirigido la compra de NIC y el paso a la nube: SaaS de 528 M en 2023 a 778 M en 2025 y caja libre de 327 M en 2023 a 621 M en 2025 [1, 8].' },
      { nombre: 'Brian K. Miller', cargo: 'Director financiero (EVP, CFO)', desde: '2008', participacion_pct: 0.14, trayectoria: 'Director financiero desde 2008; financió NIC y devolvió su deuda en tres años; dirige ahora la recompra y emitió los convertibles de 2031 al 0,5 % [1, 9].' },
      { nombre: 'Jeffrey D. Puckett', cargo: 'Director de operaciones (COO)', desde: '2021', participacion_pct: 0.13, trayectoria: 'En Tyler desde 2007; dirige la implantación y el paso a la nube [1].' },
      { nombre: 'Abigail M. Diaz', cargo: 'Directora de administración y secretaria del consejo', desde: '2024', participacion_pct: 0.03, trayectoria: 'Responsable jurídica y de gobierno; patrocina el comité de riesgos de IA [1].' },
      { nombre: 'Glenn A. Carter', cargo: 'Consejero independiente coordinador', desde: '2014', participacion_pct: 0.03, trayectoria: 'Fundador de DataProse (facturación para el sector público); preside Nombramientos y Gobierno [1].' },
    ],
    historial_guidance: [
      { anio: '2022', guia: 'Ingresos 1.830-1.870 M; BPA no GAAP 7,41-7,58 USD [4]', real: 'Ingresos 1.850 M; BPA no GAAP 7,50 USD [5]', cumplida: 'Sí' },
      { anio: '2023', guia: 'Ingresos 1.935-1.970 M; BPA no GAAP 7,50-7,65 USD [5]', real: 'Ingresos 1.952 M; BPA no GAAP 7,80 USD [6]', cumplida: 'Sí' },
      { anio: '2024', guia: 'Ingresos 2.095-2.135 M; BPA no GAAP 8,90-9,10 USD; caja libre 17-19 % [6]', real: 'Ingresos 2.138 M; BPA no GAAP 9,55 USD; caja libre 26,9 % [7]', cumplida: 'Sí' },
      { anio: '2025', guia: 'Ingresos 2.300-2.340 M; BPA no GAAP 10,90-11,15 USD; caja libre 24-26 % [7]', real: 'Ingresos 2.332 M; BPA no GAAP 11,31 USD; caja libre 26,6 % [8]', cumplida: 'Sí' },
      { anio: '2026', guia: 'Ingresos 2.500-2.550 M; BPA no GAAP 12,40-12,65 USD [8]', real: 'En curso: ingresos 2.535-2.575 M (con For The Record) y BPA 12,95-13,20 USD en julio [9]', cumplida: 'Parcial' },
    ],
    comentario: 'La dirección cumple la guía con regularidad: ingresos dentro del rango y BPA no GAAP en el máximo o por encima los cuatro últimos años, y la caja libre muy por encima en 2024 [4-8]. El equipo es estable y de la casa: Moore lleva 28 años en Tyler y Miller 18 como director financiero [1]. La sucesión de John Marr, que deja el consejo en mayo de 2026, concentra en Moore la presidencia y la dirección; el consejo lo compensa con un consejero independiente coordinador [1]. Los directivos vendieron 10,7 M USD de acciones en 12 meses, la mayor parte en agosto de 2026 a 356-373 USD; dos compraron en febrero tras la caída [3].',
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      cons('H. Lynn Moore, Jr.', 'Ejecutivo', '2017', 'Ejecutiva', 'Presidente ejecutivo y consejero delegado'),
      cons('Glenn A. Carter', 'Independiente', '2014', 'Nombramientos y Gobierno (presidente); Retribuciones', 'Consejero independiente coordinador'),
      cons('Margot L. Carter', 'Independiente', '2024', 'Nombramientos y Gobierno'),
      cons('Brenda A. Cline', 'Independiente', '2014', 'Auditoría (presidenta); Nombramientos y Gobierno'),
      cons('Ronnie D. Hawkins, Jr.', 'Independiente', '2021', 'Retribuciones'),
      cons('Cecil W. Jones', 'Independiente', '2026', 'Pendiente de asignar'),
      cons('Daniel M. Pope', 'Independiente', '2016', 'Retribuciones (presidente); Auditoría'),
      cons('Andrew D. Teed', 'Independiente', '2024', 'Auditoría'),
    ],
    presidente_ceo_separados: false, presidente_ejecutivo: true, consejero_coordinador: true, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: false, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 1,
    voto_remuneracion_pct: 96.9, voto_remuneracion_contra_pct: 2.7, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 8.86, fijo: 0.68, variable_corto: null, variable_largo: 8.17, ratio_salario_medio: 86 },
    remuneracion: 'El consejero delegado cobró 8,86 M USD en 2025: 0,68 M de sueldo y 8,17 M en acciones; el variable anual también se paga en acciones con objetivos [1]. Las acciones a largo plazo dependen a partes iguales del crecimiento de los ingresos recurrentes a tres años y del margen operativo no GAAP ajustado (que excluye la remuneración en acciones y la amortización de lo comprado) [1]. No hay métrica de rentabilidad sobre el capital ni de rendimiento para el accionista. La relación con el empleado medio es de 86 veces [1]. El voto consultivo de 2026 obtuvo un 97,0 % a favor y un 2,7 % en contra (99 % en 2025) [1, 2].',
    accionistas: [
      { nombre: 'The Vanguard Group', pct: 13.1, tipo: 'Gestora indexada', variacion: '13G de julio de 2025 [1]' },
      { nombre: 'BlackRock', pct: 9.6, tipo: 'Gestora', variacion: '13G de febrero de 2025 [1]' },
      { nombre: 'Consejo y directivos', pct: 1.1, tipo: 'Insiders', variacion: '451.051 acciones incluidas opciones [1]' },
      { nombre: 'Autocartera', pct: 14.9, tipo: 'Autocartera', variacion: '48,15 M emitidas frente a 40,95 M en circulación a jul-2026 [10]' },
    ],
    insiders: [
      { fecha: '2025-11-25', persona: 'Brian K. Miller (director financiero)', operacion: 'Venta', acciones: 1000, importe: 0.47 },
      { fecha: '2025-12-12', persona: 'Brian K. Miller (director financiero)', operacion: 'Venta', acciones: 1000, importe: 0.46 },
      { fecha: '2026-02-20', persona: 'Abigail M. Diaz (directora de administración)', operacion: 'Compra', acciones: 610, importe: 0.20 },
      { fecha: '2026-02-23', persona: 'Andrew D. Teed (consejero)', operacion: 'Compra', acciones: 1600, importe: 0.50 },
      { fecha: '2026-03-05', persona: 'Jeffrey D. Puckett (director de operaciones)', operacion: 'Venta', acciones: 5174, importe: 1.91 },
      { fecha: '2026-03-12', persona: 'Glenn A. Carter (consejero)', operacion: 'Venta', acciones: 1624, importe: 0.57 },
      { fecha: '2026-08-24', persona: 'Jeffrey D. Puckett (director de operaciones)', operacion: 'Venta', acciones: 8500, importe: 3.03 },
      { fecha: '2026-08-28', persona: 'H. Lynn Moore, Jr. (consejero delegado)', operacion: 'Venta', acciones: 9250, importe: 3.45 },
    ],
    control_y_defensas: 'No hay accionista de control: los mayores son gestoras (Vanguard 13,1 %, BlackRock 9,6 %) [1]. Una acción, una voto; consejeros elegidos cada año por mayoría; en 2025 la junta aprobó la mayoría simple para fusiones [1]. Desde mayo de 2026 Moore es a la vez presidente y consejero delegado; lo equilibra un consejero coordinador independiente. En la junta de 2026 Glenn Carter (17 % en contra) y Moore (12,5 % en contra) tuvieron los votos más bajos [2]. La empresa empleó en 2025 a una hija de John Marr (algo más de 120.000 USD), operación vinculada menor [1].',
    alertas: [
      'Presidencia y dirección en la misma persona desde mayo de 2026, tras la salida de John Marr [1].',
      'Ventas de directivos de 10,7 M USD en 12 meses, ninguna con plan 10b5-1; las mayores en agosto de 2026, mientras la empresa recompraba [3].',
      'Incentivo a largo plazo ligado a ingresos y a un margen que excluye la remuneración en acciones y la amortización de lo comprado [1].',
    ],
    confianza: 'Alta',
  },
  fuentes: fC,
};
guarda('C', Cn);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de TYL, ^GSPC e IGV (precio, rango, volumen, betas, cierres de ejercicio)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-13', url: 'https://finance.yahoo.com/quote/TYL/history/' },
  { id: 2, titulo: 'Tyler Technologies: estimaciones anuales y consenso (23 analistas, objetivo medio 425,45 USD)', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/TYLER-TECHNOLOGIES-INC-446337/finances/' },
  { id: 3, titulo: 'Daily Treasury Par Yield Curve Rates 2026 (10 años: 5,21 % el 13-oct-2026; recogido en el informe de Roper del repo)', editor: 'U.S. Department of the Treasury', tipo: 'Datos de mercado', fecha: '2026-10-13', url: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve&field_tdr_date_value=2026' },
  { id: 4, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 5, titulo: 'Stocktwits $TYL: cambios de recomendación (Wells Fargo a sobreponderar con objetivo 400 USD, 12-oct; Goldman Sachs a 395 USD, 1-ago) y fecha de resultados del 3T26 (28-oct, Estimize)', editor: 'Stocktwits (citando TheFly y Estimize)', tipo: 'Prensa', fecha: '2026-10-12', url: 'https://api.stocktwits.com/api/2/streams/symbol/TYL.json' },
  { id: 6, titulo: 'MeridianLink, DEFM14A: Selected Precedent Transactions Analysis (Centerview)', editor: 'MeridianLink / SEC EDGAR', tipo: 'Primaria', fecha: '2025-09-22', url: 'https://www.sec.gov/Archives/edgar/data/1834494/000114036125035721/ny20054829x2_defm14a.htm' },
  { id: 7, titulo: 'Weave Communications, DEFM14A, fusión con Francisco Partners', editor: 'Weave Communications / SEC EDGAR', tipo: 'Primaria', fecha: '2026-09-25', url: 'https://www.sec.gov/Archives/edgar/data/1609151/000114036126037628/ny20081403x2_defm14a.htm' },
  { id: 8, titulo: 'Múltiplos de Roper, Veeva y ServiceNow (informes del repo del 14-oct-2026, MarketScreener y cuentas)', editor: 'MarketScreener / cuentas de las empresas', tipo: 'Analistas', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/ROPER-TECHNOLOGIES-INC-14279/finances/' },
  { id: 9, titulo: 'Múltiplos de Constellation Software, Bentley Systems, Descartes e Intuit (informes del repo del 10-oct-2026, MarketScreener)', editor: 'MarketScreener / cuentas de las empresas', tipo: 'Analistas', fecha: '2026-10-10', url: 'https://www.marketscreener.com/quote/stock/CONSTELLATION-SOFTWARE-IN-1409607/finances/' },
  { id: 10, titulo: 'Múltiplos de Salesforce (informe del repo del 12-oct-2026, MarketScreener)', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-12', url: 'https://www.marketscreener.com/quote/stock/SALESFORCE-INC-12180/finances/' },
  { id: 11, titulo: 'Oracle Corporation: estimaciones anuales (ejercicio a mayo; cierre 143,20 USD)', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/ORACLE-CORPORATION-13620698/finances/' },
  { id: 12, titulo: 'Tyler Technologies, Form 10-Q 2T26 (balance a 30-jun-2026, acciones a 27-jul-2026)', editor: 'Tyler Technologies / SEC EDGAR', tipo: 'Primaria', fecha: '2026-07-29', url: `${SEC}/000086073126000050/tyl-20260630.htm` },
  { id: 13, titulo: 'Tyler Technologies Reports Earnings for Second Quarter 2026 (guía 2026)', editor: 'Tyler Technologies / SEC EDGAR', tipo: 'Primaria', fecha: '2026-07-29', url: `${SEC}/000086073126000048/a991earningsrelease-6302026.htm` },
  { id: 14, titulo: 'Tyler Technologies Investor Day 2026: objetivos 2030 (resumen de la presentación)', editor: 'Quartr', tipo: 'Analistas', fecha: '2026-06-09', url: 'https://quartr.com/events/tyler-technologies-inc-tyl-investor-presentation_3gH3zz1e' },
  { id: 15, titulo: 'Tyler Technologies, Form 10-K 2021 / nota de resultados 4T21 (compra de NIC)', editor: 'Tyler Technologies / SEC EDGAR', tipo: 'Primaria', fecha: '2022-02-16', url: `${SEC}/000086073122000008/a991earningsrelease12312021.htm` },
];
const B1 = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const cierre = Object.fromEntries(B1.cierres_ejercicio.map((c) => [c.anio, c.precio_cierre]));
const D = {
  _estado: 'Completo.',
  identificacion: {
    nombre: 'Tyler Technologies, Inc.', nombre_corto: 'Tyler', ticker: 'TYL', isin: 'US9022521051', mercado: 'New York Stock Exchange', indice_referencia: 'S&P 500',
    pais: 'Estados Unidos', pais_iso: 'US', sector: 'Tecnologías de la información', industria: 'Software', sede: 'Plano (Texas)', fundacion: '1966', empleados: 7800, web: 'www.tylertech.com',
    precio: 346.9, fecha_precio: '2026-10-13', acciones: 41.2, capitalizacion_publicada: null, free_float_pct: 98.9,
    max_52s: 524.43, min_52s: 270.71, volumen_medio_diario: '≈ 279 M USD/día (3 meses)', proximos_resultados: '2026-10-28',
  },
  consenso: {
    guidance: 'Guía 2026 (29-jul-2026): ingresos de 2.535-2.575 M USD (2.500-2.550 en febrero, antes de For The Record), BPA no GAAP de 12,95-13,20 USD (12,40-12,65 en febrero y 12,50-12,75 en abril), margen de caja libre del 26-28 %, I+D de 245-250 M y capex de 18-20 M [13]. Objetivos 2030 (día del inversor de junio de 2026): ingresos recurrentes de 3.300-3.400 M, crecimiento orgánico de los recurrentes del 10-12 % anual, más del 90 % de ingresos recurrentes, margen operativo no GAAP de mediados del 30 % y margen de caja libre de algo más del 30 % [14].',
    estimaciones: [
      { periodo: '2026e', ingresos: 2552, ebitda: 734.5, ebit: 687.1, bpa: 8.68, dpa: 0, fuente: 'MarketScreener, 23 analistas (EBITDA y EBIT ajustados sin pagos en acciones; BPA GAAP) [2]' },
      { periodo: '2027e', ingresos: 2809, ebitda: 834.5, ebit: 781.7, bpa: 10.35, dpa: 0, fuente: 'MarketScreener [2]' },
      { periodo: '2028e', ingresos: 3057, ebitda: 952, ebit: 894.4, bpa: 11.66, dpa: 0, fuente: 'MarketScreener [2]' },
    ],
    recomendaciones: { n_analistas: 23, comprar: null, mantener: null, vender: null, po_medio: 425.45, po_min: null, po_max: null },
    revisiones: 'Solo MarketScreener da estimaciones completas (23 analistas, objetivo medio 425,45 USD) [2]. Su EBITDA y su EBIT son los ajustados de la empresa (650,4 y 606,7 M en 2025, sin la remuneración en acciones ni la amortización de lo comprado) y su BPA es GAAP (7,20 en 2025). En los últimos tres meses los objetivos se movieron en las dos direcciones: Goldman Sachs bajó de 435 a 395 USD el 1-ago y Wells Fargo subió a sobreponderar con objetivo de 400 (desde 335) el 12-oct [5]. El BPA no GAAP de 2026 subió con la guía de julio (de 12,50-12,75 a 12,95-13,20 USD), por encima del consenso de entonces (12,89) [5, 13].',
    base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: 6.6,
    confianza: 'Media',
  },
  bolsa: {
    ...B1.bolsa,
    posicion_corta_pct: null,
    comentario: 'Tyler ha perdido un 31,5 % en un año frente al +17,5 % del S&P 500 y el −2,3 % del ETF de software IGV, y un 7,0 % anual en cinco años [1]. La caída se concentró entre finales de enero y mediados de febrero de 2026: −9,3 % el 29-ene, −8,5 % el 3-feb (venta masiva del software por los complementos de IA de Anthropic) y −15,4 % el 12-feb, día de la conferencia del 4T25, con una guía de transacciones frenada por la pérdida de Texas [1]. El mínimo fue de 270,71 USD el 22-jun-2026; la recompra y la guía de julio la llevaron a ~373 USD en agosto y hoy cotiza a 346,90. La beta mensual de cinco años es 0,79 (semanal 1,01; semanal de dos años 0,50) [1].',
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'].map((a) => ({ anio: a, precio_cierre: cierre[a], ev_ebitda_ntm: null, per_ntm: null, excluir: a === '2020' || a === '2021' })),
    comentario: null,
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Nueve compañías: los comparables directos que pide el análisis (Roper, Constellation Software y Oracle, que compiten con Tyler en ayuntamientos, escuelas y ERP de estados; CentralSquare no cotiza) y software vertical o de aplicaciones en la nube cotizado en EE. UU. y Canadá (Veeva, Bentley, Descartes, Intuit, Salesforce y ServiceNow) [8-11]. Las cifras de Roper, Veeva y ServiceNow son de los informes del repo del 14-oct; las de Constellation, Bentley, Descartes e Intuit, de los del 10-oct; la de Salesforce, del 12-oct (los precios se han movido poco); las de Oracle, de MarketScreener a 14-oct, ponderando por meses su ejercicio a mayo (estimación propia). Oracle crece un 47 % por la nube de IA y distorsiona el crecimiento; la dejamos por ser competidor directo. El PER mezcla bases (GAAP y ajustado).',
    empresas: [
      { nombre: 'Roper Technologies', ticker: 'ROP', pais: 'US', capitalizacion: 36730, ev_ventas: 5.57, ev_ebitda_ltm: 14.2, ev_ebitda_ntm: 13.0, per_ntm: 18.3, crecimiento_pct: 6.5, margen_ebitda_pct: 39.1, roic_pct: 6.4, dn_ebitda: 3.4, fcf_yield_pct: 7.1 },
      { nombre: 'Constellation Software', ticker: 'CSU', pais: 'CA', capitalizacion: 44603, ev_ventas: 4.2, ev_ebitda_ltm: 15.3, ev_ebitda_ntm: 12.5, per_ntm: 34.8, crecimiento_pct: 17.9, margen_ebitda_pct: 27.6, roic_pct: 21.7, dn_ebitda: 0.5, fcf_yield_pct: 5.4 },
      { nombre: 'Oracle', ticker: 'ORCL', pais: 'US', capitalizacion: 409600, ev_ventas: 6.97, ev_ebitda_ltm: 12.6, ev_ebitda_ntm: 8.3, per_ntm: 18.6, crecimiento_pct: 47.0, margen_ebitda_pct: 54.3, roic_pct: null, dn_ebitda: 2.6, fcf_yield_pct: -5.8 },
      { nombre: 'Veeva Systems', ticker: 'VEEV', pais: 'US', capitalizacion: 48773, ev_ventas: 12.01, ev_ebitda_ltm: 38.8, ev_ebitda_ntm: null, per_ntm: 29.8, crecimiento_pct: 12.9, margen_ebitda_pct: 30.9, roic_pct: null, dn_ebitda: -6.8, fcf_yield_pct: 3.4 },
      { nombre: 'Bentley Systems', ticker: 'BSY', pais: 'US', capitalizacion: 10162, ev_ventas: 7.06, ev_ebitda_ltm: 22.9, ev_ebitda_ntm: 19.1, per_ntm: 28.1, crecimiento_pct: 11.4, margen_ebitda_pct: 30.2, roic_pct: 11.9, dn_ebitda: 2.28, fcf_yield_pct: 3.9 },
      { nombre: 'Descartes Systems', ticker: 'DSG', pais: 'CA', capitalizacion: 7082, ev_ventas: 8.58, ev_ebitda_ltm: 20.1, ev_ebitda_ntm: 17.1, per_ntm: 32.3, crecimiento_pct: 12.3, margen_ebitda_pct: 42.3, roic_pct: 10.2, dn_ebitda: -1.18, fcf_yield_pct: 4.3 },
      { nombre: 'Intuit', ticker: 'INTU', pais: 'US', capitalizacion: 81561, ev_ventas: 3.83, ev_ebitda_ltm: 11.7, ev_ebitda_ntm: 9.5, per_ntm: 14.5, crecimiento_pct: 9.2, margen_ebitda_pct: 32.7, roic_pct: 23.1, dn_ebitda: 0.1, fcf_yield_pct: 10.6 },
      { nombre: 'Salesforce', ticker: 'CRM', pais: 'US', capitalizacion: 181013, ev_ventas: 4.67, ev_ebitda_ltm: 17.2, ev_ebitda_ntm: 14.6, per_ntm: 25.2, crecimiento_pct: 10.3, margen_ebitda_pct: 27.1, roic_pct: 10.8, dn_ebitda: 2.4, fcf_yield_pct: 8.4 },
      { nombre: 'ServiceNow', ticker: 'NOW', pais: 'US', capitalizacion: 144847, ev_ventas: 9.89, ev_ebitda_ltm: 56.9, ev_ebitda_ntm: null, per_ntm: null, crecimiento_pct: 19.9, margen_ebitda_pct: 17.4, roic_pct: 45.2, dn_ebitda: 0.3, fcf_yield_pct: 3.2 },
    ],
    comentario: null,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2026-08', objetivo: 'Weave Communications (software vertical para clínicas)', comprador: 'Francisco Partners', ev: null, ev_ventas: 2.27, ev_ebitda: null, prima_pct: 34, excluir: false, comentario: 'Prima del 34 %; EV/ventas de 12 meses [7].' },
      { fecha: '2025-08', objetivo: 'MeridianLink (software vertical de préstamos)', comprador: 'Centerbridge Partners', ev: 1856, ev_ventas: null, ev_ebitda: 14.0, prima_pct: null, excluir: false, comentario: 'EV/EBITDA ajustado de 12 meses [6].' },
      { fecha: '2024-08', objetivo: 'NCR Digital Banking', comprador: 'Veritas Capital', ev: null, ev_ventas: null, ev_ebitda: 15.8, prima_pct: null, excluir: false, comentario: 'Centerview [6].' },
      { fecha: '2022-08', objetivo: 'Computer Services, Inc. (software para bancos)', comprador: 'Centerbridge Partners', ev: null, ev_ventas: null, ev_ebitda: 15.1, prima_pct: null, excluir: false, comentario: 'Centerview [6].' },
      { fecha: '2022-05', objetivo: 'Black Knight (software hipotecario)', comprador: 'Intercontinental Exchange', ev: null, ev_ventas: null, ev_ebitda: 21.4, prima_pct: null, excluir: false, comentario: 'Oferta inicial; Centerview [6].' },
      { fecha: '2021-12', objetivo: 'Bottomline Technologies (software de pagos)', comprador: 'Thoma Bravo', ev: null, ev_ventas: null, ev_ebitda: 26.6, prima_pct: null, excluir: false, comentario: 'Centerview [6].' },
      { fecha: '2021-04', objetivo: 'NIC Inc. (portales y pagos para administraciones)', comprador: 'Tyler Technologies', ev: 2090, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Pago neto de caja; sin múltiplo publicado en las fuentes leídas [15].' },
    ],
    comentario: null,
    confianza: 'Media',
  },
  fuentes: fD,
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Seeking Alpha: feed de artículos y noticias de TYL (may-oct 2026)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-14', url: 'https://seekingalpha.com/api/sa/combined/TYL.xml' },
  { id: 2, titulo: 'Stocktwits: flujo de mensajes de $TYL (jul-oct 2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-14', url: 'https://api.stocktwits.com/api/2/streams/symbol/TYL.json' },
  { id: 3, titulo: 'Tyler Technologies is down over 50% as investors flee software stocks (Motley Fool, reproducido en Webull)', editor: 'The Motley Fool / Webull', tipo: 'Foros y redes', fecha: '2026-07-05', url: 'https://www.webull.ca/news-detail/15174794020357120' },
  { id: 4, titulo: 'Tyler Technologies: AI Is Killing Software, But Not This One', editor: 'Seeking Alpha (autor externo)', tipo: 'Foros y redes', fecha: '2026-07-16', url: 'https://seekingalpha.com/article/4922660-tyler-technologies-ai-is-killing-software-but-not-this-one' },
  { id: 5, titulo: "Tyler Technologies: Not The Best Software Buy In Today's Market (Rating Downgrade)", editor: 'Seeking Alpha (autor externo)', tipo: 'Foros y redes', fecha: '2026-08-03', url: 'https://seekingalpha.com/article/4929441-tyler-technologies-stock-not-best-software-buy-now-rating-downgrade' },
  { id: 6, titulo: 'Should You Buy the 46% Dip In Tyler Technologies Stock Right Now?', editor: 'TIKR', tipo: 'Foros y redes', fecha: '2026', url: 'https://www.tikr.com/blog/down-46-from-all-time-highs-is-tyler-technologies-nyse-stock-a-good-buy-in-2026' },
];
const E = {
  _estado: 'Completo.',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Stocktwits ($TYL)', fecha: '2026-10', n_comentarios: 30, tono: 'Positivo', resumen: 'Mensajes mayoritariamente alcistas y técnicos («suelo», «hombro-cabeza-hombro invertido», prueba de la media de 200 sesiones); varios recién llegados ven a Tyler como «el software más seguro en la era de la IA» y comentan la subida de Wells Fargo [2].' },
      { plataforma: 'Seeking Alpha (artículos)', fecha: '2026-07', n_comentarios: 20, tono: 'Positivo', resumen: 'Un artículo de julio sostiene que la IA mata el software «pero no este»: costes de cambio, concursos y datos públicos protegen a Tyler [4].' },
      { plataforma: 'Seeking Alpha (artículos)', fecha: '2026-08', n_comentarios: 15, tono: 'Negativo', resumen: 'Rebaja de recomendación de un autor tras el 2T26: hay software más barato con más crecimiento; la valoración no compensa el frenazo del ARR [5].' },
      { plataforma: 'Motley Fool (artículo y comentarios)', fecha: '2026-07', n_comentarios: 10, tono: 'Dividido', resumen: 'Explica la caída del 51 % por el miedo a que los gobiernos creen herramientas propias con IA y lo ve exagerado por la lentitud de las compras públicas [3].' },
      { plataforma: 'TIKR (blog)', fecha: '2026-07', n_comentarios: 5, tono: 'Positivo', resumen: 'Ve la caída como oportunidad: PER adelantado cerca del mínimo de diez años y recompra del 6 % del capital [6].' },
    ],
    temas: [
      { tema: 'La IA se come el software para administraciones', postura: 'Dividida', peso: 'Alto', contraste: 'Las cifras no lo muestran: SaaS +21,7 % y reservas récord en el 2T26; el ARR frena al 8,2 %, pero por Texas y el mantenimiento, no por bajas. El riesgo es de múltiplo y a varios años.' },
      { tema: 'Recompra y convertibles', postura: 'Alcista', peso: 'Medio', contraste: 'Cierto: 5,6 % del capital recomprado en 2026, en parte con deuda al 0,5 %; la deuda neta sigue por debajo de una vez el EBITDA.' },
      { tema: 'Valoración frente a su historia', postura: 'Alcista', peso: 'Medio', contraste: 'El PER adelantado (~36x GAAP normalizado) está en la mitad de su mediana de cinco años (~80x), pero esa historia era de tipos bajos y euforia por el SaaS.' },
      { tema: 'Frenazo del crecimiento (ARR al 8 %)', postura: 'Bajista', peso: 'Medio', contraste: 'Cierto: el ARR crecía al 10,9 % en el 4T25; la guía de transacciones baja por Texas y el mantenimiento cae un 5-7 % al año.' },
    ],
    lectura: 'El sentimiento de los particulares mejora desde el mínimo de junio: los mensajes de octubre son sobre todo alcistas y técnicos, y la tesis dominante es que Tyler es «software a prueba de IA» por sus clientes públicos. Hay una minoría bajista que señala el frenazo del ARR y que hay software más barato. No hay euforia ni capitulación. Coincide con los analistas, que suben objetivos (Wells Fargo) y tienen el medio en 425 USD. El sentimiento no aporta riesgos que el informe no recoja; sí confirma que el debate es la IA, no las cifras.',
    confianza: 'Media',
  },
  fuentes: fE,
};
guarda('E', E);
console.log('Notas A-E escritas');
