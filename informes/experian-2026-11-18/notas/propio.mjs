// Parte del analista (Experian, corte 2026-11-18). Citas con la letra de la nota: [A3] = fuente 3 de A.json.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

export default {
  meta: {
    fecha_corte: '2026-11-18', divisa: 'USD', divisa_cotizacion: 'GBp', tipo_cambio: 0.0131913, unidades: 'millones',
    cierre_ejercicio_mes: 3, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF (Reino Unido); cifras benchmark de la empresa', formato_cuenta: 'funcion',
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: B2B y Consumer Services comparten datos, plataforma y marca, y la empresa no publica el EBIT de cada línea de negocio por separado (solo por región).', confianza: 'Media' },
  valoracion: {
    puente: { fecha: '2026-09-30', deuda_financiera: 6173, arrendamientos: 129, caja: 257, minoritarios: 38, pensiones: 0, asociadas: 0, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth [D7]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: 'FY2029e',
      base_bpa: 'ajustado',
      casos: [
        { escenario: 'Bajista', metrica: 'PER', beneficio_por_accion: 2.29, multiplo: null, precio: null, justificacion: 'FY27e en la guía (9.121 M USD de ingresos, margen EBIT benchmark del 28,9 %); después 2 puntos menos de crecimiento (5 % y 5,5 %: la FHFA abarata la hipoteca, la IA presiona el precio de la consulta) y 1 punto menos de margen: ingresos de 10.103 M y EBIT benchmark de 2.920 M en el FY29e, 285 M de intereses, impuesto del 25,75 %, 7 M de minoritarios y 853 M de acciones: 2,29 USD.' },
        { escenario: 'Base', metrica: 'PER', beneficio_por_accion: 2.48, multiplo: null, precio: null, justificacion: 'Guía del FY27 (ingresos +8,2 % hasta 9.137 M; margen EBIT benchmark 29,1 %; BPA ≈2,02, +12 %) y después 7 % y 7,5 % de crecimiento (orgánico de un dígito alto, el marco a medio plazo) con +40 pb de margen al año: ingresos de 10.510 M y EBIT de 3.143 M en el FY29e; 285 M de intereses, impuesto del 25,75 %, 7 M de minoritarios y 853 M de acciones medias (880,6 M hoy menos las recompras anunciadas pendientes, ≈1.190 M USD, más ≈2 M al año de planes de empleados): 2,48 USD.' },
        { escenario: 'Alcista', metrica: 'PER', beneficio_por_accion: 2.61, multiplo: null, precio: null, justificacion: 'Hipotecas en EE. UU. que se recuperan con tipos más bajos y la IA como producto propio: 8,5 % y 9 % de crecimiento tras el FY27 y +0,5 puntos de margen: ingresos de 10.826 M, EBIT de 3.291 M, mismos intereses, impuesto y acciones: 2,61 USD.' },
      ],
      per_historico: {
        base: 'adelantado', base_bpa: 'ajustado', anios: 6,
        actual: 16.4, mediana_5a: 27.6, minimo_5a: 22.6, media_larga: 26.6,
        excluidos: 'Ninguno excluido (BPA benchmark positivo y creciente; ningún PER atípico). Historia ADELANTADA: precio de cierre de marzo de cada ejercicio en peniques × GBP/USD del BCE ese día ÷ BPA benchmark real del ejercicio siguiente [D3, D4, A3]: FY20 27,82 ÷ 1,031 = 27,0x; FY21 34,36 ÷ 1,245 = 27,6x; FY22 38,72 ÷ 1,351 = 28,7x; FY23 32,90 ÷ 1,455 = 22,6x; FY24 43,67 ÷ 1,569 = 27,8x; FY25 46,19 ÷ 1,798 = 25,7x. El cierre del FY26 (34,40 USD) no entra: falta el BPA real del FY27 (17,1x con nuestro 2,02). Mediana FY21-FY25 27,6x; mínimo 22,6x; media FY20-FY25 26,6x. PER actual = 37,19 USD (2.819 p del 17-nov × 1,3191) ÷ nuestro BPA del FY28e (2,27) = 16,4x. Misma base (benchmark) que los escenarios.',
        v2: { mediana_5a: 29.4, minimo_5a: 19.1, media_larga: 27.8, excluidos: 'Historia AL CIERRE (precio de marzo ÷ BPA benchmark del mismo ejercicio): FY21 34,36 ÷ 1,031 = 33,3x; FY22 38,72 ÷ 1,245 = 31,1x; FY23 32,90 ÷ 1,351 = 24,4x; FY24 43,67 ÷ 1,455 = 30,0x; FY25 46,19 ÷ 1,569 = 29,4x; FY26 34,40 ÷ 1,798 = 19,1x; FY20 27,82 ÷ 1,030 = 27,0x. Mediana FY22-FY26 29,4x; mínimo 19,1x; media FY20-FY26 27,8x. Ningún año excluido.' },
      },
      comparables_per: { mediana: 19.2 },
      consenso: { bpa_ano1: 1.99, bpa_ano2: 2.27, objetivo_medio: 49.02, objetivo_min: 32.47, objetivo_max: 63.30, analistas: 18, tendencia_3m: 'recortes leves', fuente: 'Yahoo Finance (earningsTrend y financialData, mañana del 18-nov-2026) [D2]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.objetivo12m_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  resumen: T.resumen ?? null,
  rentabilidad: { comentario: T.rentabilidad_comentario ?? null, confianza: 'Alta' },
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  fuentes: T.fuentes ?? [],
  huecos: T.huecos ?? [],
};
