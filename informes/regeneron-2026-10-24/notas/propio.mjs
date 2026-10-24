// Parte del analista (Regeneron, corte 2026-10-24). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

// BPA AJUSTADO (no GAAP) diluido: la empresa lo publica cada trimestre, el consenso de Yahoo y los comparables están en
// ajustado, y el GAAP lo mueven las ganancias y pérdidas de valor de su cartera de acciones (−946,1 M de ganancias en 2025) [A5].
// Fórmula con la proyección del DCF:
//   (ventas × (margen EBITDA − amortización) + pagos en acciones + amortización de intangibles + otros ingresos ajustados)
//   × (1 − tipo) ÷ acciones diluidas.
// Calibrado con 2025 real: (3.577,9 de resultado operativo + 993,7 + 155 del bono de revisión prioritaria + 25,8 de litigios
// + 131,7 + 706,7 de otros ingresos ajustados) × (1 − 12,6 %) ÷ 110,3 = 44,31 USD, igual que el publicado [A5].
// Pagos en acciones: 1.050 M en 2027e y 1.100 M en 2028e (993,7 en 2025, +5 % al año); intangibles: 185 y 200 M (licencias
// nuevas); otros ingresos ajustados (intereses de la caja): 660 y 650 M (≈ 3,6 % sobre ≈ 18.000 M de caja, sin plusvalías).
// El cobro inicial de 1.000 M de Sanofi (oct-2026) es no recurrente y NO entra en el BPA: va al puente.
// Acciones: 108,0 M diluidas del 2T26 (101,14 M ordinarias + 1,82 M de clase A + dilución de opciones), SIN recompras nuevas
// aunque quedan 2.500 M autorizados [A2, D5].
const V25 = 14342.9, ACC = 108.0;
const r1 = (x) => Math.round(x * 10) / 10;
const r2 = (x) => Math.round(x * 100) / 100;
const bpa = (v, margen, am, extra, t) => r2(((v * (margen - am) / 100 + extra) * (1 - t / 100)) / ACC);
const v26 = V25 * (1 + S.anios[0].crecimiento_pct / 100);
const a1 = S.anios[1], a2 = S.anios[2];
const v27 = (dg) => v26 * (1 + (a1.crecimiento_pct + dg) / 100);
const v28 = (dg) => v27(dg) * (1 + (a2.crecimiento_pct + dg) / 100);
const caso = (dg, dm) => bpa(v28(dg), a2.margen_ebitda_pct + dm, a2.amortizacion_pct_ventas, 1100 + 200 + 650, a2.tasa_impositiva_pct);
const bpa27 = bpa(v27(0), a1.margen_ebitda_pct, a1.amortizacion_pct_ventas, 1050 + 185 + 660, a1.tasa_impositiva_pct);
// 2026e: 1S26 real 23,72 USD (11,47 + 12,25) + 2S ≈ 31,6 (ventas ≈ 9.690 M, margen operativo GAAP ≈ 30,7 % sin la deuda de
// desarrollo de Sanofi, + ≈ 530 M de pagos en acciones, ≈ 90 M de intangibles y ≈ 330 M de otros ingresos, tipo del 13 %,
// 108 M de acciones; incluye el cargo de I+D adquirida de 22 M del 3T) = 55,3. El consenso (58,85 [D2]) parece incluir parte
// del cobro inicial de Sanofi.
const BPA26 = 55.3;
const cs = S.casos;
export const BPA = { '2026': BPA26, '2027': bpa27, Bajista: caso(cs[0].ajuste_crecimiento_pp, cs[0].ajuste_margen_pp), Base: caso(0, 0), Alcista: caso(cs[2].ajuste_crecimiento_pp, cs[2].ajuste_margen_pp) };
BPA['2028'] = BPA.Base;

