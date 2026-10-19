// Notas A-E de Powell Industries, Inc. (Nasdaq: POWL). Corte 2026-10-19 (lunes; último cierre disponible, 16-oct).
// Cifras en millones de USD salvo que se diga otra cosa. US GAAP; ejercicio cerrado el 30 de septiembre («FY2025» = oct-24/sep-25).
// Split 3 × 1 el 2-abr-2026 (cotiza ajustado desde el 6-abr): BPA, DPA y acciones de FY2016-FY2025 se pasan a acciones de hoy.
// Ejecutar: node informes/powell-2026-10-19/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const lee = (f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
const X = lee('cuentas-xbrl.json');
const bolsa = lee('bolsa.json');
const mov = lee('movimiento.json').POWL;
const E8 = 'https://www.sec.gov/Archives/edgar/data/80420';
const r1 = (x) => Math.round(x * 10) / 10;
const r2 = (x) => Math.round(x * 100) / 100;
const r3 = (x) => Math.round(x * 1000) / 1000;
const SPLIT = 3;

// ================================================================ A. Cuentas
const fA = [
  { id: 1, titulo: 'Form 10-K del ejercicio 2025 (cerrado el 30-sep-2025): estados financieros, notas de ingresos por mercado y geografía, contratos, impuestos, crédito, avales y compra de Remsdaq', editor: 'Powell Industries, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2025-11-19', url: `${E8}/000008042025000152/powl-20250930.htm` },
  { id: 2, titulo: 'Form 10-K del ejercicio 2024: ingresos por mercado 2022-2024 y efectivo e inversiones a corto', editor: 'Powell Industries, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2024-11-20', url: `${E8}/000008042024000086/powl-20240930.htm` },
  { id: 3, titulo: 'Form 10-Q del 3T FY2026 (30-jun-2026): balance, flujos de nueve meses, cartera por mercado, avales y riesgos de centros de datos', editor: 'Powell Industries, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-08-04', url: `${E8}/000008042026000107/powl-20260630.htm` },
  { id: 4, titulo: 'Powell Industries Announces Third Quarter Fiscal 2026 Results (8-K, anexo 99.1)', editor: 'Powell Industries, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-08-03', url: `${E8}/000008042026000103/ex991-powlq3xfy2026earning.htm` },
  { id: 5, titulo: 'Powell Industries Announces Second Quarter Fiscal 2026 Results (8-K, anexo 99.1)', editor: 'Powell Industries, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-05-04', url: `${E8}/000008042026000063/ex991-powlq2xfy2026earning.htm` },
  { id: 6, titulo: 'Powell Industries Announces First Quarter Fiscal 2026 Results (8-K, anexo 99.1)', editor: 'Powell Industries, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-02-03', url: `${E8}/000008042026000013/ex991-powlq1xfy2026earning.htm` },
  { id: 7, titulo: 'Powell Industries Announces Fourth Quarter and Full Year Fiscal 2025 Results (8-K, anexo 99.1)', editor: 'Powell Industries, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2025-11-18', url: `${E8}/000008042025000145/ex991-powlq4xfy2025earning.htm` },
  { id: 8, titulo: 'Form 10-Q del 2T FY2026 (31-mar-2026)', editor: 'Powell Industries, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-05-05', url: `${E8}/000008042026000070/powl-20260331.htm` },
  { id: 9, titulo: 'Datos XBRL de las cuentas anuales FY2016-FY2025 (companyfacts: cuenta, balance, flujos, inversiones a corto, pagos en acciones, I+D)', editor: 'SEC EDGAR (XBRL)', tipo: 'Primaria', fecha: '2025-11-19', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0000080420.json' },
  { id: 10, titulo: 'Certificate of Amendment (8-K del 31-mar-2026): split 3 × 1 y ampliación del capital autorizado a 90 M de acciones', editor: 'Powell Industries, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-03-31', url: `${E8}/000008042026000054/ex31-certificateofamendmen.htm` },
  { id: 11, titulo: 'Powell Industries Declares Quarterly Cash Dividend (0,09 USD por acción, 3-ago-2026)', editor: 'Powell Industries, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-08-03', url: `${E8}/000008042026000103/ex992-powlq3xfy2026dividen.htm` },
  { id: 12, titulo: 'Form 10-Q del 1T FY2026 (31-dic-2025)', editor: 'Powell Industries, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-02-04', url: `${E8}/000008042026000015/powl-20251231.htm` },
];

// Inversiones a corto (XBRL ShortTermInvestments) que se suman a la caja: el 10-K da «efectivo e inversiones a corto» juntos.
const stInv = { FY2018: 13.2, FY2019: 6.0, FY2020: 18.7, FY2021: 19.7, FY2022: 14.6, FY2023: 33.1, FY2024: 43.1, FY2025: 24.8 };
const recompras = { FY2023: 0.65, FY2024: 6.6, FY2025: 12.25 }; // acciones retenidas para impuestos de empleados [1]
const cuenta = X.financieros.cuenta.map((c) => ({
  periodo: c.periodo, ingresos: c.ingresos, coste_ventas: c.coste_ventas, gastos_generales: c.gastos_generales, ebitda: c.ebitda, amortizaciones: c.amortizaciones,
  ebit: c.ebit, resultado_financiero: c.resultado_financiero, bai: c.bai, impuestos: c.impuestos, minoritarios: 0, beneficio_neto: c.beneficio_neto,
  gastos_financieros: c.gastos_financieros ?? 0, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null,
  bpa: r3(c.bpa / SPLIT), dpa: r3(c.dpa / SPLIT), dpa_extraordinario: 0, acciones_diluidas: r1(c.acciones_diluidas * SPLIT),
}));
const balance = X.balance.historico.map((b) => ({
  periodo: b.periodo, activo_total: b.activo_total, activo_corriente: b.activo_corriente, pasivo_corriente: b.pasivo_corriente, pasivo_total: b.pasivo_total,
  fondo_comercio: b.fondo_comercio ?? 0, intangibles: b.intangibles ?? 0, inmovilizado_material: b.inmovilizado_material, existencias: b.existencias, clientes: b.clientes,
  proveedores: b.proveedores, activos_contrato: b.activos_contrato, pasivos_contrato: b.pasivos_contrato, caja: r1(b.caja + (stInv[b.periodo] ?? 0)),
  deuda_financiera: b.deuda_financiera ?? 0, arrendamientos: 0, patrimonio_neto: b.patrimonio_neto, minoritarios: 0, reservas: b.reservas,
}));
const flujos = X.flujos.historico.map((f) => ({
  periodo: f.periodo, flujo_operativo: f.flujo_operativo, capex: f.capex, pagos_arrendamientos: 0, adquisiciones: f.adquisiciones ?? 0, desinversiones: f.desinversiones ?? 0,
  dividendos: f.dividendos, recompras: recompras[f.periodo] ?? f.recompras ?? 0, emision_acciones: 0, intereses_en_financiacion: 0,
}));

const seg = (nombre, descripcion, v) => ({ nombre, descripcion, tipo_resultado: null, historico: [['FY2022', v[0]], ['FY2023', v[1]], ['FY2024', v[2]], ['FY2025', v[3]]].map(([periodo, ingresos]) => ({ periodo, ingresos, resultado: null })) });
const segmentos = [
  seg('Petróleo y gas (sin petroquímica)', 'GNL, oleoductos, refino, producción en tierra y mar; salas eléctricas (PCR) y módulos para EPC del golfo de México', [215.2, 273.1, 417.2, 406.6]),
  seg('Servicios eléctricos (utilities)', 'Subestaciones de distribución y generación; aparamenta de media tensión y salas', [122.4, 158.4, 186.5, 279.0]),
  seg('Comercial y otros industriales', 'Centros de datos, minería, papel y otras industrias', [56.4, 104.0, 149.9, 178.2]),
  seg('Petroquímica', 'Polietileno, fertilizantes, metanol (gas como materia prima)', [66.5, 94.2, 185.6, 151.2]),
  seg('Tracción ferroviaria', 'Alimentación eléctrica de metro ligero y tranvía', [44.9, 28.1, 22.0, 41.3]),
  seg('Otros', 'Universidades, administraciones y otros mercados', [27.1, 41.5, 51.1, 48.1]),
];

const A = {
  _estado: 'completa',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 1157.5, ebitda: 236.2, ebit: 227.7, beneficio_neto: 190.9, bpa: 5.223, dpa: 0.358, dpa_extraordinario: 0, fcf: 244.0, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [],
    comentario: 'Powell pasó de 533 M USD de ventas en FY2022 a 1.104 M en FY2025 (+27 % anual) y a 1.157,5 M en los doce meses a junio de 2026, casi todo orgánico: la única compra, Remsdaq (agosto de 2025, 18,4 M USD), es menor [1, 3]. El salto de margen es lo que explica el valor: el margen bruto subió del 15,9 % en FY2022 al 29,4 % en FY2025 y al 30,6 % en el 3T FY26, y el EBITDA, del 3,1 % al 20,4 % [1, 4]. La empresa lo atribuye a precios estables y firmes, apalancamiento operativo y buena ejecución de proyectos; los materiales bajaron del 49 % de las ventas en FY2023 al 45 % en FY2025 [1]. La serie larga recuerda que es un negocio cíclico de proyectos: en FY2017-FY2018 perdió dinero con ventas de 396-449 M y en FY2021 ganó 0,6 M [9]. En FY2026 el crecimiento se frenó (+6,6 % en nueve meses) porque la petroquímica cayó un 39 % al terminar un gran pedido de FY2023, mientras centros de datos y utilities crecían un 28 % y un 21 % [3].',
    ajustes: 'Cifras publicadas (US GAAP), sin ajustes: Powell no presenta resultados ajustados. El EBITDA es el resultado de explotación más la amortización del estado de flujos (7,3 M en FY2025). El BPA, el DPA y las acciones de los años anteriores se dividen y multiplican por 3 por el split del 2-abr-2026 [10]. FY2022 lleva una devolución fiscal neta (impuesto de −3,9 M por la liberación de provisiones de activos fiscales) que infla el beneficio de ese año; el tipo normal es del 22-24 % [1, 9]. El 1T FY26 tuvo un tipo del 12 % por la deducción de las acciones de empleados que vencen en octubre, algo que se repite cada primer trimestre [6].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '4T FY24', ingresos: 275.1, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 57.9, margen_ebitda_pct: 21.0, bpa: 1.257, vs_consenso: null },
      { periodo: '1T FY25', ingresos: 241.4, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 37.3, margen_ebitda_pct: 15.5, bpa: 0.953, vs_consenso: null },
      { periodo: '2T FY25', ingresos: 278.6, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 60.6, margen_ebitda_pct: 21.8, bpa: 1.27, vs_consenso: null },
      { periodo: '3T FY25', ingresos: 286.3, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 61.9, margen_ebitda_pct: 21.6, bpa: 1.32, vs_consenso: null },
      { periodo: '4T FY25', ingresos: 298.0, crecimiento_pct: 8.3, crecimiento_organico_pct: null, ebitda: 65.3, margen_ebitda_pct: 21.9, bpa: 1.407, vs_consenso: null },
      { periodo: '1T FY26', ingresos: 251.2, crecimiento_pct: 4.0, crecimiento_organico_pct: null, ebitda: 44.9, margen_ebitda_pct: 17.9, bpa: 1.133, vs_consenso: null },
      { periodo: '2T FY26', ingresos: 296.6, crecimiento_pct: 6.5, crecimiento_organico_pct: null, ebitda: 59.8, margen_ebitda_pct: 20.2, bpa: 1.25, vs_consenso: 'Inferior' },
      { periodo: '3T FY26', ingresos: 311.7, crecimiento_pct: 8.9, crecimiento_organico_pct: null, ebitda: 66.2, margen_ebitda_pct: 21.2, bpa: 1.42, vs_consenso: 'Inferior' },
    ],
    ultima_presentacion: 'Las dos últimas presentaciones (4-may y 3-ago-2026) cambiaron el discurso de «ejecutar la cartera» a «añadir capacidad». En mayo, con ventas de 296,6 M (+6 %) y BPA de 1,25 USD (−1 %) por más gasto comercial e I+D, la dirección anunció después del trimestre el mayor pedido de su historia, más de 400 M USD para un centro de datos con generación propia «detrás del contador» [5]. En agosto los pedidos fueron récord (934 M, 3,0 veces las ventas) y la cartera llegó a 2.400 M (+69 %), de los que unos 1.300 M se facturarán en los próximos doce meses [3, 4]. El director financiero dijo que el margen bruto se mantendrá en el nivel de los últimos doce meses (≈ 29-30 %) mientras se añade capacidad: ampliación del patio de Jacintoport a fin de FY2026, naves alquiladas en Houston y Ohio y estudio de fábricas nuevas [4]. Los dos trimestres quedaron por debajo del BPA esperado (1,25 frente a 1,34 y 1,42 frente a 1,47, según la prensa financiera) y la dirección no cuantificó el margen de los pedidos de centros de datos, que el 10-Q describe como menos personalizados (menos ingeniería a medida) [3]. Tampoco dio cifra de inversión de las fábricas nuevas ni guía de ventas para FY2027.',
    confianza: 'Alta',
  },
  balance: {
    historico: balance,
    vencimientos: [],
    liquidez: 'Efectivo de 633,6 M USD a 30-jun-2026 (475,5 M de efectivo e inversiones a corto a 30-sep-2025) y sin deuda financiera; línea de crédito de 150 M con Bank of America y Texas Capital Bank, de la que se usan 77,5 M para cartas de crédito (72,5 M libres a sep-25) [1, 3].',
    rating: 'Sin rating',
    coste_deuda_pct: null,
    vida_media_anios: null,
    otros_pasivos: 'Sin deuda, pero con compromisos de proyecto: cartas de crédito y garantías bancarias por 103,9 M y fianzas de cumplimiento (surety bonds) por 492,4 M a 30-jun-2026, que crecen con la cartera (81,4 M y 417,3 M a sep-25) [1, 3]. No ha habido ejecuciones relevantes. La línea de crédito exige deuda neta/EBITDA < 3 y cobertura de intereses > 3, holgadas con caja neta [1]. Compensación diferida de directivos de 16,9 M y garantías de producto de 6,6 M [3]. Los pasivos por contrato (anticipos y facturación por delante de la obra) suben de 297,9 M a 466,4 M en nueve meses por los cobros iniciales de los pedidos grandes: no son deuda, se compensan con la entrega, pero la caja de junio incluye esos anticipos [3]. Arrendamientos operativos de 2,5 M (US GAAP, ya en el EBITDA; no se suman a la deuda).',
    comentario: 'El circulante comercial con contratos (clientes + existencias + activos por contrato − proveedores − pasivos por contrato) fue de 73,5 M a sep-25 (6,7 % de las ventas) y bajó a 20,8 M a jun-26 (1,8 % de las ventas de doce meses) porque los anticipos crecieron más que la obra [1, 3]. Es el patrón de un contratista que factura por hitos al principio: la caja sube cuando entran pedidos y baja cuando se ejecutan. Con 2.400 M de cartera, parte de los 633,6 M de caja se consumirá al fabricar; el informe no trata esa caja como libre y lo recoge en el circulante proyectado (2 % en FY2026e, 6 % desde FY2029e).',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'La caja sigue a los pedidos más que al beneficio: flujo operativo de 182,6 M en FY2023 (3,3 veces el beneficio, por anticipos), 108,7 M en FY2024 (0,73 veces, al consumirse) y 167,9 M en FY2025 (0,93 veces) [1]. En los nueve meses a jun-26, 195,0 M, ayudado por 188,8 M de anticipos netos [3]. El capex ha sido mínimo (13,1 M en FY2025, 1,2 % de las ventas, menos que la amortización hasta FY2022) y la empresa casi no ha invertido en capacidad en una década [9]. Eso cambia: Jacintoport (12,4 M), naves alquiladas y una posible fábrica nueva [1, 4]; el informe sube el capex al 4 % de las ventas en FY2027e-FY2028e (estimación propia, ≈ 58-66 M al año). El dividendo (12,9 M) y las acciones retenidas para impuestos de empleados (12,2 M) son los únicos usos recurrentes [1].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'PricewaterhouseCoopers LLP', anios_auditor: 22, opinion: 'Favorable (sin salvedades) en FY2025, también sobre el control interno',
    comentario: 'PwC audita desde 2004 [1]. La contabilidad es de grado de avance (porcentaje de obra) en contratos a precio cerrado: el margen depende de estimaciones de coste, órdenes de cambio, reclamaciones y penalizaciones, y la propia empresa avisa de que su resolución puede mejorar o empeorar el margen del trimestre en que se cierran [1, 3]. No hay capitalización de I+D (11,0 M a gastos en FY2025) ni ajustes al beneficio; los pagos en acciones son pequeños (4,6 M, 2,6 % del beneficio) [9]. El salto del margen de FY2023-FY2025 coincide con mejores precios y menos materiales sobre ventas (49 % a 45 %), no con cambios de criterio [1]. Los indicadores del motor deben leerse con el ciclo: el Beneish puede marcar por el crecimiento de clientes y la caída de margen bruto de años previos, y el Altman sale muy alto por la caja y la ausencia de deuda. La subida de clientes de 217 M a 362 M en nueve meses (+67 %, con ventas +7 %) merece seguimiento: corresponde a facturación de hitos de pedidos grandes, con su contrapartida en anticipos [3].',
    senales: [
      { senal: 'Clientes +67 % en nueve meses (217 M a 362 M) con ventas +7 %', nivel: 'Media', comentario: 'Facturas de hitos iniciales de pedidos grandes (los pasivos por contrato suben 168 M a la vez); vigilar el cobro en el 4T [3].' },
      { senal: 'Margen de proyecto sensible a estimaciones (grado de avance)', nivel: 'Media', comentario: 'Órdenes de cambio, reclamaciones y penalizaciones pueden mover el margen; la propia empresa lo advierte [1, 3].' },
      { senal: 'Beneficio de FY2022 con impuesto negativo (−3,9 M)', nivel: 'Baja', comentario: 'Liberación de provisión de activos fiscales; no recurrente [9].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Dividendo trimestral de 0,09 USD por acción tras el split (0,2675 antes del split; 0,36 USD al año, menos del 7 % del beneficio), sin programa de recompra activo; solo retiene acciones de empleados para pagar sus impuestos (12,2 M en FY2025 y 14,7 M en nueve meses de FY2026) [1, 3, 11]. Las prioridades declaradas son el circulante de los proyectos, la I+D, el capex de capacidad y las compras selectivas, y luego la remuneración al accionista [3]. La caja (633,6 M, un 10 % de la capitalización) se ha acumulado sin destino: el dividendo es el mismo en dólares que hace diez años [9].',
    adquisiciones: [
      { anio: '2025', objetivo: 'Remsdaq Limited (Reino Unido; unidades remotas SCADA para subestaciones)', importe: 18.4, ev_ebitda: null, financiacion: 'Caja', resultado: 'Pequeña (13,6 M GBP); fondo de comercio de 5,1 M y tecnología de 3,5 M; demasiado reciente para juzgar [1].' },
    ],
    comentario: 'La dirección ha sido prudente con el capital, quizá demasiado: casi sin inversión en capacidad durante una década (capex inferior a la amortización hasta FY2022), sin compras grandes y con la caja acumulándose [1, 9]. Esa prudencia evitó destruir valor en la mala época (FY2016-FY2021) y explica que el ROIC suba al ampliarse el margen sin capital nuevo. La prueba viene ahora: con 2.400 M de cartera, Powell tiene que decidir cuánta capacidad añadir (Jacintoport, naves alquiladas, fábrica nueva) sin sobredimensionarse para un ciclo de centros de datos que puede no durar [4]. El dividendo plano y la ausencia de recompras con la acción a 24 veces beneficios son coherentes; con la caja creciendo, una recompra o un dividendo extraordinario serían las alternativas si no se invierte.',
    confianza: 'Alta',
  },
  negocio: {
    segmentos,
    geografias: [
      { nombre: 'Estados Unidos', peso_pct: 79.7 },
      { nombre: 'Canadá', peso_pct: 14.2 },
      { nombre: 'Oriente Medio y África', peso_pct: 2.5 },
      { nombre: 'Europa', peso_pct: 2.3 },
      { nombre: 'Asia-Pacífico', peso_pct: 0.8 },
      { nombre: 'México, Centroamérica y Sudamérica', peso_pct: 0.5 },
    ],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Cartera de pedidos', valor_anterior: '1.400 M USD (sep-25)', valor_actual: '2.400 M USD (jun-26)', variacion: '+73 % en nueve meses', comentario: '≈ 1.300 M se facturarán en doce meses; centros de datos y comercial, el 40 % [3].' },
      { kpi: 'Pedidos (bookings)', valor_anterior: '1.200 M (FY2025)', valor_actual: '1.900 M (9M FY26)', variacion: '+158 % en el 3T', comentario: '934 M en el 3T, con tres mega pedidos (> 50 M): centro de datos > 400 M, petroquímica ≈ 75 M, GNL ≈ 60 M [3, 4].' },
      { kpi: 'Pedidos de centros de datos', valor_anterior: '—', valor_actual: '≈ 800 M (9M FY26)', variacion: '—', comentario: 'Tres mega pedidos en el año; menos ingeniería a medida que el resto de la cartera [3].' },
      { kpi: 'Margen bruto', valor_anterior: '29,4 % (FY2025)', valor_actual: '30,6 % (3T FY26)', variacion: '+1,2 puntos', comentario: '15,9 % en FY2022; precios estables y apalancamiento operativo [1, 4].' },
      { kpi: 'Relación pedidos/ventas (3T)', valor_anterior: '1,3 veces (3T FY25)', valor_actual: '3,0 veces (3T FY26)', variacion: '—', comentario: '362 M de pedidos en el 3T FY25 frente a 934 M [4].' },
      { kpi: 'Empleados', valor_anterior: '—', valor_actual: '3.143 fijos + 315 temporales (sep-25)', variacion: '—', comentario: 'EE. UU., Canadá y Reino Unido; sin sindicatos [1].' },
    ],
    confianza: 'Alta',
  },
  fuentes: fA,
  huecos: [
    { seccion: 'trimestres', campo: 'crecimiento_pct de 4T FY24 a 3T FY25', tipo: 'Complemento', intentos: '1) Notas de resultados de FY2025: solo dan el trimestre comparable en importes de FY2026; 2) 10-Q de FY2025 no descargados; 3) XBRL trimestral: sin el año anterior a FY2024 a mano', decision: 'Omitido' },
    { seccion: 'trimestres', campo: 'vs_consenso de 4T FY24 a 1T FY26', tipo: 'Complemento', intentos: '1) Notas de resultados: sin consenso; 2) Seeking Alpha: titulares solo de 2T y 3T FY26; 3) MarketScreener: sin histórico de sorpresas', decision: 'Omitido' },
    { seccion: 'balance', campo: 'vencimientos', tipo: 'Complemento', intentos: '1) 10-K FY2025, nota de deuda: sin deuda; 2) 10-Q 3T26: sin deuda; 3) no aplica', decision: 'Omitido' },
  ],
};
guarda('A', A);

