// Operaciones de directivos y consejeros de una empresa de EE. UU. (Form 4 de la SEC), agregadas por
// persona: compras en mercado (código P), ventas (S), y el resto (concesiones, ejercicios, retenciones).
// Sin dependencias.
//
//   node herramientas/form4.mjs --ticker CPRT --desde 2025-10-07 [--hasta 2026-10-07] [--salida notas/form4.json]
//   node herramientas/form4.mjs --cik 900075 --desde 2025-10-07
//
// Lo que cuenta para `gobierno.insiders` son las compras y ventas en mercado (P y S). Las ventas de un plan
// 10b5-1 se marcan: son programadas y dicen menos que una venta discrecional.

import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const a = {};
const argv = process.argv.slice(2);
for (let i = 0; i < argv.length; i++) if (argv[i].startsWith('--')) a[argv[i].slice(2)] = argv[i + 1];
if ((!a.ticker && !a.cik) || !a.desde) { console.error('Uso: node herramientas/form4.mjs --ticker XXX | --cik N --desde AAAA-MM-DD [--hasta AAAA-MM-DD] [--salida archivo.json]'); process.exit(1); }
const UA = { 'User-Agent': process.env.SEC_UA || 'analisis-inversion research admin@example.com', 'Accept-Encoding': 'gzip, deflate' };
const pausa = (ms) => new Promise((r) => setTimeout(r, ms)); // la SEC admite 10 peticiones por segundo
const get = async (url, json = true) => { await pausa(130); const r = await fetch(url, { headers: UA, signal: AbortSignal.timeout(60000) }); if (!r.ok) throw new Error(`${url}: HTTP ${r.status}`); return json ? r.json() : r.text(); };

let cik = a.cik ? String(+a.cik) : null;
if (!cik) {
  const t = await get('https://www.sec.gov/files/company_tickers.json');
  const e = Object.values(t).find((x) => x.ticker.toUpperCase() === a.ticker.toUpperCase());
  if (!e) { console.error(`Ticker ${a.ticker} no encontrado en la SEC.`); process.exit(1); }
  cik = String(e.cik_str);
}
const cik10 = cik.padStart(10, '0');
const sub = await get(`https://data.sec.gov/submissions/CIK${cik10}.json`);
const hasta = a.hasta || '9999-12-31';
const rec = sub.filings.recent;
const filings = rec.form.map((f, i) => ({ form: f, fecha: rec.filingDate[i], acc: rec.accessionNumber[i], doc: rec.primaryDocument[i] }))
  .filter((x) => (x.form === '4' || x.form === '4/A') && x.fecha >= a.desde && x.fecha <= hasta);
if (sub.filings.files?.length && rec.filingDate.at(-1) > a.desde) console.error('AVISO: el periodo pide presentaciones más antiguas que las «recientes» de la SEC; puede faltar alguna.');

