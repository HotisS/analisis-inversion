// Vertical «Cartera real» (14-oct-2026, pedido del usuario: «una cuarta vertical más específica para monitorizar la
// cartera, en lugar de ser más ad hoc… compras históricas, seguir mi cartera, ver rentabilidades»). Método y archivos:
// verticales/cartera/metodo.md. Sin dependencias.
//
// Los datos de la cartera (operaciones, precios de compra, importes, cuentas) NO van en este repo, que es público: viven
// en la carpeta privada del proyecto, /mnt/project-files/cartera/real/ (o la que diga CARTERA_REAL). Aquí solo el código.
//
//   NODE_USE_ENV_PROXY=1 node herramientas/cartera-real.mjs
//       foto de hoy: posiciones, precio medio, peso, liquidez, rentabilidad (desde la compra, del año, de la semana) frente
//       al índice mundial, lo previsto frente a lo real, acierto de las señales del escáner y avisos → ultimo.md
//       (y añade la foto del día a historial.json)
//   … --semanal          lo mismo y además informe-semanal-AAAA-MM-DD.md y mensaje-semanal.md (el informe del domingo:
//                        lo llama la rutina del escáner)
//   … --partida          primera carga sin historial del broker: crea operaciones.csv desde escaner/cartera.json con el
//                        último cierre como «precio de partida» (no es el precio de compra; se sustituye al importar IBKR)
//   … --importar-flex <archivo.csv> [--cuenta cuenta-2]
//                        importa el informe de operaciones de IBKR (Flex Query en CSV: Trades, Cash Transactions y
//                        Open Positions) a operaciones.csv; sustituye la partida de esa cuenta
//   … --importar-json <archivo.json> [--cuenta cuenta-1]
//                        lo mismo con lo que devuelve el conector de IBKR guardado en JSON (formato en metodo.md)
//   … --foto-broker <archivo.json>
//                        cuadra títulos y liquidez con la foto del broker (posiciones de IBKR) y avisa si no coinciden
//   … --sin-red          no pide precios (usa la caché del día); para probar
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const RAIZ = fileURLToPath(new URL('..', import.meta.url));
const DATOS = process.env.CARTERA_REAL || '/mnt/project-files/cartera/real';
const argv = process.argv.slice(2);
const opt = (k) => (argv.includes(k) ? argv[argv.indexOf(k) + 1] : null);
const leer = (p, def = null) => (existsSync(p) ? JSON.parse(readFileSync(p, 'utf8')) : def);
const guardar = (p, x) => writeFileSync(p, JSON.stringify(x, null, 1) + '\n');
const num = (v) => (v === null || v === undefined || v === '' || Number.isNaN(Number(v)) ? null : Number(v));
const r = (x, d = 1) => (x === null || x === undefined || !Number.isFinite(x) ? null : Math.round(x * 10 ** d) / 10 ** d);
const f = (x, d = 1) => (x === null || x === undefined || !Number.isFinite(x) ? '—' : x.toLocaleString('es-ES', { minimumFractionDigits: d, maximumFractionDigits: d }));
const fp = (x) => { if (x === null || x === undefined || !Number.isFinite(x)) return '—'; const y = Math.round(x * 10) / 10 || 0; return `${y > 0 ? '+' : ''}${f(y, 1)} %`; };
const fe = (x) => (x === null || x === undefined ? '—' : `${f(x, 0)} €`);
const fPrecio = (x) => f(x, x >= 1000 ? 0 : 2);
const dias = (a, b) => Math.round((new Date(b) - new Date(a)) / 864e5);
const masDias = (fecha, n) => new Date(new Date(fecha).getTime() + n * 864e5).toISOString().slice(0, 10);
const madrid = (d = new Date()) => {
  const p = Object.fromEntries(new Intl.DateTimeFormat('es-ES', { timeZone: 'Europe/Madrid', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(d).map((x) => [x.type, x.value]));
  return { fecha: `${p.year}-${p.month}-${p.day}`, hora: `${p.hour}:${p.minute}` };
};
const fechaCorta = (s) => { const [a, m, d] = s.split('-'); return `${+d}-${['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'][+m - 1]}${a === String(new Date().getFullYear()) ? '' : `-${a}`}`; };

const REGLAS = leer(join(RAIZ, 'escaner/reglas.json'));
const MAPA = leer(join(RAIZ, 'verticales/empresa/simbolos.json'), { empresas: {}, extra: {} });
const REV = leer(join(RAIZ, 'verticales/empresa/objetivo12m-revisados.json'), { revisados: {} }).revisados;
const INDICE = REGLAS.indice_referencia; // IWDA.AS, en euros
const RUTA = { ops: join(DATOS, 'operaciones.csv'), hist: join(DATOS, 'historial.json'), prev: join(DATOS, 'previsiones.json'), foto: join(DATOS, 'foto-broker.json') };

// ───────────────────────── Operaciones (operaciones.csv) ─────────────────────────
// fecha;cuenta;tipo;clave;simbolo;vertical;titulos;precio;divisa;comision;importe_eur;nota
// tipo: partida | arrastre | compra | venta | dividendo | comision | interes | ingreso | retirada | saldo  (clave «EUR» = liquidez)
const COLS = ['fecha', 'cuenta', 'tipo', 'clave', 'simbolo', 'vertical', 'titulos', 'precio', 'divisa', 'comision', 'importe_eur', 'nota'];
function leerOps() {
  if (!existsSync(RUTA.ops)) return [];
  return readFileSync(RUTA.ops, 'utf8').split(/\r?\n/).filter((l) => l.trim() && !l.startsWith('#') && !l.startsWith('fecha;'))
    .map((l) => { const c = l.split(';'); const o = Object.fromEntries(COLS.map((k, i) => [k, c[i] ?? ''])); for (const k of ['titulos', 'precio', 'comision', 'importe_eur']) o[k] = num(o[k]); return o; })
    .sort((a, b) => a.fecha.localeCompare(b.fecha));
}
function escribirOps(ops) {
  mkdirSync(DATOS, { recursive: true });
  const cab = `# Operaciones de la cartera real (privado: no subir al repo). Lo lee herramientas/cartera-real.mjs.\n# importe_eur: lo que salió (compra, comisión) o entró (venta, dividendo neto) en euros; si falta, se calcula con el cambio del día.\n${COLS.join(';')}\n`;
  writeFileSync(RUTA.ops, cab + ops.sort((a, b) => a.fecha.localeCompare(b.fecha)).map((o) => COLS.map((k) => (o[k] ?? '')).join(';')).join('\n') + '\n');
}

// ───────────────────────── Precios y cambios (Yahoo, cierres diarios) ─────────────────────────
const UA = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' };
const espera = (ms) => new Promise((res) => setTimeout(res, ms));
const SERIES = new Map();
const CACHE = join(process.env.TEMP || tmpdir(), 'analisis-inversion', 'cartera-real');
// Todas las series empiezan en la misma fecha (la primera operación o el 31-dic anterior, lo que sea antes), para que los
// desdoblamientos (splits) se vean enteros y una sola descarga sirva para todo.
let DESDE = `${new Date().getFullYear() - 1}-12-31`;
async function serie(simbolo) {
  const desde = DESDE, k = `${simbolo}|${desde}`;
  if (SERIES.has(k)) return SERIES.get(k);
  const archivo = join(CACHE, `${simbolo.replace(/[^\w.=-]/g, '_')}-${desde}-${madrid().fecha}.json`);
  let s = argv.includes('--sin-red') || existsSync(archivo) ? leer(archivo) : null;
  if (!s) {
    const p1 = Math.floor(new Date(masDias(desde, -10)).getTime() / 1000), p2 = Math.floor(Date.now() / 1000) + 86400;
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(simbolo)}?period1=${p1}&period2=${p2}&interval=1d&events=div,split`;
    for (let i = 0; ; i++) {
      try {
        const res = await fetch(url, { headers: UA, signal: AbortSignal.timeout(30000) });
        if (res.status === 404) { s = { error: 'símbolo desconocido' }; break; }
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const x = (await res.json()).chart?.result?.[0];
        if (!x?.timestamp) { s = { error: 'sin datos' }; break; }
        const m = x.meta, q = x.indicators.quote[0];
        const fecha = (t) => new Date((t + (m.gmtoffset || 0)) * 1000).toISOString().slice(0, 10);
        s = { divisa: m.currency, ahora: m.regularMarketPrice ?? null, hora_ahora: m.regularMarketTime ? new Date(m.regularMarketTime * 1000).toISOString() : null,
          cierres: x.timestamp.map((t, j) => [fecha(t), q.close[j]]).filter(([, c]) => c != null),
          splits: Object.values(x.events?.splits || {}).map((e) => [fecha(e.date), e.numerator / e.denominator]) };
        break;
      } catch (e) { if (i >= 4) { s = { error: e.message }; break; } await espera(1500 * (i + 1)); }
    }
    if (!s.error) { mkdirSync(CACHE, { recursive: true }); guardar(archivo, s); }
  }
  SERIES.set(k, s);
  return s;
}
// Cierre en una fecha (el último cierre igual o anterior); sin fecha, el precio de ahora.
function precioEn(s, fecha) {
  if (!s || s.error) return null;
  if (!fecha) return s.ahora ?? s.cierres.at(-1)?.[1] ?? null;
  let p = null;
  for (const [d, c] of s.cierres) { if (d > fecha) break; p = c; }
  return p ?? s.cierres[0]?.[1] ?? null;
}
// Euros por unidad de la divisa (peniques de Londres incluidos).
async function eurPor(divisa, fecha) {
  if (!divisa) return null;
  if (divisa === 'GBp' || divisa === 'GBX') return (await eurPor('GBP', fecha)) / 100;
  const d = divisa.toUpperCase();
  if (d === 'EUR') return 1;
  const p = precioEn(await serie(`EUR${d}=X`), fecha);
  return p ? 1 / p : null;
}

// ───────────────────────── Símbolos y previsiones ─────────────────────────
const GROWTH = (() => {
  const m = {};
  try {
    for (const c of readdirSync(join(RAIZ, 'informes-growth'))) {
      const d = leer(join(RAIZ, 'informes-growth', c, 'datos.json'));
      if (d?.ticker && (!m[d.ticker] || m[d.ticker].fecha < d.fecha)) m[d.ticker] = { carpeta: c, fecha: d.fecha, nombre: d.empresa, objetivo_12m: num(d.calc?.objetivo_12m), divisa: d.moneda, precio_informe: num(d.precio) };
    }
  } catch { /* nada */ }
  return m;
})();

const yahooDe = (clave, simbolo) => simbolo || MAPA.empresas?.[clave]?.yahoo || MAPA.extra?.[clave]?.yahoo || clave;
const nombreDe = (clave) => MAPA.empresas?.[clave]?.nombre || MAPA.extra?.[clave]?.nombre || GROWTH[clave]?.nombre || clave;
// Objetivo a 12 meses del método vigente, en la divisa de cotización (value: objetivo12m-revisados.json; growth: informe).
function objetivoDe(clave, vertical) {
  if (vertical === 'growth' || (!REV[clave] && GROWTH[clave])) { const g = GROWTH[clave]; return g?.objetivo_12m ? { objetivo: g.objetivo_12m, fuente: `informes-growth/${g.carpeta}`, fecha: g.fecha } : null; }
  const v = REV[clave];
  return v?.objetivo_12m ? { objetivo: num(v.objetivo_12m), fuente: `informes/${v.carpeta}`, fecha: v.fecha, senal: v.senal } : null;
}

// ───────────────────────── Reconstrucción de la cartera ─────────────────────────
// Recorre las operaciones hasta una fecha (incluida). Coste medio en euros (al cambio del día de cada compra) y en divisa.
// Tipos especiales: «partida» (foto inicial a precio de cierre, sin historia), «arrastre» (títulos comprados antes de lo
// que alcanza el historial del broker: coste conocido, fecha no) y «saldo» (liquidez de una cuenta en una fecha, en euros;
// manda sobre lo calculado, porque los cambios de divisa y los ingresos no siempre llegan).
async function reconstruir(ops, hasta = null) {
  const pos = new Map();
  const caja = new Map(); // liquidez por cuenta, en euros
  const mover = (cuenta, eur) => caja.set(cuenta || 'todas', (caja.get(cuenta || 'todas') ?? 0) + eur);
  const flujos = []; // aportaciones de fuera (+) y retiradas (−), en euros: para comparar con el índice
  for (let o of ops) {
    if (hasta && o.fecha > hasta) break;
    const esCaja = o.clave === 'EUR' || !o.clave;
    const fx = o.divisa && !esCaja ? await eurPor(o.divisa, o.fecha) : 1;
    if (!esCaja && o.titulos !== null) {
      // Yahoo da los cierres ajustados por desdoblamientos: los títulos se pasan a «títulos de hoy» (y el precio al revés).
      const k = factorSplit(await serie(yahooDe(o.clave, o.simbolo)), o.fecha);
      if (k !== 1) o = { ...o, titulos: o.titulos * k, precio: o.precio !== null ? o.precio / k : null };
    }
    const bruto = o.titulos !== null && o.precio !== null ? o.titulos * o.precio * (fx ?? 0) : null;
    const com = (o.comision ?? 0) * (esCaja ? 1 : fx ?? 1); // la comisión va en la divisa de la operación
    if (esCaja) {
      const imp = o.importe_eur ?? 0;
      if (o.tipo === 'saldo') caja.set(o.cuenta || 'todas', imp);
      else if (o.tipo === 'partida' || o.tipo === 'ingreso') { mover(o.cuenta, imp); flujos.push({ fecha: o.fecha, eur: imp }); }
      else if (o.tipo === 'retirada') { mover(o.cuenta, -Math.abs(imp)); flujos.push({ fecha: o.fecha, eur: -Math.abs(imp) }); }
      else if (o.tipo === 'interes') mover(o.cuenta, imp);
      else if (o.tipo === 'comision') mover(o.cuenta, -Math.abs(imp));
      continue;
    }
    const p = pos.get(o.clave) || { clave: o.clave, simbolo: yahooDe(o.clave, o.simbolo), vertical: o.vertical || (GROWTH[o.clave] && !REV[o.clave] ? 'growth' : 'value'), divisa: o.divisa,
      titulos: 0, coste_eur: 0, coste_div: 0, invertido_eur: 0, ventas_eur: 0, dividendos_eur: 0, comisiones_eur: 0, primera: o.fecha, flujos: [], cuentas: new Set(), partida: false, arrastre: false };
    if (o.cuenta) p.cuentas.add(o.cuenta);
    if (o.tipo === 'partida' || o.tipo === 'compra' || o.tipo === 'arrastre') {
      const imp = o.importe_eur ?? (bruto + com);
      p.titulos += o.titulos; p.coste_eur += imp; p.coste_div += o.titulos * o.precio; p.invertido_eur += imp; p.comisiones_eur += com;
      p.flujos.push({ fecha: o.fecha, eur: imp }); p.ultima = o.fecha;
      if (o.tipo === 'partida') { p.partida = true; flujos.push({ fecha: o.fecha, eur: imp }); }
      else if (o.tipo === 'arrastre') p.arrastre = true;
      else mover(o.cuenta, -imp);
    } else if (o.tipo === 'venta') {
      const t = Math.abs(o.titulos), parte = p.titulos > 0 ? Math.min(t / p.titulos, 1) : 1;
      const imp = o.importe_eur ?? (bruto - com);
      p.coste_eur -= p.coste_eur * parte; p.coste_div -= p.coste_div * parte; p.titulos -= t;
      p.ventas_eur += imp; p.comisiones_eur += com; p.flujos.push({ fecha: o.fecha, eur: -imp }); mover(o.cuenta, imp);
      if (p.titulos < 1e-6) { p.titulos = 0; p.coste_eur = 0; p.coste_div = 0; }
    } else if (o.tipo === 'dividendo') {
      const imp = o.importe_eur ?? ((o.precio ?? 0) * (o.titulos ?? 1) * (fx ?? 0));
      p.dividendos_eur += imp; mover(o.cuenta, imp);
    }
    pos.set(o.clave, p);
  }
  const liquidez = [...caja.values()].reduce((t, x) => t + x, 0);
  return { pos, liquidez, caja, flujos };
}

// Ajuste por desdoblamientos: Yahoo da los cierres ya ajustados; los títulos comprados antes del split se multiplican.
function factorSplit(s, desdeFecha) { return (s?.splits || []).filter(([d]) => d > desdeFecha).reduce((t, [, k]) => t * k, 1); }

// Ganancia de un conjunto de flujos frente al índice: «si el mismo dinero, los mismos días, hubiera ido al índice».
// Rentabilidad con el método Dietz modificado (los flujos pesan por el tiempo que llevan dentro).
async function frenteAlIndice({ v0 = 0, desde, flujos, v1, hoy }) {
  const si = await serie(INDICE.simbolo);
  const i0 = precioEn(si, desde), i1 = precioEn(si, null);
  let unidades = i0 ? v0 / i0 : 0;
  for (const fl of flujos) { const ip = precioEn(si, fl.fecha); if (ip) unidades += fl.eur / ip; }
  const t = Math.max(dias(desde, hoy), 1);
  const peso = flujos.reduce((s, fl) => s + fl.eur * Math.max(dias(fl.fecha, hoy), 0) / t, 0);
  const neto = flujos.reduce((s, fl) => s + fl.eur, 0);
  const base = v0 + peso;
  const idxV1 = unidades * (i1 ?? 0);
  return {
    ganancia: v1 - v0 - neto, rent: base > 0 ? 100 * (v1 - v0 - neto) / base : null,
    indice_ganancia: idxV1 - v0 - neto, indice_rent: base > 0 && i1 ? 100 * (idxV1 - v0 - neto) / base : null,
  };
}

// Rentabilidad de la cuenta según IBKR (por tiempo, en su divisa base), pasada a euros y frente al índice en las mismas fechas.
function ultimaFotoIbkr() {
  const dir = join(DATOS, 'ibkr');
  if (!existsSync(dir)) return [];
  const porCuenta = new Map();
  for (const a of readdirSync(dir).filter((x) => /^foto-.*\.json$/.test(x)).sort()) { const j = leer(join(dir, a)); if (j?.cuenta) porCuenta.set(j.cuenta, j); }
  return [...porCuenta.values()];
}
async function rentabilidadBroker(hoy) {
  const out = [];
  for (const fb of ultimaFotoIbkr()) {
    const per = fb.rentabilidad?.por_periodo_pct;
    if (!per) continue;
    const base = fb.divisa_base || 'EUR', si = await serie(INDICE.simbolo);
    const tramo = async (pct, desde) => {
      if (pct === null || pct === undefined) return null;
      const f0 = await eurPor(base, desde), f1 = await eurPor(base, null);
      const i0 = precioEn(si, desde), i1 = precioEn(si, null);
      return { rent: 100 * ((1 + pct / 100) * (f1 / f0) - 1), indice_rent: i0 && i1 ? 100 * (i1 / i0 - 1) : null, desde };
    };
    out.push({ cuenta: fb.cuenta, anio: await tramo(per.YTD, `${+hoy.slice(0, 4) - 1}-12-31`), un_anio: await tramo(per['1Y'], masDias(hoy, -365)) });
  }
  return out;
}

// ───────────────────────── Foto de hoy ─────────────────────────
async function foto({ semanal = false } = {}) {
  const ops = leerOps();
  if (!ops.length) { console.error(`No hay operaciones en ${RUTA.ops}. Primera carga: --partida (o --importar-flex).`); process.exit(1); }
  const ahora = madrid(), hoy = ahora.fecha, inicio = ops[0].fecha;
  const ini_anio = `${+hoy.slice(0, 4) - 1}-12-31`;
  DESDE = inicio < ini_anio ? inicio : ini_anio;
  const { pos, liquidez, caja, flujos } = await reconstruir(ops);
  const hist = leer(RUTA.hist, { fotos: [] });
  const prev = leer(RUTA.prev, {});

  // Valor de cada posición a precio de ahora.
  const filas = [];
  for (const p of pos.values()) {
    if (p.titulos <= 0 && !p.ventas_eur) continue;
    const s = await serie(p.simbolo);
    if (s?.error && p.titulos > 0) { console.error(`Sin precio para ${p.clave} (${p.simbolo}): ${s.error}`); }
    const div = s?.divisa || p.divisa;
    const precio = precioEn(s, null), fx = await eurPor(div, null);
    const tit = p.titulos;
    const valor = precio !== null && fx ? tit * precio * fx : 0;
    // Desde la compra: todo lo que entró (compras) frente a lo que vale hoy + lo vendido + los dividendos.
    const desdeCompra = await frenteAlIndice({ desde: p.primera, flujos: p.flujos, v1: valor + p.dividendos_eur, hoy });
    // Por valor, la rentabilidad es simple: ganancia ÷ lo invertido (se entiende mejor y no se descompone al vender).
    desdeCompra.rent = p.invertido_eur > 0 ? 100 * desdeCompra.ganancia / p.invertido_eur : null;
    desdeCompra.indice_rent = p.invertido_eur > 0 ? 100 * desdeCompra.indice_ganancia / p.invertido_eur : null;
    if (p.arrastre) desdeCompra.indice_rent = desdeCompra.indice_ganancia = null; // parte comprada en fecha desconocida
    // Del año: valor a 31-dic (si ya estaba) y los movimientos del año.
    let anio = null;
    if (p.primera <= ini_anio) {
      const r0 = (await reconstruir(ops.filter((o) => o.clave === p.clave), ini_anio)).pos.get(p.clave);
      const p0 = precioEn(s, ini_anio), fx0 = await eurPor(div, ini_anio);
      const v0 = r0 && p0 && fx0 ? r0.titulos * p0 * fx0 : 0;
      const divAnio = ops.filter((o) => o.clave === p.clave && o.tipo === 'dividendo' && o.fecha > ini_anio).reduce((t, o) => t + (o.importe_eur ?? 0), 0);
      anio = await frenteAlIndice({ v0, desde: ini_anio, flujos: p.flujos.filter((fl) => fl.fecha > ini_anio), v1: valor + divAnio, hoy });
    } else anio = p.partida ? null : desdeCompra; // con precio de partida no se sabe cómo iba antes
    // Lo previsto: el objetivo a 12 meses del método, congelado el día de la compra (o de la partida).
    let pr = prev[p.clave];
    if (!pr && p.titulos > 0) {
      const ob = objetivoDe(p.clave, p.vertical);
      // Compra reciente (≤ 7 días): lo previsto arranca en la compra, al precio medio. Posición que ya estaba antes de que
      // la vertical la siguiera: el método de entonces no se conoce, así que arranca hoy y al precio de hoy.
      const reciente = dias(p.ultima, hoy) <= 7;
      const pEntrada = reciente ? p.coste_div / p.titulos : precio; // en la divisa de cotización
      if (ob && pEntrada) pr = prev[p.clave] = { fecha: reciente ? p.ultima : hoy, precio_entrada: r(pEntrada, 4), objetivo_12m: ob.objetivo, prevista_12m_pct: r(100 * (ob.objetivo / pEntrada - 1)), fuente: ob.fuente, anotada: hoy };
    }
    let previsto = null;
    if (pr && precio !== null) {
      const d = Math.max(dias(pr.fecha, hoy), 0);
      const esperadoHoy = pr.prevista_12m_pct * Math.min(d, 365) / 365; // lineal hasta los 12 meses
      const real = 100 * (precio / pr.precio_entrada - 1); // en divisa: lo que mide el método
      const ob = objetivoDe(p.clave, p.vertical);
      previsto = { ...pr, dias: d, esperado_hoy_pct: r(esperadoHoy), real_pct: r(real), desvio_pts: r(real - esperadoHoy), objetivo_hoy: ob?.objetivo ?? pr.objetivo_12m, prevista_hoy_pct: ob ? r(100 * (ob.objetivo / precio - 1)) : null };
    }
    filas.push({ clave: p.clave, nombre: nombreDe(p.clave), vertical: p.vertical, simbolo: p.simbolo, divisa: div, titulos: tit, cuentas: [...p.cuentas],
      precio_medio: p.titulos > 0 ? p.coste_div / p.titulos : null, precio, valor_eur: valor, coste_eur: p.coste_eur, partida: p.partida, arrastre: p.arrastre, primera: p.primera,
      dividendos_eur: p.dividendos_eur, desde_compra: desdeCompra, anio, previsto, hora_precio: s?.hora_ahora || null });
  }
  const invertido = filas.reduce((t, x) => t + x.valor_eur, 0);
  const total = invertido + liquidez;
  for (const x of filas) x.peso_pct = total ? 100 * x.valor_eur / total : null;
  filas.sort((a, b) => b.valor_eur - a.valor_eur);

  // Cartera entera frente al índice. Desde el alta de la vertical (primera foto del historial) con las fotos propias; el año
  // y el último año, con la historia completa si la hay (Flex Query) o con la rentabilidad que da IBKR de la cuenta.
  const cartera = { total, liquidez, invertido, caja: Object.fromEntries(caja) };
  const externos = (desde) => flujos.filter((fl) => fl.fecha > desde && !ops.some((o) => o.fecha === fl.fecha && o.tipo === 'partida'));
  const alta = hist.fotos[0];
  cartera.alta = alta?.fecha || hoy;
  cartera.desde_inicio = alta ? await frenteAlIndice({ v0: alta.total_eur, desde: alta.fecha, flujos: externos(alta.fecha), v1: total, hoy }) : { ganancia: 0, rent: 0, indice_ganancia: 0, indice_rent: 0 };
  const historiaCompleta = inicio <= ini_anio && !ops.some((o) => ['partida', 'arrastre', 'saldo'].includes(o.tipo));
  if (historiaCompleta) {
    const r0 = await reconstruir(ops, ini_anio);
    let v0 = r0.liquidez;
    for (const p of r0.pos.values()) { const s = await serie(p.simbolo); const p0 = precioEn(s, ini_anio), fx0 = await eurPor(s?.divisa || p.divisa, ini_anio); if (p0 && fx0) v0 += p.titulos * p0 * fx0; }
    cartera.anio = await frenteAlIndice({ v0, desde: ini_anio, flujos: flujos.filter((fl) => fl.fecha > ini_anio), v1: total, hoy });
  } else cartera.broker = await rentabilidadBroker(hoy);
  const haceSemana = [...hist.fotos].reverse().find((h) => dias(h.fecha, hoy) >= 6);
  if (haceSemana) cartera.semana = await frenteAlIndice({ v0: haceSemana.total_eur, desde: haceSemana.fecha, flujos: externos(haceSemana.fecha), v1: total, hoy });
  // Rentabilidad prevista de la cartera (media de lo previsto hoy, por peso; la liquidez y el oro cuentan como 0).
  cartera.prevista_12m_pct = total ? filas.reduce((t, x) => t + (x.previsto?.prevista_hoy_pct ?? 0) * x.valor_eur, 0) / total : null;
  cartera.esperado_hoy_pct = invertido ? filas.reduce((t, x) => t + (x.previsto?.esperado_hoy_pct ?? 0) * x.valor_eur, 0) / invertido : null;
  cartera.real_desde_prevision_pct = invertido ? filas.reduce((t, x) => t + (x.previsto?.real_pct ?? 0) * x.valor_eur, 0) / invertido : null;

  const avisos = await calcularAvisos(filas, cartera, hist, hoy);
  const senales = resumenSenales();

  // Historial (una foto por día; la última del día manda).
  hist.fotos = hist.fotos.filter((h) => h.fecha !== hoy);
  hist.fotos.push({ fecha: hoy, hora: ahora.hora, total_eur: r(total, 0), liquidez_eur: r(liquidez, 0), indice: precioEn(await serie(INDICE.simbolo), null),
    posiciones: Object.fromEntries(filas.filter((x) => x.titulos > 0).map((x) => [x.clave, { titulos: x.titulos, precio: x.precio, valor_eur: r(x.valor_eur, 0) }])) });
  mkdirSync(DATOS, { recursive: true });
  guardar(RUTA.hist, hist);
  guardar(RUTA.prev, prev);

  const md = informe({ filas, cartera, avisos, senales, ahora, inicio, ops });
  writeFileSync(join(DATOS, 'ultimo.md'), md);
  guardar(join(DATOS, 'ultimo.json'), { fecha: hoy, hora: ahora.hora, cartera, filas, avisos, senales });
  if (semanal) {
    writeFileSync(join(DATOS, `informe-semanal-${hoy}.md`), md);
    writeFileSync(join(DATOS, 'mensaje-semanal.md'), mensaje({ filas, cartera, avisos, senales, ahora }));
  }
  console.log(md);
  if (semanal) console.log(`\n--- mensaje-semanal.md ---\n${readFileSync(join(DATOS, 'mensaje-semanal.md'), 'utf8')}`);
}

// ───────────────────────── Avisos ─────────────────────────
async function calcularAvisos(filas, cartera, hist, hoy) {
  const A = [];
  const noTocar = REGLAS.no_vender || {};
  const pend = leer(join(RAIZ, 'escaner/cartera.json'), {})?.ordenes_pendientes || {};
  const vendiendo = new Set(pend.vender || []);
  for (const x of filas.filter((y) => y.titulos > 0)) {
    if (x.peso_pct > REGLAS.tope_posicion_pct && !noTocar[x.clave]) A.push({ nivel: 'peso', clave: x.clave, texto: `${x.nombre} pesa un ${f(x.peso_pct)} % (tope ${REGLAS.tope_posicion_pct} %). Hay que recortar o no ampliar.` });
    if (x.valor_eur < REGLAS.minimo_posicion_eur && !vendiendo.has(x.clave) && !noTocar[x.clave]) A.push({ nivel: 'peso', clave: x.clave, texto: `${x.nombre} vale ${fe(x.valor_eur)}, por debajo del mínimo de ${fe(REGLAS.minimo_posicion_eur)}: ampliar o vender.` });
    const pv = x.previsto;
    if (pv && pv.dias >= 30 && pv.desvio_pts <= -15) A.push({ nivel: 'desvio', clave: x.clave, texto: `${x.nombre} va ${f(-pv.desvio_pts, 0)} puntos por debajo de lo previsto (${fp(pv.real_pct)} frente a ${fp(pv.esperado_hoy_pct)} en ${pv.dias} días). Revisar la tesis.` });
    if (pv && pv.real_pct <= -20) A.push({ nivel: 'desvio', clave: x.clave, texto: `${x.nombre} cae un ${f(-pv.real_pct, 0)} % desde la compra. Revisar la tesis y la señal de alarma del informe.` });
    if (pv && x.precio >= pv.objetivo_hoy && !vendiendo.has(x.clave)) A.push({ nivel: 'objetivo', clave: x.clave, texto: `${x.nombre} ya está en su precio objetivo (${fPrecio(x.precio)} frente a ${fPrecio(pv.objetivo_hoy)} ${x.divisa}). Revisar si se vende.` });
    const ant = [...hist.fotos].reverse().find((h) => dias(h.fecha, hoy) >= 6 && h.posiciones?.[x.clave]);
    if (ant && ant.posiciones[x.clave].precio) { const ch = 100 * (x.precio / ant.posiciones[x.clave].precio - 1); if (Math.abs(ch) >= 10) A.push({ nivel: 'movimiento', clave: x.clave, texto: `${x.nombre} se ha movido un ${fp(ch)} en la última semana. Mirar si hay noticias.` }); }
  }
  const growth = filas.filter((x) => x.vertical === 'growth').reduce((t, x) => t + x.valor_eur, 0);
  if (cartera.total && 100 * growth / cartera.total > REGLAS.bolsillo_growth_max_pct) A.push({ nivel: 'peso', texto: `El bolsillo growth pesa un ${f(100 * growth / cartera.total)} % (máximo ${REGLAS.bolsillo_growth_max_pct} %).` });
  // Liquidez ociosa: ≥ 3.000 € durante ≥ 3 meses → fondo monetario (XEON), regla de MEMORIA.md.
  const desde90 = hist.fotos.filter((h) => dias(h.fecha, hoy) <= 92);
  if (cartera.liquidez >= 3000 && desde90.length && dias(desde90[0].fecha, hoy) >= 90 && desde90.every((h) => h.liquidez_eur >= 3000)) A.push({ nivel: 'liquidez', texto: `Llevas más de 3 meses con más de 3.000 € en liquidez (${fe(cartera.liquidez)}). La regla dice pasarlo a un fondo monetario (XEON).` });
  const anio = cartera.anio || cartera.broker?.[0]?.anio;
  if (anio && anio.rent !== null && anio.indice_rent !== null && anio.rent - anio.indice_rent <= -5) A.push({ nivel: 'indice', texto: `En el año la cartera va ${f(anio.indice_rent - anio.rent)} puntos por detrás del índice mundial${cartera.anio ? '' : ' (cuenta conectada, según IBKR)'}.` });
  // Cuadre con el broker.
  const fb = leer(RUTA.foto);
  if (fb?.posiciones) {
    for (const b of fb.posiciones) {
      const t = (await reconstruir(leerOps().filter((o) => o.clave === b.clave && (!fb.cuentas || fb.cuentas.includes(o.cuenta))))).pos.get(b.clave)?.titulos ?? 0;
      if (Math.abs(t - b.titulos) > 1e-6) A.push({ nivel: 'cuadre', clave: b.clave, texto: `${nombreDe(b.clave)}: el broker dice ${f(b.titulos, b.titulos % 1 ? 2 : 0)} títulos y las operaciones ${f(t, t % 1 ? 2 : 0)}. Falta alguna operación.` });
    }
    for (const x of filas.filter((y) => y.titulos > 0 && (!fb.cuentas || y.cuentas.some((c) => fb.cuentas.includes(c))) && !fb.posiciones.some((b) => b.clave === y.clave))) A.push({ nivel: 'cuadre', clave: x.clave, texto: `${x.nombre}: está en las operaciones pero no en el broker.` });
  }
  return A;
}

// ───────────────────────── Señales del escáner (su registro) ─────────────────────────
function resumenSenales() {
  const reg = leer(join(RAIZ, 'escaner/registro-senales.json'), { senales: [] }).senales;
  const emitidas = reg.filter((s) => s.estado === 'emitida');
  const conMes = emitidas.filter((s) => s.a_1m);
  const vivas = emitidas.filter((s) => s.seguimiento && s.seguimiento.exceso_pct !== null && s.seguimiento.exceso_pct !== undefined);
  const resto = reg.filter((s) => s.estado !== 'emitida' && s.seguimiento?.exceso_pct !== null && s.seguimiento?.exceso_pct !== undefined);
  return {
    total: reg.length, emitidas: emitidas.length,
    a_1m: conMes.length, aciertan_1m: conMes.filter((s) => s.a_1m.acierta).length,
    a_3m: emitidas.filter((s) => s.a_3m).length, aciertan_3m: emitidas.filter((s) => s.a_3m?.acierta).length,
    exceso_medio_emitidas: vivas.length ? vivas.reduce((t, s) => t + s.seguimiento.exceso_pct, 0) / vivas.length : null,
    exceso_medio_no_emitidas: resto.length ? resto.reduce((t, s) => t + s.seguimiento.exceso_pct, 0) / resto.length : null, no_emitidas: resto.length,
  };
}

// ───────────────────────── Informe ─────────────────────────
function informe({ filas, cartera, avisos, senales, ahora, inicio }) {
  const c = cartera, L = [];
  const partida = filas.filter((x) => x.partida && x.titulos > 0), arrastre = filas.filter((x) => x.arrastre && x.titulos > 0);
  L.push(`# Cartera real · ${fechaCorta(ahora.fecha)} ${ahora.hora} (Madrid)`, '');
  L.push(`Precios de ahora (Yahoo). Índice de referencia: ${INDICE.nombre}. Historial de operaciones desde el ${fechaCorta(inicio)}.`, '');
  const sinConectar = Object.entries(c.caja || {}).filter(([k]) => !(c.broker || []).some((b) => b.cuenta === k) && k !== 'todas');
  if (c.broker?.length && sinConectar.length) L.push(`La ${sinConectar.map(([k]) => k).join(', ')} aún no está conectada: entra con lo apuntado el 13-oct (liquidez ${sinConectar.map(([, v]) => fe(v)).join(', ')}${partida.length ? ` y ${partida.map((x) => x.nombre).join(', ')}` : ''}).`, '');
  L.push('## Resumen', '', '| | Cartera | Índice mundial |', '|---|---|---|');
  L.push(`| Valor | ${fe(c.total)} (liquidez ${fe(c.liquidez)}) | |`);
  const fila = (t, x) => x && L.push(`| ${t} | ${fp(x.rent)}${x.ganancia !== undefined ? ` (${x.ganancia >= 0 ? '+' : ''}${fe(x.ganancia)})` : ''} | ${fp(x.indice_rent)} |`);
  fila('Última semana', c.semana);
  if (c.alta !== ahora.fecha) fila(`Desde el ${fechaCorta(c.alta)} (inicio del seguimiento)`, c.desde_inicio);
  fila('En el año', c.anio);
  for (const b of c.broker || []) { fila(`En el año (${b.cuenta}, según IBKR)`, b.anio); fila(`Último año (${b.cuenta}, según IBKR)`, b.un_anio); }
  L.push(`| Rentabilidad esperada a 12 meses (método, precio de hoy) | ${fp(c.prevista_12m_pct)} | |`);
  L.push(`| Lo previsto hasta hoy frente a lo real | previsto ${fp(c.esperado_hoy_pct)} · real ${fp(c.real_desde_prevision_pct)} | |`, '');

  L.push('## Posiciones', '', '| Valor | Títulos | Precio medio | Precio hoy | Valor | Peso | Desde la compra | Índice igual | Del año | Previsto hasta hoy | Real | Esperada 12 m hoy |', '|---|---|---|---|---|---|---|---|---|---|---|---|');
  for (const x of filas.filter((y) => y.titulos > 0)) {
    const pv = x.previsto;
    L.push(`| ${x.nombre}${x.partida ? '*' : x.arrastre ? '†' : ''} | ${f(x.titulos, x.titulos % 1 ? 2 : 0)} | ${x.partida ? '—' : `${fPrecio(x.precio_medio)} ${x.divisa}`} | ${fPrecio(x.precio)} | ${fe(x.valor_eur)} | ${f(x.peso_pct)} % | ${x.partida ? '—' : fp(x.desde_compra?.rent)} | ${x.partida ? '—' : fp(x.desde_compra?.indice_rent)} | ${fp(x.anio?.rent)} | ${pv ? fp(pv.esperado_hoy_pct) : '—'} | ${pv ? fp(pv.real_pct) : '—'} | ${pv?.prevista_hoy_pct !== null && pv ? fp(pv.prevista_hoy_pct) : '—'} |`);
  }
  L.push(`| Liquidez | | | | ${fe(c.liquidez)} | ${f(c.total ? 100 * c.liquidez / c.total : null)} % | | | | | | |`, '');
  if (arrastre.length) L.push(`† Parte comprada antes de donde llega el historial del broker: el precio medio es el de IBKR, pero la fecha no se sabe, así que no se compara con el índice.`);
  if (partida.length) L.push(`* En una cuenta sin conectar: entra con el cierre del ${fechaCorta(partida[0].primera)}, no con el precio de compra.`);
  if (arrastre.length || partida.length) L.push('');
  const cerradas = filas.filter((y) => y.titulos === 0);
  if (cerradas.length) {
    L.push('## Vendidas (desde donde llega el historial)', '', '| Valor | Ganancia | Rentabilidad | Índice igual |', '|---|---|---|---|');
    for (const x of cerradas.sort((a, b) => b.desde_compra.ganancia - a.desde_compra.ganancia)) L.push(`| ${x.nombre}${x.arrastre ? '†' : ''} | ${x.desde_compra.ganancia >= 0 ? '+' : ''}${fe(x.desde_compra.ganancia)} | ${fp(x.desde_compra.rent)} | ${fp(x.desde_compra.indice_rent)} |`);
    const g = cerradas.reduce((t, x) => t + x.desde_compra.ganancia, 0);
    L.push(`| **Total** | **${g >= 0 ? '+' : ''}${fe(g)}** | | |`, '');
  }
  L.push('**Cómo leerlo.** «Desde la compra» incluye dividendos y comisiones, en euros. «Índice igual» es lo que habría ganado el mismo dinero, los mismos días, en el índice mundial. «Previsto hasta hoy» es la parte proporcional de lo que esperaba el método (objetivo a 12 meses fijo) desde la compra o, si la posición ya estaba, desde el inicio del seguimiento; «Real» es lo que ha hecho la acción en su moneda desde entonces. «Esperada 12 m hoy» es lo que queda hasta el objetivo desde el precio de hoy.', '');

  L.push('## Avisos', '');
  if (!avisos.length) L.push('Ninguno.');
  for (const a of avisos) L.push(`- ${a.texto}`);
  L.push('', '## Señales del escáner', '');
  const s = senales;
  if (!s.total) L.push('Aún no hay señales registradas.');
  else {
    L.push(`- Registradas ${s.total}; emitidas ${s.emitidas}.`);
    L.push(`- Con un mes de vida: ${s.a_1m ? `${s.aciertan_1m} de ${s.a_1m} baten al índice` : 'aún ninguna (las primeras cumplen un mes a mediados de noviembre)'}.${s.a_3m ? ` A tres meses: ${s.aciertan_3m} de ${s.a_3m}.` : ''}`);
    if (s.exceso_medio_emitidas !== null) L.push(`- Hasta hoy, las emitidas van de media ${fp(s.exceso_medio_emitidas)} frente al índice; las que no se emitieron (sin liquidez o descartadas), ${fp(s.exceso_medio_no_emitidas)}.`);
    L.push('- Detalle: escaner/SENALES.md del repo.');
  }
  L.push('');
  return L.join('\n');
}

// Mensaje corto para el chat del proyecto (el informe del domingo).
function mensaje({ filas, cartera, avisos, senales, ahora }) {
  const c = cartera, L = [];
  L.push(`**Cartera, semana al ${fechaCorta(ahora.fecha)}.** Vale ${fe(c.total)}.`);
  if (c.semana) L.push(`- Semana: ${fp(c.semana.rent)} (índice mundial ${fp(c.semana.indice_rent)}).`);
  if (c.alta !== ahora.fecha) L.push(`- Desde el ${fechaCorta(c.alta)}: ${fp(c.desde_inicio.rent)} (índice ${fp(c.desde_inicio.indice_rent)}).`);
  if (c.anio) L.push(`- En el año: ${fp(c.anio.rent)} (índice ${fp(c.anio.indice_rent)}).`);
  for (const b of c.broker || []) if (b.anio) L.push(`- En el año, ${b.cuenta} según IBKR: ${fp(b.anio.rent)} (índice ${fp(b.anio.indice_rent)}).`);
  L.push(`- Lo previsto por el método hasta hoy: ${fp(c.esperado_hoy_pct)}; lo real: ${fp(c.real_desde_prevision_pct)}.`);
  const vivas = filas.filter((x) => x.titulos > 0 && x.previsto);
  const mejor = [...vivas].sort((a, b) => b.previsto.desvio_pts - a.previsto.desvio_pts)[0], peor = [...vivas].sort((a, b) => a.previsto.desvio_pts - b.previsto.desvio_pts)[0];
  if (mejor && peor && mejor !== peor && mejor.previsto.dias >= 7) L.push(`- Mejor frente a lo previsto: ${mejor.nombre} (${fp(mejor.previsto.real_pct)}). Peor: ${peor.nombre} (${fp(peor.previsto.real_pct)}).`);
  if (senales.a_1m) L.push(`- Señales del escáner con un mes: ${senales.aciertan_1m} de ${senales.a_1m} baten al índice.`);
  L.push(avisos.length ? `\n**Avisos**\n${avisos.map((a) => `- ${a.texto}`).join('\n')}` : '\nSin avisos.');
  return L.join('\n') + '\n';
}

// ───────────────────────── Cargas ─────────────────────────
async function partida() {
  if (existsSync(RUTA.ops) && !argv.includes('--forzar')) { console.error(`${RUTA.ops} ya existe (usa --forzar para rehacerla).`); process.exit(1); }
  const C = leer(join(RAIZ, 'escaner/cartera.json'));
  const fecha = opt('--fecha') || masDias(madrid().fecha, -1);
  const ops = [{ fecha, cuenta: 'todas', tipo: 'partida', clave: 'EUR', importe_eur: C.liquidez_eur, nota: 'liquidez de partida' }];
  for (const p of C.posiciones) {
    const simbolo = yahooDe(p.clave);
    const s = await serie(simbolo);
    const precio = precioEn(s, fecha);
    if (precio === null) { console.error(`Sin precio de ${p.clave} (${simbolo})`); continue; }
    ops.push({ fecha, cuenta: 'todas', tipo: 'partida', clave: p.clave, simbolo, vertical: p.vertical === 'growth' ? 'growth' : p.vertical === 'otro' ? 'otro' : 'value', titulos: p.titulos, precio: r(precio, 4), divisa: s.divisa, comision: 0, nota: 'precio de partida (cierre), no de compra' });
  }
  escribirOps(ops);
  console.log(`Partida del ${fecha}: ${ops.length - 1} posiciones y ${fe(C.liquidez_eur)} de liquidez en ${RUTA.ops}.`);
}

// Bolsa de IBKR → sufijo de Yahoo.
const BOLSAS = { SBF: '.PA', BM: '.MC', BME: '.MC', TSEJ: '.T', IBIS: '.DE', IBIS2: '.DE', FWB: '.DE', XETRA: '.DE', GETTEX: '.DE', LSE: '.L', LSEETF: '.L', AEB: '.AS', ENEXT: '.AS', EBS: '.SW', SWX: '.SW', VIRTX: '.SW', SFB: '.ST', KFB: '.CO', CPH: '.CO', OSE: '.OL', BVME: '.MI', ASX: '.AX', TSE: '.TO', SEHK: '.HK', BVL: '.LS' };
function claveDesdeIbkr(simbolo, bolsa) {
  const s = String(simbolo || '').trim().replace(/\s+/g, '-');
  const yahoo = s.includes('.') ? s : `${s}${BOLSAS[String(bolsa || '').toUpperCase()] ?? ''}`;
  for (const [k, v] of Object.entries(MAPA.empresas || {})) if (v.yahoo === yahoo) return { clave: k, yahoo };
  for (const [k, v] of Object.entries(MAPA.extra || {})) if (v.yahoo === yahoo) return { clave: k, yahoo };
  return { clave: s.toUpperCase(), yahoo };
}
function csv(linea) {
  const out = []; let cur = '', q = false;
  for (let i = 0; i < linea.length; i++) {
    const ch = linea[i];
    if (q) { if (ch === '"' && linea[i + 1] === '"') { cur += '"'; i++; } else if (ch === '"') q = false; else cur += ch; }
    else if (ch === '"') q = true; else if (ch === ',') { out.push(cur); cur = ''; } else cur += ch;
  }
  out.push(cur);
  return out;
}
const fechaIbkr = (s) => { const m = String(s || '').match(/(\d{4})-?(\d{2})-?(\d{2})/); return m ? `${m[1]}-${m[2]}-${m[3]}` : null; };

// Flex Query en CSV: varias secciones, cada una con su fila de cabecera (con o sin filas BOS/HEADER/DATA).
function leerFlex(texto) {
  const filas = [];
  let cab = null;
  for (const l of texto.split(/\r?\n/)) {
    if (!l.trim()) continue;
    let c = csv(l);
    if (c[0] === 'BOF' || c[0] === 'EOF' || c[0] === 'BOA' || c[0] === 'EOA' || c[0] === 'BOS' || c[0] === 'EOS') { cab = null; continue; }
    if (c[0] === 'HEADER') { cab = c.slice(2); continue; }
    if (c[0] === 'DATA') c = c.slice(2);
    else if (c.includes('ClientAccountID') || c.includes('Symbol') && (c.includes('Quantity') || c.includes('Amount') || c.includes('Position'))) { cab = c; continue; }
    if (cab) filas.push(Object.fromEntries(cab.map((k, i) => [k, c[i]])));
  }
  return filas;
}
function opsDesdeFilas(filas, cuenta) {
  const ops = [], posiciones = [];
  const cuentaDe = (x) => cuenta || x.ClientAccountID || x.AccountId || 'cuenta-1';
  for (const x of filas) {
    const fx = num(x.FXRateToBase) ?? null;
    const fecha = fechaIbkr(x.TradeDate || x['Date/Time'] || x.DateTime || x.SettleDate || x.ReportDate);
    const clase = x.AssetClass || x.AssetCategory || '';
    if ((x['Buy/Sell'] || x.BuySell) && x.Quantity !== undefined && x.TradePrice !== undefined) {
      if (clase && !/STK|ETF|FUND/i.test(clase)) continue; // divisas (CASH) y opciones fuera
      const { clave, yahoo } = claveDesdeIbkr(x.Symbol, x.ListingExchange || x.Exchange);
      const q = num(x.Quantity), p = num(x.TradePrice), com = Math.abs(num(x.IBCommission) ?? 0);
      const venta = q < 0 || /SELL/i.test(x['Buy/Sell'] || x.BuySell);
      const bruto = Math.abs(q) * p;
      ops.push({ fecha, cuenta: cuentaDe(x), tipo: venta ? 'venta' : 'compra', clave, simbolo: yahoo, vertical: '', titulos: Math.abs(q), precio: p, divisa: x.CurrencyPrimary || x.Currency,
        comision: com, importe_eur: fx ? r(venta ? (bruto - com) * fx : (bruto + com) * fx, 2) : null, nota: 'IBKR' });
    } else if (x.Type && x.Amount !== undefined) {
      const imp = num(x.Amount) * (fx ?? 1);
      const t = String(x.Type);
      if (/Dividend|Payment In Lieu|Withholding/i.test(t)) {
        const { clave, yahoo } = claveDesdeIbkr(x.Symbol, x.ListingExchange);
        ops.push({ fecha, cuenta: cuentaDe(x), tipo: 'dividendo', clave, simbolo: yahoo, divisa: 'EUR', importe_eur: r(imp, 2), nota: t });
      } else if (/Deposit|Withdraw/i.test(t)) ops.push({ fecha, cuenta: cuentaDe(x), tipo: imp >= 0 ? 'ingreso' : 'retirada', clave: 'EUR', importe_eur: r(Math.abs(imp), 2), nota: t });
      else if (/Interest/i.test(t)) ops.push({ fecha, cuenta: cuentaDe(x), tipo: 'interes', clave: 'EUR', importe_eur: r(imp, 2), nota: t });
      else if (/Fee|Commission/i.test(t)) ops.push({ fecha, cuenta: cuentaDe(x), tipo: 'comision', clave: 'EUR', importe_eur: r(Math.abs(imp), 2), nota: t });
    } else if (x.Position !== undefined && x.Symbol) {
      if (clase && !/STK|ETF|FUND/i.test(clase)) continue;
      const { clave } = claveDesdeIbkr(x.Symbol, x.ListingExchange);
      posiciones.push({ clave, cuenta: cuentaDe(x), titulos: num(x.Position), coste_medio: num(x.CostBasisPrice), divisa: x.CurrencyPrimary });
    }
  }
  return { ops: ops.filter((o) => o.fecha), posiciones };
}
function incorporar({ ops: nuevas, posiciones }, cuentaDefecto) {
  const cuentas = new Set(nuevas.map((o) => o.cuenta).concat(posiciones.map((p) => p.cuenta)).filter(Boolean));
  // Seudónimos: el número de cuenta no se guarda; cuenta-1, cuenta-2… por orden de aparición.
  const alias = leer(join(DATOS, 'cuentas.json'), {});
  const seud = (c) => { if (/^cuenta-\d+$/.test(c)) return c; if (!alias[c]) alias[c] = `cuenta-${Object.keys(alias).length + 1}`; return alias[c]; };
  for (const o of nuevas) o.cuenta = seud(o.cuenta || cuentaDefecto);
  for (const p of posiciones) p.cuenta = seud(p.cuenta || cuentaDefecto);
  // cuentas.json guarda solo la correspondencia número → seudónimo, en la carpeta privada.
  guardar(join(DATOS, 'cuentas.json'), alias);
  const tocadas = new Set(nuevas.map((o) => o.cuenta));
  let ops = leerOps();
  // Lo importado sustituye a la partida (de esa cuenta o la común) y a lo importado antes de esa cuenta.
  const quitarPartida = ops.some((o) => o.tipo === 'partida') && nuevas.some((o) => o.tipo === 'compra');
  ops = ops.filter((o) => !(tocadas.has(o.cuenta)) && !(quitarPartida && o.tipo === 'partida'));
  escribirOps(ops.concat(nuevas));
  if (posiciones.length) {
    const fb = leer(RUTA.foto, { posiciones: [] });
    const resto = (fb.posiciones || []).filter((p) => !tocadas.has(p.cuenta));
    const junt = new Map();
    for (const p of resto.concat(posiciones)) { const j = junt.get(p.clave) || { clave: p.clave, titulos: 0, cuentas: [] }; j.titulos += p.titulos; j.cuentas.push(p.cuenta); junt.set(p.clave, j); }
    guardar(RUTA.foto, { fecha: madrid().fecha, posiciones: [...junt.values()], por_cuenta: resto.concat(posiciones) });
  }
  console.log(`Importadas ${nuevas.length} operaciones (${[...tocadas].join(', ')}) y ${posiciones.length} posiciones${quitarPartida ? '; la partida se ha quitado' : ''}.`);
}

// Lo que deja el conector de IBKR en ibkr/: operaciones.json (get_account_trades, hasta 4 trimestres atrás) y
// foto-AAAA-MM-DD.json (posiciones con coste medio, liquidez, rentabilidad de la cuenta). Rehace las operaciones de esa
// cuenta: las compras y ventas del historial, un «arrastre» con lo comprado antes de lo que alcanza (coste del broker) y el
// «saldo» de liquidez de la foto. Lo de otras cuentas (o la partida común) se queda.
const ALIAS_IBKR = { PUIG1: 'PUIG' };
const PENIQUES = new Set(['WOSG', 'PHPP']); // Londres: IBKR dice GBP pero el precio va en peniques
function simboloIbkr(simbolo, divisa, bolsa) {
  const s0 = String(simbolo).trim(), clave = ALIAS_IBKR[s0] || s0.replace(/\s+/g, '-');
  const conocida = MAPA.empresas?.[clave] || MAPA.extra?.[clave];
  if (conocida) return { clave, yahoo: conocida.yahoo };
  if (GROWTH[clave]) return { clave, yahoo: clave };
  const suf = BOLSAS[String(bolsa || '').toUpperCase()];
  return { clave, yahoo: divisa === 'USD' && !suf ? clave : `${clave}${suf ?? ''}` };
}
async function importarIbkr() {
  const dir = opt('--importar-ibkr') && !opt('--importar-ibkr').startsWith('--') ? opt('--importar-ibkr') : join(DATOS, 'ibkr');
  const hist = leer(join(dir, 'operaciones.json'));
  const fotos = readdirSync(dir).filter((x) => /^foto-.*\.json$/.test(x)).sort();
  const fb = fotos.length ? leer(join(dir, fotos.at(-1))) : null;
  if (!hist || !fb) { console.error(`Faltan operaciones.json o foto-*.json en ${dir}`); process.exit(1); }
  const cuenta = fb.cuenta || hist.cuenta || 'cuenta-1';
  const inicio = hist.periodo?.desde || hist.operaciones.map((t) => t.trade_time.slice(0, 10)).sort()[0];
  const antes = masDias(inicio, -1);
  DESDE = antes < DESDE ? antes : DESDE;
  const nuevas = [];
  const neto = new Map(), costeVentas = new Map(), bolsaDe = new Map();
  for (const p of fb.posiciones || []) bolsaDe.set(p.simbolo, p.mercado);
  for (const t of hist.operaciones.filter((x) => x.sec_type === 'STK' || x.sec_type === 'ETF')) {
    const div = PENIQUES.has(t.symbol) ? 'GBp' : t.currency;
    const { clave, yahoo } = simboloIbkr(t.symbol, div, bolsaDe.get(t.symbol));
    const venta = /SELL/i.test(t.side), q = Math.abs(+t.size);
    nuevas.push({ fecha: t.trade_time.slice(0, 10), cuenta, tipo: venta ? 'venta' : 'compra', clave, simbolo: yahoo, vertical: '', titulos: q, precio: +t.price, divisa: div,
      comision: r(Math.abs(+t.commission || 0) * (div === 'GBp' ? 100 : 1), 4), importe_eur: '', nota: 'IBKR' });
    neto.set(clave, (neto.get(clave) || 0) + (venta ? -q : q));
    // Coste de lo vendido según IBKR (importe neto − beneficio realizado), para lo que se compró antes del historial.
    if (venta) { const c = costeVentas.get(clave) || { titulos: 0, coste: 0, div, yahoo }; c.titulos += q; c.coste += q * +t.price - Math.abs(+t.commission || 0) * (div === 'GBp' ? 100 : 1) - (+t.realized_pnl || 0) * (div === 'GBp' ? 100 : 1); costeVentas.set(clave, c); }
  }
  // Arrastres: títulos que hoy hay (o que se vendieron) y no salen comprados en el historial.
  for (const p of fb.posiciones || []) {
    const { clave, yahoo } = simboloIbkr(p.simbolo, p.divisa, p.mercado);
    const falta = p.titulos - (neto.get(clave) || 0);
    if (falta > 1e-6) {
      const compradas = nuevas.filter((o) => o.clave === clave && o.tipo === 'compra');
      const costeVentana = compradas.reduce((t, o) => t + o.titulos * o.precio + o.comision, 0) - nuevas.filter((o) => o.clave === clave && o.tipo === 'venta').reduce((t, o) => t + o.titulos * o.precio, 0);
      const precio = (p.coste_medio * p.titulos - Math.max(costeVentana, 0)) / falta;
      nuevas.push({ fecha: antes, cuenta, tipo: 'arrastre', clave, simbolo: yahoo, vertical: '', titulos: falta, precio: r(precio, 4), divisa: p.divisa, comision: 0, importe_eur: '', nota: `comprado antes del ${fechaCorta(inicio)}: coste medio de IBKR, fecha desconocida` });
    }
    neto.set(clave, p.titulos);
  }
  for (const [clave, n] of neto) {
    if (n < -1e-6 && costeVentas.has(clave)) { // vendido sin compra visible
      const c = costeVentas.get(clave), falta = -n;
      nuevas.push({ fecha: antes, cuenta, tipo: 'arrastre', clave, simbolo: c.yahoo, vertical: '', titulos: falta, precio: r(c.coste / c.titulos, 4), divisa: c.div, comision: 0, importe_eur: '', nota: `comprado antes del ${fechaCorta(inicio)}: coste según el beneficio que da IBKR` });
    }
  }
  const fechaFoto = (fb.leido || fotos.at(-1)).match(/\d{4}-\d{2}-\d{2}/)[0];
  const liq = fb.resumen?.liquidez_por_divisa || {};
  let liqEur = 0;
  for (const [d, v] of Object.entries(liq)) liqEur += (+v || 0) * ((await eurPor(d, fechaFoto)) ?? 0);
  nuevas.push({ fecha: fechaFoto, cuenta, tipo: 'saldo', clave: 'EUR', importe_eur: r(liqEur, 2), nota: 'liquidez según IBKR' });
  for (const o of nuevas) if (o.importe_eur === '') o.importe_eur = null;

  // Lo que había: fuera esta cuenta; la partida común se reparte (lo que no está en esta cuenta pasa a «cuenta-2»).
  let ops = leerOps().filter((o) => o.cuenta !== cuenta);
  const comun = ops.filter((o) => o.cuenta === 'todas' && o.tipo === 'partida');
  if (comun.length) {
    ops = ops.filter((o) => !(o.cuenta === 'todas' && o.tipo === 'partida'));
    const enCuenta = new Set((fb.posiciones || []).map((p) => simboloIbkr(p.simbolo, p.divisa, p.mercado).clave));
    for (const o of comun) {
      if (o.clave === 'EUR') { const resto = r((o.importe_eur ?? 0) - liqEur, 2); if (resto > 0) ops.push({ ...o, cuenta: 'cuenta-2', importe_eur: resto, nota: 'liquidez de la cartera apuntada menos la de la cuenta conectada (cuenta sin conectar)' }); }
      else if (!enCuenta.has(o.clave)) ops.push({ ...o, cuenta: 'cuenta-2', nota: 'cuenta sin conectar: precio de partida, no de compra' });
    }
  }
  escribirOps(ops.concat(nuevas.map((o) => ({ ...o, importe_eur: o.importe_eur ?? '' }))));
  // Foto del broker para el cuadre (las cuentas sin conectar no se cuadran).
  const posB = (fb.posiciones || []).map((p) => ({ clave: simboloIbkr(p.simbolo, p.divisa, p.mercado).clave, titulos: p.titulos, coste_medio: p.coste_medio, divisa: p.divisa, cuenta }));
  guardar(RUTA.foto, { fecha: fechaFoto, cuentas: [cuenta], posiciones: posB });
  const arr = nuevas.filter((o) => o.tipo === 'arrastre');
  console.log(`IBKR ${cuenta}: ${nuevas.filter((o) => o.tipo === 'compra' || o.tipo === 'venta').length} operaciones desde el ${fechaCorta(inicio)}, ${arr.length} arrastres (${arr.map((o) => `${o.clave} ${o.titulos}`).join(', ')}), liquidez ${fe(liqEur)}.`);
}

if (argv.includes('--partida')) await partida();
else if (argv.includes('--importar-ibkr')) await importarIbkr();
else if (opt('--importar-flex')) incorporar(opsDesdeFilas(leerFlex(readFileSync(opt('--importar-flex'), 'utf8')), opt('--cuenta')), opt('--cuenta') || 'cuenta-1');
else if (opt('--importar-json')) { const j = leer(opt('--importar-json')); incorporar(opsDesdeFilas([...(j.operaciones || []), ...(j.movimientos || []), ...(j.posiciones || [])], opt('--cuenta') || j.cuenta), opt('--cuenta') || j.cuenta || 'cuenta-1'); }
else if (opt('--foto-broker')) { const j = leer(opt('--foto-broker')); guardar(RUTA.foto, j); await foto(); }
else await foto({ semanal: argv.includes('--semanal') });
