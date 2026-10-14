// Atribución de la rentabilidad de la cartera real frente al índice mundial (vertical «Cartera real», 14-oct-2026; pedido
// del usuario: «dime por qué estoy tan por debajo de la rentabilidad del año en curso global, a qué se debe»).
// Método: verticales/cartera/metodo.md («Atribución»). Lee los datos privados de /mnt/project-files/cartera/real/ y deja
// allí atribucion-AAAA-MM-DD.md y .json. Sin dependencias.
//
//   NODE_USE_ENV_PROXY=1 node herramientas/cartera-atribucion.mjs [--desde 2025-12-31]
//
// Reconstruye la cartera día a día (todas las cuentas) y reparte la ganancia en euros de cada valor entre efecto precio y
// efecto divisa. Todo se mide con el método Dietz modificado sobre el capital medio, que descuenta los ingresos de dinero,
// así que las contribuciones de los valores, la liquidez y el resto suman exactamente la rentabilidad de la cartera.
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { leerOps, reconstruir, serie, precioEn, eurPor, nombreDe, frenteAlIndice, INDICE, DATOS, madrid, fechaCorta, f, fp, fe, masDias, dias, r, fijarDesde, guardar } from './cartera-real.mjs';

const argv = process.argv.slice(2);
const hoy = madrid().fecha;
const desde = argv.includes('--desde') ? argv[argv.indexOf('--desde') + 1] : `${+hoy.slice(0, 4) - 1}-12-31`;
const ops = leerOps();
fijarDesde(ops[0].fecha < desde ? ops[0].fecha : desde);

// Días de Bolsa del índice entre la fecha de inicio y hoy (más hoy, con el precio de ahora).
const si = await serie(INDICE.simbolo);
const diasB = [desde, ...si.cierres.map(([d]) => d).filter((d) => d > desde && d < hoy), hoy];
const precioDia = async (simbolo, d) => { const s = await serie(simbolo); return { p: d === hoy ? precioEn(s, null) : precioEn(s, d), div: s?.divisa }; };
const fxDia = (divisa, d) => eurPor(divisa, d === hoy ? null : d);

// Liquidez de cada día: el último saldo de cada cuenta menos lo que se movió después (sin saldos en la reconstrucción).
const sinSaldo = ops.filter((o) => o.tipo !== 'saldo');
const finSin = await reconstruir(sinSaldo);
const saldoFin = new Map();
for (const o of ops.filter((x) => x.tipo === 'saldo')) saldoFin.set(o.cuenta, +o.importe_eur);
const cajaEn = (rd) => { let t = 0; for (const [c, v] of finSin.caja) t += saldoFin.has(c) ? saldoFin.get(c) - (v - (rd.caja.get(c) ?? 0)) : rd.caja.get(c) ?? 0; for (const [c, v] of rd.caja) if (!finSin.caja.has(c)) t += v; return t; };

// Foto de cada día: títulos y valor en euros por valor, y liquidez.
const fotos = [];
for (const d of diasB) {
  const rd = await reconstruir(sinSaldo, d);
  const pos = {};
  for (const p of rd.pos.values()) {
    if (p.titulos <= 1e-9) continue;
    const { p: px, div } = await precioDia(p.simbolo, d), fx = await fxDia(div || p.divisa, d);
    pos[p.clave] = { titulos: p.titulos, precio: px, fx, divisa: div || p.divisa, valor: px && fx ? p.titulos * px * fx : null };
  }
  fotos.push({ d, pos, caja: cajaEn(rd), vend: Object.fromEntries([...rd.pos.values()].map((p) => [p.clave, { ventas: p.ventas_eur, compras: p.invertido_eur, div: p.dividendos_eur }])) });
}

