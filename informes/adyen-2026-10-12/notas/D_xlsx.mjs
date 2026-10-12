// Lector mínimo de xlsx: imprime cada hoja como filas separadas por " | ".
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const require = createRequire(path.join(raiz, 'package.json'));
const JSZip = require('jszip');
const zip = await JSZip.loadAsync(readFileSync(process.argv[2]));
const ss = [];
const sx = zip.file('xl/sharedStrings.xml');
if (sx) {
  const x = await sx.async('string');
  for (const m of x.matchAll(/<si>([\s\S]*?)<\/si>/g)) ss.push([...m[1].matchAll(/<t[^>]*>([\s\S]*?)<\/t>/g)].map((t) => t[1]).join(''));
}
const wb = await zip.file('xl/workbook.xml').async('string');
const nombres = [...wb.matchAll(/<sheet [^>]*name="([^"]+)"/g)].map((m) => m[1]);
const hojas = Object.keys(zip.files).filter((f) => /^xl\/worksheets\/sheet\d+\.xml$/.test(f)).sort((a, b) => parseInt(a.match(/\d+/)) - parseInt(b.match(/\d+/)));
const solo = process.argv[3] ? Number(process.argv[3]) : null;
const ultimas = process.argv[4] ? Number(process.argv[4]) : null;
for (const [i, h] of hojas.entries()) {
  if (solo && i + 1 !== solo) continue;
  console.log(`=== Hoja ${i + 1}: ${nombres[i] ?? h}`);
  const x = await zip.file(h).async('string');
  let filas = [...x.matchAll(/<row [^>]*r="(\d+)"[^>]*>([\s\S]*?)<\/row>/g)];
  if (ultimas) filas = filas.slice(-ultimas);
  for (const r of filas) {
    const celdas = [...r[2].matchAll(/<c r="([A-Z]+)\d+"([^>]*?)(?:\/>|>([\s\S]*?)<\/c>)/g)].map((c) => {
      const t = /t="(\w+)"/.exec(c[2])?.[1];
      const v = /<v>([\s\S]*?)<\/v>/.exec(c[3] ?? '')?.[1];
      const is = /<t[^>]*>([\s\S]*?)<\/t>/.exec(c[3] ?? '')?.[1];
      const val = t === 's' ? ss[Number(v)] : t === 'inlineStr' ? is : v;
      return val == null ? null : `${c[1]}:${val}`;
    }).filter(Boolean);
    if (celdas.length) console.log(r[1], celdas.join(' | '));
  }
}
