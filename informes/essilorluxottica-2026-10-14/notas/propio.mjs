// Parte del analista (EssilorLuxottica, corte 2026-10-14). Citas con la letra de la nota: [A3] = fuente 3 de A.json.
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
      veredicto: T.veredicto ?? 'Sí',
      justificacion: T.sostenibilidad_justificacion ?? null,
    },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Baja',
  },
  escenarios: { casos: S.casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Baja' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes_comentario ?? null, confianza: 'Baja' },
  valoracion: {
    // Deuda neta a 30-jun-2026 con arrendamientos (13.390 M, Quartr [A4]); la fuente no la separa en bruta, arrendamientos y caja.
    // Minoritarios: estimación propia ≈ 8 veces su resultado de 2025 (128 M) [A5].
    puente: { fecha: '2026-06-30', deuda_financiera: 13390, arrendamientos: 0, caja: 0, minoritarios: 1000, pensiones: 0, asociadas: 0, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth [D30]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: [
        { escenario: 'Bajista', metrica: 'PER 2028e (BPA ajustado)', beneficio_por_accion: 7.54, multiplo: null, precio: null, justificacion: 'Ventas de 33.137 M (−2,5 puntos de crecimiento en 2027-28: las gafas con IA se estancan) y margen EBITDA del 23,1 %: EBIT de 4.275 M, 320 M de gastos financieros, impuesto del 25 %, 150 M de minoritarios y 650 M de amortización de intangibles de compras sumada (base ajustada) sobre 459,6 M de acciones.' },
        { escenario: 'Base', metrica: 'PER 2028e (BPA ajustado)', beneficio_por_accion: 8.73, multiplo: null, precio: null, justificacion: 'Ventas de 34.738 M (+6 %, +7,5 % y +7 % en 2026-28, con el dólar restando 3 puntos en 2026) y margen EBITDA del 24,6 %: EBIT de 5.002 M, 320 M de gastos financieros, impuesto del 25 %, 150 M de minoritarios y 650 M de amortización de intangibles sumada. Publicado: 7,32 EUR.' },
        { escenario: 'Alcista', metrica: 'PER 2028e (BPA ajustado)', beneficio_por_accion: 9.37, multiplo: null, precio: null, justificacion: 'Ventas de 35.717 M (+1,5 puntos: gafas con IA y control de miopía) y margen del 25,3 %, cerca del objetivo del 19-20 % de margen operativo ajustado que la empresa tenía para 2026.' },
      ],
      per_historico: { actual: 18.4, mediana_5a: 33.7, minimo_5a: 27.5, media_larga: 33.7, excluidos: 'Base: BPA ajustado (beneficio neto ajustado de la empresa ÷ acciones diluidas), la misma de los casos. Solo hay dos cierres fiables: 2022 (≈177 EUR ÷ 6,43 = 27,5x) y 2025 (≈270 EUR ÷ 6,79 = 39,8x, máximo de la euforia de las gafas con IA) [D12, D13]; faltan 2021, 2023 y 2024. Ninguno excluido, pero la mediana de dos años es frágil; la regla da el mismo resultado mientras la historia quede por encima del PER actual. Actual = 146,30 ÷ 7,97 (nuestro BPA ajustado de 2027e).' },
      comparables_per: { mediana: 18.7 },
      consenso: { bpa_ano1: 5.77, bpa_ano2: 6.62, objetivo_medio: 199.75, objetivo_min: 157, objetivo_max: 260, analistas: 8, tendencia_3m: 'recortes', fuente: 'MarketScreener (BPA publicado, no ajustado) [D4]; objetivos revisados en sep-oct de Goldman, RBC, Barclays, Deutsche Bank, Oddo BHF, Bernstein, BofA y Jefferies [D7-D10, D34]' },
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
