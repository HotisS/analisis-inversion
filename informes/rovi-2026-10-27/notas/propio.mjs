// Parte del analista (Rovi, corte 2026-10-27). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { anios, wacc, terminal, etapa2, casos, pesos, bpa } from './supuestos.mjs';

const aqui = dirname(fileURLToPath(import.meta.url));
const D = JSON.parse(readFileSync(join(aqui, 'D.json'), 'utf8'));

const PRECIO = 61.4;
const r1 = (x) => Math.round(x * 10) / 10;
const b = Object.fromEntries(casos.map((c) => [c.escenario, bpa(c)]));
const bpaDe = (e, p) => b[e].find((f) => f.periodo === p).bpa;

// Historia del PER. Adelantada (v3): cierre de cada año ÷ BPA real del año siguiente; 2025 ÷ nuestro BPA de 2026e sin el badwill.
// Cierres de Yahoo [D]; BPA publicado de la cuenta [A] (sin no recurrentes materiales en 2021-2025: base ajustada = publicada).
const cierres = { 2019: 24.4, 2020: 37.9, 2021: 73.8, 2022: 36.06, 2023: 60.2, 2024: 62.95, 2025: 63.5 };
const bpaReal = { 2020: 1.10, 2021: 2.76, 2022: 3.73, 2023: 3.20, 2024: 2.67, 2025: 2.75, 2026: bpaDe('Base', '2026e') };
const adel = [2020, 2021, 2022, 2023, 2024, 2025].map((y) => ({ y, per: r1(cierres[y] / bpaReal[y + 1]) }));
const alCierre = [2020, 2021, 2022, 2023, 2024, 2025].map((y) => ({ y, per: r1(cierres[y] / bpaReal[y]) }));
const mediana = (xs) => { const s = [...xs].sort((a, c) => a - c); const n = s.length; return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2; };
const ult5 = (h) => h.slice(-5).map((x) => x.per);
const media = (xs) => r1(xs.reduce((a, c) => a + c, 0) / xs.length);
export const historia = { adel, alCierre };

let T = {};
try { T = await import('./textos.mjs'); } catch (e) { if (!/Cannot find module|ERR_MODULE_NOT_FOUND/.test(String(e))) throw e; T = {}; }

// Comparables: los nueve de D sin Camurus (EV/EBITDA 43,5x y PER 31,1x: empresa de tecnología de liberación prolongada en plena subida de ventas, no comparable en múltiplo).
const comps = D.comparables.empresas.filter((c) => c.ticker !== 'CAMX.ST');

export default {
  meta: {
    fecha_corte: '2026-10-27', divisa: 'EUR', divisa_cotizacion: 'EUR', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE', formato_cuenta: 'naturaleza',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
  },
  _parches: T.parches ?? [],
  huecos_resueltos: T.huecos_resueltos ?? [],
  ...(T.secciones ?? {}),
  comparables: { ...D.comparables, empresas: comps, criterio: T.comparables_criterio ?? null, comentario: T.comparables_comentario ?? null },
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
    referencia_mercado: { mercado: 'S&P 500 (Damodaran; vale para mercados desarrollados)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx, octubre de 2026 [P1]' },
    pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      base_bpa: 'ajustado',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: bpaDe(e, '2028e'), multiplo: null, precio: null, justificacion: T.just12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', base_bpa: 'ajustado',
        actual: r1(PRECIO / bpaDe('Base', '2027e')),
        mediana_5a: mediana(ult5(adel)), minimo_5a: Math.min(...ult5(adel)), media_larga: media(adel.map((x) => x.per)),
        excluidos: T.excluidos ?? null,
        v2: { actual: r1(PRECIO / bpaDe('Base', '2027e')), mediana_5a: mediana(ult5(alCierre)), minimo_5a: Math.min(...ult5(alCierre)), media_larga: media(alCierre.map((x) => x.per)), base: 'cierre' },
      },
      comparables_per: { mediana: mediana(comps.map((c) => c.per_ntm).filter((x) => x != null)) },
      consenso: { bpa_ano1: 2.96, bpa_ano2: 3.37, objetivo_medio: 73.69, objetivo_min: 64.2, objetivo_max: 83.0, analistas: 9, tendencia_3m: 'estables', fuente: 'Yahoo Finance (objetivos, 27-oct-2026) y MarketScreener (BPA, 25-sep-2026) [D]' },
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
