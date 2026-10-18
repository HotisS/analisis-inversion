// Lista de seguimiento de todos los análisis (value y growth): seguimiento.xlsx, en la raíz del repo.
// Simplificado el 14-oct-2026 a petición del usuario («hay un montón de métricas de rentabilidad, confunde y no se entiende
// el criterio»). Hojas:
//   Resumen        una fila por empresa (su último análisis) con UNA cifra de rentabilidad, la del método vigente
//                  (value: v3 tope ×1,1 con el selector; growth: v11), la misma siendo prudentes (la mitad), la señal,
//                  «Qué hacer según el método» (los filtros de cartera de METODO-VIGENTE.md §4), precios límite y
//                  próximos resultados.
//   Cómo leerlo    el criterio en castellano llano.
//   Mi cartera     SOLO en la versión privada (ver abajo): posiciones reales, órdenes propuestas y cifras de la cartera.
//   Detalle        todas las cifras de antes, una fila por análisis (iteraciones 1, 2, 3… por fecha), con los criterios
//                  ✓ = ✗, el DCF, la prima del mercado y los métodos de control (v2, v3 sin selector).
//   Detalle: columnas  qué es cada columna del detalle.
// Sin dependencias.
//
//   node herramientas/seguimiento.mjs [--salida seguimiento.xlsx] [--sin-cartera]
//
// Versión privada: si existe la carpeta de la cartera real (CARTERA_REAL o /mnt/project-files/cartera/real, que NUNCA va
// al repo, que es público), escribe además <esa carpeta>/seguimiento-mi-cartera.xlsx con las posiciones (ultimo.json),
// las órdenes propuestas (escaner-cartera.json, en esa carpeta) y el resumen de la tabla de órdenes vigente. El seguimiento.xlsx del repo
// no lleva nada de la cartera.
//
// Se vuelve a ejecutar después de cada informe nuevo o versión nueva.

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { escribirZip } from '../motor/rellenar.mjs';
import { conviccionSugerida } from '../motor/conviccion.mjs';
import { objetivo12m } from './objetivo12m.mjs';
import { readFileSync as leer } from 'node:fs';
const REV12 = JSON.parse(leer(new URL('../verticales/empresa/objetivo12m-revisados.json', import.meta.url), 'utf8')).revisados;
import { leerCalendario, fechaResultados } from './calendario.mjs';
const CAL = leerCalendario();

const argv = process.argv.slice(2);
const salida = argv.includes('--salida') ? argv[argv.indexOf('--salida') + 1] : 'seguimiento.xlsx';
const DATOS_REAL = process.env.CARTERA_REAL || '/mnt/project-files/cartera/real';
const conCartera = !argv.includes('--sin-cartera') && existsSync(join(DATOS_REAL, 'ultimo.json'));
const n = (v) => (v === null || v === undefined || v === '' || Number.isNaN(+v) ? null : +v);

// ── Criterios: [cabecera, explicación, función(datos) → '✓' | '=' | '✗' | null] ──
const tramo = (v, bien, mal, alReves = false) => v === null ? null : !alReves ? (v >= bien ? '✓' : v < mal ? '✗' : '=') : (v <= bien ? '✓' : v > mal ? '✗' : '=');
const real = (filas) => (filas || []).filter((f) => !/e$/i.test(String(f.periodo)));
const CRITERIOS = [
  ['Crecimiento', 'Crecimiento anual compuesto de las ventas en los últimos cinco ejercicios: ✓ si es del 8 % o más, = entre 3 % y 8 %, ✗ por debajo del 3 %.',
    (d) => tramo(n(d.calc.tcac?.ingresos_pct), 8, 3)],
  ['ROIC frente a WACC', 'Rentabilidad sobre el capital invertido del último ejercicio cerrado menos el coste de capital: ✓ con 5 puntos o más de diferencia, = entre 0 y 5, ✗ si no cubre el coste de capital.',
    (d) => { const f = real(d.calc.roic_frente_wacc).filter((x) => n(x.roic_pct) !== null).at(-1); return f && n(f.wacc_pct) !== null ? tramo(f.roic_pct - f.wacc_pct, 5, 0) : null; }],
  ['Balance', 'Deuda neta ajustada (con arrendamientos y asimilables) entre EBITDA: ✓ hasta 1,5x (o caja neta), = hasta 3x, ✗ por encima de 3x.',
    (d) => tramo(n(d.calc.clave?.dn_ebitda_ajustada) ?? n(d.calc.clave?.dn_ebitda), 1.5, 3, true)],
  ['Caja libre', 'Rentabilidad por flujo de caja libre sobre la capitalización: ✓ desde el 5 %, = entre 2,5 % y 5 %, ✗ por debajo del 2,5 %.',
    (d) => tramo(n(d.calc.clave?.fcf_yield_pct), 5, 2.5)],
  ['Calidad contable', 'Altman, Piotroski y Beneish: ✓ si Altman está en zona segura, Piotroski es 6 o más y Beneish no avisa; ✗ si Beneish avisa (por encima de −1,78), Altman está en zona de riesgo o Piotroski es 3 o menos; = en el resto.',
    (d) => { const q = d.calc.calidad; if (!q) return null; const z = String(q.altman_zona || ''), p = n(q.piotroski_f), m = q.beneish_fiable === false ? null : n(q.beneish_m);
      if ((m !== null && m > -1.78) || /peligro|riesgo|dificultad/i.test(z) || (p !== null && p <= 3)) return '✗';
      return /segura/i.test(z) && p !== null && p >= 6 && (m === null || m <= -1.78) ? '✓' : '='; }],
  ['Gobierno', 'Parte de la lista de buen gobierno del informe que se cumple: ✓ desde el 80 %, = entre 60 % y 80 %, ✗ por debajo del 60 %.',
    (d) => { const l = (d.calc.gobierno?.checklist || []).filter((c) => /^(no )?cumple$/i.test(c.resultado)); return l.length ? tramo(l.filter((c) => /^cumple$/i.test(c.resultado)).length / l.length * 100, 80, 60) : null; }],
  ['Lo que descuenta el precio', 'DCF inverso: crecimiento anual que hace falta para justificar el precio frente al de nuestro caso base. ✓ si el precio pide al menos un punto menos, ✗ si pide al menos un punto más, = en el resto.',
    (d) => { const i = d.calc.dcf?.inverso; const a = n(i?.crecimiento_implicito_pct), b = n(i?.crecimiento_base_pct); return a === null || b === null ? null : a <= b - 1 ? '✓' : a >= b + 1 ? '✗' : '='; }],
  ['Asimetría', 'Ganancia del escenario alcista entre la pérdida del bajista (con la prima del mercado si el informe la tiene): ✓ desde 1,5x, = entre 1x y 1,5x, ✗ por debajo de 1x.',
    (d) => tramo(n(d.calc.recomendacion.relativo?.asimetria) ?? n(d.calc.recomendacion.asimetria), 1.5, 1)],
  ['Visión de los analistas', 'Potencial del precio objetivo medio de los analistas sobre el precio actual: ✓ desde el 15 %, = entre 0 % y 15 %, ✗ si está por debajo del precio.',
    (d) => { const po = n(d.consenso?.recomendaciones?.po_medio), p = n(d.identificacion?.precio); return po && p ? tramo((po / p - 1) * 100, 15, 0) : null; }],
];

