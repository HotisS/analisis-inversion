// Notas A-E de Tomra (corte 26-oct-2026), hechas a mano en orden A, B, C, D, E (sin subagentes).
// Parte de las notas del informe del 8-oct (copiadas en esta carpeta como A0-D0 la primera vez) y cambia dato a dato
// lo que trae el 3T26 (23-oct-2026) y lo que se ha vuelto a comprobar a la nueva fecha de corte. E es nueva.
// Uso: node informes/tomra-2026-10-26/notas/construir-notas.mjs
import { readFileSync, writeFileSync, existsSync, copyFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const DIR = dirname(fileURLToPath(import.meta.url));
for (const L of 'ABCD') if (!existsSync(join(DIR, L + '0.json'))) copyFileSync(join(DIR, L + '.json'), join(DIR, L + '0.json'));
const lee = (n) => JSON.parse(readFileSync(join(DIR, n), 'utf8'));
const escribe = (L, o) => { o._estado = 'completa (26-oct-2026)'; writeFileSync(join(DIR, L + '.json'), JSON.stringify(o, null, 2)); };
const fuente = (o, f) => { const id = Math.max(...o.fuentes.map((x) => x.id)) + 1; o.fuentes.push({ id, ...f }); return id; };
const Q3 = { informe: 'https://mb.cision.com/Public/4659/4414197/b4b00b5c4776540f.pdf', pres: 'https://mb.cision.com/Public/4659/4414197/a754dee9f1f58a0b.pdf', nota: 'https://mb.cision.com/Public/4659/4414197/886e50a1b684ffdb.pdf' };

// ───────────────────────────── A. Cuentas ─────────────────────────────
{
  const A = lee('A0.json');
  const a11 = fuente(A, { titulo: 'TOMRA 3rd quarter 2026 (informe trimestral, cuentas intermedias y notas)', editor: 'TOMRA Systems ASA', tipo: 'Primaria', fecha: '2026-10-23', url: Q3.informe });
  const a12 = fuente(A, { titulo: 'TOMRA 3rd quarter 2026 results announcement (presentación)', editor: 'TOMRA Systems ASA', tipo: 'Primaria', fecha: '2026-10-23', url: Q3.pres });
  const a13 = fuente(A, { titulo: 'Third Quarter 2026 Results Announcement (nota de prensa)', editor: 'TOMRA Systems ASA', tipo: 'Primaria', fecha: '2026-10-23', url: Q3.nota });
  const a14 = fuente(A, { titulo: '2026 Q3 TOMRA consensus - pre results (xlsx, 10 casas)', editor: 'TOMRA Systems ASA', tipo: 'Analistas', fecha: '2026-10-16', url: 'https://www.tomra.com/-/media/project/tomra/tomra/investor-relations/consensus/2026-q3-tomra-consensus---pre-results.xlsx' });
  const a15 = fuente(A, { titulo: 'Tomra slår förväntningarna (2T26 frente al consenso de Infront)', editor: 'EFN', tipo: 'Prensa', fecha: '2026-07-17', url: 'https://efn.se/tomra-slar-forvantningarna' });

  // LTM a 30-sep-2026 = 2025 − 9M25 + 9M26 [A11]. Partidas especiales del LTM: −1 M (4T25) y −13 M (1T26, Recycling).
  A.financieros.ltm = { periodo: 'LTM sep-26', fecha_fin: '2026-09-30', ingresos: 1486, ebitda: 285, ebit: 155, beneficio_neto: 92, bpa: 0.31, dpa: 0.2, dpa_extraordinario: 0, fcf: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 14 };
  A.financieros.ajustes = A.financieros.ajustes.replace(/\s*$/, '') + ` En los últimos 12 meses a sep-26 hay 14 M de partidas especiales dentro del EBITDA (1 M en el 4T25 y 13 M de reestructuración de Recycling en el 1T26); el 3T26 no tiene ninguna [${a11}].`;

  // Trimestres: entra el 3T26 y sale el 4T24 (ocho trimestres de 4T24 a 3T26 con el 3T25 ya dentro).
  const it = A.trimestres.items;
  it.push({ periodo: '3T26', ingresos: 366, crecimiento_pct: 19.6, crecimiento_organico_pct: 17, ebitda: 73, margen_ebitda_pct: 19.9, bpa: 0.08, vs_consenso: 'Superior' });
  const t2 = it.find((x) => x.periodo === '2T26'); t2.vs_consenso = 'Superior';
  A.trimestres.items = it.slice(-8);
  A.trimestres.ultima_presentacion = `En el **2T26** (17-jul-26) el mensaje fue de volumen: ingresos +25 % a 405 M, nuevos mercados con 69 M (Polonia, Portugal, Singapur y Rumanía) y EBITA ajustado de 57 M (14,1 %), frente a 47,1 M que esperaba el consenso de Infront [A4, A${a15}]. El margen bruto de Collection cayó al 38,6 % por las máquinas de Polonia y la deuda subió a 2,5 veces el EBITDA; la guía rebajó el ritmo: Collection 400-440 M en el 2S26 y el Reino Unido a 2027 [A4].

En el **3T26** (23-oct-26) el tono pasó a ejecución y caja. Ingresos +20 % (+17 % a tipo constante) a 366 M, frente a 347 M del consenso previo de diez casas que publica la propia Tomra; EBITA ajustado de 47 M frente a 41 M (12,9 % de margen, 10,0 % un año antes) y BPA de 0,08 EUR frente a 0,065 [A${a11}, A${a14}]. El crecimiento vino de los mercados existentes (+19 %: Alemania, Norteamérica con la conversión puntual de quioscos en Canadá y 8 M de CLYNK, y Australia), con solo 24 M de mercados nuevos; el flujo operativo subió a 112 M (64 M) al cobrar Polonia, y la deuda neta bajó a 2,1 veces el EBITDA [A${a11}, A${a12}]. La guía se estrechó: Collection 410-430 M en el 2S26 (implica 193-213 M en el 4T, frente a 207 M un año antes: «el crecimiento de los mercados existentes se normaliza»), Recycling 205-215 M (antes 200-215) y Food 347-357 M (antes 340-360) [A${a12}]. La dirección dimensionó el Reino Unido en unas 25.000 máquinas en la primera fase y 5.000-10.000 en la segunda, y confirmó que estudia vender Mining [A${a12}]. La acción abrió un 11 % arriba y cerró el día un 1,5 % arriba, con la guía del 4T de Collection y los 26 M de pedidos extraordinarios de Mining como puntos que rebajaron el entusiasmo. No hemos tenido acceso a la transcripción del turno de preguntas.`;
  A.trimestres.confianza = 'Alta';

  // KPI con el 3T26.
  const k = A.negocio.kpis;
  k[2].comentario = `En el 3T26, nuevos mercados 24 M de 217 M (11 %); los existentes crecieron un 19 % [A${a11}]. Polonia tenía ~7.500 máquinas instaladas a final del 3T26 y Singapur ~500 [A${a12}].`;
  k[4] = { kpi: 'Recycling: entrada de pedidos / cartera', valor_anterior: '3T25: 42 M / 109 M', valor_actual: '3T26: 73 M / 124 M', variacion: '+73 % / +14 %', comentario: `Los pedidos del 3T26 incluyen 26 M de pedidos extraordinarios de Mining, que tardan 9-12 meses en facturarse; sin ellos, 47 M [A${a11}, A${a12}].` };
  k[5] = { kpi: 'Food: entrada de pedidos / cartera', valor_anterior: '3T25: 77 M / 138 M', valor_actual: '3T26: 75 M / 110 M', variacion: '−2 % / −20 %', comentario: `La cartera lleva tres trimestres bajando (137 M en el 1T26, 121 M en el 2T26) [A${a11}].` };

  // Balance y liquidez a 30-sep-2026 (los históricos anuales no cambian).
  A.balance.liquidez = `A 30-sep-26: caja de 67 M y 135 M de líneas no dispuestas (RCF de 150 M hasta dic-28, Eksfin y descubierto del cash pool); vida media de la deuda de 3,8 años [A${a11}, A${a12}]. A 31-dic-25: caja de 87,4 M y 54,1 M de líneas no dispuestas [A1].`;
  A.balance.vida_media_anios = 3.8;
  A.balance.rating = 'Scope Ratings: BBB+, perspectiva estable (confirmado en la presentación del 3T26); rebaja de un escalón desde A- anunciada por TOMRA el 3-jun-26 por mayor apalancamiento tras adquisiciones financiadas con deuda y caja más débil [A8, A' + a12 + '].';
  A.balance.otros_pasivos = A.balance.otros_pasivos.replace('el ratio era del 35 % a cierre de 2025 y del 34 % en jun-26, con poca holgura [1, 4].', `el ratio era del 35 % a cierre de 2025, del 34 % en jun-26 y del 36 % en sep-26 [1, 4, ${a11}].`);
  A.balance.comentario = A.balance.comentario.replace('En jun-26 la deuda neta/EBITDA sube a 2,5x [4].', `En jun-26 la deuda neta/EBITDA sube a 2,5x y en sep-26 baja a 2,1x: deuda financiera de 500 M, arrendamientos de 156 M y caja de 67 M, con el cobro de Polonia (flujo operativo de 112 M en el 3T26) [4, ${a11}].`);
  A.balance.confianza = 'Alta';
  A.flujos.comentario = A.flujos.comentario.replace(/\s*$/, '') + ` En enero-septiembre de 2026 el flujo operativo fue de 210 M (147 M un año antes) y la inversión de 65 M, con 61 M de capex y otras inversiones; la guía de capex de 2026 sigue en 90-100 M [${a11}].`;

  // Extra: segmentos del 3T26 y cartera.
  A.extra.collection_existentes_nuevos_trimestral.push({ periodo: '3T26', existentes: 193, nuevos: 24, total: 217, nota: `existentes incluye 8 M de CLYNK [${a11}]` });
  A.extra.pedidos_y_cartera.push({ periodo: '3T26', recycling_pedidos: 73, recycling_cartera: 124, food_pedidos: 75, food_cartera: 110 });
  A.extra.segmentos_ebita['9M26'] = { Collection: 112, Recycling: 5, Food: 30, Horizon: -4, GroupFunctions: -13, especiales: -13, total: 117, nota: `EBITA de enero-septiembre de 2026; Recycling ajustado (−8 M con los 13 M de partidas especiales) [${a11}]` };
  A.extra.guia_2026 = `Informe del 3T26: Collection 410-430 M en el 2S26 (antes 400-440), margen bruto >40 % en el 2S26 y ~40 % en el año, opex de ~52 M por trimestre más 1-2 M de divisa, costes de arranque de ~20 M al año; Recycling 205-215 M en 2026 (antes 200-215), 55 % de la cartera facturada en el 4T con margen bruto del 50-54 % y opex de 19 M; Food 347-357 M (antes 340-360), 80 % de la cartera en el 4T con margen bruto del 43-47 %; Horizon 45-50 M con ~27 M de opex; capex del grupo 90-100 M [${a11}, ${a12}].`;

  // Huecos: el consenso previo ya existe para el 2T26 y el 3T26; el 3T24 sale de la ventana de ocho trimestres.
  A.huecos = A.huecos.filter((h) => !(h.seccion === 'trimestres' && /3T24|consenso previo/.test(h.campo)));
  A.huecos.push({ seccion: 'trimestres', campo: 'Resultado frente al consenso previo de 4T24 a 1T26', tipo: 'Complemento', intentos: '1) Informes trimestrales (no lo publican); 2) archivos de consenso de la web de Tomra: solo se conservan los de 2026, y el del 1T26 no da el real; 3) prensa (EFN, Placera): solo encontrados el 2T26 y el 3T26', decision: 'Omitido en esos trimestres; 2T26 y 3T26 «Superior»' });
  A.huecos = A.huecos.map((h) => (/Preguntas de los analistas/.test(h.campo) ? { ...h, campo: 'Preguntas de los analistas en las conferencias del 2T26 y 3T26', intentos: '1) Webcast de qcnl.tv (vídeo, sin transcripción); 2) Seeking Alpha (transcripción del 3T26 del 23-oct, bloqueada a la lectura automática); 3) FinancialFilings (solo 4T25 y 1T26) y roic.ai (403)' } : h));
  escribe('A', A);
}

// ───────────────────────────── B. Sector y competencia ─────────────────────────────
{
  const B = lee('B0.json');
  const b16 = fuente(B, { titulo: 'TOMRA 3rd quarter 2026 results announcement (presentación: Reino Unido, Alemania, Polonia, Singapur)', editor: 'TOMRA Systems ASA', tipo: 'Primaria', fecha: '2026-10-23', url: Q3.pres });
  const b17 = fuente(B, { titulo: 'TOMRA: Appointed preferred supplier to leading retail chain in UK', editor: 'TOMRA Systems ASA', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://news.cision.com/tomra-systems-asa/r/tomra--appointed-preferred-supplier-to-leading-retail-chain-in-uk,c4413419' });
  const b18 = fuente(B, { titulo: 'TOMRA 3rd quarter 2026 (informe trimestral: estado de los mercados de depósito)', editor: 'TOMRA Systems ASA', tipo: 'Primaria', fecha: '2026-10-23', url: Q3.informe });
  B.historia.hitos.push({ anio: '2026', hito: `Polonia llega a ~7.500 máquinas y termina la primera fase; Singapur arranca el 1-abr; en el Reino Unido, tres cadenas eligen a Tomra (dos en julio, ~3.900 máquinas, y una carta de intenciones el 21-oct por unas 2.000) para el sistema que empieza el 1-oct-2027 [B${b16}, B${b17}].` });
  B.historia.hitos = B.historia.hitos.slice(-12);
  B.sector.drivers.push({ driver: 'Sustitución tecnológica en Alemania', efecto: '+', horizonte: 'Cíclico', evidencia: `Los nuevos estándares técnicos del sistema alemán abren un ciclo de renovación y ampliación hasta mayo de 2029; Alemania es el mayor mercado de depósito de Tomra [B${b16}].` });
  B.sector.drivers = B.sector.drivers.slice(0, 6);
  B.sector.ciclo.comentario = B.sector.ciclo.comentario.replace(/\s*$/, '') + ` En el 3T26 los mercados existentes crecieron un 19 % y los nuevos aportaron 24 M; la dirección espera que los existentes se normalicen en el 4T y vuelvan a crecer «un dígito medio» de media [B${b18}].`;
  B.sector.regulacion = B.sector.regulacion.replace(/\s*$/, '') + ` Estado a oct-2026: Grecia retrasa su sistema; Moldavia, como tarde en ene-2027; Reino Unido, 1-oct-2027 (Gales se suma con el mismo operador desde ago-2026); España, operador en tramitación tras activarse la obligación en nov-2024 [B${b18}].`;
  B.competencia.posicion = B.competencia.posicion.replace(/\s*$/, '') + ` En el Reino Unido, el segundo mercado del mundo tras Alemania (26.000 M de envases), Tomra estima ~25.000 máquinas en la primera fase y 5.000-10.000 en la segunda; tiene adjudicadas ~3.900 y una carta de intenciones por ~2.000 más [B${b16}, B${b17}].`;
  B.competencia.amenazas = B.competencia.amenazas.replace(/\s*$/, '') + ` Envipco perdió un 19,6 % en bolsa entre el 7 y el 23-oct-2026, sin que conste un concurso británico perdido frente a Tomra [B${b17}].`;
  B.extra.post_pico = B.extra.post_pico.replace(/\s*$/, '') + ` 3T26: Polonia entra en la «cola larga» (tiendas independientes, ampliaciones y servicio) tras completar la primera fase; los nuevos mercados bajan de 69 M en el 2T26 a 24 M [B${b16}, B${b18}].`;
  B.huecos = B.huecos.map((h) => (h.seccion === 'competencia' && /Cuota mundial/.test(h.campo) ? { ...h, intentos: h.intentos.replace(/\s*$/, '') + `; repetido el 26-oct con la presentación del 3T26: da el tamaño británico (~25.000 + 5.000-10.000 máquinas), no una cuota mundial [${b16}]` } : h));
  escribe('B', B);
}

// ───────────────────────────── C. Equipo y gobierno ─────────────────────────────
{
  const C = lee('C0.json');
  const c26 = fuente(C, { titulo: 'Informe del tercer trimestre de 2026 (acciones, autocartera y guía)', editor: 'TOMRA Systems ASA', tipo: 'Primaria', fecha: '2026-10-23', url: Q3.informe });
  const c27 = fuente(C, { titulo: 'NewsWeb (Oslo Børs): avisos de Tomra Systems del 15-jul al 26-oct-2026 (resultados, directivos, participaciones, tipos de interés)', editor: 'Euronext Oslo Børs', tipo: 'Primaria', fecha: '2026-10-26', url: 'https://api3.oslo.oslobors.no/v1/newsreader/list?issuer=TOM&fromDate=2026-07-15&toDate=2026-10-26' });
  const c28 = fuente(C, { titulo: 'Short Sale Register: TOMRA SYSTEMS (NO0012470089), posiciones a 20-oct-2026', editor: 'Finanstilsynet', tipo: 'Primaria', fecha: '2026-10-20', url: 'https://ssr.finanstilsynet.no/api/v2/instruments' });
  const hg = C.directivos.historial_guidance;
  hg.push({ anio: '2026', guia: `Recycling 200-215 MEUR y Food 340-360 MEUR en 2026; Collection 400-440 MEUR en el 2S26 (informe 2T26) [7]`, real: `Informe 3T26: rangos estrechados a 205-215, 347-357 y 410-430 MEUR, con 9M de 141, 264 y 454 + 217 MEUR; ingresos y EBITA del 3T por encima del consenso [${c26}]`, cumplida: 'Sí' });
  C.directivos.historial_guidance = hg.slice(-7);
  C.directivos.comentario = C.directivos.comentario.replace(/\s*$/, '') + ` En el 3T26 la guía por división se estrechó en la parte media o alta de los rangos anteriores y el EBITA superó al consenso por segundo trimestre seguido [${c26}]. La jefatura de relación con inversores es interina (Bing Zhao) [${c26}].`;
  C.gobierno.alertas = C.gobierno.alertas.map((x) => x.replace(/posición corta[^.]*\./i, (m) => m));
  C.gobierno.alertas.push(`Posiciones cortas declaradas del 3,48 % del capital a 20-oct-2026 (JPMorgan AM 1,59 %, Alamut 0,71 %, AQR 0,59 %, CFM 0,59 %), que llegaron al 4,07 % el 16-oct con Citadel [${c28}].`);
  C.gobierno.control_y_defensas = C.gobierno.control_y_defensas.replace(/\s*$/, '') + ` Sin avisos de participaciones ni de operaciones de directivos entre el 30-sep y el 26-oct-2026 [${c27}].`;
  C.extra.acciones_3t26 = `296.040.156 acciones emitidas y 339.778 en autocartera a 30-sep-2026 (295,70 M en circulación), 22.459 accionistas [${c26}].`;
  escribe('C', C);
}

// ───────────────────────────── D. Mercado y valoración ─────────────────────────────
{
  const D = lee('D0.json');
  const P = lee('comparables-precio.json');
  const tc = 1 / 10.4665; // EUR por NOK, BCE 23-oct-2026
  const nokEur = (x) => Math.round((x / 10.4665) * 1000) / 1000;
  // Fuentes revisadas a la nueva fecha (mismo documento, dato nuevo).
  const fx = (id, cambios) => Object.assign(D.fuentes.find((f) => f.id === id), cambios);
  fx(2, { titulo: 'Históricos diarios de TOM.OL, OSEBX.OL, ^STOXX, EXSA.DE y EXH4.DE (bolsa.mjs, hasta el 23-oct-2026)', fecha: '2026-10-23' });
  fx(3, { fecha: '2026-10-23', url: 'https://data-api.ecb.europa.eu/service/data/EXR/D.NOK.EUR.SP00.A' });
  fx(4, { fecha: '2026-10-23' });
  fx(5, { fecha: '2026-10-23', url: 'https://data.norges-bank.no/api/data/GOVT_GENERIC_RATES/B.10Y.GBON?format=csv&startPeriod=2026-10-15&endPeriod=2026-10-26&locale=en' });
  fx(8, { titulo: 'Tomra Systems ASA: previsiones financieras (finances), datos del 15-oct-2026', fecha: '2026-10-15' });
  fx(25, { titulo: 'Short Sale Register: TOMRA SYSTEMS (NO0012470089), posiciones cortas a 20-oct-2026', fecha: '2026-10-20' });
  const d26 = fuente(D, { titulo: 'TOMRA 3rd quarter 2026 (informe trimestral: balance a 30-sep-2026)', editor: 'TOMRA Systems ASA', tipo: 'Primaria', fecha: '2026-10-23', url: Q3.informe });
  const d27 = fuente(D, { titulo: '2026 Q3 TOMRA consensus - pre results (10 casas: ingresos, EBITA y BPA de 3T26 y 2026-2028)', editor: 'TOMRA Systems ASA', tipo: 'Analistas', fecha: '2026-10-16', url: 'https://www.tomra.com/-/media/project/tomra/tomra/investor-relations/consensus/2026-q3-tomra-consensus---pre-results.xlsx' });
  const d28 = fuente(D, { titulo: 'Tomra Systems ASA (TOM.OL): ficha de análisis (objetivo medio y número de analistas)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-26', url: 'https://finance.yahoo.com/quote/TOM.OL/analysis/' });
  const d29 = fuente(D, { titulo: 'Tomra Systems kursmål 2026/2027 (objetivo medio de los analistas y cortos)', editor: 'TradeDesk', tipo: 'Datos de mercado', fecha: '2026-10-23', url: 'https://tradedesk.dk/no/aksjer/tom.ol' });
  const d30 = fuente(D, { titulo: 'Tomra-Aktie: Tomra meldet Umsatzplus. Jefferies senkt Ziel auf 90 NOK', editor: 'AD HOC NEWS', tipo: 'Prensa', fecha: '2026-10-24', url: 'https://www.ad-hoc-news.de/boerse/news/nebenwerte/tomra-aktie-tomra-meldet-umsatzplus-jefferies-senkt-ziel-auf-90-nok/70401894' });
  const d31 = fuente(D, { titulo: 'Tomra Systems-Aktie legt nach starken Quartalszahlen und Prognoseanhebung kräftig zu', editor: 'Investing.com (alemán)', tipo: 'Prensa', fecha: '2026-10-23', url: 'https://de.investing.com/news/stock-market-news/tomra-systemsaktie-legt-nach-starken-quartalszahlen-und-prognoseanhebung-kraftig-zu-93CH-3719458' });
  const d32 = fuente(D, { titulo: 'Tomras justerade ebita väsentligt bättre än väntat (Finwire)', editor: 'Placera', tipo: 'Prensa', fecha: '2026-10-23', url: 'https://www.placera.se/nyheter/tomras-justerade-ebita-vasentligt-battre-an-vantat-2026-10-23' });
  const d33 = fuente(D, { titulo: 'Tomra Systems: consenso y cambios de precio objetivo por casa (datos del 2-oct-2026)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-02', url: 'https://www.marketscreener.com/quote/stock/TOMRA-SYSTEMS-ASA-1413304/consensus/' });
  const d34 = fuente(D, { titulo: 'Históricos diarios de los comparables (ENVIP.OL, JBTM, KRN.DE, MTD, CGNX, HLMA.L, ALFA.ST, KARN.SW), cierres del 7 y el 23-oct-2026, y tipos del BCE', editor: 'Yahoo Finance y BCE', tipo: 'Datos de mercado', fecha: '2026-10-23', url: 'https://finance.yahoo.com/' });
  const d35 = fuente(D, { titulo: 'Heftig aksjebyks for Tomra', editor: 'Dagens Næringsliv', tipo: 'Prensa', fecha: '2026-10-23', url: 'https://www.dn.no/bors/tomra/heftig-aksjebyks-for-tomra/2-1-2062800' });
  const d36 = fuente(D, { titulo: 'TOM.OL, cotización intradía del 23-oct-2026 (barras de 30 minutos)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-23', url: 'https://query1.finance.yahoo.com/v8/finance/chart/TOM.OL?interval=30m' });

  const b = lee('bolsa-osebx.json');
  Object.assign(D.identificacion, {
    precio: nokEur(94.5), fecha_precio: '2026-10-23', acciones: 295.7, max_52s: nokEur(139.5), min_52s: nokEur(88.75),
    volumen_medio_diario: `≈ 5,6 M EUR/día (600.074 acciones; 3 meses a 23-oct-2026)`, proximos_resultados: '2027-02-12',
    notas_integrador: `Precio: cierre del viernes 23-oct-2026 en Oslo, 94,50 NOK [2] (la sesión del lunes 26 no había cerrado a la hora del análisis), convertido con el tipo de referencia del BCE del 23-oct-2026, 10,4665 NOK/EUR [3]. Rango de 52 semanas: 88,75 NOK (15-oct-2026) y 139,50 NOK (7-ene-2026) [2]. Acciones: 296.040.156 emitidas menos 339.778 en autocartera a 30-sep-2026 = 295,700 M [${d26}].`,
  });
  D.extra.meta = { ...D.extra.meta, tipo_cambio: Math.round(tc * 1e6) / 1e6, tipo_cambio_fecha: '2026-10-23', tipo_cambio_cita: `BCE, tipo de referencia del 23-oct-2026: 1 EUR = 10,4665 NOK [3]`, precio_nok: 94.5, fecha_precio: '2026-10-23' };
  D.extra.bono = { bund_10a_pct: 3.39, bund_fecha: '2026-10-23', bund_cita: 'Bundesbank, rendimiento a 10 años (Svensson), 3,39 % el 23-oct-2026 (3,55 % el 7-oct) [4]', noruega_10a_pct: 4.472, noruega_fecha: '2026-10-23', noruega_cita: 'Norges Bank, bono genérico a 10 años, 4,472 % el 23-oct-2026 [5]. Referencia: no se usa porque los flujos están en EUR.' };
  D.extra.rating = { agencia: 'Scope Ratings', rating: 'BBB+/Stable (rebaja desde A- el 3-jun-2026; confirmado en la presentación del 3T26)', cita: `[${d26}]` };

  // Consenso.
  D.consenso.guidance = `Tomra no da objetivo de grupo: guía por división en cada trimestre. En el 3T26 (23-oct-2026) [${d26}]: Collection, 410-430 MEUR de ingresos en el segundo semestre (antes 400-440; con 217 MEUR en el 3T, el 4T queda en 193-213 MEUR, frente a 207 MEUR en el 4T25), margen bruto >40 % en el semestre y ~40 % en el año, y unos 52 MEUR de gastos por trimestre más 1-2 MEUR de divisa; Recycling, 205-215 MEUR en 2026 (antes 200-215), con el 55 % de la cartera facturada en el 4T, margen bruto del 50-54 % y 16 MEUR brutos de ahorros con efecto pleno en 2027; Food, 347-357 MEUR (antes 340-360) y margen bruto del 43-47 % en el 4T; Horizon, 45-50 MEUR; capex de 90-100 MEUR. Ambiciones hacia 2030 «a lo largo del ciclo»: Collection, dos dígitos y EBITA en la parte alta de la decena; Recycling, dos dígitos y EBITA del 20-25 %; Food, un dígito medio-alto y EBITA hacia el 15 %. Capital Markets Day el 24-nov-2026.`;
  D.consenso.estimaciones = [
    { periodo: '2026e', ingresos: 1481, ebitda: 272.8, ebit: 143.6, bpa: 0.2864, dpa: 0.1747, fuente: 'MarketScreener, datos del 15-oct-2026, anteriores al 3T26 [8]' },
    { periodo: '2027e', ingresos: 1714, ebitda: 368.2, ebit: 233.6, bpa: 0.5549, dpa: 0.3116, fuente: 'MarketScreener, datos del 15-oct-2026, anteriores al 3T26 [8]' },
    { periodo: '2028e', ingresos: 1816, ebitda: 396.2, ebit: 259.7, bpa: 0.6443, dpa: 0.3609, fuente: 'MarketScreener, datos del 15-oct-2026, anteriores al 3T26 [8]' },
  ];
  D.consenso.recomendaciones = { n_analistas: 9, comprar: 6, mantener: 2, vender: 0, po_medio: nokEur(123.19), po_min: nokEur(75), po_max: nokEur(140) };
  D.consenso.revisiones = `Las estimaciones siguen bajando hasta los resultados. En el consenso que recoge la propia Tomra, del posterior al 2T26 (31-jul-2026, 9 casas) al previo al 3T26 (16-oct-2026, 10 casas): ingresos de 2026 de 1.485 a 1.482 MEUR (−0,2 %) y de 2027 de 1.807 a 1.773 (−1,9 %); EBITA ajustado de 2026 de 189 a 188,5 MEUR y de 2027 de 313 a 296 (−5,3 %); BPA de 2027 0,606 EUR [10, ${d27}]. Del 1T26 al 3T26 el EBITA de 2027 cae un 14 % (344 → 296). MarketScreener (15-oct) va en la misma línea: BPA de 2027 0,555 frente a 0,608 el 8-oct [8]. Objetivos: Jefferies de 105 a 90 NOK (mantener, 15-oct), DNB Carnegie a 75 NOK, y en septiembre recortes de Danske (135 → 125), SB1 Markets (120 → 115) y Fearnley (124 → 120); solo Barclays sube (120 → 140, 1-oct) [${d30}, ${d31}, ${d33}]. Las cifras de después del 3T26 no se han publicado aún (el archivo de consenso posterior da 404).`;
  D.consenso.notas_integrador = `Recomendaciones: 9 analistas según Yahoo (26-oct) con objetivo medio de 123,19 NOK [${d28}] (TradeDesk, 23-oct: 123,52 NOK [${d29}]). Reparto contado con las últimas recomendaciones publicadas: compran Barclays, SB1 Markets, Danske, Fearnley, Nordea y Kepler Cheuvreux; mantienen Handelsbanken y Jefferies; DNB Carnegie (objetivo 75 NOK) sin recomendación visible [${d33}, ${d30}, ${d31}]. Mínimo 75 NOK (DNB Carnegie) y máximo 140 NOK (Barclays). Estimaciones de MarketScreener del 15-oct, anteriores al 3T26 (no hay otras gratuitas con EBITDA).`;
  D.consenso.confianza = 'Media';
  D.huecos = D.huecos.filter((h) => !/desglose de recomendaciones/.test(h.campo));
  D.huecos.push({ seccion: 'consenso', campo: 'Estimaciones posteriores al 3T26', tipo: 'Complemento', intentos: `1) Archivo de consenso posterior al 3T26 de la web de Tomra (404 el 26-oct); 2) MarketScreener (datos del 15-oct, sin actualizar); 3) Yahoo y TradeDesk (solo objetivo medio)`, decision: 'Se usan las previas al 3T26 y se dice; el 3T26 batió al consenso (EBITA +14,6 %)' });

  // Bolsa.
  D.bolsa.rentabilidades = b.bolsa.rentabilidades;
  D.bolsa.anual = b.bolsa.anual;
  D.bolsa.beta = 0.96;
  D.bolsa.volatilidad_pct = 44.5;
  D.bolsa.max_drawdown_pct = -73.4;
  D.bolsa.posicion_corta_pct = 3.48;
  D.bolsa.notas_integrador = `Rentabilidades totales en NOK de TOM.OL frente al OSEBX (total) y al ETF iShares STOXX Europe 600 Industrial Goods & Services (EXH4.DE, total) hasta el 23-oct-2026 [2]. Beta mensual de 5 años frente al OSEBX: 0,96 (semanal 2 años 0,68); frente al STOXX 600 (precio) 1,31 y frente al EXSA 1,28 [2]. Volatilidad de un año 44,5 %. Mayores caídas diarias de 12 meses: −25,6 % el 24-abr-2026 (1T26), −8,7 % el 13-feb-2026 (4T25), −8,3 % el 7-sep-2026 y −4,4 % el 8-oct-2026 [2]. 23-oct: abre a 98,2 NOK, máximo de 103,7 NOK (+11,4 %) y cierra a 94,50 (+1,5 %) con 2,8 M de acciones, casi cinco veces la media [${d36}]. Cortos 3,48 % a 20-oct-2026 [25].`;
  D.bolsa.contexto = {
    movimiento: { fecha: '2026-10-26', var_1m_pct: 3.5, var_3m_pct: -6.5, var_6m_pct: 5.2, var_12m_pct: -27.0, dist_max_52s_pct: -31.2, dist_min_52s_pct: 7.1, dist_max_historico_pct: -69.8, tendencia: 'bajista', volatilidad_60d_pct: 29.4, avisos: [] },
    movimientos_fuertes: [
      { periodo: 'abr-may-2026', var_pct: -25.7, causa: `1T26 (24-abr): EBITA de 13 MEUR con 13 MEUR de reestructuración en Recycling y margen bruto de Collection del 38,6 %; −25,6 % en el día [2, 6]`, veredicto: 'no cambia', condicion: null },
      { periodo: 'jul-2026', var_pct: 15.6, causa: `2T26 (17-jul): ingresos +25 % y EBITA de 57 MEUR frente a 47,1 MEUR esperados; dos cadenas británicas eligen a Tomra [6]`, veredicto: 'no cambia', condicion: null },
      { periodo: '7-sep-2026', var_pct: -8.3, causa: 'Caída de un día sin comunicado de la empresa ni noticia localizada (NewsWeb y Cision sin avisos esa semana) [2]', veredicto: 'no cambia', condicion: null },
      { periodo: '8-oct-2026', var_pct: -4.4, causa: `Antes de resultados; en esas semanas DNB Carnegie baja su objetivo a 75 NOK y Jefferies a 90 NOK (15-oct); mínimo de 52 semanas el 15-oct (88,75 NOK) [${d30}, ${d31}]`, veredicto: 'no cambia', condicion: null },
    ],
    noticias: [
      { fecha: '2026-10-23', tipo: 'resultados', hecho: `3T26 por encima del consenso: ingresos 366 frente a 347 MEUR y EBITA ajustado 47 frente a 41 MEUR; guía estrechada al alza en Recycling y Food y Collection del 4T normalizándose; la acción sube un 11 % en la apertura y cierra +1,5 % [${d26}, ${d32}, ${d36}]`, veredicto: 'no cambia', condicion: null },
      { fecha: '2026-10-21', tipo: 'fusión u oferta', hecho: `Carta de intenciones para ser proveedor preferente de una gran cadena británica: ~2.000 máquinas desde 2027 (venta, arrendamiento y servicio) [B]`, veredicto: 'no cambia', condicion: null },
      { fecha: '2026-10-15', tipo: 'recomendación', hecho: `Jefferies baja su objetivo de 105 a 90 NOK (mantener); DNB Carnegie lo baja a 75 NOK; Barclays lo había subido a 140 NOK el 1-oct [${d30}, ${d31}, ${d33}]`, veredicto: 'no cambia', condicion: null },
      { fecha: '2026-10-20', tipo: 'accionista de referencia', hecho: `Cortos declarados del 3,48 % (4,07 % el 16-oct), sin cambios relevantes de los accionistas de referencia; Latour mantiene el 21,08 % [25]`, veredicto: 'no cambia', condicion: null },
      { fecha: '2026-11-24', tipo: 'resultados', hecho: 'Capital Markets Day en Asker: actualización de objetivos y de asignación de capital; posible decisión sobre la venta de TOMRA Mining [6]', veredicto: 'no cambia', condicion: null },
      { fecha: '2027-02-12', tipo: 'resultados', hecho: 'Resultados del 4T26 y propuesta de dividendo [6]', veredicto: 'no cambia', condicion: null },
    ],
    proximos_resultados: '2027-02-12',
    veredicto: 'no cambia',
    condicion: null,
    comentario: `La acción baja un 27 % en un año y sigue un 10 % bajo su media de 200 sesiones (tendencia bajista), pero rebota un 6,5 % desde el mínimo del 15-oct. La caída tiene causa conocida: cuatro trimestres de márgenes bajos (1T26) y recortes de estimaciones y objetivos hasta la víspera del 3T. El 3T26 bate al consenso y la reacción se queda en +1,5 % porque el 4T de Collection se normaliza y los pedidos de Recycling llevan 26 MEUR extraordinarios de Mining. No hay colocaciones, ampliaciones, ventas de directivos ni litigios pendientes; el único hecho con fecha es el Capital Markets Day del 24-nov, que puede mover el precio en los dos sentidos y no es ajeno al análisis. Veredicto: no cambia.`,
  };
  D.bolsa.confianza = 'Alta';

  // Comparables al 23-oct.
  D.comparables.empresas = P.empresas.map(({ _sim, _p0, _p1, _var_precio_pct, _var_eur_pct, ...e }) => e);
  D.comparables.notas_integrador = `Mismas ocho empresas y mismas estimaciones de MarketScreener que el 8-oct [12-19]; capitalización y múltiplos llevados al cierre del 23-oct-2026 con la variación de precio de cada acción y del tipo del BCE de su divisa frente al EUR (EV nuevo = EV del 8-oct + variación de la capitalización) [${d34}]. Variación del precio del 7 al 23-oct: Envipco −19,6 %, JBT Marel +4,1 %, Krones +5,4 %, Mettler-Toledo +8,9 %, Cognex −9,2 %, Halma −6,7 %, Alfa Laval −4,8 %, Kardex +2,5 %. Las estimaciones no recogen los resultados del 3T de cada una (método de las lecciones para reutilizar comparables; aquí con 16 días en vez de 1-3).`;
  D.comparables.criterio = D.comparables.criterio.replace(/\s*$/, '') + ` Precios del 23-oct-2026 [${d34}].`;

  // Puente a 30-sep-2026.
  D.valoracion.puente = { fecha: '2026-09-30', deuda_financiera: 500, arrendamientos: 156, caja: 67, minoritarios: 40, pensiones: 3.6, asociadas: 10.9, otros_ajustes: 36 };
  D.valoracion.notas_integrador = `Balance a 30-sep-2026 del informe del 3T26 [${d26}]: deuda financiera = pasivos con interés no corrientes 493 + corrientes 7 = 500 MEUR; arrendamientos 113 + 43 = 156; caja 67; minoritarios 40 a valor contable; pensiones netas 3,6 y asociadas 10,9 MEUR de las cuentas de 2025 (el trimestral no las desglosa) [7]; otros ajustes 36 MEUR: opciones sobre minoritarios (c-trace, AKR) y earn-out de CLYNK a 31-dic-2025 [7]. Deuda neta de la empresa (con arrendamientos) 589 MEUR, 2,1 veces el EBITDA de 12 meses [${d26}].`;
  D.extra.wacc_mercado = { ...D.extra.wacc_mercado, tasa_libre_pct: 3.39, capitalizacion_meur: Math.round(295.7 * nokEur(94.5)), peso_deuda_mercado_pct: Math.round((656 / (656 + 295.7 * nokEur(94.5))) * 1000) / 10, peso_calculo: 'Deuda financiera + arrendamientos a 30-sep-2026 (656 MEUR) / (deuda + capitalización a 23-oct-2026)' };
  D.extra.tipos_cambio_bce.fecha_corte = { fecha: '2026-10-23', ...P.bce['2026-10-23'] };
  escribe('D', D);
}

// ───────────────────────────── E. Sentimiento ─────────────────────────────
{
  const E = {
    sentimiento: {
      tono: 'Dividido', tendencia: 'Mejora',
      revisadas: [
        { plataforma: 'Substack «Norwegian Hidden Gems» (resumen de la conferencia del 3T26 y comentarios)', fecha: '2026-10', n_comentarios: 3, tono: 'Positivo', resumen: 'Lee el 3T26 como «otro paso para recuperar la confianza»: márgenes y caja mejores y el Reino Unido más visible; pide prudencia con los pedidos de Mining y la cartera de Food [1].' },
        { plataforma: 'Seeking Alpha (artículos de autores y comentarios, TMRAY/TMRAF)', fecha: '2026-10', n_comentarios: 6, tono: 'Positivo', resumen: 'Los dos últimos artículos de autores independientes son de compra («Bottom valuation opens for an entry», abril; «I\'m ready to add shares after Q2», julio), con muy poco debate en los comentarios [2].' },
        { plataforma: 'TradeDesk (página de la acción con señales y comentarios de inversores)', fecha: '2026-10', n_comentarios: 5, tono: 'Negativo', resumen: 'Señal técnica de «venta fuerte» por la tendencia bajista (bajo las medias de 50 y 200 sesiones) y el modelo vendió la acción el 7-sep; destaca la diferencia con el objetivo medio de los analistas (+30 %) [3].' },
        { plataforma: 'Comentarios y titulares de prensa económica nórdica tras el 3T26 (DN, Placera, E24)', fecha: '2026-10', n_comentarios: 10, tono: 'Dividido', resumen: '«Heftig aksjebyks» y «väsentligt bättre än väntat» por la mañana; la subida se deshizo durante el día, y los lectores discuten si el 4T de Collection vuelve a decepcionar [4, 5].' },
      ],
      temas: [
        { tema: 'Reino Unido como siguiente ola de instalaciones', postura: 'Alcista', peso: 'Alto', contraste: 'Respaldado por los datos: ~25.000 máquinas en la primera fase, Tomra con ~3.900 adjudicadas y una carta de intenciones por ~2.000 más; el margen de esas máquinas es la incógnita (Polonia bajó el margen bruto de Collection al 38,6 %) [1].' },
        { tema: 'Recuperación de márgenes y caja', postura: 'Alcista', peso: 'Medio', contraste: 'El EBITA ajustado sube al 12,9 % y el flujo operativo a 112 MEUR; pero el EBITA de 9M26 (11,8 %) sigue lejos del 18 % prometido para 2030 [1].' },
        { tema: 'Calidad de los pedidos de Recycling y cartera de Food', postura: 'Bajista', peso: 'Medio', contraste: 'Los pedidos de Recycling sin Mining extraordinario fueron 47 MEUR; la cartera de Food baja un 20 % interanual: la gente acierta al pedir prudencia [1].' },
        { tema: 'Tendencia del precio y cortos', postura: 'Bajista', peso: 'Medio', contraste: 'La acción está un 10 % bajo su media de 200 sesiones y los cortos rondan el 3,5 %; es momento, no fundamento [3].' },
      ],
      lectura: 'El sentimiento de los particulares es dividido y algo mejor que hace tres meses: los que siguen la empresa de cerca ven en el 3T26 el principio de la recuperación y el Reino Unido como catalizador; los que miran el precio ven una tendencia bajista y una subida que se deshizo en el día. No es extremo en ningún sentido (ni euforia ni capitulación) y coincide con el consenso de analistas (compra mayoritaria con objetivos a la baja). No aporta ningún riesgo que el informe no recoja: el margen del Reino Unido, la cartera de Food y el carácter extraordinario de los pedidos de Mining ya están en los riesgos. Debate escaso: la acción tiene poca conversación pública en inglés.',
      confianza: 'Baja',
    },
    fuentes: [
      { id: 1, titulo: 'Tomra Q3 2026: Key Takeaways (y comentarios)', editor: 'Norwegian Hidden Gems (Substack)', tipo: 'Foros y redes', fecha: '2026-10-23', url: 'https://norwaystocks.substack.com/p/tomra-q3-2026-key-takeaways' },
      { id: 2, titulo: 'Tomra Systems ASA: noticias y análisis (feed y artículos de autores, comentarios)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-23', url: 'https://seekingalpha.com/api/sa/combined/TMRAF.xml' },
      { id: 3, titulo: 'Tomra Systems (TOM.OL): señal, kursmål y comentarios', editor: 'TradeDesk', tipo: 'Foros y redes', fecha: '2026-10-26', url: 'https://tradedesk.dk/no/aksjer/tom.ol' },
      { id: 4, titulo: 'Heftig aksjebyks for Tomra (y comentarios de lectores)', editor: 'Dagens Næringsliv', tipo: 'Foros y redes', fecha: '2026-10-23', url: 'https://www.dn.no/bors/tomra/heftig-aksjebyks-for-tomra/2-1-2062800' },
      { id: 5, titulo: 'Tomras justerade ebita väsentligt bättre än väntat', editor: 'Placera', tipo: 'Foros y redes', fecha: '2026-10-23', url: 'https://www.placera.se/nyheter/tomras-justerade-ebita-vasentligt-battre-an-vantat-2026-10-23' },
    ],
    huecos: [
      { seccion: 'sentimiento', campo: 'Foros noruegos (Hegnar Online, Shareville) y Stocktwits', tipo: 'Complemento', intentos: '1) Stocktwits API (TMRAY: 404); 2) foro de Finansavisen (requiere cuenta); 3) Affärsvärlden (fallo de descarga)', decision: 'Omitido; sentimiento con confianza baja' },
    ],
  };
  writeFileSync(join(DIR, 'E.json'), JSON.stringify({ _estado: 'completa (26-oct-2026)', ...E }, null, 2));
}
console.log('Notas A-E escritas.');
