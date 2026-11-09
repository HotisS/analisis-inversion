// actualizar-notas.mjs — Daiichi Sankyo, iteración del 9-nov-2026 tras el 2T FY2026 (publicado el 30-oct-2026).
// Parte de las notas A-D del informe del 8-oct (copiadas tal cual) y cambia solo lo que mueven los resultados y el
// mercado: LTM, trimestres, puente, acciones, precio, bolsa, consenso, comparables (llevados al nuevo cierre con la
// variación de precio y de divisa), tasa libre y hechos de gobierno nuevos. Se ejecuta una vez:
//   node informes/daiichi-sankyo-2026-11-09/notas/actualizar-notas.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = dirname(fileURLToPath(import.meta.url));
const leer = (f) => JSON.parse(readFileSync(join(dir, f), 'utf8'));
const escribir = (f, o) => writeFileSync(join(dir, f), JSON.stringify(o, null, 2));
const A = leer('A.json'), C = leer('C.json'), D = leer('D.json');
const bolsa = leer('bolsa.json');
const nueva = (nota, f) => { const id = Math.max(...nota.fuentes.map((x) => x.id)) + 1; nota.fuentes.push({ id, ...f }); return id; };

// ───────────── A. Cuentas ─────────────
const a1 = nueva(A, { titulo: 'Consolidated Financial Results for the First Six Months of the Year Ending March 31, 2027 (Kessan Tanshin 2T FY2026)', editor: 'Daiichi Sankyo', tipo: 'Primaria', fecha: '2026-10-30', url: 'https://www.daiichisankyo.com/files/investors/library/quarterly_result/2026/FY2026Q2_Financial_Results_E.pdf' });
const a2 = nueva(A, { titulo: 'Reference Data (Consolidated Financial Results for Q2 FY2026)', editor: 'Daiichi Sankyo', tipo: 'Primaria', fecha: '2026-10-30', url: 'https://www.daiichisankyo.com/files/investors/library/quarterly_result/2026/FY2026Q2_Reference_Data_E.pdf' });
const a3 = nueva(A, { titulo: 'FY2026 Q2 Financial Results Presentation', editor: 'Daiichi Sankyo', tipo: 'Primaria', fecha: '2026-10-30', url: 'https://www.daiichisankyo.com/files/investors/library/quarterly_result/2026/FY2026Q2_Financial_Results_Presentation_E.pdf' });

// LTM sep-26 = FY2025 + 1S FY2026 − 1S FY2025 (cifras completas NIIF, no «core») [a1, a2].
A.financieros.ltm = {
  periodo: 'LTM sep-26', fecha_fin: '2026-09-30',
  ingresos: 2123045 + 1167233 - 975353,                 // 2.314.925
  ebitda: (258047 + 193795 - 144237) + (77460 + 43351 - 36689), // EBIT 307.605 + amortizaciones 84.122
  ebit: 258047 + 193795 - 144237,
  beneficio_neto: 279728 + 151534 - 130814,             // 300.448
  bpa: Math.round((151.1 + 83.22 - 70.55) * 100) / 100, // 163,77
  dpa: 39 + 50,                                          // final FY2025 + a cuenta FY2026
  dpa_extraordinario: 0,
  fcf: (77655 + 50738 + 28311) - (149002 + 67370 + 6666 - 67289 - 11869) - (18068 + 11810 - 7824),
  participadas_en_ebitda: null,
  // No recurrentes dentro del EBIT y fuera de las amortizaciones: los de FY2025 (32.500) + 1S FY2026 (reestructuración
  // de la unidad EU Specialty 21.600 − reversión de Odawara 6.900 + deterioro de paclitaxel 3.000 = 17.700)
  // − 1S FY2025 (gastos 1.100 − ingreso por el litigio de Ranbaxy 4.200 = −3.100) [a2].
  no_recurrentes_en_ebitda: 32500 + 17700 + 3100,
};

