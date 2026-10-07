// Form 4 de Copart desde una fecha: descarga cada XML de EDGAR y agrega por persona.
//   node informes/copart-2026-10-07/notas/C-form4.mjs [desde=2025-10-07]
// Salida: notas/docs/form4/*.xml y notas/C-form4.json (todas las transacciones, no derivadas y derivadas).
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const aqui = dirname(fileURLToPath(import.meta.url));
const desde = process.argv[2] || '2025-10-07';
const sub = JSON.parse(readFileSync(join(aqui, 'docs', 'submissions.json.json'), 'utf8'));
const r = sub.filings.recent;
const dir = join(aqui, 'docs', 'form4');
mkdirSync(dir, { recursive: true });
const UA = { 'User-Agent': 'analisis-inversion contacto@example.com', 'Accept-Encoding': 'gzip, deflate' };
const espera = (ms) => new Promise((ok) => setTimeout(ok, ms));

// Toma el contenido de <t>…</t>; si dentro hay <value>, ese valor (las notas al pie van al lado y no estorban).
const tag = (s, t) => {
  const m = s.match(new RegExp(`<${t}>([\\s\\S]*?)</${t}>`)); if (!m) return null;
  const v = m[1].match(/<value>\s*([^<]*?)\s*<\/value>/); return v ? v[1] : (/</.test(m[1]) ? null : m[1].trim());
};
const bloques = (s, t) => [...s.matchAll(new RegExp(`<${t}>([\\s\\S]*?)</${t}>`, 'g'))].map((m) => m[1]);

const filas = [];
for (let i = 0; i < r.form.length; i++) {
  if (!['4', '4/A'].includes(r.form[i]) || r.filingDate[i] < desde) continue;
  const acc = r.accessionNumber[i];
  const doc = r.primaryDocument[i].replace(/^xslF345X\d+\//, '');
  const url = `https://www.sec.gov/Archives/edgar/data/900075/${acc.replace(/-/g, '')}/${doc}`;
  const local = join(dir, `${acc}.xml`);
  let xml;
  if (existsSync(local)) xml = readFileSync(local, 'utf8');
  else {
    const res = await fetch(url, { headers: UA });
    if (!res.ok) { console.error(acc, 'HTTP', res.status); continue; }
    xml = await res.text(); writeFileSync(local, xml); await espera(150);
  }
  const persona = tag(xml, 'rptOwnerName');
  const cargo = [tag(xml, 'officerTitle'), /<isDirector>\s*(1|true)/.test(xml) ? 'Director' : null].filter(Boolean).join('; ');
  for (const [tipo, b] of [['ND', 'nonDerivativeTransaction'], ['D', 'derivativeTransaction']]) {
    for (const t of bloques(xml, b)) {
      const acciones = +tag(t, 'transactionShares') || 0;
      const precio = tag(t, 'transactionPricePerShare'); const p = precio != null && precio !== '' ? +precio : null;
      filas.push({
        presentacion: r.filingDate[i], acc, url, persona, cargo, clase: tipo,
        valor: tag(t, 'securityTitle'), fecha: tag(t, 'transactionDate'), codigo: tag(t, 'transactionCode'),
        ad: tag(t, 'transactionAcquiredDisposedCode'), acciones, precio: p, importe_musd: p != null ? +(acciones * p / 1e6).toFixed(3) : null,
        tras: +tag(t, 'sharesOwnedFollowingTransaction') || null, propiedad: tag(t, 'directOrIndirectOwnership'),
        plan_10b5_1: /<aff10b5One>\s*(1|true)/.test(xml),
      });
    }
  }
}
writeFileSync(join(aqui, 'C-form4.json'), JSON.stringify(filas, null, 1));
// Resumen por persona y código (solo no derivadas)
const res = {};
for (const f of filas.filter((x) => x.clase === 'ND')) {
  const k = `${f.persona} | ${f.codigo}`; res[k] ??= { n: 0, acciones: 0, importe: 0 }; res[k].n++; res[k].acciones += f.acciones; res[k].importe += f.importe_musd || 0;
}
console.log('Presentaciones/transacciones:', new Set(filas.map((f) => f.acc)).size, filas.length);
for (const [k, v] of Object.entries(res)) console.log(k, v.n, v.acciones, v.importe.toFixed(2));
for (const f of filas) console.log(f.fecha, f.persona, f.clase, f.codigo, f.ad, f.acciones, f.precio, f.importe_musd, f.propiedad, f.plan_10b5_1 ? '10b5-1' : '');
