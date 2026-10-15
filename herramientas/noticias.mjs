// Rastreador de noticias de lo que se vigila (prototipo, 15-oct-2026; idea tomada de radar-prensa: canales RSS en un
// JSON, filtro por reglas, agrupar piezas que cuentan lo mismo, memoria para no repetir). Complementa a la regla 13 de
// METODO-VIGENTE.md (punto c: noticias que pueden mover el precio) y a la vigilancia de las 9:25, que hoy busca a mano.
// Da AVISOS para que el análisis ponga el veredicto (no cambia / retrasa / descarta); nunca señales ni órdenes.
//
//   NODE_USE_ENV_PROXY=1 node herramientas/noticias.mjs                 lo vigilado (escaner/calendario.json + radar.json), últimos 3 días
//   … --valores ZTS,PUIG,RWAY        solo esos (claves de simbolos.json o de radar.json)
//   … --dias 7                       otra ventana
//   … --meses 12 --valores PUIG      12 meses hacia atrás por trimestres (para el bloque de la regla 13 de una orden)
//   … --todas                        enseña también las de gravedad baja
//   … --escribir                     guarda escaner/noticias-ultimo.json y la memoria escaner/noticias-vistas.json (solo lo nuevo sale)
//   … --json                         salida JSON
//
// Fuentes (sin claves ni datos personales en las cabeceras): Google Noticias por nombre (idioma según la bolsa), titulares
// de Yahoo Finance por símbolo, y para EE. UU. los 8-K de la SEC con sus puntos (5.02 salida de directivos, 1.01 acuerdo,
// 2.05/2.06 deterioros, 4.02 reexpresión…) y el recuento de formularios 4 (operaciones de directivos).
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');
const UA = 'Mozilla/5.0 (compatible; analisis-inversion/1.0)';
const leer = (p, d) => (existsSync(p) ? JSON.parse(readFileSync(p, 'utf8')) : d);
const arg = (n, d = null) => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : d; };
const tiene = (n) => process.argv.includes(n);

