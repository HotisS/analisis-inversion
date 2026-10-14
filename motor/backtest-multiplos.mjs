// Backtest de la regla de múltiplos del objetivo a 12 meses (método v2 y sus iteraciones) con los datos que ya
// hay en los informes del repo: precio de cierre de cada ejercicio (`multiplos_historicos.serie`) y BPA y DPA
// reales (`financieros.cuenta`). Sin dependencias, sin red. Solo lectura de `informes/`.
//
//   node motor/backtest-multiplos.mjs [--salida verticales/empresa/backtest/resultados-AAAA-MM-DD.md] [--json ruta] [--detalle]
//
// Qué mide. Para cada empresa y cada cierre de ejercicio t con historia suficiente, la regla «predice» el precio
// un año después: múltiplo × BPA del ejercicio objetivo (t+2, el primero que cierra más de 18 meses después,
// como en el método). El BPA se toma como fue de verdad (previsión perfecta): así el error que queda es solo el
// del múltiplo, que es lo que se quiere calibrar. Con `--bpa-ingenuo` el BPA futuro se estima con el crecimiento
// mediano de los años anteriores, para ver qué regla aguanta mejor un error de previsión.
//
// Variantes (todas con la misma historia disponible en t, nunca datos posteriores):
//   v2        la regla vigente: base = mín(PER actual adelantado, mediana 5 a del PER al cierre sobre el BPA del
//             año); bajista = mínimo 5 a si < base, si no base × 0,85; alcista = máx(media 8 a, base) con techo
//             base × 1,30. Los comparables no entran (no hay historia): el alcista queda algo por debajo del real.
//   it1       igual que v2 pero la historia en la MISMA base que el actual: PER al cierre de cada año sobre el BPA
//             del año SIGUIENTE (adelantado), como el actual.
//   it2       historia adelantada y base a MITAD de camino entre el actual y la mediana (media geométrica), en los
//             dos sentidos; bajista = mín(mínimo 5 a, base × 0,80); alcista = máx(media 8 a, mediana) con techo
//             base × 1,35.
//   it2tope, it2t120, it2t115, it2t110  it2 con tope del base (×1,3, ×1,2, ×1,15, ×1,10 sobre el actual). La regla v3 vigente
//             (14-oct tarde) es it2t110: con ×1,3, en las empresas que cotizan a menos de 2/3 de su mediana el sesgo era +21 %.
//   it2p40, it2m10a, it2sin2021  it2 (tope ×1,3) con otro ancla: percentil 40 de 5 años, mediana de 10 años, mediana sin 2020-21.
//   it2cierre it2 con la historia al cierre (trailing), para saber qué pasa si se aplica a informes antiguos.
//   it2b, it2c reversión solo para las baratas (base a mitad de camino hacia la mediana si el actual está por debajo;
//             base = mediana si está por encima, como v2) con las colas de v2 (0,85 / 1,30) o algo más anchas (0,80 / 1,35).
//   it3       calibrada FUERA DE MUESTRA: el exponente de reversión (0, 0,25, 0,5, 0,75, 1) y los factores del
//             bajista y el alcista se eligen con los años de entrenamiento (horizonte hasta 2021) y se evalúan en
//             los de prueba (2022-2025). Las demás variantes se evalúan también en prueba.
//
// Métricas: sesgo (mediana de predicho/real − 1), error (mediana de |predicho/real − 1|), % de años reales por
// debajo del bajista y por encima del alcista (cobertura de las colas), y la señal: con la regla de compra
// (ponderada ≥ 15 %, base ≥ 12 %) qué rentabilidad real tuvieron las «Comprar» frente al resto.

import { readFileSync, readdirSync, statSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname, isAbsolute } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
const arg = (k, def = null) => (argv.includes(k) ? argv[argv.indexOf(k) + 1] : def);
const hoy = new Date().toISOString().slice(0, 10);
const SALIDA = arg('--salida', `verticales/empresa/backtest/resultados-${hoy}.md`);
const JSON_SALIDA = arg('--json', null);
const DETALLE = argv.includes('--detalle');
const BPA_INGENUO = argv.includes('--bpa-ingenuo');
const ANIO_PRUEBA = 2022; // horizonte (t+1) ≥ este año = prueba; antes = entrenamiento

