// Parte del analista (Paychex, corte 2026-10-12). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { anios, wacc, terminal, etapa2, casos, pesos } from './supuestos.mjs';

const aqui = path.dirname(fileURLToPath(import.meta.url));
const D = JSON.parse(fs.readFileSync(path.join(aqui, 'D.json'), 'utf8'));

let T = {};
try { T = await import('./textos.mjs'); } catch (e) { if (!/Cannot find module|ERR_MODULE_NOT_FOUND/.test(String(e))) throw e; T = {}; }

// Insperity fuera: margen EBITDA del 1 % (PEO con costes de seguros repercutidos) y salto de 22,8x a 9,7x entre LTM y NTM.
const empresas = (D.comparables?.empresas ?? []).filter((e) => e.ticker !== 'NSP');

export default {
  meta: {
    fecha_corte: '2026-10-12', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 5, etiqueta_ejercicio: 'fin', normas_contables: 'US GAAP', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
  },
  _parches: T.parches ?? [],
  huecos_resueltos: T.huecos_resueltos ?? [],
  ...(T.secciones ?? {}),
  comparables: { ...D.comparables, empresas, criterio: T.comparables_criterio ?? D.comparables?.criterio ?? null, comentario: T.comparables_comentario ?? null },
  dcf: {
    anios, wacc, terminal, etapa2: { ...etapa2, justificacion: T.etapa2_justificacion ?? null }, mitad_de_anio: true,
    justificacion: T.dcf_justificacion ?? null,
    sostenibilidad: T.sostenibilidad ?? null,
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: { casos: casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes_comentario ?? null, confianza: 'Media' },
  valoracion: {
    pesos,
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  rentabilidad: T.rentabilidad ?? null,
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  resumen: T.resumen ?? null,
  fuentes: T.fuentes ?? [],
  huecos: T.huecos ?? [],
};
