// Rastreador de noticias de lo que se vigila (15-oct-2026; idea tomada de radar-prensa: canales RSS en un
// JSON, filtro por reglas, agrupar piezas que cuentan lo mismo, memoria para no repetir). Complementa a la regla 13 de
// METODO-VIGENTE.md (punto c: noticias que pueden mover el precio) y a la vigilancia de las 9:25, que hoy busca a mano.
// Da AVISOS para que el análisis ponga el veredicto (no cambia / retrasa / descarta); nunca señales ni órdenes.
//
//   NODE_USE_ENV_PROXY=1 node herramientas/noticias.mjs                 lo vigilado (escaner/calendario.json + radar.json), últimos 3 días
//   … --valores ZTS,PUIG,RWAY        solo esos (claves de simbolos.json o de radar.json)
//   … --amplio                       además todas las analizadas value y growth (universo de los leads; ~4 minutos)
//   … --historico                    12 meses hacia atrás del universo amplio a los expedientes (una vez; se puede retomar)
//   … --dias 7                       otra ventana
//   … --meses 12 --valores PUIG      12 meses hacia atrás por trimestres (para el bloque de la regla 13 de una orden)
//   … --todas                        enseña también las de gravedad baja
//   … --escribir                     (vigilancia de las 9:25) guarda en la carpeta privada noticias-ultimo.json/.md, la memoria
//                                    noticias-vistas.json (solo sale lo nuevo), los avisos altos en noticias-registro.json y
//                                    el expediente de cada empresa y de cada sector en expedientes/ (lo leen leads.mjs y el modelo)
//   … --seguimiento                  qué hizo el precio 1, 5 y 20 sesiones después de cada aviso alto, frente al índice
//   … --pruebas                      hechos conocidos de escaner/noticias.json «_pruebas» que tienen que salir siempre
//   … --json                         salida JSON
//
// Fuentes (sin claves ni datos personales en las cabeceras): Google Noticias por nombre (idioma según la bolsa), titulares
// de Yahoo Finance por símbolo, y para EE. UU. los 8-K de la SEC con sus puntos (5.02 salida de directivos, 1.01 acuerdo,
// 2.05/2.06 deterioros, 4.02 reexpresión…) y el recuento de formularios 4 (operaciones de directivos).
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { simboloDe } from './precios.mjs';
import { fileURLToPath } from 'node:url';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');
const UA = 'Mozilla/5.0 (compatible; analisis-inversion/1.0)';
const leer = (p, d) => (existsSync(p) ? JSON.parse(readFileSync(p, 'utf8')) : d);
const arg = (n, d = null) => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : d; };
const tiene = (n) => process.argv.includes(n);

// ------------------------------------------------------------------ universo
// Vigilado = calendario + radar. «Amplio» (--amplio) = además todas las analizadas value (simbolos.json) y las growth con
// símbolo conocido: es el universo de los leads, porque una oportunidad suele estar en lo ya analizado que no tenemos.
function universo(todos = false) {
  const simbolos = leer(join(RAIZ, 'verticales/empresa/simbolos.json'), { empresas: {} }).empresas;
  const cal = leer(join(RAIZ, 'escaner/calendario.json'), { fechas: {} }).fechas;
  const radar = leer(join(RAIZ, 'escaner/radar.json'), { valores: [] }).valores;
  const lista = new Map();
  const poner = (clave, nombre, yahoo) => { if (nombre && yahoo && !lista.has(clave)) lista.set(clave, { clave, nombre, yahoo }); };
  const aj = leer(join(RAIZ, 'escaner/noticias.json'), {});
  const excluidas = leer(join(RAIZ, 'escaner/reglas.json'), {}).exclusiones || {};
  const pedidos = todos ? null : arg('--valores')?.split(',').map((s) => s.trim().toUpperCase());
  const amplio = tiene('--amplio') || tiene('--historico');
  // El símbolo de las growth: robustez.json solo lo guarda si se corrió con precios; si no, el de datos.json o ticker +
  // sufijo de la bolsa (la misma regla que robustez-growth.mjs). Sin esto las growth se quedaban fuera (cobertura.mjs, 15-oct).
  const growth = amplio ? leer(join(RAIZ, 'informes-growth/robustez.json'), { resultados: [] }).resultados.map((g) => {
    if (g.simbolo) return g;
    const d = leer(join(RAIZ, 'informes-growth', g.carpeta, 'datos.json'), null);
    return { ...g, simbolo: d ? d.simbolo_yahoo || simboloDe({ ticker: d.ticker, mercado: d.bolsa }) : null };
  }) : [];
  const claves = pedidos || [...Object.keys(cal), ...radar.map((r) => r.clave), ...(amplio ? [...Object.keys(simbolos), ...growth.map((g) => g.ticker)] : [])];
  for (const k of todos ? [...claves, ...Object.keys(aj).filter((x) => !x.startsWith('_'))] : claves) {
    if (!pedidos && !todos && excluidas[k]) continue;
    const s = simbolos[k] || Object.values(simbolos).find((x) => x.yahoo?.toUpperCase() === k);
    const r = radar.find((x) => x.clave === k);
    const g = growth.find((x) => x.ticker === k);
    poner(k, aj[k]?.nombre || s?.nombre || r?.nombre || g?.empresa?.replace(/,? (Inc\.?|AB|plc|SE|NV|N\.V\.|AG|SA|S\.A\.|Ltd\.?|Corp\.?|Corporation|Holdings?|Group)$/i, ''), aj[k]?.yahoo || s?.yahoo || r?.simbolo || g?.simbolo);
  }
  return [...lista.values()];
}