const n = (v) => (v === null || v === undefined || v === '' || Number.isNaN(+v) ? null : +v);
const pct = (arr, p) => { const a = arr.filter((x) => Number.isFinite(x)).sort((x, y) => x - y); if (!a.length) return null; const i = (a.length - 1) * p; const lo = Math.floor(i), hi = Math.ceil(i); return a[lo] + (a[hi] - a[lo]) * (i - lo); };
const mediana = (a) => pct(a, 0.5);
const media = (a) => { const b = a.filter((x) => Number.isFinite(x)); return b.length ? b.reduce((s, x) => s + x, 0) / b.length : null; };
const f1 = (x, d = 1) => (x === null || x === undefined || !Number.isFinite(x) ? 'n.d.' : (Math.round(x * 10 ** d) / 10 ** d).toFixed(d).replace('.', ','));

// ── 1. Datos: una serie por empresa (la carpeta con más años si hay varias) ──
function cargarEmpresas() {
  const dir = join(raiz, 'informes');
  const porTicker = {};
  for (const carpeta of readdirSync(dir)) {
    const p = join(dir, carpeta);
    if (!statSync(p).isDirectory()) continue;
    const archivos = readdirSync(p).filter((a) => /^datos(-v\d+)?\.json$/.test(a)).sort((a, b) => (n(a.match(/v(\d+)/)?.[1]) ?? 1) - (n(b.match(/v(\d+)/)?.[1]) ?? 1));
    if (!archivos.length) continue;
    let d; try { d = JSON.parse(readFileSync(join(p, archivos.at(-1)), 'utf8')); } catch { continue; }
    const bpa = {}, dpa = {};
    for (const c of d.financieros?.cuenta || []) { const y = +String(c.periodo).replace(/\D/g, ''); if (y && n(c.bpa) !== null) { bpa[y] = n(c.bpa); dpa[y] = n(c.dpa) ?? 0; } }
    const precio = {};
    for (const s of d.multiplos_historicos?.serie || []) { const y = +String(s.anio).replace(/\D/g, ''); if (y && n(s.precio_cierre) && !s.excluir) precio[y] = n(s.precio_cierre); }
    const anios = Object.keys(precio).map(Number).filter((y) => bpa[y] !== undefined).sort((a, b) => a - b);
    if (anios.length < 3) continue;
    const ticker = (d.identificacion?.ticker || carpeta).toUpperCase().replace(/[^A-Z0-9.]/g, '');
    const emp = { ticker, carpeta, anios, bpa, dpa, precio, pais: d.identificacion?.pais || null };
    if (!porTicker[ticker] || porTicker[ticker].anios.length < anios.length) porTicker[ticker] = emp;
  }
  return Object.values(porTicker);
}

// ── 2. Historia disponible en t ──
// PER «al cierre»: precio_y / bpa_y (y ≤ t). PER «adelantado»: precio_y / bpa_{y+1} (y ≤ t−1: el BPA de y+1 ya se conoce en t).
function historia(emp, t, base) {
  const per = [];
  for (const y of emp.anios) {
    if (base === 'cierre') { if (y <= t && emp.bpa[y] > 0) per.push({ y, per: emp.precio[y] / emp.bpa[y] }); }
    else if (y <= t - 1 && emp.bpa[y + 1] > 0) per.push({ y, per: emp.precio[y] / emp.bpa[y + 1] });
  }
  const limpio = per.filter((x) => x.per > 0 && x.per < 150); // sin pérdidas ni burbujas evidentes
  const u5 = limpio.slice(-5).map((x) => x.per), u8 = limpio.slice(-8).map((x) => x.per);
  if (u5.length < 3) return null;
  const u10 = limpio.slice(-10).map((x) => x.per), sin2021 = limpio.filter((x) => x.y < 2020 || x.y > 2021).slice(-5).map((x) => x.per);
  return { mediana_5a: mediana(u5), minimo_5a: Math.min(...u5), media_larga: media(u8), n: u5.length,
    p40_5a: pct(u5, 0.4), mediana_10a: mediana(u10), mediana_sin2021: sin2021.length >= 3 ? mediana(sin2021) : mediana(u5) };
}

