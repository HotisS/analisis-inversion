// Parte del analista (Halma, corte 2026-10-14). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

export default {
  meta: {
    fecha_corte: '2026-10-14', divisa: 'GBP', divisa_cotizacion: 'GBP', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 3, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF (UK-adopted IAS)', formato_cuenta: 'funcion',
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
    // Balance de 31-mar-2026 (último publicado). Las compras de FY2027 (≈ 480 M netos) van en el capex del primer año del DCF, no aquí.
    puente: { fecha: '2026-03-31', deuda_financiera: 958.8, arrendamientos: 109.3, caja: 189.8, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth [D27]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: 'FY2029e',
      casos: [
        { escenario: 'Bajista', metrica: 'PER', beneficio_por_accion: 1.1110, multiplo: null, precio: null, justificacion: 'Ventas de 3.115 M en FY2029 (−3 puntos de crecimiento al año: la fotónica se frena y el gran cliente diversifica proveedores) y margen EBITDA del 24,5 % (−2 puntos): EBIT de 601 M, 45 M de gasto financiero, impuesto del 24,5 % y 378 M de acciones: BPA de 1,11 GBP.' },
        { escenario: 'Base', metrica: 'PER', beneficio_por_accion: 1.3507, multiplo: null, precio: null, justificacion: 'Ventas de 3.386 M (FY2027 +14 % con la guía y las compras; después 7-7,5 %, rebajado para pasar la prueba de sostenibilidad) y margen EBITDA del 26,5 %, coherente con la guía de margen EBIT ajustado de 23,5-24 %: EBIT de 721 M tras 5,2 % de amortizaciones (incluida la de intangibles comprados), 45 M de intereses, impuesto del 24,5 % y 378 M de acciones sin recompras.' },
        { escenario: 'Alcista', metrica: 'PER', beneficio_por_accion: 1.4812, multiplo: null, precio: null, justificacion: 'Ventas de 3.527 M (+1,5 puntos al año: la fotónica sigue al 30 % y las compras se integran bien) y margen EBITDA del 27,5 %: EBIT de 787 M y BPA de 1,48 GBP.' },
      ],
      per_historico: { actual: 29.1, mediana_5a: 33.3, minimo_5a: 33.0, media_larga: 34.9, excluidos: 'Sin exclusiones, pero solo tres años con precio fiable: FY2024 33,3x; FY2025 33,0x; FY2026 38,4x (precio de marzo de la línea HLMAF en USD de Digrin entre el tipo GBP/USD de Pound Sterling Live, sobre el BPA estatutario) [D9, D10, D11, D12, A1, A2, A3]. FY2022-23 sin precio en GBP. Wisesheets da una media de diez años de ≈ 36x [D29]. Actual = 36,34 ÷ 1,2498 (nuestro BPA de FY2028e).' },
      comparables_per: { mediana: 27.45 },
      consenso: { bpa_ano1: 1.16, bpa_ano2: 1.26, objetivo_medio: 48.09, objetivo_min: 30.50, objetivo_max: 46.00, analistas: 10, tendencia_3m: 'estables', fuente: 'MarketScreener y MarketBeat [D5, D4]' },
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
