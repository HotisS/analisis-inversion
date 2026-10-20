// Parte del analista (solutions by stc, corte 2026-10-20). Citas con la letra de la nota: [A3] = fuente 3 de A.json.
import S from './supuestos.mjs';

let T = {};
try { T = (await import(`./textos.mjs?t=${Date.now()}`)).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

export default {
  meta: {
    fecha_corte: '2026-10-20', divisa: 'SAR', divisa_cotizacion: 'SAR', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF adoptadas en Arabia Saudí (SOCPA)', formato_cuenta: 'funcion',
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: las tres líneas (infraestructura, servicios gestionados y digital) comparten clientes, contratos y plantilla, y la empresa no publica su resultado por separado; pulse y upsource no publican cuentas propias completas [A1, A2].', confianza: 'Media' },
  valoracion: {
    // Balance a 30-jun-2026 [D12]: préstamos bancarios 762,5 corrientes + 110,6 no corrientes = 873,1 M; arrendamientos ≈ 347 M (ESTIMADO: 416,3 M a
    // dic-25 + ≈ 17 M de altas − 94,7 M de pagos + intereses; el intermedio solo da la parte no corriente, 198,3 M); caja 1.496,5 M + murabahas 70 M;
    // pensiones = indemnizaciones por cese (734,2 M); asociadas = Devoteam Middle East (346,1 M, valor en libros a dic-25 [A1]); minoritarios 42,9 M.
    // Sin dividendo pendiente: el de 2025 se pagó en junio de 2026 [C2].
    puente: { fecha: '2026-06-30', deuda_financiera: 873.1, arrendamientos: 347.0, caja: 1566.5, minoritarios: 42.9, pensiones: 734.2, asociadas: 346.1, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, para mercados desarrollados; el riesgo de Arabia Saudí va en la prima adicional)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D7]' },
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
