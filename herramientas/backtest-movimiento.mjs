// Backtest del movimiento del precio como regla de compra (preregistro: verticales/empresa/backtest/movimiento-preregistro-2026-10-15.md).
//   NODE_USE_ENV_PROXY=1 node herramientas/backtest-movimiento.mjs [--bpa-real] [--salida ruta.md]
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { raiz, cargarEmpresas, construirObs, robusta, resumen, f1, mediana } from './backtest-comun.mjs';
import { serie, metricas } from './movimiento.mjs';

const argv = process.argv.slice(2);
const INGENUO = !argv.includes('--bpa-real');
const SALIDA = argv.includes('--salida') ? argv[argv.indexOf('--salida') + 1] : null;
const mapa = JSON.parse(readFileSync(join(raiz, 'verticales/empresa/simbolos.json'), 'utf8'));
// Por nombre de carpeta sin fecha (la observación puede venir de una versión anterior del informe).
const sinFecha = (c) => String(c || '').replace(/-\d{4}-\d{2}-\d{2}$/, '');
const simboloDeCarpeta = Object.fromEntries(Object.values(mapa.empresas).map((v) => [sinFecha(v.carpeta), v.yahoo]));
const empresas = cargarEmpresas();
const obs = construirObs(empresas, { ingenuo: INGENUO, requiereReal: true });
const series = {};
for (const o of obs) {
  const s = simboloDeCarpeta[sinFecha(o.carpeta)]; if (!s) { o.m = null; continue; }
  series[s] ??= await serie(s, { anios: 12, diasCache: 30 });
  o.m = series[s].error ? null : metricas(series[s].puntos, `${o.t}-12-31`);
  if (o.m && o.m.fecha < `${o.t}-10-01`) o.m = null; // sin serie cerca del cierre
}
const con = obs.filter((o) => o.m);
const REGLAS = {
  'R1 subida fuerte (+25 % 1 m o +40 % 3 m)': (m) => m.var_1m_pct >= 25 || m.var_3m_pct >= 40,
  'R2 a ≤ 5 % del máx. 52 s tras +20 % en 3 m': (m) => m.dist_max_52s_pct >= -5 && m.var_3m_pct >= 20,
  'R3 caída fuerte (−20 % 1 m o −30 % 3 m)': (m) => m.var_1m_pct <= -20 || m.var_3m_pct <= -30,
  'R4 a ≤ 3 % del mínimo de 52 s': (m) => m.dist_min_52s_pct <= 3,
  'R5 ≥ 15 % bajo la media de 200': (m) => m.dist_media_200_pct !== null && m.dist_media_200_pct <= -15,
  // R6 añadida tras el preregistro (propuesta del hilo de cartera, 15-oct 11:39): tendencia bajista (precio y media de 50 bajo la de 200).
  // Su segunda mitad (resultados en ≤ 15 días) no se puede medir con cierres anuales.
  'R6 tendencia bajista (añadida después)': (m) => m.tendencia === 'bajista',
};
const fila = (k, r) => `| ${k} | ${r.n} | ${f1(r.med)} % | ${f1(r.acierto, 0)} % | ${f1(r.perd, 0)} % |`;
function tabla(titulo, conj) {
  const compras = conj.filter((o) => robusta(o));
  let md = `### ${titulo} (${conj.length} cierres con precio diario; ${compras.length} compras robustas)\n\n| Regla | Compras bloqueadas | Rent. real mediana (bloqueadas) | ≥ 15 % | < −10 % | Las que quedan: n | Rent. mediana | < −10 % | Todos los cierres bloqueados: n | Rent. mediana | ¿Cumple? |\n|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|---|\n`;
  for (const [k, fn] of Object.entries(REGLAS)) {
    const b = resumen(compras.filter((o) => fn(o.m))), q = resumen(compras.filter((o) => !fn(o.m))), todos = resumen(conj.filter((o) => fn(o.m)));
    const cumple = b.n > 0 && q.n > 0 && q.med - b.med >= 5 && b.perd - q.perd >= 5 && b.n <= 0.25 * compras.length;
    md += `| ${k} | ${b.n} (${f1(100 * b.n / (compras.length || 1), 0)} %) | ${f1(b.med)} % | ${f1(b.acierto, 0)} % | ${f1(b.perd, 0)} % | ${q.n} | ${f1(q.med)} % | ${f1(q.perd, 0)} % | ${todos.n} | ${f1(todos.med)} % | ${cumple ? '**SÍ**' : 'no'} |\n`;
  }
  md += `\nSin regla: ${fila('todas las compras robustas', resumen(compras)).replace(/^\| /, '')}\n`;
  return md;
}
const val = con.filter((o) => o.mitad === 'validación'), dis = con.filter((o) => o.mitad === 'diseño');
const md = [
  `# Backtest del movimiento del precio · ${new Date().toISOString().slice(0, 10)} · BPA ${INGENUO ? 'ingenuo' : 'real'}\n`,
  `Generado con \`node herramientas/backtest-movimiento.mjs${INGENUO ? '' : ' --bpa-real'}\`. Protocolo: \`movimiento-preregistro-2026-10-15.md\`. ${empresas.length} empresas, ${obs.length} cierres, ${con.length} con precio diario de Yahoo en el 31-dic de t (${Object.keys(series).length} símbolos). Criterio: bloqueadas con mediana ≥ 5 puntos peor y ≥ 5 puntos más en pérdida que las que quedan, ≤ 25 % de las compras, mismo signo en validación.\n`,
  tabla('Todos los cierres (decide)', con), tabla('Validación (signo)', val), tabla('Diseño', dis),
].join('\n');
if (SALIDA) writeFileSync(join(raiz, SALIDA), md);
console.log(md);
