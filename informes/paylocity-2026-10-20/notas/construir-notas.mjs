// Escribe las notas A-E de Paylocity (corte 2026-10-20; precio del cierre del 19-oct) a partir de los documentos de notas/docs
// (EDGAR), del XBRL de la SEC (cuentas-xbrl.json), de bolsa.json, de yahoo-datos.json (Yahoo quoteSummary del 20-oct-2026,
// ≈ 15:44 UTC, sesión abierta) y de la ficha sectorial de nóminas y HCM (15-oct-2026). Cada nota cita solo con [n] de su lista.
// Ejecutar: node informes/paylocity-2026-10-20/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const raiz = path.join(dir, '..', '..', '..');
const lee = (f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const r1 = (x) => (x == null ? null : Math.round(x * 10) / 10);
const r2 = (x) => (x == null ? null : Math.round(x * 100) / 100);
const n2 = (x) => String(x).replace('.', ',');
const X = lee('cuentas-xbrl.json');
const B = lee('bolsa.json');
const Y = lee('yahoo-datos.json').datos;
const SEC = JSON.parse(fs.readFileSync(path.join(raiz, 'sectores', 'nominas-rrhh-2026-10-15-comparables.json'), 'utf8'));
const ED = 'https://www.sec.gov/Archives/edgar/data/1591698';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Form 10-K del ejercicio FY2026 (cerrado el 30-jun-2026): cuentas, clientes, retención, competencia, fondos de clientes, recompras, contratos diferidos', editor: 'Paylocity Holding Corporation (SEC)', tipo: 'Primaria', fecha: '2026-08-05', url: `${ED}/000159169826000069/pcty-20260630.htm` },
  { id: 2, titulo: 'Paylocity Announces Fourth Quarter and Fiscal 2026 Financial Results (conciliación GAAP-ajustado, guía FY2027)', editor: 'Paylocity (SEC, 8-K, anexo 99.1)', tipo: 'Primaria', fecha: '2026-08-04', url: `${ED}/000159169826000066/pcty-20260804xex991.htm` },
  { id: 3, titulo: 'Paylocity Announces Fourth Quarter and Fiscal 2025 Financial Results (guía FY2026)', editor: 'Paylocity (SEC, 8-K, anexo 99.1)', tipo: 'Primaria', fecha: '2025-08-05', url: `${ED}/000159169825000086/pcty-20250805xex991.htm` },
  { id: 4, titulo: 'Notas de resultados anuales FY2022, FY2023 y FY2024 (intereses de fondos de clientes, pagos en acciones, guías)', editor: 'Paylocity (SEC, 8-K, anexo 99.1)', tipo: 'Primaria', fecha: '2024-08-01', url: `${ED}/000159169824000149/pcty-20240801xex991.htm` },
  { id: 5, titulo: 'Notas de resultados del 1T, 2T y 3T FY2026 (4-nov-2025, 5-feb-2026, 7-may-2026; objetivos a largo plazo del 4-nov-2025)', editor: 'Paylocity (SEC, 8-K, anexo 99.1)', tipo: 'Primaria', fecha: '2026-05-07', url: `${ED}/000159169826000036/pcty-20260507xex991.htm` },
  { id: 6, titulo: 'Notas de resultados del 1T, 2T y 3T FY2025', editor: 'Paylocity (SEC, 8-K, anexo 99.1)', tipo: 'Primaria', fecha: '2025-05-01', url: `${ED}/000159169825000049/pcty-20250501xex991.htm` },
  { id: 7, titulo: 'XBRL company facts de Paylocity (software activado, pagos en acciones, costes de contratos)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-20', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0001591698.json' },
  { id: 8, titulo: 'Paylocity (PCTY) Q4 2026 Earnings Call Transcript (saldo medio de fondos 3.400-3.500 M, rentabilidad ≈ 3 %, bajadas de tipos en la guía, plantillas planas)', editor: 'Webull (transcripción)', tipo: 'Prensa', fecha: '2026-08-05', url: 'https://www.webull.com/news/15386993148584960' },
  { id: 9, titulo: 'Form 10-Q del 3T FY2026 (31-mar-2026)', editor: 'Paylocity (SEC)', tipo: 'Primaria', fecha: '2026-05-08', url: `${ED}/000159169826000037/pcty-20260331.htm` },
  { id: 10, titulo: 'Form 8-K: línea de crédito renovada de 1.750 M USD hasta septiembre de 2031', editor: 'Paylocity (SEC)', tipo: 'Primaria', fecha: '2026-09-17', url: `${ED}/000159169826000131/pcty-20260917.htm` },
  { id: 11, titulo: 'Paylocity Announces First Quarter Fiscal 2026 Results (objetivos financieros a largo plazo actualizados)', editor: 'Paylocity (SEC, 8-K, anexo 99.1)', tipo: 'Primaria', fecha: '2025-11-04', url: `${ED}/000159169825000112/pcty-20251104xex991.htm` },
];

const anios = ['FY2017', 'FY2018', 'FY2019', 'FY2020', 'FY2021', 'FY2022', 'FY2023', 'FY2024', 'FY2025', 'FY2026'];
const GFIN = { FY2025: 13.1, FY2026: 5.8 };
const cuenta = X.financieros.cuenta.filter((c) => anios.includes(c.periodo)).map((c) => {
  const o = { ...c, gastos_financieros: GFIN[c.periodo] ?? null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, dpa: 0, dpa_extraordinario: 0 };
  delete o.fin; return o;
});
// Deuda: línea de crédito (100 M en FY2020, 0 en FY2021-FY2024, 162,5 en FY2025, 81,25 en FY2026) [1, 7]. Arrendamientos
// operativos fuera (US GAAP: su gasto ya está en el EBITDA). Caja = caja corporativa (sin fondos de clientes).
const DEUDA = { FY2017: 0, FY2018: 0, FY2019: 0, FY2020: 100, FY2021: 0, FY2022: 0, FY2023: 0, FY2024: 0, FY2025: 162.5, FY2026: 81.3 };
const balance = X.balance.historico.filter((b) => anios.includes(b.periodo)).map((b) => {
  const o = { ...b, deuda_financiera: DEUDA[b.periodo], arrendamientos: 0, existencias: 0, minoritarios: 0, activos_contrato: null, pasivos_contrato: b.pasivos_contrato ?? null };
  delete o.fin; return o;
});
// Capex = inmovilizado material + software activado (PaymentsToDevelopSoftware) [7]. Los costes de contratos activados
// (comisiones e implantación) no van aquí: el DCF suma su aumento neto al capex (explicado en la nota).
const SOFT = { FY2017: 13.6, FY2018: 15.6, FY2019: 20.1, FY2020: 25.7, FY2021: 28.6, FY2022: 34.5, FY2023: 45.0, FY2024: 60.7, FY2025: 62.4, FY2026: 69.3 };
const flujos = X.flujos.historico.filter((f) => anios.includes(f.periodo)).map((f) => {
  const o = { ...f, capex: r1((f.capex ?? 0) + SOFT[f.periodo]), pagos_arrendamientos: 0, desinversiones: 0, dividendos: 0, adquisiciones: f.adquisiciones ?? 0, recompras: f.recompras ?? 0, emision_acciones: f.emision_acciones ?? 0 };
  delete o.fin; return o;
});

const trim = (p, ing, g, ebit, da, bpa, vs) => ({ periodo: p, ingresos: ing, crecimiento_pct: g, crecimiento_organico_pct: null, ebitda: r1(ebit + da), margen_ebitda_pct: r2((ebit + da) / ing * 100), bpa, vs_consenso: vs });
const A = {
  _estado: 'Completa. Cuentas del XBRL de la SEC comprobadas con el 10-K FY2026 y las notas de resultados FY2022-FY2026. Ingresos = recurrentes y otros + intereses de los fondos de clientes. Caja = caja corporativa (los fondos de clientes y sus obligaciones, 3.210 M y 3.209 M a 30-jun-2026, quedan fuera). Capex = inmovilizado + software activado. Arrendamientos operativos fuera (US GAAP). Sin dividendos.',
  financieros: {
    cuenta, ltm: null,
    cambios_perimetro: [
      { periodo: 'FY2025', descripcion: 'Airbase (gestión de gastos y cuentas a pagar), comprada el 1-oct-2024 por 320 M USD con la línea de crédito: nueve meses en la cuenta de FY2025; el fondo de comercio pasa de 109 a 343 M [1].' },
    ],
    comentario: 'Los ingresos pasaron de 635,6 M USD en FY2021 a 1.771,3 M en FY2026 (TCAC del 22,8 %), pero el ritmo se ha frenado: +38 % en FY2023, +19 % en FY2024, +14 % en FY2025 (con Airbase) y +11 % en FY2026 [1, 4]. Parte del salto de FY2023 fue de tipos: los intereses de los fondos de clientes pasaron de 5,0 M en FY2022 a 76,6 M en FY2023 y 120,8 M en FY2024, y bajaron a 120,0 M en FY2026 (6,8 % de las ventas) [4, 2]. Los ingresos recurrentes crecieron un 12,2 % en FY2026 con un 7 % más de clientes (44.400) y más ingreso por cliente [1]. El margen EBITDA GAAP subió de 15,8 % en FY2022 a 28,1 % en FY2026: apalancamiento en ventas y administración y menos pagos en acciones (del 13,2 % de las ventas en FY2023 al 8,1 % en FY2026) [2, 4].',
    ajustes: 'La empresa publica un EBITDA ajustado (654,9 M USD en FY2026, 37,0 % de las ventas) y un BPA no GAAP (8,31 USD) que excluyen los pagos en acciones y sus cotizaciones sociales (144,1 M), la amortización de intangibles comprados (21,3 M) y «otros» (costes de compras e indemnizaciones, 5,8 M), con un efecto fiscal de +14,1 M [2]. Este informe trabaja con cifras GAAP: los pagos en acciones son un coste recurrente (8,1 % de las ventas) y la empresa los compensa con recompras. Desde FY2027 los costes de contratos se amortizan en 8 años en vez de 7, lo que sube el margen EBITDA ajustado de FY2027 en 120-140 puntos básicos sin cambiar la caja [2].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      trim('1T25', 363.0, 14.0, 64.1, 21.6, 0.88, null),
      trim('2T25', 377.0, 16.0, 46.6, 25.7, 0.66, null),
      trim('3T25', 454.5, 13.0, 127.0, 26.0, 1.61, null),
      trim('4T25', 400.7, 12.0, 66.2, 26.5, 0.86, null),
      trim('1T26', 408.2, 12.5, 74.2, 27.5, 0.86, null),
      trim('2T26', 416.1, 10.4, 70.4, 27.8, 0.92, 'Superior'),
      trim('3T26', 502.3, 10.5, 157.0, 27.3, 2.05, 'Superior'),
      trim('4T26', 444.7, 11.0, 84.4, 29.2, 1.12, 'Superior'),
    ],
    ultima_presentacion: 'Trimestres fiscales (el 4T26 es abr-jun 2026); EBITDA GAAP = resultado operativo + amortizaciones y BPA GAAP diluido [2, 5, 6]. El tercer trimestre fiscal es el más fuerte por las altas de enero y los fondos de fin de año [1]. En el 4T26 (4-ago-2026) los ingresos recurrentes crecieron un 12,4 % y el BPA GAAP fue de 1,12 USD frente a 0,86 [2]. Guía de FY2027: ingresos recurrentes de 1.777-1.792 M (+8 %), totales de 1.880-1.895 M (+7 %) y EBITDA ajustado de 690-700 M; sin los intereses de fondos, 587-597 M [2]. En la conferencia, el director financiero situó el saldo medio de fondos de clientes en 3.400-3.500 M con una rentabilidad de ≈ 3 % (≈ 103 M de intereses, −14 %) y una bajada de tipos en enero y otra en marzo; supone plantillas de los clientes planas en FY2027, «una ligera degradación» frente a lo reciente [8]. Sobre la IA: las interacciones casi se duplicaron en el trimestre, los agentes son «una oportunidad incremental de monetización directa» y la empresa está «abierta» a cobrar por uso [8]. Los analistas preguntaron por el equilibrio entre clientes nuevos e ingreso por cliente, la monetización de la IA, Airbase, el cambio de vida útil y la filosofía de la guía; la dirección no concretó el crecimiento de la fuerza de ventas ni dio cifras de contratación nueva [8].',
    confianza: 'Alta',
  },
  balance: {
    historico: balance,
    vencimientos: [{ anio: 'FY2032', importe: 81.3 }],
    liquidez: 'Caja corporativa de 271,9 M USD a 30-jun-2026 y línea de crédito renovada el 17-sep-2026 por 1.750 M USD hasta septiembre de 2031 (ampliable en 875 M), con 81,25 M dispuestos; covenants: deuda neta ≤ 4 veces el EBITDA y cobertura de intereses ≥ 2 veces [1, 10].',
    rating: 'Sin rating público (sin bonos emitidos)',
    coste_deuda_pct: 6.0,
    vida_media_anios: 5.0,
    otros_pasivos: 'Los fondos de clientes (3.210,5 M USD) y las obligaciones con clientes (3.209,0 M) se compensan: es dinero de nóminas e impuestos en tránsito, no caja de la empresa; si se invierte en bonos, una subida de 100 puntos básicos restaría 16,0 M a su valor de mercado [1]. Arrendamientos operativos de 51,7 M (oficinas). Impuestos diferidos pasivos de 106,3 M, que subieron 73,8 M en FY2026 [1]. Obligaciones de contratos a plazo de 237,6 M en cuotas mínimas [1]. Sin pensiones, sin litigios materiales declarados y sin pagos aplazados de compras relevantes [1].',
    comentario: 'El balance es ligero: el circulante comercial (clientes − proveedores − ingresos diferidos) es casi nulo porque la empresa cobra por débito directo al mismo tiempo que la nómina [1]. El activo grande y no visible en el circulante son los costes de contratos activados (559,2 M USD a 30-jun-2026: comisiones e implantación), que crecen con las ventas y consumen caja (48 M netos en FY2026) [1]. La deuda neta es negativa: 81,3 M de deuda frente a 271,9 M de caja; la caja bajó desde 398,1 M por las recompras de 398,1 M de FY2026 [2].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'El flujo operativo pasó de 155 M USD en FY2022 a 533,3 M en FY2026 (30,1 % de las ventas) y el flujo libre de la empresa (operativo − software activado − inmovilizado) a 427,8 M (24,2 %); sin los intereses de los fondos, 307,8 M [2]. Dos ajustes hacen falta: el flujo operativo ya resta el aumento de los costes de contratos (47,9 M en FY2026, 62,9 M en FY2025 y 70,3 M en FY2024), y no resta los pagos en acciones (138,7 M), que la empresa compensa con recompras (398,1 M en FY2026) [2]. El capex (inmovilizado + software activado) fue de 105,5 M (6,0 % de las ventas); la mayor parte es desarrollo de producto, que crece con la plataforma [1, 7].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'KPMG LLP', anios_auditor: 13, opinion: 'Favorable (sin salvedades) en FY2026, también sobre el control interno [1]',
    comentario: 'Las cuentas son limpias y sencillas (un solo segmento, sin deterioros), pero tres partidas pesan. (1) Pagos en acciones: 138,7 M USD en FY2026 (7,8 % de las ventas; 144,1 M con cotizaciones), por debajo del 13,2 % de FY2023; el objetivo a largo plazo de la empresa es el 5 % [2, 11]. (2) Activaciones: 69,3 M de software y 177,1 M de costes de contratos en FY2026, con una amortización de 70,5 M y 128,8 M; alargar la vida de los contratos de 7 a 8 años sube el margen de FY2027 sin cambiar la caja [1, 2]. (3) Tipo impositivo del 30,4 % en FY2026 (26,5 % en FY2025) por el déficit fiscal de los pagos en acciones al bajar la cotización (beneficio fiscal de −69,3 M) [7]. Los indicadores del motor se leen con cuidado: el activo salta con los fondos de clientes al cierre de cada ejercicio, lo que distorsiona Altman y Beneish.',
    senales: [
      { senal: 'Pagos en acciones elevados', nivel: 'Media', comentario: '7,8 % de las ventas en FY2026; el BPA no GAAP (8,31 USD) casi duplica al GAAP (4,92) [2].' },
      { senal: 'Activación de costes de contratos', nivel: 'Media', comentario: '559,2 M USD en balance; la vida pasa de 7 a 8 años desde FY2027 (+120-140 pb de margen ajustado sin caja) [1, 2].' },
      { senal: 'Ingresos por intereses de fondos de clientes', nivel: 'Media', comentario: '120,0 M USD en FY2026 (6,8 % de las ventas, casi un tercio del EBIT); dependen de los tipos (5,0 M en FY2022) [2, 4].' },
      { senal: 'Software activado', nivel: 'Baja', comentario: '69,3 M USD en FY2026; su amortización (70,5 M) va en el coste de ventas y está en línea con lo activado [2, 7].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Sin dividendo. Prioridades declaradas: inversión en producto (I+D total no GAAP de 256 M USD en FY2026, con lo activado), compras de complemento con caja y recompras: programa de 2.000 M aprobado entre abril de 2024 y abril de 2026, con 697,8 M usados (4,6 M de acciones) y ≈ 1.300 M disponibles tras el 4T26 [1, 2, 8]. Objetivos a largo plazo (4-nov-2025): ingresos de 3.000 M, EBITDA ajustado del 40-45 %, flujo libre del 25-30 % y pagos en acciones del 5 % de las ventas [11].',
    adquisiciones: [
      { anio: 'FY2025', objetivo: 'Airbase (gastos, cuentas a pagar y tarjetas)', importe: 320, ev_ebitda: null, financiacion: 'Línea de crédito (325 M), devuelta en un 75 %', resultado: 'Base de «Paylocity for Finance»; sin deterioros [1].' },
      { anio: 'FY2026', objetivo: 'Grayscale Labs (contratación con IA)', importe: 50, ev_ebitda: null, financiacion: 'Caja', resultado: 'Comprada el 6-abr-2026; 35,8 M de fondo de comercio [1].' },
      { anio: 'FY2027', objetivo: 'Aidora (gestión de bajas con IA)', importe: null, ev_ebitda: null, financiacion: 'Caja', resultado: 'Anunciada en julio de 2026; importe no publicado; resta algo de margen en FY2027 según el director financiero [8].' },
      { anio: 'FY2022', objetivo: 'Cloudsnap y Blue Marble Payroll (nómina internacional, del fundador)', importe: 108, ev_ebitda: null, financiacion: 'Caja', resultado: 'Integradas; Blue Marble era del fundador Sarowitz (operación vinculada) [1, 7].' },
    ],
    comentario: 'La dirección ha sido prudente con el capital: crecimiento casi todo orgánico, compras pequeñas pagadas con caja y sin deterioros, y desde mayo de 2024 un giro a las recompras (150 M en FY2024, 149,6 M en FY2025 y 398,1 M en FY2026, a 144,67 USD de media) que bajan las acciones diluidas de 57,0 M a 54,8 M [1, 2]. Las recompras de FY2026 se hicieron por debajo del precio de hoy; las de FY2025 (190,16 USD de media) por encima [1]. Las recompras compensan con creces la dilución de los pagos en acciones (138,7 M), pero absorben buena parte del flujo libre.',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'Ingresos recurrentes y otros', descripcion: 'Suscripciones por empleado de nómina, RR. HH., tiempo, talento, beneficios, finanzas (Airbase) y TI, más implantación.', tipo_resultado: null, historico: [{ periodo: 'FY2022', ingresos: 847.7, resultado: null }, { periodo: 'FY2023', ingresos: 1098.0, resultado: null }, { periodo: 'FY2024', ingresos: 1281.7, resultado: null }, { periodo: 'FY2025', ingresos: 1471.8, resultado: null }, { periodo: 'FY2026', ingresos: 1651.4, resultado: null }] },
      { nombre: 'Intereses de fondos de clientes', descripcion: 'Rendimiento del dinero de nóminas e impuestos que la empresa tiene en tránsito (depósitos y bonos a corto).', tipo_resultado: null, historico: [{ periodo: 'FY2022', ingresos: 5.0, resultado: null }, { periodo: 'FY2023', ingresos: 76.6, resultado: null }, { periodo: 'FY2024', ingresos: 120.8, resultado: null }, { periodo: 'FY2025', ingresos: 123.4, resultado: null }, { periodo: 'FY2026', ingresos: 120.0, resultado: null }] },
    ],
    geografias: [{ nombre: 'Estados Unidos', peso_pct: 100 }],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Clientes (sin los comprados)', valor_anterior: '41.650', valor_actual: '44.400', variacion: '+7 %', comentario: 'Media de más de 150 empleados por cliente [1].' },
      { kpi: 'Ingresos recurrentes y otros (M USD)', valor_anterior: '1.471,8', valor_actual: '1.651,4', variacion: '+12,2 %', comentario: 'Guía FY2027: 1.777-1.792 (+8 %) [2].' },
      { kpi: 'Retención anual de ingresos', valor_anterior: '> 92 %', valor_actual: '> 92 %', variacion: '=', comentario: 'Igual en FY2024-FY2026 [1].' },
      { kpi: 'Intereses de fondos de clientes (M USD)', valor_anterior: '123,4', valor_actual: '120,0', variacion: '−2,8 %', comentario: 'Guía implícita FY2027 ≈ 103 M [2, 8].' },
      { kpi: 'EBITDA ajustado sin intereses de fondos (% recurrentes)', valor_anterior: '31,2 %', valor_actual: '32,4 %', variacion: '+1,2 pp', comentario: 'Objetivo a largo plazo del EBITDA ajustado total: 40-45 % [2, 11].' },
      { kpi: 'Pagos en acciones (% ventas)', valor_anterior: '9,0 %', valor_actual: '7,8 %', variacion: '−1,2 pp', comentario: 'Objetivo a largo plazo: 5 % [2, 11].' },
    ],
    clientes: 'Unos 44.400 clientes en EE. UU. con una media de más de 150 empleados (de 10 a 5.000); ninguno supera el 1 % de los ingresos [1]. Contratos de suscripción con cuotas mínimas mensuales (237,6 M USD de obligaciones pendientes a 24 meses) y cobro por débito directo [1]. Retención anual de ingresos superior al 92 % en FY2024-FY2026 [1]. Los corredores de beneficios traen más del 25 % de la contratación nueva [8]. El poder de precios se ve en el ingreso por cliente: los recurrentes crecen un 12,2 % con un 7 % más de clientes [1]; la guía de FY2027 supone plantillas planas, así que el crecimiento vendrá de clientes nuevos y módulos [8].',
    confianza: 'Alta',
  },
  huecos: [
    { seccion: 'flujos', campo: 'aumento de los costes de contratos activados antes de FY2024', tipo: 'Complemento', intentos: '1) XBRL company facts (sin concepto anual de variación); 2) notas de resultados FY2022-FY2023 (solo FY2024-FY2026 en la de FY2026); 3) 10-K FY2026 (tabla de FY2025-FY2026)', decision: 'Omitido: el capex histórico va sin ellos y el DCF los suma' },
  ],
  fuentes: fA,
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Form 10-K FY2026: negocio, mercado direccionable (22.500 M USD; 1,3 millones de empresas de 10 a 5.000 empleados), competencia, IA', editor: 'Paylocity Holding Corporation (SEC)', tipo: 'Primaria', fecha: '2026-08-05', url: `${ED}/000159169826000069/pcty-20260630.htm` },
  { id: 2, titulo: 'Total Revenue for Payroll Services, Employer Firms (REVEF541214TAXABL), Census Bureau', editor: 'FRED (St. Louis Fed)', tipo: 'Sectorial', fecha: '2024-11', url: 'https://fred.stlouisfed.org/series/REVEF541214TAXABL' },
  { id: 3, titulo: 'Nóminas, HCM y PEO (EE. UU.): ficha sectorial corta (empleo, flotante, cobro por empleado, márgenes, comparables)', editor: 'Repositorio de análisis (sectores/nominas-rrhh-2026-10-15.md)', tipo: 'Sectorial', fecha: '2026-10-15', url: 'sectores/nominas-rrhh-2026-10-15.md' },
  { id: 4, titulo: 'ADP: Form 10-K FY2026 y nota de resultados FY2026', editor: 'Automatic Data Processing (SEC)', tipo: 'Primaria', fecha: '2026-08-05', url: 'https://www.sec.gov/Archives/edgar/data/8670/000000867026000030/adp-20260630.htm' },
  { id: 5, titulo: 'Paychex: Form 10-K del ejercicio cerrado el 31-may-2026', editor: 'Paychex (SEC)', tipo: 'Primaria', fecha: '2026-07-17', url: 'https://www.sec.gov/Archives/edgar/data/723531/000119312526307785/payx-20260531.htm' },
  { id: 6, titulo: 'Paycom: Form 10-K de 2025', editor: 'Paycom Software (SEC)', tipo: 'Primaria', fecha: '2026-02-12', url: 'https://www.sec.gov/Archives/edgar/data/1590955/000119312526059372/payc-20251231.htm' },
  { id: 7, titulo: 'Workday: datos XBRL del Form 10-K de FY2026 (enero de 2026)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-03-06', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0001327811.json' },
  { id: 8, titulo: 'All Employees, Total Private (USPRIV)', editor: 'FRED (BLS)', tipo: 'Sectorial', fecha: '2026-10', url: 'https://fred.stlouisfed.org/series/USPRIV' },
  { id: 9, titulo: 'PagerDuty and Paylocity Shares Are Soaring (rotación hacia el software tras el «SaaSpocalypse»)', editor: 'StockStory / MarketMinute', tipo: 'Prensa', fecha: '2026-07-07', url: 'https://kttc.marketminute.com/article/stockstory-2026-7-7-pagerduty-and-paylocity-shares-are-soaring-what-you-need-to-know' },
  { id: 10, titulo: 'Paycom vs. Rippling: Comparing Payroll and HR Systems', editor: 'Paycom', tipo: 'Primaria', fecha: '2026', url: 'https://www.paycom.com/compare/paycom-vs-rippling/' },
  { id: 11, titulo: 'Paylocity Q4 2026 Earnings Call Transcript (Ignite AI, agentes, cobro por uso)', editor: 'Webull (transcripción)', tipo: 'Prensa', fecha: '2026-08-05', url: 'https://www.webull.com/news/15386993148584960' },
];
const B_ = {
  _estado: 'Completa. Mercado: el direccionable que publica la empresa (22.500 M USD) y la serie del Census de servicios de nóminas; competidores con sus propias cuentas (informes del repo de ADP, Paycom y Paychex).',
  negocio: {
    descripcion: 'Paylocity vende software en la nube de nóminas y gestión de personal (HCM) a empresas medianas de EE. UU., de 10 a 5.000 empleados, con una media de más de 150 [1]. Sobre una sola base de datos de empleados ofrece nómina e impuestos, control de tiempo, contratación (con Grayscale), formación, rendimiento, beneficios, encuestas y comunicación interna (Community), y desde 2024 finanzas: gastos, cuentas a pagar y tarjetas (Airbase) [1]. Ignite AI, su capa de IA con agentes, va dentro de los flujos de trabajo [1]. Vende con fuerza de ventas propia y una red de recomendadores: asesores de planes 401(k), corredores de seguros y contables [1]. Tiene unos 44.400 clientes y 6.900 empleados, casi todos en EE. UU. [1].',
    como_gana_dinero: 'El 93 % de los ingresos son cuotas recurrentes que dependen de los módulos contratados y del número de empleados del cliente; cobra por débito directo a la vez que procesa la nómina [1]. El 7 % restante son los intereses del dinero de nóminas e impuestos que tiene en tránsito (120 M USD en FY2026), que no tienen coste y caen directos al beneficio [1]. El margen sale de la escala: el coste de servir sube menos que las cuotas, y ventas y administración bajan en porcentaje (margen EBITDA ajustado del 37 %) [1]. Es estacional: el tercer trimestre fiscal (enero-marzo) concentra altas de clientes y cierres de año [1]. Sensible al empleo de los clientes y a los tipos a corto [1].',
  },
  sector: {
    definicion: 'El mercado relevante es el software y los servicios de nóminas y HCM para empresas de 10 a 5.000 empleados en EE. UU. La empresa estima su mercado direccionable «realizado» en ≈ 22.500 M USD: 1,3 millones de empresas con 73 millones de empleados (Census 2022), suponiendo que compran la mitad de su catálogo [1]. La única serie oficial es la del Census de ingresos de las empresas de servicios de nóminas (NAICS 541214), que mide solo el núcleo externalizado y termina en 2022 [2]. Usamos el direccionable de la empresa para la cuota y la serie del Census para el crecimiento histórico.',
    tamano: '≈ 22.500 M USD de mercado direccionable realizado en 2026 (empresa) [1]; 27.589 M USD de ingresos de las empresas de servicios de nóminas en 2022 (Census) [2].',
    unidad_serie: 'millones de USD (ingresos de servicios de nóminas, Census)',
    serie: [{ anio: '2017', tamano: 21946 }, { anio: '2018', tamano: 21794 }, { anio: '2019', tamano: 23929 }, { anio: '2020', tamano: 24637 }, { anio: '2021', tamano: 26729 }, { anio: '2022', tamano: 27589 }],
    tcac_historico_pct: 4.7, tcac_previsto_pct: null, cr5_pct: null, estructura: 'Fragmentada',
    drivers: [
      { driver: 'Empleo privado de EE. UU. (empleados por cliente)', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Cobro por empleado; empleo privado +0,5 % interanual a sept-2026 [8, 3]; la guía de FY2027 supone plantillas planas [11].' },
      { driver: 'Tipos de interés a corto (fondos de clientes)', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Intereses de fondos de 5,0 M USD en FY2022 frente a 120,0 M en FY2026 [1, 3].' },
      { driver: 'Paso de proveedores antiguos y regionales a plataformas en la nube', efecto: '+', horizonte: 'Estructural', evidencia: 'Paylocity sirve 44.400 de 1,3 millones de empresas objetivo (3,4 %) [1].' },
      { driver: 'Más módulos por cliente (finanzas, TI, IA)', efecto: '+', horizonte: 'Estructural', evidencia: 'Recurrentes +12,2 % con clientes +7 % en FY2026 [1].' },
      { driver: 'IA que reduce plantillas administrativas y abarata la entrada de rivales', efecto: '−', horizonte: 'Estructural', evidencia: 'Venta de software de 2026 por miedo a la IA («SaaSpocalypse») [9]; la empresa estudia cobrar por uso [11].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 4, justificacion: 'Mercado fragmentado con ADP, Paychex-Paycor, Paycom, Dayforce, UKG y Rippling; retención del 92 % [1, 10].' },
      { fuerza: 'Poder de los clientes', intensidad: 2, justificacion: 'Ningún cliente supera el 1 % de los ingresos; cambiar de nómina es costoso y arriesgado [1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 1, justificacion: 'Nube pública y bancos para ACH; el coste de ventas es el 31 % de los ingresos [1].' },
      { fuerza: 'Amenaza de entrada', intensidad: 3, justificacion: 'Rippling, Deel y Gusto entran con capital riesgo; la complejidad fiscal de miles de jurisdicciones frena [3, 10].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'Agentes de IA y ERP con nómina propia; la nómina es regulada y exige responsabilidad [1, 3].' },
    ],
    ciclo: { posicion: 'Madurez del ciclo', comentario: 'El empleo privado crece poco (+0,5 % interanual a sept-2026) y los tipos a corto siguen en el 4 % (letra a 3 meses 4,27 % el 19-oct-2026), así que los dos motores cíclicos están arriba y pueden bajar [8, 3]. En 2020 los clientes recortaron plantillas: los ingresos de Paylocity crecieron solo un 13 % en FY2021 frente al 20 % de FY2020, y los intereses de fondos cayeron casi a cero [1]. En 2022-2023 la subida de tipos multiplicó por 15 los intereses de fondos [1].' },
    regulacion: 'La nómina depende de leyes fiscales y laborales federales, estatales y locales que cambian a menudo (impuestos de nómina, salario mínimo, bajas pagadas, ACA), lo que es a la vez coste y barrera de entrada [1]. Privacidad y ciberseguridad (normas de la SEC sobre incidentes desde 2023) y nuevas leyes de IA en contratación (Nueva York, Colorado) obligan a auditar los algoritmos de selección, que Paylocity vende desde la compra de Grayscale [1, 3].',
    tendencias: 'Tres tendencias: plataformas únicas para RR. HH., finanzas y TI (Paylocity añadió Airbase en 2024 y Rippling compite con ese modelo) [1, 10]; IA con agentes dentro de la nómina y la contratación, que la empresa cobra o cobrará aparte y que puede reducir el número de empleados administrativos de los clientes [11]; y el miedo del mercado a que la IA abarate el software por usuario, que hundió al sector en el primer semestre de 2026 [9]. Paylocity gana con la primera y está expuesta a las otras dos.',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 7.3,
    posicion: 'Proveedor mediano de HCM en la nube para empresas de 10 a 5.000 empleados en EE. UU.: sus ingresos recurrentes (1.651 M USD) son ≈ 7,3 % de su mercado direccionable realizado de 22.500 M (estimación propia) [1]. Por ingresos, detrás de ADP (21.947 M), Workday (9.552 M), Paychex con Paycor (6.512 M) y Paycom (2.052 M) [4, 5, 6, 7].',
    competidores: [
      { nombre: 'Automatic Data Processing (ADP)', pais: 'EE. UU.', ticker: 'ADP', ingresos: 21947, cuota_pct: null, margen_ebit_pct: 26.1, comentario: 'Líder en todos los tamaños; Workforce Now compite de frente en medianas [4].' },
      { nombre: 'Paychex (con Paycor)', pais: 'EE. UU.', ticker: 'PAYX', ingresos: 6512, cuota_pct: null, margen_ebit_pct: 38.6, comentario: 'Pymes y, con Paycor (2025), medianas [5].' },
      { nombre: 'Paycom Software', pais: 'EE. UU.', ticker: 'PAYC', ingresos: 2052, cuota_pct: null, margen_ebit_pct: 27.6, comentario: 'Modelo casi idéntico (medianas, cobro por empleado, Beti) [6].' },
      { nombre: 'Workday', pais: 'EE. UU.', ticker: 'WDAY', ingresos: 9552, cuota_pct: null, margen_ebit_pct: 7.5, comentario: 'Grandes empresas; compite en la parte alta (más de 1.000 empleados) [7].' },
      { nombre: 'Dayforce', pais: 'EE. UU.', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Excluida de bolsa por Thoma Bravo en 2026 [1].' },
      { nombre: 'Rippling', pais: 'EE. UU.', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Privada con capital riesgo; RR. HH., TI y finanzas en una plataforma [10].' },
      { nombre: 'UKG (Ultimate Kronos Group)', pais: 'EE. UU.', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Privada (Hellman & Friedman); tiempo y nómina para medianas y grandes [1].' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'Red de recomendadores (corredores, más del 25 % de las ventas nuevas) y cientos de integraciones, sin efecto de red entre clientes [1].' },
        { fuente: 'Costes de cambio', puntuacion: 4, evidencia: 'Retención anual de ingresos superior al 92 % tres años seguidos; cambiar de nómina implica riesgo de errores fiscales [1].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 2, evidencia: 'Sin patentes; marca reconocida en medianas («Great Place To Work») [1].' },
        { fuente: 'Ventaja en costes', puntuacion: 2, evidencia: 'Margen EBITDA ajustado del 37 % frente al 44 % de Paycom y el 46 % de Paychex: no es el más eficiente [2, 3].' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'Cumplimiento fiscal en miles de jurisdicciones y 44.400 clientes; un entrante necesita años [1].' },
      ],
    },
    amenazas: 'Tres amenazas, de más a menos probable. (1) La IA reduce los empleados administrativos de los clientes y presiona el precio por empleado: probabilidad media, efecto gradual en el volumen [11]. (2) Rivales financiados (Rippling) y los grandes (ADP, Paychex con Paycor) bajan precios en medianas: la retención del 92 % es la señal [1, 10]. (3) Una caída del empleo y de los tipos a la vez, como en 2020, reduciría a la vez cuotas e intereses de fondos [1].',
    confianza: 'Media',
  },
  historia: {
    resumen: 'Steven Sarowitz fundó Paylocity en 1997 en Illinois como proveedor de nóminas; en 2007 entró Steven Beauchamp, que venía de Paychex, como consejero delegado y llevó la empresa a la nube y a ofrecer HCM completo [1]. Salió al Nasdaq en marzo de 2014 [1]. Creció con un producto propio y compras pequeñas (VidGrid, Samepage, Cloudsnap, Blue Marble) y en 2024 compró Airbase para entrar en finanzas [1]. En 2022 Toby Williams pasó de director financiero a codirector general y en agosto de 2024 a consejero delegado único; Beauchamp es presidente ejecutivo [1]. El fundador conserva ≈ 15 % del capital [1].',
    hitos: [
      { anio: '1997', hito: 'Steven Sarowitz funda Paylocity [1].' },
      { anio: '2007', hito: 'Steven Beauchamp, de Paychex, consejero delegado [1].' },
      { anio: '2014', hito: 'Salida a bolsa en el Nasdaq [1].' },
      { anio: '2021', hito: 'Compra de Blue Marble Payroll (nómina internacional) y Cloudsnap [1].' },
      { anio: '2022', hito: 'Toby Williams, codirector general [1].' },
      { anio: '2024', hito: 'Compra de Airbase (finanzas) y primer programa de recompras [1].' },
      { anio: '2025', hito: 'Objetivos a largo plazo: 3.000 M de ingresos y EBITDA ajustado del 40-45 % [1].' },
      { anio: '2026', hito: 'Ignite AI, compras de Grayscale y Aidora y nueva línea de crédito de 1.750 M [1].' },
    ],
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Lo material es la seguridad de los datos: la empresa guarda datos fiscales, bancarios y personales de millones de empleados de sus clientes y mueve 3.200 M USD de fondos; declara incidentes no materiales en el pasado y certificación ISO 27001 y SOC 1/SOC 2 [1]. Segundo, la IA en contratación, con leyes que exigen auditar sesgos [1]. Tercero, el capital humano: 6.900 empleados y pagos en acciones del 7,8 % de las ventas [1].',
    controversias: 'Sin sanciones ni litigios materiales en los tres últimos años según el 10-K FY2026; ciberincidentes pasados no materiales [1].',
    confianza: 'Media',
  },
  huecos: [
    { seccion: 'esg', campo: 'calificaciones ESG publicadas', tipo: 'Complemento', intentos: '1) 10-K y proxy (no citan calificaciones); 2) web de inversores (informe de impacto sin calificación de terceros); 3) búsqueda de MSCI/Sustainalytics (sin acceso gratuito a la nota)', decision: 'Omitido' },
    { seccion: 'sector', campo: 'previsión independiente del mercado y CR5', tipo: 'Complemento', intentos: '1) Census y BLS (sin previsión); 2) ficha sectorial del repo (n.d.); 3) estudios de mercado de pago', decision: 'Omitido' },
  ],
  fuentes: fB,
};
guarda('B', B_);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Proxy statement de 2025 (DEF 14A): consejo, comisiones, remuneración, participaciones', editor: 'Paylocity Holding Corporation (SEC)', tipo: 'Primaria', fecha: '2025-10-23', url: `${ED}/000159169825000102/pcty-20251021.htm` },
  { id: 2, titulo: 'Form 8-K: resultados de la junta del 4-dic-2025 (consejeros, voto consultivo de remuneración, plan de acciones)', editor: 'Paylocity (SEC)', tipo: 'Primaria', fecha: '2025-12-05', url: `${ED}/000159169825000132/pcty-20251204.htm` },
  { id: 3, titulo: 'Form 8-K: Craig Conway no se presenta a la reelección (junta prevista el 3-dic-2026)', editor: 'Paylocity (SEC)', tipo: 'Primaria', fecha: '2026-08-21', url: `${ED}/000159169826000127/pcty-20260820.htm` },
  { id: 4, titulo: 'Form 4 de directivos y consejeros (form4.mjs), 20-oct-2025 a 20-oct-2026', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-20', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001591698&type=4' },
  { id: 5, titulo: 'Notas de resultados anuales FY2022-FY2026 (guías y resultados)', editor: 'Paylocity (SEC, 8-K, anexo 99.1)', tipo: 'Primaria', fecha: '2026-08-04', url: `${ED}/000159169826000066/pcty-20260804xex991.htm` },
  { id: 6, titulo: 'Form 10-K FY2026 (acciones en circulación, recompras)', editor: 'Paylocity Holding Corporation (SEC)', tipo: 'Primaria', fecha: '2026-08-05', url: `${ED}/000159169826000069/pcty-20260630.htm` },
];
const C = {
  _estado: 'Completa con el proxy de 2025 (el de 2026 se publicará hacia el 22-oct-2026); Form 4 de 12 meses.',
  directivos: {
    equipo: [
      { nombre: 'Toby J. Williams', cargo: 'Presidente y consejero delegado', desde: '2022', participacion_pct: 0.15, trayectoria: 'Director financiero de 2017 a 2022, codirector general de 2022 a 2024 y consejero delegado único desde agosto de 2024; antes, Ellucian y desarrollo corporativo de Paychex [1]. Con él los ingresos crecieron de 853 a 1.771 M USD y el margen EBITDA ajustado del 28 % al 37 % [5].' },
      { nombre: 'Steven R. Beauchamp', cargo: 'Presidente ejecutivo del consejo', desde: '2007', participacion_pct: 3.5, trayectoria: 'Consejero delegado de 2007 a 2022 (llevó a la empresa de nómina regional a la nube y a la bolsa); antes, vicepresidente de producto de Paychex [1].' },
      { nombre: 'Ryan Glenn', cargo: 'Director financiero', desde: '2022', participacion_pct: 0.04, trayectoria: 'En Paylocity desde 2013 (planificación financiera y relación con inversores); antes, PwC [1]. Ha guiado con prudencia: la guía anual se ha superado en FY2023, FY2025 y FY2026 [5].' },
      { nombre: 'Joshua Scutt', cargo: 'Director comercial (ventas)', desde: '2021', participacion_pct: 0.03, trayectoria: 'Veinte años en ADP (vicepresidente sénior de ventas a pymes) y NCR [1].' },
      { nombre: 'Melissa King', cargo: 'Vicepresidenta sénior de producto y tecnología', desde: '2024', participacion_pct: 0.01, trayectoria: 'Viene de Ellucian (transformación y estrategia de ingresos) [1].' },
      { nombre: 'Steven I. Sarowitz', cargo: 'Fundador y consejero', desde: '1997', participacion_pct: 15.6, trayectoria: 'Fundó la empresa en 1997; dirigió Blue Marble Payroll, que Paylocity le compró en 2021 [1].' },
    ],
    historial_guidance: [
      { anio: 'FY2023', guia: 'Ingresos de 1.087-1.092 M USD y EBITDA ajustado de 314,5-318,5 M', real: '1.174,6 M y 375,2 M', cumplida: 'Sí' },
      { anio: 'FY2024', guia: 'Ingresos de 1.405-1.410 M y EBITDA ajustado de 464-468 M', real: '1.402,5 M y 505,6 M', cumplida: 'Parcial' },
      { anio: 'FY2025', guia: 'Ingresos de 1.512-1.527 M y EBITDA ajustado de 533-543 M (sin Airbase)', real: '1.595,2 M y 583,0 M (con Airbase)', cumplida: 'Sí' },
      { anio: 'FY2026', guia: 'Ingresos de 1.707-1.722 M y EBITDA ajustado de 608,5-618,5 M (subida tres veces)', real: '1.771,3 M y 654,9 M', cumplida: 'Sí' },
      { anio: 'FY2027', guia: 'Ingresos de 1.880-1.895 M y EBITDA ajustado de 690-700 M', real: 'En curso (1T el 5-nov-2026)', cumplida: 'Parcial' },
    ],
    comentario: 'Equipo estable y formado en casa o en Paychex y ADP: el consejero delegado fue director financiero, el actual director financiero lleva 13 años en la empresa y el presidente ejecutivo fue consejero delegado 15 años [1]. La sucesión de 2022-2024 (codirección y luego Williams en solitario) se anunció y se hizo sin sobresaltos [1]. La guía es prudente: en tres de los cuatro últimos ejercicios los ingresos superaron el rango [5]. El fundador (15,6 %) y el presidente (3,5 %) siguen con mucho capital, aunque los dos venden de forma programada [1, 4].',
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      { nombre: 'Steven R. Beauchamp', cargo: 'Presidente ejecutivo', tipo: 'Ejecutivo', desde: '2007', comisiones: '—' },
      { nombre: 'Toby J. Williams', cargo: 'Consejero delegado', tipo: 'Ejecutivo', desde: '2022', comisiones: '—' },
      { nombre: 'Steven I. Sarowitz', cargo: 'Fundador', tipo: 'Dominical', desde: '1997', comisiones: '—' },
      { nombre: 'Ronald V. Waters III', cargo: 'Consejero coordinador independiente', tipo: 'Independiente', desde: '2013', comisiones: 'Auditoría (presidente), Remuneración' },
      { nombre: 'Linda M. Breard', cargo: 'Consejera', tipo: 'Independiente', desde: '2023', comisiones: 'Auditoría' },
      { nombre: 'Virginia G. Breen', cargo: 'Consejera', tipo: 'Independiente', desde: '2018', comisiones: 'Auditoría, Nombramientos' },
      { nombre: 'Craig A. Conway', cargo: 'Consejero (no se presenta en 2026)', tipo: 'Independiente', desde: '2024', comisiones: 'Remuneración, Nombramientos' },
      { nombre: 'Robin L. Pederson', cargo: 'Consejero', tipo: 'Independiente', desde: '2020', comisiones: 'Remuneración (presidente)' },
      { nombre: 'Andres D. Reiner', cargo: 'Consejero', tipo: 'Independiente', desde: '2014', comisiones: 'Remuneración, Nombramientos' },
      { nombre: 'Kenneth B. Robinson', cargo: 'Consejero', tipo: 'Independiente', desde: '2020', comisiones: 'Auditoría, Nombramientos (presidente)' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: true, consejero_coordinador: true, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 1,
    voto_remuneracion_pct: 93.1, voto_remuneracion_contra_pct: 6.7, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: 'FY2025', total: 18.04, fijo: 0.68, variable_corto: 0.95, variable_largo: 16.32, ratio_salario_medio: 164 },
    remuneracion: 'El consejero delegado cobró 18,0 M USD en FY2025: 0,68 M de sueldo, 0,95 M de bonus y 16,3 M en acciones; ratio de 164 veces el empleado mediano [1]. El bonus se mide un 60 % por ingresos recurrentes y un 40 % por EBITDA ajustado (pagó el 138 % del objetivo) [1]. El variable a largo plazo mezcla acciones por tiempo, PSU ligadas a ingresos recurrentes y MSU ligadas a la rentabilidad para el accionista frente al Russell 3000 (objetivo en el percentil 60) [1]. Premia crecer con margen, no la rentabilidad sobre el capital; hay cláusula de recuperación (clawback) desde 2023 [1]. Voto consultivo de 2025: 93,1 % a favor y 6,7 % en contra [2].',
    accionistas: [
      { nombre: 'Steven I. Sarowitz (fundador)', pct: 15.6, tipo: 'Fundador', variacion: 'Ventas programadas (plan 10b5-1) de 19,2 M USD en 12 meses [4]' },
      { nombre: 'BlackRock', pct: 8.1, tipo: 'Institucional', variacion: 'Schedule 13G [1]' },
      { nombre: 'The Vanguard Group', pct: 7.6, tipo: 'Institucional', variacion: 'Schedule 13G [1]' },
      { nombre: 'T. Rowe Price Associates', pct: 7.6, tipo: 'Institucional', variacion: 'Schedule 13G [1]' },
      { nombre: 'T. Rowe Price Investment Management', pct: 7.4, tipo: 'Institucional', variacion: 'Schedule 13G [1]' },
      { nombre: 'Steven R. Beauchamp', pct: 3.5, tipo: 'Directivo', variacion: 'Ventas programadas de 6,9 M USD en 12 meses [4]' },
    ],
    insiders: [
      { fecha: '2026-10-16', persona: 'Steven I. Sarowitz (consejero)', operacion: 'Venta', acciones: 17694, importe: 2.93 },
      { fecha: '2026-10-15', persona: 'Steven R. Beauchamp (presidente ejecutivo)', operacion: 'Venta', acciones: 15000, importe: 2.48 },
      { fecha: '2025-10-20', persona: 'Sarowitz: total de 12 meses (plan 10b5-1)', operacion: 'Venta', acciones: null, importe: 19.18 },
      { fecha: '2025-10-20', persona: 'Beauchamp: total de 12 meses (plan 10b5-1)', operacion: 'Venta', acciones: null, importe: 6.91 },
      { fecha: '2025-10-20', persona: 'Williams (consejero delegado): total de 12 meses (plan 10b5-1)', operacion: 'Venta', acciones: null, importe: 2.62 },
      { fecha: '2025-10-20', persona: 'Glenn (director financiero): total de 12 meses (plan 10b5-1)', operacion: 'Venta', acciones: null, importe: 1.23 },
    ],
    control_y_defensas: 'Sin accionista de control: el fundador tiene el 15,6 % y los directivos y consejeros juntos el 19,4 % [1]. Una acción, un voto; consejo elegido cada año (sin consejo escalonado) [1]. El presidente es ejecutivo (Beauchamp, antiguo consejero delegado), compensado con un consejero coordinador independiente (Waters) y comisiones de auditoría, remuneración y nombramientos solo con independientes [1]. Operación vinculada histórica: compra de Blue Marble Payroll, del fundador, en 2021 [1]. Exclusividad de los tribunales de Delaware para pleitos de accionistas [6].',
    alertas: [
      'Ventas programadas y continuas del fundador y del presidente ejecutivo (26,1 M USD en 12 meses entre los dos), sin compras de ningún directivo [4].',
      'Craig Conway deja el consejo en la junta del 3-dic-2026, sin desacuerdo declarado [3].',
    ],
    confianza: 'Alta',
  },
  huecos: [],
  fuentes: fC,
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de PCTY, SPY e IGV (precio, rango, rentabilidades, beta, cierres de ejercicio): herramienta bolsa.mjs', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/PCTY/history' },
  { id: 2, titulo: 'Consenso de PCTY y comparables (BPA y ventas, objetivos, recomendaciones; sesión del 20-oct a las 11:44 de Nueva York): quoteSummary', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/PCTY/analysis' },
  { id: 3, titulo: 'Paylocity: titulares y alertas (recomendaciones, ventas de directivos, resultados), ago-oct 2026', editor: 'MarketBeat', tipo: 'Analistas', fecha: '2026-10-20', url: 'https://www.marketbeat.com/stocks/NASDAQ/PCTY/news/' },
  { id: 4, titulo: 'Daily Treasury Par Yield Curve Rates 2026 (10 años: 5,15 % el 19-oct-2026; 3 meses: 4,27 %)', editor: 'U.S. Department of the Treasury', tipo: 'Primaria', fecha: '2026-10-19', url: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve&field_tdr_date_value=2026' },
  { id: 5, titulo: 'Implied ERP by month (ERPbymonth.xlsx): octubre de 2026, 4,20 %', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 6, titulo: 'Comparables de nóminas, HCM y PEO (14-oct-2026), llevados al cierre del 19-oct con la capitalización de Yahoo', editor: 'Repositorio de análisis (sectores/nominas-rrhh-2026-10-15-comparables.json) y Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'sectores/nominas-rrhh-2026-10-15-comparables.json' },
  { id: 7, titulo: 'Paylocity Announces Q1 FY27 Earnings Conference Call (5-nov-2026, 16:00 hora central)', editor: 'Paylocity (GlobeNewswire, vía Finviz)', tipo: 'Primaria', fecha: '2026-10-13', url: 'https://finviz.com/news/402034/paylocity-announces-q1-fy27-earnings-conference-call' },
  { id: 8, titulo: 'Paylocity Announces Fourth Quarter and Fiscal 2026 Financial Results (guía FY2027)', editor: 'Paylocity (SEC, 8-K, anexo 99.1)', tipo: 'Primaria', fecha: '2026-08-04', url: `${ED}/000159169826000066/pcty-20260804xex991.htm` },
  { id: 9, titulo: 'Titulares de Seeking Alpha sobre PCTY (RSS, feb-oct 2026: resultados, Grayscale, Aidora, previsiones)', editor: 'Seeking Alpha', tipo: 'Prensa', fecha: '2026-10-20', url: 'https://seekingalpha.com/api/sa/combined/PCTY.xml' },
  { id: 10, titulo: 'Movimiento del precio de PCTY (1-12 meses, máximos, media de 200, avisos P1-P5): herramienta movimiento.mjs', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/PCTY/history' },
  { id: 11, titulo: 'Form 4 de directivos (form4.mjs): ventas de 32,7 M USD en 12 meses (32,1 M con planes 10b5-1), sin compras', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-20', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001591698&type=4' },
  { id: 12, titulo: 'PagerDuty and Paylocity Shares Are Soaring (rotación de semiconductores a software, julio de 2026)', editor: 'StockStory / MarketMinute', tipo: 'Prensa', fecha: '2026-07-07', url: 'https://kttc.marketminute.com/article/stockstory-2026-7-7-pagerduty-and-paylocity-shares-are-soaring-what-you-need-to-know' },
  { id: 13, titulo: 'Stocktwits: flujo de $PCTY (Citi elige a Paylocity como su favorita del software de RR. HH., 28-jul-2026; TD Cowen sube el objetivo a 177 USD; Jefferies lo baja a 135 en mayo)', editor: 'Stocktwits', tipo: 'Prensa', fecha: '2026-10-20', url: 'https://api.stocktwits.com/api/2/streams/symbol/PCTY.json' },
  { id: 14, titulo: 'Dayforce Enters into US$12.3 Billion Definitive Agreement with Thoma Bravo (anexo 99.1 del 8-K)', editor: 'Dayforce (SEC)', tipo: 'Primaria', fecha: '2025-08-21', url: 'https://www.sec.gov/Archives/edgar/data/1725057/000119312525184632/d949165dex991.htm' },
  { id: 15, titulo: 'Paychex to Acquire Paycor (anexo 99.1 del 8-K)', editor: 'Paychex (SEC)', tipo: 'Primaria', fecha: '2025-01-07', url: 'https://www.sec.gov/Archives/edgar/data/723531/000095010325000267/dp223210_ex9901.htm' },
  { id: 16, titulo: 'Dayforce, Inc.: proxy definitivo de la fusión (DEFM14A), con la opinión de Evercore (mediana de 19,1x EBITDA ajustado en HCM desde 2019)', editor: 'Dayforce (SEC)', tipo: 'Primaria', fecha: '2025-09-29', url: 'https://www.sec.gov/Archives/edgar/data/1725057/000114036125036413/ny20054883x2_defm14a.htm' },
  { id: 17, titulo: 'Ultimate Software to Be Acquired by Investor Group Led by Hellman & Friedman (anexo 99.1 del 8-K)', editor: 'Ultimate Software (SEC)', tipo: 'Primaria', fecha: '2019-02-04', url: 'https://www.sec.gov/Archives/edgar/data/1016125/000089968119000030/p19-0028_ex991.htm' },
  { id: 18, titulo: 'Form 10-K FY2026 de Paylocity (Airbase, Grayscale)', editor: 'Paylocity Holding Corporation (SEC)', tipo: 'Primaria', fecha: '2026-08-05', url: `${ED}/000159169826000069/pcty-20260630.htm` },
];
const c = Y.PCTY;
const t = Object.fromEntries(c.trend.map((x) => [x.periodo, x]));
const bol = B.bolsa;
// Comparables: los de la ficha sectorial (14-oct), llevados al cierre del 19-oct con la capitalización de Yahoo (precio de la
// sesión del 20-oct reescalado al cierre previo). PER NTM recalculado con el consenso de Yahoo (BPA ajustado, NTM ponderado).
const CORTE = new Date('2026-10-19');
const ntm = (y) => {
  const t0 = y.trend.find((x) => x.periodo === '0y'), t1 = y.trend.find((x) => x.periodo === '+1y');
  const m = Math.max(0, Math.min(12, (new Date(t0.fin) - CORTE) / (365.25 / 12 * 864e5)));
  return (m / 12) * t0.bpa + (1 - m / 12) * t1.bpa;
};
const comps = SEC.empresas.filter((e) => e.ticker !== 'PCTY').map((e) => {
  const y = Y[e.ticker];
  const capN = y.cap * (y.cierre_previo / y.precio) / 1e6, r = capN / e.capitalizacion;
  const evOld = e.capitalizacion / (1 - (e.dn_ebitda ?? 0) / e.ev_ebitda_ltm), evNew = evOld + e.capitalizacion * (r - 1), k = evNew / evOld;
  return { nombre: e.nombre, ticker: e.ticker, pais: e.pais, capitalizacion: Math.round(capN), ev_ventas: e.ev_ventas == null ? r2(evNew / (y.ventas / 1e6)) : r2(e.ev_ventas * k), ev_ebitda_ltm: r1(e.ev_ebitda_ltm * k), ev_ebitda_ntm: r1(e.ev_ebitda_ntm * k),
    per_ntm: r1(y.cierre_previo / ntm(y)), crecimiento_pct: e.crecimiento_pct, margen_ebitda_pct: e.margen_ebitda_pct, roic_pct: e.roic_pct, dn_ebitda: e.dn_ebitda, fcf_yield_pct: e.fcf_yield_pct == null ? null : r1(e.fcf_yield_pct / r) };
});
const perMed = (() => { const v = comps.map((x) => x.per_ntm).sort((a, b) => a - b); const n = v.length; return n % 2 ? v[(n - 1) / 2] : (v[n / 2 - 1] + v[n / 2]) / 2; })();
const hora = new Date(c.hora * 1000).toISOString().slice(11, 16);
const pctyNtm = r2(ntm(c));
const D = {
  _estado: `Completa. Precio de cierre del 19-oct-2026 (${B.identificacion.precio} USD); la sesión del 20-oct estaba abierta (${c.precio} USD a las ${hora} UTC). Mediana del PER NTM (ajustado) de los comparables: ${perMed}. BPA ajustado NTM del consenso para PCTY: ${pctyNtm}.`,
  _per_mediana_comparables: perMed,
  _pcty_bpa_ntm_consenso: pctyNtm,
  identificacion: {
    nombre: 'Paylocity Holding Corporation', nombre_corto: 'Paylocity', ticker: 'PCTY', isin: 'US70438V1061', mercado: 'Nasdaq Global Select Market', indice_referencia: 'S&P MidCap 400',
    pais: 'Estados Unidos', pais_iso: 'US', sector: 'Tecnologías de la información', industria: 'Software de aplicaciones', sede: 'Schaumburg (Illinois)', fundacion: '1997', empleados: 6900, web: 'https://www.paylocity.com',
    precio: B.identificacion.precio, fecha_precio: B.identificacion.fecha_precio, acciones: 53.5, capitalizacion_publicada: Math.round(c.cap * (c.cierre_previo / c.precio) / 1e6), free_float_pct: 80.6,
    max_52s: B.identificacion.max_52s, min_52s: B.identificacion.min_52s, volumen_medio_diario: `≈ ${Math.round(B.volumen_3m.importe_dia_millones)} M USD/día (3 meses)`, proximos_resultados: '2026-11-05',
  },
  consenso: {
    guidance: 'Guía de FY2027 (a 30-jun-2027), dada el 4-ago-2026: ingresos recurrentes de 1.777-1.792 M USD (+8 %), ingresos totales de 1.880-1.895 M (+7 %), EBITDA ajustado de 690-700 M y, sin los intereses de fondos, 587-597 M [8]. Incluye ≈ 103 M de intereses de fondos (saldo medio de 3.400-3.500 M al ≈ 3 %, con bajadas de tipos en enero y marzo), plantillas de clientes planas y +120-140 pb de margen por alargar la vida de los costes de contratos [8]. Para el 1T FY2027: ingresos de 439,5-444,5 M y EBITDA ajustado de 152-156 M; resultados el 5-nov-2026 [8, 7]. Objetivos a largo plazo (nov-2025): 3.000 M de ingresos, EBITDA ajustado del 40-45 %, flujo libre del 25-30 % y pagos en acciones del 5 % [8].',
    estimaciones: [
      { periodo: 'FY2027e', ingresos: Math.round(t['0y'].ventas / 1e6), ebitda: null, ebit: null, bpa: r2(t['0y'].bpa), dpa: 0, fuente: `Yahoo Finance, ${t['0y'].n} analistas; BPA no GAAP [2]` },
      { periodo: 'FY2028e', ingresos: Math.round(t['+1y'].ventas / 1e6), ebitda: null, ebit: null, bpa: r2(t['+1y'].bpa), dpa: 0, fuente: `Yahoo Finance, ${t['+1y'].n} analistas; BPA no GAAP [2]` },
    ],
    recomendaciones: { n_analistas: c.reco.strongBuy + c.reco.buy + c.reco.hold + c.reco.sell + c.reco.strongSell, comprar: c.reco.strongBuy + c.reco.buy, mantener: c.reco.hold, vender: c.reco.sell + c.reco.strongSell, po_medio: r2(c.po_medio), po_min: c.po_min, po_max: c.po_max },
    revisiones: `El BPA no GAAP de FY2027 del consenso apenas se ha movido: ${n2(r2(t['0y'].bpa_hace90))} USD hace 90 días y ${n2(r2(t['0y'].bpa))} hoy; el de FY2028, de ${n2(r2(t['+1y'].bpa_hace90))} a ${n2(r2(t['+1y'].bpa))} [2]. Los objetivos de precio suben con la acción: TD Cowen de 168 a 177 USD (20-ago), Citi «comprar» (13-ago), Bank of America reitera «comprar» (29-sep), BMO mantiene «comprar» (10-oct) y Barclays «mantener» (14-oct); en mayo Jefferies había bajado el suyo de 150 a 135 [3, 13]. Es un consenso que sigue al precio, no a cambios de beneficio. El BPA del consenso es no GAAP: excluye pagos en acciones (≈ 2,6 USD por acción antes de impuestos en FY2026) y amortización de intangibles comprados [8].`,
    base_ebitda: 'sin consenso de EBITDA (solo BPA no GAAP y ventas)', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    ...bol,
    beta: bol.beta, posicion_corta_pct: r1(c.corto_pct * 100),
    comentario: 'La acción ha ido muy por detrás del mercado: −10,6 % anual en cinco años y −5,4 % en tres frente a +12,7 % y +23,1 % del S&P 500 (SPY), con una caída máxima del 68,9 % entre noviembre de 2021 y abril de 2026 [1]. Lo explica el múltiplo: el PER sobre el BPA GAAP del año siguiente pasó de más de 100 veces en 2020-2021 a ≈ 18 en junio de 2026, mientras el beneficio se multiplicaba [1, 8]. En 2026 el miedo a que la IA abarate el software por usuario («SaaSpocalypse») la llevó a un mínimo de 92,99 USD el 10-abr; desde entonces ha subido un 79 % con la rotación hacia el software, la recomendación de Citi y unos resultados que batieron [1, 12, 13]. Beta mensual de cinco años de 0,46 (poco fiable, R² bajo); la semanal de cinco años es 1,14 y la de dos, 0,72 [1].',
    contexto: {
      movimiento: { fecha: '2026-10-20', var_1m_pct: 17.9, var_3m_pct: 41.0, var_6m_pct: 64.4, var_12m_pct: 13.3, dist_max_52s_pct: 0.0, dist_min_52s_pct: 79.1, dist_max_historico_pct: -44.3, tendencia: 'alcista', volatilidad_60d_pct: 36.0, avisos: ['P1 Subida fuerte: +41 % en tres meses', 'P2 A −0 % del máximo de 52 semanas tras subir un 41 % en tres meses'] },
      movimientos_fuertes: [
        { periodo: 'ene-feb 2026', var_pct: -20.0, causa: 'Venta del software por miedo a la IA («SaaSpocalypse»): −6,1 % el 29-ene y el 3-feb y −7,2 % el 6-feb pese a batir en el 2T26 (BPA GAAP de 0,92 USD, 0,09 sobre lo esperado) y subir la guía [1, 9, 12]. Variación aproximada del tramo, estimación propia con los cierres de Yahoo.', veredicto: 'no cambia', condicion: null },
        { periodo: 'mar-abr 2026', var_pct: -15.0, causa: 'Continuación de la venta del sector (−5,9 % el 24-mar, −7,1 % el 9-abr) hasta el mínimo de 92,99 USD el 10-abr; sin noticia propia de la empresa [1, 9]. Variación aproximada, estimación propia.', veredicto: 'no cambia', condicion: null },
        { periodo: 'jul 2026', var_pct: 36.9, causa: 'Rotación de semiconductores a software «castigado» (IGV +7 % en ocho sesiones a primeros de julio), compra de Aidora (9-jul) y Citi la elige como su favorita del software de RR. HH. antes de resultados (28-jul): de 104,53 USD el 30-jun a ≈ 137 a fin de julio [12, 13, 9].', veredicto: 'no cambia', condicion: null },
        { periodo: 'sep-oct 2026', var_pct: 17.9, causa: 'Tras los resultados de FY2026 (4-ago: BPA GAAP del 4T de 1,12 USD frente a 0,86) y la nueva línea de crédito, sube en octubre a máximos de 52 semanas con reiteraciones de «comprar» (BofA, BMO) [8, 3].', veredicto: 'no cambia', condicion: null },
      ],
      noticias: [
        { fecha: '2026-11-05', tipo: 'resultados', hecho: 'Resultados del 1T FY2027 el 5-nov-2026 tras el cierre [7].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-16', tipo: 'directivos', hecho: 'Ventas programadas (planes 10b5-1) del fundador Sarowitz (2,9 M USD el 16-oct; 19,2 M en 12 meses) y del presidente ejecutivo Beauchamp (2,5 M; 6,9 M en 12 meses); 32,7 M USD vendidos por directivos en 12 meses y ninguna compra [11, 3]. Es ≈ 1,7 % de la participación del fundador al precio de hoy.', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-14', tipo: 'recomendación', hecho: 'Barclays mantiene «mantener»; BMO (10-oct) y Bank of America (29-sep) reiteran «comprar»; objetivo medio de 20 analistas de 172,60 USD (128-250) [3, 2].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-09-17', tipo: 'ampliación o convertible', hecho: 'Línea de crédito renovada y ampliada a 1.750 M USD hasta 2031; 81,25 M dispuestos; sin emisión de acciones ni convertibles [8, 18].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-08-04', tipo: 'resultados', hecho: 'FY2026 por encima de la guía; guía de FY2027 con ingresos +7 % («algo floja» según la prensa) y menos intereses de fondos [8, 9].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-07-28', tipo: 'recomendación', hecho: 'Citi elige a Paylocity como su favorita del software de RR. HH. por la mejora del sentimiento y la bajada de las posiciones cortas [13].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-07-09', tipo: 'fusión u oferta', hecho: 'Compra de Aidora (gestión de bajas con IA), pagada con caja, importe no publicado; antes, Grayscale (abril, 50 M USD) [9, 18].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-05-10', tipo: 'recomendación', hecho: 'Jefferies baja su objetivo de 150 a 135 USD y mantiene «comprar» al revisar el software [13].', veredicto: 'no cambia', condicion: null },
      ],
      proximos_resultados: '2026-11-05',
      veredicto: 'no cambia',
      condicion: null,
      comentario: 'La acción ha subido un 79 % desde el mínimo de abril y está en máximos de 52 semanas (avisos P1 y P2), aunque aún un 44 % por debajo de su máximo de 2021 [10]. La subida tiene causa conocida: el rebote de todo el software de RR. HH. tras la venta por miedo a la IA del primer semestre, una recomendación de Citi y unos resultados de FY2026 que batieron la guía [12, 13, 8]. No hay hechos pendientes que puedan mover el precio más de un 5 % en contra aparte de los resultados del 5-nov, que no retrasan (regla 11). Las ventas de directivos son programadas y pequeñas frente a sus participaciones: no descartan.',
    },
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: B.cierres_ejercicio.filter((x) => ['FY2017', 'FY2018', 'FY2019', 'FY2020', 'FY2021', 'FY2022', 'FY2023', 'FY2024', 'FY2025', 'FY2026'].includes(x.anio)).map((x) => ({ anio: x.anio, precio_cierre: x.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: ['FY2017', 'FY2018'].includes(x.anio) })),
    comentario: 'Precio de cierre de cada ejercicio (30 de junio) de Yahoo [1]. FY2017 y FY2018 se excluyen: BPA GAAP de 0,12 y 0,70 USD (este con un beneficio fiscal) dan PER de cientos de veces. El PER sobre el BPA GAAP de los últimos 12 meses bajó de 151 veces en junio de 2021 a 21 en junio de 2026, y sobre el del año siguiente (la base de la regla a 12 meses) de 118 a 18: el mercado dejó de pagar el crecimiento del 30 % de 2019-2023 cuando bajó al 11 % y llegó el miedo a la IA [1, 8].',
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Las seis cotizadas de EE. UU. de nóminas, HCM y PEO de la ficha sectorial: Paycom (el modelo más parecido: medianas y cobro por empleado), Paychex y ADP (nómina y fondos de clientes), Workday (HCM de grandes empresas), Intuit (nómina de microempresas) y TriNet (PEO) [6]. Insperity queda fuera (margen EBITDA ≈ 0,4 % y EV/EBITDA de 64x) y Dayforce dejó de cotizar en 2026 (va en transacciones). El PER es el del consenso en base no GAAP, la misma que publica cada empresa; en GAAP los de Paycom, Workday e Intuit serían más altos [2].',
    empresas: comps,
    comentario: `Paylocity cotiza a ≈ ${n2(r1(B.identificacion.precio / pctyNtm))}x el BPA no GAAP de los próximos 12 meses del consenso, por debajo de la mediana de sus comparables (${n2(perMed)}x) y de ADP (${n2(comps.find((x) => x.ticker === 'ADP').per_ntm)}x), con más crecimiento esperado (7-8 % frente a 6-7 % de ADP y Paychex) pero menos margen [2, 6]. El descuento se explica por los pagos en acciones (en GAAP el PER sube a ≈ 27 veces) y por el miedo a que la IA reduzca el empleo administrativo de las medianas, el mismo que pesa sobre Paycom [2]. Usaríamos el PER y el EV/EBITDA de los próximos 12 meses: el EBITDA de Yahoo de los comparables no siempre resta los pagos en acciones.`,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2025-08', objetivo: 'Dayforce', comprador: 'Thoma Bravo', ev: 12300, ev_ventas: 6.32, ev_ebitda: 19.8, prima_pct: 32, excluir: false, comentario: 'EBITDA ajustado de la guía de 2025 (sin pagos en acciones); cerrada en febrero de 2026 [14, 16].' },
      { fecha: '2025-01', objetivo: 'Paycor HCM', comprador: 'Paychex', ev: 4100, ev_ventas: 6.31, ev_ebitda: null, prima_pct: 19, excluir: false, comentario: 'Rival directo en medianas; sobre «más de 650 M» de ingresos recurrentes [15].' },
      { fecha: '2019-02', objetivo: 'Ultimate Software', comprador: 'Consorcio de Hellman & Friedman', ev: 11000, ev_ventas: 10, ev_ebitda: null, prima_pct: 32, excluir: false, comentario: 'EV/ventas sobre «más de 1.100 M» de ingresos de 2018 [17].' },
      { fecha: '2024-10', objetivo: 'Airbase', comprador: 'Paylocity', ev: 320, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Software de gastos sin ingresos publicados [18].' },
      { fecha: '2026-04', objetivo: 'Grayscale Labs', comprador: 'Paylocity', ev: 50, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Contratación con IA; sin ingresos publicados [18].' },
    ],
    comentario: 'Las compras de HCM de 2025 se pagaron a unas 6,3 veces las ventas, con primas del 19-32 %, y la opinión de Evercore para Dayforce da una mediana de 19,1 veces el EBITDA ajustado de las operaciones del sector desde 2019 [14, 15, 16]. Paylocity vale hoy ≈ 4,8 veces sus ventas de FY2026: por debajo de esos precios de control. Sin accionista de control y con un consejo elegido cada año, sería comprable (el fundador tiene el 15,6 %), pero no hay ninguna señal de operación: las transacciones son referencia de valor, no catalizador.',
    confianza: 'Media',
  },
  huecos: [
    { seccion: 'consenso', campo: 'EBITDA del consenso y BPA de FY2029e', tipo: 'Complemento', intentos: '1) Yahoo quoteSummary (solo dos ejercicios y sin EBITDA); 2) MarketBeat (año en curso y siguiente); 3) MarketScreener no abre sin sesión', decision: 'Omitido' },
    { seccion: 'bolsa', campo: 'variación exacta de los tramos de ene-feb y mar-abr de 2026', tipo: 'Complemento', intentos: '1) movimiento.mjs (mayores caídas diarias); 2) bolsa.mjs (rentabilidades por periodos fijos); 3) titulares de Seeking Alpha', decision: 'Calculado y marcado como estimación' },
  ],
  fuentes: fD,
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Stocktwits, flujo de mensajes de $PCTY (may-oct 2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-20', url: 'https://api.stocktwits.com/api/2/streams/symbol/PCTY.json' },
  { id: 2, titulo: 'Seeking Alpha: artículos sobre PCTY («Paylocity Crushes Another Earnings Result, As Bull Case Forms Around Platform Growth», 12-ago-2026; «Stellar Performance Will Eventually Be Rewarded», 19-may-2026)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-08-12', url: 'https://seekingalpha.com/symbol/PCTY/analysis' },
  { id: 3, titulo: 'MarketBeat: alertas y comentarios sobre Paylocity (ago-oct 2026)', editor: 'MarketBeat', tipo: 'Foros y redes', fecha: '2026-10-20', url: 'https://www.marketbeat.com/stocks/NASDAQ/PCTY/news/' },
];
const E = {
  _estado: 'Completa. Stocktwits (30 mensajes del 7-may al 20-oct-2026), titulares de Seeking Alpha y MarketBeat; Reddit no abre (403).',
  sentimiento: {
    tono: 'Positivo', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Stocktwits ($PCTY)', fecha: '2026-10', n_comentarios: 30, tono: 'Positivo', resumen: 'Siete mensajes alcistas y uno bajista: en mayo-junio se hablaba de «zona de carga» por debajo de 100 USD; en octubre dominan los avisos de ruptura técnica y algún objetivo exagerado; se lee junto a Paycom porque las dos cobran por empleado [1].' },
      { plataforma: 'Seeking Alpha (artículos y titulares)', fecha: '2026-08', n_comentarios: 6, tono: 'Positivo', resumen: 'Artículos alcistas tras los resultados («aplasta otra vez», «el rendimiento acabará premiado», «infravalorada con potencial de rebote» en febrero); la guía de FY2027 se lee como prudente [2].' },
      { plataforma: 'MarketBeat', fecha: '2026-10', n_comentarios: 8, tono: 'Dividido', resumen: 'Alertas de máximos y de ventas de directivos (fundador y presidente) en la misma semana, sin debate de fondo [3].' },
    ],
    temas: [
      { tema: 'Rebote del software tras el miedo a la IA', postura: 'Alcista', peso: 'Alto', contraste: 'Cierto en el precio (+79 % desde abril), pero el negocio no cambió tanto: la guía de FY2027 es la más baja en años (+7 %) [1].' },
      { tema: 'Valoración barata frente al flujo de caja', postura: 'Alcista', peso: 'Medio', contraste: 'Solo en base no GAAP (≈ 17-18x el BPA ajustado); con los pagos en acciones como coste el PER es ≈ 27x [2].' },
      { tema: 'IA: amenaza al cobro por empleado', postura: 'Dividida', peso: 'Medio', contraste: 'El riesgo es real a varios años; hoy las plantillas de los clientes aún crecen y la empresa ya cobra módulos de IA [1].' },
      { tema: 'Ventas de directivos', postura: 'Bajista', peso: 'Bajo', contraste: 'Programadas (10b5-1) y pequeñas frente a sus participaciones [3].' },
    ],
    lectura: 'El sentimiento ha pasado del pesimismo de abril («zona de carga» bajo 100 USD) a un tono alcista y técnico en octubre, con la acción en máximos de 52 semanas [1]. No es euforia, pero sí un cambio rápido que ya está en el precio. Los foros no recogen el efecto de la bajada de tipos sobre los intereses de los fondos ni la diferencia entre el BPA ajustado y el GAAP, que son los dos puntos en los que este informe es más prudente que el mercado. No anticipa ningún riesgo que el informe no tenga.',
    confianza: 'Media',
  },
  huecos: [],
  fuentes: fE,
};
guarda('E', E);
console.log('Notas A-E escritas. Mediana PER comparables:', perMed, 'BPA NTM consenso PCTY:', pctyNtm);
console.log(comps.map((x) => `${x.ticker} cap ${x.capitalizacion} per ${x.per_ntm} evltm ${x.ev_ebitda_ltm}`).join('\n'));