// ── Informes: la última versión de cada carpeta ──
const filas = [];
for (const dir of readdirSync('informes', { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name)) {
  const archivos = readdirSync(join('informes', dir));
  // La última versión terminada: con su PDF (lo último que se genera; sin él, esa versión sigue en curso y vale la anterior).
  const vs = archivos.map((f) => f.match(/^datos-v(\d+)\.json$/)).filter(Boolean).sort((a, b) => b[1] - a[1]).map((m) => ({ datos: m[0], v: +m[1] }));
  if (archivos.includes('datos.json')) vs.push({ datos: 'datos.json', v: 1 });
  let d = null, base = null, pdf = null;
  for (const x of vs) {
    const b = x.v > 1 ? archivos.find((f) => f.endsWith(` v${x.v}.docx`)) : archivos.find((f) => /\d{4}-\d{2}-\d{2}\.docx$/.test(f));
    if (!b || !existsSync(join('informes', dir, b.replace(/\.docx$/, '.pdf')))) continue;
    const dd = JSON.parse(readFileSync(join('informes', dir, x.datos), 'utf8'));
    if (!dd.calc?.recomendacion?.recomendacion) continue; // análisis en curso
    d = dd; base = b; pdf = b.replace(/\.docx$/, '.pdf'); break;
  }
  if (!d) continue;
  const R = d.calc.recomendacion, rel = R.relativo || {};
  const rw = real(d.calc.roic_frente_wacc).filter((x) => n(x.roic_pct) !== null && n(x.wacc_pct) !== null).at(-1);
  filas.push({
    carpeta: dir, sostenible: d.calc.dcf?.sostenibilidad?.veredicto ?? null, roic_wacc: rw ? Math.round((rw.roic_pct - rw.wacc_pct) * 10) / 10 : null,
    o12_informe: R.objetivo_12m || null,
    empresa: d.identificacion.nombre_corto || d.identificacion.nombre, ticker: d.identificacion.ticker, fecha: d.meta.fecha_corte,
    geografia: d.identificacion.pais, sector: d.identificacion.sector, senal: R.recomendacion, conviccion: d.resumen?.conviccion,
    divisa: d.meta.divisa, precio: n(d.identificacion.precio), objetivo: n(d.calc.sintesis?.valor_objetivo), objetivo_mercado: n(rel.valor_objetivo),
    rte: n(R.rentabilidad_total_pct), rte_mercado: n(rel.rentabilidad_total_pct), analistas: n(d.consenso?.recomendaciones?.po_medio),
    compra: n(R.comprar_por_debajo), venta: n(R.vender_por_encima), regla_abs: R.regla_absoluta, regla_rel: R.regla_relativa,
    // Convicción con los criterios del 9 oct 2026 (los informes anteriores la decidían a ojo).
    conviccion_criterios: R.conviccion_sugerida ?? conviccionSugerida({ recomendacion: R.recomendacion, reglaAbs: R.regla_absoluta, reglaRel: R.regla_relativa,
      rte: n(R.rentabilidad_total_pct), rteRel: n(rel.rentabilidad_total_pct), asimetria: n(R.asimetria), bajista: n(R.bajista_pct),
      gImplicito: n(d.calc.dcf?.inverso?.crecimiento_implicito_pct), gBase: n(d.calc.dcf?.inverso?.crecimiento_base_pct) }).conviccion,
    criterios: CRITERIOS.map(([, , f]) => { try { return f(d); } catch { return null; } }),
    // Metodología nueva (desde el 10-oct-2026): DCF con la prueba de sostenibilidad del crecimiento.
    metodologia: d.calc.dcf?.sostenibilidad ? 'Nueva' : 'Vieja',
    // Solo revisiones hechas (verticales/empresa/objetivo-12m.md): la calculadora a ciegas no se publica.
    o12: REV12[String(d.identificacion.ticker || '').trim().toUpperCase().replace(/\s+/g, '-')] ? objetivo12m(d) : { objetivo: null, rte: null, senal: null, origen: 'Sin revisión v2 todavía' },
    // Calendario de resultados (escaner/calendario.json manda; si no está, la fecha del informe).
    proximos: fechaResultados(Object.entries(REV12).find(([, v]) => v.carpeta === dir)?.[0] || String(d.identificacion.ticker || '').trim().toUpperCase().replace(/\s+/g, '-'), d, CAL),
    informe: `informes/${dir}/${existsSync(join('informes', dir, pdf)) ? pdf : base}`,
  });
}
// Iteraciones: los análisis de una misma empresa (mismo ticker), numerados por fecha de corte.
const clave = (f) => String(f.ticker || f.empresa).trim().toUpperCase();
const grupos = new Map();
for (const f of filas) { if (!grupos.has(clave(f))) grupos.set(clave(f), []); grupos.get(clave(f)).push(f); }
for (const g of grupos.values()) { g.sort((a, b) => String(a.fecha).localeCompare(String(b.fecha)) || a.informe.localeCompare(b.informe)); g.forEach((f, i) => { f.iteracion = i + 1; }); }
// Sector en español y sin la industria entre paréntesis (algunos informes lo traen en inglés, como en GICS).
const SECTORES = { "information technology": "Tecnologías de la información", "consumer discretionary": "Consumo discrecional", "consumer staples": "Consumo básico", "health care": "Salud", industrials: "Industria", utilities: "Utilities", financials: "Finanzas", materials: "Materiales", energy: "Energía", "communication services": "Comunicaciones", "real estate": "Inmobiliario" };
for (const f of filas) { const s = String(f.sector || "").replace(/\s*[(/].*$/, "").trim(); f.sector = SECTORES[s.toLowerCase()] || s; }
const ORDEN = { Comprar: 0, Mantener: 1, Vender: 2 };
// Las empresas se ordenan por la señal y la rentabilidad a 12 meses (método vigente) de su último análisis; debajo, sus iteraciones de la primera a la última.
const porSenal = (a, b) => (ORDEN[a.o12.senal] ?? 3) - (ORDEN[b.o12.senal] ?? 3) || (b.o12.rte ?? -999) - (a.o12.rte ?? -999);
filas.length = 0;
for (const g of [...grupos.values()].sort((a, b) => porSenal(a.at(-1), b.at(-1)))) filas.push(...g);

// ── Utilidades de la hoja de cálculo ──
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const letra = (i) => (i >= 26 ? String.fromCharCode(64 + Math.floor(i / 26)) : '') + String.fromCharCode(65 + (i % 26));
const serie = (iso) => { const t = Date.parse(String(iso).slice(0, 10) + 'T00:00:00Z'); return Number.isNaN(t) ? null : t / 86400000 + 25569; };
const S = { cab: 1, num: 2, pct: 3, '✓': 4, '✗': 5, '=': 6, Comprar: 7, Mantener: 8, Vender: 9, fecha: 10, enlace: 11, ajuste: 12, centro: 13, titulo: 14, pctFuerte: 15 };
// Celdas: T(texto), N(número), P(porcentaje: viene en %, se guarda en tanto por uno), F(fecha ISO), L(enlace).
const T = (v, s = 0) => ({ t: 'txt', v, s }), N = (v, s = S.num) => ({ t: 'num', v: n(v), s }), P = (v, s = S.pct) => ({ t: 'num', v: n(v) === null ? null : n(v) / 100, s });
const F = (v) => ({ t: 'num', v: v ? serie(v) : null, s: S.fecha }), L = (v) => ({ t: 'txt', v, s: S.enlace, enlace: v });
const celda = (ref, c) => c.v === null || c.v === undefined || c.v === '' ? `<c r="${ref}" s="${c.s}"/>`
  : c.t === 'num' ? `<c r="${ref}" s="${c.s}"><v>${c.v}</v></c>` : `<c r="${ref}" s="${c.s}" t="inlineStr"><is><t xml:space="preserve">${esc(c.v)}</t></is></c>`;
// Una hoja: columnas [cabecera, ancho], filas de celdas; congelar = columnas fijas a la izquierda (con la cabecera fija).
function hoja({ nombre, cols, filas: fs, congelar = null, filtro = true, cabecera = true, altoCab = 45 }) {
  const enlaces = [];
  const xmlFilas = [];
  if (cabecera) xmlFilas.push(`<row r="1" ht="${altoCab}" customHeight="1">${cols.map(([c], i) => celda(`${letra(i)}1`, T(c, S.cab))).join('')}</row>`);
  fs.forEach((f, k) => {
    const r = k + (cabecera ? 2 : 1);
    xmlFilas.push(`<row r="${r}"${f.alto ? ` ht="${f.alto}" customHeight="1"` : ''}>${f.map((c, i) => { if (c.enlace) enlaces.push({ ref: `${letra(i)}${r}`, destino: c.enlace }); return celda(`${letra(i)}${r}`, c); }).join('')}</row>`);
  });
  const ultima = letra(cols.length - 1), nf = fs.length + (cabecera ? 1 : 0);
  const panel = congelar === null ? '' : `<pane xSplit="${congelar}" ySplit="1" topLeftCell="${letra(congelar)}2" activePane="bottomRight" state="frozen"/>`;
  const xml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
<sheetPr><pageSetUpPr fitToPage="1"/></sheetPr>
<sheetViews><sheetView workbookViewId="0"${nombre === 'Resumen' ? ' tabSelected="1"' : ''}>${panel}</sheetView></sheetViews>
<sheetFormatPr defaultRowHeight="15"/>
<cols>${cols.map(([, w], i) => `<col min="${i + 1}" max="${i + 1}" width="${w}" customWidth="1"/>`).join('')}</cols>
<sheetData>${xmlFilas.join('')}</sheetData>
${filtro && cabecera ? `<autoFilter ref="A1:${ultima}${nf}"/>` : ''}
${enlaces.length ? `<hyperlinks>${enlaces.map((e, i) => `<hyperlink ref="${e.ref}" r:id="rId${i + 1}"/>`).join('')}</hyperlinks>` : ''}
<pageMargins left="0.4" right="0.4" top="0.5" bottom="0.5" header="0.3" footer="0.3"/>
<pageSetup paperSize="9" orientation="landscape" fitToWidth="1" fitToHeight="0"/>
</worksheet>`;
  const rels = enlaces.length ? `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${enlaces.map((e, i) => `<Relationship Id="rId${i + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink" Target="${esc(/^https?:/.test(e.destino) ? e.destino : e.destino.split('/').map(encodeURIComponent).join('/'))}" TargetMode="External"/>`).join('')}</Relationships>` : null;
  return { nombre, xml, rels, filtro: filtro && cabecera ? `'${nombre}'!$A$1:$${ultima}$${nf}` : null };
}

// ── Resumen: una fila por empresa, con la cifra del método vigente ──
const hoy = new Date().toISOString().slice(0, 10);
const dias = (desde, hasta) => Math.round((Date.parse(hasta) - Date.parse(desde)) / 86400000);
const fechaCorta = (iso) => { const [a, m, d] = String(iso).split('-'); return `${+d}-${['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'][+m - 1]}`; };
const normal = (t) => String(t || '').trim().toUpperCase().replace(/\s+/g, '-');
// Reglas de cartera del escáner (escaner/reglas.json, copia de MEMORIA.md y METODO-VIGENTE.md §4): exclusiones,
// excepciones de calidad, lo que no se vende o no se amplía.
const REGLAS = existsSync('escaner/reglas.json') ? JSON.parse(readFileSync('escaner/reglas.json', 'utf8')) : {};
const EXCLUIDAS = REGLAS.exclusiones || {}, EXCEPCION_CALIDAD = REGLAS.calidad_excepciones || {}, MIN_CALIDAD = REGLAS.calidad_min_roic_wacc ?? 5;
// Pruebas de robustez al precio apuntado (el mismo del Resumen): acción robusta y límite de compra con los dos métodos.
const nodo = (script, a) => { try { return JSON.parse(execFileSync(process.execPath, [script, ...a], { maxBuffer: 256 * 1024 * 1024, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] })); } catch { return []; } };
const ROB = new Map(nodo('herramientas/robustez.mjs', ['--todas', '--json']).filter((x) => !x.error).map((x) => [x.carpeta, x]));
const ROBG = new Map(nodo('herramientas/robustez-growth.mjs', ['--json']).filter((x) => !x.error).map((x) => [x.carpeta, x]));
const coma = (v) => v === null || v === undefined ? 'n.d.' : String(v).replace('.', ',');
const rw = (v) => v < -50 ? 'no significativo, revisar a mano' : coma(v); // ROIC − WACC (con fondos propios negativos sale absurdo)
const revPorCarpeta = new Map(Object.entries(REV12).map(([k, v]) => [v.carpeta, { clave: k, ...v }]));
const resumen = [];
for (const g of grupos.values()) {
  const f = g.at(-1), rev = revPorCarpeta.get(f.carpeta) ?? (REV12[normal(f.ticker)] ? { clave: normal(f.ticker), ...REV12[normal(f.ticker)] } : null), o = f.o12_informe;
  const clave = rev?.clave ?? normal(f.ticker);
  const senal = rev ? (rev.senal_ponderada ?? rev.senal) : o?.senal ?? null;
  const rte = rev ? n(rev.rentabilidad_ponderada_pct) : n(o?.rentabilidad_ponderada_pct);
  // Compra robusta: el límite al que la dan a la vez el método vigente y el de control (robustez.mjs).
  const rb = ROB.get(f.carpeta);
  const limRobusto = rb ? Math.min(...[rb.limite_comprar_cot, rb.limite_comprar_control_cot].map(n).filter((v) => v !== null)) : null;
  resumen.push({
    tipo: 'Value', carpeta: f.carpeta, clave, empresa: f.empresa, ticker: f.ticker, sector: f.sector, senal, rte,
    divisa: rev?.divisa_cotizacion ?? f.divisa, precio: rev ? n(rev.precio_cot ?? rev.precio_ref) : f.precio, fecha_precio: rev?.fecha_precio ?? f.fecha,
    compra: Number.isFinite(limRobusto) ? limRobusto : rev ? n(rev.comprar_por_debajo_cot ?? rev.comprar_por_debajo) : n(o?.comprar_por_debajo),
    // Vender por encima de: el precio al que deja de pasar el filtro para mantener (robustez.mjs); sin él, el de la señal Vender.
    venta: n(rb?.limite_mantener_cot) ?? (rev ? n(rev.vender_por_encima_cot ?? rev.vender_por_encima) : n(o?.vender_por_encima)),
    // Precio objetivo a 12 meses (el de la rentabilidad) y valor real del DCF, en la divisa de cotización (como «Precio»).
    objetivo12: (() => { const ob = rev ? n(rev.objetivo_ponderado) : n(o?.objetivo_ponderado), pr = rev ? n(rev.precio_ref) : null, pc = rev ? n(rev.precio_cot ?? rev.precio_ref) : null; return ob === null ? null : pr && pc ? ob * pc / pr : ob; })(),
    valor_real: (() => { const pr = rev ? n(rev.precio_ref) : null, pc = rev ? n(rev.precio_cot ?? rev.precio_ref) : null; return f.objetivo === null ? null : pr && pc ? f.objetivo * pc / pr : f.objetivo; })(),
    mantener: rb?.accion_vigente ?? null, base: rb ? n(rb.base) : n(rev?.rentabilidad_base_pct), vi_precio: f.objetivo && f.precio ? f.objetivo / f.precio : null,
    proximos: f.proximos, informe: f.informe,
    robusta: rb?.accion_robusta ?? null, confianza_baja: !!o?.confianza_baja, sostenible: f.sostenible, roic_wacc: f.roic_wacc,
    revisar: rev?.revisar ?? null,
  });
}
for (const dir of readdirSync('informes-growth', { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name)) {
  const ruta = join('informes-growth', dir, 'datos.json');
  if (!existsSync(ruta)) continue;
  const d = JSON.parse(readFileSync(ruta, 'utf8')), c = d.calc;
  if (!c?.senal) continue;
  const word = readdirSync(join('informes-growth', dir)).find((x) => x.endsWith('.docx'));
  resumen.push({
    tipo: 'Growth', carpeta: dir, clave: normal(d.ticker), empresa: d.empresa, ticker: d.ticker, sector: 'Growth', senal: c.senal, rte: n(c.rent_ponderada_pct),
    divisa: d.moneda, precio: n(d.precio), fecha_precio: d.fecha, compra: n(c.precio_max_compra), venta: null,
    objetivo12: n(d.precio) !== null && n(c.rent_ponderada_pct) !== null ? n(d.precio) * (1 + n(c.rent_ponderada_pct) / 100) : null, valor_real: null,
    proximos: fechaResultados(normal(d.ticker), d, CAL), informe: word ? `informes-growth/${dir}/${word}` : null, conviccion: c.conviccion,
    robusta: ROBG.get(dir)?.senal_robusta ?? null,
  });
}
// «Qué hacer según el método»: los filtros de cartera de METODO-VIGENTE.md §4, en una frase.
function queHacer(x) {
  const ex = EXCLUIDAS[x.clave] ?? EXCLUIDAS[normal(x.ticker)];
  const excCal = EXCEPCION_CALIDAD[x.clave];
  if (x.senal === 'Vender') return 'Vender si la tienes';
  if (x.senal === 'Mantener' || !x.senal) {
    if (x.tipo === 'Value' && x.roic_wacc !== null && x.roic_wacc < 4.5 && !excCal) return `Vender si la tienes: calidad baja (ROIC − WACC ${rw(x.roic_wacc)})`;
    // Filtro para mantener (METODO-VIGENTE.md §4): rentabilidad ≥ 10 %, escenario central ≥ 5 % y valor real no más de un 15 % bajo el precio.
    if (x.tipo === 'Value' && x.mantener === 'No mantener') {
      const m = x.rte !== null && x.rte < 10 ? 'rentabilidad esperada por debajo del 10 %' : x.base !== null && x.base < 5 ? 'escenario central por debajo del 5 %'
        : x.vi_precio !== null && x.vi_precio < 0.85 ? 'valor real más de un 15 % por debajo del precio' : 'no pasa el filtro para mantener';
      return `Vender si la tienes: ${m}`;
    }
    if (x.tipo === 'Value' && x.roic_wacc !== null && x.roic_wacc < MIN_CALIDAD && !excCal) return 'Mantener sin ampliar (calidad justa)';
    return x.senal ? 'Mantener' : 'Sin cifra todavía';
  }
  // Señal Comprar: hacen falta todos los filtros a la vez.
  if (ex) return `No comprar: excluida (${ex})`;
  if (x.confianza_baja) return 'No comprar todavía: datos sin confirmar';
  if (x.tipo === 'Value') {
    if (x.sostenible && !/^s[ií]/i.test(x.sostenible)) return `No comprar: crecimiento sostenible solo «${x.sostenible}»`;
    if (x.roic_wacc !== null && x.roic_wacc < MIN_CALIDAD && !excCal) return `No comprar: calidad por debajo de ${MIN_CALIDAD} (ROIC − WACC ${rw(x.roic_wacc)})`;
    if (x.robusta && x.robusta !== 'Comprar') return x.compra !== null && x.precio > x.compra
      ? `Esperar: comprar a ${coma(x.compra)} o menos (ahí la dan los dos métodos)` : 'No comprar: no pasa las pruebas de robustez';
  }
  if (x.tipo === 'Growth' && x.robusta && !/^Comprar/.test(x.robusta)) return 'No comprar: no pasa las pruebas de robustez';
  // Sin tramos ni aplazamiento por resultados (METODO-VIGENTE.md §4, regla 11, 15-oct): la compra es entera, de una vez.
  const base = x.tipo === 'Growth' && x.conviccion === 'baja' ? 'Comprar (convicción baja)' : 'Comprar';
  return `${base} por debajo del límite, entera`;
}
for (const x of resumen) x.que = queHacer(x);
// Lo mismo visto desde una posición que ya tienes (versión privada): ampliar en vez de comprar; vender por calidad.
function queHacerTenencia(x) {
  const q = x.que;
  if (/^Comprar/.test(q)) return q.replace(/^Comprar/, 'Ampliar');
  if (/^Esperar/.test(q)) return q.replace(/^Esperar: comprar a/, 'Mantener; ampliar solo a');
  if (/^No comprar/.test(q)) return x.tipo === 'Value' && x.roic_wacc !== null && x.roic_wacc < 4.5 && !EXCEPCION_CALIDAD[x.clave]
    ? `Vender: calidad baja (ROIC − WACC ${rw(x.roic_wacc)})` : q.replace(/^No comprar( todavía)?:/, 'Mantener sin ampliar:');
  return q.replace(/^Vender si la tienes/, 'Vender');
}
const ordenQue = (x) => /^Comprar/.test(x.que) ? 0 : /^Esperar/.test(x.que) ? 1 : /^No comprar/.test(x.que) ? 2 : /^Mantener/.test(x.que) ? 3 : /^Vender/.test(x.que) ? 4 : 5;
resumen.sort((a, b) => ordenQue(a) - ordenQue(b) || (b.rte ?? -999) - (a.rte ?? -999));

// ── Cartera real (solo para la versión privada) ──
let real_ = null;
if (conCartera) {
  const ultimo = JSON.parse(readFileSync(join(DATOS_REAL, 'ultimo.json'), 'utf8'));
  const rutaCart = join(DATOS_REAL, 'escaner-cartera.json');
  const cart = existsSync(rutaCart) ? JSON.parse(readFileSync(rutaCart, 'utf8')) : {};
  const op = cart.ordenes_pendientes || {};
  const ordenes = new Map();
  for (const k of op.vender || []) ordenes.set(k, 'Vender (propuesta)');
  for (const c of op.comprar || []) ordenes.set(c.clave, `Comprar ${c.titulos} a ${String(c.limite).replace('.', ',')} ${c.divisa} o menos${c.desde ? ` (desde el ${fechaCorta(c.desde)}${c.condicion ? `, ${c.condicion}` : ''})` : ''}${c.tramo2 ? `; +${c.tramo2.titulos} desde el ${fechaCorta(c.tramo2.desde)} (${c.tramo2.condicion})` : ''}`);
  for (const c of op.lista_espera || []) if (!ordenes.has(c.clave)) ordenes.set(c.clave, `${c.hasta ? 'En espera' : 'Orden límite'}: comprar${c.titulos ? ` ${c.titulos}` : ''} a ${String(c.limite).replace('.', ',')} ${c.divisa} o menos${c.hasta ? ` (hasta el ${fechaCorta(c.hasta)})` : c.condicion ? ` (${c.condicion})` : ''}`);
  // Decisiones del usuario sobre posiciones concretas (MEMORIA.md).
  const DECISION = { IGLN: 'Mantener en el 16 %: decisión tuya', EDEN: 'Mantener: decisión tuya (ni se vende ni se amplía)' };
  for (const [k, txt] of Object.entries(REGLAS.no_vender || {})) DECISION[k] ??= `Mantener: ${txt.charAt(0).toLowerCase()}${txt.slice(1)}`;
  // Regla 12 (METODO-VIGENTE.md §4): lo comprado no se toca en 3 meses (ni se amplía ni se vende por recálculos).
  const hastaR12 = Object.fromEntries(Object.entries(REGLAS.mantener_hasta || {}).filter(([, f]) => /^\d{4}-\d{2}-\d{2}$/.test(f)));
  for (const p of cart.posiciones || []) if (p.no_tocar_hasta && !(hastaR12[p.clave] >= p.no_tocar_hasta)) hastaR12[p.clave] = p.no_tocar_hasta;
  for (const [k, f] of Object.entries(hastaR12)) if (f >= hoy && !REGLAS.no_vender?.[k]) DECISION[k] ??= `Mantener: no se toca hasta el ${fechaCorta(f)} (regla de 3 meses)`;
  for (const k of REGLAS.no_ampliar || []) DECISION[k] ??= 'Mantener: no se amplía (decidido en la tabla de órdenes)';
  const pos = new Map((ultimo.filas || []).filter((p) => p.titulos > 0).map((p) => [p.clave, p]));
  // Las cuatro cifras de la cartera: la última foto cerrada (cartera/cartera-1-AAAA-MM-DD-HHMM.md, tabla «Cartera de hoy»);
  // si no hay, el «## Resumen» de la última cartera/ordenes-AAAA-MM-DD.md.
  let cifras = null, fuente = null;
  const dirCartera = join(DATOS_REAL, '..');
  const fotos = existsSync(dirCartera) ? readdirSync(dirCartera).filter((x) => /^cartera-1-\d{4}-\d{2}-\d{2}-\d{4}\.md$/.test(x)).sort() : [];
  const tablas = existsSync(dirCartera) ? readdirSync(dirCartera).filter((x) => /^ordenes-\d{4}-\d{2}-\d{2}\.md$/.test(x)).sort() : [];
  if (fotos.length) {
    fuente = fotos.at(-1);
    const filas = readFileSync(join(dirCartera, fuente), 'utf8').split('\n').filter((l) => l.startsWith('|')).map((l) => l.split('|').slice(1, -1).map((x) => x.trim()));
    const i = filas.findIndex((c) => /^cartera de hoy$/i.test(c[1] || ''));
    if (i >= 0) { cifras = []; for (const c of filas.slice(i + 1)) { if (c.length < 3) break; if (!/^-+$/.test(c[1]) && c[0]) cifras.push(c); } }
  } else if (tablas.length) {
    fuente = tablas.at(-1);
    const md = readFileSync(join(dirCartera, fuente), 'utf8'), i = md.indexOf('## Resumen');
    if (i >= 0) cifras = md.slice(i).split(/\n## /)[0].split('\n').slice(1).filter((l) => l.startsWith('|')).map((l) => l.split('|').slice(1, -1).map((x) => x.trim())).filter((c) => c.length >= 3 && !/^-+$/.test(c[1]) && c[0]);
  }
  real_ = { ultimo, ordenes, DECISION, pos, cifras, fuente, liquidez: n(ultimo.cartera?.liquidez), total: n(ultimo.cartera?.total) };
}

// Alto de una fila con texto ajustado: líneas que ocupa el texto más largo en su columna (ancho en caracteres).
const alto = (fila, anchos) => { let l = 1; fila.forEach((c, i) => { if (c.s === S.ajuste || c.s === S.titulo) l = Math.max(l, String(c.v ?? '').split('\n').reduce((a, t) => a + Math.max(1, Math.ceil(t.length / (anchos[i] * 1.05))), 0)); }); fila.alto = Math.max(15, l * 13.5 + 3); return fila; };

// ── Cómo leerlo ──
const COMO = [
  ['Qué mirar', 'La hoja «Resumen». Una fila por empresa analizada (value y growth) con una sola cifra de rentabilidad: la del método que decide hoy. Todo lo demás (métodos antiguos y de control, criterios, DCF) está en «Detalle», por si quieres comprobar algo.'],
  ['Rentabilidad esperada 12 m', 'Lo que esperamos que gane la acción en 12 meses: la subida hasta el precio objetivo más el dividendo, sobre el precio de la columna «Precio».\nValue: beneficio por acción que esperamos para el ejercicio que mirará el mercado dentro de un año × el PER que razonablemente pagará (el de hoy, acercándose un poco a su media de 5 años, como mucho un 10 % arriba o abajo). Se calcula en tres escenarios (pesimista 25 %, central 50 %, optimista 25 %) y se hace la media ponderada.\nGrowth: lo mismo con las ventas de dentro de 12 meses y un múltiplo de ventas o de beneficio bruto con tope.'],
  ['Siendo prudentes (la mitad)', 'La misma cifra dividida entre dos. Los objetivos suelen salir optimistas, así que para comparar con el índice mundial y para el tamaño de las posiciones usamos la mitad.'],
  ['Señal', 'Lo que dice el método solo con la rentabilidad.\nValue: Comprar si la rentabilidad es del 15 % o más, el escenario central da al menos un 12 % y el valor real del negocio (DCF) no está por debajo del precio. Vender si es del −10 % o menos. Mantener en medio.\nGrowth: Comprar si la puntuación de la empresa es de 60 sobre 100 o más, la rentabilidad del 5 % o más y el escenario pesimista no cae más de un 50 %. Vender si la puntuación baja de 50 o la rentabilidad es del −10 % o menos.'],
  ['Qué hacer según el método', 'ESTE ES EL CRITERIO PARA TU CARTERA. Una empresa se compra o se amplía solo si se cumple todo a la vez:\n1. Señal Comprar.\n2. Calidad (value): el negocio gana sobre su capital al menos 5 puntos más de lo que le cuesta ese capital (ROIC − WACC ≥ 5) y su crecimiento es sostenible.\n3. Robusta: el precio está por debajo del límite al que dan Comprar a la vez el método vigente y el de control (la versión anterior del cálculo), y aguanta las pruebas de robustez. Ese límite es el de «Comprar por debajo de»; si el precio está por encima, la fila dice «Esperar».\n4. No está excluida (juego y apuestas, comercio minorista, Accenture, Adobe, Rightmove, Duolingo, Shopify, Axon, Snowflake y las demás de la lista de exclusiones).\n5. El precio del momento está por debajo de «Comprar por debajo de».\nLa compra se hace entera, de una vez: sin tramos y sin esperar a resultados (regla del 15-oct). Lo comprado no se toca en 3 meses salvo un hecho nuevo y duro.\nMantener (si ya la tienes): se queda solo si la rentabilidad esperada es al menos del 10 %, el escenario central da al menos un 5 % y el valor real del negocio no está más de un 15 % por debajo del precio. Si no, «Vender si la tienes». Con calidad entre 4,5 y 5 se mantiene pero no se amplía; por debajo de 4,5 se vende por calidad.\nVender: señal Vender, no pasa el filtro para mantener o el precio supera «Vender por encima de».'],
  ['Tamaño y liquidez', 'Mínimo 1.000 € por posición y, como guía, no más del 7 % de la cartera (salvo Edenred y el oro, que decides tú). Growth, como mucho el 20 % de la cartera. La liquidez nunca negativa; si sobran 3.000 € o más durante 3 meses, a un monetario (XEON).'],
  ['Precio objetivo 12 m y Valor real (DCF)', 'Son dos precios distintos y pueden estar muy lejos.\n«Precio objetivo 12 m»: a cuánto esperamos que cotice dentro de un año (media ponderada 25/50/25 de los tres escenarios de PER × BPA). La «Rentabilidad esperada 12 m» es este objetivo (más el dividendo) sobre el «Precio»: es la que decide y la que se usa en las tablas de tu cartera.\n«Valor real (DCF)»: lo que vale el negocio por el dinero que generará (síntesis del informe: DCF y escenarios). No es un objetivo: es un filtro. Para comprar tiene que estar por encima del precio, y para mantener, no más de un 15 % por debajo. Si el mercado paga la empresa muy por encima de su valor real (Everpure, Cadence, Moody\'s…), la rentabilidad a 12 meses puede ser alta y aun así la fila dice «Vender si la tienes».'],
  ['Precio y fecha del precio', 'El precio objetivo queda fijo; con un precio nuevo solo cambia la rentabilidad. «Precio» y «Fecha del precio» dicen con qué cierre está calculada la cifra. Antes de cada orden se mira el precio del momento y si ha habido resultados después del informe.'],
  ['Comprar por debajo de / Vender por encima de', 'Los precios límite: por debajo del primero se puede comprar (en value es el límite robusto, el que pasa con los dos métodos, y nunca por encima del valor real); por encima del segundo deja de pasar el filtro para mantener y se vende (a menudo es el valor real ÷ 0,85). En la divisa en la que cotiza. En growth, «Comprar por debajo de» es el precio máximo de compra y no hay límite de venta (se vende si cambia la puntuación o la rentabilidad).'],
  ['Próximos resultados', 'Fecha de los próximos resultados (calendario único del escáner; si no está, la del informe).'],
  ['Último análisis', 'Fecha de corte del último análisis de la empresa (value o growth).'],
  ['Seguimiento', 'Lo que toca para no perder de vista ninguna empresa con calidad (inventario de cobertura): «Al día»; «Revisar con los resultados del…» (publicó después del análisis y aún no se ha revisado); «Reanalizar» (análisis de más de 6 meses); «Falta: …» (una pieza del sistema que no la sigue). Las que no tienen calidad solo se siguen por precio.'],
  ['Lo que ya no decide', 'Hoja «Detalle»: «Rentabilidad total esperada» y «con la prima del mercado» salen del DCF del informe (valor a largo plazo): ahora solo sirven como «valor real» y como filtro. «Rentabilidad 12 m (base)» es solo el escenario central (filtro del 12 %). «v2 (control)» y «v3 sin selector» son los métodos de comparación. «Objetivo analistas» es el consenso, solo para comparar. «Convicción», «Regla absoluta» y «Regla relativa» son del método anterior.'],
  ['Tu cartera', 'Las cifras de tu cartera (rentabilidad esperada, siendo prudentes, cuánto puede subir o bajar en un año normal y rentabilidad por unidad de riesgo) y lo que toca hacer con cada posición están en la versión privada de este Excel (seguimiento-mi-cartera.xlsx, en la carpeta de la cartera real del proyecto), nunca en el repo, que es público.'],
];
const ANCHOS_COMO = [30, 120];
const hojaComo = hoja({ nombre: 'Cómo leerlo', cols: [['Columna o tema', 30], ['Qué significa', 120]], filtro: false, altoCab: 20,
  filas: COMO.map(([a, b]) => alto([T(a, S.titulo), T(b, S.ajuste)], ANCHOS_COMO)) });

// ── Detalle: todas las cifras de antes, una fila por análisis ──
const COLS_DET = [
  ['Iteración', 9], ['Empresa', 18], ['Ticker', 9], ['Fecha', 11], ['Geografía', 13], ['Sector', 20], ['Señal 12 m (método vigente)', 11], ['Rentabilidad 12 m (método vigente)', 12], ['Objetivo 12 m (método vigente)', 12],
  ['Rentabilidad 12 m (base)', 12], ['Regla que decide', 9], ['Rentabilidad 12 m v2 (control)', 12], ['Rentabilidad 12 m v3 sin selector', 12],
  ['Comprar por debajo de (solo método vigente)', 11], ['Vender por encima de (señal Vender)', 11], ['Divisa', 7], ['Precio del informe', 11],
  ['Señal del informe (DCF, ya no decide)', 11], ['Convicción', 11], ['Convicción según criterios', 11], ['Valor objetivo DCF', 12], ['Objetivo DCF con la prima del mercado', 13], ['Rentabilidad total esperada (DCF)', 12],
  ['Rentabilidad DCF con la prima del mercado', 13], ['Objetivo analistas', 11], ['Regla absoluta', 10], ['Regla relativa', 10], ...CRITERIOS.map(([c]) => [c, 11]), ['Metodología', 11], ['Origen del objetivo 12 m', 40], ['Próximos resultados', 12], ['Informe', 46],
];
const filasDet = filas.map((f) => {
  const rev = revPorCarpeta.get(f.carpeta), o = f.o12_informe;
  const v2 = rev ? (rev.version === 'v2' ? rev.rentabilidad_ponderada_pct : rev.v2?.rentabilidad_ponderada_pct) : null;
  const v3 = rev ? (rev.version === 'v3' ? rev.rentabilidad_ponderada_pct : rev.v3_sin_selector?.rentabilidad_ponderada_pct) : null;
  return [
    N(f.iteracion, S.centro), T(f.empresa), T(f.ticker, S.centro), F(f.fecha), T(f.geografia), T(f.sector),
    T(f.o12.senal, S[f.o12.senal] ?? S.centro), P(f.o12.rte), N(f.o12.objetivo), P(f.o12.rte_base), T(rev?.version ?? o?.version ?? null, S.centro), P(v2), P(v3),
    N(f.compra), N(f.venta), T(f.divisa, S.centro), N(f.precio),
    T(f.senal, S[f.senal] ?? S.centro), T(f.conviccion, S.centro), T(f.conviccion_criterios, S.centro), N(f.objetivo), N(f.objetivo_mercado), P(f.rte), P(f.rte_mercado), N(f.analistas),
    T(f.regla_abs, S.centro), T(f.regla_rel, S.centro), ...f.criterios.map((v) => T(v ?? 'n.d.', v ? S[v] : S.centro)),
    T(f.metodologia, S.centro), T(f.o12.origen), F(f.proximos), L(f.informe),
  ];
});
const hojaDet = hoja({ nombre: 'Detalle', cols: COLS_DET, filas: filasDet, congelar: 3 });

const criterios = [
  ['Iteración', 'Número de análisis de la empresa (mismo ticker), por orden de fecha: 1 es el primero. Cada nuevo análisis en otra fecha va en su propia carpeta y su propia fila, sin pisar los anteriores, para seguir la evolución de la valoración.'],
  ['Señal / Rentabilidad / Objetivo 12 m (método vigente)', 'Las cifras que deciden (las mismas del «Resumen» cuando hay una sola iteración). Value: regla v3 con tope ×1,1 y el selector de método (METODO-VIGENTE.md §2; verticales/empresa/objetivo-12m.md): BPA propio de los tres escenarios × PER de la regla común, ponderado con las probabilidades de los escenarios, más el dividendo. Comprar desde el 15 % (con base ≥ 12 % y valor intrínseco ≥ precio), Vender desde el −10 %. Cuando la empresa tiene revisión apuntada (verticales/empresa/objetivo12m-revisados.json) la rentabilidad va al último precio apuntado; si no, al precio del informe.'],
  ['Rentabilidad 12 m (base)', 'Solo el escenario central, más el dividendo. Filtro de valor real: para comprar, al menos un 12 %.'],
  ['Regla que decide', 'v3 o v2, según el selector de método (v2 si la empresa está desrateada o solo tiene historia v2; la más baja con 3 años o menos de historia).'],
  ['Rentabilidad 12 m v2 (control) / v3 sin selector', 'Las mismas cuentas con la otra regla. Sirven de control: una compra es «robusta» si sale Comprar con las dos.'],
  ['Señal del informe (DCF, ya no decide)', 'Recomendación con la regla antigua del informe: rentabilidad total esperada del DCF (subida al valor objetivo + dividendo) con nuestro coste de capital (regla absoluta) y con la prima de riesgo del mercado (regla relativa). Desde el 13-oct manda la rentabilidad a 12 meses; esta queda como referencia.'],
  ['Convicción según criterios', 'Convicción con los criterios fijos aprobados el 9 oct 2026 (motor/conviccion.mjs), sobre la regla antigua. En los informes anteriores al 9 oct la columna «Convicción» se decidió a ojo.'],
  ['Valor objetivo DCF', 'Valor objetivo del informe con nuestro coste de capital (síntesis ponderada de DCF, comparables y demás métodos), en la divisa de las cuentas. Hoy es el «valor real» (filtro: para comprar, no por debajo del precio).'],
  ['Objetivo DCF con la prima del mercado', 'El mismo valor objetivo con el coste de capital que sale de la prima de riesgo implícita del mercado (Damodaran).'],
  ['Comprar por debajo de / Vender por encima de', 'Precios a los que cambiaría la señal a 12 meses.'],
  ['Objetivo analistas', 'Precio objetivo medio del consenso de analistas en la fecha del informe. Solo se compara.'],
  ...CRITERIOS.map(([c, e]) => [c, e]),
  ['Metodología', 'Nueva: el DCF lleva la prueba de sostenibilidad del crecimiento (puente volumen × precio, cuota implícita y reinversión, con veredicto), en uso desde el 10-oct-2026. Vieja: informe anterior, pendiente de actualizar en rápido (script `notas/actualizacion-vN.mjs`, sin investigación nueva).'],
  ['Origen del objetivo 12 m', 'Nota de la revisión apuntada: regla, múltiplos y BPA de cada escenario, precio usado y comparación con las otras reglas.'],
  ['n.d.', 'El informe no tiene el dato (por ejemplo, sin consenso o sin lista de gobierno).'],
  ['Próximos resultados', 'Fecha de los próximos resultados: la del calendario único (escaner/calendario.json, que pone al día la pasada de las 9:25) y, si la empresa no está en él, la del informe.'],
  ['Informe', 'Ruta del PDF de la última versión de ese análisis, relativa a la raíz del repo.'],
];
const hojaCrit = hoja({ nombre: 'Detalle - columnas', cols: [['Columna', 34], ['Qué mide', 110]], filtro: false, altoCab: 20,
  filas: criterios.map(([a, b]) => alto([T(a, S.ajuste), T(b, S.ajuste)], [34, 110])) });

// ── Cobertura (escaner/cobertura.json, herramientas/cobertura.mjs): fecha del último análisis y qué toca para no perder
// ninguna empresa con calidad (revisar con resultados publicados, reanalizar a los 6 meses). ──
const COB = new Map((existsSync('escaner/cobertura.json') ? JSON.parse(readFileSync('escaner/cobertura.json', 'utf8')).empresas : []).map((c) => [c.clave, c]));
const cobDe = (x) => COB.get(x.clave) ?? COB.get(normal(x.ticker)) ?? null;
const seguimientoTxt = (c) => !c ? null : c.excluida ? `Excluida (${c.excluida}): solo precio` : !c.seguir ? 'Sin calidad: solo precio en el escáner'
  : c.toca ? c.toca[0].toUpperCase() + c.toca.slice(1) : c.huecos?.length ? `Falta: ${c.huecos.join('; ')}` : 'Al día (calidad: resultados, noticias y escáner)';
// ── Resumen (y Mi cartera en la versión privada) ──
function hojaResumen(privado) {
  const cols = [['Tipo', 8], ['Empresa', 22], ['Ticker', 9], ...(privado ? [['En mi cartera (títulos)', 10]] : []), ['Sector', 18], ['Señal', 10],
    ['Rentabilidad esperada 12 m', 12], ['Siendo prudentes (la mitad)', 12], ['Qué hacer según el método', 46], ...(privado ? [['Orden propuesta', 50]] : []),
    ['Divisa', 7], ['Precio', 10], ['Fecha del precio', 11], ['Precio objetivo 12 m', 11], ['Valor real (DCF)', 11], ['Comprar por debajo de', 11], ['Vender por encima de', 11], ['Próximos resultados', 12], ['Último análisis', 11], ['Seguimiento', 40], ['Informe', 46]];
  const fs = resumen.map((x) => {
    const p = privado ? real_.pos.get(x.clave) : null;
    const que = !p ? x.que : real_.DECISION[x.clave] ?? queHacerTenencia(x);
    return [
      T(x.tipo, S.centro), T(x.empresa), T(x.ticker, S.centro), ...(privado ? [N(p?.titulos ?? null, S.centro)] : []), T(x.sector), T(x.senal, S[x.senal] ?? S.centro),
      P(x.rte, S.pctFuerte), P(x.rte === null ? null : x.rte / 2), T(que), ...(privado ? [T(real_.ordenes.get(x.clave) ?? null)] : []),
      T(x.divisa, S.centro), N(x.precio), F(x.fecha_precio), N(x.objetivo12 === null ? null : Math.round(x.objetivo12 * 100) / 100), N(x.valor_real === null ? null : Math.round(x.valor_real * 100) / 100), N(x.compra), N(x.venta), F(x.proximos), F(cobDe(x)?.fecha ?? null), T(seguimientoTxt(cobDe(x))), x.informe ? L(x.informe) : T(null),
    ];
  });
  return hoja({ nombre: 'Resumen', cols, filas: fs, congelar: 3 });
}
// En «Mi cartera», la rentabilidad a 12 meses es la del precio de ahora (robustez --actual, objetivo fijo), la misma que
// usan el escáner y las tablas de cartera que se entregan; en el Resumen sigue la del precio de la revisión.
function rteHoy(x) {
  if (!x) return null;
  if (x.tipo === 'Value') { ROBA ??= new Map(nodo('herramientas/robustez.mjs', ['--todas', '--json', '--actual']).filter((r) => !r.error).map((r) => [r.carpeta, r])); return n(ROBA.get(x.carpeta)?.ponderada) ?? x.rte; }
  ROBGA ??= new Map(nodo('herramientas/robustez-growth.mjs', ['--json', '--precios']).filter((r) => !r.error).map((r) => [r.carpeta, r]));
  return n(ROBGA.get(x.carpeta)?.ponderada_hoy) ?? x.rte;
}
let ROBA, ROBGA;
function hojaCartera() {
  const { pos, ordenes, DECISION, cifras, fuente, liquidez, total } = real_;
  const porClave = new Map(resumen.map((x) => [x.clave, { ...x, rte: rteHoy(x) }]));
  const cols = [['Valor', 26], ['Tipo', 8], ['Títulos', 9], ['Valor hoy (EUR)', 12], ['Peso', 8], ['Señal', 10], ['Rentabilidad esperada 12 m', 12], ['Siendo prudentes (la mitad)', 12],
    ['Qué hacer según el método', 46], ['Orden propuesta', 50], ['Próximos resultados', 12]];
  const fs = [...pos.values()].sort((a, b) => (b.valor_eur ?? 0) - (a.valor_eur ?? 0)).map((p) => {
    const x = porClave.get(p.clave);
    return [T(x?.empresa ?? p.nombre), T(x?.tipo ?? (p.vertical === 'otro' ? 'Otro' : p.vertical === 'value' ? 'Value' : p.vertical), S.centro), N(p.titulos, S.centro), N(Math.round(p.valor_eur ?? 0)), P(total ? (p.valor_eur ?? 0) / total * 100 : null),
      T(x?.senal ?? null, S[x?.senal] ?? S.centro), P(x?.rte ?? null, S.pctFuerte), P(x?.rte == null ? null : x.rte / 2), T(DECISION[p.clave] ?? (x ? queHacerTenencia(x) : '—')), T(ordenes.get(p.clave) ?? null), F(x?.proximos ?? null)];
  });
  fs.push([T('Liquidez', S.titulo), T(null), T(null), N(Math.round(liquidez ?? 0)), P(total ? liquidez / total * 100 : null)]);
  fs.push([T('Total', S.titulo), T(null), T(null), N(Math.round(total ?? 0)), P(total ? 100 : null)]);
  fs.push([T(null)]);
  // Compras propuestas de valores que aún no tienes.
  const nuevas = [...ordenes.entries()].filter(([k]) => !pos.has(k));
  if (nuevas.length) {
    fs.push([T('Compras propuestas de valores nuevos', S.titulo)]);
    for (const [k, txt] of nuevas) { const x = porClave.get(k) ?? resumen.find((r) => normal(r.ticker) === k); const qn = x?.que && /^Orden límite/.test(txt) && !/^Comprar/.test(x.que) ? 'Hoy no se compra: la orden límite solo entra a su precio, donde pasa el método' : x?.que ?? null; fs.push([T(x?.empresa ?? k), T(x?.tipo ?? null, S.centro), T(null), T(null), T(null), T(x?.senal ?? null, S[x?.senal] ?? S.centro), P(x?.rte ?? null, S.pctFuerte), P(x?.rte == null ? null : x.rte / 2), T(qn), T(txt), F(x?.proximos ?? null)]); }
    fs.push([T(null)]);
  }
  if (cifras?.length) {
    fs.push([T(`La cartera en cuatro cifras (tabla ${fuente})`, S.titulo), T(null), T(null), T(null), T(null), T(null), T(null), T(null), T(cifras[0]?.length >= 3 ? 'Cartera de hoy' : null, S.cab), T('Tras las órdenes', S.cab)]);
    for (const c of cifras.filter((c) => !/^cartera de hoy$/i.test(c[1]))) fs.push([T(c[0]), T(null), T(null), T(null), T(null), T(null), T(null), T(null), T(c[1], S.centro), T(c[2], S.centro)]);
  }
  fs.push([T(`Posiciones y valor: IBKR, ${real_.ultimo.fecha} ${real_.ultimo.hora ?? ''}. Datos privados: este archivo no va al repo.`)]);
  return hoja({ nombre: 'Mi cartera', cols, filas: fs, congelar: 1, filtro: false });
}

// ── Libro ──
const estilos = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
<numFmts count="1"><numFmt numFmtId="164" formatCode="+0.0%;-0.0%;0.0%"/></numFmts>
<fonts count="8">
<font><sz val="10"/><name val="Calibri"/></font>
<font><b/><sz val="10"/><color rgb="FFFFFFFF"/><name val="Calibri"/></font>
<font><b/><sz val="12"/><color rgb="FF1E7B34"/><name val="Calibri"/></font>
<font><b/><sz val="12"/><color rgb="FFC00000"/><name val="Calibri"/></font>
<font><b/><sz val="12"/><color rgb="FF7F7F7F"/><name val="Calibri"/></font>
<font><u/><sz val="10"/><color rgb="FF0563C1"/><name val="Calibri"/></font>
<font><b/><sz val="10"/><name val="Calibri"/></font>
<font><b/><sz val="11"/><name val="Calibri"/></font>
</fonts>
<fills count="6">
<fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill>
<fill><patternFill patternType="solid"><fgColor rgb="FF1F3864"/></patternFill></fill>
<fill><patternFill patternType="solid"><fgColor rgb="FFC6EFCE"/></patternFill></fill>
<fill><patternFill patternType="solid"><fgColor rgb="FFFFEB9C"/></patternFill></fill>
<fill><patternFill patternType="solid"><fgColor rgb="FFFFC7CE"/></patternFill></fill>
</fills>
<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>
<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>
<cellXfs count="16">
<xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>
<xf numFmtId="0" fontId="1" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1" applyAlignment="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf>
<xf numFmtId="4" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/>
<xf numFmtId="164" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/>
<xf numFmtId="0" fontId="2" fillId="0" borderId="0" xfId="0" applyFont="1" applyAlignment="1"><alignment horizontal="center"/></xf>
<xf numFmtId="0" fontId="3" fillId="0" borderId="0" xfId="0" applyFont="1" applyAlignment="1"><alignment horizontal="center"/></xf>
<xf numFmtId="0" fontId="4" fillId="0" borderId="0" xfId="0" applyFont="1" applyAlignment="1"><alignment horizontal="center"/></xf>
<xf numFmtId="0" fontId="0" fillId="3" borderId="0" xfId="0" applyFill="1" applyAlignment="1"><alignment horizontal="center"/></xf>
<xf numFmtId="0" fontId="0" fillId="4" borderId="0" xfId="0" applyFill="1" applyAlignment="1"><alignment horizontal="center"/></xf>
<xf numFmtId="0" fontId="0" fillId="5" borderId="0" xfId="0" applyFill="1" applyAlignment="1"><alignment horizontal="center"/></xf>
<xf numFmtId="14" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1" applyAlignment="1"><alignment horizontal="center"/></xf>
<xf numFmtId="0" fontId="5" fillId="0" borderId="0" xfId="0" applyFont="1"/>
<xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0" applyAlignment="1"><alignment vertical="top" wrapText="1"/></xf>
<xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0" applyAlignment="1"><alignment horizontal="center"/></xf>
<xf numFmtId="0" fontId="7" fillId="0" borderId="0" xfId="0" applyFont="1" applyAlignment="1"><alignment vertical="top" wrapText="1"/></xf>
<xf numFmtId="164" fontId="6" fillId="0" borderId="0" xfId="0" applyNumberFormat="1" applyFont="1"/>
</cellXfs>
</styleSheet>`;

function libro(hojas) {
  const ct = hojas.map((_, i) => `<Override PartName="/xl/worksheets/sheet${i + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`).join('');
  const entradas = new Map([
    ['[Content_Types].xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>${ct}<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/></Types>`],
    ['_rels/.rels', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>`],
    ['xl/workbook.xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets>${hojas.map((h, i) => `<sheet name="${esc(h.nombre)}" sheetId="${i + 1}" r:id="rId${i + 1}"/>`).join('')}</sheets><definedNames>${hojas.map((h, i) => h.filtro ? `<definedName name="_xlnm._FilterDatabase" localSheetId="${i}" hidden="1">${esc(h.filtro)}</definedName>` : '').join('')}</definedNames></workbook>`],
    ['xl/_rels/workbook.xml.rels', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${hojas.map((_, i) => `<Relationship Id="rId${i + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${i + 1}.xml"/>`).join('')}<Relationship Id="rId${hojas.length + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`],
    ['xl/styles.xml', estilos],
  ]);
  hojas.forEach((h, i) => { entradas.set(`xl/worksheets/sheet${i + 1}.xml`, h.xml); if (h.rels) entradas.set(`xl/worksheets/_rels/sheet${i + 1}.xml.rels`, h.rels); });
  return escribirZip(entradas);
}

writeFileSync(salida, libro([hojaResumen(false), hojaComo, hojaDet, hojaCrit]));
const cuenta = (re) => resumen.filter((x) => re.test(x.que)).length;
console.log(`${salida}: ${resumen.length} empresas en el resumen (${resumen.filter((x) => x.tipo === 'Value').length} value, ${resumen.filter((x) => x.tipo === 'Growth').length} growth): ${cuenta(/^Comprar/)} para comprar, ${cuenta(/^Esperar/)} a la espera de su límite, ${cuenta(/^No comprar/)} con señal Comprar que no pasan los filtros, ${cuenta(/^Mantener/)} mantener, ${cuenta(/^Vender/)} vender; detalle: ${filas.length} análisis de ${grupos.size} empresas`);
for (const x of resumen.filter((x) => /^(Comprar|Esperar|No comprar)/.test(x.que))) console.log(`  ${x.tipo.padEnd(6)} ${String(x.empresa).padEnd(24)} ${String(x.rte).padStart(6)} %  ${x.que}`);
if (conCartera) {
  const priv = join(DATOS_REAL, 'seguimiento-mi-cartera.xlsx');
  writeFileSync(priv, libro([hojaResumen(true), hojaCartera(), hojaComo, hojaDet, hojaCrit]));
  console.log(`${priv}: versión privada con ${real_.pos.size} posiciones (no va al repo)`);
}
