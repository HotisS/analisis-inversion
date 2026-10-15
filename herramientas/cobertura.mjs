// Inventario único de cobertura y control de huecos (15-oct-2026, pedido del usuario: «que no escape nada dentro de nuestro
// propio sistema: si algo tiene calidad hay que seguirlo (cuando saca resultados, noticias que detectemos, etc.), todo bien
// enlazado»; «sin análisis en 6 meses se repite»; «busca huecos donde se nos pueda colar una empresa que olvidemos»).
//
// Una fila por empresa analizada (su último análisis value o growth) con: fecha y edad del análisis, calidad, señal,
// próximos resultados, índices a los que pertenece y si está enlazada en cada pieza del sistema:
//   calendario (escaner/calendario.json con fecha futura) · noticias (universo de noticias.mjs con símbolo de Yahoo) ·
//   expediente (privada/escaner/expedientes) · escáner (objetivo12m-revisados.json al día / growth con símbolo) ·
//   Excel (fila en seguimiento.xlsx).
// Toda empresa CON CALIDAD (value: ROIC − WACC ≥ 5, o excepción, o n.d.; growth: puntuación ≥ 60) tiene que estar en
// todas. Además marca lo que toca rehacer: análisis de más de 6 meses y resultados publicados después del análisis.
// Y los huecos de fuera: cartera u órdenes sin análisis, radar sin análisis, comparables con calidad citados por varios
// informes y no analizados, altas en los grandes índices (escaner/indices.json, herramientas/indices.mjs).
//
//   node herramientas/cobertura.mjs                      informe en pantalla y escaner/cobertura.json (sin datos de cartera)
//   NODE_USE_ENV_PROXY=1 node herramientas/cobertura.mjs --arreglar
//                                                        además rellena lo mecánico: fecha de resultados de Yahoo en
//                                                        calendario.json para las de calidad sin fecha futura
//   … --md <ruta>                                        el informe en Markdown (con la cartera si existe la carpeta privada)
//   … --json                                             el inventario completo por la salida estándar
// Sin dependencias. Nunca datos personales en las consultas.
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { inflateRawSync } from 'node:zlib';
import { simboloDe } from './precios.mjs';
import { leerCalendario } from './calendario.mjs';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');
const PRIV = process.env.CARTERA_REAL || '/mnt/project-files/cartera/real';
const argv = process.argv.slice(2);
const tiene = (k) => argv.includes(k);
const arg = (k, d = null) => (argv.includes(k) ? argv[argv.indexOf(k) + 1] : d);
const leer = (p, d = null) => { try { return JSON.parse(readFileSync(join(RAIZ, p), 'utf8')); } catch { return d; } };
const leerAbs = (p, d = null) => { try { return JSON.parse(readFileSync(p, 'utf8')); } catch { return d; } };
const num = (v) => (v === null || v === undefined || v === '' || !Number.isFinite(+v) ? null : +v);
const norm = (t) => String(t || '').trim().toUpperCase().replace(/\s+/g, '-');
const HOY = new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Madrid' });
const dias = (a, b) => Math.round((Date.parse(b) - Date.parse(a)) / 864e5);
const FECHA = /\d{4}-\d{2}-\d{2}/;
export const DIAS_CADUCA = 183;      // «sin análisis en 6 meses se repite»
export const GROWTH_CALIDAD = 60;    // puntuación mínima de compra del método growth (verticales/growth/metodo.md §4)

const REV = leer('verticales/empresa/objetivo12m-revisados.json', { revisados: {} }).revisados;
const SIMB = leer('verticales/empresa/simbolos.json', { empresas: {} }).empresas;
const AJ = leer('escaner/noticias.json', {});
const REGLAS = leer('escaner/reglas.json', {});
const RADAR = leer('escaner/radar.json', { valores: [] }).valores;
const INDICES = leer('escaner/indices.json', null);
const ROB_G = leer('informes-growth/robustez.json', { resultados: [] }).resultados;
const EXCL = REGLAS.exclusiones || {};
// Revisiones tras resultados ya hechas (las apunta la vigilancia de la mañana con --revisado): así un resultado recogido
// deja de salir como pendiente aunque el informe no se haya rehecho.
const RUTA_REVIS = 'escaner/revisiones.json';
const REVIS = leer(RUTA_REVIS, { nota: 'Revisiones tras resultados de las empresas con calidad (herramientas/cobertura.mjs --revisado). Una entrada por resultados revisados.', revisiones: {} });
const MIN_ROIC = REGLAS.calidad_min_roic_wacc ?? 5;

