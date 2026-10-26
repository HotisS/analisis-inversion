// Nota D (mercado y valoración) de la iteración del 26-oct-2026. Todo a la fecha de corte nueva:
// precio y bolsa (bolsa.mjs, 26-oct), consenso tras los resultados del 23-oct (MarketScreener sin
// actualizar, contrastado con Investing, Kabuyoho/IFIS y las notas de Kabutan del 26-oct), comparables
// re-preciados (D_comparables-fanuc.mjs), puente del balance a 30-sep-2026 y datos de mercado del WACC.
// Transacciones: las del 7-oct, con el estado de ABB Robotics comprobado el 26-oct.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { empresas, USDJPY, EURJPY } from './D_comparables-fanuc.mjs';
const aqui = dirname(fileURLToPath(import.meta.url));
const ant = JSON.parse(readFileSync(join(aqui, '../../fanuc-2026-10-07/notas/D.json'), 'utf8'));
const b = JSON.parse(readFileSync(join(aqui, 'bolsa.json'), 'utf8'));

const F = []; const add = (titulo, editor, tipo, fecha, url) => { F.push({ id: F.length + 1, titulo, editor, tipo, fecha, url }); return F.length; };
const tan = add('Consolidated Interim Financial Results for the six months ended September 30, 2026 (Kessan Tanshin 1S FY2026)', 'FANUC Corporation', 'Primaria', '2026-10-23', 'https://www.fanuc.co.jp/en/ir/announce/pdf/2026/financialresult202609_e.pdf');
const pres = add('Financial Results for the Six Months Ended September 30, 2026 (presentación)', 'FANUC Corporation', 'Primaria', '2026-10-23', 'https://www.fanuc.co.jp/en/ir/announce/pdf/2026/reference202609_e.pdf');
const yh = add('Históricos diarios de 6954.T, 1305.T (ETF TOPIX) y 1624.T (ETF TOPIX-17 Maquinaria), hasta el 26-oct-2026', 'Yahoo Finance', 'Datos de mercado', '2026-10-26', 'https://finance.yahoo.com/quote/6954.T/history/');
const msF = add('FANUC Corporation: datos financieros y estimaciones (Finances)', 'MarketScreener', 'Datos de mercado', '2026-10-26', 'https://www.marketscreener.com/quote/stock/FANUC-CORPORATION-6492019/finances/');
const inv = add('Fanuc Corp. (6954): consensus estimates', 'Investing.com', 'Datos de mercado', '2026-10-26', 'https://www.investing.com/equities/fanuc-corp.-consensus-estimates');
const sa = add('Fanuc (TYO:6954) Forecast', 'Stock Analysis', 'Datos de mercado', '2026-10-26', 'https://stockanalysis.com/quote/tyo/6954/forecast/');
const kyA = add('ファナック(6954) アナリスト予想・コンセンサス (IFIS, a 23-oct-2026)', 'Kabuyoho (IFIS Japan)', 'Datos de mercado', '2026-10-26', 'https://kabuyoho.jp/reportAnalyst?bcode=6954');
const kyT = add('ファナック(6954) レポート: objetivo de consenso y cambio de recomendación de un «日系中堅証券» del 26-oct', 'Kabuyoho (IFIS Japan)', 'Datos de mercado', '2026-10-26', 'https://kabuyoho.jp/reportTop?bcode=6954');
const rt1 = add('レーティング日報【最上位を継続】 (10月26日): Macquarie, sobreponderar, 8.000 → 7.300 JPY', 'Kabutan', 'Analistas', '2026-10-26', 'https://kabutan.jp/stock/news?code=6954&b=n202610260860');
const rt2 = add('レーティング日報【弱気継続】 (10月26日): Goldman Sachs, vender, 4.600 → 4.900 JPY', 'Kabutan', 'Analistas', '2026-10-26', 'https://kabutan.jp/stock/news?code=6954&b=n202610260857');
const fis = add('ファナック---反発、通期業績上方修正で部材調達問題への懸念も後退 (Fisco; ficha con capitalización y relación de crédito)', 'Kabutan / Fisco', 'Prensa', '2026-10-26', 'https://kabutan.jp/stock/news?code=6954&b=n202610260313');
const kt = add('ファナック(6954)の決算発表スケジュール («次回の決算発表予定日は未定»)', 'Kabutore', 'Datos de mercado', '2026-10-26', 'https://www.kabutore.biz/kessan/yotei_kobetsu.html?code=6954');
const ecb = add('Euro foreign exchange reference rates (eurofxref-daily), 23-oct-2026', 'Banco Central Europeo', 'Datos de mercado', '2026-10-23', 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml');
const mof = add('Interest Rate (JGB benchmark yields), octubre de 2026 (jgbcme.csv)', 'Ministerio de Finanzas de Japón', 'Primaria', '2026-10-23', 'https://www.mof.go.jp/english/policy/jgbs/reference/interest_rate/jgbcme.csv');
const kar = add('Fanuc (6954): posiciones cortas declaradas (karauri), a partir de los informes publicados por la JPX', 'karauri.net', 'Datos de mercado', '2026-10-26', 'https://karauri.net/6954/');
const dam = add('Country Default Spreads and Risk Premiums (actualización de enero de 2026)', 'Aswath Damodaran (NYU Stern)', 'Datos de mercado', '2026-01', 'https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/ctryprem.html');
const yuho = add('Yuka Shoken Hokokusho, 57.º ejercicio (Annual Securities Report, abr-2025 a mar-2026): nota de balance n.º 2 (p. 62) y normas no aplicadas (p. 61)', 'FANUC Corporation (EDINET E01946)', 'Primaria', '2026-06', 'https://www.fanuc.co.jp/ja/ir/securitiesreport/pdf/securitiesreport57_202603.pdf');
const tanFY = add('Consolidated Annual Financial Results for the year ended March 31, 2026 (Kessan Tanshin FY2025)', 'FANUC Corporation', 'Primaria', '2026-04-24', 'https://www.fanuc.co.jp/en/ir/announce/pdf/2026/financialresult202603_e.pdf');

// Comparables: fuentes por empresa (MarketScreener y Stock Analysis del 7-oct para estimaciones y balance;
// Yahoo del 26-oct para el precio)
const MSU = {"6506.T":"YASKAWA-ELECTRIC-CORPORAT-6492333","6861.T":"KEYENCE-CORPORATION-6492212","6273.T":"SMC-CORPORATION-6492069","6268.T":"NABTESCO-CORPORATION-6496668","6324.T":"HARMONIC-DRIVE-SYSTEMS-IN-13655246","6503.T":"MITSUBISHI-ELECTRIC-CORPO-6491287","SIE.DE":"SIEMENS-AG-56358595","ROK":"ROCKWELL-AUTOMATION-INC-14277"};
const SAU = {"6506.T":"quote/tyo/6506","6861.T":"quote/tyo/6861","6273.T":"quote/tyo/6273","6268.T":"quote/tyo/6268","6324.T":"quote/tyo/6324","6503.T":"quote/tyo/6503","SIE.DE":"quote/etr/SIE","ROK":"stocks/rok"};
const ms = [], st = [];
for (const e of empresas) {
  ms.push(add(`${e.nombre}: datos financieros y estimaciones (Finances)`, 'MarketScreener', 'Datos de mercado', e.ticker === '6506.T' ? '2026-10-26' : '2026-10-07', `https://www.marketscreener.com/quote/stock/${MSU[e.ticker]}/finances/`));
  st.push(add(`${e.nombre} (${e.ticker}) Statistics`, 'Stock Analysis', 'Datos de mercado', '2026-10-07', `https://stockanalysis.com/${SAU[e.ticker]}/statistics/`));
}
const yc = add('Históricos diarios de los comparables (6506.T, 6861.T, 6273.T, 6268.T, 6324.T, 6503.T, SIE.DE, ROK), hasta el 26-oct-2026', 'Yahoo Finance', 'Datos de mercado', '2026-10-26', 'https://finance.yahoo.com/');
const saKey = add('Keyence (TYO:6861) Balance sheet, trimestral (20-jun-2026)', 'Stock Analysis', 'Datos de mercado', '2026-10-07', 'https://stockanalysis.com/quote/tyo/6861/financials/balance-sheet/?p=quarterly');
const saSmc = add('SMC (TYO:6273) Balance sheet, trimestral (30-jun-2026)', 'Stock Analysis', 'Datos de mercado', '2026-10-07', 'https://stockanalysis.com/quote/tyo/6273/financials/balance-sheet/?p=quarterly');

// Transacciones (fuentes de la D anterior, renumeradas)
const vieja = id => { const f = ant.fuentes.find(x => x.id === id); return add(f.titulo, f.editor, f.tipo, f.fecha, f.url); };
const sb = vieja(32), hil1 = vieja(33), hil2 = vieja(34), sie = vieja(35), ecbh = vieja(36), emr = vieja(37), mak = vieja(38);
const plc = add('SoftBank Acquires ABB Robotics: EU Approved $5.375B Deal (caso M.12248; cierre pendiente de China y EE. UU.)', 'PLC Matrix', 'Prensa', '2026-10-24', 'https://www.plcmatrix.com/softbank-abb-robotics-eu-approval-spare-parts-transition/');

const D = {};
D.identificacion = { ...ant.identificacion,
  precio: 5639, fecha_precio: '2026-10-26', acciones: 924.914, capitalizacion_publicada: 5539000,
  max_52s: 8880, min_52s: 4761,
  volumen_medio_diario: `≈ 35.500 M JPY/día (5,8 M de acciones; 3 meses) [${yh}]`,
  proximos_resultados: '2027-01-26',
};

D.consenso = {
  guidance: `Previsión de Fanuc para FY2026 (abr-2026 a mar-2027), subida por segunda vez el 23-oct-2026: ventas de 1.013.700 M JPY (antes 948.100; +6,9 %), beneficio de explotación de 240.700 M (antes 218.000; +10,4 %), beneficio ordinario de 308.800 M (antes 271.200; +13,9 %) y beneficio neto atribuido de 228.300 M (antes 198.000; +15,3 %), BPA de 246,01 JPY [${tan}]. Supone 150 JPY/USD y 175 JPY/EUR de octubre a marzo, frente a 159,37 y 184,35 de media en el 1S [${pres}]. La guía implica para el 2S ventas de 539.992 M (+19,9 %) y un margen operativo del 23,0 %, por debajo del 24,6 % del 1S. La de julio ya había subido la inicial de abril (909.600 / 212.200 / 184.900) [${tan}]. Fanuc no publica objetivos a medio plazo. La guía nueva va por delante del consenso previo: IFIS daba el 23-oct ventas de 969.300 M, BE de 225.500 M y beneficio ordinario de 279.700 M [${kyA}].`,
  estimaciones: [
    { periodo: 'FY2026e', ingresos: 969483, ebitda: 276885, ebit: 228206, bpa: 220.8, dpa: 132.8, fuente: `MarketScreener consultado el 26-oct-2026, columna «2027» (ejercicio a mar-2027); cifras sin cambios desde el 7-oct: aún no recogen la guía del 23-oct [${msF}]` },
    { periodo: 'FY2027e', ingresos: 1035109, ebitda: 298566, ebit: 250176, bpa: 237.9, dpa: 144.5, fuente: `MarketScreener, columna «2028» (ejercicio a mar-2028), sin actualizar tras el 23-oct [${msF}]` },
    { periodo: 'FY2028e', ingresos: 1092417, ebitda: 317961, ebit: 268778, bpa: 255.8, dpa: 156.8, fuente: `MarketScreener, columna «2029» (ejercicio a mar-2029), sin actualizar tras el 23-oct [${msF}]` },
  ],
  recomendaciones: { n_analistas: 19, comprar: 8, mantener: 10, vender: 1, po_medio: 7256.7, po_min: 4900, po_max: 8700 },
  revisiones: `Tras los resultados, MarketScreener sigue con las estimaciones del 7-oct (sin la guía nueva) [${msF}] y Stock Analysis con las del 4-sep [${sa}]: no hay una fuente gratuita con el consenso de BPA ya revisado. IFIS (Kabuyoho) daba el 23-oct un beneficio ordinario de FY2026 de 279.700 M (277.226 M una semana antes y 278.217 M cuatro semanas antes), un 9,4 % por debajo de la guía nueva [${kyA}]. Investing recoge 19 recomendaciones (8 comprar, 10 mantener, 1 vender) y un objetivo medio de 7.256,7 JPY (máx. 8.700, mín. 4.900) [${inv}]. Movimientos de objetivo: en agosto, UBS (7.060) y Citi (7.000) bajaron a neutral [${inv}]; el 26-oct, Macquarie bajó de 8.000 a 7.300 (sobreponderar) [${rt1}], un bróker japonés mediano de 7.500 a 6.400 (B+) [${kyT}] y Goldman Sachs subió de 4.600 a 4.900 (vender) [${rt2}]. La tendencia de los objetivos en tres meses es a la baja aunque suban los beneficios: el mercado ha bajado el múltiplo del sector.`,
  base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null, confianza: 'Media',
};

D.bolsa = { ...b.bolsa };
delete D.bolsa.tramo_drawdown;
D.bolsa.posicion_corta_pct = null;
D.bolsa.comentario = `Hechos para el comentario: en un año la acción ha dado un 18,1 % (rentabilidad total) frente al 25,1 % del ETF TOPIX y el 1,6 % del ETF TOPIX-17 Maquinaria; en lo que va de 2026, −5,2 % frente a +19,3 % del TOPIX [${yh}]. Rango de 52 semanas de 4.761 a 8.880 JPY (máximo del 14-may-2026); el precio de 5.639 JPY (26-oct) está un 36,5 % por debajo del máximo [${yh}]. A cinco y diez años va muy por detrás del índice (5,1 % y 6,1 % anual frente a 17,4 % y 13,7 %) [${yh}]. Beta de 1,46 frente al ETF TOPIX (60 meses; semanal de 5 años 1,32 y de 2 años 1,60) y volatilidad de un año del 52,6 % [${yh}]. Posiciones cortas declaradas (umbral 0,5 %): ninguna desde el 5-oct-2026, cuando Morgan Stanley MUFG bajó al 0,28 % [${kar}]. El 26-oct, primera sesión tras los resultados, subió un 0,9 % con 13,6 M de acciones negociadas, 2,3 veces la media [${yh}]; relación de crédito comprador/vendedor de 19,7 veces [${fis}]. Próximos resultados (3T FY26): fecha aún no anunciada [${kt}]; los del 3T FY25 se publicaron el 26-ene-2026, y esa es la fecha que se toma como referencia.`;
D.bolsa.confianza = 'Alta';

D.multiplos_historicos = {
  serie: b.cierres_ejercicio.map(c => ({ anio: c.anio, precio_cierre: c.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
  comentario: `Precios de cierre del último día hábil de cada ejercicio (31 de marzo o anterior), de Yahoo Finance [${yh}]; «FY2025» es el cierre del 31-mar-2026, según la etiqueta de Fanuc. No hay EV/EBITDA ni PER de los próximos 12 meses históricos gratuitos.`,
  confianza: 'Media',
};

D.comparables = {
  criterio: `Hechos de método: los mismos ocho comparables del 7-oct, llevados al cierre del 26-oct-2026 (Siemens y Rockwell, 23-oct) [${yc}]. Capitalización = la de Stock Analysis del 7-oct × (precio de hoy ÷ precio del 7-oct); valor empresa = el del 7-oct más la variación de la capitalización (sin balances nuevos publicados entre las dos fechas) [${st.join(', ')}]. Ventas, EBITDA y BPA de los últimos y próximos 12 meses del mismo proveedor, MarketScreener; Yaskawa releída el 26-oct tras su semestre, el resto sin resultados nuevos [${ms.join(', ')}]. Conversión con el BCE del 23-oct-2026: 175,51 JPY/EUR y ${USDJPY} JPY/USD (cruce con 1,1193 USD/EUR) [${ecb}]. LTM = último ejercicio cerrado (marzo de 2026 en las japonesas, febrero de 2026 en Yaskawa, 2025 en Nabtesco) y, en Siemens y Rockwell (ejercicio a septiembre), la estimación del ejercicio que acaba de cerrar. NTM = oct-2026 a sep-2027, ponderando los dos ejercicios estimados por meses (marzo: 6/12 y 6/12; Yaskawa: 5/12 y 7/12; Nabtesco: 3/12 y 9/12; Siemens y Rockwell: el ejercicio a sep-2027). Crecimiento = NTM sobre LTM anualizado por los meses entre el fin de cada periodo. Al valor empresa de Keyence se le restan 1.618.699 M de inversiones a largo plazo y al de SMC 77.140 M [${saKey}, ${saSmc}]. ROIC y rentabilidad por FCF, de Stock Analysis (la rentabilidad por FCF, ajustada al precio nuevo); DN/EBITDA = deuda neta de Stock Analysis entre EBITDA LTM de MarketScreener. Rockwell: BPA ajustado de MarketScreener.`,
  empresas,
  comentario: null, confianza: 'Media',
};

const usd = x => Math.round(x * USDJPY);
D.transacciones = {
  operaciones: [
    { fecha: '2025-10', objetivo: 'ABB Robotics (robots industriales de ABB)', comprador: 'SoftBank Group', ev: usd(5375), ev_ventas: 2.36, ev_ebitda: 17.2, prima_pct: null, excluir: false, comentario: `Precio total de 5.375 M USD por el 100 %; ventas de 2.279 M USD y EBITDA de 313 M USD en 2024 (US GAAP, pro forma, sin auditar; con el EBITA operativo de 277 M USD, 19,4x) [${sb}]. Aprobada por la UE el 11-mar-2026; a 24-oct seguía pendiente de China y EE. UU. [${plc}].` },
    { fecha: '2025-10', objetivo: 'Hillenbrand (maquinaria de procesado y de inyección, Milacron)', comprador: 'Lone Star Funds', ev: usd(3800), ev_ventas: 1.42, ev_ebitda: 9.8, prima_pct: 37, excluir: false, comentario: `32,00 USD por acción, valor empresa ≈ 3.800 M USD; prima del 37 % sobre el cierre no afectado del 12-ago-2025 [${hil1}]. Múltiplos sobre ventas de 2.673,8 M USD y EBITDA ajustado de 388,0 M USD del ejercicio a sep-2025 [${hil2}].` },
    { fecha: '2024-10', objetivo: 'Altair Engineering (software de simulación)', comprador: 'Siemens', ev: usd(10000), ev_ventas: 15.4, ev_ebitda: null, prima_pct: 19, excluir: true, comentario: `113 USD por acción, valor empresa ≈ 10.000 M USD, prima del 19 % [${sie}]. La nota da unas ventas de ≈ 600 M EUR; el EV/ventas usa 1,0815 USD/EUR del BCE del 30-oct-2024 [${ecbh}]. Software, no equipos: múltiplo de otra naturaleza.` },
    { fecha: '2023-04', objetivo: 'National Instruments (NI, test y medida)', comprador: 'Emerson', ev: null, ev_ventas: null, ev_ebitda: null, prima_pct: 49, excluir: false, comentario: `60 USD por acción, valor de las acciones de 8.200 M USD (no publica valor empresa ni EBITDA); ventas de 1.660 M USD en 2022; prima del 49 % sobre el cierre del 12-ene-2023 [${emr}].` },
    { fecha: '2025-04', objetivo: 'Makino Milling Machine (máquina herramienta)', comprador: 'Nidec (OPA hostil, retirada)', ev: null, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: `Nidec lanzó la OPA el 4-abr-2025 y la retiró el 9-may-2025, tras la emisión gratuita de derechos de suscripción que Makino aprobó como defensa [${mak}]. Precio y prima no verificados en documento original.` },
  ],
  comentario: null, confianza: 'Media',
};

D.dcf = { wacc: { tasa_libre_pct: 2.837, beta: 1.21, prima_mercado_pct: 5.14, prima_adicional_pct: null, coste_deuda_pct: null, tasa_impositiva_pct: null, peso_deuda_pct: null } };

D.valoracion = {
  puente: { fecha: '2026-09-30', deuda_financiera: 0, arrendamientos: 0, caja: 787085, minoritarios: 18676, pensiones: 19386, asociadas: 167210, otros_ajustes: 0 },
  rab: null, pesos: null,
  comentario: `Hechos del puente (balance consolidado a 30-sep-2026, JGAAP) [${tan}]: sin préstamos ni bonos. Caja = efectivo y depósitos 746.285 M + valores negociables a corto 40.800 M = 787.085 M, ya después de la recompra de julio-septiembre (50.011 M) y del dividendo final (52.018 M); la recompra nueva (hasta 50.000 M desde el 26-oct) no ha empezado a la fecha del balance, así que acciones (924,914 M = 982,272 M emitidas − 57,359 M en autocartera) y caja son del mismo momento [${tan}]. Arrendamientos 0: con JGAAP no hay pasivo por arrendamientos operativos; la norma nueva se aplicará desde el ejercicio a marzo de 2028 [${yuho}]. Minoritarios a valor contable: 18.676 M. Pensiones: pasivo neto por prestaciones definidas de 19.386 M (bruto de impuestos). Asociadas: 167.210 M a 31-mar-2026 [${yuho}] (el semestral no lo desglosa); resultado por puesta en equivalencia de 30.531 M en FY2025 [${tanFY}] y 22.977 M en el 1S FY26 (14.725 M un año antes) [${tan}], es decir, 38.783 M en los últimos doce meses. Valores de inversión a largo plazo: 242.860 M a 30-sep-2026 (223.287 M a mar-26) [${tan}]; sin las asociadas quedan participaciones cruzadas y bonos (56.077 M a mar-26). WACC (datos de mercado): tasa libre, JGB a 10 años del 23-oct-2026, 2,837 % (MoF; el 26-oct aún no estaba publicado; 3,103 % el 6-oct) [${mof}]. Beta frente al ETF TOPIX: mensual de 60 meses 1,46, semanal de 5 años 1,32 y de 2 años 1,60; ajustada (Blume) sobre la semanal de 5 años, 1,21 [${yh}]. Prima de mercado: 5,14 % total para Japón de Damodaran (enero de 2026; prima país 0,91 % sobre la madura; calificación A1) [${dam}].`,
  confianza: 'Alta',
};

D.huecos = ant.huecos.filter(h => !['saldo de crédito (compras y ventas a crédito) de la JPX'].includes(h.campo));
D.huecos.push({ seccion: 'consenso', campo: 'estimaciones de BPA a tres años revisadas tras la guía del 23-oct', tipo: 'Complemento', intentos: '1) MarketScreener (sin actualizar: mismas cifras que el 7-oct); 2) Stock Analysis (previsiones del 4-sep; años 2-3 de pago); 3) Kabuyoho/IFIS (solo el ejercicio en curso, a 23-oct, antes de los resultados)', decision: 'Se usa MarketScreener marcado como previo a la guía nueva' });
D.huecos.push({ seccion: 'identificacion', campo: 'proximos_resultados (fecha confirmada)', tipo: 'Complemento', intentos: '1) Web de inversores de Fanuc: sin calendario publicado; 2) Kabutore: «次回の決算発表予定日は未定»; 3) fecha del año anterior: el 3T FY25 se publicó el 26-ene-2026', decision: 'Calculado y marcado como estimación (26-ene-2027)' });

const out = { identificacion: D.identificacion, consenso: D.consenso, bolsa: D.bolsa, multiplos_historicos: D.multiplos_historicos, comparables: D.comparables, transacciones: D.transacciones, dcf: D.dcf, valoracion: D.valoracion, fuentes: F, huecos: D.huecos };
writeFileSync(join(aqui, 'D.json'), JSON.stringify(out, null, 1));
console.log('D.json fuentes', F.length, 'comparables', empresas.length);
