// Parte del analista (Booking Holdings, corte 2026-10-14). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = propia.
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
  escenarios: { casos: S.casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'Booking informa un solo segmento y sus marcas (Booking.com, Priceline, Agoda, KAYAK, OpenTable) comparten modelo de comisión y no publican beneficio por separado: no aplica.', confianza: 'Media' },
  valoracion: {
    // Balance de 30-jun-2026: bonos de 20.300 M de principal (≈20.180 M contables: 2.000 a corto y 18.180 a largo), caja 17.214 M,
    // inversiones a largo plazo 448 M (en asociadas, a valor contable). Arrendamientos operativos fuera (US GAAP: el alquiler está en el EBITDA).
    puente: { fecha: '2026-06-30', deuda_financiera: 20180, arrendamientos: 0, caja: 17214, minoritarios: 0, pensiones: 0, asociadas: 448, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth [D26]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: [
        { escenario: 'Bajista', metrica: 'PER', beneficio_por_accion: 11.12, multiplo: null, precio: null, justificacion: 'Ingresos de 32.506 M (2,5 puntos menos de crecimiento en 2027-28: la IA y la regulación frenan las noches) y margen EBITDA del 36,0 %: EBIT de 11.019 M, 250 M de gasto financiero neto, impuesto del 21 % y 765 M de acciones, sin recompras.' },
        { escenario: 'Base', metrica: 'PER', beneficio_por_accion: 12.37, multiplo: null, precio: null, justificacion: 'Ingresos de 34.064 M (+8 % en 2027 y 2028, el objetivo a medio plazo) y margen EBITDA del 38 % con el ahorro de transformación: EBIT de 12.229 M, 250 M de gasto financiero neto, impuesto del 21 % y 765 M de acciones, sin recompras no anunciadas.' },
        { escenario: 'Alcista', metrica: 'PER', beneficio_por_accion: 12.91, multiplo: null, precio: null, justificacion: 'Ingresos de 35.017 M (+9,5 % anual: viaje conectado, pagos y alquiler vacacional) y margen del 38,5 %: EBIT de 12.747 M; el resto como en el base.' },
      ],
      per_historico: { actual: 14.1, mediana_5a: 23.4, minimo_5a: 20.1, media_larga: 21.9, excluidos: 'BPA ajustado de la empresa, en la misma base que los escenarios y ajustado al desdoblamiento 25 por 1. 2020 y 2021 fuera (pandemia: BPA hundido, PER de más de 50x). PER de cierre: 2018 18,6x (68,90 ÷ 3,70); 2019 19,4x (82,15 ÷ 4,24, BPA estimado con el +15 % a divisa constante); 2022 20,1x (80,61 ÷ 4,01); 2023 23,3x (141,89 ÷ 6,09); 2024 26,6x (198,74 ÷ 7,48); 2025 23,5x (214,21 ÷ 9,12) [D10, D11, D22, D24, A1, A13, A14]. Actual = 158,43 ÷ 11,27 (nuestro BPA de 2027e sin recompras).' },
      comparables_per: { mediana: 16.0 },
      consenso: { bpa_ano1: 10.45, bpa_ano2: 12.38, objetivo_medio: 233.83, objetivo_min: 170, objetivo_max: 301, analistas: 37, tendencia_3m: 'recortes', fuente: 'Yahoo Finance, Barchart y TIKR; recortes de Wells Fargo y Cantor en octubre [D6, D7, D4, D8, D9]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.objetivo12m_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  resumen: R,
  rentabilidad: T.secciones?.rentabilidad ?? null,
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  fuentes: T.fuentes ?? [],
  huecos: T.huecos ?? [],
};
