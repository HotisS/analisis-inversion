// Parte del analista (Saint-Gobain, corte 2026-10-20). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = propia.
import { anios, wacc, terminal, etapa2, casos, pesos, bpa, puente_ingresos } from './supuestos.mjs';
import * as T from './textos.mjs';

const b = Object.fromEntries(casos.map((c) => [c.escenario, bpa(c)]));
const bpaAnio = (e, p) => b[e].find((f) => f.periodo === p).bpa;
const PRECIO = 66.42;
const actual = Math.round(PRECIO / bpaAnio('Base', '2027e') * 10) / 10;

export default {
  meta: {
    fecha_corte: '2026-10-20', divisa: 'EUR', divisa_cotizacion: 'EUR', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
  },
  _parches: [
    { ruta: 'bolsa.contexto.comentario', valor: T.contexto_comentario ?? null },
  ],
  huecos_resueltos: [],
  rentabilidad: { comentario: T.rentabilidad_comentario ?? null, confianza: 'Media' },
  multiplos_historicos: { comentario: T.multiplos_comentario ?? null },
  comparables: { comentario: T.comparables_comentario ?? null },
  dcf: {
    anios, wacc, terminal, etapa2: { ...etapa2, justificacion: T.etapa2_justificacion ?? null }, mitad_de_anio: true,
    justificacion: T.dcf_justificacion ?? null,
    sostenibilidad: {
      puente_ingresos: puente_ingresos.map((p) => ({ ...p, comentario: T.puente_comentarios?.[p.periodo] ?? null })),
      mercado_final: null,
      veredicto: T.veredicto ?? 'Sí',
      justificacion: T.sostenibilidad_justificacion ?? null,
    },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: { casos: casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes_comentario ?? null, confianza: 'Media' },
  valoracion: {
    // Puente a 30-jun-2026 [A2]: deuda bruta 14.379 (bonos y préstamos a largo 11.556, parte a corto 2.089, otra deuda a corto 734), arrendamientos 2.891,
    // caja 5.498 + inversiones a corto 253 (deuda neta publicada 11.519 M). Minoritarios: 12 veces su resultado (≈95 M al año; 92 M en 2025) [A1].
    // Pensiones: 1.320 − 328 de excedentes = 992 M, netas de impuestos al 25 % = 744 M [A2]. Asociadas 944 M [A2].
    puente: { fecha: '2026-06-30', deuda_financiera: 14379, arrendamientos: 2891, caja: 5751, minoritarios: 1140, pensiones: 744, asociadas: 944, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth [D14]' },
    pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e (BPA NIIF)', beneficio_por_accion: bpaAnio(e, '2028e'), multiplo: null, precio: null, justificacion: T.just12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', actual, mediana_5a: 11.8, minimo_5a: 8.7, media_larga: 11.5, anios: 5,
        excluidos: T.per_excluidos ?? null,
        v2: { actual, mediana_5a: 13.0, minimo_5a: 7.9, media_larga: 12.8, base: 'cierre' },
      },
      comparables_per: { mediana: 13.35 },
      consenso: { bpa_ano1: 6.54, bpa_ano2: 7.26, objetivo_medio: 95.84, objetivo_min: 65, objetivo_max: 132.6, analistas: 16, tendencia_3m: 'recortes', fuente: 'MarketScreener, 20-oct-2026 (BPA NIIF) [D3]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.objetivo_comentario ?? null,
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
