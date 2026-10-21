// Parte del analista (Synopsys, corte 2026-10-21). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

// BPA NO GAAP (definición de la empresa: sin amortización de intangibles comprados, remuneración en acciones, reestructuración,
// costes de compras ni plusvalías de ventas de negocios), con la proyección del DCF:
//   resultado operativo no GAAP = ventas × (margen EBITDA del DCF + remuneración en acciones % − depreciación 2,2 %)
//   − intereses y otros no GAAP; × (1 − 18 % de impuesto no GAAP, el de la guía) ÷ acciones diluidas.
// Calibrado con la guía de FY2026 (ventas 9.715, SBC 9,8 %, intereses −483, 193 M → 15,08; guía 15,04-15,10) y de FY2027
// (ventas +14,8 %, SBC 8,7 %, intereses −460, 191 M → 19,09; guía 19,04-19,12, consenso 18,73).
// Acciones de FY2028e: 192,5 M (191 guiados en FY2027 tras la recompra acelerada de 1.000 M + ≈ 0,8 % de dilución por la
// remuneración en acciones), SIN recompras no anunciadas (la empresa dice que devolverá hasta el 50 % del flujo libre).
const V25 = 7054.2, DEP = 2.2, SBC = { FY2026: 9.8, FY2027: 8.7, FY2028: 8.5 };
const r1 = (x) => Math.round(x * 10) / 10;
const r2 = (x) => Math.round(x * 100) / 100;
const bpa = (v, mDcf, sbc, interes, acc) => r2(((v * (mDcf + sbc - DEP) / 100) - interes) * 0.82 / acc);
const v26 = V25 * (1 + S.anios[0].crecimiento_pct / 100);
const caso = (dg, dm) => {
  const v27 = v26 * (1 + (S.anios[1].crecimiento_pct + dg) / 100);
  const v28 = v27 * (1 + (S.anios[2].crecimiento_pct + dg) / 100);
  return bpa(v28, S.anios[2].margen_ebitda_pct + dm, SBC.FY2028, 400, 192.5);
};
const bpa26 = bpa(v26, S.anios[0].margen_ebitda_pct, SBC.FY2026, 483, 193.0);
const bpa27 = bpa(v26 * (1 + S.anios[1].crecimiento_pct / 100), S.anios[1].margen_ebitda_pct, SBC.FY2027, 460, 191.0);
export const BPA = { FY2026: bpa26, FY2027: bpa27, Bajista: caso(-4.0, -2.0), Base: caso(0, 0), Alcista: caso(2.0, 1.0) };
BPA.FY2028 = BPA.Base;

// Historia del PER en la base del BPA NO GAAP publicado [A5, A4]: FY2022 con SIG (8,90; la que veía el mercado), FY2023 11,19
// (publicado, con SIG), FY2024 13,20 (sin SIG), FY2025 12,91 (con Ansys); FY2026: nuestro FY2026e. Cierres a 31-oct [D1].
const cierres = { FY2018: 89.53, FY2019: 135.75, FY2020: 213.86, FY2021: 333.18, FY2022: 292.55, FY2023: 469.44, FY2024: 513.61, FY2025: 453.82 };
const bpaNg = { FY2018: 3.91, FY2019: 4.56, FY2020: 5.55, FY2021: 6.84, FY2022: 8.90, FY2023: 11.19, FY2024: 13.20, FY2025: 12.91, FY2026: bpa26 };
const sig = (a) => 'FY' + (+a.slice(2) + 1);
const adel = Object.keys(cierres).map((a) => [a, r1(cierres[a] / bpaNg[sig(a)])]);
const u5 = adel.slice(-5).map((x) => x[1]).sort((a, b) => a - b), u8 = adel.slice(-8).map((x) => x[1]);
const alCierre = Object.keys(cierres).map((a) => [a, r1(cierres[a] / bpaNg[a])]);
const c5 = alCierre.slice(-5).map((x) => x[1]).sort((a, b) => a - b);
export const PRECIO = 447.62;
// PER actual en la MISMA base que la historia (precio ÷ BPA de los 12 meses siguientes): a 20-oct-2026 quedan 0,35 meses de
// FY2026 y entran 11,65 de FY2027 → BPA de los próximos 12 meses = 0,35/12 × FY2026e + 11,65/12 × FY2027e.
export const BPA_NTM = r2(0.35 / 12 * BPA.FY2026 + 11.65 / 12 * BPA.FY2027);
export const PER = {
  actual: r1(PRECIO / BPA_NTM), solo_fy2027: r1(PRECIO / BPA.FY2027), solo_fy2028: r1(PRECIO / BPA.FY2028),
  mediana_5a: u5[2], minimo_5a: u5[0], media_larga: r1(u8.reduce((s, x) => s + x, 0) / u8.length), adel,
  v2: { mediana_5a: c5[2], minimo_5a: c5[0], media_larga: r1(alCierre.reduce((s, x) => s + x[1], 0) / alCierre.length), alCierre },
};
const fmt = (l) => l.map(([a, p]) => `${a} ${String(p).replace('.', ',')}x`).join('; ');
const n2 = (x) => String(x).replace('.', ',');