// ── 3. Variantes de la regla: devuelven { bajista, base, alcista } (múltiplos) ──
const VARIANTES = {
  v2: { base: 'cierre', regla: (actual, h) => {
    const base = Math.min(actual, h.mediana_5a);
    const bajista = h.minimo_5a < base ? h.minimo_5a : base * 0.85;
    const alcista = Math.min(Math.max(h.media_larga, base), base * 1.3);
    return { bajista, base, alcista };
  } },
  it1: { base: 'adelantado', regla: (actual, h) => VARIANTES.v2.regla(actual, h) },
  it2: { base: 'adelantado', regla: (actual, h) => reversion(actual, h, 0.5, 0.8, 1.35) },
  it2cierre: { base: 'cierre', regla: (actual, h) => reversion(actual, h, 0.5, 0.8, 1.35) },
  it2tope: { base: 'adelantado', regla: (actual, h) => reversion(actual, h, 0.5, 0.8, 1.35, 1.3) },
  it2t120: { base: 'adelantado', regla: (actual, h) => reversion(actual, h, 0.5, 0.8, 1.35, 1.2) },
  it2t115: { base: 'adelantado', regla: (actual, h) => reversion(actual, h, 0.5, 0.8, 1.35, 1.15) },
  it2t110: { base: 'adelantado', regla: (actual, h) => reversion(actual, h, 0.5, 0.8, 1.35, 1.1) },
  it2p40: { base: 'adelantado', regla: (actual, h) => reversion(actual, { ...h, mediana_5a: h.p40_5a }, 0.5, 0.8, 1.35, 1.3) },
  it2m10a: { base: 'adelantado', regla: (actual, h) => reversion(actual, { ...h, mediana_5a: h.mediana_10a }, 0.5, 0.8, 1.35, 1.3) },
  it2sin2021: { base: 'adelantado', regla: (actual, h) => reversion(actual, { ...h, mediana_5a: h.mediana_sin2021 }, 0.5, 0.8, 1.35, 1.3) },
  it2b: { base: 'adelantado', regla: (actual, h) => asimetrica(actual, h, 0.5, 0.85, 1.3) },
  it2c: { base: 'adelantado', regla: (actual, h) => asimetrica(actual, h, 0.5, 0.8, 1.35) },
  it3: { base: 'adelantado', regla: null, calibrar: true },
};
// Reversión solo para las baratas: si el actual está por debajo de la mediana, base a mitad de camino hacia ella;
// si está por encima, base = mediana (como v2). Colas como v2 (0,85 / 1,30) o algo más anchas (0,80 / 1,35).
function asimetrica(actual, h, lambda, fBaj, fAlc) {
  const base = actual < h.mediana_5a ? actual * (h.mediana_5a / actual) ** lambda : h.mediana_5a;
  const bajista = h.minimo_5a < base ? h.minimo_5a : base * fBaj;
  const alcista = Math.max(base, Math.min(Math.max(h.media_larga, h.mediana_5a), base * fAlc));
  return { bajista, base, alcista };
}
// tope: el base no se aleja del actual más de ×tope ni menos de ÷tope (la vuelta a la mediana se reparte en varios años).
function reversion(actual, h, lambda, fBaj, fAlc, tope = null) {
  let base = actual * (h.mediana_5a / actual) ** lambda;
  if (tope) base = Math.min(Math.max(base, actual / tope), actual * tope);
  const bajista = Math.min(h.minimo_5a, base * fBaj);
  const alcista = Math.max(base, Math.min(Math.max(h.media_larga, h.mediana_5a), base * fAlc));
  return { bajista, base, alcista };
}

// ── 4. Observaciones: una por empresa y cierre t con t+1 y t+2 conocidos ──
function observaciones(empresas) {
  const obs = [];
  for (const emp of empresas) {
    for (const t of emp.anios) {
      const y1 = t + 1, y2 = t + 2;
      if (!emp.precio[y1] || !(emp.bpa[y1] > 0) || !(emp.bpa[y2] > 0) || !(emp.precio[t] > 0)) continue;
      // BPA futuro: real (previsión perfecta) o ingenuo (crecimiento mediano de los años anteriores, acotado)
      let bpa1 = emp.bpa[y1], bpa2 = emp.bpa[y2];
      if (BPA_INGENUO) {
        const g = []; for (const y of emp.anios) if (y <= t && emp.bpa[y - 1] > 0 && emp.bpa[y] > 0) g.push(emp.bpa[y] / emp.bpa[y - 1] - 1);
        if (g.length < 2) continue;
        const gm = Math.max(-0.1, Math.min(0.25, mediana(g)));
        bpa1 = emp.bpa[t] * (1 + gm); bpa2 = bpa1 * (1 + gm);
        if (!(emp.bpa[t] > 0)) continue;
      }
      const hC = historia(emp, t, 'cierre'), hA = historia(emp, t, 'adelantado');
      if (!hC || !hA) continue;
      const actual = emp.precio[t] / bpa1; // PER actual adelantado (precio de hoy ÷ nuestro BPA del ejercicio siguiente)
      if (!(actual > 0) || actual > 150) continue;
      obs.push({ ticker: emp.ticker, t, horizonte: y1, precio: emp.precio[t], precioReal: emp.precio[y1], dpa: emp.dpa[y1] || 0, bpa2, actual, hC, hA,
        retReal: (emp.precio[y1] + (emp.dpa[y1] || 0)) / emp.precio[t] - 1, perRealAdelantado: emp.precio[y1] / emp.bpa[y2] });
    }
  }
  return obs;
}

