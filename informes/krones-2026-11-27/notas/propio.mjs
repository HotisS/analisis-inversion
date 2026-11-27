// Parte del analista (Krones, corte 2026-11-27). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import { anios, wacc, terminal, etapa2, casos, pesos, bpaEscenario } from './supuestos.mjs';

let T = {};
try { T = await import('./textos.mjs'); } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

const bpa = Object.fromEntries(casos.map((c) => [c.escenario, Math.round(bpaEscenario(c)['2028e'].bpa * 100) / 100]));

export default {
  meta: {
    fecha_corte: '2026-11-27', divisa: 'EUR', divisa_cotizacion: 'EUR', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE', formato_cuenta: 'naturaleza',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
  },
  _parches: T.parches ?? [],
  huecos_resueltos: T.huecos_resueltos ?? [],
  ...(T.secciones ?? {}),
  dcf: {
    anios, wacc, terminal, etapa2: { ...etapa2, justificacion: null }, mitad_de_anio: true,
    justificacion: T.dcf_justificacion ?? null,
    sostenibilidad: T.sostenibilidad ?? null,
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: { casos: casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: T.suma_partes ?? { aplica: false, descuento_holding_pct: 0, partes: [], comentario: null, confianza: 'Media' },
  valoracion: {
    puente: { fecha: '2026-09-30', deuda_financiera: 2.3, arrendamientos: 159.0, caja: 410.6, minoritarios: 0.4, pensiones: 115.6, asociadas: 6.7, otros_ajustes: 31.7 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500, prima implícita de Damodaran (válida para mercados desarrollados)', prima_implicita_pct: 4.41, fecha: '2026-11', fuente: 'Damodaran, ERPbymonth.xlsx, columna «ERP (T12m with sustainable payout)», noviembre de 2026 [D36]' },
    pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      base_bpa: 'publicado',
      casos: casos.map((c) => ({ escenario: c.escenario, metrica: 'PER 2028e', beneficio_por_accion: bpa[c.escenario], multiplo: null, precio: null, justificacion: T.casos12m?.[c.escenario] ?? null })),
      per_historico: {
        base: 'adelantado', base_bpa: 'publicado', actual: 10.6, mediana_5a: 14.2, minimo_5a: 12.7, media_larga: 14.2, anios: 5,
        excluidos: 'Historia adelantada: precio de cierre de cada año ÷ BPA publicado del año siguiente (2025: ÷ nuestro BPA de 2026e, 9,59). 2018 (67,50 ÷ 0,30 = 225x, ≥ 150x) y 2019 (BPA de 2020 negativo) fuera. Serie: 2020 14,8x; 2021 16,2x; 2022 14,8x; 2023 12,7x; 2024 12,7x; 2025 14,2x. Mediana y mínimo de 2021-2025; media larga de 2018-2025 con los seis años válidos. Actual: 103,40 ÷ 9,78 (nuestro BPA de 2027e). Historia al cierre (v2, solo control): 2021 21,5x; 2022 17,7x; 2023 15,7x; 2024 13,7x; 2025 14,4x; 2018 14,1x; 2019 y 2020 fuera.',
        v2: { actual: 10.6, mediana_5a: 15.7, minimo_5a: 13.7, media_larga: 16.2, base: 'cierre' },
      },
      comparables_per: { mediana: 17.5 },
      consenso: { bpa_ano1: 9.89, bpa_ano2: 10.38, objetivo_medio: 137.7, objetivo_min: 105, objetivo_max: 173, analistas: 10, tendencia_3m: 'recortes', fuente: 'Yahoo Finance, BPA 2026e y 2027e y objetivos a 27-nov-2026 [D30]; recortes de objetivo del 22-23-oct [D32]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: 119.21,
      comentario: T.objetivo_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  comparables: { comentario: T.comparables_comentario ?? null },
  bolsa: { contexto: T.contexto ?? null },
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  resumen: T.resumen ?? null,
  fuentes: [],
  huecos: T.huecos ?? [],
};
