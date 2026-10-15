// Fechas históricas de resultados de las empresas de EE. UU. analizadas, sacadas de los 8-K con punto 2.02 (Results of Operations) de la SEC.
//   NODE_USE_ENV_PROXY=1 node herramientas/fechas-resultados-sec.mjs  → verticales/empresa/backtest/fechas-resultados-sec.json
// Sin datos personales en las cabeceras (la SEC acepta este User-Agent corto).
import { readFileSync, writeFileSync, existsSync, mkdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const UA = process.env.SEC_UA || 'analisis-inversion/1.0';
const CACHE = join(process.env.TEMP || tmpdir(), 'analisis-inversion', 'cuentas'); mkdirSync(CACHE, { recursive: true });
const espera = (ms) => new Promise((r) => setTimeout(r, ms));
async function bajar(url, dias = 7) {
  const f = join(CACHE, url.replace(/[^\w.-]+/g, '_').slice(-180));
  if (existsSync(f) && (Date.now() - statSync(f).mtimeMs) / 86400000 < dias) return JSON.parse(readFileSync(f, 'utf8'));
  for (let i = 0; ; i++) {
    const r = await fetch(url, { headers: { 'User-Agent': UA, 'Accept-Encoding': 'gzip, deflate' }, signal: AbortSignal.timeout(120000) });
    if ((r.status === 429 || r.status >= 500) && i < 4) { await espera(3000 * (i + 1)); continue; }
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const t = await r.text(); writeFileSync(f, t); return JSON.parse(t);
  }
}
const mapa = JSON.parse(readFileSync(join(raiz, 'verticales/empresa/simbolos.json'), 'utf8'));
const us = Object.entries(mapa.empresas).filter(([, x]) => !/\./.test(x.yahoo));
const tickers = await bajar('https://www.sec.gov/files/company_tickers.json');
const cikDe = {}; for (const x of Object.values(tickers)) cikDe[x.ticker.toUpperCase()] = String(x.cik_str).padStart(10, '0');
const salida = {};
for (const [k, x] of us) {
  const tk = x.yahoo.toUpperCase().replace('-', '.'), cik = cikDe[tk] || cikDe[x.yahoo.toUpperCase()] || cikDe[k.toUpperCase()];
  if (!cik) { console.error(`  sin CIK: ${x.nombre} (${x.yahoo})`); continue; }
  try {
    const sub = await bajar(`https://data.sec.gov/api/submissions/CIK${cik}.json`.replace('/api/submissions', '/submissions'));
    const rec = sub.filings.recent; const fechas = new Set();
    const lee = (r) => { for (let i = 0; i < r.form.length; i++) if (r.form[i] === '8-K' && /(^|,)2\.02(,|$)/.test(r.items[i] || '')) fechas.add(r.filingDate[i]); };
    lee(rec);
    for (const f of sub.filings.files || []) { try { lee(await bajar(`https://data.sec.gov/submissions/${f.name}`, 30)); } catch {} }
    salida[x.yahoo] = { nombre: x.nombre, carpeta: x.carpeta, cik, fechas: [...fechas].sort() };
    console.error(`  ${x.nombre}: ${fechas.size} resultados (${[...fechas].sort()[0]} → ${[...fechas].sort().at(-1)})`);
    await espera(150);
  } catch (e) { console.error(`  ${x.nombre}: ${e.message}`); }
}
mkdirSync(join(raiz, 'verticales/empresa/backtest'), { recursive: true });
writeFileSync(join(raiz, 'verticales/empresa/backtest/fechas-resultados-sec.json'), JSON.stringify({ fuente: 'SEC EDGAR, 8-K punto 2.02, fecha de presentación', fecha: new Date().toISOString().slice(0, 10), empresas: salida }, null, 1));
console.error(`${Object.keys(salida).length} empresas con fechas`);
