// Salidas a bolsa y otras vías de entrada de empresas nuevas (16-oct-2026, pedido del usuario: «lo mismo con calendario
// IPOs, etc. todo bien enlazado»). Complementa a herramientas/indices.mjs: una empresa grande que sale a bolsa tarda meses
// en entrar en un índice, y aquí se ve antes.
//
// Fuentes públicas, sin registro ni datos personales:
//   - EE. UU. (Nasdaq y NYSE): calendario de la API de Nasdaq (fijadas, próximas y registradas), 12 meses atrás y 2 adelante.
//   - Escisiones en EE. UU.: formularios 10-12B de la SEC (búsqueda de texto completo de EDGAR), 12 meses.
//   - Hong Kong (HKEX), Japón (JPX) y Euronext (París, Ámsterdam, Bruselas, Milán, Oslo, Lisboa, Dublín): sus páginas de
//     nuevas cotizaciones.
// Las que ya cotizan pasan por Yahoo (capitalización) y, las grandes (≥ 2.000 M USD), por el filtro previo de calidad del
// escáner de mercado. Fuera SPAC, fondos y mercados de crecimiento pequeños. Nada de esto es una señal: lo que pasa el filtro
// va a análisis completo (growth si no tiene tres años de cuentas) y al usuario solo le llega lo que quede en compra robusta.
//
//   NODE_USE_ENV_PROXY=1 node herramientas/salidas-bolsa.mjs     → escaner/salidas-bolsa.json (lo lee cobertura.mjs)
//   … --sin-filtro                                               sin el filtro previo de calidad (más rápido)
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
const HOY = new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Madrid' });
const UA = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36' };
const UA_SEC = { 'User-Agent': process.env.SEC_UA || 'analisis-inversion/1.0' };
const leer = (p, d) => { try { return JSON.parse(readFileSync(p, 'utf8')); } catch { return d; } };
const CAP_MIN = 2000; // M USD
const SPAC = /Acquisition|SPAC|Capital Corp\.? [IVX]+\b|Merger Corp|Blank Check|\bTrust\b|\bFund\b|\bETF\b/i;

async function texto(url, headers = UA) {
  for (let i = 0; ; i++) {
    try { const r = await fetch(url, { headers, redirect: 'follow', signal: AbortSignal.timeout(45000) }); if (r.ok) return await r.text(); if (i >= 2 || (r.status < 500 && r.status !== 429)) throw new Error(`HTTP ${r.status}`); } catch (e) { if (i >= 2) throw e; }
    await new Promise((ok) => setTimeout(ok, 3000 * (i + 1)));
  }
}
const celdas = (fila) => [...fila.matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/g)].map((m) => m[1].replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/\s+/g, ' ').trim());
const filas = (html) => [...html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g)].map((m) => celdas(m[1]));
const fechaUS = (s) => { const m = String(s || '').match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/); return m ? `${m[3]}-${m[1].padStart(2, '0')}-${m[2].padStart(2, '0')}` : null; };
const mesesDe = (atras, adelante) => { const out = []; const d = new Date(); d.setDate(1); d.setMonth(d.getMonth() - atras); for (let i = 0; i <= atras + adelante; i++) { out.push(d.toISOString().slice(0, 7)); d.setMonth(d.getMonth() + 1); } return out; };

