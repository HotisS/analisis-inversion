// Parte del analista (The Ensign Group, corte 2026-10-20). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

const r1 = (x) => Math.round(x * 10) / 10;
const r2 = (x) => Math.round(x * 100) / 100;
const n2 = (x) => String(x).replace('.', ',');

// BPA GAAP diluido con la proyección del DCF:
//   (ventas × (margen EBITDA − amortización) + resultado financiero neto) × (1 − 25 %) ÷ acciones diluidas.
// Calibrado con 2025 real: 5.057,8 × (10,47 − 2,06) % + 30,3 = 455,6 × (1 − 24,4 %) ÷ 58,9 = 5,84 (publicado 5,84).
// Resultado financiero: intereses cobrados menos pagados y rendimiento de las inversiones de la cautiva (30,3 M en 2025,
// 31,5 M LTM); baja a 25, 22 y 20 M en 2026-2028 porque la caja se gasta en compras.
// Acciones: 59,5 M diluidas en 2026 (guía); +0,5 M al año por opciones (de 55,8 a 58,9 M en 2020-2025) menos las recompras
// autorizadas (100 M USD, ≈ 0,5 M de acciones) → 60,0 M en 2027 y 60,5 M en 2028, sin recompras no anunciadas.
const V25 = 5057.8;
const bpa = (v, m, am, fin, acc) => r2((v * (m - am) / 100 + fin) * 0.75 / acc);
const v26 = V25 * (1 + S.anios[0].crecimiento_pct / 100);
const caso = (dg, dm) => {
  const v27 = v26 * (1 + (S.anios[1].crecimiento_pct + dg) / 100);
  const v28 = v27 * (1 + (S.anios[2].crecimiento_pct + dg) / 100);
  return { v27, v28, b27: bpa(v27, S.anios[1].margen_ebitda_pct + dm, 2.2, 22, 60.0), b28: bpa(v28, S.anios[2].margen_ebitda_pct + dm, 2.2, 20, 60.5) };
};
const base = caso(0, 0);
export const BPA = { 2026: bpa(v26, S.anios[0].margen_ebitda_pct, S.anios[0].amortizacion_pct_ventas, 25, 59.5), 2027: base.b27, Bajista: caso(-3.0, -1.5).b28, Base: base.b28, Alcista: caso(1.5, 0.4).b28 };

// Historia ADELANTADA en BPA GAAP diluido: cierre de cada año (Yahoo [D1]) ÷ BPA GAAP real del año siguiente [A1, A10];
// para el cierre de 2025, ÷ nuestro 2026e. 2019 = primer cierre tras la escisión de Pennant (1-oct-2019).
const cierres = { 2019: 45.37, 2020: 72.92, 2021: 83.96, 2022: 94.61, 2023: 112.21, 2024: 132.86, 2025: 174.2 };
const bpaReal = { 2019: 1.97, 2020: 3.06, 2021: 3.42, 2022: 3.95, 2023: 3.65, 2024: 5.12, 2025: 5.84, 2026: BPA[2026] };
const adel = Object.keys(cierres).map((a) => [a, r1(cierres[a] / bpaReal[+a + 1])]);
// Excluido 2022: su PER adelantado (25,9) usa el BPA de 2023, hundido por el litigio de directores médicos (60,8 M, 0,80 USD
// por acción después de impuestos) [A7].
const limpio = adel.filter(([a]) => a !== '2022');
const u5 = limpio.slice(-5).map((x) => x[1]).sort((a, b) => a - b);
const todos = limpio.map((x) => x[1]);
// Historia AL CIERRE (v2): cierre ÷ BPA del mismo año (2023 excluido por el litigio).
const alCierre = Object.keys(cierres).filter((a) => a !== '2019' && a !== '2023').map((a) => [a, r1(cierres[a] / bpaReal[a])]);
const c5 = alCierre.slice(-5).map((x) => x[1]).sort((a, b) => a - b);
export const PRECIO = 173.05;
export const PER = {
  actual: r1(PRECIO / BPA[2027]), ntm: r1(PRECIO / (0.2 * BPA[2026] + 0.8 * BPA[2027])),
  mediana_5a: u5[2], minimo_5a: u5[0], media_larga: r1(todos.reduce((s, x) => s + x, 0) / todos.length), adel,
  v2: { mediana_5a: c5[2], minimo_5a: c5[0], media_larga: r1(alCierre.reduce((s, x) => s + x[1], 0) / alCierre.length), alCierre },
};
const fmt = (l) => l.map(([a, p]) => `${a} ${n2(p)}x`).join('; ');

