// Parte del analista (Interparfums SA, corte 2026-10-21). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

export default {
  meta: {
    fecha_corte: '2026-10-21', divisa: 'EUR', divisa_cotizacion: 'EUR', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
    huecos: T.huecos ?? [],
  },
  // D marca «retrasa» hasta las perspectivas de 2027 del 19-nov: no se espera a resultados (regla de cartera); las ventas del 3T ya están en el precio.
  _parches: [{ ruta: 'bolsa.contexto.veredicto', valor: 'no cambia' }, { ruta: 'bolsa.contexto.condicion', valor: null }, { ruta: 'bolsa.contexto.noticias.3.veredicto', valor: 'no cambia' }, { ruta: 'bolsa.contexto.noticias.3.condicion', valor: null }, ...(T.parches ?? [])],
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: un solo negocio (perfumes de prestigio) con las mismas funciones de marketing, compras y distribución para todas las marcas; las ventas por marca no llevan resultado.', confianza: 'Media' },
  valoracion: {
    puente: { fecha: '2026-06-30', deuda_financiera: 118.2, arrendamientos: 10.0, caja: 115.0, minoritarios: 1.4, pensiones: 0, asociadas: 13.6, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout; vale para mercados desarrollados)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D6]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: S.bpa_2028[e], multiplo: null, precio: null, justificacion: T.casos_12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', actual: 23.9, mediana_5a: 26.8, minimo_5a: 18.7, media_larga: 26.2,
        excluidos: T.per_excluidos ?? null,
        v2: { mediana_5a: 26.7, minimo_5a: 16.7, media_larga: 26.3, excluidos: '2020 (covid: PER 72,6x al cierre) y 2021 (auge: 59,0x); historia al cierre = precio de cierre ajustado ÷ beneficio del mismo año entre 87,83 M acciones: 2022 35,1x, 2023 29,4x, 2024 23,9x, 2025 16,7x.' },
      },
      comparables_per: { mediana: 27.0 },
      consenso: { bpa_ano1: 1.28, bpa_ano2: 1.391, objetivo_medio: 30.70, objetivo_min: null, objetivo_max: null, analistas: 9, tendencia_3m: 'subidas', fuente: 'MarketScreener a 21-oct (9 analistas; beneficio 2026e 112,4 M y 2027e 122,2 M ÷ 87,83 M acciones; 2027-2028 aún sin el 3T) [D2, D18]' },
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
  resumen: { ...(T.resumen ?? {}), confianza: 'Media' },
  fuentes: T.fuentes ?? [],
};
