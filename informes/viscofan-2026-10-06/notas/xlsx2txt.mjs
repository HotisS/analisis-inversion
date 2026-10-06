import { createRequire } from 'node:module';
import { readFileSync, writeFileSync } from 'node:fs';
const require = createRequire('C:/Users/HugoSol/OneDrive - SUMA CAPITAL SGEIC SA/Escritorio/Vela/analisis-inversion/package.json');
const JSZip = require('jszip');
const f = process.argv[2];
const z = await JSZip.loadAsync(readFileSync(f));
const ss = [];
const sst = z.file('xl/sharedStrings.xml');
if (sst) { const x = await sst.async('string'); for (const m of x.matchAll(/<si>([\s\S]*?)<\/si>/g)) ss.push([...m[1].matchAll(/<t[^>]*>([\s\S]*?)<\/t>/g)].map(t=>t[1]).join('')); }
const wb = await z.file('xl/workbook.xml').async('string');
const rels = await z.file('xl/_rels/workbook.xml.rels').async('string');
const names = [...wb.matchAll(/<sheet [^>]*name="([^"]+)"[^>]*r:id="([^"]+)"/g)];
let out = '';
for (const [, name, rid] of names) {
  const tgt = rels.match(new RegExp(`Id="${rid}"[^>]*Target="([^"]+)"`))?.[1] || rels.match(new RegExp(`Target="([^"]+)"[^>]*Id="${rid}"`))?.[1];
  const p = 'xl/' + tgt.replace(/^\/?xl\//,'');
  const x = await z.file(p).async('string');
  out += `\n##### SHEET ${name}\n`;
  for (const r of x.matchAll(/<row [^>]*>([\s\S]*?)<\/row>/g)) {
    const cells = [];
    for (const c of r[1].matchAll(/<c r="([A-Z]+)\d+"([^>]*?)(?:\/>|>([\s\S]*?)<\/c>)/g)) {
      const t = (c[2].match(/t="(\w+)"/)||[])[1]; const v = (c[3]||'').match(/<v>([\s\S]*?)<\/v>/)?.[1];
      let val = v===undefined ? ((c[3]||'').match(/<t[^>]*>([\s\S]*?)<\/t>/)?.[1] ?? '') : t==='s' ? ss[+v] : v;
      if (val!=='' && !isNaN(+val) && t!=='s') val = String(Math.round(+val*1000)/1000);
      if (val!=='') cells.push(`${c[1]}:${val}`);
    }
    if (cells.length) out += cells.join(' | ') + '\n';
  }
}
writeFileSync(f.replace(/\.xlsx$/, '.xlsx.txt'), out);
console.log(f, out.length);
