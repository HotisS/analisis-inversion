// Parte del analista (Betsson AB, corte 2026-10-12). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import { anios, wacc, terminal, etapa2, casos, pesos, sostenibilidad } from './supuestos.mjs';

let T = {};
try { T = await import('./textos.mjs'); } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

const S = T.sostenibilidad_comentarios ?? {};

export default {
  meta: {
    fecha_corte: '2026-10-12', divisa: 'EUR', divisa_cotizacion: 'SEK', tipo_cambio: 0.0895456, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
  },
  _parches: T.parches ?? [],
  huecos_resueltos: T.huecos_resueltos ?? [],
  ...(T.secciones ?? {}),
  resumen: {
    recomendacion: 'Comprar', conviccion: 'Media', justificacion_recomendacion: null, horizonte: '12 meses',
    ...(T.resumen_textos ?? {}),
    confianza: 'Media',
  },
  dcf: {
    anios, wacc, terminal, etapa2: { ...etapa2, justificacion: null }, mitad_de_anio: true,
    justificacion: T.dcf_justificacion ?? null,
    sostenibilidad: {
      puente_ingresos: sostenibilidad.puente_ingresos.map((p) => ({ ...p, comentario: S[p.periodo] ?? null })),
      mercado_final: sostenibilidad.mercado_final,
      veredicto: sostenibilidad.veredicto,
      justificacion: T.sostenibilidad_justificacion ?? null,
    },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: { casos: casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes_comentario ?? 'Betsson tiene un solo segmento operativo (NIIF 8) y no publica el resultado del B2B ni de cada región: no hay base para una suma de partes.', confianza: 'Media' },
  valoracion: {
    puente: T.puente ?? { fecha: '2026-06-30', deuda_financiera: 173.6, arrendamientos: 23.2, caja: 310.0, minoritarios: 59, pensiones: 0, asociadas: 0, otros_ajustes: 118.9 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500, prima implícita de Damodaran (válida para mercados desarrollados)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx, columna «ERP (T12m with sustainable payout)», octubre de 2026 [P2]' },
    pesos,
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  fuentes: T.fuentes ?? [],
  huecos: T.huecos ?? [],
};
