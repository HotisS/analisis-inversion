// Escribe las notas A-E de H&R Block (corte 2026-10-19) a partir de los documentos de notas/docs (EDGAR, IRS, IBISWorld,
// Intuit), del XBRL de la SEC (cuentas-xbrl.json, cierre 30-jun forzado: la herramienta cogía el ejercicio antiguo a 30-abr),
// de bolsa.json, de yahoo-datos.json (Yahoo quoteSummary del 19-oct-2026, 14:56 UTC) y de form4.json.
// Cada nota cita solo con [n] de su propia lista de fuentes. Ejecutar: node informes/hr-block-2026-10-19/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const lee = (f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const r1 = (x) => (x == null ? null : Math.round(x * 10) / 10);
const r2 = (x) => (x == null ? null : Math.round(x * 100) / 100);
const X = lee('cuentas-xbrl.json');
const B = lee('bolsa.json');
const Y = lee('yahoo-datos.json').datos;
const F4 = lee('form4.json');
const ED = 'https://www.sec.gov/Archives/edgar/data/12659';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Form 10-K del ejercicio FY2026 (cerrado el 30-jun-2026): negocio, volúmenes, riesgos, deuda, litigios, segmento único', editor: 'H&R Block, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-08-14', url: `${ED}/000001265926000026/hrb-20260630.htm` },
  { id: 2, titulo: 'H&R Block Reports Fiscal 2026 Results (nota del 4T FY2026 con cuenta, balance, flujos, conciliaciones y guía FY2027)', editor: 'H&R Block, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-08-11', url: `${ED}/000001265926000019/q4fy26earningsrelease.htm` },
  { id: 3, titulo: 'Nota de resultados del 3T FY2026 (temporada de la renta 2026; sube la guía FY2026)', editor: 'H&R Block, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-05-06', url: `${ED}/000001265926000015/q3fy26earningrelease.htm` },
  { id: 4, titulo: 'Nota de resultados del 2T FY2026 (reitera la guía FY2026)', editor: 'H&R Block, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-02-03', url: `${ED}/000001265926000005/q2fy26earningrelease.htm` },
  { id: 5, titulo: 'Nota de resultados del 1T FY2026', editor: 'H&R Block, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2025-11-06', url: `${ED}/000001265925000014/q1fy26earningrelease.htm` },
  { id: 6, titulo: 'Nota de resultados del 4T FY2025 (BPA ajustado FY2024-FY2025; guía FY2026)', editor: 'H&R Block, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2025-08-12', url: `${ED}/000160529725000012/q4fy25earningsrelease.htm` },
  { id: 7, titulo: 'Form 10-K del ejercicio FY2025 (flujos FY2023-FY2025, recompras)', editor: 'H&R Block, Inc. (SEC)', tipo: 'Primaria', fecha: '2025-08-15', url: `${ED}/000160529725000016/hrb-20250630.htm` },
  { id: 8, titulo: 'Nota de resultados del 4T FY2024 (BPA ajustado FY2023-FY2024, EBITDA, guía FY2025)', editor: 'H&R Block, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2024-08-15', url: `${ED}/000183886224000028/q4fy24earningsrelease.htm` },
  { id: 9, titulo: 'Nota de resultados del 4T FY2023 (BPA ajustado FY2022-FY2023, guía FY2024)', editor: 'H&R Block, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2023-08-15', url: `${ED}/000183886223000023/q4fy23earningsrelease.htm` },
  { id: 10, titulo: 'Nota de resultados del 4T FY2022 (BPA ajustado FY2021-FY2022, recompras)', editor: 'H&R Block, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2022-08-09', url: `${ED}/000183886222000021/q4fy22earningsrelease.htm` },
  { id: 11, titulo: 'Form 10-Q del 3T FY2026 (31-mar-2026)', editor: 'H&R Block, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-05-06', url: `${ED}/000001265926000017/hrb-20260331.htm` },
  { id: 12, titulo: 'XBRL de la SEC (companyfacts, CIK 12659): cuenta, balance y flujos FY2022-FY2026', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-19', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0000012659.json' },
  { id: 13, titulo: '8-K: emisión de 350 M USD de bonos al 5,375 % con vencimiento en 2032', editor: 'H&R Block, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2025-08-26', url: 'https://www.sec.gov/Archives/edgar/data/12659/000110465925083093/tm2522221d5_8k.htm' },
  { id: 14, titulo: 'H&R Block (HRB) Q4 2026 earnings summary (resumen de la conferencia del 11-ago-2026)', editor: 'Quartr', tipo: 'Analistas', fecha: '2026-08-26', url: 'https://quartr.com/events/h-r-block-inc-hrb-q4-2026_3YCNDInb' },
  { id: 15, titulo: '5 must-read analyst questions from H&R Block’s Q4 (CY2025) earnings call', editor: 'StockStory (Finviz)', tipo: 'Prensa', fecha: '2026-02-10', url: 'https://finviz.com/news/306243/5-must-read-analyst-questions-from-hr-blocks-q4-earnings-call' },
  { id: 16, titulo: 'Seeking Alpha, titulares de resultados (BPA ajustado frente al consenso: 4T +0,17; 3T +0,25; 2T +0,05)', editor: 'Seeking Alpha (RSS)', tipo: 'Datos de mercado', fecha: '2026-08-11', url: 'https://seekingalpha.com/api/sa/combined/HRB.xml' },
];

// Cuenta: XBRL (coste_ventas + gastos_generales = gastos operativos totales, con amortizaciones). EBIT = ingresos − gastos
// operativos; EBITDA = EBIT + amortizaciones; resultado financiero = otros ingresos − intereses (BAI − EBIT).
const cuenta = X.financieros.cuenta.map((c) => {
  const ebit = r1(c.ingresos - c.coste_ventas - c.gastos_generales);
  return {
    periodo: c.periodo, ingresos: c.ingresos, coste_ventas: c.coste_ventas, gastos_generales: c.gastos_generales,
    ebitda: r1(ebit + c.amortizaciones), amortizaciones: c.amortizaciones, ebit, resultado_financiero: r1(c.bai - ebit), bai: c.bai,
    impuestos: c.impuestos, minoritarios: 0, beneficio_neto: c.beneficio_neto, gastos_financieros: c.gastos_financieros,
    participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: c.bpa, dpa: c.dpa, dpa_extraordinario: 0, acciones_diluidas: c.acciones_diluidas,
  };
});
const balance = X.balance.historico.map((b) => ({ ...b, fin: undefined, existencias: 0, activos_contrato: null, pasivos_contrato: null, minoritarios: 0, arrendamientos: 0 }));
for (const b of balance) delete b.fin;
const recompras = { FY2022: 563.2, FY2023: 569.0, FY2024: 379.6, FY2025: 437.1, FY2026: 512.9 };
const flujos = X.flujos.historico.map((f) => ({
  periodo: f.periodo, flujo_operativo: f.flujo_operativo, capex: f.capex, pagos_arrendamientos: 0, adquisiciones: f.adquisiciones,
  desinversiones: 0, dividendos: f.dividendos, recompras: recompras[f.periodo], emision_acciones: f.emision_acciones ?? 0, intereses_en_financiacion: 0,
}));

