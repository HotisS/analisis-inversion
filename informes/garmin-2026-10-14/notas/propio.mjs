// Parte del analista (Garmin, corte 2026-10-14). Citas con la letra de la nota: [A3] = fuente 3 de A.json.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

export default {
  meta: {
    fecha_corte: '2026-10-14', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'US GAAP', formato_cuenta: 'funcion',
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
  escenarios: { casos: S.casos.map((c) => ({ ...c, perfil: [], narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes_comentario ?? null, confianza: 'Media' },
  valoracion: {
    // Sin deuda financiera; arrendamientos operativos en US GAAP fuera del puente. Caja + inversiones financieras ≈4.400 M al 27-jun-2026 [A4].
    puente: { fecha: '2026-06-27', deuda_financiera: 0, arrendamientos: 0, caja: 4400, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth [D24]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: [
        { escenario: 'Bajista', metrica: 'PER', beneficio_por_accion: 9.62, multiplo: null, precio: null, justificacion: T.o12?.Bajista ?? null },
        { escenario: 'Base', metrica: 'PER', beneficio_por_accion: 11.13, multiplo: null, precio: null, justificacion: T.o12?.Base ?? null },
        { escenario: 'Alcista', metrica: 'PER', beneficio_por_accion: 12.14, multiplo: null, precio: null, justificacion: T.o12?.Alcista ?? null },
      ],
      per_historico: { actual: 26.5, mediana_5a: 23.35, minimo_5a: 18.3, media_larga: 23.3, excluidos: 'Serie de cuatro años (no se encontró el cierre de 2021). BPA pro forma, sin partidas fiscales discretas, en la misma base que los escenarios: 2022 92,29 ÷ 5,04 = 18,3x; 2023 128,54 ÷ 5,59 = 23,0x (se quita el ingreso fiscal de 89 M que llevó el BPA publicado a 6,71); 2024 206,26 ÷ 7,30 = 28,3x; 2025 202,85 ÷ 8,56 = 23,7x [D10, A3, A6]. Actual = 276,41 ÷ 10,45 (nuestro BPA de 2027e).' },
      comparables_per: { mediana: 19.8 },
      consenso: { bpa_ano1: 9.74, bpa_ano2: 9.74, objetivo_medio: 299, objetivo_min: 285, objetivo_max: 370, analistas: 8, tendencia_3m: 'subidas', fuente: 'WallStreetZen, Zacks (marzo), Barchart y Benzinga [D5, D6, D8, D9]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.objetivo12m_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  resumen: R,
  rentabilidad: { comentario: T.rentabilidad_comentario ?? null, confianza: 'Media' },
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  fuentes: T.fuentes ?? [],
  huecos: T.huecos ?? [],
};
