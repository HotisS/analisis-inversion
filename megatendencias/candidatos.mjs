// Candidatos de cada sector elegido por el screening de megatendencias.
// Junta las 10 primeras posiciones del ETF del sector (o la cesta), más una lista ampliada (incluye Europa y Japón),
// y saca de Yahoo: precio, rentabilidad a 6 y 12 meses, margen EBIT, crecimiento, ROIC aproximado, PER adelantado.
// Quita las exclusiones de Hotis (escaner/reglas.json) y marca las ya analizadas en el proyecto (value o growth).
// Uso: NODE_USE_ENV_PROXY=1 node megatendencias/candidatos.mjs semis ciber ...  → megatendencias/resultados/candidatos.json

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ficha, json, enParalelo } from '../herramientas/yahoo.mjs';

const AQUI = dirname(fileURLToPath(import.meta.url));
const RAIZ = join(AQUI, '..');
const U = JSON.parse(readFileSync(join(AQUI, 'universo.json'), 'utf8'));
const EXTRA = JSON.parse(readFileSync(join(AQUI, 'candidatos-extra.json'), 'utf8'));
const reglas = JSON.parse(readFileSync(join(RAIZ, 'escaner', 'reglas.json'), 'utf8'));
const EXCLUIR = new Set([...Object.keys(reglas.exclusiones), ...(EXTRA._excluir || [])]);

const nodos = process.argv.slice(2);
const base = (s) => s.split('.')[0].split('-')[0].toUpperCase();

// Ya analizadas: carpetas de informes value y growth
const analizadas = {};
for (const [dir, tipo] of [['informes', 'value'], ['informes-growth', 'growth']]) {
  for (const f of readdirSync(join(RAIZ, dir))) {
    const m = f.match(/^(.*)-(\d{4}-\d{2}-\d{2})$/);
    if (m) (analizadas[m[1]] ||= []).push(`${tipo} ${m[2]}`);
  }
}
const resumenGrowth = readFileSync(join(RAIZ, 'informes-growth', 'resumen.md'), 'utf8');
const senalGrowth = {};
for (const l of resumenGrowth.split('\n')) {
  const c = l.split('|').map((x) => x.trim());
  if (c.length > 8 && c[2] && /^[A-Z0-9.]+$/.test(c[2])) senalGrowth[c[2]] = c[7];
}

async function holdings(etf) {
  const d = await json(`https://query1.finance.yahoo.com/v10/finance/quoteSummary/${etf}?modules=topHoldings`);
  return (d?.quoteSummary?.result?.[0]?.topHoldings?.holdings || []).map((h) => h.symbol).filter(Boolean);
}
async function rent(simbolo) {
  const p2 = Math.floor(Date.now() / 1000), p1 = p2 - 86400 * 400;
  const d = await json(`https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(simbolo)}?period1=${p1}&period2=${p2}&interval=1d`);
  const r = d?.chart?.result?.[0];
  const c = r?.indicators?.adjclose?.[0]?.adjclose || r?.indicators?.quote?.[0]?.close || [];
  const t = r?.timestamp || [];
  const serie = t.map((x, i) => [x, c[i]]).filter(([, v]) => v != null);
  if (serie.length < 30) return {};
  const ult = serie.at(-1);
  const hace = (dias) => { const obj = ult[0] - dias * 86400; return serie.find(([x]) => x >= obj)?.[1]; };
  const max = Math.max(...serie.slice(-252).map(([, v]) => v));
  return { r6: ult[1] / hace(182) - 1, r12: ult[1] / hace(365) - 1, dist_max: ult[1] / max - 1 };
}

const salida = {};
for (const k of nodos) {
  const n = U.nodos[k];
  let lista = [];
  for (const t of n.tickers) {
    const h = t.includes('.') || n.tickers.length > 1 ? [] : await holdings(t).catch(() => []);
    lista.push(...(h.length ? h.slice(0, 10) : [t]));
  }
  lista.push(...(EXTRA[k] || []));
  lista = [...new Set(lista)].filter((s) => !EXCLUIR.has(base(s)));
  const filas = [];
  await enParalelo(lista, 3, async (s) => {
    try {
      const f = await ficha(s);
      if (!f?.nombre) return;
      const r = await rent(s).catch(() => ({}));
      const anos = Object.keys(f.anual).sort();
      const a1 = f.anual[anos.at(-1)] || {}, a0 = f.anual[anos.at(-2)] || {};
      const ventas = f.ultimos12.TotalRevenue ?? a1.TotalRevenue;
      const ebit = f.ultimos12.EBIT ?? a1.EBIT;
      const t = Math.min(Math.max(a1.TaxRateForCalcs ?? 0.21, 0), 0.35);
      const clave = f.nombre.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-');
      const yaAnalizada = Object.keys(analizadas).find((a) => clave.startsWith(a) || a === clave.split('-')[0] || (a.length > 4 && clave.includes(a)));
      filas.push({
        simbolo: s, nombre: f.nombre, pais: f.pais, industria: f.industria, divisa: f.divisa, precio: f.precio,
        capitalizacion_musd: f.capitalizacion ? Math.round(f.capitalizacion / 1e6) : null,
        r6: r.r6 ?? null, r12: r.r12 ?? null, dist_max: r.dist_max ?? null,
        margen_ebit: ventas && ebit != null ? ebit / ventas : null,
        crec_ventas: a1.TotalRevenue && a0.TotalRevenue ? a1.TotalRevenue / a0.TotalRevenue - 1 : null,
        crec_trimestre: f.crec_ventas_trimestre,
        roic: a1.EBIT != null && a1.InvestedCapital ? (a1.EBIT * (1 - t)) / a1.InvestedCapital : null,
        per_adelantado: f.per_adelantado, objetivo_analistas: f.objetivo_medio && f.precio ? f.objetivo_medio / f.precio - 1 : null,
        ya_analizada: yaAnalizada ? `${yaAnalizada}: ${analizadas[yaAnalizada].join(', ')}` : null,
        senal_growth: senalGrowth[base(s)] || null,
        descripcion: (f.descripcion || '').slice(0, 400),
      });
    } catch (e) { console.error('fallo', s, e.message); }
  });
  salida[k] = { nombre: n.nombre, candidatos: filas.sort((a, b) => (b.r6 ?? -9) - (a.r6 ?? -9)) };
  console.log(k, filas.length);
}
const ruta = join(AQUI, 'resultados', 'candidatos.json');
const previo = existsSync(ruta) ? JSON.parse(readFileSync(ruta, 'utf8')) : {};
writeFileSync(ruta, JSON.stringify({ ...previo, ...salida, _fecha: new Date().toISOString() }, null, 1));
