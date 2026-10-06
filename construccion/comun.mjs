// Piezas comunes para construir las plantillas .docx con la librería «docx».
// Cada vertical describe su plantilla como una lista de bloques (ver construir()).

import {
  AlignmentType, BorderStyle, Document, Footer, Header, HeadingLevel, LevelFormat, Packer, PageBreak,
  PageNumber, Paragraph, ShadingType, Table, TableCell, TableRow, TabStopType, TextRun, WidthType,
} from 'docx';

export const COLOR = {
  tinta: '1F2A3C', tinta2: '52514E', tenue: '8A8984', marino: '1F3A5F', acento: '2A78D6',
  fondo: 'F3F2EE', linea: 'D9D8D3', blanco: 'FFFFFF',
};
const FUENTE = 'Calibri';
const ANCHO = 9638; // A4 con márgenes de 2 cm, en DXA

// «Texto con **negrita** y {{marcadores}}» → TextRuns
function trozos(texto, base = {}) {
  return texto.split(/(\*\*[^*]+\*\*)/).filter(Boolean).map((t) =>
    /^\*\*[^*]+\*\*$/.test(t) ? new TextRun({ ...base, text: t.slice(2, -2), bold: true }) : new TextRun({ ...base, text: t }));
}

const sinBordes = {
  top: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' }, bottom: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
  left: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' }, right: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
};
const bordeInferior = { ...sinBordes, bottom: { style: BorderStyle.SINGLE, size: 4, color: COLOR.linea } };

function celda(contenido, { ancho, fondo, alin = AlignmentType.LEFT, negrita = false, color = COLOR.tinta, tam = 17, bordes = bordeInferior, span } = {}) {
  return new TableCell({
    width: { size: ancho, type: WidthType.DXA },
    columnSpan: span,
    borders: bordes,
    shading: fondo ? { type: ShadingType.CLEAR, color: 'auto', fill: fondo } : undefined,
    margins: { top: 50, bottom: 50, left: 80, right: 80 },
    children: [new Paragraph({ alignment: alin, spacing: { before: 0, after: 0 }, children: trozos(contenido, { bold: negrita, color, size: tam, font: FUENTE }) })],
  });
}

// Tabla con fila de cabecera y una fila plantilla que el motor repite.
// columnas: [titulo, campo, filtro?, peso?, alineación?]  — alineación 'd' = derecha
function tabla(ruta, columnas, { numerar = false } = {}) {
  const cols = numerar ? [['#', '#', '', 0.4, 'c'], ...columnas] : columnas;
  const pesos = cols.map((c) => c[3] || 1);
  const suma = pesos.reduce((a, b) => a + b, 0);
  const anchos = pesos.map((p) => Math.floor((ANCHO * p) / suma));
  anchos[anchos.length - 1] += ANCHO - anchos.reduce((a, b) => a + b, 0);
  const alin = (c) => (c[4] === 'd' ? AlignmentType.RIGHT : c[4] === 'c' ? AlignmentType.CENTER : AlignmentType.LEFT);
  const cabecera = new TableRow({
    tableHeader: true, cantSplit: true,
    children: cols.map((c, i) => celda(c[0], { ancho: anchos[i], fondo: COLOR.marino, color: COLOR.blanco, negrita: true, tam: 16, alin: alin(c), bordes: sinBordes })),
  });
  const plantilla = new TableRow({
    cantSplit: true,
    children: cols.map((c, i) => {
      const marcador = c[1] === '#' ? '{{#}}' : `{{${ruta}[]${c[1] ? '.' + c[1] : ''}${c[2] ? '|' + c[2] : ''}}}`;
      return celda(marcador, { ancho: anchos[i], alin: alin(c), tam: 16, negrita: i === (numerar ? 1 : 0) && c[5] !== false });
    }),
  });
  return new Table({ width: { size: ANCHO, type: WidthType.DXA }, columnWidths: anchos, rows: [cabecera, plantilla] });
}