// Ganancia de cada valor, día a día: valor de hoy − valor de ayer − compras + ventas + dividendos. Efecto divisa:
// títulos de ayer × precio de ayer × (cambio de hoy − cambio de ayer). Lo demás, efecto precio.
const G = {}; // clave → { ganancia, divisa_efecto, capital_dias }
const g = (k) => (G[k] ??= { ganancia: 0, fx: 0, capitalDias: 0, divisa: null, faltan: 0 });
for (let i = 1; i < fotos.length; i++) {
  const a = fotos[i - 1], b = fotos[i], n = Math.max(dias(a.d, b.d), 1);
  const claves = new Set([...Object.keys(a.pos), ...Object.keys(b.pos), ...Object.keys(b.vend).filter((k) => (b.vend[k].ventas - (a.vend[k]?.ventas ?? 0)) || (b.vend[k].compras - (a.vend[k]?.compras ?? 0)) || (b.vend[k].div - (a.vend[k]?.div ?? 0)))]);
  for (const k of claves) {
    const pa = a.pos[k], pb = b.pos[k], va = pa?.valor ?? 0, vb = pb?.valor ?? 0;
    if ((pa && pa.valor === null) || (pb && pb.valor === null)) { g(k).faltan++; continue; }
    const flujo = (b.vend[k]?.compras ?? 0) - (a.vend[k]?.compras ?? 0) - ((b.vend[k]?.ventas ?? 0) - (a.vend[k]?.ventas ?? 0));
    const divs = (b.vend[k]?.div ?? 0) - (a.vend[k]?.div ?? 0);
    const x = g(k);
    x.ganancia += vb - va - flujo + divs;
    if (pa && pb && pa.divisa !== 'EUR') x.fx += pa.titulos * pa.precio * (pb.fx - pa.fx);
    x.capitalDias += va * n; x.divisa = (pb || pa)?.divisa || x.divisa;
  }
}

// Cartera: Dietz modificado con los ingresos y retiradas de dinero.
const V0 = Object.values(fotos[0].pos).reduce((t, p) => t + (p.valor ?? 0), 0) + fotos[0].caja;
const V1 = Object.values(fotos.at(-1).pos).reduce((t, p) => t + (p.valor ?? 0), 0) + fotos.at(-1).caja;
const flujos = ops.filter((o) => o.clave === 'EUR' && ['ingreso', 'retirada'].includes(o.tipo) && o.fecha > desde).map((o) => ({ fecha: o.fecha, eur: o.tipo === 'ingreso' ? +o.importe_eur : -Math.abs(+o.importe_eur) }));
const T = Math.max(dias(desde, hoy), 1);
const base = V0 + flujos.reduce((t, fl) => t + fl.eur * Math.max(dias(fl.fecha, hoy), 0) / T, 0);
const neto = flujos.reduce((t, fl) => t + fl.eur, 0);
const gananciaTotal = V1 - V0 - neto;
const rent = 100 * gananciaTotal / base;
const idx = await frenteAlIndice({ v0: V0, desde, flujos, v1: V1, hoy });
const idxSimple = 100 * (precioEn(si, null) / precioEn(si, desde) - 1);

// Liquidez: lo que ganó (intereses) es lo que sobra de la ganancia total tras los valores.
const sumaValores = Object.values(G).reduce((t, x) => t + x.ganancia, 0);
const gananciaLiquidez = gananciaTotal - sumaValores;
let cajaDias = 0;
for (let i = 1; i < fotos.length; i++) cajaDias += fotos[i - 1].caja * Math.max(dias(fotos[i - 1].d, fotos[i].d), 1);
const capitalMedio = base; // el denominador común
const pesoMedio = (capDias) => 100 * capDias / T / capitalMedio;

// Lo que habría hecho cada euro en el índice el mismo tiempo: «coste de oportunidad» de cada valor = peso medio × índice.
const filas = Object.entries(G).map(([k, x]) => ({ clave: k, nombre: nombreDe(k), divisa: x.divisa, puntos: 100 * x.ganancia / capitalMedio, fx_puntos: 100 * x.fx / capitalMedio, ganancia: x.ganancia, peso_medio: pesoMedio(x.capitalDias), faltan: x.faltan }))
  .sort((a, b) => a.puntos - b.puntos);
