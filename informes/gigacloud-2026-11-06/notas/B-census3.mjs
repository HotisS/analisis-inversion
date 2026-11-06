// Ventas electrónicas de 4541 por línea de mercancía (ARTS 2022 benchmarked): filas de muebles.
import { readFileSync } from 'node:fs';
import { leerXlsx } from '../../../herramientas/xlsx-leer.mjs';
const filas = leerXlsx(readFileSync(new URL('./docs/census-arts-ecommerce-total.xlsx', import.meta.url)), { hoja: 1 });
for (const f of filas.slice(0, 8)) console.log(f.slice(0, 14).join(' ; '));
for (const f of filas) if (/furniture|Total Electronic|^Total/i.test(f.join(' '))) console.log(f.slice(0, 14).join(' ; '));
