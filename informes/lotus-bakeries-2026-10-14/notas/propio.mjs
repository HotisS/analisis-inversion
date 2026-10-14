// Parte del analista (Lotus Bakeries, corte 2026-10-14). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

export default {
  meta: {
    fecha_corte: '2026-10-14', divisa: 'EUR', divisa_cotizacion: 'EUR', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE', formato_cuenta: 'naturaleza',
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: Biscoff, Natural Foods y Local Heroes comparten fábricas, red comercial y estructura, y la empresa solo publica resultados por región; no hay negocios separables con comparables propios.', confianza: 'Alta' },
  valoracion: {
    puente: { fecha: '2026-06-30', deuda_financiera: 291.0, arrendamientos: 21.2, caja: 196.8, minoritarios: 0, pensiones: 5.8, asociadas: 8.7, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout; vale para mercados desarrollados)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [P2]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: S.bpa12m[e], multiplo: null, precio: null, justificacion: T.casos_12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', actual: 46.2, mediana_5a: 43.9, minimo_5a: 31.4, media_larga: 38.3,
        excluidos: T.per_excluidos ?? null,
        v2: { mediana_5a: 50.1, minimo_5a: 37.0, media_larga: 47.0, excluidos: 'Historia al cierre (cotización de cierre ÷ BPA diluido publicado del mismo año): 2020 36,1x; 2021 50,1x; 2022 49,7x; 2023 51,7x; 2024 57,4x; 2025 37,0x. Ningún año excluido (sin pérdidas ni BPA atípico).' },
      },
      comparables_per: { mediana: 19.0 },
      consenso: { bpa_ano1: 251.9, bpa_ano2: 286.7, objetivo_medio: 12891.08, objetivo_min: 9000, objetivo_max: 15000, analistas: 12, tendencia_3m: 'subidas', fuente: 'MarketScreener, estimaciones y consenso [D2, D3]' },
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
  fuentes: [
    { id: 1, titulo: 'Ficha sectorial «Galletas y snacks de marca» (sectores/galletas-snacks-2026-10-14.md)', editor: 'Elaboración propia', tipo: 'Sectorial', fecha: '2026-10-14', url: 'sectores/galletas-snacks-2026-10-14.md' },
    { id: 2, titulo: 'Implied ERP by month (ERPbymonth.xlsx): 4,20 % en octubre de 2026', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
    { id: 3, titulo: 'Rendimiento del Bund a 10 años: 3,51 % el 14-oct-2026 (serie BBSIS)', editor: 'Deutsche Bundesbank', tipo: 'Primaria', fecha: '2026-10-14', url: 'https://api.statistiken.bundesbank.de/rest/data/BBSIS/D.I.ZST.ZI.EUR.S1311.B.A604.R10XX.R.A.A._Z._Z.A?format=csv' },
  ],
};
