// Descarga documentos de EDGAR (On Holding, CIK 1858985) y los pasa a texto. Uso: node sec.mjs <acc> <prefijo> [acc prefijo ...]
import { writeFileSync, existsSync } from 'node:fs';
const UA = { 'User-Agent': 'Hugo Sol research h.solescoda@gmail.com' };
const DIR = new URL('./docs/', import.meta.url);
export function html2txt(h) {
  return h.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<ix:header[\s\S]*?<\/ix:header>/gi, '')
    .replace(/<\/(p|div|tr|li|h\d|table)>/gi, '\n').replace(/<br\s*\/?>/gi, '\n').replace(/<\/t[dh]>/gi, ' | ')
    .replace(/<[^>]+>/g, '').replace(/&nbsp;|&#160;/g, ' ').replace(/&amp;/g, '&').replace(/&#8217;|&rsquo;/g, "'")
    .replace(/&#8220;|&#8221;|&ldquo;|&rdquo;/g, '"').replace(/&#8212;|&#8211;|&mdash;|&ndash;/g, '-').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#\d+;/g, ' ')
    .replace(/[ \t]+/g, ' ').replace(/( \| )+\n/g, '\n').replace(/\n\s*\n+/g, '\n');
}
const args = process.argv.slice(2);
for (let i = 0; i < args.length; i += 2) {
  const acc = args[i].replace(/-/g, ''), pre = args[i + 1];
  const idx = await (await fetch(`https://www.sec.gov/Archives/edgar/data/1858985/${acc}/index.json`, { headers: UA })).json();
  for (const it of idx.directory.item) {
    if (!/\.htm$/i.test(it.name) || /index/i.test(it.name) || /^R[0-9]+[.]htm$/i.test(it.name)) continue;
    const out = new URL(`${pre}__${it.name.replace(/\.htm$/i, '')}.txt`, DIR);
    if (existsSync(out)) continue;
    const r = await fetch(`https://www.sec.gov/Archives/edgar/data/1858985/${acc}/${it.name}`, { headers: UA });
    const t = html2txt(await r.text());
    writeFileSync(out, t); console.log(pre, it.name, t.length);
    await new Promise(r => setTimeout(r, 150));
  }
}
