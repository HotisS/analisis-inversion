// Construye las notas A-E del 27-nov-2026 a partir del XBRL de la SEC (20-F), de los estados del 3T26 (6-K del 14-oct),
// de Yahoo (bolsa, consenso, comparables) y de las notas del 14-oct (solo textos cualitativos de B y C, revisados).
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const AQUI = dirname(fileURLToPath(import.meta.url));
const leer = (f) => JSON.parse(readFileSync(join(AQUI, f), 'utf8'));
const escribir = (f, o) => writeFileSync(join(AQUI, f), JSON.stringify(o, null, 1));
const X = leer('cuentas-xbrl.json');
const P = (l) => JSON.parse(readFileSync(`/tmp/claude-0/tanda-1127/asml/previo/${l}.json`, 'utf8'));
const BOLSA = leer('bolsa.json');
const COMPS = JSON.parse(readFileSync('/tmp/claude-0/tanda-1127/asml/comps.json', 'utf8'));
const r1 = (x) => Math.round(x * 10) / 10;

const ANIOS = ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'];
const DPA = { 2018: null, 2019: null, 2020: 2.75, 2021: 5.5, 2022: 5.8, 2023: 6.1, 2024: 6.4, 2025: 7.5 };

// ---------- A. Cuentas ----------
const cuenta = X.financieros.cuenta.filter((r) => ANIOS.includes(r.periodo)).map((r) => {
  const bai = r1(r.beneficio_neto + r.impuestos); // el resultado de participadas (Zeiss SMT) va bajo el impuesto en US GAAP: se lleva al financiero
  return {
    periodo: r.periodo, ingresos: r.ingresos, coste_ventas: r.coste_ventas,
    gastos_generales: r1(r.ingresos - r.coste_ventas - r.ebit), // I+D + gastos comerciales y generales
    ebitda: r.ebitda, amortizaciones: r.amortizaciones, ebit: r.ebit,
    resultado_financiero: r1(bai - r.ebit), bai, impuestos: r.impuestos, minoritarios: 0,
    beneficio_neto: r.beneficio_neto, gastos_financieros: r.gastos_financieros,
    participadas_en_ebitda: null, no_recurrentes_en_ebitda: null,
    bpa: r.bpa, dpa: DPA[r.periodo], dpa_extraordinario: 0, acciones_diluidas: r.acciones_diluidas,
  };
});
const balance = X.balance.historico.filter((r) => ANIOS.includes(r.periodo)).map((r) => ({
  periodo: r.periodo, activo_total: r.activo_total, activo_corriente: r.activo_corriente, pasivo_corriente: r.pasivo_corriente,
  pasivo_total: r.pasivo_total, fondo_comercio: r.fondo_comercio, intangibles: r.intangibles, inmovilizado_material: r.inmovilizado_material,
  existencias: r.existencias, clientes: r.clientes, proveedores: r.proveedores, activos_contrato: r.activos_contrato, pasivos_contrato: r.pasivos_contrato,
  caja: r.caja, deuda_financiera: r.deuda_financiera, arrendamientos: 0, patrimonio_neto: r.patrimonio_neto, minoritarios: 0, reservas: r.reservas,
}));
const flujos = X.flujos.historico.filter((r) => ANIOS.includes(r.periodo)).map((r) => ({
  periodo: r.periodo, flujo_operativo: r.flujo_operativo, capex: r.capex, pagos_arrendamientos: r.pagos_arrendamientos ?? 0,
  adquisiciones: r.adquisiciones ?? 0, desinversiones: 0, dividendos: r.dividendos, recompras: r.recompras,
  emision_acciones: r.emision_acciones, intereses_en_financiacion: 0,
}));
const fA = [
  { id: 1, titulo: 'Form 20-F FY2025 (estados consolidados US GAAP) y hechos XBRL de 2018-2025 (companyfacts)', editor: 'ASML / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-25', url: 'https://www.sec.gov/Archives/edgar/data/0000937966/000162828026011378/asml-20251231.htm' },
  { id: 2, titulo: 'Financial Statements US GAAP Q3 2026 (6-K, anexo 99.3): cuenta, balance y flujos de 3T25 a 3T26', editor: 'ASML / SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-14', url: 'https://www.sec.gov/Archives/edgar/data/937966/000162828026065813/financial_statementsxusx.htm' },
  { id: 3, titulo: 'ASML reports €11.7 billion total net sales and €5.0 billion net income in Q3 2026 (6-K, anexo 99.1)', editor: 'ASML / SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-14', url: 'https://www.sec.gov/Archives/edgar/data/937966/000162828026065813/pressreleasefinancialresul.htm' },
  { id: 4, titulo: 'ASML 2026 third-quarter results, presentación a inversores (6-K, anexo 99.2)', editor: 'ASML / SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-14', url: 'https://www.sec.gov/Archives/edgar/data/937966/000162828026065813/a2026_10x14xpresentation.htm' },
  { id: 5, titulo: 'ASML (ASML) Q3 2026 Earnings Call Transcript', editor: 'The Motley Fool', tipo: 'Prensa', fecha: '2026-10-14', url: 'https://www.fool.com/earnings/call-transcripts/2026/10/14/asml-asml-q3-2026-earnings-call-transcript/' },
  { id: 6, titulo: 'ASML Q3 2026: entrevista de resultados con el CEO y el CFO (transcripción)', editor: 'Earnings Whispers', tipo: 'Prensa', fecha: '2026-10-14', url: 'https://www.earningswhispers.com/transcript/ASML/Q32026' },
  { id: 7, titulo: 'ASML discloses 2026 AGM results (6-K): dividendo total de 2025 de 7,50 EUR', editor: 'ASML / SEC EDGAR', tipo: 'Primaria', fecha: '2026-04-22', url: 'https://www.sec.gov/Archives/edgar/data/937966/000162828026026703/asmldiscloses2026agmresults.htm' },
  ...P('A').fuentes.filter((f) => [3, 7, 9, 10, 15].includes(f.id)).map((f, i) => ({ ...f, id: 8 + i })),
];
// previo: 3→8 (4T25), 7→9 (presentación 4T25), 9→10 (1T26), 10→11 (2T26), 15→12 (pedidos 4T25)
const A_prev = P('A');
const A = {
  _estado: 'completa 27-nov-2026 11:20',
  negocio: {
    ...A_prev.negocio,
    descripcion: 'ASML diseña, fabrica y mantiene sistemas de litografía para fabricar chips: máquinas de ultravioleta extremo (EUV Low-NA y High-NA), de ultravioleta profundo (DUV: inmersión ArF, ArF seco, KrF e i-line), metrología e inspección (YieldStar, HMI) y el software que las controla. Sus clientes son los fabricantes de lógica (TSMC, Samsung, Intel) y de memoria (SK Hynix, Samsung, Micron). Además vende servicio y mejoras de productividad sobre la base instalada (Installed Base Management), que en el 3T26 sumó 3.288,8 M de 11.662,0 M de ventas [2]. En 2026 prevé entregar unas 65 máquinas EUV Low-NA, casi un 50 % más que las 44 de 2025, y tantas de inmersión como en 2025; para 2027 planea un 30 % más de capacidad en las dos y estudia más del 30 % adicional en 2028 [5]. Fabrica en Veldhoven, Wilton, San Diego y Taiwán, con Carl Zeiss SMT (24,9 % de ASML) como proveedor único de la óptica [1].',
    como_gana_dinero: 'Cobra máquinas muy caras con anticipos de los clientes que financian el circulante (los pasivos de contrato pasaron de 12.571 M en 2024 a 16.006 M en 2025, y los no corrientes de 3.570 M a 9.301 M solo en el 3T26) y después vende servicio y mejoras a una base instalada que paga por productividad [1, 2]. El margen bruto depende de la mezcla (EUV, inmersión y mejoras lo suben; las primeras High-NA lo bajan), del volumen que diluye los costes fijos y del precio: ASML cerró en el 3T26 subidas de precio para sus productos más críticos que se notarán en parte en 2027 y del todo desde 2028 [5]. El apalancamiento operativo es alto: el margen operativo pasó del 32,8 % del 3T25 al 44,4 % del 3T26 con un 55 % más de ventas, porque la I+D (1.174 M en el trimestre) es casi fija [2].',
    clientes: 'Concentración muy alta: unos pocos fabricantes de chips (TSMC, Samsung, Intel, SK Hynix, Micron) compran casi todas las máquinas EUV, y los pedidos de 2029-2030 que ya se discuten son de EUV y excluyen China [5]. China será alrededor del 20 % de las ventas de 2026, tras pesar mucho más en 2024; la dirección ve su demanda interna «muy fuerte» [5]. El poder de precios está demostrado: ASML ha cerrado con sus clientes subidas de precio de los productos críticos, que se notarán en 2027 y del todo desde 2028, y el margen bruto subió del 51,6 % del 3T25 al 57,5 % del 3T26 [2, 5].',
    segmentos: [
      { nombre: 'Sistemas (litografía, metrología e inspección)', descripcion: 'Ventas netas de sistemas nuevos y usados', tipo_resultado: null, historico: [{ periodo: '2025', ingresos: 24474.3, resultado: null }] },
      { nombre: 'Base instalada (servicio y mejoras)', descripcion: 'Net service and field option sales', tipo_resultado: null, historico: [{ periodo: '2025', ingresos: 8193.0, resultado: null }] },
    ],
    kpis: [
      { kpi: 'Margen bruto (trimestre)', valor_anterior: '51,6 % (3T25)', valor_actual: '57,5 % (3T26)', variacion: '+590 pb', comentario: 'Mezcla EUV, mejoras de la base instalada y volumen [2, 5].' },
      { kpi: 'Ventas de la base instalada (trimestre)', valor_anterior: '1.962 M EUR (3T25)', valor_actual: '3.289 M EUR (3T26)', variacion: '+68 %', comentario: 'Casi 400 M por encima de la guía por las mejoras de productividad [2, 5].' },
      { kpi: 'Sistemas de litografía vendidos (trimestre)', valor_anterior: '72 (3T25)', valor_actual: '121 (3T26)', variacion: '+49', comentario: 'Nuevos y usados [2].' },
      { kpi: 'Pasivos de contrato no corrientes (anticipos)', valor_anterior: '3.570 M EUR (2T26)', valor_actual: '9.301 M EUR (3T26)', variacion: '+5.730 M', comentario: 'La dirección lo da como indicador adelantado de pedidos, que ya no publica [2, 5].' },
      { kpi: 'Cartera de pedidos (fin de año)', valor_anterior: 'n.d.', valor_actual: '38.800 M EUR (dic-25)', variacion: 'n.d.', comentario: 'Desde 2026 solo se publica una vez al año [8, 12].' },
      { kpi: 'Máquinas EUV Low-NA entregadas (año)', valor_anterior: '44 (2025)', valor_actual: '≈ 65 (2026e)', variacion: '≈ +48 %', comentario: 'Plan de la dirección; +30 % de capacidad en 2027 [5].' },
    ],
    confianza: 'Alta',
  },
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM sep-26', fecha_fin: '2026-09-27', ingresos: 39473.5, ebitda: 16242.2, ebit: 15217.9, beneficio_neto: 12964.6, bpa: 33.69, dpa: 7.52, dpa_extraordinario: 0, fcf: 20999.4, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [],
    comentario: 'Las ventas pasaron de 10.944 M en 2018 a 32.667 M en 2025 (TCAC del 17 %), casi todo orgánico: la última compra relevante fue Berliner Glas en 2020 [1]. El margen bruto osciló entre el 49 % y el 53 % (52,8 % en 2025) y la I+D subió de 1.576 M a 4.699 M, por lo que el margen operativo de 2025 (34,6 %) quedó cerca del de 2021 (36,3 %) [1]. 2026 es un escalón: la guía de 44.000-45.000 M (+36 %) y un margen bruto del 56 % llevan el margen operativo de los nueve primeros meses al 39,6 % y el del 3T26 al 44,4 % [2, 3]. En los últimos doce meses hasta septiembre las ventas suman 39.474 M y el resultado operativo 15.218 M [2].',
    ajustes: 'Cifras US GAAP publicadas. ASML no publica EBITDA: es el resultado operativo más la amortización del XBRL (1.026 M en 2025) [1]. El resultado de las participadas (Carl Zeiss SMT, 24,9 %) aparece después del impuesto en US GAAP; aquí va en el resultado financiero para que el beneficio antes de impuestos cuadre con el neto [1, 2]. El 3T26 lleva una plusvalía de 509,7 M por la revalorización de la participación en Mistral AI [2]: el LTM la excluye (beneficio 12.965 M y BPA 33,69 frente a 13.474 M y 35,02 publicados). El dividendo de 2025 (7,50 EUR) sale del acta de la junta [7].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '4T24', ingresos: 9262.9, crecimiento_pct: 28.0, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 6.85, vs_consenso: 'Superior' },
      { periodo: '1T25', ingresos: 7741.5, crecimiento_pct: 46.4, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 6.00, vs_consenso: 'Superior' },
      { periodo: '2T25', ingresos: 7691.7, crecimiento_pct: 23.2, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 5.90, vs_consenso: 'Superior' },
      { periodo: '3T25', ingresos: 7516.0, crecimiento_pct: 0.7, crecimiento_organico_pct: null, ebitda: 2743.0, margen_ebitda_pct: 36.5, bpa: 5.49, vs_consenso: 'En línea' },
      { periodo: '4T25', ingresos: 9718.1, crecimiento_pct: 4.9, crecimiento_organico_pct: null, ebitda: 3686.3, margen_ebitda_pct: 37.9, bpa: 7.35, vs_consenso: 'Superior' },
      { periodo: '1T26', ingresos: 8766.9, crecimiento_pct: 13.2, crecimiento_organico_pct: null, ebitda: 3417.2, margen_ebitda_pct: 39.0, bpa: 7.15, vs_consenso: 'Superior' },
      { periodo: '2T26', ingresos: 9326.5, crecimiento_pct: 21.3, crecimiento_organico_pct: null, ebitda: 3703.0, margen_ebitda_pct: 39.7, bpa: 7.59, vs_consenso: 'Superior' },
      { periodo: '3T26', ingresos: 11662.0, crecimiento_pct: 55.2, crecimiento_organico_pct: null, ebitda: 5435.7, margen_ebitda_pct: 46.6, bpa: 12.95, vs_consenso: 'Superior' },
    ],
    ultima_presentacion: 'En la conferencia del 3T26 (14-oct) la dirección repitió el mensaje de julio y lo endureció: los clientes suben sus previsiones a corto y medio plazo por la IA, la oferta prevista para 2027 y 2028 «no cubrirá del todo la demanda» y ASML estudia ampliar la capacidad de 2028 por encima del 30 % ya anunciado; hay clientes que quieren pedir para 2029 y 2030 [3, 5]. Novedades frente a julio: las subidas de precio de los productos críticos están cerradas con los clientes y se notarán en parte en 2027 y del todo desde 2028; la guía anual sube a 44.000-45.000 M con un margen del 56 %; la memoria crecerá un 75 % en 2026 y se acerca a la lógica [5]. Los analistas preguntaron por la capacidad de 2027 («no daré cifras nuevas», respondió el CEO), por el margen de 2027 (la cifra llegará en enero; los costes de la ampliación compensan parte del volumen y del precio), por los anticipos (el salto de 5.700 M de los pasivos de contrato no corrientes es «un buen indicador» de pedidos, con retraso) y por China, que será un 20 % de las ventas de 2026 y cuya demanda «sigue muy fuerte» [2, 5]. La dirección evitó dar una cifra de ventas o de margen para 2027 y no habló del proyecto de ley MATCH en la conferencia [5].',
    confianza: 'Alta',
  },
  balance: {
    historico: balance,
    vencimientos: [],
    liquidez: 'Caja, equivalentes e inversiones a corto plazo de 12.735 M EUR a 27-sep-2026, después de recomprar 4.071 M y devolver 1.000 M de bonos en el trimestre [2]. Deuda a largo plazo de 1.963 M; la deuda bruta total, estimada con la de diciembre (4.391 M) menos las amortizaciones de 2026 (1.694 M), ronda los 2.700 M [1, 2].',
    rating: 'A2 (Moody\'s) y A+ (Fitch), según el 20-F de 2025 [1]',
    coste_deuda_pct: 2.6, vida_media_anios: null,
    otros_pasivos: 'El pasivo que importa no es deuda: son los anticipos de clientes (pasivos de contrato), 16.006 M a diciembre de 2025 y un salto de los no corrientes hasta 9.301 M en septiembre de 2026 [1, 2]. Financian las existencias (11.907 M) y las máquinas en curso, y por eso el capital invertido es pequeño. Si los clientes cancelasen pedidos, ASML perdería esa financiación, pero el anticipo «duele» y la cancelación tiene coste según el CFO [5]. ASML presta además 2.086 M a Carl Zeiss SMT para su capacidad (préstamos a cobrar) y tiene 2.239 M en participaciones financieras (Mistral AI) y 1.129 M en participadas por puesta en equivalencia [2]. Contingencias: litigios de patentes y el riesgo de los controles a la exportación de EE. UU. y los Países Bajos sobre China [1].',
    comentario: 'ASML tiene caja neta de unos 10.000 M: 12.735 M de caja e inversiones a corto frente a unos 2.700 M de deuda en septiembre de 2026 [2]. El circulante comercial con anticipos es negativo: existencias, clientes y activos de contrato menos proveedores y pasivos de contrato daban −4.635 M a diciembre de 2025 (−14 % de las ventas) frente a +1.300 M en 2018 [1]. El salto de los clientes a cobrar (de 3.023 M a 9.253 M en nueve meses) se compensa con anticipos nuevos, que aparecen como pasivo no corriente [2].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'El flujo libre (operativo menos inversión en inmovilizado e intangibles) fue de 9.906 M en 2021, 7.168 M en 2022, 3.247 M en 2023, 9.083 M en 2024 y 11.027 M en 2025, y de 20.999 M en los doce meses hasta septiembre de 2026 [1, 2]. La conversión depende de los anticipos: en 2023 se consumieron y el flujo operativo bajó a 5.443 M con un beneficio de 7.839 M; en el 3T26 entraron y el flujo libre fue de 11.351 M con un beneficio de 4.960 M [1, 2]. El capex bajó del 7,8 % de las ventas en 2023 al 5,0 % en 2025 y al 4,2 % en los nueve meses de 2026: lo grueso de la ampliación de Veldhoven ya está hecho y la capacidad de 2027 se gana sobre todo con productividad y proveedores [1, 2, 5]. Las recompras sumaron 5.950 M en 2025 y 6.148 M en los nueve meses de 2026 [1, 2].',
    confianza: 'Alta',
  },
  fuentes: fA,
  huecos: [
    { seccion: 'negocio', campo: 'segmentos 2021-2024 y geografías', tipo: 'Complemento', intentos: '1) XBRL de la SEC (companyfacts no trae ejes de segmento); 2) estados trimestrales del 6-K (solo 3T25-3T26); 3) web de ASML (bloquea las descargas desde este entorno)', decision: 'Omitido' },
    { seccion: 'balance', campo: 'vencimientos de la deuda', tipo: 'Complemento', intentos: '1) estados del 3T26 (sin nota de deuda); 2) XBRL (sin calendario por año); 3) web de ASML (bloqueada)', decision: 'Omitido' },
  ],
};
// Los cuatro primeros trimestres vienen del informe del 14-oct (comunicados trimestrales); el resto, de los estados del 3T26.
escribir('A.json', A);

