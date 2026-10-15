// Añadido después del preregistro de la espera a resultados (15-oct): «ir con momentum» en las ventas.
// Señal de venta en el cierre t (no pasa el filtro de mantener): vender ya frente a esperar a que se rompa la tendencia
// (primer cierre por debajo de la media de 200 sesiones; o de la de 50), con tope de 12 meses. Todas las empresas con precio diario.
//   NODE_USE_ENV_PROXY=1 node herramientas/backtest-momentum-ventas.mjs [--salida ruta.md]
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { raiz, cargarEmpresas, construirObs, selector, pasaMantener, f1, mediana } from './backtest-comun.mjs';
import { serie, metricas } from './movimiento.mjs';
const argv = process.argv.slice(2);
const SALIDA = argv.includes('--salida') ? argv[argv.indexOf('--salida') + 1] : null;
const mapa = JSON.parse(readFileSync(join(raiz, 'verticales/empresa/simbolos.json'), 'utf8'));
const sinFecha = (c) => String(c || '').replace(/-\d{4}-\d{2}-\d{2}$/, '');
const simboloDeCarpeta = Object.fromEntries(Object.values(mapa.empresas).map((v) => [sinFecha(v.carpeta), v.yahoo]));
const obs = construirObs(cargarEmpresas(), { ingenuo: true, requiereReal: false });
const series = {};
const masMeses = (iso, m) => { const x = new Date(iso + 'T00:00:00Z'); x.setUTCMonth(x.getUTCMonth() + m); return x.toISOString().slice(0, 10); };
const ev = [];
for (const o of obs) {
  if (pasaMantener(selector(o))) continue;
  const s = simboloDeCarpeta[sinFecha(o.carpeta)]; if (!s) continue;
  series[s] ??= await serie(s, { anios: 12, diasCache: 30 });
  const pts = series[s].puntos; if (!pts?.length) continue;
  const ini = `${o.t}-12-31`, fin = masMeses(ini, 12);
  const i0 = pts.findIndex((p) => p[0] > ini); if (i0 < 250 || pts[i0 - 1][0] < `${o.t}-12-15`) continue;
  const P0 = pts[i0 - 1][1], m0 = metricas(pts, pts[i0 - 1][0]);
  const salida = (ventana) => {
    for (let i = i0; i < pts.length && pts[i][0] <= fin; i++) {
      const med = pts.slice(i - ventana + 1, i + 1).reduce((a, p) => a + p[1], 0) / ventana;
      if (pts[i][1] < med) return { fecha: pts[i][0], precio: pts[i][1], dias: i - i0 + 1 };
    }
    const u = pts.filter((p) => p[0] <= fin).at(-1); return { fecha: u[0], precio: u[1], dias: 250, tope: true };
  };
  const s200 = salida(200), s50 = salida(50);
  const r12 = pts.filter((p) => p[0] <= fin).at(-1)[1] / P0 - 1;
  ev.push({ ticker: o.ticker, mitad: o.mitad, t: o.t, tendencia: m0?.tendencia || 'n.d.', g200: s200.precio / P0 - 1, d200: s200.dias, g50: s50.precio / P0 - 1, d50: s50.dias, r12 });
}
const p = (a) => (a.length ? 100 * mediana(a) : null), F = (x, d = 1) => (x === null ? 'n.d.' : f1(x, d)) + ' %';
function tabla(titulo, e) {
  const filas = [['todas', e], ['tendencia alcista en la señal', e.filter((x) => x.tendencia === 'alcista')], ['lateral', e.filter((x) => x.tendencia === 'lateral')], ['bajista', e.filter((x) => x.tendencia === 'bajista')]];
  let md = `### ${titulo}: ${e.length} señales de venta con precio diario (${new Set(e.map((x) => x.ticker)).size} empresas)\n\n| Ventas | n | Esperar a romper la media de 200: ganancia mediana | sube | sesiones medianas | Esperar a romper la de 50: ganancia | sube | sesiones | Rent. 12 m si no se vende |\n|---|--:|--:|--:|--:|--:|--:|--:|--:|\n`;
  for (const [k, x] of filas) md += `| ${k} | ${x.length} | ${F(p(x.map((y) => y.g200)))} | ${F(x.length ? 100 * x.filter((y) => y.g200 > 0).length / x.length : null, 0)} | ${x.length ? f1(mediana(x.map((y) => y.d200)), 0) : 'n.d.'} | ${F(p(x.map((y) => y.g50)))} | ${F(x.length ? 100 * x.filter((y) => y.g50 > 0).length / x.length : null, 0)} | ${x.length ? f1(mediana(x.map((y) => y.d50)), 0) : 'n.d.'} | ${F(p(x.map((y) => y.r12)))} |\n`;
  return md;
}
const md = [`# Backtest añadido: «ir con momentum» en las ventas · ${new Date().toISOString().slice(0, 10)}\n`,
  'Añadido después del preregistro (petición del usuario, 15-oct 13:42). Señal de venta = cierre anual que no pasa el filtro de mantener. Se compara vender ese día con esperar a que el precio cierre por debajo de su media de 200 (o de 50) sesiones, con tope de 12 meses. «Ganancia» = precio de salida / precio de la señal − 1 (lo que se gana o pierde por esperar, sin dividendos).\n',
  tabla('Todos (decide)', ev), tabla('Validación', ev.filter((x) => x.mitad === 'validación')), tabla('Diseño', ev.filter((x) => x.mitad === 'diseño'))].join('\n');
if (SALIDA) writeFileSync(join(raiz, SALIDA), md);
console.log(md);
