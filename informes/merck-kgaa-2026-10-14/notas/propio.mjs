// Parte del analista (Merck KGaA, corte 2026-10-14). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
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
    confianza: 'Media',
  },
  escenarios: { casos: S.casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes_comentario ?? null, confianza: 'Baja' },
  valoracion: {
    // Deuda financiera neta publicada a 30-jun-2026 (incluye arrendamientos y resta caja y activos financieros corrientes).
    puente: { fecha: '2026-06-30', deuda_financiera: 9207, arrendamientos: 0, caja: 0, minoritarios: 100, pensiones: 1467, asociadas: 0, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth [D16]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: [
        { escenario: 'Bajista', metrica: 'PER', beneficio_por_accion: S.bpa.Bajista, multiplo: null, precio: null, justificacion: T.j12?.Bajista ?? null },
        { escenario: 'Base', metrica: 'PER', beneficio_por_accion: S.bpa.Base, multiplo: null, precio: null, justificacion: T.j12?.Base ?? null },
        { escenario: 'Alcista', metrica: 'PER', beneficio_por_accion: S.bpa.Alcista, multiplo: null, precio: null, justificacion: T.j12?.Alcista ?? null },
      ],
      per_historico: { actual: 16.1, mediana_5a: 17.0, minimo_5a: 14.7, media_larga: 17.4, excluidos: '2021 (PER de 26,0x: burbuja de las ciencias de la vida con la pandemia). Base BPA pre, la misma que los escenarios: 2020 140,35 ÷ 6,70 = 20,9x; 2022 180,90 ÷ 10,05 = 18,0x; 2023 144,10 ÷ 8,49 = 17,0x; 2024 139,90 ÷ 8,63 = 16,2x; 2025 122,60 ÷ 8,34 = 14,7x [D11, D12, A11, A12, A8]. Mediana y mínimo de los cinco años limpios (2020 y 2022-2025); media larga de los mismos (no hay más años verificados). Actual = 137,20 ÷ 8,53 (nuestro BPA pre de 2027e).' },
      comparables_per: { mediana: 19.5 },
      consenso: { bpa_ano1: 7.78, bpa_ano2: null, objetivo_medio: 146.11, objetivo_min: 130, objetivo_max: 167, analistas: 17, tendencia_3m: 'subidas', fuente: 'Consenso VARA de la empresa, Ariva y notas de bancos [D5, D7, D9, D10, D1]' },
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
  esg: null,
  fuentes: T.fuentes ?? [],
  huecos: T.huecos ?? [],
};
