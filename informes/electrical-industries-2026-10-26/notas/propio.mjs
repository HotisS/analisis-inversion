// Parte del analista (Electrical Industries Company, corte 2026-10-26). Citas con la letra de la nota: [A3] = fuente 3 de A.json.
import S from './supuestos.mjs';

let T = {};
try { T = (await import(`./textos.mjs?t=${Date.now()}`)).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

export default {
  meta: {
    fecha_corte: '2026-10-26', divisa: 'SAR', divisa_cotizacion: 'SAR', tipo_cambio: 1, unidades: 'millones',
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: los servicios (110 M SAR, el 5 % de las ventas de 2025) son el posventa de los mismos equipos y comparten clientes y fábricas con la fabricación; Pauwels (Bélgica) no publica cuentas separadas [A1].', confianza: 'Media' },
  valoracion: {
    // Balance a 30-jun-2026 [D16]; pensiones = indemnizaciones por cese de empleados (139,6 M); asociadas = inversiones financieras a valor razonable (21,8 M).
    // Otros ajustes (+113,0 M, deuda equivalente): dividendo del 1S26 pagado el 23-ago-2026 (139,1 M) menos el reembolso de la multa de competencia cobrado el 14-jul-2026 (26,1 M) [A14, C5].
    puente: { fecha: '2026-06-30', deuda_financiera: 122.7, arrendamientos: 19.3, caja: 143.2, minoritarios: 0, pensiones: 139.6, asociadas: 21.8, otros_ajustes: 113.0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, para mercados desarrollados; el riesgo de Arabia Saudí va en la prima adicional)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D8]' },
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
