// Parte del analista (SHIFT, corte 2026-10-21). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

// BPA básico J-GAAP (después de amortizar el fondo de comercio; la base de la guía de BPA básico y del consenso) con la
// proyección del DCF:
//   resultado operativo = ventas × (margen EBITDA del DCF − amortización del DCF) − 450 M de gastos financieros netos
//   (34.713 M de deuda a ≈ 1,2-1,3 %), sin participadas ni extraordinarios, × (1 − tipo del DCF) ÷ acciones.
// Calibrado con la guía de FY2027: 188.000 M × 11,5 % − 450 → 21.170 M × 0,63 = 13.337 M ÷ 255,62 M = 52,18 JPY (guía 52,16
// con 190.000 M de ventas; consenso 54,06).
// Acciones: 255,62 M en circulación a 31-ago-2026 (sin autocartera ni el ESOP), SIN recompras nuevas: la política de julio
// devuelve ≈ 10 % «flexible» pero sin importe anunciado.
const ACC = 255.62, FIN = 450;
const bpa = (v, margen, am, tasa) => Math.round(((v * (margen - am) / 100 - FIN) * (1 - tasa / 100)) / ACC * 100) / 100;
const [a27, a28] = S.anios;
const v27 = 161600 * (1 + a27.crecimiento_pct / 100);
const caso = (dg, dm) => {
  const v28 = v27 * (1 + (a28.crecimiento_pct + dg) / 100);
  return { FY2027: bpa(v27, a27.margen_ebitda_pct, a27.amortizacion_pct_ventas, a27.tasa_impositiva_pct), FY2028: bpa(v28, a28.margen_ebitda_pct + dm, a28.amortizacion_pct_ventas, a28.tasa_impositiva_pct) };
};
const cs = Object.fromEntries(S.casos.map((c) => [c.escenario, c]));
const cb = caso(0, 0), cbaj = caso(cs.Bajista.ajuste_crecimiento_pp, cs.Bajista.ajuste_margen_pp), calc_ = caso(cs.Alcista.ajuste_crecimiento_pp, cs.Alcista.ajuste_margen_pp);
export const BPA = { FY2027: cb.FY2027, FY2028: cb.FY2028, Bajista: cbaj.FY2028, Base: cb.FY2028, Alcista: calc_.FY2028 };
export const VENTAS = { FY2027: Math.round(v27), FY2028: Math.round(v27 * (1 + a28.crecimiento_pct / 100)) };

// Historia del PER [D1]: cierres del 31 de agosto (o último día hábil), ajustados por el split 15:1 de 2025.
// BPA básico real de cada ejercicio: FY2019 65,54/15 y FY2020 104,50/15 (tanshin de FY2020 [P1]); FY2021-FY2025 del resumen
// de cinco años del yuho [A8]; FY2026 sin la pérdida de Rise por puesta en equivalencia (7.430 + 3.861 = 11.291 M ÷ 258,73 M
// de acciones medias = 43,64; publicado 28,72), porque es una pérdida que no se repite y nuestros escenarios no la llevan.
const cierres = { FY2018: 325.33, FY2019: 360, FY2020: 818, FY2021: 1676, FY2022: 1352.67, FY2023: 2000, FY2024: 909.33, FY2025: 1530, FY2026: 955.9 };
const bpaReal = { FY2019: 4.37, FY2020: 6.97, FY2021: 10.85, FY2022: 18.85, FY2023: 23.64, FY2024: 19.43, FY2025: 33.93, FY2026: 43.64 };
const r1 = (x) => Math.round(x * 10) / 10;
const r2 = (x) => Math.round(x * 100) / 100;
const sig = (a) => 'FY' + (+a.slice(2) + 1);
const adel = Object.keys(cierres).filter((a) => bpaReal[sig(a)]).map((a) => [a, r1(cierres[a] / bpaReal[sig(a)])]);
const u5 = adel.slice(-5).map((x) => x[1]).sort((a, b) => a - b), u8 = adel.slice(-8).map((x) => x[1]);
// Al cierre (v2): precio ÷ BPA del mismo ejercicio; FY2021 (154,5x) fuera por ≥ 150x.
const alCierreTodo = Object.keys(cierres).filter((a) => bpaReal[a]).map((a) => [a, r1(cierres[a] / bpaReal[a])]);
const alCierre = alCierreTodo.filter(([, p]) => p < 150);
const c5 = alCierre.slice(-5).map((x) => x[1]).sort((a, b) => a - b);
export const PRECIO = 1056.5;
// PER actual en la MISMA base que la historia (precio ÷ BPA de los 12 meses siguientes): a 21-oct-2026 quedan 10,3 meses de
// FY2027 (hasta el 31-ago-2027) y entran 1,7 de FY2028.
export const BPA_NTM = r2(10.3 / 12 * BPA.FY2027 + 1.7 / 12 * BPA.FY2028);
export const PER = {
  actual: r1(PRECIO / BPA_NTM), solo_fy2027: r1(PRECIO / BPA.FY2027), solo_fy2028: r1(PRECIO / BPA.FY2028),
  mediana_5a: (u5.length % 2 ? u5[(u5.length - 1) / 2] : r1((u5[u5.length / 2 - 1] + u5[u5.length / 2]) / 2)), minimo_5a: u5[0], media_larga: r1(u8.reduce((s, x) => s + x, 0) / u8.length), adel,
  v2: { mediana_5a: c5[2], minimo_5a: c5[0], media_larga: r1(alCierre.reduce((s, x) => s + x[1], 0) / alCierre.length), alCierre, alCierreTodo },
};
const fmt = (l) => l.map(([a, p]) => `${a} ${String(p).replace('.', ',')}x`).join('; ');
const n2 = (x) => String(x).replace('.', ',');

