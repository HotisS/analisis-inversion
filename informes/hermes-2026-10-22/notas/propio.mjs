// Parte del analista (Hermès, corte 2026-10-22). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import { anios, wacc, terminal, etapa2, casos, pesos, bpa } from './supuestos.mjs';

const PRECIO = 1356.5;
const r1 = (x) => Math.round(x * 10) / 10;
const b = Object.fromEntries(casos.map((c) => [c.escenario, bpa(c)]));
const bpaDe = (e, p) => b[e].find((f) => f.periodo === p).bpa;

let T = {};
try { T = await import('./textos.mjs'); } catch (e) { if (!/Cannot find module|ERR_MODULE_NOT_FOUND/.test(String(e))) throw e; T = {}; }

export default {
  meta: {
    fecha_corte: '2026-10-22', divisa: 'EUR', divisa_cotizacion: 'EUR', tipo_cambio: 1, unidades: 'millones',
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: Hermès es una sola marca con 16 oficios que comparten tiendas, talleres y clientes, y solo publica resultado por zonas geográficas, no por oficios [A1].', confianza: 'Alta' },
  valoracion: {
    pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: bpaDe(e, '2028e'), multiplo: null, precio: null, justificacion: T.just12m?.[e] ?? null })),
      // Adelantado = cierre del año ÷ BPA real del año siguiente (2021-2024; 2025 no tiene aún BPA de 2026). Cierre: PER al cierre del año, 2022-2025 (2020-2021 fuera por la pandemia), de la revisión del 13-oct.
      per_historico: { base: 'adelantado', actual: r1(PRECIO / bpaDe('Base', '2027e')), mediana_5a: 45.6, minimo_5a: 35.0, media_larga: 45.0, excluidos: '2020',
        v2: { actual: r1(PRECIO / bpaDe('Base', '2027e')), mediana_5a: 46.7, minimo_5a: 45.0, media_larga: 47.6, base: 'cierre' } },
      comparables_per: { mediana: 23.4 },
      consenso: { bpa_ano1: 47.96, bpa_ano2: 52.48, objetivo_medio: 1625.35, objetivo_min: 1168, objetivo_max: 1920, analistas: 23, tendencia_3m: 'recortes', fuente: 'MarketScreener, 22-oct-2026 a primera hora, aún sin revisar por el 3T26 [D2]' },
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
