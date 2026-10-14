// Parte del analista (Partners Group, corte 2026-10-14). Citas con la letra de la nota: [A3] = fuente 3 de A.json.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

export default {
  meta: {
    fecha_corte: '2026-10-14', divisa: 'CHF', divisa_cotizacion: 'CHF', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF (IASB)', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
  },
  _parches: [...(T.parches ?? [])],
  huecos_resueltos: T.huecos_resueltos ?? [],
  financieros: { comentario: T.financieros?.comentario ?? null, ajustes: T.financieros?.ajustes ?? null },
  capital: { comentario: T.capital?.comentario ?? null },
  balance: { otros_pasivos: T.balance?.otros_pasivos ?? null, comentario: T.balance?.comentario ?? null },
  multiplos_historicos: { comentario: T.multiplos_comentario ?? null },
  transacciones: null,
  comparables: null,
  consenso: { guidance: 'Guía de 2026 (1-sep-2026): captación de 26.000-32.000 M USD, con salidas por vencimiento de 10.000-13.000 M; ingresos de gestión en CHF en línea con los activos medios en CHF; comisiones de rendimiento del 20-25 % de los ingresos (antes, la parte baja del 25-40 %), según el calendario de salidas; objetivo a medio plazo del 25-40 % sin cambios; margen EBITDA en torno al 60 % a lo largo del ciclo. La plataforma evergreen restará 1-2 puntos al crecimiento neto de los activos en el 2S26 y algo parecido en 2027 [A1].' },
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
    confianza: 'Baja',
  },
  escenarios: { casos: S.casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Baja' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes_comentario ?? null, confianza: 'Baja' },
  valoracion: {
    // Balance de 31-dic-2025 (agregadores): deuda 2.386 M, caja e inversiones a corto 1.986 M, inversiones propias en los programas 1.146 M.
    // otros_ajustes: dividendo pagado en mayo de 2026 (46 CHF × ≈25,9 M = 1.190 M) menos el beneficio del 1S26 (502 M) = 688 M (estimación propia).
    puente: { fecha: '2025-12-31', deuda_financiera: 2386, arrendamientos: 0, caja: 1986, minoritarios: 0, pensiones: 0, asociadas: 1146, otros_ajustes: 688 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth [P1]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: [
        { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: 46.75, multiplo: null, precio: null, justificacion: T.casos12m?.Bajista ?? null },
        { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: 52.23, multiplo: null, precio: null, justificacion: T.casos12m?.Base ?? null },
        { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: 55.12, multiplo: null, precio: null, justificacion: T.casos12m?.Alcista ?? null },
      ],
      per_historico: { base: 'adelantado', actual: 12.4, mediana_5a: 24.4, minimo_5a: 21.2, media_larga: 24.5, excluidos: 'PER adelantado = precio de cierre del año en la SIX (CHF) ÷ BPA diluido publicado del año siguiente: 2022 21,2x (816,80 ÷ 38,55); 2023 28,2x (1.213,00 ÷ 43,08); 2024 25,4x (1.230,00 ÷ 48,45); 2025 23,4x (982,40 ÷ 41,94, nuestro BPA de 2026e). Excluido 2021 (38,7x: 1.512,50 ÷ 39,09, burbuja de 2021 y BPA de 2022 hundido por el desplome de las comisiones de rendimiento). Sin cierres fiables de 2019-2020. Actual = 594,60 ÷ 47,87 (nuestro BPA de 2027e) [D4, D10, A16].' },
      comparables_per: { mediana: null },
      consenso: { bpa_ano1: 46.41, bpa_ano2: 58.34, objetivo_medio: 856.07, objetivo_min: 680, objetivo_max: 1050, analistas: 14, tendencia_3m: 'recortes', fuente: 'aktien.guide, MarketScreener, AWP vía cash.ch y Webull [D3, D4, D6, D7]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.objetivo12m_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Baja',
  },
  resumen: R,
  rentabilidad: { comentario: T.rentabilidad_comentario ?? null, confianza: 'Baja' },
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  fuentes: [
    { id: 1, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026: 4,20 %', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  ],
  huecos: T.huecos ?? [],
};
