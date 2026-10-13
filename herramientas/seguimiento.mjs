// Resumen de todos los informes de empresa en una hoja: seguimiento.xlsx, en la raíz del repo.
// Una fila por análisis (la última versión de cada carpeta de informes/), con la señal, los precios y una
// batería de criterios marcados con ✓ (bien), = (neutro) o ✗ (mal). La hoja «Criterios» explica cada umbral.
// Una empresa que se vuelve a analizar en otra fecha tiene carpeta propia y fila propia: la columna «Iteración»
// las numera 1, 2, 3… por fecha (agrupadas por ticker) para seguir cómo evoluciona la valoración.
// Sin dependencias.
//
//   node herramientas/seguimiento.mjs [--salida seguimiento.xlsx]
//
// Se vuelve a ejecutar después de cada informe nuevo o versión nueva.

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { escribirZip } from '../motor/rellenar.mjs';
import { conviccionSugerida } from '../motor/conviccion.mjs';
import { objetivo12m } from './objetivo12m.mjs';
import { readFileSync as leer } from 'node:fs';
const REV12 = JSON.parse(leer(new URL('../verticales/empresa/objetivo12m-revisados.json', import.meta.url), 'utf8')).revisados;

const argv = process.argv.slice(2);
const salida = argv.includes('--salida') ? argv[argv.indexOf('--salida') + 1] : 'seguimiento.xlsx';
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
  const vs = archivos.map((f) => f.match(/^datos-v(\d+)\.json$/)).filter(Boolean).sort((a, b) => b[1] - a[1]);
  const datos = vs.length ? vs[0][0] : archivos.includes('datos.json') ? 'datos.json' : null;
  if (!datos) continue;
  const d = JSON.parse(readFileSync(join('informes', dir, datos), 'utf8'));
  if (!d.calc?.recomendacion?.recomendacion) continue; // análisis en curso
  const base = vs.length ? archivos.find((f) => f.endsWith(` v${vs[0][1]}.docx`)) : archivos.find((f) => /\d{4}-\d{2}-\d{2}\.docx$/.test(f));
  if (!base) continue;
  const pdf = base.replace(/\.docx$/, '.pdf');
  // El PDF es lo último que se genera: sin él, el análisis sigue en curso (puede haber un Word de prueba).
  if (!existsSync(join('informes', dir, pdf))) continue;
  const R = d.calc.recomendacion, rel = R.relativo || {};
  filas.push({
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
// Las empresas se ordenan por la señal y la rentabilidad de su último análisis; debajo, sus iteraciones de la primera a la última.
const porSenal = (a, b) => (ORDEN[a.senal] ?? 3) - (ORDEN[b.senal] ?? 3) || (b.rte_mercado ?? b.rte ?? -999) - (a.rte_mercado ?? a.rte ?? -999);
filas.length = 0;
for (const g of [...grupos.values()].sort((a, b) => porSenal(a.at(-1), b.at(-1)))) filas.push(...g);

// ── Hoja ──
const COLS = [
  ['Iteración', 9], ['Empresa', 18], ['Ticker', 9], ['Fecha', 11], ['Geografía', 13], ['Sector', 20], ['Señal', 11], ['Convicción', 11], ['Convicción según criterios', 11], ['Divisa', 7],
  ['Precio actual', 11], ['Precio objetivo 12 m', 12], ['Objetivo con la prima del mercado', 13], ['Rentabilidad total esperada', 12],
  ['Rentabilidad con la prima del mercado', 13], ['Objetivo analistas', 11], ['Comprar por debajo de', 11], ['Vender por encima de', 11],
  ['Regla absoluta', 10], ['Regla relativa', 10], ...CRITERIOS.map(([c]) => [c, 11]), ['Metodología', 11], ['Objetivo 12 m', 12], ['Rentabilidad 12 m', 12], ['Señal 12 m', 11], ['Origen del objetivo 12 m', 40], ['Informe', 46],
];
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const letra = (i) => (i >= 26 ? String.fromCharCode(64 + Math.floor(i / 26)) : '') + String.fromCharCode(65 + (i % 26));
const texto = (ref, v, s = 0) => v === null || v === undefined || v === '' ? `<c r="${ref}" s="${s}"/>` : `<c r="${ref}" s="${s}" t="inlineStr"><is><t>${esc(v)}</t></is></c>`;
const num = (ref, v, s) => v === null ? `<c r="${ref}" s="${s}"/>` : `<c r="${ref}" s="${s}"><v>${v}</v></c>`;
const serie = (iso) => { const t = Date.parse(iso + 'T00:00:00Z'); return Number.isNaN(t) ? null : t / 86400000 + 25569; };
const S = { cab: 1, num: 2, pct: 3, '✓': 4, '✗': 5, '=': 6, Comprar: 7, Mantener: 8, Vender: 9, fecha: 10, enlace: 11, ajuste: 12, centro: 13 };

const enlaces = [];
const filasXml = [`<row r="1" ht="45" customHeight="1">${COLS.map(([c], i) => texto(`${letra(i)}1`, c, S.cab)).join('')}</row>`];
filas.forEach((f, k) => {
  const r = k + 2, c = (i) => `${letra(i + 1)}${r}`; // la columna A es la iteración
  const celdas = [
    num(`A${r}`, f.iteracion, S.centro),
    texto(c(0), f.empresa), texto(c(1), f.ticker, S.centro), num(c(2), serie(f.fecha), S.fecha), texto(c(3), f.geografia), texto(c(4), f.sector),
    texto(c(5), f.senal, S[f.senal] ?? S.centro), texto(c(6), f.conviccion, S.centro), texto(c(7), f.conviccion_criterios, S.centro), texto(c(8), f.divisa, S.centro),
    num(c(9), f.precio, S.num), num(c(10), f.objetivo, S.num), num(c(11), f.objetivo_mercado, S.num),
    num(c(12), f.rte === null ? null : f.rte / 100, S.pct), num(c(13), f.rte_mercado === null ? null : f.rte_mercado / 100, S.pct),
    num(c(14), f.analistas, S.num), num(c(15), f.compra, S.num), num(c(16), f.venta, S.num),
    texto(c(17), f.regla_abs, S.centro), texto(c(18), f.regla_rel, S.centro),
    ...f.criterios.map((v, i) => texto(c(19 + i), v ?? 'n.d.', v ? S[v] : S.centro)),
  ];
  const ci = 24 + CRITERIOS.length;
  celdas.push(texto(c(ci - 5), f.metodologia, S.centro));
  celdas.push(num(c(ci - 4), f.o12.objetivo, S.num), num(c(ci - 3), f.o12.rte === null ? null : f.o12.rte / 100, S.pct));
  celdas.push(texto(c(ci - 2), f.o12.senal, S[f.o12.senal] ?? S.centro), texto(c(ci - 1), f.o12.origen));
  celdas.push(texto(c(ci), f.informe, S.enlace));
  enlaces.push({ ref: c(ci), destino: f.informe });
  filasXml.push(`<row r="${r}">${celdas.join('')}</row>`);
});
const ultima = letra(COLS.length - 1);
const hoja = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
<sheetPr><pageSetUpPr fitToPage="1"/></sheetPr>
<sheetViews><sheetView workbookViewId="0" tabSelected="1"><pane xSplit="3" ySplit="1" topLeftCell="D2" activePane="bottomRight" state="frozen"/></sheetView></sheetViews>
<sheetFormatPr defaultRowHeight="15"/>
<cols>${COLS.map(([, w], i) => `<col min="${i + 1}" max="${i + 1}" width="${w}" customWidth="1"/>`).join('')}</cols>
<sheetData>${filasXml.join('')}</sheetData>
<autoFilter ref="A1:${ultima}${filas.length + 1}"/>
<hyperlinks>${enlaces.map((e, i) => `<hyperlink ref="${e.ref}" r:id="rId${i + 1}"/>`).join('')}</hyperlinks>
<pageMargins left="0.4" right="0.4" top="0.5" bottom="0.5" header="0.3" footer="0.3"/>
<pageSetup paperSize="9" orientation="landscape" fitToWidth="1" fitToHeight="0"/>
</worksheet>`;
const relsHoja = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${enlaces.map((e, i) => `<Relationship Id="rId${i + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink" Target="${esc(e.destino.split('/').map(encodeURIComponent).join('/'))}" TargetMode="External"/>`).join('')}</Relationships>`;

const criterios = [
  ['Columna', 'Qué mide'],
  ['Iteración', 'Número de análisis de la empresa (mismo ticker), por orden de fecha: 1 es el primero. Cada nuevo análisis en otra fecha va en su propia carpeta y su propia fila, sin pisar los anteriores, para seguir la evolución de la valoración.'],
  ['Convicción según criterios', 'Convicción con los criterios fijos aprobados el 9 oct 2026 (motor/conviccion.mjs). Alta para Comprar: las dos reglas dan Comprar, rentabilidad total ≥ 25 %, asimetría ≥ 2, bajista no peor del −25 % y el precio descuenta al menos 3 puntos menos de crecimiento que el caso base. Alta para Vender: las dos reglas dan Vender, rentabilidad ≤ −20 % (≤ −15 % con la prima del mercado) y el precio pide al menos 5 puntos más de crecimiento que el caso base. Baja: las reglas discrepan o la rentabilidad que decide está a menos de 3 puntos del umbral. Media: el resto. En los informes anteriores al 9 oct la columna «Convicción» se decidió a ojo.'],
  ['Señal', 'Recomendación del informe. Rentabilidad total esperada (RTE) = subida al objetivo + dividendo. Comprar: RTE ≥ 15 % y asimetría ≥ 1 (si solo lo da la regla relativa, además RTE ≥ 5 % con nuestro coste de capital, desde el 9 oct 2026). Vender: RTE ≤ −10 %, o RTE < 0 con asimetría < 0,5. Mantener: el resto. Se aplica con nuestro coste de capital (regla absoluta) y con la prima de riesgo que pide hoy el mercado (regla relativa); manda la relativa salvo que una diga Comprar y la otra Vender, que da Mantener.'],
  ['Precio objetivo 12 m', 'Valor objetivo del informe con nuestro coste de capital (síntesis ponderada de DCF, comparables y demás métodos), en la divisa de las cuentas.'],
  ['Objetivo con la prima del mercado', 'El mismo valor objetivo con el coste de capital que sale de la prima de riesgo implícita del mercado (Damodaran).'],
  ['Comprar por debajo de / Vender por encima de', 'Precios a los que cambiaría la señal, con la regla combinada.'],
  ['Objetivo analistas', 'Precio objetivo medio del consenso de analistas en la fecha del informe.'],
  ...CRITERIOS.map(([c, e]) => [c, e]),
  ['Metodología', 'Nueva: el DCF lleva la prueba de sostenibilidad del crecimiento (puente volumen × precio, cuota implícita y reinversión, con veredicto), en uso desde el 10-oct-2026. Vieja: informe anterior, pendiente de actualizar en rápido (script `notas/actualizacion-vN.mjs`, sin investigación nueva).'],
  ['Objetivo 12 m', 'Método v2 del 12-oct-2026 (verticales/empresa/objetivo-12m.md): PER propio × BPA propio del ejercicio que mirará el mercado en 12 meses, media de bajista, base y alcista. Solo empresas con revisión hecha (verticales/empresa/objetivo12m-revisados.json).'],
  ['Rentabilidad 12 m', 'Objetivo 12 m sobre el precio del informe, más el dividendo. Es la que ordena compras y cartera; la «Rentabilidad total esperada» toma el valor intrínseco del DCF como objetivo.'],
  ['Señal 12 m', 'Con la rentabilidad 12 m: Comprar desde el 15 %, Vender desde el −10 %, Mantener en medio.'],
  ['n.d.', 'El informe no tiene el dato (por ejemplo, sin consenso o sin lista de gobierno).'],
  ['Informe', 'Ruta del PDF (o del Word si no hay PDF) de la última versión de ese análisis, relativa a la raíz del repo.'],
];
const hoja2 = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetFormatPr defaultRowHeight="15"/>
<cols><col min="1" max="1" width="34" customWidth="1"/><col min="2" max="2" width="110" customWidth="1"/></cols>
<sheetData>${criterios.map(([a, b], i) => `<row r="${i + 1}">${texto(`A${i + 1}`, a, i ? S.ajuste : S.cab)}${texto(`B${i + 1}`, b, i ? S.ajuste : S.cab)}</row>`).join('')}</sheetData></worksheet>`;

const estilos = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
<numFmts count="1"><numFmt numFmtId="164" formatCode="+0.0%;-0.0%;0.0%"/></numFmts>
<fonts count="6">
<font><sz val="10"/><name val="Calibri"/></font>
<font><b/><sz val="10"/><color rgb="FFFFFFFF"/><name val="Calibri"/></font>
<font><b/><sz val="12"/><color rgb="FF1E7B34"/><name val="Calibri"/></font>
<font><b/><sz val="12"/><color rgb="FFC00000"/><name val="Calibri"/></font>
<font><b/><sz val="12"/><color rgb="FF7F7F7F"/><name val="Calibri"/></font>
<font><u/><sz val="10"/><color rgb="FF0563C1"/><name val="Calibri"/></font>
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
<cellXfs count="14">
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
</cellXfs>
</styleSheet>`;

const entradas = new Map([
  ['[Content_Types].xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/worksheets/sheet2.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/></Types>`],
  ['_rels/.rels', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>`],
  ['xl/workbook.xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="Seguimiento" sheetId="1" r:id="rId1"/><sheet name="Criterios" sheetId="2" r:id="rId2"/></sheets><definedNames><definedName name="_xlnm._FilterDatabase" localSheetId="0" hidden="1">Seguimiento!$A$1:$${ultima}$${filas.length + 1}</definedName></definedNames></workbook>`],
  ['xl/_rels/workbook.xml.rels', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet2.xml"/><Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`],
  ['xl/worksheets/sheet1.xml', hoja],
  ['xl/worksheets/_rels/sheet1.xml.rels', relsHoja],
  ['xl/worksheets/sheet2.xml', hoja2],
  ['xl/styles.xml', estilos],
]);
writeFileSync(salida, escribirZip(entradas));
console.log(`${salida}: ${filas.length} análisis de ${grupos.size} empresas (${filas.filter((f) => f.senal === 'Comprar').length} Comprar, ${filas.filter((f) => f.senal === 'Mantener').length} Mantener, ${filas.filter((f) => f.senal === 'Vender').length} Vender)`);
for (const f of filas) console.log(`  ${f.empresa.padEnd(20)} ${String(f.senal).padEnd(9)} ${f.criterios.map((v) => v ?? '·').join(' ')}`);
