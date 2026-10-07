// Parche local (CAF): descargar.mjs llama a pdftotext (xpdf 4.06) sin -enc, que por defecto escribe Latin1;
// al releerlo como UTF-8 se pierden todas las tildes y eñes (U+FFFD). Re-extrae en UTF-8 los PDF de docs/
// cuyo .txt tenga caracteres de sustitución. Uso: node informes/caf-2026-10-06/notas/retxt.mjs
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const dir = join(dirname(fileURLToPath(import.meta.url)), 'docs');
for (const f of readdirSync(dir).filter(f => f.endsWith('.pdf'))) {
  const txt = join(dir, f.replace(/\.pdf$/, '.txt'));
  let actual = ''; try { actual = readFileSync(txt, 'utf8'); } catch {}
  if (actual && !actual.includes('�')) continue;
  execFileSync('pdftotext', ['-layout', '-enc', 'UTF-8', join(dir, f), txt]);
  const pags = readFileSync(txt, 'utf8').split('\f');
  writeFileSync(txt, pags.map((p, n) => `=== página ${n + 1} ===\n${p}`).join('\n'));
  console.log(`${f}: re-extraído en UTF-8 (${pags.length} páginas)`);
}
