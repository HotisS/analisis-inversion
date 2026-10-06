// Comprueba que prompt, plantilla y ejemplo de cada vertical dicen lo mismo:
//  1) las claves de los bloques JSON del prompt.md = las claves de ejemplo.json;
//  2) rellenar la plantilla con el ejemplo no deja avisos ni marcadores sin resolver.
//
//   npm test

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { rellenar } from '../motor/rellenar.mjs';

const VERTICALES = ['empresa', 'etf', 'sector'];
const raiz = new URL('../', import.meta.url);
let fallos = 0;

// Rutas de claves de un objeto: en las listas mira solo el primer elemento.
function rutas(v, prefijo = '', salida = new Set()) {
  if (Array.isArray(v)) { if (v.length && typeof v[0] === 'object' && v[0] !== null) rutas(v[0], prefijo + '[]', salida); return salida; }
  if (v !== null && typeof v === 'object') {
    for (const [k, x] of Object.entries(v)) { const r = prefijo ? `${prefijo}.${k}` : k; salida.add(r); rutas(x, r, salida); }
  }
  return salida;
}

for (const v of VERTICALES) {
  const dir = new URL(`verticales/${v}/`, raiz);
  const prompt = readFileSync(new URL('prompt.md', dir), 'utf8');
  const ejemplo = JSON.parse(readFileSync(new URL('ejemplo.json', dir), 'utf8'));

  const delPrompt = {};
  for (const [, bloque] of prompt.matchAll(/```json\n([\s\S]*?)```/g)) {
    try { Object.assign(delPrompt, JSON.parse(`{${bloque}}`)); }
    catch (e) { console.error(`✗ ${v}: bloque JSON del prompt no válido: ${e.message}\n${bloque.slice(0, 120)}…`); fallos++; }
  }
  const a = rutas(delPrompt), b = rutas(ejemplo);
  const soloPrompt = [...a].filter((r) => !b.has(r)), soloEjemplo = [...b].filter((r) => !a.has(r));
  if (soloPrompt.length || soloEjemplo.length) {
    fallos++;
    console.error(`✗ ${v}: el prompt y el ejemplo no tienen las mismas claves`);
    if (soloPrompt.length) console.error(`    solo en el prompt:  ${soloPrompt.join(', ')}`);
    if (soloEjemplo.length) console.error(`    solo en el ejemplo: ${soloEjemplo.join(', ')}`);
  } else console.log(`✓ ${v}: prompt y ejemplo coinciden (${a.size} claves)`);

  const r = rellenar(readFileSync(new URL('plantilla.docx', dir)), ejemplo);
  mkdirSync(new URL('informes/', raiz), { recursive: true });
  writeFileSync(new URL(`informes/ejemplo-${v}.docx`, raiz), r.buffer);
  if (r.avisos.length) { fallos++; console.error(`✗ ${v}: avisos al rellenar\n    ${r.avisos.join('\n    ')}`); }
  else console.log(`✓ ${v}: plantilla rellenada sin avisos (${r.graficos} gráficos, cobertura ${r.cobertura.cobertura} %)`);
}

process.exit(fallos ? 1 : 0);
