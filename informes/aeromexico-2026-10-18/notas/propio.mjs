// Parte del analista (Grupo Aeroméxico, corte 2026-10-18). Citas con la letra de la nota: [A4] = fuente 4 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

export default {
  meta: {
    fecha_corte: '2026-10-18', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF (IASB)', formato_cuenta: 'naturaleza',
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
      veredicto: T.veredicto ?? 'En parte',
      justificacion: T.sostenibilidad_justificacion ?? null,
    },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: { casos: S.casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: carga, fidelización y mantenimiento dependen de la red de pasaje y la empresa no publica su resultado por separado.', confianza: 'Media' },
  valoracion: {
    puente: { fecha: '2026-06-30', deuda_financiera: 1082.0, arrendamientos: 2987.0, caja: 1037.0, minoritarios: 2.1, pensiones: 191.9, asociadas: 0, otros_ajustes: 331.6 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran); el riesgo país de México va aparte como prima adicional', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D17]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: [
        { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: S.bpa_2028.Bajista, multiplo: null, precio: null, justificacion: T.casos_12m?.Bajista ?? null },
        { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: S.bpa_2028.Base, multiplo: null, precio: null, justificacion: T.casos_12m?.Base ?? null },
        { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: S.bpa_2028.Alcista, multiplo: null, precio: null, justificacion: T.casos_12m?.Alcista ?? null },
      ],
      per_historico: {
        base: 'adelantado', actual: 7.10, mediana_5a: null, minimo_5a: null, media_larga: null, anios: 0,
        excluidos: 'Sin historia adelantada útil: el ADS cotiza desde el 6-nov-2025 y la acción de la BMV anterior al Chapter 11 (2020-2022) es de otra estructura de capital (la reorganización diluyó casi por completo a los antiguos accionistas). El único cierre, el de 2025 (21,96 USD), da 21,7 veces nuestro BPA de 2026e (1,01), un año hundido por el queroseno de la guerra de Oriente Medio: fuera por atípico. Actual = 15,98 ÷ nuestro BPA 2027e de 2,25 = 7,1 veces.',
        v2: { mediana_5a: null, minimo_5a: null, media_larga: null, excluidos: 'Al cierre (precio ÷ BPA del mismo año): solo 2025, 21,96 ÷ 2,41 = 9,1 veces, un dato con el ADS cotizando siete semanas; insuficiente para una mediana. Antes de 2022 la acción de la BMV no es comparable (Chapter 11).' },
      },
      comparables_per: { mediana: 9.8 },
      consenso: { bpa_ano1: 1.62, bpa_ano2: 2.34, objetivo_medio: 28.06, objetivo_min: 20, objetivo_max: 36, analistas: 11, tendencia_3m: 'recortes', fuente: 'MarketBeat y MarketScreener, 18-oct-2026 [D2, D3]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: T.media_12m ?? null,
      comentario: T.objetivo_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  resumen: { ...(T.resumen ?? {}), confianza: 'Media' },
  sentimiento: null,
  fuentes: T.fuentes ?? [],
};