export default {
  meta: {
    fecha_corte: '2026-10-21', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 10, etiqueta_ejercicio: 'fin', normas_contables: 'US GAAP', formato_cuenta: 'funcion',
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes_comentario ?? null, confianza: 'Media' },
  valoracion: {
    // Puente a 31-jul-2026 [A2]: deuda financiera 10.037 (bonos de 10.000 M + coberturas diferidas y otros); caja 3.608 (con
    // 1,4 de inversiones a corto); minoritarios −1,2 (≈ 0). otros_ajustes = 1.000 M de caja pagada el 5-oct-2026 por la recompra
    // acelerada (las acciones, 189,9 M, ya restan la entrega inicial de ≈ 1,7 M) [A10] MENOS ≈ 400 M de flujo libre generado
    // del 1-ago al 20-oct (4T26 implícito en la guía: 2.600 − 2.143 de nueve meses ≈ 457 M × 81/92 días) [A3], porque el DCF
    // solo cuenta la fracción de FY2026e que queda (0,03). Neto: 600 M. Arrendamientos operativos fuera (US GAAP).
    puente: { fecha: '2026-07-31', deuda_financiera: 10037, arrendamientos: 0, caja: 3608, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 600 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D5]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: 'FY2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER FY2028e', beneficio_por_accion: BPA[e], multiplo: null, precio: null, justificacion: T.casos_12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', actual: PER.actual, mediana_5a: PER.mediana_5a, minimo_5a: PER.minimo_5a, media_larga: PER.media_larga,
        excluidos: `Historia ADELANTADA en BPA NO GAAP de la empresa (la misma base que nuestros casos y que el consenso): precio de cierre de cada ejercicio (31 de octubre, Yahoo [D1]) ÷ BPA no GAAP real del ejercicio siguiente [A5, A4] (FY2023 con SIG, 11,19, el publicado entonces; FY2024 13,20 sin SIG; FY2025 12,91 con Ansys); para el cierre de FY2025 (453,82), ÷ nuestro FY2026e (${n2(bpa26)}, en la guía de 15,04-15,10). Serie: ${fmt(adel)}. Mediana y mínimo de FY2021-FY2025; media de FY2018-FY2025. Sin exclusiones: el BPA no GAAP no tiene pérdidas. El BPA GAAP no sirve para la historia (plusvalías de SIG y OSG, amortización de Ansys). PER actual = precio (447,62 USD, cierre del 20-oct-2026) ÷ nuestro BPA de los próximos 12 meses (${n2(BPA_NTM)} = 0,35/12 de FY2026e ${n2(bpa26)} + 11,65/12 de FY2027e ${n2(bpa27)}), la misma base que la historia. Con solo FY2027e sería ${n2(PER.solo_fy2027)}x y con solo FY2028e ${n2(PER.solo_fy2028)}x.`,
        v2: { mediana_5a: PER.v2.mediana_5a, minimo_5a: PER.v2.minimo_5a, media_larga: PER.v2.media_larga, excluidos: `Historia AL CIERRE (precio de cierre ÷ BPA no GAAP del mismo ejercicio): ${fmt(PER.v2.alCierre)}. Mediana y mínimo de FY2021-FY2025, media de FY2018-FY2025.` },
      },
      comparables_per: { mediana: 24.6 },
      consenso: { bpa_ano1: 15.14, bpa_ano2: 18.73, objetivo_medio: 586.95, objetivo_min: 475, objetivo_max: 700, analistas: 25, tendencia_3m: 'subidas', fuente: 'Yahoo Finance, 21-oct-2026: BPA no GAAP FY2026 de 15,14 USD (22 analistas; 14,77 hace 90 días) y FY2027 de 18,73 (18 analistas; 17,28 hace 90 días); objetivo medio de 25 analistas [D2]' },
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
  fuentes: [
    { id: 1, titulo: 'Cadence Design Systems: análisis value del 14-oct-2026 (mismo sector; referencia de mercado, foso, riesgo de IA y tratamiento de la remuneración en acciones)', editor: 'Repositorio de análisis (informes/cadence-2026-10-14)', tipo: 'Analistas', fecha: '2026-10-14', url: 'informes/cadence-2026-10-14/' },
    { id: 2, titulo: 'Tipos de cambio de referencia del BCE (1,1234 USD por EUR, 21-oct-2026)', editor: 'Banco Central Europeo', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml' },
  ],
  huecos: [],
};
