// Descarga documentos y deja al lado su texto, listo para buscar con grep en vez de leerlo entero.
//   node herramientas/descargar.mjs --dir informes/<carpeta>/notas/docs nombre1 url1 [nombre2 url2 …]
// - HTML (webs, documentos de EDGAR): guarda .html y .txt (tablas con « | » entre celdas).
// - PDF: guarda .pdf y .txt con `pdftotext -layout` (una marca «=== página N ===» por página),
//   para citar la página y leer solo la nota que hace falta.
// - Otros (xlsx, json, csv): los guarda tal cual.
// Si un PDF no tiene texto (escaneado) o sale ilegible (fuentes japonesas sin mapa), lo avisa: entonces
// construccion/pdf-a-png.ps1 y leer solo las páginas necesarias como imagen. Los PDF llevan además un
// .tabla.txt (`pdftotext -table`), que mantiene las columnas de las tablas financieras.
//
//   node herramientas/descargar.mjs --lista URL [texto]   → enlaces a PDF de una página (filtrados por texto)

import { writeFileSync, mkdirSync, readFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';

const argv = process.argv.slice(2);
if (argv[0] === '--lista') {
  const url = argv[1], filtro = (argv[2] || '').toLowerCase();
  const r = await fetch(url, { headers: cabeceras(url), redirect: 'follow', signal: AbortSignal.timeout(60000) });
  const h = await r.text();
  const enlaces = new Map();
  for (const m of h.matchAll(/<a\b[^>]*href=["']([^"'#]+)["'][^>]*>([\s\S]*?)<\/a>/gi)) {
    let u; try { u = new URL(m[1], r.url || url).href; } catch { continue; }
    const t = m[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    if (/\.pdf(\?|$)|\/pdf\b|download/i.test(u) && (!filtro || (u + ' ' + t).toLowerCase().includes(filtro))) enlaces.set(u, t);
  }
  for (const [u, t] of enlaces) console.log(`${t.slice(0, 90)} | ${u}`);
  if (!enlaces.size) console.log(`Sin enlaces a PDF${h.length < 3000 ? ' (página casi vacía: ¿antibot o contenido cargado por JavaScript? prueba con el navegador)' : ''}.`);
  process.exit(0);
}
const i = argv.indexOf('--dir');
if (i < 0 || argv.length < i + 4) { console.error('Uso: node herramientas/descargar.mjs --dir carpeta nombre url [nombre url …]'); process.exit(1); }
const dir = argv[i + 1];
const pares = argv.filter((_, k) => k !== i && k !== i + 1);
mkdirSync(dir, { recursive: true });

// EDGAR exige un User-Agent con nombre de aplicación; el resto de webs, uno de navegador.
function cabeceras(url) { return (/sec\.gov/.test(url)
  ? { 'User-Agent': 'analisis-inversion (uso personal, investigacion)', 'Accept-Encoding': 'gzip, deflate' }
  : { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36', 'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8' }); }

export function htmlATexto(h) {
  return h.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '').replace(/<ix:header[\s\S]*?<\/ix:header>/gi, '')
    .replace(/<\/(p|div|tr|li|h\d|table|section)>/gi, '\n').replace(/<br\s*\/?>/gi, '\n').replace(/<\/t[dh]>/gi, ' | ')
    .replace(/<[^>]+>/g, '').replace(/&nbsp;|&#160;|&#xa0;/gi, ' ').replace(/&amp;/g, '&').replace(/&#8217;|&rsquo;/g, "'")
    .replace(/&#8220;|&#8221;|&ldquo;|&rdquo;/g, '"').replace(/&#8212;|&#8211;|&mdash;|&ndash;/g, '-').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&euro;|&#8364;|&#x20ac;/gi, '€').replace(/&pound;|&#163;/gi, '£').replace(/&yen;|&#165;/gi, '¥').replace(/&#36;/g, '$').replace(/&#(\d+);/g, (_, c) => String.fromCodePoint(+c))
    .replace(/[ \t]+/g, ' ').replace(/( \| )+\n/g, '\n').replace(/\n\s*\n+/g, '\n');
}

for (let k = 0; k < pares.length; k += 2) {
  const [nombre, url] = [pares[k], pares[k + 1]];
  try {
    const r = await fetch(url, { headers: cabeceras(url), redirect: 'follow', signal: AbortSignal.timeout(+(process.env.TIEMPO_DESCARGA || 60) * 1000) });
    const tipo = r.headers.get('content-type') || '';
    const buf = Buffer.from(await r.arrayBuffer());
    if (!r.ok) { console.log(`${nombre}: HTTP ${r.status}`); continue; }
    // Manifiesto: de dónde viene cada archivo (para citar el documento, no la página que lo enlaza).
    const final = r.url || url;
    const manifiesto = join(dir, '_manifest.json');
    const m = existsSync(manifiesto) ? JSON.parse(readFileSync(manifiesto, 'utf8')) : {};
    m[nombre] = { url, url_final: final, fecha_descarga: new Date().toISOString().slice(0, 10), tipo };
    writeFileSync(manifiesto, JSON.stringify(m, null, 2));
    if (final !== url) {
      const ruta = (u) => { try { return new URL(u).pathname.replace(/\/$/, ''); } catch { return u; } };
      const aPortada = ruta(final).split('/').filter(Boolean).length <= 1 && ruta(url).split('/').filter(Boolean).length > 1;
      console.log(`${nombre}: redirigido a ${final}${aPortada ? ' — PARECE LA PORTADA: el documento ya no está en esa dirección' : ''}`);
    }
    if (/pdf/.test(tipo) || buf.subarray(0, 5).toString() === '%PDF-') {
      const pdf = join(dir, `${nombre}.pdf`), txt = join(dir, `${nombre}.txt`);
      writeFileSync(pdf, buf);
      // stderr fuera: algunas fuentes llenan la salida de «Unknown font tag» sin que pase nada.
      try { execFileSync('pdftotext', ['-layout', '-enc', 'UTF-8', pdf, txt], { stdio: ['ignore', 'ignore', 'ignore'] }); } catch { console.log(`${nombre}: PDF guardado, pdftotext no disponible`); continue; }
      // △ y ▲ son el signo negativo en los informes japoneses: pdftotext a veces los pierde o los deja sueltos.
      const marcar = (t) => t.split('\f').map((p, n) => `=== página ${n + 1} ===\n${p.replace(/[△▲]\s?(?=[\d(])/g, '−')}`).join('\n');
      const paginas = readFileSync(txt, 'utf8').split('\f');
      writeFileSync(txt, marcar(paginas.join('\f')));
      try { const tt = join(dir, `${nombre}.tabla.txt`); execFileSync('pdftotext', ['-table', '-enc', 'UTF-8', pdf, tt], { stdio: ['ignore', 'ignore', 'ignore'] }); writeFileSync(tt, marcar(readFileSync(tt, 'utf8'))); } catch { /* -table no disponible */ }
      const todo = paginas.join('');
      const raros = (todo.match(/[\uE000-\uF8FF\uFFFD]|[\u0000-\u0008\u000E-\u001F]/g) || []).length;
      const ilegible = todo.length > 500 && raros / todo.length > 0.02;
      const letras = paginas.join('').replace(/\s/g, '').length;
      console.log(`${nombre}: PDF, ${paginas.length} páginas, ${letras} caracteres${letras < 200 * paginas.length ? ' — POCO TEXTO: ¿escaneado? usa pdf-a-png solo en las páginas necesarias' : ''}${ilegible ? ' — TEXTO ILEGIBLE (fuentes sin mapa de caracteres, habitual en PDF japoneses): busca la versión en inglés o usa pdf-a-png en las páginas necesarias' : ''}; tablas en ${nombre}.tabla.txt`);
    } else if (/spreadsheetml|officedocument|ms-excel|zip/.test(tipo) || buf.subarray(0, 2).toString() === 'PK') {
      const ext = /spreadsheetml|excel/.test(tipo) ? 'xlsx' : /wordprocessingml/.test(tipo) ? 'docx' : /presentationml/.test(tipo) ? 'pptx' : ((final.match(/\.(xlsx|xlsm|docx|pptx|zip)(\?|$)/i) || [])[1] || 'zip').toLowerCase();
      writeFileSync(join(dir, `${nombre}.${ext}`), buf);
      console.log(`${nombre}: ${ext} guardado (${buf.length} bytes)`);
    } else if (/xml/.test(tipo) && !/html/.test(tipo) || /^\s*<\?xml/.test(buf.subarray(0, 100).toString()) && !/<html/i.test(buf.subarray(0, 2000).toString())) {
      writeFileSync(join(dir, `${nombre}.xml`), buf);
      console.log(`${nombre}: XML guardado (${buf.length} bytes); los datos van en atributos, léelo tal cual`);
    } else if (/html/.test(tipo) || /^\s*</.test(buf.subarray(0, 200).toString())) {
      const h = buf.toString('utf8');
      writeFileSync(join(dir, `${nombre}.html`), h);
      const t = htmlATexto(h);
      writeFileSync(join(dir, `${nombre}.txt`), t);
      console.log(`${nombre}: HTML, ${t.length} caracteres de texto${t.length < 3000 && /captcha|are you a robot|access denied|radware|verify you are human/i.test(t) ? ' — PARECE UN BLOQUEO ANTIBOT' : ''}`);
    } else {
      const ext = (tipo.match(/json|csv|spreadsheetml|excel/) || ['bin'])[0].replace('spreadsheetml', 'xlsx').replace('excel', 'xls');
      writeFileSync(join(dir, `${nombre}.${ext}`), buf);
      console.log(`${nombre}: ${tipo || 'binario'} guardado (${buf.length} bytes)`);
    }
  } catch (e) { console.log(`${nombre}: ERROR ${e.message}`); }
}