// Historia del PER ADELANTADO (cierre de cada año ÷ BPA ajustado diluido real del año siguiente) [D1, A5, A8-A13].
// Excluido el cierre de 2020: el BPA de 2021 (74,66) está inflado por el anticuerpo de la COVID (REGEN-COV).
const cierres = { 2017: 375.96, 2018: 373.50, 2019: 375.48, 2020: 483.11, 2021: 631.52, 2022: 721.49, 2023: 878.29, 2024: 712.33, 2025: 771.87 };
const bpaR = { 2017: 16.32, 2018: 22.84, 2019: 24.67, 2020: 31.47, 2021: 74.66, 2022: 44.98, 2023: 43.79, 2024: 45.62, 2025: 44.31, 2026: BPA26 };
const COVID = (a) => +a === 2021;
const adel = Object.keys(cierres).filter((a) => !COVID(+a + 1) && bpaR[+a + 1] > 0).map((a) => [a, r1(cierres[a] / bpaR[+a + 1])]);
const u5 = adel.slice(-5).map((x) => x[1]).sort((a, b) => a - b);
const alCierre = Object.keys(cierres).filter((a) => !COVID(a) && bpaR[a] > 0).map((a) => [a, r1(cierres[a] / bpaR[a])]);
const c5 = alCierre.slice(-5).map((x) => x[1]).sort((a, b) => a - b);
export const PRECIO = 805.02;
export const PER = {
  actual: r1(PRECIO / BPA['2027']),
  mediana_5a: u5[2], minimo_5a: u5[0], media_larga: r1(adel.reduce((s, x) => s + x[1], 0) / adel.length), adel,
  v2: { mediana_5a: c5[2], minimo_5a: c5[0], media_larga: r1(alCierre.reduce((s, x) => s + x[1], 0) / alCierre.length), alCierre },
};
const fmt = (l) => l.map(([a, p]) => `${a} ${String(p).replace('.', ',')}x`).join('; ');
const n2 = (x) => String(x).replace('.', ',');

export default {
  meta: {
    fecha_corte: '2026-10-24', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
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
    // Puente a 30-jun-2026 [A2]: deuda financiera 1.986,6 M (bonos de 2030 y 2050), arrendamiento financiero 720 M (el
    // edificio de Tarrytown) y caja, inversiones a corto y largo plazo 17.822,9 M. otros_ajustes = −850 M: el cobro inicial de
    // 1.000 M de la sexta enmienda con Sanofi (1-oct-2026) después de un 15 % de impuestos, que no está en el BPA. Las
    // recompras del 3T no se restan: las acciones (108,0 M) son las del 2T.
    puente: { fecha: '2026-06-30', deuda_financiera: 1986.6, arrendamientos: 720, caja: 17822.9, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: -850 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D4]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: BPA[e], multiplo: null, precio: null, justificacion: T.casos_12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', actual: PER.actual, mediana_5a: PER.mediana_5a, minimo_5a: PER.minimo_5a, media_larga: PER.media_larga,
        excluidos: `Historia ADELANTADA en BPA ajustado diluido (el que publica la empresa y usa el consenso): precio de cierre de cada año (Yahoo [D1]) ÷ BPA real del año siguiente [A5, A8-A13]; para el cierre de 2025 (771,87), ÷ nuestro 2026e (${n2(BPA26)}). Serie: ${fmt(adel)}. Excluido el cierre de 2020: el BPA de 2021 (74,66 USD) está inflado por el anticuerpo de la COVID. Mediana y mínimo de los 5 últimos años válidos (2021-2025); media de los ${adel.length} años válidos de 2017-2025. PER actual = precio (805,02 USD, cierre del 23-oct-2026) ÷ nuestro BPA de 2027e (${n2(bpa27)}), el ejercicio siguiente, la misma base que la historia.`,
        v2: { mediana_5a: PER.v2.mediana_5a, minimo_5a: PER.v2.minimo_5a, media_larga: PER.v2.media_larga, excluidos: `Historia AL CIERRE (precio de cierre ÷ BPA ajustado del mismo año): ${fmt(PER.v2.alCierre)}. Excluido 2021 (BPA de la COVID). Mediana y mínimo de los 5 últimos años válidos.` },
      },
      comparables_per: { mediana: 15.7 },
      consenso: { bpa_ano1: 58.85, bpa_ano2: 52.03, objetivo_medio: 867.33, objetivo_min: 730, objetivo_max: 1030, analistas: 28, tendencia_3m: 'subidas', fuente: 'Yahoo Finance, 24-oct-2026: BPA ajustado de 2026 de 58,85 USD (28 analistas, parece incluir parte del cobro de Sanofi) y de 2027 de 52,03 (solo 9 analistas); objetivo medio de 867,33 USD; 19 comprar, 8 mantener y 1 vender [D2]' },
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
