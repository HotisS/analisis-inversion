// Parte del analista (Sanofi, corte 2026-10-14). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

export default {
  meta: {
    fecha_corte: '2026-10-14', divisa: 'EUR', divisa_cotizacion: 'EUR', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE', formato_cuenta: 'funcion',
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes_comentario ?? null, confianza: 'Media' },
  valoracion: {
    // Deuda neta de 30-jun-2026 (15.513 M) [A8]; caja no desglosada (en deuda neta). Pago inicial a Regeneron de 1.000 M USD
    // (1-oct-2026) ≈ 892 M EUR a 1,1206 USD/EUR en otros_ajustes. Opella (48,2 %) sin valor en el puente: no hay valor contable legible.
    puente: { fecha: '2026-06-30', deuda_financiera: 15513, arrendamientos: 0, caja: 0, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 892 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [P1]' },
    pesos: { dcf: 60, comparables: 10, transacciones: 0, suma_partes: 0, escenarios: 30 },
    objetivo_12m: {
      ejercicio: '2028e',
      casos: S.casos.map((c) => ({ escenario: c.escenario, metrica: 'PER 2028e (BPA business)', beneficio_por_accion: S.bpa2028[c.escenario], multiplo: null, precio: null, justificacion: T.justif12m?.[c.escenario] ?? null })),
      per_historico: { actual: Math.round((73.10 / S.bpa2027) * 10) / 10, mediana_5a: 11.1, minimo_5a: 10.6, media_larga: 11.5, excluidos: 'Ninguno excluido; solo hay precio de cierre de 2023-2025, así que la «mediana de 5 años» es la de tres años: 11,1x (2023: 89,76 ÷ 8,11, BPA business publicado entonces, con Opella), 12,9x (2024: 91,50 ÷ 7,12) y 10,6x (2025: 82,72 ÷ 7,83) [D2, A2, A4]. Falta el cierre de 2022.' },
      comparables_per: { mediana: 17.2 },
      consenso: { bpa_ano1: 8.58, bpa_ano2: null, objetivo_medio: 90.0, objetivo_min: 78.0, objetivo_max: 100.0, analistas: 24, tendencia_3m: 'recortes', fuente: 'Idéal Investisseur, 15-sep-2026 y 20-jul-2026 [D3, D8]' },
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
