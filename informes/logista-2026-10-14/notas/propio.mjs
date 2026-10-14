// Parte del analista (Logista, corte 2026-10-14). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

export default {
  meta: {
    fecha_corte: '2026-10-14', divisa: 'EUR', divisa_cotizacion: 'EUR', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 9, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE', formato_cuenta: 'naturaleza',
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
    // Deuda financiera de 21 M y tesorería en bancos de 175 M a 30-sep-25 [A13]. La caja prestada a Imperial (≈2.500 M de media [A15]) es
    // flotante de impuestos: no se puede repartir, pero rinde intereses. Se valora como la renta perpetua de sus intereses después de impuestos:
    // 2.500 M × 2,85 % (Euribor 6 m ≈2,1 % + 0,75) ≈ 71 M; × 0,75 = 53 M; ÷ 7,33 % ≈ 730 M (estimación propia). Caja del puente = 175 + 730 = 905 M.
    // Arrendamientos 0 porque el capex del DCF ya incluye los pagos de arrendamiento. Minoritarios (26,67 % de El Mosca) sin dato: 0.
    puente: { fecha: '2025-09-30', deuda_financiera: 21, arrendamientos: 0, caja: 905, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth [D14]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: 'FY2028e',
      casos: T.casos12m ?? [],
      per_historico: {
        base: 'adelantado', actual: 16.5, mediana_5a: 12.1, minimo_5a: 8.9, media_larga: 11.5,
        excluidos: 'PER adelantado = precio al cierre del ejercicio (30-sep) ÷ BPA publicado del ejercicio siguiente (misma base que los casos: beneficio neto publicado, con ingresos financieros e inventarios): FY2020 14,60 ÷ 1,32 = 11,1x; FY2021 18,20 ÷ 1,51 = 12,1x; FY2022 18,52 ÷ 2,07 = 8,9x; FY2023 24,03 ÷ 2,34 = 10,3x; FY2024 27,10 ÷ 2,13 = 12,7x; FY2025 28,75 ÷ 2,11 (nuestro FY2026e) = 13,6x [D6, D4, D5, D7]. Sin exclusiones (ningún año con pérdidas ni BPA atípico; 2020 es precio de pandemia pero BPA normal). Mediana de 5 años (FY2021-FY2025) 12,1x; mínimo 8,9x; media larga (FY2020-FY2025) 11,5x. Actual = 35,86 ÷ 2,17 (nuestro FY2027e) = 16,5x, el más alto de la serie.',
      },
      comparables_per: { mediana: 17.4 },
      consenso: { bpa_ano1: 2.12, bpa_ano2: 2.17, objetivo_medio: 32.54, objetivo_min: 26.7, objetivo_max: 35, analistas: 11, tendencia_3m: 'subidas', fuente: 'MarketScreener (BPA), Investing (objetivo, jul-26) y XTB (JB Capital 35,50) [D4, D8, D1]' },
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
