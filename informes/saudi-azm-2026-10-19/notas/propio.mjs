// Parte del analista (Saudi Azm, corte 2026-10-19). Citas con la letra de la nota: [A1] = fuente 1 de A.json.
import S from './supuestos.mjs';

let T = {};
try { T = (await import(`./textos.mjs?t=${Date.now()}`)).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

export default {
  meta: {
    fecha_corte: '2026-10-19', divisa: 'SAR', divisa_cotizacion: 'SAR', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 6, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF adoptadas en Arabia Saudí (SOCPA)', formato_cuenta: 'funcion',
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: las cuatro líneas (servicios, tecnología propia, consultoría y plataformas de terceros) comparten clientes, plantilla y subcontratistas, y no hay resultado por línea; Wasl aún no factura de forma relevante [A5].', confianza: 'Media' },
  valoracion: {
    // Balance a 30-jun-2026 [A10] (secundaria): préstamos 5,11 + 1,12 + 3,19 = 9,42 M; arrendamientos 3,11 + 15,49 = 18,60 M; caja
    // 17,92 + fondos 110,38 + sukuk ≈ 18,5 = 146,8 M; indemnizaciones por cese 8,86 M (como pensiones); minoritarios 0,87 M; asociadas
    // e inversiones a valor razonable con cambios en otro resultado ≈ 11,9 M (10,33 + 1,61 a mar-2026 [A5]). Acciones: 60 M (las propias
    // están destinadas al plan de empleados, cuyo coste ya va en el EBIT). Sin restar la recompra propuesta (financia ese mismo plan).
    puente: { fecha: '2026-06-30', deuda_financiera: 9.42, arrendamientos: 18.6, caja: 146.8, minoritarios: 0.87, pensiones: 8.86, asociadas: 11.9, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, para mercados desarrollados; el riesgo de Arabia Saudí y el tamaño van en la prima adicional)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D6]' },
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
