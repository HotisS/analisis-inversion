// Iteración del 8-nov-2026 (tras los resultados de 9M26, 20-oct-2026): pone al día las notas A y D copiadas de
// informes/enagas-2026-10-07/notas con los hechos nuevos. Se ejecuta UNA vez sobre las copias:
//   node informes/enagas-2026-11-08/notas/actualizar-notas.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const aqui = dirname(fileURLToPath(import.meta.url));
const leer = (f) => JSON.parse(readFileSync(join(aqui, f), 'utf8'));
const escribir = (f, o) => writeFileSync(join(aqui, f), JSON.stringify(o, null, 2));
const A = leer('A.json');
const D = leer('D.json');
const B = leer('bolsa.json');
if (A._iteracion === '2026-11-08') throw new Error('Ya actualizado');

// ───────────────────────── A: cuentas ─────────────────────────
const idA = A.fuentes.length + 1; // 17
A.fuentes.push(
  { id: idA, titulo: 'Informe de resultados 9M2026 (nota a la CNMV): cuenta, balance y flujos a 30-sep-2026', editor: 'Enagás', tipo: 'Primaria', fecha: '2026-10-20', url: 'https://www.enagas.es/content/dam/enagas/en/files/accionistas-e-inversores/informacion-economico-financiera/informes-resultados-presentaciones/informacion-publica-periodica/Nota%20CNMV%20Results%209M2026.pdf' },
  { id: idA + 1, titulo: 'Nota de prensa: resultados de los nueve primeros meses de 2026', editor: 'Enagás', tipo: 'Primaria', fecha: '2026-10-20', url: 'https://www.enagas.es/content/dam/enagas/en/files/enagas-communication-room/present/press-releases/2026/20261020%20NP%20Resultados%203T2026_EN_pr.pdf' },
);
const n9 = idA; const np = idA + 1;

// Trimestres: fuera el 3T24, entra el 3T26 = 9M26 − 1S26 (ingresos 696,7 − 464,4; EBITDA de la empresa 491,5 − 314,0).
A.trimestres.items = A.trimestres.items.filter((t) => t.periodo !== '3T24');
A.trimestres.items.push({ periodo: '3T26', ingresos: 232.3, crecimiento_pct: -7.7, crecimiento_organico_pct: null, ebitda: 177.5, margen_ebitda_pct: 76.4, bpa: null, vs_consenso: null });
A.trimestres.ultima_presentacion += `\n\n**Resultados 9M26 (20-oct-26).** EBITDA de 491,5 M (−2,9 %) y beneficio recurrente de 195,8 M (−5,4 %), «en línea» con la guía de ≈ 620 M y ≈ 235 M, que la empresa no cambia [${n9}]. El marco 2021-2026 resta 45,1 M de ingresos regulados; lo compensan en parte el buque Alisios (+5,4 M de EBITDA) y Axent (+5,9 M) y, sobre todo, las participadas: 145,8 M (+23,9 %) por la ampliación de TAP y por Teréga, que aporta 7,4 M desde el 30-jul [${n9}]. Sin participadas, el EBITDA cae de 388,2 a 345,7 M (−10,9 %; estimación propia con las cifras de la nota). Deuda neta de 2.979 M con Teréga (2.475 M en dic-25) y FFO / deuda neta del 20,5 % (27,4 % un año antes) [${n9}]. Beneficio neto de 204,1 M con la venta del 40 % de Enagás Renovable (+8,3 M). La empresa reitera el dividendo de 1 EUR por acción [${np}]. No hemos podido leer la sesión de preguntas de la conferencia (ver huecos).`;

// LTM sep-26 = 2025 − 9M25 + 9M26 (EBIT y amortizaciones con PPA, como en las cuentas anuales).
// Amortización: 283,841 − (212,8 + 17,9) + (208,9 + 18,7) = 280,741; EBIT: 368,108 − 275,2 + 263,9 = 356,808.
// Participadas netas de PPA: 131,6 − (117,7 − 17,9) + (145,8 − 18,7) = 158,9.
A.financieros.ltm = {
  periodo: 'LTM sep-26', fecha_fin: '2026-09-30',
  ingresos: 962.3, ebitda: 637.5, ebit: 356.8, beneficio_neto: 280.4, bpa: 1.07, dpa: 1.0, dpa_extraordinario: 0, fcf: null,
  participadas_en_ebitda: 158.9, no_recurrentes_en_ebitda: null,
};
// Participadas dentro del EBITDA de cada ejercicio (neto de PPA), con el campo del motor en vez de parches.
const PART = { 2021: 163.3, 2022: 146.8, 2023: 147.3, 2024: 146.5, 2025: 131.6 };
for (const c of A.financieros.cuenta) c.participadas_en_ebitda = PART[c.periodo] ?? null;

