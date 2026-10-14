#!/usr/bin/env node
// Backtest growth, fase 2 (protocolo: verticales/growth/backtest/protocolo.md).
// Lee casos2/<cohorte>/*.json y universo.json; para cada versión de motor/growth.mjs mide,
// a 24 meses (y 12) frente al QQQ: precisión de Comprar, exceso medio, acierto total, con márgenes al 95 %.
//   node herramientas/growth-backtest2.mjs [--validacion]   (sin --validacion, la cohorte 2023 no se mira)
import fs from 'node:fs';
import path from 'node:path';
import { calcular, VERSIONES, VIGENTE } from '../motor/growth.mjs';

const raiz = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const dir = path.join(raiz, 'verticales/growth/backtest');
const universo = JSON.parse(fs.readFileSync(path.join(dir, 'universo.json'), 'utf8'));
const conValidacion = process.argv.includes('--validacion');
const AJUSTE = ['2019', '2021'], VALID = ['2023'];

function cargar(cohortes) {
  const out = [];
  for (const c of cohortes) {
    const d = path.join(dir, 'casos2', c);
    if (!fs.existsSync(d)) continue;
    for (const f of fs.readdirSync(d).filter(x => x.endsWith('.json')).sort()) {
      const caso = JSON.parse(fs.readFileSync(path.join(d, f), 'utf8'));
      const q = universo.qqq[c];
      caso._cohorte = c;
      caso._r = { r12: caso.resultado?.rent_12m_pct, r24: caso.resultado?.rent_24m_pct, q12: caso.resultado?.qqq_12m_pct ?? q.r12, q24: caso.resultado?.qqq_24m_pct ?? q.r24 };
      out.push(caso);
    }
  }
  return out;
}
const wilson = (k, n) => {
  if (!n) return [null, null];
  const z = 1.96, p = k / n, den = 1 + z * z / n, cen = (p + z * z / (2 * n)) / den, mar = (z * Math.sqrt(p * (1 - p) / n + z * z / (4 * n * n))) / den;
  return [Math.round((cen - mar) * 100), Math.round((cen + mar) * 100)];
};
let semilla = 12345;
const azar = () => ((semilla = (semilla * 1103515245 + 12345) % 2147483648) / 2147483648);
const bootstrap = xs => {
  if (xs.length < 2) return [null, null];
  const medias = [];
  for (let i = 0; i < 2000; i++) { let s = 0; for (let j = 0; j < xs.length; j++) s += xs[Math.floor(azar() * xs.length)]; medias.push(s / xs.length); }
  medias.sort((a, b) => a - b);
  return [Math.round(medias[50]), Math.round(medias[1949])];
};
const media = xs => (xs.length ? xs.reduce((s, y) => s + y, 0) / xs.length : null);
const fmt = n => (n === null || n === undefined ? '—' : (n > 0 ? '+' : '') + Math.round(n));

function medir(casos, cfg, h = '24') {
  const filas = casos.map(d => ({ d, k: calcular(d, cfg) })).filter(x => x.d._r['r' + h] != null);
  const compras = filas.filter(x => x.k.senal === 'Comprar');
  const bate = x => x.d._r['r' + h] > x.d._r['q' + h];
  const exQ = compras.map(x => x.d._r['r' + h] - x.d._r['q' + h]);
  // exceso frente a la media de su cohorte (comprar toda la lista)
  const medCoh = {};
  for (const c of new Set(filas.map(x => x.d._cohorte))) medCoh[c] = media(filas.filter(x => x.d._cohorte === c).map(x => x.d._r['r' + h]));
  const exL = compras.map(x => x.d._r['r' + h] - medCoh[x.d._cohorte]);
  const aciertos = filas.filter(x => (x.k.senal === 'Comprar') === bate(x)).length;
  const base = filas.filter(bate).length;
  return {
    n: filas.length, compras: compras.length, prec: compras.length ? compras.filter(bate).length : 0,
    precIC: wilson(compras.filter(bate).length, compras.length), exQ: media(exQ), exQIC: bootstrap(exQ), exL: media(exL), exLIC: bootstrap(exL),
    acierto: aciertos, aciertoIC: wilson(aciertos, filas.length), baseBate: base, peor: compras.length ? Math.min(...compras.map(x => x.d._r['r' + h])) : null,
    filas,
  };
}