// Rejilla de etiqueta → valor, con «porFila» pares por fila.
function kv(pares, porFila = 2) {
  const anchoPar = Math.floor(ANCHO / porFila);
  const anchoEtq = Math.floor(anchoPar * 0.42), anchoVal = anchoPar - anchoEtq;
  const anchos = [];
  for (let i = 0; i < porFila; i++) anchos.push(anchoEtq, anchoVal);
  anchos[anchos.length - 1] += ANCHO - anchos.reduce((a, b) => a + b, 0);
  const filas = [];
  for (let i = 0; i < pares.length; i += porFila) {
    const celdas = [];
    for (let j = 0; j < porFila; j++) {
      const par = pares[i + j] || ['', ''];
      const rutas = [...String(par[1]).matchAll(/\{\{\s*([\w.[\]]+)\s*(?:\|[^}]*)?\}\}/g)].map((m) => m[1]).filter((r) => !r.startsWith('meta.'));
      const marca = rutas.length ? `{{?${rutas.join(',')}}}` : '';
      celdas.push(celda(marca + par[0], { ancho: anchos[2 * j], fondo: COLOR.fondo, color: COLOR.tinta2, tam: 16 }));
      celdas.push(celda(par[1], { ancho: anchos[2 * j + 1], negrita: true, tam: 17 }));
    }
    filas.push(new TableRow({ cantSplit: true, children: celdas }));
  }
  return new Table({ width: { size: ANCHO, type: WidthType.DXA }, columnWidths: anchos, rows: filas });
}

// Tarjetas de cifras clave para la portada: [[etiqueta, valor], …] (4 por fila).
function tarjetas(pares) {
  const n = 4, ancho = Math.floor(ANCHO / n);
  const anchos = Array(n).fill(ancho); anchos[n - 1] += ANCHO - ancho * n;
  const blanco = { style: BorderStyle.SINGLE, size: 24, color: COLOR.blanco };
  const bordes = { top: blanco, bottom: blanco, left: blanco, right: blanco };
  const filas = [];
  for (let i = 0; i < pares.length; i += n) {
    filas.push(new TableRow({
      cantSplit: true,
      children: anchos.map((a, j) => {
        const par = pares[i + j] || ['', ''];
        return new TableCell({
          width: { size: a, type: WidthType.DXA }, borders: bordes,
          shading: { type: ShadingType.CLEAR, color: 'auto', fill: COLOR.fondo },
          margins: { top: 100, bottom: 100, left: 140, right: 100 },
          children: [
            new Paragraph({ spacing: { after: 20 }, children: [new TextRun({ text: par[0], size: 15, color: COLOR.tinta2, font: FUENTE })] }),
            new Paragraph({ spacing: { after: 0 }, children: [new TextRun({ text: par[1], size: 26, bold: true, color: COLOR.tinta, font: FUENTE })] }),
          ],
        });
      }),
    }));
  }
  return new Table({ width: { size: ANCHO, type: WidthType.DXA }, columnWidths: anchos, rows: filas });
}

const p = (texto, opts = {}) => new Paragraph({ spacing: { after: 100 }, ...opts, children: trozos(texto, opts.run || {}) });
const espacio = (after = 120) => new Paragraph({ spacing: { before: 0, after }, children: [] });

// Traduce la lista de bloques de una vertical a elementos de docx.
const marca = (texto) => new Paragraph({ spacing: { before: 0, after: 0 }, children: [new TextRun({ text: texto, size: 2, color: COLOR.tenue })] });

