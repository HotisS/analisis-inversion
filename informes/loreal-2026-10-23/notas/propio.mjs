// Parte del analista (L'Oréal, corte 2026-10-23). Citas con la letra de la nota: [A3] = fuente 3 de A.json.
import S, { bpa } from './supuestos.mjs';

const PRECIO = 413.0;
const r1 = (x) => Math.round(x * 10) / 10;
const b = Object.fromEntries(S.casos.map((c) => [c.escenario, bpa(c)]));
const bpaDe = (e, p) => b[e].find((f) => f.periodo === p).bpa;

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

export default {
  meta: {
    fecha_corte: '2026-10-23', divisa: 'EUR', divisa_cotizacion: 'EUR', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
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
    // Puente a 30-jun-2026 [A]: deuda bruta 16.713 M (2.375 de arrendamientos; incluye la opción de Medik8, 507 M) y caja 4.049 M (deuda neta 12.664 M);
    // pensiones 668 M. Galderma (20 %) a precio de mercado del 22-oct (≈9.450 M EUR) en asociadas [D]; Sanofi (7,27 %, ≈6.640 M) en otros_ajustes:
    // sus dividendos están en el resultado financiero, no en el EBITDA [A, D].
    puente: { fecha: '2026-06-30', deuda_financiera: 14338, arrendamientos: 2375, caja: 4049, minoritarios: 51, pensiones: 668, asociadas: 9450, otros_ajustes: 6640 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500, prima implícita de Damodaran (válida para mercados desarrollados)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx, columna «ERP (T12m with sustainable payout)» [D10]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: bpaDe(e, '2028e'), multiplo: null, precio: null, justificacion: T.just12m?.[e] ?? null })),
      // Adelantado = cierre del año ÷ BPA del año siguiente (D, cierres oficiales y BPA del documento de registro): 2016-2018, 2020, 2022-2024; fuera 2019 (BPA de 2020 hundido) y 2021.
      // v2 al cierre: 2019 y 2022-2025 sobre el BPA del año (34,1 / 29,6 / 37,3 / 27,0 / 28,8); media larga 2018-2025 sin 2020-2021.
      per_historico: { base: 'adelantado', actual: r1(PRECIO / bpaDe('Base', '2027e')), mediana_5a: 27.6, minimo_5a: 26.9, media_larga: 28.8, excluidos: '2019 y 2021',
        v2: { actual: r1(PRECIO / bpaDe('Base', '2027e')), mediana_5a: 29.6, minimo_5a: 27.0, media_larga: 30.9, base: 'cierre' } },
      comparables_per: { mediana: 23.9 },
      consenso: { bpa_ano1: 14.95, bpa_ano2: null, objetivo_medio: 418, objetivo_min: 340, objetivo_max: 460, analistas: 24, tendencia_3m: 'estables', fuente: 'FactSet vía Boursorama, antes de las ventas del 3T26 [D]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      comentario: T.objetivo12m_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  resumen: R,
  rentabilidad: { comentario: T.rentabilidad_comentario ?? null, confianza: 'Media' },
  catalizadores: T.secciones?.catalizadores ?? null,
  riesgos: T.secciones?.riesgos ?? null,
  preguntas: T.secciones?.preguntas ?? null,
  fuentes: T.fuentes ?? [],
  huecos: T.huecos ?? [],
};
