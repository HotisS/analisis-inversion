// Parte del analista (Alcon, corte 2026-10-14). Citas con la letra de la nota: [A3] = fuente 3 de A.json.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

export default {
  meta: {
    fecha_corte: '2026-10-14', divisa: 'USD', divisa_cotizacion: 'CHF', tipo_cambio: 1.237, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF (IASB)', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
  },
  _parches: [...(T.parches ?? [])],
  huecos_resueltos: T.huecos_resueltos ?? [],
  financieros: { comentario: T.financieros?.comentario ?? null, ajustes: T.financieros?.ajustes ?? null },
  capital: { comentario: T.capital?.comentario ?? null },
  balance: { otros_pasivos: T.balance?.otros_pasivos ?? null, comentario: T.balance?.comentario ?? null },
  multiplos_historicos: { comentario: T.multiplos_comentario ?? null },
  comparables: { comentario: T.comparables_comentario ?? null },
  consenso: { guidance: 'Guía de 2026 (10-ago-2026, segunda subida del año): ventas +5 % a +7 % a tipo constante, margen operativo core +90 a +190 pb y BPA core +12 % a +15 % a tipo constante (antes +10 % a +13 %; +9 % a +12 % en febrero). Aranceles de 40-90 M USD en el coste de ventas, con un reembolso de unos 60 M esperado en el 3T26; programa de eficiencia de 100 M de ahorro anual (50 M en 2026) con un coste de 150 M [A1, A14]. No hay plan a medio plazo con cifras en las fuentes consultadas.' },
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
    // Deuda financiera de cierre de 2025 (sin vencimientos relevantes conocidos en 2026) y caja del 30-jun-2026; acciones (491 M)
    // estimadas tras las recompras del primer semestre de 2026.
    puente: { fecha: '2026-06-30', deuda_financiera: 4737, arrendamientos: 0, caja: 1355, minoritarios: 1, pensiones: 0, asociadas: 0, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth [D21]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: [
        { escenario: 'Bajista', metrica: 'PER 2028e (BPA core)', beneficio_por_accion: 3.93, multiplo: null, precio: null, justificacion: 'Ventas de 12.153 M (−1,5 puntos de crecimiento en 2027-28: cataratas flojas y pérdida de cuota en lentes intraoculares) con margen EBITDA del 26,8 %: EBIT core de 2.516 M (20,7 %), 175 M de gastos financieros netos, impuesto del 19 % y 483 M de acciones (recompra anunciada de 1.500 M).' },
        { escenario: 'Base', metrica: 'PER 2028e (BPA core)', beneficio_por_accion: 4.26, multiplo: null, precio: null, justificacion: 'Ventas de 12.505 M (+7 % en 2026 y +6 % en 2027-28, en línea con la guía y el mercado) y margen EBITDA del 27,8 %: EBIT core de 2.714 M (21,7 %), 175 M de gastos financieros, impuesto del 19 % y 483 M de acciones con la recompra anunciada de 1.500 M en tres años.' },
        { escenario: 'Alcista', metrica: 'PER 2028e (BPA core)', beneficio_por_accion: 4.51, multiplo: null, precio: null, justificacion: 'Ventas de 12.741 M (+1 punto de crecimiento por Unity VCS y las lentes avanzadas) y margen EBITDA del 28,6 %: EBIT core de 2.867 M (22,5 %), mismos gastos financieros, impuesto y acciones.' },
      ],
      per_historico: { base: 'adelantado', actual: 16.7, mediana_5a: 25.6, minimo_5a: 22.6, media_larga: 26.2, excluidos: 'PER adelantado = precio de cierre del año (NYSE, USD) ÷ BPA core del año siguiente, la misma base que los escenarios: 2020 30,2x (64,95 ÷ 2,15); 2022 25,0x (68,55 ÷ 2,74); 2023 25,6x (78,12 ÷ 3,05); 2024 27,7x (84,89 ÷ 3,07); 2025 22,6x (78,81 ÷ 3,49, nuestro BPA de 2026e). Excluidos: 2019 (el BPA de 2020, 1,04, está hundido por la pandemia) y 2021 (38,4x, burbuja de tecnología médica). Actual = 64,75 ÷ 3,87 (nuestro BPA core de 2027e) [D9, D10, A2, A4, A5, A6].' },
      comparables_per: { mediana: 21.3 },
      consenso: { bpa_ano1: 3.48, bpa_ano2: 3.87, objetivo_medio: 85.24, objetivo_min: 62, objetivo_max: 107.4, analistas: 26, tendencia_3m: 'estables', fuente: 'MarketBeat, Stock Analysis y Walnut Invest [D4, D5, D6]' },
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
