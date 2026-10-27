// Carpetas de informes (27-oct-2026). Una empresa puede tener varias carpetas (`empresa-AAAA-MM-DD`); para señales vale
// SOLO la más nueva. Caso CR Sanjiu (26-oct): el escáner usó el límite del informe viejo (23,93 en vez de 25,23 CNY).
import { readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const RAIZ = fileURLToPath(new URL('../informes/', import.meta.url));
export const slugCarpeta = (c) => String(c).replace(/\/$/, '').replace(/^informes\//, '').replace(/-\d{4}-\d{2}-\d{2}$/, '');
let cache = null;
export function carpetasMasNuevas() {
  if (cache) return cache;
  cache = {};
  for (const d of readdirSync(RAIZ, { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name)) {
    const s = slugCarpeta(d);
    if (!cache[s] || d > cache[s]) cache[s] = d; // misma empresa: gana la fecha más alta
  }
  return cache;
}
export const carpetaMasNueva = (c) => carpetasMasNuevas()[slugCarpeta(c)] || c;
