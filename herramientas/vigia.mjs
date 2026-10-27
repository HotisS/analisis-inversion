#!/usr/bin/env node
// Vigía de compras y ventas pendientes (16-oct-2026). Regla del usuario: no hay órdenes límite en el broker; solo compra
// o vende a mercado en el momento. El límite robusto sigue siendo el umbral: se compra a mercado solo si en ese momento
// cotiza en el límite o por debajo. Como ya no espera ninguna orden en el broker, el aviso sale de aquí.
//
// Lee las órdenes de la carpeta privada (escaner-cartera.json → ordenes_pendientes: `comprar`, `lista_espera` y, si
// alguna lleva condición de precio, `vender` como objetos {clave, minimo}) y mira el precio de ahora en Yahoo (velas de
// 5 minutos de hoy). Avisa:
//   - «COMPRA AHORA A MERCADO» si cotiza en el límite o por debajo con el mercado abierto (precio, hora, mercado, divisa);
//   - «Tocó el límite y rebotó» si desde la última pasada bajó al límite pero ahora está por encima (para que se vea).
// Un mismo cruce se avisa una vez: vuelve a avisar si el precio sale por encima y vuelve a entrar, o al día siguiente.
// Sin nada que avisar no escribe nada (sale con «nada»). Es solo lectura: nunca toca el broker.
//
//   NODE_USE_ENV_PROXY=1 node herramientas/vigia.mjs        → /mnt/project-files/cartera/real/escaner/vigia-ultimo.md
//   … --todo                                              enseña también las que están por encima (sin avisar)
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';

const REAL = process.env.CARTERA_REAL || '/mnt/project-files/cartera/real';
const CARTERA = `${REAL}/escaner-cartera.json`, ESTADO = `${REAL}/escaner/vigia-estado.json`, SALIDA = `${REAL}/escaner/vigia-ultimo.md`;
const leer = (r, d) => { try { return JSON.parse(readFileSync(r, 'utf8')); } catch { return d; } };
const UA = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' };
const todo = process.argv.includes('--todo');
const hoy = new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Madrid' });
const hora = (t) => new Date(t * 1000).toLocaleTimeString('es-ES', { timeZone: 'Europe/Madrid', hour: '2-digit', minute: '2-digit' });
const fp = (x, d = 2) => x.toLocaleString('es-ES', { minimumFractionDigits: d, maximumFractionDigits: d, useGrouping: 'always' });
const tit = (n) => (n ? `, ${n} ${n === 1 ? 'título' : 'títulos'}` : '');

if (!existsSync(CARTERA)) { console.error(`No veo ${CARTERA}`); process.exit(1); }
const cart = leer(CARTERA, {});
const op = cart.ordenes_pendientes || {};
const PRECIOS = leer(new URL('../verticales/empresa/precios.json', import.meta.url), {});
// Niveles de compra (regla 16, 20-oct-2026): cada orden de compra puede llevar `nivel` (A, B1, B2, C); el aviso dice el nivel y
// su tamaño máximo (escaner/reglas.json → niveles_compra).
// 27-oct-2026: (1) los niveles A/B1/B2/C son SOLO value: una growth nunca lleva nivel (el 21-oct salió «Nivel A» en Nu porque
// sin `nivel` se daba por A); (2) una value sin `nivel` ya no se da por A: se dice que falta; (3) el nivel depende del precio:
// si a este precio pasan dos entradas de la misma empresa (NEM con A y NEM-B1 con B1), solo avisa la del mejor nivel.
const REGLAS_V = leer(new URL('../escaner/reglas.json', import.meta.url), {});
const NIVELES = REGLAS_V.niveles_compra || {};
const ORDEN_NIVEL = ['A', 'B1', 'B2', 'C'];
const GROWTH = new Set((() => { try { return readdirSync(new URL('../informes-growth/', import.meta.url), { withFileTypes: true }).filter((e) => e.isDirectory())
  .map((e) => leer(new URL(`../informes-growth/${e.name}/datos.json`, import.meta.url), {})?.ticker).filter(Boolean).map((t) => String(t).toUpperCase()); } catch { return []; } })());
