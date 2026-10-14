// Parte del analista (Hershey, corte 2026-10-14). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

export default {
  meta: {
    fecha_corte: '2026-10-14', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'US GAAP', formato_cuenta: 'funcion',
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: la confitería de Norteamérica da el 91 % del resultado de los segmentos y los snacks salados (9 %) no cambian el valor lo bastante para justificar una valoración por partes con comparables propios.', confianza: 'Alta' },
  valoracion: {
    puente: { fecha: '2026-06-28', deuda_financiera: 5610.7, arrendamientos: 0, caja: 791.2, minoritarios: 0, pensiones: 66, asociadas: 0, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [P2]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: S.bpa12m[e], multiplo: null, precio: null, justificacion: T.casos_12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', actual: 17.6, mediana_5a: 21.5, minimo_5a: 19.9, media_larga: 21.6,
        excluidos: T.per_excluidos ?? null,
        v2: { mediana_5a: 24.2, minimo_5a: 18.1, media_larga: 23.2, excluidos: 'Historia al cierre con el BPA ajustado (cierre ÷ BPA ajustado del mismo año): 2017 24,2x (BPA 2017 de 4,69 USD derivado del +14,3 % de 2018); 2018 20,0x; 2019 25,4x; 2020 24,2x; 2021 26,9x; 2022 27,2x; 2023 19,4x; 2024 18,1x. Fuera 2025 (28,8x sobre un BPA de 6,31 USD hundido por el cacao récord).' },
      },
      comparables_per: { mediana: 19.0 },
      consenso: { bpa_ano1: 8.48, bpa_ano2: 9.85, objetivo_medio: 201.05, objetivo_min: 170, objetivo_max: 250, analistas: 23, tendencia_3m: 'estables', fuente: 'Stock Analysis (S&P Global) [D2]' },
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
    { id: 1, titulo: '10-Year Treasury Constant Maturity Rate (DGS10): 5,21 % el 13-oct-2026', editor: 'FRED, Reserva Federal de San Luis', tipo: 'Primaria', fecha: '2026-10-13', url: 'https://fred.stlouisfed.org/series/DGS10' },
    { id: 2, titulo: 'Implied ERP by month (ERPbymonth.xlsx): 4,20 % en octubre de 2026', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
    { id: 3, titulo: 'Betas by sector (US): Food Processing', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-01', url: 'https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/Betas.html' },
    { id: 4, titulo: 'Informe value de Lindt & Sprüngli del 14-oct-2026 (comparación directa)', editor: 'Elaboración propia (repositorio)', tipo: 'Analistas', fecha: '2026-10-14', url: 'informes/lindt-2026-10-14/' },
  ],
};
