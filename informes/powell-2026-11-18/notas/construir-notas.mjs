// Notas A-E de Powell Industries, Inc. (Nasdaq: POWL). Corte 2026-11-18 (miércoles; último cierre disponible, 17-nov).
// Cifras en millones de USD salvo que se diga otra cosa. US GAAP; ejercicio cerrado el 30 de septiembre («FY2025» = oct-24/sep-25).
// Split 3 × 1 el 2-abr-2026 (cotiza ajustado desde el 6-abr): el XBRL del 10-K de FY2026 ya trae FY2024-FY2026 ajustados; FY2017-FY2023 se pasan a acciones de hoy.
// Ejecutar: node informes/powell-2026-11-18/notas/construir-notas.mjs
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
  { id: 1, titulo: 'Form 10-K del ejercicio 2026 (cerrado el 30-sep-2026): estados financieros, ingresos por mercado y geografía, contratos, cartera (2.700 M, 1.300 M a doce meses), avales, impuestos, capacidad y riesgos', editor: 'Powell Industries, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-11-17', url: `${E8}/000008042026000143/powl-20260930.htm` },
  { id: 2, titulo: 'Powell Industries Announces Fourth Quarter and Full Year Fiscal 2026 Results (8-K, anexo 99.1)', editor: 'Powell Industries, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-11-16', url: `${E8}/000008042026000139/ex991-powlq4xfy2026earning.htm` },
  { id: 3, titulo: 'Powell Industries Q4 FY2026 Earnings Call Transcript (17-nov-2026): margen base, conversión de la cartera, capacidad, capex de FY2027 y preguntas sobre centros de datos', editor: 'Earnings Whispers', tipo: 'Primaria', fecha: '2026-11-17', url: 'https://www.earningswhispers.com/transcript/POWL/Q42026' },
  { id: 4, titulo: 'Powell Industries Announces Third Quarter Fiscal 2026 Results (8-K, anexo 99.1)', editor: 'Powell Industries, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-08-03', url: `${E8}/000008042026000103/ex991-powlq3xfy2026earning.htm` },
  { id: 5, titulo: 'Powell Industries Announces Second Quarter Fiscal 2026 Results (8-K, anexo 99.1)', editor: 'Powell Industries, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-05-04', url: `${E8}/000008042026000063/ex991-powlq2xfy2026earning.htm` },
  { id: 6, titulo: 'Powell Industries Announces First Quarter Fiscal 2026 Results (8-K, anexo 99.1)', editor: 'Powell Industries, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-02-03', url: `${E8}/000008042026000013/ex991-powlq1xfy2026earning.htm` },
  { id: 7, titulo: 'Powell Industries Announces Fourth Quarter and Full Year Fiscal 2025 Results (8-K, anexo 99.1)', editor: 'Powell Industries, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2025-11-18', url: `${E8}/000008042025000145/ex991-powlq4xfy2025earning.htm` },
  { id: 8, titulo: 'Form 10-K del ejercicio 2025: ingresos por mercado de FY2023 y notas de FY2025', editor: 'Powell Industries, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2025-11-19', url: `${E8}/000008042025000152/powl-20250930.htm` },
  { id: 9, titulo: 'Datos XBRL de las cuentas anuales FY2017-FY2026 (companyfacts: cuenta, balance, flujos, inversiones a corto)', editor: 'SEC EDGAR (XBRL)', tipo: 'Primaria', fecha: '2026-11-17', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0000080420.json' },
  { id: 10, titulo: 'Certificate of Amendment (8-K del 31-mar-2026): split 3 × 1', editor: 'Powell Industries, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-03-31', url: `${E8}/000008042026000054/ex31-certificateofamendmen.htm` },
  { id: 11, titulo: 'Powell Industries Declares Quarterly Cash Dividend (0,09 USD por acción, 3-nov-2026)', editor: 'Powell Industries, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-11-03', url: `${E8}/000008042026000136/ex991-powlq4xfy2026dividen.htm` },
  { id: 12, titulo: 'Form 10-K del ejercicio 2024: ingresos por mercado de FY2022', editor: 'Powell Industries, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2024-11-20', url: `${E8}/000008042024000086/powl-20240930.htm` },
  { id: 13, titulo: 'Earnings history de POWL (BPA esperado y real por trimestre: 4T FY26 2,23 frente a 1,56)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-11-18', url: 'https://finance.yahoo.com/quote/POWL/analysis' },
];

// Inversiones a corto (XBRL ShortTermInvestments) que se suman a la caja: el 10-K da «efectivo e inversiones a corto» juntos.
const stInv = { FY2018: 13.2, FY2019: 6.0, FY2020: 18.7, FY2021: 19.7, FY2022: 14.6, FY2023: 33.1, FY2024: 43.1, FY2025: 24.8, FY2026: 0 };
const recompras = { FY2023: 0.65, FY2024: 6.6, FY2025: 12.25, FY2026: 14.7 }; // acciones retenidas para impuestos de empleados [1]
const AJUSTADO = new Set(['FY2024', 'FY2025', 'FY2026']); // el 10-K de FY2026 ya los da en acciones de después del split
const cuenta = X.financieros.cuenta.map((c) => ({
  periodo: c.periodo, ingresos: c.ingresos, coste_ventas: c.coste_ventas, gastos_generales: c.gastos_generales, ebitda: c.ebitda, amortizaciones: c.amortizaciones,
  ebit: c.ebit, resultado_financiero: c.resultado_financiero, bai: c.bai, impuestos: c.impuestos, minoritarios: 0, beneficio_neto: c.beneficio_neto,
  gastos_financieros: c.gastos_financieros ?? 0, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null,
  ...(AJUSTADO.has(c.periodo) ? { bpa: c.bpa, dpa: c.dpa, acciones_diluidas: c.acciones_diluidas } : { bpa: r3(c.bpa / SPLIT), dpa: r3(c.dpa / SPLIT), acciones_diluidas: r1(c.acciones_diluidas * SPLIT) }), dpa_extraordinario: 0,
}));
const balance = X.balance.historico.map((b) => ({
  periodo: b.periodo, activo_total: b.activo_total, activo_corriente: b.activo_corriente, pasivo_corriente: b.pasivo_corriente, pasivo_total: b.pasivo_total,
  fondo_comercio: b.fondo_comercio ?? 0, intangibles: b.intangibles ?? 0, inmovilizado_material: b.inmovilizado_material, existencias: b.existencias, clientes: b.clientes,
  proveedores: b.proveedores, activos_contrato: b.activos_contrato, pasivos_contrato: b.pasivos_contrato, caja: r1(b.caja + (stInv[b.periodo] ?? 0)),
  deuda_financiera: b.deuda_financiera ?? 0, arrendamientos: 0, // operativos (US GAAP): ya en el EBITDA
  patrimonio_neto: b.patrimonio_neto, minoritarios: 0, reservas: b.reservas,
}));
const flujos = X.flujos.historico.map((f) => ({
  periodo: f.periodo, flujo_operativo: f.flujo_operativo, capex: f.capex, pagos_arrendamientos: 0, adquisiciones: f.adquisiciones ?? 0, desinversiones: f.desinversiones ?? 0,
  dividendos: f.dividendos, recompras: recompras[f.periodo] ?? f.recompras ?? 0, emision_acciones: 0, intereses_en_financiacion: 0,
}));

const seg = (nombre, descripcion, v) => ({ nombre, descripcion, tipo_resultado: null, historico: [['FY2022', v[0]], ['FY2023', v[1]], ['FY2024', v[2]], ['FY2025', v[3]], ['FY2026', v[4]]].map(([periodo, ingresos]) => ({ periodo, ingresos, resultado: null })) });
const segmentos = [
  seg('Petróleo y gas (sin petroquímica)', 'GNL, oleoductos, refino, producción en tierra y mar; salas eléctricas (PCR) y módulos para EPC del golfo de México', [215.2, 273.1, 417.2, 406.6, 446.0]),
  seg('Servicios eléctricos (utilities)', 'Subestaciones de distribución y generación; aparamenta de media tensión y salas', [122.4, 158.4, 186.5, 279.0, 338.7]),
  seg('Comercial y otros industriales', 'Centros de datos, minería, papel y otras industrias', [56.4, 104.0, 149.9, 178.2, 294.3]),
  seg('Petroquímica', 'Polietileno, fertilizantes, metanol (gas como materia prima)', [66.5, 94.2, 185.6, 151.2, 88.2]),
  seg('Tracción ferroviaria', 'Alimentación eléctrica de metro ligero y tranvía', [44.9, 28.1, 22.0, 41.3, 36.7]),
  seg('Otros', 'Universidades, administraciones y otros mercados', [27.1, 41.5, 51.1, 48.1, 52.4]),
];

