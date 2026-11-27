// Pasa las notas A-D del informe del 7-oct (keyence-2026-10-07/notas) a esta iteración (corte 27-nov-2026):
// (1) desdoblamiento 1 por 5 con efecto el 21-nov-2026: BPA y DPA ÷ 5, acciones × 5 en toda la historia;
// (2) datos nuevos comprobados a hoy: 2T26 (tanshin y presentación del 29-oct-2026, informe semestral del 2-nov),
//     LTM a sep-26, puente a 20-sep-2026, precio, consenso, comparables, bolsa, accionistas.
// Uso: node informes/keyence-2026-11-27/notas/actualizar-notas.mjs   (escribe A.json, C.json y D.json en esta carpeta)
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const AQUI = dirname(fileURLToPath(import.meta.url));
const VIEJO = join(AQUI, '../../keyence-2026-10-07/notas');
const F = 5; // desdoblamiento
const leer = (p) => JSON.parse(readFileSync(p, 'utf8'));
const r2 = (x) => Math.round(x * 100) / 100;
const A = leer(join(VIEJO, 'A.json'));
const C = leer(join(VIEJO, 'C.json'));
const D = leer(join(VIEJO, 'D.json'));
const bolsa = leer(join(AQUI, 'bolsa.json'));
const comps = leer('/tmp/claude-0/tanda-1127/keyence/comps.json');

// Textos con cifras por acción de antes del desdoblamiento
const fix = (s) => typeof s !== 'string' ? s : s
  .replace(/de 350 a 550 JPY/g, 'de 70 a 110 JPY (350 a 550 antes del desdoblamiento 1 por 5)')
  .replace(/de 50 JPY en el FY2016 \(ajustado por desdoblamientos\) a 550 JPY en el FY2025/g, 'de 10 JPY en el FY2016 a 110 JPY en el FY2025 (ajustado por los desdoblamientos de 2017 y 2026)')
  .replace(/para el FY2026 prevé 550 JPY \(275 a cuenta y 275 complementario\)/g, 'para el FY2026 preveía en abril 110 JPY en la base actual; el 29-oct lo subió a 130 JPY (65 a cuenta y 65 complementario, 325 y 325 antes del desdoblamiento)')
  .replace(/prevé 550 para el FY2026/g, 'preveía 110 (base nueva) para el FY2026, que subió a 130 el 29-oct-2026')
  .replace(/\(550 JPY por acción para el ejercicio que cierra en marzo de 2027\)/g, '(130 JPY por acción en la base posterior al desdoblamiento para el ejercicio que cierra en marzo de 2027, tras la subida del 29-oct-2026)')
  .replace(/solo previsión de dividendo \(550 JPY\)/g, 'solo previsión de dividendo (110 JPY en la base actual)')
  .replace(/La subida del dividendo a 550 JPY/g, 'La subida del dividendo a 110 JPY (550 antes del desdoblamiento)');
const recorrer = (o) => {
  if (Array.isArray(o)) return o.map(recorrer);
  if (o && typeof o === 'object') return Object.fromEntries(Object.entries(o).map(([k, v]) => [k, recorrer(v)]));
  return fix(o);
};

// ---------- A: cuentas ----------
const a = recorrer(A);
for (const c of a.financieros.cuenta) {
  c.bpa = r2(c.bpa / F); c.dpa = r2(c.dpa / F); c.dpa_extraordinario = r2((c.dpa_extraordinario || 0) / F);
  c.acciones_diluidas = Math.round(c.acciones_diluidas * F * 1000) / 1000;
}
const nA = a.fuentes.length;
const fA = (t, u, f, tipo = 'Primaria') => { a.fuentes.push({ id: a.fuentes.length + 1, titulo: t, editor: 'Keyence Corporation', tipo, fecha: f, url: u }); return a.fuentes.length; };
const T2 = fA('Summary of Consolidated Financial Results for the Six Months Ended September 20, 2026 (Kessan Tanshin del 2T FY2026)', 'https://www.keyence.co.jp/pdf/ConsolidatedFinancialResultsForThe2ndQuarterEndedSeptember_20_2026(JP_GAAP).pdf', '2026-10-29');
const P2 = fA('Second Quarter of FY2026 Financial Results Materials', 'https://www.keyence.co.jp/pdf/FinancialResults_202610_en.pdf', '2026-10-29');
const HR = fA('半期報告書 第58期中間期 (informe semestral, 21-mar a 20-sep-2026; estado de flujos y accionistas)', 'https://www.keyence.co.jp/pdf/HalfReport_202610_ja.pdf', '2026-11-02');
const SP = fA('株式分割及び定款の一部変更に関するお知らせ (desdoblamiento 1 por 5: base 20-nov-2026, efecto 21-nov-2026)', 'https://www.keyence.co.jp/pdf/PressRelease_20261029_02.pdf', '2026-10-29');
const DV = fA('剰余金の配当（中間配当）及び期末配当予想の修正に関するお知らせ (dividendo a cuenta de 325 JPY y previsión final de 65 JPY en la base nueva)', 'https://www.keyence.co.jp/pdf/PressRelease_20261029_01.pdf', '2026-10-29');
const TP = fA('TraceParts S.A.S.社の株式の取得（子会社化）に関するお知らせ (compra del 100 % de TraceParts, cerrada el 22-oct-2026)', 'https://www.keyence.co.jp/pdf/PressRelease_20261023.pdf', '2026-10-23');