A.balance.liquidez = `Liquidez de 2.755 M a 30-sep-26: caja 537 M, crédito sindicado sostenible de 1.550 M hasta enero de 2030 y líneas operativas de 668 M con vida media de ≈ 2,1 años [${n9}]. A dic-25, líneas por 1.966,6 M, de las que 1.788,1 M sin disponer [1].`;
A.balance.coste_deuda_pct = 2.1;
A.balance.vida_media_anios = 3.9;
A.balance.comentario += ` A 30-sep-26 la deuda neta sube a 2.979 M (+504 M desde dic-25) por la compra del 31,5 % de Teréga (573 M) y el dividendo de julio (156,5 M); más del 80 % a tipo fijo, coste del 2,1 % y vida media de 3,9 años [${n9}].`;

const kpi = (nombre) => A.negocio.kpis.find((k) => k.kpi.startsWith(nombre));
Object.assign(kpi('Tasa de retribución financiera'), { valor_actual: '6,46 % (2027-2032, definitiva)', comentario: `Circulares 4 y 5/2026 publicadas en el BOE el 18-sep-26; en vigor desde el 1-oct-26. La CNMC calcula un ahorro del 10 % para el sistema frente al marco 2021-2026 [${n9}, ${np}].` });
Object.assign(kpi('Efecto del marco'), { valor_actual: '−45,1 M (9M26)', comentario: `Caída por amortización de la base de activos y fin de la RCS; compensada en ingresos por obras de sellado de Castor (108,7 M en 9M26, gastos de 103,2 M), ya terminadas [${n9}].` });
Object.assign(kpi('Demanda de gas'), { valor_actual: '242,0 TWh (9M26, +2,6 %)', comentario: `Generación eléctrica +19 %; convencional −4,1 % [${n9}]. La retribución no depende de la demanda.` });
Object.assign(kpi('Deuda neta'), { valor_anterior: '2.475 M (dic-25)', valor_actual: '2.979 M (sep-26)', variacion: '+20 %', comentario: `Incluye la compra del 31,5 % de Teréga (573 M, 30-jul-26); falta pagar el 20 % de Saggas (31 M) [${n9}].` });
Object.assign(kpi('FFO / deuda neta'), { valor_anterior: '27,4 % (sep-25)', valor_actual: '20,5 % (sep-26)', variacion: '−6,9 pp', comentario: `Objetivo > 15 %, compatible con BBB+ [${n9}].` });
A._iteracion = '2026-11-08';
escribir('A.json', A);