export default {
  meta: {
    fecha_corte: '2026-10-20', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
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
    etapa2: { ...S.etapa2, justificacion: T.etapa2_justificacion ?? null }, mitad_de_anio: true,
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
    // Puente a 30-jun-2026 [A2]: deuda hipotecaria 4,2 + 135,6 = 139,7; caja 262,3. Las inversiones de la filial de seguros
    // (58,5 corrientes + 210,1 de depósitos) cubren las provisiones de autoseguro (295,8) y no se cuentan como caja.
    // Arrendamientos operativos fuera (US GAAP: el alquiler ya resta en el EBITDA). Minoritarios a valor contable (3,1).
    puente: { fecha: '2026-06-30', deuda_financiera: 139.7, arrendamientos: 0, caja: 262.3, minoritarios: 3.1, pensiones: 0, asociadas: 0, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D5]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: BPA[e], multiplo: null, precio: null, justificacion: T.casos_12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', actual: PER.actual, mediana_5a: PER.mediana_5a, minimo_5a: PER.minimo_5a, media_larga: PER.media_larga,
        excluidos: `Historia ADELANTADA en BPA GAAP diluido (la misma base que nuestros casos): precio de cierre de cada año (Yahoo [D1]) ÷ BPA GAAP real del año siguiente [A1, A10]; para el cierre de 2025 (174,20), ÷ nuestro 2026e (${n2(BPA[2026])}; la guía ajustada de 7,75-7,85 equivale a ≈ 6,9 GAAP). Serie: ${fmt(adel)}. Excluido 2022 (25,9x): divide por el BPA de 2023, rebajado 0,80 USD por el litigio de directores médicos (60,8 M) [A7]. Mediana y mínimo de 2020-2025 sin 2022; media de 2019-2025 sin 2022. Desde 2019 por la escisión de Pennant. PER actual = 173,05 USD (cierre del 19-oct-2026) ÷ nuestro 2027e (${n2(BPA[2027])}); con el BPA de los próximos 12 meses (20 % de 2026e y 80 % de 2027e) sería ${n2(PER.ntm)}x. En base ajustada (consenso) el PER de 2027 es de 20,2 veces: la diferencia es la remuneración en acciones.`,
        v2: { mediana_5a: PER.v2.mediana_5a, minimo_5a: PER.v2.minimo_5a, media_larga: PER.v2.media_larga, excluidos: `Historia AL CIERRE (cierre ÷ BPA GAAP del mismo año): ${fmt(PER.v2.alCierre)}; 2023 excluido por el litigio.` },
      },
      comparables_per: { mediana: 17.0 },
      consenso: { bpa_ano1: 7.81, bpa_ano2: 8.59, objetivo_medio: 220, objetivo_min: 207, objetivo_max: 230, analistas: 5, tendencia_3m: 'estables', fuente: 'Yahoo Finance, 20-oct-2026: BPA AJUSTADO de 2026 de 7,81 USD (7,56 hace 90 días) y de 2027 de 8,59 (8,33); objetivo medio de 5 analistas; Stock Analysis lo confirma [D2, D3]' },
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
    { id: 1, titulo: 'Gasto en residencias 2025e-2030e: estimación propia con las tasas del actuario de CMS sobre la cifra definitiva de 2024', editor: 'Cálculo propio sobre CMS y Skilled Nursing News', tipo: 'Sectorial', fecha: '2026-10-20', url: 'https://www.cms.gov/files/document/highlights.pdf' },
    { id: 2, titulo: 'ROIC con arrendamientos: (NOPAT 2025 de 321 M + 6 % × 1.990 M de pasivo por arrendamientos × 0,75) ÷ (1.697 M de capital invertido + 1.990 M) ≈ 11 %', editor: 'Cálculo propio sobre el 10-K 2025 y el 10-Q del 2T26', tipo: 'Cálculo propio', fecha: '2026-10-20', url: 'https://www.sec.gov/Archives/edgar/data/1125376/000112537626000034/ensg-20260630.htm' },
    { id: 3, titulo: 'Sensibilidades: Medicaid 45,2 % y Medicare 23,7 % de las ventas de 2026e (5.897 M); personal ≈ 60 % de los gastos; efecto en BPA = cambio de ingresos o costes × 0,75 ÷ 59,5 M de acciones', editor: 'Cálculo propio sobre el 10-Q del 2T26', tipo: 'Cálculo propio', fecha: '2026-10-20', url: 'https://www.sec.gov/Archives/edgar/data/1125376/000112537626000034/ensg-20260630.htm' },
  ],
  huecos: [],
};
console.error('BPA', JSON.stringify(BPA), 'PER', JSON.stringify({ actual: PER.actual, ntm: PER.ntm, med: PER.mediana_5a, min: PER.minimo_5a, larga: PER.media_larga, adel: PER.adel, v2: PER.v2 }));