// ---------- Fuentes ----------
async function nasdaq() {
  const out = [];
  for (const mes of mesesDe(12, 2)) {
    let j; try { j = JSON.parse(await texto(`https://api.nasdaq.com/api/ipo/calendar?date=${mes}`, { ...UA, Accept: 'application/json' })).data; } catch { continue; }
    const importe = (r) => +String(r.dollarValueOfSharesOffered || '').replace(/[$,]/g, '') / 1e6 || null;
    for (const r of j?.priced?.rows || []) out.push({ mercado: 'EE. UU.', estado: 'cotiza', fecha: fechaUS(r.pricedDate), nombre: r.companyName, ticker: r.proposedTickerSymbol, yahoo: r.proposedTickerSymbol, bolsa: r.proposedExchange, importe_musd: importe(r) });
    for (const r of j?.upcoming?.upcomingTable?.rows || []) out.push({ mercado: 'EE. UU.', estado: 'próxima', fecha: fechaUS(r.expectedPriceDate), nombre: r.companyName, ticker: r.proposedTickerSymbol, bolsa: r.proposedExchange, importe_musd: importe(r) });
    for (const r of j?.filed?.rows || []) out.push({ mercado: 'EE. UU.', estado: 'registrada', fecha: fechaUS(r.filedDate), nombre: r.companyName, ticker: r.proposedTickerSymbol, importe_musd: importe(r) });
  }
  return out;
}
async function escisionesSec() {
  const desde = new Date(Date.now() - 365 * 864e5).toISOString().slice(0, 10);
  const vistos = new Map();
  for (let from = 0; from < 400; from += 100) {
    let j; try { j = JSON.parse(await texto(`https://efts.sec.gov/LATEST/search-index?forms=10-12B&dateRange=custom&startdt=${desde}&enddt=${HOY}&from=${from}`, UA_SEC)); } catch { break; }
    const hits = j?.hits?.hits || [];
    for (const h of hits) {
      const s = h._source, cik = s.ciks?.[0];
      const nombre = (s.display_names?.[0] || '').replace(/\s*\(CIK.*$/, '');
      const ticker = nombre.match(/\(([A-Z.\-, ]+)\)\s*$/)?.[1]?.split(',')[0].trim() || null;
      const x = vistos.get(cik) || { mercado: 'EE. UU.', via: 'escisión', estado: 'registrada', nombre: nombre.replace(/\s*\([^)]*\)\s*$/, '').trim(), ticker, yahoo: ticker, primera: s.file_date, fecha: s.file_date };
      if (s.file_date < x.primera) x.primera = s.file_date;
      if (s.file_date > x.fecha) x.fecha = s.file_date;
      vistos.set(cik, x);
    }
    if (hits.length < 100) break;
  }
  return [...vistos.values()];
}
async function hkex() {
  const html = await texto('https://www2.hkexnews.hk/New-Listings/New-Listing-Information/Main-Board?sc_lang=en');
  return filas(html).filter((f) => /^\d{4,5}$/.test(f[0])).map((f) => ({ mercado: 'Hong Kong', estado: 'próxima o reciente', nombre: f[1], ticker: f[0], yahoo: f[0].replace(/^0*(\d{1,4})$/, (_, n) => n.padStart(4, '0')) + '.HK', bolsa: 'HKEX Main Board' }));
}
async function jpx() {
  const html = await texto('https://www.jpx.co.jp/english/listing/stocks/new/index.html');
  const out = [];
  const fs = filas(html);
  for (let i = 0; i < fs.length; i++) {
    const f = fs[i];
    const m = f[0]?.match(/^([A-Z][a-z]{2})\.? (\d{1,2}), (\d{4})/);
    if (!m || !/^[0-9A-Z]{4}$/.test(f[2] || '')) continue;
    const mes = { Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6, Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12 }[m[1]];
    const fecha = `${m[3]}-${String(mes).padStart(2, '0')}-${m[2].padStart(2, '0')}`;
    const segmento = fs[i + 1]?.[0] || '';
    out.push({ mercado: 'Japón', estado: fecha > HOY ? 'próxima' : 'cotiza', fecha, nombre: f[1], ticker: f[2], yahoo: `${f[2]}.T`, bolsa: `TSE ${segmento}`.trim() });
  }
  return out;
}
async function euronext() {
  const html = await texto('https://live.euronext.com/en/ipo-showcase');
  const SUF = { Paris: '.PA', Amsterdam: '.AS', Brussels: '.BR', Milan: '.MI', Oslo: '.OL', Lisbon: '.LS', Dublin: '.IR' };
  return filas(html).filter((f) => /^\d{2}\/\d{2}\/\d{4}$/.test(f[0]) && f[2]).map((f) => {
    const [d, m, a] = f[0].split('/');
    const fecha = `${a}-${m}-${d}`;
    return { mercado: 'Euronext', estado: fecha > HOY ? 'próxima' : 'cotiza', fecha, nombre: f[1], ticker: f[2], isin: f[3] || null, yahoo: SUF[f[4]] ? f[2] + SUF[f[4]] : null, bolsa: `${f[5]} (${f[4]})` };
  });
}

// ---------- Capitalización (Yahoo) ----------
async function capitalizaciones(lista) {
  const { json, aUsd } = await import('./yahoo.mjs');
  const simbolos = [...new Set(lista.map((x) => x.yahoo).filter(Boolean))];
  const q = {};
  for (let i = 0; i < simbolos.length; i += 40) {
    try {
      const j = await json(`https://query2.finance.yahoo.com/v7/finance/quote?symbols=${encodeURIComponent(simbolos.slice(i, i + 40).join(','))}`);
      for (const r of j?.quoteResponse?.result || []) q[r.symbol] = r;
    } catch { /* se queda sin dato */ }
  }
  const cambio = {};
  for (const r of Object.values(q)) if (r.currency && !(r.currency in cambio)) cambio[r.currency] = await aUsd(r.currency).catch(() => null);
  for (const x of lista) {
    const r = q[x.yahoo];
    if (!r) continue;
    x.nombre_yahoo = r.longName || r.shortName || null;
    x.cotiza_desde = r.firstTradeDateMilliseconds ? new Date(r.firstTradeDateMilliseconds).toISOString().slice(0, 10) : null;
    x.cap_musd = r.marketCap && cambio[r.currency] ? Math.round(r.marketCap * cambio[r.currency] / 1e6) : null;
    x.tipo = r.quoteType;
  }
}