// ── 5. Evaluación de una variante sobre un conjunto de observaciones ──
function evaluar(nombre, variante, obs, pesos = [25, 50, 25]) {
  const filas = [];
  for (const o of obs) {
    const h = variante.base === 'cierre' ? o.hC : o.hA;
    const m = variante.regla(o.actual, h);
    if (!(m.base > 0)) continue;
    const pBaj = m.bajista * o.bpa2, pBase = m.base * o.bpa2, pAlc = m.alcista * o.bpa2;
    const pond = (pBaj * pesos[0] + pBase * pesos[1] + pAlc * pesos[2]) / (pesos[0] + pesos[1] + pesos[2]);
    const ret = (p) => (p + o.dpa) / o.precio - 1;
    filas.push({ ...o, m, pBaj, pBase, pAlc, pond, retBase: ret(pBase), retPond: ret(pond), retBaj: ret(pBaj), retAlc: ret(pAlc),
      errBase: pBase / o.precioReal - 1, errPond: pond / o.precioReal - 1, bajoBajista: o.precioReal < pBaj, sobreAlcista: o.precioReal > pAlc,
      compra: ret(pond) >= 0.15 && ret(pBase) >= 0.12, baseEsActual: Math.abs(m.base - o.actual) < 1e-9 });
  }
  const c = filas.filter((x) => x.compra), nc = filas.filter((x) => !x.compra);
  return {
    nombre, n: filas.length,
    sesgo_base: 100 * mediana(filas.map((x) => x.errBase)), error_base: 100 * mediana(filas.map((x) => Math.abs(x.errBase))),
    sesgo_pond: 100 * mediana(filas.map((x) => x.errPond)), error_pond: 100 * mediana(filas.map((x) => Math.abs(x.errPond))),
    bajo_bajista: 100 * filas.filter((x) => x.bajoBajista).length / filas.length, sobre_alcista: 100 * filas.filter((x) => x.sobreAlcista).length / filas.length,
    base_es_actual: 100 * filas.filter((x) => x.baseEsActual).length / filas.length,
    compras: c.length, compras_pct: 100 * c.length / filas.length,
    ret_compras: 100 * mediana(c.map((x) => x.retReal)), ret_resto: 100 * mediana(nc.map((x) => x.retReal)),
    aciertos_compras: c.length ? 100 * c.filter((x) => x.retReal >= 0.15).length / c.length : null,
    perdidas_compras: c.length ? 100 * c.filter((x) => x.retReal < -0.1).length / c.length : null,
    ret_pred_compras: 100 * mediana(c.map((x) => x.retPond)),
    filas,
  };
}

// ── 6. Calibración fuera de muestra (it3) ──
function calibrar(obsEntrenamiento) {
  let mejor = null;
  for (const lambda of [0, 0.25, 0.5, 0.75, 1]) {
    // con ese exponente, qué factores dejan el 10 % de los años por debajo del bajista y el 10 % por encima del alcista
    const ratios = [];
    for (const o of obsEntrenamiento) { const base = o.actual * (o.hA.mediana_5a / o.actual) ** lambda; ratios.push(o.perRealAdelantado / base); }
    const fBaj = Math.round(pct(ratios, 0.1) * 100) / 100, fAlc = Math.round(pct(ratios, 0.9) * 100) / 100;
    const v = { base: 'adelantado', regla: (a, h) => reversion(a, h, lambda, fBaj, fAlc) };
    const r = evaluar(`λ=${lambda}`, v, obsEntrenamiento);
    const puntuacion = Math.abs(r.sesgo_base) + r.error_base; // sesgo y error del base, a partes iguales
    if (!mejor || puntuacion < mejor.puntuacion) mejor = { lambda, fBaj, fAlc, puntuacion, variante: v };
  }
  return mejor;
}

