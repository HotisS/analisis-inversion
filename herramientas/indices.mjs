// Escáner de entradas y salidas de los grandes índices (15-oct-2026, pedido del usuario: «nuevas entradas y salidas de
// grandes índices mundiales: merece la pena identificarlas y empezar a cubrirlas si valen la pena; busca huecos donde se
// nos pueda colar una empresa»).
//
// Descarga los componentes de hoy de S&P 500, Nasdaq-100, MSCI World, STOXX Europe 600, EURO STOXX 50, FTSE 100,
// Nikkei 225, DAX, SMI, CAC 40 e IBEX 35 (listas públicas de las gestoras de ETF que los replican; sin registro ni datos
// personales), los compara con la foto anterior y apunta altas y bajas. Cada miembro lleva su ISIN y su símbolo de Yahoo
// (búsqueda por ISIN, en caché) para cruzarlo con nuestro inventario (herramientas/cobertura.mjs).
//
//   NODE_USE_ENV_PROXY=1 node herramientas/indices.mjs              fotos nuevas, altas y bajas → escaner/indices.json
//   … --solo sp500,ftse100                                         solo esos índices
//   … --sin-descarga                                               usa las fotos guardadas (para repetir el filtro)
//   … --huecos                                                     además, filtro previo de calidad (métricas del escáner de
//                                                                  mercado) de los miembros que NO tenemos analizados →
//                                                                  escaner/indices-huecos.json (primer domingo del mes; tarda)
//   … --altas-calidad                                              el filtro previo solo para las altas sin analizar (semanal)
// Las altas que pasan el filtro previo se proponen para análisis completo (cola.md); al usuario solo le llega lo que
// después quede en compra robusta con calidad. Una alta o una baja nunca es una señal por sí sola.
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { leerXlsx } from './xlsx-leer.mjs';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIR = join(RAIZ, 'escaner', 'indices');
const argv = process.argv.slice(2);
const tiene = (k) => argv.includes(k);
const arg = (k, d = null) => (argv.includes(k) ? argv[argv.indexOf(k) + 1] : d);
const HOY = new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Madrid' });
const UA = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36' };
const leer = (p, d) => { try { return JSON.parse(readFileSync(p, 'utf8')); } catch { return d; } };
const espera = (ms) => new Promise((r) => setTimeout(r, ms));
mkdirSync(DIR, { recursive: true });

async function bajar(url, opciones = {}) {
  for (let i = 0; ; i++) {
    try {
      const r = await fetch(url, { redirect: 'follow', ...opciones, headers: { ...UA, ...(opciones.headers || {}) }, signal: AbortSignal.timeout(60000) });
      if (r.ok) return Buffer.from(await r.arrayBuffer());
      if (i >= 3 || (r.status < 500 && r.status !== 429)) throw new Error(`HTTP ${r.status} en ${url.slice(0, 90)}`);
    } catch (e) { if (i >= 3) throw e; }
    await espera(3000 * (i + 1));
  }
}

// ISIN a partir del CUSIP (EE. UU.): «US» + CUSIP + dígito de control (Luhn sobre las cifras).
function isinDeCusip(cusip) {
  if (!/^[0-9A-Z]{9}$/.test(cusip || '')) return null;
  const base = 'US' + cusip;
  const digitos = [...base].map((c) => (/\d/.test(c) ? c : String(c.charCodeAt(0) - 55))).join('');
  let suma = 0;
  [...digitos].reverse().forEach((d, i) => { let x = +d; if (i % 2 === 0) { x *= 2; if (x > 9) x -= 9; } suma += x; });
  return base + ((10 - (suma % 10)) % 10);
}

