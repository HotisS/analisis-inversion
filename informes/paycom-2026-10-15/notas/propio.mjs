// Parte del analista (Paycom, corte 2026-10-15). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { anios, wacc, terminal, etapa2, casos, pesos } from './supuestos.mjs';

const aqui = path.dirname(fileURLToPath(import.meta.url));
const D = JSON.parse(fs.readFileSync(path.join(aqui, 'D.json'), 'utf8'));

let T = {};
try { T = await import('./textos.mjs'); } catch (e) { if (!/Cannot find module|ERR_MODULE_NOT_FOUND/.test(String(e))) throw e; T = {}; }

// BPA GAAP normalizado de 2028e por escenario (ver bpa.mjs): ventas × margen − amortización − resultado financiero − impuestos (28 %), ÷ 45,5 M de acciones.
const BPA = T.bpa2028 ?? { Bajista: 11.79, Base: 13.52, Alcista: 14.69 };

export default {
  meta: {
    fecha_corte: '2026-10-15', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'US GAAP', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
  },
  _parches: T.parches ?? [],
  huecos_resueltos: T.huecos_resueltos ?? [],
  ...(T.secciones ?? {}),
  comparables: { ...D.comparables, comentario: T.comparables_comentario ?? null },
  dcf: {
    anios, wacc, terminal, etapa2: { ...etapa2, justificacion: null }, mitad_de_anio: true,
    justificacion: T.dcf_justificacion ?? null,
    sostenibilidad: T.sostenibilidad ?? null,
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: { casos: casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes_comentario ?? null, confianza: 'Media' },
  valoracion: {
    pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: BPA[e], multiplo: null, precio: null, justificacion: T.obj_just?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', actual: T.per_actual ?? 19.53, mediana_5a: 28.05, minimo_5a: 14.66, media_larga: 32.63,
        excluidos: T.per_excluidos ?? null,
        v2: { mediana_5a: 32.1, minimo_5a: 20.9, media_larga: 40.3, excluidos: '2021 (123,2x) y 2019-2020 (burbuja de múltiplos); historia al cierre: precio de cierre ÷ BPA normalizado del mismo año.' },
      },
      comparables_per: { mediana: 20.85 },
      consenso: { bpa_ano1: 10.68, bpa_ano2: 12.24, objetivo_medio: 222.59, objetivo_min: 160, objetivo_max: 286, analistas: 21, tendencia_3m: 'subidas', fuente: 'MarketScreener, consenso a 14-oct-2026 [D2, D3]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: T.obj_media ?? null,
      comentario: T.obj_comentario ?? null,
    },
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
