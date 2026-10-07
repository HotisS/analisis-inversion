// Declaraciones de operaciones de directivos (DD) de la AMF (BDIF) que mencionan Dassault Systèmes.
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const dir = dirname(fileURLToPath(import.meta.url));
const out = [];
for (let from = 0; from < 400; from += 50) {
  const u = `https://bdif.amf-france.org/back/api/v1/informations?TypesInformation=DD&RechercheTexte=${encodeURIComponent('DASSAULT SYSTEMES')}&From=${from}&Size=50`;
  const r = await fetch(u, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const j = await r.json();
  for (const x of j.result || []) out.push(x);
  if (!j.result || j.result.length < 50) break;
}
writeFileSync(join(process.env.TEMP, 'analisis-inversion/dassault-C/C-bdif.json'), JSON.stringify(out, null, 1));
console.log(out.length, 'registros');
console.log(JSON.stringify(out[0], null, 1).slice(0, 3000));
