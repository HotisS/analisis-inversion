// Reescribe D.json a partir de D_datos.mjs (módulo con el objeto completo).
import { writeFileSync } from 'node:fs';
const { default: d } = await import('./D_datos.mjs?' + Date.now());
writeFileSync(new URL('./D.json', import.meta.url), JSON.stringify(d, null, 2));
console.log('D.json escrito:', Object.entries(d).map(([k, v]) => `${k}:${v === null ? 'null' : Array.isArray(v) ? v.length : 'ok'}`).join(' '));