const pesoCaja = pesoMedio(cajaDias);
for (const x of filas) x.frente_indice = x.puntos - x.peso_medio * idxSimple / 100; // lo que suma o resta frente a tener ese dinero en el índice
const cajaFrente = 100 * gananciaLiquidez / capitalMedio - pesoCaja * idxSimple / 100;

// Divisas: efecto total por moneda.
const porDivisa = {};
for (const x of filas) if (x.divisa && x.divisa !== 'EUR') porDivisa[x.divisa] = (porDivisa[x.divisa] ?? 0) + x.fx_puntos;
const cambios = {};
for (const d of ['USD', 'GBP', 'JPY', 'CHF', 'DKK']) { const a = await eurPor(d, desde), b = await eurPor(d, null); if (a && b) cambios[d] = 100 * (b / a - 1); }

// Motores del índice: grandes valores del MSCI World y sectores (fondos sectoriales de EE. UU. como aproximación), en euros.
const GRANDES = [['NVDA', 'Nvidia'], ['AAPL', 'Apple'], ['MSFT', 'Microsoft'], ['AMZN', 'Amazon'], ['GOOGL', 'Alphabet'], ['META', 'Meta'], ['AVGO', 'Broadcom'], ['TSLA', 'Tesla'], ['JPM', 'JPMorgan'], ['LLY', 'Eli Lilly'], ['TSM', 'TSMC (ADR)'], ['ASML', 'ASML'], ['ORCL', 'Oracle'], ['NFLX', 'Netflix']];
const SECTORES = [['XLK', 'Tecnología'], ['XLC', 'Comunicaciones'], ['XLF', 'Financiero'], ['XLV', 'Salud'], ['XLI', 'Industria'], ['XLY', 'Consumo cíclico'], ['XLP', 'Consumo básico'], ['XLE', 'Energía'], ['XLU', 'Servicios públicos'], ['XLB', 'Materiales'], ['XLRE', 'Inmobiliario'], ['SMH', 'Semiconductores'], ['URTH', 'MSCI World (USD)'], ['GLD', 'Oro (USD)']];
const enEur = async (sim) => { const s = await serie(sim); const a = precioEn(s, desde), b = precioEn(s, null), fa = await eurPor(s?.divisa, desde), fb = await eurPor(s?.divisa, null); return a && b && fa && fb ? 100 * (b * fb / (a * fa) - 1) : null; };
const grandes = []; for (const [s, n] of GRANDES) grandes.push({ simbolo: s, nombre: n, rent_eur: await enEur(s) });
const sectores = []; for (const [s, n] of SECTORES) sectores.push({ simbolo: s, nombre: n, rent_eur: await enEur(s) });

// Rotación: lo vendido este año, si se hubiera quedado, frente a lo que se hizo.
const ventas = [];
for (const o of ops.filter((x) => x.tipo === 'venta' && x.fecha > desde)) {
  const rd = await reconstruir(sinSaldo.filter((y) => y.clave === o.clave));
  const p = rd.pos.get(o.clave);
  const s = await serie(p.simbolo), px = precioEn(s, null), fx = await eurPor(s?.divisa, null), pv = precioEn(s, o.fecha), fv = await eurPor(s?.divisa, o.fecha);
  if (!px || !fx || !pv || !fv) { ventas.push({ clave: o.clave, nombre: nombreDe(o.clave), fecha: o.fecha, sin_precio: true }); continue; }
  const valorVenta = o.titulos * pv * fv, valorHoy = o.titulos * px * fx;
  const ip = precioEn(si, o.fecha);
  ventas.push({ clave: o.clave, nombre: nombreDe(o.clave), fecha: o.fecha, valor_venta: valorVenta, si_se_queda: valorHoy - valorVenta, en_indice: valorVenta * (precioEn(si, null) / ip - 1), desde_venta_pct: 100 * (valorHoy / valorVenta - 1) });
}
const agrup = {};
for (const v of ventas.filter((x) => !x.sin_precio)) { const a = (agrup[v.clave] ??= { nombre: v.nombre, valor_venta: 0, si_se_queda: 0, en_indice: 0, fechas: [] }); a.valor_venta += v.valor_venta; a.si_se_queda += v.si_se_queda; a.en_indice += v.en_indice; a.fechas.push(v.fecha); }
const rot = Object.values(agrup).sort((a, b) => b.si_se_queda - a.si_se_queda);
const rotTotal = rot.reduce((t, x) => t + x.si_se_queda, 0);