const A = {
  _estado: 'completo',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 3945.4, ebitda: 1030.1, ebit: 907.7, beneficio_neto: 733.6, bpa: 5.66, dpa: 1.68, dpa_extraordinario: 0, fcf: 756.1, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [],
    comentario: 'Los ingresos pasan de 3.463 M USD en FY2022 a 3.945 M en FY2026 (+3,3 % anual), casi todo por precio: el cobro medio por declaración asistida (NAC) subió un 4,0 % en FY2026 y las declaraciones asistidas propias un 2,0 %, mientras el total de asistidas (propias y franquiciadas) bajó un 0,1 % [A1]. Las compras de franquicias pasan ingresos de royalties (−3,9 %) a preparación asistida (+6,1 %); el bricolaje (DIY) quedó plano (+0,2 %, con un NAC pagado +4,2 %), internacional creció un 7,4 % por divisa y Wave un 12,3 % [A1, A2]. El margen EBIT sube de 21,5 % en FY2022 a 23,0 % en FY2026: los gastos crecieron un 3,6 % frente al 4,9 % de los ingresos (salarios de campo +7,5 %, alquileres +4,2 %, publicidad −2,8 %) [A2]. El negocio es estacional: pierde dinero de julio a diciembre y gana casi todo entre febrero y abril [A1].',
    ajustes: 'La empresa publica un BPA ajustado que suma la amortización de intangibles comprados (46,9 M antes de impuestos en FY2026, 44,7 M en FY2025) y quita efectos fiscales discretos: en FY2026, un beneficio fiscal de 84,1 M (0,65 USD por acción) por cerrar la inspección del IRS de 2020 y las devoluciones de 2015-2018 [A2]. Así, BPA publicado de operaciones continuadas 5,69 USD y ajustado 5,31 (FY2025: 4,42 y 4,66) [A2]. BPA ajustado por ejercicio: FY2021 3,94, FY2022 3,51, FY2023 3,82, FY2024 4,41, FY2025 4,66, FY2026 5,31 [A10, A9, A8, A6, A2]. FY2021 no es comparable: el cambio de ejercicio y el plazo de la renta 2020 aplazado al 15 de julio metieron 15 días de otra temporada [A10]. El EBITDA que publica la empresa (1.056,9 M) incluye otros ingresos (26,8 M); el de este informe (1.030,1 M) no. Las cifras de la cuenta son consolidadas (con la pérdida de actividades interrumpidas, −2,7 M en FY2026).',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '1T25', ingresos: 193.8, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: -187.6, margen_ebitda_pct: null, bpa: -1.17, vs_consenso: null },
      { periodo: '2T25', ingresos: 179.1, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: -261.4, margen_ebitda_pct: null, bpa: -1.73, vs_consenso: null },
      { periodo: '3T25', ingresos: 2277.1, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 1012.1, margen_ebitda_pct: 44.4, bpa: 5.38, vs_consenso: null },
      { periodo: '4T25', ingresos: 1111.0, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 413.2, margen_ebitda_pct: 37.2, bpa: 2.27, vs_consenso: null },
      { periodo: '1T26', ingresos: 203.6, crecimiento_pct: 5.0, crecimiento_organico_pct: null, ebitda: -170.0, margen_ebitda_pct: null, bpa: -1.20, vs_consenso: null },
      { periodo: '2T26', ingresos: 198.9, crecimiento_pct: 11.1, crecimiento_organico_pct: null, ebitda: -265.8, margen_ebitda_pct: null, bpa: -1.84, vs_consenso: 'Superior' },
      { periodo: '3T26', ingresos: 2398.1, crecimiento_pct: 5.3, crecimiento_organico_pct: null, ebitda: 1072.3, margen_ebitda_pct: 44.7, bpa: 6.02, vs_consenso: 'Superior' },
      { periodo: '4T26', ingresos: 1144.9, crecimiento_pct: 3.0, crecimiento_organico_pct: null, ebitda: 420.5, margen_ebitda_pct: 36.7, bpa: 2.38, vs_consenso: 'Superior' },
    ],
    ultima_presentacion: 'Trimestres del ejercicio a 30 de junio (1T = jul-sep, pérdidas; 3T = ene-mar, la temporada). EBITDA y BPA en la definición de la empresa (BPA ajustado; EBITDA con otros ingresos) [A2-A5]. Los tres últimos batieron al consenso de BPA ajustado: 2T26 −1,84 frente a −1,89, 3T26 6,02 frente a 5,77 y 4T26 2,38 frente a 2,21 [A16]. En febrero (2T26) la dirección solo reiteró la guía (ingresos 3.875-3.895 M, BPA ajustado 4,85-5,00) y los analistas preguntaron por qué la cuota en asistidas no crece pese a la mayor complejidad fiscal de la ley de 2025 (el consejero delegado admitió problemas de retención) y si la IA amenaza al negocio asistido (respuesta: la IA «aumenta» al profesional, no lo sustituye) [A15, A4]. En mayo (3T26) subió la guía a BPA ajustado de 5,10-5,20 tras una temporada con clientes más complejos [A3], y en agosto cerró FY2026 en 5,31 y guió FY2027 en ingresos de 4.110-4.160 M, EBITDA ajustado de 1.110-1.140 M, tipo fiscal del 23 % y BPA ajustado de 6,04-6,24 [A2]. En la conferencia de agosto dijo que la retención mejoró 190 puntos básicos, que el uso de AI Tax Assist casi se duplicó, que espera que el crecimiento del sector se modere pero mantener o ganar cuota en asistidas, y que planea unos 400 M de recompras en FY2027 [A14]. No dio cifras de cuota en asistidas ni de declaraciones de la competencia virtual.',
    confianza: 'Alta',
  },
  balance: {
    historico: balance,
    vencimientos: [{ anio: '2028', importe: 500 }, { anio: '2030', importe: 650 }, { anio: '2032', importe: 350 }],
    liquidez: 'Caja 958,7 M USD (más 19,2 M restringida) a 30-jun-2026 y línea de crédito comprometida de 1.500 M sin disponer, con vencimiento en julio de 2030 [A1, A2].',
    rating: "Moody's Baa3 (estable) y S&P BBB (estable) para la deuda de Block Financial LLC [A1]",
    coste_deuda_pct: 5.4,
    vida_media_anios: 3.8,
    otros_pasivos: 'Deuda: bonos de 500 M al 2,50 % (julio de 2028), 650 M al 3,875 % (agosto de 2030) y 350 M al 5,375 % (septiembre de 2032; emitidos en agosto de 2025 para devolver los de 2025) [A1, A13]. La línea de 1.500 M se usa cada año de noviembre a marzo para financiar las pérdidas de la temporada baja (2.375 M dispuestos y devueltos en FY2026) [A2]. Arrendamientos operativos de oficinas: 610,9 M de pasivo (US GAAP: el alquiler ya está en el EBITDA, no van a la deuda) [A2]. Pasivos fiscales por posiciones inciertas: 266,2 M a corto y 163,7 M a largo (bajaron tras cerrar la inspección de 2020) [A2]. Litigios: reclamaciones colectivas, arbitrajes masivos e investigaciones públicas sobre el programa Free File del IRS y el uso de píxeles en el DIY, con una provisión no desglosada; la empresa estima que la pérdida razonablemente posible por encima de lo provisionado no es material [A1]. Garantía de exactitud y Peace of Mind: autoasegurados [A1].',
    comentario: 'El patrimonio neto es casi nulo (117,5 M en FY2026; −48,7 M de reservas en FY2023) porque la empresa ha recomprado más del 48 % de sus acciones desde 2016 [A2]: no es un problema de solvencia, sino de cómo se mide. La deuda bruta está fija en unos 1.490 M desde FY2022 y la caja de cierre de junio (959 M) es la del pico estacional menos las recompras; la deuda neta de junio es 533 M, 0,5 veces el EBITDA. El circulante comercial es negativo (clientes 58 M frente a proveedores 156 M): la temporada se cobra al contado o del propio reembolso.',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'El flujo operativo fue de 809 M en FY2022, 822 M en FY2023, 721 M en FY2024, 681 M en FY2025 y 839 M en FY2026 [A2, A7]; FY2024 y FY2025 pagaron más impuestos de los devengados y FY2026 se benefició de salarios y cobros diferidos, con la liberación de reservas fiscales restando [A1]. El capex es pequeño (2 % de las ventas: 82,6 M en FY2026, sobre todo oficinas y software) y la empresa compra franquicias y competidores cada año (57,6 M en FY2026) [A2]: estimación propia, el mantenimiento es casi todo el capex y las compras de franquicias son la inversión de crecimiento. Desde FY2022 ha pagado 953 M en dividendos y 2.462 M en recompras, más que el flujo libre acumulado (unos 3.500 M) [A2, A7, A9, A10].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'Deloitte & Touche LLP', anios_auditor: 19, opinion: 'Favorable (sin salvedades); cuestión clave de auditoría: posiciones fiscales inciertas por precios de transferencia',
    comentario: 'Deloitte audita a la empresa desde 2007 y la única cuestión clave de auditoría son las posiciones fiscales inciertas por precios de transferencia [A1]: es donde está el juicio, como mostró el beneficio fiscal de 84,1 M de FY2026 al cerrar la inspección de 2020 [A2]. Los ingresos se reconocen cuando se presenta la declaración (o al prestar el servicio): sin cobros por adelantado relevantes. La remuneración en acciones es modesta (30,5 M en FY2026, 4 % del beneficio) [A2]. Los ajustes del BPA son pequeños y explicados (amortización de intangibles comprados y efectos fiscales discretos) [A2]. El riesgo contable está en los préstamos ligados al reembolso (Emerald Advance, con una dotación de 64,9 M en FY2026) y en las provisiones de litigios no desglosadas [A1]. Los indicadores del motor (Altman, Piotroski, Beneish) se leen con cuidado: el patrimonio casi nulo por recompras hunde el Altman Z sin que haya tensión de liquidez.',
    senales: [
      { senal: 'Patrimonio casi nulo por recompras', nivel: 'Baja', comentario: 'Deforma ROE, Altman Z y ROIC del motor; la deuda neta es 0,5 veces el EBITDA.' },
      { senal: 'Beneficio fiscal no recurrente en FY2026', nivel: 'Media', comentario: '84,1 M (0,65 USD por acción) por cerrar la inspección del IRS de 2020; excluido del BPA ajustado [A2].' },
      { senal: 'Litigios del programa Free File y píxeles sin cifra', nivel: 'Media', comentario: 'Provisión incluida en la de contingencias, sin importe; pérdida adicional posible «no material» según la empresa [A1].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Prioridades declaradas: invertir en el negocio y en compras de franquicias, dividendo creciente (nueve subidas anuales seguidas; 0,46 USD trimestrales desde octubre de 2026, +10 %) y recompras con la caja sobrante [A2]. Programa de recompras de 1.500 M aprobado en agosto de 2024, sin vencimiento, con 600 M disponibles a 30-jun-2026 [A1]; la dirección planea unos 400 M de recompras en FY2027 [A14].',
    adquisiciones: [
      { anio: 'FY2020', objetivo: 'Wave Financial (software y pagos para pequeñas empresas)', importe: 450.2, ev_ebitda: null, financiacion: 'Caja', resultado: 'Ingresos de Wave de 122,7 M en FY2026 (+12,3 %), aún pequeños frente al grupo; sin deterioro del fondo de comercio [A1, A12].' },
      { anio: 'FY2022-FY2026', objetivo: 'Franquicias y competidores pequeños (compras anuales)', importe: 220.6, ev_ebitda: null, financiacion: 'Caja', resultado: 'Pasan royalties (≈30 % de la facturación de la franquicia) a ingresos propios; derechos de franquicia recomprados de 432 M brutos en el balance [A1, A2].' },
    ],
    comentario: 'La dirección asigna el capital de forma disciplinada y casi todo vuelve al accionista: entre FY2022 y FY2026, 2.462 M en recompras y 953 M en dividendos frente a unos 3.500 M de flujo libre [A2, A7, A9, A10]. Las acciones diluidas bajaron de 171 M en FY2022 a 129 M en FY2026 (−7 % anual) [A12], y eso explica la mitad del crecimiento del BPA ajustado (de 3,51 a 5,31 USD). La recompra de FY2026 se hizo a 47,48 USD de media, cerca del precio actual, y la de FY2025 a 61,10 [A1]. Las compras (Wave, franquicias) son pequeñas y no han traído deterioros.',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'Asistida EE. UU. (oficinas propias y virtual)', descripcion: 'Preparación por profesionales, en oficina o en remoto', tipo_resultado: null, historico: [{ periodo: 'FY2025', ingresos: 2413.2, resultado: null }, { periodo: 'FY2026', ingresos: 2560.9, resultado: null }] },
      { nombre: 'Royalties de franquicias', descripcion: '≈30 % de la facturación de las franquicias', tipo_resultado: null, historico: [{ periodo: 'FY2025', ingresos: 192.9, resultado: null }, { periodo: 'FY2026', ingresos: 185.4, resultado: null }] },
      { nombre: 'DIY EE. UU. (programa propio)', descripcion: 'En línea, móvil y de escritorio', tipo_resultado: null, historico: [{ periodo: 'FY2025', ingresos: 383.7, resultado: null }, { periodo: 'FY2026', ingresos: 384.6, resultado: null }] },
      { nombre: 'Otros servicios fiscales EE. UU.', descripcion: 'Refund Transfers, Peace of Mind, Tax Identity Shield y otros', tipo_resultado: null, historico: [{ periodo: 'FY2025', ingresos: 313.1, resultado: null }, { periodo: 'FY2026', ingresos: 326.9, resultado: null }] },
      { nombre: 'Servicios financieros', descripcion: 'Emerald Card, Spruce y Emerald Advance', tipo_resultado: null, historico: [{ periodo: 'FY2025', ingresos: 101.8, resultado: null }, { periodo: 'FY2026', ingresos: 99.5, resultado: null }] },
      { nombre: 'Internacional (Canadá y Australia)', descripcion: 'Asistida y DIY', tipo_resultado: null, historico: [{ periodo: 'FY2025', ingresos: 247.0, resultado: null }, { periodo: 'FY2026', ingresos: 265.4, resultado: null }] },
      { nombre: 'Wave', descripcion: 'Software, nóminas y pagos para pequeñas empresas', tipo_resultado: null, historico: [{ periodo: 'FY2025', ingresos: 109.2, resultado: null }, { periodo: 'FY2026', ingresos: 122.7, resultado: null }] },
    ],
    geografias: [{ nombre: 'Estados Unidos', peso_pct: 93.3 }, { nombre: 'Canadá y Australia', peso_pct: 6.7 }],
    geografias_criterio: 'origen',
    kpis: [
      { kpi: 'Declaraciones asistidas EE. UU. (millones)', valor_anterior: '≈11,3', valor_actual: '11,3', variacion: '−0,1 %', comentario: 'Propias +2,0 %, franquicias a la baja por las compras [A1].' },
      { kpi: 'Declaraciones DIY en línea pagadas (millones)', valor_anterior: 'n.d.', valor_actual: '3,6', variacion: 'n.d.', comentario: 'NAC pagado +4,2 % [A1].' },
      { kpi: 'Declaraciones totales por H&R Block (millones)', valor_anterior: 'n.d.', valor_actual: '22,3', variacion: 'n.d.', comentario: 'EE. UU., Canadá y Australia, incluidas las gratuitas [A1].' },
      { kpi: 'Cobro medio por declaración asistida propia (NAC)', valor_anterior: '—', valor_actual: '+4,0 %', variacion: '+4,0 %', comentario: 'La palanca del crecimiento [A1].' },
      { kpi: 'Oficinas propias / franquiciadas', valor_anterior: 'n.d.', valor_actual: '6.802 / 1.814', variacion: 'n.d.', comentario: 'A 31-mar-2026 [A1].' },
      { kpi: 'Retención de clientes', valor_anterior: '—', valor_actual: '+190 pb', variacion: '+190 pb', comentario: 'Según la conferencia de agosto [A14].' },
    ],
    confianza: 'Alta',
  },
  fuentes: fA,
  huecos: [
    { seccion: 'negocio', campo: 'kpis (declaraciones asistidas y DIY de FY2025)', tipo: 'Complemento', intentos: '1) 10-K FY2026, sección de negocio (solo FY2026); 2) nota del 4T FY2025 (sin volúmenes); 3) 10-K FY2025 por grep de «tax returns» (cifras de otra definición)', decision: 'Omitido' },
  ],
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Form 10-K FY2026: negocio, competencia, riesgos (Direct File suspendido, Free File hasta 2029, IA)', editor: 'H&R Block, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-08-14', url: `${ED}/000001265926000026/hrb-20260630.htm` },
  { id: 2, titulo: 'Tax Preparation Services in the US: tamaño del mercado (15.000 M USD en 2026; TCAC 2021-2026 del 1,9 %)', editor: 'IBISWorld', tipo: 'Sectorial', fecha: '2026-04', url: 'https://www.ibisworld.com/united-states/industry/tax-preparation-services/1399/' },
  { id: 3, titulo: '2026 Filing season statistics, week ending May 8, 2026', editor: 'Internal Revenue Service', tipo: 'Primaria', fecha: '2026-05-15', url: 'https://www.irs.gov/newsroom/filing-season-statistics-for-week-ending-may-8-2026' },
  { id: 4, titulo: 'Intuit Reports Fourth Quarter and Full Year Fiscal 2026 Results (TurboTax 5.300 M, TurboTax Live +37 %, unidades −2 %)', editor: 'Intuit Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-08-25', url: 'https://www.sec.gov/Archives/edgar/data/896878/000089687826000029/fy26q4earningspressrelease.htm' },
  { id: 5, titulo: 'Intuit Stock Falls 52% YTD as CEO Pitches AI-Native Platform at Investor Day', editor: 'Pomegra', tipo: 'Prensa', fecha: '2026-09-17', url: 'https://pomegra.io/briefs/2026-09-17-intuit-investor-day' },
  { id: 6, titulo: 'Nota de resultados del 4T FY2026 (ingresos por línea)', editor: 'H&R Block, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-08-11', url: `${ED}/000001265926000019/q4fy26earningsrelease.htm` },
  { id: 7, titulo: 'Goldman Sachs Lowers its Price Target on H&R Block to $32 and Maintains a Sell Rating (TurboTax en asistida, entrantes nativos de IA)', editor: 'Insider Monkey (Yahoo Finance)', tipo: 'Prensa', fecha: '2026-02-17', url: 'https://finance.yahoo.com/news/goldman-sachs-lowers-price-target-102833491.html' },
  { id: 8, titulo: 'Blucora: venta de TaxAct a Cinven por 720 M USD y guía 2022 del negocio de software fiscal', editor: 'Blucora, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2022-11-01', url: 'https://www.sec.gov/Archives/edgar/data/1068875/000106887522000109/ex-991erq32022.htm' },
];
const B_ = {
  _estado: 'completo',
  negocio: {
    descripcion: 'H&R Block prepara declaraciones de la renta de particulares y pequeñas empresas en EE. UU., Canadá y Australia: en 6.802 oficinas propias y 1.814 franquiciadas (a 31-mar-2026), en remoto con un profesional, y con su programa de bricolaje (DIY) en línea, móvil y de escritorio, que incluye AI Tax Assist sin coste adicional [B1]. En FY2026 sus profesionales firmaron 11,3 millones de declaraciones asistidas en EE. UU. y sus clientes presentaron 3,6 millones de declaraciones DIY de pago; en total, 22,3 millones de declaraciones pasaron por la empresa [B1]. Alrededor vende productos ligados al reembolso: Refund Transfers (cobrar la tarifa del propio reembolso), la garantía ampliada Peace of Mind, protección de identidad, la tarjeta Emerald y la cuenta Spruce, y préstamos de un banco socio con cargo al reembolso [B1]. Para pequeñas empresas tiene Block Advisors (contabilidad, nóminas) y Wave (software y cobros) [B1].',
    como_gana_dinero: 'El 88 % de los ingresos de FY2026 es preparación fiscal en EE. UU. (3.458 M de 3.945 M), y dentro de ella la asistida propia pesa 2.561 M [B6]. Cobra por declaración: el ingreso depende del número de clientes y del cobro medio (NAC), que sube cada año con la complejidad y las subidas de tarifa (+4,0 % en FY2026) [B1]. Las franquicias pagan ≈30 % de su facturación [B1]. Es muy estacional: casi todo se gana entre febrero y abril, y de julio a diciembre la empresa pierde dinero [B1]. Los costes son sobre todo salarios de temporada (73.400 personas en el pico frente a 4.600 fijos), alquileres y publicidad [B1]: hay apalancamiento operativo en el NAC (cada subida de tarifa cae casi entera al margen) y riesgo si el volumen baja, porque oficinas y campañas son fijas.',
    clientes: 'Clientes particulares, muy repartidos: ningún cliente pesa. La repetición es alta pero no está publicada; la dirección dijo en agosto que la retención mejoró 190 puntos básicos en FY2026 [B1]. El poder de precios está demostrado: el NAC asistido sube cada año (+4,0 % en FY2026) mientras el volumen total de asistidas está plano (−0,1 %) [B1]. El límite lo pone la alternativa: el programa DIY de Intuit y su servicio asistido virtual TurboTax Live, que creció un 37 % en ingresos en su FY2026 [B4], y el bricolaje gratuito. En DIY, el NAC pagado subió un 4,2 % con ingresos planos [B1].',
    confianza: 'Media',
  },
  sector: {
    definicion: 'El mercado relevante es la preparación de declaraciones de la renta de particulares en EE. UU. por profesionales (oficinas, contables, preparadores independientes y servicios virtuales), donde H&R Block gana el 65 % de sus ingresos; el bricolaje por programa (Intuit TurboTax, H&R Block, TaxAct, FreeTaxUSA) es el sustituto directo. Se usa la cifra de IBISWorld para el asistido (15.000 M USD en 2026) y se contrasta con los volúmenes del IRS: 75,3 millones de declaraciones presentadas por profesionales y 65,7 millones por los propios contribuyentes hasta el 8-may-2026 [B2, B3]. Con el NAC de la propia empresa (≈ 200-280 USD) el asistido vale entre 15.000 y 21.000 M, coherente con IBISWorld.',
    tamano: '≈ 15.000 M USD en 2026 (preparación profesional en EE. UU.) [B2]; más ≈ 5.300 M de TurboTax de Intuit en DIY y virtual [B4]',
    unidad_serie: 'millones de USD (IBISWorld, preparación profesional en EE. UU.)',
    serie: [{ anio: '2021', tamano: 13650 }, { anio: '2026', tamano: 15000 }, { anio: '2031e', tamano: 16000 }],
    tcac_historico_pct: 1.9,
    tcac_previsto_pct: 1.3,
    cr5_pct: null,
    estructura: 'Moderadamente concentrada',
    drivers: [
      { driver: 'Número de declaraciones', efecto: '+', horizonte: 'Estructural', evidencia: 'Declaraciones electrónicas recibidas +1,1 % hasta el 8-may-2026 (141,0 millones) [B3].' },
      { driver: 'Complejidad fiscal (ley fiscal de 2025: propinas, horas extra, deducciones nuevas)', efecto: '+', horizonte: 'Cíclico', evidencia: 'El reembolso medio subió un 11,5 % (3.276 USD) y H&R Block subió su NAC un 4,0 % [B3, B1].' },
      { driver: 'Paso de lo asistido a lo hecho por uno mismo', efecto: '−', horizonte: 'Estructural', evidencia: 'Declaraciones de profesionales +0,6 % frente a autopreparadas +1,7 % en 2026 [B3].' },
      { driver: 'IA y asistido virtual de bajo coste', efecto: '−', horizonte: 'Estructural', evidencia: 'TurboTax Live creció un 37 % en ingresos en el FY2026 de Intuit; Intuit baja precios de TurboTax para recuperar clientes que se van a alternativas de IA más baratas [B4, B5].' },
      { driver: 'Programas públicos gratuitos', efecto: '+/−', horizonte: 'Estructural', evidencia: 'Direct File del IRS suspendido para la temporada 2026; Free File con la industria hasta octubre de 2029 [B1].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 4, justificacion: 'Intuit, con TurboTax Live, ataca el asistido con precio y tecnología (+37 % en ingresos) [B4]; miles de preparadores independientes compiten en precio [B1].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Particulares sin poder individual, pero que cambian de canal: la principal razón para dejar TurboTax es el precio, según Intuit [B5].' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'El insumo es mano de obra de temporada (73.400 personas en el pico) y alquileres; salarios de campo +7,5 % en FY2026 [B1, B6].' },
      { fuerza: 'Amenaza de entrada', intensidad: 3, justificacion: 'Entrantes «nativos de IA» en fiscalidad y contabilidad, citados por Goldman Sachs [B7]; la marca, la red de oficinas y la garantía de exactitud siguen pesando en lo asistido.' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 4, justificacion: 'DIY gratuito, Free File, posible vuelta de Direct File y agentes de IA que rellenan la declaración: el riesgo central [B1, B5].' },
    ],
    ciclo: { posicion: 'Madurez del ciclo', comentario: 'Es un mercado poco cíclico: la renta se presenta en cualquier ciclo. En 2008-09 H&R Block mantuvo sus ingresos fiscales; en 2020 el aplazamiento del plazo al 15 de julio movió ingresos de un ejercicio a otro (FY2020 −15 %, FY2021 +29 % en las cuentas a abril) sin perderlos [B1]. El volumen total crece al ritmo de la población que declara (≈1 %); lo que cambia es el reparto entre canales [B3].' },
    regulacion: 'El IRS ofreció Direct File (presentación gratuita directa) en 2024 y 2025 y lo suspendió para la temporada 2026; la empresa avisa de que puede volver o ampliarse [B1]. El acuerdo Free File entre el IRS y la industria vence en octubre de 2029 [B1]. Hay propuestas recurrentes para que la Administración prerrellene las declaraciones con los datos de empresas y bancos [B1]. La ley fiscal de 2025 («One Big Beautiful Bill») añadió deducciones (propinas, horas extra) que hacen la declaración de 2026 más compleja [B1]. Reguladores federales y estatales vigilan los productos ligados al reembolso y el uso de datos (píxeles) [B1].',
    tendencias: 'La IA generativa cambia el bricolaje: Intuit integró asistentes en TurboTax, se alió con Anthropic en febrero de 2026 y presentó en septiembre un modelo «hecho por ti» que combina agentes de software y expertos humanos, mientras baja los precios de TurboTax [B5]. H&R Block responde con AI Tax Assist, ayuda de profesionales en su DIY y un modelo omnicanal [B1]. La lectura del mercado es que la IA abarata la declaración simple y empuja a los preparadores a clientes complejos y asesoría (IBISWorld) [B2]: H&R Block gana si mantiene a los complejos y pierde los sencillos.',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 15.0,
    posicion: '2.º en preparación fiscal de EE. UU. por ingresos tras Intuit; ≈15 % de las declaraciones presentadas por profesionales (11,3 de 75,3 millones) y ≈5 % de las autopreparadas (3,6 millones DIY de pago) [B1, B3]',
    competidores: [
      { nombre: 'Intuit (TurboTax y TurboTax Live)', pais: 'EE. UU.', ticker: 'INTU', ingresos: 5300, cuota_pct: null, margen_ebit_pct: null, comentario: 'TurboTax 5.300 M en su FY2026 (+7 %), de ellos TurboTax Live el 53 % (+37 %); 39,0 millones de unidades (−2 %) [B4]. Margen del grupo, no del segmento.' },
      { nombre: 'Jackson Hewitt', pais: 'EE. UU.', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Red de franquicias y oficinas en Walmart; de capital privado (Corsair) desde 2018, sin cuentas públicas.' },
      { nombre: 'TaxAct', pais: 'EE. UU.', ticker: null, ingresos: 249.5, cuota_pct: null, margen_ebit_pct: 36.0, comentario: 'DIY de bajo precio; guía 2022 de 249-250 M de ingresos y 89-91 M de resultado de segmento antes de venderse a Cinven por 720 M [B8].' },
      { nombre: 'Liberty Tax', pais: 'EE. UU.', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Franquicias de preparación asistida; de NextPoint desde 2021.' },
      { nombre: 'Preparadores independientes y contables', pais: 'EE. UU.', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: '127.000 empresas de preparación según IBISWorld; compiten en precio y cercanía [B2].' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Se estrecha',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'No hay: un cliente más no mejora el servicio a otro.' },
        { fuente: 'Costes de cambio', puntuacion: 2, evidencia: 'Cambiar de preparador cuesta poco, pero la declaración del año anterior, la garantía y la relación con el profesional retienen; retención +190 pb en FY2026 [B1].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'Marca de 70 años con 8.600 oficinas; sostiene subidas de NAC del 4 % anual con volumen plano [B1].' },
        { fuente: 'Ventaja en costes', puntuacion: 2, evidencia: 'Escala en formación, software y publicidad (278 M en FY2026) frente a independientes [B6]; pero el virtual de Intuit tiene menos coste fijo.' },
        { fuente: 'Escala eficiente', puntuacion: 2, evidencia: 'Solo dos grandes marcas nacionales en asistida; margen EBITDA del 26 % frente al de un preparador independiente.' },
      ],
    },
    amenazas: 'Tres amenazas, de mayor a menor probabilidad. (1) Intuit lleva su escala y su IA a lo asistido: TurboTax Live ya factura unos 2.800 M (53 % de TurboTax, +37 %) frente a 2.561 M de la asistida propia de H&R Block (+6,1 %) [B4, B6]; Goldman Sachs citó en febrero el riesgo de pérdida de cuota [B7]. (2) Agentes de IA que hacen la declaración entera por poco dinero y vacían la base de clientes sencillos, que es la que paga la red de oficinas. (3) Un programa público gratuito (Direct File) que vuelva con otra Administración [B1]. Probabilidad de erosión material del volumen en 5 años: media.',
    confianza: 'Media',
  },
  historia: {
    resumen: 'Henry y Richard Bloch fundaron la empresa en Kansas City en 1955 y la sacaron a bolsa en 1962; desde entonces paga dividendo trimestral sin interrupción [B6]. Creció con la red de franquicias y oficinas propias hasta ser la marca de referencia de la renta asistida en EE. UU. Tras vender la banca (H&R Block Bank) y otros negocios, en la década de 2010 se concentró en la preparación fiscal y empezó a recomprar acciones de forma masiva (más del 48 % desde 2016) [B6]. En 2019 compró Wave para pequeñas empresas y en 2021 cambió el cierre del ejercicio de abril a junio [B1]. En enero de 2026 Curtis Campbell, que había dirigido TaxAct y fue directivo de Intuit, sustituyó a Jeff Jones como consejero delegado [B1].',
    hitos: [
      { anio: '1955', hito: 'Fundación en Kansas City por Henry y Richard Bloch [B1].' },
      { anio: '1962', hito: 'Salida a bolsa; dividendo trimestral ininterrumpido desde entonces [B6].' },
      { anio: '2016', hito: 'Empieza la etapa de recompras masivas: más del 48 % de las acciones retiradas hasta 2026 [B6].' },
      { anio: '2019', hito: 'Compra de Wave Financial (software para pequeñas empresas) [B1].' },
      { anio: '2021', hito: 'Cambio del cierre del ejercicio de abril a junio [B1].' },
      { anio: '2024', hito: 'El IRS lanza Direct File (2024 y 2025); se suspende para 2026 [B1].' },
      { anio: '2026', hito: 'Curtis Campbell, consejero delegado desde enero; nueva estrategia «experta y apoyada en tecnología» [B1].' },
    ],
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Lo que más mueve las cifras es la protección de datos y del consumidor: H&R Block guarda datos fiscales y bancarios de 22 millones de declaraciones al año [B1] y está demandada (acciones colectivas, arbitrajes masivos e investigaciones públicas) por el uso de píxeles en su web y por el programa Free File [B1]. El segundo asunto es el trato a 73.400 trabajadores de temporada (salarios de campo de 997 M, +7,5 %) [B1, B6]. El tercero, los productos financieros ligados al reembolso, vigilados por los reguladores de consumo [B1].',
    controversias: 'Demandas colectivas, arbitrajes masivos e investigaciones públicas abiertas sobre el programa Free File del IRS y el uso de píxeles de seguimiento en el DIY, con provisión no desglosada [B1]. No se ha encontrado una sanción de un regulador de los últimos tres años en las fuentes primarias revisadas.',
    confianza: 'Baja',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) 10-K y proxy 2026 (no publican calificaciones); 2) web de inversores (informe de impacto sin calificaciones de agencias); 3) búsqueda MSCI/Sustainalytics (sin página abierta con la nota)', decision: 'Omitido' },
    { seccion: 'sector', campo: 'cr5_pct', tipo: 'Complemento', intentos: '1) IBISWorld (cuota solo de pago); 2) IRS (volúmenes sin reparto por preparador); 3) derivarlo con Intuit y H&R Block (sin datos del resto)', decision: 'Omitido' },
  ],
};
guarda('B', B_);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Proxy statement 2026 (DEF 14A): consejo, remuneración, accionistas significativos, pay ratio', editor: 'H&R Block, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-09-29', url: 'https://www.sec.gov/Archives/edgar/data/12659/000110465926111942/tm2617324-4_def14a.htm' },
  { id: 2, titulo: '8-K 5.07: resultados de la junta del 5-nov-2025', editor: 'H&R Block, Inc. (SEC)', tipo: 'Primaria', fecha: '2025-11-10', url: `${ED}/000001265925000018/hrb-20251105.htm` },
  { id: 3, titulo: '8-K: plan de sucesión (Jeff Jones se retira; Curtis Campbell, consejero delegado electo)', editor: 'H&R Block, Inc. (SEC)', tipo: 'Primaria', fecha: '2025-08-11', url: `${ED}/000110465925076182/tm2523074d1_ex99-1.htm` },
  { id: 4, titulo: '8-K: tres consejeros nuevos (Breig, Charnaux, Plaines)', editor: 'H&R Block, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-01-22', url: `${ED}/000001265926000003/finalbodrelease2.htm` },
  { id: 5, titulo: '8-K: Gerard y Winter no se presentarán a la reelección en 2026', editor: 'H&R Block, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-08-14', url: `${ED}/000001265926000028/hrb-20260812.htm` },
  { id: 6, titulo: 'Form 4 presentados entre el 19-oct-2025 y el 19-oct-2026 (herramientas/form4.mjs)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-19', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000012659&type=4' },
  { id: 7, titulo: 'Form 10-K FY2026: directivos, litigios', editor: 'H&R Block, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-08-14', url: `${ED}/000001265926000026/hrb-20260630.htm` },
  { id: 8, titulo: 'Notas de resultados anuales FY2023-FY2026 (guías y resultados)', editor: 'H&R Block, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-08-11', url: `${ED}/000001265926000019/q4fy26earningsrelease.htm` },
  { id: 9, titulo: '8-K: jubilación de la directora de contabilidad (Logerwell) y nombramiento de Wasleski', editor: 'H&R Block, Inc. (SEC)', tipo: 'Primaria', fecha: '2025-08-15', url: `${ED}/000160529725000017/hrb-20250813.htm` },
];
const ventasJones = F4.operaciones.filter((o) => o.codigo === 'S');
const C = {
  _estado: 'completo',
  directivos: {
    equipo: [
      { nombre: 'Curtis A. Campbell', cargo: 'Presidente y consejero delegado', desde: '2026', participacion_pct: 0.03, trayectoria: 'Consejero delegado desde enero de 2026; antes presidente de Global Consumer Tax y director de producto (desde junio de 2024), consejero delegado de TaxAct (2018-2023) y vicepresidente de producto en Intuit (2014-2017) [C7]. En su primer año, la temporada 2026 trajo NAC +4,0 % y BPA ajustado +13,9 % [C8].' },
      { nombre: 'Tiffany L. Mason', cargo: 'Directora financiera', desde: '2024', participacion_pct: null, trayectoria: 'Directora financiera desde septiembre de 2024; antes en Driven Brands (2020-2023) y Lowe’s (2006-2019, incluida la dirección financiera interina) [C7].' },
      { nombre: 'Richard A. Johnson', cargo: 'Presidente del consejo (independiente)', desde: '2019', participacion_pct: null, trayectoria: 'Exconsejero delegado y presidente de Foot Locker (2014-2023) [C1].' },
      { nombre: 'Dara S. Redler', cargo: 'Directora jurídica y de administración', desde: '2022', participacion_pct: null, trayectoria: 'Antes directora jurídica de Tilray y abogada en Coca-Cola [C7].' },
      { nombre: 'Scott R. Manuel', cargo: 'Director de estrategia y operaciones', desde: '2024', participacion_pct: null, trayectoria: 'Antes en Tribute Technology, McClatchy y Thomson Reuters [C7].' },
      { nombre: 'Mark Darling', cargo: 'Director de red de oficinas (Chief Retail Officer)', desde: '2026', participacion_pct: null, trayectoria: 'En la empresa desde 2019, responsable de las oficinas de EE. UU. desde 2023 [C7].' },
    ],
    historial_guidance: [
      { anio: 'FY2024', guia: 'BPA ajustado 4,10-4,30 USD; ingresos 3.530-3.585 M', real: 'BPA ajustado 4,41; ingresos 3.610 M', cumplida: 'Sí' },
      { anio: 'FY2025', guia: 'BPA ajustado 5,15-5,35 (con un tipo fiscal del 13 %); ingresos 3.690-3.750 M', real: 'BPA ajustado 4,66; ingresos 3.761 M (el cierre de inspecciones fiscales que bajaba el tipo se retrasó a FY2026)', cumplida: 'Parcial' },
      { anio: 'FY2026', guia: 'BPA ajustado 4,85-5,00; ingresos 3.875-3.895 M (subida en mayo a 5,10-5,20)', real: 'BPA ajustado 5,31; ingresos 3.945 M', cumplida: 'Sí' },
      { anio: 'FY2027', guia: 'BPA ajustado 6,04-6,24; ingresos 4.110-4.160 M; EBITDA ajustado 1.110-1.140 M', real: 'En curso', cumplida: 'Parcial' },
    ],
    comentario: 'Equipo nuevo en la cúpula: Campbell es consejero delegado desde enero de 2026 tras una sucesión anunciada en agosto de 2025 (Jones se quedó como asesor hasta septiembre de 2026), y la directora financiera llegó en septiembre de 2024 [C3, C7]. Campbell conoce de primera mano al rival que más importa (fue directivo de Intuit) y el DIY de bajo coste (TaxAct) [C7]. La guía se cumplió en FY2024 y FY2026 y falló en FY2025 por impuestos, no por el negocio [C8]. Sucesión ordenada; el consejo se renueva (tres consejeros nuevos en enero de 2026 y dos salidas en noviembre) [C4, C5].',
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      { nombre: 'Richard A. Johnson', cargo: 'Presidente', tipo: 'Independiente', desde: '2019', comisiones: 'Presidencia del consejo' },
      { nombre: 'Curtis A. Campbell', cargo: 'Consejero delegado', tipo: 'Ejecutivo', desde: '2026', comisiones: '—' },
      { nombre: 'Geralyn R. Breig', cargo: 'Consejera', tipo: 'Independiente', desde: '2026', comisiones: 'Remuneración; Gobierno y Nombramientos' },
      { nombre: 'Christian H. Charnaux', cargo: 'Consejero', tipo: 'Independiente', desde: '2026', comisiones: 'Auditoría' },
      { nombre: 'Sean H. Cohan', cargo: 'Consejero', tipo: 'Independiente', desde: '2021', comisiones: 'Remuneración; Gobierno y Nombramientos (presidente)' },
      { nombre: 'Anuradha (Anu) Gupta', cargo: 'Consejera', tipo: 'Independiente', desde: '2021', comisiones: 'n.d.' },
      { nombre: 'Mia F. Mends', cargo: 'Consejera', tipo: 'Independiente', desde: '2015', comisiones: 'n.d.' },
      { nombre: 'Stephanie C. Plaines', cargo: 'Consejera', tipo: 'Independiente', desde: '2026', comisiones: 'Auditoría' },
      { nombre: 'Victoria J. Reich', cargo: 'Consejera', tipo: 'Independiente', desde: '2011', comisiones: 'n.d.' },
      { nombre: 'Robert A. Gerard', cargo: 'Consejero (sale en la junta de 2026)', tipo: 'Independiente', desde: '2007', comisiones: 'n.d.' },
      { nombre: 'Matthew E. Winter', cargo: 'Consejero (sale en la junta de 2026)', tipo: 'Independiente', desde: '2014', comisiones: 'Remuneración (presidente)' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 1,
    voto_remuneracion_pct: 96.5, voto_remuneracion_contra_pct: 3.2, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: 'FY2026', total: 5.76, fijo: 0.82, variable_corto: 0.96, variable_largo: 3.85, ratio_salario_medio: 373 },
    remuneracion: 'El consejero delegado cobró 5,76 M USD en FY2026 (fijo 0,82, variable anual 0,96, acciones 3,85; 8,46 M anualizado), 373 veces el empleado mediano, que es un temporero de cuatro meses [C1]. El variable a largo plazo son acciones por objetivos (PSU) a tres años medidas por el EBITDA acumulado FY2026-FY2028, corregidas ±25 % por el rendimiento total para el accionista frente al S&P 400, con tope del 200 % [C1]; el anual mira ingresos, EBITDA y beneficio antes de impuestos [C1]. Hay política de recuperación (clawback), prohibición de coberturas y pignoración, y obligación de mantener el 50 % de las PSU un año [C1]. Premia el beneficio, no el crecimiento a cualquier precio; no mide el rendimiento del capital. El voto consultivo de 2025 salió con un 96,5 % a favor y un 3,2 % en contra del capital presente [C2].',
    accionistas: [
      { nombre: 'BlackRock', pct: 14.6, tipo: 'Institucional', variacion: 'Según su 13G/A de enero de 2024' },
      { nombre: 'FMR (Fidelity)', pct: 11.89, tipo: 'Institucional', variacion: '13G/A de febrero de 2026' },
      { nombre: 'AQR Capital Management', pct: 7.85, tipo: 'Institucional (cuantitativo)', variacion: 'Nuevo 13G en agosto de 2026' },
      { nombre: 'Vanguard Capital Management', pct: 5.41, tipo: 'Institucional', variacion: '13G de abril de 2026' },
      { nombre: 'Consejeros y directivos', pct: 0.7, tipo: 'Internos', variacion: 'Ventas de Jones en noviembre de 2025' },
    ],
    insiders: ventasJones.map((o) => ({ fecha: o.fecha, persona: o.persona.replace('Jones Jeffrey J II', 'Jeffrey J. Jones II (consejero delegado saliente)').replace('Darling Mark J.', 'Mark Darling (Chief Retail Officer)'), operacion: 'Venta', acciones: o.acciones, importe: r2(o.importe / 1e6) })),
    control_y_defensas: 'Sin accionista de control: el mayor (BlackRock) tiene el 14,6 % y los cuatro primeros, todos institucionales, el 39,8 % [C1]. Una acción, un voto, consejeros elegidos cada año por mayoría [C2]. Los estatutos obligan a que el presidente sea un independiente que nunca haya sido directivo de la empresa [C1]. No hay operaciones vinculadas relevantes en el proxy [C1]. La posición corta es alta (20,7 % del capital flotante según Yahoo): no es una defensa, pero amplifica los movimientos del precio.',
    alertas: [
      'Ventas del consejero delegado saliente: Jeff Jones vendió 305.267 acciones (13,9 M USD) el 12 y el 19 de noviembre de 2025, sin plan 10b5-1, tras anunciar su retiro en agosto de 2025 [C6, C3].',
      'Cambio de directora de contabilidad en octubre de 2025 (jubilación, sin desacuerdo) [C9].',
      'Cambio de consejero delegado en enero de 2026 (sucesión anunciada en agosto de 2025) [C3].',
      'Litigios y consultas públicas abiertas sobre Free File y píxeles [C7].',
    ],
    confianza: 'Alta',
  },
  fuentes: fC,
  huecos: [],
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const yh = Y.HRB;
const fD = [
  { id: 1, titulo: 'Históricos diarios de HRB, SPY y XLY (herramientas/bolsa.mjs): precio, rango, rentabilidades, beta, cierres de ejercicio', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://finance.yahoo.com/quote/HRB/history' },
  { id: 2, titulo: 'Yahoo Finance quoteSummary del 19-oct-2026 (consenso, objetivos, acciones, posición corta, comparables)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/HRB/analysis' },
  { id: 3, titulo: 'Daily Treasury Par Yield Curve Rates 2026 (10 años: 5,09 % el 16-oct-2026)', editor: 'U.S. Department of the Treasury', tipo: 'Primaria', fecha: '2026-10-16', url: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/daily-treasury-rates.csv/2026/all?type=daily_treasury_yield_curve' },
  { id: 4, titulo: 'Implied ERP by month (ERPbymonth.xlsx): octubre de 2026, 4,20 %', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 5, titulo: 'Blucora: venta de TaxAct a Cinven por 720 M USD (guía 2022 de TaxAct: ingresos 249-250 M, resultado de segmento 89-91 M)', editor: 'Blucora, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2022-11-01', url: 'https://www.sec.gov/Archives/edgar/data/1068875/000106887522000109/ex-991erq32022.htm' },
  { id: 6, titulo: 'Goldman Sachs baja su objetivo de H&R Block a 32 USD desde 48 y mantiene Vender (6-feb-2026)', editor: 'Insider Monkey (Yahoo Finance)', tipo: 'Prensa', fecha: '2026-02-17', url: 'https://finance.yahoo.com/news/goldman-sachs-lowers-price-target-102833491.html' },
  { id: 7, titulo: 'Titulares de HRB en Seeking Alpha (resultados frente al consenso, subida del dividendo, artículos de opinión)', editor: 'Seeking Alpha (RSS)', tipo: 'Datos de mercado', fecha: '2026-10-04', url: 'https://seekingalpha.com/api/sa/combined/HRB.xml' },
  { id: 8, titulo: 'HRB News Today (titulares jun-oct 2026: subida tras resultados, mejora de Zacks, venta de Darling)', editor: 'MarketBeat', tipo: 'Prensa', fecha: '2026-10-15', url: 'https://www.marketbeat.com/stocks/NYSE/HRB/news/' },
  { id: 9, titulo: 'Movimiento del precio (herramientas/movimiento.mjs HRB)', editor: 'Yahoo Finance, históricos diarios', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/HRB/history' },
  { id: 10, titulo: 'Intuit Stock Falls 52% YTD as CEO Pitches AI-Native Platform at Investor Day', editor: 'Pomegra', tipo: 'Prensa', fecha: '2026-09-17', url: 'https://pomegra.io/briefs/2026-09-17-intuit-investor-day' },
  { id: 11, titulo: 'Form 10-K FY2026 (acciones en circulación a 31-jul-2026: 123.265.922)', editor: 'H&R Block, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-08-14', url: `${ED}/000001265926000026/hrb-20260630.htm` },
  { id: 12, titulo: 'Franchise Group: venta de Liberty Tax a NextPoint por 255,3 M USD (10-K 2021)', editor: 'Franchise Group, Inc. (SEC)', tipo: 'Primaria', fecha: '2022-03-01', url: 'https://www.sec.gov/Archives/edgar/data/1528930/000152893022000004/tax-20211225.htm' },
  { id: 13, titulo: 'Corsair Capital compra Jackson Hewitt a H.I.G. (términos no publicados)', editor: 'Simpson Thacher', tipo: 'Prensa', fecha: '2018-05-31', url: 'https://www.stblaw.com/about-us/news/view/2018/05/31/corsair-capital-acquires-jackson-hewitt-tax-service' },
];
const comp = ['INTU', 'PAYX', 'ADP', 'FTDR', 'SCI', 'ROL', 'LOPE', 'WU'].map((t) => {
  const d = Y[t]; const tr = Object.fromEntries(d.trend.map((x) => [x.periodo, x]));
  return {
    nombre: d.nombre, ticker: t, pais: 'US', capitalizacion: Math.round(d.cap / 1e6), ev_ventas: r2(d.ev / d.ventas), ev_ebitda_ltm: r1(d.ev_ebitda), ev_ebitda_ntm: null,
    per_ntm: r1(d.per_adelantado), crecimiento_pct: tr['+1y']?.crec_ventas != null ? r1(tr['+1y'].crec_ventas * 100) : null,
    margen_ebitda_pct: r1(d.ebitda / d.ventas * 100), roic_pct: null, dn_ebitda: r2((d.ev - d.cap) / d.ebitda), fcf_yield_pct: null,
  };
});
const D = {
  _estado: 'completo',
  identificacion: {
    nombre: 'H&R Block, Inc.', nombre_corto: 'H&R Block', ticker: 'HRB', isin: 'US0936711052', mercado: 'New York Stock Exchange', indice_referencia: 'S&P MidCap 400',
    pais: 'Estados Unidos', pais_iso: 'US', sector: 'Consumo discrecional', industria: 'Servicios al consumidor diversificados', sede: 'Kansas City (Misuri)', fundacion: '1955', empleados: 4600, web: 'https://www.hrblock.com',
    precio: B.identificacion.precio, fecha_precio: B.identificacion.fecha_precio, acciones: 124.7, capitalizacion_publicada: Math.round(yh.acciones / 1e6 * B.identificacion.precio), free_float_pct: 99.3,
    max_52s: B.identificacion.max_52s, min_52s: B.identificacion.min_52s, volumen_medio_diario: `≈ ${B.volumen_3m.importe_dia_millones.toFixed(1).replace('.', ',')} M USD/día (3 meses)`, proximos_resultados: '2026-11-05',
  },
  consenso: {
    guidance: 'Guía FY2027 (11-ago-2026): ingresos de 4.110-4.160 M USD (+4,2 % a +5,4 %), EBITDA ajustado de 1.110-1.140 M, tipo fiscal efectivo ≈ 23 % y BPA ajustado de 6,04-6,24 USD [D7]. La dirección planea ≈ 400 M de recompras en FY2027 y espera que el crecimiento del sector se modere, manteniendo o ganando cuota en asistidas. No hay objetivo público a medio plazo. Sin cambios desde agosto.',
    estimaciones: [
      { periodo: 'FY2027e', ingresos: Math.round(yh.trend[2].ventas / 1e6), ebitda: null, ebit: null, bpa: yh.trend[2].bpa, dpa: 1.84, fuente: `Yahoo Finance, ${yh.trend[2].n} analistas [D2]` },
      { periodo: 'FY2028e', ingresos: Math.round(yh.trend[3].ventas / 1e6), ebitda: null, ebit: null, bpa: yh.trend[3].bpa, dpa: null, fuente: `Yahoo Finance, ${yh.trend[3].n} analistas [D2]` },
    ],
    recomendaciones: { n_analistas: 5, comprar: 1, mantener: 3, vender: 1, po_medio: r2(yh.po_medio), po_min: yh.po_min, po_max: yh.po_max },
    revisiones: `Cobertura escasa (3-5 analistas). El BPA FY2027 del consenso subió de ${String(yh.trend[2].bpa_hace90).replace('.', ',')} a ${String(yh.trend[2].bpa).replace('.', ',')} USD en 90 días, tras la guía de agosto, y el de FY2028 bajó de ${String(yh.trend[3].bpa_hace90).replace('.', ',')} a ${String(yh.trend[3].bpa).replace('.', ',')} (con solo cinco estimaciones, el cambio puede deberse a quién publica) [D2]. Goldman Sachs bajó su objetivo a 32 USD desde 48 en febrero y mantiene Vender por riesgo de pérdida de cuota frente a TurboTax y a entrantes de IA [D6]; Zacks mejoró la recomendación en octubre [D8]. Una sola fuente gratuita con estimaciones completas (Yahoo); el objetivo medio se contrasta con los titulares de Seeking Alpha y MarketBeat.`,
    base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: 0.7,
    confianza: 'Media',
  },
  bolsa: {
    ...B.bolsa,
    tramo_drawdown: undefined,
    posicion_corta_pct: r1(yh.corto_pct * 100),
    comentario: 'H&R Block ha rendido un 18,5 % anual en cinco años frente al 12,6 % del S&P 500, pero un 7,3 % en tres años frente al 22,9 % [D1]. La caída máxima de cinco años (−55,5 %, de agosto de 2024 a febrero de 2026) vino del miedo a que la IA y Intuit vacíen la renta asistida, que llevó la acción a 28,16 USD el 12-feb-2026, a menos de 6 veces el beneficio [D1, D6]. Desde ahí rebotó con una buena temporada (+26 % en la semana de resultados de mayo) y con los resultados y la guía de agosto (+12-16 % el 12-ago, máximo de 58,67), y devolvió parte en septiembre cuando Intuit anunció bajadas de precio y su modelo de IA (−23 % en un mes hasta el 28-sep) [D1, D7, D10]. La volatilidad (46 %) es la de una acción en disputa, no la de un negocio estable; la beta frente al S&P es baja (0,42 mensual) porque el riesgo es propio.',
  },
  multiplos_historicos: {
    serie: B.cierres_ejercicio.filter((c) => +c.anio.slice(2) >= 2022).map((c) => ({ anio: c.anio, precio_cierre: c.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    comentario: null,
    confianza: 'Alta',
  },
  comparables: {
    criterio: 'No hay otra preparadora de impuestos cotizada de tamaño parecido: Jackson Hewitt y TaxAct son de capital privado. Se usan Intuit (el rival directo en DIY y, con TurboTax Live, en asistida) y servicios al consumidor y a pequeñas empresas con demanda recurrente, marca y redes de oficinas o franquicias: Paychex y ADP (nóminas para pymes, como Wave y Block Advisors), Frontdoor, Service Corporation, Rollins, Grand Canyon Education y Western Union (cobros de particulares que la tecnología presiona). Todas con datos de Yahoo del mismo día [D2].',
    empresas: comp,
    comentario: null,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2022-11', objetivo: 'TaxAct (DIY fiscal)', comprador: 'Cinven', ev: 720, ev_ventas: 2.89, ev_ebitda: 8.0, prima_pct: null, excluir: false, comentario: 'Múltiplo sobre la guía 2022 de TaxAct (ingresos 249,5 M y resultado de segmento ≈ 90 M, antes de costes corporativos): EV/resultado operativo ≈ 8,0x [D5].' },
      { fecha: '2021-07', objetivo: 'Liberty Tax', comprador: 'NextPoint Financial', ev: 255.3, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Contraprestación total de 255,3 M (181,2 M en caja y 74,1 M en acciones) [D12]; sin ingresos ni EBITDA publicados para calcular el múltiplo.' },
      { fecha: '2018-05', objetivo: 'Jackson Hewitt', comprador: 'Corsair Capital', ev: null, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Términos no publicados [D13].' },
    ],
    comentario: 'Solo TaxAct tiene múltiplo calculable: Cinven pagó unas 8 veces el resultado operativo de un negocio DIY que crecía (+10 %) en plena era previa a la IA generativa [D5]. Es una referencia de valor de control para el negocio de software, no para la red de oficinas. H&R Block, con 5.900 M de capitalización, sin accionista de control y con un flujo de caja estable, podría interesar a un fondo, pero no hay ninguna noticia de interés.',
    confianza: 'Baja',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'transacciones', campo: 'operaciones (múltiplos de Liberty Tax y Jackson Hewitt)', tipo: 'Complemento', intentos: '1) 8-K de Blucora (TaxAct: sí hay múltiplo); 2) 10-K 2021 de Franchise Group (Liberty Tax: precio sin ingresos ni EBITDA); 3) búsqueda de la compra de Jackson Hewitt por Corsair (términos no publicados)', decision: 'Omitido' },
    { seccion: 'consenso', campo: 'estimaciones de EBITDA y FY2029e', tipo: 'Complemento', intentos: '1) Yahoo earningsTrend (solo BPA y ventas de dos ejercicios); 2) MarketScreener (no abre sin WebFetch y no se usó para cifras); 3) guía de la empresa (solo FY2027)', decision: 'Omitido' },
  ],
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Stocktwits, flujo de mensajes de $HRB (agosto-octubre de 2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-16', url: 'https://api.stocktwits.com/api/2/streams/symbol/HRB.json' },
  { id: 2, titulo: 'Seeking Alpha: artículos de opinión de mayo a octubre de 2026 («The Melting Ice Cube», «Potential To Double», «A Boring Business With An Interesting Return»)', editor: 'Seeking Alpha (RSS)', tipo: 'Foros y redes', fecha: '2026-10-04', url: 'https://seekingalpha.com/api/sa/combined/HRB.xml' },
  { id: 3, titulo: 'MarketBeat, titulares y comentarios de HRB (jun-oct 2026)', editor: 'MarketBeat', tipo: 'Foros y redes', fecha: '2026-10-15', url: 'https://www.marketbeat.com/stocks/NYSE/HRB/news/' },
];
const E = {
  _estado: 'completo',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Stocktwits ($HRB)', fecha: '2026-10', n_comentarios: 30, tono: 'Dividido', resumen: 'Euforia el 12-ago con la subida tras resultados («por encima de 100 en seis meses») y mensajes de corto plazo; en septiembre, quejas de la caída del 20 % «sin un solo comentario»; poco debate de fondo [E1].' },
      { plataforma: 'Seeking Alpha (artículos y comentarios)', fecha: '2026-10', n_comentarios: 12, tono: 'Positivo', resumen: 'La mayoría de los autores la ve barata (6-7 veces el beneficio, recompras, dividendo): «Potential To Double», «A Boring Business With An Interesting Return»; la tesis contraria, «The Melting Ice Cube» (mayo), sostiene que la IA y el DIY la derriten [E2].' },
      { plataforma: 'MarketBeat (titulares y notas)', fecha: '2026-10', n_comentarios: 15, tono: 'Neutro', resumen: 'Cobertura de resultados positiva en agosto, mejora de Zacks en octubre y la venta de 2.700 acciones de un directivo; sin debate sobre Intuit [E3].' },
    ],
    temas: [
      { tema: 'La IA y TurboTax vacían la renta asistida («cubito de hielo que se derrite»)', postura: 'Dividida', peso: 'Alto', contraste: 'Los datos no lo confirman todavía: asistidas totales −0,1 % y NAC +4,0 % en FY2026, pero TurboTax Live crece un 37 % y las declaraciones de profesionales del IRS solo +0,6 %. Es el riesgo central del informe.' },
      { tema: 'Barata: 6-7 veces el beneficio con recompras del 7-8 % anual', postura: 'Alcista', peso: 'Alto', contraste: 'Cierto en cifras (BPA ajustado 5,31 y guía 6,04-6,24 frente a un precio de 48,67); la pregunta es si el beneficio aguanta, no el múltiplo.' },
      { tema: 'Volatilidad y posición corta', postura: 'Dividida', peso: 'Medio', contraste: 'Posición corta del 20,7 % del flotante y volatilidad del 46 %: los movimientos de ±20 % en semanas son habituales.' },
    ],
    lectura: 'El inversor particular está dividido entre el valor (múltiplo de 7 veces, dividendo del 3,8 %, recompras) y el miedo a la IA, igual que los analistas. No hay euforia ni capitulación: la acción rebotó un 70 % desde el mínimo de febrero y ha devuelto parte. El sentimiento no aporta un riesgo que el informe no recoja; confirma que la tesis depende de si la temporada de 2027 vuelve a mostrar volumen estable frente a TurboTax Live.',
    confianza: 'Baja',
  },
  fuentes: fE,
  huecos: [],
};
guarda('E', E);
console.log('Notas A-E escritas.');