function ultimoDatos(dir) {
  const fs = readdirSync(dir).filter((f) => /^datos(-v\d+)?\.json$/.test(f))
    .sort((a, b) => (+(a.match(/-v(\d+)/)?.[1] || 1)) - (+(b.match(/-v(\d+)/)?.[1] || 1)));
  return fs.length ? JSON.parse(readFileSync(join(dir, fs.at(-1)), 'utf8')) : null;
}

// ---------- Textos de seguimiento.xlsx (para saber qué claves tienen fila en el Excel) ----------
function textosXlsx(ruta) {
  if (!existsSync(ruta)) return null;
  const b = readFileSync(ruta);
  const fin = b.lastIndexOf(Buffer.from([0x50, 0x4b, 0x05, 0x06]));
  if (fin < 0) return null;
  let p = b.readUInt32LE(fin + 16); const n = b.readUInt16LE(fin + 10); let out = '';
  for (let i = 0; i < n; i++) {
    const metodo = b.readUInt16LE(p + 10), comp = b.readUInt32LE(p + 20), ln = b.readUInt16LE(p + 28), le = b.readUInt16LE(p + 30), lc = b.readUInt16LE(p + 32), off = b.readUInt32LE(p + 42);
    const nombre = b.toString('utf8', p + 46, p + 46 + ln);
    if (/sharedStrings|sheet\d+\.xml$/.test(nombre)) {
      const l = b.readUInt16LE(off + 26), e = b.readUInt16LE(off + 28), ini = off + 30 + l + e, raw = b.subarray(ini, ini + comp);
      out += (metodo === 8 ? inflateRawSync(raw) : raw).toString('utf8');
    }
    p += 46 + ln + le + lc;
  }
  return out;
}