// Compras del año: lo que han hecho frente al índice desde su compra.
const comprasAnio = [];
for (const o of ops.filter((x) => x.tipo === 'compra' && x.fecha > desde)) {
  const s = await serie((await reconstruir(sinSaldo.filter((y) => y.clave === o.clave))).pos.get(o.clave).simbolo);
  const pc = precioEn(s, o.fecha), fc = await eurPor(s?.divisa, o.fecha), px = precioEn(s, null), fx = await eurPor(s?.divisa, null);
  // Si se vendió después, se mide hasta la venta.
  const venta = ops.find((y) => y.clave === o.clave && y.tipo === 'venta' && y.fecha >= o.fecha);
  const fin = venta?.fecha ?? null, pf = fin ? precioEn(s, fin) : px, ff = fin ? await eurPor(s?.divisa, fin) : fx;
  const ip0 = precioEn(si, o.fecha), ip1 = fin ? precioEn(si, fin) : precioEn(si, null);
  if (pc && fc && pf && ff) comprasAnio.push({ clave: o.clave, nombre: nombreDe(o.clave), fecha: o.fecha, hasta: fin, importe: o.titulos * pc * fc, rent: 100 * (pf * ff / (pc * fc) - 1), indice: 100 * (ip1 / ip0 - 1) });
}
const cAgr = {};
for (const c of comprasAnio) { const a = (cAgr[c.clave] ??= { nombre: c.nombre, importe: 0, ganancia: 0, ganancia_idx: 0 }); a.importe += c.importe; a.ganancia += c.importe * c.rent / 100; a.ganancia_idx += c.importe * c.indice / 100; }
const compras = Object.values(cAgr).map((x) => ({ ...x, rent: 100 * x.ganancia / x.importe, indice: 100 * x.ganancia_idx / x.importe, frente: x.ganancia - x.ganancia_idx })).sort((a, b) => a.frente - b.frente);

const out = { desde, hoy, V0, V1, ingresos: neto, capital_medio: capitalMedio, ganancia: gananciaTotal, rent, indice_mismos_flujos: idx.indice_rent, indice_simple: idxSimple,
  liquidez: { peso_medio: pesoCaja, ganancia: gananciaLiquidez, puntos: 100 * gananciaLiquidez / capitalMedio, frente_indice: cajaFrente },
  valores: filas, divisas: { puntos: porDivisa, cambio_pct: cambios }, grandes, sectores, rotacion: { ventas: rot, total: rotTotal }, compras };
guardar(join(DATOS, `atribucion-${hoy}.json`), out);

