// Parte del analista (Ferrari, corte 2026-10-14). Citas con la letra de la nota: [A3] = fuente 3 de A.json.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

export default {
  meta: {
    fecha_corte: '2026-10-14', divisa: 'EUR', divisa_cotizacion: 'EUR', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF (IASB/UE)', formato_cuenta: 'funcion',
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
    // Deuda neta industrial publicada a 30-jun-2026 (deuda industrial, con arrendamientos, menos caja industrial). La deuda de
    // servicios financieros (titulizaciones respaldadas por préstamos a clientes de EE. UU.) se trata como negocio aparte.
    puente: { fecha: '2026-06-30', deuda_financiera: 131, arrendamientos: 0, caja: 0, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500, prima implícita de Damodaran (válida para mercados desarrollados)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx, columna «ERP (T12m with sustainable payout)» [D10]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: [
        { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: 9.60, multiplo: null, precio: null, justificacion: 'Ventas de 7.949 M en 2028e (+2,5 % en 2027 y +2 % en 2028: el Luce no vende, los aranceles y China frenan la mezcla) con un margen EBITDA del 37,5 %: EBIT de ≈2.200 M, 30 M de coste financiero neto, impuesto del 22 %, 5 M de minoritarios y 175,9 M de acciones sin recompras no anunciadas.' },
        { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: 10.93, multiplo: null, precio: null, justificacion: 'Ventas de 8.422 M (+6,4 % en 2026 con la guía, +5,5 % y +5 %) y margen EBITDA del 39,5 %, camino del 40 % del plan de 2030: EBIT de 2.502 M (amortización del 9,8 %), 30 M de coste financiero neto, impuesto del 22 %, 5 M de minoritarios y 175,9 M de acciones.' },
        { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: 11.63, multiplo: null, precio: null, justificacion: 'Ventas de 8.664 M (+7 % y +6,5 % con el F80, la personalización y el Luce bien recibido) y margen EBITDA del 40,5 %: EBIT de 2.660 M.' },
      ],
      per_historico: { actual: 33.3, mediana_5a: 41.5, minimo_5a: 35.6, media_larga: 41.7, excluidos: 'Ningún año excluido, pero la serie es corta: 2022-2025, porque el cierre de 2021 en euros no se pudo obtener. PER de cierre sobre el BPA diluido publicado: 2022 38,9x (198,1 ÷ 5,09); 2023 44,1x (304,3 ÷ 6,90); 2024 48,3x (408,9 ÷ 8,46); 2025 35,6x (319,0 ÷ 8,96). Los precios de cierre son estimación propia (NYSE convertido a euros; 2025 derivado de la evolución de enero de 2026) [D5, D6]. Actual = 345,25 ÷ 10,37 (nuestro BPA de 2027e).' },
      comparables_per: { mediana: 22.4 },
      consenso: { bpa_ano1: 10.56, bpa_ano2: 11.25, objetivo_medio: 423, objetivo_min: null, objetivo_max: null, analistas: 18, tendencia_3m: 'estables', fuente: 'MarketScreener y Economia Italia [D2, D1]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.objetivo12m_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Baja',
  },
  resumen: R,
  rentabilidad: { comentario: T.rentabilidad_comentario ?? null, confianza: 'Media' },
  catalizadores: T.secciones?.catalizadores ?? null,
  riesgos: T.secciones?.riesgos ?? null,
  preguntas: T.secciones?.preguntas ?? null,
  fuentes: T.fuentes ?? [],
  huecos: T.huecos ?? [],
};