const esGrowth = (o) => o.vertical === 'growth' || (o.vertical !== 'value' && GROWTH.has(String(o.clave).replace(/-(A|B1|B2|C)$/, '').toUpperCase()));
const txtNivel = (o) => {
  if (esGrowth(o)) return ` Growth (sin niveles A/B/C; bolsillo growth como mucho ${REGLAS_V.bolsillo_growth_max_pct ?? 20} %).`;
  if (!o.nivel) return ' Nivel sin indicar: comprobar con robustez.mjs antes de comprar.';
  const t = NIVELES[o.nivel]?.tope_pct; return ` Nivel ${o.nivel} a este precio${t ? ` (tamaño máximo ${fp(t, t % 1 ? 1 : 0)} % de la cartera)` : ''}.`;
};
const MAPA = { IOT: 'IOT', ...(op.simbolos || {}) };
const simbolo = (k) => MAPA[k] || (PRECIOS.precios || PRECIOS)[k]?.simbolo || k;
const nombre = (k, m) => (PRECIOS.precios || PRECIOS)[k]?.nombre || m?.shortName || k;

const lista = [
  ...(op.comprar || []).map((o) => ({ ...o, lado: 'compra', reservada: /reservad/i.test(o.nota || '') })),
  ...(op.lista_espera || []).filter((o) => !o.hasta || o.hasta >= hoy).map((o) => ({ ...o, lado: 'compra', reservada: false })),
  ...(op.vender || []).filter((o) => typeof o === 'object' && o.minimo).map((o) => ({ ...o, lado: 'venta', limite: o.minimo })),
];