// ── 7. Ejecución ──
const empresas = cargarEmpresas();
const obs = observaciones(empresas);
const entren = obs.filter((o) => o.horizonte < ANIO_PRUEBA), prueba = obs.filter((o) => o.horizonte >= ANIO_PRUEBA);
const cal = calibrar(entren);
VARIANTES.it3.regla = cal.variante.regla;

const tabla = (conjunto, titulo, pesos) => {
  const filas = Object.entries(VARIANTES).map(([k, v]) => evaluar(k, v, conjunto, pesos));
  const cab = '| Variante | n | Sesgo base | Error base | Sesgo pond. | Error pond. | Real < bajista | Real > alcista | Base = actual | Compras | Rent. real Comprar | Rent. real resto | Comprar con ≥ 15 % | Comprar con < −10 % |\n|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|';
  const cuerpo = filas.map((r) => `| ${r.nombre} | ${r.n} | ${f1(r.sesgo_base)} % | ${f1(r.error_base)} % | ${f1(r.sesgo_pond)} % | ${f1(r.error_pond)} % | ${f1(r.bajo_bajista, 0)} % | ${f1(r.sobre_alcista, 0)} % | ${f1(r.base_es_actual, 0)} % | ${r.compras} (${f1(r.compras_pct, 0)} %) | ${f1(r.ret_compras)} % | ${f1(r.ret_resto)} % | ${f1(r.aciertos_compras, 0)} % | ${f1(r.perdidas_compras, 0)} % |`).join('\n');
  return { md: `### ${titulo} (pesos ${pesos.join('/')})\n\n${cab}\n${cuerpo}\n`, filas };
};

