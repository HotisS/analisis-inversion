// Búsqueda de noticias en Naver (ITCEN GLOBAL). Uso: node naver-busca.mjs "<consulta>" AAAA.MM.DD AAAA.MM.DD
// Imprime enlace y titular de cada resultado (sale a internet con curl, que usa el proxy del entorno).
import { execFileSync } from 'node:child_process';

const [, , q, ds, de] = process.argv;
const url = `https://search.naver.com/search.naver?where=news&query=${encodeURIComponent(q)}&sort=1&pd=3&ds=${ds}&de=${de}`;
const html = execFileSync('curl', ['-sS', '-m', '60', '-L', url, '-H', 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36'], { maxBuffer: 50 * 1024 * 1024 }).toString('utf8');
const ent = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const vistos = new Set();
for (const m of html.matchAll(/<a[^>]+href="(https?:\/\/[^"]+)"[^>]*>([\s\S]*?)<\/a>/g)) {
  const u = ent(m[1]);
  const t = ent(m[2].replace(/<[^>]+>/g, '')).replace(/새 창 열림/g, '').trim();
  if (t.length < 20 || /search\.naver|help\.naver|naver\.com\/(?!mnews)/.test(u)) continue;
  const k = u.split('?')[0] + t.slice(0, 20);
  if (vistos.has(k)) continue;
  vistos.add(k);
  console.log(`${u.slice(0, 120)} | ${t.slice(0, 160)}`);
}
