// Leads de oportunidades a partir de los expedientes de noticias (15-oct-2026, a petición del usuario: «no quiero leer
// las noticias; quiero que alimenten un registro por compañía o sector y nos den leads de potenciales oportunidades»).
// Reglas explícitas (el modelo de herramientas/noticias-modelo.mjs solo podrá ordenarlas cuando pase su validación).
//
// Un lead NO es una señal ni llega al usuario: es un encargo para la vigilancia de las 9:25, que hace el Vup del análisis
// y la robustez con el precio de ahora. Solo si sale compra robusta con calidad (ROIC − WACC ≥ 5 y sostenibilidad «Sí»)
// llega al usuario, como candidata con su límite (regla dura: nunca órdenes).
//
//   NODE_USE_ENV_PROXY=1 node herramientas/leads.mjs            leads de hoy (los ya dados en 14 días no se repiten)
//   … --escribir                                                guarda leads-ultimo.md/.json y el registro en la carpeta privada
//   … --max 6                                                   como mucho tantos leads al día (cada uno cuesta un Vup)
//   … --json
//
// Tipos:
//   A  cerca del límite tras una caída sin tesis rota: analizada value, precio entre 0 y 15 % por encima de su límite
//      robusto, ha caído un 8 % o más en un mes y en 30 días no hay recorte de guía, contabilidad, salida de directivos
//      ni ventas fuertes de directivos.
//   B  hecho a favor cerca del límite: precio a menos del 15 % del límite (value) o del precio máximo de compra (growth) y en
//      7 días una noticia a favor (guía al alza, directivos que compran, mejora de analistas, contrato, aprobación).
//   C  compras de directivos: dos o más personas compran en mercado en 30 días (formularios 4) a menos del 30 % del límite.
//   D  condición pendiente de escaner/noticias.json «_condiciones» (las de «Vigilar» de cola.md): llegó su fecha o salió una
//      noticia que la toca.
// Lo que ya está por debajo del límite no es lead: el escáner ya lo da como señal.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { serie } from './movimiento.mjs';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');
const P = `${process.env.CARTERA_REAL || '/mnt/project-files/cartera/real'}/escaner/`;
const leer = (p, d) => { try { return existsSync(p) ? JSON.parse(readFileSync(p, 'utf8')) : d; } catch { return d; } };
const dia = (d) => new Date(d).toISOString().slice(0, 10);
const hoy = dia(Date.now());
const hace = (n) => dia(Date.now() - n * 864e5);
const f = (x, d = 1) => (x == null ? 'n.d.' : (+x).toLocaleString('es-ES', { maximumFractionDigits: d }));

const reglas = leer(join(RAIZ, 'escaner/reglas.json'), {});
const ajustes = leer(join(RAIZ, 'escaner/noticias.json'), {});
const cartera = leer(`${process.env.CARTERA_REAL || '/mnt/project-files/cartera/real'}/escaner-cartera.json`, { posiciones: [] });
const enCartera = new Set((cartera.posiciones || []).map((x) => x.clave));
const fuera = (k) => reglas.exclusiones?.[k] || enCartera.has(k);
const expediente = (k) => leer(`${P}expedientes/${k}.json`, { noticias: [] }).noticias;
const simbolos = leer(join(RAIZ, 'verticales/empresa/simbolos.json'), { empresas: {} }).empresas;

// Universo con límite: value (robustez.json) y growth (informes-growth/robustez.json con símbolo conocido).
// Value: la robustez se calcula AL MOMENTO (27-oct-2026: el robustez.json guardado era del 15-oct y traía límites viejos e
// informes ya sustituidos); solo el informe más nuevo de cada empresa.
const value = JSON.parse(execFileSync(process.execPath, [join(RAIZ, 'herramientas/robustez.mjs'), '--todas', '--json'], { cwd: RAIZ, encoding: 'utf8', maxBuffer: 1 << 28 }))
  .filter((x) => !x.error && !x.obsoleto && x.limite_robusto_cot && x.precio_cot && simbolos[x.clave]?.yahoo)
  .map((x) => ({ vertical: 'value', clave: x.clave, nombre: x.nombre, simbolo: simbolos[x.clave].yahoo, carpeta: x.carpeta, precio_ref: x.precio_cot, fecha_ref: x.fecha_precio, limite: x.limite_robusto_cot, divisa: x.divisa_cotizacion, accion: x.accion_robusta, rentabilidad: x.ponderada }));