// Trimestres: fuera 2T24, entra 2T26 (jul-sep 2026) [a2].
A.trimestres.items = A.trimestres.items.filter((t) => t.periodo !== '2T24');
A.trimestres.items.find((t) => t.periodo === '1T26').vs_consenso = null;
A.trimestres.items.push({ periodo: '2T26', ingresos: 592500, crecimiento_pct: 18.3, crecimiento_organico_pct: null,
  ebitda: 108700 + (43351 - 21484), margen_ebitda_pct: 22.0, bpa: 45.52, vs_consenso: 'Superior' });
A.trimestres.ultima_presentacion += ` **2T FY2026 (30-oct-2026)** [${a3}, ${a1}]: ventas del semestre +19,7 % (1,167 billones; 73.900 M por el yen) y core OP +46,9 % (221.300 M, el 61,5 % de la guía anual); beneficio operativo +34,4 % con 21.600 M de reestructuración de la unidad europea. La guía del año (2,34 billones de ventas, 360.000 M de core OP, BPA 137,94) **no cambia**, aunque sube la previsión por producto: Enhertu 915.300 M (+20.500 M), Datroway 118.900 M (+2.000 M) y los hitos de ventas de Enhertu 96.900 M (+3.100 M) [${a2}]. Con la guía intacta, el segundo semestre implica solo 138.700 M de core OP frente a 221.300 M en el primero. La compensación a fabricantes baja de 21.000 M a 4.300 M en el semestre: 15.900 M de pago único a ciertos CMO para cerrar las obligaciones mínimas de compra futuras, menos 11.600 M de divisa y reversión [${a3}]. Cambios de calendario: **AVANZAR** (Datroway + durvalumab en pulmón no microcítico de primera línea) pasa de «2S del año natural 2026» a «1S de 2027» [${a3}]; la solicitud de I-DXd en microcítico se retiró en septiembre. Nueva unidad comercial única desde abril de 2027 y colaboración con Summit para combinar Datroway con ivonescimab.`;

// Balance y flujos del semestre al comentario (el histórico sigue siendo anual).
A.balance.comentario += ` **A 30-sep-2026** [${a1}, ${a2}]: liquidez disponible (caja, valores e inversiones) de 727.800 M y deuda con interés de 548.500 M (500.333 de bonos y préstamos), caja neta de 179.300 M según la empresa, frente a 201.200 M en marzo. En el semestre entraron 200.000 M de bonos y el 9-oct-2026 otros 116.000 M (3, 5 y 7 años al 2,41-3,16 %) para circulante. Existencias 796.888 M (+104.510 M en seis meses); pasivos por contrato 865.437 M.`;
A.flujos.comentario += ` **1S FY2026** [${a1}]: flujo operativo de 50.738 M (−28.311 M un año antes), con 108.816 M más de existencias y 108.601 M de impuestos pagados; capex 74.036 M; cobro de 73.950 M por el 30 % de Daiichi Sankyo Healthcare; dividendos 71.102 M y recompras 483 M.`;
A.negocio.kpis = A.negocio.kpis || [];
escribir('A.json', A);

// ───────────── C. Gobierno ─────────────
const c1 = nueva(C, { titulo: 'Daiichi Sankyo Reports Second Quarter Fiscal Year 2026 Financial Results (nota de prensa)', editor: 'Daiichi Sankyo (BioSpace)', tipo: 'Primaria', fecha: '2026-10-30', url: 'https://www.biospace.com/press-releases/daiichi-sankyo-reports-second-quarter-fiscal-year-2026-financial-results' });
const c2 = nueva(C, { titulo: 'Kabutan: noticias de 4568 (informe de cambio de BlackRock n.º 6, 21-oct-2026; aviso del recurso de NTK, 28-sep-2026)', editor: 'Kabutan', tipo: 'Prensa', fecha: '2026-10-21', url: 'https://kabutan.jp/stock/news?code=4568&page=2' });
C.gobierno.alertas.push(
  `**Cambios en la dirección comercial (30-oct-2026).** Ken Keller, jefe de oncología y el directivo mejor pagado, pasa a un cargo nuevo de director de comercialización (Chief Commercialization Officer) desde el 1-abr-2027, al frente de una unidad que junta oncología y especialidades [${c1}].`,
  `**Litigio de Northern TK Venture.** El Tribunal de Distrito de Tokio desestimó todas las reclamaciones de daños de NTK; NTK recurrió (aviso del 28-sep-2026) [${c1}, ${c2}].`,
);
C.gobierno.accionistas.push({ nombre: 'BlackRock (grupo)', pct: null, tipo: 'Gestora (informe de cambio de participación significativa)', variacion: `Informe de cambio n.º 6 del 21-oct-2026: aumenta su participación (porcentaje no leído en la fuente) [${c2}]` });
escribir('C.json', C);

