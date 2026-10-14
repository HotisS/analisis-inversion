// Parte del analista (CPKC, corte 2026-10-14). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S, { BPA } from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

const casos12 = ['Bajista', 'Base', 'Alcista'].map((esc) => ({
  escenario: esc, metrica: 'PER 2028e', beneficio_por_accion: BPA[esc]['2028e'].bpa, multiplo: null, precio: null,
  justificacion: T.just12?.[esc] ?? null,
}));

export default {
  meta: {
    fecha_corte: '2026-10-14', divisa: 'CAD', divisa_cotizacion: 'CAD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'US GAAP', formato_cuenta: 'naturaleza',
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
    confianza: 'Alta',
  },
  escenarios: { casos: S.casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: un solo segmento (ferrocarril) con la misma red, plantilla y clientes en los tres países; la empresa no da resultados por país ni por línea de negocio.', confianza: 'Alta' },
  valoracion: {
    puente: { fecha: '2026-06-30', deuda_financiera: 25147, arrendamientos: 0, caja: 366, minoritarios: 981, pensiones: 0, asociadas: 522, otros_ajustes: 360 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout; vale para mercados desarrollados)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D12]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: casos12,
      per_historico: {
        base: 'adelantado', actual: 23.6, mediana_5a: 25.3, minimo_5a: 21.5, media_larga: 22.8,
        excluidos: T.per_excluidos ?? null,
        v2: { mediana_5a: 26.2, minimo_5a: 23.5, media_larga: 24.1, excluidos: 'Ninguno. Historia al cierre: precio de cierre ÷ BPA normalizado del mismo año (2021 24,2; 2022 28,0; 2023 29,1; 2024 26,2; 2025 23,5; media de 8 años con 2018-2020: 24,1).' },
      },
      comparables_per: { mediana: 20.7 },
      consenso: { bpa_ano1: 5.79, bpa_ano2: 6.47, objetivo_medio: 139.74, objetivo_min: 104.0, objetivo_max: 156.0, analistas: 30, tendencia_3m: 'subidas', fuente: 'MarketScreener, 14-oct-2026 (BPA 2027e y 2028e, base cercana al core); RBC 146, BMO 142, CIBC 140 [D2, D3, D14]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.objetivo_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Alta',
  },
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  resumen: { ...(T.resumen ?? {}), confianza: 'Alta' },
  fuentes: T.fuentes ?? [],
};
