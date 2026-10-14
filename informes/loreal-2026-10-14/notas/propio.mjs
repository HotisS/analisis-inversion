// Parte del analista (L'Oréal, corte 2026-10-14). Citas con la letra de la nota: [A3] = fuente 3 de A.json.
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
    // Deuda neta de jun-26 (12.700 M con arrendamientos; caja de 4.050 M) tras Kering Beauté, Galderma y el dividendo. Galderma (20 %) a valor de mercado
    // en asociadas (≈33.000 M CHF × 20 % × 1,075 EUR/CHF); Sanofi (7,2 %, ≈88,6 M de acciones a ≈75 EUR) en otros_ajustes: sus dividendos no están en el EBITDA.
    puente: { fecha: '2026-06-30', deuda_financiera: 14950, arrendamientos: 1800, caja: 4050, minoritarios: 50, pensiones: 0, asociadas: 7100, otros_ajustes: 6600 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500, prima implícita de Damodaran (válida para mercados desarrollados)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx, columna «ERP (T12m with sustainable payout)» [D10]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: [
        { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: 13.81, multiplo: null, precio: null, justificacion: 'Ventas de 50.510 M en 2028e (+4,0 % en 2027 y +4,5 % en 2028: el mercado de belleza se normaliza al 3-4 % y L’Oréal deja de superarlo) con margen EBITDA del 23,5 %: EBIT de 9.748 M (19,3 %), 300 M de coste financiero neto, impuesto del 25,5 %, 350 M de dividendos de Sanofi netos y 535 M de acciones.' },
        { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: 15.58, multiplo: null, precio: null, justificacion: 'Ventas de 52.962 M (+5,5 % en 2026 con Kering Beauté y la divisa en contra, +6,5 % y +7,0 % con la licencia de Gucci desde jul-2027) y margen EBITDA del 25,0 %: EBIT de 11.016 M (20,8 %, +0,2 puntos al año como en 2021-2025), 300 M de coste financiero neto, impuesto del 25,5 %, 350 M de dividendos de Sanofi netos y 535 M de acciones sin recompras nuevas.' },
        { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: 16.77, multiplo: null, precio: null, justificacion: 'Ventas de 54.460 M (+8,0 % y +8,5 %: China y el comercio de viaje se recuperan y Gucci rinde más) y margen EBITDA del 26,0 %: EBIT de 11.872 M.' },
      ],
      per_historico: { actual: 26.4, mediana_5a: 31.7, minimo_5a: 28.1, media_larga: 31.3, excluidos: '2020 (42,6x: BPA hundido por la pandemia) y 2021 (47,4x: euforia de los valores de calidad con tipos a cero). PER de cierre sobre el BPA diluido sin partidas no recurrentes: 2018 26,0x (200,5 ÷ 7,71); 2019 31,7x (263,1 ÷ 8,30); 2022 33,0x (336,4 ÷ 10,20); 2023 39,9x (449,1 ÷ 11,26); 2024 28,1x (341,85 ÷ 12,16); 2025 28,8x (366,60 ÷ 12,71) [D5, D6, A1]. Cinco años limpios = 2019 y 2022-2025 (mediana 31,7x, mínimo 28,1x); media larga = 2018-2025 sin los excluidos (31,3x). Actual = 379,6 ÷ 14,38 (nuestro BPA de 2027e).' },
      comparables_per: { mediana: 23.5 },
      consenso: { bpa_ano1: null, bpa_ano2: 14.49, objetivo_medio: 417.79, objetivo_min: 340, objetivo_max: 460, analistas: 35, tendencia_3m: 'estables', fuente: 'Investing.com, Simply Wall St y StocksGuide [D1, D2, D4]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.objetivo12m_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Baja',
  },
  resumen: R,
  rentabilidad: { comentario: T.rentabilidad_comentario ?? null, confianza: 'Baja' },
  catalizadores: T.secciones?.catalizadores ?? null,
  riesgos: T.secciones?.riesgos ?? null,
  preguntas: T.secciones?.preguntas ?? null,
  fuentes: T.fuentes ?? [],
  huecos: T.huecos ?? [],
};
