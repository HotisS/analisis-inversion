// Parche del Word generado (no del sistema): con divisa de cotización = divisa de las cuentas, el motor deja
// calc.recomendacion.precio_txt y valor_objetivo_txt como '' y rellenar.mjs imprime «n.d.» detrás del precio y
// del valor objetivo («53,82 EURn.d.»). Se quita ese «n.d.» pegado. Ver diario, fricción 2.
import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(new URL('../../../package.json', import.meta.url));
const JSZip = require('jszip');
const ruta = new URL('../Inditex - 2026-10-06.docx', import.meta.url);
const zip = await JSZip.loadAsync(readFileSync(ruta));
let xml = await zip.file('word/document.xml').async('string');
const antes = (xml.match(/n\.d\./g) || []).length;
xml = xml.replace(/(\d+,\d{2}(?: EUR)?)n\.d\./g, '$1');
const despues = (xml.match(/n\.d\./g) || []).length;
zip.file('word/document.xml', xml);
writeFileSync(ruta, await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' }));
console.log(`«n.d.» en el documento: ${antes} → ${despues}`);
