// Parte del analista (Intuitive Surgical, corte 2026-10-21, tras el 3T26). Citas con prefijo: [A3] = fuente 3 de A.json; [P1] = propia.
// Punto de partida: los textos del analista de la última versión del 6-oct (datos-v5, en previo/), que se reescriben en
// textos.mjs donde el 3T26 los cambia. Trimestres, balance, flujos, capital, directivos, consenso y bolsa salen ya de las
// notas A, C y D (puestas al día el 21-oct).
import { readFileSync } from 'node:fs';
import { anios, wacc, terminal, casos, pesos } from './supuestos.mjs';
import * as T from './textos.mjs';
import { resumen } from './resumen.mjs';
const V = JSON.parse(readFileSync(new URL('./previo/datos-v5-anterior.json', import.meta.url), 'utf8'));

export default {
  meta: {
    fecha_corte: '2026-10-21', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'US GAAP', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones,
    controles_explicados: [
      { control: 'Tipo impositivo efectivo razonable (2023)', explicacion: 'El 7,2 % de 2023 viene de 92,3 M de beneficios fiscales suizos y 67,1 M de revaluación de activos diferidos; no se proyecta: el DCF usa un tipo normalizado del 19 % [A1].' },
      { control: 'Regresión múltiplo-crecimiento explicativa (R² ≥ 0,3)', explicacion: 'En este grupo el mercado paga calidad y duración, no crecimiento: la regresión no se usa y los comparables pesan solo un 15 %.' },
    ],
  },
  resumen,
  competencia: { foso: V.competencia.foso, amenazas: T.amenazas },
  calidad: { comentario: T.calidad },
  rentabilidad: { comentario: T.rentabilidad, confianza: 'Alta' },
  multiplos_historicos: { comentario: T.multiplos_historicos },
  comparables: { criterio: V.comparables.criterio, comentario: T.comparables },
  transacciones: { comentario: T.transacciones },
  dcf: {
    anios, wacc, terminal, mitad_de_anio: true,
    justificacion: T.dcf_justificacion,
    sostenibilidad: T.sostenibilidad,
    lectura: T.dcf_lectura,
    confianza: 'Media',
  },
  escenarios: { casos: casos.map((c) => ({ ...c, narrativa: T.narrativas[c.escenario] })), comentario: T.escenarios_comentario, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: V.suma_partes.comentario, confianza: 'Alta' },
  valoracion: {
    // Puente a 30-sep-2026 de D: caja e inversiones 6.800,4, sin deuda, arrendamientos de dic-25, minoritarios estimados y el
    // acuerdo antimonopolio de 450 M neto de impuestos (347 M), devengado y sin pagar [D, A28].
    puente: { fecha: '2026-09-30', deuda_financiera: 0, arrendamientos: 170.9, caja: 6800.4, minoritarios: 130.9, pensiones: 0, asociadas: 0, otros_ajustes: 347 },
    pesos,
    objetivo_12m: T.objetivo_12m,
    comentario: T.valoracion_comentario,
    confianza: 'Media',
  },
  catalizadores: { items: T.catalizadores, confianza: 'Media' },
  riesgos: { items: T.riesgos, premortem: T.premortem, confianza: 'Media' },
  preguntas: { items: T.preguntas, confianza: 'Media' },
  // Fuentes del 6-oct sin equivalente en las notas nuevas (citas [P1]-[P3]).
  fuentes: JSON.parse(readFileSync(new URL('./fuentes-propias.json', import.meta.url), 'utf8')),
  huecos: [],
};
