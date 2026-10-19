// Parte del analista (NextVision, corte 2026-10-19). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

// BPA diluido (no hay ajustes: la empresa no tiene amortización de intangibles comprados ni no recurrentes) con la proyección
// del DCF: beneficio = [ventas × (margen EBITDA − amortización 1,2 %) + ingreso financiero neto] × (1 − 13 %) ÷ acciones.
// Ingreso financiero ≈ 4 % de la caja (591 M en junio de 2026, creciendo con el flujo libre menos el dividendo del 50 %):
// 24 M en 2026e, 26 en 2027e y 28 en 2028e (12,3 M en el 1S26 [A4]). Acciones diluidas: 94,95 M en el 1S26 [A4] más
// ≈ 0,5 M al año de opciones; sin recompras.
// Calibrado con el 1S26 real: ventas 155,5, EBIT 90,2, financiero 11,4, impuesto 9,5 % → 0,968 USD.
const V25 = 168.354;
const bpa = (v, margen, fin, acc) => Math.round(((v * (margen - 1.2) / 100 + fin) * 0.87) / acc * 100) / 100;
const a = S.anios;
const v26 = V25 * (1 + a[0].crecimiento_pct / 100);
const caso = (dg27, dg28, dm, fin) => {
  const v27 = v26 * (1 + (a[1].crecimiento_pct + dg27) / 100), v28 = v27 * (1 + (a[2].crecimiento_pct + dg28) / 100);
  return { v27, v28, b27: bpa(v27, a[1].margen_ebitda_pct + dm, 26, 96.0), b28: bpa(v28, a[2].margen_ebitda_pct + dm, fin, 96.5) };
};
const base = caso(0, 0, 0, 28), baj = caso(-30, -12, -8, 24), alc = caso(15, 5, 4, 30);
export const BPA = { '2026': bpa(v26, a[0].margen_ebitda_pct, 24, 95.5), '2027': base.b27, Bajista: baj.b28, Base: base.b28, Alcista: alc.b28 };

// Historia del PER en BPA diluido publicado [A1, A2]. Cierres de fin de año en USD (ILS de Yahoo ÷ tipo del Banco de Israel
// de ese día [D1, D3]): 2023 29,84/3,627; 2024 60,44/3,647; 2025 209,90/3,19.
const cierres = { 2023: 29.84 / 3.627, 2024: 60.44 / 3.647, 2025: 209.90 / 3.19 };
const bpaReal = { 2023: 0.3411, 2024: 0.8024, 2025: 1.1064, 2026: BPA['2026'] };
const r1 = (x) => Math.round(x * 10) / 10;
const r2 = (x) => Math.round(x * 100) / 100;
const adel = Object.keys(cierres).map((y) => [y, r1(cierres[y] / bpaReal[+y + 1])]);
const alCierre = Object.keys(cierres).map((y) => [y, r1(cierres[y] / bpaReal[y])]);
const med = (l) => { const v = l.map((x) => x[1]).sort((p, q) => p - q); return v.length % 2 ? v[(v.length - 1) / 2] : (v[v.length / 2 - 1] + v[v.length / 2]) / 2; };
const media = (l) => r1(l.reduce((s, x) => s + x[1], 0) / l.length);
// 18.790 agorot × (1 / 311) USD por agora (tipo representativo del Banco de Israel del 19-oct-2026: 3,110 ILS/USD [D3]).
export const PRECIO = 60.42;
// PER actual en la base de la historia (precio ÷ BPA de los 12 meses siguientes): a 19-oct-2026 quedan 2,4 meses de 2026.
export const BPA_NTM = r2(2.4 / 12 * BPA['2026'] + 9.6 / 12 * BPA['2027']);
export const PER = { actual: r1(PRECIO / BPA_NTM), solo_2027: r1(PRECIO / BPA['2027']), solo_2028: r1(PRECIO / BPA.Base), adel, alCierre };
const fmt = (l) => l.map(([y, p]) => `${y} ${String(p).replace('.', ',')}x`).join('; ');
const n2 = (x) => String(x).replace('.', ',');