// LTM a 20-sep-2026 = FY2025 − 1S FY2025 + 1S FY2026 (tanshin del 2T y estado de flujos del informe semestral)
const ACC = 1212.625; // (243.207.684 − 682.755) × 5, en millones
const ltmIng = 1169289 - 545300 + 735399;
const ltmEbit = 595759 - 272179 + 408262;
const ltmDa = 17227 - 8470 + 9148;
const ltmBn = 445185 - 199959 + 298675;
const ltmOcf = 430680 - 196882 + 273988;
const ltmCapex = 28371 - 11599 + 9977;
a.financieros.ltm = {
  periodo: 'LTM sep-26', fecha_fin: '2026-09-20', ingresos: ltmIng, ebitda: ltmEbit + ltmDa, ebit: ltmEbit, beneficio_neto: ltmBn,
  bpa: r2(ltmBn / ACC), dpa: 120, dpa_extraordinario: 0, fcf: ltmOcf - ltmCapex, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null,
  acciones_diluidas: ACC,
};
// Trimestres: BPA ÷ 5 y el 2T26 nuevo
for (const t of a.trimestres.items) t.bpa = r2(t.bpa / F);
a.trimestres.items = a.trimestres.items.slice(1);
const ing2 = 735399 - 346621, ebit2 = 408262 - 187076, da2 = 4500;
a.trimestres.items.push({ periodo: '2T26', ingresos: ing2, crecimiento_pct: 36.8, crecimiento_organico_pct: 27.7, ebitda: ebit2 + da2, margen_ebitda_pct: r2((ebit2 + da2) / ing2 * 100), bpa: r2((1231.53 - 573.69) / F), vs_consenso: null });
a.trimestres.ultima_presentacion = `Keyence sigue sin publicar transcripciones ni preguntas y respuestas: lo que sigue sale de las diapositivas y del tanshin [${P2}, ${T2}, A15]. El 2T del FY2026 (21-jun a 20-sep-2026, publicado el 29-oct) aceleró sobre el 1T: ventas de 388.778 M JPY (+36,8 %), margen bruto del 86,2 % (+3,4 puntos) y margen operativo del 56,9 % (+6,6 puntos), el más alto de la serie trimestral publicada [${P2}]. Sin divisa, el extranjero creció un 30,5 % (24,0 % en el 1T) y Japón un 22,8 % (19,9 %); Asia, un 45,2 % [${P2}]. Por industria, el semestre lo tiran los semiconductores y pantallas (+45 % en Japón y +65 % fuera) y la electrónica (+45 % y +35 %); el automóvil solo crece un 10 % [${P2}]. El yen pesó a favor: 160 JPY por dólar de media en el semestre frente a 146, con un efecto de unos 51.900 M JPY en ventas y 38.400 M en resultado operativo; la sensibilidad al dólar sube a unos 1.300 M JPY de resultado por yen (1.100 en julio) [${P2}, A15]. Dos novedades de capital: el desdoblamiento 1 por 5 (base del 20-nov, efecto el 21-nov) «para mejorar la liquidez y ampliar la base de inversores», y la subida del dividendo anual a 650 JPY en la base vieja (130 JPY en la nueva; 550 el año anterior) [${SP}, ${DV}]. Además presentó como «M&A estratégica» la compra de TraceParts, plataforma francesa de modelos CAD de componentes con más de 6,5 millones de ingenieros, de efecto «leve» en el ejercicio y sin importe publicado [${TP}, ${P2}]. Lo que no se aborda: cuánto del crecimiento de semiconductores es acopio de ciclo, la guía (sigue sin darla) y el precio pagado por TraceParts.`;
a.trimestres.items.forEach((t) => { if (t.periodo === '1T26') t.vs_consenso = 'Superior'; });
// Flujos y calidad: notas del semestre
a.flujos.comentario = `${a.flujos.comentario} En el primer semestre del FY2026 el flujo operativo fue de 273.988 M JPY (+39,2 %) con 50.935 M de más clientes y 31.661 M de más existencias por el crecimiento, y el capex de 9.977 M JPY [${HR}]: el FCF de los últimos doce meses a sep-26 es de 481.037 M JPY.`;
a.balance.liquidez = a.balance.liquidez.replace(/A 20-jun-2026: .*$/, `A 20-sep-2026: efectivo y depósitos 698.507, valores a corto 803.618, valores de inversión 1.691.841 (incluye asociadas) y depósitos a largo 20.405; pasivo total de 250.179 M JPY, sin deuda [${T2}].`);
const k2 = { 'En el 1T26, +24,0 %': 'En el 1T26, +24,0 %; en el 2T26, +30,5 %', '70,4 % en el 1T26': '70,4 % en el 1T26 y 68,1 % en el 2T26', '+33,9 % en el 1T26': '+33,9 % en el 1T26 y +45,2 % en el 2T26', '+12,8 % en el 1T26': '+12,8 % en el 1T26 y +12,1 % en el 2T26', '85,0 % en el 1T26, con ayuda del yen': '85,0 % en el 1T26 y 86,2 % en el 2T26, con ayuda del yen' };
for (const kp of a.negocio.kpis) for (const [x, y] of Object.entries(k2)) if (kp.comentario?.includes(x)) kp.comentario = kp.comentario.replace(x, y).replace(/\[15, 16\]|\[1, 15\]|\[1, 2, 6, 15\]/, (m) => m.replace(']', `, ${P2}]`));
// Hueco de LTM FCF resuelto
a.huecos = (a.huecos || []).filter((h) => !(h.seccion === 'financieros' && /ltm\.fcf/.test(h.campo)));
a.huecos.push({ seccion: 'trimestres', campo: 'vs_consenso 2T26', tipo: 'Complemento', intentos: '1) Keyence no publica previsiones; 2) Yahoo Finance da el consenso por trimestre solo hacia delante (dic-26 y mar-27), no el previo del 2T; 3) Simply Wall St y Quartr: no publican la comparación del 2T26 con el consenso', decision: 'Omitido' });
writeFileSync(join(AQUI, 'A.json'), JSON.stringify(a, null, 2));

