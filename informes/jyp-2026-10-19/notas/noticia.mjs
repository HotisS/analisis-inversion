// Descarga noticias de Naver News (n.news.naver.com) y guarda el texto en docs/news/<oid>_<aid>.txt.
// Uso: node noticia.mjs 015_0005343959 018_0006391140 ...   (imprime título, fecha y las primeras líneas)
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'docs', 'news');
fs.mkdirSync(dir, { recursive: true });
const limpiar = (s) => s.replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/[ \t]+/g, ' ').replace(/\n\s*\n+/g, '\n').trim();
const largo = Number(process.env.LARGO || 600);
for (const id of process.argv.slice(2)) {
  const [oid, aid] = id.split('_');
  const url = `https://n.news.naver.com/mnews/article/${oid}/${aid}`;
  let html;
  try { html = execFileSync('curl', ['-sS', '--retry', '3', '-m', '40', '-A', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36', url], { maxBuffer: 50 * 1024 * 1024 }).toString('utf8'); }
  catch (e) { console.log('ERROR', id); continue; }
  const titulo = limpiar((html.match(/<h2[^>]*id="title_area"[^>]*>([\s\S]*?)<\/h2>/) || [, ''])[1]);
  const fecha = (html.match(/data-date-time="([^"]+)"/) || [, ''])[1];
  const medio = (html.match(/<meta property="og:article:author" content="([^"]*)"/) || [, ''])[1];
  const cuerpo = limpiar((html.match(/<article[^>]*id="dic_area"[^>]*>([\s\S]*?)<\/article>/) || [, ''])[1]);
  fs.writeFileSync(path.join(dir, `${id}.txt`), `${titulo}\n${medio} · ${fecha}\n${url}\n\n${cuerpo}\n`);
  console.log(`\n### ${id} · ${fecha} · ${medio}\n${titulo}\n${cuerpo.slice(0, largo)}`);
}
