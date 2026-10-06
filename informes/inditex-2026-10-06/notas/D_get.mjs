// Descarga páginas para el agente D y las guarda en docs/D_<nombre>.html y .txt. Uso: node D_get.mjs nombre url [nombre url ...]
import { writeFileSync } from 'node:fs';
function html2txt(h) {
  return h.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<ix:header[\s\S]*?<\/ix:header>/gi, '')
    .replace(/<\/(p|div|tr|li|h\d|table)>/gi, '\n').replace(/<br\s*\/?>/gi, '\n').replace(/<\/t[dh]>/gi, ' | ')
    .replace(/<[^>]+>/g, '').replace(/&nbsp;|&#160;/g, ' ').replace(/&amp;/g, '&').replace(/&#8217;|&rsquo;/g, "'")
    .replace(/&#8220;|&#8221;|&ldquo;|&rdquo;/g, '"').replace(/&#8212;|&#8211;|&mdash;|&ndash;/g, '-').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#\d+;/g, ' ')
    .replace(/[ \t]+/g, ' ').replace(/( \| )+\n/g, '\n').replace(/\n\s*\n+/g, '\n');
}

const UA = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36', 'Accept-Language': 'en-US,en;q=0.9', 'Accept': 'text/html,application/xhtml+xml,application/json;q=0.9,*/*;q=0.8' };
const a = process.argv.slice(2);
for (let i = 0; i < a.length; i += 2) {
  try {
    const r = await fetch(a[i + 1], { headers: UA, redirect: 'follow' });
    const h = await r.text();
    writeFileSync(new URL(`./docs/D_${a[i]}.html`, import.meta.url), h);
    const t = html2txt(h);
    writeFileSync(new URL(`./docs/D_${a[i]}.txt`, import.meta.url), t);
    console.log(a[i], r.status, h.length, t.length);
  } catch (e) { console.log(a[i], 'ERR', e.message); }
}
