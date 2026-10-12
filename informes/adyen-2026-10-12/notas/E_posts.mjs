// Extrae el texto de los mensajes de una página de foro de Beursduivel/IEX (sin nombres de usuario).
// Uso: node E_posts.mjs fichero.txt [...]
import { readFileSync } from 'node:fs';
for (const f of process.argv.slice(2)) {
  const lines = readFileSync(f, 'utf8').split(/\r?\n/).map(l => l.trim());
  const out = [];
  let cur = null, date = null;
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    const m = l.match(/^(\d{1,2} \w+ 2026 \d\d:\d\d)$/);
    if (m && lines[i + 1] === 'auteur info') { date = m[1]; continue; }
    if (/^Aantal posts:/.test(l)) { cur = []; continue; }
    if (cur && /^Aanbevelingen \d+$/.test(l)) { out.push(`[${date}] ${cur.join(' ').replace(/\S+ schreef op [^:]*:/g, '«cita»:').slice(0, 600)}`); cur = null; continue; }
    if (cur && l) cur.push(l);
  }
  console.log(`=== ${f}: ${out.length} mensajes`);
  for (const p of out) console.log(p);
}
