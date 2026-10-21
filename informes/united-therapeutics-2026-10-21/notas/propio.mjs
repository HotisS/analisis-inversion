// Parte del analista (United Therapeutics, corte 2026-10-21). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

// BPA GAAP diluido (la empresa no publica BPA ajustado y el consenso de Yahoo está en GAAP), con la proyección del DCF:
//   (ventas × margen EBITDA − amortización + ingresos de la caja) × (1 − tipo) ÷ acciones diluidas.
// Calibrado con 2025 real: (1.578,1 − 85,6 + 221,4) × (1 − 22,1 %) ÷ 47,9 = 27,87 frente a 27,86 publicado [A1].
// Ingresos de la caja: solo intereses (≈ 3,5 % sobre la caja media, sin plusvalías de participadas): 160 M en 2027e y 195 M
// en 2028e (caja de 3.803 M a 30-jun-2026 − 500 M de recompras del 3T + 320 M de Liquidia + flujo libre sin recompras nuevas).
// El cobro de Liquidia (330,4 M − 10 M) es no recurrente y NO entra en el BPA.
// Acciones: 42,9 M a 4-sep-2026 − 0,72 M de la entrega inicial de la ASR de septiembre − ≈ 0,22 M pendientes de entregar
// = 41,96 M básicas + 3,2 M de dilución de opciones (45,8 diluidas frente a 42,6 básicas en el 2T26) ≈ 45,2 M, SIN recompras
// no anunciadas [D5, D6].
const V25 = 3182.7, ACC = 45.2;
const r1 = (x) => Math.round(x * 10) / 10;
const r2 = (x) => Math.round(x * 100) / 100;
const bpa = (v, margen, am, int, t) => r2(((v * (margen - am) / 100 + int) * (1 - t / 100)) / ACC);
const v26 = V25 * (1 + S.anios[0].crecimiento_pct / 100);
const a1 = S.anios[1], a2 = S.anios[2];
const v27 = (dg) => v26 * (1 + (a1.crecimiento_pct + dg) / 100);
const v28 = (dg) => v27(dg) * (1 + (a2.crecimiento_pct + dg) / 100);
const caso = (dg, dm) => bpa(v28(dg), a2.margen_ebitda_pct + dm, a2.amortizacion_pct_ventas, 195, a2.tasa_impositiva_pct);
const bpa27 = bpa(v27(0), a1.margen_ebitda_pct, a1.amortizacion_pct_ventas, 160, a1.tasa_impositiva_pct);
// 2026e: 1S26 real 13,09 USD (5,82 + 7,27, con un tipo del 12 %) + 2S ≈ 13,5 (ventas ≈ 1.605, margen operativo ≈ 42 %,
// intereses ≈ 70 M, tipo ≈ 18 %, 45,4 M de acciones) = 26,6; consenso 26,60 [D2]. Sin el cobro de Liquidia.
const BPA26 = 26.6;
const cs = S.casos;
export const BPA = { '2026': BPA26, '2027': bpa27, Bajista: caso(cs[0].ajuste_crecimiento_pp, cs[0].ajuste_margen_pp), Base: caso(0, 0), Alcista: caso(cs[2].ajuste_crecimiento_pp, cs[2].ajuste_margen_pp) };
BPA['2028'] = BPA.Base;

