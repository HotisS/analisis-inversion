// Movimiento del precio de NextVision (NXSN.TA) con la serie de Yahoo CORREGIDA de unidad (regla 13).
// Yahoo da la serie diaria en shekels (ILS) hasta el 15-may-2026 y en agorot (ILA) desde el 18-may-2026: el salto de 285,10
// a 29.250 no es una subida de 10.000 %, es el cambio de unidad. `herramientas/movimiento.mjs NXSN.TA` sale así sin sentido
// (6 m +6.018 %). Aquí se pasan a agorot los cierres anteriores (× 100) y se calculan las mismas métricas con su función.
//   NODE_USE_ENV_PROXY=1 node informes/nextvision-2026-10-19/notas/movimiento-corregido.mjs
import { serie, metricas, linea } from '../../../herramientas/movimiento.mjs';
import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = dirname(fileURLToPath(import.meta.url));
const s = await serie('NXSN.TA', { anios: 5, diasCache: 0 });
if (s.error) throw new Error(s.error);
const CAMBIO = '2026-05-18';
const puntos = s.puntos.map(([d, c]) => [d, d < CAMBIO && c < 2000 ? c * 100 : c]);
const m = metricas(puntos);
console.log(linea({ simbolo: 'NXSN.TA', divisa: 'ILA', ...m }));
console.log('Avisos:', m.avisos.map((a) => `[${a.codigo}] ${a.texto}`).join(' ') || 'ninguno');
// Variación de cada mes natural de los últimos 13 meses (cierre de fin de mes frente al del mes anterior).
const fin = {};
for (const [d, c] of puntos) fin[d.slice(0, 7)] = [d, c];
const meses = Object.keys(fin).sort().slice(-14);
const mensual = meses.slice(1).map((k, i) => ({ mes: k, cierre: fin[k][1], var_pct: Math.round((fin[k][1] / fin[meses[i]][1] - 1) * 1000) / 10 }));
for (const x of mensual) console.log(x.mes, x.cierre, `${x.var_pct > 0 ? '+' : ''}${x.var_pct} %`);
// Caídas diarias de más del 5 % en el último año.
const ult = puntos.slice(-253);
const caidas = ult.slice(1).map(([d, c], i) => [d, Math.round((c / ult[i][1] - 1) * 1000) / 10]).filter(([, v]) => v <= -5 || v >= 8);
console.log('Días con −5 % o peor (o +8 % o más):', caidas.map(([d, v]) => `${d} ${v} %`).join('; '));
writeFileSync(join(dir, 'movimiento-corregido.json'), JSON.stringify({ fuente: 'Yahoo Finance, cierres diarios (antes del 18-may-2026 en ILS, pasados a agorot × 100)', ...m, mensual, dias_fuertes: caidas }, null, 1));
