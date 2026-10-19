// Parte del analista (Wasion, corte 2026-10-19). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import(`./textos.mjs?t=${Date.now()}`)).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

export default {
  meta: {
    fecha_corte: '2026-10-19', divisa: 'CNY', divisa_cotizacion: 'HKD', tipo_cambio: 0.85194, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'HKFRS (Hong Kong, equivalentes a NIIF)', formato_cuenta: 'funcion',
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
  suma_partes: T.suma_partes ?? null,
  valoracion: {
    // Puente a 30-jun-2026. Minoritarios: los de Willfar a mercado (40,45 % × 11.579 M de capitalización el 19-oct) + el resto a
    // valor contable sin los 570 M aportados por inversores de Wayon (cubiertos por las opciones de venta). otros_ajustes = opciones
    // de venta de Wayon (1.436,8 M) + recompras pagadas desde el 30-jun (≈ 153 M CNY, estimación propia).
    puente: { fecha: '2026-06-30', deuda_financiera: 2344.7, arrendamientos: 21.9, caja: 3994.5, minoritarios: 5016, pensiones: 0, asociadas: 134.3, otros_ajustes: 1590 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, válida para mercados desarrollados; el riesgo de China va en la prima adicional)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D6]' },
    pesos: S.pesos,
    objetivo_12m: T.objetivo_12m ?? null,
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  resumen: T.resumen ?? null,
  fuentes: T.fuentes ?? [],
};