// ---------- Fuentes ----------
// Xtrackers (DWS): xlsx con Name, ISIN, Country, Exchange, Type of Security, Weighting. Las tres primeras filas, avisos.
async function dws(isinEtf) {
  const filas = leerXlsx(await bajar(`https://etf.dws.com/etfdata/export/GBR/ENG/excel/product/constituent/${isinEtf}/`));
  const i = filas.findIndex((f) => f.includes('ISIN') && f.includes('Name'));
  const cab = filas[i];
  const c = (n) => cab.indexOf(n);
  return filas.slice(i + 1).filter((f) => f[c('ISIN')] && /^[A-Z]{2}[0-9A-Z]{9}\d$/.test(f[c('ISIN')]) && /equit/i.test(f[c('Type of Security')] || '') && +f[c('Weighting')] > 1e-6)
    .map((f) => ({ nombre: f[c('Name')], isin: f[c('ISIN')], pais: f[c('Country')], bolsa: f[c('Exchange')], peso: Math.round(+f[c('Weighting')] * 1e6) / 1e4 }));
}
// Amundi (CAC 40, IBEX 35): API pública de composición.
async function amundi(isinEtf) {
  const cuerpo = { context: { countryCode: 'FRA', languageCode: 'fr', userProfileName: 'INSTIT' }, productIds: [isinEtf], productType: 'PRODUCT',
    composition: { compositionFields: ['date', 'type', 'bbg', 'isin', 'name', 'weight', 'sector', 'countryOfRisk'] } };
  const j = JSON.parse((await bajar('https://www.amundietf.com/mapi/ProductAPI/getProductsData', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(cuerpo) })).toString('utf8'));
  const vistos = new Set();
  return (j.products?.[0]?.composition?.compositionData || []).map((x) => x.compositionCharacteristics)
    .filter((x) => x?.type === 'EQUITY_ORDINARY' && x.bbg && x.isin && !/FIDELITE/i.test(x.name || ''))
    .filter((x) => { const k = x.bbg.split(' ')[0]; if (vistos.has(k)) return false; vistos.add(k); return true; })
    .map((x) => ({ nombre: x.name, isin: x.isin, ticker: x.bbg.split(' ')[0], pais: x.countryOfRisk, peso: Math.round(+x.weight * 1e6) / 1e4 }));
}
const FUENTES = {
  sp500: { nombre: 'S&P 500', revision: 'trimestral (tercer viernes de mar, jun, sep, dic) y cambios sueltos', async leer() {
    const filas = leerXlsx(await bajar('https://www.ssga.com/library-content/products/fund-data/etfs/us/holdings-daily-us-en-spy.xlsx'));
    const i = filas.findIndex((f) => f[0] === 'Name' && f[1] === 'Ticker');
    const fechasAlta = await altasSp500Wikipedia().catch(() => ({}));
    return filas.slice(i + 1).filter((f) => f[1] && f[1] !== '-' && f[2] && +f[4] > 0 && !/^CASH|^US DOLLAR/i.test(f[0]))
      .map((f) => ({ nombre: f[0], ticker: f[1], isin: isinDeCusip(String(f[2])), yahoo: String(f[1]).replace(/\./g, '-'), pais: 'United States', peso: +f[4], ...(fechasAlta[f[1]] ? { alta: fechasAlta[f[1]] } : {}) }));
  } },
  nasdaq100: { nombre: 'Nasdaq-100', revision: 'anual (diciembre) y cambios sueltos', async leer() {
    const j = JSON.parse((await bajar('https://api.nasdaq.com/api/quote/list-type/nasdaq100', { headers: { Accept: 'application/json' } })).toString('utf8'));
    return j.data.data.rows.map((r) => ({ nombre: r.companyName.replace(/ (Common Stock|Class [A-C] .*|Ordinary Shares.*|American Depositary Shares.*)$/i, ''), ticker: r.symbol, yahoo: r.symbol.replace(/\./g, '-'), isin: null }));
  } },
  msci_world: { nombre: 'MSCI World', revision: 'trimestral (último día hábil de feb, may, ago, nov; anuncio ~2 semanas antes)', leer: () => dws('IE00BJ0KDQ92') },
  stoxx600: { nombre: 'STOXX Europe 600', revision: 'trimestral (lunes tras el tercer viernes de mar, jun, sep, dic)', leer: () => dws('LU0328475792') },
  eurostoxx50: { nombre: 'EURO STOXX 50', revision: 'anual en septiembre y entradas o salidas rápidas', leer: () => dws('LU0380865021') },
  ftse100: { nombre: 'FTSE 100', revision: 'trimestral (anuncio el miércoles anterior al tercer viernes de mar, jun, sep, dic)', leer: () => dws('LU0292097234') },
  nikkei225: { nombre: 'Nikkei 225', revision: 'abril y octubre', leer: () => dws('LU0839027447') },
  dax: { nombre: 'DAX', revision: 'trimestral (lunes tras el tercer viernes)', leer: () => dws('LU0274211480') },
  smi: { nombre: 'SMI', revision: 'anual en septiembre', leer: () => dws('LU0274221281') },
  cac40: { nombre: 'CAC 40', revision: 'trimestral (tras el tercer viernes)', leer: () => amundi('FR0007052782') },
  ibex35: { nombre: 'IBEX 35', revision: 'junio y diciembre, con seguimiento en marzo y septiembre', leer: () => amundi('FR0010251744') },
};

