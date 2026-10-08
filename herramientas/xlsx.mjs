// Escritor mínimo de .xlsx (SpreadsheetML a mano, sin dependencias), para las hojas de resumen.
//
//   escribirXlsx('salida.xlsx', [{ nombre, columnas, filas, inmovilizar, filtro }])
//
// columnas: [{ titulo, ancho, tipo }] con tipo 'texto' | 'num' (miles, 2 decimales) | 'entero' | 'mult' (0,0x)
//   | 'pct' (0,0 % con signo; el valor va en tanto por uno) | 'fecha' (AAAA-MM-DD) | 'marca' (✓ = ✗) | 'senal'
//   | 'enlace' (ruta relativa o URL) | 'largo' (texto con ajuste de línea) | 'centro'.
// filas: listas de valores en el orden de las columnas; null deja la celda vacía.
// inmovilizar: columnas fijas a la izquierda (la fila de cabecera siempre se inmoviliza).

import { writeFileSync } from 'node:fs';
import { escribirZip } from '../motor/rellenar.mjs';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const letra = (i) => (i >= 26 ? String.fromCharCode(64 + Math.floor(i / 26)) : '') + String.fromCharCode(65 + (i % 26));
const serie = (iso) => { const t = Date.parse(String(iso).slice(0, 10) + 'T00:00:00Z'); return Number.isNaN(t) ? null : t / 86400000 + 25569; };

// Índices de cellXfs (ver ESTILOS).
const S = { normal: 0, cab: 1, num: 2, pct: 3, '✓': 4, '✗': 5, '=': 6, Comprar: 7, Mantener: 8, Vender: 9, fecha: 10, enlace: 11, largo: 12, centro: 13, mult: 14, entero: 15 };

function celda(ref, v, tipo) {
  const vacia = (s) => `<c r="${ref}" s="${s}"/>`;
  const txt = (s) => (v === null || v === undefined || v === '' ? vacia(s) : `<c r="${ref}" s="${s}" t="inlineStr"><is><t xml:space="preserve">${esc(v)}</t></is></c>`);
  const num = (x, s) => (x === null || x === undefined || !Number.isFinite(+x) ? vacia(s) : `<c r="${ref}" s="${s}"><v>${+x}</v></c>`);
  switch (tipo) {
    case 'cab': return txt(S.cab);
    case 'num': return num(v, S.num);
    case 'entero': return num(v, S.entero);
    case 'mult': return num(v, S.mult);
    case 'pct': return num(v, S.pct);
    case 'fecha': return num(v ? serie(v) : null, S.fecha);
    case 'marca': return txt(v ?? 'n.d.', v && S[v] !== undefined ? S[v] : S.centro);
    case 'senal': return txt(S[v] !== undefined ? S[v] : S.centro);
    case 'enlace': return txt(S.enlace);
    case 'largo': return txt(S.largo);
    case 'centro': return typeof v === 'number' ? num(v, S.centro) : txt(S.centro);
    default: return typeof v === 'number' ? num(v, S.num) : txt(S.normal);
  }
}

function hojaXml({ columnas, filas, inmovilizar = 0, filtro = true }) {
  const enlaces = [];
  const xml = [`<row r="1" ht="45" customHeight="1">${columnas.map((c, i) => celda(`${letra(i)}1`, c.titulo, 'cab')).join('')}</row>`];
  filas.forEach((f, k) => {
    const r = k + 2;
    xml.push(`<row r="${r}">${columnas.map((c, i) => {
      if (c.tipo === 'enlace' && f[i]) enlaces.push({ ref: `${letra(i)}${r}`, destino: String(f[i]) });
      return celda(`${letra(i)}${r}`, f[i], c.tipo);
    }).join('')}</row>`);
  });
  const ultima = `${letra(columnas.length - 1)}${filas.length + 1}`;
  const pane = inmovilizar
    ? `<pane xSplit="${inmovilizar}" ySplit="1" topLeftCell="${letra(inmovilizar)}2" activePane="bottomRight" state="frozen"/>`
    : `<pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/>`;
  const hoja = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
<sheetPr><pageSetUpPr fitToPage="1"/></sheetPr>
<sheetViews><sheetView workbookViewId="0">${pane}</sheetView></sheetViews>
<sheetFormatPr defaultRowHeight="15"/>
<cols>${columnas.map((c, i) => `<col min="${i + 1}" max="${i + 1}" width="${c.ancho || 12}" customWidth="1"/>`).join('')}</cols>
<sheetData>${xml.join('')}</sheetData>
${filtro && filas.length ? `<autoFilter ref="A1:${ultima}"/>` : ''}
${enlaces.length ? `<hyperlinks>${enlaces.map((e, i) => `<hyperlink ref="${e.ref}" r:id="rId${i + 1}"/>`).join('')}</hyperlinks>` : ''}
<pageMargins left="0.4" right="0.4" top="0.5" bottom="0.5" header="0.3" footer="0.3"/>
<pageSetup paperSize="9" orientation="landscape" fitToWidth="1" fitToHeight="0"/>
</worksheet>`;
  const destino = (d) => (/^https?:/.test(d) ? esc(d) : esc(d.split('/').map(encodeURIComponent).join('/')));
  const rels = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${enlaces.map((e, i) => `<Relationship Id="rId${i + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink" Target="${destino(e.destino)}" TargetMode="External"/>`).join('')}</Relationships>`;
  return { hoja, rels: enlaces.length ? rels : null, ultima };
}

const ESTILOS = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
<numFmts count="2"><numFmt numFmtId="164" formatCode="+0.0%;-0.0%;0.0%"/><numFmt numFmtId="165" formatCode="0.0&quot;x&quot;"/></numFmts>
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
<xf numFmtId="165" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/>
<xf numFmtId="3" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/>
</cellXfs>
</styleSheet>`;

export function escribirXlsx(salida, hojas) {
  const partes = hojas.map(hojaXml);
  const tipos = hojas.map((_, i) => `<Override PartName="/xl/worksheets/sheet${i + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`).join('');
  const nombre = (h) => esc(String(h.nombre).slice(0, 31));
  const entradas = new Map([
    ['[Content_Types].xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>${tipos}<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/></Types>`],
    ['_rels/.rels', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>`],
    ['xl/workbook.xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets>${hojas.map((h, i) => `<sheet name="${nombre(h)}" sheetId="${i + 1}" r:id="rId${i + 1}"/>`).join('')}</sheets><definedNames>${hojas.map((h, i) => (h.filtro !== false && h.filas.length ? `<definedName name="_xlnm._FilterDatabase" localSheetId="${i}" hidden="1">'${nombre(h)}'!$A$1:$${partes[i].ultima.replace(/(\d+)$/, '$$$1')}</definedName>` : '')).join('')}</definedNames></workbook>`],
    ['xl/_rels/workbook.xml.rels', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${hojas.map((_, i) => `<Relationship Id="rId${i + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${i + 1}.xml"/>`).join('')}<Relationship Id="rId${hojas.length + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`],
    ['xl/styles.xml', ESTILOS],
  ]);
  partes.forEach((p, i) => {
    entradas.set(`xl/worksheets/sheet${i + 1}.xml`, p.hoja);
    if (p.rels) entradas.set(`xl/worksheets/_rels/sheet${i + 1}.xml.rels`, p.rels);
  });
  writeFileSync(salida, escribirZip(entradas));
}
