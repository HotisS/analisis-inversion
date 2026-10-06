// Busca en EDGAR (full-text search) la nota de prensa EX-99.1 de un 8-K y la guarda en docs/D_tx_<nombre>.txt
// Uso: node D_sec_pr.mjs nombre "consulta" desde hasta
import { writeFileSync } from 'node:fs';
const UA = { 'User-Agent': 'analisis-inversion research admin@localhost.test' };
const [nombre, q, d1, d2] = process.argv.slice(2);
const url = `https://efts.sec.gov/LATEST/search-index?q=${encodeURIComponent(q)}&forms=8-K&dateRange=custom&startdt=${d1}&enddt=${d2}`;
const j = await (await fetch(url, { headers: UA })).json();
const hits = j.hits.hits.filter(h => /EX-99/.test(h._source.file_type));
for (const h of j.hits.hits.slice(0, 8)) console.log(h._source.file_date, h._source.file_type, h._source.display_names[0].slice(0, 50), h._id);
const h = hits[0]; if (!h) process.exit(0);
const [adsh, file] = h._id.split(':'); const cik = String(parseInt(h._source.ciks[0]));
const doc = `https://www.sec.gov/Archives/edgar/data/${cik}/${adsh.replace(/-/g, '')}/${file}`;
const html = await (await fetch(doc, { headers: UA })).text();
const t = html.replace(/<style[\s\S]*?<\/style>/gi, '').replace(/<\/(p|div|tr|li|h\d)>/gi, '\n').replace(/<br\s*\/?>/gi, '\n').replace(/<\/t[dh]>/gi, ' | ').replace(/<[^>]+>/g, '')
  .replace(/&nbsp;|&#160;/g, ' ').replace(/&amp;/g, '&').replace(/&#8217;|&rsquo;/g, "'").replace(/&#8220;|&#8221;|&ldquo;|&rdquo;/g, '"').replace(/&#8212;|&#8211;|&mdash;|&ndash;/g, '-').replace(/&#\d+;/g, ' ')
  .replace(/[ \t]+/g, ' ').replace(/\n\s*\n+/g, '\n');
writeFileSync(new URL(`./docs/D_tx_${nombre}.txt`, import.meta.url), `URL: ${doc}\nFECHA: ${h._source.file_date}\n` + t);
console.log('->', doc, t.length);