// ================================================================ B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Form 10-K FY2025, «Business»: productos, mercados, competencia (ABB, Eaton, Schneider, Siemens), materias primas y cartera', editor: 'Powell Industries, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2025-11-19', url: `${E8}/000008042025000152/powl-20250930.htm` },
  { id: 2, titulo: 'Medium Voltage Switchgear Market Size & Share 2026-2035: 17.800 M USD en 2025, 19.660 M en 2026, 40.250 M en 2035 (8,3 % anual); Norteamérica 3.920 M en 2025; cinco primeros, 55 %', editor: 'Global Market Insights', tipo: 'Sectorial', fecha: '2026-09', url: 'https://www.gminsights.com/industry-analysis/medium-voltage-switchgear-market' },
  { id: 3, titulo: 'E-House Market Size and Share: 1.700 M USD en 2025, 1.800 M en 2026, 2.400 M en 2031 (5,86 % anual); concentración media', editor: 'Mordor Intelligence', tipo: 'Sectorial', fecha: '2026', url: 'https://www.mordorintelligence.com/industry-reports/e-house-market' },
  { id: 4, titulo: 'Ventas y EBIT de los últimos doce meses de Eaton, Schneider Electric, ABB, Vertiv, Hubbell y nVent (ficha de Yahoo Finance)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com' },
  { id: 5, titulo: 'Form 10-Q del 3T FY2026: mercados, pedidos de centros de datos (≈ 800 M en nueve meses), utilities (313 M) y riesgos del mercado de centros de datos', editor: 'Powell Industries, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-08-04', url: `${E8}/000008042026000107/powl-20260630.htm` },
  { id: 6, titulo: 'Why Vertiv Holdings Plunged in July (Burry, Kimi 3 y Situational Awareness hunden los valores de IA)', editor: 'The Motley Fool', tipo: 'Prensa', fecha: '2026-08-11', url: 'https://www.fool.com/investing/2026/08/11/why-vertiv-holdings-plunged-in-july/' },
  { id: 7, titulo: 'Form 10-K FY2024: historia del ciclo y estrategia de diversificación', editor: 'Powell Industries, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2024-11-20', url: `${E8}/000008042024000086/powl-20240930.htm` },
];
const B = {
  _estado: 'completa',
  negocio: {
    descripcion: 'Powell Industries diseña, fabrica y mantiene equipos a medida para distribuir, controlar y proteger la energía eléctrica entre 480 y 38.000 voltios: salas de control eléctrico prefabricadas (PCR, E-houses), módulos, aparamenta de media tensión convencional y resistente al arco, interruptores de vacío, centros de control de motores y conductos de barras [1]. Cada pedido se diseña para un proyecto: un PCR para una planta de GNL, la subestación de una utility o la sala eléctrica de un centro de datos. Vende directamente al propietario o a la ingeniería (EPC) que construye la planta, casi siempre por concurso [1]. Tiene fábricas propias en Houston (incluido el patio de Jacintoport, con muelle para enviar salas de cientos de toneladas por barco), Ohio, Canadá (Acheson, Alberta) y Reino Unido; el 80 % de las ventas es en EE. UU. y el 14 % en Canadá [1]. Servicio técnico, repuestos y modernización de equipos antiguos completan la oferta.',
    como_gana_dinero: 'Gana con proyectos de ingeniería a precio cerrado que se reconocen por grado de avance: el margen depende de lo bien que presupuesta y ejecuta, del precio que logra en el concurso y del coste del cobre, acero y aluminio (45 % de las ventas en FY2025) [1]. El negocio tiene mucho apalancamiento operativo: con ventas de 400-500 M (FY2017-FY2021) el margen EBITDA fue del 0-6 %; con 1.100 M, del 20 % [9 de A; 1]. Los gastos generales apenas crecen (95 M en FY2025, 8,6 % de las ventas). Lo recurrente es poco (servicio y repuestos); el resto depende de que entren pedidos, por lo que la cartera (2.400 M, más de dos años de ventas) es el mejor indicador adelantado [5]. Cobra anticipos y factura por hitos al principio, lo que financia el circulante cuando entran pedidos [1].',
    clientes: 'La concentración por proyecto es alta: un pedido grande puede pesar mucho en un trimestre o en una fábrica, y la empresa avisa de que la pérdida de un cliente grande o la caída de un sector la afectaría [1]. No publica el peso del primer cliente (ninguno supera el 10 % de las ventas consolidadas en FY2025, según la ausencia de nota en el 10-K). En FY2026 el riesgo cambió de forma: unos 800 M de los 1.900 M de pedidos de nueve meses son de centros de datos, con tres mega pedidos, uno de más de 400 M [5]. El poder de precios se ve en el margen: el margen bruto pasó del 15,9 % al 29,4 % entre FY2022 y FY2025 con materiales que bajaron del 49 % al 45 % de las ventas, en un «entorno de precios estable y firme» [1].',
    confianza: 'Alta',
  },
  sector: {
    definicion: 'El mercado relevante es el de aparamenta de media tensión y salas eléctricas a medida para clientes industriales, utilities y centros de datos en Norteamérica. No hay una estadística oficial de ese perímetro; se usan dos estudios privados como referencia. Global Market Insights estima la aparamenta de media tensión mundial en 17.800 M USD en 2025 y la de Norteamérica en 3.920 M, con crecimiento del 8,3 % anual hasta 2035 [2]. Mordor Intelligence estima las salas eléctricas prefabricadas (E-house) en 1.700 M en 2025, con un 5,9 % anual [3]. Ninguno coincide con lo que vende Powell (salas completas con aparamenta, control y servicio), así que la cuota se da como aproximación.',
    tamano: '≈ 17.800 M USD en 2025 (aparamenta de media tensión mundial; Norteamérica 3.920 M) [2]; E-houses ≈ 1.700 M [3]',
    unidad_serie: 'millones de USD (aparamenta de media tensión, mundo)',
    serie: [{ anio: '2025', tamano: 17800 }, { anio: '2026e', tamano: 19660 }, { anio: '2035e', tamano: 40250 }],
    tcac_historico_pct: null,
    tcac_previsto_pct: 8.3,
    cr5_pct: 55,
    estructura: 'Moderadamente concentrada',
    drivers: [
      { driver: 'Centros de datos e IA', efecto: '+', horizonte: 'Cíclico', evidencia: '≈ 800 M de pedidos de centros de datos en nueve meses de FY2026, frente a 178 M de ventas de todo el mercado comercial en FY2025 [5].' },
      { driver: 'GNL y petroquímica en la costa del golfo', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Petróleo y gas, el 37 % de las ventas de FY2025; la petroquímica cayó un 39 % en nueve meses de FY2026 al acabar un gran pedido [1, 5].' },
      { driver: 'Red eléctrica y generación', efecto: '+', horizonte: 'Estructural', evidencia: 'Ventas a utilities +50 % en FY2025 (279 M) y 313 M de pedidos en nueve meses de FY2026 [1, 5].' },
      { driver: 'Cobre, acero y aluminio', efecto: '−', horizonte: 'Cíclico', evidencia: 'Materiales, el 45 % de las ventas; los contratos a precio cerrado limitan el traslado de subidas [1].' },
      { driver: 'Aranceles y cadena de suministro', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Componentes con un solo proveedor y plazos largos; los aranceles encarecen la importación y favorecen la fabricación local [1].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Pocos rivales grandes (ABB, Eaton, Schneider, Siemens) y regionales pequeños; hoy la falta de capacidad modera los precios a la baja [1, 2].' },
      { fuerza: 'Poder de los clientes', intensidad: 4, justificacion: 'Grandes EPC, petroleras, utilities e hiperescaladores compran por concurso proyectos únicos y exigen avales y penalizaciones [1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 3, justificacion: 'Algunos componentes vienen de un solo proveedor; cobre y acero son materias primas con precio de mercado [1].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Hacen falta décadas de referencias, certificaciones ANSI/IEC, ingeniería y patios con muelle para salas de cientos de toneladas [1].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 2, justificacion: 'No hay sustituto para distribuir la energía; sí cambia el formato (más estándar en centros de datos) [5].' },
    ],
    ciclo: { posicion: 'Expansión', comentario: 'Pedidos récord (934 M en el 3T FY26) y cartera de 2.400 M indican un ciclo en expansión, impulsado ahora por centros de datos tras el de GNL de 2022-2024 [4 de A; 5]. El sector es muy cíclico: Powell perdió dinero en FY2017-FY2018 tras la caída del petróleo de 2014-2016, apenas ganó en FY2020-FY2021 (pandemia) y multiplicó el beneficio por trece entre FY2022 y FY2025 [9 de A]. La bolsa ya descuenta un posible fin del ciclo de inversión en IA: los valores de energía para centros de datos cayeron un 45-64 % desde mayo (Vertiv, Primoris) [6].' },
    regulacion: 'No hay regulación que fije precios o márgenes. Afectan las normas técnicas (ANSI e IEC, seguridad frente al arco), el control de exportaciones y sanciones, y la política comercial: los aranceles de 2025-2026 sobre acero, aluminio y componentes encarecen la producción, aunque protegen a los fabricantes locales [1]. La ley fiscal OBBBA (julio de 2025) prorroga incentivos de 2017 y recorta otros de la ley de reducción de la inflación, con efecto aún en estudio por la empresa [1]. Para los centros de datos pesan los permisos de conexión a la red y de generación propia, que retrasan o adelantan proyectos [5].',
    tendencias: 'Tres tendencias favorecen a Powell: la electrificación de la industria y la red, los centros de datos que se construyen con generación propia «detrás del contador» (el pedido de más de 400 M es de ese tipo) y la relocalización industrial en EE. UU. [4 de A; 5]. Dos la amenazan: la estandarización de los equipos de centros de datos, que da ventaja a fabricantes de gran serie como Eaton, Schneider o Vertiv y reduce el valor de la ingeniería a medida, y la competencia de nuevos fabricantes de salas modulares (Eaton compró Fibrebond en 2025) [5]. La empresa reconoce en el 10-Q que los proyectos de centros de datos llevan menos ingeniería a medida y pueden cambiar la mezcla de márgenes [5].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 26.5,
    posicion: 'Fabricante independiente de referencia en salas eléctricas (PCR) y aparamenta a medida para petróleo, gas y petroquímica en Norteamérica; frente a la aparamenta de media tensión de Norteamérica (3.920 M en 2025, GMI) sus ventas en EE. UU. y Canadá (1.037 M) equivalen a un 26,5 %, cota alta porque Powell vende también salas, control y servicio (estimación propia) [1, 2].',
    competidores: [
      { nombre: 'Eaton', pais: 'IE/US', ticker: 'ETN', ingresos: 30026, cuota_pct: 6, margen_ebit_pct: 17.5, comentario: 'Gama completa de distribución eléctrica; compró Fibrebond (salas modulares para centros de datos) en 2025 [2, 4].' },
      { nombre: 'Schneider Electric', pais: 'FR', ticker: 'SU.PA', ingresos: 47132, cuota_pct: 16, margen_ebit_pct: 16.9, comentario: 'Líder mundial en media tensión (16 %); fuerte en centros de datos [2, 4].' },
      { nombre: 'ABB', pais: 'CH', ticker: 'ABBN.SW', ingresos: 35752, cuota_pct: 13, margen_ebit_pct: 18.8, comentario: 'Electrificación y E-houses; 13 % con Hitachi Energy en media tensión [2, 4].' },
      { nombre: 'Siemens', pais: 'DE', ticker: 'SIE.DE', ingresos: null, cuota_pct: 15, margen_ebit_pct: null, comentario: 'Infraestructura inteligente; 15 % de la media tensión mundial [2].' },
      { nombre: 'Vertiv', pais: 'US', ticker: 'VRT', ingresos: 11480, cuota_pct: null, margen_ebit_pct: 18.9, comentario: 'Energía y refrigeración para centros de datos; salas prefabricadas [4].' },
      { nombre: 'Hubbell', pais: 'US', ticker: 'HUBB', ingresos: 6224, cuota_pct: null, margen_ebit_pct: 19.8, comentario: 'Componentes para utilities y redes; menos proyectos a medida [4].' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'Cada proyecto se vende por separado; no hay efecto de red.' },
        { fuente: 'Costes de cambio', puntuacion: 2, evidencia: 'Servicio y repuestos de la base instalada y relación con EPC repetidos; pero cada proyecto nuevo sale a concurso [1].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 2, evidencia: 'Reputación de ejecución y seguridad en GNL y petroquímica; experiencia reconocida en interruptores de vacío; pocas patentes relevantes [1].' },
        { fuente: 'Ventaja en costes', puntuacion: 1, evidencia: 'Margen EBIT del 19,7 % en los últimos doce meses, similar a Eaton (17,5 %) o ABB (18,8 %); en FY2017-FY2021 fue del −5 % al 4 % [4; 9 de A].' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'Patios con muelle en Houston (Jacintoport) para salas de cientos de toneladas y décadas de referencias en la costa del golfo: pocos pueden competir en esos proyectos [1].' },
      ],
    },
    amenazas: 'La amenaza principal es cíclica, no competitiva: si se frenan a la vez la inversión en centros de datos y el GNL, los márgenes del 20 % pueden volver a los del 3-6 % de FY2019-FY2022, como ya pasó tras 2014 [9 de A]. En centros de datos compite con fabricantes de gran serie (Eaton con Fibrebond, Schneider, Vertiv) que pueden ofrecer equipos más estándar y más baratos; probabilidad media [4, 5]. La tercera es de ejecución: añadir capacidad (naves alquiladas, fábrica nueva) en pleno ciclo con riesgo de sobrecostes y penalizaciones en pedidos grandes a precio cerrado [5].',
    confianza: 'Media',
  },
  historia: {
    resumen: 'William E. Powell fundó la empresa en Houston en 1947 para fabricar equipos eléctricos para la industria petrolera y petroquímica de la costa del golfo; la familia Powell sigue siendo la primera accionista (Thomas W. Powell, ≈ 18 %) [1]. Creció con los ciclos de la energía: compró negocios en Reino Unido y Canadá (Acheson, Alberta) para las arenas bituminosas, sufrió la caída del petróleo de 2014-2016 con pérdidas en FY2017-FY2018 y un margen casi nulo hasta FY2022 [7]. Desde 2016 la dirige Brett A. Cope, que diversificó hacia utilities, comercial y centros de datos. El ciclo de GNL de 2022-2024 y el de centros de datos de 2025-2026 llevaron las ventas a más de 1.100 M y el margen EBITDA al 20 %; en abril de 2026 hizo un split 3 × 1 [1, 5].',
    hitos: [
      { anio: '1947', hito: 'William E. Powell funda la empresa en Houston.' },
      { anio: '2014', hito: 'Pico del ciclo petrolero; después, caída de pedidos y ventas.' },
      { anio: '2016', hito: 'Brett A. Cope, consejero delegado; la empresa entra en pérdidas (FY2017-FY2018).' },
      { anio: '2019', hito: 'Cope pasa a presidir también el consejo.' },
      { anio: '2023', hito: 'Gran pedido petroquímico y auge del GNL: el beneficio pasa de 13,7 M a 54,5 M.' },
      { anio: '2025', hito: 'Ventas de 1.104 M y beneficio de 180,7 M; compra de Remsdaq (Reino Unido).' },
      { anio: '2026', hito: 'Split 3 × 1 (abril), mega pedido de centro de datos de más de 400 M y cartera récord de 2.400 M (junio).' },
    ],
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Lo material para las cifras es la seguridad laboral en fábricas y patios donde se montan salas de cientos de toneladas (la empresa la incluye en el variable de los directivos) [1]. Segundo, la exposición a petróleo, gas y petroquímica (51 % de las ventas de FY2025), que algunos inversores excluyen, compensada por las ventas a la red eléctrica y la electrificación [1]. Tercero, el cumplimiento en exportaciones y sanciones en proyectos internacionales [1].',
    controversias: 'No se han encontrado sanciones, litigios relevantes ni incidentes graves en los últimos tres años en el 10-K de FY2025 ni en los 10-Q de FY2026: la empresa declara procedimientos ordinarios sin efecto material esperado [1, 5].',
    confianza: 'Baja',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) 10-K y proxy: sin calificaciones externas; 2) web de la empresa: sin informe de sostenibilidad con calificaciones; 3) búsqueda de MSCI y Sustainalytics: sin dato público', decision: 'Omitido' },
    { seccion: 'sector', campo: 'serie y tcac_historico_pct', tipo: 'Complemento', intentos: '1) GMI: solo 2025, 2026 y 2035; 2) Mordor: 2025, 2026 y 2031 de otro perímetro; 3) NEMA y estadística oficial: sin serie del perímetro', decision: 'Omitido' },
  ],
};
guarda('B', B);

