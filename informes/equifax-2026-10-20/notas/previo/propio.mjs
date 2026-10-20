// Parte del analista (Equifax, corte 2026-10-08). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import { anios, wacc, terminal, etapa2, casos, pesos } from './supuestos.mjs';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const DIR = dirname(fileURLToPath(import.meta.url));
const nota = (l) => JSON.parse(readFileSync(join(DIR, l + '.json'), 'utf8'));
const conLetra = (L, s) => (typeof s === 'string' ? s.replace(/\[(\d+(?:\s*[,–-]\s*\d+)*)\]/g, (m, g) => '[' + g.split(/\s*,\s*/).map((p) => p.split(/\s*[–-]\s*/).map((n) => L + n).join('-')).join(', ') + ']') : s);

// Transacciones: las de D, con el múltiplo de Círculo de Crédito que publicó Equifax (con sinergias) [A18].
const opsD = nota('D').transacciones.operaciones.map((o) => ({ ...o, comentario: conLetra('D', o.comentario) }));
const operaciones = opsD.map((o) => (/Círculo/.test(o.objetivo)
  ? { ...o, ev_ebitda: 9.4, comentario: 'Segundo buró de México, con ingresos un 31 % más altos en los últimos doce meses; 750 M USD de valor empresa, 9,4 veces el EBITDA ajustado de 2026 con las sinergias previstas, cierre previsto en el 4T26 [A18, A21]. El múltiplo no es comparable con los demás porque incluye sinergias.' }
  : o));

let T = {};
try { T = await import('./textos.mjs'); } catch (e) { if (!/Cannot find module|ERR_MODULE_NOT_FOUND/.test(String(e))) throw e; T = {}; }

export default {
  meta: {
    fecha_corte: '2026-10-08', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'US GAAP', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
  },
  _parches: T.parches ?? [],
  huecos_resueltos: T.huecos_resueltos ?? [],
  ...(T.secciones ?? {}),
  financieros: { ltm: { no_recurrentes_en_ebitda: 151.9 }, ...(T.financieros ?? {}) },
  consenso: { base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null, ...(T.consenso ?? {}) },
  transacciones: { operaciones, ...(T.transacciones ?? {}) },
  dcf: {
    anios, wacc, terminal, etapa2: { ...etapa2, justificacion: T.etapa2_justificacion ?? null }, mitad_de_anio: true,
    justificacion: T.dcf_justificacion ?? null,
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: { casos: casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: T.suma_partes ?? null,
  valoracion: {
    pesos,
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  resumen: T.resumen ?? null,
  fuentes: T.fuentes ?? [],
  huecos: T.huecos ?? [],
};
