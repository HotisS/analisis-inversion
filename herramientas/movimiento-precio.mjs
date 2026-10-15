// Repaso de movimiento de precio (petición del usuario, 15-oct-2026): variación a 1, 6 y 12 meses, distancia a máximo y
// mínimo de 52 semanas y días de caída de −5 % o más en el último año, para explicar cada caída con su causa antes de
// dar una señal o proponer una orden. Datos diarios gratuitos de Yahoo. Sin dependencias.
//
//   NODE_USE_ENV_PROXY=1 node herramientas/movimiento-precio.mjs UMG.AS RWAY.MI AUTO.L
const simbolos = process.argv.slice(2);
if (!simbolos.length) { console.error('Uso: node herramientas/movimiento-precio.mjs <símbolo Yahoo> …'); process.exit(1); }
const DIA = 86400000, ahora = Date.now();
for (const s of simbolos) {
  const r = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(s)}?range=2y&interval=1d`, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const res = (await r.json())?.chart?.result?.[0];
  if (!res) { console.log(`${s}: sin datos`); continue; }
  const cierres = res.indicators.quote[0].close;
  const d = res.timestamp.map((t, i) => [new Date(t * 1000).toISOString().slice(0, 10), cierres[i]]).filter((x) => x[1]);
  const ultimo = d.at(-1);
  const hace = (dias) => { let p = d[0]; for (const x of d) if (Date.parse(x[0]) <= ahora - dias * DIA) p = x; return p; };
  const pct = (a, b) => `${((a / b - 1) * 100).toFixed(1)} %`;
  const anio = d.filter((x) => Date.parse(x[0]) >= ahora - 365 * DIA);
  const max = anio.reduce((a, b) => (b[1] > a[1] ? b : a)), min = anio.reduce((a, b) => (b[1] < a[1] ? b : a));
  const caidas = [];
  for (let i = 1; i < d.length; i++) {
    const v = d[i][1] / d[i - 1][1] - 1;
    if (v <= -0.05 && Date.parse(d[i][0]) >= ahora - 365 * DIA) caidas.push(`${d[i][0]} ${(v * 100).toFixed(1)} %`);
  }
  console.log(`${s} · ${ultimo[0]} ${ultimo[1].toFixed(2)} ${res.meta.currency}`);
  console.log(`  1 mes ${pct(ultimo[1], hace(30)[1])} · 6 meses ${pct(ultimo[1], hace(182)[1])} · 12 meses ${pct(ultimo[1], hace(365)[1])}`);
  console.log(`  Máximo 52 s ${max[1].toFixed(2)} (${max[0]}): ${pct(ultimo[1], max[1])} · mínimo ${min[1].toFixed(2)} (${min[0]}): +${((ultimo[1] / min[1] - 1) * 100).toFixed(1)} %`);
  console.log(`  Caídas de −5 % o más en un día (explicar cada una): ${caidas.join(', ') || 'ninguna'}`);
}
