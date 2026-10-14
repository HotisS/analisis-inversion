// Pasa un informe value a la regla v3 del objetivo a 12 meses sin rehacer el análisis: construye la historia del PER
// en base ADELANTADA (precio de cierre de cada año ÷ BPA real del año siguiente, como el PER actual) con los cierres y
// el BPA que el propio informe ya trae, completa los cierres que falten con Yahoo (y el tipo de cambio de fin de año si
// la acción cotiza en otra divisa) y el BPA con `notas/cuentas-xbrl.json` si existe (herramientas/cuentas.mjs), y deja
// un `datos-vN.json` nuevo con `valoracion.objetivo_12m.per_historico` en base "adelantado" (la antigua queda en
// `per_historico.v2`) y el `calc` recalculado. No toca el Word ni el resto del informe. Sin dependencias.
//
//   node herramientas/historia-adelantada.mjs <carpeta> [<carpeta> …] [--simular] [--forzar]
//   node herramientas/historia-adelantada.mjs --todas [--simular]
//
// Después: node herramientas/apuntar-12m.mjs --precios --todos (o las carpetas) y node herramientas/seguimiento.mjs.
// Con menos de tres años de PER adelantado el informe se queda en v2 y se dice por qué. En la nube: NODE_USE_ENV_PROXY=1.

