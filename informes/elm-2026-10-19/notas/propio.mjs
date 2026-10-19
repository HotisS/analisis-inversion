// Parte del analista (Elm Company, corte 2026-10-19). Citas con la letra de la nota: [A3] = fuente 3 de A.json.
import S from './supuestos.mjs';

let T = {};
try { T = (await import(`./textos.mjs?t=${Date.now()}`)).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

export default {
  meta: {
    fecha_corte: '2026-10-19', divisa: 'SAR', divisa_cotizacion: 'SAR', tipo_cambio: 1, unidades: 'millones',
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: los tres segmentos (productos digitales, externalización y servicios profesionales) comparten clientes públicos, plataformas y contratos; Thiqah se integra en productos digitales y externalización y no publica cuentas separadas desde la compra [A1, A11].', confianza: 'Media' },
  valoracion: {
    // Balance a 30-jun-2026 [D15]: préstamo de SNB (1.535,7 M), arrendamientos (712,9 M), caja + murabahas + fondos monetarios (3.906,3 M); pensiones = indemnizaciones por cese (625,9 M); asociadas = asociadas y empresas conjuntas + inversiones no cotizadas (287,2 M); minoritarios de Sahel Al Madar (16,2 M).
    // Otros ajustes (+389,9 M, deuda equivalente): dividendo del 1S26 de 5 SAR por acción pagado en agosto de 2026, después del balance [D13].
    puente: { fecha: '2026-06-30', deuda_financiera: 1535.68, arrendamientos: 712.91, caja: 3906.33, minoritarios: 16.18, pensiones: 625.89, asociadas: 287.2, otros_ajustes: 389.9 },
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