const growth = leer(join(RAIZ, 'informes-growth/robustez.json'), { resultados: [] }).resultados
  .map((x) => ({ ...x, simbolo: x.simbolo || ajustes[x.ticker]?.yahoo }))
  .filter((x) => x.precio_max_compra && x.simbolo && x.precio_informe)
  .map((x) => ({ vertical: 'growth', clave: x.ticker, nombre: x.empresa, simbolo: x.simbolo, carpeta: x.carpeta, precio_ref: x.precio_hoy ?? x.precio_informe, fecha_ref: x.fecha_hoy || x.carpeta.match(/\d{4}-\d\d-\d\d/)?.[0], limite: x.precio_max_compra, divisa: x.divisa, accion: x.senal_robusta, rentabilidad: x.ponderada_hoy ?? x.ponderada }));

// Precio de ahora en las unidades del límite: precio de referencia × (último cierre / cierre en la fecha de referencia).
// Así no importan las unidades de Yahoo (peniques en Londres, por ejemplo).
async function ahora(e) {
  const s = await serie(e.simbolo, { anios: 1 });
  if (s.error || !s.puntos?.length) return null;
  const pts = s.puntos, ult = pts[pts.length - 1];
  const ref = [...pts].reverse().find((p) => p[0] <= e.fecha_ref) || pts[0];
  const mes = pts[Math.max(0, pts.length - 22)];
  return { precio: e.precio_ref * (ult[1] / ref[1]), fecha: ult[0], var_1m: (ult[1] / mes[1] - 1) * 100 };
}
const enParalelo = async (lista, n, fn) => { const out = []; let i = 0; await Promise.all(Array.from({ length: n }, async () => { while (i < lista.length) { const k = i++; out[k] = await fn(lista[k]); } })); return out; };

const ROMPE = (n) => ['guía', 'contabilidad', 'directivos fuera'].includes(n.categoria) || (n.categoria === 'directivos venden' && n.gravedad === 'alta');
// A favor de verdad: no basta el tono (un «upgrade» de producto o un «beat» en otro sentido). Se mira en 15-oct sobre 242 valores.
const pelar = (t) => t.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const FAVOR = /upgrad(es|ed)\b.{0,40}\bto (buy|outperform|overweight|add|accumulate|strong buy)|double upgrade|raises? .{0,25}\bto (buy|outperform|overweight)|mejora .{0,30}(comprar|sobreponderar)|beats? (q[1-4] |quarterly |earnings |revenue |profit )?(estimates|expectations|consensus|forecasts?|view)|tops (estimates|expectations|forecasts)|(profit|revenue|earnings|sales) (and revenue )?beat|record (quarter|revenue|sales|profit|orders|backlog)|raises? (its |full.year |annual )?(guidance|outlook|forecast)|guidance (raise|hike)|wins? .{0,30}(contract|order)|awarded .{0,30}contract|(fda|ema|ec) approv|eleva (sus )?previsiones|supera (las )?previsiones|bate (las )?previsiones|batte (le )?stime|depasse (les )?attentes|uebertrifft/;
const A_FAVOR = (n) => n.categoria === 'guía al alza' || n.categoria === 'directivos compran' || (n.tono !== 'negativo' && FAVOR.test(pelar(n.titular)) && !/cautious|offset|but analyst|could beat|may beat|ahead of/.test(pelar(n.titular)));

const leads = [];
const candidatos = [...value, ...growth].filter((e) => !fuera(e.clave));
await enParalelo(candidatos, 6, async (e) => {
  const ns = expediente(e.clave);
  const n30 = ns.filter((n) => n.fecha >= hace(30)), n7 = ns.filter((n) => n.fecha >= hace(7));
  const favor = n7.filter(A_FAVOR), compras = n30.filter((n) => n.categoria === 'directivos compran' && ((n.n_personas || 0) >= 2 || n.gravedad === 'alta'));
  const rompe = n30.filter(ROMPE);
  // Solo se pide precio a las que tienen algo: noticias a favor, compras o una caída posible (sin noticias que rompan).
  if (!favor.length && !compras.length && rompe.length) return;
  const p = await ahora(e);
  if (!p) return;
  const d = (p.precio / e.limite - 1) * 100;
  if (d <= 0) return; // ya es señal del escáner
  const base = { ...e, precio: p.precio, fecha_precio: p.fecha, distancia_pct: d, var_1m_pct: p.var_1m };
  if (e.vertical === 'value' && d <= 15 && p.var_1m <= -8 && !rompe.length)
    leads.push({ ...base, tipo: 'A', motivo: `Ha caído un ${f(-p.var_1m, 0)} % en un mes, está a un ${f(d)} % de su límite robusto (${f(e.limite, 2)} ${e.divisa}) y en 30 días no hay noticias que rompan la tesis.`, noticias: n30.slice(0, 3) });
  if (d <= 15 && favor.length)
    leads.push({ ...base, tipo: 'B', motivo: `Noticia a favor (${favor[0].categoria}: «${favor[0].titular}») y está a un ${f(d)} % de su ${e.vertical === 'value' ? 'límite robusto' : 'precio máximo de compra'}.`, noticias: favor.slice(0, 3) });
  if (d <= 30 && compras.length)
    leads.push({ ...base, tipo: 'C', motivo: `${compras[0].titular} (30 días); está a un ${f(d)} % de su límite.`, noticias: compras.slice(0, 3) });
});

