// Parte del analista (Capricorn Metals, corte 2026-10-21). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S, { RUTAS } from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

// BPA (beneficio subyacente; sin minoritarios ni deuda) con la proyección del DCF:
//   BPA = (ingresos × (margen EBITDA − amortización) + resultado financiero) × (1 − 30 %) ÷ 459,5 M acciones diluidas
//   (457,14 M en circulación + 1,70 M de derechos + 0,69 M de opciones) [D2, A1].
// Calibrado con FY2026: 769,3 × 62,9 % − 29,6 + ≈ 13 de intereses de la caja → 327 M × 0,7… = beneficio subyacente de 327,2 M
// y BPA subyacente diluido de 0,731 [A2]. Resultado financiero: + 12 M en FY27 (la caja baja con la obra de Mt Gibson) y
// + 3 M en FY28.
const ACC = 459.5, T_IMP = 0.30, FIN = { 0: 12, 1: 3 };
const r1 = (x) => Math.round(x * 10) / 10;
const r2 = (x) => Math.round(x * 100) / 100;
const r3 = (x) => Math.round(x * 1000) / 1000;
const bpa = (ing, i, dm = 0) => r3(((ing * (S.anios[i].margen_ebitda_pct + dm - S.anios[i].amortizacion_pct_ventas)) / 100 + FIN[i]) * (1 - T_IMP) / ACC);
const DM = { Bajista: S.casos[0].ajuste_margen_pp, Alcista: S.casos[2].ajuste_margen_pp };
export const BPA = {
  '2027e': bpa(RUTAS.base[0], 0),
  Bajista: bpa(RUTAS.bajista[1], 1, DM.Bajista), Base: bpa(RUTAS.base[1], 1), Alcista: bpa(RUTAS.alcista[1], 1, DM.Alcista),
};
BPA['2028e'] = BPA.Base;

// Historia del PER ADELANTADO (AUD): cierre del último día de junio (fin del ejercicio) [D1] ÷ BPA subyacente diluido real del
// ejercicio siguiente [A2-A6]. Para el cierre de junio de 2026, ÷ nuestro FY2027e.
const cierres = { 2021: 1.90, 2022: 3.13, 2023: 4.03, 2024: 4.78, 2025: 9.55, 2026: 12.64 };
const bpaSub = { 2022: 0.2391, 2023: 0.2284, 2024: 0.2302, 2025: 0.5073, 2026: 0.7309, 2027: BPA['2027e'] };
const adel = Object.keys(cierres).map((a) => [`FY${a}`, r1(cierres[a] / bpaSub[+a + 1])]);
const u5 = adel.slice(-5).map((x) => x[1]).sort((a, b) => a - b), uL = adel.map((x) => x[1]);
const alCierre = Object.keys(cierres).filter((a) => bpaSub[a]).map((a) => [`FY${a}`, r1(cierres[a] / bpaSub[a])]);
const c5 = alCierre.slice(-5).map((x) => x[1]).sort((a, b) => a - b);
export const PRECIO = 13.88;
// PER actual en la misma base que la historia: a 21-oct-2026 quedan ≈ 8,3 meses de FY2027 → BPA de los próximos 12 meses =
// 0,69 × FY2027e + 0,31 × FY2028e.
export const BPA_NTM = r3(0.69 * BPA['2027e'] + 0.31 * BPA['2028e']);
export const PER = {
  actual: r1(PRECIO / BPA_NTM), solo_2027: r1(PRECIO / BPA['2027e']), solo_2028: r1(PRECIO / BPA['2028e']),
  mediana_5a: u5[2], minimo_5a: u5[0], media_larga: r1(uL.reduce((s, x) => s + x, 0) / uL.length), adel,
  v2: { mediana_5a: c5[2], minimo_5a: c5[0], media_larga: r1(alCierre.reduce((s, x) => s + x[1], 0) / alCierre.length), alCierre },
};
const fmt = (l) => l.map(([a, p]) => `${a} ${String(p).replace('.', ',')}x`).join('; ');
const n2 = (x) => String(x).replace('.', ',');
if (process.argv[1]?.endsWith('propio.mjs')) console.log(JSON.stringify({ BPA, BPA_NTM, PER }, null, 0));