// ---------- Inventario ----------
export function inventario() {
  const CAL = leerCalendario();
  const filas = new Map();
  // Value: el último análisis de cada clave (por fecha de corte).
  for (const dir of readdirSync(join(RAIZ, 'informes'), { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name)) {
    let d; try { d = ultimoDatos(join(RAIZ, 'informes', dir)); } catch { continue; }
    if (!d?.identificacion?.ticker || !d?.meta?.fecha_corte) continue;
    const clave = norm(d.identificacion.ticker);
    const prev = filas.get(clave);
    if (prev && prev.fecha >= d.meta.fecha_corte) continue;
    const roic = (d.calc?.roic_frente_wacc || []).filter((x) => num(x.roic_pct) !== null && num(x.wacc_pct) !== null && !/e$/i.test(String(x.periodo))).at(-1);
    const dif = roic ? Math.round((roic.roic_pct - roic.wacc_pct) * 100) / 100 : null;
    const sost = d.calc?.dcf?.sostenibilidad?.veredicto || null;
    const exc = REGLAS.calidad_excepciones?.[clave] || null;
    const rev = REV[clave];
    filas.set(clave, {
      clave, ticker: d.identificacion.ticker, tipo: 'value', nombre: d.identificacion.nombre_corto || d.identificacion.nombre, carpeta: `informes/${dir}`, fecha: d.meta.fecha_corte,
      isin: d.identificacion.isin || null, pais: d.identificacion.pais_iso || d.identificacion.pais || null, sector: d.identificacion.sector || null,
      yahoo: SIMB[clave]?.yahoo || AJ[clave]?.yahoo || simboloDe({ ticker: d.identificacion.ticker, mercado: d.identificacion.mercado }),
      en_simbolos: !!SIMB[clave],
      calidad: dif === null ? (exc ? 'sí (excepción)' : 'n.d.') : dif >= MIN_ROIC ? 'sí' : exc ? 'sí (excepción)' : 'no',
      calidad_txt: `ROIC − WACC ${dif === null ? 'n.d.' : dif.toFixed(1).replace('.', ',')}; sostenibilidad ${sost || 'n.d.'}`,
      compra_posible: (dif !== null && dif >= MIN_ROIC || !!exc) && /^s[ií]/i.test(sost || ''),
      senal: rev?.carpeta === dir ? rev.senal_ponderada || rev.senal : null, rte: rev?.carpeta === dir ? rev.rentabilidad_ponderada_pct ?? null : null,
      limite: rev?.carpeta === dir ? rev.comprar_por_debajo_cot ?? null : null, divisa: rev?.divisa_cotizacion || null,
      escaner: rev ? (rev.carpeta === dir ? 'sí' : `con un análisis anterior (${rev.carpeta})`) : 'no',
      prox_informe: String(d.identificacion.proximos_resultados || '').match(FECHA)?.[0] || null,
    });
  }
  // Growth: el último de cada ticker. Si ya hay value más nuevo, se queda el value y se apunta que también hay growth.
  for (const dir of readdirSync(join(RAIZ, 'informes-growth'), { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name)) {
    const ruta = join(RAIZ, 'informes-growth', dir, 'datos.json');
    if (!existsSync(ruta)) continue;
    const d = JSON.parse(readFileSync(ruta, 'utf8'));
    const clave = norm(d.ticker);
    const rg = ROB_G.find((x) => x.carpeta === dir);
    const prev = filas.get(clave);
    if (prev && prev.fecha >= d.fecha) { prev.tambien_growth = `informes-growth/${dir}`; continue; }
    const punt = num(rg?.puntuacion ?? d.calc?.puntuacion);
    filas.set(clave, {
      clave, ticker: d.ticker, tipo: 'growth', nombre: d.empresa, carpeta: `informes-growth/${dir}`, fecha: d.fecha, isin: d.isin || null, pais: null, sector: 'Growth',
      yahoo: AJ[clave]?.yahoo || d.simbolo_yahoo || simboloDe({ ticker: d.ticker, mercado: d.bolsa }), en_simbolos: !!AJ[clave]?.yahoo,
      calidad: punt === null ? 'n.d.' : punt >= GROWTH_CALIDAD ? 'sí' : 'no', calidad_txt: `puntuación ${punt ?? 'n.d.'}`,
      compra_posible: punt !== null && punt >= GROWTH_CALIDAD,
      senal: rg?.senal_robusta || rg?.senal || null, rte: rg?.ponderada ?? null, limite: rg?.precio_max_compra ?? null, divisa: rg?.divisa || d.moneda || null,
      escaner: rg ? 'sí' : 'sin robustez growth guardada', prox_informe: String(d.proximos_resultados || '').match(FECHA)?.[0] || null,
      ...(prev ? { tambien_value: prev.carpeta } : {}),
    });
  }
  // Enlaces y caducidad.
  const xlsx = textosXlsx(join(RAIZ, 'seguimiento.xlsx'));
  const dirExp = join(PRIV, 'escaner', 'expedientes');
  const exp = existsSync(dirExp) ? new Set(readdirSync(dirExp).map((f) => f.replace(/\.json$/, ''))) : null;
  for (const f of filas.values()) {
    const cal = CAL[f.clave]?.fecha || null;
    f.proximos = cal || f.prox_informe;
    f.calendario = cal && cal >= HOY ? 'sí' : cal ? `fecha pasada (${cal})` : f.prox_informe && f.prox_informe >= HOY ? 'solo la del informe' : 'no';
    f.noticias = f.yahoo ? 'sí' : 'sin símbolo';
    f.expediente = exp ? (exp.has(f.clave) || exp.has(f.yahoo) ? 'sí' : 'no') : 'sin carpeta privada';
    const enXlsx = (t) => xlsx.includes(`>${String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}<`);
    f.excel = xlsx === null ? 'n.d.' : enXlsx(f.clave) || enXlsx(f.ticker) ? 'sí' : 'no';
    f.excluida = EXCL[f.clave] || null;
    f.edad = dias(f.fecha, HOY);
    f.caducado = f.edad > DIAS_CADUCA;
    // Resultados publicados después del análisis (fecha del calendario o del informe ya pasada y posterior al corte).
    const pub = [cal, f.prox_informe].filter((x) => x && x > f.fecha && x <= HOY).sort().at(-1) || null;
    const hecha = (REVIS.revisiones[f.clave] || []).filter((r) => r.resultados >= (pub || '9999')).at(-1) || null;
    f.ultima_revision = (REVIS.revisiones[f.clave] || []).at(-1) || null;
    f.resultados_sin_recoger = hecha ? null : pub;
    f.indices = [...new Set([f.yahoo, f.isin, f.clave].filter(Boolean).flatMap((k) => INDICES?.miembros?.[k] || []))];
    f.radar = !!RADAR.find((r) => r.clave === f.clave);
    f.seguir = !f.excluida && f.calidad !== 'no';
    f.huecos = !f.seguir ? [] : [
      f.calendario !== 'sí' && 'sin fecha de resultados en el calendario',
      f.noticias !== 'sí' && 'fuera del rastreador de noticias (sin símbolo)',
      f.expediente === 'no' && 'sin expediente de noticias todavía',
      !/^sí/.test(f.escaner) && `escáner: ${f.escaner}`,
      f.excel === 'no' && 'sin fila en el Excel',
    ].filter(Boolean);
    f.toca = !f.seguir ? null : f.caducado ? `reanalizar (análisis de hace ${f.edad} días)` : f.resultados_sin_recoger ? `revisar con los resultados del ${f.resultados_sin_recoger}` : null;
  }
  return [...filas.values()].sort((a, b) => a.nombre.localeCompare(b.nombre));
}

// ---------- Huecos de fuera del inventario ----------
export function huecosFuera(inv) {
  const claves = new Set(inv.map((f) => f.clave));
  const yahoos = new Set(inv.map((f) => f.yahoo).filter(Boolean));
  const nombres = inv.map((f) => f.nombre.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ').trim());
  const conocida = (t, nombre) => claves.has(norm(t)) || yahoos.has(t) ||
    (nombre && nombres.some((n) => { const m = nombre.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ').trim(); return m.length > 3 && (n === m || n.startsWith(m + ' ') || m.startsWith(n + ' ')); }));
  const out = { cartera: [], radar: [], comparables: [], indices: [] };
  const cart = leerAbs(join(PRIV, 'escaner-cartera.json'));
  if (cart) {
    for (const p of cart.posiciones || []) if (p.vertical !== 'otro' && !claves.has(p.clave)) out.cartera.push(`${p.nombre || p.clave} (en cartera)`);
    const pend = cart.ordenes_pendientes || {};
    for (const o of [...(pend.comprar || []), ...(pend.lista_espera || [])]) if (!claves.has(o.clave)) out.cartera.push(`${o.clave} (en órdenes)`);
  }
  for (const r of RADAR) if (!claves.has(r.clave)) out.radar.push(`${r.nombre} (${r.clave})`);
  // Comparables: citados por ≥ 2 informes value, con ROIC ≥ 15 % cuando el informe lo da, y sin análisis propio.
  const citas = new Map();
  for (const f of inv.filter((x) => x.tipo === 'value')) {
    let d; try { d = ultimoDatos(join(RAIZ, f.carpeta)); } catch { continue; }
    for (const c of d?.comparables?.empresas || []) {
      if (!c?.ticker || conocida(c.ticker, c.nombre)) continue;
      const k = norm(c.ticker) + '|' + (c.nombre || '');
      const x = citas.get(k) || { nombre: c.nombre, ticker: c.ticker, pais: c.pais, por: new Set(), roic: [] };
      x.por.add(f.nombre); if (num(c.roic_pct) !== null) x.roic.push(+c.roic_pct);
      citas.set(k, x);
    }
  }
  out.comparables = [...citas.values()].filter((x) => x.por.size >= 2 && (!x.roic.length || Math.max(...x.roic) >= 15))
    .sort((a, b) => b.por.size - a.por.size).map((x) => ({ nombre: x.nombre, ticker: x.ticker, pais: x.pais, citas: x.por.size, roic: x.roic.length ? Math.max(...x.roic) : null, por: [...x.por].slice(0, 4) }));
  if (INDICES?.altas) out.indices = INDICES.altas.filter((a) => !conocida(a.simbolo || a.ticker, a.nombre));
  return out;
}

// ---------- Calendario automático (Yahoo calendarEvents) para las de calidad sin fecha futura ----------
async function rellenarCalendario(inv) {
  const { json } = await import('./yahoo.mjs');
  const ruta = join(RAIZ, 'escaner/calendario.json');
  const cal = JSON.parse(readFileSync(ruta, 'utf8'));
  let n = 0;
  for (const f of inv.filter((x) => x.seguir && x.calendario !== 'sí' && x.yahoo)) {
    let e = null;
    try {
      const j = await json(`https://query2.finance.yahoo.com/v10/finance/quoteSummary/${encodeURIComponent(f.yahoo)}?modules=calendarEvents,earnings`);
      const r0 = j?.quoteSummary?.result?.[0];
      e = r0?.calendarEvents?.earnings || null;
      // Sin fecha en el calendario de Yahoo: la última publicada que da el gráfico de beneficios.
      const ult = r0?.earnings?.earningsChart?.quarterly?.at(-1)?.reportedDate?.raw;
      if (!e?.earningsDate?.length && ult) e = { earningsDate: [{ raw: ult }], isEarningsDateEstimate: true };
    } catch { /* sin datos de Yahoo: se prueba con la fecha del informe */ }
    {
      const todas = (e?.earningsDate || []).map((x) => new Date((x.raw ?? x) * 1000).toISOString().slice(0, 10)).sort();
      const fechas = todas.filter((x) => x >= HOY);
      const nota = `Puesta por cobertura.mjs (${HOY}) para que ninguna empresa con calidad quede sin seguimiento`;
      if (fechas.length) {
        cal.fechas[f.clave] = { fecha: fechas[0], confirmada: e?.isEarningsDateEstimate === false, nombre: f.nombre,
          nota: `${nota}${e?.isEarningsDateEstimate === false ? '' : '; estimada: la vigilancia la confirma cuando se anuncie'}`, fuente: 'Yahoo Finance (calendarEvents)' };
      } else if (f.prox_informe && f.prox_informe >= HOY) {
        cal.fechas[f.clave] = { fecha: f.prox_informe, confirmada: false, nombre: f.nombre, nota: `${nota}; estimada, la del informe (Yahoo aún no la da)`, fuente: `informe (${f.carpeta})` };
      } else if (todas.length) {
        // Sin fecha anunciada: la última publicada más un trimestre (EE. UU.) o un semestre (resto), aproximada.
        const d = new Date(Date.parse(todas.at(-1)) + (/\./.test(f.yahoo) ? 182 : 91) * 864e5).toISOString().slice(0, 10);
        if (d < HOY) continue;
        cal.fechas[f.clave] = { fecha: d, confirmada: false, nombre: f.nombre, nota: `${nota}; APROXIMADA (últimos resultados el ${todas.at(-1)} + ${/\./.test(f.yahoo) ? 'un semestre' : 'un trimestre'}): la vigilancia la confirma`, fuente: 'Yahoo Finance (últimos resultados) + estimación' };
      } else continue;
      n++;
    }
  }
  if (n) writeFileSync(ruta, JSON.stringify(cal, null, 2) + '\n');
  return n;
}

// ---------- Informe ----------
function informe(inv, fuera, conCartera) {
  const seguir = inv.filter((f) => f.seguir);
  const conHueco = seguir.filter((f) => f.huecos.length);
  const caduc = seguir.filter((f) => f.caducado), sinRec = seguir.filter((f) => !f.caducado && f.resultados_sin_recoger);
  const L = [`# Cobertura y huecos (${HOY})`, '',
    `${inv.length} empresas analizadas (${inv.filter((f) => f.tipo === 'value').length} value, ${inv.filter((f) => f.tipo === 'growth').length} growth). Con calidad, que se siguen: **${seguir.length}** (value con ROIC − WACC ≥ ${MIN_ROIC}, excepción o n.d.; growth con puntuación ≥ ${GROWTH_CALIDAD}). Sin calidad o excluidas: ${inv.length - seguir.length} (solo precio en el escáner).`, '',
    '## Enlaces de las que tienen calidad', '',
    '| Pieza | Enlazadas | Faltan |', '|---|---|---|',
    ...[['Calendario de resultados (fecha futura)', (f) => f.calendario === 'sí'], ['Rastreador de noticias (símbolo)', (f) => f.noticias === 'sí'],
      ['Expediente de noticias', (f) => f.expediente === 'sí'], ['Escáner con su último análisis', (f) => /^sí/.test(f.escaner)], ['Excel', (f) => f.excel === 'sí']]
      .map(([t, ok]) => `| ${t} | ${seguir.filter(ok).length} | ${seguir.length - seguir.filter(ok).length} |`), '',
    conHueco.length ? '### Huecos por empresa' : '**Ninguna empresa con calidad queda fuera de ninguna pieza.**', '',
    ...conHueco.map((f) => `- ${f.nombre} (${f.clave}, ${f.tipo}): ${f.huecos.join('; ')}`), '',
    `## Qué toca rehacer`, '',
    `**Reanalizar (más de 6 meses):** ${caduc.length ? caduc.map((f) => `${f.nombre} (${f.edad} días)`).join(', ') : 'ninguna; el análisis más viejo con calidad es de hace ' + Math.max(0, ...seguir.map((f) => f.edad)) + ' días'}.`, '',
    `**Revisar con resultados ya publicados que el análisis no recoge:** ${sinRec.length ? sinRec.map((f) => `${f.nombre} (${f.resultados_sin_recoger})`).join(', ') : 'ninguna'}.`, '',
    `**Caducan en los próximos 30 días:** ${seguir.filter((f) => !f.caducado && f.edad > DIAS_CADUCA - 30).map((f) => f.nombre).join(', ') || 'ninguna'}.`, '',
    '## Huecos de fuera (empresas que no tenemos analizadas)', '',
    ...(conCartera ? [`**En cartera u órdenes sin análisis:** ${fuera.cartera.join(', ') || 'ninguna'}.`, ''] : []),
    `**Radar sin análisis:** ${fuera.radar.join(', ') || 'ninguno'}.`, '',
    `**Comparables con calidad que citan dos o más de nuestros informes y no tenemos analizados (${fuera.comparables.length}):**`, '',
    ...(fuera.comparables.length ? ['| Empresa | Ticker | País | Citada por | ROIC (del comparable) |', '|---|---|---|---|---|',
      ...fuera.comparables.slice(0, 40).map((c) => `| ${c.nombre} | ${c.ticker} | ${c.pais || ''} | ${c.citas}: ${c.por.join(', ')}${c.citas > 4 ? '…' : ''} | ${c.roic === null ? 'n.d.' : c.roic + ' %'} |`)] : ['Ninguno.']), '',
    `**Altas recientes en los grandes índices sin análisis:** ${INDICES ? (fuera.indices.length ? fuera.indices.map((a) => `${a.nombre} (${a.indice}, ${a.fecha || 'reciente'})`).join(', ') : 'ninguna') : 'el escáner de índices todavía no ha corrido'}.`];
  return L.join('\n');
}

if (process.argv[1] === fileURLToPath(import.meta.url) && tiene('--revisado')) {
  // node herramientas/cobertura.mjs --revisado CLAVE --resultados AAAA-MM-DD [--bpa 0,97] --resultado "texto llano"
  const clave = norm(arg('--revisado')), res = arg('--resultados');
  if (!FECHA.test(res || '') || !arg('--resultado')) { console.error('Faltan --resultados AAAA-MM-DD y --resultado "qué salió"'); process.exit(1); }
  (REVIS.revisiones[clave] ||= []).push({ resultados: res, fecha: HOY, ...(arg('--bpa') ? { bpa_factor: +arg('--bpa').replace(',', '.') } : {}), resultado: arg('--resultado') });
  writeFileSync(join(RAIZ, RUTA_REVIS), JSON.stringify(REVIS, null, 1) + '\n');
  console.log(`Apuntada la revisión de ${clave} con los resultados del ${res}.`);
  process.exit(0);
}
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  let inv = inventario();
  if (tiene('--arreglar')) {
    const n = await rellenarCalendario(inv);
    console.error(`Calendario: ${n} fechas nuevas de Yahoo.`);
    if (n) inv = inventario();
  }
  const conCartera = existsSync(join(PRIV, 'escaner-cartera.json'));
  const fuera = huecosFuera(inv);
  // Versión pública (repo): sin nada de la cartera.
  const pub = inv.map(({ huecos, toca, ...f }) => ({ ...f, huecos, toca }));
  writeFileSync(join(RAIZ, 'escaner/cobertura.json'), JSON.stringify({ fecha: HOY, nota: 'Inventario único de cobertura (herramientas/cobertura.mjs). Lo regenera la rutina; no editar a mano.', empresas: pub, fuera: { radar: fuera.radar, comparables: fuera.comparables, indices: fuera.indices } }, null, 1) + '\n');
  const md = informe(inv, fuera, conCartera);
  if (arg('--md')) writeFileSync(arg('--md'), md + '\n');
  if (tiene('--json')) console.log(JSON.stringify({ empresas: inv, fuera }, null, 1)); else console.log(md);
}