function bloque(b) {
  const [tipo, a, c, d, e] = b;
  switch (tipo) {
    // Sección condicional: desaparece si todas sus rutas están vacías (y se anota en el anexo).
    case 'seccion': {
      const primera = c.split(',')[0].trim();
      return [marca(`{{si:${c}|${a}|${d}}}`), new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun(a)] }),
        ...(primera.startsWith('calc.') ? [] : [p(`Confianza: {{${primera}.confianza}}`, { style: 'Confianza' })]),
        ...e.flatMap(bloque), marca(`{{fin:${c}}}`)];
    }
    case 'sub': return [marca(`{{si:${c}}}`), new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun(a)] }), ...d.flatMap(bloque), marca(`{{fin:${c}}}`)];
    case 'si': return [marca(`{{si:${a}}}`), ...c.flatMap(bloque), marca(`{{fin:${a}}}`)];
    case 'aviso': return [p(a, { style: 'Aviso' })];
    case 'h1': return [new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun(a)] })];
    case 'h2': return [new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun(a)] })];
    case 'confianza': return [p(`Confianza: {{${a}.confianza}}`, { style: 'Confianza' })];
    case 'texto': return [p(`{{texto:${a}}}`)];
    case 'lista': return [new Paragraph({ numbering: { reference: 'vinetas', level: 0 }, spacing: { after: 60 }, children: [new TextRun(`{{lista:${a}}}`)] })];
    case 'grafico': return [new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 120, after: 160 }, keepNext: false, children: [new TextRun(`{{grafico:${a}}}`)] })];
    case 'tabla': return [tabla(a, c, d || {}), espacio(160)];
    case 'kv': return [kv(a, c || 2), espacio(160)];
    case 'tarjetas': return [tarjetas(a), espacio(200)];
    case 'p': return [p(a, c || {})]; // c: opciones del párrafo, p. ej. { keepNext: true }
    case 'nota': return [p(a, { style: 'Nota' })];
    case 'salto': return [new Paragraph({ children: [new PageBreak()] })];
    case 'parte': return [new Paragraph({ children: [new PageBreak()] }), new Paragraph({ style: 'Parte', children: [new TextRun(a)] })];
    case 'indice': return [
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('Contenido')] }),
      ...a.map((t) => new Paragraph({ numbering: { reference: 'vinetas', level: 0 }, spacing: { after: 40 }, children: trozos(t, { size: 18 }) })),
    ];
    default: throw new Error(`Bloque desconocido: ${tipo}`);
  }
}

