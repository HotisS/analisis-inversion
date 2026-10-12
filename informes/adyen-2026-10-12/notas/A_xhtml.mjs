// Convierte un informe iXBRL (.xhtml) en texto: filas de tabla con " | ", bloques en líneas.
// Uso: node A_xhtml.mjs entrada.xhtml salida.txt
import { readFileSync, writeFileSync } from 'node:fs';
let s = readFileSync(process.argv[2], 'utf8');
s = s.replace(/src="data:[^"]*"/g, '').replace(/<style[\s\S]*?<\/style>/g, '').replace(/<ix:header>[\s\S]*?<\/ix:header>/g, '');
s = s.replace(/<\/(td|th)>/g, ' | ').replace(/<\/(p|div|tr|h\d|li)>/g, '\n').replace(/<br\s*\/?>/g, '\n');
s = s.replace(/<[^>]+>/g, '');
s = s.replace(/&nbsp;|&#160;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#8217;|&rsquo;/g, "'").replace(/&#8211;|&ndash;/g, '-').replace(/&#[0-9]+;/g, ' ');
s = s.split('\n').map((l) => l.replace(/[ \t]+/g, ' ').trim()).filter((l) => l && l !== '|' && !/^(\| ?)+$/.test(l)).join('\n');
writeFileSync(process.argv[3], s);
console.log(s.length, 'caracteres');