export default {
  meta: {
    fecha_corte: '2026-10-19', divisa: 'USD', divisa_cotizacion: 'ILA', tipo_cambio: 1 / 311, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF', formato_cuenta: 'funcion',
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
    confianza: 'Baja',
  },
  escenarios: { casos: S.casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Baja' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: un solo negocio (cámaras estabilizadas para drones y plataformas terrestres). La caja neta (591 M USD, ≈ 10 % de la capitalización) va en el puente [A4].', confianza: 'Alta' },
  valoracion: {
    // Puente a 30-jun-2026 [A4]: sin deuda financiera; arrendamientos NIIF 16 de 5,158 M; caja, depósitos y activos financieros
    // 591,454 M (20,319 + 571,135). El dividendo de 2026 (51,8 M) ya se pagó en marzo.
    puente: { fecha: '2026-06-30', deuda_financiera: 0, arrendamientos: 5.158, caja: 591.454, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D5]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: BPA[e], multiplo: null, precio: null, justificacion: T.casos_12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', actual: PER.actual, mediana_5a: med(adel), minimo_5a: Math.min(...adel.map((x) => x[1])), media_larga: media(adel),
        excluidos: `Historia ADELANTADA de solo tres años (Yahoo empieza en mayo de 2023; sin cierres fiables de 2021-2022): precio de cierre de cada año en USD (ILS de Yahoo ÷ tipo del Banco de Israel de ese día [D1, D3]) ÷ BPA diluido real del año siguiente [A1, A2]; para el cierre de 2025 (65,80 USD), ÷ nuestro 2026e (${n2(BPA['2026'])}, con el 1S26 real de 0,968 y el objetivo de 355 M; consenso 2,18 [D2]). Serie: ${fmt(adel)}. Mediana, mínimo y media de los tres. Sin exclusiones: la empresa siempre ha ganado dinero. PER actual = precio (60,42 USD = 18.790 agorot al cierre del 19-oct-2026 con 3,110 ILS/USD) ÷ nuestro BPA de los próximos 12 meses (${n2(BPA_NTM)} = 2,4/12 de 2026e ${n2(BPA['2026'])} + 9,6/12 de 2027e ${n2(BPA['2027'])}). Con solo 2027e sería ${n2(PER.solo_2027)}x y con solo 2028e ${n2(PER.solo_2028)}x.`,
        v2: { mediana_5a: med(alCierre), minimo_5a: Math.min(...alCierre.map((x) => x[1])), media_larga: media(alCierre), excluidos: `Historia AL CIERRE (precio de cierre ÷ BPA diluido del mismo año): ${fmt(alCierre)}. Tres años.` },
      },
      comparables_per: { mediana: 27.0 },
      consenso: { bpa_ano1: 2.18, bpa_ano2: 3.18, objetivo_medio: 124.37, objetivo_min: 90.1, objetivo_max: 142.8, analistas: 4, tendencia_3m: 'subidas', fuente: 'Yahoo Finance, 19-oct-2026: BPA de 2026 de 2,18 USD (3 analistas; 1,87 hace 90 días) y de 2027 de 3,18 (2,45 hace 90 días); objetivo medio de 4 analistas de 38.680 agorot (124,37 USD con 3,110 ILS/USD) [D2]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.objetivo_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Baja',
  },
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  resumen: T.resumen ?? null,
  fuentes: [
    { id: 1, titulo: 'Defensa: ficha sectorial corta (perímetro, márgenes, comparables)', editor: 'Repositorio de análisis (sectores/defensa-2026-10-15.md)', tipo: 'Sectorial', fecha: '2026-10-15', url: 'sectores/defensa-2026-10-15.md' },
  ],
  huecos: [],
};
