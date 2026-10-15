// ¿Esperar a los resultados antes de comprar o de vender? (preregistro: verticales/empresa/backtest/espera-resultados-preregistro-2026-10-15.md)
//   NODE_USE_ENV_PROXY=1 node herramientas/backtest-espera-resultados.mjs [--bpa-real] [--salida ruta.md]
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { raiz, cargarEmpresas, construirObs, robusta, selector, pasaMantener, calc, v3, f1, mediana } from './backtest-comun.mjs';
import { serie, metricas } from './movimiento.mjs';

const argv = process.argv.slice(2);
const INGENUO = !argv.includes('--bpa-real');
const SALIDA = argv.includes('--salida') ? argv[argv.indexOf('--salida') + 1] : null;
const mapa = JSON.parse(readFileSync(join(raiz, 'verticales/empresa/simbolos.json'), 'utf8'));
const fechas = JSON.parse(readFileSync(join(raiz, 'verticales/empresa/backtest/fechas-resultados-sec.json'), 'utf8')).empresas;
const sinFecha = (c) => String(c || '').replace(/-\d{4}-\d{2}-\d{2}$/, '');
const simboloDeCarpeta = Object.fromEntries(Object.values(mapa.empresas).map((v) => [sinFecha(v.carpeta), v.yahoo]));
const empresas = cargarEmpresas();
const obs = construirObs(empresas, { ingenuo: INGENUO, requiereReal: false });
const series = {};
const masDias = (iso, d) => { const x = new Date(iso + 'T00:00:00Z'); x.setUTCDate(x.getUTCDate() + d); return x.toISOString().slice(0, 10); };
const masMeses = (iso, m) => { const x = new Date(iso + 'T00:00:00Z'); x.setUTCMonth(x.getUTCMonth() + m); return x.toISOString().slice(0, 10); };
// Precio del último cierre ≤ fecha, y del primer cierre > fecha.
const cierreAntes = (pts, iso) => { let r = null; for (const p of pts) { if (p[0] > iso) break; r = p; } return r; };
const cierreDespues = (pts, iso) => pts.find((p) => p[0] > iso) || null;
// Límite robusto: precio máximo al que todavía pasan v3 y v2 (bisección).
function limiteRobusto(o) {
  if (!robusta(o)) return null;
  let lo = o.precio, hi = o.precio * 3;
  for (let i = 0; i < 40; i++) { const m = (lo + hi) / 2; if (robusta(o, { precio: m })) lo = m; else hi = m; }
  return lo;
}
const margen = (o, precio) => calc(o, v3(o.actual, o.hA), { precio }).retPond - 15;
const eventosCompra = [], eventosVenta = [];
for (const o of obs) {
  const s = simboloDeCarpeta[sinFecha(o.carpeta)]; if (!s || !fechas[s]) continue;
  series[s] ??= await serie(s, { anios: 12, diasCache: 30 });
  const pts = series[s].puntos; if (!pts?.length) continue;
  const ini = `${o.t}-12-31`, fin = masMeses(ini, 12);
  const esCompra = robusta(o), lim = esCompra ? limiteRobusto(o) : null;
  const sel = selector(o), esVenta = !pasaMantener(sel);
  if (!esCompra && !esVenta) continue;
  for (const R of fechas[s].fechas) {
    if (R <= ini || R > fin) continue;
    const a = cierreAntes(pts, masDias(R, -1)), b = cierreDespues(pts, R); if (!a || !b) continue;
    const P0 = a[1], P1 = b[1], salto = P1 / P0 - 1;
    const m = metricas(pts, a[0]); const tendencia = m?.tendencia || 'n.d.';
    const r = (desde, pDesde, meses) => { const c = cierreAntes(pts, masMeses(desde, meses)); return c && c[0] > desde ? (c[1] + (meses === 12 ? o.dpa : 0)) / pDesde - 1 : null; };
    const ev = { ticker: o.ticker, nombre: o.nombre, mitad: o.mitad, t: o.t, R, P0, P1, salto, tendencia, r3_antes: r(a[0], P0, 3), r3_despues: r(b[0], P1, 3), r12_antes: r(a[0], P0, 12), r12_despues: r(b[0], P1, 12) };
    if (esCompra && P0 <= lim) eventosCompra.push({ ...ev, limite: lim, perdida: P1 > lim, holgada: margen(o, P0) >= 15 });
    if (esVenta) eventosVenta.push(ev);
  }
}
const p = (a) => (a.length ? 100 * mediana(a) : null);
const res = (ev) => ({
  n: ev.length, salto: p(ev.map((e) => e.salto)), pos: ev.length ? 100 * ev.filter((e) => e.salto > 0).length / ev.length : null,
  sube5: ev.length ? 100 * ev.filter((e) => e.salto >= 0.05).length / ev.length : null, cae10: ev.length ? 100 * ev.filter((e) => e.salto <= -0.1).length / ev.length : null,
  perdida: ev.length ? 100 * ev.filter((e) => e.perdida).length / ev.length : null,
  r3a: p(ev.map((e) => e.r3_antes)), r3d: p(ev.map((e) => e.r3_despues)), r12a: p(ev.map((e) => e.r12_antes)), r12d: p(ev.map((e) => e.r12_despues)),
});
const F = (x, d = 1) => (x === null ? 'n.d.' : f1(x, d)) + ' %';
function tablaCompras(titulo, ev) {
  const filas = [['todas', ev], ['holgadas (margen ≥ 15 puntos)', ev.filter((e) => e.holgada)], ['justas', ev.filter((e) => !e.holgada)],
    ['tendencia bajista', ev.filter((e) => e.tendencia === 'bajista')], ['lateral', ev.filter((e) => e.tendencia === 'lateral')], ['alcista', ev.filter((e) => e.tendencia === 'alcista')],
    ['bajista y justa', ev.filter((e) => e.tendencia === 'bajista' && !e.holgada)]];
  let md = `### ${titulo}: ${ev.length} publicaciones de resultados con la compra robusta viva (${new Set(ev.map((e) => e.ticker)).size} empresas)\n\n| Compras | n | Salto mediano por esperar | Sube | Sube ≥ 5 % | Cae ≥ 10 % | Compra perdida (supera el límite) | Rent. 3 m antes → después | Rent. 12 m antes → después | ¿Esperar? |\n|---|--:|--:|--:|--:|--:|--:|--:|--:|---|\n`;
  for (const [k, e] of filas) { const r = res(e); const cumple = r.n >= 10 && r.salto <= -1 && r.perdida <= 20 && r.r12d >= r.r12a; md += `| ${k} | ${r.n} | ${F(r.salto)} | ${F(r.pos, 0)} | ${F(r.sube5, 0)} | ${F(r.cae10, 0)} | ${F(r.perdida, 0)} | ${F(r.r3a)} → ${F(r.r3d)} | ${F(r.r12a)} → ${F(r.r12d)} | ${r.n < 10 ? 'pocos datos' : cumple ? 'sí' : 'no'} |\n`; }
  return md;
}
function tablaVentas(titulo, ev) {
  const filas = [['todas', ev], ['tendencia alcista', ev.filter((e) => e.tendencia === 'alcista')], ['lateral', ev.filter((e) => e.tendencia === 'lateral')], ['bajista', ev.filter((e) => e.tendencia === 'bajista')]];
  let md = `### ${titulo}: ${ev.length} publicaciones con señal de venta viva (${new Set(ev.map((e) => e.ticker)).size} empresas)\n\n| Ventas | n | Salto mediano por esperar | Sube | Sube ≥ 5 % | Cae ≥ 10 % | Rent. 3 m antes → después | ¿Esperar? |\n|---|--:|--:|--:|--:|--:|--:|---|\n`;
  for (const [k, e] of filas) { const r = res(e); const cumple = r.n >= 10 && r.salto >= 1 && r.pos > 55; md += `| ${k} | ${r.n} | ${F(r.salto)} | ${F(r.pos, 0)} | ${F(r.sube5, 0)} | ${F(r.cae10, 0)} | ${F(r.r3a)} → ${F(r.r3d)} | ${r.n < 10 ? 'pocos datos' : cumple ? 'sí' : 'no'} |\n`; }
  return md;
}
const mit = (ev, m) => ev.filter((e) => e.mitad === m);
const md = [
  `# Backtest: ¿esperar a los resultados? · ${new Date().toISOString().slice(0, 10)} · BPA ${INGENUO ? 'ingenuo' : 'real'}\n`,
  `Generado con \`node herramientas/backtest-espera-resultados.mjs\`. Protocolo: \`espera-resultados-preregistro-2026-10-15.md\`. Fechas reales de resultados (8-K 2.02 de la SEC) de ${Object.keys(fechas).length} empresas de EE. UU.; cada fila es una publicación de resultados con la señal viva. «Salto» = cierre después de los resultados / cierre de la víspera − 1 (lo que cambia por esperar). Compras: esperar se mantiene solo si el salto mediano ≤ −1 %, compras perdidas ≤ 20 % y la rentabilidad a 12 meses no empeora. Ventas: esperar si el salto mediano ≥ +1 % y más del 55 % sube.\n`,
  '## Compras robustas\n', tablaCompras('Todos (decide)', eventosCompra), tablaCompras('Validación', mit(eventosCompra, 'validación')), tablaCompras('Diseño', mit(eventosCompra, 'diseño')),
  '## Señales de venta (no pasan el filtro de mantener)\n', tablaVentas('Todos (decide)', eventosVenta), tablaVentas('Validación', mit(eventosVenta, 'validación')), tablaVentas('Diseño', mit(eventosVenta, 'diseño')),
].join('\n');
if (SALIDA) writeFileSync(join(raiz, SALIDA), md);
console.log(md);
