// Parte del analista (Roche, corte 2026-10-14). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

export default {
  meta: {
    fecha_corte: '2026-10-14', divisa: 'CHF', divisa_cotizacion: 'CHF', tipo_cambio: 1, unidades: 'millones',
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
    // Deuda y caja de jun-26: deuda financiera 31.805 M (Stock Analysis) y deuda neta de la empresa 22.071 M → caja e inversiones líquidas 9.734 M.
    // Minoritarios a valor de mercado: el 40,1 % de Chugai que no es de Roche (≈11,4 billones de JPY × 40,1 % ≈ 4,6 billones de JPY ≈ 24.000 M CHF a ≈190 JPY/CHF; estimación propia).
    puente: { fecha: '2026-06-30', deuda_financiera: 31805, arrendamientos: 1561, caja: 9734, minoritarios: 24000, pensiones: 0, asociadas: 0, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [P1]' },
    pesos: { dcf: 50, comparables: 30, transacciones: 0, suma_partes: 0, escenarios: 20 },
    objetivo_12m: {
      ejercicio: '2028e',
      casos: S.casos.map((c) => ({ escenario: c.escenario, metrica: 'PER 2028e (BPA core)', beneficio_por_accion: S.bpa2028[c.escenario], multiplo: null, precio: null, justificacion: T.justif12m?.[c.escenario] ?? null })),
      per_historico: { actual: Math.round((334.3 / S.bpa2027) * 10) / 10, mediana_5a: 13.95, minimo_5a: 13.2, media_larga: 14.5, excluidos: 'Ninguno excluido; solo hay precio de cierre de 2022-2025 (cuatro años), de modo que la «mediana de 5 años» es la de esos cuatro: 14,3x (2022), 13,2x (2023), 13,6x (2024) y 16,9x (2025), con el BPA core diluido de cada año [A4, A11, A1] y los cierres de diciembre [D6].' },
      comparables_per: { mediana: 17.2 },
      consenso: { bpa_ano1: 20.33, bpa_ano2: 21.99, objetivo_medio: 367.2, objetivo_min: 232.3, objetivo_max: 449.4, analistas: 24, tendencia_3m: 'estables', fuente: 'Consenso de Roche tras el 1S26 [D4] y Stocksguide, 4-ago-2026 [D5]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.comentario12m ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  ...(T.otras ?? {}),
  ...(R ? { resumen: R } : {}),
  fuentes: [
    { id: 1, titulo: 'Implied ERP by month (ERPbymonth.xlsx): prima implícita del S&P 500 de octubre de 2026, 4,20 % (dato del repo, verticales/empresa/prompt.md)', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  ],
};