// ───────────── D. Mercado y valoración ─────────────
const d1 = nueva(D, { titulo: 'Históricos diarios de 4568.T, 1305.T (TOPIX) y 1621.T (TOPIX-17 farmacéutico), hasta el 9-nov-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-11-09', url: 'https://finance.yahoo.com/quote/4568.T/history' });
const d2 = nueva(D, { titulo: 'Daiichi Sankyo (4568.T): earningsTrend, financialData y recommendationTrend (quoteSummary)', editor: 'Yahoo Finance', tipo: 'Analistas', fecha: '2026-11-09', url: 'https://finance.yahoo.com/quote/4568.T/analysis' });
const d3 = nueva(D, { titulo: 'Interest Rate (JGB constant maturity yields), noviembre de 2026', editor: 'Ministerio de Hacienda de Japón', tipo: 'Primaria', fecha: '2026-11-06', url: 'https://www.mof.go.jp/english/policy/jgbs/reference/interest_rate/jgbcme.csv' });
const d4 = nueva(D, { titulo: 'Cierres del 7-oct y del 6/9-nov-2026 de Chugai, Takeda, Astellas, Otsuka, AstraZeneca, Merck, Pfizer, Roche y tipos JPY/USD, JPY/GBP y JPY/CHF', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-11-09', url: 'https://finance.yahoo.com/' });
const d5 = nueva(D, { titulo: 'Reference Data (Consolidated Financial Results for Q2 FY2026): balance a 30-sep-2026 y liquidez', editor: 'Daiichi Sankyo', tipo: 'Primaria', fecha: '2026-10-30', url: 'https://www.daiichisankyo.com/files/investors/library/quarterly_result/2026/FY2026Q2_Reference_Data_E.pdf' });

const id = bolsa.identificacion;
Object.assign(D.identificacion, {
  precio: id.precio, fecha_precio: id.fecha_precio, max_52s: id.max_52s, min_52s: id.min_52s,
  acciones: 1822.07, // 1.862.893.329 emitidas − 40.827.459 en autocartera a 30-sep-2026 [d5]
  capitalizacion_publicada: 5187422, // Yahoo, 9-nov-2026 (1.822,07 M × 2.847)
  volumen_medio_diario: '≈ 7,1 M acciones/día, ≈ 19.700 M JPY/día (3 meses)',
  proximos_resultados: '2027-01-30',
});
D.notas_integrador += ` | 9-NOV: acciones 1.862.893.329 − 40.827.459 = 1.822,07 M a 30-sep-2026; precio 2.847 (cierre 9-nov, Yahoo); próximos resultados (3T) estimados a finales de enero de 2027 (Yahoo da 29-ene, sin confirmar).`;

D.bolsa = { ...D.bolsa, ...bolsa.bolsa, posicion_corta_pct: D.bolsa.posicion_corta_pct };
for (const s of D.multiplos_historicos.serie) { const c = bolsa.cierres_ejercicio?.find((x) => x.anio === s.anio); if (c) s.precio_cierre = c.precio_cierre; }

// Consenso tras los resultados: Yahoo (earningsTrend, 9-nov) para FY2026e-FY2027e; FY2028e y los EBITDA/EBIT de
// MarketScreener (anteriores a los resultados, la página no se ha actualizado).
const ms = D.consenso.estimaciones;
D.consenso.estimaciones = [
  { periodo: 'FY2026e', ingresos: 2370878, ebitda: ms[0].ebitda, ebit: ms[0].ebit, bpa: 152.6, dpa: ms[0].dpa, fuente: `Yahoo Finance, 15 analistas en BPA y 14 en ventas, 9-nov-2026 [${d2}]; EBITDA, EBIT y DPA de MarketScreener anteriores a los resultados [9]` },
  { periodo: 'FY2027e', ingresos: 2412574, ebitda: ms[1].ebitda, ebit: ms[1].ebit, bpa: 186.39, dpa: ms[1].dpa, fuente: `Yahoo Finance, 15 analistas, 9-nov-2026 [${d2}]; EBITDA, EBIT y DPA de MarketScreener [9]` },
  { ...ms[2], fuente: 'MarketScreener (columna «2029», ejercicio a marzo de 2029), anterior a los resultados del 2T [9]' },
];
D.consenso.recomendaciones = { n_analistas: 16, comprar: 13, mantener: 3, vender: 0, po_medio: 4021.25, po_min: 2750, po_max: 5200 };
D.consenso.guidance = D.consenso.guidance.replace('Para FY2026', `Guía confirmada el 30-oct-2026 sin cambios [${d5}]. Para FY2026`);
D.consenso.revisiones = `Tras el 2T, Yahoo da para el BPA de FY2026e 152,60 JPY (150,72 hace 7 días, 151,05 hace 30 y 145,67 hace 90) y para FY2027e 186,39 (178,61 hace 7 días, 180,23 hace 30, 188,62 hace 90): subida de un 3-4 % en la semana de resultados, que deja FY2027e casi donde estaba hace tres meses [${d2}]. El objetivo medio baja de 4.077,5 a 4.021,25 JPY (16 analistas; 2.750-5.200) y la distribución no cambia en tres meses: 13 comprar, 3 mantener [${d2}]. El consenso de FY2026e queda un 10,6 % por encima de la guía (137,94), que la empresa no subió [${d5}]. MarketScreener sigue sin actualizar FY2025 ni las estimaciones [9].`;

// Comparables: cifras del 7-oct llevadas al nuevo cierre con la variación de precio (y de divisa en los extranjeros).
const ratio = { '4519': 1.1777, '4502': 1.1573, '4503': 1.1450, '4578': 1.0427, AZN: 1.1437 * 1.0145, MRK: 1.0276 * 0.9964, PFE: 1.0496 * 0.9964, ROG: 1.0846 * 1.0176 };
const ratioPrecio = { '4519': 1.1777, '4502': 1.1573, '4503': 1.1450, '4578': 1.0427, AZN: 1.1437, MRK: 1.0276, PFE: 1.0496, ROG: 1.0846 };
const r2 = (x, n = 2) => (x == null ? null : Math.round(x * 10 ** n) / 10 ** n);
for (const e of D.comparables.empresas) {
  const rp = ratioPrecio[e.ticker], rc = ratio[e.ticker];
  if (!rp) continue;
  e.capitalizacion = Math.round(e.capitalizacion * rc);
  e.per_ntm = r2(e.per_ntm * rp);
  for (const k of ['ev_ventas', 'ev_ebitda_ltm', 'ev_ebitda_ntm']) if (e[k] != null) e[k] = r2(e[k] * rp, k === 'ev_ventas' ? 2 : 1);
  if (e.fcf_yield_pct != null) e.fcf_yield_pct = r2(e.fcf_yield_pct / rp, 1);
}
D.comparables.criterio += ` Cifras del 7-oct-2026 llevadas al cierre del 9-nov (Japón) y del 6-nov (resto) con la variación de la cotización y del tipo de cambio [${d4}]; el EV se escala como la capitalización (aproximación). Las farmacéuticas japonesas subieron un 4-18 % en el mes y Daiichi un 5,3 %.`;
escribir('D.json', D);
console.log('Notas A, C y D actualizadas. LTM:', A.financieros.ltm);