const ajuste = cargar(AJUSTE), valid = conValidacion ? cargar(VALID) : [];
let md = `# Backtest growth, fase 2: resultados\n\nProtocolo: [protocolo.md](protocolo.md). Lo genera \`node herramientas/growth-backtest2.mjs${conValidacion ? ' --validacion' : ''}\`. Horizonte principal 24 meses frente al Nasdaq-100 (QQQ). Márgenes al 95 % (Wilson para porcentajes, bootstrap para medias). Versión vigente: **${VIGENTE}**.\n\n`;
const tabla = (titulo, casos) => {
  if (!casos.length) return '';
  const filas = Object.entries(VERSIONES).map(([v, cfg]) => {
    const r = medir(casos, cfg), r12 = medir(casos, cfg, '12');
    const pct = (k, n) => (n ? Math.round((k / n) * 100) + ' %' : '—');
    return `| ${v} | ${r.compras}/${r.n} | ${pct(r.prec, r.compras)} (${r.precIC[0] ?? '—'}-${r.precIC[1] ?? '—'}) | ${fmt(r.exQ)} pp (${fmt(r.exQIC[0])} a ${fmt(r.exQIC[1])}) | ${fmt(r.exL)} pp (${fmt(r.exLIC[0])} a ${fmt(r.exLIC[1])}) | ${pct(r.acierto, r.n)} (${r.aciertoIC[0]}-${r.aciertoIC[1]}) | ${fmt(r.peor)} % | ${pct(r12.prec, r12.compras)} |`;
  });
  const r0 = medir(casos, VERSIONES[VIGENTE]);
  return `## ${titulo}\n\n${r0.n} casos; ${r0.baseBate} (${Math.round(r0.baseBate / r0.n * 100)} %) batieron al QQQ a 24 meses: es el acierto de comprar a ciegas toda la lista.\n\n| Versión | Compras / casos | Precisión de Comprar a 24 m (margen 95 %) | Exceso medio de las compras frente al QQQ | Frente a comprar toda la lista | Acierto total | Peor compra a 24 m | Precisión a 12 m |\n|---|---|---|---|---|---|---|---|\n${filas.join('\n')}\n\n`;
};
md += tabla('Ajuste (cohortes 2019 y 2021)', ajuste);
if (conValidacion) md += tabla('Validación (cohorte 2023, reservada)', valid) + tabla('Todas las cohortes', [...ajuste, ...valid]);
const det = (casos, cfg) => `| Caso | Cohorte | Punt. | Señales | EV/BB | Ponderada | Señal | Motivo | 24 m | QQQ 24 m |\n|---|---|---|---|---|---|---|---|---|---|\n` +
  casos.map(d => { const k = calcular(d, cfg); return `| ${d.empresa} | ${d._cohorte} | ${k.puntuacion} | ${k.n_senales}${k.euforia ? ' (euforia)' : ''} | ${k.ev_bb_ntm} | ${fmt(k.rent_ponderada_pct)} % | **${k.senal}**${k.vigilar ? ' (vigilancia)' : ''} | ${k.motivo} | ${fmt(d._r.r24)} % | ${fmt(d._r.q24)} % |`; }).join('\n');
md += `## Detalle con ${VIGENTE}\n\n${det([...ajuste, ...valid], VERSIONES[VIGENTE])}\n`;
fs.writeFileSync(path.join(dir, 'resultados2.md'), md);
console.log(md.split('## Detalle')[0]);
