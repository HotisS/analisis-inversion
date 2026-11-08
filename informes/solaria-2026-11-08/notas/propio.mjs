// Parte del analista (Solaria, corte 2026-11-08). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { anios, wacc, terminal, etapa2, casos, pesos, bpa } from './supuestos.mjs';

const aqui = dirname(fileURLToPath(import.meta.url));
const D = JSON.parse(readFileSync(join(aqui, 'D.json'), 'utf8'));

const PRECIO = 16.15;
const r1 = (x) => Math.round(x * 10) / 10;
const b = Object.fromEntries(casos.map((c) => [c.escenario, bpa(c)]));
const bpaDe = (e, p) => b[e].find((f) => f.periodo === p).bpa;

// Historia del PER ADELANTADA (v3) en base AJUSTADA: cierre de cada año ÷ BPA real del año siguiente.
// Cierres de Yahoo [D1]. BPA publicado de las cuentas [A1-A5], sin plusvalías ni reversiones: 2024 = (88,6 − 28,9 × 0,75) ÷ 124,95 = 0,54;
// 2025 = (137,4 − 54,6 × 0,75) ÷ 124,95 = 0,77; 2026 = nuestro BPA base sin rotaciones. 2020 fuera (burbuja renovable: 62 veces).
const cierres = { 2020: 23.64, 2021: 17.12, 2022: 17.12, 2023: 18.61, 2024: 7.82, 2025: 18.15 };
const bpaReal = { 2020: 0.24, 2021: 0.38, 2022: 0.72, 2023: 0.86, 2024: 0.54, 2025: 0.77, 2026: bpaDe('Base', '2026e') };
const AN = [2021, 2022, 2023, 2024, 2025];
const adel = AN.map((y) => ({ y, per: r1(cierres[y] / bpaReal[y + 1]) }));
const alCierre = AN.map((y) => ({ y, per: r1(cierres[y] / bpaReal[y]) }));
const mediana = (xs) => { const s = [...xs].sort((a, c) => a - c); const n = s.length; return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2; };
const media = (xs) => r1(xs.reduce((a, c) => a + c, 0) / xs.length);
export const historia = { adel, alCierre, per2020: r1(cierres[2020] / bpaReal[2021]) };

let T = {};
try { T = await import('./textos.mjs'); } catch (e) { if (!/Cannot find module|ERR_MODULE_NOT_FOUND/.test(String(e))) throw e; T = {}; }

const comps = D.comparables.empresas;

export default {
  meta: {
    fecha_corte: '2026-11-08', divisa: 'EUR', divisa_cotizacion: 'EUR', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE', formato_cuenta: 'naturaleza',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
  },
  _parches: T.parches ?? [],
  huecos_resueltos: T.huecos_resueltos ?? [],
  ...(T.secciones ?? {}),
  transacciones: { comentario: T.transacciones_comentario ?? null },
  comparables: { ...D.comparables, empresas: comps, criterio: T.comparables_criterio ?? D.comparables.criterio, comentario: T.comparables_comentario ?? D.comparables.comentario },
  dcf: {
    anios, wacc, terminal, etapa2: { ...etapa2, justificacion: T.etapa2_justificacion ?? null }, mitad_de_anio: true,
    justificacion: T.dcf_justificacion ?? null,
    sostenibilidad: T.sostenibilidad ?? null,
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: { casos: casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: T.suma_partes ?? { aplica: false, descuento_holding_pct: 0, partes: [], comentario: null, confianza: 'Media' },
  valoracion: {
    puente: D.valoracion.puente,
    rab: null,
    referencia_mercado: D.valoracion.referencia_mercado,
    pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      base_bpa: 'ajustado',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: bpaDe(e, '2028e'), multiplo: null, precio: null, justificacion: T.just12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', base_bpa: 'ajustado',
        actual: r1(PRECIO / bpaDe('Base', '2027e')),
        mediana_5a: mediana(adel.map((x) => x.per)), minimo_5a: Math.min(...adel.map((x) => x.per)), media_larga: media(adel.map((x) => x.per)),
        excluidos: T.excluidos ?? null,
        v2: { actual: r1(PRECIO / bpaDe('Base', '2027e')), mediana_5a: mediana(alCierre.map((x) => x.per)), minimo_5a: Math.min(...alCierre.map((x) => x.per)), media_larga: media(alCierre.map((x) => x.per)), base: 'cierre' },
      },
      comparables_per: { mediana: mediana(comps.map((c) => c.per_ntm).filter((x) => x != null)) },
      consenso: { bpa_ano1: 1.74, bpa_ano2: 1.95, objetivo_medio: 22.39, objetivo_min: 14.0, objetivo_max: 28.0, analistas: 16, tendencia_3m: 'estables', fuente: 'MarketScreener (BPA, 24/25-sep-2026) y Yahoo Finance (objetivos y recomendaciones, 8-nov-2026) [D2, D10, D11]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      comentario: T.objetivo12m_comentario ?? null,
    },
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