export async function construir({ tipo, cabecera, portada, bloques, columnasFuentes }) {
  const hijos = [];
  // Portada
  hijos.push(
    new Paragraph({ spacing: { before: 600, after: 80 }, children: [new TextRun({ text: tipo.toUpperCase(), size: 18, bold: true, color: COLOR.acento, font: FUENTE, characterSpacing: 40 })] }),
    new Paragraph({ style: 'Title', children: [new TextRun(portada.titulo)] }),
    p(portada.subtitulo, { run: { size: 22, color: COLOR.tinta2 }, spacing: { after: 60 } }),
    p('Fecha de corte de los datos: **{{meta.fecha_corte|fecha}}** · Divisa: **{{meta.divisa}}** · Cifras en **{{meta.unidades}}**', { run: { size: 18, color: COLOR.tinta2 }, spacing: { after: 360 } }),
    ...bloque(['tarjetas', portada.tarjetas]),
  );
  for (const b of bloques) hijos.push(...bloque(b));
  // Cierre
  hijos.push(
    new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun('Fuentes')] }),
    tabla('fuentes', columnasFuentes || [['Ref.', 'id', '', 0.5, 'c'], ['Documento', 'titulo', '', 4], ['Editor', 'editor', '', 1.6], ['Fecha', 'fecha', 'fecha', 1.1], ['Enlace', 'url', '', 3.2]]),
    espacio(200),
    new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('Control de calidad del informe')] }),
    p('Campos con dato: **{{_meta.cobertura|pct}}** · Secciones con menos del 60 % de campos cubiertos: **{{_meta.secciones_flojas}}** · Generado el {{_meta.generado|fecha}}.', { style: 'Nota' }),
    p('{{texto:meta.limitaciones}}', { style: 'Nota' }),
    p('Este documento es un análisis elaborado de forma automatizada a partir de fuentes públicas. No constituye una recomendación personalizada de inversión ni una oferta de compra o venta. Las cifras marcadas como estimación y los escenarios son hipótesis de trabajo y deben verificarse antes de tomar cualquier decisión.', { style: 'Nota' }),
  );

  const doc = new Document({
    creator: 'analisis-inversion',
    title: `${tipo} — plantilla`,
    styles: {
      default: { document: { run: { font: FUENTE, size: 20, color: COLOR.tinta }, paragraph: { spacing: { line: 264 } } } },
      paragraphStyles: [
        { id: 'Title', name: 'Title', basedOn: 'Normal', next: 'Normal', run: { size: 52, bold: true, color: COLOR.marino, font: FUENTE }, paragraph: { spacing: { after: 80 } } },
        { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 30, bold: true, color: COLOR.marino, font: FUENTE }, paragraph: { spacing: { before: 360, after: 60 }, keepNext: true, outlineLevel: 0, border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: COLOR.acento, space: 4 } } } },
        { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 23, bold: true, color: COLOR.marino, font: FUENTE }, paragraph: { spacing: { before: 220, after: 80 }, keepNext: true, outlineLevel: 1 } },
        { id: 'Parte', name: 'Parte', basedOn: 'Normal', next: 'Normal', run: { size: 40, bold: true, color: COLOR.acento, font: FUENTE }, paragraph: { spacing: { before: 2400, after: 400 }, keepNext: true, outlineLevel: 0, border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: COLOR.acento, space: 6 } } } },
        { id: 'Aviso', name: 'Aviso', basedOn: 'Normal', next: 'Normal', run: { size: 19, bold: true, color: 'A3470F' }, paragraph: { spacing: { before: 120, after: 200 }, border: { left: { style: BorderStyle.SINGLE, size: 24, color: 'D9772E', space: 8 } }, indent: { left: 200 } } },
        { id: 'Confianza', name: 'Confianza', basedOn: 'Normal', next: 'Normal', run: { size: 16, italics: true, color: COLOR.tenue }, paragraph: { spacing: { before: 0, after: 160 }, keepNext: true } },
        { id: 'Nota', name: 'Nota', basedOn: 'Normal', next: 'Normal', run: { size: 16, color: COLOR.tinta2 }, paragraph: { spacing: { after: 80 } } },
      ],
    },
    numbering: {
      config: [{ reference: 'vinetas', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 360, hanging: 240 } }, run: { color: COLOR.acento } } }] }],
    },
    sections: [{
      properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1134, bottom: 1134, left: 1134, right: 1134, header: 567, footer: 567 } }, titlePage: true },
      headers: {
        default: new Header({ children: [new Paragraph({ tabStops: [{ type: TabStopType.RIGHT, position: ANCHO }], children: [new TextRun({ text: cabecera, size: 16, color: COLOR.tenue }), new TextRun({ text: `\t${tipo}`, size: 16, color: COLOR.tenue })] })] }),
        first: new Header({ children: [new Paragraph({ children: [] })] }),
      },
      footers: {
        default: new Footer({ children: [new Paragraph({ tabStops: [{ type: TabStopType.RIGHT, position: ANCHO }], children: [new TextRun({ text: 'Datos a {{meta.fecha_corte|fecha}} · No constituye recomendación de inversión', size: 15, color: COLOR.tenue }), new TextRun({ children: ['\t', PageNumber.CURRENT, ' / ', PageNumber.TOTAL_PAGES], size: 15, color: COLOR.tenue })] })] }),
        first: new Footer({ children: [new Paragraph({ children: [new TextRun({ text: 'No constituye recomendación de inversión.', size: 15, color: COLOR.tenue })] })] }),
      },
      children: hijos,
    }],
  });
  return Packer.toBuffer(doc);
}