// D: condiciones pendientes (escaner/noticias.json «_condiciones»): {clave, texto, fecha?, noticia?}.
for (const c of ajustes._condiciones || []) {
  const ns = expediente(c.clave).filter((n) => n.fecha >= hace(7));
  const re = c.noticia ? new RegExp(c.noticia, 'i') : null;
  const toca = re ? ns.filter((n) => re.test(n.titular.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase())) : [];
  if ((c.fecha && c.fecha <= hoy && c.fecha >= hace(7)) || toca.length)
    leads.push({ tipo: 'D', clave: c.clave, nombre: c.nombre || c.clave, vertical: c.vertical || 'value', motivo: `Condición pendiente: ${c.texto}${toca.length ? ` Noticia: «${toca[0].titular}».` : ` (fecha ${c.fecha}).`}`, noticias: toca.slice(0, 3) });
}

// Memoria: un lead (empresa + tipo) no se repite en 14 días. Registro para medir y para el modelo.
const vistos = leer(`${P}leads-vistos.json`, { nota: 'Leads ya dados (herramientas/leads.mjs): empresa|tipo → fecha. Lo escribe la herramienta.', leads: {} });
// Orden: D (hecho pendiente), C (compran directivos), A, B; dentro, el más cerca del límite. Como mucho --max (6) al día:
// cada lead cuesta un Vup; los que no entran hoy salen mañana (no se marcan como vistos).
const ORDEN = { D: 0, C: 1, A: 2, B: 3 };
const max = +(process.argv[process.argv.indexOf('--max') + 1] || 0) || 6;
const nuevos = leads.filter((l) => !(vistos.leads[`${l.clave}|${l.tipo}`] >= hace(14)))
  .sort((a, b) => (a.tipo === b.tipo ? (a.distancia_pct ?? 99) - (b.distancia_pct ?? 99) : ORDEN[a.tipo] - ORDEN[b.tipo]))
  .filter((l, i, xs) => xs.findIndex((x) => x.clave === l.clave) === i).slice(0, max);
const lineas = [`Leads ${hoy}: ${nuevos.length}. Para cada uno: Vup del análisis y robustez con el precio de ahora; solo si sale compra robusta con calidad pasa al usuario como candidata con su límite. Nada más llega al usuario.`];
for (const l of nuevos) lineas.push(`- [${l.tipo}] ${l.nombre} (${l.clave}, ${l.vertical}${l.carpeta ? `, ${l.carpeta}` : ''}): ${l.motivo}`);
if (process.argv.includes('--escribir')) {
  const reg = leer(`${P}leads-registro.json`, { nota: 'Leads de herramientas/leads.mjs con su resultado (lo rellena la vigilancia: «resultado» = candidata | descartado y por qué). Datos del modelo.', leads: [] });
  for (const l of nuevos) {
    vistos.leads[`${l.clave}|${l.tipo}`] = hoy;
    reg.leads.push({ fecha: hoy, tipo: l.tipo, clave: l.clave, simbolo: l.simbolo || null, vertical: l.vertical, distancia_pct: l.distancia_pct ?? null, var_1m_pct: l.var_1m_pct ?? null, motivo: l.motivo, noticias: (l.noticias || []).map((n) => n.id), resultado: null });
  }
  writeFileSync(`${P}leads-vistos.json`, JSON.stringify(vistos, null, 1) + '\n');
  writeFileSync(`${P}leads-registro.json`, JSON.stringify(reg, null, 1) + '\n');
  writeFileSync(`${P}leads-ultimo.json`, JSON.stringify({ fecha: hoy, leads: nuevos }, null, 1) + '\n');
  writeFileSync(`${P}leads-ultimo.md`, lineas.join('\n') + '\n');
}
console.log(process.argv.includes('--json') ? JSON.stringify({ fecha: hoy, leads: nuevos }, null, 1) : lineas.join('\n'));
