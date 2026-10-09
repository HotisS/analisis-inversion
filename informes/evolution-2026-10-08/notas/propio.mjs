// Parte del analista (Evolution AB, corte 2026-10-08). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import { anios, wacc, terminal, etapa2, casos, pesos } from './supuestos.mjs';

let T = {};
try { T = await import('./textos.mjs'); } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

export default {
  meta: {
    fecha_corte: '2026-10-08', divisa: 'EUR', divisa_cotizacion: 'SEK', tipo_cambio: T.tipo_cambio ?? null, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE', formato_cuenta: T.formato_cuenta ?? 'naturaleza',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
  },
  _parches: T.parches ?? [],
  huecos_resueltos: T.huecos_resueltos ?? [],
  ...(T.secciones ?? {}),
  dcf: {
    anios, wacc, terminal, etapa2: { ...etapa2, justificacion: T.etapa2_justificacion ?? null }, mitad_de_anio: true,
    justificacion: T.dcf_justificacion ?? null,
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: { casos: casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: T.suma_partes ?? null,
  valoracion: {
    puente: T.puente ?? null,
    rab: null,
    referencia_mercado: { mercado: 'S&P 500, prima implícita de Damodaran (válida para mercados desarrollados)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx, columna «ERP (T12m with sustainable payout)», fila de octubre de 2026 [P1]' },
    pesos,
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  resumen: T.resumen ?? null,
  fuentes: [
    { id: 1, titulo: 'Implied ERP by month (ERPbymonth.xlsx), fila de octubre de 2026', editor: 'Aswath Damodaran, NYU Stern', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
    { id: 2, titulo: 'Financial calendar (informe enero-septiembre 2026 el 23-oct-2026)', editor: 'Evolution AB (publ)', tipo: 'Primaria', fecha: '2026-10-08', url: 'https://www.evolution.com/investors/financial-data/financial-calendar' },
    ...(T.fuentes ?? []),
  ],
  huecos: T.huecos ?? [],
};
