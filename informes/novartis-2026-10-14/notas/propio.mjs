// Parte del analista (Novartis, corte 2026-10-14). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

const PRECIO = 140.93;

export default {
  meta: {
    fecha_corte: '2026-10-14', divisa: 'USD', divisa_cotizacion: 'CHF', tipo_cambio: 1.25, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
    huecos: T.huecos ?? [],
  },
  _parches: [...(T.parches ?? [])],
  huecos_resueltos: T.huecos_resueltos ?? [],
  ...(T.secciones ?? {}),
  dcf: {
    anios: S.anios, wacc: S.wacc, terminal: S.terminal,
    etapa2: { ...S.etapa2, justificacion: null }, mitad_de_anio: true,
    justificacion: T.dcf_justificacion ?? null,
    sostenibilidad: {
      puente_ingresos: S.puente_ingresos.map((p) => ({ ...p, comentario: T.puente_comentarios?.[p.periodo] ?? null })),
      mercado_final: S.mercado_final,
      veredicto: T.veredicto ?? 'Sí',
      justificacion: T.sostenibilidad_justificacion ?? null,
    },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: { casos: S.casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes_comentario ?? null, confianza: 'Media' },
  valoracion: {
    // Deuda neta publicada a 30-jun-2026 (39.400 M USD, tras Avidity), que Novartis calcula con la deuda financiera, los arrendamientos y la caja
    // y valores negociables: se pone entera como deuda y la caja a 0. Pensiones sin dato (hueco).
    puente: { fecha: '2026-06-30', deuda_financiera: 39400, arrendamientos: 0, caja: 0, minoritarios: 100, pensiones: 0, asociadas: 0, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D13]' },
    pesos: { dcf: 50, comparables: 25, transacciones: 0, suma_partes: 0, escenarios: 25 },
    objetivo_12m: {
      ejercicio: '2028e',
      casos: S.casos.map((c) => ({ escenario: c.escenario, metrica: 'PER 2028e (BPA core)', beneficio_por_accion: S.bpa2028[c.escenario], multiplo: null, precio: null, justificacion: T.justif12m?.[c.escenario] ?? null })),
      per_historico: { actual: Math.round((PRECIO / S.bpa2027) * 10) / 10, mediana_5a: 15.5, minimo_5a: 12.5, media_larga: 14.8, excluidos: '2021 excluido: no hay BPA core de operaciones continuadas (sin Sandoz) y el beneficio NIIF lleva la venta del paquete de Roche. Quedan cuatro años (la «mediana de 5 años» es la de esos cuatro), con el BPA core en USD y el cierre de diciembre del ADR ajustado por la escisión: 2022 15,7x (85,85 ÷ 5,48, BPA core continuado derivado del +18 % de 2023), 2023 15,6x (100,97 ÷ 6,47), 2024 12,5x (97,31 ÷ 7,81) y 2025 15,4x (138,72 ÷ 8,98) [D8, A10, A9, A1].' },
      comparables_per: { mediana: 15.5 },
      consenso: { bpa_ano1: 8.74, bpa_ano2: null, objetivo_medio: 160.53, objetivo_min: 119.94, objetivo_max: 188.36, analistas: 27, tendencia_3m: 'recortes', fuente: 'aktien.guide (128,42 CHF de media, 95,95-150,69; × 1,25 USD/CHF) [D4]; BPA core 2026e sumando el 1S26 real y el consenso trimestral de Benzinga [D7]; Deutsche Bank recortó a 120 CHF [D5]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.comentario12m ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  ...(T.otras ?? {}),
  ...(R ? { resumen: R } : {}),
  fuentes: [],
};
