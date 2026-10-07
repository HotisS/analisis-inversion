// Ediciones puntuales de textos.mjs (citas y frases tras la revisión).
import { readFileSync, writeFileSync } from 'node:fs';
const p = new URL('./textos.mjs', import.meta.url);
let s = readFileSync(p, 'utf8');
const rep = (a, b) => { if (!s.includes(a)) { console.log('NO ENCONTRADO:', a.slice(0, 70)); return; } s = s.replace(a, b); };
if (!s.includes("from './resumen.mjs'")) rep('import { trimestresItems', "import { resumen as RES } from './resumen.mjs';\nimport { trimestresItems");
rep('  resumen: null,', '  resumen: RES,');
rep('cargó 140 M de hitos y licencias ligados al lanzamiento de Ebglyss y a Ilumetri y un EBITDA en mínimos (166-224 M).', 'cargó 125,8, 131,6 y 102,4 M de inversión en intangibles (licencias, hitos y desarrollo activado) con un EBITDA en mínimos (166-224 M) [A1, A3].');
rep("comparables_criterio: 'Farmacéuticas europeas medianas", "comparables_criterio: 'Cifras de Stock Analysis y MarketScreener a 7-oct-2026 [P6-P17], cambio del BCE [P18]. Farmacéuticas europeas medianas");
rep("ultima_presentacion: 'En el 1T26", "ultima_presentacion: 'Los trimestres se calculan por diferencia entre las presentaciones acumuladas (1T, 1S, 9M y año) [P34, P33, P23, P35, P32, P24, B1, P25, D4]. En el 1T26");
rep('las acciones pasaron de 178,9 M a 214 M [A1, A4].', 'las acciones pasaron de 178,9 M a 214 M [A1-A6].');
writeFileSync(p, s);
console.log('ok');
