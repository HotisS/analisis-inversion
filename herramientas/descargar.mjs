// Descarga documentos y deja al lado su texto, listo para buscar con grep en vez de leerlo entero.
//   node herramientas/descargar.mjs --dir informes/<carpeta>/notas/docs nombre1 url1 [nombre2 url2 …]
// - HTML (webs, documentos de EDGAR): guarda .html y .txt (tablas con « | » entre celdas).
// - PDF: guarda .pdf y .txt con `pdftotext -layout` (una marca «=== página N ===» por página),
//   para citar la página y leer solo la nota que hace falta.
// - Otros (xlsx, json, csv): los guarda tal cual.
// Si un PDF no tiene texto (escaneado), lo avisa: entonces construccion/pdf-a-png.ps1 y leer solo
// las páginas necesarias como imagen.

import { writeFileSync, mkdirSync, readFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';

const argv = process.argv.slice(2);
const i = argv.indexOf('--dir');
if (i < 0 || argv.length < i + 4) { console.error('Uso: node herramientas/descargar.mjs --dir carpeta nombre url [nombre url …]'); process.exit(1); }
const dir = argv[i + 1];
const pares = argv.filter((_, k) => k !== i && k !== i + 1);
mkdirSync(dir, { recursive: true });

// EDGAR exige un User-Agent con nombre de aplicación; el resto de webs, uno de navegador.
const cabeceras = (url) => (/sec\.gov/.test(url)
  ? { 'User-Agent': 'analisis-inversion (uso personal, investigacion)', 'Accept-Encoding': 'gzip, deflate' }
  : { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36', 'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8' });

export function htmlATexto(h) {
  return h.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '').replace(/<ix:header[\s\S]*?<\/ix:header>/gi, '')
    .replace(/<\/(p|div|tr|li|h\d|table|section)>/gi, '\n').replace(/<br\s*\/?>/gi, '\n').replace(/<\/t[dh]>/gi, ' | ')
    .replace(/<[^>]+>/g, '').replace(/&nbsp;|&#160;|&#xa0;/gi, ' ').replace(/&amp;/g, '&').replace(/&#8217;|&rsquo;/g, "'")
    .replace(/&#8220;|&#8221;|&ldquo;|&rdquo;/g, '"').replace(/&#8212;|&#8211;|&mdash;|&ndash;/g, '-').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#\d+;/g, ' ')
    .replace(/[ \t]+/g, ' ').replace(/( \| )+\n/g, '\n').replace(/\n\s*\n+/g, '\n');
}

for (let k = 0; k < pares.length; k += 2) {
  const [nombre, url] = [pares[k], pares[k + 1]];
  try {
    const r = await fetch(url, { headers: cabeceras(url), redirect: 'follow' });
    const tipo = r.headers.get('content-type') || '';
    const buf = Buffer.from(await r.arrayBuffer());
    if (!r.ok) { console.log(`${nombre}: HTTP ${r.status}`); continue; }
    if (/pdf/.test(tipo) || buf.subarray(0, 5).toString() === '%PDF-') {
      const pdf = join(dir, `${nombre}.pdf`), txt = join(dir, `${nombre}.txt`);
      writeFileSync(pdf, buf);
      try { execFileSync('pdftotext', ['-layout', pdf, txt]); } catch { console.log(`${nombre}: PDF guardado, pdftotext no disponible`); continue; }
      const paginas = readFileSync(txt, 'utf8').split('\f');
      writeFileSync(txt, paginas.map((p, n) => `=== página ${n + 1} ===\n${p}`).join('\n'));
      const letras = paginas.join('').replace(/\s/g, '').length;
      console.log(`${nombre}: PDF, ${paginas.length} páginas, ${letras} caracteres${letras < 200 * paginas.length ? ' — POCO TEXTO: ¿escaneado? usa pdf-a-png solo en las páginas necesarias' : ''}`);
    } else if (/xml/.test(tipo) && !/html/.test(tipo) || /^\s*<\?xml/.test(buf.subarray(0, 100).toString()) && !/<html/i.test(buf.subarray(0, 2000).toString())) {
      writeFileSync(join(dir, `${nombre}.xml`), buf);
      console.log(`${nombre}: XML guardado (${buf.length} bytes); los datos van en atributos, léelo tal cual`);
    } else if (/html/.test(tipo) || /^\s*</.test(buf.subarray(0, 200).toString())) {
      const h = buf.toString('utf8');
      writeFileSync(join(dir, `${nombre}.html`), h);
      const t = htmlATexto(h);
      writeFileSync(join(dir, `${nombre}.txt`), t);
      console.log(`${nombre}: HTML, ${t.length} caracteres de texto${/captcha|are you a robot|access denied|radware/i.test(h) ? ' — PARECE UN BLOQUEO ANTIBOT' : ''}`);
    } else {
      const ext = (tipo.match(/json|csv|spreadsheetml|excel/) || ['bin'])[0].replace('spreadsheetml', 'xlsx').replace('excel', 'xls');
      writeFileSync(join(dir, `${nombre}.${ext}`), buf);
      console.log(`${nombre}: ${tipo || 'binario'} guardado (${buf.length} bytes)`);
    }
  } catch (e) { console.log(`${nombre}: ERROR ${e.message}`); }
}