// ---------- C: gobierno (accionistas a 20-sep-2026 del informe semestral) ----------
const c = recorrer(C);
const nC = c.fuentes.length + 1;
c.fuentes.push({ id: nC, titulo: '半期報告書 第58期中間期, 大株主の状況 (accionistas a 20-sep-2026)', editor: 'Keyence Corporation', tipo: 'Primaria', fecha: '2026-11-02', url: 'https://www.keyence.co.jp/pdf/HalfReport_202610_ja.pdf' });
const pc = { 'T.T Corporation': [15.07, 'Sin cambios: 36,57 M de acciones (base anterior al desdoblamiento) en 2022, 2026 y a 20-sep-2026'], 'Takemitsu Takizaki': [3.15, '7,65 M de acciones antes del desdoblamiento (38,27 M después), sin cambios a 20-sep-2026'], 'Fundación Keyence': [4.57, '11,1 M de acciones antes del desdoblamiento, sin cambios'], 'Master Trust': [12.79, '12,80 % a 20-mar-2026'], 'Custody Bank': [7.16, '7,33 % a 20-mar-2026'], '505001': [3.11, '2,60 % a 20-mar-2026'], '140042': [1.61, '1,88 % a 20-mar-2026'], 'Non Treaty': [1.64, '1,65 % a 20-mar-2026'], 'Norway': [1.61, '1,49 % a 20-mar-2026'], '505103': [1.42, '1,38 % a 20-mar-2026'] };
for (const s of c.gobierno.accionistas) {
  const k = Object.keys(pc).find((x) => s.nombre.includes(x));
  if (k) { s.pct = pc[k][0]; s.variacion = `${pc[k][1]} [${nC}]`; }
  if (/Autocartera/.test(s.nombre)) { s.variacion = `682.755 acciones a 20-sep-2026 antes del desdoblamiento (3.413.775 después) [${nC}]`; }
}
writeFileSync(join(AQUI, 'C.json'), JSON.stringify(c, null, 2));

