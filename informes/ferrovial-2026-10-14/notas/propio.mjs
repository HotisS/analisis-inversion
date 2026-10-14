// Parte del analista (Ferrovial, corte 2026-10-14). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes_comentario ?? null, confianza: 'Baja' },
  valoracion: {
    // Deuda NETA consolidada a 31-dic-25 (5.893 M, incluye la deuda sin recurso de los proyectos) [A1]; caja a 0 porque no se pudo separar.
    // Asociadas: 48,29 % del 407 ETR al precio de la compra de 2025 (CAD 1.353 M por el 3,30 % → CAD 41.000 M el 100 %; ≈CAD 19.800 M
    // la participación; EUR/CAD ≈1,60, estimación) ≈ 12.400 M EUR [D22]. Minoritarios de las Managed Lanes a valor de mercado estimado:
    // ≈40 % del EBITDA de autopistas (990 M → ≈400 M) × 20x − 40 % de la deuda neta de proyectos (≈7.234 M) ≈ 5.000 M (estimación propia).
    puente: { fecha: '2025-12-31', deuda_financiera: 5893, arrendamientos: 0, caja: 0, minoritarios: 5000, pensiones: 0, asociadas: 12400, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth [D24]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: T.casos12m ?? [],
      per_historico: {
        base: 'adelantado', actual: 46.0, mediana_5a: 44.3, minimo_5a: 37.7, media_larga: 47.9,
        excluidos: 'PER adelantado = precio de cierre ÷ BPA LIMPIO del año siguiente (sin plusvalías de rotación ni ajustes de valor razonable; misma base que los casos): 2022 24,47 ÷ 0,63 = 38,8x; 2023 33,02 ÷ 0,88 = 37,7x; 2024 40,60 ÷ 0,82 = 49,8x; 2025 55,34 ÷ 0,85 (nuestro 2026e) = 65,1x [D19, D20, D21, A1, A3, A5]. Excluido 2021 (27,56 ÷ 0,25 = 110x: BPA de 2022 deprimido). Sin 2019-2020 (pérdidas). Media larga = media de los cuatro años limpios. Actual = 45,11 ÷ 0,98 (nuestro BPA de 2027e).',
      },
      comparables_per: { mediana: 16.1 },
      consenso: { bpa_ano1: 0.93, bpa_ano2: 1.04, objetivo_medio: 61.32, objetivo_min: 50, objetivo_max: 70, analistas: 26, tendencia_3m: 'recortes', fuente: 'UBS, Chartmill, consenso Bloomberg (Demócrata), JPMorgan y BofA [D6, D11, D5, D9, D8]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.objetivo12m_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Baja',
  },
  resumen: R,
  rentabilidad: { comentario: T.rentabilidad_comentario ?? null, confianza: 'Baja' },
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  fuentes: T.fuentes ?? [],
  huecos: T.huecos ?? [],
};
