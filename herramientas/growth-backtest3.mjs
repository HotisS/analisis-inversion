#!/usr/bin/env node
// Backtest de la candidata v10 (margen EBITDA objetivo) sobre casos3/ (industriales y fabricantes valorados por EV/EBITDA).
// Compara v9 y v10 a 24 meses frente al QQQ (protocolo.md) y al SPY. No escribe nada: imprime las tablas de resultados-v10.md.
//   node herramientas/growth-backtest3.mjs
import fs from 'node:fs';
import path from 'node:path';
import { calcular, VERSIONES } from '../motor/growth.mjs';

const dir = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../verticales/growth/backtest/casos3');
const casos = fs.readdirSync(dir).filter(f => f.endsWith('.json')).sort().map(f => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')));
const fmt = n => (n == null ? '—' : (n > 0 ? '+' : '') + String(Math.round(n * 10) / 10).replace('.', ','));
const vs = ['v9', 'v10'];
const res = casos.map(d => ({ d, k: Object.fromEntries(vs.map(v => [v, calcular(JSON.parse(JSON.stringify(d)), VERSIONES[v])])) }));
console.log('| Caso | Tipo | Punt. | Señales | Margen EBITDA hoy → objetivo | v9: ponderada / base / alcista | v9 | v10: ponderada / base / alcista | v10 | 24 m | QQQ 24 m | SPY 24 m |\n|---|---|---|---|---|---|---|---|---|---|---|---|');
for (const { d, k } of res) {
  const a = k.v9, b = k.v10, m = b.margen_ebitda_pct ?? {};
  console.log(`| ${d.empresa} ${d.fecha.slice(0, 7)} | ${d.caso?.tipo} | ${a.puntuacion} | ${a.n_senales} | ${fmt(m.hoy)} % → ${m.objetivo == null ? '—' : fmt(m.objetivo) + ' %'} | ${fmt(a.rent_ponderada_pct)} / ${fmt(a.rent_base_pct)} / ${fmt(a.casos.alcista.rent_pct)} % | ${a.senal} | ${fmt(b.rent_ponderada_pct)} / ${fmt(b.rent_base_pct)} / ${fmt(b.casos.alcista.rent_pct)} % | ${b.senal}${a.senal !== b.senal ? ' ←' : ''} | ${fmt(d.resultado.rent_24m_pct)} % | ${fmt(d.resultado.qqq_24m_pct)} % | ${fmt(d.resultado.spy_24m_pct)} % |`);
}
console.log('\n| Versión | Compras | Baten al QQQ a 24 m | Baten al SPY a 24 m | Exceso medio de las compras vs QQQ | Acierto total (vs QQQ) | Peor compra |\n|---|---|---|---|---|---|---|');
for (const v of vs) {
  const c = res.filter(x => x.k[v].senal === 'Comprar'), r = x => x.d.resultado;
  const bq = c.filter(x => r(x).rent_24m_pct > r(x).qqq_24m_pct).length, bs = c.filter(x => r(x).rent_24m_pct > r(x).spy_24m_pct).length;
  const ac = res.filter(x => (x.k[v].senal === 'Comprar') === (r(x).rent_24m_pct > r(x).qqq_24m_pct)).length;
  const ex = c.length ? c.reduce((s, x) => s + r(x).rent_24m_pct - r(x).qqq_24m_pct, 0) / c.length : null;
  console.log(`| ${v} | ${c.length}/${res.length} | ${c.length ? bq + '/' + c.length : '—'} | ${c.length ? bs + '/' + c.length : '—'} | ${fmt(ex)} pp | ${ac}/${res.length} | ${c.length ? fmt(Math.min(...c.map(x => r(x).rent_24m_pct))) + ' %' : '—'} |`);
}
console.log('\nMotivos (v10):');
for (const { d, k } of res) console.log(`- ${d.empresa}: ${k.v10.motivo}`);