// ================================================================ C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Proxy statement (DEF 14A) para la junta de 2026: consejo, comisiones, accionistas, remuneración de FY2025 y ratio de pago', editor: 'Powell Industries, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-01-06', url: `${E8}/000114036126000342/ny20060559x1_def14a.htm` },
  { id: 2, titulo: '8-K del 18-feb-2026: resultados de la junta (votos de consejeros y say-on-pay) y nueva presidencia de la comisión de auditoría', editor: 'Powell Industries, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-02-18', url: `${E8}/000008042026000028/powl-20260218.htm` },
  { id: 3, titulo: '8-K del 6-jul-2026: concesión especial de 36.000 RSU a Brett A. Cope para retenerlo más allá de los 60 años', editor: 'Powell Industries, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-07-06', url: `${E8}/000008042026000095/powl-20260701.htm` },
  { id: 4, titulo: '8-K del 6-ene-2026: nuevo variable a largo plazo de Cope (2,2 M USD) y Metcalf (0,6 M), con crecimiento de ventas a tres años', editor: 'Powell Industries, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-01-06', url: `${E8}/000008042026000009/powl-20260102.htm` },
  { id: 5, titulo: 'Form 4 de directivos, consejeros y accionistas de POWL presentados entre el 19-oct-2025 y el 19-oct-2026 (53 presentaciones)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-19', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000080420&type=4' },
  { id: 6, titulo: 'Form 10-K FY2025: auditor, procedimientos legales y directivos', editor: 'Powell Industries, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2025-11-19', url: `${E8}/000008042025000152/powl-20250930.htm` },
];
const C = {
  _estado: 'completa',
  directivos: {
    equipo: [
      { nombre: 'Brett A. Cope', cargo: 'Presidente del consejo, presidente y consejero delegado', desde: '2016', participacion_pct: 1.35, trayectoria: 'Entró en 2011 como vicepresidente de ventas, director de operaciones en 2015, consejero delegado desde octubre de 2016 y presidente del consejo desde 2019 [1]. Tomó la empresa en pérdidas y la llevó a 1.104 M de ventas y 180,7 M de beneficio en FY2025, con la diversificación hacia utilities y centros de datos [1, 6].' },
      { nombre: 'Michael W. Metcalf', cargo: 'Vicepresidente ejecutivo y director financiero', desde: '2018', participacion_pct: null, trayectoria: 'Director financiero desde 2018 (58 años); firma las cuentas y lleva la relación con inversores [1].' },
      { nombre: 'Terry B. McKertcher', cargo: 'Vicepresidente de operaciones', desde: null, participacion_pct: null, trayectoria: 'Responsable de fábricas y ejecución de proyectos (Form 4) [5].' },
      { nombre: 'William Marshall Mauney Jr.', cargo: 'Vicepresidente de I+D', desde: null, participacion_pct: null, trayectoria: 'Dirige la I+D (11,0 M USD en FY2025, el doble que en FY2023) (Form 4) [5].' },
      { nombre: 'Davide Tuninetti', cargo: 'Vicepresidente y director de recursos humanos', desde: '2025', participacion_pct: null, trayectoria: 'Incorporado en 2025 (50 años) [1].' },
    ],
    historial_guidance: [],
    comentario: 'Equipo estable: Cope lleva diez años de consejero delegado y Metcalf ocho de director financiero [1]. La credibilidad es buena en ejecución (márgenes al alza cinco años seguidos) y peor en la comunicación de cifras: la empresa no da guía numérica y los dos últimos trimestres quedaron por debajo de lo esperado. El riesgo de sucesión es real y explícito: Cope cumple 60 años, edad a la que podría jubilarse con todas sus acciones consolidadas, y el consejo le dio en julio de 2026 36.000 RSU que solo se consolidan si sigue hasta 2027-2029 [3]. No hay plan de sucesión publicado ni un número dos designado.',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Brett A. Cope', cargo: 'Presidente del consejo y consejero delegado', tipo: 'Ejecutivo', desde: '2016', comisiones: '—' },
      { nombre: 'John G. Stacey', cargo: 'Consejero independiente coordinador (Presiding Director)', tipo: 'Independiente', desde: '2022', comisiones: 'Retribuciones' },
      { nombre: 'James W. McGill', cargo: 'Consejero', tipo: 'Independiente', desde: '2018', comisiones: 'Retribuciones (presidente), auditoría' },
      { nombre: 'Mark W. Smith', cargo: 'Consejero', tipo: 'Independiente', desde: '2025', comisiones: 'Auditoría (presidente desde feb-2026)' },
      { nombre: 'Richard E. Williams', cargo: 'Consejero', tipo: 'Independiente', desde: '2016', comisiones: 'Nombramientos y gobierno (presidente), auditoría' },
      { nombre: 'Katheryn B. Curtis', cargo: 'Consejera', tipo: 'Independiente', desde: '2020', comisiones: 'Retribuciones, nombramientos' },
      { nombre: 'Alaina K. Brooks', cargo: 'Consejera', tipo: 'Independiente', desde: '2023', comisiones: 'Auditoría, nombramientos' },
      { nombre: 'Mohit Singh', cargo: 'Consejero', tipo: 'Independiente', desde: '2024', comisiones: 'Auditoría, retribuciones' },
    ],
    presidente_ceo_separados: false, presidente_ejecutivo: true, consejero_coordinador: true, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: false, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 98.4, voto_remuneracion_contra_pct: 1.3, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: 'FY2025', total: 3.6, fijo: 0.66, variable_corto: 1.65, variable_largo: 1.13, ratio_salario_medio: 71 },
    remuneracion: 'Cope cobró 3,60 M USD en FY2025: 0,66 M de fijo, 1,65 M de variable anual (el 250 % del fijo) y 1,13 M en acciones [1]. El ratio con el empleado mediano (50.876 USD) es de 70,8 veces [1]. El variable a largo plazo se reparte entre acciones por tiempo y por objetivos de EBITDA acumulado y seguridad; desde FY2026 se añade el crecimiento de ventas a tres años y el objetivo sube a 2,2 M USD (60 % por objetivos) [4]. Ninguna métrica mide el rendimiento del capital ni el retorno al accionista, y el crecimiento de ventas puede premiar crecer a cualquier precio. Hay política de recuperación (clawback) y se prohíben las coberturas [1]. En julio de 2026 se le concedieron 36.000 RSU extra para retenerlo [3]. El say-on-pay de 2026 obtuvo un 98,4 % a favor [2].',
    accionistas: [
      { nombre: 'Thomas W. Powell (familia fundadora; directo y TWP Holdings)', pct: 18.3, tipo: 'Familia fundadora', variacion: '19,1 % en dic-2025; ha vendido ≈ 264.000 acciones de hoy (51 M USD) en feb, mar y jun-2026 (estimación propia del porcentaje) [1, 5].' },
      { nombre: 'BlackRock', pct: 11.4, tipo: 'Gestora', variacion: 'Dato a 30-sep-2025 [1].' },
      { nombre: 'First Trust Advisors', pct: 5.9, tipo: 'Gestora', variacion: 'Dato a 30-sep-2025 [1].' },
      { nombre: 'Vanguard Group', pct: 5.8, tipo: 'Gestora', variacion: 'Dato a 30-sep-2025 [1].' },
      { nombre: 'Consejeros y directivos (11 personas)', pct: 2.2, tipo: 'Directivos', variacion: 'Ventas netas en 12 meses [1, 5].' },
      { nombre: 'Autocartera', pct: 6.2, tipo: 'Autocartera', variacion: '2.418.054 acciones (6,2 % de las emitidas) [3 de A].' },
    ],
    insiders: [
      { fecha: '2026-02-13', persona: 'Thomas W. Powell (accionista > 10 %), ventas del 11 al 25-feb (26.793 acciones antes del split)', operacion: 'Venta', acciones: 80379, importe: 15.96 },
      { fecha: '2026-03-19', persona: 'Thomas W. Powell (49.778 acciones antes del split a 502,23 USD)', operacion: 'Venta', acciones: 149334, importe: 25.0 },
      { fecha: '2026-06-25', persona: 'Thomas W. Powell (a 294,49 USD)', operacion: 'Venta', acciones: 33958, importe: 10.0 },
      { fecha: '2026-09-30', persona: 'Brett A. Cope, siete ventas de mar a sep-2026 (seis con plan 10b5-1)', operacion: 'Venta', acciones: 31979, importe: 7.24 },
      { fecha: '2026-06-30', persona: 'Michael W. Metcalf (plan 10b5-1), mar y jun-2026', operacion: 'Venta', acciones: 10000, importe: 2.86 },
      { fecha: '2026-02-06', persona: 'Terry B. McKertcher (vicepresidente de operaciones), dic-2025 y feb-2026', operacion: 'Venta', acciones: 15300, importe: 2.39 },
      { fecha: '2026-08-14', persona: 'Richard E. Williams (consejero, plan 10b5-1)', operacion: 'Venta', acciones: 7500, importe: 2.03 },
      { fecha: '2026-05-11', persona: 'William M. Mauney Jr. (vicepresidente de I+D), dic-2025, may y sep-2026', operacion: 'Venta', acciones: 14801, importe: 1.86 },
      { fecha: '2026-02-09', persona: 'John Birchall (director general)', operacion: 'Venta', acciones: 7200, importe: 1.4 },
      { fecha: '2026-05-28', persona: 'Mohit Singh (consejero)', operacion: 'Venta', acciones: 1350, importe: 0.4 },
    ],
    control_y_defensas: 'No hay accionista de control: la familia Powell tiene en torno al 18 %, no está en el consejo y está vendiendo [1, 5]. Una acción, un voto. Las defensas son las clásicas de Delaware en una empresa pequeña: consejo escalonado en tres clases (cada consejero se elige cada tres años), foro exclusivo en los estatutos y presidente que es a la vez consejero delegado, compensado por un consejero coordinador independiente (Stacey) y siete de ocho consejeros independientes [1]. No hay operaciones vinculadas relevantes declaradas; el proxy describe la revisión de cualquier operación de más de 120.000 USD con consejeros o familiares [1].',
    alertas: [
      'Ventas de la familia fundadora: Thomas W. Powell vendió unos 51 M USD en 2026 (feb, mar y jun) sin plan 10b5-1 declarado [5].',
      'Todas las operaciones de directivos y consejeros en 12 meses son ventas (69,3 M USD en total, sin una sola compra) [5].',
      'Dependencia del consejero delegado (60 años) sin sucesor designado; concesión especial de retención en julio de 2026 [3].',
    ],
    confianza: 'Alta',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'directivos', campo: 'historial_guidance', tipo: 'Complemento', intentos: '1) Notas de resultados FY2023-FY2026: sin guía numérica; 2) 10-K y 10-Q: perspectivas cualitativas; 3) presentaciones: solo «margen bruto en línea con los últimos doce meses»', decision: 'Omitido' },
    { seccion: 'gobierno', campo: 'voto_remuneracion de 2024 y 2025', tipo: 'Complemento', intentos: '1) 8-K de la junta de 2026 (98,4 %); 2) 8-K de 2025 y 2024 no descargados; 3) proxy 2026: sin cifra de años previos', decision: 'Omitido' },
  ],
};
guarda('C', C);

