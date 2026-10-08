// Descarga el texto de los 6-K de Novo Nordisk (anuncios a la bolsa) desde EDGAR y lista su título.
//   node informes/novo-nordisk-2026-10-08/notas/C-6k.mjs AAAA-MM-DD salida_dir
import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
const htmlATexto = h => h.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '')
  .replace(/<\/(p|div|tr|li|h\d|table|section)>/gi, '\n').replace(/<br\s*\/?>/gi, '\n').replace(/<\/t[dh]>/gi, ' | ')
  .replace(/<[^>]+>/g, '').replace(/&nbsp;|&#160;|&#xa0;/gi, ' ').replace(/&amp;/g, '&').replace(/&oslash;/g, 'ø').replace(/&aelig;/g, 'æ').replace(/&aring;/g, 'å').replace(/&Oslash;/g, 'Ø')
  .replace(/&#(\d+);/g, (_, c) => String.fromCodePoint(+c)).replace(/&[a-z]+;/gi, ' ').replace(/[ \t]+/g, ' ').replace(/\n\s*\n+/g, '\n');

const desde = process.argv[2] || '2025-10-01';
const dir = process.argv[3];
mkdirSync(dir, { recursive: true });
const UA = { 'User-Agent': 'analisis-inversion research admin@example.com' };
const j = await (await fetch('https://data.sec.gov/submissions/CIK0000353278.json', { headers: UA })).json();
const f = j.filings.recent;
const lista = [];
for (let i = 0; i < f.form.length; i++) {
  if (f.form[i] !== '6-K' || f.filingDate[i] < desde) continue;
  const acc = f.accessionNumber[i].replace(/-/g, '');
  const url = `https://www.sec.gov/Archives/edgar/data/353278/${acc}/${f.primaryDocument[i]}`;
  const nombre = `${f.filingDate[i]}_${acc}.txt`;
  const ruta = join(dir, nombre);
  let t;
  if (existsSync(ruta)) t = readFileSync(ruta, 'utf8');
  else {
    try {
      const r = await fetch(url, { headers: UA, signal: AbortSignal.timeout(60000) });
      t = htmlATexto(await r.text());
      writeFileSync(ruta, url + '\n' + t);
    } catch (e) { console.log(f.filingDate[i], 'ERROR', e.message, url); continue; }
    await new Promise(r => setTimeout(r, 150));
  }
  // El título suele ir tras la cabecera del 6-K
  const cuerpo = t.replace(/[\s\S]*?Rule 12g3-2\(b\)[^\n]*\n/i, '').replace(/\s+/g, ' ');
  const m = cuerpo.match(/(Company announcement|Major shareholder|Transactions?|Novo Nordisk)[^.]{0,200}/i);
  console.log(f.filingDate[i], '|', (m ? m[0] : cuerpo.slice(0, 200)).slice(0, 220), '|', url);
}