// Fechas de alta en el S&P 500 (columna «Date added» de Wikipedia): da altas recientes desde la primera foto.
async function altasSp500Wikipedia() {
  const t = (await bajar('https://en.wikipedia.org/w/index.php?title=List_of_S%26P_500_companies&action=raw')).toString('utf8');
  const tabla = t.slice(t.indexOf('id="constituents"'), t.indexOf('|}', t.indexOf('id="constituents"')));
  const out = {};
  for (const fila of tabla.split('\n|-')) {
    const sim = fila.match(/\{\{(?:NyseSymbol|NasdaqSymbol|nyse|nasdaq)\|([^}|]+)/i)?.[1];
    const f = fila.match(/\|\|\s*(\d{4}-\d{2}-\d{2})/)?.[1];
    if (sim && f) out[sim.trim()] = f;
  }
  return out;
}

// ---------- ISIN → símbolo de Yahoo (búsqueda, en caché permanente) ----------
const RUTA_MAPA = join(DIR, 'isin-yahoo.json');
async function resolverYahoo(miembros) {
  const mapa = leer(RUTA_MAPA, {});
  const faltan = [...new Set(miembros.filter((m) => !m.yahoo && m.isin && !(m.isin in mapa)).map((m) => m.isin))];
  if (faltan.length) {
    const { json, enParalelo } = await import('./yahoo.mjs');
    let n = 0;
    await enParalelo(faltan, 4, async (isin) => {
      try {
        const j = await json(`https://query2.finance.yahoo.com/v1/finance/search?q=${isin}&quotesCount=5&newsCount=0`);
        const q = (j?.quotes || []).filter((x) => x.quoteType === 'EQUITY');
        mapa[isin] = q[0]?.symbol || null;
      } catch { /* se reintenta en la próxima pasada */ }
      if (++n % 100 === 0) { process.stderr.write(`  ISIN → Yahoo: ${n}/${faltan.length}\n`); writeFileSync(RUTA_MAPA, JSON.stringify(mapa, null, 0)); }
    });
    writeFileSync(RUTA_MAPA, JSON.stringify(mapa, null, 0));
  }
  for (const m of miembros) if (!m.yahoo && m.isin) m.yahoo = mapa[m.isin] || null;
}

// ---------- Fotos, altas y bajas ----------
const clave = (m) => m.isin || m.yahoo || m.ticker || m.nombre;
async function actualizar() {
  const ids = tiene('--sin-descarga') ? [] : (arg('--solo') || Object.keys(FUENTES).join(',')).split(',').filter((id) => FUENTES[id]);
  const res = leer(join(RAIZ, 'escaner/indices.json'), { cambios: [] });
  const cambios = res.cambios || [];
  const fotos = {};
  for (const id of ids) {
    const F = FUENTES[id];
    let miembros;
    try { miembros = await F.leer(); } catch (e) { process.stderr.write(`${F.nombre}: no se pudo leer (${e.message}); se usa la foto anterior\n`); fotos[id] = leer(join(DIR, `${id}.json`), null); continue; }
    const minimo = { sp500: 490, nasdaq100: 98, msci_world: 1100, stoxx600: 580, eurostoxx50: 48, ftse100: 98, nikkei225: 220, dax: 38, smi: 19, cac40: 38, ibex35: 33 }[id];
    if (miembros.length < minimo) { process.stderr.write(`${F.nombre}: solo ${miembros.length} miembros (esperados ≥ ${minimo}); se usa la foto anterior\n`); fotos[id] = leer(join(DIR, `${id}.json`), null); continue; }
    await resolverYahoo(miembros);
    const antes = leer(join(DIR, `${id}.json`), null);
    if (antes) {
      const a = new Map(antes.miembros.map((m) => [clave(m), m])), b = new Map(miembros.map((m) => [clave(m), m]));
      for (const [k, m] of b) if (!a.has(k)) cambios.push({ fecha: HOY, indice: id, nombre_indice: F.nombre, tipo: 'alta', nombre: m.nombre, isin: m.isin || null, simbolo: m.yahoo || null, origen: `foto ${antes.fecha} → ${HOY}` });
      for (const [k, m] of a) if (!b.has(k)) cambios.push({ fecha: HOY, indice: id, nombre_indice: F.nombre, tipo: 'baja', nombre: m.nombre, isin: m.isin || null, simbolo: m.yahoo || null, origen: `foto ${antes.fecha} → ${HOY}` });
    } else if (id === 'sp500') {
      // Primera foto: las altas de los últimos 12 meses según la fecha de alta publicada.
      const desde = new Date(Date.now() - 365 * 864e5).toISOString().slice(0, 10);
      for (const m of miembros.filter((x) => x.alta && x.alta >= desde)) cambios.push({ fecha: m.alta, indice: id, nombre_indice: F.nombre, tipo: 'alta', nombre: m.nombre, isin: m.isin, simbolo: m.yahoo, origen: 'fecha de alta publicada (Wikipedia)' });
    }
    fotos[id] = { fecha: HOY, indice: F.nombre, revision: F.revision, n: miembros.length, miembros };
    writeFileSync(join(DIR, `${id}.json`), JSON.stringify(fotos[id], null, 0) + '\n');
    process.stderr.write(`${F.nombre}: ${miembros.length} miembros\n`);
  }
  for (const id of Object.keys(FUENTES)) if (!fotos[id]) fotos[id] = leer(join(DIR, `${id}.json`), null);
  // Miembros por símbolo de Yahoo y por ISIN (lo lee cobertura.mjs).
  const miembrosDe = {};
  for (const [id, f] of Object.entries(fotos)) for (const m of f?.miembros || []) for (const k of [m.yahoo, m.isin].filter(Boolean)) (miembrosDe[k] ||= new Set()).add(FUENTES[id].nombre);
  const desde = new Date(Date.now() - 365 * 864e5).toISOString().slice(0, 10);
  const vigentes = cambios.filter((c) => c.fecha >= desde);
  const salida = {
    fecha: HOY, nota: 'Componentes de los grandes índices (herramientas/indices.mjs). Altas y bajas de los últimos 12 meses detectadas comparando fotos (y, en el S&P 500, por la fecha de alta publicada). No son señales.',
    indices: Object.fromEntries(Object.entries(fotos).map(([id, f]) => [id, { indice: FUENTES[id].nombre, fecha: f?.fecha || null, n: f?.n || 0, revision: FUENTES[id].revision }])),
    miembros: Object.fromEntries(Object.entries(miembrosDe).map(([k, s]) => [k, [...s]])),
    altas: vigentes.filter((c) => c.tipo === 'alta').map((c) => ({ ...c, indice: c.nombre_indice })),
    bajas: vigentes.filter((c) => c.tipo === 'baja').map((c) => ({ ...c, indice: c.nombre_indice })),
    cambios: vigentes,
  };
  writeFileSync(join(RAIZ, 'escaner/indices.json'), JSON.stringify(salida, null, 0) + '\n');
  return { salida, fotos };
}

// ---------- Filtro previo de calidad de lo que no tenemos analizado ----------
// Con las métricas del escáner de mercado (Yahoo; ROIC − WACC aproximado). No decide nada: ordena qué merece un análisis
// completo. Fuera lo excluido por el usuario (juego, comercio minorista, Accenture, Rightmove…) y las financieras de balance
// (bancos y aseguradoras: el ROIC no las mide), que van aparte.
const EXCLUIR = /\b(casino|gaming|gambling|betting|lottery|wagering)\b/i;
const EXCLUIR_IND = /Gambling|Resorts & Casinos|Retail|Department Stores|Grocery|Discount Stores|Home Improvement Retail|Apparel Retail|Specialty Retail|Internet Retail/i;
async function filtroCalidad(simbolos, ruta) {
  const reglas = leer(join(RAIZ, 'escaner/reglas.json'), {});
  const lista = join(RAIZ, '.indices-lista.tmp');
  writeFileSync(lista, simbolos.join('\n'));
  let m = [];
  try { m = JSON.parse(execFileSync(process.execPath, [join(RAIZ, 'herramientas/escaner.mjs'), '--simbolos-archivo', lista, '--json', '--concurrencia', '4'], { cwd: RAIZ, encoding: 'utf8', maxBuffer: 1 << 28, stdio: ['ignore', 'pipe', 'ignore'] })); }
  finally { try { execFileSync('rm', ['-f', lista]); } catch { /* nada */ } }
  const exclNombres = Object.values(reglas.exclusiones || {}).join(' ');
  const out = m.filter((x) => !x.error).map((x) => {
    const financiera = /Banks|Insurance|Credit Services|Mortgage|Capital Markets|Asset Management/i.test(x.industria || '');
    const excluida = EXCLUIR.test(`${x.descripcion} ${x.industria}`) || EXCLUIR_IND.test(x.industria || '') || /Accenture|Rightmove/i.test(x.nombre || '') ? 'exclusión del usuario' : null;
    const pasa = !excluida && !financiera && x.roic_wacc !== null && x.roic_wacc >= 5 && (x.crec_ventas_3a ?? 0) >= 0;
    return { ...x, financiera, excluida, pasa_previo: pasa };
  });
  writeFileSync(ruta, JSON.stringify({ fecha: HOY, nota: 'Filtro previo de calidad (aprox. del escáner de mercado: ROIC − WACC ≥ 5 con fondo de comercio, ventas sin caer). Ordena qué merece análisis completo; no decide.', empresas: out }, null, 0) + '\n');
  return out;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const { salida, fotos } = await actualizar();
  const inv = leer(join(RAIZ, 'escaner/cobertura.json'), { empresas: [] }).empresas;
  const conocidas = new Set(inv.flatMap((f) => [f.yahoo, f.isin].filter(Boolean)));
  console.log(`Índices ${HOY}: ${Object.values(salida.indices).map((x) => `${x.indice} ${x.n}`).join(', ')}.`);
  console.log(`Altas en 12 meses: ${salida.altas.length} (${salida.altas.filter((a) => !conocidas.has(a.simbolo) && !conocidas.has(a.isin)).length} sin analizar). Bajas: ${salida.bajas.length}.`);
  if (tiene('--huecos') || tiene('--altas-calidad')) {
    const todos = new Map();
    const fuente = tiene('--huecos') ? Object.values(fotos).flatMap((f) => f?.miembros || []) : salida.altas.map((a) => ({ yahoo: a.simbolo, isin: a.isin, nombre: a.nombre }));
    for (const m of fuente) if (m.yahoo && !conocidas.has(m.yahoo) && !conocidas.has(m.isin)) todos.set(m.yahoo, m);
    process.stderr.write(`Filtro previo de calidad de ${todos.size} miembros sin analizar…\n`);
    const r = await filtroCalidad([...todos.keys()], join(RAIZ, tiene('--huecos') ? 'escaner/indices-huecos.json' : 'escaner/indices-altas-calidad.json'));
    const pasan = r.filter((x) => x.pasa_previo).sort((a, b) => b.roic_wacc - a.roic_wacc);
    console.log(`Pasan el filtro previo: ${pasan.length} de ${r.length}.`);
    for (const x of pasan.slice(0, 40)) console.log(`  ${x.nombre} (${x.simbolo}) · ${x.industria} · ROIC − WACC ${x.roic_wacc} · ventas ${x.crec_ventas_3a} % · margen de seguridad ${x.margen_seguridad ?? 'n.d.'} · en ${(salida.miembros[x.simbolo] || []).join(', ')}`);
  }
}