// Historia del PER ADELANTADO (cierre de cada año ÷ BPA GAAP diluido real del año siguiente) [D1, A1-A4]. 2018 excluido:
// el BPA de 2019 fue negativo (−2,39 USD) por los 800 M pagados a Arena por ralinepag, llevados a gasto de I+D.
const cierres = { 2017: 147.95, 2018: 108.90, 2019: 88.08, 2020: 151.79, 2021: 216.08, 2022: 278.09, 2023: 219.89, 2024: 352.84, 2025: 487.25 };
const bpaR = { 2018: 13.39, 2019: -2.39, 2020: 11.54, 2021: 10.06, 2022: 15.00, 2023: 19.81, 2024: 24.64, 2025: 27.86, 2026: BPA26 };
const adel = Object.keys(cierres).filter((a) => bpaR[+a + 1] > 0).map((a) => [a, r1(cierres[a] / bpaR[+a + 1])]);
const u5 = adel.slice(-5).map((x) => x[1]).sort((a, b) => a - b);
const alCierre = Object.keys(cierres).filter((a) => bpaR[a] > 0).map((a) => [a, r1(cierres[a] / bpaR[a])]);
const c5 = alCierre.slice(-5).map((x) => x[1]).sort((a, b) => a - b);
export const PRECIO = 553.88;
export const PER = {
  actual: r1(PRECIO / BPA['2027']),
  mediana_5a: u5[2], minimo_5a: u5[0], media_larga: r1(adel.reduce((s, x) => s + x[1], 0) / adel.length), adel,
  v2: { mediana_5a: c5[2], minimo_5a: c5[0], media_larga: r1(alCierre.reduce((s, x) => s + x[1], 0) / alCierre.length), alCierre },
};
const fmt = (l) => l.map(([a, p]) => `${a} ${String(p).replace('.', ',')}x`).join('; ');
const n2 = (x) => String(x).replace('.', ',');

export default {
  meta: {
    fecha_corte: '2026-10-21', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'US GAAP', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
    huecos: T.huecos ?? [],
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
    // Puente a 30-jun-2026 [A2]: caja e inversiones 3.803,4 M (efectivo, inversiones a corto y largo plazo); sin deuda; sin
    // minoritarios. otros_ajustes = −500 M de recompras del 3T26 (ASR de 477,6 M del 8-sep + 22,4 M en mercado), que ya
    // reducen las acciones, + 253 M del acuerdo con Liquidia (185 + 145,4 − 10 M, después de un 21 % de impuestos) = −247.
    // Arrendamientos operativos fuera (US GAAP, intereses en explotación).
    puente: { fecha: '2026-06-30', deuda_financiera: 0, arrendamientos: 0, caja: 3803.4, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: -247 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D4]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: BPA[e], multiplo: null, precio: null, justificacion: T.casos_12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', actual: PER.actual, mediana_5a: PER.mediana_5a, minimo_5a: PER.minimo_5a, media_larga: PER.media_larga,
        excluidos: `Historia ADELANTADA en BPA GAAP diluido (la empresa no publica ajustado; el consenso también es GAAP): precio de cierre de cada año (Yahoo [D1]) ÷ BPA real del año siguiente [A1-A4]; para el cierre de 2025 (487,25), ÷ nuestro 2026e (${n2(BPA26)}, igual que el consenso). Serie: ${fmt(adel)}. Excluido el cierre de 2018: el BPA de 2019 fue negativo (−2,39 USD) por los 800 M pagados a Arena por ralinepag, llevados a I+D. Mediana y mínimo de 2021-2025; media de los ${adel.length} años válidos de 2017-2025. PER actual = precio (553,88 USD, cierre del 20-oct-2026) ÷ nuestro BPA de 2027e (${n2(bpa27)}), el ejercicio siguiente, la misma base que la historia.`,
        v2: { mediana_5a: PER.v2.mediana_5a, minimo_5a: PER.v2.minimo_5a, media_larga: PER.v2.media_larga, excluidos: `Historia AL CIERRE (precio de cierre ÷ BPA del mismo año): ${fmt(PER.v2.alCierre)}. Excluido 2019 (pérdida). Mediana y mínimo de 2021-2025.` },
      },
      comparables_per: { mediana: 13.2 },
      consenso: { bpa_ano1: 26.60, bpa_ano2: 31.72, objetivo_medio: 662.07, objetivo_min: 368, objetivo_max: 728, analistas: 14, tendencia_3m: 'estable', fuente: 'Yahoo Finance, 21-oct-2026: BPA de 2026 de 26,60 USD (26,91 hace 90 días) y de 2027 de 31,72 (31,49 hace 90 días); objetivo medio de 14 analistas [D2]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.objetivo_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  resumen: T.resumen ?? null,
  fuentes: T.fuentes ?? [],
  huecos: [],
};
