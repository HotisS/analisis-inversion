// Lector de DART (visor por secciones) para JYP. Uso:
//   node dart.mjs toc <rcpNo>                 → lista de secciones (eleId, longitud, título)
//   node dart.mjs get <rcpNo> <eleId> [...]   → guarda docs/dart/<rcp>_<eleId>.txt (texto con tablas en «|»)
//   node dart.mjs all <rcpNo> [patrón]        → todas las secciones hoja (o las que casan con el patrón)
// Sale a internet con curl (usa el proxy del entorno).
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'docs', 'dart');
fs.mkdirSync(dir, { recursive: true });
const curl = (url) => execFileSync('curl', ['-sS', '--retry', '4', '--retry-all-errors', '-m', '60', '-L', url], { maxBuffer: 200 * 1024 * 1024 });
const dec = (b) => { const u = b.toString('utf8'); return (u.match(/\uFFFD/g) || []).length > 20 ? new TextDecoder('euc-kr').decode(b) : u; };

function toc(rcp) {
  const html = dec(curl(`https://dart.fss.or.kr/dsaf001/main.do?rcpNo=${rcp}`));
  const nodes = [];
  const re = /node(\d)\['text'\] = "([^"]*)";[\s\S]*?\['dcmNo'\] = "(\d+)";[\s\S]*?\['eleId'\] = "(\d+)";[\s\S]*?\['offset'\] = "(\d+)";[\s\S]*?\['length'\] = "(\d+)";[\s\S]*?\['dtd'\] = "([^"]*)";/g;
  let m;
  while ((m = re.exec(html))) nodes.push({ nivel: +m[1], titulo: m[2].trim(), dcmNo: m[3], eleId: m[4], offset: m[5], length: +m[6], dtd: m[7] });
  // hoja = el siguiente nodo no es de nivel mayor
  nodes.forEach((n, i) => { n.hoja = !(nodes[i + 1] && nodes[i + 1].nivel > n.nivel); });
  if (!nodes.length) { // avisos de la KRX: un solo documento
    const v = html.match(/viewDoc\("(\d+)", "(\d+)", "(\d+)", "(\d+)", "(\d+)", "([^"]*)"/);
    if (v) nodes.push({ nivel: 1, titulo: 'documento', dcmNo: v[2], eleId: v[3], offset: v[4], length: v[5], dtd: v[6], hoja: true });
  }
  return nodes;
}
function texto(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<\/t[dh]>/gi, ' | ').replace(/<\/tr>/gi, '\n').replace(/<br\s*\/?>/gi, '\n').replace(/<\/p>/gi, '\n')
    .replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#[0-9]+;/g, ' ')
    .replace(/[ \t]+/g, ' ').replace(/\n\s*\n+/g, '\n');
}
function get(rcp, n) {
  const url = `https://dart.fss.or.kr/report/viewer.do?rcpNo=${rcp}&dcmNo=${n.dcmNo}&eleId=${n.eleId}&offset=${n.offset}&length=${n.length}&dtd=${n.dtd}`;
  const t = texto(dec(curl(url)));
  const f = path.join(dir, `${rcp}_${n.eleId}.txt`);
  fs.writeFileSync(f, `# ${n.titulo}\n# ${url}\n${t}`);
  console.log('ok', f, t.length);
}
const [, , modo, rcp, ...rest] = process.argv;
const nodes = toc(rcp);
if (modo === 'toc') for (const n of nodes) console.log(`${'  '.repeat(n.nivel - 1)}${n.eleId}\t${n.length}\t${n.hoja ? '' : '+'}${n.titulo}`);
else if (modo === 'get') for (const e of rest) get(rcp, nodes.find((n) => n.eleId === e));
else if (modo === 'all') for (const n of nodes.filter((n) => n.hoja && (!rest[0] || new RegExp(rest[0]).test(n.titulo)))) get(rcp, n);