async function velas(s) {
  for (let i = 0; i < 3; i++) {
    try {
      const r = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(s)}?range=1d&interval=5m`, { headers: UA, signal: AbortSignal.timeout(20000) });
      if (r.ok) return (await r.json()).chart?.result?.[0] || null;
    } catch { /* reintenta */ }
    await new Promise((ok) => setTimeout(ok, 1500 * (i + 1)));
  }
  return null;
}
const fx = {};
async function aEur(divisa) {
  const d = divisa === 'GBp' ? 'GBP' : divisa;
  if (d === 'EUR') return 1;
  if (fx[d] === undefined) { const x = await velas(`EUR${d}=X`); fx[d] = x?.meta?.regularMarketPrice || null; }
  return fx[d] ? (divisa === 'GBp' ? 0.01 : 1) / fx[d] : null;
}

const est = leer(ESTADO, {});
const avisos = [], resto = [];
// Mejor nivel primero: si el de arriba ya avisa a este precio, el de abajo de la misma empresa se calla.
lista.sort((a, b) => (a.lado === 'compra' && b.lado === 'compra' ? (ORDEN_NIVEL.indexOf(a.nivel) + 1 || 9) - (ORDEN_NIVEL.indexOf(b.nivel) + 1 || 9) : 0));
const avisadoCompra = new Set();
for (const o of lista) {
  const s = simbolo(o.clave), x = await velas(s);
  if (!x?.meta) continue;
  const m = x.meta, q = x.indicators?.quote?.[0] || {}, ts = x.timestamp || [];
  const escala = m.currency === 'GBp' && o.divisa === 'GBP' ? 100 : 1; // límites en libras, Londres cotiza en peniques
  const lim = o.limite * escala, precio = m.regularMarketPrice, t = m.regularMarketTime;
  const tp = m.currentTradingPeriod?.regular, ahora = Date.now() / 1000;
  const abierto = tp && ahora >= tp.start && ahora < tp.end;
  const id = `${o.lado}:${o.clave}`, e = est[id] || {};
  const desde = e.fecha === hoy ? e.t || 0 : 0;
  let minimo = null, tMin = null, maximo = null, tMax = null;
  ts.forEach((tt, i) => {
    if (tt <= desde) return;
    if (q.low?.[i] != null && (minimo === null || q.low[i] < minimo)) { minimo = q.low[i]; tMin = tt; }
    if (q.high?.[i] != null && (maximo === null || q.high[i] > maximo)) { maximo = q.high[i]; tMax = tt; }
  });
  const dentro = o.lado === 'compra' ? precio <= lim : precio >= lim;
  const toco = o.lado === 'compra' ? minimo !== null && minimo <= lim : maximo !== null && maximo >= lim;
  const n = nombre(o.clave, m), dv = m.currency, bolsa = m.fullExchangeName || m.exchangeName;
  const P = (v) => `${fp(v / escala, escala === 100 || v < 20 ? 3 : 2)} ${escala === 100 ? 'GBP' : dv}`;
  const yaAvisado = e.fecha === hoy && e.dentro;
  const sim = simbolo(o.clave);
  if (o.lado === 'compra' && dentro && avisadoCompra.has(sim)) { est[id] = { fecha: hoy, t: ts.at(-1) || t, dentro: true }; continue; }
  if (o.lado === 'compra' && dentro && abierto) avisadoCompra.add(sim);
  if (dentro && abierto && !yaAvisado) {
    const eur = await aEur(dv), coste = o.titulos && eur ? Math.round(o.titulos * precio * eur) : null;
    const dinero = o.lado === 'venta' || o.reservada || coste === null ? '' :
      coste <= (cart.liquidez_libre_eur ?? 0) ? '' : ` Ojo: cuesta unos ${fp(coste, 0)} € y la liquidez libre es de ${fp(cart.liquidez_libre_eur ?? 0, 0)} €; hace falta vender antes o repartir entre cuentas.`;
    avisos.push(o.lado === 'compra'
      ? `**COMPRA AHORA A MERCADO: ${n}${tit(o.titulos)}.** Cotiza a ${P(precio)} (${hora(t)} de Madrid, ${bolsa}); su precio máximo de compra es ${P(lim)}${coste ? `; unos ${fp(coste, 0)} €` : ''}.${txtNivel(o)}${o.reservada ? ` Dinero ya reservado${o.cuenta ? ` en la ${o.cuenta.replace(/-/g, ' ')}` : ''}.` : o.cuenta ? ` Cuenta: ${o.cuenta.replace(/-/g, ' ')}.` : ''}${dinero}`
      : `**VENDE AHORA A MERCADO: ${n}${tit(o.titulos)}.** Cotiza a ${P(precio)} (${hora(t)} de Madrid, ${bolsa}); se vende desde ${P(lim)}.`);
  } else if (!dentro && toco) {
    avisos.push(`${n} tocó su límite (${P(o.lado === 'compra' ? minimo : maximo)} a las ${hora(o.lado === 'compra' ? tMin : tMax)}; límite ${P(lim)}) y ahora está en ${P(precio)} (${hora(t)}, ${bolsa}): ahora no ${o.lado === 'compra' ? 'se compra' : 'se vende'}.`);
  } else if (todo) resto.push(`${n}: ${P(precio)} (${hora(t)}, ${abierto ? 'abierto' : 'cerrado'}); límite ${P(lim)}${dentro ? ' (dentro, ya avisado o mercado cerrado)' : ''}.`);
  est[id] = { fecha: hoy, t: ts.at(-1) || t, dentro: dentro && abierto ? true : (e.fecha === hoy && e.dentro && dentro) };
}
writeFileSync(ESTADO, `${JSON.stringify(est, null, 2)}\n`);
const texto = avisos.length ? `**Vigía ${hora(Date.now() / 1000)} (Madrid)**\n\n${avisos.map((a) => `- ${a}`).join('\n')}\n` : '';
writeFileSync(SALIDA, texto);
console.log(texto || 'nada');
if (resto.length) console.log(resto.join('\n'));
