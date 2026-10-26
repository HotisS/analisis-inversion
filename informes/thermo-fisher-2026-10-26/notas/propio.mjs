// Parte del analista (Thermo Fisher, corte 2026-10-26). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

export default {
  meta: {
    fecha_corte: '2026-10-26', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'US GAAP', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes_comentario ?? null, confianza: 'Baja' },
  valoracion: {
    // Balance del 26-sep-2026 (comunicado del 3T26): deuda 2.262 + 39.108 M (con 213 M de arrendamientos financieros);
    // caja 5.461 + 600 M a corto; minoritarios 128 M reembolsables + ≈7 M; pensiones: déficit de 327 M a dic-2025 neto de
    // impuestos (21 %); otros: 121 M de precio aplazado y 178 M de pagos contingentes de Clario. Arrendamientos operativos
    // fuera (US GAAP).
    puente: { fecha: '2026-09-26', deuda_financiera: 41370, arrendamientos: 0, caja: 6061, minoritarios: 135, pensiones: 258, asociadas: 0, otros_ajustes: 299 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth [P1]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: [
        { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: 27.41, multiplo: null, precio: null, justificacion: T.oj?.Bajista ?? null },
        { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: 29.80, multiplo: null, precio: null, justificacion: T.oj?.Base ?? null },
        { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: 31.34, multiplo: null, precio: null, justificacion: T.oj?.Alcista ?? null },
      ],
      per_historico: {
        base: 'adelantado', actual: 24.66, mediana_5a: 24.28, minimo_5a: 22.75, media_larga: 23.73, anios: 6,
        excluidos: 'Historia ADELANTADA en BPA AJUSTADO, la misma base que los tres casos: precio de cierre de cada año ÷ BPA ajustado real del año siguiente (comunicados del 4T y 10-K) [D16, D17, D18, A15, A16]. 2018: 223,79 / 12,35 = 18,1x; 2021: 667,24 / 23,24 = 28,7x; 2022: 550,69 / 21,55 = 25,6x; 2023: 530,79 / 21,86 = 24,3x; 2024: 520,23 / 22,87 = 22,7x; 2025: 579,45 / 25,23 (nuestro BPA de 2026e) = 23,0x. Excluidos 2019 (16,6x sobre 19,55 USD de 2020) y 2020 (18,5x sobre 25,13 USD de 2021): el BPA del año siguiente estaba inflado por las pruebas de covid. Cinco años limpios 2021-2025: mediana 24,3x y mínimo 22,7x; media larga de seis años 23,7x. Actual = 673,82 ÷ 27,32 (nuestro BPA ajustado de 2027e). El informe del 14-oct usaba una historia adelantada sobre el BPA GAAP (mediana 33,9x) frente a escenarios en BPA ajustado: mezclaba bases.',
        v2: { base: 'cierre', actual: 24.66, mediana_5a: 24.6, minimo_5a: 23.7, media_larga: 24.0 },
      },
      comparables_per: { mediana: 26.04 },
      consenso: { bpa_ano1: 25.26, bpa_ano2: 27.74, objetivo_medio: 750.92, objetivo_min: 560, objetivo_max: 830, analistas: 27, tendencia_3m: 'subidas', fuente: 'Stock Analysis (S&P Global), 23-oct-2026; MarketBeat da 681 USD con 25 analistas [D3, D8]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.objetivo12m_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  resumen: R,
  rentabilidad: { comentario: T.secciones?.rentabilidad?.comentario ?? null, confianza: 'Media' },
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  fuentes: [
    { id: 1, titulo: 'Implied ERP by month (ERPbymonth.xlsx): prima implícita del S&P 500, T12m with sustainable payout, octubre de 2026 (4,20 %).', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
    ...(T.fuentes ?? []),
  ],
  huecos: T.huecos ?? [],
};