// ───────────────────────── D: mercado ─────────────────────────
const idD = D.fuentes.length + 1; // 29
D.fuentes.push(
  { id: idD, titulo: 'Históricos diarios ENG.MC, XESP.DE (Xtrackers MSCI Spain 1C) y EXH9.DE (iShares STOXX Europe 600 Utilities), hasta el 6-nov-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-11-06', url: 'https://finance.yahoo.com/quote/ENG.MC/history/' },
  { id: idD + 1, titulo: 'Enagás, S.A.: Financial Data, Forecasts, Estimates (estimaciones actualizadas el 8-oct-2026)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-08', url: 'https://www.marketscreener.com/quote/stock/ENAG-S-S-A-409361/finances/' },
  { id: idD + 2, titulo: 'Enagas (ENAG) Consensus Estimates y Analyst Ratings (20 analistas; Citi inicia en mantener con 16,50 EUR el 8-oct-2026)', editor: 'Investing.com', tipo: 'Datos de mercado', fecha: '2026-11-08', url: 'https://www.investing.com/equities/enagas-consensus-estimates' },
  { id: idD + 3, titulo: 'Rendimiento de los bonos federales a 10 años (serie BBSSY.D.REN.EUR.A630.000000WT1010.A): 3,22 % el 6-nov-2026', editor: 'Deutsche Bundesbank', tipo: 'Datos de mercado', fecha: '2026-11-06', url: 'https://api.statistiken.bundesbank.de/rest/download/BBSSY/D.REN.EUR.A630.000000WT1010.A?format=csv&lang=en' },
  { id: idD + 4, titulo: 'Tipos de interés a largo plazo (criterio de convergencia), España y Alemania: 3,927 % y 3,473 % en septiembre de 2026 (series IRS.M.ES/DE.L.L40.CI.0000.EUR.N.Z)', editor: 'Banco Central Europeo', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://data-api.ecb.europa.eu/service/data/IRS/M.ES.L.L40.CI.0000.EUR.N.Z' },
  { id: idD + 5, titulo: 'Implied ERP by month (ERPbymonth.xlsx), fila de noviembre de 2026: 4,41 %', editor: 'A. Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-11', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: idD + 6, titulo: 'Cierres del 7-oct y del 6-nov-2026 de SRG.MI, IG.MI, TRN.MI, RED.MC, ELI.BR, NG.L y NTGY.MC', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-11-06', url: 'https://finance.yahoo.com/' },
);
const [fY, fMS, fInv, fBund, fBCE, fDam, fComp] = [0, 1, 2, 3, 4, 5, 6].map((i) => idD + i);

Object.assign(D.identificacion, {
  precio: B.identificacion.precio, fecha_precio: B.identificacion.fecha_precio,
  max_52s: B.identificacion.max_52s, min_52s: B.identificacion.min_52s,
  capitalizacion_publicada: null,
  volumen_medio_diario: `≈ ${String(B.volumen_3m.importe_dia_millones).replace('.', ',')} M EUR/día (3 meses; ${B.volumen_3m.acciones_dia.toLocaleString('es-ES')} acciones/día)`,
  proximos_resultados: '2027-02-16',
});

D.consenso.estimaciones = [
  { periodo: '2026e', ingresos: 842.4, ebitda: 625.6, ebit: 330.4, bpa: 0.94, dpa: 1.0, fuente: `MarketScreener, 8-oct-2026 [${fMS}]` },
  { periodo: '2027e', ingresos: 907.3, ebitda: 723.5, ebit: 421.6, bpa: 1.15, dpa: 1.0, fuente: `MarketScreener, 8-oct-2026 [${fMS}]` },
  { periodo: '2028e', ingresos: 894.9, ebitda: 713.5, ebit: 415.7, bpa: 1.12, dpa: 1.0, fuente: `MarketScreener, 8-oct-2026 [${fMS}]` },
];
D.consenso.recomendaciones = { n_analistas: 20, comprar: 7, mantener: 8, vender: 5, po_medio: 17.17, po_min: 13.0, po_max: 19.8 };
D.consenso.guidance = `Objetivos 2026 reafirmados con los resultados de 9M26 (20-oct-2026), sin el efecto de la rotación de activos: EBITDA de unos 620 M€ y beneficio recurrente de unos 235 M€; en 9M26, 491,5 M€ y 195,8 M€ [10]. Dividendo de 1 € por acción [10]. La retribución regulada 2027-2032 sube la TRF de transporte y regasificación del 5,44 % al 6,46 % (circulares en el BOE el 18-sep-2026, en vigor desde el 1-oct) [7, 8]. La agenda del inversor no publica aún la fecha de los resultados de 2026 (16-17 de febrero en los últimos años) [5].`;
D.consenso.revisiones = `Investing (8-nov-2026): 20 analistas, consenso «Neutral» (7 comprar, 8 mantener, 5 vender), precio objetivo medio de 17,17 € (13,00-19,80) [${fInv}]; un mes antes eran 19 analistas (8/6/5) y 17,05 €. El único cambio con fecha desde el informe anterior es la entrada de Citi en mantener con 16,50 € (8-oct). Las estimaciones a tres años de MarketScreener son del 8-oct (antes de los 9M26) y apenas se movieron frente a las del 7-oct (EBITDA 2027e 723,5 M frente a 724,2 M) [${fMS}]; como los 9M26 fueron «en línea» con la guía, no esperamos revisiones materiales. Yahoo no devolvió la tendencia de revisiones (error de autenticación) y no se ha obtenido la variación a 3 y 12 meses.`;
D.consenso.confianza = 'Media';

const bb = B.bolsa;
Object.assign(D.bolsa, {
  tipo_rentabilidad: bb.tipo_rentabilidad, rentabilidades: bb.rentabilidades, anual: bb.anual,
  beta: bb.beta, volatilidad_pct: bb.volatilidad_pct, max_drawdown_pct: bb.max_drawdown_pct,
  comentario: `Hechos: rentabilidad total con cierres ajustados de Yahoo hasta el 6-nov-2026, último cierre antes de la fecha de corte (domingo 8-nov) [${fY}]. Índice: ETF de acumulación Xtrackers MSCI Spain 1C; sector: iShares STOXX Europe 600 Utilities [${fY}]. Beta de 5 años mensual frente al MSCI Spain: ${String(bb.beta).replace('.', ',')}; caída máxima de 5 años: −31,4 % (25-may-2022 a 13-oct-2022) [${fY}]. En 2026 la acción gana un 40,1 % con dividendos frente al 15,4 % del índice y el 20,5 % de las utilities europeas; en el último mes, +9,6 % (de 16,24 € el 7-oct a 17,80 € el 6-nov), con +2,4 % el día de los resultados de 9M26 (20-oct) y el Bund bajando de 3,49 % a 3,22 % [${fY}, ${fBund}]. En 2024 la acción perdió un 14 % con dividendos, el año de la minusvalía de Tallgrass y del recorte del dividendo de 1,74 € a 1 € [2, 3].`,
});

// Comparables: estimaciones de MarketScreener del 7-oct llevadas al cierre del 6-nov con la variación de precio
// (lecciones: «si otra carpeta tiene comparables de hace días, reutilízalos llevándolos al nuevo cierre»).
// EV nuevo = EV viejo + capitalización × variación; EV viejo = capitalización ÷ (1 − DN/EBITDA ÷ EV/EBITDA LTM).
const VAR = { 'SRG.MI': 11.8, 'IG.MI': 12.98, 'TRN.MI': 8.1, 'RED.MC': 6.97, 'ELI.BR': 15.22, 'NG.L': 8.65, 'NTGY.MC': 0.07 };
const r1 = (x) => Math.round(x * 10) / 10; const r2 = (x) => Math.round(x * 100) / 100;
D.comparables.empresas = D.comparables.empresas.map((e) => {
  const v = VAR[e.ticker] / 100;
  if (v == null || Number.isNaN(v)) throw new Error('Sin variación: ' + e.ticker);
  const evViejo = e.capitalizacion / (1 - (e.dn_ebitda || 0) / e.ev_ebitda_ltm);
  const f = (evViejo + e.capitalizacion * v) / evViejo;
  return { ...e, capitalizacion: Math.round(e.capitalizacion * (1 + v)), ev_ventas: r2(e.ev_ventas * f), ev_ebitda_ltm: r1(e.ev_ebitda_ltm * f), ev_ebitda_ntm: r1(e.ev_ebitda_ntm * f), per_ntm: r1(e.per_ntm * (1 + v)), dn_ebitda: e.dn_ebitda, fcf_yield_pct: e.fcf_yield_pct == null ? null : r1(e.fcf_yield_pct / (1 + v)) };
});
D.comparables.confianza = 'Media';

D.valoracion.comentario = `Hechos del puente (balance a 30-sep-2026 de la nota de resultados de 9M26 de Enagás): deuda neta publicada de 2.979 M€ con Teréga (2.475 a dic-2025); caja 537,3 M€; arrendamientos NIIF 16 ≈ 360 M€ (estimación: el 10 % de la deuda bruta que la nota atribuye a arrendamientos; 366,7 M€ a 30-jun) y deuda financiera bruta sin arrendamientos ≈ 3.156 M€ por diferencia. Minoritarios 15,8 M€. Asociadas por el método de la participación 1.555,9 M€ a valor contable (1.102,6 a 30-jun, antes de Teréga). Pensiones: aportación definida. Tasa libre: Bund a 10 años del 3,22 % el 6-nov-2026 [${fBund}]; diferencial de España frente a Alemania de 0,45 pp en septiembre de 2026 (BCE) [${fBCE}]. Prima implícita de Damodaran de noviembre: 4,41 % [${fDam}]. TRF 2027-2032: 6,46 % [7].`;
escribir('D.json', D);
console.log('A y D actualizados. Fuentes nuevas: A', idA, idA + 1, '· D', idD, '…', idD + 6);