import { readFileSync, writeFileSync, existsSync, readdirSync, appendFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { calcularEmpresa } from '../motor/calcular-empresa.mjs';
import { leerMapa, factorDivisa } from './precios.mjs';

const raiz = fileURLToPath(new URL('..', import.meta.url));
const args = process.argv.slice(2);
const SIMULAR = args.includes('--simular'), FORZAR = args.includes('--forzar'), TODAS = args.includes('--todas');
const hoy = new Date().toISOString().slice(0, 10);
const n = (v) => (v === null || v === undefined || v === '' || Number.isNaN(+v) ? null : +v);
const r1 = (x) => Math.round(x * 10) / 10;
const mediana = (a) => { const s = [...a].sort((x, y) => x - y); const m = s.length >> 1; return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };
const anioDe = (p) => { const m = String(p).match(/(\d{4})(?!.*\d{4})/); return m ? +m[1] : null; };
const espera = (ms) => new Promise((r) => setTimeout(r, ms));

const carpetas = TODAS
  ? readdirSync(`${raiz}informes`, { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name).sort()
  : args.filter((a) => !a.startsWith('--')).map((a) => a.replace(/\/$/, '').replace(/^informes\//, ''));
if (!carpetas.length) { console.error('Indica carpetas de informes/ o --todas'); process.exit(1); }
const mapa = leerMapa();
const porCarpeta = Object.fromEntries(Object.entries(mapa.empresas || {}).map(([k, e]) => [e.carpeta, { clave: k, ...e }]));

function ultimo(dir) {
  const arch = readdirSync(dir);
  const vs = arch.map((f) => f.match(/^datos-v(\d+)\.json$/)).filter(Boolean).sort((a, b) => b[1] - a[1]);
  const f = vs.length ? vs[0][0] : arch.includes('datos.json') ? 'datos.json' : null;
  return f ? { archivo: f, version: vs.length ? +vs[0][1] : 1 } : null;
}

// Cierres mensuales de Yahoo (12 años): { 'AAAA-MM': cierre }
const cacheMensual = new Map();
async function mensual(simbolo) {
  if (cacheMensual.has(simbolo)) return cacheMensual.get(simbolo);
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(simbolo)}?range=12y&interval=1mo`;
  let res = null;
  for (let i = 0; i < 4 && !res; i++) {
    try {
      const r = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }, signal: AbortSignal.timeout(30000) });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const j = await r.json(); const x = j.chart?.result?.[0];
      if (!x?.timestamp) throw new Error('sin datos');
      const q = x.indicators.quote[0]; res = { divisa: x.meta.currency, meses: {} };
      x.timestamp.forEach((t, i) => { if (q.close[i] != null) res.meses[new Date((t + (x.meta.gmtoffset || 0)) * 1000).toISOString().slice(0, 7)] = q.close[i]; });
    } catch (e) { if (i === 3) { console.error(`  Yahoo ${simbolo}: ${e.message}`); res = { error: e.message, meses: {} }; } else await espera(1500 * (i + 1)); }
  }
  cacheMensual.set(simbolo, res);
  return res;
}

async function procesar(carpeta) {
  const dir = `${raiz}informes/${carpeta}`;
  const u = ultimo(dir);
  if (!u) return { carpeta, estado: 'sin datos' };
  const d = JSON.parse(readFileSync(`${dir}/${u.archivo}`, 'utf8'));
  const o = d.valoracion?.objetivo_12m;
  if (!o) return { carpeta, estado: 'sin objetivo_12m' };
  const ph = o.per_historico || {};
  if (/^adelantad/i.test(String(ph.base || '')) && !FORZAR) return { carpeta, estado: 'ya adelantado', version: 'v3' };
  const meta = d.meta || {}, mesCierre = n(meta.cierre_ejercicio_mes) || 12;
  const inicio = meta.etiqueta_ejercicio ? /inicio/i.test(meta.etiqueta_ejercicio) : mesCierre <= 3;
  // BPA real por ejercicio: el informe primero; el XBRL (cuentas.mjs) para los años que el informe no tiene.
  const bpa = {}, origenBpa = {};
  for (const c of d.financieros?.cuenta || []) { const y = anioDe(c.periodo); if (y && n(c.bpa) !== null) { bpa[y] = n(c.bpa); origenBpa[y] = 'informe'; } }
  const xbrl = `${dir}/notas/cuentas-xbrl.json`;
  if (existsSync(xbrl)) {
    try {
      const x = JSON.parse(readFileSync(xbrl, 'utf8'));
      const ref = Object.values(bpa).map(Math.abs).filter((v) => v > 0);
      const refMin = ref.length ? Math.min(...ref) : null, refMax = ref.length ? Math.max(...ref) : null;
      for (const f of x.financieros?.cuenta || []) {
        const y = anioDe(f.periodo) - (inicio && mesCierre < 12 ? 1 : 0), v = n(f.bpa);
        if (!y || v === null || bpa[y] !== undefined) continue;
        // Un BPA de otro orden de magnitud (split no reexpresado, otra divisa) no entra.
        if (refMin !== null && v > 0 && (v < refMin / 4 || v > refMax * 4)) continue;
        bpa[y] = v; origenBpa[y] = 'XBRL';
      }
    } catch { /* se sigue sin XBRL */ }
  }
  const precio = {}, origenPrecio = {};
  for (const s of d.multiplos_historicos?.serie || []) { const y = anioDe(s.anio); if (y && n(s.precio_cierre) && !s.excluir) { precio[y] = n(s.precio_cierre); origenPrecio[y] = 'informe'; } }
  // Cierres que faltan: años con BPA del siguiente conocido y sin precio → Yahoo (cierre del mes de cierre del ejercicio),
  // pasados a la divisa de las cuentas con el tipo de cambio de ese mes si la acción cotiza en otra.
  const faltan = Object.keys(bpa).map(Number).filter((y) => bpa[y + 1] > 0 && precio[y] === undefined).sort();
  const sim = porCarpeta[carpeta];
  const avisos = [];
  if (faltan.length && sim?.yahoo) {
    const divisa = meta.divisa, cot = meta.divisa_cotizacion || meta.divisa;
    const m = await mensual(sim.yahoo);
    let fx = null, fxFactor = 1;
    const fac = factorDivisa(m.divisa, cot);
    if (m.error) avisos.push(`Yahoo sin histórico de ${sim.yahoo}`);
    else if (fac === null) avisos.push(`Yahoo cotiza ${sim.yahoo} en ${m.divisa} y el informe en ${cot}: no se completan cierres`);
    else {
      const cotMayus = String(cot).toUpperCase() === 'GBP' || cot === 'GBp' ? 'GBP' : cot;
      if (String(divisa).toUpperCase() !== cotMayus.toUpperCase()) { fx = await mensual(`${cotMayus}${divisa}=X`); if (fx.error) avisos.push(`sin tipo de cambio ${cotMayus}${divisa} en Yahoo: no se completan cierres`); }
      if (!fx?.error) {
        for (const y of faltan) {
          const fin = `${inicio && mesCierre < 12 ? y + 1 : y}-${String(mesCierre).padStart(2, '0')}`;
          const c = m.meses[fin];
          const t = fx ? fx.meses[fin] : 1;
          // Londres cotiza en peniques: a libras antes de aplicar el cambio libra → divisa de las cuentas.
          const enCot = c * fac, enLibras = cot === 'GBp' ? enCot / 100 : enCot;
          if (c && t) { precio[y] = (fx ? enLibras : enCot) * t; origenPrecio[y] = fx ? `Yahoo × ${cotMayus}${divisa} ${fin}` : 'Yahoo'; }
        }
      }
    }
  } else if (faltan.length) avisos.push(`sin símbolo de Yahoo para completar ${faltan.length} cierres`);
  // Contraste de base: el PER actual del informe es precio ÷ BPA propio del año siguiente. Si ese BPA implica un
  // crecimiento anual fuera de [−30 %, +60 %] desde el último BPA publicado, el analista usó otra base (BPA ajustado
  // de la empresa, otra divisa, split sin reexpresar) y la historia construida con el BPA publicado no es comparable:
  // el informe se queda en v2 y se marca para revisarlo a mano.
  const aniosReales = Object.keys(bpa).map(Number).filter((y) => origenBpa[y] === 'informe');
  const ult = aniosReales.length ? Math.max(...aniosReales) : null;
  const precioInf = n(d.identificacion?.precio), actual = n(ph.actual), ejObj = anioDe(o.ejercicio);
  let contraste = 'sin contraste (falta el PER actual, el precio o el BPA publicado)';
  if (ult !== null && bpa[ult] > 0 && precioInf > 0 && actual > 0 && ejObj) {
    const bpaSig = precioInf / actual, adelante = Math.max(1, ejObj - 1 - ult);
    const cagr = (bpaSig / bpa[ult]) ** (1 / adelante) - 1;
    contraste = `BPA propio del año siguiente ${r1(bpaSig * 100) / 100} frente a ${bpa[ult]} publicado en ${ult} (${cagr >= 0 ? '+' : ''}${r1(cagr * 100)} % anual)`;
    if (cagr < -0.3 || cagr > 0.6) return { carpeta, estado: `queda en v2: base de BPA distinta de la publicada (${contraste}); revisar a mano`, version: 'v2', revisar: true };
  }
  // Historia adelantada
  const filas = Object.keys(precio).map(Number).filter((y) => bpa[y + 1] !== undefined).sort((a, b) => a - b)
    .map((y) => ({ anio: y, precio: precio[y], bpa_siguiente: bpa[y + 1], per: bpa[y + 1] > 0 ? precio[y] / bpa[y + 1] : null, origen: `${origenPrecio[y]}/${origenBpa[y + 1]}` }));
  const positivas = filas.filter((f) => f.per !== null && f.per > 0 && f.per < 150);
  // Años atípicos (BPA hundido o disparado por algo puntual): PER a más de 3 veces o menos de un tercio de la mediana
  // del resto, solo con cinco años o más (con cuatro, un año barato de verdad —Meta en 2022— saldría excluido).
  for (const f of positivas) {
    const resto = positivas.filter((g) => g !== f).map((g) => g.per);
    if (resto.length >= 4) { const m = mediana(resto); if (f.per > 3 * m || f.per < m / 3) f.atipico = true; }
  }
  const limpias = positivas.filter((f) => !f.atipico);
  const u5 = limpias.slice(-5), u8 = limpias.slice(-8);
  const detalle = filas.map((f) => `${f.anio} ${f.per === null ? 'pérdidas' : r1(f.per) + 'x'}${f.per !== null && f.per >= 150 ? ' (excluido, ≥150x)' : ''}${f.atipico ? ' (excluido, atípico)' : ''}${f.origen !== 'informe/informe' ? ` [${f.origen}]` : ''}`).join('; ');
  if (u5.length < 3) return { carpeta, estado: `queda en v2: ${u5.length} años de PER adelantado (${detalle || 'sin cierres con BPA del año siguiente'})${avisos.length ? '; ' + avisos.join('; ') : ''}`, version: 'v2', anios: u5.length };
  const nuevo = {
    actual: ph.actual ?? null, mediana_5a: r1(mediana(u5.map((f) => f.per))), minimo_5a: r1(Math.min(...u5.map((f) => f.per))), media_larga: r1(u8.reduce((s, f) => s + f.per, 0) / u8.length),
    base: 'adelantado', anios: u5.length,
    excluidos: `Historia ADELANTADA (precio de cierre de cada año ÷ BPA real del año siguiente, como el PER actual), construida el ${hoy} con los cierres y el BPA del informe${filas.some((f) => /Yahoo/.test(f.origen)) ? ' y cierres de Yahoo Finance para los años sin cierre' : ''}${filas.some((f) => /XBRL/.test(f.origen)) ? ' y el BPA del XBRL del regulador (notas/cuentas-xbrl.json)' : ''}: ${detalle}. Sin años de pérdidas, PER ≥ 150x ni atípicos (a más de 3 veces o menos de un tercio de la mediana del resto, con cinco años o más); mediana y mínimo de los últimos ${u5.length} años, media larga de ${u8.length}. Contraste de base: ${contraste}.${u5.length < 5 ? ' Historia corta (menos de cinco años).' : ''} Historia al cierre anterior (v2): ${String(ph.excluidos || 'sin detalle').slice(0, 600)}`,
    v2: { actual: ph.actual ?? null, mediana_5a: ph.mediana_5a ?? null, minimo_5a: ph.minimo_5a ?? null, media_larga: ph.media_larga ?? null, base: 'cierre' },
  };
  const res = { carpeta, estado: 'v3', version: 'v3', anios: u5.length, contraste, antes: { mediana: ph.mediana_5a, minimo: ph.minimo_5a, larga: ph.media_larga }, despues: { mediana: nuevo.mediana_5a, minimo: nuevo.minimo_5a, larga: nuevo.media_larga }, avisos };
  if (SIMULAR) return res;
  d.valoracion.objetivo_12m.per_historico = nuevo;
  const calculado = calcularEmpresa(d);
  const archivo = `datos-v${u.version + 1}.json`;
  writeFileSync(`${dir}/${archivo}`, JSON.stringify(calculado, null, 2) + '\n');
  appendFileSync(`${dir}/diario.md`, `\n- ${hoy}: ${archivo} = regla de múltiplos v3 con la historia del PER adelantada construida por herramientas/historia-adelantada.mjs (${u5.length} años; mediana ${nuevo.mediana_5a}x, mínimo ${nuevo.minimo_5a}x, media larga ${nuevo.media_larga}x; antes v2 ${ph.mediana_5a}x/${ph.minimo_5a}x/${ph.media_larga}x). Solo cambian el objetivo a 12 meses y la señal; el Word no se regenera.\n`);
  res.archivo = archivo;
  res.senal = calculado.calc?.recomendacion?.regla ?? null;
  return res;
}

const resumen = [];
for (const c of carpetas) {
  try { resumen.push(await procesar(c)); } catch (e) { resumen.push({ carpeta: c, estado: `ERROR: ${e.message}` }); }
  const r = resumen.at(-1);
  console.log(`${c.padEnd(36)} ${r.estado === 'v3' ? `v3 (${r.anios} años): mediana ${r.antes.mediana}x → ${r.despues.mediana}x, mínimo ${r.antes.minimo}x → ${r.despues.minimo}x, larga ${r.antes.larga}x → ${r.despues.larga}x${r.archivo ? ` → ${r.archivo}` : ''}${r.avisos?.length ? ' | ' + r.avisos.join('; ') : ''}` : r.estado}`);
}
const v3 = resumen.filter((r) => r.estado === 'v3').length, ya = resumen.filter((r) => r.estado === 'ya adelantado').length, v2 = resumen.filter((r) => r.version === 'v2').length;
console.log(`\n${resumen.length} carpetas: ${v3} pasan a v3${SIMULAR ? ' (simulado, sin escribir)' : ''}, ${ya} ya estaban en v3, ${v2} se quedan en v2, ${resumen.length - v3 - ya - v2} sin objetivo o con error.`);