export default {
  meta: {
    fecha_corte: '2026-10-21', divisa: 'AUD', divisa_cotizacion: 'AUD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 6, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF', formato_cuenta: 'funcion',
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes ?? null, confianza: 'Media' },
  valoracion: {
    // Puente a 30-jun-2026 [A1]: caja 504,8; sin deuda financiera; arrendamientos 20,3. otros_ajustes = impuesto sobre la renta
    // de FY26 por pagar (102,8, se paga en FY27) + dividendo final de 5 céntimos pagado el 9-oct (22,8) + provisión de
    // rehabilitación (82,3) − activos mantenidos para la venta (Big Springs, 13,7; vendido por 26 M) = 194,2.
    puente: { fecha: '2026-06-30', deuda_financiera: 0, arrendamientos: 20.3, caja: 504.8, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 194.2 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D5]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER FY2028e', beneficio_por_accion: BPA[e], multiplo: null, precio: null, justificacion: T.casos_12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', actual: PER.actual, mediana_5a: PER.mediana_5a, minimo_5a: PER.minimo_5a, media_larga: PER.media_larga,
        excluidos: `Historia ADELANTADA en AUD: cierre del último día de junio (fin del ejercicio) [D1] ÷ BPA subyacente diluido real del ejercicio siguiente [A2-A6]; para el cierre de junio de 2026 (12,64), ÷ nuestro FY2027e (${n2(BPA['2027e'])}). Serie: ${fmt(adel)}. No se excluye ningún año: FY2021 (7,9x) es el primer cierre con Karlawinda en producción; antes (FY2020 y anteriores) la empresa construía la mina y no tenía beneficio. El BPA es el subyacente (sin las pérdidas por valor razonable y el cierre de las coberturas de oro de FY2023 y FY2025-FY2026). Mediana y mínimo de FY2022-FY2026; media de FY2021-FY2026. PER actual = precio (13,88 AUD, cierre de Sídney del 21-oct-2026) ÷ nuestro BPA de los próximos 12 meses (${n2(BPA_NTM)} = 0,69 × FY2027e ${n2(BPA['2027e'])} + 0,31 × FY2028e ${n2(BPA['2028e'])}, con el oro a 5.900 AUD/oz). Con solo FY2027e sería ${n2(PER.solo_2027)}x y con solo FY2028e ${n2(PER.solo_2028)}x.`,
        v2: { mediana_5a: PER.v2.mediana_5a, minimo_5a: PER.v2.minimo_5a, media_larga: PER.v2.media_larga, excluidos: `Historia AL CIERRE (cierre de junio ÷ BPA subyacente diluido del mismo ejercicio): ${fmt(PER.v2.alCierre)}. Mediana y mínimo de FY2022-FY2026.` },
      },
      comparables_per: { mediana: 11.1 },
      consenso: { bpa_ano1: 0.85, bpa_ano2: 1.252, objetivo_medio: 19.61, objetivo_min: 15.5, objetivo_max: 24.0, analistas: 8, tendencia_3m: 'recortes', fuente: 'Yahoo Finance, 21-oct-2026: BPA FY2027e 0,850 (0,874 hace 90 días) y FY2028e 1,252 (1,290); objetivo medio de 8 analistas 19,61 AUD (15,50-24,00) [D2]; FNArena: BPA FY2027e 86,8 céntimos y objetivo medio de 6 brokers 20,03 [D3]' },
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
    { id: 1, titulo: 'Futuros del oro GC=F y cotización AUD/USD (cierre del 21-oct-2026: oro 4.141,8 USD/oz; AUD/USD 0,7028 → ≈ 5.894 AUD/oz)', editor: 'Yahoo Finance (herramientas del repositorio)', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/GC%3DF/' },
  ],
  huecos: [],
};
