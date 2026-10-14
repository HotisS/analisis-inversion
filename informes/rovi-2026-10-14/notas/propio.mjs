// Parte del analista (Rovi, corte 2026-10-14). Citas con la letra de la nota: [A3] = fuente 3 de A.json.
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
    // Solo se publica la caja neta (22,5 M a 30-jun-26): va como caja, sin deuda bruta separada.
    puente: { fecha: '2026-06-30', deuda_financiera: 0, arrendamientos: 0, caja: 22.5, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500, prima implícita de Damodaran (válida para mercados desarrollados)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx, columna «ERP (T12m with sustainable payout)» [D10]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: [
        { escenario: 'Bajista', metrica: 'PER', beneficio_por_accion: 2.78, multiplo: null, precio: null, justificacion: 'El contrato de jeringas se retrasa otra vez y las heparinas siguen perdiendo precio: ventas de 852 M en 2028e (−4 puntos de crecimiento en 2027 y 2028) y margen EBITDA del 26,5 %. EBIT de 187 M, −1,5 M de financiero, impuesto del 23 % y 51,24 M de acciones.' },
        { escenario: 'Base', metrica: 'PER', beneficio_por_accion: 3.41, multiplo: null, precio: null, justificacion: 'Phoenix aporta su mínimo de BMS todo el año, el contrato de jeringas arranca en 2027 y Okedi sigue creciendo: ventas de 918 M (+11 % en 2027 y +8 % en 2028) con margen EBITDA del 29,5 %, el de 2025 más la ocupación. EBIT de 229 M, −1,5 M de financiero, impuesto del 23 % y 175 M de beneficio sobre 51,24 M de acciones.' },
        { escenario: 'Alcista', metrica: 'PER', beneficio_por_accion: 3.75, multiplo: null, precio: null, justificacion: 'Llenado de jeringas a plena carga y nuevos clientes en Phoenix: ventas de 952 M y margen del 31 %, cerca del de 2023 sin la vacuna.' },
      ],
      per_historico: { actual: 19.2, mediana_5a: 23.2, minimo_5a: 18.3, media_larga: 21.7, excluidos: '2019-2020 (BPA de 0,44-1,10 EUR antes de la escala actual, PER de 34-55x) y 2021-2022 (BPA de pico por la vacuna de Moderna, 2,76 y 3,73 EUR). Quedan 2023 18,3x (60,20 ÷ 3,29), 2024 23,6x (62,95 ÷ 2,67) y 2025 23,2x (63,45 ÷ 2,74) [D7, A4, A6]. Actual = 58,94 ÷ 3,07 (nuestro BPA de 2027e). La media larga es la de esos tres años: no hay ocho limpios.' },
      comparables_per: { mediana: 16.95 },
      consenso: { bpa_ano1: 2.56, bpa_ano2: 3.40, objetivo_medio: 75.48, objetivo_min: 64.2, objetivo_max: 86.0, analistas: null, tendencia_3m: 'recortes', fuente: 'MarketScreener (BPA), Reuters vía Estrategias de Inversión y TradingView (objetivos) [D2, D4, D6]' },
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
