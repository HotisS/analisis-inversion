// Parte del analista (SAP, corte 2026-10-21). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import { anios, wacc, terminal, etapa2, casos, pesos, bpa } from './supuestos.mjs';
const PRECIO = 208.65;
const b = Object.fromEntries(casos.map((c) => [c.escenario, bpa(c)]));
const bpaDe = (e, p) => b[e].find((f) => f.periodo === p).bpa;
const r1 = (x) => Math.round(x * 10) / 10;

let T = {};
try { T = await import('./textos.mjs'); } catch (e) { if (!/Cannot find module|ERR_MODULE_NOT_FOUND/.test(String(e))) throw e; T = {}; }

export default {
  meta: {
    fecha_corte: '2026-10-21', divisa: 'EUR', divisa_cotizacion: 'EUR', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
  },
  _parches: T.parches ?? [],
  huecos_resueltos: T.huecos_resueltos ?? [],
  ...(T.secciones ?? {}),
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
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: bpaDe(e, '2028e'), multiplo: null, precio: null, justificacion: T.just12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado',
        actual: r1(PRECIO / bpaDe('Base', '2027e')),
        // Cierre del año ÷ BPA del año siguiente (de actividades continuadas) [A, D]: 2016 24,7; 2017 27,3; 2019 27,7; 2022 31,3; 2024 38,7; 2025 = 208,35 ÷ 7,05 (nuestro 2026e) = 29,6.
        mediana_5a: 31.3, minimo_5a: 29.6, media_larga: 29.9,
        excluidos: 'Adelantado = cierre del año ÷ BPA del año siguiente. Fuera por BPA atípico del año siguiente: 2018 (reestructuración de 2019), 2020 (plusvalías de Qualtrics y Sapphire en 2021), 2021 (pérdidas financieras de 2022) y 2023 (reestructuración de 3.144 M en 2024). Quedan 2022 (31,3x), 2024 (38,7x) y 2025 (29,6x, sobre nuestro BPA de 2026e) en los cinco últimos; la media larga suma 2016 (24,7x), 2017 (27,3x) y 2019 (27,7x). Actual = 208,65 ÷ 8,17 (nuestro BPA de 2027e).',
        v2: { actual: r1(PRECIO / bpaDe('Base', '2027e')), mediana_5a: 39.7, minimo_5a: 34.2, media_larga: 32.4, base: 'cierre' },
      },
      comparables_per: { mediana: 23.3 },
      consenso: { bpa_ano1: 7.03, bpa_ano2: 8.07, objetivo_medio: 215.76, objetivo_min: null, objetivo_max: null, analistas: 28, tendencia_3m: 'estables', fuente: 'MarketScreener e Investing, 21-oct-2026, antes de los resultados del 3T [D35, D36]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
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
