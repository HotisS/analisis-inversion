// Actualiza B.json (del 28-oct) con los datos de mercado del 3T26 que da Zoetis (5-nov-2026).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dir = path.dirname(fileURLToPath(import.meta.url));
const origen = path.join(dir, 'B-28oct.json');
if (!fs.existsSync(origen)) fs.copyFileSync(path.join(dir, 'B.json'), origen);
const b = JSON.parse(fs.readFileSync(origen, 'utf8'));
b.fuentes.push(
  { id: 30, titulo: 'Zoetis (ZTS) Q3 2026 Earnings Call Transcript', editor: 'The Motley Fool', tipo: 'Primaria', fecha: '2026-11-05', url: 'https://www.fool.com/earnings/call-transcripts/2026/11/05/zoetis-zts-q3-2026-earnings-call-transcript/' },
  { id: 31, titulo: 'Zoetis Announces Third Quarter 2026 Results (nota de prensa, 8-K anexo 99.1)', editor: 'Zoetis Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-11-05', url: 'https://www.sec.gov/Archives/edgar/data/1555280/000155528026000048/exhibit99q32026.htm' },
);
b.sector.drivers[1].evidencia += ' En el 3T26 las visitas a clínicas de EE. UU. caen un 3 % en el año y las de perros un 5 % en el trimestre; el coste del veterinario ha subido un 50 % desde 2022 y el 37 % de quienes piensan tener mascota citan el coste [30].';
b.sector.drivers[3].evidencia += ' En el 3T26 siguió creciendo: +7 % orgánico (EE. UU. +5 %, internacional +9 %; peces +23 % por la vacunación en Noruega) [31].';
fs.writeFileSync(path.join(dir, 'B.json'), JSON.stringify(b, null, 2));
console.log('B.json actualizado');
