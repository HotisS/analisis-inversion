// Parte del analista (ADP, corte 2026-10-15). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { anios, wacc, terminal, etapa2, casos, pesos } from './supuestos.mjs';

const aqui = path.dirname(fileURLToPath(import.meta.url));
const D = JSON.parse(fs.readFileSync(path.join(aqui, 'D.json'), 'utf8'));

let T = {};
try { T = await import('./textos.mjs'); } catch (e) { if (!/Cannot find module|ERR_MODULE_NOT_FOUND/.test(String(e))) throw e; T = {}; }

// BPA normalizado de FY2028e por escenario (bpa.mjs): ventas × margen − amortización − resultado financiero − impuestos (23 %), ÷ 398,2 M de acciones.
const BPA = { Bajista: 11.79, Base: 13.09, Alcista: 13.96 };

export default {
  meta: {
    fecha_corte: '2026-10-15', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 6, etiqueta_ejercicio: 'fin', normas_contables: 'US GAAP', formato_cuenta: 'funcion',
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
      ejercicio: 'FY2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER FY2028e', beneficio_por_accion: BPA[e], multiplo: null, precio: null, justificacion: T.obj_just?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', actual: 23.09, mediana_5a: 24.15, minimo_5a: 18.45, media_larga: 25.22,
        excluidos: T.per_excluidos ?? null,
        v2: { mediana_5a: 26.77, minimo_5a: 20.14, media_larga: 27.56, excluidos: 'Historia al cierre (precio de cierre de cada ejercicio ÷ BPA del mismo ejercicio; FY2026 con el normalizado de 11,12 USD): FY2020 26,1x, FY2021 32,7x, FY2022 30,0x, FY2023 26,8x, FY2024 26,2x, FY2025 30,9x, FY2026 20,1x. Fuera FY2019 (BPA GAAP de 5,24 USD rebajado por los costes de transformación).' },
      },
      comparables_per: { mediana: 20.35 },
      consenso: { bpa_ano1: 12.24, bpa_ano2: 13.39, objetivo_medio: 286.4, objetivo_min: 225, objetivo_max: 322, analistas: 18, tendencia_3m: 'estables', fuente: 'MarketScreener y Stock Analysis, consenso a 5-15 oct-2026 [D2, D3, D4]' },
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
