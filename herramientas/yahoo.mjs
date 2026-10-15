// Acceso a Yahoo Finance para el escáner: buscador (screener), ficha de la empresa (perfil, datos financieros y
// cuentas anuales) y tipos de cambio. Sin dependencias. No es una API oficial: reintenta con espera y guarda en
// caché las fichas (una semana por defecto) para no repetir peticiones.

import { readFileSync, writeFileSync, existsSync, mkdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const UA = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36' };
const BASE = 'https://query1.finance.yahoo.com';
export const CACHE = join(process.env.TEMP || tmpdir(), 'analisis-inversion', 'escaner', 'cache');
const espera = (ms) => new Promise((r) => setTimeout(r, ms));

// Red con cortes: reintenta los fallos de conexión (también a mitad de respuesta) y los 429/5xx con espera
// creciente. Devuelve el estado, las cabeceras y el cuerpo ya leído.
async function pedir(url, opciones = {}, intentos = 6) {
  for (let i = 0; ; i++) {
    try {
      const r = await fetch(url, { ...opciones, signal: AbortSignal.timeout(45000) });
      if ((r.status === 429 || r.status >= 500) && i < intentos) { await espera(3000 * (i + 1)); continue; }
      return { status: r.status, ok: r.ok, headers: r.headers, texto: await r.text() };
    } catch (e) {
      if (i >= intentos) throw e;
      await espera(2000 * (i + 1));
    }
  }
}

let sesion = null;
async function abrirSesion() {
  if (sesion) return sesion;
  const r0 = await pedir('https://fc.yahoo.com', { headers: UA, redirect: 'manual' });
  const cookie = (r0.headers.get('set-cookie') || '').split(';')[0];
  const crumb = (await pedir(`${BASE}/v1/test/getcrumb`, { headers: { ...UA, cookie } })).texto;
  if (!crumb || crumb.length > 40) throw new Error('Yahoo no ha dado el «crumb» de sesión');
  sesion = { cookie, crumb };
  return sesion;
}
export async function json(url, opciones = {}) {
  const { cookie, crumb } = await abrirSesion();
  const sep = url.includes('?') ? '&' : '?';
  const r = await pedir(`${url}${sep}crumb=${encodeURIComponent(crumb)}`, { ...opciones, headers: { ...UA, cookie, ...(opciones.headers || {}) } });
  if (r.status === 404) return null;
  if (!r.ok) throw new Error(`Yahoo ${r.status} en ${url.slice(0, 90)}`);
  return JSON.parse(r.texto);
}

// ── Buscador ──
// filtros: [[campo, op, valor]] con op en > >= < <= = entre (valor [a, b]); un valor lista con = es «cualquiera de».
function operando([campo, op, valor]) {
  if (op === '=' && Array.isArray(valor)) return { operator: 'or', operands: valor.map((v) => ({ operator: 'EQ', operands: [campo, v] })) };
  const OPS = { '>': 'GT', '>=': 'GTE', '<': 'LT', '<=': 'LTE', '=': 'EQ', entre: 'BTWN' };
  if (!OPS[op]) throw new Error(`Operador desconocido en el filtro: ${op}`);
  return { operator: OPS[op], operands: [campo, ...(op === 'entre' ? valor : [valor])] };
}
export async function buscar(filtros, { orden = 'intradaymarketcap', maximo = 5000 } = {}) {
  const query = { operator: 'AND', operands: filtros.map(operando) };
  const salida = [];
  let total = Infinity;
  for (let offset = 0; offset < Math.min(total, maximo); offset += 250) {
    const j = await json(`${BASE}/v1/finance/screener?lang=en-US&region=US&formatted=false`, {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ size: 250, offset, sortField: orden, sortType: 'DESC', quoteType: 'EQUITY', query, userId: '', userIdType: 'guid' }),
    });
    if (j?.finance?.error) throw new Error(`Buscador de Yahoo: ${j.finance.error.description}`);
    const res = j?.finance?.result?.[0];
    if (!res) break;
    total = res.total;
    salida.push(...res.quotes);
    if (res.quotes.length < 250) break;
  }
  return { total: total === Infinity ? 0 : total, cotizaciones: salida };
}

// ── Tipos de cambio a USD ──
const cambios = new Map([['USD', 1]]);
export async function aUsd(divisa) {
  if (!divisa) return null;
  // Las bolsas de Londres, Johannesburgo y Tel Aviv cotizan en centésimos.
  const centimos = { GBp: 'GBP', GBX: 'GBP', ZAc: 'ZAR', ILA: 'ILS' };
  if (centimos[divisa]) return (await aUsd(centimos[divisa])) / 100;
  if (!cambios.has(divisa)) {
    const j = await json(`${BASE}/v8/finance/chart/${divisa}USD=X?range=5d&interval=1d`).catch(() => null);
    const cierres = (j?.chart?.result?.[0]?.indicators?.quote?.[0]?.close || []).filter((x) => x);
    cambios.set(divisa, cierres.at(-1) ?? null);
  }
  return cambios.get(divisa);
}

// La capitalización viene en la unidad principal aunque el precio cotice en centésimos (Londres: precio en
// peniques, capitalización en libras).
export const divisaPrincipal = (d) => ({ GBp: 'GBP', GBX: 'GBP', ZAc: 'ZAR', ILA: 'ILS' }[d] || d);