// ---------- B. Sector (cualitativo del 14-oct, sin cambios de hechos) ----------
const B = P('B'); B._estado = 'reutilizada del 14-oct-2026 (sector y competencia sin hechos nuevos); comprobada el 27-nov';
escribir('B.json', B);

// ---------- C. Gobierno ----------
const C = P('C'); C._estado = 'del 14-oct con la junta de 2026 releída el 27-nov';
C.gobierno.alertas = ['Cambio de auditor aprobado en la junta de 2026: PwC auditará las cuentas de 2027 (rotación obligatoria) [8].', 'La fundación de preferentes (Stichting Preferente Aandelen ASML) es un blindaje frente a una OPA hostil [1].'];
C.gobierno.remuneracion = C.gobierno.remuneracion.replace('La junta de abril de 2026 aprobó el informe de remuneraciones de 2025; no hemos podido leer el porcentaje de votos en contra [4].', 'La junta del 22-abr-2026 dio voto consultivo favorable al informe de remuneraciones de 2025; el comunicado no da el porcentaje [8].');
C.fuentes.push({ id: 8, titulo: 'ASML discloses 2026 AGM results (6-K)', editor: 'ASML / SEC EDGAR', tipo: 'Primaria', fecha: '2026-04-22', url: 'https://www.sec.gov/Archives/edgar/data/937966/000162828026026703/asmldiscloses2026agmresults.htm' });
C.directivos.historial_guidance[0] = { anio: '2026', guia: 'Ventas 34.000-39.000 M y margen bruto 51-53 % (enero de 2026)', real: 'Guía subida tres veces hasta 44.000-45.000 M y margen del 56 % (14-oct); 9 meses: 29.755 M y 55,0 % [2]', cumplida: 'Sí' };
escribir('C.json', C);