// ───────── Informe ─────────
const L = [];
const pts = (x) => `${x >= 0 ? '+' : ''}${f(x, 1)}`;
L.push(`# Por qué la cartera va por detrás del índice · desde el ${fechaCorta(desde)} hasta el ${fechaCorta(hoy)}`, '');
L.push(`Cartera ${fp(rent)} · índice mundial ${fp(idxSimple)} (${INDICE.nombre}: fondo de acumulación, con dividendos, en euros) · diferencia ${pts(rent - idxSimple)} puntos.`, '');
L.push(`**Comparación justa.** La cartera se mide con dividendos y comisiones, en euros, descontando los ${fe(neto)} ingresados (Dietz modificado: el dinero cuenta solo desde que entra). El índice con los mismos ingresos en las mismas fechas habría hecho ${fp(idx.indice_rent)}. Capital medio del periodo: ${fe(capitalMedio)}.`, '');
L.push('## Lo que suma o resta cada parte', '', '| Parte | Peso medio | Aporta a la cartera | Frente a tener ese dinero en el índice | Del que es divisa |', '|---|---|---|---|---|');
for (const x of filas) L.push(`| ${x.nombre} | ${f(x.peso_medio, 1)} % | ${pts(x.puntos)} | ${pts(x.frente_indice)} | ${x.divisa !== 'EUR' ? pts(x.fx_puntos) : '—'} |`);
L.push(`| Liquidez | ${f(pesoCaja, 1)} % | ${pts(out.liquidez.puntos)} | ${pts(cajaFrente)} | — |`);
L.push(`| **Total** | 100 % | **${pts(rent)}** | **${pts(rent - idxSimple * (filas.reduce((t, x) => t + x.peso_medio, 0) + pesoCaja) / 100)}** | **${pts(Object.values(porDivisa).reduce((t, x) => t + x, 0))}** |`, '');
L.push('«Aporta» son puntos de la rentabilidad de la cartera (suman la rentabilidad total). «Frente al índice» resta lo que ese mismo dinero, ese mismo tiempo, habría ganado en el índice: suma la diferencia con el índice.', '');
L.push('## Divisas', '', `Cambio frente al euro en el periodo: ${Object.entries(cambios).map(([d, x]) => `${d} ${fp(x)}`).join(' · ')}. Efecto en la cartera: ${Object.entries(porDivisa).map(([d, x]) => `${d} ${pts(x)}`).join(' · ')} puntos.`, '');
L.push('## Qué empujó al índice', '', '| Valor o sector | En el año, en euros |', '|---|---|');
for (const x of [...grandes].sort((a, b) => (b.rent_eur ?? -999) - (a.rent_eur ?? -999))) L.push(`| ${x.nombre} | ${fp(x.rent_eur)} |`);
L.push('', '| Sector (fondos de EE. UU., aproximación) | En el año, en euros |', '|---|---|');
for (const x of [...sectores].sort((a, b) => (b.rent_eur ?? -999) - (a.rent_eur ?? -999))) L.push(`| ${x.nombre} | ${fp(x.rent_eur)} |`);
L.push('', '## Rotación: lo vendido este año, si se hubiera quedado', '', '| Valor | Vendido | Si se hubiera quedado (hasta hoy) | Ese dinero en el índice |', '|---|---|---|---|');
for (const x of rot) L.push(`| ${x.nombre} (${x.fechas.map(fechaCorta).join(', ')}) | ${fe(x.valor_venta)} | ${x.si_se_queda >= 0 ? '+' : ''}${fe(x.si_se_queda)} | ${x.en_indice >= 0 ? '+' : ''}${fe(x.en_indice)} |`);
L.push(`| **Total** | | **${rotTotal >= 0 ? '+' : ''}${fe(rotTotal)}** | |`, '');
L.push('## Compras del año frente al índice', '', '| Valor | Invertido | Rentabilidad (hasta hoy o hasta su venta) | Índice el mismo tiempo | Diferencia en euros |', '|---|---|---|---|---|');
for (const x of compras) L.push(`| ${x.nombre} | ${fe(x.importe)} | ${fp(x.rent)} | ${fp(x.indice)} | ${x.frente >= 0 ? '+' : ''}${fe(x.frente)} |`);
L.push('');
writeFileSync(join(DATOS, `atribucion-${hoy}.md`), L.join('\n'));
console.log(L.join('\n'));
if (process.argv.includes('--depurar')) for (const x of fotos.filter((_, i) => i % 15 === 0 || i === fotos.length - 1)) console.error(x.d, Math.round(x.caja), Math.round(Object.values(x.pos).reduce((t, p) => t + (p.valor ?? 0), 0)), Object.entries(x.pos).filter(([, p]) => p.valor === null).map(([k]) => k).join(','));
