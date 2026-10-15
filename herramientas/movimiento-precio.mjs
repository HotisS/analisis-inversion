// Repaso de movimiento de precio (petición del usuario, 15-oct-2026). Desde las 12:00 es una envoltura de `movimiento.mjs`
// (un solo motor: el mismo que usan robustez.mjs, el backtest y el bloque `bolsa.contexto`), más los días de caída de −5 % o
// más en el último año, para explicar cada caída con su causa antes de dar una señal o proponer una orden.
//
//   NODE_USE_ENV_PROXY=1 node herramientas/movimiento-precio.mjs UMG.AS RWAY.MI AUTO.L     (símbolos Yahoo, o carpetas de informes/)
import { movimiento, serie, linea } from './movimiento.mjs';
import { leerMapa } from './precios.mjs';
const args = process.argv.slice(2);
if (!args.length) { console.error('Uso: node herramientas/movimiento-precio.mjs <símbolo Yahoo | carpeta> …'); process.exit(1); }
const mapa = leerMapa();
const porCarpeta = Object.fromEntries(Object.values(mapa.empresas || {}).map((v) => [v.carpeta, v.yahoo]));
for (const a of args) {
  const s = porCarpeta[a.replace(/^informes\//, '').replace(/\/$/, '')] || a;
  const m = await movimiento(s);
  console.log(linea(m));
  if (m.error) continue;
  const d = (await serie(s)).puntos, hace = new Date(Date.now() - 365 * 864e5).toISOString().slice(0, 10);
  const caidas = [];
  for (let i = 1; i < d.length; i++) { const v = d[i][1] / d[i - 1][1] - 1; if (v <= -0.05 && d[i][0] >= hace) caidas.push(`${d[i][0]} ${(v * 100).toFixed(1)} %`); }
  console.log(`  Caídas de −5 % o más en un día (explicar cada una): ${caidas.join(', ') || 'ninguna'}`);
}