// ---------- D. Mercado ----------
const id0 = P('D').identificacion;
const D = {
  _estado: 'completa 27-nov-2026',
  identificacion: { ...id0, empleados: 44681, precio: 1168.2, fecha_precio: '2026-11-26', acciones: 382.0, capitalizacion_publicada: null, free_float_pct: 99.4,
    max_52s: BOLSA.identificacion.max_52s, min_52s: BOLSA.identificacion.min_52s, volumen_medio_diario: '≈ 947 M EUR/día (3 meses)', proximos_resultados: '2027-01-27' },
  consenso: {
    guidance: 'Para 2026, ventas de 44.000-45.000 M EUR con un margen bruto en torno al 56 % y un tipo impositivo del 17 % (14-oct-2026), tras partir de 34.000-39.000 M en enero y subirla en abril y julio [1]. Para el 4T26, 14.200-15.200 M con un margen del 57 %, 3.700 M de base instalada, 1.200 M de I+D y 400 M de gastos generales [1]. Para 2027 no hay cifra: llegará con los resultados del 27-ene-2027; la dirección dice que la capacidad sube un 30 % y que no cubrirá la demanda, y que las subidas de precio empezarán a notarse [2]. A medio plazo sigue el objetivo de 2030 del día del inversor de 2024 (44.000-60.000 M y margen bruto del 56-60 %), que 2026 ya alcanza por abajo; se revisará en el día del inversor del 10-jun-2027 [3].',
    estimaciones: [
      { periodo: '2026e', ingresos: 44494, ebitda: null, ebit: null, bpa: 41.38, dpa: 7.52, fuente: 'Yahoo Finance, earningsTrend (25 analistas, 27-nov-2026) [4]' },
      { periodo: '2027e', ingresos: 57633, ebitda: null, ebit: null, bpa: 56.94, dpa: null, fuente: 'Yahoo Finance, earningsTrend (27 analistas, 27-nov-2026) [4]' },
    ],
    recomendaciones: { n_analistas: 41, comprar: 38, mantener: 2, vender: 1, po_medio: 2095.94, po_min: 1288.0, po_max: 2507.0 },
    revisiones: 'Las estimaciones han subido tras el 3T26 pese a la caída de la acción: el BPA de 2026 pasó de 38,05 EUR hace 90 días a 41,38 hoy (+8,8 %) y el de 2027 de 51,09 a 56,94 (+11,5 %), casi todo en los últimos 30 días [4]. El objetivo medio de 33 analistas es de 2.095,94 EUR (1.288-2.507), por encima de los 2.045 EUR de octubre [4]. Solo hay una fuente gratuita con estimaciones completas al día (Yahoo, que mezcla BPA publicado y ajustado); TIKR cita un BPA normalizado de 76,2 EUR para 2028 [5].',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: { ...BOLSA.bolsa, beta: 1.31, posicion_corta_pct: null, comentario: null, contexto: null, confianza: 'Alta' },
  multiplos_historicos: {
    serie: BOLSA.cierres_ejercicio.filter((c) => ANIOS.includes(c.anio)).map((c) => ({ anio: c.anio, precio_cierre: c.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: c.anio === '2021' })),
    comentario: null, confianza: 'Alta',
  },
  comparables: {
    criterio: null,
    empresas: COMPS.map(({ _cur, _fc, _px, _w0, _eps0, _eps1, _end0, ...c }) => c),
    comentario: null, confianza: 'Media',
  },
  transacciones: null,
  fuentes: [
    { id: 1, titulo: 'ASML reports €11.7 billion total net sales and €5.0 billion net income in Q3 2026 (6-K)', editor: 'ASML / SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-14', url: 'https://www.sec.gov/Archives/edgar/data/937966/000162828026065813/pressreleasefinancialresul.htm' },
    { id: 2, titulo: 'ASML (ASML) Q3 2026 Earnings Call Transcript', editor: 'The Motley Fool', tipo: 'Prensa', fecha: '2026-10-14', url: 'https://www.fool.com/earnings/call-transcripts/2026/10/14/asml-asml-q3-2026-earnings-call-transcript/' },
    { id: 3, titulo: 'ASML 2026 third-quarter results, presentación (próximo Capital Markets Day: 10-jun-2027)', editor: 'ASML / SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-14', url: 'https://www.sec.gov/Archives/edgar/data/937966/000162828026065813/a2026_10x14xpresentation.htm' },
    { id: 4, titulo: 'ASML.AS: quoteSummary (earningsTrend, financialData, recommendationTrend, calendarEvents)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-11-27', url: 'https://finance.yahoo.com/quote/ASML.AS/analysis/' },
    { id: 5, titulo: 'ASML Sinks 8% as Post-Election Chip Rout Deepens', editor: 'TIKR', tipo: 'Prensa', fecha: '2026-11-05', url: 'https://www.tikr.com/blog/asml-sinks-8-as-post-election-chip-rout-deepens' },
    { id: 6, titulo: 'Históricos diarios de ASML.AS, ^AEX, EXV3.DE y EXSA.DE (bolsa.mjs, corte 26-nov-2026)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-11-26', url: 'https://finance.yahoo.com/quote/ASML.AS/history/' },
    { id: 7, titulo: 'Comparables: quoteSummary de AMAT, LRCX, KLAC, ASM.AS, 8035.T, VACN.SW, BESI.AS y NVMI (consenso posterior a sus resultados)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-11-27', url: 'https://finance.yahoo.com/quote/AMAT/analysis/' },
    { id: 8, titulo: 'Tipos de cambio de referencia del euro, 26-nov-2026 (USD 1,0975; JPY 174,79; CHF 0,9153)', editor: 'Banco Central Europeo', tipo: 'Primaria', fecha: '2026-11-26', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml' },
    { id: 9, titulo: 'Estructura temporal de tipos de la deuda federal (Svensson), 10 años, 26-nov-2026: 3,32 %', editor: 'Deutsche Bundesbank', tipo: 'Primaria', fecha: '2026-11-26', url: 'https://api.statistiken.bundesbank.de/rest/data/BBSIS/D.I.ZST.ZI.EUR.S1311.B.A604.R10XX.R.A.A._Z._Z.A' },
    { id: 10, titulo: 'Implied ERP by month (ERPbymonth.xlsx), noviembre de 2026: 4,41 %', editor: 'A. Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-11', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
    { id: 11, titulo: 'ASML Fell 6% in Intel’s Chip Rout. Its CEO Says Supply “Will Not Fully Meet the Demand”', editor: 'TIKR', tipo: 'Prensa', fecha: '2026-11-02', url: 'https://www.tikr.com/blog/asml-fell-6-in-intels-chip-rout-its-ceo-says-supply-will-not-fully-meet-the-demand' },
    { id: 12, titulo: 'Semiconductor stocks plunge on AI spending concerns (SOX −12,25 % el 5-nov)', editor: 'International Business Times', tipo: 'Prensa', fecha: '2026-11-06', url: 'https://www.ibtimes.com/semiconductor-stocks-plunge-ai-spending-concerns-3809509' },
    { id: 13, titulo: 'Waarom daalt ASML? (movimientos diarios de noviembre con el del sector)', editor: 'De Belegger', tipo: 'Prensa', fecha: '2026-11-26', url: 'https://www.debelegger.nl/koers/ASML.AS/waarom-daalt' },
    { id: 14, titulo: 'ASML caught between US and China over MATCH Act', editor: 'IO+', tipo: 'Prensa', fecha: '2026-10-12', url: 'https://ioplus.nl/en/posts/asml-caught-between-us-and-china-over-match-act' },
    { id: 15, titulo: 'Sjoerdsma verdedigt ASML in Washington', editor: 'NOS', tipo: 'Prensa', fecha: '2026-06-23', url: 'https://nos.nl/l/2619961' },
    { id: 16, titulo: 'Netherlands protests US proposal to further bar chip giant ASML from China market', editor: 'South China Morning Post', tipo: 'Prensa', fecha: '2026-05', url: 'https://www.scmp.com/news/china/diplomacy/article/3353452/netherlands-protests-us-proposal-further-bar-chip-giant-asml-china-market' },
    { id: 17, titulo: 'ASML falls 20% in the past month as AI growth meets execution risk', editor: 'Zacks', tipo: 'Analistas', fecha: '2026-11-09', url: 'https://zacks.com/stock/news/3026536/asml-falls-20-in-the-past-month-as-ai-growth-meets-execution-risk' },
    { id: 18, titulo: 'Wall Street absorbs the hit as Nvidia touches a 52-week low (relevo en la dirección de Nvidia, 12-nov)', editor: 'Wealth Professional', tipo: 'Prensa', fecha: '2026-11-12', url: 'https://www.wealthprofessional.ca/investments/equity-markets/wall-street-absorbs-the-hit-as-nvidia-touches-a-52-week-low/394013' },
    { id: 19, titulo: 'Market movers: ASML −3,02 % (17-nov-2026)', editor: 'TradingKey', tipo: 'Prensa', fecha: '2026-11-17', url: 'https://www.tradingkey.com/news/market-movers/262309416-market-movers-asml-20261117' },
    { id: 20, titulo: 'Global semiconductor stocks tumble as China develops advanced chip machines (28-jul-2026)', editor: 'NewsBytes', tipo: 'Prensa', fecha: '2026-07-28', url: 'https://www.newsbytesapp.com/news/business/global-semiconductor-stocks-tumble-as-china-develops-advanced-chip-machines/tldr' },
  ],
  huecos: [
    { seccion: 'consenso', campo: 'EBITDA y estimaciones de 2028e', tipo: 'Complemento', intentos: '1) Yahoo quoteSummary (solo 2026-2027); 2) MarketScreener (no abre desde este entorno); 3) TIKR (solo un BPA normalizado de 2028 citado en prensa, 76,2 EUR)', decision: 'Omitido' },
    { seccion: 'transacciones', campo: 'sección entera', tipo: 'Complemento', intentos: '1) operaciones de equipos de semiconductores 2019-2026 (KLA-Orbotech, AMAT-Kokusai fallida) sin múltiplos oficiales legibles; 2) prensa; 3) no hay operación comparable a un monopolio de 450.000 M', decision: 'Omitido' },
    { seccion: 'bolsa', campo: 'posición corta', tipo: 'Complemento', intentos: '1) registro de cortos de la AFM (exportación sin ASML por encima del 0,5 %); 2) Yahoo (sin dato para Euronext); 3) prensa', decision: 'Omitido' },
  ],
};
escribir('D.json', D);
console.log('A-D escritas', cuenta.length, balance.length, flujos.length, COMPS.length);