// Idioma de Google Noticias según el sufijo de Yahoo: la prensa local es la que cuenta antes la colocación o el litigio.
const IDIOMAS = { MC: ['es', 'ES'], PA: ['fr', 'FR'], MI: ['it', 'IT'], DE: ['de', 'DE'], AS: ['nl', 'NL'], SW: ['de', 'CH'], ST: ['sv', 'SE'], CO: ['da', 'DK'], T: ['ja', 'JP'], L: ['en', 'GB'], TO: ['en', 'CA'] };
const gnews = (q, [hl, gl], extra = '') =>
  `https://news.google.com/rss/search?q=${encodeURIComponent(`"${q}"${extra}`)}&hl=${hl}&gl=${gl}&ceid=${gl}:${hl}`;

// ------------------------------------------------------------------- lectura
const desentidad = (s) => String(s).replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"').replace(/&apos;|&#0?39;/g, "'").replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d)).replace(/&amp;/g, '&');
const etiqueta = (b, n) => { const m = b.match(new RegExp(`<${n}(?:\\s[^>]*)?>([\\s\\S]*?)</${n}>`, 'i')); return m ? desentidad(m[1]).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : ''; };

async function traer(url) {
  for (let i = 0; i < 3; i++) {
    try {
      const r = await fetch(url, { headers: { 'user-agent': UA, accept: 'application/rss+xml, application/atom+xml, application/xml, */*' }, signal: AbortSignal.timeout(20000) });
      if (r.ok) return await r.text();
      if (r.status === 404) return '';
    } catch { /* reintento */ }
    await new Promise((ok) => setTimeout(ok, 1500 * (i + 1)));
  }
  return '';
}

function piezas(xml, fuente) {
  return [...xml.matchAll(/<(item|entry)\b[\s\S]*?<\/\1>/gi)].map(([b]) => {
    let titular = etiqueta(b, 'title');
    const medio = etiqueta(b, 'source');
    if (medio && titular.endsWith(' - ' + medio)) titular = titular.slice(0, -(medio.length + 3));
    const fecha = new Date(etiqueta(b, 'pubDate') || etiqueta(b, 'updated') || etiqueta(b, 'published'));
    const url = etiqueta(b, 'link') || (b.match(/<link[^>]*href="([^"]+)"/i) || [])[1] || '';
    return { titular: titular.trim(), medio: medio || fuente, fecha: Number.isNaN(+fecha) ? null : fecha, url, resumen: etiqueta(b, 'summary') };
  }).filter((p) => p.titular && p.fecha);
}