const etiqueta = (x, t) => { const m = x.match(new RegExp(`<${t}>([\\s\\S]*?)</${t}>`)); if (!m) return null; const v = m[1].match(/<value>([\s\S]*?)<\/value>/); return (v ? v[1] : m[1].replace(/<[^>]+>/g, "")).trim() || null; };
const ops = [];
let otrosEmisores = 0;
for (const f of filings) {
  // El documento principal es la versión con estilo (xslF345X0N/…); el XML en bruto está en la raíz.
  const xmlDoc = f.doc.replace(/^xslF345X\d+\//, '');
  let x;
  try { x = await get(`https://www.sec.gov/Archives/edgar/data/${cik}/${f.acc.replace(/-/g, '')}/${xmlDoc}`, false); } catch (e) { console.error(`AVISO: ${f.acc}: ${e.message}`); continue; }
  // Una empresa también presenta Form 4 como accionista del 10 % de OTRA (Uber vendiendo Aurora, ICE en
  // otras sociedades): solo cuentan los que tienen a esta empresa como emisor.
  const emisor = etiqueta(x, 'issuerCik');
  if (emisor && String(+emisor) !== cik) { otrosEmisores++; continue; }
  const nombre = (etiqueta(x, 'rptOwnerName') || '').replace(/&amp;/g, '&'), cargo = (etiqueta(x, 'officerTitle') || '').replace(/&amp;/g, '&') || (/<isDirector>\s*(1|true)/.test(x) ? 'Consejero' : null);
  const plan = /10b5-1/i.test(x);
  for (const m of x.matchAll(/<nonDerivativeTransaction>([\s\S]*?)<\/nonDerivativeTransaction>/g)) {
    const t = m[1];
    const codigo = etiqueta(t, 'transactionCode'), acciones = +etiqueta(t, 'transactionShares') || 0, precio = +etiqueta(t, 'transactionPricePerShare') || 0;
    ops.push({ fecha: etiqueta(t, 'transactionDate') || f.fecha, persona: nombre, cargo, codigo, adquiere: etiqueta(t, 'transactionAcquiredDisposedCode') === 'A', acciones, precio, importe: Math.round(acciones * precio), plan_10b5_1: plan, presentacion: f.acc });
  }
}

if (otrosEmisores) console.error(`Fuera ${otrosEmisores} Form 4 en los que ${sub.name} es accionista de otra empresa (no son operaciones de sus directivos).`);
const NOMBRES = { P: 'compra en mercado', S: 'venta en mercado', A: 'concesión', M: 'ejercicio de opciones', F: 'retención fiscal', G: 'donación', C: 'conversión' };
const porPersona = {};
for (const o of ops) {
  const p = (porPersona[o.persona] ||= { persona: o.persona, cargo: o.cargo, compras_importe: 0, ventas_importe: 0, ventas_plan_10b5_1: 0, compras_acciones: 0, ventas_acciones: 0, otras: 0 });
  if (o.codigo === 'P') { p.compras_importe += o.importe; p.compras_acciones += o.acciones; }
  else if (o.codigo === 'S') { p.ventas_importe += o.importe; p.ventas_acciones += o.acciones; if (o.plan_10b5_1) p.ventas_plan_10b5_1 += o.importe; }
  else p.otras++;
}
const personas = Object.values(porPersona).sort((x, y) => y.ventas_importe + y.compras_importe - (x.ventas_importe + x.compras_importe));
const tot = (k) => personas.reduce((s, p) => s + p[k], 0);
const salida = {
  fuente: `SEC EDGAR, Form 4 de ${sub.name} (CIK ${cik}), presentados entre ${a.desde} y ${a.hasta || 'hoy'}`,
  empresa: sub.name, cik, n_presentaciones: filings.length, n_operaciones: ops.length,
  total_compras: tot('compras_importe'), total_ventas: tot('ventas_importe'), ventas_con_plan_10b5_1: tot('ventas_plan_10b5_1'),
  personas, operaciones: ops.map((o) => ({ ...o, tipo: NOMBRES[o.codigo] || o.codigo })),
};
if (a.salida) { mkdirSync(dirname(a.salida), { recursive: true }); writeFileSync(a.salida, JSON.stringify(salida, null, 2)); }
const fm = (v) => Math.round(v).toLocaleString('es-ES');
console.log(`${salida.fuente}\n${filings.length} presentaciones, ${ops.length} operaciones. Compras en mercado: ${fm(salida.total_compras)} USD; ventas: ${fm(salida.total_ventas)} USD (${fm(salida.ventas_con_plan_10b5_1)} con plan 10b5-1).`);
for (const p of personas.filter((p) => p.compras_importe || p.ventas_importe)) console.log(`  ${p.persona} (${p.cargo || 's/c'}): compras ${fm(p.compras_importe)} · ventas ${fm(p.ventas_importe)}${p.ventas_plan_10b5_1 ? ` (plan ${fm(p.ventas_plan_10b5_1)})` : ''}`);