// ---------- Programa ----------
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const fuentes = { 'EE. UU. (Nasdaq)': nasdaq, 'Escisiones (SEC 10-12B)': escisionesSec, 'Hong Kong (HKEX)': hkex, 'Japón (JPX)': jpx, Euronext: euronext };
  let todas = [];
  const estado = {};
  for (const [n, f] of Object.entries(fuentes)) {
    try { const r = await f(); todas.push(...r); estado[n] = r.length; } catch (e) { estado[n] = `sin datos (${e.message})`; }
  }
  // Fuera SPAC, fondos y unidades; un registro por empresa (el más avanzado).
  const orden = { cotiza: 0, 'próxima o reciente': 1, 'próxima': 2, registrada: 3 };
  const porClave = new Map();
  for (const x of todas.filter((x) => !SPAC.test(x.nombre || '') && !/U$|WS$|\.U$/.test(x.ticker || '') || x.via === 'escisión')) {
    const k = (x.ticker || x.nombre).toUpperCase() + '|' + x.mercado;
    const y = porClave.get(k);
    if (!y || orden[x.estado] < orden[y.estado]) porClave.set(k, { ...y, ...x });
  }
  todas = [...porClave.values()];
  await capitalizaciones(todas);
  // Conocidas: ya analizadas (inventario de cobertura).
  const inv = leer(join(RAIZ, 'escaner/cobertura.json'), { empresas: [] }).empresas;
  const conocidas = new Set(inv.flatMap((f) => [f.yahoo, f.isin].filter(Boolean)));
  for (const x of todas) x.ya_analizada = conocidas.has(x.yahoo) || (x.isin && conocidas.has(x.isin)) || false;
  // Grandes: cotizan con ≥ 2.000 M USD, o pendientes con una colocación ≥ 500 M USD.
  const grandes = todas.filter((x) => (x.cap_musd ?? 0) >= CAP_MIN || (x.estado !== 'cotiza' && (x.importe_musd ?? 0) >= 500));
  let filtro = [];
  const candidatas = grandes.filter((x) => x.yahoo && x.cap_musd && !x.ya_analizada);
  if (!argv.includes('--sin-filtro') && candidatas.length) {
    const lista = join(RAIZ, '.salidas-lista.tmp');
    writeFileSync(lista, candidatas.map((x) => x.yahoo).join('\n'));
    try { filtro = JSON.parse(execFileSync(process.execPath, [join(RAIZ, 'herramientas/escaner.mjs'), '--simbolos-archivo', lista, '--json', '--concurrencia', '4'], { cwd: RAIZ, encoding: 'utf8', maxBuffer: 1 << 27, stdio: ['ignore', 'pipe', 'ignore'] })); } catch { filtro = []; }
    finally { try { execFileSync('rm', ['-f', lista]); } catch { /* nada */ } }
  }
  const reglas = leer(join(RAIZ, 'escaner/reglas.json'), {});
  for (const x of grandes) {
    const m = filtro.find((f) => f.simbolo === x.yahoo && !f.error);
    if (!m) continue;
    x.industria = m.industria; x.roic_wacc = m.roic_wacc; x.anos_cuentas = m.anos_cuentas; x.crec_ventas_3a = m.crec_ventas_3a;
    const excluida = /Gambling|Casinos|Retail|Department Stores|Grocery|Discount Stores/i.test(m.industria || '') || Object.keys(reglas.exclusiones || {}).includes(String(x.yahoo).split('.')[0]);
    const financiera = /Banks|Insurance|Credit Services|Mortgage|Capital Markets|Asset Management/i.test(m.industria || '');
    x.camino = excluida ? 'excluida por el usuario' : financiera ? 'financiera (el ROIC no la mide)' : (m.anos_cuentas ?? 0) < 3 ? 'pocas cuentas: candidata growth' : m.roic_wacc !== null && m.roic_wacc >= 5 ? 'pasa el filtro previo value' : 'no pasa el filtro previo';
  }
  const salida = { fecha: HOY, nota: 'Salidas a bolsa y escisiones (herramientas/salidas-bolsa.mjs). «grandes»: cotizan con ≥ 2.000 M USD o la colocación pendiente es ≥ 500 M USD. No son señales.', fuentes: estado,
    grandes: grandes.sort((a, b) => (b.cap_musd ?? b.importe_musd ?? 0) - (a.cap_musd ?? a.importe_musd ?? 0)), todas: todas.length };
  writeFileSync(join(RAIZ, 'escaner/salidas-bolsa.json'), JSON.stringify(salida, null, 1) + '\n');
  console.log(`Salidas a bolsa ${HOY}: ${Object.entries(estado).map(([k, v]) => `${k} ${v}`).join(' · ')}.`);
  console.log(`Grandes: ${grandes.length} (${grandes.filter((x) => x.estado === 'cotiza').length} ya cotizan; ${grandes.filter((x) => x.ya_analizada).length} ya analizadas).`);
  for (const x of grandes.slice(0, 40)) console.log(`  ${x.nombre} (${x.yahoo || x.ticker || '-'}, ${x.mercado}${x.via ? ', ' + x.via : ''}) · ${x.estado} ${x.cotiza_desde || x.fecha || ''} · ${x.cap_musd ? x.cap_musd + ' M USD' : x.importe_musd ? 'colocación ' + Math.round(x.importe_musd) + ' M USD' : ''}${x.camino ? ' · ' + x.camino : ''}${x.roic_wacc != null ? ' (ROIC − WACC ' + x.roic_wacc + ')' : ''}${x.ya_analizada ? ' · ya analizada' : ''}`);
}