// ---------- D: mercado ----------
const d = recorrer(D);
const fD = (t, e, tipo, f, u) => { d.fuentes.push({ id: d.fuentes.length + 1, titulo: t, editor: e, tipo, fecha: f, url: u }); return d.fuentes.length; };
const YH = fD('Históricos diarios de 6861.T, ^N225 y 1625.T (herramientas/bolsa.mjs), con el desdoblamiento 5:1 del 19-nov-2026 ajustado hacia atrás', 'Yahoo Finance', 'Datos de mercado', '2026-11-27', 'https://finance.yahoo.com/quote/6861.T/history');
const YQ = fD('Keyence (6861.T): earningsTrend, financialData y recommendationTrend (consenso tras el 2T, base posterior al desdoblamiento)', 'Yahoo Finance', 'Datos de mercado', '2026-11-27', 'https://finance.yahoo.com/quote/6861.T/analysis');
const MS = fD('Keyence Corporation: Financial Data, Forecasts, Estimates (página con datos de mercado del 23-oct-2026, anterior al 2T y al desdoblamiento)', 'MarketScreener', 'Datos de mercado', '2026-10-23', 'https://www.marketscreener.com/quote/stock/KEYENCE-CORPORATION-6492212/finances/');
const MOF = fD('Interest Rate (November 2026), JGB constant maturity yields (jgbcme.csv), fila 2026/11/26', 'Ministerio de Finanzas de Japón', 'Primaria', '2026-11-26', 'https://www.mof.go.jp/english/policy/jgbs/reference/interest_rate/jgbcme.csv');
const ECB = fD('Euro foreign exchange reference rates, 26-nov-2026 (USD 1,0975; JPY 174,79)', 'Banco Central Europeo', 'Primaria', '2026-11-26', 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml');
const YC = fD('Cognex, Omron, SMC, Fanuc, Mettler-Toledo y Rockwell: quoteSummary (precio, valor empresa, EBITDA LTM, estimaciones de ventas y BPA de los dos próximos ejercicios)', 'Yahoo Finance', 'Datos de mercado', '2026-11-27', 'https://finance.yahoo.com/quote/CGNX/analysis');
const SPLIT = fD('Notice Regarding Stock Split (5 por 1; base 20-nov-2026, efecto 21-nov-2026; 1.216.038.420 acciones emitidas tras el desdoblamiento)', 'Keyence Corporation', 'Primaria', '2026-10-29', 'https://www.keyence.co.jp/pdf/PressRelease_20261029_02.pdf');
const T2D = fD('Summary of Consolidated Financial Results for the Six Months Ended September 20, 2026 (balance a 20-sep-2026)', 'Keyence Corporation', 'Primaria', '2026-10-29', 'https://www.keyence.co.jp/pdf/ConsolidatedFinancialResultsForThe2ndQuarterEndedSeptember_20_2026(JP_GAAP).pdf');

const idb = bolsa.identificacion;
Object.assign(d.identificacion, {
  precio: idb.precio, fecha_precio: idb.fecha_precio, acciones: ACC, capitalizacion_publicada: Math.round(idb.precio * ACC),
  free_float_pct: 77.2, max_52s: idb.max_52s, min_52s: idb.min_52s,
  volumen_medio_diario: `≈ ${(bolsa.volumen_3m.importe_dia_millones / 1000).toFixed(1).replace('.', ',')} mil M JPY/día (${(bolsa.volumen_3m.acciones_dia / 1e6).toFixed(2).replace('.', ',')} M de acciones en la base nueva; 3 meses, 60 sesiones)`,
  proximos_resultados: '2027-01-28',
  nota: `Precio: cierre del 27-nov-2026 en Yahoo (14.845 JPY), ya en acciones posteriores al desdoblamiento 1 por 5 [${YH}]. Yahoo ajusta toda la historia: el cierre del 6-oct-2026 sale a 16.298 JPY (81.490 / 5) y su evento de desdoblamiento 5:1 está fechado el 19-nov-2026, primera sesión ex-derecho (base del 20-nov, efecto el 21-nov) [${YH}, ${SPLIT}]. Acciones: 243.207.684 emitidas menos 682.755 en autocartera a 20-sep-2026, por cinco = 1.212.624.645 [${T2D}, ${SPLIT}]; Yahoo da 1.212.624.920 [${YQ}]. Sin instrumentos dilutivos. Capitalización publicada = precio × acciones (Yahoo da la misma cifra). Flotante: 936,0 M de acciones según Yahoo (77,2 %) [${YQ}]. Próximos resultados (3T): 28-ene-2027, fecha estimada por Yahoo; Keyence no publica el calendario [${YQ}].`,
});
d.consenso = {
  guidance: `Keyence sigue sin publicar previsiones de ventas ni de beneficio: el tanshin del 2T (29-oct-2026) solo da el dividendo [${T2D}]. Lo subió: 325 JPY a cuenta y 325 complementarios en la base anterior al desdoblamiento, 650 JPY anuales frente a 550, que en la base nueva son 130 JPY (el complementario se pagará como 65 JPY por acción nueva) [${T2D}]. El semestre trajo ventas de 735.399 M JPY (+34,9 %) y resultado operativo de 408.262 M (+50,0 %, margen del 55,5 %) [${T2D}]. Sin plan a medio plazo numérico.`,
  estimaciones: [
    { periodo: 'FY2026e', ingresos: 1507586, ebitda: 795256, ebit: 775325, bpa: 493.01, dpa: 130, fuente: `Yahoo Finance tras el 2T y el desdoblamiento: ventas (13 analistas) y BPA (12), 27-nov-2026 [${YQ}]; EBITDA y EBIT de MarketScreener del 23-oct, anteriores al 2T [${MS}]; DPA = previsión de la empresa [${T2D}]` },
    { periodo: 'FY2027e', ingresos: 1671059, ebitda: 889125, ebit: 868674, bpa: 538.04, dpa: 147.72, fuente: `Yahoo Finance: ventas (16 analistas) y BPA (15), 27-nov-2026 [${YQ}]; EBITDA, EBIT y DPA (738,6 / 5) de MarketScreener del 23-oct [${MS}]` },
    { periodo: 'FY2028e', ingresos: 1795013, ebitda: 981262, ebit: 960045, bpa: 579.6, dpa: 167.5, fuente: `MarketScreener del 23-oct-2026, anterior al 2T; BPA y DPA divididos por cinco (2.898 y 837,5 JPY) [${MS}]` },
  ],
  recomendaciones: { n_analistas: 16, comprar: 13, mantener: 3, vender: 0, po_medio: 19656.25, po_min: 16240, po_max: 24000 },
  revisiones: `Mapeo de periodos: Yahoo y MarketScreener etiquetan por año de cierre («2027» = ejercicio abr-2026 a mar-2027 = nuestro FY2026e) [${YQ}, ${MS}]. Tras el 2T, el BPA medio de FY2026e pasó de 467,35 JPY hace 30 días a 493,01 (+5,5 %) y el de FY2027e de 522,65 a 538,04 (+2,9 %), en la base nueva [${YQ}]; el consenso de 90 días atrás era de 465,84 y 521,19, así que la revisión entera viene del 2T. Las ventas esperadas de FY2026e (1.507.586 M JPY, +28,9 %) dejan para el segundo semestre 772.187 M, un 23,8 % más que un año antes. MarketScreener seguía el 27-nov con datos del 23-oct (BPA de 2.337 JPY en la base vieja = 467,4 en la nueva) y no se usa para el BPA de los dos primeros años [${MS}]. Recomendaciones (Yahoo, 16 analistas): 3 compra fuerte, 10 compra y 3 mantener; un mes antes eran 4, 10 y 2 [${YQ}]. Precio objetivo medio de 19.656,25 JPY (16.240-24.000), un 32,4 % sobre el cierre [${YQ}]; el 7-oct era de 97.867 JPY en la base vieja (19.573 en la nueva) [5]. Ojo: el «forwardEps» de 1.867,39 que Yahoo enseña en sus estadísticas no está ajustado por el desdoblamiento; no se usa.`,
  base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null, confianza: 'Media',
};
d.bolsa = { ...bolsa.bolsa, posicion_corta_pct: null, confianza: 'Alta',
  comentario: `En precio, Keyence sube un 31,0 % en 2026 frente al 16,6 % del Nikkei 225 y al 12,3 % del ETF sectorial de aparatos eléctricos y de precisión (1625.T) [${YH}]. A 3 y 5 años sigue muy por detrás (6,2 % y 0,9 % anual frente al 20,6 % y 15,3 % del Nikkei): el salto de 2026 recupera los años de 2022-2025 en que el crecimiento se frenó [${YH}]. El último mes y medio ha sido de mercado: el Nikkei cayó de 69.031 puntos (semana del 4-oct) a 58.711 (−15 %) y SMC y Fanuc bajaron un 20 % y un 13 %, mientras Keyence perdía un 9 % desde el 6-oct [${YH}, ${YC}]. Cotiza a 14.845 JPY, un 15,3 % por debajo del máximo de 52 semanas (17.584, 6-ago-2026) y un 42,0 % sobre el mínimo (10.302, 2-dic-2025) [${YH}]. Beta de 1,07 (5 años, mensual) frente al Nikkei y volatilidad del 41,1 % a un año [${YH}]. Todas las cifras de precio están en la base posterior al desdoblamiento.` };
d.bolsa.nota_datos = `Rentabilidades de precio (sin dividendos) de 6861.T, del Nikkei 225 (^N225, solo precio) y del ETF 1625.T, para no mezclar bases [${YH}]. Cierres de ejercicio al día 19-20 de marzo (--cierre-dia 20), ajustados por los desdoblamientos de 2017 y 2026 [${YH}].`;
d.multiplos_historicos.serie = bolsa.cierres_ejercicio.map((x) => ({ anio: x.anio, precio_cierre: x.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: false }));
d.multiplos_historicos.comentario = null; // lo escribe propio
d.comparables.empresas = comps;
d.comparables.criterio = `Seis cotizadas de automatización industrial, medida y visión artificial de las que hay estimaciones gratis y al día: tres japonesas (Omron, SMC, Fanuc) y tres estadounidenses (Cognex, rival directo en visión; Mettler-Toledo, instrumentación de precisión con márgenes altos; Rockwell, automatización). Hexagon sale de la lista: tras la escisión de Octave, Yahoo mezcla cifras en euros con la cotización en coronas y no hay una fuente gratuita limpia. Sick y Basler no cotizan o no tienen consenso. Las cifras son de Yahoo del 27-nov-2026: PER de los próximos doce meses con el BPA medio de los dos próximos ejercicios ponderado por los meses que caen en los doce siguientes; EV/EBITDA NTM con el EBITDA de los últimos doce meses escalado por el crecimiento de ventas esperado (margen constante, estimación propia, porque Yahoo no da EBITDA estimado); ROIC del último ejercicio de Stock Analysis del 7-oct [${YC}, 20-26]. Dólar a 159,26 JPY (BCE, 26-nov) [${ECB}].`;
d.valoracion.puente = {
  fecha: '2026-09-20', deuda_financiera: 0, arrendamientos: 0, caja: 698507 + 803618 + (1691841 - 50015) + 20405, minoritarios: 0, pensiones: 0, asociadas: 99243, otros_ajustes: 0,
  comentario: `Balance consolidado a 20-sep-2026 del tanshin del 2T [${T2D}]. Sin préstamos ni bonos: el pasivo total (250.179 M JPY) son proveedores, impuestos, bonus y otros [${T2D}]. Caja e inversiones líquidas = 3.164.356 M JPY: efectivo y depósitos 698.507 + valores a corto 803.618 + valores de inversión a largo 1.691.841 menos las asociadas en libros (50.015, cifra de 20-mar-2026, estimación propia porque el semestral no las separa) + depósitos a plazo a largo 20.405 [${T2D}, 2]. La cartera a largo es renta fija de calidad disponible para la venta (deuda pública, bonos corporativos y certificados de depósito) [2]. Asociadas a su valor razonable de nivel 1 de 20-mar-2026, 99.243 M JPY [2]. TraceParts se compró el 22-oct, después del balance, por un importe no publicado y de efecto «leve»: no se ajusta. Sin minoritarios ni déficit de pensiones.`,
};
if (d.dcf?.wacc) Object.assign(d.dcf.wacc, { tasa_libre_pct: 2.704, beta: 1.07, nota: `Tasa libre: JGB a 10 años del 26-nov-2026, 2,704 % (Ministerio de Finanzas, curva a vencimiento constante; la fila del 27-nov aún no estaba) [${MOF}]: ha bajado desde el 3,103 % del 6-oct. Beta 1,07 (5 años, mensual, frente al Nikkei 225) y 0,86 a 2 años semanal [${YH}]; Blume 1,05. Sin deuda financiera.` });
d.huecos = (d.huecos || []).filter((h) => !/revisiones/.test(h.campo));
writeFileSync(join(AQUI, 'D.json'), JSON.stringify(d, null, 2));
console.log({ fuentesA: [nA, a.fuentes.length], fuentesD: d.fuentes.length, ltm: a.financieros.ltm, t2: a.trimestres.items.at(-1), caja: d.valoracion.puente.caja });