// ================================================================ D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de POWL, SPY y XLI (bolsa.mjs y movimiento.mjs): precio, máximos, rentabilidades, betas y cierres de ejercicio, ajustados por el split', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://finance.yahoo.com/quote/POWL/history' },
  { id: 2, titulo: 'Powell Industries (POWL): estimaciones FY2026-FY2028 (ventas, EBITDA, EBIT, beneficio, BPA), cuatro analistas, objetivo medio 267,50 USD', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-19', url: 'https://www.marketscreener.com/quote/stock/POWELL-INDUSTRIES-INC-10520/finances/' },
  { id: 3, titulo: 'Ficha de comparables (capitalización, deuda neta, ventas y EBITDA de doce meses, estimaciones de BPA y ventas de los analistas)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com' },
  { id: 4, titulo: 'Daily Treasury Par Yield Curve Rates 2026: 10 años al 5,09 % el 16-oct-2026', editor: 'U.S. Department of the Treasury', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve&field_tdr_date_value=2026' },
  { id: 5, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026: 4,20 %', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 6, titulo: 'nVent acquires Avail Infrastructure Solutions\' Electrical Products Group (975 M USD; ≈ 12,5 veces el EBITDA; ventas de ≈ 375 M)', editor: 'tED magazine', tipo: 'Prensa', fecha: '2025-03', url: 'https://tedmag.com/nvent-acquires-avail-infrastructure-solutions' },
  { id: 7, titulo: 'Eaton Signs Deal To Buy Fibrebond For $1.4 Billion (110 M de EBITDA ajustado estimado de 2025; ventas de ≈ 378 M)', editor: 'Pulse 2.0', tipo: 'Prensa', fecha: '2025-03-14', url: 'https://pulse2.com/eaton-signs-deal-to-buy-fibrebond-for-1-4-billion/' },
  { id: 8, titulo: 'Eaton To Buy Boyd Thermal For $9.5 Billion (22,5 veces el EBITDA ajustado previsto de 2026; ventas de 1.700 M en 2026)', editor: 'Pulse 2.0', tipo: 'Prensa', fecha: '2025-11-04', url: 'https://pulse2.com/eaton-to-buy-boyd-thermal-for-9-5-billion-expanding-data-center-liquid-cooling-and-aerospace-capabilities/' },
  { id: 9, titulo: 'Form 10-Q del 3T FY2026: balance a 30-jun-2026 (efectivo 633,6 M, sin deuda) y 36.432.564 acciones en circulación a 3-ago-2026', editor: 'Powell Industries, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-08-04', url: `${E8}/000008042026000107/powl-20260630.htm` },
  { id: 10, titulo: 'POWL earnings date (próximos resultados previstos el 17-nov-2026, sin confirmar por la empresa)', editor: 'Unusual Whales', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://unusualwhales.com/stock/POWL/earnings' },
  { id: 11, titulo: 'Titulares de noticias de POWL (Seeking Alpha): «GAAP EPS of $1.42 misses by $0.05», «plunges 13% following Q3 miss», «AI slowdown fears hammer data-center power and construction stocks» (14-sep), «GAAP EPS of $1.25 misses by $0.09» (4-may)', editor: 'Seeking Alpha (RSS)', tipo: 'Prensa', fecha: '2026-10-14', url: 'https://seekingalpha.com/api/sa/combined/POWL.xml' },
  { id: 12, titulo: 'Why Vertiv Holdings Plunged in July', editor: 'The Motley Fool', tipo: 'Prensa', fecha: '2026-08-11', url: 'https://www.fool.com/investing/2026/08/11/why-vertiv-holdings-plunged-in-july/' },
  { id: 13, titulo: 'Powell Industries Announces Third Quarter Fiscal 2026 Results (split 3 × 1 del 2-abr-2026)', editor: 'Powell Industries, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-08-03', url: `${E8}/000008042026000103/ex991-powlq3xfy2026earning.htm` },
  { id: 14, titulo: 'Form 4 de directivos y accionistas (ventas de Thomas W. Powell y del consejero delegado)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-02', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000080420&type=4' },
  { id: 15, titulo: 'Powell Industries announces date and conference call for fiscal 2025 fourth quarter results (resultados el 18-nov-2025)', editor: 'Galveston County Daily News (nota de la empresa)', tipo: 'Prensa', fecha: '2025-11-04', url: 'https://www.galvnews.com/powell-industries-announces-date-and-conference-call-for-fiscal-2025-fourth-quarter-and-full/article_3e77098f-3276-5462-be1b-a47494f480a9.html' },
];
const comps = lee('comparables.json');
const cierres = Object.fromEntries(bolsa.cierres_ejercicio.map((c) => [c.anio, c.precio_cierre]));
const D = {
  _estado: 'completa',
  identificacion: {
    nombre: 'Powell Industries, Inc.', nombre_corto: 'Powell', ticker: 'POWL', isin: 'US7391281067',
    mercado: 'Nasdaq Global Market (POWL, USD)', indice_referencia: 'S&P 500 (SPY) como referencia; Russell 2000 / S&P SmallCap 600',
    pais: 'Estados Unidos', pais_iso: 'US', sector: 'Industria', industria: 'Equipos eléctricos y componentes', sede: 'Houston (Texas)', fundacion: '1947', empleados: 3143, web: 'https://powellind.com',
    precio: 165.14, fecha_precio: '2026-10-16', acciones: 36.6, capitalizacion_publicada: 6016, free_float_pct: 79.5,
    max_52s: 322.05, min_52s: 94.02, volumen_medio_diario: '≈ 122 M USD/día (624.000 acciones, 3 meses)', proximos_resultados: '2026-11-17',
  },
  consenso: {
    guidance: 'Powell no da guía numérica. En la presentación del 3T FY26 (3-ago-2026) la dirección esperaba «otro año muy fuerte» al cerrar FY2026, margen bruto en línea con los últimos doce meses (≈ 29-30 %) mientras añade capacidad, la ampliación de Jacintoport terminada a fin de FY2026 y el estudio de fábricas nuevas además de las naves alquiladas en Houston y Ohio [13]. De la cartera de 2.400 M, unos 1.300 M se facturarán en los doce meses siguientes a junio de 2026 [9]. Los resultados de FY2026 no están publicados: el año pasado salieron el 18 de noviembre y se esperan hacia el 17-nov-2026 [10, 15].',
    estimaciones: [
      { periodo: 'FY2026e', ingresos: 1191, ebitda: 244.1, ebit: 234.0, bpa: 5.368, dpa: 0.36, fuente: 'MarketScreener, cuatro analistas [2]; DPA: dividendo declarado (0,09 × 4)' },
      { periodo: 'FY2027e', ingresos: 1483, ebitda: 315.0, ebit: 303.0, bpa: 6.817, dpa: 0.36, fuente: 'MarketScreener [2]' },
      { periodo: 'FY2028e', ingresos: 1720, ebitda: 386.2, ebit: 371.2, bpa: 8.246, dpa: 0.36, fuente: 'MarketScreener [2]' },
    ],
    recomendaciones: { n_analistas: 4, comprar: null, mantener: null, vender: null, po_medio: 267.5, po_min: null, po_max: null },
    revisiones: 'Solo cuatro analistas siguen la empresa, con recomendación media «sobreponderar» y objetivo de 267,50 USD, un 62 % sobre el precio [2, 3]. Las estimaciones de FY2027 (ventas de 1.483 M, +24,5 %) y FY2028 (1.720 M) suponen que la cartera se convierte en ventas a buen ritmo y que el margen EBITDA sube del 20,5 % al 22,5 % [2]. Los dos últimos trimestres quedaron por debajo del BPA esperado (2T −0,09 USD y 3T −0,05 USD) [11]; no hay un histórico gratuito de revisiones a tres y doce meses, así que no se puede medir el recorte de estimaciones tras esos fallos. MarketScreener muestra un DPA de FY2026 de 1,07 USD sin ajustar por el split; aquí se usa el declarado (0,36).',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    tipo_rentabilidad: bolsa.bolsa.tipo_rentabilidad,
    rentabilidades: bolsa.bolsa.rentabilidades,
    anual: bolsa.bolsa.anual,
    beta: 1.22, volatilidad_pct: 63.4, max_drawdown_pct: -55.8, posicion_corta_pct: null,
    comentario: 'Powell es una de las acciones que más han subido de la bolsa de EE. UU.: +88,5 % anual en tres años y +83,8 % en cinco, frente al +22,9 % y +12,6 % del S&P 500 [1]. En 2026 hizo un máximo de 322 USD (ajustado) el 6 de mayo, tras el mega pedido de centros de datos, y ha caído un 48,7 % hasta 165,14 USD [1]. La caída no es efecto del split (2-abr, 3 × 1: los precios están ajustados) sino una corrección real, la mayor parte compartida con los valores de energía para centros de datos: Vertiv cayó un 45 % desde su máximo y Primoris un 64 % [1, 12]. Lo propio de Powell: dos trimestres por debajo de lo esperado, las ventas de la familia fundadora (51 M USD) y una valoración que en mayo llegó a 60 veces el beneficio [11, 14]. La beta de 2 años (2,01) duplica la de 5 (1,22): la acción cotiza hoy como un valor de IA.',
    contexto: {
      movimiento: { fecha: mov.fecha, var_1m_pct: mov.var_1m_pct, var_3m_pct: mov.var_3m_pct, var_6m_pct: mov.var_6m_pct, var_12m_pct: mov.var_12m_pct, dist_max_52s_pct: mov.dist_max_52s_pct, dist_min_52s_pct: mov.dist_min_52s_pct, dist_max_historico_pct: mov.dist_max_historico_pct, tendencia: mov.tendencia, volatilidad_60d_pct: mov.volatilidad_60d_pct, avisos: mov.avisos.map((a) => `${a.codigo} ${a.texto}`) },
      movimientos_fuertes: [
        { periodo: 'ene-may-2026', var_pct: 58.8, causa: 'Subida de 140 a 322 USD: pedidos récord del 1T y 2T FY26 (439 M y 490 M) y el mega pedido de más de 400 M para un centro de datos anunciado el 4-may (+9,2 % el 5-may y +8,7 % el 6-may) [13, 11].', veredicto: 'no cambia', condicion: null },
        { periodo: 'may-jul-2026', var_pct: -33.7, causa: 'Corrección de los valores de IA en julio (Burry, el modelo chino Kimi 3, quiebra del fondo Situational Awareness): Powell −8,3 % y −7,3 % el 28 y 29-jul, con Vertiv −17,3 % el 29-jul [12]. Venta de Thomas W. Powell de 10 M USD el 25-jun (−9,5 % el 26-jun) [14].', veredicto: 'no cambia', condicion: null },
        { periodo: 'ago-2026', var_pct: -3.8, causa: 'Resultados del 3T FY26 (3-ago): BPA 1,42 USD, 0,05 por debajo de lo esperado; llegó a caer un 14 % en la sesión del 4-ago y cerró −3,8 % [11].', veredicto: 'no cambia', condicion: null },
        { periodo: 'sep-oct-2026', var_pct: -6.6, causa: '«Miedo a un frenazo de la IA» en energía para centros de datos (−6,5 % el 14-sep, con GE Vernova −8,6 % y Eaton y Vertiv −7,6 %) y −7,3 % el 14-oct junto a Vertiv (−6,1 %) y GE Vernova (−6,2 %) [11, 1]. Sin noticia propia de Powell ese día salvo un artículo bajista en Seeking Alpha.', veredicto: 'no cambia', condicion: null },
      ],
      noticias: [
        { fecha: '2026-03-31', tipo: 'ampliación o convertible', hecho: 'Split 3 × 1 efectivo el 2-abr-2026 (cotiza ajustado desde el 6-abr): no cambia el valor; explica que los precios anteriores aparezcan divididos por tres [13].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-06-25', tipo: 'accionista de referencia', hecho: 'Thomas W. Powell (≈ 18 %, familia fundadora, fuera del consejo) vendió 51 M USD en feb, mar y jun-2026 sin plan 10b5-1 declarado: ≈ 4 % de su paquete. Riesgo de más ventas (overhang), pero no es quien dirige la empresa [14].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-09-30', tipo: 'directivos', hecho: 'El consejero delegado vendió 7,2 M USD en siete operaciones (seis con plan 10b5-1), ≈ 6 % de sus acciones; el resto de directivos y consejeros también vendió (69,3 M en total, sin compras) [14].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-08-03', tipo: 'resultados', hecho: 'BPA del 3T FY26 de 1,42 USD frente a 1,47 esperado y ventas de 312 M frente a 316,9 M; pedidos récord de 934 M [11, 13].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-14', tipo: 'recomendación', hecho: 'Artículo de Seeking Alpha que rebaja la recomendación («A Record Backlog Isn\'t Enough To Make It A Buy»); los cuatro analistas mantienen «sobreponderar» con objetivo de 267,50 USD [2, 11].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-11-17', tipo: 'resultados', hecho: 'Resultados de FY2026 (4T) previstos hacia el 17-nov-2026, sin confirmar: el 4T suele ser el trimestre más fuerte y traerá la cartera a septiembre [10, 15].', veredicto: 'no cambia', condicion: null },
      ],
      proximos_resultados: '2026-11-17',
      veredicto: 'no cambia',
      condicion: null,
      comentario: 'La caída del 48,7 % desde el máximo de mayo es real (el split de abril está ajustado) y tiene tres causas: el desplome de los valores de energía para centros de datos (julio y septiembre), dos trimestres algo por debajo de lo esperado y las ventas de la familia Powell y de los directivos. Ninguna rompe la tesis del informe, que no depende de recuperar el múltiplo de mayo. No hay ampliaciones, ofertas, litigios ni decisiones regulatorias pendientes; las ventas de la familia son un riesgo de oferta de acciones, no un hecho anunciado. Los resultados del 4T (hacia el 17-nov) no aplazan la decisión (regla 11). Veredicto: no cambia.',
    },
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: ['FY2016', 'FY2017', 'FY2018', 'FY2019', 'FY2020', 'FY2021', 'FY2022', 'FY2023', 'FY2024', 'FY2025'].map((a) => ({ anio: a, precio_cierre: cierres[a], ev_ebitda_ntm: null, per_ntm: null, excluir: ['FY2017', 'FY2018', 'FY2021'].includes(a) })),
    confianza: 'Media',
  },
  comparables: {
    empresas: comps.map((e) => ({ nombre: e.nombre, ticker: e.ticker, pais: e.pais, capitalizacion: e.capitalizacion, ev_ventas: e.ev_ventas, ev_ebitda_ltm: e.ev_ebitda_ltm, ev_ebitda_ntm: null, per_ntm: e.per_ntm, crecimiento_pct: e.crecimiento_pct, margen_ebitda_pct: e.margen_ebitda_pct, roic_pct: e.roic_pct, dn_ebitda: e.dn_ebitda, fcf_yield_pct: e.fcf_yield_pct })),
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2025-11', objetivo: 'Boyd Thermal (refrigeración líquida para centros de datos)', comprador: 'Eaton', ev: 9500, ev_ventas: 5.59, ev_ebitda: 22.5, prima_pct: null, excluir: false, comentario: '22,5 veces el EBITDA ajustado previsto de 2026; 5,6 veces las ventas de 2026 (1.700 M) [8].' },
      { fecha: '2025-03', objetivo: 'Fibrebond (salas eléctricas modulares para centros de datos)', comprador: 'Eaton', ev: 1400, ev_ventas: 3.7, ev_ebitda: 12.7, prima_pct: null, excluir: false, comentario: '1.400 M sobre 110 M de EBITDA ajustado estimado de 2025 (12,7 veces, cálculo propio) y 378 M de ventas: el comparable más cercano a Powell [7].' },
      { fecha: '2025-03', objetivo: 'Electrical Products Group de Avail Infrastructure Solutions (salas eléctricas y conductos de barras)', comprador: 'nVent', ev: 975, ev_ventas: 2.6, ev_ebitda: 12.5, prima_pct: null, excluir: false, comentario: '≈ 12,5 veces el EBITDA de doce meses previsto; ventas de ≈ 375 M [6].' },
      { fecha: '2025-08', objetivo: 'Remsdaq (unidades remotas SCADA, Reino Unido)', comprador: 'Powell Industries', ev: 18.4, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '13,6 M GBP con la caja; múltiplos no publicados [9].' },
    ],
    confianza: 'Media',
  },
  valoracion: {
    puente: { fecha: '2026-06-30', deuda_financiera: 0, arrendamientos: 0, caja: 633.6, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 0 },
    referencia_mercado: { mercado: 'Prima implícita del S&P 500 (Damodaran), la principal', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx, octubre de 2026 [5]' },
  },
  fuentes: fD,
  huecos: [
    { seccion: 'bolsa', campo: 'posicion_corta_pct', tipo: 'Complemento', intentos: '1) FINRA, posiciones cortas quincenales: no descargado (bloqueo); 2) Nasdaq short interest: requiere JavaScript; 3) Stock Analysis: sin acceso en esta sesión', decision: 'Omitido' },
    { seccion: 'consenso', campo: 'recomendaciones por tipo y objetivos mínimo y máximo', tipo: 'Complemento', intentos: '1) MarketScreener: solo media y objetivo medio; 2) Yahoo: objetivo medio de cuatro analistas; 3) MarketBeat: dato de julio (236,67), anterior y no comparable', decision: 'Omitido' },
    { seccion: 'comparables', campo: 'ev_ebitda_ntm', tipo: 'Complemento', intentos: '1) Yahoo: sin EBITDA estimado; 2) MarketScreener: solo para Powell; 3) cálculo propio: sin EBITDA de consenso homogéneo', decision: 'Omitido' },
  ],
};
guarda('D', D);

// ================================================================ E. Sentimiento
const fE = [
  { id: 1, titulo: 'Seeking Alpha: artículos de autores sobre POWL de mayo a octubre de 2026 (RSS: «A Record Backlog Isn\'t Enough To Make It A Buy», «The Market May Be Underestimating The Recovery», «Bull Trap Over», «The Price Drop Makes It More Attractive», «Fully-Priced HOLD»…)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-14', url: 'https://seekingalpha.com/api/sa/combined/POWL.xml' },
  { id: 2, titulo: 'Stocktwits, flujo de mensajes de $POWL (30 últimos, 10-ago a 15-oct-2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-15', url: 'https://api.stocktwits.com/api/2/streams/symbol/POWL.json' },
];
const E = {
  _estado: 'completa',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Empeora',
    revisadas: [
      { plataforma: 'Seeking Alpha (artículos de autores)', fecha: '2026-10', n_comentarios: 16, tono: 'Dividido', resumen: 'Desde mayo alternan «cara pero la cartera lo justifica» y «momento sobrevalorado»; tras el 3T se suceden «la caída la hace atractiva» y «trampa alcista», y el 14-oct un autor rebaja a no comprar porque «una cartera récord no basta» [1].' },
      { plataforma: 'Stocktwits ($POWL)', fecha: '2026-10', n_comentarios: 30, tono: 'Positivo', resumen: 'Particulares que compran la caída («el bebé tirado con el agua del baño», «demasiado barata», «comprando en las bajadas») y comentan grandes compras de opciones de compra a febrero de 2027; 12 mensajes marcados alcistas y 1 bajista [2].' },
    ],
    temas: [
      { tema: 'La cartera récord (2.400 M) asegura dos años de crecimiento', postura: 'Alcista', peso: 'Alto', contraste: 'Cierto en ventas (1.300 M en doce meses), pero la cartera no dice nada del margen de los pedidos de centros de datos ni del ciclo después de 2028.' },
      { tema: 'Es un valor de IA y caerá si se frena la inversión en centros de datos', postura: 'Bajista', peso: 'Alto', contraste: 'Exagerado en ventas (centros de datos ≈ 16 % de las ventas de FY2025) pero cierto en pedidos (≈ 40 % de la cartera) y en cómo cotiza (beta de 2 años de 2,01).' },
      { tema: 'Valoración: cara en mayo, razonable ahora', postura: 'Dividida', peso: 'Medio', contraste: 'A 24 veces el BPA de FY2027 de los analistas sigue por encima de su historia y de la mediana de comparables (21,2 veces); el informe la ve cara frente al ciclo.' },
      { tema: 'Fallos frente al consenso', postura: 'Bajista', peso: 'Medio', contraste: 'Dos trimestres seguidos por debajo del BPA esperado (−0,09 y −0,05 USD), por gastos y I+D, no por margen bruto.' },
    ],
    lectura: 'El sentimiento ya no es eufórico como en mayo: los autores de Seeking Alpha se dividen y varios han bajado la recomendación, mientras los particulares de Stocktwits compran la caída con opciones a largo plazo [1, 2]. No es capitulación: nadie discute la cartera, y el debate es solo cuánto pagar por ella y cuánto depende de la IA. Ese es también el debate del informe. Ninguna cifra del informe sale de aquí.',
    confianza: 'Baja',
  },
  fuentes: fE,
  huecos: [
    { seccion: 'sentimiento', campo: 'Reddit y foros de comentarios', tipo: 'Complemento', intentos: '1) Reddit (r/stocks, r/valueinvesting): 403; 2) comentarios de Seeking Alpha: tras registro; 3) Motley Fool y MarketBeat: sin hilos con debate', decision: 'Omitido' },
  ],
};
guarda('E', E);
console.log('Notas A-E escritas.');