const partes = [];
partes.push(`# Backtest de la regla de múltiplos del objetivo a 12 meses · ${hoy}\n`);
partes.push(`Generado por \`node motor/backtest-multiplos.mjs${BPA_INGENUO ? ' --bpa-ingenuo' : ''}\`. ${empresas.length} empresas con al menos tres cierres con precio y BPA; ${obs.length} observaciones (empresa × cierre t con t+1 y t+2 conocidos): ${entren.length} de entrenamiento (horizonte hasta ${ANIO_PRUEBA - 1}) y ${prueba.length} de prueba (horizonte ${ANIO_PRUEBA}-2025). BPA futuro: ${BPA_INGENUO ? 'ingenuo (crecimiento mediano anterior, entre −10 % y +25 %)' : 'real (previsión perfecta: el error es solo del múltiplo)'}.\n`);
partes.push(`**Cómo leerlo.** Sesgo = mediana de (precio predicho ÷ precio real − 1): negativo, la regla se queda corta. Error = mediana del error absoluto. «Real < bajista» y «Real > alcista» = cuántos años acabaron fuera de las colas (para unas colas de percentil 10 y 90 deberían rondar el 10 %; para 25/50/25, el 25 %). «Base = actual» = cuántas veces el base no supone ningún cambio de múltiplo. Compras = años en que la regla habría dicho Comprar (ponderada ≥ 15 % y base ≥ 12 %, con el BPA ${BPA_INGENUO ? 'ingenuo' : 'real'}); su rentabilidad real (mediana, con dividendo) frente al resto, cuántas acabaron con ≥ 15 % y cuántas perdieron más del 10 %.\n`);
partes.push(`**it3 calibrada en entrenamiento**: exponente de reversión λ = ${cal.lambda}, bajista = base × ${f1(cal.fBaj, 2)} (o el mínimo de 5 años si es menor), alcista = techo base × ${f1(cal.fAlc, 2)}.\n`);
const t1 = tabla(obs, 'Todas las observaciones', [25, 50, 25]); partes.push(t1.md);
const t2 = tabla(prueba, 'Solo prueba (fuera de muestra para it3; mismo subconjunto para todas)', [25, 50, 25]); partes.push(t2.md);
const t3 = tabla(prueba, 'Solo prueba, con pesos 15/70/15', [15, 70, 15]); partes.push(t3.md);
// por tramo: baratas (actual < mediana adelantada) y caras
const baratas = obs.filter((o) => o.actual < o.hA.mediana_5a), caras = obs.filter((o) => o.actual >= o.hA.mediana_5a);
const t4 = tabla(baratas, `Solo empresas por debajo de su mediana adelantada (${baratas.length})`, [25, 50, 25]); partes.push(t4.md);
const t5 = tabla(caras, `Solo empresas por encima de su mediana adelantada (${caras.length})`, [25, 50, 25]); partes.push(t5.md);
// desrateadas: mediana adelantada ≥ 1,5 × actual (lo que pasa en 2026 con software, salud y consumo); es donde el tope manda
const desr = obs.filter((o) => o.hA.mediana_5a / o.actual >= 1.5), desrP = prueba.filter((o) => o.hA.mediana_5a / o.actual >= 1.5);
const t6 = tabla(desr, `Solo desrateadas: mediana adelantada ≥ 1,5 × PER actual (${desr.length})`, [25, 50, 25]); partes.push(t6.md);
const t7 = tabla(desrP, `Solo desrateadas, solo prueba (${desrP.length})`, [25, 50, 25]); partes.push(t7.md);
// lo que pasó de verdad con el múltiplo
const ratioA = obs.map((o) => o.perRealAdelantado / o.actual);
partes.push(`### Lo que hizo el múltiplo adelantado de verdad (PER adelantado en t+1 ÷ PER actual en t)\n\n| | p10 | p25 | Mediana | p75 | p90 |\n|---|--:|--:|--:|--:|--:|\n| Todas (${obs.length}) | ${f1(pct(ratioA, 0.1), 2)} | ${f1(pct(ratioA, 0.25), 2)} | ${f1(pct(ratioA, 0.5), 2)} | ${f1(pct(ratioA, 0.75), 2)} | ${f1(pct(ratioA, 0.9), 2)} |\n| Por debajo de su mediana (${baratas.length}) | ${['0.1', '0.25', '0.5', '0.75', '0.9'].map((p) => f1(pct(baratas.map((o) => o.perRealAdelantado / o.actual), +p), 2)).join(' | ')} |\n| Por encima de su mediana (${caras.length}) | ${['0.1', '0.25', '0.5', '0.75', '0.9'].map((p) => f1(pct(caras.map((o) => o.perRealAdelantado / o.actual), +p), 2)).join(' | ')} |\n`);
const retReal = obs.map((o) => 100 * o.retReal);
partes.push(`Rentabilidad real a un año con dividendo (todas): p10 ${f1(pct(retReal, 0.1))} %, mediana ${f1(pct(retReal, 0.5))} %, p90 ${f1(pct(retReal, 0.9))} %. Años por horizonte: ${JSON.stringify(obs.reduce((s, o) => { s[o.horizonte] = (s[o.horizonte] || 0) + 1; return s; }, {}))}.\n`);
if (DETALLE) {
  partes.push('### Detalle por empresa (it2, todas las observaciones)\n\n| Empresa | t | PER actual | Mediana adel. | Base | Precio | Predicho base | Real | Error base | Rent. real |\n|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|');
  for (const x of t1.filas.find((r) => r.nombre === 'it2').filas) partes.push(`| ${x.ticker} | ${x.t} | ${f1(x.actual)} | ${f1(x.hA.mediana_5a)} | ${f1(x.m.base)} | ${f1(x.precio, 2)} | ${f1(x.pBase, 2)} | ${f1(x.precioReal, 2)} | ${f1(100 * x.errBase)} % | ${f1(100 * x.retReal)} % |`);
  partes.push('');
}
const ruta = (p) => (isAbsolute(p) ? p : join(raiz, p));
mkdirSync(dirname(ruta(SALIDA)), { recursive: true });
writeFileSync(ruta(SALIDA), partes.join('\n'), 'utf8');
if (JSON_SALIDA) writeFileSync(ruta(JSON_SALIDA), JSON.stringify({ fecha: hoy, empresas: empresas.length, observaciones: obs.length, calibracion: { lambda: cal.lambda, bajista: cal.fBaj, alcista: cal.fAlc }, todas: t1.filas.map(({ filas, ...r }) => r), prueba: t2.filas.map(({ filas, ...r }) => r), prueba_15_70_15: t3.filas.map(({ filas, ...r }) => r), desrateadas: t6.filas.map(({ filas, ...r }) => r), desrateadas_prueba: t7.filas.map(({ filas, ...r }) => r) }, null, 1), 'utf8');
console.log(partes.join('\n'));
