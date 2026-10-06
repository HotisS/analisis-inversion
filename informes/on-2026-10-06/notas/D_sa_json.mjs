// Extrae series del JSON incrustado en las páginas de Stock Analysis guardadas en docs/. Uso: node D_sa_json.mjs <archivo> clave1 clave2 ... (primeros valores = periodos más recientes)
import { readFileSync } from 'node:fs';
const [f, ...ks] = process.argv.slice(2);
const h = readFileSync(new URL(`./docs/${f}`, import.meta.url), 'utf8');
const g = k => { for (const pre of ['{', ',']) { const i = h.indexOf(pre + k + ':['); if (i >= 0) { const s = i + k.length + 3; return h.slice(s, h.indexOf(']', s)).split(',').slice(0, 2).join(' ; '); } } return null; };
console.log(f, ks.map(k => `${k}=${g(k)}`).join(' | '));
