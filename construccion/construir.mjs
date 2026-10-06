// Genera verticales/<vertical>/plantilla.docx a partir de construccion/<vertical>.mjs
// y le incrusta verticales/<vertical>/graficos.json.
//
//   npm run plantillas            (las tres)
//   node construccion/construir.mjs empresa

import { readFileSync, writeFileSync } from 'node:fs';
import { construir } from './comun.mjs';
import { incrustarGraficos } from '../motor/rellenar.mjs';

const VERTICALES = ['empresa', 'etf', 'sector'];
const pedidas = process.argv.slice(2).length ? process.argv.slice(2) : VERTICALES;

for (const v of pedidas) {
  const definicion = (await import(`./${v}.mjs`)).default;
  const graficos = JSON.parse(readFileSync(new URL(`../verticales/${v}/graficos.json`, import.meta.url), 'utf8'));
  // Los gráficos pueden ir dentro de secciones y apartados condicionales: se buscan en todo el árbol.
  const usados = [];
  const buscar = (x) => { if (!Array.isArray(x)) return; if (x[0] === 'grafico') usados.push(x[1]); else x.forEach(buscar); };
  buscar(definicion.bloques);
  const faltan = usados.filter((id) => !graficos[id]);
  const sobran = Object.keys(graficos).filter((id) => !usados.includes(id));
  if (faltan.length) throw new Error(`${v}: gráficos sin definir en graficos.json: ${faltan.join(', ')}`);
  if (sobran.length) console.warn(`${v}: gráficos definidos que la plantilla no usa: ${sobran.join(', ')}`);
  const docx = incrustarGraficos(await construir(definicion), graficos);
  writeFileSync(new URL(`../verticales/${v}/plantilla.docx`, import.meta.url), docx);
  console.log(`verticales/${v}/plantilla.docx (${usados.length} gráficos)`);
}