export default {
  meta: {
    fecha_corte: '2026-10-21', divisa: 'JPY', divisa_cotizacion: 'JPY', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 8, etiqueta_ejercicio: 'fin', normas_contables: 'J-GAAP', formato_cuenta: 'funcion',
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: todos los segmentos son servicios de TI para los mismos clientes japoneses, con la misma economía (horas de personas por proyecto) y solo dos años de cifras por segmento [A14].', confianza: 'Alta' },
  valoracion: {
    // Puente a 31-ago-2026 [A1]: préstamos 7.175 + 27.538 = 34.713; caja 31.097; minoritarios 145; pensiones 3.477 (pasivo
    // por prestaciones de jubilación, deuda de facto). asociadas = 33 % de Rise Consulting Group a precio de mercado del
    // 21-oct (8.837 M × 33 % = 2.916 [D12]) + resto de inversiones financieras a valor contable (4.961 − ≈ 3.732 de Rise en
    // libros = 1.229) = 4.145. otros_ajustes = dividendo de 4,53 JPY con registro 31-ago-2026 y pago 26-nov (1.172 M): la
    // caja de agosto lo incluye y quien compra hoy ya no lo cobra.
    puente: { fecha: '2026-08-31', deuda_financiera: 34713, arrendamientos: 0, caja: 31097, minoritarios: 145, pensiones: 3477, asociadas: 4145, otros_ajustes: 1172 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D5]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: 'FY2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER FY2028e', beneficio_por_accion: BPA[e], multiplo: null, precio: null, justificacion: T.casos_12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', actual: PER.actual, mediana_5a: PER.mediana_5a, minimo_5a: PER.minimo_5a, media_larga: PER.media_larga,
        excluidos: `Historia ADELANTADA: precio de cierre de cada ejercicio (31 de agosto, Yahoo [D1], ajustado por el split 15:1) ÷ BPA básico real del ejercicio siguiente [A8, P1]; el BPA de FY2026 sin la pérdida por puesta en equivalencia de Rise (43,64 en vez de 28,72), que no se repite y que nuestros escenarios no llevan. Ejercicios etiquetados por el año en que terminan. Serie: ${fmt(adel)}. Mediana y mínimo de FY2021-FY2025; media de FY2018-FY2025. Sin exclusiones por pérdidas, PER ≥ 150x ni atípicos (ninguno a más de 3 veces o menos de un tercio de la mediana); la historia es de una época de crecimiento del 30-40 % y tipos cero, por eso el selector la trata como de otro régimen. El cierre de FY2026 (955,9 JPY) no entra porque aún no hay BPA real de FY2027. PER actual = precio (1.056,5 JPY, cierre del 21-oct-2026) ÷ nuestro BPA de los próximos 12 meses (${n2(BPA_NTM)} = 10,3/12 de FY2027e ${n2(BPA.FY2027)} + 1,7/12 de FY2028e ${n2(BPA.FY2028)}). Con solo FY2027e sería ${n2(PER.solo_fy2027)}x y con solo FY2028e ${n2(PER.solo_fy2028)}x.`,
        v2: { mediana_5a: PER.v2.mediana_5a, minimo_5a: PER.v2.minimo_5a, media_larga: PER.v2.media_larga, excluidos: `Historia AL CIERRE (precio de cierre ÷ BPA del mismo ejercicio; FY2026 sin la pérdida de Rise): ${fmt(PER.v2.alCierreTodo)}. Fuera FY2021 (154,5x, ≥ 150x). Mediana y mínimo de FY2022-FY2026, media de FY2019-FY2026 sin FY2021.` },
      },
      comparables_per: { mediana: 14.2 },
      consenso: { bpa_ano1: 54.06, bpa_ano2: 65.89, objetivo_medio: 984.29, objetivo_min: 780, objetivo_max: 1250, analistas: 8, tendencia_3m: 'estable', fuente: 'Yahoo Finance y MarketScreener, 20/21-oct-2026: BPA de FY2027 (año a ago-2027) de 54,06 JPY (2 analistas en Yahoo; 54,34 hace 90 días) y de FY2028 de 65,89 (6 analistas; 58,54-70,40; 65,55 hace 90 días); objetivo medio de 8 analistas (3 comprar, 5 mantener) [D2, D7]' },
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
