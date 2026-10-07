// Convierte el XHTML ESEF del URD a texto plano (una línea por bloque).
import { readFileSync, writeFileSync } from 'node:fs';
const [src, dst] = process.argv.slice(2);
let h = readFileSync(src, 'utf8');
h = h.replace(/<head[\s\S]*?<\/head>/i, '').replace(/<style[\s\S]*?<\/style>/gi, '');
h = h.replace(/<\/(div|p|tr|li|h\d|table)>/gi, '\n').replace(/<br\s*\/?>/gi, '\n').replace(/<\/t[dh]>/gi, ' | ');
h = h.replace(/<[^>]+>/g, '');
const ent = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };
h = h.replace(/&(#x?[0-9a-f]+|\w+);/gi, (m, e) => e[0] === '#' ? String.fromCodePoint(e[1] === 'x' || e[1] === 'X' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1))) : (ent[e] ?? m));
h = h.replace(/ /g, ' ').replace(/[ \t]+/g, ' ').split('\n').map(s => s.trim()).filter(Boolean).join('\n');
writeFileSync(dst, h);
console.log(h.length, 'caracteres', h.split('\n').length, 'líneas');