const A = {
  _estado: 'completa',
  financieros: {
    cuenta,
    ltm: { periodo: 'FY2026', fecha_fin: '2026-09-30', ingresos: 1256.2, ebitda: 273.7, ebit: 265.0, beneficio_neto: 221.0, bpa: 6.04, dpa: 0.36, dpa_extraordinario: 0, fcf: 415.2, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [],
    comentario: 'Powell pasó de 533 M USD de ventas en FY2022 a 1.256,2 M en FY2026 (+24 % anual), casi todo orgánico: la única compra, Remsdaq (agosto de 2025, 11,5 M USD en caja), es menor [1, 9]. FY2026 creció un 13,8 % con un último trimestre de 396,7 M (+33 %) y la mezcla cambió: comercial y otros industriales (centros de datos) +65 % hasta 294,3 M y utilities +21 % hasta 338,7 M, mientras la petroquímica cayó un 42 % hasta 88,2 M al acabar un gran pedido [1, 2]. El margen bruto subió del 15,9 % en FY2022 al 29,4 % en FY2025 y al 31,3 % en FY2026 (34,9 % en el 4T), y el EBITDA, del 3,1 % al 21,8 % [1, 9]. La dirección atribuye la mejora a precios estables, volumen y ejecución; de los 31,3 puntos, unos 150 pb vienen de cierres favorables de proyectos (230 pb en el 4T), así que el margen base de la cartera ronda el 30 % [3]. La serie larga recuerda que es un negocio cíclico de proyectos: en FY2017-FY2018 perdió dinero con ventas de 396-449 M y en FY2021 ganó 0,6 M [9].',
    ajustes: 'Cifras publicadas (US GAAP), sin ajustes: Powell no presenta resultados ajustados. El EBITDA es el resultado de explotación más la amortización del estado de flujos (8,7 M en FY2026). El 10-K de FY2026 ya da FY2024-FY2026 en acciones posteriores al split del 2-abr-2026; el BPA, el DPA y las acciones de FY2017-FY2023 se dividen y multiplican por 3 [1, 10]. FY2026 incluye 1,5 M de ingresos por seguros de vida de dos jubilados (otros ingresos, no recurrentes) y cierres favorables de proyectos (≈ 150 pb de margen bruto) que se repiten cada año en distinta cuantía (185 pb en FY2025) [1, 3]. FY2022 lleva una devolución fiscal neta (impuesto de −3,9 M); el tipo normal es del 22-24 % (23 % en FY2026) [1, 9].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '1T FY25', ingresos: 241.4, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 37.3, margen_ebitda_pct: 15.5, bpa: 0.953, vs_consenso: null },
      { periodo: '2T FY25', ingresos: 278.6, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 60.6, margen_ebitda_pct: 21.8, bpa: 1.27, vs_consenso: null },
      { periodo: '3T FY25', ingresos: 286.3, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 61.9, margen_ebitda_pct: 21.6, bpa: 1.32, vs_consenso: null },
      { periodo: '4T FY25', ingresos: 298.0, crecimiento_pct: 8.3, crecimiento_organico_pct: null, ebitda: 65.3, margen_ebitda_pct: 21.9, bpa: 1.407, vs_consenso: null },
      { periodo: '1T FY26', ingresos: 251.2, crecimiento_pct: 4.0, crecimiento_organico_pct: null, ebitda: 44.9, margen_ebitda_pct: 17.9, bpa: 1.133, vs_consenso: 'Superior' },
      { periodo: '2T FY26', ingresos: 296.6, crecimiento_pct: 6.5, crecimiento_organico_pct: null, ebitda: 59.8, margen_ebitda_pct: 20.2, bpa: 1.25, vs_consenso: 'Inferior' },
      { periodo: '3T FY26', ingresos: 311.7, crecimiento_pct: 8.9, crecimiento_organico_pct: null, ebitda: 66.2, margen_ebitda_pct: 21.2, bpa: 1.42, vs_consenso: 'Inferior' },
      { periodo: '4T FY26', ingresos: 396.7, crecimiento_pct: 33.1, crecimiento_organico_pct: null, ebitda: 102.8, margen_ebitda_pct: 25.9, bpa: 2.23, vs_consenso: 'Superior' },
    ],
    ultima_presentacion: 'Las dos últimas conferencias (3-ago y 17-nov-2026) muestran el giro de «añadir capacidad» a «la capacidad ya entrega». En agosto, con un BPA de 1,42 USD por debajo del esperado (1,47), la dirección presentó pedidos récord (934 M) y una cartera de 2.400 M, y pidió paciencia mientras abría naves [4, 13]. En noviembre el 4T batió de largo: ventas de 396,7 M (+33 %, +27 % sobre el 3T), margen bruto del 34,9 % y BPA de 2,23 USD frente a 1,56 esperado [2, 13]. El director financiero desglosó el margen: 31,3 % en el año con 150 pb de cierres de proyectos, base del 30 % frente al 28 % de FY2025, y lo ve sostenible en FY2027 con un posible «bache de productividad» al arrancar las naves nuevas [3]. La cartera (2.700 M) se alarga: 1.300 M se facturan en FY2027 (50 %, frente al 60 % hace un año) y la mayor parte del resto en FY2028; el pedido de GNL de 250 M durará casi tres años [3]. Los analistas preguntaron sobre todo por los centros de datos tras las elecciones de mitad de mandato: el consejero delegado admitió que el riesgo de cancelación sube con los pedidos más estándar y que ha habido cambios de cantidades, reasignados sin anular pedidos [3]. No dio guía numérica de ventas para FY2027 ni cifra de inversión de la fábrica propia.',
    confianza: 'Alta',
  },
  balance: {
    historico: balance,
    vencimientos: [],
    liquidez: 'Efectivo de 860,8 M USD a 30-sep-2026 (475,5 M de efectivo e inversiones a corto un año antes) y sin deuda financiera; la línea de crédito con Bank of America y Texas Capital pasó de 150 a 200 M el 10-nov-2026 y se usa solo para cartas de crédito (103,1 M) [1, 3].',
    rating: 'Sin rating',
    coste_deuda_pct: null,
    vida_media_anios: null,
    otros_pasivos: 'Sin deuda, pero con compromisos de proyecto que crecen con la cartera: cartas de crédito y garantías bancarias por 109,2 M y fianzas de cumplimiento (surety bonds) por 543,6 M a 30-sep-2026, con 656,4 M de capacidad libre de fianzas (417,3 M de fianzas un año antes) [1, 8]. No ha habido ejecuciones relevantes [1]. Compensación diferida de directivos de 16,7 M y garantías de producto de 7,1 M [1]. Los pasivos por contrato (anticipos y facturación por delante de la obra) subieron de 297,9 M a 578,7 M en el año por los cobros iniciales de los pedidos grandes: no son deuda, se compensan con la entrega, pero la caja de 860,8 M incluye unos 445,7 M de anticipos netos de activos por contrato [1]. Arrendamientos operativos de 2,6 M (US GAAP, ya en el EBITDA; no se suman a la deuda).',
    comentario: 'El circulante comercial con contratos (clientes + existencias + activos por contrato − proveedores − pasivos por contrato) pasó de 73,5 M a sep-25 (6,7 % de las ventas) a −88,0 M a sep-26 (−7,0 %), porque los anticipos (+280,8 M) crecieron mucho más que los clientes (+134,3 M) y las existencias (+32,0 M) [1]. Es el patrón de un contratista que factura por hitos al principio: la caja sube cuando entran pedidos y baja cuando se ejecutan. Con 2.700 M de cartera, una parte de los 860,8 M de caja se consumirá al fabricar; el informe no trata esa caja como libre y lo recoge en el circulante proyectado (−3 % en FY2027e, +1 % en FY2028e y 5 % desde FY2030e, unos 200 M de consumo).',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'La caja sigue a los pedidos más que al beneficio: flujo operativo de 182,6 M en FY2023 (3,3 veces el beneficio, por anticipos), 108,7 M en FY2024 (0,73 veces), 167,9 M en FY2025 (0,93 veces) y 433,7 M en FY2026 (1,96 veces), con 284,2 M de entrada neta por contratos [1, 9]. El flujo de FY2026 está inflado por anticipos que se devolverán en obra; el FCF «normal» se parece más al beneficio. El capex ha sido mínimo (18,5 M en FY2026, 1,5 % de las ventas; 10 M para la nave de productos de Houston) [1]. Sube en FY2027: la dirección espera 15-20 M más por la nave alquilada de 275.000 pies² y el resto de ampliaciones, y estudia una fábrica propia de 250.000-300.000 pies² sin decidir [3]; el informe pone el 2,3 % de las ventas en FY2027e y el 3,0 % en FY2028e (estimación propia). El dividendo (13,1 M) y las acciones retenidas para impuestos de empleados (14,7 M) son los únicos usos recurrentes [1].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'PricewaterhouseCoopers LLP', anios_auditor: 23, opinion: 'Favorable (sin salvedades) en FY2026, también sobre el control interno; asunto clave: estimación de costes de contratos a grado de avance',
    comentario: 'PwC audita desde 2004 y firmó el 17-nov-2026 sin salvedades; su asunto clave de auditoría es la estimación de los costes pendientes y de las penalizaciones de los contratos reconocidos por grado de avance [1]. Ese es el punto delicado: el margen depende de estimaciones de coste, órdenes de cambio y cierres de proyecto, que sumaron unos 150 pb de margen bruto en FY2026 y 230 pb en el 4T [1, 3]. No hay capitalización de I+D (15,5 M a gastos en FY2026) ni ajustes al beneficio; los pagos en acciones son pequeños (6,8 M, 3,1 % del beneficio) [1]. El salto del margen de FY2023-FY2026 coincide con mejores precios, volumen y menos materiales sobre ventas, no con cambios de criterio [1, 8]. Los indicadores del motor deben leerse con el ciclo: el Beneish puede marcar por el crecimiento de clientes (+62 % con ventas +14 %) y el Altman sale muy alto por la caja y la ausencia de deuda. Los clientes crecen porque se facturan hitos de pedidos grandes, con su contrapartida en anticipos [1].',
    senales: [
      { senal: 'Clientes +62 % en el año (217 M a 351 M) con ventas +14 %', nivel: 'Media', comentario: 'Facturas de hitos de pedidos grandes (los pasivos por contrato suben 281 M a la vez); vigilar el cobro en el 1T FY27 [1].' },
      { senal: 'Margen de proyecto sensible a estimaciones (grado de avance)', nivel: 'Media', comentario: 'Cierres favorables de 150 pb en FY2026 y 230 pb en el 4T; asunto clave del auditor [1, 3].' },
      { senal: 'Flujo operativo de 433,7 M (1,96 veces el beneficio) por anticipos', nivel: 'Baja', comentario: 'Se devolverá al ejecutar la cartera; no es FCF recurrente [1].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Dividendo trimestral de 0,09 USD por acción tras el split (0,36 USD al año, el 6 % del beneficio), confirmado el 3-nov-2026, sin programa de recompra; solo retiene acciones de empleados para pagar sus impuestos (14,7 M en FY2026) [1, 11]. Las prioridades declaradas son el circulante de los proyectos, la capacidad (naves alquiladas, Jacintoport, posible fábrica propia), la I+D y compras selectivas de automatización y servicios, «con disciplina porque las valoraciones del sector son altas» [3]. La caja (860,8 M, un 16 % de la capitalización) sigue acumulándose; parte son anticipos de clientes [1].',
    adquisiciones: [
      { anio: '2025', objetivo: 'Remsdaq Limited (Reino Unido; unidades remotas SCADA para subestaciones)', importe: 11.5, ev_ebitda: null, financiacion: 'Caja', resultado: 'Pequeña; la dirección dice que ha sido «sinérgica y acrecitiva» y que los centros de datos de EE. UU. han llevado su tecnología a EE. UU. antes de lo previsto [1, 3].' },
    ],
    comentario: 'La dirección ha sido prudente con el capital: casi sin inversión en capacidad durante una década, sin compras grandes y con la caja acumulándose [1, 9]. Esa prudencia evitó destruir valor en la mala época (FY2016-FY2021) y explica que el ROIC suba al ampliarse el margen sin capital nuevo. La prueba está en marcha: el 4T FY26 demuestra que la capacidad añadida (Jacintoport, +335.000 pies², naves en Houston y Ohio) ya convierte la cartera en ventas, y el plan llega a ≈ 3,2 M de pies² en un año, con una nave de 275.000 pies² en el 3T FY27 y una fábrica propia en estudio [3]. El riesgo es sobredimensionarse para un ciclo que puede no durar. El dividendo plano y la ausencia de recompras son coherentes con una caja que en parte es de los clientes.',
    confianza: 'Alta',
  },
  negocio: {
    segmentos,
    geografias: [
      { nombre: 'Estados Unidos', peso_pct: 81.7 },
      { nombre: 'Canadá', peso_pct: 9.0 },
      { nombre: 'Oriente Medio y África', peso_pct: 4.1 },
      { nombre: 'Europa', peso_pct: 2.7 },
      { nombre: 'Asia-Pacífico', peso_pct: 2.3 },
      { nombre: 'México, Centroamérica y Sudamérica', peso_pct: 0.2 },
    ],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Cartera de pedidos', valor_anterior: '1.400 M USD (sep-25)', valor_actual: '2.700 M USD (sep-26)', variacion: '+96 %', comentario: '1.300 M se facturan en FY2027 (50 %); petróleo, gas y petroquímica 38 %, utilities 23 %, comercial (sobre todo centros de datos) 35 % [1, 3].' },
      { kpi: 'Pedidos (bookings)', valor_anterior: '1.200 M (FY2025)', valor_actual: '2.600 M (FY2026)', variacion: '+124 %', comentario: '710 M en el 4T con dos mega pedidos: GNL ≈ 250 M y centro de datos ≈ 85 M; pedidos/ventas de 2,0 veces en el año [2].' },
      { kpi: 'Pedidos de centros de datos', valor_anterior: '—', valor_actual: '> 900 M (FY2026)', variacion: '—', comentario: 'Incluye un mega pedido de más de 400 M (3T); menos ingeniería a medida que el resto de la cartera [1].' },
      { kpi: 'Margen bruto', valor_anterior: '29,4 % (FY2025)', valor_actual: '31,3 % (FY2026)', variacion: '+1,9 puntos', comentario: 'Base sin cierres de proyecto ≈ 28 % en FY2025 y ≈ 30 % en FY2026; 34,9 % en el 4T [2, 3].' },
      { kpi: 'Ventas de pedidos del propio trimestre', valor_anterior: '≈ 40 M por trimestre (2023-2024)', valor_actual: '75-80 M por trimestre', variacion: '≈ ×2', comentario: 'Pedidos que se fabrican y facturan en el mismo trimestre [3].' },
      { kpi: 'Empleados', valor_anterior: '3.143 fijos (sep-25)', valor_actual: '3.311 fijos (sep-26)', variacion: '+5,3 %', comentario: 'EE. UU., Canadá y Reino Unido; sin sindicatos; más competencia por mano de obra cualificada [1, 3].' },
    ],
    confianza: 'Alta',
  },
  fuentes: fA,
  huecos: [
    { seccion: 'trimestres', campo: 'crecimiento_pct de 1T FY25 a 3T FY25', tipo: 'Complemento', intentos: '1) Notas de resultados de FY2025: solo dan el trimestre comparable en importes de FY2026; 2) 10-Q de FY2024 no descargados; 3) XBRL trimestral: sin el año anterior a mano', decision: 'Omitido' },
    { seccion: 'trimestres', campo: 'vs_consenso de 1T FY25 a 4T FY25', tipo: 'Complemento', intentos: '1) Notas de resultados: sin consenso; 2) Yahoo earningsHistory: solo los cuatro últimos trimestres; 3) MarketScreener: sin histórico de sorpresas', decision: 'Omitido' },
    { seccion: 'balance', campo: 'vencimientos', tipo: 'Complemento', intentos: '1) 10-K FY2026, nota de deuda: sin deuda; 2) nota de resultados: sin deuda; 3) no aplica', decision: 'Omitido' },
  ],
};
guarda('A', A);

// ================================================================ B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Form 10-K FY2025, «Business»: productos, mercados, competencia (ABB, Eaton, Schneider, Siemens), materias primas y cartera', editor: 'Powell Industries, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2025-11-19', url: `${E8}/000008042025000152/powl-20250930.htm` },
  { id: 2, titulo: 'Medium Voltage Switchgear Market Size & Share 2026-2035: 17.800 M USD en 2025, 19.660 M en 2026, 40.250 M en 2035 (8,3 % anual); Norteamérica 3.920 M en 2025; cinco primeros, 55 %', editor: 'Global Market Insights', tipo: 'Sectorial', fecha: '2026-09', url: 'https://www.gminsights.com/industry-analysis/medium-voltage-switchgear-market' },
  { id: 3, titulo: 'E-House Market Size and Share: 1.700 M USD en 2025, 1.800 M en 2026, 2.400 M en 2031 (5,86 % anual); concentración media', editor: 'Mordor Intelligence', tipo: 'Sectorial', fecha: '2026', url: 'https://www.mordorintelligence.com/industry-reports/e-house-market' },
  { id: 4, titulo: 'Ventas de los últimos doce meses (quoteSummary, 18-nov-2026) y margen EBIT (ficha del 19-oct-2026) de Eaton, Schneider Electric, ABB, Vertiv, Hubbell y nVent', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-11-18', url: 'https://finance.yahoo.com' },
  { id: 5, titulo: 'Form 10-Q del 3T FY2026: mercados, pedidos de centros de datos (≈ 800 M en nueve meses), utilities (313 M) y riesgos del mercado de centros de datos', editor: 'Powell Industries, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-08-04', url: `${E8}/000008042026000107/powl-20260630.htm` },
  { id: 6, titulo: 'Why Vertiv Holdings Plunged in July (Burry, Kimi 3 y Situational Awareness hunden los valores de IA)', editor: 'The Motley Fool', tipo: 'Prensa', fecha: '2026-08-11', url: 'https://www.fool.com/investing/2026/08/11/why-vertiv-holdings-plunged-in-july/' },
  { id: 7, titulo: 'Form 10-K FY2024: historia del ciclo y estrategia de diversificación', editor: 'Powell Industries, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2024-11-20', url: `${E8}/000008042024000086/powl-20240930.htm` },
  { id: 8, titulo: 'Form 10-K FY2026: mercados, competencia, cartera, centros de datos (> 900 M de pedidos en FY2026), capacidad y riesgos', editor: 'Powell Industries, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-11-17', url: `${E8}/000008042026000143/powl-20260930.htm` },
  { id: 9, titulo: 'Vertiv Sinks 9%, GE Vernova Down 8% as Democrats Win Congress, Reviving Data Center Fears', editor: 'TIKR', tipo: 'Prensa', fecha: '2026-11-04', url: 'https://www.tikr.com/blog/vertiv-sinks-9-ge-vernova-down-8-as-democrats-win-congress-reviving-data-center-fears' },
];
const B = {
  _estado: 'completa',
  negocio: {
    descripcion: 'Powell Industries diseña, fabrica y mantiene equipos a medida para distribuir, controlar y proteger la energía eléctrica entre 480 y 38.000 voltios: salas de control eléctrico prefabricadas (PCR, E-houses), módulos, aparamenta de media tensión convencional y resistente al arco, interruptores de vacío, centros de control de motores y conductos de barras [1]. Cada pedido se diseña para un proyecto: un PCR para una planta de GNL, la subestación de una utility o la sala eléctrica de un centro de datos. Vende directamente al propietario o a la ingeniería (EPC) que construye la planta, casi siempre por concurso [1]. Tiene fábricas propias en Houston (incluido el patio de Jacintoport, con muelle para enviar salas de cientos de toneladas por barco), Ohio, Canadá (Acheson, Alberta) y Reino Unido; el 82 % de las ventas de FY2026 fue en EE. UU. y el 9 % en Canadá [8]. Servicio técnico, repuestos y modernización de equipos antiguos completan la oferta.',
    como_gana_dinero: 'Gana con proyectos de ingeniería a precio cerrado que se reconocen por grado de avance: el margen depende de lo bien que presupuesta y ejecuta, del precio que logra en el concurso y del coste del cobre, acero y aluminio (45 % de las ventas en FY2025) [1, 8]. El negocio tiene mucho apalancamiento operativo: con ventas de 400-500 M (FY2017-FY2021) el margen EBITDA fue del 0-6 %; con 1.256 M, del 21,8 % [9 de A; 8]. Los gastos generales crecen menos que las ventas (111,6 M en FY2026, 8,9 % de las ventas). Lo recurrente es poco (servicio y repuestos); el resto depende de que entren pedidos, por lo que la cartera (2.700 M, más de dos años de ventas) es el mejor indicador adelantado [8]. Cobra anticipos y factura por hitos al principio, lo que financia el circulante cuando entran pedidos [1].',
    clientes: 'La concentración por proyecto es alta: un pedido grande puede pesar mucho en un trimestre o en una fábrica, y la empresa avisa de que la pérdida de un cliente grande o la caída de un sector la afectaría [1]. No publica el peso del primer cliente (ninguno supera el 10 % de las ventas consolidadas en FY2025 ni en FY2026) [8]. En FY2026 el riesgo cambió de forma: más de 900 M de los 2.600 M de pedidos fueron de centros de datos, con un mega pedido de más de 400 M, y el segmento comercial (sobre todo centros de datos) es el 35 % de la cartera [8; 3 de A]. El poder de precios se ve en el margen: el margen bruto pasó del 15,9 % al 29,4 % entre FY2022 y FY2025 y al 31,3 % en FY2026, con precios «a la altura o por encima» de la inflación de materiales y componentes [1; 3 de A].',
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
      { driver: 'Centros de datos e IA', efecto: '+', horizonte: 'Cíclico', evidencia: 'Más de 900 M de pedidos de centros de datos en FY2026, frente a 294 M de ventas de todo el mercado comercial ese año (+65 %) [8].' },
      { driver: 'GNL y petroquímica en la costa del golfo', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Petróleo y gas, el 36 % de las ventas de FY2026; ≈ 350 M de pedidos de GNL en el 4T (uno de 250 M); la petroquímica cayó un 42 % en ventas pero sus pedidos subieron un 134 % [8; 3 de A].' },
      { driver: 'Red eléctrica y generación', efecto: '+', horizonte: 'Estructural', evidencia: 'Ventas a utilities +50 % en FY2025 (279 M) y +21 % en FY2026 (339 M); pedidos +13 % [8; 3 de A].' },
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
    ciclo: { posicion: 'Expansión', comentario: 'Pedidos récord (2.600 M en FY2026, 2,0 veces las ventas) y cartera de 2.700 M indican un ciclo en expansión, con GNL y centros de datos a la vez [8]. El sector es muy cíclico: Powell perdió dinero en FY2017-FY2018 tras la caída del petróleo de 2014-2016, apenas ganó en FY2020-FY2021 (pandemia) y multiplicó el beneficio por trece entre FY2022 y FY2025 [9 de A]. La bolsa ya descuenta un posible fin del ciclo de inversión en IA: los valores de energía para centros de datos cayeron con fuerza desde mayo y de nuevo el 4-nov, tras la victoria demócrata en el Congreso (Vertiv −9 %, GE Vernova −8 %) [6, 9].' },
    regulacion: 'No hay regulación que fije precios o márgenes. Afectan las normas técnicas (ANSI e IEC, seguridad frente al arco), el control de exportaciones y sanciones, y la política comercial: los aranceles de 2025-2026 sobre acero, aluminio y componentes encarecen la producción, aunque protegen a los fabricantes locales [1]. La ley fiscal OBBBA (julio de 2025) prorroga incentivos de 2017 y recorta otros de la ley de reducción de la inflación, con efecto aún en estudio por la empresa [1]. Para los centros de datos pesan los permisos de conexión a la red y de generación propia, que retrasan o adelantan proyectos [5].',
    tendencias: 'Tres tendencias favorecen a Powell: la electrificación de la industria y la red, los centros de datos que se construyen con generación propia «detrás del contador» (el pedido de más de 400 M es de ese tipo) y la relocalización industrial en EE. UU. [8]. Dos la amenazan: la estandarización de los equipos de centros de datos, que da ventaja a fabricantes de gran serie como Eaton, Schneider o Vertiv y reduce el valor de la ingeniería a medida, y la competencia de nuevos fabricantes de salas modulares (Eaton compró Fibrebond en 2025) [5]. La empresa reconoce en el 10-Q que los proyectos de centros de datos llevan menos ingeniería a medida y pueden cambiar la mezcla de márgenes [5].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 26.9,
    posicion: 'Fabricante independiente de referencia en salas eléctricas (PCR) y aparamenta a medida para petróleo, gas y petroquímica en Norteamérica; frente a la aparamenta de media tensión de Norteamérica (3.920 M en 2025 y ≈ 4.245 M en 2026 al 8,3 %, GMI) sus ventas de FY2026 en EE. UU. y Canadá (1.140 M) equivalen a un 26,9 %, cota alta porque Powell vende también salas, control y servicio (estimación propia) [1, 2].',
    competidores: [
      { nombre: 'Eaton', pais: 'IE/US', ticker: 'ETN', ingresos: 31984, cuota_pct: 6, margen_ebit_pct: 17.5, comentario: 'Gama completa de distribución eléctrica; compró Fibrebond (salas modulares para centros de datos) en 2025 [2, 4].' },
      { nombre: 'Schneider Electric', pais: 'FR', ticker: 'SU.PA', ingresos: 46133, cuota_pct: 16, margen_ebit_pct: 16.9, comentario: 'Líder mundial en media tensión (16 %); fuerte en centros de datos [2, 4].' },
      { nombre: 'ABB', pais: 'CH', ticker: 'ABBN.SW', ingresos: 36962, cuota_pct: 13, margen_ebit_pct: 18.8, comentario: 'Electrificación y E-houses; 13 % con Hitachi Energy en media tensión [2, 4].' },
      { nombre: 'Siemens', pais: 'DE', ticker: 'SIE.DE', ingresos: null, cuota_pct: 15, margen_ebit_pct: null, comentario: 'Infraestructura inteligente; 15 % de la media tensión mundial [2].' },
      { nombre: 'Vertiv', pais: 'US', ticker: 'VRT', ingresos: 13117, cuota_pct: null, margen_ebit_pct: 18.9, comentario: 'Energía y refrigeración para centros de datos; salas prefabricadas [4].' },
      { nombre: 'Hubbell', pais: 'US', ticker: 'HUBB', ingresos: 6594, cuota_pct: null, margen_ebit_pct: 19.8, comentario: 'Componentes para utilities y redes; menos proyectos a medida [4].' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'Cada proyecto se vende por separado; no hay efecto de red.' },
        { fuente: 'Costes de cambio', puntuacion: 2, evidencia: 'Servicio y repuestos de la base instalada y relación con EPC repetidos; pero cada proyecto nuevo sale a concurso [1].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 2, evidencia: 'Reputación de ejecución y seguridad en GNL y petroquímica; experiencia reconocida en interruptores de vacío; pocas patentes relevantes [1].' },
        { fuente: 'Ventaja en costes', puntuacion: 1, evidencia: 'Margen EBIT del 21,1 % en FY2026, algo por encima de Eaton (17,5 %) o ABB (18,8 %); en FY2017-FY2021 fue del −5 % al 4 % [4; 9 de A].' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'Patios con muelle en Houston (Jacintoport) para salas de cientos de toneladas y décadas de referencias en la costa del golfo: pocos pueden competir en esos proyectos [1].' },
      ],
    },
    amenazas: 'La amenaza principal es cíclica, no competitiva: si se frenan a la vez la inversión en centros de datos y el GNL, los márgenes del 20 % pueden volver a los del 3-6 % de FY2019-FY2022, como ya pasó tras 2014 [9 de A]. En centros de datos compite con fabricantes de gran serie (Eaton con Fibrebond, Schneider, Vertiv) que pueden ofrecer equipos más estándar y más baratos; probabilidad media [4, 5]. La tercera es de ejecución: añadir capacidad (naves alquiladas, fábrica nueva) en pleno ciclo con riesgo de sobrecostes y penalizaciones en pedidos grandes a precio cerrado [5].',
    confianza: 'Media',
  },
  historia: {
    resumen: 'William E. Powell fundó la empresa en Houston en 1947 para fabricar equipos eléctricos para la industria petrolera y petroquímica de la costa del golfo; la familia Powell sigue siendo la primera accionista (Thomas W. Powell, ≈ 18 %) [1]. Creció con los ciclos de la energía: compró negocios en Reino Unido y Canadá (Acheson, Alberta) para las arenas bituminosas, sufrió la caída del petróleo de 2014-2016 con pérdidas en FY2017-FY2018 y un margen casi nulo hasta FY2022 [7]. Desde 2016 la dirige Brett A. Cope, que diversificó hacia utilities, comercial y centros de datos. El ciclo de GNL de 2022-2024 y el de centros de datos de 2025-2026 llevaron las ventas a 1.256 M en FY2026 y el margen EBITDA al 21,8 %; en abril de 2026 hizo un split 3 × 1 [8].',
    hitos: [
      { anio: '1947', hito: 'William E. Powell funda la empresa en Houston.' },
      { anio: '2014', hito: 'Pico del ciclo petrolero; después, caída de pedidos y ventas.' },
      { anio: '2016', hito: 'Brett A. Cope, consejero delegado; la empresa entra en pérdidas (FY2017-FY2018).' },
      { anio: '2019', hito: 'Cope pasa a presidir también el consejo.' },
      { anio: '2023', hito: 'Gran pedido petroquímico y auge del GNL: el beneficio pasa de 13,7 M a 54,5 M.' },
      { anio: '2025', hito: 'Ventas de 1.104 M y beneficio de 180,7 M; compra de Remsdaq (Reino Unido).' },
      { anio: '2026', hito: 'Split 3 × 1 (abril), mega pedido de centro de datos de más de 400 M, muerte de Thomas W. Powell (septiembre) y cierre del año con ventas de 1.256 M y cartera récord de 2.700 M.' },
    ],
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Lo material para las cifras es la seguridad laboral en fábricas y patios donde se montan salas de cientos de toneladas (la empresa la incluye en el variable de los directivos) [1]. Segundo, la exposición a petróleo, gas y petroquímica (43 % de las ventas de FY2026, 51 % en FY2025), que algunos inversores excluyen, compensada por las ventas a la red eléctrica y la electrificación [1]. Tercero, el cumplimiento en exportaciones y sanciones en proyectos internacionales [1].',
    controversias: 'No se han encontrado sanciones, litigios relevantes ni incidentes graves en los últimos tres años en el 10-K de FY2025 ni en el de FY2026: la empresa declara procedimientos ordinarios sin efecto material esperado [1, 5].',
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
  { id: 5, titulo: 'Form 4 de directivos, consejeros y accionistas de POWL presentados entre el 18-nov-2025 y el 18-nov-2026 (53 presentaciones, 69,5 M USD de ventas y ninguna compra)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-11-18', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000080420&type=4' },
  { id: 6, titulo: 'Form 10-K FY2026: auditor, procedimientos legales, directivos y empleados', editor: 'Powell Industries, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-11-17', url: `${E8}/000008042026000143/powl-20260930.htm` },
  { id: 7, titulo: 'Schedule 13G de First Trust (1.937.288 acciones, 5,32 % a 30-sep-2026)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-27', url: `${E8}/000144554626008034/xslSCHEDULE_13G_X02/primary_doc.xml` },
  { id: 8, titulo: 'Conferencia de resultados del 4T FY2026 (17-nov-2026): homenaje a Thomas W. Powell, fallecido el 23-sep-2026', editor: 'Earnings Whispers (transcripción)', tipo: 'Primaria', fecha: '2026-11-17', url: 'https://www.earningswhispers.com/transcript/POWL/Q42026' },
];
const C = {
  _estado: 'completa',
  directivos: {
    equipo: [
      { nombre: 'Brett A. Cope', cargo: 'Presidente del consejo, presidente y consejero delegado', desde: '2016', participacion_pct: 1.35, trayectoria: 'Entró en 2011 como vicepresidente de ventas, director de operaciones en 2015, consejero delegado desde octubre de 2016 y presidente del consejo desde 2019 [1]. Tomó la empresa en pérdidas y la llevó a 1.256 M de ventas y 221,0 M de beneficio en FY2026, con la diversificación hacia utilities y centros de datos (50 % de las ventas frente a menos del 30 % hace cinco años) [6, 8].' },
      { nombre: 'Michael W. Metcalf', cargo: 'Vicepresidente ejecutivo y director financiero', desde: '2018', participacion_pct: null, trayectoria: 'Director financiero desde 2018 (58 años); firma las cuentas y lleva la relación con inversores [1].' },
      { nombre: 'Terry B. McKertcher', cargo: 'Vicepresidente de operaciones', desde: null, participacion_pct: null, trayectoria: 'Responsable de fábricas y ejecución de proyectos (Form 4) [5].' },
      { nombre: 'William Marshall Mauney Jr.', cargo: 'Vicepresidente de I+D', desde: null, participacion_pct: null, trayectoria: 'Dirige la I+D (15,5 M USD en FY2026, +41 %) (Form 4) [5, 6].' },
      { nombre: 'Davide Tuninetti', cargo: 'Vicepresidente y director de recursos humanos', desde: '2025', participacion_pct: null, trayectoria: 'Incorporado en 2025 (50 años) [1].' },
    ],
    historial_guidance: [],
    comentario: 'Equipo estable: Cope lleva diez años de consejero delegado y Metcalf ocho de director financiero [1]. La credibilidad es buena en ejecución (márgenes al alza seis años seguidos) y la comunicación sigue siendo cualitativa: no hay guía numérica; tras dos trimestres por debajo de lo esperado, el 4T FY26 batió de largo (BPA 2,23 frente a 1,56) y cumplió lo que dijo en agosto, que la capacidad nueva convertiría la cartera [8]. El riesgo de sucesión es real y explícito: Cope cumple 60 años, edad a la que podría jubilarse con todas sus acciones consolidadas, y el consejo le dio en julio de 2026 36.000 RSU que solo se consolidan si sigue hasta 2027-2029 [3]. No hay plan de sucesión publicado ni un número dos designado.',
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
      { nombre: 'Thomas W. Powell (familia fundadora; directo y TWP Holdings)', pct: 18.3, tipo: 'Familia fundadora', variacion: '19,1 % en dic-2025; vendió ≈ 264.000 acciones de hoy (51 M USD) en feb, mar y jun-2026 (estimación propia del porcentaje). Falleció el 23-sep-2026: el paquete pasa a su herencia [1, 5, 8].' },
      { nombre: 'BlackRock', pct: 11.4, tipo: 'Gestora', variacion: 'Dato a 30-sep-2025 [1].' },
      { nombre: 'First Trust Advisors', pct: 5.32, tipo: 'Gestora', variacion: '5,9 % a 30-sep-2025; 5,32 % a 30-sep-2026 (13G del 27-oct) [1, 7].' },
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
      { fecha: '2026-10-16', persona: 'Ping Ni (controller), a 167,14 USD', operacion: 'Venta', acciones: 700, importe: 0.12 },
    ],
    control_y_defensas: 'No hay accionista de control: la familia Powell tiene en torno al 18 %, no está en el consejo y vendió en 2026; tras la muerte de Thomas W. Powell (23-sep-2026) ese paquete pasa a su herencia, que puede vender o repartir [1, 5, 8]. Una acción, un voto. Las defensas son las clásicas de Delaware en una empresa pequeña: consejo escalonado en tres clases (cada consejero se elige cada tres años), foro exclusivo en los estatutos y presidente que es a la vez consejero delegado, compensado por un consejero coordinador independiente (Stacey) y siete de ocho consejeros independientes [1]. No hay operaciones vinculadas relevantes declaradas; el proxy describe la revisión de cualquier operación de más de 120.000 USD con consejeros o familiares [1].',
    alertas: [
      'Ventas de la familia fundadora: Thomas W. Powell vendió unos 51 M USD en 2026 (feb, mar y jun) sin plan 10b5-1 declarado; murió el 23-sep-2026 y su ≈ 18 % pasa a la herencia (posible oferta de acciones) [5, 8].',
      'Todas las operaciones de directivos y consejeros en 12 meses son ventas (69,5 M USD en total, sin una sola compra); desde el 19-oct-2026 solo una venta de 0,12 M [5].',
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
  { id: 1, titulo: 'Históricos diarios de POWL, SPY y XLI (bolsa.mjs y movimiento.mjs): precio, máximos, rentabilidades, betas y cierres de ejercicio, ajustados por el split; movimientos diarios de Vertiv, GE Vernova y Eaton', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-11-17', url: 'https://finance.yahoo.com/quote/POWL/history' },
  { id: 2, titulo: 'POWL quoteSummary: estimaciones FY2027-FY2028 (ventas y BPA, cinco y cuatro analistas), recomendaciones (1 compra fuerte, 1 compra, 2 mantener), objetivo medio 253 USD (235-275), historial de cambios de objetivo y posición corta (11,9 % del flotante)', editor: 'Yahoo Finance', tipo: 'Analistas', fecha: '2026-11-18', url: 'https://finance.yahoo.com/quote/POWL/analysis' },
  { id: 3, titulo: 'Ficha de comparables (quoteSummary): capitalización, valor empresa, ventas y EBITDA de doce meses, FCF y estimaciones de BPA y ventas de los dos próximos ejercicios', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-11-18', url: 'https://finance.yahoo.com' },
  { id: 4, titulo: 'Daily Treasury Par Yield Curve Rates 2026: 10 años al 5,10 % el 17-nov-2026', editor: 'U.S. Department of the Treasury', tipo: 'Datos de mercado', fecha: '2026-11-17', url: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve&field_tdr_date_value=2026' },
  { id: 5, titulo: 'Implied ERP by month (ERPbymonth.xlsx), noviembre de 2026: 4,41 %', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-11-01', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 6, titulo: 'nVent acquires Avail Infrastructure Solutions\' Electrical Products Group (975 M USD; ≈ 12,5 veces el EBITDA; ventas de ≈ 375 M)', editor: 'tED magazine', tipo: 'Prensa', fecha: '2025-03', url: 'https://tedmag.com/nvent-acquires-avail-infrastructure-solutions' },
  { id: 7, titulo: 'Eaton Signs Deal To Buy Fibrebond For $1.4 Billion (110 M de EBITDA ajustado estimado de 2025; ventas de ≈ 378 M)', editor: 'Pulse 2.0', tipo: 'Prensa', fecha: '2025-03-14', url: 'https://pulse2.com/eaton-signs-deal-to-buy-fibrebond-for-1-4-billion/' },
  { id: 8, titulo: 'Eaton To Buy Boyd Thermal For $9.5 Billion (22,5 veces el EBITDA ajustado previsto de 2026; ventas de 1.700 M en 2026)', editor: 'Pulse 2.0', tipo: 'Prensa', fecha: '2025-11-04', url: 'https://pulse2.com/eaton-to-buy-boyd-thermal-for-9-5-billion-expanding-data-center-liquid-cooling-and-aerospace-capabilities/' },
  { id: 9, titulo: 'Form 10-K FY2026: balance a 30-sep-2026 (efectivo 860,8 M, sin deuda) y 36.458.474 acciones en circulación a 16-nov-2026', editor: 'Powell Industries, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-11-17', url: `${E8}/000008042026000143/powl-20260930.htm` },
  { id: 10, titulo: 'POWL calendarEvents y earningsHistory: próximos resultados estimados el 2-feb-2027; BPA del 4T FY26 de 2,23 frente a 1,56 esperado', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-11-18', url: 'https://finance.yahoo.com/quote/POWL/analysis' },
  { id: 11, titulo: 'Titulares de noticias de POWL (Seeking Alpha): «GAAP EPS of $2.23 beats by $0.67, revenue of $396.71M beats by $65.32M» (16-nov), «Data Centers Risk Offsetting Electrification Growth» (2-nov), «A Record Backlog Isn\'t Enough To Make It A Buy» (14-oct)', editor: 'Seeking Alpha (RSS)', tipo: 'Prensa', fecha: '2026-11-17', url: 'https://seekingalpha.com/api/sa/combined/POWL.xml' },
  { id: 12, titulo: 'Vertiv Sinks 9%, GE Vernova Down 8% as Democrats Win Congress, Reviving Data Center Fears', editor: 'TIKR', tipo: 'Prensa', fecha: '2026-11-04', url: 'https://www.tikr.com/blog/vertiv-sinks-9-ge-vernova-down-8-as-democrats-win-congress-reviving-data-center-fears' },
  { id: 13, titulo: 'Powell Industries Announces Fourth Quarter and Full Year Fiscal 2026 Results (8-K, anexo 99.1)', editor: 'Powell Industries, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-11-16', url: `${E8}/000008042026000139/ex991-powlq4xfy2026earning.htm` },
  { id: 14, titulo: 'Form 4 de directivos y accionistas (ventas de Thomas W. Powell, del consejero delegado y del controller)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-20', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000080420&type=4' },
  { id: 15, titulo: 'Conferencia de resultados del 4T FY2026 (17-nov-2026): preguntas sobre centros de datos tras las elecciones y muerte de Thomas W. Powell', editor: 'Earnings Whispers (transcripción)', tipo: 'Primaria', fecha: '2026-11-17', url: 'https://www.earningswhispers.com/transcript/POWL/Q42026' },
];
const comps = lee('comparables.json');
const cierres = Object.fromEntries(bolsa.cierres_ejercicio.map((c) => [c.anio, c.precio_cierre]));
const D = {
  _estado: 'completa',
  identificacion: {
    nombre: 'Powell Industries, Inc.', nombre_corto: 'Powell', ticker: 'POWL', isin: 'US7391281067',
    mercado: 'Nasdaq Global Market (POWL, USD)', indice_referencia: 'S&P 500 (SPY) como referencia; Russell 2000 / S&P SmallCap 600',
    pais: 'Estados Unidos', pais_iso: 'US', sector: 'Industria', industria: 'Equipos eléctricos y componentes', sede: 'Houston (Texas)', fundacion: '1947', empleados: 3311, web: 'https://powellind.com',
    precio: 150.86, fecha_precio: '2026-11-17', acciones: 36.6, capitalizacion_publicada: 5496, free_float_pct: 79.5,
    max_52s: 322.05, min_52s: 94.02, volumen_medio_diario: '≈ 112 M USD/día (664.000 acciones, 3 meses)', proximos_resultados: '2027-02-02',
  },
  consenso: {
    guidance: 'Powell no da guía numérica. En la nota y la conferencia del 4T FY26 (16 y 17-nov-2026) la dirección espera que FY2027 sea «otro año fuerte», con el margen bruto de FY2026 (31,3 %) sostenible pese a un primer trimestre estacionalmente flojo y a un posible bache de productividad al arrancar las naves nuevas [13, 15]. De la cartera de 2.700 M, 1.300 M se facturarán en FY2027 y la mayor parte del resto en FY2028 [9, 15]. Capex de FY2027: 15-20 M más que el ritmo actual [15]. Próximos resultados (1T FY27) estimados hacia el 2-feb-2027 [10].',
    estimaciones: [
      { periodo: 'FY2027e', ingresos: 1483, ebitda: null, ebit: null, bpa: 6.817, dpa: 0.36, fuente: 'Yahoo Finance, cinco analistas, sin actualizar aún tras el 4T [2]; DPA: dividendo declarado (0,09 × 4)' },
      { periodo: 'FY2028e', ingresos: 1720, ebitda: null, ebit: null, bpa: 8.246, dpa: 0.36, fuente: 'Yahoo Finance, cuatro analistas [2]' },
    ],
    recomendaciones: { n_analistas: 4, comprar: 2, mantener: 2, vender: 0, po_medio: 253, po_min: 235, po_max: 275 },
    revisiones: 'Cuatro o cinco analistas siguen la empresa: dos recomiendan comprar y dos mantener, con un objetivo medio de 253 USD (235-275), un 68 % sobre el precio [2]. Las estimaciones de Yahoo a 18-nov (FY2027: 1.483 M y 6,82 USD; FY2028: 1.720 M y 8,25 USD) son las mismas que hace 30 y 90 días: todavía no recogen el 4T, que batió en 65 M de ventas y 0,67 USD de BPA [2, 11]. Antes de los resultados la tendencia era a la baja: JP Morgan rebajó el objetivo de 300 a 250 USD el 13-oct y Cantor de 320 a 235 en agosto [2]. Lo previsible es que suban las estimaciones de FY2027 tras el trimestre; el informe usa sus propias cifras.',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    tipo_rentabilidad: bolsa.bolsa.tipo_rentabilidad,
    rentabilidades: bolsa.bolsa.rentabilidades,
    anual: bolsa.bolsa.anual,
    beta: 1.25, volatilidad_pct: 65.8, max_drawdown_pct: -61.1, posicion_corta_pct: 11.9,
    comentario: 'Powell sigue entre las acciones que más han subido en EE. UU. a varios años: +75,5 % anual en tres años y +77,4 % en cinco, frente al +19,0 % y +10,8 % del S&P 500 [1]. En 2026 hizo un máximo de 322 USD (ajustado) en mayo, tras el mega pedido de centros de datos, y ha caído un 53,2 % hasta 150,86 USD, con un mínimo de 125,06 el 5-nov (−61 % desde el máximo) [1]. La caída es sectorial sobre todo: miedo a un frenazo de la inversión en IA (julio, septiembre, octubre) y la victoria demócrata en las elecciones de mitad de mandato (4 y 5-nov: Powell −12,4 % y −12,6 %, Vertiv −12,9 % y −14,0 %) [1, 12]. Los resultados del 4T no han cambiado la tendencia: +5,9 % el 16-nov con el mercado a −1,9 % y plana el 17-nov [1]. La beta de 2 años (1,83) sigue muy por encima de la de 5 (1,25): la acción cotiza como un valor de IA. Posición corta del 11,9 % del flotante [2].',
    contexto: {
      movimiento: { fecha: mov.fecha, var_1m_pct: mov.var_1m_pct, var_3m_pct: mov.var_3m_pct, var_6m_pct: mov.var_6m_pct, var_12m_pct: mov.var_12m_pct, dist_max_52s_pct: mov.dist_max_52s_pct, dist_min_52s_pct: mov.dist_min_52s_pct, dist_max_historico_pct: mov.dist_max_historico_pct, tendencia: mov.tendencia, volatilidad_60d_pct: mov.volatilidad_60d_pct, avisos: mov.avisos.map((a) => `${a.codigo} ${a.texto}`) },
      movimientos_fuertes: [
        { periodo: 'ene-may-2026', var_pct: 58.8, causa: 'Subida de 140 a 322 USD: pedidos récord del 1T y 2T FY26 y el mega pedido de más de 400 M para un centro de datos anunciado el 4-may [11, 13].', veredicto: 'no cambia', condicion: null },
        { periodo: 'may-jul-2026', var_pct: -33.7, causa: 'Corrección de los valores de IA en julio (Powell −8,3 % y −7,3 % el 28 y 29-jul, con Vertiv −17,3 %) y venta de Thomas W. Powell de 10 M USD el 25-jun (−9,5 % el 26-jun) [1, 14].', veredicto: 'no cambia', condicion: null },
        { periodo: 'ago-2026', var_pct: -3.8, causa: 'Resultados del 3T FY26 (3-ago): BPA 1,42 USD, 0,05 por debajo de lo esperado; llegó a caer un 14 % en la sesión del 4-ago [11].', veredicto: 'no cambia', condicion: null },
        { periodo: 'oct-2026', var_pct: -9.0, causa: 'Ventas en bloque de energía para centros de datos: −7,3 % el 14-oct y −11,5 % el 22-oct, el día en que GE Vernova cayó un 10,6 %, Vertiv un 7,8 % y Eaton un 6,3 %; sin noticia propia de Powell [1].', veredicto: 'no cambia', condicion: null },
        { periodo: 'nov-2026', var_pct: -36.8, causa: 'Peor mes de seis (mínimo del 5-nov): −12,4 % el 4-nov y −12,6 % el 5-nov tras la victoria demócrata en el Congreso, que reavivó el miedo a frenos a los centros de datos (Vertiv −9 %, GE Vernova −8 %, Eaton −7 % el 4-nov) [1, 12]. Rebote del 21 % hasta 150,86 USD, con +5,9 % el 16-nov, día de los resultados del 4T [1, 13].', veredicto: 'no cambia', condicion: null },
      ],
      noticias: [
        { fecha: '2026-06-25', tipo: 'accionista de referencia', hecho: 'Thomas W. Powell (≈ 18 %, familia fundadora, fuera del consejo) vendió 51 M USD en feb, mar y jun-2026 sin plan 10b5-1 declarado [14].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-09-23', tipo: 'accionista de referencia', hecho: 'Muere Thomas W. Powell (86 años), anunciado en la conferencia del 17-nov: su ≈ 18 % pasa a la herencia; no hay venta anunciada, pero es un posible exceso de oferta (overhang) [15].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-13', tipo: 'recomendación', hecho: 'JP Morgan mantiene sobreponderar y baja el objetivo de 300 a 250 USD; Cantor reitera neutral con 235 USD (1-oct) [2].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-16', tipo: 'directivos', hecho: 'Última venta de un directivo: el controller, 700 acciones (0,12 M USD); en 12 meses, 69,5 M USD de ventas y ninguna compra [14].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-11-04', tipo: 'demanda o regulador', hecho: 'Victoria demócrata en las elecciones de mitad de mandato: el mercado teme permisos y límites a los centros de datos; el consejero delegado dice que los proyectos financiados de los próximos tres años no cambian [12, 15].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-11-16', tipo: 'resultados', hecho: '4T FY26: ventas 396,7 M (+33 %) frente a ≈ 331 M esperados, BPA 2,23 frente a 1,56, pedidos de 710 M y cartera de 2.700 M [11, 13].', veredicto: 'no cambia', condicion: null },
        { fecha: '2027-02-02', tipo: 'resultados', hecho: 'Resultados del 1T FY27 estimados hacia el 2-feb-2027 (sin confirmar); el 1T es estacionalmente flojo [10, 15].', veredicto: 'no cambia', condicion: null },
      ],
      proximos_resultados: '2027-02-02',
      veredicto: 'no cambia',
      condicion: null,
      comentario: 'La caída del 53,2 % desde el máximo de mayo es real (el split está ajustado) y casi toda es sectorial: miedo al fin del ciclo de inversión en IA y, en noviembre, a que el nuevo Congreso frene los centros de datos; los días de mayor caída coinciden con Vertiv, GE Vernova y Eaton. Lo propio de Powell es positivo (el 4T batió de largo) y la reacción fue tibia. No hay ampliaciones, ofertas, litigios ni decisiones regulatorias con fecha; la herencia de Thomas W. Powell es un riesgo de oferta de acciones, no un hecho anunciado. Veredicto: no cambia.',
    },
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: ['FY2017', 'FY2018', 'FY2019', 'FY2020', 'FY2021', 'FY2022', 'FY2023', 'FY2024', 'FY2025', 'FY2026'].map((a) => ({ anio: a, precio_cierre: cierres[a], ev_ebitda_ntm: null, per_ntm: null, excluir: ['FY2017', 'FY2018', 'FY2021'].includes(a) })),
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
      { fecha: '2025-08', objetivo: 'Remsdaq (unidades remotas SCADA, Reino Unido)', comprador: 'Powell Industries', ev: 11.5, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '11,5 M USD en caja; múltiplos no publicados [9].' },
    ],
    confianza: 'Media',
  },
  valoracion: {
    puente: { fecha: '2026-09-30', deuda_financiera: 0, arrendamientos: 0, caja: 860.8, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 0 },
    referencia_mercado: { mercado: 'Prima implícita del S&P 500 (Damodaran), la principal', prima_implicita_pct: 4.41, fecha: '2026-11', fuente: 'Damodaran, ERPbymonth.xlsx, noviembre de 2026 [5]' },
  },
  fuentes: fD,
  huecos: [
    { seccion: 'consenso', campo: 'EBITDA y EBIT de consenso FY2027-FY2028', tipo: 'Complemento', intentos: '1) Yahoo quoteSummary: solo ventas y BPA; 2) MarketScreener: página sin actualizar tras resultados; 3) MarketBeat: datos de junio', decision: 'Omitido' },
    { seccion: 'consenso', campo: 'estimaciones posteriores al 4T FY26', tipo: 'Complemento', intentos: '1) Yahoo: mismas cifras que hace 30 días; 2) MarketBeat: página de previsiones de junio; 3) búsqueda de cambios de objetivo tras el 16-nov: sin notas publicadas a 18-nov', decision: 'Omitido' },
    { seccion: 'comparables', campo: 'ev_ebitda_ntm', tipo: 'Complemento', intentos: '1) Yahoo: sin EBITDA estimado; 2) MarketScreener: sin acceso actualizado; 3) cálculo propio: sin EBITDA de consenso homogéneo', decision: 'Omitido' },
  ],
};
guarda('D', D);

// ================================================================ E. Sentimiento
const fE = [
  { id: 1, titulo: 'Seeking Alpha: artículos y titulares sobre POWL de agosto a noviembre de 2026 (RSS: «Data Centers Risk Offsetting Electrification Growth - But Watch Closely», «A Record Backlog Isn\'t Enough To Make It A Buy», «The Market May Be Underestimating The Recovery», «The Next Phase Is Turning Power Orders Into Earnings», «Bull Trap Over»…)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-11-17', url: 'https://seekingalpha.com/api/sa/combined/POWL.xml' },
  { id: 2, titulo: 'Stocktwits, flujo de mensajes de $POWL (30 últimos, 16 y 17-nov-2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-11-17', url: 'https://api.stocktwits.com/api/2/streams/symbol/POWL.json' },
];
const E = {
  _estado: 'completa',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Seeking Alpha (artículos de autores)', fecha: '2026-11', n_comentarios: 12, tono: 'Dividido', resumen: 'Entre septiembre y noviembre alternan «el mercado subestima la recuperación» y «convertir pedidos en beneficio» con «una cartera récord no basta» (14-oct) y «los centros de datos pueden restar al crecimiento de la electrificación» (2-nov); tras el 4T solo hay titulares de resultados [1].' },
      { plataforma: 'Stocktwits ($POWL)', fecha: '2026-11', n_comentarios: 30, tono: 'Positivo', resumen: 'Euforia con las cifras del 4T («nunca he visto unos resultados mejores frente a lo esperado», caja de 861 M sin deuda, margen del 34,9 %) mezclada con extrañeza porque la acción no sube y con la idea de que se mueve con Nvidia y no con sus cifras [2].' },
    ],
    temas: [
      { tema: 'El 4T demuestra que la cartera se convierte en beneficio', postura: 'Alcista', peso: 'Alto', contraste: 'Cierto para el 4T (BPA 2,23 frente a 1,56), pero 230 pb del margen fueron cierres de proyecto y el 1T es estacionalmente flojo [2 de A, 3 de A].' },
      { tema: 'Cotiza como valor de IA: sube y baja con Nvidia y Vertiv', postura: 'Bajista', peso: 'Alto', contraste: 'Cierto en el precio (beta de 2 años 1,83; caídas del 4 y 5-nov con Vertiv); en el negocio, centros de datos ≈ 23 % de las ventas de FY2026 y ≈ 35 % de la cartera.' },
      { tema: 'Caja sin deuda (861 M)', postura: 'Alcista', peso: 'Medio', contraste: 'Unos 446 M son anticipos netos de clientes que se consumirán al fabricar: no es caja libre.' },
      { tema: 'Riesgo político para los centros de datos tras las elecciones', postura: 'Dividida', peso: 'Medio', contraste: 'Sin medidas concretas aún; la dirección dice que los proyectos financiados de tres años siguen.' },
    ],
    lectura: 'El sentimiento de los particulares ha mejorado con el 4T y roza la euforia en Stocktwits, mientras los autores de Seeking Alpha siguen divididos y el precio apenas reaccionó [1, 2]. Esa distancia entre cifras y precio es la misma que ve el informe: el mercado descuenta el ciclo de IA, no el trimestre. No es capitulación ni euforia generalizada. Ninguna cifra del informe sale de aquí.',
    confianza: 'Baja',
  },
  fuentes: fE,
  huecos: [
    { seccion: 'sentimiento', campo: 'Reddit y foros de comentarios', tipo: 'Complemento', intentos: '1) Reddit: 403; 2) comentarios de Seeking Alpha: tras registro; 3) MarketBeat: sin hilos con debate', decision: 'Omitido' },
  ],
};
guarda('E', E);
console.log('Notas A-E escritas.');
