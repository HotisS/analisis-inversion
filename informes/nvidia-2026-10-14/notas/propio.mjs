// Parte del analista (Nvidia, corte 2026-10-14). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

// BPA propio por escenario (FY2029e, ejercicio que mirará el mercado dentro de 12 meses; FY2028e para el PER actual).
// Se rellenan con la proyección del motor: ventas × (margen EBITDA − amortización) + resultado financiero recurrente − 16 % de impuestos, ÷ 24.270 M de acciones.
const BPA = T.bpa ?? { bajista: null, base: null, alcista: null, base_fy28: null };

export default {
  meta: {
    fecha_corte: '2026-10-14', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 1, etiqueta_ejercicio: 'fin', normas_contables: 'US GAAP', formato_cuenta: 'funcion',
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
      veredicto: T.veredicto ?? 'En parte',
      justificacion: T.sostenibilidad_justificacion ?? null,
    },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Baja',
  },
  escenarios: { casos: S.casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Baja' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes_comentario ?? null, confianza: 'Media' },
  valoracion: {
    // Balance del 2T FY27 (26-jul-26): caja y valores de deuda de 56.600 M [D21]; deuda estimada = 8.468 M previos + 25.000 M emitidos en junio [D20];
    // participaciones cotizadas de 42.800 M a valor de mercado como «asociadas» (las no cotizadas, sin dato, quedan fuera).
    puente: { fecha: '2026-07-26', deuda_financiera: 33468, arrendamientos: 0, caja: 56600, minoritarios: 0, pensiones: 0, asociadas: 42800, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth [D18]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: 'FY2029e',
      casos: [
        { escenario: 'Bajista', metrica: 'PER', beneficio_por_accion: BPA.bajista, multiplo: null, precio: null, justificacion: T.j12?.Bajista ?? null },
        { escenario: 'Base', metrica: 'PER', beneficio_por_accion: BPA.base, multiplo: null, precio: null, justificacion: T.j12?.Base ?? null },
        { escenario: 'Alcista', metrica: 'PER', beneficio_por_accion: BPA.alcista, multiplo: null, precio: null, justificacion: T.j12?.Alcista ?? null },
      ],
      per_historico: T.per_historico ?? null,
      comparables_per: { mediana: 30.7 },
      consenso: { bpa_ano1: 9.47, bpa_ano2: 15.91, objetivo_medio: 321.3, objetivo_min: 181.8, objetivo_max: 540.75, analistas: 62, tendencia_3m: 'subidas', fuente: 'Chartmill, Yahoo Finance y Alpha Spread [D5, D6, D8]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.objetivo12m_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Baja',
  },
  resumen: R,
  rentabilidad: { comentario: T.rentabilidad_comentario ?? null, confianza: 'Media' },
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  fuentes: T.fuentes ?? [],
  huecos: T.huecos ?? [],
};
