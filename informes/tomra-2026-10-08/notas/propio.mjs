// Parte del analista (Tomra, corte 2026-10-08). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import { anios, wacc, terminal, etapa2, casos, pesos } from './supuestos.mjs';

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const DIR = dirname(fileURLToPath(import.meta.url));
const nota = (l) => JSON.parse(readFileSync(join(DIR, l + '.json'), 'utf8'));
// Segmentos: cifras de A (historia 2023-2025) con la descripción de B. Las citas de cada texto apuntan a su nota de origen.
const segA = nota('A').negocio.segmentos, segB = nota('B').negocio.segmentos;
const segmentos = segA.map((s) => {
  const b = segB.find((x) => x.nombre === s.nombre);
  const desc = b ? b.descripcion.replace(/\[(\d+(?:, ?\d+)*)\]/g, (m, g) => '[' + g.split(/, ?/).map((n) => 'B' + n).join(', ') + ']') : s.descripcion;
  if (/Group Functions/.test(s.nombre)) return { ...s, nombre: 'Funciones de grupo y eliminaciones', historico: s.historico.map((h) => ({ ...h, ingresos: 0 })) };
  return { ...s, descripcion: desc };
});
let T = {};
try { T = await import('./textos.mjs'); } catch { T = {}; }

export default {
  meta: {
    fecha_corte: '2026-10-08', divisa: 'EUR', divisa_cotizacion: 'NOK', tipo_cambio: 0.093353, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
  },
  _parches: T.parches ?? [],
  huecos_resueltos: T.huecos_resueltos ?? [],
  ...(T.secciones ?? {}),
  negocio: { segmentos },
  dcf: {
    anios, wacc, terminal, etapa2: { ...etapa2, justificacion: T.etapa2_justificacion ?? null }, mitad_de_anio: true,
    justificacion: T.dcf_justificacion ?? null,
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: { casos: casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: T.suma_partes ?? { aplica: false, descuento_holding_pct: 0, partes: [], comentario: null, confianza: 'Media' },
  valoracion: {
    puente: { fecha: '2026-06-30', deuda_financiera: 560, arrendamientos: 149, caja: 69, minoritarios: 40, pensiones: 3.6, asociadas: 10.9, otros_ajustes: 36 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500, prima implícita de Damodaran (válida para mercados desarrollados)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx, columna «ERP (T12m with sustainable payout)», fila de octubre de 2026 [P1]' },
    pesos,
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  resumen: T.resumen ?? null,
  fuentes: [
    { id: 1, titulo: 'Implied ERP by month (ERPbymonth.xlsx), fila de octubre de 2026', editor: 'Aswath Damodaran, NYU Stern', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
    { id: 2, titulo: 'Financial calendar (3T26 el 23-oct-2026, Capital Markets Day el 24-nov-2026, 4T26 el 12-feb-2027)', editor: 'TOMRA Systems ASA', tipo: 'Primaria', fecha: '2026-10-08', url: 'https://www.tomra.com/investor-relations/financial-calendar' },
    ...(T.fuentes ?? []),
  ],
  huecos: T.huecos ?? [],
};
