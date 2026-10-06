// Descarga páginas para la parte B (sector) y las pasa a texto: node B_get.mjs nombre url
import { writeFileSync } from 'node:fs';
const UA = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36', 'Accept-Language': 'en-US,en;q=0.9' };
const t = (h) => h.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '').replace(/<\/(p|div|tr|li|h\d)>/gi, '\n').replace(/<[^>]+>/g, '').replace(/&nbsp;|&#160;/g, ' ').replace(/&amp;/g, '&').replace(/&#\d+;|&[a-z]+;/g, ' ').replace(/[ \t]+/g, ' ').replace(/\n\s*\n+/g, '\n');
const [n, u] = process.argv.slice(2);
const r = await fetch(u, { headers: UA, signal: AbortSignal.timeout(45000) }); const h = await r.text();
writeFileSync(new URL(`./docs/B_${n}.txt`, import.meta.url), t(h)); console.log(n, r.status, h.length);