// ------------------------------------------------------------- clasificación
// Categorías del punto (c) de la regla 13. «alta» = hecho que puede mover el precio más de un 5 % o romper la tesis:
// obliga a mirar si el veredicto es «retrasa» o «descarta». «media» = va al bloque de noticias. Lo que no casa con nada
// es «baja» (no sale salvo --todas). Expresiones en es/en/it/fr/de, sin acentos y en minúsculas.
const CATEGORIAS = [
  ['colocación', 'alta', /accelerated bookbuild|(private|share|equity) placement|placing of|block (trade|sale)|secondary (offering|sale)|stake sale|sells? (its |a )?stake|colocacion acelerada|coloca(cion)? (un|el|del) \d|collocamento|cessione (della|di una) quota|cession de bloc|platzierung/],
  ['ampliación', 'alta', /capital (increase|raise)|rights issue|share issue|equity offering|convertible|ampliacion de capital|aumento di capitale|augmentation de capital|kapitalerhohung|dilut/],
  ['guía', 'alta', /guidance (cut|lower)|cuts? (its |full.year )?(guidance|outlook|forecast)|lowers? (guidance|outlook|forecast)|profit warning|hit by guidance|rebaja (sus )?previsiones|recorta (sus )?previsiones|taglia (le )?stime|abaisse (ses )?prevision|senkt (die )?prognose|withdraws? guidance/],
  ['directivos fuera', 'alta', /\b(ceo|cfo|chief executive|consejero delegado|amministratore delegato|directeur general)\b.{0,40}\b(steps? down|resign|depart|exit|leav|ousted|dimite|deja|sale de|lascia|quitte|retire)/],
  ['regulador / litigio', 'alta', /investigation|probe|subpoena|lawsuit|class action|sued|antitrust|\bfine[ds]?\b|\bdoj\b|\bftc\b|\bsec (charges|investig)|recall|warning letter|complete response letter|\bcrl\b|investigacion|demanda|multa|sancion|indagine|multa|enquete|amende|klage|ermittlung/],
  ['operación corporativa', 'alta', /takeover|tender offer|merger|to acquire|acquisition of|buyout|\bbid\b|called off|terminat(ed|es) (the )?(deal|merger|agreement)|\bopa\b|fusion|fusione|offerta pubblica|rachat|ubernahme|lbo/],
  ['contabilidad', 'alta', /restate|accounting (issue|irregular)|material weakness|auditor (resign|quit)|short seller|short report|fraud|fraude|frode/],
  ['riesgo IA', 'media', /\b(ai|genai|chatgpt|openai|agentic)\b.{0,50}\b(disrupt|threat|replac|risk|cannibal|commoditi|pressure|fears?)|(disrupt|threat|fears?).{0,30}\b(ai|artificial intelligence)\b|amenaza de la ia|riesgo de la ia|disrupcion.{0,20}\bia\b/],
  ['analistas', 'media', /downgrad|upgrad|price target|target price|cuts? (to|its) (sell|hold|neutral|underweight)|raises? (to|its) (buy|outperform|overweight)|rebaja (la )?recomendacion|eleva (la )?recomendacion|precio objetivo|taglia il target|alza il target|objectif de cours|kursziel|initiat(es|ed) coverage/],
  ['directivos compran', 'media', /insider (buy|purchas)|\b(ceo|cfo|director|evp|chairman|founder)\b.{0,30}\b(buys?|bought|purchases?d?)\b.{0,30}\bshares\b|compra acciones|acquista azioni|achete des actions/],
  ['directivos venden', 'media', /insider (sell|sale)|\b(ceo|cfo|director|evp|chairman|founder)\b.{0,30}\b(sells?|sold|unloads?|dumps?)\b|vende acciones|vende azioni|cede des actions/],
  ['accionista de referencia', 'media', /(raises|cuts|reduces|increases|boosts|trims) (its |their )?stake|activist|13d|participacion (del|de un)|socio de referencia|azionista di riferimento/],
  ['recompra / dividendo', 'baja', /buyback|repurchase|dividend|recompra|dividendo|riacquisto|rachat d'actions/],
  ['resultados', 'media', /(q[1-4]|quarter(ly)?|half.year|full.year|annual|first.half|third.quarter)\b.{0,25}\b(results|earnings)|earnings (call|release|report|beat|miss)|trading update|resultados (del|de los|trimestrales|semestrales)|risultati (del|semestrali|trimestrali)|chiffre d'affaires|quartalszahlen/],
];
// Ruido: listas de bolsa, artículos de «qué saber», cotizaciones e índices. Se miró a mano sobre Zoetis, Rai Way y Puig.
const RUIDO = /shareholder alert|launches investigation|investigation (into|on behalf)|claim depot|investors? (to act|with losses|of upcoming|who lost)|reminds .{0,40}investors|class action (deadline|filed alleging)|law firm|rosen|pomerantz|levi & korsinsky|bronstein|portnoy|sueWallSt|deadline alert|stock price, news, quote|what you should know|outpaces stock market|lags market|stocks? to buy|should you buy|is it (the )?right time|short interest|motley fool|top \d+ |\d+ (stocks|reasons)|stock (sinks|rises|falls) as market|trading day|settore|comparto|indice del settore|technical analysis|chartmill|marketbeat|stock titan.*dividend/i;
const pelar = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

// Tono: si la noticia empuja a favor o en contra. Sirve a los leads (un hecho a favor en una empresa cerca de su límite)
// y al modelo. Las de la categoría lo fijan cuando no hay duda (recorte de guía = negativo).
const POSITIVO = /raises? (its |full.year )?(guidance|outlook|forecast)|guidance (raise|hike|boost)|beats?|tops? (estimates|expectations)|record (revenue|sales|profit|quarter)|upgrad|raises? (to|its) (buy|outperform|overweight)|price target (raised|increased|hike)|raises? (its |the )?price target|insider (buy|purchas)|(ceo|cfo|director|chairman)\b.{0,30}\b(buys?|bought)\b|wins? (a |the )?(contract|order|deal)|awarded|approval|approved|aprobacion|eleva (sus )?previsiones|mejora (la )?recomendacion|eleva (el )?precio objetivo|alza (le )?stime|relève (ses )?objectifs|hebt prognose/;
const NEGATIVO = /cuts? |lowers?|downgrad|miss(es|ed)?\b|warning|probe|investigation|lawsuit|fine[ds]?\b|recall|delay|halt|plunge|slump|tumble|sinks?|falls?|drops?|weak|rebaja|recorta|cae |caida|desploma|taglia|crolla|abaisse|chute|senkt|fallen/;
const TONO_FIJO = { 'guía': 'negativo', 'directivos fuera': 'negativo', 'contabilidad': 'negativo', 'colocación': 'negativo', 'ampliación': 'negativo', 'regulador / litigio': 'negativo', 'riesgo IA': 'negativo' };
function clasificar(p) {
  const t = pelar(p.titular + ' ' + (p.resumen || ''));
  if (RUIDO.test(p.titular + ' ' + p.medio)) return null;
  const pos = POSITIVO.test(t), neg = NEGATIVO.test(t);
  const tono = pos && !neg ? 'positivo' : neg && !pos ? 'negativo' : 'neutro';
  // «guía al alza» va antes que «guía»: una subida de previsiones es un hecho a favor, no de riesgo.
  if (/raises? (its |full.year )?(guidance|outlook|forecast)|guidance (raise|hike|boost)|eleva (sus )?previsiones|alza (le )?stime|releve (ses )?(objectifs|previsions)|hebt (die )?prognose/.test(t)) return { categoria: 'guía al alza', gravedad: 'media', tono: 'positivo' };
  if (/azioni proprie|own shares|treasury shares|acciones propias|actions propres|eigene aktien|share repurchase|buyback/.test(t) && !/insider/.test(t)) return { categoria: 'recompra / dividendo', gravedad: 'baja', tono };
  for (const [cat, grav, re] of CATEGORIAS) if (re.test(t)) return { categoria: cat, gravedad: grav, tono: TONO_FIJO[cat] || tono };
  return { categoria: 'otras', gravedad: 'baja', tono };
}

// ------------------------------------------------------------------ SEC (EE. UU.)
// data.sec.gov/submissions da los 8-K con sus puntos y la lista de formularios 4; el detalle de cada formulario 4 (código
// P = compra en mercado, S = venta; plan 10b5-1) sale del XML en Archives. Sin datos personales en la cabecera.
const UA_SEC = 'analisis-inversion/1.0';
const PUNTOS_8K = { '1.01': ['operación corporativa', 'media'], '1.02': ['operación corporativa', 'alta'], '1.05': ['regulador / litigio', 'alta'], '2.01': ['operación corporativa', 'alta'], '2.02': ['resultados', 'media'], '2.05': ['guía', 'alta'], '2.06': ['contabilidad', 'alta'], '3.01': ['contabilidad', 'alta'], '4.01': ['contabilidad', 'alta'], '4.02': ['contabilidad', 'alta'], '5.02': ['directivos fuera', 'media'] };
const NOMBRE_8K = { '1.01': 'acuerdo relevante', '1.02': 'fin de un acuerdo relevante', '1.05': 'incidente de ciberseguridad', '2.01': 'compra o venta de activos', '2.02': 'resultados', '2.05': 'costes de salida o reestructuración', '2.06': 'deterioro', '3.01': 'aviso de exclusión de cotización', '4.01': 'cambio de auditor', '4.02': 'cuentas anteriores no fiables', '5.02': 'cambios de directivos o consejeros' };
let cikDe = null;
const traerSec = async (url) => { await new Promise((ok) => setTimeout(ok, 150)); try { const r = await fetch(url, { headers: { 'user-agent': UA_SEC, 'accept-encoding': 'gzip, deflate' }, signal: AbortSignal.timeout(20000) }); return r.ok ? await r.text() : ''; } catch { return ''; } };
async function cik(ticker) {
  if (!cikDe) {
    cikDe = {};
    for (const [k, x] of Object.entries(leer(join(RAIZ, 'verticales/empresa/backtest/fechas-resultados-sec.json'), { empresas: {} }).empresas)) if (x.cik) cikDe[k.toUpperCase()] = x.cik;
    try { for (const x of Object.values(JSON.parse(await traerSec('https://www.sec.gov/files/company_tickers.json')))) cikDe[x.ticker.toUpperCase()] ??= String(x.cik_str).padStart(10, '0'); } catch { /* con los de la caché basta */ }
  }
  return cikDe[ticker.toUpperCase()];
}
async function sec(v, desde, hasta = new Date()) {
  if (/\./.test(v.yahoo)) return [];
  const c = await cik(v.yahoo);
  if (!c) return [];
  let r;
  try { r = JSON.parse(await traerSec(`https://data.sec.gov/submissions/CIK${c}.json`)).filings.recent; } catch { return []; }
  const dentro = (f) => new Date(f) >= desde && new Date(f) <= +hasta + 864e5;
  const out = [];
  const f4 = [];
  for (let i = 0; i < r.form.length; i++) {
    if (!dentro(r.filingDate[i])) continue;
    const url = `https://www.sec.gov/Archives/edgar/data/${+c}/${r.accessionNumber[i].replace(/-/g, '')}/${r.primaryDocument[i]}`;
    if (r.form[i] === '8-K') {
      const puntos = String(r.items[i] || '').split(',').map((x) => x.trim()).filter((n) => PUNTOS_8K[n]);
      if (!puntos.length) continue;
      const [cat, grav] = puntos.map((n) => PUNTOS_8K[n]).sort((a) => (a[1] === 'alta' ? -1 : 1))[0];
      out.push({ titular: `8-K: ${puntos.map((n) => `${n} ${NOMBRE_8K[n]}`).join(' · ')}`, medio: 'SEC', fecha: new Date(r.filingDate[i]), url, categoria: cat, gravedad: grav, tono: 'neutro' });
    } else if (r.form[i] === '4') f4.push({ fecha: r.filingDate[i], url: url.replace(/\/xslF345X\d+\//, '/') });
  }
  // Formularios 4: compras en mercado (código P) y ventas (S) de personas distintas; los planes 10b5-1 no cuentan como señal.
  const compras = new Set(), ventas = new Set();
  let leidos = 0;
  for (const x of f4.slice(0, tiene('--historico') ? 8 : 25)) {
    const xml = await traerSec(x.url);
    if (!xml) continue;
    leidos++;
    const quien = etiqueta(xml, 'rptOwnerName');
    const plan = /<aff10b5One>\s*(1|true)/i.test(xml);
    const codigos = [...xml.matchAll(/<transactionCode>([A-Z])<\/transactionCode>/g)].map((m) => m[1]);
    if (codigos.includes('P')) compras.add(quien);
    if (codigos.includes('S') && !plan) ventas.add(quien);
  }
  const ult = f4[0] ? new Date(f4[0].fecha) : null;
  const ver = `https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=${c}&type=4`;
  if (compras.size) out.push({ titular: `Formularios 4: compran en mercado ${compras.size} directivo(s) o consejero(s)`, medio: 'SEC', fecha: ult, url: ver, categoria: 'directivos compran', gravedad: compras.size >= 2 ? 'alta' : 'media', tono: 'positivo', n_personas: compras.size });
  if (ventas.size) out.push({ titular: `Formularios 4: venden en mercado ${ventas.size} directivo(s) o consejero(s) fuera de un plan 10b5-1`, medio: 'SEC', fecha: ult, url: ver, categoria: 'directivos venden', gravedad: ventas.size >= 3 ? 'alta' : 'media', tono: 'negativo', n_personas: ventas.size });
  if (f4.length && !leidos) out.push({ titular: `${f4.length} formulario(s) 4 sin leer el detalle (la SEC no respondió): mirar si son ventas sin plan`, medio: 'SEC', fecha: ult, url: ver, categoria: 'directivos venden', gravedad: 'media', tono: 'neutro' });
  return out;
}

// ----------------------------------------------------------------- agrupar
// Mismo criterio que radar-prensa/agrupar.mjs: tres palabras comunes y Jaccard ≥ 0,28 = mismo asunto.
const PARADAS = new Set('the and for with from that this its are was has have will stock shares share inc corp de la el los las del que una por con para sus'.split(' '));
const claves = (t) => new Set(pelar(t).replace(/[^a-z0-9 ]+/g, ' ').split(/\s+/).filter((p) => p.length >= 4 && !PARADAS.has(p)));
function agrupar(lista) {
  const grupos = [];
  for (const p of lista.sort((a, b) => b.fecha - a.fecha)) {
    const k = claves(p.titular);
    const g = grupos.find((x) => { let c = 0; for (const w of k) if (x.k.has(w)) c++; const u = k.size + x.k.size - c; return c >= 3 && u && c / u >= 0.28; });
    if (g) { g.medios.add(p.medio); if (p.gravedad === 'alta') Object.assign(g, { categoria: p.categoria, gravedad: 'alta' }); } else grupos.push({ ...p, k, medios: new Set([p.medio]) });
  }
  return grupos.map(({ k, medios, resumen, extra, ...g }) => ({ ...g, medios: [...medios] }));
}
const firma = (clave, t) => clave + '|' + [...claves(t)].sort().slice(0, 8).join(' ');

// --------------------------------------------------------------------- main
// Salidas (llevan qué se vigila y su seguimiento): en la carpeta privada, como las del escáner; nunca en el repo.
const P = `${process.env.CARTERA_REAL || '/mnt/project-files/cartera/real'}/escaner/`;
const AJUSTES = leer(join(RAIZ, 'escaner/noticias.json'), {});
const dia = (d) => new Date(d).toISOString().slice(0, 10);
const hoy = dia(Date.now());

// Noticias de un valor entre dos fechas. Hasta 31 días, Google Noticias con «when:»; más, por trimestres con after/before
// (Google devuelve unas 100 piezas por consulta).
async function buscar(v, desde, hasta = new Date()) {
  const idioma = IDIOMAS[v.yahoo.split('.')[1]] || ['en', 'US'];
  const aj = AJUSTES[v.clave] || {};
  const urls = [];
  const consultas = (rango) => {
    for (const id of new Set([idioma.join(), 'en,US'])) urls.push(gnews(v.nombre, id.split(','), rango));
    for (const c of aj.consultas || []) urls.push(gnews(c, idioma, rango).replace(/%22/g, '') + '#extra');
  };
  const reciente = (Date.now() - desde) / 864e5 <= 31 && (Date.now() - hasta) / 864e5 < 1;
  if (reciente) {
    consultas(` when:${Math.ceil((Date.now() - desde) / 864e5)}d`);
    urls.push(`https://feeds.finance.yahoo.com/rss/2.0/headline?s=${encodeURIComponent(v.yahoo)}&region=US&lang=en-US`);
  } else {
    for (let fin = +hasta + 864e5; fin > +desde; fin -= 92 * 864e5) consultas(` after:${dia(Math.max(fin - 92 * 864e5, +desde - 864e5))} before:${dia(fin)}`);
  }
  const brutas = (await Promise.all(urls.map(async (u) => piezas(await traer(u.replace('#extra', '')), u.includes('yahoo') ? 'Yahoo Finance' : 'Google Noticias').map((p) => ({ ...p, extra: u.endsWith('#extra') }))))).flat();
  // Que el nombre esté en el titular: Google trae piezas que solo lo citan de pasada.
  const nombreCorto = pelar(v.nombre.split(/[ ,]/)[0]);
  const fuera = aj.excluir ? new RegExp(aj.excluir) : null;
  const propias = brutas.filter((p) => p.fecha >= desde && p.fecha <= +hasta + 864e5 && (pelar(p.titular).includes(nombreCorto) || p.extra) && !(fuera && fuera.test(pelar(p.titular))))
    .map((p) => { const c = clasificar(p); return c && { ...p, ...c }; }).filter(Boolean);
  return { leidas: brutas.length, grupos: agrupar([...propias, ...(await sec(v, desde, hasta))]) };
}

// --pruebas: hechos conocidos que tienen que salir siempre (como la batería de radar-prensa). Si falla uno, no se integra un cambio.
if (tiene('--pruebas')) {
  const casos = AJUSTES._pruebas || [];
  const todos = universo(true);
  let fallos = 0;
  for (const c of casos) {
    const v = todos.find((x) => x.clave === c.clave);
    const { grupos } = await buscar(v, new Date(c.desde), new Date(c.hasta));
    const re = new RegExp(c.titular, 'i');
    const hit = grupos.find((g) => re.test(pelar(g.titular)) && (!c.gravedad || g.gravedad === c.gravedad));
    if (!hit) fallos++;
    console.log(`${hit ? 'ok   ' : 'FALLA'} ${c.hecho}${hit ? ` → [${hit.gravedad}] ${hit.categoria}: ${hit.titular}` : ''}`);
  }
  console.log(`\n${casos.length - fallos} de ${casos.length} hechos conocidos encontrados.`);
  process.exit(fallos ? 1 : 0);
}

// --seguimiento: qué hizo el precio tras cada aviso alto registrado (1, 5 y 20 sesiones) frente al índice de referencia.
// Es la prueba de si los avisos aportan (registro prospectivo): se mira con el informe semanal.
if (tiene('--seguimiento')) {
  const { serie } = await import('./movimiento.mjs');
  const reg = leer(`${P}noticias-registro.json`, { avisos: [] });
  const indice = leer(join(RAIZ, 'escaner/reglas.json'), {}).indice_referencia?.simbolo || 'IWDA.AS';
  const si = await serie(indice, { anios: 1 });
  const tras = (pts, fecha, n) => { const i = pts.findIndex((p) => p[0] >= fecha); return i < 0 || i + n >= pts.length ? null : pts[i + n][1] / pts[i][1] - 1; };
  for (const a of reg.avisos) {
    const s = await serie(a.simbolo, { anios: 1 });
    if (s.error || si.error) continue;
    for (const n of [1, 5, 20]) {
      const r = tras(s.puntos, a.fecha, n), ri = tras(si.puntos, a.fecha, n);
      if (r !== null && ri !== null) a[`relativa_${n}s`] = Math.round((r - ri) * 1000) / 10;
    }
  }
  writeFileSync(`${P}noticias-registro.json`, JSON.stringify(reg, null, 1) + '\n');
  const med = (xs) => { const o = xs.filter((x) => x != null).sort((a, b) => a - b); return o.length ? `${o[Math.floor(o.length / 2)]} % (${o.length})` : 'sin datos'; };
  const cats = [...new Set(reg.avisos.map((a) => a.categoria))];
  console.log(`Avisos altos registrados: ${reg.avisos.length}. Mediana de la rentabilidad frente al índice (puntos, nº de avisos):`);
  for (const c of ['todas', ...cats]) {
    const xs = reg.avisos.filter((a) => c === 'todas' || a.categoria === c);
    console.log(`- ${c}: 1 sesión ${med(xs.map((a) => a.relativa_1s))} · 5 sesiones ${med(xs.map((a) => a.relativa_5s))} · 20 sesiones ${med(xs.map((a) => a.relativa_20s))}`);
  }
  process.exit(0);
}

// --sectores: los focos de escaner/noticias.json «_sectores» (energía, electricidad, frío industrial…). Sin filtro de nombre:
// sirven para ver qué empresas salen una y otra vez con hechos a favor (lo lee el informe del domingo para proponer análisis).
async function sectores(desde) {
  const out = [];
  for (const sct of AJUSTES._sectores || []) {
    const urls = sct.consultas.map(([q, id]) => gnews(q, id.split(','), ` when:${Math.ceil((Date.now() - desde) / 864e5)}d`).replace(/%22/g, ''));
    const brutas = (await Promise.all(urls.map(async (u) => piezas(await traer(u), 'Google Noticias')))).flat().filter((p) => p.fecha >= desde);
    const grupos = agrupar(brutas.map((p) => { const c = clasificar(p); return c && { ...p, ...c }; }).filter(Boolean));
    out.push({ id: sct.id, nombre: sct.nombre, grupos });
  }
  return out;
}

// Expediente por empresa (y por sector) en la carpeta privada: cada asunto una vez, con fecha, categoría, gravedad y tono.
// Es la materia de los leads (herramientas/leads.mjs) y del modelo (herramientas/noticias-modelo.mjs).
function archivar(id, cab, grupos, extra = {}) {
  const ruta = `${P}expedientes/${id}.json`;
  const e = leer(ruta, { ...cab, noticias: [] });
  const ya = new Set(e.noticias.map((n) => n.id));
  for (const g of grupos) {
    const fid = firma(id, g.titular);
    if (ya.has(fid)) continue;
    ya.add(fid);
    e.noticias.push({ id: fid, fecha: dia(g.fecha), visto: hoy, categoria: g.categoria, gravedad: g.gravedad, tono: g.tono || 'neutro', titular: g.titular, medios: g.medios, url: g.url, ...(g.n_personas ? { n_personas: g.n_personas } : {}) });
  }
  const corte = dia(Date.now() - 400 * 864e5);
  e.noticias = e.noticias.filter((n) => n.fecha >= corte).sort((a, b) => (a.fecha < b.fecha ? 1 : -1));
  Object.assign(e, extra, { actualizado: hoy });
  writeFileSync(ruta, JSON.stringify(e, null, 1) + '\n');
}

const enParalelo = async (lista, n, fn) => { const out = []; let i = 0; await Promise.all(Array.from({ length: n }, async () => { while (i < lista.length) { const k = i++; out[k] = await fn(lista[k]); } })); return out; };
try { mkdirSync(`${P}expedientes`, { recursive: true }); } catch { /* sin carpeta privada: solo lectura */ }

// --historico: 12 meses hacia atrás para cada valor del universo amplio, a los expedientes (no a los avisos). Para que el
// modelo y los leads tengan pasado desde el primer día. Se puede cortar y retomar: salta los que ya lo tienen.
if (tiene('--historico')) {
  const valores = universo();
  let hechos = 0;
  await enParalelo(valores.filter((v) => !leer(`${P}expedientes/${v.clave}.json`, {}).historico), 3, async (v) => {
    const { grupos } = await buscar(v, new Date(Date.now() - 372 * 864e5));
    archivar(v.clave, { clave: v.clave, nombre: v.nombre, simbolo: v.yahoo }, grupos, { historico: hoy });
    console.log(`${++hechos}/${valores.length} ${v.nombre}: ${grupos.length} asuntos`);
    await new Promise((ok) => setTimeout(ok, 2000));
  });
  process.exit(0);
}

const meses = +arg('--meses', 0);
const dias = meses ? meses * 31 : +arg('--dias', 3);
const desde = new Date(Date.now() - dias * 864e5);
const valores = universo();
const escribir = tiene('--escribir') && !meses;
const vistas = leer(`${P}noticias-vistas.json`, { nota: 'Asuntos ya avisados por herramientas/noticias.mjs (para no repetirlos). Lo escribe la herramienta.', firmas: {} });
const registro = leer(`${P}noticias-registro.json`, { nota: 'Avisos de gravedad alta de herramientas/noticias.mjs, para medir qué hace el precio después (--seguimiento). Lo escribe la herramienta.', avisos: [] });
const resultado = [];
await enParalelo(valores, 4, async (v) => {
  const { leidas, grupos } = await buscar(v, desde);
  if (escribir) archivar(v.clave, { clave: v.clave, nombre: v.nombre, simbolo: v.yahoo }, grupos);
  const nuevas = grupos.filter((g) => (tiene('--todas') || g.gravedad !== 'baja') && (meses || !vistas.firmas[firma(v.clave, g.titular)]));
  if (nuevas.length) resultado.push({ clave: v.clave, nombre: v.nombre, simbolo: v.yahoo, piezas_leidas: leidas, noticias: nuevas.sort((a, b) => (a.gravedad === b.gravedad ? b.fecha - a.fecha : a.gravedad === 'alta' ? -1 : 1)) });
  if (escribir) for (const g of nuevas) {
    vistas.firmas[firma(v.clave, g.titular)] = hoy;
    if (g.gravedad === 'alta') registro.avisos.push({ fecha: hoy, fecha_noticia: dia(g.fecha), clave: v.clave, simbolo: v.yahoo, categoria: g.categoria, tono: g.tono, titular: g.titular, url: g.url });
  }
});
resultado.sort((a, b) => a.nombre.localeCompare(b.nombre));
if (escribir && !tiene('--valores')) for (const sct of await sectores(desde)) archivar(`sector-${sct.id}`, { sector: sct.id, nombre: sct.nombre }, sct.grupos);

const altas = resultado.flatMap((r) => r.noticias.filter((n) => n.gravedad === 'alta').map((n) => ({ ...n, nombre: r.nombre })));
const lineas = [`Noticias de ${valores.length} valores, últimos ${dias} días: ${altas.length} de gravedad alta (para el veredicto de la regla 13 en las órdenes abiertas; no van al mensaje).`];
for (const r of resultado) {
  lineas.push('', `## ${r.nombre} (${r.simbolo})`);
  for (const n of r.noticias) lineas.push(`- [${n.gravedad}, ${n.tono}] ${n.categoria} · ${dia(n.fecha)} · ${n.titular} (${n.medios.join(', ')})`);
}
if (escribir) {
  writeFileSync(`${P}noticias-ultimo.json`, JSON.stringify({ fecha: hoy, dias, valores: valores.length, resultado }, null, 1) + '\n');
  writeFileSync(`${P}noticias-ultimo.md`, lineas.join('\n') + '\n');
  writeFileSync(`${P}noticias-vistas.json`, JSON.stringify(vistas, null, 1) + '\n');
  writeFileSync(`${P}noticias-registro.json`, JSON.stringify(registro, null, 1) + '\n');
}
console.log(tiene('--json') ? JSON.stringify({ fecha: hoy, dias, resultado }, null, 1) : lineas.join('\n'));
