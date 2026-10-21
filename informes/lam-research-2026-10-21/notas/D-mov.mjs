// Nota D: movimiento con el cierre del 21-oct (movimiento.mjs tenía en caché el del 20-oct).
import { readFileSync } from 'node:fs';
import { metricas } from '../../../herramientas/movimiento.mjs';
const j = JSON.parse(readFileSync(new URL('./docs/yahoo_LRCX.json', import.meta.url), 'utf8'));
const r = j.chart ? j.chart.result[0] : j;
const c = r.indicators.quote[0].close;
const pts = r.timestamp.map((t, i) => [new Date(t * 1000).toISOString().slice(0, 10), c[i]]).filter((p) => Number.isFinite(p[1]) && p[1] > 0);
const corte = pts.filter((p) => p[0] >= '2021-10-21');
console.log(JSON.stringify(metricas(corte, '2026-10-21'), null, 1));