// ── Ficha de una empresa: perfil y datos de Yahoo más cinco años de cuentas anuales ──
const TIPOS = ['TotalRevenue', 'GrossProfit', 'EBIT', 'EBITDA', 'NetIncome', 'FreeCashFlow', 'OperatingCashFlow', 'InvestedCapital',
  'NetDebt', 'TotalDebt', 'CashAndCashEquivalents', 'StockholdersEquity', 'TaxRateForCalcs', 'DilutedAverageShares', 'StockBasedCompensation'];
const TRAILING = ['TotalRevenue', 'EBIT', 'EBITDA', 'FreeCashFlow', 'NetIncome'];

const VERSION_FICHA = 2; // súbela si cambia lo que se guarda: invalida la caché
export async function ficha(simbolo, { diasCache = 7 } = {}) {
  mkdirSync(CACHE, { recursive: true });
  const archivo = join(CACHE, `${simbolo.replace(/[^\w.-]/g, '_')}.json`);
  if (existsSync(archivo) && Date.now() - statSync(archivo).mtimeMs < diasCache * 86400000) {
    const previa = JSON.parse(readFileSync(archivo, 'utf8'));
    if (previa.version === VERSION_FICHA) return previa;
  }
  const resumen = await json(`${BASE}/v10/finance/quoteSummary/${encodeURIComponent(simbolo)}?modules=assetProfile,financialData,defaultKeyStatistics,price,summaryDetail`);
  const r = resumen?.quoteSummary?.result?.[0] || {};
  const p2 = Math.floor(Date.now() / 1000), p1 = p2 - 86400 * 365 * 7;
  const tipos = [...TIPOS.map((t) => 'annual' + t), ...TRAILING.map((t) => 'trailing' + t)].join(',');
  const ts = await json(`${BASE}/ws/fundamentals-timeseries/v1/finance/timeseries/${encodeURIComponent(simbolo)}?symbol=${encodeURIComponent(simbolo)}&type=${tipos}&period1=${p1}&period2=${p2}`);
  const anual = {}, ultimos12 = {}, divisas = {};
  for (const s of ts?.timeseries?.result || []) {
    const tipo = s.meta?.type?.[0];
    if (!tipo) continue;
    const valores = (s[tipo] || []).filter(Boolean).map((x) => [x.asOfDate, x.reportedValue?.raw, x.currencyCode]).filter(([, v]) => Number.isFinite(v));
    for (const [, , d] of valores) if (d) divisas[d] = (divisas[d] || 0) + 1;
    if (tipo.startsWith('annual')) for (const [fecha, v] of valores) (anual[fecha.slice(0, 7)] ||= {})[tipo.slice(6)] = v;
    else if (valores.length) ultimos12[tipo.slice(8)] = valores.at(-1)[1];
  }
  const v = (o, k) => (o?.[k] && typeof o[k] === 'object' ? o[k].raw ?? null : o?.[k] ?? null);
  const fd = r.financialData, ks = r.defaultKeyStatistics, ap = r.assetProfile, pr = r.price, sd = r.summaryDetail;
  const datos = {
    simbolo, fecha: new Date().toISOString().slice(0, 10),
    nombre: pr?.longName || pr?.shortName || null, pais: ap?.country || null, sector: ap?.sector || null, industria: ap?.industry || null,
    descripcion: ap?.longBusinessSummary || null, web: ap?.website || null, empleados: ap?.fullTimeEmployees ?? null,
    // La divisa de las cuentas sale de las propias series (financialCurrency a veces no coincide: HCL da USD con cifras en INR).
    version: VERSION_FICHA, divisa: pr?.currency || null,
    divisa_cuentas: Object.entries(divisas).sort((a, b) => b[1] - a[1])[0]?.[0] || fd?.financialCurrency || null, divisa_yahoo: fd?.financialCurrency || null,
    precio: v(pr, 'regularMarketPrice'), capitalizacion: v(pr, 'marketCap'), acciones: v(ks, 'sharesOutstanding'),
    max_52s: v(sd, 'fiftyTwoWeekHigh'), min_52s: v(sd, 'fiftyTwoWeekLow'), var_52s: v(ks, '52WeekChange'),
    beta: v(ks, 'beta'), per_adelantado: v(ks, 'forwardPE'), insiders: v(ks, 'heldPercentInsiders'),
    objetivo_medio: v(fd, 'targetMeanPrice'), n_analistas: v(fd, 'numberOfAnalystOpinions'), recomendacion: fd?.recommendationKey || null,
    fcf_yahoo: v(fd, 'freeCashflow'), crec_ventas_trimestre: v(fd, 'revenueGrowth'), rentabilidad_dividendo: v(sd, 'dividendYield'),
    anual, ultimos12,
  };
  writeFileSync(archivo, JSON.stringify(datos));
  return datos;
}

// Reparte trabajo asíncrono con un máximo de tareas a la vez.
export async function enParalelo(lista, n, tarea, alAvanzar) {
  const salida = new Array(lista.length);
  let siguiente = 0, hechas = 0;
  await Promise.all(Array.from({ length: Math.min(n, lista.length) }, async () => {
    while (siguiente < lista.length) {
      const i = siguiente++;
      try { salida[i] = await tarea(lista[i], i); } catch (e) { salida[i] = { error: e.message }; }
      alAvanzar?.(++hechas, lista.length);
    }
  }));
  return salida;
}
