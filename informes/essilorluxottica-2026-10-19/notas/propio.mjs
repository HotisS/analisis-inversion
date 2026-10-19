// Parte del analista (EssilorLuxottica, corte 2026-10-19). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = propia.
import { anios, wacc, terminal, etapa2, casos, pesos, bpa, puente_ingresos } from './supuestos.mjs';
import * as T from './textos.mjs';

const b = Object.fromEntries(casos.map((c) => [c.escenario, bpa(c)]));
const bpaAnio = (e, p) => b[e].find((f) => f.periodo === p).bpa;
const PRECIO = 152.05;
const actual = Math.round(PRECIO / bpaAnio('Base', '2027e') * 10) / 10;

export default {
  meta: {
    fecha_corte: '2026-10-19', divisa: 'EUR', divisa_cotizacion: 'EUR', tipo_cambio: 1, unidades: 'millones',
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
    // Puente a 30-jun-2026 [A2]: deuda 11.409, arrendamientos 3.907, caja 1.931 (deuda neta publicada 13.385 M).
    // Minoritarios: 12 veces su resultado (≈150 M al año con Top Charoen; 128 M en 2025 y 86 M ajustados en el 1S26) [A1, A2]. Pensiones 445 y asociadas 88 (dic-25) [A3].
    puente: { fecha: '2026-06-30', deuda_financiera: 11409, arrendamientos: 3907, caja: 1931, minoritarios: 1800, pensiones: 445, asociadas: 88, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth [D34]' },
    pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e (BPA ajustado)', beneficio_por_accion: bpaAnio(e, '2028e'), multiplo: null, precio: null, justificacion: T.just12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', actual, mediana_5a: 28.5, minimo_5a: 25.3, media_larga: 30.3, anios: 5,
        excluidos: T.per_excluidos ?? null,
        v2: { actual, mediana_5a: 30.9, minimo_5a: 25.8, media_larga: 31.9, base: 'cierre' },
      },
      comparables_per: { mediana: 20.45 },
      consenso: { bpa_ano1: 7.92, bpa_ano2: 8.86, objetivo_medio: 221.43, objetivo_min: 135, objetivo_max: 361, analistas: 23, tendencia_3m: 'recortes', fuente: 'MarketScreener, 19-oct-2026 (BPA NIIF de 6,23 y 7,09 pasado a ajustado sumando 647 M de amortización de compras neta, estimación propia) [D4]' },
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