// ------------------------------------------------------------------ universo
function universo() {
  const simbolos = leer(join(RAIZ, 'verticales/empresa/simbolos.json'), { empresas: {} }).empresas;
  const cal = leer(join(RAIZ, 'escaner/calendario.json'), { fechas: {} }).fechas;
  const radar = leer(join(RAIZ, 'escaner/radar.json'), { valores: [] }).valores;
  const lista = new Map();
  const poner = (clave, nombre, yahoo) => { if (nombre && yahoo && !lista.has(clave)) lista.set(clave, { clave, nombre, yahoo }); };
  const aj = leer(join(RAIZ, 'escaner/noticias.json'), {});
  const excluidas = leer(join(RAIZ, 'escaner/reglas.json'), {}).exclusiones || {};
  const pedidos = arg('--valores')?.split(',').map((s) => s.trim().toUpperCase());
  const claves = pedidos || [...Object.keys(cal), ...radar.map((r) => r.clave)];
  for (const k of claves) {
    if (!pedidos && excluidas[k]) continue;
    const s = simbolos[k] || Object.values(simbolos).find((x) => x.yahoo?.toUpperCase() === k);
    const r = radar.find((x) => x.clave === k);
    poner(k, aj[k]?.nombre || s?.nombre || r?.nombre, aj[k]?.yahoo || s?.yahoo || r?.simbolo);
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
  ['directivos compran/venden', 'media', /insider (sell|sale|buy|purchas)|\b(ceo|cfo|director|evp|chairman)\b.{0,30}\b(sells?|sold|buys?|bought|acquires?)\b.{0,30}\bshares\b|vende acciones|compra acciones/],
  ['accionista de referencia', 'media', /(raises|cuts|reduces|increases|boosts|trims) (its |their )?stake|activist|13d|participacion (del|de un)|socio de referencia|azionista di riferimento/],
  ['recompra / dividendo', 'baja', /buyback|repurchase|dividend|recompra|dividendo|riacquisto|rachat d'actions/],
  ['resultados', 'media', /(q[1-4]|quarter(ly)?|half.year|full.year|annual|first.half|third.quarter)\b.{0,25}\b(results|earnings)|earnings (call|release|report|beat|miss)|trading update|resultados (del|de los|trimestrales|semestrales)|risultati (del|semestrali|trimestrali)|chiffre d'affaires|quartalszahlen/],
];
// Ruido: listas de bolsa, artículos de «qué saber», cotizaciones e índices. Se miró a mano sobre Zoetis, Rai Way y Puig.
const RUIDO = /shareholder alert|investors? (to act|with losses|of upcoming|who lost)|reminds .{0,40}investors|class action (deadline|filed alleging)|law firm|rosen|pomerantz|levi & korsinsky|bronstein|portnoy|sueWallSt|deadline alert|stock price, news, quote|what you should know|outpaces stock market|lags market|stocks? to buy|should you buy|is it (the )?right time|short interest|motley fool|top \d+ |\d+ (stocks|reasons)|stock (sinks|rises|falls) as market|trading day|settore|comparto|indice del settore|technical analysis|chartmill|marketbeat|stock titan.*dividend/i;
const pelar = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

function clasificar(p) {
  const t = pelar(p.titular + ' ' + (p.resumen || ''));
  if (RUIDO.test(p.titular + ' ' + p.medio)) return null;
  for (const [cat, grav, re] of CATEGORIAS) if (re.test(t)) return { categoria: cat, gravedad: grav };
  return { categoria: 'otras', gravedad: 'baja' };
}

// ------------------------------------------------------------------ SEC (EE. UU.)
const PUNTOS_8K = { '1.01': ['operación corporativa', 'media'], '1.02': ['operación corporativa', 'alta'], '1.05': ['regulador / litigio', 'alta'], '2.01': ['operación corporativa', 'alta'], '2.02': ['resultados', 'media'], '2.05': ['guía', 'alta'], '2.06': ['contabilidad', 'alta'], '3.01': ['contabilidad', 'alta'], '4.01': ['contabilidad', 'alta'], '4.02': ['contabilidad', 'alta'], '5.02': ['directivos fuera', 'media'] };
let cikDe = null;
async function sec(v, desde) {
  if (/\./.test(v.yahoo)) return [];
  if (!cikDe) {
    cikDe = {};
    try { for (const x of Object.values(JSON.parse(await traer('https://www.sec.gov/files/company_tickers.json')))) cikDe[x.ticker.toUpperCase()] = String(x.cik_str).padStart(10, '0'); } catch { /* sin SEC */ }
  }
  const cik = cikDe[v.yahoo.toUpperCase()];
  if (!cik) return [];
  const base = `https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=${cik}&owner=include&count=40&output=atom&type=`;
  const out = [];
  for (const e of [...(await traer(base + '8-K')).matchAll(/<entry>[\s\S]*?<\/entry>/g)].map((m) => m[0])) {
    const fecha = new Date(etiqueta(e, 'filing-date')); if (fecha < desde) continue;
    const puntos = [...etiqueta(e, 'summary').matchAll(/Item (\d\.\d\d): ([^<]+?)(?=Item \d|$)/g)].map((m) => [m[1], m[2].trim()]);
    const graves = puntos.filter(([n]) => PUNTOS_8K[n]);
    if (!graves.length) continue;
    const [cat, grav] = graves.map(([n]) => PUNTOS_8K[n]).sort((a, b) => (a[1] === 'alta' ? -1 : 1))[0];
    out.push({ titular: `8-K: ${graves.map(([n, d]) => `${n} ${d.split(';')[0]}`).join(' · ')}`, medio: 'SEC', fecha, url: (e.match(/<link href="([^"]+)"/) || [])[1], categoria: cat, gravedad: grav });
  }
  const f4 = [...(await traer(base + '4')).matchAll(/<filing-date>([^<]+)/g)].filter((m) => new Date(m[1]) >= desde).length;
  if (f4) out.push({ titular: `${f4} formulario(s) 4 de directivos en la ventana: mirar si son ventas sin plan 10b5-1 (regla 13: «descarta» si vende quien mejor conoce la empresa)`, medio: 'SEC', fecha: new Date(), url: `https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=${cik}&type=4`, categoria: 'directivos compran/venden', gravedad: f4 >= 5 ? 'alta' : 'media' });
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
  return grupos.map(({ k, medios, resumen, ...g }) => ({ ...g, medios: [...medios] }));
}
const firma = (clave, t) => clave + '|' + [...claves(t)].sort().slice(0, 8).join(' ');

// --------------------------------------------------------------------- main
const meses = +arg('--meses', 0);
const dias = meses ? meses * 31 : +arg('--dias', 3);
const desde = new Date(Date.now() - dias * 864e5);
const valores = universo();
const MEMORIA = join(RAIZ, 'escaner/noticias-vistas.json');
const vistas = leer(MEMORIA, { nota: 'Asuntos ya avisados por herramientas/noticias.mjs (para no repetirlos). Lo escribe la herramienta.', firmas: {} });
const AJUSTES = leer(join(RAIZ, 'escaner/noticias.json'), {});
const resultado = [];
for (const v of valores) {
  const sufijo = v.yahoo.split('.')[1];
  const idioma = IDIOMAS[sufijo] || ['en', 'US'];
  const aj = AJUSTES[v.clave] || {};
  const urls = [];
  if (meses) {
    // Google Noticias devuelve ~100 piezas por consulta: por trimestres para cubrir el año entero.
    for (let q = 0; q < Math.ceil(meses / 3); q++) {
      const fin = new Date(Date.now() - q * 92 * 864e5), ini = new Date(fin - 92 * 864e5);
      const rango = ` after:${ini.toISOString().slice(0, 10)} before:${fin.toISOString().slice(0, 10)}`;
      for (const id of new Set([idioma.join(), 'en,US'])) urls.push(gnews(v.nombre, id.split(','), rango));
      for (const c of aj.consultas || []) urls.push(gnews(c, idioma, rango).replace(/%22/g, ''));
    }
  } else {
    urls.push(gnews(v.nombre, idioma, ` when:${dias}d`));
    if (idioma[0] !== 'en') urls.push(gnews(v.nombre, ['en', 'US'], ` when:${dias}d`));
    for (const c of aj.consultas || []) urls.push(gnews(c, idioma, ` when:${dias}d`).replace(/%22/g, ''));
    urls.push(`https://feeds.finance.yahoo.com/rss/2.0/headline?s=${encodeURIComponent(v.yahoo)}&region=US&lang=en-US`);
  }
  const brutas = (await Promise.all(urls.map(async (u) => piezas(await traer(u), u.includes('yahoo') ? 'Yahoo Finance' : 'Google Noticias')))).flat();
  // Que el nombre esté en el titular: Google trae piezas que solo lo citan de pasada.
  const nombreCorto = pelar(v.nombre.split(/[ ,]/)[0]);
  const fuera = aj.excluir ? new RegExp(aj.excluir) : null;
  const propias = brutas.filter((p) => p.fecha >= desde && (pelar(p.titular).includes(nombreCorto) || aj.consultas) && !(fuera && fuera.test(pelar(p.titular))))
    .map((p) => { const c = clasificar(p); return c && { ...p, ...c }; }).filter(Boolean);
  const todas = agrupar([...propias, ...(await sec(v, desde))]);
  const nuevas = todas.filter((g) => (tiene('--todas') || g.gravedad !== 'baja') && (meses || !vistas.firmas[firma(v.clave, g.titular)]));
  if (nuevas.length) resultado.push({ clave: v.clave, nombre: v.nombre, simbolo: v.yahoo, piezas_leidas: brutas.length, noticias: nuevas.sort((a, b) => (a.gravedad === b.gravedad ? b.fecha - a.fecha : a.gravedad === 'alta' ? -1 : 1)) });
  if (tiene('--escribir') && !meses) for (const g of nuevas) vistas.firmas[firma(v.clave, g.titular)] = new Date().toISOString().slice(0, 10);
}

const hoy = new Date().toISOString().slice(0, 10);
if (tiene('--escribir')) {
  writeFileSync(join(RAIZ, 'escaner/noticias-ultimo.json'), JSON.stringify({ fecha: hoy, dias, valores: valores.length, resultado }, null, 1) + '\n');
  if (!meses) writeFileSync(MEMORIA, JSON.stringify(vistas, null, 1) + '\n');
}
if (tiene('--json')) console.log(JSON.stringify({ fecha: hoy, dias, resultado }, null, 1));
else {
  const altas = resultado.flatMap((r) => r.noticias.filter((n) => n.gravedad === 'alta').map((n) => ({ ...n, nombre: r.nombre })));
  console.log(`Noticias de ${valores.length} valores, últimos ${dias} días: ${altas.length} de gravedad alta (mirar veredicto de la regla 13).`);
  for (const r of resultado) {
    console.log(`\n## ${r.nombre} (${r.simbolo})`);
    for (const n of r.noticias) console.log(`- [${n.gravedad}] ${n.categoria} · ${n.fecha.toISOString().slice(0, 10)} · ${n.titular} (${n.medios.join(', ')})`);
  }
}
