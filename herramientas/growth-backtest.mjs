#!/usr/bin/env node
// Backtest del método growth: corre todas las versiones de motor/growth.mjs sobre
// verticales/growth/backtest/casos/*.json y escribe verticales/growth/backtest/resultados.md.
import fs from 'node:fs';
import path from 'node:path';
import { calcular, VERSIONES, VIGENTE } from '../motor/growth.mjs';

const raiz = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const dir = path.join(raiz, 'verticales/growth/backtest');
const casos = fs.readdirSync(path.join(dir, 'casos')).filter(f => f.endsWith('.json')).sort()
  .map(f => ({ f, d: JSON.parse(fs.readFileSync(path.join(dir, 'casos', f), 'utf8')) }));
const fmt = n => (n === null || n === undefined ? '—' : (n > 0 ? '+' : '') + Math.round(n));
const media = xs => (xs.length ? xs.reduce((s, y) => s + y, 0) / xs.length : null);

let md = `# Backtest del método growth: resultados\n\nLo genera \`node herramientas/growth-backtest.mjs\`. ${casos.length} casos (${casos.filter(c => c.d.caso.tipo === 'ganadora').length} ganadoras, ${casos.filter(c => c.d.caso.tipo === 'fracaso').length} fracasos), con los datos de cada fecha. Versión vigente: **${VIGENTE}**.\n\n`;
const resumen = [];
const detalle = [];
for (const [v, cfg] of Object.entries(VERSIONES)) {
  const filas = casos.map(({ f, d }) => ({ f, d, k: calcular(d, cfg) }));
  const gan = filas.filter(x => x.d.caso.tipo === 'ganadora'), fra = filas.filter(x => x.d.caso.tipo === 'fracaso');
  const compra = filas.filter(x => x.k.senal === 'Comprar');
  const aciertos = gan.filter(x => x.k.senal === 'Comprar').length + fra.filter(x => x.k.senal !== 'Comprar').length;
  const r12 = media(compra.map(x => x.d.resultado.rent_12m_pct).filter(y => y != null));
  const r36 = media(compra.map(x => x.d.resultado.rent_36m_pct).filter(y => y != null));
  const todos12 = media(filas.map(x => x.d.resultado.rent_12m_pct).filter(y => y != null));
  resumen.push(`| ${v} | ${cfg.descripcion} | ${gan.filter(x => x.k.senal === 'Comprar').length}/${gan.length} | ${fra.filter(x => x.k.senal === 'Comprar').length}/${fra.length} | ${aciertos}/${filas.length} | ${compra.length} | ${fmt(r12)} % | ${fmt(r36)} % | ${fmt(todos12)} % |`);
  detalle.push(`### ${v}: ${cfg.descripcion}\n\n| Caso | Tipo | Momento | Punt. | Señales | EV/vtas ÷ crec. | Ponderada | Base | Bajista | Señal | Motivo | 12 m después | 36 m después |\n|---|---|---|---|---|---|---|---|---|---|---|---|---|\n` +
    filas.map(({ f, d, k }) => `| ${d.empresa} ${d.fecha} | ${d.caso.tipo} | ${d.caso.momento} | ${k.puntuacion} | ${k.n_senales}${k.euforia ? ' (euforia)' : ''} | ${k.ratio_crecimiento ?? '—'} | ${fmt(k.rent_ponderada_pct)} % | ${fmt(k.rent_base_pct)} % | ${fmt(k.casos.bajista.rent_pct)} % | **${k.senal}** | ${k.motivo} | ${fmt(d.resultado.rent_12m_pct)} % | ${fmt(d.resultado.rent_36m_pct)} % |`).join('\n'));
}
md += `## Resumen por versión\n\n| Versión | Qué cambia | Ganadoras con Comprar | Fracasos con Comprar | Aciertos | Compras | Rent. media 12 m de las compras | 36 m | Rent. media 12 m de todos los casos |\n|---|---|---|---|---|---|---|---|---|\n${resumen.join('\n')}\n\n## Detalle\n\n${detalle.join('\n\n')}\n`;
fs.writeFileSync(path.join(dir, 'resultados.md'), md);
console.log(md.split('## Detalle')[0]);
