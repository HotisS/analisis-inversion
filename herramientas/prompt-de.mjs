// Imprime la parte de verticales/empresa/prompt.md que necesita cada subagente: las reglas comunes
// (papel, documentación, protocolo de huecos, reglas de datos, qué calcula el motor, meta y fuentes)
// y solo los campos de su encargo. Así cada subagente no lee el prompt entero.
//
//   node herramientas/prompt-de.mjs A|B|C|D

import { readFileSync } from 'node:fs';

const GRUPOS = {
  A: ['negocio', 'financieros', 'trimestres', 'balance', 'flujos', 'calidad', 'rentabilidad', 'capital'],
  B: ['historia', 'negocio', 'sector', 'competencia', 'esg'],
  C: ['directivos', 'gobierno'],
  D: ['identificacion', 'consenso', 'bolsa', 'multiplos_historicos', 'comparables', 'transacciones', 'dcf', 'valoracion'],
};
const g = (process.argv[2] || '').toUpperCase();
if (!GRUPOS[g]) { console.error('Uso: node herramientas/prompt-de.mjs A|B|C|D'); process.exit(1); }

const texto = readFileSync(new URL('../verticales/empresa/prompt.md', import.meta.url), 'utf8');
// Trocea por encabezados de nivel 2 y 3
const trozos = [];
for (const linea of texto.split('\n')) {
  if (/^#{2,3} /.test(linea) || !trozos.length) trozos.push({ titulo: linea, lineas: [linea] });
  else trozos.at(-1).lineas.push(linea);
}
const fuera = /^### Fase [5-9]|^## 7\.|^## 8\.|^### Resumen ejecutivo/;
let enCampos = false;
const salida = [];
for (const t of trozos) {
  if (/^## 6\. Campos/.test(t.titulo)) enCampos = true;
  if (!enCampos) { if (!fuera.test(t.titulo)) salida.push(...t.lineas); continue; }
  if (/^## [78]\./.test(t.titulo)) break;
  const campo = (t.titulo.match(/`(\w+)`\s*$/) || [])[1];
  if (/^## 6\./.test(t.titulo) || campo === 'fuentes' || GRUPOS[g].includes(campo)) salida.push(...t.lineas);
}
console.log(`<!-- Extracto del prompt para el subagente ${g}: reglas comunes y campos ${GRUPOS[g].join(', ')}. -->\n`);
console.log(salida.join('\n'));
